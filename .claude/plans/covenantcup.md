---
name: covenantcup
title: Turn on the Wells Fargo Cup card for Covenant Day, and correct its field hockey 2025 result in the Winning Record card
status: english-done
phases: 2
created: 2026-11-02
branch: feat/covenantcup
prs: []
---

# Covenant Day Wells Fargo Cup card

## Goal

Covenant Day becomes the sixth school with the Wells Fargo Cup card, second in its Sports area. The card shows six seasons of official NCISAA results and two verified point sources, all computed from the shared ledger. The same pass corrects one fact in the Winning Record card: field hockey's 2025 overtime loss to Providence Day was a state quarterfinal, not a semifinal.

## Context

- **The card is live** for Providence Day, Charlotte Latin, Charlotte Country Day, Cannon and Charlotte Christian. A `cup` key in a school's module turns it on. The body is `WellsFargoCupBody` in `src/components/SportsProgram.tsx`, and everything it prints comes from `src/lib/wellsFargoCup.ts` reading `src/data/wellsFargoCup.ts`. `.claude/plans/charlottechristiancup.md` is the closest precedent, and this plan has the same shape.
- **Covenant Day's rows are already in the ledger**, and so is all of 4A. The ledger needs no edit.
- **It runs the never-won path, like Latin, Cannon and Charlotte Christian.** `cupsWon` is 0, so the headline uses `sports.cup.headlineNever`, the subhead hides, the third tile uses `tileGap`, and the bars use `raceResult`. The table's summary row is `sports.cup.nextRow`, added by #400.
- **Types:** `CupProgram` in `src/data/sportsProgram.ts`. The block in `src/data/sportsPrograms/charlotte-christian.ts` (constants at lines 22–23, `sources` from line 95) is the model.
- **Citation labels are English by design:** `*.sources[].label` is `false` in `PATH_OVERRIDES` (`scripts/i18n_fields.mjs`), so `cup` adds no overlay entries.
- **The wrong fact** is in `src/data/sportsPrograms/covenant-day.ts`: `record.rows[2].cells[2]` at line 122 is `{ result: 'SEMIFINAL', record: '#6 seed' }`, and line 124 is that row's note. The NCISAA bracket has #3 Providence Day beating #6 Covenant Day 2–1 (OT) in the October 17 round, and Providence Day then played the semifinal on October 21. The Cup total agrees: 2025–26 fall is 67.5, which is 45 for boys soccer's runner-up plus 22.5 for a quarterfinal exit. A semifinal exit would pay 37.5 and give 82.5.
- **`TitleResult` has no quarterfinal value** (`src/data/sportsProgram.ts`). `NONE` renders an em dash and shows no `record` (`ResultCell`, `SportsProgram.tsx` line 528), so the cell drops `#6 seed`.
- **Where the claim also lives:** `Covenant Day School - Sports - Championships.md` line 37 and `Covenant Day School - Sports - Win-Loss Records.md` line 30. Both reach the app through ingest. `Redesign Research 2026.md` has no semifinal or field-hockey-overtime claim.
- **Which strings translate.** `cells[].result` and `cells[].record` are not prose, so the cell edit needs no locale work. The note is prose, one unit in every `src/data/overlays/work/sports.<lang>.json`: stamp `e6015c37`, `at: ["covenant-day:record.rows[2].note"]`. In these files the stamp is the unit's `of` field and the units are under `strings`.
- **Ingest:** the first `sports` rule in `RULES` (`src/lib/metrics.ts`) folds `wells fargo cup` headings, and `## Method` is dropped.

## Decisions

- **Ledger unchanged.** All 132 NCISAA rows, all 36 leaders and all 102 official 4A rows match, and no newer season is posted. So no `cup-finish` or `cup-titles` cell moves on Compare: Covenant Day stays `15th of 17` and `0`.
- **Headline stays as computed:** `Best finish: 8th in NCISAA 4A, 2022–23.` Peak score, 322.5, is the same season. No school-specific wording.
- **Two point sources**, under the bar the other five schools use: at least one title or at least two runner-up years. Order is most titles first, then runner-ups.
- **Field hockey 2022 and football 2022 are left off.** Each has one runner-up year, so the bar excludes them, as it excluded Charlotte Christian's wrestling 2026. See Open questions.
- **The association's bracket beats the school's article on field hockey.** The school's 2025 Fall Sports Highlights say "semifinals". The bracket and the published Cup total both say quarterfinal, and the disagreement is recorded in the new source file. The user sees this at the Phase 1 review.
- **The field hockey row stays in the matrix**, with three em dashes, because its note carries the 2022 runner-up and the overtime game. Removing a row is a UX change this plan does not need.
- **The note changes one word:** `semifinal` to `quarterfinal`. No score is added, to keep the translation a one-word swap.
- **`record.seasonDetail` is left alone.** Its "Neither reached the semifinal" sentence is about boys basketball and baseball, and it is still true of both.
- **Two-phase** only because of the one note. The Cup block adds no translated text, and there are no new `sports.cup.*` keys.
- **Name:** `covenantcup`, matching `cannoncup` and `latincup`.

## Approvals needed

**None.** The card already exists, and adding a school to it is data only, needing no UX approval. The correction changes data behind an existing card. The user sees the corrected wording at the Phase 1 review.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/covenant-day/Covenant Day School - Sports - Wells Fargo Cup Standings 2020-2026.md`: six seasons, the two point sources with evidence, what was dropped and why, the correction, the recorded disagreements, reach limits with the term-total proof that closes them, and every URL.

## Out of scope

- **Volleyball's three straight runner-up finishes** (`record.didNotWin`, coaching card line 325). 2015 is confirmed from the archive, the other two years predate what it serves, and none falls inside the Cup window.
- **The school's "first team state title since 2017" and "26 championship appearances"** claims, which this research did not test beyond the six seasons.
- **Baseball's record.** The bracket prints `12-4`, the school says 12–14, and the card stays 12–14.
- Any other school's Cup card, any Compare row, any ledger edit, or a deploy.

## Steps

### Phase 1 — English

1. **Branch, correct the research notes, ingest.** Create `feat/covenantcup` from an up-to-date `main`. Do these two edits before the ingest:
   - In `source-material/sports/covenant-day/Covenant Day School - Sports - Championships.md` line 37, change `2025 season reached the NCISAA semifinals, taking Providence` / `Day to overtime.` to `2025 season reached the NCISAA quarterfinals, taking Providence` / `Day to overtime.`
   - In `source-material/sports/covenant-day/Covenant Day School - Sports - Win-Loss Records.md` line 30, change `in the state semifinals` to `in the state quarterfinals`.

   Then follow the `ingest-source-material` skill for the `sports` topic only (`build_docs.py sports`, then `scripts/build_site_content.py`), and diff `src/data/schools.json` against `HEAD` so no other topic was swept in. Run `npm run check:metrics`; no new ⚠️ subtopic should appear.

2. **Add the `cup` block.** In `src/data/sportsPrograms/covenant-day.ts`, add below `CHAMPS_26`:
   ```ts
   const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
   const ARCHIVE = 'https://archives.ncisaa.org/index.php?sport='
   ```
   Then insert this between `offered` and `record`, with a `1b cup` banner matching Charlotte Christian's:
   ```ts
   cup: {
     pointSources: [
       { sport: 'softball', gender: 'girls', season: 'spring', titleYears: [2026] },
       { sport: 'soccer', gender: 'boys', season: 'fall', titleYears: [], runnerUpYears: [2024, 2025] },
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
       { label: 'NCISAA softball bracket, 2025–26', url: `${ARCHIVE}21&years=2025-2026` },
       { label: 'NCISAA boys soccer bracket, 2025–26', url: `${ARCHIVE}8&years=2025-2026` },
       { label: 'NCISAA boys soccer bracket, 2024–25', url: `${ARCHIVE}8&years=2024-2025` },
     ],
   },
   ```
   Re-letter the banners: `record` to `1c`, `pipeline` to `1d`, `honors` to `1e`, `coaching` to `1f`, `facilities` to `1g`, and the closing comment to `1h National Stage & NIL`. In the header comment, name the new source file for the Cup card and the field hockey correction, change "SIX of seven cards" to "SEVEN of eight cards", "1g National Stage" to "1h National Stage", and "carried on 1b and 1d" to "carried on 1c and 1e". Keep "Davidson Day's omitted 1g", which refers to that school's own lettering. In the closing comment, change "carried on 1b" to "carried on 1c".

3. **Correct the field hockey row.** At `record.rows[2]`, change the third cell to `{ result: 'NONE' }`, and the note to:
   ```ts
   note: 'Took Providence Day to overtime in the state quarterfinal; state runner-up in 2022',
   ```
   Add to `record.sources`, after the `HighSchoolOT` entry:
   ```ts
   { label: 'NCISAA field hockey bracket, 2025–26', url: `${ARCHIVE}9&years=2025-2026` },
   ```

4. **Add a fixture.** In `scripts/check_cup_ledger.mjs`, after the `Charlotte Christian best finish` line, add:
   ```js
   eq('Covenant Day lead over next', cup.leadOverNext('covenant-day'), [17.5, 2.5, 17.5, 12.5, 50, 25])
   eq('Covenant Day best finish', [cup.headlineStats('covenant-day').bestFinish.place, cup.headlineStats('covenant-day').bestFinish.season], [8, '2022–23'])
   ```

5. **Regenerate and check.** Run `npm run schema` and `npm run check:schema`, `npm run check:cup`, then `npm run build`. Expect `check:live` to fail on `covenant-day:record.rows[2].note` only, until Phase 2. Anything else failing is a real failure. Run the rest of Phase 1 verification, stage explicit paths, commit, and set the index row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs until they confirm the English version.

### Phase 2 — Every other locale

Scope is the overlay layer only: one string in each of the nine locales in `PROSE_TRANSLATED` (`es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`). No `src/locales/*.json` file changes, because every `sports.cup.*` key the card uses is already in all ten catalogs. Mechanism: `.claude/docs/prose-translation-architecture.md`.

1. **Update and splice by stamp.** In each `src/data/overlays/work/sports.<lang>.json`, update the unit stamped `e6015c37` to the new English and its stamp, and edit its `t` by swapping that locale's "semifinal" for its "quarterfinal", keeping every other character. Never re-extract the whole file.
2. **Build the overlays** per locale with `node scripts/i18n_build_overlay.mjs --topic sports --lang <code>`, then confirm `npm run check:live` is clean. `scripts/check_work_integrity.mjs` will report this one unit, because it freezes existing ones. Diff against `HEAD` to confirm only the intended change moved.
3. **Finish.** Open the PR with `--body-file`, merge with `gh pr merge --squash --delete-branch`, check out `main` and pull, set the index row to `Implemented`, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `src/data/sportsPrograms/covenant-day.ts` | edit: `cup` block, one note, one cell, one source, comments |
| `scripts/check_cup_ledger.mjs` | edit: fixture |
| `source-material/sports/covenant-day/Covenant Day School - Sports - Championships.md` | edit: one word |
| `source-material/sports/covenant-day/Covenant Day School - Sports - Win-Loss Records.md` | edit: one word |
| `source-material/sports/covenant-day/Covenant Day School - Sports - Wells Fargo Cup Standings 2020-2026.md` | new, already written |
| `src/data/schools.json`, `.claude/docs/*`, `src/content/*` | ingest output, sports only |
| `.claude/docs/DATA-SCHEMA.md` | regenerated, if its counts move |
| `src/data/overlays/work/sports.*.json`, `src/data/overlays/sports.*.json` | Phase 2: one string per locale |
| `.claude/plans/covenantcup.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:cup` passes, including the new fixture and the rule that every `pointSources` entry is a sport in `CUP_SPORTS`.
- [ ] `npm run check:metrics` passes with no new ⚠️ subtopic, and `npm run check:schema` passes.
- [ ] `npm run build` fails only at `check:live`, only on `covenant-day:record.rows[2].note`.
- [ ] Browser check of `/school/covenant-day` with the Sports `<details>` open: the Cup card is second, after Sports Offered. Headline `Best finish: 8th in NCISAA 4A, 2022–23.`, also as the collapsed teaser. No subhead. Tiles `0 / 6`, `322.5` (2022–23), `−507.5` against Providence Day, `117.5` spring.
- [ ] Table: 19 rows with Covenant Day selected, fifteenth in order; newest column first. It reads 15th, 10th, 10th, 8th, 11th, 14th. The summary row reads `Covenant Day lead over next-placed school` with 25, 50, 12.5, 17.5, 2.5, 17.5. Forsyth Country Day shows `In 3A` for its first four seasons, and Greensboro Day and Wake Christian for their last four.
- [ ] Bars heading reads `2025–26 · how the race finished`: Covenant Day 67.5 / 0 / 117.5, Ravenscroft 85 / 55 / 52.5. No comeback line. (Providence Day until the Phase 1 review; see Implementation notes.)
- [ ] Two rows under the point-sources heading, softball then boys soccer; girls softball and boys soccer are outlined on the sports grid, with girls soccer not outlined.
- [ ] Winning Record: the Field Hockey row shows three em dashes and the note says `state quarterfinal`. Softball and Boys Soccer are unchanged.
- [ ] Compare is unchanged: `15th of 17` and `0`.
- [ ] The cards of the other five schools are unchanged. Charlotte Catholic, Trinity and Charlotte Prep render no Cup card.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open. Build-gate exception as above.

### Phase 2 — Locales

- [ ] `npm run check:live` and `npm run check:runtime` pass, and `npm run build` is fully green.
- [ ] `npm run check:dates` passes, and `check:sepdrift` passes for each locale.
- [ ] Real-browser check of the open card in `es`, `fa`, `ar` and `hi`: `322.5`, `−507.5` and every season range read correctly, the never-won headline is translated, and the note renders translated in the Winning Record card.
- [ ] `npm run audit:daterender` reports no new English date.

## Risks

| Risk | Mitigation |
|---|---|
| A stale overlay silently renders English in Phase 2 | `check:live` names the note until it resolves |
| The school disputes the quarterfinal reading | The bracket URL is on the card's sources, and the source file holds the term-total proof |
| Banner and comment re-lettering misses one | Cosmetic; grep `1b`, `1g` and `1d` after editing |

## Open questions

- **Should field hockey 2022 and football 2022 be listed despite the bar?** Each has one runner-up year, and together they are 90 of the 205 fall points in 2022–23, the school's best Cup season. — **default:** left off, matching the other five schools. If the user wants them at the Phase 1 review, add `{ sport: 'fieldHockey', gender: 'girls', season: 'fall', titleYears: [], runnerUpYears: [2022] }` and `{ sport: 'football11', gender: 'boys', season: 'fall', titleYears: [], runnerUpYears: [2022] }`, with bracket citations `${ARCHIVE}9&years=2022-2023` and `${ARCHIVE}31&years=2022-2023`. No translation is affected.

## Implementation notes

- **Race bars changed at the Phase 1 review, for all six schools.** The user asked that "how the race finished" compare a school with the one that finished right above it, or with 2nd place if it won, rather than with the winner. `nearestRival` in `src/lib/wellsFargoCup.ts` now does this, passing over a tie and a skipped place, and reading the leaders table for an off-roster school. Charlotte Country Day now compares with Charlotte Latin, Cannon with Durham Academy, Charlotte Christian with Cary Academy, and Covenant Day with Ravenscroft. Providence Day and Charlotte Latin are unchanged, and so is the comeback line.
- **The third tile still reads the winner.** `seasonRival` stays, because the request named only the race section, so `tileGap` still says `gap behind Providence Day`.
- No string changed, so this adds no locale work.
- Ingest changed only a date stamp on 11 other schools' sports notes, so those files were restored rather than committed.
