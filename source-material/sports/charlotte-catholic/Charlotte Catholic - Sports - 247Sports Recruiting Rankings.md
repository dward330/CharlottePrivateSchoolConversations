# Charlotte Catholic — Sports — 247Sports Recruiting Rankings

**Provenance.** Captured 2026-10-26 during `/plan recruitranks` by fetching 247Sports' public
North Carolina state recruiting lists (HTTP GET, no login; each list page carries national,
position and state rank, stars, composite score, listed high school and commitment per row).
Every football and basketball athlete on this school's College Pipeline roster
(`src/data/sportsPrograms/charlotte-catholic.ts`, `pipeline.roster`) was matched by normalised name
(suffixes Jr./III dropped, punctuation stripped) AND graduating class, then accepted only if
247's listed high school is this school. **The app shows the 247Sports Composite** (user
decision 2026-10-26); the 247Sports in-house figures are recorded alongside for audit only.
Classes 2024–2026 are final (all signed and enrolled), so these ranks no longer move.

"NA" national rank = 247 publishes a state rank but no national rank for that player.
Sports other than football and basketball are not ranked by 247Sports and are out of scope.

## Recruiting rankings — matched athletes (247Sports Composite)

| Class | Athlete | Sport | Pos | Stars | Composite score | Composite national | Composite NC state | Composite position | 247 in-house national | 247 in-house NC state | 247 listed school | 247 profile |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026 | Dominic Basrawala | Football | DL | 3 | 0.8300 | NA | 82 | 281 | NA | 71 | Charlotte Catholic (Charlotte, NC) | https://247sports.com/player/dominic-basrawala-46150298/ |

## Recruiting rankings — not on a 247Sports NC list (unrated)

Searched by name across the NC lists for 2023–2027 (football, basketball, women's basketball).
Absence means 247 published no rating for the player (typical for walk-ons, D2/D3 commits and
girls' basketball, where 247 ranks only 0–2 NC players per class); the app shows a dash.

- 2024 Gracynn Gough — Basketball → College of the Holy Cross (D1)
- 2024 Blanca Thomas — Basketball → North Carolina (P4)
- 2025 Chris Eagan — Basketball → American University (D1)
- 2026 Carter Garnett — Football → Johns Hopkins University (D3)
- 2026 Lukas Lupinski — Football → Columbia University (D1)
- 2026 Caden O’Neill — Football → Furman University (D1)
- 2026 Keanen Teeter — Football → Lenoir-Rhyne University (D2)

## Recruiting rankings — ranked at this school but NOT on our roster

Reverse sweep, classes 2024–2026, Composite lists: 247 lists these players at this school, but
no roster row exists. Leads for a future roster backfill only, NOT shown by this plan; a
247 commit is not proof of enrollment, so confirm against the school's own signing coverage first.

- '24 Jack Larsen — football, TE, 3★ 0.8900; Composite NC #15, national 481; 247 commit: Notre Dame. https://247sports.com/player/jack-larsen-46117223/
- '24 Nick Segarra — football, TE, 3★ 0.8336; Composite NC #52, national NA; 247 commit: Ohio. https://247sports.com/player/nick-segarra-46135129/
- '25 Charlie Smith — football, QB, 3★ 0.8200; Composite NC #66, national NA; 247 commit: Harvard. https://247sports.com/player/charlie-smith-46147891/

## Recruiting rankings — list sources

Composite (shown in the app) and 247Sports in-house lists, NC, high-school institution group:

- https://247sports.com/season/<year>-football/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-womens-basketball/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-football/recruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
- https://247sports.com/season/<year>-womens-basketball/recruitrankings/?InstitutionGroup=HighSchool&State=NC — fetched for 2023, 2024, 2025, 2026, 2027 (append `&Page=2` for rows 51+)
