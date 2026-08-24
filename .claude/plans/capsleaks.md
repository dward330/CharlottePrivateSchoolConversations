---
name: capsleaks
title: Fix the ALL-CAPS detector blind spot, then clear both it and the remaining leak tail
status: implemented
phases: 2
created: 2026-08-24
branch: i18n/caps-leaks
prs: [197]
---

# Fix the ALL-CAPS blind spot and clear the leak tail

## Goal

Both leak detectors skip any string containing no lowercase letter, on the assumption it is
an acronym. That assumption is wrong for **ALL-CAPS section headings**, so three triage
passes reported "clean" while **66 strong-consensus leaks** sat unreported — 35 of them in
`ar`, at 8-of-8 agreement.

This plan fixes the heuristic in both detectors, clears the leaks it exposes, and — in the
same pass, because it is the same tooling and the same locales — clears the **64 remaining
lowercase-bearing leak-shaped strings**.

We will know it worked when both detectors surface ALL-CAPS prose, every newly-exposed
string is translated or ledgered, and a re-run shows no untriaged leak-shaped item in
either class.

## Context

### The bug, in one line

`scripts/find_english_leaks.mjs:77` and `scripts/find_sibling_leaks.mjs:119` carry the
**identical** line:

```js
if (!/[a-z]/.test(en)) continue   // no lowercase -> an acronym or code
```

`AVERAGE IS NOT MEDIAN` has no lowercase letter. Neither does `ALL AID IS NEED-BASED`,
`HOW AID IS FUNDED`, or `JUNIOR KINDERGARTEN – GRADE 5`. All are prose headings; all are
invisible to both detectors.

This is a **shared** blind spot — fixing one detector and not the other leaves half of it
open.

### Verified: these are real leaks, not keeps

`AVERAGE IS NOT MEDIAN`, checked directly across all nine work files:

```
es  LA MEDIA NO ES LA MEDIANA        fr  LA MOYENNE N'EST PAS LA MÉDIANE
bn  গড় মানে মধ্যক নয়                   fa  میانگین با میانه یکی نیست
ht  MWAYÈN SE PA MEDYÀN              it  LA MEDIA NON È LA MEDIANA
te  సగటు అంటే మధ్యగతం కాదు              hi  औसत माध्यिका नहीं है
ar  KEPT-EN  ← the leak
```

Eight of eight translated it. `ar` alone ships English to its readers.

### The scale, measured 2026-08-24

**ALL-CAPS items** (currently invisible), bucketed by how many of the eight other locales
translated the same string:

| Consensus | Items |
|---|---|
| 8 of 8 | 48 |
| 7 of 8 | 12 |
| 6 of 8 | 6 |
| **≥6 of 8 — strong** | **66** |
| 5 of 8 | 8 |
| 4 of 8 | 10 |
| 3 of 8 | 18 |
| 2 of 8 | 49 |

Held overwhelmingly by `ar` (35 of the 36 at ≥6/8 with a ≥15-char floor); `te` holds most
of the rest.

**The 2-of-8 band is noise, and knowing why matters.** It is dominated by clock times —
`7:30 AM–5:30 PM`, `8:00 AM–5:00 PM` — where only `AM`/`PM` is translatable and most
locales correctly leave the string alone. Do not treat that band as a worklist.

### The residual lowercase-bearing tail (the second half of this plan)

Same filter the three prior passes used — kept by ≤2 locales, ≥15 chars, ≥2 reference
locales translated — over **lowercase-bearing** strings:

- **994** `(string, locale)` pairs
- **242** distinct English strings
- **64** leak-shaped (kept by ≤2), **all 64 at ≥6/8 consensus**

By locale (pairs): `te` 169 · `it` 166 · `fr` 143 · `hi` 133 · `ht` 91 · `bn` 90 ·
`fa` 70 · `ar` 70 · `es` 62.

**Correction to an earlier figure.** A previous session reported "~100 leak-shaped
remaining, `ar` 38". That count was inflated: the probe treated an **empty** `t` as
"kept in English", which the real detector does not. The honest figure is **64 distinct
strings**. This is the second time that same probe bug has produced a wrong headline —
`leakresidual.md`'s implementation notes caught it the first time. **Use the detector's
semantics (`t` non-empty AND `t === en`), never a hand-rolled scan.**

### The fix, designed and tested against the data

Replacing the caps skip with *"skip only if no lowercase **and** no whitespace"* was
tested: it surfaces all 74 caps items at the ≥15-char floor and wrongly skips **zero**.

But it is **not sufficient on its own**. Single-word caps prose still hides behind it, and
those are real leaks:

```
SEMIFINAL   kept 3, translated 6      RUNNER-UP  kept 2, translated 7
NONE        kept 2, translated 7
```

A pure *shape* test cannot separate `SEMIFINAL` (prose) from `JUN–AUG` (a code) — they are
structurally identical. **The consensus threshold is the better discriminator**, and it
already exists in both tools (`--min`). Dropping the caps skip entirely and letting
consensus filter gives the clean separation shown in the table above: the ≥6/8 band is
prose, the 2/8 band is clock times.

**Recommended change:** delete the caps skip from both detectors and rely on `--min`,
raising the effective threshold for review rather than pre-filtering by shape. Confirm this
against the data at step 2 rather than taking it on trust.

### One more detector caveat, carried from #196

`find_english_leaks.mjs` defaults to `--refs es,fr,it,te,bn,fa,ht` — it **omits `hi` and
`ar`**. Pass all eight other locales explicitly, or those two never act as reference
locales and their agreement is invisible. That matters especially here, where `ar` holds
most of the findings.

### Expect a high KEEP ratio on the tail

Three passes have now hit the same lesson, and #196 measured it: **1 LEAK : 6.4 KEEP** on
the tail. The rule those established is **per-locale consistency beats the cross-locale
majority** — a string that reads as a leak from outside a locale can be correct convention
from inside it. #196 also demonstrated the method that makes such calls decidable:
**measure the class** (it found `sport · JobTitle` roles split 6 kept / 6 translated, and
the six translated ones agreed the *sport* translates while the *job title* stays Latin).

The ALL-CAPS half should behave differently — an 8/8 consensus on a full sentence is much
stronger evidence than a 2-locale keep on a job title — but do not assume it.

## Decisions

- **Fix both detectors in the same pass** — the heuristic is duplicated verbatim; fixing one
  leaves half the blind spot open.
- **Prefer dropping the caps skip and leaning on `--min`** over a cleverer shape test —
  shape cannot separate `SEMIFINAL` from `JUN–AUG`, consensus can.
- **Combine the two workstreams** — same detectors, same locales, same ledger, and the tail
  alone (64 strings at a ~1:6 keep ratio) does not justify its own pass.
- **Work the ALL-CAPS half first.** It is the shipped defect with the strongest evidence
  (48 items at 8/8), and it is concentrated in one locale and one topic.
- **Extend the existing KEEPS ledger in `src/data/overlays/NOTES.md`; never restart it.**
- **Commit the worklist** to `.claude/plans/capsleaks-data/`, following the four prior
  passes — a fresh Phase 2 window cannot read a session scratchpad.
- **Two phases.** This changes user-facing research prose in nine locales.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic.

## Out of scope

- **Turning any detector into a build gate.** `check:runtime --report-identical` already
  ships as an exit-0 report on purpose; CLAUDE.md is explicit that enforcing this class
  would park the build at ~2,000 findings and make it the repo's third permanently-red
  checker.
- **The 3–7 consensus bands** of the lowercase tail (178 of the 242 distinct strings).
  Settled by #193 and #196.
- **The 2-of-8 ALL-CAPS band** (49 clock-time items).
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Two phases.** Phase 1 fixes the tooling and decides *which* strings are leaks; Phase 2
translates. A mis-triaged string translated is a wrong value shipped in up to nine locales.

### Phase 1 — Fix the detectors, then triage

1. **Reproduce the blind spot.** Confirm `AVERAGE IS NOT MEDIAN` is absent from
   `npm run i18n:leaks -- --lang ar --refs es,fr,it,te,bn,fa,ht,hi` while being kept in
   `ar` and translated in all eight others. If it already appears, **stop** — the tooling
   changed and this plan needs revisiting.

2. **Fix both detectors.** Remove the `if (!/[a-z]/.test(en)) continue` line from
   `scripts/find_english_leaks.mjs` (line 77) and `scripts/find_sibling_leaks.mjs`
   (line 119). Re-measure the consensus buckets and confirm the ≥6/8 band is prose and the
   2/8 band is clock times, as the table above records. If the shape differs, prefer a
   `--min` default over re-adding a shape filter.

3. **Fix the `--refs` default** in `find_english_leaks.mjs` so all other locales are
   reference locales, or document the explicit invocation at the call site. `hi` and `ar`
   being silently absent is what let `ar`'s 35 findings hide twice over.

4. **Triage the ALL-CAPS set (~66 at ≥6/8).** Batch by locale — `ar` first, it holds most.
   Check each candidate against its own siblings before deciding: if `ar` consistently
   keeps a class of heading in Latin, that is a KEEP class, not 35 separate calls.

5. **Triage the lowercase tail (64 distinct strings).** Same method, same evidence rule.
   Expect a keep ratio near #196's 1:6.4 and report the real one.

6. **Append every KEEP to the ledger** in `src/data/overlays/NOTES.md`, with locale and a
   one-line reason, following the existing sections' format.

7. **Record the LEAK worklist** in `.claude/plans/capsleaks-data/`, split by the two
   classes so the ratios stay separable, and **report both ratios**.

8. **Verify Phase 1 is inert for readers.** `npm run build` green; no rendered value changed
   — Phase 1 touches only the two scripts, the ledger and the worklist.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the triage calls.

### Phase 2 — Translate the confirmed leaks

Scope is the **overlay layer** (`PROSE_TRANSLATED` in `src/lib/i18n.ts`) — research prose,
not the chrome catalogs. Read `.claude/docs/prose-translation-architecture.md` for the
mechanism; do not read a rollout doc for a *register* rule.

1. **Translate each confirmed leak in its target locales** by editing
   `src/data/overlays/work/*.json`, then rebuild with `npm run i18n:build`.

2. **Match the source's capitalisation intent.** These are display headings rendered in
   caps. Check how each locale's *existing* translated headings in the same file are cased
   (`es` uses `LA MEDIA NO ES LA MEDIANA`, `fa` uses sentence case) and follow that — do not
   impose English casing on a script that has no case distinction.

3. **Do NOT use `i18n_extract.mjs --force`.** PR #190 recorded that it blanks every
   translation in a file rather than carrying them over — the extractor is a spec, not a
   writer. Patch entries surgically.

4. **Honour the standing figure traps.** Figures copied char-for-char, never re-typed;
   `hi`/`te` store the English 3-3-3 grouping because the render layer regroups; `fa`/`ar`
   need LRI…PDI isolates around bidi-neutral figures.

5. **Re-run both detectors for all nine locales** with explicit `--refs`, and confirm every
   triaged leak is gone with no new item introduced.

6. **Update the ledger** with anything Phase 2 reclassified — every prior pass had some.

## Files touched

| File | Change |
|---|---|
| `scripts/find_english_leaks.mjs` | edit — remove the caps skip (line 77); fix the `--refs` default |
| `scripts/find_sibling_leaks.mjs` | edit — remove the caps skip (line 119) |
| `src/data/overlays/work/*.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — translate confirmed leaks (Phase 2) |
| `src/data/overlays/*.json` | regenerated by `npm run i18n:build` (Phase 2) |
| `src/data/overlays/NOTES.md` | append to the existing KEEPS ledger |
| `.claude/plans/capsleaks-data/` | **new** — the worklist, committed for the Phase 2 window |

## Verification

### Phase 1 — Tooling and triage

- [ ] `AVERAGE IS NOT MEDIAN` now appears in the `ar` detector output
- [ ] Both detectors changed; neither retains a caps-based skip
- [ ] `--refs` covers all eight other locales by default, or the call site documents it
- [ ] All ~66 ALL-CAPS and 64 lowercase strings classified LEAK or KEEP, none undecided
- [ ] Every KEEP in the ledger with a locale and a reason
- [ ] **Both LEAK:KEEP ratios reported separately**
- [ ] `npm run build` — succeeds
- [ ] No rendered value changed

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every stamp resolves, value gates pass
- [ ] `npm run check:live` — live English matches every shipped stamp
- [ ] `npm run check:sepdrift -- --lang <l>` for all nine — no separator re-typing
- [ ] `npm run check:script` — every overlay still in its own script
- [ ] `npm run check:sources -- --lang <l>` for all nine — no English original altered
- [ ] `npm run check:bidi` — `fa`/`ar` isolates intact
- [ ] Both detectors re-run for all nine with explicit `--refs` — triaged leaks gone
- [ ] **Browser check** on a school page in `ar` — specifically the Financial Aid report
      section, where 35 of these headings live. Confirm the headings render in Arabic and
      that RTL is undisturbed.

## Risks

| Risk | Mitigation |
|---|---|
| **Removing the caps skip floods the output with acronyms**, making the tool unusable. | Step 2 re-measures the buckets before triage. Consensus already separates them cleanly (≥6/8 prose vs 2/8 clock times); if it does not, raise `--min` rather than re-adding a shape filter. |
| **A KEEP is mis-triaged as a LEAK.** Every prior pass hit this — 74 rows, then 182, then 5. | Batch by locale and check siblings *before* deciding; measure the class rather than eyeballing it (#196's method). Per-locale consistency beats cross-locale majority. |
| **Casing imposed wrongly** on a script with no case distinction (`ar`, `bn`, `te`, `hi`, `fa`). | Phase 2 step 2 says to follow each locale's existing heading convention in the same file. |
| **`hi`/`ar` still absent from `--refs`** and the fix is incomplete. | Step 3 fixes the default; the Phase 2 verification re-runs with explicit refs. |
| **The lowercase tail is nearly all keeps**, making that half low-yield. | Expected — #196 measured 1:6.4. A ledgered KEEP is still a permanent result that stops the next pass re-triaging it. Report the ratio honestly. |

## Open questions

- **Is `ar`'s retention of Latin headings a deliberate convention?** 35 findings in one
  locale and one topic could be one decision, not 35. — **default:** settle it as a single
  class question in step 4; if it is convention, ledger it once and move on.
- **Should `--min` default higher once the caps skip is gone?** — **default:** leave `--min`
  at 2 and filter at triage; changing the default silently changes what three prior passes
  measured against.

## Implementation notes

**Both phases shipped.** Phase 1 (commit `02bf76e`) removed the shared caps skip from both
detectors, fixed the `--refs` default, and triaged what it exposed. Phase 2 (commit
`8a9a034`) translated the result.

### What shipped, versus what the plan estimated

| | Plan | Actual |
|---|---|---|
| ALL-CAPS leaks | ~66 at ≥6/8 | **54 strings / 59 edits** triaged LEAK; **58 translated** |
| Lowercase tail | 64 leak-shaped | **64 → 0 leaks / 64 keeps** |
| ALL-CAPS LEAK:KEEP | assumed stronger than 1:6.4 | **54 LEAK : 0 KEEP** |
| Lowercase LEAK:KEEP | ~1:6.4 expected | **0 LEAK : 64 KEEP** |

**The two ratios invert completely, and that is the pass's main finding.** The plan
anticipated the caps half would behave differently; it did not anticipate the split would
be total. An 8-of-8 consensus on a full ALL-CAPS sentence was leak-shaped every single
time, while the lowercase tail — filtered identically — was a keep every single time. The
practical consequence is that these two classes should never again be triaged with one
shared threshold.

### One reclassification at translation time

`#28 NATIONAL` in `fr` was triaged LEAK in Phase 1 and is a **KEEP**: `NATIONAL` is the
same word in French, so a correct translation is byte-identical to the English. The
deciding evidence was already in the file — `sports.fr.json` holds `'National' ->
'National'` as a deliberate identical-keep, and the neighbouring `#4 IN 6A` → `#4 EN 6A`
shows `fr` changes the connector, never the cognate.

This is the **fifth consecutive pass** where a LEAK verdict did not survive contact with
its locale's own siblings, and it is a class the detector is *structurally* unable to
decide: its core test is a byte comparison, and a cognate is byte-identical to a leak. Any
Latin-script locale sharing vocabulary with English can produce one. Written up in
`src/data/overlays/NOTES.md`.

### A measurement trap in the browser check

The first `ar` probe reported 5 of 8 Arabic headings found and read as a partial failure.
It was not — these headings are **per-school**, and three of the eight belong to Charlotte
Christian and Davidson Day rather than the Providence Day page being probed. All three
render on their owning pages. Check a string's `at` paths before treating a browser MISS
as a defect.

### Deviations from the plan

- Phase 2 step 6 said to update the ledger "with anything Phase 2 reclassified" — done, plus
  a section recording the closure measurements and the browser-check trap.
- The committed worklist (`.claude/plans/capsleaks-data/`) was updated in place to mark the
  `fr` reclassification, so the record matches what shipped rather than what was planned.

### Not deployed

`npm run deploy` remains the user's call.
