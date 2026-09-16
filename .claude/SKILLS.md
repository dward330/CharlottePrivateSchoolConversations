# 🧰 Custom Skills & Commands — Living Index

> **The register of every custom capability in this repo.** What each one does, when to
> reach for it, and what it deliberately refuses to do.
>
> **📌 This file is LIVING.** Every skill or command that is created, renamed, retired, or
> materially changed gets recorded here **in the same PR that changes it** — see
> [Maintaining this index](#maintaining) at the bottom.

**7 active** · 0 retired · Last updated **2026-09-15**

---

<a id="at-a-glance"></a>

## 🗺️ At a glance

| | Skill | What it's for | Writes code? | Phases |
|---|---|---|---|---|
| 🏫 | [`add-school`](#add-school) | Can this school even be covered? | ❌ Never | — |
| 📝 | [`plan`](#plan) | Write the spec a fresh window can build | ❌ Never | — |
| 🔨 | [`implement`](#implement) | Build a plan, verify it, ship the PR | ✅ Yes | 🇬🇧 → 🌍 |
| 📥 | [`ingest-source-material`](#ingest-source-material) | Sync derived layers with raw research | ✅ Data only | — |
| 📰 | [`add-school-news`](#add-school-news) | Wire a school's live news feed | ✅ Yes | Single |
| 🎓 | [`nc-admissions-data`](#nc-admissions-data) | Government admit rates per school | ✅ Data only | — |
| 🎙️ | [`admissions-episode`](#admissions-episode) | One school's admissions → podcast | ❌ Generates files | Single |

### The main road

```
  /add-school ──▶ /plan ──▶ /implement ──▶ PR ──▶ deploy
     assess       spec        build      merge      ▲
                                          ↑         │
                                   pre-authorized   └── ONLY when the
                                                        user asks, every
                                                        single time
```

Two skills feed research **into** that road at any point:
`nc-admissions-data` (admit rates) and `ingest-source-material` (everything else).
Two stand alone: `add-school-news` and `admissions-episode`.

---

<a id="add-school"></a>

## 🏫 `add-school`

**Assess a candidate school, then hand off to `/plan`.**

`.claude/skills/add-school/SKILL.md` · added 2026-08-15 · updated 2026-08-30

Answers one question before any work starts: **can this school actually be populated
against the schema the app already has?** A school with a thin public footprint yields a
page of empty sections — worse than no page — and that is cheap to discover up front,
expensive to discover at ingest time.

**How it runs**

1. Asks which school, and **what city/state** (disambiguation)
2. Reads the generated `DATA-SCHEMA.md` — never works from memory
3. Runs a scoped, time-boxed, parallel web sweep
4. Reports a **coverage table** — % of each research area, structured card and Compare row
5. Walks each thin area: **dig deeper / include as-is / omit**
6. Asks which Welcome Video the page features
7. Invokes `/plan` with the brief

> **🎯 The bar is computed, not transcribed.** `npm run coverage:floor` derives it from the
> thinnest school already shipped — Davidson Day, **17/30 Compare rows, 7 of 8 areas**.
> The gate is **≥17/30 rows and ≥6/8 areas**, compared inclusively.

> **⚠️ The per-area line is ~50%, deliberately NOT the school-wide 56%** — and it triggers
> a *conversation*, not a rejection. An area's denominator is 4–23, not 30; Davidson Day
> ships with **zero** Summer Programs material; and Course Offerings quantizes to
> 0/25/50/75/100, where 56% is unreachable. **Always print counts beside a percentage.**

**Deliberately cannot:** edit `src/`, write `source-material/`, or run the ingest pipeline.
Only **URLs** carry forward — a sweep sized for percentages produces indicative figures,
not the vetted record.

---

<a id="plan"></a>

## 📝 `plan`

**Research a change and write a durable implementation plan.**

`.claude/skills/plan/SKILL.md` · added 2026-08-02 · updated 2026-08-19
Ships with `plan-template.md`.

Produces one self-contained document at `.claude/plans/<name>.md` that a **fresh Claude
window with no memory of this conversation** can execute. That is the bar for every
judgment call in the skill: if the plan omits something the implementer would guess at,
the plan is not done.

**How it runs**

1. Asks what to plan **and** the plan name in one message
2. Clarifies only what would change the plan
3. Researches the codebase (the bulk of the work)
4. Decides **one phase or two** — see below
5. Writes the plan
6. Registers it in `INDEX.md` as *Not implemented* and gives you the exact `/implement` command

> **🔒 Writes no app code.** Its only outputs are the plan, the index row, and any
> `source-material/**/*.md` it fetched — left **uningested** for `/implement` to run on a
> branch. A tempting one-line fix goes *into the plan*, not into `src/`.

> **📌 It must write the phase split into the document**, not leave it implied. Wording
> settles only once it's seen rendered, and propagating it to nine locales beforehand
> multiplies every revision by nine — into languages nobody here reads.

---

<a id="implement"></a>

## 🔨 `implement`

**Execute a documented plan: build, verify, PR, close the loop.**

`.claude/skills/implement/SKILL.md` · added 2026-08-02 · updated 2026-08-19

The plan is the spec. This skill's job is to execute it faithfully, verify it honestly,
and leave the index telling the truth about what shipped.

**How it runs**

| Step | |
|---|---|
| 1 | Pick the plan (or list unimplemented ones and ask) |
| 2 | **Gate** — approvals, open questions, staleness, staged research |
| 3 | Branch (never commit to `main`) |
| 4 | 🇬🇧 **Build Phase 1 — English only** |
| 5 | Verify Phase 1 |
| 6 | 🛑 **STOP** — hand the English back for review |
| 7 | 🌍 Phase 2 — the other nine locales, *after* they confirm |
| 8 | Commit and PR |
| 9 | Flip the index row to *Implemented* with the PR link |

> **🛑 Step 6 is a real stop.** Both phases land in one PR, but between them the plan sits
> at `English shipped` awaiting your review of the wording.

> **⛔ Merging is pre-authorized. Publishing is not.** `gh pr merge --squash
> --delete-branch` needs no permission; `npm run deploy` needs a fresh instruction **every
> single time**. Finish by stopping.

---

<a id="ingest-source-material"></a>

## 📥 `ingest-source-material`

**Keep the derived layers in sync with raw research.**

`.claude/skills/ingest-source-material/SKILL.md` · added 2026-07-03 · updated 2026-08-30
Ships with `build_docs.py`. *The oldest skill in the repo.*

Regenerates the distilled notes in `.claude/docs/` and the manifest `src/data/schools.json`
from `source-material/`, then covers the **hand-maintained layers the pipeline does not
touch**: metric rules in `src/lib/metrics.ts`, Compare numbers in `metricValues.ts`,
structured reports in `financialAidReports.ts`, locale catalogs, and SEO verification.

```
source-material/<topic>/<school>/*      raw (PDFs gitignored, .md committed)
          │
          ▼  build_docs.py
.claude/docs/  +  src/data/schools.json      generated
          │
          ▼  hand-maintained checklist
metrics.ts · metricValues.ts · financialAidReports.ts · locales/*.json
```

> **🎨 Hard constraint — ingestion never changes the UX.** Enriching, correcting and
> extending existing cards is free. A **new card, section, stat tile, Compare row, metric
> key or topic** — or any reordering — needs your explicit approval **first**. The skill
> prompts and waits; it lands the data meanwhile and reports the deferred suggestion.
>
> *Scope:* this governs **ingestion**, not design work. A Claude Design handoff or a direct
> "add this UI" request is *expected* to change the UX and needs no advance approval.

---

<a id="add-school-news"></a>

## 📰 `add-school-news`

**Wire a school's live "Latest News" section.**

`.claude/skills/add-school-news/SKILL.md` · added 2026-08-27 · updated 2026-08-28

Every school's news board runs on a different CMS with different markup. **There is no
universal parser.** This skill is the per-school procedure plus the traps that silently
produce a plausible-but-wrong result.

**Two blocking questions, asked before anything else**

| Step 0 | 🛑 Which school — **never inferred**, by any route |
| --- | --- |
| **Step 1** | 🛑 The news board **URL** — never derived, by any route |

Then: inspect the real HTML → write the parser → persist provenance → register in the app
→ **allow the host in the CORS Worker** → verify.

> **🔑 Step 5b needs a Cloudflare token from you.** A school registered in
> `src/lib/news/sources.ts` but missing from the Worker's `ALLOWED_HOSTS` fails with
> `403 Host not allowed` — which renders as the error state and **looks exactly like a
> parser bug**. Ask for the credential early, not after the parser is written.

**Five documented traps:** the photo may not be in `src` · `og:description` may be
boilerplate · a photo caption can outrank the opening paragraph · a post may link to
**another host** (most such rows are dropped) · the board may carry no summary at all.

> **⛔ THE ONE EXCEPTION — this section is NEVER translated.** Headlines, dates and
> previews render in the source language in **every** locale. Not deferred work, not a bug.
> It cannot be translated in principle (tomorrow's headline doesn't exist today), it is a
> citation surface, and render-time machine translation is explicitly rejected. The chrome
> *around* the articles **is** translated in all ten catalogs. Adding news is therefore
> **always single-phase** — there is no Phase 2.

---

<a id="nc-admissions-data"></a>

## 🎓 `nc-admissions-data`

**Pull government-published NC admissions outcomes for a school.**

`.claude/skills/nc-admissions-data/SKILL.md` · added 2026-08-19
Ships with `reference/METHOD.md` — **required reading, not an appendix.**

Applied / Admitted / Enrolled / Admit Rate / Yield Rate per institution, **Fall 2016–2025**,
for every NC high school × every UNC-system campus. This is a *third-party,
government-published* admit rate rather than the school's own marketing figure — which
makes it unusually good evidence for the College Support area.

> **🔍 Use it BEFORE concluding a school's college outcomes are "not published."** The
> dashboard covers private schools too.

**The standing target set** — settled 2026-08-19, never re-derived per task, copied
**verbatim**:

```
UNC-Chapel Hill            NC State University        UNC Charlotte
East Carolina University   UNC Wilmington             UNC Greensboro
```

> **⚠️ Hyphenation is inconsistent in the dashboard's own house style** (`UNC-Chapel Hill`
> hyphenated; the others not), and it is **`East Carolina University`**, not "Eastern".
> An exact-match filter fails **silently** on either slip.

> **🚫 Do not improvise the scrape.** The dashboard is canvas-rendered and blocks every
> simple export path — and the blocked paths **return HTTP 200 while serving the wrong
> sheet.** Two selection traps produce plausible-but-wrong tables that render without error.

**Two rules travel with the data:** always carry the **denominator** (these are small
cells — 44 applicants at one campus in one year), and label the figure as a joint property
of **school × university**, never either one's admit rate.

Lives in the app as `ncAdmissions`, the **first card of College Support**. Pooled five-year
rate is `sum(admitted)/sum(applied)` — never the mean of five annual rates.

---

<a id="admissions-episode"></a>

## 🎙️ `admissions-episode`

**Turn one school's admissions process into a podcast episode.**

`.claude/commands/admissions-episode.md` · added 2026-09-06
*A slash command rather than a skill directory — the only one so far.*

Produces the PDF, the prompt and the upload steps for an episode of *Charlotte Private
School Conversations* that walks a parent through **how to actually apply** to one school.

1. Lists every school that **has** admissions data — computed at run time, never hardcoded
2. 🛑 **No-data gate** — no Admissions research area means *stop*, write nothing
3. Checks the app's data against the school's **own live admissions site**
4. Hands back the PDF + prompt + NotebookLM steps

> **🔁 Run it once per school, every time. The freshness check is the point.**

> **⚠️ NotebookLM drops hedges and conditionals.** A correct PDF does **not** mean a correct
> episode — diff the episode's *claims* against the PDF, and regenerate **all** schools
> after touching `PROMPT_TEMPLATE`.

---

<a id="retired-skills"></a>

## 🪦 Retired skills

*None yet.*

When a skill is removed or superseded, it moves here with its dates and a one-line reason —
it is **not** deleted from this file. Knowing that something was tried and dropped is worth
more than a clean list.

| Skill | Active | Retired | Why |
|---|---|---|---|
| — | — | — | — |

---

<a id="maintaining"></a>

## 🔄 Maintaining this index

**This file is a living index. It is updated in the same PR as the change it describes —
never as a follow-up.**

### When to update

| Event | What to do here |
|---|---|
| ✨ **A new skill or command is created** | Add a full section **and** an At-a-glance row. Update the counter. |
| ✏️ A skill's behaviour materially changes | Update its section + the `updated` date |
| 🔀 A skill is renamed | Rename the section, note the old name in its entry |
| 🪦 A skill is retired | Move it to **Retired skills** with a reason — do not delete |
| 📄 A supporting file is added | Note it under the skill's path line |

### The rule

> **Creating a skill without adding it here leaves the index lying.** A register that is
> only *sometimes* current is worse than none, because it gets trusted. The index is part
> of the skill, the same way a plan document is part of the feature.

This applies to anything that lands in `.claude/skills/` or `.claude/commands/` — including
skills created by `/plan` and `/implement`, and one-off commands.

### Writing an entry

Keep the shape consistent so the file stays scannable:

- **Title line** — emoji + name, then a one-sentence purpose in bold
- **Path line** — file path · `added YYYY-MM-DD` · `updated YYYY-MM-DD` · supporting files
- **Body** — what it does and how it runs (numbered steps or a table)
- **Blockquote callouts** for the things that bite: hard constraints (🔒 ⛔), traps (⚠️ 🚫),
  blocking questions (🛑), credentials needed (🔑)
- **A "deliberately cannot" note** where the skill has real boundaries

Prefer recording *why* a rule exists over restating the rule. Most callouts above exist
because something already went wrong once.

### Checking it

```bash
ls .claude/skills/*/SKILL.md .claude/commands/*.md   # should match this file
```

---

<sub>Standing project rules — the PR workflow, the deploy boundary, the i18n and
data-provenance standards — live in <a href="../CLAUDE.md"><code>CLAUDE.md</code></a>.
This file covers the skills only.</sub>
