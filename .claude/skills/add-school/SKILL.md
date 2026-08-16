---
name: add-school
description: >
  Assess whether a new school can be added to the app, then hand off to /plan. Asks which
  school and what city/state, runs a scoped web sweep against the live data schema, and
  reports a coverage table — what percentage of each research area, structured card, and
  Compare row we could actually populate. If the user proceeds, it walks the thin research
  areas one at a time, then invokes /plan to write the implementation plan. Use when the
  user types /add-school, or asks to "add a school", "can we add <school>", "what would it
  take to cover <school>". This skill RESEARCHES AND PLANS ONLY — it never edits app code
  or writes source-material.
---

# /add-school — assess a candidate school, then plan it

Answers one question before any work starts: **can this school actually be populated
against the schema this app already has?** A school with a thin public footprint produces
a page of empty sections, which is worse than no page. The coverage table is the artifact
that makes that call cheap.

The skill ends by invoking `/plan`, which writes the plan document and hands off to
`/implement` in its own normal flow. This skill does not implement anything.

## Hard constraints

This skill may **read** anything and **search the web** freely. It may not:

- Edit anything under `src/`, or any generated file (`.claude/docs/`, `src/data/schools.json`).
- Write to `source-material/`. **This is deliberate and differs from `/plan`.** The sweep
  here is reconnaissance sized to produce percentages, not the research pass itself — its
  findings are indicative, not the vetted record. `/implement` does the real deep research
  and persists it under the data-provenance standard. Carry **URLs** forward in the plan so
  nothing has to be rediscovered; do not carry half-verified figures into the repo.
- Run the ingest pipeline.

Its only durable outputs are the plan document and index row — and those are written by
`/plan`, not here.

## Steps

### 1. Ask which school, and where

If the user typed `/add-school` with no argument, ask both questions in **one message**:

> Which school are you thinking about adding?
>
> And what **city and state** is it in? (Disambiguates the common case — there are several
> "Providence Day"-ish names nationally, and the sweep needs the right one.)

If they typed `/add-school <name>`, take that as the school and ask only for city/state.
If they gave both, ask nothing and go straight to step 2.

Before sweeping, confirm the school is not already in the app: read the Schools table in
[`.claude/docs/DATA-SCHEMA.md`](../../docs/DATA-SCHEMA.md) (or `src/data/schools.json`).
If it is already there, say so and stop — the user probably wants `/plan` to *extend*
coverage, and offer that instead.

Resolve the school's official website and confirm it is a **K–12 (or subset) private
school** in that city. If the search turns up two plausible schools with the same name,
ask which one rather than guessing — an entire sweep against the wrong school is the most
expensive mistake available here.

### 2. Read the schema — do not work from memory

Read [`.claude/docs/DATA-SCHEMA.md`](../../docs/DATA-SCHEMA.md) fresh, every run. It is
generated from live modules and grows; a hardcoded list of research areas in this skill
would be wrong the first time someone adds one. Take from it:

- **§1** the research areas (`TOPIC_ORDER`) — the columns of the report.
- **§2** the prose card keys within each area, and how many of the 6 existing schools have
  each. A key that only 1 of 6 schools has is not evidence the new school needs it.
- **§3** the structured cards per area, and the fields their root types require.
- **§4** the Compare rows — these are the most demanding, because they need a specific
  published number, not prose.
- **§5** the standalone catalogs (course offerings, club catalog, financial-aid report).

If `npm run check:schema` would fail, the doc is stale — run `npm run schema` first so the
sweep is measured against reality. (That regenerates a doc, not app code; it is the one
generated file this skill may refresh.)

### 3. Sweep — scoped, parallel, time-boxed

The goal is a defensible percentage per research area, **not** the research itself. Budget
roughly one focused pass per research area. Run them **in parallel** — these are
independent lookups and doing them serially is the difference between minutes and tens of
minutes.

For each research area, probe the sources that area actually lives on:

| Research area | Where coverage lives or dies |
|---|---|
| Course Offerings | a published curriculum guide / course catalog (PDF or page). Without one this area is near-zero. |
| Student Clubs | a clubs/activities list; honor-society pages; student-life section |
| The Arts | fine-arts department pages, performance calendar, Blumey-style award records |
| Sports | athletics site, team rosters, state-association records, recruiting DBs for commits |
| College Support | the **school profile** PDF and matriculation/acceptance list — the single highest-value document |
| After School | extended-day / aftercare page with **published hours and prices** |
| Summer Programs | a summer camp catalog with sessions and prices |
| Financial Aid & Tuition | published tuition table, aid percentages, and (if it exists) a Form 990 |

Three things distinguish a real hit from a false one, and all matter more than volume:

- **A page existing is not coverage.** "We offer a robust arts program" populates nothing.
  Coverage means the *specific* shapes the schema wants — a season list, a named ensemble,
  a dated award, a priced tier.
- **Compare rows need published numbers.** Score these separately and honestly. It is
  normal for prose coverage to be high and Compare coverage low; that asymmetry is exactly
  what the user needs to see, and averaging it away hides the finding.
- **Distinguish "not published" from "not found."** These are different results and the
  repo already treats them as such: a Compare row gets a deliberate `null` when the number
  is confirmed absent, and a **missing key is an oversight** that `npm run check:metrics`
  reports. Carry that distinction into the report and the plan — blending them into one
  percentage destroys information `/implement` needs, since it must write `null` for the
  first and go find the second.

Record the URL of everything you find. Those URLs are the most valuable thing this skill
produces — they go into the plan so `/implement` starts from found sources rather than
repeating the search.

### 4. Report the coverage table

Give the user, in this order:

**A one-line verdict first** — "Strong candidate: 7 of 8 areas viable" or "Thin: only
Sports and Tuition are populatable." Lead with the answer, not the methodology.

**The per-area table**, with the schema's own areas as rows:

| Research area | Core prose cards | Structured card | Compare rows | Verdict |
|---|--:|--:|--:|---|
| Course Offerings | 1/1 | — | 2/3 | include |
| Sports | 12/14 | fields for 5/7 cards | 2/2 | include |
| After School | 2/6 | fields for 1/4 cards | 0/2 | **thin** |

Rules for the table:

- **Score against the cards the existing schools actually have, not every card that
  exists.** §2 of the schema doc gives a `Schools` count per card key. Judge a candidate on
  the keys **5 or 6 of 6** schools hold; a key only 1 of 6 holds (`the-arts :: courses`,
  `digital-arts`) is not a gap when a new school lacks it. Comparing like with like is what
  makes the number mean something — measuring against all possible cards understates every
  school, including the ones already shipped.
- **Any figure is an estimate and must be labelled** (`~`). They come from a scoped sweep;
  presenting them as precise is a number the user would reasonably act on.
- Say what each column counts, in one line under the table.
- Score **structured cards by whether their required fields are findable**, not
  whether the topic exists — a `Cost` card needs `prices`, `periods` and `rows`, and a
  school that publishes no aftercare prices cannot have one however good its program is.
- Split Compare rows into **found / confirmed-not-published / not-found**, per step 3.
- List **what is missing and why** for anything below the bar — "no published curriculum
  guide", "roster pages but no commit list", "tuition is behind an inquiry form". This is
  what makes the number actionable rather than just discouraging.
- Note any **notable asymmetry** — e.g. rich prose but no published numbers, which means a
  good school page and an N/A-filled Compare column.

**Then a comparison against the current roster.** Show the candidate's Compare fill rate
beside the six shipped schools, so the user is comparing it to the real roster rather than
to an abstract percentage:

| School | Compare rows filled | Fill rate |
|---|--:|--:|
| Providence Day / Cannon | 29/30 | 96% |
| Charlotte Country Day | 28/30 | 93% |
| Charlotte Latin | 27/30 | 90% |
| Charlotte Christian | 24/30 | 80% |
| **Davidson Day** (the floor) | **17/30** | **56%** |
| *<candidate>* | *n*/30 | *~n%* |

**Then the sources you found**, grouped by area with their URLs, so the user can spot-check
a figure they doubt.

#### The bar

Two gates, calibrated to **Davidson Day** — the thinnest school the project has judged
worth shipping. It carries 17/30 Compare rows and has **no Summer Programs material at
all**, and that was an acceptable outcome; so the floor is "at least as good as Davidson
Day," not an invented round number.

- **Per area (include / omit):** include the area if the candidate can populate the card
  keys that 5–6 of 6 existing schools hold. Missing a near-universal card is the signal;
  missing a rare one is not.
- **School-wide (go / no-go):** **≥6 of 8 research areas viable, and ≥56% of Compare rows
  populatable.** 56% is Davidson Day's exact rate (17/30), and the comparison is
  **inclusive** — a candidate landing exactly on 17/30 passes, 16/30 (53%) does not. Count
  in **rows, not rounded percentages**: 30 rows means each one moves the figure ~3.3
  points, so "56%" is really "at least 17 of 30." Do not round to a neater number in either
  direction; the precision is the point of tying the bar to a real school.

State the bar and the candidate's numbers against it. It is a default, not a rule — the
user overrides it in step 5, and a school that misses on one axis while being exceptional
on the other is exactly the case worth putting to them rather than auto-failing.

**Re-derive the floor rather than trusting the numbers above.** They were measured on
2026-08-15 against 30 Compare rows and 8 research areas; both grow. §4 of the schema doc
gives the live row count and §1 the live area list, and the command below recomputes every
school's fill rate from `src/data/metricValues.ts` — note that `cannon` is written as a
bare key while hyphenated slugs are quoted, which a naive regex misses:

```bash
npm run schema   # refresh the doc first if it has drifted
```

If the roster or the row count has changed, recompute the weakest school's rate and use
**that** as the floor. The rule is "at least as good as our thinnest shipped school," and
56% is today's expression of it — not the rule itself.

**One caveat to state whenever you report these numbers:** the roster's fill rates are the
result of research effort already spent, not a pure measure of what is publicly available.
Providence Day at 96% partly reflects how much work went into it. The bar is therefore
"could plausibly *reach* Davidson Day's level with a full research pass," not "scores this
on a first sweep" — a candidate near the line is a judgment call, not a failure.

### 5. Ask whether to proceed — then walk the thin areas

Ask plainly: **proceed with adding this school, or not?** Do not assume a high percentage
means yes, and do not editorialize a low one into a no.

If they decline: stop. Report the URLs you found so the sweep is not wasted if they return
to it later. Write nothing.

If they proceed: **walk the research areas that fell below the per-area bar, one at a
time**, in schema order. For each, give the coverage, what is missing, and what including
it would actually look like on the page — then ask include or omit. One question per area,
not a single bundled list, because the decisions are independent and the reasoning differs
per area.

> **After School — 2 of the 6 core cards.** The extended-day page names the program and its
> hours but publishes no prices, so the Cost Planner card can't be built and both aftercare
> Compare rows would be N/A. Including it gives a Coverage-map card and little else.
> Include it anyway, or omit the area for this school?

Areas meeting the bar are included without asking.

**Omitting an area is a normal outcome, not a defeat** — Davidson Day ships with no Summer
Programs section at all. Present it that way rather than as a shortfall to be argued out
of, and note the precedent when it helps the user decide.

**Record every answer.** These decisions are the main thing this skill contributes to the
plan, and a fresh `/implement` window cannot re-derive them.

### 6. Hand off to /plan

Invoke the **`plan` skill** and let it run its normal flow. Do not write the plan document
yourself — `/plan` owns the template, the index row, and the `/implement` handoff, and
duplicating that here means two copies to keep in sync.

Pass it a fully-formed brief so it does not re-ask what this skill already established.
The name defaults to `add-<school-slug>` unless the user wants another; offer that so
`/plan` need not re-ask.

The brief must carry, explicitly:

- **The school** — full name, city/state, slug, official site.
- **The coverage table**, verbatim, and the sweep's overall figure.
- **Which research areas are in and which are out**, per step 5, with the user's reasoning.
  Flag these as *decisions already made* so `/plan` records them rather than re-litigating.
- **Every source URL found**, per area. This is the plan's head start.

Then make sure the plan `/plan` writes carries these, since they are the parts a fresh
implementing window would otherwise get wrong:

- **Deep research is `/implement`'s job.** The sweep was reconnaissance. Phase 1 begins
  with a full research pass per included area, starting from the URLs in the plan.
- **Everything found is persisted first**, under the data-provenance standard — to
  `source-material/<topic>/<school-slug>/<School> - <Topic> - <Subtopic>.md`, with a
  provenance header, source URLs, and the record-level detail behind every figure. Then
  ingested via the **`ingest-source-material` skill**, which regenerates the notes,
  `src/data/schools.json` and `src/content/`. Nothing goes into the app that is not
  traceable to one of those files.
- **Omitted areas are omitted by having no data, not by code.** A topic with no
  `source-material/` folder simply does not render — that is existing behaviour, and no
  conditional belongs in a component. Same for a structured card: leave the optional field
  off the school's `src/data/<dir>/<slug>.ts` and the card does not render.
- **Sparse is worse than absent.** Better to omit a card than ship one padded with
  "not published". Where a real gap must be shown, the topic's existing flag types
  (`gap`, `verify`, `estimate`) are how — they exist for this.
- **The hand-maintained layers the ingest never writes**, each an explicit step:
  `src/lib/metrics.ts` (map every new subtopic phrasing onto an **existing** key — an
  unmatched subtopic silently becomes a new card, which is an unapproved UX change),
  `src/data/metricValues.ts` (a value or a deliberate `null` for the new school on **every**
  Compare row — a missing key is an oversight, and `npm run check:metrics` tells them
  apart), `src/data/financialAidReports.ts`, `src/data/brands.ts` (color + initials),
  `src/data/clubClusters.ts`, and `SCHOOL_NAMES` in the ingest script's `build_docs.py`.
- **The podcast-episode table** in `src/data/podcastEpisodes.ts` is per school × topic; a
  new school has no episodes, and that is fine — do not invent entries.
- **SEO is automatic but verified.** Routes, pre-rendered pages, sitemap and `hreflang` all
  generate from `schools.json`; the step is to run `npm run check:seo`, not to hand-write
  anything.
- **Regenerate the schema doc** — `npm run schema`, with `npm run check:schema` clean.
- **Phasing.** A new school adds research prose, so it is **two-phase**: English first,
  then the overlay layer for every locale in `PROSE_TRANSLATED`, with the user's review in
  between. `/plan` decides and writes this; make sure its brief says the school brings new
  prose so it does not mistake this for a data-only change.
- **The UX gate.** Adding a school needs **no** UX approval — per §6 of the schema doc it
  is automatic everywhere. But if the sweep found material that fits **no existing card**,
  that is a new card and needs the user's approval *before* `/implement` runs. Surface it
  now, not as a step for a fresh window to discover.

Let `/plan` close with its own `/implement <name>` handoff. Do not add a second one.

## What this skill does not do

- It does not write `source-material/` files. `/implement` does, from real research.
- It does not implement, branch, or commit.
- It does not decide the school is worth adding. It makes that decision cheap and informed,
  and the user makes it.
