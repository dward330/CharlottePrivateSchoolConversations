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

This skill may create or edit:

- `.claude/plans/<name>.md` — the plan
- `.claude/plans/INDEX.md` — the register
- `source-material/**/*.md` — raw research data fetched while planning (see below)

**Nothing under `src/`, and no generated file** — not `.claude/docs/` notes, not
`src/data/schools.json`. Reading and searching the codebase is not just allowed, it's the
bulk of the work, but the app-layer output is a document. If research turns up a one-line
fix you're tempted to just make, write it into the plan instead and say so in your reply.

**Data you fetch while planning IS persisted — always.** If research pulls real school
data from an external source, save it to `source-material/<topic>/<school>/<School> -
<Topic> - <Subtopic>.md` with a provenance header, the source URLs, and the record-level
detail behind every number. This is the data-provenance standard and it applies here in
full. Never leave fetched data sitting in the conversation for `/implement` to re-fetch —
the source may be paywalled or may have changed, and the planning window is where it was
actually in hand.

What planning does **not** do is run the pipeline over it. Regenerating `.claude/docs/`
and `schools.json` is app-layer work that belongs on a branch under review, so make the
`ingest-source-material` step explicit in the plan and note in your closing report that
the material is **staged but uningested**. Those files are uncommitted on the current
branch — mention that so a dirty tree isn't a surprise.

## Steps

### 1. Ask what to plan

If the user typed `/plan` with no argument, ask what feature or change they want planned.
If they typed `/plan <description>`, take that as the answer and don't re-ask.

Ask for the plan name in the **same message** — one round trip, not two. Explain what the
name is *for* and that opting out is a real default, not a fallback you'd rather they
didn't take:

> What feature or change should I plan?
>
> Do you want to give it a **single-word name**? It becomes the plan's filename and the
> argument you'll type later — `/implement <name>` — so a short memorable one is easiest
> to type in a fresh window.
>
> If you'd rather not pick one, that's fine — I'll default to the current branch name
> (`<branch>` → `<derived-name>`).

Show the actual derived default in that last line rather than the phrase "the branch
name". Seeing the concrete name is what lets someone accept it without thinking, and the
point of offering a default is that taking it costs nothing.

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
  needs the user's approval *first*. If the plan needs one, surface it in the closing
  report rather than burying it as a step for `/implement` to run into.
- **i18n** — any new user-facing string is a key in `src/locales/*.json`, never hardcoded
  JSX. This drives the phase split in step 4 below.
- **Data provenance and ingestion** — if the plan pulls in any new school data from an
  external source (web search, a school page, a recruiting site, a PDF the user drops in),
  it gets persisted to `source-material/<topic>/<school>/*.md` with its source URLs **and
  run through the `ingest-source-material` skill** in the same pass. Never plan to hand-
  edit `.claude/docs/` notes or `src/data/schools.json` — those are generated. See the
  ingestion rule below.
- **Git flow** — branch + PR, never a direct push to `main`.

**If the plan involves new or changed research data, its steps must route through the
ingest pipeline.** A plan that writes a figure straight into the app leaves the notes and
manifest out of sync with `source-material/`, and the next ingest run silently overwrites
it. So write the steps in this order:

1. Save the raw material to `source-material/<topic>/<school>/<School> - <Topic> -
   <Subtopic>.md`, with a provenance header, source URLs, and the record-level detail
   behind every number.
2. Invoke the **`ingest-source-material` skill** to regenerate `.claude/docs/` and
   `src/data/schools.json`. Name the skill in the step — not the bare `build_docs.py`
   command, which skips the hand-maintained app layers the skill also covers
   (`src/lib/metrics.ts` rules, `src/data/metricValues.ts`, `financialAidReports.ts`).
3. Only then, whatever app-layer work the plan is actually about.

Two traps to check while planning, both of which turn a data plan into an approval
conversation:

- **A new subtopic phrasing that falls through `normalizeMetric()` creates a new card** —
  which needs the UX approval. If the plan's material introduces one, the fix is usually a
  `RULES` entry mapping it onto an existing metric key; call that out as a step.
- **A financial-aid deep-dive also needs its structured `REPORTS` entry** in the same pass,
  not left as prose.

### 4. Decide whether the plan is one phase or two

**Any plan that adds or changes user-facing text ships in two phases: English first,
then every other locale — with the user's review in between.** This is a standing rule of
this repo, not something the user should have to ask for on each plan. Write it into the
plan; never leave it implied.

The reason is economic. Wording changes after you see it rendered, and a change propagated
to eight locales before that review multiplies every revision by eight — including into
languages nobody here reads. English first means the wording settles while it is still
cheap to change.

**Does this plan touch user-facing text?**

- **Yes** — UI chrome (a new key in `src/locales/*.json`), research prose in `src/data/**`
  reached by the overlay layer, or any string a parent would read. → **Two phases.**
- **No** — a refactor, build config, a script, a data-only correction that re-uses existing
  strings. → **One phase.** Say so explicitly in the plan (*"Single-phase — adds no
  user-facing text"*) so the implementer knows it was decided, not forgotten.

When it is two phases, structure the plan's *Steps* section under two headings and split
*Verification* the same way. Get the locale scope right — they are different layers:

- **UI chrome** → the catalog files. Read `TRANSLATED` in `src/lib/i18n.ts` and list the
  actual `src/locales/*.json` files; do not hardcode a count, it grows.
- **Research prose** → the overlay layer, per `PROSE_TRANSLATED` — a different list and a
  different mechanism. Point Phase 2 at the rollout docs in `.claude/docs/`
  (`prose-translation-architecture.md` for the mechanism) rather than restating it.

Phase 2 also owns the locale-specific traps the rollout docs record — figures copied
char-for-char and never re-typed, lakh/crore grouping for `hi`/`te`, RTL isolates for `fa`.
Reference them; don't re-derive them in the plan.

### 5. Write the plan

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

### 6. Register it and report

Append a row to `.claude/plans/INDEX.md` (create it from the header in the template if it
doesn't exist) with status **Not implemented** and an em-dash in the PR column.

Then tell the user, in a few lines:

- Where the plan lives and its one-line summary.
- The step count and the rough shape of the work.
- **Whether it is one phase or two**, and for two, that `/implement` will build English and
  stop for their review before touching any other locale.
- **Anything needing their approval before `/implement` can run** — especially a UX-design
  gate. Ask for that approval now; a plan that stalls at step 1 in a fresh window wasted
  the round trip.
- Any open question you resolved by assumption, so they can correct it while it's cheap.
- **Any research data you staged** — which `source-material/` files you wrote, that they're
  uncommitted, and that `/implement` will ingest them.

**End with the handoff — the exact command, on its own line, with the real name filled
in:**

> Ready to build. In a **new window**, run:
>
> ```
> /implement <name>
> ```

Two details matter here. Write the resolved name into the command — never leave a
`<name>` placeholder for the user to substitute, since the whole point is that they can
copy the line. And say **new window**: the plan exists so implementation starts with a
clean context, and a plan built in this same window forfeits that.

Do not start implementing, even if the plan is short and the next step is obvious. Ending
the turn here is the correct outcome — if the user wants it built now, they'll say so.
