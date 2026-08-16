---
name: add-school
description: >
  Assess whether a new school can be added to the app, then hand off to /plan. Asks which
  school and what city/state, runs a
  scoped web sweep against the live data schema, and
  reports a coverage table — how much of each research area, structured card, and Compare
  row we could actually populate, measured against the thinnest school already shipped. If
  the user proceeds, it walks the thin research areas one at a time, asks which Welcome
  Video the page should feature, then invokes /plan to
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

**Do NOT ask about the Welcome Video here.** That question waits until the school has been
assessed and the user has decided to proceed — it is asked in step 5b, not now. Asking a
parent-facing question about a school we may not add wastes the user's time; the viability
call comes first. (User-set, 2026-08-16.)

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

Being shallow here is the design, not a shortcut: a cheap sweep is what makes the
go/no-go cheap. An area that comes back low gets a **deeper, targeted pass in step 5** if
the user wants one, so nothing is decided on a single look — do not pre-emptively deepen
the sweep here to avoid that, or the whole assessment costs what the research costs.

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

| Research area | Core prose cards | Structured card | Compare rows | Coverage | Verdict |
|---|--:|--:|--:|--:|---|
| Course Offerings | 1/1 | — | 2/3 | **~75%** (3/4) | include |
| Sports | 12/14 | fields for 5/7 cards | 2/2 | **~83%** (19/23) | include |
| After School | 2/4 | fields for 1/4 cards | 0/2 | **~30%** (3/10) | **thin** |

Rules for the table:

- **Give every area a single coverage percentage.** Compute it as **items found ÷ items
  applicable**, pooling the three columns — for After School above, (2 + 1 + 0) ÷
  (6 + 4 + 2) = 25%. Pool rather than averaging the three columns, so an area with 6 prose
  cards and 1 Compare row is not distorted by a single missing number. An `—` column (no
  structured card, no Compare rows for that area) drops out of both sides rather than
  counting as zero.
- **Always print the counts beside the percentage, because the denominators are small and
  wildly uneven.** Measured against the live schema on 2026-08-15:

  | Area | Denominator | One item swings |
  |---|--:|--:|
  | Sports | 23 | 4 pts |
  | College Support | 22 | 5 pts |
  | The Arts | 12 | 8 pts |
  | After School | 10 | 10 pts |
  | Student Clubs | 9 | 11 pts |
  | Summer Programs | 7 | 14 pts |
  | Financial Aid & Tuition | 5 | 20 pts |
  | Course Offerings | 4 | **25 pts** |

  A 5.8× spread. **Course Offerings can only ever read 0 / 25 / 50 / 75 / 100%** — there is
  no such thing as a 56% there, and a single curriculum-guide PDF is the difference between
  25% and 75%. Treat a Sports percentage as a measurement and a Course Offerings percentage
  as a rough signal; never compare the two as if they carried equal weight. Recompute these
  denominators from the schema doc rather than trusting the table — they move whenever a
  card or Compare row is added.
- **Score against the cards the existing schools actually have, not every card that
  exists.** §2 of the schema doc gives a `Schools` count per card key. Judge a candidate on
  the keys **5 or 6 of 6** schools hold; a key only 1 of 6 holds (`the-arts :: courses`,
  `digital-arts`) is not a gap when a new school lacks it. Comparing like with like is what
  makes the number mean something — measuring against all possible cards understates every
  school, including the ones already shipped. **The denominator is the core-card count, not
  the full one**, so state it (`2/4 core cards`, not `2/6`) rather than leaving it
  ambiguous — the two denominators differ in every area but Sports and Course Offerings.
- **Any figure is an estimate and must be labelled** (`~`). They come from a scoped sweep;
  presenting them as precise is a number the user would reasonably act on. The area
  percentages especially: they rest on small denominators, where one found PDF can move an
  area 15 points.
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

- **Per area (include / omit / dig deeper):** **under ~50%, take the area to the step-5
  walk.** Judge the numerator on the card keys 5–6 of 6 existing schools hold — missing a
  near-universal card is the signal, missing a rare one is not.

  **This is a trigger for a conversation, not a pass/fail gate — and it is deliberately
  NOT the school-wide 56%.** Three reasons, each of which bit an earlier draft of this
  skill:

  1. **56% is a rate over 30 Compare rows.** An area's denominator is 4–23, so the two
     numbers are not the same kind of measurement and a shared threshold implies a
     precision that is not there.
  2. **The calibration school fails it.** Davidson Day — the shipped floor this whole bar
     is derived from — has **no Summer Programs material at all**, or 0%. A per-area gate
     at 56% rejects an area the project already ships without. Any per-area threshold must
     survive that test; run it against the roster before changing this number.
  3. **Coarse areas cannot express it.** Course Offerings quantizes to 0/25/50/75/100 —
     "56%" is unreachable, so the bar would silently behave as 75% there.

  So: ~50% is a rough line for *which areas are worth discussing*, and the discussion —
  with its dig-deeper option — is what actually decides. An area a hair under it that the
  user obviously wants is included without ceremony.
- **School-wide (go / no-go):** **≥17 of 30 Compare rows, and ≥6 of 8 research areas.**
  The comparison is **inclusive** — exactly 17/30 passes, 16/30 (53%) does not. Count in
  **rows, not rounded percentages**: each row moves the figure ~3.3 points, so "56%" means
  "at least 17 of 30." Do not round to a neater number in either direction.

  **Do not confuse this 56% with an area percentage.** They measure different things and
  are not comparable: this one is Compare rows only, across the whole school, against a
  denominator of 30; an area percentage pools prose cards and structured-card fields too,
  against a denominator of 4–23. A school can sit at 90% on most areas and still miss this
  bar, because published *numbers* are scarcer than published *prose* — that asymmetry is
  a finding worth reporting, not an inconsistency to reconcile. When both figures appear in
  one report, label them (`Compare rows: 17/30` vs `Sports area: ~83%`).

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

If they proceed: **walk the research areas that came back under ~50%, one at a time**, in
schema order. For each, give the percentage and the counts behind it, what is missing, and
what including it would actually look like on the page — then offer **three** options, not
two. One question per area, not a single bundled list, because the decisions are
independent and the reasoning differs per area.

> **After School — ~30%** (3 of 10: 2 of 4 core cards, 1 of 4 structured-card field sets,
> 0 of 2 Compare rows). The extended-day page names the program and its hours but publishes
> no prices, so the Cost Planner card can't be built and both aftercare Compare rows would
> be N/A. Including it gives a Coverage-map card and little else.
>
> **Dig deeper**, include as-is, or omit the area for this school?

**"Dig deeper" is the important option, and it must be offered wherever it could plausibly
change the answer.** The step-3 sweep is deliberately shallow — roughly one pass per area —
so a low score conflates two very different findings: *the data is not published* and *one
quick pass did not find it*. Forcing include-or-omit on that ambiguity decides on bad
information. A deeper look resolves it while the decision is still cheap, and long before
`/implement` has committed to a branch.

When the user picks it, run a **focused deep research pass on that one area only**:

- Go past the school's own site — the state athletic association, `GreatSchools`/`Niche`/
  `Private School Review`, NCES, the school's Form 990, archived versions of pages
  (a tuition table pulled before an inquiry-form redesign still counts as published), local
  press, the diocese or association the school belongs to, and PDFs the site never links.
- Score it again on the same basis as step 4 and **report the delta plainly** — "After
  School: ~30% → ~60%, i.e. 3 of 10 items to 6 of 10 (core cards 2/4 → 3/4, Compare rows
  0/2 → 2/2); found the 2025–26 rate sheet as a PDF the site never links."
- Then ask the same question again with the new number. Say what moved in **counts**, not
  just the percentage — on a 10-item denominator "25% → 58%" is three found items, and the
  user should be told that rather than left to infer a bigger change than occurred.

Two honesty rules on this, because the failure mode is talking yourself into a school:

- **A deep pass that finds nothing is a real and useful result.** Report the unchanged
  score without softening it. Confirming "not published" is worth the pass — it converts a
  *not-found* into a confirmed `null`, which is exactly the distinction `/implement` and
  `check:metrics` need. Say so, and carry that into the plan.
- **Do not re-run it twice on the same area** hoping for a better number. If a focused pass
  and the original sweep both come up short, the data is not there; a third look is
  motivated reasoning, not research. Say that plainly rather than offering another round.

Offer the same option at the **school-wide** level too, before a no-go: if the candidate
misses the ≥17/30 bar but the misses are concentrated in two or three areas, ask whether to
deep-dive those before declining the school outright. A school rejected on a shallow sweep
that would have cleared the bar on a real look is the most expensive possible outcome of
this skill — it is the one mistake that never gets discovered.

Areas meeting the bar are included without asking, and are **not** offered a deep pass —
that is `/implement`'s job, and doing it here would collapse the reconnaissance/research
split this skill exists to maintain.

**Omitting an area is a normal outcome, not a defeat** — Davidson Day ships with no Summer
Programs section at all. Present it that way rather than as a shortfall to be argued out
of, and note the precedent when it helps the user decide.

**Record every answer.** These decisions are the main thing this skill contributes to the
plan, and a fresh `/implement` window cannot re-derive them.

### 5b. Ask which Welcome Video the school's page should use

**Only once the user has decided to proceed** (step 5) — never before. Assessing a school
we may not add, then asking a parent-facing question about it, wastes the user's time; the
viability call comes first. So this question comes after "yes, add it," in the same flow as
the thin-area walk. (User-set, 2026-08-16 — moved here from step 1.)

Ask the user:

> Which **Welcome Video** do you want on this school's page? Paste a YouTube link — or say
> "none" and the page simply won't show a Welcome Video section.

Rules for this question:

- **It is asked every run**, once the school is a go — not left for `/implement` to
  discover. The six original schools all carry one, and Covenant Day initially shipped
  without because nobody asked.
- **"None" is a fine answer.** `welcomeVideoUrl` is optional on the `Brand` type; a school
  without one hides the Welcome Video section and its TOC entries entirely (the standing
  absence-not-emptiness rule). Record the explicit "none" so `/implement` doesn't treat
  the gap as an oversight.
- **Normalize to the embed form.** `brands.ts` requires a YouTube **embed** URL
  (`https://www.youtube.com/embed/<id>`), not a watch/share link — convert whatever the
  user pastes and confirm the video ID back to them.
- **Carry it into the `/plan` brief** (step 6), where it lands in the plan's `brands.ts`
  step so `/implement` wires `welcomeVideoUrl` alongside the color and initials.

### 6. Hand off to /plan

Invoke the **`plan` skill** and let it run its normal flow. Do not write the plan document
yourself — `/plan` owns the template, the index row, and the `/implement` handoff, and
duplicating that here means two copies to keep in sync.

Pass it a fully-formed brief so it does not re-ask what this skill already established.
The name defaults to `add-<school-slug>` unless the user wants another; offer that so
`/plan` need not re-ask.

The brief must carry, explicitly:

- **The school** — full name, city/state, slug, official site.
- **The Welcome Video decision from step 5b** — the normalized embed URL, or the user's
  explicit "none". Either way it is a decision already made; the plan's `brands.ts` step
  records it so `/implement` wires (or deliberately omits) `welcomeVideoUrl`.
- **The coverage table**, verbatim, and the sweep's overall figure.
- **Which research areas are in and which are out**, per step 5, with the user's reasoning
  and each area's coverage percentage. Flag these as *decisions already made* so `/plan`
  records them rather than re-litigating.
- **Any area that got a step-5 deep pass, and what it changed** — the before/after
  percentage, what the deeper look found, and where. If a deep pass found **nothing**, say
  so explicitly: that is a confirmed "not published", it tells `/implement` to write
  deliberate `null`s rather than go hunting, and without it a fresh window will burn a
  research pass rediscovering the same absence.
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
- **Build each card to the FULLEST existing school's structure, not the most-recent add's.**
  A new school's per-school data files should mirror the richest, most complete example for
  each area — Providence Day, Charlotte Latin and Cannon are the deep ones (~96% Compare
  fill) — populating every optional field, stat tile, season/ledger/funnel/roster row and
  sub-card the candidate has real data for. The instinct is to copy the school added *last*
  because it is the freshest example, but the last add may be a **thin** school, and copying
  its depth silently caps the new school below what its data supports. Use the recent add as
  a **mechanical** reference only (where a file lives, how the `PROGRAMS` import is wired) —
  never as the content model. A field is dropped **only** where the data is genuinely
  unpublished (then the absence-not-emptiness rule above applies), never because a thinner
  school happened to leave it off. The plan's brief must say this explicitly, and its Phase-1
  browser check should compare the new page side-by-side with a data-rich school to confirm
  the rich areas reached full depth. (User-set, 2026-08-16, after a plan defaulted to
  mirroring Covenant Day — a 56%-fill school — throughout.)
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
- **Every college on the acceptance list that holds a real U.S. News rank gets its
  `rankLabel` — National *or* National Liberal Arts, at ANY rank, not just the top-75
  buckets.** The "Where Graduates Go" list in `src/data/collegeSupportPrograms/<slug>.ts`
  shows each college's rank on the right (`National Rank #80`, `Liberal Rank #21`). The rule
  is **inclusive**: a college ranked #80, #250, or in a published band like `#395-434` still
  shows that label — the label is informational and is independent of the `cats` buckets
  (`nu75`/`lac75` stay genuinely top-75 and drive only the filter chips, so a #80 school gets
  the label with `cats: []`). Only these carry **no** label: U.S. News **Regional**
  Universities/Colleges, community/technical colleges, specialty art/music/design schools,
  seminaries, and **foreign** universities (Best Global does not count) — all genuinely
  unranked in the two national lists. (User-set, 2026-08-16, after Drexel #80 and DePaul #169
  shipped unlabeled because the old rule only labelled bucketed colleges.)

  **Reuse the shared table first, then research only the gaps — this is the efficiency, and
  it is mandatory, not optional.** `source-material/college-support/_shared/US News 2026 -
  Rank Labels.md` is the canonical `rankLabel` table (one row per institution, zero
  conflicts by construction). For each college on the new school's list: (1) if it is in the
  table, **copy the label verbatim** — never re-type or re-derive a rank that already exists;
  (2) only if it is absent, deep-research its 2026 U.S. News rank and **add it to the table
  with its source** so the next school reuses it. Research each *unseen* institution once,
  ever; the table is what makes the cost fall with every school added rather than repeating.
  Match institutions by school, not by exact string — the lists carry many spellings of one
  school (`University of California–Irvine` = `UC (Irvine)`), and the table key is canonical.
  The sourcing channel that works when usnews.com times out is **Yahoo search** (`https://
  search.yahoo.com/search?p=<school>+us+news+2026+ranked`), which surfaces the verbatim
  "In the 2026 edition of Best Colleges, <school> is ranked No. #N in <category>" line;
  never write a label without that verbatim 2026 figure, and never guess or use a prior-year
  number. `npm run check:ranks` (chained into `npm run build`) enforces that every
  ranked-**bucket** college has a label and that no institution's label conflicts across
  schools — but it does **not** catch a label missing on a `cats: []` college, so the
  inclusive rule above is a research obligation, not something the check will flag for you.
- **`src/data/brands.ts` degrades gracefully** — `brandFor()` falls back to slate
  `#5b6472` plus initials derived from the name (`brands.ts:70`). So a missing entry is not
  a breakage, but the school ships with a generic badge and no crest. Add color + initials
  deliberately; do not let the fallback ship by omission. The same entry carries the
  **`welcomeVideoUrl` from step 1b** (embed form) — or omits it per the user's explicit
  "none".
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
  | `scripts/i18n_fields.mjs:334` | per-slug `values.<slug>` / `subs.<slug>` / `quals.<slug>.kind` paths |

  The repo has been bitten by exactly this shape before — `check_translations.mjs:53`
  records that Summer Programs "was invisible here until it was added, at 0% coverage."
  Treat a 100% coverage report on the new school as **suspect until you confirm its slug
  is in every list above**. Verify by checking that the new school's strings actually
  appear in the extracted work files, not by trusting a green run.

  **A data-rich school surfaces NEW field paths the extractor cannot classify — expect
  a round of `i18n_fields.mjs` edits, and one specific trap.** `i18n_extract.mjs` reports
  any field path that is neither in `PROSE_KEYS` nor `SKIP_KEYS` as *unclassified* and
  excludes it — so a school that populates a card field no prior school used (Covenant Day
  hit `compareAs`, `questionsTitle`, and the transcript-card `meritTitle`/`depthTitle`/
  `trustTitle`) needs each decided: enum/code → skip, per-school heading → prose. **The
  trap is the opposite direction:** a per-school entry that sets a *lifted chrome heading*
  (`rosterTitle`, `checklistTitle`, `adjacentTitle`, … — the `xTitle`-style fields whose
  translated fallback lives in `sections.*` of the locale catalogs) **pins that heading to
  English in all ten locales**. Covenant Day shipped seven of these; they had to be deleted
  from the data so the translated fallback wins. Rule of thumb: if a heading is the same
  for every school, it is chrome — leave it *off* the data file. Keep an `xTitle` only when
  the heading genuinely varies per school. See the "App-layer checklist" in the
  `ingest-source-material` skill for the same rule stated for ingest.

  **`check:live` is a KNOWN-INCOMPLETE check — do not treat its failures as a Phase-2
  regression, and do not expect adding the slug to make it authoritative.** It fails on
  `main` itself (≈2,900 entries) because it can only walk the **six per-school-directory
  topics** in its own `TOPICS` map; it structurally cannot see `course-offerings`,
  `metric-values`, `financial-aid-report`, or the standalone club **catalog/cluster**
  modules, so overlay entries for those always read "unresolvable" for *every* school.
  Adding the slug to its `EXPORTS` only helps the six topics it does cover. **`npm run
  check:runtime` is the authoritative resolution guard** — it uses the real runtime
  accessors and must pass for every locale; run it per locale and trust it over
  `check:live`. (Confirming `check:live`'s delta is entirely pre-existing cost a full
  investigation cycle on the Covenant Day rollout — this note is that cycle, banked.)
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
