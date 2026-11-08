---
name: cannoncommits2
title: Cannon — the second roster pass (every other varsity sport) adds nine more 2024–26 commitments, eight of them lacrosse, including a third Power 4 (Brevin Wilson, North Carolina) and Kierra Morrow (Elon); fills Lily Wittgraefe's sport; College Pipeline card 14 / 6 / 3 → 23 / 12 / 4 and Compare P4 4, D1 12
status: english-done
phases: 2
created: 2026-11-08
branch: feat/cannon-commits-2026-b
prs: []
---

# Cannon's College Pipeline, second pass: every varsity sport

## Goal

`cannoncommits` (PR #447) rebuilt the card from six target sports and shipped 14 commitments
/ 6 D1 / 3 P4. The same day, a pass over the sports it had skipped — lacrosse, girls
basketball's 2024 class, tennis, girls soccer, cross country, golf, wrestling — plus a sweep of
the 17 HighSchoolOT per-sport recruiting trackers found **nine more athletes in the window**,
eight of them from the three-time state champion boys lacrosse program, and the sport behind
the one remaining "Not published" row. This plan moves the card to **23 / 12 D1 / 4 P4**,
grows the roster from 19 rows to 28, rewrites four prose fields, and moves the two Compare
rows (`p4-commits-2426` 3 → 4, `d1-commits-2426` 6 → 12). Done when the Cannon page and
Compare show those figures, every row traces to the committed source files, and `npm run
build` is green in all ten locales.

## Context

### The source (read these first)

- `source-material/sports/cannon/Cannon - Sports - College Commitments 2024-2026.md` —
  **extended, uncommitted.** Provenance header notes the second pass; Sources list gains the
  HighSchoolOT trackers, LaxNumbers, the Observer's 2024 All-Observer lacrosse article and
  eleven college roster pages; Class of 2024 table now 12 rows, Class of 2025 9 rows;
  totals 23 / 12 / 4; *Excluded* gains Quinn Frood (graduate test), London Barnhardt and Isaac
  Szilagyi (unverified) and three 2027 lacrosse leads.
- `source-material/sports/cannon/Cannon - Sports - Varsity Roster Cross-Reference 2026.md` —
  **rewritten, uncommitted.** Both passes' method, the 17-tracker sweep, the nulls and the
  unchecked gaps. Already folds onto `redesign-research` via the `/roster cross-reference/i`
  rule that #447 added — **no `metrics.ts` change this time.**
- `source-material/sports/cannon/Cannon - Sports - Redesign Research 2026.md` — the
  superseded note above "## 4" now carries the second pass, **uncommitted.**

### Verification status per new athlete (planning-time, 2026-11-08)

| Athlete | Class | College · conf · level | Confirmed by | Note |
|---|---|---|---|---|
| Brevin Wilson | '24 | North Carolina · ACC · **P4** | UNC roster (Concord, N.C.; Cannon School); Observer 2024-06-14 player of the year; HSOT; LaxNumbers; MaxPreps 23-24 Sr. | LaxNumbers spells "Brevan"; use Brevin (school, UNC) |
| Cole Frood | '24 | Brown · Ivy · D1 | Brown roster + Class of 2028 release; Observer; HSOT; LaxNumbers; MaxPreps Sr. | — |
| Ben Maynor | '24 | Delaware · CAA · D1 | Delaware roster + newcomers release ("lettered all four years at Cannon"); HSOT; LaxNumbers; MaxPreps Sr. | — |
| Will Swartz | '24 | High Point · Big South · D1 | High Point roster (Cannon School); Observer; HSOT; LaxNumbers ("William"); MaxPreps Sr. | not related to Austin per any source; two Swartz rows is correct |
| Quinn Falasca | '24 | St. John's · Big East · D1 | St. John's roster (Cornelius, N.C. / Cannon School); Observer ("Cannon School, senior"); HSOT; LaxNumbers | not on the MaxPreps roster |
| Kierra Morrow | '24 | Elon · CAA · D1 | Elon 2026-27 roster (Jr.; Cannon School; 2024 state champion at Cannon); HSOT girls tracker ("Morow", Class of 2024) | Elon's spelling; school roster for her class is not retrievable |
| Liam Gibbons | '24 | MIT · NEWMAC · D3 | MIT roster (Concord, N.C. / Cannon School; three-time state champion); LaxNumbers | not on the MaxPreps roster |
| Carter Cassidy | '24 | DePauw · NCAC · D3 | DePauw roster (Davidson, N.C. / Cannon School); LaxNumbers; MaxPreps Sr. | — |
| JT Murphy | '25 | Skidmore · Liberty · D3 | Skidmore roster (Concord, NC / Cannon); HSOT (Class of 2025); LaxNumbers; SportsRecruits | MaxPreps 23-24 "Joseph (JT) Murphy, Jr." |
| Lily Wittgraefe | '25 | Hobart & William Smith · Liberty · D3 (existing row) | William Smith volleyball 2025 + 2026 rosters (Cannon School); HSOT volleyball tracker | **sport becomes `Volleyball`** |

Ruled out this pass (in the source file, not on the card): Quinn Frood ('26, Dartmouth) —
Dartmouth lists his last school as Greenwich Country Day and he is absent from Cannon's
spring 2026 roster; London Barnhardt ('26, East Carolina) — two reader-submitted sources, not
on ECU's 2027 roster; Isaac Szilagyi ('24, College of Charleston) — not on the college's
roster; Higbea / Underwood / Bracksieck ('27 lacrosse) — LaxNumbers only.

### Where it lands (all existing fields; confirmed by reading the files as shipped in #447)

- `src/data/sportsPrograms/cannon.ts` — the `pipeline` card: `headline`, `subhead`,
  `funnel[]` counts and widths, `sportBars[]`, `realityCheck`, `roster[]`, `rosterNote`,
  `sources[]`. `funnelNote` and `rankedRecruits` are **unchanged**.
- `src/data/metricValues.ts` — `p4-commits-2426` (`cannon: '3'`, line ~2292) and
  `d1-commits-2426` (`cannon: '6'`, line ~2338): value and trailing comment only. The shared
  `quals.cannon.text` is still accurate and **does not change**, so Phase 2 has no
  `metric-values` unit.
- `src/lib/metrics.ts` — **no change**; both source files already fold.
- `src/data/sportsProgram.ts`, `src/components/SportsProgram.tsx` — **no change.**

### Conventions the new rows follow

- Sport label `'Boys Lacrosse'` (8 uses elsewhere, an existing unit; Cannon's roster is
  gendered — `'Boys Basketball'`, `'Girls Basketball'`). Not `'Lacrosse'`.
- Conference strings all exist already: `'ACC'`, `'Ivy'`, `'CAA'`, `'Big South'`,
  `'Big East'`, `'NEWMAC'`, `'NCAC'`, `'Liberty'`.
- Within a class P4 → D1 → D2 → D3; classes '26, '25, '24, then the '27 verbals last.
- `sportBars[].width` = `count / 8`; `p4Width` on the same scale (`0.13` for one P4).
- No `rank247` on any lacrosse row: 247Sports does not rank lacrosse.

### Why two phases

Four prose fields change in English (`headline`, `subhead`, `realityCheck`, `rosterNote`),
all in the `sports` overlay topic → Phase 2 translates them into the nine `PROSE_TRANSLATED`
locales after review. The nine new roster rows add no prose; `'Boys Lacrosse'`, `'Girls
Basketball'` and `'Volleyball'` attach to existing identifier units, and the `'Not published'`
unit loses its last Cannon path.

## Decisions

- **Every finding follows the `cannoncommits` standard** (commitments at any level count;
  graduate test; college committed to out of Cannon; verbals listed not counted).
- **Barnhardt, Szilagyi and the three 2027 lacrosse leads stay off the card** — one
  reader-submitted database (or two) without the college's roster is a lead. Recorded for a
  later pass.
- **Quinn Frood is excluded on the graduate test**, not on doubt about the commitment.
- **`funnelNote` and the Compare qual are left as shipped** — both still true; changing them
  would add translation units for no information.
- **Kierra Morrow uses Elon's spelling** — the school's 2023-24 girls roster is not
  retrievable and HSOT's "Morow" is the reader-submitted form.
- **Plan name `cannoncommits2`** — a follow-up to a merged plan, not an amendment to it.

## Approvals needed

**None.** Every change fills fields on a card and two Compare rows that already exist.

## Source material

Written during planning, **uncommitted**, all in `source-material/sports/cannon/`:

| File | State | Role |
|---|---|---|
| `Cannon - Sports - College Commitments 2024-2026.md` | extended | provenance for both Compare rows and the card |
| `Cannon - Sports - Varsity Roster Cross-Reference 2026.md` | rewritten | method and nulls for both passes |
| `Cannon - Sports - Redesign Research 2026.md` | note extended | points §3 at the two files |

`/implement` ingests them first (step 2).

## Out of scope

- Re-checking Barnhardt, Szilagyi and the 2027 lacrosse leads — a later pass, once the
  colleges' 2027 rosters and signing releases are out (early period opens 2026-11-11).
- `rankedRecruits`, `funnelNote`, the Compare qual, any other Sports card.
- Deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/cannon-commits-2026-b` from a freshly pulled `main` (which holds #447).
   `git status --short` must show only the three source-material paths above.

2. **Ingest** — run the `ingest-source-material` skill for `sports` / `cannon`. It
   regenerates `.claude/docs/sports/cannon.md` and `src/data/schools.json`. Then
   `git diff --stat src/data/schools.json` (only Cannon sports entries; restore `HEAD` order
   on a wholesale reorder), `npm run check:metrics` (exit 0), `npm run schema && npm run
   check:schema` (commit `DATA-SCHEMA.md` only if it changed).

3. **Edit the pipeline card** in `src/data/sportsPrograms/cannon.ts`:

   a. `headline` →
      `'Twenty-three documented college commitments across 2024–26, twelve of them Division I and four Power 4 — still a floor, because Cannon publishes no consolidated signing list.'`

   b. `subhead` →
      `'Lacrosse leads the way: the three-time state champion Class of 2024 sent seven players on to college programs, five of them Division I, including North Carolina, Brown and St. John’s. Basketball follows with a Miami signee and East Carolina and Elon commits, and five current seniors already hold public Division I commitments — Princeton, Coastal Carolina, Ohio, Furman and Villanova.'`

   c. `funnel[]`: counts `'23'`, `'12'`, `'4'`; widths `1`, `0.52`, `0.17`. Labels, hints,
      shades and the first stage's `toVerify: true` stay.

   d. `sportBars` →
      ```ts
      { sport: 'Boys Lacrosse', count: 8, width: 1, p4Width: 0.13 },
      { sport: 'Boys Basketball', count: 5, width: 0.63, p4Width: 0.13 },
      { sport: 'Girls Basketball', count: 3, width: 0.38 },
      { sport: 'Football', count: 3, width: 0.38, p4Width: 0.13 },
      { sport: 'Volleyball', count: 3, width: 0.38 },
      { sport: 'Swimming', count: 1, width: 0.13, p4Width: 0.13 },
      ```
      (sums to 23; no row is unpublished any more.)

   e. `realityCheck` →
      `'Lacrosse, not basketball, is Cannon’s deepest pipeline: eight of the twenty-three commitments and five of the twelve Division I places come from one sport, most of them from a single three-peat championship class. The four Power 4 commits are a swimmer to Notre Dame, an offensive lineman and a lacrosse attackman to North Carolina, and one basketball player to Miami — while the flagship basketball program’s other placements in this window are East Carolina, two Division III colleges and a junior college. Title-winning programs and recruiting pipelines are not the same thing.'`

   f. `roster[]` — keep the '26 and '27 blocks verbatim. In the '25 block change Wittgraefe's
      `sport` to `'Volleyball'` and append after the Ingram row:
      ```ts
      { cls: "'25", name: 'JT Murphy', sport: 'Boys Lacrosse', college: 'Skidmore', conf: 'Liberty', level: 'D3' },
      ```
      Replace the '24 block with, in this order (Swartz and Galloway rows verbatim):
      ```ts
      // Class of 2024
      { …Austin Swartz row, unchanged, with its rank247… },
      { cls: "'24", name: 'Hayes Galloway', sport: 'Football', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Brevin Wilson', sport: 'Boys Lacrosse', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Cole Frood', sport: 'Boys Lacrosse', college: 'Brown', conf: 'Ivy', level: 'D1' },
      { cls: "'24", name: 'Ben Maynor', sport: 'Boys Lacrosse', college: 'Delaware', conf: 'CAA', level: 'D1' },
      { cls: "'24", name: 'Will Swartz', sport: 'Boys Lacrosse', college: 'High Point', conf: 'Big South', level: 'D1' },
      { cls: "'24", name: 'Quinn Falasca', sport: 'Boys Lacrosse', college: 'St. John’s', conf: 'Big East', level: 'D1' },
      { cls: "'24", name: 'Kierra Morrow', sport: 'Girls Basketball', college: 'Elon', conf: 'CAA', level: 'D1' },
      { cls: "'24", name: 'Max Murash', sport: 'Boys Basketball', college: 'Hamilton', conf: 'NESCAC', level: 'D3' },
      { cls: "'24", name: 'Tyler Martin', sport: 'Boys Basketball', college: 'Denison', conf: 'NCAC', level: 'D3' },
      { cls: "'24", name: 'Liam Gibbons', sport: 'Boys Lacrosse', college: 'MIT', conf: 'NEWMAC', level: 'D3' },
      { cls: "'24", name: 'Carter Cassidy', sport: 'Boys Lacrosse', college: 'DePauw', conf: 'NCAC', level: 'D3' },
      ```
      Use the typographic apostrophe in `St. John’s`, as the rest of the file does.

   g. `rosterNote` →
      `'The Class of 2027 rows are public verbal commitments and are listed because they are already announced; they are not counted in the funnel, the sport bars or on the Compare page until those athletes sign. Evan Ingram’s junior college is listed at the D3 tier for want of an NJCAA level in this table’s scale. Three athletes have since moved — Austin Swartz from Miami to Creighton, Hayes Galloway from North Carolina to Clemson as a preferred walk-on, and Jake Baker from East Carolina to Western Carolina — and the roster shows the college each committed to out of Cannon.'`

   h. `sources[]` — keep all 18 and add:
      ```ts
      { label: 'HighSchoolOT — North Carolina boys lacrosse recruiting tracker', url: 'https://www.highschoolot.com/story/north-carolina-high-school-boys-lacrosse-recruiting-tracker/21296821/' },
      { label: 'LaxNumbers — Cannon School boys lacrosse recruits, 2024', url: 'https://www.laxnumbers.com/team_info.php?y=2024&t=12767&s=2' },
      { label: 'Charlotte Observer via Yahoo — 2024 All-Observer lacrosse teams', url: 'https://ca.sports.yahoo.com/news/meet-observer-lacrosse-teams-best-100000191.html' },
      { label: 'North Carolina — Brevin Wilson, men’s lacrosse roster', url: 'https://goheels.com/sports/mens-lacrosse/roster/brevin-wilson/27452' },
      { label: 'Brown — Cole Frood, men’s lacrosse roster', url: 'https://brownbears.com/sports/mens-lacrosse/roster/cole-frood/23961' },
      { label: 'Delaware — Ben Maynor, men’s lacrosse roster', url: 'https://bluehens.com/sports/mens-lacrosse/roster/ben-maynor/30488' },
      { label: 'High Point — Will Swartz, men’s lacrosse roster', url: 'https://highpointpanthers.com/sports/mens-lacrosse/roster/will-swartz/11872' },
      { label: 'St. John’s — Quinn Falasca, men’s lacrosse roster', url: 'https://redstormsports.com/sports/mens-lacrosse/roster/quinn-falasca/5856' },
      { label: 'Elon — 2026–27 women’s basketball roster (Kierra Morrow)', url: 'https://www.elonphoenix.com/sports/womens-basketball/roster' },
      { label: 'MIT — Liam Gibbons, men’s lacrosse roster', url: 'https://mitathletics.com/sports/mens-lacrosse/roster/liam-gibbons/14277' },
      { label: 'DePauw — men’s lacrosse roster (Carter Cassidy)', url: 'https://depauwtigers.com/sports/mens-lacrosse/roster' },
      { label: 'Skidmore — men’s lacrosse roster (JT Murphy)', url: 'https://skidmoreathletics.com/sports/mens-lacrosse/roster' },
      { label: 'William Smith — 2025 volleyball roster (Lily Wittgraefe)', url: 'https://hwsathletics.com/sports/womens-volleyball/roster/2025' },
      ```

4. **Compare rows** in `src/data/metricValues.ts`:
   - `p4-commits-2426` → `cannon: '4', // ’24 A.Swartz (Miami), Galloway (North Carolina), B.Wilson (North Carolina) · ’25 Kroll (Notre Dame)`
   - `d1-commits-2426` → `cannon: '12', // ’24: A.Swartz, Galloway, B.Wilson, Frood, Maynor, W.Swartz, Falasca, Morrow · ’25: Kroll, McCorkle, Nix, Baker (2026 class: two D3 only; ’27 verbals not counted)`
   - `quals.cannon.text` on both: **unchanged.**

5. **Checks and browser** — see Verification. Commit with explicit paths (the three
   source-material files, `src/data/sportsPrograms/cannon.ts`, `src/data/metricValues.ts`,
   `src/data/schools.json`, `.claude/docs/sports/cannon.md`, `DATA-SCHEMA.md` only if
   changed), push, verify the SHA against `git ls-remote`. Flip the INDEX row to *English
   shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales on **one** overlay topic, `sports`. No
`metric-values` unit (the qual is unchanged) and no chrome catalogs. Mechanism:
`.claude/docs/prose-translation-architecture.md`; recipe: `cannoncommits` / `ddathletes`
Phase 2.

Expected units per locale: **4** — `cannon:pipeline.headline`, `.subhead`, `.realityCheck`,
`.rosterNote`. The nine new rows add `at` paths to the existing `Boys Lacrosse`, `Girls
Basketball` and `Volleyball` units; `Not published` drops its Cannon path. Roster indexes
shift, so the splice matches by stamp, never by path. A fifth new unit means something went
wrong — stop and look.

1. `node scripts/i18n_splice_work.mjs --lang <code> --topic sports`, dry-run `es` first.
2. Translate the four units by hand per locale, reusing each locale's existing renderings
   from the `cannoncommits` strings (the `rosterNote` loses one clause and is otherwise
   identical, so start from the shipped translation). Figures char-for-char: `23`, `12`,
   `4`, `2024–26`, `2024`. Number words translate as words. Keep Latin: North Carolina,
   Brown, St. John’s, Miami, East Carolina, Elon, Notre Dame, Creighton, Clemson, Western
   Carolina, Princeton, Coastal Carolina, Ohio, Furman, Villanova, NJCAA. `fa`/`ar`: no
   isolates in the work file.
3. `npm run i18n:build -- --topic sports --lang <code>` ×9.
4. Phase 2 checks, commit with explicit paths, push, PR with `--body-file`, squash-merge,
   `git checkout main && git pull`, flip plan and INDEX to *Implemented*. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/sports/cannon/Cannon - Sports - College Commitments 2024-2026.md` | extended (planning) |
| `source-material/sports/cannon/Cannon - Sports - Varsity Roster Cross-Reference 2026.md` | rewritten (planning) |
| `source-material/sports/cannon/Cannon - Sports - Redesign Research 2026.md` | note extended (planning) |
| `src/data/schools.json`, `.claude/docs/sports/cannon.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/cannon.ts` | pipeline card: 9 new rows + 1 sport fill, funnel, bars, 4 prose fields, 13 sources |
| `src/data/metricValues.ts` | two values and comments |
| `src/data/overlays/work/sports.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean.
- [ ] `npm run check:metrics`, `npm run check:schema`, `npm run check:quals`,
      `npm run check:live` — clean (`check:live` passes by construction on new units).
- [ ] `npm run build` — exit 0.
- [ ] Browser, `/school/cannon`, Sports → The College Pipeline, card open: funnel 23 / 12 /
      4; six bars with Boys Lacrosse widest; roster 28 rows — `P4` on Swartz, Galloway,
      Wilson and Kroll; the D1 tab shows 17 rows (12 counted + 5 verbals), the P4 tab 4; no
      row reads "Not published"; all 31 source links open.
- [ ] Browser, `/compare?schools=cannon,providence-day`, Sports: Cannon reads **4** on Power
      4 commits and **12** on Division I commits; Providence Day's leader tint unchanged.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live` — all nine resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9 — 0; `python3 scripts/check_figures.py
      --lang <code> --topic sports` ×9.
- [ ] `npm run check:digits`, `check:dates`, `check:moneytext`, `check:bidi`, `check:fa`,
      `check:hi`, `check:fr` — clean.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9 on the four `at` paths — 0.
- [ ] `npm run build` — exit 0.
- [ ] Browser: `/school/cannon?lang=es` and `?lang=fa`, card open: four sentences translated,
      `23`, `12`, `4`, `2024–26` intact; names and colleges Latin.

## Risks

| Risk | Mitigation |
|---|---|
| A lacrosse name is misspelled across sources (Brevin/Brevan, Will/William, JT/J.T.) | The source file records every form; the card uses the school's and the college's spelling |
| Barnhardt later appears on ECU's roster | Recorded as an unverified lead; a one-row follow-up, not a redo |
| Another session's untracked files swept into the commit | Stage explicit paths; `git status --short` before each commit |

## Open questions

- **Should the two Swartz rows carry a note that they are different athletes?** **Default:**
  no — no source links them, and the roster shows sport and college beside each name.
