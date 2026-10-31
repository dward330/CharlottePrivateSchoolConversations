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

**The table claims the whole division.** Its heading says "every NCISAA 3A school", and
`check:cup` fails on a gap. So a school outside 4A brings every school in its division, for
every season it played there, into the brief, on or off the roster. A school that moved
class needs its rows in the other class too, or those cells read as an em dash rather than
"In 3A". Two rows elsewhere do not sum as published (2021–22 1A Victory Christian Center
and 2A Westminster Catawba Christian); copy them as published and record it.

If a newer season has been published, add it to the brief. It changes `CUP_SEASONS`, and so
every school's table.

### NCHSAA branch (Charlotte Catholic)

The public-school association is a different source, and the ledger holds only that
school's 2025–26 row.

- Fetch NCHSAA's final standings per season, with classification and place.
- A season that stays unverified is left out and shows an em dash, **never an estimate**.
- NCHSAA tables usually give no fall/winter/spring splits, so the bars and the best-season
  tile hide. That is expected.
- The rival rows have to be added too: `CUP_DIVISION_LEADERS` holds NCISAA divisions only.
- Confirm whether NCHSAA sanctions girls' wrestling separately. Its navigation lists only
  "Wrestling", so `CUP_SPORTS.NCHSAA` holds one `both` entry. Correct it if needed.

## Step 3 — Build the point sources

The `record` card covers only three seasons while the table covers six, so the card cannot
be the starting point. Start from
`https://archives.ncisaa.org/index.php?sport=<id>&years=<yyyy-yyyy>` (a bracket for each team
sport) and the school's own title list, then confirm each title or runner-up year against a
citable page. Every entry needs a sport key that exists in `CUP_SPORTS[association]` for
that season, or `npm run check:cup` fails.

Two archive traps: **2020–21 brackets are mirrored**, so read them by team name rather than
by side. And `ncisaa.shotstat.com` may not resolve, in which case golf rests on the school's
list.

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
  `leadRow` or `gapBehindFirst`, and `nearestRival`. The strings are `sports.cup.*` in
  `src/locales/en.json`.

Call out the never-won state (best-finish headline, gap row) and any "In 3A" cells where
they apply. Write that script to the scratchpad, not the repo.

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
- new `sports.cup.*` keys only if a sport or string is new.

No component changes are expected. **A needed one means the shared logic has a gap, so say
so** rather than special-casing the school. The plan is two-phase only if it adds a new
`sports.cup.*` string: source labels are skipped by i18n (`*.sources[].label`), so a
data-only school is single-phase.
