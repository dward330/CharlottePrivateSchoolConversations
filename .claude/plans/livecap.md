---
name: livecap
title: Fix check:live's findings cap, which truncates the list while the summary counts every finding
status: implemented
phases: 1
created: 2026-08-24
branch: fix/livecap
prs: [209]
---

# Fix check:live's findings cap

## Goal

`npm run check:live` prints at most **8** unresolvable-stamp findings per run while its
closing summary reports the true total. A maintainer who reads the printed list and treats
it as the worklist silently misses everything past the eighth finding.

We will know it worked when a run with more than 8 findings prints a truncation line saying
how many were withheld, and `--verbose` prints all of them.

## Context

### The defect

`scripts/check_live_resolution.mjs`:

```js
let unresolvable = 0                      // line 576 — declared ONCE, per run
…
for (const file of files) {               // line ~641 — loops over every overlay file
  for (const s of shipped.strings) {
    checked++
    if (!liveStamps.has(s.of)) {
      unresolvable++
      if (unresolvable <= 8) {            // line 666 — THE CAP
        console.error(`  ✗ ${file}: stamp ${s.of} occurs nowhere in live src/data English…`)
      }
    }
  }
}
…
if (unresolvable) {                       // line 733 — quotes the TRUE total
  console.error(`\n✗ ${unresolvable} shipped entr… cannot resolve against live English.`)
  process.exit(1)
}
```

Two things make this worse than it first looks:

- **`unresolvable` is a per-RUN counter, not per-file.** It is declared once at line 576
  and incremented across every overlay file in the loop. So the cap is 8 findings for the
  *entire* invocation — not 8 per file, as the code reads at a glance.
- **Nothing announces the truncation.** The list simply stops. The summary says a larger
  number, but nothing connects the two, so the printed list reads as complete.

### How it actually bit

Found during `citeurls` Phase 2 (PR #206). `check:live` reported `10 shipped entries
cannot resolve` and printed **8** stamps. The worklist was read off the printed list, so the
two findings it withheld — `carmel-christian:verdict.points[4].label` and `.text`, the
visit-checklist item Phase 1 had rewritten — were missed. They were recovered only by
diffing a fresh extract by stamp, which is a different technique that happened to be run.

The failure mode is quiet by construction: the withheld entries render English at runtime
while coverage still reports 100%, which is precisely the condition this checker exists to
catch.

### The fix already has a precedent in this repo

`scripts/check_runtime_resolution.mjs:286-288` solves the identical problem correctly:

```js
if (badValues.length > SHOW) {
  console.error(`   ... and ${badValues.length - SHOW} more (display capped, not collection)`)
}
```

It uses a named `SHOW` constant (`15` at line 247, `20` at line 265) and its wording —
*"display capped, not collection"* — states exactly the distinction that was lost here.
Follow this; do not invent a new convention.

### `--verbose` already exists in this file

`scripts/check_live_resolution.mjs:598` declares `const VERBOSE = args.includes('--verbose')`
and currently uses it at line 634 only, for `verifyForeignTopic`. Reuse the same flag rather
than adding a second one.

### The runner does not forward args

`scripts/check_live_all.mjs:35-39` invokes the per-locale checker with a fixed argument list:

```js
execFileSync('node', [ …'check_live_resolution.mjs', '--lang', lang ], { encoding: 'utf8' })
```

So `npm run check:live -- --verbose` reaches the runner but **not** the per-locale
checker. Threading it through is part of this change.

Note also line 40: on success the runner prints only `slice(-2)[0]` — the second-to-last
line. That is fine for the pass path but means the runner is already selective about what
it surfaces; the failure path (lines 44-46) dumps the full child output, which is where the
truncation line will appear.

## Decisions

- **Keep a default cap; do not print everything by default** — the citeurls run had 10
  findings, but the historical `check:live` failure was **4,646** false positives
  (`CLAUDE.md`, and this file's own header comment at line 44). Uncapped output at that
  scale is unreadable and would bury the summary. The defect is the *silence*, not the cap.
- **Name the cap `SHOW` and set it to 20** — matches `check_runtime_resolution.mjs:265`. The
  magic `8` becomes a named constant at the top of the reporting section.
- **Reuse the existing `--verbose` flag** rather than adding `--all`, since the file already
  parses it and a second flag with overlapping meaning is worse than one.
- **Count findings per run, not per file** — leave the counter's scope as-is. Changing it to
  per-file would alter the summary total, which is currently correct and is the one part of
  the output that never lied.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic. This changes
only a developer-facing script's stderr output.

## Out of scope

- **The `slice(0, 80)` truncation of the `t:` preview line.** That shortens one field for
  display and is not misleading — it is visibly cut mid-string.
- **`check_runtime_resolution.mjs`** — it already does this correctly; it is the model, not
  a target.
- **`check_fr_identifiers.mjs:179` (`hits.slice(0, 12)`) and `check_chrome_keys.mjs:250`
  (`values.slice(0, 8)`).** Both cap display too. Audit them in step 5 and report, but only
  change them if the same silent-truncation shape is present — do not refactor them
  speculatively.
- **Any change to what counts as unresolvable.** The detection logic is correct and is not
  being touched.

## Steps

**Single-phase — adds no user-facing text.** This changes a developer-facing script's
stderr output only; no `src/locales/*.json` key, no `src/data` prose, nothing a parent reads.

1. **Add a named cap constant** in `scripts/check_live_resolution.mjs`, near the reporting
   section (adjacent to `let unresolvable = 0`, line 576). `const SHOW = 20`, with a
   one-line comment noting it caps *display* only, mirroring
   `check_runtime_resolution.mjs:265`.

2. **Replace the magic cap** at line 666. Change `if (unresolvable <= 8)` to
   `if (VERBOSE || unresolvable <= SHOW)`. `VERBOSE` is already in scope from line 598 —
   confirm it is declared *before* this loop and move the declaration up if not.

3. **Print a truncation line** immediately after the per-file loop closes (before the
   `console.log` summary at line ~677), only when `!VERBOSE && unresolvable > SHOW`:

   ```
   ... and ${unresolvable - SHOW} more (display capped, not collection) — re-run with --verbose
   ```

   Match `check_runtime_resolution.mjs:287`'s wording, extended with the `--verbose` hint
   since that flag exists here.

4. **Forward `--verbose` through the runner.** In `scripts/check_live_all.mjs`, read
   `process.argv` for `--verbose` and append it to the `execFileSync` argument array at
   lines 35-39 when present. Verify `npm run check:live -- --verbose` reaches the child.

5. **Audit the two sibling caps** named in *Out of scope* — `check_fr_identifiers.mjs:179`
   and `check_chrome_keys.mjs:250`. For each, determine whether it announces its truncation
   or is silent like this one was. Fix any that are silent using the same wording; if both
   are fine, **say so explicitly in the PR** rather than staying quiet about the audit.

## Verification

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds; `check:live` is chained into it and must stay green
- [ ] `npm run check:live` — passes on current `main` (all 9 locales resolve), with **no**
      truncation line, since there are 0 findings
- [ ] **Negative test — this is the point of the change.** Per
      `negative-test-must-isolate-the-assertion`: corrupt the **artifact**, not an upstream
      input. Hand-edit one shipped overlay (`src/data/overlays/college-support.es.json`),
      changing ~25 `of` stamps to invalid values, then run
      `node scripts/check_live_resolution.mjs --lang es`. Assert **all four**:
        1. exactly `SHOW` (20) findings print,
        2. the truncation line appears and reads `... and 5 more`,
        3. the closing summary still reports the true total (25),
        4. exit code is 1.
      Then re-run with `--verbose` and assert all 25 print and no truncation line appears.
      **Restore the file with `git checkout` afterwards** and confirm `git status` is clean.
- [ ] `npm run check:live -- --verbose` — runs green through the runner, proving step 4's
      passthrough works end to end
- [ ] Step 5's audit result stated explicitly, either way

No browser check: this change produces no rendered output.

## Risks

| Risk | Mitigation |
|---|---|
| **The negative test is left in the tree**, shipping a corrupted overlay. | Verification requires `git checkout` of the overlay and a clean `git status` before the PR. `check:live` is a build gate, so a corrupted overlay would also fail `npm run build` — but do not rely on that as the only catch. |
| **`VERBOSE` is declared after the loop that now uses it**, producing a TDZ `ReferenceError` at runtime rather than a compile error. | Step 2 says to confirm the declaration order and move line 598 up if needed. The negative test exercises this path, so a mistake surfaces there. |
| **Uncapping via `--verbose` reproduces the unreadable 4,646-line output** that made this checker unusable before PR #167. | That is the opt-in path, requested deliberately. The default stays capped, which is why step 1 keeps a cap rather than removing it. |

## Implementation notes

Built as planned; no deviations.

Two details the plan flagged as needing confirmation, both resolved without a change:

- **`VERBOSE` declaration order.** Line 598 already sits ahead of the per-file loop
  (line ~641), so step 2's contingency — moving the declaration up — was not needed and
  the TDZ risk never materialised.
- **Step 5's audit found neither sibling cap to be silent**, so neither was touched:
  `check_fr_identifiers.mjs:179` announces its truncation three lines later
  (`…and ${hits.length - 12} more`), and `check_chrome_keys.mjs:250` caps only the
  informational sample printed on the `!prefix` "rendered verbatim by design" branch,
  where there is nothing to fix — its actual finding paths print `values` uncapped.

The negative test asserted all four conditions on the capped run (20 printed, `... and 5
more`, summary reporting the true 25, exit 1) and both on the `--verbose` run (25 printed,
no truncation line). The overlay was restored with `git checkout` and `git status` was
clean before the commit.
