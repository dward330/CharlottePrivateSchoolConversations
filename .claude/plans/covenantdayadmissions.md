---
name: covenantdayadmissions
title: Add the Admissions research area for Covenant Day School
status: english-done
phases: 2
created: 2026-09-01
branch: feat/covenant-day-admissions
prs: []
---

# Add the Admissions research area for Covenant Day School

## Goal

Ship the Admissions research area for **Covenant Day School** (Matthews, NC) — the fifth
school in the area. Covenant Day runs **three** bands (JK/K, Grades 1–5, Grades 6–11) on one
six-step published spine, with Grade 6 a distinct sub-step inside the third band.

It is the most completely published of the schools researched so far: every band has a full
four-milestone timeline — application → supporting documents → decision → contract — plus
per-grade screening instruments, recommendation forms named by grade, and a published
rolling-admissions policy with an explicit consequence for non-priority applicants.

We'll know it worked when `/school/covenant-day/` renders an Admissions section above Course
Offerings with a working three-band selector, and
`/school/covenant-day/admissions-checklist/?band=jkk` prints a clean one-band sheet.

## Context

### What exists today

Four schools ship: `providence-day`, `charlotte-country-day` (#252), `charlotte-christian`
(#254), `charlotte-latin`. A fifth, `cannon`, is planned but unbuilt
(`cannonschooladmissions`). Infrastructure is school-agnostic.

- `src/data/admissionsPrograms.ts` — types, `ADMISSIONS_CARDS` (one card, key `guide`), the
  `PROGRAMS` map, `loadAdmissionsOverlay()`.
- `src/data/admissionsPrograms/charlotte-christian.ts` — **the closest model.** Same
  two-boundaries-that-don't-coincide shape, same CAIS instruments, and it ships the current
  conventions (see below). Read it first.
- `src/components/AdmissionsProgram.tsx` — the renderer.
- `src/pages/AdmissionsChecklist.tsx` — the standalone print page; already warms the overlay.
- `src/lib/metrics.ts:43-49` — `admissions` RULES is a single `match: /.*/`. **No new metric
  key.**
- `scripts/i18n_topics.mjs` — `covenant-day` is already in `SLUGS`. No extractor change.
- `scripts/seo_routes.mjs:46` — the checklist route is deliberately absent from SEO routes.
- `src/locales/*.json` — every `admissions.*` chrome key exists in all ten catalogs. **No new
  chrome keys.**

### ⚠️ Card conventions, as actually shipped — measured 2026-09-01

Five review passes (#252, #254, #258, #261) have each *removed* material. Two of the four
shipped cards have converged on an endpoint; author Covenant Day **at that endpoint**, not
one review behind it.

| | Providence Day | Country Day | Charlotte Christian | Charlotte Latin |
|---|---|---|---|---|
| `watchOuts` per band | 2 · 2 · 2 | 1 · 1 · 2 | **0 · 0 · 0 · 0** | **0 · 0 · 0 · 0** |
| URL-less `sources` notes | 1 | 1 | **0** | **0** |

The two most recent cards both ship `watchOuts: []` in every band and **no** URL-less trailing
source note. **Covenant Day follows them.**

**1. `rules[].text` is rendered RAW — NO markdown.** `AdmissionsProgram.tsx:249` renders
`<strong>{r.title}</strong> {r.text}` directly, so a `**bold**` span **ships as literal
asterisks**. `Emphasized` covers `steps[].detail`, `watchOuts[].text` and `aid.text` — **not**
`rules[].text`, and not `deadlines[].value`/`label`. This shipped briefly on Country Day
(PR #252, commit `652e6b1`) and had to be fixed.

**2. The card is PARENT-FACING; maintainer-facing argument gets cut.** Country Day's
`rules[1]` was originally *"Ignore the header, read the dates."* — arguing that the school's
own page header was wrong. Cut at review. **The finding moved to the file header comment and
the research file.** Covenant Day has no such conflict to argue about (its labels agree), so
this mostly means: keep `rules` plain.

**3. STANDING EDITORIAL RULE — never describe what a source document contains.** Stated by
the user with edit 4 of PR #261: *"the consortium brochure covers Pre-K through Grade 4"*
tells a parent about a brochure instead of telling them the fact. **We speak as the party
holding the information.** This bites here — Covenant Day's own page says *"Please refer to
the CAIS brochure for all details and a list of psychologists."* State that the psychologist
schedules and administers the test; do not narrate the brochure.

**4. Watch-outs: `[]` in every band.** Charlotte Christian's file header records the reason:
*"EMPTY BY DECISION, not by a gap in the research… Do NOT read them as unresearched and
backfill them."* Both trims were safe because the facts were already carried by
`steps[].detail` and `checklistCallout`. That is the test.

**5. No URL-less `sources` notes.** Charlotte Christian's two "Retrieved Aug 2026" prose notes
were removed (#258) as *"prose paragraphs in a row of citation links."*

**6. Write full sentences, not telegraphese.** Edit 8 of #261 reworded
`— application Jan 2 rather than Jan 15, decisions Feb 26` into
`— applications are due Jan 2 rather than Jan 15, decisions release Feb 26`.

**7. Annotate every deliberate omission at the cut site** — one line naming it as a decision
with a date.

### Renderer facts (confirmed by reading the component)

- `.ad-deadlines` is `repeat(auto-fit, minmax(150px, 1fr))` (`src/index.css:5242`). Covenant
  Day has four clean tiles per band, so this is not exercised.
- `RULE_ICONS[i % RULE_ICONS.length]` — `rules` may be any length.
- **`watchOuts: []` is a supported, already-shipped path.** `AdmissionsProgram.tsx:300` adds
  `is-wide`, skips the `.ad-watch` wrapper entirely, and `src/index.css:5275` collapses
  `.ad-grid` to one column. Two cards ship it. **No code change needed.** *(The type docstring
  still says "exactly 2 per band" — stale since PR #258.)*
- `AdComparisonRow.cells` accepts `{ all: string }` for a row identical in every band.
- `headline` is load-bearing — rendered as the collapsed `.topic-teaser`.
- `comparison` is still a **required** field (`src/data/admissionsPrograms.ts:178`). Covenant
  Day has three bands with real variation, so it ships one. **No type change in this plan.**

## Decisions

- **Three bands: `jkk`, `g15`, `g611`.** The school's own priority-deadline structure and
  Admissions Steps. Keys are new; do not copy Providence Day's `tkk`/`g15`/`g612` — the spans
  differ, and `g612` would be wrong here because **Grade 12 entry is not published**.
- **Grade 6 is a sub-step inside `g611`, not a fourth band.** It adds a shadow morning plus a
  math/English assessment on top of the ISEE that 6–11 all take. A fourth band would imply a
  separate calendar it does not have.
- **`watchOuts: []` in all three bands, by decision.** The shipped endpoint of the two most
  recent cards. Facts go to `steps[].detail` and `checklistCallout`. **Annotate in the file
  header** so a later pass does not backfill.
- **No URL-less trailing note in `sources`.** The NOT-PUBLISHED register lives in the file
  header and the research file.
- **`rules[0]` names FACTS/RenWeb** — Covenant Day's portal. Providence Day is Charger
  Commons, Country Day Veracross, Christian myCCS, Latin Finalsite Enrollment, Cannon
  Finalsite Enrollment. **Six schools, five portals** — copying another card's rule text ships
  a false statement.
- **`rules[1]` is the rolling-admissions rule**, which is the card's sharpest differentiator:
  Covenant Day publishes fixed priority decision dates *and* rolling admission after them,
  *and* an explicit consequence — no on-campus testing, shadow visit or parent interview for
  non-priority applicants unless space remains after April 9.
- **The professing-Christian requirement ships as a step, not a watch-out.** It is a published
  admissions gate — *"An essential component for admission…"* — verified at the parent
  interview, with a pastor's recommendation required at every grade JK–11. It belongs in the
  `g611`/`jkk`/`g15` interview step's `detail`, where every band carries it. **State the
  requirement; do not reproduce the statement of faith.**
- **Reproduce the school's own instrument spellings** — it writes "Weschler", "WPPSi" and
  "WISC V". Quote them as published rather than normalising to WPPSI-IV / WISC-V. *(The CAIS
  brochure itself uses the standard forms; the discrepancy is the school's.)*
- **Never narrate the CAIS brochure** — standing editorial rule. Say the test is scheduled
  directly with a qualified psychologist; do not say what the brochure contains.
- **Grade 12 is stated as not published** — in the `g611` step detail and the comparison table.
  The school is JK–12 but publishes no 12th-grade entry point.
- **Tuition figures are NOT cited in the card** — they belong to Financial Aid & Tuition.
  Recorded in source-material for provenance.
- **Two phases.** New research prose in `src/data/**`.

## Approvals needed

**None.** Adding a school to an existing area is automatic under the UX-design gate
(CLAUDE.md, §6 of the schema doc): no new card, section, stat tile, Compare row, metric key,
or topic. Every field Covenant Day populates already renders for four other schools.

The user reviewed the coverage assessment and approved the build.

## Source material

**One file, written during planning, uncommitted.** `/implement` ingests it as step 1.

| File | Contents |
|---|---|
| `source-material/admissions/covenant-day/Covenant Day - Admissions - Grade-by-Grade Application Plans.md` | Cycle verification, three bands, all six Admissions Steps verbatim, shared timeline, age rules, criteria, faith requirement, fees/platform/aid, international, four staff, NOT PUBLISHED register, 11 official source URLs |

CAIS consortium detail lives in `source-material/admissions/charlotte-country-day/… CAIS
Testing Consortium.md` — already committed. Covenant Day is a listed member school.

### What the deep research pass resolved

Official covenantday.org only. **The cycle gate passes:** *"Applications for the 2027-2028
school year open on September 8."* Every date in the prior research matched the live site
exactly.

**The one real gap is closed.** A prior pass recorded the per-grade screening instruments as
recovered from indexed content and could not reproduce them live — the "Admissions Steps"
accordion returns **no body text to a plain fetch** (I confirmed: WPPSI/WISC/Little Lions
appear **zero times** in the served HTML of every admissions page). **Rendering
`/admissions/process` with Playwright and force-opening the accordions returned all six steps
in full.** That page was not in the prior pass's source list at all.

**Newly retrieved, and previously marked NOT RETRIEVED:**
1. **The complete recommendation-forms list, named by grade** — preschool teacher (JK/K),
   lower school teacher (1–5), math + English + principal/counselor (6–11), and **pastor
   (JK–11)**. The prior pass had only the generic "Teachers, principals, and pastors may
   complete recommendation forms online."
2. **The full screening text verbatim**, including that parents schedule the tests directly
   with the psychologist and the Feb 26 2027 middle/high testing deadline.
3. **A fourth admissions staff member** — Baird Yasenchok, Admissions Assistant, 704-708-6127.
   The prior pass listed three.
4. **The broad transcript-release consent** attached to entering a registrar's email.

**Two corrections:**
5. **The stale-page conflict has resolved itself.** `/admissions/admission-experience` now
   returns **HTTP 404** — the school removed it. There is no live page serving prior-cycle
   dates, so the plan needs no reconciliation step.
6. **The Nov 12 Come See Covenant time is not published.** The prior pass reported
   "9:30–11:30 a.m."; the rendered Key Dates list carries dates only.

Net effect: **~95% of facts, ~78% of fields** — revised up from ~90%/~72%, and the strongest
field completion of the six schools assessed.

## Out of scope

- **The other five schools.** They stay absent from `PROGRAMS`.
- **Compare rows.** Admissions contributes none.
- **Tuition figures in the card** — see Decisions.
- **The statement of faith text.** The requirement ships; the doctrine does not.
- **Any third-party source.** Official site only.
- **Restructuring the four shipped cards.**
- **Deploying.** Merging is pre-authorized; publishing is the user's separate call.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout -b feat/covenant-day-admissions` from an up-to-date `main`.

2. **Ingest the source material.** Run `ingest-source-material` over
   `source-material/admissions/covenant-day/`. Confirm the Admissions topic count rises by one
   and that the file folds onto the single `redesign-research` key — a new key surfaces as ⚠️
   in the schema doc and in `npm run check:metrics`.

3. **Create `src/data/admissionsPrograms/covenant-day.ts`.** Export
   `export const covenantDay: AdmissionsProgram = { guide: { … } }`. Open
   `charlotte-christian.ts` alongside as the structural model. Author per the research file:

   - **File header comment** — the source file; the **2027–28 cycle** and that it is verified
     open (page labels and content agree — no mislabel, unlike Country Day); that
     `/admissions/admission-experience` **now 404s** and its prior-cycle dates must never be
     restored; that **`/admissions/process` is JavaScript-rendered and unreadable by plain
     fetch**, so the step detail came from a browser render; the **`rules[].text` renders raw —
     no markdown** editor note; that **`watchOuts: []` is by decision**, not a research gap;
     and that **Grade 12 entry is not published**.
   - **`headline`** — the collapsed teaser. Pick your band; the guide personalizes.
   - **`cycle`** — `'2027–28 entry cycle'` (en-dash).
   - **`stats`** — four tiles: `3` bands · `Jan 2, 2027` JK/K deadline · `Jan 15, 2027` Grades
     1–11 deadline · `$100` application fee. *(Not the $1,000 deposit — it belongs in the
     contract step and the aid strip.)*
   - **`rules`** — **exactly two, no markdown, parent-facing**:
     (a) the **FACTS/RenWeb portal** rule — inquire, apply, and complete every form through one
     online application;
     (b) the **rolling-admissions** rule — the school maintains rolling admissions, but the
     Jan 2 / Jan 15 dates are what secure a first-round decision, and non-priority applicants
     get no on-campus testing, shadow visit or parent interview unless space remains after
     April 9.
   - **`spineNote`** — the six published steps as the shared spine (visit → apply →
     screening → recommendations → interview/shadow → decision), noting what changes is the
     screening instrument, the on-campus visit type, whether the student is interviewed, and
     the calendar.
   - **`bands`** — three, in calendar order:

     | key | label | sublabel | deadline tiles |
     |---|---|---|---|
     | `jkk` | `JK / Kindergarten` | `WPPSi · Little Lions Assessment` | Jan 2 2027 · Feb 1 2027 (docs + CAIS testing) · Feb 26 2027 4 p.m. · Mar 5 2027 noon |
     | `g15` | `Grades 1–5` | `WPPSi → WISC V → ISEE by grade` | Jan 15 2027 · Feb 26 2027 · Apr 9 2027 4 p.m. · Apr 16 2027 noon |
     | `g611` | `Grades 6–11` | `ISEE · shadow day + interview` | Jan 15 2027 · Feb 26 2027 · Apr 9 2027 4 p.m. · Apr 16 2027 noon |

     **No `unpublished: true`** — every date is published.

     **`steps`** from the research file's six-step section, per band. Write full sentences.
     **`watchOuts: []` in all three**, annotated. The facts must land in steps or callouts:

     | Fact | Where it goes |
     |---|---|
     | JK/K's deadline is 13 days earlier, and its whole calendar is earlier | `jkk` apply step + `checklistCallout` |
     | Age rules — four by Mar 1 2027 (JK), five by Jun 1 2027 (K); placement weighs birthday + developmental readiness | `jkk` apply step |
     | The instrument changes twice inside Grades 1–5 (gr 1 WPPSi · 2–4 WISC V · 5 ISEE) | `g15` screening step |
     | Parents schedule the psychologist test themselves — **do not narrate the CAIS brochure** | `jkk`/`g15` screening step |
     | CDS administers the ISEE on campus **Dec 12, 2026**; families may also register on the ISEE site | `g611` screening step (and `g15` for Grade 5) |
     | Grade 6 adds a shadow morning + math/English assessment; 7–11 shadow without it | `g611` interview/shadow step |
     | The student interview applies at grades 6–11 only | `g611` step + comparison row |
     | Recommendation forms by grade, including the **pastor's recommendation at every grade** | each band's recommendations step |
     | The professing-Christian requirement, verified at the parent interview | every band's interview step |
     | Non-priority applicants get no testing/shadow/interview unless space remains after Apr 9 | `rules[1]` + every `checklistCallout` |
     | **Grade 12 entry is not published** | `g611` step detail + comparison row |

   - **`aid`** — need-based through **FACTS**, a new application each year, and the
     precondition: **families must first provide proof of application for the NC Opportunity
     Scholarship**. Covenant Day accepts the NC Opportunity and ESA+ Scholarships (NCSEAA).
     Complete the aid application concurrently with the admissions application. Carry the
     **$1,000 non-refundable deposit**, applied toward tuition. Contact Christen Marshall,
     Student Accounts Coordinator, 704-708-6102. **The FACTS aid fee and any reduced deposit
     for aid applicants are not published** — say so rather than guessing.
     `button: 'Financial Aid & Tuition'`.
   - **`comparison`** — rows for: application deadline, screening instrument, on-campus visit
     type, student interview, parent interview, recommendation forms, supporting documents due,
     decision date, contract due. Use `{ all }` for rows identical in every band ($100 fee,
     FACTS/RenWeb, parent interview + professing-Christian requirement, pastor's
     recommendation, rolling after the priority dates). Include a **Grade 12 row or note**
     reading "Not published as an entry point."
   - **`contacts`** — address `800 Fullwood Lane, Matthews, NC 28105 · admissions
     704-847-2385 · admissions@covenantday.org`. **Four staff**: Jennifer Billiard (Admissions
     Director, 704-814-1074), Casey Parrish (Admissions Associate, 704-814-1090), Cass Shortt
     (Admissions Associate · International Program Coordinator, 704-814-1077), Baird Yasenchok
     (Admissions Assistant, 704-708-6127).
   - **`checklist`** — `portalNote` naming FACTS/RenWeb; `aidPanel` (FACTS, the NC Opportunity
     Scholarship precondition, concurrent filing, the $1,000 deposit); `contactPanel`;
     `disclaimer` naming the 2027–28 cycle, the Sept 2026 retrieval, and "Compiled by
     Charlotte School Compare; not affiliated with Covenant Day School."
   - **`sources`** — the official URLs from the research file, **every one carrying a URL**.
     No trailing prose note (PR #258).

   **Six content traps, each producing plausible-looking wrong text:**
   - **No `**bold**` in `rules[].text`** — ships as literal asterisks.
   - **Do not narrate the CAIS brochure** — standing editorial rule.
   - **Grade 12 is not a published entry point** — bands are `6–11`, never `6–12`.
   - **The instrument boundary is Grade 1→2 and Grade 4→5**, not the band boundary.
   - **Reproduce "Weschler" / "WPPSi" / "WISC V" as the school spells them.**
   - **Do not restore any date from `/admissions/admission-experience`** — that page is gone.

4. **Register the school** in `src/data/admissionsPrograms.ts`: import `covenantDay` from
   `./admissionsPrograms/covenant-day.ts` and add `'covenant-day': covenantDay` to `PROGRAMS`.
   Update the module docstring's school count.

5. **Regenerate the schema doc.** `npm run schema`, then `npm run check:schema`. The Admissions
   counts rise by one in both the research-area grid and the structured-card section, with
   `covenant-day` dropping off the "absent" list.

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
   `admissions` topic and the `covenant-day` slug.
2. **Translate** each locale's new units. Key by English text, never by index.
3. **Rebuild** the nine `src/data/overlays/admissions.<lang>.json` overlays.
4. **Run the locale checks** (below), then commit into the same PR.

Traps specific to this card:

- **Figures copied char-for-char** — `$100`, `$1,000`, `Jan 2, 2027`, `February 26, 2027`,
  `4:00 p.m.`. Never re-typed, unit-converted, or separator-swapped.
- **`hi` / `te` regroup at render** — the data stores the English 3-3-3 figure.
- **`fa` / `ar` are RTL** — isolates are applied at render; the overlay stores none.
- **Identifiers stay English** — `WPPSi`, `WISC V`, `ISEE`, `CAIS`, `FACTS`, `RenWeb`,
  `Junior Kindergarten`, `JK`, `NC Opportunity Scholarship`, `ESA+`, `NCSEAA`.
  **`Little Lions Assessment` and `Come See Covenant` are the trap** — Covenant Day-specific
  proper nouns that read as ordinary prose, the French-inverse leak shape.
- **The professing-Christian requirement is doctrinal language** — translate it faithfully and
  plainly; it is a published admissions condition, not marketing copy.

## Files touched

| File | Change |
|---|---|
| `source-material/admissions/covenant-day/Covenant Day - Admissions - Grade-by-Grade Application Plans.md` | new — written during planning, uncommitted |
| `src/data/admissionsPrograms/covenant-day.ts` | new — the guide data, three bands |
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
- [ ] **grep the new data file for `**`** — none in `rules[].text` or any
      `deadlines[].value`/`label`. `Emphasized` fields may use it.
- [ ] **Browser check** at `/school/covenant-day/`, via Playwright with `domcontentloaded`
      (**not** `networkidle` — the Latest News fetch never idles):
  - Admissions renders **above** Course Offerings; teaser shows `headline`.
  - The selector shows **three** joined buttons; check narrow/mobile widths.
  - Clicking each band swaps the deadline strip and the stepper.
  - **Every band renders `is-wide`** — full-width stepper, no empty right-hand column.
    Compare against `/school/charlotte-latin/`, which ships the same shape.
  - Four deadline tiles per band, no overflow at mobile width.
  - The comparison table renders; `{ all }` rows span all three columns.
  - The contacts grid renders acceptably with **four** entries (`--ad-n: 4`).
  - Source row linkifies every citation.
- [ ] **Checklist page** for all three bands (`?band=jkk|g15|g611`): correct title, rows, aid
      and contact panels. Print-preview one.
- [ ] **Read the six trap fields back against the research file**: no markdown in rules; no
      CAIS-brochure narration; bands are 6–11 not 6–12 with Grade 12 flagged unpublished; the
      instrument boundaries at 1→2 and 4→5; the school's own spellings preserved; no
      resurrected `/admission-experience` dates.
- [ ] **Review-preference audit** (PRs #258 / #261):
  - `watchOuts: []` in all three bands, each annotated as a decision.
  - **No URL-less entry in `sources`.**
  - **No sentence describes what a document contains** — grep for `brochure`, `booklet`,
    `the site says`, `page covers`.
  - Every fact from the step-3 table lands in a step or callout.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves.
- [ ] `npm run check:live` — clean; all three gates.
- [ ] `npm run check:sepdrift -- --lang <each>` — no separator re-typings.
- [ ] `npm run check:figures` / `check:money` / `check:currency` — figures intact.
- [ ] `npm run check:chrome` — clean (no new chrome expected).
- [ ] `npm run build` — succeeds with locale gates chained.
- [ ] **Browser spot-check in at least two locales, one RTL (`fa`/`ar`) and one lakh/crore
      (`hi`/`te`)**: translated prose renders, figures read correctly in RTL, and
      `Little Lions Assessment` / `Come See Covenant` / `WPPSi` / `ISEE` / `FACTS` are still
      English.

## Risks

| Risk | Mitigation |
|---|---|
| `**bold**` lands in `rules[].text` and ships as literal asterisks | In Context, Decisions, the traps list, a grep check and a browser sweep — it already shipped once |
| Bands are written as 6–12 because the school is JK–12 | Named in Goal, Decisions, step 3, traps and verification |
| The CAIS brochure gets narrated — the school's own page invites it | Standing editorial rule quoted in Context and Decisions; grep check in verification |
| Instrument spellings get normalised to WPPSI-IV / WISC-V | Decisions names the school's own forms; the research file carries them verbatim |
| Watch-outs get authored anyway, then cut at review | The convention table shows two cards already at `[]`; the fact-placement table makes the alternative concrete |
| A prior-cycle date is restored from a cached `/admission-experience` | That URL now 404s; recorded in the file header and the research file |
| Phase 2 translates `Little Lions Assessment` | Named in the Phase 2 trap list; the browser spot-check is the real guard |

## Open questions

- **Should the Dec 12, 2026 on-campus ISEE date appear as a deadline tile for `g611`?** —
  **default:** no. All four tiles are already filled with genuine deadlines, and the ISEE date
  is an *opportunity*, not a deadline (families may register elsewhere). It goes in the
  screening step's `detail`. Raise it at review if the band reads thin without it.
- **Should the professing-Christian requirement also appear in `rules`?** — **default:** no.
  It is carried in every band's interview step and in the comparison table, and `rules` is the
  card's most prominent surface — a two-rule slot is better spent on the portal and the
  rolling-admissions consequence, which affect every applicant's planning. Worth the user's
  opinion, since it is the single most consequential eligibility fact on the card.
- **Should the broad transcript-release consent be surfaced?** — **default:** one clause in
  the recommendations step noting that providing the registrar's email authorizes release of
  the full record including psychological evaluations and behavior records. It is unusually
  broad and a parent would want to know, but it is not a step they *do* — so it stays a clause,
  not its own step.
