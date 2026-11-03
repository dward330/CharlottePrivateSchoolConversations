---
name: hickorygrovecup
title: Turn on the Wells Fargo Cup card for Hickory Grove Christian
status: implemented
phases: 1
created: 2026-11-02
branch: feat/hickorygrovecup
prs: []
---

# Turn on the Wells Fargo Cup card for Hickory Grove Christian

## Goal

Hickory Grove Christian becomes the eleventh and last roster high school with the Wells Fargo Cup card, second in its Sports area, showing six official NCISAA seasons and three verified point sources. It worked when `/school/hickory-grove-christian` shows the card with the figures in Verification.

## Prerequisite

**Branch `fix/hickorygrovetitles` must be merged to `main` first.** It carries the source file below, its ingest, the corrections from seven team titles to twelve, softball's 2022 and 2023 finals, the baseball final scores and the repointed school URLs. If `grep -n "Twelve NCISAA" src/data/sportsPrograms/hickory-grove-christian.ts` finds nothing on `main`, stop and say so.

## Context

- **The card is data-driven.** `src/lib/wellsFargoCup.ts` computes everything from `src/data/wellsFargoCup.ts`. A `cup` key in `src/data/sportsPrograms/hickory-grove-christian.ts` turns the card on. No component change is expected, and a needed one means the shared logic has a gap, so say so rather than special-casing the school.
- **Nearest model:** `src/data/sportsPrograms/gaston-day.ts`, its `cup` block and banners.
- **The ledger needs nothing.** Planning compared all 407 NCISAA rows and 36 leaders with the published tables and found no mismatch. Hickory Grove played 3A all six seasons and every placed 3A row is held. `CUP_FIELD_SIZES` still matches and no newer season is posted. All 3A schools already have homepages in the master.
- **Compare does not move.** `cup-finish` stays `18th of 26` and `cup-titles` stays `0`.
- **Never-won state.** The headline is the best-finish form, as on Cannon, Charlotte Christian, Covenant Day and Carmel Christian.
- **The school file already has `ARCHIVE`,** added by the prerequisite branch.

## Decisions

- **Three point sources:** baseball, softball, boys track, most combined finishes first. Softball has no title in these six seasons, so its row shows runner-up years only, as Gaston Day's boys tennis does.
- **Single-phase — adds no user-facing text.** The `cup` block holds keys, years and source labels, which i18n skips (`*.sources[].label`), and there are no new `sports.cup.*` keys.

## Approvals needed

**None.** The card exists, and adding a school to it is data only.

## Source material

Already ingested by the prerequisite branch: `source-material/sports/hickory-grove-christian/Hickory Grove Christian - Sports - Wells Fargo Cup Standings 2020-2026.md`. No ingest is needed here.

## Out of scope

- **The Coaching card's stale names.** The school's pages now give Brittany Balser for softball, Meredith Gentili for swimming and Rachel Little for winter cheer. Those are a separate correction.
- Any ledger row, Compare row, prose change, component change, or deploy.

## Steps

1. **Branch.** `git checkout -b feat/hickorygrovecup` from `main`, after confirming the prerequisite.

2. **Add the `cup` block** to `src/data/sportsPrograms/hickory-grove-christian.ts`.

   Add these constants beside `ARCHIVE`:
   ```ts
   const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
   const TRACK_25 = 'https://admin.ncisaa.org/uploads/Docs/NCISAA%20D2%20FInal%20Results.pdf'
   ```
   Add after `offered`:
   ```ts
   /* -------------------------------------------------------------- 1b cup -- */
   cup: {
     pointSources: [
       { sport: 'baseball', gender: 'boys', season: 'spring', titleYears: [2021, 2023], runnerUpYears: [2024] },
       { sport: 'softball', gender: 'girls', season: 'spring', titleYears: [], runnerUpYears: [2022, 2023] },
       { sport: 'trackField', gender: 'boys', season: 'spring', titleYears: [2025] },
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
       { label: 'NCISAA baseball bracket, 2020–21', url: `${ARCHIVE}1&years=2020-2021` },
       { label: 'NCISAA baseball bracket, 2022–23', url: `${ARCHIVE}1&years=2022-2023` },
       { label: 'NCISAA baseball bracket, 2023–24', url: `${ARCHIVE}1&years=2023-2024` },
       { label: 'NCISAA softball bracket, 2021–22', url: `${ARCHIVE}21&years=2021-2022` },
       { label: 'NCISAA softball bracket, 2022–23', url: `${ARCHIVE}21&years=2022-2023` },
       { label: 'NCISAA track and field results, 2024–25', url: `${ARCHIVE}22&years=2024-2025` },
       { label: 'NCISAA Division II track results, 2025', url: TRACK_25 },
     ],
   },
   ```
   Re-letter the banners: `record` to `1c`, `pipeline` to `1d`, `honors` to `1e`, `coaching` to `1f`. In the header comment, change "Five of the seven cards" to "Six of the eight cards", `1f Facilities` to `1g`, and `1g National Stage & NIL` to `1h`.

3. **Pin the card in `check:cup`.** In `scripts/check_cup_ledger.mjs`, after the Gaston Day fixture, add:
   ```js
   eq('Hickory Grove lead over next', cup.leadOverNext('hickory-grove-christian'), [5, 12.5, 7.5, 7.5, 5, 2.5])
   eq('Hickory Grove best finish', [cup.headlineStats('hickory-grove-christian').bestFinish.place, cup.headlineStats('hickory-grove-christian').bestFinish.season], [8, '2022–23'])
   eq('Hickory Grove table', cup.divisionRows('hickory-grove-christian').length, 27)
   ```

4. **Record the new rules.**
   - In `.claude/skills/wells-fargo-cup/SKILL.md`, Step 3, add: a bracket loser earns the average of the places its round shares, so a quarterfinal loser is 22.5 in an eight-team bracket, 25 in seven and 27.5 in six, which matters in football, whose brackets vary; and a school's title list can stop early as well as over-claim (Hickory Grove's omits softball's 2022 and 2023 finals and its 2025 track team title).
   - In `scripts/gen_data_schema.mjs`, after the `A title count must fit the published term totals` rule near line 460, add the bracket-size rule in one sentence, then run `npm run schema`.
   - In `.claude/SKILLS.md`, in the `wells-fargo-cup` entry, add: `With Hickory Grove (plan hickorygrovecup), every roster high school has the card, so the skill next runs for a newly added high school.`

5. **Finish.** Run the verification, stage explicit paths, commit, push, open the PR with `--body-file`, set the index row to `Implemented`, merge with `gh pr merge --squash --delete-branch`, check out `main` and pull, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `src/data/sportsPrograms/hickory-grove-christian.ts` | edit: `cup` block, two constants, comments |
| `scripts/check_cup_ledger.mjs` | edit: three fixtures |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | edit and regenerate |
| `.claude/skills/wells-fargo-cup/SKILL.md`, `.claude/SKILLS.md` | edit: new rules |
| `.claude/plans/INDEX.md`, `.claude/plans/hickorygrovecup.md` | status |

## Verification

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:cup` passes, including the new fixtures, and every earlier school's fixture is unchanged.
- [ ] `npm run check:schoolurls` and `npm run check:schema` pass, and `npm run build` is fully green.
- [ ] Real-browser check of `/school/hickory-grove-christian` with the Sports `<details>` open: the Cup card is second, after Sports Offered. Headline `Best finish: 8th in NCISAA 3A, 2022–23.`, also as the collapsed teaser. Tiles: 0 Cups won, peak 237.5 (2022–23), −340 gap behind Cape Fear Academy in 2025–26, and 62.5 spring points as the best season.
- [ ] Table: heading `6 years · every NCISAA 3A school`, 27 rows, Hickory Grove 18th and in view on load, newest column first: 18th, 12th, 15th, 8th, T13th, 16th. The summary row, newest first, reads 2.5, 5, 7.5, 7.5, 12.5, 5. Davidson Day shows `In 2A` for 2020–21 to 2023–24 and links to its page. Forsyth Country Day shows `In 4A` for the last two seasons and sits last. Thales Academy Rolesville shows an em dash in 2024–25.
- [ ] Bars heading reads `2025–26 · how the race finished`: Hickory Grove 25 / 22.5 / 62.5, Concord Academy 0 / 115 / 0. No comeback line.
- [ ] Three rows under the point-sources heading, baseball first. Softball shows runner-up years only and boys track a title only, each with no stray separator. All three are outlined on the sports grid.
- [ ] Compare is unchanged: `18th of 26`, `0`.
- [ ] Davidson Day's table is still 53 rows, and the other ten Cup cards are unchanged. Trinity and Charlotte Prep render no Cup card.
- [ ] The open card in `es`, `fa`, `ar` and `hi`: `237.5`, `−340`, every season range, `3A` and `In 2A` read correctly, and the best-finish headline is translated.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open.

## Open questions

None.

## Implementation notes
