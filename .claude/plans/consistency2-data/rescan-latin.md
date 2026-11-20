# Charlotte Latin — consistency RE-SCAN (2026-11-20, main 0e8882f6)

Page: `pages2/charlotte-latin.txt` (3,036 lines, read top to bottom). Data traced in the per-school files.
Live fetches this pass: https://www.charlottelatin.org/athletics/athletic-teams and
https://www.charlottelatin.org/admissions/application-process (both HTTP 200). Each is recorded under
`## Method` → `### Re-verification 2026-11-20 (plan consistency, re-scan)` in:
- `source-material/sports/charlotte-latin/Charlotte Latin - Sports - Redesign Research 2026.md`
- `source-material/admissions/charlotte-latin/Charlotte Latin - Admissions - Live Dates Check 2026-11-10.md`

(Placed under `## Method` rather than a bare `##` heading, following the repo convention that research
apparatus in source-material sits under Method so the ingest does not render it as parent prose.)

## Part 1 — regression check

| id | status | where (pages2 line or file:line) | note |
|---|---|---|---|
| Seed 1–8 | RESOLVED | see rows below | 5 was already resolved; the rest map to LAT-1a/1b, LAT-2, LAT-3, X3, X2, LAT-5/6, LAT-8a/b/X5. |
| LAT-1a | RESOLVED | L146 "24 AP subjects"; Compare `advanced-courses` "24 AP subjects" + qual naming 23 | |
| LAT-1b | RESOLVED | L239 teaser "23 AP courses on the school's course-offerings page"; L1944 "AP subjects in the 2026–27 profile"; L2057 ask; verify flag `collegeSupportPrograms/charlotte-latin.ts:571` | Recount: 23 AP-tagged rows in the list. |
| LAT-2 | RESOLVED (deviation: UT Austin at all five) | L1461/1470/1477/1491/2054: 62/68, SEC 16, six absences; L1802 "University of Texas · National Rank #34"; Compare `bucket-p4` 62/68 | No "61" left on the page. |
| LAT-3 | **PARTIAL** | Fixed: L2097 subhead, L2133 $1,880, L2340 watch-out, L2342 ask, FA L2930–2931. **Still uniform-linear:** Coverage Map footnote (`afterSchoolPrograms/charlotte-latin.ts:31`, page L2091) "Otherwise the price goes up evenly with each day, so 1–4 days a week costs proportionally less"; verdict subhead (`:327`, page L2321–2322) "honest, linear pricing"; verdict point (`:333`, page L2326) "Honest linear pricing with real granularity" | The Cost Planner on the same page prints 4 days $1,880 > 5 days $1,475 (Gr 1–5 4:30) and 5 days $2,540 = 4× the day rate (TK/K 4:30). The footnote's "1–4 days costs proportionally less" is false for both rows. Proposed: footnote → "Otherwise the price goes up evenly with each day on three of the five rows; the two 4:30 rows break the pattern (see The Cost Planner)."; `:327` → "…program with mostly linear pricing…"; `:333` → "**Mostly linear pricing with real granularity** — …". No checker rule covers price linearity. Prose fields, so Phase 2 applies. |
| LAT-5 | RESOLVED | L144 tile 122; Compare `us-courses` 122; L239 "Shown here as 105 entries" | Recount: 105 US rows. |
| LAT-6 | RESOLVED | L239 "Drama and Music share a tab, and Online Courses lists no course" | 11 tabs + 2 = 13. |
| LAT-7 | RESOLVED | L2543 "One of the two most-repeated camps shown" | Recount: Creative Coding and Clay Camp both 5 sessions; next highest 4. |
| LAT-8a | RESOLVED | L880 "Lower School · TK–5", L882 "Middle School · 6–8"; Grade 5 parenthetical | |
| LAT-8b | RESOLVED | L934–935 "(5–12)", L944 "from Grade 5" | |
| LAT-9 | RESOLVED (deviation: C label, stays 25) | L728–729 "22 of the 27 … plus three groups it lists separately"; Compare qual | Chips 7+5+4+4+3+2 = 25 = rows. |
| LAT-10 | RESOLVED | L843 "at the 2025 Nationals" | Matches CS "At 2025 Nationals". |
| LAT-11 | RESOLVED | L1285–1286 RUNNER-UP 336 pts; '25–26 `NONE` + `toVerify` (`sportsPrograms/charlotte-latin.ts:161`) | Agrees with Cup card "runner-up 2025". |
| LAT-12 | RESOLVED | L1015 "Fall · 9 varsity" | 9 + 6 + 9 = 24 = footnote. |
| LAT-13 | UNCHANGED BY DECISION | Tile "≈$930/mo · Cost of after-school care" | Not applied (component change = UX gate); Compare qual states the basis. |
| LAT-D1 | UNCHANGED BY DECISION | Summer 232 / 169 / "89 of the 232" | User ruling 2026-11-20. |
| X2 (Latin) | RESOLVED | L2359 "66 of the 169 camp titles … covering 104 of the 232 offerings" | Recount: 66 rows, 66 names; 105 session slots, the two-week musical (Sessions 5 + 6, priced once) is one offering → 104. |
| X3 (Latin) | RESOLVED | L1980–1981 "~38:1 · seniors per counselor (computed — 151 ÷ 4…)"; tile and Compare ~38:1 | |
| X4 (Latin) | RESOLVED | 122 tile / 122 Compare / 122 teaser + "shown here as 105" | |
| X5 (Latin) | RESOLVED | `check_tuition_rows.mjs:66` msStart 6; Compare `run-ms12` $251,600 (3 × 35,200 + 4 × 36,500); tuition-middle/lower quals say grades 6–8 / grade 5 last LS year; row note puts Latin in the grade-6 group | |

## Part 2 — new findings

| # | school | section(s) | value A (where: file:line) | value B (where: file:line) | category | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|
| LAT-R1 | Latin | Financial Aid › The Aid Engine (timeline + NOT PUBLISHED box) vs Admissions | FA: "Not published — When awards are released relative to the admission decision…" (`financialAidReports.ts:1458`) and NOT PUBLISHED "…when aid decisions arrive compared with admission decisions" (`:1481`); page L2942, L2951 | Admissions (same page): "Financial aid award decisions are communicated the same day" as notification day, Feb 26, 2027 (TK/K) and Apr 9, 2027 (Gr 1–11) (`admissionsPrograms/charlotte-latin.ts:253, 364, 472, 585, 644, 752`); page L66, L69, L71 (TK/K track; same text in every band) | A (FA stale) | https://www.charlottelatin.org/admissions/application-process, re-fetched today: "February 26: TK and K notification day; TK and K financial award decisions communicated" · "April 9: Grades 1-11 notification day; Grades 1-11 financial aid award decisions communicated". The block was first recorded 2026-11-10; the FA report is "as of 24 Jul 2026" and predates it. | `:1458` timeline item: `when: '26 Feb · 9 Apr'`, detail "Award decisions are communicated on notification day: 26 February 2027 for TK and K, 9 April 2027 for Grades 1–11. No enrollment-contract date is published, so whether a family knows its award before the contract is due is still unstated." `:1481`: drop "when aid decisions arrive compared with admission decisions ·" from the NOT PUBLISHED list. Cite the Application Process URL in the card sources. Prose, so Phase 2 applies. No R-rule can see this (a staleness conflict between two cards' prose). |
| LAT-R2 | Latin | Sports › Sports Offered: "17 sports offered" tile + headline vs the sport list beneath | "17" (`sportsPrograms/charlotte-latin.ts:35`; headline `:31` "66 teams across 17 sports") | The card's own season list names 16 distinct sports (Football, Volleyball, Soccer, Field Hockey, Cross Country, Tennis, Golf, Cheerleading, Basketball, Wrestling, Swimming, Dance, Baseball, Lacrosse, Softball, Track & Field) (`:39–75`); page L1016–1038 | B | https://www.charlottelatin.org/athletics/athletic-teams, fetched today: "WE OFFER 17 SPORTS and FIELD 66 TEAMS IN GRADES 7-12", above a 24-entry team directory that collapses to the same 16 sports. The page names no 17th. Our list matches the directory exactly; the school's own figure is one higher. | No value change. Extend the footnote (`:82`): "The school states 17 sports, but its own directory lists 16 (24 boys' and girls' programs); it does not say what the 17th is." Add a dev-only verify flag. Not caught by R7, which reads only "N varsity" season headers; no rule compares an "N sports" tile with the distinct sports listed. |

## R8 triage (charlotte-latin)

- **teams: 66 vs 34** — not a conflict. 66 is the school's team count; 34 is the computed V/JV/MS chip total, which counts each B & G row once and has JV/MS levels only for the eight sports with team pages. The footnote says so.
- **seniors: 1 vs 151 vs 38** — not a conflict. "1" is a parse of "~38:1 seniors"; 151 is the 2026–27 senior class; 38 is the ratio (151 ÷ 4).
- **students: 12 vs 1500 vs 20 vs 22 vs 5** — not a conflict. Trip group caps (12, 20), the 2025 Québec group (22), the arts "1,500+ students" (school total; FA's 1,555 agrees), and a course description's "5".
- **AP: 24 vs 23** — not a conflict. LAT-1b's attributed split (profile 24, course page 23); the Compare qual names both.

## Checked and consistent

- **Admissions:** deadlines (Jan 2 vs Jan 15, "13 days"), "two weeks"/"same day"/"six weeks" intervals to the aid deadline, notification days, $2,500 deposit (matches FA), band labels LS 1–5 / MS 6–8.
- **Course Offerings:** LS 11 subjects in 3 groupings; MS "23 courses with published descriptions across 5 departments" = 23 non-elective rows of 29; US 105 rows, 23 AP tags, 11 tabs.
- **Global Exposure:** 22 trips (8 + 5 + 7 + 2); 7 sister schools / 4 continents; 5 visiting groups; 7 homestays, 10 countries, 4 continents, 8 trips (6 US · 2 MS) on Compare; "ten questions" = 10; Québec 22 and South Africa 12 restated consistently.
- **Clubs:** chips sum to 25; six competitive rows; Nationals results (2 + 2 + 1 + 1 = 6 recognized, as CS says).
- **Arts:** five 2026–27 productions; Blumey ledger vs verdict; 1 AP; spans TK–5 / 6–8 / 5–12.
- **Sports:** 9 + 6 + 9 = 24; eight titles in the matrix; matrix vs Cup point sources (golf, wrestling, girls lacrosse, swimming); pipeline recount from roster: 60 rows 2024–26 + 3 off-roster = 63, D1 22, P4 8, D3 34 (54%), Class of 2026 = 25, swimming 8 D1 / 4 P4, swim + girls lax = 6 of 8 P4, bars sum 22, "61 of 61" = 60 + one '27 verbal = Compare seniors-committed 1; Hall of Fame five classes; Berger 32 years; S&C four coaches; three trainers.
- **College Support:** 132 enrolling asterisks; Ivy 7/8 with six enrolled (not Princeton); nine UNC campuses with asterisks; NC table sums (734 / 334 / 45.5%) and every 5-yr rate; grade distributions recomputed from the profile record (833 / 524, 806 / 457); 357 AP Scholar awards = 192 + 49 + 116; AP 4-or-5 625/833 = 75%; office of 9; ~38:1.
- **After School:** every Cost Planner row except the two flagged; $3,000 → $6,000 → ≈$33/afternoon; TK/K cliff $1,725 / $3,450 / 85 min; $9,300/yr; $2,950/yr five days to 4:30; Compare aftercare qual.
- **Summer:** 7 sessions June 8–July 31 minus the July 4 week; $245–$850 range = listed min/max; Camp Victor 3 weeks $1,530 / $102 a day; Super Care $25 saving; Compare care-span qual.
- **Financial Aid:** 14 components, 8 unpriced (57%), 6 priced; $469,800 and $146,000 runs; 8-payment plan May–Dec; $3.25M / $17,900 / 14% match Compare quals.
- **Compare:** every Latin cell checked against the page (list in the parent's findings); no mismatch.
