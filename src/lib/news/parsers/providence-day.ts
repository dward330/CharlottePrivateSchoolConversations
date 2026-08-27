import { truncatePreview, type NewsItem } from '../types'

/**
 * Providence Day School — Finalsite post board.
 *
 * Structure verified against the live board 2026-08-27; the full capture and
 * both traps are recorded in
 * `source-material/news/providence-day/Providence Day - News - News Board Structure.md`.
 *
 * This parser is deliberately isolated to this school. Do NOT generalize it with
 * another Finalsite school's parser — one school's redesign must never break
 * another's section.
 */

/** Prefer a mid-range render. Finalsite offers 256/512/800/1200/1600/2200; the
    thumbnail is 92px and the featured photo ~360px wide, so ~640 lands on the
    800 variant at 2x without pulling a 2200px original. */
const TARGET_WIDTH = 640

type Sized = { url?: string; width?: number }

/**
 * TRAP 1 — the photo is not in `src`.
 *
 * The <img> carries NO src attribute at all; it is lazy-hydrated client-side.
 * Real URLs live in `data-image-sizes` as an HTML-entity-encoded JSON array of
 * {url,width}. A naive src="…jpg" scrape finds ZERO photos and renders every
 * row photo-less — which looks exactly like a correct application of the "some
 * articles have no photo" rule while actually being a parser bug.
 *
 * Reading the attribute via the DOM (rather than the raw HTML) decodes the
 * entities for us. Any shape change means "no photo", never a crashed section.
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

export function parse(html: string, _boardUrl: string): NewsItem[] {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const items: NewsItem[] = []

  for (const article of Array.from(doc.querySelectorAll('article[data-post-id]'))) {
    const titleLink = article.querySelector('div.fsTitle a')
    const title = titleLink?.textContent?.trim() ?? ''

    // The thumbnail anchor and the title anchor share the class; either carries
    // the same absolute href.
    const href =
      titleLink?.getAttribute('href') ??
      article.querySelector('a.fsPostLink[href]')?.getAttribute('href') ??
      ''
    if (!title || !href) continue

    const date = article.querySelector('time[datetime]')?.getAttribute('datetime') ?? null
    const photo = pickPhoto(article.querySelector('img[data-image-sizes]'))

    items.push({ title, url: href, date, ...(photo ? { photo } : {}) })
  }

  return items
}

/**
 * TRAP 2 — `og:description` is boilerplate.
 *
 * Every Providence Day article page returns the literal string "News Post" as
 * its og:description. It is non-empty, so it passes a naive check and would
 * ship as an identical preview on every single row. Re-verified live 2026-08-27.
 *
 * The only real preview text is the first substantive paragraph of the article
 * body, scoped to `.fsPageBody` so nav and footer prose cannot be mistaken for
 * article copy on a short post.
 */
export function preview(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const scope = doc.querySelector('.fsPageBody') ?? doc.body
  if (!scope) return undefined

  for (const p of Array.from(scope.querySelectorAll('p'))) {
    // textContent decodes &#39; / &nbsp; for us; NBSP still needs flattening.
    const text = (p.textContent ?? '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim()
    if (text.length > 60) return truncatePreview(text)
  }
  return undefined
}
