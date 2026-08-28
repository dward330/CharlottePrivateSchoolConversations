/** One article from a school's news board. Only `title` and `url` are
    guaranteed — a board that publishes no photo, or an article whose preview
    fetch fails, is normal and renders without those parts rather than with an
    empty box or a stalled line. */
export type NewsItem = {
  title: string
  /** Absolute. Relative hrefs are resolved against the board URL. */
  url: string
  /** ISO-8601 when the board publishes a parseable date. */
  date: string | null
  photo?: string
  summary?: string
}

/** Everything the section needs to render one school. A slug absent from the
    registry renders no chip, no rail item and no section at all — the project's
    absence-of-data principle, not an empty shell. */
export type NewsSource = {
  /** Page the parser fetches. */
  boardUrl: string
  /** "All news & media" destination. MAY equal boardUrl — Providence Day uses
      one URL for both, per the user. */
  indexUrl: string
  /** Shown in the section header and the loading status line. */
  domain: string
  parse: (html: string, boardUrl: string) => NewsItem[]
  /** Optional second pass: pull a preview sentence from one article page.
      Boards that carry their own summary do not need this. */
  preview?: (html: string) => string | undefined
  /** Optional second pass: pull the publish date from one article page.
      Only for boards that publish NO date in their list markup — Cannon's
      Finalsite board emits no <time> at all and keeps the date in an
      `article:published` meta tag on the article page. Dates arriving here
      re-sort the list, since the board's own DOM order is not chronological. */
  publishedAt?: (html: string) => string | undefined
}

/** Newest-first, capped. The board is the source of order, but a parser that
    reads a redesigned page can emit anything, so ordering is enforced here
    rather than trusted. */
export const MAX_ITEMS = 10

/** Newest first; undated items sort last rather than being dropped.
    Exported because a board that publishes no date in its list markup only
    learns its dates on the second pass, and must re-sort once they arrive. */
export function byNewestFirst(a: NewsItem, b: NewsItem): number {
  const at = a.date ? Date.parse(a.date) : NaN
  const bt = b.date ? Date.parse(b.date) : NaN
  if (Number.isNaN(at) && Number.isNaN(bt)) return 0
  if (Number.isNaN(at)) return 1
  if (Number.isNaN(bt)) return -1
  return bt - at
}

/**
 * HARD RULE — every row must link to the SCHOOL'S OWN SITE.
 *
 * A news board may mix ordinary article posts with LINK POSTS that point
 * somewhere else entirely: Charlotte Country Day's Finalsite board flags two of
 * its twenty posts `data-opens-in="linked_url"` and sends them to
 * `instagram.com/p/…`. Those rows carry a real headline, date and photo, so
 * nothing about their appearance marks them as different.
 *
 * They are dropped, deliberately, and this is enforced HERE rather than in any
 * parser so it holds for all six schools and every school added later.
 *
 * This is an ALLOW-LIST, not a block-list on named platforms. A row survives
 * only if its host is the board's own registrable domain. That choice is the
 * point: it catches Instagram, Facebook, X, YouTube, TikTok, Substack, a local
 * paper's press mention, and whatever a school starts posting to next year —
 * with no list to maintain and no code change. A block-list of today's
 * platforms would silently pass tomorrow's.
 *
 * Three reasons this is the right treatment rather than merely a safe one:
 *
 *  - **The section promises the school's own news board.** The footer says
 *    "Pulled from the school's News & Media board" and the header cites the
 *    school's domain. A row that lands a parent on instagram.com — behind a
 *    login wall, next to unrelated content nobody here reviewed — breaks the
 *    citation surface the whole section is built to be.
 *  - **Those rows can never carry a preview.** The relay allow-lists school
 *    hosts only (correctly — it is what stops it being an open proxy), so an
 *    off-site fetch 403s and the row renders permanently preview-less among
 *    siblings that have one. It reads as a broken row rather than a link post.
 *  - **Nothing is lost.** Dropping happens BEFORE the cap, so a board with
 *    spare posts backfills to a full MAX_ITEMS. Country Day still shows ten
 *    rows — ten school articles instead of eight plus two Instagram links.
 *
 * Ordering matters: this runs before `slice(0, MAX_ITEMS)`. Dropping after the
 * cap would silently shrink the section to 8 rows while 12 posts were
 * available, and would look like a parse failure.
 */
function isSameSite(url: URL, board: URL): boolean {
  const a = url.hostname.toLowerCase().replace(/^www\./, '')
  const b = board.hostname.toLowerCase().replace(/^www\./, '')
  // Exact match, or a subdomain of the board's domain (news.school.org).
  return a === b || a.endsWith(`.${b}`)
}

/** Absolutize, drop the unusable, drop OFF-SITE links, de-duplicate, sort
    newest-first, cap. Every parser routes through this so the guarantees hold
    per-school without each parser re-implementing them. */
export function normalizeItems(raw: NewsItem[], boardUrl: string): NewsItem[] {
  const seen = new Set<string>()
  const out: NewsItem[] = []

  let board: URL | null = null
  try {
    board = new URL(boardUrl)
  } catch {
    // An unparseable board URL cannot anchor the same-site test. Fail OPEN
    // rather than dropping every row: a section that renders an off-site link
    // is a smaller failure than one that renders nothing at all.
    board = null
  }

  for (const item of raw) {
    const title = item.title?.trim()
    if (!title || !item.url) continue

    let url: string
    let parsed: URL
    try {
      parsed = new URL(item.url, boardUrl)
      url = parsed.href
    } catch {
      continue
    }

    // HARD RULE: off-site rows never render. See the doc comment above.
    if (board && !isSameSite(parsed, board)) continue

    if (seen.has(url)) continue
    seen.add(url)

    let photo: string | undefined
    if (item.photo) {
      try {
        photo = new URL(item.photo, boardUrl).href
      } catch {
        photo = undefined
      }
    }

    out.push({
      title,
      url,
      date: item.date ?? null,
      ...(photo ? { photo } : {}),
      ...(item.summary ? { summary: item.summary } : {}),
    })
  }

  // Undated items sort last rather than being dropped — a board that stops
  // emitting <time> should degrade to "no date shown", not to an empty section.
  out.sort(byNewestFirst)

  return out.slice(0, MAX_ITEMS)
}

/** Trim a body paragraph to a preview sentence on a word boundary. */
export function truncatePreview(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const space = cut.lastIndexOf(' ')
  return `${(space > 40 ? cut.slice(0, space) : cut).replace(/[,;:.\s]+$/, '')}…`
}
