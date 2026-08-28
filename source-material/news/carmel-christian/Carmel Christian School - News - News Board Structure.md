# Carmel Christian School — News Board Structure

## Provenance

- **Captured:** 2026-08-28 by Claude (add-school-news skill), from the live feed.
- **Method:** `curl` with a desktop User-Agent, then the parse behaviour verified in a
  real Chromium via Playwright (the decisive test — see TRAP 1, which is invisible to a
  plain `curl` inspection).
- **Source URL — USER-SUPPLIED 2026-08-28** (not derived, per the skill's step 1):
  `https://www.carmelchristian.org/apps/news/news_rss.jsp?id=0`
- The user supplied the **RSS feed** rather than an HTML board and asked whether that was
  acceptable. It is strictly better here — see "Why a feed" below.

## URLs

| Role | URL |
|---|---|
| `boardUrl` (parsed) | `https://www.carmelchristian.org/apps/news/news_rss.jsp?id=0` |
| `indexUrl` ("All news & media") | `https://www.carmelchristian.org/apps/news/index.jsp?id=0` |

`indexUrl` is **not** self-derived: it is the `<channel><link>` the feed itself publishes
as its own human-readable home. Verified 2026-08-28 — `http` 302s to `https`, which
serves HTTP 200. The feed URL is machine-readable XML and would be the wrong place to
send a reader, which is why board and index differ for this school (unlike Providence Day
and Cannon, which use one URL for both).

## CMS

**SchoolSitePro** (`<generator>SchoolSitePro</generator>`), serving **RSS 2.0** with the
`media:` (Yahoo MRSS) namespace. Asset host is a separate domain, `carmelcs.enschool.org`.

This is the **first feed-based source in the app** — Providence Day and Cannon are both
Finalsite HTML boards. It is also a CMS not previously seen in this project.

### Why a feed is the better source here

Every field the section renders is published inline and machine-readable, so this school
needs **no second per-article pass** — no `preview`, no `publishedAt`, unlike both HTML
parsers. A feed is also far more stable: a site redesign reshuffles HTML selectors but
rarely changes an RSS schema.

## Field map

Parsed as `application/xml`; children matched by **local name** so a changed namespace
prefix cannot silently drop a field.

| Field | Source | Notes |
|---|---|---|
| Items | `<item>` under `<channel>` | 10 present |
| Title | `<title>` (CDATA) | XML parsing unwraps CDATA automatically |
| URL | `<link>` **element text** | `http://` → upgraded to `https://` — see TRAP 2 |
| Date | `<pubDate>` | RFC-822 w/ `EST`, e.g. `Fri, 20 Feb 2026 19:58:02 EST`; normalized to ISO-8601 |
| Photo | `<media:content url>` | `_thumb` variant, 300×328; `http://` → `https://` |
| Summary | `<description>` (CDATA) | **genuine** per-article subtitle — see TRAP 4 |

**Present:** all five fields, on all 10 items. **Absent:** nothing. No per-article fetch
is required for this school.

## CORS

```
curl -sSI -L "https://www.carmelchristian.org/apps/news/news_rss.jsp?id=0" | grep -i access-control-allow-origin
→ (no header)
```

Absent, as expected for every school — this is why the Cloudflare Worker relay exists.
`www.carmelchristian.org` must be in `ALLOWED_HOSTS` in `workers/news-proxy/worker.js`.

Note the **photo host is a different domain** (`carmelcs.enschool.org`), but it does
**not** need allow-listing: images are loaded directly by the browser via `<img src>`,
which is not subject to CORS. Only the feed fetch goes through the Worker.

---

## Traps specific to this site

### TRAP 1 — the feed MUST be parsed as `application/xml`, never `text/html` ⚠️

The single most important fact about this parser. Every other parser in the app (and the
shared `toDoc()` helper) uses `text/html`. Doing that **here** silently destroys the feed.

Measured in real Chromium, 2026-08-28, on this exact document:

| Field | as `text/html` | as `application/xml` |
|---|---|---|
| `<link>` | **`""`** — `<link>` is a **void element** in HTML, so its text content is discarded | full URL ✅ |
| `<description>` | **`""`** | real text ✅ |
| `<title>` | `<![CDATA[All-District Band ]]>` — wrapper as literal text | `All-District Band` ✅ |
| `<pubDate>` | works | works |
| `<media:content url>` | works | works |

**Why this is the dangerous failure shape:** `normalizeItems` drops every item lacking a
URL, so an HTML-mode parse yields **zero items** → `fetchNews` throws `No items parsed` →
the section renders its **error state**. That is indistinguishable from a dead site or a
stale selector, and nobody debugging it inspects the parser's MIME type first.

**Verified by negative test** (2026-08-28): changing *only* the MIME type in the parser,
with nothing else altered, drops the result from 10 items to **0**. The source file was
left unmodified.

### TRAP 2 — the feed publishes `http://`, and the app is served over `https://`

Both article links and photo URLs are plain `http://`. Both hosts 302 to `https` and
serve 200 there (verified). Left as-is the browser blocks each photo as **mixed content**:
the image silently fails to render while the parser reports complete success — i.e. it
looks exactly like "this article has no photo".

`normalizeItems` does **not** fix this — it absolutizes via `new URL(u, boardUrl)`, which
preserves the scheme of an already-absolute URL. The upgrade is done in the parser.

### TRAP 3 — the feed is NOT in chronological order

The **last** item (`BATTLE OF 51`, 9 Feb 2026) is **newer** than the two before it (both
12 Jan 2026). Publishing order must not be trusted; `normalizeItems`' newest-first sort is
what actually orders the section. Confirmed: that item moves from position 10 → 8.

### TRAP 4 — `<description>` here IS genuine (the inverse of Providence Day's Trap 2)

On Providence Day every `og:description` is the boilerplate string `"News Post"`. The
instinct to distrust the summary field does **not** apply here, and treating it as
boilerplate would throw away real data and trigger an unnecessary 10-request second pass.

Verified: values differ per item (`A NEW SCHOOL RECORD`, `Season Update`, `Go Cougars!`)
and match the article page's own `og:description` exactly — checked against the live
article for `REC_ID=1005412`. They are short **subtitles** rather than body extracts,
which is why they are used verbatim with no truncation.

### Note — full-size images exist but are deliberately NOT used

Every `_thumb` URL has a full-size sibling at the same path with `_thumb` removed; all 10
resolve HTTP 200. This is **deliberately not exploited**: it is an *inferred* URL the feed
never published, and using it would trade a guaranteed-correct URL for a ~3× larger
download on a naming convention that could change without notice. The published `_thumb`
is 300×328 — correctly sized for the thumbnail row.

---

## Verification log (2026-08-28)

- Feed: HTTP 200, 7,087 bytes, 10 `<item>` elements.
- Real parser + `normalizeItems`, executed in Chromium against the live feed — 8/8 assertions pass:
  10 items · all article URLs https · all photos https · titles free of CDATA · all have a
  summary · all dates valid ISO-8601 · sorted newest-first · URLs unique.
- Negative test on the MIME type: 10 items → 0 items. Trap 1 confirmed.
