# Consistency re-scan — Davidson Day, Gaston Day, Hickory Grove, Trinity Episcopal, Charlotte Prep

Built from `pages2/` (main 0e8882f6, deployed). Each row checked against the rendered page and its data file. Line numbers are `pages2/<slug>.txt` unless a file is named.

## Part 1 — regression check

| id | status | where | note |
|---|---|---|---|
| X1 (DD) | RESOLVED | davidson-day 1284-1288 | Bars: Basketball 6, Soccer 3, Volleyball 2, Swimming 1, Equestrian 1 = 13 D1. Matches my recount of the roster (D1 13, P4 5). The all-level prose ("seven", "six") matches the roster too: basketball 7, soccer 2+4. |
| X1 (GD) | RESOLVED | gaston-day 784 | Volleyball 2 only. The Boys Basketball (D3) bar is hidden. |
| X1 (HG) | RESOLVED | hickory-grove-christian 1094-1095 | Baseball 3, Football 1 = 4 D1. |
| X3 (DD) | RESOLVED | davidson-day 1861-1864, 1924 | "~92:1 · Upper School students per counselor (computed — 184 ÷ 2)". The headline gives 92 and 25 (Class of 2027). The verdict says "~92:1, ~25:1". |
| X4 (DD) | RESOLVED | davidson-day 28, 69 | Tile 86, Compare 86, teaser "86 … Shown here as 87 entries, adding the AFAR … program". |
| DD-2 | RESOLVED | metricValues.ts:183 + qual; Curriculum Guide record L51 | Qual: "86 courses in the 2026–27 catalog; the catalog's own offerings grid on p. 70 shows 66." The record's metrics line now says 86. |
| DD-3 | RESOLVED | davidson-day 1841 | "AP courses on the 2026–27 Profile's offered list (the catalog lists 26)". |
| DD-5 | RESOLVED | davidson-day 1907, 1928 (ask); collegeSupportPrograms/davidson-day.ts ~L703 (verify) | Both years are attributed, with a new ask. |
| DD-6 | RESOLVED | davidson-day 1908, 1923 | Profile and Global Studies page are attributed. The verdict line no longer says "two weeks". |
| DD-7 | RESOLVED | davidson-day 1911 | "more than 500 students program-wide (2026)", matching GE line 337. |
| DD-8 | RESOLVED | davidson-day 1352 | "two straight titles (2023, 2024). Girls soccer won three more under him (2023–2025)." The tile "5 state titles" = 2 + 3. The matrix says "Two straight titles". |
| DD-9 | RESOLVED | davidson-day 1268-1269; Sports Redesign Research record L56-57 | .767 and .804 on both. |
| GD-10 | RESOLVED | gaston-day 1532, 1540; metricValues.ts:2119 | Data and the Compare cell both hold 27. The comment sums 2+11+10+3+1 = 27. Partners are CTC, Legends, Studio Elite and 2-4-1, plus Nike. |
| GD-11 | RESOLVED | gaston-day 1433-1478 | Basis is weekly: "$95/ week", year $3,420 (36 wk). Drop-in rows scale $30 → $150. |
| GD-12 | RESOLVED | gaston-day 742, 769 | "Four titles since 2021". The "fourth overall" sentence is gone. |
| GD-13 | RESOLVED | gaston-day 1318 | "rose by about three-quarters (~$110K → ~$194K)". |
| GD-14 | RESOLVED | gaston-day 1337; Compare qual | "college-counseling staff — Director plus Assistant". |
| GD-24 | UNCHANGED BY DECISION | metricValues.ts summer-care-span qual | Still "$25/week … $35/week", as the user ruled. |
| HG-15 | RESOLVED | hickory-grove-christian ~1080 | The win-% bar block is gone. |
| HG-16 | **PARTIAL** | financialAidReports.ts:2341 → hickory-grove-christian 1767 | The After School cards, the verdict, the asks, the verify flag (afterSchoolPrograms ~L70), the re-pointed URLs (L26-27) and the Compare `≈$260/mo` cell (the recorded deviation) are all done. **The residue:** Financial Aid Q3 still asks "What are the 'student services fees,' and do they include the after-school program rate?". Yet the same card prints the rate (line 1702: "$2,600 a year for TK–5, $1,300 for grades 6–12"). See HG-R1. |
| HG-17 | RESOLVED | hickory-grove-christian 1565-1574; metricValues.ts:2118 | 15 camps (17 sessions). Chip "15 of 15". Compare 15, with a qual. |
| HG-18 | RESOLVED | hickory-grove-christian 1426-1427, 1445 | Tile "17", "including the AP Seminar → AP Research Capstone track". No "17 + Capstone" is left in `src/data`. |
| HG-19 | RESOLVED | Compare counselor-caseload; hickory-grove-christian 1151, 1457 | "≈34:1". Qual: "67 Class of 2025 graduates over 2 counseling staff … against the Director alone it is 67:1." DD's "second-lightest after Gaston Day" still holds (GD 18, DD 25, Cannon 26, CCD 27, HG 34). |
| TRI-21 | RESOLVED | trinity-episcopal 471 | "41 of its 99 entries (95 distinct schools)". The chips sum 16+45+30+4 = 95. |
| TRI-22 | RESOLVED | trinity-episcopal 210, 246-262 | Catalog "Affinity · 5" and the card's five name the same five groups. 12 Tribes moved to the Lower School line. "Middle School · 4 groups". |
| PREP-20 | RESOLVED | charlotte-prep 104-108 | "Younger children · Ages 2–3 / Primary students · Ages 3–4 / Older students · Ages 5–6". TK is no longer paired with 5–6. |
| PREP-23 | RESOLVED | charlotte-prep 337-338 | "Ten teams: nine across three seasons, plus girls cheerleading". The season headers give 4+2+3 = 9. The tile reads 10 ("Fast Facts says 11"). |

Note on HG-16's Compare cell, not a finding: `aftercare-cost` now uses two conventions where the school publishes no month count. Monthly-billed schools are spread over 9 months for the year (PD, CCD, the X7 default). Annual-priced schools are spread over 10 months for the month (Cannon, Latin, HG). Every qual states its own basis, so no value conflicts. At 9 months, HG would read ≈$289/mo.

## Part 2 — new findings

| # | school | section(s) | value A (where) | value B (where) | category | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|
| HG-R1 | HG | Financial Aid › Questions vs Financial Aid › fees, and After School | FA Q3: "What are the 'student services fees,' and do they include the after-school program rate?" (`financialAidReports.ts`:2341; page 1767) | The same FA card: "after-school childcare ($2,600 a year for TK–5, $1,300 for grades 6–12)" (`financialAidReports.ts` ~L2205; page 1702). After School: "Annual prices only — the Tuition and Fees page lists $2,600 … $1,300". Its ask was already reworded to "Are there other 'student services fees' beyond the after-school rate…" (`afterSchoolPrograms/hickory-grove-christian.ts`:158). | A (residue of HG-16) | https://www.hgchristian.org/tuition-and-fees, re-read live 2026-11-20 for HG-16: "TK-5th Grade After School Childcare: $2,600; yearly · 6th-12th Grade After School Childcare: $1,300; yearly". Not re-fetched; this is the same fact. | Reword FA Q3 to match the After School ask: "Are there other 'student services fees' beyond the after-school childcare rate, and where can we see them before enrolling?" Or drop it. Phase 2 must re-translate that one unit. |
| DD-R1 | DD | Sports › Sports Offered: headline and stat tile vs the level chips beneath | "35 teams across 13 sports"; tile "35 · teams across V · JV · MS" (`sportsPrograms/davidson-day.ts`:52, :57) | The V/JV/MS chips beneath sum to 33: Fall 11, Winter 11, Spring 11 (page 737-757) | C (counting basis) | https://www.davidsonday.org/athletics/patriot-teams (curl, HTTP 200, today): "35 teams in 13 sports". It lists 35 lines, including separate "5th/6th" and "7th/8th" teams for girls' volleyball, boys' basketball and girls' basketball, plus one "Varsity/JV Girls Basketball" line. The card folds each MS pair into one MS chip (−3) and splits V/JV girls' basketball (+1). R7 reads only "N varsity", so no gate sees this. R8 printed it (35 vs 33). Recorded in the Sports Redesign Research record under `## Method`. | No value change. Tile label: "teams, as the school counts them". Add one footnote sentence: "The school counts 35 teams. Its list splits middle-school volleyball and boys' and girls' basketball into 5th/6th and 7th/8th teams, shown here as one MS chip each." |
| DD-R2 | DD | College Support › Applicant's Edge vs Global Exposure tile, intro and Compare `travel-countries` | "real archaeology digs in Belize, Spain (2014), Greece (2017) and Portugal (2018)" (`collegeSupportPrograms/davidson-day.ts`:680; page 1907) | "3 · countries with AFAR digs · Spain, Portugal and Belize, per the school". "Each summer, students go with AFAR to Spain, Portugal and Belize." Greece only as "2017–18 … its 2017 and 2018 research trips" (`internationalTravel/davidson-day.ts`:65, :73-74, :204; page 308). Compare `travel-countries` 3. | B | 2026–27 Profile PDF, fetched 2026-11-20 (College Support School Profile 2026-2027 record, re-verification L462): "ongoing archaeological research with … AFAR … in Belize since 2009, Spain since 2014, Greece since 2017, and Portugal since 2018." The Global Studies page, fetched 2026-11-20 (International Travel Source URLs record L81): "most students taking advantage of the AFAR research trips to Spain, Portugal, and Belize". The 2027 schedule (same record L77, L101-103) lists Spain, Portugal and Belize only. So the profile calls Greece ongoing, and the school's web pages do not. | No winner. In College Support, attribute it: "The profile lists Greece (since 2017) among ongoing sites. The school's Global Studies page and the 2027 schedule name Spain, Portugal and Belize." Add a dev verify flag, plus a GE ask: "Does AFAR still dig in Greece?" The GE "3" stays, labelled as the current schedule. |
| TRI-R1 | Trinity | The Arts › K–8 Arts Ladder vs Course Offerings, Clubs and Financial Aid | "Lower School · K–4", then "The ensemble choice · 5", then "Middle School · 6–8" (`artsPrograms/trinity-episcopal.ts`:98-99; page 327). The K–4 rung's own third item cites "Shakespeare in Fifth Grade" as a Lower School performance. | "K – Grade 5 Lower School Courses" (page 108), "Lower School · grades K–5" (Clubs, page 259), "Grades K–5 $26,670" (FA, page 1179) | C (scope) | https://www.tescharlotte.org/academics/lower-school (curl, today): "Grades K-5 learn in a workshop setting". The archived Lower School Enrichments transcription in the arts record says "K-4 students participate in general music classes. Beginning in 5th Grade, students may choose…". So K–4 is the general-music span, not the Lower School span. This is the same shape as LAT-8a. No rule checks division labels across areas. Recorded in the arts record under `## Method`. | Rename the first rung "Lower School general music · K–4" (or `name: 'General music'`, `grades: 'K–4'`). Rename the second "The ensemble choice · 5 (still Lower School)". Middle School · 6–8 stays. |

No other new value conflicts were found.

## R8 triage (my schools)

- **DD teams 35 vs 33:** a real conflict of basis → DD-R1.
- **DD students 565 / 13 / 10 / 18 / 500 / 4 / 1:** different facts. Enrollment is 565. 13 dug the Spach site, and the Clubs flag and GE agree. 10 presented at Mount Royal. 18 is the AFAR session cap. 500+ is AFAR program-wide. 4 is a Learning Support group size. 1 is a "1 course" chrome line. Not a conflict.
- **DD institutions 2 / 70 / 278:** 2 is the counselor tile, mis-parsed. 70 colleges came to the fair, and 278 is the acceptance list. Not a conflict.
- **GD teams 19 / 7 / 5 / 20:** the season headers sum to 7+5+7 = 19, matching the headline and tile. The 20 chips add volleyball's JV. Consistent.
- **GD camps 1 vs 27:** "2-4-1 Camp" was parsed as "1 camp". A false positive; 27 = rows = Compare.
- **GD seniors 1 / 35 / 18:** "~18:1" was parsed as "1". The 35 seniors ÷ 2 ≈ 18 on the tile, wholeClass and Compare. Consistent.
- **GD institutions 2 vs 231:** 2 is the counseling-staff tile, mis-parsed. 231 = acceptance list. Not a conflict.
- **GD students 11 vs 510:** "grade-11 students" was parsed as 11. 510 is enrollment, used throughout, with NCES 448 attributed. Not a conflict.
- **GD ensembles 2 vs 3:** "drama from grade 2, ensembles" in a source label was parsed as 2. The 3 ensembles appear on Compare and the card. A false positive.
- **HG teams 30 / 28 / 27:** "~30" is the athletics page and 28 is Wikipedia, both attributed. The 27 chips cover only coached levels, as the footnote explains. Not a conflict.
- **HG seniors 1 vs 34:** "≈34:1" was parsed as "1". A false positive.
- **Trinity teams 4 / 2 / 4 vs 10:** the headers sum to 10, matching the chips. Consistent.
- **Trinity camps 21 / 38 / 8 / 13 / 3:** these are cost-planner price tiers. They sum to 83, the camp count. Consistent.
- **Trinity students 5 vs 419:** 5 exhibitors and 419 enrollment are different facts. Not a conflict.
- **Prep teams 10 / 4 / 2 / 3 / 11 / 9:** 4+2+3 = 9 plus cheer = 10. Fast Facts' 11 is attributed on the tile, and the chips number 9. Consistent.

## Checked and consistent

- **Pipelines (DD, GD, HG):** I recounted every roster row. DD 21 / 13 / 5, GD 3 / 2 / 1 (plus Bree Smith '27, excluded) and HG 7 / 4 / 0 match the funnels, the headlines, the bars and the Compare `p4`, `d1` and `seniors-committed` cells. DD's reality-check restatements match too: basketball 7, soccer 6, 2 lacrosse at D2, 2 track at D3.
- **GD Winning Record:** 14 titles = tennis 4 + volleyball 3 + boys soccer 3 + golf 2 + track 1 + swim 1. Five in 2021–22, across six sports.
- **GD Sports Offered:** 19 = 7+5+7.
- **GD Cost Planner:** the weekly figures, drop-in scaling, $3,420 per year, and the hours and billing conflicts are attributed in the verdict and the Compare qual.
- **GD summer:** 27 camps; "four partner providers and Nike" matches the provider list.
- **GD arts:** "550 seats" and "510 students" agree everywhere.
- **DD Course Offerings:** Middle School "10 math + Study Skills" holds 12 rows, the 12th being "Upper School course access". The Upper School has 86 courses and 87 rows, explained. The "N courses — scroll" chrome header counts rows at every school by design (R4 explains it in the teaser).
- **DD College Support:** the 22-AP, 92:1 and 25:1 restatements, the verdict and the Compare caseload qual agree. "Second-lightest after Gaston Day" is still true.
- **DD Global Exposure:** "more than 500" agrees with College Support. The Spach "13 students" agrees with Clubs.
- **DD Compare tuition runs:** re-added: $360,560 and $212,920. `check:tuition` also guards these.
- **HG:** 112 courses (tile, Compare and rows); 17 AP (tile, College Support, Compare); 158 colleges; the bucket tiles against Compare; summer 15 / 17 sessions on the tile, chip and Compare; after-school prices across After School, FA and Compare (apart from HG-R1).
- **Trinity:** the affinity catalog against the card; the HSP 95 against the chips and the checklist; Lower School K–5 in Courses, Clubs and FA (apart from TRI-R1); 17 clubs.
- **Prep:** the Montessori stages against admissions ages; Sports 9+1; the After School per-afternoon figures ($4,500 ÷ 180 = $25; drop-in 2.5 h × $20 = $50); Early School Extended Day $2,700 / $5,900 in After School and FA.

Source-material appended (re-verification, under `## Method`):
- `source-material/sports/davidson-day/Davidson Day - Sports - Redesign Research 2026.md`
- `source-material/the-arts/trinity-episcopal/Trinity Episcopal School - The Arts - Program Overview and Ensembles.md`
