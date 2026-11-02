---
name: charlottechristiancup
title: Turn on the Wells Fargo Cup card for Charlotte Christian, and correct two facts in its Winning Record card
status: implemented
phases: 2
created: 2026-11-01
branch: feat/charlottechristiancup
prs: [398]
---

# Charlotte Christian Wells Fargo Cup card

## Goal

Charlotte Christian becomes the fifth school with the Wells Fargo Cup card, second in its Sports area. The card shows six seasons of official NCISAA results and four verified point sources, all computed from the shared ledger. The same pass corrects two facts in the Winning Record card: the 2026 boys basketball exit was the first round, and boys track tied for second in 2026.

## Context

- **The card is live** for Providence Day, Charlotte Latin, Charlotte Country Day and Cannon. A `cup` key in a school's module turns it on. The body is `WellsFargoCupBody` in `src/components/SportsProgram.tsx`, and everything it prints comes from `src/lib/wellsFargoCup.ts` reading `src/data/wellsFargoCup.ts`. `.claude/plans/cannoncup.md` is the closest precedent, and this plan has the same shape.
- **Charlotte Christian's rows are already in the ledger.** So is all of 4A. The ledger needs no edit.
- **It runs the never-won path, like Latin and Cannon.** `cupsWon` is 0, so the headline uses `sports.cup.headlineNever`, the subhead hides, the third tile uses `tileGap`, the bars use `raceResult`, and the table's summary row is `gapRow`.
- **Types:** `CupProgram` in `src/data/sportsProgram.ts`. Cannon's block in `src/data/sportsPrograms/cannon.ts` (from line 84) is the model. `CUP_BASE` and `ARCHIVE` are local to each file (cannon.ts lines 21–22).
- **Citation labels are English by design:** `*.sources[].label` is `false` in `PATH_OVERRIDES`, so `cup` adds no overlay entries.
- **The two wrong facts** are in `src/data/sportsPrograms/charlotte-christian.ts`. `record.rows[5].note` at line 141 says `Second-round exit in 2026 after a 10-win improvement`. The 2025–26 4A bracket has the school losing 51–49 to #1 Forsyth Country Day in its first column, and 4A's printed schedule has no second round. `record.rows[3].cells[2]` at line 121 is `{ result: 'NONE' }`, but the official 2026 team table has Charlotte Christian and Cary Academy both placed 2 on 87, behind Christ School on 116. Line 123 is that row's note.
- **`toVerify` is dev-only:** `SHOW_TO_VERIFY` hides it on production (`src/lib/toVerify.ts`), so clearing flags changes nothing a parent sees.
- **Which strings translate.** `cells[].result` and `cells[].record` are not prose (`scripts/i18n_fields.mjs`), so the cell edit needs no locale work. Both notes are prose, each one unit in every `src/data/overlays/work/sports.<lang>.json`: stamp `cf1e144c`, `at: ["charlotte-christian:record.rows[5].note"]`, and stamp `18c4fd9b`, `at: ["charlotte-christian:record.rows[3].note"]`. In these files the stamp is the unit's `of` field and the units are under `strings`.
- **Ingest:** the first `sports` rule in `RULES` (`src/lib/metrics.ts`) folds `wells fargo cup` headings, and `## Method` is dropped.

## Decisions

- **Ledger unchanged.** All 132 NCISAA rows, all 36 leaders and all 102 official 4A rows match, and no newer season is posted. So no `cup-finish` or `cup-titles` cell moves on Compare: Charlotte Christian stays `8th of 17` and `0`.
- **Headline stays as computed:** `Best finish: 5th in NCISAA 4A, 2023–24.` Peak score is a different season (377.5, 2024–25, 6th). No school-specific wording.
- **Four point sources**, under the bar the other four schools use: at least one title or at least two runner-up years. Order is most titles first, then runner-ups.
- **Wrestling is left off.** 2026 is its only runner-up year, so the bar excludes it, as it excluded Cannon's girls track 2026. This is the one drop that shows: wrestling's 2nd place likely accounts for all 45 of the school's 2025–26 winter points. See Open questions.
- **Football 2020 is `titleYears: [2020]`.** The final was played Nov. 20, 2020, so the calendar year of the event is 2020. It belongs to the 2020–21 Cup season.
- **Track 2026 goes in `runnerUpYears`** and shows `RUNNER-UP` on the Winning Record card. The tie is stated in that row's note, and the point source claims no point value.
- **The note replaces rather than adds to `Christ School took the 2026 D1 title`,** because a RUNNER-UP chip needs its tie explained, and the new sentence still names the winner.
- **Basketball note changes one word only.** No score or opponent is added, to keep the translation a one-word swap.
- **Seven `toVerify` flags are cleared** on `NONE` cells the source file confirms: Baseball `'23–24`, `'24–25`; Softball `'23–24`; Boys Track `'23–24`; Wrestling `'23–24`, `'24–25`; Boys Basketball `'23–24`.
- **Two-phase** only because of the two notes. The Cup block adds no translated text, and there are no new `sports.cup.*` keys.
- **Name:** `charlottechristiancup`, since `christiancup` would be ambiguous with Carmel Christian.

## Approvals needed

**None.** The card already exists, and adding a school to it is data only, needing no UX approval. The corrections change data behind existing cards. The user sees the corrected wording at the Phase 1 review.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/charlotte-christian/Charlotte Christian - Sports - Wells Fargo Cup Standings 2020-2026.md`: six seasons, the four point sources with evidence per year, what was dropped and why, the corrections, the title-total disagreement, reach limits and every URL.

## Out of scope

- **The state-title total.** The school's page says 42, the app says 43 (`offered.subhead`, `offered.stats`, `record.seasonDetail[0].text`), and the school's own year list totals 46. See Open questions.
- Any addition to Winning Record for titles outside its three-season window (football 2020, baseball 2021 and 2022, softball 2021 and 2022).
- Hank Suhr's `toVerify` on the coaching tenure row, which this research did not touch.
- `Charlotte Christian - Sports - Championships.pdf`, which is gitignored.
- Any other school's Cup card, any Compare row, any ledger edit, or a deploy.

## Steps

### Phase 1 — English

1. **Branch, correct the research note, ingest.** Create `feat/charlottechristiancup` from an up-to-date `main`. In `source-material/sports/charlotte-christian/Charlotte Christian - Sports - Redesign Research 2026.md`, in the "Three-season matrix" sentence, change `boys track **STATE 121 pts** in 2025` to `boys track **STATE 121 pts** in 2025 and **tied 2nd on 87** in 2026`. Do this before the ingest. Then follow the `ingest-source-material` skill for the `sports` topic only (`build_docs.py sports`, then `scripts/build_site_content.py`), and diff `src/data/schools.json` against `HEAD` so no other topic was swept in. Run `npm run check:metrics`; no new ⚠️ subtopic should appear.

2. **Add the `cup` block.** In `src/data/sportsPrograms/charlotte-christian.ts`, add below `CHAMPS_26`:
   ```ts
   const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
   const ARCHIVE = 'https://archives.ncisaa.org/index.php?sport='
   ```
   Then insert this between `offered` and `record`, with a `1b cup` banner matching Cannon's:
   ```ts
   cup: {
     pointSources: [
       { sport: 'baseball', gender: 'boys', season: 'spring', titleYears: [2021, 2022, 2026] },
       { sport: 'softball', gender: 'girls', season: 'spring', titleYears: [2021, 2022, 2025], runnerUpYears: [2023] },
       { sport: 'football11', gender: 'boys', season: 'fall', titleYears: [2020], runnerUpYears: [2022, 2025] },
       { sport: 'trackField', gender: 'boys', season: 'spring', titleYears: [2025], runnerUpYears: [2026] },
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
       { label: 'NCISAA baseball bracket, 2025–26', url: `${ARCHIVE}1&years=2025-2026` },
       { label: 'NCISAA softball bracket, 2024–25', url: `${ARCHIVE}21&years=2024-2025` },
       { label: 'NCISAA football bracket, 2025–26', url: `${ARCHIVE}31&years=2025-2026` },
       { label: 'NCISAA boys basketball bracket, 2025–26', url: `${ARCHIVE}13&years=2025-2026` },
       { label: 'NCISAA 2025 track Division I results', url: 'https://admin.ncisaa.org/uploads/Docs/NCISAA%20D1%20Final%20Results.pdf' },
       { label: 'NCISAA 2026 track Division I results', url: 'http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_1_Track_and_Field_Championships/' },
       { label: 'Charlotte Observer — 2020 football final', url: 'https://www.yahoo.com/news/dynasty-charlotte-christian-wins-4th-021432542.html' },
       { label: 'charlottechristian.com — Knights Accolades', url: ACCOLADES },
     ],
   },
   ```
   Re-letter the banners: `record` to `1c`, `pipeline` to `1d`, `honors` to `1e`, `coaching` to `1f`, `facilities` to `1g`, and the closing comment to `1h National Stage & NIL`. In the header comment, name the new source file for the Cup card and the record corrections, change "SIX of seven cards" to "SEVEN of eight cards", `(1g)` to `(1h)`, and "card 1d" in the closing comment to "card 1e".

3. **Correct the boys track row.** At `record.rows[3]`, change the third cell to `{ result: 'RUNNER-UP', record: '87 pts' }`, and the note to:
   ```ts
   note: 'Tied Cary Academy for second behind Christ School in 2026',
   ```

4. **Correct the boys basketball note.** At `record.rows[5]`, change `Second-round exit` to `First-round exit`. Nothing else in the string.

5. **Clear the seven `toVerify` flags** in `record.rows`, replacing each `{ result: 'NONE', toVerify: true }` with `{ result: 'NONE' }`: Baseball cells 0 and 1, Softball cell 0, Boys Track & Field cell 0, Wrestling cells 0 and 1, Boys Basketball cell 0. Confirm by grep that no `toVerify` remains in `record`. The coaching `toVerify` stays.

6. **Add a fixture.** In `scripts/check_cup_ledger.mjs`, after the `Cannon best finish` line (153), add:
   ```js
   eq('Charlotte Christian lead row', cup.leadRow('charlotte-christian'), [null, null, null, null, null, null])
   eq('Charlotte Christian gap row', cup.gapBehindFirst('charlotte-christian'), [332.5, 362.5, 477.5, 395, 272.5, 345])
   eq('Charlotte Christian best finish', [cup.headlineStats('charlotte-christian').bestFinish.place, cup.headlineStats('charlotte-christian').bestFinish.season], [5, '2023–24'])
   ```

7. **Regenerate and check.** Run `npm run schema` and `npm run check:schema`, `npm run check:cup`, then `npm run build`. Expect `check:live` to fail on the two edited notes only, until Phase 2. Anything else failing is a real failure. Run the rest of Phase 1 verification, stage explicit paths, commit, and set the index row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs until they confirm the English version.

### Phase 2 — Every other locale

Scope is the overlay layer only: two strings in each of the nine locales in `PROSE_TRANSLATED` (`es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`). No `src/locales/*.json` file changes, because every `sports.cup.*` key the card uses is already in all ten catalogs. Mechanism: `.claude/docs/prose-translation-architecture.md`.

1. **Update and splice by stamp.** In each `src/data/overlays/work/sports.<lang>.json`, update the unit stamped `cf1e144c` to the new English and its stamp, and edit its `t` by swapping that locale's "second round" for its "first round", keeping every other character. Update the unit stamped `18c4fd9b` to the new English and its stamp, and translate its `t` fresh, keeping `Christ School` and `Cary Academy` as Latin proper nouns and `2026` as is. Say "tied for second" in the locale's own words. Never re-extract the whole file.
2. **Build the overlays** per locale with `node scripts/i18n_build_overlay.mjs --topic sports --lang <code>`, then confirm `npm run check:live` is clean. `scripts/check_work_integrity.mjs` will report these two units, because it freezes existing ones. Diff against `HEAD` to confirm only the intended change moved.
3. **Finish.** Open the PR with `--body-file`, merge with `gh pr merge --squash --delete-branch`, check out `main` and pull, set the index row to `Implemented`, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `src/data/sportsPrograms/charlotte-christian.ts` | edit: `cup` block, two notes, one cell, seven flags, comments |
| `scripts/check_cup_ledger.mjs` | edit: fixture |
| `source-material/sports/charlotte-christian/Charlotte Christian - Sports - Redesign Research 2026.md` | edit: matrix sentence |
| `source-material/sports/charlotte-christian/Charlotte Christian - Sports - Wells Fargo Cup Standings 2020-2026.md` | new, already written |
| `src/data/schools.json`, `.claude/docs/*`, `src/content/*` | ingest output, sports only |
| `.claude/docs/DATA-SCHEMA.md` | regenerated, if its counts move |
| `src/data/overlays/work/sports.*.json`, `src/data/overlays/sports.*.json` | Phase 2: two strings per locale |
| `.claude/plans/charlottechristiancup.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:cup` passes, including the new fixture and the rule that every `pointSources` entry is a sport in `CUP_SPORTS`.
- [ ] `npm run check:metrics` passes with no new ⚠️ subtopic, and `npm run check:schema` passes.
- [ ] `npm run build` fails only at `check:live`, only on `charlotte-christian:record.rows[3].note` and `rows[5].note`.
- [ ] Browser check of `/school/charlotte-christian` with the Sports `<details>` open: the Cup card is second, after Sports Offered. Headline `Best finish: 5th in NCISAA 4A, 2023–24.`, also as the collapsed teaser. No subhead. Tiles `0 / 6`, `377.5` (2024–25), `−345` against Providence Day, `235` spring.
- [ ] Table: 19 rows with Charlotte Christian selected, eighth in order; newest column first. It reads 8th, 6th, 5th, 9th, 7th, 9th. The summary row is labelled `Points behind 1st` and reads `−345, −272.5, −395, −477.5, −362.5, −332.5`. Forsyth Country Day shows `In 3A` for its first four seasons, and Greensboro Day and Wake Christian for their last four.
- [ ] Bars heading reads `2025–26 · how the race finished`: Charlotte Christian 67.5 / 45 / 235, Providence Day 222.5 / 200 / 270. No comeback line.
- [ ] Four rows under Where Charlotte Christian's points come from, in the order of step 2; the matching sports are outlined, with boys track rather than girls and 11-man football rather than 8-man. Wrestling is not outlined.
- [ ] Winning Record: Boys Track shows Runner-up in 2025–26 with `87 pts` and the tie note, Boys Basketball reads `First-round exit`, and a production-mode render shows no change from clearing `toVerify`.
- [ ] Compare is unchanged: `8th of 17` and `0`.
- [ ] The PD, Latin, Country Day and Cannon cards are unchanged. Charlotte Catholic, Trinity and Charlotte Prep render no Cup card.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open. Build-gate exception as above.

### Phase 2 — Locales

- [ ] `npm run check:live` and `npm run check:runtime` pass, and `npm run build` is fully green.
- [ ] `npm run check:dates` passes, and `check:sepdrift` passes for each locale.
- [ ] Real-browser check of the open card in `es`, `fa`, `ar` and `hi`: `377.5`, `−345` and every season range read correctly, the never-won headline is translated, and both notes render translated in the Winning Record card. Assert chip classes as well as text on the Boys Track cell (see the `result-cell-compares-translated-value` memory).
- [ ] `npm run audit:daterender` reports no new English date.

## Risks

| Risk | Mitigation |
|---|---|
| A stale overlay silently renders English in Phase 2 | `check:live` names both notes until they resolve |
| A reach limit hides a golf or track runner-up | The source file lists the unread years; a later find adds a year without touching shared logic |
| Banner and comment re-lettering misses one | Cosmetic; grep `1g`, `1h` and `card 1d` after editing |

## Open questions

- **Should wrestling be listed despite the bar?** 2026 is its only runner-up year, yet it likely accounts for all of that season's 45 winter points. — **default:** left off, matching the other four schools. If the user wants it at the Phase 1 review, add `{ sport: 'wrestling', gender: 'boys', season: 'winter', titleYears: [], runnerUpYears: [2026] }` and the HighSchoolOT citation; no translation is affected.
- **What should the state-title total say?** The school's sentence says 42, the app says 43, and the school's listed years total 46 (baseball 18, football 9, basketball 7, track 4, softball 3, cross country 3, dance 2). — **default:** no change in this PR. A correction is a separate decision, because the school is the named authority and is inconsistent with itself.

## Implementation notes

Built as planned, with no change to any step. Both open questions took their defaults: wrestling stays off the point sources, and the state-title total is unchanged.

- Phase 2 ran in the same window as Phase 1, on the user's approval of the English.
- `check_work_integrity.mjs` reports 36 violations, all on the two edited units (4 per locale). The plan expected this, since the script freezes existing units.
- `check:money` flags two `SportsProgram.tsx` render sites, `{seasonsTotal}` and `{latestMargin.value}`. This PR does not touch that file, and the check is not in the build.
- `audit:mobile` ran on the Phase 1 build. Phase 2 only swapped two note strings.
