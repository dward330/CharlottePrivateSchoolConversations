# Carmel Christian School — Sports
> Distilled from 6 source document(s) in `source-material/sports/carmel-christian/`. Auto-extracted full text, lightly cleaned. Rebuilt 2026-11-09.
**Documents:** 247Sports Recruiting Rankings, College Commitments 2024-2026, College Commitments Class of 2027, Redesign Research 2026, Varsity Roster Cross-Reference 2026, Wells Fargo Cup Standings 2020-2026


---

## 247Sports Recruiting Rankings

*Source file: `Carmel Christian - Sports - 247Sports Recruiting Rankings.md`*

# Carmel Christian — Sports — 247Sports Recruiting Rankings

**Provenance.** Captured 2026-10-26 during `/plan recruitranks` by fetching 247Sports' public
North Carolina state recruiting lists (HTTP GET, no login; each list page carries national,
position and state rank, stars, composite score, listed high school and commitment per row).
Every football and basketball athlete on this school's College Pipeline roster
(`src/data/sportsPrograms/carmel-christian.ts`, `pipeline.roster`) was matched by normalised name
(suffixes Jr./III dropped, punctuation stripped) AND graduating class, then accepted only if
247's listed high school is this school. **The app shows the 247Sports Composite** (user
decision 2026-10-26); the 247Sports in-house figures are recorded alongside for audit only.
Classes 2024–2026 are final (all signed and enrolled), so these ranks no longer move.

"NA" national rank = 247 publishes a state rank but no national rank for that player.
Sports other than football and basketball are not ranked by 247Sports and are out of scope.

## Recruiting rankings — matched athletes (247Sports Composite)

None. No football or basketball athlete on this roster appears on a 247Sports NC state list for their class.

## Recruiting rankings — held back (listed school does not match)

Name and class match a 247 NC list row, but 247 lists a different high school. NOT shown in the
app until the roster attribution is confirmed (see the plan's Decisions).

- Bryce Slay ('25, Basketball → Marshall): Composite NC #16, national 328, 3★ 0.8700; 247 lists **United Faith Christian Academy (Charlotte, NC)**, commit Marshall. https://247sports.com/player/bryce-slay-46144139/

## Recruiting rankings — not on a 247Sports NC list (unrated)

Searched by name across the NC lists for 2023–2027 (football, basketball, women's basketball).
Absence means 247 published no rating for the player (typical for walk-ons, D2/D3 commits and
girls' basketball, where 247 ranks only 0–2 NC players per class); the app shows a dash.

- '26 Jordan Buzzard — Basketball → Coastal Carolina (D1)
- '26 Logan Johnson — Basketball → UNC Asheville (D1)
- '25 Braylen Bowman — Basketball → UNC Greensboro (D1)
- '24 Kam Taylor — Basketball → UNC Asheville (D1)
- '25 Chandler Kennedy — Basketball → Fayetteville State (D2)
- '25 Miles Leaks — Basketball → Johnson & Wales (D3)

## Recruiting rankings — ranked at this school but NOT on our roster

Reverse sweep, classes 2024–2026, Composite lists: 247 lists these players at this school, but
no roster row exists. Leads for a future roster backfill only, NOT shown by this plan; a
247 commit is not proof of enrollment, so confirm against the school's own signing coverage first.

- (none)

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

*Source file: `Carmel Christian - Sports - College Commitments 2024-2026.md`*

# Carmel Christian School — Sports — College Commitments (2024–2026)

> **Provenance:** Compiled by Claude Code on 2026-11-09 during `/athlete-commits
> carmel-christian`. The school's athletics "Next Steps" page is the backbone, read against
> every varsity roster on MaxPreps for 2023-24 through 2026-27, the HighSchoolOT per-sport
> recruiting trackers, RealGM, and each college's own roster. The method and the nulls are
> in `Carmel Christian - Sports - Varsity Roster Cross-Reference 2026.md`. This is the
> designated provenance file for the *Power 4 commits* and *Division I commits* Compare rows
> (`src/data/metricValues.ts`) and for the College Pipeline card
> (`src/data/sportsPrograms/carmel-christian.ts`). It supersedes the "Card 3 — College
> Pipeline" section of `Carmel Christian - Sports - Redesign Research 2026.md`.
>
> **Level classification is by hand:** Power 4 = SEC / Big Ten / ACC / Big 12 only. Counts
> are distinct athletes, and they are a documented minimum.
>
> **Standard applied (same as Cannon, Davidson Day and Covenant Day):** the card counts
> documented commitments to college athletics at any level. D2, D3 and NAIA count.
> "Scholarship" is never claimed. Spirit and dance programs are not intercollegiate sports,
> so they are recorded but not counted.
>
> **Graduate test:** an athlete counts for Carmel only if they finished high school at
> Carmel. Evidence is the athlete's senior season on the Carmel MaxPreps roster, or the
> college roster's "High School / Last School" line. One athlete on the previous card failed
> the test (Jordan Buzzard, below).

## Sources
- Carmel Christian athletics, "Next Steps": the school's own list of every college signee by
 school year, 2013–2025 (read 2026-11-09). It has no 2025-26 section yet:
 https://www.carmelchristianathletics.org/inside-athletics/next-steps/
- Carmel Christian athletics, "Cougar Athletics celebrate National Signing Day" (2025-11-17;
 Fall Signing Ceremony 14 Nov 2025, covering Johnson, Buzzard and Tarr):
 https://www.carmelchristianathletics.org/cougar-athletics-celebrate-national-signing-day/
- Carmel Christian School news, "James Wood: SUMMER COMMITMENT to West Virginia Tech
 University!" (2026):
 https://www.carmelchristian.org/apps/news/show_news.jsp?REC_ID=1030111&id=0
- MaxPreps Carmel Christian rosters 2023-24 → 2026-27, 14 sport pages × 4 seasons:
 https://www.maxpreps.com/nc/matthews/carmel-christian-cougars/
- HighSchoolOT boys tennis recruiting tracker (Avram → South Carolina and Akers → Johns
 Hopkins in the Class of 2024; Daniels → Anderson in the Class of 2025):
 https://www.highschoolot.com/story/north-carolina-high-school-boys-tennis-recruiting-tracker/21296827/
- HighSchoolOT baseball recruiting tracker (lists Landon Boyd → Florida International; see
 the Boyd note below):
 https://www.highschoolot.com/story/north-carolina-high-school-baseball-recruiting-tracker/21296816/
- RealGM — Carmel Christian School (Matthews) players, HS grad year and college (read in
 Chrome 2026-11-09):
 https://basketball.realgm.com/highschool/teams/13665/Carmel-Christian-School-NC/players
- South Carolina men's tennis roster — Gabe Avram, Junior, Charlotte, NC / Carmel Christian:
 https://gamecocksonline.com/sports/mten/roster/
- Johns Hopkins men's tennis 2024-25 — Owen Akers, Fr., Matthews, NC / Carmel Christian
 School: https://hopkinssports.com/sports/mens-tennis/roster/2024-25
- Randolph-Macon men's golf 2024-25 — Cole Bryant, Fr., Waxhaw, N.C. / Carmel Christian:
 https://www.rmcathletics.com/sports/mens-golf/roster/2024-25
- Hampden-Sydney men's tennis — Ben Price, So., Charlotte, NC / Carmel Christian:
 https://hscathletics.com/sports/mens-tennis/roster
- Queens University of Charlotte men's tennis — Mark Agafanov (roster spelling), Fr.,
 Charlotte, N.C. / Carmel Christian HS: https://queensathletics.com/sports/mten/roster
- Bluefield State baseball 2026 — David Rodriguez, Fr., C, Indian Trail, NC / "Caramel
 Christian School" (sic): https://gobstate.com/sports/baseball/roster/david-rodriguez/2990
- Ferrum baseball 2026 — Anderson Rider, Fr., Charlotte, N.C. / Carmel Christian School:
 https://ferrumpanthers.com/sports/baseball/roster/2026
- WVU Tech men's basketball — James Wood, FR, G/F, Harrisburg, NC / Carmel Christian High
 School: https://goldenbearathletics.com/sports/mens-basketball/roster
- UNC Asheville men's basketball — Logan Johnson, Fr., Charlotte, N.C. / Last School Carmel
 Christian: https://uncabulldogs.com/sports/mens-basketball/roster
- Perfect Game — Landon Boyd, 2025 grad, Carmel Christian, committed South Carolina Aiken:
 https://www.perfectgame.org/Players/Playerprofile.aspx?ID=924871
- Coastal Carolina signing release, 2025-11-17 (Buzzard; see *Excluded*):
 https://goccusports.com/news/2025/11/17/mens-basketball-signs-two-prep-standouts.aspx
- Coastal Carolina 2026-27 roster — Jordan Buzzard, Last School East Mecklenburg:
 https://goccusports.com/sports/mens-basketball/roster/jordan-buzzard/22450
- MaxPreps East Mecklenburg basketball 2025-26 — Jordan Buzzard, Sr.:
 https://www.maxpreps.com/nc/charlotte/east-mecklenburg-eagles/basketball/25-26/roster/
- Tarleton State men's basketball — Brett Freeman, Ardrey Kell HS (see *Excluded*):
 https://tarletonsports.com/sports/mens-basketball/roster

## Class of 2024 — 5 athletes

| Athlete | Sport | College | Conf | Level | Confirmed by |
|---|---|---|---|---|---|
| Gabe Avram | Tennis | South Carolina | SEC | **P4** | Next Steps (2023-24); HighSchoolOT tennis tracker (D1, Class of 2024); South Carolina roster ("Carmel Christian") |
| Kam Taylor | Basketball | UNC Asheville | Big South | D1 | Next Steps (2023-24); MaxPreps Sr. 2023-24; RealGM (2024). Later transferred to Florida State |
| Jazmyne Slay | Volleyball | Winston-Salem State | CIAA | D2 | Next Steps (2023-24); MaxPreps Sr. 2023-24. **Class corrected from '25 to '24.** Not found on WSSU's 2024 or 2025 roster, so this row rests on the school's list alone |
| Owen Akers | Tennis | Johns Hopkins | Centennial | D3 | Next Steps (2023-24); HighSchoolOT tennis tracker; JHU 2024-25 roster ("Carmel Christian School") |
| Cole Bryant | Golf | Randolph-Macon | ODAC | D3 | Next Steps (2023-24); R-MC 2024-25 roster ("Carmel Christian") |

HighSchoolOT marks Avram and Akers with "*", which means they did not play HS varsity in
their last three years but were all-state earlier. That is why neither appears on Carmel's
MaxPreps tennis roster. Both college rosters name Carmel Christian as their high school, so
both pass the graduate test.

## Class of 2025 — 12 athletes

| Athlete | Sport | College | Conf | Level | Confirmed by |
|---|---|---|---|---|---|
| Bryce Slay | Basketball | Marshall | Sun Belt | D1 | Next Steps (2024-25); MaxPreps Sr. 2024-25; RealGM |
| Braylen Bowman | Basketball | UNC Greensboro | Southern | D1 | Next Steps; MaxPreps Sr. 2024-25; RealGM. **Conf corrected: Big South → Southern (SoCon)** |
| Mark Agafonov | Tennis | Queens University of Charlotte | ASUN | D1 | Next Steps; MaxPreps Sr. 2024-25; Queens roster (spelled "Agafanov"). School spelling kept |
| Landon Boyd | Baseball | USC Aiken | Peach Belt | D2 | Next Steps; Perfect Game; MaxPreps Sr. 2024-25. Not on USC Aiken's 2025 or 2026 roster. HighSchoolOT's "Florida International" is contradicted by both school and PG |
| Chandler Kennedy | Basketball | Fayetteville State | CIAA | D2 | Next Steps; MaxPreps Sr.; RealGM |
| David Rodriguez | Baseball | Bluefield State | CIAA | D2 | Next Steps; MaxPreps Sr. 2024-25; Bluefield State 2026 roster |
| Sienna Jauch | Golf | North Greenville | Conference Carolinas | D2 | Next Steps; MaxPreps Jr. 2023-24 (girls golf) |
| Noah Daniels | Tennis | Anderson (SC) | SAC | D2 | Next Steps; HighSchoolOT tennis tracker (D2, Class of 2025); MaxPreps Sr. 2024-25 |
| Christopher Grace | Tennis | Anderson (SC) | SAC | D2 | Next Steps; MaxPreps Sr. 2024-25 (tennis and soccer) |
| Anderson Rider | Baseball | Ferrum | ODAC | D3 | Next Steps; MaxPreps Sr.; Ferrum 2026 roster |
| Miles Leaks | Basketball | Johnson & Wales (Charlotte) | C2C | D3 | Next Steps; MaxPreps Sr.; RealGM "Johnson & Wales (NC)". **Conf corrected: GNAC → C2C** (GNAC is the Providence campus; the Charlotte Wildcats play in the Coast-to-Coast Athletic Conference) |
| Ben Price | Tennis | Hampden-Sydney | ODAC | D3 | Next Steps; MaxPreps Sr. 2024-25; H-SC roster ("Carmel Christian") |

Not counted: **Audrey Bucey** — "University of South Carolina — Dance" on Next Steps. A
dance team is a spirit program, not an intercollegiate sport, and counting it would make it
a Power 4 row. This is recorded here so a later pass sees the decision.

## Class of 2026 — 3 athletes

| Athlete | Sport | College | Conf | Level | Confirmed by |
|---|---|---|---|---|---|
| Logan Johnson | Basketball | UNC Asheville | Big South | D1 | School signing post (Nov 2025); MaxPreps Sr. 2025-26; UNCA roster (Last School Carmel Christian) |
| Caden Tarr | Baseball | Lander | Peach Belt | D2 | School signing post (Nov 2025, "commitment to play baseball at Lander University"); MaxPreps Sr. 2025-26. Joins for the 2027 season, so there is no roster yet |
| James Wood | Basketball | WVU Tech | NAIA | NAIA | School news post ("SUMMER COMMITMENT to West Virginia Tech University"); MaxPreps Sr. 2025-26 basketball; WVU Tech roster (FR, Carmel Christian High School) |

The school's "Next Steps" page has no 2025-26 section yet. The announced Spring Signing
Ceremony was not published as a post.

## Totals → app metric values

| | Before (card) | After |
|---|---|---|
| Committed to college athletics, 2024–26 | `12+` | **20** (5 + 12 + 3) |
| NCAA Division I | 5 | **6** — Avram, Taylor, B. Slay, Bowman, Agafonov, Johnson |
| Power 4 | 0 | **1** — Avram (South Carolina, SEC) |
| `p4-commits-2426` | `'0'` | **`'1'`** |
| `d1-commits-2426` | `'5'` | **`'6'`** |
| `seniors-committed` | `'0'` | `'0'` (see the Class of 2027 file) |

D1 by sport: Basketball 4 · Tennis 2.
All levels by sport: Basketball 7 · Tennis 6 · Baseball 4 · Golf 2 · Volleyball 1.
By level: P4 1 · D1 (non-P4) 5 · D2 8 · D3 5 · NAIA 1.

## Class of 2027 (current seniors) — appendix

No public commitment as of 2026-11-09. See `Carmel Christian - Sports - College Commitments
Class of 2027.md`, which is provisional until the early signing period (opens 2026-11-11).

## Excluded

| Lead | Source | Why |
|---|---|---|
| **Jordan Buzzard** — Coastal Carolina (Class of 2026, on the previous card) | Carmel's own Nov 2025 signing post; Coastal's Nov 2025 release ("enrolled at Carmel Christian School for his senior year") | **Fails the graduate test.** Coastal's roster bio lists his Last School as East Mecklenburg and calls him a four-year letterman there. MaxPreps lists him as an East Meck senior in 2025-26, and he is absent from Carmel's 2025-26 roster. Phenom Hoop Report describes him "after returning to East Meck". He signed while enrolled at Carmel but finished high school at East Mecklenburg |
| Cody Peck — Dayton | RealGM (2026) | Two seasons at Carmel, graduated elsewhere (already excluded by the dossier) |
| Brett Freeman — Tarleton State | RealGM (2025) | Tarleton's roster gives his high school as Ardrey Kell, and he is not on any Carmel MaxPreps roster |
| Ian Howard — Gaston CC | RealGM (2025) | Not on Carmel's 2024-25 roster and absent from Next Steps |
| Elijah Green — William Peace | RealGM (2024) | Not on Carmel's 2023-24 roster. Covenant Day's card already holds him as a Covenant graduate |
| Michael Marcus Jr. — George Mason | RealGM (2024) | Not on Carmel's 2023-24 roster. He is a Covenant Day graduate on that school's card |
| Jaeden Mustaf — Georgia Tech → Indiana | RealGM (2024) | Not on Carmel's 2023-24 roster, and the dossier already flagged that he graduated elsewhere |
| Landon Boyd — Florida International | HighSchoolOT baseball tracker | Contradicted by the school's list and Perfect Game (USC Aiken). The row stays at USC Aiken |
| Audrey Bucey — South Carolina (dance) | Next Steps | Not an intercollegiate sport (see above) |


---

## College Commitments Class of 2027

*Source file: `Carmel Christian - Sports - College Commitments Class of 2027.md`*

# Carmel Christian — Sports — College Commitments, Class of 2027 (current seniors)

> **Provenance:** Written by Claude Code on 2026-11-08 during `/implement seniorsrow`. The
> **per-class retention file** the `/athlete-commits` skill keeps for the current senior
> class — every public commitment, verbal or signed, any level, with sources. It is the value
> of the `seniors-committed` Compare row and is promoted into the 2024–26 window file when the
> window rolls after graduation (from 1 June 2027). **Never delete it.**
>
> **Status: 0 confirmed.** RealGM's Carmel Christian page (read in Chrome) lists four 2027
> basketball players with no college; the Bryce Cash / Nyles Howard / Justin Taylor / Logan
> Threatt entries a search surfaced are Classes of 2022–2023.
>
> Verbal commitments are listed, never counted in `p4-commits-2426` / `d1-commits-2426`.
> **Two-source rule:** a row needs the college's or school's own announcement, or two
> independent published sources; anything else is a lead.

## Sweep record (2026-11-08)
Searched: the 17 HighSchoolOT per-sport recruiting trackers (no Class of 2027 entry for any
roster school yet — they fill after the signing periods), the NC Football News 2027 NC
commitment tracker, 247Sports' 2027 NC football and basketball rankings, Team 91 Charlotte's
2027 commitment list (Jan 2026), Ultimate Lacrosse Charlotte and Team 91 Carolina girls'
commitment pages, Prep Baseball Report's NC 2027 coverage, TopDrawerSoccer team pages,
PrepVolleyball's 2027 watchlist, the Charlotte Observer's 2026-11-03 swimming and 2026-11-05
girls basketball previews, RealGM (Chrome) where a team page was reachable, and the school's
own athletics news pages. School-published signing-day posts for the Class of 2027 are not
yet up anywhere: the early signing period opens 2026-11-11. Re-run after it.

## Sweep record (2026-11-09, `/athlete-commits carmel-christian`)
Re-checked during the varsity-roster cross-reference. Sources: all 18 HighSchoolOT trackers
(no Carmel Class of 2027 entry), RealGM in Chrome (four 2027 players, none with a college), the MaxPreps 26-27 rosters
(19 seniors across boys basketball, boys soccer, girls tennis and volleyball), the athletics
WordPress posts and the main-site news slider (no Class of 2027 post). Still **0**, still
provisional: the early signing period opens 2026-11-11, and the school published its Class
of 2026 fall signing post on 2025-11-17. Re-run after this year's equivalent post.

## Confirmed — 0

## Leads
None found.

## Totals for the `seniors-committed` row (as of 2026-11-08)
**0 confirmed** (value `'0'`).


---

## Redesign Research 2026

*Source file: `Carmel Christian - Sports - Redesign Research 2026.md`*

# Carmel Christian School — Sports (Redesign Research 2026)

**Provenance**

- **Compiled by:** Claude Code deep research pass (`/implement add-carmel-christian`).
- **Date compiled:** 2026-08-16
- **Method:** Web sweep constrained to carmelchristian.org, carmelchristianathletics.org,
 MaxPreps, HighSchoolOT, and recruiting/press sources. Every figure copied char-for-char.
- **School:** Carmel Christian School, 1145 Pineville Matthews Road, Matthews, NC 28105.
 NCISAA 4A (was 3A through ~2019). Mascot Cougars. AD Grant Coffey, BEd, CAA.

**Three brief-supplied "known facts" were CORRECTED by primary sources:**
1. **Cody Peck is NOT a Carmel commit** — he played only his first two seasons at Carmel,
 then IMG Academy (junior), then graduated from Davidson Day (senior). Do not list him.
2. **Girls soccer 2026 = RUNNER-UP, not champion** — the athletics-site "2025-26 state
 champions" tag conflicts with the HighSchoolOT 4A final loss 0-2 to Providence Day; treat
 as runner-up unless separately confirmed.
3. **Buzzard & Johnson are Class of 2026 commits**, not 2024/2025.

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://www.carmelchristianathletics.org/inside-athletics/ | Full sports-by-season/level list; AD contact |
| S2 | https://carmelchristian.org/athletics101 | Sports list (confirms co-ed MS golf) |
| S3 | https://www.carmelchristianathletics.org/inside-athletics/next-steps/ | Definitive college-commit roster 2013–2025 (all sports) |
| S4 | https://www.carmelchristianathletics.org/cougar-athletics-celebrate-national-signing-day/ | Class of 2026 signees (Buzzard, Johnson, Tarr) |
| S5 | https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=999101&id=0 | Class of 2026 signing (Buzzard, Johnson) |
| S6 | https://www.highschoolot.com/story/christ-school-edges-carmel-christian-for-ncisaa-4a-boys-basketball-title/20736737/ | 2023 boys basketball 4A final (L 48-53) |
| S7 | https://www.highschoolot.com/story/providence-day-shuts-out-carmel-christian-for-third-straight-ncisaa-4a-girls-soccer-championship/22359052/ | 2026 girls soccer 4A final (L 0-2) |
| S8 | https://www.highschoolot.com/story/carmel-christian-beats-rabun-gap-to-win-4a-soccer-title/19375567/ | 2020 boys soccer 4A title (W 2-0) |
| S9 | https://247sports.com/college/basketball/recruiting/article/cody-peck-commits-to-dayton-flyers-anthony-grant-280079475/ | Cody Peck → Dayton (transferred off Carmel — do NOT count) |
| S10 | https://www.wccbcharlotte.com/2025/08/12/local-high-school-star-athlete-signs-nil-deal-with-national-brand/ | Bryce Slay NIL deal (College HUNKS) |
| S11 | https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=980022&id=0 | Carmel's own Bryce Slay NIL alumnus article |
| S12 | https://goccusports.com/news/2025/11/17/mens-basketball-signs-two-prep-standouts.aspx | Jordan Buzzard → Coastal Carolina bio |
| S15 | https://www.maxpreps.com/nc/matthews/carmel-christian-cougars/basketball/history/ | Boys basketball season records |
| S16 | Yahoo/CBS/247 (Cade Tyson) | 2022 4A basketball title 71-66 over Greensboro Day; Mr. Basketball |

## Metrics

| Metric | Value | Source |
| --- | --- | --- |
| Distinct sports | 9 (Baseball, Basketball, Cheer, Cross Country, Golf, Soccer, Swim, Tennis, Volleyball) | S1, S2 |
| Team-units across levels | ~28 (V/JV/MS) | S1 |
| **Division I commits 2024–26** | **5** (all basketball, all mid-major) | S3, S4 |
| **Power 4 commits 2024–26** | **0** | S3, S4 |
| NCISAA titles (recent) | Boys basketball 2019 (3A), 2022 (4A); boys soccer 2020 (4A); boys tennis 2025 (4A) | S6, S8, S16 |

## Card 1 — Sports Offered (S1, S2)

**FALL:** Cross Country (co-ed: V, MS) · Golf Girls (V) · Soccer Boys (V, JV, MS) · Tennis
Girls (V) · Volleyball Girls (V, JV, MS).
**WINTER:** Basketball Boys (V, JV, MS — MS split "Blue & Gold") · Basketball Girls (V, MS)
· Cheer (V, MS) · Swim (V, MS).
**SPRING:** Baseball (V, JV, MS) · Golf Boys (V), Golf co-ed (MS) · Soccer Girls (V, JV,
MS) · Tennis Boys (V, MS).

No football, lacrosse, or track on the current offered list.

## Card 2 — Winning Record & Championships

**Titles won:**
- **Boys Basketball 2019 NCISAA 3A champion** (school + multiple sources; described as
 back-to-back 2018 & 2019). Beat Village Christian Academy 65-64, Feb 23 2019 at Ravenscroft.
- **Boys Basketball 2022 NCISAA 4A champion** — def. Greensboro Day 71-66, Feb 26 2022 at
 Wingate; Cade Tyson 31 pts (S16).
- **Boys Soccer 2020 NCISAA 4A champion** — def. Rabun Gap-Nacoochee 2-0; Carmel 14-1 (S8).
- **Boys Tennis 2025 NCISAA 4A champion** — def. Charlotte Latin 5-1, May 17 2025 at Providence Day; Carmel 17-0.

**Runner-up / finals losses:**
- Boys Basketball 2021 4A final, L 85-94 to Cannon (Feb 27 2021).
- Boys Basketball 2023 4A final, L 48-53 to Christ School (Feb 25 2023); Carmel 28-4 (S6).
- Boys Basketball 2025 4A final, L to Christ School (Christ School 3-peated). L 50-73 (Feb 22 2025).
- Boys Soccer 2019 3A final, L to Coastal Christian; 2021 4A final L 1-0 Rabun Gap; 2022 4A
 final L 1-0 Rabun Gap (four straight finals 2019–2022, winning 2020).
- **Girls Soccer 2026 4A final, L 0-2 to Providence Day** (May 16 2026); Carmel 14-5 (S7).

**Boys basketball season records (S15):** 2021-22 26-3; 2022-23 28-4; 2016-17 21-6;
2015-16 22-8.

## Card 3 — College Pipeline

> **Superseded 2026-11-09** by `Carmel Christian - Sports - College Commitments 2024-2026.md`
> (the athlete-level record: 20 committed / 6 D1 / 1 Power 4) and `Carmel Christian - Sports
> - Varsity Roster Cross-Reference 2026.md` (method and nulls). The section below is kept as
> the earlier pass. Two of its claims no longer hold: Jordan Buzzard finished high school at
> East Mecklenburg, and Power 4 is 1 (Gabe Avram '24, South Carolina tennis).

Definitive source: the athletics "Next Steps" roster (S3), all signees by year.

**Division I 2024–26 (5, all basketball):**
- Kam Taylor — UNC Asheville (Big South) — '24 (later transferred to Florida State/ACC).
- Bryce Slay — Marshall (Sun Belt) — '25.
- Braylen Bowman — UNC Greensboro (Big South) — '25.
- Jordan Buzzard — Coastal Carolina (Sun Belt) — '26 (6'8", transferred in from East Meck).
- Logan Johnson — UNC Asheville (Big South) — '26.

**Power 4 2024–26: 0.** No SEC/B1G/B12/ACC or Notre Dame commit. (Kam Taylor reached the
ACC only later via the transfer portal, not as a Carmel signee.)

Other recent signees (non-D1, from S3): baseball Caden Tarr (Lander, D2), Anderson Rider
(Ferrum, D3), Landon Boyd (USC Aiken, D2); basketball Chandler Kennedy (Fayetteville State,
D2), Miles Leaks (Johnson & Wales, D3); volleyball Jazmyne Slay (Winston-Salem State, D2);
plus golf/tennis/dance signees.

## Card 4 — Honors & Pro Alumni

**No confirmed professional athlete** who attended Carmel — pros = none confirmed. Notable
high-major/recruiting alumni:
- **Cade Tyson** ('22) — 2022 NC Mr. Basketball; 24.0 ppg senior, 31 in the title game.
 Belmont → UNC → Minnesota; 2026 NBA G League Draft Combine / Portsmouth invitee (draft
 prospect, not yet pro).
- **Jaeden Mustaf** — all-state at Carmel; led 2022-23 team to 28-4 & the state final;
 Georgia Tech → Indiana (Apr 2026). Son of ex-NBA Jerrod Mustaf. *Transferred from DeMatha;
 graduating school unclear — TO VERIFY whether he graduated from Carmel.*
- **Kam Taylor** — first-team All-Big South (18.9 ppg soph); UNCA → Florida State.
- **Cody Peck** — 6'10", 4-star, top-100 → Dayton, but **only 2 seasons at Carmel, graduated
 elsewhere. DO NOT count as a Carmel commit.**

## Card 5 — Coaching

- AD **Grant Coffey, BEd, CAA** (coffeyg@carmelchristian.org).
- **Head-coach names, tenures, records: NOT PUBLISHED** on the pages fetched (a coaches
 directory is referenced but lists no names). TO VERIFY on a deeper pass.

## Card 6 — Facilities

**Largely NOT PUBLISHED.** No named gyms/fields/weight-room/athletic-training detail on the
athletics pages. Photo galleries reference hosting NCISAA D1 swimming championships and a 4A
basketball semifinal on campus (implies competition-grade gym + pool), but no facility is
named. Thin card — TO VERIFY (capital-campaign pages, campus map, Form 990).

## Card 7 — National Stage & NIL

- **Bryce Slay NIL deal** — Class of 2025 basketball alumnus signed his first NIL deal with
 **College HUNKS** (College Hunks Hauling Junk & Moving), announced **August 12, 2025**;
 "among the first Charlotte high school graduates to secure such an agreement." No dollar
 figure disclosed. Initiated by parents Tamar (ex-Charlotte Bobcats) & Celeste Slay. Slay
 committed to Marshall. Carmel ran an alumnus feature (S10, S11).
- **National-poll ranking: NOT PUBLISHED / TO VERIFY.** NCISAA 4A (top division); national
 visibility via Tyson/Mustaf/Peck recruiting profiles, but no team national ranking confirmed.

## Flags

- Girls soccer "2025-26 state champions" (athletics tag) vs 2026 4A final loss — resolved:
 **RUNNER-UP** on both the NCISAA bracket and the Wells Fargo Cup totals.
- 2019 & 2025 basketball finals: both verified on the NCISAA brackets (see Card 2).
- **Cody Peck must NOT be listed as a Carmel commit.**
- Head-coach names and facilities: thin — deeper pass warranted before include/omit for
 cards 5 and 6.
- Pro alumni: none confirmed (Cade Tyson is a draft prospect, not yet pro).


---

## Varsity Roster Cross-Reference 2026

*Source file: `Carmel Christian - Sports - Varsity Roster Cross-Reference 2026.md`*

# Carmel Christian School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Research record written by Claude Code on 2026-11-09 during
> `/athlete-commits carmel-christian`. It documents *how* the College Pipeline roster was
> re-checked and *what was searched and found empty*, so a later pass does not redo the
> work. The athlete-level results are in `Carmel Christian - Sports - College Commitments
> 2024-2026.md`; this file holds the method and the nulls. It is provenance for the pipeline
> card, not a card of its own (`src/lib/metrics.ts` folds it onto the research dossier via
> `/roster cross-reference/i`).
>
> **Names policy:** only athletes with a documented college commitment, and the leads that
> were ruled out, are named. Current students without a commitment are recorded as counts.

## Result in one line

12+ → **20** committed, 5 → **6** Division I, Power 4 0 → **1**. The previous card used the
school's "Next Steps" list as "a representative sample". Reading all of it, against
MaxPreps and the college rosters, adds nine athletes. One of them is a Power 4 tennis signee
(Gabe Avram '24, South Carolina) and another a D1 (Mark Agafonov '25, Queens). James Wood
'26 (WVU Tech, NAIA) comes from the school's main-site news. One D1 row is removed: Jordan
Buzzard (Coastal Carolina) finished high school at East Mecklenburg. Three rows are
corrected: Slay's class, and the UNCG and Johnson & Wales conferences.

## Scope

Every varsity sport the school fields, from the athletics site's team menu: cross country
(boys and girls), girls golf, boys soccer, girls tennis, volleyball, boys and girls
basketball, cheer, swimming, baseball, boys golf, girls soccer and boys tennis. Carmel
fields **no football and no lacrosse** (neither is in the team menu or on MaxPreps), so the
NC Football News trackers and LaxNumbers did not apply.

Depth by tier:
- **Full per-name cross-reference** (rosters + commitment database + college roster):
 boys basketball, baseball, boys and girls tennis, volleyball, boys and girls soccer.
- **School list + MaxPreps + grouped searches + college roster check:** golf, cross
 country, swimming, girls basketball.
- **School list only:** cheer (no roster, no database).

## Step 1 — the school's own pages (read 2026-11-09)

**Next Steps** (`https://www.carmelchristianathletics.org/inside-athletics/next-steps/`):
server-rendered WordPress, curl works. Every signee by school year, 2013-14 → 2024-25. The
2023-24 section has 5 names and 2024-25 has 13. **There is no 2025-26 section.** This is
the strongest source the school publishes. The previous card used 11 of its names as a
sample.

**Athletics news** (WordPress REST API, `/wp-json/wp/v2/posts`, 18 posts back to Sep 2025):
one signing post, "Cougar Athletics celebrate National Signing Day" (2025-11-17), naming
Johnson, Buzzard and Tarr. The season reviews (fall 2025, winter and spring 2026) name no
commitments.

**Main school site news** (`https://www.carmelchristian.org/`, homepage news slider): "CLASS
OF 2026 ATHLETIC SIGNING — Congratulations, Jordan and Logan!" and "James Wood — SUMMER
COMMITMENT to West Virginia Tech University!" (REC_ID 1030111). The paginated news index
did not page under curl, so only the slider items were read.

## Step 2 — MaxPreps rosters by season

`https://www.maxpreps.com/nc/matthews/carmel-christian-cougars/<sport>/<yy-yy>/roster/` —
HTTP 200 with a browser UA, path form. 14 sport slugs × 4 seasons (23-24 → 26-27) = 56
pages.

Rosters with data in at least three seasons: baseball, boys basketball, boys soccer, girls
soccer (`soccer/girls/spring`), boys tennis, girls tennis, volleyball. **Only 2023-24 has
data** for cross country (both), girls golf, boys golf (`golf/spring`), and swimming (both).
Girls basketball 404s for 23-24 and 24-25 (the school says it fielded no team then) and has
one senior in 25-26. Spring 26-27 rosters are not posted yet.

The MaxPreps 25-26 boys basketball roster omits Jordan Buzzard, consistent with his return
to East Mecklenburg.

Seniors (`Sr.`) by season: **2023-24** — 49 across 11 rosters (cross country 16, volleyball
9, baseball 5, boys soccer 6, girls soccer 5, girls golf 4, …); **2024-25** — 36; **2025-26**
— 41; **2026-27** (current, fall/winter posted) — 19. Several athletes appear in two or
three sports.

## Step 3 — cross-reference

**HighSchoolOT trackers.** All 18 per-sport trackers plus the three "Building the Fence"
in-state football pages and the three out-of-state roundups (hub:
https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/).
Carmel Christian hits:
- Boys tennis: Gabe Avram (2024, South Carolina), Owen Akers (2024, Johns Hopkins), Noah
 Daniels (2025, Anderson).
- Baseball: Landon Boyd (Florida International; ruled out).

There are no Carmel hits in the basketball, golf, soccer, swimming or volleyball trackers,
and no Class of 2027 entries.

**RealGM** (Chrome): `https://basketball.realgm.com/highschool/teams/13665/Carmel-Christian-School-NC/players`,
74 players. In window with a college: Taylor, Bowman, B. Slay, Kennedy, Leaks (all on the
card). The leads Green, Marcus, Mustaf, Freeman, Howard and Peck were all ruled out.
Without a college: 2024 — 1; 2025 — 7; 2026 — 3; 2027 — 4. Buzzard, Johnson and Wood are
not on RealGM.

**College rosters checked (graduate test):** South Carolina men's tennis (current), Johns
Hopkins men's tennis 2024-25, Queens men's tennis, Randolph-Macon men's golf 2024-25,
Hampden-Sydney men's tennis, Bluefield State baseball 2026, Ferrum baseball 2026, USC Aiken
baseball 2025 and 2026 (Boyd absent), FIU baseball 2026 (Boyd absent), Lander baseball
(Tarr not yet enrolled), Winston-Salem State volleyball 2024 and 2025 (Slay absent), WVU
Tech men's basketball, Coastal Carolina men's basketball 2026-27 plus its release, UNC
Asheville men's basketball, and Tarleton State men's basketball.

**Not reachable:** North Greenville women's golf (no response to curl; the domain is not
permitted in the Chrome extension), Anderson men's tennis (an empty shell to curl and
WebFetch; not permitted in Chrome). Jauch, Daniels and Grace therefore rest on the school's
list, with HighSchoolOT as a second source for Daniels.

**Other sources:** Perfect Game (Boyd → USC Aiken). Prep Baseball Report search found no
Class of 2026 Carmel commit. A SwimSwam / Swimming World search found no Carmel Christian
swimmer. PrepVolleyball search found no Carmel page.

## Ruled out

| Lead | Source | Why |
|---|---|---|
| Jordan Buzzard — Coastal Carolina ('26) | School signing post; Coastal release | Finished high school at East Mecklenburg (Coastal roster bio, MaxPreps East Meck 25-26 Sr., Phenom Hoop Report) |
| Brett Freeman — Tarleton State ('25) | RealGM | Tarleton roster: Ardrey Kell HS |
| Ian Howard — Gaston CC ('25) | RealGM | Not on Carmel's 24-25 roster, absent from Next Steps |
| Elijah Green — William Peace ('24) | RealGM | Not on Carmel's 23-24 roster; a Covenant Day graduate |
| Michael Marcus Jr. — George Mason ('24) | RealGM | Not on Carmel's 23-24 roster; a Covenant Day graduate |
| Jaeden Mustaf — Georgia Tech ('24) | RealGM | Not on Carmel's 23-24 roster |
| Cody Peck — Dayton ('26) | RealGM | Graduated elsewhere |
| Landon Boyd → Florida International | HighSchoolOT baseball tracker | School list and Perfect Game both say USC Aiken |
| Audrey Bucey — South Carolina dance ('25) | Next Steps | Dance team is not an intercollegiate sport; not counted |

## Nulls (searched, nothing found)

- **Boys basketball** 2024–26: RealGM's full list and the HighSchoolOT tracker found nothing
 beyond the rows. Seven 2025 and three 2026 graduates have no college on RealGM.
- **Baseball** 2024–26 (5 + 4 + 6 seniors): school list, HighSchoolOT, PBR and grouped
 searches found only Boyd, Rider, Rodriguez and Tarr.
- **Boys soccer** 2024–26 (6 + 11 + 10 seniors): school list (no soccer signee since the
 Class of 2023), HighSchoolOT tracker and grouped searches found none.
- **Girls soccer** 2024–26 (5 + 3 + 7 seniors): school list, HighSchoolOT tracker and
 grouped searches found none.
- **Volleyball** 2024–26 (9 + 4 + 7 seniors): school list and HighSchoolOT tracker found
 only Slay.
- **Tennis** (boys 1 + 5 + 1, girls 2 + 0 + 3 seniors): every name is from the school list
 and HighSchoolOT. No girls tennis signee.
- **Golf, cross country, swimming:** school list (Bryant, Jauch). HighSchoolOT trackers and
 a SwimSwam search found none.
- **Girls basketball** (1 senior, 2025-26): none.

## Unchecked (could not be retrieved)

- **Golf, cross country and swimming rosters for 2024-25 → 2026-27** (empty on MaxPreps).
 These are covered by the school's own Next Steps list, which is complete through 2024-25.
- **Class of 2026 non-basketball signees beyond Tarr.** The school announced a Spring
 Signing Ceremony but published no post, and Next Steps has no 2025-26 section yet. Treat
 the Class of 2026 count (3) as a floor and re-read Next Steps when it is updated.
- **Cheer:** no roster or database.

## Class of 2027 (current seniors)

19 seniors on the posted 26-27 rosters, plus juniors on the spring 25-26 rosters. RealGM
lists four 2027 basketball players with no college. No public commitment was found in any
source above, and no signing post is up. This is recorded in `Carmel Christian - Sports -
College Commitments Class of 2027.md`; it is **provisional, so re-run after the 2026-11-11
early signing period**.


---

## Wells Fargo Cup Standings 2020-2026

*Source file: `Carmel Christian - Sports - Wells Fargo Cup Standings 2020-2026.md`*

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


---

## Sources referenced across these documents

- https://247sports.com/college/basketball/recruiting/article/cody-peck-commits-to-dayton-flyers-anthony-grant-280079475/
- https://247sports.com/player/bryce-slay-46144139/
- https://247sports.com/season/<year>-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-football/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-football/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-womens-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-womens-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://archives.ncisaa.org/
- https://archives.ncisaa.org/index.php?sport=13&years=2017-2018
- https://archives.ncisaa.org/index.php?sport=13&years=2018-2019
- https://archives.ncisaa.org/index.php?sport=13&years=2020-2021
- https://archives.ncisaa.org/index.php?sport=13&years=2021-2022
- https://archives.ncisaa.org/index.php?sport=13&years=2022-2023
- https://archives.ncisaa.org/index.php?sport=13&years=2024-2025
- https://archives.ncisaa.org/index.php?sport=16&years=2024-2025
- https://archives.ncisaa.org/index.php?sport=17&years=2025-2026
- https://archives.ncisaa.org/index.php?sport=8&years=2019-2020
- https://archives.ncisaa.org/index.php?sport=8&years=2020-2021
- https://archives.ncisaa.org/index.php?sport=8&years=2021-2022
- https://archives.ncisaa.org/index.php?sport=8&years=2022-2023
- https://basketball.realgm.com/highschool/teams/13665/Carmel-Christian-School-NC/players
- https://basketball.realgm.com/highschool/teams/13665/Carmel-Christian-School-NC/players`
- https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=980022&id=0
- https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=999101&id=0
- https://carmelchristian.org/athletics101
- https://ferrumpanthers.com/sports/baseball/roster/2026
- https://gamecocksonline.com/sports/mten/roster/
- https://gobstate.com/sports/baseball/roster/david-rodriguez/2990
- https://goccusports.com/news/2025/11/17/mens-basketball-signs-two-prep-standouts.aspx
- https://goccusports.com/sports/mens-basketball/roster/jordan-buzzard/22450
- https://goldenbearathletics.com/sports/mens-basketball/roster
- https://hopkinssports.com/sports/mens-tennis/roster/2024-25
- https://hscathletics.com/sports/mens-tennis/roster
- https://queensathletics.com/sports/mten/roster
- https://tarletonsports.com/sports/mens-basketball/roster
- https://uncabulldogs.com/sports/mens-basketball/roster
- https://www.carmelchristian.org/`
- https://www.carmelchristian.org/apps/news/show_news.jsp?REC_ID=1030111&id=0
- https://www.carmelchristianathletics.org/cougar-athletics-celebrate-national-signing-day/
- https://www.carmelchristianathletics.org/inside-athletics/
- https://www.carmelchristianathletics.org/inside-athletics/next-steps/
- https://www.carmelchristianathletics.org/inside-athletics/next-steps/`
- https://www.carmelchristianathletics.org/spring-teams/tennis-boys/
- https://www.highschoolot.com/story/carmel-christian-beats-rabun-gap-to-win-4a-soccer-title/19375567/
- https://www.highschoolot.com/story/christ-school-edges-carmel-christian-for-ncisaa-4a-boys-basketball-title/20736737/
- https://www.highschoolot.com/story/north-carolina-high-school-baseball-recruiting-tracker/21296816/
- https://www.highschoolot.com/story/north-carolina-high-school-boys-tennis-recruiting-tracker/21296827/
- https://www.highschoolot.com/story/providence-day-shuts-out-carmel-christian-for-third-straight-ncisaa-4a-girls-soccer-championship/22359052/
- https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/
- https://www.maxpreps.com/nc/charlotte/east-mecklenburg-eagles/basketball/25-26/roster/
- https://www.maxpreps.com/nc/matthews/carmel-christian-cougars/
- https://www.maxpreps.com/nc/matthews/carmel-christian-cougars/<sport>/<yy-yy>/roster/`
- https://www.maxpreps.com/nc/matthews/carmel-christian-cougars/basketball/history/
- https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- https://www.ncisaa.org/recognition/wells-fargo-cup/history/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- https://www.ncisaa.org/sports/
- https://www.perfectgame.org/Players/Playerprofile.aspx?ID=924871
- https://www.rmcathletics.com/sports/mens-golf/roster/2024-25
- https://www.wccbcharlotte.com/2025/08/12/local-high-school-star-athlete-signs-nil-deal-with-national-brand/
