# Davidson Day School — News Board Structure

## Provenance

- **Captured by:** Claude Code, for the `add-school-news` skill
- **Captured on:** 2026-08-28
- **How:** `curl` with a desktop User-Agent against the live board and all 9
  article pages; photo, preview and date extraction verified end-to-end against
  the captured HTML before the parser was written.
- **Board URL (USER-SUPPLIED 2026-08-28):**
  <https://www.davidsonday.org/about/news-media/news>
- **Index URL:** same page. One URL serves as both the parse target and the
  "All news & media" destination.

## Re-capture 2026-11-01 — article pages now carry a date

- **Captured:** 2026-11-01 by Claude (Claude Code), comparing the live section with the
  school's own pages. **TRAP 1 below ("no date is published anywhere") was true on
  2026-08-28 and is no longer true.**
- **Sources:** `https://www.davidsonday.org/about/news-media/news` and its nine article pages.

The board is unchanged: no date in its markup. All nine article pages now carry
`meta[property="article:published"]`, and the board's order matches those dates exactly.
Every page also carries `name="page-published"` with one identical template value
(2026-10-20T17:02:52), which must not be used.

| # | Published | Headline |
|---|---|---|
| 1 | 2026-10-22 | Davidson Day Yearbook Wins All-State Award |
| 2 | 2026-10-08 | Davidson Day Announces New Campus |
| 3 | 2026-10-05 | Davidson Day's Mat Saunders Named to "The 100" |
| 4 | 2026-09-28 | Davidson Day Partners with Elon University |
| 5 | 2026-05-13 | Davidson Day Announces Legendary Coach Bob McKillop as 2026 Commencement Speaker |
| 6 | 2026-04-17 | Davidson Day Announces New Varsity Boys Basketball Head Coach |
| 7 | 2026-02-20 | Davidson Day Announces New Middle & Upper School Assistant Division Head |
| 8 | 2025-10-02 | Davidson Day Announces Leadership Changes for 26-27 School Year |
| 9 | 2025-09-24 | Davidson Day Announces New Mission Statement and Core Values |

The board shows nine posts with a Load More button (`data-start-row="10"`). The rest are
older, so the section shows nine rows.

**The blog is deliberately not read.** `https://www.davidsonday.org/about/news-media/blog`
is a separate board (`fsBoard-6`, newest 2026-10-29). The user decided 2026-11-01 to keep the
section to school announcements.

A fully cold load took 4.8s in Chrome.

## Fetch observations

| Check | Result |
|---|---|
| HTTP status | `200` |
| Bytes | ~91,389 |
| Server-rendered? | **Yes** — all 9 posts present in the raw HTML |
| `access-control-allow-origin` | **Absent** (expected — this is why the relay exists) |
| Apex `davidsonday.org` | **301 → `www.davidsonday.org`** — both forms allow-listed |

## CMS

**Finalsite.** Markers: `fsElement` (159), `fsPostElement`, `data-board-id="5"`,
`article.fsBoard-5`, `fsPostLink`, `fsTitle`, `fsThumbnail`.

The **sixth** Finalsite board in the app. One parser per school regardless —
see "Why this is not a shared parser" below.

## Selector table

| Field | Selector | Notes |
|---|---|---|
| Items | `article[data-post-id]` | **9 posts.** The page has **16** `<article>` elements — 7 are layout furniture with no post id |
| URL | `div.fsTitle a[href]`, fallback `a.fsPostLink[href]` | Already absolute |
| Title | `div.fsTitle a` | `textContent.trim()` |
| Photo | `img[data-image-sizes]`, fallback `[data-image-sizes]` | JSON array of `{url,width}` — **TRAP 2**. All 9 posts have one |
| Date | — | **ABSENT EVERYWHERE** — TRAP 1 |
| Summary | — | **Absent** on the board — needs a per-article fetch |
| Preview | first `<p>` >60 chars inside `div.fsBody`, captions and byline excluded | **not** `og:description` — TRAP 3 |

### Present vs absent

- **Present:** title, URL, photo (9/9), article body prose (9/9), a
  `div.fsAuthor` byline (9/9).
- **Absent:** any publication date, any board summary, any usable
  `og:description`, any JSON-LD.

## Traps specific to this site

### TRAP 1 — no date is published anywhere

Confirmed by inspection, not inferred from a failed selector:

- **Board:** zero `<time>`, zero `datetime=`, zero `data-*date*`, no date-shaped
  text. A row is a thumbnail, a title link and a "Read More" link.
- **Article pages (all 9):** no `<time>`, no `article:published_time`, no
  `datePublished`, no JSON-LD at all.
- **Feeds:** `/rss`, `/feed`, `?format=rss`, `/rss.xml` and
  `/apps/news/news_rss.jsp` all **404**.

> ⚠️ **One probe returns HTTP 200 and is NOT a feed.**
> `https://www.davidsonday.org/p/~board/all-school-news/rss` answers **200**,
> with `content_type: text/html`, 62KB and **zero `<item>` elements** —
> Finalsite resolves the trailing `rss` as a **post slug** and serves an article
> page (the Bob McKillop post). It was rejected on its content type and item
> count, never on its status code. This is exactly the "200 serving the wrong
> sheet" failure the skill warns about.

**Consequence:** the source supplies **no `publishedAt` hook**; every item
carries `date: null`. `normalizeItems` sorts undated items last but *stably*, so
the board's own newest-first DOM order is preserved. Matches **Charlotte
Christian**, the app's other genuinely dateless school — and differs from
**Cannon** and **Covenant Day**, which are dateless on the board but keep a date
on the article page.

### TRAP 2 — the photo is never in `src`, and both encodings appear

The `<img>` carries `class="fsStyleSROnly"` and **no `src` at all**; the real
URLs live in `data-image-sizes`. The same capture contains **both**
entity-encoded (`&quot;url&quot;`) and percent-encoded (`%22url%22`) payloads, as
on Charlotte Christian — a decoder handling only one finds zero photos on the
other.

Verified extraction, all 9 posts (mid-range width targeting ~640px):

| Post ID | Selected width |
|---|---|
| 133, 114, 101, 30, 29, 28, 27 | 512 |
| 26 | 500 |
| 25 | 640 |

A photo-less result here means **the parser broke**, not that the school stopped
publishing images.

### TRAP 3 — boilerplate `og:description`, and a byline directly above the body

Every article page returns the literal string:

```
Posts Details/Default Board Post Page - Davidson Day School
```

as its `og:description` — the CMS template's own name, identical on all 9 posts.
Non-empty, so it passes a naive check and would ship as the preview on every row.

The hazard specific to this school is `div.fsAuthor`:

```html
<div class="fsAuthor">Addison Lanter, Marketing Content Specialist</div>
<div class="fsBody"><p>Davidson Day School is excited to announce…</p>
```

Present on all 9 posts, prose-shaped, and sitting **immediately before** the
body. A "first substantive `<p>` on the page" rule is saved here only by the
byline being **45 chars** — under the 60-char floor. That is luck, not a rule: a
longer future byline ships as the preview on every row.

**Excluded structurally**, not by length or wording — the byline is a sibling
**outside** `div.fsBody`, so scoping the paragraph search to that container drops
it however long it gets. Verified: `div.fsBody` and `div.fsAuthor` each appear
**exactly once** per page, and the author div is **never nested inside** the body.
A wording backstop is kept in case it ever moves inside.

### TRAP 4 — captions, guarded before they are needed

Bodies here **do** contain `<figure>` elements (the Class of 2025 post carries
several). Today every one sits **below** the opening paragraphs, so a plain
"first `<p>`" rule happens to be correct on all 9 posts — a property of this
week's posts, not of the board. Captions are excluded structurally
(`figure, figcaption, .fsImageCaptioned, .fsCaption`) with a `Pictured:` text
backstop, because the equivalent Providence Day defect was invisible to a `curl`
pass and appeared only in a browser.

### Off-site links

**None.** All 9 posts link to `www.davidsonday.org`. No `data-opens-in="linked_url"`
posts, no social hosts. `normalizeItems`' same-site rule drops nothing here, and
no `alsoAllowedHosts` entry is needed.

## Why this is not a shared parser

Closest sibling is **Charlotte Christian** (dateless, photo on every post,
boilerplate `og:description`) — but it differs from that one too:

- Charlotte Christian's pages end with a 442-char non-discrimination notice that
  a naive body scrape can ship as the preview. Davidson Day has no such notice
  but **does** have the `fsAuthor` byline — a different hazard needing a
  different guard.
- **Providence Day** and **Charlotte Catholic** both publish a real date; this
  board publishes none.
- **Charlotte Catholic** publishes no photos at all; this board publishes 9/9.

A parser ported from any sibling would have produced a plausible,
wrong-looking-right result: an empty section, photo-less rows, or a byline as the
preview on all nine rows.

## Verified previews (all 9)

| Post ID | Preview opening |
|---|---|
| 133 | Davidson Day School is excited to announce Naismith Basketball Hall of Fame nominee… |
| 114 | Davidson Day School announced two-time North Carolina State Champion Gary Ellington… |
| 101 | Davidson Day is excited to announce the addition of two educators and leaders… |
| 30 | Davidson Day School is excited to announce an important leadership transition… |
| 29 | Davidson Day School is proud to announce its new mission statement and core values. |
| 28 | Davidson Day School is proud to announce that alumna Mallorie Haines '21 has joined… |
| 27 | On May 22, 2025, Davidson Day School celebrated the class of 2025 at commencement… |
| 26 | Davidson Day School is proud to announce that actor and writer Cullen Moss… |
| 25 | Sims Skaff, a Davidson Day School sophomore, won Photographer of the Year… |

All 9 resolve a real, on-topic preview. None is a byline, a caption or
boilerplate.

## Registration

- `src/lib/news/sources.ts` → `'davidson-day'` (`parse`, `preview`, **no**
  `publishedAt`)
- `workers/news-proxy/worker.js` → `ALLOWED_HOSTS` gains `www.davidsonday.org`
  and `davidsonday.org` (**Worker redeploy required**)

Request cost: **1 board + 9 previews = 10 relay requests** per uncached visitor,
behind the Worker's 15-minute edge cache and the app's 30-minute
`sessionStorage` cache.
