import { truncatePreview, type NewsItem } from '../types'

/**
 * Charlotte Catholic High School — Finalsite post board.
 *
 * Structure verified against the live board 2026-08-28 (18 posts, all
 * server-rendered); the full capture and every trap below are recorded in
 * `source-material/news/charlotte-catholic/Charlotte Catholic - News - News Board Structure.md`.
 *
 * This parser is deliberately isolated to this school. It is the SECOND
 * Finalsite board in the app and it does NOT share code with Providence Day's,
 * even though the CMS is the same — one school's redesign must never break
 * another's section. The differences below are exactly why that isolation earns
 * its keep: the same CMS ships a materially different board here.
 */

/**
 * TRAP 1 — this board publishes NO article photos, and that is a REAL finding.
 *
 * The board listing carries no <img> at all (0 of 18 posts), and the article
 * pages carry only six site-furniture crests — the CCHS LogoCrest plus the
 * Diocese of Charlotte, Catholic Schools, MACS and Lumen accreditation logos in
 * the footer, identical on every page. There is no hero image and no thumbnail.
 *
 * This was verified by INSPECTION, not concluded from a failed scrape, because
 * the two mistakes here are symmetrical and both ship silently:
 *
 *  - Missing the photos (the classic Finalsite trap — real URLs hide in
 *    `data-image-sizes`, never in `src`) renders every row photo-less, which
 *    looks exactly like a correct "this school publishes no photos" result.
 *  - Scraping `data-image-sizes` naively finds those six footer crests on every
 *    page and would stamp an accreditation logo on all ten rows as if it were
 *    the story's photo.
 *
 * So the parser emits no photo, and the rows render text-only by design. If
 * CCHS later adds article images, note their encoding differs from Providence
 * Day's: this site PERCENT-encodes the JSON (`%22url%22`), where Providence Day
 * HTML-entity-encodes it. A port of that parser would decode nothing and find
 * zero photos while appearing to work.
 */

export function parse(html: string, _boardUrl: string): NewsItem[] {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const items: NewsItem[] = []

  for (const article of Array.from(doc.querySelectorAll('article[data-post-id]'))) {
    const titleLink = article.querySelector('div.fsTitle a')
    const title = titleLink?.textContent?.trim() ?? ''

    const href =
      titleLink?.getAttribute('href') ??
      article.querySelector('a.fsPostLink[href]')?.getAttribute('href') ??
      ''
    if (!title || !href) continue

    // The board emits TWO <time> elements per post sharing one datetime — a
    // .fsDate and a .fsTime. Either carries the full ISO-8601 stamp, so the
    // first match is correct and the pair needs no special handling.
    const date = article.querySelector('time[datetime]')?.getAttribute('datetime') ?? null

    items.push({ title, url: href, date })
  }

  return items
}

/**
 * TRAP 2 — `og:description` is boilerplate.
 *
 * Every CCHS article page returns the literal string
 * "News Details - Charlotte Catholic High School" as its og:description —
 * verified identical across all 18 posts. It is non-empty, so it passes a naive
 * check and would ship the same sentence as the preview on every single row.
 * It is also worse than Providence Day's "News Post": it is long and
 * sentence-shaped, so it reads as a real preview rather than as obvious filler.
 *
 * TRAP 3 — the board carries no summary, so previews need a per-article fetch.
 *
 * Unlike Carmel Christian's RSS feed, nothing in this board's list markup holds
 * preview text: a post is a title, a link and a timestamp. The only real
 * preview is the first substantive paragraph of the article body.
 *
 * TRAP 4 — a short lede paragraph must be SKIPPED, not shipped.
 *
 * Two posts open with a paragraph under 60 chars — "History made." and
 * "For Immediate Release: January 31, 2026". The >60 rule steps past both to
 * the real opening sentence, which is the desired behaviour rather than an
 * accident: "History made." alone tells a parent nothing.
 *
 * TRAP 5 — a VIDEO post keeps its prose in a <div>, not a <p>.
 *
 * Two posts (the president announcement and the bishop's letter) embed a Vimeo
 * iframe and then write their body copy in bare <div>s; their only <p> is an
 * empty &nbsp; spacer. A <p>-only rule returns NO preview for them — which is
 * safe, but silently drops the preview from a top-of-board story.
 *
 * The fix must not simply widen the search to <div>, because the first long
 * <div> on those same pages is the site nav flattened into one run
 * ("DirectoryCalendarMake a GiftLunch MenuContact Us…"). That text is over 60
 * chars and reads as garbage, so widening naively ships worse output than
 * emitting nothing. Only LEAF blocks — those containing no nested block of
 * their own — are considered, which selects the prose <div> and rejects every
 * wrapper that swallows chrome.
 *
 * Captions are excluded structurally, as on the other Finalsite board. No CCHS
 * post currently leads with a captioned figure, but the guard costs nothing and
 * the defect it prevents was invisible to a `curl` pass on the other school.
 */

/** A <p> that is really an image caption or photo credit, not article prose. */
function isCaption(el: Element): boolean {
  if (el.closest('figure, figcaption, .fsImageCaptioned, .fsCaption')) return true
  return /^\s*(pictured|photo|above|l-r|l to r)\b[:—-]/i.test(el.textContent ?? '')
}

export function preview(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  // `div.fsBody` is the post's own body and appears exactly ONCE per page —
  // tighter than `.fsPageBody`, which also wraps the surrounding page chrome.
  const scope = doc.querySelector('div.fsBody') ?? doc.querySelector('.fsPageBody') ?? doc.body
  if (!scope) return undefined

  for (const p of Array.from(scope.querySelectorAll('p, div'))) {
    if (isCaption(p)) continue
    // TRAP 5: leaf blocks only. A <div> wrapping other blocks is a layout
    // container (or the nav), never the paragraph we want.
    if (p.querySelector('p, div, ul, ol, table, figure')) continue
    // textContent decodes &#39; / &nbsp; for us. NBSP still needs flattening,
    // and at least one post opens with a UTF-8 BOM (U+FEFF) mid-document that
    // would otherwise count toward the length and lead the preview.
    const text = (p.textContent ?? '')
      .replace(/[ ﻿]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (text.length > 60) return truncatePreview(text)
  }
  return undefined
}
