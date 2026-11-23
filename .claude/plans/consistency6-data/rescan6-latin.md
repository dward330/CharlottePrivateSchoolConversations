# Charlotte Latin: consistency RESCAN #5, plan consistency6 (2026-11-23, main 638a4d3e)

I read the page dump (`pages/charlotte-latin.txt`) from top to bottom. I traced every changed Latin data file in `changed-since-last.txt` (admissions, arts, clubs, college support, sports, summer, the Latin rows of `financialAidReports.ts`, `metricValues.ts`) by `git diff 5d26847a 638a4d3e`. Every Latin Compare cell, sub and qual was dumped from `metricValues.ts` and read against the page. Page lines are `L<n>` in the dump.

## Part 1 — regression check

**Rows checked: 85 distinct IDs. 78 RESOLVED, 0 NOT RESOLVED, 0 PARTIAL / REGRESSED, 1 UNCHANGED BY DECISION (LAT-T5), 6 n/a.** Each ID is counted once, even where rows repeat across tables, so the total is lower than round 5's 95. Settled rows (S1, S2, S13, S14) are listed under "Settled, skipped". LAT-U9 and LAT-U15 are counted RESOLVED because the approved change is on the page. Both are now S14 and S13.

### Round-5 rows (rescan5-latin.md Part 2, plus X rows naming Latin)

| id | status | where | note |
|---|---|---|---|
| LAT-U1 | RESOLVED | L63, L69, L96–97, L106–107, L111–112; FA L2944; `admissionsPrograms/charlotte-latin.ts:359`, `:373`, `:382`, `:405`, `:417` | The CAIS brochure dates are in place: TK/K testing by Feb 1 and contract due Mar 5. For Gr 1–4 it is testing by Feb 26 and contract due Apr 16. Gr 5 and up are "not published". No weekday is printed. The FA box moved testing out of "not charged" ("Admissions testing is a separate charge: the CAIS brochure gives $300 …"). The interview is attributed in both cells. Deviation (plan): code comments, with no verify flag. |
| LAT-U2 | RESOLVED | L29, L31, L57, L84, L94, L114; `:180`, `:345`, `:397`, `:644` | "Grades 1–11" throughout. "1–12" or "1 through 12" appears 0 times on the page and in the data file. The only "Grades 1–12" left is the dated 2025 cycle in the record (Grade-by-Grade L21), which is research history. |
| LAT-U3 | RESOLVED | L54 | "Two dated events are published for this band" names the Jan 20, 2027 coffee and panel. "one dated event" appears 0 times. |
| LAT-U4 | RESOLVED | L3029 | "They include the deposit, which comes off tuition." |
| LAT-U5 | RESOLVED | L2941–2942 | "$635 a semester for one day a week implies $2,540 for four days and $3,175 for five … The table prints $1,880." Agrees with the planner (L2110–2150) and Q8 (L3042). |
| LAT-U6 | RESOLVED | L1948 | "two service academies, Naval and Air Force … and The Citadel, a military college". |
| LAT-U7 (X1) | RESOLVED | L916, L924–931, L938, L1001 | Six ledger rows, roles only. "six years" twice, and "five finalists in each year from 2023 to 2026". Deviation: the 2023 row makes no "No nominations" claim, and the one-nomination claim is scoped to 2024–26. Both are recorded. |
| LAT-U8 | RESOLVED | L874–875, L940–941 | "band, orchestra and choir, each open to grades 5–12 with no auditioned tier". "per division" appears 0 times on the page, in the Arts record and in `src/content/the-arts/charlotte-latin.json`. |
| LAT-U9 | RESOLVED (now S14) | L1939 | The text matches S14 word for word. No rate is printed. |
| LAT-U10 | RESOLVED | L827 | "28 inducted in April 2024 (Classes of 2024 and 2025)". |
| LAT-U11 | RESOLVED | L798–799 | "the Class of 2023 still logged 3,396 hours". Agrees with the tile at L810. |
| LAT-U12 | RESOLVED | L1317 | "In 2025–26: volleyball …". |
| LAT-U13 | RESOLVED | L1849, L1855, L1866 | The tile reads "23 of 69 in Fall 2025, the lowest of the six that year". The subhead reads "just below NC State's 34.3%. The other four ran 52–100%" (recounted: 78.6, 100.0, 52.0, 100.0). The chip reads "the lowest of the six in Fall 2025". The table's *other* superlative chip has the same undated shape, and it is new finding LAT-V4. |
| LAT-U14 | RESOLVED | L2372 "Age", L2376 "Ages" | Filter label and column header. |
| LAT-U15 | RESOLVED (now S13) | L1943, L2067 checklist | "The school's older Learning Resources guidelines said …", plus the ask "What do Learning Resources sessions cost today?". |
| X2 (Latin) | RESOLVED | L1261 | "In fall 2026 girls tennis also won a state title." The bracket is cited (`sportsPrograms/charlotte-latin.ts:222`). The undated "165 state titles" on the same area was already below the school's own count before fall 2026. It is reported as new finding LAT-V1, not as a regression. |

### Round-4 rows carried in rescan5 Part 1

| id | status | where | note |
|---|---|---|---|
| LAT-T1 / P-CO2 | RESOLVED | L2907, L2930, L2939–2940 | The two pages and two years are attributed: $1,900 / $950 / $550 / $80 against $1,800 / $900 / $450. |
| LAT-T2 | RESOLVED | L2103, L2183, L2342, L2353 | Both dismissal and bus values are attributed. |
| LAT-T3 | RESOLVED | L2936, L3037 | Talons $195–$375; Q3 says "beyond the Talons fees already published". |
| LAT-T4 | RESOLVED | L2984, agrees with L715 | Plus Fund. |
| LAT-T5 | UNCHANGED BY DECISION | FA › The Aid Engine, NOT PUBLISHED | Dropped by the parent in round 4. Unchanged. |
| LAT-T6 | RESOLVED | L3033 | The document is named. |
| LAT-T7 (X5) | RESOLVED | Compare `aftercare-cost` qual | There is no comparative clause. |
| LAT-T8 (X7) | RESOLVED | L870, L872; Compare `advanced-arts-coursework` "1 AP", `ensembles` "3 ensembles" | Both agree with the page. |
| LAT-T9 | RESOLVED | L900, L996 | 59 appears only for 2026. |
| LAT-T10 | RESOLVED | L916 | Superseded by LAT-U7: six rows and a "six years" title. |
| LAT-T11 | RESOLVED | L1001 | The ask now names "an open Acapella Club" and asks about an auditioned group. It agrees with the Compare `ensembles` qual. |
| LAT-T12 | RESOLVED | L772, L786 | "houses Q&A and BSA". |
| LAT-T13 | RESOLVED | L784–786 | 25 chips unchanged (7 + 5 + 4 + 4 + 3 + 2). |
| LAT-T14 | RESOLVED | L796 | "former diversity page", dated July 2026. |
| LAT-T15 | RESOLVED (as ruled) | L2888 | Built from the committed record. |
| LAT-T16 | RESOLVED | L2852 | "26 offerings, with no early-bird discount." |
| LAT-T17 | RESOLVED | L2715 | "the only one at its price". |
| LAT-T18 | RESOLVED | L996–1000 | "across multiple years" appears 0 times. |
| P-R4 | RESOLVED | `financialAidReports.ts` Latin sources | No "2025-26" in either document label. |
| P-R5 | RESOLVED | L111–114 | Superseded by LAT-U1. "due" is kept. |
| X1–X9 (round 4) | RESOLVED / n/a | — | X1, X3, X8 and X9 are n/a for Latin, as in round 5. X2 (L900, L938), X4 ($1,530 / 15 = $102, L2877–2881), X5, X6 (L1948) and X7 are unchanged and agree. |

### Older rows (rescan4 Part 1 / 1b, consistency3 plan rows), spot-checked

| id | status | where | note |
|---|---|---|---|
| Seed 1 / LAT-1a / LAT-1b | RESOLVED | L146, L239, L2067; Compare `advanced-courses` qual | 24 against 23, attributed. 23 AP rows were recounted on the page. |
| Seed 2 / LAT-2 | RESOLVED | L1471, L1501 | 62 / 68 (18 + 16 + 16 + 12). |
| Seed 3 / LAT-3 | RESOLVED | L2110–2150, L2941 | The two broken rows are reproduced. |
| Seed 4 / X3 (r1) | RESOLVED | L1477, L1990 | ~38:1, 151 ÷ 4. |
| Seed 5 / X1 (1b) | RESOLVED | L1330–1346 | 63 / 22 / 8. The bars sum to 22 (8 + 4 + 3 + 2 + 1 + 1 + 1 + 1 + 1). |
| Seed 6 / X2 (r1) | RESOLVED | L2370 | 66 of the 169 titles, 104 offerings. |
| Seed 7 / LAT-5 / X4 (r1) | RESOLVED | L239 | "Shown here as 105 entries". |
| Seed 8 / LAT-8a | RESOLVED | L885 | Grade 5. |
| LAT-6 | RESOLVED | L239 | 13 departments. |
| LAT-7 | RESOLVED | Summer catalog | Unchanged. |
| LAT-8b | RESOLVED | L940–941 | Board reads 5–12. |
| LAT-9 / LAT-10 | RESOLVED | L728–729; Compare `us-organizations` qual | 22 + 3 = 25. |
| LAT-11 | RESOLVED | L1254–1258 | Unchanged. |
| LAT-12 | RESOLVED | L1025–1048 | 9 + 6 + 9 = 24. |
| LAT-13 | RESOLVED | L2077, Compare `aftercare-cost` | $4,650 ÷ 5 = $930; $9,300 / yr. |
| X5 (r1) | RESOLVED | Compare tuition rows | Bands and quals agree with L2914–2918. |
| LAT-R1 | RESOLVED | L66, L71, Section 03 | Notification days agree. |
| LAT-R2 | RESOLVED | L1043 footnote | 17 and 16, attributed. |
| X6, X7 (1b) | n/a | — | Neither touches Latin. |
| P-LINKS | RESOLVED (not re-fetched) | FA sources | No source line changed. |
| P-RF3, P-LR1, P-LR2 | RESOLVED | FA sources and boxes | No bookkeeping text. |
| P-R1 | RESOLVED | Section 03 | November 15. |
| P-R2 | RESOLVED | L2984 | Eligibility statement. |
| P-R3 | RESOLVED | L2984 | Supplemental support. |
| P-R6 | RESOLVED (not re-run) | overlays | The round-5 plan records path replay TOTAL 0. |
| P-CO1 | RESOLVED | FA sources | The FAQ is cited. |

## Part 2 — new findings

The fetches ran 2026-11-23 with curl, without following redirects. One redirect went to a CDN host (images.sidearmdev.com), and the image was then fetched from its cloudfront origin. No refused host was requested. "No rule caught it" names the gate that missed each finding.

| id | school | section(s) | value A (where) | value B (where) | category | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|
| LAT-V1 | Latin | Sports › Sports Offered (headline, tile) | "165 state championships across 21 sports since the NCISAA formed in 1973" L1015; tile "165 / state titles since 1973" L1022–1023 (`sportsPrograms/charlotte-latin.ts:33`, `:38`). The research record cites Wikipedia (Sports Redesign Research record L30). | The school's own athletics site says 200. Our Cup record already noted the school's matrix at 198 through Dec 2025, and left it unreconciled (Cup Standings record L99). The same area now adds a fall 2026 girls tennis title (L1261), after the school's graphic was made. | A | https://clshawks.com/sports/2026/3/31/cls-team-championships.aspx links the graphic https://clshawks.com/images/2026/6/8/CLS_State_Championship_Graphic__1_.png (June 8, 2026). It prints "200 NCISAA STATE TITLES", with 23 sport lines that sum to 200 ("26 WRESTLING" … "1 GOLF - GIRLS"). The undated "165" is also an item-6 (undated count) problem. No rule reads it: R9 checks only "N sports". | Headline and tile: "200 NCISAA state titles through spring 2026 (the school's athletics site)". Tile label: "NCISAA state titles, through 2025–26". Drop "across 21 sports", or say "23 boys' and girls' programs" from the graphic. Do not type 201 for fall 2026 unless the school prints it. Fix record L30. Text and value in the existing tile, so this is not UX-GATE. |
| LAT-V2 | Latin | Sports › College Pipeline, reality check | "Football produced two Division I commits, despite the program's eleven historic state titles." L1348 (`sportsPrograms/charlotte-latin.ts:276`) | The school's graphic (above): "12 FOOTBALL". 11 is the former head coach's count, 1987–2016 (Hall of Fame page). Our record lists "11 or 12" as unresolved (Sports Redesign Research record L178). | A | https://clshawks.com/honors/hall-of-fame/coach-larry-mcnulty/13: "11 state football championships (1987, 1989, 1991, 1996, 1999, 2003, 2005, 2006, 2007, 2009, 2016)". The graphic URL above gives "12 FOOTBALL". | "despite the program's twelve state titles", or "eleven of them under one coach, 1987–2016" if the coach's run is the point. Close the record's open question at L178. |
| LAT-V3 | Latin (other schools not checked) | Sports › Winning Record matrix against the Wells Fargo Cup point sources | "State-title matrix, last 3 seasons" L1262. It has seven rows, including the runner-up-only Volleyball and Field Hockey ('25–26) and a Girls Lacrosse "SEMIFINAL". There is no row for girls soccer, boys tennis or girls cross country (`sportsPrograms/charlotte-latin.ts:130–193`). | Same page, Cup card: "Girls Soccer … runner-up … 2024, 2025" L1254, "Girls Cross Country … runner-up 2024" L1256, "Boys Tennis runner-up 2025, 2026" L1258. That is five state finals inside '23–24 to '25–26 that the matrix leaves out. | C | Committed Cup record ("Wells Fargo Cup Standings 2020-2026" L85, L87, L89: "Bracket for all five", "2024 official timing, 86 to Country Day's 79", "Bracket for both"). The ledger is gated by `check:cup`. No rule compares `record.rows` with `cup.pointSources` (R7 and R9 read only Sports Offered). | Add three matrix rows with RUNNER-UP cells: girls soccer '23–24 and '24–25, girls cross country '24–25, boys tennis '24–25 and '25–26. Records come from the brackets, or the cell is left without one. These are rows in an existing table, and overlay paths move. If the parent prefers no rows, label the matrix "Titles, plus selected finals". The parent may check the same matrix-against-point-sources shape at the other Cup schools. |
| LAT-V4 | Latin (same shape at Cannon) | College Support › Admission Rates table | ECU chip "Greenville · eastern NC · largest admit rates of the six" L1884 (`collegeSupportPrograms/charlotte-latin.ts:460`), undated | Same table: ECU 5-yr "90.7% 43 applied · 39 in" L1888, against UNC Greensboro "94.7% 19 applied · 18 in" L1900. In Fall 2025 the two tie at 100.0% (10 of 10, 8 of 8), and the chip goes to ECU on the larger denominator. This is LAT-U13's shape: the low chip was dated "in Fall 2025" because the 5-yr column disagreed, but the high chip was not. | C | Internal recount of the card's table. `check:ncsuper` anchors both labels on Fall 2025 (`scripts/check_nc_superlatives.mjs`, user ruling on Cannon 2026-08-20). It has a dated form for the low label only (`LOW_LABELS`). A recount of all 11 schools finds the high chip's row below another row's 5-yr rate at Latin (90.7 vs 94.7) and Cannon (UNC Charlotte 96 vs UNC Greensboro 100). | "Greenville · eastern NC · the highest of the six in Fall 2025, tied with UNC Greensboro". At Cannon, the same dated wording on UNC Charlotte. Add the dated form to `HIGH_LABEL` in `check_nc_superlatives.mjs`, as `LOW_LABELS` has. The anchor is unchanged; only the wording gains its term. |
| LAT-V5 | Latin | The Arts › Ladder (Middle School), Theatre & the Blumeys, Verdict, against Course Offerings › Middle School | "Theater runs Grades 7–12 — but the backstage/technical course starts in Grade 6, a year earlier" L887; "the backstage/technical course starts in Grade 6 — a year before the acting course" L911; "backstage tech starts in Grade 6" L996 (`artsPrograms/charlotte-latin.ts:68`, `:147`, `:354`) | Course Offerings › Middle School › Electives: "Art / Band / Concert Choir / StringsGr 6 … The Grade 6 elective slate" L226–227 and Engineering Gr 6–8 L228 (`courseOfferings.ts:1754`). No backstage or stagecraft course appears in any Middle School grade (Drama Gr 7–8, L232). | B | https://www.charlottelatin.org/the-arts/performing: tabs "Theater (Grades 7-12) · Backstage (Grades 6-12)". The tab body is not in the served HTML, so the page does not say whether it is a class. https://www.charlottelatin.org/academics/middle-school, Electives: "Grade 6: Art · Band · Concert Choir · Engineering · Strings"; Grades 7–8 add Computer Programming, Drama, Leadership Lab, Speech and Debate. | Do not call it a course. "The arts page lists Backstage for Grades 6–12, a year before Theater (7–12). The Middle School course list names no backstage class." Add one ask to the existing Verdict checklist: "Is Backstage in Grade 6 a class or an after-school crew?". Arts takes no verify flag, so use a code comment. Text only. |

## Part 3 — R8 triage

`r8.txt` holds the same six Latin groups, with the same numbers, as the previous report (`consistency5-data/r8.txt`). Nothing is new since then.

- teams 66 / 34: settled row, skipped.
- camps 232 / 169: settled row, skipped.
- seniors 1 / 151 / 38: settled row, skipped.
- students 12 / 1500 / 20 / 22 / 5: settled row, skipped.
- AP 24 / 23: settled row, skipped.
- ensembles 12 / 3: settled row, skipped.

R8 cannot see LAT-V1 and LAT-V2: "state titles" and "state championships" carry no shared noun with a second number on this page.

## Checked and consistent

- **Admissions:** all four bands' steps, callouts, checklist rows and cross-band cells against the CAIS dates. "13 days", "thirteen days" and "two weeks". Siblings' Oct 15. The nine staff.
- **Course Offerings:** LS 11 rows in 3 groups (5 + 1 + 5). MS 23 + 6 = 29. US: 23 AP rows recounted, 105 entries, 13 departments.
- **Global Exposure:** 22 trips (8 + 5 + 7 + 2). 6 Upper + 2 Middle in 2026–27. Seven sister schools on four continents. Five visiting groups. Compare `travel-trips` 8, `travel-homestays` 7 (5 + 1 + 1), `travel-countries` 10, `travel-continents` 4.
- **Clubs:** 25 chips (7 + 5 + 4 + 4 + 3 + 2). 22 + 3. Six competing programs. Cum Laude April 2024. 3,396 for the Class of 2023 at both places.
- **Arts:** six ledger rows against "six years". Five productions (Fall play, spring musical, three MS/LS shows). 59-school field at both places. 1 AP and Music Theory AP in the US course list. "3 ensembles" against the qual naming the Chorale and Acapella Club as not counted. 1,500+ against FA's 1,555 (settled R8 row).
- **Sports:** 9 + 6 + 9 = 24. Eight STATE cells = eight titles. Point sources against matrix years for golf, wrestling, girls lacrosse and boys swimming. Volleyball 13–11 + 18–6 + 29–2 = 60–19 (.759). Wrestling 264.5 at both places. Cup tiles: 690 = 277.5 + 205 + 207.5, PD 692.5, −2.5. All six lead-over-next figures. Compare `cup-finish`, `cup-titles`, `cup-best`. Pipeline 63 / 22 / 8 and the bars. "26th wrestling crown" against the school's "26 WRESTLING". Eighteen Cups against the school's list (1 + 4 + 3 + 1 + 7 + 1 + 1). Coaching tenures (32 years since 1994; Cannon 2015–20 = six years).
- **College Support:** NC table 334 / 734 = 45.5%. 5-yr pooled rows. Fall 2025 ranks. AP Scholar 357 = 192 + 49 + 116 (the 357 Class-of-2027 exam count in the record is a coincidence, not a copy). Junior grades 524 of 833, recounted from the record's table (the 833 matching the AP exam count is also a coincidence). National Merit aggregates (2023–25 20 against 2026's 12). ~38:1 and "nine people for 151 seniors". 145 (2025–26 profile, Class of 2026) against 151 (2026–27, Class of 2027): different classes, both labelled.
- **After School:** planner rows. $3,450 = 2 × $1,725. $9,300 and $930 / mo. $2,950 = 2 × $1,475. 85 minutes. Billing dates (Sep 23 and Jan 20) at both After School and FA. Summer cross-reference ($45, seven sessions, June 8 to July 31).
- **Summer:** $1,530 = 3 × $495 + $45, and ÷ 15 = $102. Super Care $195 = $70 + $150 − $25. "Age" and "Ages" chrome.
- **Financial Aid:** 14 components, 8 priced + 6 unpriced, 43%. $469,800, $251,600 (Compare), $146,000 recomputed. Deposit wording in five places. Section 03 dates against Admissions.
- **Compare:** every Latin cell, sub and qual (52 rows) against the page.
- **Looked at, not reported:** the cost-planner note's "tuition only", then "they include the deposit" (the translators' item). It is wording and holds true, since the deposit is part of tuition. The "Brad Hoover 10 yrs" against "2000–10" matches the school's own "10-year stint … retired … in 2010". "Best finish: 2nd … 2025–26" in the Cup headline: the Compare qual lists the other three seconds. Girls tennis "State champions 2020, 2021" in the Cup card against the fall 2026 title is scoped to the card's 2020–21 to 2025–26 window. Winnie the Pooh Jr. photo caption against Madagascar Kids: the caption is undated, and the shows are different years. The Jan 20 coffee is absent from the band's date strip: the strip does not claim to be complete.

## Files touched

Appended `### Re-verification 2026-11-23 (plan consistency6, self-scan)` under the existing `## Method` heading, at the end of each file:

- `source-material/sports/charlotte-latin/Charlotte Latin - Sports - Redesign Research 2026.md`
- `source-material/the-arts/charlotte-latin/Charlotte Latin - The Arts - Arts Redesign Deep Research.md`

## Fetch and privacy notes

- Fetched with curl, not following redirects: clshawks.com (team championships page, staff page, Hall of Fame page), the championships graphic (via its cloudfront origin after a 302 to a CDN converter), charlottelatin.org `/academics/middle-school` and `/the-arts/performing`, and two archives.ncisaa.org bracket pages (not relied on, because the committed Cup record is cited instead). No refused host was requested.
- I looked at the championships graphic. It shows counts by sport and no person's name.
- No student name is in this file or in either appended record. Coaches and staff are adults, and none is named in the appended text except by role.

## Settled, skipped

- S1: L1465, L1497 ("73 / 75") and the Compare `bucket-nu75` qual.
- S2: L2362, L2368–2370 (232 / 169), L2855 ("89 of the 232"), Compare `summer-camps` 232.
- S13: L1943 ("older Learning Resources guidelines"), L2067 ask, FA "Fourteen confirmed components" L2923.
- S14: L1939.
- R8 rows: Latin teams, camps, seniors, students, AP, ensembles (Part 3).
