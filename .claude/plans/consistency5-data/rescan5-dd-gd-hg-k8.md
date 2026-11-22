# Consistency re-scan (round 5): Davidson Day, Gaston Day, Hickory Grove, Trinity Episcopal, Charlotte Prep

Scanned `main` at 5d26847a on 2026-11-22. Prior baseline: 13551180. `L<n>` is a line of `scan5/pages/<slug>.txt`. Data paths are under `src/data/` unless shown otherwise.

How this was checked:

- All five page dumps were read in full, with the Compare cells and quals for the three high schools and the admissions bands that do not render by default.
- Live pages, PDFs and the NCISAA 2026-27 brackets were fetched with curl's default agent, GET only.
- The Blumey rows rest on committed records and on copies the round-4 scan saved. blumenthalarts.org was not requested.
- The earlier fetches used `curl -L`. After the parent's caution, all 36 URLs were requested again without following redirects and each hop was checked. No chain touches a refused host. The only cross-host hop is Google Docs to its googleusercontent export host.
- Financial Aid "Show sources" rows and dev-only flags were checked in the data. Translated overlays were not checked.
- No student is named in this file or in the appends. A student's role in a show is not a name.

## Part 1: regression check of round 4

**Counts: 99 rows. RESOLVED 94, PARTIAL 2 (HG-T5, X4), REGRESSED 2 (DD-T2, HG-T1), NOT RESOLVED 0, UNCHANGED BY DECISION 1.**

The 99 are the 49 rows of round 4's Part 1, its 39 findings, the 6 cross-school rows that reach this group and 5 items added by the plan's approvals and late fixes. GD-24 is settled as S3 and is not counted.

### Rows that are not RESOLVED

| id | status | where | note and proposed change | caused by round 4? | evidence |
|---|---|---|---|---|---|
| DD-T2 | REGRESSED | DD L1928, `collegeSupportPrograms/davidson-day.ts`:819, against L1913 and L1934 | The past tense and Baking Pot are fixed. The new words "Students dug under permit at Cahal Pech with the BVAR project for 20 seasons." give Davidson Day's students all 20 seasons. The same card says "The profile dates the Belize dig to 2009; its research page dates AFAR itself to 2006." and still asks "Which year was Davidson Day’s first season?" A: "Students dug under permit at Cahal Pech with the BVAR project. AFAR worked there for 20 seasons, through 2026." | **yes** | At 13551180 :819 read "Students dig under permit at Cahal Pech with the BVAR project." with no season count. The live profile still says "in Belize since 2009". The live fieldwork post gives 20 seasons to the project |
| HG-T1 | REGRESSED | Page fixed (HG L1564, L1571-1572, L1685). Compare: `metricValues.ts`:2098, HG value and qual :2124; sibling note :2140 | The row note says "Number of camp weeks the school runs in summer 2026", and the HG cell is now 6 weeks of summer 2023. Only the tooltip says "not summer 2026". The `summer-camps` note ("the school’s own 2026 catalog") has the same clash with HG's 2023 count of 15. C: add "Hickory Grove’s figure is from summer 2023, the last schedule found." to both notes, or add a "(summer 2023)" sub to both cells. | **yes** for weeks; no for camps | At 13551180 the weeks cell was 8, sourced in its qual to "The live 2026 page". The camps cell was already 2023. The live page still says "2027 Camps are coming soon!" |
| HG-T5 | PARTIAL | International band, not shown by default: `admissionsPrograms/hickory-grove-christian.ts`:765 (tile) and :872 (checklist); HG L122-124 | The row label now says "Constant in every domestic band", but the International band still claims the deposit: "$500 · enrollment deposit on acceptance" and "Pay the $500 enrollment deposit, then the balance in full". The same band says full payment is due "instead of a deposit and a billing plan", and the cross-band cell L122 has no deposit. A: delete the tile; the action becomes "Pay in full by August 1". Array items move, so re-splice the locale paths. | no: both strings predate 13551180. The fix stopped at the label | https://hgchristian.org/international-student-enrollment-pr names no deposit. Its only $500 is the "Early Withdrawal fee of $500.00 and 50% of the International Tuition". The committed admissions record lists "acceptance deposit" as NOT PUBLISHED for this band |
| X4 | PARTIAL | `summer/trinity-episcopal.ts`:1213 (TRI L1138-1140); `summer/charlotte-prep.ts`:334 (PREP L739-741) | Eleven tiers got `daysPerWeek`; these two schools got none. Trinity's $395 tier is priced on four-day camps: all three $395 rows run Mon–Thu (L560-564, L763-767, L770-774). The planner divides by five and shows $79 a camp day; the price is $98.75. A: `daysPerWeek: 4`. Prep's $500 tier mixes five-day sports weeks with "Rhythm & Beats", which is Mon–Thu (L637-643): $100 shown, $125 true. A: take that camp out of the tier's detail, or add "(four days, $125 a day)". A tier of its own would be UX-GATE. | no: an incomplete fix | `src/components/SummerPrograms.tsx`:436 divides by `daysPerWeek ?? 5`. Recount of both catalogs |
| Linked-source review 4 (DD back-to-school capture date) | UNCHANGED BY DECISION | `financialAidReports.ts`, DD sources | Rejected in plan consistency3: same 2026–27 edition | no | Outside the round-4 diff |

### Round 4's findings (39)

| id | status | where | note |
|---|---|---|---|
| DD-T1 | RESOLVED | DD L2001, L2013, L2094 | Archive acknowledged; Q8 asks about next year |
| DD-T2 | REGRESSED | DD L1928 | See the table above |
| DD-T3 | RESOLVED | DD L2058, L2095 | Recorded deviation: code comment in place of a flag |
| DD-T4 | RESOLVED | DD L1298, L1310-1311 | Each star and rank names its service |
| DD-T5 | RESOLVED | DD L602-607; three Compare quals | Floor 33/45 recorded |
| DD-T6 | RESOLVED | DD L1962 | "summer camp", with the pointer |
| GD-T1 | RESOLVED | GD L1775, L1790-1796, L1878-1883; six Compare rows | All sums and runs recomputed; matches the live PDF |
| GD-T2 | RESOLVED | GD L1800-1815, L1859-1874 | All three plans recomputed |
| GD-T3 | RESOLVED | GD L1401-1519; both Compare cells | 100 / 60 to 5:30; matches the live page and PDF |
| GD-T4 | RESOLVED | GD L1853, L1889 | |
| GD-T5 | RESOLVED | GD L1420, L1477-1478, L1505 | |
| GD-T6 | RESOLVED | GD L1519 | |
| GD-T7 | RESOLVED | GD L156-227, L1372-1393 | Recorded deviation S10: iGEM dropped |
| GD-T8 | RESOLVED | GD L332; Compare qual | |
| GD-T9 | RESOLVED | Compare `bucket-hbcu` qual | |
| GD-T10 | RESOLVED | GD L63-64, L336, L1292, L1323, L1382, L1391 | Recorded deviation: one source URL |
| GD-T11 | RESOLVED | GD L1836-1837; HG L1723-1724 | |
| GD-T12 | RESOLVED | Compare `summer-ages` qual | |
| GD-T13 | RESOLVED | GD L324 | |
| GD-T14 | RESOLVED | GD L1286 | |
| GD-T15 | RESOLVED | GD L181-182, L1372-1373 | |
| GD-T16 | RESOLVED | GD L104 | |
| HG-T1 | REGRESSED | Compare row notes | See the table above |
| HG-T2 | RESOLVED | HG L1568-1569; Compare qual | Recorded value deviation |
| HG-T3 | RESOLVED | HG L1560, L1759, L1770 | Matches the live page |
| HG-T4 | RESOLVED | HG L1486 | |
| HG-T5 | PARTIAL | International band | See the table above |
| HG-T6 | RESOLVED | HG L667-668, L686, L754 | Recorded deviation: code comment |
| HG-T7 | RESOLVED | HG L674-676, L714, L754 | Recorded deviation: code comment |
| HG-T8 | RESOLVED | HG L1514, L1547, L1550 | |
| HG-T9 | RESOLVED | HG L1483, L1493, L1506 | |
| TRI-T1 | RESOLVED | TRI L1152-1160 | 3 × 265 + 25 = $820 |
| TRI-T2 | RESOLVED | TRI L441-443 | |
| TRI-T3 | RESOLVED | TRI L371 | |
| TRI-T4 | RESOLVED | TRI L622, L685, L720, L790 | |
| PREP-T1 | RESOLVED | PREP L781 | |
| PREP-T2 | RESOLVED | PREP L793 | |
| PREP-T3 | RESOLVED | PREP L915 | Ingested |
| PREP-T4 | RESOLVED | PREP L594-595 | |

### Round 4's Part 1 rows (49)

| id | status | where | note |
|---|---|---|---|
| X1 (DD) | RESOLVED | DD L1290-1294 | 6 + 3 + 2 + 1 + 1 = 13 |
| X1 (GD) | RESOLVED | GD L778 | 2 |
| X1 (HG) | RESOLVED | HG L1095-1096 | 3 + 1 = 4 |
| X3 (DD) | RESOLVED | DD L1869, L1930 | |
| X4 (DD) | RESOLVED | DD L28, L69 | 86 / 87 recounted |
| DD-2 | RESOLVED | Compare `us-courses` qual | |
| DD-3 | RESOLVED | DD L1847 | 22 / 26 attributed |
| DD-5 | RESOLVED | DD L1913 | Both years attributed. The DD-T2 regression is the new sentence at L1928 |
| DD-6 | RESOLVED | DD L1914 | |
| DD-7 | RESOLVED | DD L337, L1917 | |
| DD-8 | RESOLVED | DD L1354-1358 | |
| DD-9 | RESOLVED | DD L1274-1275 | |
| GD-10 | RESOLVED | GD L1536; Compare | 27 rows |
| GD-11 | RESOLVED | GD L1423-1471 | Weekly basis, new rates |
| GD-12 | RESOLVED | GD L736, L763 | |
| GD-13 | RESOLVED | GD L1312 | |
| GD-14 | RESOLVED | GD L1284, L1326-1329, L1392 | |
| HG-15 | RESOLVED | HG L1054-1085 | No win-percentage block |
| HG-16 | RESOLVED | HG L1512, L1515-1523, L1703 | |
| HG-17 | RESOLVED | HG L1570-1571; Compare qual | 15 / 17 recounted |
| HG-18 | RESOLVED | HG L1427-1428 | |
| HG-19 | RESOLVED | HG L1152, L1455 | |
| TRI-21 | RESOLVED | TRI L471 | |
| TRI-22 | RESOLVED | TRI L210, L246-264 | |
| PREP-20 | RESOLVED | PREP L100-115 | |
| PREP-23 | RESOLVED | PREP L337-359 | |
| HG-R1 | RESOLVED | HG L1560, L1770 | Same ask in both cards |
| DD-R1 | RESOLVED | DD L735-764 | |
| DD-R2 | RESOLVED | DD L252, L1913, L1928 | |
| TRI-R1 | RESOLVED | TRI L327, L329 | |
| DD-S1 | RESOLVED | DD L764 | |
| DD-S2 | RESOLVED | DD L1366 | |
| DD-S3 | RESOLVED | DD L1283, L1296 | |
| DD-S4 | RESOLVED | DD L1315 | |
| DD-S5 | RESOLVED | DD L2008, L2085 | |
| DD-S6 | RESOLVED | DD L1840 | |
| DD-S7 | RESOLVED | DD L1975 | Was PARTIAL in round 4 |
| GD-S1 | RESOLVED | GD L239 | |
| GD-S2 | RESOLVED | GD L1303 | |
| GD-S3 | RESOLVED | GD L1808 | |
| HG-S1 | RESOLVED | HG L666, L697 | Superseded by five finalists, which agree |
| TRI-S1 | RESOLVED | TRI L108 | |
| TRI-S2 | RESOLVED | TRI L390 | |
| DD research finding 2 | RESOLVED | DD L2062-2072 | No eleven-month claim |
| HG research finding 4 | RESOLVED | HG L65, L1717, L1746 | |
| Linked sources | RESOLVED | `financialAidReports.ts` | Links present |
| Linked-source review 3 | RESOLVED | `financialAidReports.ts`, HG | ProPublica unlinked, text kept |
| Second review pass 8 | RESOLVED | HG L1692-1694 | 22 Nov 2026 kept for policies |
| Linked-source review 4 | UNCHANGED BY DECISION | DD sources | See the first table |

### Cross-school rows (6) and plan additions (5)

| id | status | where | note |
|---|---|---|---|
| X1 | RESOLVED | GD L1836; HG L1723 | |
| X2 | RESOLVED | DD L630-653; HG L681-701; both Compare cells | Round 4's counts hold. Omitted years are DD-U2 and GD-U2 |
| X4 | PARTIAL | TRI, PREP planners | See the first table |
| X7 | RESOLVED | DD Compare Arts cells | |
| X8 | RESOLVED | Compare `aftercare-cost` note | True for GD and HG |
| X9 | RESOLVED | Compare `pct-aid`, `aid-awarded` notes | HG and GD listed correctly |
| HG matrix title | RESOLVED | HG L1056 | |
| DD literal asterisks | RESOLVED | DD L1913-1931 | None left |
| GD enrolling marks | RESOLVED | GD L842, L868, L1103 | 20 marked in the data |
| GD contacts | RESOLVED | GD L1420 | |
| GD iGEM (S10) | RESOLVED | GD L152, L158; Compare | 9 everywhere |

X3, X5 and X6 have no member among these five schools.

## Part 2: new findings

**16 findings: A 10, B 1, C 3, D 2. None was caused by round 4** (the two conflicts round 4 caused are the REGRESSED rows in Part 1).

Highest impact:

- **DD-U1, GD-U1:** the fall 2026 NCISAA championships are posted. Davidson Day won two titles and Gaston Day one, and Gaston Day's tennis streak ended. The same staleness will reach every NCISAA school's Winning Record, so the parent should merge it into a cross-school row. The same brackets put Charlotte Country Day as field hockey champion and Charlotte Latin as 4A girls tennis champion.
- **DD-U2:** a page says a show "could not be found" when our own committed record names it.
- **HG-T5 in Part 1:** the International band charges a deposit the school does not publish.

### Davidson Day

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change | caused by round 4? |
|---|---|---|---|---|---|---|---|---|
| DD-U1 | DD | Sports › Winning Record; Honors ledger | "Seven state championships in 2023–24 — the most of any 2A school that year — then four, then one. This is a program in visible decline." (`sportsPrograms/davidson-day.ts`:164, L1214-1215); "Boys tennis is the only title survivor of 2025–26" (:166); "37 team titles across 13 programs" (:431, L1335), undated | Two NCISAA 3A titles in fall 2026: volleyball and girls tennis | A (source changed) | https://archives.ncisaa.org/index.php?sport=12&currentyear=1 : champion "#2 Davidson Day School (21-2)". https://archives.ncisaa.org/index.php?sport=11&currentyear=1 : champion "#3 Davidson Day School (10-1)" | "…then four, then one. In fall 2026 it won two more: volleyball and girls tennis." Drop "a program in visible decline". Date the counts: "through 2025–26", "the school’s page counts 37". The Cup card is correctly scoped to 2025–26 and stays. No rule can see this | no: that text is unchanged since 13551180 |
| DD-U2 | DD | Arts › Theatre, ledger and verdict | "The 2023-24 title could not be found" (`artsPrograms/davidson-day.ts`:134, L638); "The Blumey ledger — every year found" with no 2024 (:141, L641); "five finalists in both 2025 and 2026" (:119, L630-631) | 2023-24 was "Something Rotten!", with five finalists | A | Committed `Davidson Day - The Arts - Blumey Verification 2026.md`: "2024 · Something Rotten!". The saved 2024 all-finalists PDF (`scan4/w-cc-cchs-cov-carmel/dl/b24all.pdf.txt`) has five Davidson Day finalist lines for it; not re-fetched, refused host | "Something Rotten! (2023-24)". Add the 2024 row: "Five finalists: Best Actor (as Nick Bottom) · Best Actress (as Bea Bottom) · Best Supporting Actor (as Nigel Bottom) · Best Supporting Actress (as Portia) · Best Featured Performer (as Minstrel). No nomination found." Headline and verdict: "five finalists in each of 2024, 2025 and 2026". Inserted row: re-splice paths | no: :134 and :141 are unchanged. The plan logged the missing year as "Found, not built" |
| DD-U3 | DD | Arts › Blumey ledger, 2023 | "five nominations, three of them for the whole program… The others were Best Actress (as Regina George) and Best Featured Performer (as Mrs. George)." (`artsPrograms/davidson-day.ts`:159, L653) | The saved official 2023 list has four Davidson Day nominations. It lists that Best Actress entry only as a finalist | D | `scan4/w-cc-cchs-cov-carmel/dl/b23.pdf.txt`: "The students listed below are the finalists in the categories of Best Actor and Best Actress. The 6 nominees for these categories will be announced the week of May 1, 2023." The committed research marks it a nomination from an announcement page on the refused host | No change until the user supplies the May 2023 nominee list. Without one: "four nominations… and five individual finalists, including Best Actress (as Regina George)" | no: the Best Actress nomination predates 13551180. Round 4 added Best Musical, which the saved list confirms |
| DD-U4 | DD | Course Offerings; Arts; College Support | Shown as running, with no note: "Creative Writing Honors" (`courseOfferings.ts`:6006, L88), "Modern Music" (:6400, L212, L623, L667, L716), "Forensics & Zoology Honors" (:6504, L242), "AP Spanish Literature and Culture" (:6335, L192-193); "Studio I→Studio II Honors→AP Studio Art" and "1 AP", "Studio Art — the only arts AP" (L612-613, L693, L1916) | The 2026–27 profile marks the first four "Course not offered in 26-27" and prints Studio I and II as College Prep, with no AP Studio Art. The site admits part of this: "AP Spanish Literature is listed but not offered this year" (L1857); Compare: "The 2026–27 School Profile’s course list does not print it." | B (catalog vs profile) | https://resources.finalsite.net/images/v1790855129/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf : "Creative Writing**", "Forensics**, Zoology**", "Spanish Literature**", "Modern Music**", "Studio I*, Studio II*". Committed 2026–27 catalog record lists them | Pick no winner. Append "The 2026–27 profile marks it not offered this year." to the four descriptions and to the Arts Modern Music sentence. Beside AP Studio Art: "(in the catalog; the 2026–27 profile does not list it)". Verify flag, and an Arts ask: "Are AP Studio Art and Modern Music running this year?" Counts stay catalog counts | no: predates. Round 4's new Compare qual exposed the AP Studio Art half |
| DD-U5 | DD | College Support › Applicant's Edge, verdict | "It also has the complete course catalog, with courses not offered clearly marked." (`collegeSupportPrograms/davidson-day.ts`:692, L1919); "the complete catalog with unoffered courses flagged" (:831, L1931) | "22 · AP courses on the 2026–27 Profile’s offered list (the catalog lists 26)" (L1846-1847); Compare: AP Studio Art is not on the profile | A | Same live profile: a one-page grid, missing catalog courses such as AP Studio Art | "a course grid, with courses not offered marked" in both places | no: both strings are in 13551180 |
| DD-U6 | DD | Compare `p4-commits-2426`, `d1-commits-2426` quals | "the Classes of 2025 and 2026 come from the school’s own published lists." (`metricValues.ts`:2380, 2430) | "The school published a seven-athlete signing list for the Class of 2025… Every other row on this card is confirmed on the college’s own roster." (L1288). The card has nine rows for 2025 (L1310) | A | Internal recount and the card's own source note | "The Class of 2026 comes from the school’s recap; the Class of 2025 from its seven-athlete signing list plus college rosters." | no: both quals are in 13551180 |
| DD-U7 | DD | Sports › Coaching | "The continuity anchor · Soccer, since 2017" (`sportsPrograms/davidson-day.ts`:484, L1350) | "2017–2025" (L1361); "the season after he left" (L1358) | C (year label) | Internal | "The continuity anchor · Soccer, 2017–2025" | no: in 13551180 |

### Gaston Day

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change | caused by round 4? |
|---|---|---|---|---|---|---|---|---|
| GD-U1 | GD | Sports › Offered (stat), Winning Record, Honors | "14 team state championships since 2021" (`sportsPrograms/gaston-day.ts`:63, 67, L349, L354); "Fourteen NCISAA team state championships since 2021" (:167, L723-724); "Girls tennis has four titles and is on a three-peat; volleyball and boys soccer have three each" (:169, L724, L736, L743, L761); "State-title matrix, last 3 seasons" over 2023–2025 (:170, L725-729) | Gaston Day won 2A volleyball in fall 2026, so 15 titles and four in volleyball. It was not in the 2026 2A girls tennis bracket, so the three-peat is over. It went out in the first round of boys soccer | A (source changed) | https://archives.ncisaa.org/index.php?sport=12&currentyear=1 : champion "#4 Gaston Day School (14-4)". `sport=11`: champion Epiphany, no Gaston Day. `sport=8`: Gaston Day only in round one | 15 everywhere, with volleyball "four (2021, 2024, 2025, 2026)", tennis "won three straight, 2023–25", and the volleyball detail and honors text extended. Set the existing `matrixTitle` to "State-title matrix, 2023–25", as round 4 did for HG (the user approved that wording pattern there; UX-GATE if the matrix gains a column or the honors ledger a row). The Cup card stays through 2025–26 | no: the file is untouched by round 4 |
| GD-U2 | GD | Arts › "Theatre & the Blumeys" | "The school publishes no production titles, performance dates, cast sizes or theatre competition results… its record is not. This card deliberately carries no awards ledger rather than an empty one." (`artsPrograms/gaston-day.ts`:139, L278); "What is missing is the record rather than the program" (:267, L329). The card's title names the Blumeys and has no Blumey fact (L261) | Blumenthal's lists carry Gaston Day in 2024, 2025 and 2026 | A (chrome label over missing data; deferred to this round by plan consistency4) | Saved copies (`b24all.pdf.txt`, `b25.pdf.txt`, `blumey26.html.txt`; not re-fetched): 2024 "You're a Good Man, Charlie Brown (Revised)", five finalists, with Best Actress and Best Student Set Designer nominations; 2025 "Once Upon a Mattress", five finalists and a Best Ensemble nomination; 2026 "Little Women", five finalists | Add the three rows in the existing ledger field, rewrite both sentences, and save the record with no student names. UX-GATE only if the parent reads a newly filled ledger block as a new sub-section | no: the sentence is in 13551180. Logged as "Found, not built" |
| GD-U3 | GD | After School | "Care runs to 5:30 pm for Pre-K through 8th grade." (`afterSchoolPrograms/gaston-day.ts`:26, L1405); "The program covers Pre-K through 8th grade only" (:85, L1420); :248 (L1509); "the Pre-K–4th tier" (:267, L1519) | "PS–4th · care from 3:00" (L1409, L1437). At this school Preschool (3's) and Pre-K (4's) are different grades | A | https://www.gastonday.org/afterschoolprogram/ : "students PS-8th grade", "LOWER SCHOOL PS-4th Grade" | "Preschool through 8th grade" and "the Preschool–4th tier" | no: the span predates round 4, which reworded the sentences around it |
| GD-U4 | GD | Student Clubs › verdict hint | "Its Upper School page names three clubs and says students can start a new one with a faculty sponsor; its Academic Profile names the rest." (`clubCatalog.ts`:627, L157) | Upper School Student Government is one of the nine, and it is on the Upper School page, not in the profile (L167-168, and the card's own source line) | A | https://www.gastonday.org/upper-school/ names "Upper School Student Government". The November 2025 profile does not | "Its Upper School page names three clubs and the Student Government, and says…; its Academic Profile names the rest." | no: :622 at 13551180 |
| GD-U5 | GD | College Support › Where Graduates Go | "Ivy League — Yale and Dartmouth", "2 / 8" and the 231 list (L854-868) | The school's live Upper School page prints a short college list with Harvard, Brown and MIT, none on our list (also Agnes Scott, Brenau, Wheaton) | D | https://www.gastonday.org/upper-school/ : the list has no year or class in the fetched text, so it cannot be placed inside 2019–2025 | No change. The user decides whether an undated list is merged (the merge rule widens the window, and this one has none) or gets an ask. Do not change a bucket until then | no: not recorded before |

### Hickory Grove Christian

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change | caused by round 4? |
|---|---|---|---|---|---|---|---|---|
| HG-U1 | HG | Admissions › Middle band button | "Three teacher recommendations" (`admissionsPrograms/hickory-grove-christian.ts`:484, L34) | "Math + English + principal/counselor + pastor" (L84); the band's steps say "Four recommendation forms", two of them from teachers | C (label) | Committed Grade-by-Grade and Live-Site Refresh 2026-11-04 records; internal comparison | "Three school recommendations + pastor" | no: outside the diff |

### Trinity Episcopal

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change | caused by round 4? |
|---|---|---|---|---|---|---|---|---|
| TRI-U1 | Trinity | Financial Aid › timeline vs Admissions | "26 Feb 2027", "Application materials due; first admission decisions follow" (`financialAidReports.ts`:2978, L1222) | Kindergarten materials are due "Feb 1, 2027", and Kindergarten decisions are emailed on Feb 26 itself (L35-38, L73-76) | A | https://www.tescharlotte.org/admissions/applying-to-trinity : "due by February 1, 2027 for Kindergarten applicants, and February 26, 2027 for Grades 1-8"; "Kindergarten decisions are emailed to parents on February 26, 2027." | "Grades 1–8 materials due (Kindergarten: 1 Feb); Kindergarten decisions emailed" | no: :2937 at 13551180 |

### Charlotte Prep

| id | school | section(s) | value A (where) | value B (where) | category | evidence (today) | proposed change | caused by round 4? |
|---|---|---|---|---|---|---|---|---|
| PREP-U1 | Prep | High School Placement › Where Graduates Go | "Charlotte Prep has published a rate like it for every class since 2023." (`highSchoolPlacementPrograms/charlotte-prep.ts`:71, L379-380) | Three class tiles beneath: 2026, 2025, 2024 (L381-389). The file says "2023 IS A DIFFERENT MEASURE" | C (measure and window) | Committed Placement Outcomes record: 2023 is "95% … into their top choice high school", singular | "…for every class since 2024." This keeps the user's 2026-10-19 removal of the 2023 quote; the code comment at :6 follows | no: in 13551180 |
| PREP-U2 | Prep | Financial Aid › Section 03 box | "For a family planning nine or ten years at the school, the Early School years cost the most once aid is counted." (`financialAidReports.ts`:3159, L807) | The table beside it: Pre-Primary $17,700, Primary $18,500, TK $23,900, all below Kindergarten's $25,800 (L774-780). The school publishes no award size by grade | A (inference the figures do not support) | Live tuition page: aid "is offered in grades K-8th", with no award amounts | Replace that sentence and the next with "Plan to pay full price for those years." | no: :3118 at 13551180 |

## Part 3: R8 triage

15 groups for these five schools. None is new since the previous report, and every set of numbers matches the settled table, so none needed triage.

- Charlotte Prep teams 10 / 4 / 2 / 3 / 11 / 9: settled.
- Davidson Day teams 35 / 33; students 565 / 13 / 10 / 18 / 500 / 4 / 1; institutions 2 / 70 / 278: settled.
- Gaston Day teams 19 / 7 / 5 / 20; camps 1 / 27; seniors 1 / 35 / 18; institutions 2 / 231 (one source path dropped out, same numbers); students 11 / 510; ensembles 2 / 3: settled.
- Hickory Grove teams 30 / 28 / 27; seniors 1 / 34: settled.
- Trinity teams 4 / 2 / 10; camps 21 / 38 / 8 / 13 / 3; students 5 / 419: settled.

Rule gaps: R3 and R10 read camp counts, not `daysPerWeek` (X4). No rule reads a title count, a streak or an admissions tile against its own band's steps (HG-T5).

## Round-4 builder leads (11)

1. GD contacts: fixed. The omitted "afternoon practice" clause is no value conflict.
2. GD iGEM count: fixed (S10).
3. GD bold enrollment: fixed.
4. DD AP Studio Art unattributed: verified, now DD-U4 and DD-U5.
5. DD bars "to 6:00" without a year: not a finding. L1941, the STALE flag and L1975 all date it.
6. HG athletic page's eight sports and evening sessions: not a conflict. Our five are labelled Summer 2023.
7. Compare summer notes say 2026 over HG's 2023: verified, folded into HG-T1.
8. "every school but Cannon is on 2026–27": true for GD and HG, and DD is null. The other schools are outside this group.
9. GD "programme" (L1923): spelling, not a value. Still open for `check:spelling`.
10. Shared HBCU record's Tougaloo #180: not rendered. The page shows #178.
11. CLAUDE.md floor figures: fixed (33/45).

## Checked and consistent

- **What round 4 changed:**
  - GD's five tuition bands, fees, increases, six Compare runs, every plan payment, the after-school arithmetic and timeline, and the 9-club chips.
  - DD's three Compare Arts cells and the scholarship ceilings.
  - HG's six camp weeks, Blumey counts and withdrawal terms.
  - Trinity's $820. Prep's $175 floor and history percentages.
- **DD:** 86 / 87 / 9 / 26 courses; LEC 13 and 18 staff, service group counts and 11 questions; nine digs and 14 questions; pipeline 21 / 13 / 5 with class and sport splits; records and percentages; NC 177 / 298; bucket absences; tuition runs and 5 of 12 priced.
- **GD:** 46 / 8 / 10 courses; 14 titles through 2025–26 by year and sport; pipeline 3 / 2 / 1 and one senior; NC 140 / 242; merit averages; 27 camps against the live catalog, week by week.
- **HG:** 112 / 12 / 17 and 41 / 9 courses; ESS 9 staff, group counts, seven questions; six clubs; 15 varsity rows; 12 titles; pipeline 7 / 4 / 0; NC 256 / 342; 27 units; tuition runs; the four domestic bands.
- **Trinity:** 13 and 32 courses with 6 and 13 enrichments; 17 clubs; 10 partners; 7 sports and 10 teams; 95 schools in four groups; 83 camps, five bands and the median; camp policy; both admissions bands.
- **Prep:** 11 / 13 / 13 courses; seven clubs; ten teams; 66 schools and 10 linked; $25 and $50 an afternoon; 16 camp rows over seven weeks; +15% changes; $418 estimate; both admissions bands.
- **Not swept:** live news (out of scope) and girls golf and cross country fall 2026 results (not posted).

## Files touched

Appended `### Re-verification 2026-11-22 (plan consistency5, self-scan)`:

1. `source-material/sports/davidson-day/Davidson Day - Sports - Redesign Research 2026.md`
2. `source-material/sports/gaston-day/Gaston Day School - Sports - Program and Championship Ledger 2026.md`
3. `source-material/college-support/gaston-day/Gaston Day School - College Support - School Profile Research 2026.md`
4. `source-material/college-support/davidson-day/Davidson Day - College Support - School Profile 2026-2027.md`
5. `source-material/admissions/trinity-episcopal/Trinity Episcopal School - Admissions - Application Process and Testing.md` (no `## Method` existed, so one was added at the end)
6. `source-material/admissions/hickory-grove-christian/Hickory Grove Christian - Admissions - Live-Site Refresh 2026-11-04.md`

## Student names

No leak was found on the five page dumps. The live Davidson Day fieldwork post names students; a sample check of four of those names found no match in tracked files, and none was written to any file. Their names did appear in this agent's local tool output from that post before the parent's caution, and the sample check passed them to a local `git grep` from a script. None went to an outside service. This is not a census of the research records.

## Settled, skipped

- **S3** (GD camp care period): GD L1732, L1756 and the Compare `summer-care-span` qual. $25 and $35 are unchanged, and the live catalog still prints no period.
- **S10** (GD iGEM not listed, 9 organizations): GD L152, L158 and Compare `≥9`. No current team found on the live Upper School page or the November 2025 profile.
- **All 15 R8 groups** in Part 3.
- Not in settled.md, but decided elsewhere and not reported: "largest admit rates of the six" on a tied 100% (DD L1740, GD L1141, HG L1392; gated by `check:ncsuper`), and the USCAA and junior-college rows at D3 (GD L791, HG L1109; plan `allcommits`).
