# Consistency re-scan #2 — Davidson Day, Gaston Day, Hickory Grove, Trinity Episcopal, Charlotte Prep

Built from `pages3/` (main d19fc9da, deployed). The pages2 → pages3 diff for this group:

- **Davidson Day:** 7 lines changed (252, 364, 372, 729, 731, 758, 1907).
- **Hickory Grove:** 1 line changed (1767).
- **Trinity:** 2 lines changed (327, 329).
- **Gaston Day and Charlotte Prep:** no change.

No line shifted, so pages2 line numbers are also pages3 line numbers. Each row below was checked against the rendered page and its data file.

## Part 1 — consistency2 worklist (`consistency2-data/rescan-dd-gd-hg-k8.md`)

| id | status | where (pages3 line, or file:line) | note |
|---|---|---|---|
| X1 (DD) | RESOLVED | davidson-day 1284-1288 | Basketball 6, Soccer 3, Volleyball 2, Swimming 1, Equestrian 1 = 13 D1, matching the roster recount (21 / 13 / 5). |
| X1 (GD) | RESOLVED | gaston-day 784 | Volleyball 2 only. |
| X1 (HG) | RESOLVED | hickory-grove-christian 1094-1095 | Baseball 3, Football 1 = 4. |
| X3 (DD) | RESOLVED | davidson-day 1863-1864, 1924 | "~92:1 · Upper School students per counselor (computed — 184 ÷ 2)"; the verdict says "~92:1, ~25:1". |
| X4 (DD) | RESOLVED | davidson-day 28, 69 | Tile 86, Compare 86, teaser "Shown here as 87 entries". |
| DD-2 | RESOLVED | metricValues.ts us-courses qual | "86 courses in the 2026–27 catalog; the catalog's own offerings grid on p. 70 shows 66." |
| DD-3 | RESOLVED | davidson-day 1841 | "AP courses on the 2026–27 Profile's offered list (the catalog lists 26)". |
| DD-5 | RESOLVED | davidson-day 1907 | The 2009 and 2006 dates are still attributed. The line was reworded for DD-R2. |
| DD-6 | RESOLVED | davidson-day 1908 | |
| DD-7 | RESOLVED | davidson-day 1911, 337 | |
| DD-8 | RESOLVED | davidson-day 1352 | |
| DD-9 | RESOLVED | davidson-day 1268-1269 | .767 and .804. |
| GD-10 | RESOLVED | gaston-day 1531-1544; Compare summer-camps 27 | 27 rows recounted. |
| GD-11 | RESOLVED | gaston-day 1433-1478 | |
| GD-12 | RESOLVED | gaston-day 742 | |
| GD-13 | RESOLVED | gaston-day 1318 | |
| GD-14 | PARTIAL (minor) | gaston-day 1337 is fixed; 1332-1333 is not | The tile and the Compare qual say "2 college-counseling staff — Director plus Assistant". The Counseling Engine headline still reads "Two counselors for a graduating class of 35 — roughly 18 seniors each". That is the reading the card's own ask (1404) questions. See Part 1b. |
| GD-24 | UNCHANGED BY DECISION | Compare summer-care-span qual; gaston-day Summer Cost Planner | |
| HG-15 | RESOLVED | hickory-grove-christian (no "Win percentage" block; 0 hits) | |
| HG-16 | RESOLVED | hickory-grove-christian 1767 | FA Q3 now reads "Are there other 'student services fees' beyond the after-school childcare rate…". |
| HG-17 | **PARTIAL / REGRESSED** | hickory-grove-christian 1569-1570; `summer/hickory-grove-christian.ts`:33; `metricValues.ts`:2134 (qual), :2118 (comment) | The fix introduced a new count error, so the earlier re-scan's RESOLVED was wrong. See Part 1b. |
| HG-18 | RESOLVED | hickory-grove-christian 1426-1427 | |
| HG-19 | RESOLVED | Compare counselor-caseload; hickory-grove-christian 1151, 1457 | "Second-lightest after Gaston Day" still holds: GD 18, DD 25, Cannon 26, CCD 27. |
| TRI-21 | RESOLVED | trinity-episcopal 471 | |
| TRI-22 | RESOLVED | trinity-episcopal 210, 246-262 | |
| PREP-20 | RESOLVED | charlotte-prep 104-108 | |
| PREP-23 | RESOLVED | charlotte-prep 337-338 | |
| HG-R1 | RESOLVED | hickory-grove-christian 1767; `financialAidReports.ts`:2340 | It now matches the After School ask. |
| DD-R1 | RESOLVED, with residue | davidson-day 729, 731, 758 | Tile captions: "sports, as the school counts them" and "teams, as the school counts them". The footnote holds the 35-team and 13-vs-14-sport sentences, and the 14 distinct sports recount correctly. **Residue:** the footnote's arithmetic does not reach 33 chips (see DD-S1), and the "13 sports" figure is restated unattributed in Coaching (see DD-S2). |
| DD-R2 | **PARTIAL** | Fixed: davidson-day 252 ("on the 2027 schedule"), 364/372 (Greece ask; 14 questions recounted), 1907 (attributed). Missed: 1922 (`collegeSupportPrograms/davidson-day.ts`:819) | The College Support verdict still says "The program runs in four countries, each with a documented start year", stated as fact. The Applicant's Edge card three lines above now says only the profile lists four, and that the Global Studies page and the 2027 schedule name three. Fix: "The 2026–27 profile lists four countries, each with a start year; the 2027 schedule names three." |
| TRI-R1 | RESOLVED (recorded deviation) | trinity-episcopal 327, 329 | "Lower School, before the ensemble choice · K–4" and "The ensemble choice (still Lower School) · 5". |

## Part 1b — plan `consistency` findings (`consistency-data/findings.md`), my schools and X rows

| id | status | where (pages3 line, or file:line) | note |
|---|---|---|---|
| X1 (DD, GD, HG) | RESOLVED | DD 1284-1288 · GD 784 · HG 1094-1095 | The bars are derived. R1/R2 gate them. |
| X3 (DD) | RESOLVED | DD 1863-1864, 1924, Compare "~25:1" | |
| X4 (DD) | RESOLVED | DD 28, 69; Compare 86 | |
| DD-2 | RESOLVED | DD 28, 69; metricValues.ts us-courses qual; Curriculum Guide record L51 | |
| DD-3 | RESOLVED | DD 1841 | |
| DD-5 | RESOLVED | DD 1907; collegeSupportPrograms/davidson-day.ts ~L703 (verify flag) | |
| DD-6 | RESOLVED | DD 1908 | GE 332 keeps the live-page requirement. Both are attributed. |
| DD-7 | RESOLVED | DD 1911 | |
| DD-8 | RESOLVED | DD 1352; matrix 1245 "Two straight titles"; points 1201 | Boys 2023, 2024; girls 2023–2025; tile 5 = 2 + 3. |
| DD-9 | RESOLVED | DD 1268-1269 | |
| GD-10 | RESOLVED | GD 1532-1540; Compare 27 | |
| GD-11 | RESOLVED | GD 1433-1478 | Weekly basis. Drop-in scales $30 → $150. |
| GD-12 | RESOLVED | GD 742, 769 | |
| GD-13 | RESOLVED | GD 1318 | |
| GD-14 | PARTIAL (minor) | Fixed: GD 1337, Compare qual. Not fixed: GD 1332-1333 (`collegeSupportPrograms/gaston-day.ts`:469) | The headline still says "Two counselors … roughly 18 seniors each". The proposed label applies there too: "Two college-counseling staff (a Director and an Assistant) for a graduating class of 35 — about 18 seniors each if both carry a caseload". No value change. |
| GD-24 | UNCHANGED BY DECISION | Compare summer-care-span qual; GD Summer Cost Planner | |
| HG-15 | RESOLVED | HG Winning Record has no win-% block | |
| HG-16 | RESOLVED | HG 1514-1526 (After School), 1702 and 1767 (FA), Compare "≈$260/mo" (the recorded deviation) | The 6–11 vs 6–12 B sub-part is attributed at 1514 and in the ask at 1559. |
| HG-17 | **REGRESSED** | HG 1569-1570; `summer/hickory-grove-christian.ts`:33; `metricValues.ts`:2134 (qual) and :2118 (comment) | The fix wrote "15 half-day camps (17 sessions): **10 academic** camps for rising 1st–8th graders, the College Admissions Boot Camp …, and 5 athletic camps". 10 + 1 + 5 = 16, not 15. The data has **9** academic camps: Science, two Adventure Through the Bible, Foundational Fluency, two Math Fact Fluency, two Spanish Immersion, Beyond the Brush. Add Boot Camp 1 and athletics 5 for 15 rows. Sessions: 9 + 2 repeats (Science, Fluency) = 11, plus 1 + 5 = 17. The original "12 academic … Boot Camp already inside the 12" counted sessions. The fix carried the "10" over as camps. **Fix:** "9 academic camps for rising 1st–8th graders", in all three places. R3 missed it: R3 checks only "N camps" against the rows, never the category breakdown beneath. |
| HG-18 | RESOLVED | HG 1426-1427, 1445 | |
| HG-19 | RESOLVED | Compare "≈34:1" + qual; HG 1151, 1457 | |
| TRI-21 | RESOLVED | Trinity 471 | Chips 16 + 45 + 30 + 4 = 95. |
| TRI-22 | RESOLVED | Trinity 210, 246-262 | |
| PREP-20 | RESOLVED | Prep 104-108 | |
| PREP-23 | RESOLVED | Prep 337-338 | Seasons 4 + 2 + 3 = 9, plus cheer = 10. |

X2, X5, X6 and X7 do not touch these five schools.

## Part 2 — new findings

| # | school | section(s) | value A (where: file:line) | value B (where: file:line) | category | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|
| DD-S1 | DD | Sports › Sports Offered: footnote vs the chips | The new footnote: "The school counts 35 teams. Its list splits middle-school volleyball and boys' and girls' basketball into 5th/6th and 7th/8th teams, shown here as one MS chip each." (`sportsPrograms/davidson-day.ts`:100; page 758). That gives 35 − 3 = 32. | The chips sum to 33: Fall 11, Winter 11, Spring 11 (page 737-757). | A (incomplete reconciliation) | The school's own list, recorded verbatim in the Sports Redesign Research record (re-verification L226-248, fetched 2026-11-20 from https://www.davidsonday.org/athletics/patriot-teams) has one line "Varsity/JV Girls Basketball". The card draws that line as two chips (V, JV), which adds 1. 35 − 3 + 1 = 33. No re-fetch was needed; this is a recount. No rule reads reconciliation prose: R7 reads only "N varsity", and R9 reads sports, not teams. | Append to that footnote sentence: "…shown here as one MS chip each, and its single 'Varsity/JV Girls Basketball' line is shown as two chips." |
| DD-S2 | DD | Sports › Coaching vs Sports Offered | "head coaches for eight of its thirteen sports are undocumented" (`sportsPrograms/davidson-day.ts`:504; page 1360) | Sports Offered names 14 sports, and its footnote (758) says the school's 13 combines two. The tenure ledger (1353-1358) documents coaches for 5 programs: volleyball, boys' and girls' soccer, boys' and girls' basketball. Those are 3 sports. | A (mixed basis) | 13 − 5 = 8 subtracts five *programs* from a *sport* count. By sport it is 3 of 14 documented, 11 undocumented. By Sports Offered row it is 5 of 18. The figure comes from the Redesign Research record L153 ("Head coaches for 8 of 13 sports are undocumented"), our own derivation. Internal recount, no fetch. | "…so head coaches are documented for only three of its sports: volleyball, soccer and basketball." Fix the record's L153 and L212 the same way. |
| DD-S3 | DD | Sports › College Pipeline subhead | "Basketball leads with seven commits: signees to North Carolina, Clemson, Dayton, Furman and Wofford, and a preferred walk-on … at Duke" (`sportsPrograms/davidson-day.ts`:282; page 1278). It names six. | The roster has 7 boys' basketball rows. The seventh is Levon Jacobs '25, Charleston (WV), D2 (roster at page 1304, and the note on him at 1306). | A | Roster recount of `sportsPrograms/davidson-day.ts` `pipeline.roster`. | "…Furman and Wofford, a Division II signee at Charleston (WV), and a preferred walk-on … at Duke." |
| DD-S4 | DD | Sports › Honors & Pro Alumni | "Unusually wide professional reach … across three sports and NASCAR" (`sportsPrograms/davidson-day.ts`:387; page 1309) | The four cards beneath are NBA, NFL, WNBA and NASCAR (1310-1325). That is two sports, basketball and football, in three leagues. | A | Recount of the card's `alumni` entries. | "…across three leagues (NBA, NFL and WNBA) and NASCAR." Or "across two sports and NASCAR". |
| DD-S5 | DD | Financial Aid › Section 01 note and Section 06 "comparison trap" vs the Tuition History table on the same card | "Through 2025–26 that band was six separately priced options (half-day from $12,290)" (`financialAidReports.ts`:1143; page 2002). Same claim at :1327 (page 2082) and in the code comment :1131. | The card's own reduced-day table (pages 2125-2140): the three Toddler options exist only in 2022–23 and 2023–24, "Early Preschool-5 half days" only in 2024–25, and 2025–26 is all dashes. $12,290 is the 2022–23 Toddler (3 half days) price. | A | The Tuition History record (`source-material/financial-aid-tuition/davidson-day/…Tuition History.md`, from Wayback captures). 2022–23 and 2023–24 had six labels (three sharing one full-time price). 2024–25 had four. In 2025–26 "the half-day option disappeared from the table", leaving three labels at one price ($21,620). No re-fetch; this is the committed transcription of the archived pages. | "Through 2023–24 the band had six labelled options (half-day from $12,290 in 2022–23). By 2025–26 only full-time rows remained, and for 2026–27 it is one row." The "~84%" trap sentence stays but should date the half-day price (2022–23). |
| DD-S6 | DD | College Support › Whole Class Analytics, non-traditional destinations | "International universities: seven across five countries (UCL, Edinburgh, Manchester, Toronto, Copenhagen, John Cabot, Richmond American London)" (`collegeSupportPrograms/davidson-day.ts`:786; page 1834) | The seven sit in four countries: the UK (UCL, Edinburgh, Manchester, Richmond American London), Canada, Denmark and Italy. "Five" holds only if England and Scotland count separately. The site's own rule elsewhere (Compare `travel-countries` note) counts England and Scotland as the UK. | C (counting basis) | Internal recount of the named list. | "…seven across four countries (the UK, Canada, Denmark and Italy)". Or keep five and say "counting England and Scotland separately". |
| DD-S7 | DD | Compare › After School `latest-pickup` qual vs After School › Coverage Map | Qual: "The Lower School's Extended Care runs 2:45–6:00 p.m. Confirm current hours with the school." (`metricValues.ts`:1943). The present tense states it as current. | The page marks that window STALE: "The archived After School Care window of 2:45–6:00 p.m. for TT–8 comes from a saved copy of the page dated 18 May 2020 … K–4 dismisses at 3:05" (page 1954). Program pages "now show a 404" (1955). | C (year label) | Internal. The page's own STALE flag and current dismissal times (1937-1950). | Cell stays 6:00 PM. Qual: "From the school's archived 2020 Extended Care page (2:45–6:00 p.m., TT–8). The program pages have since been removed and K–4 now dismisses at 3:05, so confirm current hours." |
| GD-S1 | GD | The Arts › first card title vs the same card, the tile and Compare | Card title "The TK–12 Arts Ladder" (chrome default `the-arts.ladder` in `src/locales/en.json`:628; page 245) | Same card's headline "a PS-12 arts ladder" (245); tile "PS–Grade 12 · Program span" (238); Compare `program-span` "PS–Grade 12". Gaston Day has no TK; its bands are Preschool/Pre-K, K–4, 5–8, 9–12 (FA 1795-1799). | A | Internal. This is COV-25's root cause at a school that sweep missed. Covenant and Carmel got `@slug` overrides (`en.json`:653-659). Gaston Day has none, so it falls back to TK–12. Hickory Grove, PD and Latin also show the default, which is correct for them (all TK–12). | Add `"the-arts.ladder@gaston-day": "The PS–12 Arts Ladder"` to all ten catalogs. Add the old name to `src/lib/cardLinkAliases.ts`, then run `check:cardlink -- --update`. This is chrome, so it is all ten catalogs in Phase 2. |
| GD-S2 | GD | College Support › The Transcript Colleges See: merit table column header vs the same card | The column header is "National Merit & College Board honors" (chrome `cardLabels.nationalMerit`, `CollegeSupport.tsx`:358; page 1309). The rows beneath are college merit scholarships ("21 students awarded · $3.76 million total"…). | The same card: "The profile publishes … no National Merit record" (page 1330). The note under the table: "These are college merit awards … not Gaston Day tuition scholarships". | A (label) | Internal. GD sets `meritTitle` ("College merit scholarships won by graduating classes", `collegeSupportPrograms/gaston-day.ts`:404) but cannot override the column header, so the chrome label sits over data it does not describe. Every other school's table under this header holds National Merit or College Board rows, for example HG 1436-1442. | **Needs a component change (UX approval gate):** an optional per-school column label (for example `meritColumn`), with "College merit awards" for Gaston Day. The alternative is moving the four rows into the card's prose. That is a data-only change but drops the table. |
| GD-S3 | GD | Financial Aid › Beyond Tuition vs Summer › Cost Planner | "Summer camps · $175–$300/week, plus wrap-around care" (`financialAidReports.ts`:2416; page 1815) | The Summer Cost Planner lists "Week 3 — half day (short week) $140" (page 1756). | A | Camp Catalog record L34 ("Week 3 camp — $240 full day and $140 half-day"), from the live Google Doc fetched 2026-11-20 by the first re-scan. | "$140–$300/week". |
| HG-S1 | HG | The Arts › Arts Ladder tile vs the Blumey ledger | Tile "2026 · a Blumey nominee from The Little Mermaid" (`artsPrograms/hickory-grove-christian.ts`:46; page 665-666) | Ledger: "2026 · Disney's The Little Mermaid · Three nominees: Best Supporting Actor …, Best Supporting Actress …, and Best Featured Performer" (page 697). The Compare `signature-recognition` qual says "nominees and finalists in back-to-back seasons". | A (minor) | Internal. | Tile label: "Blumey nominees (three) from The Little Mermaid". |
| TRI-S1 | Trinity | Course Offerings › Lower School teaser vs the rows in both divisions | "The school counts 16 enrichment courses across Lower and Middle School." (`courseOfferings.ts`:8576; page 108) | The rows beneath give 6 Lower School weekly enrichments (Spanish, IDEA Lab, Healthful Living, Visual Arts, Music, Faith Studies), plus Middle School rows each labelled "One of the 13 weekly Middle School enrichments listed in the School Profile". 6 + 13 = 19. | B | https://www.tescharlotte.org/about-us/trinity-at-a-glance, curl HTTP 200, today: "16 Enrichment courses (Lower and Middle School)". The 2026-27 School Profile (as transcribed in the MS Curriculum record, "Weekly Enrichments") lists 13 Middle School items. The LS record gives its Lower School line as six. Neither source says what its count includes. Appended to the MS Curriculum record under a new `## Method`. | No winner. Teaser: "The school's At a Glance page counts 16 enrichment courses across Lower and Middle School; its School Profile lists 6 in the Lower School and 13 in the Middle School." Add a dev verify flag and an ask: "Which enrichments make up the 16?" |
| TRI-S2 | Trinity | Course Offerings › Music row vs The Arts › K–8 Arts Ladder | "Music · K–Gr 5 · 'All students take general music…'" (`courseOfferings.ts`:8641; page 128) | "General music for every child through 4th grade, then a single choice — chorus or band" (`artsPrograms/trinity-episcopal.ts`; page 325-326). The music board: "Curricular, K–4 — everyone participates · General music classes". | B (the school's own tile says both) | The Arts record (live-site recheck 2026-11-14, LS "Performing Arts and Music Education" tile, verbatim): "All students take general music, … K-4 students participate in general music classes. Beginning in 5th Grade, students may choose from one of two ensembles". The tile is a JS popup, and curl of https://www.tescharlotte.org/academics/lower-school today shows only the "Grades K-5 learn in a workshop setting" body, not the tile. So the record is the evidence. It is unclear whether 5th graders keep general music alongside the ensemble. | No value change until the school answers. Course Offerings Music row: grade tag "K–4", with the description adding "From 5th grade, chorus or band (see The Arts)". Or keep K–5 and add to the Arts checklist: "Do 5th graders still take general music alongside chorus or band?" |

No other new value conflicts were found.

## Part 3 — R8 triage (`r8b.txt`)

The R8 groups for these five schools in `r8b.txt` are **identical to `r8.txt`**. The regex fix surfaced no new group for this cohort, and every group was triaged in the last round. Re-checked against pages3:

- **DD teams 35 vs 33:** this is the DD-R1 basis. It is now labelled at 731 and 758, with residue DD-S1 (the footnote's arithmetic gives 32, not 33).
- **DD students 565 / 13 / 10 / 18 / 500 / 4 / 1:** different facts. 565 is enrollment, 13 the Spach dig, 10 the Mount Royal presenters, 18 the AFAR session cap, 500+ AFAR program-wide, 4 a social-skills group size and 1 a chrome "1 course". Not a conflict.
- **DD institutions 2 / 70 / 278:** 2 is the counselor tile (mis-parsed), 70 the fair, 278 the list. Not a conflict.
- **GD teams 19 / 7 / 5 / 20:** headers 7 + 5 + 7 = 19. The 20 chips add volleyball JV. Consistent.
- **GD camps 1 vs 27:** "2-4-1 Camp" was parsed as "1 camp". False positive.
- **GD seniors 1 / 35 / 18:** "~18:1" was parsed as 1. 35 ÷ 2 ≈ 18. Consistent. The headline wording is GD-14 residue, not a number conflict.
- **GD institutions 2 vs 231:** a mis-parsed tile. Not a conflict.
- **GD students 11 vs 510:** "grade-11 students" was parsed as 11. Not a conflict.
- **GD ensembles 2 vs 3:** "drama from grade 2" was parsed as 2. False positive.
- **HG teams 30 / 28 / 27:** attributed: ~30 from the athletics page, 28 from Wikipedia, and 27 coached-level chips explained in the footnote. Not a conflict.
- **HG seniors 1 vs 34:** "≈34:1" was parsed as 1. False positive.
- **Trinity teams 4 / 2 / 4 vs 10:** headers sum to 10, matching the chips. Consistent.
- **Trinity camps 21 / 38 / 8 / 13 / 3:** planner price bands summing to 83, the row count. Consistent.
- **Trinity students 5 vs 419:** the 5 is "K-5 students" in the Youth Art Month note, parsed as a count. The exhibit itself had six Lower School students (1 + 1 + 1 + 2 + 1, matching the text). 419 is enrollment. Not a conflict.
- **Prep teams 10 / 4 / 2 / 3 / 11 / 9:** 4 + 2 + 3 = 9, plus cheer = 10. The Fast Facts 11 is attributed on the tile. Consistent.

## Checked and consistent

- **Every pages2 → pages3 change.** DD:
  - The tile "3 · on the 2027 schedule" agrees with Compare `travel-countries`/`travel-trips` 3, and with the 9 digs over three summers (3 + 3 + 3).
  - The question count "fourteen" matches the 14 questions.
  - The 13-sports footnote matches the 14 distinct names listed.
  - The 1907 attribution, apart from the verdict line (DD-R2).

  HG FA Q3, and the Trinity rungs, also agree.
- **DD.**
  - Middle School has 10 math rows plus Study Skills.
  - Upper School: 86 / 87 / 9 departments / 26 AP rows.
  - LEC: 13 staff (9 specialists), 18 named, services table counts 9/4, 2/1, 1/3, 3/3, 0/1, and 11 questions.
  - Clubs: chips 2 + 1 + 1 = 4, the US-only Compare ≥3, and 7 named partners.
  - Arts: 11 Upper School arts rows, Blumey 2023 (4) and 2026 (5).
  - Winning Record: 7 / 4 / 1. The points list matches the matrix.
  - Pipeline: 21 / 13 / 5, soccer six, 8 Class of 2026 athletes.
  - NC admit rates: 177 / 298 = 59.4% and every 5-year pool.
  - FA arithmetic: $4,320 spread, ceilings $19,590 / $23,910, runs $337,970 / $360,560 / $212,920 / $107,640, ~4.5% steps, 5 of 12 components priced.
  - After School: the 40-minute dismissal spread.
- **GD.**
  - Courses: 46 / 8 departments / 10 AP.
  - Clubs: 10 = 3 + 2 + 3 + 1 + 1, and the 3 named on the Upper School page.
  - Winning Record: 14 titles = 4 + 3 + 3 + 2 + 1 + 1, five in 2021–22, three in 2024–25.
  - Pipeline: 3 / 2 / 1, plus Bree Smith '27 (seniors-committed 1).
  - NC admit rates: 140 / 242.
  - Merit: $3.76M ÷ 21; ~$110K → ~$194K.
  - SAT/ACT tables against the prose ranges.
  - Summer: 27 rows, 8 weeks, Nike weeks.
  - After School: drop-in scaling and $3,420.
  - FA: runs $283,650 / $175,260 / $89,560 against the bands.
- **HG.**
  - Courses: 112 / 12 and 41 / 9.
  - ESS: 9 staff and the services counts 9/3, 0/3, 3/0, 2/2, 0/1, 7 questions.
  - Clubs: 6 chips and Compare ≥4 HS groups.
  - Arts: 3 HS ensembles.
  - Sports: 15 varsity rows, 27 chips, 12 titles = 7 + 3 + 1 + 1, baseball 6 of 7 commits.
  - NC admit rates: 256 / 342.
  - National Merit and College Board rows (1/8, 8 + 6 = 14).
  - After School and FA prices.
  - FA: $2,200 spread, $1,441,873 ÷ 224 ≈ $6,437.
  - Runs: $178,400 / $95,100 / $56,400.
- **Trinity.**
  - Admissions: dates across Admissions and FA (Jan 2 / Jan 15 / Feb 1 / Feb 26 / Apr 9), and 7 CAIS schools.
  - Clubs: 17 = 5 + 5 + 3 + 1 + 1 + 2; affinity 5 = 1 LS + 4 MS; 10 service partners.
  - Sports: 7 sports / 10 teams, 4 Fall 2026 QCAA titles, 3 athletics staff.
  - High School Placement: 95 = 16 + 45 + 30 + 4, 10 dossier links.
  - Summer: 83 rows, $225–$785, 6 weeks with two 4-day weeks, planner bands 21 + 38 + 8 + 13 + 3, and the planner example $870.
  - After School: TED rates restated identically in After School and FA.
  - FA: aid $2,139,114 ≈ "$2.1 million" (live At a Glance), 419 (live).
- **Prep.**
  - Courses: 11 / 13 / 13 entries.
  - Clubs: 7.
  - Arts: 6 recurring productions.
  - Sports: 9 + 1.
  - High School Placement: 66 = 13 + 26 + 17 + 10.
  - After School: $25 / $50 per afternoon.
  - Summer: 7 weeks, 16 rows, four-day prices at 0.8× (Traditional half-day $175 is the brochure figure, a recorded choice).
  - FA: +15% two-year steps, the 11-year +53/+62/+65%, Refund Plan ≈ $418, and the Form 990 series.

## Source-material files touched

- `source-material/course-offerings/trinity-episcopal/Trinity Episcopal School - Course Offerings - Middle School Curriculum.md`. The file had no `## Method`, so one was added at the end, with `### Re-verification 2026-11-20 (plan consistency2, re-scan)` beneath it. It records the live At a Glance stat strip (TRI-S1).
