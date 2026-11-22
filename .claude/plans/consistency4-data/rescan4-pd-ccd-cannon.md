# Consistency rescan 4: Providence Day, Charlotte Country Day, Cannon (main 13551180, 2026-11-22)

Table cells join a row's cells with " · " where the dump puts them on separate lines. `L<n>` is a line in `scan4/pages/<slug>.txt`. Data lines are at 13551180. `caused-by-round-3` was judged against `git diff 58434f0b 13551180`.

How this was checked:

- All three page dumps were read in full, and the Compare values and quals were dumped from `metricValues.ts`.
- `node scripts/check_consistency.mjs` was run and is clean.
- Each citation link in the three Financial Aid reports was fetched. All returned 200, but only the links used as evidence had their content read.
- "Show sources" bodies are not in the pre-rendered dump, so source lines were read from the data. They were not checked in a browser.
- Issuu refused the one fetch made to it (403). It was not retried.

## Part 1: regression check of round 3

**69 distinct rows: 60 RESOLVED · 0 NOT RESOLVED · 3 PARTIAL · 6 UNCHANGED BY DECISION.** The worklist lists 35 of its IDs in both Part 1 and Part 1b. Those are judged once.

| id | status | where | note |
|---|---|---|---|
| X1 (Cannon) | RESOLVED | Cannon L1159-1166 | D1 bars 5+2+2+1+1+1 = 12, equal to the roster |
| X2 | RESOLVED | PD L2743 · CCD L2507 · Cannon L2119 | 70 / 72 / 76 |
| X3 (CCD) | RESOLVED | CCD L2213 | ~27:1 |
| X4 | RESOLVED | PD L285 · CCD L251 · Cannon L104 | 172/153, 117/121, 104/101 |
| X5 (PD) | RESOLVED | PD L3422; Compare `run-ms12` | Grades 6–8 basis, $254,275 |
| X6 (PD) | RESOLVED | PD L3322-3339 | Now 7 priced and 9 unpriced, still 56% |
| X6 (CCD) | RESOLVED | CCD L3196-3197 | Extended Day and enrichment priced. Two other items are CCD-T1 and CCD-T2 |
| X7 | RESOLVED | `metricValues.ts` L1985 | Both month conventions stated |
| PD-4 | RESOLVED | PD L1178, L1180 | TK–5 / 6–8 |
| PD-17 | RESOLVED | PD L1091, L1105, L850 | "only one other school in the state holds". Round 3's leftover is fixed |
| PD-18 | RESOLVED | PD L1100 | 38 = 24+5+9 |
| PD-19 | RESOLVED | PD L901 | 39+16+9+6+4+3 = 77 |
| PD-20 | RESOLVED | PD L1175 | Superseded by PD-S1 (3 + 3) |
| PD-23 | RESOLVED | PD L134, L285, L2367 | 30 AP, recounted |
| PD-24 | RESOLVED | PD L173, L285 | 72/53 and 172/153 |
| PD-25 | RESOLVED | PD L3345 | "2026–27 aid cycle" |
| PD-26 / PD-R7 | RESOLVED | PD L601-603, L883 | ~19 vs 16 labelled, four continents abroad |
| PD-27 | RESOLVED | PD L1173, L1293; Compare qual | AP Art and Design |
| PD-28 | RESOLVED | PD L553; `artsMatrix.ts` | |
| CCD-5 | RESOLVED | CCD L1662, L1669, L2277 | "admitted" |
| CCD-7 | RESOLVED | CCD L1004, L1662, L2212, L2269, L2292 | Both values attributed and asked |
| CCD-8 | RESOLVED | CCD L1006 | |
| CCD-9 | RESOLVED | CCD L1152, L1185 | |
| CCD-10 | RESOLVED | CCD L2446, L2483 | 20% (341) |
| CCD-11 | RESOLVED | CCD L873 | 40-name recount |
| CCD-12 | RESOLVED | CCD L1237 | 8 varsity |
| CCD-24 | RESOLVED | CCD L139, L251 | 117 |
| CCD-27 | RESOLVED | CCD L607 | |
| CCD-28 | **PARTIAL** | CCD L2286; `collegeSupportPrograms/charlotte-country-day.ts` L918 | The Transcript (L2171) and Edge (L2268) attribute both claims. The Verdict still says "first in North Carolina to offer it" as fact, against L695 and L718 "first private school". The profile and the history page still differ today. Fix: "the profile calls it the first in North Carolina, the history page the first private school". Rounds 2 and 3 both marked this resolved. Older than round 3 |
| CCD-29 | RESOLVED | CCD L959 | 5, or 6 with NJHS |
| CAN-3 | UNCHANGED BY DECISION | Cannon L2117 | S4: 251 unchanged |
| CAN-13 | RESOLVED | Cannon L857 | 20 = 7+5+8 |
| CAN-14 | RESOLVED | Cannon L709, L769 | 24 and eleven, recounted |
| CAN-15 | RESOLVED | Cannon L1950, L2087 | $69 a month |
| CAN-16 | RESOLVED | Cannon L2814, L2816 | Recomputed |
| CAN-24 | RESOLVED | Cannon L104 | |
| PD-R1 | RESOLVED | PD L2460, L2477 | |
| PD-R2 | RESOLVED | PD L1200, L1272, L1274, L1299 | |
| PD-R3 | RESOLVED | PD L2390, L2477 | |
| PD-R4 | RESOLVED | PD L1790, L2477 | |
| PD-R5 | RESOLVED | PD L1635 | 19 of 31, recounted |
| PD-R6 | RESOLVED | PD L786 | |
| CCD-R1 | **PARTIAL** | CCD L1130-1137, L1147, L1150, L1197; `artsPrograms/charlotte-country-day.ts` L227, L248, L364 | That fix wrote three claims the guide contradicts. (1) "Honors / select tier" and "sets an audition for" three groups omit Honors Concert Choir, which is on L424 and whose guide entry says "Honors students must apply and successfully complete an audition". (2) The ask says "The course guide sets an audition only for the three honors groups", but Symphonic Band and Orchestra each read "Participation in the MS … program OR audition and permission of the instructor". (3) The board calls both "Open enrollment". Guide re-downloaded today. Fix: add Honors Concert Choir to the select tier, the caveat and rung 02; label Band and Orchestra "MS participation, or an audition"; ask → "The guide asks newcomers to band or orchestra to audition. Can a beginner still get in?" Not caused by round 3 |
| CCD-R2 | RESOLVED | CCD L1045 vs L700-701 | 10–20 |
| CCD-R3 | RESOLVED | CCD L2523, L2551, L2915 | Recorded deviation |
| CCD-R4 | RESOLVED | CCD L2507; Compare qual | 75 |
| CCD-R5 (CCD) | RESOLVED | CCD L3254-3255 | Recomputed |
| CCD-R5 (Cannon) | RESOLVED | Cannon L2820-2826 | Q8 gone, Q1–Q7 contiguous |
| CCD-R6 | RESOLVED | CCD L2333 | |
| CCD-R7 | RESOLVED | CCD L1147 | 12 recounted |
| CCD-R8 | UNCHANGED BY DECISION | CCD L3222-3225 | S7: live page still reads $880,000 / $39,600 / +6,000 today |
| CAN-R1 | RESOLVED | Cannon L793, L841 | |
| CAN-R2 | RESOLVED | Cannon L829 | 2026–27 catalog |
| PD-S1 | RESOLVED | PD L1175, L1237-1250; Compare `ensembles` | 3 + 3, "6 ensembles". The qual names the same six as the board. "Not published" caveat gone. Agrees with L548 |
| PD-S2 | RESOLVED | PD L703, L704, L729-731, L824 | Both wordings shown. Tile and Global Map re-read today |
| CCD-S1 | RESOLVED | CCD L2506, L3021 | Both sentences match today's listing |
| CCD-S2 (CCD) | RESOLVED | CCD L2670, L2747, L2789, L2859, L2895, L2916, L2929 | All seven descs, prices match today's listing |
| CCD-S2 (Cannon, three priced rows) | RESOLVED | Cannon L2268, L2345, L2513 | $180 / $196 / $180 |
| CCD-S2 (Cannon, four rows with no recorded price) | UNCHANGED BY DECISION | Cannon L2422, L2450, L2526, L2569 | Code comment only, per Decisions |
| CCD-S3 | RESOLVED | CCD L2160, L2291 | Four coaches. No learning-specialist sentence left in College Support |
| Research finding: PD bus fares | **PARTIAL** | PD L3301, L3328, L3339; asks L3429-3438 | Row, count, framing and ask are fixed, and every fare matches today's page. The fix introduced two conflicts, PD-T2 and PD-T3 |
| Scope addition: linked Financial Aid sources (3 schools) | RESOLVED | `financialAidReports.ts` L160-642, L1652-1954 | All links 200. The "2017–18" link has a 2018-19 filename but is the 2017–18 report |
| Review 1, PD-S1 second card | RESOLVED | PD L1253 | "Jazz Ensemble requires an audition" |
| Review 1, drop "band/jazz" from step 01 | UNCHANGED BY DECISION | PD L1252 | Rejected in the plan |
| Review 5, CCD-R8 source lines | RESOLVED | `financialAidReports.ts` L316, L390 | Live URL cited |
| Second pass 2, "retrieved 22 Nov 2026" | RESOLVED | same lines | |
| Capped pass 7, PD footer dates | RESOLVED | `financialAidReports.ts` L1737, L1944 | Bus fares dated 22 Nov 2026. The card header is PD-T3 |
| Optional polish, PD-R4 bare "100%" tile | UNCHANGED BY DECISION | PD L1791-1792 | Out of scope in the plan |
| Optional polish, CCD-R1 ladder label | UNCHANGED BY DECISION | CCD L1079 "Chamber/Honors Choir" | Out of scope in the plan. It is the school's own page wording |

## Part 2: new findings

**59 findings (PD 18, CCD 24, Cannon 17): A 36 · B 10 · C 10 · D 3.** Two were caused by round 3 (PD-T2, PD-T3). The other 57 are older. "Live drift" marks a finding where the school's page today differs from what we print.

| id | school | section(s) | value A (where) | value B (where) | category | caused-by-round-3 | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|---|
| PD-T1 | PD | College Support › Whole Class, Applicant's Edge vs the acceptance list | "School of Visual Arts" and "Bocconi" in the conservatory and international lists (L2358; `collegeSupportPrograms/providence-day.ts` L889); "Trinity Dublin, Bocconi, Toronto" (L2465; L809) | The 383-row list (L1816-2199) has neither | A | no (file not in the diff) | 2026–27 profile PDF and live /fs/pages/2728: neither name. The 2026 research record (L575, L580) lists both as "only in the 2025–26 Academic Profile's 2022–2025 list" | Drop both names at both sites. Restoring them under the merge-never-replace rule is the alternative, and that is the user's call. |
| PD-T2 | PD | Financial Aid › Merit and Questions vs Beyond Tuition | "No indexed or variable tuition · no sibling, clergy, military or first-responder discount" (L3397; `financialAidReports.ts` L1861); "Q10 Do you offer a sibling, employee, clergy, military or first-responder accommodation?" (L3438; L1939) | "Bus transportation · $1,830–$1,965 round trip per student, 2026–27 (siblings $1,379–$1,507)" (L3328; L1716) | C | **yes**: the diff added the sibling fares and left both sentences | providenceday.org/around-campus/transportation: "1st Child: $1,830 Siblings: $1,379" | "no sibling tuition discount (the bus has lower sibling fares)". Q10 → "a sibling, employee, … tuition accommodation". Cannon's report already does this (Cannon L2784). |
| PD-T3 | PD (CCD also) | Financial Aid › card header vs its figures | "2026–27 school year · figures as of 24 Jul 2026" (L3297, L3299; `financialAidReports.ts` L1654) | The bus row is a 22 Nov 2026 figure (L3328; sources L1737 "2026–27 bus fares retrieved 22 Nov 2026") | C | **yes** for PD: the diff added the later figure. CCD "as of 23 Jul 2026" (L3161) with a 20 Nov enrichment fee is older | Source lines in the data; fares re-read today | "figures as of 24 Jul 2026; bus fares 22 Nov 2026". CCD likewise for enrichment. Check any other report round 3 gave a 22 Nov figure (Latin, Hickory Grove). |
| PD-T4 | PD | Financial Aid › Beyond Tuition vs After School | "Sixteen confirmed components … 9 unpriced", with "Clubhouse registration · $100" but no Extended Day registration (L3322-3339; L1708) | "Extended Day annual registration $80 / student" (L2592) | A | no (the omission predates it) | Extended Day fee document, live: "Annual Registration Fee: $80" | Add it as priced: seventeen items, eight priced, nine unpriced, 53%. R11 cannot see an omitted row. |
| PD-T5 | PD | After School › checklist vs Cost Planner | "Which platform actually bills Extended Day — Blackbaud, Clarity, or Smart Tuition?" (L2726; `afterSchoolPrograms/providence-day.ts` L471) | "billed via Blackbaud" (L2521); "Billed monthly via Blackbaud Tuition Management" (L2597) | A | no | Live fee document: "charged and collected via Blackbaud Tuition Management". The live tuition page uses Clarity only for aid assessment | Drop the ask and narrow the dev flag (L220). |
| PD-T6 | PD | After School › Verdict vs Cost Planner | "so a family can compute its exact annual cost before applying" (L2708; L445) | "so an annual total cannot be computed exactly" (L2598; L212) | A | no | Internal. The fee document gives no month count | "so a family can compute its exact monthly cost before applying". |
| PD-T7 | PD | After School › enrichment subhead vs rows | "All classes run 10 sessions; TK/K classes are $200 and grades 1–5 are $220" (L2620; L283) | "Karate · TK–5th · $220" (L2680-2682) and "YoLa · TK–2nd · $200" (L2648-2652) | A | no | Committed Fall 2026 packet PDF: Karate (TK, K, 1–5) "Fee: $220"; Yola (TK, K, 1–2) "Fee: $200" | "Most TK/K classes are $200 and most grades 1–5 classes $220. Karate is $220 and YoLa $200 for every grade they take." |
| PD-T8 | PD | Summer › Junior Masters Chess | "Offered in seven of the nine sessions — $255 in the four-day weeks, $315 otherwise." (L3200; `summer/providence-day.ts` L892) | When: "S4, S6, S7, S8, S9", five sessions (L3203; L901) | A | no | 2026 brochure, fetched: $255 and $315 rows. Record L179-180: S3, S5 and S4, S6, S7, S8, S9 | weeks → 'S3, S4, S5, S6, S7, S8, S9'. **R10 missed it:** it matches "N weeks", not "N sessions". Widen it. |
| PD-T9 | PD | Summer › two S5 rows vs the four-day rule | Battle Bot "Mon–Fri · S5 · $360", desc "priced $360 in the four-day session" (L2934-2940); Playlax Lite "Mon–Fri · S5 · $445", desc "The four-day-week lacrosse camp." (L3039-3046) | "Two of them are four-day weeks (no camps June 19 or July 3)" (L2742); other S3 and S5 rows read "4 days" | A | no | Record: both are S5 rows. Brochure: "no camps June 19 and July 3" | dayLabel → '4 days' on both. |
| PD-T10 | PD | College Support › checklist vs Whole Class | "Your profile shows the fifth quintile averaging a 1116 SAT … Where did those ~36 students actually enroll last year?" (L2477; `collegeSupportPrograms/providence-day.ts` L937) | The quintiles are the Class of 2027, "179 seniors, August 2026" (L2335, L2350), who have not enrolled | A | no | Profile: "Quintile distribution of the Class of 2027 — (179 seniors) as of August 2026" | "Your profile shows this year's fifth quintile at … Where did last year's fifth quintile enroll?" |
| PD-T11 | PD | College Support › Whole Class vs its own gap box | "So students in the fourth and fifth quintiles really are enrolling, not just appearing on the list." (L2356; L881); "The list matches the school's actual quintile spread." (L2473) | "never says where the middle and bottom fifths actually enroll" (L2359) | A | no | The profile prints no outcome by fifth | "So graduates really are enrolling at less selective colleges too. The profile does not say which fifths they come from." Fix L2473 likewise. |
| PD-T12 | PD | Clubs › Honor Societies vs Club Catalog | "Five selective societies spanning scholarship, service, visual art, music and French." (L1111-1112; `clubsPrograms/providence-day.ts` L165) | "Computer Science Honors Society · Recognition society for computer science" (L918; `clubCatalog.ts` L163) | A | no | Committed official 2025–26 list PDF: "Computer Science Honors · STEM / Honor · Recognition society for computer science" | "Six …", plus a row, and the gap note's "other four". Check dependents (`honor-societies`). |
| PD-T13 | PD | Clubs › Affinity card vs Club Catalog | "Nine Upper School affinity groups", including "Multiracial Affinity Group" (L1059-1074; L53) | Catalog "Affinity · 9" from the 2025–26 list has Diabuddies and no Multiracial group (L1012-1029) | C | no | Clubs Redesign record L46 (older DEI page) vs the 2025–26 list PDF | "Nine …, as the school's earlier DEI pages listed them. The 2025–26 club list names a slightly different nine." |
| PD-T14 | PD | The Arts › checklist vs ensemble board | "is there a non-auditioned choral home for them through senior year?" (L1299; `artsPrograms/providence-day.ts` L356) | "Curricular — join by enrolling: Band, Orchestra, Chorus" (L1240-1243); Chorus, no audition (L546) | A | no (the board listed Chorus before) | 2026–27 Course of Study record: Chorus has no audition line | Drop the ask, or "Can a student stay in the non-auditioned Chorus all four years?" |
| PD-T15 | PD | The Arts › checklist vs Blumey ledger | "Caroline Bower led the 2015–2017 award-winning run" (L1299; L357) | "exactly one outright win is verifiable: Best Supporting Actor, 2022" (L1235); 2015–17 rows hold placements only | A | no | Arts record L218-220: placements. "award-winning" is the record's own wording (L553) | "led the 2015–2017 run of Blumey placements". |
| PD-T16 | PD | College Support vs Course Offerings (course name) | "Advanced Structures in Java" (L2389; L579) | "Advanced Data Structures in Java" (L454) | C | no | Profile PDF prints "Advanced Structures in Java (post-AP)". The 2026–27 Course of Study record prints "Advanced Data Structures in Java (Advanced)" | Use the catalog name: "Advanced Data Structures in Java (the profile shortens it to Advanced Structures)". |
| PD-T17 | PD | Global Exposure › Signing Up | Registration opens and Info Session "Middle & Upper School · grades 6–12" (L751, L755; `internationalTravel/providence-day.ts` L566, L572) | The deadline for that registration "grades 6–11" (L758); the four trips take grades 6–8 and 9–11 (L747) | C | no | providenceday.org/switzerland-2026-ms: "Open To: Current 6-8 grade students". The calendar record holds titles and times, no grades | Use "grades 6–11" on both, or drop the grades from the two calendar rows. |
| PD-T18 | PD | Compare › Summer (`summer-care-span` qual) | "An eleven-hour span, the widest of the five" (`metricValues.ts` L2275) | The row has seven schools with a value | A | no | Internal count of the row's non-null values | "the widest on this row", or drop the superlative. Same stale "five" as CAN-T7. |
| CCD-T1 | CCD | Financial Aid › Beyond Tuition, Q3 | "Bus transportation · no rate" (L3198; `financialAidReports.ts` L236); "Ten confirmed cost components — 4 unpriced … 40% unpriced > 33% threshold" (L3191; `financialAidReports.ts` L227); Q3 (L3261) | The school publishes 2026–27 fares (the PD bus finding, at CCD) | A (live drift) | no | charlottecountryday.org/bucsnet/bus: round trip $1,670 / $1,785, one way $955 / $1005, shuttle $715 / $400 | Price the row and remove bus from Q3 and from "All four unpriced items". That gives 3 unpriced, 30%, **under the report's 33% bar**, so the user must decide whether to build the all-in estimate (UX-GATE) or restate the rule (three items are range-only). |
| CCD-T2 | CCD | Financial Aid vs Learning Support | "Tutoring · no rate" (L3199; L237); "What are the dollar rates for … tutoring" (L3261) | "$82 for 45 minutes in the Lower School, $85 a session in the Middle and Upper Schools", billed to the student's account (L741-745, L800-801) | A (section 9) | no | Lower School ERP page: "$82 per 45-minute session" and "tutoring notes". The ERP page calls its staff "hourly tutors". Quick Reference lists tutoring as an incidental charge and as an ERP service. The Upper School page sets coaching apart from tutoring | "Learning-support tutoring · $82 (LS) / $85 (MS) a session; Upper School coaching $85". With CCD-T1 that is 2 unpriced, 20%. Same threshold decision. |
| CCD-T3 | CCD | Financial Aid tiles, Compare, After School | "$9.4M" (L3074); "about 20% of students (341)" (L2446, L2483); Compare `pct-aid`, `aid-awarded` | Fast Facts now: $10.1 million to 347 students | B (live drift) | no | charlottecountryday.org/admissions/tuition-financial-aid: "341 students receive $9.4 million". /about/fast-facts: "$10.1 million financial aid awarded to 347 students", 1,745 enrolled 2026–27 | Keep the values and attribute: "the tuition page says $9.4M to 341 students; Fast Facts says $10.1M to 347" in both quals and the After School sentence. Add a verify flag and fold it into Q1. |
| CCD-T4 | CCD | Financial Aid › Q1 vs every share on the page | "is the share 20% or 21%, against which enrollment?" (L3259; L380) | Only ~20% appears on the page and on Compare | D | no | The deep-dive PDF says "approximately 21% on another page" and names no page. Today's tuition page and Fast Facts have no 21% | The user supplies the 21% page, or approves dropping "20% or 21%". |
| CCD-T5 | CCD | Financial Aid framing vs College Support | "The $13M in college scholarships from the School Profile" (L3166; L177) | "$14.7M scholarship offers, Class of 2026 ($13M for 2025)" (L1670) | C | no | Class of 2026 page: "$14.7 million+" | "The college scholarship totals in the School Profile ($13M for the Class of 2025) …". |
| CCD-T6 | CCD | After School › A Day Inside, Verdict | "each division's class begins exactly at its own dismissal bell" (L2449); "Enrichment starts at the dismissal bell for every division … no dead gap" (L2475; `afterSchoolPrograms/charlotte-country-day.ts` L275, L364) | MS dismisses 3:10 and its class is 3:20 (L2326, L2460); US dismisses 3:15 and its class is 3:45 (L2330-2331) | A | no | Quick Reference: 3:10 and 3:15. Program-directors page: "Grades 5–8 … 3:20–4:20 pm" | "JK, K and grades 1–4 classes start at dismissal. Middle School waits 10 minutes and Upper School 30." Fix both sites. |
| CCD-T7 | CCD | After School › Coverage Map | "five separate pickup tiers" (L2302) | The JK bar shows four: 2:00, 3:30, 4:30, 6:00 (L2307-2311; L37-42). The 3:00 tier at $450 is only in the planner (L2360-2365) | A | no | Internal, the card's own 13-row rate card | Add `{ until: '3:00', price: '$450', endFrac: frac(15) }` to the JK row. |
| CCD-T8 | CCD | Compare › `latest-pickup` qual | "The Lower School's Structured Care program runs until 6:00 p.m." (`metricValues.ts` L1936) | "Extended Day covers JK through grade 8 to 6:00 p.m." (L2302) | A | no | After School page: "Extended Day , which provides structured care … until 6 pm". Extended Day page: "JK through grade 8" | "Extended Day serves JK through grade 8 until 6:00 p.m." Fix the L1904 comment. |
| CCD-T9 | CCD | College Support vs Learning Support | "delivered as hourly sessions before, during or after the school day" (L2159; `collegeSupportPrograms/charlotte-country-day.ts` L859) | "$82 per 45-minute session"; sessions "treated as class periods" during study halls, special areas or lunch (L743, L800, L806) | B | no | Public ERP page: "hourly tutors … before, during, or after the school day". Lower School ERP page: "$82 per 45-minute session", "permanent part of student schedules" | "The public ERP page describes hourly tutors before, during or after the day; the division pages describe scheduled sessions (45 minutes in Lower School)." Add a verify flag. |
| CCD-T10 | CCD | Learning Support › Services, Eligibility row | "reviewed every three years in Lower and Middle School and every four in Upper School" (L821; `learningSupport/charlotte-country-day.ts` L233) | "But the linked policy says three years through grade 5 and four from grade 6." (L776; ask L919) | B (restatement without attribution) | no | Accommodations page and linked policy re-read: both wordings as recorded | "The accommodations page says … ; the linked policy says four years from grade 6." |
| CCD-T11 | CCD | College Support › Whole Class, tiles and Compare (SAT, ACT) | "SAT score percentiles — Class of 2027" (L2115, L2131; L828, L837); Compare subs "(Class of 2027)" | "restores it without naming the class" (L2129); "does not say which class it covers" (L2167); the ask (L2291); the quals | C | no | 2026–27 profile: "Middle 50% SAT 1170-1400" beside the quintile table, no class | Hints → "— 2026–27 profile, class not named"; subs → "(2026–27 profile)". `ccdprofile` D11 chose the present hint, so the user may prefer to keep it. |
| CCD-T12 | CCD | Course Offerings, Compare vs College Support and Global Exposure | "23 AP + 18 IB" (L141); "23 AP courses" (L251); Honors Physics I offered (L342). The guide is 2025–26 (`courseOfferings.ts` `guideYear`) and the teaser gives no year | "26 AP + IB … 2026–27" (L2176); AP Physics 1 "replaced Honors Physics" and AP CSP joins (L2200-2201); "AP Comparative Government" (L695) | C | no | The curriculum page still links only the 2025–26 catalogue. The 2026–27 profile counts 26 | Teaser and Compare qual: "23 AP in the 2025–26 guide; the 2026–27 profile counts 26". **R4b missed it:** it compares the teaser with Compare only. |
| CCD-T13 | CCD | College Support vs Course Offerings | "There is still no post-AP CS course." (L2201; L574); asked again at L2291 | "Advanced Topics in Computer Science … requires AP Computer Science" (L482-483) | B | no | 2025–26 guide: "Prerequisites: AP Computer Science and project proposal". The 2026–27 profile's post-AP column has no CS course | "The profile lists no post-AP CS course; the 2025–26 guide has Advanced Topics in Computer Science after AP CS." Reword the ask to whether it still runs. |
| CCD-T14 | CCD (Catholic also) | College Support › buckets, Whole Class | "includes all three federal service academies" (L1681); "All three federal service academies appear" (L2166; L743, L881) | There are five. The same site says "Four of the five federal service academies" (PD L2358) | A | no | The list has Air Force, West Point and Naval, no Coast Guard or Merchant Marine | "three of the five federal service academies". **Cross-school:** Charlotte Catholic has the same wording (`collegeSupportPrograms/charlotte-catholic.ts` L565, L633; `metricValues.ts` L683, L697). |
| CCD-T15 | CCD | College Support › Applicant's Edge | "In a recent year 136 seniors were placed" (L2269; L789) | "136 of ~141 seniors took part, which suggests nearly every senior does it" (L2273; L795), using the Class of 2026 size | D | no | The 136 is not on today's Beyond the Classroom page or in the 2025–26 profile's text. Its year is unknown | The user supplies the year, or approves dropping "of ~141" and the inference. |
| CCD-T16 | CCD | College Support › GPA note | "the top-quintile mean rose from 4.198 to 4.540 while the bottom-quintile floor fell from 2.546 to 2.076" (L2157; L855) | First fifth 4.516 in the table above (L2148) | C | no | CCD College Support record L1000-1020: means and ranges, Class of 2016 → Class of 2025. The table is Class of 2027 medians | "From the Class of 2016 to the Class of 2025, the top-quintile mean rose …". |
| CCD-T17 | CCD | Sports › Sports Offered | "supports the broadest participation rate in the Charlotte private-school field", with ~85% (L1211; `sportsPrograms/charlotte-country-day.ts` L32) | Charlotte Latin ~90% of grades 7–12 and Davidson Day ~90% of grades 5–12 on their pages here | A | no | Internal: `sportsPrograms/charlotte-latin.ts` L31, `davidson-day.ts` L52 | Drop the clause: "A 130-person athletics staff supports the program." |
| CCD-T18 | CCD | The Arts › Studio to Gallery | "Nine studios and rooms across three campuses" (L1156; `artsPrograms/charlotte-country-day.ts` L281) | "Country Day runs two campuses: Cannon … and Bissell" (L1246) | A | no | Arts pages: "Cannon Campus", "Bissell Campus", and three facilities | "Nine studios and rooms across three buildings on two campuses". |
| CCD-T19 | CCD | The Arts › checklist | "You have been nominated every year since 2022 but have not won since." (L1197; L363) | "Zero nominations" in 2026 (L1109); "every year from 2022 through 2025" (L1125) | A | no | Internal ledger | "You were nominated every year from 2022 to 2025 without a win after 2022." |
| CCD-T20 | CCD | Global Exposure › Ask the School | "What global and language curriculum runs before Middle School, and is there a published language sequence from JK to 12?", under "not published on the school's site" (L733-735; `internationalTravel/charlotte-country-day.ts` L766) | French and Spanish from JK and a 3rd-grade global unit (L691-692); the choice in grade 2 (L160); MS and US sequences (L214-218, L393-420) | A (section 9) | no | Lower School curriculum page: "modern languages (French and Spanish)" | Drop it (eleven → ten in the headline), or ask only for a single JK–12 sequence document. |
| CCD-T21 | CCD | Clubs › Catalog vs Global Exposure | Seven named clubs, "Showing 7 of 7", "The catalog card lists only confirmed organizations" (L945, L1010); Compare "Only 7 are confirmed by name in public sources" | "Interact Club, the International Studies Board, World Quest and Euro Challenge in Upper School" (L678) | A | no | /cd-education/international-studies names those four | Add the four to `clubCatalog.ts` (7 → 11) and fix the Compare qual and any named-club count. |
| CCD-T22 | CCD | Summer › Cost Planner | "Two of the school's own pages disagree on whether food is included at that price; see the flag below." (L3061; `summer/charlotte-country-day.ts` L1100) | No flag renders: it is `kind: 'verify'` (L1110) | B | no | /summer: "supervised lunch – bring your own lunch". /summer/camp-ready: "Lunch is provided in the dining hall" and also "Campers must bring their own packed lunch." | Show both, attributed, in that sentence and drop "see the flag below". Keep the dev flag and note that Camp Ready contradicts itself. |
| CCD-T23 | CCD | Summer age floor, page vs Compare | "ages 4–18" (L2333); tile "Age 4–Grade 12" (L2501) | Compare qual: "the after-school page says 3–18" (`summer-ages`) | B | no | /summer: "ages 4–18". /cd-experience/after-school: "children ages 3–18" | L2333 → "ages 4–18 (the after-school page says 3–18)". The flag is dev-only today. |
| CCD-T24 | CCD | Summer › Cost Planner | "The tiers below are the five-day rates." (L3021; L1027) | The first tier is "Half-day, four-day week · $230" (L3026-3028) | A | no (round 3 edited the sentence but kept this clause from the old text) | Internal | "Every other tier below is a five-day rate." |
| CAN-T1 | Cannon | Sports › College Pipeline headline | "Five current seniors already hold public Division I commitments: Princeton, Coastal Carolina, Ohio, Furman and Villanova." (L1153; `sportsPrograms/cannon.ts` L223) | Tile and Compare 6 (L853); six '27 rows, with Hudson Higbea to Brown (data L305, added in #451) | A | no | Internal roster | "Six … Villanova and Brown." **R1 missed it:** it reads only a number next to "commit", and excludes Class of 2027 rows. A `seniors-committed` prose rule would catch it. |
| CAN-T2 | Cannon | Sports › College Pipeline headline | "Basketball follows with a Miami signee and East Carolina and Elon commits." (L1153) | Four D1 basketball rows: also Maya McCorkle, East Tennessee State (bars L1161-1162) | A | no | Internal roster | "… Miami signee and East Carolina, Elon and East Tennessee State commits." |
| CAN-T3 | Cannon | Financial Aid › Beyond Tuition vs College Support | "Eleven confirmed components for a Grade 9 student — 4 unpriced … ~36%", including "AP exams · $98 per exam" (L2742-2754; `financialAidReports.ts` L450) | Freshmen are barred from AP/AT (L1796; "0 / 1 / 5 / 6", L1801) | A | no | 2026–27 fee PDF: the AP exam fee appears under 10th, 11th and 12th grade, not 9th | Remove the row: ten components, 4 unpriced, 40%. Rewrite "A narrow miss". R11 cannot know the grade. |
| CAN-T4 | Cannon | After School › gap box vs Financial Aid | "Yet the PDF prices everything else, down to a $98 AP exam." (L1952; `afterSchoolPrograms/cannon.ts` L166) | "the 2026–27 fee document lists cost categories with no dollar figures at all" for Lower School (L2754); four unpriced Upper School items | A | no | Fee PDF: dining, team packs, art supplies and all Lower School items have no amount | "Yet the PDF prices many other items, down to a $98 AP exam." |
| CAN-T5 | Cannon | Global Exposure › Ask vs Financial Aid | "What does a trip cost, and what does it include? No trip price is published." (L391; `internationalTravel/cannon.ts` L321) | "Winterm course · $0–500" (L2747). Winterm is where the trips run (L323) | C | no | Fee PDF: "Winterm course (based on student selection) $0-500". Winterm page: international trips, no price | "The fee list gives $0–500 for a Winterm course by selection, but no price for any trip abroad. What does a trip cost …?" |
| CAN-T6 | Cannon | After School › Verdict vs the class list | "22 distinct classes in a single session, from robotics, ballet and chess to pottery, golf and photography"; "mostly $144–$300 for a 10-week session" (L2089-2090; L284-285) | The 22 rows have no chess and no pottery. Their fees run $160–$300, and the Monday ones are eight classes | A | no | After School record: Chess ($18/$144) and Crazy Fun Clay Makers are Session 1 (fall 2025). The 22 are Session 3 | "… from robotics and ballet to sculpture, golf and photography"; "$18–$30 a class, $160–$300 for the session". |
| CAN-T7 | Cannon | Summer › Cost Planner | "the only deposit structure among these five programs" (L2697; `summer/cannon.ts` L1164) | The site covers more than five summer programs, and Trinity has a deposit | A | no | `summer/trinity-episcopal.ts` L1240 "Nonrefundable deposit, per camp" | Delete the clause. **Cross-school:** same stale "five" as PD-T18. |
| CAN-T8 | Cannon | Compare › `aftercare-cost` qual and row note | "the only school here not on 2026–27" (`metricValues.ts` L2028); "2026–27 rates, except Cannon's 2025–26" (L1985) | Gaston Day's cell is also a 2025–26 rate (L1996 comment "2025-26 fee schedule") | A | no | Internal | "at 2025–26 rates"; note "2026–27 rates, except Cannon's and Gaston Day's 2025–26". **Cross-school:** Gaston Day. |
| CAN-T9 | Cannon | Summer › gap box | "The only price break in the 2026 brochure is the structural one for the four-day Week 2." (L2704; L1173) | "$90 a week — the school's combination rate, $20 less than the two toggles" (L2700) | A | no | Internal. Both from the brochure record | "The only camp-tuition price break … (care has a $90 combination rate)." |
| CAN-T10 | Cannon | Summer › Jump Into Cannon | "offered to rising JK/K and to rising 1st–4th in different weeks" (L2240) | Grades "Rising JK & K" for "Weeks 5, 6, 7" (L2243-2244; `summer/cannon.ts` L256) | A | no | Camp Catalog record: week 5 JK&K (L239), week 7 1st–4th (L302). Week 6 is not in the sample | gradeLabel "Rising JK & K / Rising 1st–4th", plus the matching filter bands, as the two-band rows do. |
| CAN-T11 | Cannon | Course Offerings vs Global Exposure | "Spanish · Gr 1–4" (L48; `courseOfferings.ts` ~L3283) | "Spanish from Junior Kindergarten" (L354, L357, L387) | A | no | Admission FAQs: "Spanish instruction begins in Junior Kindergarten". The Kindergarten page has a Spanish section | Tag → "JrK–Gr 4". |
| CAN-T12 | Cannon | College Support, Course Offerings vs Global Exposure | "Global Education Certificate — the steps are fully spelled out … at least two of three global experiences" (L1868; `collegeSupportPrograms/cannon.ts` L696); also L302 | "Global Studies Certificate", under Mastery Credits since the Class of 2024, asking whether "the earlier rules" still apply (L363-372, L391) | B | no | International Programs page: the old steps, then "Starting with the Class of 2024, please refer to the Global Studies Mastery Credits requirements". The catalog and profile say "Global Education Certificate" | College Support: "Global Studies Certificate (the catalog and profile say Global Education Certificate). The program page still lists … but sends the Class of 2024 onward to the Mastery Credits." Add a verify flag. |
| CAN-T13 | Cannon | College Support vs Course Offerings (course names) | "AT: Design Thinking for Entrepreneurship" (L1808); "Honors Design Thinking & Entrepreneurship Lab" (L1869); "AT: American Language and Composition" (L1865) | The 2026–27 catalog list has "Advanced Topics: Business and Entrepreneurship with Personal Finance" (L297), "Advanced Topics: English Language and Composition" (L115) and no Design Thinking course | B | no | 2026–27 profile prints the first three names. The live curriculum page says "American Language and Literature". The catalog has the new names | Attribute ("the profile lists …; the 2026–27 catalog …"), choose a catalog course for the example, add a verify flag and extend the Compare qual. |
| CAN-T14 | Cannon | College Support vs Clubs | "It is the one thing nearly every senior does" (L1867; L695) | "every one completes it" (L613); "a capstone project that every senior completes" (L606) | A | no | Clubs record L87: "universal to seniors". Curriculum page lists Senior Capstone as a Signature Learning Experience | "It is the one thing every senior does". |
| CAN-T15 | Cannon | Clubs › Honor Societies, Compare `us-organizations` | "Twelve honor societies" (L626-627; `clubsPrograms/cannon.ts` L137); dev flag L222: "No … Science National Honor Society chapter is published" | The school announced an SNHS chapter. Our own College Support record L588 already holds it | B (live drift) | no | School news post, live: "its first-ever chapter of the Science National Honor Society", 21 founding members on April 2. The Upper School roster does not list it | "Twelve on the school's roster and profile; a school news post also announces a Science NHS chapter (2026)." Correct the flag. Whether Compare's "8 + 12" becomes 8 + 13 is the user's call. Name no students. |
| CAN-T16 | Cannon | College Support › load ceiling | "0 / 1 / 5 / 6" and "a hard, published limit", "caps a transcript at twelve" (L1796, L1801, L1880; L527) | The catalog behind this page's Course Offerings allows sophomores two | B (live drift) | no | 2026–27 catalog: "Sophomores can enroll in no more than two AP/AT courses." Profile record L77: "10th: 1" | Attribute both ("the profile says one in 10th; the catalog allows two"), soften "hard" and "twelve", add a verify flag and an ask. |
| CAN-T17 | Cannon | After School › stale note | "No 2026-27 Beyond the Bell catalog has been posted yet" (L2079) | The live page now embeds a "Session 2 Brochure" and gives Aug 16 and Aug 31 start dates | D | no | The Beyond the Bell page (200). Issuu refused the brochure (403), so its year is unknown | The user opens the brochure. If it is 2026–27, refresh the catalog and the STALE note. |

## Part 3: R8 triage

No group for these schools is new since the previous report. The one change is that Providence Day "ensembles 6 vs 4" closed with PD-S1.

- **Cannon · students 300/195/40/3/9:** settled, unchanged.
- **Cannon · seniors 105/26:** settled, unchanged.
- **CCD · teams 72/55:** settled, unchanged.
- **CCD · institutions 1/150:** settled, unchanged.
- **CCD · seniors 27/32/141:** settled, unchanged.
- **CCD · students 12/15/10/20/17/1:** settled, unchanged.
- **PD · teams 66/56:** settled, unchanged.
- **PD · institutions 13/8/150/383/249:** settled, unchanged.
- **PD · seniors 36/1/179:** settled, unchanged.
- **PD · students (497 … 1):** not a conflict. Same members as the prior report. The non-trip members (497 testers, 36 per fifth, 100+ honors, 30, 375 graduates, the course "1") are different facts. The checklist behind the 36 is PD-T10, a wording error about the cohort.

R8 could not see CAN-T1 ("Five" is a word) or PD-T8 ("sessions" carries no conflicting count).

## Checked and consistent

- **Round 3 edits and their restatements:** PD ensembles (tile, teaser, board, rung 02, Compare, Course Offerings, arts grid), PD Round Square wording at three sites, PD exchange lengths, all nine PD bus fare rows, CCD short-week prices at nine sites, CCD coaches model and ask, Cannon's three priced short-week rows.
- **Rosters and funnels:** PD 86/39/16/10 with 9 ACC, 4 Big Ten, 3 SEC, and 31 and 13 in 2026. CCD 48/28/9/0 with 13 in 2026 and five Ivy. Cannon 23/12/4/6. All bars recount, and all win percentages and records recompute.
- **Cup prose:** season splits, gaps and title counts recompute for all three.
- **Admit-rate cards:** pooled sums 499/977, 328/702 and 479/788, and all 18 five-year rates. Cannon's "largest admit rates" tag on UNC Charlotte follows `check:ncsuper`'s documented tie rule, so it is not reported.
- **Acceptance lists:** every college that prose calls enrolling is bold. PD 383/182, CCD 363/69, Cannon 352/58. CCD's four enrolling HBCUs and no enrolling Ivy agree.
- **List recounts:** PD courses 16, 53, 30 AP, 38 language, 11 departments. CCD 9 math tracks, 23 AP, 18 IB. Cannon 14 AP, 13 AT, 24 arts, 11 music. PD clubs 77 and 16, CCD affinity 15, Cannon 15 orgs and 12 societies. Learning Support 40 and 12 staff, 13 and 8 questions, every "N published · M not stated" header. Global Exposure trips 19/20/5 and ask counts 8/11/11.
- **Arithmetic:** tuition runs, year-over-year tables, Cannon aid trend, summer planners, care bundles, after-care annual figures and 40/13/5-cell rate tables against their bars (except CCD-T7).
- **Admissions vs Financial Aid (PD, CCD):** dates, deposits and the Clarity fee agree by cycle.
- **Compare:** every value and qual for the three schools, except PD-T18, CCD-T8, CCD-T11, CCD-T12 and CAN-T8.

Seen, not counted: CCD's Student Life page still says "7 Affinity Groups" against the nine we enumerate. The clubs record already holds that split and no second value is printed on the page.

## Files touched

Output file: this file. Under `source-material/`, 18 records got a `### Re-verification 2026-11-22 (plan consistency4, self-scan)` block. (+) means the file had no `## Method`, so one was added at the end. Nothing was run through ingest.

- `financial-aid-tuition/providence-day/Providence Day - Financial Aid and Tuition - Transportation 2026-27.md`
- `after-school/providence-day/Providence Day - After School - Redesign Research 2026.md` (+)
- `college-support/providence-day/Providence Day - College Support - School Profile 2026-2027.md`
- `international-travel/providence-day/Providence Day - International Travel - Source URLs.md` (+)
- `summer-programs/providence-day/Providence Day - Summer Programs - Camp Catalog.md` (+)
- `financial-aid-tuition/charlotte-country-day/Charlotte Country Day - Financial Aid and Tuition - Tuition History.md`
- `learning-support/charlotte-country-day/Charlotte Country Day - Learning Support - Official Site Research.md`
- `summer-programs/charlotte-country-day/CCD - Summer Programs - Camp Catalog.md`
- `course-offerings/charlotte-country-day/Charlotte Country Day - Course Offerings - Curriculum Guide.md`
- `after-school/charlotte-country-day/CCD - After School - Redesign Research 2026.md`
- `college-support/charlotte-country-day/CCD - College Support - School Profile 2026-2027.md`
- `international-travel/charlotte-country-day/Charlotte Country Day - International Travel - Source URLs.md`
- `the-arts/charlotte-country-day/CCD - The Arts - Music Ensembles Web Check 2026.md` (+)
- `financial-aid-tuition/cannon/Cannon - Financial Aid and Tuition - Tuition History.md` (+; also gained its missing final newline)
- `student-clubs/cannon/Cannon - Clubs - Honor Societies Web Check 2026.md`
- `college-support/cannon/Cannon School - College Support - School Profile 2026-2027.md` (+)
- `after-school/cannon/Cannon - After School - Redesign Research 2026.md` (+)
- `international-travel/cannon/Cannon School - International Travel - Source URLs.md` (+)

## Settled, skipped

- **S1:** PD L1776 and L1806, CCD L1648 and L1680, Cannon L1284 and L1316 ("75 / 75").
- **S4:** Cannon L2111 and L2117 (251, unchanged).
- **S7:** CCD L3221-3228 (ladder unchanged on the page and live).
- **R8 table:** Cannon students and seniors; CCD teams, institutions, seniors and students; PD teams, institutions and seniors. The PD students note was also seen.
- **Turned-down rule:** no short-week price rule is re-proposed. PD-T8's suggestion only widens R10's noun to "sessions".
