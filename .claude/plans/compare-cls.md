---
name: compare-cls
title: Fix the Compare page CLS (0.16 desktop / 0.17 mobile) — a genuine font-metric reflow
status: in-progress
phases: 1
created: 2026-08-22
branch: perf/compare-cls
prs: []
---

# Fix the Compare page CLS

## Goal

`/compare/` is the **last route on the site not measuring GOOD** — CLS **0.1602 desktop /
0.1747 mobile**, against a 0.1 threshold. Both pill rows (topic and school) re-wrap when
Barlow Condensed replaces the fallback face, pulling the table and everything below it up
by ~135px.

We will know it worked when `npm run check:vitals -- --both --runs 5` reports
**CLS ≤ 0.1 on `/compare/` in both profiles**, with no other route regressing and the
settled page visually identical.

## Context

### The numbers reproduce — this is not noise

An earlier session saw 0.0027 on one run and 0.1602 on another and flagged the route as
unstable. **That discrepancy is explained and resolved:** the low reading came from probing
the *bare* `/compare/`, which renders the empty state. The real route carries a query.

`scripts/seo_routes.mjs:48-72` defines `/compare/` **with a `query`** naming every school
and the first topic, and `check_vitals.mjs:234` visits `route.path + (route.query ?? '')`.
So the harness has always measured the **full 11-school table**, and it is stable:

```
/compare/  desktop  median of 5  CLS=0.1602  NEEDS-WORK
/compare/  mobile   median of 5  CLS=0.1747  NEEDS-WORK
```

**The "is the empty state the right thing to optimize?" question is therefore moot** — the
measured page was never the empty state. Do not re-open it. (A bare `/compare/` does render
empty, because `selected` derives from the URL at
[Compare.tsx:198](../../src/pages/Compare.tsx#L198) and there is no all-schools default —
but that URL is not canonical, not in the sitemap, and not what is being measured.)

### Root cause — isolated by a discriminating experiment

Both `.pill-row` elements shrink when the webfont lands, sampled every 4ms:

```
+117ms  topicRow  h=127  content=1092px  box=580px      <- fallback metrics
        schoolRow h=217  content=2409px  box=580px
        table     h=747
+139ms  topicRow  h= 82  content= 877px  box=580px      <- Barlow Condensed lands
        schoolRow h=172  content=1916px  box=580px
        table     h=656
+142ms  layout-shift v=0.1602                            <- ~135px of upward movement
```

Content width drops **~20%** (1092 → 877px) at an unchanged 580px box, so the topic row
goes 3 lines → 2 and the school row 6 → 5. `.control-hint`, `.table-wrap` and the whole
table move up 45px each.

**The 20% is the point.** `.pill` uses `font-family: var(--heading)`
([index.css:1992](../../src/index.css#L1992)) = `'Barlow Condensed', system-ui, sans-serif`
([index.css:35](../../src/index.css#L35)). A **condensed** face against a **non-condensed**
`system-ui` fallback is about as large a metric mismatch as a fallback stack can produce.

### Why this IS the font, unlike the school-page case

PR #175 fixed a superficially identical bug on school pages and found the font-blocking
evidence was **masking, not causation** — the real cause was an unsized crest `<img>` that
shifted load order. That precedent demands a discriminating test here, so one was run:

| Arm | Stylesheet | Font files | Load order | CLS | Requests matched |
|---|---|---|---|---|---|
| fonts ALLOWED | loaded | loaded | normal | **0.1608–0.1629** | 5 |
| **gstatic FILES blocked** | **loaded** | **blocked** | **UNCHANGED** | **0.0000** | 5 |
| googleapis CSS blocked | blocked | blocked | changed | 0.0000 | 1 |

The middle arm is decisive. The stylesheet still loads and still render-blocks, so load
ordering is **identical to the ALLOWED arm** — only the face is unavailable. CLS goes to
zero. That isolates the cause to **metric substitution**, not request timing.

This is the mirror image of the school-page result, where blocking gstatic alone left CLS
at 0.3485. Running the same discriminator there is what exposed the crest.

**Every arm asserts a non-zero matched-request count** (5 / 5 / 1), per the standing lesson
that a route pattern matching nothing produces a silent no-op that reads as a null result.

### No image is involved

`.pill` contains a `<span class="dot">`, not an `<img>`. `loadingImgs` was 0 at every
sample and the table renders zero `<img>` badges during the shift window. The PR #175 fix
does not apply and must not be copy-pasted here.

## Decisions

- **Fix the metric mismatch, not the pill row's height** — a `min-height` on `.pill-row`
  is the analogue of the fix PR #175 rejected, and for the same reason: the settled row
  count varies by viewport (3/2 rows desktop, 6/5 mobile), by locale, and by how many
  schools are selected. Any constant would ship a blank band somewhere.
- **Prefer a `@font-face` metric-override fallback over self-hosting** — declaring a local
  fallback with `size-adjust` / `ascent-override` matched to Barlow Condensed keeps the
  current asset pipeline and is scoped to the fallback, so if it is imperfect the failure
  mode is a smaller shift rather than a broken page. Self-hosting is the fallback plan.
- **Do not add `check:vitals` to `npm run build`** — its own docstring gives the reason
  (browser dependency, runtime, and this repo's recorded history of permanently-red
  checkers). Keep it runnable, keep it out of the chain.
- **Single-phase — adds no user-facing text.** CSS only, plus possibly a `<link>`
  attribute. No `src/locales/*.json` key, no overlay work.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic; no reordering.
The settled page must render identically — that is the acceptance test, not a side effect.

## Out of scope

- **The bare `/compare/` empty state.** Not canonical, not in the sitemap, not measured.
  Giving Compare an all-schools default is a UX change and would need approval.
- **School-page CLS.** Fixed in PR #175; do not revisit `.dossier-crest`.
- **The 2.2 MB bundle.** A separate follow-up, recorded in
  [`vitals.md`](vitals.md) — an interactivity cost, not a CLS or LCP cause.
- **The Charlotte Catholic wrap-boundary observation** in `vitals.md`. One unreproduced
  production sample; needs its own reproduction pass first.
- **Deploying.** `npm run deploy` stays the user's call, every time.

## Steps

**Single-phase — adds no user-facing text.**

1. **Reproduce the baseline.** `npm run build`, then
   `npm run check:vitals -- --route /compare/ --runs 5` and the same with `--mobile`.
   Confirm **0.1602 / 0.1747 NEEDS-WORK**. If either is already GOOD, stop and re-measure
   every route — something changed and this plan needs revisiting first.

2. **Re-run the discriminator before editing.** Block **only** `fonts.gstatic.com` and
   confirm CLS → 0.0000 while the stylesheet still loads. **Assert the matched-request
   count is non-zero in both arms.** This is a 5-minute check that protects against
   repeating the PR #175 misattribution in reverse; do not skip it because the plan already
   reports the numbers.

3. **Add a metric-matched fallback face.** In [src/index.css](../../src/index.css), declare
   an `@font-face` for a local fallback (e.g. `Barlow Condensed Fallback` over
   `local('Arial Narrow')` or a `system-ui` source) with `size-adjust`, `ascent-override`
   and `descent-override` tuned so the fallback's advance widths approximate Barlow
   Condensed. Insert it into `--heading`
   ([index.css:35](../../src/index.css#L35)) between the real face and `system-ui`.
   Derive the percentages by measuring — render a pill's text in both faces and take the
   width ratio (the observed 877/1092 ≈ **80%** is the starting estimate, not the answer).

4. **Re-measure `/compare/`, both profiles, `--runs 5`.** Target **CLS ≤ 0.1** on each.
   Also confirm the residual pill-row content width delta has shrunk from ~215px.

5. **Re-measure every route.** `npm run check:vitals -- --both --runs 3`. `--heading` is
   used site-wide (pills, nav, headings, table corners), so this step is not optional —
   a fallback that helps Compare could hurt a school page. No route may regress.

6. **Browser check at rest.** Load `/compare/` with the full query in a real browser and
   confirm the settled pills are visually identical to `main` — same wrap points, same
   spacing. Then check **`?lang=fa`** (RTL, longest labels) and **`?lang=hi`** (Devanagari,
   which per CLAUDE.md renders with its own line-height rules) — a fallback tuned to Latin
   metrics must not disturb either.

7. **If step 4 fails, stop.** Do not stack a second fix. Record what the number did and
   re-plan toward self-hosting Barlow Condensed with `font-display: optional`, which
   eliminates the swap entirely at the cost of a first-paint fallback. A failed step 3 is a
   useful finding.

8. **Update this document** with an `## Implementation notes` section: the measured
   before/after per route, the override percentages actually used and how they were
   derived, and — if step 7 triggered — what the override did.

## Files touched

| File | Change |
|---|---|
| `src/index.css` | edit — `@font-face` fallback with metric overrides; add it to `--heading` |
| `index.html` | possible edit — only if step 7 sends the fix toward font loading |
| `.claude/plans/compare-cls.md` | edit — implementation notes at step 8 |

## Verification

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — no new warnings (two pre-existing, in `check_fa_script.mjs` and
      `check_chrome_keys.mjs`)
- [ ] `npm run build` — succeeds; all eight chained checks pass
- [ ] `npm run check:vitals -- --route /compare/ --runs 5` — **CLS ≤ 0.1**
- [ ] `npm run check:vitals -- --mobile --route /compare/ --runs 5` — **CLS ≤ 0.1**
- [ ] `npm run check:vitals -- --both --runs 3` — no route regresses on either profile
- [ ] Browser: `/compare/` with the full query — settled pills identical to `main`
- [ ] Browser: `?lang=fa` and `?lang=hi` on `/compare/` — no wrap or line-height disturbance
- [ ] `git status` clean of probe scripts

## Risks

| Risk | Mitigation |
|---|---|
| **The override is imperfect and a smaller shift remains.** | Step 4 measures rather than assumes; the failure mode is a reduced shift, not a broken page. Step 7 is the stop gate. |
| **`--heading` is site-wide**, so a fallback tuned for Compare's pills could shift a school page or the home hero. | Step 5 re-measures every route on both profiles; no regression is an explicit pass condition. |
| **Non-Latin locales use different faces and line-heights** (`hi` ships 1.45/1.6 per CLAUDE.md); a Latin-tuned override could disturb them. | Step 6 checks `fa` and `hi` in a browser. Scope the override to Latin locales if it does. |
| **`local()` fallbacks are platform-dependent** — `Arial Narrow` exists on macOS/Windows but not most Linux. | Keep `system-ui` after the fallback in the stack so the chain degrades. Note the measurement machine is macOS; the override is an improvement, not a guarantee, elsewhere. |
| **Lab numbers improve, field numbers do not.** The site is live, so CrUX data exists. | Check Search Console's Core Web Vitals after deploy. State plainly these are lab numbers on one machine. |

## Open questions

- **Which fallback source — `local('Arial Narrow')`, a `system-ui` override, or
  self-hosting?** — **default:** try a metric-overridden `local()` fallback first (step 3);
  if step 4 fails, stop at step 7 rather than improvising.
- **Should the override be scoped away from non-Latin locales?** — **default:** ship it
  unscoped and let step 6 decide; scope it only if `fa`/`hi` actually move.
- **Does the same mismatch affect other `--heading` consumers measurably?** Every other
  route already measures GOOD, so any residual shift is under threshold. — **default:**
  do not chase it; step 5 only guards against regression.

## Implementation notes

Shipped as planned in shape — a metric-overridden `local()` fallback face in
`src/index.css`, inserted into `--heading` between the real face and `system-ui`.
**Mobile reaches the target; desktop does not.** Step 7's stop gate therefore
applies and no second fix was stacked.

### Measured before/after

| Profile | Before | After | Verdict |
|---|---|---|---|
| `/compare/` desktop, median of 5 | 0.1602 | **0.1263** | NEEDS-WORK — still over 0.1 |
| `/compare/` mobile, median of 5 | 0.1747 | **0.0636** | **GOOD** |

Every other route measured GOOD before and after, on both profiles (`--both --runs 3`);
none regressed. Desktop school pages sit at 0.0000–0.0017, home at 0.0008.

### The overrides shipped, and how they were derived

```css
size-adjust: 97.3%;  ascent-override: 92.5%;  descent-override: 25.7%;  line-gap-override: 0%;
src: local('Helvetica Neue'), local('Arial'), local('Liberation Sans');
```

**The plan's ~80% starting estimate and the font-metric ratio are both wrong, for two
different reasons, and the second one cost a build cycle.**

1. The plan derived ~80% from the settled row-content delta (877/1092). That is not the
   text ratio: a pill row also carries 13px padding, an 8px dot and 8px gaps per pill,
   none of which scale with the font, so the row total shrinks harder than the text does.
2. Measuring the 19 real pill labels on a canvas gave a Barlow-Condensed-to-`system-ui`
   advance ratio of **0.9082**, and `size-adjust: 90.8%` was shipped first. It **overshot**
   — the pill rendered **177.6px against the real face's 190.2px, 6.6% too NARROW** — and
   moved CLS only 0.1602 → 0.1585. `size-adjust` scales the em box while padding, the dot,
   the gap and the 0.02em tracking do not scale with it.

Per the harness's own recorded trap, the rule was verified to have *applied* before
concluding it had not worked: `document.fonts.check` returned true for the fallback face,
the `@font-face` rule was present in the built CSS, and the computed `font-family` carried
it. It applied; the value was simply wrong.

Re-tuning against the **rendered** width — 190.234/177.563 = 1.0714, so 90.8% × 1.0714 —
gives **97.3%**, landing 189.7px against 190.2px. Across all 19 labels the
fallback-to-real ratio is then mean **1.006**, spread **0.944–1.036**. ascent/descent are
percentages of the *adjusted* em, so Barlow Condensed's 900/250 per 1000em become
900/0.973 = 92.5% and 250/0.973 = 25.7%.

`Arial Narrow` was rejected: it is *narrower* than Barlow Condensed (ratio 1.099, so it
would need widening) and is absent on most Linux systems.

### Why desktop is still over threshold

The residual shift is still the pill rows re-wrapping — attributed by a layout-shift
`sources` probe to `DIV.table-wrap | P.control-hint | BUTTON.pill school on ×3`. At the
desktop 580px box the 11-pill school row sits close enough to a wrap boundary that the
±4% per-string residual still flips one line. Mobile's narrower box does not land on such
a boundary, which is why it clears.

A tighter single override cannot fix this: the spread is inherent to substituting one
typeface's per-glyph widths for another's, not a mis-set constant. **The plan's step 7
recommendation stands — self-hosting Barlow Condensed with `font-display: optional`
eliminates the swap rather than approximating it.** That is a separate plan; per step 7 it
was not attempted here.

### Step 2 discriminator, re-run before editing

Confirmed the plan's table rather than trusting it, with the non-zero matched-request
assertion in every arm:

| Arm | Stylesheet loaded | CLS | Requests matched |
|---|---|---|---|
| fonts ALLOWED | yes | 0.1602 | 5 |
| **gstatic FILES blocked** | **yes** | **0.0000** | **4** |
| googleapis CSS blocked | yes (cached rules) | 0.0000 | 1 |

The middle arm reproduces decisively: load order unchanged, only the face unavailable,
CLS to zero. This is metric substitution, not request timing — the mirror of PR #175.

### Settled-page check (step 6)

Rendered in a real headed Chrome at rest, branch vs `main`:

| Locale | dir | pill rows (height / lines) | `.table-wrap` top |
|---|---|---|---|
| `en` | ltr | 82px/2, 172px/4 | 497 |
| `fa` | rtl | 85px/2, 224px/5 | 553 |
| `hi` | ltr | 85px/2, 224px/5 | 553 |

Identical on both branches, and the `en` screenshots are **byte-identical**. `fa` keeps
RTL and `hi` keeps its taller 22px line-height — neither is disturbed, because both render
in their own script's face and never reach the Latin-tuned fallback. No scoping was needed
(the plan's open question defaulted to "ship unscoped and let step 6 decide").

### Deviations from the plan

- **Two tuning iterations, not one.** The plan's step 3 said to derive the percentage by
  measuring; it did not anticipate that a font-metric measurement and a rendered-width
  measurement disagree by 6.6%. Recorded above so a future pass tunes on rendered width
  directly.
- **Step 4 did not fully pass**, so per step 7 the work stopped rather than stacking a
  second fix. Mobile met the target; desktop is improved by 21% but not under 0.1.
