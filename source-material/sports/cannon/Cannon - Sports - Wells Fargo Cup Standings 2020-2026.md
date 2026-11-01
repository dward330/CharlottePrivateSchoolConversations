# Cannon - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-11-01 by the `/wells-fargo-cup` skill, for the planned Cannon Wells Fargo Cup card (plan `cannoncup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed into 538 table rows across all six seasons, 511 of them placed; the other 27 are unplaced schools. Fall + winter + spring equals the published total on every row except the two already recorded in Providence Day's file: 2021–22 1A Victory Christian Center and 2021–22 2A Westminster Catawba Christian. Neither is in the 4A table Cannon's card shows. No figure here is an estimate.

**The shared ledger needed no correction.** `CUP_RECORDS` was compared against the official tables: all 132 NCISAA rows match on class, place, tie, splits and total, including Cannon's six. All 36 `CUP_DIVISION_LEADERS` rows match. All 102 official 4A rows are in the ledger. `current-champions/` still shows 2025–26, so no newer season has been published. The full ledger lives in `src/data/wellsFargoCup.ts`, and its row-level source file is `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup Standings 2020-2026.md`. Cannon's rows are repeated below.

Title and runner-up years come from the NCISAA's own results archive first, read for all 20 sports and all six seasons (120 pages), parsed by bracket column so a team's deepest round is read from the grid rather than from text order. Meet sports come from the NCISAA's team-score PDFs and official timing. HighSchoolOT's season roundups were used as a cross-check. Years are calendar years of the championship event, so a fall final in the 2023–24 season is 2023. No consolidated Cannon state title list was found, so nothing here rests on a school list.

**Corrections this pass found in the repo's Cannon data**, all checked against the sources below:

- **The 2025–26 "baseball" runner-up finish was softball.** The Winning Record card shows Baseball as RUNNER-UP, `swept 7–5, 9–5`, "Lost the D1 series to Covenant Day". The NCISAA softball bracket for 2025–26 prints "Game 1 CDS 7, Cannon 5" and "Game 2 CDS 9, Cannon 5", with #1 Covenant Day beating #2 Cannon. Cannon is not in the 2025–26 4A baseball bracket at all: that series was Charlotte Christian over Metrolina, in three games. The repo's June 2026 dossier flagged this series as "not confirmed by name", and the research note then filed it under baseball.
- **The `didNotWin` line carries the same error.** It says "baseball, in the D1 series (Covenant Day)". Charlotte Christian won baseball and Covenant Day won softball, per the bracket and HighSchoolOT's 2025–26 roundup.
- **Softball 2023–24 was a runner-up finish, not a blank.** The card has no softball row. #1 Cannon lost the series to #2 North Raleigh Christian after winning Game 1: 6–1, then 2–5 and 1–4.
- **The research note repeats the baseball error** at the win-loss table in `Cannon - Sports - Redesign Research 2026.md`, which feeds `.claude/docs/sports/cannon.md` and `src/content/sports/cannon.json`.

**Disagreements recorded, nothing changed:**

- **Volleyball 2023 final record.** HighSchoolOT's title story says the Cougars finished 23–2, and the card prints that. The NCISAA bracket's last Cannon cell reads 22–2, and it starts Cannon at 19–2. The story is specific about the two losses, so 23–2 stays. Either way the title is confirmed.

**Co-op football points.** The 2021 Division II football title was won by the Cannon and Concord Academy co-op, entered in the bracket as "Cannon - Concord Academy" and known locally as the Cabarrus Warriors. The Cup tables show the points being shared rather than credited to one school: in 2020–21 both Cannon's fall total (98.75) and Concord Academy's (63.75) end in .75, which is half of a 37.5 tied-semifinalist share (18.75), a fraction no single finish can produce. This is inferred from the arithmetic; the NCISAA does not state a co-op rule on its scoring page. Football is listed as a point source because the title is confirmed, and the source list claims nothing about how many points it carried.

**Reach limits.** `ncisaa.shotstat.com`, which hosts the NCISAA's golf scoreboards from 2022 on, did not resolve from this environment. Boys golf 2021 was read from the official PDF. For boys golf 2022–2026 and girls golf 2021–2025, champions are known only from press and HighSchoolOT's roundups, none naming Cannon, so a runner-up finish cannot be ruled out. Track team tables were read for 2021, 2025 and 2026 only. Cross country team tables were read for 2020, 2021, 2023 and 2024 only. Swimming was read for 2021–2025, not 2026. Wrestling was read for 2021–2023 only. Girls golf 2021–2022 champions were not read. A missing year here is therefore not evidence of no finish.

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
- Softball brackets: https://archives.ncisaa.org/index.php?sport=21&years=2025-2026 and the same URL for each season
- Baseball 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=1&years=2025-2026
- Boys lacrosse brackets: https://archives.ncisaa.org/index.php?sport=18&years=2021-2022 and the same URL for each season
- Girls basketball brackets: https://archives.ncisaa.org/index.php?sport=23&years=2020-2021 and the same URL for each season
- Boys basketball 2020–21 bracket: https://archives.ncisaa.org/index.php?sport=13&years=2020-2021
- Volleyball brackets: https://archives.ncisaa.org/index.php?sport=12&years=2020-2021 and the same URL for each season
- Football 2021–22 bracket: https://archives.ncisaa.org/index.php?sport=31&years=2021-2022
- 2021 boys golf 4A team results, Cannon 291: https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%204A%20Team%20Results%20(1).pdf
- 2021 swimming Division I team scores: https://admin.ncisaa.org/uploads/ncisaa%20division%20i%20scores.pdf
- 2022 swimming Division I results: https://admin.ncisaa.org/uploads/SWIMMING/Div%201%20Final_Team_Ind.pdf
- 2023 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%201%20Swim%20scores.pdf
- 2024 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2024/2024%20NCISAA%20D1%20State%20Team%20Scores.pdf
- 2025 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2025/division%201%20scores.pdf
- 2021 track Division I results: https://admin.ncisaa.org/uploads/NCISAA%20D1%20Results.pdf
- 2025 track Division I results: https://admin.ncisaa.org/uploads/Docs/NCISAA%20D1%20Final%20Results.pdf
- 2026 track official results: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_1_Track_and_Field_Championships/
- 2020 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2020/
- 2021 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- 2023 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Cross_Country_Championships_2023/
- 2024 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- 2023 wrestling team scores, Cannon 11th: https://admin.ncisaa.org/uploads/Docs/Wrestling%20Team%20scores-2023.pdf
- 2025–26 NCISAA champions by sport: https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/
- 2024–25 NCISAA champions by sport: https://www.highschoolot.com/story/the-2024-25-ncisaa-team-state-champions-in-every-sport/22016545/
- 2023–24 NCISAA champions by sport: https://www.highschoolot.com/story/the-2023-24-ncisaa-team-state-champions-in-every-sport/21461689/
- 2023 volleyball title, 23–2: https://www.highschoolot.com/story/cannon-school-dethrones-north-raleigh-christian-in-ncisaa-4a-volleyball-title-ends-8-year-reign/21144814/
- 2022 volleyball final: https://highschoolot.com/nrca-wins-8th-straight-volleyball-state-championship-takes-down-cannon/20545055
- 2021 boys basketball repeat title: https://news.yahoo.com/repeat-cannon-school-beats-carmel-231728353.html
- 2021 Division II football, co-op and final score (Cannon Magazine, Winter/Spring 2022): https://issuu.com/cannonschool/docs/cannonmag_winterspring_2022issuurev/26
- 2021 Division II football, 34–31 on 11/19/2021 (MaxPreps): https://www.maxpreps.com/nc/concord/cannon-cannon-concord-academy-cougars/football/schedule/all-time

## Wells Fargo Cup results for Cannon

All six seasons are NCISAA 4A. Copied from the official tables and identical to `CUP_RECORDS`.

| Season | Place | Fall | Winter | Spring | Total | Winner | Points behind 1st |
|---|---|---|---|---|---|---|---|
| 2020–21 | 4 | 98.75 | 190 | 175 | 463.75 | Providence Day 670 | 206.25 |
| 2021–22 | 5 | 85 | 140 | 192.5 | 417.5 | Charlotte Country Day 682.5 | 265 |
| 2022–23 | 5 | 115 | 107.5 | 167.5 | 390 | Providence Day 782.5 | 392.5 |
| 2023–24 | 4 | 115 | 112.5 | 142.5 | 370 | Providence Day 757.5 | 387.5 |
| 2024–25 | 5 | 60 | 117.5 | 202.5 | 380 | Providence Day 650 | 270 |
| 2025–26 | 5 | 80 | 97.5 | 230 | 407.5 | Providence Day 692.5 | 285 |

Cannon has not won the Cup in these six seasons and has not finished in the top three. Its best finish is 4th, in 2020–21 and 2023–24. Its highest score, 463.75, came in 2020–21, and it has scored more than 400 only twice since, never catching Durham Academy for 4th in the last two seasons.

## Wells Fargo Cup point sources for Cannon

Every title or runner-up year here is confirmed by the NCISAA source named beside it. "Bracket" means the NCISAA archive page for that sport and season.

| Sport | Gender | Term | State titles | Runner-up | Evidence |
|---|---|---|---|---|---|
| Basketball | Girls | Winter | 2021, 2024, 2025, 2026 | 2023 | Bracket for all five; 2021 over North Raleigh Christian, 2024 and 2026 over Providence Day, 2025 over Wesleyan Christian; 2023 lost to Rabun Gap |
| Lacrosse | Boys | Spring | 2022, 2023, 2024 | — | Bracket for all three; 2022 over Christ School, 2023 and 2024 over Providence Day; 2024 also in HighSchoolOT's roundup |
| Softball | Girls | Spring | 2023 | 2021, 2022, 2024, 2026 | Bracket game lines for all five: 2023 beat Charlotte Christian 10–4, 3–1; 2021 lost to Charlotte Christian 1–8, 8–7, 3–13; 2022 lost to Charlotte Christian 4–3, 0–8, 0–10; 2024 lost to North Raleigh Christian 6–1, 2–5, 1–4; 2026 lost to Covenant Day 5–7, 5–9 |
| Volleyball | Girls | Fall | 2023 | 2020, 2022 | Bracket for all three; 2023 over North Raleigh Christian 3–0; 2020 and 2022 lost to North Raleigh Christian |
| Basketball | Boys | Winter | 2021 | — | Bracket, 94–85 over Carmel Christian; the Observer's "It's a repeat" story |
| Golf | Boys | Spring | 2021 | — | NCISAA 4A team results, Cannon 291, North Raleigh Christian 294, Charlotte Latin 295 |
| Football (11-man) | Boys | Fall | 2021 | — | Bracket, Division II, Cannon - Concord Academy finishing 10–2; 34–31 over Harrells Christian per MaxPreps and Cannon Magazine |

**The list rule:** a sport is listed with at least one title or at least two runner-up years, the same bar as Providence Day's, Charlotte Latin's and Charlotte Country Day's lists.

Confirmed but left off, one runner-up year: girls track 2026 (official results: Durham Academy 123, Cannon 112, Charlotte Country Day 104).

Other team finishes read, none in the top two: girls track 4th in 2021 and 9th in 2025; boys track 13th, 14th and 13th in 2021, 2025 and 2026; boys swimming 5th, 3rd, 7th, 6th and 6th in 2021–2025; girls swimming 7th, 9th, 7th, 9th and 11th in 2021–2025; girls cross country 10th, 11th, 7th and 10th in 2020, 2021, 2023 and 2024; boys cross country 11th, 10th and 15th in 2021, 2023 and 2024; wrestling 3rd, 6th and 11th in 2021–2023; girls golf 4th in 2020.

## Wells Fargo Cup state-title context

Within the six Cup seasons the brackets give Cannon these titles by season: 2020–21 girls basketball, boys basketball, boys golf; 2021–22 football (Division II co-op), boys lacrosse; 2022–23 boys lacrosse, softball; 2023–24 volleyball, girls basketball, boys lacrosse; 2024–25 girls basketball; 2025–26 girls basketball. That is 12 in six seasons. The Winning Record card's three seasons hold against this list apart from the softball and baseball corrections in the Method section. Boys basketball's 2020 title, named in the repo's dossier, falls in 2019–20, before these tables begin.
