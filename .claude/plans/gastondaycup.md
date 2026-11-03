---
name: gastondaycup
title: Turn on the Wells Fargo Cup card for Gaston Day, add Berean Baptist's one ledger row, and correct its Sports cards from eight titles in three sports to 14 in six
status: implemented
phases: 2
created: 2026-11-02
branch: feat/gastondaycup
prs: [411]
---

# Turn on the Wells Fargo Cup card for Gaston Day

## Goal

Gaston Day becomes the tenth school with the Wells Fargo Cup card, second in its Sports area, showing six official NCISAA seasons and seven verified point sources. The same work corrects its Sports Offered, Winning Record and Honors cards, which claim eight titles in three sports when the verified record is 14 titles in six. It worked when `/school/gaston-day` shows the card with the figures in Verification and no card still says eight.

## Context

- **The card is data-driven.** `src/lib/wellsFargoCup.ts` computes everything from `src/data/wellsFargoCup.ts`. A `cup` key in `src/data/sportsPrograms/gaston-day.ts` turns the card on. No component change is expected, and a needed one means the shared logic has a gap, so say so rather than special-casing the school.
- **Nearest model:** `src/data/sportsPrograms/davidson-day.ts`, its `cup` block and banners, and `.claude/plans/davidsondaycup.md`, the last 2A school.
- **The ledger holds Gaston Day's six rows and 37 of its 38 table rows.** Planning compared all 406 NCISAA rows and 36 leaders with the published tables and found no mismatch. `CUP_FIELD_SIZES` still matches and no newer season is posted.
- **Nine schools have a `cup` block today.** Hickory Grove is the only high school left after this one.
- **Compare does not move.** `cup-finish` stays `6th of 25` and `cup-titles` stays `1`, `Top 3 in 2 of 6`. Berean Baptist's row is 2024–25 and 21st.
- **Row labels are not translated.** `record.rows[].program` and `seasonDetail[].program` render raw (`src/components/SportsProgram.tsx:648`, `:722`), as on every school. New rows use labels other schools already use: `Boys Golf`, `Boys Track & Field`, `Girls Swimming`.
- **Stamps that change** (`src/data/overlays/work/sports.*.json`, each `at` one path, each edited in Step 5):

  | Stamp | Path |
  |---|---|
  | `203ff4ca` | `offered.subhead` |
  | `025948af` | `offered.stats[2].label` |
  | `741bb841` | `record.headline` |
  | `21136c62` | `record.subhead` |
  | `e69b4ba4` | `record.rows[2].note` |
  | `e64dee8f` | `record.didNotWin` |
  | `210e1e59` | `record.seasonDetail[2].text` |
  | `10a88e51` | `honors.honors[1].text` |
  | `a33019ab` | `honors.honors[2].text` |
  | `8b5e46d8` | `honors.honors[3].text` |

  `offered.stats[2].value` (`8` to `14`) is not extracted.
- **Seven units are brand new:** `record.rows[3].note`, `record.rows[4].note`, `record.seasonDetail[3..5].text`, and the `label` and `text` of the new honors entry. `check:live` cannot see a brand-new unit, so Phase 2 must add them by name. The inserted honors entry moves the `2021` and `Decade` entries to `honors[4]` and `honors[5]`, so their `at` paths move too, with their English unchanged.
- **Ingest:** the first `sports` rule in `RULES` (`src/lib/metrics.ts`) folds `wells fargo cup` headings, and `## Method` is dropped.

## Decisions

- **14 titles, not 8.** The term totals prove it: all twelve fall and winter totals and four of six spring totals are accounted for exactly, and the 15 and 20 left in the other two springs cannot hide a title or runner-up. The proof is in the source file.
- **Golf and track rest on dated press.** `ncisaa.shotstat.com` does not resolve, a Wayback listing found no scoreboard page before that service went offline, and the archive links no track results for 2022–2024 or 2026. Each finish fits the spring total exactly, so they stay, and the cards say "association results and local coverage".
- **Seven point sources**, under the usual bar of a title or two runner-up years. Most combined finishes first, then titles.
- **The stat label drops `2A`** to read `NCISAA team state titles since 2021`, because golf, swimming and track are scored by division. The headline drops it for the same reason.
- **Two rows are added to the Winning Record matrix**, Boys Golf and Boys Track & Field, because each has a title or runner-up result inside its 2023–2025 columns. Girls Swimming has none there, so it gets season detail only. This is data behind an existing card.
- **`NONE` becomes `SEMIFINAL` where the bracket shows one:** volleyball and boys soccer in 2023.
- **Unverifiable claims stay.** "Three further finals appearances and five league titles" over the decade reaches before the archive window. It is left alone.
- **Berean Baptist's 2024–25 row keeps `winter: 0, spring: 0`.** A blank cell means 0, and the row sums.
- **Two-phase** because of the prose above. The Cup block adds no translated text, and there are no new `sports.cup.*` keys.

## Approvals needed

**None.** The card exists, and adding a school to it is data only. The user sees the corrections and the two new matrix rows at the Phase 1 review.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/gaston-day/Gaston Day School - Sports - Wells Fargo Cup Standings 2020-2026.md`: six seasons, the Berean row, seven point sources, the term-total proof, the evidence for each final, the disagreements and every URL.

## Out of scope

- Gaston Day's unfilled Sports cards (College Pipeline, Coaching, National Stage).
- A Hickory Grove card.
- Any Compare row, component change, or deploy.

## Steps

### Phase 1 — English

1. **Branch and ingest.** `git checkout -b feat/gastondaycup` from `main`. Run the `ingest-source-material` skill for the sports topic, then confirm `npm run check:metrics` reports no new ⚠️ subtopic and `src/data/schools.json` shows no reordering.

2. **Correct the older research file.** In `source-material/sports/gaston-day/Gaston Day School - Sports - Program and Championship Ledger 2026.md`, under `## NCISAA 2A state championship ledger`, add before the table: `**Superseded 2026-11-02.** This ledger undercounts. The verified record is 14 titles in six sports. See "Gaston Day School - Sports - Wells Fargo Cup Standings 2020-2026.md".` Change nothing else in that file.

3. **Add the ledger row** in `src/data/wellsFargoCup.ts`, after the last 2A row in the rest-of-division block:
   ```ts
   { school: 'berean-baptist', association: 'NCISAA', classification: '2A', season: '2024–25', place: 21, points: 37.5, isEstimate: false, fall: 37.5, winter: 0, spring: 0 },
   ```
   Add `'berean-baptist': 'Berean Baptist Academy'` to `CUP_SHORT_NAMES` and to `CUP_HIGH_SCHOOLS`. In the header comment, add: `Berean Baptist's row comes from Gaston Day's file of the same name.`

   Add `Berean Baptist Academy` to `HIGH_SCHOOLS` in `src/data/highSchools.ts` and as a row in the 43-school table in `source-material/high-school-placement/_shared/High School Destinations.md`, beside Freedom Christian Academy, the other Fayetteville school:
   ```ts
   'Berean Baptist Academy': { kind: 'day', url: 'https://bbafnc.org', city: 'Fayetteville', state: 'NC' },
   ```
   ```
   | Berean Baptist Academy | Fayetteville | NC | day | https://bbafnc.org | Christian School Education \| Berean Baptist Academy (the page gives 518 Glensford Drive, Fayetteville, NC 28314) |
   ```

4. **Add the `cup` block** to `src/data/sportsPrograms/gaston-day.ts`, after `offered`:

   Add these constants with the others:
   ```ts
   const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
   const ARCHIVE = 'https://archives.ncisaa.org/index.php?sport='
   const SWIM = 'https://admin.ncisaa.org/uploads/SWIMMING/'
   const GOLF_22 = 'https://sports.yahoo.com/happy-blue-gaston-day-boys-170121762.html'
   const GOLF_23 = 'https://www.highschoolot.com/story/highschoolot-hsot-final-statewide-rankings-for-boys-golf/20898527/'
   const GOLF_24 =
     'https://www.highschoolot.com/story/the-o-neal-school-wins-ncisaa-d3-boys-golf-trinity-academy-s-eastman-wins-medalist/21453701/'
   const TRACK_23 = 'https://alamancenews.com/bca-boys-track-and-field-team-secures-first-title-in-any-sport-for-school/'
   const TRACK_24 = 'https://sports.yahoo.com/super-saturday-seven-charlotte-area-011100010.html'
   ```
   ```ts
   /* -------------------------------------------------------------- 1b cup -- */
   cup: {
     pointSources: [
       { sport: 'tennis', gender: 'girls', season: 'fall', titleYears: [2021, 2023, 2024, 2025], runnerUpYears: [2022] },
       { sport: 'volleyball', gender: 'girls', season: 'fall', titleYears: [2021, 2024, 2025], runnerUpYears: [2020] },
       { sport: 'soccer', gender: 'boys', season: 'fall', titleYears: [2021, 2022, 2024], runnerUpYears: [2025] },
       { sport: 'golf', gender: 'boys', season: 'spring', titleYears: [2022, 2023], runnerUpYears: [2024] },
       { sport: 'trackField', gender: 'boys', season: 'spring', titleYears: [2024], runnerUpYears: [2023] },
       { sport: 'tennis', gender: 'boys', season: 'spring', titleYears: [], runnerUpYears: [2021, 2022] },
       { sport: 'swimming', gender: 'girls', season: 'winter', titleYears: [2022] },
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
       { label: 'NCISAA girls tennis bracket, 2021–22', url: `${ARCHIVE}11&years=2021-2022` },
       { label: 'NCISAA girls tennis bracket, 2022–23', url: `${ARCHIVE}11&years=2022-2023` },
       { label: 'NCISAA girls tennis bracket, 2023–24', url: `${ARCHIVE}11&years=2023-2024` },
       { label: 'NCISAA girls tennis bracket, 2024–25', url: `${ARCHIVE}11&years=2024-2025` },
       { label: 'NCISAA girls tennis bracket, 2025–26', url: `${ARCHIVE}11&years=2025-2026` },
       { label: 'NCISAA volleyball bracket, 2020–21', url: `${ARCHIVE}12&years=2020-2021` },
       { label: 'NCISAA volleyball bracket, 2021–22', url: `${ARCHIVE}12&years=2021-2022` },
       { label: 'NCISAA volleyball bracket, 2024–25', url: `${ARCHIVE}12&years=2024-2025` },
       { label: 'NCISAA volleyball bracket, 2025–26', url: `${ARCHIVE}12&years=2025-2026` },
       { label: 'NCISAA boys soccer bracket, 2021–22', url: `${ARCHIVE}8&years=2021-2022` },
       { label: 'NCISAA boys soccer bracket, 2022–23', url: `${ARCHIVE}8&years=2022-2023` },
       { label: 'NCISAA boys soccer bracket, 2024–25', url: `${ARCHIVE}8&years=2024-2025` },
       { label: 'NCISAA boys soccer bracket, 2025–26', url: `${ARCHIVE}8&years=2025-2026` },
       { label: 'NCISAA boys tennis bracket, 2020–21', url: `${ARCHIVE}16&years=2020-2021` },
       { label: 'NCISAA boys tennis bracket, 2021–22', url: `${ARCHIVE}16&years=2021-2022` },
       { label: 'NCISAA swimming team scores, 2022', url: `${SWIM}Div%203%20Final_Team_Ind.pdf` },
       { label: 'Gaston Gazette — boys golf title, 2022', url: GOLF_22 },
       { label: 'HighSchoolOT — 2023 boys golf rankings, NCISAA D3 champion', url: GOLF_23 },
       { label: 'HighSchoolOT — NCISAA D3 boys golf, 2024', url: GOLF_24 },
       { label: 'Alamance News — NCISAA boys track, 2023', url: TRACK_23 },
       { label: 'Charlotte Observer — NCISAA boys track, 2024', url: TRACK_24 },
     ],
   },
   ```
   Check the optional `runnerUpYears` against the `CupProgram` type in `src/data/sportsProgram.ts`, as Davidson Day's rows omit it.

   Re-letter the banners: `record` to `1c`, `honors` to `1e`, `facilities` to `1g`. In the header comment, change "FOUR of seven cards" to "FIVE of eight cards", `1c College Pipeline` to `1d`, `1e Coaching` to `1f`, `1g National Stage & NIL` to `1h`. Add a line naming the new source file for the Cup card and the corrections.

5. **Correct the prose** in the same file. Every string below is final.
   - `offered.subhead`: `An NCISAA 2A program that has won 14 team state championships since 2021 — a title rate that reads much larger than the school’s 510 enrollment.`
   - `offered.stats[2]`: `{ value: '14', label: 'NCISAA team state titles since 2021' }`
   - `record.headline`: `Fourteen NCISAA team state championships since 2021, in six sports — including five in the 2021–22 school year alone.`
   - `record.subhead`: `Girls tennis has four titles and is on a three-peat; volleyball and boys soccer have three each, and the 2025 volleyball final went five sets.`
   - `record.rows[1].cells[0]`: `{ result: 'SEMIFINAL' }`
   - `record.rows[2].cells`: `{ result: 'SEMIFINAL' }`, `{ result: 'STATE', record: 'shutout' }`, `{ result: 'RUNNER-UP', record: '1–4 final' }`
   - `record.rows[2].note`: `Three titles (2021, 2022, 2024); blanked Westchester Country Day in 2024, then lost the 2025 final 1–4 to Caldwell Academy`
   - Add after `rows[2]`:
     ```ts
     {
       program: 'Boys Golf',
       cells: [{ result: 'STATE' }, { result: 'RUNNER-UP' }, { result: 'NONE' }],
       note: 'Titles in 2022 and 2023, then runner-up to The O’Neal School in 2024',
     },
     {
       program: 'Boys Track & Field',
       cells: [{ result: 'RUNNER-UP' }, { result: 'STATE' }, { result: 'NONE' }],
       note: 'Lost the 2023 title to Burlington Christian 68–75, then won in 2024 with 87 points',
     },
     ```
   - `record.didNotWin`: `every other program. The 14 titles since 2021 sit in six sports — girls tennis, volleyball, boys soccer, boys golf, boys track and girls swimming — and the school publishes no championship history of its own, so this ledger rests on association results and local coverage.`
   - `record.seasonDetail[2].text`: `Won the NCISAA 2A title in 2021, 2022 and 2024, and lost the 2025 final 1–4 to Caldwell Academy. The 2024 win was a shutout of Westchester Country Day, completing a three-title school year alongside volleyball and girls tennis — the run local coverage headlined as "Déjà vu".`
   - Add to `record.seasonDetail`:
     ```ts
     { program: 'Boys Golf', text: 'State champions in 2022 on a team score of 226, four strokes clear of The O’Neal School and Caldwell Academy, and again in 2023; runner-up to The O’Neal School in 2024, 228 to 217.' },
     { program: 'Boys Track & Field', text: 'Runner-up to Burlington Christian in 2023, 68 to 75, then NCISAA Division III champions in 2024 with 87 points, ahead of Caldwell Academy on 75 and The O’Neal School on 73.' },
     { program: 'Girls Swimming', text: 'NCISAA Division III champions in 2022, 231 to The O’Neal School’s 222, one of five team titles that school year.' },
     ```
   - Add to `record.sources`:
     ```ts
     { label: 'NCISAA playoff results archive', url: 'https://archives.ncisaa.org/' },
     { label: 'NCISAA boys soccer bracket, 2025–26', url: `${ARCHIVE}8&years=2025-2026` },
     { label: 'NCISAA swimming team scores, 2022', url: `${SWIM}Div%203%20Final_Team_Ind.pdf` },
     { label: 'Gaston Gazette — boys golf title, 2022', url: GOLF_22 },
     { label: 'HighSchoolOT — 2023 boys golf rankings, NCISAA D3 champion', url: GOLF_23 },
     { label: 'HighSchoolOT — NCISAA D3 boys golf, 2024', url: GOLF_24 },
     { label: 'Alamance News — NCISAA boys track, 2023', url: TRACK_23 },
     { label: 'Charlotte Observer — NCISAA boys track, 2024', url: TRACK_24 },
     ```
   - `honors.honors[1].text` (`2024`): append ` Boys track — NCISAA Division III state champions.`
   - `honors.honors[2].text` (`2023`): append ` Boys golf — NCISAA Division III state champions.`
   - Insert after `honors.honors[2]`:
     ```ts
     {
       label: '2022',
       text: 'Boys soccer — NCISAA 2A state champions (def. Greenfield 3–1). Girls swimming and boys golf — NCISAA state champions.',
     },
     ```
   - The `2021` entry, now `honors.honors[4].text`: `Volleyball, girls tennis and boys soccer — NCISAA 2A state champions, three of five team titles that school year.`
   - Add the swimming PDF and the five press sources above to `honors.sources`.

6. **Pin the card in `check:cup`.** In `scripts/check_cup_ledger.mjs`, after the other fixtures near line 171, add:
   ```js
   eq('Gaston Day lead over next', cup.leadOverNext('gaston-day'), [22.5, 2.5, 22.5, 5, 10, 2.5])
   ```

7. **Record the new rules.**
   - In `.claude/skills/wells-fargo-cup/SKILL.md`, Step 3, add: a bracket prints each team's record by round, so the winner's record rises by one after the final, and that names the winner on most mirrored pages; a news round-up or an earlier research pass can undercount as badly as a school's list over-claims (Gaston Day's eight titles were 14), so fit every term total before trusting a count; and where a golf or track result rests on press, the term total must fit it exactly. Add that a school outside 4A whose division is already in the ledger may need only a row or two, because a school that moved class left that division short.
   - In `scripts/gen_data_schema.mjs`, at the Cup rules near line 446, add the same term-total rule in one sentence, then run `npm run schema`.
   - Update `.claude/SKILLS.md`'s `wells-fargo-cup` entry if its text describes these traps differently.

8. **Regenerate and check.** Run `npm run check:schema`, `npm run check:cup`, then `npm run build`. Expect `check:live` to fail on the ten stamps in Context only, until Phase 2. Anything else failing is a real failure. Run the rest of Phase 1 verification, stage explicit paths, commit, push, open the PR with `--body-file`, and set the index row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs until they confirm the English version.

### Phase 2 — Every other locale

Scope is the overlay layer only: ten changed and seven new units in each of the nine locales in `PROSE_TRANSLATED` (`es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar` today; `scripts/check_live_all.mjs` re-parses the list, so confirm it there). No `src/locales/*.json` file changes. See `.claude/docs/prose-translation-architecture.md` and `src/data/overlays/NOTES.md`.

1. **Update by text.** Key everything by English text, never by index. For the ten changed units, update the English and stamp, and edit `t` by the smallest change that matches the edit. Add the seven new units, and update the `at` of the moved `2021` and `Decade` honors units. Figures are copied char-for-char, and `68–75`, `1–4` and `2021–22` keep their order. Dates translate and their digits stay (`check:dates`). If the extractor reports any further unit, such as a `1–4 final` chip, translate it the same way.
2. **Build the overlays** per locale with `node scripts/i18n_build_overlay.mjs --topic sports --lang <code>`, then run `npm run check:live`. Confirm by grep that each new English string resolves in every overlay, since `check:live` cannot see a brand-new unit. `scripts/check_work_integrity.mjs` will report these units, because it freezes existing ones. Confirm it names only these.
3. **Finish.** Update the PR, merge with `gh pr merge --squash --delete-branch`, check out `main` and pull, set the index row to `Implemented`, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `source-material/sports/gaston-day/*Wells Fargo Cup Standings 2020-2026.md` | new, written during planning |
| `source-material/sports/gaston-day/*Program and Championship Ledger 2026.md` | edit: superseded note |
| `source-material/high-school-placement/_shared/High School Destinations.md` | edit: Berean Baptist row |
| `src/data/wellsFargoCup.ts` | edit: one row, two name entries, comment |
| `src/data/highSchools.ts` | edit: Berean Baptist |
| `src/data/sportsPrograms/gaston-day.ts` | edit: `cup` block, prose corrections, comments |
| `scripts/check_cup_ledger.mjs` | edit: one fixture |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | edit and regenerate |
| `.claude/skills/wells-fargo-cup/SKILL.md`, `.claude/SKILLS.md` | edit: new rules |
| `.claude/docs/sports/gaston-day.md`, `src/data/schools.json` | regenerated by ingest |
| `src/data/overlays/work/sports.*.json`, `src/data/overlays/sports.*.json` | Phase 2: 17 units per locale |
| `.claude/plans/INDEX.md`, `.claude/plans/gastondaycup.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:cup` passes, including the new fixture, and every earlier school's fixture is unchanged.
- [ ] `npm run check:schoolurls`, `npm run check:metrics` and `npm run check:schema` pass, with no new ⚠️ subtopic.
- [ ] `npm run build` fails only at `check:live`, only on the ten stamps in Context.
- [ ] `grep -n -i "eight" src/data/sportsPrograms/gaston-day.ts` finds no title claim.
- [ ] Browser check of `/school/gaston-day` with the Sports `<details>` open: the Cup card is second, after Sports Offered. Headline `NCISAA 2A Wells Fargo Cup winner, 2021–22.`, also as the collapsed teaser. Tiles: 1 Cup won, peak 395 (2021–22), −250 gap behind Caldwell Academy in 2025–26, and 145 fall points as the best season.
- [ ] Table: heading `6 years · every NCISAA 2A school`, 38 rows, Gaston Day sixth and in view on load, newest column first: 6th, 7th, 4th, 4th, 1st, 2nd. The summary row, newest first, reads 2.5, 10, 5, 22.5, 2.5, 22.5. Davidson Day shows `In 3A` in 2024–25 and 2025–26, Greenfield shows `In 1A` in 2020–21 and 2021–22, Friendship Christian shows `In 1A` in 2024–25 and 2025–26. Berean Baptist Academy shows 21st in 2024–25 and em dashes elsewhere, and links to `https://bbafnc.org`.
- [ ] Links: Davidson Day and Hickory Grove go to their pages with the brand edge. Northside Christian has no link.
- [ ] Bars heading reads `2025–26 · how the race finished`: Gaston Day 145 / 45 / 42.5, Faith Christian 80 / 37.5 / 125. No comeback line.
- [ ] Seven rows under the point-sources heading, girls tennis first. Boys tennis shows runner-up years only and girls swimming a title only, each with no stray separator. All seven are outlined on the sports grid.
- [ ] Winning Record: five rows; the volleyball and boys soccer 2023 cells read as semifinals, boys soccer 2025 as `1–4 final`, Boys Golf 2023 and Boys Track 2024 as state titles. Sports Offered's third tile reads `14`.
- [ ] Compare is unchanged: `6th of 25`, `1`, `Top 3 in 2 of 6`.
- [ ] Davidson Day's table is still 53 rows, and the other eight Cup cards are unchanged. Hickory Grove, Trinity and Charlotte Prep render no Cup card.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open. Build-gate exception as above.

### Phase 2 — Locales

- [ ] `npm run check:live` and `npm run check:runtime` pass, and `npm run build` is fully green.
- [ ] `npm run check:dates` passes, and `check:sepdrift` passes for each locale.
- [ ] Real-browser check of the open card in `es`, `fa`, `ar` and `hi`: `395`, `−250`, every season range, `2A` and `In 3A` read correctly, the single-title headline is translated, and `68–75`, `1–4` and `2021–22` keep their order in `fa` and `ar`.
- [ ] `npm run audit:daterender` reports no new English date.

## Risks

| Risk | Mitigation |
|---|---|
| The two press-only golf and track seasons are challenged | Each fits the spring total exactly, and the source file holds the proof and the URLs |
| A brand-new unit ships English, unseen by `check:live` | Phase 2 step 2 greps each one in every overlay |
| The ledger row moves another card | Simulated in planning: Davidson Day's, Hickory Grove's and Providence Day's `divisionRows` are unchanged, and the fixtures pin the rest |
| A guessed homepage is wrong | `bbafnc.org` was loaded in Chrome and shows the name and the Fayetteville address |

## Open questions

- Should the card lead with more than the one Cup win, given a school 6th in 2025–26? — **default:** leave as computed. The Winning Record card carries the title story.

## Implementation notes

- **No PR yet.** The plan's Step 8 opens one in Phase 1, but `/implement` holds the PR until Phase 2, so both phases land together. Phase 1 is committed on `feat/gastondaycup`.
- **Verification's Hickory Grove link check does not apply.** Hickory Grove played 3A in all six seasons, so it is not on Gaston Day's 2A table. Hickory Christian is a different school. Davidson Day is the table's only roster link.
- **Berean Baptist's ledger row** sits at the end of the NCISAA rest-of-division block, so it stays one contiguous school. The last 2A row by line number is inside Fayetteville Christian's run.
- **`High School Destinations.md`:** its intro now says 44 schools and names Berean Baptist as coming from Gaston Day's table.
- **`.claude/SKILLS.md` is unchanged.** Its `wells-fargo-cup` entry does not describe these traps and already carries the 2026-11-02 date.
- **Phase 2 ran in the Phase 1 window** after the user approved the English. It was 17 units per locale.
- **The `1–4 final` chip stays English in every locale,** like `5–1 final` and `3–2 final`. The extractor reports no unit for that field.
- **Status and PR link went in before the merge,** so the close-out stays off `main`.
