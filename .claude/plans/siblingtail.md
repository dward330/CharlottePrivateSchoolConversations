---
name: siblingtail
title: Triage the sibling-detector findings the cross-locale threshold cannot reach
status: english-done
phases: 2
created: 2026-08-24
branch: i18n/sibling-tail
prs: []
---

# Triage the sibling-detector tail

## Goal

The within-locale sibling detector reports **653 findings across the nine locales**, of
which **618 are already recorded in the KEEPS ledger**. The remaining **35 are untriaged**,
and spot-checking shows several are genuine prose leaks — quoted sentences shipping in
English to readers of four locales.

We will know it worked when every one of the 35 is translated or ledgered, and a re-run of
`npm run i18n:siblings` across all nine locales surfaces nothing that is not in the ledger.

## Context

### Why these are invisible to the other detector

PR #198 established the structural limit, and it is the reason this plan exists:

> The cross-locale consensus detector needs **≥6 locales to have translated a string**
> before it will flag the holdouts — so a string almost every locale keeps is invisible to
> it. **The more widespread the leak, the less visible it is.**

These 35 sit at 4–5 keeps, below that threshold. `npm run i18n:leaks` is working as
designed and will never report them. Only `npm run i18n:siblings` — which asks the
complementary question, *is this string English next to its own translated siblings?* —
can see them.

### Verified: at least some are real leaks

`"multiple Scholastic Art Award winners"`, checked directly across all nine work files:

```
fr  « multiple Scholastic Art Award winners »     es  KEPT-EN
fa  «چند برندهٔ Scholastic Art Award»              bn  KEPT-EN
it  "più vincitori di Scholastic Art Award"       ht  KEPT-EN
hi  "कई Scholastic Art Award विजेता"                te  KEPT-EN
ar  "عدّة فائزين في Scholastic Art Award"
```

Five locales translated it; four ship the English quoted sentence. Note what the five did:
they translated the framing prose and **kept `Scholastic Art Award` as the proper noun** —
which is the model for how these should be handled.

Others in the 35 share the shape — quoted prose sentences:

```
"Due to the small class size and the college-bound …"
"Although service is not a graduation requirement …"
```

And some are clearly keeps: `4.60 / 3.96 / 2.49`, `DECA → ICDC ’26`,
`Drop-in (Before School, CCS)`.

### The measurement, taken 2026-08-24

Running `npm run i18n:siblings -- --lang <l>` for all nine locales and cross-referencing
each flagged string against `src/data/overlays/NOTES.md`:

| | Count |
|---|---|
| Total sibling findings, all locales | 653 |
| Already in the KEEPS ledger | 618 |
| **Untriaged** | **35** |

The 618 are prior passes' recorded decisions being re-surfaced — the detector has no memory
of the ledger. That is expected, not a bug, but it means **the raw count is not the
worklist**; cross-referencing the ledger is step 1.

### Expect a mixed ratio, and do not assume either extreme

The five prior passes measured wildly different ratios: #196's tail ran **1 LEAK : 6.4
KEEP**, while `capsleaks`' ALL-CAPS half ran **54 LEAK : 0 KEEP** and its lowercase half
**0 LEAK : 64 KEEP**. `capsleaks` recorded the lesson: *these classes should never again be
triaged with one shared threshold.* This set is a third class again — sub-threshold
within-locale findings — so measure its ratio rather than predicting it.

### The recurring rule, now five passes deep

**Per-locale consistency beats the cross-locale majority.** A string that reads as a leak
from outside a locale can be correct convention from inside it. `capsleaks` added the
sharpest instance: `#28 NATIONAL` in `fr` was triaged LEAK and is a **KEEP**, because
`NATIONAL` is the same word in French — a correct translation is byte-identical to the
English, and the detector's core test is a byte comparison. **Any Latin-script locale
sharing vocabulary with English can produce a cognate false positive.** `es`, `ht`, `fr`
and `it` are all exposed to this.

The method that makes such calls decidable, from #196: **measure the class** rather than
eyeballing it — check how the locale treats the same construction elsewhere in the same
file before deciding.

## Decisions

- **Scope to the 35 untriaged findings**, not the 653 — the rest are recorded decisions.
- **Cross-reference the ledger mechanically**, not by eye; 618 of 653 would otherwise be
  re-litigated.
- **Extend the existing ledger in `src/data/overlays/NOTES.md`; never restart it.**
- **Commit the worklist** to `.claude/plans/siblingtail-data/`, following the five prior
  passes — a fresh Phase 2 window cannot read a session scratchpad.
- **Two phases.** This changes user-facing research prose.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic.

## Out of scope

- **The 618 ledgered findings.** Settled by prior passes.
- **Making the detector ledger-aware** so it stops re-surfacing keeps. Tempting, and worth
  a follow-up, but it changes a tool five passes have calibrated against — do not fold it
  into a triage pass.
- **Turning any detector into a build gate.** CLAUDE.md is explicit about why.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Two phases.** Phase 1 decides which strings are leaks; Phase 2 translates.

### Phase 1 — Triage

1. **Rebuild the worklist.** Run `npm run i18n:siblings -- --lang <l>` for all nine
   locales, collect every flagged string, and filter out those already present in
   `src/data/overlays/NOTES.md`. Expect ~35; confirm the real number rather than trusting
   it. Write the result to `.claude/plans/siblingtail-data/`.

2. **Triage each into LEAK or KEEP.** A LEAK is prose — a sentence, a descriptive label. A
   KEEP is a figure (`4.60 / 3.96 / 2.49`), a code (`DECA → ICDC ’26`), a proper noun, or a
   cognate that is legitimately byte-identical.

3. **Check each candidate against its own locale's siblings before deciding** — the rule
   five passes have now established. For a Latin-script locale, explicitly ask whether a
   flagged string is a **cognate** rather than a leak.

4. **Append every KEEP to the ledger** with locale and a one-line reason, following the
   existing sections' format.

5. **Record the LEAK worklist** for Phase 2, and **report the LEAK:KEEP ratio** — it is the
   honest measure of whether this pass was worth running, and it feeds the growing picture
   of how different leak classes behave.

6. **Verify Phase 1 is inert for readers.** `npm run build` green; no rendered value
   changed.

**→ STOP. `/implement` ends its turn here and waits for the user's review.**

### Phase 2 — Translate the confirmed leaks

Scope is the **overlay layer** (`PROSE_TRANSLATED` in `src/lib/i18n.ts`). Read
`.claude/docs/prose-translation-architecture.md` for the mechanism.

1. **Translate each confirmed leak in its target locales** by editing
   `src/data/overlays/work/*.json`, then rebuild with `npm run i18n:build`.

2. **Follow the majority's handling of embedded proper nouns.** Where five locales
   translated the framing of `"multiple Scholastic Art Award winners"` and kept the award
   name in Latin, do the same — do not translate the proper noun.

3. **Preserve quotation marks per locale.** These are quoted sentences; `fr` uses
   « … », other locales use their own convention. Match what the locale already does in the
   same file.

4. **Do NOT use `i18n_extract.mjs --force`.** PR #190 recorded that it blanks every
   translation in a file rather than carrying them over — the extractor is a spec, not a
   writer. Patch entries surgically.

5. **Honour the standing figure traps.** Figures copied char-for-char; `hi`/`te` store the
   English 3-3-3 grouping; `fa`/`ar` need LRI…PDI isolates around bidi-neutral figures.

6. **Re-run BOTH detectors for all nine locales** and confirm every triaged leak is gone.
   Running only one is exactly what under-ran `capsleaks` and required PR #198.

7. **Update the ledger** with anything Phase 2 reclassified — every prior pass had some.

## Files touched

| File | Change |
|---|---|
| `src/data/overlays/work/*.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — translate confirmed leaks (Phase 2) |
| `src/data/overlays/*.json` | regenerated by `npm run i18n:build` (Phase 2) |
| `src/data/overlays/NOTES.md` | append to the existing KEEPS ledger |
| `.claude/plans/siblingtail-data/` | **new** — the worklist, committed for the Phase 2 window |

## Verification

### Phase 1

- [ ] All ~35 classified LEAK or KEEP, none undecided
- [ ] Every KEEP in the ledger with a locale and a reason
- [ ] LEAK:KEEP ratio reported
- [ ] `npm run build` — succeeds
- [ ] No rendered value changed

### Phase 2

- [ ] `npm run check:runtime` — every stamp resolves, value gates pass
- [ ] `npm run check:live` — live English matches every shipped stamp
- [ ] `npm run check:sepdrift -- --lang <l>` for all nine — no separator re-typing
- [ ] `npm run check:script` — every overlay still in its own script
- [ ] `npm run check:sources -- --lang <l>` for all nine — no English original altered
- [ ] `npm run check:bidi` — `fa`/`ar` isolates intact
- [ ] **Both** `npm run i18n:leaks` and `npm run i18n:siblings` re-run for all nine
- [ ] **Browser check** on a school page in two locales, at least one RTL. Per `capsleaks`'
      recorded trap: these strings are **per-school**, so check a string's `at` paths before
      treating a browser MISS as a defect — the string may simply belong to another school's
      page.

## Risks

| Risk | Mitigation |
|---|---|
| **A cognate is mis-triaged as a LEAK** — `capsleaks` hit exactly this with `fr` `NATIONAL`. The detector's byte comparison cannot distinguish them. | Step 3 asks the cognate question explicitly for `es`/`ht`/`fr`/`it`. Check the locale's own siblings for a deliberate identical-keep. |
| **Re-litigating the 618 ledgered findings**, wasting the pass. | Step 1 filters against the ledger mechanically before any triage begins. |
| **Only one detector re-run at the end**, leaving findings behind — the exact gap that forced PR #198. | Phase 2 step 6 and the verification both name *both* detectors. |
| **Low yield.** | Possible: the set includes obvious keeps. Report the ratio honestly; a ledgered KEEP is a permanent result that stops the next pass re-triaging it. |

## Open questions

- **Should the sibling detector become ledger-aware**, filtering out recorded keeps so its
  raw output is the worklist? — **default:** out of scope here; raise it as a follow-up once
  this pass shows whether 618-of-653 noise is a recurring cost.

## Implementation notes

### Phase 1 (2026-08-24) — the count was 8, not 35

The plan's headline "**35 untriaged of 653**" did not survive measurement, and the
correction is the main Phase-1 finding. Both figures were raw detector **rows**, which
double-count in two directions: a string flags once per parent group it renders in, *and*
once per locale. Deduplicating gives 574 `(string, locale)` pairs over **128 distinct
strings**, of which **120 were already in the ledger** — a real queue of **8 strings /
25 pairs**. The 653 total reproduced exactly, so the detector had not changed; only the
unit of counting was wrong.

The plan's own worked example illustrates it: `"multiple Scholastic Art Award winners"`,
quoted in Context as the verified leak motivating the pass, is **already a ledgered KEEP**
(PR #190, quotation class) for all four of the locales that keep it. Same for the two other
quoted sentences the plan cites. Scoping to "the 35" would have re-litigated settled rows.

The ledger cross-reference was hardened beyond the plan's "filter mechanically" (step 1),
because a false *already-ledgered* silently hides a real leak — the one error this pass
could make that nothing downstream would catch. Two extra audits, both returning zero:
every match lands inside an actual ledger **table row** rather than surrounding prose, and
every flagged pair's **locale** is named in its own row (the ledger is keyed by
`(string, locale)`, so a string settled for `te` is not settled for `fr`).

### Ratio: 4 LEAK : 4 KEEP by string; 8 LEAK : 17 KEEP by pair

A third distinct ratio, between #196's 1:6.4 and `capsleaks`' 54:0 — consistent with
`capsleaks`' rule that these classes must not share one threshold.

The pass's best single result is `7:45 AM–5:00 PM`: **all nine locales keep it**, so it
scores 0/9 on the consensus detector and is invisible there by construction — yet in `fr`
and `ar` it is a lone English cell beside four clock spans those same locales translated.
That is the PR #198 blind spot, demonstrated rather than argued.

### Two rows Phase 2 must re-decide

`Drop-in (Before School, CCS)` was triaged LEAK for `bn` and `hi` on group evidence, but
both locales keep `Drop-in` as a Latin loanword and translate only the tail common noun —
and here the tail is the acronym `CCS`. That is the same argument that makes the string a
KEEP for `te`. Phase 2 is expected to reclassify both to KEEP; recorded rather than
resolved because Phase 1 triages on group evidence and Phase 2 has translation evidence.

### One adjacent defect deliberately left

`World Language (Online)` (`course-offerings`, `carmel-christian`, `fr`) is the same defect
as the confirmed `World Language (daily)` leak, and the detector did **not** flag it — its
parent group does not clear `--min-sibs 3`. Different school and outside the plan's stated
scope, so it is recorded as a follow-up rather than fixed silently. Worth noting generally:
a threshold can hide one instance of a defect it flags elsewhere, so a clean detector run
is not proof of absence.

### Files

Phase 1 changed **no data module and no overlay** — only `src/data/overlays/NOTES.md`
(ledger), `.claude/plans/siblingtail-data/` (worklist) and the plan/index rows. Nothing a
reader renders was touched, which is what the "inert for readers" verification asserts.
