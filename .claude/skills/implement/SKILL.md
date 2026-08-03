---
name: implement
description: >
  Execute an implementation plan written by /plan — read .claude/plans/<name>.md, build it
  step by step, verify, open a PR, and update .claude/plans/INDEX.md with the result. Use
  when the user types /implement, or asks to "implement the plan", "build the <name>
  plan", "ship that plan". If no plan name is given, list the unimplemented plans from the
  index and ask which one.
---

# /implement — execute a documented plan

Takes a plan document from `.claude/plans/` and builds it. The plan is the spec; this
skill's job is to execute it faithfully, verify it honestly, and leave the index telling
the truth about what shipped.

## Steps

### 1. Pick the plan

If the user named one (`/implement <name>`), resolve `.claude/plans/<name>.md`. On a miss,
try a case-insensitive and partial match before giving up.

If they didn't, read `.claude/plans/INDEX.md` and show the plans whose status is **Not
implemented**, **In progress**, or **English shipped** — name, title, created date, status
— and ask which. Call out the *English shipped* ones as awaiting their review before
translation; those are the closest to done and the easiest to forget. If the index is
missing or stale, fall back to listing `.claude/plans/*.md` and reading each front matter
`status`. If nothing is outstanding, say so and stop; don't invent work.

Read the plan in full before touching anything, including any file it references. A plan
skimmed is a plan re-derived.

**If the plan is already `english-done`,** the English phase is built and reviewed-pending.
Confirm the user is happy with the English before doing anything else, then resume at
step 7 — don't rebuild Phase 1.

### 2. Gate before building

Three checks, in order:

- **Approvals** — if the plan's *Approvals needed* section is non-empty and the user
  hasn't given that approval in this conversation, stop and ask. The UX-design gate in
  `CLAUDE.md` is the common case and it is a hard gate, not a formality.
- **Open questions** — apply each stated default and tell the user which defaults you're
  proceeding under. Only block if a question has no default and proceeding either way
  would be unsafe or make the work useless if wrong.
- **Staleness** — the plan was written against a snapshot. Spot-check that the files in
  *Files touched* still look the way *Context* describes. If the code has moved under the
  plan, say what drifted and how you're adapting, then continue — a stale detail is a
  correction to make, not a reason to stop.
- **Staged research** — `/plan` may have left fetched data in `source-material/**/*.md`,
  uncommitted. If it's there, commit it on the branch and ingest it as your first build
  step.

### 3. Branch

Per `CLAUDE.md`: branch and PR, never a direct commit to `main`. Use the plan's `branch`
field; if it's absent or taken, derive one from the plan name. If the current branch is
already the plan's branch with work in progress, continue on it.

Set the plan's status to `in-progress` in its front matter and in the index. This is the
one thing worth doing before the work, not after — it's what makes an interrupted run
recoverable.

### 4. Build Phase 1 — English only

Work the steps in order, keeping a todo list so progress is visible. Match the
surrounding code's conventions rather than importing new ones.

**Build the English version only.** Any plan that touches user-facing text ships in two
phases with the user's review in between — this holds whether or not the plan document
says so. If you're handed a text-touching plan written as a single phase, treat its
locale work as Phase 2 and say you're doing that.

**Finish the whole phase.** If a step turns out to be blocked or wrong, complete every
other step in full, then say plainly which step you left out and why. Scaling the work
down is the user's call.

**The plan is the scope.** A better idea that arrives mid-build goes in the report as a
suggestion, not into the diff. If a step is genuinely wrong — it contradicts the codebase
or would break something — say so in a sentence, implement the correct thing, and record
the deviation for step 8. Don't silently follow a plan you know to be broken, and don't
silently rewrite it either.

Standing rules apply to everything you write here, whether or not the plan restates them:
new user-facing strings are **keys in `src/locales/en.json`, never hardcoded JSX** — the
key goes in now, the other catalogs come in Phase 2; figures are copied char-for-char,
never re-typed.

**If the build downloads or fetches new school data, persist it to
`source-material/<topic>/<school>/*.md` and run the `ingest-source-material` skill** —
even when the plan doesn't mention it. The skill owns how ingestion works; just don't let
fetched data reach the app without going through it.

### 5. Verify Phase 1

Run every check in the plan's *Verification* section for this phase, plus the repo
baseline (`npx tsc --noEmit`, `npm run build`, and any `check:*` script covering the
touched area).

Report results faithfully. If a check fails, show the output and fix it — a failing check
reported as a pass is worse than no check. If the change touches rendering, the plan
should have asked for a browser check; this repo's record is that render-layer defects
survive every automated check, so do it rather than reasoning that it's fine.

### 6. STOP — hand the English version back for review

**Single-phase plan?** Skip to step 8 (commit and PR) — there is no Phase 2 and no gate.

**Two-phase plan: commit Phase 1 to the branch, then end the turn.** Do not open the PR
and do not start translating. Both phases land in one PR, so the branch stays open across
the review.

Set the plan's front matter to `status: english-done` and the index row to
`English shipped`, so an interrupted run is recoverable and the index never claims a
half-translated feature is done.

Then report, and make the ask concrete:

> **Phase 1 complete — English only.**
>
> <what changed, and where to look at it — the page, the route, the command to run>
>
> Verification: <results>
>
> Nothing is translated yet. Once you're happy with the English wording, say the word and
> I'll roll it out to the other <N> locales — in this window or a new one.

Tell them **what to look at**, not just what you did. The point of the gate is that they
see it rendered; a report they can only nod at wastes the round trip.

**Then end the turn.** Do not proceed on an assumption that they'd approve, and do not
ask a yes/no question and answer it yourself. The wording is what's being reviewed, and
propagating it to every locale before that review multiplies each revision by <N>.

### 7. Phase 2 — every other locale, after they confirm

Only on the user's explicit go-ahead. If they asked for wording changes, make those in
English first and re-confirm before translating.

Work the plan's Phase 2 steps. Get the layer right — UI chrome means the
`src/locales/*.json` catalogs listed in `TRANSLATED`; research prose means the overlay
layer per `PROSE_TRANSLATED`. Follow the rollout docs in `.claude/docs/` for the
mechanism, and respect the locale-specific traps they record: figures copied
char-for-char, lakh/crore grouping for `hi`/`te`, RTL isolates for `fa`.

Then run the Phase 2 checks — `npm run check:runtime` at minimum, plus whichever of
`check:figures` / `check:sepdrift` / `check:money` / `check:currency` apply. A locale
overlay that fails its stamp falls back to English **silently**, so a passing coverage
number proves nothing on its own.

### 8. Commit and PR

Commit with a message describing the change (not "implement plan X"), referencing the plan
document. Push and open a PR with `gh pr create`, whose body summarizes what shipped,
links the plan, and lists the verification results.

Standing permission covers squash-merging and deleting the branch on your own PRs, then
checking out `main` and pulling. **Never deploy** — `npm run deploy` is the user's call,
in the moment, every time.

### 9. Close the loop

Update both records:

- **The plan document** — front matter `status: implemented` and `prs: [123]`. If the
  build deviated from the plan, add a short `## Implementation notes` section at the
  bottom saying what changed and why. The plan is the historical record of what was
  actually done, not what was intended.
- **`.claude/plans/INDEX.md`** — status `Implemented`, PR cell holding the link.

If the work was partial, use `In progress` in both places and list the remaining steps in
the implementation notes so a later window can resume. `Implemented` on a two-phase plan
means **both** phases shipped; a feature sitting in English is `English shipped`.

Then report to the user: what shipped, verification results, the PR link, anything left
out and why, and any suggestion you deliberately kept out of the diff.
