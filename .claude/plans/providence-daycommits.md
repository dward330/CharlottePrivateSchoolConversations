---
name: providence-daycommits
title: Providence Day — the /athlete-commits graduate refresh verified all 39 Division I rows on the colleges' own pages and adds no athlete; it corrects two names (Elizabeth Ackermann, Clarke Neace), one class (Bharadwaj → 2024), the card's own arithmetic (86 committed, Football 14, ACC 9), adds three transfer sentences, and — the one judgment call — moves Zach Makemson from Tennessee (a verbal no college page confirms) to Appalachian State, taking Compare P4 17 → 16; D1 stays 39, seniors 10
status: english-done
phases: 2
created: 2026-11-08
branch: feat/providence-day-commits-2026
prs: []
---

# Providence Day's College Pipeline: the verified refresh

## Goal

The Providence Day College Pipeline card was built in mid-2026 by transcribing the school's
"Alumni at the Next Level" list; nothing on it had been checked against a college roster.
The `/athlete-commits` graduate refresh of 2026-11-08 read every varsity roster (MaxPreps,
2023-24 → 2026-27), every HighSchoolOT tracker, RealGM, LaxNumbers, the NC Football News
trackers and the college pages, and found **no athlete the list lacks** — the card's 86 rows
mirror the list 1:1 — but it did find five corrections and three transfers. This plan lands
them. Done when the Providence Day page shows the corrected names, classes and figures,
Compare reads the agreed Power 4 value, every figure traces to the two source files below,
and `npm run build` is green in all ten locales.

## Context

### The source (read these first)

- `source-material/sports/providence-day/Providence Day - Sports - College Commitments 2024-2026.md`
  — **rebuilt, uncommitted.** Every one of the 86 rows by level, with the confirming college
  URL for each of the 39 D1 rows, the five corrections with evidence, the transfers, the
  ruled-out leads (Jaida McGrew → FSU fails the graduate test: FSU lists Mountain Island
  Charter as her high school) and the totals table.
- `source-material/sports/providence-day/Providence Day - Sports - Varsity Roster Cross-Reference 2026.md`
  — **new, uncommitted.** Method, sources, seniors per season (counts only), nulls kept
  apart from unchecked rosters, and the traps. Folds onto `redesign-research` via the
  existing `/roster cross-reference/i` rule in `src/lib/metrics.ts` (line ~281) — **no
  `metrics.ts` change.**
- `… - Redesign Research 2026.md` — §3 now opens with a superseded note pointing at the two
  files, **uncommitted.**
- `… - College Commitments Class of 2027.md` — status update and one lead (Charlie Thompson
  → Christopher Newport, LaxNumbers only), **uncommitted.** Value stays `'10'`.

### The card today (`src/data/sportsPrograms/providence-day.ts`, `pipeline`, lines ~226–395)

- `headline` `'~39 Division I commits across the classes of 2024–26, 17 of them Power 4 — and an honest map of which sports feed which level.'`
- `funnel[]` counts `'~72'` / `'~39'` / `'17'`, widths `1` / `0.54` / `0.24`.
- `funnelNote` ends `'Of the 17 P4 commits, the ACC takes 8, the Big Ten 4 and the SEC 4; the Big 12 is not represented in this window.'`
- `sportBars`: Football 15 (`p4Width 0.73`), Swimming 4 (`0.2`), Girls Soccer 4 (`0.07`),
  Track / XC 4 (`0.13`), Basketball 4, Boys Lacrosse 3, Field Hockey 2, Other 4 — sums to 40
  against 39 D1 rows; widths are on a /15 scale.
- `roster[]`: 86 rows for '26 / '25 / '24 (31 / 30 / 25) then 10 '27 verbals. Order within a
  class is P4 → D1 → D2 → D3.
- `rosterNote` (one sentence about level labels and the '27 rows), `sources[]` (NEXT_LEVEL,
  PROFILE_2627, NC Football News, …).
- Counted from the rows: **86 committed · 39 D1 · 17 P4**; D1 by sport Football **14**,
  Swimming 4, Girls Soccer 4, Track & Field 3 + Girls Cross Country 1, Basketball 2 + 2,
  Boys Lacrosse 3, Field Hockey 2, Golf / Volleyball / Boys Tennis / Baseball 1 each; P4 by
  conference **ACC 9** (SMU is ACC), Big Ten 4, SEC 4.

### Compare (`src/data/metricValues.ts`)

`p4-commits-2426` `'providence-day': '17'` (line ~2306), `d1-commits-2426` `'39'` (~2352),
`seniors-committed` `'10'` (~2399). Providence Day has **no `quals` entry** on the first
two rows, and this plan adds none (see Decisions).

### What is an overlay unit here

From `src/data/overlays/work/sports.es.json`: `pipeline.headline`, `.subhead`,
`.funnel[i].label/.hint`, `.funnelNote`, `.realityCheck`, `.rankedRecruits`,
`.roster[i].sport`, `.rosterNote` are units. `funnel[i].count`, `sportBars[].sport/count/
width`, `roster[].name/college/conf/level` and `sources[].label` are **not** extracted. So
Phase 2 is three prose units at most, and the roster edits shift `at` indexes without
creating units — splice by stamp.

### The Makemson question (the one judgment call)

The school's list and a self-submitted MileSplit entry (2023-07-01) say Zach Makemson ('24,
800 m) committed to **Tennessee**. No Tennessee roster or signing release names him.
Appalachian State's own page lists him as a 2025-26 sophomore from Providence Day whose first
season was 2024-25, and his TFRRS profile is under Appalachian State from January 2025 with
no Tennessee season. Every transfer precedent on these cards (Baker, Galloway, Swartz,
Thompson, Davis, Jackson) enrolled at the first college; a **verbal that never enrolled** is
new. The recommendation, written into the source file, is to show the college whose page
confirms him and carry the verbal in `rosterNote`. That moves the Compare P4 row 17 → 16 and
the SEC share 4 → 3. The user may keep Tennessee instead; both variants are spelled out in
step 3 and the plan is otherwise identical.

## Decisions

- **Makemson → Appalachian State (Sun Belt, D1), P4 17 → 16** — the college's own page is
  the confirmation standard this card holds every other D1 row to; the Tennessee claim has
  no such page. **Reversible by the user before `/implement`** (Open questions).
- **No `quals` entry is added for Providence Day** on `p4-commits-2426` / `d1-commits-2426` —
  the figures are now exact (every D1 row roster-verified), so a "documented minimum" qual
  would be wrong, and a "verified" qual would be a new unit in nine locales for no parent-
  facing information. The `// comment` carries the provenance.
- **`~` dropped from `'~39'` and `'~72'`** — both figures are now counted from a verified
  list, not estimated. `'~72'` was simply wrong (86 rows).
- **KK Hart keeps the school's spelling** (Tulsa lists "Kaleigh Hart"); **Ackermann and Neace
  take the college's** — "Brandon" is a misprint for a woman on a women's roster, and
  "Clarke" is how Georgia, SwimSwam and the school's own MaxPreps roster spell her. Recorded
  in the source file.
- **D2/D3 rows are not individually re-verified** — the Compare rows count D1 and P4 only;
  the source file says so.
- **No `realityCheck`, `subhead` or `rankedRecruits` change** — all still true.
- **`sources[]` gains only the pages that change a row** (Kenyon, Georgia, Penn, App State,
  Claflin, ETSU, West Florida), not all 39 verification URLs — those live in the source file.
- **Plan name `providence-daycommits`** — fixed by the `/athlete-commits` handoff.

## Approvals needed

**None** under the UX gate — every change fills fields on a card and Compare rows that exist.
**One decision** before `/implement`: Makemson at Appalachian State (recommended) or
Tennessee — see Open questions; the default is Appalachian State.

## Source material

All in `source-material/sports/providence-day/`, written during the `/athlete-commits` run,
**uncommitted**:

| File | State | Role |
|---|---|---|
| `Providence Day - Sports - College Commitments 2024-2026.md` | rebuilt | provenance for both Compare rows and every card row |
| `Providence Day - Sports - Varsity Roster Cross-Reference 2026.md` | new | method, nulls, unchecked, traps |
| `Providence Day - Sports - Redesign Research 2026.md` | §3 note added | points at the two files |
| `Providence Day - Sports - College Commitments Class of 2027.md` | status + 1 lead | `seniors-committed` stays `'10'` |

`/implement` ingests them first (step 2).

## Out of scope

- Any new athlete — there is none. Re-checking Charlie Thompson → CNU belongs to the next
  current-senior pass (after 2026-11-11).
- Rolling the 2024–26 window; `seniors-committed`; any other school's card.
- Deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/providence-day-commits-2026` from a freshly pulled `main`.
   `git status --short` must show only the four source-material paths above.

2. **Ingest** — run the `ingest-source-material` skill for `sports` / `providence-day`. It
   regenerates `.claude/docs/sports/providence-day.md` and `src/data/schools.json`. Then
   `git diff --stat src/data/schools.json` (only Providence Day sports entries; restore `HEAD`
   order on a wholesale reorder), `npm run check:metrics` (exit 0 — the new file matches the
   existing `/roster cross-reference/i` rule), `npm run schema && npm run check:schema`
   (commit `DATA-SCHEMA.md` only if it changed).

3. **Edit the pipeline card** in `src/data/sportsPrograms/providence-day.ts`.

   a. **Roster rows:**
      - `'Brandon Ackermann'` → `'Elizabeth Ackermann'` (last '24 row).
      - `'Clark Neace'` → `'Clarke Neace'` ('25 P4 block).
      - Move the Shaurya Bharadwaj row out of the '25 block (it is the last '25 D1 row) into
        the '24 D1 block, after Davis Dunham, with `cls: "'24"`; the '24 class is then 26 rows
        and '25 is 29.
      - **Makemson (default):** `{ cls: "'24", name: 'Zach Makemson', sport: 'Track & Field', college: 'Appalachian State', conf: 'Sun Belt', level: 'D1' }`
        and move the row from the '24 P4 block to the head of the '24 D1 block (P4 → D1 order).
        Both strings already exist (`Jaida McClure` row). **If the user keeps Tennessee:**
        leave the row as is.

   b. **`headline`** — default: `'39 Division I commits across the classes of 2024–26, 16 of them Power 4 — and an honest map of which sports feed which level.'`
      (Tennessee variant: `… 17 of them Power 4 …`.)

   c. **`funnel[]`** — counts `'86'`, `'39'`, `'16'` (variant `'17'`); widths `1`, `0.45`,
      `0.19` (variant `0.2`). Labels, hints and shades unchanged.

   d. **`funnelNote`** — replace the last sentence with, default:
      `'Of the 16 P4 commits, the ACC takes 9, the Big Ten 4 and the SEC 3; the Big 12 is not represented in this window.'`
      (variant: `'Of the 17 P4 commits, the ACC takes 9, the Big Ten 4 and the SEC 4; …'`).
      Everything before it is unchanged.

   e. **`sportBars`** — on a /14 scale, default:
      ```ts
      { sport: 'Football', count: 14, width: 1, p4Width: 0.79 },
      { sport: 'Swimming', count: 4, width: 0.29, p4Width: 0.21 },
      { sport: 'Girls Soccer', count: 4, width: 0.29, p4Width: 0.07 },
      { sport: 'Track / XC', count: 4, width: 0.29, p4Width: 0.07 },
      { sport: 'Basketball', count: 4, width: 0.29 },
      { sport: 'Boys Lacrosse', count: 3, width: 0.21 },
      { sport: 'Field Hockey', count: 2, width: 0.14 },
      { sport: 'Other', count: 4, width: 0.29 },
      ```
      (sums to 39; Tennessee variant: Track / XC `p4Width: 0.14`.)

   f. **`rosterNote`** — keep the existing sentence and append, default:
      `' Three athletes have since moved — Jadyn Davis from Michigan to East Tennessee State, Trajan Thompson from Denver to West Florida and Chase Jackson from Gardner-Webb to Claflin — and the roster shows the college each committed to out of Providence Day. Zach Makemson is listed by the school as a Tennessee commit but enrolled at Appalachian State, which is the college shown here.'`
      (Tennessee variant: replace the last sentence with `'Zach Makemson, shown at Tennessee per the school’s list, enrolled at Appalachian State.'`)

   g. **`sources[]`** — append:
      ```ts
      { label: 'Kenyon — women’s tennis roster 2024–25 (Elizabeth Ackermann)', url: 'https://athletics.kenyon.edu/sports/womens-tennis/roster/2024-25' },
      { label: 'Georgia — Clarke Neace, swimming & diving roster', url: 'https://georgiadogs.com/sports/swimming-and-diving/roster/clarke-neace/9992' },
      { label: 'Pennsylvania — men’s tennis roster (Shaurya Bharadwaj, Class of 2024)', url: 'https://pennathletics.com/sports/mens-tennis/roster' },
      { label: 'Appalachian State — Zach Makemson, men’s track & field roster', url: 'https://appstatesports.com/sports/mens-track-and-field/roster/zach-makemson/10553' },
      { label: 'Claflin — Chase Jackson, baseball roster (previous school Gardner-Webb)', url: 'https://athletics.claflin.edu/sports/baseball/roster/chase-jackson/2545' },
      { label: 'East Tennessee State — football roster (Jadyn Davis, via Michigan)', url: 'https://etsubucs.com/sports/football/roster' },
      { label: 'West Florida — men’s basketball roster (Trajan Thompson, via Denver)', url: 'https://goargos.com/sports/mens-basketball/roster' },
      ```
      Typographic apostrophes, as the file uses.

4. **Compare rows** in `src/data/metricValues.ts`:
   - `p4-commits-2426` → default `'providence-day': '16', // 2024–26, every row verified on the college’s page 2026-11-08: ’24 Barnhardt, Shipp, Goodwin, Davis, Poole · ’25 Sanders, Skanes, Winston, G.Bartee, Neace · ’26 Sellars, Lott, Delaney, Baggett, Goldean, Z.G.Bartee (Makemson: Tennessee verbal, enrolled App State — counted D1)`
     (variant: keep `'17'`, comment `… ’24 … Makemson (Tennessee per the school; enrolled App State) …`).
   - `d1-commits-2426` → `'providence-day': '39', // 13 / 13 / 13 by class, each confirmed on the college’s roster 2026-11-08 (see College Commitments 2024-2026.md)`
   - `seniors-committed` — value unchanged; append ` · Thompson (CNU, LaxNumbers-only lead)` to its comment.

5. **Checks and browser** — see Verification. Commit with explicit paths (the four
   source-material files, `src/data/sportsPrograms/providence-day.ts`,
   `src/data/metricValues.ts`, `src/data/schools.json`,
   `.claude/docs/sports/providence-day.md`, `DATA-SCHEMA.md` only if changed), push, verify
   the SHA against `git ls-remote`. Flip the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales on **one** overlay topic, `sports`. No
`metric-values` unit (no qual changes), no chrome catalogs. Mechanism:
`.claude/docs/prose-translation-architecture.md`; recipe: `cannoncommits2` Phase 2.

Expected units per locale: **3** — `providence-day:pipeline.headline`, `.funnelNote`,
`.rosterNote` (Tennessee variant: **2**, no headline). The roster edits move `at` indexes on
the existing `Track & Field`, `Boys Tennis` and sport units without adding units; the splice
matches by stamp, never by path. A fourth new unit means something went wrong — stop and look.

1. `node scripts/i18n_splice_work.mjs --lang <code> --topic sports`, dry-run `es` first.
2. Translate by hand per locale, starting from each locale's shipped rendering of the same
   sentence (the headline and funnelNote change only figures; the rosterNote appends two
   sentences to an unchanged one — old `t` + new sentences, by stamp). Figures char-for-char:
   `39`, `16` (or `17`), `2024–26`, `9`, `4`, `3`. Keep Latin: Michigan, East Tennessee
   State, Denver, West Florida, Gardner-Webb, Claflin, Tennessee, Appalachian State, Providence
   Day. `fa`/`ar`: no isolates in the work file.
3. `npm run i18n:build -- --topic sports --lang <code>` ×9.
4. Phase 2 checks, commit with explicit paths, push, PR with `--body-file`, squash-merge,
   `git checkout main && git pull`, flip plan and INDEX to *Implemented*. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/sports/providence-day/… College Commitments 2024-2026.md` | rebuilt (research) |
| `source-material/sports/providence-day/… Varsity Roster Cross-Reference 2026.md` | new (research) |
| `source-material/sports/providence-day/… Redesign Research 2026.md` | §3 superseded note (research) |
| `source-material/sports/providence-day/… College Commitments Class of 2027.md` | status + lead (research) |
| `src/data/schools.json`, `.claude/docs/sports/providence-day.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/providence-day.ts` | 4 roster edits, headline, funnel, funnelNote, sportBars, rosterNote, 7 sources |
| `src/data/metricValues.ts` | one value (default), three comments |
| `src/data/overlays/work/sports.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean.
- [ ] `npm run check:metrics`, `npm run check:schema`, `npm run check:quals`,
      `npm run check:live` — clean.
- [ ] `npm run build` — exit 0.
- [ ] Browser, `/school/providence-day`, Sports → The College Pipeline, card open: funnel
      86 / 39 / 16 (or 17); eight bars summing to 39 with Football 14; roster still 96 rows
      (86 + 10 verbals) — Elizabeth Ackermann and Clarke Neace spelled so, Bharadwaj in the
      '24 block, Makemson showing Appalachian State · Sun Belt · D1 (or Tennessee · SEC · P4);
      the P4 tab counts 16 (or 17) plus the 7 '27 verbals; the rosterNote's transfer
      sentences render; all seven new source links open.
- [ ] Browser, `/compare?schools=providence-day,charlotte-catholic`, Sports: Providence Day
      reads **16** (or 17) on Power 4 commits and **39** on Division I; the leader tint on
      Power 4 still falls on Providence Day (Charlotte Catholic is 10).

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live` — all nine resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9 — 0; `python3 scripts/check_figures.py --lang <code> --topic sports` ×9.
- [ ] `npm run check:digits`, `check:dates`, `check:moneytext`, `check:bidi`, `check:fa`,
      `check:hi`, `check:fr` — clean.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9 on the three `at` paths — 0.
- [ ] `npm run build` — exit 0.
- [ ] Browser: `/school/providence-day?lang=es` and `?lang=fa`, card open: the three
      sentences translated, `39`, `16`, `2024–26` intact and the `fa` range not reversed;
      names and colleges Latin.

## Risks

| Risk | Mitigation |
|---|---|
| The user keeps Makemson at Tennessee after Phase 1 shipped App State | Every variant edit is listed beside its default; the switch is three strings, one value and one unit |
| Bharadwaj's move shifts ~30 roster `at` indexes | Splice by stamp; `check:live` passes by construction on untouched units |
| Another session's untracked files swept into the commit | Stage explicit paths; `git status --short` before each commit |

## Open questions

- **Makemson: Appalachian State (P4 16) or Tennessee (P4 17)?** — **default:** Appalachian
  State, for the reason in Context; the Tennessee variant is written beside every affected
  edit.

## Implementation notes

- **Phase 1 (2026-11-08).** Makemson shipped at the default, Appalachian State (P4 16).
- **Per-class split corrected.** Step 4's `d1-commits-2426` comment said "13 / 13 / 13 by
  class", copied from the source file's Totals table, which still carried the pre-move split
  (and called the card's old split "12 / 14 / 13", when it was 13 / 13 / 13). Counted from
  the rows after Bharadwaj moves to '24: D1 **14 / 12 / 13**, all levels **26 / 29 / 31**.
  The comment and the source file's Totals table were corrected to match; window totals
  (86 / 39 / 16) were unaffected.
- `check:live` fails in Phase 1 on exactly 3 stamps per locale (headline, funnelNote,
  rosterNote), which is the expected English-first state. The rest of the `npm run build`
  chain was run with only `check:live` removed: exit 0.
- `.claude/docs/INDEX.md` and `src/content/sports/providence-day.json` were also
  regenerated by the ingest, beyond the files the plan listed.
