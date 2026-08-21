---
name: contentlive
title: Check the content overlay's 70 blocks per locale for wrong-but-well-formed translations, the one gap neither resolution checker covers
status: implemented
phases: 1
created: 2026-08-20
branch: fix/content-overlay-live-check
prs: [171]
---

# Close the real gap on `financial-aid-tuition.content`

## Goal

The `financial-aid-tuition.content` overlay ships **70 translated blocks in each of the
nine locales** (630 blocks total, 2,353 English words). It is the only overlay produced by
a different extractor (`i18n_extract_content.mjs` over `src/content/**`), and the only one
listed in `check:live`'s `FOREIGN_TOPICS`.

**The gap is narrower and different from what the `chromeguard` plan and PR #170 implied.**
Both said these 70 blocks are "covered by `check:runtime` but not by `check:live`", which
reads as *the resolution gap is open*. Measured on `main` at 2026-08-20, that is wrong — see
[Context](#context--what-is-actually-covered-measured-not-assumed) for the experiments.
Resolution IS covered, by `verifyForeignTopic()`'s gate 2, which fails the build on a live
`src/content` English edit. What is genuinely uncovered is **a different failure: a block
whose hash is valid but whose translated text is wrong, empty, or still English.**

Done when a corrupted, emptied, or English-left translation value in any
`financial-aid-tuition.content.<lang>.json` fails a check, and the check is chained into
`npm run build`.

**Single-phase — adds no user-facing text.** This is a checker plus a `package.json` entry.
No `src/locales/*.json` key, no overlay content, no component. The two-phase English-first
rule does not apply, and `/implement` should not stop for a wording review.

## Context — what is actually covered, measured not assumed

Four experiments were run on clean `main` (commit `aac242e`) during planning. Each mutated
one file, ran the checkers, and restored. **Reproduce them rather than trusting this table**
— step 1 below is exactly that.

| Failure injected | `check:live` | `check:runtime` |
|---|---|---|
| English edited in `src/content/financial-aid-tuition/gaston-day.json` (`Platform: Clarity` → `ClarityX`) | **exit 1** ✅ | exit 0 |
| Translation value replaced with garbage, hash left valid | exit 0 | exit 0 ❌ |
| Translation value emptied / left as English | exit 0 | exit 0 ❌ |
| Stale or misspelled `FOREIGN_TOPICS` entry | exit 1 ✅ | n/a |

The first row is the important correction. `check:live` reported:

```
✗ FOREIGN_TOPICS entry 'financial-aid-tuition.content': 1 of 70 shipped block hash(es)
  do NOT reproduce from a fresh extract of src/content/financial-aid-tuition/ — e.g. 0a2c47a8.
  Either the English moved, or this overlay was not made by that extractor.
```

and exited **1** (verified unpiped — `process.exitCode` makes a piped check read `0`
misleadingly; this trap is recorded in `chromeguard.md` too).

**Why the earlier claim was wrong, and it is worth knowing:** gate 2 was designed to prove
*the allowlist entry is honest* — that these blocks really came from that extractor. But it
proves it by requiring `shipped ⊆ fresh extract of src/content/**`, and a hash is a stamp of
the live English. So it incidentally, and genuinely, catches drift between the shipped
overlay and live English. It does the resolution job under another name. The `chromeguard`
docstring's framing ("what that does NOT buy") is about a *determined maintainer bypass*,
not about resolution — those two were conflated.

**`check:runtime` does walk this file** — `10 overlay file(s)`, and `ls src/data/overlays/*.es.json`
is 10. The 70-block arithmetic that looked like a coverage gap (`11411 − 11341 = 70`) is
real but means only that `check:live`'s *entry counter* excludes them, not that nothing
checks them.

### Why the remaining gap is worth closing anyway

The uncovered failure — **valid hash, wrong text** — is the one that ships silently to a
reader. And this content is unusually bad to get wrong:

- **Verbatim Wayback-cited tuition figures.** e.g. `"2021-2022 Tuition: JrK $18,330
  Kindergarten $18,965 Grades 1- 4 $20,350 Grades 5 - 8 $22,500 Grades 9 - 12 $25,080"`,
  quoted char-for-char with archive snapshot IDs. CLAUDE.md's standing rule is that a
  figure is copied char-for-char because a parent matches it against the school's own page.
- **A correction warning that inverts if mistranslated.** Charlotte Catholic's block reads
  *"⚠️ **Not FACTS and not TADS** — FACTS appears in this system only as the payment
  processor, which is an easy mis-attribution."*
- **Confirmed-null claims.** *"`pct-aid`, `aid-awarded`, `avg-award` — permanently null.
  MACS publishes aid figures diocese-wide only, never per school."*

### The 70 blocks, characterised

Produced by `node scripts/i18n_extract_content.mjs --topic financial-aid-tuition --lang <probe>`:
**70 sections, 2,353 words** — 14 `kind: 'heading'`, 56 prose bodies. 65 single-school, 5
shared headings. Longest block is 1,530 chars; median 88.

| School | blocks | | Subtopic (top) | blocks |
|---|---|---|---|---|
| gaston-day | 23 | | Schedule and Aid Programs 2026 | 18 |
| charlotte-catholic | 19 | | Schedule and Aid Programs 2026-2027 | 16 |
| davidson-day | 12 | | Tuition History | 8 |
| charlotte-country-day | 9 | | Tuition by band and school year | 5 |
| covenant-day | 9 | | Year-over-year increases | 5 |
| cannon | 8 | | (9 more, 1–3 each) | |

Note only **6** of the 11 files in `src/content/financial-aid-tuition/` contribute blocks.
The other five (carmel-christian, charlotte-christian, charlotte-latin, hickory-grove-christian,
providence-day) exist but yield none — do not treat their absence as a bug.

### Shapes and traps the implementer will hit

- **This overlay uses `blocks`, an OBJECT keyed by hash → translated string.** Every other
  overlay uses `strings`, an ARRAY of `{of, t, …}`. `shippedHashes()`
  (`check_live_resolution.mjs`) already handles both; reuse it, don't re-derive it.
- **The work file uses `sections`, an ARRAY** of `{of, subtopic, kind?, at[], text, t}`.
  So three shapes are in play. `kind` is **absent** on 56 of 70 — `s['kind']` throws;
  use `s.get('kind')` / `s.kind ?? …`.
- **The extractor CANNOT be imported.** It calls `main()` at module scope, so
  `await import()` exits the *calling* process with code 2. Drive it as a subprocess.
  `freshExtract()` already does.
- **`--lang` must be a throwaway** (`__verify` is used today). The extractor's carry-over
  branch merges into, and rewrites, a real work file otherwise. Delete it in a `finally`.
- **Work files DO exist for all nine locales** at
  `src/data/overlays/work/financial-aid-tuition.content.<lang>.json`, carrying both `text`
  (English) and `t` (translation) per section. **This is the join that makes the new check
  cheap** — it gives English and translation side by side without re-extracting.

### Files as they stand

| File | Lines | Role |
|---|---|---|
| `scripts/check_live_resolution.mjs` | 496 | per-locale; holds `FOREIGN_TOPICS`, `verifyForeignTopic()`, `freshExtract()`, `shippedHashes()` |
| `scripts/check_live_all.mjs` | 56 | fans the above across `PROSE_TRANSLATED` |
| `scripts/check_runtime_resolution.mjs` | 129 | work-file stamp check, walks all 10 overlays |
| `scripts/i18n_extract_content.mjs` | 254 | the foreign extractor; `LIVE` map parsed, never imported |
| `scripts/i18n_topics.mjs` | 106 | single source of truth for `TOPICS`/`ACCESSORS`/… — never re-declare |

## Decisions

- **Extend `check:live` rather than add a `check:content` script** (user-chosen, 2026-08-20).
  One gate, already chained into `build`, already fanned across nine locales by
  `check_live_all.mjs`, and `verifyForeignTopic()` already has the extract in hand.
- **`FOREIGN_TOPICS` keeps its meaning** — "produced by a different extractor" — and keeps
  both existing gates. This plan *adds* a third assertion inside `verifyForeignTopic()`; it
  removes nothing. The two-belts note in the docstring stays.
- **Scope is the content overlay only.** The equivalent "valid hash, wrong text" gap exists
  for the other nine overlays too, and closing it there is a much bigger job (11,341 entries
  vs 70). Out of scope, and named as a follow-up below rather than silently skipped.
- **Correct the record as part of the work.** `CLAUDE.md` and `chromeguard.md` both assert
  the 70 blocks are unchecked by `check:live`. That is now measurably wrong and must not be
  left to mislead a future window.
- **Heuristics must not fail a correct repo.** Several of these blocks legitimately contain
  long verbatim English quotes and bare figure tables. The check is calibrated in step 3 to
  the real data before it is enforced.

## Steps

Single phase.

1. **Reproduce the four experiments in the Context table first, before changing anything.**
   This plan's central claim is a correction to the previous one; if `main` has moved and
   `check:live` no longer exits 1 on a `src/content` English edit, the scope changes and the
   user should be told before proceeding. For each: mutate, run
   `node scripts/check_live_resolution.mjs --lang es >/dev/null; echo $?` **unpiped**, restore,
   confirm `git status --porcelain` is clean.

2. **Add a `blockValues()` helper to `check_live_resolution.mjs`** returning
   `Map<hash, translatedString>` for an overlay, handling both shapes:
   `blocks` object (`Object.entries`) and `strings` array (`{of, t}`). Sibling to the
   existing `shippedHashes()`; do not fold them together — that function is used where only
   keys are wanted.

3. **Add gate 3 to `verifyForeignTopic()` — the translated value must be substantive.**
   Load the locale's work file
   (`src/data/overlays/work/<topic>.<lang>.json`) for the English `text` per hash. For each
   shipped block assert:
   - **not empty / not whitespace-only**;
   - **not byte-identical to the English `text`** — the untranslated-leak case;
   - **length is not wildly off** — flag `< 25%` or `> 400%` of the English character
     length, which catches a truncated or garbage value.

   **Calibrate the ratio bounds against real data before enforcing them.** Print the
   min/median/max ratio across all 9 locales × 70 blocks first and set the bounds outside
   the observed range, then widen if a locale legitimately sits outside. Devanagari, Bangla
   and Telugu run longer than English; `fa`/`ar` shorter. **If a bound cannot be set that
   passes all nine locales cleanly, drop the length rule and keep the first two** — a
   checker parked at a non-zero number stops being read, which is this repo's most-recorded
   checker failure (`check:sepdrift`, `check:live` itself at 4,646).

   Exempt the identical-to-English rule where it would be wrong: a block whose English is a
   bare figure table or a pure proper noun may legitimately be identical. Collect any such
   case from the calibration run into an explicit, commented allowlist keyed by hash — never
   a blanket "skip short strings" rule.

4. **Report on a separate exit path from the existing gates.** A gate-3 finding is "a
   shipped translation is bad", not "the allowlist is dishonest". Give it its own message so
   a maintainer reading a red build knows which of the two problems they have, and does NOT
   reach for the `FOREIGN_TOPICS` edit the existing message suggests. This mirrors the
   two-exit-path split `check_chrome_keys.mjs` uses (PR #170) — that split is the reason an
   English-first phase can ship green without the gate going quiet.

5. **Make the entry count honest.** `check:live` prints
   `11341 shipped entries checked` while `check:runtime` prints `11411` — the 70-block delta
   that made this look like a coverage hole. Once gate 3 checks them, include them in the
   printed total or print them as a named second figure
   (`… plus 70 foreign-topic block(s) verified`). A number that silently excludes what it
   checks is how this confusion started.

6. **Update the docstring in `check_live_resolution.mjs`** above `FOREIGN_TOPICS`. It
   currently carries the "0 strings" correction; add that gate 2 also catches live-English
   drift, and that gate 3 covers translated values. Keep the existing honesty about the
   determined-maintainer bypass — that is still true and still worth saying.

7. **Correct `CLAUDE.md`.** The i18n section says the 70 blocks are "covered by
   `check:runtime` but **not** by `check:live` — the weaker of the two guards… A real gap,
   still open." Replace with what is measured: gate 2 catches live-English drift and fails
   the build; gate 3 now covers the translated values; the residual gap is the same
   wrong-but-well-formed class across the *other* nine overlays. One short paragraph.

8. **Add `## Implementation notes` to `.claude/plans/chromeguard.md`** recording that its
   "not covered by `check:live`" line was wrong, with the experiment that shows it. That
   plan is the historical record; leaving the error in it re-teaches it.

9. **Confirm `check:live` is chained into `build`** — it already is
   (`package.json` `build` ends `… && npm run check:live && npm run check:chrome`). No
   `package.json` change is expected; verify rather than assume, and say so either way.

## Verification

- [ ] `npx tsc -b` — clean (no `src/` change expected, so this should be a no-op)
- [ ] `node scripts/check_live_resolution.mjs --lang es >/dev/null; echo $?` → `0`.
      **Unpiped** — `process.exitCode` makes a piped run print `0` regardless
- [ ] `npm run check:live` → all nine locales pass; the printed entry count reflects step 5
- [ ] `npm run check:runtime` → unchanged, `11411 … 10 overlay file(s)` per locale
- [ ] **Negative test A — garbage translation.** Replace one block's value in
      `financial-aid-tuition.content.es.json` with `'ZZZ'`; `check:live` **exits 1** and
      names the hash. Restore; exits 0. *(This case exits 0 on `main` today — it is the
      whole point of the plan.)*
- [ ] **Negative test B — English left untranslated.** Copy a block's English `text` into
      its `t`; `check:live` exits 1. Restore
- [ ] **Negative test C — existing gate 2 still works.** Edit English in
      `src/content/financial-aid-tuition/gaston-day.json`; `check:live` exits 1 with the
      *gate-2* message, not the gate-3 one. Restore. This guards against the new gate
      masking the old
- [ ] **Negative test D — allowlist still verified.** Misspell the `FOREIGN_TOPICS` entry;
      exits 1. Restore
- [ ] `git status --porcelain` empty after every negative test — the `__verify` work file
      must never survive, and no `src/content` or overlay edit may be left behind
- [ ] `npm run build` — succeeds end to end
- [ ] Calibration output recorded in the PR body: min/median/max translated:English length
      ratio across 9 × 70, and the bounds chosen

**No browser check.** This plan renders nothing — it is a build-time script. (Stated
explicitly because CLAUDE.md's standing rule is that a browser check is required for
anything render-touching, and a fresh window should see that it was considered, not
forgotten.)

## Risks

| Risk | Mitigation |
|---|---|
| A length heuristic that fails a correct repo | Step 3 calibrates against all 9 × 70 real blocks *before* enforcing, and explicitly permits dropping the length rule entirely. A permanently-red checker is worse than no checker — the repo has two recorded cases |
| The identical-to-English rule fires on a legitimately-identical block | Calibration run collects them into a commented, hash-keyed allowlist. No blanket length exemption |
| Gate 3 masks gate 2 | Negative test C exists specifically for this, and step 4 puts them on separate exit paths |
| The work file is stale relative to the overlay, so gate 3 compares against the wrong English | Gate 2 already asserts `shipped ⊆ fresh extract`, so a stale work file surfaces there first. If step 1 shows otherwise, prefer the fresh extract's `text` over the work file's and note the deviation |
| Scope creep into the other nine overlays | Explicitly out of scope and named as a follow-up. 70 blocks vs 11,341 entries is a different plan |

## Out of scope

- **The same wrong-but-well-formed gap on the other nine overlays** (11,341 entries per
  locale). Genuinely open, genuinely bigger, and worth its own plan. `i18n:leaks` partially
  covers the English-left case there via cross-locale consensus.
- Any change to `i18n_extract_content.mjs`, `i18n_topics.mjs`, or the overlay build.
- Translation *quality* — register, naturalness, whether Kreyòl drifts toward French. No
  check in this repo reaches that; it needs a native speaker.

## Implementation notes

Shipped as planned, with one substantive deviation and one method correction.

**Gate 3 found 14 real leaks, which the plan did not anticipate.** The plan framed
gate 3 as closing a *theoretical* hole. On its first run it failed three locales:
`financial-aid-tuition.content` shipped **14 blocks byte-identical to their English**
— `fr` ×5, `hi` ×4, `it` ×5 — resolving perfectly and rendering English while
coverage reported 100%. A build gate that ships red is the failure mode this repo
has recorded twice (`check:sepdrift`, `check:live` at 4,646), so the leaks were
translated in this PR rather than allowlisted. Six distinct hashes were involved:
five Wayback tuition-history blocks plus the heading `Schedule and Aid Programs 2026`.

**The identical-to-English rule is the one that earned its keep**; the length rule
caught only the synthetic negative test. Both were retained — the length rule is what
catches a truncated or garbage value, which the identical rule cannot see.

**Ratio calibration (step 3).** Across all 9 locales × 70 blocks (630 pairs) the
raw ratio spans **0.500–3.750**, which no usable bound fits. Every extreme is a
*short* block where the measure is meaningless (`Fees` → Arabic 3.750×,
`Bus services` → Spanish 2.583×). Restricted to English **≥80 chars** (324 pairs)
the range tightens to **0.758–1.438**. Bounds shipped as **0.4 / 2.5**, ~1.8×
outside the observed range on both sides. This length floor is a deviation from the
plan's flat "<25% or >400%" — that bound would have passed every real block *and*
every short-block garbage value, since a 4-char block cannot fall below 25% of a
30-char English without being nearly empty.

**A char-for-char near-miss worth recording.** The first fix pass substituted
framing words with a bare `\band\b → et/e/और` regex, which rewrote
`"Tuition and Expenses"` to `"Tuition et Expenses"` **inside a quoted Wayback
citation** — 39 corrupted verbatim spans across the three locales. Caught by an
explicit assertion that every double-quoted span, backticked snapshot id and
`$figure` in the English survives in the translation, not by reading the diff. The
rewrite masks every quoted/backticked span before substituting and restores it
after, so the corruption is structurally impossible rather than regex-dependent.
`check:sepdrift` passes on all three touched locales.

**Steps confirmed rather than changed:** step 9 — `check:live` was already chained
into `build` (`… && npm run check:live && npm run check:chrome`); no `package.json`
change was needed, as the plan predicted.

**Step 1's four experiments all reproduced exactly** as the Context table describes,
including gate 2 exiting 1 on a live `src/content` English edit. The plan's central
correction to `chromeguard` holds.
