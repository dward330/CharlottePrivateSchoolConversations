---
name: seniorsrow
title: Compare › Sports gets a "Current seniors committed" row (`seniors-committed`, Class of 2027, any level, verbal or signed) for every high school, fed by a new per-class retention file per school and a current-senior sweep of all eleven; each card's roster gains the class's verbal rows; the window-roll procedure is recorded. UX-approved 2026-11-08. Two-phase
status: english-done
phases: 2
created: 2026-11-08
branch: feat/seniors-committed-row
prs: []
---

# "Current seniors committed" on Compare, and the data that feeds it

## Goal

The Power 4 and Division I Compare rows cover graduated classes 2024–2026, so a current
senior's commitment is invisible on Compare until the window rolls after graduation. The
user approved (2026-11-08) a third Sports row, **Current seniors committed**, that counts the
current senior class's public college-athletics commitments at any level, verbal or signed,
for every high school on the roster — and asked that each class's commitment data be
retained in files so that the window roll can promote it without re-research. This plan
adds the row, writes the per-class file for all eleven high schools (seeded for three during
planning), puts each school's Class of 2027 verbals on its College Pipeline roster, and
records the roll procedure. Done when Compare shows the row with a value for every high
school, every value traces to that school's `College Commitments Class of 2027.md`, the
floor text in `CLAUDE.md` reads the new row total, and `npm run build` is green in all ten
locales.

## Context

### What exists

- `src/data/metricValues.ts` — `VALUE_METRICS`, 53 rows; the five Sports rows are
  `p4-commits-2426`, `d1-commits-2426`, `cup-finish`, `cup-titles`, `cup-best`, and
  **`cup-best` is the last row of the whole array** (index 52). Overlay paths for
  `metric-values` carry the array index (memory `metric-values-midarray-insert-shifts-paths`;
  `cupbest` appended last for exactly that reason). **Append the new row last.**
- `ValueMetric` fields: `topic`, `key`, `label`, `note?`, `values: Record<slug, string |
  null>`, `quals?`, plus `noLead`, `textValues`, `compareOnly`, `rowTip` (none needed here;
  more commitments is better, so the leader tint stays on).
- `CellQual` kinds: `'minimum' | 'range' | 'official' | 'scope'`. Identical qual strings
  share one translation unit (the two Cannon quals already do).
- `scripts/coverage_floor.mjs` — `FLOOR_EXCLUDED_KEYS` holds the three Cup rows because only
  association members can hold them. The new row is **not** excluded: every high school can
  hold a value, and `'0'` after a sweep is a value. The row total moves 44 → 45; the floor
  text in `CLAUDE.md` (lines ~97–104 and ~134: "30/44", "≥30 of 44", "39 → 44 when…") must be
  updated from `npm run coverage:floor`, not transcribed.
- Each high school's `src/data/sportsPrograms/<slug>.ts` has a `pipeline.roster[]`; Cannon's
  already carries five `'27` verbal rows and a `rosterNote` sentence explaining them (PR #447).
  Providence Day's and Charlotte Catholic's rosters have no `'27` rows. Gaston Day has no
  `pipeline` card at all.
- K-8 schools (Charlotte Prep, Trinity Episcopal; `hasHighSchool: false` in `brands.ts`) are
  off Compare entirely and get no value.
- `/athlete-commits` (merged 2026-11-08, with this plan's conventions baked in): Step 1 runs
  the **window check**, Step 6 writes the **per-class file**, Step 7 hands over the
  `seniors-committed` value. This plan is the first consumer of all three.

### Seeded during planning (uncommitted, in `source-material/sports/<slug>/`)

| File | Content | Provisional value |
|---|---|---|
| `Cannon - Sports - College Commitments Class of 2027.md` | full sweep done: Busby (Princeton), Drayton (Coastal Carolina), Sales (Ohio), K. Davis (Furman), Cooler (Villanova); four leads | **5** |
| `Providence Day - Sports - College Commitments Class of 2027.md` | football only, from the NC Football News 2027 tracker + 247's 2027 NC rankings: Geathers (Florida), Galloway (Kentucky), Drummond (Nebraska), Cooper (Penn State), Poku-Kankam (Rutgers), Fletcher (Wake Forest), Dempsey (Charlotte), Hodson (Delaware) confirmed by both; Abanquah (Elon) NCFN-only | **8–9**, other sports pending |
| `Charlotte Catholic - Sports - College Commitments Class of 2027.md` | football only, NCFN-only: Flynn (Columbia), W. Johnson (Davidson) — both pending a second source | **0–2**, other sports pending |

The 17 HighSchoolOT trackers hold **no Class of 2027 entries yet** for any roster school
(checked 2026-11-08); they fill in after the signing periods. The NC Football News 2027
tracker and 247's NC 2027 page list no 2027 football commits for the other eight schools.

### Conventions

- Row key `seniors-committed` is **class-agnostic**; the class year lives in the label and
  note so the yearly roll edits text, not keys.
- Values are counts of the per-class file's **confirmed** rows (two independent published
  sources, or the college's or school's own announcement). `'0'` for a swept school with
  none. `null` only for K-8.
- One **shared** qual text for every school (one translation unit):
  `'Public commitments by the current senior class, counted at any level and verbal until signed; a documented minimum that grows through the spring signing period. Names are on the school’s College Pipeline card.'`
  with `kind: 'minimum'`.
- Roster rows for the class go at the **end** of each school's `roster[]` under a
  `// Class of 2027 — public verbal commitments …` comment (Cannon's shape). Identifier
  fields only; sport labels and conference strings from the existing vocabulary (grep
  before adding one).
- The standard `rosterNote` sentence, appended to each school where rows are added:
  `'The Class of 2027 rows are public verbal commitments, listed because they are already announced and not counted in the funnel, the sport bars or the Power 4 and Division I rows until those athletes sign.'`
  (Cannon's note already says this; leave it.)
- Student names appear on the card (existing practice for high-school commits) and in the
  source files, never in the Compare qual.

### Why two phases

New Compare chrome-adjacent prose (`label`, `note`, the shared qual) lives in the
`metric-values` overlay topic; the `rosterNote` sentences live in `sports`. Both are research
prose translated in Phase 2 after the English is reviewed.

## Decisions

- **One row, any level, verbal or signed** — the user's wording ("current year's seniors
  committed"). A P4/D1 split would be two more rows and more units for a class that signs
  over six months.
- **Append last in `VALUE_METRICS`** — avoids re-splicing nine locales (cupbest precedent).
- **Shared qual text** — one unit instead of eleven; the names are on the card.
- **Gaston Day gets a value but no card rows** — the row was approved; a card it never had
  is a separate UX decision. Its `'0'` or count comes from its per-class file alone.
- **Two-source rule applies to verbals** — a tracker alone is a lead (Abanquah, Flynn,
  Johnson today). `/implement` tries 247 player pages, the college's announcement and the
  school's own site before leaving a lead out.
- **The window roll is recorded, not performed** — the first roll is due from 1 June 2027,
  as its own plan for every school at once (see Out of scope).
- **Plan name `seniorsrow`** — the row is the deliverable; the sweep serves it.

## Approvals needed

**Granted.** The user approved the new Compare row on 2026-11-08 ("You have my ux approval
for that"). No other new card, tile or component.

## Source material

Three per-class files seeded (table above), **uncommitted**. `/implement` writes the other
eight (step 2) and extends the three, then ingests all eleven schools' `sports` folders.
All match `/college commitments/i` → `matriculation`; **no `metrics.ts` rule needed.**

## Out of scope

- Rolling the window (`2426` → `2527`). Due from 1 June 2027; its own plan, named by the
  `/athlete-commits` window check: rename keys, labels and notes; recount every school from
  the per-class files; promote confirmed 2027 rows into each window file; move
  `seniors-committed` and the roster verbal blocks to the Class of 2028; update the
  `CLAUDE.md` floor text.
- A Gaston Day pipeline card.
- Graduated-class refreshes for schools other than Cannon (`/athlete-commits` per school).
- Deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/seniors-committed-row` from a freshly pulled `main`. `git status --short`
   must show only the three seeded source-material files (and any plan files you were told
   to commit).

2. **Sweep the current seniors of every high school** — eleven schools; follow
   `/athlete-commits` Step 3's verbal sources in this order, stopping at two independent
   sources per athlete: the school's own athletics news / signing posts (Providence Day,
   Charlotte Latin, Country Day, Charlotte Christian and Charlotte Catholic all publish
   them), the NC Football News 2027 tracker (already read), 247Sports 2027 NC rankings
   (already read) and player pages, LaxNumbers per school **in Chrome** (find each team id
   by search), Prep Girls Hoops and Phenom Hoop Report, PrepVolleyball school pages,
   SwimSwam / Swimming World, Perfect Game / PBR, TopDrawerSoccer, the Charlotte Observer
   preseason previews (via Yahoo). The current rosters come from each school's site and
   MaxPreps (`/<sport>/roster/`). Write or extend
   `source-material/sports/<slug>/<School> - Sports - College Commitments Class of 2027.md`
   for **all eleven**, Cannon's shape, including a zero result. Keep leads in a separate table.

3. **Ingest** — `ingest-source-material` for `sports` across the touched schools;
   `git diff --stat src/data/schools.json` (restore `HEAD` order on a wholesale reorder);
   `npm run check:metrics`; `npm run schema && npm run check:schema`.

4. **Roster rows** — in each `src/data/sportsPrograms/<slug>.ts` with a `pipeline` card and
   at least one confirmed 2027 commitment, append the `'27` rows (identifier fields only,
   existing sport/conf vocabulary; `rank247` only from a live 247 Composite read) and the
   standard `rosterNote` sentence. Cannon is already done. Add each new source URL to that
   school's `sources[]`.

5. **The row** — append **last** in `VALUE_METRICS` in `src/data/metricValues.ts`:
   ```ts
   {
     topic: 'sports',
     key: 'seniors-committed',
     label: 'Current seniors committed',
     note: 'Class of 2027 athletes with a public college-athletics commitment at any level, verbal until signed. Documented minimum as of the most recent sweep; the class joins the Power 4 and Division I rows when the window rolls after graduation.',
     values: {
       cannon: '5', // Busby (Princeton), Drayton (Coastal Carolina), Sales (Ohio), K.Davis (Furman), Cooler (Villanova) — all verbal 2026-11-08
       'providence-day': '<n>', // from its per-class file
       … one line per high school, '0' where the sweep found none …
       'charlotte-prep': null, // K-8
       'trinity-episcopal': null, // K-8
     },
     quals: { <every high school>: { kind: 'minimum', text: '<the shared qual text above>' } },
   },
   ```
   Keep the eleven qual strings byte-identical.

6. **Floor** — `npm run coverage:floor`; update the `CLAUDE.md` floor paragraph with the
   script's figures (row total 44 → 45, Davidson Day's fraction, and a clause "45 when the
   `seniors-committed` row shipped, 2026-11-xx, plan `seniorsrow`"), and grep
   `.claude/skills/add-school/SKILL.md` for a transcribed `44` and fix it the same way.

7. **Checks and browser** — see Verification. Commit with explicit paths (eleven per-class
   files, the touched `sportsPrograms/*.ts`, `metricValues.ts`, `schools.json`, the
   `.claude/docs/sports/*.md` the ingest rewrote, `CLAUDE.md`, `DATA-SCHEMA.md`), push,
   verify the SHA. Flip the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales on two overlay topics — `metric-values` (3
units: `label`, `note`, the shared qual) and `sports` (one `rosterNote` unit per school that
gained rows; the new roster rows attach to existing identifier units). **No chrome
catalogs.** Mechanism: `.claude/docs/prose-translation-architecture.md`; recipe: `cupbest`
Phase 2 (a row appended last — no re-splice of earlier paths) and `cannoncommits`.

1. `node scripts/i18n_splice_work.mjs --lang <code> --topic metric-values` and `--topic
   sports`, dry-run `es` first; the `metric-values` dry-run must report exactly 3 new units.
2. Translate by hand per locale, reusing each locale's existing renderings of "Power 4",
   "Division I", "verbal commitment" (the Cannon `rosterNote` strings from #447), "documented
   minimum". Figures char-for-char: `2027`. Keep Latin: college names.
3. `npm run i18n:build -- --topic metric-values --lang <code>` and `--topic sports` ×9.
4. Phase 2 checks, commit with explicit paths, push, PR with `--body-file`, squash-merge,
   `git checkout main && git pull`, flip plan and INDEX to *Implemented*. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/sports/<slug>/<School> - Sports - College Commitments Class of 2027.md` ×11 | 3 seeded (planning), 8 new + 3 extended (implement) |
| `src/data/schools.json`, `.claude/docs/sports/*.md` | regenerated by ingest |
| `src/data/sportsPrograms/<slug>.ts` (schools with confirmed 2027 commits) | `'27` roster rows, `rosterNote` sentence, `sources[]` |
| `src/data/metricValues.ts` | one row appended last |
| `CLAUDE.md`, `.claude/skills/add-school/SKILL.md` | floor figures from the script |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `src/data/overlays/work/{metric-values,sports}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean.
- [ ] `npm run check:metrics`, `npm run check:schema`, `npm run check:quals`,
      `npm run check:live` — clean.
- [ ] `npm run coverage:floor` — row total 45; the `CLAUDE.md` paragraph matches it.
- [ ] `npm run build` — exit 0.
- [ ] Browser, `/compare` with all eleven high schools: the Sports section shows **Current
      seniors committed** after *Best Wells Fargo Cup finish*, a value in every column, the
      leader tint on the highest, and the shared tooltip on hover; the two K-8 schools are
      absent as always.
- [ ] Browser, each school page whose roster gained rows: the `'27` rows render at the
      bottom with their level tags, the D1 / P4 tabs include them, and the funnel counts
      are **unchanged** from before this plan.
- [ ] `npm run audit:mobile` not required (one row); eyeball `/compare` at 390px once.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live` — all nine resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9; `python3 scripts/check_figures.py --lang
      <code> --topic metric-values` and `--topic sports` ×9.
- [ ] `npm run check:digits`, `check:dates`, `check:moneytext`, `check:bidi`, `check:fa`,
      `check:hi`, `check:fr` — clean.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9 on the new `at` paths — 0.
- [ ] `npm run build` — exit 0.
- [ ] Browser: `/compare?lang=es` and `?lang=fa` — the row label, note and tooltip render
      translated; `2027` intact.

## Risks

| Risk | Mitigation |
|---|---|
| A verbal decommits after the row ships | The note says verbal until signed; the per-class file is the record and a one-cell edit follows |
| Single-source football leads (Abanquah, Flynn, Johnson) never get a second source | They stay leads in the file and out of the count; the file says why |
| A school's own site lists commits by sport under JS that curl cannot read | Use Chrome, as the skill's Step 0 already requires |
| The sweep misses a sport at one school | The per-class file records which sports were swept, so the gap is visible and the value is labelled a minimum |
| Someone later inserts a row before this one | Overlay paths shift; re-splice by stamp (memory). Append-last is the convention |

## Open questions

- **Should the row show "n (m signed)" once signing starts?** Owner: user. **Default:** no —
  a single count; signed status lives in the per-class file until the window rolls.
