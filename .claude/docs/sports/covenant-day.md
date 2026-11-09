# Covenant Day School — Sports
> Distilled from 19 source document(s) in `source-material/sports/covenant-day/`. Auto-extracted full text, lightly cleaned. Rebuilt 2026-11-09.
**Documents:** College Commitments Class of 2027, 247Sports Recruiting Rankings, Awards and Honors, Championships, Coaches Pedigree and Continuity, College Commitments 2024-2026, Facilities and Infrastructure, NIL Landscape, National Profile, Power 4 Offers, Professional Athletes, Redesign Research 2026, Sports Medicine and Performance, Sports Offered, Team Levels (V-JV-MS), Top 100 Recruiting Rankings, Varsity Roster Cross-Reference 2026, Wells Fargo Cup Standings 2020-2026, Win-Loss Records


---

## College Commitments Class of 2027

*Source file: `Covenant Day - Sports - College Commitments Class of 2027.md`*

# Covenant Day — Sports — College Commitments, Class of 2027 (current seniors)

> **Provenance:** Written by Claude Code on 2026-11-08 during `/implement seniorsrow`. The
> **per-class retention file** the `/athlete-commits` skill keeps for the current senior
> class — every public commitment, verbal or signed, any level, with sources. It is the value
> of the `seniors-committed` Compare row and is promoted into the 2024–26 window file when the
> window rolls after graduation (from 1 June 2027). **Never delete it.**
>
> **Status: 0 confirmed.** Covenant publishes a named Lions News post after each signing day
> (the Class of 2026 posts are dated 2025-11-13 and 2026-04-21); the fall 2026 post is not up
> yet.
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

## Sweep record (2026-11-09, `/athlete-commits`)
Re-checked against the varsity-roster cross-reference: 47 Class of 2027 athletes on the
2026-27 MaxPreps rosters (and as juniors in 2025-26) across football, soccer, field
hockey, volleyball, girls tennis, baseball, softball, basketball and boys volleyball. No
public commitment in the 18 HighSchoolOT per-sport trackers, the NC Football News 2027
pages, TopDrawerSoccer, Prep Baseball Report's 2027 profiles or RealGM. Lions News has no
fall 2026 signing post (the early signing period opens 2026-11-11). **Still provisional —
re-run after the November wave.**

## Confirmed — 0

## Leads
None found. TopDrawerSoccer and RealGM list no 2027 Covenant Day commitment.

## Totals for the `seniors-committed` row (as of 2026-11-08)
**0 confirmed** (value `'0'`).


---

## 247Sports Recruiting Rankings

*Source file: `Covenant Day School - Sports - 247Sports Recruiting Rankings.md`*

# Covenant Day School — Sports — 247Sports Recruiting Rankings

**Provenance.** Captured 2026-10-26 during `/plan recruitranks` by fetching 247Sports' public
North Carolina state recruiting lists (HTTP GET, no login; each list page carries national,
position and state rank, stars, composite score, listed high school and commitment per row).
Every football and basketball athlete on this school's College Pipeline roster
(`src/data/sportsPrograms/covenant-day.ts`, `pipeline.roster`) was matched by normalised name
(suffixes Jr./III dropped, punctuation stripped) AND graduating class, then accepted only if
247's listed high school is this school. **The app shows the 247Sports Composite** (user
decision 2026-10-26); the 247Sports in-house figures are recorded alongside for audit only.
Classes 2024–2026 are final (all signed and enrolled), so these ranks no longer move.

"NA" national rank = 247 publishes a state rank but no national rank for that player.
Sports other than football and basketball are not ranked by 247Sports and are out of scope.

## Recruiting rankings — matched athletes (247Sports Composite)

None. No football or basketball athlete on this roster appears on a 247Sports NC state list for their class.

## Recruiting rankings — not on a 247Sports NC list (unrated)

Searched by name across the NC lists for 2023–2027 (football, basketball, women's basketball).
Absence means 247 published no rating for the player (typical for walk-ons, D2/D3 commits and
girls' basketball, where 247 ranks only 0–2 NC players per class); the app shows a dash.

- '24 Michael Marcus Jr — Basketball → Appalachian State (D1)
- '25 Tyler Dennison — Football → Grove City (D3)
- '25 Chris Rivens — Basketball → Guilford (D3)
- '25 Tyree White — Basketball → Hampden-Sydney (D3)
- '26 Douglas Smith — Basketball → Grove City (D3)
- '26 Luke Thompson — Basketball → Macalester (D3)

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

## Awards and Honors

*Source file: `Covenant Day School - Sports - Awards and Honors.md`*

# Covenant Day School — Sports — Awards and Honors

> **Provenance:** Compiled by Claude Code on 2026-08-15 from the school's Lions News
> season-highlight articles and third-party recruiting/roster bios.

### Sources

- 2026 Spring Sports Highlights:
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2026-spring-sports-highlights-1781042195259
- 2025 Fall Sports Highlights:
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2025fallsportshighlights1
- 2024-25 Winter Sports Highlights:
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2024-25-winter-sports-highlights
- 2024 Fall Sports Highlights:
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2024-fall-sports-highlights1
- Louisville field hockey bio (Eaton's NC Player of the Year honors):
 https://gocards.com/sports/field-hockey/roster/emily-eaton/16101

### Named honors, most recent first

**2025-26:**

- Avery Houseton (softball) — **CISAA Conference Player of the Year + NCISAA
 All-State**; also recorded her 1,000th career volleyball dig (1,192 total) and
 earned volleyball All-Conference and All-State honors — a two-sport All-State
 senior.
- Jane Neil (girls soccer) — First Team All-Conference.
- Ethan Welsh (XC) — First Team All-Conference; ran 15:58.7, the second-fastest
 time in CDS history.
- Maggie Shannon (volleyball) — 1,000 career assists (1,029 in three seasons).
- Carlton Huitt (boys tennis, 8th grade) — First Team All-Conference **and
 All-State** as a middle schooler.
- Taylor Barto and Ann Randolph Bryan (field hockey) — All-State.
- Brady Johnson and Chayce Johnson (boys soccer) — All-State.
- All-Conference second teams: Owen Duncan (Fr) and Hunter Kincheloe (Sr) baseball;
 Reed Maier (Sr) and Gabe DeBuhr (Jr) boys golf; Stella Queen (So) and Barrett
 Brooks (Sr) girls soccer; RJ Llaneza (Sr) and Charlotte Llaneza (So) softball
 First Team.

**2024-25:**

- Tyree White (basketball) — 1st Team All-CISAA, NCISAA All-State, NCISAA All-Star
 game selection. Chris Rivens — 1,000+ career points, All-CISAA 2nd Team, NCISAA
 All-Star game.
- Caitlin Kasten (girls XC, sophomore) — won the CISAA **and** NCISAA championship
 meets; **CISAA Runner of the Year**.
- Football — six All-Conference players, four NCISAA All-State, five selected for
 the Gatlinburg All-American Bowl.
- Taylor Barto (field hockey, 8th grade) — First Team All-Conference + All-State.
- Anna Milheim (swimming, freshman) — 4th in the 200-yard medley and 5th in the
 100-yard breaststroke at the CISAA championships.

**Alumni benchmark:** Emily Eaton ('24) — 2023 NCISAA **Player of the Year**,
Charlotte Observer Offensive Player of the Year, Max Field Hockey NC Player of the
Year; CDS's all-time leading field hockey goal scorer (18 goals led the state in
2023); three-time all-state.


---

## Championships

*Source file: `Covenant Day School - Sports - Championships.md`*

# Covenant Day School — Sports — Championships

> **Provenance:** Compiled by Claude Code on 2026-08-15 from the school's athletics
> pages and Lions News season-highlight articles, corroborated by HighSchoolOT's
> statewide NCISAA champions list.

### Sources

- https://www.covenantday.org/athletics ("26 state championship appearances")
- 2026 Spring Sports Highlights (2026-07-10):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2026-spring-sports-highlights-1781042195259
- 2025 Fall Sports Highlights (2025-12-08):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2025fallsportshighlights1
- 2024 Fall Sports Highlights (2024-12-31):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2024-fall-sports-highlights1
- HighSchoolOT — 2025-26 NCISAA team state champions in every sport:
 https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/
- Louisville field hockey newcomer bio (2022 state runner-up):
 https://gocards.com/news/2024/8/19/meet-the-2024-field-hockey-newcomers

### The ledger

- **"26 state championship appearances"** — the school's cumulative claim since
 athletics began (first graduating class 2006).
- **2025-26: Varsity Softball won the NCISAA 4A State Championship**, defeating
 Cannon — "the first-ever softball CISAA Conference and NCISAA State Championship,
 along with **the first CDS team state championship since 2017**." HighSchoolOT's
 statewide list confirms: Covenant Day (1) — softball, 4A. Softball also won its
 first-ever CISAA conference title (10-1 in conference).
- **2025-26: Varsity Boys Soccer earned the #1 overall seed** in the NCISAA 4A
 tournament and **hosted the State Championship game for the second consecutive
 year** (lost the 2025 final 2-1 to Christ School per the assessment sweep; the
 school's own highlights lead with the seed and hosting).
- **2024-25: first-ever NCISAA 4A State Championship game appearance for Varsity
 Boys Soccer** (2024 Fall highlights).
- **Field hockey: state runner-up 2022** (per Louisville's newcomer bio for CDS
 alumna Emily Eaton); 2025 season reached the NCISAA quarterfinals, taking Providence
 Day to overtime.
- **Volleyball: three consecutive NCISAA 3A state runner-up finishes** (per the
 /add-school assessment sweep of the school's athletics materials; head coach
 Heather Mills' program).
- The "since 2017" phrasing confirms a **2017 team state title** predating the
 current window (sport not named in the article).

### Individual/season honors attached to titles

- Softball 2026: Avery Houseton — Conference Player of the Year and All-State;
 RJ Llaneza and Charlotte Llaneza — First Team All-Conference.
- Cross country 2024: Caitlin Kasten won both the CISAA and NCISAA championship
 meets and was named CISAA Runner of the Year.
- Girls tennis 2025: first-ever **Ashe Cup** win (annual Covenant Day vs. Charlotte
 Christian match trophy).


---

## Coaches Pedigree and Continuity

*Source file: `Covenant Day School - Sports - Coaches Pedigree and Continuity.md`*

# Covenant Day School — Sports — Coaches Pedigree and Continuity

> **Provenance:** Compiled by Claude Code on 2026-08-15 from the school's athletics
> staff page and Lions News coach announcements.

### Sources

- https://www.covenantday.org/athletics (department leadership)
- Mike Freace begins tenure as Athletic Director:
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/mike-freace-begins-tenure-as-athletic-director
- Jordan Langs named head varsity football coach:
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/jordan-langs-named-head-varsity-football-coach
- Katie Johnson named head varsity girls soccer coach:
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/katie-johnson-named-head-coach-of-cds-varsity-girls-soccer
- 2024 Fall Sports Highlights (Mills' 22nd volleyball season):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2024-fall-sports-highlights1

### Department leadership (current)

- **Mike Freace — Athletic Director.** Promoted from within: he was High School
 Principal on the 2024-2025 profile before beginning his AD tenure (announcement on
 Lions News). His son Sean Freace is a 2025 soccer alumnus (Covenant College).
- **Aja Teich — Assistant Athletic Director / Sports Information Director.**
- **Michael Laney — Assistant Athletic Director** (Middle School Athletics) and
 **Head Basketball Coach**.
- **Chad Smith — HS Strength and Conditioning Teacher and Coach.**
- **Daniel Blaze — Athletic Operations Manager**; **Rebecca Seibert — Athletic
 Coordinator** (transportation logistics).

### Continuity signals

- **Heather Mills** — the Director of Guidance and College Counseling — coached her
 **22nd season** of varsity volleyball in 2024, the program with three straight
 NCISAA 3A runner-up finishes. A two-decade coaching tenure inside the faculty.
- The prior AD (Blake Van Der Schaaf, still on MaxPreps' stale listing) handed off
 to Freace, an internal promotion rather than an outside hire.
- Named program coaches from school articles: **Jordan Langs** (varsity football,
 dated hire announcement), **Katie Johnson** (varsity girls soccer, dated hire
 announcement), **David Houseton** (baseball; daughter Avery Houseton is the
 2026 UNC Charlotte softball signee and 1,000-dig volleyball player), **Vanessa
 Laney, Rachael Klohr, Julius Klohr, Mike Hawks, Bobby Wehane** (program coaches
 per the /add-school assessment sweep of athletics pages).

### Not published

Coach win-loss ledgers, coaching-tree bios, and tenure lengths for most program
coaches are not published; the two dated hire announcements above are the
exceptions.


---

## College Commitments 2024-2026

*Source file: `Covenant Day School - Sports - College Commitments 2024-2026.md`*

# Covenant Day School — Sports — College Commitments (2024–2026)

> **Provenance:** First compiled by Claude Code on 2026-08-15 from the school's own Lions
> News signing articles; **rebuilt 2026-11-09 by `/athlete-commits`** (varsity-roster
> cross-reference — see `Covenant Day School - Sports - Varsity Roster Cross-Reference
> 2026.md` for the method, the nulls and the unchecked gaps). It holds the hard data behind
> the College Pipeline card and the *Power 4 commits* / *Division I commits* Compare rows
> (`src/data/metricValues.ts`).
>
> **Standard applied.** Every row is confirmed on the college's own roster or signing
> release, or on the school's own signing article / "Lions Beyond CDS" alumni list.
> **Graduate test:** an athlete counts for Covenant Day only if they finished high school
> there — each row below is either on the school's senior roster (MaxPreps) or lists
> Covenant Day as "Last School" on the college's roster. **Power 4 = SEC / Big Ten / ACC /
> Big 12** only. Counts are distinct athletes. "Scholarship" is never claimed; walk-ons,
> D3, NAIA and junior college all count. The card shows the **college each athlete went to
> out of Covenant Day** (Providence Day / Makemson precedent): a signing that was replaced
> before enrolment shows the college enrolled at, and a later transfer goes in a note.

## Sources

**The school's own pages**
- "2 Student-Athletes Commit to D1 Schools" (posted 2024-09-03; fall 2023 signing day — Eaton, Marcus):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2-student-athletes-commit-to-d1-schools
- "6 CDS Student-Athletes Sign National Letters of Intent" (spring 2024 — "four CDS athletes signed … for a total of 6"):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/news/post/6-cds-student-athletes-sign-national-letters-of-intent-1724265198114
- "7 CDS Students Celebrate Athletic Collegiate Commitments" (Nov 14, 2024 signing):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/seven-cds-students-celebrate-athletic-collegiate-commitments
- 2024 Fall Sports Highlights (lists the seven Nov 2024 signees):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2024-fall-sports-highlights1
- "8 CDS Students Celebrate Athletic Collegiate Commitments" (2025-04-28):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/8-cds-students-celebrate-athletic-collegiate-commitments
- "5 CDS Students Celebrate Athletic Collegiate Commitments" (2025-11-14):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/5-cds-students-celebrate-athletic-collegiate-commitments-1763136645005
- "7 CDS Students Celebrate Athletic Collegiate Commitments" (2026-04-28):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/7-cds-students-celebrate-athletic-collegiate-commitments-2026
- 2026 Spring Sports Highlights ("12 students continuing their athletic careers at the collegiate level, 3 at Division 1 institutions"):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2026-spring-sports-highlights-1781042195259
- "Lions Beyond CDS" alumni lists on each team page (read 2026-11-09):
 - Football: https://www.covenantday.org/athletics/teams/fall-sports/varsityfootball
 - Baseball: https://www.covenantday.org/athletics/teams/spring-sports/varsitybaseball
 - Boys basketball: https://www.covenantday.org/athletics/teams/winter-sports/varsityboysbasketball
 - Boys soccer: https://www.covenantday.org/athletics/teams/fall-sports/varsityboyssoccer
 - Girls soccer: https://www.covenantday.org/athletics/teams/spring-sports/varsitygirlsoccer
 - Field hockey: https://www.covenantday.org/athletics/teams/fall-sports/varsityfieldhockey
 - Volleyball: https://www.covenantday.org/athletics/teams/fall-sports/varsityvolleyball
 - Softball: https://www.covenantday.org/athletics/teams/spring-sports/varsitysoftball
 - Cross country: https://www.covenantday.org/athletics/teams/fall-sports/varsitycrosscountry
 - Track & field: https://www.covenantday.org/athletics/teams/spring-sports/varsitytrackandfield
 - Boys tennis: https://www.covenantday.org/athletics/teams/spring-sports/varsityboystennis
 - Girls tennis: https://www.covenantday.org/athletics/teams/fall-sports/varsitygirlstennis
 - Girls basketball: https://www.covenantday.org/athletics/teams/winter-sports/varsitygirlsbasketball
 - Swimming: https://www.covenantday.org/athletics/teams/winter-sports/varsityswimming

**College rosters and releases (confirmation + graduate test)**
- Louisville — Emily Eaton: https://gocards.com/sports/field-hockey/roster/emily-eaton/16101 · newcomers: https://gocards.com/news/2024/8/19/meet-the-2024-field-hockey-newcomers
- App State 2024-25 — Michael Marcus Jr. (Fr., Covenant Day): https://appstatesports.com/sports/mens-basketball/roster/2024-25
- George Mason — Marcus Jr. transfer (2026-05-06): https://gomason.com/news/2026/5/6/mens-basketball-george-mason-adds-forward-michael-marcus-jr-to-roster.aspx
- William Peace — Elijah Green (Fr. 2024-25, Covenant Day School): https://gopeacepacers.com/sports/mens-basketball/roster/elijah-green/4142
- William Peace — Green USA South Rookie of the Week (2024-12-09): https://gopeacepacers.com/news/2024/12/9/green-tabbed-usa-south-mens-basketball-rookie-of-the-week.aspx
- Queens — Hamilton Huitt (Fr., Covenant Day School): https://queensathletics.com/roster.aspx?path=mten
- Gardner-Webb — Maggie Dirks (Charlotte / Covenant Day School): https://gwusports.com/sports/cross-country/roster/maggie-dirks/11031
- App State baseball 2026 — Grant Gardner (Fr., Covenant Day): https://appstatesports.com/sports/baseball/roster/2026
- Wofford — Shea Stanley (Matthews / Covenant Day): https://woffordterriers.com/sports/womens-soccer/roster/shea-stanley/9429
- Charlotte football 2025 — Chris Rivens (Fr. WR, Covenant Day): https://charlotte49ers.com/sports/football/roster/2025
- Wisconsin Lutheran football 2025 — Jakota Hase (Fr. WR, Charlotte / Covenant Day): https://wlcsports.com/sports/football/roster/2025
- Louisiana Tech — Jane Neil (1st yr, Charlotte): https://latechsports.com/sports/womens-soccer/roster
- East Carolina — Ethan Welsh (1st yr, Last School Covenant Day School): https://ecupirates.com/sports/cross-country/roster
- Charlotte softball — Avery Houseton (Fr., Last School Covenant Day): https://charlotte49ers.com/sports/softball/roster
- RealGM — Covenant Day School basketball graduates (read in Chrome): https://basketball.realgm.com/highschool/teams/12805/Covenant-Day-School-NC
- HighSchoolOT trackers (baseball: Gardner; boys basketball: Marcus; softball: Houseton): https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/
- Phenom Hoop Report — Marcus commits to App State: https://www.phenomhoopreport.com/2024-michael-marcus-staying-in-nc-commits-to-appalachian-state/

## Class of 2024 — 7 committed · Division I 2 · Power 4 1

The school's two articles name all six of its signees: Eaton and Marcus signed in the fall
2023 period ("2 Student-Athletes Commit to D1 Schools"), and the spring 2024 article names
the other four — "four CDS athletes signed … for a total of 6". **The class is complete as
the school published it**; the earlier "only 4 of 6 recoverable" note misread that sentence.
Elijah Green is the one athlete the school's articles do not name.

| Athlete | Sport | College | Conf. | Level | P4 | Confirmed by |
|---|---|---|---|---|---|---|
| **Emily Eaton** | Field Hockey | **Louisville** | ACC | P4 | ✅ | School D1 article; Louisville roster (started all 17 games 2024); transferred to Virginia (ACC) for fall 2026 |
| Michael Marcus Jr | Basketball | Appalachian State | Sun Belt | D1 | | School D1 article; App State 2024-25 roster (Fr., Covenant Day); transferred to George Mason for 2026-27 |
| Robbie Johnson | Track & Field | Western Colorado | RMAC | D2 | | School spring 2024 article; school T&F alumni list |
| Colden Welsh | XC / Track | Colorado Christian | RMAC | D2 | | School spring 2024 article; school XC + T&F alumni lists |
| **Elijah Green** *(new)* | Basketball | **William Peace** | USA South | D3 | | William Peace bio (Fr. 2024-25, Covenant Day School); RealGM (HS grad 2024, William Peace); MaxPreps 2023-24 senior |
| Will Goodling | Soccer | Gordon | CCC | D3 | | School spring 2024 article (labels Gordon "Division 2"; Gordon is NCAA D3); school soccer alumni list |
| Kessler Forrest | Soccer | Messiah | MAC | D3 | | School spring 2024 article; school soccer alumni list |

## Class of 2025 — 16 committed · Division I 5 · Power 4 0

| Athlete | Sport | College | Conf. | Level | Confirmed by |
|---|---|---|---|---|---|
| Hamilton Huitt | Tennis | Queens (Charlotte) | ASUN | D1 | School Apr 2025 article; Queens roster (Fr., Covenant Day School); school tennis alumni list |
| Maggie Dirks | XC / Track | Gardner-Webb | Big South | D1 | School Nov 2024 signing; Gardner-Webb roster (Covenant Day School) |
| **Grant Gardner** *(changed)* | Baseball | **Appalachian State** | Sun Belt | D1 | Signed with **Davidson** at the Nov 2024 signing (school post; HighSchoolOT); **enrolled at App State** — App State 2026 roster (Fr., Covenant Day), 2027 roster (So.); school baseball alumni list says "Appalachian State University" |
| Shea Stanley | Soccer | Wofford | Southern | D1 | School Nov 2024 signing; Wofford roster (Matthews / Covenant Day) |
| **Chris Rivens** *(changed)* | **Football** | **Charlotte** | American | D1 | Signed with **Guilford basketball** (school Apr 2025 article; school basketball alumni list); **enrolled at Charlotte as a football WR** — Charlotte 2025 football roster (Fr., Covenant Day); school football alumni list says "UNC Charlotte"; not on Guilford's 2025-26 roster. Not on Charlotte's current (2026) roster |
| Landon DeCarlo | Lacrosse | Berry | SAA | D3 | School Apr 2025 article (combined lacrosse program) |
| Tyler Dennison | Football | Grove City | PAC | D3 | School Apr 2025 article; school football alumni list |
| **Jakota Hase** *(new)* | Football | **Wisconsin Lutheran** | NACC | D3 | Wisconsin Lutheran 2025 football roster (Fr. WR, Charlotte / Covenant Day); school football alumni list; MaxPreps 2024-25 senior (football, boys volleyball) |
| Sean Freace | Soccer | Covenant College | CCS | D3 | School Apr 2025 article; Covenant College roster |
| Everett Macurda | Volleyball | Messiah | MAC | D3 | School Apr 2025 article |
| Tyree White | Basketball | Hampden-Sydney | ODAC | D3 | School Apr 2025 article; RealGM (Ty White, 2025, Hampden-Sydney) |
| Ethan Andujar | Baseball | Roanoke | ODAC | D3 | School Nov 2024 signing; school baseball alumni list |
| Brode Dixon | Baseball | Asbury | NAIA | NAIA | School Nov 2024 signing; PBR Commitment Corner (Oct); school baseball alumni list |
| Lydia Johnson | Soccer | Taylor | NAIA | NAIA | School Nov 2024 signing; school girls soccer alumni list |
| Millie Jones | Soccer | Taylor | NAIA | NAIA | School Nov 2024 signing; school girls soccer alumni list |
| Isaac Snapp | Baseball | Southeastern CC | NJCAA | D3* | School Apr 2025 article; school baseball alumni list |

*Junior college is listed at the D3 tier with `conf: 'NJCAA'` (card convention).

## Class of 2026 — 12 committed · Division I 3 · Power 4 0

Matches the school's 2026 spring wrap exactly ("12 students … 3 at Division 1 institutions").

| Athlete | Sport | College | Conf. | Level | Confirmed by |
|---|---|---|---|---|---|
| Jane Neil | Soccer | Louisiana Tech | CUSA | D1 | School posts; Louisiana Tech roster (1st yr, Charlotte) |
| Ethan Welsh | XC / Track | East Carolina | American | D1 | School posts; ECU roster (Last School Covenant Day School) |
| Avery Houseton | Softball | Charlotte | American | D1 | School posts; Charlotte roster (Fr., Last School Covenant Day); HighSchoolOT softball tracker |
| Brady Johnson | Soccer | Cedarville | G-MAC | D2 | School posts; school soccer alumni list |
| Kaitlyn Allen | Softball | Tusculum | SAC | D2 | School posts; school softball alumni list |
| Hunter Kincheloe | Baseball | Hampden-Sydney | ODAC | D3 | School posts; PBR |
| Baker Runge | Soccer | Gordon | CCC | D3 | School posts (the soccer alumni list spells it "Runger") |
| Maggie Shannon | Volleyball | Springfield | NEWMAC | D3 | School posts; school volleyball alumni list |
| Douglas Smith | Basketball | Grove City | PAC | D3 | School posts; school basketball alumni list |
| Luke Thompson | Basketball | Macalester | MIAC | D3 | School posts; RealGM (2026, Macalester) |
| Jalen Boyd | Baseball | Paul D. Camp CC | NJCAA | D3* | School posts (MaxPreps spells "Jaylen") |
| Matthew Dorsey | Baseball | Wake Tech CC | NJCAA | D3* | School posts |

The card's existing `conf: 'AAC'` for Welsh and Houseton is the minority spelling; the
shared vocabulary is `'American'` (10 uses vs 3), and the new Rivens row uses `'American'`.

## Totals → app metric values

| Class | Committed | Division I | Power 4 |
|---|---|---|---|
| 2024 | 7 | 2 | 1 |
| 2025 | 16 | 5 | 0 |
| 2026 | 12 | 3 | 0 |
| **2024–26** | **35** | **10** | **1** |

**`p4-commits-2426` = 1** (Eaton → Louisville, ACC) · **`d1-commits-2426` = 10** (’24 Eaton,
Marcus · ’25 Huitt, Dirks, Gardner, Stanley, Rivens · ’26 Neil, Welsh, Houseton).
Was 33 / 9 / 1 before this pass.

By sport (card's sport-bar labels): Soccer 9 · Baseball 7 · Basketball 5 (Marcus, Green,
White, Smith, Thompson) · XC / Track 4 (C. Welsh, R. Johnson, Dirks, E. Welsh) · Football 3
(Dennison, Hase, Rivens) · Softball 2 · Volleyball 2 · Field Hockey 1 (P4) · Tennis 1 ·
Lacrosse 1. (Was Basketball 5 / Football 1: Rivens moves basketball → football, Green adds
one to basketball.)

## Class of 2027 — verbal appendix (uncounted)

None. See `Covenant Day - Sports - College Commitments Class of 2027.md`.

## Excluded

- **Molly Carlson** — HighSchoolOT girls soccer tracker, Class of 2025: "Covenant Day —
 Virginia". Virginia's roster lists her from Charlottesville, Va., high school *Liberty
 University Online Academy* — fails the graduate test; almost certainly a mislabel of
 Charlottesville's Covenant School. https://virginiasports.com/sports/wsoc/roster
- **Chloe Hylton** — HighSchoolOT girls soccer tracker, Class of 2025: "B. Hylton,
 Covenant Day — N.C. State". She is on Covenant's TopDrawerSoccer roster (2025, no
 commitment listed), but **not on NC State's 2025 or 2026 roster**, not on the school's
 girls soccer alumni list, and not on MaxPreps' Covenant girls soccer rosters. Reader-
 submitted tracker only → lead, not counted.
 https://topdrawersoccer.com/high-school-soccer/team-profile/women/covenant-day-school/tid-27101/tab-roster
 · https://gopack.com/sports/womens-soccer/roster/2025

## Context — the cumulative claim

The athletics page states **"Over 175 athletes have competed at the collegiate level"**
since high school athletics began in 2006.


---

## Facilities and Infrastructure

*Source file: `Covenant Day School - Sports - Facilities and Infrastructure.md`*

# Covenant Day School — Sports — Facilities and Infrastructure

> **Provenance:** Compiled by Claude Code on 2026-08-15 from the school's athletics
> facilities page.

### Sources

- https://www.covenantday.org/athletics/facilities
- https://www.covenantday.org/athletics/strength-and-conditioning (Webb Fitness
 Center, built 2015)

### Venues

- **Main Gym** — "holds more than 800 fans"; basketball and volleyball home court.
- **Auxiliary Gym** — A building; middle school volleyball/basketball and lower
 school PE.
- **Covenant Field** — "fully turf field" adjacent to the middle school; field
 hockey, soccer practice, PE.
- **Davis Track** — "four-lane, 200 meter track" surrounding Covenant Field.
- **Fullwood Field** — primary field hockey venue and spring track field events.
- **Warner Park** — "spans 27 acres" at 515 Matthews Township Parkway: baseball,
 softball, middle school field hockey, and football/soccer fields.
- **Tennis Courts** — "six brand new hard courts" with a pavilion.
- **Webb Fitness Center** — built **2015**; strength and fitness electives for
 grades 6-12; power racks, kettlebells, free weights. Athletes train with the
 strength and conditioning coach after school and in summers.

### Planned — the Forever Covenant campaign

Warner Park upgrades planned: "eight-lane track, field event spaces, a field
house, concessions, and restrooms." (The current Davis Track is four lanes, so
the campaign would move track meets on-campus-hostable.)


---

## NIL Landscape

*Source file: `Covenant Day School - Sports - NIL Landscape.md`*

# Covenant Day School — Sports — NIL Landscape

> **Provenance:** Compiled by Claude Code on 2026-08-15. Searches constrained to
> `covenantday.org` / "Matthews NC" to avoid the four unrelated Covenant-named
> schools.

### Sources

- https://www.covenantday.org/athletics and the Lions News archive
 (https://www.covenantday.org/athletics/lionsnews) — no NIL coverage
- https://www.collegenetworth.com/michael-marcus-jr-appalachian-state/ (post-CDS,
 college-level NIL listing for a CDS alumnus)

### Finding: no documented high-school NIL activity

No NIL deals, collectives, or NIL-related policy statements are documented for
Covenant Day student-athletes in school or third-party coverage. The Lions News
archive carries signing and championship stories but no NIL items.

The nearest adjacency is post-graduation: Michael Marcus Jr ('24) appears in
college NIL databases as an Appalachian State player — activity that belongs to
App State, not to CDS.

This absence is consistent with the program's pipeline shape (one ACC signee in
three classes, ceiling otherwise D1 mid-major — see Power 4 Offers): high-school
NIL coverage in North Carolina tracks Power 4 football/basketball recruits, which
CDS does not currently produce. Confirmed absence, not a research gap.


---

## National Profile

*Source file: `Covenant Day School - Sports - National Profile.md`*

# Covenant Day School — Sports — National Profile

> **Provenance:** Compiled by Claude Code on 2026-08-15 from the school's Lions News
> and third-party rosters.

### Sources

- 2025 Fall Sports Highlights (boys soccer national ranking):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2025fallsportshighlights1
- 2-student-athletes-commit-to-d1-schools (Louisville "top 10 ranked program"):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2-student-athletes-commit-to-d1-schools

### The national moments

- **Varsity Boys Soccer was "ranked first in the nation" during an 8-game unbeaten
 streak in fall 2025** — the school's own phrasing in its season highlights. The
 team earned the #1 overall NCISAA 4A seed and hosted the state final for a second
 consecutive year.
- **Emily Eaton ('24) signed with a top-10-ranked Louisville field hockey program**
 (the school's commit article calls it a "top 10 ranked program") and started every
 game as an ACC freshman — a national-level placement out of a CDS program.
- Football sent **five players to the Gatlinburg All-American Bowl** (2024 season) —
 a multi-state showcase game.

### Scope check

These are episodic national moments, not a standing national schedule: the school
plays a CISAA/NCISAA calendar with no published national-tournament circuit
(no GEICO/Chipotle Nationals, no national travel schedule). The soccer #1 ranking
is the program's high-water mark and is presented as such.


---

## Power 4 Offers

*Source file: `Covenant Day School - Sports - Power 4 Offers.md`*

# Covenant Day School — Sports — Power 4 Offers

> **Provenance:** Compiled by Claude Code on 2026-08-15. Power 4 = SEC / Big Ten /
> ACC / Big 12, the project's standard definition.

### Sources

- "2 Student-Athletes Commit to D1 Schools" (2024-09-03):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2-student-athletes-commit-to-d1-schools
- Louisville field hockey roster (Eaton, CDS '24):
 https://gocards.com/sports/field-hockey/roster/emily-eaton/16101
- Virginia field hockey (Eaton transfer, fall 2026):
 https://virginiasports.com/sports/fhockey/roster/player/emily-eaton

### The one documented Power 4 commit in the 2024-2026 window

**Emily Eaton ('24) — field hockey, University of Louisville (ACC).** The school's
own article announced the commitment to a "top 10 ranked program"; she started all
17 games as a freshman (2024) and all 15 as a sophomore (2025), then transferred to
**Virginia (also ACC)** for fall 2026. Her CDS résumé: 2023 NCISAA Player of the
Year, state-leading 18 goals, all-time program scoring record, 2022 state runner-up
captain.

### The shape of the pipeline

Beyond Eaton, the 2024-2026 ceiling is D1 mid-major — Louisiana Tech, East
Carolina, UNC Charlotte, Queens, Gardner-Webb, Davidson, Wofford, Appalachian
State (see the College Commitments file). No football/basketball Power 4 offers
are documented in school or third-party coverage in this window; Michael Marcus
Jr's basketball recruitment resolved to the Sun Belt (App State). This
substantively explains why the school has no NIL activity or top-100 recruiting
rankings to publish — that coverage tracks Power 4 pipelines.


---

## Professional Athletes

*Source file: `Covenant Day School - Sports - Professional Athletes.md`*

# Covenant Day School — Sports — Professional Athletes

> **Provenance:** Compiled by Claude Code on 2026-08-15. Searches constrained to
> `covenantday.org` / "Matthews NC" because **"Covenant" collides with at least four
> unrelated schools** (Covenant School Charlottesville, Covenant Dallas, Covenant
> Christian Academy GA, Covenant College TN).

### Sources

- https://www.covenantday.org/athletics (no pro-alumni claim anywhere on the site)
- https://www.maxpreps.com/nc/matthews/covenant-day-lions/ (no pro alumni listed)

### Finding: no documented professional athletes

No NFL / NBA / WNBA / MLB / NHL / MLS alumni are documented for Covenant Day School
(Matthews, NC) in school or third-party coverage. The school's own athletics page
makes no professional-alumni claim — its cumulative claim is collegiate ("over 175
athletes have competed at the collegiate level" since 2006).

**Known false positive, deliberately excluded:** a "Patrick Estes" NFL search
result belongs to one of the unrelated Covenant-named schools (Covenant School,
Charlottesville VA), not Covenant Day Matthews. Recorded here so a future pass does
not re-admit it.

This is a confirmed absence for a program whose first graduating class was 2006 —
two decades of alumni with a D1-mid-major ceiling (see Power 4 Offers), so the
absence is consistent with the pipeline shape rather than a research gap.


---

## Redesign Research 2026

*Source file: `Covenant Day School - Sports - Redesign Research 2026.md`*

# Covenant Day School — Sports — Redesign Research 2026

> **Provenance:** Compiled by Claude Code on 2026-08-15 as the working dossier
> behind the structured Sports cards (`src/data/sportsPrograms/covenant-day.ts`).
> All source URLs are in the per-subtopic files beside this one; this dossier holds
> the cross-cutting synthesis and the counting rules.

### The program in one paragraph

A CISAA/NCISAA 4A program of 18 teams with **82% student participation**, 26 state
championship appearances since 2006, a 2025-26 NCISAA softball state title (the
first team title since 2017), a boys soccer program that spent fall 2025 "ranked
first in the nation" during an 8-game unbeaten streak, and **175+ collegiate
athletes** all-time. The 2024-2026 college pipeline is 33 documented commitments —
9 Division I, 1 Power 4 (Emily Eaton, Louisville field hockey, ACC).

> **Superseded 2026-11-09 (pipeline counts):** the commit figures and the "4 recoverable"
> caveat below are replaced by the varsity-roster cross-reference — **35 committed, 10
> Division I, 1 Power 4**, and the Class of 2024 is complete as the school published it.
> See `Covenant Day School - Sports - College Commitments 2024-2026.md` and
> `Covenant Day School - Sports - Varsity Roster Cross-Reference 2026.md`.

### Counting rules used by the app

- **Teams = 18**, the school's own figure ("18 sports teams at the varsity, JV, and
 middle school levels"). MaxPreps' 21 varsity / 50 total counts gender splits and
 levels separately and is recorded as corroboration, not used.
- **Commit counts are distinct athletes, classes of 2024-2026**, from the school's
 six signing/commitment articles. P4 ⊆ D1. Documented minimums: the Class of
 2024's "6 sign NLI" article yields only 4 recoverable names, and Eaton/Marcus
 arrive via a separate D1 article.
- **Participation = 82%** (athletics page), a whole-school share.
- **State-championship appearances = 26** — the school's cumulative claim; the
 2025-26 softball title is the first *win* since 2017.

### Cross-checks performed

- HighSchoolOT's statewide 2025-26 NCISAA champions list confirms the softball
 title (4A) independently of the school's own wrap-up.
- Eaton's class year and enrollment verified against Louisville's roster and
 newcomer articles (started all 17 games in 2024; transferred to Virginia for
 fall 2026); Marcus verified against App State's roster and Phenom Hoops.
- The 2026 spring wrap's own tally ("Twelve student-athletes … including three
 Division 1 signings") matches the two class-of-2026 articles exactly (5 + 7,
 D1 = Neil, Welsh, Houseton).

### Gaps / unconfirmed

- Two names from the Class of 2024 spring signing article are unrecovered.
- Per-sport V/JV/MS level breakdowns are aggregate-only on the school's site.
- Full win-loss tables are not published by the school (MaxPreps holds them).
- The 2017 state title's sport is not named in the 2026 article that references it.


---

## Sports Medicine and Performance

*Source file: `Covenant Day School - Sports - Sports Medicine and Performance.md`*

# Covenant Day School — Sports — Sports Medicine and Performance

> **Provenance:** Compiled by Claude Code on 2026-08-15 from the school's strength
> and conditioning page — the likeliest home for athlete-care detail, fetched
> directly per the implementation plan.

### Sources

- https://www.covenantday.org/athletics/strength-and-conditioning
- https://www.covenantday.org/athletics (Chad Smith title)

### The performance program

- Dedicated **HS Strength and Conditioning Teacher and Coach: Chad Smith** — a
 faculty position, not a contractor.
- The program is "designed to develop a passion for physical fitness and an
 appreciation for strength training," serving **middle and high school students**,
 with "age-appropriate" programming, "innovative multi-joint exercise and
 training," and "speed and agility training that is heavily integrated into our
 overall programming."
- "Proper training and safety techniques are consistently taught and reinforced by
 qualified training instructors." Progress "is tracked daily."
- **Webb Fitness Center (built 2015)** — power racks, kettlebells, free weights;
 strength & fitness electives for grades 6-12 (Strength & Fitness is a PE-credit
 course in the HS profile matrix); athletes lift with the S&C coach after school
 and through summers. A Strength and Conditioning summer camp runs in the 2026
 camp slate.

### Athletic training / medical care — not published

The strength page names no athletic trainers, and no sports-medicine partnership
(OrthoCarolina / Novant / Atrium) is named anywhere on the athletics site. This is
a confirmed absence on the public site, not an unresearched gap: the S&C program
above is the published extent of athlete care.


---

## Sports Offered

*Source file: `Covenant Day School - Sports - Sports Offered.md`*

# Covenant Day School — Sports — Sports Offered

> **Provenance:** Compiled by Claude Code on 2026-08-15 from the school's athletics
> pages and current High School Profile; cross-checked against MaxPreps.

### Sources

- https://www.covenantday.org/athletics (18 teams, 82% participation)
- https://www.covenantday.org/athletics/teams (season-by-season team list)
- 2026-2027 High School Profile (varsity sport list):
 https://resources.finalsite.net/images/v1758547252/covenant/x8i0qddxvctsp5jqbpmt/2025-26HSGuidanceProfile.pdf
- https://www.maxpreps.com/nc/matthews/covenant-day-lions/ (third-party: "21 varsity
 sports and 50 teams total")

### The headline numbers

- **18 sports teams** "at the varsity, JV, and middle school levels" (school's own
 teams page). **82% of students participate in at least one sport.**
- MaxPreps counts **21 varsity sports and 50 teams total** — a broader third-party
 count that includes gender splits and levels the school's 18 aggregates. The
 school's own figure is used in the app.
- Member of the **Charlotte Independent Schools Athletic Association (CISAA)**, a
 4A conference in the **NCISAA** (North Carolina Independent Schools Athletic
 Association).

### Teams by season (school's own teams page)

- **Fall (8):** Cross Country, Boys Soccer, Cheerleading, Football, Field Hockey,
 Girls Golf, Girls Tennis, Volleyball
- **Winter (4):** Boys Basketball, Girls Basketball, Cheerleading, Swimming
- **Spring (6):** Baseball, Boys Golf, Boys Tennis, Girls Soccer, Softball,
 Track & Field

### Varsity list per the 2026-2027 profile

Baseball, Basketball, Cheerleading, Cross Country, Field Hockey, Football, Golf,
Soccer, Tennis, Softball, Swimming, Track & Field, Volleyball. **Club sport: Men's
(boys) Volleyball.** MaxPreps additionally lists Boys/Girls Lacrosse (a combined
program per the 2025 commitment article's "combined lacrosse program") and boys
swimming — part of why its count runs higher.

### Counting rule for the app

The `offered` card uses the school's own **18 teams** figure and the school's
season-by-season list above; per-team V/JV/MS levels are stated by the school only
in aggregate ("varsity, JV, and middle school levels"), so levels are not asserted
per sport. The MaxPreps 21/50 figure is recorded here as corroborating breadth,
not used as the headline.


---

## Team Levels (V-JV-MS)

*Source file: `Covenant Day School - Sports - Team Levels (V-JV-MS).md`*

# Covenant Day School — Sports — Team Levels (Varsity / JV / Middle School)

> **Provenance:** Compiled by Claude Code on 2026-08-17 during `/plan CovenantDaySports`,
> by opening every team page linked from the athletics Teams index and reading the
> **"Additional Levels"** box in each page's right-hand sidebar. That box is the school's
> own per-sport statement of which sub-varsity ladders exist (Middle School and/or JV);
> when a sport fields no sub-varsity team, the box either lists no level links or is
> absent. This resolves the per-sport V/JV/MS breakdown that the earlier "Sports Offered"
> research could only state in aggregate ("varsity, JV, and middle school levels").

### Method (how to re-verify)

1. Start at the Teams index: https://www.covenantday.org/athletics/teams
2. Click a sport tile → the **Learn More** button that appears → the sport's team page.
3. On the team page, read the **Additional Levels** box in the right sidebar. Any
 "Middle School <Sport>" link means an MS team exists; any "JV <Sport>" link means a JV
 team exists. Generic sidebar links (Schedule, Tickets, Facilities) are NOT levels and
 are ignored. No level links / no box ⇒ Varsity only.

### Sources — Teams index and every team page

- Teams index: https://www.covenantday.org/athletics/teams
- Varsity Boys Soccer (worked example, shows MS + JV): https://www.covenantday.org/athletics/teams/fall-sports/varsityboyssoccer
- Per-team pages carry internal Finalsite ids (`/fs/pages/NNNN`); the id read for each
 sport is recorded in the table below.

### Per-sport levels (as read from each team page's Additional Levels box)

| Season | Sport (school's title) | Page id | Additional Levels box | Levels |
|---|---|---|---|---|
| Fall | Cross Country | /fs/pages/2124 | Middle School Cross Country | **V, MS** |
| Fall | Boys Soccer | /fs/pages/2129 | Middle School Boys Soccer; JV Boys Soccer | **V, JV, MS** |
| Fall | Cheerleading | /fs/pages/2141 | Middle School Cheerleading | **V, MS** |
| Fall | Football | /fs/pages/2126 | Middle School Football; JV Football | **V, JV, MS** |
| Fall | Field Hockey | /fs/pages/2138 | Middle School Field Hockey; JV Field Hockey | **V, JV, MS** |
| Fall | Girls Golf | /fs/pages/2143 | *(no box / no level links)* | **V** |
| Fall | Girls Tennis | /fs/pages/2132 | Middle School Girls Tennis; JV Girls Tennis | **V, JV, MS** |
| Fall | Volleyball | /fs/pages/2135 | Middle School Volleyball; JV Volleyball | **V, JV, MS** |
| Winter | Boys Basketball | /fs/pages/2145 | Middle School Boys Basketball; JV Boys Basketball | **V, JV, MS** |
| Winter | Girls Basketball | /fs/pages/2148 | Middle School Girls Basketball | **V, MS** |
| Winter | Cheerleading | /fs/pages/2150 | Middle School Cheerleading | **V, MS** |
| Winter | Swimming | /fs/pages/2152 | Middle School Swimming | **V, MS** |
| Spring | Baseball | /fs/pages/2157 | Middle School Baseball; JV Baseball | **V, JV, MS** |
| Spring | Boys Golf | /fs/pages/2160 | Middle School Boys Golf | **V, MS** |
| Spring | Boys Tennis | /fs/pages/2163 | Middle School Boys Tennis | **V, MS** |
| Spring | Girls Soccer | /fs/pages/2165 | Middle School Girls Soccer; JV Girls Soccer | **V, JV, MS** |
| Spring | Softball | /fs/pages/2168 | Middle School Softball | **V, MS** |
| Spring | Track & Field | /fs/pages/2170 | Middle School Track & Field | **V, MS** |

### Summary counts

- **JV teams (8 sports):** Boys Soccer, Football, Field Hockey, Girls Tennis, Volleyball,
 Boys Basketball, Baseball, Girls Soccer.
- **Middle School teams (17 of 18 sports):** every sport EXCEPT Girls Golf.
- **Varsity only (1 sport):** Girls Golf.

This corroborates the school's aggregate claim that its 18 teams run "at the varsity, JV,
and middle school levels" — now resolved to the per-sport level exactly as the school
publishes it.

### Mapping to the app's `offered` card entries

The app's `offered.seasons[].sports[]` entries are named slightly differently from the
school's team titles (e.g. the app uses `Cross Country (B & G)`, `Cheerleading`,
`Volleyball (Girls)`). The mapping is 1:1 by sport; each app entry takes the `levels`
array from the matching row above. Cheerleading appears in both Fall and Winter and is
`V, MS` in each.


---

## Top 100 Recruiting Rankings

*Source file: `Covenant Day School - Sports - Top 100 Recruiting Rankings.md`*

# Covenant Day School — Sports — Top 100 Recruiting Rankings

> **Provenance:** Compiled by Claude Code on 2026-08-15. Searches constrained to
> `covenantday.org` / "Matthews NC" to avoid the unrelated Covenant-named schools.

### Sources

- https://www.phenomhoopreport.com/2024-michael-marcus-staying-in-nc-commits-to-appalachian-state/
- https://247sports.com/college/appalachian-state/season/2024-basketball/commits/
- https://prephoops.com/player/michael-marcus-jr/

### Finding: no top-100 nationally ranked recruits documented

No Covenant Day athlete appears in a national top-100 recruiting ranking
(247Sports/On3/ESPN composite, Prep Hoops national, Max Field Hockey top-100
recruit lists) in the 2024-2026 window.

The best-covered recruit is **Michael Marcus Jr ('24)** — a 6'9" forward with NC
state-level coverage (Phenom Hoops) who committed to Appalachian State, i.e. a
covered-but-unranked mid-major signee. **Emily Eaton ('24)** carried NC
player-of-the-year honors and signed with top-10-ranked Louisville, but no national
top-100 recruit ranking is documented for her either (Max Field Hockey named her NC
Player of the Year, a state honor).

Confirmed absence consistent with the program's shape; not a research gap.


---

## Varsity Roster Cross-Reference 2026

*Source file: `Covenant Day School - Sports - Varsity Roster Cross-Reference 2026.md`*

# Covenant Day School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Research record written by Claude Code on 2026-11-09 during
> `/athlete-commits covenant-day`. It documents *how* the College Pipeline roster was
> re-checked and *what was searched and found empty*, so a later pass does not redo the
> work. The athlete-level results live in `Covenant Day School - Sports - College
> Commitments 2024-2026.md`; this file is the method and the nulls. It is provenance for
> the pipeline card, not a card of its own (`src/lib/metrics.ts` folds it onto the research
> dossier via `/roster cross-reference/i`).
>
> **Names policy:** only athletes with a documented college commitment, and the leads ruled
> out, are named here. Current students without a commitment are recorded as counts.

## Result in one line

33 → **35** committed, 9 → **10** Division I, Power 4 unchanged at **1**. Two new athletes
(Elijah Green ’24, William Peace; Jakota Hase ’25, Wisconsin Lutheran), two rows changed to
the college actually enrolled at (Grant Gardner ’25 Davidson → App State; Chris Rivens ’25
Guilford basketball → Charlotte football, D3 → D1), two HighSchoolOT leads ruled out
(Molly Carlson, Chloe Hylton). The Class of 2024 turned out to be **complete** as the school
published it — the old "4 of 6 recoverable" caveat misread the spring 2024 article.

## Scope

Every varsity sport the school fields. The 2026–27 High School Profile lists baseball,
basketball, cheerleading, cross country, field hockey, football, golf, soccer, tennis,
softball, swimming, track & field and volleyball; boys volleyball is a club sport and
lacrosse is a combined program with other schools (see `Covenant Day School - Sports -
Sports Offered.md`).

Depth by tier:
- **Full per-name cross-reference** (rosters + commitment database + college roster):
 football, boys and girls basketball, baseball, boys and girls soccer, volleyball, softball,
 field hockey, boys and girls tennis, boys volleyball.
- **School alumni list + grouped searches + college roster check:** cross country, track &
 field, swimming, golf.
- **Unchecked beyond the school's own signing posts:** lacrosse (combined program — no
 MaxPreps roster, LaxNumbers team page not found), cheerleading (no team page, no list).

## Step 1 — the school's own pages (read 2026-11-09)

**Lions News** (`https://www.covenantday.org/athletics/lionsnews`) — server-rendered
Finalsite board; curl works. Six signing posts cover 2024–26 (listed in the commitments
file). No Class of 2027 signing post is up: the NCAA early signing period opens 2026-11-11.

**Team pages** — `https://www.covenantday.org/athletics/teams/<season>-sports/<slug>`,
server-rendered, each with a **"Lions Beyond CDS"** tab: the school's own list of alumni
playing in college, by name, class and college. This is the strongest source the school
publishes and it was not used by the August 2026 pass. Slugs that answer:
`fall-sports/varsityfootball`, `varsityfieldhockey`, `varsityvolleyball`, `varsityboyssoccer`,
`varsitygirlstennis`, `varsitycrosscountry`, `varsitygirlsgolf` (empty: "The selected team
was not found"); `winter-sports/varsityboysbasketball`, `varsitygirlsbasketball`,
`varsityswimming`; `spring-sports/varsitybaseball`, `varsitysoftball`, `varsitygirlsoccer`
(no "s"), `varsityboystennis`, `varsitytrackandfield`, `varsityboysgolf` (no list). No page
for lacrosse, boys volleyball or cheer under any guessed slug. The `/athletics/teams` index
is JS-rendered and lists nothing to curl or to page text.

What the alumni lists added: **Jakota Hase ’25** (football → Wisconsin Lutheran), **Chris
Rivens ’25** under football → UNC Charlotte, **Grant Gardner ’25** under baseball →
Appalachian State. Every other 2024–26 name on them is already on the card. Swimming's
list ends at ’21; golf and cheer publish none.

## Step 2 — MaxPreps rosters by season

`https://www.maxpreps.com/nc/matthews/covenant-day-lions/<sport>/<yy-yy>/roster/` (city is
**matthews**; `/nc/charlotte/…` 404s) — HTTP 200 with a browser UA, path form, 23 sport
slugs × 4 seasons (23-24 → 26-27) = 88 pages pulled.

Rosters with data: football, boys and girls basketball, baseball, boys soccer, girls soccer
(`soccer/girls/spring`), softball, field hockey, volleyball, boys volleyball, boys and girls
tennis. **Empty in every season (unchecked on MaxPreps):** cross country (both),
track-field (both), swimming (both), golf (both), lacrosse (both). Baseball 23-24 and 24-25
carry no grade column ("-"), so baseball's Class of 2024 and 2025 seniors were taken from
the school's posts and alumni list instead. Spring 26-27 rosters are not posted yet.

Seniors found (`Sr.`) by class: **2024** — 45 across 8 sports (football 15, field hockey 8,
boys soccer 8, basketball 7, volleyball 5, boys volleyball 5, girls soccer 2, …);
**2025** — 42; **2026** — 53; **2027** (26-27 seniors + 25-26 juniors) — 47. MaxPreps
prints two players as seniors in both 23-24 and 24-25 (data-entry error; neither is a
commit).

## Step 3 — cross-reference

**HighSchoolOT trackers** — all 18 per-sport trackers plus the three "Building the Fence"
in-state football pages and three out-of-state roundups (hub:
https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/).
Covenant Day hits: Grant Gardner (baseball, Davidson), Michael Marcus Jr. (boys
basketball), Avery Houseton (softball) — all already on the card — and two girls soccer
leads, both ruled out (below). No Class of 2027 entry.

**RealGM** (Chrome; `https://basketball.realgm.com/highschool/teams/12805/Covenant-Day-School-NC`)
— 11 graduates. In window: Elijah Green (2024, William Peace — **new**), Michael Marcus Jr.
(2024, now George Mason), Ty White (2025, Hampden-Sydney), Luke Thompson (2026, Macalester).
Out of window: Brewer ’15, Brown ’23, Hailey ’20, King ’19, Melton ’14, Ufochukwu ’22,
Ward ’21.

**NC Football News** — 2025 general / in-state / out-of-state trackers, 2026 and 2027
trackers: no Covenant Day entry. Hase (D3, Wisconsin) and Rivens (walk-on-shaped, Charlotte)
are the kind of commit these trackers miss.

**TopDrawerSoccer** — Covenant Day girls team page lists one player (Chloe Hylton, 2025,
no commitment).

**Prep Baseball Report** (search) — Gardner (Davidson), Kincheloe (Hampden-Sydney), Dixon
(Asbury); no other Covenant commit; 2027 profiles list no commitment.

**College rosters checked** (graduate test): Louisville, App State (basketball 2024-25;
baseball 2026 and current), George Mason (release), William Peace, Queens, Gardner-Webb,
Wofford, Charlotte (football 2025, softball), Wisconsin Lutheran, Louisiana Tech, East
Carolina, Guilford (2025-26 and current — Rivens absent), Virginia women's soccer,
NC State women's soccer 2025 and 2026 (Chrome).

## Ruled out

| Lead | Source | Why |
|---|---|---|
| Molly Carlson — Virginia (Class of 2025, girls soccer) | HighSchoolOT girls soccer tracker | Virginia lists her from Charlottesville, Va., HS Liberty University Online Academy — fails the graduate test; likely a mislabel of Charlottesville's Covenant School |
| Chloe Hylton — NC State (Class of 2025, girls soccer; tracker prints "B. Hylton") | HighSchoolOT girls soccer tracker | Not on NC State's 2025 or 2026 roster; TopDrawerSoccer lists no commitment; absent from the school's posts and alumni list. Single reader-submitted source |

## Nulls (searched, nothing found)

- **Football**, Classes of 2024 (15 seniors) and 2025 (14): grouped name searches and the
 NC Football News trackers — nothing beyond Dennison, Hase and Rivens.
- **Boys basketball** 2024–26: RealGM's full list — nothing beyond the card + Green.
- **Girls basketball** 2024–26 (2 + 5 seniors): the school's alumni list ends at ’22;
 HighSchoolOT tracker — none.
- **Field hockey** 2024–26 (8 + 4 + 4 seniors): school alumni list — only Eaton in window.
- **Volleyball** 2024–26: school alumni list and PrepVolleyball search — only Shannon.
- **Boys volleyball** (club): only Macurda, from the school's Apr 2025 post.
- **Swimming** 2024–26: school alumni list (latest ’21), SwimSwam/Swimming World search —
 none.
- **Golf** 2024–26: no alumni list; Junior Golf Scoreboard / AJGA search — none.
- **Tennis** 2024–26: school alumni lists — only Huitt.
- **Softball** 2024–26: school alumni list — Allen, Houseton only.

## Unchecked (could not be retrieved)

- **Lacrosse** — combined program; no MaxPreps roster in any season; LaxNumbers team page
 not found in Chrome. DeCarlo (Berry) is on the card from the school's own post; any other
 lacrosse commit is unchecked, not null.
- **Cheerleading** — no team page or alumni list.
- **Cross country / track** rosters (MaxPreps empty) — covered instead by the school's own
 alumni lists, which match the card.

## Class of 2027 (current seniors)

47 seniors on the 26-27 and 25-26 rosters; no public commitment found in any source above,
and no signing post yet. Recorded in `Covenant Day - Sports - College Commitments Class of
2027.md`; **provisional — re-run after the 2026-11-11 early signing period**.


---

## Wells Fargo Cup Standings 2020-2026

*Source file: `Covenant Day School - Sports - Wells Fargo Cup Standings 2020-2026.md`*

# Covenant Day School - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-11-02 by the `/wells-fargo-cup` skill, for the planned Covenant Day Wells Fargo Cup card (plan `covenantcup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed into 538 table rows across all six seasons, 511 of them placed; the other 27 are unplaced schools. Fall + winter + spring equals the published total on every row except the two already recorded in Providence Day's file: 2021–22 1A Victory Christian Center and 2021–22 2A Westminster Catawba Christian. Neither is in the 4A table Covenant Day's card shows. No figure here is an estimate.

**The shared ledger needed no correction.** `CUP_RECORDS` was compared against the official tables: all 132 NCISAA rows match on class, place, tie, splits and total, including Covenant Day's six. All 36 `CUP_DIVISION_LEADERS` rows match. All 102 official 4A rows are in the ledger. `CUP_FIELD_SIZES` matches at 25, 26 and 17. `current-champions/` still shows 2025–26, so no newer season has been published. The full ledger lives in `src/data/wellsFargoCup.ts`, and its row-level source file is `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup Standings 2020-2026.md`. Covenant Day's rows are repeated below.

Title and runner-up years come from the NCISAA's own results archive, read for all 20 sports and all six seasons (120 pages), parsed by bracket column so a team's deepest round is read from the grid rather than from text order. Brackets have different widths, so each round was read from the dates printed under its column. Years are calendar years of the championship event, so a fall final in the 2025–26 season is 2025.

**One correction this pass found in the repo's Covenant Day data:**

- **Field hockey's 2025 overtime loss was a quarterfinal, not a semifinal.** The Winning Record card shows `SEMIFINAL` for 2025–26 and its note says "state semifinal". The school's 2025 Fall Sports Highlights say "semifinals", which is the origin of the claim. The NCISAA bracket has #3 Providence Day beating #6 Covenant Day 2–1 (OT) in the Friday, October 17 round. Providence Day then played the semifinal on Tuesday, October 21, losing 3–2 (2OT) to #2 Charlotte Latin. The Cup total agrees: 2025–26 fall is 67.5, which is 45 for boys soccer's runner-up plus 22.5 for one quarterfinal exit. A semifinal exit would pay 37.5 and give 82.5, more than the published total. The school's own wording stays disagreed with here on the association's bracket.

**Disagreements recorded, nothing changed:**

- **Baseball 2025–26.** The NCISAA bracket prints `#8 Covenant Day School (12-4)`. The school's 2026 Spring Sports Highlights say 12–14 overall, 5–5 in conference, and the #8 seed. The bracket's `12-4` is read as a dropped digit, so the card's 12–14 stays.
- **Volleyball's three straight runner-up finishes.** No volleyball final falls inside these six seasons: Covenant Day's best is the 2022 semifinal. The 2015–16 archive page has #2 Covenant Day in the final of its top division, lost to #1 North Raleigh Christian. The archive serves no bracket for years before 2015–16, so the other two finishes could not be read. The claim is outside this card and is unchanged.
- **Football 2022 is Division II.** Covenant Day lost that final 46–10 to Asheville School. The NCISAA's scoring page says Cup points apply "for sports who compete by division as well as classification".

**Reach limits, and what closes them.** `ncisaa.shotstat.com`, which hosts the NCISAA's golf scoreboards, does not resolve from this environment. Covenant Day is on neither 2025 girls golf team results PDF, nor the 2021 boys 4A team PDF. Cross country team tables were read for 2020, 2021, 2023 and 2024; 2022 and 2025 were not found. Track team tables were not read. Swimming was read for 2021–2025, not 2026.

These gaps cannot hide a title or runner-up finish, because the published term totals leave no room for one. Scoring is 50, 45, 40, 35, 30, 25, 20 and 15 for 1st to 8th, split on ties, so losing semifinalists take 37.5 and losing quarterfinalists 22.5. Subtracting the finishes read above leaves these residuals, and none can hold a 45:

| Season | Fall | Winter | Spring |
|---|---|---|---|
| 2020–21 | 0 | 0 | 15 |
| 2021–22 | 0 | 0 | 0 |
| 2022–23 | 55 | 0 | 20 |
| 2023–24 | 5 | 0 | 30 |
| 2024–25 | 0 | 0 | 30 |
| 2025–26 | 0 | 0 | 0 |

The 55 is the one to read carefully: a 45 inside it would need a 10, and no place or tie among the top eight pays 10. Winter never exceeds 37.5 in any season, so no winter sport has a runner-up finish.

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
- Softball 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=21&years=2025-2026
- Boys soccer 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=8&years=2025-2026
- Boys soccer 2024–25 bracket: https://archives.ncisaa.org/index.php?sport=8&years=2024-2025
- Field hockey 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=9&years=2025-2026
- Field hockey 2022–23 bracket: https://archives.ncisaa.org/index.php?sport=9&years=2022-2023
- Football 2022–23 bracket: https://archives.ncisaa.org/index.php?sport=31&years=2022-2023
- Volleyball 2015–16 bracket: https://archives.ncisaa.org/index.php?sport=12&years=2015-2016
- Baseball 2025–26 bracket: https://archives.ncisaa.org/index.php?sport=1&years=2025-2026
- 2025 Fall Sports Highlights: https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2025fallsportshighlights1
- 2026 Spring Sports Highlights: https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2026-spring-sports-highlights-1781042195259
- 2020 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2020/
- 2021 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- 2023 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Cross_Country_Championships_2023/
- 2024 cross country official timing: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- 2021 swimming Division I team scores: https://admin.ncisaa.org/uploads/ncisaa%20division%20i%20scores.pdf
- 2022 swimming Division I results: https://admin.ncisaa.org/uploads/SWIMMING/Div%201%20Final_Team_Ind.pdf
- 2023 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%201%20Swim%20scores.pdf
- 2024 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2024/2024%20NCISAA%20D1%20State%20Team%20Scores.pdf
- 2025 swimming Division I team scores: https://admin.ncisaa.org/uploads/SWIMMING/2025/division%201%20scores.pdf
- 2025 girls golf Division I team results: https://admin.ncisaa.org/uploads/25-26%20Championship%20Logos/NCISAA%20Division%20I%20Girls%20Golf%20Team%20Results.pdf
- 2025 girls golf Division II team results: https://admin.ncisaa.org/uploads/25-26%20Championship%20Logos/NCISAA%20D2%20Girls%20Golf%20Team%20Results.pdf
- 2021 boys golf 4A team results: https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%204A%20Team%20Results%20(1).pdf

## Wells Fargo Cup results for Covenant Day

All six seasons are NCISAA 4A. Copied from the official tables and identical to `CUP_RECORDS`.

| Season | Place | Fall | Winter | Spring | Total | Winner | Points behind 1st |
|---|---|---|---|---|---|---|---|
| 2020–21 | 14 | 142.5 | 15 | 15 | 172.5 | Providence Day 670 | 497.5 |
| 2021–22 | 11 | 132.5 | 22.5 | 60 | 215 | Charlotte Country Day 682.5 | 467.5 |
| 2022–23 | 8 | 205 | 0 | 117.5 | 322.5 | Providence Day 782.5 | 460 |
| 2023–24 | 10 | 137.5 | 37.5 | 127.5 | 302.5 | Providence Day 757.5 | 455 |
| 2024–25 | 10 | 145 | 22.5 | 127.5 | 295 | Providence Day 650 | 355 |
| 2025–26 | 15 | 67.5 | 0 | 117.5 | 185 | Providence Day 692.5 | 507.5 |

Covenant Day has not won the Cup in these six seasons and has not finished in the top three. Its best finish is 8th, in 2022–23, which is also its highest score, 322.5. Fall was its largest term in 2020–21, 2021–22, 2022–23, 2023–24 and 2024–25; spring was largest in 2025–26.

## Wells Fargo Cup point sources for Covenant Day

Every title or runner-up year here is confirmed by the NCISAA archive page for that sport and season.

| Sport | Gender | Term | State titles | Runner-up | Evidence |
|---|---|---|---|---|---|
| Softball | Girls | Spring | 2026 | — | Bracket game lines: beat Cannon 7–5 and 9–5 in the championship series, May 15/16 |
| Soccer | Boys | Fall | — | 2024, 2025 | Brackets: lost 1–0 to Rabun Gap in 2024 and 2–1 to Christ School in 2025 |

**The list rule:** a sport is listed with at least one title or at least two runner-up years, the same bar as the lists for Providence Day, Charlotte Latin, Charlotte Country Day, Cannon and Charlotte Christian.

Confirmed but left off, one runner-up year each: field hockey 2022, lost 2–0 to Providence Day, and football 2022, lost 46–10 to Asheville School in Division II. Those two finishes are 90 of the 205 fall points in 2022–23, the school's best Cup season.

Other team finishes read, none in the top two: girls cross country 4th, 8th, 5th and 4th in 2020, 2021, 2023 and 2024; boys cross country 3rd, 4th, 4th and 7th in the same years; best swimming finish 8th, in 2021.

Team-sport deep runs that fell short of a final: baseball semifinal 2023; boys basketball semifinal 2024; field hockey semifinal 2021; volleyball semifinal 2022; girls soccer semifinals 2023, 2024 and 2025; softball semifinals 2022, 2024 and 2025.

## Wells Fargo Cup state-title context

Within the six Cup seasons the brackets give Covenant Day one team state title: softball in 2025–26, which the school calls its first team state title since 2017. Boys soccer reached the final in both 2024 and 2025. A state title and a Wells Fargo Cup are different things: Covenant Day's title season, 2025–26, is also its lowest Cup finish of the six, 15th, because the Cup rewards breadth across every sport.


---

## Win-Loss Records

*Source file: `Covenant Day School - Sports - Win-Loss Records.md`*

# Covenant Day School — Sports — Win-Loss Records

> **Provenance:** Compiled by Claude Code on 2026-08-15 from the school's Lions News
> season-highlight articles (the school publishes highlights, not full season record
> tables).

### Sources

- 2026 Spring Sports Highlights (2026-07-10):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2026-spring-sports-highlights-1781042195259
- 2025 Fall Sports Highlights (2025-12-08):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2025fallsportshighlights1
- 2024-25 Winter Sports Highlights (2025-03-10):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2024-25-winter-sports-highlights
- 2024 Fall Sports Highlights (2024-12-31):
 https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2024-fall-sports-highlights1

### Documented records and results, by season

**2025-26:**

- Softball: **10-1 in conference** — CISAA champions and NCISAA 4A state champions
 (beat Cannon in the final).
- Boys soccer: **#1 overall seed** in the NCISAA 4A tournament; **8-game unbeaten
 streak** during which the team was "ranked first in the nation"; hosted the state
 final for the second straight year.
- Baseball: **12-14 overall, 5-5 conference**, #8 seed in the state tournament.
- Girls soccer: beat Carmel Christian (PKs), Providence Day, and Charlotte
 Christian (double OT).
- Field hockey: #6 seed; took Providence Day to overtime in the state quarterfinals.
- Girls tennis: won the **Ashe Cup** (vs. Charlotte Christian) for the first time
 in school history.

**2024-25:**

- Boys basketball: **#4 overall seed** in the NCISAA state playoffs; Tyree White
 1st Team All-CISAA + All-State; Chris Rivens passed 1,000 career points.
- Girls basketball: **15 more wins than the prior season**, including a 10-game
 winning streak.
- Boys soccer (fall 2024): **first-ever NCISAA 4A State Championship game
 appearance**.
- Girls cross country (fall 2024): Caitlin Kasten won both the CISAA and NCISAA
 championship meets.

### Publication pattern

The school publishes narrative season highlights with seeds, streaks, and playoff
results rather than complete win-loss tables; full records live on MaxPreps
(https://www.maxpreps.com/nc/matthews/covenant-day-lions/) season by season.


---

## Sources referenced across these documents

- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Cross_Country_Championships_2023/
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2020/
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- https://247sports.com/college/appalachian-state/season/2024-basketball/commits/
- https://247sports.com/season/<year>-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-football/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-football/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-womens-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-womens-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%204A%20Team%20Results%20(1
- https://admin.ncisaa.org/uploads/25-26%20Championship%20Logos/NCISAA%20D2%20Girls%20Golf%20Team%20Results.pdf
- https://admin.ncisaa.org/uploads/25-26%20Championship%20Logos/NCISAA%20Division%20I%20Girls%20Golf%20Team%20Results.pdf
- https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%201%20Swim%20scores.pdf
- https://admin.ncisaa.org/uploads/SWIMMING/2024/2024%20NCISAA%20D1%20State%20Team%20Scores.pdf
- https://admin.ncisaa.org/uploads/SWIMMING/2025/division%201%20scores.pdf
- https://admin.ncisaa.org/uploads/SWIMMING/Div%201%20Final_Team_Ind.pdf
- https://admin.ncisaa.org/uploads/ncisaa%20division%20i%20scores.pdf
- https://appstatesports.com/sports/baseball/roster/2026
- https://appstatesports.com/sports/mens-basketball/roster/2024-25
- https://archives.ncisaa.org/
- https://archives.ncisaa.org/index.php?sport=1&years=2025-2026
- https://archives.ncisaa.org/index.php?sport=12&years=2015-2016
- https://archives.ncisaa.org/index.php?sport=21&years=2025-2026
- https://archives.ncisaa.org/index.php?sport=31&years=2022-2023
- https://archives.ncisaa.org/index.php?sport=8&years=2024-2025
- https://archives.ncisaa.org/index.php?sport=8&years=2025-2026
- https://archives.ncisaa.org/index.php?sport=9&years=2022-2023
- https://archives.ncisaa.org/index.php?sport=9&years=2025-2026
- https://basketball.realgm.com/highschool/teams/12805/Covenant-Day-School-NC
- https://basketball.realgm.com/highschool/teams/12805/Covenant-Day-School-NC`
- https://charlotte49ers.com/sports/football/roster/2025
- https://charlotte49ers.com/sports/softball/roster
- https://ecupirates.com/sports/cross-country/roster
- https://gocards.com/news/2024/8/19/meet-the-2024-field-hockey-newcomers
- https://gocards.com/sports/field-hockey/roster/emily-eaton/16101
- https://gomason.com/news/2026/5/6/mens-basketball-george-mason-adds-forward-michael-marcus-jr-to-roster.aspx
- https://gopack.com/sports/womens-soccer/roster/2025
- https://gopeacepacers.com/news/2024/12/9/green-tabbed-usa-south-mens-basketball-rookie-of-the-week.aspx
- https://gopeacepacers.com/sports/mens-basketball/roster/elijah-green/4142
- https://gwusports.com/sports/cross-country/roster/maggie-dirks/11031
- https://latechsports.com/sports/womens-soccer/roster
- https://prephoops.com/player/michael-marcus-jr/
- https://queensathletics.com/roster.aspx?path=mten
- https://resources.finalsite.net/images/v1758547252/covenant/x8i0qddxvctsp5jqbpmt/2025-26HSGuidanceProfile.pdf
- https://topdrawersoccer.com/high-school-soccer/team-profile/women/covenant-day-school/tid-27101/tab-roster
- https://virginiasports.com/sports/fhockey/roster/player/emily-eaton
- https://virginiasports.com/sports/wsoc/roster
- https://wlcsports.com/sports/football/roster/2025
- https://woffordterriers.com/sports/womens-soccer/roster/shea-stanley/9429
- https://www.collegenetworth.com/michael-marcus-jr-appalachian-state/
- https://www.covenantday.org/athletics
- https://www.covenantday.org/athletics/facilities
- https://www.covenantday.org/athletics/lionsnews
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2-student-athletes-commit-to-d1-schools
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2024-25-winter-sports-highlights
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2024-fall-sports-highlights1
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2025fallsportshighlights1
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2026-spring-sports-highlights-1781042195259
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/5-cds-students-celebrate-athletic-collegiate-commitments-1763136645005
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/7-cds-students-celebrate-athletic-collegiate-commitments-2026
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/8-cds-students-celebrate-athletic-collegiate-commitments
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/jordan-langs-named-head-varsity-football-coach
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/katie-johnson-named-head-coach-of-cds-varsity-girls-soccer
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/mike-freace-begins-tenure-as-athletic-director
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/seven-cds-students-celebrate-athletic-collegiate-commitments
- https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/news/post/6-cds-student-athletes-sign-national-letters-of-intent-1724265198114
- https://www.covenantday.org/athletics/lionsnews`
- https://www.covenantday.org/athletics/strength-and-conditioning
- https://www.covenantday.org/athletics/teams
- https://www.covenantday.org/athletics/teams/<season>-sports/<slug>`
- https://www.covenantday.org/athletics/teams/fall-sports/varsityboyssoccer
- https://www.covenantday.org/athletics/teams/fall-sports/varsitycrosscountry
- https://www.covenantday.org/athletics/teams/fall-sports/varsityfieldhockey
- https://www.covenantday.org/athletics/teams/fall-sports/varsityfootball
- https://www.covenantday.org/athletics/teams/fall-sports/varsitygirlstennis
- https://www.covenantday.org/athletics/teams/fall-sports/varsityvolleyball
- https://www.covenantday.org/athletics/teams/spring-sports/varsitybaseball
- https://www.covenantday.org/athletics/teams/spring-sports/varsityboystennis
- https://www.covenantday.org/athletics/teams/spring-sports/varsitygirlsoccer
- https://www.covenantday.org/athletics/teams/spring-sports/varsitysoftball
- https://www.covenantday.org/athletics/teams/spring-sports/varsitytrackandfield
- https://www.covenantday.org/athletics/teams/winter-sports/varsityboysbasketball
- https://www.covenantday.org/athletics/teams/winter-sports/varsitygirlsbasketball
- https://www.covenantday.org/athletics/teams/winter-sports/varsityswimming
- https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/
- https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/
- https://www.maxpreps.com/nc/matthews/covenant-day-lions/
- https://www.maxpreps.com/nc/matthews/covenant-day-lions/<sport>/<yy-yy>/roster/`
- https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- https://www.ncisaa.org/recognition/wells-fargo-cup/history/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- https://www.ncisaa.org/sports/
- https://www.phenomhoopreport.com/2024-michael-marcus-staying-in-nc-commits-to-appalachian-state/
