# Consistency re-scan (round 4): Davidson Day, Gaston Day, Hickory Grove, Trinity Episcopal, Charlotte Prep

Scanned `main` at 13551180 on 2026-11-22. Prior baseline: 58434f0b. `L<n>` is a line of `scan4/pages/<slug>.txt`. Data paths are under `src/data/` unless shown otherwise.

How this was checked:

- All five page dumps were read, along with the Compare cells and quals for the three high schools and the admissions bands that do not render by default.
- Headline counts were recounted from the rendered lists and the data modules.
- Live pages and PDFs were fetched with curl and a generic user agent, GET only.
- Financial Aid "Show sources" rows render on click and are not in the prerendered HTML, so those rows were checked in the data, not on the page.
- The translated overlays were not checked. The two new chrome keys were confirmed present in all ten catalogs.

## Part 1: regression check of round 3

**Counts: 49 rows. RESOLVED 47, PARTIAL 1, NOT RESOLVED 0, REGRESSED 0, UNCHANGED BY DECISION 1.**

GD-24 is settled as S3, so it is listed under "Settled, skipped" and not counted here. IDs that appear in two of the earlier tables are counted once.

| id | status | where | note |
|---|---|---|---|
| X1 (DD) | RESOLVED | DD L1284-1288 | 6 + 3 + 2 + 1 + 1 = 13 Division I, matching the roster |
| X1 (GD) | RESOLVED | GD L784 | Volleyball 2 |
| X1 (HG) | RESOLVED | HG L1094-1095 | 3 + 1 = 4 |
| X3 (DD) | RESOLVED | DD L1863-1864, L1924 | ~92:1 and ~25:1, each on its own basis |
| X4 (DD) | RESOLVED | DD L28, L69 | 86 courses, 87 entries explained |
| DD-2 | RESOLVED | `metricValues.ts` us-courses qual | 86, with the grid's 66 named |
| DD-3 | RESOLVED | DD L1841 | 22 on the profile, 26 in the catalog |
| DD-5 | RESOLVED | DD L1907 | 2009 and 2006 attributed |
| DD-6 | RESOLVED | DD L1908 | Both requirements attributed |
| DD-7 | RESOLVED | DD L1911, L337 | Program-wide 500+ |
| DD-8 | RESOLVED | DD L1352 | 2 + 3 = 5 titles |
| DD-9 | RESOLVED | DD L1268-1269 | .767 and .804 |
| GD-10 | RESOLVED | GD L1543; Compare | 27 rows recounted |
| GD-11 | RESOLVED | GD L1429-1478 | Weekly basis. The source rates have since changed: GD-T3 |
| GD-12 | RESOLVED | GD L742, L769 | |
| GD-13 | RESOLVED | GD L1318 | |
| GD-14 | RESOLVED | GD L1290, L1332-1337, L1399; Compare qual | Includes both review fixes (second and third card). The ask at L1404 stays by decision |
| HG-15 | RESOLVED | HG Winning Record | No win-percentage block |
| HG-16 | RESOLVED | HG L1514-1522, L1559, L1702; Compare ≈$260/mo | The recorded deviation holds |
| HG-17 | RESOLVED | HG L1569-1570; Compare qual and comment | 9 + 1 + 5 = 15 camps; 11 + 1 + 5 = 17 sessions |
| HG-18 | RESOLVED | HG L1426-1427 | |
| HG-19 | RESOLVED | HG L1454, L1457; Compare | |
| TRI-21 | RESOLVED | TRI L471 | 99 entries, 95 distinct |
| TRI-22 | RESOLVED | TRI L210, L246-264 | Five affinity groups |
| PREP-20 | RESOLVED | PREP L100-115 | 3 + 3 + 5 = 11 entries |
| PREP-23 | RESOLVED | PREP L337-359 | 9 + cheer = 10 |
| HG-R1 | RESOLVED | HG L1767 | Matches the After School ask, as decided. New evidence on its premise: HG-T3 |
| DD-R1 | RESOLVED | DD L729-731, L758 | The residue went to DD-S1 and DD-S2, both fixed |
| DD-R2 | RESOLVED | DD L252, L1907, L1922 | Four on the profile, three on the 2027 schedule |
| TRI-R1 | RESOLVED | TRI L327, L329 | Recorded deviation |
| DD-S1 | RESOLVED | DD L758 | The live teams page has 35 lines; 35 − 3 + 1 = 33 chips |
| DD-S2 | RESOLVED | DD L1360 | Three sports, matching the ledger at L1353-1359 |
| DD-S3 | RESOLVED | DD L1277, L1290 | 5 + 1 + 1 = 7; the reality check says "commitments" |
| DD-S4 | RESOLVED | DD L1309 | Three leagues and NASCAR |
| DD-S5 | RESOLVED | DD L2002, L2079; code comment | Agrees with the table at L2129-2148 |
| DD-S6 | RESOLVED | DD L1834 | Seven schools, four countries |
| DD-S7 | **PARTIAL** | Fixed: Compare `latest-pickup` qual. Not fixed: DD L1969, `afterSchoolPrograms/davidson-day.ts`:174 | The verdict still states the 2020 window as current: "Coverage runs to 6:00 p.m., competitive with peers, and spans Traditional Toddler through grade 8". L1954 on the same page marks that window STALE, and the fixed qual calls it archived. A: "Coverage ran to 6:00 p.m. for Traditional Toddler through grade 8 on the school's 2020 page. Confirm it still does." Dropping "competitive with peers" also follows the no-comparisons rule |
| GD-S1 | RESOLVED | GD L245; ten catalogs | "The PS–12 Arts Ladder" |
| GD-S2 | RESOLVED | GD L1309; ten catalogs | "College merit awards" |
| GD-S3 | RESOLVED | GD L1815 | $140–$300/week |
| HG-S1 | RESOLVED | HG L665-666 | Three nominees, matching L697 |
| TRI-S1 | RESOLVED | TRI L108 | 16 vs 6 and 13, attributed. The 6 and 13 match the rows and the live profile |
| TRI-S2 | RESOLVED | TRI L390 | Ask added, no value change |
| DD research finding 2 (two citations) | RESOLVED | DD L2054, L2056-2068; `financialAidReports.ts` DD sources | No eleven-month claim is left in the data. Both live enrollment pages were re-opened and neither names such a plan |
| HG research finding 4 (Scholarships moved) | RESOLVED | HG L65, L1716, L1745 | All three agree with the live wording |
| Linked sources (scope addition) | RESOLVED | `financialAidReports.ts`, five schools | `[name](url)` links present |
| Linked-source review 3 (HG ProPublica) | RESOLVED | `financialAidReports.ts`:2271, :2352 | Unlinked, text kept |
| Second review pass 8 (HG dates) | RESOLVED | `financialAidReports.ts`:2246, :2303, :2329 | 22 Nov 2026 |
| Linked-source review 4 (DD back-to-school capture date) | UNCHANGED BY DECISION | `financialAidReports.ts` DD sources | Rejected in the plan: same 2026–27 edition |

## Part 2: new findings

**39 findings: A 31, B 5, C 2, D 1. None was caused by round 3.** In each case the conflicting words, or the value they conflict with, predate 58434f0b. The last column gives the evidence.

Highest impact:

- **GD-T1, GD-T2, GD-T3:** Gaston Day's 2026–27 fee schedule is live. It replaces every tuition figure, the after-school price and the closing time on the page and on Compare.
- **TRI-T1:** the Summer Cost Planner overcharges by $50.
- **DD-T1:** a report says no rate history is recoverable above its own five-year table.
- **HG-T1:** the summer card's claim about the live page is no longer true.

### Davidson Day

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change | caused-by-round-3 |
|---|---|---|---|---|---|---|---|---|
| DD-T1 | DD | Financial Aid framing and Q8 vs Tuition History | "The current-year table overwrites the previous one, so no rate history is recoverable." (`financialAidReports.ts`:1124, L1995); Q8 "What have tuition rates been for each of the last five years?" under "Each is unanswerable from published sources" (:1345, L2080, L2088) | "archived copies of the tuition page carry 2022–23 onward" (L2007), "FOUR YEARS, FROM THE ARCHIVE" (L2076) and a five-year table (L2090-2121) | A | Committed Tuition History record (Wayback quotes per year). The live tuition page still shows 2026–27 only | :1124 "The current-year table overwrites the previous one. Archived copies carry rates back to 2022–23." Delete Q8, or ask "What rise do you expect for next year?" | no: :1124 and :1345 are outside the diff. DD-S5 edited the sentences next to them |
| DD-T2 | DD | Global Exposure verdict; College Support Applicant's Edge and verdict vs Firsts & Milestones | "Summer field research at three active sites, one of them on record for 20 seasons" (`internationalTravel/davidson-day.ts`:447, L367); "Students dig under permit at Cahal Pech with the BVAR project" (`collegeSupportPrograms/davidson-day.ts`:819, L1922); "The Belize dig runs with the BVAR project at Cahal Pech" (:680, L1907) | "Cahal Pech ends. The 20th and final season at the site." (L361); "The last of 20 seasons" (L288); 2027 is "AFAR's first season at a new Maya site" (L275) | A | https://www.davidsonday.org/p/~board/all-blogs/post/four-students-three-countries-one-summer-of-fieldwork : "This was AFAR's final season at Cahal Pech. In 2027, the Belize project moves … to Baking Pot" | :447 "Summer field research at three active sites, after 20 seasons at Cahal Pech". :819 "Students dug under permit at Cahal Pech for 20 seasons and move to Baking Pot in 2027." :680 past tense, plus the move | no: round 3 edited the next sentence in :819, and these words predate it |
| DD-T3 | DD | Financial Aid › Scholarships vs its ceiling box | Acclaim "90% of tuition"; Wolter "all but $500 of annual tuition" (`financialAidReports.ts`:1258, L2048-2049) | "no award covers full tuition and that maximum-award families pay $3,000 per year, per student … implies ceilings of $19,590 … to $23,910 (Upper School)" (:1268, L2052; also L1976). Wolter is $26,410 and Acclaim $24,219 in the Upper School, both over $23,910 | B | https://www.davidsonday.org/admission/tuition-and-affordability prints all three rules: "required to pay $3,000 per year, per student"; "90% of tuition"; "all but $500" | Keep all three. Add to the box: "The school's two named scholarships state larger awards, so ask whether the $3,000 minimum applies to them." Add the question and a verify flag | no: untouched by the diff |
| DD-T4 | DD | Sports › Ranked recruits vs roster rank columns | "Three four-star basketball recruits in consecutive classes. Cody Peck ’26 is ranked No. 82 nationally by 247Sports" (`sportsPrograms/davidson-day.ts`:315, L1292). Stevens and Denis are each "No. 1" in NC | Roster "247 Nat'l / 247 State": Peck 120 / 2, Stevens 186 / 4, Denis 79 / 4 (L1304). The committed 247Sports record gives Stevens 3 stars, and 82 as 247's in-house rank | D | The two 247Sports profiles return a script-only page to curl, and On3 returned 403. Neither was worked around | No change until someone opens those pages in Chrome. If the record holds: "No. 82 in 247Sports' own ranking (No. 120 in its Composite)", and say which service gives each fourth star and each No. 1 | no: untouched |
| DD-T5 | DD | Compare › The Arts vs the school page | `advanced-arts-coursework` null "// not detailed" (`metricValues.ts`:1609); `ensembles` null "// no count stated" (:1663); `signature-recognition` null "// no signature recognition named" (:1547) | "1 AP · Studio Art — the only arts AP" (L606-607); "2 · credit-bearing performing ensembles" (L608-609); "five finalists in 2026" and "external theatre identity runs entirely through" the Blumeys (L624-625) | A (not published vs published) | Internal recount, plus the committed 2026–27 Curriculum Guide and Blumey Verification records | Values in existing rows: "AP Studio Art"; "2 ensembles" (qual: Contemporary and the auditioned Theatre Performance Ensemble); "5 Blumey finalists (2026)". This moves `coverage:floor`, so re-run it. Charlotte Latin also has nulls on two of these rows, for that group to check | no: untouched |
| DD-T6 | DD | After School gap vs Learning Support | "No summer program is published on the live site, and no summer page exists in the site map." (`afterSchoolPrograms/davidson-day.ts`:95, L1956) | "Summer tutoring & therapy · June 1 to July 30, 2026: tutoring $47 for 30 minutes…" (L453-455; tile L385-387) | C (scope) | Committed Learning Support record (the school's 2026 summer letter). The live site map has no summer page | "No summer camp is published on the live site… (The Learning Enrichment Center's summer tutoring and therapy are separate: see Learning Support.)" | no: untouched |

### Gaston Day

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change | caused-by-round-3 |
|---|---|---|---|---|---|---|---|---|
| GD-T1 | GD | Financial Aid (header, Section 01, Section 07); top tile; Compare tuition rows | "For 2026-27 the school publishes only a range — $20,300 to $23,310 depending on grade — with no per-grade schedule posted" (`financialAidReports.ts`:2401, L1797); "published without a per-grade table" (:2573, L1878); "2025–26 school year" (:2366, L1786); tile $22,390 (L1782); "2 yrs · of schedules retrievable" (:2574); Compare $19,500 / $21,425 / $22,390 and runs $283,650 / $175,260 / $89,560 (`metricValues.ts`:1112, 1157, 1196, 1245, 1290, 1329) | The school's per-grade 2026–27 schedule | A (source changed or was missed) | https://www.gastonday.org/cost-and-financial-aid/ and the PDF it links, https://www.gastonday.org/wp-content/uploads/2026/01/2627-GDS-Tuition-and-Fees.pdf : half day $9,145; full day $11,340; K–4 $20,300; 5–8 $22,300; 9–12 $23,310 ($21,025 + $2,285) | Re-base the report on 2026–27, with 2025–26 as prior (about +4.1%). Fees run $945 to $2,285. 3 years of schedules. Compare: $20,300 / $22,300 / $23,310; runs $295,280 / $182,440 / $93,240; subs and quals 2026–27; PS qual $11,340 / $9,145. `check:tuition` misses this because it compares the report with Compare, never with the source | no: untouched apart from source links |
| GD-T2 | GD | Financial Aid Sections 02, 06 and Q2–Q4; components | "The fees column is not itemized" (`financialAidReports.ts`:2428, L1807, L1820); "Several" plans, "names none of them" (:2547, L1864-1866); "The deposit amount is not published" (:2554); "None of these appears anywhere on the public site: plan names · an installment schedule · plan fees · a card-processing surcharge · a deposit amount · … a tuition-insurance or refund-plan option" (:2560, L1871); Q2, Q3, Q4 | The 2026–27 schedule publishes each of these | A (not published vs published) | Same PDF: "Fees include security, technology, and text books"; Plans A, B (2 payments) and C (9 payments) with amounts; TRP and surcharge $479–$554 each; re-enrollment deposit $1,150 (late $1,250; preschool $800 / $900); 4% card fee; $100 returned-deposit fee; "PM Shuttle … $600"; lessons "per 30 minute lesson" | Rewrite Section 06 with the three plans and drop those items from the gap list. Late-payment, withdrawal and new-family deposit terms stay unpublished. Itemize the fees in Section 02 and add the shuttle. Drop or narrow Q2–Q4. Re-score the two meters and re-run R11 | no: untouched |
| GD-T3 | GD | After School (all cards); Financial Aid rows; Compare `latest-pickup`, `aftercare-cost`; HG's qual | "Care runs to 6:00 pm … Lower School tier from 3:00 and a Middle School tier from 4:00" (`afterSchoolPrograms/gaston-day.ts`:38, L1413); $95 and $55 a week, $3,420 a year (L1430); "dismissal 4:00" (L1420); "the program web page labels near-identical figures as monthly" (:43, L1426); "The hours conflict", "The billing period conflicts" and two asks (:274-282, L1509, L1519-1526); "No … catalog" / "coming soon" (L1505); FA rows (`financialAidReports.ts`:2415); Compare "6:00 PM", "$95/wk" (`metricValues.ts`:1924, 1996, 2024) | The school's 2026–27 schedule and its program page now agree on $100 and $60 a week, to 5:30 | A (source changed) | 2026–27 PDF: "Lower … 3:00 until 5:30 $100 per week/$30 per day"; "Middle … 3:15 until 5:30 $60 per week/$15 per day". https://www.gastonday.org/afterschoolprogram/ : "The weekly fee is $100 and you will be billed monthly"; "picked up no later than 5:30pm". The PDF also names planned enrichments (Dance, Art, Cheer, Running, Sports, Science & Nature) | $100 / $60; 36 weeks = $3,600; 5:30 PM; Middle care from 3:15 and drop the 4:00 dismissal label; delete both conflict bullets, the monthly reading, the stale flags and asks; "$90 vs $100" in the drop-in note; name the planned enrichments without inventing a catalog. Compare "5:30 PM" and "$100/wk". HG's qual "earlier than the 6:00 p.m. the other schools offer" (`metricValues.ts`:1960) becomes false, so drop that clause | no: untouched |
| GD-T4 | GD | Financial Aid Sections 03–05, Q5 | "How the three routes affect each other is not published" (`financialAidReports.ts`:2530, L1858); Q5 "stack, or offset each other?" (:2582); Indexed Tuition is named nowhere in the report | The cost page publishes the need-aid and voucher rule | A (not published vs published) | https://www.gastonday.org/cost-and-financial-aid/ : "Cost of Attendance at GDS – Opportunity Award = Possible Remaining Financial Need"; "It is possible to receive both"; "the school has implemented an Indexed Tuition plan" | State the offset and the Indexed Tuition plan. Narrow the gap and Q5 to how the Kimbrell awards combine | no: untouched |
| GD-T5 | GD | After School facts vs fine print and verdict | "Registration is free and stated as taking under five minutes." (`afterSchoolPrograms/gaston-day.ts`:85, L1427) | "states no … registration fee" (:171, L1484); "No registration fee … is published" (:182, L1485); "no registration fee published" (:265, L1512) | A | Program page: "There is no charge to sign your child up and registration only takes 5 minutes or less." | Replace all three with "registration is free" | no: untouched |
| GD-T6 | GD | After School ask vs Financial Aid | "Is there any financial-aid pathway or sibling discount for aftercare, as there is for tuition?" (`afterSchoolPrograms/gaston-day.ts`:287, L1526) | "no sibling, military, clergy or employee discount" published (L1860) | A | Cost and Scholarships pages re-read: no sibling discount | "Is there any financial aid for aftercare, as there is for tuition, or a sibling discount?" | no: untouched |
| GD-T7 | GD | College Support Applicant's Edge and verdict vs Student Clubs | "teams in 2012, 2016, 2018 and 2020, with a gold medal. Projects included a kudzu phytotoxin …" (`collegeSupportPrograms/gaston-day.ts`:621, L1381); "The school has a gold-medal iGEM synthetic-biology team" (:612, L1378); "A gold-medal iGEM team" built into the program (:741, L1400) | "The school says its research teams 'previously competed in the iGEM competition for over a decade…' It names no years or projects" (L224) | A | 2023–24 profile PDF: "previously competed". Neither 2025–26 edition names iGEM. The Club Catalog record says the years and projects were removed from the app on 2026-11-10 because only the team wikis give them | Make :612, :621 and :741 past tense on the school's own words ("Silver, Gold and Bronze over more than a decade"). Delete the years, projects and wiki source | no: untouched. Residue of plan `thespianname` |
| GD-T8 | GD | Arts verdict vs Compare `ensembles` | "a four-course visual sequence plus three ensembles in the Upper School" (`artsPrograms/gaston-day.ts`:272, L338), meaning Band, Concert Choir and Vocal Performance Ensemble (L296-299) | Compare "3 ensembles": the Vocal Performance Ensemble plus two Middle School groups; "Band and Concert Choir … are not counted here" (`metricValues.ts`:1676) | A (two different threes) | https://www.gastonday.org/arts/ names one Upper and two Middle School ensembles; the profile lists Band and Concert Choir as courses | Follow the verdict and the other schools' high-school basis in the qual: "Three Upper School ensembles: Band, Concert Choir and the Vocal Performance Ensemble." The value stays 3 | no: untouched |
| GD-T9 | GD | Compare `bucket-hbcu` qual vs acceptance list | "Tougaloo also holds a 2026 Liberal Arts rank (#180), so it scores in two buckets." (`metricValues.ts`:801; comment :790) | "Tougaloo College ↗ Liberal Rank #178" (L1022); tagged `hbcu` only, and #178 is outside the Top-75 bucket | A | `collegeRankings.ts`:289, the 2027 table | Delete the sentence and the comment clause | no: untouched |
| GD-T10 | GD | Course Offerings; College Support; Arts verdict vs the current profile edition | "British Literature" (`courseOfferings.ts`:7259, L63); a 2024–25 grade distribution by department is published (`collegeSupportPrograms/gaston-day.ts`:453, 734, 739; L1329, L1398); "ARTS grade distribution … (72% A+…)" (`artsPrograms/gaston-day.ts`:288, L342) | The edition College Counseling now links has "European Literature(H)" and no grade-distribution table | B (two live editions) | https://www.gastonday.org/wp-content/uploads/2025/11/25-26-GDS-Profile-1.pdf (linked) vs https://www.gastonday.org/wp-content/uploads/2025/09/New-GDS-Profile-25-26.pdf (still HTTP 200) | Name both: "European Literature (British Literature in the September edition)". Attribute the distribution to the September 2025 edition. Verify flag; point source links at both | no: untouched |
| GD-T11 | GD, HG | Financial Aid › What the Numbers Disclose | "$0 · published aid budget, total awarded, or average award" (GD `financialAidReports.ts`:2485, L1841); "$0 · published aid totals, averages, or rates" (HG :2255, L1722) | "26% of the student body on tuition assistance" and "No total aid budget in dollars" published (L1837, L1847); HG "funds are awarded until depleted" (L1712) | A (label: an unpublished figure shown as zero dollars) | Both live aid pages describe aid and publish no totals | Value "Not published", same label. **Cross-school:** the same tile is at Covenant (:1007) and Carmel (:2061) | no: untouched |
| GD-T12 | GD | Compare `summer-ages` qual vs catalog | "half-day enrichment camps span rising PreK–6th" (`metricValues.ts`:2203) | "Baseball Camp · Rising 1st–8th · $220", a half-day camp (L1569-1575) | A | Live camp catalog Google Doc lists "Baseball Camp (1st -8th)" under the half-day enrichment camps | "rising PreK–8th" | no: untouched |
| GD-T13 | GD | Arts › Studio to Gallery label vs its body | "Art-school matriculation" (`artsPrograms/gaston-day.ts`:246, L330) | "The 2019–2025 acceptance list includes…" (L331); "It is not where any one class landed." (L848) | A (label) | Profile heading "College Acceptances"; enrolled status is not recoverable in our record | "Art-school acceptances" | no: untouched |
| GD-T14 | GD | Whole Class Analytics vs course list | "A broad Honors tier sits below the AP courses across every department" (`collegeSupportPrograms/gaston-day.ts`:713, L1292) | PE / Health has no Honors and no AP course (L117-120) | A | Both 2025–26 profile editions' course tables | "…across most departments" | no: untouched |
| GD-T15 | GD | Applicant's Edge vs Capstone descriptions | "a required 40-hour Capstone every senior must defend" (`collegeSupportPrograms/gaston-day.ts`:612, L1378-1379) | "Students document and report on it throughout." (L188; also L1324, L1383) | A | Profile: "must complete a special project or internship". The records hold no defense | "must complete" | no: untouched |
| GD-T16 | GD | Course Offerings requirement vs the list | "Completion through Level III, in Spanish or French, is required" (`courseOfferings.ts`:7299, L104) | The World Language list holds Spanish I–IV and no French (L103-106) | B | Both profile editions list only Spanish. The committed Curriculum record quotes French or Spanish from the Upper School requirement and logs the missing sequence as a gap | Append "The profile's course table lists only Spanish." Code comment, as the division has no flags | no: untouched |

### Hickory Grove Christian

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change | caused-by-round-3 |
|---|---|---|---|---|---|---|---|---|
| HG-T1 | HG | Summer catalog, scope, STALE flag; Compare `summer-weeks` | "roughly eight week-blocks from late May through late July" (`summer/hickory-grove-christian.ts`:35, L1570); "The live 2026 page confirms eight session windows consistent with the week-blocks below"; names "hide[den] behind the Brushfire platform" (:37, :258, L1571, L1684); tile "8" (L1563) and qual (`metricValues.ts`:2088, 2104) | The 15 rows fall in six weeks: May 30, Jun 5, 12, 19, 26, Jul 24 (L1583-1682). The record built "~8" from 2022 variants | A (recount, and the source changed) | https://www.hgchristian.org/summer-camps : "2027 Camps are coming soon!", six named camp types, no session windows. https://www.hgchristian.org/athletic-camps : eight sports, dates "this spring". The old address redirects | "across six weeks from late May to late July". Scope and flag: the 2027 slate arrives in spring 2027, and the live page names camp types only. Compare 8 → 6 with a Summer 2023 qual, or keep 8 only if labelled as our 2026 capture. R10 reads per-row week lists, not a season span, so it missed this | no: HG-17 edited only the category count in the sentence before |
| HG-T2 | HG | Summer "Ages served" tile and Compare vs the catalog | "rising 1–8 · Ages served" (`metricValues.ts`:2191, L1567-1568) | "College Admissions Boot Camp … Rising 11–12" (L1647), the filter "Rising 11–12" (L1573) and the headline (L1569). The tile has no qual on the school page | A | 2023 record: grades 1–8 plus 11–12. Live page: "rising kindergarteners through middle schoolers", with a camp for incoming TK and K5 | "rising 1–8, 11–12" on the 2023 basis. Qual adds that the live page now advertises rising K through middle school | no: untouched |
| HG-T3 | HG | Financial Aid Section 05 and Q3 vs the linked policies and Learning Support | "no late-payment or withdrawal terms, appear in the sources checked" (`financialAidReports.ts`:2325, L1756); Q3 "Are there other 'student services fees' … where can we see them" under questions "the public record cannot answer" (:2344, L1767; After School :158, L1559 area) | The same Tuition and Fees page publishes withdrawal and delinquency terms and links the ESS fee schedule. Learning Support prints those fees (L469-471, L505-545) | A (not published vs published) | https://www.hgchristian.org/tuition-and-fees : "written withdrawal notice minimum of two weeks prior to withdrawal", delinquency rules, "lunch account, graduation fees, and athletic fees"; links https://files.smartsites.parentsquare.com/14485/edsupportservicesfees26-27.pdf | State both policies. Replace Q3 and the After School ask with "What do lunch, athletic and graduation fees cost?" and point to the ESS fees in Learning Support | no: round 3 edited other boxes and only linked this page |
| HG-T4 | HG | Applicant's Edge vs recognition window | "a decade of College Board recognitions" (`collegeSupportPrograms/hickory-grove-christian.ts`:514, L1485) | "across the seven-year profile window", 2020–2026 (L1434-1440, L1488) | A | Committed 2026–27 School Profile record, a PDF transcription | "seven years of College Board recognitions" | no: untouched |
| HG-T5 | HG | Admissions cross-band table vs International band and band steps | "Constant in every band": pastor form "required at every grade", "$300 application fee", "$500 … deposit", testing (`admissionsPrograms/hickory-grove-christian.ts`:976-978, L123-124). Records row for Middle and High has no IEP/504 (:920-921, L90-91) | International: two teacher forms and no pastor (L86), application fee "amount is not published", English tests instead of entrance testing. The Middle and High steps and checklists both require "any … IEP, 504" | A (scope and omission) | Committed Grade-by-Grade and Live-Site Refresh 2026-11-04 records; internal comparison | Label "Constant in every domestic band", or scope the sentence if the label is shared. Append "· any IEP, 504 or testing" to the two Records cells | no: untouched |
| HG-T6 | HG | Arts ladder, Theatre | "Two productions a year, a fall show and a spring musical" (`artsPrograms/hickory-grove-christian.ts`:100, :109; L667-668, L681) | The performing-arts page describes three | B | https://hgchristian.org/arts-home : "Two drama productions: a fall show and spring musical". https://hgchristian.org/performing-arts : "two drama productions and a spring musical" | "The Arts home page counts two… The Performing Arts page lists two drama productions and a spring musical." Verify flag and ask | no: untouched |
| HG-T7 | HG | Arts vs Course Offerings | High School "Technical Theatre & Management" (`artsPrograms/hickory-grove-christian.ts`:73, L676). Middle School board: two bands and Praise Team, no choir (:156, L710-713) | The 112-course catalog has no such course (L302-316). The Middle School catalog lists "Choir · Gr 7–8" (L434-435) | B (Arts page vs catalogs) | Live performing-arts page lists Technical Theatre and no Middle School choir; both committed 2026–27 catalog records say the reverse | Attribute: "Technical Theatre & Management (on the Performing Arts page, not in the catalog)"; add "Choir (7th–8th, in the course catalog)". Ask and verify flag | no: untouched |
| HG-T8 | HG | After School headline and verdict | "covers the whole school" (`afterSchoolPrograms/hickory-grove-christian.ts`:33, :138; L1513, L1546); "Whole-school coverage … so there is no division gap" (:142, L1549) | Study Hall is "grades 6–11"; grade 12 is the open question (L1514, L1547, L1559) | A | https://www.hgchristian.org/afterschool-program : "Study Hall – for students in grades 6–11". Rates PDF: 6th–12th | "covers TK through at least 11th grade"; drop "no division gap" | no: untouched |
| HG-T9 | HG | College Support vs Summer | The Boot Camp "is run by the counseling staff" and "runs" today (`collegeSupportPrograms/hickory-grove-christian.ts`:449, 532, ask :641; L1482, L1492, L1505) | Summer labels it part of "the Summer 2023 catalog … not the live 2026 list" (L1571, L1642-1647) | C (year label) | The live Summer Camps page no longer names it | Add "(in the Summer 2023 catalog)" and past tense. Ask "Does it still run?" | no: untouched |

### Trinity Episcopal

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change | caused-by-round-3 |
|---|---|---|---|---|---|---|---|---|
| TRI-T1 | Trinity | Summer Cost Planner | "One-time fees $75"; "$870 for the summer" for 3 × $265 (`summer/trinity-episcopal.ts`:1238-1247, L1151-1155) | The fine print calls the $50 a deposit "per camp" with a balance due later (L1157-1160). It is part of the price, not one-time and not extra | A (arithmetic) | Camp policies Google Doc https://docs.google.com/document/d/14ZB0WDM6t513Z0VYqYbaZkyObFOHxXwXjypYaB1_yX0/export?format=txt : "$50 nonrefundable deposit/camp **towards your camp tuition**… A $25 administrative fee … as well." | Remove `amount: 50` and label it "Nonrefundable deposit, per camp, credited to the camp price". One-time $25; 3 × 265 + 25 = **$820** | no: untouched (the previous sweep recomputed $870 without re-reading the policy) |
| TRI-T2 | Trinity | High School Placement tile | "9 · years on one campus before the search begins · Kindergarten through 8th grade" (`highSchoolPlacementPrograms/trinity-episcopal.ts`:78, L441-443) | "Fall of 8th grade — the search begins" (L445, L447). K–7 is eight years | A | Internal; committed placement record quote "begin the process of picking a high school" in fall of 8th grade | "years on one campus before high school" | no: untouched |
| TRI-T3 | Trinity | Arts › course path vs Course Offerings | "K–4 art, on the TAB model → Middle School art" (`artsPrograms/trinity-episcopal.ts`:284, L371), which drops 5th grade | "Visual Arts · K–Gr 5" (L126); Middle School is 6–8 (L194) | A | Live 2026–27 School Profile lists Visual Arts among Lower School weekly enrichments; the live Lower School page is "Grades K-5". K-4 is the art teacher's title | "Lower School art (K–5), on the TAB model". The teacher's title stays | no: untouched |
| TRI-T4 | Trinity | Summer catalog descriptions vs division grade spans | Rising 4–8 "for the older Middle School bands"; rising 3–8 "spanning the whole Middle School band"; rising 5–8 "for the Middle School band" and "A Middle School leadership camp" (`summer/trinity-episcopal.ts`:220, 339, 404, 536; the Wildcat Cycling, Tennis 101, Procreate and Kamp HUROP rows) | Lower School is "K – Grade 5" (L108) and Middle School "Grades 6 – 8" (L139) | A | Live Lower School page: "Grades K-5". The committed camp catalog gives those four camps as 4-8, 3-8, 5-8 and 5-8 and does not call them Middle School | Name the grades instead: "A half-day cycling camp for rising 4th–8th graders", "Half-day tennis instruction for rising 3rd–8th graders", "…for rising 5th–8th graders", "A leadership camp for rising 5th–8th graders, and the second…" | no: untouched |

### Charlotte Prep

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change | caused-by-round-3 |
|---|---|---|---|---|---|---|---|---|
| PREP-T1 | Prep | Financial Aid Section 01 vs Tuition History | On the 2024-25 → 2026-27 rise: "Since 2024-25 the school has folded its athletics, fine arts and technology fees into tuition, so part of the rise replaces fees families once paid separately." (`financialAidReports.ts`:3061, L781) | "From 2024–25 … so part of **that year's** rise replaced fees" (L915). The fees are already in the $25,000 base | A | https://charlotteprep.org/about/strategic-plan-2022-2027 : "included the fees for athletics, fine arts, and technology in tuition for the 2024-25 school year and will continue to do so" | "The school folded … into tuition in 2024-25, so both years in this comparison include them." | no: untouched |
| PREP-T2 | Prep | Financial Aid vs Summer Cost Planner | "Summer camp — $250 to $600 a week (2026)" (`financialAidReports.ts`:3081, L793) | "$175 in the four-day week", "$200 in the four-day week" (L725, L731) | A (same shape as GD-S3) | Committed Summer 2026 Costs record (brochure page images) | "$175 to $600 a week (2026)" | no: untouched |
| PREP-T3 | Prep | Tuition History prose vs its table | "Before 2019, Charlotte Prep raised tuition about 2–4% a year." (L915) | Kindergarten rose 0% and 0% (L883-890) | A | Committed Tuition History record; recomputed | "…raised Grades 1–8 tuition about 2–4% a year, and held Kindergarten flat for two of those years." Fix in `source-material/financial-aid-tuition/charlotte-prep/Charlotte Preparatory School - Financial Aid and Tuition - Tuition History.md`:33, then ingest | no: untouched |
| PREP-T4 | Prep | Summer headline vs catalog | "plus a specialty or sports camp almost every week" (`summer/charlotte-prep.ts`:35, L594-595) | All seven weeks have a specialty camp (L636-676), and all seven have a sports camp (L683-711) | A | Recount of the catalog rows | "…every week" | no: untouched |

## Part 3: R8 triage

15 groups for these five schools. None is new since the prior report. Thirteen match the settled table exactly and are listed below. The other two:

- **DD teams 35 vs 33:** not a conflict now that DD-S1 shipped. L758 explains all three merged chips and the one split line (35 − 3 + 1 = 33), and the live page still has 35 lines. Candidate for the settled table.
- **GD seniors 1 / 35 / 18:** not a conflict. The numbers are unchanged. GD-14 only removed two places that restated the ratio. "1" parses "~18:1", and 35 ÷ 2 ≈ 18 is labelled computed. Candidate for the settled table.

## Checked and consistent

- **Round 3's own edits:**
  - DD: the 35-team footnote, the three coached sports, seven basketball commitments, three leagues, four countries, both early-years sentences and the removed payment plan.
  - GD: all three counseling restatements, both labels and the $140 floor.
  - HG: 9 academic camps, three nominees and all three discount sentences.
  - Trinity: the 16 vs 6 + 13 teaser and the Arts ask.
- **DD:**
  - Courses: 86 / 87 / 9 departments / 26 AP. Middle School 12 entries.
  - Learning Enrichment Center: 13 staff (9 specialists), 18 named, service counts, 11 questions.
  - Global Exposure: 14 questions, nine digs.
  - Pipeline 21 / 13 / 5 and its class splits. Winning Record 7 / 4 / 1.
  - NC admit rates 177 / 298. Bucket absences 5 and 9.
  - Tuition runs, the 5 of 12 priced components and every history percentage.
- **GD:**
  - Courses 46 / 8 / 10 AP and 10 Middle School entries. Clubs 3 + 2 + 3 + 1 + 1 = 10.
  - Titles 14 in six sports, five in 2021–22. Pipeline 3 / 2 / 1.
  - NC admit rates 140 / 242. Test, AP and GPA series against both profile PDFs. Merit totals.
  - 27 camp rows, prices and Nike weeks against the live catalog.
- **HG:**
  - Courses 112 / 12 / 17 AP and 41 / 9.
  - Student Services: 9 staff and fee lines against the live PDF. Clubs 6, with at least 4 in high school.
  - 15 varsity rows and 27 chips. Titles 7 + 3 + 1 + 1. Six of seven commits are baseball.
  - NC admit rates 256 / 342. 27 graduation units. Tuition, scholarship tiers and runs against the live pages.
  - The four domestic admissions bands' dates and fees.
- **Trinity:**
  - Courses 13 and 32, with 13 enrichments. Clubs 17. Ten service partners.
  - Sports 7 / 10. Placement 95 = 16 + 45 + 30 + 4.
  - 83 camps and all five price bands.
  - Tuition, activity fees, after-school and lunch rates, and deadlines against the live page. Both admissions bands.
- **Prep:**
  - Courses 11 / 13 / 13. Clubs 7. Six recurring productions. Sports 9 + 1.
  - Placement 66, and class lists of 39 / 27 / 29 / 20.
  - $25 and $50 an afternoon. Seven camp weeks and 16 rows.
  - The +15% and 11-year changes, the $418 refund-plan estimate and the 990 series. Both admissions bands.

## Files touched

Appended a `### Re-verification 2026-11-22 (plan consistency4, self-scan)` to each of these. "New" means the file had no `## Method`, so one was added at the end as the brief directs. Nothing else in the repo was changed.

1. `source-material/financial-aid-tuition/gaston-day/Gaston Day School - Financial Aid & Tuition - Schedule and Aid Programs 2026.md` (new)
2. `source-material/after-school/gaston-day/Gaston Day School - After School - Program Hours and Rates 2026.md` (new)
3. `source-material/college-support/gaston-day/Gaston Day School - College Support - School Profile Research 2026.md` (new)
4. `source-material/summer-programs/gaston-day/Gaston Day School - Summer Programs - 2026 Camp Catalog.md`
5. `source-material/financial-aid-tuition/hickory-grove-christian/Hickory Grove Christian - Financial Aid - Deep Dive Report.md`
6. `source-material/summer-programs/hickory-grove-christian/Hickory Grove Christian - Summer Programs - Camp Catalog.md` (new)
7. `source-material/the-arts/hickory-grove-christian/Hickory Grove Christian - The Arts - Program Overview Web Check 2026-11-10.md` (new)
8. `source-material/financial-aid-tuition/davidson-day/Davidson Day - Financial Aid and Tuition - Tuition History.md`
9. `source-material/international-travel/davidson-day/Davidson Day - International Travel - Source URLs.md`
10. `source-material/sports/davidson-day/Davidson Day - Sports - Redesign Research 2026.md`
11. `source-material/summer-programs/trinity-episcopal/Trinity Episcopal School - Summer Programs - Summer Costs and Policies.md` (new)
12. `source-material/financial-aid-tuition/charlotte-prep/Charlotte Preparatory School - Financial Aid and Tuition - Tuition History.md`

## Settled, skipped

- **S3** (GD camp care period): GD L1739 and L1763, and the Compare `summer-care-span` qual. $25 and $35 are unchanged, and the live catalog still prints no period.
- **R8 rows matching the settled table:**
  - Davidson Day: students, institutions (DD L258, L1888).
  - Gaston Day: teams, camps, institutions, students, ensembles (GD L356, L1639, L851, L1269, L244).
  - Hickory Grove: teams, seniors (HG L765, L1457).
  - Trinity: teams, camps, students (TRI L398, L1133-1145, L1234).
  - Charlotte Prep: teams (PREP L339).
- **Not in settled.md, but already decided or planned, so not reported:**
  - "largest admit rates of the six" on a tied 100% (DD L1734, GD L1147, HG L1391): the tie rule of PRs #162–#164, gated by `check:ncsuper`.
  - USCAA and junior-college commits shown as D3 (GD L797, HG L1108): plan `allcommits` already changes both.
