# Consistency rescan 5: Providence Day, Charlotte Country Day, Cannon (main 5d26847a, 2026-11-22)

Page lines (`L<n>` after a quote) are lines of `scan5/pages/<slug>.txt`. A data line follows its file name. The dump splits table cells and tiles across lines, so a quote joining cells with " · " will not grep as one string.

`caused by round 4?` was judged against `git show 13551180:<path>` and `git diff 13551180..5d26847a`.

## Part 1: regression check of round 4

**135 rows: 126 RESOLVED · 0 NOT RESOLVED · 1 PARTIAL · 8 UNCHANGED BY DECISION.** 69 are the rows round 4 carried from earlier rounds. 66 are its own rows, residue, cross-school rows and late fixes. Cross-school X5, X6 and X8 are judged under PD-T18, CCD-T17, CAN-T7, CCD-T14 and CAN-T8.

| id | status | where (page line or file:line) | note | caused by round 4? |
|---|---|---|---|---|
| X1 (Cannon) | RESOLVED | Cannon L1159 | Bars 5+2+2+1+1+1 = 12, the roster’s D1 count |  |
| X2 | RESOLVED | PD L2747 · CCD L2517 · Cannon L2119 | 70 / 72 / 76 rows, recounted |  |
| X3 (CCD) | RESOLVED | CCD L2223 | ~27:1 |  |
| X4 | RESOLVED | PD L285 · CCD L251 · Cannon L104 | 172/153, 117/121, 104/101 |  |
| X5 (PD) | RESOLVED | PD L3427; Compare `run-ms12` | Grades 6–8 basis |  |
| X6 (PD) | RESOLVED | PD L3326 | Superseded by PD-T4: 17 items, 8 priced, 53% |  |
| X6 (CCD) | RESOLVED | CCD L3202 | Extended Day, enrichment, bus and tutoring priced |  |
| X7 | RESOLVED | `metricValues.ts` `aftercare-cost` note | Both month conventions stated |  |
| PD-4 | RESOLVED | PD L816 | TK–5 / 6–8 |  |
| PD-17 | RESOLVED | PD L1091 | Agrees with the tile and Global Exposure |  |
| PD-18 | RESOLVED | PD L1100 | 24+5+9 = 38 |  |
| PD-19 | RESOLVED | PD L901 | 39+16+9+6+4+3 = 77 |  |
| PD-20 | RESOLVED | PD L1179 | Superseded by PD-S1 |  |
| PD-23 | RESOLVED | PD L285 | 30 AP rows, recounted |  |
| PD-24 | RESOLVED | PD L175 | 72/53 and 172/153 |  |
| PD-25 | RESOLVED | PD L3350 | Cycle labeled |  |
| PD-26 / PD-R7 | RESOLVED | PD L603, L883 | ~19 against 16 labeled; four continents |  |
| PD-27 | RESOLVED | PD L1172; Compare qual | AP Art and Design |  |
| PD-28 | RESOLVED | PD L552; `artsMatrix.ts` L45 | Both hold it |  |
| CCD-5 | RESOLVED | CCD L1671 | "admitted" |  |
| CCD-7 | RESOLVED | CCD L1672, L2300 | Both values attributed and asked |  |
| CCD-8 | RESOLVED | CCD L1009 | As fixed |  |
| CCD-9 | RESOLVED | CCD L1161 | Fast Facts NAHS on both rungs |  |
| CCD-10 | RESOLVED | CCD L2456 | Now both counts, attributed |  |
| CCD-11 | RESOLVED | CCD L873 | 40 names, recounted |  |
| CCD-12 | RESOLVED | CCD L1230 | 8 rows |  |
| CCD-24 | RESOLVED | CCD L251 | 117 |  |
| CCD-27 | RESOLVED | CCD L607 | 1991 / 2017 |  |
| CCD-28 | RESOLVED | CCD L2295 | The Verdict now attributes both claims, as Transcript and Edge do. Last round’s PARTIAL is closed |  |
| CCD-29 | RESOLVED | CCD L968 | 5, or 6 with NJHS |  |
| CAN-3 | UNCHANGED BY DECISION | Cannon L2117 | S4, 251 unchanged | no: a standing ruling, same values at 13551180 |
| CAN-13 | RESOLVED | Cannon L865 | 20 = 7+5+8 |  |
| CAN-14 | RESOLVED | Cannon L708, L769 | 24 and 11, recounted |  |
| CAN-15 | RESOLVED | Cannon L1950 | $69 |  |
| CAN-16 | RESOLVED | Cannon L2815 | Recomputed |  |
| CAN-24 | RESOLVED | Cannon L104 | 104 / 101 |  |
| PD-R1 | RESOLVED | PD L2464 | 0.5+1+3.5+0.5 |  |
| PD-R2 | RESOLVED | PD L1278, L1303 | Course names match the catalog |  |
| PD-R3 | RESOLVED | PD L2394 | Attributed and asked |  |
| PD-R4 | RESOLVED | PD L1794 | Attributed and asked |  |
| PD-R5 | RESOLVED | PD L1639 | Recounted |  |
| PD-R6 | RESOLVED | PD L786 | As fixed |  |
| CCD-R1 | RESOLVED | CCD L1156 | Four honors groups, band and orchestra entry rule, 13-group board, rungs, ask and course row agree. Last round’s PARTIAL is closed |  |
| CCD-R2 | RESOLVED | CCD L1053 | 10–20 |  |
| CCD-R3 | RESOLVED | CCD L2925 | Recorded deviation |  |
| CCD-R4 | RESOLVED | CCD L2517; Compare qual | 75 |  |
| CCD-R5 (CCD) | RESOLVED | CCD L3266 | Recomputed |  |
| CCD-R5 (Cannon) | RESOLVED | Cannon L2825 | Q1–Q7 contiguous |  |
| CCD-R6 | RESOLVED | CCD L2343 | As fixed |  |
| CCD-R7 | RESOLVED | CCD L1156 | 13 = 4+5+4 after CCD-R1 |  |
| CCD-R8 | UNCHANGED BY DECISION | CCD L3236 | S7, values unchanged | no: a standing ruling, same values at 13551180 |
| CAN-R1 | RESOLVED | Cannon L793 | As fixed |  |
| CAN-R2 | RESOLVED | Cannon L829 | 2026–27 catalog |  |
| PD-S1 | RESOLVED | PD L1241; Compare `ensembles` | 3 + 3 everywhere |  |
| PD-S2 | RESOLVED | PD L703 | Both wordings shown |  |
| CCD-S1 | RESOLVED | CCD L2516 | Catalog and planner agree |  |
| CCD-S2 (CCD) | RESOLVED | CCD L2680 | Seven descriptions |  |
| CCD-S2 (Cannon, three priced rows) | RESOLVED | Cannon L2268 | $180 / $196 / $180 |  |
| CCD-S2 (Cannon, four rows with no recorded price) | UNCHANGED BY DECISION | Cannon L2421 | Code comment only, per consistency3 Decisions | no: a standing ruling, same values at 13551180 |
| CCD-S3 | RESOLVED | CCD L2169 | Coaches model and ask |  |
| Research finding: PD bus fares | RESOLVED | PD L3402, L3301 | Both round-3 regressions are closed |  |
| Scope addition: linked Financial Aid sources (3 schools) | RESOLVED | `financialAidReports.ts`, the three reports | Links present. Not all re-fetched this round |  |
| Review 1, PD-S1 second card | RESOLVED | PD L1257 | As fixed |  |
| Review 1, drop "band/jazz" from step 01 | UNCHANGED BY DECISION | PD L1256 | Rejected in consistency3 | no: a standing ruling, same values at 13551180 |
| Review 5, CCD-R8 source lines | RESOLVED | `financialAidReports.ts` CCD sources | Live URL cited |  |
| Second pass 2, "retrieved 22 Nov 2026" | RESOLVED | same lines | As fixed |  |
| Capped pass 7, PD footer dates | RESOLVED | PD L3301 | Header and footers agree |  |
| Optional polish, PD-R4 bare "100%" tile | UNCHANGED BY DECISION | PD L1796 | Out of scope in the plan | no: a standing ruling, same values at 13551180 |
| Optional polish, CCD-R1 ladder label | UNCHANGED BY DECISION | CCD L1087 | Out of scope; the school’s wording | no: a standing ruling, same values at 13551180 |
| PD-T1 | RESOLVED | PD L2362, L2469 | Both names gone at both sites |  |
| PD-T2 | RESOLVED | PD L3402, L3443 | Merit box (still six items) and Q10 agree |  |
| PD-T3 | RESOLVED | PD L3301 · CCD L3171 | Both headers dated |  |
| PD-T4 | RESOLVED | PD L3343 | 17 = 8 priced + 9 unpriced, 53% |  |
| PD-T5 | RESOLVED | PD L2730 | The platform ask is gone |  |
| PD-T6 | RESOLVED | PD L2712 | Agrees with the billing-months gap |  |
| PD-T7 | RESOLVED | PD L2624; Financial Aid L3334 | 15 rows re-read against the rule |  |
| PD-T8 | RESOLVED | PD L3207 | Seven sessions, "4 or 5 days" |  |
| PD-T9 | RESOLVED | PD L3043 | "4 days" on both rows |  |
| PD-T10 | RESOLVED | PD L2481 | Cohorts separated |  |
| PD-T11 | RESOLVED | PD L2360, L2477 | Three sites agree with the gap box |  |
| PD-T12 | RESOLVED | PD L1111 | Six rows. The catalog agrees |  |
| PD-T13 | RESOLVED | PD L1060 | As fixed |  |
| PD-T14 | RESOLVED | PD L1303 | As fixed |  |
| PD-T15 | RESOLVED | PD L1303 | As fixed |  |
| PD-T16 | RESOLVED | PD L2393 | Catalog name |  |
| PD-T17 | RESOLVED | PD L750 | Grades 6–11 on every trip row |  |
| PD-T18 | RESOLVED | Compare `summer-care-span` qual | "widest on this row". True of all seven values |  |
| PD-S1w | RESOLVED | PD L1257 | The word is restored |  |
| CCD-T1 | RESOLVED | CCD L3209, L3272 | 2 unpriced + 3 range of 10. No all-in total, per Approvals |  |
| CCD-T2 | RESOLVED | CCD L3210 | Matches Learning Support |  |
| CCD-T3 | RESOLVED | CCD L2456, L3270; both Compare quals | Attributed at every site |  |
| CCD-T4 | RESOLVED | CCD L3270 | "20% or 21%" dropped, per the ruling |  |
| CCD-T5 | RESOLVED | CCD L3176 | Class named |  |
| CCD-T6 | RESOLVED | CCD L2459 | Recorded deviation. Subtracted per division |  |
| CCD-T7 | RESOLVED | CCD L2344 | Five bars, with the limit. The live page has the same limit |  |
| CCD-T8 | RESOLVED | Compare `latest-pickup` qual | JK through grade 8 |  |
| CCD-T9 | RESOLVED | CCD L2168 | Attributed |  |
| CCD-T10 | RESOLVED | CCD L821 | Attributed |  |
| CCD-T11 | UNCHANGED BY DECISION | CCD L2123 | S9. The figures and the caveat are unchanged | no: a standing ruling, same values at 13551180 |
| CCD-T12 | RESOLVED | CCD L251; Compare qual | Guide year named |  |
| CCD-T13 | RESOLVED | CCD L2210, L2300 | Attributed and asked |  |
| CCD-T14 | RESOLVED | CCD L1690, L2175 | The list has the three |  |
| CCD-T15 | RESOLVED | CCD L2282 | Inference dropped, per the ruling |  |
| CCD-T16 | RESOLVED | CCD L2166 | Classes named |  |
| CCD-T17 | RESOLVED | CCD L1220 | Superlative gone |  |
| CCD-T18 | RESOLVED | CCD L1165 | As fixed |  |
| CCD-T19 | RESOLVED | CCD L1206 | Reworded with the X2 fix |  |
| CCD-T20 | RESOLVED | CCD L735 | Narrowed, as recorded. Eleven asks |  |
| CCD-T21 | **PARTIAL** | CCD L945 against L1051; `clubClusters.ts` L243–264 | The catalog went 7 → 11 and now files "World Quest" and "Euro Challenge" as "Academic / competition" (Academic · 4). Two cards below, Academic & Competitive Clubs lists only Model UN and Robotics and says "Model UN is the flagship, with repeat conference awards." The same page says students "finish in first place at the Academic WorldQuest competition nearly every year" (L703). International Studies page re-read today. Fix (A): add a school-reported row for Academic WorldQuest and Euro Challenge, with the first-place claim and the 23 combined wins, and widen the verdict. A data row in an existing card, so no UX gate. `data_dependents.json` did not flag this consumer | **yes**: at 13551180 neither club was in the catalog, so the two cards agreed. `clubClusters.ts` has no CCD hunk in the diff |
| CCD-T22 | RESOLVED | CCD L3071 | Both pages quoted |  |
| CCD-T23 | RESOLVED | CCD L2343 | Agrees with the Compare qual |  |
| CCD-T24 | RESOLVED | CCD L3031 | As fixed |  |
| CAN-T1 | RESOLVED | Cannon L1153 | Six rows |  |
| CAN-T2 | RESOLVED | Cannon L1153 | Four D1 basketball rows named |  |
| CAN-T3 | RESOLVED | Cannon L2742 | 10 = 6 + 4, 40%. The fee PDF has no 9th-grade AP fee |  |
| CAN-T4 | RESOLVED | Cannon L1952 | As fixed |  |
| CAN-T5 | RESOLVED | Cannon L391 | As fixed |  |
| CAN-T6 | RESOLVED | Cannon L2089, L2090 | 22 rows, $160–$300 |  |
| CAN-T7 | RESOLVED | Cannon L2697 | Clause gone |  |
| CAN-T8 | RESOLVED | Compare `aftercare-cost` qual and note | Cannon is again the one 2025–26 rate. Every qual’s year was checked |  |
| CAN-T9 | RESOLVED | Cannon L2704 | As fixed |  |
| CAN-T10 | RESOLVED | Cannon L2244 | Both bands |  |
| CAN-T11 | RESOLVED | Cannon L48 | Agrees with Global Exposure |  |
| CAN-T12 | RESOLVED | Cannon L1868 | Both names, attributed |  |
| CAN-T13 | RESOLVED | Cannon L1808, L1865 | Attributed |  |
| CAN-T14 | RESOLVED | Cannon L1867 | Agrees with Clubs |  |
| CAN-T15 | RESOLVED | Cannon L626; Compare qual | The count stays twelve, per the ruling |  |
| CAN-T16 | RESOLVED | Cannon L1795 | Headline, tile, note, Verdict and ask agree |  |
| CAN-T17 | UNCHANGED BY DECISION | Cannon L2079 | Left by the user until the brochure can be opened. The live page still gives Aug 16 and Aug 31. Aug 31 is a Monday in 2026, which points to 2026–27. The brochure host is refused, so it was not requested | no: a standing ruling, same values at 13551180 |
| r4 X2 (Blumey census) | RESOLVED | PD L1211 · CCD L1117 · Cannon L756 | The 2026 and 2024 rows were rechecked against copies saved in round 4, by category only. No request was made to Blumenthal |  |
| r4 X4 (camp days) | RESOLVED | the three summer planners | `daysPerWeek: 4` on every four-day tier. Default per-day figures recomputed |  |
| r4 X7 (null Arts cells) | RESOLVED | Compare Arts rows | No null cell at these three schools |  |
| r4 CC-T16 / S8 (Cannon) | RESOLVED | Cannon L1157 | The card that holds a Notre Dame row names it |  |
| Late fix 1 (literal asterisks) | RESOLVED | PD L2462 | 0 "**" in the three dumps |  |
| Late fix 2 (CCD label) | RESOLVED | CCD L2173 | As fixed |  |

## Part 2: new findings

**28 findings (PD 13, CCD 6, Cannon 9): A 17 · B 2 · C 7 · D 2. 0 caused by round 4.** The one conflict round 4 caused is CCD-T21 in Part 1. It is not repeated here. No proposed change is UX-GATE or CHROME. Where a count or a source is the user’s call, the row says so.

| id | school | section(s) | value A (where) | value B (where) | category | caused by round 4? | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|---|
| PD-U1 | PD and CCD (one cause) | College Support › HBCUs bucket, Compare `bucket-hbcu` | PD "14 / 107" (L1788; `collegeSupportPrograms/providence-day.ts` L753). CCD "19 / 107" (L1666; `…/charlotte-country-day.ts` L749) and "The list holds 19 HBCUs" (L2287; L808) | The lists beneath also hold "University of District of Columbia" (L2138; L354, `cats: []`) and "University of Maryland Eastern Shore" (L1986; L331, `cats: []`) | A | no: both values stand at 13551180 | https://www.law.cornell.edu/cfr/text/34/608.2 lists both. udc.edu titles itself "HBCU, Land-Grant University". umes.edu/about: "a historically black, public research institution". Our own CCD research record (L680) marks UMES as an HBCU | Add both to `HBCUS` (with an alias for PD’s spelling) and to the membership record, tag both rows, then PD 14 → **15** and CCD 19 → **20** at the buckets, the Edge sentence, both Compare cells and both quals. **`check:memberships` missed it:** its roster is a hand-kept subset, so a member absent from roster and tags passes. Check lists against the full federal list. All 11 lists were scanned against 34 CFR 608.2. The only other name matches were false ones (University of Texas, Clark, Concordia), so no other school moves |
| PD-U2 | PD (against Cannon) | Sports › Winning Record matrix | "Girls Basketball · — · — · RUNNER-UP" (L1609; `sportsPrograms/providence-day.ts` L174–180, 2023–24 cell `NONE`) | Cannon’s page: "2024 beat Providence Day 62–51" (L1148) and "beat Providence Day in both the 2024 and 2026 finals" (L1112) | A | no: both values stand at 13551180 | https://archives.ncisaa.org/index.php?sport=23&years=2023-2024, 4A final: #1 Cannon (23-7) over #2 Providence Day (21-9) | 2023–24 cell → RUNNER-UP, 21–9. Note → "Lost the ’24 and ’26 finals to Cannon". The same archive (sport=18) shows PD boys lacrosse was also the 2023–24 runner-up to Cannon (18–5), and the matrix has no such row. Adding it is optional data |
| PD-U3 | PD (against CCD and Cannon) | Sports › Winning Record headline | "Four NCISAA 4A state titles in 2025–26 — the most of any 4A school in North Carolina that year." (L1561; L123) | Durham Academy won four as well: "girls cross country, girls track, boys tennis and boys lacrosse (Durham Academy)" (L1509) and Cannon’s list (L1141). PD’s own list drops Durham’s girls track (L1610) | A | no: both values stand at 13551180 | NCISAA archive boys tennis and boys lacrosse 2025–26 brackets. Official track timing: "Female Teams 1 Durham Academy 123". HighSchoolOT list: "Durham Academy (1) — girls cross country". That list, which PD’s record cites for the claim, stops after winter | "— tied with Durham Academy for the most of any 4A school". Add girls track to Durham’s titles in "What they didn’t win" |
| PD-U4 | PD (against CCD and Cannon) | College Support › acceptance list rank label | "Miami University–OH" with no rank (L1979; L195) | "Miami University · National Rank #133" (L1850) and "Miami University (Oxford) · National Rank #133" (L1466) | A | no: both values stand at 13551180 | `collegeRankings.ts` L176–178 ranks the institution #133 under three spellings. "–OH" is not one | Add the alias, which shows #133. Outside the top 75, so no bucket moves. **`check:ranks` missed it:** an unresolved spelling reads as unranked |
| PD-U5 | PD | After School › Coverage Map vs Summer Programs | "JUN–AUG" (L2520; `afterSchoolPrograms/providence-day.ts` L87) | "Nine sessions run June 1 to July 31, 2026." (L2746) | A | no: both values stand at 13551180 | Committed 2026 brochure record ends July 31. https://summer.providenceday.org/dates-rates today lists next season to July 30. Only an older block on it reaches August 1 | season → "JUN–JUL", as at CCD and Cannon. Fix "June through early August" in the After School record |
| PD-U6 | PD | Summer › two camp descriptions vs the grade column | "The IDEAS lab’s architecture camp, open to the widest grade span in the program." on 6–12 (L2903; `summer/providence-day.ts` L329) and "Half-day songwriting workshop spanning the full grade range." on 3–12 (L2875; L276) | The IDEAS lab’s own "The Life of an Influencer" is 3–12 (L2945), Soccer is TK–9 (L3064), and the program runs from TK | A | no: both values stand at 13551180 | Internal, the rows’ grade bands | "The IDEAS lab’s architecture camp, for grades 6 to 12." and "Half-day songwriting workshop for grades 3 to 12." |
| PD-U7 | PD | Financial Aid › Beyond Tuition vs After School | "Seventeen confirmed components for a 2026–27 family — 9 unpriced" with no Activity Day item (L3326; `financialAidReports.ts` L1722) | "The Activity Day fee is never stated. The school says a separate fee applies on teacher workdays and holidays" (L2523; `afterSchoolPrograms/providence-day.ts` L105) | A | no: the omission predates round 4, which added the registration row and not this one | Committed After School record L74–77: Activity Days run on a separate fee, "Activity Day fee: NOT PUBLISHED" | Add "Extended Day Activity Days · no rate": eighteen items, 8 priced, 10 unpriced, 56%, in title, aside and note. R11 cannot see an omitted row |
| PD-U8 | PD | College Support › Applicant’s Edge | "A deep UK/Europe pipeline (Oxford, St Andrews, UCL, LSE, Trinity Dublin, Toronto)" (L2469; L809) | Toronto is in Canada. The other sentence calls it "A deep international list" (L2362) | A | no: both values stand at 13551180 | Internal, the list’s own members | "A deep international pipeline (…)", or drop Toronto |
| PD-U9 | PD | Sports › National Stage headline | "MaxPreps ranked PD #1 in North Carolina across all classifications" (L1740; L618), undated | "Yet MaxPreps still ranked it #3 in NC" for 2025 (L1755) | C | no: both values stand at 13551180 | MaxPreps, re-opened: "Providence Day No. 1 in 2024 Preseason MaxPreps Top 25" | "MaxPreps ranked PD #1 in North Carolina across all classifications in the 2024 preseason …" |
| PD-U10 | PD | Sports › ranked recruits vs roster | "the No. 1 offensive tackle and No. 4 recruit nationally, to Tennessee" (L1641; L264) | The roster’s 247 Nat’l column gives David Sanders Jr. 6 (L1653) | C | no: both values stand at 13551180 | The No. 4 is ESPN’s (Aug 17, 2024, as cited on the Wikipedia page re-read today and in our record L256). The 6 is the 247Sports Composite | "… and ESPN’s No. 4 recruit nationally …" |
| PD-U11 | PD | College Support › National Merit ledger, 2021 | "25 recognized in all, 17% of the class" (L2387; `collegeSupportPrograms/providence-day.ts` L567) | The same row lists "6 Semifinalists · 16 Commended · 4 National Recognition", which add to 26 | C | no: both values stand at 13551180 | School news post, re-opened: "25 students recognized", 17%. The total is the school’s, and is not a sum of the categories | "… 25 students recognized in all by the school’s count (the three categories add to 26), 17% of the class" |
| PD-U12 | PD | Sports › Coaching, continuity anchor | "20 · consecutive CISAA XC titles, 2000–20" on Ben Hovis’s tiles (L1700; L504) | "XC / Track, since 2002" and "24 yrs · leading the program" (L1693) | D | no: both values stand at 13551180 | The cited pdschargers.com team page is 404 today. The record (L329) gives the streak to boys cross country, not to the coach | The user supplies the source, or approves "20 consecutive boys’ CISAA XC titles for the program, 2000–20 (he took over in 2002)" |
| PD-U13 | PD | Sports › Coaching, pedigree hire | "147–26 · career record, 15 seasons" (L1687; L491), with no as-of year | The same card dates him "since 2020", and the 2026 season is under way (L1684) | D | no: both values stand at 13551180 | An undated "N seasons" (brief section 6). The record L309 gives no as-of season, and none of its three citations is tied to the figure | The user supplies the season the figure runs through, then label it "through <season>" |
| CCD-U1 | CCD | Financial Aid › Beyond Tuition vs After School | "Ten confirmed cost components — 2 unpriced", with Extended Day at "$60–$900/mo, or $19/hr drop-in" and no registration or conference-day charge (L3202; `financialAidReports.ts` L227) | "Contract registration$80", "Drop-in registration (one-time)$40" (L2450; `afterSchoolPrograms/charlotte-country-day.ts` L232) and full-day conference care "at a separate cost" (L2345) | A | no: omitted at 13551180 too. PD’s same omission was fixed in round 4 | https://www.charlottecountryday.org/bucsnet/after-school/extended-day, today: "Registration Fee. $80", "one-time $40 registration fee", "at a separate cost" | Add "Extended Day registration · $80 contract, $40 drop-in" (priced) and "Extended Day conference days · no rate": twelve items, 6 priced, 3 range, 3 unpriced, 25% + 25%. "So half have no set price" stays true. Update title, aside, note and Q3 |
| CCD-U2 | CCD | Sports › Coaching | "the school has not yet named a girls basketball coach" (L1610; `sportsPrograms/charlotte-country-day.ts` L451) | The school’s athletics directory names one | A (live drift) | no: both values stand at 13551180 | https://www.charlottecountryday.org/cd-experience/athletics/athletics-directory, today: "Sierra Simpson, Girls Basketball Program Head" | Drop the clause and add a ledger row "Sierra Simpson · Girls Basketball Program Head" with no "since". Keep the turnover count at four |
| CCD-U3 | CCD | Sports › Coaching | "both still on staff" (L1582; L414), "When he retires after the 2026 season" (L1601; L438), "retirement is still to come" (L1610; L451), "retiring after 2026" (L442) | The 2026 season is over on the same page: "2026: 19–3 … lost the state final" (L1520). The tile closes his tenure "1987–2026" | B | no: both values stand at 13551180 | The directory today still lists "Brad Touma, Boys Lacrosse Program Head". It also lists two boys basketball heads, the retired one included, so it may lag | "The school announced Brad Touma’s retirement after the 2026 season; its athletics directory still lists him as program head." Make the three future-tense sites match, and add a verify flag |
| CCD-U4 | CCD | The Arts › Verdict | "plus back-to-back NCTC state championships with The Crane Wife" (L1202; `artsPrograms/charlotte-country-day.ts` L352) | "The Crane Wife, a second consecutive championship, which places it in fall 2018, with the prior title in fall 2017 (title unknown)" (L1133) | A | no: both values stand at 13551180 | Internal, the card’s own ledger text | "plus back-to-back NCTC state championships, the second with The Crane Wife" |
| CCD-U5 | CCD | Compare `us-organizations` qual vs Affinity & Identity Groups | "Only 11 are confirmed by name in public sources." (`metricValues.ts` L1772) | The school page names nine Upper School affinity groups, eight of them outside the 11 ("Asian Affinity Club", "International Club", "Jewish Culture Club" and others; L975) | C | no: the qual said "Only 7" beside the same nine at 13551180 | Internal. The DEIB program page is the affinity card’s source | "The club catalog names 11; the school also names nine affinity groups, one of them in both lists." |
| CCD-U6 | CCD | College Support › Where Graduates Go vs Admission Rates | "seniors admitted to UNC–Chapel Hill (up from 23)" (L1678; `collegeSupportPrograms/charlotte-country-day.ts` L740, also L734 and L807) | The state table gives 20 accepted for that prior class, Fall 2025: "29.0%", 20 of 69 (L2087); Compare "20 / 69" | C | no: both values stand at 13551180 | Committed profile record L728 quotes the Class of 2026 page: "admitted 32 seniors (up from 23 last year)". The committed UNC-system record gives 20 | "up from 23 by the school’s count; the state’s Fall 2025 data shows 20" |
| CAN-U1 | Cannon | Clubs › Club Catalog, Compare `us-organizations` | "One consolidated view of every student organization Cannon names directly", 15 of 15, Governance 3 (L559). Compare "≥20": "8 named Upper School organizations plus its 12" | The school names an Upper School Honor Council, and so do our own committed records (the Web Check’s `## Governance`, the Governance PDF) | A | no: both values stand at 13551180 | https://www.cannonschool.org/academics/upper-school, today: "Our student-elected Honor Council is a model of community governance and integrity." | Add it to `clubCatalog.ts` under Governance (15 → 16). Compare would be 9 + 12 = ≥21. As with CAN-T15, moving that count is the user’s call |
| CAN-U2 | Cannon | Global Exposure vs Clubs | "Model UN is a Middle School academic team" (L378; `internationalTravel/cannon.ts` L274) | "Middle & Upper School; … US team earned awards at Duke’s DUMUNC" (L569) | A | no: both values stand at 13551180 | Committed Signature Competitive Programs PDF: "the Upper School team attended the Duke (DUMUNC) conference". The International Programs page, today, counts Model UN toward the Upper School certificate | "Model UN runs in the Middle and Upper Schools, and Model UN and World Quest both count toward the certificate." |
| CAN-U3 | Cannon | The Arts › checklist vs College Support | "What does the 7:30 a.m. Varsity commitment really look like across a week" (L841; `artsPrograms/cannon.ts` L383) | "Zero Hour runs Varsity Chorus and Varsity Orchestra, pass/fail, on Monday, Wednesday and Friday before school." (L1810) | A (section 9) | no: both values stand at 13551180 | 2026–27 profile record L130: "These classes meet Monday, Wednesday, and Friday before the school day" | "Varsity Chorus and Orchestra meet Monday, Wednesday and Friday before school. When does Varsity Band meet, and does any of it collide with athletics?" |
| CAN-U4 | Cannon | Compare `signature-recognition` | "NCTC festival", "the recognition its note leads with" (`metricValues.ts` L1564) | The card leads with "Fifteen Blumey finalist placements across 2023, 2025 and 2026" (L733) and says "no regional placement, state advancement or named award" in NCTC could be found (L766) | A | no: the card led with "Ten" at 13551180 | Internal. The label is "most notable arts recognition", and the NCTC cell is participation only | Cell → "15 Blumey finalists", qual → "Fifteen Blumey finalist placements in 2023, 2025 and 2026, with no win found. Cannon also enters the NCTC play festival each year." The qual is false today. Changing the cell value is the user’s call |
| CAN-U5 | Cannon | Compare `advanced-arts-coursework` | "AP Studio Art", "The advanced arts course the note names is AP Studio Art." (`metricValues.ts` L1630) | "Advanced Topics: Art History is a second AP-level option" (L815) | C | no: both values stand at 13551180 | Internal. The 2026–27 catalog rows list both | Qual → "AP Studio Art is the one AP arts course. Advanced Topics: Art History carries the same weight." |
| CAN-U6 | Cannon | The Arts › season vs Blumey ledger | "2025-26: Mean Girls: High School Version, Feb 11–14" (L741; `artsPrograms/cannon.ts` L147) | "Mean Girls School Edition" for the same production (L755; L164) | B | no: both values stand at 13551180 | Committed Arts record L243 quotes the school’s page ("High School Version"). Round 4’s saved Blumenthal 2026 list prints "Mean Girls School Edition". No request was made to Blumenthal | Ledger show → "Mean Girls: High School Version (listed by Blumenthal as Mean Girls School Edition)" |
| CAN-U7 | Cannon | The Arts › Verdict vs College Support | "all 24 Upper School arts courses are Honors, AP or Advanced Topics … That is a signal you can check about how the arts count on a GPA and transcript" (L834; `artsPrograms/cannon.ts` L352) | "AT and AP courses carry 1.0 quality point, Honors Accelerated 0.5 (new for 2026–27), and Honors none at all." (L1812) | C | no: both values stand at 13551180 | Internal, the 2026–27 profile’s weighting. 22 of the 24 are plain Honors | "… how the arts appear on a transcript. Only AP Studio Art and AT Art History add GPA weight; Honors adds none." |
| CAN-U8 | Cannon | Summer › two camp descriptions vs the rows | "The oldest camp in the catalog — leadership for teens." on 14–17 (L2254; `summer/cannon.ts` L283) and "the school’s most-repeated outdoor camp" on four weeks (L2352; L466) | College Essay Bootcamp is "Rising seniors only" (L2212). Fishing also runs four weeks (L2373) | A | no: both values stand at 13551180 | Internal, the rows’ ages and weeks | "Leadership for teens, ages 14 to 17." and "A different Concord park every day, offered in four weeks." |
| CAN-U9 | Cannon | Sports › Winning Record, Show sources | Source label "2024 volleyball title" (`sportsPrograms/cannon.ts` L212; in Show sources, so not in the dump) | "Volleyball: 2023: 23–2, sweeping North Raleigh Christian" (L1149); no title in 2024–25 | A | no: both values stand at 13551180 | The linked story is the one the card cites for ending the eight-year reign, the fall 2023 title | Label → "2023 volleyball title" |

## Part 3: R8 triage

- Cannon · students 300/195/40/3/9: settled, values unchanged.
- Cannon · seniors 105/26: settled, values unchanged.
- CCD · teams 72/55: settled, values unchanged.
- CCD · institutions 1/150: settled, values unchanged.
- CCD · seniors 27/32/141: settled, values unchanged. CCD-U6 is a different pair (23 vs 20), which R8 cannot see.
- CCD · students 341/347/12/15/10/20/17/1: the group gained 341 and 347 since the previous report. Both are in the settled row (the two attributed aid counts), so no conflict.
- PD · teams 66/56: settled, values unchanged.
- PD · institutions 13/8/150/383/249: settled, values unchanged.
- PD · seniors 36/1/179: settled, values unchanged.
- PD · students 497/100/30/16/6/10/12/2/4/20/375/1: lost 36 (PD-T10). No new member. Not a conflict (different facts).
- No group for these schools is new since the previous report.

## Round-4 builder leads

- 1. Cannon AP fee "~$99" in the catalog against $98: only $98 is on the page, so no conflict on the site.
- 2. CCD 1,746 against 1,745 enrolled: neither figure is on the page.
- 3. CCD bus billed "twice" against monthly: the page no longer calls the bus a monthly charge.
- 4. IB "first private school" in Global Exposure: the card says "each below as the school states it", and College Support gives both. No conflict.
- 5. CCD "The list matches the distribution": fixed as late fix 2.
- 6. Cannon NotebookLM prompt dates the induction 2025: a dev file, not on the page. Fix it before an episode uses it.
- 7. Names beside the Science NHS chapter in the Cannon research record: both are now `[name withheld]` (checked by count).
- 8. Header dates at other schools: outside this group.
- 9. CCD SAT/ACT class label: settled S9.
- 10. Old language question in the CCD transcription: a transcription, not on the page.
- 11. "of the five" in two summer header comments: code comments, not parent-facing.
- 12. R10 does not read "N sessions": a rule candidate. The PD row itself is fixed.
- 13. Cannon "three 10-week sessions" against eight Monday classes: the live page says 10-week sessions, and the Verdict now says 8 or 10 classes. A legitimate difference.
- 14. Jump Into Cannon week 6: needs the brochure on a refused host. Not a verified conflict.
- Translator notes in the plan: the "no financial-aid policy … exists" overclaim and the `$0–700` notation are wording, not value conflicts.

## Checked and consistent

- All three dumps read in full. The strings the dump does not show (Admissions bands, checklist rows, source labels) were read from the data.
- Every round-4 data hunk for the three schools, with its restatements on the page and on Compare. The one new conflict is CCD-T21.
- Compare: every value, sub and qual for the three schools, and the superlatives against their whole rows.
- Rosters, funnels and bars: PD 86/39/16 + 10, CCD 48/28/9 + 0 (one off-roster cheer signee, explained), Cannon 23/12/4 + 6. Win percentages recomputed.
- Cup season splits, gaps and title counts against the matrices (except PD-U2 and PD-U3).
- Acceptance lists: bold 182 / 69 / 58, and every college the prose calls enrolling is bold. Power Four absences 2 / 4 / 6. Admit-rate sums 499/977, 328/702, 479/788.
- Course counts: AP 30 / 23 / 14 + AT 13, departments, PD’s 38 language courses, CCD 9 math tracks, Cannon 24 arts and 11 music. CCD’s 121 rows against 117 lines is explained in the Curriculum Guide record L345.
- Global Exposure trips 19 / 20 / 5, homestays 4 / 5 / 0, question counts 8 / 11 / 11.
- Learning Support staff 40 / 12, questions 13 / 8, every "N published · M not stated" header.
- After-care rate tables against bars, planner defaults and per-afternoon figures. Summer row counts and planner defaults.
- Tuition runs, year-over-year tables, the aid trends and the "absent" and "NOT PUBLISHED" item counts.
- Admissions (PD, CCD; Cannon has no such area): dates, fees, tests and deposits across bands and against Financial Aid by cycle.

## Seen, not counted

- PD Summer: next season’s dates are live (Session 1 June 1–4 to Session 9 July 26–30, three four-day weeks). The page is labeled 2026, so this is a refresh, not a conflict.
- The disclosure meters (PD 60%, CCD 64%, Cannon 84% for Beyond Tuition) did not move when round 4 repriced the grids. No committed rubric was found, so no conflict could be shown.
- CCD Middle School "Choir Gr 5–8" against "Mixed Choir (7–8)": the curriculum has choir from grade 5 and the board names an ensemble.

## Files touched

- This output file.
- Appended `### Re-verification 2026-11-22 (plan consistency5, self-scan)`. "(+)" means the file had no `## Method`, so one was added at the end:
- `source-material/sports/providence-day/Providence Day - Sports - Redesign Research 2026.md` (+)
- `source-material/sports/charlotte-country-day/Charlotte Country Day - Sports - Redesign Research 2026.md` (+)
- `source-material/college-support/_shared/HBCU - Membership and Count 2026.md` (+)
- `source-material/college-support/providence-day/Providence Day - College Support - Redesign Research 2026.md` (+)
- `source-material/student-clubs/charlotte-country-day/CCD - Clubs - Club Catalog Web Check 2026.md` (+)
- `source-material/student-clubs/cannon/Cannon - Clubs - Honor Societies Web Check 2026.md`
- `source-material/after-school/charlotte-country-day/CCD - After School - Redesign Research 2026.md`
- `source-material/summer-programs/providence-day/Providence Day - Summer Programs - Camp Catalog.md`
- Nothing was ingested, built or committed.

## Fetching and student names

- No host refused a fetch in this sweep. Five requests returned 404 on working hosts: a robots.txt, the cited PD cross country page, and three guessed paths. A 404 is not a refusal.
- Until the parent’s caution arrived, every curl here used `-L`. Afterward each URL was re-requested without following redirects and the Location read. Two redirect: highschoolot.com to its own `/archive/` path, and pdschargers.com to www.pdschargers.com. **No refused host appeared in any hop found, or as the canonical host of any saved page.** This re-check shows today’s hops, as the original hop chains were not logged.
- Two commands printed non-athlete student names into this agent’s own command output before that caution: a `git diff` (1 removed line, an old revision of `src/data/artsPrograms/providence-day.ts` L12 at 13551180, withheld on main) and a grep of a fetched 2018 school news post (1 line, a list of Commended Students). Neither was copied to a file, an append, a search or the reply.
- The untracked downloads of two school news posts still hold names: `scan5/dl/pd-ccd-cannon/w2/pdnews*.html*` and `w3/nm.html*`. Nothing was deleted.
- No non-athlete student name was seen in a tracked file on main among what this sweep read. This was not a whole-repo name scan.

## Settled, skipped

- S1: PD L1779, CCD L1657, Cannon L1284.
- S4: Cannon L2117 (251, unchanged).
- S7: CCD L3236 (ladder unchanged on the page; the endowment page was not re-fetched).
- S8: Cannon L1157. PD and CCD hold no Notre Dame row.
- S9: CCD L2123 (values and caveat unchanged).
- R8 table: Cannon students and seniors; CCD teams, institutions, seniors and students; PD teams, institutions and seniors, plus the PD students note.
- Turned-down rules: none re-proposed.
