import { truncatePreview, type NewsItem } from '../types'

/**
 * Charlotte Christian School — Finalsite "Knights Headlines" post board.
 *
 * Structure verified against the live board 2026-08-28 (9 posts, all
 * server-rendered); the full capture and every trap below are recorded in
 * `source-material/news/charlotte-christian/Charlotte Christian - News - News Board Structure.md`.
 *
 * The THIRD Finalsite board in the app, and deliberately isolated from the
 * other two. It shares no code with Providence Day's or Charlotte Catholic's
 * parser even though the CMS is identical, because this board differs from
 * BOTH of them in ways that would each ship silently:
 *
 *  - Providence Day publishes a real <time datetime>. This board publishes NO
 *    date (see TRAP 1) — a `time[datetime]` selector returns nothing.
 *  - Charlotte Catholic publishes NO photos and PERCENT-encodes its image
 *    JSON. This board publishes a photo on every post and ENTITY-encodes the
 *    JSON on the board (though percent-encodes it on article pages — see
 *    TRAP 2).
 *
 * A parser ported from either sibling would have produced a plausible,
 * wrong-looking-right result: photo-less rows, or an empty section.
 */

/**
 * TRAP 1 — this school publishes NO DATE ANYWHERE, and that is a real finding.
 *
 * Verified by inspection rather than concluded from a failed selector, because
 * "no date" and "the date moved" look identical from a parser that finds none:
 *
 *  - The board listing has zero <time>, zero `datetime=`, zero `.fsDate` and
 *    zero `.fsPostDate` (a post is a thumbnail, a title link and a tag list).
 *  - The ARTICLE pages have none either — no <time>, no `article:published_time`,
 *    no schema.org `datePublished`, and no date-shaped text anywhere in the
 *    rendered prose.
 *  - There is no feed to fall back on: `/rss`, `/feed`, `?format=rss` and the
 *    Finalsite `apps/news/news_rss.jsp` path all return 404, as does the
 *    `api/v1/news` board query.
 *
 * This differs from CANNON, which is also dateless ON THE BOARD but keeps its
 * date on the article page — Cannon therefore supplies a `publishedAt` hook.
 * Charlotte Christian has nothing for such a hook to fetch, so it supplies
 * none, and every item carries `date: null`.
 *
 * The consequence is deliberate and handled upstream: `normalizeItems` sorts
 * undated items last but STABLY, so the board's own DOM order — which is the
 * school's chosen ordering, newest first — is preserved rather than scrambled.
 * The rows render with no date, which is why `.news-row` treats the date column
 * as optional; see the section's CSS note.
 */

/**
 * TRAP 2 — the photo is never in `src`, and the encoding is not consistent
 * across this one site.
 *
 * Finalsite hides real image URLs in `data-image-sizes`, a JSON array of
 * `{url,width}`. On THIS site the BOARD entity-encodes it (`&quot;url&quot;`)
 * while ARTICLE pages percent-encode it (`%22url%22`) — both appear in the same
 * capture. A decoder that handles only one finds zero photos on the other and
 * renders photo-less rows, which reads as "this school publishes no photos".
 *
 * All 9 posts carry a photo, so a photo-less result here means the parser
 * broke, not that the school stopped publishing images.
 */
function photoFrom(el: Element | null): string | undefined {
  const raw = el?.getAttribute('data-image-sizes')
  if (!raw) return undefined
  try {
    // Handle BOTH encodings: getAttribute already resolves HTML entities, so
    // only percent-encoding can remain. Decoding is guarded because a stray
    // literal '%' in a filename would otherwise throw URIError.
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
    // 2200px original.
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

  // `article[data-post-id]` rather than `article`: the page carries 13 <article>
  // elements, of which 4 are layout furniture with no post id. Selecting on the
  // bare tag would emit 4 title-less rows that `normalizeItems` then drops —
  // working by accident, and silently wrong the day the furniture gains a title.
  for (const article of Array.from(doc.querySelectorAll('article[data-post-id]'))) {
    const titleLink = article.querySelector('div.fsTitle a')
    const title = titleLink?.textContent?.trim() ?? ''

    const href =
      titleLink?.getAttribute('href') ??
      article.querySelector('a.fsPostLink[href]')?.getAttribute('href') ??
      ''
    if (!title || !href) continue

    const photo = photoFrom(
      article.querySelector('img[data-image-sizes]') ??
        article.querySelector('[data-image-sizes]'),
    )

    // TRAP 1: no date is published anywhere on this site.
    items.push({ title, url: href, date: null, ...(photo ? { photo } : {}) })
  }

  return items
}

/**
 * TRAP 3 — `og:description` is boilerplate, and worse than the siblings'.
 *
 * Every article page returns the literal string
 * "Charlotte Christian School - Charlotte Christian School" as both its
 * og:description AND its meta description. It is non-empty, so it passes a
 * naive check, and it would ship the school's name twice as the preview on
 * every row. The board carries no summary of its own, so previews require a
 * per-article fetch of the body's first substantive paragraph.
 *
 * TRAP 4 — a legal boilerplate paragraph sits on EVERY article page.
 *
 * Every post ends with the school's 442-character non-discrimination notice
 * ("Charlotte Christian School admits students of any race, color, national and
 * ethnic origin…"). It is long, grammatical and prose-shaped, so a
 * "first <p> over 60 chars" rule applied to the whole page would ship it as the
 * preview for any article whose real lede is shorter than the threshold — and
 * one post ("Congratulations to the varsity baseball team…", 88 chars) has a
 * body of exactly one short paragraph, so the margin is thin.
 *
 * It is excluded STRUCTURALLY rather than by matching its wording: the notice
 * lives OUTSIDE `div.fsBody`, in page furniture below the post. Scoping to that
 * container drops it on all 9 posts without a text rule that a reworded notice
 * would defeat. A wording guard is kept only as a cheap backstop.
 *
 * TRAP 5 — the lede is often inside a captioned <figure>'s sibling, and two
 * posts open with a hero <figure> whose <img> carries an empty `src=""`.
 *
 * Captions are excluded structurally (`figure`/`figcaption`/`.fsImageCaptioned`
 * /`.fsCaption`) as on the other Finalsite boards, with a `Pictured:` text
 * guard as a backstop. This board has no captioned lede today; the guard costs
 * nothing and the defect it prevents was invisible to a `curl` pass on
 * Providence Day.
 *
 * Verified: all 9 posts resolve a real, on-topic preview under these rules.
 */

/** A <p> that is really an image caption or photo credit, not article prose. */
function isCaption(el: Element): boolean {
  if (el.closest('figure, figcaption, .fsImageCaptioned, .fsCaption')) return true
  return /^\s*(pictured|photo|above|l-r|l to r)\b[:—-]/i.test(el.textContent ?? '')
}

/** Backstop for TRAP 4 if the notice ever moves inside the body container. */
function isLegalBoilerplate(text: string): boolean {
  return /admits students of any race, color, national and ethnic origin/i.test(text)
}

export function preview(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  // `div.fsBody` is the post's own body and appears exactly ONCE per page. It
  // is tighter than `.fsPageBody`, which also wraps the page chrome holding the
  // non-discrimination notice — that scoping IS the TRAP 4 fix.
  const scope = doc.querySelector('div.fsBody') ?? doc.querySelector('.fsPageBody') ?? doc.body
  if (!scope) return undefined

  for (const p of Array.from(scope.querySelectorAll('p'))) {
    if (isCaption(p)) continue
    // textContent decodes &#39; / &mdash; for us. NBSP still needs flattening,
    // and a stray BOM (U+FEFF) would otherwise count toward the length.
    const text = (p.textContent ?? '')
      .replace(/[ ﻿]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (text.length <= 60) continue
    if (isLegalBoilerplate(text)) continue
    return truncatePreview(text)
  }
  return undefined
}
