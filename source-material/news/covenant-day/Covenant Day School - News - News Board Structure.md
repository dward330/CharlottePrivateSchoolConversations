# Covenant Day School — News — News Board Structure

## Provenance

- **Captured by:** Claude (agent), via `/add-school-news`, for Derrick.
- **Captured on:** 2026-08-28.
- **How:** `curl` with a desktop User-Agent against the live board, plus
  per-article fetches of three detail pages sampled across all three boards.
  Structure read from the raw HTML; no headless rendering was needed.
- **Why:** parser provenance for `src/lib/news/parsers/covenant-day.ts`. This
  record is what later distinguishes *the school redesigned its site* from
  *the parser broke*.

## Source URLs

- **Board (parse target):** <https://www.covenantday.org/about-us/news>
- **Index ("All news & media" destination):** <https://www.covenantday.org/about-us/news>

Both are the same URL — **user-supplied 2026-08-28**, not derived. The apex
`covenantday.org` 301s to the `www.` form (verified), so both hostnames are
listed in the Worker's `ALLOWED_HOSTS`.

## CMS

**Finalsite.** Markers present: `fsElement` (84), `fsPostElement`,
`article[data-post-id]`, `fsBoard-N` / `fsTag-N` classes, `fsTitle`,
`fsSummary`, `fsThumbnail`, `fsPostLink`, `fsCroppedImage`.

Absent: `data-board-id`, `fsBoardPost`, `wp-content`, `entry-title`, `sqs-`.

This is the **fifth Finalsite board** in the app, and it disagrees with the
other four on where the two most important fields come from — see *Field
inventory* below. Board HTML was ~172 KB, HTTP 200, fully server-rendered.

## THREE boards on ONE page

`/about-us/news` renders three separate Finalsite post boards. All three are
Covenant Day's own news and all are kept. A single fetch returns all of them,
so the source needs **no `extraBoardUrls`** (unlike Charlotte Latin).

| Board class | `~board/` path | Posts | Content |
|---|---|---|---|
| `fsBoard-218` | `news` | 15 | General school news |
| `fsBoard-230` | `features` | 15 | "Get to Know…" staff/faculty profiles |
| `fsBoard-234` | `lions-news` | 7 | Athletics |

**37 posts total.**

⚠️ **The three boards are NOT interleaved by date, and one is badly stale.**
`lions-news` was last updated in **2024** while `news` and `features` run
current (2026). DOM order would therefore put a two-year-old athletics post
above last month's news. **Date sorting is what actually orders this section** —
which matters more than usual here, because no date exists until the second
pass (below).

## Field inventory

| Field | Selector | Present? | Notes |
|---|---|---|---|
| Items | `article[data-post-id]` | ✅ 37 | Across all three boards |
| Title | `div.fsTitle a` | ✅ 37 | `textContent`, SR-only spans stripped |
| URL | `div.fsTitle a[href]` (fallback `a.fsPostLink[href]`) | ✅ 37 | Already **absolute** |
| Photo | `img[data-image-sizes]` | ✅ 37 | Entity-encoded JSON — **Trap 1** |
| Summary | `div.fsSummary > p` | ✅ 37 | **Genuine per-article prose** — **Trap 2** |
| Date | — | ❌ **0** | **Absent entirely** — **Trap 3** |

Photo variants offered per article: **256 / 512 / 800 / 1200 / 1600 / 2200**.
The parser targets ~640px, which lands on the 800px render.

Photos are served from `resources.finalsite.net` (HTTP 200 direct, verified), so
they load straight from the CDN and never touch the relay.

### Article detail pages

| Field | Selector | Present? |
|---|---|---|
| Date | `meta[property="article:published"]` | ✅ ISO-8601, varied |
| Decoy date | `meta[property="page-published"]` | ❌ **ABSENT** (confirmed, not assumed) |
| Summary | `og:description` | ✅ real, but redundant — board already has it |

Sampled dates, one per board, all HTTP 200:

| Board | Article | `article:published` |
|---|---|---|
| `news` | Join us at the Booster Club Golf Tournament | `2026-07-30T17:18:00Z` |
| `features` | Get to Know LS Nurse Sara McGee | `2026-05-12T15:19:00Z` |
| `lions-news` | 7 CDS Students Celebrate Athletic Collegiate Commitments | `2024-09-02T20:20:00Z` |

## Traps

### Trap 1 — the photo is not in `src`

The `<img>` carries **no `src` attribute at all**. Real URLs live in
`data-image-sizes` as an **HTML-entity-encoded JSON array** of `{url,width}`.
A naive `src="…jpg"` scrape finds **zero** photos and renders every row
photo-less — which reads as a correct application of the "some articles have no
photo" rule while actually being a parser bug.

All 37 posts carry a photo, so **a photo-less row here is a signal worth
noticing, not normal.**

### Trap 2 — the summary is REAL here, and that is the unusual case

Every other Finalsite board in this app either omits the summary or fills it
with boilerplate (Providence Day: `"News Post"`; Cannon:
`"In the News Details - Cannon School "`). The standing project rule is to
distrust the summary and re-fetch the article body.

**Covenant Day is the exception.** `div.fsSummary` was eyeballed across all
three boards before being trusted, and holds genuine, distinct, per-article
prose:

- "Seven CDS athletes committed to continuing their athletic careers at the collegiate level!"
- "Registration is open for the upcoming Booster Club Golf Tournament!"
- "Siti Oo's family immigrated from Burma and descends from the Chin people."
- "It's also a joy to get to know the kids and their unique personalities!"

So this school needs **no `preview()` pass**. Adding one "for consistency" would
spend ~37 extra relay round-trips re-fetching text already in hand.

Several summaries end with `&nbsp;`, which the parser flattens — otherwise it
renders as a trailing gap before the arrow.

### Trap 3 — the board publishes NO date, in any form

No `<time>` element, no `fsDate` / `fsDateTime` class, no date data-attribute —
**verified across all 37 posts on all three boards**, not inferred from one
sample. The date exists **only** on the article page, as
`meta[property="article:published"]`.

Consequences, and they compound with the stale-board problem above:

- `parse()` returns `date: null` for every item. That is **expected**, not a bug.
- `publishedAt` is **required** in `sources.ts`. Without it every row is undated
  and the section falls back to DOM order — which is wrong here, because
  `lions-news` trails the other two boards by over a year.
- `fetchNews`'s `needsDates` branch keeps **all 37 posts** as the candidate pool
  and caps to ten only once dates arrive. Capping to ten first would pick the
  final ten *before any date was known*, and the date pass would then faithfully
  sort the **wrong ten** — a section that looks correct while being wrong.

This makes Covenant Day's second pass **37 fetches**, wider than any other
school's ten. Both cache layers (the Worker's 15-minute edge cache, the app's
30-minute `sessionStorage` cache) sit in front of it, so only the first uncached
visitor per window pays it.

### Trap 4 — slugs are NOT title-derived; never construct a URL

Discovered by a 404 during capture. "Join us at the Booster Club Golf
Tournament" lives at:

```
/about-us/news/details/~board/news/post/teeing-up-the-booster-club-golf-tournament-1785429931067
```

The slug is a *different headline* plus a numeric suffix. A URL constructed from
the title 404s — which would cost that row its date and silently drop it to the
bottom of a section ordered entirely by date, rather than failing visibly.
**The parser reads `href` and never builds one.**

## Off-site links (Trap 4 in the skill)

**None today.** All 37 posts are `data-opens-in="page"` and all 37 resolve to
`https://www.covenantday.org`. No `linked_url` posts, no social hosts, no
document hosts.

Covenant Day therefore needs **no `alsoAllowedHosts`**. The same-site rule in
`normalizeItems` still applies centrally, so a future Instagram or third-party
link post is dropped automatically with no parser change.

## CORS

```
curl -sSI -L https://www.covenantday.org/about-us/news | grep -i access-control-allow-origin
→ (no header)
```

**No CORS header**, as expected — the board is unreachable from a browser
directly, which is why the relay Worker exists. Both `www.covenantday.org` and
`covenantday.org` were added to `ALLOWED_HOSTS` in
`workers/news-proxy/worker.js`.
