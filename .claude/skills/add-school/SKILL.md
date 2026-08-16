---
name: add-school
description: >
  Assess whether a new school can be added to the app, then hand off to /plan. Asks which
  school and what city/state, runs a scoped web sweep against the live data schema, and
  reports a coverage table — how much of each research area, structured card, and Compare
  row we could actually populate, measured against the thinnest school already shipped. If
  the user proceeds, it walks the thin research areas one at a time, then invokes /plan to
  write the implementation plan. Use when the user types /add-school, or asks to "add a
  school", "can we add <school>", "what would it take to cover <school>". This skill
  RESEARCHES AND PLANS ONLY — it never edits app code or writes source-material.
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

Run `npm run check:schema` first. If it fails the doc has drifted from the live modules —
run `npm run schema` so the sweep is measured against reality rather than a stale catalog.
(That regenerates a doc, not app code; it is the one generated file this skill may
refresh.)

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

**Then a comparison against the current roster**, so the user is comparing the candidate to
the real roster rather than to an abstract percentage. **Compute it — do not transcribe a
table from this document:**

```bash
npm run coverage:floor
```

That prints every shipped school's Compare fill rate and research-area count, then derives
the bar from the thinnest one. Run it every time; the roster and the Compare-row count both
grow, and a number pasted into this skill would quietly go stale. Add the candidate as one
more row of that table.

**Then the sources you found**, grouped by area with their URLs, so the user can spot-check
a figure they doubt.

#### The bar

Two gates, both calibrated to **the thinnest school the project has judged worth
shipping** — as of 2026-08-15 that is Davidson Day, at 17/30 Compare rows (56%) and 7 of 8
research areas, with **no Summer Programs material at all**. That was an acceptable
outcome, so the floor is "at least as good as our thinnest shipped school," not an invented
round number. `npm run coverage:floor` recomputes it.

- **Per area (include / omit):** include the area if the candidate can populate the card
  keys that 5–6 of 6 existing schools hold. Missing a near-universal card is the signal;
  missing a rare one is not.
- **School-wide (go / no-go):** **≥17 of 30 Compare rows, and ≥6 of 8 research areas.**
  The comparison is **inclusive** — exactly 17/30 passes, 16/30 (53%) does not. Count in
  **rows, not rounded percentages**: each row moves the figure ~3.3 points, so "56%" means
  "at least 17 of 30." Do not round to a neater number in either direction.

  On the area count, the script derives 7/8 from Davidson Day, but the stated bar is
  **6 of 8** — one area more permissive, deliberately. Davidson Day is missing its one area
  for a substantive reason (it genuinely runs no summer program), and a candidate that is
  simply *unresearched* in two areas can still be worth adding. Tighten to 7/8 if the
  roster grows and the extra latitude stops being useful; the script reports both so the
  gap stays visible rather than silently forgotten.

State the bar and the candidate's numbers against it. It is a default, not a rule — the
user overrides it in step 5, and a school that misses on one axis while being exceptional
on the other is exactly the case worth putting to them rather than auto-failing.

**One caveat to state whenever you report these numbers:** the roster's fill rates are the
result of research effort already spent, not a pure measure of what is publicly available.
Providence Day at 96% partly reflects how much work went into it. The bar is therefore
"could plausibly *reach* that level with a full research pass," not "scores this on a first
sweep" — a candidate near the line is a judgment call, not a failure.

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
- **Omitted areas are omitted by having no data, not by code.** Verified: `topicsForSchool()`
  (`src/lib/manifest.ts:47`) filters to topics with `docCount > 0`, and `SchoolDetail.tsx:362`
  renders only those. A topic with no `source-material/` folder is absent from the page
  entirely — Davidson Day's missing Summer Programs is the live precedent, commented at
  `SchoolDetail.tsx:664`. **No conditional belongs in a component.** Same for a structured
  card: leave the optional field off `src/data/<dir>/<slug>.ts` and it does not render.
- **Sparse is worse than absent.** Better to omit a card than ship one padded with
  "not published". Where a real gap must be shown, the topic's existing flag types
  (`gap`, `verify`, `estimate`) are how — they exist for this.
- **The six structured-card modules need a hand-added import.** Nothing auto-discovers
  `src/data/sportsPrograms/<slug>.ts` — the `PROGRAMS` map in each topic root
  (`sportsProgram.ts:429`, `artsProgram.ts:362`, `clubsProgram.ts:280`,
  `collegeSupport.ts:423`, `afterSchool.ts:391`, `summerPrograms.ts:313`) is a static
  `Record` of explicit imports. **Adding the per-school file without wiring the import is a
  silent no-op** — the school renders prose instead of cards, and no check catches it.
  Only needed for topics where structured cards are in scope.
- **The hand-maintained layers the ingest never writes**, each an explicit step:
  `src/lib/metrics.ts` (map every new subtopic phrasing onto an **existing** key — an
  unmatched subtopic silently becomes a new card, which is an unapproved UX change),
  `src/data/metricValues.ts` (a value or a deliberate `null` for the new school on **every**
  Compare row — a missing key is an oversight, and `npm run check:metrics` tells them
  apart), `src/data/financialAidReports.ts`, `src/data/clubClusters.ts`,
  `src/data/courseOfferings.ts` (`OFFERINGS`), `src/data/clubCatalog.ts` (`CATALOG`), and
  `SCHOOL_NAMES` in the ingest script's `build_docs.py`.
- **`src/data/brands.ts` degrades gracefully** — `brandFor()` falls back to slate
  `#5b6472` plus initials derived from the name (`brands.ts:70`). So a missing entry is not
  a breakage, but the school ships with a generic badge and no crest. Add color + initials
  deliberately; do not let the fallback ship by omission.
- **`SCHOOL_SECTION_ORDER`** (`src/pages/SchoolDetail.tsx:116`) is an optional per-school
  card-order override, `?.`-guarded. Unlisted schools use the shared order — fine to skip.
- **The podcast-episode table** in `src/data/podcastEpisodes.ts` is per school × topic; a
  new school has no episodes, and that is fine — do not invent entries.
  `check:podcast` validates one-directionally and passes silently on a school with none.
- **SEO generates from `schools.json`, but `check:seo` is NOT in the build** — `npm run
  build` runs `seo:files`, not `check:seo`. Run it explicitly. Watch its `MIN_BYTES =
  20_000` floor (`check_seo.mjs:34`): **a thin new school can plausibly pre-render under
  20 KB and fail**, which is a real possible outcome here, not a hypothetical. It also
  requires a meta description ≥70 chars and the school name present in the markup.
- **Regenerate the schema doc** — `npm run schema`. `check:schema` **is** chained into
  `npm run build` and **will** fail until you do, since a new school changes the schools
  table and the coverage matrix.
- **Phasing.** A new school adds research prose, so it is **two-phase**: English first,
  then the overlay layer for every locale in `PROSE_TRANSLATED`, with the user's review in
  between. `/plan` decides and writes this; make sure its brief says the school brings new
  prose so it does not mistake this for a data-only change.
- **⚠️ The i18n scripts hold hardcoded school lists, and will SILENTLY SKIP a new
  school.** This is the highest-risk step in the whole plan, because the failure mode is
  not a red check — it is a clean run that never looked. Each of these has a literal
  `SLUGS` array and/or a slug→export map that must gain the new school **before Phase 2
  runs**, or its prose is simply never extracted and every locale reads as complete:

  | Script | What to add |
  |---|---|
  | `scripts/i18n_extract.mjs:45,87` | `SLUGS` + `EXPORTS` map |
  | `scripts/check_translations.mjs:35,76` | `SLUGS` + `EXPORTS` map |
  | `scripts/check_chrome_keys.mjs:36,49` | `SLUGS` + `EXPORTS` map |
  | `scripts/i18n_audit_skips.mjs:36,49` | `SLUGS` + `EXPORTS` map |
  | `scripts/check_live_resolution.mjs:51` | `EXPORTS` map |
  | `scripts/i18n_fields.mjs:334` | per-slug `values.<slug>` / `subs.<slug>` paths |

  The repo has been bitten by exactly this shape before — `check_translations.mjs:53`
  records that Summer Programs "was invisible here until it was added, at 0% coverage."
  Treat a 100% coverage report on the new school as **suspect until you confirm its slug
  is in every list above**. Verify by checking that the new school's strings actually
  appear in the extracted work files, not by trusting a green run.
- **The UX gate.** Adding a school needs **no** UX approval — per §6 of the schema doc it
  is automatic everywhere. But if the sweep found material that fits **no existing card**,
  that is a new card and needs the user's approval *before* `/implement` runs. Surface it
  now, not as a step for a fresh window to discover.
- **A browser check on the new school's page**, in Phase 1 — this repo's standing lesson is
  that every defect surviving the automated checks was render-layer. Confirm the included
  areas render, **the omitted ones are absent rather than empty**, the Compare column shows
  values and N/A where expected, and the school's badge is not a fallback slate square
  unless that was intended. `npm run check:seo` for the pre-render, watching the 20 KB
  floor.

Let `/plan` close with its own `/implement <name>` handoff. Do not add a second one.

## What this skill does not do

- It does not write `source-material/` files. `/implement` does, from real research.
- It does not implement, branch, or commit.
- It does not decide the school is worth adding. It makes that decision cheap and informed,
  and the user makes it.
