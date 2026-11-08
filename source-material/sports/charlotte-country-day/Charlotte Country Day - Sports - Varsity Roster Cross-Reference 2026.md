# Charlotte Country Day School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Research record written by Claude Code on 2026-11-08 during the
> `/athlete-commits` graduate refresh for Charlotte Country Day (plan
> `charlottecountrydaycommits`). It documents *how* the College Pipeline roster was checked
> and *what was checked and found empty*, so a later pass does not redo the same work. The
> athlete-level results live in `CCD - Sports - College Commitments 2024-2026.md`; the
> current seniors live in `Charlotte Country Day - Sports - College Commitments Class of
> 2027.md`. This file is provenance for the pipeline card, not a card of its own
> (`src/lib/metrics.ts` folds it onto the research dossier via `/roster cross-reference/i`).
>
> **Names policy:** only athletes with a documented college commitment, and the leads ruled
> out, are named here. Current students without a commitment are recorded as counts.

## Result in one line

**No new athlete.** Country Day publishes a named list of every college athlete per class,
with a total (17 / 18 / 13), and every source below agreed with it. The pass corrected one
sport (Carlin Parker, boys not girls basketball), one total (51 → 48) and one stale Compare
value (`d1-commits-2426` 25 → 28). A pass that finds nothing new converts "probably
undercounted" into a confirmed floor, and this one does: for this school the floor is the
school's own published count.

## Scope

Every varsity sport the school fields. The school's own Collegiate Athletics page lists 16
sports: baseball, basketball, cheer, equestrian, field hockey, football, golf, lacrosse,
soccer, softball, squash, swimming, tennis, track & field / cross country, volleyball and
wrestling.

| Sport | Tier | Sources |
|---|---|---|
| Basketball (both) | Full | MaxPreps rosters; RealGM (Chrome); HighSchoolOT boys + girls; Tampa release |
| Football | Full | MaxPreps; NC Football News 2026 + 2027 trackers (no CCD entry); HighSchoolOT hub |
| Lacrosse (both) | Full | MaxPreps; LaxNumbers boys t=12769 + girls t=22579, 2024–2027 (Chrome); HighSchoolOT boys + girls; Team 91 Charlotte commitments page |
| Swimming | Full via trackers | HighSchoolOT boys + girls; SwimSwam / Swimming World searches. No MaxPreps roster (404 every season) |
| Soccer (both) | Full | MaxPreps; HighSchoolOT boys + girls; grouped search |
| Volleyball | Full | MaxPreps; HighSchoolOT volleyball |
| Tennis (both) | Full | MaxPreps; HighSchoolOT boys + girls; grouped search |
| Baseball / softball | Full | MaxPreps; HighSchoolOT baseball + softball |
| Track / XC | Trackers only | HighSchoolOT boys + girls. MaxPreps track 404 and cross country empty every season: **unchecked roster** |
| Golf | Trackers only | HighSchoolOT boys + girls. MaxPreps golf 404 / girls golf empty: **unchecked roster** |
| Wrestling | Trackers only | HighSchoolOT wrestling. MaxPreps page empty every season: **unchecked roster** |
| Field hockey | Grouped search | MaxPreps; college-roster search. No statewide tracker |
| Cheer, equestrian, squash | School list only | No roster on MaxPreps; no tracker |

## Step 1 — the school's own pages (read 2026-11-08)

- **Collegiate Athletics** (`charlottecountryday.org/cd-experience/athletics/collegiate-athletics`)
  server-renders a per-sport list, classes 2021–2026, with class years. curl works.
- **Per-class posts** give the count and, for 2024 and 2026, the full named list:
  2024 = 17 (named), 2025 = 18 (count + examples; names from the Collegiate Athletics page,
  18 exact), 2026 = 13 (college + sport). URLs in the commitments file.
- The athletics news board (`/cd-experience/athletics/athletics-news`) shows only the nine
  newest posts; older signing posts are reachable by URL or search, not by paging.
- Issuu *Perspectives* magazines (Fall 2024, Fall 2025) are a flipbook with no server-side
  text; their figures are the same as the school posts, so nothing was lost.

## Step 2 — MaxPreps rosters by season

`https://www.maxpreps.com/nc/charlotte/charlotte-country-day-school-buccaneers/<sport>/<yy-yy>/roster/`,
path form, curl with a browser UA. Pulled 23-24, 24-25, 25-26 and 26-27 for 19 sport slugs.
Seniors (`Sr.`) per sport and class:

| Sport | 2024 | 2025 | 2026 | 2027 |
|---|---|---|---|---|
| Football | 9 | 12 | 11 | 13 |
| Boys basketball | 3 | 8 | 2 | (not posted) |
| Girls basketball | 3 | 2 | 5 | (not posted) |
| Baseball | 4 | 3 | 9 | 1 |
| Softball | 1 | 0 | 0 | (not posted) |
| Boys soccer | 11 | 11 | 7 | 8 |
| Girls soccer | 6 | 5 | 7 | (not posted) |
| Boys lacrosse | 12 | 5 | 6 | 11 |
| Girls lacrosse | 7 | (empty roster) | 5 | (not posted) |
| Volleyball | 4 | 5 | 3 | 1 |
| Field hockey | 6 | 6 | 5 | 6 |
| Boys tennis | 4 | 5 | 3 | (not posted) |
| Girls tennis | 3 | 3 | 5 | 3 |
| Swimming, track, cross country, golf (both), wrestling | — | — | — | — |

174 distinct graduated seniors across the three classes (multi-sport athletes counted
once); 37 current seniors on the posted 2026-27 rosters. Every graduated senior was checked
against the school's per-class list. Everyone not on it is a **null**: the school, which
publishes every college athlete it knows of, does not list them.

## Step 3 — cross-reference results

- **HighSchoolOT, 17 trackers** (hub `highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/`):
  16 Country Day entries across 2024–2025, **all already on the card**. The boys basketball
  tracker files Carlin Parker (Tampa) as a boys player, which surfaced the sport correction.
  No Class of 2026 or 2027 Country Day entries yet.
- **RealGM** (`basketball.realgm.com/highschool/teams/1523/Charlotte-Country-Day-High-School`,
  Chrome): window graduates Bethel '24, Lowrey '25, Parker '25 (5-10 G), Youakim '26 — all on
  the card. Fletcher Bigham ('23, Coastal Carolina) and Dallas Gardner ('23, Georgia Southern)
  are outside the window; RealGM shows transfers from the colleges the school lists
  (Sewanee, Pembroke).
- **LaxNumbers** boys (`laxnumbers.com/team_info.php?y=<yr>&t=12769&s=2`): 2024 none;
  2025–2026 Crandall Wilkins (Middlebury); 2027 **Harris Hatcher** (Saint Joseph's, D1) and
  one Class of 2028 commit (uncounted, unnamed). Girls (`t=22579`): 2024–2025 Grayson Anne
  McCurdy (JMU); 2026–2027 **Katy Blythe** (Furman, D1).
- **Team 91 Charlotte commitments** (`charlotte.team91lacrosse.com/commitments/`): only
  window entry is Crandall Wilkins '26.
- **NC Football News** 2026 and 2027 class trackers: no Country Day entry. (2024 and 2025
  slugs 404.)
- **Tampa release** confirms Carlin Parker as men's basketball, walk-on.
- College-roster reverse searches ("Charlotte Country Day" as High School) returned only
  athletes already on the card (Miami, Richmond, JMU, Liberty, Bucknell, Ball State).

## Leads ruled out
| Name | Class | Lead | Why not a row |
|---|---|---|---|
| Owen Timperman | 2026 | Boys lacrosse goalkeeper, USA Lacrosse All-American, program-record saves | Not on the school's complete 13-name 2026 list; no tracker, club or college entry |
| Evelyn Turner | 2026 | Girls lacrosse All-American; also girls basketball | Same: not on the school's 2026 list; no commitment published |
| Kendall Blount | 2024 | Louisville cheer, on the school list | Counted in the total only; cheer is not an NCAA sport (user decision 2026-11-08) |

## Unchecked
Rosters that could not be retrieved, so their seniors were checked against the school list
and the trackers only: **swimming, track & field, cross country, golf, wrestling** (MaxPreps
404 or empty every season), and the 2024-25 girls lacrosse roster (empty table). Cheer,
equestrian and squash have no public roster anywhere. These are gaps in the *roster pull*,
not in the result: the school's own per-class count is the check, and it matched.

## Window check
Current senior class 2027; most recently graduated 2026 = the window's last year. **No
window roll due.**
