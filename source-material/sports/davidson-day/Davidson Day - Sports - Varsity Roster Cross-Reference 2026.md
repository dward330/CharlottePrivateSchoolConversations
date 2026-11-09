# Davidson Day School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Research record written by Claude Code on 2026-11-08 during
> `/athlete-commits Davidson Day School` (graduate refresh). It documents *how* the College
> Pipeline roster was rebuilt and *what was checked and found empty*, so a later pass does
> not redo the same work. The athlete-level results live in `Davidson Day - Sports - College
> Commitments 2024-2026.md`; this file is the method and the nulls. It is provenance for the
> pipeline card, not a card of its own (`src/lib/metrics.ts` folds `/roster
> cross-reference/i` onto the research dossier).
>
> **Names policy:** only athletes with a documented college commitment, and the leads ruled
> out, are named here. Current students without a commitment are recorded as counts.

## Scope
Every varsity sport the school fields (`offered` in `src/data/sportsPrograms/davidson-day.ts`:
13 sports), for the seasons 2023-24, 2024-25, 2025-26 (graduating Classes of 2024–2026) and
2026-27 (current seniors, Class of 2027).

**Tier 1 (full per-name cross-reference):** boys basketball, boys soccer, girls soccer,
volleyball, girls lacrosse, boys and girls tennis — the sports whose MaxPreps rosters were
retrievable.
**Tier 2 (statewide trackers + grouped searches, no roster):** football, baseball, girls
basketball (2023-24, 2024-25), swimming, track & field, cross country, golf, wrestling, boys
lacrosse.

## Step 1 — rosters
- **School site:** `ddspatriotsathletics.com` returns 403 (as in July 2026); `davidsonday.org`
  publishes signing posts, not rosters. Not used.
- **MaxPreps** (`https://www.maxpreps.com/nc/davidson/davidson-day-patriots/<sport>/<yy-yy>/roster/`,
  curl with a browser UA). Seniors per season:

| Sport (MaxPreps slug) | 23-24 Sr. | 24-25 Sr. | 25-26 Sr. | 26-27 Sr. |
|---|---|---|---|---|
| basketball | 7 | 5 | 4 | 3 |
| soccer (boys; roster mixes in girls' names in 23-24) | 13 | 9 | 6 | 8 |
| soccer/girls/spring | 5 | 11 | 1 | not posted |
| volleyball | 4 | 4 (+ Kaydee Smith, no grade printed) | 4 | 5 |
| lacrosse/girls | 2 | 1 | 6 | not posted |
| tennis (boys) | 1 | 0 | 1 | not posted |
| tennis/girls | 1 | 6 | 2 | 4 |
| basketball/girls | 404 | 404 | empty | empty |
| baseball, cross-country (B/G), golf (girls; boys 404 then empty), lacrosse (boys), swimming (B/G), track-field (B/G), wrestling | empty every season | | | |
| football | 404 every season (only a JV page exists) | | | |

Empty or 404 for every season = **unchecked**, not null.

## Step 2 — sources read
| Source | Access | Result |
|---|---|---|
| HighSchoolOT, all 17 per-sport trackers + in-state/out-of-state football lists 2024–26 | curl | 9 Davidson Day entries: M. Smith (Mercer), Zulman (Villanova), Perry (Chicago), Desmond, **Laatsch (Roanoke)**, Doty, Brown, Seifert, Glass. Football lists: none. |
| RealGM school page `basketball.realgm.com/highschool/teams/6173/Davidson-Day-School` | Chrome | 34 alumni with college: in window **Neace (Wofford, 2024)**, **M. Smith (Furman, 2024)**, **Jacobs (University of Charleston, 2025)**, Denis, Arnold, Peck, Stevens; Johnson-Whitfield (2026) no college; nothing for 2027 |
| College rosters (Sidearm, curl) | curl / Chrome | Confirmed all five new rows and every Class of 2025 row (URLs in the commitments file) |
| davidsonday.org signing posts | curl/Chrome | Nov 2024 post (7 names) = Class of 2025. `news-detail?pk=1279769` ("Five Student-Athletes…") is Oct 2021 (Wayback) = Class of 2022, out of window. No Class of 2024 post exists. |
| Charlotte Observer Nov 2024 signing roundup (Yahoo) | curl | Reprints the school's 7; lists Doty at Navy (wrong — Air Force roster) |
| Grouped web searches, Class of 2024–25 seniors in volleyball, girls lacrosse, girls/boys soccer, tennis, basketball | WebSearch | Nothing |
| LaxNumbers | search only | No Davidson Day team page surfaced; boys lacrosse roster unavailable everywhere — **unchecked** |

## Findings
**New (5):** Hank Neace '24 Wofford D1 · Jasper Zulman '24 Villanova D1 · Chase Perry '24
Chicago D3 · Levon Jacobs '25 University of Charleston D2 · Parker Laatsch '25 Roanoke D3.
**Changed (1):** Mason Smith '24 Mercer → **Furman** (both Southern Conference, D1).
**Unchanged:** every Class of 2025 and 2026 row re-confirmed.

## Nulls (searched, nothing found)
- Class of 2024: basketball 4 other seniors (RealGM lists none with a college), boys soccer
  9 other seniors (roster includes 3 girls' names), girls soccer 5, volleyball 4, girls
  lacrosse 2, tennis 2.
- Class of 2025: basketball 3 other seniors, boys soccer 7, girls soccer 9 beyond Seifert
  and Glass, volleyball 2 beyond Glass/Smith, girls lacrosse 1, girls tennis 6.
- Class of 2026: basketball 1 (on RealGM, no college), boys soccer 6, girls soccer 1, girls
  lacrosse 4, volleyball 3, tennis 3 — consistent with the school's complete list of 8.

## Unchecked (no roster retrievable)
Football (all seasons), baseball, boys lacrosse, swimming, track & field, cross country,
golf, wrestling, and girls basketball for 2023-24 and 2024-25. The Class of 2026 is covered
for these by the school's own complete list; the Classes of 2024 and 2025 are not. Doty
(swimming) and the two track athletes came from school lists, not rosters.

## Ruled out
- Mason Smith → Mercer (tracker): superseded; Mercer's 2024-25 roster does not list him.
- Matthew Doty → Navy (Observer): Air Force roster.

## Class of 2027 (current seniors)
26-27 rosters posted: basketball 3 seniors, boys soccer 8, volleyball 5, girls tennis 4. No
public commitment on any tracker, RealGM or the school's site. See the Class of 2027 file.
