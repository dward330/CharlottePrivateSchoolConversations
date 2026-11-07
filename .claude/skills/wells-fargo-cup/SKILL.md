---
name: wells-fargo-cup
description: >
  Add the next school to the Sports area's Wells Fargo Cup card. Asks which school if not
  given, re-verifies that school's rows in the shared ledger against the association's own
  published tables, builds its "where the points come from" list from citable pages, and
  reports a GO / NO-GO with the computed headline, four tiles and table rows the school
  would show. On a GO it saves the verified record to source-material and hands off to
  /plan. Use when the user types /wells-fargo-cup, or asks to "add the Wells Fargo Cup for
  <school>" or "add the next school to the Cup card". Providence Day is the shipped model.
  This skill writes ONLY source-material and the plan (via /plan), never app code.
---

# /wells-fargo-cup — from a school name to a Cup card plan

The repeatable version of what built Providence Day's card
(`.claude/plans/wellsfargocup.md`, 2026-10-31). The flow is **school → ledger re-verified
→ point sources confirmed → GO / NO-GO → source-material → `/plan` → `/implement`**.

The ledger (`src/data/wellsFargoCup.ts`) already holds rows for every covered school and the
whole 4A field, and the card computes everything from it. So a new school normally needs **data, not component
changes**: a `cup` block in its module, plus any ledger corrections this skill finds.

## Hard constraints

- **This skill writes no app code.** Its outputs are one
  `source-material/sports/<slug>/*.md` file and a `/plan` handoff.
- **Figures come only from the association's own published tables.** An AI research report
  is a lead to check, never a source. The report behind the original design matched 10 of
  60 official cells, and all ten were the most recent year: earlier seasons looked just as
  confident and were wrong.
- **Never type a computed figure.** Headlines, tiles and rows come from
  `src/lib/wellsFargoCup.ts`; run those functions rather than working one out.
- **Never write "recurring point source".** A sport appears only with a confirmed title or
  runner-up year.
- **No deploy.**

## Step 1 — Which school

If the user did not name one, ask. Then read `src/data/schools.json` and the school's
`src/data/sportsPrograms/<slug>.ts`, and **stop** on any of these:

- the school is K-8 (`hasHighSchool: false`), because a K-8 school has no Cup;
- the school already has a `cup` block;
- the school is not in `src/data/schools.json` (run `/add-school` first).

## Step 2 — Re-verify the ledger

The tables are plain HTML, so `curl` with a browser user agent works. Fetch **every
season**, then compare that school's `CUP_RECORDS` rows and the leaders
(`CUP_DIVISION_LEADERS`) of each division it played in.

**URL traps** (under `https://www.ncisaa.org/recognition/wells-fargo-cup/`):

| Season | Path |
|---|---|
| 2025–26 | `current-champions/` |
| 2024–25 | `past-champions-2024-2025/` |
| 2023–24 | `pastchampions2023-2024/` |
| Older | `past-champions/past-champions-2022-2023/`, and the same shape for earlier years |

`current-champions/` moves on when a new season posts, so a season that has rolled off it
needs its new path found from the site's navigation.

**Parsing traps:**

- The 2020–21 and 2021–22 tables have **no class headings**. They run 1A, 2A, 3A, 4A in
  order, so split on where the place numbering restarts.
- A blank cell means 0.
- Places are copied **as published**, even when out of order. Two are already known: in
  2022–23 4A, Carmel Christian is 14th with 142.5, below Wesleyan's 14th with 147.5, and
  2024–25 3A runs T7, T7, 8 with Hickory Grove at 12.
- A `T` place is a tie: `tied: true`.
- Assert fall + winter + spring equals the total on every row you read. If it does not,
  you have misread the table.
- **A row published with a blank place stays out of the ledger.** `CupRecord.place` is a
  required number, so inventing one would break "copied as published". The cell shows an em
  dash, and the source file lists each such row. A school with no placed season is not on
  the card.

**The table claims the whole division.** Its heading says "every NCISAA 3A school", and
`check:cup` fails on a gap. So a school outside 4A brings every school in its division, for
every season it played there, into the brief, on or off the roster. A school that moved
class needs its rows in the other class too, or those cells read as an em dash rather than
"In 3A". Two rows elsewhere do not sum as published (2021–22 1A Victory Christian Center
and 2A Westminster Catawba Christian). Such a row keeps its total and drops its splits, and
the source file records the published cells.

**A school outside 4A whose division is already in the ledger may need only a row or two,**
because a school that moved class left that division short. Gaston Day needed one row,
Berean Baptist's 2024–25, since Davidson Day had moved to 3A by then.

If a newer season has been published, add it to the brief. It changes `CUP_SEASONS`, and so
every school's table. It also moves `CUP_FIELD_SIZES` and every `cup-finish`, `cup-titles` and `cup-best`
cell in `src/data/metricValues.ts`, including the row labels, and `check:cup` fails until
they match.

### NCHSAA branch (Charlotte Catholic)

The public-school association is a different source. The ledger holds all six Charlotte
Catholic seasons, so a later NCHSAA school starts from the same pages:

| Season | Final standings |
|---|---|
| 2020–21 | `https://www.nchsaa.org/2020-2021-wells-fargo-state-cup-winners-recognized/` |
| 2021–22 | `https://www.nchsaa.org/wells-fargo-state-cup-competition-winners-2021-22-announced/` |
| 2022–23 | `https://www.nchsaa.org/nchsaa-announces-2022-2023-wells-fargo-cup-and-conference-cup-champions/` |
| 2023–24 | `https://www.nchsaa.org/2023-24-wells-fargo-cup-winners/` |
| 2024–25 | `https://www.nchsaa.org/wells-fargo-state-cup-standings-update-2/` |
| 2025–26 | `https://www.nchsaa.org/2025-2026-wells-fargo-cup-champions/` |

- **Only the top is published:** the top 10 per class, and the top 5 in 2025–26. No page holds
  a whole division, so the table says "top finishers, as published" and a dash means not
  listed. Never chase a full field or invent one.
- **There are no splits.** No final season has fall, winter or spring totals, so the bars and
  the best-season tile hide. That is expected.
- **Points can change after announcement, and a dated page can carry later figures.** The
  2024–25 page is dated March 2025 and prints the August correction. Check a second report
  and record any disagreement in the source file.
- **A season that stays unverified is left out** and shows an em dash, **never an estimate**.
- **The sport evidence** lives in `https://www.nchsaa.org/record-books/`, whose record-book
  pages are HTML tables, in per-sport PDFs, and in the site's search API
  (`https://www.nchsaa.org/wp-json/wp/v2/`).
- **A recap can omit a runner-up** that the meet's own team rankings show, so read the
  rankings before dropping a year.
- **The wrestling question is answered.** The association runs men's and women's individual
  championships under one Wrestling entry, so `CUP_SPORTS.NCHSAA` keeps one `both` chip.
- **Division leaders are added with the card.** `CUP_DIVISION_LEADERS` holds each division a
  card shows, so a new NCHSAA division brings its places 1 and 2.

## Step 3 — Build the point sources

The `record` card covers only three seasons while the table covers six, so the card cannot
be the starting point. Start from
`https://archives.ncisaa.org/index.php?sport=<id>&years=<yyyy-yyyy>` (a bracket for each team
sport) and the school's own title list, then confirm each title or runner-up year against a
citable page. Every entry needs a sport key that exists in `CUP_SPORTS[association]` for
that season, or `npm run check:cup` fails.

Archive traps:

- **2020–21 brackets are mirrored, and so are 2021–22 brackets in most sports**, so read them
  by team name rather than by side. A mirrored page prints the two finalists and the score but
  no winner. The published fall, winter and spring totals settle it: a scored finish must fit
  them.
- **Swimming team scores are in the PDFs on `admin.ncisaa.org`**, and cross country is in the
  timing pages the archive links, not in brackets.
- **`ncisaa.shotstat.com` may not resolve**, in which case golf rests on the school's list.
- **A school's own title list can be wrong as well as stale.** Davidson Day's over-claims two
  titles (boys soccer 2022, boys cross country 2022) and misses one (boys tennis 2026). The
  brackets and the term totals win.
- **A bracket prints each team's record by round, so the winner's record rises by one after
  the final.** That names the winner on most mirrored pages.
- **An earlier research pass or a news round-up can undercount as badly as a school's list
  over-claims.** Gaston Day's eight titles were 14. Fit every term total before trusting a
  count.
- **Where a golf or track result rests on press, the term total must fit it exactly.**
- **A bracket loser earns the average of the places its round shares,** so a quarterfinal loser
  is 22.5 in an eight-team bracket, 25 in seven and 27.5 in six. That matters in football,
  whose brackets vary in size, when fitting a term total.
- **A school's title list can stop early as well as over-claim.** Hickory Grove's omits
  softball's 2022 and 2023 finals and its 2025 boys track team title.

Years are calendar years of the event, not season labels: a fall 2025 title is `2025`.

Drop anything unconfirmed. A list of zero is valid and omits that panel, and the "Outlined"
sentence with it.

## Step 4 — Report GO / NO-GO

**GO needs at least one verified season for the school.** Print, so the user sees the
result before any build:

- verified seasons, and any ledger corrections found;
- the point sources kept, and the ones dropped with the reason;
- what the school would show, computed by a throwaway Node script importing
  `src/lib/wellsFargoCup.ts`: `headlineStats`, `divisionRows`, `cell` per season,
  `leadOverNext`, and `nearestRival`. The strings are `sports.cup.*` in
  `src/locales/en.json`.

Call out the never-won state (best-finish headline) and any "In 3A" cells where
they apply. Write that script to the scratchpad, not the repo.

**A school outside 4A brings dozens of homepages** into the master, one per off-roster school
on its table. Guessed domains often belong to another school, and an HTTP 200 proves nothing:
Davidson Day's table hit four parked domains that redirect by script, and four sites that were
some other school entirely. Load each page in a browser and confirm the name and the location.

## Step 5 — Persist on a GO

Save `source-material/sports/<slug>/<School> - Sports - Wells Fargo Cup Standings 2020-2026.md`,
copying the shape of Providence Day's file:

- a `## Method` section with the retrieval date, every URL, and any disagreement with an
  earlier source;
- **every other `##` heading contains "Wells Fargo Cup"**, which folds it onto the sports
  research key rather than slugifying into a new card.

Leave it uningested. `/implement` runs the ingest on a branch.

## Step 6 — Hand off to `/plan`

Invoke `/plan` with the name `<slug>cup` and this scope:

- ledger corrections, if any, and the rest of the school's division;
- the `cup` block in `src/data/sportsPrograms/<slug>.ts`;
- any `cup-finish`, `cup-titles` or `cup-best` cells on Compare that a ledger change moves;
- new `sports.cup.*` keys only if a sport or string is new.

No component changes are expected. **A needed one means the shared logic has a gap, so say
so** rather than special-casing the school. The plan is two-phase only if it adds a new
`sports.cup.*` string: source labels are skipped by i18n (`*.sources[].label`), so a
data-only school is single-phase.
