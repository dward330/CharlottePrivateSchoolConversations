# Cannon School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Research record written by Claude Code on 2026-11-08 during `/plan
> cannoncommits`. It documents *how* the College Pipeline roster was rebuilt and *what was
> checked and found empty*, so a later pass does not redo the same work. The athlete-level
> results live in `Cannon - Sports - College Commitments 2024-2026.md`; this file is the
> method and the nulls. It is provenance for the pipeline card, not a card of its own
> (`src/lib/metrics.ts` folds it onto the research dossier).
>
> **Names policy:** only athletes with a documented college commitment, and the leads ruled
> out, are named here. Current students without a commitment are recorded as counts.

## Scope — the "top six" sports

The user asked for Cannon's major six sports. Taken as the six highest-profile recruiting
sports the school fields: **football, boys basketball, girls basketball, baseball, soccer
(boys and girls) and volleyball**. Swimming was added because Cannon's only prior Power 4
commit is a swimmer and the Observer's 2026-11-03 preview surfaced a new one. Lacrosse,
softball, cross country, golf, tennis and wrestling got a single OR-search each (nothing
found) and no roster-by-roster pass.

## Step 1 — the school's own rosters (read 2026-11-08)

`https://athletics.cannonschool.org/teams/team-details/~athletics-team-id/<id>` is a
Finalsite page that server-renders the roster (name + class year) — **no JS needed, curl
works**. The site is now Finalsite; the 2026-07-04 note that the news portal "renders
client-side" is still true of `/athletics-news` (it is an Instagram embed) but not of the
team pages. Team ids: football 199 · boys basketball 156 · girls basketball 153 · baseball
192 · boys soccer 151 · girls soccer 174 · volleyball 181 · swimming 164 · boys lacrosse 173
· girls lacrosse 197 · softball 167 · cross country 137 · wrestling 155 · track 165 · boys
golf 176 · girls golf 139 · boys tennis 168 · girls tennis 136 · cheer 236/227.

Rosters posted for 2026-27 as of 2026-11-08: football (44), boys soccer (26), girls
basketball (15), volleyball (15), swimming (21), cross country (21), girls tennis (9),
girls golf (8), fall cheer (15). **Winter and spring teams not yet in season show "No
players were found for this team"** (boys basketball, baseball, girls soccer, lacrosse,
softball, wrestling, track, boys golf, boys tennis). The school's roster is cleared between
seasons, so last season's seniors are **not** retrievable here; Wayback has no snapshot of
any team page (checked ids 174, 156, 192, 197 for spring 2026).

Class-of-2027 seniors on the posted rosters: football 11, girls basketball 7, volleyball 3,
boys soccer 6, swimming 7.

## Step 2 — MaxPreps rosters by season

`https://www.maxpreps.com/nc/concord/cannon-cougars/<sport>/<yy-yy>/roster/` (football under
`cannon-cannon-concord-academy-cougars`) returns HTTP 200 to curl with a browser UA and
server-renders the table (name, grade, position). The `?season=` query form silently
returns the current season — use the path form. Girls soccer returns 404 for every season.
Pulled: basketball 23-24, 24-25, 25-26, 26-27; football 25-26, 26-27; baseball 25-26; boys
soccer 25-26, 26-27; volleyball 25-26, 26-27; boys/girls lacrosse 25-26; softball 25-26;
girls basketball 25-26.

Seniors (class of 2026) found: football 22 (two files, overlapping), boys basketball 3,
girls basketball 1, baseball 5, boys soccer 11, volleyball 4, boys lacrosse 6, girls lacrosse
9, softball 1.

## Step 3 — cross-reference sources, what each gave

| Source | Reachable | What it yielded |
|---|---|---|
| RealGM school page (college column per player) | 403 to curl/WebFetch; **read in Chrome** | Swartz → Creighton (current), Baker → Western Carolina (current), Murash → Hamilton, Martin → Denison, Ingram → Davidson-Davie, Henry → Queens, Claggett → Cloud County; blanks for all 2026 seniors |
| On3 school page | 403 to curl; Chrome navigation not permitted | not used; its data reached via search snippets only (Hayes Galloway IOL 2024) |
| 247Sports player pages | WebFetch OK | Sales (Hard Commit Ohio), Swartz (Natl 66 / NC 6), Galloway (N/A) |
| 247Sports school "Institution" page | renders empty (JS) in Chrome | not used |
| NC Football News commitment trackers | 2026 and 2027 OK; 2024 and 2025 URLs 404 | Trojan, Ravin (2026, D3); Sales, K. Davis (2027) |
| College roster pages (goheels, clemsontigers, hamilton, denison, ecupirates, catamountsports, hscathletics, generalssports, region10sports, queensathletics) | all 200 to curl | the confirmations in the commitments file |
| SwimSwam / Swimming World | via search | Cooler → Villanova |
| PrepVolleyball school page | 200 | one commitment: Arianna Lopez (2025) → Tampa; none for 2026 or 2027 |
| TopDrawerSoccer team pages | 200 | girls: three profiles only (Cavitt '28 "Houston" unverified, Condon '26 none); no boys team page found |
| Prep Girls Hoops | 200 | Drayton "Coastal Carolina — Committed" |
| Charlotte Observer previews (via Yahoo) | 200 | swimming 2026-11-03 (Cooler), girls basketball 2026-11-05 (Drayton, Busby) |
| Cannon news (`cannonschool.org/news-and-stories`, `/cannon-school-news`) | 200 | no signing-day posts at all; the school announces commits on Instagram (@cannonathletics), which is not fetchable |
| Perfect Game / Prep Baseball Report | via search | no Cannon baseball commit for 2026 or 2027 |

## Nulls — searched 2026-11-08, nothing found
- Class of 2026 football seniors other than Trojan and Ravin (20 names, grouped OR-searches
  plus the 2026 tracker): none.
- Class of 2026 boys basketball (Brezeault, Sheir, Steinour; Dixon, King per RealGM): none.
- Class of 2026 girls basketball (1 senior), baseball (5), boys soccer (11), volleyball (4),
  boys lacrosse (6), girls lacrosse (9), softball (1): none.
- Class of 2027 girls basketball other than Busby and Drayton: Nakamura has an offer
  (Lees-McRae), not a commitment; four others none.
- Class of 2027 volleyball (Marion, McHugh, Waite), boys soccer (Bryan, Dally, Garrison,
  Palermo, Pegram, Storr): none.
- JaKaila Gaskin ('28): no commitment; ESPN No. 28 nationally per the Observer 2026-11-05
  (the card still cites Prep Girls Hoops No. 30 — not changed by this pass).
- Charlotte Observer signing-day roundups for Nov. 2023, Feb./Apr. 2024, Nov. 2025, Feb.
  2026: not found in search; the 2021 and 2024-25 roundups exist, so these may be unindexed
  rather than unpublished.

## Unchecked (not a null)
- Girls soccer and girls lacrosse Class of 2026: no roster retrievable (see Step 1–2).
- Instagram @cannonathletics signing posts.
- Lily Wittgraefe's sport at Hobart & William Smith.

## Leads ruled out
See *Excluded* in `Cannon - Sports - College Commitments 2024-2026.md` (Henry, Claggett,
Greer, Nakamura, Cavitt, Sean Nix).
