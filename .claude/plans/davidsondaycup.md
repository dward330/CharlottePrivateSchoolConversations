---
name: davidsondaycup
title: Turn on the Wells Fargo Cup card for Davidson Day, bring the rest of 2A and 3A into the ledger, and correct its Winning Record card against the NCISAA results
status: english-done
phases: 2
created: 2026-11-02
branch: feat/davidsondaycup
prs: []
---

# Davidson Day Wells Fargo Cup card

## Goal

Davidson Day becomes the eighth school with the Wells Fargo Cup card, second in its Sports area, with six seasons of official NCISAA results and ten verified point sources. It is the first card outside 4A and the first for a school that changed class (2A to 2023–24, then 3A), so the shared ledger gains 48 schools and 274 rows, and the high school master gains their homepages. The same pass corrects its Winning Record card, which says three three-peats ended and boys tennis won three straight. The association's results say one three-peat ended and boys tennis has won four straight.

## Context

- **The card is live** for Providence Day, Charlotte Latin, Charlotte Country Day, Cannon, Charlotte Christian, Covenant Day and Carmel Christian. A `cup` key in a school's module turns it on. The body is `WellsFargoCupBody` in `src/components/SportsProgram.tsx`, and everything it prints comes from `src/lib/wellsFargoCup.ts` reading `src/data/wellsFargoCup.ts`. `.claude/plans/carmelchristiancup.md` is the closest precedent for the card and the corrections. This plan adds the ledger and homepage work.
- **The existing ledger is correct.** All 132 NCISAA rows, all 36 leaders and `CUP_FIELD_SIZES` match the published tables, and no newer season is posted. So no `cup-finish` or `cup-titles` cell moves: Davidson Day stays `8th of 26`, `1` and `Top 3 in 4 of 6`.
- **`check:cup` forces the ledger work.** It fails a card whose division is incomplete, and the table heading says "every". Davidson Day's table is 53 rows: everyone in 2A in 2020–21 to 2023–24 and in 3A in 2024–25 and 2025–26. A school's other seasons need rows too, or a cell reads an em dash instead of `In 3A`. That is 12 rows in 1A, 156 in 2A and 106 in 3A.
- **No other card moves.** A simulated ledger with all 274 rows left `divisionRows` and `leadOverNext` byte-identical for all seven carded schools. No new school was ever in 4A. Gaston Day (2 to 37 rows) and Hickory Grove (5 to 27) have no card, and this work fills most of what theirs will need.
- **It runs the single-title path.** `cupsWon` is 1, so the headline is `sports.cup.headlineSingle`, naming 2A from `lastWin`. The subhead hides, because the latest season was not won. The third tile uses `tileGap`, and the bars use `raceResult`.
- **The class-mover paths already work and have never rendered.** `classLabel` gives `2A / 3A` for the tile and the table heading. `what2` reads the latest class, `3A`. `cell` compares each row with Davidson Day's class that season. All are fixture-tested; this is their first real page.
- **`nearestRival` needs the new rows.** Today it would miss Calvary Day, 7th, because `schoolAbove` reads only what the ledger holds. With the rows it returns `calvary-day`, printed through `CUP_SHORT_NAMES`.
- **The table scrolls.** `.cup-scroll` has `max-height: 365px`, and print removes it. Davidson Day sits eighth, so it opens in view.
- **Types:** `CupProgram` in `src/data/sportsProgram.ts`. `src/data/sportsPrograms/carmel-christian.ts` is the model for the block. A runner-up-only sport passes `titleYears: []`, as Covenant Day's boys soccer does.
- **Citation labels are English by design.** `*.sources[].label` is `false` in `PATH_OVERRIDES` (`scripts/i18n_fields.mjs`). `record.rows[].cells[].record` is not extracted either: `5–1 final` is not in any work file. School names on the table are not translated.
- **Which strings translate.** In `src/data/overlays/work/sports.<lang>.json`, units are under `strings`, and the stamp is the unit's `of` field. Six existing units change. No unit is added:

  | Stamp | Starts |
  |---|---|
  | `0fe60628` | `Boys tennis is the only title survivor` (`record.subhead`) |
  | `ff2ba8dd` | `Three straight; blanked` (`record.rows[0].note`) |
  | `e2bd755f` | `Lost the 2026 final 1–3` (`record.rows[1].note`) |
  | `2f2bd979` | `Three-peat broken; lost the quarterfinal` (`record.rows[3].note`) |
  | `50758933` | `Both squads won in 2023–24` (`record.rows[5].note`) |
  | `f3aca442` | `The decline. Three-peats ended` (`record.seasonDetail[2].text`) |

  `33a64a18`, `Three-peat broken; collapsed to a first-round exit`, is correct and stays.
- **Ingest:** the first `sports` rule in `RULES` (`src/lib/metrics.ts`) folds `wells fargo cup` headings, and `## Method` is dropped.

## Decisions

- **The whole division goes on the table, 53 rows.** That is the standing rule, the heading says "every", and it is what `check:cup` enforces. See Open questions.
- **A row with no published place stays out of the ledger.** Eleven rows are listed with a blank place and 0 points. `CupRecord.place` is a required number, and inventing one would break "copied as published". Those cells show an em dash, and a table with no such row needs no component change. Cristo Rey Research Triangle has no placed season, so it is not on the card. The source file records all eleven.
- **The Westminster Catawba 2021–22 row keeps its total and drops its splits.** It prints winter 22.5 and a total of 45. `check:cup` skips the sum on a row with no splits, and no card shows those splits. The published cells stay in the source file.
- **A closed school is exempt from the homepage rule.** Northside Christian closed in 2024 and has no URL on purpose. Its old domain now redirects to an unrelated business. The card already renders a name with no link. This is a shared-logic gap in `check:cup`, not a Davidson Day exception.
- **Ten point sources**, under the bar the other schools use: at least one title or at least two runner-up years. Most combined finishes first, then titles. Girls tennis has one runner-up year (2021), so it stays off.
- **The brackets and the term totals beat the school's own list** on boys soccer 2022, boys cross country 2022 and boys tennis 2026. The evidence is in the source file. The fall 2022 total is 110, which fits a 7th in cross country and a quarterfinal in soccer exactly.
- **Bracket record differences are left alone.** Volleyball and boys basketball differ by one game in places. The bracket may lag, so neither is shown wrong.
- **Dates on the card move to the event's year.** The volleyball final and both cross country meets were fall 2025.
- **Two-phase** because of the prose in `record`. The Cup block adds no translated text, and there are no new `sports.cup.*` keys.
- **Name:** `davidsondaycup`, matching `carmelchristiancup`.

## Approvals needed

**None.** The card already exists, and adding a school to it is data only. The corrections change data behind an existing card. The user sees all of it at the Phase 1 review.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/davidson-day/Davidson Day - Sports - Wells Fargo Cup Standings 2020-2026.md`: six seasons, ten point sources, the term-total proof, the disagreements, every URL, all 274 ledger rows, the eleven unplaced rows, and the 48 schools with their card names, master names and homepage status.

## Out of scope

- Cards for Gaston Day and Hickory Grove, and the 2A rows they would still need beyond this set.
- **A place for the unplaced rows.** It would mean a nullable `place` and a component change.
- **The `cup-finish` field-size check for 3A.** `check:cup` still compares only 4A, because 2A and 3A carry unplaced schools.
- The school's own history page, which we do not control. Its title list stays on the card's sources.
- Any Compare row, or a deploy.

## Steps

### Phase 1 — English

1. **Branch, correct the research notes, ingest.** Create `feat/davidsondaycup` from an up-to-date `main`. In `source-material/sports/davidson-day/Davidson Day - Sports - Redesign Research 2026.md`:
   - The `Boys Tennis` row near line 37: fill in `STATE (5–0 final)` for 2023–24 and `STATE (D2, 5–2 final)` for 2024–25.
   - Near line 52: replace `three separate three-peats ended in one year` with `girls soccer's three-peat and boys soccer's two-year title run ended in one year`.
   - Near line 63: note that the school's board also lists boys soccer 2022 and boys cross country 2022, which the NCISAA results do not support, and point to the new Wells Fargo Cup file.

   Then follow the `ingest-source-material` skill for the `sports` topic only (`build_docs.py sports`, then `scripts/build_site_content.py`), and diff `src/data/schools.json` against `HEAD` so no other topic was swept in. Restore any file whose only change is a date stamp. Run `npm run check:metrics`; no new ⚠️ subtopic should appear.

2. **Find the remaining homepages.** The source file's `### The off-roster schools on the table` lists 48 schools: 18 confirmed, 5 already in the master, 9 `to confirm` and 16 `unresolved`. For the 25 open ones, find the real homepage and fetch it, confirming the school's name and its location, as `High School Destinations.md` requires. Domain guesses went wrong four times in planning, and the table names each trap. Update the file's table with what you find. A school that has closed gets `status: 'closed'` and no URL, with a `note`. A school with no site you can confirm stays in the master without a URL, and you stop and report it, because `check:cup` will fail on it.

3. **Add the master records.** In `src/data/highSchools.ts`, under the existing Cup block near line 490, add each school with `kind: 'day'`, `url`, `city`, `state`, matching `'Cary Academy'`. Use `kind: 'independent'` only for a Charlotte-area school, as `'Metrolina Christian Academy'` does. Skip the five already there. Westminster Catawba's `state` is `SC`. In `High School Destinations.md`, add the same rows to `## Added for the Wells Fargo Cup table (2026-11-02)` and update its count. Run `npm run check:schoolurls`.

4. **Extend the ledger** in `src/data/wellsFargoCup.ts`. Use a throwaway script in the scratchpad that reads the source file's `## Wells Fargo Cup new division rows for the ledger` table and prints `CupRecord` literals, so no figure is retyped. A `T` place sets `tied: true`, and all rows are `isEstimate: false`.
   - Append the 274 rows at the end of `CUP_RECORDS`, under the comment `// The rest of 2A and 3A, for Davidson Day's table.`
   - Westminster Catawba 2021–22: omit `fall`, `winter` and `spring`, with the comment `// Published cells do not sum (winter 22.5, total 45), so the splits stay out.`
   - Add every school to `CUP_SHORT_NAMES` (card name) and `CUP_HIGH_SCHOOLS` (master name), from the source file's table.
   - Update the comment above `CUP_RECORDS`, which says "today that is all of 4A", to say all of 4A plus the 2A and 3A seasons of Davidson Day's table. In the file header, add that Davidson Day's source file carries the 2A and 3A rows.

5. **Teach `check:cup` the closed school, and add fixtures.** In `scripts/check_cup_ledger.mjs`:
   - Import `highSchoolFor` beside `highSchoolUrl`. Change the homepage rule so an off-roster name with a closed master record passes:
     ```js
     const closed = highSchoolFor(name ?? '')?.status === 'closed'
     if (!roster.has(slug) && !highSchoolUrl(name ?? '') && !closed) fail(`${slug}: off the roster with no homepage in highSchools.ts`)
     ```
   - After the `Carmel Christian best finish` line:
     ```js
     eq('Davidson Day lead over next', cup.leadOverNext('davidson-day'), [0, 42.5, 17.5, 125, 20, 2.5])
     eq('Davidson Day table', cup.divisionRows('davidson-day').length, 53)
     eq('Davidson Day classes', cup.classLabel('davidson-day'), '2A / 3A')
     eq('Davidson Day last win', cup.headlineStats('davidson-day').lastWin?.classification, '2A')
     ```
   - In the bars rival list, add `['davidson-day', 'Calvary Day'],`.

   Corrupt the new rule to confirm it bites: set Northside's `status` to something else, read that the message names `northside-christian`, then restore it and diff.

6. **Add the `cup` block.** In `src/data/sportsPrograms/davidson-day.ts`, add below `CHAMPS_26`:
   ```ts
   const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
   const ARCHIVE = 'https://archives.ncisaa.org/index.php?sport='
   const SWIM = 'https://admin.ncisaa.org/uploads/SWIMMING/'
   const XC = 'http://results.tfmeetpro.com/Mitchell_Timing/'
   ```
   Then insert this between `offered` and `record`, with a `1b cup` banner matching Carmel Christian's:
   ```ts
   cup: {
     pointSources: [
       { sport: 'volleyball', gender: 'girls', season: 'fall', titleYears: [2023, 2024], runnerUpYears: [2021, 2022, 2025] },
       { sport: 'tennis', gender: 'boys', season: 'spring', titleYears: [2023, 2024, 2025, 2026] },
       { sport: 'soccer', gender: 'girls', season: 'spring', titleYears: [2023, 2024, 2025], runnerUpYears: [2022] },
       { sport: 'crossCountry', gender: 'boys', season: 'fall', titleYears: [2020, 2021, 2023] },
       { sport: 'soccer', gender: 'boys', season: 'fall', titleYears: [2023, 2024] },
       { sport: 'lacrosse', gender: 'girls', season: 'spring', titleYears: [2022], runnerUpYears: [2026] },
       { sport: 'swimming', gender: 'boys', season: 'winter', titleYears: [], runnerUpYears: [2022, 2024] },
       { sport: 'crossCountry', gender: 'girls', season: 'fall', titleYears: [2023] },
       { sport: 'basketball', gender: 'boys', season: 'winter', titleYears: [2024] },
       { sport: 'basketball', gender: 'girls', season: 'winter', titleYears: [2021] },
     ],
     sources: [
       { label: 'NCISAA Wells Fargo Cup standings, 2025–26', url: `${CUP_BASE}current-champions/` },
       { label: 'NCISAA Wells Fargo Cup standings, 2024–25', url: `${CUP_BASE}past-champions-2024-2025/` },
       { label: 'NCISAA Wells Fargo Cup standings, 2023–24', url: `${CUP_BASE}pastchampions2023-2024/` },
       { label: 'NCISAA Wells Fargo Cup standings, 2022–23', url: `${CUP_BASE}past-champions/past-champions-2022-2023/` },
       { label: 'NCISAA Wells Fargo Cup standings, 2021–22', url: `${CUP_BASE}past-champions/past-champions-2021-2022/` },
       { label: 'NCISAA Wells Fargo Cup standings, 2020–21', url: `${CUP_BASE}past-champions/past-champions-2020-2021/` },
       { label: 'NCISAA Wells Fargo Cup scoring and history', url: `${CUP_BASE}history/` },
       { label: 'NCISAA sport list', url: 'https://www.ncisaa.org/sports/' },
       { label: 'NCISAA playoff results archive', url: 'https://archives.ncisaa.org/' },
       { label: 'NCISAA volleyball bracket, 2021–22', url: `${ARCHIVE}12&years=2021-2022` },
       { label: 'NCISAA volleyball bracket, 2022–23', url: `${ARCHIVE}12&years=2022-2023` },
       { label: 'NCISAA volleyball bracket, 2023–24', url: `${ARCHIVE}12&years=2023-2024` },
       { label: 'NCISAA volleyball bracket, 2024–25', url: `${ARCHIVE}12&years=2024-2025` },
       { label: 'NCISAA volleyball bracket, 2025–26', url: `${ARCHIVE}12&years=2025-2026` },
       { label: 'NCISAA boys tennis bracket, 2022–23', url: `${ARCHIVE}16&years=2022-2023` },
       { label: 'NCISAA boys tennis bracket, 2023–24', url: `${ARCHIVE}16&years=2023-2024` },
       { label: 'NCISAA boys tennis bracket, 2024–25', url: `${ARCHIVE}16&years=2024-2025` },
       { label: 'NCISAA boys tennis bracket, 2025–26', url: `${ARCHIVE}16&years=2025-2026` },
       { label: 'NCISAA girls soccer bracket, 2021–22', url: `${ARCHIVE}17&years=2021-2022` },
       { label: 'NCISAA girls soccer bracket, 2022–23', url: `${ARCHIVE}17&years=2022-2023` },
       { label: 'NCISAA girls soccer bracket, 2023–24', url: `${ARCHIVE}17&years=2023-2024` },
       { label: 'NCISAA girls soccer bracket, 2024–25', url: `${ARCHIVE}17&years=2024-2025` },
       { label: 'NCISAA boys soccer bracket, 2023–24', url: `${ARCHIVE}8&years=2023-2024` },
       { label: 'NCISAA boys soccer bracket, 2024–25', url: `${ARCHIVE}8&years=2024-2025` },
       { label: 'NCISAA girls lacrosse bracket, 2021–22', url: `${ARCHIVE}19&years=2021-2022` },
       { label: 'NCISAA girls lacrosse bracket, 2025–26', url: `${ARCHIVE}19&years=2025-2026` },
       { label: 'NCISAA boys basketball bracket, 2023–24', url: `${ARCHIVE}13&years=2023-2024` },
       { label: 'NCISAA girls basketball bracket, 2020–21', url: `${ARCHIVE}23&years=2020-2021` },
       { label: 'NCISAA cross country results, 2020', url: `${XC}NCISAA_XC_Championships_2020/` },
       { label: 'NCISAA cross country results, 2021', url: `${XC}NCISAA_XC_Championships_2021/` },
       { label: 'NCISAA cross country results, 2023', url: `${XC}NCISAA_Cross_Country_Championships_2023/` },
       { label: 'NCISAA swimming team scores, 2022', url: `${SWIM}Div%203%20Final_Team_Ind.pdf` },
       { label: 'NCISAA swimming results, 2024', url: `${SWIM}2024/2024%20NCISAA%20D3%20results.pdf` },
       { label: 'davidsonday.org — History & Achievements', url: HISTORY },
     ],
   },
   ```
   Re-letter the banners: `record` to `1c`, and each later card up one. In the header comment, change "FIVE of seven cards" to "SIX of eight cards", `1f Facilities` to `1g`, `1g National` to `1h`, and "carried on 1b" to `1c`. Add a line naming the new source file for the Cup card and the Winning Record corrections.

7. **Correct the Winning Record card** in the same file.
   - `record.subhead`:
     ```ts
     "Boys tennis is the only title survivor of 2025–26, its fourth straight; girls soccer's three-peat ended the same year.",
     ```
   - `record.rows[0].cells`: `{ result: 'STATE', record: '5–0 final' }`, `{ result: 'STATE', record: '5–2 final' }`, `{ result: 'STATE', record: '5–0 final' }`.
   - `record.rows[0].note`: `'Four straight, 2023–2026; blanked Cape Fear Academy in 2026'`
   - `record.rows[1].note`: `'Lost the 2025 final 1–3 to Wake Christian'`
   - `record.rows[3].note`: `'Two straight titles; lost the 2025 quarterfinal 2–3'`
   - `record.rows[5].note`: `'Both squads won in 2023–24; GRACE Christian took both in 2025'`
   - In `record.seasonDetail[2].text`, replace `Three-peats ended in girls soccer and boys soccer, volleyball lost the final,` with `Girls soccer's three-peat and boys soccer's two-year title run both ended, volleyball lost the final,`. Leave the rest.
   - Add to `record.sources`:
     ```ts
     { label: 'NCISAA boys tennis bracket, 2024–25', url: `${ARCHIVE}16&years=2024-2025` },
     { label: 'NCISAA boys soccer bracket, 2022–23', url: `${ARCHIVE}8&years=2022-2023` },
     { label: 'NCISAA boys soccer bracket, 2025–26', url: `${ARCHIVE}8&years=2025-2026` },
     { label: 'NCISAA volleyball bracket, 2025–26', url: `${ARCHIVE}12&years=2025-2026` },
     ```

8. **Record the new rules.** All three were found by this school, and the next 2A or 3A school needs them.
   - In `scripts/gen_data_schema.mjs`, at the "whole division" rule near line 446, add: `A row published with no place stays out of the ledger and shows an em dash, and a row that does not sum keeps its total and drops its splits.` At the homepage rule near line 466, add: `A closed school in the master passes with no link.`
   - In `.claude/skills/wells-fargo-cup/SKILL.md`, in Step 2's parsing traps, record the blank-place rule and the no-splits rule. In Step 3, record that **2021–22 brackets are mirrored in most sports too, a mirrored page prints no winner, and the fall/winter/spring totals settle it**, that swimming team scores are in the PDFs on `admin.ncisaa.org` and cross country in the timing pages the archive links, and that a school's own title list can be wrong as well as stale: Davidson Day's over-claims two titles and misses one. In Step 4, record that a school outside 4A brings dozens of homepages, and that guessed domains often belong to another school.
   - Update `.claude/SKILLS.md`'s `wells-fargo-cup` entry if its text says brackets are mirrored only in 2020–21, or describes the skill's traps in a way these change.

9. **Regenerate and check.** Run `npm run schema` and `npm run check:schema`, `npm run check:cup`, then `npm run build`. Expect `check:live` to fail on the six stamps in Context only, until Phase 2. Anything else failing is a real failure. Run the rest of Phase 1 verification, stage explicit paths, commit, and set the index row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs until they confirm the English version.

### Phase 2 — Every other locale

Scope is the overlay layer only: six strings in each of the nine locales in `PROSE_TRANSLATED` (`es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`). No `src/locales/*.json` file changes, because every `sports.cup.*` key the card uses is already in all ten catalogs. See `.claude/docs/prose-translation-architecture.md` for the mechanism and `src/data/overlays/NOTES.md` for dates and figures. Figures are copied char-for-char from the final English.

1. **Update by stamp.** Key everything by English text, never by index. For the six changed units, update the English and stamp, and edit `t` by the smallest change that matches the English edit, keeping every other character. Dates translate and their digits stay (`check:dates`). Diff each work file so only these units moved.
2. **Build the overlays** per locale with `node scripts/i18n_build_overlay.mjs --topic sports --lang <code>`, then confirm `npm run check:live` is clean. `scripts/check_work_integrity.mjs` will report these units, because it freezes existing ones. Confirm it names only these.
3. **Finish.** Open the PR with `--body-file`, merge with `gh pr merge --squash --delete-branch`, check out `main` and pull, set the index row to `Implemented`, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `src/data/wellsFargoCup.ts` | edit: 274 rows, names, comments |
| `src/data/highSchools.ts` | edit: 43 records |
| `src/data/sportsPrograms/davidson-day.ts` | edit: `cup` block, Winning Record corrections, comments |
| `scripts/check_cup_ledger.mjs` | edit: closed-school rule, fixtures |
| `scripts/gen_data_schema.mjs` | edit: two sentences |
| `.claude/skills/wells-fargo-cup/SKILL.md`, `.claude/SKILLS.md` | edit: new traps |
| `source-material/high-school-placement/_shared/High School Destinations.md` | edit: 43 rows |
| `source-material/sports/davidson-day/Davidson Day - Sports - Redesign Research 2026.md` | edit: corrections |
| `source-material/sports/davidson-day/Davidson Day - Sports - Wells Fargo Cup Standings 2020-2026.md` | new, already written; homepage table updated in step 2 |
| `src/data/schools.json`, `.claude/docs/*`, `src/content/*` | ingest output, sports only |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `src/data/overlays/work/sports.*.json`, `src/data/overlays/sports.*.json` | Phase 2: six strings per locale |
| `.claude/plans/davidsondaycup.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:cup` passes, including the new fixtures, and all seven earlier schools' `lead over next` fixtures pass unchanged.
- [ ] `npm run check:schoolurls`, `npm run check:metrics` and `npm run check:schema` pass, with no new ⚠️ subtopic.
- [ ] `npm run build` fails only at `check:live`, only on the six stamps in Context.
- [ ] Browser check of `/school/davidson-day` with the Sports `<details>` open: the Cup card is second, after Sports Offered. Headline `NCISAA 2A Wells Fargo Cup winner, 2023–24.`, also as the collapsed teaser. No subhead. `what2` says `NCISAA 3A`. Tiles `1 / 6` labelled `2A / 3A Cups won`, `497.5` (2023–24), `−182.5` behind Cape Fear Academy, and `140` spring.
- [ ] Table: heading `6 years · every NCISAA 2A / 3A school`, 53 rows, Davidson Day eighth and in view on load, newest column first: 8th, 2nd, 1st, 3rd, 3rd, 9th. The summary row reads 2.5, 20, 125, 17.5, 42.5, and `+0`. Cape Fear Academy and Asheville School show `In 3A` in 2023–24, Greensboro Day and Wake Christian show `In 4A` in 2020–21, Gaston Day shows `In 2A` in 2025–26, and Greenfield shows `In 1A` in 2020–21. Thales Apex shows an em dash in 2021–22. Salem Baptist is last or near it, with em dashes.
- [ ] Links: Gaston Day and Hickory Grove go to their pages with the brand edge. Northside Christian has no link. Open ten off-roster homepages at random, including Trinity Academy, Northwood Temple and Coastal Christian, and confirm each is that school.
- [ ] Bars heading reads `2025–26 · how the race finished`: Davidson Day 90 / 37.5 / 140, Calvary Day 85 / 87.5 / 110. No comeback line.
- [ ] Ten rows under the point-sources heading, volleyball first. Boys swimming shows runner-up years with no stray separator. Those sports are outlined on the sports grid.
- [ ] Winning Record: boys tennis reads `5–0 final`, `5–2 final`, `5–0 final` and `Four straight, 2023–2026`. `grep -n "three-peats\|Three straight" src/data/sportsPrograms/davidson-day.ts` finds nothing.
- [ ] Compare is unchanged: `8th of 26`, `1`, `Top 3 in 4 of 6`.
- [ ] The Cup cards of the other seven schools are unchanged. Gaston Day, Hickory Grove, Charlotte Catholic, Trinity and Charlotte Prep render no Cup card.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open. Build-gate exception as above. Print a page with the card open, and confirm all 53 rows print.

### Phase 2 — Locales

- [ ] `npm run check:live` and `npm run check:runtime` pass, and `npm run build` is fully green.
- [ ] `npm run check:dates` passes, and `check:sepdrift` passes for each locale.
- [ ] Real-browser check of the open card in `es`, `fa`, `ar` and `hi`: `497.5`, `−182.5`, every season range, `2A / 3A` and `In 3A` read correctly, the single-title headline is translated, and `2023–2026` and `1–3` keep their order in the RTL locales.
- [ ] `npm run audit:daterender` reports no new English date.

## Risks

| Risk | Mitigation |
|---|---|
| A guessed homepage belongs to another school | Step 2 fetches each, and the verification opens ten |
| A transcription slip in 274 rows | The rows are generated from the source file, and `check:cup` sums each one |
| The ledger growth moves another card | Simulated in planning, and the seven fixtures pin every carded school |
| A long table buries the lead row | `.cup-scroll` keeps its sticky header and summary; confirm both in the browser, on a phone too |
| The school disputes boys soccer or cross country 2022 | The bracket URLs are on the sources, and the source file holds the term-total proof |
| A stale overlay silently renders English in Phase 2 | `check:live` names each unit until it resolves |

## Open questions

- **Is 53 rows the right table?** It is 2.8 times any shipped table (19 rows), and most rows read `In 2A` or `In 3A` for part of the six seasons. **Default:** ship it, because the heading says "every" and the box scrolls. The alternative, showing only the school's current division, would drop the 2023–24 title field and needs a component change, so it would be a separate plan.
- **Should the headline say more than the 2A win?** The card leads with a 2023–24 title for a school now 8th in 3A. **Default:** leave as computed. The Winning Record card beside it carries the decline.
- **Is Cristo Rey's absence acceptable under "every"?** It has one listing, with no place and no points. **Default:** yes, recorded in the source file.

## Implementation notes

Phase 1 deviations:

- **The homepage table was wrong in more places than it listed.** Four domains marked "to confirm" (`oneal.org`, `burlingtonschool.org`, `cfschool.org`, `hpca.com`) are parked: each serves a one-line script that redirects to a GoDaddy sale page, which a curl reads as a 200. `calvarydayschool.com`, `theepiphanyschool.org` and `villagechristian.org` answered for other schools, and `tcsnc.org` is Transylvania County Schools. All 43 schools now have a page confirmed by name and location, so step 2 stopped on nothing.
- **Neuse Christian Academy is in Raleigh,** not New Bern. **Salem Baptist now calls itself Salem Christian School,** at `salemdefenders.org`. The card keeps the NCISAA's printed name, and the master record carries a note.
- **Two Thales rows link to campus directory pages,** because the network has no campus homepage. **Trinity Christian links to its parent, Trinity Community Services,** which is the site Wikipedia lists and which links the school.
- **Three schools are `kind: 'independent'`** under the Charlotte-area rule in step 3: Gaston Christian, Concord Academy and Westminster Catawba.
- **The `Davidson Day eighth and in view on load` check fails.** The 365px box shows six rows above the sticky summary row, and the lead row sits at 330–373px behind it. Context's "so it opens in view" was wrong. Any school placed about 7th or lower already opens this way, including the shipped Carmel Christian card, so this is not new. A fix touches every card, so it was left for the user's review.
- **`.claude/SKILLS.md` is unchanged.** Its entry says nothing about which brackets are mirrored.
- **`gen_data_schema.mjs` line numbers had moved,** and both sentences went in at the matching rules.

Four sites answer `ERR_HTTP2_PROTOCOL_ERROR` from this machine in curl and Chrome, including `wakechristianacademy.com`, which shipped earlier. `wccs.org`, `neusechristian.com` and `gracechristiansanford.com` were confirmed through WebFetch.
