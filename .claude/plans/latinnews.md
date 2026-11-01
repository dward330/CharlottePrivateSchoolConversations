---
name: latinnews
title: Fix Latest News for Charlotte Latin and every dateless board — never show or cache an unsorted list, read Latin's whole board
status: implemented
phases: 1
created: 2026-11-01
branch: fix/latinnews
prs: [391]
---

# Fix Latest News for Charlotte Latin and every dateless board

## Goal

On Charlotte Latin's page, Latest News first shows an undated list in category order,
headed "Newest" over a May story, then flips to a date-sorted list that is still missing
most of the school's newest posts. After this change a visitor sees the loading skeleton
until dates are known, then one dated, date-ordered list that matches the school's own
board, and a slow article can no longer remove a story or save a wrong list. We will know
it worked when the Latin section shows the same ten stories as the board's newest ten
on-site posts, with dates, on the first paint after the skeleton, and the failure
scenarios in Verification behave as written.

## Context

An audit on 2026-11-01 found four defects, all reproduced on the live site in Chrome.

**How the section works today.** `fetchNews` in `src/lib/news/fetchNews.ts` fetches
`source.boardUrl` plus `source.extraBoardUrls`, runs `source.parse`, and calls
`normalizeItems` in `src/lib/news/types.ts`. It resolves immediately with up to ten rows,
writes them to `sessionStorage` (30-minute TTL, per tab, survives a reload), then runs
`hydratePreviews`, which fetches article pages for previews and dates, re-sorts, caps to
ten, rewrites the cache and calls `onUpdate`. `src/components/LatestNews.tsx` renders
whatever it holds and shows the skeleton only while `items` is null.

Four schools publish no date on their board and have `publishedAt` in
`src/lib/news/sources.ts`: `charlotte-latin`, `cannon`, `covenant-day`, `gaston-day`.

**Defect 1 — the unsorted list renders and gets saved.** For those four, the first render
has no dates, so it is in board order. For Latin that means Arts then Athletics, led by
a May 13 post labelled "Newest", under a header reading "10 most recent". The list lasts
0.2s with a warm relay cache and about 8s cold; the Worker's edge cache lasts 15 minutes.
The headline-only list is written to the cache before the date pass. If the visitor
reloads during the pass, it is aborted and `hydratePreviews` returns at
`if (signal?.aborted) return` with no rewrite. If every article times out, the all-empty
result is re-saved. Either way the undated list stays for 30 minutes. Reproduced both ways.

**Defect 2 — stories vanish when their date fails.** `byNewestFirst` sorts undated rows
last and `hydratePreviews` then caps to ten, so a story whose article fetch times out
falls out of a pool wider than ten. With the 9/11 and Founders' Day articles delayed past
the 12s budget, both disappeared and the lead became Sep 7. `Promise.all` also makes the
whole pass wait for the slowest article.

**Defect 3 — Latin's four category views miss the newest posts.** `sources.ts` reads
categories 84, 85, 167 and 89. Six of the school's ten newest posts carry none of those,
including the newest three (Sep 30, Sep 24, Sep 16). No sort can surface them. **The user
chose on 2026-11-01 to replace the four views with the unfiltered board.**

**Defect 4 — four posts per view is too few.** `PER_BOARD = 4` in
`src/lib/news/parsers/charlotte-latin.ts` drops May 21, 20 and 18 Events posts while
older April posts make the list. Its comments say `saturatedBoards` in `fetchNews`
compensates, but that identifier exists nowhere in the code. Moving to a single list
removes both.

**The unfiltered board** was captured for this plan; the record is the "Re-capture
2026-11-01" section of
`source-material/news/charlotte-latin/Charlotte Latin - News - News Board Structure.md`.
Key facts: two `.fsPostElement.fsList` strips repeat five posts with `href="#"` titles;
the main grid is `.fsPostElement.fsGrid`, 335 server-rendered posts, no pagination, no
`#` hrefs, and many rows on hosts the section drops. Its order is close to chronological:
only adjacent pairs were out of order across 45 rows, and the true top ten sit in the
first ten rows. Article pages still carry the date, and `publishedAt` and `preview` need
no change.

**Other consumers.** `extraBoardUrls` stays: Gaston Day uses it for page 2.
`scripts/check_news_hosts.mjs` parses `boardUrl`, `indexUrl` and `extraBoardUrls` from
`sources.ts` and handles a school with no `extraBoardUrls`. `fetchNews` has one caller,
`LatestNews.tsx`. Schools that publish board dates, and Charlotte Christian and Davidson
Day (no `publishedAt`), must keep today's path exactly: they render immediately, with
previews arriving through `onUpdate`.

## Decisions

- Latin reads only the unfiltered board, with `boardUrl` equal to `indexUrl` — user's
  decision 2026-11-01, replacing their own four URLs from 2026-08-28.
- Scope the Latin parser to `.fsPostElement.fsGrid`, and return no rows if it is missing —
  the strips hold `#` links, and zero rows reaches the existing error state, which is the
  signal that the site was redesigned.
- `GRID_POOL = 14` rows on allowed hosts — off-site rows are skipped before counting, so
  a page of issuu or podbean posts cannot shrink the pool. Fourteen covers the top ten
  with margin for adjacent disorder, and costs 15 requests per cold visitor against ~20 today.
- For a dateless board, resolve only after the date pass — the visitor keeps the skeleton
  and the existing `statusExtracting` line, so a wrong order can never render. This is the
  fix the user approved after the audit; the cost is a longer skeleton on a cold relay.
- Boards with their own dates keep rendering immediately — their first list is already correct.
- The date pass stays capped at 12s (`TIMEOUT_MS`) — a list arrives by then, whatever is hanging.
- New optional `NewsSource.boardIsChronological` flag, set only for Latin — an undated row
  takes its sort position from the row above it instead of sinking and being cut. Only
  Latin's order is measured; the parsers for Cannon, Covenant Day and Gaston Day state
  their board order is not chronological, so they keep undated-last.
- A chronological board stops waiting 2s after 80% of its articles have answered — a late
  row costs only its date and preview, not its position. Others wait the full 12s, because
  stopping early there sinks rows out of order.
- A pool with any undated row is cached for 2 minutes, not 30 (see Implementation notes); a list with no dates at all
  is rendered but not cached — so one bad pass heals on the next visit rather than sticking.
- No cache key bump — an old undated entry can live at most 30 minutes after a deploy.
- Single-phase — re-uses existing strings; adds no user-facing text.

## Approvals needed

None. The user approved the audit's direction and chose the unfiltered board on
2026-11-01. No Worker change is needed: both hosts are already in `ALLOWED_HOSTS`.
Deploying remains a separate instruction from the user.

## Source material

`source-material/news/charlotte-latin/Charlotte Latin - News - News Board Structure.md`
gained a "Re-capture 2026-11-01" section during planning (uncommitted, commit it with this
work). **Do not ingest it**: `news` is in `INTERNAL_TOPICS` in `build_docs.py` because
this folder records parser structure and is not a research area.

## Out of scope

- Raising the Worker's edge TTL to shorten cold loads. It needs a Cloudflare credential
  from the user. Note the option in the PR if cold skeleton time looks too long.
- Changing Latest News copy, including `news.note` ("most recent") and the "Newest" kicker.
- Translating anything in this section. Article text is never translated.
- Preview-only failures on boards that publish dates.
- A new automated check. The parsers need a DOM and `check:news` runs in plain Node, so
  the browser scenarios in Verification are the test.

## Steps

Single-phase — adds no user-facing text.

1. **Rewrite Latin's parser for the single grid** — `src/lib/news/parsers/charlotte-latin.ts`.
   - Delete `PER_BOARD` and every `saturatedBoards` reference. Export `GRID_POOL = 14`.
   - In `parse(html, boardUrl)`, query `article[data-post-id]` inside
     `doc.querySelector('.fsPostElement.fsGrid')`; if the grid is missing, return `[]`.
   - Resolve each `href` with `new URL(href, boardUrl)` in a try/catch, and skip the row
     unless its hostname matches `SCHOOL_HOST` or `ATHLETICS_HOST`, before counting it.
     Stop at `GRID_POOL` rows. Items keep their current shape, with `date: null`.
   - Rewrite TRAP 1 and the `parse` doc comment for the new shape: one grid, why the strips
     are excluded, the measured adjacent-only disorder, and that the four-view design
     missed posts. Update the header comment ("FOUR category views merged") and TRAP 2,
     which mentions "all four views". Update TRAP 4's counts to the host list in the
     source-material record, and keep its rule.

2. **Point the source at the board** — `src/lib/news/sources.ts`, `'charlotte-latin'` entry.
   Set `boardUrl` to `https://www.charlottelatin.org/about/school-news`, delete
   `extraBoardUrls`, add `boardIsChronological: true`. Rewrite the comment block: replacing
   the four URLs was the user's decision on 2026-11-01, and why. Keep the `alsoAllowedHosts`
   reasoning. In the `covenant-day` comment, fix "unlike Charlotte Latin this needs no
   `extraBoardUrls`" so it no longer implies Latin has them.

3. **Add the flag and sort helper** — `src/lib/news/types.ts`.
   - Add `boardIsChronological?: boolean` to `NewsSource` with a comment saying when it may
     be set: only after measuring the board's order against article dates.
   - Rewrite the `extraBoardUrls` comment to name Gaston Day's pagination, not Latin.
   - Export `byNewestFirstKeepingBoardOrder(items)`: walk `items` in pool order, giving each
     row a key of its own `Date.parse(date)`, or the previous key if undated (a leading
     undated row keys as `Infinity`), then stable-sort by key descending and return the
     items unchanged, with undated rows keeping `date: null`.
   - Add a line to the `normalizeItems` doc comment: with all rows undated, the sort is a
     no-op, so the pool arrives in board order. The helper relies on that.
   - Update the `cap` paragraph in that comment, which names Latin's multi-board shape.

4. **Hold dateless boards until dates arrive** — `src/lib/news/fetchNews.ts`.
   - Add `const PARTIAL_CACHE_TTL_MS = 2 * 60 * 1000`.
   - Give `writeCache` a `ttl` parameter defaulting to `CACHE_TTL_MS`, store it in `Cached`
     as optional `ttl`, and have `readCache` compare against `parsed.ttl ?? CACHE_TTL_MS`.
   - Rename `hydratePreviews` to `hydrateArticles`. Have it return
     `{ merged, datedCount }`, and move every `writeCache` and `onUpdate` call out of it to
     the two call sites below. Its early returns give back `items` capped to `MAX_ITEMS`.
   - In `hydrateArticles`, use `byNewestFirstKeepingBoardOrder` when
     `source.boardIsChronological`, otherwise `.sort(byNewestFirst)`. Cap after sorting.
   - When `source.boardIsChronological`, count settled fetches, and once
     `settled >= Math.ceil(needed.length * 0.8)` start a 2,000ms timer that calls
     `controller.abort()`. Clear it with the main timer. The existing per-fetch `catch`
     already leaves an aborted row in place, undated and without a preview; keep that.
   - In `fetchNews`, after `onPhase?.('extracting')` and `clearTimeout(timer)`, branch on
     `needsDates`:
     - **Dateless path:** `await hydrateArticles(...)`, then if `signal?.aborted`, return
       `merged` without caching. If `datedCount === 0`, return `merged` without caching. If
       every row in `merged` has a date, `writeCache(slug, merged)`; otherwise
       `writeCache(slug, merged, PARTIAL_CACHE_TTL_MS)`. Return `merged`.
     - **Every other board:** keep today's order exactly: `writeCache(slug, visible)`, start
       the pass without awaiting, return `visible`. Its `.then` does the existing writes,
       including `onUpdate` only when a preview or date landed, and skips them if aborted.
   - Update the doc comments on `fetchNews` ("Resolves as soon as the BOARD parse
     succeeds"), the board-fetch comment that names Latin's four views, and the
     "Cache the headline-only result IMMEDIATELY" comment, so each states which path it
     covers and why the dateless path must not cache early.
   - Confirm `signal?.removeEventListener` in `finally` still runs after the awaited path.

5. **Leave the component alone, and confirm it** — `src/components/LatestNews.tsx` needs no
   edit: the skeleton shows while `items` is null, and the phase line already reads from
   `onPhase`. The comment above its fetch effect does not need changing. If the build
   proves this wrong, record it in Implementation notes.

6. **Update the board record** —
   `source-material/news/charlotte-latin/Charlotte Latin - News - News Board Structure.md`.
   Mark the Provenance source table, Trap 1 and "Verified result (2026-08-28)" as the
   superseded four-view design, and add a new verified-result table from step 8's real run.

7. **Update the skill docs** — `.claude/skills/add-school-news/SKILL.md`: add a rule in the
   parser or registration guidance that a board publishing no dates holds its skeleton
   until the date pass ends and is never cached undated, and that `boardIsChronological`
   needs a measurement against article dates. Add `boardIsChronological` to the field list
   in Step 5. In `.claude/SKILLS.md`, change the `add-school-news` line to
   `updated 2026-11-01` (or the actual date), in the same PR, and add that rule to its entry
   if the entry describes the fields.

8. **Run Verification**, then open the PR on `fix/latinnews`, staging explicit paths only.
   Flip the `INDEX.md` row to *Implemented* with the PR link. Stop at merged: deploying
   needs the user's instruction.

## Files touched

| File | Change |
|---|---|
| `src/lib/news/parsers/charlotte-latin.ts` | edit — single grid, `GRID_POOL`, off-site skip, comments |
| `src/lib/news/sources.ts` | edit — Latin board URL, flag, comments |
| `src/lib/news/types.ts` | edit — flag, chronological sort helper, comments |
| `src/lib/news/fetchNews.ts` | edit — hold dateless boards, TTLs, early stop, comments |
| `source-material/news/charlotte-latin/Charlotte Latin - News - News Board Structure.md` | edit — re-capture section (already written) and superseded markers |
| `.claude/skills/add-school-news/SKILL.md` | edit — dateless-board rule and new field |
| `.claude/SKILLS.md` | edit — updated date |
| `.claude/plans/INDEX.md`, `.claude/plans/latinnews.md` | edit — status, PR, notes |

## Verification

Single-phase.

- [ ] `npx tsc -b` — clean (not `tsc --noEmit`)
- [ ] `npm run lint` — clean
- [ ] `npm run check:news` — passes with Latin's `extraBoardUrls` gone
- [ ] `npm run build` — succeeds, including every chained check
- [ ] `git status --short` — shows only the paths in Files touched

**Browser checks.** Run `npm run build && npx vite preview`, then use a Playwright script
in the scratchpad that loads Playwright by absolute path
(`require('<repo>/node_modules/playwright')`) with `channel: 'chrome'`. Load
`/school/charlotte-latin/` on the preview, use `waitUntil: 'domcontentloaded'` (never
`networkidle`), scroll `#news` into view, and sample `.news-featured-title`,
`.news-kicker`, `.news-row`, `.news-row-date` and the `news:charlotte-latin`
`sessionStorage` entry every 100ms. Delay relay requests with `page.route` on
`**/news-proxy.dward330.workers.dev/**`; an article request is one whose decoded URL is
not the board URL. Use a fresh context per scenario, because the cache is per tab.

- [ ] **Stays, warm:** ten rows, all dated, newest first. Compare against the live board:
      as of 2026-11-01 the order is High Honor for Director of Teaching and Learning,
      Spotlight: Louisa Polos, Ten National Merit Semifinalists, 9/11 Anniversary, Spotlight:
      Amy Maxwell, Founders' Day, David Gatoux, Spotlight: Jessica Lee, Convocation,
      Daniel Willingham Keynote. Newer posts appearing later is fine; re-derive from the
      board. No row is from `issuu.com` or another dropped host, and none has a `#` link.
- [ ] **Articles delayed 4s:** skeleton throughout, then the dated list. **The undated list
      must never appear in any sample.** This is the bug the user reported.
- [ ] **Reload at 1.5s into a 6s delay:** nothing undated in the cache before or after;
      the reloaded page holds the skeleton and then shows the dated list.
- [ ] **All articles delayed 14s:** at about 12s a list appears in board order with no
      dates, and `sessionStorage` has no `news:charlotte-latin` entry. A reload refetches.
- [ ] **9/11 and Founders' Day articles delayed 14s:** both rows stay in their board
      positions, undated, and the list appears about 2s after the others land, well before
      12s. The lead is still High Honor. The cache entry's `ttl` is 120000.
- [ ] **Cold, undelayed:** load the page after at least 15 minutes without a visit, so the
      relay's cache has expired. Record how long the skeleton lasts.
- [ ] **Regression, dated board:** on `/school/providence-day/`, delay articles 4s. The
      list and dates appear at once and previews arrive later, as they do on `main`.
- [ ] **Regression, other dateless schools:** `/school/cannon/`, `/school/covenant-day/` and
      `/school/gaston-day/` reach a dated newest-first list with no undated list first.
      Record the cold skeleton time for each. Covenant Day fetches about 37 articles, so
      it is the one to watch.
- [ ] **Regression, no publishedAt:** `/school/davidson-day/` and
      `/school/charlotte-christian/` render as on `main`.
- [ ] **Previews:** a `kudos/post` article (for example post 5084) returns a date and a
      genuine preview from `preview` and `publishedAt`. Those posts come from `fsBoard-40`,
      and have not yet been parsed in the section.
- [ ] Locale smoke test at `?lang=es`: the section renders, the chrome is translated, and
      headlines stay English by design.

## Risks

| Risk | Mitigation |
|---|---|
| Cold skeleton is longer: board plus about 8s of articles, on the first visit each 15 minutes | Measured and accepted in Decisions; record real times. Raising the Worker TTL is the follow-up, and needs the user's credential |
| Covenant Day's ~37 article fetches exceed 12s cold, giving a partly dated list | Unchanged from today's outcome, now with a short TTL. Report the cold result in the PR; a smaller pool is a separate decision |
| Finalsite `.fsGrid` class changes | Returns `[]`, which reaches the error state, as a redesign should |
| Board's near-chronological order stops holding | Dated rows still sort by real date; the flag only affects rows whose date failed. Pool has four spare rows |
| Top-of-grid fills with off-site posts | They are skipped before counting, so the pool stays 14 |
| Refactor changes behaviour for dated boards | The two regression scenarios above; keep their write order identical |

## Open questions

- If a cold Latin load feels too slow once rendered — **default:** ship the hold anyway,
  and report the measured time in the PR. The user asked for this to stop flipping, and
  the Worker TTL is the remedy.

## Implementation notes

- **Deviation: the short cache TTL is judged on the whole pool, not the visible ten.** As
  written, step 4 tested `merged.every(date)`. A fully cold Covenant Day run hit the 12s
  limit, lost its two newest stories (true lead Jul 23, shown lead May 12), and saved that
  ten-row, fully dated list for 30 minutes, because a story that has been cut is not in
  `merged`. `hydrateArticles` now returns `allDated`, computed over the pool. Re-tested by
  delaying those two articles past the limit: TTL 120000; healthy run: TTL 1800000.
- **`hydrateArticles` returns `{ merged, landed, allDated }`,** not `{ merged, datedCount }`.
  `landed` keeps the existing `onUpdate` rule for dated boards.
- **Measured cold skeleton times** (cache-busted board and articles): Latin 13.6s, Covenant
  Day 14.6s, Cannon 6.1s, Gaston Day 0.6s. Latin is longer than the ~8s the audit quoted,
  which covered articles only; the board is now one 1MB page.
- **Covenant Day's ~37 articles do not finish in 12s when cold,** so a fully cold visitor can
  see a list missing its newest stories for one load. This predates the change and the
  outcome is unchanged, except it now lasts 2 minutes rather than 30. Fixing it means a
  smaller pool or a longer Worker TTL, which this plan left out of scope.
- **The early stop has a visible cost:** with articles delayed 4s, one Latin row landed
  undated and in place. That list is cached for 2 minutes, so it heals.
