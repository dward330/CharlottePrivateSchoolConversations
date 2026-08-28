# Charlotte Latin School — News board structure

## Provenance

- **Captured:** 2026-08-28 by Claude (Claude Code), for the `/add-school-news` pass.
- **How:** `curl -sS -L` with a desktop Chrome User-Agent against the four board URLs
  supplied by the user, plus 38 sampled article pages. The shipped parser was then run
  against the captured HTML **in Chromium via Playwright** (not a reimplementation), and
  the resulting ten rows were checked against an independently derived date ordering.
- **Source URLs — SUPPLIED BY THE USER**, four category-filtered views:

  | Category id | Section | URL |
  |---|---|---|
  | 84 | Arts | `https://www.charlottelatin.org/about/school-news?post_category_id=84` |
  | 85 | Athletics | `https://www.charlottelatin.org/about/school-news?post_category_id=85` |
  | 167 | School | `https://www.charlottelatin.org/about/school-news?post_category_id=167` |
  | 89 | Academics | `https://www.charlottelatin.org/about/school-news?post_category_id=89` |

  The user asked for these four **merged, ordered by latest date, capped at 10**.

- **`indexUrl`** (the "All news & media" destination) is the **unfiltered** board,
  `https://www.charlottelatin.org/about/school-news` — verified HTTP 200, 330 posts,
  `<title>School News and Publications - Charlotte Latin School</title>`. The four
  category URLs are parse targets only; sending a reader to one would show them a
  quarter of the news.
- **CORS:** no `Access-Control-Allow-Origin` header (expected — the relay exists for
  this). `charlottelatin.org` **301s to `www.`**, so both forms are in `ALLOWED_HOSTS`.

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
- **8 rows link off-site** and are dropped by the same-site rule (see Trap 4).
- **133 on-site posts** remain — far more than the ten needed.

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

### Trap 4 — this board links off-site more than any other in the app
Eight rows point elsewhere: **5 × `clshawks.com`** (the school's *own* athletics site, but
a different registrable domain), `www.sya.org`, `issuu.com`,
`www.charlottelatinstories.com`. Fourteen Athletics posts carry `data-opens-in="linked_url"`.

All are dropped by the same-site rule in `normalizeItems`. **`clshawks.com` is the
interesting case:** genuinely the school's, yet correctly dropped — the rule is an
allow-list on the board's own registrable domain, not a block-list of social platforms.
**Do not add `clshawks.com` to `ALLOWED_HOSTS`** to rescue those rows; dropping costs
nothing here, as 133 on-site posts back-fill the ten.

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

Running the shipped parser in Chromium over the captured HTML, then fetching the 14
candidate article pages: **10/10 dates, 10/10 photos, 10/10 genuine previews** — no
boilerplate, no captions, no nav text, no bylines. The ordering matched an independently
derived ranking from a 38-article date sample.

| # | Date | Section | Headline |
|---|---|---|---|
| 1 | 2026-05-22 | School | Commencement Exercises for Class of 2026 |
| 2 | 2026-05-21 | School | 2026 Upper School Honors and Awards Ceremony |
| 3 | 2026-05-20 | School | 2026 Middle School Awards Assembly |
| 4 | 2026-05-18 | School | Class of 2026 Celebrated at Baccalaureate and Senior Supper |
| 5 | 2026-05-13 | Arts | Theater Arts Department Announces 2026-27 Schedule |
| 6 | 2026-04-22 | Arts | Blumey Nominations Honor Cabaret Performers |
| 7 | 2026-04-21 | Academics | SumoBot Tournament Challenges Student Roboticists |
| 8 | 2026-04-09 | Athletics | Spotlight: Head Athletic Trainer Andy Russo |
| 9 | 2026-04-01 | Arts | Latin Student Artists Win National Medals in Scholastic Awards |
| 10 | 2026-03-25 | Arts | Charlotte Latin Celebrates Youth Art Month |

All four requested sections are represented.

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
