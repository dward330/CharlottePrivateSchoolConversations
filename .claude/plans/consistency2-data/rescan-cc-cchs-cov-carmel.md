# Re-scan: Charlotte Christian · Charlotte Catholic · Covenant Day · Carmel Christian (2026-11-20, main 0e8882f6)

The pages are from `pages2/<slug>.txt`. Data lines are on 0e8882f6. Three re-verification sections were appended (uncommitted):
- `source-material/the-arts/charlotte-christian/Charlotte Christian - The Arts - Arts Redesign Deep Research.md` (Blumenthal 2013 winners)
- `source-material/student-clubs/charlotte-christian/Charlotte Christian - Student Clubs - Clubs Redesign Deep Research.md` (Knights Nations Club article)
- `source-material/after-school/charlotte-christian/Charlotte Christian - After School - Redesign Research 2026.md` (2026-27 Extended Day packet billing)

## Part 1: regression check

| id | status | where (pages2 line or file:line) | note |
|---|---|---|---|
| X1 (CCHS) | RESOLVED | charlotte-catholic L1401-1410 | Bars Baseball 10 · Football 9 · Lacrosse 8 · Swim & dive 4 · Basketball 3 · Golf 2 · Soccer 1 · XC/track 1 · Softball 1 = 39 = funnel D1 (derived). |
| X1 (Covenant) | RESOLVED | covenant-day L991-999 | 2+2+1+1+1+1+1+1 = 10 = D1; the Tennis bar is appended. |
| X4 (CC) | RESOLVED | charlotte-christian L153, L243 | The tile, teaser and Compare all say 143. The teaser says "Shown here as 129 entries", and 129 rows render. |
| X4 (Carmel) | RESOLVED | carmel-christian L23, L29 | The tile, teaser and Compare all say 96, with "(77 distinct titles)". 96 rows render. |
| X6 (CC) | RESOLVED | charlotte-christian L2909 | "Middle school extended day · $8 per hour, 3:00–5:00 p.m."; the FA questions are now Q1–Q6, and none is about MS care. |
| LAT-2 (CC) | RESOLVED | charlotte-christian L1482, L1512; metricValues bucket-p4 | 55 / 68 on the tile, bucket and Compare. |
| CC-4 | RESOLVED | L153, L243; metricValues us-courses "143" + qual | |
| CC-5 | RESOLVED | L155, L243, L1993 (ask "22 AP courses"); Compare advanced-courses qual | |
| CC-6 | RESOLVED | L921/923 (JK–4 / 5–8), L962, L971 | The Grade 5/6 items moved to Middle School (deviation recorded). |
| CC-7 | RESOLVED | L1967-1968 (CS); L841 (Clubs "late February or early March") | |
| CC-9 | RESOLVED | L2110, L2138 | Minor residue, not a value conflict: the Compare `summer-camps` qual still reads "roughly 96 distinct camps" (metricValues.ts:2150), and the page now says exactly 96. |
| CC-10 | RESOLVED | L766, L815, L817 | MS 7, total 38. |
| CC-11 | RESOLVED | L159 | "Bible plus 5 core subject strands". |
| CC-27 | RESOLVED | L1081 | |
| CC-29 | RESOLVED | L1924; Compare qual | |
| CCHS-12 | RESOLVED | L2065, L2079-2082; Compare tuition-upper $21,562, run-912 $86,248 | The band is labeled "Community". |
| CCHS-13 | RESOLVED | L1326-1388 | The 2026 column now holds 4 STATE cells (girls soccer, both lacrosse, girls swim & dive). Girls lax 2024 shows RUNNER-UP. The five rows are appended. They agree with the Cup point sources (L1311-1320). |
| CCHS-14 | RESOLVED | L1993 | "five honor societies carry published GPA thresholds". |
| CCHS-15 | RESOLVED | L1881 | 13. Recount: 4 + 4 + 1 + 2 + 1 + 1 = 13. |
| CCHS-16 | RESOLVED | L1548-1551, L1575, L2009 | 199 (200 entries). |
| CCHS-17 | **PARTIAL** | Fixed at L536 (Services row: "Five school counselors … A Director of Counseling"). **Still "6 / six"** at L440 (tile "6 · school counselors", `learningSupport/charlotte-catholic.ts:125`), at L561 (Who You'll Work With headline "six school counselors", `:379`) and in the `verdicts.social.head` "Six school counselors…" (`:167`, which renders on the Services verdict chip and is not in the dump). | The staff list beneath (L573-579) shows one "Director of Counseling" and five "School Counselor" titles, so the tile now reads as contradicting the row beside it. A C label fix: tile "6 · counselors · a Director of Counseling and five school counselors, plus a Mental Health Intervention Counselor"; headline "…the Director of Counseling and five school counselors…"; verdict head likewise. The 21 total is unchanged (verified: 5 + 5 + 1 + 6 + 1 + 3). |
| CCHS-31 | RESOLVED | L794, L1066, L1395, L1938-1939; Compare counselor-caseload qual | "~1,171" appears nowhere. ~222 = 1,330 ÷ 6. |
| R8 residue CCHS ~195 | RESOLVED | L1938 | ~222 |
| COV-23 | RESOLVED | covenant-day L1630 | $4,464 (periods 9, label unchanged). Every annual cell = monthly × 9. |
| COV-24 | RESOLVED | L574-575 | "ensembles from grade 3". |
| COV-25 | RESOLVED | covenant-day L574; carmel-christian L433 | "The JK–12 Arts Ladder" / "The K–12 Arts Ladder". |
| COV-27 (+ R8 residue "18 teams") | **PARTIAL** | Headline L712-713 and tile L715 are fixed ("18 sports … 43 V/JV/MS teams below"). **Still "teams"** in the season headers "Fall · 8 teams", "Winter · 4 teams", "Spring · 6 teams" (L723/732/737; `sportsPrograms/covenant-day.ts:51, 65, 75`) and the footnote "The 18-team figure and season groupings are the school's own" (L744; `:87`). | The card now says 43 teams in the tile and 8 + 4 + 6 = 18 teams in the headers. That is the contradiction the fix meant to remove. C: change the headers to "8 sports / 4 sports / 6 sports" and the footnote to "The 18-sport figure…". R8 still flags it (teams 8/4/6 vs 43). |
| COV-2b | RESOLVED | L1001 | "ten sports". The window roster has 11 labels, with Track & Field and XC/Track merged the way the bars merge them. |
| CAR-3 | RESOLVED | L23, L29; Compare qual | |
| CAR-18 | RESOLVED | L895 (30), buckets 30/75 | |
| CAR-19 | RESOLVED | L888-891, L915, L1302 | 214 (217 entries). |
| CAR-20 | RESOLVED | L860 | 4 |
| CAR-21 | RESOLVED | L437-438 | "3 · named ensembles, including the auditioned Ignite Band". |
| CAR-22 | RESOLVED | L429; Compare "1 AP + 3 Honors" | |
| CAR-26 | **PARTIAL** | Tile fixed (L542 "29 · teams across V · JV · MS"; chips recount 10 + 9 + 10 = 29). **The headline still reads "9 varsity sports across roughly 28 teams"** (L538-539; `sportsPrograms/carmel-christian.ts:27`). | A: change to "across 29 teams". Why the gates missed it: R8's `PAIR` regex lets the noun capture `[\w -]{0,40}` swallow digits, so "9 varsity sports across roughly 28 teams" yields one pair ("9", "varsity sports across roughly 28 teams") and "28 teams" is never seen. With a digit-free noun class (`[A-Za-z][A-Za-z -]{0,40}`), R8 reports Carmel "teams: 28 vs 29". Site-wide it also reports Latin "camps: 232 vs 169" and one more value in a students group. R7 reads only "N varsity" figures, so it cannot see a "N teams" headline. |
| CAR-28 | RESOLVED | L1214, L1222, L1226, L1288; Compare "16 AP" | |
| CAR-30 | RESOLVED | L775-777 | "2019–20 finals / 2021–22 finals / 2023–26 finals". |

## Part 2: new findings (fresh sweep)

| # | school | section(s) | value A (where: file:line) | value B (where: file:line) | category | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|
| CC-R1 | Charlotte Christian | The Arts › Arts Ladder (headline, tile) vs Music card and Verdict | "Four fine-arts branches — Digital Arts, Music, Theatre and Visual Art — … and an honor society for each discipline" (`artsPrograms/charlotte-christian.ts:53`, page L912), and the tile "3 · arts honor societies, one per branch" (`:60`, L919) | The page names three societies (Tri-M, Thespian, NAHS: "three societies, one per branch", `:250`; Verdict "Three honor societies", `:331`) for four branches. Digital Arts has none. Clubs › Honor Societies agrees: "one academic, three arts, one world language" (L857). | A | Internal recount of our own lists (four branches named in the same headline; three arts societies listed on Arts and Clubs). | Headline: "…a transcript-level arts credential and honor societies for Music, Theatre and Visual Art". Tile label: "arts honor societies — Music, Theatre and Visual Art (none for Digital Arts)". Music card: "three societies, one each for music, theatre and visual art". |
| CC-R2 | Charlotte Christian | Compare `signature-recognition` (also the Arts header tile, L904) vs Arts › Theatre card | "Blumey Best Show"; qual "Won Best Show at the Wells Fargo Blumey Awards for its production of Oklahoma! (2013)" (`metricValues.ts:1532`, `:1559`) | "Wells Fargo Best Musical", part of a four-award sweep (`artsPrograms/charlotte-christian.ts:126, 167, 172, 317, 323`; page L933-934, L956-957, L1024) | A | https://www.blumenthalarts.org/news/detail/announcing-2013-blumey-award-winners (today): "Charlotte Christian School from Mecklenburg County won the Wells Fargo Best Musical Award for their production of Oklahoma." No "Best Show" award is named. The arts record itself says "it was not a single Best Show win but a four-award sweep". | Cell "Blumey Best Musical (2013)". Qual: "Won the Wells Fargo Best Musical Award at the 2013 Blumeys for Oklahoma!, one of four awards that year…". |
| CC-R3 | Charlotte Christian | Student Clubs › Club Catalog (and Compare `us-organizations` 23) vs Global & Cultural Groups and Global Exposure › Global Community | The catalog shows "23 named Upper School organizations … Global awareness · 1" (Global Knights only), total 38 (`clubCatalog.ts` ~L382-426; page L766-817) | "two global-awareness student groups" (headline `clubsPrograms/charlotte-christian.ts:50`, page L819). Knights Nations Club is listed as an Upper School club "drawing members from all four Upper School grades" (`:65`, L824-825; Global Exposure L685). It is not in the 23. | C | https://www.charlottechristian.com/post-details/~board/knights-headlines/post/knights-nations-club-fosters-a-friendly-and-welcoming-environment-for-upper-school-students (today): "Two years ago, upper school students … founded the Knights Nations Club"; "[name withheld] will lead the club next year". **No date is shown**, so whether it runs in 2026–27 cannot be confirmed, and adding it to the count would be a guess. The dev `count` flag (`:94`) already records that the school's pages disagree, but parents never see that flag. | No count change. Add a parent-visible line on the catalog's Count & scope row: "Knights Nations Club, named in an undated school article, is not on the Upper School clubs list and is not counted." Alternatively, if the user confirms the club is current, add it (US 24 · JK–12 39 · Global awareness 2 · Compare 24). |
| CC-R4 | Charlotte Christian | After School › Cost Planner vs Compare `aftercare-cost` | "School year (9 billing months) $2,925" (`afterSchoolPrograms/charlotte-christian.ts:129-130`, page L2071) | Compare sub "≈$3,250/yr" ($325 × 10) (`metricValues.ts:1997`), qual "the yearly total assumes 10 billing months" (`:2020`) | A | 2026-27 Extended Day Packet, https://resources.finalsite.net/images/v1749660471/charlotte/ahr13amhtgtsrxgzpuwt/2025-26ExtendedDayPacket.pdf (today): "Families are billed monthly based upon attendance…", 5 days $325/month. **No month count is stated anywhere.** This is the X7 root cause (PD and CCD), and X7 was applied to those two schools only. | Apply the X7 ruling (9 months): Compare sub "≈$2,925/yr", qual "the yearly total assumes 9 billing months, which the school does not publish". Optionally relabel the planner "9 billing months (not published)". |
| CCHS-R1 | Charlotte Catholic | Sports › Honors & Pro Alumni | Subhead "The pro list spans four decades and four sports" (`sportsPrograms/charlotte-catholic.ts:380`; page L1440) | The six alumni beneath are NFL ×2, MLS ×2, USL, WTA: **three** sports (football, soccer, tennis) in four leagues (L1442-1458) | A | Sports record "…Program Championships and College Commitments.md" L184-191: Hood and Taylor NFL; McDonough and Smith MLS; Hogan USL; DuPont "professional tennis". | "…spans four decades, three sports and four leagues". The "four decades" figure is not checkable from the record and is left as is. |
| COV-R1 | Covenant Day | College Support › Counseling Engine and Verdict vs Sports › Coaching | "in her 23rd year at the school" (`collegeSupportPrograms/covenant-day.ts:197`, L1484) and "a 23-year director" (`:680`, L1547) | The same card says "2003 · the director's tenure start at Covenant Day" (L1489). Sports says "22 seasons as head coach in 2024", "at Covenant Day since 2003" (`sportsPrograms/covenant-day.ts:355-383`, L1036-1040). From a first season in 2003, 2026–27 is her **24th** year. | A | Internal arithmetic. Sports record "…Coaches Pedigree and Continuity.md" L15/L33: "22nd season of varsity volleyball in 2024". CS record "…Institutional Leverage.md" L28: "at CDS since 2003". No school page says "23rd year"; it is our derivation, written a year earlier or off by one. | Use undated wording that cannot go stale: "…a director at the school since 2003…" in the headline, and "a director at Covenant Day since 2003" in the verdict. |
| CAR-R1 | Carmel Christian | Student Clubs › Honor Societies | Headline "Four documented societies … each with published GPA and induction detail" (`clubsPrograms/carmel-christian.ts:82`; L392-393) | The table beneath gives Spanish Honor Society no GPA and no induction detail ("the CCS Chapter of SHS", last confirmed in the 2021–22 cords table; L385, L410-412). Only NHS, Beta and NJHS carry both. | A | Internal recount of the four rows. | "…three of them with published GPA thresholds and induction windows". |
| CAR-R2 | Carmel Christian | Compare `aftercare-cost` qual vs After School › Coverage Map / Cost Planner | Qual: "one flat After School / After YCC rate — $245/month … **the same for every grade**" (`metricValues.ts:2036`); cell $245/mo, sub ≈$2,205/yr | The page shows kindergarten in Young Cougars Club from 1:15 to 3:00 at $230/mo and then After YCC to 6:00 at $245/mo (L1318-1323, L1352-1356). A kindergartner cared for to 6:00 pays both. Covenant's cell on the same row stacks its JK/K sessions ($744), following the row note "the highest-priced grade band, at the latest pickup tier". | C | Carmel After School record ("…Extended Day.md" L31, L40-41): YCC 1:15–3:00 $230; After School/After YCC 3:00–6:00 $245. The record chose the single priciest tier. Kindergarten's dismissal time is **not** recorded, so a stacked $475 would assume that every K child needs YCC. | No value change: qual "…$245/month … for grades 1–8 after the 3:00 dismissal; a kindergartner in Young Cougars Club from 1:15 adds $230/month ($475 to 6:00)." Whether the cell itself should stack to $475 (≈$4,275/yr), as Covenant's does, is a user decision. It needs the school's kindergarten dismissal time. |

## R8 triage (my schools)

- **CCHS AP 22 vs 2.** Not a conflict. 22 = "AP subjects examined" (2026); 2 = "2 AP courses in junior year" (the load norm).
- **CCHS seniors 336 vs 56.** Not a conflict. 336 seniors; ~56 seniors per counselor.
- **CCHS students 1330 vs 9/10/11/12.** Not a conflict. The 9–12 values are grade numbers in Options course descriptions.
- **CCHS clubs 76 vs 15 vs 23.** Not a conflict. 15 (Sports) and 23 (Service) are category subtotals, and 16 + 23 + 9 + 4 + 15 + 9 = 76.
- **CC teams 50 vs 44.** Not a conflict now. It is the school's "50+", footnoted against the 44 chips (CC-27 resolved).
- **CC AP 22 vs 21.** Not a conflict. It is an attributed split (the guide list has 21; the 22 titles include AP Spanish Literature) (CC-5).
- **CC students (15 values).** Not a conflict. These are Winterim trip group sizes and dated trip counts.
- **Covenant teams 8/4/6 vs 43.** **Real.** The season headers count sports but say "teams" (COV-27 PARTIAL).
- **Covenant camps 29 vs 20.** Not a conflict. The school markets "29 camps" and 20 are enumerable; this is attributed in the intro (L1661) and the Compare qual.
- **Covenant seniors 85 vs 1.** Not a conflict. "1" is the one dedicated counselor in the stat label.
- **Covenant ensembles 1 vs 9.** Not a conflict. "1" is a parse of "sequential from grade 1, ensembles…".
- **Carmel.** r8.txt has no group, but that is the regex defect above. Fixed, R8 shows **teams 28 vs 29, which is real** (CAR-26 PARTIAL).

## Checked and consistent

- **Pipelines** (derived counts match headlines, funnels, bars, Compare p4/d1/seniors-committed, and reality-check prose):
  - CC: 48/35/9, 73% D1 share, P4 spread by sport.
  - CCHS: 54/39/15, roster 59 of 59 with the '27 verbals, "13 of 54", "11 each".
  - Covenant: 35/10/1.
  - Carmel: 20/6/1, "four of the six D1 are basketball", six tennis signees.
- **Win percentages** on all four Winning Record cards, recomputed.
- **Cup tiles against the tables:**
  - CC: 377.5 peak, −345 gap, 235 spring, lead-over-next.
  - Carmel and Covenant: lead-over-next values.
  - CCHS: 655 vs 580 (+75).
  - Cup point sources against the title matrices, for all four.
- **Course Offerings, recounted from data:**
  - CCHS: 199 = AP 26 + Honors 43 + Advanced 18 and the rest; arts department 39; 12 coded ensembles.
  - Covenant: 90 rows and 17 AP; MS teaser (7/grade + 4 Honors + 7 electives); LS teaser (5 × 7 grades + 6 Specials).
  - Carmel: 96 rows and 16 AP; LS 5 core + 6 Specials.
  - CC: 129 rows and 22 AP titles; LS 13 rows; MS 24 rows and 3 elective tracks.
- **Clubs:**
  - CC: 14 + 5 + 3 + 1 = 23; 23 + 7 + 8 = 38.
  - CCHS: 76 by six categories.
  - Covenant: 10 = 1 + 5 + 1 + 1 + 2, matching the Compare qual list.
  - Carmel: 5 = 3 + 1 + 1; MS SGA 9 = 3 + 2 × 3.
  - Service hours: CCHS 10 + 20 × 3 = 70; Carmel 20 per grade.
- **Arts:**
  - Covenant: 9 ensembles and the board (Worship Leadership excluded as a course); Blumey "2 wins, 8 recognitions, 7 seasons".
  - CCHS: 12 coded ensembles; 10 Blumey placements; 650 seats in all three places.
  - CC: 518 seats and the 2017 opening, consistent across cards.
- **College Support:**
  - NC admit tables (pooled sums CC 382/697 and Carmel 346/584; "drew the most" tiles; the "largest admit rates" tags).
  - Bucket tiles against Compare for all four.
  - CCHS scholarship totals labeled by class ($25.2M 2026 vs $17.2M 2025).
  - CCHS 98% and 2% match the profile record.
  - Covenant AP Scholars 38 + 27 + 33 = 98; Covenant SAT/ACT against Compare.
  - Carmel 73% (2023) labels.
  - CC 21 Class-of-2025 signees = the roster's '25 rows (22% of 94).
- **Global Exposure (CC):** 7 + 8 + 6 + 8 + 6 = 35 trips; 17 countries and 3 continents, recounted from the trip data (England and Scotland counted as the UK); credit 0.25 × 4 = 1.0 in CC CS, Clubs and GE alike.
- **Financial Aid:**
  - CC: 15 components; all-ins $21,600 and $27,355; 50% ceilings; run $342,300; 18.33% and 13.89%.
  - Covenant: $1,200 steps and percentages; $7,300 spread; 3.05% of $22,790 ≈ $695; 9-installment plan.
  - Carmel: $6,250 spread.
  - CCHS: $6,521 / ~30%; $23,677 all-in.
  - Admissions fees and deadlines (CC, Covenant) against FA.
- **After School:**
  - Covenant: every annual cell = monthly × 9; stacked rows sum the per-session rates; ≈$23 per afternoon.
  - Carmel: × 9 matches Compare ≈$2,205.
  - CC: fee lines match the FA section and the 2026-27 packet.
- **Summer:**
  - Covenant: eight weeks (June 1 – July 31 minus June 29); care add-ons match Compare.
  - Carmel: 36 rows; the week distribution sums to 36.
  - CCHS: 4 camps.
