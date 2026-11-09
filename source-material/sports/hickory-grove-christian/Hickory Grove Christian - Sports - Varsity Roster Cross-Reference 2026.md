# Hickory Grove Christian School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Research record written by Claude Code on 2026-11-09 during
> `/athlete-commits hickory-grove-christian`. It documents *how* the College Pipeline roster
> was re-checked and *what was searched and found empty*, so a later pass does not redo the
> work. The athlete-level results are in `Hickory Grove Christian - Sports - College
> Commitments 2024-2026.md`; this file holds the method and the nulls. It is provenance for
> the pipeline card, not a card of its own (`src/lib/metrics.ts` folds it onto the research
> dossier via `/roster cross-reference/i`).
>
> **Names policy:** only athletes with a documented college commitment, and the leads that
> were ruled out, are named. Current students and graduates without a commitment are
> recorded as counts.

## Result in one line

5 → **7** committed, 3 → **4** Division I, Power 4 **0** (unchanged). Two Class of 2024
Division I athletes the card never had: Conner Barozzino (baseball, Appalachian State) and
Jahzir Dukes (football, North Carolina Central). One D1 row is corrected down: Brady Johnson
is at Wingate (D2), not ETSU. Vanhook's junior college is relabelled to the NJCAA
convention. Class of 2026: none found in any sport.

## Scope

Every varsity sport on MaxPreps' HGCS school page: baseball, boys and girls basketball,
boys and girls cross country, field hockey, football, boys and girls golf, boys and girls
soccer, softball, boys and girls swimming, boys and girls tennis, boys and girls track &
field, volleyball, boys volleyball and wrestling. HGCS fields **no lacrosse**, so LaxNumbers
did not apply.

Depth by tier:
- **Full per-name cross-reference** (rosters + commitment database + college roster):
  baseball, football, boys basketball.
- **Rosters + HighSchoolOT tracker + grouped searches:** girls basketball, boys and girls
  soccer, softball, volleyball.
- **Tracker + grouped searches only (no roster published):** track & field, cross country
  after 2023-24, swimming, tennis, golf, wrestling.

## Step 1 — the school's own pages (read 2026-11-09)

`hgchristian.org/athletics-home`, `/fall-sports`, `/winter-sports`, `/spring-sports` and
`/athletics/records-and-titles` (Finalsite; curl works). **None names a college signee or
links a signing post**; `/news` returns 404 and no athletics news board was found. A search
for HGCS signing-day coverage found none. The school publishes no all-sport commitment
list.

## Step 2 — MaxPreps rosters by season

`https://www.maxpreps.com/nc/charlotte/hickory-grove-christian-lions/<sport>/<yy-yy>/roster/`,
path form, browser UA. 21 sport slugs × 4 seasons (23-24 → 26-27) = 84 pages; field hockey
404s in every season and boys soccer 23-24 404s.

Rosters with data: baseball (23-24 → 25-26), boys basketball (23-24 → 25-26), girls
basketball (23-24 → 25-26), football (all four), boys soccer (24-25 → 26-27), girls soccer
(23-24 → 25-26), softball (24-25, 25-26), volleyball (all four), cross country (23-24 only).
**Empty in every season:** golf (both), swimming (both), tennis (both), track & field
(both), boys volleyball, wrestling. Spring 26-27 rosters are not posted yet.

Seniors (`Sr.`) by graduating class:
- **Class of 2024 (2023-24):** football 13, girls soccer 6, girls basketball 4, baseball 3,
  cross country 3, volleyball 1 (several two-sport athletes).
- **Class of 2025 (2024-25):** football 11, baseball 5, girls soccer 4, volleyball 4, boys
  basketball 3, girls basketball 1, softball 1.
- **Class of 2026 (2025-26):** football 14, volleyball 4, baseball 3, boys soccer 3, boys
  basketball 2, girls basketball 2, softball 2, girls soccer 1.
- **Class of 2027 (2026-27, fall/winter posted):** football 9, boys soccer 4, volleyball 2.

## Step 3 — cross-reference

**HighSchoolOT trackers.** All 18 per-sport trackers, the three "Building the Fence"
in-state football pages and the three out-of-state roundups (hub:
https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/).
HGCS hits:
- Baseball: Barozzino (2024, Division I, Appalachian State), Vanhook (Junior College,
  Gaston College), Cabbage and Green (2025, Division I).
- Football, Class of 2024 in-state: Dukes (cornerback, Division I FCS). The college
  headings on that page are logos, so the college comes from NCCU's roster.

There are no HGCS hits in the basketball, soccer, softball, volleyball, track, swimming,
tennis, golf or wrestling trackers, and none in any Class of 2026 list.

**RealGM** (Chrome): https://basketball.realgm.com/highschool/teams/7170/Hickory-Grove-Christian-School-NC/players.
One player in window: Zavien Dillingham (2024, Valley Forge), ruled out. 2025 and 2026
graduates: none listed.

**The Baseball Cube** (Chrome; 403 to curl): https://thebaseballcube.com/content/hs_team/11709/.
In window: Barozzino (App State), Green (UNC Asheville), Johnson (Wingate). Seven older
alumni (Class of 2023 and earlier) are excluded.

**College rosters checked (graduate test):** Appalachian State baseball (Barozzino bio),
NCCU football (Dukes bio), UNC Wilmington baseball (Cabbage), UNC Asheville baseball
(Green), Wingate baseball current and 2025 (Johnson), ETSU baseball current and 2025
(Johnson absent), Mars Hill 2026 Baseball Night program (Pelow; the athletics roster URL
404s), Gaston College baseball 2024-25 and 2025-26 (Vanhook).

**Other sources:** Prep Baseball Report 2024 HGCS preview and 2025 NC preview (search
snippets; the pages 403). PBR's 2026 Region 6 preview lists HGCS with no commitment shown.
An NCSA profile for Anthony Hawkins Jr. shows no commitment.

## Ruled out

| Lead | Source | Why |
|---|---|---|
| Brady Johnson → East Tennessee State ('25) | PBR 2025 preview snippet | Not on ETSU's rosters; on Wingate's as a freshman (row changed to Wingate) |
| Zavien Dillingham → Valley Forge ('24) | RealGM | Not on HGCS's 2023-24 boys basketball roster |
| Lanzo, K. Miller, Nelson, Carson and Maddox Cabbage, Browning, J. Little | The Baseball Cube | Class of 2023 or earlier; outside the window |

## Nulls (searched, nothing found)

- **Football** 2024–26 (13 + 11 + 14 seniors): HighSchoolOT in-state and out-of-state lists,
  grouped searches. Only Dukes.
- **Baseball** 2024–26 (3 + 5 + 3 seniors): HighSchoolOT, PBR, The Baseball Cube, grouped
  searches. The three Class of 2026 seniors have no published commitment.
- **Boys basketball** 2025–26 (3 + 2 seniors): RealGM, HighSchoolOT, grouped searches.
- **Girls basketball** (4 + 1 + 2 seniors), **girls soccer** (6 + 4 + 1), **boys soccer**
  (3 in 2026), **softball** (1 + 2), **volleyball** (1 + 4 + 4): HighSchoolOT trackers and
  grouped searches; none.
- **Track & field:** Anthony Hawkins Jr. ('25), a multiple NCISAA shot put/discus champion,
  has no published college commitment; a college-roster search found none.

## Unchecked (could not be retrieved)

- **Track & field, swimming, tennis, golf and wrestling rosters**, all seasons (empty on
  MaxPreps), and **cross country** after 2023-24. Only the statewide trackers and searches
  cover these sports.
- **Softball 2023-24** roster (empty on MaxPreps).
- **The school's own signing announcements**, if any exist off its website (social media
  is not read).
