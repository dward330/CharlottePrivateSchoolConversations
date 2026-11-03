# Hickory Grove Christian - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-11-02 by the `/wells-fargo-cup` skill, for the planned Hickory Grove Christian Wells Fargo Cup card (plan `hickorygrovecup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed across all six seasons and all four classes.

**The shared ledger needs no correction.** All 407 NCISAA rows in `CUP_RECORDS` match the published tables on class, place, tie, splits and total, including Hickory Grove's six, and all 36 NCISAA `CUP_DIVISION_LEADERS` rows match. Hickory Grove played 3A in all six seasons, and every placed 3A row is already in the ledger: 17, 17, 20, 21, 25 and 26 schools. `CUP_FIELD_SIZES` still matches (2A 25, 3A 26, 4A 17), and no newer season is posted.

**Two 3A rows stay out, as published.** 2024–25 3A prints Cristo Rey Research Triangle and Thales Academy Rolesville with no place and 0 points, so neither has a ledger row and Thales Academy Rolesville shows an em dash that season. Cristo Rey has no placed season and is not on the card.

**Title and runner-up years rest on the association's own results.** The NCISAA archive was read for 20 sports and all six seasons (120 pages); 39 name Hickory Grove. Boys cross country team tables came from the Mitchell Timing pages the NCISAA links for 2020, 2021, 2023 and 2024, and from NC MileSplit raw results for 2022. No 2025 cross country results page was reachable. The 2025 boys track team scores come from the NCISAA's Division II results PDF.

**The term-total proof.** A scored finish must fit the published fall, winter and spring totals. Points: 1st 50, 2nd 45, 3rd 40, 4th 35, 5th 30, 6th 25, 7th 20, 8th 15. A bracket loser earns the average of the places its round shares: a semifinal loser 37.5, and a quarterfinal loser 22.5 in an eight-team bracket, 25 in seven teams and 27.5 in six. Every fall and winter total is accounted for exactly, as are two of six spring totals.

| Season | Term | Published | Accounted for |
|---|---|---|---|
| 2020–21 | Fall | 22.5 | Volleyball quarterfinal 22.5 |
| 2020–21 | Winter | 22.5 | Girls basketball quarterfinal 22.5 |
| 2020–21 | Spring | 87.5 | Baseball 1st 50, softball semifinal 37.5 |
| 2021–22 | Fall | 20 | Boys cross country 7th 20 |
| 2021–22 | Winter | 22.5 | Girls basketball quarterfinal 22.5 |
| 2021–22 | Spring | 102.5 | Softball 2nd 45, baseball semifinal 37.5, 20 unassigned |
| 2022–23 | Fall | 85 | Boys cross country 4th 35, football quarterfinal in a six-team bracket 27.5, volleyball quarterfinal 22.5 |
| 2022–23 | Winter | 22.5 | Girls basketball quarterfinal 22.5 |
| 2022–23 | Spring | 130 | Baseball 1st 50, softball 2nd 45, 35 unassigned |
| 2023–24 | Fall | 62.5 | Football semifinal 37.5, boys cross country 6th 25 |
| 2023–24 | Winter | 0 | No scored finish |
| 2023–24 | Spring | 85 | Baseball 2nd 45, 40 unassigned |
| 2024–25 | Fall | 67.5 | Football semifinal 37.5, boys cross country 5th 30 |
| 2024–25 | Winter | 0 | No scored finish |
| 2024–25 | Spring | 87.5 | Boys track 1st 50, baseball semifinal 37.5 |
| 2025–26 | Fall | 25 | Football quarterfinal in a seven-team bracket 25 |
| 2025–26 | Winter | 22.5 | Girls basketball quarterfinal 22.5 |
| 2025–26 | Spring | 62.5 | Baseball semifinal 37.5, 25 unassigned |

**The four unassigned spring amounts cannot hide a title or a runner-up.** Each is under 45 (20, 35, 40 and 25). Each fits one placed finish in boys track or boys golf, and neither result is public for those years: the archive links no track results for 2022–2024 or 2026, and `ncisaa.shotstat.com` does not resolve. They are left unassigned and no card names them.

**The evidence for each final.**

- **Baseball 2021.** The 3A bracket prints `Game 1: Hickory Grove 5-1 Game 2: Hickory Grove 4-2` against High Point Christian, and the page is mirrored but prints the champion as `#1 Hickory Grove Christian School (28-2)`.
- **Baseball 2023.** The 3A bracket prints `Game 1 - HG 8, HPCA 1 Game 2 - HPCA 13, HG, 3 Game 3 - HG 5, HPCA 1`, champion `#2 Hickory Grove Christian School (19-10)`.
- **Baseball 2024.** The 3A bracket prints `Game 1 - Grace 4, Hickory Grove 1 Game 2 - Grace 7, Hickory Grove 5`, champion Grace Christian (Sanford). Hickory Grove reached the final at 18–8 and finished 18–10.
- **Softball 2022.** The 3A bracket prints `Game 1 - HPCA 3 HGC 0 Game 2 - HGC 11 HPCA 10 Game 3 - HPCA 12 HGC 7`, so High Point Christian won the series two games to one. The term total cannot separate 45 from 50 here, since 20 or 15 would stay unassigned, so this rests on the printed games.
- **Softball 2023.** The 3A bracket prints `Game 1 - High Point 11, Hickory Grove 0 Game 2 - High Point 14, Hickory Grove 2`.
- **Boys track 2025.** The archive page prints `Boys Team Champions - Hickory Grove Christian School` under Division II. The results PDF scores Hickory Grove 130, Asheville School 93. Discus 164' 8" is on the same PDF.

**Semifinals named on the Winning Record card.** Softball lost the 2021 3A semifinal to Forsyth Country Day, 3–2.

**Disagreements with earlier sources.**

- **The app says seven team titles; the record shows twelve.** The figure came from Wikipedia, and it cannot be right, since softball alone has seven. The school's own pages list softball seven, baseball three and girls basketball one, and the NCISAA adds the 2025 boys track title. The app's own title bars already sum to twelve.
- **The school's softball list stops at 2018.** Its Spring Sports page lists runner-up finishes in 2018, 2015, 2013 and 2004, and omits 2022 and 2023, which the brackets show.
- **The school's track list has no team title.** Its Spring Sports page lists 2025 event champions under "State Champions (3A)" and never lists the team title. The association scores track by division, so the team title is Division II.
- **Runner-up count.** Wikipedia gives five. The school's pages and the brackets give at least nine: softball 2004, 2013, 2015, 2018, 2022 and 2023, boys swimming 2005, girls basketball 2010 and baseball 2024. A 2012 cheerleading runner-up on the school's list is not counted, since cheerleading is not a Cup sport.
- **The app says the 2021 and 2023 baseball final scores were not found.** The brackets print both.
- **Three school URLs moved.** `https://www.hgchristian.org/athletics`, `/athletics/new-coaches-and-teams` and `/athletics/records-and-titles/` all redirect to `https://www.hgchristian.org/athletics-home`. The records and coaches now live on the three season pages.
- **Some coaches have changed since the app's roster was written.** The Spring Sports page names Brittany Balser for softball, and the Winter Sports page names Meredith Gentili for swimming and Rachel Little for varsity winter cheer. The Coaching card is outside this plan.

**Sources.**

- https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- https://archives.ncisaa.org/index.php?sport=1&years=2020-2021 (baseball; the same URL with sport=21 is softball, 31 football 11-man, 12 volleyball, 23 girls basketball, and the `years` value changes the season)
- https://archives.ncisaa.org/index.php?sport=22&years=2024-2025 (track)
- https://admin.ncisaa.org/uploads/Docs/NCISAA%20D2%20FInal%20Results.pdf
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2020/
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- https://nc.milesplit.com/meets/503458-ncisaa-state-xc-championships-2022/results/861201/raw
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Cross_Country_Championships_2023/
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- https://www.hgchristian.org/fall-sports
- https://www.hgchristian.org/winter-sports
- https://www.hgchristian.org/spring-sports

## Wells Fargo Cup results for Hickory Grove Christian

Copied as published. All six rows are already in `CUP_RECORDS`.

| Season | Class | Place | Fall | Winter | Spring | Total |
|---|---|---|---|---|---|---|
| 2020–21 | 3A | 16 | 22.5 | 22.5 | 87.5 | 132.5 |
| 2021–22 | 3A | T13 | 20 | 22.5 | 102.5 | 145 |
| 2022–23 | 3A | 8 | 85 | 22.5 | 130 | 237.5 |
| 2023–24 | 3A | 15 | 62.5 | 0 | 85 | 147.5 |
| 2024–25 | 3A | 12 | 67.5 | 0 | 87.5 | 155 |
| 2025–26 | 3A | 18 | 25 | 22.5 | 62.5 | 110 |

## Wells Fargo Cup point sources for Hickory Grove Christian

| Sport | Season | Titles | Runner-up |
|---|---|---|---|
| Baseball | Spring | 2021, 2023 | 2024 |
| Softball | Spring | none | 2022, 2023 |
| Boys track & field | Spring | 2025 | none |

Dropped: none. No other sport reached a state final in these six seasons.
