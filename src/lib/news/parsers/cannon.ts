import { truncatePreview, type NewsItem } from '../types'

/**
 * Cannon School — Finalsite post board.
 *
 * Structure verified against the live board 2026-08-28; the full capture and
 * every trap are recorded in
 * `source-material/news/cannon/Cannon School - News - News Board Structure.md`.
 *
 * This parser is deliberately isolated to this school. Do NOT generalize it with
 * Providence Day's parser — both are Finalsite, but Cannon's board is a LEANER
 * variant that omits `<time>` entirely and carries no summary, so the two
 * disagree on where the date comes from. One school's redesign must never break
 * another's section.
 *
 * TWO BOARDS, ONE PAGE. `/news-and-stories` renders two Finalsite boards:
 *   • `fsBoard-10` — `cannon-news-cougar-news-internal-sources` (Cannon's own stories)
 *   • `fsBoard-11` — `cannon-news-headline-news-external-sources` (press mentions)
 * Both are Cannon news and both are kept. They are NOT interleaved by date on
 * the page — the internal board runs current while the external board trails by
 * over a year — so date sorting in `normalizeItems` is what actually orders the
 * section, not the board's own DOM order.
 */

/** Prefer a mid-range render. Cannon's board offers 256/400/455/512/555/667/768
    per article (the set varies by upload), so ~640 lands on a real thumbnail
    without pulling the largest original. */
const TARGET_WIDTH = 640

type Sized = { url?: string; width?: number }

/**
 * TRAP 1 — the photo is not in `src`.
 *
 * As on Providence Day, the <img> carries NO src; real URLs live in
 * `data-image-sizes` as an HTML-entity-encoded JSON array of {url,width}. A
 * naive src="…jpg" scrape finds ZERO photos and renders every row photo-less,
 * which reads as a correct application of the "some articles have no photo"
 * rule while actually being a parser bug.
 *
 * All 18 Cannon articles carry a photo, so a photo-less row here is a signal
 * worth noticing rather than normal.
 *
 * Reading via the DOM decodes the entities. Any shape change means "no photo",
 * never a crashed section.
 */
function pickPhoto(img: Element | null): string | undefined {
  if (!img) return undefined
  const raw = img.getAttribute('data-image-sizes')
  if (!raw) return undefined
  try {
    const sizes = JSON.parse(raw) as Sized[]
    if (!Array.isArray(sizes) || !sizes.length) return undefined

    const usable = sizes.filter(
      (s): s is Required<Sized> => typeof s?.url === 'string' && typeof s?.width === 'number',
    )
    if (!usable.length) return undefined

    // Smallest variant that still meets the target, else the largest available.
    const atLeast = usable.filter((s) => s.width >= TARGET_WIDTH)
    const chosen = atLeast.length
      ? atLeast.reduce((a, b) => (a.width <= b.width ? a : b))
      : usable.reduce((a, b) => (a.width >= b.width ? a : b))
    return chosen.url
  } catch {
    return undefined
  }
}

/**
 * Finalsite appends a screen-reader-only "(opens in new window/tab)" span
 * inside the title anchor of any post that opens externally. `textContent`
 * would fold it into the headline, shipping
 * "CANNON SCHOOL CELEBRATES MILESTONE (opens in new window/tab)" as the title.
 */
function titleText(link: Element): string {
  const clone = link.cloneNode(true) as Element
  for (const sr of Array.from(clone.querySelectorAll('.fsStyleSROnly, [data-nosnippet]'))) {
    sr.remove()
  }
  return (clone.textContent ?? '').replace(/\s+/g, ' ').trim()
}

export function parse(html: string, _boardUrl: string): NewsItem[] {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const items: NewsItem[] = []

  for (const article of Array.from(doc.querySelectorAll('article[data-post-id]'))) {
    const titleLink = article.querySelector('div.fsTitle a')
    const title = titleLink ? titleText(titleLink) : ''

    const href =
      titleLink?.getAttribute('href') ??
      article.querySelector('a.fsPostLink[href]')?.getAttribute('href') ??
      ''
    if (!title || !href) continue

    /* Skip rows that link straight to an uploaded FILE rather than an article
       page. One press-mention row points at a scanned newspaper PDF on
       resources.finalsite.net: it has no article page, so it can yield neither
       a date nor a preview, and — because the 10-item cap is applied on board
       order BEFORE dates are known — it would otherwise occupy the last slot
       and push out a real, newer story. */
    if (/\.(pdf|docx?|pptx?|xlsx?|zip)(\?|#|$)/i.test(href)) continue

    // TRAP — no date on the board. Cannon's board emits NO <time> element and
    // no date markup of any kind; the date lives only on the article page, in
    // an `article:published` meta tag. `date: null` here is therefore expected,
    // and `preview()` supplies the real date on the second pass.
    const photo = pickPhoto(article.querySelector('img[data-image-sizes]'))

    items.push({ title, url: href, date: null, ...(photo ? { photo } : {}) })
  }

  return items
}

/**
 * The article page carries BOTH the preview text and the date, so the second
 * pass returns them together.
 *
 * TRAP 2 — `og:description` is boilerplate.
 *
 * Every Cannon article returns the literal string
 * "In the News Details - Cannon School " as its og:description. Note this is a
 * DIFFERENT boilerplate string than Providence Day's "News Post" — which is
 * exactly why the value must be eyeballed per school rather than pattern-matched.
 * It is non-empty and would ship as an identical preview on every row.
 *
 * TRAP 3 — the school-description FOOTER is prose.
 *
 * Every page ends with "Cannon School is an accredited, coeducational,
 * independent JrK-12 college preparatory school located in Concord, North
 * Carolina." plus a non-discrimination paragraph, inside `<footer id="fsFooter">`.
 * Both are well over 60 chars and read as article prose. Scoping to the
 * article's own `div.fsBody` excludes them STRUCTURALLY — no wording guard
 * needed, so a reworded footer cannot leak back in.
 *
 * TRAP 4 — a byline or editor's note can outrank the story.
 *
 * 3 of 17 Cannon articles (18%) lead with one, in two distinct shapes:
 *   • A standalone "Editor's Note: …" paragraph (421 chars on "The Gift of Joy")
 *     — skipped entirely.
 *   • A press byline GLUED to the opening sentence in one paragraph:
 *     "By LANGSTON WERTZ JR., The Charlotte Observer Cannon School girls'
 *     basketball coach…" — the byline is stripped and the sentence kept.
 *
 * The byline pattern is anchored on a known-outlet suffix rather than a greedy
 * run of capitalized words. A greedy run cannot tell an outlet name from the
 * story's own first words, and measurably over-consumed both ways during
 * development: it left "Independent Tribune No matter what happens…" when too
 * narrow, and ate "No" and "Cannon School" when too wide. Both failures read as
 * grammatical sentences, which is what makes this class expensive.
 */

/** A <p> that is really a caption, credit, or editor's note — not article prose. */
function isNotStory(el: Element): boolean {
  if (el.closest('figure, figcaption, .fsImageCaptioned, .fsCaption')) return true
  return /^\s*(editor.{0,3}s note\b|pictured\b|photo(graph)?\s*(by|:)|\(l\b|above|l-r|l to r)/i.test(
    el.textContent ?? '',
  )
}

/**
 * Strips "By NAME" / "By NAME, The Outlet" from the head of a paragraph.
 * The outlet clause is consumed only up to a recognized publication suffix, so
 * a sentence beginning with a capitalized word is never mistaken for one.
 */
const BYLINE =
  /^\s*By\s+(?:[A-Z][\w.'’-]*|[A-Z]{2,}\.?)(?:\s+(?:[A-Z][\w.'’-]*|[A-Z]{2,}\.?|Jr\.|Sr\.|II|III))*(?:\s*,\s*(?:The\s+)?[A-Z][\w.'’-]*(?:\s+[A-Z][\w.'’-]*)*?\s*(?=(?:Tribune|Observer|Times|Post|Journal|News|Herald|Gazette|Press|Magazine|Weekly)\b))?(?:\s*(?:Tribune|Observer|Times|Post|Journal|News|Herald|Gazette|Press|Magazine|Weekly))?\s*[-–—:|]?\s*/

export function preview(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  // Scoped to the article body — see TRAP 3. Falling back to the whole document
  // would readmit the footer boilerplate, so a missing fsBody means no preview.
  const scope = doc.querySelector('article div.fsBody, div.fsBody')
  if (!scope) return undefined

  for (const p of Array.from(scope.querySelectorAll('p'))) {
    if (isNotStory(p)) continue
    // textContent decodes &#39; / &nbsp; for us; NBSP still needs flattening.
    const raw = (p.textContent ?? '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim()
    const text = raw.replace(BYLINE, '').trim()
    if (text.length > 60) return truncatePreview(text)
  }
  return undefined
}

/**
 * The board publishes no date (see `parse`), so it is read from the article
 * page's `article:published` meta tag — ISO-8601, verified varied across all
 * 17 in-site articles. `page-published` is a DIFFERENT tag on the same page
 * that reports when the CMS *page container* was created, identical across
 * articles; using it would sort every item to the same instant.
 */
export function publishedAt(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const meta = doc.querySelector('meta[property="article:published"]')
  const value = meta?.getAttribute('content')?.trim()
  if (!value) return undefined
  return Number.isNaN(Date.parse(value)) ? undefined : value
}
