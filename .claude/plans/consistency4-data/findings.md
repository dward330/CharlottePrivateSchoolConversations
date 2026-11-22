# consistency4: rescan of consistency3

- **Date:** 2026-11-22
- **Mode:** RESCAN of round 3 (plan `consistency3`, PR #516)
- **SCANNED_SHA:** `13551180` (main)
- **Previous scan base:** `d19fc9da`
- **Groups:** `pd-ccd-cannon`, `latin`, `cc-cchs-cov-carmel`, `dd-gd-hg-k8` (all 13 schools)
- **Files:** each sweep as returned (`rescan4-*.md`), `r8.txt`, and this file. Where they differ, this file is the verified version.
- **Verdict:** NOT CLEAN. 8 Part 1 rows are partial or regressed and 161 new findings stand.

## How this was verified

- All 172 raw Part 2 rows had their quotes tested against the page dumps and the data. 168 matched. The other four (CC-T14, CC-T16, CAR-T3, TRI-T1) were checked by hand and hold.
- 130 rows have a cited file:line that shows the quote. 6 cite a line the matcher could not confirm and 36 cite no file:line. Those 42 rest on the quote match, so open the data line before editing.
- The parent re-opened the outside source for 28 rows, marked `re-opened` below. For the rest, the evidence is the sweep agent's own fetch or recount. **Re-open each before typing a value**, as the plan skill requires.
- Blumenthal refused the parent's fetch of the 2022 release (HTTP 406), so LAT-T9's "41 schools" rests on the agent's fetch. It was not retried.

## Part 1: regression check

| group | rows | RESOLVED | NOT RESOLVED | PARTIAL / REGRESSED | UNCHANGED BY DECISION | n/a |
|---|---|---|---|---|---|---|
| pd-ccd-cannon | 69 | 60 | 0 | 3 | 6 | 0 |
| latin | 64 | 57 | 0 | 3 | 3 | 1 |
| cc-cchs-cov-carmel | 60 | 56 | 0 | 1 | 3 | 0 |
| dd-gd-hg-k8 | 49 | 47 | 0 | 1 | 1 | 0 |
| **all** | 242 | 220 | 0 | 8 | 13 | 1 |

The Christian group also listed three translation items that round 3 parked as "Found, not fixed" (two title keys, es "El director"). They are outside this scan's English-only scope, so they are not counted above. They are still open.

| row | what is left | caused by round 3? |
|---|---|---|
| CAR-S1 | REGRESSED. The added "Boys’" governs the whole list, so it claims boys’ volleyball (the team is girls’) and drops girls’ soccer. | **yes** |
| PD bus fares | PARTIAL. The new sibling fares contradict "no sibling … discount" and Q10 (PD-T2), and the header still dates every figure 24 Jul (PD-T3). | **yes, two conflicts** |
| P-CO2 (Latin transport, LAT-T1) | PARTIAL. /student-life/transportation publishes 2026–27 fees ($1,900 / $950 / $550). The close-out re-check opened only /admissions/transportation. Price the row, drop Q4, recount. | no: the claim is older, and round 3 repeated it |
| P-R5 (Latin contract date) | PARTIAL. Eight strings still say "no contract date published" (admissionsPrograms/charlotte-latin.ts 303, 408, 521, 635, 709–712). | no: an incomplete fix |
| P-R4 (Latin aid documents) | PARTIAL. Source links still label both documents 2025-26. The live page gives no year. | no: an incomplete fix |
| DD-S7 | PARTIAL. The Compare qual was fixed. The page verdict still presents the 2020 6:00 window as current. | no: an incomplete fix |
| CCD-28 | PARTIAL. The Verdict still says "first in North Carolina" unattributed. | no: round 1, marked resolved twice since |
| CCD-R1 | PARTIAL. Round 2's audition wording contradicts the guide it cites. | no: round 2 |

**Caused by round 3's own fixes: 3 conflicts** (CAR-S1, PD-T2, PD-T3). Four more round-3 fixes were incomplete (P-CO2, P-R5, P-R4, DD-S7). The Latin sweep marked LAT-T1, P-R4 and P-R5 as caused by round 3. Corrected here: each conflicting claim predates that round's diff.

## Cross-school rows

| id | cat | one cause | members |
|---|---|---|---|
| X1 | C | "$0" shown for an unpublished aid total | GD-T11 (GD, HG, Covenant, Carmel) |
| X2 | A | A finalist slot that Blumenthal gives every production is read as an achievement. Check every Blumey card. | CC-T4 (CC, CCHS) |
| X3 | D | Notre Dame football is D1 at one school and P4 at another | CC-T16 (CC, CCHS) |
| X4 | A | The planner divides every camp week by five days | CAR-T4 (Carmel, CC, any short-week tier) |
| X5 | A | A typed claim about the other schools ("widest of the five", "the only school") went stale as the roster grew | PD-T18, CAN-T7, CC-T15, CCD-T17, LAT-T7 |
| X6 | A | "All three federal service academies", and there are five | CCD-T14 (CCD, CCHS) |
| X7 | A | Compare Arts cells are null where the school page publishes the fact | LAT-T8, DD-T5 |
| X8 | A | After-care basis year. Refreshing Gaston Day to 2026–27 makes Cannon's "only school not on 2026–27" true again, so make one fix. | GD-T3 (absorbs CAN-T8) |
| X9 | A | Compare notes list too few non-publishers | CCHS-T15 (CCHS, Covenant, Carmel, HG, GD) |

## Tally

**161 new findings:** A 110 · B 19 · C 19 · D 13. X5 and X7 count once each, under A.

| school | A | B | C | D | total |
|---|---|---|---|---|---|
| Providence Day | 12 | 0 | 3 | 0 | 15 |
| Country Day | 11 | 6 | 3 | 3 | 23 |
| Cannon | 9 | 4 | 1 | 1 | 15 |
| Charlotte Latin | 7 | 1 | 1 | 4 | 13 |
| Charlotte Christian | 14 | 0 | 0 | 1 | 15 |
| Charlotte Catholic | 12 | 1 | 2 | 0 | 15 |
| Covenant Day | 9 | 2 | 3 | 1 | 15 |
| Carmel Christian | 5 | 0 | 3 | 2 | 10 |
| Davidson Day | 2 | 1 | 1 | 1 | 5 |
| Gaston Day | 13 | 2 | 1 | 0 | 16 |
| Hickory Grove | 6 | 2 | 1 | 0 | 9 |
| Trinity | 4 | 0 | 0 | 0 | 4 |
| Charlotte Prep | 4 | 0 | 0 | 0 | 4 |
| cross-school (X5, X7) | 2 | 0 | 0 | 0 | 2 |

## New findings

The exact fix, evidence URL and data line are in the linked row of each sweep file.

| id | school | section | cat | value A | value B | source re-opened by parent | row |
|---|---|---|---|---|---|---|---|
| PD-T1 | Providence Day | College Support › Whole Class, Applicant's Edge vs the acceptance list | A | "School of Visual Arts" and "Bocconi" in the conservatory and international lists (L2358; `collegeSupportPrograms/providence-day.ts` L889); "Trinity Dublin, Bocconi, Toronto" (L2465; L809) | The 383-row list (L1816-2199) has neither |  | rescan4-pd-ccd-cannon.md:95 |
| PD-T4 | Providence Day | Financial Aid › Beyond Tuition vs After School | A | "Sixteen confirmed components … 9 unpriced", with "Clubhouse registration · $100" but no Extended Day registration (L3322-3339; L1708) | "Extended Day annual registration $80 / student" (L2592) |  | rescan4-pd-ccd-cannon.md:98 |
| PD-T5 | Providence Day | After School › checklist vs Cost Planner | A | "Which platform actually bills Extended Day — Blackbaud, Clarity, or Smart Tuition?" (L2726; `afterSchoolPrograms/providence-day.ts` L471) | "billed via Blackbaud" (L2521); "Billed monthly via Blackbaud Tuition Management" (L2597) |  | rescan4-pd-ccd-cannon.md:99 |
| PD-T6 | Providence Day | After School › Verdict vs Cost Planner | A | "so a family can compute its exact annual cost before applying" (L2708; L445) | "so an annual total cannot be computed exactly" (L2598; L212) |  | rescan4-pd-ccd-cannon.md:100 |
| PD-T7 | Providence Day | After School › enrichment subhead vs rows | A | "All classes run 10 sessions; TK/K classes are $200 and grades 1–5 are $220" (L2620; L283) | "Karate · TK–5th · $220" (L2680-2682) and "YoLa · TK–2nd · $200" (L2648-2652) |  | rescan4-pd-ccd-cannon.md:101 |
| PD-T8 | Providence Day | Summer › Junior Masters Chess | A | "Offered in seven of the nine sessions — $255 in the four-day weeks, $315 otherwise." (L3200; `summer/providence-day.ts` L892) | When: "S4, S6, S7, S8, S9", five sessions (L3203; L901) |  | rescan4-pd-ccd-cannon.md:102 |
| PD-T9 | Providence Day | Summer › two S5 rows vs the four-day rule | A | Battle Bot "Mon–Fri · S5 · $360", desc "priced $360 in the four-day session" (L2934-2940); Playlax Lite "Mon–Fri · S5 · $445", desc "The four-day-week lacrosse camp." (L3039-3046) | "Two of them are four-day weeks (no camps June 19 or July 3)" (L2742); other S3 and S5 rows read "4 days" |  | rescan4-pd-ccd-cannon.md:103 |
| PD-T10 | Providence Day | College Support › checklist vs Whole Class | A | "Your profile shows the fifth quintile averaging a 1116 SAT … Where did those ~36 students actually enroll last year?" (L2477; `collegeSupportPrograms/providence-day.ts` L937) | The quintiles are the Class of 2027, "179 seniors, August 2026" (L2335, L2350), who have not enrolled |  | rescan4-pd-ccd-cannon.md:104 |
| PD-T11 | Providence Day | College Support › Whole Class vs its own gap box | A | "So students in the fourth and fifth quintiles really are enrolling, not just appearing on the list." (L2356; L881); "The list matches the school's actual quintile spread." (L2473) | "never says where the middle and bottom fifths actually enroll" (L2359) |  | rescan4-pd-ccd-cannon.md:105 |
| PD-T12 | Providence Day | Clubs › Honor Societies vs Club Catalog | A | "Five selective societies spanning scholarship, service, visual art, music and French." (L1111-1112; `clubsPrograms/providence-day.ts` L165) | "Computer Science Honors Society · Recognition society for computer science" (L918; `clubCatalog.ts` L163) |  | rescan4-pd-ccd-cannon.md:106 |
| PD-T13 | Providence Day | Clubs › Affinity card vs Club Catalog | C | "Nine Upper School affinity groups", including "Multiracial Affinity Group" (L1059-1074; L53) | Catalog "Affinity · 9" from the 2025–26 list has Diabuddies and no Multiracial group (L1012-1029) |  | rescan4-pd-ccd-cannon.md:107 |
| PD-T14 | Providence Day | The Arts › checklist vs ensemble board | A | "is there a non-auditioned choral home for them through senior year?" (L1299; `artsPrograms/providence-day.ts` L356) | "Curricular — join by enrolling: Band, Orchestra, Chorus" (L1240-1243); Chorus, no audition (L546) |  | rescan4-pd-ccd-cannon.md:108 |
| PD-T15 | Providence Day | The Arts › checklist vs Blumey ledger | A | "Caroline Bower led the 2015–2017 award-winning run" (L1299; L357) | "exactly one outright win is verifiable: Best Supporting Actor, 2022" (L1235); 2015–17 rows hold placements only |  | rescan4-pd-ccd-cannon.md:109 |
| PD-T16 | Providence Day | College Support vs Course Offerings (course name) | C | "Advanced Structures in Java" (L2389; L579) | "Advanced Data Structures in Java" (L454) |  | rescan4-pd-ccd-cannon.md:110 |
| PD-T17 | Providence Day | Global Exposure › Signing Up | C | Registration opens and Info Session "Middle & Upper School · grades 6–12" (L751, L755; `internationalTravel/providence-day.ts` L566, L572) | The deadline for that registration "grades 6–11" (L758); the four trips take grades 6–8 and 9–11 (L747) |  | rescan4-pd-ccd-cannon.md:111 |
| CCD-T1 | Country Day | Financial Aid › Beyond Tuition, Q3 | A | "Bus transportation · no rate" (L3198; `financialAidReports.ts` L236); "Ten confirmed cost components — 4 unpriced … 40% unpriced > 33% threshold" (L3191; `financialAidReports.ts` L227); Q3 (L3261) | The school publishes 2026–27 fares (the PD bus finding, at CCD) | re-opened | rescan4-pd-ccd-cannon.md:113 |
| CCD-T2 | Country Day | Financial Aid vs Learning Support | A | "Tutoring · no rate" (L3199; L237); "What are the dollar rates for … tutoring" (L3261) | "$82 for 45 minutes in the Lower School, $85 a session in the Middle and Upper Schools", billed to the student's account (L741-745, L800-801) |  | rescan4-pd-ccd-cannon.md:114 |
| CCD-T3 | Country Day | Financial Aid tiles, Compare, After School | B | "$9.4M" (L3074); "about 20% of students (341)" (L2446, L2483); Compare `pct-aid`, `aid-awarded` | Fast Facts now: $10.1 million to 347 students | re-opened | rescan4-pd-ccd-cannon.md:115 |
| CCD-T4 | Country Day | Financial Aid › Q1 vs every share on the page | D | "is the share 20% or 21%, against which enrollment?" (L3259; L380) | Only ~20% appears on the page and on Compare |  | rescan4-pd-ccd-cannon.md:116 |
| CCD-T5 | Country Day | Financial Aid framing vs College Support | C | "The $13M in college scholarships from the School Profile" (L3166; L177) | "$14.7M scholarship offers, Class of 2026 ($13M for 2025)" (L1670) |  | rescan4-pd-ccd-cannon.md:117 |
| CCD-T6 | Country Day | After School › A Day Inside, Verdict | A | "each division's class begins exactly at its own dismissal bell" (L2449); "Enrichment starts at the dismissal bell for every division … no dead gap" (L2475; `afterSchoolPrograms/charlotte-country-day.ts` L275, L364) | MS dismisses 3:10 and its class is 3:20 (L2326, L2460); US dismisses 3:15 and its class is 3:45 (L2330-2331) |  | rescan4-pd-ccd-cannon.md:118 |
| CCD-T7 | Country Day | After School › Coverage Map | A | "five separate pickup tiers" (L2302) | The JK bar shows four: 2:00, 3:30, 4:30, 6:00 (L2307-2311; L37-42). The 3:00 tier at $450 is only in the planner (L2360-2365) |  | rescan4-pd-ccd-cannon.md:119 |
| CCD-T8 | Country Day | Compare › `latest-pickup` qual | A | "The Lower School's Structured Care program runs until 6:00 p.m." (`metricValues.ts` L1936) | "Extended Day covers JK through grade 8 to 6:00 p.m." (L2302) |  | rescan4-pd-ccd-cannon.md:120 |
| CCD-T9 | Country Day | College Support vs Learning Support | B | "delivered as hourly sessions before, during or after the school day" (L2159; `collegeSupportPrograms/charlotte-country-day.ts` L859) | "$82 per 45-minute session"; sessions "treated as class periods" during study halls, special areas or lunch (L743, L800, L806) |  | rescan4-pd-ccd-cannon.md:121 |
| CCD-T10 | Country Day | Learning Support › Services, Eligibility row | B | "reviewed every three years in Lower and Middle School and every four in Upper School" (L821; `learningSupport/charlotte-country-day.ts` L233) | "But the linked policy says three years through grade 5 and four from grade 6." (L776; ask L919) |  | rescan4-pd-ccd-cannon.md:122 |
| CCD-T11 | Country Day | College Support › Whole Class, tiles and Compare (SAT, ACT) | D | "SAT score percentiles — Class of 2027" (L2115, L2131; L828, L837); Compare subs "(Class of 2027)" | "restores it without naming the class" (L2129); "does not say which class it covers" (L2167); the ask (L2291); the quals |  | rescan4-pd-ccd-cannon.md:123 |
| CCD-T12 | Country Day | Course Offerings, Compare vs College Support and Global Exposure | C | "23 AP + 18 IB" (L141); "23 AP courses" (L251); Honors Physics I offered (L342). The guide is 2025–26 (`courseOfferings.ts` `guideYear`) and the teaser gives no year | "26 AP + IB … 2026–27" (L2176); AP Physics 1 "replaced Honors Physics" and AP CSP joins (L2200-2201); "AP Comparative Government" (L695) |  | rescan4-pd-ccd-cannon.md:124 |
| CCD-T13 | Country Day | College Support vs Course Offerings | B | "There is still no post-AP CS course." (L2201; L574); asked again at L2291 | "Advanced Topics in Computer Science … requires AP Computer Science" (L482-483) |  | rescan4-pd-ccd-cannon.md:125 |
| CCD-T14 | Country Day | College Support › buckets, Whole Class | A | "includes all three federal service academies" (L1681); "All three federal service academies appear" (L2166; L743, L881) | There are five. The same site says "Four of the five federal service academies" (PD L2358) |  | rescan4-pd-ccd-cannon.md:126 |
| CCD-T15 | Country Day | College Support › Applicant's Edge | D | "In a recent year 136 seniors were placed" (L2269; L789) | "136 of ~141 seniors took part, which suggests nearly every senior does it" (L2273; L795), using the Class of 2026 size |  | rescan4-pd-ccd-cannon.md:127 |
| CCD-T16 | Country Day | College Support › GPA note | C | "the top-quintile mean rose from 4.198 to 4.540 while the bottom-quintile floor fell from 2.546 to 2.076" (L2157; L855) | First fifth 4.516 in the table above (L2148) |  | rescan4-pd-ccd-cannon.md:128 |
| CCD-T18 | Country Day | The Arts › Studio to Gallery | A | "Nine studios and rooms across three campuses" (L1156; `artsPrograms/charlotte-country-day.ts` L281) | "Country Day runs two campuses: Cannon … and Bissell" (L1246) |  | rescan4-pd-ccd-cannon.md:130 |
| CCD-T19 | Country Day | The Arts › checklist | A | "You have been nominated every year since 2022 but have not won since." (L1197; L363) | "Zero nominations" in 2026 (L1109); "every year from 2022 through 2025" (L1125) |  | rescan4-pd-ccd-cannon.md:131 |
| CCD-T20 | Country Day | Global Exposure › Ask the School | A | "What global and language curriculum runs before Middle School, and is there a published language sequence from JK to 12?", under "not published on the school's site" (L733-735; `internationalTravel/charlotte-country-day.ts` L766) | French and Spanish from JK and a 3rd-grade global unit (L691-692); the choice in grade 2 (L160); MS and US sequences (L214-218, L393-420) |  | rescan4-pd-ccd-cannon.md:132 |
| CCD-T21 | Country Day | Clubs › Catalog vs Global Exposure | A | Seven named clubs, "Showing 7 of 7", "The catalog card lists only confirmed organizations" (L945, L1010); Compare "Only 7 are confirmed by name in public sources" | "Interact Club, the International Studies Board, World Quest and Euro Challenge in Upper School" (L678) |  | rescan4-pd-ccd-cannon.md:133 |
| CCD-T22 | Country Day | Summer › Cost Planner | B | "Two of the school's own pages disagree on whether food is included at that price; see the flag below." (L3061; `summer/charlotte-country-day.ts` L1100) | No flag renders: it is `kind: 'verify'` (L1110) |  | rescan4-pd-ccd-cannon.md:134 |
| CCD-T23 | Country Day | Summer age floor, page vs Compare | B | "ages 4–18" (L2333); tile "Age 4–Grade 12" (L2501) | Compare qual: "the after-school page says 3–18" (`summer-ages`) |  | rescan4-pd-ccd-cannon.md:135 |
| CCD-T24 | Country Day | Summer › Cost Planner | A | "The tiers below are the five-day rates." (L3021; L1027) | The first tier is "Half-day, four-day week · $230" (L3026-3028) |  | rescan4-pd-ccd-cannon.md:136 |
| CAN-T1 | Cannon | Sports › College Pipeline headline | A | "Five current seniors already hold public Division I commitments: Princeton, Coastal Carolina, Ohio, Furman and Villanova." (L1153; `sportsPrograms/cannon.ts` L223) | Tile and Compare 6 (L853); six '27 rows, with Hudson Higbea to Brown (data L305, added in #451) |  | rescan4-pd-ccd-cannon.md:137 |
| CAN-T2 | Cannon | Sports › College Pipeline headline | A | "Basketball follows with a Miami signee and East Carolina and Elon commits." (L1153) | Four D1 basketball rows: also Maya McCorkle, East Tennessee State (bars L1161-1162) |  | rescan4-pd-ccd-cannon.md:138 |
| CAN-T3 | Cannon | Financial Aid › Beyond Tuition vs College Support | A | "Eleven confirmed components for a Grade 9 student — 4 unpriced … ~36%", including "AP exams · $98 per exam" (L2742-2754; `financialAidReports.ts` L450) | Freshmen are barred from AP/AT (L1796; "0 / 1 / 5 / 6", L1801) |  | rescan4-pd-ccd-cannon.md:139 |
| CAN-T4 | Cannon | After School › gap box vs Financial Aid | A | "Yet the PDF prices everything else, down to a $98 AP exam." (L1952; `afterSchoolPrograms/cannon.ts` L166) | "the 2026–27 fee document lists cost categories with no dollar figures at all" for Lower School (L2754); four unpriced Upper School items |  | rescan4-pd-ccd-cannon.md:140 |
| CAN-T5 | Cannon | Global Exposure › Ask vs Financial Aid | C | "What does a trip cost, and what does it include? No trip price is published." (L391; `internationalTravel/cannon.ts` L321) | "Winterm course · $0–500" (L2747). Winterm is where the trips run (L323) |  | rescan4-pd-ccd-cannon.md:141 |
| CAN-T6 | Cannon | After School › Verdict vs the class list | A | "22 distinct classes in a single session, from robotics, ballet and chess to pottery, golf and photography"; "mostly $144–$300 for a 10-week session" (L2089-2090; L284-285) | The 22 rows have no chess and no pottery. Their fees run $160–$300, and the Monday ones are eight classes |  | rescan4-pd-ccd-cannon.md:142 |
| CAN-T9 | Cannon | Summer › gap box | A | "The only price break in the 2026 brochure is the structural one for the four-day Week 2." (L2704; L1173) | "$90 a week — the school's combination rate, $20 less than the two toggles" (L2700) |  | rescan4-pd-ccd-cannon.md:145 |
| CAN-T10 | Cannon | Summer › Jump Into Cannon | A | "offered to rising JK/K and to rising 1st–4th in different weeks" (L2240) | Grades "Rising JK & K" for "Weeks 5, 6, 7" (L2243-2244; `summer/cannon.ts` L256) |  | rescan4-pd-ccd-cannon.md:146 |
| CAN-T11 | Cannon | Course Offerings vs Global Exposure | A | "Spanish · Gr 1–4" (L48; `courseOfferings.ts` ~L3283) | "Spanish from Junior Kindergarten" (L354, L357, L387) |  | rescan4-pd-ccd-cannon.md:147 |
| CAN-T12 | Cannon | College Support, Course Offerings vs Global Exposure | B | "Global Education Certificate — the steps are fully spelled out … at least two of three global experiences" (L1868; `collegeSupportPrograms/cannon.ts` L696); also L302 | "Global Studies Certificate", under Mastery Credits since the Class of 2024, asking whether "the earlier rules" still apply (L363-372, L391) |  | rescan4-pd-ccd-cannon.md:148 |
| CAN-T13 | Cannon | College Support vs Course Offerings (course names) | B | "AT: Design Thinking for Entrepreneurship" (L1808); "Honors Design Thinking & Entrepreneurship Lab" (L1869); "AT: American Language and Composition" (L1865) | The 2026–27 catalog list has "Advanced Topics: Business and Entrepreneurship with Personal Finance" (L297), "Advanced Topics: English Language and Composition" (L115) and no Design Thinking course |  | rescan4-pd-ccd-cannon.md:149 |
| CAN-T14 | Cannon | College Support vs Clubs | A | "It is the one thing nearly every senior does" (L1867; L695) | "every one completes it" (L613); "a capstone project that every senior completes" (L606) |  | rescan4-pd-ccd-cannon.md:150 |
| CAN-T15 | Cannon | Clubs › Honor Societies, Compare `us-organizations` | B | "Twelve honor societies" (L626-627; `clubsPrograms/cannon.ts` L137); dev flag L222: "No … Science National Honor Society chapter is published" | The school announced an SNHS chapter. Our own College Support record L588 already holds it |  | rescan4-pd-ccd-cannon.md:151 |
| CAN-T16 | Cannon | College Support › load ceiling | B | "0 / 1 / 5 / 6" and "a hard, published limit", "caps a transcript at twelve" (L1796, L1801, L1880; L527) | The catalog behind this page's Course Offerings allows sophomores two | re-opened | rescan4-pd-ccd-cannon.md:152 |
| CAN-T17 | Cannon | After School › stale note | D | "No 2026-27 Beyond the Bell catalog has been posted yet" (L2079) | The live page now embeds a "Session 2 Brochure" and gives Aug 16 and Aug 31 start dates |  | rescan4-pd-ccd-cannon.md:153 |
| LAT-T2 | Charlotte Latin | After School › Coverage Map, A Day Inside, Verdict, asks | B | Page gives one value each, unattributed: "dismissal ~3:20" L2084, L2088; "Activity buses: 4:30 p.m. for Lower School" L2093; "the Lower School bus at 4:30" L2173; "Activity-bus integration at 4:30, 5:30 and 6:00" L2332; "7:00–7:25 a.m. bus window" L2095; "between the 3:20 dismissal…" L2343. The ask at L2343 blames "Your Transportation and After-School pages" | The school's two Transportation pages disagree with each other on all four times | re-opened | rescan4-latin.md:102 |
| LAT-T3 | Charlotte Latin | Financial Aid › Beyond Tuition; After School › ask | A | "Talons youth sports · no rate" L2926 (`financialAidReports.ts:1419`); "Are there winter and spring Talons seasons, and what is the exact fee for the sport we want?" L2343 (`afterSchoolPrograms/charlotte-latin.ts:366`) | Our own dev-only flag (`:302`) and record hold "$200–$350"; the live page now prices winter and spring | re-opened | rescan4-latin.md:103 |
| LAT-T4 | Charlotte Latin | Financial Aid › Supplemental support, against Global Exposure › Verdict | A | "It does not publish what else this help covers, or how much need makes a family eligible." L2974 (`financialAidReports.ts:1518` box) | "The Plus Fund helps families on substantial aid with costs beyond tuition, including travel." L715 | re-opened | rescan4-latin.md:104 |
| LAT-T6 | Charlotte Latin | Financial Aid › Two navigation hazards | A | "The tuition page asks for questions at an email address whose domain has two letters swapped. The correct address appears elsewhere on the same page." L3023 (`financialAidReports.ts:1630`) | The tuition page is now correct; the typo is in a linked document | re-opened | rescan4-latin.md:106 |
| LAT-T9 | Charlotte Latin | The Arts › Verdict | A | "a student took Best Actress at the 2022 Blumeys … In a 59-school field, Best Actress is the most competitive individual honor available." L985 (`artsPrograms/charlotte-latin.ts:334`) | "59 schools competed in 2026" L896; L918 |  | rescan4-latin.md:109 |
| LAT-T10 | Charlotte Latin | The Arts › Blumey ledger heading | C | "The Blumey ledger — every year Latin has placed" L912 (`artsPrograms/charlotte-latin.ts:150`) | Its first row, 2026: "received no nominations in any category" L916–918; L928 says the ledger is "a floor, not a complete history" |  | rescan4-latin.md:110 |
| LAT-T12 | Charlotte Latin | Student Clubs › Club Catalog, against Affinity | A | "houses Q&A and the Black Student Association" L772 (`clubCatalog.ts:113`) | "BSA … sub-group of Mosaic — the school does not expand the initialism" L789–790 | re-opened | rescan4-latin.md:112 |
| LAT-T13 | Charlotte Latin | Student Clubs › Affinity & Identity Groups | A | "the identity structure here runs through the club roster rather than a separate affinity program" L784–785; "no counts, and no divisional breakout" L785 (`clubsPrograms/charlotte-latin.ts:49–51`); flag `:78` "No Lower or Middle School groups are published" | The school publishes a separate affinity program by division. The page itself also names an "Indian Student Alliance" L651, absent from this card | re-opened | rescan4-latin.md:113 |
| LAT-T14 | Charlotte Latin | Student Clubs › Affinity (Mosaic, sources) | A | "coordinated by the DEI Office under Vernette Rucker, Assistant Director of Diversity, Equity, and Inclusion" L786 (`clubsPrograms/charlotte-latin.ts:55`); source URL `:33` | "its Community, Belonging and Global Education office" L662 | re-opened | rescan4-latin.md:114 |
| LAT-T15 | Charlotte Latin | Summer › Fees & fine print, flag | D | "the school's only published discount" L2875 (`summer/charlotte-latin.ts:1032`); "The only thing the school's site calls a discount is the Super Care bundle" L2878 | "a $10 early-bird discount applied on most camps in a five-day window in January" L2360; "no early-bird discount" L2842 |  | rescan4-latin.md:115 |
| LAT-T16 | Charlotte Latin | Summer › Cost Planner | D | "26 offerings. The only tier with no early-bird discount." L2842 (`summer/charlotte-latin.ts:972`) | The committed rate table marks Clay Camp, another planner tier (L2850), "none offered" as well, plus three one-camp tiers |  | rescan4-latin.md:116 |
| LAT-T17 | Charlotte Latin | Summer › catalog row | D | "A full-day arts premium camp — one of only two at its price point." at $515 L2705–2710 (`summer/charlotte-latin.ts:681`) | No other $515 row (L2717 Dollhouse is $525); the committed rate table counts 1 at $515 |  | rescan4-latin.md:117 |
| LAT-T18 | Charlotte Latin | The Arts › Verdict, against Studio to Gallery | D | "recognized work in fashion, oil painting and drawing across multiple years" L989 (`artsPrograms/charlotte-latin.ts:350`) | Every dated Scholastic item listed is 2023; the others carry no award year L980 |  | rescan4-latin.md:118 |
| CC-T1 | Charlotte Christian | FA › Applying; Admissions › aid clock | A | "It no longer applies: the school's live tuition page (retrieved 14 Sep 2026) does not mention it." and box "An unusual requirement — and since withdrawn" (`financialAidReports.ts:760`, L2923-2924). The aid clock L74 omits the requirement. | Today's tuition page states the requirement | re-opened | rescan4-cc-cchs-cov-carmel.md:89 |
| CC-T2 | Charlotte Christian | Admissions; FA timeline | A | "families already at the school apply by **Nov 1, 2026**" (`admissionsPrograms/charlotte-christian.ts:678`, `:827`, `:865`, comment `:42`; L74) and "1 Nov 2026" (`financialAidReports.ts:749`, L2921) | Live: Nov. 2, 2026 | re-opened | rescan4-cc-cchs-cov-carmel.md:90 |
| CC-T3 | Charlotte Christian | Arts › Theatre, Verdict ask | A | "there has been no Blumey win, and **no top-6 nomination**, since then" (`artsPrograms/charlotte-christian.ts:172`, L957); L1034 asks "what is your best Blumey result since 2013?" | A 2026 top-six nominee |  | rescan4-cc-cchs-cov-carmel.md:91 |
| CC-T4 | Charlotte Christian | Arts › Theatre, Verdict | A | CC L933-934, L950, L1027 "a finalist slot in all five acting categories" read as "A whole-cast result"; CCHS L941 "a finalist in every one of the five … which is **a rare sweep** of finalist placements for one production" (`artsPrograms/charlotte-catholic.ts:123`; `charlotte-christian.ts:154`) | Blumenthal names a finalist for each production in three of the five. CC also had five in 2023 and 2026, CCHS in 2024 and 2026, Carmel in 2025. |  | rescan4-cc-cchs-cov-carmel.md:92 |
| CC-T5 | Charlotte Christian | College Support › Whole Class | A | "A fourth- or fifth-quintile student **at 3.54 or below**" (`collegeSupportPrograms/charlotte-christian.ts:715`, L1881) | Fourth quintile 3.542–3.803; fifth tops at 3.524 (L1869-1873) |  | rescan4-cc-cchs-cov-carmel.md:93 |
| CC-T6 | Charlotte Christian | After School › A Day Inside, Verdict | A | "it protects a **45-minute homework block in both divisions**" (`afterSchoolPrograms/charlotte-christian.ts:210`, L2080-2081); "for both divisions, with a protected 45-minute homework and reading block" (`:290`, L2104) | The same card: Middle School "homework and reading 4:00–4:30" = 30 minutes (L2097) |  | rescan4-cc-cchs-cov-carmel.md:94 |
| CC-T7 | Charlotte Christian | After School › Coverage Map, Verdict | A | "Two cheap "Bridge Care" tiers exist purely to close the gap between the JK-K bell and the grades 1–4 bell" (`afterSchoolPrograms/charlotte-christian.ts:28`, also `:31`, `:291`; L2005, L2026, L2105) | One tier is for grades 1–4 after their own bell, 2:40–3:35; the JK-K tier runs to 3:15, past the 2:40 bell (L2051-2062) |  | rescan4-cc-cchs-cov-carmel.md:95 |
| CC-T8 | Charlotte Christian | Arts › Music vs Course Offerings (#9) | A | "Whether entry is by audition is not published." (`artsPrograms/charlotte-christian.ts:242`, L987; also `:233`, L984); "all six Upper School ensembles carry an Honors designation" (L926, L960, L977) | Course Offerings tags Jazz Band, Choir Honors and UKnight "Audition" (L444-447, L454) and lists an open, non-Honors Choir (L448-449) |  | rescan4-cc-cchs-cov-carmel.md:96 |
| CC-T9 | Charlotte Christian | Arts › Studio to Gallery vs Course Offerings (#9) | A | "specific media unpublished" (`artsPrograms/charlotte-christian.ts:270`, L998); "A specific list of studio media (ceramics, printmaking, sculpture, …) is also unpublished" (`:307`, L1022) | Course Offerings L423 ceramics, L427 printmaking, L433 "clay, plaster, wire, metal, wood, textiles, …" |  | rescan4-cc-cchs-cov-carmel.md:97 |
| CC-T10 | Charlotte Christian | Arts › Ladder | A | Under "Upper School · 9–12": "**Seven theatre electives** incl. technical directing and stage management" (`artsPrograms/charlotte-christian.ts:90`, L925-926) | The seven span grades 6–12. The Upper School guide lists two theatre courses (L456-459). |  | rescan4-cc-cchs-cov-carmel.md:98 |
| CC-T11 | Charlotte Christian | Clubs vs Global Exposure | A | "grade 7 to the Holocaust Museum" (`clubsPrograms/charlotte-christian.ts:82`, L831) | "the Holocaust butterfly memorial (7th)" (L711) |  | rescan4-cc-cchs-cov-carmel.md:99 |
| CC-T12 | Charlotte Christian | Clubs › Service vs Global Exposure | A | "The Multicultural Festival is a yearly **all-school** event" (`clubsPrograms/charlotte-christian.ts:145`, L855) | "An annual **Lower School** celebration, part of Spanish class" (L692); clubs L829 also puts it in Lower School classrooms |  | rescan4-cc-cchs-cov-carmel.md:100 |
| CC-T13 | Charlotte Christian | Summer › catalog | A | "The widest grade span of any camp here — grade 1 through 11" (`summer/charlotte-christian.ts:110`, L2175); "Tumbling and cheer across the widest span of any sports camp here." on a JK-8 camp (`:292`, L2273) | Pickleball Summer Fun "K-12 (AM)" (L2291) is wider than both |  | rescan4-cc-cchs-cov-carmel.md:101 |
| CC-T14 | Charlotte Christian | Summer › catalog | A | Rows that run in Week 3 show only the five-day price: Tennis "$200" (L2174-2180), Nerf "$200" (L2300-2306), Lego Maniacs "$190" (L2342-2348), Build It, Break It! "$200" (L2377-2383) | "Week 3 is a four-day week and is priced down" (L2821); sister rows state "$160 in the four-day week" |  | rescan4-cc-cchs-cov-carmel.md:102 |
| CC-T16 | Charlotte Christian | Sports › Pipeline; Compare `p4-commits-2426` | D | CC counts two Notre Dame **football** signees as "FBS Ind." / D1 (`sportsPrograms/charlotte-christian.ts:295-297`; L1373), so P4 = 9 | CCHS counts a Notre Dame **football** signee as "ACC" / P4 (`sportsPrograms/charlotte-catholic.ts:322`; L1426), so P4 = 15 |  | rescan4-cc-cchs-cov-carmel.md:104 |
| CCHS-T1 | Charlotte Catholic | FA › fees, payment, Fees table | B | "Continuous enrollment fee — **$150 per returning student**" (`financialAidReports.ts:2641`, `:2754`; L2090, L2131-2133, L2158) | The MACS fee-schedule PDF: "$75 per returning student" | re-opened | rescan4-cc-cchs-cov-carmel.md:105 |
| CCHS-T2 | Charlotte Catholic | FA › What Else a Family Pays | A | "A first-year community-rate family with one student pays $21,562 + $1,995 + $120 = **$23,677**" (`financialAidReports.ts` `componentsAside`, L2087) | It omits the $150 continuous enrollment fee every new student pays |  | rescan4-cc-cchs-cov-carmel.md:106 |
| CCHS-T3 | Charlotte Catholic | FA › Aid, Payment, What to Ask | A | "The number of installments in the FACTS plan, whether a pay-in-full discount exists, and any late-payment … are not published — **they sit inside the enrollment portal**" (`financialAidReports.ts:2765`, L2138); "No decision timeline …" (`:2692`, L2110); Q1 "What exactly qualifies us…" (`:2777`), Q6 "Does the $1,995 capital fee recur every year…" (`:2782`), Q7 (L2143-2149) | The page this report cites publishes all of these except the discount, late-payment and withdrawal terms |  | rescan4-cc-cchs-cov-carmel.md:107 |
| CCHS-T4 | Charlotte Catholic | FA › State Scholarships | A | "ESA+**100%** $9,000 or $17,000…", "Opportunity Scholarship**45%** Up to $7,000+…" (`financialAidReports.ts:2720`, `:2726`; L2121-2122) | The source publishes no percentages. The component prints `share` as a figure, so a parent reads 45% coverage, yet $7,000 is ~32% of $21,562. |  | rescan4-cc-cchs-cov-carmel.md:108 |
| CCHS-T5 | Charlotte Catholic | Learning Support › Services vs Ask the School | A | "Academic Achievement support **is included in tuition**" (`learningSupport/charlotte-catholic.ts:144`, L472) | "Academic Achievement has no published fee" (L432) and the ask "Is there a fee…, or is it included in tuition?" (`:414`, L587) |  | rescan4-cc-cchs-cov-carmel.md:109 |
| CCHS-T6 | Charlotte Catholic | College Support; Compare `bucket-lac75` | A | "Naval #3, **Air Force #5, West Point #10**" (`collegeSupportPrograms/charlotte-catholic.ts:565`, L1567; `metricValues.ts:683` comment, `:697` qual) | The list beneath: Air Force "Liberal Rank #11", West Point "#9" (L1719-1720) |  | rescan4-cc-cchs-cov-carmel.md:110 |
| CCHS-T7 | Charlotte Catholic | Arts › Theatre; Compare `signature-recognition` qual | A | "The Wizard of Oz — **four Blumey nominees and one finalist**" (`artsPrograms/charlotte-catholic.ts:127`, `:140-143`, header comment `:13`; L948, L972-981; `metricValues.ts:1556`) | All five are under "Finalists for …" |  | rescan4-cc-cchs-cov-carmel.md:111 |
| CCHS-T8 | Charlotte Catholic | Arts › honors pipeline vs Course Offerings | A | "Choral Ensemble (332), Concert Band (326), Percussion (372) — the **open-enrollment** middle of the program" (`artsPrograms/charlotte-catholic.ts:192`, L1014) | "Students with playing experience join through an audition" (L357) |  | rescan4-cc-cchs-cov-carmel.md:112 |
| CCHS-T9 | Charlotte Catholic | Arts › ensemble board | C | "Twelve ensembles carry course codes. Marching Band, Symphonic Band and Jazz Band run alongside them." (`artsPrograms/charlotte-catholic.ts:188`, L1011) | The board shows 17 entries. Introduction to Guitar and Guitar II also carry codes, so 14 coded entries. |  | rescan4-cc-cchs-cov-carmel.md:113 |
| CCHS-T10 | Charlotte Catholic | Sports › Pipeline | A | "**Three** football signees carry 247Sports Composite ranks" (`sportsPrograms/charlotte-catholic.ts:279`, L1414) | The roster shows four: state 82, 66, 15 and 52 (L1426) |  | rescan4-cc-cchs-cov-carmel.md:114 |
| CCHS-T11 | Charlotte Catholic | Sports › Winning Record | A | "79 state championships since 2000 — **and four more** in 2026 alone." (`sportsPrograms/charlotte-catholic.ts:151`, L1326-1327) | The 79 already includes 2026. Everywhere else the total is 79, not 83. |  | rescan4-cc-cchs-cov-carmel.md:115 |
| CCHS-T12 | Charlotte Catholic | Sports › Winning Record | A | "spans far more sports than **these four**" (`sportsPrograms/charlotte-catholic.ts:223`, L1382) | The matrix above has nine programs (L1334-1381) |  | rescan4-cc-cchs-cov-carmel.md:116 |
| CCHS-T13 | Charlotte Catholic | College Support › ask vs Learning Support, Compare | C | "Counselors are assigned by last name … How does **each one** balance about **56** seniors" (`collegeSupportPrograms/charlotte-catholic.ts:720`, L2014) | Five are assigned by last name; the Director takes new 10–12 students (L536, L584). Compare's qual: "The five alphabet-band counselors carry about 67 seniors each." |  | rescan4-cc-cchs-cov-carmel.md:117 |
| CCHS-T14 | Charlotte Catholic | College Support › Whole Class | A | "98% went straight to post-secondary education **and 2%** to two-year institutions" (`collegeSupportPrograms/charlotte-catholic.ts:688`, L1888) | 98% is the whole; the 2% is inside it |  | rescan4-cc-cchs-cov-carmel.md:118 |
| CCHS-T15 | Charlotte Catholic | Compare notes | A | `pct-aid` note lists five schools that "do not publish this" (`metricValues.ts:442`). `aid-awarded` note: "Charlotte Christian & Davidson Day do not publish a total." (`:452`) | Six cells are empty in the first row (CCHS too), seven in the second |  | rescan4-cc-cchs-cov-carmel.md:119 |
| COV-T1 | Covenant Day | Admissions vs FA (#9) | A | "The FACTS application fee and any reduced deposit for aid applicants are **not published**." (`admissionsPrograms/covenant-day.ts:645`, comments `:92-95`; L66) | FA: "may ask the Business Office to **halve it**" (`financialAidReports.ts:957`, L1861) | re-opened | rescan4-cc-cchs-cov-carmel.md:120 |
| COV-T2 | Covenant Day | FA › Process, Q2 | A | "**No aid deadline date**, no decision timeline … The application fee for FACTS, if any, is also unstated." (`financialAidReports.ts:994`, L1872); Q2 L1926 | The packet linked from the cited page publishes all three | re-opened | rescan4-cc-cchs-cov-carmel.md:121 |
| COV-T3 | Covenant Day | FA › framing, sources | A | "Two years are live at once. The website table shows 2026–27 while **the linked payment-terms PDF shows 2025–26**." (`financialAidReports.ts:908`, L1835) | The page now links the 2026-27 Terms |  | rescan4-cc-cchs-cov-carmel.md:122 |
| COV-T4 | Covenant Day | Course Offerings; College Support edge; Compare `us-courses` | A | "90 course entries across 9 departments" (`courseOfferings.ts:5210`, L128, L134). Qual: "Counted … across the nine department tiles the school publishes on its own High School academics page … The older 2026–27 … matrix showed 80" (`metricValues.ts:190`, `:209`). The edge ladder lists four R&S courses (`collegeSupportPrograms/covenant-day.ts:560`, L1531). | The nine tiles total **86**. Four of our rows are on no tile: CP Statistics (L175), Honors Psychology (L221), Theatre Tech (L277), Intercultural Practicum (L305). The edge list omits ContainIt. |  | rescan4-cc-cchs-cov-carmel.md:123 |
| COV-T5 | Covenant Day | College Support › Transcript tile | A | "**80%** of HS faculty hold advanced degrees" (`collegeSupportPrograms/covenant-day.ts:157`, L1459-1460) | **74%** | re-opened | rescan4-cc-cchs-cov-carmel.md:124 |
| COV-T6 | Covenant Day | Course Offerings; College Support | A | "**three units** are required to graduate" (`courseOfferings.ts:5285`, L232); "25 Carnegie Units, including **3 units of Bible**" (`collegeSupportPrograms/covenant-day.ts:174`, L1479) | 3.5 units | re-opened | rescan4-cc-cchs-cov-carmel.md:125 |
| COV-T7 | Covenant Day | College Support › buckets | A | "Top-75 Liberal Arts — **Davidson through Gettysburg**" (`collegeSupportPrograms/covenant-day.ts:294`, L1125) | The ten run from Air Force #11 (L1297) to Bard #72 (L1144) |  | rescan4-cc-cchs-cov-carmel.md:126 |
| COV-T8 | Covenant Day | Course Offerings vs Arts, Clubs | B | "a children’s choir for **4th and 5th** graders" (`courseOfferings.ts:5807`, L464) | "CDS Children’s Choir, **grades 3–5**" (`artsPrograms/covenant-day.ts:40`, L585, L643; `clubCatalog.ts:477`, L503) |  | rescan4-cc-cchs-cov-carmel.md:127 |
| COV-T9 | Covenant Day | Arts vs Course Offerings | B | "**Theater I–II**, Theatre Tech, and Honors Auditioned Theatre" (`artsPrograms/covenant-day.ts:57`, `:87`; L588, L610) | One "Theatre" CP course (L275) |  | rescan4-cc-cchs-cov-carmel.md:128 |
| COV-T10 | Covenant Day | College Support › ask | C | "The matrix moved from 18 to **15** between editions." (`collegeSupportPrograms/covenant-day.ts:698`, L1552) | The page's AP count is 17 (L130, L134). The 15 appears unexplained. |  | rescan4-cc-cchs-cov-carmel.md:129 |
| COV-T11 | Covenant Day | Arts › awards ledger | A | "**WIN**A student named Finalist" (`artsPrograms/covenant-day.ts:97`, L636) | A finalist is not a win; "Two … wins" (L595) |  | rescan4-cc-cchs-cov-carmel.md:130 |
| COV-T12 | Covenant Day | Sports › Coaching vs Pipeline | C | "two **current** signees are children of the AD and the guidance counselor" (`sportsPrograms/covenant-day.ts:357`, L1034) | Both are '25 rows (L1013, L1050-1051), and the tile says 0 current seniors committed (L710-711) |  | rescan4-cc-cchs-cov-carmel.md:131 |
| COV-T13 | Covenant Day | College Support › Verdict vs Counseling | A | "One dedicated college counselor for 85 seniors — **cushioned by a director**" (`collegeSupportPrograms/covenant-day.ts:680`, L1547) | The one counselor is the director (L1484). The cushion is the guidance counselor and assistant (Compare qual). |  | rescan4-cc-cchs-cov-carmel.md:132 |
| COV-T14 | Covenant Day | College Support › Transcript table (#10) | C | Column header "National Merit & College Board honors" (L1463) | The rows are AP pass rates, under "The five-year AP line" (L1461-1473) |  | rescan4-cc-cchs-cov-carmel.md:133 |
| COV-T15 | Covenant Day | Summer › catalog; Compare | D | "20 of 20 camps", incl. Strength and Conditioning (`summer/covenant-day.ts:204`, L1665, L1742; Compare 20) | The live board's HTML holds 19; that camp is absent |  | rescan4-cc-cchs-cov-carmel.md:134 |
| CAR-T1 | Carmel Christian | Arts › Theatre, Verdict | A | "placed **six across five** categories" (`artsPrograms/carmel-christian.ts:121`, `:265`; L454, L521) and "five more placements across **four** categories", listing five (`:145`, L469) | Six placements in six categories |  | rescan4-cc-cchs-cov-carmel.md:135 |
| CAR-T2 | Carmel Christian | Arts › 2024 ledger, context, Verdict | A | "Best Featured Performer nominees (as Ballet Lead and as **Vlad**) · **Best Actor** finalists (as Dmitry and as **Lily**) · Best Supporting **Actor** finalists (as Vlad and as **Dowager Empress**)"; "likely a labeling quirk"; "she was a Best Actor finalist" (`artsPrograms/carmel-christian.ts:152`, `:162`, `:265`; L472, L476, L521) | Vlad: nominee, Supporting Actor. Lily: finalist, Best Actress. Dowager Empress: finalist, Supporting Actress. |  | rescan4-cc-cchs-cov-carmel.md:136 |
| CAR-T3 | Carmel Christian | Arts › ledger vs season rhythm | A | The ledger skips from 2026 to 2024 (L463-475), and the context jumps from the 2024 placement to the 2026 win (L476, L520) | The same card lists 2024-25 Oklahoma! (L461). It earned five finalists, the 2026 winner among them. |  | rescan4-cc-cchs-cov-carmel.md:137 |
| CAR-T4 | Carmel Christian | Summer › Cost Planner | A | "≈ per camp day **$36**" (L1719) for "Half-day camp · four-day week" at $180 | 3 weeks × 4 days = 12 days: $45. Every Carmel week has 4 or 3 days (L1436, L1700). |  | rescan4-cc-cchs-cov-carmel.md:138 |
| CAR-T5 | Carmel Christian | After School › A Day Inside | A | At 3:00 "YCC children move into After School care **alongside grades 1–8**" (`afterSchoolPrograms/carmel-christian.ts:207`, L1396) | They join the elementary group "for the last hour" at 5:00 (L1325, L1386, L1399) |  | rescan4-cc-cchs-cov-carmel.md:139 |
| CAR-T6 | Carmel Christian | Arts › Music | D | "**band** and choir run from grade 5 through High School" (`artsPrograms/carmel-christian.ts:198`, L491) | Band is "(MS)", grades 6–8; only choir starts in grade 5 (L444, L483-484) |  | rescan4-cc-cchs-cov-carmel.md:140 |
| CAR-T7 | Carmel Christian | Clubs vs FA | C | "**J-Term** … a graduation requirement" (`clubsPrograms/carmel-christian.ts:34-67`; L381-386) | "**Impact Week** (grades 9–12)" (L1757, L1759) |  | rescan4-cc-cchs-cov-carmel.md:141 |
| CAR-T8 | Carmel Christian | Course Offerings; Compare `us-courses` | D | 96 entries include "Biology · Honors" and "Honors Biology", and the same pair for Chemistry (`courseOfferings.ts:6594`, `:6597`; L96-99, L102-105) | If each pair is one course: 94 entries, 75 distinct titles |  | rescan4-cc-cchs-cov-carmel.md:142 |
| CAR-T9 | Carmel Christian | Sports › Winning Record (#10) | C | Heading "State-title matrix, last 3 seasons" (L773) | Columns "2019–20 finals", "2021–22 finals", "2023–26 finals" span seven seasons (`sportsPrograms/carmel-christian.ts:109`) |  | rescan4-cc-cchs-cov-carmel.md:143 |
| CAR-T10 | Carmel Christian | Compare `ap-performance`; tile | C | Row note "Share of AP **exams** scoring 3 or higher" (`metricValues.ts`); tile "73% · AP scoring 3+" (L867-869) | 73% is the share of **seniors** with at least one 3+ (L1218; the qual says so) |  | rescan4-cc-cchs-cov-carmel.md:144 |
| DD-T1 | Davidson Day | Financial Aid framing and Q8 vs Tuition History | A | "The current-year table overwrites the previous one, so no rate history is recoverable." (`financialAidReports.ts`:1124, L1995); Q8 "What have tuition rates been for each of the last five years?" under "Each is unanswerable from published sources" (:1345, L2080, L2088) | "archived copies of the tuition page carry 2022–23 onward" (L2007), "FOUR YEARS, FROM THE ARCHIVE" (L2076) and a five-year table (L2090-2121) |  | rescan4-dd-gd-hg-k8.md:86 |
| DD-T2 | Davidson Day | Global Exposure verdict; College Support Applicant's Edge and verdict vs Firsts & Milestones | A | "Summer field research at three active sites, one of them on record for 20 seasons" (`internationalTravel/davidson-day.ts`:447, L367); "Students dig under permit at Cahal Pech with the BVAR project" (`collegeSupportPrograms/davidson-day.ts`:819, L1922); "The Belize dig runs with the BVAR project at Cahal Pech" (:680, L1907) | "Cahal Pech ends. The 20th and final season at the site." (L361); "The last of 20 seasons" (L288); 2027 is "AFAR's first season at a new Maya site" (L275) | re-opened | rescan4-dd-gd-hg-k8.md:87 |
| DD-T3 | Davidson Day | Financial Aid › Scholarships vs its ceiling box | B | Acclaim "90% of tuition"; Wolter "all but $500 of annual tuition" (`financialAidReports.ts`:1258, L2048-2049) | "no award covers full tuition and that maximum-award families pay $3,000 per year, per student … implies ceilings of $19,590 … to $23,910 (Upper School)" (:1268, L2052; also L1976). Wolter is $26,410 and Acclaim $24,219 in the Upper School, both over $23,910 | re-opened | rescan4-dd-gd-hg-k8.md:88 |
| DD-T4 | Davidson Day | Sports › Ranked recruits vs roster rank columns | D | "Three four-star basketball recruits in consecutive classes. Cody Peck ’26 is ranked No. 82 nationally by 247Sports" (`sportsPrograms/davidson-day.ts`:315, L1292). Stevens and Denis are each "No. 1" in NC | Roster "247 Nat'l / 247 State": Peck 120 / 2, Stevens 186 / 4, Denis 79 / 4 (L1304). The committed 247Sports record gives Stevens 3 stars, and 82 as 247's in-house rank |  | rescan4-dd-gd-hg-k8.md:89 |
| DD-T6 | Davidson Day | After School gap vs Learning Support | C | "No summer program is published on the live site, and no summer page exists in the site map." (`afterSchoolPrograms/davidson-day.ts`:95, L1956) | "Summer tutoring & therapy · June 1 to July 30, 2026: tutoring $47 for 30 minutes…" (L453-455; tile L385-387) |  | rescan4-dd-gd-hg-k8.md:91 |
| GD-T1 | Gaston Day | Financial Aid (header, Section 01, Section 07); top tile; Compare tuition rows | A | "For 2026-27 the school publishes only a range — $20,300 to $23,310 depending on grade — with no per-grade schedule posted" (`financialAidReports.ts`:2401, L1797); "published without a per-grade table" (:2573, L1878); "2025–26 school year" (:2366, L1786); tile $22,390 (L1782); "2 yrs · of schedules retrievable" (:2574); Compare $19,500 / $21,425 / $22,390 and runs $283,650 / $175,260 / $89,560 (`metricValues.ts`:1112, 1157, 1196, 1245, 1290, 1329) | The school's per-grade 2026–27 schedule | re-opened | rescan4-dd-gd-hg-k8.md:97 |
| GD-T2 | Gaston Day | Financial Aid Sections 02, 06 and Q2–Q4; components | A | "The fees column is not itemized" (`financialAidReports.ts`:2428, L1807, L1820); "Several" plans, "names none of them" (:2547, L1864-1866); "The deposit amount is not published" (:2554); "None of these appears anywhere on the public site: plan names · an installment schedule · plan fees · a card-processing surcharge · a deposit amount · … a tuition-insurance or refund-plan option" (:2560, L1871); Q2, Q3, Q4 | The 2026–27 schedule publishes each of these | re-opened | rescan4-dd-gd-hg-k8.md:98 |
| GD-T3 | Gaston Day | After School (all cards); Financial Aid rows; Compare `latest-pickup`, `aftercare-cost`; HG's qual | A | "Care runs to 6:00 pm … Lower School tier from 3:00 and a Middle School tier from 4:00" (`afterSchoolPrograms/gaston-day.ts`:38, L1413); $95 and $55 a week, $3,420 a year (L1430); "dismissal 4:00" (L1420); "the program web page labels near-identical figures as monthly" (:43, L1426); "The hours conflict", "The billing period conflicts" and two asks (:274-282, L1509, L1519-1526); "No … catalog" / "coming soon" (L1505); FA rows (`financialAidReports.ts`:2415); Compare "6:00 PM", "$95/wk" (`metricValues.ts`:1924, 1996, 2024) | The school's 2026–27 schedule and its program page now agree on $100 and $60 a week, to 5:30 | re-opened | rescan4-dd-gd-hg-k8.md:99 |
| GD-T4 | Gaston Day | Financial Aid Sections 03–05, Q5 | A | "How the three routes affect each other is not published" (`financialAidReports.ts`:2530, L1858); Q5 "stack, or offset each other?" (:2582); Indexed Tuition is named nowhere in the report | The cost page publishes the need-aid and voucher rule | re-opened | rescan4-dd-gd-hg-k8.md:100 |
| GD-T5 | Gaston Day | After School facts vs fine print and verdict | A | "Registration is free and stated as taking under five minutes." (`afterSchoolPrograms/gaston-day.ts`:85, L1427) | "states no … registration fee" (:171, L1484); "No registration fee … is published" (:182, L1485); "no registration fee published" (:265, L1512) |  | rescan4-dd-gd-hg-k8.md:101 |
| GD-T6 | Gaston Day | After School ask vs Financial Aid | A | "Is there any financial-aid pathway or sibling discount for aftercare, as there is for tuition?" (`afterSchoolPrograms/gaston-day.ts`:287, L1526) | "no sibling, military, clergy or employee discount" published (L1860) |  | rescan4-dd-gd-hg-k8.md:102 |
| GD-T7 | Gaston Day | College Support Applicant's Edge and verdict vs Student Clubs | A | "teams in 2012, 2016, 2018 and 2020, with a gold medal. Projects included a kudzu phytotoxin …" (`collegeSupportPrograms/gaston-day.ts`:621, L1381); "The school has a gold-medal iGEM synthetic-biology team" (:612, L1378); "A gold-medal iGEM team" built into the program (:741, L1400) | "The school says its research teams 'previously competed in the iGEM competition for over a decade…' It names no years or projects" (L224) |  | rescan4-dd-gd-hg-k8.md:103 |
| GD-T8 | Gaston Day | Arts verdict vs Compare `ensembles` | A | "a four-course visual sequence plus three ensembles in the Upper School" (`artsPrograms/gaston-day.ts`:272, L338), meaning Band, Concert Choir and Vocal Performance Ensemble (L296-299) | Compare "3 ensembles": the Vocal Performance Ensemble plus two Middle School groups; "Band and Concert Choir … are not counted here" (`metricValues.ts`:1676) |  | rescan4-dd-gd-hg-k8.md:104 |
| GD-T9 | Gaston Day | Compare `bucket-hbcu` qual vs acceptance list | A | "Tougaloo also holds a 2026 Liberal Arts rank (#180), so it scores in two buckets." (`metricValues.ts`:801; comment :790) | "Tougaloo College ↗ Liberal Rank #178" (L1022); tagged `hbcu` only, and #178 is outside the Top-75 bucket |  | rescan4-dd-gd-hg-k8.md:105 |
| GD-T10 | Gaston Day | Course Offerings; College Support; Arts verdict vs the current profile edition | B | "British Literature" (`courseOfferings.ts`:7259, L63); a 2024–25 grade distribution by department is published (`collegeSupportPrograms/gaston-day.ts`:453, 734, 739; L1329, L1398); "ARTS grade distribution … (72% A+…)" (`artsPrograms/gaston-day.ts`:288, L342) | The edition College Counseling now links has "European Literature(H)" and no grade-distribution table |  | rescan4-dd-gd-hg-k8.md:106 |
| GD-T11 | Gaston Day | Financial Aid › What the Numbers Disclose | C | "$0 · published aid budget, total awarded, or average award" (GD `financialAidReports.ts`:2485, L1841); "$0 · published aid totals, averages, or rates" (HG :2255, L1722) | "26% of the student body on tuition assistance" and "No total aid budget in dollars" published (L1837, L1847); HG "funds are awarded until depleted" (L1712) |  | rescan4-dd-gd-hg-k8.md:107 |
| GD-T12 | Gaston Day | Compare `summer-ages` qual vs catalog | A | "half-day enrichment camps span rising PreK–6th" (`metricValues.ts`:2203) | "Baseball Camp · Rising 1st–8th · $220", a half-day camp (L1569-1575) |  | rescan4-dd-gd-hg-k8.md:108 |
| GD-T13 | Gaston Day | Arts › Studio to Gallery label vs its body | A | "Art-school matriculation" (`artsPrograms/gaston-day.ts`:246, L330) | "The 2019–2025 acceptance list includes…" (L331); "It is not where any one class landed." (L848) |  | rescan4-dd-gd-hg-k8.md:109 |
| GD-T14 | Gaston Day | Whole Class Analytics vs course list | A | "A broad Honors tier sits below the AP courses across every department" (`collegeSupportPrograms/gaston-day.ts`:713, L1292) | PE / Health has no Honors and no AP course (L117-120) |  | rescan4-dd-gd-hg-k8.md:110 |
| GD-T15 | Gaston Day | Applicant's Edge vs Capstone descriptions | A | "a required 40-hour Capstone every senior must defend" (`collegeSupportPrograms/gaston-day.ts`:612, L1378-1379) | "Students document and report on it throughout." (L188; also L1324, L1383) |  | rescan4-dd-gd-hg-k8.md:111 |
| GD-T16 | Gaston Day | Course Offerings requirement vs the list | B | "Completion through Level III, in Spanish or French, is required" (`courseOfferings.ts`:7299, L104) | The World Language list holds Spanish I–IV and no French (L103-106) |  | rescan4-dd-gd-hg-k8.md:112 |
| HG-T1 | Hickory Grove | Summer catalog, scope, STALE flag; Compare `summer-weeks` | A | "roughly eight week-blocks from late May through late July" (`summer/hickory-grove-christian.ts`:35, L1570); "The live 2026 page confirms eight session windows consistent with the week-blocks below"; names "hide[den] behind the Brushfire platform" (:37, :258, L1571, L1684); tile "8" (L1563) and qual (`metricValues.ts`:2088, 2104) | The 15 rows fall in six weeks: May 30, Jun 5, 12, 19, 26, Jul 24 (L1583-1682). The record built "~8" from 2022 variants | re-opened | rescan4-dd-gd-hg-k8.md:118 |
| HG-T2 | Hickory Grove | Summer "Ages served" tile and Compare vs the catalog | A | "rising 1–8 · Ages served" (`metricValues.ts`:2191, L1567-1568) | "College Admissions Boot Camp … Rising 11–12" (L1647), the filter "Rising 11–12" (L1573) and the headline (L1569). The tile has no qual on the school page |  | rescan4-dd-gd-hg-k8.md:119 |
| HG-T3 | Hickory Grove | Financial Aid Section 05 and Q3 vs the linked policies and Learning Support | A | "no late-payment or withdrawal terms, appear in the sources checked" (`financialAidReports.ts`:2325, L1756); Q3 "Are there other 'student services fees' … where can we see them" under questions "the public record cannot answer" (:2344, L1767; After School :158, L1559 area) | The same Tuition and Fees page publishes withdrawal and delinquency terms and links the ESS fee schedule. Learning Support prints those fees (L469-471, L505-545) | re-opened | rescan4-dd-gd-hg-k8.md:120 |
| HG-T4 | Hickory Grove | Applicant's Edge vs recognition window | A | "a decade of College Board recognitions" (`collegeSupportPrograms/hickory-grove-christian.ts`:514, L1485) | "across the seven-year profile window", 2020–2026 (L1434-1440, L1488) |  | rescan4-dd-gd-hg-k8.md:121 |
| HG-T5 | Hickory Grove | Admissions cross-band table vs International band and band steps | A | "Constant in every band": pastor form "required at every grade", "$300 application fee", "$500 … deposit", testing (`admissionsPrograms/hickory-grove-christian.ts`:976-978, L123-124). Records row for Middle and High has no IEP/504 (:920-921, L90-91) | International: two teacher forms and no pastor (L86), application fee "amount is not published", English tests instead of entrance testing. The Middle and High steps and checklists both require "any … IEP, 504" |  | rescan4-dd-gd-hg-k8.md:122 |
| HG-T6 | Hickory Grove | Arts ladder, Theatre | B | "Two productions a year, a fall show and a spring musical" (`artsPrograms/hickory-grove-christian.ts`:100, :109; L667-668, L681) | The performing-arts page describes three |  | rescan4-dd-gd-hg-k8.md:123 |
| HG-T7 | Hickory Grove | Arts vs Course Offerings | B | High School "Technical Theatre & Management" (`artsPrograms/hickory-grove-christian.ts`:73, L676). Middle School board: two bands and Praise Team, no choir (:156, L710-713) | The 112-course catalog has no such course (L302-316). The Middle School catalog lists "Choir · Gr 7–8" (L434-435) |  | rescan4-dd-gd-hg-k8.md:124 |
| HG-T8 | Hickory Grove | After School headline and verdict | A | "covers the whole school" (`afterSchoolPrograms/hickory-grove-christian.ts`:33, :138; L1513, L1546); "Whole-school coverage … so there is no division gap" (:142, L1549) | Study Hall is "grades 6–11"; grade 12 is the open question (L1514, L1547, L1559) |  | rescan4-dd-gd-hg-k8.md:125 |
| HG-T9 | Hickory Grove | College Support vs Summer | C | The Boot Camp "is run by the counseling staff" and "runs" today (`collegeSupportPrograms/hickory-grove-christian.ts`:449, 532, ask :641; L1482, L1492, L1505) | Summer labels it part of "the Summer 2023 catalog … not the live 2026 list" (L1571, L1642-1647) |  | rescan4-dd-gd-hg-k8.md:126 |
| TRI-T1 | Trinity | Summer Cost Planner | A | "One-time fees $75"; "$870 for the summer" for 3 × $265 (`summer/trinity-episcopal.ts`:1238-1247, L1151-1155) | The fine print calls the $50 a deposit "per camp" with a balance due later (L1157-1160). It is part of the price, not one-time and not extra | re-opened | rescan4-dd-gd-hg-k8.md:132 |
| TRI-T2 | Trinity | High School Placement tile | A | "9 · years on one campus before the search begins · Kindergarten through 8th grade" (`highSchoolPlacementPrograms/trinity-episcopal.ts`:78, L441-443) | "Fall of 8th grade — the search begins" (L445, L447). K–7 is eight years |  | rescan4-dd-gd-hg-k8.md:133 |
| TRI-T3 | Trinity | Arts › course path vs Course Offerings | A | "K–4 art, on the TAB model → Middle School art" (`artsPrograms/trinity-episcopal.ts`:284, L371), which drops 5th grade | "Visual Arts · K–Gr 5" (L126); Middle School is 6–8 (L194) |  | rescan4-dd-gd-hg-k8.md:134 |
| TRI-T4 | Trinity | Summer catalog descriptions vs division grade spans | A | Rising 4–8 "for the older Middle School bands"; rising 3–8 "spanning the whole Middle School band"; rising 5–8 "for the Middle School band" and "A Middle School leadership camp" (`summer/trinity-episcopal.ts`:220, 339, 404, 536; the Wildcat Cycling, Tennis 101, Procreate and Kamp HUROP rows) | Lower School is "K – Grade 5" (L108) and Middle School "Grades 6 – 8" (L139) |  | rescan4-dd-gd-hg-k8.md:135 |
| PREP-T1 | Charlotte Prep | Financial Aid Section 01 vs Tuition History | A | On the 2024-25 → 2026-27 rise: "Since 2024-25 the school has folded its athletics, fine arts and technology fees into tuition, so part of the rise replaces fees families once paid separately." (`financialAidReports.ts`:3061, L781) | "From 2024–25 … so part of **that year's** rise replaced fees" (L915). The fees are already in the $25,000 base | re-opened | rescan4-dd-gd-hg-k8.md:141 |
| PREP-T2 | Charlotte Prep | Financial Aid vs Summer Cost Planner | A | "Summer camp — $250 to $600 a week (2026)" (`financialAidReports.ts`:3081, L793) | "$175 in the four-day week", "$200 in the four-day week" (L725, L731) |  | rescan4-dd-gd-hg-k8.md:142 |
| PREP-T3 | Charlotte Prep | Tuition History prose vs its table | A | "Before 2019, Charlotte Prep raised tuition about 2–4% a year." (L915) | Kindergarten rose 0% and 0% (L883-890) |  | rescan4-dd-gd-hg-k8.md:143 |
| PREP-T4 | Charlotte Prep | Summer headline vs catalog | A | "plus a specialty or sports camp almost every week" (`summer/charlotte-prep.ts`:35, L594-595) | All seven weeks have a specialty camp (L636-676), and all seven have a sports camp (L683-711) |  | rescan4-dd-gd-hg-k8.md:144 |

## Dropped, moved, merged, re-labeled at Step 5

- **LAT-T5 dropped.** The FAQ's "parallel but separate process" does not say who sees a family's data or how long it is kept, which is what the card lists as unpublished.
- **LAT-T11 dropped.** An informal club open to anyone does not contradict "no auditioned or tiered ensembles published".
- **LAT-T1 moved to Part 1** (P-CO2).
- **PD-T2 moved to Part 1** (PD bus fares).
- **PD-T3 moved to Part 1** (PD bus fares).
- **PD-T18 merged** into X5.
- **CAN-T7 merged** into X5.
- **CC-T15 merged** into X5.
- **CCD-T17 merged** into X5.
- **LAT-T7 merged** into X5.
- **LAT-T8 merged** into X7.
- **DD-T5 merged** into X7.
- **CAN-T8 merged** into GD-T3.
- **GD-T11 re-labeled C:** an unpublished total labeled as "$0 published": a label fix, not a wrong value.
- **CCD-T11 re-labeled D:** plan ccdprofile D11 chose the current hint, so changing it is the user's call.

## Approvals (every UX-GATE and CHROME mark)

- **CCD-T1** (Country Day; UX-GATE): Price the row and remove bus from Q3 and from "All four unpriced items". That gives 3 unpriced, 30%, **under the report's 33% bar**, so the user must decide whether to build the all-in estimate (UX-GATE) or restate the rule (three items are range-only).
- **LAT-T13** (Charlotte Latin; UX-GATE): Rewrite the headline, scope and flag: Mosaic is the club-list umbrella; a separate ATSS program, Brotherhood & Belonging, serves boys in grades 3–12 (Upper School part described as future). Add a scope line that the Indian Student Alliance appears in school news and not on the club list; do not count it. Text in an existing card. A new sub-block would be UX-GATE.
- **COV-T14** (Covenant Day; UX-GATE + CHROME): A per-school header, "AP results", like round 3's `meritCollegeAwards`. **UX-GATE, CHROME.**
- **CAR-T4** (Carmel Christian; UX-GATE): Add a days-per-week field on the tier and divide by it. **UX-GATE** (component and type; no visual change). CC $155 / $160 tiers are wrong the same way.
- **CAR-T9** (Carmel Christian; UX-GATE + CHROME): Rebuild the matrix on the last three seasons, or give this school "State-title matrix, 2019–26". **UX-GATE, CHROME.**

## Decisions for the user

### D items, and calls attached to other findings

- **CCD-T4** (Country Day): The user supplies the 21% page, or approves dropping "20% or 21%".
- **CCD-T11** (Country Day): Hints → "— 2026–27 profile, class not named"; subs → "(2026–27 profile)". `ccdprofile` D11 chose the present hint, so the user may prefer to keep it.
- **CCD-T15** (Country Day): The user supplies the year, or approves dropping "of ~141" and the inference.
- **CAN-T17** (Cannon): The user opens the brochure. If it is 2026–27, refresh the catalog and the STALE note.
- **LAT-T15** (Charlotte Latin): The user decides whether the committed record is enough. If so: L2875 → "a bundle the school calls a discount, $25.00 less than…". L2878 can stay, as it is literally true.
- **LAT-T16** (Charlotte Latin): The user decides on the record, or waits for the 2027 site. If the record is enough: "26 offerings, with no early-bird discount."
- **LAT-T17** (Charlotte Latin): Same decision. If the record is enough: "A full-day arts premium camp, the only one at its price."
- **LAT-T18** (Charlotte Latin): The user supplies a second award year, or the words "across multiple years" come out.
- **CC-T16** (Charlotte Christian): The user picks one rule. ACC everywhere: CC 9 → 11. Independent for football: CCHS 15 → 14. Fix the headline, prose and Compare with it. R1 misses it: it recounts the typed `level`.
- **COV-T15** (Covenant Day): The user, or a browser pass, confirms whether it was withdrawn or loads separately. No change until then. If withdrawn: 19 everywhere.
- **CAR-T6** (Carmel Christian): On a successful fetch or the user's word: "choir runs from grade 5 and band from Middle School".
- **CAR-T8** (Carmel Christian): The user, or a later fetch, confirms whether the descriptions page really lists both. If not, 94 in the teaser, tile and Compare. R4 cannot see duplicate rows.
- **DD-T4** (Davidson Day): No change until someone opens those pages in Chrome. If the record holds: "No. 82 in 247Sports' own ranking (No. 120 in its Composite)", and say which service gives each fourth star and each No. 1
- **COV-T4:** headline 86 (academics page only) or 89 (union with the profile).
- **CCD-T1 + CCD-T2:** pricing both drops the report under its 33% unpriced bar. Build the all-in estimate (UX gate) or restate the rule.
- **PD-T1:** drop two colleges from the prose, or restore them to the list under the merge rule.
- **CAN-T15:** whether Compare's honor-society count moves from 12 to 13.
- **GD-T11 / X1:** the replacement label for the "$0" tile at four schools.

### B items: wording of the attribution and of the ask

- **CCD-T3** (Country Day): Keep the values and attribute: "the tuition page says $9.4M to 341 students; Fast Facts says $10.1M to 347" in both quals and the After School sentence. Add a verify flag and fold it into Q1.
- **CCD-T9** (Country Day): "The public ERP page describes hourly tutors before, during or after the day; the division pages describe scheduled sessions (45 minutes in Lower School)." Add a verify flag.
- **CCD-T10** (Country Day): "The accommodations page says … ; the linked policy says four years from grade 6."
- **CCD-T13** (Country Day): "The profile lists no post-AP CS course; the 2025–26 guide has Advanced Topics in Computer Science after AP CS." Reword the ask to whether it still runs.
- **CCD-T22** (Country Day): Show both, attributed, in that sentence and drop "see the flag below". Keep the dev flag and note that Camp Ready contradicts itself.
- **CCD-T23** (Country Day): L2333 → "ages 4–18 (the after-school page says 3–18)". The flag is dev-only today.
- **CAN-T12** (Cannon): College Support: "Global Studies Certificate (the catalog and profile say Global Education Certificate). The program page still lists … but sends the Class of 2024 onward to the Mastery Credits." Add a verify flag.
- **CAN-T13** (Cannon): Attribute ("the profile lists …; the 2026–27 catalog …"), choose a catalog course for the example, add a verify flag and extend the Compare qual.
- **CAN-T15** (Cannon): "Twelve on the school's roster and profile; a school news post also announces a Science NHS chapter (2026)." Correct the flag. Whether Compare's "8 + 12" becomes 8 + 13 is the user's call. Name no students.
- **CAN-T16** (Cannon): Attribute both ("the profile says one in 10th; the catalog allows two"), soften "hard" and "twelve", add a verify flag and an ask.
- **LAT-T2** (Charlotte Latin): Show both, attributed: MS/US "3:20 or 3:30 (the school's two Transportation pages differ)"; LS bus "4:30 on the Hawks' Club and Admissions pages; 4:45 on the Student Life page"; morning window the same. Extend verify flag `:95`. Ask → "…2:55, 3:05, or 3:10? Is the Lower School activity bus 4:30 or 4:45? Your two Transportation pages disagree."
- **CCHS-T1** (Charlotte Catholic): Show both: "$150 per new student. For a returning student the web page says $150 and the PDF schedule says $75." Verify flag, plus an ask. The Fees table (FA record `## Fees`) too.
- **COV-T8** (Covenant Day): Attribute both at each place, add a verify flag or comment, and an Arts ask: "Can a 3rd grader join the Children’s Choir?"
- **COV-T9** (Covenant Day): "Theater I–II on the theater page (one Theatre course in the catalog)". Comment beside the course row.
- **DD-T3** (Davidson Day): Keep all three. Add to the box: "The school's two named scholarships state larger awards, so ask whether the $3,000 minimum applies to them." Add the question and a verify flag
- **GD-T10** (Gaston Day): Name both: "European Literature (British Literature in the September edition)". Attribute the distribution to the September 2025 edition. Verify flag; point source links at both
- **GD-T16** (Gaston Day): Append "The profile's course table lists only Spanish." Code comment, as the division has no flags
- **HG-T6** (Hickory Grove): "The Arts home page counts two… The Performing Arts page lists two drama productions and a spring musical." Verify flag and ask
- **HG-T7** (Hickory Grove): Attribute: "Technical Theatre & Management (on the Performing Arts page, not in the catalog)"; add "Choir (7th–8th, in the course catalog)". Ask and verify flag

## Rule candidates

- **R12, rank citations in prose:** "<college> #N" in a note or qual, and the ends of an "X through Y" span, compared with collegeRankings. It would have caught CCHS-T6, GD-T9 and COV-T7 (three schools). Calibrate to zero on main before gating.
- **Widen R10** to read "N sessions" as well as "N weeks" (PD-T8).
- **Widen R1** to a spelled-out "current seniors committed" count in pipeline prose (CAN-T1).
- Not proposed: the short-week price rule, turned down in settled.md.

The largest class no rule can reach is a school publishing a fact that the site calls unpublished or shows from an older year (tuition, fees, deadlines, profiles). It needs a scheduled source re-check, which is a process decision for the plan.

## Settled entries

- **Skipped, values unchanged:** S1, S2, S3, S4, S5, S6, S7. None was raised as a finding, so none had to be dropped.
- **Reopened:** none.

## Settled candidates (for settled.md's R8 table)

| School | Noun | Numbers | Why it is not a conflict |
|---|---|---|---|
| Davidson Day | teams | 35 / 33 | School's count vs chips; DD-S1's footnote names the basis |
| Gaston Day | seniors | 1 / 35 / 18 | 18 is the computed Compare caseload, 35 ÷ 2; "1" is parsed from the "~18:1" tile |

No R8 group is new since the pre-merge report. Providence Day ensembles 6 / 4 closed.

## Source-material files appended to (47, uncommitted)

Appends only, under `## Method`. 22 records gained that heading at the end. One Cannon record also gained its missing final newline.

- `source-material/admissions/charlotte-christian/Charlotte Christian - Admissions - Financial Aid Platform Migration to Clarity.md`
- `source-material/after-school/cannon/Cannon - After School - Redesign Research 2026.md`
- `source-material/after-school/charlotte-christian/Charlotte Christian - After School - Redesign Research 2026.md`
- `source-material/after-school/charlotte-country-day/CCD - After School - Redesign Research 2026.md`
- `source-material/after-school/charlotte-latin/Charlotte Latin - After School - Redesign Research 2026.md`
- `source-material/after-school/gaston-day/Gaston Day School - After School - Program Hours and Rates 2026.md`
- `source-material/after-school/providence-day/Providence Day - After School - Redesign Research 2026.md`
- `source-material/college-support/cannon/Cannon School - College Support - School Profile 2026-2027.md`
- `source-material/college-support/charlotte-catholic/Charlotte Catholic - College Support - School Profile 2026-2027.md`
- `source-material/college-support/charlotte-country-day/CCD - College Support - School Profile 2026-2027.md`
- `source-material/college-support/gaston-day/Gaston Day School - College Support - School Profile Research 2026.md`
- `source-material/college-support/providence-day/Providence Day - College Support - School Profile 2026-2027.md`
- `source-material/course-offerings/charlotte-country-day/Charlotte Country Day - Course Offerings - Curriculum Guide.md`
- `source-material/course-offerings/covenant-day/Covenant Day School - Course Offerings - High School Course and Elective Offerings.md`
- `source-material/financial-aid-tuition/cannon/Cannon - Financial Aid and Tuition - Tuition History.md`
- `source-material/financial-aid-tuition/charlotte-catholic/Charlotte Catholic - Financial Aid & Tuition - Schedule and Aid Programs 2026-2027.md`
- `source-material/financial-aid-tuition/charlotte-country-day/Charlotte Country Day - Financial Aid and Tuition - Tuition History.md`
- `source-material/financial-aid-tuition/charlotte-latin/Charlotte Latin - Financial Aid and Tuition - Scholarships and Aid FAQ.md`
- `source-material/financial-aid-tuition/charlotte-prep/Charlotte Preparatory School - Financial Aid and Tuition - Tuition History.md`
- `source-material/financial-aid-tuition/covenant-day/Covenant Day School - Financial Aid and Tuition - Deep Dive Report.md`
- `source-material/financial-aid-tuition/davidson-day/Davidson Day - Financial Aid and Tuition - Tuition History.md`
- `source-material/financial-aid-tuition/gaston-day/Gaston Day School - Financial Aid & Tuition - Schedule and Aid Programs 2026.md`
- `source-material/financial-aid-tuition/hickory-grove-christian/Hickory Grove Christian - Financial Aid - Deep Dive Report.md`
- `source-material/financial-aid-tuition/providence-day/Providence Day - Financial Aid and Tuition - Transportation 2026-27.md`
- `source-material/international-travel/cannon/Cannon School - International Travel - Source URLs.md`
- `source-material/international-travel/charlotte-country-day/Charlotte Country Day - International Travel - Source URLs.md`
- `source-material/international-travel/davidson-day/Davidson Day - International Travel - Source URLs.md`
- `source-material/international-travel/providence-day/Providence Day - International Travel - Source URLs.md`
- `source-material/learning-support/charlotte-catholic/Charlotte Catholic - Learning Support - Official Site Research.md`
- `source-material/learning-support/charlotte-country-day/Charlotte Country Day - Learning Support - Official Site Research.md`
- `source-material/sports/davidson-day/Davidson Day - Sports - Redesign Research 2026.md`
- `source-material/student-clubs/cannon/Cannon - Clubs - Honor Societies Web Check 2026.md`
- `source-material/student-clubs/charlotte-christian/Charlotte Christian - Student Clubs - Clubs Redesign Deep Research.md`
- `source-material/student-clubs/charlotte-latin/Charlotte Latin - Student Clubs - Clubs Redesign Deep Research.md`
- `source-material/summer-programs/charlotte-christian/Charlotte Christian - Summer Programs - Camp Catalog.md`
- `source-material/summer-programs/charlotte-country-day/CCD - Summer Programs - Camp Catalog.md`
- `source-material/summer-programs/covenant-day/Covenant Day School - Summer Programs - Redesign Research 2026.md`
- `source-material/summer-programs/gaston-day/Gaston Day School - Summer Programs - 2026 Camp Catalog.md`
- `source-material/summer-programs/hickory-grove-christian/Hickory Grove Christian - Summer Programs - Camp Catalog.md`
- `source-material/summer-programs/providence-day/Providence Day - Summer Programs - Camp Catalog.md`
- `source-material/summer-programs/trinity-episcopal/Trinity Episcopal School - Summer Programs - Summer Costs and Policies.md`
- `source-material/the-arts/carmel-christian/Carmel Christian - The Arts - Deep Research.md`
- `source-material/the-arts/charlotte-catholic/Charlotte Catholic - The Arts - Program Facilities and Recognition 2026.md`
- `source-material/the-arts/charlotte-christian/Charlotte Christian - The Arts - Arts Redesign Deep Research.md`
- `source-material/the-arts/charlotte-country-day/CCD - The Arts - Music Ensembles Web Check 2026.md`
- `source-material/the-arts/charlotte-latin/Charlotte Latin - The Arts - Arts Redesign Deep Research.md`
- `source-material/the-arts/hickory-grove-christian/Hickory Grove Christian - The Arts - Program Overview Web Check 2026-11-10.md`
