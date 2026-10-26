# Providence Day — Sports — 247Sports Recruiting Rankings

**Provenance.** Captured 2026-10-26 during `/plan recruitranks` by fetching 247Sports' public
North Carolina state recruiting lists (HTTP GET, no login; each list page carries national,
position and state rank, stars, composite score, listed high school and commitment per row).
Every football and basketball athlete on this school's College Pipeline roster
(`src/data/sportsPrograms/providence-day.ts`, `pipeline.roster`) was matched by normalised name
(suffixes Jr./III dropped, punctuation stripped) AND graduating class, then accepted only if
247's listed high school is this school. **The app shows the 247Sports Composite** (user
decision 2026-10-26); the 247Sports in-house figures are recorded alongside for audit only.
Classes 2024–2026 are final (all signed and enrolled), so these ranks no longer move.

"NA" national rank = 247 publishes a state rank but no national rank for that player.
Sports other than football and basketball are not ranked by 247Sports and are out of scope.

## Recruiting rankings — matched athletes (247Sports Composite)

| Class | Athlete | Sport | Pos | Stars | Composite score | Composite national | Composite NC state | Composite position | 247 in-house national | 247 in-house NC state | 247 listed school | 247 profile |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| '26 | Gordon Sellars | Football | WR | 4 | 0.9302 | 177 | 10 | 27 | 202 | 13 | Providence Day School (Charlotte, NC) | https://247sports.com/player/gordon-sellars-iii-46142814/ |
| '26 | Zaid Lott | Football | QB | 3 | 0.8633 | NA | 49 | 79 | NA | 43 | Providence Day School (Charlotte, NC) | https://247sports.com/player/zaid-lott-46142511/ |
| '26 | Leo Delaney | Football | IOL | 4 | 0.9031 | 332 | 16 | 22 | NA | 20 | Providence Day School (Charlotte, NC) | https://247sports.com/player/leo-delaney-46140628/ |
| '26 | Jacob Baggett | Football | K | 3 | 0.8050 | NA | 89 | 29 | NA | 88 | Providence Day School (Charlotte, NC) | https://247sports.com/player/jacob-baggett-46165091/ |
| '25 | David Sanders Jr. | Football | OT | 5 | 0.9973 | 6 | 1 | 2 | 11 | 1 | Providence Day School (Charlotte, NC) | https://247sports.com/player/david-sanders-jr-46118364/ |
| '25 | Cairo Skanes | Football | CB | 3 | 0.8389 | NA | 54 | 190 | NA | 35 | Providence Day School (Charlotte, NC) | https://247sports.com/player/cairo-skanes-46130820/ |
| '25 | Braxton Winston | Football | CB | 3 | 0.8542 | NA | 35 | 142 | NA | 42 | Providence Day School (Charlotte, NC) | https://247sports.com/player/braxton-winston-iii-46129251/ |
| '25 | Julian Johnson | Boys Basketball | C | 3 | 0.8300 | 459 | 28 | 75 | NA | 27 | Providence Day School (Charlotte, NC) | https://247sports.com/player/julian-johnson-46151587/ |
| '24 | Brody Barnhardt | Football | S | 3 | 0.8722 | 854 | 28 | 89 | NA | 27 | Providence Day School (Charlotte, NC) | https://247sports.com/player/brody-barnhardt-46111879/ |
| '24 | Jordan Shipp | Football | WR | 4 | 0.9470 | 118 | 5 | 22 | 91 | 3 | Providence Day School (Charlotte, NC) | https://247sports.com/player/jordan-shipp-46117435/ |
| '24 | Channing Goodwin | Football | WR | 3 | 0.8836 | 581 | 18 | 83 | NA | 11 | Providence Day School (Charlotte, NC) | https://247sports.com/player/channing-goodwin-46111872/ |
| '24 | Jadyn Davis | Football | QB | 4 | 0.9492 | 112 | 4 | 9 | 115 | 5 | Providence Day School (Charlotte, NC) | https://247sports.com/player/jadyn-davis-46085247/ |

## Recruiting rankings — not on a 247Sports NC list (unrated)

Searched by name across the NC lists for 2023–2027 (football, basketball, women's basketball).
Absence means 247 published no rating for the player (typical for walk-ons, D2/D3 commits and
girls' basketball, where 247 ranks only 0–2 NC players per class); the app shows a dash.

- '26 Quintin McCray — Football → Richmond (D1)
- '26 Brendan Ravin — Football → Davidson (D1)
- '26 Jaida McClure — Girls Basketball → Appalachian State (D1)
- '26 Matthew Hankins — Football → Wingate (D2)
- '26 DC Carr — Football → Wingate (D2)
- '26 Osvaldo "Deuce" Haynes — Boys Basketball → Morehouse (D2)
- '26 Aidan Scruitsky — Boys Basketball → Hampden-Sydney (D3)
- '26 Katelyn Ramsden — Girls Basketball → Chicago (D3)
- '26 Julia O'Malley — Girls Basketball → Johns Hopkins (D3)
- '26 Mark Franco — Football → Denison (D3)
- '26 Will Wagner — Football → Denison (D3)
- '26 Aidan Gallos — Football → Tufts (D3)
- '25 Ian Cline — Football → Army – West Point (D1)
- '25 Trajan Thompson — Boys Basketball → Denver (D1)
- '25 Ellie Fyans — Girls Basketball → Western Carolina (D1)
- '25 Jaylen Himes — Football → Wingate (D2)
- '25 Jonah Lawrence — Boys Basketball → USC – Aiken (D2)
- '25 Davis Dudley — Football → Hampden-Sydney (D3)
- '25 Jack Langston — Football → Kenyon (D3)
- '24 Jordan Appling — Boys Basketball → Johnson & Wales (D3)
- '24 Sophie Levine — Girls Basketball → Franklin & Marshall (D3)
- '24 Lukas "Thor" Santwier — Football → Hampden-Sydney (D3)

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
