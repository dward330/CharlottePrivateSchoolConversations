import { truncatePreview, type NewsItem } from '../types'

/**
 * Charlotte Country Day School — Finalsite post board.
 *
 * Structure verified against the live board 2026-08-28 (20 posts, all
 * server-rendered, HTTP 200, ~69KB); the full capture and every trap below are
 * recorded in
 * `source-material/news/charlotte-country-day/Charlotte Country Day - News - News Board Structure.md`.
 *
 * This parser is deliberately isolated to this school. It is the FOURTH
 * Finalsite board in the app and shares no code with the other three, even
 * though the CMS is the same — one school's redesign must never break
 * another's section. Each of the four differs materially: Providence Day
 * publishes photos and a <time>; Charlotte Catholic publishes neither photos
 * nor a summary; Charlotte Christian publishes photos but no date anywhere;
 * this board publishes photos AND real dates, and adds a trap none of the
 * others have (TRAP 3).
 */

/** Hostname whose article pages this parser can actually read. See TRAP 3. */
const SCHOOL_HOST = /(^|\.)charlottecountryday\.org$/i

/**
 * TRAP 1 — the photo is NOT in `src`. (The standing Finalsite trap.)
 *
 * Every thumbnail is an <img> with NO src attribute at all; the real URLs live
 * in `data-image-sizes` as an HTML-ENTITY-encoded JSON array of {url,width}.
 * A naive `src=` scrape finds ZERO photos on all 20 posts and renders every row
 * photo-less — which looks exactly like a correct application of the "some
 * boards publish no photos" rule while actually being a parser bug.
 *
 * Note the encoding differs per school even within Finalsite: this site
 * HTML-entity-encodes the JSON (`&quot;url&quot;`), as Providence Day does,
 * where Charlotte Catholic PERCENT-encodes it. `textContent` on a detached
 * element decodes entities for us, so no hand-rolled unescaper is needed.
 *
 * 19 of 20 posts carry a photo; the 20th genuinely has none. That row renders
 * without a thumbnail by design — verified by inspection, not inferred from a
 * failed scrape.
 */
function photoFrom(img: Element | null): string | undefined {
  const raw = img?.getAttribute('data-image-sizes')
  if (!raw) return undefined
  try {
    // The attribute value arrives entity-encoded; decode via the DOM rather
    // than a regex so &quot; / &amp; / &#39; are all handled identically.
    const decoder = img!.ownerDocument.createElement('textarea')
    decoder.innerHTML = raw
    const sizes = JSON.parse(decoder.value) as Array<{ url?: string; width?: number }>
    if (!Array.isArray(sizes) || !sizes.length) return undefined
    // Prefer a mid-range width (~640px): the 256px thumbnail is visibly soft on
    // a retina card and the 1080px original is wasted bytes for a list row.
    const sorted = sizes
      .filter((s) => typeof s.url === 'string' && s.url)
      .sort((a, b) => Math.abs((a.width ?? 0) - 640) - Math.abs((b.width ?? 0) - 640))
    return sorted[0]?.url
  } catch {
    // A shape change means "no photo", never a crashed section.
    return undefined
  }
}

export function parse(html: string, _boardUrl: string): NewsItem[] {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const items: NewsItem[] = []

  for (const article of Array.from(doc.querySelectorAll('article[data-post-id]'))) {
    const titleLink = article.querySelector('div.fsTitle a')
    const title = titleLink?.textContent?.trim() ?? ''

    /* TRAP 2 — the article slug is NOT derivable from the title, and posts are
       spread across MULTIPLE sub-boards (`~board/school-news/`,
       `~board/athletics-news/`). "Senior Convocation Celebrates the Class of
       2027…" lives at `…/class-of-2026-college-admissions-outcomes`-style
       slugs that do not match their headline. URLs are therefore read from the
       markup only — a constructed URL returns a plausible HTTP 404 page. */
    const href =
      titleLink?.getAttribute('href') ??
      article.querySelector('a.fsPostLink[href]')?.getAttribute('href') ??
      ''
    if (!title || !href) continue

    const date = article.querySelector('time[datetime]')?.getAttribute('datetime') ?? null
    const photo = photoFrom(article.querySelector('img[data-image-sizes]'))

    items.push({ title, url: href, date, ...(photo ? { photo } : {}) })
  }

  return items
}

/**
 * TRAP 3 — TWO posts link OFF-SITE, to instagram.com.
 *
 * This board mixes ordinary article posts with link posts: 18 of 20 carry
 * `data-opens-in="page"` and point at charlottecountryday.org, while 2 carry
 * `data-opens-in="linked_url"` and point straight at instagram.com/p/… . They
 * are real published items with a real title, date and photo — only the
 * destination leaves the school's domain.
 *
 * They must be KEPT (dropping them would silently hide two of the school's own
 * posts) but they must NOT be fetched for a preview:
 *
 *  - instagram.com is not in the Worker's ALLOWED_HOSTS and must never be added
 *    — the allow-list exists to stop this relay becoming an open proxy, and it
 *    is scoped to school domains.
 *  - So the fetch returns 403, which `hydratePreviews` swallows silently. The
 *    row renders correctly either way, but it burns a proxy request per load,
 *    and a future reader debugging a 403 in the Network tab would be chasing
 *    correct behaviour.
 *  - Instagram serves a login wall to server-side clients regardless, so there
 *    is no preview to extract even if it were allow-listed.
 *
 * `preview()` therefore returns undefined for any page that is not a Country
 * Day article, detected from the fetched document's own canonical/og:url rather
 * than from the item URL — `preview` receives only the HTML, and a login wall
 * or interstitial must fail closed.
 *
 * At the time of writing both off-site posts sit at #12 and #14 by date, so the
 * MAX_ITEMS=10 cap happens to exclude them today. That is a property of the
 * calendar, not of the board, and it will stop being true; the guard does not
 * depend on it.
 */
function isSchoolArticlePage(doc: Document): boolean {
  const canonical =
    doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ??
    doc.querySelector('meta[property="og:url"]')?.getAttribute('content') ??
    ''
  if (!canonical) return false
  try {
    return SCHOOL_HOST.test(new URL(canonical).hostname)
  } catch {
    return false
  }
}

/**
 * TRAP 4 — `og:description` is boilerplate, and worse than the other boards'.
 *
 * Every article page returns the literal string
 * "School News Detail-Charlotte Country Day" — verified identical across all 18
 * on-site posts. It is non-empty, so it passes a naive check and would ship the
 * same sentence as the preview on every row.
 *
 * TRAP 5 — the first <p> on the page is the SITE NAV, ~1,400 chars of it.
 *
 * Unscoped, the first <p> over 60 chars on every article page is the navigation
 * menu flattened into one run ("SummerSwimAlumniAlumni Photo Gallery(opens in
 * new window/tab)Alumni StoriesAthletics Hall of Honor…"). It is long,
 * non-empty and would ship as the preview on ALL 20 rows. Scoping to
 * `div.fsBody` — the post's own body, which appears exactly once per page and
 * excludes the surrounding chrome — is what removes it. `.fsPageBody` is NOT
 * tight enough here: it occurs 4× and wraps the nav.
 *
 * TRAP 6 — three posts open with a BYLINE, not with the story.
 *
 * "By Allison Slater Tate, Director of College Counseling, originally published
 * on grownandflown.com" and "By Dr. Danielle Scott, Director of Health &
 * Wellness" are 52–114 chars, grammatical, and tell a parent nothing about the
 * article. They pass a >60 rule (one of them) and read as a real preview, which
 * is the same failure shape as Providence Day's photo captions: plausible, and
 * not what the story is about. Bylines are skipped by pattern so the rule steps
 * on to the actual opening sentence.
 *
 * Captions are excluded structurally, as on the other Finalsite boards.
 */

/** A <p> that is really an image caption or photo credit, not article prose. */
function isCaption(el: Element): boolean {
  if (el.closest('figure, figcaption, .fsImageCaptioned, .fsCaption')) return true
  return /^\s*(pictured|photo|above|l-r|l to r)\b[:—-]/i.test(el.textContent ?? '')
}

/** An author line, not the story. See TRAP 6. */
function isByline(text: string): boolean {
  return /^\s*(by|written by|story by|photos?\s+by)\b[\s:]/i.test(text)
}

export function preview(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')

  // TRAP 3: an off-site link post (or a login wall) has no readable body.
  if (!isSchoolArticlePage(doc)) return undefined

  // TRAP 5: `div.fsBody` is the post's own body. `.fsPageBody` wraps the nav.
  const scope = doc.querySelector('div.fsBody') ?? doc.body
  if (!scope) return undefined

  for (const p of Array.from(scope.querySelectorAll('p, div'))) {
    if (isCaption(p)) continue
    // Leaf blocks only: a <div> wrapping other blocks is a layout container,
    // never the paragraph we want.
    if (p.querySelector('p, div, ul, ol, table, figure')) continue
    const text = (p.textContent ?? '')
      .replace(/[ ﻿]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (isByline(text)) continue
    if (text.length > 60) return truncatePreview(text)
  }
  return undefined
}
