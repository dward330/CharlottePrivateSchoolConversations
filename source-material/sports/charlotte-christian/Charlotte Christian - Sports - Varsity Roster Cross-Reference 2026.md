# Charlotte Christian School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Claude Code, 2026-11-08, `/athlete-commits` graduate refresh (Chrome
> extension connected). Method: pull every varsity roster for the 2023–24, 2024–25, 2025–26
> and 2026–27 seasons, list the seniors per season (= the classes of 2024, 2025, 2026 and the
> current Class of 2027), and cross-reference each against recruiting trackers and the
> college's own roster. Results land in
> `Charlotte Christian - Sports - College Commitments 2024-2026.md` (window) and
> `… - College Commitments Class of 2027.md` (current seniors).
>
> Names here are limited to athletes with a documented commitment or a lead that was ruled
> out. Seniors without a commitment are recorded as counts.

## Rosters pulled
**School site:** the Finalsite athletics pages hold current-season rosters only and the
"Knights in College" list stops at the Class of 2025, so past seniors came from MaxPreps.

**MaxPreps** (`/nc/charlotte/charlotte-christian-knights/<sport>/<yy-yy>/roster/`, path form):

| Sport | 23–24 Sr | 24–25 Sr | 25–26 Sr | Notes |
|---|---|---|---|---|
| Football | 11 | 11 | 17 | full grades |
| Boys basketball | 2 | 2 | 1 | |
| Girls basketball | 3 | 2 | 2 | |
| Baseball | 1* | 6 | 0* | *grades largely blank; 2026 seniors taken from the 24–25 juniors (6) |
| Softball | 0* | 6 | 2 | |
| Boys lacrosse | 8 | 6 | 1 | |
| Girls lacrosse | 5 | 0* | 6 | |
| Boys soccer | 11 | 7 | 3 | |
| Girls soccer | 6 | 4 | 3 | |
| Volleyball | 3 | 4 | 5 | |
| Boys tennis | 2 | 1 | 3 | |
| Girls tennis | 1 | 4 | 4 | |
| Wrestling | 1 | 0 | — | 25–26 table empty |

**Unchecked (no roster retrievable in any season):** track & field and cross country (404 /
empty tables), swimming (boys 404; girls one season, no grades), golf (boys 404; girls one
season, no grades), field hockey (404 — not fielded on MaxPreps). These sports were covered
by grouped searches only (tier 2), not per-name cross-reference.

## Sources reached
- HighSchoolOT: all 17 per-sport trackers plus the Building the Fence (2024/25/26) and
  out-of-state football lists — fetched by curl, grepped for the school.
- RealGM (Chrome): https://basketball.realgm.com/highschool/teams/587/Charlotte-Christian-School-NC
- LaxNumbers boys (Chrome), team id 12770: https://www.laxnumbers.com/team_info.php?y=2026&t=12770&s=2
  (2024, 2025, 2026 pages read). Girls' LaxNumbers page not located.
- 247Sports Composite 2026 NC (WebFetch).
- Prep Baseball Report 2026 HS Preview, Region 6: https://www.prepbaseball.com/news/NC/2026-hs-preview--region-6
- NCISAA 2026 all-state baseball (SI): https://www.si.com/high-school/north-carolina/ncisaa-announces-2026-all-state-baseball-teams-across-four-classifications-01ktvk4vcng8
- College Sidearm rosters (curl): Nebraska, Army, Charlotte, Elon, Barton, Columbia, Queens,
  College of Charleston, Southern Miss, Berry, Gordon, Hampden-Sydney, Belmont Abbey;
  Gardner-Webb's signing release.
- School announcement on the Class of 2026 service-academy signees (Knights Headlines).
- **Not reachable:** Perfect Game (Azure WAF in Chrome and curl); Air Force's roster lists
  no freshmen; On3 / SwimCloud (blocked by design).

## Results by sport (tier and outcome)
| Sport | Tier | Found |
|---|---|---|
| Football | 1 | **7 Class of 2026 commits** (Rule, Hulbert, Rosen, Phillips, C. Kilgannon, R. Kilgannon, Estep). 10 other 2025–26 seniors: no commitment found. |
| Baseball | 1 | **2 confirmed** (Berger, Beard); 2 leads (Darling, McGrath); 2 seniors uncommitted (one per Perfect Game). Class of 2024: Layton (drafted — see record). |
| Softball | 1 | **1 confirmed** (Banks); 1 senior, nothing found. |
| Boys basketball | 1 | **Null** — RealGM lists no 2024–26 graduate with a college. |
| Girls basketball | 1 | Null for 2026 (2 seniors). |
| Boys lacrosse | 1 | 1 lead (Banner '26); DeCarlo '25 ruled out. |
| Girls lacrosse | 2 | Null for 2026 (6 seniors; no tracker or roster hit). |
| Soccer (both) | 2 | Null for 2026 (6 seniors). |
| Volleyball | 2 | Null for 2026 (5 seniors). |
| Tennis (both) | 2 | Null for 2026 (7 seniors). |
| Track, swimming, golf, XC | 2 | Unchecked by roster; grouped searches found nothing for 2026. |

## Leads ruled out
- **L.J. Porter** — left for Hough High before his senior year (graduate test); ECU commit
  counts for Hough.
- **Landon DeCarlo** — Berry (LaxNumbers only), not on Berry's roster.
- **Jack McGrath** — Hampden-Sydney (PBR only), not on H-SC's 2027 roster.
- **DJ Layton** — Southern Miss signee, drafted and turned pro (user decision, see plan).
- **"Caden Hicks"** on Barton's roster — a page-parse artifact; he is from Holly Springs HS.

## Class of 2027 (current seniors) — new leads
See the per-class file: Matty Carroll (Maryland baseball, PBR only), Corbin Corum (Pace
lacrosse, LaxNumbers only), and a conflict on Landry Struble (Monmouth per Team 91 in
January; Washington & Lee per LaxNumbers now).

## Conclusion
The card was missing the entire Class of 2026: **10 confirmed commitments, 9 Division I, 1
Power 4** (Rule, Nebraska). The 2024–25 rows match the school's list exactly; the only
tracker lead outside it (Layton) turned pro. The window is now a documented floor for all
three classes rather than for two.
