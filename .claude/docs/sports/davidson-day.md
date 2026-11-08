# Davidson Day School — Sports
> Distilled from 20 source document(s) in `source-material/sports/davidson-day/`. Auto-extracted full text, lightly cleaned. Rebuilt 2026-11-08.
**Documents:** 247Sports Recruiting Rankings, Athletics Recap 2025-2026, College Commitments 2024-2026, College Commitments Class of 2027, Redesign Research 2026, School Profile 2026-2027, Wells Fargo Cup Standings 2020-2026, Awards and Honors, Championships, Coaches Pedigree and Continuity, D1 and Top-50 Academic Matriculation, Facilities and Infrastructure, NIL Landscape, National Basketball Profile, Power 4 Offers, Professional Athletes, Sports Medicine and Performance, Sports Offered, Top 100 Recruiting Rankings, WinLoss Records


---

## 247Sports Recruiting Rankings

*Source file: `Davidson Day - Sports - 247Sports Recruiting Rankings.md`*

# Davidson Day — Sports — 247Sports Recruiting Rankings

**Provenance.** Captured 2026-10-26 during `/plan recruitranks` by fetching 247Sports' public
North Carolina state recruiting lists (HTTP GET, no login; each list page carries national,
position and state rank, stars, composite score, listed high school and commitment per row).
Every football and basketball athlete on this school's College Pipeline roster
(`src/data/sportsPrograms/davidson-day.ts`, `pipeline.roster`) was matched by normalised name
(suffixes Jr./III dropped, punctuation stripped) AND graduating class, then accepted only if
247's listed high school is this school. **The app shows the 247Sports Composite** (user
decision 2026-10-26); the 247Sports in-house figures are recorded alongside for audit only.
Classes 2024–2026 are final (all signed and enrolled), so these ranks no longer move.

"NA" national rank = 247 publishes a state rank but no national rank for that player.
Sports other than football and basketball are not ranked by 247Sports and are out of scope.

## Recruiting rankings — matched athletes (247Sports Composite)

| Class | Athlete | Sport | Pos | Stars | Composite score | Composite national | Composite NC state | Composite position | 247 in-house national | 247 in-house NC state | 247 listed school | 247 profile |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| '26 | Will Stevens | Boys Basketball | C | 3 | 0.9123 | 186 | 4 | 35 | 150 | 4 | Davidson Day (Davidson, NC) | https://247sports.com/player/will-stevens-46149054/ |
| '26 | Cody Peck | Boys Basketball | C | 4 | 0.9450 | 120 | 2 | 17 | 82 | 2 | Davidson Day (Davidson, NC) | https://247sports.com/player/cody-peck-46150042/ |
| '25 | Isaiah Denis | Boys Basketball | CG | 4 | 0.9702 | 79 | 4 | 12 | 53 | 1 | Davidson Day (Davidson, NC) | https://247sports.com/player/isaiah-denis-46142390/ |

## Recruiting rankings — not on a 247Sports NC list (unrated)

Searched by name across the NC lists for 2023–2027 (football, basketball, women's basketball).
Absence means 247 published no rating for the player (typical for walk-ons, D2/D3 commits and
girls' basketball, where 247 ranks only 0–2 NC players per class); the app shows a dash.

- '24 Mason Smith — Boys Basketball → Mercer (D1)

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

## Athletics Recap 2025-2026

*Source file: `Davidson Day - Sports - Athletics Recap 2025-2026.md`*

# Davidson Day School — Sports — 2025–2026 Athletics Recap (school publication)

## Method

- **Compiled by:** Claude Code during `/plan ddathletes`, 2026-11-08.
- **Source:** the school's own eight-page "Home of the Patriots · 2025-2026 Athletics Recap",
 published on Issuu as *25-26 Athletics in Review* by the account `davidsondayschool`.
 Issuu document id `260601134603-feea5a5f14d1db3b4765484a1f266053` (the prefix encodes the
 upload time, 2026-06-01 13:46:03). The user supplied the link.
- **How:** Issuu blocks text export (`reader3_*.json` returns AccessDenied), so each page was
 fetched as the published 3000×2000 page image and transcribed by reading it. There is no
 text layer to diff against; figures and names below were read twice. Pages 5–8 (Patriot
 Athletic Club contributions, members and sponsors) are summarised, not transcribed:
 they list donor families and businesses, which the app has no use for.
- **Names:** Upper School athletes on the school's own published lists are transcribed, as
 the app's commitment roster already names them. **Middle School and grade 5/6/7/8 award
 winners are deliberately NOT transcribed** (minors below high school; see the memory rule
 "No minor student names").
- **This is the school's own claim list.** Each collegiate athlete was checked against an
 independent source where one exists; see "Verification" below. Two could not be matched
 to a college roster yet (their first college season has not started), and that is
 recorded rather than smoothed over.

## Source URLs

- https://issuu.com/davidsondayschool/docs/25-26_athletics_in_review (the publication)
- Page images, in order (publicly served by Issuu's CDN):
 - https://image.isu.pub/260601134603-feea5a5f14d1db3b4765484a1f266053/jpg/page_1.jpg … `page_8.jpg`
- Related: the 2026–27 School Profile already in the app repeats the same six headline
 figures on its page 3 —
 https://resources.finalsite.net/images/v1790855129/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf

## Page 1 — cover

"Home of the PATRIOTS — 2025-2026 ATHLETICS RECAP". Footer: 750 Jetton Street, Davidson, NC
| www.davidsonday.org | 704.237.5200. Photo collage (soccer, girls lacrosse, MS girls
basketball, cheer, girls soccer, track, boys basketball, a signing-day family photo).

## Page 2 — "NCISAA STATE CHAMPIONS" and headline figures (verbatim)

- NCISAA STATE CHAMPIONS: **Varsity Boys Tennis**; **Alena Rollinson — Varsity Track &
 Field – 200 Meters**.

| Figure | Label |
|---|---|
| **16** | NCISAA All-State Selections |
| **8** | Collegiate Athletes — Class of 2026 |
| **3** | Davidson Day Records Broken |
| **200+** | Student-Athletes — Middle & Upper School |
| **5** | NCISAA State Runners-Up |

These are the same six figures the 2026–27 School Profile prints; the app already carries
them (plan `ddprofile2`, PR #428). The 200 m champion is named here; the app's decision not
to name her stands (plan `ddprofile2`, Decisions).

## Page 3 — awards

### NCISAA All-State Awards (16, verbatim)

Alexis Blanchette, Girls Golf · Molly Brown, Lacrosse · Caroline Cerminara, Girls Tennis ·
Colin Cerminara, Boys Tennis · Scarlett Dressler, Girls Soccer · Alex Haponik, Cross
Country · Alexia Hatzopoulos, Volleyball · Nikolas Kososki, Boys Tennis · Elias Nojaim, Boys
Soccer · Cody Peck, Boys Basketball · Izzy Pierce, Lacrosse · Dara Polk, Volleyball · Gabe
Polk, Boys Tennis · Alena Rollinson, Track and Field · Will Stevens, Boys Basketball · Avery
Trumpower, Lacrosse.

Sixteen names, matching the "16" tile.

### COLLEGIATE ATHLETES (verbatim, in the order printed)

| # | Printed line |
|---|---|
| 1 | **Nick Arnold**, Basketball at Duke University |
| 2 | **Molly Brown**, Lacrosse at Flagler College |
| 3 | **Alex Haponik**, Track & Field at Emory University |
| 4 | **Sean Hayes**, Track & Field at Berry College |
| 5 | **Cody Peck**, Basketball at Dayton University |
| 6 | **Kipenzi Perry**, Soccer at NC State University |
| 7 | **Izzy Pierce**, Lacrosse at Wingate University |
| 8 | **Will Stevens**, Basketball at Clemson University |

Eight names, matching the "8 Collegiate Athletes — Class of 2026" tile. **The heading is
"Collegiate Athletes", not "scholarship athletes"** — the publication never uses the word
scholarship. Emory and Berry are NCAA Division III programs, which award no athletic
scholarships, and Nick Arnold joined Duke as a preferred walk-on (see Verification).

### Team MVPs and Coaches Awards

Varsity and JV winners are listed by team; Middle School and 5/6 and 7/8 winners are not
transcribed. Varsity MVPs relevant to the collegiate list: Molly Brown (Varsity Lacrosse),
Alex Haponik (Varsity Boys Cross Country), Sean Hayes (Varsity Boys Track & Field), Will
Stevens (Varsity Boys Basketball). Coaches Award: Nick Arnold (Varsity Boys Basketball).

## Page 4 — multi-sport athletes, milestones, athletes of the year

### Varsity & JV three- and four-sport athletes

Sixteen names listed (one four-sport athlete: Luke Oakley — Golf, Cross Country, Swimming,
Track and Field). Not transcribed in full; none of the eight collegiate athletes appears
on this list.

### MILESTONES (verbatim)

- **Nick Arnold**, 1000 Career Points, Boys Basketball
- **Molly Brown**, 400 Career Points, Lacrosse
- **Alex Haponik**, Davidson Day School Records in 800 Meters, 1600 Meters, Steeplechase,
 and Mile
- **Sean Hayes**, Davidson Day School Record in Discus, Track & Field
- **Izzy Pierce**, Davidson Day School All-Time Leading Scorer and 300 Career Goals,
 Lacrosse

Note: the "3 Davidson Day Records Broken" tile does not reconcile with this list on a
per-event count (Haponik names four events plus Hayes's discus). The school does not say
how it counts; the app does not use the records figure.

### Athletes of the year (verbatim)

- MALE ATHLETE OF THE YEAR — **Alex Haponik ’26**
- FEMALE ATHLETE OF THE YEAR — **Molly Brown ’26**
- MALE PRIDE OF A PATRIOT — Luke Oakley ’28
- FEMALE PRIDE OF A PATRIOT — Alena Rollinson ’27
- DENISE KOETH AWARD FOR FACULTY SPIRIT — Sabryna Gordon

(Sabryna Gordon is the school's Assistant Director of Athletics.)

## Pages 5–8 — Patriot Athletic Club (summary only)

- p.5 "Patriot Athletic Club Contributions": 23 bullet items funded in 2025–26 — banquet
 costs, championship rings for coaches, championship shirts, charter buses, golf bags and
 balls, crew oars, boats, an outboard motor and safety devices, a Turf Tank field-painting
 system, a concessions refrigerator for Wolter Field, and "Scorevision software for The
 Rayment at Wolter Field".
- p.6 "The Rayment Video Board at Wolter Field": thanks the Rayment family, the Trumpower
 family and the Patriot Athletic Club for funding a video board at Wolter Field.
- p.7 "Patriot Athletic Club Members": 72 family and individual names (not transcribed).
- p.8 "Patriot Athletic Club Sponsors": 18 sponsor families (not transcribed) and 13
 business logos (Haversack, Chesapeake Containment Systems, LKN Local, Celtic Pools,
 Chick-fil-A, Contentment Traphill N.C., Ferguson Hayes Hawkins PLLC, Garage Living, JB
 Machine Works, Seal Family Foundation, Omnia Construction Group, and two more).

The video board is a facilities fact. The app omits Davidson Day's Facilities card on
purpose (`src/data/sportsPrograms/davidson-day.ts` header), and one video board does not
change that: it stays here as a lead.

## Verification of the eight collegiate athletes (2026-11-08)

Level and conference are the researcher's, from each college's NCAA status, as for every
other row on the roster. Power 4 = SEC / Big Ten / ACC / Big 12.

| Athlete | Sport (app label) | College | Conf. | Level | Independent confirmation | Status |
|---|---|---|---|---|---|---|
| Nick Arnold | Boys Basketball | Duke | ACC | P4 | Duke 2026–27 roster: No. 55, G, 5-11, 175, Fr., Mooresville, N.C., Davidson Day, marked walk-on (Wikipedia roster table mirrors goduke.com). News & Observer (Langston Wertz Jr., 2026-05-15, via Yahoo): joins Duke as a **preferred walk-on**; transferred from Lake Norman High to Davidson Day for his senior season. His own post, 2026-05-14: "continuing my academic and basketball career as a walk-on at Duke University". | CONFIRMED (walk-on) |
| Molly Brown | Girls Lacrosse | Flagler | Peach Belt | D2 | HighSchoolOT 2026 all-state girls lacrosse, third team (posted 2026-07-22): "Molly Brown, Davidson Day (senior) — 71 goals, 30 assists; 52 GBs, 5 CTs; 48 DCs; Flagler (D2) recruit". ULTIMATE Lacrosse Charlotte "Committed" list: "Molly Brown, ULTIMATE Charlotte Class of 2026, committed to Flagler College". Flagler's 2027 roster is not yet published (2026-11-08). Flagler leaves the Peach Belt for the Sunshine State Conference in 2027–28, so her first season (spring 2027) is a Peach Belt season. | CONFIRMED by press; roster pending |
| Alex Haponik | Track & Field | Emory | UAA | D3 | Emory 2026 men's cross country roster lists "Alex Haponik, Fr." MileSplit signing record 54618 (added 2025-10-20): "Edward Haponik", Davidson Day School, Class of 2026, committed to Emory University — Edward is evidently his given name and Alex the name he uses; the school prints Alex. NCISAA D2 2026 results: boys 1600 3rd (4:26.95), 3200 4th, 800 5th. | CONFIRMED (roster) |
| Sean Hayes | Track & Field | Berry | SAA | D3 | No independent confirmation yet: Berry's 2026–27 roster is not published (its 2026 roster, the 2025–26 season, predates him) and no press item was found. The school's own list is the authority here. NCISAA D2 2026 results: boys shot put 2nd (45' 10"), boys discus 2nd (146' 10"), consistent with the discus school record. | SCHOOL-PUBLISHED ONLY |
| Cody Peck | Boys Basketball | Dayton | Atlantic 10 | D1 | Already on the app roster (247Sports No. 120 national / No. 2 NC). | already shipped |
| Kipenzi Perry | Girls Soccer | NC State | ACC | P4 | TopDrawerSoccer recruiting roundup, 2024-09-09, Girls D-I Class of 2026: "M Kipenzi Perry (Charlotte Independence SC) committed to NC State." Carolina Ascent FC W League roster release, 2025-05-06: attends Davidson Day School, Charlotte Independence 06/07 ECNL. NC State 2026–27 roster (season preview PDF and TopDrawer): No. 20, D, Fr., hometown Boone, N.C. MaxPreps Davidson Day girls soccer 2024–25: Jr.; NCISAA 2A all-state 2023–24. The Ascent release's "freshman season at NC State in 2025" conflicts with every other source (Class of 2026, Fr. in 2026–27) and is treated as the release's error. Hometown varies by source (Boone / Kernersville); irrelevant to the app. | CONFIRMED (roster) |
| Izzy Pierce | Girls Lacrosse | Wingate | South Atlantic | D2 | Wingate 2027 women's lacrosse roster: "Izzy Pierce, Freshman, 5-2, Mooresville, N.C., Davidson Day HS" (bio blank). HighSchoolOT 2026 all-state, third team: "Isabella Pierce, Davidson Day (senior) — 85 goals, 25 assists; 51 GBs, 14 CTs; 55 DCs; Wingate (D2) recruit"; also listed among two-time selections as Izzy Pierce. ULTIMATE Lacrosse: "Izzy Pierce, ULTIMATE Charlotte Class of 2026, committed to Wingate University". | CONFIRMED (roster) |
| Will Stevens | Boys Basketball | Clemson | ACC | P4 | Already on the app roster (247Sports No. 186 / No. 4 NC). | already shipped |

### Verification source URLs

- Duke roster (official): https://goduke.com/sports/mens-basketball/roster — fetched 2026-11-08
 but the page is JavaScript-rendered; the table was read from
 https://en.wikipedia.org/wiki/2026%E2%80%9327_Duke_Blue_Devils_men%27s_basketball_team
- News & Observer via Yahoo Sports (2026-05-15): https://sports.yahoo.com/articles/did-duke-basketball-just-next-101500311.html
- Nick Arnold's announcement (2026-05-14): https://x.com/Nick_Arnold15/status/2055004311675936904
- Duke Chronicle player preview (2026-09-29; 403 to automated fetch, headline only): https://dukechronicle.com/article/duke-mens-basketball-player-preview-nick-arnold-20260929
- HighSchoolOT 2026 all-state girls lacrosse: https://www.highschoolot.com/story/the-2026-highschoolot-all-state-girls-lacrosse-team/22375831/
- ULTIMATE Lacrosse Charlotte commitments: https://ultimategoallacrosse.com/charlotte
- Molly Brown recruiting profile: https://iwlca.sportsrecruits.com/athlete/molly_brown8
- Flagler conference move (2026-04-23): https://flaglerathletics.com/news/2026/4/23/GEN_042326_SSC_announcement.aspx
- Emory 2026 men's cross country roster: https://emoryathletics.com/sports/mens-cross-country/roster
- MileSplit signing record (Edward Haponik → Emory): https://can.milesplit.com/signings/54618
- Berry men's track roster (2026 season; no Hayes yet): https://berryvikings.com/sports/mens-track-and-field/roster
- NCISAA D2 track results 2026 (Haponik, Hayes): http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/index.html
- TopDrawerSoccer recruiting roundup (2024-09-09): https://www.topdrawersoccer.com/club-soccer-articles/recruiting-roundup:-september-9-15_aid53778
- Carolina Ascent FC W League roster (2025-05-06): https://www.carolinaascent.com/news/2025/05/06/carolina-ascent-fc-w-league-team-announces-2025-roster/
- NC State 2026 season preview PDF (roster table): https://gopack.com/documents/download/2026/8/10/MATCH_1___JAMES_MADISON.pdf
- TopDrawerSoccer NC State roster: https://www.topdrawersoccer.com/college-soccer/college-soccer-details/women/nc-state/clgid-28
- MaxPreps Davidson Day girls soccer roster 2024–25: https://www.maxpreps.com/nc/davidson/davidson-day-patriots/soccer/girls/spring/roster/
- Wingate roster bio: https://wingatebulldogs.com/sports/womens-lacrosse/roster/izzy-pierce/14800

## Against the app (planning-time comparison, 2026-11-08)

File: `src/data/sportsPrograms/davidson-day.ts`, `pipeline` card; Compare rows
`p4-commits-2426` and `d1-commits-2426` in `src/data/metricValues.ts`.

| Today | After this source |
|---|---|
| Roster: 10 rows (’24: 1 · ’25: 7 · ’26: 2) | 16 rows (’26: 8) — six new: Arnold, Perry, Brown, Pierce, Haponik, Hayes |
| Funnel 10 / 9 D1 / 3 P4 | **16 / 11 D1 / 5 P4** (P4 adds Arnold – Duke, Perry – NC State) |
| Sport bars: Basketball 4 (2 P4), Volleyball 2, Soccer 1, Swimming 1, Equestrian 1 (P4) | Basketball 5 (3 P4), Soccer 3 (1 P4), Volleyball 2, Lacrosse 2, Track & Field 2, Swimming 1, Equestrian 1 (P4) |
| `funnelNote` / `rosterNote`: "no named list for 2024 or 2026" | the 2026 class is fully named by this publication; only 2024 stays a floor |
| Compare `p4-commits-2426` = 3, `d1-commits-2426` = 9 | **5** and **11** |
| Level mix: 9 D1 · 1 D3 | 11 D1 · 2 D2 · 3 D3 — first D2 rows for this school |


---

## College Commitments 2024-2026

*Source file: `Davidson Day - Sports - College Commitments 2024-2026.md`*

# Davidson Day School — Sports — College Commitments (2024–2026)

> **Provenance:** Compiled by Claude Code on 2026-07-04 from the public sources listed
> below, to preserve the hard data behind the *Power 4 commits* and *Division I commits*
> metrics in the app (`src/data/metricValues.ts`). Level classification is by hand:
> **Power 4 = SEC / Big Ten / ACC / Big 12** only. Counts are distinct athletes; a
> documented minimum (the school's named roster is incomplete for the Class of 2024).
>
> **Verification attempt (2026-07-04):** The 2025 class is well documented (Nov 2024 signing
> post, 6 D1). Searched web + On3 for the 2024 & 2026 cohorts; davidsonday.org news archive
> 404s, ddspatriotsathletics.com returns 403, and On3 lists only football/basketball
> prospects (e.g. Cody Peck, Xavier Hall) — not multi-sport commits. At that point D1 = 9
> was a documented floor with 2024 (only Mason Smith) and 2026 (Stevens, Peck) under-captured.
>
> **Update (2026-11-08, `/plan ddathletes`):** the school's own *2025-2026 Athletics Recap*
> (Issuu, 2026-06-01) names all **eight** Class of 2026 collegiate athletes, closing the
> 2026 gap. Six are new here. Each was checked against a college roster or independent press
> where one exists — see `Davidson Day - Sports - Athletics Recap 2025-2026.md` in this
> folder for the per-athlete evidence. **The Class of 2024 remains a floor** (one named
> athlete; the school published no list for it).

## Sources
- Davidson Day "Patriots in the NCAA" roster + press, as compiled in
 `Davidson_Day__Sports__D1_and_Top-50_Academic_Matriculation.pdf`.
- Davidson Day "Seven Student-Athletes Sign National Letters of Intent" (davidsonday.org,
 Nov 2024 signing = Class of 2025):
 https://www.davidsonday.org/p/~board/all-school-news/post/seven-davidson-day-student-athletes-sign-national-letters-of-intent
- Charlotte-area National Signing Day roundup (2024–25 signing day, Class of 2025 cycle;
 accessed 2026-07-04) — Yahoo Sports / Charlotte Observer:
 https://sports.yahoo.com/national-signing-day-where-charlotte-111500448.html
- **Davidson Day "25-26 Athletics in Review" (2025–2026 Athletics Recap), p.3 "Collegiate
 Athletes" (Class of 2026, 8 names):**
 https://issuu.com/davidsondayschool/docs/25-26_athletics_in_review
- Davidson Day 2026–27 School Profile, p.3 ("8 Collegiate Athletes, Class of 2026" — count only):
 https://resources.finalsite.net/images/v1790855129/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf
- Per-athlete confirmation for the Class of 2026 (rosters and press; full detail and URLs in
 the Athletics Recap file): Duke 2026–27 roster · News & Observer via Yahoo, 2026-05-15 ·
 HighSchoolOT 2026 all-state girls lacrosse · Wingate 2027 roster · Emory 2026 men's XC
 roster · MileSplit signing 54618 · TopDrawerSoccer recruiting roundup 2024-09-09 · Carolina
 Ascent FC roster release 2025-05-06 · NC State 2026–27 roster.

## Class of 2024 — Division I (1), Power 4 (0)
| Athlete | Sport | College | Conf. | P4 |
|---------|-------|---------|-------|----|
| Mason Smith | Basketball | Mercer | Southern | |

_Documented floor: the school published no signing list for this class._

## Class of 2025 — Division I (6), of which Power 4 (2)
| Athlete | Sport | College | Conf. | P4 |
|---------|-------|---------|-------|----|
| Isaiah Denis | Basketball | North Carolina | ACC | ✅ |
| Abbie Gordon | Equestrian | Georgia | SEC | ✅ |
| Matthew Doty | Swimming | Air Force | Mountain West | |
| Jordin Glass | Volleyball | UT Chattanooga | Southern | |
| Kaydee Smith | Volleyball | Alabama A&M | SWAC | |
| Isabel Seifert | Soccer | Richmond | A-10 | |

_D3 (2025): Dom Desmond (Sewanee, SAA)._

## Class of 2026 — 8 collegiate athletes · Division I (4), of which Power 4 (3) · D2 (2) · D3 (2)

The school's complete list (Athletics Recap p.3). Order as printed.

| Athlete | Sport | College | Conf. | Level | P4 | Note |
|---------|-------|---------|-------|-------|----|------|
| Nick Arnold | Basketball | Duke | ACC | D1 | ✅ | **Preferred walk-on** (his own announcement 2026-05-14; N&O 2026-05-15). Duke roster No. 55, G, Fr. Transferred from Lake Norman HS for his senior year; 1,000 career points (school milestone list). |
| Molly Brown | Lacrosse | Flagler College | Peach Belt | D2 | | HighSchoolOT all-state third team, "Flagler (D2) recruit"; 71 G / 30 A in 2026; Female Athlete of the Year ’26. Flagler joins the Sunshine State Conference in 2027–28. |
| Alex Haponik | Track & Field | Emory | UAA | D3 | | On Emory's 2026 men's XC roster (Fr.). MileSplit signing lists him as Edward Haponik. Male Athlete of the Year ’26; school records in 800 m, 1600 m, steeplechase and mile. |
| Sean Hayes | Track & Field | Berry College | SAA | D3 | | School-published only as of 2026-11-08 (Berry's 2026–27 roster not yet out). School discus record; NCISAA D2 2026 runner-up in shot put and discus. |
| Cody Peck | Basketball | Dayton | Atlantic 10 | D1 | | Already carried (247Sports No. 120 national). |
| Kipenzi Perry | Soccer | NC State | ACC | D1 | ✅ | TopDrawerSoccer, 2024-09-09: committed to NC State from Charlotte Independence SC. NC State 2026–27 roster No. 20, D, Fr. |
| Izzy Pierce | Lacrosse | Wingate | South Atlantic | D2 | | Wingate 2027 roster: Freshman, Davidson Day HS. HighSchoolOT all-state third team (as Isabella Pierce), "Wingate (D2) recruit"; 85 G / 25 A; school all-time leading scorer, 300 career goals. |
| Will Stevens | Basketball | Clemson | ACC | D1 | ✅ | Already carried (247Sports No. 186 national). |

## Totals, Classes of 2024–2026 (distinct athletes)

| Measure | Was (2026-07-04) | Now (2026-11-08) |
|---|---|---|
| Documented commitments, all divisions | 10 | **16** |
| NCAA Division I (incl. P4) | 9 | **11** |
| Power 4 | 3 | **5** |
| Division II | 0 | 2 |
| Division III | 1 | 3 |

**App metric values:** Power 4 = **5** · Division I = **11** (`p4-commits-2426`,
`d1-commits-2426`). The Class of 2026 is complete per the school; the Class of 2024 stays a
documented floor.

**On "scholarship":** none of the school's lists uses the word. The app counts documented
*commitments to college athletics*, which is the only claim the sources support. Division III
programs (Emory, Berry) award no athletic scholarships, and Arnold is a walk-on.


---

## College Commitments Class of 2027

*Source file: `Davidson Day - Sports - College Commitments Class of 2027.md`*

# Davidson Day — Sports — College Commitments, Class of 2027 (current seniors)

> **Provenance:** Written by Claude Code on 2026-11-08 during `/implement seniorsrow`. The
> **per-class retention file** the `/athlete-commits` skill keeps for the current senior
> class — every public commitment, verbal or signed, any level, with sources. It is the value
> of the `seniors-committed` Compare row and is promoted into the 2024–26 window file when the
> window rolls after graduation (from 1 June 2027). **Never delete it.**
>
> **Status: 0 confirmed.** The school posts signing articles on davidsonday.org and
> publishes an Athletics Recap each June; nothing for the Class of 2027 yet.
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

## Confirmed — 0

## Leads
None found. Cody Peck (Dayton) is Class of 2026 and already counted on the card.

## Totals for the `seniors-committed` row (as of 2026-11-08)
**0 confirmed** (value `'0'`).


---

## Redesign Research 2026

*Source file: `Davidson Day - Sports - Redesign Research 2026.md`*

# Davidson Day School — Sports — Redesign Research (2026)

> **Provenance:** Compiled by Claude Code on 2026-07-26 via live web research, to populate
> the consolidated Sports cards in the app (`src/data/sportsPrograms/davidson-day.ts`).
> Verifies and extends the existing dossier PDFs in this folder.

> ## ⚠️ THREE CORRECTIONS OF RECORD
>
> 1. **Cam Reddish did NOT attend Davidson Day.** He attended **The Haverford School** and
> then **Westtown School**, both in Pennsylvania, before Duke. His name appears nowhere in
> Davidson Day's Hall of Fame, championship board, or alumni lists. **The school's actual
> NBA alum is C.J. Huntley ('20, Phoenix Suns).** This corrects a false premise carried in
> the research brief itself — do not reintroduce it.
> https://247sports.com/Player/Cam-Reddish-77233/high-school-134667/ ·
> https://www.si.com/college/2018/03/10/cam-reddish-westtown-high-school-duke-basketball-recruit
> 2. **There was no "nationally-ranked basketball program around 2018-2019."** The program's
> peak was **2019–20 (30–1, NCISAA 2A champions, No. 5 in NC)** — a *state-level* peak.
> Davidson Day has **never** appeared in a MaxPreps or High School On SI national Top 25.
> 3. The prior dossier states 2023–24 produced 1 state title. **It produced 7.**

## 1. Sports Offered
- **35 teams across 13 sports**; **~90%** of students in grades 5–12 participate. Athletics
 start in **grade 5** — earlier than any other school in this comparison.
 https://www.davidsonday.org/athletics · https://www.davidsonday.org/athletics/patriot-teams
- NCISAA **3A**, **Foothills Athletic Conference**. Classification progressed 1A → 2A → 3A
 as enrollment grew, reaching 3A for 2024–25.
- **15-acre campus**, of which **eight acres** are fields and a wooded park with waterfront
 access to the Lake Davidson Nature Preserve — which supports the **rowing** program.
 https://www.davidsonday.org/about/our-campus
- Fields **no** wrestling, softball, field hockey or boys lacrosse. MaxPreps lists some of
 these; the school's own teams page does not and is treated as authoritative.

## 2. Winning Record — 7 titles, then 4, then 1

| Program | 2023–24 (2A) | 2024–25 (3A) | 2025–26 (3A) |
|---|---|---|---|
| Boys Tennis | STATE (5–0 final) | STATE (D2, 5–2 final) | **STATE** (D2, 5–0 final) |
| Volleyball | STATE 24–4–2 | STATE 24–4 | **RUNNER-UP** 18–11 |
| Girls Soccer | STATE 18–3 | STATE 14–2 | none — 3–11, 1st-round exit |
| Boys Soccer | STATE 17–3 | STATE 17–4 | none — quarterfinal |
| Boys Basketball | STATE 24–7 | SEMIFINAL 22–13 | **SEMIFINAL** 23–11 |
| Boys & Girls Cross Country | **STATE ×2** | — | — |
| Girls Basketball | — | — | none — 0–6 |

**2023–24 was historic: 7 state titles, the most of any 2A school**, plus the NCISAA
**Wells Fargo Cup**. 2024–25's four titles were the most of any 3A school.
- https://www.highschoolot.com/story/the-2023-24-ncisaa-team-state-champions-in-every-sport/21461689/
- https://www.highschoolot.com/story/the-2024-25-ncisaa-team-state-champions-in-every-sport/22016545/
- https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/
- 2026 spring rundown (tennis): https://www.highschoolot.com/story/ncisaa-spring-championship-rundown/22363802/

**The 2025–26 decline is the story:** girls soccer's three-peat and boys soccer's two-year title run ended in one year. Girls
soccer fell from 14–2 champions to 3–11. Coaching turnover is the visible common factor —
soccer changed hands after 2024–25 (Laatsch → Letourneau).

Win %: boys basketball **30–1 (.968)** at the 2019–20 peak · volleyball 111–33–2 (.771) over
five seasons · boys soccer 63–15–1 (.797) over four title-era seasons · boys basketball
69–31 (.690) over the last three.
https://www.maxpreps.com/nc/davidson/davidson-day-patriots/basketball/history/

**All-time: 37 team state championships, 37 individual state championships.**
https://www.davidsonday.org/athletics/history-and-achievements
*(The school's own board is stale — it omits the 2026 boys tennis title, which would make 38. It also lists boys soccer 2022 and boys cross country 2022, which the NCISAA results do not support. See Davidson Day - Sports - Wells Fargo Cup Standings 2020-2026.md.)*

## 3. College Pipeline — 10 documented commits, 9 D1, 3 P4

> **Superseded 2026-11-08.** The school's own *2025-2026 Athletics Recap* names all eight Class of
> 2026 collegiate athletes, so the roster is now **16 commits, 11 D1, 5 P4**. The current table
> and per-athlete verification live in `Davidson Day - Sports - College Commitments 2024-2026.md`
> and `Davidson Day - Sports - Athletics Recap 2025-2026.md`; the table below is kept as the
> 2026-07 record.

| Class | Athlete | Sport | College | Conference | Level |
|---|---|---|---|---|---|
| 2026 | Will Stevens | Basketball | Clemson | ACC | P4 |
| 2026 | Cody Peck | Basketball | Dayton | Atlantic 10 | D1 |
| 2025 | Isaiah Denis | Basketball | North Carolina | ACC | P4 |
| 2025 | Abbie Gordon | Equestrian | Georgia | SEC | P4 |
| 2025 | Matthew Doty | Swimming | Air Force | Mountain West | D1 |
| 2025 | Jordin Glass | Volleyball | UT Chattanooga | Southern | D1 |
| 2025 | Kaydee Smith | Volleyball | Alabama A&M | SWAC | D1 |
| 2025 | Isabel Seifert | Soccer | Richmond | Atlantic 10 | D1 |
| 2025 | Domenic Desmond | Soccer | Sewanee | SAA | D3 |
| 2024 | Mason Smith | Basketball | Mercer | Southern | D1 |

https://www.davidsonday.org/p/~board/all-school-news/post/seven-davidson-day-student-athletes-sign-national-letters-of-intent

**Documented floors, not a census.** The school published a full seven-athlete list for 2025
but no equivalent for 2024 or 2026, and **its official athletics site (ddspatriotsathletics.com)
is dead** — it returns "School Not Found." That single infrastructure failure accounts for
most of the missing roster, schedule and coaching data in this report. The school states that
100+ Davidson Day athletes have competed at 80 different colleges.

**Ranked recruits — three four-stars in consecutive classes:**
- **Cody Peck '26** — No. 82 (247Sports), No. 99 (ESPN 100), No. 8 center nationally.
 Transferred in from **IMG Academy** July 2025; chose Dayton over Creighton, Tennessee, Miami.
 https://247sports.com/player/cody-peck-46150042/
- **Isaiah Denis '25** — No. 56 (On3 Industry), **No. 1 recruit in North Carolina**; 16.7 ppg
 as a senior; chose UNC over Tennessee, Miami, Wake Forest, Ohio State.
 https://www.on3.com/news/north-carolina-basketball-isaiah-denis-commits-to-tar-heels-hubert-davis/
- **Will Stevens '26** — 6'10", No. 1 in NC (On3); committed to Clemson over Vanderbilt and
 South Carolina. https://www.on3.com/rivals/news/4-star-pf-will-stevens-commits-to-clemson/

## 4. Honors & Pro Alumni

| Athlete | Class | Path | Accomplishment |
|---|---|---|---|
| **C.J. Huntley** | 2020 | DDS → Appalachian State → **Phoenix Suns** | Two-way contract June 2025; NBA debut 2025–26 — **first App State player in an NBA game since 1952** |
| Will Grier | 2014 | DDS → Florida / West Virginia → NFL | 3rd-round pick 2019; **4th in 2018 Heisman voting**; threw for 837 yds and 10 TDs in one HS game |
| Maya Caldwell | 2017 | DDS → Georgia → WNBA | **33rd overall, 2021 WNBA Draft**; Atlanta and Indiana; pro in Israel, Turkey, Spain |
| John Hunter Nemechek | — | DDS → NASCAR | **2021 Truck Series regular-season champion**; 13 Truck / 11 Xfinity wins; No. 42 Legacy Motor Club |
| Rashun Davis '12 · Lamar Briggs '14 · Aaron Seward '13 | — | → overseas pro | Basketball (Europe), baseball (Australia), football (Germany) |

https://www.highschoolot.com/story/c-j-huntley-davidson-day-and-appalachian-state-grad-signs-two-way-contract-with-the-phoenix-suns/22067021/ ·
https://appstatesports.com/news/2026/3/23/mens-basketball-cj-huntley-makes-nba-debut-for-phoenix-suns.aspx ·
https://en.wikipedia.org/wiki/John_Hunter_Nemechek

*The school's own site is stale here too — it still reads "1 WNBA Player, 1 NFL Player" and
has not been updated for Huntley's NBA arrival.*

**Honors:** Will Grier — **2× NC Gatorade POY**, Parade Magazine National Player of the Year,
Army All-American. **150+ NCISAA All-State athletes** all-time. **37 individual state titles**
(Melissa Zammitti '17 alone won ten). **Wells Fargo Cup** won 2019–20 and 2023–24.
**Patriot Athletic Hall of Fame** created 2025; eight-person inaugural class; inducts biennially.
https://www.davidsonday.org/athletics/patriot-athletic-hall-of-fame

## 5. Coaching
**AD: Chris Turner.**
- **Gary Ellington, boys basketball since 2025** — **319–143 over 17 years at Weddington HS**,
 2 NCHSAA state championships, 9 conference titles, 9× conference COY, 2× NCBCA COY, 8 Sweet
 16 appearances. Year one at DDS: **23–11**, state semifinal, and a **win over Oak Hill
 Academy**. Also serves as **Upper School Strength Teacher** — the only documented
 strength-training role on campus.
 https://www.davidsonday.org/p/~board/all-school-news/post/davidson-day-announces-new-varsity-boys-basketball-head-coach
- **Brad Laatsch, soccer 2017–2025** — longest verified head-coaching tenure; head coach of
 **both** boys and girls soccer; 5 state titles across the two; rebuilt boys soccer from
 7–13 to 17–4. Both programs collapsed the season after his departure.
- **Catherine Glass, volleyball ~2017–present** — also Assistant AD; 3 state titles.
- **Mallorie Haines, girls basketball since 2025** — a Davidson Day '21 alum who played D1
 basketball at Davidson College.

**Head coaches for 8 of 13 sports are undocumented** — the school publishes no coaching
directory and its athletics site is offline. Basketball shows chronic churn: at least seven
boys head coaches since 2008, and seven girls head coaches in eight documented seasons. The
2024 title-winning coach (James Long) left for the college ranks a season later.

## 6. Facilities & Athlete Care — GENUINELY EMPTY (card omitted)

Two venue names exist with **one descriptive sentence between them**:
- **Yates Gym** — "a full-size, varsity-regulation gymnasium with adjustable spectator seating."
- **Wolter Field** — football, soccer, lacrosse, track; named for Chuck and Karen Wolter.
https://www.davidsonday.org/about/our-campus

**NOT FOUND for any venue:** square footage · year built · seating capacity · master campus
plan · facilities gallery. **No on-campus pool** despite a coed swim team with multiple
individual state champions — the training venue is presumably off-site and is not confirmed.
**No dedicated weight room specs.**

**Athlete care has exactly one verifiable data point:** athletic trainer **Sabryna Gordon**.
**NOT FOUND:** team physician · hospital/orthopedic partnership · published concussion
protocol · named S&C coach · any sports-medicine webpage. For a Charlotte-area private school
this is unusually thin — every peer school in this project publishes a full sports-medicine page.

**Because the public record is genuinely absent rather than merely unsearched, the app omits
card 1f for Davidson Day** rather than rendering three near-empty rows.

**Broadcast:** NFHS Network carries Davidson Day basketball (varsity, JV and MS, boys and
girls). Ticketing platform not found.
https://www.nfhsnetwork.com/schools/davidson-day-school-davidson-nc/basketball

### Photos available (not currently used in the app, since 1f is omitted)
Verified HTTP 200 on 2026-07-26, from the school's Finalsite CDN. Downloaded to
`public/facilities/` for future use should facilities data become available:
- `davidson-day-campus-aerial.jpg` — https://resources.finalsite.net/images/f_auto,q_auto/v1765293293/davidsondayorg/cogpzni2rnpr2nr5krwo/DroneShot.jpg
- `davidson-day-volleyball-champions.jpg` — https://resources.finalsite.net/images/f_auto,q_auto/v1766075195/davidsondayorg/ymi5or1g7ygcqrnxq9bq/VballStateChamps.jpg

No photo identifiably captioned as Yates Gym interior or Wolter Field was located; the drone
shot is the best available proxy for the fields.

## 7. National Stage & NIL — GENUINELY EMPTY (card omitted)

**Davidson Day has never appeared in a national Top 25 boys basketball ranking.** Verified
against the final 2025–26 High School On SI Top 25 — the only NC school there was Greensboro
Day at No. 21, the team that eliminated Davidson Day.
https://www.si.com/high-school/boys-basketball/final-2025-26-top-25-boys-high-school-basketball-national-rankings-01knfp30h69z

**The genuine national result:** Davidson Day **beat Oak Hill Academy 86–79 in November 2025**,
handing that national program its first loss of the season. The app carries this on card 1b.
https://www.maxpreps.com/news/DENPuVfqpEmRw2iffpG6ew/basketball-recap-oak-hill-academys-undefeated-season-over-after-six-games.htm

**NIL: eligible context, zero disclosed activity.** The NCISAA policy (approved Feb 2024,
effective 2024–25) applies, and NC public-school athletes were barred where Davidson Day's
were not. But **there are zero named Davidson Day NIL deals, zero dollar figures and zero
valuations publicly** — despite a top-100 recruit and two ACC signees. Searched across
general web, On3's NIL database, 247Sports player profiles and local coverage.

**Both halves of card 1g are empty, so the card is omitted.**

## GAPS / UNCONFIRMED
- Classes of 2024 and 2026 commitments largely undocumented (the site is dead).
- Head coaches for 8 of 13 sports unknown; no coach start years published.
- Gary Ellington's hire year is ambiguous — the announcement says "Friday, April 17" without
 a year; MaxPreps implies a 2025 hire. The school spells it "Gary"; some snippets say "Greg".
- Brad Laatsch's departure is inferred from MaxPreps coach fields, not announced.
- 2023–24 records for cross country and boys tennis not retrievable.
- 2025–26 boys basketball final record shows as both 23–11 and 23–12; 23–11 is more cited.
- Football's recent records entirely unconfirmed; its documented peak is 2011–2015.
- The "1 USA Swimming Multiple-Time All-American" is not named by the school.
- Girls basketball listed as a single "Varsity/JV" line — whether one or two squads is unclear.


---

## School Profile 2026-2027

*Source file: `Davidson Day - Sports - School Profile 2026-2027.md`*

# Davidson Day School — Sports (School Profile 2026–2027)

## Method

- **Compiled by:** Claude Code, during `/plan ddprofile2`, 2026-11-04.
- **How:** page 3 of the school's 2026–27 School Profile, extracted with
 `pdftotext -layout` and checked against the full transcription made during `ddprofile`:
 `source-material/college-support/davidson-day/Davidson Day - College Support - School Profile 2026-2027.md`
 (it records the PDF's SHA-1, `9057ebb865e7593f5357e1ecf0929bcea145658e`, re-confirmed
 2026-11-04).
- **This is the school's own claim list.** Before any title or count reaches the page, check
 it against the NCISAA's own published results. A Davidson Day title list has over-claimed
 before: the history page's boys soccer 2022 and boys cross country 2022, both disproved by
 the brackets and the Cup term totals.

## Source URLs

- https://resources.finalsite.net/images/v1790855129/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf
 (School Profile 2026–2027, page 3: the "2025-2026 PATRIOTS Review" sidebar and the
 "Varsity Athletic Teams" list)
- NCISAA results archive, for verification: https://archives.ncisaa.org/index.php?sport=22&years=2025-2026
 (track and field; the page links out to result files rather than printing results inline)
- NCISAA boys tennis bracket, 2025–26: https://archives.ncisaa.org/index.php?sport=16&years=2025-2026

## "2025-2026 PATRIOTS Review" sidebar (verbatim figures)

| Printed figure | Printed label |
|---|---|
| **1** | NCISAA STATE CHAMPIONS — "Varsity Boys Tennis"; a named student, "Varsity Track & Field – 200 Meters" |
| **16** | NCISAA all-State Selections |
| **8** | Collegiate Athletes, Class of 2026 |
| **3** | Davidson Day Records Broken |
| **5** | NCISAA State Runners-Up |
| **200+** | Student Athletes (Middle & Upper School) |

The graphic prints "1" while naming two champions: a team (boys tennis) and an individual
event (the 200 meters). The individual is named on the profile. The app does not need the
name to report the title, so it is not carried into app data.

## "Varsity Athletic Teams" list (verbatim)

Baseball (B)\*\*, Basketball (B, G), Cheerleading (G), Crew (B,G), Cross Country (B, G),
Football (B)\*\*, Golf (B, G), Lacrosse (G), Soccer (B, G), Swim (B, G), Tennis (B, G),
Track & Field (B, G), Volleyball (G).

"\*\*In partnership with SouthLake Christian Academy"

## Against the app (planning-time comparison, 2026-11-04)

File: `src/data/sportsPrograms/davidson-day.ts`.

| Profile claim | App today | Status |
|---|---|---|
| Boys tennis 2025–26 state champions | `record` card: "Boys tennis is the only title survivor of 2025–26, its fourth straight"; Cup `titleYears` include 2026 | matches |
| Individual 200 m title, 2025–26 | `honors`: "37 individual state championships", with no year breakdown | **new; verify** against the NCISAA 2025–26 track results before use |
| 16 all-state selections, 2025–26 | `honors`: "More than 150 NCISAA All-State athletes all-time. Seven Patriots earned spring 2026 all-state honors…" | **new figure**; consistent (7 spring ⊂ 16 for the year) |
| 8 collegiate athletes, Class of 2026 | `pipeline` roster names 2 for '26 (Stevens, Peck); `funnelNote` says the school published "no equivalent for 2024 or 2026" | **new figure**; the school now states a Class of 2026 count without names |
| 5 NCISAA state runners-up, 2025–26 | Cup `runnerUpYears` show 2 for 2025–26 (volleyball 2025, girls lacrosse 2026) | **does not reconcile on team sports alone**; the other 3 may be individual events. Verify before use |
| 3 school records broken | no home | no card names records; not used |
| 200+ student athletes (MS & US) | `offered`: "~90% of grades 5–12 participate" | **new figure**; consistent |
| Football and baseball "in partnership with SouthLake Christian Academy" | `offered` lists Football (V, MS) and Baseball (V, MS) with no mention | **new fact** |
| Total enrollment 565 (page 2, "School Information") | "a 550-student school" (`pipeline.headline`), "about 550 students" (`honors.subhead`), "~550-student" (file header) | **update** to the profile figure |

## Verification (2026-11-05)

Done during `/implement ddprofile2`, against the association's official meet timing pages
and the NCISAA archive.

### Source URLs (verification)

- NCISAA Division 2 Track and Field Championships, Raleigh, 5/15–5/16/2026 (MeetPro by
 DirectAthletics, Mitchell Timing; the official results for the division Davidson Day ran in):
 http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/index.html
 - Girls 200 Meters (event #4): http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_15.html
 - Girls 100 Meters (event #2): http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_14.html
 - Boys Shot Put (event #33): http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_27.html
 - Boys Discus (event #35): http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_28.html
- NCISAA volleyball bracket, 2025–26: https://archives.ncisaa.org/index.php?sport=12&years=2025-2026
- NCISAA girls lacrosse bracket, 2025–26: https://archives.ncisaa.org/index.php?sport=19&years=2025-2026
- The NCISAA track archive page for 2025–26 (https://archives.ncisaa.org/index.php?sport=22&years=2025-2026)
 carries only logos and sponsor banners, with no results link. The timing site above was
 found through its start list in a web search.

### 200 m title: CONFIRMED

Girls 200 Meters final, Division 2: 1st, Alena Rollinson (JR), Davidson Day, 25.55 (wind
−0.3). She also had the fastest prelim (25.51). This is the **girls'** 200 meters, so the app
says that. The athlete is not named in app data (plan decision).

### 5 state runners-up: RECONCILED (2 team + 3 individual)

| # | Event | Result | Source |
|---|---|---|---|
| 1 | Volleyball (team), fall 2025 | state runner-up | Cup ledger `runnerUpYears: [… 2025]`; volleyball bracket |
| 2 | Girls lacrosse (team), spring 2026 | state runner-up | Cup ledger `runnerUpYears: [2026]`; girls lacrosse bracket |
| 3 | Girls 100 Meters, D2 final | 2nd, Alena Rollinson (JR), 12.60 | results_14 |
| 4 | Boys Shot Put, D2 final | 2nd, Parker Smith (SR), 45' 10" | results_27 |
| 5 | Boys Discus, D2 final | 2nd, Sean Hayes (SR), 146' 10" | results_28 |

That is exactly five, matching the profile. **Not checked:** individual swimming results
(the 2025–26 swim archive links only a program, not a results file) and any individual
tennis tournament. The winter Cup term total (37.5) is one basketball semifinal loss, so
Davidson Day scored no swim team points. A 2nd-place individual swim would make the count
six rather than five, so the fit is strong, though not proven to be complete.

### "37 individual state championships": not changed

The history page gives no years, so whether its 37 already includes the 2026 200 m title
cannot be determined. The app keeps the 37 and adds the 2025–26 title as a separate
sentence.

### Other Davidson Day finishes in the D2 meet (context, not used)

Girls 4×100 relay 5th (52.07); boys 1600 3rd (Haponik, 4:26.95); boys 3200 4th
(Haponik, 9:35.69); boys 800 5th (Haponik, 2:00.99); boys 300 m hurdles 8th (Carnaggio, 44.80).


---

## Wells Fargo Cup Standings 2020-2026

*Source file: `Davidson Day - Sports - Wells Fargo Cup Standings 2020-2026.md`*

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


---

## Awards and Honors

*Source file: `Davidson_Day__Sports__Awards_and_Honors.pdf`*

DAVIDSON DAY SCHOOL AWARDS & HONORS
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Awards & Honors
Individual state titles, national player honors and program-wide recognition.
At a Glance
Individual state titles 37 (swimming, track & field, tennis)[1]
All-State athletes 150+ NCISAA All-State selections[1]
National honors 1 Parade National POY, 1 Army All-American POY, 1 Gatorade NC POY[1]
All-sports cup NCISAA Wells Fargo Cup winner 2019–20 and 2023–24[1]
Beyond team titles, Davidson Day reports 37 individual state championships and more than 150 NCISAA
All-State selections, plus a set of national player-of-the-year honors concentrated in its football and tennis
history.[1]
National & signature individual honors
l Will Grier (football, 2014) — National Player of the Year by Parade and others; two-time Gatorade North
Carolina Player of the Year; Army All-American; three-time NCISAA state champion.[2]
l Jenny Falcone (tennis, 2011) — 2010 North Carolina High School Female Athlete of the Year; ranked No.
50 nationally; 72–2 career record with three NCISAA state titles (2009–10 singles, 2010 doubles).[3]
l Melissa Zammitti (cross country / track, 2017) — 10-time NCISAA individual state champion.[3]
l Maya Caldwell (basketball, 2017) — top-100 / four-star recruit; SEC All-Tournament and SEC Honor Roll
at Georgia.[3]
Individual state champions (swimming, track, tennis)
Athlete Event(s) & year(s)
Matt Doty 100 Back (2023, 2024); 200 IM (2024, 2025); 100 Breast (2025)[1]
Logan Zucker 200 IM (2019, 2022); 100 Fly (2020, 2021, 2022); 50 Free (2021)[1]
Melissa Zammitti 800m, 1600m, 3200m, 5k titles (2012–2017)[1]
Olivia Hardley 100 Free (2021, 2022); 100 Back (2022)[1]
Aaron Seward 100m, 200m, 300m hurdles (2013)[1]
Ricky Smith Shot Put & Discus (2012, 2013)[1]
Jenny Falcone Tennis singles (2009, 2010)[1]
Sophia Bellissimo 50 Free (2020)[1]
Janie Coble 100m hurdles (2024)[1]
Mitchell Zammitti 1600m, 5k (2019)[1]
Hadley Zucker Pole vault (2018)[1]
Davidson Day School — Athletics Research Series · compiled from public sources Page 1
DAVIDSON DAY SCHOOL AWARDS & HONORS
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
The individual-title board is led by swimming and distance running — a reminder that the school's honors run well
beyond its marquee basketball program.
Sources
[1] Davidson Day School — History and Achievements (individual state titles; All-State; national honors).
[2] Davidson Day School — Patriot Athletic Hall of Fame (Grier; Falcone; Zammitti; Caldwell).
[3] Davidson Day School — Patriot Athletic Hall of Fame inductee citations.
Davidson Day School — Athletics Research Series · compiled from public sources Page 2


---

## Championships

*Source file: `Davidson_Day__Sports__Championships.pdf`*

DAVIDSON DAY SCHOOL CHAMPIONSHIPS
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Championships
Team state titles by program, plus program-wide honors — reconciled to the school's stated totals.
At a Glance
Team state titles 37 (reconciles exactly to the table below)[1]
Individual state titles 37 (swimming, track & field, tennis)[1]
Wells Fargo Cup NCISAA all-sports cup winner 2019–20 and 2023–24[1]
Most-decorated team Girls soccer — 6 state titles across two eras
Classification Progressed 1A fi 2A fi 3A as enrollment grew[2]
Davidson Day reports 37 team state championships and 37 individual state championships, and is a
routine top-three finisher in the NCISAA Wells Fargo Cup all-sports standings, winning that cup in 2019–20 and
2023–24.[1] The program-by-program table below sums to exactly 37.
Program Titles Years
Girls Soccer 6 2011, 2012, 2013, 2023, 2024, 2025
Boys Cross Country 4 2020, 2021, 2022, 2023
Football 4 2011, 2012, 2013, 2015
Volleyball 4 2016, 2019, 2023, 2024
Boys Soccer 3 2022, 2023, 2024
Boys Swimming 3 2022, 2023, 2024 (400 Free Relay)
Boys Tennis 3 2023, 2024, 2025
Girls Basketball 3 2019, 2020, 2021
Boys Basketball 2 2020, 2024
Boys Track & Field 2 2013, 2021 (4x400 Relay)
Girls Cross Country 1 2023
Girls Lacrosse 1 2022
Girls Track & Field 1 2024 (4x800 Relay)
Total: 6+4+4+4+3+3+3+3+2+2+1+1+1 = 37 team state titles.[1]
Reading the title board
l Girls soccer is the most-decorated program (6 titles) with two distinct dynasties — an early-2010s run
(2011–13) and a current three-peat (2023–25).
l Boys basketball (the marquee program) holds two titles (2020, 2024) and reached the 2026 3A state
semifinal; its titles bracket a sustained high-major recruiting run.
Davidson Day School — Athletics Research Series · compiled from public sources Page 1
DAVIDSON DAY SCHOOL CHAMPIONSHIPS
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
l Breadth is the story: 11 different programs have won team state titles, spanning fall, winter and spring —
the engine behind the school's Wells Fargo Cup finishes.
l Title volume has accelerated as the school climbed from 1A to 3A, with many championships landing in
2022–2025.[2]
The 2024 boys-basketball title was the program's second (after 2020); the 2026 team reached the 3A semifinal but
did not add a third, so the count remains two.
Sources
[1] Davidson Day School — History and Achievements (team championship board; Wells Fargo Cup).
[2] Grokipedia / Davidson Day School (classification progression 1Afi2Afi3A).
Davidson Day School — Athletics Research Series · compiled from public sources Page 2


---

## Coaches Pedigree and Continuity

*Source file: `Davidson_Day__Sports__Coaches_Pedigree_and_Continuity.pdf`*

DAVIDSON DAY SCHOOL COACHES: PEDIGREE & CONTINUITY
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Coaches: Pedigree & Continuity
Leadership of the marquee program and athletic administration — with turnover noted candidly.
At a Glance
Boys basketball Led by Ricky Hickman and Jeffrey Coble (2024–25 onward)[1]
Prior head coach James Long (2023–24 state title) — left for the college ranks[2]
Athletic director Chris Turner (per MaxPreps listing)[3]
Continuity read Marquee program has seen recent head-coach turnover but sustained results.
Boys basketball leadership
The boys basketball program is currently led by Ricky Hickman and Jeffrey Coble. North Carolina's official
roster bio for Davidson Day alum Isaiah Denis credits him with playing “for coaches Jeffrey Coble and Ricky
Hickman,” and national recruiting coverage routinely quotes Hickman as the head coach during the 2024–26
cycles.[1] Hickman has served as Denis's lead in-program voice through a high-profile recruitment and the
2025–26 run to the 3A semifinal.
The 2023–24 NCISAA 2A state title was won under James Long, who lifted the team's win rate from roughly
22% to 77% (a 24–7 season) before leaving to coach in college.[2] Long's background includes a three-year
stint as head coach at WVU Tech (62–21, three NAIA national-tournament trips, 2019–20 River States
Conference Coach of the Year) and head-coaching roles at the University of Charleston (WV).[2] His departure
is the clearest example of head-coach turnover in the marquee program.
Athletic administration
MaxPreps lists Chris Turner as Davidson Day's athletic director; Turner also appears in the basketball staff as
an assistant coach, so the AD title should be read with that caveat.[3]
Flagged gaps (honest disclosure)
l Public, sourced tenure and pedigree bios are thin for most head coaches outside basketball; this
document does not estimate them.
l The boys-basketball staff carries an unusual two-name leadership listing (Hickman and Coble); the precise
division of the “head coach” title is not definitively documented.
l Coaching continuity across the championship soccer, volleyball, swimming and tennis programs could not
be confirmed and is intentionally left out rather than guessed.
Pedigree highlight that is firmly sourced: the program that won the 2024 title was rebuilt by a coach (Long) with a
documented college-level résumé, and its talent has since been recruited by ACC staffs — a credibility signal even
amid turnover.
Sources
[1] University of North Carolina Athletics — Isaiah Denis roster bio (coaches Coble and Hickman).
Davidson Day School — Athletics Research Series · compiled from public sources Page 1
DAVIDSON DAY SCHOOL COACHES: PEDIGREE & CONTINUITY
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
[2] University of Charleston Athletics — James Long coaching bio (WVU Tech, Davidson Day 24–7).
[3] MaxPreps — Davidson Day Patriots program page (athletic director listing) and team staff.
Davidson Day School — Athletics Research Series · compiled from public sources Page 2


---

## D1 and Top-50 Academic Matriculation

*Source file: `Davidson_Day__Sports__D1_and_Top-50_Academic_Matriculation.pdf`*

DAVIDSON DAY SCHOOL D1 & TOP-50 ACADEMIC MATRICULATION
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
D1 & Top-50 Academic Matriculation
Confirmed NCAA Division I commitments and top-50-academic athletes, organized by graduating class.
At a Glance
Scope A Every confirmed NCAA D1 commitment, all sports/conferences; “(P4)” tags
SEC/B1G/ACC/Big 12
Scope B Athletes continuing their sport at a US-News top-50 National University or top-50 Liberal
Arts college (any division)
Out of Scope D2 / D3 / NAIA / JUCO destinations — named below for transparency, not dropped
Coverage caveat School's named list runs through the Class of 2021; 2022–2026 added from press /
official-athletics sources[1]
Headliners Denis (UNC), Stevens (Clemson), Caldwell (Georgia), Grier (Florida/WVU); MIT, Cornell,
Brown academics
This document combines two in-scope categories and then lists out-of-scope destinations for full transparency.
(A) every confirmed NCAA Division I commitment, across all sports and conferences — Power-4 leagues are
tagged “(P4)” but mid-major D1 is fully included. (B) any athlete continuing their sport at a top-50 academic
institution by either US News list (Best National Universities or Best Liberal Arts Colleges), regardless of
division — so select D3 programs (MIT, Haverford, Washington and Lee, Colorado College) qualify here even
though D3 is otherwise out of scope. Everything else (D2, the remaining D3, NAIA and junior-college
destinations) is named in the final section rather than silently omitted.
Important coverage caveat: Davidson Day's published “Patriots in the NCAA” roster lists names only through the
Class of 2021. Recent classes (2022–2026) are compiled from press reports and official university rosters and may
be incomplete — flagged honestly rather than presented as exhaustive.
Scope A — Division I commitments by class
Class Athlete Sport D1 School (Conference)
2026 Will Stevens Basketball Clemson (ACC) (P4)[2]
2026 Cody Peck Basketball Dayton (Atlantic 10)[3]
2025 Isaiah Denis Basketball North Carolina (ACC) (P4)[2]
2024 Mason Smith Basketball Mercer (Southern)[4]
2021 Mary Alexander Soccer College of Charleston (CAA)[1]
2021 Mallorie Haines Basketball Davidson College (Atlantic 10)[1]
2021 Blane St. Clair Basketball Army / West Point (Patriot)[1]
2020 Cierra Huntley Volleyball Virginia Tech (ACC) (P4)[1]
2020 C.J. Huntley Basketball Appalachian State (Sun Belt) fi NBA[1]
2020 Jackson Threadgill Basketball Charlotte / UNCC (American)[1]
Davidson Day School — Athletics Research Series · compiled from public sources Page 1
DAVIDSON DAY SCHOOL D1 & TOP-50 ACADEMIC MATRICULATION
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Class Athlete Sport D1 School (Conference)
2019 Ryann Sinclair Golf NC State (ACC) (P4)[1]
2017 Maya Caldwell Basketball Georgia (SEC) (P4) fi WNBA[1]
2017 Sehrena Hull Volleyball North Carolina (ACC) (P4)[1]
2017 Chase Monroe Football Wake Forest (ACC) (P4)[1]
2017 Austin Reeves Football Virginia Tech (ACC) (P4)[1]
2017 Garrett Groulx Football James Madison (Sun Belt)[1]
2017 Aedon Johnson Football Hampton (CAA)[1]
2017 Tommy Lawley Football Navy (American)[1]
2017 Ryan Titus Football Wofford (Southern)[1]
2017 Anika Riley Basketball Winthrop (Big South)[1]
2017 Parker Tompkins Basketball Furman (Southern)[1]
2017 Melissa Zammitti XC / Track Cornell (Ivy) — also Top-50 academic[1]
2016 Cade Carney Football Wake Forest (ACC) (P4)[1]
2016 Sammie Cunningham Football Campbell (CAA)[1]
2016 Jonathan Jeffries Football Campbell (CAA)[1]
2016 Christian Launius Football James Madison (Sun Belt)[1]
2016 DJ Johnson Football Butler (Pioneer / Big East)[1]
2016 Dustin Tyler Football Gardner-Webb (Big South)[1]
2016 Khalil Moore Football Elon (CAA)[1]
2016 Myles McGregor Basketball Presbyterian (Big South)[1]
2015 Howard Strachan Football Brown (Ivy) — also Top-50 academic[1]
2015 Jermaine Blackmon Basketball College of Charleston (CAA)[1]
2015 Glen Coates Football Army / West Point (independent)[1]
2015 Trevor Darby Football Elon (CAA)[1]
2015 Anthony DiGioia Football Furman (Southern)[1]
2015 Jacob Robinson Football Western Carolina (Southern)[1]
2014 Will Grier Football Florida fi West Virginia (SEC/Big 12) (P4) fi NFL[1]
2014 Michael Stevens Football NC State (ACC) (P4)[1]
2014 Kyle Fuller Golf Air Force (Mountain West)[1]
2014 Lamar Briggs Baseball Jackson State (SWAC)[1]
2014 Rachel Bringewatt XC Richmond (A-10) — also Top-50 academic[1]
Davidson Day School — Athletics Research Series · compiled from public sources Page 2
DAVIDSON DAY SCHOOL D1 & TOP-50 ACADEMIC MATRICULATION
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Class Athlete Sport D1 School (Conference)
2013 Schuyler Coleman Football North Carolina (ACC) (P4)[1]
2013 Jordan Young Football Cornell (Ivy) — also Top-50 academic[1]
2013 Justin Jordan Basketball UNC Greensboro (Southern)[1]
2013 Maddy Clark Soccer Presbyterian (Big South)[1]
2013 Ciara Murphy Soccer USC Upstate (Big South)[1]
2013 Caitlin Rodrigues Soccer Queens (Charlotte) — D2 at time; now D1[1]
2012 Dorian Albritton Basketball VMI (Southern)[1]
2012 Phillip Anglade Basketball VMI (Southern)[1]
2012 Richard Brown Basketball Army / West Point (Patriot)[1]
2012 Rashun Davis Basketball Radford (Big South) fi pro overseas[1]
2011 Bernard Sullivan Basketball Clemson (ACC) (P4) / Charlotte[1]
2011 Keith Bellfield Basketball Furman (Southern)[1]
2011 Brianna Wills Soccer Appalachian State (Sun Belt)[1]
2011 Jenny Falcone Tennis College of Charleston (CAA)[1]
Scope B — Top-50 academic athletes (continuing their sport)
Athletes recruited/rostered at a US-News top-50 National University or top-50 Liberal Arts college, regardless of
division. Names already in Scope A that are also top-50 academic are noted there; the rows below are the
genuinely additional (mostly D3) destinations.
Class Athlete Sport School (academic tier)
2016 Jack Strachan Lacrosse MIT (top-5 National University; D3)[1]
2016 Joe Hartman Basketball Haverford (top-15 Liberal Arts; D3)[1]
2021 Holden Perry Track Colorado College (top-30 Liberal Arts; D3)[1]
2011 Clay McLean Basketball Washington and Lee (top-15 Liberal Arts; D3)[1]
Also top-50 academic and already listed in Scope A (D1):
l Cornell (Ivy) — Melissa Zammitti (2017), Jordan Young (2013).
l Brown (Ivy) — Howard Strachan (2015).
l Wake Forest — Chase Monroe (2017), Cade Carney (2016).
l Richmond — Rachel Bringewatt (2014).
Borderline / flagged (near the top-50 cutoff)
l Sewanee (Cameron Caldwell 2015, Omar Caldwell 2012, basketball), Rhodes (McGahan 2015, Woodrow
2013, Sumner 2012, Reid 2014) and Centre (Garvin Stewart 2017, football) sit near the top-50 Liberal Arts
cutoff and move year to year — listed as borderline rather than asserted.[1]
Davidson Day School — Athletics Research Series · compiled from public sources Page 3
DAVIDSON DAY SCHOOL D1 & TOP-50 ACADEMIC MATRICULATION
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
l University of Chicago and Williams College appear on the school's institution-level list, but no named
athlete maps to them in the published roster, so they are not individually attributed.[5]
Out of Scope — named for transparency
These Davidson Day athletes continued in college athletics at D2, D3, NAIA or junior-college programs that
are not top-50 academic institutions. They fall outside Scopes A and B, but are named here rather than
dropped. Divisions reflect each school's classification as listed; a few have since changed divisions.
Class Athlete Sport Destination (division)
2021 Jaden Graham Basketball Rochester Institute of Technology (D3)[1]
2021 Juliana Park Basketball Randolph-Macon (D3)[1]
2021 Jessie Wiles Basketball Bridgewater College (D3)[1]
2021 Gab Strachan Volleyball Salve Regina (D3)[1]
2021 Audrey Hanson Lacrosse Benedictine College (NAIA)[1]
2020 Cat Bodick Volleyball USC Aiken (D2)[1]
2020 Adam Brazil Basketball Hampden-Sydney (D3)[1]
2020 Will Coble Basketball Randolph-Macon (D3)[1]
2019 Kate Roberts Lacrosse Southwestern University (D3)[1]
2019 Josie Wiles Basketball Barry University (D2)[1]
2016 Alex Ansted Baseball Averett (D3)[1]
2016 Ben Roberts Basketball Randolph College (D3)[1]
2016 Andrew Tobin Basketball Guilford (D3)[1]
2016 Ryan Moore Lacrosse Coker (D2)[1]
2016 Michael Clark Football UNC Pembroke (D2)[1]
2016 Matt Price Football Tusculum (D2)[1]
2015 Kenny Hairston Basketball Limestone (D2)[1]
2015 Blake Scherrman Basketball Berry College (D3)[1]
2015 Jack Freeby Lacrosse Roanoke (D3)[1]
2015 Thomas Brennan Lacrosse Berry College (D3)[1]
2014 Jordan Brown Football Georgia Military College (JUCO)[1]
2014 Paxton Turner Lacrosse Mars Hill (D2)[1]
2014 Emmy Roberts Volleyball Randolph College (D3)[1]
2014 Graham Kiley Golf Roanoke (D3)[1]
2014 Johnny McLean Basketball Emory & Henry (D3 at the time)[1]
Davidson Day School — Athletics Research Series · compiled from public sources Page 4
DAVIDSON DAY SCHOOL D1 & TOP-50 ACADEMIC MATRICULATION
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Class Athlete Sport Destination (division)
2013 Aaron Seward Football Carson-Newman (D2)[1]
2013 Evan Gates Football Tusculum (D2)[1]
2013 Jack Kolls Baseball Roanoke (D3)[1]
2012 D.J. Carnegie Basketball St. Andrews (NAIA)[1]
2012 Jason Eddie Basketball Randolph College (D3)[1]
2012 Sam Mozon Basketball Guilford (D3)[1]
2012 Tre Hunt Football Mars Hill (D2)[1]
2012 Jackson Goyette Soccer Roanoke (D3)[1]
2011 Gabriel Mercer Basketball Muhlenberg (D3)[1]
Tagging rule reminder: “(P4)” marks SEC / Big Ten / ACC / Big 12 for visibility only; it is never used to exclude
mid-major D1. Several Ivy and academic-elite destinations carry both a D1 and a Top-50-academic tag. The
Out-of-Scope list is for completeness; those athletes are not counted in the D1 or Top-50-academic totals.
Sources
[1] Davidson Day School — Patriots in the NCAA (named athlete list, classes 2011–2021).
[2] University of North Carolina / Clemson Athletics — Denis and Stevens (Classes 2025, 2026).
[3] Dayton Daily News / 247Sports — Cody Peck (Dayton, 2026).
[4] Lake Norman Publications — Mason Smith (Mercer, 2024).
[5] Davidson Day School — History and Achievements (institution-level college list incl. Chicago, Williams).
Davidson Day School — Athletics Research Series · compiled from public sources Page 5


---

## Facilities and Infrastructure

*Source file: `Davidson_Day__Sports__Facilities_and_Infrastructure.pdf`*

DAVIDSON DAY SCHOOL FACILITIES & INFRASTRUCTURE
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Facilities & Infrastructure
Athletic grounds and indoor venues on the Patriots' lakeside campus — with unconfirmed items flagged.
At a Glance
Campus 15-acre campus at 750 Jetton Street, Davidson, NC; opened 2007[1]
Athletic land Roughly 8 of 15 acres are fields, playgrounds and a wooded waterfront park[1]
Primary gym Yates Gym — full-size, varsity-regulation, with adjustable spectator seating[1]
Outdoor field Wolter Field (named for the Wolter family, lead donors)[2]
Water access Waterfront access to Lake Davidson (Lake Norman region); supports rowing[1]
Overall read Compact campus; venue documentation is limited — several items unconfirmed.
Davidson Day occupies a single 15-acre campus in the Lake Norman region, opened in 2007. The school
states that about eight of those acres are given to playgrounds, athletic fields and a wooded park with
waterfront access to Lake Davidson.[1] A dedicated master campus plan or capital-expansion page — the
richest facilities source for several peer schools — was not located for Davidson Day in this pass.
Indoor venues
Venue Use Detail
Basketball, volleyball, Full-size, varsity-regulation gymnasium with adjustable
Yates Gym
assemblies spectator seating[1]
Yates Gym is the documented home court; it has hosted nationally covered recruiting commitments (an ACC
commit announced there on the 247Sports broadcast).[3] No separate field house, weight-room square footage,
or auxiliary practice gym was confirmed.
Outdoor grounds
Venue / area Sport(s) Detail
Football, soccer, lacrosse, School's named athletic field; created and improved
Wolter Field
track with Wolter-family philanthropy[2]
Adjacent lake access supports the coed rowing
Lake Davidson waterfront Rowing
program[1]
Part of the ~8 acres of athletic land on the 15-acre
Campus fields / park Practice, cross country
campus[1]
Flagged gaps (honest disclosure)
l No master campus / capital plan page found — venue inventory below is built from the school's “Our
Campus” page and athletics coverage rather than a planning document.
Davidson Day School — Athletics Research Series · compiled from public sources Page 1
DAVIDSON DAY SCHOOL FACILITIES & INFRASTRUCTURE
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
l Pool / natatorium unconfirmed — Davidson Day fields a coed swim team and has produced multiple
individual state swimming champions, but no on-campus pool was identified; the swim training venue is
most likely off-site and is not confirmed here.
l Strength & conditioning space undocumented — no weight-room or performance-center specifications
were located.
l Specific dimensions / dates / square footage for Yates Gym and Wolter Field were not published in
sources reviewed.
This is a compact, single-campus athletic footprint. The honest read is that Davidson Day's publicly documented
facilities are modest relative to its competitive results; absence of a venue here reflects missing public documentation,
not a confirmed absence of the facility.
Sources
[1] Davidson Day School — Our Campus (davidsonday.org/about/our-campus).
[2] Davidson Day School — Patriot Athletic Hall of Fame (Wolter family / Wolter Field).
[3] 247Sports — Isaiah Denis commitment coverage (“Yates Gymnasium”).
Davidson Day School — Athletics Research Series · compiled from public sources Page 2


---

## NIL Landscape

*Source file: `Davidson_Day__Sports__NIL_Landscape.pdf`*

DAVIDSON DAY SCHOOL NIL LANDSCAPE
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
NIL Landscape
Name, image and likeness context for the Patriots — eligibility framing, with no public figures to report.
At a Glance
Governing body NCISAA (independent schools)
HS NIL context Independent-school athletes are not bound by public-school (NCHSAA) NIL limits
Public DDS deals None located
Honest read No public high-school NIL figures exist for Davidson Day athletes.
As an NCISAA independent school, Davidson Day sits outside the North Carolina public-school athletic
association (NCHSAA) framework, which historically gives independent-school athletes more latitude on name,
image and likeness activity than their public-school peers. That is a structural eligibility point, not evidence
of activity.
What can and cannot be said
l No public NIL deals or dollar figures for any Davidson Day high-school athlete were located in this pass.
l The program's most marketable names (e.g., a top-100 recruit and two ACC commits in recent classes)
make Davidson Day a plausible setting for NIL activity, but nothing specific is confirmed.
l Collegiate NIL is out of scope here — deals those alumni may sign at North Carolina, Clemson or Dayton
belong to their universities, not to Davidson Day.
Consistent with peer schools in this series: high-school NIL dollar amounts are generally not made public, so the
honest conclusion is ‘eligible context, no disclosed figures.’
Sources
[1] Davidson Day School — Patriot Teams (NCISAA membership).
[2] 247Sports / On3 — Davidson Day recruit profiles (marketability context only; no NIL figures disclosed).
Davidson Day School — Athletics Research Series · compiled from public sources Page 1


---

## National Basketball Profile

*Source file: `Davidson_Day__Sports__National_Basketball_Profile.pdf`*

DAVIDSON DAY SCHOOL NATIONAL BASKETBALL PROFILE
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
National Basketball Profile
Why boys basketball is the marquee program — framed by what the recruiting record actually supports.
At a Glance
Identity Charlotte-area pipeline for high-major basketball talent
Recent ACC commits Isaiah Denis (UNC, 2025) and Will Stevens (Clemson, 2026)[1]
Top-100 senior Cody Peck (2026) — No. 82 nationally (247Sports), committed to Dayton[2]
Pro alumni C.J. Huntley (NBA), Maya Caldwell (WNBA)[3]
Honest framing National profile is driven by individual recruits, not team rankings.
Boys basketball is Davidson Day's research-determined marquee program. The case rests less on national
team rankings — an NCISAA 3A school will rarely appear in national team polls — and more on a striking
concentration of high-major individual recruits in recent classes.
The current recruiting pipeline
Player Class Destination Status
Isaiah Denis 2025 North Carolina (ACC) Four-star; on UNC's 2025–26 roster[1]
Will Stevens 2026 Clemson (ACC) Four-star center; committed[4]
Cody Peck 2026 Dayton (A-10) Four-star, No. 82 nationally; committed[2]
Mason Smith 2024 Mercer (Southern) D1 signee[5]
Two Atlantic Coast Conference commitments in back-to-back classes (Denis to North Carolina, Stevens to
Clemson) plus a top-100 national recruit (Peck) is an unusually strong two-year haul for a school of Davidson
Day's size.[1][2][4]
Track record into the pros
The pipeline extends past college. C.J. Huntley (2020) went from Davidson Day to Appalachian State and
reached the NBA on a two-way deal with the Phoenix Suns in 2025, debuting in 2025–26. Maya Caldwell
(2017) went to Georgia and into the WNBA.[3] Both validate the program's development claims with concrete
outcomes.
AAU and circuit exposure
l Denis starred for Team CP3 (Chris Paul's program) on Nike's EYBL circuit.[1]
l Peck competed on elite AAU circuits including the EYBL and Peach Jam before his senior year.[2]
l The program schedules nationally relevant competition — the 2024 title team played public schools, private
powers and basketball academies en route to the championship.[6]
Davidson Day School — Athletics Research Series · compiled from public sources Page 1
DAVIDSON DAY SCHOOL NATIONAL BASKETBALL PROFILE
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Calibration: Davidson Day is best described as a rising high-major pipeline in the Charlotte area rather than a
nationally ranked “powerhouse.” The evidence supports the former precisely; it does not support national
team-ranking language.
Sources
[1] University of North Carolina Athletics — Isaiah Denis bio; 247Sports — Denis commitment (Team CP3 / EYBL).
[2] Dayton Daily News / 247Sports — Cody Peck commitment and national ranking (No. 82).
[3] Wikipedia / NBA.com / WNBA.com — C.J. Huntley and Maya Caldwell professional profiles.
[4] Clemson University Athletics — Will Stevens roster bio.
[5] Lake Norman Publications — Davidson Day 2024 state-championship coverage (Mason Smith / Mercer).
[6] Lake Norman Publications — 2024 title-game report (strength of schedule).
Davidson Day School — Athletics Research Series · compiled from public sources Page 2


---

## Power 4 Offers

*Source file: `Davidson_Day__Sports__Power_4_Offers.pdf`*

DAVIDSON DAY SCHOOL POWER 4 OFFERS & COMMITMENTS
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Power 4 Offers & Commitments
Confirmed Power-4 (SEC / Big Ten / ACC / Big 12) commitments and offers from Patriot athletes.
At a Glance
Current P4 commits Isaiah Denis – UNC (ACC); Will Stevens – Clemson (ACC)[1]
Historical P4 (taken) Maya Caldwell – Georgia (SEC); Will Grier – Florida/West Virginia[2]
Football P4 alumni Virginia Tech, UNC, NC State, Wake Forest[3]
Verification Current commits confirmed on official university athletics sites.
Confirmed Power-4 commitments (current)
Athlete Class School (Conf.) Verification
Isaiah Denis 2025 North Carolina (ACC) On UNC's official 2025–26 roster[1]
Will Stevens 2026 Clemson (ACC) On Clemson's official roster page[4]
Both were verified directly on the universities' athletics sites rather than aggregators — Denis appears on North
Carolina's men's basketball roster (he played in 10 games as a freshman), and Stevens is listed by Clemson as
an incoming four-star center.[1][4]
Power-4 offers not taken (basketball)
l Cody Peck (2026) held P4 offers from Clemson, NC State, LSU, Tennessee and Miami (FL) before
choosing Dayton (Atlantic 10).[5]
l Isaiah Denis (2025) chose North Carolina over reported interest/offers including Ohio State, Miami,
Pittsburgh, Tennessee, Wake Forest and Kansas.[1]
l Will Stevens (2026) picked Clemson over Vanderbilt and South Carolina.[4]
Historical Power-4 (commitments taken)
Athlete Class Sport P4 School (Conf.)
Will Grier 2014 Football Florida fi West Virginia (SEC / Big 12)[2]
Maya Caldwell 2017 Basketball Georgia (SEC)[2]
Cierra Huntley 2020 Volleyball Virginia Tech (ACC)[3]
Sehrena Hull 2017 Volleyball North Carolina (ACC)[3]
Chase Monroe 2017 Football Wake Forest (ACC)[3]
Cade Carney 2016 Football Wake Forest (ACC)[3]
Austin Reeves 2017 Football Virginia Tech (ACC)[3]
Michael Stevens 2014 Football NC State (ACC)[3]
Davidson Day School — Athletics Research Series · compiled from public sources Page 1
DAVIDSON DAY SCHOOL POWER 4 OFFERS & COMMITMENTS
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Athlete Class Sport P4 School (Conf.)
Schuyler Coleman 2013 Football North Carolina (ACC)[3]
Ryann Sinclair 2019 Golf NC State (ACC)[3]
“Power 4” here means SEC, Big Ten, ACC or Big 12. Davidson Day's P4 footprint is broad: basketball is the current
driver, but the football championship era (2011–2015) also sent multiple athletes to ACC programs.
Sources
[1] University of North Carolina Athletics — Isaiah Denis roster bio.
[2] Wikipedia / school Hall of Fame — Will Grier and Maya Caldwell (Florida/WVU; Georgia).
[3] Davidson Day School — Patriots in the NCAA (football/volleyball/golf P4 destinations).
[4] Clemson University Athletics — Will Stevens roster bio.
[5] Dayton Daily News / 247Sports — Cody Peck offer list.
Davidson Day School — Athletics Research Series · compiled from public sources Page 2


---

## Professional Athletes

*Source file: `Davidson_Day__Sports__Professional_Athletes.pdf`*

DAVIDSON DAY SCHOOL PROFESSIONAL ATHLETES
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Professional Athletes
Patriots who have reached the professional ranks — verified individually, with a correction to the school's
own count.
At a Glance
NBA C.J. Huntley — Phoenix Suns (two-way), debuted 2025–26[1]
NFL Will Grier — QB, 2019 third-round pick (Carolina)[2]
WNBA Maya Caldwell — guard; with Minnesota Lynx as of 2026[3]
Overseas Rashun Davis — professional basketball in Europe[4]
Correction School's site lists ‘1 NFL, 1 WNBA’ — not yet updated for Huntley's NBA arrival.
Davidson Day's Wikipedia notable-alumni section lists an NBA player, an NFL quarterback and a WNBA player;
each was checked against independent sources. All three check out — and the NBA case is a recent
development the school's own page has not yet caught up to.
C.J. Huntley — NBA (verified)
Huntley (Davidson Day 2020) played five seasons at Appalachian State, then signed a two-way contract with
the Phoenix Suns after going undrafted in 2025 and made his NBA debut in the 2025–26 season — reported
as the first App State player to appear in an NBA game since 1952.[1] His Davidson Day attendance is
confirmed on NBA.com and Basketball-Reference.
Will Grier — NFL
Grier (Davidson Day 2014) was a three-time state champion and national high-school player of the year who
went on to Florida and West Virginia, finished fourth in the 2018 Heisman voting, and was a third-round pick
of the Carolina Panthers in 2019. The school's Hall of Fame lists NFL stints with Carolina, Philadelphia and
Dallas.[2] (Active NFL roster status changes; this reflects his documented career rather than a live roster claim.)
Maya Caldwell — WNBA
Caldwell (Davidson Day 2017) starred at Georgia and was drafted 33rd overall by the Indiana Fever in 2021.
She has played for the Atlanta Dream, was selected by the Portland Fire in the 2026 expansion draft, and — as
of 2026 — is with the Minnesota Lynx; she has also played professionally in Spain.[3]
Additional professional
Rashun Davis (2012) played at Radford and has had a long professional basketball career in Europe (including
Bosnia, Hungary, Kosovo, Slovenia, Serbia, Slovakia and Romania), per the school's Hall of Fame.[4]
Honest correction worth flagging for the episode: the school's “Additional Achievements” page still reads ‘1 NFL
Player, 1 WNBA Player’ and has not been updated to reflect C.J. Huntley reaching the NBA in 2025–26. The NBA
claim is independently verified here.
Davidson Day School — Athletics Research Series · compiled from public sources Page 1
DAVIDSON DAY SCHOOL PROFESSIONAL ATHLETES
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Sources
[1] NBA.com / Basketball-Reference / Watauga Democrat / Sun Belt Conference — C.J. Huntley (Suns two-way; NBA debut).
[2] Davidson Day Hall of Fame / Wikipedia — Will Grier (Florida, West Virginia, 2019 NFL Draft, Panthers/Eagles/Cowboys).
[3] Wikipedia / WNBA.com / FOX Sports — Maya Caldwell (Indiana, Atlanta, Portland expansion draft, Minnesota Lynx 2026).
[4] Davidson Day Patriot Athletic Hall of Fame — Rashun Davis (Radford; professional career in Europe).
Davidson Day School — Athletics Research Series · compiled from public sources Page 2


---

## Sports Medicine and Performance

*Source file: `Davidson_Day__Sports__Sports_Medicine_and_Performance.pdf`*

DAVIDSON DAY SCHOOL SPORTS MEDICINE & PERFORMANCE
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Sports Medicine & Performance
Athletic training, sports medicine and strength & conditioning — a thin public record, stated honestly.
At a Glance
Confirmed staff Sabryna Gordon, Athletic Trainer (sgordon@davidsonday.org)[1]
Health-system partner None confirmed
Strength & No named coach or program page located
conditioning
Overall read One named athletic trainer confirmed; broader program documentation is sparse.
Davidson Day does not publish a dedicated sports-medicine or athletic-training program page that could be
located in this pass. The one concrete, confirmable detail is a named athletic trainer on staff, Sabryna
Gordon, who appears in team staff listings alongside the coaching staff.[1]
What is confirmed
l Athletic trainer: Sabryna Gordon is listed as the athletic trainer attached to Patriot teams.[1]
l Athletics operate under NCISAA 3A and Foothills Athletic Conference health/safety frameworks common to
member schools.
Flagged gaps (honest disclosure)
l No sports-medicine webpage describing concussion protocol, training-room facilities, or physician
coverage was found.
l No confirmed health-system partnership (e.g., hospital or orthopedic-group affiliation) of the kind some
peer programs advertise.
l No strength-and-conditioning program details — no named S&C coach, weight-room, or
performance-training description was located.
Absence of documentation is not evidence that services don't exist — a school producing USA Swimming
All-Americans and high-major recruits almost certainly provides athletic-training support. This document reports only
what is publicly verifiable.
Sources
[1] Davidson Day School — team staff listing (athletic trainer Sabryna Gordon).
[2] Davidson Day School — Patriot Teams (NCISAA 3A / Foothills Athletic Conference membership).
Davidson Day School — Athletics Research Series · compiled from public sources Page 1


---

## Sports Offered

*Source file: `Davidson_Day__Sports__Sports_Offered.pdf`*

DAVIDSON DAY SCHOOL SPORTS OFFERED
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Sports Offered
Every interscholastic sport fielded by the Patriots, with competing gender and season.
At a Glance
Association North Carolina Independent Schools Athletic Association (NCISAA), 3A[1]
Conference Foothills Athletic Conference (FAC)[1]
Program size 35 teams across 13 distinct sports (varsity, JV and middle school)[1]
Participation Roughly 90% of students in grades 5–12 play a Patriot sport[1]
Mascot / colors Patriots · maroon and gray
Davidson Day fields 13 distinct sports; counting separate varsity, junior-varsity and middle-school squads
brings the school's stated total to 35 teams.[1] The table below lists every varsity program by season. Indoor
and outdoor track are shown separately as they are scheduled in different seasons, but the school counts them
as one sport (track & field) toward the 13-sport total.
# Sport Gender Season
1 Baseball Boys Spring
2 Basketball Boys Winter
3 Basketball Girls Winter
4 Cheerleading Coed Winter
5 Cross Country Boys Fall
6 Cross Country Girls Fall
7 Football Boys Fall
8 Golf Boys Spring
9 Golf Girls Fall
10 Lacrosse Girls Spring
11 Rowing Coed Spring
12 Soccer Boys Fall
13 Soccer Girls Spring
14 Swimming Coed Winter
15 Tennis Boys Spring
16 Tennis Girls Fall
17 Track & Field (Indoor) Coed Winter
18 Track & Field (Outdoor) Coed Spring
19 Volleyball Girls Fall
Davidson Day School — Athletics Research Series · compiled from public sources Page 1
DAVIDSON DAY SCHOOL SPORTS OFFERED
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Reconciliation
The 19 varsity team-lines above map to 13 distinct sports: baseball, basketball, cheerleading, cross country,
football, golf, lacrosse, rowing, soccer, swimming, tennis, track & field, and volleyball — matching the school's
“13 sports” figure.[1] Junior-varsity and middle-school teams (e.g., JV boys/girls basketball, JV volleyball,
multiple middle-school squads) account for the remainder of the 35-team total.
Note: “Coed” reflects how the school lists swimming, cheerleading, rowing and track & field on its Patriot Teams
page; some of these compete for separate boys' and girls' state placements within NCISAA.
Sources
[1] Davidson Day School — Patriot Teams (davidsonday.org/athletics/patriot-teams).
[2] Davidson Day School — Athletics at Davidson Day (davidsonday.org/athletics).
Davidson Day School — Athletics Research Series · compiled from public sources Page 2


---

## Top 100 Recruiting Rankings

*Source file: `Davidson_Day__Sports__Top_100_Recruiting_Rankings.pdf`*

DAVIDSON DAY SCHOOL TOP-100 RECRUITING RANKINGS
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Top-100 Recruiting Rankings
Davidson Day prospects who have carried national recruiting rankings, by service.
At a Glance
Headline 2026 Cody Peck — No. 82 (247Sports), No. 99 (ESPN 100), No. 96 (On3)[1]
Headline 2025 Isaiah Denis — No. 47 (247Sports), No. 61 composite[2]
Historical Maya Caldwell — No. 76 (ESPN HoopGurlz), four-star[3]
Pattern Top-100 presence is basketball-driven, concentrated in 2025–2026.
Davidson Day's national-ranking footprint is overwhelmingly in basketball and is unusually strong in the current
cycle. The table consolidates the most cited rankings by service; numbers differ between 247Sports, ESPN,
On3 and Rivals, so each is attributed.
Player Class Sport Ranking(s) Stars
Cody Peck 2026 Basketball (C) No. 82 (247), No. 99 (ESPN), No. 96 (On3)[1] 4H
Isaiah Denis 2025 Basketball (G) No. 47 (247) / No. 61 composite[2] 4H
Will Stevens 2026 Basketball (C) No. 1 in NC (On3) / No. 3 in NC (247)[4] 4H
Maya Caldwell 2017 Basketball (G) No. 76 (ESPN HoopGurlz)[3] 4H
Notes on each prospect
l Cody Peck (2026) — 6'10" center; transferred back to Davidson Day for his senior year after stops at
Carmel Christian and IMG Academy; held 17 D1 offers before committing to Dayton.[1]
l Isaiah Denis (2025) — 6'5" combo guard; ranked the No. 2 prospect in North Carolina in his class; led the
2024 state-title team; committed to North Carolina.[2]
l Will Stevens (2026) — 6'10" four-star center ranked the top prospect in North Carolina by On3; committed
to Clemson.[4]
l Maya Caldwell (2017) — top-100 ESPN HoopGurlz recruit who signed with Georgia and later reached the
WNBA.[3]
Ranking caveat: “top-100” status depends on the service. Peck and Denis carry clear top-100 marks on at least one
major board; Stevens is a consensus four-star and top-NC prospect whose national number sits near the top-100 line
depending on the service.
Sources
[1] 247Sports / ESPN / On3 / Dayton Daily News — Cody Peck rankings and recruitment.
[2] 247Sports — Isaiah Denis profile and commitment coverage.
[3] Wikipedia — Maya Caldwell (ESPN HoopGurlz No. 76).
[4] On3 / 247Sports / Clemson Athletics — Will Stevens ranking and commitment.
Davidson Day School — Athletics Research Series · compiled from public sources Page 1


---

## WinLoss Records

*Source file: `Davidson_Day__Sports__WinLoss_Records.pdf`*

DAVIDSON DAY SCHOOL WIN-LOSS RECORDS
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Win–Loss Records
Recent season records for the five most prominent Patriot programs, with honest gaps flagged.
At a Glance
Marquee program Boys basketball (research-determined)
Top-5 programs Basketball, soccer, volleyball, football, cross country
Best documented Boys basketball — 24–7 state-title season (2023–24)[1]
Data caveat Full MaxPreps season summaries were retrievable for the marquee and a few recent
champions; older / non-marquee seasons are flagged as unconfirmed.
Records below are limited to seasons that could be confirmed from MaxPreps team pages or championship
reporting. Where a program's full season-by-season summary could not be verified in this pass, that is stated
plainly rather than estimated.
Boys Basketball (marquee)
Season Overall Notes
2025–26 approx. 14–9[2] Reached NCISAA 3A state semifinal; lost to Greensboro Day 45–61
2023–24 24–7[1] NCISAA 2A state champions; undefeated in Foothills Athletic Conference play
In the title season the program improved its win rate dramatically year-over-year under coach James Long,
going from roughly 22% to 77% before he departed for the college ranks.[3]
Boys Soccer
Season Overall Notes
NCISAA 3A state champions; closed the year on a 16-match win streak (No. 7
2024 17–4[4]
seed)
Volleyball (girls)
Season Overall Notes
NCISAA 3A state champions (No. 2 seed); won a five-set final over Asheville
2024 24–4[5]
Christian
Girls Basketball
Three consecutive NCISAA state titles (2019, 2020, 2021).[6] Full season records for those championship years
were not independently confirmed in this pass and are intentionally left blank rather than estimated.
Girls Soccer
Six state titles — 2011, 2012, 2013, and a current three-peat in 2023, 2024, 2025.[6] Individual season win–loss
lines were not retrievable for every year in this pass.
Davidson Day School — Athletics Research Series · compiled from public sources Page 1
DAVIDSON DAY SCHOOL WIN-LOSS RECORDS
PATRIOTS ATHLETICS · NCISAA 3A · Foothills Athletic Conference Inside Davidson Day Athletics · Research Dossier
Football
Four state titles concentrated in 2011–2015.[6] Recent-season football records were not confirmed; the
program's documented peak is its early-2010s championship run.
MaxPreps maintains live team pages for Davidson Day across sports; this document reflects what was verifiable at
compile time. Records marked “approx.” come from cached standings and may differ slightly from the official final.
Sources
[1] Lake Norman Publications — “Davidson Day Patriots win NCISAA basketball state championship” (2024).
[2] MaxPreps — Davidson Day Patriots boys basketball team page (2025–26).
[3] University of Charleston Athletics — James Long coaching bio.
[4] HighSchoolOT — “Davidson Day wins upset-filled NCISAA 3A boys soccer title” (2024).
[5] HighSchoolOT — “Davidson Day outlasts Asheville Christian for NCISAA 3A volleyball title” (2024).
[6] Davidson Day School — History and Achievements (team state championships).
Davidson Day School — Athletics Research Series · compiled from public sources Page 2


---

## Sources referenced across these documents

- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Cross_Country_Championships_2023/
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/index.html
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_14.html
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_15.html
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_27.html
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_28.html
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2020/
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- https://247sports.com/Player/Cam-Reddish-77233/high-school-134667/
- https://247sports.com/player/cody-peck-46150042/
- https://247sports.com/player/isaiah-denis-46142390/
- https://247sports.com/player/will-stevens-46149054/
- https://247sports.com/season/<year>-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-football/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-football/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-womens-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://247sports.com/season/<year>-womens-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%203%20Swim%20scores.pdf
- https://admin.ncisaa.org/uploads/SWIMMING/2024/2024%20NCISAA%20D3%20results.pdf
- https://admin.ncisaa.org/uploads/SWIMMING/2025/division%202%20scores.pdf
- https://admin.ncisaa.org/uploads/SWIMMING/Div%203%20Final_Team_Ind.pdf
- https://admin.ncisaa.org/uploads/ncisaa%20division%20iii%20scores.pdf
- https://appstatesports.com/news/2026/3/23/mens-basketball-cj-huntley-makes-nba-debut-for-phoenix-suns.aspx
- https://archives.ncisaa.org/
- https://archives.ncisaa.org/index.php?sport=12&years=2025-2026
- https://archives.ncisaa.org/index.php?sport=16&years=2025-2026
- https://archives.ncisaa.org/index.php?sport=19&years=2025-2026
- https://archives.ncisaa.org/index.php?sport=22&years=2025-2026
- https://berryvikings.com/sports/mens-track-and-field/roster
- https://can.milesplit.com/signings/54618
- https://carychristianschool.org
- https://coastalchristian.net
- https://concord.academy
- https://dukechronicle.com/article/duke-mens-basketball-player-preview-nick-arnold-20260929
- https://emoryathletics.com/sports/mens-cross-country/roster
- https://en.wikipedia.org/wiki/2026%E2%80%9327_Duke_Blue_Devils_men%27s_basketball_team
- https://en.wikipedia.org/wiki/John_Hunter_Nemechek
- https://flaglerathletics.com/news/2026/4/23/GEN_042326_SSC_announcement.aspx
- https://gastonchristian.org
- https://goduke.com/sports/mens-basketball/roster
- https://gopack.com/documents/download/2026/8/10/MATCH_1___JAMES_MADISON.pdf
- https://hickorychristianacademy.com
- https://image.isu.pub/260601134603-feea5a5f14d1db3b4765484a1f266053/jpg/page_1.jpg
- https://issuu.com/davidsondayschool/docs/25-26_athletics_in_review
- https://iwlca.sportsrecruits.com/athlete/molly_brown8
- https://nc.milesplit.com/articles/323055/the-complete-ncisaa-xc-state-championship-hub
- https://nc.milesplit.com/meets/503458-ncisaa-state-xc-championships-2022/results/861207/raw
- https://nc.milesplit.com/meets/503458-ncisaa-state-xc-championships-2022/results/861208/raw
- https://resources.finalsite.net/images/f_auto,q_auto/v1765293293/davidsondayorg/cogpzni2rnpr2nr5krwo/DroneShot.jpg
- https://resources.finalsite.net/images/f_auto,q_auto/v1766075195/davidsondayorg/ymi5or1g7ygcqrnxq9bq/VballStateChamps.jpg
- https://resources.finalsite.net/images/v1790855129/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf
- https://sports.yahoo.com/articles/did-duke-basketball-just-next-101500311.html
- https://sports.yahoo.com/national-signing-day-where-charlotte-111500448.html
- https://stmacademy.org
- https://trinityacademy.com
- https://ultimategoallacrosse.com/charlotte
- https://waynechristian.org
- https://wccs.org
- https://wingatebulldogs.com/sports/womens-lacrosse/roster/izzy-pierce/14800
- https://www.aol.com/d-j-vu-gaston-day-152259795.html
- https://www.ashevillechristian.org
- https://www.bcaroyals.com
- https://www.caldwellacademy.org
- https://www.calvaryday.school
- https://www.carolinaascent.com/news/2025/05/06/carolina-ascent-fc-w-league-team-announces-2025-roster/
- https://www.cfsnc.org
- https://www.davidsonday.org/about/our-campus
- https://www.davidsonday.org/athletics
- https://www.davidsonday.org/athletics/history-and-achievements
- https://www.davidsonday.org/athletics/patriot-athletic-hall-of-fame
- https://www.davidsonday.org/athletics/patriot-teams
- https://www.davidsonday.org/p/~board/all-school-news/post/davidson-day-announces-new-varsity-boys-basketball-head-coach
- https://www.davidsonday.org/p/~board/all-school-news/post/seven-davidson-day-student-athletes-sign-national-letters-of-intent
- https://www.epiphanyglobalschool.org
- https://www.fayacademy.org
- https://www.fayettevillechristian.com
- https://www.fcapatriots.org
- https://www.fcspatriots.com
- https://www.friendshipchristian.net
- https://www.gracechristian.net
- https://www.gracechristiansanford.com
- https://www.greenfieldschool.org
- https://www.harrellsca.com
- https://www.highschoolot.com/story/c-j-huntley-davidson-day-and-appalachian-state-grad-signs-two-way-contract-with-the-phoenix-suns/22067021/
- https://www.highschoolot.com/story/ncisaa-spring-championship-rundown/22363802/
- https://www.highschoolot.com/story/the-2023-24-ncisaa-team-state-champions-in-every-sport/21461689/
- https://www.highschoolot.com/story/the-2024-25-ncisaa-team-state-champions-in-every-sport/22016545/
- https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/
- https://www.highschoolot.com/story/the-2026-highschoolot-all-state-girls-lacrosse-team/22375831/
- https://www.hpcacougars.org
- https://www.jp2chs.com
- https://www.maxpreps.com/nc/davidson/davidson-day-patriots/basketball/history/
- https://www.maxpreps.com/nc/davidson/davidson-day-patriots/soccer/girls/spring/roster/
- https://www.maxpreps.com/news/DENPuVfqpEmRw2iffpG6ew/basketball-recap-oak-hill-academys-undefeated-season-over-after-six-games.htm
- https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- https://www.ncisaa.org/recognition/wells-fargo-cup/history/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- https://www.neusechristian.com
- https://www.nfhsnetwork.com/schools/davidson-day-school-davidson-nc/basketball
- https://www.ntaeagles.com
- https://www.on3.com/news/north-carolina-basketball-isaiah-denis-commits-to-tar-heels-hubert-davis/
- https://www.on3.com/rivals/news/4-star-pf-will-stevens-commits-to-clemson/
- https://www.onealschool.org
- https://www.parrottacademy.org
- https://www.rmacademy.com
- https://www.salemdefenders.org
- https://www.si.com/college/2018/03/10/cam-reddish-westtown-high-school-duke-basketball-recruit
- https://www.si.com/high-school/boys-basketball/final-2025-26-top-25-boys-high-school-basketball-national-rankings-01knfp30h69z
- https://www.statesvillechristian.org
- https://www.stdavidsraleigh.org
- https://www.thalesacademy.org/contact/apex-4-12
- https://www.thalesacademy.org/contact/rolesville-jh-hs
- https://www.theburlingtonschool.org
- https://www.topdrawersoccer.com/club-soccer-articles/recruiting-roundup:-september-9-15_aid53778
- https://www.topdrawersoccer.com/college-soccer/college-soccer-details/women/nc-state/clgid-28
- https://www.trinitycommunityservices.org
- https://www.trinityschoolnc.org
- https://www.uchigh.com
- https://www.vcanc.com
- https://www.waynecountryday.com
- https://www.westchestercds.org
- https://x.com/Nick_Arnold15/status/2055004311675936904
