# Plan document template

Copy this structure into `.claude/plans/<name>.md`. Drop sections that genuinely don't
apply (a three-file change needs no risks table); never drop **Goal**, **Steps**, or
**Verification**.

The reader is a fresh Claude window with **no memory of the planning conversation**.
Anything established in that conversation but not written here is lost.

---

```markdown
---
name: <slug>
title: <one-line human title>
status: not-implemented        # not-implemented | in-progress | implemented | abandoned
created: <YYYY-MM-DD>
branch: <suggested branch name, e.g. feat/plan-implement-commands>
prs: []                        # filled in by /implement
---

# <Title>

## Goal

Two or three sentences: what changes, for whom, and how we'll know it worked. Written so
someone who has never seen this feature understands the point.

## Context

What exists today, with real file references. The result of the research pass — the
current shape of the code, the nearest analogous feature and why we're following (or not
following) its pattern, and any constraint the implementer would otherwise trip over.

## Decisions

Judgment calls made during planning, so `/implement` doesn't re-litigate them. One line
each, with the reason.

- <decision> — <why>

## Approvals needed

Anything requiring the user's explicit OK before implementation starts — a new card or
section under the UX-design gate, a new metric key, a dependency, a deploy. Write
**"None"** if there are none; an empty section reads as an oversight.

## Out of scope

What this plan deliberately does not do. Prevents scope creep in the implementing window.

## Steps

Numbered, ordered, each independently checkable. Name real files. Describe the actual
edit, not the intent.

1. **<Short step title>** — <what to do, in which file(s)>.
2. …

## Files touched

| File | Change |
|---|---|
| `path/to/file.ts` | <new / edit — one-line description> |

## Verification

The commands to run, in order, with what a pass looks like. Include manual checks no
script covers — for anything touching rendering, a browser check.

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds
- [ ] <manual check>

## Risks

| Risk | Mitigation |
|---|---|
| <what could go wrong> | <what to do about it> |

## Open questions

Anything unresolved at planning time. Each needs an owner and a default — what
`/implement` should do if no answer arrives.

- <question> — **default:** <what to do absent an answer>
```

---

## INDEX.md header

If `.claude/plans/INDEX.md` doesn't exist, create it with this header, then append rows.

```markdown
# Plan index

Every plan document in `.claude/plans/`, and whether it has shipped.

Written by `/plan` (adds the row) and `/implement` (flips status and fills the PR).
Newest last.

| Plan | Title | Created | Status | PR(s) |
|---|---|---|---|---|
```

Status values: `Not implemented`, `In progress`, `Implemented`, `Abandoned`.
The Plan cell links the document: `[<name>](<name>.md)`. The PR cell holds `#123` links,
comma-separated, or an em-dash while unimplemented.
