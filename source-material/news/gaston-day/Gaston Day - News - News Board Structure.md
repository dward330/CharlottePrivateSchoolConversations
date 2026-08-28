# Gaston Day School — News Board Structure

## Provenance

- **Captured by:** Claude (add-school-news skill), 2026-08-28
- **Method:** `curl` with a desktop User-Agent, then structural inspection of the
  saved HTML; parser verified end-to-end against the real captures in headless
  Chromium (the production DOM engine) before being registered.
- **Board URL (USER-SUPPLIED 2026-08-28):** https://gastondayathletics.com/News
- **Index URL:** https://gastondayathletics.com/News (same page — the board is the
  reader-facing destination)
- **Captures:** board page 1 (41,189 B, HTTP 200), board page 2 (31,863 B, HTTP 200),
  and all 8 article pages (27.8–35.8 KB, all HTTP 200)

## The board is on the school's OWN ATHLETICS DOMAIN

The user supplied `gastondayathletics.com`, not `gastonday.org`. Under the rule the
user settled 2026-08-28 (a school's own athletics site is legitimate news), this is a
valid source. Ownership was **confirmed from the site itself**, not assumed from the
domain name:

- `<title>News - Gaston Day School</title>`
- Branded "Gaston Day School" / "Spartan Athletics" in the masthead
- Links to `https://www.gastonday.org/wp-content/uploads/2026/06/GDS-Athletics-Handbook.pdf`
  for the official athletics handbook

⚠️ **This school needs NO `alsoAllowedHosts`, and adding one would be wrong.** Charlotte
Latin declares `clshawks.com` because its athletics site is an *extra* host beside a main
board on another domain. Here the athletics site **IS** the board, so `normalizeItems`
anchors the same-site test on it and every row is same-site by construction. The
relationship is inverted, not analogous.

Scope note: because this is the athletics board, the section carries **athletics news
only** — it is not a whole-school news feed. That is what the school publishes at the URL
supplied.

## CMS — Eventlink (the app's TENTH CMS)

Matches none of the four in the skill's CMS table. Identifying markers:

- Assets served from `static.eventlink.com`
- "Powered By Eventlink" footer with `/images/EL-logo-white.png`
- Bootstrap 5 + jQuery + Handlebars + a custom `/js/pagination.min.js`
- **No** `fsElement` / `fsPostElement` / `data-board-id` (not Finalsite)
- **No** `wp-content` post markup, no `sqs-`, no SIDEARM

⚠️ **The presence of `handlebars.min.js` and `pagination.min.js` initially suggested a
JS-hydrated board.** It is not — the posts are fully server-rendered. Concluding
"JS-hydrated, cannot parse" from the script tags alone would have wrongly rejected a
parseable board. Verified by finding the real titles and `/Article/<id>` links in the
raw HTML.

## Selector table

| Field | Selector | Notes |
|---|---|---|
| Row | `div.news-title` | 7 on page 1, 1 on page 2 |
| URL | `a[href^="/Article/"]` within the row | **relative** (`/Article/144782`) — absolutized by `normalizeItems` |
| Title | `div.fw-bold` within the row | NOT the link text, which is `READ MORE »` on every row |
| Photo | `img.size-img-news` in the enclosing column | plain absolute `src` — see Trap 2 |
| Date | ✗ absent on the board | on the article page — see Trap 1 |
| Summary | ✗ absent on the board | on the article page — see Trap 3 |

### Article page

| Field | Selector | Value shape |
|---|---|---|
| Byline + date | `p.text-muted` | `By Lulu Brase \| Aug 25, 2026 10:20 PM` |
| Body | `p.mb-0.linkify-this` | ONE paragraph, `white-space: pre-wrap`, breaks as `&#xA;` |

## Item inventory (8 total, verified 2026-08-28)

The board holds **8 articles across 2 pages** and no more (page 2 offers no "Next").
Registered with `extraBoardUrls: ['…?pageNumber=2']` so the section shows all 8 rather
than 7. Eight rows is under the cap of 10 because that is the school's entire published
news — **not** because rows were dropped.

| Date | Title |
|---|---|
| 2026-08-25 22:20 | Girls Golf Earns a Win over Southlake |
| 2026-08-25 22:10 | Spartans Earn First Win of the Season |
| 2026-08-22 08:43 | Spartans Move to 3-0 with Four-Set Win Over Village Christian |
| 2026-07-24 16:39 | Welcome Coach Eliana Moultrie |
| 2026-07-09 10:24 | Athletics July Updates & Fall Sports Information |
| 2026-07-06 11:27 | 2026-2027 Tryout Details |
| 2026-07-06 11:15 | 2025-2026 Athletic Awards |
| 2026-07-06 10:45 | June 2026 Updates |

All 8 carry a cover photo. All 8 resolve a real, on-topic preview.

## Traps

### TRAP 1 — dateless board, DATED article pages

No `<time>`, no `datetime=`, no `data-*date*`, no date-shaped text anywhere in the board
listing. A row is a cover photo, a title and a READ MORE link — that is the whole row.

The article pages **do** carry a date, so this school supplies a `publishedAt` hook.
That places it with **Cannon** and **Covenant Day** (dateless board → dated article), NOT
with **Charlotte Christian** and **Davidson Day** (dateless everywhere → `date: null`).
Getting the split wrong is silent in both directions: omitting the hook ships 8 undated
rows in DOM order; expecting a board date ships an empty section.

### TRAP 2 — the photo IS in `src` (the inverse of every Finalsite sibling)

Five of the nine existing parsers decode `data-image-sizes` because Finalsite leaves
`src` empty. **Eventlink does the opposite** — a plain absolute `src` on
`img.size-img-news`, with the same URL repeated in a `background-image:` style on the
wrapper for a blurred backdrop.

Porting the Finalsite decoder here would find **zero** photos and render all 8 rows
photo-less — reading as "this school publishes no cover images" while being a
ported-parser bug. This is a concrete case for the one-parser-per-school rule.

### TRAP 3 — byline and date are the SAME element, sitting above the body

```html
<p class="text-muted">By Lulu Brase | Aug 25, 2026 10:20 PM</p>
```

One element, two opposite jobs: the date source for `publishedAt`, and the preview hazard
for `preview`.

A "first substantive `<p>`" rule is saved here **only** by the byline being 44 chars,
under the 60-char floor — luck, not a rule. One longer author name ships the byline as
the preview on all 8 rows, grammatically and plausibly. Same near-miss as Davidson Day's
`fsAuthor`, excluded the same way: **structurally**. Eventlink gives the body its own
class (`p.linkify-this`, exactly once per page), so selecting it directly cannot pick up
the byline however long it grows — nor the `<figure>` that sits between byline and body
on photo-led posts.

The date parse takes the **last** pipe-delimited segment, because the author is free text
that could itself contain a pipe.

### TRAP 4 — the body is ONE paragraph with ENCODED newlines

The article is a single `<p style="white-space: pre-wrap">` with paragraph breaks stored
as `&#xA;&#xA;` rather than as separate `<p>` elements. `textContent` decodes those to
real newlines, so the whitespace collapse in `preview()` is **load-bearing, not
cosmetic** — without it the preview carries hard line breaks mid-sentence.

### Pagination

Page 1 links `/News?pageNumber=2`; page 2 links only back to page 1. Registered as a
single `extraBoardUrls` entry rather than a crawl loop — the board is small and static,
and `normalizeItems` de-duplicates by URL if the pages ever overlap.

## CORS

```
content-type: text/html; charset=utf-8
```

**No `access-control-allow-origin` header** — expected, and why the Worker relay is
load-bearing. `gastondayathletics.com` must be in `ALLOWED_HOSTS` in
`workers/news-proxy/worker.js`, and the Worker redeployed, or the section renders its
error state.
