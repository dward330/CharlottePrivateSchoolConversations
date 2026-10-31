---
name: latincup
title: Turn on the Wells Fargo Cup card for Charlotte Latin, and correct four facts in its Sports data
status: implemented
phases: 2
created: 2026-10-31
branch: feat/latincup
prs: [386]
---

# Charlotte Latin Wells Fargo Cup card

## Goal

Charlotte Latin becomes the second school with the Wells Fargo Cup card, second in its Sports area. The card shows six seasons of official NCISAA results and nine verified point sources, all computed from the shared ledger. The same pass corrects four facts in Latin's existing Sports data that the official record contradicts, so the Cup card and the Winning Record card beside it do not disagree.

## Context

- **The card is live for Providence Day (PD)**, from plan `wellsfargocup` (#383, #384). A `cup` key in a school's module turns it on: `SchoolDetail.tsx` renders a card when `sports[c.key] != null`. The body is `WellsFargoCupBody` in `src/components/SportsProgram.tsx`, and everything it prints comes from `src/lib/wellsFargoCup.ts` reading the ledger in `src/data/wellsFargoCup.ts`.
- **Latin's rows are already in the ledger.** So is the whole of 4A, and `check:cup` fails if a card's division is incomplete. The ledger needs no edit.
- **Latin is the first school on the never-won path.** It renders today with no component change: `cupHeadlineText` falls to `sports.cup.headlineNever`, `CupTable` shows the gap row, `CupRace` uses `raceResult`, the subhead hides, and the third tile uses `tileGap`. `check:cup` covers this path with fixtures only, so the browser check below is its first real run.
- **Types:** `CupProgram` and `CupPointSource` in `src/data/sportsProgram.ts`. PD's block at `src/data/sportsPrograms/providence-day.ts:96` is the model. Its citation constant `CUP_BASE` is local to that file, so Latin defines its own.
- **Citation labels are English by design:** `*.sources[].label` is `false` in `PATH_OVERRIDES` and `SourceRow` runs with `localizeLabels={false}`, so `cup` adds no overlay entries.
- **The corrections are research prose.** Three strings live in `src/data/overlays/work/sports.<lang>.json`, keyed by stamp:

  | Stamp | Path |
  |---|---|
  | `1e692411` | `charlotte-latin:record.rows[2].note` |
  | `8a36356b` | `charlotte-latin:record.seasonDetail[2].text` |
  | `77483133` | `charlotte-latin:honors.honors[3].text` |

  `record` fields are skipped by the extractor, so the cell and bar figures need no translation.
- **Ingest:** the first `sports` rule in `RULES` (`src/lib/metrics.ts:265`) already folds `wells fargo cup` headings, and `## Method` is dropped.

## Decisions

- **Ledger unchanged.** All 132 NCISAA rows and all 36 leaders match the six official tables, and all 102 official 4A rows are present. No newer season is posted. See `## Method` in the source file.
- **Never-won headline stays as computed:** `Best finish: 2nd in NCISAA 4A, 2025–26.` No Latin-specific wording. The result that stands out, 2.5 points behind in 2025–26, already reads from the `−2.5` tile and the race bars.
- **Nine point sources.** A sport is listed with at least one title or at least two runner-up years, the bar PD's list already meets. This drops four confirmed single runner-up finishes: girls swimming 2022, and volleyball, field hockey and softball 2025. They remain in the source file.
- **Six seasons, not the record card's three.** The record card covers 2023–26, while the Cup table covers 2020–26, so point sources were rebuilt from the NCISAA archive. Years are calendar years of the event, matching PD (girls golf is 2025, girls tennis 2020).
- **Boys swimming runner-up 2026 is left off.** The record card says 2nd, but no source was found, and the official 2025–26 page posts no team scores. The record card cell stays as it is. **2022 wrestling is also left off:** no title in Latin's matrix, and no team table was found.
- **Girls lacrosse 2024–25 becomes SEMIFINAL, 12–8.** The bracket has Latin losing the semifinal 16-11 to Country Day. Its note becomes `Four straight titles through 2024, then back in the final in 2026`.
- **Field hockey 2025 becomes 17–5.** The NCISAA bracket has Latin at 17–4 before the final, and its 2023 and 2024 bracket records match the card, so the three-year bar moves from 41–19 to 42–19 and `pct` from 0.683 to 0.689.
- **Cups become 18, and "eight consecutive" goes.** Latin's own Cup page and title matrix list 18 wins. That list's longest run is seven (2005–2011), so the clause cannot stand. See Open questions.
- **Two-phase only because of those three prose strings.** The Cup block adds no translated text. Keeping both in one PR means the Cup and Record cards ship consistent.
- **Name:** `latincup`, matching `latinglobal` and `latinadmissions`, rather than the skill's literal `charlotte-latincup`.

## Approvals needed

**None.** The card already exists, and adding a school to it is data only, needing no UX approval. The corrections change data behind existing cards. The user sees the corrected wording at the Phase 1 review.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/charlotte-latin/Charlotte Latin - Sports - Wells Fargo Cup Standings 2020-2026.md`: Latin's six seasons, the nine point sources with evidence per year, what was dropped and why, the corrections above, and every URL.

## Out of scope

- PD's point sources. The official brackets also show PD winning girls soccer in 2021 and 2022, which its list omits. That is a separate decision for the user.
- Reconciling the 165 state titles on Sports Offered with the 198 in Latin's matrix.
- The 2024 wrestling score (repo 250, Observer 250.5). No official team table was reachable.
- Any other school's Cup card, Compare rows, or a deploy.

## Steps

### Phase 1 — English

1. **Branch and ingest.** Create `feat/latincup` from an up-to-date `main`. Follow the `ingest-source-material` skill for the `sports` topic only (`build_docs.py sports`), then diff `src/data/schools.json` against `HEAD` so no other topic was swept in. Run `npm run check:metrics`; no new ⚠️ subtopic should appear.

2. **Add the `cup` block.** In `src/data/sportsPrograms/charlotte-latin.ts`, add a constant beside `CHAMPS_26`:
   ```ts
   const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
   ```
   Then insert this between `offered` and `record`, with a `1b cup` banner, and change the `record` banner to `1c` and the later banners to match PD's lettering:
   ```ts
   cup: {
     pointSources: [
       { sport: 'golf', gender: 'boys', season: 'spring', titleYears: [2023, 2024, 2025, 2026], runnerUpYears: [2022] },
       { sport: 'wrestling', gender: 'boys', season: 'winter', titleYears: [2021, 2023, 2024, 2026], runnerUpYears: [2025] },
       { sport: 'lacrosse', gender: 'girls', season: 'spring', titleYears: [2021, 2022, 2023, 2024], runnerUpYears: [2026] },
       { sport: 'swimming', gender: 'boys', season: 'winter', titleYears: [2021, 2022, 2023, 2024], runnerUpYears: [2025] },
       { sport: 'soccer', gender: 'girls', season: 'spring', titleYears: [2023], runnerUpYears: [2021, 2022, 2024, 2025] },
       { sport: 'tennis', gender: 'girls', season: 'fall', titleYears: [2020, 2021], runnerUpYears: [2022] },
       { sport: 'crossCountry', gender: 'girls', season: 'fall', titleYears: [2020, 2022], runnerUpYears: [2024] },
       { sport: 'golf', gender: 'girls', season: 'fall', titleYears: [2025] },
       { sport: 'tennis', gender: 'boys', season: 'spring', titleYears: [], runnerUpYears: [2025, 2026] },
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
       { label: 'Charlotte Latin team championships', url: 'https://clshawks.com/sports/2026/3/31/cls-team-championships.aspx' },
       { label: 'High School OT — 2026 boys golf title', url: 'https://www.highschoolot.com/story/the-2026-ncisaa-4a-boys-golf-championships-scores-and-top-ten-results/22357812/' },
     ],
   },
   ```
   Extend the file's header comment the way PD's does, naming this file as the source of the point sources and the corrections, and change "SIX of seven cards" to "SEVEN of eight cards".

3. **Correct girls lacrosse** in the same file. At `record.rows[2]`, set the middle cell to `{ result: 'SEMIFINAL', record: '12–8' }` and `note` to `Four straight titles through 2024, then back in the final in 2026`.

4. **Correct field hockey.** Set the third cell of the Field Hockey row (line ~150) to `record: '17–5'`, and its `bars` entry (line ~159) to `record: '42–19', pct: 0.689`.

5. **Correct the girls golf date.** In `record.seasonDetail[2].text`, change `girls golf added a first title on a playoff hole in 2026` to `girls golf added a first title on a playoff hole in October 2025`.

6. **Correct the Cup count.** Set `honors.honors[3].text` to `Eighteen NCISAA Wells Fargo Cups for overall program excellence, most recently in 2019.`

7. **Update the skill.** In `.claude/skills/wells-fargo-cup/SKILL.md`, Step 3, add that the record card covers only three seasons while the table covers six, so point sources start from `https://archives.ncisaa.org/index.php?sport=<id>&years=<yyyy-yyyy>` (a bracket for each team sport) and the school's own title list. Add that 2020–21 brackets are mirrored, and that `ncisaa.shotstat.com` may not resolve, in which case golf rests on the school's list. Update this skill's entry in `.claude/SKILLS.md` in the same PR.

8. **Regenerate and check.** Run `npm run schema` and `npm run check:schema`, `npm run check:cup`, then `npm run build`. Expect `check:live` to fail on the three edited strings only, until Phase 2. Anything else failing is a real failure. Run the rest of Phase 1 verification, stage explicit paths, commit, and set the index row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope is the overlay layer only: three strings in each of the nine locales in `PROSE_TRANSLATED` (`es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`). No `src/locales/*.json` file changes, because every `sports.cup.*` key the card uses is already in all ten catalogs. Mechanism: `.claude/docs/prose-translation-architecture.md`.

1. **Translate and splice by stamp.** In each `src/data/overlays/work/sports.<lang>.json`, re-extract only the three stamps above against the new English and write their `t`. Never re-extract the whole file. Keep figures char-for-char, and translate the date phrase in `October 2025` per the "Dates and session labels" section of `src/data/overlays/NOTES.md`.
2. **Build the overlays** with `npm run i18n:build` for each locale, then confirm `npm run check:live` is clean.
3. **Finish.** Open the PR with `--body-file`, merge with `gh pr merge --squash --delete-branch`, check out `main` and pull, set the index row to `Implemented`, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `src/data/sportsPrograms/charlotte-latin.ts` | edit: `cup` block, four corrections, comments |
| `.claude/skills/wells-fargo-cup/SKILL.md`, `.claude/SKILLS.md` | edit: archive path and six-season rule |
| `src/data/schools.json`, `.claude/docs/*`, `src/content/*` | ingest output, sports only |
| `.claude/docs/DATA-SCHEMA.md` | regenerated, if its counts move |
| `src/data/overlays/work/sports.*.json`, `src/data/overlays/sports.*.json` | Phase 2: three strings per locale |
| `.claude/plans/latincup.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:cup` passes, including the rule that every `pointSources` entry is a sport in `CUP_SPORTS`.
- [ ] `npm run check:metrics` passes with no new ⚠️ subtopic, and `npm run check:schema` passes.
- [ ] `npm run build` fails only at `check:live`, only on stamps `1e692411`, `8a36356b` and `77483133`.
- [ ] Browser check of `/school/charlotte-latin` with the Sports `<details>` open: the Cup card is second, after Sports Offered. Headline `Best finish: 2nd in NCISAA 4A, 2025–26.` No subhead. Tiles `0 / 6`, `690` (2025–26), `−2.5` against Providence Day, `277.5` fall.
- [ ] Table: 19 rows with Latin selected; newest column first. Gap row reads `−2.5, −10, −245, −170, −27.5, −135`, labelled `Points behind 1st`. Latin reads 2nd, 2nd, 3rd, 2nd, 2nd, 3rd. Greensboro Day and Wake Christian show `In 3A` for their last four seasons.
- [ ] Bars heading reads `2025–26 · how the race finished`: Latin 277.5 / 205 / 207.5, Providence Day 222.5 / 200 / 270. No comeback line.
- [ ] Nine rows under Where Charlotte Latin's points come from, in the order above; boys tennis shows runner-up only; the matching nine sports are outlined, with girls and boys golf and tennis each outlined in the right season.
- [ ] Winning Record: girls lacrosse 2024–25 shows Semifinal 12–8 with the new note; field hockey shows 17–5 and 42–19.
- [ ] Providence Day's card is unchanged. Charlotte Catholic, Trinity and Charlotte Prep render no Cup card.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open. Build-gate exception as above.

### Phase 2 — Locales

- [ ] `npm run check:live` and `npm run check:runtime` pass, and `npm run build` is fully green.
- [ ] `npm run check:dates` passes, and `check:sepdrift` passes for each locale.
- [ ] Real-browser check of the open card in `es`, `fa`, `ar` and `hi`: `−2.5` and every season range read correctly, the Lead sentence is translated, and all three corrected strings render translated rather than falling back to English.
- [ ] `npm run audit:daterender` reports no new English date.

## Risks

| Risk | Mitigation |
|---|---|
| The never-won path has a defect the fixtures missed | It runs here for the first time on a real page, so the browser checks above assert each piece |
| A stale overlay silently renders English in Phase 2 | `check:live` names the three stamps until each resolves |
| A year in the list came from one source only | Evidence per year is in the source file; 2022 girls cross country rests on the school's matrix alone |

## Open questions

- Should the Honors line keep any "eight" claim, such as eight Cups under Jimmy Broadway? Latin's list gives 11 wins in that tenure's years (1993–2012), and no run of eight. — **default:** drop the clause, as step 6 does. The user can restore wording at the Phase 1 review.

## Implementation notes

- **`record` is not fully skipped.** Context says `record` fields need no translation, but `cells[].result` is extracted: `RUNNER-UP` and `SEMIFINAL` are shared units. Moving girls lacrosse 2024–25 also moved `charlotte-latin:record.rows[2].cells[1].result` from unit `7b84d2bf` to `6afcd109`, so Phase 2 refreshed those two `at` lists. No translation changed for them.
- **New stamps.** The three corrected strings are now `924d52c2` (lacrosse note), `9899f456` (golf text) and `14ef612e` (Cups).
- **`check_work_integrity.mjs` reports 72 violations here, all expected:** 8 per locale on those five units. It freezes existing units, so a deliberate correction trips it. A diff against `HEAD` confirmed only the three `t` values changed. It is not an npm script or a build gate.
- **Arabic Cups line reworded, not just renumbered.** The old `سبعة عشر كأس` has the wrong gender and number agreement, so the new string uses `ثماني عشرة كأسًا من كؤوس Wells Fargo`.
- **Left unfixed: the `season` override does not match.** `['*.cup.pointSources[].season', false]` in `scripts/i18n_fields.mjs` needs a segment before `cup`, but the extractor's path starts at `cup`, so `pathOverride` returns `undefined`. A fresh extract therefore emits `fall`, `spring` and `winter` as prose, for Providence Day too. Nothing ships today because neither school's splice included them. If one were ever translated, the Cup outlines would stop matching. The fix is to drop the `*.` prefix.
