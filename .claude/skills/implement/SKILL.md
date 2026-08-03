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
implemented** or **In progress** — name, title, created date — and ask which. If the index
is missing or stale, fall back to listing `.claude/plans/*.md` and reading each front
matter `status`. If nothing is unimplemented, say so and stop; don't invent work.

Read the plan in full before touching anything, including any file it references. A plan
skimmed is a plan re-derived.

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

### 3. Branch

Per `CLAUDE.md`: branch and PR, never a direct commit to `main`. Use the plan's `branch`
field; if it's absent or taken, derive one from the plan name. If the current branch is
already the plan's branch with work in progress, continue on it.

Set the plan's status to `in-progress` in its front matter and in the index. This is the
one thing worth doing before the work, not after — it's what makes an interrupted run
recoverable.

### 4. Build it

Work the steps in order, keeping a todo list so progress is visible. Match the
surrounding code's conventions rather than importing new ones.

**Finish the whole plan.** If a step turns out to be blocked or wrong, complete every
other step in full, then say plainly which step you left out and why. Scaling the work
down is the user's call.

**The plan is the scope.** A better idea that arrives mid-build goes in the report as a
suggestion, not into the diff. If a step is genuinely wrong — it contradicts the codebase
or would break something — say so in a sentence, implement the correct thing, and record
the deviation for step 7. Don't silently follow a plan you know to be broken, and don't
silently rewrite it either.

Standing rules apply to everything you write here, whether or not the plan restates them:
new user-facing strings become keys in **every** `src/locales/*.json`; new external school
data gets persisted to `source-material/` with its sources; figures are copied
char-for-char, never re-typed.

### 5. Verify

Run every check in the plan's *Verification* section, plus the repo baseline
(`npx tsc --noEmit`, `npm run build`, and any `check:*` script covering the touched area).

Report results faithfully. If a check fails, show the output and fix it — a failing check
reported as a pass is worse than no check. If the change touches rendering, the plan
should have asked for a browser check; this repo's record is that render-layer defects
survive every automated check, so do it rather than reasoning that it's fine.

### 6. Commit and PR

Commit with a message describing the change (not "implement plan X"), referencing the plan
document. Push and open a PR with `gh pr create`, whose body summarizes what shipped,
links the plan, and lists the verification results.

Standing permission covers squash-merging and deleting the branch on your own PRs, then
checking out `main` and pulling. **Never deploy** — `npm run deploy` is the user's call,
in the moment, every time.

### 7. Close the loop

Update both records:

- **The plan document** — front matter `status: implemented` and `prs: [123]`. If the
  build deviated from the plan, add a short `## Implementation notes` section at the
  bottom saying what changed and why. The plan is the historical record of what was
  actually done, not what was intended.
- **`.claude/plans/INDEX.md`** — status `Implemented`, PR cell holding the link.

If the work was partial, use `In progress` in both places and list the remaining steps in
the implementation notes so a later window can resume.

Then report to the user: what shipped, verification results, the PR link, anything left
out and why, and any suggestion you deliberately kept out of the diff.
