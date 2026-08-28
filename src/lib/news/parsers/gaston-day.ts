import { truncatePreview, type NewsItem } from '../types'

/**
 * Gaston Day School — "Spartan Athletics" news board on `gastondayathletics.com`.
 *
 * Structure verified against the live board 2026-08-28 (8 posts across two
 * pages, all server-rendered, HTTP 200, 41KB + 32KB); the full capture and
 * every trap below are recorded in
 * `source-material/news/gaston-day/Gaston Day - News - News Board Structure.md`.
 *
 * TWO firsts for this app, and they are the reason nothing here was ported:
 *
 *  - **A tenth CMS — Eventlink** (`static.eventlink.com` assets, an
 *    "Powered By Eventlink" footer). It matches none of the four in the skill's
 *    CMS table: no `fsElement`, no `wp-content` post markup, no `sqs-`, no
 *    SIDEARM. Every selector below is specific to it.
 *  - **The board lives on the school's OWN ATHLETICS DOMAIN**, not on
 *    `gastonday.org`. That is legitimate school-published news under the rule
 *    the user settled 2026-08-28 for Charlotte Latin's `clshawks.com` — but the
 *    relationship is INVERTED here: for Latin the athletics site is a declared
 *    EXTRA host beside the main board; for Gaston Day it IS the board. The
 *    same-site test in `normalizeItems` anchors on the board URL, so every row
 *    is same-site by construction and this school needs NO `alsoAllowedHosts`
 *    at all. Adding one would be cargo-culting Latin's shape onto a board that
 *    does not have its problem.
 *
 * Ownership was confirmed from the site itself rather than assumed from the
 * domain name: the board serves `<title>News - Gaston Day School</title>`,
 * brands as "Gaston Day School / Spartan Athletics", and links to
 * `gastonday.org` for the official athletics handbook.
 */

/**
 * TRAP 1 — the board publishes NO DATE, but the ARTICLE PAGES DO.
 *
 * Verified by inspection rather than concluded from a failed selector, since
 * "no date" and "the date moved" look identical from a parser that finds none.
 * The board listing has zero `<time>`, zero `datetime=`, zero `data-*date*`
 * and no date-shaped text — a row is a cover photo, a title and a "READ MORE"
 * link, and that is the whole row.
 *
 * This puts Gaston Day with CANNON and COVENANT DAY (dateless board, dated
 * article page → supplies a `publishedAt` hook), NOT with CHARLOTTE CHRISTIAN
 * and DAVIDSON DAY (dateless everywhere → every item stays `date: null`).
 * Getting that split wrong in either direction is silent: omitting the hook
 * ships 8 undated rows in the board's DOM order, and expecting a board date
 * ships an empty section.
 *
 * Because the dates only arrive on the second pass, the board's own DOM order
 * is NOT trusted as chronological — `fetchNews` re-sorts once they land.
 */

/**
 * TRAP 2 — the cover photo IS in `src`, unlike every Finalsite sibling.
 *
 * Five of the nine parsers in this app decode `data-image-sizes`, because
 * Finalsite hides real image URLs there and leaves `src` empty. Eventlink does
 * the opposite: it emits a plain absolute `src` on `img.size-img-news`, AND
 * repeats the same URL in a `background-image:` style on the wrapper (for a
 * blurred backdrop effect).
 *
 * So the Finalsite decoder is not merely unnecessary here — it would find zero
 * photos and render all 8 rows photo-less, reading as "this school publishes no
 * cover images" while actually being a ported-parser bug. This is the concrete
 * case the one-parser-per-school rule exists for.
 *
 * All 8 posts carry a photo, so a photo-less result means the parser broke.
 */

/** The board wraps each post in a Bootstrap column; the title block carries the
    only stable class on the row (`news-title`). */
const ROW_SELECTOR = 'div.news-title'

export function parse(html: string, _boardUrl: string): NewsItem[] {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const items: NewsItem[] = []

  // Anchored on the READ MORE link's href shape rather than on a class, because
  // the row's own classes are Bootstrap utilities (`col-lg-6 p-2 …`) shared with
  // non-post layout columns elsewhere on the page. `a[href^="/Article/"]` is the
  // one thing unique to a post.
  for (const titleBlock of Array.from(doc.querySelectorAll(ROW_SELECTOR))) {
    const link = titleBlock.querySelector('a[href^="/Article/"]')
    const href = link?.getAttribute('href') ?? ''

    // The headline is the bold div beside the READ MORE link — NOT the link's
    // own text, which is the literal string "READ MORE »" on every row.
    const title = titleBlock.querySelector('div.fw-bold')?.textContent?.trim() ?? ''
    if (!title || !href) continue

    // TRAP 2: a real `src`, no data-attribute decoding. Scoped to the enclosing
    // column so a row picks up its OWN cover photo rather than the first on the
    // page. `img.size-img-news` is the foreground image; the identical URL also
    // appears as a wrapper background, which is deliberately not read.
    const column = titleBlock.parentElement
    const photo =
      column?.querySelector('img.size-img-news')?.getAttribute('src') ?? undefined

    // TRAP 1: no date on the board — supplied by `publishedAt` on the second pass.
    items.push({ title, url: href, date: null, ...(photo ? { photo } : {}) })
  }

  return items
}

/**
 * TRAP 3 — the byline and the date are the SAME element, and it sits directly
 * above the body.
 *
 * Every article page carries exactly one:
 *
 *     <p class="text-muted">By Lulu Brase | Aug 25, 2026 10:20 PM</p>
 *
 * That single `<p>` is both the date source (`publishedAt`) and the preview
 * hazard (`preview`) — one element, two opposite jobs.
 *
 * A "first substantive <p> on the page" rule would be saved here ONLY by the
 * byline being 44 characters, under the 60-char floor. That is luck, not a
 * rule: one longer author name ("By Katherine Vanderbilt-Montgomery | …") ships
 * the byline as the preview on all 8 rows, grammatically and plausibly. This is
 * the same near-miss recorded for Davidson Day's `fsAuthor`, and it is excluded
 * the same way — STRUCTURALLY.
 *
 * The exclusion is cheap here because Eventlink gives the body its own class:
 * `p.mb-0.linkify-this`, present exactly once per page, holding the entire
 * article. Selecting it directly cannot pick up the byline no matter how long
 * the byline grows, and cannot pick up a caption either — the `<figure>` that
 * sits between byline and body on photo-led posts is outside it.
 *
 * TRAP 4 — the body is ONE paragraph with ENCODED NEWLINES.
 *
 * Eventlink stores the article as a single `<p style="white-space: pre-wrap">`
 * with paragraph breaks as literal `&#xA;&#xA;` rather than as separate <p>
 * elements. `textContent` decodes those to real newlines, so without collapsing
 * whitespace the preview would carry hard line breaks mid-sentence. The
 * collapse below is therefore load-bearing, not cosmetic.
 */
export function preview(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')

  // TRAP 3: the body has a dedicated class, so the byline is excluded by
  // selection rather than by length or wording.
  const body = doc.querySelector('p.linkify-this')
  if (!body) return undefined

  // TRAP 4: collapse encoded newlines, NBSP and a possible BOM into spaces.
  const text = (body.textContent ?? '')
    .replace(/[ ﻿]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!text) return undefined

  return truncatePreview(text)
}

/**
 * TRAP 1 (second half) — parse the date out of the combined byline.
 *
 * Format: `By <author> | Aug 25, 2026 10:20 PM`. Only the part after the pipe
 * is a date, and the author name is free text that may itself contain a pipe or
 * a comma, so the split takes the LAST pipe segment rather than the second.
 *
 * `Date.parse` handles `Aug 25, 2026 10:20 PM` natively. The result is
 * normalised to ISO-8601 because `normalizeItems`/`byNewestFirst` sort on
 * `Date.parse` of this string, and an unparseable value sorts the row LAST
 * rather than crashing — so a format change degrades to "undated", never to a
 * broken section.
 *
 * No timezone is published. `Date.parse` therefore reads it as LOCAL time,
 * which is correct for a Gastonia, NC school read by Charlotte-area parents,
 * and in any case only affects ordering between two posts on the same day.
 */
export function publishedAt(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const byline = doc.querySelector('p.text-muted')?.textContent?.trim()
  if (!byline) return undefined

  // Take the LAST pipe-delimited segment: the author is free text.
  const parts = byline.split('|')
  if (parts.length < 2) return undefined
  const raw = parts[parts.length - 1].trim()
  if (!raw) return undefined

  const ms = Date.parse(raw)
  if (Number.isNaN(ms)) return undefined
  return new Date(ms).toISOString()
}
