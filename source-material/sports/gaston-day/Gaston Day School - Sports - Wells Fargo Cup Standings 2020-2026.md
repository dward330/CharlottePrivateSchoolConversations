# Gaston Day School - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-11-02 by the `/wells-fargo-cup` skill, for the planned Gaston Day Wells Fargo Cup card (plan `gastondaycup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed into 538 table rows across all six seasons and all four classes. The tables run 1A, 2A, 3A, 4A in that order every season.

**The shared ledger needed no correction, and it needs one more row.** All 406 NCISAA rows in `CUP_RECORDS` match the published tables on class, place, tie, splits and total, including Gaston Day's six, and all 36 NCISAA `CUP_DIVISION_LEADERS` rows match. `CUP_FIELD_SIZES` still matches (2A 25, 3A 26, 4A 17), and no newer season is posted: `current-champions/` still carries 2025-2026. Gaston Day played 2A in all six seasons, so its table is every school that shared 2A with it. The ledger already holds 37 of those schools, from Davidson Day's work. The one missing row is **Berean Baptist Academy, 2024–25 2A, 21st, 37.5 points (fall 37.5, winter blank, spring blank)**. It was not needed before because Davidson Day had moved to 3A by then. That makes Gaston Day's table 38 rows.

**Rows published with a blank place stay out of the ledger**, as on Davidson Day's table, so each shows an em dash:

| Season | 2A rows with a blank place, all on 0 points |
|---|---|
| 2021–22 | Salem Baptist Christian School, Thales Academy - Apex |
| 2023–24 | Friendship Christian School, Neuse Christian Academy, Salem Baptist Christian School, Statesville Christian School, Westminster Catawba Christian School |
| 2024–25 | Liberty Christian Academy, Salem Baptist |
| 2025–26 | Salem Baptist, Liberty Christian Academy, Berean Baptist Academy |

Liberty Christian Academy has no placed row in any season and stays off the table. In 2024–25 3A, Thales Academy - Rolesville has a blank place, so its cell is an em dash.

**Published oddities in Gaston Day's division** are the ones Davidson Day's file already records, copied as published. The 2021–22 2A row for Westminster Catawba does not sum, so it keeps its total and drops its splits.

**Berean Baptist's homepage.** https://bbafnc.org/ was loaded in real Chrome on 2026-11-02. The title reads "Berean Baptist Academy" and the page gives 518 Glensford Drive, Fayetteville, NC 28314.

**Title and runner-up years rest on the association's own results wherever it published them.** The NCISAA archive was read for 19 sports and all six seasons (114 pages). A bracket prints a team's record at each round, so the winner's record rises by one win after the final. Every Gaston Day final below printed a winner that way. Swimming came from the team-score PDFs on `admin.ncisaa.org`, cross country from the timing pages the archive links (`results.tfmeetpro.com`), and track from the division reports for 2021 and 2025.

**Golf and two track seasons rest on press, tested against the term totals.** `ncisaa.shotstat.com` did not resolve, and a Wayback Machine listing found no scoreboard page before that service went offline. The archive links no track results for 2022, 2023, 2024 or 2026. Those finishes come from the dated reports listed below, and each one fits the published spring total exactly.

**The term-total proof.** A scored finish must fit the published fall, winter and spring totals. Points: 1st 50, 2nd 45, 3rd 40, 4th 35, a semifinal loser 37.5, 5th 30, 6th 25, a quarterfinal loser 22.5, 7th 20, 8th 15. All twelve fall and winter totals are accounted for exactly, and so are four of the six spring totals.

| Season | Term | Published | Accounted for |
|---|---|---|---|
| 2020–21 | Fall | 120 | Volleyball 2nd 45, boys soccer semifinal 37.5, girls tennis semifinal 37.5 |
| 2020–21 | Winter | 75 | Girls swimming 5th 30, boys basketball QF 22.5, girls basketball QF 22.5 |
| 2020–21 | Spring | 107.5 | Boys tennis 2nd 45, boys golf 3rd 40, baseball QF 22.5 |
| 2021–22 | Fall | 175 | Boys soccer 50, volleyball 50, girls tennis 50, girls XC 6th 25 |
| 2021–22 | Winter | 87.5 | Girls swimming 50, boys basketball semifinal 37.5 |
| 2021–22 | Spring | 132.5 | Boys golf 50, boys tennis 2nd 45, baseball QF 22.5, with 15 not traced |
| 2022–23 | Fall | 117.5 | Boys soccer 50, girls tennis 2nd 45, volleyball QF 22.5 |
| 2022–23 | Winter | 72.5 | Boys basketball semifinal 37.5, girls swimming 4th 35 |
| 2022–23 | Spring | 95 | Boys golf 50, boys track 2nd 45 |
| 2023–24 | Fall | 150 | Girls tennis 50, boys soccer semifinal 37.5, volleyball semifinal 37.5, girls XC 6th 25 |
| 2023–24 | Winter | 35 | Girls swimming 4th 35 |
| 2023–24 | Spring | 95 | Boys track 50, boys golf 2nd 45 |
| 2024–25 | Fall | 185 | Volleyball 50, boys soccer 50, girls tennis 50, boys XC 7th 20, girls XC 8th 15 |
| 2024–25 | Winter | 30 | Girls swimming 5th 30 |
| 2024–25 | Spring | 17.5 | Girls track T7 (20 + 15) ÷ 2 |
| 2025–26 | Fall | 145 | Volleyball 50, girls tennis 50, boys soccer 2nd 45 |
| 2025–26 | Winter | 45 | Boys basketball QF 22.5, girls basketball QF 22.5 |
| 2025–26 | Spring | 42.5 | Girls soccer QF 22.5, with 20 not traced |

The untraced 15 and 20 are too small to hide a title or a runner-up finish. In 2020–21 boys golf tied Westchester on 238 and the published table lists Gaston Day 3rd, so it scored 40, not the split 37.5.

**Disagreements with the app's earlier record** (`Gaston Day School - Sports - Program and Championship Ledger 2026.md`, built from HighSchoolOT round-ups for three seasons plus Gaston Day coverage):

- **Eight titles since 2021 is wrong. The count is 14.** The earlier pass missed boys soccer 2021 and 2022, girls swimming 2022, boys golf 2022 and 2023, and boys track 2024.
- **"In exactly three sports" is false.** The titles sit in six: girls tennis, volleyball, boys soccer, boys golf, girls swimming and boys track.
- **The 2024–25 three-title year was not the school's biggest.** 2021–22 had five team titles, which the Gaston Gazette report of May 17, 2022 lists: boys soccer, girls swimming, girls tennis, volleyball and boys golf.

**The earlier ledger's other facts hold.** Its 2021, 2023, 2024 and 2025 girls tennis titles and its 2021, 2024 and 2025 volleyball titles all match the brackets. So does the 2024 boys soccer title.

**Reach limits.** Boys and girls golf for 2024–25 and 2025–26 were not read beyond the term totals. 2025's 2A golf top three is Village Christian, Burlington Christian and O'Neal, per O'Neal's report. Cross country 2022 and 2025 and swimming 2026 were not read, and the fall and winter totals for those seasons are exact without them.

Sources:

- 2025–26 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- 2024–25 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- 2023–24 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- 2022–23 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- 2021–22 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- 2020–21 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- NCISAA results archive, per sport and season: https://archives.ncisaa.org/index.php?sport=12&years=2021-2022 (sport ids: boys soccer 8, girls tennis 11, volleyball 12, boys tennis 16)
- 2021 boys golf 2A team results: https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%202A%20Team%20Results%20(1).pdf
- 2022 swimming team scores: https://admin.ncisaa.org/uploads/SWIMMING/Div%203%20Final_Team_Ind.pdf
- 2023 swimming team scores: https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%203%20Swim%20scores.pdf
- 2021 cross country: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- 2024 cross country: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- 2025 track team scores: https://admin.ncisaa.org/uploads/Docs/NCISAA%20D3%20Final%20Results.pdf
- 2022 boys golf title, Gaston Gazette: https://sports.yahoo.com/happy-blue-gaston-day-boys-170121762.html
- 2023 final statewide golf rankings, naming Gaston Day NCISAA D3 champion, HighSchoolOT: https://www.highschoolot.com/story/highschoolot-hsot-final-statewide-rankings-for-boys-golf/20898527/
- 2023 boys golf, O'Neal runner-up by two strokes: https://www.onealschool.org/news-detail?pk=1536408
- 2023 boys track, Alamance News: https://alamancenews.com/bca-boys-track-and-field-team-secures-first-title-in-any-sport-for-school/
- 2024 boys golf, HighSchoolOT: https://www.highschoolot.com/story/the-o-neal-school-wins-ncisaa-d3-boys-golf-trinity-academy-s-eastman-wins-medalist/21453701/
- 2024 boys track, Charlotte Observer: https://sports.yahoo.com/super-saturday-seven-charlotte-area-011100010.html
- 2024 boys track, Gaston Gazette: https://sports.yahoo.com/south-point-boys-tennis-gaston-011132558.html

## Wells Fargo Cup results for Gaston Day

Fall, winter, spring and total as published. All six seasons are NCISAA 2A.

| Season | Place | Fall | Winter | Spring | Total |
|---|---|---|---|---|---|
| 2020–21 | 2 | 120 | 75 | 107.5 | 302.5 |
| 2021–22 | 1 | 175 | 87.5 | 132.5 | 395 |
| 2022–23 | 4 | 117.5 | 72.5 | 95 | 285 |
| 2023–24 | 4 | 150 | 35 | 95 | 280 |
| 2024–25 | 7 | 185 | 30 | 17.5 | 232.5 |
| 2025–26 | 6 | 145 | 45 | 42.5 | 232.5 |

## Wells Fargo Cup row to add for Berean Baptist Academy

| Season | Class | Place | Fall | Winter | Spring | Total |
|---|---|---|---|---|---|---|
| 2024–25 | 2A | 21 | 37.5 | blank | blank | 37.5 |

Its other published row, 2025–26 2A, has a blank place on 0 points and stays out. No earlier season lists the school.

## Wells Fargo Cup point sources for Gaston Day

Years are calendar years of the event. Fourteen titles and eight runner-up finishes, 2020–2026.

| Sport | Season | Titles | Runner-up |
|---|---|---|---|
| Girls tennis | Fall | 2021, 2023, 2024, 2025 | 2022 |
| Volleyball | Fall | 2021, 2024, 2025 | 2020 |
| Boys soccer | Fall | 2021, 2022, 2024 | 2025 |
| Boys golf | Spring | 2022, 2023 | 2024 |
| Boys track and field | Spring | 2024 | 2023 |
| Girls swimming | Winter | 2022 | |
| Boys tennis | Spring | | 2021, 2022 |

Evidence for each final:

| Year | Sport | Result | Source |
|---|---|---|---|
| 2020 | Volleyball | Lost 3–0 to Caldwell Academy, Oct 31 | Bracket |
| 2021 | Boys tennis | Lost 5–0 to Rocky Mount Academy, May 15 | Bracket |
| 2021 | Boys soccer | Won 3–1 over Trinity Academy, Oct 30 | Bracket |
| 2021 | Volleyball | Won 3–1 over Davidson Day, Oct 30 | Bracket |
| 2021 | Girls tennis | Won 5–4 over Davidson Day, Oct 30 | Bracket |
| 2022 | Girls swimming | Won 231 to O'Neal's 222 | Team-score PDF |
| 2022 | Boys golf | Won on 226, four strokes ahead of O'Neal and Caldwell, May 17 | Gaston Gazette |
| 2022 | Boys tennis | Lost 5–2 to Rocky Mount Academy, May 21 | Bracket |
| 2022 | Boys soccer | Won 3–1 over Greenfield | Bracket |
| 2022 | Girls tennis | Lost 5–3 to Trinity School of Durham and Chapel Hill | Bracket |
| 2023 | Boys golf | Won. HighSchoolOT names Gaston Day NCISAA D3 champion, O'Neal was runner-up by two strokes, and the spring total fits | HighSchoolOT, O'Neal |
| 2023 | Boys track | 2nd on 68, Burlington Christian 75, May 19–20 | Alamance News |
| 2023 | Girls tennis | Won 5–1 over Trinity School of Durham and Chapel Hill | Bracket |
| 2024 | Boys track | Won on 87, Caldwell 75, O'Neal 73 | Charlotte Observer |
| 2024 | Boys golf | 2nd on 228, O'Neal 217 | HighSchoolOT |
| 2024 | Volleyball | Won 3–0 over Westminster Catawba | Bracket |
| 2024 | Boys soccer | Won 2–0 over Westchester | Bracket |
| 2024 | Girls tennis | Won 5–2 over Epiphany | Bracket |
| 2025 | Volleyball | Won 3–2 over St. Thomas More | Bracket |
| 2025 | Girls tennis | Won 5–4 over Epiphany | Bracket |
| 2025 | Boys soccer | Lost 4–1 to Caldwell Academy | Bracket |

Dropped, under the usual bar of a title or a runner-up year: boys golf 2021 (3rd), the girls swimming finishes of 4th and 5th, the boys and girls basketball semifinals and quarterfinals, and every cross country finish.
