---
name: charlottecatholiccup
title: Turn on the Wells Fargo Cup card for Charlotte Catholic, the first NCHSAA card, make the card's wording association-aware, and correct the school's Cup count and 2026 title count
status: english-done
phases: 2
created: 2026-11-02
branch: feat/charlottecatholiccup
prs: []
---

# Charlotte Catholic Wells Fargo Cup card

## Goal

Charlotte Catholic becomes the ninth school with the Wells Fargo Cup card, second in its Sports area, with six verified NCHSAA seasons and nine point sources. It is the first card from the public-school association, so unlike every card before it this one is **not data only**: three card sentences are false for the NCHSAA and `check:cup` has two gaps. The same pass fills its `n/a` on Compare, and corrects the school's Cup count from 8 to 10 and its 2026 title count from three to four.

## Context

- **The card is live** for eight NCISAA schools. A `cup` key in a school's module turns it on: `SchoolDetail.tsx` renders a card when `sports[c.key] != null`, in `SPORTS_CARDS` order. The body is `WellsFargoCupBody` in `src/components/SportsProgram.tsx`, and everything it prints comes from `src/lib/wellsFargoCup.ts` reading `src/data/wellsFargoCup.ts`. `.claude/plans/davidsondaycup.md` is the closest precedent, including its `## Implementation notes`.
- **The ledger holds one Charlotte Catholic row,** the 2025–26 row at `src/data/wellsFargoCup.ts:266`. It is correct. `CUP_SHORT_NAMES` already has the school. `CUP_DIVISION_LEADERS` holds NCISAA rows only.
- **The computed card, from the real functions on a scratch ledger:** `cupsWon` 1, `seasonsTotal` 6, `lastWin` and `peak` 2025–26, `latestMargin` +75 over Watauga, `currentStreak` 1, `classLabel` `3A / 4A / 6A`, `leadOverNext` `[15, 5, 25, 37.5, 35, 75]`, `divisionRows` 21 rows, `nearestRival` null, `bestSeason` null, `isComeback` false.
- **It runs the single-title path, with a win in the latest season, which no card has yet shown.** Headline: `NCHSAA 6A Wells Fargo Cup winner, 2025–26.` (`sports.cup.headlineSingle`). The subhead shows: `The 2025–26 title was decided by 75 points: 655 to Watauga's 580.` Three tiles, not four: `1 / 6`, `655`, `+75`.
- **Hidden splits render for the first time on a real page.** The NCHSAA publishes no fall, winter or spring totals, so `showRace` is false, `CupRace` returns null, the best-season tile drops, and `.cup-panels` takes `is-single` with point sources alone. All of this is fixture-tested and has never rendered.
- **Three card sentences are false for the NCHSAA:**
  - `sports.cup.tableTitle_*`: `6 years · every NCHSAA 3A / 4A / 6A school`. The association publishes only the top 10 per class, and the top 5 in 2025–26.
  - `sports.cup.what3`: `Points come only from official state championships.` The NCHSAA also awards five participation points per playoff sport. `pointsHint` has the same gap.
  - `sports.cup.sportsHint`: its last sentence, `Football divisions each score separately`, describes the NCISAA's 11-man and 8-man. `CUP_SPORTS.NCHSAA` has one football entry.

  `what1`, `what2`, `tieRule`, `pointsFirst`, `pointsSecond`, the points grid and every tile hold true. The NCHSAA pays the same 50 to 15 and splits ties the same way.
- **`check:cup` has two gaps this school hits** (`scripts/check_cup_ledger.mjs`):
  - Line 80 keys duplicate leaders on `classification|season|place`, with no association. NCHSAA 3A 2020–21 and 4A rows would collide with the NCISAA's and fail as duplicates. `leaderAt` in `src/lib/wellsFargoCup.ts` already matches on association, so only the checker is wrong.
  - Lines 402–417: once Watauga is a leader, `seasonRival` is non-null and the check demands the exact text `655 points. Watauga was second with 580.`. The cell's tooltip today is `655 points, ahead of Watauga with 580 and East Chapel Hill with 515. The NCHSAA is a separate association, so its points do not compare with NCISAA points.` That caveat matters on a page comparing the two associations.
- **`check:cup`'s "division incomplete" rule still passes** on top-10 lists, because it only asks that `field.length >= last place`.
- **Compare moves.** `cup-titles` for Charlotte Catholic is `null` today, with a sentence in the row's `note` saying so. A six-season record makes `check:cup` require value `1`, sub `Top 3 in 2 of 6`, and a `quals` tooltip naming `2025–26`. `cup-finish` stays `1st` with no "of N", because `CUP_FIELD_SIZES` has no NCHSAA key and the check accepts that.
- **The app's Cup count is wrong.** `8` comes from the School Profile. The association's all-time list credits 9 through 2024–25, and 2025–26 makes 10. See `## Method` in the source file. It appears at `src/data/sportsPrograms/charlotte-catholic.ts:58` (stat value), `:277` (text and tag), and `src/data/collegeSupportPrograms/charlotte-catholic.ts:573` and `:653`.
- **The Winning Record headline is wrong.** Line 109 says `three more in 2026 alone`. The association's 2026 titles are girls swimming, girls soccer, boys lacrosse and girls lacrosse: four. The card's own three rows simply lack swimming. A Cup card listing `Girls swimming 2021, 2026` sits directly above it.
- **`CUP_SPORTS.NCHSAA` needs no change.** Every point-source key exists. Lacrosse, football and swimming are `both` chips, and a `boys` or `girls` source passes `check:cup` against them. Wrestling stays one `both` chip, as the source file records.
- **`CupPointSource.gender` is `'boys' | 'girls'`,** so football is `boys`, which prints `Boys Football`. The NCISAA's football keys are `b()` entries and print the same way.
- **The table is 21 rows,** and sparse: an em dash means "not in the published top 10", so one sentence under the heading has to say that. The selected row is first, so it opens in view.
- **Citation labels are English by design** (`*.sources[].label` is `false` in `PATH_OVERRIDES`), so the `cup` block adds no overlay entries. School names are not translated.
- **Which strings translate.** In `src/data/overlays/work/<topic>.<lang>.json`, units are under `strings`, and the stamp is the unit's `of` field:

  | Topic | Stamp | Path | Edit |
  |---|---|---|---|
  | `sports` | `f1d81c9f` | `charlotte-catholic:record.headline` | `three` to `four` |
  | `sports` | `ac60ebe3` | `charlotte-catholic:honors.honors[5].text` | `8` to `10` |
  | `sports` | `14b765d4` | `charlotte-catholic:honors.honors[5].tag` | `8` to `10` |
  | `college-support` | `32895cd1` | `charlotte-catholic:edge.levers[1].items[0]` | `8` to `10` |
  | `college-support` | `2c2f522e` | `charlotte-catholic:verdict.points[3].text` | `8` to `10` |
  | `metric-values` | `0f2c3818` | `providence-day:[42].note` | drop last sentence |
  | `metric-values` | new unit | `providence-day:[42].quals.charlotte-catholic.text` | new string |

  The stat value `8` at `offered.stats[2]` is not extracted, and its label `68b3bfa3` does not change. `7a74569c`, the `cup-finish` tooltip, does not change. `Top 3 in 2 of 6` is already a unit, from Gaston Day.
- **Ingest:** the first `sports` rule in `RULES` (`src/lib/metrics.ts`) folds `wells fargo cup` headings, and `## Method` is dropped.

## Decisions

- **The NCHSAA table shows what is published, and says so.** A new heading and one note replace "every". Inventing or chasing a full division is not possible: no page or record book holds one.
- **Association-aware wording uses separate keys and a ternary,** matching the `t(won ? … : …)` idiom in `WellsFargoCupBody`. i18next `context` would be shorter, but no card string uses it. NCISAA keys and NCISAA output stay byte-identical, so no shipped card moves.
- **`sportsHintPlain` gets no NCHSAA variant.** Only a school with no point sources reaches it, and Charlotte Catholic has nine.
- **Keep the `cup-finish` tooltip and widen the check for NCHSAA.** The caveat is the most useful sentence on that row, and it keeps its translations. The check falls back to the existing `startsWith` rule, keeping the points figure guarded.
- **Two garbled 2022–23 rows stay out of the ledger** (Northwest Guilford `29.5`, Hoggard `25`). Neither is a value a figure can be copied from, and no published figure repairs them. Same treatment as a row with a blank place.
- **2022–23 uses the association's post of August 15, 2023,** over the earlier tally reposted August 7. **2024–25 uses the corrected figures.** The source file holds both disagreements.
- **Rows for other classes come along,** so a cell reads `In 7A` rather than an em dash. That is the 18 rows outside Charlotte Catholic's own division, for schools already on the table.
- **Cups change to 10 on the association's count, against the school's own 8.** The Cup card's rule is that figures come only from the association's tables, and the two would otherwise contradict each other on one page. The profile transcription stays as transcribed, with a note beside it.
- **Winning Record gets the number fix only.** No swimming row is added: that card's `didNotWin` already says it covers four programs, and a new row is more than the contradiction needs.
- **Nine point sources**, under the bar the other schools use: at least one title or at least two runner-up years. Most combined finishes first, then titles. Dropped with reasons in the source file: girls basketball, boys swimming, boys cross country, cheerleading.
- **The 2020–21 girls tennis title counts.** It was awarded on advancement points, and it is on the association's champion list.
- **Fall 2026 results are out.** They belong to 2026–27, and no 2026–27 standings exist.
- **Two-phase**, because of new chrome strings and prose edits.
- **Name:** `charlottecatholiccup`, matching `charlottechristiancup`.

## Approvals needed

**None to start.** No card, section, tile or Compare row is added, and this is a direct request rather than an ingest pass. The component change is small and the new wording is exactly what the user reviews at the Phase 1 stop, but it is flagged here because every earlier Cup plan said no component change was needed.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/charlotte-catholic/Charlotte Catholic - Sports - Wells Fargo Cup Standings 2020-2026.md`: six seasons, nine point sources, every disagreement, every URL, the all-time cup count, and the 70 ledger rows under `## Wells Fargo Cup new division rows for the ledger`.

## Out of scope

- A place or points for the rows the association does not publish, and any full-division scrape.
- Fall, winter and spring splits. Only the 2025–26 fall figure is published.
- A Girls swimming or Boys soccer row on Winning Record.
- `CUP_FIELD_SIZES` entries for the NCHSAA.
- The `74 state championships since 2000` figure, which is the school's own.
- Rewording `what2`. See Open questions.
- A deploy.

## Steps

### Phase 1 — English

1. **Branch, annotate the research notes, ingest.** Create `feat/charlottecatholiccup` from an up-to-date `main`.
   - In `source-material/sports/charlotte-catholic/Charlotte Catholic - Sports - Program Championships and College Commitments.md`, in the `Wachovia/Wells Fargo Cups` row near line 63, change the value to `**10** per the NCHSAA all-time list plus 2025–26; the School Profile's **8** predates it`. Leave the S1 row at line 25, which describes the profile.
   - In `source-material/college-support/charlotte-catholic/Charlotte Catholic - College Support - School Profile 2025-2026.md` near line 254, leave the transcription and add after that sentence: `(The NCHSAA's all-time list gives 10 including 2025–26; see the Sports Wells Fargo Cup file.)`

   Then follow the `ingest-source-material` skill for `sports` and `college-support` only (`build_docs.py <topic>` for each, then `scripts/build_site_content.py`), and diff `src/data/schools.json` against `HEAD` so no other topic was swept in. Restore any file whose only change is a date stamp. Run `npm run check:metrics`; no new ⚠️ subtopic should appear.

2. **Add the master records.** Find and load in a browser the real homepage of these eleven, confirming name and city. An HTTP 200 proves nothing, and domain guesses failed repeatedly on Davidson Day's table:

   | Card name | Slug | Master name | City |
   |---|---|---|---|
   | Watauga | `watauga` | Watauga High School | Boone |
   | East Chapel Hill | `east-chapel-hill` | East Chapel Hill High School | Chapel Hill |
   | Northern Guilford | `northern-guilford` | Northern Guilford High School | Greensboro |
   | Middle Creek | `middle-creek` | Middle Creek High School | Apex |
   | Broughton | `broughton` | Needham B. Broughton High School | Raleigh |
   | Green Hope | `green-hope` | Green Hope High School | Cary |
   | Hoggard | `hoggard` | John T. Hoggard High School | Wilmington |
   | Panther Creek | `panther-creek` | Panther Creek High School | Cary |
   | Chapel Hill | `chapel-hill` | Chapel Hill High School | Chapel Hill |
   | Mount Tabor | `mount-tabor` | Mount Tabor High School | Winston-Salem |
   | J.H. Rose | `jh-rose` | J.H. Rose High School | Greenville |

   In `src/data/highSchools.ts`, under the Wells Fargo Cup block near line 489, add each with `kind: 'public'`, `url`, `city`, `state: 'NC'`. Add a comment line naming this as the rest of Charlotte Catholic's table. In `source-material/high-school-placement/_shared/High School Destinations.md`, add the same rows to `## Added for the Wells Fargo Cup table (2026-11-02)` and bump the count in its heading. Run `npm run check:highschools`.

3. **Extend the ledger** in `src/data/wellsFargoCup.ts`. Use a throwaway script in the scratchpad that reads the source file's `## Wells Fargo Cup new division rows for the ledger` table and prints `CupRecord` literals, so no figure is retyped. All rows are `association: 'NCHSAA'`, `isEstimate: false`, with no `fall`, `winter` or `spring`.
   - Put Charlotte Catholic's five new rows beside its existing row at line 266, oldest first.
   - Append the other 65 at the end of `CUP_RECORDS`, under the comment `// The published top of each NCHSAA class, for Charlotte Catholic's table.`
   - Add 12 rows at the end of `CUP_DIVISION_LEADERS`, from `## Charlotte Catholic Wells Fargo Cup division winners`, under the comment `// NCHSAA: Charlotte Catholic's division in each season.`. `school` is the short name. Only Charlotte Catholic's 2025–26 row carries `slug: 'charlotte-catholic'`.
   - Change the leaders' doc comment to `/** Places 1 and 2 in each division a Cup card shows, on or off the roster. */`.
   - Add each slug in step 2, plus these, to `CUP_SHORT_NAMES`, under a comment `// The rest of Charlotte Catholic's table.`: `cardinal-gibbons` Cardinal Gibbons, `marvin-ridge` Marvin Ridge, `cuthbertson` Cuthbertson, `myers-park` Myers Park, `weddington` Weddington, `lake-norman` Lake Norman, `ardrey-kell` Ardrey Kell, `hough` Hough, `cox-mill` Cox Mill.
   - Add all twenty to `CUP_HIGH_SCHOOLS`. Masters for those nine: `Cardinal Gibbons High School`, `Marvin Ridge High School`, `Cuthbertson High School`, `Myers Park High School`, `Weddington High School`, `Lake Norman High School` (not `Lake Norman Charter School`), `Ardrey Kell High School`, `Hough High School`, `Cox Mill High School`.
   - In the file header, add that NCHSAA rows come from Charlotte Catholic's file of the same name. Above `CUP_RECORDS`, add that the NCHSAA publishes only the top of each class, so an NCHSAA table holds the published top rather than a whole division.

4. **Make the card association-aware.** In `src/locales/en.json`, under `sports.cup`, add:
   ```json
   "what3Nchsaa": "Points come from official state championships, plus five points for each sport in which a school reaches the playoffs. Club programs don't count.",
   "pointsHintNchsaa": "Final state placement in every sanctioned championship, plus five points for each playoff sport",
   "sportsHintNchsaa": "Every sport below can add points. Outlined: {{school}}'s main point sources.",
   "tableTitleNchsaa_one": "{{count}} year · {{association}} {{classification}} top finishers, as published",
   "tableTitleNchsaa_other": "{{count}} years · {{association}} {{classification}} top finishers, as published",
   "tableNoteNchsaa": "The NCHSAA publishes only the top finishers in each class, so a dash means the school was not listed, not that it finished last.",
   ```
   In `WellsFargoCupBody` in `src/components/SportsProgram.tsx`, add `const nchsaa = association === 'NCHSAA'` after the `association` line, then:
   ```tsx
   <p className="sports-p">{t(nchsaa ? 'sports.cup.what3Nchsaa' : 'sports.cup.what3')}</p>
   ```
   ```tsx
   <div className="cup-hint text-muted">{t(nchsaa ? 'sports.cup.pointsHintNchsaa' : 'sports.cup.pointsHint')}</div>
   ```
   ```tsx
   {hasSources
     ? t(nchsaa ? 'sports.cup.sportsHintNchsaa' : 'sports.cup.sportsHint', { school })
     : t('sports.cup.sportsHintPlain')}
   ```
   ```tsx
   <Heading>
     {t(nchsaa ? 'sports.cup.tableTitleNchsaa' : 'sports.cup.tableTitle', {
       count: CUP_SEASONS.length,
       association,
       classification,
     })}
   </Heading>
   {nchsaa && <p className="cup-hint text-muted">{t('sports.cup.tableNoteNchsaa')}</p>}
   ```
   Change no CSS unless the browser check shows a need.

5. **Close the `check:cup` gaps** in `scripts/check_cup_ledger.mjs`.
   - Line 80: `const key = \`${l.association}|${l.classification}|${l.season}|${l.place}\``.
   - Change `} else if (!rival) {` in the `cup-finish` tooltip check to:
     ```js
     } else if (!rival || current.association === 'NCHSAA') {
     ```
     with a comment above it: the NCHSAA tooltip carries the cross-association caveat, so only its points figure is pinned.
   - Above the fixtures, add a wall for the other direction and a render-path guard, beside the existing association wall:
     ```js
     const ncisaa = CUP_RECORDS.filter((r) => r.association === 'NCISAA').map((r) => r.school)
     for (const r of CUP_RECORDS.filter((x) => x.association === 'NCHSAA')) {
       if (cup.divisionRows(r.school).some((s) => ncisaa.includes(s))) {
         fail(`divisionRows mixes associations: ${r.school} table holds an NCISAA school`)
       }
     }
     ```
     Move this below the `body` read, or read the component where needed, and add:
     ```js
     if (!/nchsaa \? 'sports\.cup\.tableTitleNchsaa'/.test(body)) fail('an NCHSAA table must not print the "every school" heading')
     ```
   - After the Davidson Day fixtures:
     ```js
     eq('Charlotte Catholic lead over next', cup.leadOverNext('charlotte-catholic'), [15, 5, 25, 37.5, 35, 75])
     eq('Charlotte Catholic table', cup.divisionRows('charlotte-catholic').length, 21)
     eq('Charlotte Catholic classes', cup.classLabel('charlotte-catholic'), '3A / 4A / 6A')
     eq('Charlotte Catholic cups', [cup.headlineStats('charlotte-catholic').cupsWon, cup.headlineStats('charlotte-catholic').seasonsTotal], [1, 6])
     eq('Charlotte Catholic margin', [cup.headlineStats('charlotte-catholic').latestMargin?.value, cup.headlineStats('charlotte-catholic').latestMargin?.rival.name], [75, 'Watauga'])
     eq('Charlotte Catholic hides the bars', cup.nearestRival('charlotte-catholic', '2025–26'), null)
     ```
   - Update the header comment's "a card's table holds its whole division" line to say the NCHSAA card holds the published top.

   Run a negative test on each change. Revert the key change and read that the failure is a duplicate leader. Change the tooltip's `655` in `metricValues.ts` to `650` and read that the message is the `must start with` one. Diff both back.

6. **Add the `cup` block.** In `src/data/sportsPrograms/charlotte-catholic.ts`, below `MAXPREPS`, add `const NCHSAA = 'https://www.nchsaa.org/'`. Insert between `offered` and `record`:
   ```ts
   cup: {
     pointSources: [
       { sport: 'lacrosse', gender: 'girls', season: 'spring', titleYears: [2026], runnerUpYears: [2022, 2023, 2024] },
       { sport: 'swimmingDiving', gender: 'girls', season: 'winter', titleYears: [2021, 2026], runnerUpYears: [2023] },
       { sport: 'golf', gender: 'boys', season: 'spring', titleYears: [2021, 2022], runnerUpYears: [2026] },
       { sport: 'tennis', gender: 'girls', season: 'fall', titleYears: [2021, 2025] },
       { sport: 'lacrosse', gender: 'boys', season: 'spring', titleYears: [2026], runnerUpYears: [2023] },
       { sport: 'golf', gender: 'girls', season: 'fall', titleYears: [2025], runnerUpYears: [2024] },
       { sport: 'football', gender: 'boys', season: 'fall', titleYears: [2021] },
       { sport: 'soccer', gender: 'boys', season: 'fall', titleYears: [2025] },
       { sport: 'soccer', gender: 'girls', season: 'spring', titleYears: [2026] },
     ],
     sources: [
       { label: 'NCHSAA Wells Fargo Cup standings, 2025–26', url: `${NCHSAA}2025-2026-wells-fargo-cup-champions/` },
       { label: 'NCHSAA Wells Fargo Cup standings, 2024–25', url: `${NCHSAA}wells-fargo-state-cup-standings-update-2/` },
       { label: 'NCHSAA Wells Fargo Cup standings, 2023–24', url: `${NCHSAA}2023-24-wells-fargo-cup-winners/` },
       { label: 'NCHSAA Wells Fargo Cup standings, 2022–23', url: `${NCHSAA}nchsaa-announces-2022-2023-wells-fargo-cup-and-conference-cup-champions/` },
       { label: 'NCHSAA Wells Fargo Cup standings, 2021–22', url: `${NCHSAA}wells-fargo-state-cup-competition-winners-2021-22-announced/` },
       { label: 'NCHSAA Wells Fargo Cup standings, 2020–21', url: `${NCHSAA}2020-2021-wells-fargo-state-cup-winners-recognized/` },
       { label: 'NCHSAA Wells Fargo Cup scoring', url: `${NCHSAA}wells-fargo-cup/` },
       { label: 'NCHSAA all-time state cup winners', url: `${NCHSAA}all-time-list-of-wells-fargo-state-cup-winners/` },
       { label: 'NCHSAA sport list', url: `${NCHSAA}sports/` },
       { label: 'NCHSAA football state champions', url: `${NCHSAA}wp-content/uploads/2025/01/FB-State-Champion-List-thru-24.pdf` },
       { label: 'NCHSAA swimming and diving record book', url: `${NCHSAA}record-book/swimming-and-diving/` },
       { label: 'NCHSAA 4A swimming results, 2023', url: `${NCHSAA}sites/default/files/2023%20NCHSAA%204A%20State%20Swim%20%26%20Dive%20Championship%20Results.pdf` },
       { label: 'NCHSAA men’s golf record book', url: `${NCHSAA}record-book/mens-golf/` },
       { label: 'NCHSAA men’s golf championships, 2026', url: `${NCHSAA}2026-mens-golf-championships/` },
       { label: 'NCHSAA women’s golf championships, 2024', url: `${NCHSAA}2024-womens-golf-championships/` },
       { label: 'NCHSAA women’s golf championships, 2025', url: `${NCHSAA}2025-womens-golf-championships/` },
       { label: 'NCHSAA women’s dual team tennis champions', url: `${NCHSAA}wp-content/uploads/2023/11/Dual-team-state-champs.pdf` },
       { label: 'NCHSAA women’s dual team tennis, 2025', url: `${NCHSAA}2025-womens-dual-team-tennis-championships/` },
       { label: 'NCHSAA men’s lacrosse record book', url: `${NCHSAA}record-book/mens-lacrosse/` },
       { label: 'NCHSAA women’s lacrosse record book', url: `${NCHSAA}record-book/womens-lacrosse/` },
       { label: 'NCHSAA lacrosse championships, 2026', url: `${NCHSAA}2026-lacrosse-championships/` },
       { label: 'NCHSAA men’s soccer championships, 2025', url: `${NCHSAA}2025-mens-soccer-championships/` },
       { label: 'NCHSAA women’s soccer championships, 2026', url: `${NCHSAA}2026-womens-soccer-championships/` },
     ],
   },
   ```
   In the header comment, change `the seven Sports cards` to `the eight Sports cards`. In the `⚠️ CCHS IS AN NCHSAA SCHOOL` paragraph, add that the Cup card's scoring, heading and table differ for this reason.

7. **Correct the prose.**
   - `src/data/sportsPrograms/charlotte-catholic.ts`: `offered.stats[2].value` to `'10'`; `record.headline` to `'74 state championships since 2000 — and four more in 2026 alone.'`; `honors.honors[5].text` to start `10 Wachovia / Wells Fargo Cups,`; `tag` to `'10 CUPS'`. Add `{ label: 'NCHSAA all-time state cup winners', url: 'https://www.nchsaa.org/all-time-list-of-wells-fargo-state-cup-winners/' }` to `honors.sources`, and to `offered.sources`. Add `{ label: 'NCHSAA swimming and diving championships, 2026', url: 'https://www.nchsaa.org/2026-swimming-diving-championships/' }` to `record.sources`.
   - `src/data/collegeSupportPrograms/charlotte-catholic.ts:573` and `:653`: `8 Wells Fargo Cups` to `10 Wells Fargo Cups`, keeping the `**` at `:653`.

8. **Update Compare** in `src/data/metricValues.ts`, row `cup-titles`:
   - `note`: remove the sentence `Charlotte Catholic shows n/a because only its latest season is verified here.`
   - `'charlotte-catholic': '1',` and drop the trailing comment.
   - `subs`: add `'charlotte-catholic': 'Top 3 in 2 of 6',`.
   - `quals`: add `'charlotte-catholic': { kind: 'scope', text: 'Won in 2025–26, in NCHSAA 6A.' },`.

   `cup-finish` does not change.

9. **Record the rules.** The next NCHSAA school needs all of these.
   - In `scripts/gen_data_schema.mjs`, in the Cup rules near line 445: after the "whole division" rule add `- **An NCHSAA table holds the published top, not a whole division,** because the association prints only the top 10 per class, or top 5. Its heading says so and a dash means not listed.` Add a rule: `- **The NCHSAA adds five participation points per playoff sport,** so the card's scoring sentences differ by association.` Change the leaders rule from "in every division for every season" to "in each division a card shows".
   - In `.claude/skills/wells-fargo-cup/SKILL.md`, rewrite the `### NCHSAA branch (Charlotte Catholic)` section: the ledger now holds all six seasons; the six URLs; top 10 or top 5 only, with no splits; points can be corrected after announcement, and a dated page can carry later figures; the sport evidence lives in `https://www.nchsaa.org/record-books/`, whose record-book pages are HTML tables, in per-sport PDFs and in the site's search API; a recap can omit a runner-up that the meet's own team rankings show; the wrestling question is answered. Remove the sentence that `CUP_DIVISION_LEADERS` holds NCISAA divisions only.
   - In `CLAUDE.md`, in `### Wells Fargo Cup card`, add a short paragraph: the NCHSAA card is the one exception to the whole-division rule and its wording is association-aware, and the school's Cup count comes from the association.
   - Re-read the `wells-fargo-cup` entry in `.claude/SKILLS.md` and update it if a sentence is now false. If none is, say so in the Implementation notes.

10. **Regenerate and check.** Run `npm run schema` and `npm run check:schema`, `npm run check:cup`, then `npm run build`. Expect `check:live` to fail on `f1d81c9f`, `ac60ebe3`, `14b765d4`, `32895cd1`, `2c2f522e` and `0f2c3818` only, until Phase 2. Anything else failing is a real failure. The new tooltip is a brand-new unit, which `check:live` cannot see, so expect it to render English in other locales with no finding until Phase 2. Run the rest of Phase 1 verification, stage explicit paths, commit, and set the index row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs until they confirm the English version.

### Phase 2 — Every other locale

Scope is two layers, for the locales in `TRANSLATED` other than `en`: `es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`. `PROSE_TRANSLATED` is the same nine today. See `.claude/docs/prose-translation-architecture.md` for the mechanism and `src/data/overlays/NOTES.md` for dates and figures. Figures are copied char-for-char from the final English, and `Upper`-style identifiers such as `NCHSAA` stay Latin.

1. **Chrome.** Add the five `sports.cup.*` strings, with `tableTitleNchsaa` in each locale's plural forms, to all nine catalogs in `src/locales/`. `ar` carries `_zero`, `_one`, `_two`, `_few`, `_many`, `_other`, matching its `tableTitle`; the other eight carry `_one` and `_other`. Say "five points" with the digit or word that locale's `what3` idiom uses. Match each locale's existing term for "playoffs" and for "NCHSAA". Keep `{{school}}`, `{{count}}`, `{{association}}` and `{{classification}}` intact.
2. **Prose.** Key everything by English text, never by index. In `sports`, `college-support` and `metric-values` work files, update the six changed units' English and stamp, and edit `t` by the smallest change that keeps every other character: the numeral, and for `f1d81c9f` the word for three. For `0f2c3818`, remove the translation of the last sentence. Add the new `quals` unit by splicing it, joined by stamp; never re-extract the whole file. Translate it from the sibling `Won in 2021–22, in NCISAA 4A.` (`fee77bed`), changing only season and division.
3. **Build the overlays** per locale with `node scripts/i18n_build_overlay.mjs --topic <topic> --lang <code>` for `sports`, `college-support` and `metric-values`, then confirm `npm run check:live` is clean. `scripts/check_work_integrity.mjs` will report these units, because it freezes existing ones. Confirm it names only these.
4. **Finish.** Open the PR with `--body-file`, merge with `gh pr merge --squash --delete-branch`, check out `main` and pull, set the index row to `Implemented`, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `source-material/sports/charlotte-catholic/*Wells Fargo Cup Standings 2020-2026.md` | Commit (written in planning) |
| `source-material/sports/charlotte-catholic/*Program Championships and College Commitments.md` | Annotate the Cup count |
| `source-material/college-support/charlotte-catholic/*School Profile 2025-2026.md` | Annotate the Cup count |
| `.claude/docs/sports/charlotte-catholic.md`, `.claude/docs/college-support/charlotte-catholic.md`, `src/content/**/charlotte-catholic.json`, `src/data/schools.json` | Regenerated by ingest |
| `src/data/wellsFargoCup.ts` | 70 records, 12 leaders, names, comments |
| `src/data/highSchools.ts` | Eleven homepages |
| `source-material/high-school-placement/_shared/High School Destinations.md` | Same eleven |
| `src/data/sportsPrograms/charlotte-catholic.ts` | `cup` block; Cup count; headline |
| `src/data/collegeSupportPrograms/charlotte-catholic.ts` | Cup count, twice |
| `src/data/metricValues.ts` | `cup-titles` cell, sub, tooltip, note |
| `src/components/SportsProgram.tsx` | Association-aware strings and one note |
| `src/locales/*.json` | Six keys in `en`; Phase 2 the rest |
| `scripts/check_cup_ledger.mjs` | Association in the leader key, tooltip rule, wall, fixtures |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | NCHSAA rules; regenerated |
| `.claude/skills/wells-fargo-cup/SKILL.md`, `CLAUDE.md`, possibly `.claude/SKILLS.md` | Rules |
| `src/data/overlays/work/{sports,college-support,metric-values}.<lang>.json`, `src/data/overlays/{sports,college-support,metric-values}.<lang>.json` | Phase 2 |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:cup` passes, with all earlier fixtures unchanged, and both negative tests failed for the right reason before being diffed back.
- [ ] `npm run check:highschools`, `npm run check:schoolurls`, `npm run check:metrics` and `npm run check:schema` pass, with no new ⚠️ subtopic.
- [ ] `npm run build` fails only at `check:live`, only on the six stamps in step 10.
- [ ] Browser check of `/school/charlotte-catholic` with the Sports `<details>` open: the Cup card is second, after Sports Offered. Headline `NCHSAA 6A Wells Fargo Cup winner, 2025–26.`, also as the collapsed teaser. Subhead `The 2025–26 title was decided by 75 points: 655 to Watauga's 580.` `what2` says `NCHSAA 6A`, and `what3` and the points hint mention the five points. The sports grid is the NCHSAA list with nine outlined sports, and its hint has no football sentence.
- [ ] Three tiles, laid out cleanly: `1 / 6` labelled `3A / 4A / 6A Cups won, 2020–21 to 2025–26`, `655` peak, `+75` over Watauga. No best-season tile.
- [ ] Table: heading `6 years · NCHSAA 3A / 4A / 6A top finishers, as published`, the note beneath it, 21 rows, Charlotte Catholic first and in view, newest column first: 1st 655, 6th 325, 6th 342.5, 5th 365, 8th 305, 3rd 430. The summary row reads `+75`, 35, 37.5, 25, 5, 15. Cardinal Gibbons shows `In 7A` and `In 4A` at the ends. Myers Park shows `In 8A`. J.H. Rose shows `In 3A` three times. Weddington 2022–23 prints `414.166`, and Middle Creek `450.83`.
- [ ] No bars. The point sources panel fills its row, with nine sports, girls lacrosse first, and `Boys Football`.
- [ ] Links: open all eleven new homepages and confirm each is that school. Lake Norman goes to the high school, not the charter.
- [ ] Sports Offered shows `10`, Honors shows `10 CUPS`, Winning Record's headline says `four more`, and College Support shows `10 Wells Fargo Cups` twice. `grep -rn "8 Wells Fargo\|8 CUPS\|8 Wachovia\|three more in 2026" src/data/sportsPrograms src/data/collegeSupportPrograms` finds nothing for this school.
- [ ] Compare: Charlotte Catholic reads `1st` / `NCHSAA 6A` with its tooltip unchanged, and `1` / `Top 3 in 2 of 6` with `Won in 2025–26, in NCHSAA 6A.` The row note has no `n/a` sentence.
- [ ] Every other Cup card is unchanged: compare Providence Day's and Davidson Day's rendered text against `main`, including the `every` heading and the football sentence.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open. Build-gate exception as above. Print a page with the card open and confirm all 21 rows and the note print.

### Phase 2 — Locales

- [ ] `npm run check:chrome`, `npm run check:live` and `npm run check:runtime` pass, and `npm run build` is fully green.
- [ ] `npm run check:dates` passes, and `check:sepdrift` passes for each locale.
- [ ] Real-browser check of the open card in `es`, `fa`, `ar` and `hi`: the new heading and note are translated, `3A / 4A / 6A`, `In 7A`, `414.166`, `450.83`, `+75` and every season range read correctly, and the Compare tooltip is translated (no checker sees a new unit).
- [ ] `npm run audit:daterender` reports no new English date.

## Risks

| Risk | Mitigation |
|---|---|
| A wording change leaks to the NCISAA cards | Separate keys, a check on the heading, and a text diff of two cards |
| A guessed homepage belongs to another school | Step 2 loads each in a browser, and the verification opens all eleven |
| A transcription slip in 70 rows | Rows are generated from the source file, and the Lead over next fixture pins Charlotte Catholic's. Rows have no splits to sum, so review the generated diff against the six association pages |
| The association edits a table again, as it did in 2024–25 | The source file dates every retrieval and records both disagreements |
| The school disputes `10` | The all-time list URL goes on both cards, and the source file shows the count |
| A new overlay unit silently renders English in Phase 2 | Phase 2's browser check names it |

## Open questions

- **Does `what2` read oddly?** It says the NCHSAA is for public schools, then that Charlotte Catholic competes in it. **Default:** leave it. It is true of the association, and Sports Offered explains the school's position in its first line. Raise it at the English review.
- **Is the sparse table better than a shorter one?** Many cells are dashes, because only the top is published. **Default:** ship it with the note. Showing only the school's own row would hide the field it beat.
- **Should `10` carry a note that the school says 8?** **Default:** no. The all-time list is cited, and a note would invite a fight the source file already settles.

## Implementation notes

Phase 1 deviations:

- **`npm run check:highschools` does not exist.** Step 2 and the verification name it, but `package.json` has no such script. The master is guarded by `check:cup`, whose "every name on a table links" rule passes for all 20 off-roster schools.
- **`check:metrics` exits 1, on nothing from this plan.** Its one unmatched subtopic is `sports :: "Podcast Episode 33 Saleh Athletic Center"` (Charlotte Christian), a file already on `main`. No new ⚠️ subtopic appeared.
- **One CSS rule was added.** The Cup card's three tiles left a blank fourth cell in the four-column `.sports-stats` grid. Step 4 allowed CSS if the browser check showed a need, so `.cup-explain ~ .sports-stats > .sports-stat:nth-child(3):last-child { grid-column: span 2; }` fills the row at both breakpoints. It is scoped to the Cup strip, so Carmel Christian's separate three-tile strip does not move.
- **Eight chips are outlined, not nine.** Nine point sources map to eight chips, because girls and boys lacrosse share the NCHSAA's one `both` chip. The point sources panel lists all nine.
- **Two single-topic ingests reorder `schools.json`.** Each run moves its topic to the end of `documents`, so running `sports` then `college-support` produced a 6,000-line diff. The file was put back in `HEAD` order, leaving only the one new document and its `doc_count`. Notes whose only change was the date stamp were restored.
- **Domain guesses failed as the plan warned.** `www.chccs.org/chs` redirects to Carrboro High School, so Chapel Hill High is `chhs.chccs.org`. Watauga moved to `whs.wataugaschools.org`. Mount Tabor and J.H. Rose block curl and were confirmed in Chrome. J.H. Rose's URL came from the Pitt County Schools site. Northern Guilford, Middle Creek, Green Hope and Panther Creek print no city on the page, so those four rest on the school name in the title and the district domain.
- **The Hoggard page title reads `Home -` with no school name in curl and in Chrome's tab title,** so the master table records its address instead.
- **`.claude/SKILLS.md` changed:** step 3 said the point sources come from the NCISAA bracket archive, which is false for this branch.
