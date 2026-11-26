---
name: faithlife
title: Add a Faith & Spiritual Life research area — ten structured cards, Charlotte Christian School first, from two official-site research passes and the Claude Design mock
status: in-progress
phases: 2
created: 2026-11-26
branch: feat/faithlife
prs: []
---

# Faith & Spiritual Life research area (Charlotte Christian first)

## Goal

Add a new research area, **Faith & Spiritual Life** (slug `faith-spiritual-life`), to the
school page, and fill it for **Charlotte Christian School** only. It tells a parent what
faith life looks like at a faith-based school: chapel, Bible classes, retreats, small
groups, what the school believes, what it asks of families, service, who leads it, and
what exists for parents. It is done when Charlotte Christian's page shows the section with
ten cards matching the Claude Design file, every fact traces to the two research files, no
other school's page changes, and `npm run build` is green.

## Context

**Where this came from.** `/research-area-ideas` (2026-11-26, report in the gitignored
`reports/research-area-ideas/2026-11-26.md`) ranked this area #1: all six faith-based
roster schools (Charlotte Catholic, Charlotte Christian, Covenant Day, Carmel Christian,
Hickory Grove Christian, Trinity Episcopal) publish enough for it. The user picked it,
asked for deep research and a design for Charlotte Christian, reviewed both, and said to
plan the build. Later schools are separate plans.

**The design is the spec.** Claude Design project *Charlotte School Compare Website
Design* (`5da24575-40bf-4787-8934-0fadfc56059f`), file
**`Faith & Spiritual Life Section.dc.html`**, etag `1795720093139423` (design v2, written
2026-11-26). Read it with `mcp__claude-design__read_file` before building. It holds the
exact wording, card order, chips and tiles. It was rendered and checked at 1280 and 390 px:
10 cards, no overflow.

**Nearest existing feature: Learning Support & Student Services** (plan
[`learningsupport`](learningsupport.md), PR #357). The design deliberately reuses its
component vocabulary and CSS (`ls-*` classes in `src/index.css`). Follow its wiring
exactly. Every registration point below was confirmed by grep on 2026-11-26:

| What | Where Learning Support does it |
|---|---|
| Types, card registry, `PROGRAMS`, overlay glob + loader, accessor | `src/data/learningSupport.ts` (`LEARNING_SUPPORT_CARDS`, `WIDE_LEARNING_CARDS`, `loadLearningSupportOverlay`, `learningSupportProgram`) |
| Per-school data + rules README | `src/data/learningSupport/<slug>.ts`, `src/data/learningSupport/README.md` |
| Component (lead, stat band, card body) | `src/components/LearningSupport.tsx` |
| Page wiring | `src/pages/SchoolDetail.tsx` lines ~154–163 (imports), ~559 (overlay load), ~1146 (program lookup), ~1192 (has-cards test), ~1316 (`ls-section` class + colors), ~1438 (lead + stat band), ~1813–1834 (card grid, `cardLinkId`, `data-card`) |
| Section order | `TOPIC_ORDER` in `src/lib/metrics.ts` (~line 377) |
| Fold all research onto one key | `RULES['learning-support']` catch-all in `src/lib/metrics.ts` (~line 112) |
| Off Compare | `COMPARE_DEFERRED_TOPICS` in `src/lib/manifest.ts` (~line 117) |
| Meta-description short name | `SHORT_TOPIC_NAMES` in `src/lib/head.ts` (~line 80) |
| Section icon | `src/components/TopicGlyph.tsx` (~line 55) |
| Topic display name for the ingest | `TOPIC_NAMES` in `.claude/skills/ingest-source-material/build_docs.py` (~line 28) |
| i18n topic → data dir | `scripts/i18n_topics.mjs` (~line 69) |
| Field classification | `scripts/i18n_fields.mjs` (`PATH_OVERRIDES`, skip lists) |
| Schema doc | `STRUCTURED` entry in `scripts/gen_data_schema.mjs` (~line 237) |
| Card deep links | `scripts/check_card_link.mjs` (~lines 73 and 95), snapshot `scripts/card_link_names.json` |
| Browser-audit scope | `scripts/audit_scope.mjs` (~line 119) |
| Design capture | `AREA_FILES` in `scripts/design_capture.mjs` (~line 638) |
| Chrome strings | `src/locales/en.json`: `topics.*`, `metrics.*`, `cards.learning-support.*`, the `learning` block (~line 838) |
| Consistency checker dir list | `scripts/check_consistency.mjs` (~line 134) |
| `/add-school` area floor exclusions | `FLOOR_EXCLUDED_AREAS` in `scripts/coverage_floor.mjs` (~line 71) |

**The ingest is discovery-based.** `build_docs.py` turns any folder under
`source-material/` into a research area. The folder
`source-material/faith-spiritual-life/` already exists (uncommitted), so the area appears
the moment an ingest runs. That is now intended, but only together with the app wiring in
this plan.

## Decisions

- **Slug `faith-spiritual-life`, display name "Faith & Spiritual Life".** Card deep-link
  area name is `faith-and-spiritual-life` (the `&` → `and` rule in `src/lib/cardLink.ts`).
- **Files:** data `src/data/faithLife.ts` + `src/data/faithLife/charlotte-christian.ts` +
  `src/data/faithLife/README.md`; component `src/components/FaithLife.tsx`; overlay glob
  `./overlays/faith-spiritual-life.*.json`; registry `FAITH_LIFE_CARDS`, root type
  `FaithLifeProgram`, loader `loadFaithLifeOverlay`, accessor `faithLifeProgram`.
- **Reuse the `ls-*` CSS classes; do not copy them.** The design uses `ls-section`,
  `ls-section-lead`, `ls-stats`, `ls-entries`, `ls-groups`/`ls-row`, `ls-grid`,
  `ls-staff`/`ls-person`, `ls-questions`, `ls-note`, `ls-code`, `ls-legend`. Add only what
  is missing, with an `fl-` prefix: the numbered statement-of-faith list (`fs-articles` in
  the mock → `fl-articles`) and the small in-card heading (`fs-h` → `fl-h`). Never use an
  `ad-` prefix (ad blockers hide it).
- **Ten cards, in this order, with these keys:** `chapel`, `classes`, `retreats`,
  `groups`, `beliefs`, `families`, `service`, `staff`, `parents`, `ask`. Wide (full row):
  all except `service` and `staff`. Every card is optional per school; a card with zero
  items is omitted, never shipped empty.
- **No kicker lines, no podcast strip** (no episode exists).
- **Placement:** in `TOPIC_ORDER` directly after `learning-support`, before
  `student-clubs`. Reason: it sits with the areas that describe daily school life. See
  Open questions.
- **Off Compare** (`COMPARE_DEFERRED_TOPICS`) until the user asks for rows. Seven roster
  schools can never hold the area.
- **Out of the `/add-school` area floor** (`FLOOR_EXCLUDED_AREAS`): a non-religious
  candidate must not be marked down for lacking it.
- **Colors from data,** as Learning Support does: `colors.brand` `#1e40af` (matches
  `src/data/brands.ts`). `colors.gold` `#c9a227` is a **placeholder** from the mock; see
  Open questions.
- **Chips.** Grade-band chips (`JK–4`, `5–8`, `9–12`, `3–4`, `5–12`, `JK`, `K`, `1`…`8`,
  `9 · 1 CREDIT`) are figure fields, authored once and skipped by the extractor; the word
  `CREDIT` comes from a chrome key with interpolation. Word chips are chrome keys under a
  new `faith` block in `en.json`: `faith.code.all` (ALL), `.published`, `.notStated`,
  `.weekly`, `.monthly`, `.yearly`, plus the two legend lines and the group tallies
  (`{{published}} published · {{notStated}} not stated`, interpolated, never plural-`s`).
  Tallies are **computed from the rows**, never typed.
- **Only Charlotte Christian's own public pages are evidence.** Same rule as Learning
  Support and Global Exposure. No third-party page, no church site.
- **Statement of faith is quoted in full, verbatim, with no comment,** including the
  marriage article. The school publishes it on its belief page and a parent should read it
  before applying. Nothing is summarized or softened.
- **The 2014 bylaws' staff-and-board "Personal Lifestyle Statement" stays in the research
  file only.** It is a dated governing document about employees, not a statement to
  families.
- **An unpublished requirement is a dashed NOT STATED chip, never a blank** and never
  "not required". The legend says so.
- **No student is named.** A student who spoke in chapel is "an Upper School student
  leader". Staff are named with the email the school's directory publishes
  (`schoolInquiryMailto` for the link). **Never carry** the personal details the directory
  pop-ups print (a personal email address, staff members' children's names and grades).
- **No trip prices and no exact travel dates** (retreats, Winterim): season and year only.
- **LEADS are never facts:** the 2023-24 enrollment packet, the 2007 magazine's service
  hours, the old preview-host page, and anything read by eye from the Viewbook images.
- **Research bookkeeping is dev-only.** "Could not read", "inferred from the calendar" and
  the 11+ self-conflicts go in dev-only verify notes, following how
  `LearningSupport.tsx` and `src/lib/flagVisibility.ts` handle them and §6 of
  `DATA-SCHEMA.md`. Parent text says what the school publishes or does not. Two mock lines
  to reword on that basis: the Families card's closing muted sentence, and "Chapel days
  and times are from the school's 2026–27 calendar" (keep the calendar attribution, drop
  anything about our method).
- **When the school's pages disagree, the card states the published fact a parent can
  check and the Ask the School card carries the question** (service hours "encouraged" vs
  "school required"). Do not pick a winner silently.
- **Meta description:** adding the area lengthens Charlotte Christian's description. If
  `check:seo` reports over 160 chars, add `'faith-spiritual-life': 'faith life'` to
  `SHORT_TOPIC_NAMES`.
- **Second-pass corrections win** over the first-pass file where they differ (the
  "Corrections to the first-pass file" section of the second file).

## Approvals needed

**None outstanding.** The UX approval is the user's: they picked the area from the ranked
list, reviewed the design and the data, and asked for this plan (2026-11-26). They also
said the design "is allowed to grow and change" with new research; design v2 is the result.
Deploy is never part of this plan.

## Source material

Both files are written, uncommitted, and **not ingested**. `/implement` ingests them.

| File | Holds |
|---|---|
| `source-material/faith-spiritual-life/charlotte-christian/Charlotte Christian - Faith and Spiritual Life - Official Site Research.md` | First pass, 2026-11-26: ~45 pages, 17 linked documents, the 2026-27 calendar, the directory. Ten finding sections, source URLs, 12 conflicts, not-found lists. 12 quotes re-checked against raw downloads. |
| `source-material/faith-spiritual-life/charlotte-christian/Charlotte Christian - Faith and Spiritual Life - Second Pass Gap Research.md` | Second pass, 2026-11-26: the public Communications Archive (Chapel Recaps, Focus), retreat packets, directory pop-ups, Kingdom Impact Day summary, Viewbook. Gap verdicts and corrections to the first file. 14 quotes re-checked. |

Still not public after two passes, so they stay NOT STATED: whether a parent must be a
Christian or attend church, a pastor reference, signing the statement of faith, chapel
attendance, service hours per grade, the Honor Code text, the Bible curriculum publisher.

## Out of scope

- Any other school's Faith & Spiritual Life section.
- Compare rows, stat tiles outside the section, a podcast episode, a `/faith-life` skill.
- Changing Learning Support's components or CSS (reuse only).
- `npm run deploy`.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout main && git pull && git checkout -b feat/faithlife`. Run
   `git status --short` first: the tree is shared and holds unrelated modified
   `source-material` files. Stage explicit paths only, all through the plan.
2. **Check Claude Design is connected** (`mcp__claude-design__list_projects`). If not,
   stop and ask the user to reconnect (`/design-login`). Then read
   `Faith & Spiritual Life Section.dc.html` in full. If its etag is no longer
   `1795720093139423`, the user edited it: build to what is there now.
3. **Fold the corrections into the first research file.** Apply each item in the second
   file's "Corrections to the first-pass file" section, replace the first file's
   "Status: … Not approved, not ingested" header paragraph with one line saying the area
   was approved and planned as `faithlife` on 2026-11-26, and re-read both files for any
   student name before going on.
4. **Re-verify the facts the cards will print** against the live pages listed in the
   research files (the school's pages change): the three chapel day/time patterns, the
   statement of faith (all ten articles, char-for-char), the five Upper School Bible
   courses and credits, the seven staff titles and six emails (from the directory
   pop-ups), the four figures (`130`, `12,556`, `79,056`, `1,850`, `98,484`). Record
   anything that moved in the research file and build from the live value.
5. **Ingest.** Add `"faith-spiritual-life": "Faith & Spiritual Life"` to `TOPIC_NAMES` in
   `build_docs.py`, then run the `ingest-source-material` skill for this one topic
   (`python .claude/skills/ingest-source-material/build_docs.py faith-spiritual-life`).
   Read the generated note under `.claude/docs/faith-spiritual-life/` for names. If
   `src/data/schools.json` shows a large reorder, restore the HEAD order (known trap).
6. **Topic wiring.** `src/lib/metrics.ts`: add the slug to `TOPIC_ORDER` after
   `learning-support`, and a catch-all `RULES['faith-spiritual-life']` → key
   `redesign-research`, label `Faith & Spiritual Life Research (2026)`.
   `src/lib/manifest.ts`: add to `COMPARE_DEFERRED_TOPICS`.
   `scripts/coverage_floor.mjs`: add to `FLOOR_EXCLUDED_AREAS`.
   `src/components/TopicGlyph.tsx`: add the glyph from the design (a plain cross:
   `M12 3v18` and `M6 9h12`, stroke 1.5).
7. **Data module** `src/data/faithLife.ts`, modeled on `learningSupport.ts`: types for
   lead, stats, the ten cards, `FAITH_LIFE_CARDS`, the wide set, `PROGRAMS`, the overlay
   glob (standing alone at module scope, unguarded) and loader, and the accessor. Card
   shapes, from the design:
   - `chapel`, `groups`, `service`, `parents`: `entries[]` of `{ chip, title, text,
     muted? }` plus an optional `note { strong, text?, muted? }`.
   - `classes`: `intro`, `groups[]` of `{ name, tally, rows[] { label, chip, detail } }`,
     `note`.
   - `retreats`: `cells[]` of `{ title, text }` (three), `note`.
   - `beliefs`: `mission`, `values[]` of `{ name, verse }`, `note`, `articles[]`
     (strings).
   - `families`: `groups[]` of `{ name, rows[] { label, status: 'published' |
     'notStated', detail } }`, `note`.
   - `staff`: `people[]` of `{ name, role, email? }`, `note`.
   - `ask`: `questions[]`, `asOf`.
   Every card carries `sources[]` (`{ label, url }`, specific pages, never a bare
   homepage) and an optional dev-only `verify[]`.
8. **Charlotte Christian data** `src/data/faithLife/charlotte-christian.ts`: transcribe
   the design's ten cards, lead and four tiles (`Weekly`, `4`, `130`, `12,556`), with
   `sources` taken from the research files' URLs. Quotes char-for-char from the research
   files (which are char-for-char from the school). Register it in `PROGRAMS`.
9. **README** `src/data/faithLife/README.md`: the two gates (research folder + data
   file), and the rules in this plan's Decisions (official sources only, verbatim belief
   statements, NOT STATED chips, no student names, no personal staff details, no trip
   prices or dates, LEADS never facts, emails only from the directory).
10. **Component** `src/components/FaithLife.tsx`: `FaithLifeLead`, `FaithLifeStatBand`,
    `FaithLifeCardBody`, built from the `ls-*` classes as the design shows. Add `fl-*`
    rules to `src/index.css` only for the statement-of-faith list and the in-card
    heading. Sources render through the same "Show sources" row Learning Support uses.
11. **Page wiring** in `src/pages/SchoolDetail.tsx`, mirroring each Learning Support
    touchpoint in the Context table: imports, overlay load, program lookup, has-cards
    test, section class + `--brand` / `--ls-gold` colors (generalize the
    `learning ? ' ls-section'` condition to cover both areas), lead + stat band, and the
    card grid with `cardLinkId(areaEn, cardTitle(enT, 'faith-spiritual-life', …))` and
    `data-card="faith-spiritual-life:<key>"`.
12. **English chrome** in `src/locales/en.json`: `topics.faith-spiritual-life`,
    `metrics.faith-spiritual-life.redesign-research`, ten `cards.faith-spiritual-life.*`
    titles (Chapel & Worship; Bible & Faith Classes; Retreats; Small Groups &
    Discipleship; What the School Believes; What It Asks of Families; Service & Missions;
    Who Leads Spiritual Life; Faith Life for Parents; Ask the School), and the `faith`
    block (chips, legend, tally, "Five core values", "Statement of faith, as the school
    publishes it", "Research current as of {{date}}", the `CREDIT` chip pattern). No
    user-facing string is hardcoded in JSX.
13. **Scripts.** `scripts/i18n_topics.mjs`: `'faith-spiritual-life': 'faithLife'`.
    `scripts/i18n_fields.mjs`: classify every new path so the residual run reports 0
    unclassified (chips, `status`, `email`, `url`, `verse` skipped; `name` on people is a
    proper noun; titles, text, details, questions, articles are prose).
    `scripts/gen_data_schema.mjs`: a `STRUCTURED` entry (`topic`, `file: 'faithLife.ts'`,
    `reg: 'FAITH_LIFE_CARDS'`, `root: 'FaithLifeProgram'`, `dir: 'faithLife'`) and a short
    rules paragraph for the area. `scripts/check_card_link.mjs`: the area name pair and
    the registry line. `scripts/audit_scope.mjs`: map `src/data/faithLife.ts` and its
    folder to the slug. `scripts/check_consistency.mjs`: add `faithLife` to the dir list
    if that list is what makes a data folder visible to the report (read the code first).
    `scripts/design_capture.mjs`: `AREA_FILES['faith-spiritual-life'] =
    'Faith & Spiritual Life Section.dc.html'`.
14. **Regenerate and snapshot.** `npm run schema`; `npm run check:cardlink -- --update`.
15. **Docs.** Add a short "Faith & Spiritual Life research area" section to `CLAUDE.md`
    (what it is, Charlotte Christian first, the rules, off Compare, out of the floor), and
    a row for the new design file in `.claude/docs/design-sync.md`. No skill or command is
    added, so `.claude/SKILLS.md` is unchanged.
16. **Verify Phase 1** (below), then **re-capture the design from the built app**:
    `npm run build && npx vite preview`, then
    `npm run design:capture -- --page /school/charlotte-christian/ --area faith-spiritual-life --name "Faith & Spiritual Life Section" --refs "Charlotte Christian" --sha <build commit> --out <dir>`,
    write it over the mock with `write_files` (pass the current etag as `if_match`),
    `npm run design:verify`, and update `As Built - Index.md` in the project.
17. **Commit** the branch with explicit paths, push (verify the remote SHA), and set the
    INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review of the English
section.** Nothing below runs until they confirm the wording.

### Phase 2 — Every other locale

1. **Chrome:** add every Phase 1 key to the nine other catalogs listed in `TRANSLATED`
   (`src/lib/i18n.ts`: `es bn ht te fr fa it hi ar`). Key sets must equal `en`.
2. **Prose:** build a `faith-spiritual-life.<lang>.json` overlay for each
   `PROSE_TRANSLATED` locale, by stamp from a fresh extract, per
   `.claude/docs/prose-translation-architecture.md` and
   `src/data/overlays/NOTES.md`. Specifics for this area:
   - The **statement of faith and every quoted school sentence are translated** like all
     other quoted school text in the app; Bible references (`Matthew 22:37`), course
     names, program names (`Windy Gap`, `KnightLight Worship`, `DIG`, `Haverim`,
     `Winterim`) and staff names stay as published.
   - Figures char-for-char; no unit conversion; dates and times follow the "Dates and
     session labels" rules; `fa`/`ar` ranges (`8:15–8:45`, `JK–4`) are checked in a
     browser and reworded if they reverse.
   - Add the area's tracked classes to the non-Latin `letter-spacing: 0` list if any new
     `fl-` class is caps-tracked.
3. **Checks and browser passes** (below), then open the PR with `--body-file`, merge
   (`gh pr merge --squash --delete-branch`), check out `main` and pull, and flip the INDEX
   row to `Implemented` with the PR link. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/faith-spiritual-life/charlotte-christian/*.md` (2) | written at planning; corrections folded in, header updated |
| `.claude/skills/ingest-source-material/build_docs.py` | edit — `TOPIC_NAMES` |
| `src/data/schools.json`, `.claude/docs/faith-spiritual-life/**`, `.claude/docs/INDEX.md`, `src/content/faith-spiritual-life/**` | regenerated by the ingest |
| `src/data/faithLife.ts`, `src/data/faithLife/charlotte-christian.ts`, `src/data/faithLife/README.md` | new |
| `src/components/FaithLife.tsx` | new |
| `src/pages/SchoolDetail.tsx` | edit — wire the area like Learning Support |
| `src/lib/metrics.ts`, `src/lib/manifest.ts`, `src/lib/head.ts` (only if needed), `src/components/TopicGlyph.tsx` | edit |
| `src/index.css` | edit — `fl-*` rules only |
| `src/locales/en.json` (Phase 1), the nine other catalogs (Phase 2) | edit |
| `src/data/overlays/faith-spiritual-life.<lang>.json` (9) | new, Phase 2 |
| `scripts/i18n_topics.mjs`, `scripts/i18n_fields.mjs`, `scripts/gen_data_schema.mjs`, `scripts/check_card_link.mjs`, `scripts/audit_scope.mjs`, `scripts/design_capture.mjs`, `scripts/coverage_floor.mjs`, `scripts/check_consistency.mjs` (if needed) | edit |
| `scripts/card_link_names.json`, `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `CLAUDE.md`, `.claude/docs/design-sync.md`, `.claude/plans/INDEX.md`, this plan | edit |
| Claude Design: `Faith & Spiritual Life Section.dc.html`, `As Built - Index.md` | re-captured after the build |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean (trust `tsc -b`, not `tsc --noEmit`).
- [ ] The extractor's residual run reports **0 unclassified** paths for the new topic.
- [ ] `npm run build` — green with every chained check (`check:schema`, `check:cardlink`,
      `check:seo`, `check:flags`, `check:spelling`, `check:live`, `check:runtime`, …).
- [ ] `npm run check:metrics` and `npm run coverage:floor` — no new unmatched subtopic;
      the floor is unchanged.
- [ ] Plain-language hook passes on the new data file; no jargon, no sentence over 30
      words outside verbatim school quotes.
- [ ] Name check on every new and generated file: no student name, no personal staff
      detail. Do not rely on word boundaries alone.
- [ ] Real Chrome (Playwright, `channel: 'chrome'`, headless, never `networkidle`), on
      `/school/charlotte-christian/` with every card open, at 1280 light, 1280 dark and
      390: ten cards in the planned order; four tiles; 4 NOT STATED chips plus the legend;
      seven people, six with email links; the ten statement-of-faith articles; no Compare
      button; no kicker; page overflow 0.
- [ ] Another school's page (Cannon, and Covenant Day as a faith-based school with no
      data yet) shows **no** Faith & Spiritual Life section, chip or side-rail entry;
      `dist/compare` and the Home grid show no new Compare cell.
- [ ] `#faith-and-spiritual-life/chapel-and-worship` scrolls to and opens the card;
      `npm run audit:cardlink` passes for the new cards (it runs headed: warn the user).
- [ ] `npm run audit:mobile` for Charlotte Christian at 320/360/390 — no overflow, no
      clipped card. Log each audit to a file; never pipe through `tail`.
- [ ] `design:verify` — the re-captured design file matches byte for byte.

### Phase 2 — Locales

- [ ] `npm run build` — green (`check:live`, `check:runtime`, `check:dates`,
      `check:moneytext`).
- [ ] `npm run check:chrome`; `check:fr`, `check:bidi`, `check:fa`, `check:hi`.
- [ ] `check_figures.py` and `npm run check:sepdrift -- --lang <code>` for all nine;
      `npm run check:digits` on the new units; `i18n:leaks -- --lang <code>` shows no hit
      in the new area.
- [ ] Browser: `es`, `fa` and `hi` at 1280 and `fa`/`ar` at 390, every card open: all
      prose translated, chips translated, time and grade ranges not reversed in RTL, 0
      overflow. `npm run audit:daterender` on the changed cards.

## Risks

| Risk | Mitigation |
|---|---|
| The school's pages change between research and build (chapel series, staff, figures) | Step 4 re-verifies every printed fact; the live page wins and the research file records the change. |
| A belief statement is paraphrased or softened in editing or translation | Articles are stored as whole verbatim strings; Phase 2 translates them whole; the Phase 1 browser check counts ten articles. |
| A student name or a staff member's personal detail leaks from a source page | Research files already withhold them; name check in Phase 1; the README states the rule for later schools. |
| NOT STATED is read as "not required" | Legend text says it is not the same; the Ask the School card carries each as a question. |
| An ingest run by another session adds the area before this branch lands | The area then renders as ingested prose on one school. Build soon; if it happens, the catch-all `RULES` entry in this plan is what tidies it. |
| Reusing `ls-*` classes couples two areas | Intended: one look. Any change to an `ls-*` rule must be browser-checked on both sections. |
| Long topic name breaks the 160-char meta description or a phone-width chip | `SHORT_TOPIC_NAMES`; `audit:mobile` at 320 px in Phase 2 locales. |

## Open questions

- **Second accent color.** The mock uses `#c9a227`, a placeholder; the app records only
  royal blue `#1e40af` for Charlotte Christian. **Default:** keep the placeholder for the
  English review and ask the user there.
- **Section position.** **Default:** after Learning Support, before Student Clubs. The
  user may prefer it higher (after Admissions) for a faith-based school.
- **Translating the statement of faith.** **Default:** translate it, like every other
  quoted school text. If the user wants the English kept as the citable text, pin those
  paths in `PATH_OVERRIDES` instead.
- **Tile four.** `12,556` service hours (class of 2026) replaced the retreat tile in
  design v2. **Default:** keep it; it is a published, checkable figure.
