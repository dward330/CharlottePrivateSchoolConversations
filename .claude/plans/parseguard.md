---
name: parseguard
title: Parse Gaston Day's PS/PK spans, fix three drifted GPA figures, and close the allowlist that hid one
status: english-done
phases: 2
created: 2026-08-21
branch: fix/parse-guard
prs: []
---

# Two silent parse failures, three drifted figures, and the allowlist entry that suppressed one

## Goal

Three defects, all of the same family — **a value that fails quietly and a checker that
was talked out of reporting it**:

1. `agePointOf` has no case for `PS` or `PK`, so Gaston Day **drops out of two Compare
   rankings entirely** and both rows tint a leader chosen from what is left.
2. Three locales carry a GPA figure that disagrees with the English: `ht` **invented
   `4.9`**, `fa` wrote `0.50` for `.50`, `es` wrote `0,50`.
3. The `es` one has been **suppressed since it was written** by an entry in
   `check_sep_drift.mjs`'s `CONVERSIONS` allowlist — a table documented as holding
   *"verified unit conversions"*, whose own comment admits this entry is
   *"decimal-comma, not a conversion"*.

Done when `npm run check:spans` exits **0** and is chained into `npm run build`; when
`check:sepdrift` is green in all nine locales **with no non-conversion entry left in
`CONVERSIONS`**; and when the three figures match their English source char-for-char.

**Two-phase.** Phase 1 is code and English only. Phase 2 edits translated prose in three
overlay work files — user-facing text, so it waits for review.

## Context

### Defect 1 — `PS` and `PK` do not parse, measured 2026-08-21 on `main` at `bb653fa`

`npm run check:spans` exits 1 with exactly two findings:

```
✗ program-span / gaston-day: "PS–12" does not parse as range-start
✗ summer-ages / gaston-day: "rising PK–12" does not parse as range-width
```

The values live in [`src/data/metricValues.ts`](src/data/metricValues.ts) at **line 783**
(`'gaston-day': 'PS–12'`) and **line 1479** (`'gaston-day': 'rising PK–12'`).

`agePointOf` maps early-years band tokens onto ages. It knows `tk|jrk|jk|pre-?k` → 4 and
`k` → 5, but **`PS` (preschool) and the abbreviation `PK` are absent**. Note `pre-?k`
matches `pre-k` and `prek`, *not* `PK` — that is the whole bug, and it is easy to misread
the existing pattern as already covering it.

There are **two copies** of this parser, deliberately:

| Copy | Lines | Role |
|---|---|---|
| [`src/pages/Compare.tsx`](src/pages/Compare.tsx#L116) | `116-126` | the app — decides the live tint |
| [`scripts/check_span_metrics.mjs`](scripts/check_span_metrics.mjs#L119) | `119-128` | the checker |

The checker's docstring states the duplication is intentional: *"this check exists to catch
a value the app cannot rank, so importing the app's parser would make a broken parser agree
with itself."* **Both must be edited, identically.** Editing one is the failure mode this
plan is most likely to produce.

#### The tint does NOT move — verified by simulation, and this corrects the spanguard plan

`.claude/plans/spanguard.md` asserts that fixing this "moves a live tint" and used that to
justify deferring the work. **Simulated against the real values, it does not:**

| Row | Gaston Day, once parsed | Current leader | Outcome |
|---|---|---|---|
| `program-span` (`range-start`) | `PS–12` → start 3 → **-3** | davidson-day **-2** | davidson-day **keeps** the lead |
| `summer-ages` (`range-width`) | `rising PK–12` → 4..17 → **13** | charlotte-latin **14.5** | charlotte-latin **keeps** the lead |

Gaston Day enters both rankings mid-table. That makes this change materially **lower-risk
than the spanguard plan recorded**, and the implementer should not go looking for a tint
change that will not happen. It does change what renders for Gaston Day's own two cells
(they currently rank as unparseable), so a browser check is still required.

#### A SECOND defect inside the same two values — the bare `12`

Both values end in a bare `12` meaning **grade 12**. `agePointOf` tries its grade branch
(`/\b(?:gr(?:ade)?\.?\s*)(\d{1,2})\b/`), which requires the literal word `gr`/`grade`, so a
bare `12` **falls through to the plain-number branch and is read as age 12** — not 17.

Measured:

```
agePointOf("12")        -> 12   (age 12)
agePointOf("Grade 12")  -> 17   (12 + 5)
```

Every peer value spells it out (`JK–Grade 12`, `Age 4–Grade 12`), which is why this has
never surfaced. So `PS–12` would parse as a 3→12 span rather than 3→17, **under-measuring
Gaston Day by five years** even after the `PS` fix. The plan fixes the values, not the
parser, for this half — see Decisions.

### Defect 2 — three drifted GPA figures

Two English strings, each owned by one school:

| English | Source file |
|---|---|
| `Studio II Honors carries a .50 GPA weighting and requires an A− in the prerequisite` | [`src/data/artsPrograms/davidson-day.ts`](src/data/artsPrograms/davidson-day.ts) (also [`src/content/the-arts/davidson-day.json`](src/content/the-arts/davidson-day.json)) |
| `Honors courses carry no weight at all and only AT/AP add a point, so the weighted top decile tops out near 4.28 rather than in the high 4s.` | [`src/data/collegeSupportPrograms/cannon.ts`](src/data/collegeSupportPrograms/cannon.ts) |

Measured across all nine locales — the consensus is decisive in both cases:

**`.50 GPA weighting`** — 7 of 9 copy `.50` verbatim:

```
bn ht te fr it hi ar  ->  ".50"     ✓ correct
es                    ->  "0,50"    ✗ separator re-typing
fa                    ->  "0.50"    ✗ added leading zero
```

**`high 4s`** — 8 of 9 render it as a *phrase* and carry only `4.28`:

```
es "franja alta de los 4"   bn/te/hi/ar/it/fr  — all phrase-only, token 4.28
ht "olye ke nan 4.9"        ✗ INVENTED the figure 4.9
```

The `ht` case is the most serious: **`4.9` appears nowhere in the English**, which says
"in the high 4s". It is a fabricated number inside a GPA claim a parent would check against
the school's page. It is also **Kreyòl — the one shipped locale with no native-speaker
review** (`CLAUDE.md`), i.e. exactly the failure class that review exists to catch.

### Defect 3 — the allowlist entry that hid the `es` drift

`check:sepdrift` is red on `ht` and `fa` but **green on `es`**, despite `es` carrying a
real re-typing. Cause, at [`scripts/check_sep_drift.mjs:83`](scripts/check_sep_drift.mjs#L83):

```js
{ token: '0,50',  requires: '.50 GPA' },        // decimal-comma, not a conversion
```

`CONVERSIONS` is documented directly above as *"Verified unit conversions … Arithmetic
checked at 0.09290304 m²/sq ft and 0.0254 m/inch."* Every other entry is a genuine
sq ft → m² or ft/in → m conversion. This one is a **separator re-typing filed under the
suppression table for something else**, and its own trailing comment says so.

Verified by experiment: deleting that single line makes `--lang es` report
`✗ the-arts.es.json 1 drifted / token not in English: "0,50"` and exit 1. Restored.

This is the same shape as the `FOREIGN_TOPICS` bypass `CLAUDE.md` records — *a
documented bypass inside a gate, which is worse than no gate* — and the third-order version
of the failure mode that file records three times over: **a checker talked into silence
stops protecting anything.**

### What is NOT wrong — a correction worth recording

An earlier read of this suggested `SEP_TOKEN = /\d{1,3}(?:[.,]\d+)+/g` was blind to bare
leading-dot decimals like `.50` (no leading digit → no token). That is **true of the
regex** but is **not** why `es` passes: `es` wrote `0,50`, which *does* have a leading
digit and *is* tokenized — it was the allowlist that suppressed it.

Widening the regex was tested anyway and yields **0 new findings across all 9 locales**,
and there is exactly **1** bare leading-dot decimal in the entire English corpus (this same
`.50`). So the regex widening is optional hardening, not a fix. It is in Steps as a small
defensive change with a measured zero blast radius — do not let it displace the real fix,
which is deleting the allowlist entry.

## Decisions

- **Add `PS` → 3 and `PK` → 4 to `agePointOf`, in BOTH copies** — `PS` is preschool
  (~3), `PK` is pre-K, matching the existing `pre-?k` → 4. Keep the two copies
  byte-identical in this function; the duplication is deliberate and documented.
- **Fix the bare `12` in the DATA, not the parser** — change the two values to
  `'PS–Grade 12'` and `'rising PK–Grade 12'` so they read as every peer value already
  does (`JK–Grade 12`). Teaching the parser that a bare trailing `12` means a grade would
  change how *every* row parses bare numbers and could silently move real tints; a
  two-value data edit cannot. **This is a `src/data/metricValues.ts` edit, so it is a
  Compare-cell text change** — see Approvals.
- **Delete the `0,50` entry from `CONVERSIONS` rather than "fixing" its comment** — the
  entry's existence is the defect. `CONVERSIONS` must hold only arithmetic-verified unit
  conversions, which is what its docstring promises.
- **Add a guard so a non-conversion cannot be added to `CONVERSIONS` again** — each entry
  gains a `why` field naming the conversion, and the script asserts at startup that every
  entry has one. A future maintainer suppressing a drift has to write a false justification
  rather than a true confession in a comment.
- **Fix the three figures to the locale consensus**, not to a re-derivation: `es`/`fa` →
  `.50`; `ht` → the phrase form the other eight use, carrying only `4.28`.
- **Chain `check:spans` into `npm run build`** once it exits 0 — the closing step
  `.claude/plans/spanguard.md` explicitly deferred to this plan.
- **Do not touch the English strings.** Both are correct; only translations drifted.
  Editing English would re-stamp content hashes and drag every locale into a re-extract.

## Approvals needed

**One, and it is small.** Step 3 edits two **Compare cell values** in
`src/data/metricValues.ts` (`'PS–12'` → `'PS–Grade 12'`, `'rising PK–12'` →
`'rising PK–Grade 12'`). Under the UX-design gate, *"adding, correcting and extending the
data behind cards and sections the app already has"* is explicitly **Allowed** — this adds
no row, key or card, and changes no component. It is flagged only because the text of two
rendered cells changes, and the user should see the new wording before it ships.

No new card, section, stat tile, Compare row, metric key or topic. No component, layout or
styling change.

## Out of scope

- **Any other `CONVERSIONS` entry.** The eleven `es` unit conversions are
  arithmetic-verified and stay. The open content question `CLAUDE.md` records — whether
  converted units belong in the data at all, given only `es` converts — is untouched.
- **Davidson Day's desktop CLS `0.3509 POOR`.** Belongs to
  [`vitals.md`](.claude/plans/vitals.md), already `In progress`.
- **`check:metrics` advisories** — 7 un-ingested `source-material/` files and two
  deliberately-absent topic/school pairs. Pre-existing and advisory.
- **The `~2,200-per-locale identical-to-English report.** `CLAUDE.md` is explicit that
  triaging the 344 leak-shaped entries is a separate pass and that the report must not
  become a gate.
- **Re-verifying the underlying GPA research.** `.50` and `4.28` are taken as correct;
  this plan fixes translations that disagree with them.

## Steps

### Phase 1 — English and code

1. **Reproduce all three defects.** Run `node scripts/check_span_metrics.mjs; echo $?` →
   exit 1, two `gaston-day` findings. Run `node scripts/check_sep_drift.mjs --lang ht` and
   `--lang fa` → 1 finding each. Run `--lang es` → **exit 0**, then temporarily delete
   [`scripts/check_sep_drift.mjs:83`](scripts/check_sep_drift.mjs#L83) and re-run to see
   the suppressed `0,50` appear. Restore. **Do not pipe to `tail`** — the pipe reports
   `tail`'s exit code, a mistake this repo has already made once.

2. **Teach `agePointOf` `PS` and `PK`, in both copies.** In
   [`src/pages/Compare.tsx`](src/pages/Compare.tsx#L116) and
   [`scripts/check_span_metrics.mjs`](scripts/check_span_metrics.mjs#L119), add ahead of
   the existing early-years line:

   ```js
   if (/\bps\b|preschool/i.test(t)) return 3   // preschool, ~3
   if (/\bpk\b/i.test(t)) return 4             // pre-K — the existing pre-?k misses "PK"
   ```

   Keep both copies byte-identical in this function and add the same comment to each.
   Order matters: place these **before** the `k(indergarten)` line so `PK` is not caught
   by the bare-`k` branch.

3. **Spell out the grade in the two data values.** In
   [`src/data/metricValues.ts`](src/data/metricValues.ts): line **783** `'PS–12'` →
   `'PS–Grade 12'`; line **1479** `'rising PK–12'` → `'rising PK–Grade 12'`. Preserve the
   en-dash `–` (not a hyphen) and leave the trailing `//` comments intact.

4. **Delete the non-conversion allowlist entry.** Remove line **83** of
   [`scripts/check_sep_drift.mjs`](scripts/check_sep_drift.mjs#L83)
   (`{ token: '0,50', requires: '.50 GPA' }`). `--lang es` should now fail — that is
   correct and is fixed in Phase 2.

5. **Make `CONVERSIONS` self-policing.** Give each remaining entry a `why` string naming
   the conversion (e.g. `why: '53,000 sq ft → 4,923.9 m² @ 0.09290304'`), and assert at
   startup that every entry has a non-empty `why`, exiting 2 with a clear message if not.
   Update the docstring to say plainly that **only arithmetic-verified unit conversions
   belong here, and a separator re-typing is a defect to fix, never an entry to add** —
   citing that a `0,50` entry once lived here and suppressed a real finding.

6. **Optional hardening — widen `SEP_TOKEN` for leading-dot decimals.** Change to
   `/(?<![\d.,])\.\d+|\d{1,3}(?:[.,]\d+)+/g`. Measured: **0 new findings across all 9
   locales**, and only 1 bare leading-dot decimal exists in the English corpus. If it
   produces any finding on a full sweep, **drop this step** — it is defensive only and
   must not become a second front.

7. **Chain `check:spans` into the build.** Append `&& npm run check:spans` to the `build`
   script in `package.json`, after `check:runtime`. Only once step 2+3 make it exit 0.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing
below runs until the user confirms — specifically the two Compare cell values from step 3.

### Phase 2 — the three drifted figures

Research prose in the overlay layer, per `PROSE_TRANSLATED`. Mechanism:
[`prose-translation-architecture.md`](.claude/docs/prose-translation-architecture.md).
**Only the `t` field changes; never the `text` field**, which is the English stamp source.

1. **`fa` — `the-arts.fa.json`.** In the unit whose `text` contains
   `.50 GPA weighting`, change `0.50` → `.50` in the `t`. Farsi is RTL: leave the
   surrounding LRI…PDI isolate exactly as-is and change only the digits.

2. **`es` — `the-arts.es.json`.** Same unit: `0,50` → `.50`.

3. **`ht` — `college-support.ht.json`.** In the unit whose `text` contains `high 4s`,
   remove the invented `4.9` and render the tail as a phrase, matching the other eight
   locales (e.g. `… olye ke nan wo 4 yo.`). The `t` must end up carrying **`4.28` only**.
   This is Kreyòl, which has no native-speaker review — keep the change minimal and
   structural rather than restyling the sentence.

4. **Re-verify** with the Phase 2 checks below, and confirm the three `t` fields now carry
   exactly the figures their English carries.

## Files touched

| File | Change |
|---|---|
| `src/pages/Compare.tsx` | edit — `agePointOf` gains `PS`/`PK` (app copy) |
| `scripts/check_span_metrics.mjs` | edit — `agePointOf` gains `PS`/`PK` (checker copy, identical) |
| `src/data/metricValues.ts` | edit — 2 values spell out `Grade 12` (lines 783, 1479) |
| `scripts/check_sep_drift.mjs` | edit — delete the `0,50` entry; `why` field + startup assert; docstring; optional `SEP_TOKEN` widening |
| `package.json` | edit — chain `check:spans` into `build` |
| `src/data/overlays/work/the-arts.fa.json` | edit — `0.50` → `.50` (Phase 2) |
| `src/data/overlays/work/the-arts.es.json` | edit — `0,50` → `.50` (Phase 2) |
| `src/data/overlays/work/college-support.ht.json` | edit — drop invented `4.9` (Phase 2) |

No new files. No `src/locales/*.json` change — this adds no UI chrome string.

## Verification

### Phase 1 — English and code

- [ ] `node scripts/check_span_metrics.mjs; echo $?` — **exit 0**, no `gaston-day`
      findings. Do NOT pipe to `tail`
- [ ] The printed `program-span` table shows `gaston-day` at **-3** (below davidson-day's
      -2) and `summer-ages` shows it at **13** (below charlotte-latin's 14.5) —
      i.e. **both leaders unchanged**, matching the simulation in Context
- [ ] `node scripts/check_sep_drift.mjs --lang es; echo $?` — **exit 1**, reporting the
      now-unsuppressed `0,50`. Expected at this phase; Phase 2 fixes it
- [ ] `grep -c "0,50" scripts/check_sep_drift.mjs` — **0**
- [ ] Temporarily add a `{ token: 'X', requires: 'Y' }` entry with no `why` → the script
      **exits 2** with the guard message. Restore
- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds **and now runs `check:spans`**. Confirm it appears in the
      output, not just that the build passed
- [ ] **Browser check** — Compare page, Program span and Summer ages rows: Gaston Day now
      shows a ranked value rather than an unranked cell, reads `PS–Grade 12` /
      `rising PK–Grade 12`, and the tint still sits on Davidson Day / Charlotte Latin.
      This repo's standing lesson is that render-layer defects survive every automated
      check, so run it in a real browser
- [ ] `git status --porcelain` — empty after every temporary/negative test

### Phase 2 — the three figures

- [ ] `node scripts/check_sep_drift.mjs --lang <code>` for **all nine** locales — every one
      exits **0**
- [ ] `npm run check:runtime` — all 9 locales resolve; the edited entries must still stamp
      (only `t` changed, so hashes are untouched — a failure here means `text` was edited
      by mistake)
- [ ] `npm run check:bidi` and `npm run check:fa` — clean, confirming the `fa` RTL isolate
      survived the digit edit
- [ ] `npm run check:money` / `npm run check:currency` — clean
- [ ] Confirm by inspection that `the-arts.{es,fa}.json` carry `.50` and
      `college-support.ht.json` carries `4.28` and **no** `4.9`
- [ ] `npm run build` — succeeds end to end

## Risks

| Risk | Mitigation |
|---|---|
| Only one `agePointOf` copy is edited — the exact trap the duplication invites | Step 2 names both files; Phase 1 verification checks the checker's own printed ranking, which only agrees if both changed |
| `PK` gets swallowed by the bare-`k` branch | Step 2 places the new lines **before** the `k(indergarten)` test; the printed value must be 4, not 5 |
| The bare-`12` fix is attempted in the parser instead of the data | Decisions records why: a parser change moves how every row reads bare numbers and could shift real tints |
| Deleting the allowlist entry is "fixed" by re-adding it in Phase 2 | Step 5's `why` assert makes a re-add require a false justification; the remedy is to fix the translation |
| A Phase 2 edit touches `text` instead of `t` and re-stamps a hash | `check:runtime` fails loudly on exactly that; called out in Phase 2 verification |
| `ht` rewording drifts register in an unreviewed locale | Step 3 keeps the edit minimal and structural, matching the other eight locales' phrasing rather than restyling |

## Open questions

- **Is `PS` → age 3 right, or should it be 4?** — **default: 3.** Gaston Day's own comment
  on line 783 says *"integrated arts from preschool"*, and the data already distinguishes
  `pre-k` (4) from `K` (5), so preschool sits below pre-K. Either way the tint does not
  move; only Gaston Day's own displayed rank does. Confirm against the school's page if
  the browser check looks off.
- **Should step 6's `SEP_TOKEN` widening ship at all?** — **default: yes, it is measured at
  0 new findings.** Drop it without hesitation if a full sweep disagrees; it is hardening,
  not a fix.
