import { type NewsItem } from '../types'

/**
 * Carmel Christian School — SchoolSitePro RSS 2.0 feed.
 *
 * Structure verified against the live feed 2026-08-28; the full capture and
 * every trap are recorded in
 * `source-material/news/carmel-christian/Carmel Christian School - News - News Board Structure.md`.
 *
 * This parser is deliberately isolated to this school, like every other. It is
 * also the FIRST feed-based source in the app — Providence Day and Cannon both
 * scrape HTML boards. Do not generalize the three.
 *
 * WHY A FEED IS THE BETTER SOURCE HERE. The user supplied the RSS endpoint
 * rather than the HTML board, and it is strictly better for this purpose: every
 * field the section renders (title, link, date, summary, photo) is published
 * inline and machine-readable, so unlike both HTML parsers this school needs NO
 * second per-article pass — no `preview`, no `publishedAt`. It is also far more
 * stable: a site redesign reshuffles HTML selectors but rarely changes an RSS
 * schema.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * TRAP 1 — THIS FEED MUST BE PARSED AS XML, NOT AS HTML.
 *
 * Every other parser in this directory calls
 * `new DOMParser().parseFromString(html, 'text/html')`, and so does the shared
 * `toDoc()` helper in fetchNews.ts. Doing that HERE silently destroys the feed.
 * Measured in real Chromium (2026-08-28), parsing this exact document as
 * `text/html` gives:
 *
 *   <link>        → ""   ← `<link>` is a VOID element in HTML, so the URL,
 *                          which is element TEXT in RSS, is discarded outright
 *   <description> → ""
 *   <title>       → "<![CDATA[All-District Band ]]>"  (CDATA wrapper as text)
 *
 * The `link` loss is the dangerous one, because it fails in the project's worst
 * shape: `normalizeItems` drops every item lacking a URL, so an HTML-mode parse
 * yields ZERO items, `fetchNews` throws "No items parsed", and the section
 * renders its ERROR state. That is indistinguishable from a dead site or a
 * stale selector, and nobody debugging it looks at the parser's MIME type
 * first. Parsed as `application/xml`, all five fields read correctly.
 *
 * TRAP 2 — the feed publishes `http://`, and the app is served over `https://`.
 *
 * Both the article links and the photo URLs (on a SEPARATE host,
 * carmelcs.enschool.org) are plain `http://`. Both hosts 302 to https and serve
 * 200 there, verified 2026-08-28. Left as-is, the browser would block each
 * photo as MIXED CONTENT — the image silently fails to render while the parser
 * reports complete success, i.e. it looks exactly like "this article has no
 * photo". `normalizeItems` does NOT fix this: it absolutizes via
 * `new URL(u, boardUrl)`, which preserves the scheme of an already-absolute
 * URL. So the upgrade happens here.
 *
 * TRAP 3 — the feed is NOT in chronological order.
 *
 * The last item ("BATTLE OF 51", 9 Feb 2026) is NEWER than the two before it
 * (both 12 Jan 2026). Publishing order therefore must not be trusted;
 * `normalizeItems` sorts newest-first and that sort is what actually orders the
 * section.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** RSS 2.0 dates are RFC-822 (`Fri, 20 Feb 2026 19:58:02 EST`), but `types.ts`
    specifies ISO-8601. Chromium parses the EST abbreviation correctly (verified
    against three real items), so normalize here rather than passing raw feed
    text downstream. An unparseable date becomes `null` — the row then renders
    without a date and sorts last, which is the documented degradation. */
function toIso(value: string | null | undefined): string | null {
  const raw = value?.trim()
  if (!raw) return null
  const ms = Date.parse(raw)
  return Number.isNaN(ms) ? null : new Date(ms).toISOString()
}

/** Upgrade a bare `http://` URL from the feed to `https://` — see TRAP 2.
    Anything that is not parseable http is returned untouched for
    `normalizeItems` to judge. */
function https(url: string | null | undefined): string | undefined {
  const raw = url?.trim()
  if (!raw) return undefined
  return raw.startsWith('http://') ? `https://${raw.slice('http://'.length)}` : raw
}

/** Read one child element's text. Namespaced tags (`media:content`) are matched
    by LOCAL name, because an XML document indexes them by namespace rather than
    by the prefix the feed happens to use — a feed that renamed the prefix would
    otherwise lose its photos silently. */
function childText(item: Element, tag: string): string | undefined {
  for (const el of Array.from(item.children)) {
    if (el.localName === tag) return el.textContent?.trim() || undefined
  }
  return undefined
}

function childAttr(item: Element, tag: string, attr: string): string | undefined {
  for (const el of Array.from(item.children)) {
    if (el.localName === tag) return el.getAttribute(attr)?.trim() || undefined
  }
  return undefined
}

export function parse(xml: string, _boardUrl: string): NewsItem[] {
  // TRAP 1 — application/xml, NOT text/html. See the block comment above.
  const doc = new DOMParser().parseFromString(xml, 'application/xml')

  // A malformed feed yields a <parsererror> document rather than throwing.
  // Returning [] lets fetchNews raise its "No items parsed" error, which is the
  // correct signal that the source changed shape.
  if (doc.querySelector('parsererror')) return []

  const items: NewsItem[] = []

  for (const item of Array.from(doc.getElementsByTagName('item'))) {
    const title = childText(item, 'title')
    const url = https(childText(item, 'link'))
    if (!title || !url) continue

    // The feed's <description> is a genuine per-article subtitle, NOT the
    // boilerplate trap that `og:description` is on Providence Day: it differs
    // per item ("A NEW SCHOOL RECORD", "Season Update", "Go Cougars!") and
    // matches the article page's own og:description exactly. Verified against
    // the live article for REC_ID=1005412. So it is used as-is, and no
    // per-article preview fetch is wired up for this school.
    const summary = childText(item, 'description')

    // Photos are advertised on `media:content`, matched by local name. The feed
    // publishes the `_thumb` variant (300x328 — verified), which is exactly the
    // size this row needs. A full-size URL DOES exist at the same path with
    // `_thumb` removed, and all 10 resolve 200 — but that is an INFERRED URL the
    // feed never published, so it is deliberately not used: it would trade a
    // guaranteed-correct URL for a 3x larger download on a naming convention
    // that could change without notice.
    const photo = https(childAttr(item, 'content', 'url'))

    items.push({
      title,
      url,
      date: toIso(childText(item, 'pubDate')),
      ...(photo ? { photo } : {}),
      ...(summary ? { summary } : {}),
    })
  }

  return items
}
