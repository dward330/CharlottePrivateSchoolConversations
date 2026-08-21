---
name: valuegates
title: Extend translated-value checking to all ten overlays, fix the carmel-christian span, and make the vitals numbers reproducible
status: implemented
phases: 2
created: 2026-08-21
branch: fix/value-gates
prs: [172]
---

# Three open items: overlay value gates, the Carmel span, and a vitals harness

## Goal

Three independent defects, shipping in **one PR** (user-chosen, 2026-08-21):

- **A** — `check:live`'s gate 3 covers 70 content blocks. The same *valid-hash-wrong-text*
  failure is unguarded across **11,341 entries per locale** in the other nine overlays.
  Extend the two cheap rules there.
- **B** — `summer-care-span` for `carmel-christian` is `'12–1 PM'`, which the span parser
  rejects, so it **drops out of the leader ranking silently** and `npm run check:spans`
  exits 1.
- **C** — the `vitals` plan's desktop CLS / mobile LCP numbers are **unreproducible**: the
  harness that produced them was deliberately discarded, and `scripts/check_vitals.mjs` —
  referenced from a *shipped source comment* — has never existed.

Done when `check:runtime` enforces empty+ratio value rules over all ten overlays in the
build, `check:spans` exits 0, and `npm run check:vitals` reproduces a CLS/LCP measurement
on demand.

**Two phases.** Workstream B removes a translated string from 18 overlay files, which is
locale work. A and C add no user-facing text. See the phase split in Steps.

## Context

### Workstream A — what is actually true, measured 2026-08-21

Every number below was measured on `main` at `320bf1e`. **Re-measure rather than trust
this table** — step A1 is exactly that.

The nine overlays hold **11,341 shipped entries each, identical in all nine locales**
(102,069 total). Shape is `{t, of, at}` — `at` is an array of `<slug>:<dotted.path>` live
field paths. **There is no English `text` in the shipped overlay**; it is stripped by
`scripts/i18n_build_overlay.mjs:47-49` so the English corpus is not shipped twice.

Three candidate rules, and they behave very differently at this scale:

| Rule | Findings today, all 9 locales | Verdict |
|---|---|---|
| **empty / whitespace-only** | **0** | ships green immediately |
| **length ratio** (English ≥80 chars, 0.4–2.5×) | **0** | ships green immediately |
| **byte-identical to English** | **~2,200 per locale / 19,754 total** | CANNOT be enforced as-is |

**This is the load-bearing finding of workstream A.** The identical rule that worked for
70 blocks does not survive contact with 11,341. Enforcing it would park a build gate at
~2,200 findings — and this repo has **two recorded cases** of a checker sitting at a
non-zero number and ceasing to be read (`check:sepdrift`; `check:live` itself at 4,646).
Making it a third is the single worst outcome available here.

Most of those 19,754 are legitimate. Collapsed by identity there are only **2,756 distinct
`(topic, hash)` pairs**, distributed by how many locales left them English:

| identical in | count | reading |
|---|---|---|
| **9 of 9** | **1,499** | consensus keep — course codes, figure labels, grade bands |
| 8 of 9 | 405 | near-consensus |
| 4–7 of 9 | 430 | needs judgement |
| **1–2 of 9** | **344** | leak-shaped |

Sampling ~40 confirms the split: the 9/9 set is ~95% legitimate (`"AP African American
Studies"`, `"1344 SAT · 27 ACT"`, `"8×"`, `"TK · 1:00–3:00"`), while the ≤2-locale set is
~50–60% genuine or partial leaks.

**The length-ratio calibration generalises cleanly**, which is the happy surprise. Across
~38,600 pairs with English ≥80 chars the observed range is **0.554–1.753**, versus the
content overlay's 0.758–1.438. The shipped constants `RATIO_MIN_LEN = 80`, `RATIO_LO = 0.4`,
`RATIO_HI = 2.5` (`scripts/check_live_resolution.mjs:223-225`) hold with room to spare and
need no re-derivation.

**One genuine empty exists and is correct.** `financial-aid-report` hash `811c9dc5` has
`text: ""` and `t: ""` in all nine locales (`providence-day:sections[0].boxes[0].body` and
two siblings). The empty rule must exempt *English-is-also-empty*, or it fails a correct
repo on its first run. The work files carry **886** entries here but ship **885** — that
one entry is dropped at build.

#### Where the English comes from — two sources, and the better one is not obvious

`scripts/check_live_resolution.mjs` already walks live `src/data` modules and its `walk()`
(`:521-533`) **collects `{path, text}` pairs** — but the English is then discarded at
`:550` and `:555` (`set.add(stamp(f.text))`). Converting `liveStamps` from a `Set` to a
`Map<stamp, englishText>` is about four lines, and all three downstream consumers
(`source.size === 0` at `:636`, `liveStamps.has()` at `:650`, `liveStamps.size` at `:664`)
work unchanged on a Map.

**Prefer that Map over the work file for the nine.** It reads *live* English, so it cannot
go stale relative to `src/data`; the work file can. The work file only wins for the content
overlay, whose English lives in `src/content` and is never walked here.

**A one-token bug blocks the work-file path anyway.** `workEnglish()`
(`scripts/check_live_resolution.mjs:178-183`) reads **only `w.sections`**. The nine work
files use **`strings`** (top keys `["topic","lang","generated","note","strings"]`), so it
returns an empty Map for all nine and would silently verify **zero pairs** — a check that
passes by doing nothing. `scripts/find_english_leaks.mjs:47` already uses the correct
fallback (`raw.strings ?? raw.sections ?? []`). Fix it regardless of which source is used,
because a silently-empty check is worse than an absent one.

#### `check:runtime` is the better host than `check:live`

`scripts/check_runtime_resolution.mjs` already iterates **all ten** overlay files
(`:41`), loads both shipped and work files, and builds a `byStamp` map with English in hand
(`:53-60`). Adding value rules there is a small natural extension. `check:live` would need
the gate hoisted out of `verifyForeignTopic()`, which exists to verify the *foreign-topic
allowlist* — a different job.

**Trade-off, stated so it is not re-litigated:** `check:runtime` is **not** in the build
chain today (`package.json:8` runs `check:schema check:ranks check:ncsuper check:live
check:chrome`). Adding it is part of this workstream.

#### `i18n:leaks` is the triage tool, not the gate — and it has real blind spots

`scripts/find_english_leaks.mjs` reads **work files only**, never the shipped overlay, and
**always exits 0** — a report by design (`:91-95`). Its findings are a strict subset of the
identical rule: 209–520 per locale versus ~2,200.

Two structural blind spots matter here:

- **`if (!/[a-z]/.test(en)) continue` (`:78`)** discards every all-caps string. That
  correctly keeps `STATE` / `RUNNER-UP`, but also hides genuine leaks —
  `"WHY THE AVERAGE AWARD IS NOT SHOWN AS A SHARE OF TUITION"` (translated by 8 of 9
  locales) and `"JUN–AUG"` are both invisible to it.
- **`if (by.length >= MIN)` (`:87`)** means a string *all nine* locales leaked is invisible
  by construction.

Its default `--refs` is `es,fr,it,te,bn,fa,ht` — **7 refs, omitting `ar` and `hi`**.

**Path suffixes are strongly diagnostic**, and this is the biggest lever on maintenance
cost. `.figure`, `.gradeLabel`, `.gradeFilters[].label`, `.values.<slug>`, `.since`,
`.courses[].title` cluster almost entirely in legitimate keeps; `.description`, `.detail`,
`.note`, `.text`, `.tag` carry most leaks. **A path-suffix exemption survives re-extraction;
a hash allowlist does not** — every allowlisted hash silently stops matching when its
English is edited, re-firing the finding. That argues against a 1,499-entry hash allowlist.

### Workstream B — the Carmel span

`src/data/metricValues.ts:1527-1595`. `summer-care-span` is the **only** `compareAs: 'span'`
row of the eleven `compareAs` rows in the file; no other row has a non-parsing value.

Eleven values: 8 non-null, 3 null. `providence-day` wins at 660 min, matching the checker's
hand-confirmed `EXPECTED` table (`scripts/check_span_metrics.mjs:32-44`).

`'12–1 PM'` fails because `minutesOf`'s regex
`/^\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*$/i` (`:47-57`) makes the meridiem **required**,
and the left operand `"12"` has none.

**Confirmed: the cell still renders, and is silently unranked.** `Compare.tsx:310-314`
computes `best` from `present` (nulls filtered), and `nums[i] === best` is `null === 660`
→ false. The cell takes the `cell val` branch at `:326` and prints `12–1 PM` with its
tooltip. A reader sees eight populated cells, one tinted, with no way to know one was never
eligible.

**The parsers are deliberate copies**, documented at `check_span_metrics.mjs:45-47`:
importing the app's parser "would make a broken parser agree with itself." App copies live
at `Compare.tsx:61-73` and `:79-88`. They are logic-identical today. **Any parser change
must land in both**, which is an argument for not changing the parser.

**There is no "displays but does not rank" convention.** `noLead` (`metricValues.ts:57`) is
**row-level** — setting it would kill the tint for all eight schools, losing Providence
Day's legitimate win. `noRank` does not exist anywhere in the repo. `quals` carries caveat
prose with zero ranking effect. The two states are **ranked** or **null**.

The closest precedent is `charlotte-catholic` on `aftercare-cost` (`:1287`), commented
"**no referent** — this row measures the highest-priced grade band of a lower-school
programme": when a value is not commensurable, this codebase spells it `null` and explains
why in the comment.

**The information is not lost by nulling.** The `carmel-christian` qual at `:1590-1593`
already says: *"Wrap-around care is limited to the 12–1 PM After Camp Lunch Hour add-on; no
before-camp or full-day care is published."* That qual **is translated in all nine locales**.

**i18n consequence, and it is the reason this plan is two-phase.** The value is addressed as
`providence-day:[27].values.carmel-christian`, hash `f9a26929`, in **18 files** — nine
shipped `src/data/overlays/metric-values.<lang>.json` and nine `work/` counterparts. Eight
locales left it identical to English; **`bn` genuinely translated it** to
`"দুপুর 12–1 টা"`. Nulling the English orphans that entry in all 18.

Note the overlay addressing is **positional** (`[27]` = the row's index in `VALUE_METRICS`),
so reordering the array is a separate hazard — do not reorder.

### Workstream C — the vitals numbers are unreproducible

`.claude/plans/vitals.md` is `status: in-progress`, `prs: []` — never updated with PR #110
even though `INDEX.md:17` links it.

**What shipped in PR #110** (`b080d91`): a CSS reserve —
`.topic-section .loading { min-height: 220px }` with `400px` under `max-width: 720px`
(`src/index.css:558-566`), plus a `GROUPS_CACHE` in `src/lib/content.ts` kept only for
re-visits. Mobile CLS 0.32 → **0.003 GOOD**; desktop stayed **0.32 POOR**; `/compare/`
**regressed** 0.06 → 0.16.

**Why desktop is hard, already proven — do not re-derive.** The two-pass mount is real: at
the shift the DOM goes 35 `<details>` → **0** with seven `p.loading` placeholders, height
4986 → 3310 → 4966px, caused by `ready` in `SchoolDetail` flipping only after eight overlay
promises resolve. But **the diagnosis explained the height change, not the score.** After
reserving space the residual shift is only 20–40px per element, yet CLS stays 0.3175,
because **CLS weights the fraction of viewport affected, not the distance moved**. Raising
the floor makes it *worse* (220px → 0.3184; 300px+ → 0.3365). Settled sections span
271–684px, so no single floor fits.

Three hypotheses were **refuted** and must not be re-tested: pre-rendering/PR #105, web-font
reflow, undimensioned images.

**The blocking problem: nothing can be measured.** Verified 2026-08-21:

- `scripts/check_vitals.mjs` **does not exist** — yet it is referenced from
  **`src/index.css:557`, a shipped source comment**: *"Re-measure with
  `scripts/check_vitals.mjs` if the card layouts change."* Anyone following it hits a dead
  end. It is also referenced at `vitals.md:133` and `:143`.
- No `check:vitals` script; no Lighthouse anywhere; no saved report; **no `.github/`**, so
  no CI of any kind.
- The harness that produced every number was **deliberately discarded** — `vitals.md:167`'s
  own checklist ends "`git status` clean of probe scripts."

`playwright ^1.62.1` **is** in devDependencies and there is an established
`scripts/*.mjs` + Playwright pattern, so the dependency exists.

**Two latent items found while researching, not part of C's fix:** the crest
`img.dossier-crest` (`SchoolDetail.tsx:484-490`) has **no `width`/`height` and no
aspect-ratio reserve**, and carries `loading="lazy"` on an above-the-fold element (a mild
LCP anti-pattern). The plan measured `document.images` as having zero incomplete entries at
the shift, so it is not the 0.32 cause.

## Decisions

- **One PR for all three** — user-chosen, 2026-08-21. Ordering below puts B's locale work
  last so Phase 1 is reviewable in English.
- **Carmel becomes `null`** — user-chosen, 2026-08-21. It is a lunch-hour add-on, not
  wrap-around care; ranking a 60-minute bridge against 660-minute windows compares different
  things. Matches `charlotte-catholic` and `hickory-grove-christian`, already null for the
  same reason. **Do not fix the parser** — that would rank it as "narrowest wrap-around
  care", which is a worse claim than absence, and would require editing two deliberate
  parser copies.
- **Enforce only the empty and ratio rules for the nine overlays.** Both are 0-finding
  today. The identical rule is explicitly NOT enforced — see the next decision.
- **The identical rule ships as a REPORT, not a gate** — `--report-identical`, exit 0. At
  ~2,200 findings per locale a gate would be the repo's third permanently-red checker. The
  report exists so the 344 leak-shaped entries are discoverable without blocking anyone.
- **Host the value rules in `check_runtime_resolution.mjs`**, not `check:live` — it already
  walks all ten overlays with English in hand; `check:live`'s gate 3 lives inside
  `verifyForeignTopic()`, which is about allowlist honesty.
- **Use the live-English source where available**, not the work file — it cannot go stale
  against `src/data`. Fix `workEnglish()`'s `sections`-only bug regardless.
- **No hash allowlist.** Prefer path-suffix exemptions: a hash allowlist silently breaks
  whenever its English is edited.
- **Workstream C measures only; it does not attempt the desktop CLS fix.** The remaining
  fix needs reworking the `ready` gate — `vitals.md:255-259` says "re-plan rather than
  improvise", and with no harness there is no way to know whether a change helped.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic. Workstream B
changes an existing cell's value from a string to `null` — a data correction within an
existing row, not a UX change. Workstream C adds a script, not UI.

## Out of scope

- **The desktop CLS fix and the mobile LCP fix.** C delivers the harness that makes them
  measurable; the fix itself needs its own plan once there are reproducible numbers.
- **`/compare/`'s CLS regression (0.06 → 0.16) and home's mobile 0.165.** Recorded in
  `vitals.md` as outside its scope; still outside this one. The harness will measure them.
- **Enforcing the identical rule**, and translating the 344 leak-shaped entries. The report
  makes them visible; acting on them is a separate triage pass.
- **Changing the span parsers** in either copy.
- **The crest's missing dimensions / `loading="lazy"`.** Noted in Context; not the CLS
  cause; belongs with the LCP plan.
- Route-level code splitting, and deploying.

## Steps

### Phase 1 — English (workstreams A, C, and B's English half)

**A — overlay value gates**

1. **Reproduce the three numbers before changing anything** — empty, ratio and identical
   counts across the nine overlays × nine locales. Write a throwaway script to the
   scratchpad (not the repo). Expect **0 / 0 / ~2,200-per-locale**. If the identical count
   has moved materially, or empty/ratio are no longer 0, **stop and tell the user** — the
   enforce-vs-report split below depends on those being 0.

2. **Fix `workEnglish()`** in `scripts/check_live_resolution.mjs:178-183` — change
   `(w.sections ?? [])` to `(w.strings ?? w.sections ?? [])`, matching
   `find_english_leaks.mjs:47`. Correct the docstring at `:170-172`, which asserts
   `sections` "exists in the WORK files only" — true of the content work file, misleading
   about the other nine. Note in the comment that this returned an **empty Map** for all
   nine topics, so a check built on it would have passed by verifying nothing.

3. **Add the value rules to `scripts/check_runtime_resolution.mjs`.** It already loads both
   files per overlay (`:41-60`). Per entry assert:
   - **non-empty** — skip when the English is *also* empty (hash `811c9dc5` is the real
     case; do not hardcode the hash, test the English).
   - **length ratio** — English ≥80 chars only, outside 0.4–2.5× fails. Reuse the constant
     names and values from `check_live_resolution.mjs:223-225`; do not re-derive them.

   Report on a **separate exit path** from the existing stamp-mismatch findings, per the
   two-exit-path convention (`check_chrome_keys.mjs`, PR #170): a bad value is not a stale
   stamp and the remedies differ.

4. **Add the identical rule as a REPORT behind `--report-identical`, exit 0.** Group output
   by how many locales left the string English (9/9, 8/9, 4–7, ≤2), because that ordering
   is what separates keeps from leaks. Print counts, and cap displayed examples — but
   **apply the cap to display only, never to collection**: a check whose sample size doubles
   as its coverage is a recorded failure in this repo (the `ensembles` 9th-of-55 miss).

5. **Chain `check:runtime` into `build`** in `package.json:8`, after `check:live`. Verify
   the whole build still passes.

**C — vitals harness**

6. **Write `scripts/check_vitals.mjs`** — the file `src/index.css:557` already tells
   readers to use. Playwright (`^1.62.1`, already a devDependency) against a real
   `vite preview` of the production build, per `vitals.md:34-38`: `PerformanceObserver` for
   `largest-contentful-paint` and `layout-shift`; a `--mobile` mode with 4× CPU throttle and
   Fast-3G emulation. Take routes from `scripts/seo_routes.mjs` rather than hardcoding a
   school list. Print a table of route × CLS × LCP with GOOD/POOR verdicts.

   **It must MEASURE, not gate** — no threshold-based exit 1. Desktop CLS is 0.32 today, so
   a gate would ship red on the first run. Add `check:vitals` to `package.json` but **not**
   to `build`.

   Carry the measurement trap from `vitals.md:243-250` as a comment: a probe once reported
   identical CLS across six `min-height` values, which read as "the rule isn't applying" —
   it *was* applying, and the values genuinely did not matter. **Verify a rule applied
   before concluding it had no effect.**

7. **Record a baseline** by running it on all routes, desktop and mobile, and write the
   table into `vitals.md` under a dated heading. This is what makes every future number
   comparable.

8. **Reconcile the vitals bookkeeping** — set `vitals.md` front matter `prs: [110]` (it
   still reads `prs: []` while `INDEX.md:17` links #110), and note the harness now exists so
   `src/index.css:557` is no longer a dangling reference.

**B — the Carmel span, English half**

9. **Set `'carmel-christian'` to `null`** in the `summer-care-span` values at
   `src/data/metricValues.ts:1541`, keeping the existing comment and extending it to say why
   it is null rather than a value: a lunch-hour add-on is not wrap-around care, so it is not
   commensurable with the other seven — mirroring `charlotte-catholic`'s "no referent"
   phrasing at `:1287`. **Leave the qual at `:1590-1593` exactly as it is**; it is what
   preserves the 12–1 PM detail for readers, and it is already translated in all nine
   locales.

10. **Confirm `EXPECTED` needs no change** — `providence-day` at 660 min still wins among
    the remaining seven (`scripts/check_span_metrics.mjs:32-44`). Do not edit the table
    unless the checker says otherwise.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm.

### Phase 2 — Locales

Only workstream B has locale work. Scope is the **overlay layer** (research prose /
metric values), per `PROSE_TRANSLATED` in `src/lib/i18n.ts:182` — the nine locales
`es bn ht te fr fa it hi ar`. **Not** the `src/locales/*.json` chrome catalogs; no chrome
key changes.

11. **Remove the orphaned `values.carmel-christian` entry** for hash `f9a26929` from all
    **18** files — nine `src/data/overlays/metric-values.<lang>.json` and nine
    `src/data/overlays/work/metric-values.<lang>.json`. Eight locales held it identical to
    English; **`bn` holds a real translation** (`"দুপুর 12–1 টা"`) which goes with it.

    Do **not** hand-edit if a re-extract/rebuild produces the same result — prefer the
    pipeline. Whichever route, the end state is that no overlay references a value the
    English no longer has.

12. **Verify the qual survived.** The `carmel-christian` qual is a *different* hash and must
    remain translated in all nine. Losing it would delete the only place the 12–1 PM detail
    is stated.

## Files touched

| File | Change |
|---|---|
| `scripts/check_runtime_resolution.mjs` | edit — add empty + ratio value rules, `--report-identical`, separate exit path |
| `scripts/check_live_resolution.mjs` | edit — fix `workEnglish()` `strings` fallback + docstring correction |
| `scripts/check_vitals.mjs` | **new** — Playwright CLS/LCP harness, measure-only |
| `package.json` | edit — add `check:vitals`; chain `check:runtime` into `build` |
| `src/data/metricValues.ts` | edit — `carmel-christian` summer-care-span → `null` |
| `src/data/overlays/metric-values.<9 langs>.json` | edit — drop orphaned `f9a26929` entry (Phase 2) |
| `src/data/overlays/work/metric-values.<9 langs>.json` | edit — same (Phase 2) |
| `.claude/plans/vitals.md` | edit — `prs: [110]`, dated baseline table |
| `CLAUDE.md` | edit — record what the nine-overlay gates cover and what they deliberately do not |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean
- [ ] `npm run check:runtime` — passes all nine locales; prints the new value-rule count
      alongside the existing `11411 … 10 overlay file(s)`
- [ ] `npm run check:runtime -- --report-identical` — exits **0**, reports ~2,200 per locale
      grouped by consensus band
- [ ] **Negative A** — set one shipped `t` to `""` where English is non-empty → exit 1,
      names the hash. Restore
- [ ] **Negative B** — set one shipped `t` to `'ZZZ'` on an entry whose English is ≥80
      chars → exit 1 with the ratio message. Restore
- [ ] **Negative C** — confirm hash `811c9dc5` (English empty, `t` empty) does **not** fire.
      This is the guard against failing a correct repo
- [ ] **Negative D** — confirm an existing stamp-mismatch still reports on the *old* exit
      path, not the new one, so the value rules do not mask resolution failures
- [ ] `npm run check:spans` — **exits 0**; `summer-care-span` winner is still
      `providence-day`
- [ ] `npm run check:live` — unchanged, all nine locales pass
- [ ] `npm run check:vitals` — runs, prints a route × CLS × LCP table, exits 0. Expect
      desktop school-page CLS ≈ **0.32** and mobile ≈ **0.003**; if it does not roughly
      reproduce those, the harness is wrong, not the app
- [ ] `npm run build` — succeeds end to end with `check:runtime` chained in
- [ ] `git status --porcelain` empty after every negative test
- [ ] **Browser check** — load a school page and Compare in a real browser, confirm the
      `summer-care-span` row now shows the N/A dash for Carmel with its tooltip intact, and
      Providence Day still carries the leader tint

### Phase 2 — Locales

- [ ] `npm run check:runtime` — all nine locales; no orphaned entry, no new mismatch
- [ ] `npm run check:hashes` and `npm run check:translations` — clean; these are the guards
      that catch a half-done overlay edit
- [ ] `npm run check:live` — all nine pass
- [ ] `npm run build` — succeeds
- [ ] **Browser check in a non-English locale** — load Compare with `?lang=bn` (the locale
      that had the real translation) and confirm the Carmel cell shows the localized N/A
      dash, and the qual tooltip still reads in Bangla

## Risks

| Risk | Mitigation |
|---|---|
| The identical rule gets enforced by a later well-meaning edit, parking the build at ~2,200 | Step A4 ships it explicitly as exit-0 report; the reason is written into the script's docstring in the repo's own voice, citing `check:sepdrift` and the 4,646 precedent |
| The empty rule fails a correct repo on `811c9dc5` | Negative C tests exactly this; the rule tests the English, not a hardcoded hash |
| Value rules mask existing stamp-mismatch findings | Separate exit path (step A3) plus Negative D, mirroring the gate-2/gate-3 split verified in PR #171 |
| `workEnglish()` fix silently changes content-overlay behaviour | The content work file uses `sections`; the fallback tries `strings` first but that key is absent there, so behaviour is unchanged. `check:live` in the Phase-1 list confirms it |
| Nulling Carmel loses the 12–1 PM information | The qual at `:1590-1593` already carries it and is translated in all nine; Phase 2 step 12 explicitly verifies it survived |
| Phase 2 half-edits the 18 files, leaving an orphan | `check:hashes` + `check:translations` are named in the Phase-2 checklist as the specific guards |
| The harness reports numbers that disagree with `vitals.md` | Verification names the expected 0.32 desktop / 0.003 mobile; a mismatch means the harness is wrong. Do **not** "fix" the app to match a new harness |
| The harness is written as a gate and ships red | Step C6 states measure-only and keeps it out of `build` |

## Open questions

- **Should the identical report be wired to a `--strict` mode that exits 1 once the 344
  leak-shaped entries are triaged?** — **default:** no. Ship the report only. Adding the
  flag invites someone to turn it on before the triage exists.
- **Does the harness measure `/compare/` and home, or only school pages?** — **default:**
  measure everything `seo_routes.mjs` lists. `vitals.md` scoped them out for *fixing*, but
  the regression to 0.16 was found by measuring them, and a baseline that omits them cannot
  catch the next one.

## Implementation notes — Phase 1 (2026-08-21)

### Everything in the Context section reproduced exactly

Step A1 re-measured all three rules on the branch point. Every figure the plan
predicted held: **11,341 shipped entries per locale** in the nine overlays (102,069
total), **0 empty**, **0 ratio violations**, **19,754 identical** (1,914–2,445 per
locale), **2,756 distinct `(topic, hash)` pairs** banded **1,499 / 405 / 430 / 344**.
The ratio range across 38,691 qualifying pairs is **0.554–1.753**, well inside
`RATIO_LO=0.4 … RATIO_HI=2.5`, so the content-overlay constants were reused verbatim
rather than re-derived, as the plan directed.

### Four deviations, all corrections rather than scope changes

**1. `byStamp` had a second pass-by-doing-nothing bug, fixed alongside `workEnglish()`.**
The plan named one (`workEnglish()` reading only `w.sections`). While building
Negative C it turned out `check_runtime_resolution.mjs`'s own `byStamp` skips every
unit with a falsy `t` — which means the repo's one legitimately-empty pair
(`financial-aid-report` `811c9dc5`) would be reported as **orphaned** if the build
ever shipped it. Negative C initially failed for exactly that reason. The skip is now
`if (!u.t && src.trim()) continue`, and Negative C passes cleanly on both exit paths.
Same class of defect as the one the plan found, in the file the plan was editing.

**2. `check_runtime_all.mjs` needed two changes the plan did not anticipate.** It
swallows the per-locale child's stdout and prints one summary line, so
`--report-identical` produced no report. Flags are now forwarded to the child and
passed through verbatim when a `--report-*` flag is present. Separately, its summary
line was picked positionally from the END of the output (`slice(-2)[0]`), which
silently re-pointed at the new value-gate line the moment one was added; it now takes
the first line, which is the counts summary by construction.

**3. `npm run check:spans` does NOT exit 0, and the plan's Context was wrong about
why.** The plan states `summer-care-span` is "the only `compareAs: 'span'` row … no
other row has a non-parsing value". True of *span* rows, but `check:spans` also checks
range rows and the `EXPECTED` leader table, and **`main` had four failures, not one**:

| Finding | Status |
|---|---|
| `summer-care-span / carmel-christian: "12–1 PM" does not parse as span` | **FIXED here** |
| `program-span / gaston-day: "PS–12" does not parse as range-start` | pre-existing, untouched |
| `summer-ages / gaston-day: "rising PK–12" does not parse as range-width` | pre-existing, untouched |
| `bucket-hbcu: tints hickory-grove-christian — expected charlotte-country-day` | pre-existing, untouched |

All three survivors exist identically on `main` (verified by stashing the change and
re-running). They are outside this plan's scope — the two `gaston-day` values are the
same *silently unranked* defect class in different rows, and `bucket-hbcu` is either a
stale `EXPECTED` entry or a real mis-tint. **Worth its own plan; the verification line
"`check:spans` exits 0" is not reachable without it.** The row this plan targets is
green and Providence Day still wins at 660 min, so `EXPECTED` needed no edit (step 10).

**4. `check:schema` had to be regenerated.** Not in the plan's Files-touched table, but
nulling a Compare cell moves `summer-care-span` from 8/11 to 7/11 in the generated
`DATA-SCHEMA.md`, and `check:schema` is a build gate. One-line regeneration via
`npm run schema`.

### Workstream C: the desktop 0.32 does not reproduce, and the reason is a real finding

The plan's verification says "expect desktop school-page CLS ≈ 0.32 … if it does not
roughly reproduce those, the harness is wrong, not the app." The harness measures
**0.0101 on `/school/cannon/`** — the very page `vitals.md` profiled. Before concluding
the harness was wrong, three things were checked:

- The `min-height: 220px` reserve **is** applying (`getComputedStyle` confirmed it) —
  running the `vitals.md:243-250` trap in the correct direction this time.
- The two-pass mount **is still happening** exactly as diagnosed: `<details>` goes
  38 → **0** with 8 `.loading` placeholders at t≈155ms, height 6182 → 5633 → 6161.
  The mechanism is intact; it just costs 0.0102 now instead of 0.3175.
- The harness **does** reproduce the recorded numbers where they still hold:
  `/compare/` measures **0.1608** against `vitals.md`'s recorded 0.16, and mobile
  school pages measure **0.0030–0.0031** against its recorded 0.003.

So the harness is sound and the finding is real: **desktop CLS is school-specific.**
Nine of eleven school pages are GOOD; only `charlotte-catholic` (0.3505) and
`davidson-day` (0.3509) are POOR, reproducibly. Both pre-render fully (33 and 31
`<details>`, zero placeholders in the shipped HTML), so it is not a pre-rendering
failure. Both are also the two schools with **seven** research areas rather than eight —
offered as a lead, **not** a finding; it was not tested. The full baseline and its
caveats are in `.claude/plans/vitals.md` under a dated heading.

The mobile LCP figures are **not** comparable to `vitals.md`'s 4.27s: that harness was
discarded and its throttle settings are unrecoverable, while this one uses Chrome's
Fast-3G preset at CPU 4×. The POOR verdict agrees, the magnitude does not, and the
caveat is written into the baseline rather than smoothed over.

### Phase 1 verification results

| Check | Result |
|---|---|
| `npx tsc -b` | clean |
| `npm run check:runtime` | ✓ 9 locales, **11,411 values checked each** |
| `npm run check:runtime -- --report-identical` | exit **0**, 2,251 for `fr`, per-file breakdown |
| Negative A — empty `t`, English non-empty | exit 1, names the hash, **new** exit path |
| Negative B — `'ZZZ'` vs 107-char English | exit 1, ratio 0.028 outside 0.4–2.5 |
| Negative C — `811c9dc5` empty both sides | exit **0**, does not fire (after fix 1) |
| Negative D — stamp drift | exit 1 on the **old** path, value gate never reached |
| `npm run check:spans` | target row ✓, PD leads at 660; 3 pre-existing failures remain |
| `npm run check:schema` | ✓ after `npm run schema` |
| `npm run check:hashes` | ✓ |
| `npm run check:vitals` | ✓ runs, full 13-route × 2-pass baseline recorded |
| `npm run build` | ✓ end to end **with `check:runtime` chained in** |
| `git status` after every negative | clean |
| Browser check (headed Chrome, `en` + `bn`) | Carmel renders `cell no` / N/A with "Not available"; PD keeps `cell val lead` |

### Known-failing until Phase 2, by design

`npm run check:live` now reports **1 orphaned entry per locale** — hash `f9a26929`,
`12–1 PM`, in all nine `metric-values.<lang>.json`. This is the orphan the plan
predicted at step 11 and is exactly why the plan is two-phase: the English value is
gone, so the nine shipped overlay entries (and their nine work counterparts) now point
at English that no longer exists. `check:live` is in the build chain, so **`npm run
build` will fail on this until Phase 2 removes those 18 entries.**

Note `check:runtime` passes on the same repo state — it validates stamps against the
**work file**, which still carries the English, while `check:live` walks **live
`src/data`**. That is precisely the documented difference between the two checkers,
visible here as a worked example.

`bn` holds the only real translation (`"দুপুর 12–1 টা"`) and it goes with the rest. The
`carmel-christian` qual is a different hash and was verified still translated in all
nine locales — it is what preserves the 12–1 PM detail for readers.

## Implementation notes — Phase 2 (2026-08-21)

### The pipeline route was verified, then deliberately not used to write the files

Step 11 says "do not hand-edit if a re-extract/rebuild produces the same result — prefer
the pipeline." The pipeline was run and it **cannot** be the write path here:
`i18n_extract.mjs` emits `t: ''` for every string (`:269`), so re-extracting the nine work
files would have blanked all 512 translations per locale to remove one entry. There is no
carry-over branch on this extractor — only `i18n_extract_content.mjs` has one, which is
what the CLAUDE.md note refers to.

The pipeline was therefore used as the **spec** rather than the writer, via the plan's own
`--lang __verify` throwaway technique: a fresh extract of `metric-values` from live English
yields **512** strings against the shipped **513**, and the delta is exactly
`['f9a26929']` — zero missing, zero `at`-list diffs, zero `text` diffs, and identical
ordering once the orphan is dropped. The 18 files were then edited to that spec and
asserted structurally byte-equal to the fresh extract afterwards. End state is what the
plan asked for: no overlay references a value the English no longer has.

### Results

- **18 files, 135 deletions, zero insertions** — pure removals, nine shipped and nine
  `work/`. `bn`'s real translation (`"দুপুর 12–1 টা"`) went with the rest, as predicted.
- Every locale drops **513 → 512**; `check:runtime` correspondingly reports **11,410**
  values per locale where Phase 1 reported 11,411.
- **Zero untranslated strings** remain in any of the nine work files after the removal.

### Step 12 — the qual survived

The `carmel-christian` qual is hash **`a8a24ad5`** (distinct from the removed `f9a26929`)
and is present and translated in all nine shipped overlays (113–168 chars each). The
12–1 PM detail is preserved for every reader.

### Phase 2 verification results

| Check | Result |
|---|---|
| `npm run check:live` | ✓ all 9 locales — **was failing 1 orphan per locale before this change** |
| `npm run check:runtime` | ✓ all 9, 11,410 values each across 10 overlay files |
| `npm run check:hashes` | ✓ 8 cases, build-time and runtime stamps agree |
| `npm run check:translations` | ✓ no drift; `metric-values` 100% (577/577) in all 9 |
| `npm run build` | ✓ **exit 0 end to end**, with `check:live` + `check:runtime` chained |
| Browser check, `en` | Carmel `[cell no]` → `<span class="mark-na" title="Not available">N/A</span>`; PD keeps `cell val` |
| Browser check, `bn` | Carmel `[cell no]` → `<span class="mark-na" title="পাওয়া যায়নি">প্রযোজ্য নয়</span>`; localized N/A **and** localized tooltip; no raw `12–1 PM` anywhere on the page |

The two locales render the row identically in structure, which is the point: the stale
Bangla value is gone and the reader sees the same N/A affordance an English reader sees.

### One observation, deliberately not acted on

A `null` Compare cell renders `mark-na` with **no qual tooltip** — so the `carmel-christian`
scope note explaining the 12–1 PM add-on is not reachable from that cell in *any* locale,
English included. That is Phase 1's approved English behaviour rather than anything Phase 2
introduced (verified by rendering both locales side by side), and it is how every other
null cell in the file already behaves. Surfacing quals on null cells would be a UX change
across all eleven `compareAs` rows and needs the approval gate — recorded here as a
suggestion, not built.

### Still outstanding from Phase 1, unchanged

The three pre-existing `check:spans` failures (`program-span`/`summer-ages` on `gaston-day`,
`bucket-hbcu`) are untouched and still exist on `main`. They remain worth their own plan.
