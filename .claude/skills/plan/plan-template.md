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
status: not-implemented        # not-implemented | in-progress | english-done | implemented | abandoned
phases: 2                      # 2 if it touches user-facing text, else 1
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

## Source material

Only if the plan involves new research data. List the `source-material/**/*.md` files —
whether already written during planning (**staged, uningested**) or still to be fetched —
with their sources, and state that `/implement` runs the `ingest-source-material` skill
over them before any app-layer step. Omit this section entirely when no new data is
involved.

## Out of scope

What this plan deliberately does not do. Prevents scope creep in the implementing window.

## Steps

Numbered, ordered, each independently checkable. Name real files. Describe the actual
edit, not the intent.

**If this plan is single-phase**, list the steps flat and state why up front:
*"Single-phase — adds no user-facing text."* Otherwise use the two headings below.

### Phase 1 — English

Everything needed to make the change work and look right in English: components, logic,
tests, and the `en` strings. This is the whole feature, in one language.

1. **<Short step title>** — <what to do, in which file(s)>.
2. …

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing
below runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Only after that confirmation. List the actual scope — the `src/locales/*.json` files for
UI chrome (per `TRANSLATED` in `src/lib/i18n.ts`), or the overlay layer for research prose
(per `PROSE_TRANSLATED`), never both by default. Point at the relevant rollout doc in
`.claude/docs/` for the mechanism instead of restating it.

1. **<Short step title>** — <what to do, in which file(s)>.
2. …

## Files touched

| File | Change |
|---|---|
| `path/to/file.ts` | <new / edit — one-line description> |

## Verification

The commands to run, in order, with what a pass looks like. Include manual checks no
script covers — for anything touching rendering, a browser check. **Split it by phase when
the plan has two**, so the English gate has its own pass/fail rather than deferring
everything to the end.

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds
- [ ] <the manual/browser check that makes the English version reviewable>

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves
- [ ] <the locale checks that apply: `check:figures`, `check:sepdrift`, `check:money`, …>
- [ ] Browser print-out where the rollout docs call for one

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

Status values: `Not implemented`, `In progress`, `English shipped`, `Implemented`,
`Abandoned`. **`English shipped`** means Phase 1 is built and waiting on the user's review
before translation — the state a two-phase plan sits in between phases, and the one worth
scanning for. `Implemented` on a two-phase plan means both phases landed.

The Plan cell links the document: `[<name>](<name>.md)`. The PR cell holds `#123` links,
comma-separated, or an em-dash while unimplemented.
