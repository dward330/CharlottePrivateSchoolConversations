# Charlotte Christian — Sports — 247Sports Recruiting Rankings

**Provenance.** Captured 2026-10-26 during `/plan recruitranks` by fetching 247Sports' public
North Carolina state recruiting lists (HTTP GET, no login; each list page carries national,
position and state rank, stars, composite score, listed high school and commitment per row).
Every football and basketball athlete on this school's College Pipeline roster
(`src/data/sportsPrograms/charlotte-christian.ts`, `pipeline.roster`) was matched by normalised name
(suffixes Jr./III dropped, punctuation stripped) AND graduating class, then accepted only if
247's listed high school is this school. **The app shows the 247Sports Composite** (user
decision 2026-10-26); the 247Sports in-house figures are recorded alongside for audit only.
Classes 2024–2026 are final (all signed and enrolled), so these ranks no longer move.

"NA" national rank = 247 publishes a state rank but no national rank for that player.
Sports other than football and basketball are not ranked by 247Sports and are out of scope.

## Recruiting rankings — matched athletes (247Sports Composite)

| Class | Athlete | Sport | Pos | Stars | Composite score | Composite national | Composite NC state | Composite position | 247 in-house national | 247 in-house NC state | 247 listed school | 247 profile |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| '24 | Tripp Woody | Football | K | 2 | 0.7800 | NA | 67 | 20 | NA | 67 | Charlotte Christian (Charlotte, NC) | https://247sports.com/player/tripp-woody-46146089/ |
| '24 | Micah Gilbert | Football | WR | 4 | 0.9140 | 245 | 8 | 41 | NA | 10 | Charlotte Christian (Charlotte, NC) | https://247sports.com/player/micah-gilbert-46128048/ |
| '24 | Bryce Young | Football | DL | 4 | 0.9646 | 73 | 2 | 11 | 24 | 1 | Charlotte Christian (Charlotte, NC) | https://247sports.com/player/bryce-young-46130942/ |

## Recruiting rankings — not on a 247Sports NC list (unrated)

Searched by name across the NC lists for 2023–2027 (football, basketball, women's basketball).
Absence means 247 published no rating for the player (typical for walk-ons, D2/D3 commits and
girls' basketball, where 247 ranks only 0–2 NC players per class); the app shows a dash.

- '25 Owen Farrell — Football → Charleston Southern (D1)
- '25 Corban Hall — Football → Dartmouth (D1)
- '25 Brandon Hettwer — Football → Marshall (D1)
- '24 Ryan Henley — Football → Wake Forest (P4)
- '24 Zach Zinger — Football → Wake Forest (P4)
- '24 Gavin Major — Football → Wofford (D1)
- '24 Christian Vann — Football → Gardner-Webb (D1)
- '24 Cross Killen — Football → Limestone (D2)
- '24 Kayla Lee — Girls Basketball → Roanoke (D3)

## Recruiting rankings — ranked at this school but NOT on our roster

Reverse sweep, classes 2024–2026, Composite lists: 247 lists these players at this school, but
no roster row exists. Leads for a future roster backfill only, NOT shown by this plan; a
247 commit is not proof of enrollment, so confirm against the school's own signing coverage first.

- '26 Jamal Rule — football, RB, 3★ 0.8767; Composite NC #31, national 835; 247 commit: Nebraska. https://247sports.com/player/jamal-rule-46147357/

## Recruiting rankings — list sources

Composite (shown in the app) and 247Sports in-house lists, NC, high-school institution group:

- https://247sports.com/season/<year>-football/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-womens-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-football/recruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-womens-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
