---
name: selectivity-rows
title: Put the six selectivity buckets on the College Support Compare table, and drop AP scope + National Merit
status: english-done
phases: 2
created: 2026-08-02
branch: feat/selectivity-rows
prs: []
---

# Put the six selectivity buckets on the College Support Compare table

## Goal

The Compare view's **College Support** topic currently shows four value rows: AP scope,
AP scoring 3+, National Merit, Seniors per counselor. Two of them (AP scope, National
Merit) are half-empty — National Merit is `null` for three of six schools — and the
comparison a parent actually wants, *how much of each selectivity tier does this school's
acceptance list cover*, lives only on the individual school pages.

After this change the College Support block reads:

| Row | |
|---|---|
| AP scoring 3+ | kept, unchanged |
| Ivy League | new |
| “Ivy Plus” | new |
| Top-75 National Universities | new |
| Top-75 Liberal Arts | new |
| Power Four | new |
| HBCUs | new |
| Seniors per counselor | kept, moved to last |

Each new cell shows the fraction the school page already shows — `8 / 8`, `46 / 75`,
`14 / 107`. We'll know it worked when the Compare table renders eight rows in that order,
every cell populated for all six schools (no N/A in the six new rows), and all eight
non-English locales still render translated labels rather than silently falling back to
English.

## Context

### Where the data already lives

Every school's selectivity table is authored in its
`src/data/collegeSupportPrograms/<school>.ts` file as a `buckets: Bucket[]`, typed at
[collegeSupport.ts:173-181](src/data/collegeSupport.ts#L173-L181):

```ts
export type Bucket = {
  tier: string   // "Ivy League", "Top-75 National Universities"
  count: string  // "7 / 8", "46 / 75"
  note?: string  // "— absent Harvard, across seven published classes"
}
```

**All six schools carry all six tiers, in the same order, with identical `tier` strings**
— verified by grepping `tier:` across all six files. There are no gaps and no naming
drift, so the six new Compare rows are a clean 6×6 with no `null` cells. The values, for
transcription:

| Tier | cannon | charlotte-christian | charlotte-country-day | charlotte-latin | davidson-day | providence-day |
|---|---|---|---|---|---|---|
| Ivy League | `3 / 8` | `2 / 8` | `7 / 8` | `5 / 8` | `3 / 8` | `8 / 8` |
| “Ivy Plus” | `10 / 17` | `4 / 17` | `13 / 17` | `12 / 17` | `8 / 17` | `17 / 17` |
| Top-75 National Universities | `46 / 75` | `30 / 75` | `55 / 75` | `53 / 75` | `44 / 75` | `58 / 75` |
| Top-75 Liberal Arts | `27 / 75` | `7 / 75` | `41 / 75` | `40 / 75` | `26 / 75` | `43 / 75` |
| Power Four | `43 / 68` | `34 / 68` | `53 / 68` | `53 / 68` | `42 / 68` | `57 / 68` |
| HBCUs | `5 / 107` | `10 / 107` | `18 / 107` | `6 / 107` | `3 / 107` | `14 / 107` |

Transcribe these from the source files rather than from this table where they disagree —
the source files are authoritative. (Note Charlotte Latin's Power Four cell is `53 / 68`
in `buckets`, with a per-school note recording that the researcher's exact count was 62;
the Compare cell takes `53 / 68`, matching what the school page's table shows.)

### Where Compare rows are defined

Rows come from `VALUE_METRICS` in [metricValues.ts:26](src/data/metricValues.ts#L26) — a
single flat array shared by every topic, hand-maintained, **not** produced by the ingest
pipeline. The College Support block is rows **4–7** (`ap-scope`, `ap-performance`,
`national-merit`, `counselor-caseload`) at
[metricValues.ts:93-152](src/data/metricValues.ts#L93-L152). The shape:

```ts
export type ValueMetric = {
  topic: string                            // 'college-support'
  key: string
  label: string
  note?: string                            // small print under the label
  values: Record<string, string | null>    // school slug -> display string | null (N/A)
}
```

[Compare.tsx:165](src/pages/Compare.tsx#L165) maps over these **in array order with no
sort**, so row order in the table is literally array order in the file. Reordering is
therefore just moving object literals.

Neither `ap-scope` nor `national-merit` is referenced anywhere outside `metricValues.ts`
(grepped across `src/` and `scripts/`, excluding the `src/content/` research prose). They
can be deleted outright.

### The constraint that makes this a careful change

`metricValues.ts` is translated through the **content-hash overlay layer**, and its
overlay keys are **array-index-based**. From the doc comment on `valueMetricsForTopic` at
the bottom of [metricValues.ts](src/data/metricValues.ts):

> The extractor walks the WHOLE array, so overlay keys read `providence-day:[17].label`
> — the array index is part of the path, not the prefix.

A real entry from `src/data/overlays/metric-values.es.json`:

```json
{ "t": "Asignaturas catalogadas en Upper School",
  "of": "17b53156",
  "at": ["providence-day:[0].label"] }
```

Resolution at [localizeData.ts:137](src/lib/localizeData.ts#L137) requires **both** the
path to match **and** the content hash to match the live English:

```ts
if (!hit || hit.of !== stampFor(node)) return node   // silently falls back to English
```

The current array is 21 rows (indices 0–20). This change removes two rows from the
college-support block and inserts six, so **every row after the block shifts by +4** —
indices 8–20 today (all of Financial Aid, The Arts, After School, Sports) become 12–24.
Those rows' overlay entries would then point at the wrong paths, the hashes would
mismatch, and **eight locales would silently fall back to English on ~13 rows × 2 fields**
with no error and no coverage change. This is exactly the failure mode CLAUDE.md flags:
*"Coverage at 100% does not mean the page renders the language."*

**The fix is not manual editing of the overlays — it is re-extracting them**, which is
what Phase 2 does. `npm run check:runtime` is the gate that proves it worked; it currently
passes clean (`es: 5926 shipped entries across 9 overlay file(s) — ✓ every shipped stamp
recomputes from live English`), and it must pass clean again for all eight locales before
this ships.

### One pre-existing fragility, deliberately not fixed

`numericOf` at [Compare.tsx:41-45](src/pages/Compare.tsx#L41-L45) drives the "lead value"
highlight by stripping every non-digit and calling `parseFloat`. On a fraction it
concatenates: `'46 / 75'` → `4675`. Because every school in a given row shares the same
denominator, digit-concatenation happens to preserve the correct ordering — **verified
against all six rows of real data; the highlighted winner is correct in every one**
(`8 / 8`, `17 / 17`, `58 / 75`, `43 / 75`, `57 / 68`, `18 / 107`).

It is right by coincidence, not by construction. Leave it alone (see Decisions) but do not
mistake the passing behaviour for a correct implementation.

## Decisions

- **Cells show the fraction only, not the per-school note** — user's call. `8 / 8`, not
  `8 / 8 — no absences, all bolded`. The notes run to 60+ characters (Cannon's Ivy note
  names six universities) and would blow out row height across six columns. They already
  render on each school's own bucket table, which is where the detail belongs.
- **Each new row gets a `note` definition** — user's call. Six short definitions of the
  form "Of the N …, how many appear on the school's acceptance list", with the
  derived-analysis caveat carried on the rows. Without them the tier labels are bare and
  the table loses the "derived analysis, not school-reported" qualifier every school page
  carries under its bucket table.
- **Values are transcribed into `metricValues.ts`, not computed from `buckets` at
  runtime** — `VALUE_METRICS` is a hand-maintained flat array of display strings and every
  other row in it is a literal. Deriving these six at runtime would make this the only
  topic whose Compare rows read from another data module, and would fight the overlay
  extractor, which walks the literal array. Keep the file boring and consistent; add a
  comment on each value giving its source school file, as the neighbouring rows do.
- **`ap-scope` and `national-merit` are deleted, not commented out** — nothing references
  them, and git history is the record. Their overlay entries disappear on re-extraction.
- **Row keys are `bucket-ivy`, `bucket-ivyplus`, `bucket-nu75`, `bucket-lac75`,
  `bucket-p4`, `bucket-hbcu`** — mirrors the `cats` bucket keys already used on the
  `College` type at [collegeSupport.ts:192-195](src/data/collegeSupport.ts#L192-L195)
  (`'ivy' | 'ivyplus' | 'nu75' | 'lac75' | 'p4' | 'hbcu'`), prefixed to stay unambiguous
  in a flat cross-topic key space.
- **`numericOf` is left unchanged** — it produces the right winner on all six rows today.
  Teaching it to parse fractions is a behaviour change to a shared function used by every
  topic's highlight logic, and is out of scope for a row-layout change.

## Approvals needed

**None.** This adds six Compare rows, which under a strict reading of the UX-design gate
in `CLAUDE.md` would need approval — but that gate governs *ingestion* work silently
growing the interface. Here the user explicitly requested these exact rows, this exact
ordering, and the two removals, which is the direct-request case the standard exempts.

No new card, section, component, or styling is introduced: `VALUE_METRICS` rows render
through the existing `.value-row` markup at
[Compare.tsx:174](src/pages/Compare.tsx#L174).

## Out of scope

- Changing the per-school bucket tables on the school detail pages — untouched.
- The acceptance-list filter chips and their `cats` keys — untouched.
- Fixing `numericOf` to parse fractions properly (see Decisions).
- The lead-highlight visual treatment for fraction rows generally.
- Adding buckets for tiers not already in all six school files.
- The seven known English strings that ship in non-English locales (the open defect
  recorded in `CLAUDE.md`) — unrelated to this change; do not try to fix it here.

## Steps

Two phases: **Phase 1 adds six new English `label` and `note` strings** to a translated
data module, so it cannot ship to the other eight locales until the wording is reviewed.

### Phase 1 — English

1. **Branch.** `git checkout main && git pull`, then
   `git checkout -b feat/selectivity-rows`.

2. **Delete the `ap-scope` row** — remove the whole object literal at
   [metricValues.ts:93-109](src/data/metricValues.ts#L93-L109) (`key: 'ap-scope'`).

3. **Delete the `national-merit` row** — remove the whole object literal at
   [metricValues.ts:121-137](src/data/metricValues.ts#L121-L137)
   (`key: 'national-merit'`).

4. **Add the six bucket rows** to the college-support block, positioned **after
   `ap-performance` and before `counselor-caseload`**. Order matters — it is the render
   order. Transcribe each school's `count` verbatim from
   `src/data/collegeSupportPrograms/<school>.ts`, and follow the file's existing house
   style of a trailing `//` comment on each value naming where it came from.

   ```ts
   {
     topic: 'college-support',
     key: 'bucket-ivy',
     label: 'Ivy League',
     note: 'Of the 8 Ivy League universities, how many appear on the school’s published acceptance list. Derived from that list against the 2026 U.S. News tables — not a school-reported figure.',
     values: {
       cannon: '3 / 8',                     // buckets, collegeSupportPrograms/cannon.ts
       'charlotte-christian': '2 / 8',
       'charlotte-country-day': '7 / 8',
       'charlotte-latin': '5 / 8',
       'davidson-day': '3 / 8',
       'providence-day': '8 / 8',
     },
   },
   ```

   Then the same shape for the remaining five, with these labels, denominators and notes:

   | key | label | note (definition) |
   |---|---|---|
   | `bucket-ivyplus` | `“Ivy Plus”` | Of the 17 “Ivy Plus” institutions — the eight Ivies plus Stanford, MIT, Chicago, Duke, Caltech and peers — how many appear on the school’s acceptance list. |
   | `bucket-nu75` | `Top-75 National Universities` | Of the top 75 National Universities in the 2026 U.S. News table, how many appear on the school’s acceptance list. |
   | `bucket-lac75` | `Top-75 Liberal Arts` | Of the top 75 Liberal Arts Colleges in the 2026 U.S. News table, how many appear on the school’s acceptance list. |
   | `bucket-p4` | `Power Four` | Of the 68 Power Four athletic-conference universities (ACC, Big Ten, Big 12, SEC — including Notre Dame), how many appear on the school’s acceptance list. |
   | `bucket-hbcu` | `HBCUs` | Of the 107 Historically Black Colleges & Universities, how many appear on the school’s acceptance list. |

   Use typographic quotes and apostrophes (`’`, `“ ”`) to match the surrounding file.
   Carry the derived-analysis caveat sentence (*"Derived from that list against the 2026
   U.S. News tables — not a school-reported figure."*) on the `bucket-ivy` note as written
   above; the other five notes do not need to repeat it.

   **On the Power Four denominator: 68 is correct** — all conference members including
   Notre Dame. A web search will suggest 67 (football-only membership). Do not "correct"
   it.

5. **Move `counselor-caseload` to last** in the college-support block — it must follow
   `bucket-hbcu`. It is unchanged apart from position.

6. **Verify the block reads**, top to bottom: `ap-performance`, `bucket-ivy`,
   `bucket-ivyplus`, `bucket-nu75`, `bucket-lac75`, `bucket-p4`, `bucket-hbcu`,
   `counselor-caseload` — eight rows, and the array is now 25 entries (was 21).

7. **Run the Phase 1 verification below**, then commit to the branch. Do **not** open the
   PR yet and do **not** touch any overlay or locale file.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Six new
`label` strings and six new `note` strings are going into eight other languages; none of
that runs until the user confirms the English wording — especially the six `note`
definitions, which are new prose written during planning and have never been seen
rendered.

### Phase 2 — Every other locale

Only after that confirmation.

This is **research-prose layer, not UI chrome** — `metricValues.ts` lives in `src/data/`
and is translated by the content-hash overlay mechanism, so the scope is
`src/data/overlays/metric-values.<lang>.json` per **`PROSE_TRANSLATED`**, *not* the
`src/locales/*.json` catalogs. No key is added to `src/locales/`; `Compare.tsx` already
renders `vm.label` and `vm.note` directly from the data.

The eight locales with a `metric-values` overlay on disk: `bn`, `es`, `fa`, `fr`, `hi`,
`ht`, `it`, `te`.

1. **Re-extract the overlay work files** for `metric-values` in all eight locales. The
   array indices have shifted by +4 for every row after the college-support block, so
   entries carried over by path alone would land on the wrong row. Follow the mechanism in
   [`prose-translation-architecture.md`](.claude/docs/prose-translation-architecture.md)
   rather than hand-editing JSON.

2. **Re-key surviving translations by English text, never by index.** Rows 8–20 (now
   12–24) keep identical English `label`/`note`, so their existing translations are still
   valid and must be carried onto the new paths — matched on the English source string.
   Keying by position here would ship fluent prose against the wrong row at 100% coverage,
   which is the single worst failure mode in this repo's i18n history.

3. **Drop the `ap-scope` and `national-merit` entries** — their English no longer exists,
   so they must not carry forward.

4. **Translate the twelve new strings** (six `label`, six `note`) in each of the eight
   locales.

   Locale-specific traps, from the rollout docs — do not re-derive them:
   - **Figures are copied char-for-char.** `46 / 75` stays `46 / 75` in every locale. These
     are the school's own published counts; a parent matches them against the source. No
     re-typing, no separator swaps, no digit-system conversion.
   - **`hi` / `te` regroup at render.** Do not pre-apply lakh/crore grouping in a work
     file — the render layer would apply it a second time. Store the English form.
   - **`fa` is RTL.** Bidi-neutral tokens in these strings (`8 / 8`, `2026`, the `—` in the
     notes) need LRI…PDI isolates so a fraction reads left-to-right inside a right-to-left
     paragraph. See [`prose-translation-fa.md`](.claude/docs/prose-translation-fa.md).
   - **`fr`** — keep `%` unspaced if any percentage appears; leave searchable identifiers
     (`U.S. News`, `HBCU`, `Power Four`) in English, per
     [`prose-translation-fr.md`](.claude/docs/prose-translation-fr.md).
   - **`hi`** targets मानक हिन्दी, not over-Sanskritized शुद्ध हिन्दी. Domain loanwords in
     Devanagari; Latin identifiers stay Latin.

5. **Rebuild the shipped overlays** from the work files and run the Phase 2 verification.

6. **Open one PR** carrying both phases, per the repo's branch-and-PR flow. Never push to
   `main`.

7. **Update `.claude/plans/INDEX.md`** — flip this plan's row to `Implemented` with the PR
   link. Add an `## Implementation notes` section here if the build deviated.

## Files touched

| File | Change |
|---|---|
| `src/data/metricValues.ts` | edit — delete 2 rows, add 6, reorder 1; array 21 → 25 entries |
| `src/data/overlays/metric-values.bn.json` | edit (Phase 2) — re-extracted; paths shift +4, 12 new strings |
| `src/data/overlays/metric-values.es.json` | edit (Phase 2) — same |
| `src/data/overlays/metric-values.fa.json` | edit (Phase 2) — same, plus RTL isolates |
| `src/data/overlays/metric-values.fr.json` | edit (Phase 2) — same |
| `src/data/overlays/metric-values.hi.json` | edit (Phase 2) — same |
| `src/data/overlays/metric-values.ht.json` | edit (Phase 2) — same |
| `src/data/overlays/metric-values.it.json` | edit (Phase 2) — same |
| `src/data/overlays/metric-values.te.json` | edit (Phase 2) — same |
| `.claude/plans/INDEX.md` | edit — status → Implemented, PR link |

No component, style, or locale-catalog file changes. `Compare.tsx` is **read** during
verification but not edited.

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds
- [ ] `npm run check:metrics` — passes
- [ ] `npm run check:runtime` — **expected to FAIL or report stale entries at this point.**
      Phase 1 shifts the array indices while the overlays still hold the old paths. Record
      the failure; it is the thing Phase 2 fixes. If it passes clean, something is wrong
      with your understanding of the overlay paths — stop and re-read
      `valueMetricsForTopic`.
- [ ] **Browser check** (`npm run dev`, Compare → College Support, all six schools
      selected). Confirm, in this order:
      - Exactly eight rows under KEY STATS.
      - Order: AP scoring 3+, Ivy League, “Ivy Plus”, Top-75 National Universities, Top-75
        Liberal Arts, Power Four, HBCUs, Seniors per counselor.
      - AP scope and National Merit are **gone**.
      - No `N/A` in any of the six new rows — all 36 cells populated.
      - Spot-check three cells against the school pages: Providence Day Ivy = `8 / 8`,
        Charlotte Christian Top-75 Liberal Arts = `7 / 75`, Davidson Day HBCUs = `3 / 107`.
      - The lead highlight lands on the genuinely highest numerator in each new row
        (`8 / 8`, `17 / 17`, `58 / 75`, `43 / 75`, `57 / 68`, `18 / 107`) — see the
        `numericOf` note in Context.
      - Row-label small print renders and wraps without breaking the layout at a narrow
        viewport.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — **now passes clean for every locale.** This is the gate
      that proves the index shift was absorbed; a silent English fallback shows up here and
      nowhere else.
- [ ] `npm run check:hashes` — stamp parity
- [ ] `npm run check:translations` — passes
- [ ] `npm run check:sepdrift -- --lang <code>` for each of the eight locales — no
      separator drift in the fractions
- [ ] `npm run check:currency` and `npm run check:money` — no regression
- [ ] `npm run check:bidi` and `npm run check:fa` — Farsi isolates correct
- [ ] `npm run check:hi` — Hindi numerals
- [ ] `npm run check:fr` — French identifiers
- [ ] `npx tsc --noEmit` and `npm run build` — clean
- [ ] **Browser check in a real browser, not headless.** Switch the Compare → College
      Support view to at least `fa` (RTL), `hi` (lakh/crore + Devanagari) and one Latin
      locale. Confirm the six new row labels and notes render **translated, not English** —
      a silent fallback is invisible to every check above except `check:runtime` — and that
      fractions still read `8 / 8` left-to-right in Farsi.

## Risks

| Risk | Mitigation |
|---|---|
| Index shift silently drops ~13 rows × 2 fields to English in 8 locales | The whole of Phase 2; `npm run check:runtime` is the gate. Do not merge on a Phase-1-only green build. |
| Re-keying overlay entries by position instead of English text ships correct-looking prose on the wrong row at 100% coverage | Phase 2 step 2 is explicit: match on the English source string. This has bitten this repo before. |
| A `count` is mis-transcribed from a school file | Phase 1 browser check spot-checks three cells against the school pages; the table in Context is a cross-reference, with the source files authoritative. |
| Power Four denominator "corrected" from 68 to 67 | Called out inline in step 4. 68 includes Notre Dame; 67 is football-only. |
| Lead highlight misbehaves on fractions if bucket data later changes | Documented in Context as coincidental-but-currently-correct; out of scope, flagged for whoever next edits `numericOf` or the bucket counts. |

## Open questions

None blocking. Two judgment calls the user may want to revisit once they see it rendered —
both cheap to change during the Phase 1 review gate, which is exactly what that gate is
for:

- The six `note` definitions are new prose written at planning time and never seen
  rendered. — **default:** ship them as written in step 4 and let the Phase 1 review
  settle the wording before any translation happens.
- Whether `“Ivy Plus”` should keep its typographic quotes in the Compare row label, given
  the narrower column. — **default:** keep them; it matches the school-page bucket tables
  and every other label in the file.

## Implementation notes

**Phase 1 (English) shipped as planned** — `ap-scope` and `national-merit` deleted, six
bucket rows added after `ap-performance`, `counselor-caseload` moved last. Array is 25
data rows (was 21). Both judgment calls resolved on their defaults: `note` prose shipped
as written, `“Ivy Plus”` kept its typographic quotes.

**Correction to the Verification section — `check:runtime` does NOT fail in Phase 1.**
The plan predicted `npm run check:runtime` would fail after the index shift and said "if
it passes clean, something is wrong with your understanding of the overlay paths." It
passes clean (all locales), and the plan's prediction was wrong about the checker's
mechanism — not about the underlying risk.

`scripts/check_runtime_resolution.mjs` matches each shipped stamp against the English
stored in the **work file**, keyed by content hash, and **never validates paths**
(`byStamp.set(u.of ?? stamp(src), src)` at lines 62–63; it looks entries up by `of`, not
by `at`). The surviving rows keep identical English `label`/`note`, so their stamps still
recompute cleanly even though their array-index paths shifted +4. The deleted rows'
English still lives in the work files, so nothing orphans either. The checker is therefore
structurally blind to a pure path shift.

The runtime path-shift breakage is nonetheless **real**: `localized()` in
`src/lib/localizeData.ts` (line 134-137) resolves by path AND hash, so a `[8].label`
overlay entry will not be found once that row is at `[12]`, and the page silently falls
back to English. That is exactly what Phase 2's re-extraction fixes. The gate that will
actually catch it is the **Phase 2 browser check** (labels rendering translated vs.
English), not `check:runtime`. Verified empirically: the `fr` overlay references array
indices `[0]`–`[20]`, all now off by +4 for post-college-support rows.

Phase 1 verification results: `tsc --noEmit` clean; `npm run build` succeeds;
`check:metrics` reports "25 value metric(s) cover every ingested school" (its exit-1 is 9
pre-existing "not ingested" advisories in `branding/` and `_shared/`, unrelated to this
change and present on `main`); browser check on the real dev server confirmed all eight
rows in order, 36/36 bucket cells populated, correct lead highlights, and clean note
wrapping with no horizontal overflow at 390px.
