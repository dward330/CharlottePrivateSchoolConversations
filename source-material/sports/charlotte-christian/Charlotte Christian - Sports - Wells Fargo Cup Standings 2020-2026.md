# Charlotte Christian - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-11-01 by the `/wells-fargo-cup` skill, for the planned Charlotte Christian Wells Fargo Cup card (plan `charlottechristiancup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed into 538 table rows across all six seasons, 511 of them placed; the other 27 are unplaced schools. Fall + winter + spring equals the published total on every row except the two already recorded in Providence Day's file: 2021–22 1A Victory Christian Center and 2021–22 2A Westminster Catawba Christian. Neither is in the 4A table Charlotte Christian's card shows. No figure here is an estimate.

**The shared ledger needed no correction.** `CUP_RECORDS` was compared against the official tables: all 132 NCISAA rows match on class, place, tie, splits and total, including Charlotte Christian's six. All 36 `CUP_DIVISION_LEADERS` rows match. All 102 official 4A rows are in the ledger. `CUP_FIELD_SIZES` matches at 25, 26 and 17. `current-champions/` still shows 2025–26, so no newer season has been published. The full ledger lives in `src/data/wellsFargoCup.ts`, and its row-level source file is `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup Standings 2020-2026.md`. Charlotte Christian's rows are repeated below.

Title and runner-up years come from the NCISAA's own results archive first, read for all 20 sports and all six seasons (120 pages), parsed by bracket column so a team's deepest round is read from the grid rather than from text order. Meet sports come from the NCISAA's team-score PDFs, official timing, and press team tables where no official one is posted. The school's Knights Accolades list was then used as a cross-check, and it agrees with the brackets on every title year in these six seasons. Years are calendar years of the championship event, so a fall final in the 2025–26 season is 2025, and the 2020–21 football final, played Nov. 20, 2020, is 2020.

**Corrections this pass found in the repo's Charlotte Christian data**, all checked against the sources below:

- **The 2026 boys basketball exit was the first round, not the second.** The Winning Record card's note says "Second-round exit in 2026". The NCISAA 4A bracket has Charlotte Christian (17–13) in its first column, losing 51–49 to #1 Forsyth Country Day. The schedule printed under the 4A bracket runs 1st Round, Quarterfinals, Semifinals, Championship, with no second round. Other classes on the same page do have a 2nd Round, which is the likely origin of the error. The 10-win improvement in the note is right: 7–20, then 17–14.
- **Boys track 2025–26 was a tied second place, not a blank.** The Winning Record card shows `NONE`. The official 2026 Division I team table reads Christ School 116, Cary Academy 87, Charlotte Christian 87, each of the last two placed 2. Christ School's own report gives the same three scores. The card's note, "Christ School took the 2026 D1 title", is true but leaves out the finish.
- **Seven cells marked to-verify can be confirmed as `NONE`.** Baseball 2023–24 (semifinal loss) and 2024–25 (quarterfinal loss, as the #1 seed), softball 2023–24 (quarterfinal loss) and boys basketball 2023–24 (first-round loss) from the brackets; boys track 2023–24 (3rd, 83 points) from Christ School's report of the 2024 meet; wrestling 2023–24 (4th, 150) and 2024–25 (4th, 140) from press team tables.

**Disagreements recorded, nothing changed:**

- **The school's title total does not add up.** The Accolades page says "42 team state crowns in seven different sports". The years it lists directly beneath total 46: baseball 18, football 9, basketball 7, track and field 4, softball 3, cross country 3, dance 2. The app said 43, in the Sports Offered tile and subhead and in the baseball season detail, which was the older 42 plus the 2026 baseball title. On 2026-11-02 the user moved all three to the school's stated 42; the live page was re-read that day and still says 42 with 2026 baseball in its list. The June 2026 dossier's list, before that title, totals 45 against its own "42". None of these figures agrees with the school's own list.
- **Wrestling 2026, "best finish in program history".** Second place is confirmed by HighSchoolOT's team table at 199.5. "Best in program history" is not checked here, because the six seasons above show only 2021–2026.

**Reach limits.** `ncisaa.shotstat.com`, which hosts the NCISAA's golf scoreboards from 2022 on, still does not resolve from this environment. Boys golf 2021 was read from the official PDF. For boys golf 2022–2026, champions are known only from press, none naming Charlotte Christian, so a runner-up finish cannot be ruled out. Charlotte Christian has no girls golf team on its live teams page and appears on no girls golf page read. Boys and girls track were not found for 2023, and girls track was not found for 2022. Cross country was read for 2020, 2021, 2023 and 2024 only. Swimming was read for 2021–2025, not 2026. FloWrestling's 2026 team page refused the request, so that year rests on HighSchoolOT. A missing year here is therefore not evidence of no finish.

The 2020 football bracket prints `27-21` beside Charlotte Christian's semifinal line and shows no champion cell, so it cannot be read alone. The Charlotte Observer's report names the final as Charlotte Christian 27, Rabun Gap 21, on Nov. 20, 2020. As an arithmetic check, Charlotte Christian's 2020–21 fall total of 70 equals 50 for that title plus 20 for girls cross country's 7th place; this is a check on the reading, not a source.

Sources:

- 2025–26 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- 2024–25 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- 2023–24 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- 2022–23 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- 2021–22 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- 2020–21 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- Scoring and history: https://www.ncisaa.org/recognition/wells-fargo-cup/history/
- NCISAA sport list: https://www.ncisaa.org/sports/
- NCISAA results archive index: https://archives.ncisaa.org/ (per sport: `index.php?sport=<id>&years=<yyyy-yyyy>`; ids: baseball 1, cross country 2, boys golf 7, boys soccer 8, field hockey 9, football 8-man 10, girls tennis 11, volleyball 12, boys basketball 13, wrestling 14, swimming 15, boys tennis 16, girls soccer 17, boys lacrosse 18, girls lacrosse 19, girls golf 20, softball 21, track and field 22, girls basketball 23, football 11-man 31)
- School title list (Knights Accolades): https://www.charlottechristian.com/athletics/knights-accolades
- Baseball brackets: https://archives.ncisaa.org/index.php?sport=1&years=2020-2021 and the same URL for each season
- Softball brackets: https://archives.ncisaa.org/index.php?sport=21&years=2020-2021 and the same URL for each season
- Football brackets: https://archives.ncisaa.org/index.php?sport=31&years=2020-2021 and the same URL for each season
- Boys basketball 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=13&years=2025-2026
- Boys basketball 2023–24 bracket: https://archives.ncisaa.org/index.php?sport=13&years=2023-2024
- 2020 football final, 27–21 over Rabun Gap (Charlotte Observer): https://www.yahoo.com/news/dynasty-charlotte-christian-wins-4th-021432542.html
- 2025 boys track official results, Charlotte Christian 121, Cary Academy 86: https://admin.ncisaa.org/uploads/Docs/NCISAA%20D1%20Final%20Results.pdf
- 2025 boys track title (HighSchoolOT): https://www.highschoolot.com/story/charlotte-christian-wins-ncisaa-d1-boys-track-field-championship/22010599/
- 2026 track official results, team tables: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_1_Track_and_Field_Championships/
- 2026 boys track, Christ School's report: https://www.christschool.org/article/track-wins-sixth-state-championship-runaway-fashion
- 2024 boys track, Christ School's report: https://www.christschool.org/article/track-ends-school-year-state-championship
- 2024 girls track (HighSchoolOT): https://www.highschoolot.com/story/charlotte-country-day-claims-ncisaa-d1-girls-track-field-championship/21454823/
- 2022 boys track, Christ School's report: https://www.christschool.org/article/track-claims-five-gold-medals-places-2nd-state-track-meet
- 2021 track Division I results: https://admin.ncisaa.org/uploads/NCISAA%20D1%20Results.pdf
- 2026 wrestling team table, Charlotte Christian 199.5 (HighSchoolOT): https://www.highschoolot.com/story/ncisaa-2026-wrestling-championship-coverage-results-placers/22322289/
- 2025 wrestling team table (HighSchoolOT): https://www.highschoolot.com/story/metrolina-christian-takes-ncisaa-wrestling-championship-by-one-point/21863211/
- 2024 wrestling team table (Charlotte Observer): https://ca.news.yahoo.com/charlotte-latin-wins-ncisaa-high-050000023.html
- 2023 wrestling team scores, Charlotte Christian 9th: https://admin.ncisaa.org/uploads/Docs/Wrestling%20Team%20scores-2023.pdf
- 2022 wrestling team results, Charlotte Christian 8th: https://archives.ncisaa.org/index.php?sport=14&years=2021-2022
- 2021 wrestling team results, Charlotte Christian 5th: https://archives.ncisaa.org/index.php?sport=14&years=2020-2021
- 2021 boys golf 4A team results, Charlotte Christian 313: https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%204A%20Team%20Results%20(1).pdf
- 2021 swimming Division I team scores: https://admin.ncisaa.org/uploads/ncisaa%20division%20i%20scores.pdf
- 2022 swimming Division I results: https://admin.ncisaa.org/uploads/SWIMMING/Div%201%20Final_Team_Ind.pdf
- 2023 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%201%20Swim%20scores.pdf
- 2024 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2024/2024%20NCISAA%20D1%20State%20Team%20Scores.pdf
- 2025 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2025/division%201%20scores.pdf
- 2020 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2020/
- 2021 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- 2023 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Cross_Country_Championships_2023/
- 2024 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/

## Wells Fargo Cup results for Charlotte Christian

All six seasons are NCISAA 4A. Copied from the official tables and identical to `CUP_RECORDS`.

| Season | Place | Fall | Winter | Spring | Total | Winner | Points behind 1st |
|---|---|---|---|---|---|---|---|
| 2020–21 | 9 | 70 | 75 | 192.5 | 337.5 | Providence Day 670 | 332.5 |
| 2021–22 | 7 | 102.5 | 37.5 | 180 | 320 | Charlotte Country Day 682.5 | 362.5 |
| 2022–23 | 9 | 67.5 | 30 | 207.5 | 305 | Providence Day 782.5 | 477.5 |
| 2023–24 | 5 | 97.5 | 50 | 215 | 362.5 | Providence Day 757.5 | 395 |
| 2024–25 | 6 | 82.5 | 35 | 260 | 377.5 | Providence Day 650 | 272.5 |
| 2025–26 | 8 | 67.5 | 45 | 235 | 347.5 | Providence Day 692.5 | 345 |

Charlotte Christian has not won the Cup in these six seasons and has not finished in the top three. Its best finish is 5th, in 2023–24. Its highest score, 377.5, came a year later and placed 6th, so its best score and best finish are different seasons. Spring has been its largest term in all six seasons.

## Wells Fargo Cup point sources for Charlotte Christian

Every title or runner-up year here is confirmed by the source named beside it. "Bracket" means the NCISAA archive page for that sport and season.

| Sport | Gender | Term | State titles | Runner-up | Evidence |
|---|---|---|---|---|---|
| Baseball | Boys | Spring | 2021, 2022, 2026 | — | Bracket game lines for all three: 2021 beat Wesleyan Christian 3–2, 1–5, 7–0; 2022 beat Metrolina Christian 7–3, 7–3; 2026 beat Metrolina Christian 8–11, 5–3, 8–5 |
| Softball | Girls | Spring | 2021, 2022, 2025 | 2023 | Bracket game lines for all four: 2021 beat Cannon 8–1, 7–8, 13–3; 2022 beat Cannon 3–4, 8–0, 10–0; 2025 beat Charlotte Latin 3–2, 3–1; 2023 lost to Cannon 4–10, 1–3 |
| Football (11-man) | Boys | Fall | 2020 | 2022, 2025 | 2020 from the school's list and the Observer's report, 27–21 over Rabun Gap on Nov. 20, 2020; 2022 and 2025 from the Division I brackets, both lost to Providence Day, 2025 by 42–6 |
| Track & Field | Boys | Spring | 2025 | 2026 | 2025 official results, 121 to Cary Academy's 86; 2026 official team table, tied 2nd with Cary Academy at 87 behind Christ School's 116 |

**The list rule:** a sport is listed with at least one title or at least two runner-up years, the same bar as Providence Day's, Charlotte Latin's, Charlotte Country Day's and Cannon's lists.

Confirmed but left off, one runner-up year: wrestling 2026 (Charlotte Latin 321, Charlotte Christian 199.5, Charlotte Country Day 156). Its 45 points are likely the school's whole 2025–26 winter total of 45, so this is the one drop that visibly affects a term.

Other team finishes read, none in the top two: wrestling 5th, 8th, 9th, 4th and 4th in 2021–2025; girls track 3rd in 2021, 2024 and 2025 and 8th in 2026; boys track 5th, 4th and 3rd in 2021, 2022 and 2024; boys swimming 10th, 14th, 8th, 8th and 11th in 2021–2025; girls swimming 10th, 10th, 8th, 13th and 13th in 2021–2025; girls cross country 7th, 7th, 12th and 14th in 2020, 2021, 2023 and 2024; boys cross country 15th, 16th, 11th and 14th in 2020, 2021, 2023 and 2024; boys golf 11th in 2021.

Team-sport deep runs that fell short of a final: baseball semifinals 2023 and 2024; football semifinal 2021; boys tennis semifinal 2026, as the #1 seed.

## Wells Fargo Cup state-title context

Within the six Cup seasons the brackets and meet results give Charlotte Christian eight team state titles by season: 2020–21 football, baseball, softball; 2021–22 baseball, softball; 2024–25 softball, boys track; 2025–26 baseball. All eight are on the school's Accolades list. A state title and a Wells Fargo Cup are different things: Charlotte Christian's eight titles sit beside zero Cups and no top-three Cup finish, because the Cup rewards breadth across every sport and this school's points come heavily from spring.
