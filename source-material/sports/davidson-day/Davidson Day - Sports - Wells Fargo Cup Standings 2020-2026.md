# Davidson Day - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-11-02 by the `/wells-fargo-cup` skill, for the planned Davidson Day Wells Fargo Cup card (plan `davidsondaycup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed into 538 table rows across all six seasons and all four classes. The tables run 1A, 2A, 3A, 4A in that order every season.

**The shared ledger needed no correction, but it needs the rest of two divisions.** All 132 NCISAA rows in `CUP_RECORDS` match the published tables on class, place, tie, splits and total, including Davidson Day's six, and all 36 `CUP_DIVISION_LEADERS` rows match. `CUP_FIELD_SIZES` still matches (2A 25, 3A 26, 4A 17), and no newer season is posted. Davidson Day played 2A from 2020–21 to 2023–24 and 3A in 2024–25 and 2025–26, so its table is every school in those divisions in those seasons: 53 rows, of which 48 are schools the ledger does not hold yet. Those need 274 new ledger rows, including their seasons in other classes (12 in 1A), so a cell reads "In 3A" rather than an em dash.

**Published oddities, copied as published.** 2020–21 2A prints Caldwell Academy 6th on 262.5, above Rocky Mount's 5th on 232.5. 2020–21 2A prints Davidson Day 9th and Westchester 10th on the same 182.5, so Davidson Day's lead over next is 0. 2021–22 2A runs T27 three times then T28 twice. 2021–22 2A has Northside T22 on 57.5 beside Westminster Catawba T22 on 45. 2023–24 2A prints Harrells and Northwood Temple both 25th with no `T`. 2023–24 3A prints 4, 4 and 10, 10 and 20, 20 with no `T`. 2024–25 3A runs T7, T7, 8.

**One row does not sum, as the skill's notes warned.** 2021–22 2A Westminster Catawba prints fall blank, winter 22.5, spring blank and a total of 45. `check:cup` requires splits to sum, so this row goes in the ledger with its total and no splits. The splits appear on no card for a school that is not selected.

**Title and runner-up years rest on the association's own results.** The NCISAA archive was read for 19 sports and all six seasons (114 pages). The 2020–21 brackets are mirrored, as recorded, and **so are the 2021–22 brackets in most sports**, which a parser reading the last column gets wrong. A mirrored page prints the two finalists and the score but does not print a winner, so each mirrored final was settled another way, below.

**Cross country and swimming are not in brackets.** Team tables were read from the timing pages the NCISAA links (`results.tfmeetpro.com`, Mitchell Timing) for 2020, 2021, 2023 and 2024, from the NC MileSplit raw results linked from its hub for 2022, and from the swim team-score PDFs on `admin.ncisaa.org`.

**The term-total proof.** A scored finish must fit the published fall, winter and spring totals, and with these results they fit exactly, which is the strongest evidence here. Points: 1st 50, 2nd 45, a semifinal loser 37.5, a quarterfinal loser 22.5, 3rd 40, 5th 30, 6th 25, 7th 20, 8th 15.

| Season | Term | Published | Accounted for |
|---|---|---|---|
| 2021–22 | Fall | 162.5 | Boys XC 50, volleyball 45, girls tennis 45, boys soccer QF 22.5 |
| 2021–22 | Winter | 45 | Boys swimming 2nd 45 |
| 2022–23 | Fall | 110 | Volleyball 45, boys soccer QF 22.5, girls tennis QF 22.5, boys XC 7th 20 |
| 2022–23 | Winter | 55 | Boys swimming 3rd 40, girls swimming 8th 15 |
| 2022–23 | Spring | 137.5 | Girls soccer 50, boys tennis 50, girls lacrosse semifinal 37.5 |
| 2023–24 | Fall | 237.5 | Volleyball 50, boys soccer 50, boys XC 50, girls XC 50, girls tennis semifinal 37.5 |
| 2023–24 | Winter | 95 | Boys basketball 50, boys swimming 2nd 45 |
| 2024–25 | Fall | 167.5 | Volleyball 50, boys soccer 50, girls tennis semifinal 37.5, girls XC 5th 30 |
| 2024–25 | Winter | 62.5 | Boys basketball semifinal 37.5, boys swimming 6th 25 |
| 2024–25 | Spring | 137.5 | Girls soccer 50, boys tennis 50, girls lacrosse semifinal 37.5 |
| 2025–26 | Fall | 90 | Volleyball 45, boys soccer QF 22.5, girls tennis QF 22.5 |
| 2025–26 | Winter | 37.5 | Boys basketball semifinal 37.5 |
| 2020–21 | Winter | 50 | Girls basketball 50 |

**Mirrored finals, settled.**

- **Volleyball 2021 and girls tennis 2021 are runner-up years.** Gaston Day beat Davidson Day 3–1 and 5–4 at the finals of October 30, 2021. A win in either would make the fall 167.5, not the published 162.5. Gaston Day's own record lists both as titles.
- **Girls soccer 2022 is a runner-up year.** Hickory Christian and Davidson Day met in the May 21, 2022 final, 4–0. The term total cannot separate 45 from 50 here, since 20 or 15 spring points stay unexplained either way, so this rests on the bracket and on the school's own title list, which does not claim 2022 and which over-claims elsewhere.
- **Girls basketball 2021 is a title.** The grid prints Davidson Day (18–5) as the winner, 65–46 over The Burlington School on February 27, 2021, and 50 is the whole winter total.

**Disagreements with the school's own list** (https://www.davidsonday.org/athletics/history-and-achievements):

- **Boys soccer 2022 is not a title.** The school lists 2022, 2023, 2024. The bracket has Davidson Day out in the October 2022 quarterfinals and #5 Gaston Day champion, 3–1 over #6 Greenfield. The fall total leaves room only for that quarterfinal, and Gaston Day's own coverage counts 2022 among its titles.
- **Boys cross country 2022 is not a title.** The school lists 2020, 2021, 2022, 2023. Fall 2022 2A was won by Carolina Day on 142, and Davidson Day was 7th on 247. That 7th is the 20 points that complete the published fall total of 110.
- **Boys tennis 2026 is missing.** The school lists 2023, 2024, 2025. The bracket has the 2026 title too, 5–0 over Cape Fear Academy, so it is four straight.
- **Boys swimming and the track entries are relay titles, not team titles.** The school marks them "400 Yard Freestyle Relay" and similar. Only team finishes count here.

**Corrections to the app's Winning Record card.** It came from the school's list, so it inherited these errors:

- **"Three separate three-peats ended" is false.** Only girls soccer had one (2023, 2024, 2025). Boys soccer won two (2023, 2024), and volleyball won two.
- **Boys tennis is four straight, not three.** Its finals were 2023 5–1 over Carolina Day, 2024 5–0 over Carolina Day, 2025 5–2 over Cape Fear and 2026 5–0 over Cape Fear. The card prints no score for 2023–24 and `5–1 final` for 2024–25, which is wrong.
- **The volleyball final the card dates to 2026 was played in fall 2025**, 1–3 to Wake Christian. Both cross country titles it dates to 2026 were also fall 2025.

Left alone: small record differences between the card and the bracket (volleyball `24–4–2` and `24–4` against the bracket's `24–4` and `23–4`, boys basketball `24–7` against `23–7`). The bracket prints a record at each round and may lag the final count, so neither is shown wrong.

**Reach limits.** Golf and track team tables were not read: `ncisaa.shotstat.com` did not resolve, and most track seasons link no results. Girls tennis 2021 is a single runner-up, so it stays off the list under the usual bar. Term totals leave at most 20 spring points unexplained in 2021–22, 42.5 in 2023–24 and 22.5 in 2025–26, and 37.5 is 2020–21's whole spring, so a title or runner-up finish cannot hide in any of them. In fall 2020–21, volleyball's quarterfinal leaves at most 22.5.

Sources:

- 2025–26 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- 2024–25 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- 2023–24 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- 2022–23 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- 2021–22 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- 2020–21 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- Scoring and history: https://www.ncisaa.org/recognition/wells-fargo-cup/history/
- NCISAA results archive: https://archives.ncisaa.org/ (per sport: `index.php?sport=<id>&years=<yyyy-yyyy>`; ids: cross country 2, boys soccer 8, girls tennis 11, volleyball 12, boys basketball 13, swimming 15, boys tennis 16, girls soccer 17, girls lacrosse 19, girls basketball 23)
- Cross country 2020: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2020/
- Cross country 2021: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- Cross country 2022: https://nc.milesplit.com/meets/503458-ncisaa-state-xc-championships-2022/results/861208/raw (boys) and https://nc.milesplit.com/meets/503458-ncisaa-state-xc-championships-2022/results/861207/raw (girls), linked from https://nc.milesplit.com/articles/323055/the-complete-ncisaa-xc-state-championship-hub
- Cross country 2023: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Cross_Country_Championships_2023/
- Cross country 2024: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- Swimming 2022, Division III: https://admin.ncisaa.org/uploads/SWIMMING/Div%203%20Final_Team_Ind.pdf
- Swimming 2023, Division III: https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%203%20Swim%20scores.pdf
- Swimming 2024, Division III: https://admin.ncisaa.org/uploads/SWIMMING/2024/2024%20NCISAA%20D3%20results.pdf
- Swimming 2025, Division II: https://admin.ncisaa.org/uploads/SWIMMING/2025/division%202%20scores.pdf
- Swimming 2021, Division III: https://admin.ncisaa.org/uploads/ncisaa%20division%20iii%20scores.pdf
- Gaston Day's titles: https://www.aol.com/d-j-vu-gaston-day-152259795.html
- The school's own list: https://www.davidsonday.org/athletics/history-and-achievements

### The off-roster schools on the table

Each is a `CUP_SHORT_NAMES` key, a `CUP_HIGH_SCHOOLS` entry and, unless noted, a new `HIGH_SCHOOLS` row. Every URL was fetched on 2026-11-02, and the page shows the school’s name and its location. Sites that answered with a script or a bot challenge were loaded in real Chrome.

**A 200 proves nothing.** Four domains that answered in planning (`oneal.org`, `burlingtonschool.org`, `cfschool.org`, `hpca.com`) were parked: each serves a one-line script that redirects to a GoDaddy sale page. `tcsnc.org` is Transylvania County Schools behind a bot challenge. `calvarydayschool.com` and `theepiphanyschool.org` answered as schools with the right name, but neither page mentions Winston-Salem or New Bern, and each school’s real site is a different domain. Neuse Christian Academy is in Raleigh, not New Bern. Salem Baptist Christian School now calls itself Salem Christian School, and the NCISAA tables still print the old name.

| Slug | Card name | Master name | City | Homepage |
|---|---|---|---|---|
| oneal-school | The O’Neal School | The O’Neal School | Southern Pines | https://www.onealschool.org |
| wayne-country-day | Wayne Country Day | Wayne Country Day School | Goldsboro | https://www.waynecountryday.com |
| trinity-academy | Trinity Academy | Trinity Academy of Raleigh | Raleigh | https://trinityacademy.com. trinityacademy.org is a school in Wichita, KS |
| rocky-mount-academy | Rocky Mount Academy | Rocky Mount Academy | Rocky Mount | https://www.rmacademy.com |
| caldwell-academy | Caldwell Academy | Caldwell Academy | Greensboro | https://www.caldwellacademy.org |
| trinity-durham | Trinity School of Durham and Chapel Hill | Trinity School of Durham and Chapel Hill | Durham | https://www.trinityschoolnc.org |
| burlington-school | The Burlington School | The Burlington School | Burlington | https://www.theburlingtonschool.org. burlingtonschool.org is a parked domain |
| westchester-country-day | Westchester Country Day | Westchester Country Day School | High Point | https://www.westchestercds.org |
| burlington-christian | Burlington Christian | Burlington Christian Academy | Burlington | https://www.bcaroyals.com |
| university-christian | University Christian | University Christian High School | Hickory | https://www.uchigh.com |
| harrells-christian | Harrells Christian | Harrells Christian Academy | Harrells | https://www.harrellsca.com |
| st-thomas-more | St. Thomas More | St. Thomas More Academy | Raleigh | https://stmacademy.org |
| fayetteville-academy | Fayetteville Academy | Fayetteville Academy | Fayetteville | https://www.fayacademy.org |
| thales-rolesville | Thales Academy Rolesville | Thales Academy Rolesville | Rolesville | https://www.thalesacademy.org/contact/rolesville-jh-hs. The network site has no campus homepage, so this is the campus directory page |
| thales-apex | Thales Academy Apex | Thales Academy Apex | Apex | https://www.thalesacademy.org/contact/apex-4-12. The network site has no campus homepage, so this is the campus directory page |
| trinity-christian | Trinity Christian | Trinity Christian School (Fayetteville) | Fayetteville | https://www.trinitycommunityservices.org. The school’s site is its parent organization, Trinity Community Services. tcsnc.org is Transylvania County Schools |
| john-paul-ii | John Paul II | John Paul II Catholic High School | Greenville | https://www.jp2chs.com. jp2catholic.org is another school |
| westminster-catawba | Westminster Catawba | Westminster Catawba Christian School | Rock Hill, SC | https://wccs.org |
| northwood-temple | Northwood Temple | Northwood Temple Academy | Fayetteville | https://www.ntaeagles.com. northwoodtempleacademy.org is now a gambling site |
| friendship-christian | Friendship Christian | Friendship Christian School | Raleigh | https://www.friendshipchristian.net |
| freedom-christian | Freedom Christian | Freedom Christian Academy | Fayetteville | https://www.fcapatriots.org. freedomchristian.org is a Michigan school |
| hickory-christian | Hickory Christian | Hickory Christian Academy | Hickory | https://hickorychristianacademy.com |
| wayne-christian | Wayne Christian | Wayne Christian School | Goldsboro | https://waynechristian.org |
| faith-christian | Faith Christian | Faith Christian School | Rocky Mount | https://www.fcspatriots.com |
| northside-christian | Northside Christian | Northside Christian Academy | Charlotte | closed 2024: already in the master with `status: closed` and no URL |
| village-christian | Village Christian | Village Christian Academy | Fayetteville | https://www.vcanc.com. villagechristian.org is a Los Angeles school |
| epiphany-school | Epiphany School | The Epiphany School of Global Studies | New Bern | https://www.epiphanyglobalschool.org. theepiphanyschool.org is another school |
| carolina-friends | Carolina Friends | Carolina Friends School | Durham | https://www.cfsnc.org. cfschool.org is a parked domain |
| salem-baptist | Salem Baptist | Salem Baptist Christian School | Winston-Salem | https://www.salemdefenders.org. Now Salem Christian School. NCISAA tables still print Salem Baptist. salemvikings.org redirects here |
| statesville-christian | Statesville Christian | Statesville Christian School | Statesville | https://www.statesvillechristian.org |
| neuse-christian | Neuse Christian | Neuse Christian Academy | Raleigh | https://www.neusechristian.com. In Raleigh on Falls of Neuse Road, not New Bern |
| carolina-day | Carolina Day | Carolina Day School | Asheville | already in the master |
| grace-christian-sanford | Grace Christian (Sanford) | Grace Christian School (Sanford) | Sanford | https://www.gracechristiansanford.com |
| grace-christian-raleigh | Grace Christian (Raleigh) | Grace Christian School (Raleigh) | Raleigh | https://www.gracechristian.net |
| greenfield-school | Greenfield School | Greenfield School | Wilson | https://www.greenfieldschool.org |
| fayetteville-christian | Fayetteville Christian | Fayetteville Christian School | Fayetteville | https://www.fayettevillechristian.com |
| cape-fear-academy | Cape Fear Academy | Cape Fear Academy | Wilmington | already in the master |
| asheville-school | Asheville School | Asheville School | Asheville | already in the master |
| cary-christian | Cary Christian | Cary Christian School | Cary | https://carychristianschool.org |
| calvary-day | Calvary Day | Calvary Day School | Winston-Salem | https://www.calvaryday.school. calvarydayschool.com is another school |
| asheville-christian | Asheville Christian | Asheville Christian Academy | Swannanoa | https://www.ashevillechristian.org |
| gaston-christian | Gaston Christian | Gaston Christian School | Gastonia | https://gastonchristian.org |
| st-davids | St. David’s | St. David’s School | Raleigh | https://www.stdavidsraleigh.org |
| coastal-christian | Coastal Christian | Coastal Christian High School | Wilmington | https://coastalchristian.net. coastalchristian.org is a South Carolina school |
| high-point-christian | High Point Christian | High Point Christian Academy | High Point | https://www.hpcacougars.org. hpca.com is a parked domain |
| arendell-parrott | Arendell Parrott | Arendell Parrott Academy | Kinston | https://www.parrottacademy.org |
| southlake-christian | SouthLake Christian | SouthLake Christian Academy | Huntersville | already in the master |
| concord-academy | Concord Academy | Concord Academy | Concord | https://concord.academy. concordacademy.org is the Massachusetts school |

## Davidson Day Wells Fargo Cup results

The ledger already holds these six rows, and every cell matches the published tables.

| Class | Season | Place | Fall | Winter | Spring | Total |
|---|---|---|---|---|---|---|
| 2A | 2020–21 | 9 | 95 | 50 | 37.5 | 182.5 |
| 2A | 2021–22 | 3 | 162.5 | 45 | 152.5 | 360 |
| 2A | 2022–23 | 3 | 110 | 55 | 137.5 | 302.5 |
| 2A | 2023–24 | 1 | 237.5 | 95 | 165 | 497.5 |
| 3A | 2024–25 | 2 | 167.5 | 62.5 | 137.5 | 367.5 |
| 3A | 2025–26 | 8 | 90 | 37.5 | 140 | 267.5 |

## Davidson Day Wells Fargo Cup point sources

Years are calendar years of the event. Only sports with a title or at least two runner-up years are listed, the bar the other schools use.

| Sport | Term | Titles | Runner-up |
|---|---|---|---|
| Girls volleyball | fall | 2023, 2024 | 2021, 2022, 2025 |
| Boys tennis | spring | 2023, 2024, 2025, 2026 | — |
| Girls soccer | spring | 2023, 2024, 2025 | 2022 |
| Boys cross country | fall | 2020, 2021, 2023 | — |
| Boys soccer | fall | 2023, 2024 | — |
| Girls lacrosse | spring | 2022 | 2026 |
| Boys swimming | winter | — | 2022, 2024 |
| Girls cross country | fall | 2023 | — |
| Boys basketball | winter | 2024 | — |
| Girls basketball | winter | 2021 | — |

## Wells Fargo Cup new division rows for the ledger

Every row a school on Davidson Day’s table needs in `CUP_RECORDS` that the ledger does not hold yet: 274 rows, all NCISAA, none an estimate. `T` marks a published tie. Places are copied as published, oddities included. Generated from the parsed tables and checked fall + winter + spring = total, except the one row noted in Method.

| Slug | Class | Season | Place | Fall | Winter | Spring | Total |
|---|---|---|---|---|---|---|---|
| oneal-school | 2A | 2020–21 | 1 | 112.5 | 102.5 | 120 | 335 |
| oneal-school | 2A | 2021–22 | 2 | 110 | 125 | 157.5 | 392.5 |
| oneal-school | 2A | 2022–23 | 1 | 130 | 102.5 | 90 | 322.5 |
| oneal-school | 2A | 2023–24 | 2 | 87.5 | 130 | 155 | 372.5 |
| oneal-school | 2A | 2024–25 | 13 | 0 | 67.5 | 90 | 157.5 |
| oneal-school | 2A | 2025–26 | 20 | 0 | 30 | 25 | 55 |
| wayne-country-day | 2A | 2020–21 | 3 | 87.5 | 120 | 72.5 | 280 |
| wayne-country-day | 2A | 2021–22 | 7 | 102.5 | 90 | 37.5 | 230 |
| wayne-country-day | 2A | 2022–23 | 6 | 62.5 | 107.5 | 37.5 | 207.5 |
| wayne-country-day | 2A | 2023–24 | 9 | 0 | 150 | 50 | 200 |
| wayne-country-day | 2A | 2024–25 | T11 | 0 | 87.5 | 75 | 162.5 |
| wayne-country-day | 2A | 2025–26 | 15 | 0 | 22.5 | 95 | 117.5 |
| trinity-academy | 2A | 2020–21 | 4 | 117.5 | 47.5 | 80 | 245 |
| trinity-academy | 2A | 2021–22 | 6 | 155 | 75 | 45 | 275 |
| trinity-academy | 2A | 2022–23 | 2 | 147.5 | 47.5 | 110 | 305 |
| trinity-academy | 2A | 2023–24 | 3 | 145 | 22.5 | 157.5 | 325 |
| trinity-academy | 3A | 2024–25 | 13 | 67.5 | 22.5 | 60 | 150 |
| trinity-academy | 3A | 2025–26 | 12 | 82.5 | 22.5 | 60 | 165 |
| rocky-mount-academy | 2A | 2020–21 | 5 | 57.5 | 0 | 175 | 232.5 |
| rocky-mount-academy | 2A | 2021–22 | 5 | 112.5 | 22.5 | 170 | 305 |
| rocky-mount-academy | 2A | 2022–23 | 5 | 105 | 22.5 | 135 | 262.5 |
| rocky-mount-academy | 2A | 2023–24 | 5 | 72.5 | 57.5 | 145 | 275 |
| rocky-mount-academy | 2A | 2024–25 | 2 | 112.5 | 70 | 197.5 | 380 |
| rocky-mount-academy | 2A | 2025–26 | 3 | 125 | 65 | 157.5 | 347.5 |
| caldwell-academy | 2A | 2020–21 | 6 | 117.5 | 50 | 95 | 262.5 |
| caldwell-academy | 2A | 2021–22 | 4 | 135 | 97.5 | 85 | 317.5 |
| caldwell-academy | 2A | 2022–23 | 7 | 60 | 72.5 | 62.5 | 195 |
| caldwell-academy | 2A | 2023–24 | 8 | 57.5 | 60 | 85 | 202.5 |
| caldwell-academy | 2A | 2024–25 | 1 | 157.5 | 110 | 157.5 | 425 |
| caldwell-academy | 2A | 2025–26 | 1 | 150 | 152.5 | 180 | 482.5 |
| trinity-durham | 2A | 2020–21 | 7 | 95 | 15 | 92.5 | 202.5 |
| trinity-durham | 2A | 2021–22 | T12 | 22.5 | 30 | 97.5 | 150 |
| trinity-durham | 2A | 2022–23 | 10 | 50 | 45 | 75 | 170 |
| trinity-durham | 2A | 2023–24 | 6 | 70 | 90 | 67.5 | 227.5 |
| trinity-durham | 3A | 2024–25 | 22 | 22.5 | 30 | 22.5 | 75 |
| trinity-durham | 3A | 2025–26 | 16 | 70 | 35 | 22.5 | 127.5 |
| burlington-school | 2A | 2020–21 | 8 | 0 | 95 | 102.5 | 197.5 |
| burlington-school | 2A | 2021–22 | T12 | 0 | 100 | 50 | 150 |
| burlington-school | 2A | 2022–23 | 20 | 0 | 50 | 50 | 100 |
| burlington-school | 2A | 2023–24 | 24 | 0 | 22.5 | 22.5 | 45 |
| burlington-school | 2A | 2024–25 | 14 | 22.5 | 82.5 | 45 | 150 |
| burlington-school | 2A | 2025–26 | T18 | 0 | 60 | 0 | 60 |
| westchester-country-day | 2A | 2020–21 | 10 | 95 | 0 | 87.5 | 182.5 |
| westchester-country-day | 2A | 2021–22 | 9 | 67.5 | 0 | 112.5 | 180 |
| westchester-country-day | 2A | 2022–23 | 22 | 0 | 0 | 85 | 85 |
| westchester-country-day | 2A | 2023–24 | 21 | 22.5 | 20 | 37.5 | 80 |
| westchester-country-day | 2A | 2024–25 | 4 | 120 | 37.5 | 95 | 252.5 |
| westchester-country-day | 2A | 2025–26 | T9 | 77.5 | 40 | 75 | 192.5 |
| burlington-christian | 2A | 2020–21 | 11 | 45 | 0 | 125 | 170 |
| burlington-christian | 2A | 2021–22 | 8 | 75 | 0 | 120 | 195 |
| burlington-christian | 2A | 2022–23 | 14 | 70 | 0 | 75 | 145 |
| burlington-christian | 2A | 2023–24 | 17 | 20 | 37.5 | 45 | 102.5 |
| burlington-christian | 2A | 2024–25 | 3 | 50 | 22.5 | 230 | 302.5 |
| burlington-christian | 2A | 2025–26 | 2 | 107.5 | 0 | 275 | 382.5 |
| university-christian | 2A | 2020–21 | 12 | 60 | 80 | 25 | 165 |
| university-christian | 2A | 2021–22 | 10 | 90 | 60 | 25 | 175 |
| university-christian | 2A | 2022–23 | 16 | 50 | 65 | 0 | 115 |
| university-christian | 2A | 2023–24 | 10 | 82.5 | 62.5 | 25 | 170 |
| university-christian | 2A | 2024–25 | 10 | 50 | 85 | 52.5 | 187.5 |
| university-christian | 2A | 2025–26 | T9 | 30 | 95 | 67.5 | 192.5 |
| harrells-christian | 2A | 2020–21 | 13 | 45 | 0 | 105 | 150 |
| harrells-christian | 2A | 2021–22 | 19 | 45 | 0 | 37.5 | 82.5 |
| harrells-christian | 2A | 2022–23 | 26 | 27.5 | 0 | 37.5 | 65 |
| harrells-christian | 2A | 2023–24 | 25 | 0 | 0 | 22.5 | 22.5 |
| harrells-christian | 2A | 2024–25 | T11 | 60 | 37.5 | 65 | 162.5 |
| harrells-christian | 2A | 2025–26 | 12 | 82.5 | 37.5 | 57.5 | 177.5 |
| st-thomas-more | 2A | 2020–21 | 14 | 60 | 20 | 45 | 125 |
| st-thomas-more | 2A | 2021–22 | 14 | 60 | 42.5 | 37.5 | 140 |
| st-thomas-more | 2A | 2022–23 | 19 | 45 | 60 | 0 | 105 |
| st-thomas-more | 2A | 2023–24 | 23 | 40 | 30 | 0 | 70 |
| st-thomas-more | 2A | 2024–25 | 8 | 115 | 85 | 22.5 | 222.5 |
| st-thomas-more | 2A | 2025–26 | 8 | 135 | 67.5 | 22.5 | 225 |
| fayetteville-academy | 2A | 2020–21 | 15 | 45 | 0 | 60 | 105 |
| fayetteville-academy | 2A | 2021–22 | 11 | 60 | 0 | 100 | 160 |
| fayetteville-academy | 2A | 2022–23 | 11 | 45 | 22.5 | 85 | 152.5 |
| fayetteville-academy | 2A | 2023–24 | 11 | 45 | 37.5 | 87.5 | 170 |
| fayetteville-academy | 2A | 2024–25 | 5 | 60 | 22.5 | 162.5 | 245 |
| fayetteville-academy | 2A | 2025–26 | 7 | 60 | 62.5 | 107.5 | 230 |
| thales-rolesville | 2A | 2020–21 | 16 | 22.5 | 80 | 0 | 102.5 |
| thales-rolesville | 2A | 2021–22 | T16 | 0 | 60 | 45 | 105 |
| thales-rolesville | 3A | 2022–23 | 20 | 0 | 0 | 22.5 | 22.5 |
| thales-rolesville | 3A | 2023–24 | 20 | 0 | 0 | 22.5 | 22.5 |
| thales-rolesville | 3A | 2025–26 | 26 | 0 | 0 | 0 | 0 |
| thales-apex | 2A | 2020–21 | 21 | 80 | 0 | 0 | 80 |
| thales-apex | 3A | 2022–23 | 19 | 22.5 | 0 | 22.5 | 45 |
| thales-apex | 3A | 2023–24 | 20 | 22.5 | 0 | 0 | 22.5 |
| thales-apex | 3A | 2024–25 | 24 | 20 | 0 | 0 | 20 |
| thales-apex | 3A | 2025–26 | 25 | 20 | 0 | 0 | 20 |
| trinity-christian | 2A | 2020–21 | 17 | 37.5 | 60 | 0 | 97.5 |
| trinity-christian | 2A | 2021–22 | T28 | 0 | 0 | 15 | 15 |
| trinity-christian | 2A | 2022–23 | 23 | 37.5 | 45 | 0 | 82.5 |
| trinity-christian | 2A | 2023–24 | 19 | 45 | 45 | 0 | 90 |
| trinity-christian | 2A | 2024–25 | 18 | 45 | 60 | 0 | 105 |
| trinity-christian | 2A | 2025–26 | T18 | 37.5 | 22.5 | 0 | 60 |
| john-paul-ii | 2A | 2020–21 | 18 | 67.5 | 0 | 22.5 | 90 |
| john-paul-ii | 2A | 2021–22 | 20 | 45 | 0 | 22.5 | 67.5 |
| john-paul-ii | 3A | 2022–23 | 15 | 45 | 37.5 | 72.5 | 155 |
| john-paul-ii | 3A | 2023–24 | 16 | 22.5 | 22.5 | 95 | 140 |
| john-paul-ii | 3A | 2024–25 | 14 | 67.5 | 22.5 | 57.5 | 147.5 |
| john-paul-ii | 3A | 2025–26 | T21 | 60 | 0 | 22.5 | 82.5 |
| westminster-catawba | 2A | 2020–21 | 19 | 0 | 37.5 | 50 | 87.5 |
| westminster-catawba | 2A | 2021–22 | T22 | 0 | 22.5 | 0 | 45 |
| westminster-catawba | 2A | 2022–23 | T31 | 0 | 0 | 0 | 0 |
| westminster-catawba | 2A | 2024–25 | 19 | 75 | 22.5 | 0 | 97.5 |
| westminster-catawba | 2A | 2025–26 | 13 | 92.5 | 0 | 67.5 | 160 |
| northwood-temple | 2A | 2020–21 | 20 | 37.5 | 45 | 0 | 82.5 |
| northwood-temple | 2A | 2021–22 | T27 | 0 | 22.5 | 0 | 22.5 |
| northwood-temple | 2A | 2022–23 | T31 | 0 | 0 | 0 | 0 |
| northwood-temple | 2A | 2023–24 | 25 | 22.5 | 0 | 0 | 22.5 |
| northwood-temple | 2A | 2024–25 | T22 | 22.5 | 0 | 0 | 22.5 |
| northwood-temple | 2A | 2025–26 | 22 | 0 | 22.5 | 0 | 22.5 |
| friendship-christian | 2A | 2020–21 | 22 | 42.5 | 0 | 37.5 | 80 |
| friendship-christian | 2A | 2021–22 | T28 | 15 | 0 | 0 | 15 |
| friendship-christian | 2A | 2022–23 | 27 | 55 | 0 | 0 | 55 |
| friendship-christian | 1A | 2024–25 | 17 | 42.5 | 0 | 22.5 | 65 |
| friendship-christian | 1A | 2025–26 | 17 | 22.5 | 0 | 50 | 72.5 |
| freedom-christian | 2A | 2020–21 | 23 | 37.5 | 0 | 37.5 | 75 |
| freedom-christian | 2A | 2021–22 | T16 | 22.5 | 22.5 | 60 | 105 |
| freedom-christian | 2A | 2022–23 | 21 | 22.5 | 0 | 67.5 | 90 |
| freedom-christian | 2A | 2023–24 | 18 | 0 | 22.5 | 72.5 | 95 |
| freedom-christian | 2A | 2024–25 | T16 | 0 | 37.5 | 90 | 127.5 |
| freedom-christian | 2A | 2025–26 | 17 | 0 | 37.5 | 37.5 | 75 |
| hickory-christian | 2A | 2020–21 | 24 | 22.5 | 0 | 50 | 72.5 |
| hickory-christian | 2A | 2021–22 | 18 | 0 | 0 | 95 | 95 |
| hickory-christian | 2A | 2022–23 | 18 | 45 | 0 | 65 | 110 |
| hickory-christian | 2A | 2023–24 | 13 | 102.5 | 0 | 40 | 142.5 |
| hickory-christian | 2A | 2024–25 | 6 | 122.5 | 0 | 117.5 | 240 |
| hickory-christian | 2A | 2025–26 | 14 | 60 | 25 | 45 | 130 |
| wayne-christian | 2A | 2020–21 | 25 | 0 | 22.5 | 45 | 67.5 |
| wayne-christian | 2A | 2021–22 | 15 | 50 | 37.5 | 50 | 137.5 |
| wayne-christian | 2A | 2022–23 | 25 | 22.5 | 0 | 50 | 72.5 |
| wayne-christian | 2A | 2023–24 | 14 | 67.5 | 22.5 | 45 | 135 |
| wayne-christian | 3A | 2024–25 | 21 | 57.5 | 0 | 22.5 | 80 |
| wayne-christian | 3A | 2025–26 | 23 | 45 | 0 | 22.5 | 67.5 |
| faith-christian | 2A | 2020–21 | 26 | 22.5 | 20 | 22.5 | 65 |
| faith-christian | 2A | 2021–22 | 25 | 0 | 15 | 22.5 | 37.5 |
| faith-christian | 2A | 2022–23 | T12 | 60 | 20 | 70 | 150 |
| faith-christian | 2A | 2023–24 | 20 | 37.5 | 0 | 45 | 82.5 |
| faith-christian | 2A | 2024–25 | T16 | 45 | 0 | 82.5 | 127.5 |
| faith-christian | 2A | 2025–26 | 5 | 80 | 37.5 | 125 | 242.5 |
| northside-christian | 2A | 2020–21 | 27 | 0 | 22.5 | 30 | 52.5 |
| northside-christian | 2A | 2021–22 | T22 | 0 | 22.5 | 35 | 57.5 |
| northside-christian | 1A | 2022–23 | 10 | 0 | 100 | 30 | 130 |
| northside-christian | 1A | 2023–24 | 13 | 0 | 87.5 | 0 | 87.5 |
| village-christian | 2A | 2020–21 | 28 | 0 | 22.5 | 22.5 | 45 |
| village-christian | 2A | 2021–22 | 26 | 0 | 0 | 30 | 30 |
| village-christian | 2A | 2022–23 | 28 | 0 | 0 | 35 | 35 |
| village-christian | 2A | 2023–24 | 22 | 22.5 | 0 | 52.5 | 75 |
| village-christian | 2A | 2024–25 | 20 | 22.5 | 0 | 72.5 | 95 |
| village-christian | 2A | 2025–26 | 16 | 45 | 15 | 47.5 | 107.5 |
| epiphany-school | 2A | 2020–21 | 29 | 0 | 40 | 0 | 40 |
| epiphany-school | 2A | 2021–22 | 21 | 22.5 | 40 | 0 | 62.5 |
| epiphany-school | 2A | 2022–23 | 17 | 37.5 | 75 | 0 | 112.5 |
| epiphany-school | 2A | 2023–24 | 16 | 22.5 | 45 | 40 | 107.5 |
| epiphany-school | 2A | 2024–25 | 9 | 90 | 87.5 | 37.5 | 215 |
| epiphany-school | 2A | 2025–26 | 4 | 100 | 95 | 60 | 255 |
| carolina-friends | 2A | 2020–21 | 30 | 0 | 0 | 37.5 | 37.5 |
| carolina-friends | 2A | 2021–22 | T27 | 0 | 0 | 22.5 | 22.5 |
| carolina-friends | 2A | 2022–23 | 24 | 37.5 | 0 | 37.5 | 75 |
| carolina-friends | 2A | 2023–24 | 27 | 0 | 5 | 0 | 5 |
| carolina-friends | 2A | 2024–25 | T22 | 22.5 | 0 | 0 | 22.5 |
| carolina-friends | 2A | 2025–26 | 21 | 47.5 | 0 | 0 | 47.5 |
| salem-baptist | 2A | 2020–21 | 31 | 0 | 0 | 22.5 | 22.5 |
| salem-baptist | 2A | 2022–23 | T31 | 0 | 0 | 0 | 0 |
| statesville-christian | 2A | 2021–22 | 24 | 22.5 | 22.5 | 0 | 45 |
| statesville-christian | 2A | 2022–23 | 30 | 0 | 22.5 | 0 | 22.5 |
| statesville-christian | 1A | 2024–25 | 9 | 90 | 22.5 | 22.5 | 135 |
| statesville-christian | 1A | 2025–26 | T5 | 112.5 | 0 | 60 | 172.5 |
| neuse-christian | 2A | 2021–22 | T27 | 22.5 | 0 | 0 | 22.5 |
| neuse-christian | 2A | 2022–23 | 29 | 0 | 0 | 25 | 25 |
| neuse-christian | 1A | 2024–25 | 14 | 60 | 0 | 25 | 85 |
| neuse-christian | 1A | 2025–26 | 19 | 45 | 0 | 22.5 | 67.5 |
| carolina-day | 3A | 2020–21 | 15 | 87.5 | 0 | 50 | 137.5 |
| carolina-day | 3A | 2021–22 | 17 | 65 | 0 | 15 | 80 |
| carolina-day | 2A | 2022–23 | 8 | 72.5 | 0 | 112.5 | 185 |
| carolina-day | 2A | 2023–24 | 7 | 120 | 0 | 90 | 210 |
| carolina-day | 3A | 2024–25 | 19 | 0 | 0 | 92.5 | 92.5 |
| carolina-day | 3A | 2025–26 | T21 | 45 | 0 | 37.5 | 82.5 |
| grace-christian-sanford | 1A | 2020–21 | 3 | 137.5 | 45 | 82.5 | 265 |
| grace-christian-sanford | 1A | 2021–22 | 1 | 162.5 | 87.5 | 142.5 | 392.5 |
| grace-christian-sanford | 2A | 2022–23 | 9 | 20 | 50 | 107.5 | 177.5 |
| grace-christian-sanford | 3A | 2023–24 | 12 | 22.5 | 50 | 125 | 197.5 |
| grace-christian-sanford | 3A | 2024–25 | 11 | 57.5 | 50 | 87.5 | 195 |
| grace-christian-sanford | 3A | 2025–26 | 13 | 0 | 72.5 | 87.5 | 160 |
| grace-christian-raleigh | 3A | 2020–21 | 14 | 65 | 45 | 37.5 | 147.5 |
| grace-christian-raleigh | 3A | 2021–22 | 16 | 60 | 35 | 17.5 | 112.5 |
| grace-christian-raleigh | 3A | 2022–23 | 17 | 37.5 | 40 | 37.5 | 115 |
| grace-christian-raleigh | 3A | 2023–24 | 10 | 110 | 57.5 | 52.5 | 220 |
| grace-christian-raleigh | 3A | 2024–25 | 9 | 87.5 | 62.5 | 62.5 | 212.5 |
| grace-christian-raleigh | 3A | 2025–26 | 6 | 122.5 | 0 | 185 | 307.5 |
| greenfield-school | 1A | 2020–21 | 1 | 150 | 60 | 125 | 335 |
| greenfield-school | 1A | 2021–22 | 2 | 167.5 | 82.5 | 67.5 | 317.5 |
| greenfield-school | 2A | 2022–23 | T12 | 45 | 82.5 | 22.5 | 150 |
| greenfield-school | 2A | 2023–24 | 15 | 0 | 45 | 75 | 120 |
| greenfield-school | 2A | 2024–25 | 15 | 37.5 | 45 | 60 | 142.5 |
| greenfield-school | 2A | 2025–26 | 11 | 37.5 | 107.5 | 45 | 190 |
| fayetteville-christian | 3A | 2020–21 | 13 | 75 | 0 | 77.5 | 152.5 |
| fayetteville-christian | 3A | 2021–22 | 15 | 22.5 | 22.5 | 87.5 | 132.5 |
| fayetteville-christian | 2A | 2022–23 | 15 | 62.5 | 22.5 | 50 | 135 |
| fayetteville-christian | 2A | 2023–24 | 12 | 57.5 | 0 | 97.5 | 155 |
| fayetteville-christian | 3A | 2024–25 | 23 | 35 | 0 | 0 | 35 |
| fayetteville-christian | 3A | 2025–26 | 24 | 22.5 | 0 | 0 | 22.5 |
| cape-fear-academy | 3A | 2020–21 | 5 | 167.5 | 97.5 | 130 | 395 |
| cape-fear-academy | 3A | 2021–22 | 2 | 177.5 | 117.5 | 230 | 525 |
| cape-fear-academy | 3A | 2022–23 | 3 | 165 | 67.5 | 207.5 | 440 |
| cape-fear-academy | 3A | 2023–24 | 2 | 162.5 | 47.5 | 197.5 | 407.5 |
| cape-fear-academy | 3A | 2024–25 | 3 | 140 | 22.5 | 185 | 347.5 |
| cape-fear-academy | 3A | 2025–26 | 1 | 170 | 57.5 | 222.5 | 450 |
| asheville-school | 3A | 2020–21 | 4 | 147.5 | 90 | 165 | 402.5 |
| asheville-school | 3A | 2021–22 | 4 | 140 | 117.5 | 215 | 472.5 |
| asheville-school | 3A | 2022–23 | 5 | 145 | 137.5 | 75 | 357.5 |
| asheville-school | 3A | 2023–24 | 4 | 130 | 117.5 | 137.5 | 385 |
| asheville-school | 3A | 2024–25 | 4 | 72.5 | 132.5 | 140 | 345 |
| asheville-school | 3A | 2025–26 | 3 | 117.5 | 127.5 | 160 | 405 |
| cary-christian | 3A | 2020–21 | 2 | 180 | 110 | 200 | 490 |
| cary-christian | 3A | 2021–22 | 3 | 175 | 97.5 | 210 | 482.5 |
| cary-christian | 3A | 2022–23 | 6 | 195 | 75 | 75 | 345 |
| cary-christian | 3A | 2023–24 | 6 | 157.5 | 65 | 72.5 | 295 |
| cary-christian | 3A | 2024–25 | 5 | 150 | 95 | 60 | 305 |
| cary-christian | 3A | 2025–26 | 4 | 167.5 | 142.5 | 57.5 | 367.5 |
| calvary-day | 3A | 2020–21 | 12 | 72.5 | 35 | 45 | 152.5 |
| calvary-day | 3A | 2021–22 | 12 | 22.5 | 57.5 | 67.5 | 147.5 |
| calvary-day | 3A | 2022–23 | 14 | 90 | 37.5 | 37.5 | 165 |
| calvary-day | 3A | 2023–24 | 9 | 132.5 | 87.5 | 22.5 | 242.5 |
| calvary-day | 3A | 2024–25 | 6 | 145 | 40 | 110 | 295 |
| calvary-day | 3A | 2025–26 | 7 | 85 | 87.5 | 110 | 282.5 |
| asheville-christian | 3A | 2020–21 | 3 | 115 | 165 | 137.5 | 417.5 |
| asheville-christian | 3A | 2021–22 | 6 | 102.5 | 110 | 135 | 347.5 |
| asheville-christian | 3A | 2022–23 | 4 | 112.5 | 102.5 | 195 | 410 |
| asheville-christian | 3A | 2023–24 | 3 | 177.5 | 65 | 155 | 397.5 |
| asheville-christian | 3A | 2024–25 | T7 | 82.5 | 75 | 105 | 262.5 |
| asheville-christian | 3A | 2025–26 | 11 | 37.5 | 62.5 | 110 | 210 |
| gaston-christian | 3A | 2020–21 | 10 | 72.5 | 45 | 85 | 202.5 |
| gaston-christian | 3A | 2021–22 | T13 | 45 | 0 | 100 | 145 |
| gaston-christian | 3A | 2022–23 | 16 | 0 | 37.5 | 107.5 | 145 |
| gaston-christian | 3A | 2023–24 | 10 | 35 | 45 | 140 | 220 |
| gaston-christian | 3A | 2024–25 | T7 | 70 | 87.5 | 105 | 262.5 |
| gaston-christian | 3A | 2025–26 | 5 | 105 | 115 | 132.5 | 352.5 |
| st-davids | 3A | 2020–21 | 8 | 75 | 47.5 | 132.5 | 255 |
| st-davids | 3A | 2021–22 | T9 | 60 | 52.5 | 95 | 207.5 |
| st-davids | 3A | 2022–23 | 12 | 45 | 30 | 102.5 | 177.5 |
| st-davids | 3A | 2023–24 | 13 | 67.5 | 22.5 | 100 | 190 |
| st-davids | 3A | 2024–25 | 8 | 82.5 | 22.5 | 115 | 220 |
| st-davids | 3A | 2025–26 | 20 | 25 | 15 | 62.5 | 102.5 |
| coastal-christian | 3A | 2020–21 | 9 | 130 | 0 | 112.5 | 242.5 |
| coastal-christian | 3A | 2021–22 | 5 | 207.5 | 0 | 162.5 | 370 |
| coastal-christian | 3A | 2022–23 | 7 | 125 | 0 | 122.5 | 247.5 |
| coastal-christian | 3A | 2023–24 | 8 | 125 | 0 | 132.5 | 257.5 |
| coastal-christian | 3A | 2024–25 | 10 | 107.5 | 0 | 102.5 | 210 |
| coastal-christian | 3A | 2025–26 | 10 | 195 | 0 | 67.5 | 262.5 |
| high-point-christian | 3A | 2020–21 | 6 | 60 | 75 | 162.5 | 297.5 |
| high-point-christian | 3A | 2021–22 | 8 | 37.5 | 120 | 125 | 282.5 |
| high-point-christian | 3A | 2022–23 | 11 | 37.5 | 67.5 | 95 | 200 |
| high-point-christian | 3A | 2023–24 | 7 | 60 | 82.5 | 127.5 | 270 |
| high-point-christian | 3A | 2024–25 | 15 | 37.5 | 22.5 | 72.5 | 132.5 |
| high-point-christian | 3A | 2025–26 | 14 | 50 | 0 | 95 | 145 |
| arendell-parrott | 3A | 2020–21 | 7 | 72.5 | 72.5 | 140 | 285 |
| arendell-parrott | 3A | 2021–22 | 7 | 135 | 22.5 | 172.5 | 330 |
| arendell-parrott | 3A | 2022–23 | 9 | 110 | 22.5 | 97.5 | 230 |
| arendell-parrott | 3A | 2023–24 | 19 | 82.5 | 0 | 22.5 | 105 |
| arendell-parrott | 3A | 2024–25 | 16 | 90 | 0 | 37.5 | 127.5 |
| arendell-parrott | 3A | 2025–26 | 15 | 95 | 0 | 42.5 | 137.5 |
| southlake-christian | 3A | 2020–21 | 17 | 22.5 | 45 | 60 | 127.5 |
| southlake-christian | 3A | 2021–22 | 11 | 37.5 | 22.5 | 105 | 165 |
| southlake-christian | 3A | 2022–23 | 18 | 0 | 0 | 80 | 80 |
| southlake-christian | 3A | 2023–24 | 18 | 0 | 35 | 85 | 120 |
| southlake-christian | 3A | 2024–25 | 17 | 22.5 | 35 | 60 | 117.5 |
| southlake-christian | 3A | 2025–26 | 19 | 25 | 0 | 82.5 | 107.5 |
| concord-academy | 3A | 2020–21 | 11 | 63.75 | 72.5 | 60 | 196.25 |
| concord-academy | 3A | 2021–22 | T9 | 75 | 87.5 | 45 | 207.5 |
| concord-academy | 3A | 2022–23 | 13 | 37.5 | 95 | 37.5 | 170 |
| concord-academy | 3A | 2023–24 | 17 | 37.5 | 75 | 22.5 | 135 |
| concord-academy | 3A | 2024–25 | 20 | 0 | 90 | 0 | 90 |
| concord-academy | 3A | 2025–26 | 17 | 0 | 115 | 0 | 115 |

## Wells Fargo Cup schools listed without a place

Listed on the published tables with a blank place and 0 points. These stay out of the ledger, so a table cell shows an em dash: the ledger has no way to hold a place that was never published. Cristo Rey Research Triangle has no placed row at all, so it is the one listed school not on the card.

| School | Class | Season |
|---|---|---|
| Salem Baptist Christian School | 2A | 2021–22 |
| Thales Academy - Apex | 2A | 2021–22 |
| Friendship Christian School | 2A | 2023–24 |
| Neuse Christian Academy | 2A | 2023–24 |
| Salem Baptist Christian School | 2A | 2023–24 |
| Statesville Christian School | 2A | 2023–24 |
| Westminster Catawba Christian School | 2A | 2023–24 |
| Salem Baptist | 2A | 2024–25 |
| Cristo Rey Research Triangle High School | 3A | 2024–25 |
| Thales Academy - Rolesville | 3A | 2024–25 |
| Salem Baptist | 2A | 2025–26 |
