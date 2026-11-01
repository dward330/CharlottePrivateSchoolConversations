# Charlotte Latin School — News board structure

## Provenance

- **Captured:** 2026-08-28 by Claude (Claude Code), for the `/add-school-news` pass.
- **How:** `curl -sS -L` with a desktop Chrome User-Agent against the four board URLs
  supplied by the user, plus 38 sampled article pages. The shipped parser was then run
  against the captured HTML **in Chromium via Playwright** (not a reimplementation), and
  the resulting ten rows were checked against an independently derived date ordering.
- **Source URLs — SUPPLIED BY THE USER**, four category-filtered views (**superseded
  2026-11-01**, see the re-capture section below):

  | Category id | Section | URL |
  |---|---|---|
  | 84 | Arts | `https://www.charlottelatin.org/about/school-news?post_category_id=84` |
  | 85 | Athletics | `https://www.charlottelatin.org/about/school-news?post_category_id=85` |
  | 167 | School | `https://www.charlottelatin.org/about/school-news?post_category_id=167` |
  | 89 | Academics | `https://www.charlottelatin.org/about/school-news?post_category_id=89` |

  The user asked for these four **merged, ordered by latest date, capped at 10**.

- **`alsoAllowedHosts`:** `['clshawks.com']` — the school's athletics domain
  (see Trap 4). `www.clshawks.com` is a CNAME alias that 301s to the apex; both
  forms are in the Worker's `ALLOWED_HOSTS`.
- **`indexUrl`** (the "All news & media" destination) is the **unfiltered** board,
  `https://www.charlottelatin.org/about/school-news` — verified HTTP 200, 330 posts,
  `<title>School News and Publications - Charlotte Latin School</title>`. The four
  category URLs are parse targets only; sending a reader to one would show them a
  quarter of the news.
- **CORS:** no `Access-Control-Allow-Origin` header (expected — the relay exists for
  this). `charlottelatin.org` **301s to `www.`**, so both forms are in `ALLOWED_HOSTS`.

## Re-capture 2026-11-01 — the four views stopped covering the news

- **Captured:** 2026-11-01 by Claude (Claude Code), during the audit behind the
  `latinnews` plan. **The user chose 2026-11-01 to replace the four category views with
  the unfiltered board.** Sections below this one describe the 2026-08-28 four-view design.
- **How:** `curl` with a desktop Chrome User-Agent, and through the relay, against
  `https://www.charlottelatin.org/about/school-news` (HTTP 200, 1,000,332 bytes,
  `<title>School News and Publications - Charlotte Latin School</title>`) and the four
  category URLs above; then one fetch per article page for its date.

### Page structure of the unfiltered board

| Element | Selector | Holds |
|---|---|---|
| Featured strip | `.fsPostElement.fsList.featured` (`#fsEl_29263`) | 1 `fsBoard-40` post, `href="#"` on its title |
| Second strip | `.fsPostElement.fsList.non-featured` (`#fsEl_29264`) | 4 `fsBoard-40` posts, `href="#"` on their titles |
| **Main grid** | `.fsPostElement.fsGrid` (`#fsEl_38493`, `data-board-id="209,40"`) | **335 posts, all server-rendered, no pagination; 0 `#` hrefs** |

The grid holds 308 `fsBoard-209` posts and 27 `fsBoard-40` ("Hawks Aim High",
`kudos/post/…` slugs). The two strips repeat grid posts, which is why a page-wide
`article[data-post-id]` count gives 340. Reading the page without scoping to the grid
would take five strip rows whose title links are `#`.

Grid hosts: `www.charlottelatin.org` 300, `www.charlottelatinstories.com` 13, `issuu.com` 8,
`clshawks.com` 6, `clsteachingandlearning.podbean.com` 3, `chattinatlatin.podbean.com` 3,
`charlottelatin.turtl.co` 1, `www.sya.org` 1.

Category labels, from the board's filter: 82 Academics, 83 Alumni, 84 Arts, 85 Athletics,
87 Employees, 88 Advancement, 89 STEAM, 92 Hawks Aim High, 96 Publications, 167 Events,
168 Honors, 169 Community. (172 had 4 posts and "Leadership" is the one remaining label;
that pairing was not confirmed.) The August table above calls 167 "School" and 89
"Academics"; the school's own labels are Events and STEAM.

### Grid order against article dates (first 25 rows)

| Row | Published | Post | Headline | In old four views? |
|---|---|---|---|---|
| 0 | 2026-09-30 | 5137 | High Honor for Director of Teaching and Learning | No |
| 1 | off-site | 5136 | 2025–26 Gratitude Report (issuu.com, dropped) | No |
| 2 | 2026-09-24 | 5135 | Spotlight: Louisa Polos, Head of Middle School | No |
| 3 | 2026-09-16 | 5133 | Ten Charlotte Latin Seniors Named National Merit Semifinalists | No |
| 4 | 2026-09-11 | 5126 | Charlotte Latin School Observes 9/11 Anniversary | Yes |
| 5 | 2026-09-10 | 5125 | Spotlight: Amy Maxwell, Transitional Kindergarten (TK) Teacher | No |
| 6 | 2026-09-07 | 5124 | David Gatoux Receives Chuck Carter Athletic Cup (clshawks.com) | Yes |
| 7 | 2026-09-09 | 5123 | Charlotte Latin Celebrates Founders' Day | Yes |
| 8 | 2026-09-03 | 5122 | Spotlight: Jessica Lee, Upper School English Chair | No |
| 9 | 2026-08-28 | 5121 | Convocation Begins the Senior Year for the Class of 2027 | Yes |
| 10 | 2026-08-18 | 5102 | Daniel Willingham Delivers Keynote to Latin Faculty | No |
| 11 | 2026-06-25 | 5095 | Latin Debaters Win National Championship | No |
| 12 | 2026-06-12 | 5094 | Graduating Seniors Guide Future Ninth Graders | No |
| 13 | 2026-05-27 | 5093 | Sunny's Honor Celebrates Sunny's Legacy | No |
| 14 | 2026-05-22 | 5092 | Commencement Exercises for Class of 2026 | Yes |
| 15 | 2026-05-21 | 5091 | 2026 Upper School Honors and Awards Ceremony | Yes |
| 16 | 2026-05-21 | 5090 | Spotlight: Mike Weiss, Upper School History Teacher | No |
| 17 | 2026-05-20 | 5089 | 2026 Middle School Awards Assembly | Yes |
| 18 | 2026-05-18 | 5088 | Class of 2026 Celebrated at Baccalaureate and Senior Supper | Yes |
| 19 | 2026-05-15 | 5087 | Latin Students Excel at Conference for Future Healthcare Professionals | No |
| 20 | 2026-05-14 | 5086 | Spotlight: Second Grade Teacher Morgan Johnson | No |
| 21 | 2026-05-13 | 5085 | Theater Arts Department Announces 2026-27 Schedule | Yes |
| 22 | 2026-05-09 | 5084 | Latin Eighth Grader Earns Seat in All-State Honors Band (`kudos/post`) | No |
| 23 | 2026-05-08 | 5083 | Arts & Science Council Honors Charlotte Latin Teacher | No |
| 24 | 2026-05-07 | 5082 | Spotlight: Fay Lucas, Custodial Supervisor, and Kay Rigo | No |

Over the first 45 rows, every disorder is between ADJACENT rows (the largest gap is one
row), and the true top ten all sit inside the first ten rows. Dates were recorded to the
day for rows 0–28; a few rows further down returned no date in this burst of fetches and
were not re-tried, so this does not prove the property for the whole board.

**No post on the board was dated October 2026 on capture day.**

### Measured through the relay

- **Cold** (cache-busted URLs, 16 article pages in parallel): 8.16s wall. Finalsite pages
  took 2.3–8.2s in visible steps; the two `clshawks.com` pages took about 0.4s.
- **Warm** (the Worker's 15-minute edge cache): 0.12–0.27s each.

## CMS

**Finalsite** — the fifth Finalsite board in the app (`article[data-post-id]`,
`fsPostLink`, `data-image-sizes`, `fsBoard-209`). All four views are filtered slices of
**one** underlying board, id 209.

## Capture

| View | Bytes | `<article>` | `data-post-id` | `<time datetime>` | off-site link posts |
|---|---|---|---|---|---|
| 84 | 201,949 | 58 | 51 | **0** | 2 |
| 85 | 156,540 | 56 | 49 | **0** | 14 |
| 167 | 193,883 | 48 | 41 | **0** | 0 |
| 89 | 83,582 | 17 | 10 | **0** | 0 |

All posts are **server-rendered** — no JS hydration needed.

- **141 unique posts** across the four views; **10 cross-posted** (present on >1 view).
- **8 rows link to other hosts**; 5 are the school's own athletics site and are
  **kept**, 3 are third parties and are dropped (see Trap 4).
- **133 posts on the main domain** plus **5 on the athletics domain** remain — far
more than the ten needed.

## Selector table

| Field | Selector | Notes |
|---|---|---|
| Items | `article[data-post-id]` | |
| Title | `div.fsTitle a` | `(opens in new window/tab)` suffix stripped |
| URL | `div.fsTitle a[href]` — absolute | **not** derivable from the title |
| Photo | `img[data-image-sizes]` / `a[data-image-sizes]` | entity-encoded JSON — **Trap 3** |
| Date | — | **ABSENT from the board entirely — Trap 2** |
| Summary | — | absent; needs the article page |
| Article date | `meta[property="article:published"]` | **not** `name="page-published"` — **Trap 7** |
| Article preview | first leaf `<p>` >60 chars inside `div.fsBody` | **Traps 5 & 6** |

Present: title, URL, photo. Absent: date, summary — both recovered from the article page
in the single second-pass fetch.

## Traps specific to this site

### Trap 1 — four boards, badly out of sync

**Superseded 2026-11-01.** The section now reads the unfiltered board's main grid, so this
merge and `PER_BOARD` no longer exist. Kept as the record of the first design.

Newest post per view on capture day: **167 → 2026-05-22**, **84 → 2026-05-13**,
**89 → 2026-04-21**, **85 → 2026-04-09**. Interleaving by DOM position would ship a list
ordered by neither date nor relevance.

**Measured property the merge relies on:** each view is **strictly newest-first**
internally — verified monotonic over the first 12 on-site posts of all four views. So the
newest N of the merged set lie within the first N of each view, and a shallow per-board
slice suffices. `PER_BOARD = 4` (user's choice: ~20 requests/visitor vs ~11 for a
single-board school). The true top ten drew **5 / 3 / 1 / 1** from the four views, so a
slice of 4 covers it with margin; a slice of 10 would be provably exact for any
publishing pattern at ~42 requests.

### Trap 2 — the board publishes NO date, in any form
Zero `<time datetime=`, no date class, no date data-attribute across all four views.
This is the Cannon / Charlotte Christian shape — but unlike Charlotte Christian, whose
article pages are dateless too, **Latin's articles do publish a real date**, so the
section can honour "newest first" rather than falling back to DOM order.

**Consequence for the pipeline:** the ten cannot be chosen before the dates are known.
`normalizeItems` therefore takes a `cap` argument, and `fetchNews` passes a **wider
candidate pool** while dates are pending, capping to ten only after the date pass sorts.
Capping early would have discarded the SumoBot article, which belongs at **#7**.

### Trap 3 — the photo is not in `src`
Thumbnails carry **no `src`**; real URLs live in `data-image-sizes` as an
**HTML-entity-encoded** JSON array of `{url,width}` (Charlotte Catholic percent-encodes
the same field — the encoding is per-school even within one CMS). A naive `src=` scrape
finds **zero** photos. Verified: **16/16** candidates carry a photo.

### Trap 4 — four other hosts, and only one of them belongs

Eight rows across the four views point off the main domain:

| Rows | Host | Treatment |
|---|---|---|
| 5 | `clshawks.com` | **KEPT** — the school's own athletics site |
| 1 | `www.sya.org` | dropped — a study-abroad organisation |
| 1 | `issuu.com` | dropped — a document host |
| 1 | `www.charlottelatinstories.com` | dropped — **does not resolve at all** |

`clshawks.com` is Charlotte Latin's athletics site: its pages carry
`og:site_name: Charlotte Latin School`. **The user confirmed 2026-08-28 that a
school's own athletics site is legitimate news**, so those rows are kept via
`alsoAllowedHosts: ['clshawks.com']` in `sources.ts` (and the host added to the
Worker's `ALLOWED_HOSTS`).

The other three stay dropped by the same rule, and the distinction is the point:
**being linked BY the school is not the same as being published BY the school.**

Fourteen Athletics posts carry `data-opens-in="linked_url"`; that attribute marks
a link post but says nothing about *whose* site it points to, so it is not used
for filtering. The host decides.

Only **one** athletics row reaches the rendered ten — the 2026-04-23 signing
story, which lands at **#6**. The other four are dated 2025-11-12, 2025-04-24,
2025-02-05 and 2024-12-08, all older than the #10 cutoff (2026-04-01), so none
are lost to the per-board slice. Verified, not assumed.

### Trap 8 — the kept athletics rows are on a COMPLETELY DIFFERENT CMS

Keeping `clshawks.com` rows means the second pass fetches pages from **SIDEARM
Sports**, which shares nothing with Finalsite:

- `link[rel=canonical]` is on `clshawks.com`, so the Finalsite gate
  (`isSchoolArticlePage`, which fails closed off-domain) correctly rejects it —
  without a second gate those rows get **no preview**.
- There is **no `article:published` meta at all**, so the rows would be undated
  and sort beneath articles years older. That reads as a *mis-ordered* section
  rather than a broken one, which is harder to notice.
- There is no `div.fsBody`.

Both are recoverable, and this CMS is better behaved than Finalsite here: its
`og:description` is a **genuine per-article summary** (not the boilerplate of
Trap 5), and its JSON-LD `NewsArticle` carries a clean ISO `datePublished`
(`2026-04-23T22:04:00`). The athletics branch reads those two fields directly
and skips the paragraph-scoping machinery.

The two gates stay **separate** rather than widened into one permissive check:
each host gets the extraction correct for its own CMS, and a page on neither
host still fails closed.

### Trap 5 — `og:description` is boilerplate
Every article returns the literal `"News Details - Charlotte Latin School"` — verified
identical across three unrelated posts. Non-empty, so it passes a naive check and would
ship the same sentence on all ten rows.

### Trap 6 — the first unscoped `<p>` is site navigation
As on Country Day. Scope to **`div.fsBody`** (occurs exactly **once** per article page).
`.fsPageBody` occurs **twice** and wraps chrome — not tight enough.

### Trap 7 — two date metas, and the obvious one is wrong
```html
<meta name="page-published"        content="2025-10-29T19:16:39Z">   <!-- CMS template -->
<meta property="article:published" content="2026-05-13T15:18:00Z">   <!-- the story -->
```
`page-published` is when the news-details **template** was published — identical across
unrelated articles, and would collapse the entire sort. Read the **property**, never the
name. `article:published` was present on **38/38** sampled articles.

## Verified result (2026-08-28)

**Superseded.** This is the four-view design; see "Verified result (2026-11-01)" below.


Running the shipped parser in Chromium over the captured HTML, then fetching the 14
candidate article pages (main site *and* athletics site): **10/10 dates, 10/10
photos, 10/10 genuine previews** — no
boilerplate, no captions, no nav text, no bylines. The ordering matched an independently
derived ranking from a 38-article date sample.

| # | Date | Section | Headline |
|---|---|---|---|
| 1 | 2026-05-22 | School | Commencement Exercises for Class of 2026 |
| 2 | 2026-05-21 | School | 2026 Upper School Honors and Awards Ceremony |
| 3 | 2026-05-20 | School | 2026 Middle School Awards Assembly |
| 4 | 2026-05-18 | School | Class of 2026 Celebrated at Baccalaureate and Senior Supper |
| 5 | 2026-05-13 | Arts | Theater Arts Department Announces 2026-27 Schedule |
| 6 | 2026-04-23 | Athletics (**clshawks.com**) | Record-Setting Year for Collegiate Athletic Commitments |
| 7 | 2026-04-22 | Arts | Blumey Nominations Honor Cabaret Performers |
| 8 | 2026-04-21 | Academics | SumoBot Tournament Challenges Student Roboticists |
| 9 | 2026-04-09 | Athletics | Spotlight: Head Athletic Trainer Andy Russo |
| 10 | 2026-04-01 | Arts | Latin Student Artists Win National Medals in Scholastic Awards |

All four requested sections are represented.

## Verified result (2026-11-01)

The shipped parser and `fetchNews`, built and run in Chrome through the relay against the
live board: **10/10 dates, 10/10 previews**, order matching the grid-by-date table in the
re-capture section above.

| # | Date | Headline | Host |
|---|---|---|---|
| 1 | 2026-09-30 | High Honor for Director of Teaching and Learning | charlottelatin.org |
| 2 | 2026-09-24 | Spotlight: Louisa Polos, Head of Middle School | charlottelatin.org |
| 3 | 2026-09-16 | Ten Charlotte Latin Seniors Named National Merit Semifinalists | charlottelatin.org |
| 4 | 2026-09-11 | Charlotte Latin School Observes 9/11 Anniversary | charlottelatin.org |
| 5 | 2026-09-10 | Spotlight: Amy Maxwell, Transitional Kindergarten (TK) Teacher | charlottelatin.org |
| 6 | 2026-09-09 | Charlotte Latin Celebrates Founders' Day | charlottelatin.org |
| 7 | 2026-09-07 | David Gatoux Receives Chuck Carter Athletic Cup | clshawks.com |
| 8 | 2026-09-03 | Spotlight: Jessica Lee, Upper School English Chair | charlottelatin.org |
| 9 | 2026-08-28 | Convocation Begins the Senior Year for the Class of 2027 | charlottelatin.org |
| 10 | 2026-08-18 | Daniel Willingham Delivers Keynote to Latin Faculty | charlottelatin.org |

The section holds its skeleton until the date pass ends: 0.3s warm and **13.6s fully cold**
(cache-busted board and articles).

## Distinguishing a redesign from a parser bug

- **Section errors, other schools fine** → check `ALLOWED_HOSTS` first (`curl` the Worker
  with a board URL; `403` confirms).
- **Rows appear but all dates are missing/identical** → `article:published` moved, or the
  parser regressed onto `page-published` (Trap 7).
- **All previews identical** → the `div.fsBody` scope broke and `og:description` or the
  nav is winning (Traps 5/6).
- **No photos anywhere** → `data-image-sizes` moved or changed encoding (Trap 3).
- **Fewer than ten rows** → expected only if the boards lack spare on-site posts;
  otherwise a view is failing to fetch (non-primary view failures are skipped silently by
  design, so check the network tab for four board requests).
