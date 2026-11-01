---
name: cannoncup
title: Turn on the Wells Fargo Cup card for Cannon, and correct the softball result filed as baseball in its Winning Record card
status: implemented
phases: 2
created: 2026-11-01
branch: feat/cannoncup
prs: [390]
---

# Cannon Wells Fargo Cup card

## Goal

Cannon becomes the fourth school with the Wells Fargo Cup card, second in its Sports area. The card shows six seasons of official NCISAA results and seven verified point sources, all computed from the shared ledger. The same pass corrects the Winning Record card, which credits a 2026 softball runner-up finish to baseball, so the two cards do not disagree.

## Context

- **The card is live** for Providence Day (PD, plan `wellsfargocup`, #383, #384), Charlotte Latin (plan `latincup`, #386) and Charlotte Country Day (plan `ccdcup`, #388). A `cup` key in a school's module turns it on: `SchoolDetail.tsx` renders a card when `sports[c.key] != null`. The body is `WellsFargoCupBody` in `src/components/SportsProgram.tsx`, and everything it prints comes from `src/lib/wellsFargoCup.ts` reading the ledger in `src/data/wellsFargoCup.ts`.
- **Cannon's rows are already in the ledger.** So is the whole of 4A, and `check:cup` fails if a card's division is incomplete. The ledger needs no edit.
- **Cannon runs the never-won path, like Latin.** `cupsWon` is 0, so the headline uses `sports.cup.headlineNever`, the subhead hides, the third tile uses `tileGap`, the bars use `raceResult`, and the table's summary row is the gap row (`gapRow`), because `CupTable` sets `won = lead.some((v) => v != null)`.
- **Types:** `CupProgram` and `CupPointSource` in `src/data/sportsProgram.ts`. Country Day's block at `src/data/sportsPrograms/charlotte-country-day.ts:91` is the model. Its citation constant `CUP_BASE` is local to that file, so Cannon defines its own.
- **Citation labels are English by design:** `*.sources[].label` is `false` in `PATH_OVERRIDES` and `SourceRow` runs with `localizeLabels={false}`, so `cup` adds no overlay entries.
- **The baseball error.** `record.rows[3]` in `src/data/sportsPrograms/cannon.ts:115` reads Baseball, RUNNER-UP, `swept 7–5, 9–5`, `Lost the D1 series to Covenant Day`. The NCISAA softball bracket for 2025–26 prints those two scores against Covenant Day, and Cannon is not in the 2025–26 4A baseball bracket. `record.didNotWin` at line 143 repeats it. The same row sits at line 45 of `source-material/sports/cannon/Cannon - Sports - Redesign Research 2026.md`, which feeds `.claude/docs/sports/cannon.md` and `src/content/sports/cannon.json`. Nothing else in `src/data` repeats it, and no Compare row carries a Cannon title count.
- **Which strings translate.** `program` is a skipped field (`scripts/i18n_fields.mjs:208`) and `cells[].result` is pinned as not prose (`scripts/i18n_fields.mjs:335`, #389). `cells[].record` is skipped. So the row edit needs no locale work, and the unchanged note keeps its translations at `cannon:record.rows[3].note`. Only `didNotWin` is prose: one unit in each `src/data/overlays/work/sports.<lang>.json`, stamp `620ed6c0`, `at: ["cannon:record.didNotWin"]`.
- **Ingest:** the first `sports` rule in `RULES` (`src/lib/metrics.ts:265`) already folds `wells fargo cup` headings, and `## Method` is dropped.

## Decisions

- **Ledger unchanged.** All 132 NCISAA rows and all 36 leaders match the six official tables, and all 102 official 4A rows are present. No newer season is posted. See `## Method` in the source file.
- **Headline stays as computed:** `Best finish: 4th in NCISAA 4A, 2023–24.` `bestFinish` takes the most recent of the two 4th places. No Cannon wording.
- **Seven point sources.** A sport is listed with at least one title or at least two runner-up years, the same bar as the other three schools. This drops one confirmed single runner-up finish, girls track 2026, which stays in the source file. Order is most titles first, then runner-ups.
- **Football is listed.** The bracket enters the 2021 Division II champion as `Cannon - Concord Academy`, and the Cup tables show co-op points being shared. The title is confirmed, and the card states no point value per sport, so nothing it prints overclaims. The co-op detail stays in the source file.
- **Softball replaces Baseball in place at `rows[3]`.** Cannon has no baseball result to report, so a Baseball row is dropped rather than kept beside it. The note stays verbatim, which is true of the 2026 cell and needs no translation.
- **The 2023–24 softball cell has no `record`.** The bracket gives series scores, and a cell record in words would render English in every locale.
- **Volleyball stays 23–2.** The title story gives 23–2 and names both losses, while the bracket's last cell reads 22–2. Recorded in the source file.
- **`didNotWin` keeps its order.** Softball takes baseball's position, and `baseball (Charlotte Christian)` follows it.
- **Two-phase only because of `didNotWin`.** The Cup block adds no translated text. Keeping it in one PR means the Cup and Record cards ship consistent.
- **Name:** `cannoncup`, the skill's own form.

## Approvals needed

**None.** The card already exists, and adding a school to it is data only, needing no UX approval. The corrections change data behind existing cards. The user sees the corrected wording at the Phase 1 review.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/cannon/Cannon - Sports - Wells Fargo Cup Standings 2020-2026.md`: Cannon's six seasons, the seven point sources with evidence per year, what was dropped and why, the corrections above, the disagreement, reach limits and every URL.

## Out of scope

- Any addition to the Winning Record card for the boys lacrosse titles of 2022 and 2023, softball 2023 or the 2021 titles. They fall outside its three-season window. See Open questions.
- Editing the volleyball 23–2, or any cell the official record does not contradict.
- `Cannon - Sports - Championships.pdf`, which is gitignored and already says the series was unconfirmed.
- Any other school's Cup card, Compare rows, or a deploy.

## Steps

### Phase 1 — English

1. **Branch, correct the research note, ingest.** Create `feat/cannoncup` from an up-to-date `main`. In `source-material/sports/cannon/Cannon - Sports - Redesign Research 2026.md` line 45, replace the row with:
   ```
   | Softball | RUNNER-UP (D1) | — | RUNNER-UP (D1), swept 7–5, 9–5 |
   ```
   Do this before the ingest, so the generated docs pick it up. Then follow the `ingest-source-material` skill for the `sports` topic only (`build_docs.py sports`), and diff `src/data/schools.json` against `HEAD` so no other topic was swept in. Run `npm run check:metrics`; no new ⚠️ subtopic should appear.

2. **Add the `cup` block.** In `src/data/sportsPrograms/cannon.ts`, add beside `CHAMPS_26`:
   ```ts
   const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
   const ARCHIVE = 'https://archives.ncisaa.org/index.php?sport='
   ```
   Then insert this between `offered` and `record`, with a `1b cup` banner matching Country Day's:
   ```ts
   cup: {
     pointSources: [
       { sport: 'basketball', gender: 'girls', season: 'winter', titleYears: [2021, 2024, 2025, 2026], runnerUpYears: [2023] },
       { sport: 'lacrosse', gender: 'boys', season: 'spring', titleYears: [2022, 2023, 2024] },
       { sport: 'softball', gender: 'girls', season: 'spring', titleYears: [2023], runnerUpYears: [2021, 2022, 2024, 2026] },
       { sport: 'volleyball', gender: 'girls', season: 'fall', titleYears: [2023], runnerUpYears: [2020, 2022] },
       { sport: 'basketball', gender: 'boys', season: 'winter', titleYears: [2021] },
       { sport: 'golf', gender: 'boys', season: 'spring', titleYears: [2021] },
       { sport: 'football11', gender: 'boys', season: 'fall', titleYears: [2021] },
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
       { label: 'NCISAA football bracket, 2021–22', url: `${ARCHIVE}31&years=2021-2022` },
       { label: 'NCISAA 2021 boys golf 4A team results', url: 'https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%204A%20Team%20Results%20(1).pdf' },
       { label: 'Charlotte Observer — 2021 boys basketball final', url: 'https://news.yahoo.com/repeat-cannon-school-beats-carmel-231728353.html' },
       { label: 'MaxPreps — 2021 Division II football final', url: 'https://www.maxpreps.com/nc/concord/cannon-cannon-concord-academy-cougars/football/schedule/all-time' },
     ],
   },
   ```
   Re-letter the banners: `record` to `1c`, `pipeline` to `1d`, `honors` to `1e`, `coaching` to `1f`, `facilities` to `1g`, and the closing comment at line 442 to `1h National Stage & NIL`. In the header comment, name the new source file for the Cup card and the softball correction, change "SIX of seven cards" to "SEVEN of eight cards", and `(1g)` to `(1h)`.

3. **Correct the softball row.** Replace `record.rows[3]` with:
   ```ts
   {
     program: 'Softball',
     cells: [
       { result: 'RUNNER-UP' },
       { result: 'NONE' },
       { result: 'RUNNER-UP', record: 'swept 7–5, 9–5' },
     ],
     note: 'Lost the D1 series to Covenant Day',
   },
   ```

4. **Correct `didNotWin`.** In `record.didNotWin`, change `baseball, in the D1 series (Covenant Day)` to `softball, in the D1 series (Covenant Day) · baseball (Charlotte Christian)`. Change nothing else in the string.

5. **Add a Cannon fixture.** In `scripts/check_cup_ledger.mjs`, after `eq('CCD gap row', …)` at line 143, add:
   ```js
   eq('Cannon lead row', cup.leadRow('cannon'), [null, null, null, null, null, null])
   eq('Cannon gap row', cup.gapBehindFirst('cannon'), [206.25, 265, 392.5, 387.5, 270, 285])
   eq('Cannon best finish', [cup.headlineStats('cannon').bestFinish.place, cup.headlineStats('cannon').bestFinish.season], [4, '2023–24'])
   ```

6. **Regenerate and check.** Run `npm run schema` and `npm run check:schema`, `npm run check:cup`, then `npm run build`. Expect `check:live` to fail on the edited `didNotWin` only, until Phase 2. Anything else failing is a real failure. Run the rest of Phase 1 verification, stage explicit paths, commit, and set the index row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs until they confirm the English version.

### Phase 2 — Every other locale

Scope is the overlay layer only: one string in each of the nine locales in `PROSE_TRANSLATED` (`es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`). No `src/locales/*.json` file changes, because every `sports.cup.*` key the card uses is already in all ten catalogs. Mechanism: `.claude/docs/prose-translation-architecture.md`.

1. **Update and splice by stamp.** In each `src/data/overlays/work/sports.<lang>.json`, update the unit stamped `620ed6c0` to the new English and its stamp, and edit its `t` by swapping that locale's baseball word for its softball word in the existing clause, then adding the locale's baseball word with `(Charlotte Christian)` as a new `·` item directly after it. Take the softball word from the locale's own rendering of `Softball` if the catalogs or overlays hold one, and keep every other character as it is. Never re-extract the whole file.
2. **Build the overlays** with `npm run i18n:build` for each locale, then confirm `npm run check:live` is clean. `scripts/check_work_integrity.mjs` will report this unit, because it freezes existing ones. Diff against `HEAD` to confirm only the intended change moved.
3. **Finish.** Open the PR with `--body-file`, merge with `gh pr merge --squash --delete-branch`, check out `main` and pull, set the index row to `Implemented`, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `src/data/sportsPrograms/cannon.ts` | edit: `cup` block, softball row, `didNotWin`, comments |
| `scripts/check_cup_ledger.mjs` | edit: Cannon fixture |
| `source-material/sports/cannon/Cannon - Sports - Redesign Research 2026.md` | edit: line 45 |
| `source-material/sports/cannon/Cannon - Sports - Wells Fargo Cup Standings 2020-2026.md` | new, already written |
| `src/data/schools.json`, `.claude/docs/*`, `src/content/*` | ingest output, sports only |
| `.claude/docs/DATA-SCHEMA.md` | regenerated, if its counts move |
| `src/data/overlays/work/sports.*.json`, `src/data/overlays/sports.*.json` | Phase 2: one string per locale |
| `.claude/plans/cannoncup.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:cup` passes, including the new fixture and the rule that every `pointSources` entry is a sport in `CUP_SPORTS`.
- [ ] `npm run check:metrics` passes with no new ⚠️ subtopic, and `npm run check:schema` passes.
- [ ] `grep -n "swept 7" .claude/docs/sports/cannon.md` shows the row under Softball, with no Baseball row.
- [ ] `npm run build` fails only at `check:live`, only on `cannon:record.didNotWin`.
- [ ] Browser check of `/school/cannon` with the Sports `<details>` open: the Cup card is second, after Sports Offered. Headline `Best finish: 4th in NCISAA 4A, 2023–24.`, also as the collapsed teaser. No subhead. Tiles `0 / 6`, `463.75` (2020–21), `−285` against Providence Day, `230` spring. Confirm `463.75` keeps both decimals.
- [ ] Table: 19 rows with Cannon selected, fifth in order; newest column first. Cannon reads 5th, 5th, 4th, 5th, 5th, 4th. The summary row is labelled `Points behind 1st` and reads `285, 270, 387.5, 392.5, 265, 206.25`. Greensboro Day and Wake Christian show `In 3A` for their last four seasons, and Forsyth Country Day for its first four.
- [ ] Bars heading reads `2025–26 · how the race finished`: Cannon 80 / 97.5 / 230, Providence Day 222.5 / 200 / 270. No comeback line.
- [ ] Seven rows under Where Cannon's points come from, in the order of step 2; the matching sports are outlined, with girls and boys basketball each marked correctly, and 11-man football rather than 8-man.
- [ ] Winning Record: the row reads Softball with Runner-up in 2023–24 and 2025–26, the latter showing `swept 7–5, 9–5`; no Baseball row; `didNotWin` reads softball (Covenant Day) and baseball (Charlotte Christian).
- [ ] The PD, Latin and Country Day cards are unchanged. Charlotte Catholic, Trinity and Charlotte Prep render no Cup card.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open. Build-gate exception as above.

### Phase 2 — Locales

- [ ] `npm run check:live` and `npm run check:runtime` pass, and `npm run build` is fully green.
- [ ] `npm run check:dates` passes, and `check:sepdrift` passes for each locale.
- [ ] Real-browser check of the open card in `es`, `fa`, `ar` and `hi`: `463.75`, `−285` and every season range read correctly, the never-won headline is translated, and `didNotWin` names softball and baseball correctly in the Winning Record card.
- [ ] `npm run audit:daterender` reports no new English date.

## Risks

| Risk | Mitigation |
|---|---|
| A `.75` figure is the first on any Cup card | The table and peak tile both print it, so the browser check asserts both decimals, in `en` and in the RTL locales |
| A stale overlay silently renders English in Phase 2 | `check:live` names `didNotWin` until it resolves |
| Reach limits hide a golf or track title | The champion lists rule out a Cannon title in every year read; the unread years are listed in the source file, and a later find adds a point source without touching the shared logic |

## Open questions

- Should the Winning Record card say more about the boys lacrosse three-peat (2022–2024) and the softball run? Its table covers three seasons, so only the 2024 title shows, and the Cup card's list now carries all three. — **default:** no change, as nothing printed is wrong. If the user wants a sentence at the Phase 1 review, it joins this PR before Phase 2 as one more string.

## Implementation notes

Shipped in [#390](https://github.com/dward330/CharlottePrivateSchoolConversations/pull/390). The data, wording and card match the plan. Small differences:

- **Ingest:** step 1 names only `build_docs.py`. The skill's next step, `scripts/build_site_content.py`, also ran, because `src/content/sports/cannon.json` needs it. The other 12 sports notes changed only in their rebuild date.
- **Summary row sign:** it prints `−285 … −206.25`, not the unsigned figures in the verification list. This is the card's normal format, and Latin's row prints the same way.
- **`es` decimals:** `463.75` renders `463,75`, like every other figure in that locale's card.
- **Overlay build:** run per locale as `node scripts/i18n_build_overlay.mjs --topic sports --lang <code>`.
- **Softball word:** `es` uses `sóftbol`, its prose form, rather than the chip's `Softball`.
- **Phase 2 window:** it ran in the Phase 1 window, since it was one string.
- **Mobile audit:** `audit:mobile` ran on the English build only. It was not repeated with `--lang` for translated locales, because Phase 2 changed one prose string.
