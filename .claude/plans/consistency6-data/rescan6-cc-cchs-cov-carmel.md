# Re-scan #5 (plan consistency6): Charlotte Christian · Charlotte Catholic · Covenant Day · Carmel Christian (2026-11-23, main 638a4d3e)

Pages are `rescan6/pages/<slug>.txt`, quoted as `L<n>`. Data lines are on 638a4d3e. "Today" means fetched 2026-11-23. `git diff 5d26847a 638a4d3e` is what round 5 changed. Refused hosts were not requested. carmelchristian.org and blumenthalarts.org rows rest on the committed records and on the page and data recounts.

## Part 1: regression check of round 5

Rows checked: the 121 unique rows of `consistency5-data/rescan5-cc-cchs-cov-carmel.md` Part 1, its 19 Part 2 rows, and the cross-school rows X1 and X2 of `consistency5-data/findings.md` (X1's members are the four Blumey rows below; X2 asks for every NCISAA school).

**Counts (141 rows): RESOLVED 137 · PARTIAL / REGRESSED 1 (X2, for these schools) · NOT RESOLVED 0 · UNCHANGED BY DECISION 3.**

How each was checked: the four dumps were searched for every old and new string, Compare values, subs and quals were printed from `metricValues.ts`, catalogs and rosters were recounted from the data modules, and round 5's diff (`5d26847a..638a4d3e`) was read for every file of these schools.

### Round 5's own rows

| id | status | where (page line or file:line) | note |
|---|---|---|---|
| COV-T15 | RESOLVED | Compare `summer-ages` qual; `metricValues.ts` comment | "…through the high-school College Admissions camp." No strength-camp text remains. |
| CC-U1 | RESOLVED | CC L1050-1053, L1352-1358, L1362-1365; Compare `d1-commits-2426` 36 | Queens golf row is ASUN D1. Recount: '24 11 + '25 16 + '26 9 = 36 D1; bars 16+6+5+2+1+1+5 = 36; 36/48 = 75%. Qual and value comment agree. |
| CC-U2 | RESOLVED | CC L2903-2919 | "Sixteen confirmed components — all 16 priced". 16 rows counted, with "Bridge care, JK–4 · $125/mo" and "Clarity aid application fee · $65". Agrees with L74 and L2060-2066. |
| CC-U3 | RESOLVED | CC L930, L937-941 | 2026-27 "Called to Courage!", three titles; 2025-26 kept as "Pure Imagination" with Cinderella. No "not published" left. |
| CC-U4 | RESOLVED | CC L1029-1031, L1043, L1984 | 54 in both cards; the ask now asks for a count, not names. |
| CC-U5 (X1) | RESOLVED | CC L954-955, L966, L1036 | 2023 Into the Woods row (roles only), in the context and verdict. |
| CC-U6 | RESOLVED | CC L1369, CCHS L1431, Covenant L1000, Carmel L825 | "Ranked recruits". |
| CCHS-U1 | RESOLVED | CCHS L2101 | "These three rows are the standard high-school schedule. The Options Program at CCHS has its own rates: $24,077 … $18,345", matching L433-435, L503. |
| CCHS-U2 (X1) | RESOLVED | CCHS L882, L940-951, L954-1003, L1079; Compare `signature-recognition`, `flagship-result` | 15 ledger rows recounted (5 + 5 + 5); "Two students placed in two of those years" matches the ledger roles. |
| CCHS-U3 | RESOLVED | CCHS L2040-2046; Compare `summer-ages` "rising 2–9" | Headline, filter ("Rising 6–9"), intro and qual agree with the three camp rows (L2057, L2063, L2069). |
| COV-U1 | RESOLVED | Covenant L1922 | "…now that the state program has no income cap and pays by income tier?" |
| COV-U2 | RESOLVED | Covenant L501, L504-505, L509 | "nearly twenty" in all three. |
| COV-U3 | RESOLVED | Covenant L1104-1105, L1446 | "the school gives no count per college" in both; no "deepest" left. |
| COV-U4 (X1) | RESOLVED | Covenant L635, L697 | "though Covenant Day competed in 2022"; ask "Have you entered the Blumeys since 2022?" |
| CAR-U1 (X1) | RESOLVED | Carmel L469-474, L519, L527 | 2023 Mary Poppins row; Singin' in the Rain "Earlier (year not published)"; "Two students placed in three straight years" matches the ledger roles. |
| CAR-U2 | RESOLVED | Carmel L1763 | `when: 'How it works'`. |
| CAR-U3 | RESOLVED | Carmel L436, L527; Compare `program-span` qual | Both sources attributed; ask "Does every 5th grader take music?" |
| CAR-U4 | RESOLVED | Carmel L440, L495, L503-508, L513, L520, L523 | Attributed both ways; ask widened. Arts rows of the new HS catalog (L174-197) agree: 1 AP, 3 Honors, no Choir, Technical Theater, Creative Writing or Journalism. |
| CAR-U5 | RESOLVED | Carmel L1301 | "So the Class of 2024 range above is not on the same scale as a current student’s weighted GPA." |
| CAR-U6 | RESOLVED | Carmel L836 "Johnson & Wales (Charlotte) C2C D3"; Gaston Day dump "Johnson & Wales (Charlotte)C2CD3" | No "USCAA" left in `src/data`; the Gaston Day record keeps it only in a Method note that says the card was wrong. |
| X1 (these four schools) | RESOLVED | as the four member rows | No student named in any fix. |
| X2 (these schools) | **PARTIAL** | CC L1296-1297, L1349; Covenant L972 | Plan step 5 extended X2 to Providence Day, Country Day and Latin, and Catholic was checked as NCHSAA. Charlotte Christian, Covenant Day and Carmel were not checked. Today's NCISAA fall 2026 brackets make one CC sentence false and one Covenant item undated: **CC-V1** and **COV-V1** below. Carmel's text makes no claim the fall brackets move. |

### Rows left by decision

| id | status | where | note |
|---|---|---|---|
| CC-9 qual residue | UNCHANGED BY DECISION | Compare `summer-camps` CC qual "roughly 96 distinct camps" | consistency2 Decisions. |
| CC-R3 | UNCHANGED BY DECISION | CC L681, L685, L817, L819-820 | Settled S5. "38 named organizations … (23 Upper + 7 Middle + 8 Lower)", the scope line and "two global-awareness student groups" are unchanged. |
| CAR-R2 | UNCHANGED BY DECISION | Carmel L1309-1321, L1358-1369; Compare `aftercare-cost` | Settled S6. $245/mo, $230/mo, ≈$2,205/yr and the grades 1–8 qual are unchanged. |

### The 116 rows round 5 marked RESOLVED (its Part 1), re-checked

All 116 still RESOLVED. Each was checked by its value or string in today's dump or data. One group is superseded by a later fix, which is RESOLVED, not a regression.

| ids | status | note |
|---|---|---|
| CAR-T8 (held in round 5) | RESOLVED | Plan step 5b: Carmel HS catalog rebuilt. Recount: 92 rows, 69 distinct titles, 16 AP, 9 departments (L23-31; Compare `us-courses` 92 and its qual; `advanced-courses` 16 AP). The 23 repeat rows are the leveled English, math, science, social studies and Spanish courses, as the qual says. |
| X4 Carmel (1, 1b), CAR-3 (1, 1b) | RESOLVED (superseded) | Their 96 / 77 is now 92 / 69 by CAR-T8. No 96 or 77 left on the page or in Compare. |
| X1 CCHS, X1 Covenant, X4 CC, X4 CCHS, X4 Covenant, X6 CC, X7, X8, LAT-2 CC side, CC-4, CC-5, CC-6, CC-7, CC-9, CC-10, CC-11, CC-27, CC-29, CC-R1, CC-R2, CC-R4, CCHS-12, CCHS-13, CCHS-14, CCHS-15, CCHS-16, CCHS-17, CCHS-31, CCHS ~195 residue, CCHS-R1, COV-23, COV-24, COV-25, COV-27, COV-2b, COV-R1, CAR-18, CAR-19, CAR-20, CAR-21, CAR-22, CAR-26, CAR-28, CAR-30, CAR-R1, CC-S1, CC-S2, CC-S3, COV-S1, COV-S2, CAR-S1, the four FA-links rows, Latin's FAQ on Covenant's report, both title keys, es "El director", CC-T1…CC-T16, CCHS-T1…CCHS-T15, COV-T1…COV-T14, CAR-T1…CAR-T7, CAR-T9, CAR-T10 | RESOLVED | Spot values all present: CC 143 / "Shown here as 129" / 21 AP / 55 / 68 / 3.803 / 38 / 96 distinct camps; CCHS 199 / 26 AP / 13 Options / ~222 / 67 / $23,827 / "no income cap"; Covenant 89 / 17 AP / $4,464 / 74% / "Not published"; Carmel 16 AP / "former income cap" / "income caps have been removed" / "Not published". Rosters 48 + 1, 54 + 5, 35, 20 with D1 36 / 39 / 10 / 6 and P4 11 / 15 / 1 / 1 recounted. |

## Part 2: new findings

**2 findings: CC 1 · Covenant 1. A 1 · C 1.** Both are the X2 class (fall 2026 NCISAA results), at schools plan step 5 did not cover. Neither was caused by round 5: both sentences are unchanged since 5d26847a.

| id | school | section(s) | value A (where: file:line, page L) | value B (where) | category | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|
| CC-V1 | Charlotte Christian | Sports › Winning Record (headline and Football detail) | "Football supplies the second pillar with nine titles, though Providence Day has ended the Knights’ season in each of the last three years." (`sportsPrograms/charlotte-christian.ts:120`, L1296-1297); "Football: Providence Day has ended the Knights’ season three years running — playoff losses in 2023 and 2024, then the 2025 state final, 42–6." (`:194`, L1349) | The 2026 season, now finished, was ended by Cannon, not Providence Day. So "the last three years" (2024, 2025, 2026) is false, and "three years running" reads as current. | A (source moved: fall 2026) | https://archives.ncisaa.org/index.php?sport=31&years=2026-2027, Division 1, "Quarterfinals - Friday, 11/6": "#3 Cannon - Concord Academy (7-3)", "51-14", "#3 Cannon - Concord Academy (8-3)", "#6 Charlotte Christian School (3-6)". The final paired Providence Day and Rabun Gap on 11/20. | `:120`: "…though Providence Day ended the Knights’ season in 2023, 2024 and 2025." `:194`: "Providence Day ended the Knights’ season three years running, 2023–25: playoff losses in 2023 and 2024, then the 2025 state final, 42–6. …" Optionally add "In 2026, Cannon beat them in the quarterfinal, 51–14." The record's section 2 (line 62) is dated by today's Method note. Text only. No rule reads Winning Record prose against a season (R7 and R9 do not). |
| COV-V1 | Covenant Day | Sports › Winning Record, "What they didn't win" | "What they didn't win: boys soccer (Christ School won the 2025–26 final 2–1 at Covenant Day) · field hockey (eliminated in overtime by Providence Day) · …" (`sportsPrograms/covenant-day.ts:154`, L972) | The field hockey item has no year, beside a dated soccer item. The overtime loss was 2025–26 (the matrix note at `:150`, L971). In fall 2026 Covenant went out to Cary Christian. | C (undated item) | https://archives.ncisaa.org/index.php?sport=9&years=2026-2027, Division 1: "#6 Covenant Day School (10-9)" beat Greensboro Day 6-0 (Tue 10/20), then lost 3-0 to "#3 Cary Christian School (10-4)" (Fri 10/23). | "field hockey (eliminated in overtime by Providence Day in 2025–26)". Text only. Same shape as LAT-U12, whose six-school fix did not include Covenant's list, which is not a champions list. |

Cross-school note for the parent: both rows belong with **X2**. Other schools' "State-title matrix, last 3 seasons" ('23–24 to '25–26) now sit beside a finished fall 2026. That is not reported here: the three seasons are still the last three complete ones.

## Part 3: R8 triage

Against `rescan6/r8.txt`, nothing changed for these four schools since `consistency5-data/r8.txt` (the two sections diff clean). No new group.

- CCHS AP 22 / 2, seniors 336 / 56 / 67, students 1330 / 9 / 10 / 11 / 12, clubs 76 / 15 / 23: settled rows, skipped.
- CC teams 50 / 44, AP 22 / 21: settled rows, skipped.
- CC students (15 values): every member is a Winterim trip group size or an older trip size. Not a conflict (settled note).
- Covenant camps 29 / 19, seniors 1 / 85, ensembles 1 / 9: settled rows, skipped.
- Carmel: no group.

R8 saw neither Part 2 finding.

## Checked and consistent

- **Round 5's changed text, every restatement:** CC D1 36 / 75% (tile, headline, funnel, bars, note, Compare value, qual, comment); CC 16 components and both new rows; CC 2026-27 season and 54 Scholastic awards in Arts and College Support; CCHS Options rates in FA and Learning Support; CCHS 15 finalists in Arts, Clubs, both Compare rows; CCHS camp ages in tile, headline, filter, intro, Compare value and qual; Covenant's aid question, "nearly twenty", the bolded-list wording and the 2022 Blumey entry; Carmel's arts attributions against the new HS catalog, the music sentence, the GPA scale, the "How it works" row and the Johnson & Wales row.
- **The NC admit-rate tiles and subheads (LAT-U13 at these four schools):** "lowest of the six that year" holds at all four. Catholic's "a little below NC State’s 27.7%. The other four ran 68–98%" and Carmel's "a little below NC State’s 30.8%. The other four ran 57–100%" recomputed. Every "most selective" and "largest admit rates" chip holds on both Fall 2025 and the five-year column (Carmel's ECU ties UNCG at 100% in 2025 and leads on five years).
- **Catalogs:** CC 13 / 24 / 129 rows (22 AP titles); CCHS 199, 26 AP; Covenant 89 / 32 / 41, 17 AP; Carmel 92 / 69 / 16 AP / 9 departments, 46 MS, 11 LS. Carmel's 1 AP + 3 Honors arts cell matches its Arts department rows.
- **Rosters:** level counts by class for all four, against headlines and Compare.
- **Ledgers:** CC six rows; CCHS 15 rows by year and category; Covenant 2 wins and 6 nominations (8 recognitions, 2013–19); Carmel 2023–26 with its six 2026 placements.
- **Covenant's nine ensembles:** today's music page lists "Introduction to Choir and Band (5)" as one offering, so 9 holds. The Compare qual's plural "grade-5 intro ensembles" is wording only.
- **Charlotte Catholic's "4" summer weeks:** the football flyer is still the 2024 edition (July 8–11, 2024), so its week cannot be placed against 2026's. The card's STALE flag already says so. Not reported.
- **Fall 2026 NCISAA brackets at these schools:** CC (football, volleyball, girls tennis), Covenant (field hockey, boys soccer, girls tennis) and Carmel (boys soccer, girls tennis) won no fall title. Carmel's Winning Record makes no claim the results move. Cross country and girls golf print no 2026-27 results.
- **Not rendered, seen:** `src/content/sports/charlotte-christian.json` still carries "48 committed, 35 D1, 9 P4" from an older research note. No page renders it (0 hits in the dump), so it is not a finding. The next CC ingest will carry it unless the record is edited.

Limits: carmelchristian.org and blumenthalarts.org were not requested. The Carmel rows rest on the committed records, and the Blumey rows on the ledgers as built. The page dump omits "Show sources".

## Fetching and names

- 13 requests: archives.ncisaa.org (7 sport pages), resources.finalsite.net (the Catholic flyer), covenantday.org (2 pages). All returned 200 with an empty Location header, and none redirected. No refused host was requested.
- No non-athlete student name was found or written. The new Blumey rows on these pages give roles only. Adults named on the pages (directors, staff, coaches) are staff in adult roles. The brackets and the flyer carry school names only (the flyer's form fields are blank).

## Files touched

Appended `### Re-verification 2026-11-23 (plan consistency6, self-scan)`. Three had no `## Method`, so one was added at the end (marked +).

- `source-material/sports/charlotte-christian/Charlotte Christian - Sports - Redesign Research 2026.md` + (CC-V1)
- `source-material/sports/covenant-day/Covenant Day School - Sports - Championships.md` + (COV-V1)
- `source-material/summer-programs/charlotte-catholic/Charlotte Catholic - Summer Programs - 2026 Camp Catalog.md` (under its existing `## Method`)
- `source-material/the-arts/covenant-day/Covenant Day School - The Arts - Music.md` +

## Settled, skipped

- **S5**, charlotte-christian L681, L685, L817, L819-820: values unchanged and the scope line is there.
- **S6**, carmel-christian L1309-1321, L1358-1369 and the Compare cell: values and qual unchanged.
- **S8**, charlotte-christian L1382 (Notre Dame rows at P4) and charlotte-catholic L1417, L1444: Notre Dame is still P4, and both cards name it in their Power 4 definition. Covenant and Carmel have no Notre Dame row.
- **R8 table rows:** CCHS AP, seniors, students, clubs; CC teams, AP and the long "students" group; Covenant camps, seniors, ensembles.
- S1, S2, S3, S4, S7, S9–S14: no instance on these four pages.
