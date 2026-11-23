# Consistency rescan 6: Providence Day, Charlotte Country Day, Cannon (main 638a4d3e, 2026-11-23)

Page lines (`L<n>`) are lines of `rescan6/pages/<slug>.txt`. In the carried rows, "L<a> → L<b>" maps the line round 5 cited (its dumps match the 5d26847a build in `pages-before/`) to the same, unchanged line today. Only 29 (PD), 41 (CCD) and 111 (Cannon) lines of today's dumps are new since 5d26847a; every one of them was read. No page-dump diff was printed.

## Part 1: regression check of round 5

**168 rows: 160 RESOLVED · 0 NOT RESOLVED · 1 PARTIAL · 7 UNCHANGED BY DECISION.** That is the 135 rows round 5 checked (128 RESOLVED, 7 UNCHANGED BY DECISION), plus 33 of round 5's own: its 28 new rows for these schools, PD-U14, X2 at PD and CCD, and two plan-step rows (5a, 6). CAN-T17 is counted once, in the carried rows. Round 5's CCD-T21 PARTIAL and CAN-T17 hold are both closed.

### Round 5's own rows (Part 2 of rescan5, plus Step 5 and plan step 5)

| id | status | where (page line or file:line) | note |
|---|---|---|---|
| PD-U1 | RESOLVED | PD L1788, L1817 · CCD L1673, L1702, L2294 · Compare `bucket-hbcu` | 15 / 107 and 20 / 107 at bucket, table, Edge and both Compare cells and quals. Tags recounted from the data: PD 15, CCD 20 |
| PD-U2 | RESOLVED | PD L1609; `sportsPrograms/providence-day.ts` ~L176–183 | '23–24 RUNNER-UP with no record (recorded deviation, `toVerify`); note "Lost the '24 and '26 finals to Cannon" agrees with Cannon L1114, L1150 |
| PD-U3 | RESOLVED | PD L1561–1562, L1610 | "tied for the most" (recorded deviation: Durham not named); Durham's girls track added to the list |
| PD-U4 | RESOLVED | PD L1979 | "Miami University–OH · National Rank #133" |
| PD-U5 | RESOLVED | PD L2520 | JUN–JUL, against L2746 "June 1 to July 31, 2026" |
| PD-U6 | RESOLVED | PD L2875, L2903 | Both descriptions name their own grade spans. The remaining superlative (Soccer, "widest grade span of any sports camp here — TK through 9", L3064) was checked against all 13 sports rows: true |
| PD-U7 | RESOLVED | PD L3326, L3344–3345 | Activity Days row added; 18 = 8 priced + 10 unpriced, 56%, recounted |
| PD-U8 | RESOLVED | PD L2469 | "A deep international pipeline" |
| PD-U9 | RESOLVED | PD L1740–1742 | Headline and tile dated to the 2024 preseason; source added |
| PD-U10 | RESOLVED | PD L1641 | "ESPN’s No. 4" |
| PD-U11 | RESOLVED | PD L2387 | "by the school’s count (the three categories add to 26)" |
| PD-U12 | RESOLVED | PD L1700 | Ruled wording: "for the program, 2000–20 (he took over in 2002)" |
| PD-U13 | RESOLVED | PD L1687, L1689 | Ruled wording, now settled S12 |
| PD-U14 | RESOLVED | PD L1653 | Elon football "CAA" |
| X2 (PD) | RESOLVED | PD L1562, L1576, L1617, L1748–1749 | Fall 2026 football title and girls tennis runner-up; "5 titles in 6 seasons, 2021–26"; "6 straight … 2021–26". The Cup card's point sources (L1555, "2021, 2022, 2023, 2025") stay inside the Cup's 2020–21 to 2025–26 window, as the plan directs |
| CCD-U1 | RESOLVED | CCD L3209–3222, L3281 | 12 = 6 priced + 3 range + 3 unpriced, 25% + 25%, recounted; Q3 names conference days |
| CCD-U2 | RESOLVED | CCD L1616–1617 | Clause gone; ledger row "Sierra Simpson · Girls Basketball Program Head"; turnover still four |
| CCD-U3 | RESOLVED | CCD L1588–1589, L1599, L1607, L1609 | Attributed; kicker "since 1987" (review fix); `toVerify` on the tenure row |
| CCD-U4 | RESOLVED | CCD L1208 | "the second with The Crane Wife" |
| CCD-U5 | RESOLVED | Compare `us-organizations` qual | "The club catalog names 11; the school also names nine affinity groups, one of them in both lists." (Interfaith Club, L958 and L979) |
| CCD-U6 | RESOLVED | CCD L1678–1679, L1685, L2293 | "up from 23 by the school’s count … the state’s Fall 2025 data shows 20" at all four sites |
| X2 (CCD) | RESOLVED | CCD L1471–1472, L1485, L1492, L1524, L1611 | Tennis streak dated 2022–25; field hockey 2025 and fall 2026; "4 titles, 2017–25". Matrix counts recounted: 4 / 4 / 2 titles, 2 runners-up in '25–26 |
| CAN-U1 | RESOLVED | Cannon L553, L561, L582; Compare qual | Honor Council under Governance, 16 of 16 (Governance · 4); ≥21 = 9 named Upper School orgs + 12 |
| CAN-U2 | RESOLVED | Cannon L378 | Agrees with Clubs L568–569 |
| CAN-U3 | RESOLVED | Cannon L843 | New ask. The "7:30 a.m." sentences (L730, L793, L841) are not contradicted: College Support gives no clock time |
| CAN-U4 | RESOLVED | Cannon L704; Compare | "15 Blumey finalists"; ledger recounted 5 + 5 + 5 (2026, 2025, 2023), 2024 absent |
| CAN-U5 | RESOLVED | Compare `advanced-arts-coursework` qual | Agrees with L836 and the `advanced-courses` qual |
| CAN-U6 | RESOLVED | Cannon L743, L757 | Both titles, attributed |
| CAN-U7 | **PARTIAL** | Cannon L836 fixed; L833–834 (`artsPrograms/cannon.ts` L346) not | The point label "weighted like academics" was changed because, per the recorded deviation, it "was false by the fix's own text". The Verdict headline two lines above still says "An arts department that weights the arts like academics — 24 courses all at honors or above". Not caused by a new edit; the restatement was missed. Fix (C): "An arts department that sets every arts course at an academic level — 24 courses all at honors or above, a two-year requirement, and a documented strategic mission." |
| CAN-U8 | RESOLVED | Cannon L2300, L2398 | Both descriptions match their rows (14–17; Weeks 1, 3, 5, 7) |
| CAN-U9 | RESOLVED | `sportsPrograms/cannon.ts` L212 | "2023 volleyball title" (Show sources) |
| Plan 5a extras (Cannon) | RESOLVED | Cannon L1916, L1963, L2135–2137 | "no paid care program" before school (recorded deviation); music flag K–12; 31 distinct classes; $15–$30, $125–$240, 5–15 meetings, recounted from the 31 fees (Chess $125 = 5 meetings, Let's Get Organized $225 = 15) |
| Plan step 6 (these schools) | RESOLVED | CCD L1149, L2463 · Cannon L2791 | "Entry-level groups", "is published", "$300–$500". Cannon's other two ranges ("$600–1,200", "$0–500") keep one dollar sign by the recorded rule |

### Rows round 5 carried (rescan5 Part 1)

| id | status | where (round-5 line → today) | note |
|---|---|---|---|
| X1 (Cannon) | RESOLVED | Cannon L1159 → L1161 | Cited line identical to the 5d26847a build |
| X2 | RESOLVED | PD L2747 → L2747; CCD L2517 → L2524; Cannon L2119 → L2165 | Cited line identical to the 5d26847a build |
| X3 (CCD) | RESOLVED | CCD L2223 → L2230 | Cited line identical to the 5d26847a build |
| X4 | RESOLVED | PD L285 → L285; CCD L251 → L251; Cannon L104 → L104 | Cited line identical to the 5d26847a build |
| X5 (PD) | RESOLVED | PD L3427 → L3428 | Cited line identical to the 5d26847a build |
| X6 (PD) | RESOLVED | PD L3326, L3345 | Superseded by PD-U7: 18 items, 8 priced, 10 unpriced, 56%, recounted from the data |
| X6 (CCD) | RESOLVED | CCD L3209, L3222 | Superseded by CCD-U1: 12 items, 6 priced, 3 range, 3 unpriced, recounted |
| X7 | RESOLVED | `metricValues.ts` `aftercare-cost` note | Not touched by round 5; re-read in the data |
| PD-4 | RESOLVED | PD L816 → L816 | Cited line identical to the 5d26847a build |
| PD-17 | RESOLVED | PD L1091 → L1091 | Cited line identical to the 5d26847a build |
| PD-18 | RESOLVED | PD L1100 → L1100 | Cited line identical to the 5d26847a build |
| PD-19 | RESOLVED | PD L901 → L901 | Cited line identical to the 5d26847a build |
| PD-20 | RESOLVED | PD L1179 → L1179 | Cited line identical to the 5d26847a build |
| PD-23 | RESOLVED | PD L285 → L285 | Cited line identical to the 5d26847a build |
| PD-24 | RESOLVED | PD L175 → L175 | Cited line identical to the 5d26847a build |
| PD-25 | RESOLVED | PD L3350 → L3351 | Cited line identical to the 5d26847a build |
| PD-26 / PD-R7 | RESOLVED | PD L603 → L603; PD L883 → L883 | Cited line identical to the 5d26847a build |
| PD-27 | RESOLVED | PD L1172 → L1172 | Cited line identical to the 5d26847a build |
| PD-28 | RESOLVED | PD L552 → L552; PD L45 → L45 | Cited line identical to the 5d26847a build |
| CCD-5 | RESOLVED | CCD L1678 | "admitted" kept; the line was reworded by CCD-U6 |
| CCD-7 | RESOLVED | CCD L1678–1679, L2307 | Still attributed; reworded by CCD-U6 |
| CCD-8 | RESOLVED | CCD L1009 → L1009 | Cited line identical to the 5d26847a build |
| CCD-9 | RESOLVED | CCD L1161 → L1167 | Cited line identical to the 5d26847a build |
| CCD-10 | RESOLVED | CCD L2463 | Both counts still attributed; "exists" became "is published" |
| CCD-11 | RESOLVED | CCD L873 → L873 | Cited line identical to the 5d26847a build |
| CCD-12 | RESOLVED | CCD L1230 → L1236 | Cited line identical to the 5d26847a build |
| CCD-24 | RESOLVED | CCD L251 → L251 | Cited line identical to the 5d26847a build |
| CCD-27 | RESOLVED | CCD L607 → L607 | Cited line identical to the 5d26847a build |
| CCD-28 | RESOLVED | CCD L2295 → L2302 | Cited line identical to the 5d26847a build |
| CCD-29 | RESOLVED | CCD L968 → L968 | Cited line identical to the 5d26847a build |
| CAN-3 | UNCHANGED BY DECISION | Cannon L2157, L2163 | S4; 251 unchanged on the tile, headline and Compare |
| CAN-13 | RESOLVED | Cannon L865 → L867 | Cited line identical to the 5d26847a build |
| CAN-14 | RESOLVED | Cannon L708 → L710; Cannon L769 → L771 | Cited line identical to the 5d26847a build |
| CAN-15 | RESOLVED | Cannon L1950 → L1952 | Cited line identical to the 5d26847a build |
| CAN-16 | RESOLVED | Cannon L2815 → L2861 | Cited line identical to the 5d26847a build |
| CAN-24 | RESOLVED | Cannon L104 → L104 | Cited line identical to the 5d26847a build |
| PD-R1 | RESOLVED | PD L2464 → L2464 | Cited line identical to the 5d26847a build |
| PD-R2 | RESOLVED | PD L1278 → L1278; PD L1303 → L1303 | Cited line identical to the 5d26847a build |
| PD-R3 | RESOLVED | PD L2394 → L2394 | Cited line identical to the 5d26847a build |
| PD-R4 | RESOLVED | PD L1794 → L1794 | Cited line identical to the 5d26847a build |
| PD-R5 | RESOLVED | PD L1639 → L1639 | Cited line identical to the 5d26847a build |
| PD-R6 | RESOLVED | PD L786 → L786 | Cited line identical to the 5d26847a build |
| CCD-R1 | RESOLVED | CCD L1156 → L1162 | Cited line identical to the 5d26847a build |
| CCD-R2 | RESOLVED | CCD L1053 → L1053 | Cited line identical to the 5d26847a build |
| CCD-R3 | RESOLVED | CCD L2925 → L2932 | Cited line identical to the 5d26847a build |
| CCD-R4 | RESOLVED | CCD L2517 → L2524 | Cited line identical to the 5d26847a build |
| CCD-R5 (CCD) | RESOLVED | CCD L3266 → L3275 | Cited line identical to the 5d26847a build |
| CCD-R5 (Cannon) | RESOLVED | Cannon L2825 → L2871 | Cited line identical to the 5d26847a build |
| CCD-R6 | RESOLVED | CCD L2343 → L2350 | Cited line identical to the 5d26847a build |
| CCD-R7 | RESOLVED | CCD L1156 → L1162 | Cited line identical to the 5d26847a build |
| CCD-R8 | UNCHANGED BY DECISION | CCD L3241–3245 | S7; ladder and the "design targets, not awards actually granted" note unchanged (endowment page not re-fetched) |
| CAN-R1 | RESOLVED | Cannon L793 → L795 | Cited line identical to the 5d26847a build |
| CAN-R2 | RESOLVED | Cannon L829 → L831 | Cited line identical to the 5d26847a build |
| PD-S1 | RESOLVED | PD L1241 → L1241 | Cited line identical to the 5d26847a build |
| PD-S2 | RESOLVED | PD L703 → L703 | Cited line identical to the 5d26847a build |
| CCD-S1 | RESOLVED | CCD L2516 → L2523 | Cited line identical to the 5d26847a build |
| CCD-S2 (CCD) | RESOLVED | CCD L2680 → L2687 | Cited line identical to the 5d26847a build |
| CCD-S2 (Cannon, three priced rows) | RESOLVED | Cannon L2268 → L2314 | Cited line identical to the 5d26847a build |
| CCD-S2 (Cannon, four rows with no recorded price) | UNCHANGED BY DECISION | Cannon L2421 → L2467 | Standing ruling or out-of-scope decision; values unchanged |
| CCD-S3 | RESOLVED | CCD L2169 → L2176 | Cited line identical to the 5d26847a build |
| Research finding: PD bus fares | RESOLVED | PD L3402 → L3403; PD L3301 → L3301 | Cited line identical to the 5d26847a build |
| Scope addition: linked Financial Aid sources (3 schools) | RESOLVED | `financialAidReports.ts`, the three reports | Not touched by round 5; re-read in the data |
| Review 1, PD-S1 second card | RESOLVED | PD L1257 → L1257 | Cited line identical to the 5d26847a build |
| Review 1, drop "band/jazz" from step 01 | UNCHANGED BY DECISION | PD L1256 → L1256 | Standing ruling or out-of-scope decision; values unchanged |
| Review 5, CCD-R8 source lines | RESOLVED | `financialAidReports.ts` CCD sources | Not touched by round 5; re-read in the data |
| Second pass 2, "retrieved 22 Nov 2026" | RESOLVED | same lines | Not touched by round 5; re-read in the data |
| Capped pass 7, PD footer dates | RESOLVED | PD L3301 → L3301 | Cited line identical to the 5d26847a build |
| Optional polish, PD-R4 bare "100%" tile | UNCHANGED BY DECISION | PD L1796 → L1796 | Standing ruling or out-of-scope decision; values unchanged |
| Optional polish, CCD-R1 ladder label | UNCHANGED BY DECISION | CCD L1087 → L1093 | Standing ruling or out-of-scope decision; values unchanged |
| PD-T1 | RESOLVED | PD L2362, L2469 | Names still gone; L2469 now "deep international pipeline" (PD-U8) |
| PD-T2 | RESOLVED | PD L3402 → L3403; PD L3443 → L3444 | Cited line identical to the 5d26847a build |
| PD-T3 | RESOLVED | PD L3301 · CCD L3178–3180 | Both headers dated; CCD adds "Extended Day registration fees 22 Nov 2026" |
| PD-T4 | RESOLVED | PD L3326, L3345 | Superseded by PD-U7 (18 = 8 + 10, 56%) |
| PD-T5 | RESOLVED | PD L2730 → L2730 | Cited line identical to the 5d26847a build |
| PD-T6 | RESOLVED | PD L2712 → L2712 | Cited line identical to the 5d26847a build |
| PD-T7 | RESOLVED | PD L2624 → L2624; PD L3334 → L3334 | Cited line identical to the 5d26847a build |
| PD-T8 | RESOLVED | PD L3207 → L3207 | Cited line identical to the 5d26847a build |
| PD-T9 | RESOLVED | PD L3043 → L3043 | Cited line identical to the 5d26847a build |
| PD-T10 | RESOLVED | PD L2481 → L2481 | Cited line identical to the 5d26847a build |
| PD-T11 | RESOLVED | PD L2360 → L2360; PD L2477 → L2477 | Cited line identical to the 5d26847a build |
| PD-T12 | RESOLVED | PD L1111 → L1111 | Cited line identical to the 5d26847a build |
| PD-T13 | RESOLVED | PD L1060 → L1060 | Cited line identical to the 5d26847a build |
| PD-T14 | RESOLVED | PD L1303 → L1303 | Cited line identical to the 5d26847a build |
| PD-T15 | RESOLVED | PD L1303 → L1303 | Cited line identical to the 5d26847a build |
| PD-T16 | RESOLVED | PD L2393 → L2393 | Cited line identical to the 5d26847a build |
| PD-T17 | RESOLVED | PD L750 → L750 | Cited line identical to the 5d26847a build |
| PD-T18 | RESOLVED | Compare `summer-care-span` qual | Not touched by round 5; re-read in the data |
| PD-S1w | RESOLVED | PD L1257 → L1257 | Cited line identical to the 5d26847a build |
| CCD-T1 | RESOLVED | CCD L3209, L3222, L3281 | Superseded by CCD-U1. Still no all-in total, per Approvals |
| CCD-T2 | RESOLVED | CCD L3210 → L3217 | Cited line identical to the 5d26847a build |
| CCD-T3 | RESOLVED | CCD L2463, L3279 | Attributed at every site |
| CCD-T4 | RESOLVED | CCD L3270 → L3279 | Cited line identical to the 5d26847a build |
| CCD-T5 | RESOLVED | CCD L3176 → L3183 | Cited line identical to the 5d26847a build |
| CCD-T6 | RESOLVED | CCD L2459 → L2466 | Cited line identical to the 5d26847a build |
| CCD-T7 | RESOLVED | CCD L2344 → L2351 | Cited line identical to the 5d26847a build |
| CCD-T8 | RESOLVED | Compare `latest-pickup` qual | Not touched by round 5; re-read in the data |
| CCD-T9 | RESOLVED | CCD L2168 → L2175 | Cited line identical to the 5d26847a build |
| CCD-T10 | RESOLVED | CCD L821 → L821 | Cited line identical to the 5d26847a build |
| CCD-T11 | UNCHANGED BY DECISION | CCD L2130, L2146 | S9; label, figures and caveat unchanged |
| CCD-T12 | RESOLVED | CCD L251 → L251 | Cited line identical to the 5d26847a build |
| CCD-T13 | RESOLVED | CCD L2210 → L2217; CCD L2300 → L2307 | Cited line identical to the 5d26847a build |
| CCD-T14 | RESOLVED | CCD L1690 → L1697; CCD L2175 → L2182 | Cited line identical to the 5d26847a build |
| CCD-T15 | RESOLVED | CCD L2282 → L2289 | Cited line identical to the 5d26847a build |
| CCD-T16 | RESOLVED | CCD L2166 → L2173 | Cited line identical to the 5d26847a build |
| CCD-T17 | RESOLVED | CCD L1220 → L1226 | Cited line identical to the 5d26847a build |
| CCD-T18 | RESOLVED | CCD L1165 → L1171 | Cited line identical to the 5d26847a build |
| CCD-T19 | RESOLVED | CCD L1206 → L1212 | Cited line identical to the 5d26847a build |
| CCD-T20 | RESOLVED | CCD L735 → L735 | Cited line identical to the 5d26847a build |
| CCD-T21 | RESOLVED | CCD L945, L1051–1063 | World Quest and Euro Challenge rows added, school-reported; verdict "Model UN and World Quest lead" |
| CCD-T22 | RESOLVED | CCD L3071 → L3078 | Cited line identical to the 5d26847a build |
| CCD-T23 | RESOLVED | CCD L2343 → L2350 | Cited line identical to the 5d26847a build |
| CCD-T24 | RESOLVED | CCD L3031 → L3038 | Cited line identical to the 5d26847a build |
| CAN-T1 | RESOLVED | Cannon L1153 → L1155 | Cited line identical to the 5d26847a build |
| CAN-T2 | RESOLVED | Cannon L1153 → L1155 | Cited line identical to the 5d26847a build |
| CAN-T3 | RESOLVED | Cannon L2742 → L2788 | Cited line identical to the 5d26847a build |
| CAN-T4 | RESOLVED | Cannon L1952 → L1954 | Cited line identical to the 5d26847a build |
| CAN-T5 | RESOLVED | Cannon L391 → L391 | Cited line identical to the 5d26847a build |
| CAN-T6 | RESOLVED | Cannon L1963, L1966, L2136 | Superseded by plan step 5a: 31 rows, $15–$30 a class, $125–$240 a session, recounted from the data |
| CAN-T7 | RESOLVED | Cannon L2697 → L2743 | Cited line identical to the 5d26847a build |
| CAN-T8 | RESOLVED | Compare `aftercare-cost` qual and note | Not touched by round 5; re-read in the data |
| CAN-T9 | RESOLVED | Cannon L2704 → L2750 | Cited line identical to the 5d26847a build |
| CAN-T10 | RESOLVED | Cannon L2244 → L2290 | Cited line identical to the 5d26847a build |
| CAN-T11 | RESOLVED | Cannon L48 → L48 | Cited line identical to the 5d26847a build |
| CAN-T12 | RESOLVED | Cannon L1868 → L1870 | Cited line identical to the 5d26847a build |
| CAN-T13 | RESOLVED | Cannon L1808 → L1810; Cannon L1865 → L1867 | Cited line identical to the 5d26847a build |
| CAN-T14 | RESOLVED | Cannon L1867 → L1869 | Cited line identical to the 5d26847a build |
| CAN-T15 | RESOLVED | Cannon L626 → L628 | Cited line identical to the 5d26847a build |
| CAN-T16 | RESOLVED | Cannon L1795 → L1797 | Cited line identical to the 5d26847a build |
| CAN-T17 | RESOLVED | Cannon L1962–2137 | Plan step 5a: Session 2, 2026–27, Nov 30–Feb 5; Fri filter; Let's Get Organized one Mon/Wed row; refund line replaced; stale flag gone; ASP rates still flagged 2025–26 (L1954) |
| r4 X2 (Blumey census) | RESOLVED | PD L1211 → L1211; CCD L1117 → L1123; Cannon L756 → L758 | Cited line identical to the 5d26847a build |
| r4 X4 (camp days) | RESOLVED | the three summer planners | Not touched by round 5; re-read in the data |
| r4 X7 (null Arts cells) | RESOLVED | Compare Arts rows | Not touched by round 5; re-read in the data |
| r4 CC-T16 / S8 (Cannon) | RESOLVED | Cannon L1157 → L1159 | Cited line identical to the 5d26847a build |
| Late fix 1 (literal asterisks) | RESOLVED | PD L2462 → L2462 | Cited line identical to the 5d26847a build |
| Late fix 2 (CCD label) | RESOLVED | CCD L2173 → L2180 | Cited line identical to the 5d26847a build |

## Part 2: new findings

**4 findings (PD 3, of which two reach CCD and one reaches Cannon and five other schools; Cannon 1): A 2 · C 2.** None is UX-GATE or CHROME. Caused by round 5: PD-V2 in part (round 5 moved three schools to a second wording and left eight on the first); PD-V3 in part (CCD-U1 and PD-U7 set the "every Extended Day charge" basis that the two lists now apply unevenly).

| id | school | section(s) | value A (where) | value B (where) | category | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|
| PD-V1 | PD | College Support › Transcript tile and ask | "30 · AP courses in the profile’s course table, 29 of them examined in May 2026" (L2371–2372; `collegeSupportPrograms/providence-day.ts` L559). Ask: "Your profile names 30 AP courses but 29 subjects were examined in May 2026. Are AP German and AP Business with Personal Finance both running this year?" (L2481; L943) | The 29 are exam subjects, not courses: the profile's exam table splits "2-D Art and Design" / "3-D Art and Design" (one course, Art & Design) and "Physics C: Elec. & Mag." / "Physics C: Mechanics" (one course). Only 27 of the 30 courses have an exam row. AP Music Theory, which the Arts card and Compare count (L1177; `advanced-arts-coursework` qual), also has none, and the ask leaves it out | A | https://resources.finalsite.net/images/v1787160331/provday/uoyzvocbz4fm51bh8lqd/Collegeguidancecollegeprofile26-27updated.pdf, re-opened today (HTTP 200, text layer): 29 exam rows summing to 1,282; the course table names "AP Business & Personal Finance", "German" and "Music Theory", none of which has an exam row. Matches the committed record L172–205 and L230–243 | Tile label → "AP courses in the profile’s course table; its May 2026 score table covers 29 exam subjects". Ask → "Your profile names 30 AP courses, but AP German, AP Business with Personal Finance and AP Music Theory have no row in its May 2026 score table. Are all three running this year?" L555 and L806 ("all 29 subjects examined", "each of 29 subjects") are true and stay. Not a rule R1–R12 reads |
| PD-V2 | PD, CCD, Cannon (and Covenant Day, Gaston Day, Charlotte Catholic, Charlotte Christian, Hickory Grove) | College Support › Admission Rates table, university column | PD: "NC State University ↗Flagship STEM · Raleigh · the most selective of the six" (L2231; `collegeSupportPrograms/providence-day.ts` L474). CCD the same (L2097; `…/charlotte-country-day.ts` L464) | Cannon: "UNC-Chapel Hill ↗Flagship · Chapel Hill · the most selective of the six" (L1701; `…/cannon.ts` L429), and the same on five other pages (`covenant-day.ts` L63, `gaston-day.ts` L307, `charlotte-catholic.ts` L303, `charlotte-christian.ts` L328, `hickory-grove-christian.ts` L248). Latin, Carmel and Davidson Day now read "the lowest of the six in Fall 2025" | C | Internal. The label marks the campus with this school's lowest Fall 2025 rate (PD 32.4% and CCD 22.9% at NC State; Cannon 31.7% at UNC-CH), so each page is right for its own applicants. But it sits in the university-description column, where it reads as a fact about the university, and the site gives two answers. CLAUDE.md: the figure is "a joint property of school × university … label it accordingly" | Change `note` to "the lowest of the six in Fall 2025" at all eight schools, the form `check:ncsuper` already accepts (`LOW_LABELS[1]`), keeping each school's "Flagship · …" prefix. Data only, no chrome. Paths unchanged; nine locales re-translate eight short units |
| PD-V3 | PD and CCD | Financial Aid › Beyond Tuition vs After School | PD lists "Extended Day late pick-up · $1/min after 6 p.m." (L3330; `financialAidReports.ts` PD components) but not the "Unplanned schedule change $30 / hr" or the "Enrichment withdrawal, after 1 class $25" printed beside it on After School (L2599–2600). CCD lists Extended Day, its registration fees and conference days (L3216–3221) but not the late fee | CCD After School: "Late pickup: $10 per 10-minute interval after 6:00 p.m." (L2352) | A | PD fee document (https://docs.google.com/document/d/1_5u6M_MQtSRbLpKPYFjKqSXZB2pAV3McqIaD2TFhJWE/export?format=txt), today: "Late Fee: $1/minute after 6pm", "Adjustment Rate: $30/hour (unexpected circumstances)". https://www.charlottecountryday.org/bucsnet/after-school/extended-day, today: "late pick-ups after 6 pm are charged $10 per 10-minute interval". The $25 withdrawal fee is from the committed Fall 2026 enrichment packet (not re-fetched) | The basis is the user's call. Either (a) list every published Extended Day charge: PD adds "Extended Day adjustment rate · $30/hr" and "Enrichment withdrawal · $25" (20 items, 10 priced, 10 unpriced, 50%, still over the 33% bar); CCD adds "Extended Day late pickup · $10 per 10 minutes after 6:00 p.m." (13 items, 7 priced, 3 range, 3 unpriced, 23% + 23%; "So half have no set price" becomes "So 6 of the 13 have no set price"), updating title, aside and note at both; or (b) say in each `componentsNote` that late and adjustment fees are left out, and drop PD's late pick-up row (17 items, 7 priced, 10 unpriced, 59%). R11 cannot see an omitted row. Cannon's list is for a Grade 9 student, so its JrK–8 After School fees are correctly absent |
| CAN-V1 | Cannon | College Support › tile, Compare `ap-performance` row note and qual vs the ask | Tile "90% · of students scored 3+ (446 exams, 195 students, May 2026)" (L1801–1802); Compare qual "the school reports 90.16% of students with scores 3+"; row note "Cannon and Gaston Day report a share of students" (`metricValues.ts` ~L442) | Ask: "does the 90.16% count students or exams?" (L1888; `collegeSupportPrograms/cannon.ts` L841), and the dev-only flag (L571): "whether it is a share of students or of exams is not stated" | C | The committed 2026–27 profile record (L159–169) gives "Total Students 195", "Number of Exams 446", "Students with Scores 3+ 90.16%" and notes the denominator is unresolved. The live PDF (https://resources.finalsite.net/images/v1791909516/cannonschoolorg/i5lqf0krxcb4uejss6ul/Cannon_2526_Profile.pdf) returned HTTP 200 but has no text layer, so the record was used | Keep 90% and the ask. Tile label → "“Students with Scores 3+”, as the profile labels it (446 exams, 195 students, May 2026)". Qual → "… the profile labels 90.16% “Students with Scores 3+” but gives both 195 students and 446 exams, so its basis is not certain." Row note → "Cannon's profile labels its figure a share of students; Gaston Day reports a share of students" |

## Part 3: R8 triage

- Cannon · students 300/195/40/3/9: settled, values unchanged.
- Cannon · seniors 105/26: settled, values unchanged.
- CCD · teams 72/55: settled, values unchanged.
- CCD · institutions 1/150: settled, values unchanged.
- CCD · seniors 27/141: lost 32 since the round-5 report (the CCD-U6 tile label no longer parses as "32 seniors"). No new member; the remaining numbers are in the settled row. Not a conflict.
- CCD · students 341/347/12/15/10/20/17/1: settled, values unchanged.
- PD · teams 66/56: settled, values unchanged.
- PD · institutions 13/8/150/383/249: settled, values unchanged.
- PD · seniors 36/1/179: settled, values unchanged.
- PD · students 497/100/30/16/6/10/12/2/4/20/375/1: unchanged since round 5. Every member is a trip or program size or a different fact (the 16 is the summer 2027 trips' published maximum, per the committed 2027 Global Trips record L66). Not a conflict.
- No group for these schools is new since the round-5 report.

## Checked and consistent

- Every line of today's dumps that is new since 5d26847a (29 / 41 / 111), each against its restatements on the page and on Compare.
- Fall 2026 sports text: PD subhead, football note, season detail and the "6 straight" tile; CCD headline, subhead, notes and tenure row; the three "didn't win" lists against one another (same winners in every shared sport).
- Matrices against headlines: PD four '25–26 titles; CCD 4 / 4 / 2 plus two runners-up; Cannon three '23–24 titles and "four titles in six years". The Cup point-source lines against each matrix (seasons read as title years).
- Rosters, funnels and bars recounted from the data: CCD 47 rows + 1 cheer = 48, D1 28 by sport (9/7/2/2/1/1/1/5), P4 9 with 5 in swimming, 5 Ivy; Cannon 23/12/4, lacrosse 8 and 5 D1, seven '24 lacrosse players; PD Class of 2027 rows outside the funnel.
- Coaching: Hovis 24 years since 2002, Touma 39 years since 1987, Davis 36 years since 1990, Grier's 8 titles through 2025.
- Financial Aid components recounted for all three (PD 18, CCD 12, Cannon 10) against titles, asides and notes; the CCD Q3; the PD and CCD header dates.
- Cannon Beyond the Bell: 31 classes, day filter, fee ranges and meeting counts; per-afternoon $21 and the $69 drop-in example; the coverage map against the new "no paid care" wording.
- HBCU, Power Four and bold counts recounted from the tags (Cannon's 63 Power Four tags fold to 62 institutions, matching "62 / 68").
- Admission Rates: tiles and subheads at all three against the tables (CCD "The other four ran 59–100%" holds).
- Clubs: Cannon 16 of 16 and the ≥21 basis; CCD 11 of 11, the two new cluster rows and 15 affinity groups (9 + 5 + 1).
- Arts: the PD, CCD and Cannon Blumey ledgers against their headlines, honest-context lines, verdicts, asks and Compare cells.
- Compare: every value and qual for the three schools (54 rows each).
- "Not published" sweep (section 9) on all three dumps: no fact said to be unpublished is published elsewhere on the same page.
- PD Global Exposure: 19 trips, 16 countries, 4 homestays, the Middle School trips in the Compare qual. CCD: 10 + 6 + 4 = 20 trips.
- CCD After School: enrichment start offsets against the dismissal times; 13 published combinations.

## Seen, not counted

- CCD's "didn't win" list names boys lacrosse twice (as a runner-up loss to Durham Academy, and among Durham Academy's titles). Both say Durham; wording only, already in round 5's notes for the next round.
- Cannon College Support's "Two named Upper School learning-support staff" (L1787) leaves out the two Upper School ARC faculty on Learning Support (L529–530), but it matches that card's own "learning specialists and deans · two in the Upper School" tile (L402–403). Same basis, so not counted.
- PD's "about 178" Class of 2026 (L2337) sits beside "179 seniors" for the Class of 2027 (L2338). The record ties 178 to the 2025–26 profile. Different classes, both labelled.
- The cached Latest News section was not read.

## Files touched

- This output file, and scratch files in `rescan6/` (`ctx.py`, `map.py`, `map_out.txt`, `p1_old.md`, `head.md`, `mv-mine.txt`, `dl/`).
- Appended `### Re-verification 2026-11-23 (plan consistency6, self-scan)` at the end of the existing `## Method` section of:
  - `source-material/college-support/providence-day/Providence Day - College Support - School Profile 2026-2027.md`
  - `source-material/after-school/charlotte-country-day/CCD - After School - Redesign Research 2026.md`
  - `source-material/after-school/providence-day/Providence Day - After School - Redesign Research 2026.md`
- Nothing was built, ingested, staged or committed.

## Fetching and student names

- Four requests, none to a refused host, none with `-L`. finalsite.net (PD profile, 200; Cannon profile, 200 with no text layer), charlottecountryday.org (200), docs.google.com (307, Location read: docs.googleusercontent.com, then 200).
- No page-dump diff was printed. One `git diff --word-diff` of a regenerated Cannon After School content chunk printed its removed lines into this agent's output; one of them was a provider name that round 5 withheld. It was not copied into any file, append or this report.
- The appends quote course titles, fees and table counts only. No student is named in this file or in the appends.

## Settled, skipped

- S1: PD L1779, CCD L1664, Cannon L1286.
- S4: Cannon L2157, L2163 (251 unchanged).
- S7: CCD L3241–3245 (ladder unchanged; the endowment page was not re-fetched).
- S8: Cannon L1159, L1183 (the card that holds the Notre Dame row names it). PD and CCD hold no Notre Dame roster row.
- S9: CCD L2130, L2146 (label, figures and caveat unchanged).
- S12: PD L1687, L1689 (values exactly as recorded).
- R8 table: Cannon students and seniors; CCD teams, institutions, seniors and students; PD teams, institutions and seniors; the PD students note.
- Turned-down rule candidates: none re-proposed.
