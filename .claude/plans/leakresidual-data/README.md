# leakresidual — Phase 1 triage output

Committed rather than left in a scratchpad, because the Phase 2 window is a **fresh
session** and cannot read this one's temporary files. Same deviation `/implement` made
deliberately for `leaktriage` (#190) and `midband` (#193).

## What is here

| File | What it is |
|---|---|
| `phase2-worklist.json` | **The Phase 2 input** — the 9 confirmed `(string, locale)` leaks to translate. |
| `verdicts.json` | All 59 triaged pairs, LEAK and KEEP, each with its reason. |
| `aggregate.mjs` | Rebuilds the leak-shaped residual from the nine work files. |
| `worklist.mjs` | Cross-references that residual against the KEEPS ledger in `NOTES.md`. |
| `triage.mjs` | Applies the per-locale KEEP conventions and prints the verdicts. |
| `siblings.mjs` | Ad-hoc helper: show how one locale treats the siblings under a path prefix. |

## Reproducing

```sh
node .claude/plans/leakresidual-data/aggregate.mjs /tmp/residual.json
node .claude/plans/leakresidual-data/worklist.mjs  /tmp/residual.json /tmp/untriaged.json
node .claude/plans/leakresidual-data/triage.mjs    /tmp/untriaged.json /tmp/verdicts.json
```

## The headline numbers

```
leak-shaped rows (kept<=2, translated>=2, len>=15)   70
  already settled in the KEEPS ledger (#190/#193)    24 rows
  genuinely untriaged (string, locale) pairs         59
    -> LEAK   9
    -> KEEP  50      ratio 1 : 5.56
```

**The plan's Context section did not reproduce, and that is the main Phase 1 finding.**
It predicted 106 leak-shaped strings with `ar 38` and `financial-aid-report 36`. The real
figures are **70**, with `ar 3` and `financial-aid-report 1`. Every other locale matched
almost exactly (`te` 32 vs 33, `fa` 16, `it` 10, `fr` 10, `hi` 7, `bn` 6, `ht` 1), so the
discrepancy is isolated to those two headline claims rather than being a general drift.

It is **not** stale data: `src/data/overlays/work/financial-aid-report.ar.json` has not been
touched since PR #150, well before #190/#193, so nothing translated those 36 away. Even the
raw unfiltered detector output for `ar` contains exactly **1** `financial-aid-report` item.
The plan's two figures appear to be a measurement error in the planning document.

## Why the KEEP ratio is high, and why that is the expected result

The plan predicted it ("the translatable subset is likely well under half") and the prior
two passes each hit the same thing — #190 corrected 74 rows, #193 reclassified 182. Five of
this pass's own provisional LEAK calls were overturned by measurement before being written
down; they are recorded in the ledger so a fourth pass does not re-derive them.
