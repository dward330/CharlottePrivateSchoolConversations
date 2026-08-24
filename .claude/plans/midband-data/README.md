# midband — triage record and Phase 2 worklist

Written by Phase 1 of [`../midband.md`](../midband.md). Phase 2 runs in a **fresh window**,
so everything it needs is here rather than in the scratchpad.

| File | What it is |
|---|---|
| `triage.mjs` | The **verdicts**. `TRIAGE[english] = {v:'LEAK'\|'KEEP', why, langs?}`. `langs` narrows a verdict to specific locales — the same string is legitimately a leak in one and a keep in another (PR #190). |
| `build-worklist.mjs` | Regenerates `worklist.json` from `triage.mjs` + the live work files. Run from the repo root: `node .claude/plans/midband-data/build-worklist.mjs`. |
| `worklist.json` | **What Phase 2 edits.** `leaks[]` rows are `(lang, topic, idx)` pointing at `src/data/overlays/work/<topic>.<lang>.json` `strings[idx]`. `keeps[]` is the ledger, already written into `src/data/overlays/NOTES.md`. |
| `raw-candidates.json` | The unfiltered detector output plus cross-locale banding, kept so the numbers can be re-derived. |
| `triage-context.txt` | Every candidate with its translated siblings — the evidence each verdict was made on. |

## The numbers

- **1,172** `(string, locale)` edits · **237** distinct strings → translate
- **612** keep rows · **102** distinct strings → ledger
- Per locale: `es` 168 · `bn` 105 · `ht` 125 · `te` 204 · `fr` 109 · `fa` 57 · `it` 117 · `hi` 186 · `ar` 101

## Two rules that decided most of it

1. **Adjudicate on the locale's own siblings**, never on the cross-locale majority. That is
   the correction PR #190 had to make 74 times.
2. **The conventions** (grade/time, money/unit, dates) are in `NOTES.md`: translate the
   word, keep every digit, clock token and date number char-for-char. The carve-out —
   a grade word followed by a subject noun is a **course title**, kept — is what stops the
   rule translating `Sixth Grade Bible`.

## One known English-side defect for Phase 2

`it` renders `Rising 9th–12th` as `In ingresso Rising 9th–12th` — the English word was left
in front of the translation. Neither detector reports it (the value differs from English, so
both consider it translated). Fix it with the convention class.
