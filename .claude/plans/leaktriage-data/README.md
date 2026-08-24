# leaktriage — Phase 1 work artifacts

Phase 2 runs in a **fresh window** with no memory of the triage session, so these are
committed rather than left in a session scratchpad (a deliberate deviation from the plan's
step 5, which said "keep it in the scratchpad").

- `triaged-147.json` — all 147 leak-shaped strings with `verdict` (LEAK / KEEP /
  ENGLISH-FIX) and a `reason`. The full Phase 1 record.
- `phase2-leaks.json` — the 133 LEAK strings only, each with:
  - `en` — the English text
  - `targets` — the 1–2 locales that must be edited (NOT all nine)
  - `paths` — `topic::school:fieldpath` for locating the entry
  - `reference` — how other locales already rendered it, as translation evidence

Workload: **174 (string, locale) edits**, plus one re-translation in all nine of the
repaired `St. Augustine Club` note.

Per locale: `fa` 43 · `te` 40 · `bn` 25 · `fr` 20 · `hi` 18 · `it` 12 · `es` 10 ·
`ht` 3 · `ar` 3.

The KEEP decisions are recorded durably in `src/data/overlays/NOTES.md` — that ledger,
not this folder, is the artifact meant to outlive the plan.
