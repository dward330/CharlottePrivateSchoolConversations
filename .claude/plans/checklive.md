---
name: checklive
title: Make check:live report only real stale translations, and chain it into the build
status: implemented
phases: 1
created: 2026-08-20
branch: fix/check-live-topic-coverage
prs: [167]
---

# Make `check:live` report only real stale translations, and chain it into the build

## Goal

`npm run check:live` currently reports **4,646 unresolvable overlay entries on a clean
`main`** — every one of them a false positive. It is comparing shipped overlays against an
English set built from an incomplete topic list, so four of the ten overlay files are
checked against English that was never loaded.

Fix the coverage so the count goes to **0**, make the same class of bug impossible to
reintroduce silently, and then chain the check into `npm run build` so it actually guards
the thing it was written to guard: a translation whose English was edited underneath it,
which renders English at runtime while `check:translations` reports 100%.

## Context

### What check:live is for

`scripts/check_live_resolution.mjs` exists because `check_runtime_resolution.mjs` cannot
catch the case the stamping mechanism was built for. That script recomputes each shipped
stamp from the **work file's** `text`, so when English prose is edited in `src/data` after
extraction, the work file and the overlay agree with each other and disagree with the app.
Both checks pass; the page silently renders English. `check:live` walks the **live**
per-school modules instead and asserts every shipped stamp still occurs there.

That is a genuinely valuable check, and today it is unusable.

### The defect

[`scripts/check_live_resolution.mjs:41`](../../scripts/check_live_resolution.mjs#L41)
declares a `TOPICS` map with **six** entries. It then loops over **every** `*.<lang>.json`
in `src/data/overlays/` — of which there are **ten**. The four it never sourced English for
have no chance of resolving:

| Overlay topic | Failing / total (fr) | Cause |
|---|---|---|
| `course-offerings` | 2,837 / 2,934 | absent from `TOPICS` |
| `financial-aid-report` | 863 / 885 | absent from `TOPICS` |
| `metric-values` | 392 / 513 | absent from `TOPICS` |
| `student-clubs` | 554 / 933 | present in `TOPICS`, but only `clubsPrograms` is read |
| **total** | **4,646** | identical count on `es`, `ar`, `hi` — it is structural, not locale-specific |

The `student-clubs` row is the same bug one level down. Student Clubs renders five cards
from **three** modules — `clubsPrograms/<slug>.ts` plus `clubClusters.ts` and
`clubCatalog.ts`. `check:live` reads only the first. The failing entries sit under exactly
the `catalog` (520) and `clusters` (186) field paths those two modules supply.

### The fix already exists next door

`scripts/i18n_extract.mjs` — the source of truth for what gets extracted — already solves
every part of this:

- `TOPICS` ([line 59](../../scripts/i18n_extract.mjs#L59)) lists **nine** topics, with
  `null` for the three that live behind an accessor.
- `ACCESSORS` ([line 77](../../scripts/i18n_extract.mjs#L77)) maps those three to
  `[modulePath, exportName]`: `courseOfferings.ts` / `courseOfferings`,
  `financialAidReports.ts` / `financialAidReport`, `metricValues.ts` / `VALUE_METRICS`.
- `EXTRA_LAYERS` ([line 148](../../scripts/i18n_extract.mjs#L148)) carries the two
  Student Clubs sibling modules.
- Both `entryFor` and `extraFor` **fail loudly** (`process.exitCode = 2`, an explicit
  `console.error`) rather than swallowing an import error, with comments recording that a
  silently-dropped layer is exactly how a topic once reported 100% while rendering English.

So this is not new machinery. It is `check:live` being taught what the extractor already
knows.

### Verified during planning, contradicting an earlier assumption

An earlier reading of this problem assumed the accessor modules could not be imported
under plain Node because of `import.meta.glob` (the constraint that forces
`gen_data_schema.mjs` to *parse* the six `*Program.ts` card registries instead of importing
them). **That is not true of these five modules.** Confirmed by direct import:

| Module | Result |
|---|---|
| `src/data/courseOfferings.ts` | OK — exports `courseOfferings`, `loadCourseOfferingsOverlay` |
| `src/data/financialAidReports.ts` | OK — exports `financialAidReport`, … |
| `src/data/metricValues.ts` | OK — exports `VALUE_METRICS`, … |
| `src/data/clubClusters.ts` | OK — exports `clubClusters` |
| `src/data/clubCatalog.ts` | OK — exports `clubCatalog` |

`clubClusters` and `clubCatalog` are **accessor functions taking a slug**
(`clubClusters('cannon')` returns `{verdict, verdictHint, rows}`). An earlier probe that
walked the function object itself, without calling it, wrongly suggested they yielded zero
strings. **Do not add a parsing fallback for these — plain `await import()` works.** The
`import.meta.glob` constraint is real for the `*Program.ts` registries and irrelevant here.

### The list is duplicated across seven scripts, and has already drifted

`grep -l sportsPrograms scripts/*.mjs` returns seven files. Their topic maps do not agree:

| Script | Topics | Wired into `package.json`? |
|---|---|---|
| `i18n_extract.mjs` | 9 (source of truth) | `i18n:report` |
| `check_translations.mjs` | 9 | `check:translations` |
| `check_live_resolution.mjs` | **6** | `check:live` |
| `check_chrome_keys.mjs` | **5** | no — manual only |
| `i18n_audit_skips.mjs` | **5** | no — manual only |

So `check:live` is not uniquely broken; it is the one where the drift was loud enough to
notice. Two other scripts are silently auditing a subset of the app right now, and
`i18n_audit_skips.mjs` is the check CLAUDE.md already records as having missed a defect
once because its sample size doubled as its coverage.

This is the same shape as `LOCALES` in `seo_routes.mjs` — a hand-kept mirror of a list
that lives elsewhere. That one stays honest only because `check:seo` re-parses `TRANSLATED`
and fails on drift. This one has nothing enforcing it.

### One more topic, with no source today

`financial-aid-tuition.content.<lang>.json` exists as an overlay file and is **not** in the
extractor's `TOPICS`. It comes from the second extraction path
(`scripts/i18n_extract_content.mjs`, over `src/content/`), and holds **0 strings** today,
which is why it contributes nothing to the 4,646. It must still be handled deliberately —
see step 4 — or it becomes the next silent false positive the moment it is populated.

## Decisions

- **Extract the shared list into a new `scripts/i18n_topics.mjs`, rather than importing it
  from `i18n_extract.mjs`** — the extractor *runs extraction on import*, which is precisely
  why `check_live_resolution.mjs` says it "kept as its own list rather than imported". A
  neutral data-only module is importable from anything.
- **Move `TOPICS`, `ACCESSORS`, `EXTRA_LAYERS`, `EXPORTS` and `SLUGS` together.** They are
  one fact about the data layout; splitting them recreates the drift at a finer grain.
- **Fix all four scripts that carry a copy, not just `check:live`** — leaving
  `check_chrome_keys.mjs` and `i18n_audit_skips.mjs` on 5-topic lists means shipping a known
  blind spot in two checkers while fixing a third.
- **Add a per-file "no English source" guard** rather than relying on the shared list alone.
  The shared list makes *topic-list* drift impossible; the guard turns any *other* future
  wiring gap into a one-line diagnosis instead of thousands of phantom stale entries. Both
  are needed — see Risks.
- **Chain `check:live` into `npm run build` only after it reports 0**, alongside
  `check:schema` / `check:ranks` / `check:ncsuper`.
- **Do not fix the `financial-aid-tuition.content` overlay by adding it to the structured
  `TOPICS` map** — it comes from a different extractor over a different source tree.
  Skip it explicitly, by name, with a comment.

## Approvals needed

**None.** Scripts and build wiring only; no card, section, stat tile, Compare row, metric
key or topic is added, and no user-facing string changes.

## Out of scope

- Any change to `src/data/**`, `src/content/**`, `src/locales/**` or any overlay file.
  This plan changes only how the check *reads* them. If it turns out a genuine stale entry
  is hiding behind the 4,646 (see step 6), that is a **finding to report, not to fix here**
  — the fix would be a re-extract and re-translation, which is a separate two-phase plan.
- Wiring `check_chrome_keys.mjs` / `i18n_audit_skips.mjs` into `package.json`. Their topic
  lists get fixed; whether they become gates is a separate call.
- The second content extraction path (`src/content/`) beyond explicitly skipping its one
  overlay file.

## Steps

**Single-phase — adds no user-facing text.** Every change is to `scripts/*.mjs` and
`package.json`; no `src/locales/*.json` key and no `src/data/**` prose is touched, so there
is no Phase 2 and no locale work.

1. **Create `scripts/i18n_topics.mjs`** — a new data-only module, no side effects on
   import. Move into it, verbatim from `scripts/i18n_extract.mjs`, the five constants
   `TOPICS`, `ACCESSORS`, `EXTRA_LAYERS`, `EXPORTS`, and `SLUGS`, each with its existing
   explanatory comment (they carry real history — the doubled-`Programs` folder note, the
   `metric-values` "ignores the slug" note, the Student Clubs five-cards note). Export all
   five. Add a header comment stating that this is the single source of truth for the data
   layout, that seven scripts consume it, and that it must import cleanly under plain Node
   (no `import.meta.glob`, no top-level work).

2. **Point `scripts/i18n_extract.mjs` at it** — delete the five local declarations, import
   them from `./i18n_topics.mjs`. Behaviour must be identical; this is the control for
   step 6's before/after comparison.

3. **Rewrite the source-loading half of `scripts/check_live_resolution.mjs`** to match the
   extractor's, importing the shared list:
   - Replace the local 6-entry `TOPICS` and `EXPORTS` with the shared import.
   - Port `entryFor(topic, slug)` — accessor topics first (`ACCESSORS`), falling back to
     `src/data/<dir>/<slug>.ts`. Reuse the extractor's non-function branch: a plain export
     such as `VALUE_METRICS` is shared across schools, so attribute it to `SLUGS[0]` only.
   - Port `extraFor(topic, slug)` for `EXTRA_LAYERS`, calling each accessor **with the
     slug** — `clubClusters('cannon')`, not the bare export.
   - Keep walking every string leaf unfiltered by the prose/skip classification; the
     existing docstring explains why a superset is correct here, and that reasoning still
     holds.
   - Adopt the extractor's loud-failure policy: an accessor or extra layer that throws
     prints `✗`/`!` and sets a non-zero exit rather than being swallowed by the current
     bare `catch { continue }`. A school that genuinely has no entry for a topic stays
     silent — that is normal and must not become noise.

4. **Add the "no English source" guard to `check_live_resolution.mjs`** — the part that
   stops a *future* wiring gap from looking like stale translations. Before checking any
   overlay file, group the live stamps by topic. For each overlay file about to be checked,
   if its topic contributed **zero** live English strings, fail with a distinct message —
   e.g. `✗ no English source loaded for topic 'X' — every entry in X.<lang>.json would
   report unresolvable; this is a wiring bug in i18n_topics.mjs, not a stale translation` —
   and do **not** emit per-entry findings for that file. Explicitly allowlist
   `financial-aid-tuition.content` by name, with a comment saying it comes from the
   `src/content` extractor (`i18n_extract_content.mjs`) and holds 0 strings today, so it is
   skipped rather than sourced.

5. **Fix the two silent copies** — `scripts/check_chrome_keys.mjs` and
   `scripts/i18n_audit_skips.mjs` both carry 5-topic maps. Replace each with the shared
   import. Run both before and after and record the delta; each is currently auditing a
   subset of the app, so their output is expected to *grow*. Any new finding they surface
   is a **report, not a fix** under this plan's scope.

6. **Verify the count reaches 0 and prove no real defect was masked** — run
   `node scripts/check_live_resolution.mjs --lang <code>` across every locale in
   `PROSE_TRANSLATED`. Expected: **0 unresolvable**. If any entry still fails, it is a
   *genuine* stale translation that the 4,646 of noise was hiding, which is the outcome
   this check exists to produce: report it with topic, field path and locale — do not fix
   it here (see Out of scope). Also confirm `npm run i18n:report` output is byte-identical
   to before step 2, proving the extractor's behaviour did not change.

7. **Chain it into the build** — add `check:live` to the `build` script in `package.json`,
   after `check:ncsuper`. Only once step 6 shows 0 across all locales. Confirm
   `npm run build` still succeeds end to end.

8. **Record the finding in `CLAUDE.md`** — a short entry under the i18n standard: that the
   topic/accessor layout is defined once in `scripts/i18n_topics.mjs` and must never be
   re-declared locally; that `check:live` is now a build gate; and the one-line reason
   (four of ten overlay topics were unsourced, so the check sat at a permanent 4,646 and
   was therefore never read — the same failure mode already recorded for `check:sepdrift`).

## Files touched

| File | Change |
|---|---|
| `scripts/i18n_topics.mjs` | **new** — shared `TOPICS` / `ACCESSORS` / `EXTRA_LAYERS` / `EXPORTS` / `SLUGS`, no import side effects |
| `scripts/i18n_extract.mjs` | edit — delete the five local constants, import them instead |
| `scripts/check_live_resolution.mjs` | edit — shared list, accessor + extra-layer support, loud failures, per-topic empty-source guard |
| `scripts/check_chrome_keys.mjs` | edit — replace 5-topic map with the shared import |
| `scripts/i18n_audit_skips.mjs` | edit — replace 5-topic map with the shared import |
| `package.json` | edit — add `check:live` to `build` |
| `CLAUDE.md` | edit — record the single-source rule and the new build gate |

## Verification

Single-phase, so one pass.

- [ ] `node scripts/check_live_resolution.mjs --lang fr` — **0 unresolvable** (was 4,646)
- [ ] Same for every locale in `PROSE_TRANSLATED` — `es bn ht te fr fa it hi ar` — all 0.
      The count was identical (4,646) across locales before the fix, so any locale that
      differs afterwards is a real finding.
- [ ] `npm run i18n:report` — output identical to before step 2 (the extractor must be
      behaviourally unchanged by the constant move)
- [ ] `npm run check:translations` — still `✓ no drift`
- [ ] `npm run check:runtime` — still `✓ all 9 prose locales resolve`
- [ ] `node scripts/check_chrome_keys.mjs` — passes; note any findings newly visible
- [ ] `node scripts/i18n_audit_skips.mjs --lang fr` — runs; note any findings newly visible
- [ ] `npx tsc -b` — clean
- [ ] `npm run build` — succeeds with `check:live` chained in
- [ ] **Negative test — the guard actually guards.** Temporarily remove one topic from
      `TOPICS` in `i18n_topics.mjs`, re-run `check:live`, and confirm it reports the single
      `no English source loaded for topic 'X'` line rather than thousands of per-entry
      findings. Restore. This is the step that proves the fix stops the false positives
      from coming back rather than merely clearing today's.
- [ ] **Negative test — a real stale entry is still caught.** Edit one English string in a
      `src/data/**` file that has a shipped translation, re-run `check:live`, confirm it
      reports exactly that entry as unresolvable, then revert. Proves the fix did not
      achieve 0 by weakening the check.

No browser check: this plan changes no rendering path and no user-facing string.

## Risks

| Risk | Mitigation |
|---|---|
| Reaching 0 by weakening the check rather than fixing coverage | The second negative test in Verification: a deliberately-edited English string must still be caught. Non-negotiable — without it, 0 proves nothing. |
| The empty-source guard masks a topic that legitimately has no strings | `financial-aid-tuition.content` is the only such case today and is allowlisted **by name**, not by "0 strings is fine". A topic silently becoming empty still fails. |
| Moving constants changes extractor behaviour | Step 2 is a pure move; step 6 diffs `i18n:report` output before and after. Do step 2 as its own commit so it can be reverted independently. |
| Chaining `check:live` into `build` blocks the build on a pre-existing genuine defect | Step 7 is explicitly gated on step 6 reporting 0. If step 6 surfaces a real stale entry, **do not chain it** — report the finding and leave step 7 for a follow-up once the re-translation lands. |
| The two now-fixed sibling checkers surface a backlog of real findings | Expected and in scope to *report*, out of scope to fix. They are not build gates, so a non-zero result blocks nothing. |

## Open questions

- **If step 6 surfaces genuine stale entries, do they get fixed in this PR?** — **default:**
  no. Report them with topic, path and locale, and leave `check:live` unchained (skip step
  7) so the build does not start failing on pre-existing debt. A re-extract and
  re-translation is two-phase work and belongs in its own plan.
- **Should `check_chrome_keys.mjs` and `i18n_audit_skips.mjs` become build gates too?** —
  **default:** no, not in this plan. Fix their coverage, report what that reveals, and let
  the user decide separately.


## Implementation notes

Shipped as planned. Every verification item passed, including both negative tests.
Three deviations, all additive:

**`check:live` gates all nine locales, not just `fr`.** Step 7 said to chain
`npm run check:live` into the build, but the underlying script defaults to
`--lang fr`, so the bare command would have gated on one locale out of nine —
the same partial-coverage shape this plan exists to remove. Added
`scripts/check_live_all.mjs`, mirroring the existing `check_runtime_all.mjs`
(which was written to fix this exact `--lang fr` pin on `check:runtime`).
`check:live` now runs the wrapper; `check:live:one` is the single-locale form.

**`check_chrome_keys.mjs` and `i18n_audit_skips.mjs` gained accessor and
extra-layer support**, not just the shared topic list. Importing `TOPICS` alone
would have handed both scripts three topics whose directory value is `null`,
which they would have skipped silently — the coverage would have looked fixed
while three of nine topics stayed unread. Both now carry the extractor's
`entryFor` / `extraFor`.

**A CLAUDE.md correction alongside the new entry.** The existing paragraph said
`check:runtime` "recomputes every stamp from live `src/data/**`". It recomputes
from the *work file* — which is precisely why `check:live` had to exist. Since
the new entry sits directly beneath it, leaving the two adjacent and
contradictory would have been worse than either alone.

### Findings — reported, not fixed (per Out of scope)

Step 6 found **no** genuine stale entries: all nine locales report 0, so the
4,646 was false positives end to end and step 7 was unblocked.

The two now-un-blinded sibling checkers did surface findings, both pre-existing
and neither a build gate:

- **`check_chrome_keys.mjs` now exits 1 on a real defect.** `'Half day'` appears
  in `days` and `dayFilters` in `src/data/summer/charlotte-catholic.ts` and has
  no `afterSchool.day_*` locale key. Those fields are skipped for translation on
  the promise that chrome renders them, so the raw English reaches the page in
  all nine locales. It was invisible before because `summer-programs` was one of
  the four topics the 5-topic map never read. This is the same defect class as
  the original `day` → `Mon` finding the script was written for.
- **`i18n_audit_skips.mjs` went from 10 to 22 advisory suspect fields.** The
  newly visible ones are mostly genuine codes (`cat`, `category`, `token`,
  `icon`, `defaultTier`, `status`) — advisory, as designed, and consistent with
  the fields it already reported. Worth one review pass; nothing here is
  self-evidently a leak.

Neither script is wired into `package.json` as a gate, per the plan's second
open question (default: no).
