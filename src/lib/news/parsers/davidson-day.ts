import { truncatePreview, type NewsItem } from '../types'

/**
 * Davidson Day School — Finalsite "All School News" post board (`fsBoard-5`).
 *
 * Structure verified against the live board 2026-08-28 and re-checked
 * 2026-11-01 (9 posts, all server-rendered, HTTP 200, ~94KB); the full capture
 * and every trap below are recorded in
 * `source-material/news/davidson-day/Davidson Day - News - News Board Structure.md`.
 *
 * The SIXTH Finalsite board in the app, and isolated from the other five for
 * the usual reason: the CMS is identical and the boards are not. This one is
 * closest to Charlotte Christian — no date on the board, photo on every post,
 * boilerplate og:description — but it differs from that sibling too, in the
 * field that matters most for the preview pass:
 *
 *  - Charlotte Christian's article pages end with a 442-char non-discrimination
 *    notice that a naive body scrape can ship as the preview. Davidson Day
 *    publishes no such notice, but it DOES publish a `div.fsAuthor` byline
 *    immediately above the body on every post — a different hazard needing a
 *    different guard (TRAP 3).
 *  - Providence Day and Charlotte Catholic both publish a real date on the
 *    board. This one keeps it on the article page (TRAP 1).
 *
 * A parser ported from any sibling would have produced a plausible,
 * wrong-looking-right result: an empty section, photo-less rows, or a byline
 * shipped as the preview on all nine rows.
 */

/**
 * TRAP 1 — the board publishes no date; the article page does.
 *
 *  - The BOARD listing has zero <time>, zero `datetime=`, zero `data-*date*`
 *    attribute and no date-shaped text. A post is a thumbnail, a title link and
 *    a "Read More" link — that is the whole row.
 *  - The ARTICLE page carries `article:published`, on 9/9 posts when checked
 *    2026-11-01. See `publishedAt`.
 *
 * ⚠️ A "NO DATE ANYWHERE" FINDING EXPIRES. On 2026-08-28 these article pages
 * carried no date at all, and this section was built to show none. By
 * 2026-11-01 they all did, and the section went on hiding them until a reader
 * asked why it looked out of date. Nothing can fail when a school STARTS
 * publishing something, so re-check this if the section looks stale.
 *
 * There is still no feed. `/rss`, `/feed`, `?format=rss`, `/rss.xml` and the
 * Finalsite `apps/news/news_rss.jsp` path all 404.
 *
 * ⚠️ ONE PROBE RETURNS HTTP 200 AND IS NOT A FEED.
 * `https://www.davidsonday.org/p/~board/all-school-news/rss` answers 200 —
 * with `content_type: text/html`, 62KB, and ZERO `<item>` elements. Finalsite
 * resolves the trailing `rss` as a POST SLUG and serves an article page (the
 * Bob McKillop post). Treating that 200 as a feed is the exact failure the
 * skill warns about: the wrong sheet served under a success code. It was
 * rejected on its content type and item count, not on its status.
 *
 * The board shows nine posts and a Load More button for the rest. Its order
 * matches its article dates exactly across those nine, so the section has its
 * newest posts without loading more, and it is marked `boardIsChronological`.
 */

/**
 * TRAP 2 — the photo is never in `src`, and BOTH encodings appear on this site.
 *
 * Finalsite hides real image URLs in `data-image-sizes`, a JSON array of
 * `{url,width}`. The `<img>` here carries `class="fsStyleSROnly"` and NO `src`
 * at all, so a naive `src="…jpg"` scrape finds zero photos and renders every
 * row photo-less — which reads as "this school publishes no photos" while
 * actually being a parser bug.
 *
 * As on Charlotte Christian, the encoding is not consistent within the site:
 * the same capture contains both entity-encoded (`&quot;url&quot;`) and
 * percent-encoded (`%22url%22`) payloads. A decoder handling only one finds
 * zero photos on the other.
 *
 * All 9 posts carry a photo (verified end-to-end, widths 500–640 selected), so
 * a photo-less result here means the parser broke, not that the school stopped
 * publishing images.
 */
function photoFrom(el: Element | null): string | undefined {
  const raw = el?.getAttribute('data-image-sizes')
  if (!raw) return undefined
  try {
    // getAttribute already resolves HTML entities, so only percent-encoding can
    // remain. Decoding is guarded because a stray literal '%' in a filename
    // would otherwise throw URIError.
    let json = raw
    if (json.includes('%22')) {
      try {
        json = decodeURIComponent(json)
      } catch {
        /* leave as-is; JSON.parse below decides */
      }
    }
    const sizes = JSON.parse(json) as Array<{ url?: string; width?: number }>
    const usable = sizes.filter((s) => s?.url)
    if (!usable.length) return undefined
    // Mid-range width: big enough for a retina thumbnail, far short of the
    // 2000px original this board also offers.
    const best = usable.reduce((a, b) =>
      Math.abs((b.width ?? 0) - 640) < Math.abs((a.width ?? 0) - 640) ? b : a,
    )
    return best.url
  } catch {
    // A shape change means "no photo", never a crashed section.
    return undefined
  }
}

export function parse(html: string, _boardUrl: string): NewsItem[] {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const items: NewsItem[] = []

  // `article[data-post-id]` rather than `article`: the page carries 16 <article>
  // elements, of which only 9 are posts — the other 7 are layout furniture with
  // no post id. Selecting on the bare tag would emit 7 title-less rows that
  // `normalizeItems` then drops: working by accident, and silently wrong the day
  // the furniture gains a title.
  for (const article of Array.from(doc.querySelectorAll('article[data-post-id]'))) {
    const titleLink = article.querySelector('div.fsTitle a')
    const title = titleLink?.textContent?.trim() ?? ''

    const href =
      titleLink?.getAttribute('href') ??
      article.querySelector('a.fsPostLink[href]')?.getAttribute('href') ??
      ''
    if (!title || !href) continue

    // The thumbnail wrapper and its <img> BOTH carry data-image-sizes. Prefer
    // the <img>; fall back to any carrier so a markup reshuffle degrades to the
    // wrapper rather than to no photo.
    const photo = photoFrom(
      article.querySelector('img[data-image-sizes]') ??
        article.querySelector('[data-image-sizes]'),
    )

    // TRAP 1: the date is on the article page, and arrives on the second pass.
    items.push({ title, url: href, date: null, ...(photo ? { photo } : {}) })
  }

  return items
}

/**
 * TRAP 3 — `og:description` is boilerplate, and the byline sits right above the
 * body.
 *
 * Every article page returns the literal string
 * "Posts Details/Default Board Post Page - Davidson Day School" as its
 * og:description — the CMS template's own name, identical on all 9 posts. It is
 * non-empty, so it passes a naive check and would ship as the preview on every
 * row. The board carries no summary either, so previews require a per-article
 * fetch of the body's first substantive paragraph.
 *
 * The hazard specific to THIS school is `div.fsAuthor`:
 *
 *     <div class="fsAuthor">Addison Lanter, Marketing Content Specialist</div>
 *     <div class="fsBody"><p>Davidson Day School is excited to announce…</p>
 *
 * It is present on all 9 posts, is prose-shaped, and sits IMMEDIATELY BEFORE
 * the body. A "first substantive <p> on the page" rule would be saved here only
 * by the byline being 45 chars — under the 60-char floor — which is luck, not a
 * rule: a longer title on a future byline ships "Jane Doe, Director of
 * Communications and Community Engagement" as the preview on every row.
 *
 * It is excluded STRUCTURALLY rather than by length or wording: the byline is a
 * sibling OUTSIDE `div.fsBody`, so scoping the paragraph search to that
 * container drops it on every post regardless of how long it gets. Verified:
 * `div.fsBody` and `div.fsAuthor` each appear exactly once per page, and the
 * author div is never nested inside the body.
 *
 * TRAP 4 — captions can outrank the lede, structurally excluded as elsewhere.
 *
 * Bodies here DO contain `<figure>` elements (the Class of 2025 post carries
 * several). Today every one of them sits BELOW the opening paragraphs, so a
 * plain "first <p>" rule happens to be correct on all 9 posts — but that is a
 * property of this week's posts, not of the board. The Providence Day defect
 * this guard exists for was invisible to a `curl` pass and only appeared in a
 * browser, so the guard is applied here before it is needed rather than after.
 *
 * Verified: all 9 posts resolve a real, on-topic preview under these rules.
 */

/** A <p> that is really an image caption or photo credit, not article prose. */
function isCaption(el: Element): boolean {
  if (el.closest('figure, figcaption, .fsImageCaptioned, .fsCaption')) return true
  return /^\s*(pictured|photo|above|l-r|l to r)\b[:—-]/i.test(el.textContent ?? '')
}

/** Backstop for TRAP 3 if the byline ever moves INSIDE the body container. */
function isByline(text: string): boolean {
  return /^[^.]{0,60},\s*(marketing|communications?|director|coordinator|specialist|head of)\b/i.test(
    text,
  )
}

export function preview(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  // `div.fsBody` is the post's own body and appears exactly ONCE per page. It
  // is tighter than the page wrapper, which also holds the `div.fsAuthor`
  // byline — that scoping IS the TRAP 3 fix.
  const scope = doc.querySelector('div.fsBody') ?? doc.body
  if (!scope) return undefined

  for (const p of Array.from(scope.querySelectorAll('p'))) {
    if (isCaption(p)) continue
    // textContent decodes &rsquo; / &#39; for us. NBSP still needs flattening,
    // and a stray BOM (U+FEFF) would otherwise count toward the length.
    const text = (p.textContent ?? '')
      .replace(/[ ﻿]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (text.length <= 60) continue
    if (isByline(text)) continue
    return truncatePreview(text)
  }
  return undefined
}

/**
 * TRAP 5 — the article page carries a decoy date.
 *
 * `page-published` is one template timestamp (2026-10-20T17:02:52) on every
 * post, so it would collapse the sort. Only `article:published` moves per post,
 * so the property is matched exactly. See TRAP 1 for why this exists at all.
 */
export function publishedAt(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const value = doc
    .querySelector('meta[property="article:published"]')
    ?.getAttribute('content')
    ?.trim()
  if (!value) return undefined
  return Number.isNaN(Date.parse(value)) ? undefined : value
}
