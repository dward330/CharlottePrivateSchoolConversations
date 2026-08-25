---
name: mobilelcp
title: Settle the mobile LCP outliers — six routes report the bundle's arrival, not their paint
status: implemented
phases: 1
created: 2026-08-25
branch: perf/mobile-lcp
prs: [212]
---

# Settle the mobile LCP outliers

## Goal

`npm run check:vitals -- --mobile` reports **six routes POOR at 12–21s** while seven sit at
~2.0–2.4s. The figures have been carried as "a measurement artifact" since 2026-08-22 and
never re-examined.

Re-measured 2026-08-25, the artifact diagnosis **holds and is now proven by a controlled
experiment** — but two things about it were wrong, and the count has grown from three routes
to six.

This plan makes the harness report a defensible LCP, so the number stops being an
unexplained red that everyone has learned to ignore.

## Context

### The measurement, 2026-08-25 (median of 3, mobile profile)

| POOR | | GOOD | |
|---|---|---|---|
| `/school/cannon/` | 20,636ms | `/compare/` | 1,612ms |
| `/school/davidson-day/` | 20,832ms | `/school/charlotte-catholic/` | 2,004ms |
| `/school/covenant-day/` | 19,996ms | `/school/hickory-grove-christian/` | 2,004ms |
| `/school/gaston-day/` | 19,624ms | `/school/charlotte-country-day/` | 2,364ms |
| `/school/carmel-christian/` | 19,456ms | `/school/charlotte-latin/` | 2,436ms |
| `/` | 12,600ms | `/school/providence-day/` | 2,440ms |
| | | `/school/charlotte-christian/` | 2,432ms |

**CLS is GOOD on every route** — that half of the site's vitals is healthy.

### Correction 1 — it is six routes, not three

`vitals.md` follow-up 3 records the outliers as `/school/cannon/`,
`/school/davidson-day/` and `/`. **Carmel Christian, Covenant Day and Gaston Day have since
joined them.** Whatever the trigger is, it is spreading as the site grows, so "a known
artifact on two pages" understates it.

### Correction 2 — the element does not grow

`vitals.md` explains the second candidate as "the *same* element grown from 11160 to 11412
bytes — a podcast line reflowing when the bundle lands." **The element does not change
size.** Measured pre- and post-hydration on `/school/cannon/`:

```
PRE : w=317 h=39 area=12356 chars=72
POST: w=317 h=39 area=12356 chars=72     area delta: 0
```

Nor is it always the same element. Across affected routes the second candidate lands on
three *different* elements:

```
/school/cannon/            <SPAN.podcast-pageline-text>
/school/carmel-christian/  first <H1>, then <P.welcome-caption>   ← different elements
/school/gaston-day/        <P.welcome-caption>
```

So "a podcast line reflowing" is wrong twice over: the podcast line is not involved on most
affected pages, and nothing reflows. The `size` figure in the LCP entry shifts slightly
(10608 → 10745) because the entry is re-reported after hydration, not because the element
grew.

### What it actually is — proven by a controlled experiment

The second candidate fires **immediately after the main bundle finishes downloading**:

```
/school/gaston-day/   index-DfPXwsDH.js  finishes  +15,949ms
                      2nd LCP candidate            +16,416ms
```

Blocking the bundle removes it entirely, with the block verified to have taken effect:

| Condition | Candidates | Final LCP |
|---|---|---|
| bundle allowed | 2 | **16,404ms** |
| bundle **blocked** | 1 | **1,940ms** |

And it is **deterministic, not a race** — 3/3 runs on `/school/cannon/` produced two
candidates at 17,848 / 17,856 / 17,860ms.

**The real paint is ~1.9–2.4s on every route.** The pre-rendered HTML paints, then React
hydrates when the 2.2 MB bundle lands ~16s later on Fast-3G, and the browser re-reports the
largest element. `PerformanceObserver` takes the **last** entry, so the harness records the
bundle's arrival time.

### Why some routes escape

Not page size — `/school/providence-day/` is the **largest** pre-rendered page (489 KB) and
reports 2,440ms, while `/school/gaston-day/` (279 KB) reports 19,624ms. The affected pages
are simply the ones where hydration happens to re-nominate a largest element; the others
keep their first candidate. That difference is incidental, which is exactly why chasing it
per-page would be wasted effort.

### Is this a real user problem?

**Partly, and the plan must not overstate it.** Field LCP is what Google ranks on, and real
Chrome reports LCP at *user interaction or page hide*, not after an arbitrary 6-second wait
— so a real visitor who scrolls or taps before the bundle lands finalises LCP at ~2s. The
harness waits, so it always sees the late candidate.

But the underlying fact is real: **on a slow connection this site is not interactive for
~16 seconds.** That is a genuine problem — it is just a TTI/INP problem, and it belongs to
`bundlesplit` (abandoned, recoverable on `perf/bundle-split`), not here. **This plan fixes
the measurement, not the load time.**

### Why fixing the measurement matters

A checker parked at an unexplained red stops being read. CLAUDE.md records this failure mode
twice — `check:sepdrift` and `check:live`-at-4,646 — and `check_vitals.mjs`'s own docstring
cites it as the reason it is not a build gate. Six POOR rows that everyone knows to ignore
is that failure mode, in the one harness the project uses to judge performance.

## Decisions

- **Fix the harness's LCP attribution, not the bundle.** The load time is `bundlesplit`'s
  problem and was deliberately abandoned on a CLS tradeoff.
- **Report both numbers rather than silently picking one.** A single "corrected" figure
  hides the 16s of non-interactivity, which is real. The harness should show the paint time
  *and* flag that a post-hydration candidate superseded it.
- **Do not simply take the first candidate.** A late candidate is sometimes legitimate — a
  lazily-loaded hero image genuinely painting late is a real LCP. The discriminator is
  whether the candidate arrives *after hydration re-reports an already-painted element*.
- **Do not add `check:vitals` to `npm run build`.** Unchanged; its docstring gives the
  reason.
- **Single-phase — adds no user-facing text.** Script and documentation only.

## Approvals needed

**None.** No app code, no new card, section, stat tile, Compare row, metric key or topic.

## Out of scope

- **Reducing the bundle or the 16s TTI.** That is `bundlesplit`, abandoned 2026-08-24 on a
  mobile-CLS regression and recoverable on `perf/bundle-split`.
- **`/compare/` CLS 0.1263** — accepted by the user 2026-08-23.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Single-phase — adds no user-facing text.**

1. **Reproduce the baseline.** `npm run build`, then
   `npm run check:vitals -- --mobile --runs 3`. Confirm six POOR routes at 12–21s and seven
   GOOD at ~2.0–2.4s. If the set differs, record the new set — it has already grown once.

2. **Re-prove the mechanism before changing anything.** For one affected route, capture
   every LCP candidate with its timestamp and element, and the request timing of the main
   `index-*.js`. Confirm the second candidate follows the bundle's `responseEnd`. Then block
   the bundle and confirm the second candidate disappears — **asserting the route matched a
   non-zero number of requests**, per the standing lesson that an intervention which
   silently applies to nothing reads as a null result.

3. **Record every LCP candidate in the harness**, not just the last. In
   `scripts/check_vitals.mjs`, the collector currently keeps only
   `es[es.length - 1].startTime` (line ~236). Keep the full list: timestamp, size, and an
   element descriptor.

4. **Report a paint LCP and a final LCP.** Show the first candidate as the paint time and
   flag routes where a later candidate superseded it — e.g.
   `2,312ms GOOD (superseded at 16,416ms by post-hydration re-report)`. **Both numbers
   visible; neither silently dropped.**

5. **Document the distinction in the script's docstring**, alongside the existing
   measurement traps. State plainly: the late candidate is the bundle landing, the real
   paint is the first, and the 16s gap is a TTI problem owned by `bundlesplit`.

6. **Correct `vitals.md` follow-up 3.** Its two factual errors — "the same element grown"
   and the three-route list — are wrong and were carried for three days. Replace with the
   measured mechanism and the current six-route set.

7. **Re-measure and report.** `npm run check:vitals -- --both --runs 3`. Desktop must be
   unchanged; mobile should now show ~2s paint figures with supersession flags. **No CLS
   number may move** — this touches only LCP bookkeeping.

## Files touched

| File | Change |
|---|---|
| `scripts/check_vitals.mjs` | edit — record all LCP candidates; report paint vs final; docstring |
| `.claude/plans/vitals.md` | edit — correct follow-up 3's mechanism and route list |
| `.claude/plans/mobilelcp.md` | edit — implementation notes |

## Verification

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — no new warnings (two pre-existing, in `check_fa_script.mjs` and
      `check_chrome_keys.mjs`)
- [ ] `npm run build` — succeeds; all eight chained checks pass
- [ ] Step 2's block experiment reported **with its matched-request count**
- [ ] `npm run check:vitals -- --both --runs 3` — desktop unchanged; **every CLS figure
      identical** to the baseline
- [ ] Mobile output shows a paint LCP per route and flags the superseded ones
- [ ] `vitals.md` follow-up 3 corrected
- [ ] `git status` clean of probe scripts

## Risks

| Risk | Mitigation |
|---|---|
| **Reporting the first candidate hides a genuinely late LCP** — a lazily-loaded hero image painting at 8s is a real LCP, not an artifact. | Never drop the final figure. Step 4 reports both and flags supersession rather than replacing one with the other. |
| **The "artifact" framing excuses a real 16s TTI.** | Stated explicitly in Context and Out of scope: the load time is real and belongs to `bundlesplit`. This plan must not be cited as evidence the site is fast. |
| **Lab-only reasoning.** These are emulated Fast-3G numbers on one machine; field LCP finalises at interaction. | Say so in the docstring. The site is live, so Search Console holds real CrUX LCP — check it before drawing conclusions about ranking impact. |
| **The affected route set keeps growing**, so a hardcoded list goes stale. | Do not hardcode it. The supersession flag is computed per run from the candidate list. |

## Open questions

- **Should the harness wait for a simulated interaction** (a scroll or tap) before finalising
  LCP, which is what real Chrome does? That would make the mobile number match field
  behaviour directly. — **default:** out of scope; report both candidates first and consider
  interaction simulation as a follow-up once the two-number output is in use.
- **Is the ~16s TTI worth re-opening `bundlesplit` for?** It was abandoned on a mobile-CLS
  regression, and the CLS interaction with the pre-render is still unsolved. — **default:**
  leave abandoned; this plan supplies the honest TTI figure that a future decision would need.


## Implementation notes — 2026-08-25

**Shipped as planned.** All seven steps executed; the mechanism reproduced exactly as the
plan described it, and both of the plan's corrections to `vitals.md` were confirmed by
measurement rather than taken on trust.

### Results

`npm run check:vitals -- --both --runs 3`, after:

| route | paint LCP | superseded at | element |
|---|---|---|---|
| `/school/davidson-day/` | 2,436ms GOOD | 20,832ms POOR (+18s) | `SPAN.podcast-pageline-text` |
| `/school/cannon/` | 2,436ms GOOD | 20,632ms POOR (+18s) | `SPAN.podcast-pageline-text` |
| `/school/covenant-day/` | 2,004ms GOOD | 19,988ms POOR (+18s) | `P.welcome-caption` |
| `/school/gaston-day/` | 2,004ms GOOD | 19,628ms POOR (+18s) | `P.welcome-caption` |
| `/school/carmel-christian/` | 2,004ms GOOD | 19,456ms POOR (+17s) | `P.welcome-caption` |
| `/` | 1,608ms GOOD | 12,600ms POOR (+11s) | `P.lede` |

The other seven routes report a single candidate and are unflagged. **Desktop is entirely
unflagged**, which is the expected control: the bundle lands in ~100ms there, so no late
candidate exists to supersede anything. **All 13 mobile CLS figures are byte-identical to
the baseline**, checked by parsing both logs and diffing rather than by eye.

### Step 2 — the mechanism, re-proven

On `/school/gaston-day/`, with **1 matched request asserted in every run**:

```
bundle /assets/index-DfPXwsDH.js  responseEnd  +19,403ms
2nd LCP candidate                              +19,628ms   (225ms later)
```

Deterministic, 3/3 runs. Blocking the bundle (**1 request confirmed aborted**) collapses it
to a single candidate at **1,568ms**, down from 19,628ms.

### Two plan claims tightened by measurement

- **The plan's element list was right about Cannon/Davidson Day and incomplete elsewhere.**
  It named `SPAN.podcast-pageline-text`, `H1`→`P.welcome-caption` and `P.welcome-caption`.
  Measured, `/` is a fourth shape: the same `P.lede` re-reported. The classifier ignores the
  element descriptor entirely for exactly this reason — a same-element test misses
  carmel-christian, and an element-changed test misses the other five.
- **`vitals.md`'s "probably the same artifact" for `/` is now confirmed**, not probable:
  bundle at +12,454ms, candidate at +12,600ms, identical 142-char `P.lede`, size ratio
  1.023×. That line has been updated in place.

### One defect found and fixed in the harness itself

Adding the element descriptor initially broke **every route** with `collector never
installed`. The cause: `COLLECTOR` is a **template literal**, so a regex written `/\s+/`
inside it reaches the browser as a literal whitespace character, which terminates the regex
and makes the entire collector **unparseable**. The failure is silent and total — nothing
throws in Node, the page loads normally, and the symptom points at the browser rather than
at a typo in this file.

`scripts/check_vitals.mjs` now **parses `COLLECTOR` with `new Function` at module load** and
exits 2 with a message naming the escaping cause. Negative-tested by reintroducing the exact
defect into the artifact and confirming exit 2 and the right message — the first attempt at
that negative test produced `/s+/`, a *valid* regex, and so passed while proving nothing;
worth noting because it is the same trap the repo already records about corrupting an
upstream input instead of the artifact.

### Deliberately not done

- **The ~17s TTI is untouched and remains real.** It belongs to `bundlesplit`. Both the
  script docstring and `vitals.md` say so explicitly, so neither can be cited as evidence
  the site loads fast on a slow connection.
- **`check:vitals` is still not a build gate**, per the plan and its own docstring.
- **Interaction simulation** (open question 1) left as a follow-up, per its stated default.
