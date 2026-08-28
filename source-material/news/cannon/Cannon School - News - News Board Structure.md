# Cannon School — News — News Board Structure

## Provenance

- **Captured by:** Claude Code, via the `add-school-news` skill, on **2026-08-28**.
- **How:** `curl -sS -L` with a desktop Chrome User-Agent against the board URL and all
  17 in-site article pages, plus DOM-level verification of every selector below.
- **Why this file exists:** it is what later distinguishes *Cannon redesigned its site*
  from *the parser broke*. If the section starts erroring, diff the live HTML against the
  structure recorded here before touching parser code.

## Source URLs

- **Board (parse target):** <https://www.cannonschool.org/news-and-stories>
- **Index ("All news & media" destination):** <https://www.cannonschool.org/news-and-stories>

Both are the same URL, **user-confirmed 2026-08-28**. The URL came from the user and was
not derived, per step 1 of the skill.

## CMS

**Finalsite** — markers present: `fsElement` (64), `fsPostElement` (2), `data-board-id`
(2), `article.fsBoard-N`, `fsTitle`, `fsPostLink`, `fsThumbnail`.

Same CMS family as Providence Day, but a **leaner board variant**: it emits no `<time>`
element and carries no summary. The two parsers are therefore deliberately NOT shared —
they disagree on where the date comes from.

### Two boards on one page

`/news-and-stories` renders **two** Finalsite boards, 18 articles total:

| Board | Slug | Count | What it is |
|---|---|---|---|
| `fsBoard-10` | `cannon-news-cougar-news-internal-sources` | 9 | Cannon's own stories |
| `fsBoard-11` | `cannon-news-headline-news-external-sources` | 9 | Press mentions of Cannon |

Both are kept — both are Cannon news. **They are not interleaved by date**: as captured,
the internal board ran 2026-07-07 → 2026-08-25 while the press board trailed at
2024-09-18 → 2025-08-19. Board DOM order therefore is *not* chronological order across the
page, which is why date sorting matters here more than it did for Providence Day.

Every article on both boards links to a `cannonschool.org/news-and-stories/in-the-news-details/~board/...`
page — including the press mentions, which are re-hosted rather than linked offsite. The
one exception is a scanned PDF; see Trap 5.

## Selector table

| Field | Selector | Notes |
|---|---|---|
| Items | `article[data-post-id]` | 18 present (9 + 9) |
| URL | `div.fsTitle a[href]` | already absolute |
| Title | `div.fsTitle a` | **strip `.fsStyleSROnly`** — see Trap 5 |
| Date | — | **ABSENT from the board** — see Trap 6 |
| Photo | `img[data-image-sizes]` | entity-encoded JSON — see Trap 1 |
| Summary | — | **absent** — needs per-article fetch |
| Preview | first `<p>` >60 chars inside `article div.fsBody` | **not** `og:description` — Traps 2, 3, 4 |
| Published | `meta[property="article:published"]` (article page) | ISO-8601 — see Trap 6 |

### Fields present vs absent

- **Present on the board:** title, URL, photo (18 of 18).
- **Absent from the board:** date, summary. Both require the per-article second pass.

## Traps specific to this site

### Trap 1 — the photo is not in `src`
The `<img>` carries no `src` at all; real URLs are in `data-image-sizes` as an
HTML-entity-encoded JSON array of `{url,width}`. A naive `src="…jpg"` scrape finds **zero**
photos. **All 18 articles carry a photo**, so a photo-less row on this school is a signal
worth investigating rather than normal. Widths offered vary per upload
(256/400/455/512/555/667/768); the parser targets ~640.

### Trap 2 — `og:description` is boilerplate
Every article returns the literal `"In the News Details - Cannon School "`. Note this is a
**different** boilerplate string than Providence Day's `"News Post"` — which is exactly why
the skill says to eyeball the real value per school rather than pattern-match a known one.

### Trap 3 — the school-description FOOTER reads as article prose
Every page ends with *"Cannon School is an accredited, coeducational, independent JrK-12
college preparatory school located in Concord, North Carolina."* plus a non-discrimination
paragraph, inside `<footer id="fsFooter">`. Both exceed 60 chars. Scoping paragraph
selection to the article's own `div.fsBody` excludes them **structurally**, so a reworded
footer cannot leak back in. (An unscoped document-wide `<p>` scan does pick them up —
verified during capture.)

### Trap 4 — a byline or editor's note can outrank the story
**3 of 17 articles (18%)** lead with one, in two distinct shapes:

- A standalone `Editor's Note: …` paragraph (421 chars on *The Gift of Joy*) — **skipped**.
- A press byline **glued to the opening sentence in the same `<p>`**:
  `By LANGSTON WERTZ JR., The Charlotte Observer Cannon School girls' basketball coach…`
  — the byline is **stripped** and the sentence kept.

The byline regex is anchored on a **known publication-suffix** word (`Tribune|Observer|
Times|Post|Journal|News|Herald|Gazette|Press|Magazine|Weekly`) rather than a greedy run of
capitalized words. A greedy run cannot distinguish an outlet name from the story's own
opening words, and measurably failed both ways during development:

- too narrow → left `Independent Tribune No matter what happens…`
- too wide → ate real words, leaving `matter what happens…` and `girls' basketball coach…`

Both failure modes produce grammatical-looking sentences, which is what makes this class
expensive to catch. Validated correct across all 17 in-site articles.

### Trap 5 — SR-only text inside the title anchor
Finalsite appends `<span class="fsStyleSROnly">(opens in new window/tab)</span>` inside the
title link of externally-opening posts. Naive `textContent` ships
`CANNON SCHOOL CELEBRATES MILESTONE (opens in new window/tab)` as the headline. The parser
clones the node and removes `.fsStyleSROnly, [data-nosnippet]` before reading text.

### Trap 6 — no date on the board, and two competing meta tags on the article page
The board publishes **no date markup of any kind** (no `<time>`, no `fsDate` class — 0
matches for either). The date lives only on the article page, and there are **two** meta
tags that look plausible:

- ✅ `<meta property="article:published" content="2026-08-25T14:15:00Z">` — the real
  per-article publish time; verified varied across all 17.
- ❌ `<meta name="page-published" content="2025-08-29T16:27:23Z">` — when the CMS *page
  container* was created. Using this sorts every item to the same instant.

This is why `NewsSource` gained an optional `publishedAt` hook: the date arrives on the
second pass, and the list re-sorts when it does.

### Trap 7 — one row links to a PDF, not an article
The press board's newest row points straight at
`resources.finalsite.net/images/…/Independent_Tribune_8_21_25.pdf` (a scanned newspaper
page, `data-opens-in="linked_url"`). It has no article page, so it can yield neither a date
nor a preview. Because the 10-item cap is applied on **board order, before dates are
known**, it would otherwise occupy the last slot and push out a real, newer story. The
parser skips links ending in a document extension.

## CORS observation

```
curl -sSI -L "https://www.cannonschool.org/news-and-stories" | grep -i access-control-allow-origin
→ (no header)
```

**No `Access-Control-Allow-Origin` header**, as expected — a direct browser fetch is
blocked and the Cloudflare Worker relay is load-bearing. `www.cannonschool.org` and
`cannonschool.org` were both added to `ALLOWED_HOSTS` in `workers/news-proxy/worker.js`
and the Worker redeployed **2026-08-28** (version `1a9901b5-6507-43de-9db2-b0b00ba9205e`).
Verified: board `200`, article `200`, unlisted host still `403`.

## Capture snapshot (2026-08-28)

Board HTML ~64KB, HTTP 200, all 18 articles server-rendered (not JS-hydrated).

| # | Board | Published | Headline |
|---|---|---|---|
| 1 | 10 | 2026-08-25 | Cannon School Celebrates Completion of Upper School Expansion and Renovation |
| 2 | 10 | 2026-08-25 | Behind the Scenes at Cannon Studios |
| 3 | 10 | 2026-08-13 | Teaching and Learning at Cannon in the Age of AI |
| 4 | 10 | 2026-08-03 | Alumni Spotlight: Eden and Shelby Sipperly '11 Turn Grief Into Connection |
| 5 | 10 | 2026-08-03 | Gratitude Report Celebrates a Community Investing in Cannon's Future |
| 6 | 10 | 2026-08-03 | A Flourishing Future: August Construction Update |
| 7 | 10 | 2026-08-03 | Cannon School Welcomes New Faculty, Staff, and Leadership for the 2026–2027 School Year |
| 8 | 10 | 2026-07-21 | Learning Beyond the Classroom in Costa Rica |
| 9 | 10 | 2026-07-07 | The Gift of Joy |
| 10 | 11 | — (PDF) | CANNON SCHOOL CELEBRATES MILESTONE — *skipped, Trap 7* |
| 11 | 11 | 2025-08-19 | TRACK: Young track and field stars Kaylee Dobbins, Christina Hall, and Sakeenah Odom-Pollard… |
| 12 | 11 | 2025-04-23 | HIGH SCHOOL SOFTBALL: Cannon inches closer to winning fourth conference crown in five years |
| 13 | 11 | 2025-02-18 | GIRLS BASKETBALL: Defending state-champion Cougars, opening tourney with win… |
| 14 | 11 | 2025-01-27 | BOYS HIGH SCHOOL BASKETBALL: After slow start, veteran coach has tradition-rich Cannon ascending once again |
| 15 | 11 | 2024-11-07 | Cannon School girls' basketball is No. 1 in The Charlotte Observer's Sweet 16 poll |
| 16 | 11 | 2024-10-28 | Creating esports programs with managed network services |
| 17 | 11 | 2024-10-02 | Girls Athlete Spotlight: Maria Nix of Cannon School |
| 18 | 11 | 2024-09-18 | Cannon School Robotics Team: Empowering the visually impaired with face analysis technology |

With Trap 7 applied and date sorting on the second pass, the section renders items 1–9
plus the TRACK story (11) — the true newest 10.

## Translation

**None.** Fetched article content is never translated, in any locale — headlines, dates and
previews render in the source language on every locale's page. Only the section chrome is
translated. See the top of `.claude/skills/add-school-news/SKILL.md`.
