---
name: plainsmall
title: Teach the plain-language checker to skip prose no parent sees (one shared flag-visibility rule read by the components and the checker, plus a build check that keeps them in agreement), then rewrite the five small areas' English prose (After School, Global Exposure, Summer Programs, Learning Support, High School Placement; 97 rendered sites) and the 5 jargon chrome labels in en.json; English in three reviewed batches, then all nine prose locales and nine chrome catalogs
status: in-progress
phases: 2
batches: 3                     # Phase 1 Part 2 is built in three batches, each with its own review stop
created: 2026-11-10
branch: feat/plainsmall
prs: []
---

# Plain-language checker fix + rewrite of the five small areas

## Goal

This plan does two things, in this order.

**Part 1: the checker stops counting text a parent never sees.**
- **The problem.** In Student Clubs, GAP and COUNT flags never render. Only not-a-club flags
  show (`ClubsProgram.tsx` `Flags()`). But `scripts/check_plain_language.mjs` treats GAP
  and COUNT flags as parent-facing. So `npm run check:plain` overcounts (student-clubs
  **Flagged 16** today, every one a hidden flag), and the hook would block an edit to text
  nobody reads.
- **The fix.** The rule for which flag kinds render moves into one module,
  `src/lib/flagVisibility.ts`. The components filter through it and the checker skips
  through it.
- **The drift guard.** A build check, `npm run check:flags`, fails if a component starts
  filtering flags any other way. Then a component that begins rendering a skipped kind
  cannot leave the checker silently blind to it.
- Part 1 lands first, as Step 1, in its own commit. It is single-phase, because it changes
  no text a parent reads.

**Part 2: rewrite the remaining small areas' English prose** to the plain-language standard
in `CLAUDE.md`. The reader is an average parent, the target is grade 8–10, and no sentence
runs past 30 words.
- **The five areas:**
  - After School (`src/data/afterSchoolPrograms/`);
  - Global Exposure (`src/data/internationalTravel/`);
  - Summer Programs (`src/data/summer/`);
  - Learning Support (`src/data/learningSupport/`);
  - High School Placement (`src/data/highSchoolPlacementPrograms/`).
- **Plus the 5 jargon chrome labels** in `src/locales/en.json`.
- **Plus the issues the first draft only flagged** (user, 2026-11-10: "add fixing those
  issues into the plan too"):
  - the 21 rendered units across these areas that carry research bookkeeping. 19 are
    rewritten in place, and 2 move a research step into a dev-only `verify` flag;
  - the stale After School Cannon claim "the deepest published enrichment catalog of the
    six";
  - the literal `*Focus*` asterisks;
  - "centred", plus the spelling-map gap that let it pass `check:spelling`.
- **Precedent.** This is the sixth per-area follow-up, after plaincollege (#467),
  plainadmissions (#469), plainaid (#471), plainarts (#476) and plainclubs (#479).
  **plainclubs is the model**, with plainarts behind it. The bar, the review file and
  guards (`scripts/plain_review.mjs`), the independent subagent review per batch, and the
  two-phase English-then-translation process are all the same.

It worked when:

- **Checker (Part 1):**
  - `npm run check:plain` no longer counts the hidden GAP/COUNT flags. student-clubs is
    **Flagged 0** (from 16), and every other area is unchanged by Step 1 alone;
  - `npm run check:flags` is in the build and green;
  - the new `node:test` cases pass;
  - the clubs page renders exactly what it did.
- **Hook loop (Part 2):**
  `for f in src/data/{afterSchoolPrograms,internationalTravel,summer,learningSupport,highSchoolPlacementPrograms}/*.ts src/locales/en.json; do node scripts/check_plain_language.mjs --file $f; done`
  reports **0 issues**. Today it reports 111 issues across the 50 data files, plus 5 in
  `en.json`.
- **Grade bar.** Every rendered ≥30-word unit in scope is at grade ≤10, or appears in
  "Residual units above grade 10" with its reason.
- **Nothing a parent compares has changed.** That covers:
  - every program, class, camp, trip, destination, school, partner, provider and service
    name;
  - every staff name and email;
  - every date, time, season, fee, rate, age and grade eligibility;
  - every count and every quote;
  - the NOT STATED chip for each unpublished Learning Support service.

  No published-vs-not-published, required-vs-optional, included-vs-extra,
  school-run-vs-third-party, estimate-vs-published or accepted-vs-enrolled marker was lost
  or added. The guards (Step 1b) prove the mechanical part; the independent reviewer and
  the user check the rest.
- **Bookkeeping and fixes.**
  - The `BOOKKEEPING_RE` sweep finds no rendered unit in the five dirs.
  - The two verify flags render on the dev server only.
  - Cannon's claim reads "largest fully priced … on this site".
  - `check:spelling` now catches "centred".
- **Approvals.** The user has approved the English of all three batches, and an
  independent subagent has checked every before/after pair.
- **Translations.** All nine prose locales carry fresh translations of the rewritten units,
  and all nine non-English chrome catalogs carry the 5 revised labels. Every overlay and
  catalog check is green.

**Two-phase.** Part 2 changes research prose and chrome a parent reads. So Phase 1 is
English only and stops for review, and Phase 2 translates. Phase 1 is split into **three
batches with a review stop after each**, sized for a ~20-minute review (see "Batch plan").
Part 1 runs inside Batch 1 and needs no translation.

## Context

### Part 1 research: what renders, area by area (measured 2026-11-10 at `9d19c942`)

**Flag kinds.** Six components render a flag list. All of them except Clubs go through
`visibleFlags()` in `src/lib/toVerify.ts`, which hides only `kind: 'verify'`, and hides it
only in production (`import.meta.env.DEV` shows it on the dev server).

| Area (topic) | Component | Flag type / kinds in data | What renders in production |
|---|---|---|---|
| college-support | `CollegeSupport.tsx` `Flags()` | `CsFlag` / gap 35, verify 50 | every kind but `verify` |
| high-school-placement | `HighSchoolPlacement.tsx` `Flags()` | `CsFlag` (re-exported) / none set today | every kind but `verify` |
| after-school | `AfterSchool.tsx` `Flags()` | `AsFlag` / gap 38, stale 4, estimate 1, verify 30 | every kind but `verify` |
| summer-programs | `SummerPrograms.tsx` `Flags()` | `SuFlag` / gap 15, stale 4, estimate 2, verify 17 | every kind but `verify` |
| student-clubs | `ClubsProgram.tsx` `Flags()` | `ClubsFlag` (`FlagKind` = `count`/`gap`/`not-a-club`) / gap 28, count 5, not-a-club 9 | **only `not-a-club`**, in dev too: `flags.filter((f) => f.kind === 'not-a-club')` |
| international-travel, learning-support, admissions, the-arts, sports | no flag list | — | — |

So **the only parent-invisible prose the checker counts today is Student Clubs' GAP and COUNT
flags.** The checker already skips `verify` everywhere, in `proseUnits()`
(`scripts/check_plain_language.mjs` ~line 125: `if (node.kind === 'verify') return`). It
skips them anywhere in the tree, not only under `flags`.

**Other `kind` fields are not flags.**
- `highSchoolPlacement.ts` `steps[].kind` is a display string ("Exposure · the anchor
  event").
- `artsProgram.ts` `season[].kind` is a show type.
- `CompareCourseRows.tsx` has a local `flags` variable that is not a flag list.

The new skip must therefore be scoped to objects **inside a `flags` array**, never to any
object with a `kind`.

**Fields.** A scratch sweep checked every prose field in the five areas plus Clubs, College,
Admissions, Arts and Sports. It listed every generic prose path (`proseUnits` +
`classifyField`) and searched the area's component, plus `SchoolDetail.tsx`, for its leaf
name. **No prose field in the five areas is unreferenced.**
- The sweep's only hits were false positives:
  - HSP `verdict.checklist[]` renders through the `VerdictBody` it re-exports from
    `CollegeSupport.tsx`;
  - Admissions `guide.*` renders on `src/pages/AdmissionsChecklist.tsx`;
  - HSP `destinations.categories[].notes.<school>` is a map keyed by school name.
- Sports `toVerify` cells still render their `record` in production; only the chip is
  dev-only.

**Sections and cards.** Every school with a file in the five dirs has that topic in
`src/data/schools.json`, so every section renders. The five areas pick cards by data
(`*_CARDS.filter((c) => entry[c.key] != null)` in `SchoolDetail.tsx`), so a card with data
renders. Student Clubs' Academic & Competitive Clubs and Club Catalog cards are
manifest-gated by metric key. They render today for every school that has an entry: the
pre-rendered `dist/school/<slug>/index.html` for Charlotte Catholic, Carmel, Trinity and
Cannon each shows the card. That gating is not a flag kind, so `check:flags` does not
cover it (Out of scope).

**Chrome.** Two of the five en.json labels looked as if they might be dead, but both
render:
- `metrics.institutional-leverage` ("Institutional Leverage") and `metrics.matriculation`
  ("D1 / Top-College Matriculation") reach no school page. College Support and Sports
  replace the metric-group cards with structured cards.
- But both are **Compare "research coverage" row labels**:
  - `Compare.tsx` ~line 732 renders `metricLabel(t, m.metric.key, …)` for every
    `metricsForTopic(activeTopic)` row;
  - 7 College Support docs resolve to `institutional-leverage`, and 28 Sports docs (the
    "College Commitments …" and "D1 Matriculation" files) resolve to `matriculation`;
  - `dist/compare/index.html` (College Support is the default topic) contains
    "Institutional Leverage".

  So both are in scope.

### Part 1 design (recommended, and built in Step 1)

**One source of truth, read by both sides.** A new module, `src/lib/flagVisibility.ts`,
holds the rule:

```ts
/** Flag kinds that are research bookkeeping: rendered on the dev server only. */
export const DEV_ONLY_FLAG_KINDS: readonly string[] = ['verify']
/** Per topic: flag kinds that never render, in dev or production. */
export const HIDDEN_FLAG_KINDS: Readonly<Record<string, readonly string[]>> = {
  'student-clubs': ['gap', 'count'],
}
/** The flags a topic renders. `dev` = show dev-only kinds too. */
export function renderedFlags<F extends { kind: string }>(topic: string, flags: F[], dev: boolean): F[]
/** True when a flag of this kind can reach a parent on the production site. */
export function isParentFacingFlag(topic: string, kind: string): boolean
```

- **Constraints on the module.** It must be importable under plain Node 24 (type
  stripping; the checker already imports `src/lib/metrics.ts` this way). So it has **no
  `import.meta.env` and no imports**.
- **`toVerify.ts`.** It keeps `SHOW_TO_VERIFY`. `visibleFlags` becomes
  `visibleFlags(topic, flags)` = `renderedFlags(topic, flags, SHOW_TO_VERIFY)`.
- **The five components** call it with their own topic slug, as a string literal:
  - `AfterSchool.tsx` `'after-school'`;
  - `CollegeSupport.tsx` `'college-support'`;
  - `SummerPrograms.tsx` `'summer-programs'`;
  - `HighSchoolPlacement.tsx` `'high-school-placement'`;
  - `ClubsProgram.tsx` `'student-clubs'`. Its hard-coded `f.kind === 'not-a-club'` filter
    is replaced.
- **Rendering is identical.** For every kind that exists today, the output does not
  change:
  - Clubs data holds no `verify` flags, so "not gap/count" equals "only not-a-club" for
    the three kinds in `FlagKind`.
  - The one behavioral difference is deliberate. A **new** clubs flag kind would now
    render by default, and the checker would check it by default. That is the fail-safe
    direction: the checker over-checks rather than going blind.
- **The checker.** `proseUnits(entry, prefix, classifyField, topic?)` skips an object
  whose path ends `flags[N]` when `!isParentFacingFlag(topic, node.kind)`. It keeps the
  existing anywhere-in-the-tree `verify` skip for back-compat, since 97 verify objects
  depend on it. `unitsFromModule` passes `scope.topic` (module) or `spec.topic`
  (accessor). `getLayout()` imports `src/lib/flagVisibility.ts` lazily, after the hook's
  fast path.
- **`plain_review.mjs`.**
  - It keeps seeing hidden flags as rows, and guard (k) still fails on an edit to one.
  - Its `--worklist` now leaves out the `--dir` topic's `HIDDEN_FLAG_KINDS` by default,
    so worklists hold only rendered text.
  - `--skip-flag-kinds` stays, and adds to the default. plainclubs' commands give the
    same result as before.

**The drift guard: `scripts/check_flag_visibility.mjs`, `npm run check:flags`, chained into
`npm run build`.** It is a static source check. It needs no JSX compile and no browser.
It asserts:

1. **One filter.** Every `src/components/*.tsx` that imports a flag type from `src/data`
   (`/\b\w*Flag\b/` in an `import type { … }` from `'../data/…'`: `AsFlag`, `CsFlag`,
   `SuFlag`, `ClubsFlag`) calls `visibleFlags(` at least once.
2. **Known topic.** Every `visibleFlags(` call in `src/components` has a **string-literal
   first argument** that is a key of `TOPICS` in `scripts/i18n_topics.mjs`.
3. **No literal kind compare in a component.** In those same files, there is no
   comparison of `.kind` to a string literal (`/\.kind\s*[!=]==?\s*['"]/` or
   `/\[['"][\w-]+['"](?:,\s*['"][\w-]+['"])*\]\.includes\(\s*\w+\.kind/`). A future
   "only show X" filter must go into `flagVisibility.ts`, where the checker reads it.
4. **The hidden list is live.** Every `HIDDEN_FLAG_KINDS` key is called by some component
   (rule 2), and every kind it lists is a member of that topic's flag-kind union. A small
   table in the check maps topic → (registry file, type name), e.g. `'student-clubs'` →
   `src/data/clubsProgram.ts` `FlagKind`. It parses `export type <Name> = 'a' | 'b'`, and
   fails if the table entry's type is missing. This catches a renamed or deleted kind.
5. **One copy.** `DEV_ONLY_FLAG_KINDS` and `HIDDEN_FLAG_KINDS` are defined only in
   `src/lib/flagVisibility.ts`. A grep of `src/` and `scripts/` for `'not-a-club'` used as
   a filter, or for a second `HIDDEN_FLAG_KINDS` declaration, finds none outside that
   file and the tests.

The check's exit and messages follow the repo's convention. Exit 1 names the file and line
and says what to do, for example "filter flags through visibleFlags(topic, flags) in
src/lib/flagVisibility.ts so check_plain_language.mjs sees the same rule". Exit 0 prints a
one-line summary.

**Why this and not a check that only compares two lists.** With two copies (the component's
filter and a checker skip list) and a comparator, both still have to be edited, and the
comparator has to parse arbitrary filter code. With one copy and a guard that forbids
filtering any other way, there is nothing to compare. The failure the user named, a
component starting to render a skipped kind, can only happen by editing
`flagVisibility.ts`, and the checker reads that same file.

### Part 2 worklist (measured 2026-11-10 at `9d19c942`)

Generated with
`node scripts/plain_review.mjs --dir src/data/<dir> --worklist <scratch>` per area: the
hook-flagged units, plus the ≥30-word units at grade 10–12. **Part 1 removes none of
them.** None of these areas hides a flag kind, and `verify` flags are already excluded.

| Area | Dir | Units | Hook-flagged | Grade 10–12 only | Long | Grade | Jargon | Before-words | Max grade |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|
| After School | `afterSchoolPrograms` (12 schools) | **38** | 29 | 9 | 21 | 19 | 3 (`cohort`) | 1,523 | 17.3 |
| Global Exposure | `internationalTravel` (6) | **27** | 22 | 5 | 16 | 18 | 1 (`cohort`) | 954 | 24.4 |
| Summer Programs | `summer` (12) | **19** | 13 | 6 | 12 | 8 | 0 | 779 | 20.6 |
| Learning Support | `learningSupport` (5) | **10** | 8 | 2 | 3 | 5 | 2 (`executive function`) | 272 | 18.7 |
| High School Placement | `highSchoolPlacementPrograms` (2, K–8) | **3** | 2 | 1 | 2 | 1 | 0 | 106 | 15.9 |
| **Data total** | | **97** | **74** | **23** | | | **6** | **3,634** | |
| Chrome | `src/locales/en.json` | **5** | 5 | 0 | 0 | 0 | 5 | ~16 | — |

The hook reports **111 issues** across the 50 data files and **5** in `en.json`.
`npm run check:plain` today:

| Area | Prose units | Flagged | Jargon | >30-word sentence | Grade >10 | Grade >12 |
|---|--:|--:|--:|--:|--:|--:|
| after-school | 1097 | 29 | 3 | 21 | 33 | 19 |
| international-travel | 1296 | 22 | 1 | 16 | 26 | 18 |
| summer-programs | 1590 | 13 | 0 | 12 | 17 | 8 |
| learning-support | 630 | 8 | 2 | 3 | 8 | 5 |
| high-school-placement | 131 | 2 | 0 | 2 | 3 | 1 |
| student-clubs | 1063 | 16 | 0 | 10 | 19 | 10 |
| chrome | 803 | 5 | 5 | 0 | 1 | 0 |
| (unchanged by this plan) sports 79, course-offerings 95, metric-values 37, financial-aid-tuition 2, admissions 0, the-arts 0, college-support 0, financial-aid-report 0 | | | | | | |

**Worklist sites per area** (`slug:path`):

- **After School (38):**
  - `cost.flags[].text` 6;
  - `dayInside.flags[].text` 6;
  - `coverage.flags[].text` 4;
  - `dayInside.wordsText` 5;
  - `verdict.watchouts[]` 5;
  - `dayInside.subhead` 3;
  - `dayInside.catalogIntro` 3;
  - `coverage.basisNote` 3;
  - `verdict.strengths[]` 2;
  - `cost.fees[].label` 2;
  - `verdict.checklist[]` 1;
  - `coverage.summer.text` 1;
  - `cost.aside.text` 1.
- **Global Exposure (27):**
  - `lead.strong` 6;
  - `verdict.standsOut.summary` 6;
  - `network.rows[].text` 3;
  - `trips.alsoOnRecord[].text` 3;
  - `signup.intro.muted` 2;
  - `community.cells[].text` 2;
  - `trips.intro.strong` 1;
  - `exchanges.intro.strong` 1;
  - `network.cells[].text` 1;
  - `network.conferences[].text` 1;
  - `trips.headline` 1;
  - `verdict.ask[].question` 1.
- **Summer (19):**
  - `catalog.flags[].text` 6;
  - `costPlanner.fees[].label` 4;
  - `costPlanner.aside.text` 3;
  - `costPlanner.flags[].text` 2;
  - `catalog.camps[].desc` 2;
  - `catalog.intro` 1;
  - `catalog.headline` 1.
- **Learning Support (10):**
  - `eligibility.eligible` 2;
  - `services.verdicts.attn.head` 2;
  - `lead.strong` 1;
  - `staff.note.muted` 1;
  - `services.groups[].rows[].detail` 1;
  - `testing.headline` 1;
  - `testing.entries[].muted` 1;
  - `eligibility.headline` 1.
- **High School Placement (3):**
  - `outcomes.headline` 1;
  - `placement.steps[].text` 2.

**The five chrome labels:**

| Key | Today | Renders at |
|---|---|---|
| `metrics.institutional-leverage` | Institutional Leverage | Compare → College Support, research-coverage row label |
| `metrics.matriculation` | D1 / Top-College Matriculation | Compare → Sports, research-coverage row label |
| `highSchoolPlacement.acceptanceNotMatriculation` | ACCEPTANCE ≠ MATRICULATION | HSP destinations card, bold caps lead before `…acceptanceNotMatriculationText` (`HighSchoolPlacement.tsx` ~line 480) |
| `learning.need.attn` | Attention & executive function | Learning Support need-filter tab (`LearningSupport.tsx` ~line 212), all 5 LS schools |
| `learning.need.social` | Social-emotional | Learning Support need-filter tab |

### How each field renders (what a rewrite may contain)

Confirmed in the five components and `SchoolDetail.tsx`.

- **`RichText` fields render `**bold**`, and every segment passes through
  `localizeMoneyText`.** Each area has its own `RichText`. Learning Support's also turns
  `[[504|Section 504 Plan]]` into a glossary `<abbr>` (`GLOSSARY` = 504, iep, idea).
  RichText fields:
  - **After School:** every `flags[].text`, `coverage.summer.text`, `coverage.basisNote`,
    `coverage` facts' `text`, `cost.fees[].label`, `cost.aside.text`,
    `dayInside.catalogIntro`, `dayInside.wordsText`, `verdict.checklist[]`,
    `verdict.strengths[]`, `verdict.watchouts[]`.
  - **Summer:** every `flags[].text`, `catalog.intro`, `costPlanner.fees[].label`,
    `costPlanner.aside.text`.
  - **Global Exposure:** `lead.strong`/`.muted`, stat `note`, row `text`, `cells[].text`,
    list items, `verdict.standsOut.summary` and points, `verdict.ask[].question`.
  - **Learning Support:** `lead.*`, stat `note`, cell `text`, `note`, verdict
    `head`/`body`, row `detail`, item `detail`, testing `text`/`muted`, questions.
  - **High School Placement:** `flags[].text`, row `text`, `placement.steps[].text`, list
    items.
- **Raw or `localizeMoneyText`-only fields render no markdown.**
  - `*.headline` and `*.subhead` go through each area's `Lead` and are also the collapsed
    card teaser (`SchoolDetail.tsx` ~lines 1453–1648, `localizeMoneyText(headline)`).
  - After School's and Summer's `catalog.camps[].desc` / `classes[].desc` are rendered
    with `highlight(localizeMoneyText(c.desc), q)`, and they are **searched**:
    `c.desc.toLowerCase().includes(q)`.
  - **HSP's `Lead` renders `headline` and `subhead` with no `localizeMoneyText` at all.**
    So never move a `$` amount into an HSP headline or subhead. None holds one today.
- **So:**
  - **Never add or remove `**`**, in any unit. Run every batch with `--md-paths '^$'`
    (guard (l) then fails any `**` count change). Do not pass `--no-md`, because 33
    worklist units already hold `**` (After School 22, Summer 11, the rest none).
  - **Keep each bold span's words.** The spans are short labels and claims (≤11 words).
    Move a span only together with its sentence, and keep its text byte-identical unless a
    Unit note says otherwise.
  - **Never add or remove a `[[…|…]]` glossary marker.** HG Learning Support holds 2, and
    none is on the worklist.
  - **Drop the one stray single-asterisk italic:** After School Charlotte Christian
    `dayInside.flags[0].text` `*Focus*` → `Focus`. `RichText` does not parse `*…*`, so it
    ships literal asterisks today (plainarts precedent).
  - A shortened headline is the teaser. Keep it one or two sentences.
  - A rewritten `desc` changes which search terms match. Keep every activity noun.

### What the rewritten text must survive (checks and readers of this prose)

- **The hook** runs after every Edit/Write on the five dirs and on `en.json`. It blocks
  only at grade 12, and it enforces American spelling. One worklist unit holds a British
  form the spelling map lacks: Global Exposure Cannon `verdict.standsOut.summary`
  "centred". Make it "centered" inside that rewrite, and list "centred" as a
  `plain_language.json` candidate.
- **`check:moneytext`** (in the build) runs the real `format.ts` over every money string.
  - It asserts that rendering never eats the punctuation after a figure or the trailing
    zeros of cents.
  - Keep cents exactly (`$70.00`, `$50.00`, `$100.00`). Keep the punctuation after a
    figure.
  - A `$` amount stays in a `localizeMoneyText`/`RichText` field; never move one into a
    raw field.
- **`check:dates`** reads the extracted strings, in Phase 2 only. But the date **forms**
  in the English must survive Phase 1 for Phase 2 to pass. Guard (g) covers them:
  - day-first `1 May` (Trinity Summer);
  - `June 8 to July 31`, `January 15, 2026`;
  - `12:00pm`, `3:15–4:00 p.m.`, `8:00–9:00 a.m.`, `the noon–1 p.m. bridge care`;
  - `2026-2027` (hyphen) vs `2026–27` (en dash), and season + year (`summer 2027`).
- **`check:travelrows`** (in the build) re-derives the six Global Exposure Compare rows
  from each school's trip ledger: `trips[].dest`, years and divisions, all non-prose. No
  worklist unit is a ledger field. Guard (f) protects the ledger.
- **`check:matrices`** (in the build) reads Summer `catalog.categoryFilters[].label` and
  camp `name`s. None is on the worklist; guards (f)/(k) protect them.
- **`check:spans`** and **`check:tuition`** read `metricValues.ts` only, which is out of
  scope.
- **`check:chrome`** checks that every en.json key exists in all ten catalogs. It does not
  compare values, so Phase 1 leaves the nine other catalogs with the old meaning until
  Phase 2. That is expected.
- **The Compare page sorts research-coverage rows by `metric.label` from
  `src/lib/metrics.ts`** (`metricsForTopic` in `src/lib/manifest.ts`: `localeCompare` on
  `a.metric.label`), not by the en.json value. **So `src/lib/metrics.ts` labels are not
  edited.** Changing "Institutional Leverage" there would move the row (C sorts before
  I), which is a reorder under the UX gate. The en.json value is what renders; the
  `metrics.ts` label is only the fallback.
- **`check:schema`** reads card keys and `metrics.ts` labels, not prose. No drift is
  expected.
- **`check:live`** fails during Phase 1, by design (below).

### Content that must survive every rewrite

This is the list Step 3 applies and the reviewer checks against. Items 1–9 apply to every
area; 10–14 are area-specific.

1. **Names exactly as printed.** That covers:
   - **programs:** Extended Day, Extended Care, TED, Beyond the Bell, After School
     Program, Activity Day, Summer Adventures at Prep, Camp Spartan / Camp Spartan Jr, TES
     Academy, CAMMP, Black Rocket, Super Care, Lunch Care, Winterim, Winterm, Global
     Studies Certificate / Diploma, Global Educator Certificate, Helfrich Catalyst
     Fellowship, AFAR, the Educational Resource Program (ERP), the LEC, ESS, Guided
     Academic Support, Academic Skills;
   - **portals and platforms:** UltraCamp, LionsWeb, FACTS Family Portal, CampBrain,
     Brushfire;
   - **partners and providers:** Envoys, Sparty’s Dining Service, Children’s Theater of
     Charlotte, Legends, Studio Elite, 2-4-1, Nike, Eddie Hull Baseball, World Affairs
     Council, Round Square, Institute for Global Learning, SYA, the six semester schools;
   - **places:** Westminster Presbyterian Church on Colville Road, Freedom Park (Dilworth
     LL Ballfields), the Dining Hall, the Adam Spach Rock House, every city and country;
   - **destination high schools:** Deerfield, Lawrenceville, Mercersburg, Woodberry
     Forest, St. Paul’s, The Taft School.

   Case, punctuation and list order stay as they are.
2. **People and emails.** No worklist unit names a person or holds an email. If a rewrite
   touches a sentence that names staff, the person and their published email stay
   (Learning Support's standing rule: every named person carries their published email).
   Guard (c) fails on any email change. **No student is named anywhere**; only athletes
   may be (memory `student-names-athletes-only`), and none appears in these areas.
3. **Figures in the form written.** That covers:
   - money: `$98`, `$744/mo`, `$6,696`, `$20`, `$248/month`, `$95`/`$55`/`$90`/`$120`,
     `$60/week`, `$105/month`, `$90,000`, `$30,000`, `$25`, `$50`, `$70.00/week`,
     `$170–$325/week`, `$225`, `$785`;
   - percents: `97%`, `12%`, `about 30%`, `10%`;
   - ratios and counts: `15:1`, `22`, `25`, `75`, `20`, `13`, `19+`-style `+`.

   Digits stay digits and words stay words ("Nineteen", "seven", "six to eight", "three",
   "four", "twice", "seven sister schools on four continents"). The `~`, "about",
   "roughly", "more than", "at least", "up to", "near-identical" and "or less" qualifiers
   stay attached. A count keeps its noun.
4. **Dates, times and terms in the form written** (guard (g), and see `check:dates`
   above). A season keeps its year, and a year keeps its event.
5. **Published vs not published vs not found.**
   - "is not published", "publishes no …", "never stated" and "no … is given" are one
     class.
   - "returned zero results when checked", "not recoverable", "nothing … appears in any
     current source" are another: our search came up empty.
   - "Middle School has no separate program description" and "there is no summer
     wrap-around care" are a third: it does not exist.

   Keep each in its class. Learning Support's chip convention is the parent-facing form of
   the first class: an unpublished service is a dashed **NOT STATED** chip (`code: 'NS'`,
   non-prose, guard (f)). No rewrite turns a row's detail into a claim that the service is
   absent, or blanks it.
6. **Required vs optional vs included vs extra.**
   - "REQUIRED", "must", "requires", "mandatory".
   - "may", "encouraged", "open to all".
   - "included in full-day … tuition", "free", "no charge" vs "a paid add-on",
     "for an additional fee", "fee-bearing", "billed as an incidental charge".
   - "non-refundable", "refunds are generally not issued", "nothing is refundable",
     "no deposit", "paid in full at registration".

   Caps emphasis stays on the same word (`REQUIRED`, `PER-SEMESTER`, `WEEKLY`).
   A requirement word is never softened, and an expectation never becomes a requirement.
7. **School-published vs third-party vs estimated vs derived.**
   - "the school’s own published figure", "verbatim";
   - "third-party listings name", "from the third-party current range";
   - "estimates", "patterned on the school’s own 2018 catalog";
   - "derived by stacking", "summed by the researcher";
   - "this project’s standard planning assumption" (bookkeeping, see Decisions);
   - "per the school", "the school calls", "what the school calls the first".

   A third-party figure never becomes the school's, an estimate never becomes a published
   figure, and a school claim never becomes a verified fact.
8. **Hedges and samples.** "appears to", "consistent with", "likely", "the model appears
   to be", "examples", "and more", "including", "not the full roster", "such as". An
   inference stays an inference, and a sample stays a sample.
9. **Quoted spans stay byte-identical.** They are marked with straight or curly quotes;
   there are many in After School Davidson Day and Christian `dayInside.wordsText`, Trinity
   `catalogIntro`, LS CCD and DD `eligibility.eligible`, and HSP Prep `steps[3]`. Rewrite
   around them. A quote that ends a sentence goes last in the unit, or is followed by a
   short sentence (plainarts ruling).
10. **After School and Summer: the cost model.**
    - per-semester vs monthly vs weekly vs per-day vs per-session vs per-camp;
    - "full-time … 5 days a week";
    - "billed twice a year";
    - "linear … proportionally less";
    - "do not vary by how many afternoons";
    - drop-in vs enrollment;
    - the stacked-session arithmetic (Covenant: three sessions → `$744` a month against a
      `$248` single-session headline);
    - income bands (Trinity);
    - early-bird deadlines;
    - registration cutoffs;
    - cancellation fees by month.

    Every unit, condition and comparison stays.
11. **Learning Support: the eligibility line.**
    - Accommodations need documentation ("students with documented disabilities", "a
      full psychoeducational evaluation"); learning-support sessions need none.
    - Review cycles: every three years in Lower and Middle School, four in Upper School;
      vs the policy's "three years through grade 5 and four from grade 6".
    - Scope: "Emotional and behavioral intervention is outside its scope".
    - Who is served: "ages two through grade 12", "all grade levels", "any student who
      arrives with a 504, an IEP or a prior school’s accommodations plan".

    Accommodation vs modification, and in-house vs referral, never blur. **This school
    only:** no rewrite adds a comparison with another school. Testing & Evaluation is
    about how a learning need is identified, never admission.
12. **Global Exposure: trips.**
    - Each trip keeps its destination, division, grade floor ("as young as 6th grade",
      "some from 9th grade and most from 10th") and season + year.
    - **No trip cost or exact travel date is ever added** (memory
      `no-trip-costs-or-travel-dates-on-page`).
    - School-run vs faculty-led vs a travel partner (Envoys), and "is gone from later
      copies of the page" (stale), stay as they are.
    - Selection rules stay: interview, faculty or staff reference, project proposal,
      lottery if oversubscribed, priority to students of the matching language, waitlist.
    - "first … in the nation" / "the first high school students" stay "per the school" or
      "what the school calls" where they are.
13. **High School Placement: accepted ≠ enrolled.**
    - "97% … were accepted into one or both of their top two high school choices" is an
      acceptance rate, not an enrollment rate.
    - "12% of all graduates since 2004 went to boarding schools" is an enrollment claim.
    - "one or both", "top two", "every class since 2023", "since 2004" stay exactly.
14. **Cross-school claims are checked before they are kept** (plainaid Batch 3 precedent).
    - Global Exposure: "something most Charlotte schools do not" (Cannon), "Among
      Charlotte private schools" (CCD), "unlike any other school's here" (DD).
    - After School: "The deepest published enrichment catalog of the six" (Cannon). See
      Open questions.

### Near-repeats (text shared across units)

Measured with a 7-word shingle scan over every prose unit in the five dirs (scratch script,
not committed). The rules are plainclubs':

- **Both sites on the worklist:** rewrite the shared part the same way at every site, and
  change only what differs.
- **One site off the worklist:** where the shared part is a whole clause, keep it
  **byte-identical** in the worklist unit and rewrite only the rest. Guard (j) fails if
  two units that held the same text no longer match.

**Both on the worklist** (rewrite identically):

| Shared part | Sites | Batch |
|---|---|---|
| "publishes no day, no grade range and no fee" (bold in Christian) | AS charlotte-christian `dayInside.flags[0].text`, charlotte-latin `dayInside.catalogIntro` | 1 |
| "it is billed as an incidental charge" + "about 30% of students receive tuition aid / assistance" + "summer programs … do have their own aid application" | AS charlotte-country-day `cost.flags[1].text`, `verdict.watchouts[2]` (keep each unit's own "aid" / "assistance" word) | 1 |
| "so no Cost Planner card is built" → the Bookkeeping fixes wording "so this page has no cost planner for it" | AS hickory-grove-christian `coverage.flags[0].text`; Summer hickory-grove-christian `catalog.flags[1].text` | 1 → 3 |
| "saved copy / copies of the page" for the old "capture" / "archive" / "recovered" wording | AS davidson-day (7 units), cannon `dayInside.catalogIntro`; Summer hickory-grove-christian `catalog.intro`, `catalog.flags[0]` | 1 → 3 |
| "reviewed every three years in Lower and Middle School and every four in Upper School" + "Formal accommodations need a full psychoeducational evaluation" | LS charlotte-country-day `services.groups[0].rows[10].detail`, `testing.entries[3].muted`, `testing.headline` | 3 |
| `cohort` → the same plain word ("group(s)") | AS charlotte-christian `dayInside.subhead`, `verdict.strengths[3]`, `verdict.checklist[8]`; GE providence-day `community.cells[4].text` | 1 → 2 |
| "executive function" → the same keep-and-explain form (Decisions) | LS charlotte-catholic and davidson-day `services.verdicts.attn.head`; en.json `learning.need.attn` | 3 |

**One site off the worklist** (keep the shared clause byte-identical in the worklist unit):

| Shared text | Worklist site | Off-worklist site(s) |
|---|---|---|
| "The rate card exists only on an orphaned backup URL…" | AS cannon `cost.flags[1].text` | cannon `verdict.watchouts[1]` |
| "June 8 to July 31 for campers…" | AS charlotte-prep `coverage.summer.text` | charlotte-prep summer `catalog.headline` |
| "Prices on the bars are the full…" (template) | AS charlotte-latin `coverage.basisNote` | providence-day, carmel-christian, charlotte-country-day `coverage.basisNote` |
| "open The Cost Planner below to price…" (template) | AS charlotte-latin `coverage.basisNote` | charlotte-christian, covenant-day, providence-day, carmel-christian `coverage.basisNote` |
| "the model appears to be pre-registered" | AS charlotte-latin `cost.flags[1].text` | charlotte-latin `verdict.watchouts[4]` |
| "as significantly higher than comparable Davidson Day…" (a quote) | AS davidson-day `dayInside.wordsText` | davidson-day `verdict.watchouts[3]` |
| "No hour-by-hour daily schedule is published" | AS charlotte-country-day `dayInside.flags[3].text` | charlotte-latin `dayInside.flags[1].text` |
| "daily rhythm and no staff-to-child" | AS cannon `dayInside.flags[2].text` | cannon `verdict.watchouts[6]` |
| "The enrichment catalog is invisible to prospective families" | AS charlotte-country-day `dayInside.flags[0].text` | charlotte-country-day `verdict.watchouts[6]` |
| "Extended Day appears to sit outside financial aid" (bold) | AS charlotte-country-day `verdict.watchouts[2]` | charlotte-country-day `verdict.subhead` |
| "explicitly independent study with no one-on-one…" | AS providence-day `dayInside.wordsText` | providence-day `verdict.watchouts[5]` |
| "Snack is not provided in either program"; "with ID checks early in the year" | AS charlotte-christian `dayInside.wordsText` | charlotte-christian `verdict.watchouts[4]`, `verdict.strengths[5]` |
| "Before Care 8:00–9:00 a.m." / "After Care 4:00–5:00 p.m." | AS charlotte-prep `coverage.summer.text` | charlotte-prep `costPlanner.addons[0..1].label` |
| "with homestays both ways in Argentina, France, Italy and South Africa" | GE charlotte-latin `lead.strong` | charlotte-latin `exchanges.headline` |
| "attend classes with their host siblings" | GE charlotte-latin `exchanges.intro.strong` | charlotte-latin `exchanges.homestays[0].text` |
| "with the North Carolina State Historic Preservation Office" | GE davidson-day `trips.alsoOnRecord[2].text` | davidson-day `milestones.events[6].text`, `verdict.standsOut.points[3]` |
| "trips over spring break and in the summer" | GE charlotte-country-day `lead.strong` | charlotte-country-day `start.divisions[2].items[0]`, `trips.intro.muted`; providence-day `trips.intro.muted` |
| "priority to students of the matching language" | GE charlotte-country-day `signup.intro.muted` | charlotte-country-day `trips.intro.muted` |
| "academic coaching in the Upper School" | LS charlotte-country-day `lead.strong` | charlotte-country-day `services.verdicts.attn.head` |
| "families submit our request form" / "the Director of Learning Services" (quotes) | LS davidson-day `eligibility.eligible` | davidson-day `testing.entries[0].text`, `.muted`, `testing.headline` |
| "pairing a morning and an afternoon camp" | Summer charlotte-country-day `costPlanner.flags[1].text` | charlotte-christian `catalog.subhead` |
| "the noon–1 p.m. bridge care" | Summer charlotte-christian `catalog.flags[0].text` | charlotte-christian `catalog.subhead` |
| "Studio Elite, 2-4-1 and Nike" | Summer gaston-day `catalog.flags[1].text` | gaston-day `costPlanner.fees[4].label` |

### Bookkeeping fixes (the census, measured 2026-11-10 at `9d19c942`)

**The sweep.** It ran over every rendered prose unit (`proseUnits` + `classifyField`, with
`verify` skipped) in the five dirs, using this pattern. `/implement` reruns it at Step 2a:

```
BOOKKEEPING_RE = /\bresearcher\b|\bthis project\b|\bour (?:research|search|check)\b|\bwhen checked\b|\bwe (?:found|could|checked|searched)\b|\bcapture[ds]?\b|\brecoverable\b|\brecovered\b|\bsnapshots?\b|\bWayback\b|\bcard is (?:built|omitted)\b|\bis omitted rather than\b|\bshould be confirmed\b|\bused here as\b|\bshown here\b|\bfor comparability\b|\bplanning assumption\b|\bverbatim\b|\bnot independently\b|\bcould not (?:be )?(?:confirm|verify|find|locate)\w*|\bunconfirmed\b|\bto verify\b|\bthe research\b|\bprovenance\b|\bscraped\b|\bshould not be assumed\b|\brather than guessed\b|\bre-?verified\b|\bcurrently shows nothing\b|\bthis research\b|\bun-researched\b/i
```

The last four alternatives were added after the sweep. `should not be assumed` and `rather than guessed` catch the two units it missed. `re-?verified` and `currently shows nothing` catch two the Batch 1 reviewer found. `this research` and `un-researched` catch Gaston's catalog intro, which renders only since the component fix.
Global Exposure, Learning Support and High School Placement have **no hits**.

**W** = on the worklist (rewritten in its batch's wording pass). **+** = off the worklist
(added to the batch through `worklist-bookkeeping.json`, Step 2a). **Move** = Step 2a's own
commit.

| Batch | Unit | W/+ | Today (the bookkeeping part) | Treatment |
|---|---|:-:|---|---|
| 1 | AS cannon `dayInside.catalogIntro` | + | "— recovered from the school’s own session brochure" | Rewrite: "— taken from the school’s own session brochure". Keep **9 March to 22 May 2026** (bold, day-first) |
| 1 | AS charlotte-country-day `dayInside.flags[0].text` | W | "the class list lives behind the UltraCamp portal, which returned **zero results** when checked" | **Move.** Prose: "the class list sits behind the UltraCamp portal, where families sign in, so it is not public." Append to `dayInside.flags`: `{ kind: 'verify', text: 'The UltraCamp portal returned zero results when this site checked it (plainsmall, 2026-11-10 census). Re-check before relying on "not public".' }` |
| 1 | AS charlotte-latin `dayInside.catalogIntro` | W | "so those columns are shown as not published rather than guessed" | Rewrite: "so those columns say not published." (UNPUBLISHED kept) |
| 1 | AS covenant-day `cost.fees[4].label` | W | "the per-session ladder **summed by the researcher**" | Rewrite, DERIVED kept: "the school’s per-session prices, **added up on this page**". The bold changes words (a named exception) |
| 1 | AS covenant-day `cost.flags[0].text` | W | "The single-session column is verbatim." | Rewrite: "The single-session prices are the school’s own published figures." |
| 1 | AS davidson-day `coverage.subhead` | + | "The program hours are recovered from a 2020 archive of a page that no longer exists" | Rewrite: "The program hours come from a saved 2020 copy of a page that no longer exists" (STALE kept) |
| 1 | AS davidson-day `coverage.facts[1].text` | + | "— from the 2020 archive, unconfirmed for 2026-27" | Rewrite: "— from a saved 2020 copy of the school’s page; the school has not published it for 2026-27". "unconfirmed" (our check) becomes the school-publication fact; keep `2026-27` with its hyphen and the **7:1** ratio |
| 1 | AS davidson-day `coverage.flags[0].text` | + | "comes from a capture dated **18 May 2020 — six years old**" | Rewrite: "comes from a saved copy of the page dated **18 May 2020 — six years old**". The bold span is byte-identical |
| 1 | AS davidson-day `dayInside.headline` (teaser) | + | "in words captured from a page that no longer exists" | Rewrite: "in words from a page that no longer exists" |
| 1 | AS davidson-day `dayInside.wordsText` | W | "All of this is from the 2020 capture." | Rewrite: "All of this comes from the school’s 2020 page." |
| 1 | AS davidson-day `dayInside.flags[0].text` | + | "comes from an archived capture dated **May 2020** … so none of it is confirmed for 2026-27 — including the 15:1 ratio" | Rewrite: "comes from a saved copy of the page dated **May 2020** … so the school has not published any of it for 2026-27, including the 15:1 ratio" |
| 1 | AS davidson-day `verdict.watchouts[6]` | + | "**No enrichment catalog survives at all** — not a single class name, day or fee is recoverable from any source." | Rewrite after the bold span (byte-identical): "— no source, current or archived, names a single class, day or fee." |
| 1 | AS gaston-day `cost.fees[8].label` | W | "The 36-week year is this project’s standard planning assumption for comparability across schools, not a figure Gaston Day publishes." | Rewrite: "This page assumes a 36-week school year so schools can be compared. Gaston Day does not publish one." (ESTIMATE + UNPUBLISHED kept) |
| 1 | AS hickory-grove-christian `coverage.flags[0].text` | W | "So no Cost Planner card is built, and the aftercare-cost Compare row is N/A for HGCS." | Rewrite: "So this page has no cost planner for it, and the Compare row for aftercare cost shows N/A." **Shared with Summer HG `[1]`**: the cost-planner clause is worded identically there |
| 1 | AS providence-day `cost.flags[0].text` | W | "and should be confirmed" | Rewrite: "Ask the school how many months it bills." (ESTIMATE "assume" kept) |
| 3 | Summer charlotte-catholic `catalog.flags[0].text` | W | "which is why the Cost Planner card is omitted rather than modeled" | Rewrite: "so this page has no cost planner for these camps." |
| 3 | Summer charlotte-country-day `costPlanner.flags[1].text` | W | "nothing like it appears in any current source, so it should not be assumed to still exist" | Rewrite: "No current school page offers it, so do not count on it." (NOTFOUND → UNPUBLISHED is allowed here: the point a parent needs is that the school does not offer it now) |
| 3 | Summer charlotte-prep `costPlanner.fees[2].label` | W | "The registration form showed several prices $25 below the brochure, consistent with that saving, but two of its cells were higher than the brochure, so the brochure is used here as the regular price list." | **Move.** Prose keeps the bold quote and becomes "The prices below are the brochure’s regular prices." Append to `costPlanner.flags` (empty today, so it becomes `flags[0]`): `{ kind: 'verify', text: '<the removed sentence, verbatim>' }`. Guard (m) on the prose unit loses `$25`: expected, because the unit is in the move commit |
| 3 | Summer hickory-grove-christian `catalog.intro` | + | "**Summer 2023 catalog, recovered from the Internet Archive**" | Rewrite, bold kept around new words: "**Summer 2023 catalog, from saved copies of the school’s old pages**". Keep "a representative slate" → "a representative list" (sample kept) |
| 3 | Summer hickory-grove-christian `catalog.flags[0].text` | W | "recovered from Internet Archive snapshots … the exact 2026 camp names were not recoverable" | Rewrite: "from saved copies of the school’s old pages on the Internet Archive … the school does not publish the 2026 camp names outside Brushfire" |
| 3 | Summer hickory-grove-christian `catalog.flags[1].text` | W | "so no Cost Planner card is built and the summer-cost figures are N/A" | Rewrite with the Batch 1 HG wording: "so this page has no cost planner for it, and the summer-cost figures show N/A" |

**Marker classes.** "capture", "snapshots", "recovered" and "archive" carry STALE or
THIRDPARTY today. So each rewrite keeps a word of the same class: "saved copy" / "saved
copies" / "no longer" / "old pages" / "archived". Step 1e adds
`\bsaved cop(?:y|ies)\b|\bold pages?\b` to STALE for this reason. The two **moves** change
marker counts on purpose. They land in their own commit with a hand review (Step 2a), so
the wording-pass guards never see them.

### Phase 1 builds fail at `check:live`, by design

Every rewritten unit gets a new FNV-1a stamp. The nine shipped overlays for the five topics
still hold the old stamps, so `npm run build` stops at `check:live`. The steps below run
`tsc -b && vite build` and the build's later checks by hand. Phase 2 makes the full build
green. The en.json edits do not touch `check:live`.

### Phase 2 machinery (existing, unchanged)

- **Prose overlays.** The work files are `src/data/overlays/work/<topic>.<lang>.json`, for
  topics `after-school`, `international-travel`, `summer-programs`, `learning-support` and
  `high-school-placement`. Then:
  - `node scripts/i18n_splice_work.mjs --lang <code> --topic <topic>` reports *kept /
    added / dropped*;
  - `node scripts/i18n_build_overlay.mjs --topic <topic> --lang <code>`;
  - `python3 scripts/check_figures.py --topic <topic> --lang <code>`.
- **Locales.** `PROSE_TRANSLATED` in `src/lib/i18n.ts` = es, bn, ht, te, fr, fa, it, hi,
  ar. For the mechanism, see `.claude/docs/prose-translation-architecture.md`. The worked
  precedent is the plainclubs Phase 2 implementation note.
- **Chrome.** `TRANSLATED` in `src/lib/i18n.ts` = en, es, bn, ht, te, fr, fa, it, hi, ar.
  The five keys are hand-edited in the nine non-English `src/locales/<lang>.json` files.
  Today's reviewed values (es) are "Influencia institucional", "Ingreso a la División I y
  universidades selectivas", "ADMISIÓN ≠ MATRÍCULA", "Atención y funciones ejecutivas"
  and "Socioemocional". They are revised, not replaced from scratch.

## Decisions

- **Part 1 lands first, in Batch 1 Step 1, as its own commit** on `feat/plainsmall`.
  - **Its scope is the checker, the reviewer script and one shared module.** Five
    components change their flag-filter call, and render exactly what they did.
  - **No UX change.** The browser check proves the clubs cards and every flags block
    render what they did.
  - Part 1 is single-phase (no user-facing text).
- **The skip list lives in `src/lib/flagVisibility.ts`**, imported by `toVerify.ts`, the
  checker and `plain_review.mjs` (design above). The drift guard is
  `scripts/check_flag_visibility.mjs` (`npm run check:flags`, in the build).
- **The prose extractor is not changed.** Hidden flags are already translated in every
  work file; they cost nothing to keep, and they read correctly if the filter is ever
  relaxed. `check:live`/`check:runtime` keep covering them.
- **`plain_review.mjs` gains `--small-markers`** (Step 1b) for this plan's marker classes.
  It is opt-in, generic and calibrated on the five approved areas, as plainclubs did.
- **Three batches, each with a review stop** (see "Batch plan"). Sizing uses before-words:
  earlier reviews ran 1,200–1,500 before-words in 20 minutes. The batches are 1,523, 954
  and ~1,173. Batch 1 is the calibration batch and also lands Part 1 and the tooling.
- **One branch, one PR, opened only after Phase 2.** Each batch is its own commit on
  `feat/plainsmall`.
- **plainclubs' Decisions carry over unless this section overrides them.** That covers:
  - keep-and-explain over `plain-ok`;
  - quoted spans untouchable;
  - splitting as the main tool;
  - one string per path, with no structural change;
  - no fixing other standards in passing. The named exceptions are the `*Focus*` italic,
    "centred" (plus its spelling-map entry), the 21 research-bookkeeping units and the
    Cannon fact fix, all at the user's request;
  - words outside the jargon list fixed only inside worklist units;
  - American spelling;
  - a fresh `general-purpose` reviewer per batch;
  - a long list of 4+ parallel names after a short lead ending in a colon may become a
    ` · ` run inside the same string;
  - the gloss rules: a general term may be glossed from general knowledge; a school's or
    program's own acronym (ERP, LEC, ESS, TED, AFAR, CAMMP, TES, SYA) only from the same
    file, never invented; a gloss adds no marker word.
- **Research bookkeeping in parent-facing prose is fixed in this plan** (user,
  2026-11-10: "add fixing those issues into the plan too"). The rule is CLAUDE.md
  "Research bookkeeping is dev-only", judged per item. Parent-facing text says what the
  school publishes or does not. A stale, estimated, derived or third-party figure stays
  visible, with its marker. Text about our own research process (what a check returned,
  how we reconciled two sources) leaves the prose.
  - **The census** is 19 rendered units in the five areas, found by the
    `BOOKKEEPING_RE` sweep below, plus 2 the sweep's pattern misses (Summer CCD
    `costPlanner.flags[1]`, AS Latin `dayInside.catalogIntro`). That makes **21 units:
    13 on the worklist and 8 off it.**
    `/implement` reruns the sweep at each batch's Step 2a. If the sweep finds a unit not
    listed in "Bookkeeping fixes", it is judged by the same rule and added.
  - **Three treatments**, each listed per unit in "Bookkeeping fixes":
    - **Rewrite in place** (19 units): the parent-facing point stays, and the research
      verb goes. "recovered from a 2020 archive" → "comes from a saved 2020 copy of a page
      that no longer exists"; "summed by the researcher" → "added up from the school's
      per-session prices". The marker class stays (STALE, DERIVED, ESTIMATE, NOTFOUND,
      UNPUBLISHED).
    - **Move to a dev-only `verify` flag** (2 units): the research step is real evidence
      but no use to a parent. The prose keeps the parent point. The research step goes
      into a new `{ kind: 'verify', text }` object **appended to the end** of that card's
      existing `flags` array. Appending means no existing `flags[N]` path or overlay `at`
      shifts. Both cards' flag types (`AsFlag`, `SuFlag`) already allow `verify`. The flag
      renders on the dev server only.
    - **Keep** (none). Every hit is either parent-useful and rewritten, or moved.
  - **Site mechanics are not research.** "no Cost Planner card is built" and "the
    aftercare-cost Compare row is N/A" tell a parent why a card or cell is missing. They
    are rewritten in plain words ("so this page has no cost planner for it, and the
    Compare row shows N/A"), not moved.
- **Fact fix: After School Cannon `verdict.strengths[4]`** (user, same instruction).
  - **The facts.** "The deepest published enrichment catalog of the six" is stale. There
    are 12 After School schools now, and Charlotte Latin lists more classes (27) than
    Cannon (22).
  - **What is true** (measured from `dayInside.classes` in all 12 files, excluding `—`
    placeholders): only Cannon (22) and Providence Day (15) publish a day, a grade range
    and a fee for **every** class. Latin (27), Prep (9) and Trinity (4) publish grade
    ranges only. The other seven publish no catalog.
  - **The fix:** "**The largest fully priced enrichment catalog on this site** — 22
    distinct classes in a single session, from robotics, ballet and chess to pottery,
    golf and photography. Each has a named provider and a real fee."
  - The claim moves from "deepest … of the six" to "largest fully priced … on this site",
    which is true. The bold span changes (a named exception). "of the six" goes, so guard
    (n) would fail. That is why the fix lands in Step 2a's own commit, before the wording
    pass.
  - Re-check the counts on the day. If a school has since gained a fully priced catalog
    larger than 22, the implementer stops and reports instead of applying.
- **Spelling: "centred" is added to the spelling map** (`scripts/plain_language.json`
  `spelling.map`: `"centred": "centered"`, `"centring": "centering"`). The gate
  (`check:spelling`) missed it because the map has only `centre`/`centres`. Today the
  corpus has exactly one prose occurrence: GE Cannon `verdict.standsOut.summary`, fixed in
  the Batch 2 rewrite. "Centre College" stays (it is in `spelling.keep`). This is the only
  edit to `plain_language.json`.
- **Jargon in data (6 units):**
  - **`cohort` → "group(s)"**, identically at the four sites. In AS charlotte-christian
    `dayInside.subhead`, "cohorts" also sits inside the school's quote ("two distinct
    cohorts"), which stays byte-identical. Only "cohort-differentiated" outside the quote
    changes, e.g. "split into two age groups". `verdict.strengths[3]` "**The MS program is
    cohort-differentiated**" is a bold span, and a named exception to the byte-identical
    rule. The bold stays, with its new words, e.g. "**The MS program splits into two age
    groups**". GE PD `community.cells[4]`: "the first group completed it in 2025–26".
  - **`executive function` → keep and explain** at both LS data sites: "executive
    function (planning, organizing and focus skills)", or the wrapping form "planning,
    organizing and focus skills (executive function)". The reason is the same as for the
    tab below. Catholic's "Academic Skills course in executive function" keeps the course
    name.
- **The five chrome labels** (recommendations; shown to the user at the Batch 3 review):
  - **`metrics.institutional-leverage` "Institutional Leverage" → "College Connections".**
    The cards behind the row cover the ties a school can use with colleges: memberships
    (NACAC, NACCAP), dual-enrollment partners, a long-serving director's standing.
    "Leverage" is on the jargon list.
  - **`metrics.matriculation` "D1 / Top-College Matriculation" → "D1 / Top-College
    Enrollment".** This is the jargon map's own replacement, and it keeps the meaning.
    "Commitments" would describe 25 of the 28 docs behind the row better, but it changes
    the meaning, so it is an Open question, not the default. "D1" stays: it is the term
    the Sports area and every recruiting source use.
  - **`highSchoolPlacement.acceptanceNotMatriculation` "ACCEPTANCE ≠ MATRICULATION" →
    "ACCEPTED ≠ ENROLLED".** Same meaning, the same caps chip style, and it matches the
    `…Text` sentence after it ("per-school enrollment counts"). The key name is not
    changed; keys are never renamed.
  - **`learning.need.attn` "Attention & executive function" → keep and explain: "Attention
    & planning (executive function)".**
    - Keep the term because it is the one a parent of a child with these needs meets on
      the evaluation report, the 504 or IEP, and the schools' own Learning Support pages.
      A parent filtering for their child's documented need looks for that word.
    - Lead with plain words because the tab is short. The checker's `explained()` accepts
      a parenthesis wrapping the term ("Hands-on music classes (Experiential music)"
      precedent), so no `allow` entry is needed.
    - Check the tab row at 320px in Step 7.
  - **`learning.need.social` "Social-emotional" → replace: "Social & emotional".** The two
    words parents already know carry the whole meaning, with no gloss needed and no longer
    tab. The checker's pattern `social[- ]emotional` does not match it.
  - **`src/lib/metrics.ts` `label`s are not changed** (the Compare sort, above).
- **Fact problems are fixed in this plan, in their own commit** (Step 2a). This follows
  the user's instruction, and it replaces the plainclubs/artsfacts precedent of flagging
  them for later.
  - The known one is Cannon's catalog claim (above).
  - A **new** fact problem found while drafting or reviewing is fixed the same way, in an
    extra Step 2a-style commit before that batch's guards run. It needs evidence from the
    data files or the school's own page, recorded in that batch's fixes review file. If
    the fix needs fetched data, persist it per the data-provenance standard first.
  - When the right fix is unclear, it is reported at the batch review rather than
    guessed.

## Batch plan (Phase 1)

| Batch | Scope | Units | Before-words | Why this grouping |
|---|---|--:|--:|---|
| **1 — calibration** | **Part 1** (checker, drift guard, tests, baselines) + **review tooling** (`--small-markers`) + **fixes commit** (the Cannon fact fix, the CCD move) + **After School**, all 12 schools, including 7 off-worklist bookkeeping units | **36 + 7** | ~1,700 | After School is the largest area and has the densest cost model: per-semester / weekly / monthly / drop-in, stacked sessions, income bands, the bold spans, `cohort` ×3, the `*Focus*` italic and the research-bookkeeping phrases. It sets the cost-model and not-published wording the Summer units reuse in Batch 3. Calibrating the new marker classes on the hardest area first is the point. |
| **2** | **Global Exposure**, all 6 schools | **27** | 954 | One area with the highest grades (24.4 max): long trip and destination lists (`·` runs), the sister-school, homestay and selection rules, three cross-school verdict claims to check, "centred", `cohort`, and the no-trip-costs rule. Smaller than the others because its units are the densest. |
| **3** | **fixes commit** (the Prep move) + **Summer** (12 schools, 18 units + 1 off-worklist bookkeeping unit) + **Learning Support** (5, 10) + **High School Placement** (2, 3) + the **5 chrome labels** | **36 + 1** | ~1,200 | Summer reuses Batch 1's cost-model wording, including the shared "no Cost Planner card is built" sentence. LS and the two LS tabs (`learning.need.*`) are reviewed together, so the "executive function" form is set once. HSP and its chip label (`acceptanceNotMatriculation`) go together. The two `metrics.*` labels ride along: two short strings with no area of their own. |

The 97 data units on today's worklist break down as 94 for the wording pass plus 3 fixed
in Step 2a commits (Cannon, CCD, Prep). With 8 off-worklist bookkeeping units and 5 chrome
labels, **110 units change**, plus **2 new `verify` flags**. Batch 1 is the largest
(~1,700 before-words, over the usual 1,500) because the seven Davidson Day bookkeeping
units are short and repetitive: one "saved copy" wording applied seven times. Phase 2
runs **once**, after Batch 3 is approved.

**Batch arguments** (Steps 2 and 4). Every call adds
`--md-paths '^$' --small-markers`:
- Batch 1: `--dir src/data/afterSchoolPrograms`
- Batch 2: `--dir src/data/internationalTravel`
- Batch 3: three runs, `--dir src/data/summer`, `--dir src/data/learningSupport` and
  `--dir src/data/highSchoolPlacementPrograms`, each with its own worklist and review
  file. The chrome labels are reviewed by hand in a section of `review-batch3.md` (Step
  3c).

Every school in an area is in that area's batch, so no `--slugs` or `--paths` split is
needed.

**Progress tracking across windows.** Each batch is built in its own window. After each
batch, `/implement` fills that batch's row in "Batch progress". The front matter stays
`status: in-progress` through Batches 1–2. It becomes `english-done` (INDEX: *English
shipped*) only after Batch 3.

### Batch progress

| Batch | Commit | Review file(s) | Reviewer findings (fixed) | User verdict |
|---|---|---|---|---|
| 1 (Part 1) | "plainsmall: skip never-rendered flags in the plain-language checker" (`68cf86e6`) | — | — | — |
| 1 (fixes) | "plainsmall: batch 1 fixes — Cannon catalog claim, CCD UltraCamp note to verify" (SHA: `dcebb7f2`) | [review-batch1-fixes.md](plainsmall-data/review-batch1-fixes.md) | — | |
| 1 | "plainsmall: batch 1 English — After School" (`b197f8a3`), then the user-approved `catalogIntro` render fix (`992b963b`) | [review-batch1.md](plainsmall-data/review-batch1.md) | 15 in 11 rows, all fixed (mostly bare referents after a split, plus one weakened and one strengthened claim, and three lines that still sounded unsure); plus 5 issues outside the rows, all fixed (3 bookkeeping lines the sweep missed, 1 unhedged inference, 1 not-found form) | approved 2026-11-10, no rulings |
| 2 (fixes) | "plainsmall: batch 2 fixes — Cannon and Country Day cross-school claims" (SHA: `7360b3b5`) | [review-batch2-fixes.md](plainsmall-data/review-batch2-fixes.md) | — (the reviewer re-checked both claims: true) | |
| 2 | "plainsmall: batch 2 English — Global Exposure" | [review-batch2.md](plainsmall-data/review-batch2.md) | 6 in 6 rows, all fixed (2 split referents that lost a scope, 2 strengthened claims, 1 packet listing turned into a plain fact, 1 "has seven partners" read as current) | |
| 3 (fixes) | "plainsmall: batch 3 fixes — Prep price note to verify" (SHA: ) | review-batch3-fixes.md | — | |
| 3 | "plainsmall: batch 3 English — Summer, Learning Support, HSP, chrome" | review-batch3-{summer,learning,hsp}.md | | |

### Unit notes (things the drafter must not get wrong)

**Batch 1: After School**
- **cannon `cost.flags[1].text`** (61 words). Keep "effectively hidden", "orphaned backup
  URL inside a collapsed accordion", the three omitting sources in order, the quoted
  `"After School Program"` / `"Beyond the Bell"`, "fee-bearing while assigning them no
  amount" and `$98 AP exam`. The off-worklist `verdict.watchouts[1]` shares "the rate card
  exists only on an…": keep that clause.
- **cannon `verdict.strengths[4]`.** It is fixed in Step 2a (Decisions, "Fact fix"), so
  it leaves the worklist. Show the counts at the review: Cannon 22 and PD 15 fully
  priced; Latin 27, Prep 9 and Trinity 4 with grade ranges only; Carmel, Christian, CCD,
  DD, Gaston and HG list no classes, and Covenant has no catalog.
- **carmel-christian `coverage.flags[1]`.** The quote "Registration for 2026-2027 is now
  full." stays bold and byte-identical. Keep "operational capacity status, not a change
  to the published hours or prices" and "may face a waitlist". "Mid-year applicant" may
  become "a family applying mid-year".
- **charlotte-christian `dayInside.wordsText`** (6 quotes). Rewrite only the connective
  text; keep the times `3:00–3:30 … to 5:00` exactly, and keep the bold "Snack is not
  provided in either program". "Pickup authorization is explicit and enforced" → plainer,
  keeping "ID checks early in the year".
- **charlotte-christian `dayInside.flags[0]`** (68 words). Drop the asterisks around
  `Focus`. The club list keeps both divisions and their order. Make it a `·` run per
  division ("Lower School: art · coding · …"). "Junior Knights basketball and intramural
  cheerleading" stay. The bold "no day, no grade range and no fee" stays, identical to
  Latin's `catalogIntro` wording.
- **charlotte-country-day `cost.flags[1]` / `verdict.watchouts[2]`.** "envelope" ("the
  tuition-assistance envelope") → plain ("outside tuition assistance"). Keep "about 30%"
  and the summer-aid contrast in both.
- **charlotte-country-day `dayInside.flags[0]`.** The UltraCamp check moves to a verify
  flag in Step 2a (Bookkeeping fixes), so the bold "zero results" leaves the prose with
  it. The prose rewrite lands in the same Step 2a commit, so the unit leaves the
  worklist. In that rewrite, keep the quoted "more than 25 after-school enrichment
  classes" and the 13-item list (a `·` run), and keep "No public page gives names with
  days, grades and fees". Batch 1's worklist is therefore **36**.
- **charlotte-latin `coverage.basisNote`.** Keep "**full-time PER-SEMESTER rate — 5 days a
  week**" (bold, caps), "bills twice a year rather than monthly", "double them for a
  school year", "linear … proportionally less", and "**The Cost Planner**" (bold, the
  card name). The shared template clauses with the off-worklist schools stay identical.
- **charlotte-latin `cost.flags[1]`.** "ancillary" → "extra". Keep all five unpublished
  fees in order, "appears to be pre-registered fixed days only" (a hedge), and the
  summer-camp contrast ("so the school clearly can be transparent").
- **covenant-day `cost.fees[4].label` / `cost.flags[0]` / `verdict.watchouts[0]`.**
  - **The arithmetic.** `$744/mo`, `$744 a month`, `$6,696` annual, `$248`, `$20 drop-in
    to $248/month`, "three stacked sessions", "1:30 dismissal" and "to 6:00" stay.
  - **The DERIVED class.** "summed by the researcher" / "derived by stacking" stays
    DERIVED, worded as in "Bookkeeping fixes" ("**added up on this page**").
  - **Own figure vs stacked.** "the school’s own published figure … annual $6,696" stays
    distinct from the stacked total. For "The single-session column is verbatim", use the
    Bookkeeping fixes wording.
- **davidson-day `dayInside.wordsText`.** Quotes untouched. Keep "roughly **15:1**" and
  "the school itself described". The last sentence follows "Bookkeeping fixes". The six
  off-worklist Davidson Day bookkeeping units are rewritten in this batch too, with the
  same "saved copy" wording, so the area reads consistently.
- **gaston-day `coverage.basisNote` / `cost.aside.text` / `cost.fees[8].label`.**
  - Keep "WEEKLY" in caps, "2025-26 Schedule of Tuition and Fees", "near-identical
    figures as monthly" and the drop-in arithmetic: `$90 vs $95`, `$120 vs $95`, "up to
    three days", "from four".
  - "36-week year is this project’s standard planning assumption" follows "Bookkeeping
    fixes". Keep all four "states no …" items.
- **gaston-day `dayInside.wordsText`.** "decompression-then-structure rhythm" → plain
  ("starts with free play, then moves to structure"). Keep the four stages in order, and
  "at no charge", "the one explicit interlock" → "the one stated link with another school
  program" (ONLY kept).
- **hickory-grove-christian `coverage.flags[0]`.** Keep "TK–5 Afterschool" (the school's
  spelling), "monthly/annual", the quoted "student services fees", "FACTS Family Portal",
  and the Compare row's N/A. The last sentence follows "Bookkeeping fixes" ("So this
  page has no cost planner for it, …"); Batch 3 reuses that clause for HG Summer.
- **providence-day `cost.flags[0]`.** Keep the bold **9 months** and the ESTIMATE
  ("assume"). "should be confirmed" follows "Bookkeeping fixes".
- **trinity-episcopal `coverage.basisNote`.** Four bold spans: keep each. Keep "TED",
  "household over $90,000", "top of four income bands", "$105/month under $30,000", and
  "does **not** price … by days per week".
- **trinity-episcopal `dayInside.catalogIntro`** (10 quotes, 4 bold). The quotes, the bold
  spans "**for an additional fee**", "**examples**", "**not the full roster**" and
  "**paid**", and the two meanings of "enrichments" all stay. Only the connective text
  shortens.

**Batch 2: Global Exposure**
- **charlotte-latin `network.rows[0].text`** (50 words, grade 24.4). This is a list of
  six faculty trips; make it a `·` run after "Recent faculty travel includes:". Each item
  keeps its place ("AP training in Seville").
- **charlotte-latin `network.cells[1].text`.** Six semester schools: a `·` run. "SYA" stays
  unglossed unless the file spells it out.
- **providence-day `trips.headline`** (the collapsed teaser). Keep "Nineteen", "2022–23 to
  2026–27", "four trips planned for summer 2027, three in Upper School and one in Middle
  School", and "Filter by division." Make it two short sentences plus the filter line.
- **providence-day `lead.strong`.** Keep the quoted motto byte-identical, "TK–12", and
  "what the school calls the first Global Studies Diploma in the nation" (a CLAIM, not
  ours).
- **providence-day `community.cells[3]`.** Keep "Bhandari Mehta Endowment, established in
  2020", "first … first- or second-generation immigrants to the US, or who are students of
  color" (the order of priority, "first", "or").
- **providence-day `verdict.ask[4].question`.** "two PD study tour leaders, travel partner
  Envoys and emergency medical and evacuation insurance" stays. It is a question; keep
  both questions.
- **cannon `verdict.standsOut.summary`.** "centred" → "centered". Check "something most
  Charlotte schools do not" against the six GE files: only schools with a published
  certificate count. Keep "global language learning from Junior Kindergarten".
- **charlotte-country-day `lead.strong`.** Keep "dates to 1988", the three cities in
  order, "faculty-led", and the shared "trips over spring break and in the summer".
- **charlotte-country-day `verdict.standsOut.summary`.** Keep "six published Middle School
  experiences from 6th grade" and "since 1991". Check "Among Charlotte private schools"
  against the six files.
- **davidson-day `lead.strong` / `verdict.standsOut.summary`.** Keep "AFAR, the American
  Foreign Academic Research archaeology field school" (the file's own expansion), "Spain,
  Portugal and Belize", "a two-year Upper School research distinction", and "unlike any
  other school's here" (checked).
- **davidson-day `trips.alsoOnRecord[0]`.** STALE: "it is gone from later copies of the
  page" stays STALE. Keep "In early 2026" and the three cities.
- **davidson-day `network.conferences[0].text`.** It is already a `·` list; shorten the
  lead only.
- **charlotte-christian.** "six to eight trips abroad" (a range, both words), "some from
  9th grade and most from 10th", and "for most, a mission or service partner" (a sample)
  stay.

**Batch 3: Summer, Learning Support, HSP, chrome**
- **Summer cannon `costPlanner.flags[0]`.** Keep both bold spans, the quoted "registration
  fee", "$25" → "$50 membership fee", and "between 2024 and 2026". "older camp-directory
  listings still get wrong" stays THIRDPARTY + STALE.
- **Summer charlotte-catholic `catalog.flags[0]`.** The closing clause follows
  "Bookkeeping fixes" ("so this page has no cost planner for these camps"). Keep "Three
  of the four camps", "Eddie Hull Baseball", "third-party registration site" and
  "publish none at all".
- **Summer charlotte-latin `costPlanner.fees[3].label` / `costPlanner.aside.text`.**
  - Keep the cents exactly: `$70.00`, `$50.00`, `$100.00`.
  - Keep "at least 4 years old", "does not pro-rate it for a late registration", "12:00pm
    on the Wednesday before each session", "**May 1 nothing is refundable**" (bold) and
    "even if the camp has a waitlist".
  - Keep "pro-rate" as written (plainclubs: "prorated" → "reduced in proportion" only if
    the unit needs it).
- **Summer charlotte-prep `costPlanner.fees[2].label`.** It is fixed in Step 2a (a move;
  see "Bookkeeping fixes"), so it leaves the worklist. The bold quote "Early bird: "$25
  savings per week now through January 15, 2026."" stays byte-identical. Summer's
  worklist is therefore **18**.
- **Summer charlotte-prep `catalog.camps[3].desc`** (searched). Keep the quote "small
  groups of 6 or less", "rising MK–2 (Mon–Wed)", "rising 3–5 (Thu–Fri)" and every subject
  noun.
- **Summer covenant-day `catalog.intro` / `catalog.flags[0]`.** Keep "All 20 publicly
  named camps", "portal-gated" / "CampBrain", "$170–$325/week" as the **third-party**
  range, "the school’s own 2018 catalog" (hours patterned on it) and "the care add-on
  rates … are the school’s own current figures".
- **Summer gaston-day `costPlanner.fees[2].label`.** "REQUIRED" stays caps. Keep "between a
  morning and an afternoon camp", "Sparty’s Dining Service", "already included in
  full-day Camp Spartan and Camp Spartan Jr tuition" and "only when combining two
  half-day camps".
- **Summer hickory-grove-christian `catalog.flags[0]` / `[1]`.**
  - "slate" → "list". The archive and "not recoverable" wording follows "Bookkeeping
    fixes", and so does the off-worklist `catalog.intro`.
  - Keep "eight session windows consistent with these week-blocks" (a hedge).
  - `[1]` reuses Batch 1 HG's cost-planner clause word for word.
- **Summer trinity-episcopal `catalog.headline`** (teaser). Keep "75 named camps across
  six weeks for rising K–8", `$225 half-day craft camp`, `$785 three-week academic
  session`, and "open to any child in the community, not only Trinity families".
- **Summer trinity-episcopal `costPlanner.aside.text`** (75 words).
  - Keep the day-first "1 May" ×2 and "a week before each session".
  - Keep the bold spans "**All TES Academy camps require payment in full at
    registration.**" and "**$25 administration fee**".
  - Keep "may be assessed" (not "is charged") and "generally not issued" (a hedge), plus
    "deposit and fee can be transferred to another camp".
- **Summer trinity-episcopal `costPlanner.fees[4].label`.** The bold "Financial aid
  excludes CAMMP, TES Academy and Black Rocket camps" stays. "slate" → "list". Keep
  "first-come, first-served" and "two most recent tax statements".
- **LS charlotte-country-day.** Every quote byte-identical. "psychoeducational evaluation"
  stays the term (the school's word, on the documents a family submits); the first
  occurrence in a unit may gain a short gloss "(testing of how a child learns)". The
  three-site review-cycle wording is identical (Near-repeats). The policy contradiction in
  `testing.entries[3].muted` stays a contradiction: two published statements, neither
  picked.
- **LS davidson-day `eligibility.eligible`.** Quotes untouched. Keep "The 2026-2027
  request form asks for no diagnosis, evaluation or other documentation" (each of the
  three nouns).
- **LS hickory-grove-christian `eligibility.headline`** (teaser). Keep "a 504, an IEP or a
  prior school’s accommodations plan" (do not add `[[…]]` markers) and "outside its
  scope".
- **LS charlotte-catholic `staff.note.muted`.** Keep the five letter ranges exactly, "stay
  the same for all four years", and "grades 10–12".
- **HSP charlotte-prep `outcomes.headline`** (teaser; raw field, no money). Keep "97%",
  "Class of 2026", "one or both of their top two", "accepted" and "every class since
  2023".
- **HSP charlotte-prep `placement.steps[3]`.** Quote untouched. Keep "individually … and
  separately with each student's parents", "encouraged" (not required) and "day visits".
- **HSP trinity-episcopal `placement.steps[1]`.** Keep "handled separately and by a
  different person", "12% of all graduates since 2004", "went to" (enrolled) and the six
  school names in order.

### Style rulings

**Carried over from plaincollege, plainadmissions, plainaid, plainarts and plainclubs.**
These are precedent: the user approved every batch of all five plans. The full text is in
[`plainclubs.md`](plainclubs.md) "Style rulings". The drafter reads it before Batch 1, and
the reviewer gets it. In short:

- **Explaining terms:**
  - Keep-and-explain with a parenthesis directly after the term, or one wrapping it. No
    `plain-ok` was needed in 708 units.
  - "rather than modelled" → "rather than estimated"; "in this set" → "among the schools
    on this site"; "legible" → "clear"; "granular" → "detailed".
  - A published maximum is never glossed as a typical figure.
- **Splitting:**
  - A split uses "First: … Then: …" or a `·` run, every item kept in order.
  - `a.m.` / `p.m.` / `Mr.` / `etc.` move off a sentence end.
  - A referent after a split names its noun, never a bare "it" / "this".
- **Claims and markers:**
  - A school's own term is never paraphrased. A detached school description is
    re-attributed ("The school says …").
  - A requirement word is never softened, an overclaim verb never upgraded, and "only"
    still covers everything.
  - A marker word never leaves its class.
  - A not-published claim keeps a not-published verb, never "there is no …".
  - A not-found list leads "None of these appears in any source:".
  - A cross-school claim is checked; a false "every" becomes the true quantifier.
- **Quotes and counts:**
  - A quote that ends a sentence goes last in the unit.
  - No count word is added that the before-text lacked (guard (n)): "The roles are …",
    never "The nine roles …".
- **Scope:** a split keeps a claim's scope, an individual award stays individual, and a
  sample keeps its narrowing word.
- **Glosses:**
  - A gloss stays inside the term's meaning and adds no marker word.
  - A full list stays a full list ("takes place at …", never "includes").
  - A unit note's keep is kept even when a synonym seems plainer.
  - A plan's own suggested wording is measured against the guards before use.
- **The reviewer's recurring findings across all five plans are the checklist here:**
  - strengthened claims;
  - wrong referents after a split;
  - dropped narrowing words;
  - a gloss that changed a term's meaning;
  - not-published turned into does-not-exist;
  - a school statement turned into our own claim;
  - a full list turned into a sample;
  - a false cross-school claim.

**From this plan** (each batch was approved with no rulings, so its choices stand as
precedent):
- **Batch 1 (After School):**
  - A STALE rewrite uses "saved copy/copies of …", never "saved 2020 copy" (the year
    splits the pattern).
  - "unconfirmed" keeps VERIFIED ("the school has not confirmed"), never becomes "has not
    published".
  - A derived total reads "added up on this page".
  - "ancillary" → "other", since "extra fee" enters EXTRA.
- **Batch 2 (Global Exposure):**
  - "our count" on a derived figure → "counted from the school's list / Global Map / …"
    (no first person; the figure stays visibly derived).
  - A cross-school "most … do not" / "stands out for" is checked against every file in
    the area. A false one becomes a concrete, checkable statement ("only Providence Day
    and Davidson Day publish …", "publishes the most Middle School travel"), in its own
    fixes commit.
  - "inaugural" stays: "first" would enter FIRST.
  - "oversubscribed" → "more students sign up than there are spots"; never "apply"
    (enters APPLICATION).
  - A split keeps each clause's scope: "That year, …", "The Middle School trips to
    France and Italy …".
  - "has had seven partners since 1989", never "has seven": a since-year count is not a
    current count.
  - A sentence never ends on a month name ("March."), because guard (g) reads the
    period as part of the date token.

*Rulings from later batches are added here by `/implement`.* If a resume
command arrives with the `<, with these rulings: …>` placeholder unfilled, read it as
"approved, no rulings", as every earlier plan did, and record that batch's choices here as
precedent.

### plain-ok register

*Every `// plain-ok` marker or `plain_language.json` `allow` entry added, with path, term
and reason. Target: empty.*

## Approvals needed

**None up front.** No card, section, Compare row, metric key, topic, ordering or layout
changes.
- Part 1 changes the flag-filter **call** in five components and renders exactly what they
  render today. The browser check proves it. If the user would rather leave components
  untouched, the fallback is a parse-only check that compares a skip list in the checker
  against `ClubsProgram.tsx`'s filter. It is weaker, because it must parse filter code, and
  is not recommended.
- The five chrome-label rewordings are wording changes to existing labels, reviewed at
  Batch 3. `src/lib/metrics.ts` labels are deliberately left alone, so no Compare row
  moves.

- Moving two research steps into appended `verify` flags is a data change behind existing
  cards. They render dev-only, and nothing on the production page is added or reordered.

The gates are the user's wording reviews: one per batch, then Phase 1 → 2. Two choices can
be overruled at review:
- the `metrics.matriculation` wording (Batch 3; Open questions);
- the Cannon fact-fix wording and the bookkeeping treatments (Batch 1, shown in
  `review-batch1-fixes.md` and `review-batch1.md`).

## Source material

None up front. This is a wording pass, a checker change and a set of named fixes, and the
Cannon fix uses only the data files. If a new fact fix needs fetched data, it is persisted
first (Decisions). Otherwise no
`source-material/` file is written or ingested.

## Out of scope

- **Other areas:** Sports, Course Offerings, Admissions, The Arts, Student Clubs prose,
  College Support, Financial Aid, `src/content/**`.
- **`src/data/metricValues.ts`**, including every Compare tip for these areas.
- **Other files:** `src/lib/metrics.ts` labels; `scripts/plain_language.json` beyond the
  two `centred`/`centring` spelling-map entries (the jargon list, thresholds and `allow`
  are not edited); lowering `maxGrade`.
- **en.json:** any key other than the five; the `learning.glossary.*` definitions.
- **Units not on the worklist.** Out of scope are every off-worklist field and unit
  (except the 8 bookkeeping units named in "Bookkeeping fixes"), every non-prose field,
  every existing `kind: 'verify'` flag, and every off-worklist near-repeat site. The
  existing verify flags are dev-only; Summer Cannon's `*Adventure Camp*` "travelled" flag
  is one. The worklists plus the bookkeeping allow files are the contract.
- **Structural changes:** no new fields, no split arrays, and no `kind` or `code` value
  changed. No card or layout change. The only structural edits are the two appended
  `verify` flag objects.
- **Freshness:** re-verifying programs, fees, trips or services against live pages, beyond
  the Cannon catalog counts, which are re-read from the data files.
- **Bookkeeping outside the five areas,** and outside rendered prose (comments,
  `source-material/`, existing verify flags).
- **Part 1 limits:**
  - `check:flags` covers flag kinds only. It does not cover cards gated by the manifest
    (Student Clubs' Academic & Competitive Clubs and Club Catalog, Course Offerings,
    Financial Aid). Today those render for every school with an entry (Context).
  - The prose extractor is not changed.
- **Deploying.** Merging is pre-authorized; `npm run deploy` is the user's call, every
  time.

## Steps

### Phase 1 — English

**Batch 1 runs Steps 1–8. Batches 2–3 each run Steps 2–8 for their own scope.** Before
starting Batch 2 or later, run `git checkout feat/plainsmall`, then
`git fetch && git rebase origin/main`. Do not stash (memory
`never-git-stash-in-shared-tree`). If a rebase conflicts in a batch file, re-run Step 2
after resolving it.

1. **Part 1 and the review tooling** (Batch 1 only). This is two commits:
   - 1a–1c are "plainsmall: skip never-rendered flags in the plain-language checker";
   - 1d–1e are part of the Batch 1 English commit.

   **(a) The shared rule.**
   - Create `src/lib/flagVisibility.ts` (design in Context), with a header comment saying
     who reads it and why it must stay import-free.
   - Change `src/lib/toVerify.ts`: `visibleFlags(topic, flags)` delegates to
     `renderedFlags(topic, flags, SHOW_TO_VERIFY)`. Update its doc comment: it no longer
     says "The other flag kinds … still render everywhere"; it points to
     `flagVisibility.ts`.
   - Update the five call sites: `AfterSchool.tsx` (~line 98), `CollegeSupport.tsx` (~80),
     `SummerPrograms.tsx` (~97), `HighSchoolPlacement.tsx` (~81) and `ClubsProgram.tsx`
     (~62). In Clubs, replace the literal filter with `visibleFlags('student-clubs',
     flags)`.
   - Rewrite Clubs' `Flags` doc comment so it points to `HIDDEN_FLAG_KINDS`. Keep its
     reason (GAP/COUNT are research bookkeeping; NOT-A-CLUB corrects a miscount). Also
     keep the comment at ~line 37 ("Only `not-a-club` can reach the screen").
   - Update the `CollegeSupport.tsx` comment at ~line 69 that mentions the Clubs filter.

   **(b) The checker.**
   - Change `scripts/check_plain_language.mjs`:
     - `getLayout()` also imports `../src/lib/flagVisibility.ts` (lazily) and exposes
       `isParentFacingFlag`;
     - `proseUnits(entry, prefix, classifyField, topic)` skips an object whose path
       matches `/(?:^|\.)flags\[\d+\]$/` when `topic` is given and
       `!isParentFacingFlag(topic, node.kind)`. The existing anywhere-`verify` skip stays.
       `proseUnits` stays synchronous: pass the predicate in (`proseUnits(entry, prefix,
       classifyField, isHidden)`, where `isHidden(path, node)` is built from
       `getLayout()`) rather than importing inside it;
     - `unitsFromModule` passes `scope.topic` / `spec.topic`;
     - update the header comment ("`kind: 'verify'` flag objects are dev-only and skipped
       …") to name `flagVisibility.ts`.
   - Change `scripts/plain_review.mjs`:
     - its `--worklist` excludes the `--dir` topic's `HIDDEN_FLAG_KINDS` (and, in
       `--topic` / `--layers` mode, the layer's topic) by default;
     - `--skip-flag-kinds` adds to that;
     - rows and guards are unchanged (hidden flags stay visible to (k));
     - update the Options comment.

   **(c) The drift guard and tests.**
   - Write `scripts/check_flag_visibility.mjs`: the five assertions in Context. It
     accepts `FLAG_VIS_ROOT` to run on a fixture tree. Add
     `"check:flags": "node scripts/check_flag_visibility.mjs"` to `package.json`, and
     chain `&& npm run check:flags` into `build` right after `check:spelling`.
   - Add `node:test` cases to `scripts/check_plain_language.test.mjs` (run by
     `npm run test:plain`). Each is isolated (memory
     `negative-test-must-isolate-the-assertion`): it asserts which message printed, not
     only the exit code.
     - **A.** The hook on `src/data/clubsPrograms/cannon.ts` (a fixture dir, added to
       `fixtureRoot()`). Adding `flags: [{ kind: 'gap', text: '<jargon sentence>' }]`
       exits 0; the same with `kind: 'count'` exits 0; with `kind: 'not-a-club'` exits 2.
     - **B.** The existing test 11 still passes: a `gap` flag in `sportsPrograms` exits 2.
       Add the same for `afterSchoolPrograms`.
     - **C.** In clubs, an object `{ kind: 'gap', text: … }` **not** inside a `flags`
       array (e.g. `honors: { note: { kind: 'gap', text } }`) is still checked (exit 2).
       The skip is scoped to flags.
     - **D.** `proseUnits` unit test: with the clubs predicate, a `flags[0]` gap is
       skipped and a `flags[1]` not-a-club is kept. With no topic, both are kept. A
       `verify` object anywhere is skipped either way.
     - **E.** `--report` on a fixture root with one clubs gap flag and one clubs
       not-a-club flag, both jargon: Flagged is 1.
     - **F.** `check_flag_visibility.mjs` on fixture component trees (`FLAG_VIS_ROOT`).
       Each fails with its own message:
       - a clean tree passes;
       - `flags.filter((f) => f.kind === 'not-a-club')` in a component fails rule 3;
       - a `Flags` that never calls `visibleFlags` fails rule 1;
       - `visibleFlags('afterschool', …)` (not a topic) fails rule 2;
       - `HIDDEN_FLAG_KINDS` naming `'gaps'` (absent from `FlagKind`) fails rule 4;
       - a second `HIDDEN_FLAG_KINDS` declaration in a component fails rule 5.
   - Run `npm run test:plain` (26 tests today; all pass) and `npm run check:flags`.

   **(d) Record the new baseline.**
   - Run `npm run check:plain` and paste the per-area table into Implementation notes.
   - Expect **student-clubs Flagged 0** (was 16) and a lower Grade >10 / Grade >12 and
     prose-unit count for student-clubs (the hidden flags leave; 33 GAP/COUNT flag
     objects exist). Every other row is
     identical to the Context table.
   - Then run `node scripts/plain_review.mjs --dir src/data/clubsPrograms --layers
     --worklist <scratch>` with **no** `--skip-flag-kinds`. It must list none of the
     hidden flags, matching the plainclubs result with the flag.
   - Run the clubs hook loop: `for f in src/data/clubsPrograms/*.ts src/data/clubClusters.ts src/data/clubCatalog.ts; do node scripts/check_plain_language.mjs --file $f; done`
     reports **0** issues. Today it reports 20, all on hidden GAP/COUNT flags.

   **Then commit 1a–1d** (Step 8's staging rules), after `npx tsc -b`, `npx vite build`
   and a browser look at one clubs page (Step 7, the clubs item).

   **(e) `--small-markers` for guard (h), and guard (n).** Keep every existing option and
   guard, and keep default behavior byte-for-byte. Update the header comment. It enables:
   - the aid classes THIRDPARTY, ESTIMATE, BOUND, DERIVED, COVERED, NOTCOVERED, DISCOUNT,
     AVERAGE, TYPICAL;
   - the arts classes CLAIM, VERIFIED, NOTFOUND;
   - the clubs classes ONLY, FIRST, APPLICATION;
   - these new classes, case-insensitive, presence/absence per unit as today:
     - STALE:
       `\bno longer\b|\bused to\b|\bformerly\b|\bpreviously\b|\b(?:is|are) gone\b|\bgone from\b|\bsnapshots?\b|\b(?:20\d\d )?captur(?:e|ed)\b|\barchived?\b|\bsaved cop(?:y|ies)\b|\bold pages?\b|\b(?:older|earlier|prior|later) (?:copies|listings?|brochures?|catalogs?|pages?|versions?)\b`
       ("saved copy" and "old pages" are the bookkeeping rewrites' STALE words, so a
       rewrite of "capture" stays in the class);
     - GATED:
       `\bportal(?:-gated)?\b|\blog-?in(?:-gated)?\b|\bgated\b|\bcheckout\b|\bregistration (?:site|platform|portal)\b`;
     - CAPACITY:
       `\bwait-?lists?\b|\bnow full\b|\bsell(?:s|ing)? out\b|\bfirst-come\b|\blottery\b|\boversubscribed\b|\bminimum enrollment\b|\bpriority\b`;
     - EXTRA:
       `\badd-?ons?\b|\badditional fee\b|\bextra (?:fee|cost|charge)\b|\bfee-bearing\b|\bincidental charge\b|\bpaid\b`;
     - FREE: `\bfree\b(?! (?:play|time)\b)|\bno charge\b|\bat no (?:extra |additional )?(?:cost|charge)\b`;
     - REFERRAL:
       `\brefer(?:s|red|ral|rals|ring)?\b|\boutside (?:provider|professional|specialist|therapist|evaluator)s?\b`;
     - DOCUMENTATION:
       `\bdiagnos\w+|\bpsycho-?educational\b|\bevaluations?\b|\bdocument(?:ed|ation)\b|\bformal testing\b`;
     - ACCOMMODATION: `\baccommodations?\b`;
     - MODIFICATION: `\bmodifications?\b`;
     - SCOPE: `\boutside (?:its|the|our) scope\b|\bout of scope\b`;
     - ACCEPTED: `\baccept(?:ed|ance|ances)\b|\badmit(?:ted)?\b`;
     - ENROLLED: `\benroll(?:ed|s|ing|ment|ments)?\b|\battend(?:s|ed|ing)?\b|\bmatriculat\w+|\bwent to\b`;
     - SPONSORED:
       `\bschool-(?:sponsored|run|led)\b|\bfaculty-led\b|\bsponsored by\b|\btravel partner\b`.

   A synonym inside one class is free. Leaving a class, or entering one, fails. Gate the
   classes like the existing sets: the new ones run only under `--small-markers`. Guard
   (n) runs under `--arts-markers`, `--clubs-markers` or `--small-markers`.

   **Negative tests**, one per new class plus one for the default-skip, each isolated:
   - copy the target file byte-for-byte to the scratchpad;
   - plant exactly one fault and run `--check` with the Batch 1 arguments;
   - confirm it exits 1 with **that class name and that `slug:path`**, reading which
     message printed;
   - restore from the copy and confirm `cmp` is clean.

   The faults:
   - **STALE:** AS davidson-day `dayInside.wordsText`, delete "All of this is from the
     2020 capture."
   - **GATED:** AS covenant-day `coverage.flags[0].text` "login-gated" → "private".
   - **EXTRA:** AS trinity-episcopal `dayInside.catalogIntro` "for an additional fee" →
     "as an option". (This also trips (d) quotes; read both messages.)
   - **CAPACITY:** AS carmel-christian `coverage.flags[1].text` "a waitlist" → "a delay".
   - **FREE:** AS gaston-day `dayInside.wordsText` "at no charge" → "after school".
   - **DERIVED:** AS covenant-day `cost.flags[0].text` "derived by stacking" → "taken
     from".
   - **(n):** AS cannon `verdict.strengths[4]` "of the six" → "of the five".
   - **(l):** AS providence-day `cost.flags[0].text`, unbold "9 months".

   Batch 3 runs the LS, HSP and Summer classes on its own first fault before drafting:
   - **REFERRAL / DOCUMENTATION:** LS charlotte-country-day `testing.headline` "from an
     outside provider" → "from a provider";
   - **ACCEPTED:** HSP charlotte-prep `outcomes.headline` "accepted into" → "enrolled at".
     Expect ACCEPTED lost and ENROLLED added.

   **Calibrate on approved work, and record the result** in Implementation notes.
   - Run each row without and with `--small-markers`, inside a worktree at that merge.
     `ROOT` comes from the script's location, so copy the new `scripts/plain_review.mjs`
     into each worktree's `scripts/` first, then `git worktree remove` it.

     | Area | Worktree at (merge) | Command (inside it) | Known result without `--small-markers` |
     |---|---|---|---|
     | College Support | `df1915aa` (#467) | `--dir src/data/collegeSupportPrograms --base c761a159 --check` | 3 (h) hits |
     | Admissions | `b181a8d8` (#469) | `--dir src/data/admissionsPrograms --base 9c0e0720 --check` | 16 (the approved cycle relabel) |
     | Financial Aid | `8a4fdbec` (#471) | `--topic financial-aid-report --base 792fbd6a --aid-markers --check` | 2 |
     | The Arts | `7c2f73df` (#476) | `--dir src/data/artsPrograms --base da0805fa --arts-markers --no-md --md-paths '^$' --check` | 0 |
     | Student Clubs | `2035e4e4` (#479) | `--dir src/data/clubsPrograms --layers --base d9de16de --clubs-markers --no-md --md-paths '^$' --check` | read it; record it |

   - **The without-run must match the known result.** Read every new hit from the
     with-run. A real past slip goes under Candidates. A class that is too tight is
     loosened only with a recorded reason, in the script's comments.
   - **Default mode is unchanged.** Run the old and new script on the Arts row and `diff`
     the two `--out` files; they must be identical apart from the date line.
2. **(a) Fixes commit** (Batches 1 and 3; Batch 2 has none). This lands **before** the
   worklist is generated, so the wording-pass guards compare against the fixed text.
   - **Rerun the bookkeeping sweep.** Use `BOOKKEEPING_RE` (Context) over this batch's
     dirs. Every hit must be in the "Bookkeeping fixes" table. A new hit is judged by the
     Decisions rule and added to the table before going on.
   - **Apply this batch's moves and fact fixes, with Edit** (the hook sees each edit):
     - **Batch 1:** the Cannon `verdict.strengths[4]` fact fix, after re-checking the
       catalog counts (Decisions), and the CCD `dayInside.flags[0]` move;
     - **Batch 3:** the Prep summer `costPlanner.fees[2]` move.

     Each rewritten prose unit is written plainly now (sentences ≤30 words, grade ≤10),
     so it passes the hook and drops off the worklist. Each verify flag is **appended**
     to the end of its `flags` array.
   - **Check:**
     - `git diff` shows only those units plus the appended flag objects;
     - no existing `flags[N]` index moved;
     - the dev server shows the new verify chip, and the production preview does not.
   - **Hand review.** Write `.claude/plans/plainsmall-data/review-batch<N>-fixes.md`: a
     table of path, before, after and evidence (the catalog counts for Cannon; the
     reason a step moved). Generate the rows with
     `node scripts/plain_review.mjs --dir src/data/<dir> --out <that file>` **without**
     `--check`. Guards (n), (m) and (k) fire on these units by design, and the review
     file records which.
   - **Commit** as "plainsmall: batch <N> fixes — <what>". Record its SHA in "Batch
     progress": Steps 4–5 of this batch run with `--base <that SHA>`.
   - **Write `.claude/plans/plainsmall-data/worklist-bookkeeping-batch<N>.json`** by hand,
     in the generator's format, listing this batch's off-worklist (**+**) bookkeeping
     units. They are rewritten in the wording pass (Step 3), and the file is added to
     every `--allow` in this batch.

   **(b) Generate this batch's worklist(s).**
   `node scripts/plain_review.mjs --dir src/data/<dir> --worklist .claude/plans/plainsmall-data/worklist-<area>.json`,
   one per area. The area names are `afterschool`, `travel`, `summer`, `learning` and
   `hsp`. Compare the counts with the Context table, less the units the fixes commit
   took off: After School **36** (38 − Cannon − CCD) and Summer **18** (19 − Prep). If they
   differ otherwise, `main` moved: use the regenerated list, and note the difference in
   Implementation notes.

   **Batch 3 also writes `.claude/plans/plainsmall-data/worklist-chrome.json`** by hand,
   for the record. It lists the five keys, with their before-text and rules.
3. **Draft, measure, then apply** (plainclubs' method).
   - **Draft** to a scratch JSON keyed by `at`.
   - **Measure** with a scratch script that runs the real `analyze`, plus the Step 1 guard
     functions, against the original.
   - **Check:** every capitalized word the before-text had must be in the after-text
     (guard (h) "caps gone"). Grep the drafts for `*` (only `**` pairs may remain, the
     same count) and for `[[`.
   - **Apply** with an exact-match script that refuses an old literal it cannot find or
     finds twice. Build each near-repeat from one shared string in the draft file.
   - **Re-run the hook by hand.** A scripted write bypasses the hook. Run the Step 4 hook
     loop and fix any remaining batch unit with Edit, so the hook sees it.
   - **Bookkeeping units:** draft this batch's worklist units **and** its off-worklist
     bookkeeping units (`worklist-bookkeeping-batch<N>.json`) to the Treatment in
     "Bookkeeping fixes". Keep each unit's marker class, as that section says.
   - **Rules for every unit:** apply the Decisions, the Style rulings, the Unit notes and
     every item of "Content that must survive". Same meaning, same hedges and conditions,
     same direction of every comparison. Sentences ≤30 words, aiming for 15–20, and units
     of 30+ words at grade ≤10.
   - **Quote delimiters.** Keep each string's delimiter valid TS. These files mix
     single-quoted strings (curly `’` for apostrophes) and double-quoted ones. A straight
     `'` inside a single-quoted string must be escaped.

   **(c) Batch 3 only, the chrome labels.**
   - Edit the five values in `src/locales/en.json` with **Edit** (the hook covers
     en.json), per Decisions. Then `git diff src/locales/en.json` must show exactly those
     five lines.
   - Append a hand-written `## Chrome labels` table (key, before, after, where it renders,
     reason) to `review-batch3-learning.md`.
4. **Measure.**
   - **Hook loop:** run the `check_plain_language --file` loop over this batch's dirs (plus
     `src/locales/en.json` in Batch 3). After each batch, every remaining issue is in a
     later batch's area. After Batch 3, **0** remain.
   - **Review file and guards:** for each area run
     `node scripts/plain_review.mjs --dir src/data/<dir> --base <this batch's fixes SHA, or main for Batch 2> --allow .claude/plans/plainsmall-data/worklist-<area>.json[,worklist-bookkeeping-batch<N>.json] --md-paths '^$' --small-markers --out .claude/plans/plainsmall-data/review-batch<N>[-<area>].md --check`.
     It must exit 0, with every row reading `hook: pass`.
   - **Bookkeeping:** rerun the sweep. It returns **no hits** in this batch's dirs. Every
     unit in "Bookkeeping fixes" for this batch reads as its Treatment says.
   - **Batch 2 only, spelling:** add `"centred": "centered"` and `"centring":
     "centering"` to `spelling.map` in `scripts/plain_language.json`, after the GE Cannon
     rewrite. Then `npm run check:spelling` passes. For the negative test, put "centred"
     back into the Cannon unit, confirm `check:spelling` exits 1 naming that path, then
     restore the file and confirm `cmp` against a scratch copy is clean.
   - **Stray edits:** `git diff --name-only main -- src/` lists only:
     - this and earlier batches' area files;
     - from Batch 1, `src/lib/flagVisibility.ts`, `src/lib/toVerify.ts` and the five
       components;
     - from Batch 3, `src/locales/en.json`.
   - **Residuals:** put every row with an after-grade above 10 into "Residual units above
     grade 10", with a one-line reason.
   - **Near-repeats:** confirm each group in this batch reads identically at all its
     sites, and matches an earlier batch's wording where one set it. Grep one shared
     phrase per group.
5. **Independent review.** Spawn one `general-purpose` subagent with the Agent tool. It
   never sees the drafting conversation.
   - **Give it:**
     - the path(s) to this batch's review file(s);
     - this plan's "Content that must survive", "How each field renders", "Near-repeats",
       "Bookkeeping fixes", "Unit notes", Decisions and Style rulings, plus
       `plainclubs.md` "Style rulings";
     - for Batches 1 and 3, `review-batch<N>-fixes.md`, to check the fixes too. For
       Cannon: is the new claim true against all 12 catalogs? For each move: does the
       prose still tell a parent what the school publishes?
     - the batch's data files and their component (`src/components/<Area>.tsx`);
     - for Batch 3, the en.json diff and `LearningSupport.tsx` / `HighSchoolPlacement.tsx`;
     - for Batches 2–3, the earlier review file that set each shared wording.
   - **Tell it to check every row for:**
     - meaning drift, or a strengthened or weakened claim;
     - a dropped hedge, condition or narrowing word;
     - a cost-model change (unit of time, per-what, included vs extra, refundable,
       deadline);
     - a published / not-published / not-found / does-not-exist swap, including a LS row
       that now reads as "not offered" where the chip says NOT STATED;
     - a school claim, third-party figure, estimate or derived figure blurred into a
       published fact;
     - a name, count, date, time, fee, age, grade or figure changed, or a word count
       turned into digits;
     - a referent made ambiguous by a split;
     - a cross-school claim that the other files contradict;
     - a trip cost or exact travel date added;
     - accepted vs enrolled blurred (HSP);
     - a comparison with another school added in Learning Support;
     - a bold span or quote altered;
     - a sentence that is now plainer but wrong.

     For the chrome labels, it checks that each still names what the row, chip or tab
     shows.
   - **Its output:** it fixes each finding in the source file (the hook still applies),
     then re-runs Step 4. It returns a findings list: path, problem, fix.
   - **After it returns:** regenerate the review file(s), then append the findings under
     `## Independent review`. Record the count in "Batch progress".
6. **Checks.**
   - **Build:** run `npx tsc -b`, then `npx vite build`.
   - **The build's later checks, by hand:**
     `npm run check:schema && npm run check:spelling && npm run check:flags && npm run check:travelrows && npm run check:matrices && npm run check:schoolurls && npm run check:chrome && npm run check:runtime && npm run check:moneytext && npm run check:dates && npm run check:spans && npm run check:photos`,
     plus `npm run test:plain`.
   - **`check:live` stale stamps are expected** only in this batch's topics (and earlier
     batches'), equal to the rewritten texts so far. Record the counts, which are Phase
     2's input, and confirm no other topic appears.
   - **Schema drift:** if `check:schema` drifts, run `npm run schema` and commit the doc.
     No drift is expected.
7. **Browser check.**
   - **Setup:** run `npx vite preview` after the build. Use headed Chrome via Playwright
     (memory `headed-chrome-via-playwright`). Do not wait on `networkidle` (memory
     `browser-check-networkidle-hangs`). Probe with `textContent` (memory
     `innertext-case-false-pass`), scoped to `#topic-<topic>`, because a school page
     renders every topic.
   - **For each batch school**, open `/school/<slug>/?topic=<topic>&lang=en`, open every
     card, and confirm:
     - every rewritten unit renders (match the live module's text);
     - no literal `*` appears in any rewritten unit, and each `**` span renders as
       `<strong>`;
     - the collapsed-card teasers show the new headlines.

     Then add the batch item below.
     - **Batch 1, Part 1 (before its commit):** on `/school/providence-day/?topic=student-clubs`,
       the clubs cards show exactly the not-a-club chips they showed on `main`. Compare
       chip count and text against a `main` build, or the live site. No GAP or COUNT chip
       appears, on preview or on `npm run dev`. On one After School and one College
       Support page, every flag chip still shows. On the dev server, a `verify` chip
       still shows.
     - **Batch 1:** Charlotte Christian's After School "Focus" shows no asterisks.
     - **Batch 3, Learning Support:** the need-filter tab row shows "Attention & planning
       (executive function)" and "Social & emotional", and at 320px the tabs wrap
       without page overflow. Every NOT STATED chip still renders on each LS school.
     - **Batch 3, HSP:** the destinations card on `/school/trinity-episcopal/` (and
       Prep's) shows "ACCEPTED ≠ ENROLLED".
     - **Batch 3, Compare:** `/compare/?topic=college-support` shows the "College
       Connections" row in the **same position** "Institutional Leverage" held on
       `main`, and `/compare/?topic=sports` shows "D1 / Top-College Enrollment" in its old
       position.
   - **Phone width:** one look at 390px per batch on one school with every card open: no
     page overflow (or run `npm run audit:mobile`).
8. **Commit and stop.**
   - **Stage explicit paths only.** Run `git status --short` first, and never
     `git add -A`. Stage:
     - the batch's data files;
     - `.claude/plans/plainsmall-data/worklist-*.json` and `review-batch*.md`;
     - this plan, with "Batch progress" filled in;
     - **Part 1 commit:** `src/lib/flagVisibility.ts`, `src/lib/toVerify.ts`, the five
       components, `scripts/check_plain_language.mjs`,
       `scripts/check_plain_language.test.mjs`, `scripts/check_flag_visibility.mjs`,
       `scripts/plain_review.mjs` (the default-skip only) and `package.json`;
     - **Batch 1 English commit:** `scripts/plain_review.mjs` (`--small-markers`);
     - **Batch 2:** `scripts/plain_language.json`;
     - **Batch 3:** `src/locales/en.json`;
     - **Fixes commits (Step 2a):** only that batch's fixed data files and
       `review-batch<N>-fixes.md`. `worklist-bookkeeping-batch<N>.json` goes in the
       English commit.
   - **Commit and push.** Commit with `plainsmall: batch <N> English — <areas>`. Push,
     then check that `git rev-parse HEAD` equals `git ls-remote origin feat/plainsmall`
     (memory `git-push-silently-noop`). Do **not** open the PR.
   - **Report to the user:**
     - the review file paths;
     - the before/after counts;
     - the residual units;
     - the reviewer's findings, and any fact flag;
     - for Batch 1, the Part 1 baseline table and calibration result;
     - the URLs from Step 7.
   - **Give the paste-in command for the next window:**
     - after Batches 1–2:
       `/implement plainsmall — Batch <N+1>. Batch <N> English is approved<, with these rulings: …>.`
     - after Batch 3: set `status: english-done` and the INDEX row to *English shipped*.
       Then give
       `/implement plainsmall — Phase 2. All three English batches are approved. Run only Phase 2.`

   **→ STOP after each batch.** On resume, put the user's rulings into "Style rulings" and
   their verdict into "Batch progress" *before* the next batch's Step 2. If the user asked
   for changes to a batch already built, make them, re-run Steps 4–6 for that batch, and
   amend its review file.

**→ STOP. After Batch 3, `/implement` ends its turn and waits.** Nothing below runs until
the user confirms all three batches.

### Phase 2 — Every other locale

**Scope:**
- **The prose overlays:** the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it,
  hi, ar) on five topics, `after-school`, `international-travel`, `summer-programs`,
  `learning-support` and `high-school-placement`.
- **The chrome catalogs:** the five en.json keys in the nine non-English catalogs of
  `TRANSLATED`: `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json`.
- **Not in scope:** no content overlay and no `metric-values`.

For the mechanism, see `.claude/docs/prose-translation-architecture.md`. The precedent is
the plainclubs Phase 2 note. The locale traps in those docs apply unchanged:
- figures are copied char-for-char, `%` unspaced, cents kept (`$70.00`);
- lakh/crore regrouping and RTL isolates are render-layer, never typed into `t`;
- searchable identifiers stay Latin;
- `fr` identifiers are guarded by `check:fr`.

Four traps are specific to this plan:

- **Names follow the reviewed predecessor.** Where it kept a program, portal, partner or
  destination name in English (`Extended Day`, `Winterim`, `UltraCamp`, `Upper School`),
  keep it. Where it translated a descriptive name, keep that translation.
- **Bold spans and dates carry over.**
  - Every `**` pair in the English is in the `t`, the same count.
  - Day-first "1 May" and the a.m./p.m. times translate as the predecessor did (see
    `src/data/overlays/NOTES.md` "Dates and session labels"), digits unchanged.
- **The NOT STATED and accepted-vs-enrolled lines carry over.** A translation that turns an
  unpublished service into "not offered", or "accepted" into "enrolled", fails review even
  when every figure matches.
- **Chrome labels are short.** The tab labels must still fit the tab row at 320px. Revise
  the reviewed predecessor: for example es "Atención y funciones ejecutivas" → "Atención y
  planificación (funciones ejecutivas)", and "ADMISIÓN ≠ MATRÍCULA" → the locale's
  "accepted ≠ enrolled". Keep `≠`, and keep "D1" Latin.

Steps:

1. **Snapshot the base work files** before splicing. For each topic and locale, run
   `git show main:src/data/overlays/work/<topic>.<lang>.json` into the session scratchpad.
2. **Splice.** For each locale and topic, run
   `node scripts/i18n_splice_work.mjs --lang <code> --topic <topic>`. Expect *added* ≈
   *dropped* ≈ the final `check:live` stale count per topic. The exception is the two
   appended `verify` flags (after-school +1, summer-programs +1). Verify flags are
   extracted, so each is an *added* unit with no dropped predecessor. Translate them
   fresh from the English, since they have no reviewed `t`. If any other count is
   lopsided, stop and investigate.
3. **Translate each *added* unit as a revision of its reviewed predecessor.**
   - **Pairing.** Pair each added unit with the dropped unit at the same `at` path. Give
     the translator the old English, the old `t` and the new English.
   - **The instruction.** Revise the reviewed translation to say what the new English
     says. Keep terminology, register, date forms and reviewed choices wherever the
     meaning is unchanged. Split where the English now splits.
   - **The key.** The final `t` is keyed to the **new stamp**, never to an index.
   - **Subagents.** Run three `general-purpose` subagents of three locales each, each in
     its own scratch subdirectory, reading only its task file and writing only its own
     output (memory `parallel-locale-agents-collide`).
   - **The gate.** A scratch apply script gates every output before writing it. Reuse the
     plainclubs gate:
     - the numeric-token multiset against the new English;
     - the money/percent/year/`N+` multiset;
     - the `**` count equal to the English and no single `*`;
     - the ` · ` count;
     - no bidi controls and no non-Western digits;
     - `t` ≠ English (except where the predecessor kept English), and a 0.4–2.5 length
       ratio;
     - no English month or weekday name outside a quote the English also quotes;
     - a wrong-script scan (the Bangla danda is the known false positive);
     - no `[[` added.
4. **Chrome.** Edit the five values in each of the nine catalogs, as revisions of their
   reviewed values. Then `node -e` diff each catalog against `main`: exactly five values
   changed, and keys are unchanged.
5. **Rebuild** each overlay with `node scripts/i18n_build_overlay.mjs --topic <topic> --lang <code>`.
6. **Verify by stamp.** Run `check_work_integrity`, which reports false "violations" after
   a splice (memory `comparerows-shipped`). Then prove against the snapshot: every kept
   stamp has `text` and `t` byte-identical, and every new stamp is non-blank.
7. **Run the Phase 2 checks** (Verification below). Then:
   - fill in Implementation notes;
   - set `status: implemented` and `prs: [<n>]`, and the INDEX row to *Implemented* with
     the PR link;
   - open the PR with `--body-file`. The body has per-area counts, links to the review
     files, the reviewer findings, the Part 1 baseline, and the guard calibration;
   - squash-merge (pre-authorized), then `git checkout main && git pull`.

   **Do not deploy.** Report "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/lib/flagVisibility.ts` | **new**: `DEV_ONLY_FLAG_KINDS`, `HIDDEN_FLAG_KINDS`, `renderedFlags`, `isParentFacingFlag` |
| `src/lib/toVerify.ts` | edit: `visibleFlags(topic, flags)` delegates to `flagVisibility.ts`; doc comment |
| `src/components/{AfterSchool,CollegeSupport,SummerPrograms,HighSchoolPlacement,ClubsProgram}.tsx` | edit: `visibleFlags('<topic>', flags)`; Clubs' literal filter removed; comments. No render change |
| `scripts/check_plain_language.mjs` | edit: topic-aware hidden-flag skip in `proseUnits`; header comment |
| `scripts/check_plain_language.test.mjs` | edit: tests A–F |
| `scripts/check_flag_visibility.mjs` | **new**: the drift guard |
| `scripts/plain_review.mjs` | edit: default hidden-flag worklist skip; `--small-markers` (new classes in (h), guard (n)); header comment |
| `package.json` | edit: `check:flags` script; chained into `build` |
| `src/data/afterSchoolPrograms/*.ts` (12) | edit: 38 worklist sites (2 in the fixes commit) + 7 off-worklist bookkeeping units; 1 appended `verify` flag (CCD `dayInside.flags`) |
| `src/data/internationalTravel/*.ts` (6) | edit: 27 worklist sites |
| `src/data/summer/*.ts` (10 of 12) | edit: 19 worklist sites (1 in the fixes commit) + 1 off-worklist bookkeeping unit; 1 appended `verify` flag (Prep `costPlanner.flags`) |
| `scripts/plain_language.json` | edit (Batch 2): `centred` / `centring` in `spelling.map` only |
| `src/data/learningSupport/*.ts` (4 of 5) | edit: 10 worklist sites |
| `src/data/highSchoolPlacementPrograms/*.ts` (2) | edit: 3 worklist sites |
| `src/locales/en.json` | edit: 5 values |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2): the same 5 values |
| `src/data/overlays/work/{after-school,international-travel,summer-programs,learning-support,high-school-placement}.{9 locales}.json` | edit (Phase 2): spliced and translated |
| `src/data/overlays/{same topics}.{9 locales}.json` | edit (Phase 2): rebuilt |
| `.claude/plans/plainsmall-data/worklist-*.json` (incl. `worklist-bookkeeping-batch{1,3}.json`), `review-batch*.md` (incl. `review-batch{1,3}-fixes.md`) | new |
| `CLAUDE.md` | edit: in "Plain-language standard" → Scope, the dev-only list gains "flag kinds `src/lib/flagVisibility.ts` marks hidden (Student Clubs GAP/COUNT)", and one sentence names `npm run check:flags` |
| `.claude/plans/plainsmall.md`, `.claude/plans/INDEX.md` | edit: progress, rulings, notes, status |
| `.claude/docs/DATA-SCHEMA.md` | only if `check:schema` drifts (not expected) |

No skill or slash command changes, so `.claude/SKILLS.md` is not touched.

## Verification

### Phase 1 — English (per batch)

- [ ] **Part 1 (Batch 1):**
  - `npm run test:plain` passes, with tests A–F added;
  - `npm run check:flags` exits 0, and each negative fixture in F fails with its own
    message;
  - `npm run check:plain` shows student-clubs **Flagged 0**, and every other area is
    identical to the Context table. The full table is recorded in Implementation notes;
  - the clubs hook loop reports 0;
  - `plain_review.mjs --dir src/data/clubsPrograms --layers --worklist` without
    `--skip-flag-kinds` lists no hidden flag;
  - the clubs, After School and College Support flag chips render as on `main` (Step 7).
- [ ] **Hook loop:** `for f in src/data/<batch dirs>/*.ts [src/locales/en.json]; do node scripts/check_plain_language.mjs --file $f; done`.
  Every remaining issue is in a later batch's area. After Batch 3, 0 remain.
- [ ] **Guards:** `node scripts/plain_review.mjs --dir src/data/<dir> --allow … --md-paths '^$' --small-markers --check`
  exits 0 for each area. Every row is `hook: pass`.
- [ ] **Batch 1 tooling:**
  - each negative test failed on its planted fault with the right class and `slug:path`,
    and the file was restored `cmp`-clean;
  - the five calibration runs are recorded, and the without-flag results match;
  - the default-mode diff is empty;
  - the worktrees are removed.
- [ ] **Stray edits:** `git diff --name-only main -- src/` lists only the expected files
  (Step 4).
- [ ] **Fixes (Batches 1 and 3):**
  - the fixes commit holds only its named units and the appended verify flags;
  - no existing `flags[N]` moved;
  - `review-batch<N>-fixes.md` records before, after and evidence;
  - the verify chip shows on `npm run dev` and is absent on `vite preview`.
- [ ] **Bookkeeping:** the `BOOKKEEPING_RE` sweep returns no hit in the batch's dirs, and
  every "Bookkeeping fixes" unit matches its Treatment.
- [ ] **Spelling (Batch 2):** `check:spelling` passes, and its "centred" negative test
  failed as expected.
- [ ] **Bold and lists:**
  - every `**` count is unchanged;
  - no single `*` remains in a rewritten unit, and `*Focus*` is gone;
  - every new `·` run holds every item of the list it replaced, in order.
- [ ] **Residuals:** every after-grade >10 row is listed in "Residual units above grade
  10".
- [ ] **Near-repeats:** they read identically at every site, across batches and areas;
  off-worklist shared clauses are byte-identical.
- [ ] **Independent review:** done, and its findings fixed and recorded.
- [ ] **Build and checks:**
  - `npx tsc -b` is clean and `npx vite build` succeeds;
  - the Step 6 list is green;
  - the `check:live` stale counts are recorded, and cover only this plan's topics.
- [ ] **Browser:** the Step 7 items for this batch.
- [ ] **After Batch 3:** `npm run check:plain` shows:
  - after-school, international-travel, summer-programs, learning-support and
    high-school-placement **Flagged 0** and chrome **Flagged 0** (baselines 29, 22, 13,
    8, 2 and 5);
  - Grade >10 in each of those areas equal to the residuals plus the off-worklist units
    under 30 words above grade 10;
  - every other area unchanged from the Part 1 baseline.

### Phase 2 — Locales

- [ ] **Resolution.** `npm run check:live && npm run check:runtime`: clean.
- [ ] **Digits.** `npm run check:digits`: no finding on a rewritten unit.
- [ ] **Figures and separators, per locale.** `npm run check:sepdrift -- --lang <code>`
  and `python3 scripts/check_figures.py --topic <topic> --lang <code>`, for each of the
  five topics.
- [ ] **Locale checks.** `npm run check:dates`, `check:moneytext`, `check:currency`,
  `check:fr`, `check:hi`, `check:fa`, `check:bidi`, `check:chrome`. Then
  `node scripts/check_work_integrity.mjs`, followed by the by-stamp proof (Phase 2 Step
  6).
- [ ] **Leaks.** `npm run i18n:leaks -- --lang <code>`: no flag on a rewritten path. It
  prints `at` paths, not stamps, so match its flags against the worklist paths (memory
  `plainadmissions-shipped`).
- [ ] **Build.** `npm run build`: green end to end, including `check:flags`.
- [ ] **Render audit.** `npm run build && npx vite preview`, then
  `npm run audit:daterender -- --lang es --lang fa --lang hi` (9+ minutes) and
  `npm run audit:moneyrender`. There is no new finding in these five sections compared
  with `main`.
- [ ] **Browser.**
  - **Pages:** one After School school (providence-day), one Global Exposure school
    (charlotte-latin), one Summer school (trinity-episcopal), one LS school
    (charlotte-country-day) and one HSP school (trinity-episcopal), in `es`, `fa` and `hi`
    (`?lang=`), with every card open.
  - **Checks on those pages:**
    - every rewritten unit is in the locale;
    - names and figures are intact;
    - `**` renders bold, with no stray `*`;
    - ranges read correctly in RTL (strip bidi isolates before probing; memory
      `ccdprofile-shipped`);
    - the LS tabs fit at 320px.
  - **Compare** (`/compare/?topic=college-support` and `?topic=sports`) shows the two
    revised row labels in each of the three locales.

## Risks

| Risk | Mitigation |
|---|---|
| The component refactor changes what a flags block renders | Rendering is identical for every existing kind (Context); Step 7 compares chips against `main` on clubs, After School and College Support |
| A component later hard-codes a flag filter, and the checker goes blind to it | `check:flags` rules 1–3, in the build |
| A hidden kind is renamed or removed from its union, leaving a dead skip entry | `check:flags` rule 4 |
| The skip catches a non-flag `kind` field (HSP `steps[].kind`, Arts `season[].kind`) | The skip is scoped to `…flags[N]` objects; test C |
| Moving `**` or editing a bold span changes emphasis or ships literal asterisks | Guard (l) with `--md-paths '^$'`; "keep each bold span's words"; browser check |
| A cost-model detail drifts (per-week → per-month; included → extra) | EXTRA / FREE / COVERED / NOTCOVERED / BOUND classes; (b), (m); item 10; reviewer |
| Not-published becomes "not offered" (LS NOT STATED, After School gaps) | UNPUBLISHED / NOTFOUND / SCOPE classes; item 5; reviewer |
| Third-party or estimated figures read as the school's | THIRDPARTY / ESTIMATE / DERIVED / CLAIM classes; item 7 |
| Accepted becomes enrolled (HSP) | ACCEPTED / ENROLLED classes; item 13; the planted-fault test |
| A trip cost or date is added (Global Exposure) | Item 12; (g), (m); reviewer |
| A chrome rewording reorders a Compare row | `metrics.ts` labels untouched; Step 7 position check |
| A tab label wraps badly | 320px check in Phase 1 and Phase 2 |
| New classes false-positive and block legitimate rewrites | Calibrated on the five approved areas; loosen only with a recorded reason |

## Open questions

- **`metrics.matriculation` wording.** **Default:** "D1 / Top-College Enrollment", which
  keeps the meaning. Alternative: "D1 / Top-College Commitments", which describes 25 of
  the 28 docs behind the row better. The user picks at the Batch 3 review.
- **The Cannon fact-fix wording** ("largest fully priced enrichment catalog on this
  site"). **Default:** as in Decisions. An alternative that keeps the word "deepest" is
  "the deepest fully priced catalog". It is shown at the Batch 1 review.
- **Words outside the jargon list** ("slate", "ancillary", "envelope", "interlock",
  "decompression", "psychoeducational", "pro-rate", "centred"). **Default:** fix them only
  inside worklist units, and list them in Implementation notes as candidates for
  `plain_language.json`. Do not edit that file.

## Residual units above grade 10

*Filled in by `/implement`: path, after-grade, reason.*

| Path | After-grade | Reason |
|---|--:|---|
| — | — | **Batch 1: none.** All 47 changed After School units are at grade ≤10, and the 2 fixes-commit units too. |
| GE davidson-day `lead.strong` | 10.8 | AFAR's own expansion, "the American Foreign Academic Research archaeology field school" (the file's wording, kept), plus the place names. Every sentence is ≤15 words. |
| GE davidson-day `network.conferences[0].text` | 10.3 | A `·` list of conference and place names (Mount Royal University, Coronado Springs Resort, Friedberg). Per the Unit note, only the lead was shortened. |

## Implementation notes

*Filled in by `/implement`, one section per batch, then Phase 2. Batch 1 opens with the
Part 1 baseline table (`npm run check:plain`, per area) and the calibration results.*

### Batch 1 — Part 1, the checker fix (2026-11-10, `68cf86e6`)

**Built as designed.** `src/lib/flagVisibility.ts` holds `DEV_ONLY_FLAG_KINDS` and
`HIDDEN_FLAG_KINDS`. `toVerify.ts` `visibleFlags(topic, flags)` delegates to it, and the
five components pass their topic slug. `check_plain_language.mjs` gained
`hiddenFlagPredicate()`, passed into `proseUnits()` as an optional 4th argument, so the
walk is unchanged without it. `plain_review.mjs` worklists leave the topic's hidden kinds
out by default. `scripts/check_flag_visibility.mjs` is `npm run check:flags`, chained after
`check:spelling`. CLAUDE.md's plain-language Scope paragraph names the module and the
check.

**Proof.**
- **Tests:** `npm run test:plain` 32/32 (26 before; tests A–F added). With
  `HIDDEN_FLAG_KINDS` emptied for one run, A, D and E fail, as they should. F's six
  fixtures each fail with their own message.
  - One fixture lesson: a report test needs **two different texts**, because `--report`
    de-duplicates units by text. With one shared text, E passed vacuously.
  - Flags must sit **under a card** in a fixture, since `*.flags[].kind` is a pinned
    non-prose path only below a prefix.
- **Default skip:** with the hidden list emptied, `plain_review --dir clubsPrograms --layers
  --worklist` lists 22 hidden flags. With it restored, 0.
- **`check:flags`:** "5 flag-rendering component(s), 5 visibleFlags() call(s)".
- **Rendering unchanged:** `vite preview` vs the live site (= `main`), on 8 pages, gave the
  same flag chips: Clubs PD/Cannon/Christian/CCD (1 NOT-A-CLUB chip each), After School
  CCD 5 and Covenant 2, College Support PD 3, Summer Covenant 3. On `vite` dev, Davidson
  Day After School still shows its 2 TO VERIFY chips, and Clubs still shows no GAP or
  COUNT chip.
- **Clubs hook loop:** 0 issues (was 20, all on hidden flags).

**`npm run check:plain` baseline after Part 1** (every row but student-clubs is identical
to the Context table):

| Area | Prose units | Flagged | Jargon | >30-word sentence | Grade >10 | Grade >12 |
|---|--:|--:|--:|--:|--:|--:|
| admissions | 1353 | 0 | 0 | 0 | 0 | 0 |
| sports | 1307 | 79 | 0 | 70 | 85 | 46 |
| the-arts | 1280 | 0 | 0 | 0 | 0 | 0 |
| **student-clubs** | **1030** (was 1063) | **0** (was 16) | 0 | **0** (was 10) | **0** (was 19) | **0** (was 10) |
| college-support | 2042 | 0 | 0 | 0 | 8 | 0 |
| after-school | 1097 | 29 | 3 | 21 | 33 | 19 |
| high-school-placement | 131 | 2 | 0 | 2 | 3 | 1 |
| summer-programs | 1590 | 13 | 0 | 12 | 17 | 8 |
| international-travel | 1296 | 22 | 1 | 16 | 26 | 18 |
| learning-support | 630 | 8 | 2 | 3 | 8 | 5 |
| course-offerings | 3173 | 95 | 37 | 46 | 68 | 58 |
| financial-aid-report | 966 | 0 | 0 | 0 | 0 | 0 |
| metric-values | 902 | 37 | 7 | 26 | 51 | 19 |
| chrome | 803 | 5 | 5 | 0 | 1 | 0 |
| financial-aid-tuition | 45 | 2 | 0 | 2 | 4 | 2 |
| **Total** | **17645** | **292** | 55 | 198 | 304 | 176 |

**One consequence not spelled out in the plan.** `check:spelling` reads units through the
same loader, so hidden clubs flags now leave the spelling gate too, as `verify` flags
always have. It is the same definition of parent-facing prose. All 33 hidden flags pass
spelling today (`check:spelling`: 0 British forms in 17,600 units).

### Batch 1 — tooling: `--small-markers` (2026-11-10)

**Classes as built** (Step 1e, then narrowed by calibration; each narrowing is commented
in the script):
- `EXTRA` drops bare "paid" ("paid in full" is a payment rule).
- The borrowed aid `COVERED` / `NOTCOVERED` are **replaced** by narrow `INCLUDED` and
  `EXCLUDED`. "includes" / "covers" fire on lists and tables outside Financial Aid: 25+
  approved College Support hits. `EXCLUDED` also counts "leaves out", "left out", "not
  counted", "omit…" and "absent".
- `DOCUMENTATION` drops bare "documented", which means "on record" in Clubs and Arts.
- `ENROLLED` drops "attend", and limits "went to" to "went (on) to … schools". Faculty
  "attend" conferences; awards "went to other schools".
- `ACCEPTED` adds "got into" and "offer(s) of admission".
- `STALE` gained "archived?", "saved copy/copies" and "old page(s)" for the bookkeeping
  rewrites.

**Negative tests (8):** STALE, GATED, EXTRA, CAPACITY, FREE, DERIVED, (n) and (l). Each
exited 1 naming its class and `slug:path`, and each file was restored `cmp`-clean. Two
fault choices had to move:
- **EXTRA's planted fault was inside a school quote** (Trinity "for an additional fee"),
  and Trinity's "**paid** … add-ons" kept the class present. It moved to Cannon
  "fee-bearing".
- **CAPACITY's Carmel unit also says "now full"**, so the class stayed present (the guard
  tracks presence, not counts). It moved to Carmel `cost.fees[7]` "first-come".

**Calibration** (worktrees at each merge; the new `plain_review.mjs` and
`src/lib/flagVisibility.ts` copied in, then removed):

| Area | Without `--small-markers` | With | New (h) | New (n) |
|---|--:|--:|--:|--:|
| College Support | 3 (matches) | 33 | 21 | 9 |
| Admissions | 16 (matches) | 30 | 8 | 6 |
| Financial Aid | 2 (matches) | 15 | 3 | 10 |
| The Arts | 0 (matches) | 3 | 3 | 0 |
| Student Clubs | 295 (the #479 club-list rebuild and its structural changes) | 297 | 2 | 0 |

- **Every remaining hit was read; none is a past slip.**
  - The (n) hits are College, Admissions and Aid splits made before guard (n) existed.
  - Most (h) hits are borrowed classes (CLAIM, VERIFIED, ONLY, FIRST, DERIVED, BOUND,
    THIRDPARTY) in plans written before those classes existed.
  - The rest are approved synonym swaps: "verifiable" → "can check", "attested" →
    "appear", "excluded" → "leaves out", "attend" → "went to". The four that looked like
    slips (Latin `scholarshipsNote`, PD `edge.headline`, Cannon `mechanicsNote`, PD
    clubs `affinity.leadership`) were read in full: all are synonyms.
- **Default mode is unchanged:** the old and new script on the Arts row give identical
  `--out` files (157 lines, 0 diff lines).

### Batch 1 — After School English (2026-11-10)

**Fixes commit `dcebb7f2`** (Step 2a), as the plan describes:
- the Cannon fact fix, with the catalog counts re-measured the same day;
- the CCD UltraCamp move, with its verify flag appended at `dayInside.flags[4]`.

Guards without `--check` gave exactly the 4 expected hits ((n) "six"; (f) ×2 for the new
flag's leaves; (l) the bold moving with it). Evidence is in
[review-batch1-fixes.md](plainsmall-data/review-batch1-fixes.md). The reviewer later
corrected one fact there: Latin's 27 grade labels are all `'LS'`.

**Worklist:** 36, as predicted (38 − Cannon − CCD). The bookkeeping allow file
(`worklist-bookkeeping-batch1.json`) grew from 7 to 11 units:
- +1 restoring a near-repeat: CCD `dayInside.flags[0]` keeps the lead "The enrichment
  catalog is invisible to prospective families", shared with `verdict.watchouts[6]`;
- +3 bookkeeping lines the reviewer found and the sweep missed: CCD
  `verdict.watchouts[6]`, Davidson Day `coverage.flags[1]` and `[2]`.

That made **47 rows** in `review-batch1.md`, all `hook: pass`, 0 above grade 10, and
`--check` exits 0. The After School hook loop reports **0 issues** (29 flagged units
before).

**Deviations from the plan's wording, each forced by a guard class or a reviewer
finding:**
- **"saved 2020 copy" misses the STALE pattern** (the year splits "saved copy"). Davidson
  Day now reads "a saved copy of a 2020 page" / "a saved copy of the school's 2020 page".
  **Batch 3 (Hickory Grove Summer): use "saved copy/copies of …", never "saved 2020 copy".**
- **Davidson Day `dayInside.flags[0]` keeps VERIFIED** as "the school has not confirmed
  any of it for 2026-27". The plan's "has not published" would swap VERIFIED for
  UNPUBLISHED.
- **Davidson Day `coverage.facts[1]`:** "unconfirmed for 2026-27" became "so it may have
  changed for 2026-27" (the drafter), then "a saved copy of the school's 2020 page"
  (the reviewer).
- **Davidson Day `verdict.watchouts[6]`:** "no source, old or new, names…" read as
  not-published. It now follows plainclubs' not-found form ("…appears in any source, old
  or new").
- **Providence Day `cost.flags[0]`** keeps VERIFIED: "The school has not confirmed that
  number, so ask how many months it bills."
- **Charlotte Latin `cost.flags[1]`:** "ancillary" → "other", not "extra", since "extra
  fee" would add the EXTRA class.

**Checks:**
- **Build:** `npx tsc -b` and `npx vite build` are clean.
- **Step 6 list:** all green. That is `check:schema`, `check:spelling`, `check:flags`,
  `check:travelrows`, `check:matrices`, `check:schoolurls`, `check:chrome`,
  `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`, `check:photos` and
  `test:plain`.
- **`check:live`:** **49 stale `after-school` stamps per locale**, and no other topic.
  This is Phase 2's input. (First recorded as 40: `check:live` caps its display, and the
  count was read off the display. `--verbose` gives the true total. Corrected in Batch 2.)

**Browser** (headed Chrome, `vite preview`, `?topic=after-school&lang=en`, every card open):
- **47 of 48 changed units render with their bold** (the 47 rows plus Cannon's fixes-commit
  unit). No literal `*` appears in any After School section. Christian's "Focus" now
  renders plain, and the 390px view shows no overflow.
- **The CCD verify note** shows on `vite` dev and is absent on preview.
- **The one miss is a pre-existing render gap, not a defect of this batch.**
  `AfterSchool.tsx` (~line 760) renders the enrichment catalog **only when
  `dayInside.classes` is non-empty**, and `catalogIntro` sits inside it. So
  `catalogIntro` never renders for **Carmel Christian** ("the 2026-2027 offerings are not
  yet published") or **Gaston Day** ("coming soon"). Both are parent-relevant
  not-published notes that no reader sees.
  - Part 1's field sweep missed this: it looked for field names the component never
    references, not for conditional renders. `check:plain` still counts both units.
  - Showing the intro without a catalog is a component change, so it goes under
    Candidates for the user, not into this diff.
  - **Batch 3:** check Summer's `catalog.intro` for the same pattern before rewriting.

### Batch 1 — the `catalogIntro` render fix (2026-11-10, user approval)

The user approved the component change after the Batch 1 report: "You have my ok on
changing the component".
- **The change.** `AfterSchool.tsx` now renders `dayInside.catalogIntro` as a plain
  `as-note` paragraph when `classes` is empty. Before, it was dropped along with the empty
  catalog. There is no "Enrichment Classes" heading over an empty list, per CLAUDE.md's
  no-empty-shell rule. Schools with classes are unchanged, since the intro still renders
  inside `EnrichmentCatalog`.
- **Browser** (`vite preview`):
  - Carmel Christian and Gaston Day now show their intro in `en`. `es` falls back to
    English for Carmel's rewritten intro until Phase 2; Gaston's shows its old
    translation, which goes stale with the edit below.
  - Neither page draws a catalog table.
  - Cannon and Latin still draw theirs, with the intro inside.
  - Carmel at 390px: `scrollWidth` = `clientWidth` (375).
- **Gaston's intro now renders, so its bookkeeping became parent-facing.** "at the time of
  this research … a genuine absence rather than an un-researched gap" →
  "The school lists enrichment programs as **“coming soon”**, so there is no class catalog
  to show. The section is on the school’s page, but it lists no offerings yet." It is the
  12th unit in `worklist-bookkeeping-batch1.json`, making 48 rows, all `hook: pass`, and
  guards exit 0.
- **Summer checked for the same gap:** no Summer school has an empty `catalog.camps`, so
  `catalog.intro` always renders.
- `check:plain` still counts `catalogIntro` everywhere. It now renders everywhere it is
  set, so the count is right.

### Batch 2 — Global Exposure English (2026-11-10)

**A fixes commit the plan did not expect (`7360b3b5`).** The plan said Batch 2 had none.
Checking the three cross-school verdict claims (Content item 14) found two that the other
files contradict, so they were fixed by the Decisions rule for a new fact problem, in their
own commit before the worklist:
- **Cannon** "something most Charlotte schools do not — a Global Studies Certificate":
  Providence Day and Davidson Day also publish a global credential with its requirements
  (3 of the 6 schools). It now names them. "centred" → "centered" landed here too.
- **Country Day** "stands out for how early … and for sister-school exchanges running
  since 1991": Latin's travel also opens in 6th grade, and its sister schools date to
  1989. What holds is the count: it now says Country Day "publishes the most Middle
  School travel: six experiences from 6th grade". The reviewer re-counted across every
  trip year: Country Day 6, Latin 5, Providence Day 4, Cannon 1.
- **Davidson Day** "unlike any other school's here" was checked and kept.

Evidence is in [review-batch2-fixes.md](plainsmall-data/review-batch2-fixes.md).
Guards without `--check` gave the one expected hit: (h) ONLY added in Cannon.

**Worklist:** 25 (27 − the two fixed units). The bookkeeping sweep (`BOOKKEEPING_RE`)
found 0. A wider first-person sweep found **4 "our count" units** on derived figures.
They follow the Batch 1 "summed by the researcher" precedent: the figure stays visibly
derived, and the first person goes. The 4 are Cannon `stats[2].note` and
`network.cells[2].text`, Charlotte Christian `stats[1].note`, and Providence Day
`stats[0].note`. They are listed in `worklist-bookkeeping-batch2.json`. That made **29
rows** in `review-batch2.md`: all `hook: pass`, and `--check` exits 0. Two rows sit above
grade 10, and both are name-driven (see Residuals). The Global Exposure hook loop
reports **0 issues** (22 flagged units before).

**Spelling:** `centred` / `centring` added to `spelling.map`. `check:spelling` passes. For
the negative test, "centred" was put back in Cannon: it exited 1 naming
`cannon.ts:301 verdict.standsOut.summary`, and the file was restored `cmp`-clean.

**Independent review: 6 findings, all fixed** (see the review file):
- Cannon: "Both build on" assigned language study to the certificate and the trips.
- Cannon: "In 2026" stopped covering the Kimbrough award after the split, and "joined
  that teacher" dropped Finland.
- Christian: "Each trip has a grade band" turned what the packets list into a plain
  fact.
- Country Day: "France and Italy use a lottery" lost its Middle School scope (Upper School
  lists Italy and France trips too).
- Latin: "has seven partners since 1989" read as seven current partners.
- Davidson Day: "All of this sits inside" the distinction overstated it, since the digs
  are optional "beyond" items.

The reviewer judged Latin's "depth of its sister-school network" still true. Providence
Day's 8 partners are individual Round Square exchanges logged 2022–25; Latin's go back to
1989, with hosting both ways.

**Checks:**
- **Build:** `npx tsc -b` and `npx vite build` are clean.
- **Step 6 list:** all green. `test:plain` passes 32/32.
- **`check:live` (`--verbose`, per locale):** **31 stale `international-travel` stamps**
  (29 rows + the 2 fixes) and **49 `after-school`**. No other topic.
- **Browser** (headed Chrome, `vite preview`, `?topic=international-travel&lang=en`, every
  card open):
  - **31 of 31 changed units render**, with 0 literal `*` in any section.
  - Providence Day's collapsed teaser shows the new `trips.headline`.
  - Latin at 390px: `scrollWidth` = `clientWidth` (390).

### Candidates noticed, not acted on
- **`scripts/plain_language.json` jargon candidates** seen in Batch 1: "orphaned" (Cannon's
  "orphaned backup URL", kept because the clause is shared byte-identically) and
  "opacity" (Davidson Day's bold "Total pricing opacity.", kept as a bold span).
- **A hardcoded English string in `AfterSchool.tsx`** (~line 705): "No classes match — try
  clearing the search or filters." is bare JSX, so it renders in English in every locale.
  Moving it to a `src/locales` key is a separate i18n fix.
- **Other hardcoded hint:** `EnrichmentCatalog`'s `'— illustrative catalog'` heading hint is
  also bare English (it shows only when `catalogEstimated` is set).
- **Batch 2, Global Exposure:**
  - Cannon's `trips.sources` label "Travel Abroad (Wayback, Dec 2019)" is a citation
    label, outside the prose units. It is the bookkeeping word the rule targets, if
    source labels ever count as prose.
  - Country Day's `start.intro.strong` "…discuss the world beyond our borders" is the
    school's own voice, unquoted (a detached school description).
  - Jargon candidates for `plain_language.json`: "oversubscribed" (rewritten in Country
    Day and Latin) and "inaugural" (kept in Cannon, because "first" would enter FIRST).
