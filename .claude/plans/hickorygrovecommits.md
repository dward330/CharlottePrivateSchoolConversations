---
name: hickorygrovecommits
title: Hickory Grove Christian College Pipeline — varsity-roster cross-reference (7 / 4 D1 / 0 P4), Johnson ETSU → Wingate, Compare D1 3 → 4
status: english-done
phases: 2
created: 2026-11-09
branch: feat/hickory-grove-commits-2026
prs: []
---

# Hickory Grove Christian College Pipeline — verified 2024–26 refresh

## Goal

Rebuild Hickory Grove Christian's College Pipeline card (Sports) and its Division I Compare row
from the `/athlete-commits` graduate refresh of 2026-11-09. Today the card carries five baseball
commits taken from one HighSchoolOT tracker and a PBR search snippet. The refresh read every HGCS
varsity roster on MaxPreps (2023-24 → 2026-27) against the HighSchoolOT trackers, RealGM, The
Baseball Cube and each college's own roster. It finds:

- **Two Class of 2024 Division I athletes the card lacks:**
  - Conner Barozzino, baseball → Appalachian State (Sun Belt);
  - Jahzir Dukes, football → North Carolina Central (MEAC). He is the first non-baseball row.
- **One D1 row corrected down.** Brady Johnson '25 is at **Wingate** (D2, SAC), not East
  Tennessee State. ETSU's rosters do not list him; Wingate's does.
- **One label correction.** Colby Vanhook's junior college (Gaston College) moves from
  `conf: 'Region 10', level: 'D2'` to the `conf: 'NJCAA', level: 'D3'` convention.

The funnel goes from 5 / 3 / 0 to **7 / 4 D1 / 0 P4**. On Compare, `d1-commits-2426` goes from
3 to **4**; `p4-commits-2426` and `seniors-committed` stay `'0'`.

## Context

### The source (read these first)

All four files are in `source-material/sports/hickory-grove-christian/`. `/athlete-commits` wrote
them and they are **uningested and uncommitted**.

- `Hickory Grove Christian - Sports - College Commitments 2024-2026.md` (**new**). It holds the
  per-class tables with a *Confirmed by* column, the totals, every source URL and the Excluded
  list. It is the authority for every row below.
- `Hickory Grove Christian - Sports - Varsity Roster Cross-Reference 2026.md` (**new**). It holds
  the method, the 84 MaxPreps pages, the nulls and the unchecked sports.
- `Hickory Grove Christian - Sports - Redesign Research 2026.md`. A superseded note now sits under
  "1c — College Pipeline".
- `Hickory Grove Christian - Sports - College Commitments Class of 2027.md`. The 2026-11-09 sweep
  is appended. It still reads **0**, and is provisional until after the 2026-11-11 signing period.

`src/lib/metrics.ts` already has `/roster cross-reference/i` → `redesign-research` (~line 281)
and `/d1|matriculation|college commitments/i` → `matriculation` (~line 287), so **`metrics.ts`
needs no change.**

### Per-athlete changes

| Class | Athlete | Change | Key confirmation |
|---|---|---|---|
| '25 | Davis Cabbage | unchanged (Baseball · UNC Wilmington · CAA · D1) | UNCW roster: "Huntersvlle, N.C. · Hickory Grove" |
| '25 | Ben Green | unchanged (Baseball · UNC Asheville · Big South · D1) | UNCA roster: Last School Hickory Grove Christian HS |
| '25 | Brady Johnson | **East Tennessee State / SoCon / D1 → Wingate / SAC / D2** | https://wingatebulldogs.com/sports/baseball/roster (P, L/L, Fr., Charlotte, Hickory Grove HS); The Baseball Cube; absent from https://etsubucs.com/sports/baseball/roster (current and 2025) |
| '25 | Von Pelow | unchanged (Baseball · Mars Hill · SAC · D2) | https://www.mhu.edu/wp-content/uploads/2026/01/2026-01-Baseball-Night-Program.pdf |
| '24 | Conner Barozzino | **new, D1** — Baseball · Appalachian State · Sun Belt | https://appstatesports.com/sports/baseball/roster/conner-barozzino/9815; HighSchoolOT baseball tracker (Class of 2024, D1); MaxPreps Sr. 23-24 |
| '24 | Jahzir Dukes | **new, D1** — Football · North Carolina Central · MEAC | https://nccueaglepride.com/sports/football/roster/jahzir-dukes/9520; HighSchoolOT "Building the Fence" 2024 (Division I FCS); MaxPreps Sr. 23-24 |
| '24 | Colby Vanhook | **conf Region 10 → NJCAA, level D2 → D3** | https://gcrhinos.com/sports/bsb/2024-25/roster |

No Class of 2026 commit was found in any sport, and no 2027 verbals. The ruled-out leads are
recorded in the source files, and **none of them appears on the page**:
- Dillingham → Valley Forge (RealGM; not on HGCS's 2023-24 roster);
- the Class of 2023 alumni on The Baseball Cube;
- Hawkins, who has no published commitment.

### The card today (`src/data/sportsPrograms/hickory-grove-christian.ts`, `pipeline`, ~lines 203–237)

- **Funnel:** `'5'` / `'3'` / `'0'`, widths 1 / 0.6 / 0.04.
  - Row 0 hint `'(all divisions, baseball)'` and row 1 hint `'(mid-major)'` are both
    HGCS-only units.
- **`sportBars`:** `[{ sport: 'Baseball', count: 3, width: 1 }]`.
- **Roster:** 5 rows.
- **`rosterNote` and `subhead`** carry research bookkeeping, which the dev-only rule (CLAUDE.md,
  "Research bookkeeping is dev-only") keeps off the page:
  - "carries a TO VERIFY";
  - "surfaced via search (the page 403s on direct fetch)";
  - "Built from HighSchoolOT's … tracker and a PrepBaseballReport preview".

  The rewrite removes them.
- **`sources[]`:**
  - `RECRUIT_TRACKER`, the HighSchoolOT baseball tracker, which stays and is relabelled;
  - a PBR 2025 preview entry labelled "via search snippet", which is removed.
- The constants `MAXPREPS` (line 32) and `RECRUIT_TRACKER` (line 37) exist in the file.

The only other ETSU mention in `src/data` for HGCS is the Compare comment and qual below. The
`honors` and `coaching` cards are unaffected.

`CommitLevel` (`src/data/sportsProgram.ts`) is `'P4' | 'D1' | 'D2' | 'D3' | 'NAIA'`. The college
strings `'Appalachian State'`, `'Wingate'` and `'Mars Hill'` and the conf strings `'Sun Belt'`,
`'MEAC'`, `'SAC'`, `'CAA'`, `'Big South'` and `'NJCAA'` all already exist in other
sportsPrograms files. `'North Carolina Central'` is new, but the roster `college` field is not
extracted, so it adds no unit.

### Compare (`src/data/metricValues.ts`)

- `p4-commits-2426` (~line 2304): `'hickory-grove-christian': '0'`. The value is **unchanged**;
  update the comment only.
- `d1-commits-2426` (~line 2350): `'3'` → **`'4'`**.
- `d1-commits-2426` `quals['hickory-grove-christian']` (~line 2380, `kind: 'minimum'`): its
  `text` names "Brady Johnson (ETSU)" and "all three are baseball", both now wrong. **Rewrite
  it.** It is an existing unit; do not add or remove a qual.
- `seniors-committed` (~line 2408): `'0'`, **unchanged**; update the comment only. Its qual is the
  shared `SENIORS_QUAL`, which is untouched.

### Overlay units (checked in `src/data/overlays/work/sports.es.json` and `metric-values.es.json`)

**`sports`.** Extracted HGCS pipeline units:
- the five prose fields (es units 922, 923, 926, 927, 928), each with only the HGCS path;
- the funnel hints `'(all divisions, baseball)'` (924) and `'(mid-major)'` (925), both
  HGCS-only;
- the funnel labels and the `(SEC · Big Ten · ACC · Big 12)` hint, which are shared units;
- roster `sport`.

Roster `name` / `college` / `conf` / `level`, the `sportBars[]` labels and `sources[].label` are
**not** extracted. `Baseball` (es unit 45) and `Football` (unit 36) are existing shared units.
`'(all divisions, 2024–26)'` is an existing unit (302, Carmel and one other path).

**`metric-values`.**
- The new `'4'` is an existing unit (694): `[43].values.hickory-grove-christian` moves there
  from `'3'` (569).
- The qual `[43].quals.hickory-grove-christian.text` (unit 775) is HGCS-only.

**Phase 2 forecast per locale:**
- `sports`: **5 added / 6 dropped**.
  - The five prose fields are replaced.
  - `funnel[0].hint` moves onto the existing `'(all divisions, 2024–26)'` unit, so the
    `'(all divisions, baseball)'` unit drops.
  - `funnel[1].hint` stays `'(mid-major)'`, unchanged.
- `metric-values`: **1 added / 1 dropped** (the qual), plus one path move (`'3'` → `'4'`).

Anything else means something went wrong; stop and look.

## Decisions

- **Window check (2026-11-09): no roll due.** The current seniors are the Class of 2027 and the
  latest graduated class is 2026, which is the window's end (`2426`).
- **Johnson is shown at Wingate, with no transfer sentence.** The card shows the college the
  athlete went to out of the school. Whether he ever committed to ETSU rests on one search
  snippet; he is a freshman at Wingate, not a transfer. Nothing about ETSU goes on the page.
- **Every row is confirmed on the college's own roster or program** plus a second source or the
  athlete's senior season on the HGCS MaxPreps roster.
- **`funnel[1].hint` stays `'(mid-major)'`.** All four D1 conferences (Sun Belt, MEAC, CAA, Big
  South) are non-Power 4, so it stays true and saves a unit in nine locales.
- **`funnel[0].hint` becomes `'(all divisions, 2024–26)'`.** It is no longer all baseball, and
  this is an existing shared unit.
- **The `subhead` drops "added by the researcher".** The brief asked for it, and HGCS's version
  also carries the TO-VERIFY and search wording. Carmel and Providence Day still use the
  phrase; do not touch them here.
- **Sport label `'Football'`** is an existing shared unit.
- **Plan name `hickorygrovecommits`** was fixed by the `/athlete-commits` handoff.

## Approvals needed

**None.** The card and all three Compare rows already exist, and every change fills an existing
field. The Football bar is a data row in the existing `sportBars[]` array.

## Source material

| File | State | Role |
|---|---|---|
| `Hickory Grove Christian - Sports - College Commitments 2024-2026.md` | new | provenance for the card and both window rows |
| `Hickory Grove Christian - Sports - Varsity Roster Cross-Reference 2026.md` | new | method, nulls, unchecked |
| `Hickory Grove Christian - Sports - Redesign Research 2026.md` | superseded note added | points at the two files |
| `Hickory Grove Christian - Sports - College Commitments Class of 2027.md` | sweep record added | `seniors-committed` stays `'0'` |

`/implement` ingests them first (step 2).

## Out of scope

- **The Class of 2027.** Re-run `/athlete-commits` after the 2026-11-11 signing period.
- **The `honors`, `coaching` and every other HGCS card.**
- **The "added by the researcher" wording on other schools.**
- **Rolling the window** (not due).
- **The CLAUDE.md floor paragraph.** HGCS's Compare cells were already non-null; confirm with
  `npm run coverage:floor`.
- Any component, any other school, and deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/hickory-grove-commits-2026` from a freshly pulled `main`. Run
   `git status --short`. It must show only the four source-material paths above, this plan and
   `INDEX.md`. Anything else belongs to another session, so leave it alone.

2. **Ingest.** Run the `ingest-source-material` skill for `sports` / `hickory-grove-christian`,
   then:
   - Run `git diff --stat src/data/schools.json`. It should show only HGCS sports entries. If
     it shows a wholesale reorder, restore `HEAD` order.
   - Revert other schools' notes whose only change is the rebuild date.
   - Run `npm run check:metrics`. Both new files must fold: the Cross-Reference file onto
     `redesign-research` and the commitments file onto `matriculation`.
   - Run `npm run schema && npm run check:schema`. Commit `DATA-SCHEMA.md` only if it changed.

3. **Edit the pipeline card** in `src/data/sportsPrograms/hickory-grove-christian.ts`. Use
   curly apostrophes (`’`) in new prose, as the other refreshed schools do.

   a. `headline` →
   `'Seven documented college commitments across the classes of 2024–26 — four of them Division I, in baseball and football, and none Power 4.'`

   b. `subhead` →
   `'Built from Hickory Grove’s varsity rosters and each college’s own roster; the school publishes no list of its college signees.'`

   c. `funnel`:
   - row 0: count `'7'`, hint `'(all divisions, 2024–26)'`, width 1;
   - row 1: count `'4'`, hint `'(mid-major)'`, width `0.57`;
   - row 2: count `'0'`, width `0.04`.

   Keep the labels and shades.

   d. `funnelNote` →
   `'Three of the four Division I commits are baseball players — Conner Barozzino (’24) at Appalachian State in the Sun Belt, and Davis Cabbage and Ben Green (’25) at UNC Wilmington and UNC Asheville. The fourth is a football player, Jahzir Dukes (’24), a defensive back at North Carolina Central in the MEAC. There are no Power 4 commits in this window.'`

   e. `sportBars` →
   ```ts
   { sport: 'Baseball', count: 6, width: 1 },
   { sport: 'Football', count: 1, width: 0.17 },
   ```

   f. `realityCheck` →
   `'Baseball — the program behind two of HGCS’s recent state titles — accounts for six of the seven commits, reaching Division II at Wingate and Mars Hill and junior college at Gaston College as well as Division I. The school publishes no all-sport signing list, so the count is a documented minimum.'`

   g. `roster` → replace the 5 rows with these 7. Classes run newest first, and P4 → D1 → D2 →
   D3 within a class:
   ```ts
   { cls: "'25", name: 'Davis Cabbage', sport: 'Baseball', college: 'UNC Wilmington', conf: 'CAA', level: 'D1' },
   { cls: "'25", name: 'Ben Green', sport: 'Baseball', college: 'UNC Asheville', conf: 'Big South', level: 'D1' },
   { cls: "'25", name: 'Brady Johnson', sport: 'Baseball', college: 'Wingate', conf: 'SAC', level: 'D2' },
   { cls: "'25", name: 'Von Pelow', sport: 'Baseball', college: 'Mars Hill', conf: 'SAC', level: 'D2' },
   { cls: "'24", name: 'Conner Barozzino', sport: 'Baseball', college: 'Appalachian State', conf: 'Sun Belt', level: 'D1' },
   { cls: "'24", name: 'Jahzir Dukes', sport: 'Football', college: 'North Carolina Central', conf: 'MEAC', level: 'D1' },
   { cls: "'24", name: 'Colby Vanhook', sport: 'Baseball', college: 'Gaston College', conf: 'NJCAA', level: 'D3' },
   ```
   Check the counts: 7 rows; D1 = 4; P4 = 0; Baseball 6, Football 1.

   h. `rosterNote` →
   `'Each row is the college the athlete went to out of Hickory Grove, as listed on that college’s own roster. P4 = SEC · Big Ten · ACC · Big 12. Colby Vanhook’s junior college is listed at the D3 tier for want of an NJCAA level in this table’s scale.'`

   i. `sources[]` → replace both entries with these. Relabel `RECRUIT_TRACKER`; drop the PBR
   "via search snippet" entry.
   ```ts
   { label: 'HighSchoolOT — NC baseball recruiting tracker (Barozzino, Cabbage, Green, Vanhook)', url: RECRUIT_TRACKER },
   { label: 'HighSchoolOT — Building the Fence: Class of 2024 in-state football commits (Dukes)', url: 'https://www.highschoolot.com/story/building-the-fence-class-of-2024-in-state-football-commits/20968251/' },
   { label: 'Appalachian State — baseball roster (Conner Barozzino)', url: 'https://appstatesports.com/sports/baseball/roster/conner-barozzino/9815' },
   { label: 'North Carolina Central — football roster (Jahzir Dukes)', url: 'https://nccueaglepride.com/sports/football/roster/jahzir-dukes/9520' },
   { label: 'UNC Wilmington — baseball roster (Davis Cabbage)', url: 'https://uncwsports.com/sports/baseball/roster' },
   { label: 'UNC Asheville — baseball roster (Ben Green)', url: 'https://uncabulldogs.com/sports/baseball/roster' },
   { label: 'Wingate — baseball roster (Brady Johnson)', url: 'https://wingatebulldogs.com/sports/baseball/roster' },
   { label: 'Mars Hill — 2026 Baseball Night program (Von Pelow)', url: 'https://www.mhu.edu/wp-content/uploads/2026/01/2026-01-Baseball-Night-Program.pdf' },
   { label: 'Gaston College — baseball roster 2024–25 (Colby Vanhook)', url: 'https://gcrhinos.com/sports/bsb/2024-25/roster' },
   { label: 'MaxPreps — Hickory Grove Christian varsity rosters', url: MAXPREPS },
   ```

   The rewritten prose fields say what the school publishes, never what was searched.

4. **Compare rows** in `src/data/metricValues.ts`:
   - **`p4-commits-2426`.** Keep `'0'` and set the comment to
     `// no Power 4 commit 2024–26; all four D1 commits are mid-major (Sun Belt, MEAC, CAA, Big South)`.
   - **`d1-commits-2426`.** Set
     `'hickory-grove-christian': '4', // ’24: Barozzino (App State baseball), Dukes (NC Central football) · ’25: Cabbage (UNCW), Green (UNC Asheville). Johnson is at Wingate (D2), not ETSU — see the HGCS College Commitments 2024-2026 source file`.
   - **`d1-commits-2426` qual** `text` →
     `'A documented minimum — three baseball and one football: Conner Barozzino (Appalachian State) and Jahzir Dukes (North Carolina Central, football) in the Class of 2024, and Davis Cabbage (UNC Wilmington) and Ben Green (UNC Asheville) in the Class of 2025. All four are mid-major Division I; the school publishes no all-sport signing list.'`
     Keep `kind: 'minimum'`.
   - **`seniors-committed`.** Keep `'0'` and set the comment to
     `// none found (re-checked 2026-11-09 against the 2026-27 rosters posted so far); re-run after 2026-11-11`.
   - Run `npm run check:quals`, then `npm run coverage:floor`. Confirm HGCS's Compare fill is
     unchanged and the floor is still 31/45. If either moved, stop and report.

5. **Checks and browser:** see Verification. Then:
   - Commit with explicit paths:
     - the four source-material files;
     - `src/data/sportsPrograms/hickory-grove-christian.ts`, `src/data/metricValues.ts`,
       `src/data/schools.json`, `.claude/docs/sports/hickory-grove-christian.md`;
     - any other derived file the ingest regenerated for HGCS (inspect it first);
     - `DATA-SCHEMA.md`, only if it changed;
     - this plan and `INDEX.md`.
   - Push, then check that `git rev-parse HEAD` matches `git ls-remote origin <branch>`.
   - Flip this plan and the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs
until they confirm the English version is what they want.

### Phase 2 — Every other locale

**Scope:** the nine `PROSE_TRANSLATED` locales on the `sports` and `metric-values` overlay
topics. Read the list from `src/lib/i18n.ts`; today it is `es bn ht te fr fa it hi ar`. No
chrome catalogs change.

The mechanism is in `.claude/docs/prose-translation-architecture.md`. Follow the
`carmelchristiancommits` Phase 2 recipe.

1. **Splice.** Run `node scripts/i18n_splice_work.mjs --lang <code> --topic sports`, then
   `--topic metric-values`, with a dry run on `es` first.
   - Confirm the forecast in *Context*: `sports` 5 added / 6 dropped; `metric-values` 1 / 1
     with one path move.
   - Roster indexes change (5 → 7, reordered), so **splice by stamp, never by path**.
   - Every roster `sport` path must land on an existing unit (`Baseball` or `Football`).

2. **Translate by hand, per locale**: the five new `sports` units and the one qual.
   - Start from each locale's shipped rendering of the old fields, which shows its terms for
     Division I, Power 4, mid-major, junior college and "documented minimum".
   - Copy these figures char-for-char: `2024–26`, `’24`, `’25`, `2024`, `2025`, `D3`, `NJCAA`.
   - Keep college, conference and program names in Latin script as each locale already does:
     `Appalachian State`, `North Carolina Central`, `UNC Wilmington`, `UNC Asheville`,
     `Wingate`, `Mars Hill`, `Gaston College`, `Sun Belt`, `MEAC`, `HGCS`,
     `SEC · Big Ten · ACC · Big 12`.
   - Spelled-out numbers ("seven", "four", "three", "six") follow each locale's practice in the
     old headline and funnelNote.
   - `fa` / `ar`: no isolates in the work file.

3. **Build.** Run `npm run i18n:build -- --topic sports --lang <code>` (and `metric-values`)
   for all nine locales.

4. **Ship.**
   - Run the Phase 2 checks and commit with explicit paths.
   - Push and verify the SHA.
   - Open the PR with `--body-file`, run `gh pr merge --squash --delete-branch`, then
     `git checkout main && git pull`.
   - Flip the plan and INDEX row to *Implemented* with the PR link, in the PR or a follow-up
     PR, never on `main`.
   - **Do not deploy.** Say "merged — ready to deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `source-material/sports/hickory-grove-christian/*.md` (4) | research from `/athlete-commits` |
| `src/data/schools.json`, `.claude/docs/sports/hickory-grove-christian.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/hickory-grove-christian.ts` | five prose fields, funnel (counts, widths, row-0 hint), sportBars (+Football), roster 5 → 7, sources rebuilt |
| `src/data/metricValues.ts` | D1 3 → 4, D1 qual rewritten, three comments |
| `src/data/overlays/work/{sports,metric-values}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:metrics`, `check:schema`, `check:quals` and `check:chrome` are clean, apart
      from any pre-existing finding in another school.
- [ ] `npm run coverage:floor` shows the floor unchanged at 31/45.
- [ ] `npm run check:live` fails only on the old HGCS `sports` / qual stamps, which is the
      expected English-shipped state. The rest of the `npm run build` chain exits 0.
- [ ] Browser check (`npm run build && npx vite preview`, real Chrome) on
      `/school/hickory-grove-christian?topic=sports`, with The College Pipeline card open:
      - the funnel reads 7 / 4 / 0, with hints "(all divisions, 2024–26)" and "(mid-major)";
      - there are two sport bars, Baseball 6 and Football 1;
      - there are 7 roster rows in the order above; Johnson reads Wingate · SAC · D2 and
        Vanhook reads NJCAA · D3;
      - ETSU is absent from the card;
      - the filter tabs show D1 4 and P4 0;
      - the new prose renders, with no "TO VERIFY" or "via search" text;
      - the ten source links open.

      The headline is the card **teaser** and is hidden while the card is open, so check it
      with the card closed.
- [ ] Browser check on `/compare?topic=sports&schools=hickory-grove-christian,cannon`: HGCS
      reads **0** Power 4 and **4** Division I. The D1 cell's qual tip (a hidden div; needs
      `?schools=`) shows the new text.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: all nine locales resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` returns 0 for all nine locales, and
      `python3 scripts/check_figures.py --lang <code> --topic sports` is clean for all nine.
- [ ] `npm run check:digits`, `check:dates`, `check:bidi`, `check:fa`, `check:hi` and
      `check:fr` are clean.
- [ ] `node scripts/check_work_integrity.mjs` has run. It reports index-shift false alarms
      after a splice, so verify any flagged unit by stamp against HEAD.
- [ ] `npm run i18n:leaks -- --lang <code>` returns 0 on the HGCS pipeline paths for all nine
      locales.
- [ ] `npm run build` exits 0.
- [ ] Browser check on `/school/hickory-grove-christian?lang=es&topic=sports` and `?lang=fa`,
      card open:
      - the prose is translated;
      - `2024–26` is intact and the `fa` range is not reversed (probe with the card
        **closed**, on the teaser);
      - the roster sport chips read the locale's Baseball and Football.

      On `/compare?lang=es&topic=sports&schools=hickory-grove-christian`, HGCS shows 0 / 4.

## Risks

| Risk | Mitigation |
|---|---|
| A roster sport path lands on no unit after the reorder and renders English | Splice by stamp, then run `check:live` and `i18n:leaks` on `hickory-grove-christian:pipeline.roster[*].sport` |
| The `'4'` value path creates a new unit instead of joining 694 | Expect a path move only; if the splice reports a new metric-values value unit, stop and look |
| Another session's files get swept into the commit | Stage explicit paths and run `git status --short` before each commit |

## Open questions

- **Prose wording** settles at the Phase 1 review. **Default:** as written in steps 3 and 4.
