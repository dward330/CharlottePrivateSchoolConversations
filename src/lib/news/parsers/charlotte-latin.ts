import { truncatePreview, type NewsItem } from '../types'

/**
 * Charlotte Latin School — Finalsite post board, FOUR category views merged.
 *
 * Structure verified against the live boards 2026-08-28; the full capture and
 * every trap below are recorded in
 * `source-material/news/charlotte-latin/Charlotte Latin - News - News Board Structure.md`.
 *
 * Deliberately isolated to this school, as every parser here is. It is the
 * FIFTH Finalsite board in the app and shares no code with the other four, even
 * though the CMS is the same — one school's redesign must never break another's
 * section. This board differs from all four siblings at once: it is the first
 * that is FOUR boards rather than one (TRAP 1), and the first dateless board
 * whose dates are recoverable (TRAP 2).
 */

/** Hostnames whose article pages this parser can read. TWO domains, on TWO
    DIFFERENT CMSes — see TRAP 4 and TRAP 8. */
const SCHOOL_HOST = /(^|\.)charlottelatin\.org$/i
const ATHLETICS_HOST = /(^|\.)clshawks\.com$/i

/**
 * TRAP 1 — the news is spread over FOUR category views, and they are NOT in
 * sync with each other.
 *
 * The user asked for four URLs merged into one date-ordered ten:
 *
 *   ?post_category_id=84   Arts        (51 on-site posts)
 *   ?post_category_id=85   Athletics   (49, of which 7 link off-site)
 *   ?post_category_id=167  School      (41)
 *   ?post_category_id=89   Academics   (10)
 *
 * Each view is a filtered slice of ONE underlying board (`fsBoard-209`), so
 * they cross-post: 10 articles appear on more than one view. De-duplication is
 * by URL in `normalizeItems` and needs nothing here.
 *
 * What makes the merge non-trivial is that the four are wildly out of step —
 * measured 2026-08-28, the newest post on each was 2026-05-22 (167), 2026-05-13
 * (84), 2026-04-21 (89) and 2026-04-09 (85). Interleaving them by DOM position
 * would ship a list ordered by neither date nor relevance.
 *
 * MEASURED PROPERTY THIS RELIES ON: each view is strictly newest-first
 * internally (verified over the first 12 on-site posts of all four boards —
 * monotonic on every one). So the newest N of the merged set are contained in
 * the first N of each view, and a shallow slice per board is sufficient. That
 * is what keeps the request count bounded — see PER_BOARD.
 */

/**
 * How many posts to take from EACH view before merging.
 *
 * The section shows ten. Because every view is internally newest-first, taking
 * the first `PER_BOARD` of each guarantees a correct global top ten as long as
 * no single view supplies more than `PER_BOARD` of that ten. Measured
 * 2026-08-28 the true ten drew 5 / 3 / 1 / 1 from the four views.
 *
 * Four is a deliberate cost trade, chosen by the user: 4 boards + ~16 article
 * fetches ≈ 20 requests per cold visitor, against ~11 for a single-board
 * school. Raising it to 10 would make the merge provably exact for any
 * publishing pattern but costs ~42 requests. `fetchNews` compensates for the
 * gap with a targeted top-up — see `saturatedBoards` there.
 */
export const PER_BOARD = 4

/**
 * TRAP 2 — the board publishes NO DATE, in any form.
 *
 * There is no <time>, no date class and no date data-attribute anywhere in the
 * list markup (verified: zero `<time datetime=` across all four views). This is
 * the Cannon/Charlotte Christian shape — but unlike Charlotte Christian, whose
 * article pages are dateless too, Latin's articles DO publish a real date, so
 * the section can honour "newest first" rather than falling back to DOM order.
 * See `publishedAt`.
 */

/**
 * TRAP 3 — the photo is NOT in `src`. (The standing Finalsite trap.)
 *
 * Thumbnails carry no `src` at all; the real URLs live in `data-image-sizes` as
 * an HTML-ENTITY-encoded JSON array of {url,width}, as on Providence Day and
 * Country Day (Charlotte Catholic percent-encodes the same field — the encoding
 * is per-school even within one CMS). A naive `src=` scrape finds ZERO photos
 * and renders every row photo-less, which reads as a correct application of the
 * "some boards publish no photos" rule while actually being a parser bug.
 *
 * Note the attribute appears on BOTH the wrapping <a class="fsCroppedImage">
 * and the inner <img>; either serves.
 */
function photoFrom(img: Element | null): string | undefined {
  const raw = img?.getAttribute('data-image-sizes')
  if (!raw) return undefined
  try {
    // Decode entities via the DOM rather than a regex so &quot; / &amp; / &#39;
    // are all handled identically.
    const decoder = img!.ownerDocument.createElement('textarea')
    decoder.innerHTML = raw
    const sizes = JSON.parse(decoder.value) as Array<{ url?: string; width?: number }>
    if (!Array.isArray(sizes) || !sizes.length) return undefined
    // Prefer ~640px: the 256px thumbnail is visibly soft on a retina card and
    // the 2200px original is wasted bytes for a list row.
    const sorted = sizes
      .filter((s) => typeof s.url === 'string' && s.url)
      .sort((a, b) => Math.abs((a.width ?? 0) - 640) - Math.abs((b.width ?? 0) - 640))
    return sorted[0]?.url
  } catch {
    // A shape change means "no photo", never a crashed section.
    return undefined
  }
}

/**
 * TRAP 4 — this board links to FOUR other hosts, and only ONE of them belongs.
 *
 * Eight rows across the four views point off the main domain:
 *
 *   5 × clshawks.com               the school's OWN athletics site — KEPT
 *   1 × www.sya.org                a study-abroad organisation     — dropped
 *   1 × issuu.com                  a document host                 — dropped
 *   1 × charlottelatinstories.com  does not resolve at all         — dropped
 *
 * `clshawks.com` is Charlotte Latin's athletics site — its pages carry
 * `og:site_name: Charlotte Latin School` — and the user confirmed 2026-08-28
 * that a school's own athletics coverage is legitimate news. Those rows are
 * KEPT, via `alsoAllowedHosts: ['clshawks.com']` in sources.ts.
 *
 * The other three stay dropped by the same rule, and the distinction is the
 * point: **being linked BY the school is not the same as being published BY the
 * school.** `alsoAllowedHosts` is an explicit per-school list precisely so that
 * judgement is made once, in review, rather than by a hostname heuristic that
 * would pass tomorrow's unknown domain.
 *
 * Fourteen posts on the Athletics view carry `data-opens-in="linked_url"`; that
 * attribute marks a link post but says nothing about WHOSE site it points to,
 * so it is not used for filtering. The host is what decides.
 */

/** Titles on link posts are suffixed by the CMS; strip it for display. */
function cleanTitle(raw: string): string {
  return raw
    .replace(/\s*\(opens in new window\/tab\)\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Parse ONE category view. `fetchNews` calls this once per URL and concatenates
 * the results; de-duplication, off-site dropping and ordering all happen after,
 * in `normalizeItems`.
 *
 * Slicing to PER_BOARD happens HERE, not after the merge, because the point of
 * the slice is to bound how many ARTICLE PAGES the date pass must fetch. A
 * post-merge slice would be applied to an unordered pile (no dates yet) and
 * would discard the wrong ones.
 */
export function parse(html: string, _boardUrl: string): NewsItem[] {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const items: NewsItem[] = []

  for (const article of Array.from(doc.querySelectorAll('article[data-post-id]'))) {
    const titleLink = article.querySelector('div.fsTitle a')
    const title = cleanTitle(titleLink?.textContent ?? '')

    /* URLs are read from the markup only. Slugs are not derivable from titles,
       and posts live under a `~board/news/post/` path the title never implies. */
    const href =
      titleLink?.getAttribute('href') ??
      article.querySelector('a.fsPostLink[href]')?.getAttribute('href') ??
      ''
    if (!title || !href) continue

    /* TRAP 2: no date exists in this markup. Every item leaves here with
       `date: null` and is dated by `publishedAt` on the second pass. */
    const photo = photoFrom(
      article.querySelector('img[data-image-sizes], a[data-image-sizes]'),
    )

    items.push({ title, url: href, date: null, ...(photo ? { photo } : {}) })

    /* Take only the newest PER_BOARD from this view. Safe because the view is
       strictly newest-first (TRAP 1); this is what bounds the request count.
       Off-site rows are counted here and dropped later, so a view heavy in link
       posts contributes fewer than PER_BOARD — deliberately, since fetching
       deeper to compensate is what `saturatedBoards` in fetchNews is for. */
    if (items.length >= PER_BOARD) break
  }

  return items
}

/**
 * TRAP 5 — `og:description` is boilerplate, identical on every article.
 *
 * Every article page returns the literal string
 * "News Details - Charlotte Latin School" — verified across three unrelated
 * posts. It is non-empty, so it passes a naive check and would ship the same
 * sentence as the preview on all ten rows.
 *
 * TRAP 6 — the first <p> unscoped is site navigation.
 *
 * As on Country Day, the first <p> over 60 chars on an article page is the
 * flattened nav menu unless the search is scoped. `div.fsBody` is the post's own
 * body and occurs exactly ONCE per page here; `.fsPageBody` occurs twice and
 * wraps chrome, so it is not tight enough.
 *
 * Captions are excluded structurally, and bylines by pattern, as on the sibling
 * Finalsite parsers — both classes of "grammatical but not the story" preview
 * have already shipped once in this project.
 */

/** A <p> that is really an image caption or photo credit, not article prose. */
function isCaption(el: Element): boolean {
  if (el.closest('figure, figcaption, .fsImageCaptioned, .fsCaption')) return true
  return /^\s*(pictured|photo|above|l-r|l to r)\b[:—-]/i.test(el.textContent ?? '')
}

/** An author line, not the story. */
function isByline(text: string): boolean {
  return /^\s*(by|written by|story by|photos?\s+by)\b[\s:]/i.test(text)
}

/** Fail closed on anything that is not a Latin article page — a page that was
    on-site when parsed but redirects away, or serves a login wall. */
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

/** True for an article on the school's ATHLETICS domain. See TRAP 8. */
function isAthleticsArticlePage(doc: Document): boolean {
  const canonical =
    doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ??
    doc.querySelector('meta[property="og:url"]')?.getAttribute('content') ??
    ''
  if (!canonical) return false
  try {
    return ATHLETICS_HOST.test(new URL(canonical).hostname)
  } catch {
    return false
  }
}

export function preview(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')

  // TRAP 8: the athletics site is a different CMS with a genuine description.
  if (isAthleticsArticlePage(doc)) {
    const og = doc
      .querySelector('meta[property="og:description"]')
      ?.getAttribute('content')
      ?.trim()
    return og && og.length > 40 ? truncatePreview(og) : undefined
  }

  if (!isSchoolArticlePage(doc)) return undefined

  // TRAP 6: `div.fsBody` is the post's own body. `.fsPageBody` wraps the nav.
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

/**
 * TRAP 8 — the KEPT athletics rows are on a COMPLETELY DIFFERENT CMS.
 *
 * Once `clshawks.com` rows are kept (TRAP 4), the second pass fetches article
 * pages from a site that shares nothing with Finalsite. It is SIDEARM Sports:
 *
 *   - `link[rel=canonical]` is on clshawks.com, so `isSchoolArticlePage` — which
 *     fails closed on any non-charlottelatin.org page — correctly rejects it.
 *     Without a second gate those rows get NO preview.
 *   - There is **no `article:published` meta at all**, so `publishedAt` returns
 *     undefined and the rows sort to the bottom as undated, beneath articles
 *     years older. That reads as a mis-ordered section rather than a broken one,
 *     which is harder to spot.
 *   - There is no `div.fsBody`, so the body-scoping rule finds nothing.
 *
 * Both are recoverable, and the athletics CMS is actually BETTER behaved than
 * Finalsite for this: its `og:description` is a genuine per-article summary
 * (not the boilerplate of TRAP 5), and its JSON-LD carries a clean ISO
 * `datePublished`. So the athletics branch reads those two fields directly and
 * skips the paragraph-scoping machinery entirely.
 *
 * The gates stay SEPARATE rather than being widened into one permissive check:
 * each host gets the extraction that is correct for its own CMS, and a page on
 * neither host still fails closed.
 */

/**
 * TRAP 7 — the article page carries TWO date metas, and the obvious one is wrong.
 *
 *   <meta name="page-published"        content="2025-10-29T19:16:39Z">   ← CMS page
 *   <meta property="article:published" content="2026-05-13T15:18:00Z">   ← the story
 *
 * `page-published` is when the news-details TEMPLATE was published, so it is
 * identical across unrelated articles and would collapse the entire sort. Only
 * `article:published` moves per post. Read the property, never the name.
 *
 * Verified present on 38/38 sampled articles.
 */
export function publishedAt(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')

  const meta = doc
    .querySelector('meta[property="article:published"]')
    ?.getAttribute('content')
    ?.trim()
  if (meta && !Number.isNaN(Date.parse(meta))) return meta

  /* TRAP 8 — the athletics site publishes NO `article:published`.
     Its date lives in a JSON-LD NewsArticle block instead. Without this the
     five athletics rows would be undated and sort to the very bottom, beneath
     articles years older — the section would look mis-ordered rather than
     broken, which is harder to notice. */
  for (const el of Array.from(
    doc.querySelectorAll('script[type="application/ld+json"]'),
  )) {
    try {
      const data = JSON.parse(el.textContent ?? '')
      for (const node of Array.isArray(data) ? data : [data]) {
        const d = node?.datePublished
        if (typeof d === 'string' && !Number.isNaN(Date.parse(d))) return d
      }
    } catch {
      // Malformed JSON-LD means "no date", never a crashed section.
    }
  }

  return undefined
}
