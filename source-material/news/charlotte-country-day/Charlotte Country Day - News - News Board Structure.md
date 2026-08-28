# Charlotte Country Day School — News Board Structure

## Provenance

- **Captured by:** Claude (via `/add-school-news`), 2026-08-28
- **How:** `curl` with a desktop User-Agent against the live board, plus all 20
  linked article pages; parser then verified against the captured HTML in a real
  Chromium DOM (Playwright), including negative tests that disable each guard.
- **School slug:** `charlotte-country-day`

## Source URLs

- **Board (parsed), USER-SUPPLIED 2026-08-28:**
  `https://www.charlottecountryday.org/news-events/school-news-detailed/news-only`
- **Index ("All news & media"):** same URL. The user supplied one URL; it is a
  human-readable board, so it serves as both. No separate index URL was derived.

## CMS

**Finalsite** — the FOURTH Finalsite board in the app (after Providence Day,
Charlotte Catholic and Charlotte Christian). Markers: `fsElement` ×58,
`fsPostElement`, `data-post-id` ×20, `article.fsBoard-15`, `time.fsDate`.

All 20 posts are **server-rendered** in the raw HTML — no JS hydration needed.
Board response: **HTTP 200, ~69KB**.

Despite the shared CMS this parser is deliberately isolated, and the four boards
differ materially:

| | Photos | Date on board | Summary on board | Off-site posts |
|---|---|---|---|---|
| Providence Day | yes | yes | no | no |
| Charlotte Catholic | **none** | yes | no | no |
| Charlotte Christian | yes | **none anywhere** | no | no |
| **Country Day** | yes (19/20) | yes | no | **yes — 2** |

## Selector table

| Field | Selector | Notes |
|---|---|---|
| Items | `article[data-post-id]` | 20 present |
| URL | `div.fsTitle a[href]` (fallback `a.fsPostLink[href]`) | already absolute |
| Title | `div.fsTitle a` | `textContent.trim()` |
| Date | `time[datetime]` | ISO-8601, e.g. `2026-08-26T15:15:00-04:00`; all 20 |
| Photo | `img[data-image-sizes]` | HTML-entity-encoded JSON — **TRAP 1**; 19/20 |
| Summary | — | **absent** — needs per-article fetch |
| Preview | first leaf block >60 chars inside `div.fsBody`, captions + bylines skipped | **not** `og:description` — **TRAPS 4, 5, 6** |

## Fields present vs absent

- **Present:** title, url, date (all 20), photo (19 of 20).
- **Absent:** any summary/teaser in the board listing.
- **One post genuinely has no photo** ("Educating for Purpose: A Conversation
  with Dr. Tara Christie Kinsey", 2026-08-12) — verified by inspection of the
  markup, not concluded from a failed scrape. That row renders without a
  thumbnail by design.

## Traps specific to this site

### TRAP 1 — the photo is not in `src` (standing Finalsite trap)

Thumbnails have **no `src` attribute at all**; real URLs live in
`data-image-sizes` as an **HTML-entity-encoded** JSON array of `{url,width}`
(4 widths: 256/512/800/1080). A naive `src=` scrape finds **zero** photos on all
20 posts and renders every row photo-less — indistinguishable from a correct
"this board publishes no photos" result.

Encoding differs per school even within Finalsite: Country Day and Providence
Day **HTML-entity**-encode (`&quot;url&quot;`); Charlotte Catholic
**percent**-encodes (`%22url%22`). A port of the wrong parser decodes nothing.

The parser picks the width nearest **640px** (in practice the 512px variant):
the 256px thumb is visibly soft on a retina card, the 1080px original is wasted
bytes for a list row.

### TRAP 2 — article slugs are NOT derivable from titles, across MULTIPLE sub-boards

Posts live under several sub-boards — `~board/school-news/` and
`~board/athletics-news/` — and slugs do not match their headlines. "Senior
Convocation Celebrates the Class of 2027…" does not live at a
`senior-convocation…` slug.

Confirmed the hard way during capture: a URL constructed from a headline
returned **HTTP 200 on a 404 page** (26KB, `<title>Instagram</title>`-class
content mismatch). URLs are read from the markup only.

### TRAP 3 — TWO posts link OFF-SITE to instagram.com ⚠️ NEW CLASS

18 of 20 posts carry `data-opens-in="page"` and point at
`charlottecountryday.org`. **Two carry `data-opens-in="linked_url"` and point
directly at `instagram.com/p/…`**:

- `A Lasting Legacy: Thank You, Coach Ben Keast` → `instagram.com/p/Daf81VVR0u9/`
- `All-Observer Girls' Scholar Athlete: Caroline Mallard` → `instagram.com/p/DaOJvBCxIF3/`

These are **real published items** with a real title, date and photo — only the
destination leaves the school's domain. They are **kept** (dropping them would
silently hide two of the school's own posts) but **never fetched for a preview**:

- `instagram.com` is **not** in the Worker's `ALLOWED_HOSTS` and **must never be
  added** — that allow-list is what stops the relay being an open proxy, and it
  is scoped to school domains.
- The fetch would therefore 403, which `hydratePreviews` swallows silently. The
  row still renders correctly, but it burns a proxy request per load and a later
  reader debugging that 403 would be chasing correct behaviour.
- Instagram serves a login wall to server-side clients anyway, so there is no
  preview to extract even if it were allow-listed.

`preview()` fails **closed**: it checks the fetched document's own
`link[rel=canonical]` / `og:url` and returns `undefined` unless the page is on
`charlottecountryday.org`. It keys on the fetched HTML rather than the item URL
because `preview` only receives HTML — and a login wall or interstitial must not
yield a preview either.

**At capture time both off-site posts sat at #12 and #14 by date, so the
`MAX_ITEMS = 10` cap happens to exclude them today.** That is a property of the
calendar, not of the board; it will stop being true. The guard does not depend
on it.

### TRAP 4 — `og:description` is boilerplate

Every article page returns the literal string
**`School News Detail-Charlotte Country Day`** — verified identical across all 18
on-site posts. Non-empty, so it passes a naive check and would ship the same
sentence as the preview on every row.

### TRAP 5 — the first `<p>` on the page is the SITE NAV (~1,400 chars)

Unscoped, the first `<p>` over 60 chars on every article page is the navigation
menu flattened into one run:

> `SummerSwimAlumniAlumni Photo Gallery(opens in new window/tab)Alumni StoriesAthletics Hall of Honor…`

It is long and non-empty and would ship as the preview on **all 20 rows**.
Scoping to **`div.fsBody`** (the post's own body, exactly once per page) removes
it. **`.fsPageBody` is NOT tight enough here — it occurs 4× and wraps the nav.**

Verified by negative test: with scoping disabled, previews become
`Share to FacebookShare to TwitterShare to LinkedIn…`.

### TRAP 6 — three posts open with a BYLINE, not the story

- `By Allison Slater Tate, Director of College Counseling, originally published on grownandflown.com` (114 chars)
- `By Dr. Danielle Scott, Director of Health & Wellness` (52 chars)

Grammatical, plausible, and tells a parent nothing about the article — the same
failure shape as Providence Day's photo captions. The 114-char one clears a
>60 rule and would ship. Bylines are skipped by pattern
(`^(by|written by|story by|photos? by)\b`) so the rule steps on to the real
opening sentence.

Verified by negative test: with the byline guard disabled, art2's preview
becomes `By Allison Slater Tate, Director of College Counseling, originally published on…`.

### Captions

Excluded structurally (`p.closest('figure, figcaption, .fsImageCaptioned, .fsCaption')`)
plus a `Pictured:` / `Photo:` text backstop, as on the other Finalsite boards.
This board does have captioned figures mid-article; none currently leads a post,
but the guard costs nothing and the defect it prevents was invisible to a `curl`
pass on Providence Day.

## CORS observation

```
curl -sSI -L "<boardUrl>" | grep -i access-control-allow-origin
→ no CORS header (expected)
```

No `Access-Control-Allow-Origin`, as with every other school. The section
therefore goes through the project's own Cloudflare Worker relay
(`workers/news-proxy/`), which required adding **both**
`www.charlottecountryday.org` and `charlottecountryday.org` to `ALLOWED_HOSTS`.

**Apex → www:** `https://charlottecountryday.org/` returns **301** to
`https://www.charlottecountryday.org/` (verified 2026-08-28). Both forms are
allow-listed because a redirect between them is invisible until it 403s.

## Verification performed

- Board parse in a real Chromium DOM: **20 items**, correct dates, newest-first,
  **19/20 photos**, both off-site rows kept.
- Preview extraction across all 20 article pages: real opening sentences, no nav
  blob, no boilerplate, no byline; `(none)` for both Instagram posts.
- Negative tests disabling the byline guard and the `fsBody` scope, each of which
  produced a distinct, wrong preview — confirming both guards do real work.
