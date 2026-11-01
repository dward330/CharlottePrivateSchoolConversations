import {
  byNewestFirst,
  byNewestFirstKeepingBoardOrder,
  MAX_ITEMS,
  normalizeItems,
  type NewsItem,
  type NewsSource,
} from './types'

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
/** A list with an undated row came from a pass that was cut short. Keep it
    briefly, so one slow pass heals on the next visit instead of sticking. */
const PARTIAL_CACHE_TTL_MS = 2 * 60 * 1000
/** How long a `boardIsChronological` board waits for its last articles once 80%
    have answered. A late row loses only its date and preview, not its place. */
const LATE_ARTICLE_GRACE_MS = 2_000

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

type Cached = { at: number; items: NewsItem[]; ttl?: number }

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
    if (!parsed?.at || Date.now() - parsed.at > (parsed.ttl ?? CACHE_TTL_MS)) return null
    return Array.isArray(parsed.items) ? parsed.items : null
  } catch {
    return null
  }
}

function writeCache(slug: string, items: NewsItem[], ttl = CACHE_TTL_MS): void {
  try {
    sessionStorage.setItem(cacheKey(slug), JSON.stringify({ at: Date.now(), items, ttl }))
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
 * A board that publishes dates resolves as soon as its parse succeeds. Previews
 * are fetched after and reported through `onUpdate`, because the section is
 * useful with headlines alone, and 11 blocking requests through a throttled
 * relay is exactly when it would otherwise hang.
 *
 * A board that publishes NO date resolves only after the article pass. Its first
 * list has no order, so rendering it shows old stories under "Newest" and then
 * reorders them in front of the reader. The section keeps its skeleton instead.
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

    /* One board for every school but Gaston Day, whose board has a second page.
       Fetched in parallel and concatenated; `normalizeItems` de-duplicates. An
       extra page that fails is skipped rather than failing the section, so
       losing one still leaves a useful list. */
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
      source.alsoAllowedHosts,
    )

    // A successful fetch yielding zero items means the parser is stale against a
    // redesigned site. That is an error state, not an empty section.
    if (!items.length) throw new NewsError(`No items parsed from ${source.boardUrl}`)

    onPhase?.('extracting')
    clearTimeout(timer)

    /* A dateless board caches nothing until the pass ends. A list saved before
       dates exist has no order, and a visitor who reloads mid-pass would then
       read it from the cache for the full TTL. A list with no dates at all is
       shown but never saved, so the next visit tries again.

       `allDated` looks at the whole pool, not the ten rows returned. On a board
       that sinks undated rows, a story that lost its date has been cut from
       `merged`, so ten dated rows can still be the wrong ten. */
    if (needsDates) {
      const { merged, allDated } = await hydrateArticles({ source, items, signal })
      if (!signal?.aborted && merged.some((i) => i.date)) {
        writeCache(slug, merged, allDated ? CACHE_TTL_MS : PARTIAL_CACHE_TTL_MS)
      }
      return merged
    }

    /* The caller and the cache must never see more than the section shows. */
    const visible = items.slice(0, MAX_ITEMS)

    /* Cache the headline-only result IMMEDIATELY. Previews take ~10 further
       round-trips; if we waited for them to settle before writing, a visitor
       who navigated away mid-flight would cache nothing and re-hit the proxy
       from scratch on their next visit. This pass overwrites the entry with the
       enriched copy when it finishes. This board's order is already right, so
       an early copy is safe here and only here. */
    writeCache(slug, visible)

    void hydrateArticles({ source, items, signal }).then(({ merged, landed }) => {
      if (signal?.aborted) return
      writeCache(slug, merged)
      if (landed) onUpdate?.(merged)
    })
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
 * Second pass: fill in previews and dates from article pages.
 *
 * Every failure here is silent by design. An article whose body fetch fails
 * keeps its headline and shows NO preview line — never an empty element, never a
 * spinner that outlives the section.
 *
 * Returns the list and leaves caching to the caller, because the two paths in
 * `fetchNews` save it under different rules. `landed` is false when no article
 * contributed anything; `allDated` is true when every row in the pool has a date.
 */
async function hydrateArticles(args: {
  source: NewsSource
  items: NewsItem[]
  signal?: AbortSignal
}): Promise<{ merged: NewsItem[]; landed: boolean; allDated: boolean }> {
  const { source, items, signal } = args
  const unchanged = {
    merged: items.slice(0, MAX_ITEMS),
    landed: false,
    allDated: items.every((i) => i.date),
  }
  if (!source.preview && !source.publishedAt) return unchanged

  /* An item needs the second pass if it is missing EITHER field this source can
     supply. Cannon's board publishes no date at all, so filtering on `summary`
     alone would skip exactly the articles whose dates are still unknown. */
  const needed = items.filter(
    (i) => (source.preview && !i.summary) || (source.publishedAt && !i.date),
  )
  if (!needed.length) return unchanged

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  const onOuterAbort = () => controller.abort()
  signal?.addEventListener('abort', onOuterAbort)

  const withPreview = new Map<string, string>()
  const withDate = new Map<string, string>()

  /* Only a board whose order can place an undated row may stop early. Anywhere
     else a late row would sink, so that pass waits out the full timeout. */
  const enough = Math.ceil(needed.length * 0.8)
  let settled = 0
  let grace: ReturnType<typeof setTimeout> | undefined

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
      } finally {
        settled += 1
        if (source.boardIsChronological && settled >= enough && grace === undefined) {
          grace = setTimeout(() => controller.abort(), LATE_ARTICLE_GRACE_MS)
        }
      }
    }),
  )

  clearTimeout(timer)
  clearTimeout(grace)
  signal?.removeEventListener('abort', onOuterAbort)

  const enriched = items.map((i) => {
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
  const sorted = source.boardIsChronological
    ? byNewestFirstKeepingBoardOrder(enriched)
    : enriched.sort(byNewestFirst)

  return {
    /* Cap HERE, not before. For a dateless board the pool passed in is
       deliberately wider than the section shows, precisely so this sort has
       real candidates to choose from; ten is chosen only once dates exist. */
    merged: sorted.slice(0, MAX_ITEMS),
    landed: withPreview.size > 0 || withDate.size > 0,
    allDated: enriched.every((i) => i.date),
  }
}

export { toDoc }
