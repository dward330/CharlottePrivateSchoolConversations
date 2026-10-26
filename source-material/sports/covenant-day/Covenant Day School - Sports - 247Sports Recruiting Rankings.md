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
