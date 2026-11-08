# Cannon School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Research record written by Claude Code on 2026-11-08 during `/plan
> cannoncommits` (pass 1, six target sports) and extended the same day for `cannoncommits2`
> (pass 2, every other varsity sport). It documents *how* the College Pipeline roster was
> rebuilt and *what was checked and found empty*, so a later pass does not redo the same
> work. The athlete-level results live in `Cannon - Sports - College Commitments
> 2024-2026.md`; this file is the method and the nulls. It is provenance for the pipeline
> card, not a card of its own (`src/lib/metrics.ts` folds it onto the research dossier).
>
> **Names policy:** only athletes with a documented college commitment, and the leads ruled
> out, are named here. Current students without a commitment are recorded as counts.

## Scope

**Pass 1** took the six highest-profile recruiting sports — football, boys basketball, girls
basketball, baseball, soccer (both) and volleyball — plus swimming, and gave every other
sport one grouped search. It found eight athletes.

**Pass 2** covered the rest: boys and girls lacrosse, girls soccer (which pass 1 could not
retrieve), boys and girls tennis, cross country, golf and wrestling, plus a statewide
tracker sweep over every sport. It found nine more, eight of them in lacrosse. That is why
the `/athlete-commits` skill now covers every varsity sport the school fields.

## Step 1 — the school's own rosters (read 2026-11-08)

`https://athletics.cannonschool.org/teams/team-details/~athletics-team-id/<id>` is a
Finalsite page that server-renders the roster (name + class year) — **no JS needed, curl
works**. The `/athletics-news` page is an Instagram embed with no article text. Team ids:
football 199 · boys basketball 156 · girls basketball 153 · baseball 192 · boys soccer 151 ·
girls soccer 174 · volleyball 181 · swimming 164 · boys lacrosse 173 · girls lacrosse 197 ·
softball 167 · cross country 137 · wrestling 155 · track 165 · boys golf 176 · girls golf 139
· boys tennis 168 · girls tennis 136 · cheer 236/227.

Rosters posted for 2026-27 as of 2026-11-08: football (44), boys soccer (26), girls
basketball (15), volleyball (15), swimming (21), cross country (21), girls tennis (9),
girls golf (8), fall cheer (15). **Winter and spring teams not yet in season show "No
players were found for this team"**, and the roster is cleared between seasons, so last
season's seniors are **not** retrievable here; Wayback has no snapshot of any team page.

## Step 2 — MaxPreps rosters by season

`https://www.maxpreps.com/nc/concord/cannon-cougars/<sport>/<yy-yy>/roster/` (football under
`cannon-cannon-concord-academy-cougars`) returns HTTP 200 to curl with a browser UA and
server-renders the table. The `?season=` query form silently returns the current season —
use the **path form**. Sport slugs that are not obvious: girls soccer `soccer/girls/spring`,
girls tennis `tennis/girls/fall`, girls golf `golf/girls/fall`, cross country
`cross-country`. `track-and-field` and `swimming` 404 in every season; golf and wrestling
pages exist with empty tables.

Pulled: basketball 23-24, 24-25, 25-26, 26-27; girls basketball 25-26; football 25-26,
26-27; baseball 25-26; boys soccer 25-26, 26-27; girls soccer 23-24, 24-25, 25-26;
volleyball 25-26, 26-27; boys lacrosse 23-24, 24-25 (empty), 25-26; girls lacrosse 23-24,
24-25, 25-26; softball 25-26; boys tennis 24-25, 25-26; girls tennis 24-25, 25-26; cross
country 24-25 (empty), 25-26.

Seniors found by class: **2024** — boys lacrosse 9, girls lacrosse 2, girls soccer 4,
boys basketball 4 (via 23-24); **2025** — boys lacrosse 0 (roster empty), girls lacrosse 4,
girls soccer 5, boys tennis 2, girls tennis 4, boys basketball 3; **2026** — football 22
(two files), boys basketball 3, girls basketball 1, baseball 5, boys soccer 11, volleyball
4, boys lacrosse 5, girls lacrosse 9, girls soccer 7, boys tennis 4, girls tennis 7, cross
country 3, softball 1.

## Step 3 — cross-reference sources, what each gave

| Source | Reachable | What it yielded |
|---|---|---|
| **HighSchoolOT recruiting trackers** (17, one per sport; hub `/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/`) | curl, all 17 | Cannon hits in boys lacrosse (6), volleyball (3), girls basketball (2), boys basketball (1), boys tennis (1), girls lacrosse (1); none in baseball, softball, soccer, swimming, girls tennis, golf, wrestling. Found Morrow (Elon) and Wittgraefe's sport; the tennis and girls-lacrosse hits did not confirm |
| RealGM school page (college column per basketball player) | 403 to curl/WebFetch; **read in Chrome** | Swartz, Baker, Murash, Martin, Ingram, Henry, Claggett; blanks for all 2026 seniors |
| **LaxNumbers** team recruits page (`team_info.php?y=<yr>&t=12767&s=2`) | Cloudflare to curl; **read in Chrome** | 2024: Wilson, Frood, Maynor, W. Swartz, Falasca, Gibbons, Cassidy; 2025: Murphy; 2026: Q. Frood (fails graduate test); 2027 verbals: Higbea, Underwood, Bracksieck (unconfirmed) |
| On3 school page | 403 to curl; Chrome navigation not permitted | not used |
| SwimCloud team page | Cloudflare to curl; Chrome navigation not permitted | not used |
| 247Sports player pages | WebFetch OK | Sales (Hard Commit Ohio), A. Swartz (Natl 66 / NC 6), Galloway (N/A) |
| NC Football News commitment trackers | 2026 and 2027 OK; 2024 and 2025 URLs 404 | Trojan, Ravin (2026, D3); Sales, K. Davis (2027) |
| College roster pages (goheels, brownbears, bluehens, highpointpanthers, redstormsports, mitathletics, depauwtigers, skidmoreathletics, elonphoenix, hwsathletics, ecupirates, cofcsports, dartmouthsports, clemsontigers, hamilton, denison, catamountsports, hscathletics, generalssports, region10sports, queensathletics) | all 200 to curl | the confirmations and the three negatives (Barnhardt, Szilagyi, Q. Frood's last school) |
| Charlotte Observer via Yahoo | 200 | All-Observer lacrosse 2024-06-14 (Wilson, Frood, Falasca, W. Swartz commits); swimming preview 2026-11-03 (Cooler); girls basketball preview 2026-11-05 (Drayton, Busby) |
| SwimSwam / Swimming World | via search | Cooler → Villanova |
| PrepVolleyball school page | 200 | Arianna Lopez (2025) → Tampa only |
| TopDrawerSoccer team page | 200 | three profiles only (Cavitt '28 "Houston" unverified; Condon '26 none) |
| Prep Girls Hoops | 200 | Drayton "Coastal Carolina — Committed" |
| TennisRecruiting.net | via search | Szilagyi listed as "interest" in College of Charleston, no commitment |
| MileSplit NC, Junior Golf Scoreboard, Perfect Game / PBR | via search | no Cannon commit |
| Cannon news pages | 200 | no signing-day posts; the school announces commits on Instagram (@cannonathletics), not fetchable |

## Nulls — searched 2026-11-08, nothing found
- Class of 2026 football seniors other than Trojan and Ravin (20 names): none.
- Class of 2026 boys basketball (Brezeault, Sheir, Steinour; Dixon, King per RealGM): none.
- Class of 2026 girls basketball (1), baseball (5), boys soccer (11), volleyball (4), boys
  lacrosse (5), girls lacrosse (9 — Barnhardt unverified), girls soccer (7), boys tennis (4),
  girls tennis (7), cross country (3), softball (1): none confirmed.
- Class of 2025 girls lacrosse (4), girls soccer (5), boys tennis (2), girls tennis (4): none.
- Class of 2024 girls lacrosse (2), girls soccer (4), boys lacrosse other than the seven
  (Nelson, Jones, Carvallo): none.
- Class of 2027 girls basketball other than Busby and Drayton: Nakamura has an offer
  (Lees-McRae), not a commitment; four others none. Class of 2027 volleyball (3), boys soccer
  (6): none.
- JaKaila Gaskin ('28): no commitment; ESPN No. 28 nationally per the Observer 2026-11-05
  (the card still cites Prep Girls Hoops No. 30 — not changed by this pass).
- Charlotte Observer signing-day roundups for Nov. 2023, Feb./Apr. 2024, Nov. 2025, Feb.
  2026: not found in search.

## Unchecked (not a null)
- Track and field and swimming graduates 2024–25 beyond Kroll: no MaxPreps roster exists and
  SwimCloud is unreachable; swimming was covered by SwimSwam/Swimming World search only.
- Golf and wrestling: MaxPreps tables empty every season; HSOT trackers have no Cannon entry.
- Boys lacrosse Class of 2025 seniors other than Murphy: the 2024-25 MaxPreps roster is
  empty, so the class was covered by LaxNumbers and HSOT only.
- Instagram @cannonathletics signing posts.

## Leads ruled out
See *Excluded* in `Cannon - Sports - College Commitments 2024-2026.md` (Henry, Claggett,
Greer, Nakamura, Cavitt, Sean Nix, Q. Frood, Barnhardt, Szilagyi, the three 2027 lacrosse
verbals, and the two misattributed All-Observer commits).
