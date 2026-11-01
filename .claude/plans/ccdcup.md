---
name: ccdcup
title: Turn on the Wells Fargo Cup card for Charlotte Country Day, and correct six facts in its Winning Record card
status: implemented
phases: 2
created: 2026-10-31
branch: feat/ccdcup
prs: [388]
---

# Charlotte Country Day Wells Fargo Cup card

## Goal

Charlotte Country Day becomes the third school with the Wells Fargo Cup card, second in its Sports area. The card shows six seasons of official NCISAA results and eight verified point sources, all computed from the shared ledger. The same pass corrects six facts in Country Day's Winning Record card that the official record contradicts, so the two cards do not disagree.

## Context

- **The card is live** for Providence Day (PD, plan `wellsfargocup`, #383, #384) and Charlotte Latin (plan `latincup`, #386). A `cup` key in a school's module turns it on: `SchoolDetail.tsx` renders a card when `sports[c.key] != null`. The body is `WellsFargoCupBody` in `src/components/SportsProgram.tsx`, and everything it prints comes from `src/lib/wellsFargoCup.ts` reading the ledger in `src/data/wellsFargoCup.ts`.
- **Country Day's rows are already in the ledger.** So is the whole of 4A, and `check:cup` fails if a card's division is incomplete. The ledger needs no edit.
- **Country Day is the first school on the single-win path.** It won one of six: 2021–22, 682.5 to Latin's 655. `cupHeadlineText` falls to `sports.cup.headlineSingle`, because `currentStreak` is 0, `cupsWon` is 1 and `lastWin` is set. `check:cup` does not cover that string, so the browser check below is its first real run.
- **The race and tiles use the latest-season state.** `won = latest.place === 1` is false, as for Latin, so the subhead hides, the third tile uses `tileGap`, and the bars use `raceResult`.
- **The table uses a different `won`.** `CupTable` at `src/components/SportsProgram.tsx:268` sets `won = lead.some((v) => v != null)`, which is true for any school with one win. So Country Day's summary row is the lead row, one `+27.5` and five dashes, not Latin's gap row. See Open questions.
- **Types:** `CupProgram` and `CupPointSource` in `src/data/sportsProgram.ts`. Latin's block at `src/data/sportsPrograms/charlotte-latin.ts:91` is the model. Its citation constant `CUP_BASE` is local to that file, so Country Day defines its own.
- **Citation labels are English by design:** `*.sources[].label` is `false` in `PATH_OVERRIDES` and `SourceRow` runs with `localizeLabels={false}`, so `cup` adds no overlay entries.
- **Two corrected strings are research prose**, in `src/data/overlays/work/sports.<lang>.json`, found by their `at` path:

  | Path | English today |
  |---|---|
  | `charlotte-country-day:record.rows[0].note` | `Four-peat, beating Durham Academy in the 2026 final` |
  | `charlotte-country-day:record.rows[4].note` | `CISAA conference champions in 2026` |

  `cells[].result` is extracted as shared units: `RUNNER-UP` and `NONE` each hold one unit with an `at` list. Two cells move between them, so Phase 2 refreshes those lists with no change to any translation. `cells[].record` and `bars[]` figures are skipped.
- **Ingest:** the first `sports` rule in `RULES` (`src/lib/metrics.ts:265`) already folds `wells fargo cup` headings, and `## Method` is dropped.

## Decisions

- **Ledger unchanged.** All 132 NCISAA rows and all 36 leaders match the six official tables, and all 102 official 4A rows are present. No newer season is posted. See `## Method` in the source file.
- **Headline stays as computed:** `NCISAA 4A Wells Fargo Cup winner, 2021–22.` No Country Day wording. The current state already reads from the `−90` tile and the race bars.
- **Eight point sources.** A sport is listed with at least one title or at least two runner-up years, the same bar as Latin and PD. This drops three confirmed single runner-up finishes: boys lacrosse 2026, volleyball 2024 and boys cross country 2023. They remain in the source file. Order is most titles first, then runner-ups.
- **Girls lacrosse is listed with no title.** Four runner-up years clear the bar, and Latin's boys tennis is the precedent.
- **Girls track 2023 stays a title.** Country Day's list and HighSchoolOT's 2023 rankings both say so, though a 2024 HighSchoolOT story says Country Day was "dethroning" PD. No official 2023 team table was reachable. Recorded in the source file.
- **420–328 stays on the swimming row.** HighSchoolOT's prose says "88 points clear", but its own team table reads 420 and 328.
- **Fall sports are dated by the event.** Girls tennis's 2025–26 final was Saturday, October 25 per the archive, and a cross country season ends in the fall, so both notes become 2025. This matches `latincup`'s girls golf correction.
- **Two-phase only because of those two notes.** The Cup block adds no translated text. Keeping both in one PR means the Cup and Record cards ship consistent.
- **Name:** `ccdcup`, matching `ccdglobal` and `ccdlearning`, rather than the skill's literal `charlotte-country-daycup`.

## Approvals needed

**None.** The card already exists, and adding a school to it is data only, needing no UX approval. The corrections change data behind existing cards. The user sees the corrected wording and the summary row at the Phase 1 review.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/charlotte-country-day/Charlotte Country Day - Sports - Wells Fargo Cup Standings 2020-2026.md`: Country Day's six seasons, the eight point sources with evidence per year, what was dropped and why, the corrections above, the disagreements, reach limits and every URL.

## Out of scope

- PD's research file, which repeats "won by 88 over Country Day". The team table gives 92.
- `CCD - Sports - Championships.pdf`, whose 33–49 cross country score belongs to 2021, not 2025. The app does not print it.
- The 2025–26 girls tennis cell, which could gain `16–4`, and any other cell the official record does not contradict.
- Any other school's Cup card, Compare rows, or a deploy.

## Steps

### Phase 1 — English

1. **Branch and ingest.** Create `feat/ccdcup` from an up-to-date `main`. Follow the `ingest-source-material` skill for the `sports` topic only (`build_docs.py sports`), then diff `src/data/schools.json` against `HEAD` so no other topic was swept in. Run `npm run check:metrics`; no new ⚠️ subtopic should appear.

2. **Add the `cup` block.** In `src/data/sportsPrograms/charlotte-country-day.ts`, add beside `CHAMPS_26`:
   ```ts
   const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
   ```
   Then insert this between `offered` and `record`, with a `1b cup` banner matching Latin's:
   ```ts
   cup: {
     pointSources: [
       { sport: 'tennis', gender: 'girls', season: 'fall', titleYears: [2022, 2023, 2024, 2025], runnerUpYears: [2021] },
       { sport: 'trackField', gender: 'girls', season: 'spring', titleYears: [2023, 2024, 2025], runnerUpYears: [2021, 2022] },
       { sport: 'fieldHockey', gender: 'girls', season: 'fall', titleYears: [2021, 2023, 2025], runnerUpYears: [2020, 2024] },
       { sport: 'swimming', gender: 'girls', season: 'winter', titleYears: [2024, 2025], runnerUpYears: [2021, 2023, 2026] },
       { sport: 'crossCountry', gender: 'girls', season: 'fall', titleYears: [2021, 2024], runnerUpYears: [2020, 2023] },
       { sport: 'tennis', gender: 'boys', season: 'spring', titleYears: [2021], runnerUpYears: [2022] },
       { sport: 'golf', gender: 'boys', season: 'spring', titleYears: [2022] },
       { sport: 'lacrosse', gender: 'girls', season: 'spring', titleYears: [], runnerUpYears: [2021, 2022, 2024, 2025] },
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
       { label: 'Charlotte Country Day state championships', url: AWARDS },
       { label: 'High School OT — 2026 girls swimming', url: 'https://www.highschoolot.com/story/ncisaa-d1-girls-swimming-and-diving-2026-championship/22319386/' },
       { label: 'Charlotte Latin — 2022 boys golf team scores', url: 'https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/sayman-dannemann-earn-individual-honors-golf-team-second-at-championships' },
     ],
   },
   ```
   Re-letter the banners: `record` to `1c`, `pipeline` to `1d`, `honors` to `1e`, `coaching` to `1f`, `facilities` to `1g`. In the header comment, name the new source file for the point sources and corrections, change "SIX of seven cards" to "SEVEN of eight cards", `(1g)` to `(1h)`, and "noted on 1b" to "noted on 1c".

3. **Correct field hockey 2024–25.** In `record.rows[1]`, change the middle cell to `{ result: 'RUNNER-UP', record: '15–4' }`.

4. **Correct girls cross country 2023–24.** In `record.rows[4]`, change the first cell to `{ result: 'RUNNER-UP' }`, and change `note` to `CISAA conference champions in 2025`.

5. **Correct girls tennis.** In `record.rows[0]`, change the first cell's record to `20–0`, give the second cell `record: '19–0'`, and change `note` to `Four-peat, beating Durham Academy in the 2025 final`.

6. **Correct the girls lacrosse bar.** In `record.bars`, set Girls Lacrosse to `record: '18–4', pct: 0.818`. Its position stays third.

7. **Add a single-win fixture.** In `scripts/check_cup_ledger.mjs`, beside `eq('PD lead row', …)` at line 141, add:
   ```js
   eq('CCD lead row', cup.leadRow('charlotte-country-day'), [null, 27.5, null, null, null, null])
   eq('CCD gap row', cup.gapBehindFirst('charlotte-country-day'), [25, null, 212.5, 67.5, 102.5, 90])
   ```

8. **Regenerate and check.** Run `npm run schema` and `npm run check:schema`, `npm run check:cup`, then `npm run build`. Expect `check:live` to fail on the two edited notes only, until Phase 2. Anything else failing is a real failure. Run the rest of Phase 1 verification, stage explicit paths, commit, and set the index row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs until they confirm the English version and answer the open question on the summary row.

### Phase 2 — Every other locale

Scope is the overlay layer only: two strings in each of the nine locales in `PROSE_TRANSLATED` (`es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`). No `src/locales/*.json` file changes, because every `sports.cup.*` key the card uses is already in all ten catalogs. Mechanism: `.claude/docs/prose-translation-architecture.md`.

1. **Update and splice by stamp.** In each `src/data/overlays/work/sports.<lang>.json`, update the two units at the paths in Context to the new English and its stamp, and write their `t` by changing only the year, 2026 to 2025, in that locale's existing form. Never re-extract the whole file. Keep every other character as it is.
2. **Refresh the `at` lists.** Move `charlotte-country-day:record.rows[1].cells[1].result` and `charlotte-country-day:record.rows[4].cells[0].result` from the `NONE` unit to the `RUNNER-UP` unit in each locale. No translation changes.
3. **Build the overlays** with `npm run i18n:build` for each locale, then confirm `npm run check:live` is clean. `scripts/check_work_integrity.mjs` will report these units, because it freezes existing ones. Diff against `HEAD` to confirm only the intended changes moved.
4. **Finish.** Open the PR with `--body-file`, merge with `gh pr merge --squash --delete-branch`, check out `main` and pull, set the index row to `Implemented`, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `src/data/sportsPrograms/charlotte-country-day.ts` | edit: `cup` block, six corrections, comments |
| `scripts/check_cup_ledger.mjs` | edit: single-win fixture |
| `src/data/schools.json`, `.claude/docs/*`, `src/content/*` | ingest output, sports only |
| `.claude/docs/DATA-SCHEMA.md` | regenerated, if its counts move |
| `src/data/overlays/work/sports.*.json`, `src/data/overlays/sports.*.json` | Phase 2: two strings plus two `at` moves per locale |
| `.claude/plans/ccdcup.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:cup` passes, including the new fixture and the rule that every `pointSources` entry is a sport in `CUP_SPORTS`.
- [ ] `npm run check:metrics` passes with no new ⚠️ subtopic, and `npm run check:schema` passes.
- [ ] `npm run build` fails only at `check:live`, only on the two edited notes.
- [ ] Browser check of `/school/charlotte-country-day` with the Sports `<details>` open: the Cup card is second, after Sports Offered. Headline `NCISAA 4A Wells Fargo Cup winner, 2021–22.`, also as the collapsed teaser. No subhead. Tiles `1 / 6`, `690` (2023–24), `−90` against Providence Day, `237.5` fall.
- [ ] Table: 19 rows with Country Day selected; newest column first. Country Day reads 3rd, 3rd, 2nd, 3rd, 1st, 2nd. The summary row is labelled `Charlotte Country Day lead over 2nd place` and reads `—, —, —, —, +27.5, —`. Greensboro Day and Wake Christian show `In 3A` for their last four seasons, and Forsyth Country Day for its first four.
- [ ] Bars heading reads `2025–26 · how the race finished`: Country Day 237.5 / 142.5 / 222.5, Providence Day 222.5 / 200 / 270. No comeback line.
- [ ] Eight rows under Where Charlotte Country Day's points come from, in the order of step 2; girls lacrosse shows runner-up only; the matching sports are outlined, with girls and boys tennis each in the right season.
- [ ] Winning Record: field hockey 2024–25 shows Runner-up 15–4; girls cross country 2023–24 shows Runner-up; girls tennis shows 20–0 and 19–0; both notes read 2025; the girls lacrosse bar shows 18–4.
- [ ] Providence Day's and Charlotte Latin's cards are unchanged. Charlotte Catholic, Trinity and Charlotte Prep render no Cup card.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open. Build-gate exception as above.

### Phase 2 — Locales

- [ ] `npm run check:live` and `npm run check:runtime` pass, and `npm run build` is fully green.
- [ ] `npm run check:dates` passes, and `check:sepdrift` passes for each locale.
- [ ] Real-browser check of the open card in `es`, `fa`, `ar` and `hi`: `+27.5`, `−90` and every season range read correctly, the single-win headline is translated, both notes render translated, and the two moved cells show the locale's runner-up word.
- [ ] `npm run audit:daterender` reports no new English date.

## Risks

| Risk | Mitigation |
|---|---|
| The single-win path has a defect no fixture reaches | It runs here for the first time on a real page, so the browser checks assert each piece |
| A stale overlay silently renders English in Phase 2 | `check:live` names the two notes until each resolves |
| A year in the list came from one source only | Evidence per year is in the source file; girls track 2022 rests on the Observer's report, and girls track 2023 on the school's list and a rankings story |

## Open questions

- Should a school that won some seasons but not others show its gap in the other seasons? Today the summary row is all-or-nothing, so Country Day shows `+27.5` once and five dashes, while Latin, with no wins, shows a gap in all six. The fix is in the shared `CupTable`, a signed row with a new label, and it would also change PD's 2021–22 cell from a dash to `−55`. That is a change to a shipped card and a new `sports.cup.*` string in ten catalogs, so it is left out. — **default:** ship the row as computed, which is accurate, and decide at the Phase 1 review. If the user wants the fix, it joins this PR before Phase 2.

## Implementation notes

- **Open question resolved by default.** The user approved the English with the summary row as computed, so `CupTable` is unchanged. Country Day reads `—, —, —, —, +27.5, —`.
- **Stamps.** The two notes moved from `bd0ba0b9` and `6323c581` to `4de448a0` and `6023c0c8`. Units `7b84d2bf` (`RUNNER-UP`) and `732a0f1b` (`NONE`) kept their translations and changed only their `at` lists.
- **`check_work_integrity.mjs` reports 54 violations here, all expected:** 6 per locale on those four units. It freezes existing units, so a deliberate correction trips it. A diff against `HEAD` confirmed no other unit moved.
- **Italian `Four-peat` stays.** The Italian note keeps the English word. The step changes only the year, so it was left as shipped.
- **Follow-up, found during Phase 2, not fixed here.** `ResultCell` in `src/components/SportsProgram.tsx` compares `cell.result` with the English `'NONE'` and `'RUNNER-UP'`, but the overlay has already replaced that value in a translated locale. Every result cell then takes the winner branch: 18 of 18 `sports-chip` on Country Day in `es` and `hi` and 21 of 21 on Latin in `fr`, against 10 winner, 4 runner-up and 4 dash in `en`. So a non-win renders as a filled chip reading the locale's word for `NONE`, and the `3rd at state` record that English hides appears beneath it. It affects the Winning Record card in all nine locales and predates this plan.
