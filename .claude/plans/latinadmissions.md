---
name: latinadmissions
title: Add the Admissions research area for Charlotte Latin School
status: implemented
phases: 2
created: 2026-08-31
branch: feat/latin-admissions
prs: [262]
---

# Add the Admissions research area for Charlotte Latin School

## Goal

Ship the Admissions research area for **Charlotte Latin School** — the fifth school in the
area. Latin runs **four** admission tracks (TK/Kindergarten, Lower 1–5, Middle 6–8, Upper
9–12) on one shared four-step spine, differing in the assessment, who schedules the Visit
Day, whether an interview is included, and the deadline.

Its distinguishing structural fact: **Latin publishes no decision date, no notification time
and no enrollment contract date, for any band.** Every band's timeline ends at the
application or all-file-material deadline. That is a confirmed absence, re-verified across
three official pages — not a research gap — and it shapes the card.

We'll know it worked when `/school/charlotte-latin/` renders an Admissions section above
Course Offerings with a working four-band selector, and
`/school/charlotte-latin/admissions-checklist/?band=tkk` prints a clean one-band sheet.

## Context

### What exists today

Four schools ship: `providence-day`, `charlotte-country-day` (#252), `charlotte-christian`
(#254), and `cannon` (plan `cannonschooladmissions`, not yet built). Infrastructure is
school-agnostic.

- `src/data/admissionsPrograms.ts` — types, `ADMISSIONS_CARDS` (one card, key `guide`), the
  `PROGRAMS` map, `loadAdmissionsOverlay()`.
- `src/data/admissionsPrograms/charlotte-christian.ts` — **the closest model.** Four bands,
  CAIS assessments, a Finalsite-adjacent portal. Read it first.
- `src/components/AdmissionsProgram.tsx` — the renderer.
- `src/pages/AdmissionsChecklist.tsx` — the standalone print page; already warms the overlay.
- `src/lib/metrics.ts:43-49` — `admissions` RULES is a single `match: /.*/`. **No new metric
  key.**
- `scripts/i18n_topics.mjs` — `charlotte-latin` is already in `SLUGS`. No extractor change.
- `scripts/seo_routes.mjs:46` — the checklist route is deliberately absent from SEO routes.
- `src/locales/*.json` — every `admissions.*` chrome key exists in all ten catalogs. **No new
  chrome keys.**

### ⚠️ Lessons from the shipped admissions PRs — read before authoring

**This is the most important section of the plan.** Five review passes (#252, #254, #258,
#261) have each *removed* material from these cards. The trajectory is unambiguous — Latin
should be authored at the endpoint, not walked there through another review cycle.

**Measured 2026-08-31 across the two shipped cards:**

| | Country Day (after #261) | Charlotte Christian (after #258) |
|---|---|---|
| `watchOuts` per band | 1 · 1 · 2 | **0 · 0 · 0 · 0** |
| URL-less `sources` notes | 1 | **0** |
| `**bold**` in `rules[].text` | 0 | 0 |

**1. `rules[].text` is rendered RAW — it has NO markdown support.**
`AdmissionsProgram.tsx:249` renders `<strong>{r.title}</strong> {r.text}` directly. A
`**bold**` span there **ships as literal asterisks**. `Emphasized` covers `steps[].detail`,
`watchOuts[].text` and `aid.text` — **not** `rules[].text`, and not
`deadlines[].value`/`label`. This shipped briefly on Country Day (PR #252, commit `652e6b1`)
and had to be fixed.

**2. The card is PARENT-FACING. Maintainer-facing argument gets cut.**
Country Day's `rules[1]` was originally *"Ignore the header, read the dates."* — telling the
reader the school's own page header was wrong and arguing it from the page's wording. Cut at
review as too much maintainer reasoning for a parent-facing card, and the checklist
disclaimer dropped the same argument so the claim was not merely relocated. **The finding
moved to the file header comment and the research file.**

**3. STANDING EDITORIAL RULE — never describe what a source document contains.**
Stated by the user with edit 4 of PR #261: *"the consortium brochure covers Pre-K through
Grade 4"* tells a parent about a brochure instead of telling them the fact. **We speak as the
party holding the information.** State the fact; do not narrate the source.

**4. Watch-outs are the most-cut surface on this card.** Country Day shipped 2/2/2 and was
trimmed to 1/1/2; Charlotte Christian shipped 2/2/2/2 and was trimmed to **`[]` in every
band**. Its file header records this as *"EMPTY BY DECISION, not by a gap in the research…
Do NOT read them as unresearched and backfill them."*

The reason both trims were safe: **the facts were already carried by `steps[].detail` and
`checklistCallout`**, so nothing had to be relocated when the cards went. That is the test —
a watch-out earns its place only if its fact is *not* already in the band's steps.

**5. URL-less `sources` notes get cut.** Charlotte Christian shipped two "Retrieved Aug 2026"
prose notes in its citation row — one stating no faith component is published, one listing
what the school does not publish. Both removed (#258) as *"prose paragraphs in a row of
citation links"* and as duplicates of what the header and steps already carry.

**6. Prose is tightened, not just deleted.** Edit 8 reworded elliptical telegraphese
(`— application Jan 2 rather than Jan 15, decisions Feb 26`) into full clauses
(`— applications are due Jan 2 rather than Jan 15, decisions release Feb 26`). Write full
sentences the first time.

**7. Annotate every deliberate omission at the cut site.** One line, naming it as a decision
with a date, so a later enrichment pass reads it as intent rather than a gap.

### How this changes Latin's authoring

- **`watchOuts: []` in all four bands.** Charlotte Christian's endpoint, reached one review
  earlier. Every fact those cards would have carried goes into `steps[].detail` and
  `checklistCallout` — where both trims proved it already belonged.
- **No URL-less trailing source note.** The NOT-PUBLISHED register lives in the file header
  and the research file.
- **No markdown in `rules[].text`**, and `rules` stay plain and parent-facing.
- **Never narrate the CAIS brochure.** Say what the assessment is, not what the brochure
  covers — Latin's own pages say "refer to the CAIS brochure", which is exactly the phrasing
  rule 3 forbids reproducing.
- The prior-cycle "rolling admissions" blog language, the shifting-URL cycle history, and the
  Private School Review citation correction are **file-header / research-file** material.

### Renderer facts (confirmed by reading the component)

- `.ad-deadlines` is `repeat(auto-fit, minmax(150px, 1fr))` (`src/index.css:5242`) — **a
  3-tile strip is a first-class layout.** Directly relevant: TK/K and Lower publish only
  three tiles.
- `RULE_ICONS[i % RULE_ICONS.length]` — `rules` may be any length.
- **`watchOuts: []` is a supported, already-exercised path.** `AdmissionsProgram.tsx:300`
  adds `is-wide` when the array is empty, skips the `.ad-watch` wrapper entirely, and
  `src/index.css:5275` collapses `.ad-grid` to one column so the stepper takes the full card
  width. Charlotte Christian ships this in all four bands. **No code change needed.**
  *(The type docstring still says "exactly 2 per band" — it predates PR #258 and is stale.)*
- `AdComparisonRow.cells` accepts `{ all: string }` for a row identical in every band.
- `headline` is load-bearing — rendered as the collapsed `.topic-teaser`.
- `single = data.bands.length === 1` collapses the selector — **not** used here.

## Decisions

- **Four bands: `tkk`, `ls`, `ms`, `us`** — the school's own four tabs. Keys are new; do not
  copy Providence Day's `tkk`/`g15`/`g612` or Christian's `jkk`/`g1`/`g24`/`g512`.
- **Bands END at their published deadline. No decision or contract step, in any band.**
  Latin publishes none. Inventing one, or carrying a prior cycle's, violates the cycle rule.
  This is the single biggest divergence from the other four cards.
- **The `$2,500` deposit lives in the `aid` strip, not a deadline tile.** With no decision
  step to attach to, and published on the Tuition page as an enrollment condition rather than
  a dated milestone, a deadline tile would imply a date the school does not publish.
- **TK/K and Lower School get THREE deadline tiles; Middle and Upper get four.** The lower
  bands publish no all-file-material deadline. `auto-fit` handles it. **Do not pad with an
  invented fourth tile, and do not use `unpublished: true`** — that flag is for a *known
  constant* standing in for a missing date (Providence Day's `4:00 p.m.`). Latin has no
  constant; the honest shape is three tiles.
- **`rules[0]` names Finalsite Enrollment** — Latin's portal, at
  `charlottelatin.fsenrollment.com`. Providence Day is Charger Commons, Country Day
  Veracross, Christian myCCS, Cannon Finalsite Enrollment. **Five schools, four portals** —
  Latin and Cannon share a vendor, so this is the first card where borrowing another school's
  rule text is *nearly* right and therefore easy to get subtly wrong. Write Latin's own.
- **`rules[1]` is the plain cycle caveat.** Per the PR lesson above — no argument about
  prior-cycle URLs or blog posts.
- **`watchOuts: []` in all four bands, by decision.** This is Charlotte Christian's shipped
  endpoint (PR #258) and the direction Country Day was trimmed toward (#261). Every fact a
  watch-out would carry goes into `steps[].detail` and `checklistCallout` instead — which is
  precisely why both prior trims were safe. **Annotate this in the file header** as a
  decision, not a research gap, so a later pass does not backfill it.
- **No URL-less trailing note in `sources`.** Removed from Charlotte Christian at review as
  prose in a row of citation links. The NOT-PUBLISHED register lives in the file header and
  the research file.
- **Never narrate the CAIS brochure** — standing editorial rule from PR #261. State the
  assessment; do not tell the reader what a brochure covers.
- **Rolling admissions is NOT shipped as current policy.** Prior-cycle blog language, not
  restated on the live page. With `watchOuts: []` it has no home on the card at all — it
  stays in the file header and the research file.
- **The Nest preschool's sibling/employee preferences are NOT extended to TK–12.** They
  govern a separate licensed preschool. This is a trap the research file flags explicitly.
- **Tuition figures are NOT cited in the card** — they belong to Financial Aid & Tuition.
  Recorded in source-material for provenance.
- **Contacts: all nine staff, with no individual phone/email** — the school publishes none
  per person. Address, the office line, and the two shared mailboxes go in `contacts.address`.
- **Two phases.** New research prose in `src/data/**`.

## Approvals needed

**None.** Adding a school to an existing area is automatic under the UX-design gate
(CLAUDE.md, §6 of the schema doc): no new card, section, stat tile, Compare row, metric key,
or topic. Every field Latin populates already renders for four other schools.

The user reviewed the coverage assessment and approved the build.

## Source material

**One file, written during planning, uncommitted.** `/implement` ingests it as step 1.

| File | Contents |
|---|---|
| `source-material/admissions/charlotte-latin/Charlotte Latin - Admissions - Grade-by-Grade Application Plans.md` | Cycle note, the no-decision-date finding, four bands, cross-band table, shared timeline, all-applicant policies, aid, the nine-person team, NOT PUBLISHED register, 8 official source URLs |

CAIS consortium detail (per-grade instrument, $300 fee, age and coaching rules) lives in
`source-material/admissions/charlotte-country-day/… CAIS Testing Consortium.md` — already
committed. Latin is a listed member school.

### What the deep research pass found

Official charlottelatin.org only, per the user's instruction. **Every structural claim was
re-verified tab by tab against the live site on 2026-08-31.**

**Confirmed verbatim:** four tabs; TK/K **Jan 2, 2027** vs all others **Jan 15, 2027**; "our
office will schedule" (TK/K) vs "Schedule a Visit Day" (all others); WPPSI → WISC-V → ISEE
with Grade 1 WPPSI, Grades 2–4 WISC-V, Grade 5 ISEE; interview named only for Middle and
Upper; **Feb 26, 2027** testing + all-file for Middle/Upper only; TK/K and Lower publish no
all-file deadline; Clarity opens Sept 15, due Jan 15 2027; **$2,500** deposit "deducted from
the second tuition payment"; all nine admissions staff.

**Newly found, not in the research document:**
1. **TK/K Fly By Open House — October 10, 2026, 9:30–11:00 a.m.** The only dated admissions
   event published. Goes in the TK/K band's optional-events step.
2. **"Each applicant is assigned an admission counselor who will guide you through the
   process"** — verbatim from Meet Our Team. Strong `contacts` framing.

**Corrections to the research document:**
3. **The ISEE ladder is three separate statements, not one range.** The document says "Grade
   5 and Grades 6–**11**"; the live tabs say Middle School "Grades 6-8 applicants take the
   ISEE" and Upper School "Grades 9-11". Same coverage, but the Grade 12 gap depends on
   reading the Upper School tab precisely.
4. **Mary Yorke Oates' title was cited to Private School Review**, a third-party site, in a
   document whose stated policy is official-sources-only. The **official Meet Our Team page**
   gives the same title, so the finding stands with the citation corrected.

**Confirmed absences** (checked, not assumed): no decision/notification date and no contract
date on the Application Process, Tuition, or Admissions pages; no TK/K age cutoff on the
Lower School academics page; no application fee on any public page.

**Not retrievable:** the main events calendar is JavaScript-rendered and could not be read
server-side, so admissions events beyond the Fly By may exist behind it. Recorded as such.

## Out of scope

- **The other six schools.** They stay absent from `PROGRAMS`.
- **Compare rows.** Admissions contributes none.
- **Tuition figures in the card** — see Decisions.
- **The Nest preschool's admission policy.**
- **Any third-party source.** Official site only, per the user's instruction.
- **Restructuring the four shipped/planned cards.**
- **Deploying.** Merging is pre-authorized; publishing is the user's separate call.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout -b feat/latin-admissions` from an up-to-date `main`.

2. **Ingest the source material.** Run `ingest-source-material` over
   `source-material/admissions/charlotte-latin/`. Confirm the topic reports **5/11** (or
   **4/11** if `cannonschooladmissions` has not landed) and that the file folds onto the
   single `redesign-research` key — a new key surfaces as ⚠️ in the schema doc and in
   `npm run check:metrics`.

3. **Create `src/data/admissionsPrograms/charlotte-latin.ts`.** Export
   `export const charlotteLatin: AdmissionsProgram = { guide: { … } }`. Open
   `charlotte-christian.ts` alongside as the structural model. Author, per the research file:

   - **File header comment** — mirror `charlotte-country-day.ts`'s. It must carry: the source
     file; the **2026–27 cycle** and that prior-cycle 2025–26 dates (Dec 31 2025 / Jan 15 2026
     / Feb 27–28 2026) are CLOSED and never carried forward; the **no-decision-date finding**
     and that bands deliberately end at their deadline; that "rolling admissions" is
     prior-cycle blog language not restated on the live page; the **`rules[].text` renders
     raw — no markdown** editor note; and that TK/K and Lower carry three tiles by design.
   - **`headline`** — the collapsed teaser. Pick your band; the guide personalizes.
   - **`cycle`** — `'2026–27 entry cycle'` (en-dash).
   - **`stats`** — four tiles: `4` bands · `Jan 2, 2027` TK/K deadline · `Jan 15, 2027` Grades
     1–12 deadline · `$2,500` enrollment deposit.
   - **`rules`** — **exactly two, no markdown, parent-facing**:
     (a) the **Finalsite Enrollment portal** rule — inquiry → family profile → RSVP for
     events, submit materials, locate forms, meet deadlines, and read decisions;
     (b) the **plain cycle caveat** — every date below is the 2026–27 cycle; cycle dates shift
     year to year, verify before acting.
   - **`spineNote`** — the shared four-step spine (apply online → attend a Visit Day →
     complete a standardized assessment → meet the deadlines), noting what changes is the
     assessment, who schedules the Visit Day, whether there is an interview, and the deadline.
   - **`bands`** — four, in calendar order. Each with `deadlines`, `steps`, **exactly two**
     `watchOuts`, a `checklistCallout` and `checklistRows`:

     | key | label | sublabel | deadline tiles |
     |---|---|---|---|
     | `tkk` | `TK / Kindergarten` | `WPPSI · office schedules your Visit Day` | **3**: Jan 2 2027 (application) · Oct 10 2026 (Fly By Open House) · Jan 15 2027 (financial aid) |
     | `ls` | `Lower School · Grades 1–5` | `WPPSI → WISC-V → ISEE by grade` | **3**: Jan 15 2027 (application) · Jan 15 2027 (financial aid) · *(see note)* |
     | `ms` | `Middle School · Grades 6–8` | `ISEE · interview at Visit Day` | **4**: Jan 15 2027 · Feb 26 2027 (testing) · Feb 26 2027 (all file material) · Jan 15 2027 (financial aid) |
     | `us` | `Upper School · Grades 9–12` | `ISEE · interview + Student Ambassador` | **4**: same as Middle |

     **Tile note:** the strip is a *deadline* strip, so an event date (the Fly By) is a
     judgment call — see the Open questions. If the Fly By is not used as a tile, `tkk` and
     `ls` both carry **two** tiles, which `auto-fit` still renders correctly but which may
     read thin; decide in the browser.

     **No `unpublished: true` anywhere** — Latin publishes no constants standing in for
     dates.

     **Per-band `steps`**, from the research file's band tables. **No decision or contract
     step in any band** — the last step is the deadline or the assessment. Write full
     sentences, not telegraphese (PR lesson 6).

     **`watchOuts: []` in all four bands** — see Decisions and PR lesson 4. The facts that
     would have gone there must be **carried by `steps[].detail` and `checklistCallout`
     instead**. Check each one lands somewhere before moving on:

     | Fact | Where it goes |
     |---|---|
     | TK/K's deadline is 13 days earlier than every other grade | `tkk` application step + `checklistCallout` |
     | The office schedules TK/K's Visit Day; families schedule the rest | each band's Visit Day step |
     | TK/K age eligibility is not published ("newly five") | `tkk` application step. **Do NOT cite NC's statutory cutoff** |
     | The assessment changes twice inside Lower School (Gr 1 WPPSI · 2–4 WISC-V · Gr 5 ISEE), via two booking routes (CAIS vs ERB) | `ls` assessment step |
     | TK/K and Lower publish no all-file deadline — the portal checklist is authoritative | those bands' `checklistCallout` |
     | Feb 26 is the binding constraint for Middle/Upper — back-plan ISEE registration | `ms`/`us` assessment step + `checklistCallout` |
     | Middle's Visit Day is an assessment event (interview, on-site assessment, class observation) | `ms` Visit Day step |
     | Upper's Visit Day pairs an interview with a Student Ambassador shadow day | `us` Visit Day step |
     | Grade 12 assessment is not published (tab covers 9–11) | `us` assessment step |
     | No decision or contract date is published, any band | `checklistCallout` in every band + the comparison row |

     **Annotate the empty arrays** with a one-line comment naming the decision and date, per
     PR lesson 7 and Charlotte Christian's file header.
   - **`aid`** — Clarity, **opens September 15, 2026**, **due January 15, 2027** for priority
     round, one application covers multiple children, "typically takes 30 minutes or less."
     **No aid application fee is published** — and do **not** ship the prior-cycle $60
     SSS/NAIS figure. Carry the **$2,500 non-refundable deposit** here: "required at the time
     of initial enrollment or reenrollment… deducted from the second tuition payment," and
     "No student can be enrolled or reenrolled without this deposit."
     `button: 'Financial Aid & Tuition'`.
   - **`comparison`** — the research file's cross-band table: application deadline, who
     schedules the Visit Day, standardized assessment, interview at Visit Day, Visit Day
     character, testing/all-file deadline, financial aid. Use `{ all }` for rows identical in
     every band (financial aid Jan 15; the $2,500 deposit; the portal). **Include a
     "Decision & contract" row reading "Not published — confirm with admissions" as an
     `{ all }` row** — the honest way to show an absence the other four cards fill.
   - **`contacts`** — address `9502 Providence Road, Charlotte, NC 28277 · admissions
     704-846-7207 · admissions@charlottelatin.org`. **All nine staff**, name + published
     title, **no individual phone/email** (the school publishes none). Consider opening
     `contacts.title` or the kicker with the assigned-counselor line.
   - **`checklist`** — `portalNote` naming Finalsite Enrollment; `aidPanel` (Clarity, Sept 15
     open, Jan 15 due, $2,500 deposit); `contactPanel` (office line, both mailboxes, address);
     `disclaimer` naming the 2026–27 cycle, the Aug 2026 retrieval, that items marked
     "confirm" are portal-gated or unpublished, and "Compiled by Charlotte School Compare; not
     affiliated with Charlotte Latin School."
   - **`sources`** — the eight official URLs from the research file, **every one carrying a
     URL**. No trailing prose note: Charlotte Christian's two URL-less "Retrieved Aug 2026"
     notes were cut at review (PR #258) as prose in a row of citation links. The
     NOT-PUBLISHED register (decision/contract dates, application fee, TK/K age cutoff,
     recommendation forms, waitlist, sibling/legacy/faculty preference, re-application,
     transfer/mid-year, international I-20/TOEFL, Grade 12 assessment) lives in the **file
     header comment** and the research file.

   **Six content traps, each of which produces plausible-looking wrong text:**
   - **No `**bold**` in `rules[].text`** — renders as literal asterisks. See the PR lesson.
   - **No decision or contract date, anywhere.** Not in a tile, a step, or the comparison.
   - **Do not ship "rolling admissions" as current policy** — prior-cycle blog language.
   - **Do not extend The Nest preschool's sibling/employee preference to TK–12.**
   - **Do not attribute North Carolina's statutory kindergarten cutoff to the school.**
   - **Grades 6–8 and 9–11 are separate ISEE statements**, not a 6–11 range; Grade 12 is
     unpublished.

4. **Register the school** in `src/data/admissionsPrograms.ts`: import `charlotteLatin` from
   `./admissionsPrograms/charlotte-latin.ts` and add `'charlotte-latin': charlotteLatin` to
   `PROGRAMS`. Update the module docstring's school count.

5. **Regenerate the schema doc.** `npm run schema`, then `npm run check:schema`. Admissions
   moves to **5/11** (or 4/11 if Cannon has not landed) in both the research-area grid and the
   structured-card section, with `charlotte-latin` dropping off the "absent" list.

6. **Verify in a browser** (below), then commit and open the PR.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording is what they want.

### Phase 2 — Every other locale

Research prose → the **overlay layer** (`PROSE_TRANSLATED` in `src/lib/i18n.ts`: `es`, `bn`,
`ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`). The `src/locales/*.json` chrome catalogs need no
change.

Follow `.claude/docs/prose-translation-architecture.md` for the mechanism and a per-locale
rollout doc for register. Do not re-derive the method.

1. **Extract** the new English into the nine work files — the extractor already knows the
   `admissions` topic and the `charlotte-latin` slug.
2. **Translate** each locale's new units. Key by English text, never by index.
3. **Rebuild** the nine `src/data/overlays/admissions.<lang>.json` overlays.
4. **Run the locale checks** (below), then commit into the same PR.

Traps specific to this card:

- **Figures copied char-for-char** — `$2,500`, `Jan 2, 2027`, `February 26, 2027`,
  `9:30–11:00 a.m.`. Never re-typed, unit-converted, or separator-swapped.
- **`hi` / `te` regroup at render** — the data stores the English 3-3-3 figure.
- **`fa` / `ar` are RTL** — isolates are applied at render; the overlay stores none.
- **Identifiers stay English** — `WPPSI`, `WISC-V`, `ISEE`, `ERB`, `CAIS`, `Clarity`,
  `Finalsite Enrollment`, `Transitional Kindergarten`, `TK`, `Lower School`, `Middle School`,
  `Upper School`. **`Visit Day`, `Fly By Open House` and `Student Ambassador` are the trap** —
  Latin-specific event and role names that read as ordinary prose, the French-inverse leak
  shape, and `Visit Day` appears in every band.

## Files touched

| File | Change |
|---|---|
| `source-material/admissions/charlotte-latin/Charlotte Latin - Admissions - Grade-by-Grade Application Plans.md` | new — written during planning, uncommitted |
| `src/data/admissionsPrograms/charlotte-latin.ts` | new — the guide data, four bands |
| `src/data/admissionsPrograms.ts` | edit — import + `PROGRAMS` entry + docstring count |
| `src/data/schools.json` | regenerated by ingest |
| `.claude/docs/*` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated by `npm run schema` |
| `src/data/overlays/admissions.<9 locales>.json` | Phase 2 — rebuilt |
| `.claude/plans/INDEX.md` | edit — flip to Implemented + PR |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean. **Then `npm run build` and read its exit code** — `tsc -b`
      inside the build catches type errors `--noEmit` has missed in this repo.
- [ ] `npm run check:schema` — passes; the Admissions count went up by one.
- [ ] `npm run check:metrics` — no new unmatched subtopic for `admissions`.
- [ ] `npm run check:seo` — passes.
- [ ] `npm run build` — succeeds end to end.
- [ ] **grep the new data file for `**`** — confirm no markdown in `rules[].text` or in any
      `deadlines[].value`/`label`. `Emphasized` fields (`steps[].detail`, `watchOuts[].text`,
      `aid.text`) may use it.
- [ ] **Browser check** at `/school/charlotte-latin/`, via Playwright with
      `domcontentloaded` (**not** `networkidle` — the Latest News fetch never idles):
  - Admissions renders **above** Course Offerings; teaser shows `headline`.
  - The selector shows **four** joined buttons; check narrow/mobile widths.
  - Clicking each band swaps the deadline strip and the stepper.
  - **Every band renders `is-wide`** — a full-width stepper, no empty right-hand column.
    Compare against `/school/charlotte-christian/`, which ships the same shape.
  - **TK/K and Lower render a 3-tile (or 2-tile) strip cleanly** — no stretched or orphaned
    tile. This is the first card to ship an uneven tile count across bands.
  - **No band shows a decision or contract tile or step.**
  - The comparison table renders; the "Decision & contract — not published" `{ all }` row
    spans all four columns.
  - The contacts grid renders acceptably with **nine** entries (`--ad-n: 9`).
  - **Sweep the fully expanded card and the checklist page for literal `**`** — the PR #252
    defect. Check all four bands.
- [ ] **Checklist page** for all four bands
      (`?band=tkk|ls|ms|us`): correct title, rows, aid and contact panels. Print-preview one.
- [ ] **Read the six trap fields back against the research file**: no markdown in rules; no
      decision/contract date anywhere; rolling admissions absent as current policy; The Nest
      not extended to TK–12; no NC statutory cutoff attributed; Grades 6–8 / 9–11 stated
      separately with Grade 12 flagged unpublished.
- [ ] **Review-preference audit** — the checks that come from PRs #258 and #261:
  - `watchOuts: []` in all four bands, each annotated as a decision.
  - **No URL-less note in `sources`** — every entry carries a URL.
  - **No sentence describes what a document contains** — grep the file for `brochure`,
    `booklet`, `page covers`, `the site says`. State facts, not sources.
  - Every fact from the step-3 table lands in a step or callout — nothing silently dropped
    with the watch-outs.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves.
- [ ] `npm run check:live` — clean; all three gates.
- [ ] `npm run check:sepdrift -- --lang <each>` — no separator re-typings.
- [ ] `npm run check:figures` / `check:money` / `check:currency` — figures intact.
- [ ] `npm run check:chrome` — clean (no new chrome expected).
- [ ] `npm run build` — succeeds with locale gates chained.
- [ ] **Browser spot-check in at least two locales, one RTL (`fa`/`ar`) and one lakh/crore
      (`hi`/`te`)**: translated prose renders, figures read correctly in RTL, and `Visit Day`
      / `Fly By Open House` / `Student Ambassador` / `WPPSI` / `ISEE` are still English.

## Risks

| Risk | Mitigation |
|---|---|
| `**bold**` lands in `rules[].text` and ships as literal asterisks | The PR #252 lesson is in Context, Decisions, the traps list, a grep check and a browser sweep — five places, because it already shipped once |
| A decision or contract date gets invented, or a prior cycle's carried forward | Named in the Goal, Decisions, step 3, the traps list and verification |
| A maintainer-facing argument lands in a framing rule | The PR #252 lesson names the exact pattern; `rules` content is specified concretely in step 3 |
| TK/K's uneven tile count looks broken | `auto-fit` handles it, but this is the first uneven card — explicit browser check, and the Open question offers the Fly By as a third tile |
| The Nest preschool's preferences get read as TK–12 policy | Flagged in the research file and the traps list |
| NC's statutory kindergarten cutoff gets attributed to the school | Same |
| The ISEE ladder is written as "Grades 6–11" | The correction is in Source material and the traps list |
| Phase 2 translates `Visit Day` | Named in the Phase 2 trap list; the browser spot-check is the real guard |

## Open questions

- **Should the TK/K Fly By Open House (Oct 10, 2026, 9:30–11:00 a.m.) be a deadline tile?**
  — **default:** yes. It is the only dated admissions event Latin publishes, and without it
  TK/K and Lower carry only two tiles, which may read thin beside Middle/Upper's four. The
  argument against is that the strip is a *deadline* strip and an open house is not a
  deadline. **Decide in the browser at step 6**; if it looks wrong as a tile, move it to the
  band's optional-events step and accept two tiles.
- **Should the "no decision date is published" finding appear on the card, and where?** —
  **default:** as an `{ all }` row in the comparison table ("Decision & contract — not
  published; confirm with admissions") plus a line in each band's `checklistCallout`. With
  `watchOuts: []` those are the only two surfaces available, and the absence is worth stating
  — every other school's card ends with a decision date. If the user finds the comparison row
  too prominent, the callout alone carries it.
- **Should `contacts.people` list all nine staff with no contact details?** — **default:**
  yes. The school publishes exactly this, and nine names with titles is the second-richest
  roster in the topic. If the grid reads poorly at `--ad-n: 9`, consider leading with the
  assigned-counselor line in the kicker so the list reads as a team rather than nine dead
  ends.

## Implementation notes

Shipped in **PR #262**, both phases in one PR as planned.

**One addition the plan did not anticipate.** Phase 2 had to register
`comparison.rows[].cells.ls`, `.ms` and `.us` in `PATH_OVERRIDES`
(`scripts/i18n_fields.mjs`). The plan's Files-touched table did not list that
file, because the plan reasoned about the *band keys* (`tkk`/`ls`/`ms`/`us`) as
a rendering concern and did not connect them to the extractor's exact-match
path matcher. Charlotte Latin is the first school to name its bands after the
**divisions** rather than the grade numbers, so `ls`/`ms`/`us` were new keys;
`tkk` and `all` were already registered from Providence Day.

This mattered: an unregistered cell key is **excluded from extraction rather
than flagged at render**, so 12 comparison cells would have shipped English to
all nine locales with `check:runtime` still reporting 100%. Charlotte Christian
hit the identical trap with `g1`/`g24` in PR #254 — which means this is now the
*second* occurrence, and a future admissions school should treat "does this
school introduce a new band key?" as a required Phase 2 step rather than a
discovery.

**Work files were spliced, not re-extracted.** The extractor has no carry-over
branch and blanks every `t`, so the 136 new units were merged into the nine
committed work files by `of` stamp, preserving all 436 existing translations
byte-identically. Zero orphans; 572 units per locale, none untranslated.

**One leak fixed after the data read clean.** `guide.checklist.portalNote`
rendered `Portal:` in `es`, disagreeing with the `Portal de admisiones:`
already shipped for Providence Day; aligned to precedent. The remaining
`i18n:leaks` flag on this card — `fr` keeping `Admissions` in the contact panel
— is a legitimate keep, since the French word is identical to English.

**Open questions, as resolved.** All three defaults were taken: the TK/K Fly By
Open House ships as a deadline tile, the "no decision date" finding appears
both as the `{ all }` comparison row and in each band's checklist callout, and
`contacts.people` lists all nine staff.
