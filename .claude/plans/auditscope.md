---
name: auditscope
title: Browser audits visit only what a change touched, through card deep links, with an automatic full sweep when render code changed
status: implemented
phases: 1
created: 2026-11-15
branch: feat/auditscope
prs: [500]
---

# Scoped browser audits

## Goal

`audit:daterender`, `audit:moneyrender` and `audit:mobile` today load every school page,
every Compare topic and every admissions checklist band, in every locale they cover. They
open every card and scan the whole page. The trinitycamps Phase 2 run of `audit:daterender`
was still going at 33 minutes. It was stopped, and a scan of the one changed section
replaced it in about a minute.

After this change, each audit by default visits only the cards a branch changed against
`main`. It opens each card through its deep link (`/school/<slug>/#<area name>/<card name>`)
and scans just that card. When a change touches render code (components, `format.ts`, CSS,
locale catalogs), the audit **switches itself to the full sweep** and says why. `--all`
forces the full sweep at any time.

We'll know it worked by checking that:

- a data-only or translation-only change audits in about 1-2 minutes instead of about 60;
- a planted defect inside the scope is still found;
- a component change triggers the full sweep without anyone passing a flag.

## Context

**The three audits share one shape** (all in `scripts/`, none in `npm run build`; each needs
`npm run build && npx vite preview`):

| Script | npm | Default locales | What it visits per locale |
|---|---|---|---|
| `audit_date_render.mjs` | `audit:daterender` | all 9 `PROSE_TRANSLATED` | 13 school pages, 5 Compare topics, 13 × 9 checklist bands |
| `audit_money_render.mjs` | `audit:moneyrender` | `es`, `fr` | same three loops |
| `audit_mobile_layout.mjs` | `audit:mobile` | `en` | 13 school pages × 3 widths (320/360/390) |

Each school-page visit:

1. `goto(..., {waitUntil:'domcontentloaded'})`, then a fixed 2.5 s wait.
2. A 30-40-step wheel or scroll loop.
3. Every `<details>` forced open.
4. A harvest over `document.body`, plus every title and aria-label.
5. A click on each `.adm-band` tab, re-harvesting after each.

`daterender` and `moneyrender` share `COMPARE_TOPICS = ['financial-aid-tuition',
'admissions', 'after-school', 'summer-programs', 'college-support']` and `BANDS` (9 values),
and both take `--base <server URL>` (note: **`--base` is already the server URL**, so the git
ref flag must be named differently). `audit:mobile` already has `--only <slugs>` and
`--widths`.

**Card deep links exist and are machine-mappable** (PRs #493-#497):

- Every top-level research card is a `<details class="note-card">` whose `id` is
  `<area link>/<card link>` and whose **`data-card` is `<topic>:<card key>`**
  (`src/pages/SchoolDetail.tsx`, e.g. lines 1475 `sports:${card.key}`, 1638
  `after-school:${card.key}`, 1682 `summer-programs:${card.key}`). For a structured card,
  the card key **is the top-level field of the school's data module**. For example, Trinity's
  `catalog` → `summer-programs:catalog`, and `dayInside` → `after-school:dayInside`.
- Prose (notes) cards use `data-card={`${t.slug}:${g.metric.key}`}` (line 1217), and Course
  Offerings uses `course-offerings:${linkName(titleEn)}` (line 1445).
- Sections are `<section class="topic-section" id="topic-<topic slug>">`.
- `scripts/card_link_names.json` (the `check:cardlink` snapshot, kept current by the build)
  maps:
  - `area:<topic>` → the area link (`area:international-travel` → `global-exposure`);
  - `card:<topic>:<key>` (with `@<slug>` per-school variants) → the card link. For example,
    `card:after-school:dayInside` → `a-day-inside-enrichment`.

  An audit can therefore build `#<area>/<card>` from a data key without importing any React
  code.
- `openFromHash` (`src/lib/cardLink.ts`) scrolls to and opens the linked card once research
  renders. An area-only hash (`#summer-programs`) lands on the section.
  `scripts/audit_card_links.mjs` already waits for render the right way:
  `waitForFunction(() => !document.querySelector('.topic-section .loading'))` and then a
  settle. That replaces the fixed wait and the scroll loop.

**What a "changed location" is, measured on real data:**

- Work and overlay files (`src/data/overlays/work/<topic>.<lang>.json`, and the built
  `src/data/overlays/<topic>.<lang>.json`) list every string as `{text, of, at, t}`. Each
  `at` entry is `<slug>:<path>`, e.g. `trinity-episcopal:catalog.camps[46].hours`, so its
  first path segment is the card key.
- A scan of every `es` work file: for 10 of 13 topics, the first segment matches a
  `card:<topic>:<key>` entry. The unmapped ones are:
  - `lead` and `stats` (area header) in international-travel and learning-support;
  - `clusters` and `catalog` in student-clubs (the two extra-layer cards);
  - all of course-offerings and financial-aid-report;
  - metric-values, whose `at` is `providence-day:[<index>]…`, an index into `VALUE_METRICS`.
    `quals.<slug>` inside it names a school.

  These fall back to the whole area (Decisions).
- English-side changes to **non-extracted** fields (prices, hours, camp names) never reach a
  work file, so the work-file diff alone misses them. Diffing the data **modules**, by
  importing the base and head versions, catches every field.
- Per-school modules are `src/data/<dir>/<slug>.ts`, with `dir` from `TOPICS` in
  `scripts/i18n_topics.mjs` (e.g. `summer-programs` → `summer`), and export the name in
  `EXPORTS`. They import only types, and plain Node imports them (`i18n_topics.mjs` header).
  `ACCESSORS` and `EXTRA_LAYERS` name the single-module accessors (`courseOfferings(slug)`,
  `financialAidReport(slug)`, `clubClusters(slug)`, `clubCatalog(slug)`, `VALUE_METRICS`).
  These import from `src/lib/`, so a base copy must include `src/lib` too.
- `SchoolDetail.tsx` renders metric tiles through `valueMetricsForTopic`
  (`src/data/metricValues.ts`). A metric change therefore shows on that topic's area on
  school pages **and** on that Compare topic.
- Compare renders area data directly: `CompareSummerRows` reads `summerProgram`, and Sports,
  Arts, Course and Clubs rows read their modules. A change to a topic in an audit's
  `COMPARE_TOPICS` therefore also visits that Compare topic.
- `src/pages/AdmissionsChecklist.tsx` reads `admissionsProgram`. An admissions change
  therefore also visits that school's checklist bands.

**How often scoping applies:** of the last 40 commits on `main` that touched `src/`, about 25
changed only `src/data/**`, `src/content/**` or overlays. Those would run scoped. The rest
touched components, `src/lib` or `src/locales` and would correctly fall back to the full
sweep.

## Decisions

- **Scoped is the default; `--all` forces the full sweep.** The user chose this on
  2026-11-15.
- **The fallback to a full sweep is automatic, never a flag someone must remember.** Any
  changed path in the render-code list below forces it, and so does any `src/` path the
  scope table does not recognize. The run prints which path caused it. A scoped run that
  silently skips a cross-page render bug would be "a check whose sample doubles as its
  coverage" (CLAUDE.md), which is exactly what these audits exist to catch.
- **Granularity is card-level where the data key maps to a card, and area-level otherwise.**
  It is never page-level, except for a new school or a file that renders outside areas
  (`podcastEpisodes.ts`).
- **The git ref flag is `--since <ref>`, default `main`.** `--base` is already the server URL
  in all three scripts. The base is `git merge-base <since> HEAD`. Uncommitted and untracked
  changes count too, so a run before committing still works.
- **One shared module, `scripts/audit_scope.mjs`, computes the scope.** The three audits
  import it, so the rules live in one place (the same lesson as `i18n_topics.mjs`). It also
  runs standalone (`npm run audit:scope`) to print the scope without opening a browser.
- **The scope is locale-independent:** the union across all locales' work files. A
  translation change in `es` alone still audits that card in every locale the audit covers.
  That costs a little and avoids a per-locale special case.
- **Navigation uses the deep link, and scanning is restricted to the scoped elements.** Per
  school page, the audit loads `/school/<slug>/?lang=<l>#<hash>`:
  - the **card link** when exactly one card is in scope on that page;
  - otherwise the **area link** of the first scoped area.

  It waits for `.topic-section .loading` to clear, then opens and harvests only the scoped
  roots:
  - each `details[data-card="<topic>:<key>"]` and its nested `<details>`;
  - or, for an area-level scope, every `<details>` in `#topic-<topic>`.

  Title and aria-label attributes are read inside those roots only.
- **A scoped key not found on the page widens to its area,** with a printed note (a data
  key that is not a card, or a card that did not render). It is never silently skipped.
- **An empty scope exits 0 and prints "nothing in scope, use --all for a full sweep".** On
  `main` with a clean tree, that is the correct answer.
- **Every visit prints a progress line immediately** (`[12/40] es /school/cannon/
  #sports/the-college-pipeline 4.1s`). The header comment says not to pipe output into
  `tail`. That buffered the whole trinitycamps run and made a slow run look hung.
- **`audit:mobile --only` intersects with the scope.** With `--all`, it means what it means
  today.

### Scope table: changed path → what to visit

Rule order: **render-code → full** first. Otherwise take the union of every matching row.
Any `src/` path matching no row → full.

| Changed path | Visit |
|---|---|
| `src/components/**`, `src/pages/**`, `src/lib/**`, `src/locales/*.json`, any `*.css`, `src/App.tsx`, `src/main.tsx`, `index.html`, `vite.config.*`, `public/**`, `scripts/audit_*.mjs`, `scripts/audit_scope.mjs` | **full** |
| `src/data/<TOPICS dir>/<slug>.ts` | Import base and head and deep-compare each top-level key. A changed key with a `card:<topic>:<key>` entry → that card on `<slug>`. Any other changed key → the `<topic>` area on `<slug>`. A new or deleted file → the area |
| `src/data/{admissions,afterSchool,arts,clubs,sports,summer}Program(s).ts`, `collegeSupport.ts`, `highSchoolPlacement.ts`, `internationalTravel.ts`, `learningSupport.ts` (topic loaders and types) | that topic's area on **every** school that has it |
| `src/data/courseOfferings.ts`, `financialAidReports.ts`, `clubCatalog.ts`, `clubClusters.ts` | per slug, compare `accessor(slug)` base vs head → `course-offerings` / `financial-aid-tuition` / `student-clubs` area on each changed slug |
| `src/data/metricValues.ts` | per `VALUE_METRICS` entry, compare base vs head by `key`. Changed `values[slug]` or `quals[slug]` → that topic's area on that slug. A changed label or a new or removed metric → that topic's area on every school. Always also the Compare page for that topic |
| `src/data/collegeMemberships.ts`, `collegeRankings.ts`, `collegeUrls.ts` | `college-support` area on every school |
| `src/data/wellsFargoCup.ts` | the `sports:cup` card on every school that has one |
| `src/data/artsMatrix.ts` | `the-arts` area on every school |
| `src/data/podcastEpisodes.ts` | the whole page of each school whose episodes changed |
| `src/data/schools.json` | per school and topic, compare the manifest documents → that area on that slug. A **new school** → its whole page, every Compare topic and its checklist |
| `src/content/<topic>/<slug>.json` | the `<topic>` area on `<slug>` |
| `src/data/overlays/work/<topic>.<lang>.json` and `src/data/overlays/<topic>.<lang>.json` | stamps added, removed, or with a changed `t` vs base → each `at` → `<slug>` + first path segment, mapped as for a per-school module. Metric-values `at` → `VALUE_METRICS[index]` (the head file's index for a new stamp, base for a removed one) → that topic on every school, or on `<slug>` for `quals.<slug>` |
| `src/data/brands.ts`, `src/data/highSchools.ts` | **full** (both render on every page) |
| anything outside `src/`, `index.html` and `public/` (docs, plans, `source-material/`, other scripts) | nothing |

Derived visits:

- Any scoped area whose topic is in the audit's own `COMPARE_TOPICS` → that Compare topic
  page.
- Any scoped `admissions` area → that school's checklist bands.
- `audit:mobile` has no Compare or checklist loop, so it ignores both.

## Approvals needed

None. This changes developer scripts only: no card, section, layout or user-facing text.

## Out of scope

- `audit:cardlink` and `audit:pageviews`. Cardlink tests link mechanics, which change with
  render code (a full-sweep case anyway). Pageviews visits a fixed handful of pages. Either
  could adopt `audit_scope.mjs` later.
- Parallel browser workers for the three audits (`audit_card_links.mjs` already has
  `--workers`). A good follow-up, and independent of scoping.
- Per-locale scoping (Decisions: the scope is the union).
- Changing what any audit *detects*. Detectors, exclusions and exit codes stay exactly as
  they are.
- Mapping locale-catalog (chrome key) changes to the cards that use them. A catalog change
  stays a full sweep.

## Steps

Single-phase: adds no user-facing text.

1. **Branch.** `git checkout -b feat/auditscope` from an up-to-date `main`. Set this plan
   and its INDEX row to *In progress*.

2. **Write `scripts/audit_scope.mjs`.** It exports
   `async function resolveScope({ since = 'main', all = false, compareTopics = [] })`. That
   function returns:

   ```js
   {
     full: boolean,
     reasons: string[],   // "src/components/SummerPrograms.tsx → full", or "src/data/summer/trinity-episcopal.ts → summer-programs:catalog"
     pages: [{ slug, whole: boolean, areas: { [topic]: Set<cardKey> | '*' } }],
     compare: Set<topic>,     // already intersected with compareTopics
     checklist: Set<slug>,
     base: '<merge-base sha>',
   }
   ```

   The function works through six steps:
   - **Changed paths:** `git diff --name-only <base>` (committed and uncommitted tracked
     changes) plus `git ls-files --others --exclude-standard`. Apply the scope table in
     Decisions, in rule order.
   - **Base snapshot for module diffs:** `git archive <base> src | tar -x -C
     node_modules/.cache/audit-scope/<base sha>`. Reuse it if the folder exists. `src/lib`
     comes along, so the accessor modules' relative imports resolve. Import each changed
     module from both trees with `await import(pathToFileURL(...))`. Compare with a stable
     JSON stringify (sorted keys) per top-level key, or per accessor result. Data modules
     hold plain data. If an import throws, record `"<path>: could not import base
     (<message>) → area"` and widen to the area. Never crash and never skip.
   - **Overlay and work diffs:** for each changed overlay or work JSON, read the base copy
     with `git show <base>:<path>`, key both sides by `of`, and take every `at` of every
     stamp that was added, removed or changed its `t`. Parse `<slug>:<path>`, take the first
     segment with `path.split(/[.[]/)[0]`, and map it through the
     `card:<topic>:<key>` / `@<slug>` entries of `scripts/card_link_names.json`. Topic
     `financial-aid-report` maps to area `financial-aid-tuition`. Metric-values maps per the
     table.
   - **Card set per topic:** read it from `card_link_names.json` keys
     (`card:<topic>:<key>[@slug]`). Never hardcode it.
   - **Hash per page:** with one scoped card, use the card link: `area:<topic>` + `/` +
     `card:<topic>:<key>@<slug>`, falling back to `card:<topic>:<key>`. Otherwise use
     `area:<topic>` of the first scoped area in `TOPIC_ORDER` order (or simply
     alphabetical; record which). Export `hashFor(page)`.
   - **CLI:** `node scripts/audit_scope.mjs [--since <ref>] [--json]` prints every reason
     line, then a summary (`full sweep` or `N page(s), M card(s), K area(s), compare: …,
     checklist: …`). Exit 0. Add `"audit:scope": "node scripts/audit_scope.mjs"` to
     `package.json`.

   Write the file header in the style of the other audits: why it exists (the 33-minute
   trinitycamps run), the full-sweep triggers, and the rule that an unknown `src/` path
   means full.

3. **Refactor `scripts/audit_date_render.mjs` to use the scope.**
   - **Flags:** add `--all` and `--since <ref>`. Call
     `resolveScope({ since, all, compareTopics: COMPARE_TOPICS })` and print its reasons and
     summary before launching the browser. On an empty, non-full scope, print the hint and
     exit 0.
   - **Full mode:** the current loops, unchanged, plus progress lines.
   - **Scoped mode, school pages:** for each `pages` entry and each locale, `goto` the page
     with `?lang=<l>` and `#<hashFor(page)>`. A `whole` page gets no hash and the current
     full-page handling. Wait with the `audit_card_links.mjs` `settle` pattern (no
     `.topic-section .loading`, then about 1.5 s) instead of the fixed 2.5 s and the wheel
     loop. Resolve roots:
     - for each scoped card, `document.querySelector('details[data-card="<topic>:<key>"]')`;
     - for each area-level topic, `#topic-<topic>`.

     A missing card widens to its area and prints a note. Open `details` inside the roots
     only. Change `harvest()` to take a list of root selectors, walk text nodes and
     title/aria-label attributes under those roots only, and default to `document.body` in
     full mode. Click `.adm-band` tabs only when `admissions` is in scope on that page, and
     only those inside `#topic-admissions`.
   - **Scoped mode, Compare and checklist:** visit only `scope.compare` topics (same URL and
     handling as today) and only `scope.checklist` slugs × `BANDS`.
   - **Progress:** print a line per visit as it happens, with the elapsed seconds, and end
     with the total elapsed time. Update the header's usage block: scoped default, `--all`,
     `--since`, and "do not pipe into tail".

4. **Refactor `scripts/audit_money_render.mjs` the same way.** It shares step 3's
   structure: the same three loops, `openAll`, `harvest`, the `.adm-band` loop. Keep the
   detector unchanged.

5. **Refactor `scripts/audit_mobile_layout.mjs`.**
   - In scoped mode, visit only `scope.pages` (intersected with `--only` when given) at each
     width, through the same deep-link URL and settle.
   - Measure only the scoped sections (`.topic-section` elements whose id is
     `topic-<scoped topic>`). In those sections, open only the scoped cards or the whole
     area. Keep the page-level `doc-overflow` check, which is still meaningful because only
     scoped cards are open.
   - The `[section stat strip]`-style labels stay, restricted to scoped sections. No Compare
     or checklist.

6. **Docs.** In `CLAUDE.md`:
   - In the `audit:daterender` paragraph ("`check:dates` sees only extracted strings…"), the
     `audit:moneyrender` paragraph, and the testing-conventions bullet for `audit:mobile`,
     add one sentence each: the audit now visits only what the branch changed since `main`,
     through card deep links, and falls back to a full sweep on render-code changes.
   - Where `CLAUDE.md` says to run an audit "after adding a render site or a locale", change
     the command to `-- --all`. A new locale or render site is exactly the full-sweep case.
   - Add one line under "Card deep links" saying the audits navigate by them.

   Update each script's header comment (steps 3-5). `.claude/SKILLS.md` needs **no** change,
   since no skill or command changes. Say so in the PR body.

7. **Commit by explicit path** (`scripts/audit_scope.mjs`, the three audit scripts,
   `package.json`, `CLAUDE.md`, the plan and INDEX), push, verify the push
   (`git rev-parse HEAD` vs `git ls-remote origin feat/auditscope`), open the PR with
   `--body-file`, merge with `gh pr merge --squash --delete-branch`, then
   `git checkout main && git pull`. Set the plan to `implemented` with `prs`, and the INDEX
   row to *Implemented*. **Never deploy**: nothing here deploys.

## Files touched

| File | Change |
|---|---|
| `scripts/audit_scope.mjs` | new — scope resolver + CLI |
| `scripts/audit_date_render.mjs` | edit — scoped default, `--all`, `--since`, root-restricted harvest, settle, progress |
| `scripts/audit_money_render.mjs` | edit — same |
| `scripts/audit_mobile_layout.mjs` | edit — scoped pages/sections, `--all`, `--since`, progress |
| `package.json` | add `audit:scope` |
| `CLAUDE.md` | audit paragraphs: scoped default, `--all` for new locale/render site |
| `.claude/plans/auditscope.md`, `.claude/plans/INDEX.md` | status |

## Verification

The fixtures are real history. Commits `b1fa1812` (trinitycamps Phase 1 head, data plus
`SummerPrograms.tsx` already merged earlier on the branch) and `d8cb0462` (Phase 2:
overlay files only) still existed on 2026-11-15 as unreachable objects. If `git cat-file -t`
says they are gone, build equivalent fixtures on a scratch branch: one overlay-only edit,
one data-only edit, one component edit. Use a throwaway worktree for each:
`git worktree add --detach <tmp> <sha>`, then remove it with `git worktree remove` when done.

- [ ] `npx tsc -b` clean, and `npm run build` exits 0. The audits are not in the build, so
      this only proves nothing else broke.
- [ ] **Overlay-only scope:** in a worktree at `d8cb0462`, `node scripts/audit_scope.mjs
      --since b1fa1812` prints a **scoped** result:
      - `trinity-episcopal` with `summer-programs: {catalog, costPlanner}` and
        `after-school: {dayInside}`;
      - compare `{summer-programs, after-school}`;
      - checklist empty.
- [ ] **Render-code fallback:** in a worktree at `919ba591`, `--since 919ba591~1` prints
      **full**, with the reason `src/components/SummerPrograms.tsx → full`. Then in any
      worktree, touch a file under `src/components/`, rerun, and confirm full. That is the
      negative test of the fallback.
- [ ] **Data-only scope with non-extracted fields:** `--since 50ce34ea~1` at `50ce34ea`
      (Charlotte Catholic Sports roster note, data only) scopes `charlotte-catholic` sports
      and the right card or cards, with no other school. Then on a scratch branch, change
      one Trinity camp **price** (a non-extracted field) and confirm the scope includes
      `summer-programs:catalog`. Revert.
- [ ] **Empty scope:** on clean `main`, `npm run audit:scope` and each audit print "nothing
      in scope" and exit 0.
- [ ] **Planted-defect test** (isolate the assertion, per CLAUDE.md):
      1. On a scratch branch, put an English date (`June 29`) into one Trinity camp's `es`
         `t` in `src/data/overlays/work/summer-programs.es.json`.
      2. Run `npm run i18n:build -- --topic summer-programs --lang es`, then
         `npm run build && npx vite preview`, then `npm run audit:daterender -- --lang es`.
         It must exit 1 and name that string.
      3. Revert the work file and rebuild the overlay, diffing it back to clean.
      4. Repeat with a raw `$` figure for `audit:moneyrender -- --lang es`.
- [ ] **Equivalence:** for the d8cb0462 scope, a scoped `audit:daterender` reports exactly
      the findings a `--all` run reports on those same cards (0 and 0 today). Record both
      wall times in the PR. The expectation is about 1-2 minutes scoped against about 60.
- [ ] **`audit:mobile` scoped** on the same fixture passes, and `--only cannon` with that
      scope prints "nothing in scope" (Trinity only).
- [ ] **Deep-link landing:** in scoped runs, each page's progress line shows the hash it
      used, and no "widened to area" note appears for the d8cb0462 scope (all three keys are
      real cards).

## Risks

| Risk | Mitigation |
|---|---|
| A scoped run misses a defect outside the diff and is trusted as clean | Automatic full sweep on render code and on any unrecognized `src/` path; every run prints its reasons; `--all` documented for new locales and render sites |
| A data key maps to no card, or a card does not render | Widen to the area with a printed note, never skip |
| Importing a base module fails (path or Node import quirk) | Widen to the area with a printed reason; the verification exercises real base imports |
| `git archive` snapshot goes stale or collides | Keyed by base SHA under `node_modules/.cache/audit-scope/` |
| Deep-link hash changes after a card rename | Hashes are read from `card_link_names.json`, which `check:cardlink` keeps current in every build |

## Open questions

- **Should a locale-catalog (`src/locales/*.json`) change scope to that locale only,
  instead of a full sweep in every locale?** — **default:** full sweep (Decisions).
  Revisit if chrome-only PRs turn out common enough to matter.

## Implementation notes

Built as planned. Deviations, each small:

- **The base snapshot lives in `os.tmpdir()/audit-scope/<sha>`, not
  `node_modules/.cache/audit-scope/`.** Node refuses to strip TypeScript types for any
  file under `node_modules` (`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`, tested), so
  the base `.ts` modules would never import there. The snapshot gets its own
  `package.json` (`"type": "module"`) and a `.complete` marker, and it is written to a
  temp folder and renamed, so an interrupted extract is never reused.
- **`--repo <dir>` was added** to the resolver and all three audits. On this branch the
  scope is always *full*, because `scripts/audit_scope.mjs` itself is a full-sweep
  trigger, so the historical fixtures were run by pointing the resolver at a throwaway
  worktree. A checkout older than `card_link_names.json` (pre-#493, e.g. `50ce34ea`)
  borrows the script's own copy.
- **`src/**/*.md` maps to nothing** (the `src/data/*/README.md` files and
  `overlays/NOTES.md` never render). Without it, every README edit would force a full
  sweep through the unknown-`src/`-path rule.
- **Overlay diffs also count `at` locations added or removed on an unchanged stamp**,
  a superset of "added, removed or changed `t`". It costs nothing and covers a new
  location that reuses existing English.
- **`schools.json`: a changed school entry (its name) → that whole page; a changed
  `topics` entry → that area on every school that has it.** The plan named only document
  changes and new schools.
- **Area order for the page hash is `TOPIC_ORDER`, parsed from `src/lib/metrics.ts`**
  (it is not exported); topics it does not list sort after it.
- **The audits now block the Cloudflare beacon**, as `audit_card_links.mjs` already did,
  so audit runs log no page-views. Detectors, exclusions and exit codes are unchanged.
- **Money planted defect:** a raw `$245` planted in a camp `desc` translation was
  correctly localized at render (`desc` goes through `localizeMoneyText`), so the audit
  rightly read 0. The plant that proves the assertion went into the English camp `name`
  (`Wildcat Basketball Academy $245`), a data-module change, which the scoped run found
  (exit 1) and the same scope against the clean build did not (exit 0).
- **Equivalence and wall times (2026-11-15).** Scoped `audit:daterender` on the
  `d8cb0462` fixture: 27 visits, all nine locales, **129 s**, 0 findings, no "widened"
  note. Full `--all` was run for **`es` only**, by the user's choice, since the other
  eight locales repeat identical work and add nothing to verify: 135 visits, **358 s**,
  0 findings. That puts a nine-locale full sweep at **about 54 min (estimated: 358 s
  × 9)**, against 129 s scoped. The `es` full pass also exercised every full-mode code
  path after the refactor.
