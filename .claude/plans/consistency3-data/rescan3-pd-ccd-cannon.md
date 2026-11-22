# Consistency re-scan #2: Providence Day, Charlotte Country Day, Cannon (main d19fc9da, 2026-11-20)

Read from `pages3/` and diffed against `pages2/`, then traced to `src/data`. Line numbers are `pages3` lines unless a file is named.

## Part 1: consistency2 worklist (`consistency2-data/rescan-pd-ccd-cannon.md`)

| id | status | where | note |
|---|---|---|---|
| X1 (Cannon) | RESOLVED | Cannon L1159-1167 | Bars are Lax 5, Boys BB 2, Girls BB 2, FB 1, VB 1, Swim 1, which sum to 12. Prose 8 / 23 and 5 / 12 recount from the roster. |
| X2 | RESOLVED | PD L2743 · CCD L2507 · Cannon L2119 | 70 / 72 / 76 equal the row counts. |
| X3 (CCD) | RESOLVED | CCD L1660, L2213 | ~27:1 |
| X4 | RESOLVED | PD L285 · CCD L251 · Cannon L104 | 172/153, 117/121 and 104/101 |
| X5 (PD) | RESOLVED | `metricValues.ts` L1167, L1268 | Quals say grades 6–8; $254,275. |
| X6 (PD) | RESOLVED | PD L3322, L3339 | "Sixteen … 9 unpriced … 56%". The bus is "not counted either way". Recount: 6 priced + 1 range + 9 unpriced = 16; 9/16 = 56%. |
| X6 (CCD) | RESOLVED | CCD L3191, L3197, L3202, L3261 | Enrichment "$260 full / $225 mini". 4/10 = 40%. Q3 drops enrichment. This agrees with After School L2476 ($225 mini). |
| X7 | RESOLVED | `metricValues.ts` L1976 | The row note now states both conventions: 9 billing months, or 10 for an annual or semester price. |
| PD-4 | RESOLVED | PD L1180, L1182 | TK–5 / 6–8 |
| PD-17 | **PARTIAL** | PD L1099 · `clubsPrograms/providence-day.ts` L119 | The tile (L1103-1104) and GE (L850) say "one of only two" member schools in NC. The Service card's intro, two lines above the tile, still says "a global network membership **no other school in the state holds**". The last re-scan marked this RESOLVED and missed it. Fix: "… and membership in a global network that only one other North Carolina school holds". |
| PD-18 | RESOLVED | PD L1102 | 38 = 24 + 5 + 9 |
| PD-19 | RESOLVED | `clubCatalog.ts` L251 | "39 interest + 16 competitive + 9 + 6 + 4 + 3" = 77 |
| PD-20 | RESOLVED (but see PD-S1) | PD L1175, Compare `ensembles` | Shows the proposed "4 curricular + 2 auditioned". The 2026–27 catalog now contradicts the split (PD-S1). |
| PD-23 | RESOLVED | PD L134, L285 | 30 AP |
| PD-24 | RESOLVED | PD L175, L285 | |
| PD-25 | RESOLVED | PD L3345 | |
| PD-26 / PD-R7 | RESOLVED | PD L603 · Compare `travel-countries` "16" · PD L883 | "~19 … 2021–25 … The trips listed on this card (2022–23 to 2026–27) reach 16 countries, the figure on Compare". The 16 + 4 arithmetic is gone. Recount: 16 trip countries. "four continents abroad" (L883). |
| PD-27 | RESOLVED | PD L1173, L1293 · Compare qual | "AP Art and Design · AP Art History · AP Music Theory" at every site. The only "Studio Art" left is the non-AP course row (L534). |
| PD-28 | RESOLVED | `artsMatrix.ts` | |
| CCD-5 | RESOLVED | CCD L1662-1671, L2289 | |
| CCD-7 | RESOLVED | CCD L1004, L1663, L2055, L2269, L2291 | The Clubs tile now reads "175+ … (the same page also says 100+)". College Support attributes 24/23 states, 70/69 and $14.7M/$14.8M, and the ask covers 4 vs 5 counselors. |
| CCD-8 | RESOLVED | CCD L1006 | |
| CCD-9 | RESOLVED | CCD L1152, L1185 | Fast Facts NAHS on both rungs. |
| CCD-10 | RESOLVED | | 20% (341) |
| CCD-11 | RESOLVED | CCD L873 | |
| CCD-12 | RESOLVED | CCD L1237 | |
| CCD-24 | RESOLVED | CCD L139, L251 | 117 |
| CCD-27 | RESOLVED | CCD L607, L612, L716, L729 | |
| CCD-28 | RESOLVED | CCD L2171, L2268 (profile) · L695, L718 (history page) | |
| CCD-29 | RESOLVED | CCD L960 | |
| CAN-3 | UNCHANGED BY DECISION | Cannon L2117 | 251 |
| CAN-13 | RESOLVED | Cannon L859 | 20 = 7 + 5 + 8 |
| CAN-14 | RESOLVED | Cannon L708, L717 | 24 |
| CAN-15 | RESOLVED | | $69 a month |
| CAN-16 | RESOLVED | Cannon L2814-2816 | Recomputed: 23–24 and 24–25 upper bands 5.51–8.48%, Gr 5–8 8.48 / 7.51, youngest 1.99–4.50; aid +11% vs 2.99–4.75%. |
| CAN-24 | RESOLVED | Cannon L104 | |
| PD-R1 | RESOLVED | PD L2460, L2477 | 0.5 + 1 + 3.5 + 0.5 = 5.5. No "not published" restatement remains. Course Offerings L481 calls the capstone "of the Diploma in Entrepreneurial Studies"; it agrees. ("Global Entrepreneurship" is a summer-term course, so its absence from the list is not a conflict.) |
| PD-R2 | RESOLVED | PD L1200, L1272, L1274, L1291, L1299 · Compare Arts grid (ceramics YES · US) | The theatre course names and the Foundations → AP path match Course Offerings L276, L522-540. |
| PD-R3 | RESOLVED | PD L2390, L2477 (new ask) | Attributed to both editions. |
| PD-R4 | RESOLVED | PD L1790, L2477 (new ask) | The headline now attributes "100%" vs Central Piedmont. The tile directly below (L1791-1792) still prints a bare "100% · of graduates attend four-year colleges". That is acceptable, since the caveat sits in the same card's headline. Optional: add "(the profile's figure)" to the tile. |
| PD-R5 | RESOLVED | PD L1635 | Recount of the 2024–26 roster: baseball 3, boys + girls lax 9, golf 3, boys + girls tennis 4, softball 1, boys BB 6, girls BB 5 = 31. Of these, 19 are D3. |
| PD-R6 | RESOLVED | PD L786 | "five world languages, three of them from TK" |
| CCD-R1 | RESOLVED (one leftover label) | CCD L1131-1150, L1171, L1197 | The board, caveat, rung 02, course path and ask all follow the course guide. A leftover: the Upper School ladder bullet (L1076) still lists "**Chamber/Honors Choir**" where the board now says "Honors Chamber Choir". This is a label, not a value. |
| CCD-R2 | RESOLVED | CCD L1045 vs GE L700-701 | 10–20 (VAMUN 10/12, MUNCH 20/17). No Duke. |
| CCD-R3 | RESOLVED (recorded deviation) | CCD L2523, L2551, L2915 | "three weeks here, plus the shortened July 3 week (listed separately)". Tumble "seven". See CCD-S1/S2 for the related price issue. |
| CCD-R4 | RESOLVED | CCD L2507 · `metricValues.ts` L2146 | 75 at both |
| CCD-R5 (CCD) | RESOLVED | CCD L3254-3255 | Recomputed from L3077 table: 4.74–4.76%, 5.09–5.26%, 4.99–5.01%. |
| CCD-R5 (Cannon) | RESOLVED (recorded deviation) | Cannon L2826-2827 | Q8 is dropped. Q1–Q7 run consecutively with no gap. |
| CCD-R6 | RESOLVED | CCD L2333 | |
| CCD-R7 | RESOLVED (recorded deviation) | CCD L1147 | Board recount: 3 + 5 + 4 = 12. |
| CCD-R8 | UNCHANGED BY DECISION | CCD L3225 | $39,600 |
| CAN-R1 | RESOLVED | Cannon L793, L841 | |
| CAN-R2 | RESOLVED | Cannon L829 | "2026–27 catalog" |

## Part 1b: plan `consistency` findings (`consistency-data/findings.md`), my schools and the X rows that touch them

| id | status | where | note |
|---|---|---|---|
| X1 (Cannon part) | RESOLVED | Cannon L1159-1165 | D1-only bars, derived from the roster (12). |
| X2 (PD, CCD, Cannon) | RESOLVED | PD L2743 · CCD L2507 · Cannon L2119 | 70 / 72 / 76 |
| X3 (CCD) | RESOLVED | CCD L1660, L2213 | "~27:1 · seniors per counselor (computed — 137 …)" |
| X4 (PD, CCD, Cannon) | RESOLVED | PD L285 · CCD L251 · Cannon L104; tiles PD L132, CCD L139 | Tile = Compare = teaser (172 / 117 / 104), and each teaser gives the rendered count. |
| X5 (PD) | RESOLVED | `metricValues.ts` L1167, L1268; `run-ms12` $254,275 | |
| X6 (PD, CCD) | RESOLVED | PD L3322-3339 · CCD L3191-3202, L3261 | PD has 6 priced and 56%, and Extended Day and enrichment are priced. The Q1 "schedule not retrieved" is gone (PD Q1 is now bus fares, L3429). CCD Extended Day is priced ($60–$900/mo, $19/hr). Enrichment was priced in consistency2 (it beat the plan's "stays unpriced"). |
| X7 (PD, CCD) | RESOLVED | Compare `aftercare-cost` subs | PD ≈$6,750 and CCD ≈$8,100 on 9 months; the row note is fixed (L1976). |
| PD-4 | RESOLVED | PD L1180, L1182 | |
| PD-17 | **PARTIAL** | PD L1099 | See Part 1. Live wording is on the tile; the card intro still says "no other school in the state holds". |
| PD-18 | RESOLVED | PD L1102 | |
| PD-19 | RESOLVED | PD L901, L1138 · `clubCatalog.ts` L251 | 39 / 16, "Sixteen" |
| PD-20 | RESOLVED (see PD-S1) | PD L1175 · Compare qual | |
| PD-23 | RESOLVED | PD L134 · Compare "30 AP" · GE L802 (38 / 5) | |
| PD-24 | RESOLVED | PD L175, L285 · Compare "172" | |
| PD-25 | RESOLVED | PD L3345 | |
| PD-26 | RESOLVED | PD L603, L883 | Both bases are labelled, plus "four continents abroad". |
| PD-27 | RESOLVED | all four sites + Compare | |
| PD-28 | RESOLVED | `artsMatrix.ts` | |
| CCD-5 | RESOLVED | CCD L1671 "32 seniors admitted to UNC–Chapel Hill (up from 23)" | |
| CCD-7 | RESOLVED | see Part 1 | |
| CCD-8 | RESOLVED | CCD L1006 | |
| CCD-9 | RESOLVED | CCD L1152, L1185 | The Tri-M/NAHS ask is gone from L1197. |
| CCD-10 | RESOLVED | CCD After School | 20% (341) |
| CCD-11 | RESOLVED | CCD L873 | |
| CCD-12 | RESOLVED | CCD L1237 | |
| CCD-24 | RESOLVED | CCD L251 | |
| CCD-27 | RESOLVED | CCD L607 | |
| CCD-28 | RESOLVED | CCD L2171, L2268 | |
| CCD-29 | RESOLVED | CCD L960 | |
| CAN-3 | UNCHANGED BY DECISION | Cannon L2117, Compare 251 | |
| CAN-13 | RESOLVED | Cannon L859 | |
| CAN-14 | RESOLVED | Cannon L708, L717 | |
| CAN-15 | RESOLVED | Cannon After School | |
| CAN-16 | RESOLVED | Cannon L2814-2816 | |
| CAN-24 | RESOLVED | Cannon L104 | |

## Part 2: new findings

| # | school | section(s) | value A (where) | value B (where) | category | evidence (URL + what it says today) | proposed change |
|---|---|---|---|---|---|---|---|
| PD-S1 | PD | The Arts › tile, Music board and caveat; Compare `ensembles` qual vs Course Offerings | Jazz Ensemble is "Curricular — join by enrolling", and "Whether Jazz Ensemble is formally auditioned is not published" (L1240-1250; `artsPrograms/providence-day.ts` L221, L233). Tile "6 · ensembles: 4 curricular + 2 auditioned" (L1175; L40). "Four curricular ensembles plus auditioned groups" (L1237-1238; L215). Compare qual "Four curricular ensembles: Band, Orchestra, Chorus, and Jazz" (`metricValues.ts` L1687) | Course Offerings tags US "Jazz Ensemble" **Audition** (L548; `courseOfferings.ts` ~L1364-1365), from the 2026–27 Course of Study | A (a not-published claim the 2026–27 re-source made false, the CCD-R1 pattern) | 2026–27 US Course of Study (the copy re-downloaded today, SHA-256 a8e44aa3…, unchanged; and the committed 2026-2027 record, L2809-2815): "Jazz Ensemble … Prerequisite: Audition is required. (Year)". Band, Chorus and Orchestra carry no audition line. | Move Jazz Ensemble to the auditioned group on the board and drop "Whether Jazz Ensemble is formally auditioned is not published". Tile → "6 · ensembles: 3 curricular + 3 auditioned". Teaser → "Three curricular ensembles plus auditioned groups". Compare value → "3 ensembles", qual "Three curricular ensembles: Band, Orchestra and Chorus. Three auditioned groups, Jazz Ensemble, A Cappella and The ChargHers, are not counted here." Or keep Compare at 4 if its definition becomes "named performing ensembles" (user's call). No rule reads ensemble boards. |
| PD-S2 | PD | Global Exposure › Exchanges & Homestays (headline vs its own body and the division list) | "Eight partner schools in seven countries, with stays of **one** to four weeks" (L703; `internationalTravel/providence-day.ts` L384) | "students have taken part in exchanges of **two** to four weeks" (L704; L388), and "Reciprocal exchanges of two to four weeks" (L824; L354) | B | The Upper School Global Education page (Source URLs record L101) says "two- to four-week exchanges in countries such as … Bermuda". The Global Map (record L109) logs Bermuda as "two separate weeks in March", which is the basis for "one". | Attribute both in the headline: "… with stays of one to four weeks (the school's Upper School page says two to four; its Global Map logs Bermuda as two one-week visits)". Or use "two separate weeks" for Bermuda and "two to four weeks" throughout. |
| CCD-S1 | CCD | Summer › Camp Catalog headline and Cost Planner vs the catalog rows | "Two of the eight weeks are shortened — for Juneteenth and for July 3 — **and are priced down**" (L2506; `summer/charlotte-country-day.ts` L28). Planner: "Two of them are four-day weeks **and cost less**" (L3021; L1027) | Rows: Camp Buccaneer and La Finca Farm Camp each list June 15-18 at **$560**, the full five-day rate (L2537-2553; data rows L91 and L118). Only the June 29-July 2 week carries a lower full-day price ($460 / $480, separate rows). | A (an over-general sentence; the listing is clear) | 2026 priced listing (re-fetched today): "Camp Buccaneer June 15-18* Full Day … $ 560.00" and "La Finca Farm Camp June 15-18* Full Day … $ 560.00", against "Camp Buccaneer June 29-July 2* … $ 460.00". Half-day is $230 in both short weeks. Separately, the Camp Leaders page (fetched today) now shows **Summer 2027** weeks and rates ($450 four-day full day), so the record's 2026 quote from that page has expired. | "Two of the eight weeks are shortened — for Juneteenth and for July 3. Half-day camps cost $230 in both. Full-day camps cost less only in the July 3 week (Camp Buccaneer $460, Outdoor Adventure $480)." Apply the same to the planner sentence. Recorded under the Camp Catalog record's `## Method`. |
| CCD-S2 (also Cannon) | CCD, Cannon | Summer › Camp Catalog: a row's single price vs the weeks it lists | CCD: 7 half-day rows list a shortened week but show only **$280**: BUCS Soccer Camp, Pickle Pros, Fun with Chess, Pop Vocals, Sports Spectacular, Ready Set Tumble and Kids Adventure Art (`summer/charlotte-country-day.ts` L342, L485, L563, L693, L758, L798, L824). Cannon: 7 rows list Week 2 at the five-day price, among them Cannon Baseball ($225), Busy Bees ($245) and Music Tech for Beginners ($225) (`summer/cannon.ts` L309, L452, L765; also L596, L648, L792, L871) | Each school's own short-week rate: CCD **$230** (L3026-3027, "Half-day, four-day week · The June 15-18 and June 29-July 2 weeks only"). Cannon intro: "Week 2 is a four-day week and every tier is priced down for it" (L2118). Other rows already state both prices (Cannon Golf, Adventure Camp; PD Camp Spirit). | A | CCD listing (today): BUCS Soccer June 15-18* $ 230.00; Fun with Chess June 15-18* $ 230.00; Pop Vocals June 15-18* $ 230.00; Tumble June 15-18* and June 29-July 2* $ 230.00; Sports Spectacular, Pickle Pros and Kids Adventure Art June 29-July 2* $ 230.00. Cannon record (the Issuu brochure; not re-fetchable, see CAN-3) Week 2 table: Busy Bees $196.00, Cannon Baseball $180.00, Music Tech for Beginners $180.00. Vet Science, Exploradores, Watercolor Wonders and Irish Dance are absent from the record's Week 2 sample (27 of 34), so their Week 2 price is D. | Add the short-week price to each desc, as Golf already does ("$230 in the four-day weeks, $280 otherwise"; Cannon "$196 / $180 in Week 2"). No rule covers this: R10 counts weeks, not prices. A rule that flags a row listing a short week together with a five-day week, with one price and no second price in its desc, would. |
| CCD-S3 | CCD | College Support › Learning differences ("The Upper School model") + checklist vs Learning Support › Who You'll Work With | "Academic coaches help with subjects … **Learning specialists** work one-on-one so students 'recognize and utilize their strengths'" (L2160; `collegeSupportPrograms/charlotte-country-day.ts` L863). Ask: "How many learning specialists and academic coaches work with Upper School students, what are their credentials, and what is the caseload?" (L2291; L938) | Learning Support names the Upper School ERP: a director and **four academic coaches**, with **no** Upper School learning specialist. The 19 learning specialists are Lower and Middle School (L749-750, L791, L875-901) | A (a quote moved to the wrong division, and an ask the other card already answers) | https://www.charlottecountryday.org/cd-education/educational-resource-program (fetched today): the "recognize and utilize their strengths" sentence is in the **Middle School** tab. The Upper School tab says "our academic coaches assist students …". https://www.charlottecountryday.org/bucsnet/upper-school/erp lists Folger-Sweeting (Director) and four Academic Coaches. | "The Upper School model: four academic coaches help with subjects and with planning, organizing and focus skills (one coach across core classes in 9th grade, then Humanities or STEM)." Drop the learning-specialist sentence. Ask → "What caseload does each of the four Upper School academic coaches carry, and what are their credentials?" Recorded under the LS Official Site Research record's new `## Method`. |

## Part 3: R8 triage (`r8b.txt`)

- **Cannon · students 300 / 195 / 40 / 3 / 9:** not a conflict. These are athletes, AP testers, a 40-voice chorus, course-description numbers and the FA "Grade 9 student" title. Unchanged since r8.
- **Cannon · seniors 105 vs 26:** not a conflict, since 105 ÷ 4 = 26.25. Unchanged.
- **CCD · teams 72 vs 55:** not a conflict. It is the school's count against the chips, and the footnote names both bases. Unchanged.
- **CCD · institutions 1 vs 150:** not a conflict (a merit detail vs reps hosted). Unchanged.
- **CCD · seniors 27 / 32 / 141:** not a conflict (ratio, UNC admits, Class of 2026). **New member since r8:** 141 now also sits in `verdict.points[5]` ("70 destinations for 141 seniors"), the Class of 2026, and it agrees with L1662.
- **CCD · students 12 / 15 / 10 / 20 / 17 / 1:** not a conflict. These are trip groups, MUNCH 2026/2025 and 1:1 support. The Clubs MUN row now reads 10–20, which matches this group.
- **PD · teams 66 vs 56:** not a conflict. The footnote explains it. Unchanged.
- **PD · institutions 13 / 8 / 150 / 383 / 249:** not a conflict (different facts). Unchanged.
- **PD · seniors 36 / 1 / 179:** not a conflict, since 179 ÷ 5 = 35.8. Unchanged.
- **PD · students (497 … 1):** not a conflict. **New member since r8: 16** (`trips.intro.strong`, "groups of 2 to 16 students", L614). The 16 is the cap on the 2027 trips ("min 10, max 16", 2027 Global Trips record L10-12); the largest past group shown is 12. Consistent, but the 16 appears on no trip card.
- **PD · ensembles 6 vs 4:** consistent as an internal split (6 = 4 + 2, Compare counts the 4). The split itself is wrong against the 2026–27 catalog: see PD-S1.

No PD/CCD/Cannon group is new in r8b. The regex fix added one member each to two existing groups (above).

## Checked and consistent

- **PD consistency2 edits, each restatement:** Entrepreneurial Diploma (CS, checklist, Course Offerings L481), theatre courses and the art path (Arts vs Course Offerings L276, L522-540), ceramics (Studio, verdict, ask, Compare grid), French 8 / Latin 6 (CS, ask), 100% vs CPCC (headline, ask), 19 of 31 D3 (roster recount), "three of them from TK" (GE L802, LS Course Offerings), the ~19 / 16 tile vs Compare `travel-countries` 16, and FA 16 / 9 / 56%.
- **CCD consistency2 edits:** Honors Chamber Choir / Symphonic Band / Orchestra "Audition" match Course Offerings L426-434. Percussion Ensemble is open. AP Studio / IB Art titles match L404-427. The MUN 10–20 range matches GE L700-701. The 175+/100+ pair matches CS L2269. FA 4/10 = 40% and enrichment $225 match After School L2476. The tuition steps recompute from L3077. Tumble has 7 weeks. The summer band attribution and "roughly 75" appear at both sites.
- **Cannon consistency2 edits:** Tri-M (Arts rung 04 vs Clubs table L626-680). The "13 sports … list names 14" footnote is correct (14 distinct sports in L866-884). Q8 is removed and Q1–Q7 are contiguous. "2026–27 catalog" is in place.
- **Pipelines:** PD 86 / 39 / 16 / 10, CCD 48 (47 + cheer) / 28 / 9 / 0, Cannon 23 / 12 / 4 / 6. Bars match the roster.
- **Compare cells vs page (all three):** course counts, AP/IB, counselor ratios, the tuition and run rows, pct-aid (PD ≈21% families; CCD ~20%; Cannon 24%), ensembles (except PD-S1), clubs (PD 77; CCD ~45–50 with 7 named; Cannon ≥20 = 8 + 12), flagship results (CCD MUNCH 2025 6 awards = Clubs L1046 = GE L701), latest pickup, aftercare, summer weeks / camps / ages / care spans (PD $120 / $120 / $220; Cannon $50 / $60 / $90; CCD $105 / $85 / $160), travel trips / homestays / countries / continents (PD 19 trips = 4 + 1 + 6 + 5 + 3; 16 countries; 4 continents).
- **Clubs:** PD honor societies 5 = 5 rows. Cannon "Twelve" = 12 rows (social studies, math, English, journalism, 3 arts and 3 languages, plus Cum Laude and NHS). Cannon 105 seniors (Capstone) = the College Support 105.
- **Learning Support:** Cannon has 12 staff = 4 + 1 + 2 + 5, and the 5 counselors cover JrK–12. CCD has 40 staff and 26 ERP = 3 + 19 + 4. Except CCD-S3, both agree with College Support.
- **Admissions vs FA (CCD, PD):** Clarity dates (CCD Nov 1 / Jan 15; PD Jan 22), the 10% deposit and the aid-applicant reduced deposit agree across both areas.
- **Course Offerings teasers:** PD LS "11 Special Area Classes" = 10 rows + World Language, which the school lists as a special area and the page shows as its own department. Cannon LS "12 named curriculum areas" = 12 Gr 1–4 areas + an Early Childhood row. CCD LS "10 subject areas" = 10 rows.
- **Summer arithmetic:** the PD, CCD and Cannon planners and bundled-care savings recompute. Cannon's season (June 8 – July 31 less the June 29 week = 7 weeks) and PD's nine sessions with S3 / S5 short are consistent.
- **Cannon FA:** $395,830, $128,280 and $247,760 recompute, as do all year-over-year cells.
- **Division spans:** unchanged and consistent (PD TK–5 / 6–8 / 9–12; CCD JK–4 / 5–8 / 9–12; Cannon JrK–4 / 5–8 / 9–12).

## Source-material files touched

- `source-material/summer-programs/charlotte-country-day/CCD - Summer Programs - Camp Catalog.md`: appended `### Re-verification 2026-11-20 (plan consistency2, re-scan)` under the existing `## Method`.
- `source-material/learning-support/charlotte-country-day/Charlotte Country Day - Learning Support - Official Site Research.md`: the file had no `## Method`, so I added one at the end with the same `###` beneath it.
