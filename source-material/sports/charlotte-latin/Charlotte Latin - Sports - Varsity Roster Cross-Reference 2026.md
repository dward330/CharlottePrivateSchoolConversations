# Charlotte Latin School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Written by Claude Code on 2026-11-08 during the `/athlete-commits`
> graduate refresh for Charlotte Latin. This is the method record behind
> `Charlotte Latin - Sports - College Commitments 2024-2026.md`: which rosters were pulled,
> which sources were reachable, what each sport got, the nulls, the unchecked gaps and the
> leads ruled out. Names appear only for athletes with a documented commitment or a lead that
> was ruled out; everyone else is a count.

## Scope

Every varsity sport Charlotte Latin fields (26 team pages on clshawks.com: baseball,
cheerleading ×2, dance ×2, field hockey, football, boys and girls basketball, cross country,
golf, lacrosse, soccer, swimming & diving, tennis, track & field, softball, volleyball,
wrestling), for the graduating Classes of 2024, 2025 and 2026, plus the current Class of 2027.

## Rosters pulled

- **clshawks.com (Sidearm)** keeps past-season rosters (`/sports/<sport>/roster/<yyyy-yy>`),
  but leaves the class-year field blank for almost every player. It gives names, not grades.
- **MaxPreps** (`https://www.maxpreps.com/nc/charlotte/charlotte-latin-hawks/<sport>/<yy-yy>/roster/`,
  path form) for 2023-24 → 2026-27, with grades. 22 sport/gender slugs × 4 seasons pulled.
  - Senior counts read: football 10 / 10 / 16 / 12 (2023-24 → 2026-27); boys basketball
    4 / 5 / 6 / 6; girls basketball 5 / 3 / 8 / —; baseball 7 / 8 / 3 / —; softball
    1 / 3 / 1 / —; volleyball 3 / 4 / 3 / 5; boys soccer 9 / 3 / 10 / 5; girls soccer
    4 / 5 / 6 / —; boys lacrosse 5 / 8 / 11 / —; girls lacrosse 7 / 6 / 1 / —; field hockey
    8 / 7 / 5 / 8; boys tennis 4 / 6 / 1 / —; girls tennis 7 / 2 / 5 / 4; wrestling 6 / — /
    — / —; cross country (both) 2023-24 only; girls golf 2023-24 only; girls swimming
    2023-24 (6 seniors) and 2024-25 (no grades).
  - **Unchecked on MaxPreps:** boys golf, track & field (both), boys swimming — 404 every
    season; wrestling and cross country empty after 2023-24. For those sports the school's
    own signing posts and per-sport About pages are the census (below).

## The decisive source: the school's own signing posts

Latin holds three collegiate-commitment events a year and posts a named article for each
(November, February, late April). All nine in the window were found and read; the URLs are
in the commitments file. The earlier card had used five of them. The school's class totals
(16 / 22 / 25) are stated in the April posts. Each post names the sport for every athlete.

The per-sport **About pages** (`/sports/2022/11/<d>/charlotte-latin-varsity-<sport>.aspx`)
carry a "Collegiate Commitments" list by year. They are maintained unevenly (no sport lists
the Class of 2026; volleyball, field hockey, girls golf, girls tennis and wrestling list
nothing in the window) and one entry contradicts the signing post (Peters: Wofford vs
Wooster). Used as a cross-check only.

## Cross-reference tiers by sport

| Sport | Tier | Sources |
|---|---|---|
| Boys basketball | Full per-name | RealGM school page (Chrome), Navy/college rosters, HighSchoolOT |
| Football | Full per-name | School posts, college rosters (Georgetown), NC Football News 2026 tracker via HighSchoolOT |
| Girls lacrosse | Full per-name | LaxNumbers girls page (Chrome, t=22580), HighSchoolOT, Cal / Rollins / Furman rosters, UVA release |
| Boys lacrosse | Full per-name | LaxNumbers boys page (Chrome, t=12771) — Cutter and Hutcheson only |
| Swimming (both) | Full per-name | School posts, HighSchoolOT swimming trackers, UNC / Northwestern / Tennessee pages |
| Girls soccer | Full per-name | HighSchoolOT girls soccer tracker, South Carolina roster |
| Baseball, softball | Tracker | HighSchoolOT baseball and softball trackers; Wooster / Wofford rosters |
| Track / XC | Tracker | HighSchoolOT boys XC/track tracker; Bucknell roster |
| Golf, tennis, volleyball, wrestling, boys soccer, girls basketball | Tracker | HighSchoolOT per-sport trackers — no entry beyond the school posts |
| Field hockey, cheer, dance | School posts only | No commitment database; the posts name the cheer and dance signees |

## Reachability

- curl: clshawks.com, MaxPreps, every Sidearm college roster used, the HighSchoolOT
  trackers (20 pages from the hub), gamecocksonline.com, navysports.com.
- Chrome only: RealGM (`basketball.realgm.com/highschool/teams/477/Charlotte-Latin-High-School`),
  LaxNumbers (`team_info.php?t=12771` boys, `t=22580` girls), Google `site:` search (which
  surfaced the November 2023 and April 2024 posts that WebSearch did not).
- Not used: On3, SwimCloud (blocked in the extension and to curl).

## Results against the card (before → after)

- Athletes added to the window: **20 roster rows** plus **3 dance/cheer signees** counted in
  the total only.
- Sports filled in for the 10 rows the card listed as "Not published".
- Funnel 48 / 14 D1 / 3 P4 → **63 / 22 D1 / 8 P4**; Compare P4 3 → 8, D1 14 → 22.

## Nulls (searched, nothing beyond the school posts)

- RealGM: no Latin basketball graduate of 2024–26 beyond Levy, Rose and Jones.
- LaxNumbers boys 2024 and 2025: no recruits listed; 2026: Cutter, Hutcheson.
- HighSchoolOT trackers with **no** Charlotte Latin entry: boys golf, boys lacrosse, boys
  soccer, boys tennis, girls basketball, girls cross country / track, girls golf, girls
  tennis, volleyball, wrestling.

## Leads ruled out

- **Natalie Massardo** (2024, Furman lacrosse) — absent from Furman's entry-year roster;
  excluded as a decommit (user decision).
- **Dempsey McMahon** (2026, South Carolina soccer) — fails the graduate test on the
  evidence available: not on Latin's 2025-26 roster, not in any school post (user decision).
- **James Peters — Wofford** — the About page's college; the signing post and the tracker
  say Wooster, which is what is counted.
- **David Sammons** (Cal swimming) — Class of 2028, not a current senior (from the Class of
  2027 file).

## Current seniors (Class of 2027)

Unchanged confirmed count of 1 (Greathouse, George Washington). New lead: Adelaide Rhodes
(girls lacrosse → Claremont-Mudd-Scripps, D3), LaxNumbers only. The school's November 2026
signing post is not up yet (the early signing period opens 2026-11-11).
