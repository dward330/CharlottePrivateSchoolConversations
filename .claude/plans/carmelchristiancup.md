---
name: carmelchristiancup
title: Turn on the Wells Fargo Cup card for Carmel Christian, correct its Winning Record card against the NCISAA brackets, and fix one published-place gap in leadOverNext
status: english-done
phases: 2
created: 2026-11-02
branch: feat/carmelchristiancup
prs: []
---

# Carmel Christian Wells Fargo Cup card

## Goal

Carmel Christian becomes the seventh school with the Wells Fargo Cup card, second in its Sports area, with six seasons of official NCISAA results and three verified point sources. The same pass corrects its Winning Record card, which missed the 2025 boys tennis state title and the 2021 basketball final, and which has the 2026 girls soccer final score wrong. That score is also wrong on Providence Day's card, and is fixed there too. One shared-logic gap in `leadOverNext` is closed, so Carmel's 2022–23 lead cell shows a number.

## Context

- **The card is live** for Providence Day, Charlotte Latin, Charlotte Country Day, Cannon, Charlotte Christian and Covenant Day. A `cup` key in a school's module turns it on. The body is `WellsFargoCupBody` in `src/components/SportsProgram.tsx`, and everything it prints comes from `src/lib/wellsFargoCup.ts` reading `src/data/wellsFargoCup.ts`. `.claude/plans/covenantcup.md` is the closest precedent, and this plan has the same shape.
- **Carmel's rows are already in the ledger**, and so is all of 4A. The ledger needs no edit: all 132 NCISAA rows, all 36 leaders and all 102 official 4A rows match the published tables, `CUP_FIELD_SIZES` matches, and no newer season is posted. So no `cup-finish` or `cup-titles` cell moves on Compare: Carmel stays `16th of 17` and `0`.
- **It runs the never-won path**, like Latin, Cannon, Charlotte Christian and Covenant Day. `cupsWon` is 0, so the headline uses `sports.cup.headlineNever`, the subhead hides, the third tile uses `tileGap`, and the bars use `raceResult`.
- **Types:** `CupProgram` in `src/data/sportsProgram.ts`. The block in `src/data/sportsPrograms/covenant-day.ts` (`CUP_BASE` at line 32, `cup` from line 96) is the model.
- **Citation labels are English by design:** `*.sources[].label` is `false` in `PATH_OVERRIDES` (`scripts/i18n_fields.mjs`), so `cup` and new labels add no overlay entries. `record.rows[].cells[].result` is also not prose.
- **Places are copied as published.** In 2022–23 4A the table prints Wesleyan Christian 14th on 147.5 and Carmel 14th on 142.5, with no `T`, then Saint Mary's 15th on 107.5. The ledger keeps this and it stays.
- **The gap in `leadOverNext`** (`src/lib/wellsFargoCup.ts` line 137): `nextPlace = own.place + division.filter((r) => r.place === own.place).length` treats any shared place as a tie. For Carmel 2022–23 that gives 16, which nobody holds, so the table's summary row shows an em dash where the true lead is 35. The `tied` field already tells a tie from an unmarked pair. The only consumer is `SportsProgram.tsx` line 308.
- **Which strings translate.** In `src/data/overlays/work/sports.<lang>.json`, units are under `strings`, and the stamp is the unit's `of` field. The seven existing units this plan changes:

  | Stamp | At |
  |---|---|
  | `e9539ba9` | `carmel-christian:record.headline` |
  | `f3ef690e` | `carmel-christian:record.rows[0].note` |
  | `3cd90daa` | `carmel-christian:record.rows[2].note` |
  | `581ebb84` | `carmel-christian:record.didNotWin` |
  | `72393982` | `carmel-christian:record.seasonDetail[0].text` |
  | `13aa35a5` | `carmel-christian:record.seasonDetail[2].text` |
  | `cf9e82a5` | `providence-day:record.seasonDetail[2].text` |

  Two units are new: `record.rows[3].note` and `record.seasonDetail[3].text`. `Boys Tennis` already exists as a unit.
- **Ingest:** the first `sports` rule in `RULES` (`src/lib/metrics.ts`) folds `wells fargo cup` headings, and `## Method` is dropped.
- **The Compare cell at `src/data/metricValues.ts` line 1379** (`'2022 NCISAA 4A basketball title'`) belongs to a clubs metric and stays.

## Decisions

- **Ledger unchanged.** See Context.
- **Headline stays as computed:** `Best finish: 14th in NCISAA 4A, 2022–23.` `bestFinish` takes the most recent on a tie, and the published place is kept, so it lands on the season with the unmarked pair rather than on 2021–22's T14th with 205 points. No school-specific wording. See Open questions.
- **Three point sources**, under the bar the other schools use: at least one title or at least two runner-up years. All three sports have one title, so the order is most combined finishes first: boys basketball, boys soccer, boys tennis.
- **Girls soccer 2026 is left off**, with one runner-up year. Its finish stays in the Winning Record card.
- **`leadOverNext` skips ahead only for a marked tie.** `own.tied` decides it. Every shipped school's figures stay the same, because no carded school sits in an unmarked pair, and the existing fixtures mark their ties. This is a shared-logic fix, not a Carmel special case.
- **The bracket beats the existing research on all five corrections.** The Cup term totals agree with each. Boys tennis has no press or school corroboration: the bracket and the 95-point spring total are the evidence, and Charlotte Latin's card already lists 2025 as a tennis runner-up year.
- **Boys Tennis is added as a fourth row in the existing matrix, plus a fourth `seasonDetail` entry.** This is data behind an existing card. Both are appended, so the indices of the other units stay stable.
- **`record.bars` is left alone.** It shows three programs, and tennis does not need to displace one.
- **The mislabelled first `record.sources` entry is replaced.** It says HighSchoolOT and links to MaxPreps.
- **Providence Day's fix is one number.** `2–1` becomes `2–0`. Nothing else in that string changes, including `18–4–1`.
- **Two-phase** because of the prose in `record`. The Cup block adds no translated text, and there are no new `sports.cup.*` keys.
- **Name:** `carmelchristiancup`, matching `charlottechristiancup`.

## Approvals needed

**None.** The card already exists, and adding a school to it is data only. The corrections and the Boys Tennis row change data behind an existing card. The user sees all of it at the Phase 1 review.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/carmel-christian/Carmel Christian - Sports - Wells Fargo Cup Standings 2020-2026.md`: six seasons, three point sources with evidence, the corrections, the recorded disagreements, the term-total proof, and every URL.

## Out of scope

- **The 3A numbering `T7, T7, 8` in 2024–25.** `leadOverNext` would look for 9th there. No card shows 3A, so it waits for Hickory Grove or Davidson Day's card.
- **`schoolAbove` for 2022–23**, which would name Metrolina rather than Wesleyan. The bars show only the latest season, so nothing renders it.
- **Providence Day's `18–4–1`.** The bracket prints `(18-4)`, and this pass did not test it.
- **Whether an unscored activity earned the athletics site's "2025-26 state champions" tag.** The totals rule out a title in any Cup sport.
- Any other school's Cup card, any Compare row, any ledger edit, or a deploy.

## Steps

### Phase 1 — English

1. **Branch, correct the research notes, ingest.** Create `feat/carmelchristiancup` from an up-to-date `main`. Do these edits before the ingest:
   - In `source-material/sports/carmel-christian/Carmel Christian - Sports - Redesign Research 2026.md`:
     - Lines 15–16: the correction stands, but change `1-2` to `0-2`.
     - Line 30: `(L 1-2)` to `(L 0-2)`.
     - Line 47: add `boys tennis 2025 (4A)` to the titles.
     - Line 64: replace the `TO VERIFY` sentence with `Beat Village Christian Academy 65-64, Feb 23 2019 at Ravenscroft.`
     - Under the titles at line 67, add `- **Boys Tennis 2025 NCISAA 4A champion** — def. Charlotte Latin 5-1, May 17 2025 at Providence Day; Carmel 17-0.`
     - Under the runner-up heading at line 69, add `- Boys Basketball 2021 4A final, L 85-94 to Cannon (Feb 27 2021).`
     - Line 71: replace `*Score TO VERIFY.*` with `L 50-73 (Feb 22 2025).`
     - Line 74: `L 1-2` to `L 0-2`.
     - Lines 137–139: resolve both flags: girls soccer is runner-up on the bracket and the Cup totals, and both basketball finals are verified.
   - In `source-material/sports/providence-day/Providence Day - Sports - Redesign Research 2026.md`, lines 14 and 98: `2–1` to `2–0`.

   Then follow the `ingest-source-material` skill for the `sports` topic only (`build_docs.py sports`, then `scripts/build_site_content.py`), and diff `src/data/schools.json` against `HEAD` so no other topic was swept in. Restore any file whose only change is a date stamp. Run `npm run check:metrics`; no new ⚠️ subtopic should appear.

2. **Add the `cup` block.** In `src/data/sportsPrograms/carmel-christian.ts`, add below `NEXT_STEPS`:
   ```ts
   const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
   const ARCHIVE = 'https://archives.ncisaa.org/index.php?sport='
   ```
   Then insert this between `offered` and `record`, with a `1b cup` banner matching Covenant Day's:
   ```ts
   cup: {
     pointSources: [
       { sport: 'basketball', gender: 'boys', season: 'winter', titleYears: [2022], runnerUpYears: [2021, 2023, 2025] },
       { sport: 'soccer', gender: 'boys', season: 'fall', titleYears: [2020], runnerUpYears: [2021, 2022] },
       { sport: 'tennis', gender: 'boys', season: 'spring', titleYears: [2025] },
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
       { label: 'NCISAA boys basketball bracket, 2020–21', url: `${ARCHIVE}13&years=2020-2021` },
       { label: 'NCISAA boys basketball bracket, 2021–22', url: `${ARCHIVE}13&years=2021-2022` },
       { label: 'NCISAA boys basketball bracket, 2022–23', url: `${ARCHIVE}13&years=2022-2023` },
       { label: 'NCISAA boys basketball bracket, 2024–25', url: `${ARCHIVE}13&years=2024-2025` },
       { label: 'NCISAA boys soccer bracket, 2020–21', url: `${ARCHIVE}8&years=2020-2021` },
       { label: 'NCISAA boys soccer bracket, 2021–22', url: `${ARCHIVE}8&years=2021-2022` },
       { label: 'NCISAA boys soccer bracket, 2022–23', url: `${ARCHIVE}8&years=2022-2023` },
       { label: 'NCISAA boys tennis bracket, 2024–25', url: `${ARCHIVE}16&years=2024-2025` },
     ],
   },
   ```
   `runnerUpYears` is optional in `CupProgram`, so tennis omits it, as Covenant Day's softball entry does.

   Re-letter the banners: `record` to `1c`, `pipeline` to `1d`, `honors` to `1e`, `coaching` to `1f`, and `national` from `1g` to `1h`. In the header comment, change "six of seven cards" to "seven of eight cards", and "no 1d pro-alumni card" and "so 1d renders" to `1e`. Add a line naming the new source file for the Cup card and the Winning Record corrections.

3. **Correct the Winning Record card** in the same file.
   - `record.headline`:
     ```ts
     'Four recent NCISAA titles — two in boys basketball (2019 3A, 2022 4A), one in boys soccer (2020 4A) and one in boys tennis (2025 4A) — behind a string of deep finals runs.',
     ```
   - `record.rows[0].cells[0]`: drop `toVerify`, leaving `{ result: 'STATE' }`.
   - `record.rows[0].note`:
     ```ts
     'Back-to-back 3A in 2018 & 2019; 4A champion 2022; runner-up 2021, 2023 & 2025',
     ```
   - `record.rows[2].note`:
     ```ts
     "Lost the '26 4A final 0–2 to Providence Day",
     ```
   - Append `record.rows[3]`:
     ```ts
     {
       program: 'Boys Tennis',
       cells: [
         { result: 'NONE' },
         { result: 'NONE' },
         { result: 'STATE', record: '17–0' },
       ],
       note: '4A champion 2025, beating Charlotte Latin 5–1 in the final',
     },
     ```
   - `record.didNotWin`:
     ```ts
     "Christ School took the boys basketball 4A titles Carmel lost in 2023 (48–53) and 2025 (50–73, as Christ School three-peated), and Cannon took the 2021 final (85–94); Rabun Gap-Nacoochee beat Carmel in the 2021 (1–0) and 2022 (1–0) boys soccer 4A finals, and Coastal Christian in the 2019 3A final; Providence Day shut Carmel out for the 2026 girls soccer 4A title (0–2).",
     ```
   - `record.seasonDetail[0].text`: add `2021: lost the 4A final 85–94 to Cannon (Feb 27, 2021). ` at the start. Replace `2025: reached the 4A final again and lost to Christ School, which three-peated (score to verify).` with `2025: reached the 4A final again and lost 50–73 to Christ School (Feb 22, 2025), which three-peated.` Leave the rest.
   - `record.seasonDetail[2].text`:
     ```ts
     '2026: reached the NCISAA 4A final and lost 0–2 to Providence Day (May 16, 2026), finishing 14–5. The athletics site tagged the season a "2025-26 state champions" run, but the NCISAA bracket and the Cup totals both show a runner-up finish.',
     ```
   - Append `record.seasonDetail[3]`:
     ```ts
     {
       program: 'Boys Tennis',
       text: '2025: NCISAA 4A champion — beat Charlotte Latin 5–1 in the May 17 final at Providence Day, finishing 17–0.',
     },
     ```
   - In `record.sources`: replace the first entry with `{ label: 'NCISAA boys basketball bracket, 2021–22', url: `${ARCHIVE}13&years=2021-2022` }`. Change the girls soccer label to `HighSchoolOT — 2026 girls soccer 4A final (0–2 to Providence Day)`. Add:
     ```ts
     { label: 'NCISAA boys basketball bracket, 2018–19', url: `${ARCHIVE}13&years=2018-2019` },
     { label: 'NCISAA boys basketball bracket, 2020–21', url: `${ARCHIVE}13&years=2020-2021` },
     { label: 'NCISAA boys basketball bracket, 2024–25', url: `${ARCHIVE}13&years=2024-2025` },
     { label: 'NCISAA boys tennis bracket, 2024–25', url: `${ARCHIVE}16&years=2024-2025` },
     { label: 'NCISAA girls soccer bracket, 2025–26', url: `${ARCHIVE}17&years=2025-2026` },
     ```

4. **Correct Providence Day's card.** In `src/data/sportsPrograms/providence-day.ts`, `record.seasonDetail[2].text` at line 200: change `beat Carmel Christian 2–1` to `beat Carmel Christian 2–0`.

5. **Close the `leadOverNext` gap.** In `src/lib/wellsFargoCup.ts` line 137:
   ```ts
   const tiedRows = division.filter((r) => r.place === own.place).length
   const nextPlace = own.place + (own.tied ? tiedRows : 1)
   ```
   Add to the function's doc comment: `A shared place without a tie mark is copied from the table as published, so only a marked tie skips ahead.`

   In `scripts/gen_data_schema.mjs` line 459–460, change the sentence to: `It passes over a school marked tied, not one the table merely prints on the same place,`, keeping the em-dash sentence after it.

6. **Add fixtures.** In `scripts/check_cup_ledger.mjs`:
   - After the `Covenant Day best finish` line:
     ```js
     eq('Carmel Christian lead over next', cup.leadOverNext('carmel-christian'), [32.5, 85, 35, 32.5, 47.5, 137.5])
     eq('Carmel Christian best finish', [cup.headlineStats('carmel-christian').bestFinish.place, cup.headlineStats('carmel-christian').bestFinish.season], [14, '2022–23'])
     ```
   - After the `next: place not held` line:
     ```js
     eq('next: same place, no tie mark', cup.leadOverNext('x', fx([rec('w', 'A', 14, 147.5), rec('x', 'A', 14, 142.5), rec('z', 'A', 15, 107.5)])), [35, null, null])
     ```
   - In the bars rival list, add `['carmel-christian', 'Covenant Day'],`.

   Corrupt the new fix to confirm the fixture bites: revert line 137 alone, read that the message names `next: same place, no tie mark`, then restore it and diff.

7. **Regenerate and check.** Run `npm run schema` and `npm run check:schema`, `npm run check:cup`, then `npm run build`. Expect `check:live` to fail on the seven stamps in Context and the two new units only, until Phase 2. Anything else failing is a real failure. Run the rest of Phase 1 verification, stage explicit paths, commit, and set the index row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs until they confirm the English version.

### Phase 2 — Every other locale

Scope is the overlay layer only: nine strings in each of the nine locales in `PROSE_TRANSLATED` (`es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`). No `src/locales/*.json` file changes, because every `sports.cup.*` key the card uses is already in all ten catalogs. See `.claude/docs/prose-translation-architecture.md` for the mechanism and `src/data/overlays/NOTES.md` for dates and figures. Figures are copied char-for-char from the final English.

1. **Update and splice by stamp.** Run the sports extractor per locale so the two new units appear, then key everything by English text, never by index. For the seven changed units, update the English and stamp, and edit `t` by the smallest change that matches the English edit, keeping every other character. Translate the two new units using each locale's existing title and tennis wording. Dates translate and their digits stay (`check:dates`). Diff each work file so only these units moved.
2. **Build the overlays** per locale with `node scripts/i18n_build_overlay.mjs --topic sports --lang <code>`, then confirm `npm run check:live` is clean. `scripts/check_work_integrity.mjs` will report these units, because it freezes existing ones. Confirm it names only these.
3. **Finish.** Open the PR with `--body-file`, merge with `gh pr merge --squash --delete-branch`, check out `main` and pull, set the index row to `Implemented`, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `src/data/sportsPrograms/carmel-christian.ts` | edit: `cup` block, Winning Record corrections, new row and detail, sources, comments |
| `src/data/sportsPrograms/providence-day.ts` | edit: one number |
| `src/lib/wellsFargoCup.ts` | edit: `leadOverNext` |
| `scripts/check_cup_ledger.mjs` | edit: fixtures |
| `scripts/gen_data_schema.mjs` | edit: one sentence |
| `source-material/sports/carmel-christian/Carmel Christian - Sports - Redesign Research 2026.md` | edit: corrections |
| `source-material/sports/providence-day/Providence Day - Sports - Redesign Research 2026.md` | edit: two numbers |
| `source-material/sports/carmel-christian/Carmel Christian - Sports - Wells Fargo Cup Standings 2020-2026.md` | new, already written |
| `src/data/schools.json`, `.claude/docs/*`, `src/content/*` | ingest output, sports only |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `src/data/overlays/work/sports.*.json`, `src/data/overlays/sports.*.json` | Phase 2: nine strings per locale |
| `.claude/plans/carmelchristiancup.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:cup` passes, including the new fixtures and the rule that every `pointSources` entry is a sport in `CUP_SPORTS`. All six earlier schools' `lead over next` fixtures still pass unchanged.
- [ ] `npm run check:metrics` passes with no new ⚠️ subtopic, and `npm run check:schema` passes.
- [ ] `npm run build` fails only at `check:live`, only on the nine units in step 7.
- [ ] Browser check of `/school/carmel-christian` with the Sports `<details>` open: the Cup card is second, after Sports Offered. Headline `Best finish: 14th in NCISAA 4A, 2022–23.`, also as the collapsed teaser. No subhead. Tiles `0 / 6`, `205` (2021–22), `−532.5` behind Providence Day, and `62.5` winter.
- [ ] Table: 19 rows with Carmel Christian selected, sixteenth in order; newest column first. It reads 16th, 15th, 15th, 14th, T14th, 15th. The summary row reads `Carmel Christian lead over next-placed school` with 137.5, 47.5, 32.5, 35, 85, 32.5, and no em dash. Forsyth Country Day, Greensboro Day and Wake Christian show `In 3A` in their 3A seasons.
- [ ] Bars heading reads `2025–26 · how the race finished`: Carmel Christian 37.5 / 62.5 / 60, Covenant Day 67.5 / 0 / 117.5. No comeback line.
- [ ] Three rows under the point-sources heading, boys basketball, boys soccer, boys tennis. Those three are outlined on the sports grid, with girls soccer not outlined.
- [ ] Winning Record: four rows, Boys Tennis last with `STATE` and `17–0` in the third column. No TO VERIFY tag on boys basketball's first cell. Headline says `Four recent NCISAA titles`. `grep -n "1–2\|to verify" src/data/sportsPrograms/carmel-christian.ts` finds only the header comment's general use of the phrase, if any.
- [ ] Providence Day's Winning Record shows `2–0`, and every other figure on its Cup card is unchanged.
- [ ] Compare is unchanged: `16th of 17` and `0`.
- [ ] The Cup cards of the other six schools are unchanged. Charlotte Catholic, Trinity and Charlotte Prep render no Cup card.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open. Build-gate exception as above.

### Phase 2 — Locales

- [ ] `npm run check:live` and `npm run check:runtime` pass, and `npm run build` is fully green.
- [ ] `npm run check:dates` passes, and `check:sepdrift` passes for each locale.
- [ ] Real-browser check of the open card in `es`, `fa`, `ar` and `hi`: `142.5`, `−532.5` and every season range read correctly, the never-won headline is translated, and the corrected scores read `0–2` and `85–94` with their order intact in the RTL locales.
- [ ] `npm run audit:daterender` reports no new English date.

## Risks

| Risk | Mitigation |
|---|---|
| The `leadOverNext` edit moves a shipped figure | The six existing fixtures pin every carded school's row |
| A stale overlay silently renders English in Phase 2 | `check:live` names each unit until it resolves |
| The school disputes the tennis title or the scores | The bracket URLs are on the card's sources, and the source file holds the term-total proof |
| Banner re-lettering misses one | Cosmetic; grep `1[a-h]` after editing |

## Open questions

- **Should the headline use 2022–23?** The computed best finish lands on `14th, 2022–23`, the season the table printed an unmarked pair and Carmel's 142.5 was 15th by points. 2021–22's T14th on 205 is the stronger season, and the peak tile shows it. — **default:** leave as computed, because places are copied as published. If the user prefers 2021–22, the fix is in `bestFinish` for all schools, not a Carmel exception.
- **Should girls soccer 2026 be listed despite the bar?** It is 45 of the 60 spring points in 2025–26. — **default:** left off, matching the other six schools.
