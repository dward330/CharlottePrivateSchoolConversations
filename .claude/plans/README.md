# Plans

Implementation plans, one markdown file per feature or change, plus
[`INDEX.md`](INDEX.md) tracking which have shipped.

## The two commands

**`/plan`** researches a feature and writes `<name>.md` here. It plans only — it never
edits app code. It asks what to plan and whether you want to give it a single-word name —
that name becomes the filename and the `/implement` argument, and declining is a normal
choice, in which case the current branch name is used. It then reads the codebase and
writes a document a fresh Claude window can execute cold, closing with the exact
`/implement <name>` command to run.

**`/implement`** takes it from there. Given `/implement <name>` it reads that plan; given
nothing it lists the unimplemented ones and asks. It branches, builds the steps, runs the
plan's verification, opens a PR, and flips the row in `INDEX.md` to `Implemented` with the
PR link.

The split exists so planning and building happen in separate context windows. That is also
the standard the plan is written to: **everything needed to build the feature is in the
document**, because the implementing window has no memory of the planning conversation.

## English first, then every other locale

**Any plan that touches user-facing text is built in two phases**, and the plan document
says so explicitly:

1. **Phase 1 — English.** The whole feature, working and reviewable, in one language.
   `/implement` commits it to the branch and **stops**.
2. **Phase 2 — every other locale.** Only after you've looked at the English version and
   confirmed the wording.

Both phases land in a single PR, so the branch stays open across your review. Between them
the plan sits at status `English shipped`.

This is standing behaviour — you never have to ask for it, and a plan should never have to
restate it. The reason is that wording changes once you see it rendered, and a change
propagated to eight locales before that review multiplies every revision by eight.

Plans that add no user-facing text — refactors, build config, data corrections re-using
existing strings — are single-phase, and say so.

## Conventions

- **Filename** = the plan's `name` slug = the `/implement` argument. `lowercase-with-hyphens`.
- **Front matter** carries `status` (`not-implemented` | `in-progress` | `english-done` |
  `implemented` | `abandoned`), `phases` (1 or 2), `created`, `branch`, and `prs`.
  `INDEX.md` mirrors it; both get updated.
- **Plans are kept after implementation.** An implemented plan is the record of what
  shipped and why — including an `## Implementation notes` section when the build deviated
  from the plan. Don't delete them; mark them `abandoned` if they're dropped.

The template and the section semantics live in
[`.claude/skills/plan/plan-template.md`](../skills/plan/plan-template.md).
