---
name: siblingtail2
title: Re-triage the parenthetical-modifier class the siblingtail fixes exposed — including three of siblingtail's own edits
status: not-implemented
phases: 2
created: 2026-08-24
branch: i18n/sibling-tail-2
prs: []
---

# Re-triage the parenthetical-modifier class

## Goal

`siblingtail` (PR #200) fixed six leaks. Fixing three of them **broke a previously uniform
convention**: before PR #200, no locale had ever translated the head noun of a
`<Head Noun> (<modifier>)` course title in `course-offerings` — `fr` and `ar` were both at
**0 of 39**. The three `course-offerings` edits in PR #200 created every head-noun
instance those two locales now have.

This plan re-triages the whole class on measured evidence and lands whichever way the
evidence points: translate the remaining rows, **or revert some of PR #200's**. We will
know it worked when every row in the class is either translated or ledgered with a
per-locale reason, and both detectors run clean against the ledger.

**This plan may conclude that part of PR #200 was wrong. That is an acceptable and
expected outcome — do not treat reverting as a failure state.**

## Context

### What PR #200 shipped, and the part now in question

Six `(string, locale)` edits. Three were in `course-offerings` and are the subject here:

| Row | Locale | PR #200 value | Head noun translated? |
|---|---|---|---|
| `Fine Arts (Art, Music, Drama)` | `fr` | `Beaux-arts (arts plastiques, musique, théâtre)` | **yes** |
| `Fine Arts (Art, Music, Drama)` | `ar` | `الفنون الجميلة (فنون، موسيقى، مسرح)` | **yes** |
| `World Language (daily)` | `fr` | `Langue étrangère (quotidien)` | **yes** |

The other three (`7:45 AM–5:00 PM` ×2 in `metric-values`, `Drop-in (…)` in `after-school`)
are **not** in this class and are **out of scope** — their sibling evidence was
locale-internal and remains sound.

### The measurement that reframes it

`node .claude/plans/siblingtail2-data/measure_parenmods.mjs` (committed) over the 39
non-code parenthetical-modifier titles per locale, on `main` **today**:

```
  lang  total  kept  paren-only  HEAD-NOUN
  es       39    16           1         22
  bn       39    33           3          3
  ht       39    29           1          9
  te       39    38           1          0
  fr       39    36           1          2   <- both created by PR #200
  fa       39    38           1          0
  it       39    38           1          0
  hi       39    33           1          5
  ar       39    37           1          1   <- created by PR #200
```

Verify the baseline directly — this is the load-bearing fact:

```
git show 569a9bd^:src/data/overlays/work/course-offerings.fr.json   # 1451, 1782 both English
git show 569a9bd^:src/data/overlays/work/course-offerings.ar.json   # 1451 English
```

Pre-PR-#200, `fr` and `ar` were at **HEAD-NOUN = 0**, exactly like `te`/`fa`/`it`.

### Why this is genuinely ambiguous, not a settled error

The class splits cleanly and the two halves argue opposite ways:

- **`es` (22), `ht` (9), `hi` (5), `bn` (3)** translate head nouns freely — and all four
  translate **these very rows** (`Bellas artes (arte, música, teatro)`,
  `Bozar (Atizay, Mizik, Teyat)`, `ललित कलाएँ (कला, संगीत, नाटक)`). For them the rows are
  plainly prose.
- **`te` (0), `fa` (0), `it` (0)** never translate a head noun in this class. Their one
  non-kept row is `Special Areas (All Grades)`, where **only the parenthetical** moves
  (`Special Areas (అన్ని గ్రేడ్‌లు)`), head noun intact.

So the same string is prose in one locale and a kept identifier in another — the standing
rule that **per-locale consistency beats the cross-locale majority**, which `capsleaks`
recorded via `fr` `NATIONAL`.

The open question is which group `fr` and `ar` belong to. Their pre-#200 behaviour
(0 of 39) groups them with `te`/`fa`/`it`. `siblingtail` moved them to the other group on
sibling evidence — bare `Fine Arts` → `Beaux-arts` / `الفنون الجميلة` — which is real
evidence, but drawn from **department-name fields, not course titles**. Whether that
distinction matters is exactly what Phase 1 must decide.

### Where these render

Per `capsleaks`' recorded trap, check the `at` path before calling a browser MISS a defect:

| Row | `at` path | Renders on |
|---|---|---|
| `Fine Arts (Art, Music, Drama)` | `charlotte-country-day:divisions[0]…courses[0].title` | Charlotte Country Day → Course Offerings, Lower School |
| `World Language (daily)` | `cannon:divisions[1]…courses[1].title` | Cannon → Course Offerings, Middle School |
| `World Language (Online)` | `carmel-christian:divisions[0]…courses[7].title` | Carmel Christian → Course Offerings |

### Detector reachability — why this needs a plan rather than a detector run

Neither detector flags these rows in `te`/`fa`/`it`/`ar` today: the within-locale sibling
detector needs `--min-sibs 3` in one parent group, and the consensus detector needs ≥6
locales translated. `World Language (Online)` is kept by **all nine**, scoring 0/9 —
invisible by construction. A clean detector run is not evidence of absence here.

## Decisions

- **Measure-first; scope stays open until Phase 1 decides.** User-selected. The honest
  outcome range is 0–5 rows translated *and* 0–3 of PR #200's reverted.
- **PR #200's three `course-offerings` edits are in scope and on trial.** The measurement
  puts them in question; excluding them would decide the question by omission.
- **The other three PR #200 edits are out of scope** — different class, locale-internal
  evidence, unaffected.
- **The head-noun column is the discriminator**, not the raw translated count. A locale at
  HEAD-NOUN=0 has a convention; a lone exception is a leak.
- **Department-name evidence does not automatically transfer to course titles.** Whether it
  does is Phase 1's central question, argued explicitly rather than assumed either way.
- **Extend the existing ledger in `src/data/overlays/NOTES.md`; never restart it.**
- **Commit the worklist** to `.claude/plans/siblingtail2-data/` — a fresh Phase 2 window
  cannot read a session scratchpad.
- **Two phases**, because Phase 1 may change rendered user-facing text (a revert is a
  visible change) and Phase 2 propagates.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic. Reverting an
overlay value changes no structure.

Note for the implementer: **reverting part of a merged PR needs no separate approval** —
this plan is that approval, and the user set the measure-first scope knowing revert was a
possible outcome.

## Out of scope

- **The three non-`course-offerings` edits from PR #200** (`7:45 AM–5:00 PM` ×2,
  `Drop-in (Before School, CCS)`). Different class; evidence stands.
- **The 120 ledgered strings** from prior passes.
- **Making either detector ledger-aware, or lowering `--min-sibs`.** Tempting here since a
  threshold hid these rows — but it changes a tool six passes have calibrated against.
  Record findings; do not retune the instrument mid-investigation.
- **Turning any detector into a build gate.** `CLAUDE.md` is explicit.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Two phases.** Phase 1 decides and applies the English-visible outcome for the rows that
have one; Phase 2 propagates to the remaining locales and updates the ledger.

A note on the phase split for this plan: no *English* source string changes here — the
English is already correct in `src/data/**`. Phase 1 therefore settles the **verdicts** and
applies any **revert** (the only reader-visible change a wrong call has already shipped);
Phase 2 applies the forward translations. The gate between them is the user confirming the
verdicts, which is the reviewable artifact.

### Phase 1 — Re-triage, and revert what the evidence contradicts

1. **Reproduce the measurement.** Run
   `node .claude/plans/siblingtail2-data/measure_parenmods.mjs` and confirm the table in
   *Context* still holds. If it has drifted, trust the fresh run and say so.

2. **Establish the pre-#200 baseline as fact**, not memory:
   ```
   git show 569a9bd^:src/data/overlays/work/course-offerings.fr.json
   git show 569a9bd^:src/data/overlays/work/course-offerings.ar.json
   ```
   Confirm both were HEAD-NOUN=0 across all 39. This is the load-bearing claim; if it is
   false, **stop and re-plan** — the whole rationale collapses.

3. **Decide the governing question, in writing:** does a locale's treatment of a
   **department name** (`Fine Arts` → `Beaux-arts`) license translating a **course title's**
   head noun? Argue it from the data both ways and commit to an answer, because every row
   below follows from it. Useful evidence: whether `es`/`ht`/`hi` — which do translate
   course-title head nouns — also translate department names, and whether `te`/`fa`/`it`
   translate department names while refusing course titles. **If they do, the two fields
   are demonstrably separate classes and PR #200's inference was unsound.**

4. **Triage all 8 rows** — the 5 outstanding plus the 3 from PR #200 — into LEAK, KEEP, or
   REVERT, each with its own locale's evidence:

   | Row | Locale(s) | Status today |
   |---|---|---|
   | `Fine Arts (Art, Music, Drama)` | `fr`, `ar` | translated by PR #200 — **on trial** |
   | `World Language (daily)` | `fr` | translated by PR #200 — **on trial** |
   | `Fine Arts (Art, Music, Drama)` | `te`, `fa`, `it` | English |
   | `World Language (daily)` | `te`, `fa`, `it`, `ar` | English |
   | `World Language (Online)` | all nine | English (0/9 — invisible to consensus) |

5. **Apply any REVERT** by restoring the exact pre-#200 value in the work file, then
   rebuilding that overlay (step 7). Copy the old value from
   `git show 569a9bd^:…` rather than re-typing it.

6. **Do NOT run `i18n_extract.mjs --force`** — PR #190 recorded that it blanks every
   translation rather than carrying them over. Patch entries surgically.

7. **Rebuild each touched overlay** with
   `npm run i18n:build -- --topic course-offerings --lang <l>`, then **diff the shipped
   file against HEAD** and confirm only the intended values moved. A rebuild is not a
   no-op.

8. **Record the verdicts** to `.claude/plans/siblingtail2-data/TRIAGE.md` with per-row
   evidence, and **report the LEAK : KEEP : REVERT split**.

**→ STOP. `/implement` ends its turn here and waits for the user's review.**

The reviewable artifact is the **verdict table plus any reverted rendering** — show the
user which rows changed on the page and which stayed English, so they can sanity-check the
convention call before it propagates.

### Phase 2 — Forward translations and the ledger

Scope is the **overlay layer** (`PROSE_TRANSLATED`); see
`.claude/docs/prose-translation-architecture.md` for the mechanism.

1. **Translate every row triaged LEAK**, deriving each rendering from a translated sibling
   in the same locale and file — never composed fresh. Where a locale translates only the
   parenthetical (`Special Areas (All Grades)` → `Special Areas (…)`), follow that shape
   rather than translating the head noun.

2. **Preserve the standing figure traps** — figures char-for-char, `hi`/`te` store English
   3-3-3 grouping, `fa`/`ar` LRI…PDI isolates around bidi-neutral figures.

3. **Rebuild and diff** each touched overlay, as in Phase 1 step 7.

4. **Append every KEEP and REVERT to the ledger** in `src/data/overlays/NOTES.md`, keyed by
   `(string, locale)`, each with a one-line reason. A REVERT row must say it reverses part
   of PR #200 and why — a future pass will otherwise re-flag it as a leak.

5. **Re-run BOTH detectors for all nine locales** and confirm every remaining flag is
   ledgered. Running only one is what under-ran `capsleaks` and forced PR #198.

6. **Re-run the measurement script** and record the final HEAD-NOUN column in the ledger,
   so the next pass inherits the convention rather than re-deriving it.

## Files touched

| File | Change |
|---|---|
| `src/data/overlays/work/course-offerings.{te,fa,it,fr,ar,…}.json` | edit — translate confirmed leaks; revert any overturned PR #200 row |
| `src/data/overlays/course-offerings.*.json` | regenerated by `npm run i18n:build` |
| `src/data/overlays/NOTES.md` | append KEEPs, REVERTs, and the final HEAD-NOUN table |
| `.claude/plans/siblingtail2-data/TRIAGE.md` | **new** — verdicts and evidence, for the Phase 2 window |
| `.claude/plans/siblingtail2-data/measure_parenmods.mjs` | already committed by `/plan` |

## Verification

### Phase 1

- [ ] Measurement script reproduces the *Context* table (or drift explained)
- [ ] Pre-#200 baseline confirmed HEAD-NOUN=0 for `fr` and `ar`
- [ ] The department-name-vs-course-title question answered in writing
- [ ] All 8 rows triaged LEAK / KEEP / REVERT, none undecided
- [ ] Split reported
- [ ] Shipped-overlay diff shows only intended values changed
- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds
- [ ] **Browser check** any reverted row on its own page (see the `at` table in *Context*)

### Phase 2

- [ ] `npm run check:runtime` — every stamp resolves, value gates pass
- [ ] `npm run check:live` — live English matches every shipped stamp
- [ ] `npm run check:sepdrift -- --lang <l>` × 9 — no separator re-typing
- [ ] `npm run check:sources -- --lang <l>` × 9 — no English original altered
- [ ] `npm run check:script` — every overlay still in its own script
- [ ] `npm run check:bidi` — `fa`/`ar` isolates intact
- [ ] **Both** `npm run i18n:leaks` and `npm run i18n:siblings` × 9; every remaining flag ledgered
- [ ] **Browser check** on Charlotte Country Day and Cannon Course Offerings in at least
      two locales, one RTL. Note: **`/compare/` starts at 0 of 11 schools selected** — for
      any Compare-page check the schools and topic must be clicked first, or every
      assertion fails against an empty table.

## Risks

| Risk | Mitigation |
|---|---|
| **Reverting a correct fix.** `fr`/`ar` genuinely do translate bare `Fine Arts`, so the PR #200 edits are defensible. | Step 3 forces the department-vs-title question to be argued from data before any revert. Both outcomes are acceptable; neither is the default. |
| **Confirmation bias toward revert**, since the plan surfaces that possibility prominently. | The 4 head-noun-translating locales (`es` 22, `ht` 9, `hi` 5, `bn` 3) are the counter-evidence and must be weighed explicitly in step 3. |
| **Treating "detector is silent" as "no defect."** All 5 outstanding rows are below both thresholds. | Stated in *Context*; the triage works from the measured class, not from detector output. |
| **A cognate false positive** in `es`/`ht`/`fr`/`it`. | Ask the cognate question per Latin-script locale, per `capsleaks` (`fr` `NATIONAL`). |
| **Rebuild silently writing more than intended.** | Step 7 diffs the shipped file against HEAD every time. |

## Open questions

- **Does department-name treatment license course-title treatment?** — **default:** treat
  them as **separate classes** (so `fr`/`ar` revert to English), because the measured
  pre-#200 behaviour is 0-of-39 in both locales and that is the stronger, larger sample.
  Overturn this default only with an argued case in step 3.
- **`World Language (Online)`, kept by all nine** — **default:** ledger as a KEEP for the
  locales at HEAD-NOUN=0, and treat it as a LEAK only for locales that translate the
  sibling `World Language (daily)` after Phase 1 settles.
- **Should the class be re-measured for other topics** (`after-school`, `sports`)? —
  **default:** no. Out of scope; note it as a follow-up if the pattern looks general.
