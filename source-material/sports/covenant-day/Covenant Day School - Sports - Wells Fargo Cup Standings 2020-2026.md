# Covenant Day School - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-11-02 by the `/wells-fargo-cup` skill, for the planned Covenant Day Wells Fargo Cup card (plan `covenantcup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed into 538 table rows across all six seasons, 511 of them placed; the other 27 are unplaced schools. Fall + winter + spring equals the published total on every row except the two already recorded in Providence Day's file: 2021–22 1A Victory Christian Center and 2021–22 2A Westminster Catawba Christian. Neither is in the 4A table Covenant Day's card shows. No figure here is an estimate.

**The shared ledger needed no correction.** `CUP_RECORDS` was compared against the official tables: all 132 NCISAA rows match on class, place, tie, splits and total, including Covenant Day's six. All 36 `CUP_DIVISION_LEADERS` rows match. All 102 official 4A rows are in the ledger. `CUP_FIELD_SIZES` matches at 25, 26 and 17. `current-champions/` still shows 2025–26, so no newer season has been published. The full ledger lives in `src/data/wellsFargoCup.ts`, and its row-level source file is `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup Standings 2020-2026.md`. Covenant Day's rows are repeated below.

Title and runner-up years come from the NCISAA's own results archive, read for all 20 sports and all six seasons (120 pages), parsed by bracket column so a team's deepest round is read from the grid rather than from text order. Brackets have different widths, so each round was read from the dates printed under its column. Years are calendar years of the championship event, so a fall final in the 2025–26 season is 2025.

**One correction this pass found in the repo's Covenant Day data:**

- **Field hockey's 2025 overtime loss was a quarterfinal, not a semifinal.** The Winning Record card shows `SEMIFINAL` for 2025–26 and its note says "state semifinal". The school's 2025 Fall Sports Highlights say "semifinals", which is the origin of the claim. The NCISAA bracket has #3 Providence Day beating #6 Covenant Day 2–1 (OT) in the Friday, October 17 round. Providence Day then played the semifinal on Tuesday, October 21, losing 3–2 (2OT) to #2 Charlotte Latin. The Cup total agrees: 2025–26 fall is 67.5, which is 45 for boys soccer's runner-up plus 22.5 for one quarterfinal exit. A semifinal exit would pay 37.5 and give 82.5, more than the published total. The school's own wording stays disagreed with here on the association's bracket.

**Disagreements recorded, nothing changed:**

- **Baseball 2025–26.** The NCISAA bracket prints `#8 Covenant Day School (12-4)`. The school's 2026 Spring Sports Highlights say 12–14 overall, 5–5 in conference, and the #8 seed. The bracket's `12-4` is read as a dropped digit, so the card's 12–14 stays.
- **Volleyball's three straight runner-up finishes.** No volleyball final falls inside these six seasons: Covenant Day's best is the 2022 semifinal. The 2015–16 archive page has #2 Covenant Day in the final of its top division, lost to #1 North Raleigh Christian. The archive serves no bracket for years before 2015–16, so the other two finishes could not be read. The claim is outside this card and is unchanged.
- **Football 2022 is Division II.** Covenant Day lost that final 46–10 to Asheville School. The NCISAA's scoring page says Cup points apply "for sports who compete by division as well as classification".

**Reach limits, and what closes them.** `ncisaa.shotstat.com`, which hosts the NCISAA's golf scoreboards, does not resolve from this environment. Covenant Day is on neither 2025 girls golf team results PDF, nor the 2021 boys 4A team PDF. Cross country team tables were read for 2020, 2021, 2023 and 2024; 2022 and 2025 were not found. Track team tables were not read. Swimming was read for 2021–2025, not 2026.

These gaps cannot hide a title or runner-up finish, because the published term totals leave no room for one. Scoring is 50, 45, 40, 35, 30, 25, 20 and 15 for 1st to 8th, split on ties, so losing semifinalists take 37.5 and losing quarterfinalists 22.5. Subtracting the finishes read above leaves these residuals, and none can hold a 45:

| Season | Fall | Winter | Spring |
|---|---|---|---|
| 2020–21 | 0 | 0 | 15 |
| 2021–22 | 0 | 0 | 0 |
| 2022–23 | 55 | 0 | 20 |
| 2023–24 | 5 | 0 | 30 |
| 2024–25 | 0 | 0 | 30 |
| 2025–26 | 0 | 0 | 0 |

The 55 is the one to read carefully: a 45 inside it would need a 10, and no place or tie among the top eight pays 10. Winter never exceeds 37.5 in any season, so no winter sport has a runner-up finish.

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
- Softball 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=21&years=2025-2026
- Boys soccer 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=8&years=2025-2026
- Boys soccer 2024–25 bracket: https://archives.ncisaa.org/index.php?sport=8&years=2024-2025
- Field hockey 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=9&years=2025-2026
- Field hockey 2022–23 bracket: https://archives.ncisaa.org/index.php?sport=9&years=2022-2023
- Football 2022–23 bracket: https://archives.ncisaa.org/index.php?sport=31&years=2022-2023
- Volleyball 2015–16 bracket: https://archives.ncisaa.org/index.php?sport=12&years=2015-2016
- Baseball 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=1&years=2025-2026
- 2025 Fall Sports Highlights: https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2025fallsportshighlights1
- 2026 Spring Sports Highlights: https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2026-spring-sports-highlights-1781042195259
- 2020 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2020/
- 2021 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- 2023 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Cross_Country_Championships_2023/
- 2024 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- 2021 swimming Division I team scores: https://admin.ncisaa.org/uploads/ncisaa%20division%20i%20scores.pdf
- 2022 swimming Division I results: https://admin.ncisaa.org/uploads/SWIMMING/Div%201%20Final_Team_Ind.pdf
- 2023 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%201%20Swim%20scores.pdf
- 2024 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2024/2024%20NCISAA%20D1%20State%20Team%20Scores.pdf
- 2025 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2025/division%201%20scores.pdf
- 2025 girls golf Division I team results: https://admin.ncisaa.org/uploads/25-26%20Championship%20Logos/NCISAA%20Division%20I%20Girls%20Golf%20Team%20Results.pdf
- 2025 girls golf Division II team results: https://admin.ncisaa.org/uploads/25-26%20Championship%20Logos/NCISAA%20D2%20Girls%20Golf%20Team%20Results.pdf
- 2021 boys golf 4A team results: https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%204A%20Team%20Results%20(1).pdf

## Wells Fargo Cup results for Covenant Day

All six seasons are NCISAA 4A. Copied from the official tables and identical to `CUP_RECORDS`.

| Season | Place | Fall | Winter | Spring | Total | Winner | Points behind 1st |
|---|---|---|---|---|---|---|---|
| 2020–21 | 14 | 142.5 | 15 | 15 | 172.5 | Providence Day 670 | 497.5 |
| 2021–22 | 11 | 132.5 | 22.5 | 60 | 215 | Charlotte Country Day 682.5 | 467.5 |
| 2022–23 | 8 | 205 | 0 | 117.5 | 322.5 | Providence Day 782.5 | 460 |
| 2023–24 | 10 | 137.5 | 37.5 | 127.5 | 302.5 | Providence Day 757.5 | 455 |
| 2024–25 | 10 | 145 | 22.5 | 127.5 | 295 | Providence Day 650 | 355 |
| 2025–26 | 15 | 67.5 | 0 | 117.5 | 185 | Providence Day 692.5 | 507.5 |

Covenant Day has not won the Cup in these six seasons and has not finished in the top three. Its best finish is 8th, in 2022–23, which is also its highest score, 322.5. Fall was its largest term in 2020–21, 2021–22, 2022–23, 2023–24 and 2024–25; spring was largest in 2025–26.

## Wells Fargo Cup point sources for Covenant Day

Every title or runner-up year here is confirmed by the NCISAA archive page for that sport and season.

| Sport | Gender | Term | State titles | Runner-up | Evidence |
|---|---|---|---|---|---|
| Softball | Girls | Spring | 2026 | — | Bracket game lines: beat Cannon 7–5 and 9–5 in the championship series, May 15/16 |
| Soccer | Boys | Fall | — | 2024, 2025 | Brackets: lost 1–0 to Rabun Gap in 2024 and 2–1 to Christ School in 2025 |

**The list rule:** a sport is listed with at least one title or at least two runner-up years, the same bar as the lists for Providence Day, Charlotte Latin, Charlotte Country Day, Cannon and Charlotte Christian.

Confirmed but left off, one runner-up year each: field hockey 2022, lost 2–0 to Providence Day, and football 2022, lost 46–10 to Asheville School in Division II. Those two finishes are 90 of the 205 fall points in 2022–23, the school's best Cup season.

Other team finishes read, none in the top two: girls cross country 4th, 8th, 5th and 4th in 2020, 2021, 2023 and 2024; boys cross country 3rd, 4th, 4th and 7th in the same years; best swimming finish 8th, in 2021.

Team-sport deep runs that fell short of a final: baseball semifinal 2023; boys basketball semifinal 2024; field hockey semifinal 2021; volleyball semifinal 2022; girls soccer semifinals 2023, 2024 and 2025; softball semifinals 2022, 2024 and 2025.

## Wells Fargo Cup state-title context

Within the six Cup seasons the brackets give Covenant Day one team state title: softball in 2025–26, which the school calls its first team state title since 2017. Boys soccer reached the final in both 2024 and 2025. A state title and a Wells Fargo Cup are different things: Covenant Day's title season, 2025–26, is also its lowest Cup finish of the six, 15th, because the Cup rewards breadth across every sport.
