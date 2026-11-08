---
name: cannoncommits
title: Cannon — eight more 2024–26 college commitments (Swartz to Miami and Galloway to North Carolina among them) plus four Class of 2027 verbals, found by cross-referencing the varsity rosters; College Pipeline card and the two Compare commit rows
status: implemented
phases: 2
created: 2026-11-08
branch: feat/cannon-commits-2026
prs: [447]
---

# Cannon's College Pipeline, rebuilt from the varsity rosters

## Goal

Cannon's College Pipeline card lists six commitments for 2024–26 and says the classes of
2024 and 2026 are "almost certainly undercounted". They were. A roster-by-roster
cross-reference (every varsity roster on the school's site and on MaxPreps for 2023-24
through 2026-27, each senior checked against college rosters, 247Sports, RealGM, SwimSwam,
PrepVolleyball, Prep Girls Hoops and the NC Football News trackers) found **eight more
athletes in the window** — including two Power 4 signees the card never had, Austin Swartz
(Miami, 2024) and Hayes Galloway (North Carolina, 2024) — filled Ari Lopez's sport, and
recorded four Class of 2027 verbal commitments. This plan moves the card from 6 / 3 D1 /
1 P4 to **14 / 6 D1 / 3 P4**, grows the roster from 7 rows to 19, rewrites the five prose
fields that describe the floor, and moves the two Compare rows (`p4-commits-2426` 1 → 3,
`d1-commits-2426` 3 → 6). Done when the Cannon page and Compare show those figures, every
row traces to the committed source files, and `npm run build` is green in all ten locales.

## Context

### The source (read these first)

- `source-material/sports/cannon/Cannon - Sports - College Commitments 2024-2026.md` —
  **rebuilt, uncommitted.** The designated provenance file for both Compare rows and the
  card. Per-class tables with a *Confirmed by* column and URL for every athlete, the 2027
  appendix, and an *Excluded* list (Isaiah Henry, Jaylen Claggett, Hudson Greer, Hina
  Nakamura, Carsyn Cavitt, Sean Nix) with the reason each was ruled out.
- `source-material/sports/cannon/Cannon - Sports - Varsity Roster Cross-Reference 2026.md`
  — **new, uncommitted.** The method, which sources were reachable, and the nulls (what was
  searched and found empty). Needs a `metrics.ts` rule (step 2) or it slugifies into an
  orphan card.
- `source-material/sports/cannon/Cannon - Sports - Redesign Research 2026.md` — **one
  superseded note added above "## 4", uncommitted.**

### Verification status per new athlete (planning-time, 2026-11-08)

| Athlete | Class | College · conf · level | Confirmed by | Note |
|---|---|---|---|---|
| Austin Swartz | '24 | Miami · ACC · **P4** | ESPN "Signed Miami 09/05/2023"; HighSchoolOT; 247 (Natl 66 / NC 6); MaxPreps 2023-24 Sr. | transferred to Creighton Apr. 2025 |
| Hayes Galloway | '24 | North Carolina · ACC · **P4** | UNC roster bio (early enrollee Jan. 2024, five years at Cannon); Clemson bio | now a Clemson preferred walk-on; 247 N/A → no `rank247` |
| Max Murash | '24 | Hamilton · NESCAC · D3 | Hamilton roster (Cannon School) | — |
| Tyler Martin | '24 | Denison · NCAC · D3 | Denison roster (Cannon School) | — |
| Jake Baker | '25 | East Carolina · American · D1 | ECU 2025-26 roster (HS: Cannon); MaxPreps 2024-25 Sr. | transferred to Western Carolina for 2026-27 |
| Evan Ingram | '25 | Davidson-Davie CC · NJCAA · D3 tier | Region 10 stats page; RealGM; MaxPreps 2024-25 Sr. | junior college; Covenant Day precedent for the tier |
| Ari Lopez | '25 | Tampa · SSC · D2 (existing row) | PrepVolleyball (setter → Tampa); Tampa 2025 preview | **sport becomes `Volleyball`** |
| Michael Trojan | '26 | Hampden-Sydney · ODAC · D3 | H-SC 2026 roster (Cannon School); NCFN tracker | — |
| Brady Ravin | '26 | Washington & Lee · ODAC · D3 | W&L 2026 roster (Cannon School); NCFN tracker | — |
| Madison Drayton | '27 | Coastal Carolina · Sun Belt · D1 (verbal) | Observer 2026-11-05; Prep Girls Hoops "Committed" | not counted |
| Marcus Sales | '27 | Ohio · MAC · D1 (verbal) | 247 Hard Commit 6/7/2026; NCFN tracker | `rank247 { national: 1359, state: 44 }`; school prints "Marcus Sales" |
| Kingston Davis | '27 | Furman · Southern · D1 (verbal) | NCFN tracker 6/17/2026; his X bio | no 247 rank found → no `rank247` |
| Tripp Cooler | '27 | Villanova · Big East · D1 (verbal) | SwimSwam; Swimming World; Observer 2026-11-03 | school roster prints the legal name "Gary Cooler"; use Tripp |

### Where it lands (all existing fields; confirmed by reading the files)

- `src/data/sportsPrograms/cannon.ts` — the `pipeline` card (lines 215–268 today):
  `headline`, `subhead`, `funnel[]` counts and widths, `funnelNote`, `sportBars[]`,
  `realityCheck`, `rankedRecruits` (unchanged), `roster[]`, `rosterNote`, `sources[]`; plus
  the file-header comment (lines 1–7).
- `src/data/metricValues.ts` — `p4-commits-2426` (`cannon: '1'`, line ~2292) and
  `d1-commits-2426` (`cannon: '3'`, line ~2338): the value, its trailing comment, and the
  `quals.cannon.text` on each (the two texts are identical today and share one translation
  unit; keep them identical).
- `src/lib/metrics.ts` — the `sports` rules (line ~273): one new rule so the cross-reference
  file folds onto `redesign-research`. Precedent: the `/athletics recap/i` rule from
  `ddathletes`. The commitments file already matches `/college commitments/i` →
  `matriculation`; no change there.
- `src/data/sportsProgram.ts` — `CommitLevel = 'P4' | 'D1' | 'D2' | 'D3' | 'NAIA'`; `Commit`
  rows carry `cls`, `name`, `sport`, `college`, `conf`, `level`, optional `rank247`.
  **No type change.** No `JUCO` level exists; Covenant Day lists junior-college signees at
  `'D3'` with `conf: 'NJCAA'` and explains it in `rosterNote` — follow that.
- `src/components/SportsProgram.tsx` — renders every level with `LEVEL_TAG`, shows the 247
  columns when any row has `rank247`. **No component change.**
- Sports prose is not rendered from the ingested markdown (eight data-driven cards), so the
  source-file edits change no prose card.

### Conventions the new rows follow

- Class string `"'24"` / `"'25"` / `"'26"` / `"'27"`, as the existing rows.
- Sport labels reuse existing translation units: `'Boys Basketball'` (14 uses), `'Football'`
  (47), `'Girls Basketball'`, `'Volleyball'`, `'Swimming'`. Do not write "Basketball" or
  "Men's Basketball".
- Conference strings reuse existing ones: `'ACC'`, `'NESCAC'`, `'NCAC'`, `'American'` (the
  Latin/CCD spelling for the AAC, 5 uses, over `'AAC'`, 3), `'NJCAA'`, `'ODAC'`, `'Sun Belt'`,
  `'MAC'`, `'Southern'` (this file's ETSU row uses it; not `'SoCon'`), `'Big East'`.
- Within a class, rows run P4 → D1 → D2 → D3; classes run '26, '25, '24, then the '27
  verbals last (as Busby sits today).
- `sportBars[].width` is `count / max count`; `p4Width` on the same scale.
- Research bookkeeping stays dev-only: the page never says what was searched or could not
  be found. It may say what the school does or does not publish (existing card does).

### Why two phases

Five prose fields on the card and the shared Compare qual change in English. They are
research prose in the `sports` and `metric-values` overlay topics, so Phase 2 translates
them into the nine `PROSE_TRANSLATED` locales after the user has seen the English. The
twelve new roster rows add no prose: `name`, `college`, `conf`, `level`, `cls` are skipped
identifier fields; `roster[].sport` values attach to existing units; `sportBars[].sport` and
`sources[].label` are not extracted (confirmed against the `es` work file, which holds 16
`cannon:pipeline` units today).

## Decisions

- **Count every documented commitment, walk-on and junior college included** — the card
  measures documented commitments to college athletics at any level (the `ddathletes`
  standard). Galloway's UNC status (scholarship or walk-on) is unpublished; the page says
  "early enrollee", UNC's own words, and names his later Clemson walk-on move.
- **Graduate test** — an athlete counts only if they finished high school at Cannon. Isaiah
  Henry (senior year at Overtime Elite → Queens) and Jaylen Claggett (left after 2023-24 →
  Lander / Cloud County) are excluded and recorded in the source file.
- **The college shown is the one committed to out of Cannon** — Swartz shows Miami, not
  Creighton; Baker East Carolina, not Western Carolina; Galloway North Carolina, not Clemson.
  One `rosterNote` sentence lists the three moves (Covenant Day's Eaton precedent).
- **Class of 2027 verbals go on the roster, not in the counts** — Busby already sits there
  on exactly that rule. Funnel, sport bars and Compare stay 2024–26 and signed.
- **Ingram at the D3 tier with `conf: 'NJCAA'`** — the Covenant Day convention; the
  `rosterNote` carries the same explanation. No new `CommitLevel`.
- **Names follow the school's roster** — `'Marcus Sales'` (not "Jr."), `'Michael Trojan'`,
  `'Jake Baker'`. One exception: `'Tripp Cooler'`, because the school's roster prints the
  legal name "Gary Cooler" while the school's own preview to the Observer and every
  published source print Tripp.
- **`rank247` only where 247 publishes a Composite rank** — Swartz (66 / 6) and Sales
  (1359 / 44). Galloway, Baker and Davis show none → field omitted, never a placeholder.
- **Wittgraefe stays `'Not published'`** — no HWS roster names her sport; the hedge is
  honest.
- **`rankedRecruits` unchanged** — the Observer now quotes ESPN No. 28 for Gaskin against
  the card's Prep Girls Hoops No. 30; both are citations to different services, and
  refreshing the recruiting-ranking prose is a different plan.
- **Plan name `cannoncommits`** — derived from the task because the branch was `main`.

## Approvals needed

**None.** Every change fills fields on a card and two Compare rows that already exist. No
new card, tile, row, metric key or component.

## Source material

Written during planning, **uncommitted**, all in `source-material/sports/cannon/`:

| File | State | Role |
|---|---|---|
| `Cannon - Sports - College Commitments 2024-2026.md` | rebuilt | provenance for both Compare rows and the card; already folds onto `matriculation` |
| `Cannon - Sports - Varsity Roster Cross-Reference 2026.md` | new | method and nulls; needs the `metrics.ts` rule (step 2) |
| `Cannon - Sports - Redesign Research 2026.md` | one note added | points its stale §3 at the two files above |

`/implement` ingests them first (step 3). No PDF is involved.

## Out of scope

- Refreshing `rankedRecruits` (Gaskin's ESPN ranking, Sean Nix's departure to Gillion
  Academy) or any other Sports card.
- Girls soccer and girls lacrosse Class of 2026 — no roster could be retrieved; recorded as
  unchecked, to revisit when the spring rosters post.
- Re-checking the four Class of 2027 verbals once they sign (early period opens 2026-11-11;
  football in December) — a later pass moves them into the counts and the Compare rows.
- Other schools' rosters.
- Deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/cannon-commits-2026` from a freshly pulled `main`. `git status --short`
   must show only the three source-material paths above.

2. **Fold the new source file onto the research dossier** — `src/lib/metrics.ts`, `sports`
   rules, directly after the `/athletics recap/i` line (~273):
   ```ts
   // "… - Sports - Varsity Roster Cross-Reference <year>" records how a school's
   // pipeline roster was rebuilt from its varsity rosters and what was found empty.
   // Provenance for the pipeline card, not a card of its own.
   { match: /roster cross-reference/i, key: 'redesign-research', label: 'Sports Research Dossier (2026)' },
   ```

3. **Ingest** — run the `ingest-source-material` skill for `sports` / `cannon`. It
   regenerates `.claude/docs/sports/cannon.md` and `src/data/schools.json`. Then:
   - `git diff --stat src/data/schools.json` — only Cannon sports entries should move; if
     the manifest reorders wholesale, restore `HEAD`'s order (memory
     `two-topic-ingest-reorders-manifest`).
   - `npm run check:metrics` — exit 0, no "unmatched subtopic" for
     `varsity-roster-cross-reference-2026`.
   - `npm run schema && npm run check:schema` — commit `DATA-SCHEMA.md` only if it changed.

4. **Edit the pipeline card** in `src/data/sportsPrograms/cannon.ts`:

   a. Header comment (lines 3–4): add that the pipeline card and the two Compare rows trace
      to `Cannon - Sports - College Commitments 2024-2026.md`.

   b. `headline` →
      `'Fourteen documented college commitments across 2024–26, six of them Division I and three Power 4 — still a floor, because Cannon publishes no consolidated signing list.'`

   c. `subhead` →
      `'Basketball leads the way: a Miami signee in 2024, Division III placements at Hamilton and Denison, and East Carolina in 2025 alongside Notre Dame swimming. Five current seniors already hold public Division I commitments — Princeton, Coastal Carolina, Ohio, Furman and Villanova.'`

   d. `funnel[]`: counts `'14'`, `'6'`, `'3'`; widths `1`, `0.43`, `0.21`. Keep labels,
      hints, shades and `toVerify: true` on the first stage (the window is still a floor).

   e. `funnelNote` →
      `'Treat every figure on this card as a floor. Unlike its CISAA peers, Cannon publishes no "alumni at the next level" roster, so these names come from college rosters and recruiting services rather than from the school. Collegiate athlete is the standard here, not scholarship athlete: Hayes Galloway joined North Carolina as an early enrollee and later Clemson as a preferred walk-on, and Division III programs award no athletic scholarships.'`

   f. `sportBars` →
      ```ts
      { sport: 'Boys Basketball', count: 5, width: 1, p4Width: 0.2 },
      { sport: 'Football', count: 3, width: 0.6, p4Width: 0.2 },
      { sport: 'Girls Basketball', count: 2, width: 0.4 },
      { sport: 'Volleyball', count: 2, width: 0.4 },
      { sport: 'Swimming', count: 1, width: 0.2, p4Width: 0.2 },
      ```
      (13 of the 14; Wittgraefe's sport is unpublished and is left off the bars — said in
      `rosterNote`.)

   g. `realityCheck` →
      `'The by-sport split is still too thin to read as a pattern, but the Power 4 commits are now three and none of them is the obvious one: a swimmer to Notre Dame, an offensive lineman to North Carolina and a single basketball player to Miami, while the flagship basketball program’s other placements in this window are East Carolina, two Division III colleges and a junior college. Title-winning programs and recruiting pipelines are not the same thing.'`

   h. `rankedRecruits` — unchanged.

   i. `roster[]` — replace the whole array with these 19 rows, in this order. Existing rows
      are kept verbatim except Lopez's `sport`:
      ```ts
      // Class of 2026
      { cls: "'26", name: 'Michael Trojan', sport: 'Football', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Brady Ravin', sport: 'Football', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      // Class of 2025
      { cls: "'25", name: 'John Kroll', sport: 'Swimming', college: 'Notre Dame', conf: 'ACC', level: 'P4' },
      { cls: "'25", name: 'Maya McCorkle', sport: 'Girls Basketball', college: 'East Tennessee State', conf: 'Southern', level: 'D1' },
      { cls: "'25", name: 'Maria Nix', sport: 'Volleyball', college: 'Butler', conf: 'Big East', level: 'D1' },
      { cls: "'25", name: 'Jake Baker', sport: 'Boys Basketball', college: 'East Carolina', conf: 'American', level: 'D1' },
      { cls: "'25", name: 'Khloe Thompson', sport: 'Girls Basketball', college: 'Winston-Salem State', conf: 'CIAA', level: 'D2' },
      { cls: "'25", name: 'Ari Lopez', sport: 'Volleyball', college: 'Tampa', conf: 'SSC', level: 'D2' },
      { cls: "'25", name: 'Lily Wittgraefe', sport: 'Not published', college: 'Hobart & William Smith', conf: 'Liberty', level: 'D3' },
      { cls: "'25", name: 'Evan Ingram', sport: 'Boys Basketball', college: 'Davidson-Davie CC', conf: 'NJCAA', level: 'D3' },
      // Class of 2024
      { cls: "'24", name: 'Austin Swartz', sport: 'Boys Basketball', college: 'Miami', conf: 'ACC', level: 'P4',
        rank247: { national: 66, state: 6, url: 'https://247sports.com/player/austin-swartz-46133263/' } },
      { cls: "'24", name: 'Hayes Galloway', sport: 'Football', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Max Murash', sport: 'Boys Basketball', college: 'Hamilton', conf: 'NESCAC', level: 'D3' },
      { cls: "'24", name: 'Tyler Martin', sport: 'Boys Basketball', college: 'Denison', conf: 'NCAC', level: 'D3' },
      // Class of 2027 — public verbal commitments, not yet signed; not in the funnel or Compare
      { cls: "'27", name: 'Brooke Busby', sport: 'Girls Basketball', college: 'Princeton', conf: 'Ivy', level: 'D1' },
      { cls: "'27", name: 'Madison Drayton', sport: 'Girls Basketball', college: 'Coastal Carolina', conf: 'Sun Belt', level: 'D1' },
      { cls: "'27", name: 'Marcus Sales', sport: 'Football', college: 'Ohio', conf: 'MAC', level: 'D1',
        rank247: { national: 1359, state: 44, url: 'https://247sports.com/player/marcus-sales-jr-46150750/' } },
      { cls: "'27", name: 'Kingston Davis', sport: 'Football', college: 'Furman', conf: 'Southern', level: 'D1' },
      { cls: "'27", name: 'Tripp Cooler', sport: 'Swimming', college: 'Villanova', conf: 'Big East', level: 'D1' },
      ```
      **Before typing Swartz's `rank247`, open the 247 URL in a browser and read the
      Composite national and NC ranks** — the planning read gave 66 / 6 from the page's
      2024 rankings block, while HighSchoolOT quoted No. 44 in Sept. 2023. Type what the live
      page shows; if it shows N/A, omit the field.

   j. `rosterNote` →
      `'The Class of 2027 rows are public verbal commitments and are listed because they are already announced; they are not counted in the funnel, the sport bars or on the Compare page until those athletes sign. Evan Ingram’s junior college is listed at the D3 tier for want of an NJCAA level in this table’s scale, and Lily Wittgraefe’s sport is not published, so her row is marked as such and left off the sport bars rather than guessed. Three athletes have since moved — Austin Swartz from Miami to Creighton, Hayes Galloway from North Carolina to Clemson as a preferred walk-on, and Jake Baker from East Carolina to Western Carolina — and the roster shows the college each committed to out of Cannon.'`

   k. `sources[]` — keep the existing three and add:
      ```ts
      { label: 'ESPN recruiting — Austin Swartz (Cannon School, Class of 2024, signed Miami)', url: 'https://www.espn.com/college-sports/basketball/recruiting/player/_/id/255025/austin-swartz' },
      { label: 'HighSchoolOT — Cannon School guard Austin Swartz commits to Miami', url: 'https://www.highschoolot.com/story/cannon-school-guard-austin-swartz-commits-to-miami/21035500/' },
      { label: 'North Carolina — Hayes Galloway roster bio', url: 'https://goheels.com/sports/football/roster/hayes-galloway/25647' },
      { label: 'Hamilton College — Max Murash, men’s basketball', url: 'https://athletics.hamilton.edu/sports/mens-basketball/roster/max-murash/8033' },
      { label: 'Denison — men’s basketball roster (Tyler Martin)', url: 'https://denisonbigred.com/sports/mens-basketball/roster' },
      { label: 'East Carolina — Jake Baker, 2025–26 men’s basketball roster', url: 'https://ecupirates.com/sports/mens-basketball/roster/jake-baker/13882' },
      { label: 'Region 10 (NJCAA) — Evan Ingram, Davidson-Davie CC 2025–26', url: 'https://region10sports.com/sports/mbkb/2025-26/players/evaningram9qi6' },
      { label: 'PrepVolleyball — Cannon School commitments (Arianna Lopez, Tampa)', url: 'https://prepvolleyball.com/high-school-volleyball-details/women/cannon-school/hsid-14150' },
      { label: 'Hampden-Sydney — 2026 football roster (Michael Trojan)', url: 'https://hscathletics.com/sports/football/roster/2026' },
      { label: 'Washington & Lee — 2026 football roster (Brady Ravin)', url: 'https://generalssports.com/sports/football/roster/2026' },
      { label: 'NC Football News — 2027 North Carolina commitment tracker (Sales, Davis)', url: 'https://ncfootballnews.com/2027-north-carolina-high-school-football-college-commits/' },
      { label: '247Sports — Marcus Sales Jr.', url: 'https://247sports.com/player/marcus-sales-jr-46150750/' },
      { label: 'SwimSwam — Tripp Cooler sends verbal to Villanova for fall 2027', url: 'https://swimswam.com/junior-nationals-qualifier-tripp-cooler-sends-verbal-to-villanova-for-fall-2027/' },
      { label: 'Charlotte Observer via Yahoo — 2026–27 Charlotte-area girls basketball preview (Drayton, Busby)', url: 'https://sports.yahoo.com/articles/everything-know-charlotte-area-girls-100000255.html' },
      { label: 'Prep Girls Hoops — Madison Drayton', url: 'https://prepgirlshoops.com/player/madison-drayton/' },
      ```
      (`sources[].label` is not extracted for translation — confirmed against the `es` work
      file — so these add no Phase 2 units.)

5. **Compare rows** in `src/data/metricValues.ts`:
   - `p4-commits-2426` → `cannon: '3', // ’24 Swartz (Miami), Galloway (North Carolina) · ’25 Kroll (Notre Dame)`
   - `d1-commits-2426` → `cannon: '6', // ’24: Swartz, Galloway · ’25: Kroll, McCorkle, Nix, Baker (2026 class: two D3 only; ’27 verbals not counted)`
   - Both `quals.cannon.text` (identical, one shared unit) →
     `'A documented minimum: Cannon publishes no signing list, so these athletes were confirmed on college rosters and recruiting services. Several of Cannon’s best-known athletes committed outside the 2024–26 window and so are not counted here.'`

6. **Checks and browser** — see Verification, Phase 1. Then commit with explicit paths
   (the three source-material files, `src/lib/metrics.ts`,
   `src/data/sportsPrograms/cannon.ts`, `src/data/metricValues.ts`,
   `src/data/schools.json`, `.claude/docs/sports/cannon.md`, and `DATA-SCHEMA.md` only if
   changed), push, verify `git rev-parse HEAD` against `git ls-remote origin
   feat/cannon-commits-2026`. Flip the INDEX row to *English shipped*. (Per `/implement`'s
   own rule the PR waits for Phase 2; both phases land in one PR, as `ddathletes` did.)

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar) on two
overlay topics: `sports` and `metric-values`. **No chrome catalogs.** Mechanism:
`.claude/docs/prose-translation-architecture.md`; proven recipe: `ddathletes`'s Phase 2 and
memory `ddathletes-shipped` / `ddprofile-shipped`.

Expected units per locale: **6** — sports 5 (`cannon:pipeline.headline`, `.subhead`,
`.funnelNote`, `.realityCheck`, `.rosterNote`) and metric-values 1 (the shared qual at
`[N].quals.cannon.text` on both rows; match by text, not index). The twelve new roster rows
add `at` paths to the existing `Boys Basketball`, `Football`, `Girls Basketball`,
`Volleyball` and `Swimming` units; the `Not published` unit loses Lopez's path. Roster
indexes shift (`roster[0]` is now Trojan), so the splice must match by stamp/text, never by
path. If the splice reports a seventh new unit, stop and find out why before writing.

1. **Splice by stamp:** `node scripts/i18n_splice_work.mjs --lang <code> --topic sports` and
   `--topic metric-values`, dry-run `es` first and explain the added/dropped counts.
2. **Translate the six units by hand per locale**, reusing each locale's existing terms for
   "documented floor", "Division I", "Power 4", "preferred walk-on" (es/fr already render
   the Davidson Day walk-on sentence — reuse), "junior college", "early enrollee".
   - Figures copied char-for-char: `14`, `6`, `3`, `2024–26`, `2024`, `2025`, `2027`. The
     number words "Fourteen / six / three / Five / three" translate as words.
   - Keep Latin: Miami, Hamilton, Denison, East Carolina, Notre Dame, Princeton, Coastal
     Carolina, Ohio, Furman, Villanova, North Carolina, Clemson, Creighton, Western Carolina,
     CISAA, NJCAA, NCAA, D3 / Division III, Power 4.
   - `fa`/`ar`: `2024–26` is bidi-neutral and isolated at render; never add isolates to the
     work file.
   - `hi`/`te`: no figure ≥ 1,000 appears in prose (the 1359 rank is a roster number, not
     extracted).
3. **Rebuild:** `npm run i18n:build -- --topic sports --lang <code>` and the same for
   `metric-values`, every locale.
4. Run the Phase 2 checks, commit with explicit paths, push and verify the SHA, open the PR
   with `--body-file`, squash-merge, `git checkout main && git pull`, flip the plan and INDEX
   row to *Implemented* with the PR link. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/sports/cannon/Cannon - Sports - College Commitments 2024-2026.md` | rebuilt (planning) |
| `source-material/sports/cannon/Cannon - Sports - Varsity Roster Cross-Reference 2026.md` | new (planning) |
| `source-material/sports/cannon/Cannon - Sports - Redesign Research 2026.md` | superseded note (planning) |
| `src/lib/metrics.ts` | one `sports` rule: `/roster cross-reference/i` → `redesign-research` |
| `src/data/schools.json`, `.claude/docs/sports/cannon.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/cannon.ts` | pipeline card: 12 new roster rows + 1 sport fill, funnel, bars, 5 prose fields, 15 sources, header |
| `src/data/metricValues.ts` | two values, two comments, one shared qual text |
| `src/data/overlays/work/{sports,metric-values}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean (memory: trust `tsc -b`, not `--noEmit`).
- [ ] `npm run check:metrics` — exit 0; no orphan `varsity-roster-cross-reference-2026`
      subtopic.
- [ ] `npm run check:schema` — clean (regenerate with `npm run schema` if it fails and commit
      the doc).
- [ ] `npm run check:quals` and `npm run check:live` — clean (`check:live` cannot see a unit
      that is brand new; it passes by construction here, so do not read it as proof).
- [ ] `npm run build` — exit 0.
- [ ] Browser, `npm run dev`, `/school/cannon`, Sports → The College Pipeline, card open:
      funnel reads 14 / 6 / 3; five sport bars with Boys Basketball widest and a P4 overlay
      at 20% on Boys Basketball, Football and Swimming; roster shows 19 rows — `P4` on
      Swartz, Galloway and Kroll, `D1` on nine rows, `D2` on Thompson and Lopez, `D3` on
      Murash, Martin, Wittgraefe, Ingram, Trojan and Ravin; the D1 tab shows 12 rows (nine
      D1 + three P4, the '27 verbals among them), the P4 tab 3; the 247 columns render for
      Swartz and Sales only; all 18 source links open.
- [ ] Browser, `/compare?schools=cannon,davidson-day`, Sports section: Cannon reads **3** on
      Power 4 commits and **6** on Division I commits, each with its qual tooltip; the leader
      tint is unchanged (Providence Day 17 / 39 still leads).
- [ ] The roster at 320px still scrolls inside the card, not the page — eyeball once with
      every card open (`npm run audit:mobile` is not required; no layout change).

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live` — all nine locales resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9 — 0 drifted;
      `python3 scripts/check_figures.py --lang <code> --topic sports` and `--topic
      metric-values` ×9.
- [ ] `npm run check:digits` — scoped to this branch's new stamps; 0 findings expected.
- [ ] `npm run check:dates`, `check:moneytext`, `check:bidi`, `check:fa`, `check:hi`,
      `check:fr` — clean.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, filtered to the six `at` paths — 0.
- [ ] `npm run build` — exit 0.
- [ ] Browser: `/school/cannon?lang=es` and `?lang=fa`, pipeline card open: the five
      sentences render translated; `14`, `6`, `3`, `2024–26` intact and reading
      left-to-right in `fa`; names, colleges and conferences stay Latin.
      `/compare?schools=cannon&lang=es` Sports rows: the Cannon qual tooltip renders in
      Spanish.

## Risks

| Risk | Mitigation |
|---|---|
| Swartz's 247 Composite rank differs from the planning read (66 / 6) | Step 4i says to read the live page first and type what it shows; the source file records both figures seen |
| A Class of 2027 verbal decommits before signing | Rows are labelled verbal in `rosterNote` and excluded from every count; a later pass edits one row |
| Galloway was a scholarship player at UNC, not a walk-on | The page never says which; "early enrollee" is UNC's own wording and the walk-on label is attached only to his Clemson move, which Clemson states |
| The new source filename slugifies into an orphan prose card | Step 2's rule; `check:metrics` gates it |
| A new `sport` or `conf` string creates a per-locale unit by accident | Labels chosen from existing units (Context); the Phase 2 splice dry-run must report 6 units, not 7 |
| Ingest reorders `schools.json` wholesale | Restore `HEAD` order before committing (memory) |
| Another session's untracked files swept into the commit | Stage explicit paths; `git status --short` before each commit |

## Open questions

- **Should all five Class of 2027 verbals appear, or only Busby as today?** Owner: user, at
  the Phase 1 review. **Default:** all five — Busby's row already set the rule that a public
  commitment is listed, and hiding four of them while showing one would be arbitrary.
- **Should Evan Ingram (junior college) be on the roster at all?** **Default:** yes, at the
  D3 tier with the Covenant Day wording; the card counts every documented commitment to
  college athletics.
- **Should Hayes Galloway count as a Power 4 commit when he may have been a walk-on at
  UNC?** **Default:** yes — the card counts documented commitments, and Davidson Day's Nick
  Arnold (Duke walk-on) already counts on exactly that rule.

## Implementation notes

Both phases shipped in PR #447 as planned; no step deviated. Two observations for the
next pipeline refresh:

- The splice reported exactly the predicted 5 + 1 units per locale, so the labels chosen
  from existing units (`Boys Basketball`, `American`, `Southern`, `NJCAA`) created no stray
  translation unit. The dropped units were the five old prose fields and the old qual.
- The old `es` and `fr` realityCheck called John Kroll "una nadadora" / "une nageuse"; the
  new rendering is masculine. The old `es` headline also wrote `2024–26` as "entre 2024 y
  2026", a re-typing `check:digits` would flag today; the new units keep the range verbatim.
