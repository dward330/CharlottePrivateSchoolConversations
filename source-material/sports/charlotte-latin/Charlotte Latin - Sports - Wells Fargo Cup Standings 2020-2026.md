# Charlotte Latin - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-10-31 by the `/wells-fargo-cup` skill, for the planned Charlotte Latin Wells Fargo Cup card (plan `latincup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed into 511 school rows across all six seasons. Fall + winter + spring equals the published total on every row except the two already recorded in Providence Day's file: 2021–22 1A Victory Christian Center and 2021–22 2A Westminster Catawba Christian. Neither is in the 4A table Latin's card shows. No figure here is an estimate.

**The shared ledger needed no correction.** `CUP_RECORDS` was compared against the official tables: all 132 NCISAA rows match on class, place, tie, splits and total, including Latin's six. All 36 `CUP_DIVISION_LEADERS` rows match. All 102 official 4A rows are in the ledger. `current-champions/` still shows 2025–26, so no newer season has been published. The full ledger lives in `src/data/wellsFargoCup.ts`, and its row-level source file is `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup Standings 2020-2026.md`. Latin's rows are repeated below.

Title and runner-up years come from the NCISAA's own results archive first, read for all 20 sports and all six seasons (120 pages), then from Latin's published title matrix and press. Years are calendar years of the championship event, matching Providence Day's list, so a fall final in the 2025–26 season is 2025. The 2020–21 brackets are mirrored, with the final in the middle, so a finalist there was read from bracket progression and each team's final record.

**Corrections this pass found in the repo's Latin data**, all checked against the sources below:

- **Girls lacrosse 2024–25 was not a runner-up finish.** The Winning Record card shows RUNNER-UP and the note "Three consecutive state finals". The NCISAA bracket has #3 Latin beating Ravenscroft 16-5 at 12–7, then losing the semifinal to #2 Charlotte Country Day 16-11, for a final 12–8. Providence Day beat Country Day in the final. Latin's finals in this run were 2021–2024 and 2026.
- **The girls golf title came in October 2025, not 2026.** The championship was played Oct. 20-21, 2025 at Greensboro National. The season belongs in 2025–26, which the card's column has right, but its prose says "in 2026". Latin and Providence Day tied at 476 and Latin won the tiebreak.
- **Field hockey 2025 is 17–5, not 16–5.** The NCISAA bracket has #2 Latin at 17–4 going into the final, which it lost to Country Day.
- **Latin has 18 Wells Fargo Cups, not 17.** Its Cup page and title matrix both say 18, listing 1984, 1988–1991, 1993–1995, 1997, 2005–2011, 2017 and 2019. Its 2022 spring news post also says 18. The repo's dossier took 17 from Wikipedia.

**Open and not changed:** the repo says 250 points for the 2024 wrestling title. The Charlotte Observer's team table says 250.5, ahead of Metrolina Christian's 231. No official team table for 2024 was reachable. The repo also lists boys swimming 2nd in 2025–26. The official 2025–26 archive page posts no team scores and no source confirmed it, so the year is left off the point sources below.

**Reach limits.** `ncisaa.shotstat.com`, which hosts the NCISAA's golf scoreboards, did not resolve from this environment (DNS failure under both curl and WebFetch). Golf years therefore rest on the school's matrix and press rather than that scoreboard, except 2021 boys golf and 2025 girls golf, whose official PDFs were read. Cross country was read from official timing for 2020, 2021 and 2024 only. Track and field team results were read for 2021 and 2025 only. Neither is a complete census of Latin's top-two finishes, so a missing year here is not evidence of no finish.

Latin's team championships link serves an HTML wrapper; the PDF itself is on the CDN URL listed below.

Sources:

- 2025–26 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- 2024–25 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- 2023–24 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- 2022–23 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- 2021–22 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- 2020–21 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- Scoring and history: https://www.ncisaa.org/recognition/wells-fargo-cup/history/
- NCISAA sport list: https://www.ncisaa.org/sports/
- NCISAA results archive index: https://archives.ncisaa.org/ (per sport: `index.php?sport=<id>&years=<yyyy-yyyy>`; ids: wrestling 14, swimming 15, boys golf 7, girls golf 20, girls soccer 17, girls lacrosse 19, girls tennis 11, boys tennis 16, field hockey 9, volleyball 12, softball 21, cross country 2)
- Latin title matrix, created 2025-12-08 (page): https://clshawks.com/sports/2026/3/31/cls-team-championships.aspx
- Latin title matrix (PDF): https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/chalatin.sidearmsports.com/documents/2025/12/9/Charlotte_Latin_Team_Championships.pdf
- Latin Wells Fargo Cup history: https://clshawks.com/sports/2025/12/16/wells-fargo-cup.aspx
- Latin spring 2022 recap (655 points, runner-up, boys golf 2nd): https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/spring-numbers-13-all-state-29-all-conference-3-poy-2-cls-records
- Latin 2024 boys golf title: https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/boys-golf-team-wins-state-championship
- 2023 boys golf title (Charlotte Observer): https://ca.sports.yahoo.com/news/meet-observer-boys-golf-team-090000204.html
- 2026 boys golf title (HighSchoolOT): https://www.highschoolot.com/story/the-2026-ncisaa-4a-boys-golf-championships-scores-and-top-ten-results/22357812/
- 2021 boys golf 4A team results, Latin 3rd: https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%204A%20Team%20Results%20(1).pdf
- 2025 girls golf Division I team results: https://admin.ncisaa.org/uploads/25-26%20Championship%20Logos/NCISAA%20Division%20I%20Girls%20Golf%20Team%20Results.pdf
- 2021 swimming Division I team scores: https://admin.ncisaa.org/uploads/ncisaa%20division%20i%20scores.pdf
- 2022 swimming Division I results: https://admin.ncisaa.org/uploads/SWIMMING/Div%201%20Final_Team_Ind.pdf
- 2023 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%201%20Swim%20scores.pdf
- 2024 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2024/2024%20NCISAA%20D1%20State%20Team%20Scores.pdf
- 2025 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2025/division%201%20scores.pdf
- 2021 wrestling title (Charlotte Observer, Feb. 28, 2021): https://news.yahoo.com/charlotte-latin-uses-depth-win-042321778.html
- 2023 wrestling team scores: https://admin.ncisaa.org/uploads/Docs/Wrestling%20Team%20scores-2023.pdf
- 2024 wrestling title (Charlotte Observer): https://ca.news.yahoo.com/charlotte-latin-wins-ncisaa-high-050000023.html
- 2025 wrestling, lost by one point: https://www.highschoolot.com/story/metrolina-christian-takes-ncisaa-wrestling-championship-by-one-point/21863211/
- 2026 wrestling title: https://clshawks.com/news/2026/2/16/wrestling-mat-hawks-dominant-performance-wins-ncisaa-team-title-4-individual-titles-and-coach-of-the-year.aspx
- 2020 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2020/
- 2021 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- 2024 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- 2021 girls lacrosse title (Charlotte Observer, May 15, 2021): https://news.yahoo.com/ncisaa-roundup-providence-day-boys-163726530.html
- 2025–26 NCISAA champions by sport: https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/

## Wells Fargo Cup results for Charlotte Latin

All six seasons are NCISAA 4A. Copied from the official tables and identical to `CUP_RECORDS`.

| Season | Place | Fall | Winter | Spring | Total | Winner | Points behind 1st |
|---|---|---|---|---|---|---|---|
| 2020–21 | 3 | 165 | 157.5 | 212.5 | 535 | Providence Day 670 | 135 |
| 2021–22 | 2 | 185 | 197.5 | 272.5 | 655 | Charlotte Country Day 682.5 | 27.5 |
| 2022–23 | 2 | 180 | 185 | 247.5 | 612.5 | Providence Day 782.5 | 170 |
| 2023–24 | 3 | 137.5 | 162.5 | 212.5 | 512.5 | Providence Day 757.5 | 245 |
| 2024–25 | 2 | 225 | 147.5 | 267.5 | 640 | Providence Day 650 | 10 |
| 2025–26 | 2 | 277.5 | 205 | 207.5 | 690 | Providence Day 692.5 | 2.5 |

Latin has not won the Cup in these six seasons. Its most recent win was 2019, and no Cup was awarded for 2019–20 (COVID, per Latin's title matrix). The 2025–26 fall and winter splits put Latin ahead of Providence Day after two terms, 482.5 to 422.5, before Providence Day's spring won the Cup by 2.5.

## Wells Fargo Cup point sources for Charlotte Latin

Every title or runner-up year here is confirmed by the source named beside it. "Bracket" means the NCISAA archive page for that sport and season; "matrix" means Latin's title matrix.

| Sport | Gender | Term | State titles | Runner-up | Evidence |
|---|---|---|---|---|---|
| Golf | Boys | Spring | 2023, 2024, 2025, 2026 | 2022 | 2022 school recap; 2023 matrix and Observer; 2024 school news; 2025 matrix; 2026 HighSchoolOT |
| Wrestling | Boys | Winter | 2021, 2023, 2024, 2026 | 2025 | 2021 Observer and matrix; 2023 NCISAA team scores; 2024 Observer and matrix; 2025 HighSchoolOT; 2026 Latin |
| Lacrosse | Girls | Spring | 2021, 2022, 2023, 2024 | 2026 | Bracket for all five; 2021 also Observer; all four titles in the matrix |
| Swimming | Boys | Winter | 2021, 2022, 2023, 2024 | 2025 | NCISAA Division I team scores, each year: 446–308, 418.5–344, 393.5–326, 462–266; 2025 lost 339–336 to Ravenscroft |
| Soccer | Girls | Spring | 2023 | 2021, 2022, 2024, 2025 | Bracket for all five; each loss was to Providence Day; 2023 also in the matrix |
| Tennis | Girls | Fall | 2020, 2021 | 2022 | Bracket for all three; the 2020–21 final was Oct. 31, 2020; both titles in the matrix |
| Cross Country | Girls | Fall | 2020, 2022 | 2024 | 2020 official timing, 66 points; 2022 matrix (season 2022–23); 2024 official timing, 86 to Country Day's 79 |
| Golf | Girls | Fall | 2025 | — | NCISAA team results: 476, tiebreak over Providence Day; matrix |
| Tennis | Boys | Spring | — | 2025, 2026 | Bracket for both |

**The list rule:** a sport is listed with at least one title or at least two runner-up years, which is the bar Providence Day's list already meets (boys basketball, two runner-ups and no title).

Confirmed but left off, one runner-up year each: girls swimming 2022 (NCISAA results), volleyball 2025, field hockey 2025 and softball 2025 (brackets).

Left off as unconfirmed: boys swimming runner-up 2026, and any 2022 wrestling finish (Latin's matrix shows no 2021–22 title, which is why its ten-year streak ends in 2021).

## Wells Fargo Cup state-title context

Latin's title matrix counts 198 state championships through December 2025, against the 165 on the Sports Offered card, whose research note cites Wikipedia. The matrix counts dance among its sports. Nothing was changed, and this pass did not reconcile the two counts.

Latin's Cup page lists its wins as 1984, 1988–1991, 1993–1995, 1997, 2005–2011, 2017 and 2019, so its longest run is seven. The Honors card's "eight consecutive under athletic director Jimmy Broadway" does not fit that list.
