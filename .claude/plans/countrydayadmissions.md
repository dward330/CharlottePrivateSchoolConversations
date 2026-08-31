---
name: countrydayadmissions
title: Add the Admissions research area for Charlotte Country Day School
status: english-done
phases: 2
created: 2026-08-30
branch: feat/countryday-admissions
prs: []
---

# Add the Admissions research area for Charlotte Country Day School

## Goal

Ship the Admissions research area for **Charlotte Country Day School (CCDS)** — the second
school in an area that has shipped for Providence Day only. CCDS runs one shared six-step
application framework that breaks at two grade boundaries, producing three distinct entry
bands (JK–K, Grades 1–4, Grades 5–12); the card lets a parent pick their band and see only
their process, then export it as a printable checklist.

We'll know it worked when `/school/charlotte-country-day/` renders an Admissions section
above Course Offerings with a working three-band selector, and
`/school/charlotte-country-day/admissions-checklist/?band=jkk` prints a clean one-band
sheet.

## Context

### What exists today

The Admissions topic is **fully built and school-agnostic**. Nothing about the area's
infrastructure needs changing — this plan adds a data file and wires it in.

- `src/data/admissionsPrograms.ts` — types (`AdmissionsGuide`, `AdBand`, `AdDeadline`,
  `AdStep`, `AdWatchOut`, `AdChecklistRow`, `AdComparisonRow`, `AdContact`, `AdSource`),
  the `ADMISSIONS_CARDS` registry (one card, key `guide`), the `PROGRAMS` map, and
  `loadAdmissionsOverlay()`.
- `src/data/admissionsPrograms/providence-day.ts` (504 lines) — **the benchmark**. Read it
  before writing the CCDS file; it is the only worked example of every field.
- `src/components/AdmissionsProgram.tsx` — the renderer. Every element maps over its array;
  there are **no hardcoded counts and no per-school branches**.
- `src/pages/AdmissionsChecklist.tsx` — the standalone printable page. It already calls
  `loadAdmissionsOverlay()` itself (the standalone-route overlay trap is handled).
- `src/lib/metrics.ts:43-49` — the `admissions` RULES array is a single `match: /.*/` entry
  folding every subtopic onto `redesign-research`. **Both new source files fold onto that
  one key; no new metric key is created.**
- `src/lib/metrics.ts:257` — `admissions` already leads `TOPIC_ORDER`.
- `scripts/i18n_topics.mjs:26-31` — `charlotte-country-day` is already in `SLUGS`, and
  line 45 maps `admissions → admissionsPrograms`. The extractor will pick the new file up
  with no wiring change.
- `scripts/seo_routes.mjs:46` — the checklist route is **deliberately absent** from SEO
  routes (it is a print surface). No SEO work in this plan.
- `src/locales/*.json` — `admissions.applyingFor`, `backToSection`, `checklistKicker`,
  `exportChecklist`, `printSave` all exist in all ten catalogs. **No new chrome keys.**

### Renderer facts worth knowing before authoring

Confirmed by reading the component, not assumed:

- `.ad-deadlines` is `grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))`
  (`src/index.css:5242`). A 3-tile strip is a first-class layout, not a broken 4-tile one.
  CCDS has four clean tiles per band anyway.
- `RULE_ICONS[i % RULE_ICONS.length]` — `rules` may be any length; icons cycle.
- `watchOuts` is mapped, but the type's docstring says **exactly two per band**. Follow that.
- `Emphasized` renders `**bold**` as `<strong>` in watch-out text and the aid strip.
  Available in `detail`, `text`, and aid `text`. **Not** in `deadlines[].value`/`label`.
- `AdComparisonRow.cells` accepts `{ all: string }` for a row identical in every band, which
  renders as one spanning cell.
- `headline` is load-bearing: `SchoolDetail` renders it as the collapsed `.topic-teaser`.
- `localizeMoneyText()` runs over deadline values, so `$100` and `10%` localize correctly.

### The nearest analogous work

Providence Day's own build (plan `admissions.md`). Follow its card structure, but **not its
prose** — see the Decisions below on the portal rule and the deposit.

## Decisions

- **Three bands: `jkk`, `g14`, `g512`** — mirrors the school's own two documented process
  breaks (K→1 deadline/decision track; 4→5 CAIS→ISEE). Keys are new; PD's are `tkk`/`g15`/
  `g612` and must not be copied, since the boundaries genuinely differ.
- **`rules[0]` is Veracross, not "One portal."** — PD's framing rule names Charger Commons
  in its text. CCDS uses Veracross. The rule is per-school prose; copying PD's would ship a
  false statement. Write CCDS's own.
- **`rules[1]` keeps the cycle caveat, and adds the mislabel** — CCDS's page headers say
  "2026-27" while the content is 2027–28. The research proved this three ways and the CAIS
  brochure corroborates it. The rule should tell a parent the site's own header is
  mislabeled, because they will see it.
- **The deposit stat tile shows `10%`, not a dollar figure** — CCDS publishes "10% of
  tuition," which varies by grade. Inventing a dollar amount would be a computed figure, not
  a published one. Caption carries "of tuition, credited toward it."
- **The director row is OMITTED from `contacts.people`** — user's call (2026-08-30). The
  Meet Our Team page carries a stale `nancy.ehringhaus@` mailto beside Eric Brunt's listing,
  and legacy pages still name her as Director. Ship the five uncontested staff. *(Note: the
  CAIS brochure independently confirms Brunt as current — recorded in source-material for a
  future pass, but the omission decision stands.)*
- **Practitioner contact details are NOT published in the app** — the CAIS brochure lists 18
  psychologists with addresses and phones. The app does not republish third-party
  practitioner directories; the card says an evaluation is booked with a CAIS-designated
  psychologist and links the brochure.
- **International is a watch-out, not a fourth band** — CCDS publishes TOEFL as an overlay on
  whichever band applies, not a parallel process. A fourth selector button would mislead an
  international Grade 8 applicant into thinking it replaces Band 3.
- **Two source files, one metric key** — the `match: /.*/` rule already folds both onto
  `redesign-research`. No `metrics.ts` change.
- **Two phases.** The card adds several thousand words of new research prose to
  `src/data/**`, reached by the overlay layer.

## Approvals needed

**None.** Adding a school to an existing area is explicitly automatic under the UX-design
gate (CLAUDE.md, §6 of the schema doc): no new card, section, stat tile, Compare row, metric
key, or topic. Every field CCDS populates already exists and already renders for Providence
Day.

The user has already reviewed the coverage assessment and approved the build.

## Source material

**Both files are written and uncommitted** as of this plan. `/implement` runs
`ingest-source-material` on them as step 1.

| File | Contents |
|---|---|
| `source-material/admissions/charlotte-country-day/Charlotte Country Day - Admissions - Grade-by-Grade Application Plans.md` | The main research pass: cycle audit, three bands, cross-band table, shared timeline, all-applicant policies, NOT PUBLISHED register, contacts, 18 source URLs |
| `source-material/admissions/charlotte-country-day/Charlotte Country Day - Admissions - CAIS Testing Consortium.md` | The CAIS brochure, **retrieved during planning** |

### What the CAIS retrieval changed

The prior research pass recorded the CAIS brochure as **NOT RETRIEVED** ("PDF body
inaccessible"). It was retrieved on 2026-08-30: the school's resource-manager URL
**302-redirects** to a `resources.finalsite.net` PDF, and following the redirect plus
`pdftotext -layout` yields the full document. Everything the prior pass listed as unknown is
now in hand:

- **The per-grade instrument** — WPPSI-IV for Pre-K/K/**Grade 1**; WISC-V for **rising
  Grades 2–4**. Note this **cuts across CCDS's own band boundary**: the Grades 1–4 band
  contains both instruments. The card must not say "Grades 1–4 take the WISC-V."
- **Testing fee** — $300 either instrument, paid to the psychologist, separate from the $100
  application fee.
- **Age + retest rule** — "children must be at least four years of age at the time of
  testing. Testing can be administered only once in a twelve month period."
- **Coaching rule** — any indication of coaching, tutoring or re-testing "will invalidate
  your application to any CAIS school"; parents sign a Test Validity Verification Form.
- **One evaluation serves all seven CAIS schools**, four of which this app already covers.
- **Consortium-wide notification dates** that corroborate CCDS's own exactly.
- **Cancellation policy** — nonrefundable $100 cancellation fee; no refund within 72 hours.

Still not retrievable: which psychologists are "shaded" (WISC-V-capable) — the shading is a
visual attribute lost in text extraction. Recorded as such in the source file.

## Out of scope

- **The other nine schools.** They stay absent from `PROGRAMS`; their pages render no
  Admissions section. Adding a stub entry would be actively wrong (an empty entry is still
  truthy).
- **Compare rows.** Admissions contributes none today and this plan adds none.
- **The checklist route's SEO registration.** Deliberately excluded upstream.
- **Republishing the CAIS psychologist directory.**
- **Re-litigating Providence Day's card.** No edits to `providence-day.ts`.
- **Deploying.** Merging is pre-authorized; publishing is the user's separate call.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout -b feat/countryday-admissions` from an up-to-date `main`.

2. **Ingest the source material.** Run the `ingest-source-material` skill over the two new
   files in `source-material/admissions/charlotte-country-day/`. This regenerates the
   distilled notes in `.claude/docs/` and adds the `admissions × charlotte-country-day` cell
   to `src/data/schools.json`. Confirm the topic now reports **2/11** schools and that both
   files fold onto the single `redesign-research` key (no orphan subtopic key appears — a new
   key would show as a ⚠️ in the schema doc and in `npm run check:metrics`).

3. **Create `src/data/admissionsPrograms/charlotte-country-day.ts`.** Export
   `export const charlotteCountryDay: AdmissionsProgram = { guide: { … } }`. Open
   `providence-day.ts` alongside and match its structure field for field. Author, per the
   research file:

   - **File header comment** — mirror PD's: the source file it was transcribed from, the
     cycle rule (2027–28 only; the site's own "2026-27" headers are a **mislabel**, proven
     three ways and corroborated by the CAIS brochure; the stale-cache Dec 31 2025 / Feb 7
     2026 dates are the prior closed cycle and are never carried forward), and the school's
     own NOT PUBLISHED markers that ship as "confirm with admissions."
   - **`headline`** — the collapsed teaser. One or two sentences on picking the band.
   - **`cycle`** — `'2027–28 entry cycle'` (en-dash).
   - **`stats`** — four tiles: `3` bands · `Jan 2, 2027` JK/K deadline · `Jan 15, 2027`
     Grades 1–12 deadline · `10%` enrollment deposit (caption: of tuition, credited toward
     it).
   - **`rules`** — two: the Veracross portal rule (inquiry → portal account → personalized
     checklist), and the cycle rule naming the header mislabel.
   - **`spineNote`** — the six published steps verbatim as the shared spine, noting what
     changes is Step 3, the deadline, and the decision track.
   - **`bands`** — three, in calendar order:
     - `jkk` / `'JK / Kindergarten'` / sublabel `'CAIS screening · earlier calendar'`
     - `g14` / `'Grades 1–4'` / sublabel `'CAIS screening · later calendar'`
     - `g512` / `'Grades 5–12'` / sublabel `'ISEE · two campuses'`

     Each with four `deadlines`, an ordered `steps` list, **exactly two** `watchOuts`, a
     `checklistCallout`, and `checklistRows`. Per-band content is in the research file's
     BAND 1/2/3 tables. Deadline strips:
     - `jkk`: Jan 2, 2027 · Feb 1, 2027 · Feb 26, 2027 · Mar 5, 2027
     - `g14` and `g512`: Jan 15, 2027 · Feb 26, 2027 · Apr 9, 2027 · Apr 16, 2027

     **No `unpublished: true` tiles** — every CCDS date is published.
   - **`aid`** — Clarity, $65 fee, **Jan 15** for prospective families (Nov 1 is current
     families — do not use it as the prospective deadline), need-based only, no merit
     scholarships, both parents submit, decided separately from admission, award communicated
     with the enrollment contract, reduced refundable deposit for aid applicants.
     `button: 'Financial Aid & Tuition'`.
   - **`comparison`** — nine rows from the research file's cross-band table. "Named open
     house" has `none published` for `g14`. Consider an `{ all }` row for the constants
     ($100 fee, Veracross, faculty meeting, 10% deposit).
   - **`contacts`** — address `1440 Carmel Road, Charlotte, NC 28226 · main 704-943-4530`.
     **Five people — omit the Director row** (see Decisions): Robin Riggins, Molly Philips,
     Tianna Butler, Cheryl Miller, McKenzie Irwin, each with title and direct phone.
   - **`checklist`** — `portalNote` naming Veracross; `aidPanel` with the Clarity items;
     `contactPanel` with the admissions main line and address; `disclaimer` mirroring PD's,
     naming the 2027–28 cycle, the Aug 2026 retrieval, the header-mislabel caveat, and
     "Compiled by Charlotte School Compare; not affiliated with Charlotte Country Day
     School."
   - **`sources`** — the deep links actually used: admissions-process, FAQ,
     tuition-financial-aid, meet-our-team, the Veracross portal, Clarity, and the CAIS
     brochure. Plus one URL-less trailing note listing what is not published (waitlist,
     sibling/legacy, transfer/mid-year, international visa/I-20, K birthday cutoff, 2028–29
     dates).

   **Three content traps, all of which produce plausible-looking wrong text:**
   - The **WPPSI-IV/WISC-V boundary is Grade 1 vs Grade 2**, inside the Grades 1–4 band.
     Write the Grades 1–4 assessment as "WPPSI-IV for Grade 1, WISC-V for rising Grades 2–4."
   - **Nov 1 is the *current*-family aid deadline.** Prospective families are Jan 15.
   - **JK/K teacher recommendations are due Jan 15**, two weeks *after* that band's Jan 2
     application deadline. Not a typo.

4. **Register the school** in `src/data/admissionsPrograms.ts`: import
   `charlotteCountryDay` from `./admissionsPrograms/charlotte-country-day.ts` and add
   `'charlotte-country-day': charlotteCountryDay` to `PROGRAMS`. Update the module's
   docstring — it currently says "ONE school, not eleven… the data ships for Providence Day
   only." Make it two.

5. **Regenerate the schema doc.** `npm run schema`, then `npm run check:schema`. The
   Admissions rows should move from 1/11 to 2/11 in both the research-area grid and the
   structured-card section, and `charlotte-country-day` should drop off the "absent" list.

6. **Verify in a browser** (see Verification below), then commit and open the PR.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording is what they want.

### Phase 2 — Every other locale

Research prose, so this is the **overlay layer** (`PROSE_TRANSLATED` in `src/lib/i18n.ts`:
`es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`) — **not** the `src/locales/*.json`
chrome catalogs, which need no change (every chrome key this card uses already exists in all
ten).

Follow `.claude/docs/prose-translation-architecture.md` for the mechanism and a per-locale
rollout doc for register. **Do not re-derive the method.**

1. **Extract** the new English into the nine work files — the extractor already knows the
   `admissions` topic and the `charlotte-country-day` slug; no wiring change.
2. **Translate** each locale's new units. Key by English text, never by index.
3. **Rebuild** the nine `src/data/overlays/admissions.<lang>.json` overlays.
4. **Run the locale checks** (below), then commit into the same PR.

Locale traps that apply to this card specifically:

- **Figures are copied char-for-char** — `$100`, `$300`, `$65`, `10%`, `Jan 2, 2027`. Never
  re-typed, never unit-converted, never separator-swapped.
- **`hi` / `te` regroup at render** — the data stores the English 3-3-3 figure. A work file
  containing a pre-regrouped figure hardcodes a second regrouping.
- **`fa` / `ar` are RTL** — bidi-neutral figures get LRI…PDI isolates at render; the overlay
  stores **no** isolate characters.
- **Identifiers stay English** — `ISEE`, `TOEFL`, `WPPSI-IV`, `WISC-V`, `CAIS`, `Veracross`,
  `Clarity`, `Junior Kindergarten`, `Cannon Campus`, `Bissell Campus`. These are searchable
  strings a parent matches against the school's own page. Watch for the French-inverse leak
  shape: a sentence sitting in a field beside these that genuinely must move.

## Files touched

| File | Change |
|---|---|
| `source-material/admissions/charlotte-country-day/Charlotte Country Day - Admissions - Grade-by-Grade Application Plans.md` | new — written during planning, uncommitted |
| `source-material/admissions/charlotte-country-day/Charlotte Country Day - Admissions - CAIS Testing Consortium.md` | new — written during planning, uncommitted |
| `src/data/admissionsPrograms/charlotte-country-day.ts` | new — the guide data |
| `src/data/admissionsPrograms.ts` | edit — import + `PROGRAMS` entry + docstring |
| `src/data/schools.json` | regenerated by ingest |
| `.claude/docs/*` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated by `npm run schema` |
| `src/data/overlays/admissions.<9 locales>.json` | Phase 2 — rebuilt |
| `.claude/plans/INDEX.md` | edit — flip to Implemented + PR |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean. **Then `npm run build` and read its exit code** — `tsc -b`
      inside the build catches type errors `--noEmit` has missed in this repo.
- [ ] `npm run check:schema` — passes; Admissions now reports 2/11.
- [ ] `npm run check:metrics` — no new unmatched subtopic for `admissions`.
- [ ] `npm run check:seo` — passes (no route change expected; this confirms it).
- [ ] `npm run build` — succeeds end to end, including the chained checks.
- [ ] **Browser check** at `/school/charlotte-country-day/`, via Playwright with
      `domcontentloaded` (**not** `networkidle` — the Latest News fetch never idles):
  - The Admissions section renders **above** Course Offerings.
  - The collapsed teaser shows `headline`.
  - The band selector shows **three** joined buttons; clicking each swaps the deadline
    strip, the stepper, and both watch-outs.
  - The deadline strip shows four tiles per band, no overflow at mobile width.
  - The cross-band table renders; any `{ all }` row spans all three columns.
  - The source row linkifies every citation carrying a URL.
- [ ] **Checklist page** at `/school/charlotte-country-day/admissions-checklist/?band=jkk`,
      and for `g14` and `g512`: correct band title, correct rows, and the aid/contact panels.
      Print-preview one to confirm it paginates cleanly.
- [ ] **Read the three trap fields back against the research file**: the Grade 1 vs Grade 2
      instrument split, the Jan 15 prospective aid deadline, and the Jan 15 JK/K
      teacher-rec date.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves; no unresolvable entries.
- [ ] `npm run check:live` — clean; all three gates.
- [ ] `npm run check:sepdrift -- --lang <each>` — no separator re-typings.
- [ ] `npm run check:figures` / `check:money` / `check:currency` — figures intact.
- [ ] `npm run check:chrome` — no missing keys (expected clean; no new chrome).
- [ ] `npm run build` — succeeds with the locale gates chained in.
- [ ] **Browser spot-check in at least two locales, one of them RTL (`fa` or `ar`) and one
      lakh/crore (`hi` or `te`)**: the card renders translated prose, figures read correctly
      inside RTL paragraphs, and `ISEE`/`WPPSI-IV`/`Veracross` are still Latin.

## Risks

| Risk | Mitigation |
|---|---|
| The WPPSI/WISC boundary is written as the band boundary — plausible, wrong, and invisible to every checker | Step 3 calls it out explicitly; Phase 1 verification reads the field back against the research file |
| Nov 1 used as the prospective-family aid deadline | Same — named in the step and in verification |
| The card is built by copying `providence-day.ts` and PD's portal/deposit prose survives | Decisions section names both; the file header comment is written fresh |
| Ingest creates an orphan subtopic key | `match: /.*/` already folds everything onto `redesign-research`; step 2 confirms, `check:metrics` and the schema doc's ⚠️ catch it |
| The 2027–28 dates go stale | The `cycle` field labels every date, the disclaimer names the retrieval month, and `rules[1]` tells the reader to verify |
| Phase 2 translates an identifier | Named in the Phase 2 trap list; `check:live` gate 3 catches an untranslated *block*, not a wrongly-translated identifier — the browser spot-check is the real guard |

## Open questions

- **Should the Grades 1–4 band's assessment step name both instruments, or defer to "a
  CAIS screening"?** — **default:** name both, with the Grade 1 / Grades 2–4 split explicit.
  The brochure is an official published source and the split is exactly the kind of detail
  the card exists to surface. If it reads as clutter at review, collapse it to "CAIS
  screening — instrument depends on your child's grade" and keep the detail in the watch-out.
- **Should the CAIS $300 testing fee appear in a stat tile?** — **default:** no. The four
  tiles are bands / JK-K deadline / Grades 1–12 deadline / deposit. The $300 belongs in the
  assessment step's `detail` and in the Grades 1–4 watch-out, since it is paid to a
  psychologist rather than to the school and a tile would imply otherwise.
- **Does the user want the CAIS "one evaluation serves seven schools" fact surfaced?** —
  **default:** yes, in the `jkk` watch-out. It is genuinely useful to a parent applying to
  several Charlotte independents, and four of the seven are schools this app covers. It does
  not name the other schools in the card.

## Implementation notes

### One deviation from the plan — the shared card title named the wrong bands

`ADMISSIONS_CARDS[0].title` is a **single string shared by every school**, and it reads
`'Grade-by-Grade Application Guide — TK/K · 1–5 · 6–12'` — Providence Day's band
boundaries. The plan treated the card registry as school-agnostic (Context: "no hardcoded
counts and no per-school branches"), which is true of the *renderer* but not of the card
title. Left alone, the heading above Country Day's card would have advertised
`TK/K · 1–5 · 6–12` over a card whose bands are `JK/K · 1–4 · 5–12`, for a school with no
TK at all.

Fixed by adding `TITLE_OVERRIDES` + `titleOverrideSlug()` + `admissionsCardTitleFor()` to
`src/data/admissionsPrograms.ts` and wiring them at `SchoolDetail.tsx:1089`. This is not a
new mechanism: **the Arts area already does exactly this, for exactly this school** — see
`TITLE_OVERRIDES` in `artsProgram.ts`, where Country Day's ladder card is renamed
`'The JK–12 Arts Ladder'` with the comment "Cannon and Country Day start at JrK/JK, not
TK". The i18n contract comes along with it: `cardTitle()` looks an overridden title up
under the school-scoped key `cards.admissions.guide@charlotte-country-day`, exactly as
`cards.the-arts.ladder@davidson-day` already works.

No UX approval was sought for this and none is needed: no card, section, tile, Compare row
or metric key is added — an existing heading is corrected to name this school's own bands,
which is per-school research data, using a mechanism already approved and shipped in
another area.

### An unrelated pre-existing drift, fixed in its own commit

Running `scripts/build_site_content.py` (a whole-corpus pass) regenerated
`src/content/college-support/carmel-christian.json`, which had nothing to do with this
plan. The cause: `.claude/docs/college-support/carmel-christian.md` was rebuilt on
2026-08-24 to add a `High School Profile 2024-25` source, but `build_site_content.py` was
never re-run afterwards. The shipped JSON therefore held a stale 16-section slice that was
missing that section **and had every following section's text sitting under the next
section's subtopic heading** — so the page rendered real prose under wrong headings.

Committed separately (`df9acaa`) so it is reviewable on its own rather than buried in the
feature diff. No source material and no distilled note changed; only the derived content
slice.

### Everything else went as written

The three content traps the plan called out were all authored correctly first time and
were re-read against the research files at verification: the WPPSI-IV/WISC-V split at
Grade 1 vs Grade 2 (never at the band boundary), Jan 15 as the *prospective*-family aid
deadline, and the JK/K teacher recommendation falling Jan 15 — after that band's own Jan 2
application deadline. All three defaults in *Open questions* were taken: both instruments
named with the split explicit, no `$300` stat tile, and the "one evaluation serves seven
schools" fact surfaced in the `jkk` watch-out.
