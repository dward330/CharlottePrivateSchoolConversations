# Carmel Christian School — Sports
> Distilled from 4 source document(s) in `source-material/sports/carmel-christian/`. Auto-extracted full text, lightly cleaned. Rebuilt 2026-11-08.
**Documents:** 247Sports Recruiting Rankings, College Commitments Class of 2027, Redesign Research 2026, Wells Fargo Cup Standings 2020-2026


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
- https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=980022&id=0
- https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=999101&id=0
- https://carmelchristian.org/athletics101
- https://goccusports.com/news/2025/11/17/mens-basketball-signs-two-prep-standouts.aspx
- https://www.carmelchristianathletics.org/cougar-athletics-celebrate-national-signing-day/
- https://www.carmelchristianathletics.org/inside-athletics/
- https://www.carmelchristianathletics.org/inside-athletics/next-steps/
- https://www.carmelchristianathletics.org/spring-teams/tennis-boys/
- https://www.highschoolot.com/story/carmel-christian-beats-rabun-gap-to-win-4a-soccer-title/19375567/
- https://www.highschoolot.com/story/christ-school-edges-carmel-christian-for-ncisaa-4a-boys-basketball-title/20736737/
- https://www.highschoolot.com/story/providence-day-shuts-out-carmel-christian-for-third-straight-ncisaa-4a-girls-soccer-championship/22359052/
- https://www.maxpreps.com/nc/matthews/carmel-christian-cougars/basketball/history/
- https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- https://www.ncisaa.org/recognition/wells-fargo-cup/history/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- https://www.ncisaa.org/sports/
- https://www.wccbcharlotte.com/2025/08/12/local-high-school-star-athlete-signs-nil-deal-with-national-brand/
