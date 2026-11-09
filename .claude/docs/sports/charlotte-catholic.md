# Charlotte Catholic High School — Sports
> Distilled from 6 source document(s) in `source-material/sports/charlotte-catholic/`. Auto-extracted full text, lightly cleaned. Rebuilt 2026-11-09.
**Documents:** 247Sports Recruiting Rankings, College Commitments 2024-2026, College Commitments Class of 2027, Program Championships and College Commitments, Varsity Roster Cross-Reference 2026, Wells Fargo Cup Standings 2020-2026


---

## 247Sports Recruiting Rankings

*Source file: `Charlotte Catholic - Sports - 247Sports Recruiting Rankings.md`*

# Charlotte Catholic — Sports — 247Sports Recruiting Rankings

**Provenance.** Captured 2026-10-26 during `/plan recruitranks` by fetching 247Sports' public
North Carolina state recruiting lists (HTTP GET, no login; each list page carries national,
position and state rank, stars, composite score, listed high school and commitment per row).
Every football and basketball athlete on this school's College Pipeline roster
(`src/data/sportsPrograms/charlotte-catholic.ts`, `pipeline.roster`) was matched by normalised name
(suffixes Jr./III dropped, punctuation stripped) AND graduating class, then accepted only if
247's listed high school is this school. **The app shows the 247Sports Composite** (user
decision 2026-10-26); the 247Sports in-house figures are recorded alongside for audit only.
Classes 2024–2026 are final (all signed and enrolled), so these ranks no longer move.

"NA" national rank = 247 publishes a state rank but no national rank for that player.
Sports other than football and basketball are not ranked by 247Sports and are out of scope.

## Recruiting rankings — matched athletes (247Sports Composite)

| Class | Athlete | Sport | Pos | Stars | Composite score | Composite national | Composite NC state | Composite position | 247 in-house national | 247 in-house NC state | 247 listed school | 247 profile |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026 | Dominic Basrawala | Football | DL | 3 | 0.8300 | NA | 82 | 281 | NA | 71 | Charlotte Catholic (Charlotte, NC) | https://247sports.com/player/dominic-basrawala-46150298/ |
| 2025 | Charlie Smith | Football | QB | 3 | 0.8200 | NA | 66 | not recorded | not recorded | not recorded | Charlotte Catholic (Charlotte, NC) | https://247sports.com/player/charlie-smith-46147891/ |
| 2024 | Jack Larsen | Football | TE | 3 | 0.8900 | 481 | 15 | not recorded | not recorded | not recorded | Charlotte Catholic (Charlotte, NC) | https://247sports.com/player/jack-larsen-46117223/ |
| 2024 | Nick Segarra | Football | TE | 3 | 0.8336 | NA | 52 | not recorded | not recorded | not recorded | Charlotte Catholic (Charlotte, NC) | https://247sports.com/player/nick-segarra-46135129/ |

Larsen, Segarra and Smith were moved here from the reverse-sweep list on 2026-11-08 (plan
`catholiccommits`), once the `/athlete-commits` refresh confirmed each on his college's roster
(Notre Dame, Ohio, Harvard) and added him to the card. Their Composite figures are the ones
the reverse sweep recorded; the position and in-house columns were not captured then.

## Recruiting rankings — not on a 247Sports NC list (unrated)

Searched by name across the NC lists for 2023–2027 (football, basketball, women's basketball).
Absence means 247 published no rating for the player (typical for walk-ons, D2/D3 commits and
girls' basketball, where 247 ranks only 0–2 NC players per class); the app shows a dash.

- 2024 Gracynn Gough — Basketball → College of the Holy Cross (D1)
- 2024 Blanca Thomas — Basketball → North Carolina (P4)
- 2025 Chris Eagan — Basketball → American University (D1)
- 2026 Carter Garnett — Football → Johns Hopkins University (D3)
- 2026 Lukas Lupinski — Football → Columbia University (D1)
- 2026 Caden O’Neill — Football → Furman University (D1)
- 2026 Keanen Teeter — Football → Lenoir-Rhyne University (D2)

## Recruiting rankings — ranked at this school but NOT on our roster

Reverse sweep, classes 2024–2026, Composite lists: 247 lists these players at this school, but
no roster row exists. Leads for a future roster backfill only, NOT shown by this plan; a
247 commit is not proof of enrollment, so confirm against the school's own signing coverage first.

None outstanding. The three players this sweep found (Larsen, Segarra, Smith) were confirmed and
moved to the matched table on 2026-11-08.

## Recruiting rankings — list sources

Composite (shown in the app) and 247Sports in-house lists, NC, high-school institution group:

- https://247sports.com/season/<year>-football/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-womens-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-football/recruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-womens-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)


---

## College Commitments 2024-2026

*Source file: `Charlotte Catholic - Sports - College Commitments 2024-2026.md`*

# Charlotte Catholic High School — Sports — College Commitments (2024–2026)

> **Provenance:** Compiled by Claude Code on 2026-11-08 (`/athlete-commits`, plan
> `catholiccommits`) by **rebuilding** the 35-athlete table first compiled on
> 2026-08-18 (`… - Sports - Program Championships and College Commitments.md`, which read
> three signing articles) with a roster cross-reference: every varsity roster on MaxPreps for
> 2022-23 through 2026-27, each senior checked against the HighSchoolOT per-sport recruiting
> trackers, the Charlotte Observer's football signing lists, RealGM, LaxNumbers, Prep Baseball
> Report and the college's own roster or signing release. Method, nulls and unchecked gaps are
> in `Charlotte Catholic - Sports - Varsity Roster Cross-Reference 2026.md`.
>
> This is the designated provenance file for the *Power 4 commits* (`p4-commits-2426`) and
> *Division I commits* (`d1-commits-2426`) Compare rows (`src/data/metricValues.ts`) and for
> the College Pipeline card (`src/data/sportsPrograms/charlotte-catholic.ts`). Level
> classification is by hand: **Power 4 = SEC / Big Ten / ACC / Big 12** only; Notre Dame
> counts as ACC on this card. Counts are distinct athletes and a documented minimum.
>
> **Why the 2026-08-18 table was short by 19.** Its three sources were the November 2023
> ceremony (Catholic News Herald), the November 2024 Observer roundup and the February 2026
> ceremony. **Football signs in December and February, and CCHS holds a separate spring
> signing day**, so the Class of 2024 and 2025 football signings and every 2026 baseball
> signing were missing. Six football players and seven baseball players account for 13 of the
> 19 additions.
>
> **Standard applied:** the card counts documented commitments to college athletics at any
> level. D2 and D3 placements count. "Scholarship" is never claimed.
>
> **Graduate test:** an athlete counts only if they finished high school at Charlotte
> Catholic. Every new row below is confirmed by a college roster whose *Last School / High
> School* line reads Charlotte Catholic, or by the college's own signing release naming the
> school, and each athlete's class was checked against the MaxPreps senior season.
>
> **Second-source rule unchanged:** a recruiting database or tracker alone is a lead. A
> commitment that is missing from the college's roster for the season the athlete should have
> joined is excluded (the Farley precedent) — see *Excluded*.

## Sources

### School-side and press
- Catholic News Herald, 8 Nov 2023 — 15 CCHS student-athletes commit (Class of 2024, November ceremony):
 https://catholicnewsherald.com/94-news/schools/9839-15-cchs-student-athletes-commit-to-college-sports
- Charlotte Observer via Yahoo, Nov 2024 — National Signing Day roundup (Class of 2025):
 https://sports.yahoo.com/national-signing-day-where-charlotte-111500239.html
- Catholic News Herald, 4 Feb 2026 — College Signing Day (Class of 2026, February ceremony):
 https://catholicnewsherald.com/94-news/schools/12397-college-signing-day-big-dreams-bigger-futures
- **Charlotte Observer via Yahoo, 20 Dec 2023** — early football signing list
 ("CHARLOTTE CATHOLIC: Jack Larsen, football, Notre Dame; Nick Segarra, football, Ohio University"):
 https://ca.news.yahoo.com/national-signing-day-where-observer-104500782.html
- **Charlotte Observer via Yahoo, 4 Dec 2024** — early football signing list
 ("CHARLOTTE CATHOLIC: Charlie Smith, Harvard; Jack Baade, Harvard; Nick Bierman, Lafayette; Conor Clendenin, Ithaca"):
 https://sports.yahoo.com/articles/where-charlotte-area-football-players-113000707.html

### Trackers and databases (leads, never sole confirmation)
- HighSchoolOT recruiting-tracker hub (17 per-sport trackers, read 2026-11-08):
 https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/
 — Charlotte Catholic hits in baseball (21296816), boys XC/track (21296824), boys golf
 (21296828), boys lacrosse (21296821), girls basketball (21206037), girls lacrosse
 (21296823), girls swimming & diving (21296813), girls tennis (21296829).
- HighSchoolOT — Class of 2024 / 2025 / 2026 NC players committed to out-of-state programs
 (football): https://www.highschoolot.com/story/these-class-of-2024-north-carolina-players-are-committed-to-out-of-state-programs/21196024/ ·
 https://www.highschoolot.com/story/these-class-of-2025-north-carolina-players-are-committed-to-out-of-state-programs/21261590/ ·
 https://www.highschoolot.com/story/these-class-of-2026-north-carolina-players-are-committed-to-out-of-state-division-i-schools/21559634/
- HighSchoolOT — Building the Fence, Class of 2026 in-state football commits:
 https://www.highschoolot.com/story/building-the-fence-class-of-2026-in-state-football-commits/21497032/
- NC Football News — 2026 NC high school football college commits:
 https://ncfootballnews.com/2026-north-carolina-high-school-football-college-commits/
 (the 2024 and 2025 slugs return "Page not found"). Read from raw HTML — see the
 fabricated-attribution warning in the 2026-08-18 dossier.
- RealGM — Charlotte Catholic High School players (read in Chrome 2026-11-08):
 https://basketball.realgm.com/highschool/teams/2034/Charlotte-Catholic-High-School-NC
- LaxNumbers — Charlotte Catholic boys recruits, team id 12753 (read in Chrome, y=2024…2028):
 https://laxnumbers.com/team_info.php?y=2025&t=12753&s=2
- Prep Baseball Report — 2026 HS Preview: Region 6 (Bordeaux, Marconi, Gornet):
 https://www.prepbaseball.com/news/NC/2026-hs-preview--region-6
- Prep Baseball Report — Cooper Gornet: https://www.prepbaseball.com/profiles/NC/Cooper-Gornet-1783940652
- Prep Baseball Report — Brady Marconi: https://www.prepbaseball.com/profiles/NC/Brady--Marconi-0253861947-7912384605
- Prep Baseball Report — Jon Fijalkowski: https://www.prepbaseball.com/profiles/NC/Jon-Fijalkowski-4085932761
- The Baseball Cube — Charlotte Catholic alumni (Will O'Rourke → Lenoir-Rhyne):
 https://www.thebaseballcube.com/content/hs_team/10370/
- 247Sports Composite ranks for Larsen, Segarra and Smith: see
 `Charlotte Catholic - Sports - 247Sports Recruiting Rankings.md` (reverse sweep, 2026-10-26).

### College rosters and releases (the confirmations)
- Notre Dame football roster (Jack Larsen, TE, "High School Charlotte Catholic"): https://fightingirish.com/sports/football/roster/
- Ohio football rosters 2024 and 2025 (Nick Segarra, TE, "Last School Charlotte Catholic"):
 https://ohiobobcats.com/sports/football/roster/2024 · https://ohiobobcats.com/sports/football/roster/2025
- South Carolina track & field — Logan Hill (Distance, "High school Charlotte Catholic"):
 https://gamecocksonline.com/sports/track/roster/player/logan-hill/
- West Virginia swimming & diving — Logan Leckner ("High School: Charlotte Catholic High School"):
 https://wvusports.com/sports/mswim/roster/logan-leckner/18229
- Southern Wesleyan baseball 2025 roster (Brody Roderick, RHP, Fr., "Charlotte Catholic HS"):
 https://swuathletics.com/sports/baseball/roster/2025
- Navy football roster (Roman Hyland, P, So., "Belmont, N.C. / Charlotte Catholic"): https://navysports.com/sports/football/roster
- Harvard football roster (Charlie Smith, DB, So.; Jack Baade, LS, So., "Charlotte Catholic (N.C.)"):
 https://gocrimson.com/sports/football/roster
- Lafayette football roster (Nick Bierman, WR, So., "Marvin, N.C. / Charlotte Catholic"): https://goleopards.com/sports/football/roster
- Hamilton women's basketball roster (Maggie Kernodle, '29, "Charlotte Catholic HS"):
 https://athletics.hamilton.edu/sports/womens-basketball/roster
- Clarion baseball — Jon Fijalkowski (OF/RHP, Fr. 2026, "Charlotte, N.C. / Charlotte Catholic"):
 https://clariongoldeneagles.com/sports/baseball/roster/jon-fijalkowski/11219
- Lenoir-Rhyne baseball roster (Will O'Rourke, RHP, Fr., "Charlotte Catholic HS"): https://lrbears.com/sports/baseball/roster
- Queens men's swimming & diving roster (Luciano Salas, So., "Last School Charlotte Catholic"):
 https://queensathletics.com/sports/mens-swimming-and-diving/roster
- Arizona baseball, 12 Nov 2025 — "Arizona Baseball Unveils 15-Man 2026 Signing Class" (Quinn O'Rourke, Charlotte Catholic):
 https://arizonawildcats.com/news/2025/11/12/arizona-baseball-unveils-15-man-2026-signing-class.aspx
- NC State baseball roster (Cooper Gornet, INF, Fr., "Last School Charlotte Catholic"): https://gopack.com/sports/baseball/roster
- College of Charleston baseball roster (Brady Marconi, C/INF, Fr., "Fort Mill, S.C. / Charlotte Catholic"):
 https://cofcsports.com/sports/baseball/roster
- Queens baseball roster (Ben Bordeaux, RHP, Fr., "Charlotte Catholic High School"): https://queensathletics.com/sports/baseball/roster
- College of Charleston women's soccer — Mary Martin Spinner (F, Fr., "High School: Charlotte Catholic"):
 https://cofcsports.com/sports/womens-soccer/roster/mary-martin-spinner/8485
- Mars Hill men's basketball 2026-27 roster (Jack Siegel, G, Fr., "Charlotte, N.C. / Charlotte Catholic"):
 https://marshilllions.com/sports/mbkb/2026-27/roster
- Duke baseball roster (Hedrick corroboration, unchanged): https://goduke.com/sports/baseball/roster

## Class of 2024 — 20 athletes (8 Power 4, 17 Division I)

| Athlete | Sport | College | Conf. | Level | Confirmed by |
|---|---|---|---|---|---|
| Jack Larsen | Football (TE) | Notre Dame | ACC | **P4** | **NEW.** Notre Dame roster; Observer 20 Dec 2023; HighSchoolOT out-of-state 2024; 247 Composite NC #15 / national 481 |
| Logan Hill | Track & XC (800m/1600m) | South Carolina | SEC | **P4** | **NEW.** Gamecocks profile (school records in the 800m and 1000m); HighSchoolOT boys XC/track tracker |
| Logan Leckner | Swimming | West Virginia | Big 12 | **P4** | **NEW.** WVU profile (2024-25 Academic All-Big 12 Rookie Team); HighSchoolOT girls swimming tracker; Observer 2023-24 swimming preview (senior) |
| Evan MacIntyre | Baseball | Indiana University | Big Ten | **P4** | CNH Nov 2023; HighSchoolOT baseball tracker |
| Lauren Bernardo | Swim & dive | Louisiana State University | SEC | **P4** | CNH Nov 2023; HighSchoolOT |
| Blanca Thomas | Basketball | North Carolina | ACC | **P4** | CNH Nov 2023; HighSchoolOT |
| Kate Daniels | Lacrosse | University of Louisville | ACC | **P4** | CNH Nov 2023; HighSchoolOT |
| Jack Hedrick | Baseball | Duke University | ACC | **P4** | CNH Nov 2023; Duke roster |
| Nick Segarra | Football (TE) | Ohio University | MAC | D1 | **NEW.** Ohio rosters 2024, 2025; Observer 20 Dec 2023; HighSchoolOT; 247 Composite NC #52 |
| Jack Ransom | Lacrosse | Georgetown University | Big East | D1 | CNH; HighSchoolOT; LaxNumbers |
| Mark McMahon | Lacrosse | St. Bonaventure University | Atlantic 10 | D1 | CNH; HighSchoolOT; LaxNumbers |
| John McKillop | Baseball | West Point | Patriot | D1 | CNH; HighSchoolOT |
| Colin Mendicino | Lacrosse | Towson University | CAA | D1 | CNH; HighSchoolOT; LaxNumbers |
| Mason Child | Baseball | UNC Wilmington | CAA | D1 | CNH; HighSchoolOT |
| Gracynn Gough | Basketball | College of the Holy Cross | Patriot | D1 | CNH; HighSchoolOT |
| Natalie Dominguez | Softball | Yale University | Ivy | D1 | CNH |
| Abby Druhan | Swim & dive | University of Pennsylvania | Ivy | D1 | CNH; HighSchoolOT |
| Brody Roderick | Baseball (RHP) | Southern Wesleyan University | Conference Carolinas | D2 | **NEW.** Southern Wesleyan 2025 roster; HighSchoolOT baseball tracker |
| Charlotte Bergman | Tennis | Belmont Abbey College | Conference Carolinas | D2 | CNH; HighSchoolOT |
| Molly Haskell | Field hockey | Sewanee | SAA | D3 | CNH |

## Class of 2025 — 19 athletes (4 Power 4, 13 Division I)

| Athlete | Sport | College | Conf. | Level | Confirmed by |
|---|---|---|---|---|---|
| Madison Baumgratz | Lacrosse | Virginia Tech | ACC | **P4** | Observer Nov 2024; HighSchoolOT |
| Will Guthrie | Golf | University of Georgia | SEC | **P4** | Observer; HighSchoolOT |
| Will Hartman | Golf | Vanderbilt University | SEC | **P4** | Observer; HighSchoolOT |
| Matt McKnight | Baseball | North Carolina | ACC | **P4** | Observer; HighSchoolOT |
| Roman Hyland | Football (P) | Navy | American | D1 | **NEW.** Navy roster; HighSchoolOT out-of-state 2025 |
| Charlie Smith | Football (QB/DB) | Harvard | Ivy | D1 | **NEW.** Harvard roster; Observer 4 Dec 2024; HighSchoolOT; 247 Composite NC #66 |
| Jack Baade | Football (LS) | Harvard | Ivy | D1 | **NEW.** Harvard roster ("Charlotte Catholic (N.C.)", hometown Fort Mill, S.C.); Observer 4 Dec 2024 |
| Nick Bierman | Football (WR) | Lafayette College | Patriot | D1 | **NEW.** Lafayette roster; Observer 4 Dec 2024 |
| Luciano Salas | Swimming | Queens University of Charlotte | ASUN | D1 | **NEW.** Queens roster (So. 2026-27, last school Charlotte Catholic); conference confirmed 2026-11-08 on Queens' own release, "Queens men crowned champions, Royals collect major ASUN honors" (https://queensathletics.com/news/2026/2/22/mens-swimming-diving-queens-men-crowned-champions-royals-collect-major-asun-honors-on-final-day.aspx); MaxPreps 2023-24 boys swimming roster lists him as a junior ("Diegoluciano Salas") |
| Chris Eagan | Basketball | American University | Patriot | D1 | Observer; RealGM |
| Giovanni Delissio | Lacrosse | University of Detroit Mercy | Horizon | D1 | Observer; HighSchoolOT; LaxNumbers |
| Cannon Ridinger | Lacrosse | Providence College | Big East | D1 | Observer; LaxNumbers |
| Max Sovie | Lacrosse | Mercer University | SoCon | D1 | Observer; LaxNumbers |
| Jon Fijalkowski | Baseball (OF/RHP) | Clarion University | PSAC | D2 | **NEW.** Clarion roster profile (2026 PSAC West Athlete of the Week); PBR profile |
| Will O'Rourke | Baseball (RHP) | Lenoir-Rhyne University | South Atlantic | D2 | **NEW.** Lenoir-Rhyne roster; The Baseball Cube; MaxPreps 2024-25 senior |
| Maggie Kernodle | Basketball | Hamilton College | NESCAC | D3 | **NEW.** Hamilton roster ('29); HighSchoolOT girls basketball tracker |
| Luke Colwell | Lacrosse | Randolph-Macon College | ODAC | D3 | Observer; LaxNumbers |
| Brooks Griffith | Lacrosse | University of Lynchburg | ODAC | D3 | Observer |
| Brendan Leonard | Lacrosse | Salisbury University | Coast-To-Coast | D3 | Observer; HighSchoolOT; LaxNumbers |

## Class of 2026 — 15 athletes (3 Power 4, 9 Division I)

| Athlete | Sport | College | Conf. | Level | Confirmed by |
|---|---|---|---|---|---|
| Quinn O'Rourke | Baseball (RHP) | University of Arizona | Big 12 | **P4** | **NEW.** Arizona's own 2026 signing-class release (12 Nov 2025); PBR; Perfect Game |
| Cooper Gornet | Baseball (INF) | NC State | ACC | **P4** | **NEW.** NC State roster (Fr.); PBR 2026 Region 6 preview |
| Alex Hoffman | Baseball | Virginia Tech | ACC | **P4** | Reverse college-roster lookup (2026-08-18); HighSchoolOT baseball tracker |
| Brady Marconi | Baseball (C/INF) | College of Charleston | CAA | D1 | **NEW.** CofC roster (Fr.); PBR ("CofC signee") |
| Ben Bordeaux | Baseball (RHP) | Queens University of Charlotte | ASUN | D1 | **NEW.** Queens roster (Fr.); PBR |
| Mary Martin Spinner | Soccer (F) | College of Charleston | CAA | D1 | **NEW.** CofC roster profile (Fr.; two-year varsity captain at CCHS) |
| Dominic Basrawala | Football | Air Force Academy | Mountain West | D1 | CNH Feb 2026; NC Football News (decommitted from Army 2025-06-23); 247 Composite NC #82 |
| Lukas Lupinski | Football | Columbia University | Ivy | D1 | CNH Feb 2026; HighSchoolOT; NC Football News |
| Caden O'Neill | Football | Furman University | SoCon | D1 | CNH Feb 2026; NC Football News |
| Jack Siegel | Basketball (G) | Mars Hill University | South Atlantic | D2 | **NEW.** Mars Hill 2026-27 roster (Fr.); RealGM |
| Keanen Teeter | Football | Lenoir-Rhyne University | South Atlantic | D2 | CNH Feb 2026; HighSchoolOT Building the Fence; NC Football News |
| Zach Deblitz | Soccer | Hampden-Sydney College | ODAC | D3 | CNH Feb 2026 |
| Carter Garnett | Football | Johns Hopkins University | Centennial | D3 | CNH Feb 2026 |
| Margueritte McPhillips | Soccer | Connecticut College | NESCAC | D3 | CNH Feb 2026 |
| Duncan Smith | Cross country / track | Washington and Lee University | ODAC | D3 | CNH Feb 2026 |

## Totals → app metric values

| Metric | Before (2026-08-18) | After (2026-11-08) |
|---|---|---|
| Documented commits, Classes 2024–2026 | 35 | **54** |
| Division I (`d1-commits-2426`, includes P4) | 25 | **39** |
| Power 4 (`p4-commits-2426`) | 10 | **15** |

| Sport (card label) | Before | After |
|---|---|---|
| Baseball | 6 | **13** |
| Football | 5 | **11** |
| Lacrosse | 11 | 11 |
| Basketball | 3 | **5** |
| Swim & dive | 2 | **4** |
| Soccer | 2 | **3** |
| Golf | 2 | 2 |
| Cross country / track | 1 | **2** |
| Softball | 1 | 1 |
| Tennis | 1 | 1 |
| Field hockey | 1 | 1 |

Power 4 by name (15): Larsen (Notre Dame), Hill (South Carolina), Leckner (West Virginia),
MacIntyre (Indiana), Bernardo (LSU), Thomas (UNC), Daniels (Louisville), Hedrick (Duke),
Baumgratz (Virginia Tech), Guthrie (Georgia), Hartman (Vanderbilt), McKnight (UNC),
Q. O'Rourke (Arizona), Gornet (NC State), Hoffman (Virginia Tech).

The 2026 class is no longer the obvious undercount the August note described (baseball now
has seven 2026 rows, and CCHS's November 2025 signings surfaced through the colleges' own
pages). It is still a floor: girls lacrosse, the 2026 state champion, has no documented
commitment in any of its three senior classes beyond Daniels, Farley and Baumgratz, and no
source enumerates that team's signings.

## Class of 2027 — verbal appendix (not counted)

Unchanged from `Charlotte Catholic - Sports - College Commitments Class of 2027.md`: 5
confirmed (Hedley, Hucko, McKain, Hertzig, Drensek). LaxNumbers adds two single-source leads
(Jason Leonard → Air Force; James Pawlowski → Denison), recorded in that file.

## Excluded

- **Mary Catherine Farley** (2024, girls lacrosse → Wofford) — on the CNH signing list and the
 HighSchoolOT tracker, never on Wofford's 2025 or current roster. Excluded, as in August.
- **Audrey Pardue** (2025, swimming → Georgetown) — SwimSwam verbal, HighSchoolOT tracker and
 the Observer 2023-24 swimming preview ("junior … Georgetown commit"); **not on Georgetown's
 2025-26 roster**, the season she was due to join. Reads as a decommit until the college says
 otherwise. (MaxPreps 2023-24 lists her as Sr.; every other source says Class of 2025.)
- **Conor Clendenin** (2025, football → Ithaca) — named in the Observer's 4 Dec 2024 list;
 absent from Ithaca's 2024, 2025 and current rosters. One source, no roster: excluded.
- **Paul Greeley** (2026, baseball → Sewanee) — a PBR 2025 scout-day listing only; not on
 Sewanee's roster. Lead.
- **Conor Walsh** (Harvard football, Senior 2026-27, "Charlotte Catholic") — Class of 2023,
 outside the window.
- **Julia Menkhaus** (UVA swimming) and **Joey Ruller** (Queens baseball) — Charlotte Catholic
 alumni on college pages, earlier classes; outside the window.


---

## College Commitments Class of 2027

*Source file: `Charlotte Catholic - Sports - College Commitments Class of 2027.md`*

# Charlotte Catholic — Sports — College Commitments, Class of 2027 (current seniors)

> **Provenance:** Seeded by Claude Code on 2026-11-08 while planning `seniorsrow`. The
> **per-class retention file** the `/athlete-commits` skill keeps for the current senior
> class — every public commitment, verbal or signed, any level, with sources. It is the value
> of the `seniors-committed` Compare row and is promoted into the 2024–26 window file when the
> window rolls after graduation (from 1 June 2027). **Never delete it.**
>
> **Status (2026-11-08, `/implement seniorsrow`): 5 confirmed, 4 leads.** Lacrosse from
> Team 91 Charlotte and the National Lacrosse Federation; baseball from Prep Baseball Report
> and Perfect Game / TigerNet; swimming from the Charlotte Observer preview and SwimSwam /
> Swimming World; soccer from TopDrawerSoccer's editorial roundup. The school's named signing
> article (Catholic News Herald, each November) is not up yet for this class.
>
> Verbal commitments are listed, never counted in `p4-commits-2426` / `d1-commits-2426`.

## Sources
- NC Football News — 2027 North Carolina commitment tracker (last updated 2026-11-03):
 https://ncfootballnews.com/2027-north-carolina-high-school-football-college-commits/
- 247Sports — 2027 North Carolina football rankings: no Charlotte Catholic player on the
 68-player page (read 2026-11-08):
 https://247sports.com/season/2027-football/recruitrankings/?InstitutionGroup=HighSchool&State=NC

## Confirmed — 5 (3 Power 4)
| Athlete | Sport | College | Conf. | Level | Confirmed by |
|---|---|---|---|---|---|
| James Hedley | Lacrosse (faceoff) | North Carolina | ACC | **P4** | Team 91 Charlotte "The Scoop — The Commitments" 2026-01-14 https://team91charlotte.substack.com/p/the-scoop-the-commitments ; National Lacrosse Federation player page (four-star, No. 40 at commitment) https://nationallacrossefederation.com/player/james-hedley/ ; SportsRecruits profile |
| John Hucko | Baseball (OF) | Auburn | SEC | **P4** | Prep Baseball Report 2027 rankings and 2026 scout blog ("Auburn commit") https://www.prepbaseballreport.com/rankings/NC/North-Carolina-class-of-2027 ; Perfect Game Auburn commitments list https://www.perfectgame.org/college/CollegeCommitments.aspx?college=1566 |
| Griffin McKain | Baseball (LHP) | Clemson | ACC | **P4** | Prep Baseball Report 2027 rankings; TigerNet 2027 Clemson baseball commitments https://www.tigernet.com/2027-clemson-baseball-commitments ; Rubbing the Rock (Perfect Game 9.5 grade) |
| Madi Hertzig | Swimming (100 fly, 200 free) | Yale | Ivy | D1 | Charlotte Observer swimming preview 2026-11-03 ("Yale commit"); SwimSwam https://swimswam.com/nc-high-school-6a-state-champ-madi-hertzig-chooses-yale-2027/ ; Swimming World |
| Emmett Drensek | Soccer (F) — Team 91 lists him as a lacrosse midfielder; both say Bucknell | Bucknell | Patriot | D1 | TopDrawerSoccer recruiting roundup Dec. 8–14, 2025 ("committed to Bucknell (m)") https://www.topdrawersoccer.com/club-soccer-articles/recruiting-roundup:-december-8-14_aid55451 ; Team 91 Charlotte 2026-01-14. **Sport discrepancy recorded**: the card follows the editorial soccer roundup; confirm the sport on Bucknell's 2027 roster |

## Leads — one source only, not rows
| Athlete | Sport | College | Source |
|---|---|---|---|
| Aidan Flynn | Football (K) | Columbia (Ivy, D1) | NC Football News (tracker and roundup — one publisher) |
| Will Johnson | Football (OL) | Davidson (Pioneer, D1 FCS) | NC Football News only |
| Ellie Druhan | Swimming | Vanderbilt (SEC, P4) | Charlotte Observer swimming preview only |
| Reagan Leckner | Diving | West Virginia (Big 12, P4) | Charlotte Observer swimming preview only |
| Jason Leonard | Lacrosse (M); also on the 2026-27 football roster | Air Force (Patriot, D1) | LaxNumbers boys recruits, team 12753, y=2027 (read 2026-11-08) only |
| James Pawlowski | Lacrosse (M) | Denison (NCAC, D3) | LaxNumbers boys recruits, team 12753, y=2027 only |

**Update 2026-11-08 (`/athlete-commits`, plan `catholiccommits`):** LaxNumbers
(https://laxnumbers.com/team_info.php?y=2027&t=12753&s=2) also lists Hedley (North Carolina)
and Drensek (Bucknell), corroborating both confirmed rows. Leonard and Pawlowski are new
single-source leads. The confirmed count is unchanged at **5**.

The 2027 class could reach 9 with 5 Power 4 once these confirm — check the Catholic News
Herald signing article in November and SwimSwam.

## Totals for the `seniors-committed` row (as of 2026-11-08)
**5 confirmed** (value `'5'`): 3 Power 4, 2 other Division I. Four leads pending.


---

## Program Championships and College Commitments

*Source file: `Charlotte Catholic - Sports - Program Championships and College Commitments.md`*

# Charlotte Catholic High School — Sports (Program, Championships and College Commitments)

**Provenance**

- **Compiled by:** Claude Code deep research pass (`/implement add-charlotte-catholic`).
- **Date compiled:** 2026-08-18
- **Method:** Championship and program figures transcribed from the official **School
 Profile 2025-2026** PDF (`pdftotext -layout`). College-commitment rosters were
 **table-parsed from the named articles below and cross-checked name by name** — see the
 fabricated-source warning, which is the single most important methodological note in this
 file. State-championship results for 2026 confirmed against HighSchoolOT match reports.
- **School:** Charlotte Catholic High School, grades 9–12, ~1,171 students.
- **⚠️ Governing body — NCHSAA, not NCISAA.** CCHS is a private school competing in North
 Carolina's **public** state association, currently **Division 6A, Southern Carolina Split
 6A/7A Conference**. Every other school on this app's roster is NCISAA, so championship
 counts, conference records and win-loss ledgers here come from a **different governing
 body** and are not directly comparable.
- **CCHS is one of only four parochial schools competing in the NCHSAA** (per the school
 profile).

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://resources.finalsite.net/images/v1756128027/charlottecatholicorg/f5yfsecttu3cgmmtsh3f/CCHSSchoolProfile25-26FinalforOnline.pdf | **School Profile 2025-2026** — 74 state championships since 2000, 65 state runner-up finishes, 8 Wachovia/Wells Fargo Cups, NCHSAA 6A conference, 1000+ collegiate student-athletes |
| S2 | https://catholicnewsherald.com/94-news/schools/9839-15-cchs-student-athletes-commit-to-college-sports | **Catholic News Herald, 8 November 2023** — the **Class of 2024** signing ceremony, 15 athletes named with sport and college |
| S3 | https://sports.yahoo.com/national-signing-day-where-charlotte-111500239.html | **Charlotte Observer** national-signing-day roundup (Nov 2024) — the **Class of 2025**, under a literal `CHARLOTTE CATHOLIC:` heading |
| S4 | https://catholicnewsherald.com/94-news/schools/12397-college-signing-day-big-dreams-bigger-futures | **Catholic News Herald, 4 February 2026** — the **Class of 2026** February ceremony, 8 athletes named |
| S5 | https://goduke.com/sports/baseball/roster | Duke baseball roster — independent corroboration of Jack Hedrick |
| S6 | https://www.highschoolot.com/story/nchsaa-6a-girls-soccer-championship-2026-charlotte-catholic-jacksonville/22362945/ | 2026 NCHSAA 6A girls soccer championship — CCHS d. Jacksonville 1-0, undefeated season |
| S7 | https://www.highschoolot.com/story/leonards-goal-gives-charlotte-catholic-a-1a-6a-boys-lacrosse-title-over-middle-creek/22363031/ | 2026 NCHSAA 1A-6A boys lacrosse championship — CCHS d. Middle Creek 9-8 (OT) |
| S8 | https://www.highschoolot.com/story/tan-s-ot-goal-lifts-charlotte-catholic-1a-6a-title-over-east-chapel-hill/22362987/ | 2026 NCHSAA 1A-6A girls lacrosse championship — CCHS d. East Chapel Hill 9-8 (OT) |
| S9 | https://www.maxpreps.com/nc/charlotte/charlotte-catholic-cougars/football/ | Football program page — 2025 season record |

## ⚠️ A source that FABRICATES school attributions — read before trusting any commit figure

The **NCFootballNews 2026 commitment tracker**, when read through page summarization,
returns roughly **18 "Charlotte Catholic" commits**. Parsing its raw HTML shows only about
**4 distinct athletes** genuinely attributed to CCHS. The remainder belong to
**Providence Day** and **Charlotte Christian** — *both already in this app*. Two of them,
**Leo Delaney (Clemson)** and **Zaid Lott (Syracuse)**, are live in the repo as Providence
Day athletes. Trusting that source would have inflated CCHS with ~14 athletes taken from
two existing schools while making those schools' data look duplicated.

**Rule applied throughout this file: every commit figure is table-parsed from raw article
text and attributed to a named athlete. Nothing here comes from a summarizer's count.**

**Canary names — if any source attributes these to CCHS, that source is unreliable:**
Leo Delaney, Zaid Lott, Vincent Rosen, Henry Hulbert, Daniel Phillips, Tate Estep, Ryder
Kilgannon, Elliot Newcomb, Brendan Ravin, Derrin Carr, Matthew Hankins, Trey Dukes.
**None of the 35 athletes recorded below is a canary name** — checked individually.

**Scope this warning to NCFootballNews only.** S3, the Charlotte Observer roundup, **is
genuine**: its `CHARLOTTE CATHOLIC:` heading is bounded by `CARMEL CHRISTIAN` above and
`CHARLOTTE CHRISTIAN` below, verified by re-reading the raw page.

## Program scale and championships

> **Update 2026-11-05 — School Profile 2026-2027.** The new edition
> (https://resources.finalsite.net/images/v1787830297/charlottecatholicorg/ihsker6gva69wmhq5agy/2026-2027CCHSSchoolProfile.pdf)
> gives **79** state championships and **68** state runner-up finishes since 2000 (up from
> 74 / 65), and says "nine" Wachovia/Wells Fargo Cups. The NCHSAA all-time list's **10**
> still stands for the Cup count. The conference, the 1-of-4 parochial line and "Over
> 1,000" college athletes are restated unchanged. Full transcription:
> `source-material/college-support/charlotte-catholic/Charlotte Catholic - College Support - School Profile 2026-2027.md`.

| Figure | Value | Source |
| --- | --- | --- |
| **State championships since 2000** | **74** | S1 |
| **State runner-up finishes since 2000** | **65** | S1 |
| **Wachovia/Wells Fargo Cups** | **10** per the NCHSAA all-time list plus 2025–26; the School Profile's **8** predates it | S1 |
| Conference | NCHSAA **Division 6A**, Southern Carolina Split 6A/7A | S1 |
| Alumni who went on to NCAA/NAIA/Junior College | **1000+** | S1 |
| Parochial schools in the NCHSAA | CCHS is **1 of 4** | S1 |

**2026 state championships — three in one school year:**

| Sport | Result | Detail |
| --- | --- | --- |
| **Girls soccer** | **NCHSAA 6A champion** | d. Jacksonville **1-0**; finished the year **undefeated** (S6) |
| **Boys lacrosse** | **NCHSAA 1A-6A champion** | d. Middle Creek **9-8 (OT)**, Leonard's goal; first in 12 years (S7) |
| **Girls lacrosse** | **NCHSAA 1A-6A champion** | d. East Chapel Hill **9-8 (OT)**, Tan's OT goal; ended a 12-year drought (S8) |

**Historic program strength:** football **8 state titles** from **11 championship-game
appearances**; **girls swimming won 14 STRAIGHT state titles, 2002–2015**; boys basketball
4A state title in 2016.

**2025 football season:** **7-5** overall, **3-3** in conference, NCHSAA 6A playoff berth;
won its opening playoff game **27-0** over A.C. Reynolds on 14 November 2025 (S9).

## Facilities and sports medicine

- **Oddo Field at Keffer Stadium** — approximately **3,500 seats**; the field is named for
 Jim Oddo.
- **Athletic training is provided by Atrium Health** — full-time licensed/certified
 athletic trainers. **Todd Wisocki, LAT/ATC** is the athletic trainer and advises the
 student Sports Medicine club.
- **Mike Hazel** — strength and conditioning coach (NSCA CSCS).
- **Kevin Christmas** — Athletic Director.

## College commitments, Classes of 2024–2026

> **SUPERSEDED 2026-11-08 (`/athlete-commits`, plan `catholiccommits`).** The table below is
> the August 2026 record from three signing articles. It missed every football signing
> (December/February) and the spring signing days. The current record, **54 athletes / 39
> Division I / 15 Power 4**, is in
> `Charlotte Catholic - Sports - College Commitments 2024-2026.md`; method, nulls and
> unchecked gaps are in `Charlotte Catholic - Sports - Varsity Roster Cross-Reference 2026.md`.
> Kept here unchanged as the earlier record.

**35 athletes documented by name**, each traceable to a named article. Counts below are
derived from this table and nothing else.

| Class | Name | Sport | College | Tier |
| --- | --- | --- | --- | --- |
| 2024 | Jack Ransom | Lacrosse | Georgetown University | D1 |
| 2024 | Mark McMahon | Lacrosse | St. Bonaventure University | D1 |
| 2024 | John McKillop | Baseball | United States Military Academy at West Point | D1 |
| 2024 | Evan MacIntyre | Baseball | Indiana University | **P4** |
| 2024 | Colin Mendicino | Lacrosse | Towson University | D1 |
| 2024 | Mason Child | Baseball | UNC Wilmington | D1 |
| 2024 | Gracynn Gough | Basketball | College of the Holy Cross | D1 |
| 2024 | Molly Haskell | Field Hockey | Sewanee: The University of the South | D3 |
| 2024 | Lauren Bernardo | Swim & Dive | Louisiana State University | **P4** |
| 2024 | Blanca Thomas | Basketball | University of North Carolina | **P4** |
| 2024 | Natalie Dominguez | Softball | Yale University | D1 |
| 2024 | Charlotte Bergman | Tennis | Belmont Abbey College | D2 |
| 2024 | Kate Daniels | Lacrosse | University of Louisville | **P4** |
| 2024 | Abby Druhan | Swim & Dive | University of Pennsylvania | D1 |
| 2024 | Jack Hedrick | Baseball | Duke University | **P4** |
| 2025 | Madison Baumgratz | Lacrosse | Virginia Tech | **P4** |
| 2025 | Luke Colwell | Lacrosse | Randolph-Macon College | D3 |
| 2025 | Giovanni Delissio | Lacrosse | University of Detroit Mercy | D1 |
| 2025 | Chris Eagan | Basketball | American University | D1 |
| 2025 | Brooks Griffith | Lacrosse | University of Lynchburg | D3 |
| 2025 | Will Guthrie | Golf | University of Georgia | **P4** |
| 2025 | Will Hartman | Golf | Vanderbilt University | **P4** |
| 2025 | Brendan Leonard | Lacrosse | Salisbury University | D3 |
| 2025 | Matt McKnight | Baseball | University of North Carolina | **P4** |
| 2025 | Cannon Ridinger | Lacrosse | Providence College | D1 |
| 2025 | Max Sovie | Lacrosse | Mercer University | D1 |
| 2026 | Dominic Basrawala | Football | United States Air Force Academy | D1 |
| 2026 | Zach Deblitz | Soccer | Hampden-Sydney College | D3 |
| 2026 | Carter Garnett | Football | Johns Hopkins University | D3 |
| 2026 | Lukas Lupinski | Football | Columbia University | D1 |
| 2026 | Margueritte McPhillips | Soccer | Connecticut College | D3 |
| 2026 | Caden O'Neill | Football | Furman University | D1 |
| 2026 | Duncan Smith | Cross Country / Track | Washington and Lee University | D3 |
| 2026 | Keanen Teeter | Football | Lenoir-Rhyne University | D2 |
| 2026 | Alex Hoffman | Baseball | Virginia Tech | **P4** |

### Derived counts

| Metric | Value |
| --- | --- |
| Athletes documented, Classes 2024–2026 | **35** |
| **Power Four commitments (`p4-commits-2426`)** | **10** |
| **Division I commitments (`d1-commits-2426`)** | **25** (P4 is a subset of D1) |
| Class of 2024 | 15 athletes — 5 P4, 13 D1 |
| Class of 2025 | 11 athletes — 4 P4, 8 D1 |
| Class of 2026 | 9 athletes — 1 P4, 4 D1 |

### Attribution caveats carried into the app

- **The Class of 2026 figure is a DOCUMENTED MINIMUM, not a full class.** S4 covers only
 the **February** ceremony (football, soccer, cross country). CCHS holds **separate fall
 and spring signing days**, so baseball and lacrosse — historically its two richest
 sports — are largely unpublished for that class. **Alex Hoffman surfaced only through a
 reverse college-roster lookup**, not from any signing article. The app says "documented
 minimum" rather than implying a complete class.
- **Cannon Ridinger — double-count risk, resolved.** He graduated from CCHS but earlier
 attended **Charlotte Country Day** (already in this app) and Hotchkiss. **Attributed to
 CCHS, his graduating school**, per the standing rule of attributing by graduating school
 rather than any attendance. He must not also be counted for Country Day.
- **Evan MacIntyre** is counted P4 **at commitment time** (signed with Indiana). He has
 since transferred to Belmont Abbey via JUCO. The row records the commitment, not the
 current roster.
- **Mary Catherine Farley (Wofford) is EXCLUDED** from all counts. She appears in the S2
 signing list but never appeared on a college roster, so she fails the corroboration bar
 applied to every other athlete here. Including her would make the D1 count 26.
- **Air Force, Columbia, Yale, Penn, Georgetown and Army are D1 but NOT Power Four.**
 Service academies and Ivies are D1 only.

## Alumni in professional sport

- **Elijah Hood** — NFL, drafted by the Oakland Raiders in 2017 (7th round, pick 242);
 earlier the US Army Player of the Year (Hall Trophy).
- **Derrick Taylor** — NFL.
- **Brendan McDonough** and **Donnie Smith** — MLS.
- **Patrick Hogan** — USL.
- **Laura DuPont** — professional tennis.

## National recognition

- Boys lacrosse ranked **#28 nationally** (MaxPreps) and **#1 in North Carolina**, up from
 #186.
- Football ranked **#4 in 6A**.
- **Will Hartman** — Charlotte Observer golfer of the year.
- **Mason Poveromo** — named athlete recognition.

## NIL

The **NCHSAA NIL policy took effect 1 July 2023**, and CCHS is subject to it as an NCHSAA
member. **No CCHS-specific NIL deal was found**, and none is claimed.

## Confirmed not-published

- **`recruiting` (a top-100 national recruit)** — **not found.** The 247Sports and On3
 school pages return 403/404. Recorded as not published rather than zero.
- **The school's own athletics site publishes nothing usable.** The
 `/athletics/national-letter-of-intent` page is an empty Finalsite photo-gallery shell —
 live *and* in archived snapshots, with image `alt` attributes left as literal `alt-text`
 placeholders. All 20 individual sport pages are navigation boilerplate. **The diocesan
 newspaper is the enumerable source for this school**, which is why every commitment above
 cites it rather than the school.


---

## Varsity Roster Cross-Reference 2026

*Source file: `Charlotte Catholic - Sports - Varsity Roster Cross-Reference 2026.md`*

# Charlotte Catholic High School — Sports — Varsity Roster Cross-Reference 2026

> **Provenance:** Claude Code, 2026-11-08, `/athlete-commits` (plan `catholiccommits`). Records
> how the 2024–26 College Pipeline window was rebuilt: which rosters were pulled, which
> sources answered, the leads ruled out, the **nulls** (searched, nothing found) and the
> **unchecked** gaps (no roster to search). Names appear only for athletes with a documented
> commitment or a lead that was ruled out; every other current or former student is a count.
> The verified table is `Charlotte Catholic - Sports - College Commitments 2024-2026.md`.

## Scope

Every varsity sport Charlotte Catholic fields on MaxPreps: baseball, boys and girls
basketball, boys and girls cross country, field hockey, girls flag football, football, girls
golf, boys golf, boys and girls lacrosse, boys and girls soccer, softball, boys and girls
swimming, boys and girls tennis, boys and girls track & field, girls and boys volleyball,
wrestling.

## Rosters pulled

MaxPreps, path-form seasons `22-23` → `26-27`, base
https://www.maxpreps.com/nc/charlotte/charlotte-catholic-cougars/<sport>/<yy-yy>/roster/
(girls soccer `/soccer/girls/spring/`, boys swimming `/swimming/winter/`, boys golf
`/golf/spring/`). Seniors (`Sr.`) by season: 2023-24 → Class of 2024, 2024-25 → 2025,
2025-26 → 2026, 2026-27 → 2027.

| Class | Senior sport-slots | Distinct seniors |
|---|---|---|
| 2024 | 121 | 116 |
| 2025 | 106 | 101 |
| 2026 | 92 | 90 |
| 2027 | 79 | 78 |

The school's own athletics site was not used: its `/athletics/national-letter-of-intent` page
is an empty Finalsite gallery (see the 2026-08-18 dossier), and its team pages publish no
rosters.

**MaxPreps grade errors found:** Audrey Pardue is listed Sr. in 2023-24 (every other source
says Class of 2025); Brooks Griffith is listed Sr. in both 2023-24 and 2024-25 (card keeps
2025). Cannon Ridinger is not listed as a 2024-25 senior; he is attributed by LaxNumbers and the
Observer to the Class of 2025, unchanged.

## Sources and depth by sport

| Sport | Tier | Sources that answered |
|---|---|---|
| Football | Full per-name | HighSchoolOT out-of-state lists 2024/2025/2026 + Building the Fence 2026; NC Football News 2026 tracker (2024/2025 slugs 404); Observer early-signing lists Dec 2023 and Dec 2024; college rosters |
| Boys basketball | Full | RealGM school page (Chrome); college rosters |
| Girls basketball | Full | HighSchoolOT tracker; college rosters |
| Baseball | Full | HighSchoolOT tracker; Prep Baseball Report previews and profiles; Perfect Game; The Baseball Cube; college rosters and Arizona's signing release |
| Boys lacrosse | Full | LaxNumbers team 12753 (Chrome), y=2024–2028; HighSchoolOT tracker |
| Girls lacrosse | Grouped searches + tracker | HighSchoolOT tracker. LaxNumbers' girls board was not reachable for this team |
| Swimming | Grouped searches + trackers | HighSchoolOT boys and girls trackers; SwimSwam; Observer 2023-24 swimming preview; college rosters |
| Track / XC | Tracker + college roster | HighSchoolOT boys and girls trackers |
| Golf, tennis | Tracker | HighSchoolOT trackers |
| Soccer, volleyball, softball, field hockey | Grouped searches + trackers | HighSchoolOT trackers; grouped name searches; college rosters |

## Leads ruled out

| Athlete | Class | Lead | Why ruled out |
|---|---|---|---|
| Mary Catherine Farley | 2024 | Wofford (girls lacrosse) | Not on Wofford's 2025 or current roster |
| Audrey Pardue | 2025 | Georgetown (swimming) | Not on Georgetown's 2025-26 roster, the season she was due to join |
| Conor Clendenin | 2025 | Ithaca (football) | Observer list only; not on Ithaca's 2024, 2025 or current roster |
| Paul Greeley | 2026 | Sewanee (baseball) | PBR scout-day listing only; not on Sewanee's roster |
| Conor Walsh | 2023 | Harvard (football) | Graduated 2023, outside the window |

## Nulls — searched, no commitment found (counts of seniors without a row)

"x of y" = x seniors on that MaxPreps roster with no commitment, of y seniors listed. A
multi-sport athlete committed in another sport is counted as committed on every roster he or
she appears on (Baade, Fijalkowski, McMahon, MacIntyre, McKillop, Garnett). Computed from the
rosters, 2026-11-08.

| Sport | 2024 | 2025 | 2026 |
|---|---|---|---|
| Football | 31 of 36 | 21 of 26 | 18 of 23 |
| Baseball | 3 of 8 | 6 of 9 | 3 of 9 (Greeley counted as a lead, not a null) |
| Boys lacrosse | 6 of 10 | 14 of 20 | 5 of 6 |
| Girls lacrosse | 4 of 6 (Farley excluded) | 7 of 8 | **9 of 9** |
| Boys basketball | 3 of 3 | 8 of 9 | 6 of 7 |
| Girls basketball | 5 of 7 | 4 of 5 | 5 of 5 |
| Boys soccer | 5 of 5 | 9 of 9 | 6 of 6 |
| Girls soccer | 3 of 3 | 5 of 5 | 3 of 5 |
| Volleyball | 10 of 10 | 6 of 6 | 5 of 5 |
| Softball | 2 of 3 | 2 of 2 | 3 of 3 |
| Field hockey | no 2023-24 roster | 3 of 3 | 7 of 7 |
| Boys tennis | 1 of 1 | 2 of 2 | 3 of 3 |
| Girls tennis | 5 of 6 | 1 of 1 | 4 of 4 |
| Girls swimming | 15 of 15 | no roster | no roster |
| Boys swimming | 8 of 8 | no roster | no roster |
| Girls golf | no roster | 1 of 1 | no roster |

Five card athletes do not appear as MaxPreps seniors at all: Zach Deblitz (soccer, 2026),
Duncan Smith (XC/track, 2026), Logan Hill (track, 2024), Logan Leckner (swimming, 2024) and
Luciano Salas (swimming, 2025, listed as a junior in 2023-24). Each has a college roster or
school article naming Charlotte Catholic as the high school, which is the graduate test; the
gaps are MaxPreps' (empty track rosters, incomplete swimming rosters).

The girls
lacrosse 2026 null is notable — that team won the NCHSAA 1A-6A title — and is recorded as
"not published", not as zero.

## Unchecked — no roster to search

- **Cross country and track & field (boys and girls), wrestling, girls flag football, boys
 volleyball, boys golf:** MaxPreps returns an empty table for every season 2022-23 → 2026-27.
 Only the HighSchoolOT trackers and the school's own February 2026 signing article reached
 these sports (Hill, Duncan Smith).
- **Swimming, Classes of 2025 and 2026:** MaxPreps swimming rosters are empty for 2024-25 and
 2025-26. Salas (2025) surfaced through Queens' roster; any other 2025–26 swimmer would have
 to come from SwimSwam or a college roster.
- **Girls golf 2025-26, 2026-27:** empty.
- **On3 and SwimCloud** are blocked to every fetch path and were not used.

## Class of 2027 leads from this pass

LaxNumbers (boys, y=2027) lists Hedley (UNC) and Drensek (Bucknell), both already confirmed in
the per-class file, plus **Jason Leonard → Air Force (D1)** and **James Pawlowski → Denison
(D3)**, each single-source. Recorded as leads in
`Charlotte Catholic - Sports - College Commitments Class of 2027.md`.


---

## Wells Fargo Cup Standings 2020-2026

*Source file: `Charlotte Catholic - Sports - Wells Fargo Cup Standings 2020-2026.md`*

# Charlotte Catholic - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-11-02 by the `/wells-fargo-cup` skill, for the planned Charlotte Catholic Wells Fargo Cup card (plan `charlottecatholiccup`). Pages were fetched with curl using a browser user agent, plus the NCHSAA site's own search API (`https://www.nchsaa.org/wp-json/wp/v2/`).

**Charlotte Catholic plays in the NCHSAA, so none of the NCISAA tables apply.** The association's Cup rules are at https://www.nchsaa.org/wells-fargo-cup/ and its all-time list at https://www.nchsaa.org/all-time-list-of-wells-fargo-state-cup-winners/.

**The six final-standings pages, one per season:**

| Season | URL | Published | Shows |
|---|---|---|---|
| 2020–21 | https://www.nchsaa.org/2020-2021-wells-fargo-state-cup-winners-recognized/ | 2021-09-03 | Top 10 per class, numbered |
| 2021–22 | https://www.nchsaa.org/wells-fargo-state-cup-competition-winners-2021-22-announced/ | 2022-09-16 | Top 10 per class, in order, not numbered |
| 2022–23 | https://www.nchsaa.org/nchsaa-announces-2022-2023-wells-fargo-cup-and-conference-cup-champions/ | 2023-08-15 | Top 10 per class, numbered |
| 2023–24 | https://www.nchsaa.org/2023-24-wells-fargo-cup-winners/ | 2024-06-21 | Top 10 per class, numbered |
| 2024–25 | https://www.nchsaa.org/wells-fargo-state-cup-standings-update-2/ | Dated 2025-03-31, since replaced by final figures | Top 10 per class, numbered |
| 2025–26 | https://www.nchsaa.org/2025-2026-wells-fargo-cup-champions/ | 2026-06-25 | Top 5 per class, in order, not numbered |

**The association publishes only the top of each class.** No page or record book found holds a full division, and no fall, winter or spring totals for a final season. The 2025–26 fall standings (https://www.nchsaa.org/2025-2026-wells-fargo-state-cup-fall-standings/) give Charlotte Catholic 210 after fall, but winter and spring were never published, so that is not a split. So the table cannot say "every school": an em dash on it means "not in the published top 10", not a low finish. The NCISAA card's heading and the `CUP_FIELD_SIZES` "of N" do not apply.

**The NCHSAA scores differently from the NCISAA.** Both pay 50, 45, 40, 35, 30, 25, 20, 15 for first through eighth and split a tie. The NCHSAA also awards five participation points per sanctioned sport in which a school reaches the playoffs (wording from the Cup page: "Five participation points are awarded for each sanctioned sport in which a school competes in the NCHSAA playoffs"). So the card's sentence that points come only from state championships is false for this association.

**The class changes three ways in six seasons.** 3A in 2020–21, 4A for the next four, then 6A in 2025–26, the first year of the association's eight classes (https://www.nchsaa.org/2025-2026-wells-fargo-cup-champions/ calls it the inaugural cycle). Class numbers are not comparable across that change.

**A search summary claimed 4A for 2020–21, and it was wrong.** The association's post lists Charlotte Catholic under 3A. This is the same lesson as the NCISAA card: a summary is a lead, and the table is the source.

**2024–25 was corrected after it was announced.** The association's first release (August 1, 2025) left out boys lacrosse, which printed Charlotte Catholic 6th on 287.5, Cardinal Gibbons 567.5 and North Lincoln as 3A winner. The correction (August 12, 2025) gives 325, 637.5 and Lake Norman Charter. The NCHSAA page above now prints the corrected figures, and they match HighSchoolOT's report of the correction row for row: https://www.highschoolot.com/story/after-points-correction-lake-norman-charter-wins-the-2024-25-wells-fargo-cup-in-3a/22116146/ (the first version, with its update note: https://www.highschoolot.com/story/cardinal-gibbons-north-lincoln-seaforth-ctk-win-2024-25-wells-fargo-cups/22105058/). The corrected row is the one recorded here. The page's March date is stale and its figures are not.

**2022–23 exists in two versions, and the association's later one is recorded.** A repost of an earlier tally (August 7, 2023: https://carolinapreps.com/2023/08/07/nchsaa-announces-2022-2023-wells-fargo-cup-and-conference-cup-champions/) prints Charlotte Catholic on 361 and Marvin Ridge on 482, with Myers Park second and Cardinal Gibbons fourth. The NCHSAA's own post a week later prints 365, 485, Cardinal Gibbons second and Myers Park third. No correction notice was found, so the later post on the association's site stands.

**Two 2022–23 rows are garbled and stay out of the ledger.** The association's 4A list prints 9) Northwest Guilford – 29.5 and 10) Hoggard – 25, both below an 8th place on 301.666. The earlier tally has Northwest Guilford on 255 and Lake Norman 10th on 213, so neither value can be repaired from a published figure. Those two cells show an em dash, the same treatment as a row published with a blank place. Neither school's other seasons are affected, and Charlotte Catholic's own figures are not near them.

**Places.** 2021–22 and 2025–26 print no place numbers, so the place is the list position. No two schools on those lists share a total, so the order is unambiguous. 2020–21 4A prints Hough 6th and Pinecrest 7th on the same 354.64, copied as published with no tie mark.

**The school's Cup count is out of date.** The School Profile 2025-2026 (quoted in `Charlotte Catholic - Sports - Program Championships and College Commitments.md`) says 8 Wachovia/Wells Fargo Cups. The association's all-time list credits 9 through 2024–25 (seven in 2A, 1998–99 to 2004–05, and two in 3A, 2007–08 and 2008–09), and it has not yet added 2025–26. With the 2025–26 cup that makes 10, and the association's "first state cup in 17 years" confirms the 2008–09 anchor. The profile predates the 2025–26 cup, but it was already one short.

**Title and runner-up years rest on the association's own results.** Sources by sport:

| Sport | Evidence |
|---|---|
| Football | https://www.nchsaa.org/wp-content/uploads/2025/01/FB-State-Champion-List-thru-24.pdf and https://www.nchsaa.org/wp-content/uploads/2025/01/Football-State-Championship-Results-thru-24.pdf (Charlotte Catholic 14, Havelock 7, for 2020–21, played May 2021: https://www.nchsaa.org/2020-2021-3a-football-championship-recap-charlotte-catholic-defense-shines-14-7-win/) |
| Girls swimming | https://www.nchsaa.org/record-book/swimming-and-diving/ (champions 2021 and 2026), and for each other year: 2022 Myers Park over Green Hope (https://www.nchsaa.org/2022-nchsaa-4a-swimming-diving-recap-myers-park-women-green-hope-men-swim-titles/), 2023 second, from the meet's own team rankings (https://www.nchsaa.org/sites/default/files/2023%20NCHSAA%204A%20State%20Swim%20%26%20Dive%20Championship%20Results.pdf), 2024 fourth (https://www.nchsaa.org/2024-swimming-diving-championships/), 2025 third (https://www.nchsaa.org/2025-swimming-diving-championships/), 2026 (https://www.nchsaa.org/2026-swimming-diving-championships/) |
| Boys golf | https://www.nchsaa.org/record-book/mens-golf/ (champions 2021 and 2022), 2023 third (https://www.nchsaa.org/day-2-results-nchsaa-mens-golf-state-tournament/), 2024 not in the top three (https://www.nchsaa.org/2024-mens-golf-championships/), 2025 third (https://www.nchsaa.org/2025-mens-golf-championships/), 2026 runner-up (https://www.nchsaa.org/2026-mens-golf-championships/) |
| Girls tennis | https://www.nchsaa.org/wp-content/uploads/2023/11/Dual-team-state-champs.pdf (2020–21 3A) and https://www.nchsaa.org/wp-content/uploads/2023/11/Duala-team-Championship-Results-thru-23.pdf (no final 2021 to 2023), https://www.nchsaa.org/2024-womens-dual-team-tennis-championships/ (2024 final was Providence and Cardinal Gibbons), https://www.nchsaa.org/2025-womens-dual-team-tennis-championships/ (2025: Charlotte Catholic 5, East Chapel Hill 2) |
| Girls lacrosse | https://www.nchsaa.org/record-book/womens-lacrosse/ (runner-up to Cardinal Gibbons 2022, 2023, 2024), https://www.nchsaa.org/2026-lacrosse-championships/ (2026: Charlotte Catholic 9, East Chapel Hill 8, OT, 1A-6A) |
| Boys lacrosse | https://www.nchsaa.org/record-book/mens-lacrosse/ (2023 runner-up, Cardinal Gibbons 12, Charlotte Catholic 10), https://www.nchsaa.org/2026-lacrosse-championships/ (2026: Charlotte Catholic 9, Middle Creek 8, OT, 1A-6A) |
| Girls golf | https://www.nchsaa.org/2024-womens-golf-championships/ (2024 second, seven shots behind Pinecrest), https://www.nchsaa.org/2025-womens-golf-championships/ (2025 6A team champion); 2021 to 2023 recaps show no top-two finish |
| Boys soccer | https://www.nchsaa.org/2025-mens-soccer-championships/ (2025 6A: Charlotte Catholic 1 (4), Middle Creek 1 (3)), https://www.nchsaa.org/record-book/mens-soccer/ (no final 2021 to 2024) |
| Girls soccer | https://www.nchsaa.org/2026-womens-soccer-championships/ (2026 6A: Charlotte Catholic 1, Jacksonville 0), https://www.nchsaa.org/record-book/womens-soccer/ (no final 2021 to 2025) |

**The 2020–21 girls tennis title has a footnote.** No dual team tournament was held that season, so the association awarded the team title on advancement points at the individual tournament (the PDF's own note, and https://www.nchsaa.org/2020-2021-nchsaa-womens-individual-tennis-state-championship-wraps/). It is on the association's champion list, so it counts.

**Calendar years, not season labels.** The 2020 football season was played in spring 2021 under the COVID calendar, so its title is `2021`. Girls golf, girls tennis and boys soccer in fall 2025 belong to the 2025–26 cup. Fall 2026 results (a girls golf title on https://www.nchsaa.org/2026-womens-golf-championships/) belong to 2026–27 and are out of this record.

**Dropped from the point sources, with the reason.** The bar is the one the other cards used: at least one title or two runner-up finishes.

| Sport | Result | Why it is out |
|---|---|---|
| Girls basketball | 2024 4A runner-up, Rolesville 65, Charlotte Catholic 58 (https://www.nchsaa.org/2024-basketball-championships/; the record book's results table prints 57) | One runner-up finish |
| Boys swimming | 2026 6A runner-up (https://www.nchsaa.org/2026-swimming-diving-championships/) | One runner-up finish |
| Boys cross country | 2022 4A, Green Hope 124, Charlotte Catholic 166 (https://www.nchsaa.org/2022-nchsaa-cross-country-state-championship-meet-recaps-results/) | One finish, and the recap does not number it |
| Cheerleading | 2021 Division 1 winner (https://www.nchsaa.org/wp-content/uploads/2023/12/Cheer-Invitational-Division-Winners-and-Champions-thru-2022.pdf) | An invitational, and nothing published shows it scoring Cup points |

**`CUP_SPORTS.NCHSAA` needs no change.** The association's navigation (https://www.nchsaa.org/sports/) lists one Wrestling entry, and it runs separate men's and women's individual state championships with team scores (https://www.nchsaa.org/2026-womens-individual-wrestling-state-championship/). The one `both` chip stays true. Men's volleyball and flag football are both on the navigation, and field hockey is not, so Charlotte Catholic's field hockey team scores no Cup points.

**Lead over next is exact only where the published list reaches the next place.** It does in all six seasons, because Charlotte Catholic finished inside every list and is never last on it.

**Off-roster schools.** The table holds 20 schools off the roster, all NCHSAA members. Eleven have no homepage in `src/data/highSchools.ts` yet: Watauga, East Chapel Hill, Northern Guilford, Middle Creek, Broughton, Green Hope, Hoggard, Panther Creek, Chapel Hill, Mount Tabor and J.H. Rose. Each needs a page loaded in a browser, confirming name and city. An HTTP 200 proves nothing.

**Do not read one school's points against another association's.** NCHSAA and NCISAA totals come from different sport lists and different rules, and the ledger's association wall keeps them off each other's tables.

## Charlotte Catholic Wells Fargo Cup results

| Season | Association | Class | Place | Points | Next place | Lead over next |
|---|---|---|---|---|---|---|
| 2020–21 | NCHSAA | 3A | 3 | 430 | Chapel Hill 415 | 15 |
| 2021–22 | NCHSAA | 4A | 8 | 305 | Myers Park 300 | 5 |
| 2022–23 | NCHSAA | 4A | 5 | 365 | Cuthbertson 340 | 25 |
| 2023–24 | NCHSAA | 4A | 6 | 342.5 | Hoggard 305 | 37.5 |
| 2024–25 | NCHSAA | 4A | 6 | 325 | Lake Norman 290 | 35 |
| 2025–26 | NCHSAA | 6A | 1 | 655 | Watauga 580 | 75 |

## Charlotte Catholic Wells Fargo Cup division winners

| Season | Class | Winner | Second |
|---|---|---|---|
| 2020–21 | 3A | Weddington 530 | Marvin Ridge 512.5 |
| 2021–22 | 4A | Cardinal Gibbons 575 | Marvin Ridge 475 |
| 2022–23 | 4A | Marvin Ridge 485 | Cardinal Gibbons 460 |
| 2023–24 | 4A | Marvin Ridge 615 | Cardinal Gibbons 477.5 |
| 2024–25 | 4A | Cardinal Gibbons 637.5 | Marvin Ridge 542.5 |
| 2025–26 | 6A | Charlotte Catholic 655 | Watauga 580 |

## Charlotte Catholic Wells Fargo Cup point sources

| Sport | Season | Titles | Runner-up |
|---|---|---|---|
| Girls swimming | Winter | 2021, 2026 | 2023 |
| Boys golf | Spring | 2021, 2022 | 2026 |
| Girls tennis | Fall | 2021, 2025 | |
| Girls lacrosse | Spring | 2026 | 2022, 2023, 2024 |
| Boys lacrosse | Spring | 2026 | 2023 |
| Girls golf | Fall | 2025 | 2024 |
| Football | Fall | 2021 | |
| Boys soccer | Fall | 2025 | |
| Girls soccer | Spring | 2026 | |

## Wells Fargo Cup all-time cups for Charlotte Catholic

| Class | Seasons | Cups |
|---|---|---|
| 2A | 1998–99, 1999–2000, 2000–01, 2001–02, 2002–03, 2003–04, 2004–05 | 7 |
| 3A | 2007–08, 2008–09 | 2 |
| 6A | 2025–26 | 1 |
| Total | | 10 |

## Wells Fargo Cup new division rows for the ledger

Every row a school on Charlotte Catholic's table needs in `CUP_RECORDS`, all NCHSAA, none an estimate, none with splits. Rows in another class are there so a table cell reads "In 7A" rather than an em dash.

| School | Slug | Class | Season | Place | Points |
|---|---|---|---|---|---|
| Charlotte Catholic | charlotte-catholic | 3A | 2020–21 | 3 | 430 |
| Charlotte Catholic | charlotte-catholic | 4A | 2021–22 | 8 | 305 |
| Charlotte Catholic | charlotte-catholic | 4A | 2022–23 | 5 | 365 |
| Charlotte Catholic | charlotte-catholic | 4A | 2023–24 | 6 | 342.5 |
| Charlotte Catholic | charlotte-catholic | 4A | 2024–25 | 6 | 325 |
| Watauga | watauga | 6A | 2025–26 | 2 | 580 |
| East Chapel Hill | east-chapel-hill | 3A | 2020–21 | 7 | 322.5 |
| East Chapel Hill | east-chapel-hill | 6A | 2025–26 | 3 | 515 |
| Northern Guilford | northern-guilford | 3A | 2020–21 | 5 | 350 |
| Northern Guilford | northern-guilford | 6A | 2025–26 | 4 | 507.5 |
| Middle Creek | middle-creek | 6A | 2025–26 | 5 | 450.83 |
| Cardinal Gibbons | cardinal-gibbons | 4A | 2020–21 | 1 | 682.5 |
| Cardinal Gibbons | cardinal-gibbons | 4A | 2021–22 | 1 | 575 |
| Cardinal Gibbons | cardinal-gibbons | 4A | 2022–23 | 2 | 460 |
| Cardinal Gibbons | cardinal-gibbons | 4A | 2023–24 | 2 | 477.5 |
| Cardinal Gibbons | cardinal-gibbons | 4A | 2024–25 | 1 | 637.5 |
| Cardinal Gibbons | cardinal-gibbons | 7A | 2025–26 | 1 | 875 |
| Marvin Ridge | marvin-ridge | 3A | 2020–21 | 2 | 512.5 |
| Marvin Ridge | marvin-ridge | 4A | 2021–22 | 2 | 475 |
| Marvin Ridge | marvin-ridge | 4A | 2022–23 | 1 | 485 |
| Marvin Ridge | marvin-ridge | 4A | 2023–24 | 1 | 615 |
| Marvin Ridge | marvin-ridge | 4A | 2024–25 | 2 | 542.5 |
| Marvin Ridge | marvin-ridge | 7A | 2025–26 | 2 | 842.5 |
| Cuthbertson | cuthbertson | 3A | 2020–21 | 6 | 325 |
| Cuthbertson | cuthbertson | 4A | 2021–22 | 4 | 420 |
| Cuthbertson | cuthbertson | 4A | 2022–23 | 6 | 340 |
| Cuthbertson | cuthbertson | 4A | 2023–24 | 5 | 345 |
| Cuthbertson | cuthbertson | 4A | 2024–25 | 3 | 377.5 |
| Cuthbertson | cuthbertson | 7A | 2025–26 | 4 | 495 |
| Myers Park | myers-park | 4A | 2020–21 | 2 | 522.14 |
| Myers Park | myers-park | 4A | 2021–22 | 9 | 300 |
| Myers Park | myers-park | 4A | 2022–23 | 3 | 445 |
| Myers Park | myers-park | 4A | 2023–24 | 4 | 377.5 |
| Myers Park | myers-park | 4A | 2024–25 | 4 | 355 |
| Myers Park | myers-park | 8A | 2025–26 | 2 | 635 |
| Weddington | weddington | 3A | 2020–21 | 1 | 530 |
| Weddington | weddington | 4A | 2021–22 | 3 | 422.5 |
| Weddington | weddington | 4A | 2022–23 | 4 | 414.166 |
| Weddington | weddington | 4A | 2023–24 | 3 | 407.5 |
| Weddington | weddington | 4A | 2024–25 | 5 | 327.5 |
| Weddington | weddington | 7A | 2025–26 | 3 | 570 |
| Lake Norman | lake-norman | 4A | 2024–25 | 7 | 290 |
| Broughton | broughton | 4A | 2023–24 | 10 | 247.5 |
| Broughton | broughton | 4A | 2024–25 | 8 | 280 |
| Broughton | broughton | 8A | 2025–26 | 3 | 480 |
| Green Hope | green-hope | 4A | 2020–21 | 5 | 369.5 |
| Green Hope | green-hope | 4A | 2021–22 | 6 | 370 |
| Green Hope | green-hope | 4A | 2022–23 | 7 | 335 |
| Green Hope | green-hope | 4A | 2023–24 | 9 | 250 |
| Green Hope | green-hope | 4A | 2024–25 | 9 | 255 |
| Hoggard | hoggard | 4A | 2020–21 | 3 | 400 |
| Hoggard | hoggard | 4A | 2023–24 | 7 | 305 |
| Hoggard | hoggard | 4A | 2024–25 | 10 | 252.5 |
| Hoggard | hoggard | 8A | 2025–26 | 1 | 655 |
| Ardrey Kell | ardrey-kell | 4A | 2020–21 | 4 | 389.64 |
| Ardrey Kell | ardrey-kell | 4A | 2021–22 | 10 | 295 |
| Ardrey Kell | ardrey-kell | 4A | 2022–23 | 8 | 301.666 |
| Ardrey Kell | ardrey-kell | 4A | 2023–24 | 8 | 287.5 |
| Ardrey Kell | ardrey-kell | 8A | 2025–26 | 4 | 452.5 |
| Hough | hough | 4A | 2020–21 | 6 | 354.64 |
| Hough | hough | 4A | 2021–22 | 5 | 372.5 |
| Panther Creek | panther-creek | 4A | 2021–22 | 7 | 307.5 |
| Chapel Hill | chapel-hill | 3A | 2020–21 | 4 | 415 |
| Chapel Hill | chapel-hill | 7A | 2025–26 | 5 | 425 |
| Cox Mill | cox-mill | 3A | 2020–21 | 8 | 307.5 |
| Mount Tabor | mount-tabor | 3A | 2020–21 | 9 | 266.25 |
| J.H. Rose | jh-rose | 3A | 2020–21 | 10 | 250 |
| J.H. Rose | jh-rose | 3A | 2021–22 | 4 | 350 |
| J.H. Rose | jh-rose | 3A | 2023–24 | 7 | 280 |
| J.H. Rose | jh-rose | 3A | 2024–25 | 4 | 307.5 |


---

## Sources referenced across these documents

- https://247sports.com/player/charlie-smith-46147891/
- https://247sports.com/player/dominic-basrawala-46150298/
- https://247sports.com/player/jack-larsen-46117223/
- https://247sports.com/player/nick-segarra-46135129/
- https://247sports.com/season/2027-football/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-football/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-football/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-womens-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-womens-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://arizonawildcats.com/news/2025/11/12/arizona-baseball-unveils-15-man-2026-signing-class.aspx
- https://athletics.hamilton.edu/sports/womens-basketball/roster
- https://basketball.realgm.com/highschool/teams/2034/Charlotte-Catholic-High-School-NC
- https://ca.news.yahoo.com/national-signing-day-where-observer-104500782.html
- https://carolinapreps.com/2023/08/07/nchsaa-announces-2022-2023-wells-fargo-cup-and-conference-cup-champions/
- https://catholicnewsherald.com/94-news/schools/12397-college-signing-day-big-dreams-bigger-futures
- https://catholicnewsherald.com/94-news/schools/9839-15-cchs-student-athletes-commit-to-college-sports
- https://clariongoldeneagles.com/sports/baseball/roster/jon-fijalkowski/11219
- https://cofcsports.com/sports/baseball/roster
- https://cofcsports.com/sports/womens-soccer/roster/mary-martin-spinner/8485
- https://fightingirish.com/sports/football/roster/
- https://gamecocksonline.com/sports/track/roster/player/logan-hill/
- https://gocrimson.com/sports/football/roster
- https://goduke.com/sports/baseball/roster
- https://goleopards.com/sports/football/roster
- https://gopack.com/sports/baseball/roster
- https://laxnumbers.com/team_info.php?y=2025&t=12753&s=2
- https://laxnumbers.com/team_info.php?y=2027&t=12753&s=2
- https://lrbears.com/sports/baseball/roster
- https://marshilllions.com/sports/mbkb/2026-27/roster
- https://nationallacrossefederation.com/player/james-hedley/
- https://navysports.com/sports/football/roster
- https://ncfootballnews.com/2026-north-carolina-high-school-football-college-commits/
- https://ncfootballnews.com/2027-north-carolina-high-school-football-college-commits/
- https://ohiobobcats.com/sports/football/roster/2024
- https://ohiobobcats.com/sports/football/roster/2025
- https://queensathletics.com/news/2026/2/22/mens-swimming-diving-queens-men-crowned-champions-royals-collect-major-asun-honors-on-final-day.aspx
- https://queensathletics.com/sports/baseball/roster
- https://queensathletics.com/sports/mens-swimming-and-diving/roster
- https://resources.finalsite.net/images/v1756128027/charlottecatholicorg/f5yfsecttu3cgmmtsh3f/CCHSSchoolProfile25-26FinalforOnline.pdf
- https://resources.finalsite.net/images/v1787830297/charlottecatholicorg/ihsker6gva69wmhq5agy/2026-2027CCHSSchoolProfile.pdf
- https://sports.yahoo.com/articles/where-charlotte-area-football-players-113000707.html
- https://sports.yahoo.com/national-signing-day-where-charlotte-111500239.html
- https://swimswam.com/nc-high-school-6a-state-champ-madi-hertzig-chooses-yale-2027/
- https://swuathletics.com/sports/baseball/roster/2025
- https://team91charlotte.substack.com/p/the-scoop-the-commitments
- https://wvusports.com/sports/mswim/roster/logan-leckner/18229
- https://www.highschoolot.com/story/after-points-correction-lake-norman-charter-wins-the-2024-25-wells-fargo-cup-in-3a/22116146/
- https://www.highschoolot.com/story/building-the-fence-class-of-2026-in-state-football-commits/21497032/
- https://www.highschoolot.com/story/cardinal-gibbons-north-lincoln-seaforth-ctk-win-2024-25-wells-fargo-cups/22105058/
- https://www.highschoolot.com/story/leonards-goal-gives-charlotte-catholic-a-1a-6a-boys-lacrosse-title-over-middle-creek/22363031/
- https://www.highschoolot.com/story/nchsaa-6a-girls-soccer-championship-2026-charlotte-catholic-jacksonville/22362945/
- https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/
- https://www.highschoolot.com/story/tan-s-ot-goal-lifts-charlotte-catholic-1a-6a-title-over-east-chapel-hill/22362987/
- https://www.highschoolot.com/story/these-class-of-2024-north-carolina-players-are-committed-to-out-of-state-programs/21196024/
- https://www.highschoolot.com/story/these-class-of-2025-north-carolina-players-are-committed-to-out-of-state-programs/21261590/
- https://www.highschoolot.com/story/these-class-of-2026-north-carolina-players-are-committed-to-out-of-state-division-i-schools/21559634/
- https://www.maxpreps.com/nc/charlotte/charlotte-catholic-cougars/<sport>/<yy-yy>/roster/
- https://www.maxpreps.com/nc/charlotte/charlotte-catholic-cougars/football/
- https://www.nchsaa.org/2020-2021-3a-football-championship-recap-charlotte-catholic-defense-shines-14-7-win/
- https://www.nchsaa.org/2020-2021-nchsaa-womens-individual-tennis-state-championship-wraps/
- https://www.nchsaa.org/2020-2021-wells-fargo-state-cup-winners-recognized/
- https://www.nchsaa.org/2022-nchsaa-4a-swimming-diving-recap-myers-park-women-green-hope-men-swim-titles/
- https://www.nchsaa.org/2022-nchsaa-cross-country-state-championship-meet-recaps-results/
- https://www.nchsaa.org/2023-24-wells-fargo-cup-winners/
- https://www.nchsaa.org/2024-basketball-championships/
- https://www.nchsaa.org/2024-mens-golf-championships/
- https://www.nchsaa.org/2024-swimming-diving-championships/
- https://www.nchsaa.org/2024-womens-dual-team-tennis-championships/
- https://www.nchsaa.org/2024-womens-golf-championships/
- https://www.nchsaa.org/2025-2026-wells-fargo-cup-champions/
- https://www.nchsaa.org/2025-2026-wells-fargo-state-cup-fall-standings/
- https://www.nchsaa.org/2025-mens-golf-championships/
- https://www.nchsaa.org/2025-mens-soccer-championships/
- https://www.nchsaa.org/2025-swimming-diving-championships/
- https://www.nchsaa.org/2025-womens-dual-team-tennis-championships/
- https://www.nchsaa.org/2025-womens-golf-championships/
- https://www.nchsaa.org/2026-lacrosse-championships/
- https://www.nchsaa.org/2026-mens-golf-championships/
- https://www.nchsaa.org/2026-swimming-diving-championships/
- https://www.nchsaa.org/2026-womens-golf-championships/
- https://www.nchsaa.org/2026-womens-individual-wrestling-state-championship/
- https://www.nchsaa.org/2026-womens-soccer-championships/
- https://www.nchsaa.org/all-time-list-of-wells-fargo-state-cup-winners/
- https://www.nchsaa.org/day-2-results-nchsaa-mens-golf-state-tournament/
- https://www.nchsaa.org/nchsaa-announces-2022-2023-wells-fargo-cup-and-conference-cup-champions/
- https://www.nchsaa.org/record-book/mens-golf/
- https://www.nchsaa.org/record-book/mens-lacrosse/
- https://www.nchsaa.org/record-book/mens-soccer/
- https://www.nchsaa.org/record-book/swimming-and-diving/
- https://www.nchsaa.org/record-book/womens-lacrosse/
- https://www.nchsaa.org/record-book/womens-soccer/
- https://www.nchsaa.org/sites/default/files/2023%20NCHSAA%204A%20State%20Swim%20%26%20Dive%20Championship%20Results.pdf
- https://www.nchsaa.org/sports/
- https://www.nchsaa.org/wells-fargo-cup/
- https://www.nchsaa.org/wells-fargo-state-cup-competition-winners-2021-22-announced/
- https://www.nchsaa.org/wells-fargo-state-cup-standings-update-2/
- https://www.nchsaa.org/wp-content/uploads/2023/11/Dual-team-state-champs.pdf
- https://www.nchsaa.org/wp-content/uploads/2023/11/Duala-team-Championship-Results-thru-23.pdf
- https://www.nchsaa.org/wp-content/uploads/2023/12/Cheer-Invitational-Division-Winners-and-Champions-thru-2022.pdf
- https://www.nchsaa.org/wp-content/uploads/2025/01/FB-State-Champion-List-thru-24.pdf
- https://www.nchsaa.org/wp-content/uploads/2025/01/Football-State-Championship-Results-thru-24.pdf
- https://www.nchsaa.org/wp-json/wp/v2/`
- https://www.perfectgame.org/college/CollegeCommitments.aspx?college=1566
- https://www.prepbaseball.com/news/NC/2026-hs-preview--region-6
- https://www.prepbaseball.com/profiles/NC/Brady--Marconi-0253861947-7912384605
- https://www.prepbaseball.com/profiles/NC/Cooper-Gornet-1783940652
- https://www.prepbaseball.com/profiles/NC/Jon-Fijalkowski-4085932761
- https://www.prepbaseballreport.com/rankings/NC/North-Carolina-class-of-2027
- https://www.thebaseballcube.com/content/hs_team/10370/
- https://www.tigernet.com/2027-clemson-baseball-commitments
- https://www.topdrawersoccer.com/club-soccer-articles/recruiting-roundup:-december-8-14_aid55451
