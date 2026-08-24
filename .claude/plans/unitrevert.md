---
name: unitrevert
title: Stop converting units in es — restore sq ft and feet, and delete the CONVERSIONS allowlist
status: in-progress
phases: 2
created: 2026-08-24
branch: i18n/unit-revert
prs: []
---

# Stop converting units in Spanish

## Goal

Spanish is the only locale that converts imperial units — `53,000 sq ft` renders
`4.924 m²`, `6-foot-10` renders `2,08 m`. The other eight locales keep the English figure
verbatim. CLAUDE.md records this one-locale state as the only option that is **not**
defensible.

**Settled by the user on 2026-08-24: convert nowhere.** This plan restores the English
figures in `es` and deletes the `CONVERSIONS` allowlist that existed to stop
`check:sepdrift` flagging them.

We will know it worked when no `es` translation contains a converted unit, `CONVERSIONS` is
gone from `scripts/check_sep_drift.mjs`, and `npm run check:sepdrift -- --lang es` reports
**0 drifted with 0 allowed conversions**.

## Context

### The measurement, taken 2026-08-24

**17 `es` entries** carry a converted unit:

```
sports.es.json    14
the-arts.es.json   3
```

Every other locale converts **zero**:

```
locale   m² occurrences
es       16
fr it bn te fa hi ar ht    0
```

`es` is internally consistent — no `es` translation keeps `sq ft` alongside the metric
values, so this was a deliberate choice made once and never propagated, not sloppiness.

Examples of what changes:

```
EN  53,000 sq ft, 2001                       ES  4.924 m², 2001
EN  5,400 sq ft                              ES  502 m²
EN  ~30,000 sq ft, 2022                      ES  ~2.787 m², 2022
EN  … (’28, 6'3" center) …                   ES  … (’28, pívot de 1,90 m) …
```

### Why revert rather than propagate — the reasoning behind the decision

**It breaks the rule the rest of the project is built on.** CLAUDE.md's standing discipline
is that a figure is copied **char-for-char**, because *a parent matches it against the
school's own page*. Charlotte Latin publishes "53,000 sq ft"; a Spanish-reading parent
seeing `4.924 m²` cannot match that against anything the school published. Every other
figure rule here — tuition never re-typed, `hi`/`te` storing English 3-3-3 grouping,
`check:sepdrift` itself — exists to protect that property. Unit conversion is the one place
the project quietly breaks its own rule.

**Propagating multiplies maintenance for no payoff.** `CONVERSIONS` pins 13
arithmetic-verified pairs today. Converting in eight more locales means ~117 pinned pairs,
each needing a `requires` anchor and verification — and every new school with a
square-footage figure adds nine more. Reverting deletes the block entirely.

**The audience argument is weaker than it looks.** These are Charlotte-area families
reading about Charlotte schools in their home language. The building is 53,000 sq ft in
every local conversation they will have about it.

### The cost, stated plainly

A Spanish-reading parent loses a genuinely useful conversion, and 17 currently-correct
translations become less informative. That is a real loss, accepted deliberately.

### What `CONVERSIONS` is and why it goes

`scripts/check_sep_drift.mjs` normalises 3-3-3 separators before comparing, so it cannot
distinguish a converted value from a re-typed one: `4.924` is indistinguishable from a
Spanish-separated `4,924`. `CONVERSIONS` therefore pins each accepted pair as **token + a
source figure that must appear in the same entry's English** — so `4.924` is forgiven only
where the English actually says `53,000 sq ft`.

Its own docstring anticipates this plan:

> Whether converted units belong in the data at all is a separate content question — and
> today only `es` converts… **If that is settled either way, this list moves with it.**

With no conversions in the data, the allowlist has nothing to forgive and its removal
**tightens** the checker: any future `4.924` becomes a finding again.

Note the block also carries a **guard that `exit 2`s if an entry lacks a `why`**. That guard
goes with the block; nothing else depends on it.

### One measurement subtlety

Only **13 of the 17** entries are covered by `CONVERSIONS`, because the checker inspects
**separator-bearing tokens only**. Values like `502 m²`, `725 m²` and `381 m²` have no
separator, so they never flagged and were never allowlisted. **Do not use the allowlist as
the worklist** — it is a subset. Work from a scan of the data.

## Decisions

- **Revert `es` to the English figures** rather than propagating conversions — settled by
  the user 2026-08-24, reasoning above.
- **Delete `CONVERSIONS` entirely, not just its `es` entries** — it is the only locale in
  the object, and an empty allowlist plus its validation guard is dead weight that invites
  a future re-add.
- **Two phases.** This changes user-facing research prose. The English is unchanged, so
  Phase 1 is small — but the values a Spanish reader sees do change, and that is exactly
  what the review gate is for.
- **Restore the English figure verbatim**, including its separators — that is the whole
  point. `53,000 sq ft`, not `53.000 sq ft`.

## Approvals needed

**None** — the direction was settled by the user on 2026-08-24. No new card, section, stat
tile, Compare row, metric key or topic.

## Out of scope

- **Converting in other locales.** The decision is convert-nowhere.
- **Currency localisation.** Unrelated and correct — `localizeMoneyText()` localises
  presentation while the amount and USD never change. Do not touch it.
- **`hi`/`te` lakh-crore regrouping.** A render-layer concern, not a data conversion.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Two phases.** Phase 1 removes the checker's allowlist and confirms the exact worklist;
Phase 2 edits the Spanish values. They are ordered this way deliberately: with
`CONVERSIONS` gone, `check:sepdrift` **fails loudly on every remaining conversion**, which
turns the checker into the worklist and proves when the job is done.

### Phase 1 — Find the full set and arm the checker

1. **Scan for every converted value in `es`.** Do not use `CONVERSIONS` as the worklist —
   it covers only the 13 separator-bearing tokens. Scan
   `src/data/overlays/work/*.es.json` for `m²` and for metre heights (`1,90 m`, `2,08 m`).
   Expect **17 entries** across `sports.es.json` (14) and `the-arts.es.json` (3); confirm
   the real count rather than trusting this number.

2. **Record each entry's English source figure**, so Phase 2 restores the exact published
   string. Write the worklist to `.claude/plans/unitrevert-data/` (committed — a fresh
   Phase 2 window cannot read this session's scratchpad).

3. **Delete the `CONVERSIONS` object and its validation guard** from
   `scripts/check_sep_drift.mjs`, along with the docstring paragraph describing it. Update
   the surrounding comment to state the settled rule: **units are never converted; a figure
   is copied char-for-char.**

4. **Confirm the checker now fails.** `npm run check:sepdrift -- --lang es` should report
   the separator-bearing conversions as drift. That failure is the point — it proves the
   allowlist was load-bearing and gives Phase 2 its finish line.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** The tree is
deliberately left with `check:sepdrift -- --lang es` red; note that plainly in the handoff
so it is not mistaken for a regression.

### Phase 2 — Restore the English figures

1. **Edit each of the 17 `es` entries** in `src/data/overlays/work/`, replacing the
   converted value with the English figure **copied char-for-char** from the entry's own
   `text` — `53,000 sq ft`, `5,400 sq ft`, `6'3"`. Keep the surrounding Spanish prose
   intact: `Un centro deportivo de 4.924 m² inició…` becomes
   `Un centro deportivo de 53,000 sq ft inició…`, not a re-translated sentence.

2. **Rebuild the overlays** with `npm run i18n:build`.

3. **Do NOT use `i18n_extract.mjs --force`** — PR #190 recorded that it blanks every
   translation in a file rather than carrying them over. Patch entries surgically.

4. **Confirm the checker is green**: `npm run check:sepdrift -- --lang es` reports
   **0 drifted** and **no allowed conversions**, since the allowlist no longer exists.

## Files touched

| File | Change |
|---|---|
| `scripts/check_sep_drift.mjs` | edit — delete `CONVERSIONS`, its guard, and its docstring paragraph |
| `src/data/overlays/work/sports.es.json`, `the-arts.es.json` | edit — restore English figures (Phase 2) |
| `src/data/overlays/sports.es.json`, `the-arts.es.json` | regenerated by `npm run i18n:build` |
| `CLAUDE.md` | edit — replace the open question with the settled rule |
| `.claude/plans/unitrevert-data/` | **new** — the worklist, committed for the Phase 2 window |

## Verification

### Phase 1

- [ ] Full worklist recorded, count stated (expect ~17, not 13)
- [ ] `CONVERSIONS` and its guard removed from `scripts/check_sep_drift.mjs`
- [ ] `npm run check:sepdrift -- --lang es` **fails**, listing the conversions
- [ ] All eight other locales still pass `check:sepdrift`
- [ ] `npm run build` — note whether the red checker blocks it (`check:sepdrift` is **not**
      in the build chain, so it should not)

### Phase 2

- [ ] `npm run check:sepdrift -- --lang es` — **0 drifted, 0 allowed conversions**
- [ ] `npm run check:sepdrift -- --lang <l>` for the other eight — still 0
- [ ] `npm run check:runtime` and `npm run check:live` — stamps still resolve (only `t`
      changed, so English hashes are untouched; this confirms it)
- [ ] `npm run check:script` — `es` overlay still Latin script
- [ ] `npm run check:sources -- --lang es` — no English original altered
- [ ] `npm run build` — succeeds
- [ ] **Browser**: a school page in `?lang=es` with a facilities figure (Charlotte Latin or
      Cannon — both have square-footage prose). Confirm the Spanish sentence reads naturally
      around the English figure and no digit was re-typed.
- [ ] `CLAUDE.md` updated — the open question replaced by the settled rule

## Risks

| Risk | Mitigation |
|---|---|
| **A restored figure is re-typed with Spanish separators** (`53.000 sq ft`) — the exact defect `check:sepdrift` exists to catch, now with no allowlist to hide it. | Copy char-for-char from the entry's own English `text`. Phase 2's first verification line is this check. |
| **The Spanish sentence reads awkwardly** around an imperial figure. | Phase 2 step 1 keeps the surrounding prose and swaps only the figure; the browser check reads the result. If a sentence genuinely needs rewording, that is a translation edit, not a figure edit — do it deliberately and note it. |
| **Working from `CONVERSIONS` instead of the data** misses the 4 separator-less values (`502 m²`, `725 m²`, `381 m²`, and one more). | Step 1 says explicitly not to; the count is 17, not 13. |
| **Phase 1 leaves the tree with a red checker**, which a later session could misread as a regression. | Called out in the Phase 1 stop note and in this table. `check:sepdrift` is not in the build chain, so nothing else breaks. |

## Open questions

None — the direction was settled by the user on 2026-08-24. If the browser check in Phase 2
shows a sentence that genuinely cannot carry an imperial figure naturally, report it rather
than silently re-introducing a conversion.
