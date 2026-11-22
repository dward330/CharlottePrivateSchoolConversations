# consistency5: rescan of consistency4

- **Date:** 2026-11-22
- **Mode:** RESCAN of round 4 (plan `consistency4`, PR #520)
- **SCANNED_SHA:** `5d26847a` (main)
- **Previous scan base:** `13551180`
- **Groups:** `pd-ccd-cannon`, `latin`, `cc-cchs-cov-carmel`, `dd-gd-hg-k8` (all 13 schools)
- **Files:** each sweep as returned (`rescan5-*.md`), `r8.txt`, and this file. Where they differ, this file is the verified version.
- **Verdict:** NOT CLEAN. 7 Part 1 rows are partial or regressed and 72 new findings stand (79 rows before two cross-school merges).
- **Caused by round 4:** 7 of those 79: five Part 1 rows, plus CC-U3 and CAR-U1 in part.
- **Planned 2026-11-22** as [consistency5](../consistency5.md). Its approvals and rulings supersede the open lists below, and it adds the planning fetches.

## How this was verified

- All 78 sweep rows had their quotes tested against the page dumps and the data. 63 matched by script. The other 15 (PD-U2, PD-U4, PD-U12, PD-U13, CCD-U6, LAT-U1, LAT-U8, LAT-U14, CC-U2, CC-U3, CCHS-U1, CAR-U1, CAR-U3, CAR-U6, DD-U5) span table cells or were re-punctuated, and were checked by hand. All hold.
- All seven partial or regressed Part 1 rows were confirmed in the data or the dump.
- The parent re-opened the source for six claims: LAT-U2, LAT-U3, CC-U1, CC-U3, HG-T5 and PD-U14. All six confirm. For the rest, the evidence is the sweep's own fetch, saved copy or recount. **Re-open each before typing a value.**
- A quote holding does not prove the proposed fix. Judge each fix against CLAUDE.md at planning time.
- Refused hosts were not requested on purpose. The Latin sweep reached charlottelatinsummer.com once through a redirect (401, response unused, not retried).
- **Names:** every sweep file and appended line was screened against the local name list: 0 hits. That list holds only names somebody found. No Latest News content was scanned.

## Part 1: regression check

| group | rows | RESOLVED | NOT RESOLVED | PARTIAL / REGRESSED | UNCHANGED BY DECISION | n/a |
|---|---|---|---|---|---|---|
| pd-ccd-cannon | 135 | 126 | 0 | 1 | 8 | 0 |
| latin | 68 | 61 | 0 | 1 | 1 | 5 |
| cc-cchs-cov-carmel | 121 | 116 | 0 | 1 | 4 | 0 |
| dd-gd-hg-k8 | 99 | 94 | 0 | 4 | 1 | 0 |
| **all** | 423 | 397 | 0 | 7 | 14 | 5 |

Latin's report counts repeated older rows twice, so they are counted once here. Its LAT-T11 is re-labeled from UNCHANGED BY DECISION to REGRESSED: the round-4 drop was the parent's judgment, not a user ruling, and round 4 then added the conflicting text.

| row | what is left | caused by round 4? | fix |
|---|---|---|---|
| CCD-T21 | World Quest and Euro Challenge joined the catalog, and Academic & Competitive Clubs still lists two programs | yes | add both as school-reported cluster rows |
| LAT-T11 | The new Compare qual names an Acapella Club beside the Arts ask "no a cappella" | yes | name the open club in the ask, and ask about an auditioned group |
| COV-T15 | The strength camp was removed, and the Compare `summer-ages` qual still names it | yes | fix the qual, its comment and the record |
| DD-T2 | Students are credited with 20 seasons at Cahal Pech, beside a dig dated 2009 | yes | give the 20 seasons to the project |
| HG-T1 | The Compare weeks note says summer 2026 over Hickory Grove's 2023 figure | yes (weeks) | name the 2023 year in both notes |
| HG-T5 | The International band still shows a $500 enrollment deposit, which the live page does not name | no | delete the tile and fix the action; re-splice paths |
| X4 | Trinity's and Charlotte Prep's four-day camps are still divided by five | no | `daysPerWeek: 4` at Trinity; split or label Prep's camp in the tier detail |

## Cross-school rows

| id | cat | one cause | members |
|---|---|---|---|
| X1 | A | Older Blumey years are missing from the ledgers or sentences. The user deferred this to this round on 2026-11-22. No student is named in a fix. | LAT-U7, DD-U2, GD-U2, CC-U5, CCHS-U2, CAR-U1, COV-U4 |
| X2 | A | Fall 2026 NCISAA results date the Winning Record. Country Day and Latin were seen in the same brackets and their pages were not checked: check every NCISAA school. | DD-U1, GD-U1 |

Single rows that reach other schools: PD-U1 (HBCU tags, also Country Day), CC-U6 (heading, nine schools), LAT-U12 (undated "What they didn't win", six schools, five not recounted), LAT-U13 (admit-rate tile template, 11 schools, only Latin's numbers checked), LAT-U14 (ages under a Grades header, five schools), CAR-U6 (Johnson & Wales Charlotte, fix on Gaston Day).

## Tally

New findings after the merges: **A 44, B 5, C 18, D 5 = 72.** Before them: A 51, B 5, C 18, D 5 = 79.

| school | A | B | C | D | rows |
|---|---|---|---|---|---|
| Providence Day | 9 | 0 | 3 | 2 | 14 |
| Country Day | 3 | 1 | 2 | 0 | 6 |
| Cannon | 6 | 1 | 2 | 0 | 9 |
| Charlotte Latin | 8 | 0 | 6 | 1 | 15 |
| Charlotte Christian | 5 | 0 | 1 | 0 | 6 |
| Charlotte Catholic | 3 | 0 | 0 | 0 | 3 |
| Covenant Day | 4 | 0 | 0 | 0 | 4 |
| Carmel Christian | 3 | 2 | 1 | 0 | 6 |
| Davidson Day | 4 | 1 | 1 | 1 | 7 |
| Gaston Day | 4 | 0 | 0 | 1 | 5 |
| Hickory Grove | 0 | 0 | 1 | 0 | 1 |
| Trinity Episcopal | 1 | 0 | 0 | 0 | 1 |
| Charlotte Prep | 1 | 0 | 1 | 0 | 2 |

## New findings

The exact fix and evidence are in the linked row of each sweep file.

| id | school | section | cat | value A | value B | merged into | caused by round 4? | re-opened by parent | row |
|---|---|---|---|---|---|---|---|---|---|
| PD-U1 | Providence Day | College Support › HBCUs bucket, Compare `bucket-hbcu` | A | PD "14 / 107" (L1788; `collegeSupportPrograms/providence-day.ts` L753). CCD "19 / 107" (L1666; `…/charlotte-country-day.ts` L749) and "The list holds 19 HBCUs" (L2287; L808) | The lists beneath also hold "University of District of Columbia" (L2138; L354, `cats: []`) and "University of Maryland Eastern Shore" (L1986; L331, `cats: []`) |  | no |  | rescan5-pd-ccd-cannon.md:155 |
| PD-U2 | Providence Day | Sports › Winning Record matrix | A | "Girls Basketball · — · — · RUNNER-UP" (L1609; `sportsPrograms/providence-day.ts` L174–180, 2023–24 cell `NONE`) | Cannon’s page: "2024 beat Providence Day 62–51" (L1148) and "beat Providence Day in both the 2024 and 2026 finals" (L1112) |  | no |  | rescan5-pd-ccd-cannon.md:156 |
| PD-U3 | Providence Day | Sports › Winning Record headline | A | "Four NCISAA 4A state titles in 2025–26 — the most of any 4A school in North Carolina that year." (L1561; L123) | Durham Academy won four as well: "girls cross country, girls track, boys tennis and boys lacrosse (Durham Academy)" (L1509) and Cannon’s list (L1141). PD’s own list drops Durham’s girls track (L1610) |  | no |  | rescan5-pd-ccd-cannon.md:157 |
| PD-U4 | Providence Day | College Support › acceptance list rank label | A | "Miami University–OH" with no rank (L1979; L195) | "Miami University · National Rank #133" (L1850) and "Miami University (Oxford) · National Rank #133" (L1466) |  | no |  | rescan5-pd-ccd-cannon.md:158 |
| PD-U5 | Providence Day | After School › Coverage Map vs Summer Programs | A | "JUN–AUG" (L2520; `afterSchoolPrograms/providence-day.ts` L87) | "Nine sessions run June 1 to July 31, 2026." (L2746) |  | no |  | rescan5-pd-ccd-cannon.md:159 |
| PD-U6 | Providence Day | Summer › two camp descriptions vs the grade column | A | "The IDEAS lab’s architecture camp, open to the widest grade span in the program." on 6–12 (L2903; `summer/providence-day.ts` L329) and "Half-day songwriting workshop spanning the full grade range." on 3–12 (L2875; L276) | The IDEAS lab’s own "The Life of an Influencer" is 3–12 (L2945), Soccer is TK–9 (L3064), and the program runs from TK |  | no |  | rescan5-pd-ccd-cannon.md:160 |
| PD-U7 | Providence Day | Financial Aid › Beyond Tuition vs After School | A | "Seventeen confirmed components for a 2026–27 family — 9 unpriced" with no Activity Day item (L3326; `financialAidReports.ts` L1722) | "The Activity Day fee is never stated. The school says a separate fee applies on teacher workdays and holidays" (L2523; `afterSchoolPrograms/providence-day.ts` L105) |  | no |  | rescan5-pd-ccd-cannon.md:161 |
| PD-U8 | Providence Day | College Support › Applicant’s Edge | A | "A deep UK/Europe pipeline (Oxford, St Andrews, UCL, LSE, Trinity Dublin, Toronto)" (L2469; L809) | Toronto is in Canada. The other sentence calls it "A deep international list" (L2362) |  | no |  | rescan5-pd-ccd-cannon.md:162 |
| PD-U9 | Providence Day | Sports › National Stage headline | C | "MaxPreps ranked PD #1 in North Carolina across all classifications" (L1740; L618), undated | "Yet MaxPreps still ranked it #3 in NC" for 2025 (L1755) |  | no |  | rescan5-pd-ccd-cannon.md:163 |
| PD-U10 | Providence Day | Sports › ranked recruits vs roster | C | "the No. 1 offensive tackle and No. 4 recruit nationally, to Tennessee" (L1641; L264) | The roster’s 247 Nat’l column gives David Sanders Jr. 6 (L1653) |  | no |  | rescan5-pd-ccd-cannon.md:164 |
| PD-U11 | Providence Day | College Support › National Merit ledger, 2021 | C | "25 recognized in all, 17% of the class" (L2387; `collegeSupportPrograms/providence-day.ts` L567) | The same row lists "6 Semifinalists · 16 Commended · 4 National Recognition", which add to 26 |  | no |  | rescan5-pd-ccd-cannon.md:165 |
| PD-U12 | Providence Day | Sports › Coaching, continuity anchor | D | "20 · consecutive CISAA XC titles, 2000–20" on Ben Hovis’s tiles (L1700; L504) | "XC / Track, since 2002" and "24 yrs · leading the program" (L1693) |  | no |  | rescan5-pd-ccd-cannon.md:166 |
| PD-U13 | Providence Day | Sports › Coaching, pedigree hire | D | "147–26 · career record, 15 seasons" (L1687; L491), with no as-of year | The same card dates him "since 2020", and the 2026 season is under way (L1684) |  | no |  | rescan5-pd-ccd-cannon.md:167 |
| CCD-U1 | Country Day | Financial Aid › Beyond Tuition vs After School | A | "Ten confirmed cost components — 2 unpriced", with Extended Day at "$60–$900/mo, or $19/hr drop-in" and no registration or conference-day charge (L3202; `financialAidReports.ts` L227) | "Contract registration$80", "Drop-in registration (one-time)$40" (L2450; `afterSchoolPrograms/charlotte-country-day.ts` L232) and full-day conference care "at a separate cost" (L2345) |  | no |  | rescan5-pd-ccd-cannon.md:168 |
| CCD-U2 | Country Day | Sports › Coaching | A | "the school has not yet named a girls basketball coach" (L1610; `sportsPrograms/charlotte-country-day.ts` L451) | The school’s athletics directory names one |  | no |  | rescan5-pd-ccd-cannon.md:169 |
| CCD-U3 | Country Day | Sports › Coaching | B | "both still on staff" (L1582; L414), "When he retires after the 2026 season" (L1601; L438), "retirement is still to come" (L1610; L451), "retiring after 2026" (L442) | The 2026 season is over on the same page: "2026: 19–3 … lost the state final" (L1520). The tile closes his tenure "1987–2026" |  | no |  | rescan5-pd-ccd-cannon.md:170 |
| CCD-U4 | Country Day | The Arts › Verdict | A | "plus back-to-back NCTC state championships with The Crane Wife" (L1202; `artsPrograms/charlotte-country-day.ts` L352) | "The Crane Wife, a second consecutive championship, which places it in fall 2018, with the prior title in fall 2017 (title unknown)" (L1133) |  | no |  | rescan5-pd-ccd-cannon.md:171 |
| CCD-U5 | Country Day | Compare `us-organizations` qual vs Affinity & Identity Groups | C | "Only 11 are confirmed by name in public sources." (`metricValues.ts` L1772) | The school page names nine Upper School affinity groups, eight of them outside the 11 ("Asian Affinity Club", "International Club", "Jewish Culture Club" and others; L975) |  | no |  | rescan5-pd-ccd-cannon.md:172 |
| CCD-U6 | Country Day | College Support › Where Graduates Go vs Admission Rates | C | "seniors admitted to UNC–Chapel Hill (up from 23)" (L1678; `collegeSupportPrograms/charlotte-country-day.ts` L740, also L734 and L807) | The state table gives 20 accepted for that prior class, Fall 2025: "29.0%", 20 of 69 (L2087); Compare "20 / 69" |  | no |  | rescan5-pd-ccd-cannon.md:173 |
| CAN-U1 | Cannon | Clubs › Club Catalog, Compare `us-organizations` | A | "One consolidated view of every student organization Cannon names directly", 15 of 15, Governance 3 (L559). Compare "≥20": "8 named Upper School organizations plus its 12" | The school names an Upper School Honor Council, and so do our own committed records (the Web Check’s `## Governance`, the Governance PDF) |  | no |  | rescan5-pd-ccd-cannon.md:174 |
| CAN-U2 | Cannon | Global Exposure vs Clubs | A | "Model UN is a Middle School academic team" (L378; `internationalTravel/cannon.ts` L274) | "Middle & Upper School; … US team earned awards at Duke’s DUMUNC" (L569) |  | no |  | rescan5-pd-ccd-cannon.md:175 |
| CAN-U3 | Cannon | The Arts › checklist vs College Support | A | "What does the 7:30 a.m. Varsity commitment really look like across a week" (L841; `artsPrograms/cannon.ts` L383) | "Zero Hour runs Varsity Chorus and Varsity Orchestra, pass/fail, on Monday, Wednesday and Friday before school." (L1810) |  | no |  | rescan5-pd-ccd-cannon.md:176 |
| CAN-U4 | Cannon | Compare `signature-recognition` | A | "NCTC festival", "the recognition its note leads with" (`metricValues.ts` L1564) | The card leads with "Fifteen Blumey finalist placements across 2023, 2025 and 2026" (L733) and says "no regional placement, state advancement or named award" in NCTC could be found (L766) |  | no |  | rescan5-pd-ccd-cannon.md:177 |
| CAN-U5 | Cannon | Compare `advanced-arts-coursework` | C | "AP Studio Art", "The advanced arts course the note names is AP Studio Art." (`metricValues.ts` L1630) | "Advanced Topics: Art History is a second AP-level option" (L815) |  | no |  | rescan5-pd-ccd-cannon.md:178 |
| CAN-U6 | Cannon | The Arts › season vs Blumey ledger | B | "2025-26: Mean Girls: High School Version, Feb 11–14" (L741; `artsPrograms/cannon.ts` L147) | "Mean Girls School Edition" for the same production (L755; L164) |  | no |  | rescan5-pd-ccd-cannon.md:179 |
| CAN-U7 | Cannon | The Arts › Verdict vs College Support | C | "all 24 Upper School arts courses are Honors, AP or Advanced Topics … That is a signal you can check about how the arts count on a GPA and transcript" (L834; `artsPrograms/cannon.ts` L352) | "AT and AP courses carry 1.0 quality point, Honors Accelerated 0.5 (new for 2026–27), and Honors none at all." (L1812) |  | no |  | rescan5-pd-ccd-cannon.md:180 |
| CAN-U8 | Cannon | Summer › two camp descriptions vs the rows | A | "The oldest camp in the catalog — leadership for teens." on 14–17 (L2254; `summer/cannon.ts` L283) and "the school’s most-repeated outdoor camp" on four weeks (L2352; L466) | College Essay Bootcamp is "Rising seniors only" (L2212). Fishing also runs four weeks (L2373) |  | no |  | rescan5-pd-ccd-cannon.md:181 |
| CAN-U9 | Cannon | Sports › Winning Record, Show sources | A | Source label "2024 volleyball title" (`sportsPrograms/cannon.ts` L212; in Show sources, so not in the dump) | "Volleyball: 2023: 23–2, sweeping North Raleigh Christian" (L1149); no title in 2024–25 |  | no |  | rescan5-pd-ccd-cannon.md:182 |
| LAT-U1 | Charlotte Latin | Admissions › TK/K and Grades 1–5 bands, cross-band table, checklists, disclaimer; Financial Aid › Beyond Tuition | A | "Feb 26, 2027 · no contract due date published" and "Apr 9, 2027 · no contract due date published" L111–112 (`admissionsPrograms/charlotte-latin.ts:709-710`, also `:303`, `:408`, `:766`, both Decision steps and callouts). "Testing and file material due: None published" L106–107 (`:700-701`). "Interview at the Visit Day: Not described" L96–97 (`:682-683`). "testing fees" listed under "NO PUBLISHED EVIDENCE — TREATED AS NOT CHARGED" L2938 (`financialAidReports.ts:1450`) | The CAIS brochure that Latin's own Application Process page links, and that the card cites for how to book the test, publishes all four. The other CAIS pages on this site already show its dates (for example Charlotte Christian and Covenant Day: Mar 5 and Apr 16, 2027). Latin's own record says the $300 fee is transcribed from this brochure (Grade-by-Grade record L186) |  | no |  | rescan5-latin.md:132 |
| LAT-U2 | Charlotte Latin | Admissions › header tile, Upper School band, checklists, cross-band table | A | "Grades 1–12 application deadline" L31 (`admissionsPrograms/charlotte-latin.ts:173`); "the deadline every grade from 1 through 12 works to" (`:336`); "the deadline shared by every grade from 1 through 12" (`:437`, `:550`); "The Grades 1–12 deadline" (three checklist rows) | The same card gives "nothing published for Gr 12" L114 and "Grades 1-11 notification day". Our own live-check record L22 quotes "January 15: Grades 1-11 applications due" |  | no | yes | rescan5-latin.md:133 |
| LAT-U3 | Charlotte Latin | Admissions › TK/K band | A | "The TK/K Fly By Open House on October 10, 2026, 9:30–11:00 a.m. is the one dated event published for this band." L54 (`admissionsPrograms/charlotte-latin.ts:218`; header comment `:156`) | The school now lists a second dated TK/K event |  | no | yes | rescan5-latin.md:134 |
| LAT-U4 | Charlotte Latin | Financial Aid › Trend & Questions | A | "They exclude the deposit, trips, insurance, …" L3023 (`financialAidReports.ts:1637`) | "deducted from the second tuition payment" (Admissions L71 and L116, and FA › Paying the Balance L2998): the deposit is part of tuition, so the $469,800, $251,600 and $146,000 totals already contain it |  | no |  | rescan5-latin.md:135 |
| LAT-U5 | Charlotte Latin | Financial Aid › Beyond Tuition (Hawks' Club box) | A | "TK/K 1:30–4:30 p.m.: $635/day implies $2,540 for four days, but the table prints $2,300. Grades 1–5 2:55–4:30 p.m.: $295/day implies $1,180" L2936 (`financialAidReports.ts:1446`) | After School › Cost Planner L2122: $635 is the price for a whole semester at one day a week, and the five-day price also breaks ($2,540, where 5 × $635 = $3,175). Q8 in the same report asks about "the four-day and five-day" rates |  | no |  | rescan5-latin.md:136 |
| LAT-U6 | Charlotte Latin | College Support › Whole Class, non-traditional destinations | A | "The lists include service academies: the Naval Academy and The Citadel, plus a 2025 Air Force Academy appointment." L1942 (`collegeSupportPrograms/charlotte-latin.ts:851`) | The site counts five federal service academies (round 4's X6, `metricValues.ts` bucket-lac75). The Citadel is not one, and "United States Air Force Academy" is itself on this card's acceptance list |  | no |  | rescan5-latin.md:137 |
| LAT-U7 | Charlotte Latin | The Arts › Blumey ledger, Honest context, ask | A | "The Blumey ledger — results from four years" L916 (`artsPrograms/charlotte-latin.ts:150`); "But results since then are modest. Latin had five finalists in both 2025 and 2026 … This ledger covers four years of Blumenthal releases" L932 (`:179`); the ask at L995 | Latin also had five finalists in 2023 (Shrek the Musical) and in 2024 (Mean Girls High School Edition), so it had five in each of the four years 2023–26 | X1 | no |  | rescan5-latin.md:138 |
| LAT-U8 | Charlotte Latin | The Arts › Ladder, Music & the Honors Pipeline | A | "one band, one orchestra and one choir per division" L874–875, L934–935 (`artsPrograms/charlotte-latin.ts:41`, `:213`). With three divisions that reads as up to nine | "3 ensembles" L872 (Compare, built in round 4: "each offered in grades 5–12"); board "Band (5–12) · Orchestra (5–12) · Concert Choir (5–12)" L938; "Grade 5 joins the Grades 5–12 ensembles" L885. Lower School TK–4 has none |  | no |  | rescan5-latin.md:139 |
| LAT-U9 | Charlotte Latin | College Support › Whole Class note and gap | C | "The Class of 2026's size is not printed, so no testing rate can be computed." L1933 (`collegeSupportPrograms/charlotte-latin.ts:818`) | The school's 2025–26 profile prints "2025–26 Senior Class: 145", and our record holds it (School Profile 2026-2027 record L527) |  | no |  | rescan5-latin.md:140 |
| LAT-U10 | Charlotte Latin | Student Clubs › Honor Societies | C | "28 inducted in the most recent ceremony" L827 (`clubsPrograms/charlotte-latin.ts:153`), undated | The cited article is the April 2024 ceremony (Classes of 2024 and 2025). At least two school years have passed since |  | no |  | rescan5-latin.md:141 |
| LAT-U11 | Charlotte Latin | Student Clubs › Service teaser and headline | C | "students still logged 3,396 hours by the end of junior year" L798–799 (`clubsPrograms/charlotte-latin.ts:98`), no year | The same card has "3,396 hours · Class of 2023" L810 (`:119`) and 5,485 hours for the Class of 2018, two figures for one metric (sweep item 6) |  | no |  | rescan5-latin.md:142 |
| LAT-U12 | Charlotte Latin | Sports › Winning Record | C | Under "State-title matrix, last 3 seasons": "What they didn't win: … girls lacrosse … boys swimming (Cary Academy) …" L1311 (`sportsPrograms/charlotte-latin.ts:197`) | The matrix just above shows STATE for Girls Lacrosse and Boys Swimming in '23–24, and the Cup card lists four girls lacrosse and four boys swimming titles. The list covers 2025–26 only and does not say so |  | no |  | rescan5-latin.md:143 |
| LAT-U13 | Charlotte Latin | College Support › Admission Rates tile and subhead | C | Tile "33.3% at UNC-Chapel Hill — 23 of 69, the toughest of the six for this school" L1849 (`collegeSupportPrograms/charlotte-latin.ts:412`), no year, beside two tiles that pool five classes. Subhead "against far higher rates at the less-selective universities" L1843 (`:408`) | Five-year column: NC State 33.1% is lower than Chapel Hill's 38.3%. In Fall 2025 NC State's 34.3% is one point above 33.3%, so not "far higher" |  | no |  | rescan5-latin.md:144 |
| LAT-U14 | Charlotte Latin | Summer › Camp Catalog | C | Column header "Grades" L2370 and filter label "Grade" L2366, over "5 - 10y" and "3.5–5 / 6–8 / 9–11 / 12–15 / 16–18". The bands 6–8 and 9–11 read as school grades (`SummerPrograms.tsx:277`, `:328`) | "Latin indexes every camp by age, not by grade — grade equivalents are not published anywhere on its site" L2364 (`summer/charlotte-latin.ts:28`) |  | no |  | rescan5-latin.md:145 |
| LAT-U15 | Charlotte Latin | College Support › Learning differences; Financial Aid › Beyond Tuition | D | "charges for sessions are not included in tuition and are billed per session each month" L1937 (`collegeSupportPrograms/charlotte-latin.ts:833`), stated as current with no year | "Fourteen confirmed components for a 2026–27 family" L2917 (`financialAidReports.ts:1419`) has no Learning Resources charge |  | no |  | rescan5-latin.md:146 |
| CC-U1 | Charlotte Christian | Sports › Pipeline; tile; Compare `d1-commits-2426` | A | "'25Stokes GreeneGolfQueens (Charlotte)**SAC——D2**" (`sportsPrograms/charlotte-christian.ts:286`, L1379) | The same roster: "'26Morgan BanksSoftballQueens (Charlotte)**ASUN——D1**" (L1379). The other six Queens rows on the site, Class of 2024, 2025 and 2026 (Catholic, Covenant, Carmel, Latin, Country Day), are all ASUN D1. |  | no | yes | rescan5-cc-cchs-cov-carmel.md:157 |
| CC-U2 | Charlotte Christian | FA › Fees and Additional Costs | A | "Fifteen confirmed components — all 15 priced" (`financialAidReports.ts:700`, L2900), listing only "Bridge care JK–K · $125/mo" (`:713`, L2911) and no aid fee | The same page: "The Clarity application carries its own **$65 fee**" (L74) and "Gr 1–4 · Bridge 2:40–3:35 · $125" (L2063-2068) |  | no |  | rescan5-cc-cchs-cov-carmel.md:158 |
| CC-U3 | Charlotte Christian | Arts › Ladder, Theatre season | A | "The 2025-26 season is themed "Pure Imagination," … But individual production titles were not published at time of research." (`artsPrograms/charlotte-christian.ts:111`, L930); same at `:139` (L938); "Published as an unordered set, without years" (`:145`, L941) | Today's box office publishes the 2026-27 season and titles. The same card's new ledger row names the 2025-26 musical: "2026 · Cinderella (Blumey)" (L948-949). |  | in part | yes | rescan5-cc-cchs-cov-carmel.md:159 |
| CC-U4 | Charlotte Christian | Arts › Studio to Gallery, Verdict ask vs College Support (#9) | A | "no award counts appear here" (`artsPrograms/charlotte-christian.ts:330`, L1028); "participation cited on both … pages" (`:326`, L1027) | "Scholastic Art & Writing — **54 awards** over the last five years, per the 2026–27 profile." (L1981) |  | no |  | rescan5-cc-cchs-cov-carmel.md:160 |
| CC-U5 | Charlotte Christian | Arts › Theatre ledger, context, Verdict | A | The ledger runs 2026, 2024, 2016, 2015, 2013 (L948-962). "A top-prize win, plus recent finalists" names 2024 and 2026 (`:346`, L1033). | Five finalists in 2023 too, for Into the Woods | X1 | no |  | rescan5-cc-cchs-cov-carmel.md:161 |
| CC-U6 | Charlotte Christian | Sports › Pipeline (#10) | C | Chrome heading "Ranked recruits, **current cycle**" (`en.json:436`; CC L1366, CCHS L1413, Covenant L1000, Carmel L830) | The athletes beneath are past classes: "Bryce Young (’24…" (CC L1367); "Jack Larsen … Class of 2024" (CCHS L1414); "Emily Eaton ’24" (Covenant L1001); "Cade Tyson (’22)" (Carmel L831) |  | no |  | rescan5-cc-cchs-cov-carmel.md:162 |
| CCHS-U1 | Charlotte Catholic | FA › Tuition vs Learning Support (#9) | A | "CCHS is a 9–12 school, so there is no ladder of grade bands at all. **These three rows are the entire schedule.**" (`financialAidReports.ts:2662`, L2083) | "Options Program tuition, 2026-27 · **$24,077** … $18,345 for Participating Catholic families" (L433-435, L503) |  | no |  | rescan5-cc-cchs-cov-carmel.md:163 |
| CCHS-U2 | Charlotte Catholic | Arts › Theatre, Verdict; Clubs › Honor Societies | A | "ten finalist places across two years"; "One student was recognized in both years"; "The two productions above are pieced together from Blumey records" (`artsPrograms/charlotte-catholic.ts:148`, L985); "Recognition in both years" (`:255`, L1061); season table from 2024–25 (`:127`, L942-948); clubs `:175` (L882) | A third year: five finalists in 2024, for Phantom of the Opera | X1 | no |  | rescan5-cc-cchs-cov-carmel.md:164 |
| CCHS-U3 | Charlotte Catholic | Summer › tile, headline, filter; Compare `summer-ages` | A | "ages 6–13" (L2022); "for children aged 6 to 13, not for its own high schoolers" (`summer/charlotte-catholic.ts:42`, L2024-2025); "Rising 6–9 / ages 11–13" (`:55`, L2028); qual "rising 2nd-9th graders aged 6-13" (`metricValues.ts:2219`; value `:2205`) | "Cougar Football Camp … **Rising grades 3–9**" (L2047-2051). A rising 9th grader is about 14, and is an incoming high schooler. |  | no |  | rescan5-cc-cchs-cov-carmel.md:165 |
| COV-U1 | Covenant Day | FA › What to Ask, Q3 | A | "How does the mandatory NC Opportunity Scholarship application interact with CDS aid for families **above the state income cap**?" (`financialAidReports.ts:1112`, L1922) | There is no cap: "with no income cap" (Catholic L2123); "income caps have been removed" and "above the **former** income cap" (Carmel L1767, L1824); Hickory Grove says the same |  | no |  | rescan5-cc-cchs-cov-carmel.md:166 |
| COV-U2 | Covenant Day | Clubs › Service headline | A | "fourth graders **at twenty community sites**" (`clubsPrograms/covenant-day.ts:26`, L504-505) | "**nearly twenty** different sites" (L509); "nearly twenty sites" (L501); tile "~20" (L506) |  | no |  | rescan5-cc-cchs-cov-carmel.md:167 |
| COV-U3 | Covenant Day | College Support › Where Graduates Go, Whole Class (#9) | A | "with the **deepest concentrations** at NC publics and Christian colleges" (`collegeSupportPrograms/covenant-day.ts:291`, L1105); "The **deepest enrolled concentrations** are Chapel Hill, NC State, UNC Charlotte, App State and East Carolina" (`:659`, L1446) | "bold = **at least one** graduate enrolled" (L1131); "No enrollment-rate percentages" (L1358); "no enrollment rates for each class" (L1447) |  | no |  | rescan5-cc-cchs-cov-carmel.md:168 |
| COV-U4 | Covenant Day | Arts › context, ask | A | "The ledger goes quiet after 2019 at the Blumeys." (`artsPrograms/covenant-day.ts:102`, L635); "when did the program last enter the Blumeys? **The public ledger stops in 2019.**" (`:197`, L697) | Covenant entered in 2022 | X1 | no |  | rescan5-cc-cchs-cov-carmel.md:169 |
| CAR-U1 | Carmel Christian | Arts › Theatre ledger, context, Verdict | A | "**~2022-23** · Singin' in the Rain" (`artsPrograms/carmel-christian.ts:162`, L476-478); "**One student** placed in three straight years." (`:169`, L479); "after finalist places in 2024 and 2025" (`:269`, L523) | The 2023 list has Carmel's show as **Mary Poppins**, with three finalists. Two students placed in three straight years. | X1 | in part |  | rescan5-cc-cchs-cov-carmel.md:170 |
| CAR-U2 | Carmel Christian | FA › Aid Process and Timeline | A | "**Every year**Aid is need-based and assessed through FACTS" (`financialAidReports.ts:2051`, L1768) | "**whether aid must be reapplied for annually, are also unstated**" (L1772) |  | no |  | rescan5-cc-cchs-cov-carmel.md:171 |
| CAR-U3 | Carmel Christian | Arts › Ladder vs Course Offerings | B | "Every **K–4** student takes both music and art classes. At grade 5 visual art continues and students **may join** choir" (`artsPrograms/carmel-christian.ts:72`, L444; also `:58`, L433-436; Compare `program-span` qual) | "Music**K–Gr 5**Special Areas (All Grades)" and "six Special Areas **for all grades**" (L321, L341) |  | no |  | rescan5-cc-cchs-cov-carmel.md:172 |
| CAR-U4 | Carmel Christian | Arts › Ladder, Studio, Verdict vs Course Offerings | B | High School "**Technical Theater and Design**" and "**Creative Writing**" (`artsPrograms/carmel-christian.ts:93-94`, L448; "a High School arts elective" `:235`, L508-509). L525 credits the cluster to "**the Course Offerings guide**" (`:277`). | The 96 High School rows have neither (L178-222). Creative Writing is a Middle School elective only (L314). |  | no |  | rescan5-cc-cchs-cov-carmel.md:173 |
| CAR-U5 | Carmel Christian | College Support › Verdict | C | "So a weighted GPA **quoted today** is not calculated the same way as one quoted for a **current freshman**." (`collegeSupportPrograms/carmel-christian.ts:705`, L1306) | The change starts "from the Class of 2026" (same bullet), so a senior and a freshman today are weighted alike. Only the Class of 2024 ranges (L1203-1205) use +1 / +2. |  | no |  | rescan5-cc-cchs-cov-carmel.md:174 |
| CAR-U6 | Carmel Christian | Sports › Pipeline | A | "Miles LeaksBasketballJohnson & Wales**C2C**D3" (`sportsPrograms/carmel-christian.ts:243`, L841), the Charlotte campus in the record | Gaston Day L790-791: "Johnson & Wales (Charlotte)**USCAA**"; "competes in the **USCAA rather than the NCAA**" (`sportsPrograms/gaston-day.ts:276`, `:283`) |  | no |  | rescan5-cc-cchs-cov-carmel.md:175 |
| DD-U1 | Davidson Day | Sports › Winning Record; Honors ledger | A | "Seven state championships in 2023–24 — the most of any 2A school that year — then four, then one. This is a program in visible decline." (`sportsPrograms/davidson-day.ts`:164, L1214-1215); "Boys tennis is the only title survivor of 2025–26" (:166); "37 team titles across 13 programs" (:431, L1335), undated | Two NCISAA 3A titles in fall 2026: volleyball and girls tennis | X2 | no |  | rescan5-dd-gd-hg-k8.md:160 |
| DD-U2 | Davidson Day | Arts › Theatre, ledger and verdict | A | "The 2023-24 title could not be found" (`artsPrograms/davidson-day.ts`:134, L638); "The Blumey ledger — every year found" with no 2024 (:141, L641); "five finalists in both 2025 and 2026" (:119, L630-631) | 2023-24 was "Something Rotten!", with five finalists | X1 | no |  | rescan5-dd-gd-hg-k8.md:161 |
| DD-U3 | Davidson Day | Arts › Blumey ledger, 2023 | D | "five nominations, three of them for the whole program… The others were Best Actress (as Regina George) and Best Featured Performer (as Mrs. George)." (`artsPrograms/davidson-day.ts`:159, L653) | The saved official 2023 list has four Davidson Day nominations. It lists that Best Actress entry only as a finalist |  | no |  | rescan5-dd-gd-hg-k8.md:162 |
| DD-U4 | Davidson Day | Course Offerings; Arts; College Support | B | Shown as running, with no note: "Creative Writing Honors" (`courseOfferings.ts`:6006, L88), "Modern Music" (:6400, L212, L623, L667, L716), "Forensics & Zoology Honors" (:6504, L242), "AP Spanish Literature and Culture" (:6335, L192-193); "Studio I→Studio II Honors→AP Studio Art" and "1 AP", "Studio Art — the only arts AP" (L612-613, L693, L1916) | The 2026–27 profile marks the first four "Course not offered in 26-27" and prints Studio I and II as College Prep, with no AP Studio Art. The site admits part of this: "AP Spanish Literature is listed but not offered this year" (L1857); Compare: "The 2026–27 School Profile’s course list does not print it." |  | no |  | rescan5-dd-gd-hg-k8.md:163 |
| DD-U5 | Davidson Day | College Support › Applicant's Edge, verdict | A | "It also has the complete course catalog, with courses not offered clearly marked." (`collegeSupportPrograms/davidson-day.ts`:692, L1919); "the complete catalog with unoffered courses flagged" (:831, L1931) | "22 · AP courses on the 2026–27 Profile’s offered list (the catalog lists 26)" (L1846-1847); Compare: AP Studio Art is not on the profile |  | no |  | rescan5-dd-gd-hg-k8.md:164 |
| DD-U6 | Davidson Day | Compare `p4-commits-2426`, `d1-commits-2426` quals | A | "the Classes of 2025 and 2026 come from the school’s own published lists." (`metricValues.ts`:2380, 2430) | "The school published a seven-athlete signing list for the Class of 2025… Every other row on this card is confirmed on the college’s own roster." (L1288). The card has nine rows for 2025 (L1310) |  | no |  | rescan5-dd-gd-hg-k8.md:165 |
| DD-U7 | Davidson Day | Sports › Coaching | C | "The continuity anchor · Soccer, since 2017" (`sportsPrograms/davidson-day.ts`:484, L1350) | "2017–2025" (L1361); "the season after he left" (L1358) |  | no |  | rescan5-dd-gd-hg-k8.md:166 |
| GD-U1 | Gaston Day | Sports › Offered (stat), Winning Record, Honors | A | "14 team state championships since 2021" (`sportsPrograms/gaston-day.ts`:63, 67, L349, L354); "Fourteen NCISAA team state championships since 2021" (:167, L723-724); "Girls tennis has four titles and is on a three-peat; volleyball and boys soccer have three each" (:169, L724, L736, L743, L761); "State-title matrix, last 3 seasons" over 2023–2025 (:170, L725-729) | Gaston Day won 2A volleyball in fall 2026, so 15 titles and four in volleyball. It was not in the 2026 2A girls tennis bracket, so the three-peat is over. It went out in the first round of boys soccer | X2 | no |  | rescan5-dd-gd-hg-k8.md:172 |
| GD-U2 | Gaston Day | Arts › "Theatre & the Blumeys" | A | "The school publishes no production titles, performance dates, cast sizes or theatre competition results… its record is not. This card deliberately carries no awards ledger rather than an empty one." (`artsPrograms/gaston-day.ts`:139, L278); "What is missing is the record rather than the program" (:267, L329). The card's title names the Blumeys and has no Blumey fact (L261) | Blumenthal's lists carry Gaston Day in 2024, 2025 and 2026 | X1 | no |  | rescan5-dd-gd-hg-k8.md:173 |
| GD-U3 | Gaston Day | After School | A | "Care runs to 5:30 pm for Pre-K through 8th grade." (`afterSchoolPrograms/gaston-day.ts`:26, L1405); "The program covers Pre-K through 8th grade only" (:85, L1420); :248 (L1509); "the Pre-K–4th tier" (:267, L1519) | "PS–4th · care from 3:00" (L1409, L1437). At this school Preschool (3's) and Pre-K (4's) are different grades |  | no |  | rescan5-dd-gd-hg-k8.md:174 |
| GD-U4 | Gaston Day | Student Clubs › verdict hint | A | "Its Upper School page names three clubs and says students can start a new one with a faculty sponsor; its Academic Profile names the rest." (`clubCatalog.ts`:627, L157) | Upper School Student Government is one of the nine, and it is on the Upper School page, not in the profile (L167-168, and the card's own source line) |  | no |  | rescan5-dd-gd-hg-k8.md:175 |
| GD-U5 | Gaston Day | College Support › Where Graduates Go | D | "Ivy League — Yale and Dartmouth", "2 / 8" and the 231 list (L854-868) | The school's live Upper School page prints a short college list with Harvard, Brown and MIT, none on our list (also Agnes Scott, Brenau, Wheaton) |  | no |  | rescan5-dd-gd-hg-k8.md:176 |
| HG-U1 | Hickory Grove | Admissions › Middle band button | C | "Three teacher recommendations" (`admissionsPrograms/hickory-grove-christian.ts`:484, L34) | "Math + English + principal/counselor + pastor" (L84); the band's steps say "Four recommendation forms", two of them from teachers |  | no |  | rescan5-dd-gd-hg-k8.md:182 |
| TRI-U1 | Trinity Episcopal | Financial Aid › timeline vs Admissions | A | "26 Feb 2027", "Application materials due; first admission decisions follow" (`financialAidReports.ts`:2978, L1222) | Kindergarten materials are due "Feb 1, 2027", and Kindergarten decisions are emailed on Feb 26 itself (L35-38, L73-76) |  | no |  | rescan5-dd-gd-hg-k8.md:188 |
| PREP-U1 | Charlotte Prep | High School Placement › Where Graduates Go | C | "Charlotte Prep has published a rate like it for every class since 2023." (`highSchoolPlacementPrograms/charlotte-prep.ts`:71, L379-380) | Three class tiles beneath: 2026, 2025, 2024 (L381-389). The file says "2023 IS A DIFFERENT MEASURE" |  | no |  | rescan5-dd-gd-hg-k8.md:194 |
| PREP-U2 | Charlotte Prep | Financial Aid › Section 03 box | A | "For a family planning nine or ten years at the school, the Early School years cost the most once aid is counted." (`financialAidReports.ts`:3159, L807) | The table beside it: Pre-Primary $17,700, Primary $18,500, TK $23,900, all below Kindergarten's $25,800 (L774-780). The school publishes no award size by grade |  | no |  | rescan5-dd-gd-hg-k8.md:195 |
| PD-U14 | Providence Day | Sports › College Pipeline roster | A | Elon football: "Southern" (`src/data/sportsPrograms/providence-day.ts:374`) | CAA on Charlotte Christian's two Elon football rows and on Elon's live 2026 schedule |  | no | yes | found at Step 5; fix: conference to CAA here and in the Class of 2027 record |

## Dropped, moved, merged, re-labeled at Step 5

- **Dropped:** none.
- **Re-labeled:** LAT-T11 to REGRESSED (Part 1).
- **Merged:** seven rows into X1 and two into X2.
- **Added:** PD-U14, a lead the Christian sweep noted and did not research.

## Approvals (every UX-GATE and CHROME mark)

- **LAT-U14** (UX-GATE + CHROME): a per-school "Ages" header and filter label in the Camp Catalog, designed in Claude Design first.
- **CC-U6** (CHROME, ten catalogs): "Ranked recruits, current cycle" becomes "Ranked recruits".
- **Only if the fix grows the card:** LAT-U1 (a deadline tile or cost row), GD-U1 (a matrix column or honors row), GD-U2 (a ledger block that has never rendered at Gaston Day). Decide at planning. X4 at Charlotte Prep is the same if it gets its own tier.

## Decisions for the user

### D items

- **PD-U12:** supply the source for "20 consecutive titles, 2000–20" on a coach there since 2002, or approve crediting them to the program with "(he took over in 2002)".
- **PD-U13:** supply the season that "147–26, 15 seasons" runs through, or leave it.
- **LAT-U15:** date the Learning Resources charge to the archived guidelines, or have the school's pop-up read in a browser and add the cost component if it is current.
- **DD-U3:** supply the May 2023 nominee list, or approve "four nominations… and five individual finalists".
- **GD-U5:** merge the school's undated college list (Harvard, Brown, MIT) into the acceptance list, or make it a question for the school. The merge rule widens a window, and this list has none.

### Calls attached to other findings

- **CAN-U1:** whether Compare's organization count moves from 20 or more to 21 or more.
- **CAN-U4:** whether the Compare cell becomes "15 Blumey finalists".
- **LAT-U9:** no testing rate from two profile editions unless the user says so.
- **Held from round 4, resolved 2026-11-22:** CAN-T17 and CAR-T8. The user opened both documents and had them read in Chrome (plan steps 5a and 5b).

### B items: wording of the attribution and of the ask

- **CCD-U3:** "The school announced the retirement after the 2026 season; its athletics directory still lists him as program head."
- **CAN-U6:** the show's two titles, each attributed (the school's and Blumenthal's).
- **CAR-U3:** K–4 music on the arts page, through grade 5 in the elementary guide, with an ask.
- **CAR-U4:** two arts courses on the arts page and not in the course guide, with the ask widened.
- **DD-U4:** four courses the profile marks not offered in 2026–27 and the catalog lists, with an ask.

## Rule candidates

- **R12, one college, one conference:** for one college and sport group (football apart), rosters must agree on conference and level. A trial today split 6 of 261 colleges: three real (CC-U1, CAR-U6, PD-U14) and three needing handling before it can gate (Miami of Ohio against Miami, Davidson wrestling, the two spellings of SAC). Johnson & Wales also has a second, GNAC campus to keep apart. Calibrate to zero.
- **Widen `check:memberships`:** its hand-kept HBCU list misses UDC and UMES (PD-U1). Compare it with the full federal list.
- **Not proposed:** the two rules settled.md records as turned down.

## Outside a value scan, carried from consistency4's Implementation notes

- `audit:daterender` and `audit:moneyrender` know 6 of the 26 real checklist bands.
- `format.ts` can double the period after a localized `/wk` or `/sem`.
- English wording and older translation issues the translators flagged.

## Settled entries

- **Skipped, values unchanged:** S1–S10 wherever seen. None was raised as a finding.
- **Reopened:** none.

## Settled candidates (for settled.md's R8 table)

None. Every group the sweeps triaged as not a conflict already matches a settled row.

## Source-material files appended to (30, uncommitted)

Appends only, under `## Method`.

- `source-material/admissions/charlotte-christian/Charlotte Christian - Admissions - Financial Aid Platform Migration to Clarity.md`
- `source-material/admissions/charlotte-latin/Charlotte Latin - Admissions - Live Dates Check 2026-11-10.md`
- `source-material/admissions/hickory-grove-christian/Hickory Grove Christian - Admissions - Live-Site Refresh 2026-11-04.md`
- `source-material/admissions/trinity-episcopal/Trinity Episcopal School - Admissions - Application Process and Testing.md`
- `source-material/after-school/charlotte-christian/Charlotte Christian - After School - Redesign Research 2026.md`
- `source-material/after-school/charlotte-country-day/CCD - After School - Redesign Research 2026.md`
- `source-material/college-support/_shared/HBCU - Membership and Count 2026.md`
- `source-material/college-support/charlotte-latin/Charlotte Latin - College Support - Redesign Research 2026.md`
- `source-material/college-support/covenant-day/Covenant Day School - College Support - Fit and the Whole Class.md`
- `source-material/college-support/davidson-day/Davidson Day - College Support - School Profile 2026-2027.md`
- `source-material/college-support/gaston-day/Gaston Day School - College Support - School Profile Research 2026.md`
- `source-material/college-support/providence-day/Providence Day - College Support - Redesign Research 2026.md`
- `source-material/financial-aid-tuition/charlotte-catholic/Charlotte Catholic - Financial Aid & Tuition - Schedule and Aid Programs 2026-2027.md`
- `source-material/financial-aid-tuition/charlotte-latin/Charlotte Latin - Financial Aid and Tuition - Scholarships and Aid FAQ.md`
- `source-material/sports/carmel-christian/Carmel Christian - Sports - College Commitments 2024-2026.md`
- `source-material/sports/charlotte-christian/Charlotte Christian - Sports - College Commitments 2024-2026.md`
- `source-material/sports/charlotte-country-day/Charlotte Country Day - Sports - Redesign Research 2026.md`
- `source-material/sports/davidson-day/Davidson Day - Sports - Redesign Research 2026.md`
- `source-material/sports/gaston-day/Gaston Day School - Sports - Program and Championship Ledger 2026.md`
- `source-material/sports/providence-day/Providence Day - Sports - Redesign Research 2026.md`
- `source-material/student-clubs/cannon/Cannon - Clubs - Honor Societies Web Check 2026.md`
- `source-material/student-clubs/charlotte-country-day/CCD - Clubs - Club Catalog Web Check 2026.md`
- `source-material/student-clubs/charlotte-latin/Charlotte Latin - Student Clubs - Clubs Redesign Deep Research.md`
- `source-material/student-clubs/covenant-day/Covenant Day School - Student Clubs - Service and Community Engagement.md`
- `source-material/summer-programs/charlotte-catholic/Charlotte Catholic - Summer Programs - 2026 Camp Catalog.md`
- `source-material/summer-programs/covenant-day/Covenant Day School - Summer Programs - Redesign Research 2026.md`
- `source-material/summer-programs/providence-day/Providence Day - Summer Programs - Camp Catalog.md`
- `source-material/the-arts/charlotte-catholic/Charlotte Catholic - The Arts - Program Facilities and Recognition 2026.md`
- `source-material/the-arts/charlotte-christian/Charlotte Christian - The Arts - Arts Redesign Deep Research.md`
- `source-material/the-arts/charlotte-latin/Charlotte Latin - The Arts - Arts Redesign Deep Research.md`
