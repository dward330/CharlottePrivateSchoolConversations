# Charlotte Country Day - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-10-31 by the `/wells-fargo-cup` skill, for the planned Charlotte Country Day Wells Fargo Cup card (plan `ccdcup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed into 511 school rows across all six seasons. Fall + winter + spring equals the published total on every row except the two already recorded in Providence Day's file: 2021–22 1A Victory Christian Center and 2021–22 2A Westminster Catawba Christian. Neither is in the 4A table Country Day's card shows. No figure here is an estimate.

**The shared ledger needed no correction.** `CUP_RECORDS` was compared against the official tables: all 132 NCISAA rows match on class, place, tie, splits and total, including Country Day's six. All 36 `CUP_DIVISION_LEADERS` rows match. All 102 official 4A rows are in the ledger. `current-champions/` still shows 2025–26, so no newer season has been published. The full ledger lives in `src/data/wellsFargoCup.ts`, and its row-level source file is `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup Standings 2020-2026.md`. Country Day's rows are repeated below.

Title and runner-up years come from the NCISAA's own results archive first, read for all 20 sports and all six seasons (120 pages), then from the NCISAA's meet PDFs and official timing, then from Country Day's published title list and press. Country Day's Awards & Honors page lists state championships by sport and year; those lists total exactly 155, matching the figure on the Sports Offered card. Years are calendar years of the championship event, so a fall final in the 2025–26 season is 2025. The 2020–21 brackets are mirrored, with the final in the middle, so finalists there were read from bracket progression and each team's final record.

**Corrections this pass found in the repo's Country Day data**, all checked against the sources below:

- **Field hockey 2024–25 was a runner-up finish, not a blank.** The Winning Record card shows NONE. The NCISAA bracket has #2 Country Day at 15–3 in the final, losing to #1 Cary Christian, for a final 15–4.
- **Girls cross country 2023–24 was a runner-up finish, not a blank.** The card shows NONE. Official timing has Providence Day 41, Country Day 83.
- **Girls tennis 2023–24 was 20–0, not 19–0.** The NCISAA bracket has #1 Country Day at 19–0 before the final and 20–0 after it. The 19–0 finish belongs to 2024–25, whose card cell shows no record.
- **Girls lacrosse 2025–26 finished 18–4, not 17–3.** The NCISAA bracket has #1 Country Day at 17–3 before the playoffs, beating Ravenscroft 22-1 to reach 18–3, then losing the semifinal 13-8 to Charlotte Latin. The bar shows the pre-playoff record.
- **The girls tennis final was in 2025, not 2026.** It is a fall sport: the archive dates the 2025–26 final Saturday, October 25. The card's note says "the 2026 final".
- **The girls cross country conference title in the 2025–26 column was won in fall 2025.** The card's note says "in 2026". The season is a fall one, so the year is 2025. The conference result itself was not re-checked in this pass.

**Disagreements recorded, nothing changed:**

- **Girls track 2023.** Country Day's list and HighSchoolOT's 2023 final statewide rankings ("NCISAA D1 champ Charlotte Country Day") both give Country Day the 2023 title. HighSchoolOT's 2024 meet story says Country Day was "dethroning powerhouse Providence Day", which implies otherwise. No official 2023 team table was reachable. The title is kept, on the school's list and the rankings story.
- **Girls swimming 2026.** HighSchoolOT's prose says Providence Day was "88 points clear", but its own team table reads Providence Day 420, Country Day 328, a margin of 92. The Winning Record card's 420–328 is right. Providence Day's research file repeats the 88; that file is outside this pass.
- **Girls cross country 33–49.** The repo's older `CCD - Sports - Championships.pdf` dossier gives "33–49" under 2025. Official timing shows that score is the 2021 meet; 2024 was 79–86. The app does not print this score.

**Reach limits.** `ncisaa.shotstat.com`, which hosts the NCISAA's golf scoreboards, did not resolve from this environment. Boys golf 2021 was read from the official PDF (Country Day 5th) and 2022 from Charlotte Latin's published team scores and a highschoolgolf.org leaderboard; other golf years were not read, so a runner-up finish there cannot be ruled out. Official cross country timing was reachable for 2020, 2021, 2023 and 2024 only. Track team scores were read for 2021, 2025 and 2026 from official results and for 2022 and 2024 from press; no 2023 table was reachable. Team scores for 2022 girls cross country were not found. The 2023–24 wrestling table was not read. A missing year here is therefore not evidence of no finish.

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
- Country Day state championship list and Cup years: https://www.charlottecountryday.org/cd-experience/athletics/awards-and-honors
- 2021 swimming Division I team scores: https://admin.ncisaa.org/uploads/ncisaa%20division%20i%20scores.pdf
- 2022 swimming Division I results: https://admin.ncisaa.org/uploads/SWIMMING/Div%201%20Final_Team_Ind.pdf
- 2023 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%201%20Swim%20scores.pdf
- 2024 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2024/2024%20NCISAA%20D1%20State%20Team%20Scores.pdf
- 2025 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2025/division%201%20scores.pdf
- 2026 swimming results and team scores (HighSchoolOT): https://www.highschoolot.com/story/ncisaa-d1-girls-swimming-and-diving-2026-championship/22319386/
- 2021 track Division I results: https://admin.ncisaa.org/uploads/NCISAA%20D1%20Results.pdf
- 2022 track, Providence Day 164, Country Day 134.5 (Charlotte Observer): https://news.yahoo.com/ncisaa-saturday-rewind-weather-delays-210719781.html
- 2023 track, statewide rankings naming the D1 champion (HighSchoolOT): https://www.highschoolot.com/story/highschoolot-hsot-final-statewide-rankings-for-track-field/20899847/
- 2024 track title (HighSchoolOT): https://www.highschoolot.com/story/charlotte-country-day-claims-ncisaa-d1-girls-track-field-championship/21454823/
- 2025 track Division I results: https://admin.ncisaa.org/uploads/Docs/NCISAA%20D1%20Final%20Results.pdf
- 2025 track title (HighSchoolOT): https://www.highschoolot.com/story/charlotte-country-day-repeats-ncisaa-d1-girls-track-field-championship/22010604/
- 2026 track official results: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_1_Track_and_Field_Championships/
- 2020 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2020/
- 2021 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- 2023 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Cross_Country_Championships_2023/
- 2024 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- 2021 boys golf 4A team results, Country Day 5th: https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%204A%20Team%20Results%20(1).pdf
- 2022 boys golf team scores, Country Day 302, Latin 304: https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/sayman-dannemann-earn-individual-honors-golf-team-second-at-championships
- 2022 boys golf leaderboard: https://highschoolgolf.org/app/golf-tournaments/5491/team-player-leaderboard
- 2023 wrestling team scores, Country Day 5th: https://admin.ncisaa.org/uploads/Docs/Wrestling%20Team%20scores-2023.pdf
- 2025–26 NCISAA champions by sport: https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/

## Wells Fargo Cup results for Charlotte Country Day

All six seasons are NCISAA 4A. Copied from the official tables and identical to `CUP_RECORDS`.

| Season | Place | Fall | Winter | Spring | Total | Winner | Points behind 1st |
|---|---|---|---|---|---|---|---|
| 2020–21 | 2 | 237.5 | 107.5 | 300 | 645 | Providence Day 670 | 25 |
| 2021–22 | 1 | 272.5 | 87.5 | 322.5 | 682.5 | Charlotte Country Day; Charlotte Latin 2nd with 655 | — |
| 2022–23 | 3 | 235 | 150 | 185 | 570 | Providence Day 782.5 | 212.5 |
| 2023–24 | 2 | 272.5 | 132.5 | 285 | 690 | Providence Day 757.5 | 67.5 |
| 2024–25 | 3 | 265 | 127.5 | 155 | 547.5 | Providence Day 650 | 102.5 |
| 2025–26 | 3 | 237.5 | 142.5 | 222.5 | 602.5 | Providence Day 692.5 | 90 |

Country Day lists ten Cup wins: 1982–83, 1984–85, 1985–86, 1986–87, 1991–92, 1995–96, 1996–97, 1997–98, 2000–01 and 2021–22. The 2021–22 win is the only one in these six seasons, and it is the one season Providence Day did not win. Country Day's highest score here, 690 in 2023–24, came in a second-place year.

## Wells Fargo Cup point sources for Charlotte Country Day

Every title or runner-up year here is confirmed by the source named beside it. "Bracket" means the NCISAA archive page for that sport and season; "list" means Country Day's Awards & Honors page.

| Sport | Gender | Term | State titles | Runner-up | Evidence |
|---|---|---|---|---|---|
| Tennis | Girls | Fall | 2022, 2023, 2024, 2025 | 2021 | Bracket for all five; the four titles also in the list |
| Track & Field | Girls | Spring | 2023, 2024, 2025 | 2021, 2022 | List for the titles; 2024 138–125 HighSchoolOT; 2025 107.5–107 official results; 2021 Providence Day 202.5, Country Day 118, official results; 2022 Providence Day 164, Country Day 134.5, Observer |
| Field Hockey | Girls | Fall | 2021, 2023, 2025 | 2020, 2024 | Bracket for all five; the titles also in the list; 2020 final Oct. 31, 2020 against Providence Day |
| Cross Country | Girls | Fall | 2021, 2024 | 2020, 2023 | Official timing: 2021 33–49 over Providence Day; 2024 79–86 over Latin; 2020 lost 66–70 to Latin; 2023 lost 41–83 to Providence Day; the titles also in the list |
| Swimming | Girls | Winter | 2024, 2025 | 2021, 2023, 2026 | NCISAA Division I team scores: 2024 379–336, 2025 385–314; 2021 lost 443–201 and 2023 lost 345–293 to Cary Academy; 2026 lost 420–328 to Providence Day, HighSchoolOT team table |
| Tennis | Boys | Spring | 2021 | 2022 | Bracket for both; the final on May 15, 2021 was won 5-4; 2022 lost to Cary Academy; 2021 also in the list |
| Golf | Boys | Spring | 2022 | — | List; 302–304 over Latin, Latin's published team scores and the highschoolgolf.org leaderboard |
| Lacrosse | Girls | Spring | — | 2021, 2022, 2024, 2025 | Bracket for all four; lost to Latin in 2021, 2022 and 2024 and to Providence Day in 2025 |

**The list rule:** a sport is listed with at least one title or at least two runner-up years, the same bar as Charlotte Latin's list and Providence Day's.

Confirmed but left off, one runner-up year each: boys lacrosse 2026 (bracket, lost in overtime to Durham Academy), volleyball 2024 (bracket, lost to North Raleigh Christian) and boys cross country 2023 (official timing, 87–90 to Providence Day).

## Wells Fargo Cup state-title context

Country Day's list totals 155 state championships, which matches the Sports Offered card. Within the six Cup seasons it holds these titles by season: 2020–21 boys tennis; 2021–22 field hockey, girls cross country, boys golf; 2022–23 girls tennis, girls track; 2023–24 field hockey, girls tennis, girls swimming, girls track; 2024–25 girls cross country, girls tennis, girls swimming, girls track; 2025–26 field hockey, girls tennis. The Winning Record card's counts of four, four and two for the last three seasons hold against this list.
