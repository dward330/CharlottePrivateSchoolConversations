# Charlotte Latin — consistency RE-SCAN #2 (2026-11-20, main d19fc9da)

Page: `pages3/charlotte-latin.txt` (3,036 lines, read top to bottom). `diff pages2 pages3` changes six
lines only: L1039 (Sports footnote), L2091 (Coverage Map footnote), L2321–2322 and L2326 (After School
verdict), L2942 and L2951 (Financial Aid › The Aid Engine). Data traced in the per-school files and
`src/data/metricValues.ts`. No live fetch was needed this pass: every finding below is an internal
recount. **Source-material files touched: none.**

## Part 1 — regression check of `consistency2-data/rescan-latin.md`

| id | status | where (pages3 line / file:line) | note |
|---|---|---|---|
| Seed 1–8 | RESOLVED | see rows below | Unchanged since pages2; each maps to LAT-1a/1b, LAT-2, LAT-3, X3, X2, LAT-5/6, LAT-8a/b/X5. |
| LAT-1a | RESOLVED | L146 "24 AP subjects"; `metricValues.ts:235` '24 AP subjects' + qual | |
| LAT-1b | RESOLVED | L239 "23 AP courses on the school's course-offerings page"; L1944 "AP subjects in the 2026–27 profile"; ask L2057 | Recount: 23 AP-tagged rows (L250–443). |
| LAT-2 | RESOLVED (deviation: UT Austin) | L1461, L1470, L1477, L1491 (18+16+16+12 = 62), L2054; L1802 "University of Texas · National Rank #34" | No "61" left. |
| LAT-3 | **RESOLVED** (was PARTIAL) | L2091 "evenly with each day on three of the five rows. The two rows ending at 4:30 break the pattern"; L2321–2322 and L2326 "mostly linear pricing" | Recount of the Cost Planner (L2117–2148): TK/K 2:55, TK/K 6:00 and Gr 1–5 6:00 are exactly 5× the 1-day rate; TK/K 4:30 ($2,300 / $2,540) and Gr 1–5 4:30 ($1,880) break it. Agrees with L2097, the watch-out L2340, the ask L2342 and FA L2931. The "two days to 4:30 pays for exactly that" claim still holds on both 4:30 rows ($1,270 = 2×635, $590 = 2×295). |
| LAT-5 | RESOLVED | L144 tile 122; `metricValues.ts:180` '122'; L239 "Shown here as 105 entries"; L241 "105 courses" | |
| LAT-6 | RESOLVED | L239 "Drama and Music share a tab, and Online Courses lists no course"; L240 has 11 tabs | |
| LAT-7 | RESOLVED | L2543 "One of the two most-repeated camps shown" | |
| LAT-8a | RESOLVED | L880 "Lower School · TK–5", L882 "Middle School · 6–8", L881 Grade 5 parenthetical | |
| LAT-8b | RESOLVED | L934–936 "(5–12)"; L944 "from Grade 5" | |
| LAT-9 | RESOLVED (deviation: C label, 25) | L728–730 "22 of the 27 … plus three groups it lists separately"; chips 7+5+4+4+3+2 = 25 | |
| LAT-10 | RESOLVED | L843 "at the 2025 Nationals"; L2034 "At 2025 Nationals" | |
| LAT-11 | RESOLVED | L1285–1287 '24–25 RUNNER-UP 336 pts, '25–26 "—"; Cup L1243 "runner-up 2025" | |
| LAT-12 | RESOLVED | L1015 "Fall · 9 varsity"; 9 + 6 + 9 = 24 | |
| LAT-13 | UNCHANGED BY DECISION | L2066–2067 "≈$930/mo · Cost of after-school care" | Compare qual still states the basis. |
| LAT-D1 | UNCHANGED BY DECISION | L2351, L2357, L2844 (232 / 169 / "89 of the 232") | |
| X2 (Latin) | RESOLVED | L2359 "66 of the 169 camp titles … covering 104 of the 232 offerings"; L2362 "66 of 66" | |
| X3 (Latin) | RESOLVED | L1467, L1980–1981 "~38:1"; `metricValues.ts:1042` | |
| X4 (Latin) | RESOLVED | 122 / 122 / 122 + "shown here as 105" | |
| X5 (Latin) | RESOLVED | `scripts/check_tuition_rows.mjs:66` msStart 6; `metricValues.ts:1110` "(grades 1–5)", :1122, :1164 quals; `run-ms12` $251,600 (`:1276`) | |
| LAT-R1 | **RESOLVED** | L2942 "26 Feb · 9 Apr — Award decisions are communicated on notification day: 26 February 2027 for TK and K, 9 April 2027 for Grades 1–11. No enrollment-contract date is published…"; L2951 timing clause dropped; source cited `financialAidReports.ts:1484` | Agrees with Admissions L47–48, L66, L69, L71, L108–114 (Feb 26 / Apr 9, no contract date, nothing for Gr 12). No other "not published" restatement of award timing remains (FA Q1–Q9 L3023–3031 do not ask it). |
| LAT-R2 | **RESOLVED** (B, attributed) | L1039 "The school publishes "17 sports / 66 teams", but its own athletics directory lists 16 sports, as 24 boys' and girls' varsity programs. The school does not say what the 17th sport is." Tile L1006–1007 stays 17; headline L1004–1005 "17 sports" is the school's figure. | Recount L1015–1038: 16 distinct sports, 24 programs. "17" appears nowhere else on the page or on Compare. |

## Part 1b — plan `consistency` findings (`consistency-data/findings.md`), re-checked on pages3

| id | status | where (pages3 line / file:line) | note |
|---|---|---|---|
| Seed 1 (AP 22/23) | RESOLVED | L146, L239, L1944 | via LAT-1a/1b. |
| Seed 2 (P4 61 vs 62) | RESOLVED | L1461–1491 | via LAT-2. |
| Seed 3 ($1,180 vs $1,880) | RESOLVED | L2133 $1,880; FA L2931 | via LAT-3. |
| Seed 4 (~1:38) | RESOLVED | L1467, L1980 | via X3. |
| Seed 5 (pipeline) | RESOLVED (was already) | L1323–1336: 63 / 22 / 8; bars 8+4+3+2+1+1+1+1+1 = 22 | Recount of the roster L1350: 60 rows 2024–26 (22 D1 incl. 8 P4, 4 D2, 34 D3) + 3 unlisted dance/cheer = 63; '27 Greathouse is the "+1" in "61 of 61" and the "1 current seniors committed" tile (L1002–1003). |
| Seed 6 (56 of 232) | RESOLVED | L2359 | via X2. |
| Seed 7 (129/122/105) | RESOLVED | L144, L239 | via LAT-5. |
| Seed 8 (Arts TK–4/5, 5–8) | RESOLVED | L880–882 | via LAT-8a/b, X5. |
| X1 | RESOLVED (Latin was clean) | L1328–1336 | Bars equal roster D1 by sport; P4 shares Swimming 4 (Clontz, Monk, Hill, Spinner), Lacrosse 2, Golf 1, Football 1 = 8. |
| X2 | RESOLVED | L2359 | |
| X3 | RESOLVED | L1467, L1980–1981 | |
| X4 | RESOLVED | L144, L239, L241 | |
| X5 | RESOLVED | as Part 1 | |
| X6, X7 | n/a | — | Do not touch Latin. |
| LAT-1a | RESOLVED | L146; `metricValues.ts:235` | |
| LAT-1b | RESOLVED | L239, L1944, L2057 | |
| LAT-2 | RESOLVED (deviation) | L1461–1491, L1802, L2054 | |
| LAT-3 | RESOLVED | L2091, L2097, L2117–2148, L2321–2326, L2340, L2342, L2931 | Fully landed after consistency2. |
| LAT-5 | RESOLVED | L144, L239 | |
| LAT-6 | RESOLVED | L239 | |
| LAT-7 | RESOLVED | L2543 | |
| LAT-8a | RESOLVED | L880–882 | |
| LAT-8b | RESOLVED | L934–936, L944 | |
| LAT-9 | RESOLVED (deviation) | L728–730 | |
| LAT-10 | RESOLVED | L843 | |
| LAT-11 | RESOLVED | L1285–1287 | |
| LAT-12 | RESOLVED | L1015 | |
| LAT-13 | UNCHANGED BY DECISION | L2066–2067 | |
| LAT-D1 | UNCHANGED BY DECISION | L2351, L2357, L2844 | |

## Part 2 — fresh sweep, new findings only

| # | school | section(s) | value A (where: file:line) | value B (where: file:line) | category | evidence | proposed change |
|---|---|---|---|---|---|---|---|
| LAT-S1 | Latin (root cause is cross-school) | College Support › Where Graduates Go: "Top-75 National Universities" bucket row and stat tile; Compare `nu75` cell + qual | "73 / 75" (`collegeSupportPrograms/charlotte-latin.ts:705`; page L1455–1457, L1487–1488); Compare `'73 / 75'` (`metricValues.ts:626`) and qual "73 of the top 75 National Universities appear on Charlotte Latin's published … lists" (`:647`). Read literally, 2 are missing. | The same card names **four** top-75 National Universities as absent: "Ivy Plus — absent Columbia, Johns Hopkins and Caltech" (L1484) and Power Four "The ones missing are Minnesota…" (L1470). By the site's own rank master, 6 are absent: Caltech #5, Johns Hopkins #9, Columbia #12, Minnesota #59, UC Merced #69, Binghamton #73 (`src/data/collegeRankings.ts`; none of the six is on the 337-row list, recount by name and alias). | A | Internal recount, no fetch. `COLLEGE_RANKINGS` holds **79 distinct institutions at National Rank #75 or better** (ties: seven at #73, ten at #59, eight at #34…). Latin has 73 `nu75` rows; 73 + 6 = 79. The "/75" is a nominal label, not the size of the tie-inclusive cohort the `nu75` rule (check:buckets: "inclusive at 75, and ties count") selects. Same cause elsewhere, outside this group: Providence Day has **78** `nu75` rows yet shows "75 / 75" (`metricValues.ts:632`), Charlotte Country Day **76** rows shown "75 / 75" (`:625`), Cannon 75 rows "75 / 75". No rule catches it: check:buckets audits each row's `cats` against its rank label, never the tier count; R5 reads "absent …" lists only, and the top-75 row has none (its absences are named on other tiers). The master only holds colleges on some school's list, so 79 is a lower bound on the US News cohort. | Use the tie-inclusive cohort as the denominator for every school: Latin "73 / 79" at `charlotte-latin.ts:705` and `metricValues.ts:626`, qual "73 of the 79 National Universities ranked #75 or better (ties included) appear…". Confirm 79 against the US News 2027 National table (`source-material/college-support/_shared/US News 2027 - Rank Labels.md`) before shipping; if that is not possible, keep "/75" and add the C label "ranked #75 or better; ties make the group larger than 75". Derive the tier count from the list rather than typing it (a new consistency rule). Recheck PD/CCD/Cannon in their groups, plus the `lac75` rows (the master holds only 66 `Liberal ≤75` entries, so it cannot test them). Figures only, so this is single-phase apart from the qual sentence (prose, Phase 2). |

> **LAT-S1 is CLOSED, no change (user ruling 2026-11-21).** The 75 / 75 cap is the settled rule from PR #317. See `.claude/skills/consistency-self-scan/settled.md` S1. A later rescan marks it UNCHANGED BY DECISION and never re-raises it.

## Part 3 — R8 triage (`r8b.txt`, charlotte-latin)

- **teams: 66 vs 34** — not a conflict (in r8.txt too). 66 is the school's team count; 34 is the computed V/JV/MS chip total, and the footnote (L1039) explains the basis.
- **camps: 232 vs 169** — **NEW since r8.txt** (the regex fix surfaced it). Not a conflict: 232 offerings vs 169 distinct titles, both labelled (L2357). The totals themselves are LAT-D1, unchanged by decision.
- **seniors: 1 vs 151 vs 38** — not a conflict (in r8.txt). "1" parses "~38:1"; 151 is the 2026–27 senior class; 38 = 151 ÷ 4. New source in r8b, `counseling.flags[0]`, is a dev-only verify flag giving the same 151.
- **students: 12 vs 1500 vs 20 vs 22 vs 5** — not a conflict (in r8.txt). Trip caps (12, 20), the 2025 Québec group (22), the arts "1,500+ students" (FA's 1,555 agrees), a course description's "5". The `wholeClass.support[1]` "12" is a parse of "9–12 student".
- **AP: 24 vs 23** — not a conflict (in r8.txt). LAT-1b's attributed split; the Compare qual names both.

## Checked and consistent

- **The six changed lines** and every restatement of them: Hawks' Club linearity (L2091, L2097, L2321–2326, L2340, L2342, FA L2931, Q9 L3031); award dates (Admissions L47–48, L66, L69, L71, L108–114 vs FA L2942); sports count (L1004–1007, L1039, Compare has no sports-count cell for Latin).
- **Admissions:** Jan 2 vs Jan 15 = 13 days, "two weeks" to the aid deadline, notification days, Gr 12 nothing published, $2,500 deposit (= FA L2914, L2993), assessment by band, nine staff.
- **Course Offerings:** LS 11 rows / 3 groupings; MS 23 described courses in 5 departments + 6 electives = 29; US 105 rows, 23 AP tags, 11 tabs.
- **Global Exposure:** 22 trips (8 + 5 + 7 + 2); 2026–27 six US + two MS; 7 sister schools in 6 countries on 4 continents; 5 visiting groups; ten questions; Québec 22 and South Africa 12 restated alike.
- **Clubs:** chips 25; six competitive programs; three societies; 150 hours; 3,396 hours.
- **Arts:** five 2026–27 productions; Blumey ledger vs verdict and ask; six studios; 1 AP; ensembles 5–12.
- **Sports:** 9 + 6 + 9 = 24 programs / 16 sports; 8 titles in the matrix vs Cup point sources (years agree for golf, wrestling, girls lacrosse, swimming, girls golf); win % arithmetic (60–19 .759, 42–19 .689, 45–38 .542, 17–15 .531); Cup table leads (+87.5, +92.5, +142.5, +42.5, +27.5, +71.25), −2.5 gap, 690 = 277.5 + 205 + 207.5, PD 692.5; 0/6 Cups vs "most recently in 2019"; 18 Cups per the Cup standings record; pipeline as Part 1b; Berger 32 years; Hoover six years; four S&C coaches; three trainers.
- **College Support:** 337 / 132; Ivy 7/8, Ivy Plus 14/17 (three named absences); P4 62 = 18 + 16 + 16 + 12; NC table sums 734 / 334 / 45.5% and every 5-year rate, Compare NC cells; SAT 658.5 + 650.0 = 1308.5, 646.2 + 656.8 = 1303.0; ACT composites 27.2 / 28.8 from their four sections; grade shares 63% / 57%; National Merit "more than half the 20"; 92% / 75% / 833 exams; seven open-enrollment APs (profile); office of 9; 9+ years; ~38:1.
- **After School:** every Cost Planner row; $3,000 → $6,000 → ≈$33; TK/K cliff $1,725 / $3,450 / 85 min; $9,300; $2,950; 27 enrichment classes; Compare qual (4.5 hours = 1:30–6:00).
- **Summer:** 7 weeks June 8–July 31 minus July 4; $245–$850; planner 3 × $495 + $45 = $1,530, ≈$102 a day over 15 days; Super Care $25 saving.
- **Financial Aid:** 14 components, 8 unpriced (57%); 8-payment plan May–Dec; $469,800, $146,000; $3.25M / 6% / $17,900 / 36 / 14% match the Compare cells.
- **Looked at and not reported** (not value conflicts): CS "Depth past the AP catalog" names courses from the 2026–27 profile (Honors Greek I–IV, "(H)" Civil Engineering and Engineering in Motion, Intro Bioengineering) that the course-offerings list shows differently or not at all. The record (`School Profile 2026-2027.md` L509–514) documents this as a profile-vs-course-page difference, and no count conflicts. FA "class trip advance (gr. 5–8, 12)" vs Global Exposure "Middle School class trips beginning in 6th grade" are different scopes on two school pages (Source URLs record L97, L102). A dev-only verify flag uses 589 Upper Schoolers (2026–27) while FA shows 586 (2025–26 profile), labelled by year. FA section meters (e.g. Aid Engine 86%) are hand-set judgments with no rubric, so they cannot be recomputed after LAT-R1.

**Source-material files touched: none.**
