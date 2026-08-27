# Providence Day School — News & Media board — source structure

## Provenance

- **Captured:** 2026-08-27, by Claude during the `latestnews` planning pass.
- **How:** `curl` with a desktop User-Agent against the school's public News & Media
  board, plus one article page, to determine which fields the Latest News section can
  actually populate.
- **URL authority:** the board URL above was **supplied by the user**. An earlier
  `/about/pd-communications` "landing" URL recorded here was self-derived from links in the
  design file and has been removed — it was never confirmed. Never re-derive a news URL;
  see `.claude/skills/add-school-news/SKILL.md` step 1.
- **Why it is here:** the data-provenance standard — any figure or field the app surfaces
  must be traceable to a committed source file. This records the *shape* of the feed the
  parser depends on, so a future maintainer can tell a site redesign from a parser bug.

## Source URLs

- **News board — USER-CONFIRMED 2026-08-27** (the only URL needed for this school; it is
  both the parse target and the "All news & media" destination):
  <https://www.providenceday.org/about/pd-communications/news-media>
- Example article: <https://www.providenceday.org/about/pd-communications/news-media/post/~board/news-media/post/where-global-studies-meets-entrepreneurship-inside-pds-innovative-summer-course>

## Platform

**Finalsite.** The board is a `fsPostElement` list. Confirmed markers: `fsElement
fsPostElement`, `data-board-id="90"`, `fsItemCount_10`, and per-item
`<article class="fsStyleAutoclear fsBoard-90 …" data-post-id="…">`.

## What the board page yields (verified 2026-08-27)

The board is **fully server-rendered** — all 10 articles are present in the raw HTML with
no JavaScript execution required. `curl` returns HTTP 200 and 61,995 bytes.

| Field | Available on board page? | Where |
|---|---|---|
| Article URL | ✅ yes | `a.fsPostLink[href]` |
| Title | ✅ yes | `div.fsTitle > a` (text) |
| Publish date | ✅ yes | `time[datetime]`, ISO-8601 (`2026-08-24T08:00:00-04:00`) |
| Photo | ✅ yes | `img[data-image-sizes]` — an **HTML-entity-encoded JSON array** of `{url,width}` |
| Summary / deck | ❌ **NO** | not present anywhere in the list markup |

**Item count observed:** exactly 10 articles, newest first.

## The two non-obvious traps

1. **Photos are not in `src`.** The `<img>` carries no `src` at all — it is lazy-hydrated
   client-side. The real URLs live in `data-image-sizes` as escaped JSON
   (`&quot;url&quot;:&quot;https://resources.finalsite.net/…&quot;`). A plain
   `src="…jpg"` scrape finds **zero** images and would wrongly conclude this school
   publishes no article photos. Unescape the attribute, `JSON.parse` it, then pick a
   mid-range width.

2. **There is no summary on the board, and `og:description` is useless.** The article
   page's `og:description` is the literal boilerplate string **`"News Post"`** on every
   article — worse than absent, because it looks like a valid summary. The only real
   preview text is the **first substantive `<p>` of the article body**, which requires a
   second fetch per article.

## Dates observed on the board (2026-08-27 capture)

```
2026-08-24  Where Global Studies Meets Entrepreneurship: Inside PD's Innovative Summer Course
2026-08-10  Providence Day Expands Nutrition Resources for Families
2026-07-30  Celebrating 25 Years of Senior Venture in Boston and Cape Cod
2026-07-21  Inspired to Serve: Brooks Hinton '27 Builds Math Website for Freedom School Scholars
2026-07-07  Providence Day Student Builds Statewide Network for Latino Student Leaders
2026-07-02  Celebrating 20 Years of Partnership with Charlotte Chinese Academy
2026-06-23  Providence Day Earns Prestigious National Recognition in Global Education
2026-06-16  Student Voices Take Center Stage in Providence Day Speech Contest
2026-06-__  Turning Gratitude into Action: Season of Service at Providence Day
2026-06-__  The Road Ahead: What's Next for the Class of 2026
```

These are the same 10 articles, in the same order, that appear hardcoded in the design
reference `Providence Day School.dc.html` — so the design was authored against live data.

## CORS

The board sends **no `Access-Control-Allow-Origin` header**. A browser `fetch()` from
`charlotteschoolinsights.com` is therefore blocked by the same-origin policy. This is a
property of the school's server, not something the parser can work around; see the
`latestnews` plan for the consequence.
