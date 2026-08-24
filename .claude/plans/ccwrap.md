---
name: ccwrap
title: Reproduce the Charlotte Catholic CLS spike against the live site, and fix it only if it is real
status: not-implemented
phases: 1
created: 2026-08-24
branch: perf/cc-wrap
prs: []
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
