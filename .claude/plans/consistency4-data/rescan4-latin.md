# Charlotte Latin — consistency RESCAN #3 (2026-11-22, main 13551180)

Page: `pages/charlotte-latin.txt` (3,037 lines, read top to bottom). The admissions checklist, the other three
grade bands and the Financial Aid source lines are not in the dump and were read from the data files.
Evidence for "caused-by-round-3" is `git diff 58434f0b 13551180 -- <path>`.

## Part 1 — regression check

**64 rows: 57 RESOLVED · 0 NOT RESOLVED · 3 PARTIAL/REGRESSED · 3 UNCHANGED BY DECISION · 1 n/a.**

### Not resolved, or not plain RESOLVED

| id | status | where (page line / file:line) | note |
|---|---|---|---|
| P-R5 (second review pass, item 5: "No enrollment contract date is published" → "No due date…") | **PARTIAL** | Cross-band table L111–114 "no contract date published" ×4 (`admissionsPrograms/charlotte-latin.ts:709–712`); printed checklist "No contract date is published; confirm it with admissions." ×3 (`:303`, `:408`, `:521`); band 4 checklist "Nothing is published for Grade 12 or for the contract; ask admissions." (`:635`) | The fix changed 8 strings and missed these 8. They contradict L2944 "the enrollment contract, which is published at acceptance" and the fixed L69. Caused by round 3: yes (the new FA sentence and the new wording created the split). Fix (A; FAQ re-opened today: "The contract is published at the time of acceptance."): "no contract due date published" in the four cells; "No contract due date is published; confirm it with admissions." ×3; `:635` "Nothing is published for Grade 12, and no contract due date is published; ask admissions." New text, so Phase 2. |
| P-R4 (second review pass, item 4: the aid documents do not "sit a year behind") | **PARTIAL** | Source lines `financialAidReports.ts:1489`, `:1527`, `:1554`, `:1649` still name the documents "2025-26 Scholarships" and "2025-26 Commonly Asked Questions about Financial Aid" | The framing (L2897) now says only transport is a year behind, while the citations label both documents a year behind. The live Policies page lists "Scholarships" and "Commonly Asked Questions about Financial Aid" with no year. Fix (A): drop "2025-26 " from the link text. Source lines are never translated. Caused by round 3: yes (those lines and the framing were both rewritten). |
| P-CO2 (Phase 1 close-out: "transport page sits a year behind" re-checked) | **PARTIAL / REGRESSED** | L2897, L2929–2930, L3028 | The re-check opened `/admissions/transportation` only. The school's other Transportation page, `/student-life/transportation` (the one the After School card cites), publishes 2026–27 fees. The fix is LAT-T1. |
| LAT-D1 | UNCHANGED BY DECISION | L2352, L2358–2359, L2845 | 232 / 169 / 89 unchanged. Settled S2. |
| LAT-D1 (Part 1b) | UNCHANGED BY DECISION | same | Settled S2. |
| LAT-S1 | UNCHANGED BY DECISION | L1455, L1487; `metricValues.ts` bucket-nu75 | "73 / 75" unchanged. Settled S1. |
| X6, X7 (Part 1b) | n/a | — | Do not touch Latin. |

### RESOLVED: previous worklist, Part 1

| id | status | where | note |
|---|---|---|---|
| Seed 1–8 | RESOLVED | rows below | Each maps to a row below. |
| LAT-1a | RESOLVED | L146; Compare advanced-courses + qual | |
| LAT-1b | RESOLVED | L239, L1944, L2057 | 23 AP rows recounted. |
| LAT-2 | RESOLVED (deviation: UT Austin) | L1461, L1470, L1477, L1490–1491 | 18 + 16 + 16 + 12 = 62. |
| LAT-3 | RESOLVED | L2092, L2098, L2322–2323, L2327, L2341, L2343, L2932, L3033 | Live rate table unchanged today. |
| LAT-5 | RESOLVED | L144, L239, L241 | 105 rows recounted. |
| LAT-6 | RESOLVED | L239–240 | |
| LAT-7 | RESOLVED | L2544 | |
| LAT-8a | RESOLVED | L880–882 | |
| LAT-8b | RESOLVED | L934–936, L944 | |
| LAT-9 | RESOLVED (deviation) | L728–730 | Live list still 27. |
| LAT-10 | RESOLVED | L843, L2034 | |
| LAT-11 | RESOLVED | L1285–1287, L1243 | |
| LAT-12 | RESOLVED | L1015 | 9 + 6 + 9 = 24. |
| LAT-13 | RESOLVED (built in round 3) | L2066–2068 | Tile now reads "TK/K · 5 days to 6:00 p.m. · $4,650 a semester"; agrees with L2077, L2129 and the Compare sub. A false clause in the older qual is LAT-T7. |
| X2 | RESOLVED | L2360, L2363 | 66 rows = 104 offerings (Mean Girls counts once). |
| X3 | RESOLVED | L1467, L1980–1981 | |
| X4 | RESOLVED | L144, L239, L241 | |
| X5 | RESOLVED | `check_tuition_rows.mjs:66`; Compare quals | |
| LAT-R1 | RESOLVED | L2944; L47–48, L69, L71 | Live Application Process page unchanged. |
| LAT-R2 | RESOLVED | L1039 | |

### RESOLVED: previous worklist, Part 1b

| id | status | where | note |
|---|---|---|---|
| Seed 1 | RESOLVED | L146, L239, L1944 | |
| Seed 2 | RESOLVED | L1461–1491 | |
| Seed 3 | RESOLVED | L2134, L2932 | |
| Seed 4 | RESOLVED | L1467, L1980 | |
| Seed 5 | RESOLVED | L1323–1336 | Roster recount: 25 + 19 + 16 = 60, plus 3 unlisted = 63; 22 D1; 8 P4; 34 D3. |
| Seed 6 | RESOLVED | L2360 | |
| Seed 7 | RESOLVED | L144, L239 | |
| Seed 8 | RESOLVED | L880–882 | |
| X1 | RESOLVED | L1328–1336 | |
| X2 | RESOLVED | L2360 | |
| X3 | RESOLVED | L1467, L1980 | |
| X4 | RESOLVED | L144, L239 | |
| X5 | RESOLVED | as above | |
| LAT-1a | RESOLVED | L146 | |
| LAT-1b | RESOLVED | L239, L1944 | |
| LAT-2 | RESOLVED (deviation) | L1461–1491 | |
| LAT-3 | RESOLVED | as above | |
| LAT-5 | RESOLVED | L144, L239 | |
| LAT-6 | RESOLVED | L239 | |
| LAT-7 | RESOLVED | L2544 | |
| LAT-8a | RESOLVED | L880–882 | |
| LAT-8b | RESOLVED | L934–936 | |
| LAT-9 | RESOLVED (deviation) | L728–730 | |
| LAT-10 | RESOLVED | L843 | |
| LAT-11 | RESOLVED | L1285–1287 | |
| LAT-12 | RESOLVED | L1015 | |
| LAT-13 | RESOLVED (built in round 3) | L2066–2068 | |

### RESOLVED: rows the consistency3 plan added

| id | status | where | note |
|---|---|---|---|
| P-LINKS (linked source lines) | RESOLVED | `financialAidReports.ts` Latin `source` / `sources` | Read from the data; the linked tuition, policies, transportation and three document URLs returned 200 today. |
| P-RF3 (two aid documents now readable) | RESOLVED | L2944, L2974, L2984 | No "could not be opened" or "not retrievable" left. A statement the FAQ now answers is LAT-T5. |
| P-LR1 (research bookkeeping) | RESOLVED | `sources` line | "(research pass, not re-retrieved)" is gone. |
| P-LR2 ("bodies not retrievable") | RESOLVED | `sources` line | Gone. |
| P-R1 (reapply annually) | RESOLVED | L2942, L3032 | Live document still says November 15. |
| P-R2 (criteria now published) | RESOLVED | L2984–2986, L3031 | |
| P-R3 (supplemental support) | RESOLVED | L2974 | Lunch stays with the highest-need families. An older sentence in the same box is LAT-T4. |
| P-R6 (shifted overlay paths) | RESOLVED | es overlay holds the new "15 de noviembre" row | Spot check in es; the plan records `TOTAL 0` for every locale. |
| P-CO1 (FAQ citation on the wrong school) | RESOLVED | `financialAidReports.ts:1527` | Latin carries it; Covenant Day's report has 0 references. |

## Part 2 — new findings

URLs fetched 2026-11-22 unless stated. Base `www.charlottelatin.org`.

| id | school | section(s) | value A (where: file:line, page L) | value B (where) | category | caused-by-round-3 | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|---|
| LAT-T1 | Latin | Financial Aid › framing, Beyond Tuition, Q4 | "The transport page sits a year behind the 2026–27 tuition table" L2897 (`financialAidReports.ts:1365`); "Bus service · 2025–26 rates only" L2920 (`:1413`); "a family budgeting for next year cannot price the bus from the website" L2930 (`:1426`); "What are the 2026–27 bus rates?" L3028 (`:1639`) | The school publishes 2026–27 bus fees on the Transportation page the After School card cites (`afterSchoolPrograms/charlotte-latin.ts:117`) | A | **yes**: the diff rewrote the L2897 sentence to assert this about transport alone. The box, row and Q4 are older. | https://www.charlottelatin.org/student-life/transportation: "Bus Service Annual Fees 2026-27", "Round trip $1,900", "One Way $950", "Middle/Upper School Sports Activity Bus: $550 per season", "Talons: $80 per session", "Enrichment: $80 per session". https://www.charlottelatin.org/admissions/transportation is still headed 2025-26 ($1,800 / $900 / $450). | Row → "Bus service · $1,900 round trip, $950 one way", `priced`. Box → the 2026–27 fees and URL, noting that the Admissions copy of the page still shows 2025–26. Rewrite the framing sentence and drop Q4. Recount: 7 priced, 7 unpriced, 50% (with LAT-T3: 8 priced, 6 unpriced, 43%; the all-in threshold is still exceeded). Update `componentsTitle`, aside and note, and add the URL to the sources. R11 missed it: it checks the grid against its own note, never the source. |
| LAT-T2 | Latin | After School › Coverage Map, A Day Inside, Verdict, asks | Page gives one value each, unattributed: "dismissal ~3:20" L2084, L2088; "Activity buses: 4:30 p.m. for Lower School" L2093; "the Lower School bus at 4:30" L2173; "Activity-bus integration at 4:30, 5:30 and 6:00" L2332; "7:00–7:25 a.m. bus window" L2095; "between the 3:20 dismissal…" L2343. The ask at L2343 blames "Your Transportation and After-School pages" | The school's two Transportation pages disagree with each other on all four times | B | no (older; the file is untouched by the diff) | student-life/transportation: 3:05 (grades 1–5), 3:20 (MS/US), activity bus "4:45 p.m. (LS only)", morning 7:00–7:25. admissions/transportation: 2:55, 3:30, "4:30 p.m. (Lower School)", morning 7:00–7:20. after-school/hawks-club: 2:55 and the "4:30 p.m. late activity bus". | Show both, attributed: MS/US "3:20 or 3:30 (the school's two Transportation pages differ)"; LS bus "4:30 on the Hawks' Club and Admissions pages; 4:45 on the Student Life page"; morning window the same. Extend verify flag `:95`. Ask → "…2:55, 3:05, or 3:10? Is the Lower School activity bus 4:30 or 4:45? Your two Transportation pages disagree." |
| LAT-T3 | Latin | Financial Aid › Beyond Tuition; After School › ask | "Talons youth sports · no rate" L2926 (`financialAidReports.ts:1419`); "Are there winter and spring Talons seasons, and what is the exact fee for the sport we want?" L2343 (`afterSchoolPrograms/charlotte-latin.ts:366`) | Our own dev-only flag (`:302`) and record hold "$200–$350"; the live page now prices winter and spring | A | no (both lines predate the diff) | https://www.charlottelatin.org/after-school/youth-sports-recreation-program: Session Three (Nov 7–Feb 13) flag football $195, wrestling $250; Session Four (Feb 16–May 22) lacrosse $325 / $350 / $375, soccer academy $300, volleyball $275. Basketball, swimming and indoor field hockey have no fee yet. | Row → "Talons youth sports · $195–$375 a session for the winter and spring programs priced so far", `priced`; recount as in LAT-T1 (this alone: 7 priced, 50%). Ask → "What will Talons basketball, swimming and indoor field hockey cost?" Update the flag, whose "Only Fall sessions are published; winter and spring are not" is stale. It also says grades 3–6: the Talons page lists flag football for KG–5 while the After School hub says 3–6. |
| LAT-T4 | Latin | Financial Aid › Supplemental support, against Global Exposure › Verdict | "It does not publish what else this help covers, or how much need makes a family eligible." L2974 (`financialAidReports.ts:1518` box) | "The Plus Fund helps families on substantial aid with costs beyond tuition, including travel." L715 | A | no: the sentence is older. Round 3 edited the box around it and kept it. | https://www.charlottelatin.org/support/alumni/alumni-giving: "items beyond the tuition, such as lunch, books, rentals, sports fees, travel experiences, or learning resources. The Plus Fund provides funds above tuition assistance…" | Replace the last sentence: "Its Plus Fund names lunch, books, rentals, sports fees, travel and learning resources as examples, for families on substantial aid. The school does not publish how much need makes a family eligible." Add the URL to the section source. |
| LAT-T5 | Latin | Financial Aid › The Aid Engine | NOT PUBLISHED: "the confidentiality policy: who inside the school sees a family's financial information, and how long it is kept" L2952 (`financialAidReports.ts:1485`) | The FAQ this section now cites in full states the confidentiality process and names who reviews | A | no: the box is older. It is a restatement the round's "use the documents" fix missed. | FAQ export (document 1t1sFQu…): "The Office of Admission and the Office of Financial Aid run a parallel but separate process to ensure the confidentiality of the applicant." Materials are reviewed "by the Financial Aid committee". | Narrow the item: "The FAQ says admission and financial aid run as separate processes to keep applicants' information confidential, and a committee reviews the materials. It does not say who else can see them or how long they are kept." |
| LAT-T6 | Latin | Financial Aid › Two navigation hazards | "The tuition page asks for questions at an email address whose domain has two letters swapped. The correct address appears elsewhere on the same page." L3023 (`financialAidReports.ts:1630`) | The tuition page is now correct; the typo is in a linked document | A | no (older) | admissions/tuition-financial-assistance: every financial aid address in the HTML is financialaid@charlottelatin.org. "How to Apply for Financial Aid" export (document 1q7BaP7…): "financialaid@charlottleatin.org". | "The school's 'How to Apply for Financial Aid' document gives an email address whose domain has two letters swapped. The tuition page has the correct address." |
| LAT-T7 | Latin | Compare › aftercare-cost qual | "so this buys 4.5 hours a day, more than any figure beside it" (`metricValues.ts:2040`) | Same row: Providence Day "this covers 5 hours a day"; Country Day "roughly 4.75 hours a day"; Covenant also covers 1:30–6:00 | A | no: in the row since 642bff07 (#119), and untouched by the diff, which added the tile basis beside it | Internal recount of the row. Hawks' Club page today still prices "TK/K 1:30–6:00 p.m." 5-day at $4,650. | Delete ", more than any figure beside it". No value change. |
| LAT-T8 | Latin (same cause at Davidson Day) | Compare › advanced-arts-coursework and ensembles, against The Arts | Both cells `null`: "// not detailed" (`metricValues.ts:1606`), "// no count stated" (`:1660`) | "1 AP / Music Theory — the only arts AP" L874–875, L442; "one band, one orchestra and one choir per division" L870; ensemble board L934–937 | A | no (older) | academics/upper-school/course-offerings: "Music Theory AP". the-arts/performing: "Band (Grades 5-12)", "Orchestra (Grades 5-12)", "Concert Choir (Grades 5-12)". | `advanced-arts-coursework` '1 AP', qual "AP Music Theory is the only AP arts course; there is no AP studio art." `ensembles` '3 ensembles', qual "Band, Orchestra and Concert Choir, each grades 5–12. The Community Chorale is not counted." This backfills existing rows, so no UX gate; run schema and coverage:floor. Davidson Day's advanced cell is also null while its page lists AP Studio Art. |
| LAT-T9 | Latin | The Arts › Verdict | "a student took Best Actress at the 2022 Blumeys … In a 59-school field, Best Actress is the most competitive individual honor available." L985 (`artsPrograms/charlotte-latin.ts:334`) | "59 schools competed in 2026" L896; L918 | A | no (older) | Blumenthal 2022 winners release: "All who participated from the 41 schools this year". 2026 nominees release: "59 area schools". | "In a 41-school field" at L985. The research record's "every year against a 59-school field" (Arts record L254, L505) has the same slip. |
| LAT-T10 | Latin | The Arts › Blumey ledger heading | "The Blumey ledger — every year Latin has placed" L912 (`artsPrograms/charlotte-latin.ts:150`) | Its first row, 2026: "received no nominations in any category" L916–918; L928 says the ledger is "a floor, not a complete history" | C | no (older) | 2026 nominees release re-opened: 59 schools. Internal conflict between heading and rows. | "The Blumey ledger — the four years researched" (or "— from four Blumenthal releases"). School data, not CHROME. |
| LAT-T11 | Latin | The Arts › Verdict ask | "There are no auditioned or tiered ensembles published — no jazz band, no a cappella, no chamber or wind ensemble." L991 (`artsPrograms/charlotte-latin.ts:357`) | The school's club list, the source of the Club Catalog, has an Acapella Club (one of the five arts clubs the catalog says it leaves out, L729) | A | no (older) | student-life/student-clubs/clubs: "Acapella Club: To have fun informally exploring this style of music. No previous experience required." | "…no jazz band, chamber or wind ensemble, and the Acapella Club is an informal group open to all." Keep "no auditioned". |
| LAT-T12 | Latin | Student Clubs › Club Catalog, against Affinity | "houses Q&A and the Black Student Association" L772 (`clubCatalog.ts:113`) | "BSA … sub-group of Mosaic — the school does not expand the initialism" L789–790 | A | no (older) | student-life/student-clubs/clubs: "Under Mosaic we have Q&A and BSA." No expansion. | Catalog note → "Diversity-programming umbrella; houses Q&A and BSA". |
| LAT-T13 | Latin | Student Clubs › Affinity & Identity Groups | "the identity structure here runs through the club roster rather than a separate affinity program" L784–785; "no counts, and no divisional breakout" L785 (`clubsPrograms/charlotte-latin.ts:49–51`); flag `:78` "No Lower or Middle School groups are published" | The school publishes a separate affinity program by division. The page itself also names an "Indian Student Alliance" L651, absent from this card | A | no (older) | about/community-belonging-global-education/academic-transition-and-student-support: "Affinity Group Programming: Brotherhood & Belonging", "historically underrepresented boys in Grades 3–12"; Lower School "Voices", Middle School "The Boys' Room", Upper School "Leadership & Legacy" (future expansion). The 2025 Diwali post names the Indian Student Alliance; the club list does not. | Rewrite the headline, scope and flag: Mosaic is the club-list umbrella; a separate ATSS program, Brotherhood & Belonging, serves boys in grades 3–12 (Upper School part described as future). Add a scope line that the Indian Student Alliance appears in school news and not on the club list; do not count it. Text in an existing card. A new sub-block would be UX-GATE. |
| LAT-T14 | Latin | Student Clubs › Affinity (Mosaic, sources) | "coordinated by the DEI Office under Vernette Rucker, Assistant Director of Diversity, Equity, and Inclusion" L786 (`clubsPrograms/charlotte-latin.ts:55`); source URL `:33` | "its Community, Belonging and Global Education office" L662 | A | no (older) | about/diversity-equity-inclusion is now 404. about/community-belonging-global-education/community-and-belonging: "Vernette Rucker — Associate Director of community and belonging". | → "coordinated under Vernette Rucker, Associate Director of Community and Belonging" (the live page does not itself link her to Mosaic: drop "coordinated" if that link rested only on the dead page). Repoint the source. L796's committee and parent-program quotes also rested on the dead page and need a live source or an earlier-year label. L653's "Office of Diversity, Equity and Inclusion" is a dated 2026 article and can stay. |
| LAT-T15 | Latin | Summer › Fees & fine print, flag | "the school's only published discount" L2875 (`summer/charlotte-latin.ts:1032`); "The only thing the school's site calls a discount is the Super Care bundle" L2878 | "a $10 early-bird discount applied on most camps in a five-day window in January" L2360; "no early-bird discount" L2842 | D | no (file untouched for these lines) | Summer site fetched today: HTTP 401 "Private Site"; not worked around. Committed record L255 and L285–288: an early-bird price exists, and the word "discount" appears only for Super Care. | The user decides whether the committed record is enough. If so: L2875 → "a bundle the school calls a discount, $25.00 less than…". L2878 can stay, as it is literally true. |
| LAT-T16 | Latin | Summer › Cost Planner | "26 offerings. The only tier with no early-bird discount." L2842 (`summer/charlotte-latin.ts:972`) | The committed rate table marks Clay Camp, another planner tier (L2850), "none offered" as well, plus three one-camp tiers | D | no | Summer site 401 today. Record L240–249: Clay Camp $275 early bird "none offered". | The user decides on the record, or waits for the 2027 site. If the record is enough: "26 offerings, with no early-bird discount." |
| LAT-T17 | Latin | Summer › catalog row | "A full-day arts premium camp — one of only two at its price point." at $515 L2705–2710 (`summer/charlotte-latin.ts:681`) | No other $515 row (L2717 Dollhouse is $525); the committed rate table counts 1 at $515 | D | no | Summer site 401 today. Record L247: "$515.00 … 1". | Same decision. If the record is enough: "A full-day arts premium camp, the only one at its price." |
| LAT-T18 | Latin | The Arts › Verdict, against Studio to Gallery | "recognized work in fashion, oil painting and drawing across multiple years" L989 (`artsPrograms/charlotte-latin.ts:350`) | Every dated Scholastic item listed is 2023; the others carry no award year L980 | D | no | the-arts/visual: every dated Scholastic image file carries 2023; the Gold Key file carries a class year (co28), not an award year. | The user supplies a second award year, or the words "across multiple years" come out. |

No finding here matches a settled entry. LAT-T13 is like S5 in kind, but that ruling covers Charlotte Christian's values only.

## Part 3 — R8 triage

The Latin groups are identical to `prior-r8.txt`. None is new, and none gained or changed a number.

- teams 66 / 34: settled row, skipped.
- camps 232 / 169: settled row, skipped.
- seniors 1 / 151 / 38: settled row, skipped.
- students 12 / 1500 / 20 / 22 / 5: settled row, skipped.
- AP 24 / 23: settled row, skipped.

`node scripts/check_consistency.mjs` is clean. R11 passes on the stale bus and Talons rows because it
compares the grid with its own note only (LAT-T1, LAT-T3). No rule reads a Compare qual against the
other cells of its row (LAT-T7) or a null cell against the school page (LAT-T8).

## Checked and consistent

- **Round 3's changes:** LAT-13 tile against the qual, sub and planner; 15 November row against the live document; award timing against the live Application Process page; named-scholarship and eligibility text against the live document; Q7–Q8; the Covenant/Latin citation fix.
- **Admissions:** 13 days, two weeks and six weeks; four bands and their checklists (except P-R5); Feb 26 / Apr 9; deposit; nine staff.
- **Course Offerings:** LS 11 in 3 groupings; MS 23 + 6 = 29; US 105 rows, 23 AP, 11 tabs.
- **Global Exposure:** 22 trips (8 + 5 + 7 + 2); 7 schools, 4 continents; 5 visiting groups; ten questions; Compare trips, homestays, countries and continents.
- **Clubs:** 27-club live list; 25 chips; six programs; three societies; 150 hours.
- **Arts:** five productions; 1,500+; six studios; ensembles 5–12; backstage Grade 6; 2022 wins.
- **Sports:** 24 programs / 16 sports; eight titles; win percentages; volleyball 13–11 + 18–6 + 29–2 = 60–19; Cup season splits, leads, table against point sources; 22 sports in "didn't win" + won; pipeline and bars; Hall of Fame's five classes (live); tenure arithmetic; four S&C coaches.
- **College Support:** 337 / 132; buckets recounted from `cats`; six Ivy enrollees; nine UNC campuses; NC table sums; SAT sums; grade shares 524/833 + 457/806 (record totals 1,639 rows); 625 and 766 of 833; 357 AP Scholar awards; National Merit aggregates; ~38:1; nine staff (live); acceptances page still 2023–25 (live).
- **After School:** every live Hawks' Club rate; the TK/K cliff; $9,300 and $2,950; ≈$33; 27 enrichment classes with no fee.
- **Summer:** seven sessions; planner $1,530 / $102; Super Care $25; add-ons.
- **Financial Aid:** live tuition bands, deposit, plans, late charge, four 2024–25 figures, 14% and $3.125M; $469,800, $251,600, $146,000; component arithmetic as printed.
- **Compare:** every Latin cell, sub and qual read against the page.
- **Looked at, not reported:** the 15 Jan priority row beside the returning-family 15 Nov row (both labelled); Girls Lacrosse matrix record column for 2026, which could not be re-checked; FA confidence meters (hand-set).
- **Not re-fetched:** the profile PDFs, Cup standings, Global Studies site, most clshawks.com pages and the strategic plan's Goal 5.1 page (internal recounts or committed records used); all charlottelatinsummer.com pages (401).

## Files touched

Appended `### Re-verification 2026-11-22 (plan consistency4, self-scan)` under `## Method` in:

- `source-material/financial-aid-tuition/charlotte-latin/Charlotte Latin - Financial Aid and Tuition - Scholarships and Aid FAQ.md`
- `source-material/after-school/charlotte-latin/Charlotte Latin - After School - Redesign Research 2026.md`
- `source-material/student-clubs/charlotte-latin/Charlotte Latin - Student Clubs - Clubs Redesign Deep Research.md` (had no `## Method`; one added at the end)
- `source-material/the-arts/charlotte-latin/Charlotte Latin - The Arts - Arts Redesign Deep Research.md`

## Settled, skipped

- S1: L1455, L1487 ("73 / 75"), L1458/L1489 and the Compare quals.
- S2: L2352, L2358–2359, L2845; Compare summer-camps 232.
- R8 rows: teams (L1005, L1039), camps (L2359), seniors (L1981, L2051), students (L478 and others), AP (L239, L1944).
