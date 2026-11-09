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
