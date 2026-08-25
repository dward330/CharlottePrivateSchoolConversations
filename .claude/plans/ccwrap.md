---
name: ccwrap
title: Reproduce the Charlotte Catholic CLS spike against the live site, and fix it only if it is real
status: implemented
phases: 1
created: 2026-08-24
branch: perf/cc-wrap
prs: [204]
---

# Reproduce the Charlotte Catholic CLS spike

## Goal

`/school/charlotte-catholic/` threw **CLS 0.3492 on one of three production runs** on
2026-08-22 (median 0.0000; 0.0000 on every local run). That is either a real intermittent
defect affecting a live page, or measurement noise.

**This plan is a measurement pass first and a fix second.** It settles which, then fixes it
only if it reproduces. A confirmed negative is a successful outcome and must be recorded as
such — not softened into "probably fine".

## Context

### The observation, verbatim from `vitals.md`

Recorded when PR #175's crest fix was deployed and verified:

> `/school/charlotte-catholic/` threw 0.3492 on one of three production runs (median 0.0000;
> 0.0000 on every local run). That page has **no crest**, so it is *not* the defect fixed
> here… Whoever picks it up should **reproduce it first over many runs against the live
> site**; if it is real, the durable fix is the chip row's slack, not another image.

`vitals.md` deliberately did not chase it, per its own step-6 stop gate: one sample, and
stacking a second fix was out of bounds.

### The hypothesis, and the measurement behind it

Charlotte Catholic is the **only school whose header chip row settles at a single line**.
Measured across all eleven school pages at 1280px, content width against the row's box:

```
charlotte-catholic     8 chips    941px content   1014px box   +73px slack   1 row
davidson-day           8 chips    906px content    830px box    −76px        2 rows
every other school     9 chips   1044px content       —      −30..−214px     2 rows
```

Every other page has **negative** slack — the content overflows, so the row is
unambiguously two lines and cannot flip. Charlotte Catholic sits alone with 73px to spare,
which is what makes it the one page where variable real-network timing could flip the row
count and shift everything below it.

**This is a hypothesis supported by a structural measurement, not a confirmed cause.** The
0.3492 sample was never traced to the chip row.

### Why local runs cannot settle it

`scripts/check_vitals.mjs` serves **only the local `dist/`** — it spins up a static server
over `DIST` and has no `--origin`/`--base` flag. Confirmed by reading the script.

That matters because the spike appeared **only in production** and never locally. The
suspected trigger is *variable real-network timing*, which a localhost server with
`cache-control: no-store` and near-zero latency does not reproduce. **Measuring `dist/`
again, however many runs, cannot answer this question.**

So step 2 needs the harness to be able to point at a URL. That is a small, generally useful
change — the same capability would let any future pass check a deploy against the live site
rather than a build artifact.

### The related fix that would NOT have caught this

`vitals.md` notes it explicitly: the `min-height` fix originally planned for Davidson Day
would have **reserved two lines for a row that legitimately wants one here**, shipping a
visible ~39px blank band on Charlotte Catholic. If this reproduces, the durable fix is the
chip row's slack — not a reserved height, and not another image.

## Decisions

- **Reproduce before fixing.** The plan's first four steps are measurement. A negative
  result closes the plan.
- **Add `--origin` to `check_vitals.mjs`** rather than writing a throwaway probe — the
  capability is reusable, and this repo has a recorded lesson about discarded probe scripts
  leaving numbers nobody can reproduce (it is why `check_vitals.mjs` exists at all).
- **Many runs, not three.** One spike in three runs is exactly the sample size that cannot
  distinguish a 1-in-3 defect from a 1-in-50 fluke.
- **Single-phase — adds no user-facing text.**
- **Do not add `check:vitals` to `npm run build`.** Its docstring gives the reason.

## Approvals needed

**None** — no new card, section, stat tile, Compare row, metric key or topic. If step 5
triggers, the fix targets header layout only and must leave the settled page identical.

## Out of scope

- **Davidson Day's crest fix.** Shipped in PR #175; do not revisit `.dossier-crest`.
- **The `min-height` approach.** Explicitly rejected above — it would ship a visible gap on
  this very page.
- **The mobile-LCP outliers and the bundle.** Separate items in `vitals.md`'s follow-ups.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Single-phase — adds no user-facing text.**

1. **Teach the harness to measure a live origin.** Add an `--origin <url>` flag to
   `scripts/check_vitals.mjs` that skips the local static server and points the browser at
   the given base URL instead. Keep the default (local `dist/`) unchanged so every existing
   invocation behaves identically. Note in the script's docstring that live measurement
   includes real network variance, which is the point.

2. **Baseline the live page.** Run `npm run check:vitals -- --origin https://charlotteschoolinsights.com
   --route /school/charlotte-catholic/ --runs 20` (desktop), then again with `--mobile`.
   **Report the full distribution, not just the median** — a 1-in-20 spike is invisible in a
   median and is precisely what is being hunted.

3. **Baseline a control page** the same way — `/school/davidson-day/` (negative slack, fixed
   in #175) and `/school/cannon/`. If spikes appear on the controls too, the effect is not
   Charlotte Catholic-specific and the hypothesis is wrong; **stop and re-plan.**

4. **Decide.** If no run exceeds 0.1 across 20 desktop + 20 mobile runs on the target while
   controls are clean, the 0.3492 was noise: **record the negative finding in `vitals.md`,
   update the observation to say so, and stop.** That is a complete, successful outcome.

5. **Only if it reproduces: trace it before fixing.** Capture the `layout-shift` entries
   with their source nodes and a height timeline for `.school-header-topics`, exactly as the
   Davidson Day investigation did. Confirm the chip row is the shifting element and that the
   row count flips 1↔2. **Do not fix on the strength of the structural hypothesis alone** —
   `vitals.md` records a case where a reproducible font-blocking result was real but
   attached to the wrong mechanism.

6. **Only then: widen the slack.** The durable fix is to stop the row sitting on the wrap
   boundary — e.g. tightening `.school-header-topics` gap/padding, or letting the row use
   the full header width. Whatever is chosen must keep the settled page visually identical
   on **all eleven** school pages, since the rule is shared.

7. **Re-measure**, live and local, target and controls, and record before/after.

8. **Update `vitals.md`'s post-deploy observation** with the outcome either way, and add
   implementation notes here.

## Files touched

| File | Change |
|---|---|
| `scripts/check_vitals.mjs` | edit — add `--origin <url>` |
| `src/index.css` | possible edit — only if step 5 confirms the chip row |
| `.claude/plans/vitals.md` | edit — resolve the post-deploy observation |
| `.claude/plans/ccwrap.md` | edit — implementation notes |

## Verification

- [ ] `--origin` works and the default local behaviour is unchanged (run one existing
      invocation and confirm identical output shape)
- [ ] **20+ runs each**, desktop and mobile, on the target and at least two controls
- [ ] **Full distribution reported**, not just medians — max, and the count over 0.1
- [ ] A clear verdict recorded: reproduced, or not reproduced
- [ ] If not reproduced: `vitals.md`'s observation updated to say so, and this plan closed
- [ ] If reproduced and fixed: `npm run check:vitals -- --both --runs 3` shows no route
      regressing, and a browser check confirms all eleven school headers look identical at
      rest
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` — all clean
- [ ] `git status` clean of probe scripts

## Risks

| Risk | Mitigation |
|---|---|
| **20 runs still cannot settle a rare intermittent.** If the true rate is 1-in-50, 20 clean runs is weak evidence of absence. | Report the observed rate and the sample size together, and say plainly what the run count can and cannot rule out. Do not write "not reproducible" when the honest statement is "0 of 40 runs". |
| **Measuring live means measuring whatever is deployed**, which may not match `main`. | Check the deployed commit before measuring (`gh api …/pages/builds`), and state which build the numbers describe. |
| **Fixing on the structural hypothesis without tracing it** repeats the font-blocking misattribution recorded in `vitals.md`. | Step 5 is an explicit gate: trace, then fix. |
| **A slack fix regresses another school**, since `.school-header-topics` is shared by all eleven. | Step 6 requires the settled page identical on all eleven; step 7 re-measures controls. |

## Open questions

- **What is an acceptable spike rate if it does reproduce at, say, 1 in 20?** CLS is
  reported by CrUX as a distribution across real sessions, so a rare spike may or may not
  move the field score. — **default:** if it reproduces at all, trace it (step 5); decide on
  fixing once the mechanism is known and the rate is measured.
- **Should `--origin` runs become a routine post-deploy check?** — **default:** out of scope;
  note it as a follow-up if the flag proves useful.


## Implementation notes

**Outcome: REPRODUCED, traced, and fixed.** The plan was written as a measurement pass that
would probably close as a negative. It closed the other way — and three of its premises were
wrong in ways worth recording, because each would have misdirected the fix.

### 1. It was never intermittent

The plan is built around "a 1-in-3 spike vs. noise", and sizes its sample (20 runs) to tell
those apart. Neither was the case. Against the deployed site:

| Route | Runs | Median | Max | >0.1 |
|---|---|---|---|---|
| `/school/charlotte-catholic/` desktop | 20 | 0.3494 | 0.3585 | **19/20** |
| `/school/charlotte-catholic/` mobile | 20 | 0.0229 | 0.0229 | 0/20 |
| `/school/davidson-day/` (control) | 20 | 0.0016 | 0.0020 | 0/20 |
| `/school/cannon/` (control) | 20 | 0.0018 | 0.0019 | 0/20 |

**19 of 20 POOR.** The clean 0.0000 is the outlier, not the spike — the original three-run
sample simply drew the rare clean run twice. The recorded `0.3492` is the *normal* value, and
it also reproduced locally at 5/5 (min 0.3488) once actually measured, contradicting the
plan's "0.0000 on every local run". So `--origin` was **not** required to see the defect,
though it was required to establish the rate and to confirm production matched.

Worth generalising: **a defect reported as "1 in 3" deserves a re-measure before it is
modelled as a race.** The failure mode here was a three-run sample, not a rare event.

### 2. The trigger is the webfont swap, not network timing

Controlled experiment, with the block verified to have taken effect rather than assumed:

| Condition | CLS | chip row height | fonts loaded |
|---|---|---|---|
| normal | 0.3494 | 32px | Barlow, Barlow Condensed |
| `fonts.googleapis.com`/`gstatic.com` blocked | **0.0002** | 71px | Barlow Condensed Fallback |

Chips are `white-space: nowrap`, so each is exactly as wide as its string; Barlow renders
them ~7% narrower than the Arial-ish fallback (measured on the eight real labels at 13px/600:
per-string 0.9058–0.9357, aggregate 0.9153). The trace showed one shift at t=287ms worth
0.3490 of the 0.3494 total, with `.school-header-topics` going 71px → 32px, the header
238px → 198px, and `.dossier-layout` moving up exactly 39px.

That this is desktop-only is corroborating evidence: at 390px the row wraps regardless, so
there is no boundary to cross, and mobile measured 0/20.

### 3. The recorded slack figure was backwards, and that is the whole defect

`vitals.md` describes "941px content in a 1014px box — only 73px of slack". That is the
**settled** state. The wrap decision is made in the **fallback** state, where the same chips
measure **1016px against the 1014px box — over by 2px.** The row therefore laid out as two
lines and collapsed to one when Barlow arrived. The page was not sitting on the boundary with
73px to spare; it was 2px on the wrong side of it.

### The fix, and the one that was rejected after measuring

Shipped: `.school-header-topics` gap **8px → 6px**. With 8 chips that removes 12px from both
states, so the fallback (1016 → 1004px) fits the same single row the settled layout uses and
the count can no longer flip. It scales both states equally, which is why it is safe for the
other ten schools — they carry 9 chips at ~1110/1028px against an 830 or 1014px box and are
unambiguously two rows either way. 7px also cleared it, but by only 5px; 6px leaves 12px of
headroom on a rule shared by eleven pages and nine locales, where a longer translated label
could otherwise reopen it.

**Rejected after measuring — a `size-adjust: 91.5%` metric-override fallback for the body
face.** It is the more principled fix (it removes the swap resize at source) and it did cure
this page, 0.3635 → 0.0016. But it **regressed four other schools from 0.0022 to ~0.39** —
carmel-christian, covenant-day, gaston-day, hickory-grove-christian — by shrinking their
fallback row from 1044px to 993px and dropping it below their 1014px box, putting *them* on
the boundary. Reverted. Recorded here so it is not re-attempted: **on this layout, any global
font-width change moves the boundary for someone.** The plan's own step-6 instinct — widen the
slack — was right.

`min-height` was rejected without needing measurement, per the plan: it reserves two lines for
a row that legitimately wants one here.

### Verification

- `--origin <url>` added to `scripts/check_vitals.mjs`; default local `dist/` behaviour
  unchanged, non-http origin exits 2, trailing slash normalised.
- Per-run **CLS distribution** (min/med/max/count over 0.1/raw values) now printed for
  `--runs > 1`, since a median hides exactly the thing being hunted.
- Full desktop sweep after the fix: **every school page GOOD, 0/3 over threshold.**
  Charlotte Catholic 0.3635 → **0.0022**. `/compare/` unchanged at 0.1263 (the pre-existing
  accepted residual from `compare-cls.md`).
- Settled geometry diffed before/after across **all eleven** school pages: identical row
  counts, chip counts and 1-row/2-row states; only the expected 2px inter-row gap changed
  (71 → 69px on 2-row pages; Charlotte Catholic unchanged at 32px).
- Browser-verified in real headed Chrome at 1280×900 — Charlotte Catholic's single row has no
  blank band, and the 2-row headers do not read as cramped.
- `npx tsc --noEmit` clean; `npm run lint` clean apart from a pre-existing unrelated warning
  in `check_fa_script.mjs`; `npm run build` clean.

### Follow-up left open, deliberately

The plan's open question — whether `--origin` runs should become a routine post-deploy check
— stays out of scope, but the flag proved its worth on first use: it is what established the
19/20 rate. Note also that `--origin` measures **whatever is deployed**; these live numbers
describe Pages build `0d96d408`, which predates PRs #200–#203 (translation-only, no layout
effect).