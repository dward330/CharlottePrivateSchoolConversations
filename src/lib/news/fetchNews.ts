import { byNewestFirst, MAX_ITEMS, normalizeItems, type NewsItem, type NewsSource } from './types'

/** The CORS relay.
 *
 *  School news boards send no `Access-Control-Allow-Origin` header, so a direct
 *  browser fetch from this static site is blocked by the same-origin policy —
 *  for every school, for every visitor. That is a property of the schools'
 *  servers; no parser change affects it. The app is on GitHub Pages with no
 *  backend, so a relay is the only runtime path.
 *
 *  This is OUR OWN Cloudflare Worker (workers/news-proxy/), deployed 2026-08-28.
 *  It replaced the public relay corsproxy.io, which gates on USER-AGENT — measured
 *  deterministically 6/6 on 2026-08-27, non-browser clients get HTTP 403
 *  "Server-side requests are not allowed on your plan" — and which can change its
 *  rules with no notice. A visitor hit its failure state the day this shipped.
 *
 *  The Worker is NOT an open proxy: it allow-lists both the calling origin and
 *  the fetched host. ADDING A SCHOOL therefore means adding its hostname to
 *  ALLOWED_HOSTS in workers/news-proxy/worker.js and redeploying, or the section
 *  fails with "Host not allowed" — see that directory's README.
 *
 *  The error state below is still a required deliverable: any relay can fail.
 */
export const PROXY = 'https://news-proxy.dward330.workers.dev/?url='

const TIMEOUT_MS = 12_000
const CACHE_TTL_MS = 30 * 60 * 1000

/** Real parse phases, so the UI's status line advances on events rather than on
    a timer. The design reference's 2.4s setTimeout is a mock and must not ship. */
export type NewsPhase = 'contacting' | 'parsing' | 'extracting'

export class NewsError extends Error {}

function proxied(url: string): string {
  return `${PROXY}${encodeURIComponent(url)}`
}

async function getText(url: string, signal: AbortSignal): Promise<string> {
  const res = await fetch(proxied(url), { signal })
  if (!res.ok) throw new NewsError(`HTTP ${res.status} for ${url}`)
  return res.text()
}

/** Parse third-party markup in an inert document. NEVER inject fetched HTML
    into the live DOM — this is untrusted markup from a site we do not control. */
function toDoc(html: string): Document {
  return new DOMParser().parseFromString(html, 'text/html')
}

type Cached = { at: number; items: NewsItem[] }

function cacheKey(slug: string): string {
  return `news:${slug}`
}

/** sessionStorage read/write is try/catch-wrapped throughout: private windows
    and blocked-storage contexts throw on access, not just on write. */
function readCache(slug: string): NewsItem[] | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(slug))
    if (!raw) return null
    const parsed = JSON.parse(raw) as Cached
    if (!parsed?.at || Date.now() - parsed.at > CACHE_TTL_MS) return null
    return Array.isArray(parsed.items) ? parsed.items : null
  } catch {
    return null
  }
}

function writeCache(slug: string, items: NewsItem[]): void {
  try {
    sessionStorage.setItem(cacheKey(slug), JSON.stringify({ at: Date.now(), items }))
  } catch {
    /* storage unavailable or full — caching is an optimization, never required */
  }
}

export type FetchNewsOptions = {
  slug: string
  source: NewsSource
  onPhase?: (phase: NewsPhase) => void
  /** Called when previews arrive, so the list can render before they do. */
  onUpdate?: (items: NewsItem[]) => void
  signal?: AbortSignal
}

/**
 * Fetch and parse one school's news board.
 *
 * Resolves as soon as the BOARD parse succeeds — previews are fetched after,
 * and reported through `onUpdate`. That ordering is deliberate: the section is
 * useful with headlines alone, and 11 blocking requests through a throttled
 * relay is exactly when it would otherwise hang.
 */
export async function fetchNews(opts: FetchNewsOptions): Promise<NewsItem[]> {
  const { slug, source, onPhase, onUpdate, signal } = opts

  const cached = readCache(slug)
  if (cached && cached.length) {
    onPhase?.('extracting')
    return cached
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  const onOuterAbort = () => controller.abort()
  signal?.addEventListener('abort', onOuterAbort)

  try {
    onPhase?.('contacting')

    /* One board for every school but Charlotte Latin, whose news is split over
       four category views the user asked to be merged. Fetched in parallel and
       concatenated; `normalizeItems` de-duplicates the cross-posts. A view that
       fails is skipped rather than failing the section — with four sources,
       losing one still leaves a useful list. All four failing yields zero items
       and the error state below, exactly as a single dead board does. */
    const boardUrls = [source.boardUrl, ...(source.extraBoardUrls ?? [])]
    const pages = await Promise.all(
      boardUrls.map(async (u) => {
        try {
          return await getText(u, controller.signal)
        } catch (err) {
          // The PRIMARY board failing is a real failure: propagate it so a dead
          // site still surfaces as an error rather than a silently short list.
          if (u === source.boardUrl) throw err
          return null
        }
      }),
    )

    onPhase?.('parsing')
    const raw = pages.flatMap((html, i) => (html ? source.parse(html, boardUrls[i]) : []))

    /* A board that publishes no date only learns its dates on the second pass.
       Capping at MAX_ITEMS here would pick the final ten BEFORE any date was
       known — the date pass would then correctly sort the WRONG ten, and the
       section would look right while being wrong. Keep a wider candidate pool
       when dates are still unknown, and cap to ten once they arrive. */
    const needsDates = Boolean(source.publishedAt) && raw.every((i) => !i.date)
    const items = normalizeItems(
      raw,
      source.boardUrl,
      needsDates ? Math.max(MAX_ITEMS, raw.length) : MAX_ITEMS,
    )

    // A successful fetch yielding zero items means the parser is stale against a
    // redesigned site. That is an error state, not an empty section.
    if (!items.length) throw new NewsError(`No items parsed from ${source.boardUrl}`)

    onPhase?.('extracting')
    clearTimeout(timer)

    /* The caller and the cache must never see more than the section shows.
       `items` may be a wider candidate pool (see `needsDates`); the extra rows
       exist only so the date pass has something to choose from. */
    const visible = items.slice(0, MAX_ITEMS)

    /* Cache the headline-only result IMMEDIATELY. Previews take ~10 further
       round-trips; if we waited for them to settle before writing, a visitor
       who navigated away mid-flight would cache nothing and re-hit the proxy
       from scratch on their next visit. The preview pass overwrites this entry
       with the enriched copy when it finishes. */
    writeCache(slug, visible)

    void hydratePreviews({ slug, source, items, signal, onUpdate })
    return visible
  } catch (err) {
    clearTimeout(timer)
    if (err instanceof NewsError) throw err
    throw new NewsError(err instanceof Error ? err.message : String(err))
  } finally {
    signal?.removeEventListener('abort', onOuterAbort)
  }
}

/**
 * Second pass: fill in preview sentences from article bodies.
 *
 * Every failure here is silent by design. An article whose body fetch fails
 * keeps its headline and date and shows NO preview line — never an empty
 * element, never a spinner that outlives the section.
 */
async function hydratePreviews(args: {
  slug: string
  source: NewsSource
  items: NewsItem[]
  signal?: AbortSignal
  onUpdate?: (items: NewsItem[]) => void
}): Promise<void> {
  const { slug, source, items, signal, onUpdate } = args
  if (!source.preview && !source.publishedAt) {
    writeCache(slug, items)
    return
  }

  /* An item needs the second pass if it is missing EITHER field this source can
     supply. Cannon's board publishes no date at all, so filtering on `summary`
     alone would skip exactly the articles whose dates are still unknown. */
  const needed = items.filter(
    (i) => (source.preview && !i.summary) || (source.publishedAt && !i.date),
  )
  if (!needed.length) {
    writeCache(slug, items)
    return
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  const onOuterAbort = () => controller.abort()
  signal?.addEventListener('abort', onOuterAbort)

  const withPreview = new Map<string, string>()
  const withDate = new Map<string, string>()

  await Promise.all(
    needed.map(async (item) => {
      try {
        const html = await getText(item.url, controller.signal)
        const summary = source.preview?.(html)
        if (summary) withPreview.set(item.url, summary)
        const date = source.publishedAt?.(html)
        if (date) withDate.set(item.url, date)
      } catch {
        /* no preview or date for this row — deliberate, see the doc comment */
      }
    }),
  )

  clearTimeout(timer)
  signal?.removeEventListener('abort', onOuterAbort)

  if (signal?.aborted) return

  const merged = items
    .map((i) => {
      const s = withPreview.get(i.url)
      const d = withDate.get(i.url)
      if (!s && !d) return i
      return { ...i, ...(s ? { summary: s } : {}), ...(d ? { date: d } : {}) }
    })
    /* Re-sort: for a board that publishes no date, the ONLY chronological
       information arrives here. Cannon's two boards are not interleaved by date
       on the page — its press-mention board trails the internal one by over a
       year — so skipping this would ship a section ordered by neither date nor
       relevance. Sorting is stable for items whose dates did not change. */
    .sort(byNewestFirst)
    /* Cap HERE, not before. For a dateless multi-board school the pool passed in
       is deliberately wider than the section shows, precisely so this sort has
       real candidates to choose from; ten is chosen only once dates exist. */
    .slice(0, MAX_ITEMS)

  writeCache(slug, merged)
  if (withPreview.size || withDate.size) onUpdate?.(merged)
}

export { toDoc }
