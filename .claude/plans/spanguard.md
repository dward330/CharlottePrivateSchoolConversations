---
name: spanguard
title: Clear the bucket-hbcu false positive and stop check:spans going stale every time a school is added
status: implemented
phases: 1
created: 2026-08-21
branch: fix/span-guard
prs: [173]
---

# The bucket-hbcu false positive, and the staleness that caused it

## Goal

`npm run check:spans` reports `✗ bucket-hbcu: tints hickory-grove-christian — expected
charlotte-country-day`. **The app is right and the checker is wrong** — Hickory Grove has
20 HBCUs to Country Day's 18, so the tint it renders is correct.

Fix that false positive, and fix the *reason* it happened: `EXPECTED` is a hand-maintained
table of winners that nobody updates when a school is added, so it goes stale silently and
reports a correct page as broken.

Done when `check:spans` no longer reports `bucket-hbcu`, and adding a 12th school that
legitimately takes a leader position does **not** produce a false failure — while a real
mis-tint still does.

**Single-phase — adds no user-facing text.** This touches one script and no `src/`
rendering, data or locale file.

## Context

### What is actually wrong, measured 2026-08-21 on `main` at `6564911`

`scripts/check_span_metrics.mjs` guards the eleven `compareAs` rows in
`src/data/metricValues.ts`. It checks two things (docstring, `:12-20`): a value the row's
parser **rejects**, and a ranking that **disagrees with `EXPECTED`**.

`EXPECTED` (`:32-45`) is a hardcoded map of `row key → winning slug(s)`, commented *"The
leader each row should tint, confirmed by reading the values."*

`bucket-hbcu` is a `compareAs: 'fraction'` row (`metricValues.ts:530-549`). The ranking
the checker itself prints:

```
★ hickory-grove-christian  20 / 107  -> 0.187
  charlotte-country-day    18 / 107  -> 0.168
  providence-day           14 / 107  -> 0.131
```

**Hickory Grove genuinely has more.** The parse is correct, the sort is correct, the app
tints the right school. The only wrong thing in the system is the string
`'bucket-hbcu': ['charlotte-country-day']` in the checker.

### How it went stale — the mechanism that will repeat

Traced through git:

| Commit | What happened |
|---|---|
| `23636a0` (PR #127) | `EXPECTED` written, incl. `'bucket-hbcu': ['charlotte-country-day']` — **correct at the time** |
| `b6d3e47` (PR #143) | Hickory Grove added as the 9th school with `'20 / 107'` — overtakes Country Day |

Sixteen commits apart. Nothing connected the two, so the checker has been red since PR #143
and stayed red through five subsequent merges.

**This is the third instance of a failure mode `CLAUDE.md` already records twice**
(`check:sepdrift`; `check:live` at 4,646): *a checker parked at a non-zero number stops
being read.* It is very likely why the two genuine `gaston-day` parse failures in the same
output have also gone unaddressed — they are printed beneath a finding everyone has learned
to scroll past.

### Why "just derive the leader" is the wrong fix, and the docstring says so

The obvious fix — compute the winner instead of hardcoding it — would make the check
**vacuous for its second failure mode**. The docstring is explicit (`:17-20`):

> A ranking that disagrees with `EXPECTED` below. Those are the winners a human confirmed
> by reading the values; if a data edit moves one, that should be a **deliberate update
> here** rather than a silent change on the page.

That is a real design intent: `EXPECTED` is a tripwire for *"a data edit silently moved the
tint."* Deriving the leader from the same data it is meant to check makes it agree with
itself unconditionally — the identical trap the same file already documents at `:46-48`
about not importing the app's parser.

So the fix must keep a human-confirmed assertion while removing the part that rots.

### The margins, measured — which entries are actually fragile

Leader vs runner-up across all eleven rows, computed from the checker's own output:

| Row | Leader | Margin over runner-up |
|---|---|---|
| `us-organizations` | providence-day | **1.3%** (77 vs 76) |
| `summer-ages` | charlotte-latin | **3.6%** (14.5 vs 14) |
| `bucket-lac75` | providence-day | 4.8% |
| `bucket-nu75` | providence-day | 5.5% |
| `bucket-p4` | providence-day | 7.6% |
| `summer-care-span` | providence-day | 10.0% |
| `bucket-hbcu` | hickory-grove-christian | 11.3% |
| `bucket-ivy` | providence-day | 14.3% |
| `bucket-ivyplus` | providence-day | 30.7% |
| `advanced-courses` | charlotte-country-day | 46.4% |
| `program-span` | davidson-day | 50.0% |

**`us-organizations` is one point from flipping** — Charlotte Catholic at 76 against
Providence Day's 77. `summer-ages` is half an age-year. Two more rows are within 5%. So
this is not a one-off: the next school added has several live chances to flip a leader and
produce exactly this false failure again.

Note `bucket-ivy` and `bucket-ivyplus` are at ceiling (`8 / 8`, `17 / 17`) — those cannot
be overtaken, only tied.

### The current failure output, for reference

`node scripts/check_span_metrics.mjs` exits **1** with three findings:

```
✗ bucket-hbcu: tints hickory-grove-christian — expected charlotte-country-day
✗ program-span / gaston-day: "PS–12" does not parse as range-start
✗ summer-ages / gaston-day: "rising PK–12" does not parse as range-width
```

Only the first is this plan's business. The two `gaston-day` findings are **genuine
defects** — `agePointOf` (`:80-89`) has no case for `PS` or `PK`, so both values drop out
of their ranking silently, the same class of defect PR #172 just fixed for Carmel. They are
out of scope here (see below) and stay red after this plan.

## Decisions

- **Correct the entry to `hickory-grove-christian` rather than deleting the row** — the
  tint is genuinely correct and worth asserting; the bug is the stale value, not the idea.
- **Keep `EXPECTED` as a human-confirmed assertion, do not auto-derive** — deriving it from
  the data it checks removes the second failure mode entirely, against the file's stated
  design intent.
- **Harden by asserting the *value*, not the slug** — record what the leader must beat
  rather than who the leader is, so a new school that legitimately wins is not a failure
  but a new school that wins *on a wrong number* still is. Detail in step 3.
- **Do not touch the two `gaston-day` values** — a real fix there changes `agePointOf` in
  **both** parser copies (`scripts/check_span_metrics.mjs:80` and
  `src/pages/Compare.tsx:116`), moves a live tint, and needs its own verification. Mixing
  it in would hide a rendering change inside a checker cleanup.
- **Do not add `check:spans` to the build chain in this plan** — it cannot go green until
  the `gaston-day` work lands. Chaining it is the natural closing step of *that* plan.

## Approvals needed

**None.** This plan edits one script under `scripts/`. It changes no card, section, stat
tile, Compare row, metric key or topic, so the UX-design gate does not apply. It adds no
user-facing string, so there is no locale phase.

Note the *page* does not change at all: the app already tints Hickory Grove. This makes the
checker agree with what already ships.

## Out of scope

- **The two `gaston-day` parse failures** (`program-span` `'PS–12'`, `summer-ages`
  `'rising PK–12'`). Genuine defects, separate plan — they touch the app parser and move a
  live tint.
- **Adding `check:spans` to `npm run build`.** Blocked on the above.
- **Re-verifying the HBCU counts themselves.** `20 / 107` and `18 / 107` are taken as
  correct; this plan asserts the ranking, not the research.
- Any change to `src/pages/Compare.tsx` or `src/data/metricValues.ts`.

## Steps

Single-phase — adds no user-facing text.

1. **Reproduce the false positive.** Run `node scripts/check_span_metrics.mjs` and confirm
   it exits 1 naming `bucket-hbcu`, with Hickory Grove printed at `20 / 107 -> 0.187` above
   Country Day's `18 / 107 -> 0.168`. Confirm from the printed table that the checker's own
   ranking already agrees the tint is right — that is what makes this a checker bug.

2. **Correct the stale entry.** In `scripts/check_span_metrics.mjs:44`, change
   `'bucket-hbcu': ['charlotte-country-day']` to `['hickory-grove-christian']`. Add a
   short comment recording that Hickory Grove overtook Country Day in PR #143, so the next
   reader sees this entry has a history.

3. **Harden `EXPECTED` so it stops rotting.** Change each entry from a bare slug list into
   `{ slugs, min }` — the confirmed winner(s) **and** the ranked value that winner scored
   when confirmed. Then:

   - If the computed winner is in `slugs` **and** its value is `>= min`, pass silently, as
     today.
   - If the winner is **not** in `slugs` but its value is `>= min`, this is a **new leader
     on a plausible number** — the added-a-school case. Print a clearly-labelled notice
     naming the old and new leader and telling the maintainer to update the entry, and
     **exit 0**. This is the case that is a false failure today.
   - If the winner's value is **`< min`**, a leader got *worse* — that is a data
     regression, not a new school. **Exit 1.**
   - A missing `EXPECTED` entry stays **exit 1**, unchanged (`:180-183`).

   The two-exit-path split is the same technique `check_chrome_keys.mjs` uses (recorded in
   `CLAUDE.md`) to let a legitimate in-progress state ship green without the gate going
   quiet. Keep the existing ranked-table printout in all cases.

4. **Populate `min` from measured values, not by hand-typing.** Use the numbers the checker
   already prints, floored slightly so ordinary re-measurement does not trip them. From the
   current run: `bucket-hbcu` 0.187, `bucket-ivy` 1.0, `bucket-ivyplus` 1.0, `bucket-nu75`
   0.773, `bucket-lac75` 0.573, `bucket-p4` 0.838, `advanced-courses` 41,
   `us-organizations` 77, `summer-ages` 14.5, `summer-care-span` 660, `program-span` -2.
   **`program-span` is negative** (`range-start` returns `-start` so earliest wins) — the
   `>=` comparison still reads correctly, but do not "fix" the sign.

5. **Update the docstring** (`:12-20`) to describe both exit paths, and state plainly why
   `EXPECTED` is not auto-derived — a future reader will otherwise try the same
   simplification this plan rejected. Cite the self-agreement trap the file already
   documents at `:46-48`.

6. **Confirm the two `gaston-day` findings still report and still exit 1.** They are out of
   scope but must not be masked by the new logic — they fail on the *parse* path, which
   step 3 does not touch.

## Files touched

| File | Change |
|---|---|
| `scripts/check_span_metrics.mjs` | edit — correct `bucket-hbcu`; `EXPECTED` entries gain `min`; new-leader notice on its own exit path; docstring |

No `src/` file changes. No locale file changes.

## Verification

Single-phase.

- [ ] `node scripts/check_span_metrics.mjs` — **`bucket-hbcu` no longer reported**; the
      printed table still shows Hickory Grove ★ at 0.187
- [ ] Exit code is still **1**, and for the right reason — the only remaining findings are
      the two out-of-scope `gaston-day` parse failures. Confirm with
      `node scripts/check_span_metrics.mjs; echo $?`. **Do not use `npm run check:spans |
      tail`** — the pipe reports `tail`'s exit code, not the checker's, which is how this
      check was misread once already
- [ ] **Negative A — new leader on a plausible number.** Temporarily raise a school's
      `bucket-hbcu` value in `src/data/metricValues.ts` above Hickory Grove's. Expect the
      new-leader **notice** naming old and new leader, and **exit 0** on that row. Restore
- [ ] **Negative B — leader regression.** Temporarily lower Hickory Grove's `bucket-hbcu`
      below `min` so the top value drops. Expect **exit 1**. Restore. This is the assertion
      that must survive the hardening — without it step 3 has made the check vacuous
- [ ] **Negative C — a real mis-tint is still caught.** Confirm the check still fails when
      a winner's value falls under `min`, i.e. that Negative B's failure is genuinely
      driven by the `min` comparison and not by an unrelated path
- [ ] **Negative D — missing entry.** Temporarily delete one `EXPECTED` entry; expect
      **exit 1** with the existing "no EXPECTED entry" message. Restore
- [ ] `git status --porcelain` — **empty** after every negative test
- [ ] `npm run build` — succeeds (`check:spans` is not in the chain; this confirms nothing
      else regressed)
- [ ] **No browser check needed** — the page is unchanged by construction. Optionally
      confirm once that Compare's HBCU row tints Hickory Grove, establishing the checker now
      agrees with what already ships

## Risks

| Risk | Mitigation |
|---|---|
| Hardening makes the check vacuous — it passes on anything | Negatives B and C exist for exactly this; B must fail before the plan is done |
| The new-leader notice is ignored like the old failure was | It prints a labelled notice naming both slugs and the file to edit, rather than a bare `✗`; and it only appears on a genuine leadership change, so it is rare by construction |
| `min` values are typed wrong and silently too low | Step 4 takes them from the checker's own printed output rather than re-derivation; Negative B proves at least one is load-bearing |
| Someone later "simplifies" `EXPECTED` to auto-derive | Step 5 writes the reason into the docstring, in the file, citing the existing self-agreement precedent |

## Open questions

- **How far below the confirmed value should `min` sit?** — **default:** use the exact
  measured value. These are stable computed quantities, not measurements with noise, and an
  exact floor makes Negative B trip cleanly. Loosen only if a real re-measure proves it
  brittle.
- **Should the new-leader notice be exit 0 or a distinct exit code?** — **default:** exit
  0 with a labelled notice. A third exit code has no consumer today, and `check:spans` is
  not in the build chain.

## Implementation notes

Shipped as planned, in PR #173. Three details worth recording:

- **`min` is stored as an exact expression, not the printed decimal.** The plan's step 4
  listed the checker's rounded output (`0.187`, `0.773`, `0.573`, `0.838`). Those are
  rounded *up* from the true values, so `top >= want.min` would have failed on unchanged
  data. The entries carry `20 / 107`, `58 / 75`, `43 / 75`, `57 / 68` instead — the same
  measured quantities, taken from the same printed ranking, with no rounding between the
  value and its own floor. Integer and exact-decimal rows (`660`, `77`, `41`, `14.5`,
  `-2`, `1`) are unchanged.
- **Negative A needed isolating to observe exit 0.** With the two out-of-scope `gaston-day`
  parse failures present, the process exits 1 regardless of the notice path, since `failed`
  is global. Re-run with those two values temporarily made parseable, the new-leader case
  exits **0** and prints both the per-row notice and a summary line. Verified, then
  restored — `git status --porcelain` clean on `src/`.
- **The regression path fires on the value, not the slug.** Negative B lowered Hickory
  Grove below `min`; the leader became Country Day at 0.1682 and the check still exited 1
  with *"a leader got WORSE"*. That is the assertion the hardening had to preserve, and it
  is driven by the `min` comparison rather than by any slug mismatch.

`check:spans` still exits **1** after this plan, for the two out-of-scope `gaston-day`
parse failures only (`program-span` `'PS–12'`, `summer-ages` `'rising PK–12'`). Chaining it
into `npm run build` remains blocked on that separate plan.
