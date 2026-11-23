# Consistency re-scan (round 6): Davidson Day, Gaston Day, Hickory Grove, Trinity Episcopal, Charlotte Prep

Scanned `main` at 638a4d3e on 2026-11-23. Prior baseline: 5d26847a (round 5). `L<n>` is a line of `rescan6/pages/<slug>.txt`. Data paths are under `src/data/` unless shown otherwise.

How this was checked:

- Every round-5 row for these five schools was traced to the page dump and the data file. The diff 5d26847a..638a4d3e was read for every data file of these schools, plus `metricValues.ts`, `financialAidReports.ts` and `en.json`.
- Every changed value was searched for elsewhere on the page and in Compare (step 8 of the brief).
- The three NCISAA fall 2026 brackets (boys soccer, girls tennis, volleyball) were fetched with curl, GET only, no redirect following (all 200, no Location). They were used only to confirm that no Hickory Grove, Davidson Day or Gaston Day claim is newly stale. No refused host was requested.
- No student is named in this file. Roles in a show are not names. Named athletes appear on the pages only in athletics contexts and are not repeated here.

## Part 1: regression check of round 5

**Counts: 122 rows. RESOLVED 118, UNCHANGED BY DECISION 4, PARTIAL 0, REGRESSED 0, NOT RESOLVED 0.**

The 122 are round 5's 99 Part 1 rows, its 16 findings, the 6 cross-school rows from other groups that reach these schools (CAR-U6, LAT-U12, LAT-U13, LAT-U14, CC-U6, COV-U1), and item 1 of "Settled at the English review". X1 and X2 are counted through their member rows.

### Round 5's not-resolved Part 1 rows and its 16 findings

| id | status | where | note |
|---|---|---|---|
| DD-T2 | RESOLVED | DD L1931; `collegeSupportPrograms/davidson-day.ts`:819 | "Students dug under permit at Cahal Pech with the BVAR project. AFAR worked there for 20 seasons, through 2026." The profile's 2009 and AFAR's 2006 stay attributed at L1916 |
| HG-T1 | RESOLVED | `metricValues.ts`:2102, :2144 | Both row notes end "Hickory Grove’s figure is from summer 2023, the last schedule found." |
| HG-T5 | RESOLVED | `admissionsPrograms/hickory-grove-christian.ts`:762-764, :810, :871 | International band tiles are TOEFL 80 and Aug 1; no $500 tile. Action "Pay in full by August 1". Cross-band L122 unchanged |
| X4 (Trinity) | RESOLVED (recorded deviation) | `summer/trinity-episcopal.ts`:1217; TRI L1138-1140 | `daysPerWeek: 4`. The planner's $101 against the $98.75 bare price is the plan's recorded deviation |
| X4 (Prep) | RESOLVED | `summer/charlotte-prep.ts`:338; PREP L740 | "Rhythm & Beats (four days, $125 a day)". See PREP-V1 for a sibling row the fix did not reach |
| Linked-source review 4 | UNCHANGED BY DECISION | `financialAidReports.ts`, DD sources | Rejected in plan consistency3 |
| DD-U1 | RESOLVED | DD L1217-1218, L1240, L1274, L1338 | "In fall 2026 it won two more: volleyball and girls tennis."; "was the only title survivor"; "won again in fall 2026"; "In 2025–26:"; "The school’s page counts 37 team titles across 13 programs through 2025–26". "visible decline" is gone everywhere. The Cup card stays through 2025–26 by decision |
| DD-U2 | RESOLVED | DD L631, L637, L650-651, L718 | 2024 Something Rotten! row with five finalists, season line, headline "in each of 2024, 2025 and 2026", verdict line. Roles only |
| DD-U3 | RESOLVED (as ruled) | DD L653 | "four nominations … It also had five individual finalists, including Best Actress (as Regina George)" |
| DD-U4 | RESOLVED | DD L89, L193, L213, L243, L613, L623, L672, L696, L718-719, L722 | Each restatement attributed; ask "Are AP Studio Art and Modern Music running this year?" |
| DD-U5 | RESOLVED | DD L1922, L1934 | "a course grid, with courses not offered marked" in both |
| DD-U6 | RESOLVED | `metricValues.ts`:2384, :2434 | "The Class of 2026 comes from the school’s recap; the Class of 2025 from its seven-athlete signing list plus college rosters." |
| DD-U7 | RESOLVED | DD L1353 | "The continuity anchor · Soccer, 2017–2025" |
| GD-U1 | RESOLVED | GD L362, L368, L736-737, L742, L749, L756, L774, L776-777, L814 | 15 everywhere; volleyball four (2021, 2024, 2025, 2026); tennis "three straight, 2023–25"; "State-title matrix, 2023–25". No "14", "Fourteen" or "three-peat" left in the page, the sports file or Compare. 4+4+3+2+1+1 = 15 |
| GD-U2 | RESOLVED | GD L266, L280-290, L291, L338, L346 | Ledger "2024 to 2026", three rows, five finalists each, three nominations (2 + 1 + 0). Roles only |
| GD-U3 | RESOLVED | GD L1418-1419, L1522, L1532 | "Preschool through 8th grade", "the Preschool–4th tier" |
| GD-U4 | RESOLVED | GD L157 | "names three clubs and the Student Government" |
| GD-U5 | UNCHANGED BY DECISION | GD L1410 | Settled as S11; the ask is in place |
| HG-U1 | RESOLVED | HG L34 | "Three school recommendations + pastor" |
| TRI-U1 | RESOLVED | TRI L1222 | "Grades 1–8 materials due (Kindergarten: 1 Feb); Kindergarten decisions emailed" agrees with L35-38, L73-76 and L1223 "9 Apr 2027" |
| PREP-U1 | RESOLVED | PREP L379-380 | "for every class since 2024", over the 2026 / 2025 / 2024 tiles |
| PREP-U2 | RESOLVED | PREP L807 | "Plan to pay full price for those years." |

### Cross-school rows and the English-review item

| id | status | where | note |
|---|---|---|---|
| CAR-U6 (GD) | RESOLVED | GD L803 | "Johnson & Wales (Charlotte) C2C D3"; no "USCAA" on the page |
| LAT-U12 (DD) | RESOLVED | DD L1274 | "What they didn't win: In 2025–26: …" |
| LAT-U13 (DD, GD, HG) | RESOLVED | DD L1708, L1714; GD L1125; HG L1351 | Every tile names "in Fall 2025, the lowest of the six that year". DD's subhead now "just below NC State’s 42.9%. The other four ran 78–100%." (85.7, 100, 77.8, 100). GD and HG subheads stay true (NC State 46.7% and 52.6%) and were left, as planned |
| LAT-U14 (GD, Prep) | UNCHANGED BY DECISION | GD Nike rows, PREP L601 header | The approval covered Latin only. Gaston Day's three and Prep's one age rows still sit under "Grades" |
| CC-U6 (DD) | RESOLVED | DD L1300 | "Ranked recruits" |
| COV-U1 (HG) | RESOLVED (no change needed) | HG L65 | Hickory Grove already says "there is no income cap on applying" |
| English review item 1 (GD 2025 Best Direction) | UNCHANGED BY DECISION | GD L287 | "Nominated for Best Direction." The user kept it |

### Round 5's other 94 Part 1 rows (all RESOLVED in round 5)

All 94 still hold. Rows whose data files did not change since 5d26847a (DD after school, LEC and FA; GD courses, summer and FA; HG courses, clubs, arts, sports, after school and summer; all Trinity and Prep rows outside summer and FA) are unchanged by construction. The rows in changed files were re-read:

| ids | where | note |
|---|---|---|
| DD-T4, DD-S3, DD-S4, X1 (DD) | DD L1286-1315 | 21 / 13 / 5; D1 by sport 6 + 3 + 2 + 1 + 1 = 13; each rank names its service |
| DD-T5, X7, DD-7 | DD L601-607; Compare Arts cells and quals | "5 Blumey finalists (2026)", "AP Studio Art" with its catalog/profile qual, "2 ensembles" |
| DD-5, DD-6, DD-R2 | DD L252-254, L1916, L1931 | 2006 and 2009 both attributed; see DD-V1 for the one restatement left |
| DD-8, DD-9, DD-S1, DD-R1 | DD L1274, L1342-1369, L764, L735-764 | |
| GD-T7, GD-T8, GD-T10, GD-T13, S10 | GD L152-158, L338, L342, L330 | 9 organizations; three Upper School ensembles on both the card and Compare; one-edition arts grades; "Art-school acceptances" |
| HG-T2, HG-T3, HG-17 | HG summer cards; Compare `summer-weeks`, `summer-camps` | 6 weeks and 15 camps, each labelled 2023 |

## Part 2: new findings

**2 findings: A 1, C 1. Both are restatements a round-5 fix did not reach (DD-V1 is on the round-5 plan's "For the next round" list).**

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change |
|---|---|---|---|---|---|---|---|
| DD-V1 | Davidson Day | Global Exposure › Verdict vs the same area's trip ledger and timeline, and College Support | "Summer field research at three active sites in Spain, Portugal and Belize. The Belize work spent 20 seasons at Cahal Pech before its current site." (`internationalTravel/davidson-day.ts`:447, L367). "Current site" reads as a site already being dug | "AFAR's first season at a new Maya site" under "Summer 2027, as announced" (L274-276); "2027Baking Pot. The Belize project moves to a new Maya site." (L362); "It moves to Baking Pot in 2027." (L1916); "The Belize dig moves to Baking Pot in 2027." (L1931). As of November 2026 the Baking Pot season has not started | C (year label) | Committed `source-material/international-travel/davidson-day/Davidson Day - International Travel - Source URLs.md` (fall 2026 school story): "This was AFAR's final season at Cahal Pech"; "In 2027, the Belize project moves about 20 minutes upriver to Baking Pot". Internal comparison; no fetch | No value change. "…in Spain, Portugal and Belize. The Belize work moves to Baking Pot in summer 2027, after 20 seasons at Cahal Pech." English-first; the point is extracted prose, so Phase 2 re-translates one unit |
| PREP-V1 | Charlotte Prep | Summer › Camp Catalog row vs its own description, the catalog headline and the tier detail | Kidokinetics: "Mon–Fri" over "June 15–18 and July 13–17" (`summer/charlotte-prep.ts` ~L228 `dayLabel`, L686-692) | Same row: "$400 in the four-day week, $500 in July" (:222); headline "Camp was closed June 19 … so June 15–18 was the one four-day week" (L595-596); the Rhythm & Beats row in the same week reads "Mon–Thu" (L637-643) | A | Committed `source-material/summer-programs/charlotte-prep/Charlotte Preparatory School - Summer Programs - Summer Adventures 2026 Catalog.md`: "Week 2 · June 15–18 · Mon–Thu (4-day week) · … Kidokinetics" (L36) and "Kidokinetics · June 15–18 · K-8 · … 4-day week" (L91). The Costs record lists "Kidokinetics · June 15–18 (4 days) · $400" (L69). No fetch | `dayLabel: 'Mon–Thu (June) · Mon–Fri (July)'`. Or keep "Mon–Fri" and end the description with "The June run is Monday to Thursday." `dayLabel` renders raw (`SummerPrograms.tsx`:356), so this is not CHROME. Related but lower: the three "All 7 weeks · Mon–Fri" rows (Young Adventurers, Traditional Camp, Junior Counselor) also span the four-day week. The headline and the tier details say so ("$420 in the four-day week"), so no change is proposed for them. Rule gap: R3 and R10 read camp counts and prices, not the days label against a row's own dates |

No other new value conflict was found.

## Part 3: R8 triage

These five schools have 15 R8 groups. None is new since round 5's report, and each one's numbers are exactly the same as in the settled table, so none needed triage.

- Charlotte Prep teams 10 / 4 / 2 / 3 / 11 / 9: settled.
- Davidson Day teams 35 / 33; students 565 / 13 / 10 / 18 / 500 / 4 / 1; institutions 2 / 70 / 278: settled.
- Gaston Day teams 19 / 7 / 5 / 20; camps 1 / 27; seniors 1 / 35 / 18; institutions 2 / 231; students 11 / 510; ensembles 2 / 3: settled.
- Hickory Grove teams 30 / 28 / 27; seniors 1 / 34: settled.
- Trinity teams 4 / 2 / 10 (the settled row's 4 / 2 / 4 / 10, de-duplicated); camps 21 / 38 / 8 / 13 / 3; students 5 / 419: settled.

## Checked and consistent

- **What round 5 changed, restatement by restatement:**
  - DD fall 2026 titles against the matrix, the Cup list, the honors ledger, Coaching and Compare. The Cup card stays on 2025–26 by decision.
  - DD's 2024 Blumey row against the headline, season line and verdict, and the 2023 nomination count.
  - DD's catalog/profile attribution on all eleven AP Studio Art and Modern Music mentions.
  - DD's admit-rate subhead (78–100% recomputed).
  - GD's 15 titles and 4 + 4 + 3 + 2 + 1 + 1 split, five titles in 2021–22, and the matrix title.
  - GD's Blumey ledger and its three nominations, and "Preschool" in four After School places.
  - HG's International band, and both Compare summer notes.
  - Trinity's timeline row against Admissions and the 9 Apr row.
  - Prep's placement sentence and aid box.
- **Fall 2026 NCISAA brackets:**
  - Hickory Grove went out in round one of 3A boys soccer and was not in the 3A girls tennis or volleyball brackets. Its page makes no fall 2026 claim.
  - Davidson Day boys soccer lost before the final. Gaston Day boys soccer went out in round one. Neither page claims otherwise.
- **Arithmetic:**
  - NC admit pools for DD (177 / 298), GD (140 / 242) and HG (256 / 342).
  - Prep's tuition changes in every row of both history tables, the $418 Refund Plan estimate, and the after-school figures ($25 an afternoon, $50 by drop-in).
  - Trinity's $820 and $55 a day, its 83 = 21 + 38 + 8 + 13 + 3, its 10 teams (4 + 2 + 4) and its 17 clubs.
  - GD's 19 teams, 9 clubs (2 + 2 + 3 + 1 + 1) and its drop-in versus weekly break-even.
- **Compare against the page:**
  - DD travel cells, credential, counselor ratio and commit quals.
  - GD buckets, Arts cells, after-school value and summer cells.
  - HG after-school ≈$260/mo and its qual, and its summer quals.
- **Not swept:** live news (out of scope); translated overlays.
- **Looked at and not reported:**
  - DD's "20 seasons · 2006–2026": the school's own count, recorded as consistent in the Source URLs record.
  - DD's "Spain (2014)" profile date beside "11th field season" in 2026: gap years are unknown, so it cannot be decided.
  - Trinity's ensemble choice "beginning in 5th Grade" against "Sixth-grade students choose": both are school quotes, already flagged on the page as "The wording shift, preserved".

## Files touched

None. No source-material file was appended to. The NCISAA brackets were saved only under `rescan6/dl-dd/` in the scratchpad. They supported no finding or value change.

## Settled, skipped

- **S3** (GD camp care period): GD summer cost card and Compare `summer-care-span` qual: "$25/wk" and "$35/wk", unchanged.
- **S10** (GD iGEM not listed): GD L152-158, Compare `≥9`. The page shows 9.
- **S11** (GD undated college list): GD L854-870 (231, 2 / 8, 6 / 17) and the ask at L1410. All are unchanged.
- **All 15 R8 groups** in Part 3.
- Not in settled.md, but decided elsewhere and not reported: "largest admit rates of the six" on a tied 100% (DD L1717 table, GD L1128 table, HG L1354 table; gated by `check:ncsuper`); the NJCAA row at D3 (HG L1103; plan `allcommits`).
