---
name: hickorygroveadmissions
title: Add the Admissions research area for Hickory Grove Christian School
status: implemented
phases: 2
created: 2026-09-01
branch: feat/hickory-grove-admissions
prs: [268]
---

# Add the Admissions research area for Hickory Grove Christian School

## Goal

Ship the Admissions research area for **Hickory Grove Christian School** (Charlotte, NC) —
the sixth school in the area, and the first to ship a **five-band** card: TK/K5, Elementary
1–5, Middle 6–8, High 9–12, and **International (F-1)** as a genuinely separate process
rather than an overlay.

We'll know it worked when `/school/hickory-grove-christian/` renders an Admissions section
above Course Offerings with a working five-band selector, and
`/school/hickory-grove-christian/admissions-checklist/?band=tkk5` prints a clean one-band
sheet.

## Context

### What exists today

Five schools ship: `providence-day`, `charlotte-country-day` (#252), `charlotte-christian`
(#254), `charlotte-latin` (#262), `covenant-day` (#264). A sixth, `cannon`, is planned but
unbuilt. Infrastructure is school-agnostic.

- `src/data/admissionsPrograms.ts` — types, `ADMISSIONS_CARDS` (one card, key `guide`), the
  `PROGRAMS` map, `loadAdmissionsOverlay()`.
- `src/data/admissionsPrograms/covenant-day.ts` — **the newest card and the closest model.**
  Also a Christian school with a pastoral-reference requirement and a FACTS platform. Read it
  first.
- `src/data/admissionsPrograms/charlotte-christian.ts` — the four-band precedent.
- `src/components/AdmissionsProgram.tsx` — the renderer.
- `src/pages/AdmissionsChecklist.tsx` — the standalone print page; already warms the overlay.
- `src/lib/metrics.ts:43-49` — `admissions` RULES is a single `match: /.*/`. **No new metric
  key.**
- `scripts/i18n_topics.mjs:29` — `hickory-grove-christian` is already in `SLUGS`. No extractor
  change.
- `scripts/seo_routes.mjs:46` — the checklist route is deliberately absent from SEO routes.
- `src/locales/*.json` — every `admissions.*` chrome key exists in all ten catalogs. **No new
  chrome keys.**

### ⚠️ Card conventions, as actually shipped — measured 2026-09-01

Six review passes have each *removed* material. The three most recent cards have converged;
author Hickory Grove **at that endpoint**, not one review behind it.

| | Providence Day | Country Day | Charlotte Christian | Charlotte Latin | Covenant Day |
|---|---|---|---|---|---|
| `watchOuts` per band | 2·2·2 | 1·1·2 | **0×4** | **0×4** | **0×3** |
| URL-less `sources` | 1 | 1 | **0** | **0** | **0** |

**1. `rules[].text` is rendered RAW — NO markdown.** `AdmissionsProgram.tsx:249` renders
`<strong>{r.title}</strong> {r.text}` directly, so `**bold**` **ships as literal asterisks**.
`Emphasized` covers `steps[].detail`, `watchOuts[].text` and `aid.text` — **not**
`rules[].text`, and not `deadlines[].value`/`label`. This shipped once (PR #252, commit
`652e6b1`) and had to be fixed.

**2. The card is PARENT-FACING; maintainer-facing argument gets cut.** Country Day's
`rules[1]` was originally *"Ignore the header, read the dates."* — arguing the school's page
header was wrong. Cut at review; the finding moved to the file header comment. **This is
directly relevant here** — Hickory Grove has two live inconsistencies (see Decisions), and the
temptation to argue them on the card must be resisted. State the useful version; put the
reasoning in the file header.

**3. STANDING EDITORIAL RULE — never describe what a source document contains.** From edit 4
of PR #261: *"the consortium brochure covers Pre-K through Grade 4"* tells a parent about a
brochure instead of telling them the fact. **We speak as the party holding the information.**
This bites hard here, because the card's best material comes from two checklist PDFs — say
*"send the Academic Referral form from your child's current teacher"*, never *"the Elementary
checklist lists an Academic Referral form."*

**4. Watch-outs: `[]` in every band.** Charlotte Christian's file header: *"EMPTY BY DECISION,
not by a gap in the research… Do NOT read them as unresearched and backfill them."* Safe
because the facts were already in `steps[].detail` and `checklistCallout`.

**5. No URL-less `sources` notes** — removed at review (#258) as *"prose paragraphs in a row
of citation links."*

**6. Write full sentences, not telegraphese.**

**7. Annotate every deliberate omission at the cut site** — one line naming it as a decision
with a date.

### Renderer facts (confirmed by reading the component)

- `.ad-deadlines` is `repeat(auto-fit, minmax(150px, 1fr))` (`src/index.css:5242`) — an uneven
  tile count across bands is a first-class layout. **Relevant here:** Hickory Grove publishes
  no per-band decision or contract dates, so tiles are sparse (see Decisions).
- `RULE_ICONS[i % RULE_ICONS.length]` — `rules` may be any length.
- **`watchOuts: []` is supported and shipped by three cards.** `AdmissionsProgram.tsx:300`
  adds `is-wide`, skips the `.ad-watch` wrapper, `src/index.css:5275` collapses `.ad-grid` to
  one column. **No code change.** *(The type docstring still says "exactly 2 per band" —
  stale since PR #258.)*
- `AdComparisonRow.cells` accepts `{ all: string }` for a row identical in every band.
- `headline` is load-bearing — the collapsed `.topic-teaser`.
- **`.ad-bands` has never rendered FIVE buttons.** Four is the current maximum (Charlotte
  Christian, Charlotte Latin). It is a flex row; five is expected to wrap or compress. **This
  is the one layout unknown in the plan** — see Risks and the browser check.

## Decisions

- **Five bands: `tkk5`, `es`, `ms`, `hs`, `intl`.** Four grade bands plus International.
- **International ships as a REAL band, not a watch-out** — user's call (2026-09-01), and it
  reverses the Country Day and Cannon decisions deliberately. There, international was an
  overlay on a grade band. Here it is a **separate process**: its own director, a video
  interview *instead of* a campus visit, English-proficiency testing, translated transcripts,
  I-20 issuance, homestay, health insurance, and full payment before day one. It shares
  almost no steps with the domestic path.
- **The spine is the CHECKLISTS' four steps, not the website's three.** The Admissions Process
  page shows INQUIRE → VISIT → APPLY, which only gets a family *to* the application. Both
  checklist PDFs publish APPLICATION → TESTING (+ SHADOW, high school only) → INTERVIEW →
  ACCEPTANCE. The card's spine is the combined sequence: inquire → visit → apply + fee →
  submit the band's forms → testing → family interview → decision → $500 deposit.
- **Middle and High share one checklist; only two things differ.** The shadow day is
  **high-school-only**, and the entrance test for grade placement is published only for 9–12.
  Forms are identical. Both bands still ship, because those two differences are real and a
  parent needs to know which applies.
- **The $250/$500 fee conflict ships with BOTH figures and a plain note** — user's call. The
  live page publishes Nov 2026 application dates and, immediately below, a fee window of
  "$250.00 (November, 17 2025 - May 31, 2026)" / "$500 (June 1, 2026 and later)". Read
  literally every current applicant pays $500, because the $250 window closed before
  applications opened. Say the published fee window predates the current application dates and
  to confirm the current fee — **do not pick one silently, and do not argue the inconsistency
  at length on the card** (rule 2).
- **`cycle` is `'2027–28 entry cycle'`.** The Admissions Process page's Nov 2 / Nov 16 2026
  dates are the only live authoritative source. **The Apply page's "2026-2027 SCHOOL YEAR"
  label is prior-cycle** — noted in the file header, not on the card.
- **No decision or contract dates in any band.** Admission is rolling and capacity-dependent;
  no fixed notification date is published. Same shape as Charlotte Latin. **Do not invent one
  and do not use `unpublished: true`** — that flag is for a known constant standing in for a
  missing date, and there is no constant here.
- **`watchOuts: []` in all five bands, by decision.** The shipped endpoint of the three most
  recent cards. Facts go to `steps[].detail` and `checklistCallout`. **Annotate in the file
  header.**
- **No URL-less trailing note in `sources`.**
- **`rules[0]` names FACTS** — Hickory Grove's portal. Providence Day is Charger Commons,
  Country Day Veracross, Christian myCCS, Latin Finalsite Enrollment, Covenant Day
  FACTS/RenWeb. **Covenant Day also uses FACTS**, so this is the first card where borrowing
  another school's portal rule is *nearly* right — write Hickory Grove's own, and note the two
  campuses use **different FACTS portals** (Harris memberId 496, Mallard Creek 15083).
- **`rules[1]` is the priority-window rule** — the card's sharpest differentiator: church
  members, EEC students and current-student siblings apply from Nov 2; everyone else from
  Nov 16. It is an *earlier application window*, **not** a tuition discount.
- **The pastoral reference ships as a step in every band.** A "Personal Recommendation form
  (from family's pastor)" is a required STEP #1 item TK–12. **There is NO published
  professing-Christian requirement** — unlike Covenant Day, which states one outright. Report
  the required form and the mission-fit interview; do not imply a faith gate the school does
  not publish.
- **The automatic-denial rule ships** — "any suspensions, expulsions and/or failed courses is
  an automatic denial of admission." No other school in this area publishes anything like it,
  and it materially affects who should apply.
- **Tuition figures are NOT cited** — and are not published anyway. See the correction in
  Source material.
- **Two phases.** New research prose in `src/data/**`.

## Approvals needed

**None.** Adding a school to an existing area is automatic under the UX-design gate
(CLAUDE.md, §6 of the schema doc): no new card, section, stat tile, Compare row, metric key,
or topic. Every field Hickory Grove populates already renders for five other schools.

The user reviewed the coverage assessment and approved the build, including the five-band
structure and the fee-conflict treatment.

## Source material

**One file, written during planning, uncommitted.** `/implement` ingests it as step 1.

| File | Contents |
|---|---|
| `source-material/admissions/hickory-grove-christian/Hickory Grove Christian - Admissions - Grade-by-Grade Application Plans.md` | Cycle audit, both live inconsistencies, both checklist PDFs transcribed verbatim, five bands, age cutoffs, campus split, FACTS platform, aid + NCSEAA order of operations, the full international process, contacts, NOT PUBLISHED register, 16 official source URLs |

### What the deep research pass resolved

Official hgchristian.org, its linked FACTS portals, its Finalsite PDFs, and the sponsoring
church's own linked ministry page only.

**The cycle gate passes.** Priority **Nov 2, 2026**, public **Nov 16, 2026** — the open
2027–28 cycle, rendered live.

**The prior pass's "four-way date conflict" is one live source plus stale echoes.** The FACTS
portal carries prior-cycle text; a prior page capture is superseded; and
`/admissions/registration-info` **404s**. One authoritative page, so no reconciliation is
needed at build time.

**Both checklist PDFs — RETRIEVED IN FULL.** The prior pass called this its *"single biggest
gap"* and reported the fetch permission-blocked. It is not:
`/fs/resource-manager/view/<guid>` **302-redirects** to `resources.finalsite.net`, the same
pattern used for Country Day, Charlotte Christian and Charlotte Latin. Both return 200 and
extract cleanly; both footers read "Revised 11/17/25". That closed **five** NOT RETRIEVED
items at once:

1. **The enrollment deposit — $500, nonrefundable, applied toward tuition.**
2. **Recommendation forms by grade**, including the **pastor's reference at every grade**.
3. **Testing sequencing** — testing is scheduled only *after* all forms are received.
4. **The shadow day is high-school-only** — settles whether 6–8 shares the 9–12 requirements.
5. **A published automatic-denial rule** for suspensions, expulsions or failed courses.

Plus a structural finding: **the website's three steps are not the real process** — the
checklists publish four, beginning where the website's end.

**And it answered the Christian-commitment question the prior pass left open:** there is a
required pastoral reference at every grade and a mission-fit family interview, but **no
published professing-Christian requirement**.

**Three corrections to the prior pass:**
- **The Scholarships page has been updated** — it now reads "February 2 - March 2, 2026" with
  NCSEAA renewal by "April 15, 2026", not the 2025 dates the prior pass flagged as stale.
- **The two linked fee PDFs are NOT tuition schedules.** Both are *Educational Support
  Services* fee schedules (learning-support pricing, $300–$4,455/year). **Tuition by grade is
  not published anywhere on the public site.**
- **A second live inconsistency the prior pass missed** — the Apply page is labelled
  "APPLY HERE FOR THE 2026-2027 SCHOOL YEAR" while the Process page publishes Nov 2026 dates.

Net: **~88% of facts, ~70% of fields** — above the prior pass's own estimate.

## Out of scope

- **The other five schools.** They stay absent from `PROGRAMS`.
- **Compare rows.** Admissions contributes none.
- **Tuition figures** — not published, and they belong to Financial Aid & Tuition.
- **The Educational Support Services fee schedule** — a learning-support price list, not an
  admissions fact.
- **The Statement of Faith text** — not retrieved, and the card ships requirements not
  doctrine.
- **Any third-party source.** Official site only, per the user's instruction.
- **Deploying.** Merging is pre-authorized; publishing is the user's separate call.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout -b feat/hickory-grove-admissions` from an up-to-date `main`.

2. **Ingest the source material.** Run `ingest-source-material` over
   `source-material/admissions/hickory-grove-christian/`. Confirm the Admissions topic count
   rises by one and that the file folds onto the single `redesign-research` key — a new key
   surfaces as ⚠️ in the schema doc and in `npm run check:metrics`.

3. **Create `src/data/admissionsPrograms/hickory-grove-christian.ts`.** Export
   `export const hickoryGroveChristian: AdmissionsProgram = { guide: { … } }`. Open
   `covenant-day.ts` alongside as the structural model. Author per the research file:

   - **File header comment** — the source file; the **2027–28 cycle** and that the Apply
     page's "2026-2027" label is prior-cycle; that `/admissions/registration-info` **404s** and
     its 2024–25 dates must never be restored; that **both checklist PDFs are retrievable via
     the resource-manager 302 redirect** (the prior pass wrongly recorded them as blocked);
     the **stale $250/$500 fee window** and why both figures ship; the **`rules[].text` renders
     raw — no markdown** editor note; that **`watchOuts: []` is by decision**; and that
     **tuition is not published** so the two linked fee PDFs are learning-support schedules.
   - **`headline`** — the collapsed teaser. Pick your entry point; the guide personalizes.
   - **`cycle`** — `'2027–28 entry cycle'` (en-dash).
   - **`stats`** — four tiles: `5` bands · `Nov 2, 2026` priority window opens · `Nov 16, 2026`
     public applications open · `$500` enrollment deposit. *(The application fee is NOT a tile
     — its published window is stale, so a bare `$250` tile would mislead. It goes in the
     apply step with the conflict noted.)*
   - **`rules`** — **exactly two, no markdown, parent-facing**:
     (a) the **FACTS portal** rule — inquire and visit by form, then apply in FACTS, then track
     supplemental forms in the portal; note the two campuses use different FACTS portals;
     (b) the **priority-window** rule — church members, EEC students and current-student
     siblings apply from Nov 2; the public from Nov 16; admission is rolling and
     capacity-dependent thereafter.
   - **`spineNote`** — the combined spine (inquire → visit → apply + fee → submit your band's
     forms → testing → family interview → decision → deposit), noting that what changes by band
     is which forms, whether there is a shadow day, and whether an entrance placement test
     applies.
   - **`bands`** — five, in order:

     | key | label | sublabel |
     |---|---|---|
     | `tkk5` | `TK / K5` | `Readiness screening · age cutoffs` |
     | `es` | `Elementary · Grades 1–5` | `Academic Referral · report cards` |
     | `ms` | `Middle · Grades 6–8` | `Three teacher recommendations` |
     | `hs` | `High · Grades 9–12` | `Shadow day + placement test` |
     | `intl` | `International (F-1)` | `Separate process · I-20 issued by HGCS` |

     **Deadline tiles** — the four grade bands share the same published dates, so each carries:
     `Nov 2, 2026` (priority window opens) · `Nov 16, 2026` (public opens) · `$500` (deposit on
     acceptance). **No decision or contract tile** — none is published. `intl` carries its own:
     English-proficiency thresholds and the full-payment-before-day-one rule rather than dates,
     since no international deadline is published.

     **No `unpublished: true` anywhere.**

     **`steps`** per band from the research file. Write full sentences. **State facts, never
     describe the checklist documents** (rule 3).

     **`watchOuts: []` in all five**, annotated. The facts must land in steps or callouts:

     | Fact | Where it goes |
     |---|---|
     | TK vs K5 placement — Oct 16 / Apr 16 cutoffs plus a readiness screening | `tkk5` apply + assessment steps |
     | The pastor's Personal Recommendation is required at every grade | every band's forms step |
     | Testing is scheduled only AFTER all forms are received | every domestic band's testing step + `checklistCallout` |
     | The shadow day is high-school-only | `hs` step; explicitly absent from `ms` |
     | The entrance placement test is published for 9–12 only | `hs` step + comparison row |
     | The automatic-denial rule (suspensions, expulsions, failed courses) | every domestic band's `checklistCallout` |
     | The $250/$500 fee window predates the current dates | every band's apply step |
     | Priority window vs public window | `rules[1]` + `checklistCallout` |
     | Mallard Creek's classical TK/K uses a separate FACTS portal; whether its steps differ is not published | `tkk5` apply step |
     | No fixed notification date — rolling, capacity-dependent | every `checklistCallout` + comparison row |
     | International: video interview replaces the campus visit | `intl` steps |

   - **`aid`** — FACTS Grant & Aid, **$40 FACTS application charge**, and the order of
     operations: new families must be **accepted for enrollment before applying for aid**, and
     families should first apply for/accept/renew the **NC Opportunity Scholarship (NCSEAA)**,
     then apply for HGCS aid "until all available funds have been allocated" if needs are not
     met. The **2026–27 NCSEAA window was Feb 2 – Mar 2, 2026 with renewal by Apr 15, 2026**;
     **the 2027–28 window is set by the state and not yet published** — say so rather than
     carrying those dates forward as current. Mention **ESA+** for students with disabilities.
     **No reduced deposit for aid applicants is published.**
     `button: 'Financial Aid & Tuition'`.
   - **`comparison`** — rows for: application window, required forms, assessment, shadow day,
     entrance placement test, family interview, decision timing, deposit. Use `{ all }` for
     rows identical across the four grade bands (the $500 deposit, the family interview, the
     pastoral reference, rolling admission, the automatic-denial rule). The `intl` column will
     differ on nearly every row — that is the point of shipping it as a band.
   - **`contacts`** — address `7200 E. WT Harris Blvd., Charlotte, NC 28215 · admissions
     704-531-4008 · admissions@hgchristian.org`, with office hours Mon–Fri 7:30 a.m.–3:00 p.m.
     **One named person**: Sheila M. Chaney, Director of Admissions & International Student
     Program. Consider adding the general admissions line and the two EEC offices as
     non-person rows if a one-entry grid reads sparse — check in the browser, `--ad-n` drives
     the grid. **Do not ship 704-531-3589** (stale).
   - **`checklist`** — `portalNote` naming FACTS; `aidPanel` (FACTS Grant & Aid, $40, the
     NCSEAA precondition, ESA+); `contactPanel`; `disclaimer` naming the 2027–28 cycle, the
     Sept 2026 retrieval, that the published application-fee window predates the current
     application dates, and "Compiled by Charlotte School Compare; not affiliated with Hickory
     Grove Christian School."
   - **`sources`** — the official URLs from the research file, **every one carrying a URL**.
     No trailing prose note.

   **Six content traps:**
   - **No `**bold**` in `rules[].text`** — ships as literal asterisks.
   - **Never describe the checklist PDFs** — state the requirement, not the document.
   - **No decision or contract date** — none is published.
   - **Do not imply a professing-Christian requirement** — the school publishes a pastoral
     reference and a fit interview, not a faith gate. Covenant Day is the school with the
     explicit requirement; do not carry its language across.
   - **The shadow day is high-school-only** — not 6–12.
   - **Do not ship a bare `$250` fee** without the window caveat, and do not ship the
     Educational Support Services figures as tuition.

4. **Register the school** in `src/data/admissionsPrograms.ts`: import
   `hickoryGroveChristian` from `./admissionsPrograms/hickory-grove-christian.ts` and add
   `'hickory-grove-christian': hickoryGroveChristian` to `PROGRAMS`. Update the module
   docstring's school count.

5. **Regenerate the schema doc.** `npm run schema`, then `npm run check:schema`. The
   Admissions counts rise by one in both the research-area grid and the structured-card
   section, with `hickory-grove-christian` dropping off the "absent" list.

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
   `admissions` topic and the `hickory-grove-christian` slug.
2. **Translate** each locale's new units. Key by English text, never by index.
3. **Rebuild** the nine `src/data/overlays/admissions.<lang>.json` overlays.
4. **Run the locale checks** (below), then commit into the same PR.

Traps specific to this card:

- **Figures copied char-for-char** — `$250`, `$500`, `$40`, `Nov 2, 2026`, `750+`, `50+`.
  Never re-typed, unit-converted, or separator-swapped.
- **`hi` / `te` regroup at render** — the data stores the English 3-3-3 figure.
- **`fa` / `ar` are RTL** — isolates are applied at render; the overlay stores none.
- **Identifiers stay English** — `FACTS`, `TOEFL Jr.`, `SLEP`, `I-20`, `F-1`, `SEVIS`,
  `NCSEAA`, `NC Opportunity Scholarship`, `ESA+`, `IEP`, `504`, `Transitional Kindergarten`,
  `TK`, `K5`.
  **`Academic Referral form`, `Readiness Checklist`, `Student Questionnaire` and
  `Personal Recommendation form` are the trap** — Hickory Grove-specific form names that read
  as ordinary prose, the French-inverse leak shape, and this card has more of them than any
  other in the topic.

## Files touched

| File | Change |
|---|---|
| `source-material/admissions/hickory-grove-christian/Hickory Grove Christian - Admissions - Grade-by-Grade Application Plans.md` | new — written during planning, uncommitted |
| `src/data/admissionsPrograms/hickory-grove-christian.ts` | new — the guide data, five bands |
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
      `deadlines[].value`/`label`.
- [ ] **Browser check** at `/school/hickory-grove-christian/`, via Playwright with
      `domcontentloaded` (**not** `networkidle` — the Latest News fetch never idles):
  - Admissions renders **above** Course Offerings; teaser shows `headline`.
  - **The selector shows FIVE joined buttons — the first five-band card.** Check desktop,
    tablet and mobile widths. `.ad-bands` is a flex row that has only ever held four; if five
    wrap badly or compress the sublabels illegibly, **fix the CSS in this PR**.
  - Clicking each band swaps the deadline strip and the stepper.
  - **Every band renders `is-wide`** — full-width stepper, no empty right-hand column.
    Compare against `/school/covenant-day/`.
  - **No band shows a decision or contract tile.**
  - The comparison table renders; `{ all }` rows span all five columns, and the `intl` column
    differs on nearly every row.
  - The contacts grid renders acceptably with one named person (`--ad-n`).
  - Source row linkifies every citation.
- [ ] **Checklist page** for all five bands (`?band=tkk5|es|ms|hs|intl`): correct title, rows,
      aid and contact panels. Print-preview one, and confirm the `intl` sheet reads sensibly
      given it has no campus-visit step.
- [ ] **Read the six trap fields back against the research file**: no markdown in rules; no
      checklist-document narration; no decision/contract dates; no professing-Christian
      implication; shadow day high-school-only; the fee window caveat present.
- [ ] **Review-preference audit** (PRs #258 / #261):
  - `watchOuts: []` in all five bands, each annotated as a decision.
  - **No URL-less entry in `sources`.**
  - **No sentence describes what a document contains** — grep for `checklist lists`,
    `the PDF`, `the form says`, `page covers`, `brochure`.
  - Every fact from the step-3 table lands in a step or callout.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves.
- [ ] `npm run check:live` — clean; all three gates.
- [ ] `npm run check:sepdrift -- --lang <each>` — no separator re-typings.
- [ ] `npm run check:figures` / `check:money` / `check:currency` — figures intact.
- [ ] `npm run check:chrome` — clean (no new chrome expected).
- [ ] `npm run build` — succeeds with locale gates chained.
- [ ] **Browser spot-check in at least two locales, one RTL (`fa`/`ar`) and one lakh/crore
      (`hi`/`te`)**: translated prose renders, **the five-band selector survives longer
      translated labels** (this is the real risk — a five-button row that fits in English may
      not in German-length or Devanagari text), figures read correctly in RTL, and
      `Academic Referral form` / `Readiness Checklist` / `FACTS` / `TOEFL Jr.` are still
      English.

## Risks

| Risk | Mitigation |
|---|---|
| **Five band buttons overflow `.ad-bands`** — never rendered before; four is the current max | Explicit multi-width browser check in Phase 1 and a locale check in Phase 2; a CSS fix is in scope for this PR |
| `**bold**` lands in `rules[].text` | In Context, Decisions, traps, a grep check and a browser sweep — it shipped once already |
| The checklist PDFs get narrated instead of stated | Standing editorial rule in Context and Decisions; grep check in verification |
| A professing-Christian requirement is implied by copying Covenant Day's language | Named in Decisions and traps; the research file states exactly what is published |
| The shadow day is applied to grades 6–12 | Named in Decisions, the fact table and traps |
| A bare `$250` fee ships without the window caveat | Named in Decisions, the fact table, traps and verification |
| Educational Support Services fees get mistaken for tuition | The correction is in Source material and the file header instruction |
| A decision date is invented because five other cards have one | Named in Decisions and verification |
| Phase 2 translates `Academic Referral form` | Named in the Phase 2 trap list; the browser spot-check is the real guard |

## Open questions

- **Should International really be a fifth band, or a fifth band plus cross-links from each
  grade band?** — **default:** a fifth band alone, per the user's call. An international
  applicant looking for their process will find the button; adding a pointer to every grade
  band repeats a line four times for a small audience. Revisit if the band reads as orphaned.
- **Should the contacts grid carry only Sheila Chaney, or add office rows?** — **default:**
  add the general admissions line (704-531-4008, Mon–Fri 7:30–3:00) and the two EEC offices as
  non-person rows, because a one-entry grid may read as an error rather than a finding. Decide
  in the browser at step 6.
- **Should the `intl` band's deadline strip carry the English-proficiency thresholds
  (`TOEFL Jr. 750+`, `SLEP 50+`) as tiles?** — **default:** yes. No international dates are
  published, so a date-shaped strip is impossible, and the thresholds are the band's most
  actionable published figures. If it reads oddly as a "deadline" strip, drop to a two-tile
  strip carrying the deposit and the full-payment rule.


## Implementation notes

Both phases shipped. Phase 1 (English) landed in commits 638e22e..164f173;
Phase 2 (nine prose locales) in 937d367. PR #268.

**Phase 2 deviated from the plan in one place, and it was load-bearing.** The plan's
Phase 2 step 1 says "the extractor already knows the `admissions` topic and the
`hickory-grove-christian` slug", which is true but not sufficient. Hickory Grove is the
first FIVE-band card in the area and names its bands after its own divisions, so four of
its six `guide.comparison.rows[].cells.*` keys (`tkk5`, `es`, `hs`, `intl`) did not exist
in `PATH_OVERRIDES`. The path matcher is exact-match per key, and an unregistered key is
**excluded from extraction rather than flagged at render** — so 32 comparison cells
(8 rows x 4 bands) would have shipped English to all nine locales with coverage still
reading 100%. Registering them in `scripts/i18n_fields.mjs` was step 0. The extractor
reported exactly four unclassified paths before the fix and none after.

This is the fourth card in a row to hit the same trap (`g611` #264, `ls`/`ms`/`us` #262,
`g1`/`g24` #254). A future Admissions school should run
`node scripts/i18n_extract.mjs --report --residual` **before** translating.

**Merged by `of` stamp, never re-extracted.** The extractor blanks every `t`, so a
`--force` re-extract would have wiped all 699 committed translations per locale. All nine
work files went 699 -> 923 units with zero existing translations changed or lost.

**Seven leaks were caught by comparing against the shipped corpus, not by the checkers.**
Five locales left the "Director of Admissions & International Student Program" job title
in English — and three of the translating agents explicitly defended it as a legitimate
frozen keep. The corpus translates admissions job titles in all nine locales, which
settled it. Separately, `hi` rendered `shadow` in Latin across 11 units where the
pre-existing Hindi corpus uses `शैडो` 15 times and Latin zero times. The lesson
generalises: **a translator's self-report is not evidence; the shipped corpus is.**

**The `Transitional Kindergarten` rule is a split, not a freeze.** An initial verifier
treated the whole phrase as frozen and flagged Arabic for translating it. The corpus
actually splits it — every locale keeps it English as the program name beside `(TK)` and
translates the descriptive use (3 of 4 kept, in all nine locales). Correcting the
verifier to track the `TK`/`K5` **token** instead is what surfaced the genuine `fa`
defect the original rule would have missed.

**Open questions resolved as planned:** International shipped as a fifth band alone with
no cross-links; the contacts grid carries the general admissions line and both EEC
offices alongside Sheila Chaney; the `intl` deadline strip carries the English-proficiency
thresholds as tiles. None needed revisiting in the browser.

**The five-band layout risk did not materialise.** `.ad-bands` holds all five in one row
in all nine locales at 1280px, with band widths within 5% of English (127-139px vs
132px), and stacks to five full-width rows at 390px. No CSS change was needed, so the
contingency the plan reserved for this PR went unused.
