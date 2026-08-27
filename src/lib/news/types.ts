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
}

/** Newest-first, capped. The board is the source of order, but a parser that
    reads a redesigned page can emit anything, so ordering is enforced here
    rather than trusted. */
export const MAX_ITEMS = 10

/** Absolutize, drop the unusable, de-duplicate, sort newest-first, cap.
    Every parser routes through this so the guarantees hold per-school without
    each parser re-implementing them. */
export function normalizeItems(raw: NewsItem[], boardUrl: string): NewsItem[] {
  const seen = new Set<string>()
  const out: NewsItem[] = []

  for (const item of raw) {
    const title = item.title?.trim()
    if (!title || !item.url) continue

    let url: string
    try {
      url = new URL(item.url, boardUrl).href
    } catch {
      continue
    }
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
  out.sort((a, b) => {
    const at = a.date ? Date.parse(a.date) : NaN
    const bt = b.date ? Date.parse(b.date) : NaN
    if (Number.isNaN(at) && Number.isNaN(bt)) return 0
    if (Number.isNaN(at)) return 1
    if (Number.isNaN(bt)) return -1
    return bt - at
  })

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
