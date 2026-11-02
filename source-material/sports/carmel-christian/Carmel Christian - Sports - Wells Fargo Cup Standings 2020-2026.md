# Carmel Christian - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-11-02 by the `/wells-fargo-cup` skill, for the planned Carmel Christian Wells Fargo Cup card (plan `carmelchristiancup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed into 538 table rows across all six seasons, 511 of them placed; the other 27 are unplaced schools. Fall + winter + spring equals the published total on every row except the two already recorded in Providence Day's file: 2021–22 1A Victory Christian Center and 2021–22 2A Westminster Catawba Christian. Neither is in the 4A table Carmel Christian's card shows. No figure here is an estimate.

**The shared ledger needed no correction.** `CUP_RECORDS` was compared against the official tables: all 132 NCISAA rows match on class, place, tie, splits and total, including Carmel Christian's six. All 36 `CUP_DIVISION_LEADERS` rows match. All 102 official 4A rows are in the ledger. `CUP_FIELD_SIZES` matches at 25, 26 and 17. `current-champions/` still shows 2025–26, so no newer season has been published. The full ledger lives in `src/data/wellsFargoCup.ts`, and its row-level source file is `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup Standings 2020-2026.md`. Carmel Christian's rows are repeated below.

Title and runner-up years come from the NCISAA's own results archive, read for all 20 sports and all six seasons (120 pages), parsed by bracket column so a team's deepest round is read from the grid rather than from text order. Brackets have different widths, so each round was read from the dates printed under its column. The 2020–21 brackets are mirrored and were read by team name. Years are calendar years of the championship event, so a fall final in the 2020–21 season is 2020.

**Five corrections this pass found in the repo's data, each from the association's own bracket:**

- **The 2026 girls soccer final was 2–0, not 2–1.** Carmel Christian's Winning Record card says "1–2", in four strings, and Providence Day's card says "beat Carmel Christian 2–1". The NCISAA bracket prints `2-0` for #1 Providence Day over #2 Carmel Christian, May 16, 2026. The HighSchoolOT story both files cite is headlined "Providence Day shuts out Carmel Christian", and Providence Day's own note that Grayson Dudley scored both goals fits 2–0. The article body was not readable, so the bracket is the evidence.
- **Boys tennis won the 2025 NCISAA 4A title, and the card does not mention it.** The bracket has #1 Carmel Christian beating #6 Charlotte Latin 5–1 in the May 17, 2025 final at Providence Day, finishing 17–0. The Cup total agrees: 2024–25 spring is 95, which is 50 for the title plus 22.5 each for baseball's and girls soccer's quarterfinal exits. A runner-up finish would give 90. Charlotte Latin's Cup card already lists boys tennis 2025 as a runner-up year. No school or press page was found to corroborate: Carmel's boys tennis team page is empty, and a web search found nothing. So the card's "Three recent NCISAA titles" should read four.
- **Boys basketball was also 2021 state runner-up.** The card lists 2023 and 2025 only. The bracket has #3 Cannon beating #1 Carmel Christian 94–85 in the 4A final on February 27, 2021. Cannon's card cites the same game. The 2020–21 winter total is 45, which is that finish and nothing else.
- **The 2025 boys basketball final was 50–73.** The card's seasonDetail says "score to verify". The bracket has #1 Christ School 73, #2 Carmel Christian 50, February 22, 2025. Carmel finished 18–9.
- **The 2019 boys basketball title can drop its TO VERIFY.** The 2018–19 archive page has #1 Carmel Christian beating #3 Village Christian Academy 65–64 in the 3A final, February 23, 2019 at Ravenscroft, finishing 31–3. It also confirms the 2018 title: #2 Carmel Christian beat #1 Gaston Day 74–72 (2OT), February 24, 2018.

**Disagreements recorded:**

- **The athletics site's "2025-26 state champions" tag.** The Cup totals rule out a title in any Cup sport that season: fall is 37.5, winter is 62.5 with 37.5 of it boys basketball's semifinal, and spring is 60 with 45 of it girls soccer's runner-up. A title pays 50, and no term has room for one. Cheerleading is not a Cup sport here, so this says nothing about it.
- **2022–23's place is copied as published.** The table prints Wesleyan Christian 14th on 147.5 and Carmel Christian 14th on 142.5, with no `T`, then Saint Mary's 15th on 107.5. By points Carmel was 15th of 16. The ledger keeps the published 14. This has two effects: the computed best-finish headline falls on 2022–23, and `leadOverNext` reads the pair as a tie and finds no 16th place, though the school right below Carmel is Saint Mary's, 35 points back.
- **The older boys soccer finals agree with the card.** 2019: #4 Coastal Christian beat #2 Carmel Christian 1–0 in the 3A final on October 26. 2020: 2–0 over Rabun Gap on November 7. 2021: lost 1–0 in three overtimes on October 30. 2022: lost 1–0 on October 29.

**Reach limits, and what closes them.** `ncisaa.shotstat.com`, which hosts the NCISAA's golf scoreboards, did not resolve in earlier passes, and golf, cross country and swimming team tables were not read here. These gaps cannot hide a title or runner-up finish, because the published term totals leave no room for one. Scoring is 50, 45, 40, 35, 30, 25, 20 and 15 for 1st to 8th, split on ties, so losing semifinalists take 37.5 and losing quarterfinalists 22.5. Subtracting the bracket finishes leaves these residuals, and none reaches 45:

| Season | Fall | Winter | Spring |
|---|---|---|---|
| 2020–21 | 15 | 0 | 0 |
| 2021–22 | 30 | 0 | 35 |
| 2022–23 | 30 | 0 | 0 |
| 2023–24 | 30 | 20 | 0 |
| 2024–25 | 0 | 25 | 0 |
| 2025–26 | 0 | 25 | 15 |

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
- Boys basketball brackets: https://archives.ncisaa.org/index.php?sport=13&years=2020-2021 · https://archives.ncisaa.org/index.php?sport=13&years=2021-2022 · https://archives.ncisaa.org/index.php?sport=13&years=2022-2023 · https://archives.ncisaa.org/index.php?sport=13&years=2024-2025
- Boys soccer brackets: https://archives.ncisaa.org/index.php?sport=8&years=2020-2021 · https://archives.ncisaa.org/index.php?sport=8&years=2021-2022 · https://archives.ncisaa.org/index.php?sport=8&years=2022-2023
- Boys tennis 2024–25 bracket: https://archives.ncisaa.org/index.php?sport=16&years=2024-2025
- Girls soccer 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=17&years=2025-2026
- Older finals: https://archives.ncisaa.org/index.php?sport=13&years=2017-2018 · https://archives.ncisaa.org/index.php?sport=13&years=2018-2019 · https://archives.ncisaa.org/index.php?sport=8&years=2019-2020
- HighSchoolOT 2026 girls soccer final: https://www.highschoolot.com/story/providence-day-shuts-out-carmel-christian-for-third-straight-ncisaa-4a-girls-soccer-championship/22359052/
- Carmel Christian boys tennis team page: https://www.carmelchristianathletics.org/spring-teams/tennis-boys/

## Wells Fargo Cup results for Carmel Christian

All six seasons are NCISAA 4A. Copied from the official tables and identical to `CUP_RECORDS`.

| Season | Place | Fall | Winter | Spring | Total | Winner | Points behind 1st |
|---|---|---|---|---|---|---|---|
| 2020–21 | 15 | 65 | 45 | 45 | 155 | Providence Day 670 | 515 |
| 2021–22 | T14 | 75 | 50 | 80 | 205 | Charlotte Country Day 682.5 | 477.5 |
| 2022–23 | 14 | 75 | 45 | 22.5 | 142.5 | Providence Day 782.5 | 640 |
| 2023–24 | 15 | 30 | 42.5 | 60 | 132.5 | Providence Day 757.5 | 625 |
| 2024–25 | 15 | 37.5 | 70 | 95 | 202.5 | Providence Day 650 | 447.5 |
| 2025–26 | 16 | 37.5 | 62.5 | 60 | 160 | Providence Day 692.5 | 532.5 |

Carmel Christian has not won the Cup in these six seasons and has not finished in the top ten. Its highest score is 205, in 2021–22, when it tied Metrolina Christian for 14th. Its published best place is 14th, reached in 2021–22 and 2022–23.

## Wells Fargo Cup point sources for Carmel Christian

Every title or runner-up year here is confirmed by the NCISAA archive page for that sport and season.

| Sport | Gender | Term | State titles | Runner-up | Evidence |
|---|---|---|---|---|---|
| Basketball | Boys | Winter | 2022 | 2021, 2023, 2025 | Brackets: beat Greensboro Day 71–66 in 2022; lost 94–85 to Cannon in 2021, 53–48 to Christ School in 2023 and 73–50 to Christ School in 2025 |
| Soccer | Boys | Fall | 2020 | 2021, 2022 | Brackets: beat Rabun Gap 2–0 in 2020; lost 1–0 to Rabun Gap in 2021 and 2022 |
| Tennis | Boys | Spring | 2025 | — | Bracket: beat Charlotte Latin 5–1 in the final, finishing 17–0 |

**The list rule:** a sport is listed with at least one title or at least two runner-up years, the same bar as the lists for Providence Day, Charlotte Latin, Charlotte Country Day, Cannon, Charlotte Christian and Covenant Day.

Confirmed but left off, one runner-up year: girls soccer 2026, lost 2–0 to Providence Day. That finish is 45 of the 60 spring points in 2025–26.

Team-sport deep runs that fell short of a final: boys tennis semifinal 2024; boys basketball semifinal 2026; boys soccer semifinals 2024 and 2025.

## Wells Fargo Cup state-title context

Within the six Cup seasons the brackets give Carmel Christian three team state titles: boys soccer in 2020, boys basketball in 2022 and boys tennis in 2025. Its finish stays near the bottom of 4A all the same, because the Cup rewards breadth across every sport, and Carmel offers no football, lacrosse or track. A state title and a Wells Fargo Cup are different things.
