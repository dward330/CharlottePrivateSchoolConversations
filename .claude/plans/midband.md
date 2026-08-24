---
name: midband
title: Build the within-locale sibling detector, then triage the mid-band and what it finds
status: english-done
phases: 2
created: 2026-08-23
branch: i18n/midband
prs: []
---

# Build the within-locale sibling detector, then triage what it finds

## Goal

`leaktriage` (PR #190) closed the ≤2 cross-locale band and, in doing so, concluded that the
cross-locale diff is **a good detector and a poor adjudicator** — it cannot see how a locale
treats a string's siblings in the same card, which is the evidence that actually decides
LEAK vs KEEP. That conclusion was reached by hand, 74 times, and then written down and left
as prose.

This plan **builds that check as a script**, then uses it — together with one convention
decision for grade/time labels — to work the strings `leaktriage` deliberately deferred.

We will know it worked when `npm run i18n:siblings` exists and reports the within-locale
holdouts, the grade/time convention is applied uniformly across all nine locales, and every
string the two surface is either translated or carries a ledger line.

## Context

### What `leaktriage` left, and why the numbers below differ from its own

`leaktriage` recorded two follow-ups and one loose end. **All three of its figures are
wrong**, re-measured against the work files on 2026-08-23 *after* PR #190 merged. The
corrected numbers are what this plan is scoped to.

Current banding — for each distinct English string, how many of the nine locales keep it
identical to English:

| Kept by | Distinct strings | `leaktriage` said | Reading |
|---|---|---|---|
| 1–2 locales | 266 (109 at ≥15 chars) | — | closed by PR #190 |
| 3–6 locales | **382** | 377 | the "mid-band" |
| 7+ locales | **1,934** | **77** | consensus keeps |

**The 7+ figure was out by a factor of 25, and the reason matters.**
`scripts/find_english_leaks.mjs` defaults to `--min 2`: it only reports a string if **≥2
reference locales translated it**. A string kept by 7 or more of 9 almost never clears that
bar, so it never enters the queue. The ledger's "77" was *the subset the tool surfaced*,
not the population. Any plan that proposes "ledger lines for the 7+ band" is proposing
1,934 rows, not 77 — which is why this plan does not.

### The mid-band is not one convention question

`leaktriage` deferred the 3–6 band on the grounds that it is "dominated by grade/time
labels" needing "one convention decided once". Measured, it is not:

```
240  other prose/label   <-- the largest group, genuine per-string triage
127  grade/time label    <-- the convention decision
 11  money/unit
  4  date/season
```

Of the 240, **131 are ≥15 characters**. They are course-catalog lists, citation lines and
staff details — the same shapes `leaktriage` translated in the ≤2 band:

```
[bn,es,fr,hi,it,te]  "Belinda Jackson, Afterschool Director (704-531-4034)"
[bn,fr,hi,ht,it,te]  "Acting, Film Acting, Stagecraft I–II, Advanced Design"
[es,hi,it,te]        "charlottelatin.org — Arts Facilities gallery"
[bn,es,hi,it]        "— incl. Hampton, Howard, NC A&T, Florida A&M"
```

That last one is notable: `— incl. …` was triaged as a **genuine leak in `es`** during
PR #190 (`es` renders it `— entre ellos …`), and a sibling of it sits here untriaged.

### The detector this plan builds, and why it reaches further

Prototyped this session against the live work files. The rule: within **one locale**, group
entries by `(topic, school, parent path)` — e.g. `covenant-day:coverage.facts` — and flag a
group where **1–2 entries are still English while ≥3 siblings are translated**.

- **865 candidates** across the nine locales (`bn` 114 · `fr` 106 · `te` 97 · `ar` 94 …)
- **182 distinct strings**

The decisive property is where those 182 fall in the cross-locale banding:

| Their cross-locale band | Count |
|---|---|
| 1–2 | 43 |
| 3–6 | 46 |
| **7+** | **93** |

**93 sit in the band `leaktriage` declared "no work warranted".** The cross-locale tool
*structurally cannot* see them — they are strings 7+ locales keep, so `--min 2` excludes
them — yet within a single card they are a lone English cell among translated siblings.
This is the blind spot, and it is why the detector is the deliverable rather than a
by-product.

It is emphatically **a review queue, not a defect list**. The same prototype surfaces
obvious correct keeps (`Johnson Scholarship, Washington & Lee (2026)`,
`St. Augustine Scholars Program`) alongside obvious leaks (`Relax/Choice Time`, kept while
11 siblings are translated).

### The tool to mirror

`scripts/find_english_leaks.mjs` is the model — match its shape rather than inventing one:

- reads `src/data/overlays/work`, handling **both** unit shapes (`raw.strings ?? raw.sections`)
- discovers topics from the filenames; no hardcoded topic list
- skips strings with no lowercase (`!/[a-z]/.test(en)`) — an acronym or code
- prints `── topic ──` group headers, then `[refs] path` + the quoted string
- closes with a total and an explicit *"REVIEW ITEM, not automatically a defect"* line
- exits 0 always

### The standing rule against new gates

`CLAUDE.md` records twice that this repo has parked a checker at a permanent non-zero and
watched it stop being read (`check:sepdrift`, `check:live`-at-4,646), and `leaktriage`
declined to make its ledger a gate for the same reason. **The new script ships as a report,
exit 0, and is not chained into `npm run build`.**

## Decisions

- **Build the detector first, then triage with it** — user-chosen. The detector is what
  outlives the pass; `leaktriage`'s retrospective identified exactly this check as missing,
  and without it the next rollout re-derives the method by hand a third time.
- **Name it `scripts/find_sibling_leaks.mjs`, script `i18n:siblings`** — parallel to
  `find_english_leaks.mjs` / `i18n:leaks`, so the pair reads as one kit.
- **Group by `(topic, school, parent path)`, not by topic** — a card renders one school's
  siblings together, so that is the unit a reader compares. Pooling schools would drown the
  signal.
- **Thresholds: ≤2 English holdouts, ≥3 translated siblings, ≥15 chars** — the prototype's
  values, which produce 865 candidates. Expose all three as flags so they can be loosened
  without editing the script.
- **Report only, exit 0, not in the build chain** — see the standing rule above.
- **Do not extend the ledger to the whole 7+ band** — 1,934 rows of documentation nobody
  will read. The 93 the detector surfaces get lines; the rest stay unlisted.
- **Two phases.** Phase 1 is the script plus the English-side convention decision; Phase 2
  is the translations. Same split, and same reason, as `leaktriage`: a mis-triaged string
  translated into nine locales is nine wrong values.
- **Ledger rows stay keyed by `(string, locale)`** — PR #190 established that the same
  string is legitimately a leak in one locale and a keep in another (`Cross country / track`
  is a KEEP in `te`, a real LEAK in `hi`).

## Approvals needed

**None.** No new card, section, sub-section, stat tile, Compare row, metric key or topic.
This adds a developer-facing script, corrects existing translated values, and extends a
documentation ledger. Nothing changes the app's UX.

## Out of scope

- **Ledger lines for the full 7+ band (1,934 strings).** Only the 93 the detector surfaces.
- **Making either checker a build gate.** Explicitly rejected; see Context.
- **Re-triaging the ≤2 band.** Closed by PR #190.
- **The `--report-identical` findings from `check:runtime`.** A superset measured
  differently, and already documented as report-only.
- **Changing `find_english_leaks.mjs`.** The new script sits beside it. Raising its `--min`
  default would flood every existing workflow.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Two phases — this changes user-facing research prose in nine locales.**

### Phase 1 — The detector, and the English-side decisions

1. **Write `scripts/find_sibling_leaks.mjs`.** Mirror `find_english_leaks.mjs`'s structure
   (see Context for the specifics it must match). Core logic:
   - load every `<topic>.<lang>.json` under `src/data/overlays/work`, taking
     `raw.strings ?? raw.sections`;
   - for each entry, for each path in `at`, derive the parent by stripping a trailing
     `[N]`, then a trailing `.field`, then a trailing `[N]` again — so
     `covenant-day:coverage.facts[2].label` → `covenant-day:coverage.facts`;
   - group by `(topic, parent)`; within each group split entries into English-identical vs
     translated;
   - flag groups where `1 ≤ kept ≤ MAX_KEPT` and `translated ≥ MIN_SIBS`, reporting each
     kept entry of `≥ MIN_LEN` chars;
   - skip entries with no lowercase, as the sibling tool does.
   - Flags: `--lang` (required), `--max-kept` (2), `--min-sibs` (3), `--min-len` (15).
   - Output: `── topic ──` headers; per row the parent path, the string, and a
     `n/m siblings translated` count. Close with a total and the *review queue, not a defect
     list* line. **Exit 0 always.**

2. **Register it** as `"i18n:siblings": "node scripts/find_sibling_leaks.mjs"` in
   `package.json`, beside `i18n:leaks`. **Do not** add it to the `build` chain.

3. **Verify the detector against PR #190's known answers.** It must flag
   `Relax/Choice Time` (`es`, 11 translated siblings) and must *not* flag the strings PR
   #190 recorded as consistency KEEPs — `ar`'s Charlotte Catholic department names, `te`'s
   National Merit tier strings, `fr`'s `Sessions N, M` labels — because in each of those the
   siblings are kept too, so no group qualifies. A detector that flags those is mis-grouping.
   Record the outcome in the plan's implementation notes either way.

4. **Decide the grade/time convention and apply it.** 127 strings of the form
   `TK · 1:00–3:00 pm`, `Gr 1–5 · 2:55–4:30`, `Kindergarten · 2:00–6:00 pm`. Four locales
   translate them, five do not. Pick **one** rule and apply it to all nine — the default is
   *translate the word, keep the clock and grade tokens char-for-char* (`Kindergarten ·
   2:00–6:00 pm` → `Kindergarten` translated, `2:00–6:00 pm` untouched), which is what the
   majority of already-translated instances do. This is an English-side **decision**, not an
   English-side edit: no `src/data` file changes, so no hashes move.

5. **Triage into LEAK / KEEP**, using the detector's output plus the 3–6 band's 131
   substantive strings (≥15 chars, non-grade/time). Apply the test PR #190 established:
   the cross-locale majority is the *detector*, the locale's own siblings are the
   *adjudicator*. Write the worklist to `.claude/plans/midband-data/`, not the scratchpad —
   Phase 2 runs in a fresh window, the deviation PR #190 already made and documented.

6. **Extend the ledger** in `src/data/overlays/NOTES.md` with the KEEPs, keyed by
   `(string, locale)`, and with the grade/time convention as a standing rule.

7. **Verify Phase 1 is inert for readers.** `npm run build` green; no rendered value
   changed, since no `t` has been edited yet.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the triage calls and the convention. Translating a mis-triaged
string multiplies the error by nine.

### Phase 2 — Translate the confirmed leaks

Scope is the **overlay layer** (`PROSE_TRANSLATED` in `src/lib/i18n.ts`) — research prose in
`src/data/**`, not the chrome catalogs. Read
`.claude/docs/prose-translation-architecture.md` for the mechanism; do not re-read a
rollout doc for a *register* rule, per `CLAUDE.md`.

1. **Translate each confirmed leak in its target locales**, editing
   `src/data/overlays/work/<topic>.<lang>.json` and rebuilding. Most strings need only the
   locales that kept them.

2. **Rebuild with the right builder.** `npm run i18n:build` (`i18n_build_overlay.mjs`) for
   the nine `src/data` topics — **but `financial-aid-tuition.content` needs
   `scripts/i18n_build_content_overlay.mjs`, with `--topic financial-aid-tuition` and no
   `.content` suffix.** The ordinary builder exits 0 and writes `{"strings": []}` for that
   topic, an empty overlay that silently falls back to English for all 70 blocks. This bit
   PR #190; see `NOTES.md`.

3. **Diff the shipped overlays against `HEAD` after rebuilding.** A rebuild is not a no-op:
   PR #190 found three blocks translated in the shipped file and English in the work file,
   so rebuilding regressed them. Treat any block you did not intend to touch as a
   regression.

4. **Honour the standing locale traps** — figures copied char-for-char; `hi`/`te` store the
   English 3-3-3 figure because the render layer regroups; `fa`/`ar` overlays store **no**
   bidi isolates (those are applied at render by `format.ts`). Recorded in `CLAUDE.md` and
   the rollout docs.

5. **Re-run both detectors** for all nine and confirm each locale's count fell by exactly
   its translated-edit count. Note a recorded KEEP still appears in either queue by design —
   both report *difference*, not defect — so "every flag gone" is not a reachable state.

6. **Update the ledger** with anything Phase 2 reclassified, as PR #190 did.

## Files touched

| File | Change |
|---|---|
| `scripts/find_sibling_leaks.mjs` | **new** — the within-locale detector (Phase 1) |
| `package.json` | edit — add `i18n:siblings`; **not** added to `build` (Phase 1) |
| `.claude/plans/midband-data/*.json` | **new** — triage record + Phase 2 worklist (Phase 1) |
| `src/data/overlays/NOTES.md` | edit — ledger rows + the grade/time convention (Phase 1 and 2) |
| `src/data/overlays/work/*.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — translations (Phase 2) |
| `src/data/overlays/*.json` | regenerated by the two builders (Phase 2) |
| `.claude/plans/midband.md` | edit — implementation notes |

## Verification

### Phase 1 — Detector and triage

- [ ] `node scripts/find_sibling_leaks.mjs --lang es` — runs, exits 0, reports groups
- [ ] Flags `Relax/Choice Time` in `es`; does **not** flag `ar`'s Charlotte Catholic
      department names, `te`'s National Merit tiers, or `fr`'s `Sessions N, M` (step 3)
- [ ] `npm run i18n:siblings -- --lang <l>` for all nine — total ≈865 candidates
- [ ] Every surfaced string classified LEAK or KEEP, none left undecided
- [ ] `src/data/overlays/NOTES.md` carries every KEEP with a reason, keyed `(string, locale)`
- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — exit 0, all chained checks pass
- [ ] `npm run check:runtime` and `npm run check:live` — green (nothing should have moved)

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every stamp resolves, value gates pass
- [ ] `npm run check:live` — live English matches every shipped stamp
- [ ] `npm run check:sepdrift -- --lang <l>` × 9 — 0 drifted figure tokens
- [ ] `npm run check:sources -- --lang <l>` × 9 — 0 English sources altered
- [ ] `npm run check:script`, `check:chrome`, `check:money`, `check:currency`, `check:bidi`
- [ ] `npm run check:fa`, `check:hi`, `check:fr`
- [ ] `git diff HEAD --stat src/data/overlays/*.json` reviewed — no unintended block changed
- [ ] `i18n:leaks` and `i18n:siblings` × 9 — each locale's count falls by exactly its edit count
- [ ] **Browser check**, panels forced open, on two schools across ≥4 locales including one
      RTL (`fa`/`ar`) and one lakh/crore (`hi`/`te`). Confirm new translations *render* —
      a stamp that fails falls back to English silently. Grep the rendered page for English
      in **table cells, chips and source lines**, where this class has always lived.

## Risks

| Risk | Mitigation |
|---|---|
| **The parent-path heuristic mis-groups**, flooding the report or missing groups. | Step 3 pins it against PR #190's known answers in both directions. Verified this session against `after-school.es.json`: it yields `covenant-day:coverage.facts`, `cannon:cost.fees` — correct granularity. |
| **865 candidates is too many to triage in one pass.** | They collapse to **182 distinct strings**, and whole groups resolve on one convention (as `ar`'s 11-of-12 department names did in PR #190). If it still overruns, ship the detector and the grade/time convention, triage the rest as a follow-up — the detector is the durable half. |
| **The new script becomes a de-facto gate** because someone chains it into `build`. | Exit 0 always; the docstring says report-only and names the two checkers this repo has already parked at a permanent non-zero. |
| **Rebuilding regresses translations** (PR #190 hit this). | Step 2 names the correct builder per topic; step 3 requires diffing shipped overlays against `HEAD` afterwards. |
| **A KEEP is mis-triaged as a LEAK** and a course code a family matches gets translated. | The Phase 1 stop gate. Adjudicate on the locale's own siblings, not the cross-locale majority — the correction PR #190 had to make 74 times. |

## Open questions

- **Which grade/time convention?** — **default:** translate the word, keep clock and grade
  tokens char-for-char (`Kindergarten · 2:00–6:00 pm`), matching what most already-translated
  instances do. Apply uniformly to all nine; record it in the ledger as a standing rule.
- **Do the 11 money/unit strings (`$1.00 / min`, `$10 / day`) follow that same rule?** —
  **default:** yes, and note the open question `CLAUDE.md` already records about whether
  converted units belong in this data at all (only `es` converts today). Do not settle that
  here.
- **Should `i18n:siblings` also run cross-locale, reporting where a *group* is translated in
  8 locales and kept in 1?** — **default:** no. That is the existing tool's job; keeping the
  two detectors orthogonal is what makes their union cover the 7+ blind spot.

---

## Follow-ups — deliberately not in this plan

1. **Ledger lines for the remaining 7+ band** (~1,841 strings the detector does not
   surface). Cheap documentation if it ever proves useful; 1,934 rows nobody reads if not.
2. **Whether converted units belong in the data at all** — recorded in `CLAUDE.md`, only
   `es` converts today, so a French or Italian reader gets square feet while a Spanish
   reader gets metres. Either answer is defensible; the current one-locale state is not.
