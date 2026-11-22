# Re-scan #4 (plan consistency5): Charlotte Christian · Charlotte Catholic · Covenant Day · Carmel Christian (2026-11-22, main 5d26847a)

Pages are `scan5/pages/<slug>.txt`, quoted as `L<n>`. Data lines are on 5d26847a. "Today" means fetched 2026-11-22. `git diff 13551180 5d26847a` is what round 4 changed. "Saved list" means a Blumenthal file the round-4 scan saved locally under `scan4/w-cc-cchs-cov-carmel/dl/` or `scan4/w-latin/`. blumenthalarts.org was not requested.

## Part 1: regression check of round 4

Every row of the previous worklist's two tables is below (63 in its Part 1, 56 in its Part 2), plus the cross-school rows X1 and X8 of `findings.md`. X2, X3, X4, X5, X6 and X9 share a row with their member finding.

**Counts (121 unique rows): RESOLVED 116 · PARTIAL / REGRESSED 1 (COV-T15) · NOT RESOLVED 0 · UNCHANGED BY DECISION 4.**

How each was checked: the four dumps were read in full, the older rows' line numbers were mapped from scan4's dumps by diff, the old strings were searched in today's dumps, and the Compare values, subs and quals were printed from `metricValues.ts`.

### Not resolved, partial, or left by decision

| id | status | caused by round 4? | where | note |
|---|---|---|---|---|
| COV-T15 | **PARTIAL / REGRESSED** | **yes**: at 13551180 the catalog listed the camp, so this qual agreed with it. Round 4 removed the row and left the qual. | Compare `summer-ages` qual, `metricValues.ts:2247`: "through high-school **strength-and-conditioning** and college-admissions camps"; value comment `:2208` "HS strength & college camps"; record `Covenant Day School - Summer Programs - Redesign Research 2026.md:47` | The catalog (L1658-1663), tile (L1652) and Compare `summer-camps` say 19 without it. https://www.covenantday.org/campus-life/summercamps today has "Strength & Conditioning" only in the Athletics menu. Fix: "…through the high-school College Admissions camp." The span JK–Grade 12 still holds. No rule reads a qual against camp names. |
| CC-9 qual residue | UNCHANGED BY DECISION | no | Compare `summer-camps` CC qual "roughly 96 distinct camps" | consistency2 Decisions. |
| CC-R3 | UNCHANGED BY DECISION | no | L817, L819-820 | Settled S5. Values unchanged. |
| CAR-R2 | UNCHANGED BY DECISION | no | L1314, L1374; Compare `aftercare-cost` | Settled S6. Values unchanged. |
| CAR-T8 | UNCHANGED BY DECISION | no | carmel-christian L96-99, L102-105; 96 at L23, L29 | Held by the user until the source can be opened. carmelchristian.org is refused today. Still D. |

### Resolved: the rows of the previous Part 1

| id | status | where | note |
|---|---|---|---|
| X1 CCHS (1, 1b) | RESOLVED | charlotte-catholic L1398, L1401-1410 | Bars sum to 39. |
| X1 Covenant (1, 1b) | RESOLVED | covenant-day L986, L989-997 | Bars sum to 10. |
| X4 CC (1, 1b) | RESOLVED | L153, L243 | 143, shown as 129. |
| X4 Carmel (1, 1b) | RESOLVED | L23, L29 | 96 (77 titles). |
| X4 CCHS (1b) | RESOLVED | L23, L29 | 199. |
| X4 Covenant (1b) | RESOLVED | L128, L134 | Now 89. Rows recount to 89. |
| X6 CC (1, 1b) | RESOLVED | L2915, L2983-2988 | |
| X7 (1b) | RESOLVED | L2081; Compare | 9 billing months. |
| LAT-2 CC side (1, 1b) | RESOLVED | L1488, L1518 | 55 / 68. |
| CC-4 (1, 1b) | RESOLVED | L153, L243; Compare | |
| CC-5 (1, 1b) | RESOLVED | L155, L243, L1999 | 21 on the list, 22 titles recounted. |
| CC-6 (1, 1b) | RESOLVED | L708, L710, L921, L923 | |
| CC-7 (1, 1b) | RESOLVED | L507, L841, L1973-1974 | |
| CC-9 (1, 1b) | RESOLVED | L2116, L2144 | 96 camps. |
| CC-10 (1, 1b) | RESOLVED | L815, L817 | 38. |
| CC-11 (1, 1b) | RESOLVED | L159 | |
| CC-27 (1, 1b) | RESOLVED | L1087 | |
| CC-29 (1, 1b) | RESOLVED | L1494, L1929-1930 | |
| CC-R1 | RESOLVED | L911-912, L920, L995, L1035 | |
| CC-R2 | RESOLVED | L905; Compare | |
| CC-R4 | RESOLVED | L2081; Compare | |
| CCHS-12 (1, 1b) | RESOLVED | L2065, L2079-2082; Compare | |
| CCHS-13 (1, 1b) | RESOLVED | L1328-1332 | |
| CCHS-14 (1, 1b) | RESOLVED | L891, L1993 | |
| CCHS-15 (1, 1b) | RESOLVED | L1881 | 13 recounted. |
| CCHS-16 (1, 1b) | RESOLVED | L1551, L1575, L2009 | |
| CCHS-17 (1, 1b) | RESOLVED | L440-441, L561, L574-580 | |
| CCHS-31 (1, 1b) | RESOLVED | L794, L1066, L1395, L1938-1939 | |
| R8 residue CCHS ~195 | RESOLVED | L1938 | ~222. |
| CCHS-R1 | RESOLVED | L1431 | |
| COV-23 (1, 1b) | RESOLVED | L1628 | $4,464. |
| COV-24 (1, 1b) | RESOLVED | L572-573 | |
| COV-25 (1, 1b) | RESOLVED | covenant-day L572; carmel-christian L433 | |
| COV-27 (1, 1b) | RESOLVED | L710-713, L721, L730, L735 | 18 rows, 43 chips recounted. |
| COV-2b (1, 1b) | RESOLVED | L999 | Ten sports recounted. |
| COV-R1 | RESOLVED | L1482-1483, L1545 | |
| CAR-3 (1, 1b) | RESOLVED | L23, L29; Compare qual | |
| CAR-18 (1, 1b) | RESOLVED | L897-898 | 30. |
| CAR-19 (1, 1b) | RESOLVED | L895-896 | 1 of 8. |
| CAR-20 (1, 1b) | RESOLVED | L862-863 | 4. |
| CAR-21 (1, 1b) | RESOLVED | L437-438 | |
| CAR-22 (1, 1b) | RESOLVED | L429 | |
| CAR-26 (1, 1b) | RESOLVED | L541-546 | 29 chips recounted. |
| CAR-28 (1, 1b) | RESOLVED | L1217, L1225, L1229 | |
| CAR-30 (1, 1b) | RESOLVED | L778-780 | |
| CAR-R1 | RESOLVED | L392-393 | |
| CC-S1 | RESOLVED | L2143; L2031, L2827 | |
| CC-S2 | RESOLVED | L1999 | |
| CC-S3 | RESOLVED (qual only, by decision) | Compare `advanced-arts-coursework` qual | |
| COV-S1 | RESOLVED | L1031-1033 | |
| COV-S2 | RESOLVED | Compare `advanced-arts-coursework` qual | |
| CAR-S1 | RESOLVED | L542 | Agrees with the chips at L555-567. |
| FA links, CC | RESOLVED | `financialAidReports.ts` CC sources | Links still in the data. Only the tuition page was re-requested. |
| FA links, CCHS | RESOLVED | CCHS sources | The MACS page answers 200 today. |
| FA links, Covenant | RESOLVED | Covenant sources | The 2026-27 Terms and packet are linked. The tuition page answers 200. |
| FA links, Carmel | RESOLVED as built | Carmel sources | Not requested (refused host). |
| Close-out bug: Latin's FAQ on Covenant's report | RESOLVED | Covenant sources | |
| Title key `the-arts.ladder@charlotte-catholic` | RESOLVED | `src/locales/*.json` | In all ten catalogs. |
| Title key `admissions.guide@charlotte-christian` | RESOLVED | `src/locales/*.json` | In all ten catalogs. |
| es "El director" for the Covenant director | RESOLVED | `sports.es.json` | The one remaining "El director" is Charlotte Christian's head of school. |

### Resolved: the rows of the previous Part 2, and the cross-school rows

| id | status | where | note |
|---|---|---|---|
| CC-T1 | RESOLVED | L74, L2929-2930 | The live page still states the rule. |
| CC-T2 | RESOLVED | L74, L2927 | Nov 2. Live page agrees. |
| CC-T3 | RESOLVED | L948-950, L963, L1033, L1040 | The 2023 omission is CC-U5. |
| CC-T4 (X2) | RESOLVED | L934, L953, L1033; CCHS L941; Carmel L454 | No "sweep" or "whole-cast" inference left. |
| CC-T5 | RESOLVED | L1887 | 3.803. |
| CC-T6 | RESOLVED | L2086-2087, L2110, L2127 | |
| CC-T7 | RESOLVED | L2011, L2032, L2107, L2111 | 55 + 55 recomputed. |
| CC-T8 | RESOLVED | L926, L990, L993 | |
| CC-T9 | RESOLVED | L1004, L1028 | |
| CC-T10 | RESOLVED | L926, L942 | |
| CC-T11 | RESOLVED | L831 | |
| CC-T12 | RESOLVED | L855 | |
| CC-T13 | RESOLVED | L2181, L2279 | |
| CC-T14 | RESOLVED | L2181, L2307, L2349, L2384 | All eight multi-week rows in Week 3 state the price. |
| CC-T15 (X5) | RESOLVED | Compare `latest-pickup` qual | |
| CC-T16 (X3) | RESOLVED (user rule, S8) | CC L1048, L1349-1354, L1365; CCHS L1399, L1426; Compare | 11 and 15. |
| CCHS-T1 | RESOLVED | L2090, L2134, L2149, L2159 | Both values attributed. The web page still says $150. |
| CCHS-T2 | RESOLVED | L2087 | $23,827. |
| CCHS-T3 | RESOLVED | L2103, L2111, L2131, L2139, L2144, L2149-2150 | |
| CCHS-T4 | RESOLVED | L2122-2123 | No shares. |
| CCHS-T5 | RESOLVED | L432, L472, L587 | |
| CCHS-T6 (X6) | RESOLVED | L1567, L1999; Compare qual | |
| CCHS-T7 | RESOLVED | L940-984; Compare qual | The research record's body still has the superseded "4 nominees + 1 finalist" table (`…Program Facilities and Recognition 2026.md:115-123`). It renders on no page; the Method note supersedes it. |
| CCHS-T8 | RESOLVED | L1014 | |
| CCHS-T9 | RESOLVED | L1011 | |
| CCHS-T10 | RESOLVED | L1414 | Four recounted. |
| CCHS-T11 | RESOLVED | L1326-1327 | |
| CCHS-T12 | RESOLVED | L1382 | |
| CCHS-T13 | RESOLVED | L2014 | 67. |
| CCHS-T14 | RESOLVED | L1553, L1888 | |
| CCHS-T15 (X9) | RESOLVED | Compare `pct-aid`, `aid-awarded` notes | Six and seven nulls recounted. |
| COV-T1 | RESOLVED | L66 | |
| COV-T2 | RESOLVED | L1862-1867, L1921 | |
| COV-T3 | RESOLVED | L1827, L1918 | |
| COV-T4 | RESOLVED (user: follow the list) | L128, L134, L220, L276, L304, L1529; Compare | 89 recounted, 86 + 3. |
| COV-T5 | RESOLVED | L1457-1458 | 74% on today's profile. |
| COV-T6 | RESOLVED | L230, L1477 | 3.5 on today's profile. |
| COV-T7 | RESOLVED | L1123 | |
| COV-T8 | RESOLVED | L462, L501, L583, L653, L697; Compare qual | |
| COV-T9 | RESOLVED | L587, L608 | |
| COV-T10 | RESOLVED | L1549 | |
| COV-T11 | RESOLVED | L632-634 | No WIN chip. |
| COV-T12 | RESOLVED | L1032 | |
| COV-T13 | RESOLVED | L1545 | |
| COV-T14 | RESOLVED | L1461 | "AP results". |
| CAR-T1 | RESOLVED | L454, L469, L524 | Six recounted. |
| CAR-T2 | RESOLVED | L475, L524 | |
| CAR-T3 | RESOLVED | L470-472, L523 | The 2023 omission is CAR-U1. |
| CAR-T4 (X4) | RESOLVED | L1722 | $45. The short-week tiers carry `daysPerWeek`. |
| CAR-T5 | RESOLVED | L1399 | |
| CAR-T6 | RESOLVED | L494 | Built from the record, by the user's word. |
| CAR-T7 | RESOLVED | L369, L372, L386, L390 | |
| CAR-T9 | RESOLVED | L776 | |
| CAR-T10 | RESOLVED | Compare `ap-performance` note | |
| X1 (Covenant, Carmel) | RESOLVED | covenant-day L1873; carmel-christian L1778 | "Not published". |
| X8 (shared after-care note) | RESOLVED for these schools | Compare `aftercare-cost` | CC, Covenant and Carmel cells are 2026–27, as the note says. |

## Part 2: new findings

**19 findings: CC 6 · CCHS 3 · Covenant 4 · Carmel 6. A 15 · B 2 · C 2 · D 0.** Two are partly caused by round 4 (CC-U3, CAR-U1). For each "no", the conflicting text has the same count in `git grep` at 13551180 and at 5d26847a, or (CCHS-U2) the claim does.

Highest impact: CC-U1 (a Division I count and Compare cell), CCHS-U1 (tuition), COV-U1 (aid eligibility), CC-U3 (stale season), CCHS-U3 (camp ages).

| id | school | section(s) | value A (where: file:line, page L) | value B (where) | category | caused by round 4? | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|---|
| CC-U1 | Charlotte Christian | Sports › Pipeline; tile; Compare `d1-commits-2426` | "'25Stokes GreeneGolfQueens (Charlotte)**SAC——D2**" (`sportsPrograms/charlotte-christian.ts:286`, L1379) | The same roster: "'26Morgan BanksSoftballQueens (Charlotte)**ASUN——D1**" (L1379). The other six Queens rows on the site, Class of 2024, 2025 and 2026 (Catholic, Covenant, Carmel, Latin, Country Day), are all ASUN D1. | A | no: same row at 13551180 | https://queensathletics.com/sports/mens-golf/roster lists the player, "So."; https://queensathletics.com/sports/mens-golf/schedule/2025-26 carries the "ASUN Conference Championship". | Row → `conf: 'ASUN', level: 'D1'`. Then D1 35 → **36**: headline `:221` (L1349-1350), tile L1049, funnel L1353, "At 73%" `:242` → 75% (L1355), "Other" bar 4 → 5, Compare `metricValues.ts:2395`, record table line 106. R1 misses it: it recounts the typed `level`. Rule candidate: one college, sport basis and class year gives one level across rosters. |
| CC-U2 | Charlotte Christian | FA › Fees and Additional Costs | "Fifteen confirmed components — all 15 priced" (`financialAidReports.ts:700`, L2900), listing only "Bridge care JK–K · $125/mo" (`:713`, L2911) and no aid fee | The same page: "The Clarity application carries its own **$65 fee**" (L74) and "Gr 1–4 · Bridge 2:40–3:35 · $125" (L2063-2068) | A | no | https://www.charlottechristian.com/admissions/tuition: "The application fee is $65." The Extended Day packet, fetched today, still lists "Grades 1-4 Bridge Care" at $125. Covenant's and Catholic's grids both list their aid fee. | Add "Clarity aid application fee · $65" and relabel the bridge row "Bridge care, JK–4 · $125/mo". Title → "Sixteen confirmed components — all 16 priced". Rows in an existing grid, so data only. R11 checks only the title against the rows. |
| CC-U3 | Charlotte Christian | Arts › Ladder, Theatre season | "The 2025-26 season is themed "Pure Imagination," … But individual production titles were not published at time of research." (`artsPrograms/charlotte-christian.ts:111`, L930); same at `:139` (L938); "Published as an unordered set, without years" (`:145`, L941) | Today's box office publishes the 2026-27 season and titles. The same card's new ledger row names the 2025-26 musical: "2026 · Cinderella (Blumey)" (L948-949). | A (source moved) | **yes, in part**: the Cinderella row is new in round 4. The stale season is older. | https://www.charlottechristian.com/fine-arts/box-office: "We are excited to announce the 2026-27 mainstage musicals." "Called to Courage!" "Matilda Jr. - October 22-24", "The Little Mermaid - February 25-27", "Frozen KIDS - April 8-10". | Season row → 2026–27, "Called to Courage", with the three titles. Box-office block the same. Keep 2025–26 as "Pure Imagination; the Blumey lists name Cinderella", or drop it. |
| CC-U4 | Charlotte Christian | Arts › Studio to Gallery, Verdict ask vs College Support (#9) | "no award counts appear here" (`artsPrograms/charlotte-christian.ts:330`, L1028); "participation cited on both … pages" (`:326`, L1027) | "Scholastic Art & Writing — **54 awards** over the last five years, per the 2026–27 profile." (L1981) | A | no | The 2026-27 profile today (https://resources.finalsite.net/images/v1725038322/charlotte/b12msqpqbmeqjqgszan1/2024_USprofile_admiss.pdf): "54 Scholastic Art and Writing awards over the last 5 years". | Give the 54 in both places ("art and writing together; not broken out"). Ask (`:377`, L1040): "How many of the 54 were Gold or Silver Keys in visual art?" The present ask, "Which students earned…", asks a parent to collect student names. |
| CC-U5 | Charlotte Christian | Arts › Theatre ledger, context, Verdict | The ledger runs 2026, 2024, 2016, 2015, 2013 (L948-962). "A top-prize win, plus recent finalists" names 2024 and 2026 (`:346`, L1033). | Five finalists in 2023 too, for Into the Woods | A (omission the user moved to this round) | no | Saved 2023 list (https://www.blumenthalarts.org/assets/doc/2023-Blumey-Nominees-and-Finalists-dc56d4a6fb.pdf): five entries under the five "Finalists for …" headings, as Baker, Witch, Cinderella’s Prince, Little Red Riding Hood, Ensemble/Wolf. The record's Method says the same. | Add a 2023 row with roles only, and 2023 to the context and verdict. The record's "2014–2023 … [NOT FOUND]" (lines 251, 667) is superseded. |
| CC-U6 | Charlotte Christian (also Catholic, Covenant, Carmel; and Cannon, Country Day, Latin, Providence Day, Davidson Day) | Sports › Pipeline (#10) | Chrome heading "Ranked recruits, **current cycle**" (`en.json:436`; CC L1366, CCHS L1413, Covenant L1000, Carmel L830) | The athletes beneath are past classes: "Bryce Young (’24…" (CC L1367); "Jack Larsen … Class of 2024" (CCHS L1414); "Emily Eaton ’24" (Covenant L1001); "Cade Tyson (’22)" (Carmel L831) | C | no | Internal. The current cycle is the Class of 2027, which the same cards count separately as "Current seniors committed". | "Ranked recruits". **CHROME**: ten catalogs. It is a sub-heading, not a card title, so no alias. |
| CCHS-U1 | Charlotte Catholic | FA › Tuition vs Learning Support (#9) | "CCHS is a 9–12 school, so there is no ladder of grade bands at all. **These three rows are the entire schedule.**" (`financialAidReports.ts:2662`, L2083) | "Options Program tuition, 2026-27 · **$24,077** … $18,345 for Participating Catholic families" (L433-435, L503) | A | no | https://www.discovermacs.org/admissions/tuitionandaffordability, 2026-2027 Tuition Rates: "Options – CCHS $24,077 $18,345", directly under the High block. | "These three rows are the standard high-school schedule. The Options Program at CCHS has its own rates, $24,077 (community) and $18,345 (participating Catholic)." A fourth table row would also be data only. |
| CCHS-U2 | Charlotte Catholic | Arts › Theatre, Verdict; Clubs › Honor Societies | "ten finalist places across two years"; "One student was recognized in both years"; "The two productions above are pieced together from Blumey records" (`artsPrograms/charlotte-catholic.ts:148`, L985); "Recognition in both years" (`:255`, L1061); season table from 2024–25 (`:127`, L942-948); clubs `:175` (L882) | A third year: five finalists in 2024, for Phantom of the Opera | A (omission the user moved to this round) | no: the two-year claim is older; round 4 reworded it | Saved 2024 list (https://www.blumenthalarts.org/assets/doc/2024-Blumey-All-Nominees-and-Finalists-c0f5a7ba22.pdf): five CCHS finalists, as The Phantom, Carlotta, Firmin, Madame Giry, Joseph Buquet. The record's Method says the same. Two students, not one, placed in two years: one as The Phantom then Motel, one as Hodel then Dorothy. | Add 2024 to the season, ledger, context, verdict, clubs line and Compare qual (`metricValues.ts:1556`): "fifteen finalist places across three years; two students placed in two of them." Roles only. |
| CCHS-U3 | Charlotte Catholic | Summer › tile, headline, filter; Compare `summer-ages` | "ages 6–13" (L2022); "for children aged 6 to 13, not for its own high schoolers" (`summer/charlotte-catholic.ts:42`, L2024-2025); "Rising 6–9 / ages 11–13" (`:55`, L2028); qual "rising 2nd-9th graders aged 6-13" (`metricValues.ts:2219`; value `:2205`) | "Cougar Football Camp … **Rising grades 3–9**" (L2047-2051). A rising 9th grader is about 14, and is an incoming high schooler. | A (one camp's age band applied to all four) | no | Football flyer today: "Rising 3rd Grade- Rising 9th Grade", no ages. Baseball page: "6-13 Years Old". Basketball: "rising grades 2–8". | Headline: "Four youth sports camps: baseball takes ages 6–13, basketball rising 2–8, football rising 3–9." Filter "Rising 6–9". Compare value "ages 6–13 · rising 2–9" or "rising 2–9" (confirm `check:spans` still reads it), and the qual to match. |
| COV-U1 | Covenant Day | FA › What to Ask, Q3 | "How does the mandatory NC Opportunity Scholarship application interact with CDS aid for families **above the state income cap**?" (`financialAidReports.ts:1112`, L1922) | There is no cap: "with no income cap" (Catholic L2123); "income caps have been removed" and "above the **former** income cap" (Carmel L1767, L1824); Hickory Grove says the same | A | no | https://www.discovermacs.org/admissions/tuitionandaffordability: "There is no income cap to apply for this program." Covenant's own page names no cap. | "…interact with CDS aid, now that the state program has no income cap and pays by income tier?" |
| COV-U2 | Covenant Day | Clubs › Service headline | "fourth graders **at twenty community sites**" (`clubsPrograms/covenant-day.ts:26`, L504-505) | "**nearly twenty** different sites" (L509); "nearly twenty sites" (L501); tile "~20" (L506) | A | no | https://www.covenantday.org/campus-life/service: "serve at nearly twenty different sites for Goodness Gorillas". | "fourth graders at nearly twenty community sites". |
| COV-U3 | Covenant Day | College Support › Where Graduates Go, Whole Class (#9) | "with the **deepest concentrations** at NC publics and Christian colleges" (`collegeSupportPrograms/covenant-day.ts:291`, L1105); "The **deepest enrolled concentrations** are Chapel Hill, NC State, UNC Charlotte, App State and East Carolina" (`:659`, L1446) | "bold = **at least one** graduate enrolled" (L1131); "No enrollment-rate percentages" (L1358); "no enrollment rates for each class" (L1447) | A (our inference from a list with no counts) | no | August profile today: "Bold indicates school to which students from the CDS classes of 2023-2026 matriculated." No count per college. The committed UNC dashboard record has enrolled counts for the six campuses only, none for App State or private colleges. | "The bolded list includes Chapel Hill, NC State, UNC Charlotte, App State and East Carolina; the school gives no count per college." Same at L1105, and in the record's line 20. |
| COV-U4 | Covenant Day | Arts › context, ask | "The ledger goes quiet after 2019 at the Blumeys." (`artsPrograms/covenant-day.ts:102`, L635); "when did the program last enter the Blumeys? **The public ledger stops in 2019.**" (`:197`, L697) | Covenant entered in 2022 | A | no | Saved copy of Blumenthal's May 29, 2022 winners release (https://www.blumenthalarts.org/news/detail/blumenthal-performing-arts-announced-the-9th-annual-blumey-awards-winners): "The schools that competed this year included: …, Covenant Day School, …". The saved 2023–2026 lists name no Covenant nominee or finalist. | "No Blumey recognition is on record after 2019, though Covenant Day competed in 2022." Ask: "Have you entered the Blumeys since 2022?" |
| CAR-U1 | Carmel Christian | Arts › Theatre ledger, context, Verdict | "**~2022-23** · Singin' in the Rain" (`artsPrograms/carmel-christian.ts:162`, L476-478); "**One student** placed in three straight years." (`:169`, L479); "after finalist places in 2024 and 2025" (`:269`, L523) | The 2023 list has Carmel's show as **Mary Poppins**, with three finalists. Two students placed in three straight years. | A | **yes, in part**: "One student placed in three straight years" is new in round 4. The ~2022-23 guess and the 2023 omission are older. | Saved 2023 list (URL in CC-U5): finalists as George Banks (Supporting Actor), Winifred Banks (Supporting Actress), Miss Andrew (Featured Performer). Matched against the saved 2024 and 2025 lists, one student placed as George Banks, Dmitry and Curly McLain, another as Lily, Laurey Williams and Ariel Moore. | Add a 2023 Mary Poppins row, roles only. Singin' in the Rain year → "Earlier (year not published)". "Two students placed in three straight years: one 2023–25, one 2024–26." Verdict `:272` gains 2023. |
| CAR-U2 | Carmel Christian | FA › Aid Process and Timeline | "**Every year**Aid is need-based and assessed through FACTS" (`financialAidReports.ts:2051`, L1768) | "**whether aid must be reapplied for annually, are also unstated**" (L1772) | A (our label) | no | Committed record `Carmel Christian - Financial Aid - Deep Dive Report.md` (S2, the aid landing page): FACTS and a deadline, no annual-reapplication rule. Host refused, not re-fetched. | `when: 'How it works'` (or "Platform"). |
| CAR-U3 | Carmel Christian | Arts › Ladder vs Course Offerings | "Every **K–4** student takes both music and art classes. At grade 5 visual art continues and students **may join** choir" (`artsPrograms/carmel-christian.ts:72`, L444; also `:58`, L433-436; Compare `program-span` qual) | "Music**K–Gr 5**Special Areas (All Grades)" and "six Special Areas **for all grades**" (L321, L341) | B | no | Committed records (host refused): arts record line 44 (the Elementary arts page) says "K-4 all students take music and art classes"; `…Elementary Curriculum Guide.md:22` lists Music under "Special Areas (all grades)". | Attribute both: "The arts page says every K–4 student takes music; the 2026–27 elementary guide lists music for every grade through 5." Dev verify flag, and an ask: "Does every 5th grader take music?" |
| CAR-U4 | Carmel Christian | Arts › Ladder, Studio, Verdict vs Course Offerings | High School "**Technical Theater and Design**" and "**Creative Writing**" (`artsPrograms/carmel-christian.ts:93-94`, L448; "a High School arts elective" `:235`, L508-509). L525 credits the cluster to "**the Course Offerings guide**" (`:277`). | The 96 High School rows have neither (L178-222). Creative Writing is a Middle School elective only (L314). | B | no | Committed records (host refused): arts record lines 50-51 (HS arts page, S5) list both; `…Curriculum Guide.md:84-90` lists neither, and `:148` puts Creative Writing in grades 7-8. | "on the arts page (not in the 2026–27 course listings)" at both, and in L525 credit the cluster to the arts page. Widen the ask at L527 to cover the reverse gap. Dev verify flag. |
| CAR-U5 | Carmel Christian | College Support › Verdict | "So a weighted GPA **quoted today** is not calculated the same way as one quoted for a **current freshman**." (`collegeSupportPrograms/carmel-christian.ts:705`, L1306) | The change starts "from the Class of 2026" (same bullet), so a senior and a freshman today are weighted alike. Only the Class of 2024 ranges (L1203-1205) use +1 / +2. | C (undated "today") | no | Committed 2024-25 profile transcription, lines 50-51: "Beginning with the Class of 2026, honors courses will receive an additional weight of 0.5 and AP courses…1.0". Host refused. | "So the Class of 2024 range above is not on the same scale as a current student’s weighted GPA." |
| CAR-U6 | Carmel Christian (same cause at Gaston Day, outside the group: cross-school) | Sports › Pipeline | "Miles LeaksBasketballJohnson & Wales**C2C**D3" (`sportsPrograms/carmel-christian.ts:243`, L841), the Charlotte campus in the record | Gaston Day L790-791: "Johnson & Wales (Charlotte)**USCAA**"; "competes in the **USCAA rather than the NCAA**" (`sportsPrograms/gaston-day.ts:276`, `:283`) | A (the Gaston Day side) | no | https://charlotte.jwuathletics.com/ and its 2024-25 men's basketball schedule: "Coast-To-Coast Athletic Conference", NCAA mark in the footer, no USCAA. | Carmel stays; optionally print "(Charlotte)". Gaston Day row → C2C, and drop the USCAA sentences in its note and record. |

Cross-school rows for the parent: **CC-U6** (nine schools), **CAR-U6** (Gaston Day). **COV-U1**: Covenant is the only page with the false cap premise. The older-finalist omissions (CC-U5, CCHS-U2, CAR-U1) belong with the same row at Davidson Day, Latin and Gaston Day.

Outside the group, seen and not researched: the conference census found Elon football as "CAA" in two Charlotte Christian rows (Class of 2026) and "Southern" in a Providence Day Class of 2027 row, which may be a real realignment.

## Part 3: R8 triage

Against `.claude/plans/consistency4-data/r8.txt`, no noun group is new for these four schools. Two groups moved:

- CCHS seniors 336 / 56 / **67**: the 67 is CCHS-T13's fix. Not a conflict, and already the settled row.
- Covenant camps 29 / **19** (was 20): COV-T15's fix. Not a conflict, and already the settled row.
- CCHS AP 22 / 2, students 1330 / 9-12, clubs 76 / 15 / 23: settled rows, skipped.
- CC teams 50 / 44, AP 22 / 21: settled rows, skipped.
- CC students (15 values): every member is a trip group size, the 31 and 42 being the 2009-10 and 2011 trips. Not a conflict.
- Covenant seniors 1 / 85, ensembles 1 / 9: settled rows, skipped.
- Carmel: no group.

R8 saw none of Part 2.

## Leads from the round-4 builder

| lead | result |
|---|---|
| X1 translation gap | Not in scope (English only). Closed in round 4's Phase 2 by `WORDED_VALUES`. |
| CC-T4 sweep at Cannon, Hickory Grove, Davidson Day, Providence Day, Country Day | Outside this group. |
| Compare `ap-performance` and Gaston Day's basis | Fixed: the row note names the three share-of-students schools. |
| Catholic's performances calendar may list The Wizard of Oz | Not a conflict: the page says "No showings" today. |
| Covenant facts that only the July profile prints | Not a conflict: the sources name the July edition, and nothing in the August edition contradicts them. |
| CC international-travel record still quotes "Nov. 1, 2026" | Not a finding: no page renders it. |
| Older finalist years (plan note 4) | Verified from the saved lists: CC-U5, CCHS-U2, CAR-U1. |

## Checked and consistent

- **All four dumps read in full**, every card, against their Compare values, subs and quals.
- **Round 4's changed values:** each restatement searched (the old strings are gone except COV-T15's qual).
- **Catalogs recounted:** CC 13 / 24 and 22 AP titles; CCHS 26 AP, 39 arts, 12 Honors arts, 13 Options; Covenant 89 / 32 / 41 and 17 AP; Carmel 96 / 46 / 11 and 16 AP.
- **Rosters:** CC 48 + 1, CCHS 54 + 5, Covenant 35, Carmel 20; levels, sport counts and named lists. All rosters on the site were cross-checked for one college with two levels or conferences (CC-U1, CAR-U6).
- **Acceptance lists:** 249 / 200 (199) / 225 / 217 (214), buckets recounted from `cats`.
- **Clubs and staff:** CC 23 and 38; CCHS 76, ten societies, 21 staff, 13 questions, all five service subtotals; Covenant 10; Carmel 5.
- **Arithmetic:** four NC pools; Cup season sums, gaps and leads; win percentages; CC, Covenant and Carmel tuition runs and changes; ceilings and all-in figures; after-school grids; CC's 133-session tiers; Carmel's 36 and Covenant's 19 camps; CC's 35 trips and 17 countries.
- **Live re-checks that held:** CC aid dates and requirement; MACS rates and fees; Covenant 74%, 3.5 units, AP five-year line, 1263 / 26; the football flyer's $160.
- Looked at and not reported: Covenant's field hockey and football 2022 runner-up years missing from the Cup card's main sources (a deliberate omission in its record); Catholic's Clubs card showing 2025 National Merit beside College Support's 2026 (both dated); Catholic's "no named coach" on the sport pages beside a football coach from another source.

Limits:
- carmelchristian.org, blumenthalarts.org and k12.ncseaa.edu were not requested. The Carmel rows rest on committed records, the Blumey rows on saved copies.
- The CC Global Exposure packets, the US News tables, the Cup source tables, the Covenant packet and terms PDFs and the MACS PDF schedule were not re-fetched.
- The page dump omits "Show sources".

## Fetching and names

- 21 requests, to discovermacs.org, charlottechristian.com, charlottecatholic.org, covenantday.org, resources.finalsite.net, queensathletics.com and charlotte.jwuathletics.com. **None reached a refused host, and no site refused.** The first 19 ran with `curl -L`. After the parent's caution all 19 were re-checked without following redirects (200, empty Location), and the last two ran with redirects off.
- **No non-athlete student name found.** The four dumps were read. The names in the saved Blumey lists for these schools were searched across tracked text files with file and line output only. The one hit, `source-material/learning-support/charlotte-catholic/Charlotte Catholic - Learning Support - Official Site Research.md:136` and its two generated copies, is a substring of an adult evaluator's practice name, so it is not a leak.

## Files touched

Appended `### Re-verification 2026-11-22 (plan consistency5, self-scan)` under `## Method`. Four had no `## Method`, so one was added at the end (marked +).

- `source-material/sports/charlotte-christian/Charlotte Christian - Sports - College Commitments 2024-2026.md`
- `source-material/the-arts/charlotte-christian/Charlotte Christian - The Arts - Arts Redesign Deep Research.md`
- `source-material/admissions/charlotte-christian/Charlotte Christian - Admissions - Financial Aid Platform Migration to Clarity.md`
- `source-material/after-school/charlotte-christian/Charlotte Christian - After School - Redesign Research 2026.md`
- `source-material/financial-aid-tuition/charlotte-catholic/Charlotte Catholic - Financial Aid & Tuition - Schedule and Aid Programs 2026-2027.md`
- `source-material/the-arts/charlotte-catholic/Charlotte Catholic - The Arts - Program Facilities and Recognition 2026.md`
- `source-material/summer-programs/charlotte-catholic/Charlotte Catholic - Summer Programs - 2026 Camp Catalog.md` +
- `source-material/summer-programs/covenant-day/Covenant Day School - Summer Programs - Redesign Research 2026.md`
- `source-material/student-clubs/covenant-day/Covenant Day School - Student Clubs - Service and Community Engagement.md` +
- `source-material/college-support/covenant-day/Covenant Day School - College Support - Fit and the Whole Class.md` +
- `source-material/sports/carmel-christian/Carmel Christian - Sports - College Commitments 2024-2026.md` +

## Settled, skipped

- **S5**, charlotte-christian L817, L819-820: values unchanged, scope line present.
- **S6**, carmel-christian L1314, L1325, L1374 and the Compare cell: values and qual unchanged.
- **S8**, charlotte-christian L1354, L1379; charlotte-catholic L1399, L1426: Notre Dame football is "FBS Ind." at P4, and both cards name Notre Dame. Covenant and Carmel hold no Notre Dame row.
- **R8 table rows:** CCHS AP, seniors, students, clubs; CC teams, AP and the long "students" group; Covenant camps, seniors, ensembles.
- S1, S2, S3, S4, S7, S9, S10: no instance on these four pages.
