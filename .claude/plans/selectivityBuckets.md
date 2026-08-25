---
name: selectivityBuckets
title: Make the acceptance-list bucket filters agree with the master rank table
status: implemented
phases: 1
created: 2026-08-25
branch: fix/selectivity-buckets
prs: [213]
---

# Make the acceptance-list bucket filters agree with the master rank table

## Goal

On every school's **Where Graduates Go** acceptance list, the `Top-75 National` and
`Top-75 Liberal` filter chips currently show the wrong set of colleges. They are driven by
a hand-typed `cats` array per college per school, which has drifted from
`COLLEGE_RANKINGS` — the master table that renders the rank label sitting **right beside
the college name on the same row**.

The user-visible symptom: click **Top-75 National** and `University of Arizona` appears
with `National Rank #127` printed next to it. The filter and the label contradict each
other on one line.

Done means `nu75` / `lac75` membership is derived from — and provably agrees with — the
master table, for all 11 schools, and a build gate makes the two impossible to diverge
again.

## Context

### How the list works today

- `src/data/collegeSupport.ts:281-296` defines `type College = { name, cats, enrolling? }`.
  `cats` holds bucket keys: `'ivy' | 'ivyplus' | 'nu75' | 'lac75' | 'p4' | 'hbcu'`.
- `COLLEGE_FILTERS` (`src/data/collegeSupport.ts:299-307`) renders the chips:
  `All`, `Ivy League`, `Ivy Plus`, `Top-75 National`, `Top-75 Liberal`, `Power Four`, `HBCUs`.
- Per-school data lives in `src/data/collegeSupportPrograms/<slug>.ts` — **11 schools,
  2,568 college entries** in total.
- The rank label is **not** stored on the college. It resolves at render time from
  `COLLEGE_RANKINGS` in `src/data/collegeRankings.ts` via `rankLabelFor(name)`, so a rank
  lives in exactly one place. That file is the declared **GENERATED SOURCE OF TRUTH**
  (its own header, line 1).
- `rankLabelFor` applies an `ALIAS` map (`src/data/collegeRankings.ts:~500-540`) before
  lookup, so `Franklin & Marshall College` resolves via `Franklin and Marshall College`.

**This is the whole reason the bug is fixable cheaply:** the rank is authoritative and
already correct; only the hand-typed `cats` drifted.

### The measured defect, 2026-08-25

Audited with the **real `rankLabelFor`** (aliases applied — see the trap below), across all
11 schools and 2,568 entries:

| Class | Tags | Distinct college×bucket pairs |
|---|---|---|
| **Over-inclusion** — tagged, resolves, does NOT qualify | **27** | 7 |
| **Under-inclusion** — qualifies by rank, NOT tagged | **155** | 76 |
| Tagged but name unresolvable | **0** | 0 |
| **Total tag edits** | **182** | |

Every over-inclusion:

| Tags | Bucket | College | Rank |
|---|---|---|---|
| 8× | `nu75` | University of Arizona | National Rank #127 |
| 5× | `nu75` | University of Delaware | National Rank #88 |
| 4× | `nu75` | University of Colorado Boulder | National Rank #97 |
| 4× | `nu75` | University of Tennessee | National Rank #102 |
| 3× | `lac75` | Allegheny College | Liberal Rank #76 |
| 2× | `nu75` | University of Colorado | National Rank #97 |
| 1× | `lac75` | Tougaloo College | Liberal Rank #180 |

**Under-inclusion is the larger and less visible half** — 155 tags over 76 pairs. Worst
offenders include `University of California (Los Angeles)` (**National Rank #17**, untagged
in 4 schools), `University of California (Berkeley)` (#15), `Rensselaer Polytechnic
Institute` (#64, 7 schools), `George Washington University` (#59, 7 schools). These render
their rank label but **vanish** when the reader clicks Top-75 National.

The full 182-row worklist is committed at
[`.claude/plans/selectivityBuckets-data/worklist.tsv`](selectivityBuckets-data/worklist.tsv)
(`ACTION / BUCKET / SCHOOL / COLLEGE / RANK`, one row per edit), alongside the probe that
generated it.

### Hand-tagging is the confirmed cause

`University of Arizona` carries `nu75` in **8 of 9** schools that list it — and correctly
carries only `p4` in `charlotte-catholic.ts:184`. One school out of nine got it right,
which is the signature of per-school hand entry rather than a systematic rule.

### The trap that will bite the implementer

**Do not audit by parsing `COLLEGE_RANKINGS` directly — call `rankLabelFor()`.** A first
pass during planning parsed the raw table and reported six colleges as
`NO RANK IN MASTER`, including `College of William & Mary` and `Franklin & Marshall
College`. Both **do** resolve, via the `ALIAS` map, and both are ranked inside the top 75
(#51 and #35) — so they are *under*-inclusions, the exact opposite of the "unranked, remove
the tag" conclusion the naive parse implied. Using the real resolver moved the unresolved
count from 6 to **0**.

### The nearest analogous feature

`scripts/check_rank_labels.mjs` (`npm run check:ranks`) already enforces a related rule
from a user decision: any college in a ranked bucket must resolve to a label. It is
**chained into `npm run build`** (`package.json:8`) and runs under plain Node because the
data modules use type-only imports. The new checker follows its shape, its exit-code
convention (0 clean / 1 violations / 2 setup error), and its docstring style.

Note what `check:ranks` deliberately does *not* do: it verifies a tagged college **has** a
rank, never that the rank **matches the bucket**. That gap is exactly this defect, and it
is why 27 wrong tags shipped past a green build.

## Decisions

- **Fix the data and add a checker; do not derive `cats` at render time.** — User-chosen
  from three options, 2026-08-25. Deriving would make divergence impossible by
  construction, but it touches the render path and the shape of all 2,568 entries. Fixing
  the data plus a build gate gets the same guarantee at far lower risk, and mirrors how
  `check:ranks` already works.
- **Fix both directions** — user-chosen, 2026-08-25. Over-inclusion alone was the reported
  bug, but it is the smaller half; leaving 155 qualifying colleges hidden behind their own
  filter would be a half-fix.
- **`nu75` = National rank ≤75; `lac75` = Liberal rank ≤75. Inclusive.** Derived from the
  chip labels (`Top-75 National` / `Top-75 Liberal`). A college whose label is a **band**
  (`National Rank #395-434`) never qualifies — those bands are all far outside 75.
- **Only `nu75` and `lac75` are touched.** `ivy`, `ivyplus`, `p4` and `hbcu` are membership
  facts not derivable from a US News rank, so no rank-based rule can audit them.
- **Ties are included on the printed number.** Six colleges share `National Rank #59`;
  all qualify. The label is what the reader sees, so the label is the test.
- **A college with no rank label keeps its non-rank buckets.** Removing `nu75` from
  `University of Arizona` leaves `cats: ['p4']`, never `cats: []`.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic; no reordering
and no component, layout or styling change. This corrects data behind an existing card and
adds a `scripts/` checker — squarely inside the "allowed" column of the UX-design standard.

One boundary worth stating: `COLLEGE_FILTERS` and the chip labels are **unchanged**. If the
implementer concludes a chip needs renaming, that is a UX change and needs approval first.

## Source material

**None fetched.** This plan reads only data already in the repo — no external source was
consulted, because `COLLEGE_RANKINGS` is already the committed source of truth with its
human-readable companion at
`source-material/college-support/_shared/US News 2026 - Rank Labels.md`.

Two artifacts **are** staged, committed with the plan (they are planning output, not
research data, so they do not go through `ingest-source-material`):

- `.claude/plans/selectivityBuckets-data/worklist.tsv` — the 182 edits.
- `.claude/plans/selectivityBuckets-data/audit-probe.mjs` — the probe that produced it.

## Out of scope

- **`ivy` / `ivyplus` / `p4` / `hbcu` tags** — not derivable from a rank; untouched.
- **Adding or correcting any rank in `COLLEGE_RANKINGS`.** The master is taken as correct.
  If a rank looks wrong, report it — do not edit it here.
- **Renaming chips or changing `COLLEGE_FILTERS`** — a UX change, needs approval.
- **Deriving `cats` at render time** — explicitly declined above.
- **The nine locale overlay copies** of each `collegeSupportPrograms` file. `cats` is
  structural data, not prose; the overlays carry translated text and are not re-tagged.
  Confirm this holds (step 6) rather than assuming it.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Single-phase — adds no user-facing text.** Every string already exists; only `cats`
arrays and a new script change. No `src/locales/` work, no overlay work, no review gate.

1. **Reproduce the audit.** Run `.claude/plans/selectivityBuckets-data/audit-probe.mjs`.
   Confirm **27 over / 155 under / 0 unresolved** across 2,568 entries in 11 schools. If
   the numbers differ, the data moved since planning — regenerate `worklist.tsv` and use
   the new figures rather than the ones written above.

2. **Write `scripts/check_selectivity_buckets.mjs`** (`npm run check:buckets`), modelled on
   `scripts/check_rank_labels.mjs`:
   - Import `rankLabelFor` from `src/data/collegeRankings.ts` — **never re-parse the
     table**, per the alias trap in Context.
   - For every college in every non-locale `src/data/collegeSupportPrograms/*.ts`, assert
     `cats.includes('nu75') === (National && rank ≤ 75)` and the same for `lac75`.
   - Report both directions separately and name every violation as
     `school · college · rank · expected/actual`.
   - Exit 0 clean / 1 violations / 2 setup error.
   - Docstring: why the rule exists, that the master is authoritative, the alias trap, and
     that `ivy`/`ivyplus`/`p4`/`hbcu` are deliberately unchecked.

3. **Confirm the checker fails before it passes.** Run it *before* fixing any data and
   confirm it reports exactly the 182 violations from step 1. A checker written after the
   fix that reports 0 has proven nothing — this repo has a standing lesson about negative
   tests that pass while proving nothing.

4. **Apply the 182 edits** from `worklist.tsv` across the 11
   `src/data/collegeSupportPrograms/*.ts` files — `REMOVE` drops the key from `cats`,
   `ADD` inserts it. Preserve existing key order and never leave `cats: []` where another
   bucket applies. A scripted edit is fine; the checker is the verification either way.

5. **Re-run the checker — expect 0.** Then `npm run check:ranks` to confirm no
   ranked-bucket college lost its label resolution.

6. **Verify the locale overlays were not invalidated.** Confirm `cats` does not appear in
   the nine `collegeSupportPrograms/*.<lang>.ts` overlay copies (or, if it does, that the
   values still agree). State the finding explicitly — "checked, not applicable" is a
   result; silence is not.

7. **Chain `check:buckets` into `npm run build`**, after `check:ranks` in `package.json:8`,
   so the two rank rules sit together.

8. **Browser check on two schools.** Open `/school/providence-day/` and
   `/school/cannon/` (the two richest lists), click **Top-75 National** and **Top-75
   Liberal**, and confirm: `University of Arizona` is **absent** from Top-75 National, and
   `University of California (Los Angeles)` is **present**. Spot-check that every visible
   row's printed rank agrees with the active chip. This repo's standing lesson is that
   render-layer defects survive every automated check.

9. **Update `.claude/docs/DATA-SCHEMA.md` if it describes the buckets** — regenerate with
   `npm run schema`, then `npm run check:schema`. If no update is needed, say so
   explicitly rather than skipping silently.

## Files touched

| File | Change |
|---|---|
| `src/data/collegeSupportPrograms/*.ts` (11 files) | edit — 182 `cats` corrections |
| `scripts/check_selectivity_buckets.mjs` | **new** — the bucket/rank agreement gate |
| `package.json` | edit — add `check:buckets`, chain into `build` |
| `.claude/plans/selectivityBuckets.md` | edit — implementation notes |

## Verification

- [ ] `node .claude/plans/selectivityBuckets-data/audit-probe.mjs` — matches step 1
- [ ] `npm run check:buckets` reports **182 violations before** the fix (step 3)
- [ ] `npm run check:buckets` exits **0 after** the fix
- [ ] `npm run check:ranks` — clean
- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — no new warnings (one pre-existing, `check_fa_script.mjs`)
- [ ] `npm run build` — succeeds with `check:buckets` in the chain
- [ ] `npm run check:schema` — clean
- [ ] Browser check on both schools: Arizona absent, UCLA present under Top-75 National
- [ ] Overlay finding stated explicitly (step 6)

## Risks

| Risk | Mitigation |
|---|---|
| **A bulk edit corrupts a data file** — 182 edits across 11 files touching hand-authored TS. | `npx tsc --noEmit` plus `check:ranks` and the entry count (2,568) from the probe; a dropped entry changes the count. |
| **The master rank table is itself wrong for some college**, so a "fix" propagates an error. | Out of scope by decision, but the checker prints the rank beside every change, so a wrong rank is visible in the diff rather than silent. Report, don't edit. |
| **A rank changes next US News cycle** and 182 tags go stale again. | This is exactly what `check:buckets` in the build chain prevents — the build fails until `cats` is re-synced. |
| **The band format (`#395-434`) or a future label shape parses unexpectedly.** | Test the parse against every distinct label in the master, not just the numeric ones; treat an unparseable label as "does not qualify" and print it. |

## Open questions

- **Should `p4` / `hbcu` get their own source-of-truth table and checker?** They have the
  same hand-typed drift risk with no master to check against. — **default:** out of scope
  here; raise as a follow-up if the `nu75`/`lac75` fix goes cleanly.
- **Does any school's list intend `nu75` to mean "top-75 at the time of that graduating
  class"** rather than current US News? — **default:** no. Nothing in the data or the card
  suggests a historical reading, and the label rendered beside it is the current rank, so
  the two must agree.

## Implementation notes

Shipped as planned — all 182 tag edits applied, checker added and chained into the build.
Three things worth recording.

**The entry count in this plan (2,568) was an undercount; the real figure is 2,700.** The
planning probe found colleges with a single-quote regex, and
`hickory-grove-christian.ts` stores its acceptance list as **JSON-style double-quoted**
objects (`{"name":"…","cats":[]}`), so **129 of its 132 colleges were invisible to the
audit**. A further 3 phantom matches in `carmel-christian.ts` were `ncAdmissions` rows,
not colleges. `check_selectivity_buckets.mjs` avoids this entirely by *importing* the
modules rather than parsing them, which is why it reports 2,700.

**The worklist was nonetheless complete.** Before applying anything, the checker's
findings were diffed against `worklist.tsv` school by school: identical counts on all 11
(providence-day 34, cannon 29, gaston-day 26, charlotte-country-day 25, charlotte-latin
25, charlotte-christian 17, davidson-day 14, carmel-christian 7, covenant-day 5,
charlotte-catholic 0, hickory-grove-christian 0). Hickory Grove's hidden 129 entries are
genuinely correctly tagged — almost all `cats: []` — so the blind spot cost no edits. The
182 figure stands; only the denominator was wrong. The lesson is the one already recorded
for unit conversions: **a probe's population is a lower bound on the data, not a census
of it.** Two quote styles coexist in this directory.

**`cats: []` is a correct outcome in three cases, not a corruption.** `University of
Delaware`, `Allegheny College` and `Tougaloo College` held *only* the wrong bucket, so
removing it correctly leaves an empty array — the plan's "keeps its non-rank buckets" rule
had no other bucket to keep. `University of Arizona` is the case the rule was written for
and correctly became `cats: ['p4']`.

**Verification beyond the plan's list.** The browser check was run as a negative test as
well as a positive one: with the data changes stashed, the probe reproduces the reported
bug exactly (Arizona at `National Rank #127` visible under Top-75 National, UCLA absent),
and reports 0 contradictions once restored. Across both schools and both chips, all 225
visible ranked rows agree with their active chip.

**Step 9 — no schema change needed.** `npm run check:schema` reports the doc up to date.
`DATA-SCHEMA.md` catalogs cards, cards' field sets and Compare rows; bucket *membership*
is per-college data underneath an existing card, which the doc does not enumerate. Stated
explicitly rather than skipped.

**Observation, deliberately not acted on (out of scope).** `scripts/check_rank_labels.mjs`
carries a hardcoded 9-school `SCHOOLS` list, so `gaston-day` and `hickory-grove-christian`
are **not covered by `check:ranks`** — it has been silently checking 9 of 11 schools since
those two were added. The new `check:buckets` reads the directory instead and covers all
11. Worth a follow-up to make `check:ranks` directory-driven the same way.
