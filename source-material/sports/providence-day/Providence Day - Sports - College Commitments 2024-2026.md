# Providence Day School — Sports — College Commitments (2024–2026)

> **Provenance:** Rebuilt by Claude Code on 2026-11-08 by the `/athlete-commits` graduate
> refresh (the first version, 2026-07-04, transcribed the school's list and a signing-day
> roundup without checking a single college roster). This file is the hard data behind the
> College Pipeline card in `src/data/sportsPrograms/providence-day.ts` and the
> `p4-commits-2426` / `d1-commits-2426` Compare rows in `src/data/metricValues.ts`.
> The method, the sport-by-sport sweep, the nulls and the unchecked rosters are in
> `Providence Day - Sports - Varsity Roster Cross-Reference 2026.md`.
>
> **Source of record** is the school's own "Alumni at the Next Level" list
> (https://www.pdschargers.com/more/honors-hall-of-fame-wells-fargo-cup/, read 2026-11-08):
> 86 names for the classes of 2024–2026 (25 / 30 / 31). **Every Power 4 and Division I row
> (39) was then confirmed on the college's own roster or bio page**, which also supplies the
> graduate-test evidence ("High School / Last School: Providence Day"). Division II and III
> rows (47) rest on the school's list alone and were not individually checked.
> Level and conference labels are researcher-added from each college's NCAA status —
> **Power 4 = SEC / Big Ten / ACC / Big 12 only.** Notre Dame would count as ACC.
>
> **Net result of the refresh: no athlete was added or removed from the window.** The
> sweep of every varsity roster against every commitment database found nothing the
> school's list does not already carry. Five corrections to existing rows are below.

## Corrections to the card (2026-11-08)

| # | Row | Was | Is | Evidence |
|---|---|---|---|---|
| 1 | '24 Girls Tennis → Kenyon | **Brandon** Ackermann | **Elizabeth** Ackermann | Kenyon women's tennis roster (Fr. 2024-25, Jr. 2026-27, "Providence Day School") https://athletics.kenyon.edu/sports/womens-tennis/roster/2024-25 ; MaxPreps PD girls tennis 23-24 Sr. The school's list carries the misprint. |
| 2 | '25 Swimming → Georgia | **Clark** Neace | **Clarke** Neace | Georgia roster bio https://georgiadogs.com/sports/swimming-and-diving/roster/clarke-neace/9992 ; SwimSwam; MaxPreps PD girls swimming 23-24 ("Clarke Neace", 3 of 3). The school's list has "Clark". |
| 3 | Shaurya Bharadwaj → Pennsylvania | Class of **2025** | Class of **2024** | School's list "'24"; MaxPreps PD boys tennis 23-24 Sr.; Penn roster Jr. in 2026-27 https://pennathletics.com/sports/mens-tennis/roster . Moves one D1 row from '25 to '24; totals unchanged. |
| 4 | Zach Makemson → Tennessee (SEC, P4) | Tennessee | **Appalachian State** (Sun Belt, D1) — recommended; see below | App State bio: Sophomore 2025-26, "High School: Providence Day School", first season 2024-25 https://appstatesports.com/sports/mens-track-and-field/roster/zach-makemson/10553 ; TFRRS profile is under Appalachian State from Jan 2025 with no Tennessee season https://www.tfrrs.org/athletes/8919438/Appalachian_State/Zach_Makemson.html . Tennessee rests on the school's list and a self-submitted MileSplit commitment entry (added 2023-07-01) https://aut.milesplit.com/signings/48809 — no Tennessee roster or signing release names him. |
| 5 | Card arithmetic | funnel "~72"; Football bar 15; note "ACC 8" | **86**; **14**; **ACC 9** | Counted from the card's own 86 rows: 39 D1 = Football 14 + Swimming 4 + Girls Soccer 4 + Track/XC 4 + Basketball 4 + Boys Lacrosse 3 + Field Hockey 2 + Other 4. The 17 P4 split ACC 9 (SMU is ACC) · Big Ten 4 · SEC 4. |

**On Makemson.** The card's rule is "the college committed to out of the school, with the
move in a `rosterNote` sentence" — but every precedent (Baker ECU→WCU, Galloway UNC→Clemson,
Thompson and Davis below) is a player who enrolled at the first college and transferred.
No published page puts Makemson at Tennessee; App State's own page puts him there for
2024-25. The recommendation is to list **Appalachian State**, keep the Tennessee verbal in
the `rosterNote` ("listed by the school as a Tennessee commit; enrolled at Appalachian
State"), and move `p4-commits-2426` **17 → 16**. The alternative — keep Tennessee on the
school's word — leaves the P4 row resting on one source that the college's page
contradicts. This is the one judgment call the plan should put to the user.

## Transfers (for `rosterNote`; the card keeps the college committed to)

| Athlete | Card shows | Now at | Evidence |
|---|---|---|---|
| Trajan Thompson ('25, Boys Basketball) | Denver | West Florida (D2) | goargos.com roster, R-Fr., previous school "University of Denver" |
| Jadyn Davis ('24, Football) | Michigan | East Tennessee State | etsubucs.com roster, R-So., "Providence Day School / Michigan" |
| Chase Jackson ('24, Baseball) | Gardner-Webb | Claflin (D2) | https://athletics.claflin.edu/sports/baseball/roster/chase-jackson/2545 — "Prev School: Gardner-Webb", "graduate of Providence Day School" |
| Zach Makemson ('24, Track) | Tennessee → see correction 4 | Appalachian State | as above |

## Ruled out

| Lead | Source of the lead | Why it does not count |
|---|---|---|
| **Jaida McGrew → Florida State (ACC) soccer** | HighSchoolOT girls soccer tracker and TopDrawerSoccer both file her under Providence Day; Charlotte Observer (May 2024) says she transferred to PD for spring 2024 and enrolled at FSU in January 2025 | **Fails the graduate test.** FSU's own bio: Hometown Stanley, N.C., **High School: Mountain Island Charter School**. The college lists another school as her high school. |
| Zach Villegas → Amherst track | Amherst roster | Sr. in 2025-26 → Class of 2022, outside the window |
| Eliza Cardwell → Amherst | Amherst roster | Class of 2021 |
| Addy Holgorsen → Clemson soccer | Clemson roster | Class of 2022 |
| Riley Allenspach, Trey Horton | HSOT trackers | Class of 2023 |
| Keely Bradle → Charlotte 49ers | tracker hit on "Providence" | Providence High School (CMS), not Providence Day |

## Tracker claims resolved in the card's favour

| Athlete | Tracker said | College's roster says | URL |
|---|---|---|---|
| Blane McElroy ('25) | NC State (HSOT); Purdue (Gatorade) | **Princeton**, Fr. | https://goprincetontigers.com/sports/womens-soccer/roster |
| Nia Poole ('24) | Penn State | **NC State**, Jr. | https://gopack.com/sports/womens-track-and-field/roster |
| Carter Martin ('26) | North Carolina | **Jacksonville**, Fr. LSM | https://judolphins.com/sports/mens-lacrosse/roster |

## Power 4 commitments (2024–2026) — 17 on the school's list; 16 if Makemson moves

| Class | Athlete | Sport | College | Conf. | Confirmed on |
|---|---|---|---|---|---|
| 2026 | Gordon Sellars | Football | Clemson | ACC | https://clemsontigers.com/sports/football/roster/ |
| 2026 | Zaid Lott | Football | Syracuse | ACC | https://cuse.com/sports/football/roster |
| 2026 | Leo Delaney | Football | Clemson | ACC | https://clemsontigers.com/sports/football/roster/ |
| 2026 | Jacob Baggett | Football | Michigan | Big Ten | https://mgoblue.com/sports/football/roster |
| 2026 | Abby Goldean | Girls Soccer | Southern Methodist | ACC | https://smumustangs.com/sports/womens-soccer/roster |
| 2026 | Zetta Grace Bartee | Swimming | Auburn | SEC | https://auburntigers.com/sports/swimming-and-diving/roster |
| 2025 | David Sanders Jr. | Football | Tennessee | SEC | https://utsports.com/sports/football/roster |
| 2025 | Cairo Skanes | Football | Wisconsin | Big Ten | https://uwbadgers.com/sports/football/roster |
| 2025 | Braxton Winston | Football | Wake Forest | ACC | https://godeacs.com/sports/football/roster |
| 2025 | Granger Bartee | Swimming | North Carolina | ACC | https://goheels.com/sports/swimming-and-diving/roster/granger-bartee/27896 (So. 2026-27, "Providence Day") |
| 2025 | Clarke Neace | Swimming | Georgia | SEC | https://georgiadogs.com/sports/swimming-and-diving/roster/clarke-neace/9992 (So. 2026-27, "Providence Day School") |
| 2024 | Brody Barnhardt | Football | NC State | ACC | https://gopack.com/sports/football/roster |
| 2024 | Jordan Shipp | Football | North Carolina | ACC | https://goheels.com/sports/football/roster |
| 2024 | Channing Goodwin | Football | Michigan | Big Ten | https://mgoblue.com/sports/football/roster |
| 2024 | Jadyn Davis | Football | Michigan | Big Ten | ETSU roster ("Providence Day School / Michigan") https://etsubucs.com/sports/football/roster — transfer |
| 2024 | Nia Poole | Track & Field | NC State | ACC | https://gopack.com/sports/womens-track-and-field/roster |
| 2024 | Zach Makemson | Track & Field | Tennessee → **Appalachian State** (recommended) | SEC → Sun Belt | see correction 4 |

## Other Division I commitments (2024–2026) — 22

| Class | Athlete | Sport | College | Conf. | Confirmed on |
|---|---|---|---|---|---|
| 2026 | Quintin McCray | Football | Richmond | CAA | https://richmondspiders.com/sports/football/roster |
| 2026 | Brendan Ravin | Football | Davidson | Pioneer | https://davidsonwildcats.com/sports/football/roster |
| 2026 | Jaida McClure | Girls Basketball | Appalachian State | Sun Belt | https://appstatesports.com/sports/womens-basketball/roster |
| 2026 | Tina Garofoli | Field Hockey | Miami (Ohio) | MAC | https://miamiredhawks.com/sports/field-hockey/roster |
| 2026 | Devin McElroy | Girls Soccer | Miami (Ohio) | MAC | https://miamiredhawks.com/sports/womens-soccer/roster |
| 2026 | Chloe Scofield | Golf | Presbyterian | Big South | https://gobluehose.com/sports/womens-golf/roster |
| 2026 | Carter Martin | Boys Lacrosse | Jacksonville | ASUN | https://judolphins.com/sports/mens-lacrosse/roster |
| 2025 | Ian Cline | Football | Army – West Point | AAC | https://goarmywestpoint.com/sports/football/roster/2025 (Fr. RB) |
| 2025 | Trajan Thompson | Boys Basketball | Denver | Summit | West Florida roster, previous school Denver (transfer) https://goargos.com/sports/mens-basketball/roster |
| 2025 | Julian Johnson | Boys Basketball | Howard | MEAC | https://hubison.com/sports/mens-basketball/roster |
| 2025 | Ellie Fyans | Girls Basketball | Western Carolina | Southern | https://catamountsports.com/sports/womens-basketball/roster (So.) |
| 2025 | Blane McElroy | Girls Soccer | Princeton | Ivy | https://goprincetontigers.com/sports/womens-soccer/roster |
| 2025 | Aiden Ray | Track & Field | Northeastern | CAA | https://nuhuskies.com/sports/mens-track-and-field/roster |
| 2025 | Mikayla Moore | Volleyball | Tennessee State | OVC | https://tsutigers.com/sports/womens-volleyball/roster/2025 (Fr., Waxhaw NC, Providence Day) |
| 2024 | Shaurya Bharadwaj | Boys Tennis | Pennsylvania | Ivy | https://pennathletics.com/sports/mens-tennis/roster (Jr. 2026-27) — class corrected from 2025 |
| 2024 | Chase Jackson | Baseball | Gardner-Webb | Big South | Claflin roster, "Prev School: Gardner-Webb" (transfer) https://athletics.claflin.edu/sports/baseball/roster/chase-jackson/2545 ; Gardner-Webb's own roster pages are client-rendered and could not be read by curl |
| 2024 | Morgan Boonshaft | Girls Cross Country | Brown | Ivy | https://brownbears.com/sports/womens-track-and-field/roster/2024-25 (Fr., Waxhaw NC, Providence Day School) |
| 2024 | Elle Louise Kocmond | Field Hockey | UC Davis | Big West | https://ucdavisaggies.com/sports/field-hockey/roster |
| 2024 | Kyle Van Dam | Boys Lacrosse | Colgate | Patriot | https://colgateathletics.com/sports/mens-lacrosse/roster/kyle-van-dam/23848 (Jr., "Previous Team: Providence Day School"; the gocolgateraiders.com domain no longer answers) |
| 2024 | Alex Jessey | Boys Lacrosse | Dartmouth | Ivy | https://dartmouthsports.com/sports/mens-lacrosse/roster |
| 2024 | KK Hart | Girls Soccer | Tulsa | American | https://tulsahurricane.com/sports/womens-soccer/roster/2025 — listed as **Kaleigh Hart**, So., "Last School Providence Day School (N.C.)"; MaxPreps PD rosters use both "Kk Hart" and "Kaleigh Hart". Card keeps KK, the school's list spelling. |
| 2024 | Davis Dunham | Swimming | Georgetown | Big East | https://guhoyas.com/sports/mens-swimming-and-diving/roster |

## Division II and III commitments (2024–2026) — 47, from the school's list only

| Class | Athlete | Sport | College | Conf. | Level |
|---|---|---|---|---|---|
| 2026 | Matthew Hankins | Football | Wingate | SAC | D2 |
| 2026 | DC Carr | Football | Wingate | SAC | D2 |
| 2026 | Osvaldo "Deuce" Haynes | Boys Basketball | Morehouse | SIAC | D2 |
| 2026 | Austen Graziano | Volleyball | Belmont Abbey | Conf. Carolinas | D2 |
| 2026 | Thomas Daly | Baseball | Denison | NCAC | D3 |
| 2026 | Aidan Scruitsky | Boys Basketball | Hampden-Sydney | ODAC | D3 |
| 2026 | Katelyn Ramsden | Girls Basketball | Chicago | UAA | D3 |
| 2026 | Julia O'Malley | Girls Basketball | Johns Hopkins | Centennial | D3 |
| 2026 | Mark Franco | Football | Denison | NCAC | D3 |
| 2026 | Will Wagner | Football | Denison | NCAC | D3 |
| 2026 | Aidan Gallos | Football | Tufts | NESCAC | D3 |
| 2026 | William McDermott | Boys Lacrosse | Stevenson | MAC Commonwealth | D3 |
| 2026 | Bridget Brewster | Girls Lacrosse | Hamilton | NESCAC | D3 |
| 2026 | Ethan He | Boys Soccer | MIT | NEWMAC | D3 |
| 2026 | Mikaela Arey | Girls Soccer | Emory | UAA | D3 |
| 2026 | Rachel Lyons | Softball | Kenyon | NCAC | D3 |
| 2026 | Evelyn Hee | Track & Field | Emory | UAA | D3 |
| 2026 | Raj Das | Track & Field | Emory | UAA | D3 |
| 2025 | Jaylen Himes | Football | Wingate | SAC | D2 |
| 2025 | Jonah Lawrence | Boys Basketball | USC – Aiken | Peach Belt | D2 |
| 2025 | Austin Nelson | Baseball | Rhodes | SAA | D3 |
| 2025 | Davis Dudley | Football | Hampden-Sydney | ODAC | D3 |
| 2025 | Jack Langston | Football | Kenyon | NCAC | D3 |
| 2025 | Jason Zawtocki | Golf | Tufts | NESCAC | D3 |
| 2025 | Scott Thompson | Boys Lacrosse | Hampden-Sydney | ODAC | D3 |
| 2025 | Harry O'Neil | Boys Lacrosse | Ithaca | Liberty | D3 |
| 2025 | Marlo Stuart | Girls Lacrosse | Tufts | NESCAC | D3 |
| 2025 | Lucy Dyer | Girls Lacrosse | Colby | NESCAC | D3 |
| 2025 | Owen Yu | Boys Soccer | New York University | UAA | D3 |
| 2025 | Ethan Andrews | Boys Soccer | Vassar | Liberty | D3 |
| 2025 | Will Chase | Boys Soccer | Dean College | — | D3 |
| 2025 | Emma Grace Sachar | Swimming | Hamilton | NESCAC | D3 |
| 2025 | Tejus Ranadive | Boys Tennis | Hobart & William Smith | Liberty | D3 |
| 2025 | Renat Kramin | Boys Tennis | Stevens Inst. of Tech. | MAC Freedom | D3 |
| 2025 | Austin Skeete | Track & Field | Rochester | Liberty | D3 |
| 2024 | Kashe Smith | Track & Field | Wingate | SAC | D2 |
| 2024 | Jordan Appling | Boys Basketball | Johnson & Wales | GNAC | D3 |
| 2024 | Sophie Levine | Girls Basketball | Franklin & Marshall | Centennial | D3 |
| 2024 | Sophie Powell | Girls Cross Country | Emory | UAA | D3 |
| 2024 | Reese Ziegler | Field Hockey | Connecticut College | NESCAC | D3 |
| 2024 | Gracie Kaspar | Field Hockey | Washington & Lee | ODAC | D3 |
| 2024 | Kenna White | Field Hockey | Hamilton | NESCAC | D3 |
| 2024 | Lukas "Thor" Santwier | Football | Hampden-Sydney | ODAC | D3 |
| 2024 | George Hinton | Golf | Bates | NESCAC | D3 |
| 2024 | Liam Hedinger | Boys Soccer | Gettysburg | Centennial | D3 |
| 2024 | Joe Henry Teates | Track & Field | Denison | NCAC | D3 |
| 2024 | Elizabeth Ackermann | Girls Tennis | Kenyon | NCAC | D3 — name corrected; the only D3 row checked on a college roster |

## Totals

| | Class of 2024 | Class of 2025 | Class of 2026 | Window |
|---|---|---|---|---|
| All levels | 26 | 29 | 31 | **86** |
| Division I (incl. P4) | 14 | 12 | 13 | **39** |
| Power 4 (school's list) | 6 | 5 | 6 | **17** |
| Power 4 (Makemson at App State) | 5 | 5 | 6 | **16** |

After correction 3 the per-class D1 split is 14 / 12 / 13 and the class sizes 26 / 29 / 31 (the card read 13 / 13 / 13 and 25 / 30 / 31 with Bharadwaj in '25). Corrected 2026-11-08 at `/implement`: the first draft of this table carried the pre-move split.

**App metric values:** `d1-commits-2426` = **39** (unchanged) · `p4-commits-2426` = **17** on the
school's list, **16** recommended · `seniors-committed` = **10** (unchanged; see the Class of
2027 file).
