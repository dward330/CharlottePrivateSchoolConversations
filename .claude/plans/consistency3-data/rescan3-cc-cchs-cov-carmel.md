# Re-scan #2: Charlotte Christian · Charlotte Catholic · Covenant Day · Carmel Christian (2026-11-20, main d19fc9da)

Pages are `pages3/<slug>.txt`. Data lines are on d19fc9da. `diff pages2 pages3` changes exactly the lines consistency2 targeted for these four schools (CC 5 hunks, CCHS 3, Covenant 6, Carmel 2) and nothing else.

## Part 1: regression check of consistency2's worklist (`consistency2-data/rescan-cc-cchs-cov-carmel.md`)

| id | status | where | note |
|---|---|---|---|
| X1 (CCHS) | RESOLVED | charlotte-catholic L1402-1410 | The bars sum to 39, the funnel D1 figure (L1398). |
| X1 (Covenant) | RESOLVED | covenant-day L991-999 | The bars sum to 10, matching D1. |
| X4 (CC) | RESOLVED | charlotte-christian L153, L243 | 143 everywhere, with "Shown here as 129 entries". |
| X4 (Carmel) | RESOLVED | carmel-christian L23, L29 | 96 (77 distinct titles). |
| X6 (CC) | RESOLVED | L2909; FA Q1–Q6 L2977-2982 | |
| LAT-2 (CC) | RESOLVED | L1482, L1512 | 55 / 68 |
| CC-4 | RESOLVED | L153, L243; Compare `us-courses` 143 + qual | |
| CC-5 | RESOLVED | L155, L243, L1993; Compare qual | |
| CC-6 | RESOLVED | L921 (JK–4), L923 (5–8), L962, L971 | |
| CC-7 | RESOLVED | L1967-1968, L841, L507 | |
| CC-9 | RESOLVED; qual residue UNCHANGED BY DECISION | L2110, L2138 | The Compare `summer-camps` qual still says "roughly 96". consistency2 Decisions: leave it. |
| CC-10 | RESOLVED | L815, L817 | |
| CC-11 | RESOLVED | L159 | |
| CC-27 | RESOLVED | L1081 | |
| CC-29 | RESOLVED | L1924; Compare qual | |
| CCHS-12 | RESOLVED | L2065, L2079-2082; Compare $21,562 / $86,248 | |
| CCHS-13 | RESOLVED | L1326-1327 + matrix | |
| CCHS-14 | RESOLVED | L1993 | "five honor societies" |
| CCHS-15 | RESOLVED | L1881 | 13 |
| CCHS-16 | RESOLVED | L1551, L1575, L2009 | |
| CCHS-17 (was PARTIAL) | **RESOLVED** | L440-441 tile "6 · counselors · a Director of Counseling and five school counselors, plus a Mental Health Intervention Counselor"; L561 headline; `learningSupport/charlotte-catholic.ts:167` `verdicts.social.head` "A Director of Counseling and five school counselors, …" | The staff list (L572-580) matches: 1 Director, 5 School Counselors and 1 MHI. The 21 total recounts as 1 + 5 + 5 + 7 + 3. |
| CCHS-31 | RESOLVED | L794, L1066, L1395, L1939 | |
| R8 residue CCHS ~195 | RESOLVED | L1938 ~222 | |
| COV-23 | RESOLVED | L1630 $4,464 | |
| COV-24 | RESOLVED | L574-575 | |
| COV-25 | RESOLVED | covenant-day L574; carmel-christian L433 | |
| COV-27 (was PARTIAL) | **RESOLVED** | L723 / L732 / L737 "Fall · 8 sports / Winter · 4 sports / Spring · 6 sports"; L744 "The 18-sport figure…" | R8 no longer reports a Covenant teams group. |
| COV-2b | RESOLVED | L1001 "ten sports" | |
| CAR-3 | RESOLVED | L23, L29; Compare qual | |
| CAR-18 | RESOLVED | L894-895 (30) | |
| CAR-19 | RESOLVED | L888-891 | |
| CAR-20 | RESOLVED | L859-860 (4) | |
| CAR-21 | RESOLVED | L437-438 | |
| CAR-22 | RESOLVED | L429 "1 AP + 3 Honors" | |
| CAR-26 (was PARTIAL) | **RESOLVED** | L538-539 "9 varsity sports across 29 teams"; tile L542 29 | The chips recount 10 + 9 + 10 = 29. |
| CAR-28 | RESOLVED | L1214, L1226 "In 2023" | |
| CAR-30 | RESOLVED | L775-777 | |
| CC-R1 | RESOLVED | L911-912, L920, L989 | It matches Clubs L857 ("three arts") and the Verdict L1029. |
| CC-R2 | RESOLVED | L905, L933-957, L1024; `metricValues.ts:1532`, `:1559` | No parent-visible "Best Show" remains. The phrase survives only in unrendered PDF-derived sections of `src/content/the-arts/charlotte-christian.json`. |
| CC-R3 | UNCHANGED BY DECISION | L817 scope line: "Knights Nations Club, named in an undated school article, is not on the Upper School clubs list and is not counted." | This is the default ruling. The headline "two global-awareness student groups" (L819) is now reconciled by the scope line. |
| CC-R4 | RESOLVED | `metricValues.ts` `aftercare-cost` sub "≈$2,925/yr" and qual "assumes 9 billing months, which the school does not publish". The row note states both conventions (9 months for a monthly rate with no published count; annual price ÷ 10). Page L2075 shows "School year (9 billing months) $2,925". | Convention check: CC, CCD and PD are ×9, unpublished; Carmel is ×9, published. Covenant's $6,696 is the school's own table (= $744 × 9). Cannon, Latin and HG are ÷10. All agree with the note. Dev-only residue: the code comments at `metricValues.ts` ~L1965 ("carries a ×10-month estimate") and ~L1986-1988 ("10 months, or 9 for Country Day and Providence Day") are stale. They are not parent-visible, so this is not a finding. |
| CCHS-R1 | RESOLVED | L1431 | "three sports and four leagues", against the six alumni beneath (NFL ×2, MLS ×2, USL, WTA). |
| COV-R1 | RESOLVED | L1484-1485, L1547 | "at the school since 2003". See COV-S1 for the Sports card, which the fix did not cover. |
| CAR-R1 | RESOLVED | L392-393 | "three of them with published GPA thresholds and induction windows". Recount: NHS, Beta and NJHS have both; SHS has neither (L410-412). |
| CAR-R2 | UNCHANGED BY DECISION | `metricValues.ts` Carmel `aftercare-cost` qual | The cell stays $245/mo. The qual now adds the K Young Cougars Club $230 ($475 to 6:00). The $245 × 9 = $2,205 matches page L1371. |

## Part 1b: plan `consistency` findings (`consistency-data/findings.md`, rows for these schools plus the X rows)

| id | status | where (pages3) | note |
|---|---|---|---|
| X1 (CCHS, Covenant) | RESOLVED | CCHS L1402-1410; COV L991-999 | The bars are derived from the roster and equal the D1 funnel (39; 10). Bars with 0 D1 commits are hidden. |
| X4 (CC, Carmel; CCHS and Covenant already agreed) | RESOLVED | CC L153/L243; CAR L23/L29; CCHS L29 (199); COV L134 (90) | |
| X6 (CC) | RESOLVED | L2909 "Middle school extended day · $8 per hour, 3:00–5:00 p.m."; the FA questions no longer ask about MS care | |
| X7 (PD and CCD; the row note covers CC) | RESOLVED for these schools | `aftercare-cost` note and the CC qual | CC was brought onto the ×9 ruling by CC-R4. |
| LAT-2 (CC side) | RESOLVED (recorded deviation: UT Austin at all five) | L1482, L1512 55/68 | |
| CC-4 | RESOLVED | L153, L243 | 143 (shown as 129) |
| CC-5 | RESOLVED | L155, L243, L1993 | 21 on the guide's AP list / 22 titles; the ask says 22 |
| CC-6 | RESOLVED (recorded deviation: Grade 5/6 items moved too) | L921, L923, L962-971 | |
| CC-7 | RESOLVED | L1967-1968, L841 | |
| CC-9 | RESOLVED | L2138 "34 of the 133 sessions (22 of the 96 camps)"; L2110 "96 distinct camps" | |
| CC-10 | RESOLVED | L815 (MS 7), L817 (38) | |
| CC-11 | RESOLVED | L159 | |
| CC-27 | RESOLVED | L1081 | |
| CC-29 | RESOLVED | L1923-1924 | |
| CCHS-12 | RESOLVED | L2065, L2081 "Community"; Compare $21,562 / $86,248 | |
| CCHS-13 | RESOLVED (recorded deviation: calendar-year columns) | L1326 + matrix | |
| CCHS-14 | RESOLVED | L1993 | |
| CCHS-15 | RESOLVED | L1881 | |
| CCHS-16 | RESOLVED | L1551, L1575, L2009 | |
| CCHS-17 | RESOLVED | L440-441, L536, L561, verdict head `:167` | consistency2 completed the fix (see Part 1). |
| CCHS-31 | RESOLVED | L794, L1066, L1395, L1938-1939; Compare qual | 1,330 (NCES 2023–24); ~222 |
| COV-23 | RESOLVED | L1630 | |
| COV-24 | RESOLVED | L574-575 | |
| COV-25 | RESOLVED | L574 | |
| COV-27 | RESOLVED | L712-715, L723/732/737, L744 | consistency2 completed the fix. |
| COV-2b | RESOLVED | L1001 | |
| CAR-3 | RESOLVED | L23, L29 | |
| CAR-18 | RESOLVED | L895 | |
| CAR-19 | RESOLVED | L888-891 | |
| CAR-20 | RESOLVED | L860 | |
| CAR-21 | RESOLVED | L438 | |
| CAR-22 | RESOLVED | L429 | |
| CAR-26 | RESOLVED | L538-542 | consistency2 completed the fix. |
| CAR-28 | RESOLVED | L1214, L1226; Compare "16 AP" | |
| CAR-30 | RESOLVED | L775-777 | |

## Part 2: new findings (fresh sweep)

| # | school | section(s) | value A (where: file:line) | value B (where: file:line) | category | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|
| CC-S1 | Charlotte Christian | Summer › Camp Catalog intro; Compare `summer-weeks` qual | "The season runs June 1 to July 17, 2026, **with a two-week break around July 4**" (`summer/charlotte-christian.ts:29`, page L2137). The qual: "the school takes a **two-week break** around July 4 (June 29 – July 3 has no camps)" (`metricValues.ts:2096`, comment `:2069`). | The camp weeks: Week 4 is June 22-26 and Week 5 is July 6-10, so **one** week is off. The qual's own parenthetical names one week. Arithmetic on the page: June 1 – July 17 is 7 calendar weeks, and 6 camp weeks + 2 weeks off = 8. | A | https://resources.finalsite.net/images/v1782233699/charlotte/charlotte/charlotte/rxwhbvna5ckduwhzpp9p/CCSCamps2026At-a-glance.pdf (today): "Week 4: June 22-26", "Week 5: July 6-10". The PDF has no break wording, and neither does https://www.charlottechristian.com/campus-life/summer-camps. The error starts in our record (`…Summer Programs - Camp Catalog.md` L27: "two-week break (June 29 - July 3)"). | Intro: "…with a one-week break for July 4 (no camps June 29 – July 3)". Qual: "Six weeks, but not consecutive: there are no camps the week of June 29 – July 3." Comment `:2069` likewise. Fix the record line L27 too. |
| CC-S2 | Charlotte Christian | College Support › Verdict ask vs the National Merit ledger | Ask: "12 National Merit finalists on a rolling 15-year window, **down from 16 six years earlier**" (`collegeSupportPrograms/charlotte-christian.ts:774`, page L1993) | Ledger rows: "15-yr (2026–27 profile) · 12 Finalists" and "15-yr (2021–22 profile) · 16 Finalists" (`:432`, page L1898-1903). The two editions are **five** years apart. | A | Internal arithmetic on our own ledger rows. | "…down from 16 in the 2021–22 profile." Undated wording, so it cannot go stale. |
| CC-S3 | Charlotte Christian | Arts header strip / Compare `advanced-arts-coursework`; Arts ladder tile vs Course Offerings and the ladder text | "2 AP + 9 Honors" (`metricValues.ts:1594`, qual `~:1631` "…nine Honors Fine Arts courses on the school's 2026–27 profile"; page L907), and the ladder tile "2 AP · Studio Art (2-D & 3-D) · Art History" (`artsPrograms/charlotte-christian.ts:58`, L915-916) | The same page's 2026–27 curriculum guide list shows **3 AP** arts courses: AP Art and Design, AP Art History and AP Music Theory (L428, L430, L436). It also shows **10 Honors** in its Fine Arts department, adding Chamber Ensemble Honors (L442) and UKnight Worship Honors (L454) to the profile's list. That makes 11 with Digital Design & Animation II, which the profile also counts. The ladder text says "All six music ensembles are Honors-designated…, plus uKnight Worship" (L926), and the profile's nine name only four. | B (the school's two 2026–27 documents differ) | Committed records (PDFs not re-downloaded). Profile: `…School Profile 2026-2027.md` L164, Fine Arts Honors = "Acting Studio; Art III; Broadcasting; Upper School Choir; Digital Design and Animation II; Digital Music II; Jazz Band; Orchestra; Wind Ensemble", AP = "AP Art History; AP Art & Design". Guide: `…Course Offerings - Curriculum Guide.md` L192 "Chamber Ensemble Honors — Honors · Semester · Zero Hour" and L200 "UKnight Worship Honors — Honors · Zero Hour · Audition". The Music card (L984) already says AP Music Theory has no description and may not run. | No change to the cell or tile values. Qual: "…on the 2026–27 profile. The 2026–27 curriculum guide also lists AP Music Theory (no description) and two more Honors ensembles, Chamber Ensemble and UKnight Worship." Add a dev-only code comment on the cell. |
| COV-S1 | Covenant Day | Sports › Coaching: Pedigree & Continuity (headline, kicker) | "The college counseling director **has coached varsity volleyball for 22 seasons**"; kicker "Volleyball, 22 seasons" (`sportsPrograms/covenant-day.ts:355`, `:360`; page L1033-1035) | The same card: tile "22 · seasons as head coach **in 2024**", "2003 · at Covenant Day since" (`:363`; L1037-1042), and a 2025 season result (L1043). Undated, the headline is a year or two stale. This is the same root cause as COV-R1, which was fixed in College Support only. | C | Sports record "…Coaches Pedigree and Continuity.md" L15/L33: "22nd season of varsity volleyball in 2024". | Headline: "…has coached varsity volleyball since 2003 (22 seasons through 2024)…". Kicker: "Volleyball, since 2003". |
| COV-S2 | Covenant Day | Compare `advanced-arts-coursework` qual vs Course Offerings | "Honors Auditioned Theatre is **the** performing-side advanced course" (`metricValues.ts` ~L1625) | Course Offerings lists three performing-arts Honors courses: Choir Honors (L269), Symphonic Band Honors ("The honors band track", L273-274) and Auditioned Theatre Honors (L279) | A | Internal recount of `courseOfferings.ts` (Covenant Fine Arts). | "Choir Honors, Symphonic Band Honors and Honors Auditioned Theatre are the performing-side advanced courses." |
| CAR-S1 | Carmel Christian | Sports Offered subhead vs the chips | "**Basketball, soccer and volleyball** carry a JV and Middle School ladder" (`sportsPrograms/carmel-christian.ts:29`; L539) | Chips: Baseball is V · JV · MS (L561), and Girls Basketball is V · MS only, with no JV (L557) | A | Sports record "…Redesign Research 2026.md" L55: "Baseball (V, JV, MS)". | "Boys basketball, soccer, volleyball and baseball carry a JV and Middle School ladder…" |

## Part 3: R8 triage (`r8b.txt`)

No group is new since `r8.txt` for these four schools. The regex fix surfaced none here. One group dropped out: Covenant teams 8/4/6 vs 43 (COV-27, now resolved). Carmel has no group (CAR-26 resolved).

- **CCHS AP 22 vs 2.** Not a conflict. 22 is the AP subjects examined (2026); 2 is the junior-year load norm.
- **CCHS seniors 336 vs 56.** Not a conflict. These are the seniors and the seniors per counselor.
- **CCHS students 1330 vs 9/10/11/12.** Not a conflict. The 9–12 values are grade numbers.
- **CCHS clubs 76 vs 15 vs 23.** Not a conflict. These are category subtotals of 76.
- **CC teams 50 vs 44.** Not a conflict. It is the school's "50+", footnoted against 44 chips (L1081).
- **CC AP 22 vs 21.** Not a conflict. It is the attributed guide-list vs titles split (CC-5).
- **CC students (15 values).** Not a conflict. These are Winterim trip group sizes.
- **Covenant camps 29 vs 20.** Not a conflict. The marketed 29 against the 20 enumerable camps is attributed (intro and qual).
- **Covenant seniors 1 vs 85.** Not a conflict. The "1" is the one dedicated counselor.
- **Covenant ensembles 1 vs 9.** Not a conflict. The "1" parses "sequential from grade 1".

## Checked and consistent

- **The pages2→pages3 diff.** Every changed line was checked for restatements:
  - CC: the Blumey name across the tile, Theatre, Verdict and Compare; the honor-society count across Arts, Clubs and Verdict; the Knights Nations scope line against the 23/38 counts.
  - CCHS: counselors across the tile, Services, the staff list, the verdict head, College Support "a director and five counselors" and the Compare qual; the pro-alumni leagues.
  - Covenant: the season headers and footnote against 18 sports / 43 teams; the director tenure across CS and the verdict.
  - Carmel: the honor-societies table; the headline against 29 chips.
- **CCHS Learning Support.** Every count was recounted:
  - 21 staff;
  - Services subtotals 8/3, 0/3, 3/1, 4/1 and 0/1;
  - Ask the School, thirteen questions;
  - Options tuition and the $1,995 capital fee against FA ($23,677 = $21,562 + $1,995 + $120).
- **Compare values and quals for all four schools.** Checked against the page tiles and against the tuition-run arithmetic:
  - CC $342,300 / $206,520 / $108,220;
  - Covenant $272,560 / $152,630 / $91,160;
  - Carmel $210,800 / $126,300 / $75,000.

  Also checked: Cup finish, best and points against the Cup tables; AP performance; caseloads; travel rows; summer-care spans; flagship results; the `ensembles` and `us-organizations` quals against their lists.
- **CCHS `advanced-arts-coursework`.** "1 AP + 12 Honors" recounts exactly from the 39-course arts department.
- **CC Admissions dates:**
  - JK/K Jan 2 is two weeks before Jan 15.
  - Feb 26 is six weeks before Apr 9.
  - The fees ($100, $1,500, $1,250, Clarity $65) agree with FA.
  - The FA deadlines are Nov 1 and Jan 22.
- **CC After School.** $325 × 9 = $2,925; ≈$15 per afternoon; MS $8 × 2 h × 5 = $80/week; the third-child 25% agrees with FA. The FA fee lines match the Cost Planner.
- **CC Cup.** The 377.5 peak (2024–25) and the best finish of 5th at 362.5 (2023–24) are different seasons, and both match the table.
- **Carmel.** The Sports Offered "9 distinct varsity sports" recounts. The Winning Record titles agree with the Cup point sources. The Clubs 5 = 3 + 1 + 1, and the service hours (20 per grade; Beta 10 per semester) agree across the cards.
- **Covenant.** The summer care add-ons and the TK–8 bands agree between the page and Compare. The Coaching tile "22 seasons in 2024" from 2003 is arithmetically right (see COV-S1 for the undated headline).

## Source-material files touched

- `source-material/summer-programs/charlotte-christian/Charlotte Christian - Summer Programs - Camp Catalog.md`. The file had no `## Method`, so I appended one `## Method` at the end with `### Re-verification 2026-11-20 (plan consistency2, re-scan)` beneath it. It holds the PDF's verbatim week headings and the summer page check, for CC-S1.
