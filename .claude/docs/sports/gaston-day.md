# Gaston Day School — Sports
> Distilled from 5 source document(s) in `source-material/sports/gaston-day/`. Auto-extracted full text, lightly cleaned. Rebuilt 2026-11-09.
**Documents:** College Commitments Class of 2027, College Commitments 2024-2026, Program and Championship Ledger 2026, Varsity Roster Cross-Reference 2026, Wells Fargo Cup Standings 2020-2026


---

## College Commitments Class of 2027

*Source file: `Gaston Day - Sports - College Commitments Class of 2027.md`*

# Gaston Day — Sports — College Commitments, Class of 2027 (current seniors)

> **Provenance:** Written by Claude Code on 2026-11-08 during `/implement seniorsrow`. The
> **per-class retention file** the `/athlete-commits` skill keeps for the current senior
> class — every public commitment, verbal or signed, any level, with sources. It is the value
> of the `seniors-committed` Compare row and is promoted into the 2024–26 window file when the
> window rolls after graduation (from 1 June 2027). **Never delete it.**
>
> **Status: 1 confirmed.** Gaston Day has no College Pipeline card, so this row is the only
> place the commitment shows; the card itself would be a separate UX decision.
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

## Confirmed — 1
| Athlete | Sport | College | Conf. | Level | Confirmed by |
|---|---|---|---|---|---|
| Bree Smith | Swimming | Stanford | ACC | **P4** | Charlotte Observer swimming preview 2026-11-03: listed as "Sr., 50/100 free … Stanford commit", and athletic director Lulu Brase is quoted directly: "senior committed to Stanford University" — the school's own statement, on the record. https://sports.yahoo.com/articles/best-high-school-swimmers-charlotte-100000360.html |

No SwimSwam or Swimming World article was found; re-check after the early signing period for
a Stanford release.

## Totals for the `seniors-committed` row (as of 2026-11-08)
**1 confirmed** (value `'1'`).

## Re-check (2026-11-09, `/athlete-commits gaston-day`)
The Class of 2027 seniors on the posted 2026-27 MaxPreps rosters (boys basketball 2, boys
soccer 2, girls tennis 2, volleyball 1) were run against all 18 HighSchoolOT trackers and
RealGM. **No new commitment.** The value stays `'1'`. This was still before the early
signing period (opens 2026-11-11), so it is provisional: re-run after the November wave.


---

## College Commitments 2024-2026

*Source file: `Gaston Day School - Sports - College Commitments 2024-2026.md`*

# Gaston Day School — Sports — College Commitments (2024–2026)

> **Provenance:** Compiled by Claude Code on 2026-11-09 during `/athlete-commits gaston-day`.
> Every Gaston Day varsity roster on MaxPreps for 2023-24 through 2026-27 was read against
> the 18 HighSchoolOT per-sport recruiting trackers, RealGM's Gaston Day School page (read
> in Chrome), FieldLevel's Gaston Day baseball alumni page (Chrome) and each college's own
> roster. The method, the nulls and the unchecked sports are in `Gaston Day School - Sports -
> Varsity Roster Cross-Reference 2026.md`. This is the designated provenance file for the
> *Power 4 commits* and *Division I commits* Compare rows (`src/data/metricValues.ts`) and
> for a College Pipeline card in `src/data/sportsPrograms/gaston-day.ts`, **which does not
> exist yet**. Adding it is a new card under the UX-design gate.
>
> **Level classification is by hand:** Power 4 = SEC / Big Ten / ACC / Big 12 only. Counts
> are distinct athletes, and they are a documented minimum. Gaston Day publishes no
> all-sport signing list. Neither gastonday.org nor the athletics site
> (gastondayathletics.com, 7 news articles as of 2026-11-09) carries a signing-day post.
>
> **Standard applied (same as Cannon, Davidson Day, Covenant Day, Carmel Christian and
> Hickory Grove):** the card counts documented commitments to college athletics at any
> level. D2, D3, NAIA, junior college and other non-NCAA levels count. "Scholarship" is
> never claimed.
>
> **Graduate test:** an athlete counts for Gaston Day only if they finished high school
> there. Evidence is the athlete's senior season on the Gaston Day MaxPreps roster and the
> college roster's "High School" line. Every row below passes both.

## Sources
- MaxPreps Gaston Day rosters, 2023-24 → 2026-27 (21 sport pages × 4 seasons):
 https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/
 - Volleyball 2023-24 (Sr.: Brown): https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/volleyball/23-24/roster/
 - Volleyball 2024-25 (Sr.: Allen, Bing, Fabbri): https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/volleyball/24-25/roster/
 - Boys basketball 2025-26 (Sr.: Fields, Kimrey, Simpson, Todd): https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/basketball/25-26/roster/
- HighSchoolOT NC volleyball recruiting tracker (Megan Brown → Wofford, Class of 2024,
 Division I; Anne Bradley Bing → South Carolina, Class of 2025, Division I):
 https://www.highschoolot.com/story/north-carolina-high-school-volleyball-recruiting-tracker/21031942/
- Wofford volleyball, "Volleyball inks five signees" (2023-12-14; "Megan Brown DS Charlotte,
 N.C. / Gaston Day School"): https://woffordterriers.com/news/2023/12/14/volleyball-inks-five-signees.aspx
- Wofford volleyball, Megan Brown bio (Defensive Specialist, Junior, High School Gaston Day
 School, Hometown Charlotte, N.C.): https://woffordterriers.com/sports/womens-volleyball/roster/megan-brown/8731
- Wofford volleyball roster (6 Megan Brown, Jr., Charlotte, N.C., Gaston Day School):
 https://woffordterriers.com/sports/womens-volleyball/roster
- South Carolina volleyball, Anne Bradley Bing bio (#8, L, 5-8, Sophomore, Hometown
 Gastonia, N.C., High school Gaston Day School; "2025 (FRESHMAN)" season notes):
 https://gamecocksonline.com/sports/wvball/roster/player/anne-bradley-bing/
- The Daily Gamecock, 2025 South Carolina volleyball season preview (Bing in the freshman
 class): https://www.dailygamecock.com/article/2025/08/season-preview-south-carolina-volleyball-looks-for-growth-and-success-under-new-staff-sports-navare
- RealGM, Gaston Day School (NC) players, read in Chrome 2026-11-09 (Braylen Todd, HS Grad
 2026, College Johnson & Wales (NC)):
 https://basketball.realgm.com/highschool/teams/1873/Gaston-Day-School-NC
- Johnson & Wales University–Charlotte, 2026-27 men's basketball roster (21 Braylen Todd,
 Fr., Mount Holly, NC, Gaston Day): https://charlotte.jwuathletics.com/sports/mens-basketball/roster

## Class of 2026 — 1

| Athlete | Sport | College | Conf | Level | Confirmed by |
|---|---|---|---|---|---|
| Braylen Todd | Boys Basketball | Johnson & Wales (NC) | USCAA | non-NCAA (see note) | Johnson & Wales 2026-27 roster; RealGM |

**Level note for the plan:** Johnson & Wales University–Charlotte competes in the **USCAA**
(United States Collegiate Athletic Association), which is neither NCAA nor NAIA, and the
card's `CommitLevel` (`'P4' | 'D1' | 'D2' | 'D3' | 'NAIA'`) has no USCAA tier. The nearest
precedent is junior college, listed at `'D3'` with `conf: 'NJCAA'` and explained in
`rosterNote` (Covenant Day, Hickory Grove). On that precedent Todd goes at `'D3'` with
`conf: 'USCAA'`, which is a new conference string and therefore one new identifier unit per
locale. He is not a Division I count either way.

## Class of 2025 — 1

| Athlete | Sport | College | Conf | Level | Confirmed by |
|---|---|---|---|---|---|
| Anne Bradley Bing | Volleyball | South Carolina | SEC | **P4** | South Carolina bio (High school Gaston Day School); HighSchoolOT volleyball tracker |

## Class of 2024 — 1

| Athlete | Sport | College | Conf | Level | Confirmed by |
|---|---|---|---|---|---|
| Megan Brown | Volleyball | Wofford | Southern | D1 | Wofford signing release (2023-12-14) and roster; HighSchoolOT volleyball tracker |

Conference string: `'Southern'` (12 existing uses), not `'SoCon'` (3).

## Totals → app metric values

| Measure | Value | Athletes |
|---|---|---|
| Committed to college athletics, 2024–26 | **3** | Brown ’24, Bing ’25, Todd ’26 |
| NCAA Division I (includes P4) | **2** | Brown (Wofford), Bing (South Carolina) |
| Power 4 | **1** | Bing (South Carolina, SEC) |

- `p4-commits-2426` → `'1'` (was `null`)
- `d1-commits-2426` → `'2'` (was `null`)
- By sport: Volleyball 2, Boys Basketball 1.

## Class of 2027 (current seniors) — verbals, not counted
Kept in `Gaston Day - Sports - College Commitments Class of 2027.md`: Bree Smith (Swimming,
Stanford, ACC, P4), confirmed by the athletic director on the record to the Charlotte
Observer. Listed on the roster as a verbal and kept out of the funnel, the sport bars and
the two window rows. She is the whole of the `seniors-committed` value (`'1'`, unchanged).

## Excluded
- **Makoi Mabor Marier** (RealGM: HS Grad 2024, Gaston Day, college Mercer). **Fails the
 graduate test.** Recruiting coverage (Phenom Hoop Report, Prep Hoops) places him at
 **Gaston Christian**, and he is on no Gaston Day MaxPreps roster in any season. RealGM's
 school label is wrong.
- **Rilpuou Makoi** (RealGM: HS Grad 2025, Gaston Day, college Newberry). **Fails the
 graduate test.** He is on no Gaston Day MaxPreps roster in any season (the 2024-25 boys
 roster's one senior is a different player), and no second source ties him to Gaston Day.
- **Alexis Ibsen** (HighSchoolOT girls tennis tracker, Class of 2024, Division III, Emerson;
 the tracker spells it "Isben"). She passes the graduate test, since she is a senior on the
 2023-24 girls tennis roster. **Unverified:** she is absent from Emerson's women's tennis
 rosters for 2024-25 and 2025-26, and no second source was found. A reader-submitted
 tracker alone is a lead, not a row (the Cannon girls-lacrosse precedent).


---

## Program and Championship Ledger 2026

*Source file: `Gaston Day School - Sports - Program and Championship Ledger 2026.md`*

# Gaston Day School — Sports (Program and Championship Ledger 2026)

**Provenance**

- **Compiled by:** Claude Code deep research pass (`/implement add-gaston-day`).
- **Date compiled:** 2026-08-18
- **Method:** Sport list taken from **MaxPreps**, which is the working substitute here —
 `gastondayathletics.com` is **JS-rendered**, so rosters, levels, championship banners and
 signing news are invisible to a plain fetch (the same class as the documented Finalsite
 popup-tile trap). Championship ledger built from **HighSchoolOT**'s per-season "NCISAA
 team state champions in every sport" round-ups plus its Gaston Day coverage page, then
 cross-checked against MaxPreps. Athletic Director and division-level participation
 confirmed from the school's own profile and division pages.
- **School:** Gaston Day School — **Spartans**. NCISAA **2A**.
- **Athletic Director:** **Lulu Brase** (named in the 2025-26 Academic Profile).

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/ | Full sport list by gender and season; AD listed as Lulu Brase; co-ed private |
| S2 | https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/volleyball/ | Volleyball levels (**varsity, JV, freshman**), NCISAA 2A classification, 2025 title match detail |
| S3 | https://www.highschoolot.com/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/ | **2025-26** NCISAA champions — Gaston Day 2A **girls tennis** (three-peat, def. Epiphany School) and **volleyball** (def. St. Thomas More) |
| S4 | https://www.highschoolot.com/the-2024-25-ncisaa-team-state-champions-in-every-sport/22016545/ | **2024-25** NCISAA champions — Gaston Day 2A **volleyball** (def. Westminster Catawba), **boys soccer** (def. Westchester Country Day), **girls tennis** (def. Epiphany School) |
| S5 | https://www.highschoolot.com/story/gaston-day-rolls-to-ncisaa-2a-girls-tennis-title-over-trinity-school-of-durham-chapel-hill/21119771/ | **2023** girls tennis title over Trinity School of Durham & Chapel Hill, 5-1 |
| S6 | https://www.highschoolot.com/story/gaston-day-repeats-ncisaa-2a-girls-tennis-title-downs-epiphany-school/21693252/ | **2024** girls tennis repeat over Epiphany School — "third state championship in four years and fourth overall" |
| S7 | https://www.highschoolot.com/gaston-day-school/17527719/ | Gaston Day Spartans coverage hub |
| S8 | https://www.privateschoolreview.com/gaston-day-school-profile | Third-party sport list incl. **cheering** and **track and field** (not on the MaxPreps list) |
| S9 | https://www.gastonday.org/middle-school/ | Middle School athletics (grades 6-8) — soccer, basketball, track and field, swimming; eligibility tied to academic standing and behaviour |
| S10 | https://gastondayathletics.com/ | Athletics site — **JS-rendered, no data extractable**; references an "Athletic Department Handbook 2026-2027" and tryout information |

## Sport list (S1)

**19 team sports**, by season:

| Season | Boys | Girls |
| --- | --- | --- |
| Fall | Cross Country, Soccer, Volleyball | Cross Country, Field Hockey, Soccer, Volleyball |
| Winter | Basketball, Swimming, Wrestling | Basketball, Swimming |
| Spring | Baseball, Golf, Lacrosse, Tennis | Golf, Softball, Tennis |

**Additionally listed by S8 (Private School Review) but not on the MaxPreps season grid:**
**cheering** and **track and field**. Track and field is corroborated for the Middle School
by the school's own page (S9). Both are carried as offered sports with the third-party
caveat.

**Levels (S2).** Volleyball fields **varsity, JV and freshman** teams. Per-sport level
breakdowns beyond volleyball are **not published** in an extractable form — the athletics
site that would carry them is JS-rendered (S10), and MaxPreps exposes levels only per sport
page. **Not researched to exhaustion; recorded as a known gap** rather than asserted absent.

**Middle School athletics (S9).** Grades 6-8 field soccer, basketball, track and field and
swimming among others. Participation requires academic standing and positive behaviour.

**Participation.** ~**70%** of students in grades 6–12 play at least one sport.

## NCISAA 2A state championship ledger

**Superseded 2026-11-02.** This ledger undercounts. The verified record is 14 titles in six sports. See "Gaston Day School - Sports - Wells Fargo Cup Standings 2020-2026.md".

| Year | Sport | Result |
| --- | --- | --- |
| 2025 | **Volleyball** | def. **St. Thomas More Academy**, **3-2**, Oct 25 2025 (S3, S2) |
| 2025 | **Girls Tennis** | def. **Epiphany School** — **three-peat**, third straight (S3) |
| 2024 | **Volleyball** | def. **Westminster Catawba**, swept, Oct 26 2024 (S4) |
| 2024 | **Boys Soccer** | def. **Westchester Country Day**, shutout (S4) |
| 2024 | **Girls Tennis** | def. **Epiphany School** — second straight; "third state championship in four years and fourth overall" (S4, S6) |
| 2023 | **Girls Tennis** | def. **Trinity School of Durham & Chapel Hill**, **5-1** (S5) |
| 2021 | **Volleyball** | Title — program's first of three (S3 context, MaxPreps) |
| 2021 | **Girls Tennis** | Title — first of four (S6 context) |

**Ledger totals:** girls tennis **4** titles (2021, 2023, 2024, 2025); volleyball **3**
(2021, 2024, 2025); boys soccer **1** (2024). **8 team state championships** across the
window covered by these sources.

**2024-25 was a three-title year** — volleyball, boys soccer and girls tennis all won 2A
championships in the same school year (S4), which is what the AOL/Gaston Gazette
"Déjà vu: Gaston Day boys soccer, volleyball, girls tennis claim NCISAA state titles"
coverage refers to.

**Volleyball context (S3, S2):** beyond the three titles, the programme has made **3 further
finals appearances** and won **5 league titles** over the decade. Head coach at the 2025
title: **Derek Bing** (who also runs the Nike Girls Volleyball camp on campus — see the
summer file).

## Athletic commits — confirmed absence

**Gaston Day publishes no enumerated signing/commit list.** This was settled by a focused
deep pass at assessment time: local press, the athletics site's news feed, and NCSA /
recruiting databases were all checked. NCSA's Gaston Day pages are generic
recruit-marketing pages carrying no commit lists.

This is a **confirmed `null`, not a not-found** — the Power Four and D1 commit counts are
written as deliberate `null`s with a reason comment in the app's Compare data. Per the
plan, **no further research pass should be spent rediscovering this absence.**

## Season records — deliberately not transcribed

MaxPreps showed a **2026-27 in-progress** record for volleyball (26-27 overall, 1-0
conference, 2nd in conference) at the time of this pass. That is a live mid-season figure,
not a completed-season result, and it is **not** carried into the app: a season ledger row
must be a final record. Completed prior-season won-lost records were not available in an
extractable form from the JS-rendered athletics site.


---

## Varsity Roster Cross-Reference 2026

*Source file: `Gaston Day School - Sports - Varsity Roster Cross-Reference 2026.md`*

# Gaston Day School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Research record written by Claude Code on 2026-11-09 during
> `/athlete-commits gaston-day`. It documents *how* Gaston Day's college commitments were
> found and *what was searched and found empty*, so a later pass does not redo the work. The
> athlete-level results are in `Gaston Day School - Sports - College Commitments
> 2024-2026.md`; this file holds the method and the nulls. It is provenance for the College
> Pipeline data, not a card of its own (`src/lib/metrics.ts` folds it onto the research
> dossier via `/roster cross-reference/i`).
>
> **Names policy:** only athletes with a documented college commitment, and the leads that
> were ruled out, are named. Current students and graduates without a commitment are
> recorded as counts.

## Result in one line

From nothing on record to **3** committed, **2** Division I, **1** Power 4 for the Classes of
2024–2026: two volleyball players (Megan Brown ’24, Wofford; Anne Bradley Bing ’25, South
Carolina) and one boys basketball player (Braylen Todd ’26, Johnson & Wales–Charlotte,
USCAA). Gaston Day had no College Pipeline card before this pass, and the two Compare window
rows were `null`.

## Scope

Every varsity sport Gaston Day lists (`src/data/sportsPrograms/gaston-day.ts`): volleyball,
boys soccer, field hockey, boys and girls cross country, girls tennis, cheering, boys and
girls basketball, boys and girls swimming, wrestling, baseball, softball, boys lacrosse,
boys and girls golf, boys tennis and track & field. Gaston Day fields **no football**.

Depth by tier:
- **Full per-name cross-reference** (rosters + commitment database + college roster):
 volleyball, boys basketball, girls tennis.
- **Rosters + HighSchoolOT tracker + grouped name searches:** baseball, girls basketball,
 boys and girls soccer, boys tennis.
- **Tracker + grouped searches only (no roster published):** swimming, golf, cross country,
 track & field, lacrosse, wrestling, field hockey, softball. Cheering has no commitment
 database and was not searched beyond the grouped searches.

## Step 1 — the school's own pages (read 2026-11-09)

- `gastonday.org` (WordPress): the site search for "signing", "commit" and "college" returns
 navigation pages only, and the WP REST posts endpoint holds three template posts. There is
 no signing-day post.
- `gastondayathletics.com/News`: seven articles (volleyball, conference move, postseason,
 volleyball three-peat, MAC all-conference, media policy, NCISAA all-state). None names a
 college commitment.
- `gastondayschool.org` returns 403. It is not the school's domain.

The school publishes no all-sport commitment list.

## Step 2 — MaxPreps rosters by season

`https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/<sport>/<yy-yy>/roster/`, path
form, browser UA. 21 sport slugs × 4 seasons (23-24 → 26-27), plus boys basketball 22-23.

- **404 in every season:** field hockey, softball, boys volleyball, football (not fielded),
 track & field.
- **Empty table in every season:** baseball 26-27 (spring not yet posted), boys and girls
 cross country, boys and girls golf, boys lacrosse, boys and girls swimming, wrestling.
 These are recorded as **unchecked by roster**, not as nulls.
- **With data:** baseball, boys basketball, girls basketball (24-25, 25-26), boys soccer,
 girls soccer, boys tennis, girls tennis, volleyball.

Seniors (`Sr.`) by graduating class (several are two-sport athletes):
- **Class of 2024 (2023-24):** boys soccer 7, baseball 5, girls soccer 4, girls tennis 3,
 boys basketball 2, volleyball 1. (The girls basketball 2023-24 roster is empty.)
- **Class of 2025 (2024-25):** girls soccer 8, boys soccer 5, volleyball 3, baseball 2,
 girls tennis 2, boys basketball 1.
- **Class of 2026 (2025-26):** boys soccer 6, boys basketball 4, girls basketball 4, girls
 soccer 4, girls tennis 4, volleyball 4, baseball 2, boys tennis 1.
- **Class of 2027 (2026-27, fall and winter posted):** boys basketball 2, boys soccer 2,
 girls tennis 2, volleyball 1.

## Step 3 — cross-reference

**HighSchoolOT trackers.** All 18 per-sport trackers, the three "Building the Fence"
in-state football pages and the three out-of-state roundups, fetched 2026-11-09 (hub:
https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/).
Gaston Day hits:
- Volleyball: Megan Brown (Class of 2024, Division I, Wofford); Anne Bradley Bing (Class of
 2025, Division I, South Carolina).
- Girls tennis: Alexis Ibsen, spelled "Isben" (Class of 2024, Division III, Emerson).

There are no Gaston Day hits in the baseball, basketball, soccer, softball, swimming, boys
tennis, golf, track/cross country, lacrosse or wrestling trackers.

**RealGM (Chrome; text extraction is blocked, so the table was read by screenshot, sorted by
HS Grad).** Window rows: Braylen Todd (2026, Johnson & Wales (NC)), Rilpuou Makoi (2025,
Newberry), Makoi Mabor Marier (2024, Mercer). Earlier rows (2023 and before: Fayed →
Roanoke, Montanari → Embry-Riddle, Richard → USC Aiken, Britt → Augusta) are outside the
window.

**FieldLevel baseball alumni (Chrome).** The latest commitments it lists are Class of 2023
(UNC Charlotte) and Class of 2021 (Belmont), both outside the window. There are no Class of
2024–2026 entries.

**LaxNumbers.** There is no Gaston Day team page. The only Gastonia listing is the Gaston
County Lacrosse Club, which is a separate club, so lacrosse is a null and has no source.

**Grouped name searches** (baseball, boys soccer, girls soccer and tennis seniors by name;
swimming, golf and running signings; Gaston Gazette signing roundups; PrepVolleyball;
TopDrawerSoccer; SwimSwam / Swimming World). None returned a Gaston Day commitment in the
window. NCSA has self-reported recruiting profiles (for example, a Class of 2025 boys soccer
goalkeeper) that show no commitment.

## Confirmations
- Brown: Wofford signing release (2023-12-14), her bio and the current roster print "Gaston
 Day School".
- Bing: South Carolina bio prints "High school Gaston Day School"; she was a 2025 freshman.
- Todd: Johnson & Wales–Charlotte 2026-27 roster prints "Fr., Mount Holly, NC, Gaston Day".

## Ruled out
- **Makoi Mabor Marier.** He fails the graduate test: he was at Gaston Christian, and
 RealGM's school label is wrong.
- **Rilpuou Makoi.** He fails the graduate test: he is on no Gaston Day roster, and no
 second source exists.
- **Alexis Ibsen.** She passes the graduate test but is unverified: she is not on Emerson's
 2024-25 or 2025-26 roster, and only a single reader-submitted source names her.

## Nulls and unchecked, kept apart
- **Nulls (searched, nothing in the 2024–26 window):** baseball (9 seniors), boys soccer
 (18), girls soccer (16), girls basketball (4), boys tennis (1), girls tennis besides Ibsen
 (8), boys basketball besides Todd (6), volleyball besides Brown and Bing (6). Lacrosse:
 there is no team commitment page on any tracker.
- **Unchecked by roster** (no roster published on MaxPreps, so only the trackers and
 searches cover them): swimming, golf, cross country, track & field, wrestling, field
 hockey, softball, cheering. The Class of 2027 swimmer (Bree Smith → Stanford) shows that
 swimming produces commitments here, so a future pass should look for a swimming roster
 (NCISAA meet results, SwimCloud via search) for the 2024–26 graduates.

## Window check (2026-11-09)
The current senior class is 2027 and the most recently graduated class is 2026. The window
`…-2426` ends at 2026, so **no roll is due**.


---

## Wells Fargo Cup Standings 2020-2026

*Source file: `Gaston Day School - Sports - Wells Fargo Cup Standings 2020-2026.md`*

# Gaston Day School - Sports - Wells Fargo Cup Standings 2020-2026

## Method

Retrieved 2026-11-02 by the `/wells-fargo-cup` skill, for the planned Gaston Day Wells Fargo Cup card (plan `gastondaycup`). Standings were fetched with curl from the NCISAA's own Wells Fargo Cup pages and parsed into 538 table rows across all six seasons and all four classes. The tables run 1A, 2A, 3A, 4A in that order every season.

**The shared ledger needed no correction, and it needs one more row.** All 406 NCISAA rows in `CUP_RECORDS` match the published tables on class, place, tie, splits and total, including Gaston Day's six, and all 36 NCISAA `CUP_DIVISION_LEADERS` rows match. `CUP_FIELD_SIZES` still matches (2A 25, 3A 26, 4A 17), and no newer season is posted: `current-champions/` still carries 2025-2026. Gaston Day played 2A in all six seasons, so its table is every school that shared 2A with it. The ledger already holds 37 of those schools, from Davidson Day's work. The one missing row is **Berean Baptist Academy, 2024–25 2A, 21st, 37.5 points (fall 37.5, winter blank, spring blank)**. It was not needed before because Davidson Day had moved to 3A by then. That makes Gaston Day's table 38 rows.

**Rows published with a blank place stay out of the ledger**, as on Davidson Day's table, so each shows an em dash:

| Season | 2A rows with a blank place, all on 0 points |
|---|---|
| 2021–22 | Salem Baptist Christian School, Thales Academy - Apex |
| 2023–24 | Friendship Christian School, Neuse Christian Academy, Salem Baptist Christian School, Statesville Christian School, Westminster Catawba Christian School |
| 2024–25 | Liberty Christian Academy, Salem Baptist |
| 2025–26 | Salem Baptist, Liberty Christian Academy, Berean Baptist Academy |

Liberty Christian Academy has no placed row in any season and stays off the table. In 2024–25 3A, Thales Academy - Rolesville has a blank place, so its cell is an em dash.

**Published oddities in Gaston Day's division** are the ones Davidson Day's file already records, copied as published. The 2021–22 2A row for Westminster Catawba does not sum, so it keeps its total and drops its splits.

**Berean Baptist's homepage.** https://bbafnc.org/ was loaded in real Chrome on 2026-11-02. The title reads "Berean Baptist Academy" and the page gives 518 Glensford Drive, Fayetteville, NC 28314.

**Title and runner-up years rest on the association's own results wherever it published them.** The NCISAA archive was read for 19 sports and all six seasons (114 pages). A bracket prints a team's record at each round, so the winner's record rises by one win after the final. Every Gaston Day final below printed a winner that way. Swimming came from the team-score PDFs on `admin.ncisaa.org`, cross country from the timing pages the archive links (`results.tfmeetpro.com`), and track from the division reports for 2021 and 2025.

**Golf and two track seasons rest on press, tested against the term totals.** `ncisaa.shotstat.com` did not resolve, and a Wayback Machine listing found no scoreboard page before that service went offline. The archive links no track results for 2022, 2023, 2024 or 2026. Those finishes come from the dated reports listed below, and each one fits the published spring total exactly.

**The term-total proof.** A scored finish must fit the published fall, winter and spring totals. Points: 1st 50, 2nd 45, 3rd 40, 4th 35, a semifinal loser 37.5, 5th 30, 6th 25, a quarterfinal loser 22.5, 7th 20, 8th 15. All twelve fall and winter totals are accounted for exactly, and so are four of the six spring totals.

| Season | Term | Published | Accounted for |
|---|---|---|---|
| 2020–21 | Fall | 120 | Volleyball 2nd 45, boys soccer semifinal 37.5, girls tennis semifinal 37.5 |
| 2020–21 | Winter | 75 | Girls swimming 5th 30, boys basketball QF 22.5, girls basketball QF 22.5 |
| 2020–21 | Spring | 107.5 | Boys tennis 2nd 45, boys golf 3rd 40, baseball QF 22.5 |
| 2021–22 | Fall | 175 | Boys soccer 50, volleyball 50, girls tennis 50, girls XC 6th 25 |
| 2021–22 | Winter | 87.5 | Girls swimming 50, boys basketball semifinal 37.5 |
| 2021–22 | Spring | 132.5 | Boys golf 50, boys tennis 2nd 45, baseball QF 22.5, with 15 not traced |
| 2022–23 | Fall | 117.5 | Boys soccer 50, girls tennis 2nd 45, volleyball QF 22.5 |
| 2022–23 | Winter | 72.5 | Boys basketball semifinal 37.5, girls swimming 4th 35 |
| 2022–23 | Spring | 95 | Boys golf 50, boys track 2nd 45 |
| 2023–24 | Fall | 150 | Girls tennis 50, boys soccer semifinal 37.5, volleyball semifinal 37.5, girls XC 6th 25 |
| 2023–24 | Winter | 35 | Girls swimming 4th 35 |
| 2023–24 | Spring | 95 | Boys track 50, boys golf 2nd 45 |
| 2024–25 | Fall | 185 | Volleyball 50, boys soccer 50, girls tennis 50, boys XC 7th 20, girls XC 8th 15 |
| 2024–25 | Winter | 30 | Girls swimming 5th 30 |
| 2024–25 | Spring | 17.5 | Girls track T7 (20 + 15) ÷ 2 |
| 2025–26 | Fall | 145 | Volleyball 50, girls tennis 50, boys soccer 2nd 45 |
| 2025–26 | Winter | 45 | Boys basketball QF 22.5, girls basketball QF 22.5 |
| 2025–26 | Spring | 42.5 | Girls soccer QF 22.5, with 20 not traced |

The untraced 15 and 20 are too small to hide a title or a runner-up finish. In 2020–21 boys golf tied Westchester on 238 and the published table lists Gaston Day 3rd, so it scored 40, not the split 37.5.

**Disagreements with the app's earlier record** (`Gaston Day School - Sports - Program and Championship Ledger 2026.md`, built from HighSchoolOT round-ups for three seasons plus Gaston Day coverage):

- **Eight titles since 2021 is wrong. The count is 14.** The earlier pass missed boys soccer 2021 and 2022, girls swimming 2022, boys golf 2022 and 2023, and boys track 2024.
- **"In exactly three sports" is false.** The titles sit in six: girls tennis, volleyball, boys soccer, boys golf, girls swimming and boys track.
- **The 2024–25 three-title year was not the school's biggest.** 2021–22 had five team titles, which the Gaston Gazette report of May 17, 2022 lists: boys soccer, girls swimming, girls tennis, volleyball and boys golf.

**The earlier ledger's other facts hold.** Its 2021, 2023, 2024 and 2025 girls tennis titles and its 2021, 2024 and 2025 volleyball titles all match the brackets. So does the 2024 boys soccer title.

**Reach limits.** Boys and girls golf for 2024–25 and 2025–26 were not read beyond the term totals. 2025's 2A golf top three is Village Christian, Burlington Christian and O'Neal, per O'Neal's report. Cross country 2022 and 2025 and swimming 2026 were not read, and the fall and winter totals for those seasons are exact without them.

Sources:

- 2025–26 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- 2024–25 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- 2023–24 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- 2022–23 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- 2021–22 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- 2020–21 standings: https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- NCISAA results archive, per sport and season: https://archives.ncisaa.org/index.php?sport=12&years=2021-2022 (sport ids: boys soccer 8, girls tennis 11, volleyball 12, boys tennis 16)
- 2021 boys golf 2A team results: https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%202A%20Team%20Results%20(1).pdf
- 2022 swimming team scores: https://admin.ncisaa.org/uploads/SWIMMING/Div%203%20Final_Team_Ind.pdf
- 2023 swimming team scores: https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%203%20Swim%20scores.pdf
- 2021 cross country: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- 2024 cross country: http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- 2025 track team scores: https://admin.ncisaa.org/uploads/Docs/NCISAA%20D3%20Final%20Results.pdf
- 2022 boys golf title, Gaston Gazette: https://sports.yahoo.com/happy-blue-gaston-day-boys-170121762.html
- 2023 final statewide golf rankings, naming Gaston Day NCISAA D3 champion, HighSchoolOT: https://www.highschoolot.com/story/highschoolot-hsot-final-statewide-rankings-for-boys-golf/20898527/
- 2023 boys golf, O'Neal runner-up by two strokes: https://www.onealschool.org/news-detail?pk=1536408
- 2023 boys track, Alamance News: https://alamancenews.com/bca-boys-track-and-field-team-secures-first-title-in-any-sport-for-school/
- 2024 boys golf, HighSchoolOT: https://www.highschoolot.com/story/the-o-neal-school-wins-ncisaa-d3-boys-golf-trinity-academy-s-eastman-wins-medalist/21453701/
- 2024 boys track, Charlotte Observer: https://sports.yahoo.com/super-saturday-seven-charlotte-area-011100010.html
- 2024 boys track, Gaston Gazette: https://sports.yahoo.com/south-point-boys-tennis-gaston-011132558.html

## Wells Fargo Cup results for Gaston Day

Fall, winter, spring and total as published. All six seasons are NCISAA 2A.

| Season | Place | Fall | Winter | Spring | Total |
|---|---|---|---|---|---|
| 2020–21 | 2 | 120 | 75 | 107.5 | 302.5 |
| 2021–22 | 1 | 175 | 87.5 | 132.5 | 395 |
| 2022–23 | 4 | 117.5 | 72.5 | 95 | 285 |
| 2023–24 | 4 | 150 | 35 | 95 | 280 |
| 2024–25 | 7 | 185 | 30 | 17.5 | 232.5 |
| 2025–26 | 6 | 145 | 45 | 42.5 | 232.5 |

## Wells Fargo Cup row to add for Berean Baptist Academy

| Season | Class | Place | Fall | Winter | Spring | Total |
|---|---|---|---|---|---|---|
| 2024–25 | 2A | 21 | 37.5 | blank | blank | 37.5 |

Its other published row, 2025–26 2A, has a blank place on 0 points and stays out. No earlier season lists the school.

## Wells Fargo Cup point sources for Gaston Day

Years are calendar years of the event. Fourteen titles and eight runner-up finishes, 2020–2026.

| Sport | Season | Titles | Runner-up |
|---|---|---|---|
| Girls tennis | Fall | 2021, 2023, 2024, 2025 | 2022 |
| Volleyball | Fall | 2021, 2024, 2025 | 2020 |
| Boys soccer | Fall | 2021, 2022, 2024 | 2025 |
| Boys golf | Spring | 2022, 2023 | 2024 |
| Boys track and field | Spring | 2024 | 2023 |
| Girls swimming | Winter | 2022 | |
| Boys tennis | Spring | | 2021, 2022 |

Evidence for each final:

| Year | Sport | Result | Source |
|---|---|---|---|
| 2020 | Volleyball | Lost 3–0 to Caldwell Academy, Oct 31 | Bracket |
| 2021 | Boys tennis | Lost 5–0 to Rocky Mount Academy, May 15 | Bracket |
| 2021 | Boys soccer | Won 3–1 over Trinity Academy, Oct 30 | Bracket |
| 2021 | Volleyball | Won 3–1 over Davidson Day, Oct 30 | Bracket |
| 2021 | Girls tennis | Won 5–4 over Davidson Day, Oct 30 | Bracket |
| 2022 | Girls swimming | Won 231 to O'Neal's 222 | Team-score PDF |
| 2022 | Boys golf | Won on 226, four strokes ahead of O'Neal and Caldwell, May 17 | Gaston Gazette |
| 2022 | Boys tennis | Lost 5–2 to Rocky Mount Academy, May 21 | Bracket |
| 2022 | Boys soccer | Won 3–1 over Greenfield | Bracket |
| 2022 | Girls tennis | Lost 5–3 to Trinity School of Durham and Chapel Hill | Bracket |
| 2023 | Boys golf | Won. HighSchoolOT names Gaston Day NCISAA D3 champion, O'Neal was runner-up by two strokes, and the spring total fits | HighSchoolOT, O'Neal |
| 2023 | Boys track | 2nd on 68, Burlington Christian 75, May 19–20 | Alamance News |
| 2023 | Girls tennis | Won 5–1 over Trinity School of Durham and Chapel Hill | Bracket |
| 2024 | Boys track | Won on 87, Caldwell 75, O'Neal 73 | Charlotte Observer |
| 2024 | Boys golf | 2nd on 228, O'Neal 217 | HighSchoolOT |
| 2024 | Volleyball | Won 3–0 over Westminster Catawba | Bracket |
| 2024 | Boys soccer | Won 2–0 over Westchester | Bracket |
| 2024 | Girls tennis | Won 5–2 over Epiphany | Bracket |
| 2025 | Volleyball | Won 3–2 over St. Thomas More | Bracket |
| 2025 | Girls tennis | Won 5–4 over Epiphany | Bracket |
| 2025 | Boys soccer | Lost 4–1 to Caldwell Academy | Bracket |

Dropped, under the usual bar of a title or a runner-up year: boys golf 2021 (3rd), the girls swimming finishes of 4th and 5th, the boys and girls basketball semifinals and quarterfinals, and every cross country finish.


---

## Sources referenced across these documents

- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2021/
- http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_XC_Championships_2024/
- https://admin.ncisaa.org/uploads/2021%20Boys%20Golf%20Championship%20Scores%20-%202A%20Team%20Results%20(1
- https://admin.ncisaa.org/uploads/Docs/NCISAA%20D3%20Final%20Results.pdf
- https://admin.ncisaa.org/uploads/SWIMMING/2023/2023%20division%203%20Swim%20scores.pdf
- https://admin.ncisaa.org/uploads/SWIMMING/Div%203%20Final_Team_Ind.pdf
- https://alamancenews.com/bca-boys-track-and-field-team-secures-first-title-in-any-sport-for-school/
- https://archives.ncisaa.org/index.php?sport=12&years=2021-2022
- https://basketball.realgm.com/highschool/teams/1873/Gaston-Day-School-NC
- https://bbafnc.org/
- https://charlotte.jwuathletics.com/sports/mens-basketball/roster
- https://gamecocksonline.com/sports/wvball/roster/player/anne-bradley-bing/
- https://gastondayathletics.com/
- https://sports.yahoo.com/articles/best-high-school-swimmers-charlotte-100000360.html
- https://sports.yahoo.com/happy-blue-gaston-day-boys-170121762.html
- https://sports.yahoo.com/south-point-boys-tennis-gaston-011132558.html
- https://sports.yahoo.com/super-saturday-seven-charlotte-area-011100010.html
- https://woffordterriers.com/news/2023/12/14/volleyball-inks-five-signees.aspx
- https://woffordterriers.com/sports/womens-volleyball/roster
- https://woffordterriers.com/sports/womens-volleyball/roster/megan-brown/8731
- https://www.dailygamecock.com/article/2025/08/season-preview-south-carolina-volleyball-looks-for-growth-and-success-under-new-staff-sports-navare
- https://www.gastonday.org/middle-school/
- https://www.highschoolot.com/gaston-day-school/17527719/
- https://www.highschoolot.com/story/gaston-day-repeats-ncisaa-2a-girls-tennis-title-downs-epiphany-school/21693252/
- https://www.highschoolot.com/story/gaston-day-rolls-to-ncisaa-2a-girls-tennis-title-over-trinity-school-of-durham-chapel-hill/21119771/
- https://www.highschoolot.com/story/highschoolot-hsot-final-statewide-rankings-for-boys-golf/20898527/
- https://www.highschoolot.com/story/north-carolina-high-school-volleyball-recruiting-tracker/21031942/
- https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/
- https://www.highschoolot.com/story/the-o-neal-school-wins-ncisaa-d3-boys-golf-trinity-academy-s-eastman-wins-medalist/21453701/
- https://www.highschoolot.com/the-2024-25-ncisaa-team-state-champions-in-every-sport/22016545/
- https://www.highschoolot.com/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/
- https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/
- https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/<sport>/<yy-yy>/roster/`
- https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/basketball/25-26/roster/
- https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/volleyball/
- https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/volleyball/23-24/roster/
- https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/volleyball/24-25/roster/
- https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions-2024-2025/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2020-2021/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2021-2022/
- https://www.ncisaa.org/recognition/wells-fargo-cup/past-champions/past-champions-2022-2023/
- https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/
- https://www.onealschool.org/news-detail?pk=1536408
- https://www.privateschoolreview.com/gaston-day-school-profile
