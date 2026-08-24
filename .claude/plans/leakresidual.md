---
name: leakresidual
title: Clear the residual 106 cross-locale leak-shaped strings, concentrated in ar and te
status: implemented
phases: 2
created: 2026-08-24
branch: i18n/leak-residual
prs: [196]
---

# Clear the residual cross-locale leaks

## Goal

Two triage passes (PRs #190, #193) cut the cross-locale leak queue by a third. **106
leak-shaped strings remain**, and two locales hold 67% of them. This plan triages and
translates that residual, finishing the thread rather than leaving it at "mostly done".

We will know it worked when every one of the 106 is either **translated** or **added to the
KEEPS ledger with a reason**, and a re-run of `npm run i18n:leaks` across all nine locales
surfaces no untriaged leak-shaped item.

## Context

### Where the previous two passes got to

| Measure | 2026-08-23 (before #190) | 2026-08-24 (now) |
|---|---|---|
| Per-locale review items | 2,625 | **1,774** |
| Distinct English strings | 847 | **605** |
| Leak-shaped (≤2 kept, ≥15 chars) | 147 | **106** |

*(The 183 figure in `leaktriage.md`'s goal was arithmetic error; its own implementation
notes corrected it to 147, verified by two independent methods. Use 147 as the real
starting point when reasoning about progress.)*

### The residual is concentrated — that is what makes it a small plan

Measured 2026-08-24 by aggregating all nine work-file sets:

```
held by locale:  ar 38 · te 33 · fa 16 · it 10 · fr 10 · hi 7 · bn 6 · ht 1 · es 1
by topic:        financial-aid-report 36 · college-support 17 · the-arts 14
                 course-offerings 12 · sports 10 · summer-programs 8
                 student-clubs 5 · after-school 3 · metric-values 1
```

`ar` and `te` hold 71 of 106. `financial-aid-report` alone holds 36. So this is not a
long tail — it is two locales and one topic, which can be worked in batches.

Sample of what remains (all real, from the current data):

```
[ar]  "Interdisciplinary Studies"   "Visual and Performing Arts"   "Dual Enrollment"
[te]  "**9** Semifinalists"   "11 National Merit Commended Students (2025)"
[fr]  "The Educational Resource Program"   "SAT Math — 2025"
```

The `ar` examples look like straightforward prose leaks. The `te` National Merit lines are
a known-tricky class — see the risk table.

### Both detectors already exist — do not rebuild either

- `npm run i18n:leaks` (`scripts/find_english_leaks.mjs`) — **cross-locale**: flags a
  string this locale kept in English that ≥2 other locales translated. Accepts `--lang`,
  `--refs`, `--min`.
- `npm run i18n:siblings` (`scripts/find_sibling_leaks.mjs`) — **within-locale**, built in
  #193: flags a value that looks untranslated next to its own siblings.

The second one exists because the first cannot see a string every locale left alone. Run
**both** — they find different things.

### The KEEPS ledger already exists and must be extended, not restarted

`src/data/overlays/NOTES.md` carries the ledger from the previous two passes
(`# The cross-locale leak KEEPS ledger — 2026-08-23`, with `## The KEEPS` and
`## The KEEPS — keyed by (string, locale)` sections). New keeps append there.

### The lesson both prior passes learned — expect reclassification

This is the single most important piece of context, and it has now recurred three times:

- **#190** corrected 74 rows and overturned one of the planning document's own "verified
  leaks": `Director of Counseling Services` is a **KEEP** in `bn`, because `bn` keeps all
  six bare `Director` job titles in Latin. Translating it would have made it the only
  translated Director title in the locale.
- **#193** reclassified **182 rows** LEAK → KEEP after applying each locale's own sibling
  convention.

**The rule those established: per-locale consistency beats the cross-locale majority.** A
string that reads as a leak from outside the locale can be correct convention from inside
it. Both detectors are review queues, not defect lists.

Realistically, then, **the translatable subset of these 106 is likely well under half.**
Plan for that; do not treat a high KEEP ratio as failure.

### Why this must not become a build gate

`check:runtime -- --report-identical` deliberately exits 0 while reporting ~1,900 identical
strings. CLAUDE.md is explicit that enforcing it would park the build at ~2,000 findings and
make it the repo's third permanently-red checker. Neither the ledger nor these detectors
become gates.

## Decisions

- **Scope to the 106 leak-shaped strings only** (≤2 locales kept, ≥15 chars) — same filter
  the previous passes used, so progress is measurable against the same yardstick.
- **Work `ar` and `te` first** — 71 of 106, and batching by locale lets one convention
  decision settle many rows at once, which is exactly how #193's 182 reclassifications
  happened.
- **Run both detectors, not just the cross-locale one** — #193 proved they see different
  defects, and its Italian `in ingresso` class was invisible to both.
- **Extend the existing ledger; never restart it** — the ledger's value is cumulative.
- **Two phases.** This changes user-facing research prose in nine locales.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic.

## Out of scope

- **The 3–6 band and the 7+ consensus band.** Settled by #193 and its follow-ups.
- **Turning any detector into a build gate.**
- **The `it` rising-grade defect class** (`in ingresso`) — fixed in #193.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Two phases — this changes user-facing research prose.** Phase 1 decides *which* strings
are leaks; Phase 2 translates. A mis-triaged string translated is a wrong value shipped, and
triage is the judgment that benefits from review before it multiplies.

### Phase 1 — Triage

1. **Regenerate the working set.** Run `npm run i18n:leaks -- --lang <l>` for all nine
   locales and `npm run i18n:siblings` as well. Aggregate to distinct English strings with
   their kept/translated locale sets and select **kept ≤2 AND length ≥15** — expect ~106.
   Write the worklist to `.claude/plans/leakresidual-data/` (committed, not the scratchpad —
   #190 made that deviation deliberately, because a fresh Phase 2 window cannot read a
   session scratchpad).

2. **Triage `ar` (38) as one batch.** Before deciding individually, check each candidate
   against its own siblings in the `ar` work files: if `ar` consistently keeps a class of
   term in Latin, that is a KEEP class, not 38 separate calls.

3. **Triage `te` (33) as one batch**, same method. Pay specific attention to the National
   Merit tally lines — see the risk table.

4. **Triage the remaining 35** across `fa`/`it`/`fr`/`hi`/`bn`/`ht`/`es`.

5. **Append every KEEP to the ledger** in `src/data/overlays/NOTES.md`, with the locale and
   a one-line reason. Follow the existing section's format exactly.

6. **Record the LEAK worklist** in `.claude/plans/leakresidual-data/` for Phase 2, and
   **report the LEAK:KEEP ratio** in the closing message — it is the honest measure of
   whether this pass was worth running.

7. **Verify Phase 1 is inert for readers.** `npm run build` green; no rendered value changed
   (Phase 1 edits only the ledger and the worklist).

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the triage calls.

### Phase 2 — Translate the confirmed leaks

Scope is the **overlay layer** (`PROSE_TRANSLATED` in `src/lib/i18n.ts`) — research prose,
not the chrome catalogs. Read `.claude/docs/prose-translation-architecture.md` for the
mechanism; do not read a rollout doc for a *register* rule.

1. **Translate each confirmed leak in its target locales** by editing
   `src/data/overlays/work/*.json`, then rebuild with `npm run i18n:build`. Most strings
   need only the 1–2 locales that kept them.

2. **Do NOT use `i18n_extract.mjs --force` to regenerate a work file.** #190 recorded that
   it blanked all 933 translations in a file rather than carrying them over — the extractor
   is a spec, not a writer. Patch entries surgically.

3. **Honour the standing figure traps.** Figures copied char-for-char, never re-typed;
   `hi`/`te` store the English 3-3-3 grouping because the render layer regroups; `fa`/`ar`
   need LRI…PDI isolates around bidi-neutral figures.

4. **Re-run both detectors for all nine** and confirm every triaged leak is gone with no new
   item introduced.

5. **Update the ledger** with anything Phase 2 reclassified — expect some, per the pattern.

## Files touched

| File | Change |
|---|---|
| `src/data/overlays/work/*.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — translate confirmed leaks (Phase 2) |
| `src/data/overlays/*.json` | regenerated by `npm run i18n:build` (Phase 2) |
| `src/data/overlays/NOTES.md` | append to the existing KEEPS ledger |
| `.claude/plans/leakresidual-data/` | **new** — the worklist, committed for the Phase 2 window |

## Verification

### Phase 1 — Triage

- [ ] All ~106 classified LEAK or KEEP, none undecided
- [ ] Every KEEP appended to the ledger with a locale and a reason
- [ ] LEAK:KEEP ratio reported
- [ ] `npm run build` — succeeds
- [ ] No rendered value changed

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every stamp resolves, value gates pass
- [ ] `npm run check:live` — live English matches every shipped stamp
- [ ] `npm run check:sepdrift -- --lang <l>` for all nine — no separator re-typing
- [ ] `npm run check:script` — every overlay still in its own script
- [ ] `npm run check:sources -- --lang <l>` for all nine — no English original altered
- [ ] `npm run check:bidi` — `fa`/`ar` isolates intact
- [ ] `npm run i18n:leaks` and `npm run i18n:siblings` for all nine — triaged leaks gone
- [ ] **Browser check** on two schools in `ar` and `te` (the two locales holding most of
      this). Grep the rendered page for English sentences in **table cells, chips and
      source lines** — CLAUDE.md records that as where every leak of this class has lived.

## Risks

| Risk | Mitigation |
|---|---|
| **A KEEP is mis-triaged as a LEAK.** Three passes have now hit this (74, then 182 rows, plus one in the planning doc itself). | Step 2/3 batch by locale and check siblings *before* deciding. Per-locale consistency beats cross-locale majority — the rule the ledger already records. |
| **The `te` National Merit lines are a trap.** `"**9** Semifinalists"` is mostly a figure plus one noun, and #193's Phase 1 already had to correct a `te` National Merit claim once. | Treat the whole cluster as one convention decision, not ~10 independent ones, and check what `te` does with sibling award tallies before translating any. |
| **Editing English orphans overlay stamps in all nine locales** — recorded failure mode. | Phase 1 edits no English. If step 4 exposes an English-side defect, fix it in Phase 1 and let `check:live` verify (`check:runtime` cannot see it — documented blind spot). |
| **High KEEP ratio makes the pass look wasteful.** | Say so plainly. A confirmed KEEP recorded in the ledger is a permanent result: it stops the next pass re-triaging the same string. |

## Open questions

- **Is `ar`'s Latin-term retention a deliberate convention or an oversight?**
  (`Interdisciplinary Studies`, `Visual and Performing Arts`, `Dual Enrollment` all kept.)
  — **default:** treat it as a convention question to settle once for the whole `ar` batch
  in step 2, not as 38 separate judgments.
- **Should the leak-shaped filter's ≥15-char floor be lowered now the queue is small?**
  — **default:** no. Keep the same filter so progress stays comparable across the three
  passes; revisit only after this one closes.

## Implementation notes

### Phase 1 (2026-08-24) — the Context section did not reproduce

The plan's headline figures were **106 leak-shaped strings, `ar 38`, `financial-aid-report
36`**. Re-measuring the same filter (kept ≤2, translated ≥2, ≥15 chars) across all nine work
files gives **70**, with **`ar 3`** and **`financial-aid-report 1`**.

Every other locale matched almost exactly — `te` 32 (plan: 33), `fa` 16, `it` 10, `fr` 10,
`hi` 7, `bn` 6, `ht` 1 — so the discrepancy is confined to those two claims.

This is **not** stale data. `financial-aid-report.ar.json` has not been touched since PR
#150, well before #190/#193, so nothing translated those 36 away; and the raw unfiltered
detector output for `ar` contains exactly one `financial-aid-report` row. The two figures
appear to be a measurement error in the planning document. The rest of the plan — its
method, decisions and risk table — held up well and was followed as written.

Consequence for the plan's shape: "two locales and one topic, workable in batches" was
right about `te` but not about `ar` or `financial-aid-report`. The real concentration is
**`te` and `fa`**.

### One detector caveat worth carrying forward

`find_english_leaks.mjs` defaults to `--refs es,fr,it,te,bn,fa,ht` — it **omits `hi` and
`ar`**. Run it with all eight other locales passed explicitly, or those two never serve as
reference locales and their agreement is invisible.

### Result

**9 LEAK / 50 KEEP** over the 59 genuinely-untriaged `(string, locale)` pairs; the other 24
of the 70 rows were already settled by #190/#193. Ratio **1 : 5.56**, the highest keep ratio
of the three passes — the expected shape for the tail of the queue, and predicted by the
plan.

Five provisional LEAK calls were overturned by measurement before being recorded, including
four `es` `sq ft` strings that PR #194 (`unitrevert`) had deliberately restored to English
the previous day. Details and the per-locale evidence are in the ledger section of
`src/data/overlays/NOTES.md` and in `.claude/plans/leakresidual-data/`.

One correction to a prior ledger claim: #193's row asserting `fa` "keeps `visual.media[]`
technique lists verbatim" does not hold — `fa` translates **48 of 54** of them, so the three
Cannon entries are genuine leaks and are on the Phase 2 worklist.

### Phase 2 (2026-08-24) — eight translated, one more reclassified

The nine-row worklist produced **8 translations and 1 further KEEP**, so the pass's final
tally is **8 LEAK / 51 KEEP** over the 59 untriaged pairs — ratio **1 : 6.4**.

`te` `Football QBs · Game Day Coordinator` was reclassified KEEP at translation time. Both
halves are independently `te` keep classes: every bare job title in `sports.te.json` stays
Latin, and `Football` is kept in 20 of 25 entries containing it. What made the call
decidable was **measuring the middot class rather than eyeballing it** — `sport · JobTitle`
roles split 6 kept / 6 translated, and the six translated ones agree that the *sport* is
translated while the *job title* stays Latin. Applying that rule returns this string
unchanged. A 6/6 split is not an absence of convention; it is a convention operating on
part of the string.

That makes four consecutive passes in which a LEAK verdict did not survive contact with the
locale's own siblings — the pattern the plan's risk table predicted, holding once more.

**No rendering was invented.** Each of the eight copies a form the same locale had already
settled in the same work file; the derivations are tabulated in `src/data/overlays/NOTES.md`.
The `fa` `CAD, woodworking, …` entry had a near-identical translated sibling
(`CDE runs CAD, woodworking, metalworking…`) giving every term's established rendering.

### One pre-existing finding, deliberately not fixed here

The browser check passed on **7 of 8** strings. The eighth, `te` `current listing`
(`charlotte-latin:guideYear`), rendered as **neither** English nor Telugu — because
**`guideYear` has no consumer anywhere in `src/**/*.tsx`**. It is declared in
`courseOfferings.ts` and populated for all 12 schools, but no component reads it, on this
branch or on `main`. The translation is correctly shipped and will render if the field is
ever surfaced. Wiring up an unrendered field is outside this plan's scope; recorded here so
it is not rediscovered as a translation defect.

### Verification

All green: `npm run build` (exit 0, including `check:live`, `check:runtime`, `check:schema`,
`check:chrome`, `check:spans`), `npx tsc --noEmit`, `check:sepdrift` / `check:sources` across
all nine locales (0 drifted, 0 altered), `check:script`, `check:bidi`, and both detectors.
The overlay rebuild was diffed **keyed on content hash** rather than array index: exactly 8
deltas, 0 entries added or removed.
