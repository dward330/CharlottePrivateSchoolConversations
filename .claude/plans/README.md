# Plans

Implementation plans, one markdown file per feature or change, plus
[`INDEX.md`](INDEX.md) tracking which have shipped.

## The two commands

**`/plan`** researches a feature and writes `<name>.md` here. It plans only — it never
edits app code. It asks what to plan and whether you want a single-word name (falling back
to the branch name), reads the codebase, then writes a document a fresh Claude window can
execute cold.

**`/implement`** takes it from there. Given `/implement <name>` it reads that plan; given
nothing it lists the unimplemented ones and asks. It branches, builds the steps, runs the
plan's verification, opens a PR, and flips the row in `INDEX.md` to `Implemented` with the
PR link.

The split exists so planning and building happen in separate context windows. That is also
the standard the plan is written to: **everything needed to build the feature is in the
document**, because the implementing window has no memory of the planning conversation.

## Conventions

- **Filename** = the plan's `name` slug = the `/implement` argument. `lowercase-with-hyphens`.
- **Front matter** carries `status` (`not-implemented` | `in-progress` | `implemented` |
  `abandoned`), `created`, `branch`, and `prs`. `INDEX.md` mirrors it; both get updated.
- **Plans are kept after implementation.** An implemented plan is the record of what
  shipped and why — including an `## Implementation notes` section when the build deviated
  from the plan. Don't delete them; mark them `abandoned` if they're dropped.

The template and the section semantics live in
[`.claude/skills/plan/plan-template.md`](../skills/plan/plan-template.md).
