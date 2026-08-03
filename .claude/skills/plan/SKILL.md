---
name: plan
description: >
  Research a feature or change and write a durable implementation plan to
  .claude/plans/<name>.md, then register it in .claude/plans/INDEX.md. Use when the user
  types /plan, or asks to "write a plan", "plan out this feature", "spec this before we
  build it", or otherwise wants a documented plan they can hand to /implement in a fresh
  window. This skill PLANS ONLY — it never edits app code. The companion /implement skill
  executes a plan written here.
---

# /plan — write a documented implementation plan

Produces one self-contained plan document that a **fresh Claude window with no memory of
this conversation** can execute via `/implement`. That is the bar for every judgment call
below: if the plan omits something the implementer would have to guess at, the plan is not
done.

## Hard constraint — planning writes no app code

This skill may only create or edit:

- `.claude/plans/<name>.md` — the plan
- `.claude/plans/INDEX.md` — the register

Nothing under `src/`, `source-material/`, or anywhere else. Reading and searching the
codebase is not just allowed, it's the bulk of the work — but the output is a document.
If research turns up a one-line fix you're tempted to just make, write it into the plan
instead and say so in your reply.

## Steps

### 1. Ask what to plan

If the user typed `/plan` with no argument, ask what feature or change they want planned.
If they typed `/plan <description>`, take that as the answer and don't re-ask.

Ask for the plan name in the **same message** — one round trip, not two:

> What feature or change should I plan? And do you want to give it a single-word name?
> (If not, I'll use the branch name.)

**Resolving the name**, in order:

1. The single word the user gave — slugified (`lowercase-with-hyphens`).
2. Otherwise the current branch name, with any `feat/`, `fix/`, `i18n/` prefix stripped
   (`feat/plan-implement-commands` → `plan-implement-commands`).
3. If that yields `main`, don't use it — derive 2–4 words from the feature description
   instead and tell the user the name you picked.

If `.claude/plans/<name>.md` already exists, stop and ask whether to overwrite it, pick a
different name, or amend the existing plan.

### 2. Clarify only what changes the plan

Ask blocking questions **before** researching, not after — and only for ambiguity where
two readings produce materially different plans. Scope boundaries, which of several
existing patterns to follow, and whether a user-visible surface changes are worth asking
about. Naming, file placement, and other routine calls are yours to make; record them in
the plan's Decisions section rather than asking.

If nothing is genuinely ambiguous, skip straight to research.

### 3. Research the codebase

Read before writing. Do not plan against an assumed structure — every file path, function
name, and export in the finished plan must be one you actually confirmed exists.

Cover at minimum:

- The files the change touches, and their current shape.
- The nearest existing feature that solves a similar problem — the plan should match its
  conventions, not invent new ones.
- Every consumer of anything being changed (grep for imports/callers before declaring a
  signature safe to alter).
- Which checks in `package.json` cover the affected area, and whether the change needs a
  new one.

Then check the change against this repo's standing rules, and fold anything that applies
into the plan as an explicit step. Read `CLAUDE.md` for the authoritative text; the
recurring ones are:

- **UX-design gate** — a new card, section, stat tile, Compare row, metric key, or topic
  needs the user's approval *first*. If the plan needs one, surface it in step 5 rather
  than burying it as a step for `/implement` to run into.
- **i18n** — any new user-facing string is a key in `src/locales/*.json`, never hardcoded
  JSX. If the change adds UI text, list every locale file that needs the key. A shipped
  locale left without the key is a regression, not a follow-up.
- **Data provenance** — new external school data gets persisted to
  `source-material/<topic>/<school>/*.md` with source URLs, in the same pass.
- **Git flow** — branch + PR, never a direct push to `main`.

### 4. Write the plan

Write `.claude/plans/<name>.md` using [`plan-template.md`](plan-template.md) — read that
file and follow its structure and section semantics.

Two things carry the most weight:

- **The step list is the deliverable.** Each step names real files and describes a
  concrete edit. "Update the i18n layer" is not a step; "add `plan.title` to each of the
  nine files in `src/locales/`" is.
- **Verification must be runnable.** Give the actual commands (`npm run check:runtime`,
  `npx tsc --noEmit`), plus any manual check that no script covers — this repo has a
  standing lesson that render-layer defects survive every automated check, so if the
  change touches rendering, a browser check belongs in the plan.

Keep it as long as it needs to be and no longer. A three-file change does not need a
risks table.

### 5. Register it and report

Append a row to `.claude/plans/INDEX.md` (create it from the header in the template if it
doesn't exist) with status **Not implemented** and an em-dash in the PR column.

Then tell the user, in a few lines:

- Where the plan lives and its one-line summary.
- The step count and the rough shape of the work.
- **Anything needing their approval before `/implement` can run** — especially a UX-design
  gate. Ask for that approval now; a plan that stalls at step 1 in a fresh window wasted
  the round trip.
- Any open question you resolved by assumption, so they can correct it while it's cheap.
- That `/implement <name>` will execute it.

Do not start implementing. Ending the turn here is the correct outcome.
