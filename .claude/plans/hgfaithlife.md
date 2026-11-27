---
name: hgfaithlife
title: Add Hickory Grove Christian School to the Faith & Spiritual Life research area (9 of 10 cards; no Retreats, no statement of faith; two new Beliefs blocks)
status: implemented
phases: 2
created: 2026-11-26
branch: feat/hgfaithlife
prs: []
---

# Add Hickory Grove Christian to Faith & Spiritual Life

## Goal

Hickory Grove Christian School becomes the second school with a **Faith & Spiritual Life**
section (slug `faith-spiritual-life`), after Charlotte Christian. It shows nine of the ten
shared cards, built only from the school's own public pages. It omits Retreats, because the
school publishes none, and prints no statement of faith (user decision below). Most of the
work is data: a new `src/data/faithLife/hickory-grove-christian.ts`, its registration and the
ingest. There is **one approved UX change**: two new optional blocks on What the School
Believes, `tenets` and `outcomes`, which hold Hickory Grove's seven listed beliefs and its
three hoped-for outcomes in its own words. They are designed in Claude Design first, then
built with two chrome keys and two extractor rules, then re-captured. It worked when the
section renders on `/school/hickory-grove-christian/` in English (Phase 1) and then in all
nine prose locales (Phase 2), with every check green.

## Context

- **The area exists** (plan `faithlife`, PR #537, merged 2026-11-26). Types, the card
  registry `FAITH_LIFE_CARDS`, `WIDE_FAITH_CARDS`, `PROGRAMS` and the overlay loader are in
  `src/data/faithLife.ts`. The one school is `src/data/faithLife/charlotte-christian.ts`,
  which is **the model for shape and tone** (header comment with a kept-out list, a `BASE`
  constant plus a `src()` helper, named source constants, then the program object). Read it
  first. Its facts are not the model: the rule is to fill every card the school publishes
  enough for.
- **The renderer** is `src/components/FaithLife.tsx`, wired in `src/pages/SchoolDetail.tsx`.
  Every card is optional; a card absent from the program object does not render. On the
  Beliefs card, `mission` renders after a bold "Mission." opener. `values` renders under
  "Core values" (`faith.coreValues`), with a Bible-reference cell per value. `articles`
  renders under "Statement of faith, as the school publishes it" (`faith.statementOfFaith`).
  That is why Hickory Grove sets neither `values` nor `articles`, and gets two new fields
  instead (Decisions). The Beliefs render code is `BeliefsBody` in `FaithLife.tsx`, and
  the field classification is the "faith & spiritual life" block in `scripts/i18n_fields.mjs`
  (about line 878; `beliefs.values[].name` and `beliefs.articles[]` are the nearest models).
- **Two gates** (`src/data/faithLife/README.md`): the section renders only when the
  research folder `source-material/faith-spiritual-life/<slug>/` exists **and** the data
  file is in `PROGRAMS`.
- **Already wired for any new school, so nothing to add:**
  - `scripts/i18n_topics.mjs:71` (`'faith-spiritual-life': 'faithLife'`)
  - `scripts/gen_data_schema.mjs:241` (`STRUCTURED` entry)
  - `scripts/check_card_link.mjs:97`
  - `scripts/audit_scope.mjs:120`
  - `scripts/check_consistency.mjs:135`
  - `scripts/coverage_floor.mjs:75` (`FLOOR_EXCLUDED_AREAS`)
  - `scripts/design_capture.mjs:639`
  - `scripts/data_dependents.json:28`, which lists `src/data/faithLife/<slug>.ts` against Course Offerings
  - `COMPARE_DEFERRED_TOPICS` in `src/lib/manifest.ts`
  - `TOPIC_NAMES` in the ingest's `build_docs.py`
- **Hickory Grove's other areas** live in `src/data/*/hickory-grove-christian.ts`. Its
  Learning Support section uses `colors: { brand: '#1b2a4a', gold: '#c5b358' }`, and
  `src/data/brands.ts` gives `#14396e`.
- **The site moved from Finalsite to ParentSquare SmartSites.** Pages are at
  `https://hgchristian.org/<path>`, and documents at
  `https://files.smartsites.parentsquare.com/14485/<file>`. The two course catalogs are
  Heyzine flipbooks embedded on `/course-selection-guide` and `/ms-courses`; cite those
  school pages. The chapel pre-registration form is a Fillout embed on
  `/chapel-pre-registration`. The calendar feed is `/api/calendars/153239/events?start_date=…&end_date=…`
  (times in UTC).
- **Locale mechanics.** Prose overlays are `src/data/overlays/faith-spiritual-life.<lang>.json`,
  with work files in `src/data/overlays/work/`. A new school's strings are added with
  `scripts/i18n_splice_work.mjs`, never by re-extracting. The extractor has no carry-over
  and would blank the shipped Charlotte Christian translations. The splice joins on the
  FNV-1a stamp, never the index (memory `splice-not-reextract-for-new-school`;
  `src/data/overlays/NOTES.md` has worked examples from Global Exposure's second and third
  schools).

## Decisions

The four numbered decisions are the user's (AskUserQuestion, 2026-11-26) and are the
approval record:

1. **"Proceed (Recommended)"**: build nine of ten cards, with Retreats omitted. No retreat
   appears on any page, on the 2026–27 calendar or in the site's own search, so there is
   nothing to show. The question goes on Ask the School.
2. **"ignore statement since there is not one"**: no statement of faith is printed.
   - The belief pages publish no doctrinal statement.
   - The one document the site calls "the HGCS Statement of Faith" is a marriage, gender and
     sexuality statement, linked only from the employment application.
   - **Nothing from that document goes on any card**: no articles, and not its Application
     or Authority article. `beliefs.articles` is absent. The document stays in the research
     file.
3. **"Leave it out"**: the middle and high school dress code's gender-presentation sentence
   is on no card.
4. **"brands.ts navy + gold"**: `colors: { brand: '#14396e', gold: '#c5b358' }`. The brand
   is from `brands.ts`. The gold is the school's own, as Learning Support uses it. Check it
   in light and dark.

The remaining decisions were made during planning:

5. **"for the beliefs you have persmission to do design"** (user, 2026-11-26, after reading
   this plan's first draft): UX approval for two new optional blocks on What the School
   Believes. It is designed in Claude Design first, then built, then re-captured (the
   hard rule in `CLAUDE.md`).

- **Two new optional `BeliefsCard` fields, not `values`.** The three Expected Student
  Outcomes have no Bible references, so `values` would render empty verse cells under "Core
  values". The seven beliefs about education are not a statement of faith, so `articles`
  would mislabel them. So:
  - `tenets?: string[]` holds the beliefs a school lists in its own words, one whole
    verbatim item per string, in page order. Hickory Grove has seven, from /our-beliefs
    ("At Hickory Grove Christian School, we believe:").
  - `outcomes?: { name: string; text: string }[]` holds the outcomes a school hopes for,
    each with its own one-line description. Hickory Grove has three, from /our-beliefs and
    /esos.
  - Both are shared across schools, so their headings are neutral chrome keys with no
    count. The proposed keys are `faith.tenets` ("What the school says it believes") and
    `faith.outcomes` ("Who the school hopes students become"). The Claude Design step
    settles the final wording and layout.
  - Charlotte Christian's data is unchanged and does not use either field.
  - The vision and the school verse stay in `beliefs.note`.
  - The per-outcome "Our students will:" lists on /esos stay in the research file, to keep
    the card short.
- **Mentions of a "Statement of Faith" in other school sentences are kept for now**, and
  flagged for the English review (Open questions): the Family Interview row, the employment
  note, Ask question 3 and the NOT STATED row "Agreeing to a statement of faith". They quote
  the school's admissions and job pages, not the document.
- **Who Leads lists church pastors**, titled "…, Hickory Grove Baptist Church". The school
  publishes no chaplain, and its pages say "HGBC pastors teach in chapel and lead Lions
  Connect". Pastors get no email: none is published on the school's site.
- **Parent text spells out "Hickory Grove Baptist Church"**, except inside names the school
  prints ("HGBC Food Pantry").
- **"Student on Mission"**, the web page's form, which Student Clubs already uses.
- **Hang Ten and the Lions Connect book list are left off**: Hang Ten is a technology
  program, not a faith program, and the book list is optional detail.
- **`CLAUDE.md` is not edited.** Its Faith & Spiritual Life section already says "Later
  schools are separate plans", and no rule changes. `.claude/SKILLS.md` is unchanged, since
  no skill or command changes.

## Approvals needed

None outstanding.
- The nine cards already exist (approved and designed under `faithlife`).
- The one UX change, the two new Beliefs blocks, was approved by the user on 2026-11-26
  (decision 5). It still owes the design step before the build and the re-capture after it.
- **No deploy:** publishing is the user's call, every time.

## Source material

Written during planning (/faith-life Steps 2–4). **Uncommitted.** `/implement` commits them
on its branch and ingests them:

- `source-material/faith-spiritual-life/hickory-grove-christian/Hickory Grove Christian - Faith and Spiritual Life - Official Site Research.md`:
  the first pass, with the second-pass corrections folded in (each marked "(second pass)"),
  13 numbered conflicts, and `### Re-verification 2026-11-26 (/faith-life)` under
  `## Method`.
- `source-material/faith-spiritual-life/hickory-grove-christian/Hickory Grove Christian - Faith and Spiritual Life - Second Pass Gap Research.md`:
  gap verdicts and corrections.

Official sources only. Hickory Grove Baptist Church's site was deliberately not read. No
student is named in either file, and both were checked for that.

## Out of scope

- Any new card, and any UX change beyond the two Beliefs blocks.
- Printing the employment-linked statement, or anything from it.
- Any edit to another area's **parent-facing** text. Lesson 9 found no disagreement (see
  the appendix).
- Other faith-based schools (Charlotte Catholic, Covenant Day, Carmel Christian, Trinity
  Episcopal), which are separate plans.
- Compare rows: the area stays off Compare.
- Deploying.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout main && git pull && git checkout -b feat/hgfaithlife`. Run
   `git status --short` first. The tree is shared and already holds unrelated modified
   `source-material/` files and a `.claude/plans/consistency7-data/` folder: never stage
   them. Stage explicit paths only, never `git add -A`, and never `git stash`.
2. **Re-check the research files.** Read both files in full. Confirm no student name and no
   personal staff detail, and that every internal note sits under a `## Method` heading.
   Replace the first file's status line (`**Status: researched, not yet planned.** …`) with
   one line: "planned as `hgfaithlife` on 2026-11-26; second-pass corrections folded in,
   each marked (second pass)."
3. **Re-verify what the cards print**, if the build happens on a later day than 2026-11-26:
   chapel days and times (calendar feed and pre-registration form), the Bible courses and
   "Bible 4" / "1 per year" (HS catalog), the staff roles and the two emails, the four
   figures (`10`, `13`, `4`, `200+`), and each quote in the appendix. Fetch with `curl -sL`
   and a desktop user agent. If a value moved, the live page wins: build from it and record
   the change in the research file's `## Method`. On the same day, skip this step; it was
   done at planning (78 quotes, 0 misses).
4. **Ingest.** Run the `ingest-source-material` skill for this topic
   (`python .claude/skills/ingest-source-material/build_docs.py faith-spiritual-life`). Read
   the generated note under `.claude/docs/faith-spiritual-life/` for names. If
   `src/data/schools.json` shows a large reorder, restore the HEAD order and keep only the
   new school's entry (memory `two-topic-ingest-reorders-manifest`).
5. **Design the two Beliefs blocks first** (hard rule: approved UX is designed before it is
   built).
   1. Check the Claude Design MCP with `mcp__claude-design__list_projects`. If it is not
      connected, **stop** and ask the user to reconnect it (`/design-login`). Never use an
      Artifact canvas, and never build undesigned.
   2. In the project *Charlotte School Compare Website Design*
      (`5da24575-40bf-4787-8934-0fadfc56059f`), read `Faith & Spiritual Life Section.dc.html`
      in full. Before writing, read `.claude/docs/design-sync.md` and the memory note
      `claude-design-write-path`.
   3. Add a Hickory Grove view of the What the School Believes card that shows these blocks:
      - Mission.
      - The **tenets** block: a heading, then the seven beliefs as a plain list. Make it
        visibly unlike the numbered statement-of-faith list, so a parent never reads it as
        doctrine.
      - The **outcomes** block: a heading, then three cells, each a name and a one-line
        description. Use the cell look of "Core values", but with text where the verse was.
      - The note.
   4. Settle the two headings in the design. They must be neutral for any school and carry
      no count. The proposals are "What the school says it believes" and "Who the school
      hopes students become".
   5. Check the design at 1280 and 390. Write it with `write_files`, passing the current
      etag as `if_match`.
   6. Show the user the rendered preview and wait for their OK before building.
6. **Build the blocks.**
   - **Types**, in `src/data/faithLife.ts`: add `tenets?: string[]` and
     `outcomes?: FaithOutcome[]` to `BeliefsCard`, with doc comments. For the first:
     "beliefs the school lists in its own words; not a statement of faith; one whole verbatim
     item per string, in page order". Add a new plain multi-line
     `export type FaithOutcome = { name: string; text: string }`. The schema generator
     cannot read a one-line type or an intersection (review-lessons 16), and a non-exported
     type after an exported union is dropped (memory `schema-gen-bare-type-swallows-union`).
   - **Render**, in `BeliefsBody` (`src/components/FaithLife.tsx`): show both blocks only
     when present and non-empty, in the order the design shows. Use existing `ls-*` and
     `fl-h` classes where the design allows. Any new rule goes in `src/index.css` as an
     `fl-*` class. If a new class is caps-tracked, add it to the non-Latin
     `letter-spacing: 0` list. No hardcoded text: headings come from `t('faith.tenets')` and
     `t('faith.outcomes')`.
   - **Chrome**: add `faith.tenets` and `faith.outcomes` to `src/locales/en.json` only, with
     the wording from the design. Phase 2 adds them to the other nine catalogs.
   - **Extractor**: in the faith block of `scripts/i18n_fields.mjs`, add
     `['beliefs.tenets[]', true]`, `['beliefs.outcomes[].name', true]` and
     `['beliefs.outcomes[].text', true]`. The comment should say these are verbatim school
     phrases, translated whole, and that `name` is prose here, as with `values[].name`.
   - **README** (`src/data/faithLife/README.md`): one line each for `tenets` (verbatim,
     whole, in page order, never a summary, and never a statement of faith) and `outcomes`.
7. **Write `src/data/faithLife/hickory-grove-christian.ts`**, exporting
   `hickoryGroveChristian: FaithLifeProgram`. Model the file on `charlotte-christian.ts`:
   - The header comment names the two research files and the kept-out list: student names,
     personal staff detail, trip prices and exact dates, the employment-linked statement of
     faith (user decision), the dress-code presentation sentence (user decision), and every
     LEAD.
   - `BASE = 'https://hgchristian.org'`, plus a `src()` helper that also takes absolute URLs
     (documents live on `files.smartsites.parentsquare.com`).
   - Source constants are as in the appendix table. Each label is `hgchristian.org — <label>`.
   - The content is the appendix draft, field for field: `colors`, `lead`, the four `stats`,
     and the cards `chapel`, `classes`, `groups`, `beliefs`, `families`, `service`, `staff`,
     `parents` and `ask`. There is **no `retreats`**, and no `beliefs.values` or
     `beliefs.articles`. `beliefs.tenets` and `beliefs.outcomes` come from the appendix. Each card gets the draft's `sources` and `verify`. Copy the quotes
     from the appendix exactly, with curly quotes and apostrophes as written. Figures are
     authored US-style.
8. **Register it** in `src/data/faithLife.ts`: import `hickoryGroveChristian` and add
   `'hickory-grove-christian': hickoryGroveChristian` to `PROGRAMS`. Rewrite the
   "Charlotte Christian is the only school researched" comment above it to name both schools.
9. **README.** In `src/data/faithLife/README.md`, add one line under the first paragraph:
   Hickory Grove Christian is the second school (2026-11-26, plan `hgfaithlife`). Add one
   rule beside the bylaws line: a statement linked only from an employment application is
   not a statement to families either, and stays in the research file (Hickory Grove,
   user decision 2026-11-26).
10. **Optional comment fix.** In `src/data/clubsPrograms/hickory-grove-christian.ts`, lines
   8–11 say the site "no longer shows the four-country mission trips or the aquaponics
   program". On 2026-11-26, `/academics-home` and `/high-school-home` show both. Reword the
   comment to say the service card follows the Missions & Service page. Change the comment
   only: it is not an extracted unit.
11. **Regenerate.** Run `npm run schema`, and check that `DATA-SCHEMA.md` lists `FaithOutcome`
   and both new fields. Then run `npm run check:cardlink`: the card titles
   are shared, so no alias should be needed. If it asks for a snapshot update, run
   `npm run check:cardlink -- --update` and confirm that the diff only adds Hickory Grove
   rows.
12. **Docs.** In `.claude/docs/design-sync.md`, under "### Faith & Spiritual Life":
    - Change "the only school with the area" to name both schools.
    - Set "Held by" to 2 for every card except `retreats`, which stays 1.
    - Update the "Captured from" line to match step 13.
13. **Verify Phase 1** (below), then **re-capture the design from the built app**.
    1. Run `npm run build && npx vite preview`.
    2. Run `npm run design:capture -- --page /school/hickory-grove-christian/ --area faith-spiritual-life --name "Faith & Spiritual Life Section" --refs "Hickory Grove Christian (tenets and outcomes); Charlotte Christian holds the statement-of-faith list" --sha <build commit> --out <dir>`.
    3. Write the capture over the design file with `write_files` (current etag as `if_match`).
    4. Run `npm run design:verify`, and update `As Built - Index.md`.

    Capturing from Hickory Grove shows the new blocks. In `design-sync.md`, record that
    Charlotte Christian's statement-of-faith list and Retreats card are no longer in the
    capture, and keep the earlier capture's archive copy. If the user prefers the
    Charlotte Christian capture, keep that one instead, and record that the new blocks were
    verified in the browser only.
14. **Commit** with explicit paths, push, and confirm the push
    landed (`git rev-parse HEAD` against `git ls-remote origin feat/hgfaithlife`). Set the
    INDEX row to `English shipped`. `/implement` runs its adversarial review here.

**→ STOP. `/implement` ends its turn here and waits for the user's review of the English
section.** In the hand-back, list the Open questions below for the user to settle while
reading the page. Nothing below runs until they confirm the English.

### Phase 2 — Every other locale

Scope: the **prose overlay** for `faith-spiritual-life` in every `PROSE_TRANSLATED` locale.
Read the list from the code: today it is `es bn ht te fr fa it hi ar`. **Plus two chrome
keys**: `faith.tenets` and `faith.outcomes` go in the nine other catalogs listed in
`TRANSLATED` (`src/lib/i18n.ts`), next to `faith.coreValues`, with key sets equal to `en`. For the mechanism, see
`.claude/docs/prose-translation-architecture.md` and `src/data/overlays/NOTES.md`.

0. **Chrome.** Add `faith.tenets` and `faith.outcomes` to the nine catalogs. Render them
   in the register of each locale's `faith.coreValues` and `faith.statementOfFaith`, and run
   `npm run check:chrome`.
1. **Splice, never re-extract.** For each locale, first run
   `node scripts/i18n_splice_work.mjs --lang <code> --topic faith-spiritual-life --dry-run`.
   Expect every shipped Charlotte Christian unit **kept**, the Hickory Grove units
   **added**, and **0 dropped**. A non-zero dropped count means a misconfigured extract:
   stop and investigate. Then run it without `--dry-run`.
2. **Translate every added unit** in `src/data/overlays/work/faith-spiritual-life.<lang>.json`.
   Fill only the empty `t` fields, and leave the Charlotte Christian translations untouched.
   Specifics for this school:
   - Every quoted school sentence is translated, as Charlotte Christian's were.
   - Keep these as published: proper names (Hickory Grove Baptist Church, HGBC Food Pantry,
     Grove Groups, Lions Connect, Lions in Prayer, Chapel at Home, Quiet Time Cafe, Here I
     Stand, Building on the Rock, Walking in Truth, Light Bearers, Summit Ministries, Judson
     College, Southeastern Baptist Theological Seminary (SEBTS), XChange, Operation
     Christmas Child, Club Flex, D-groups), Bible references (`Matthew 6:33`), course names
     and staff names.
   - Reuse each locale's Charlotte Christian renderings for shared words (chapel, devotion,
     discipleship, Bible class, Honor Code, NOT STATED).
   - Copy figures char-for-char (`10`, `13`, `4`, `200+`, `27`, `8:00 AM`, `9:30 AM`,
     `9:00 AM`, `7:00 to 7:15 a.m.`), with no re-grouping and no unit conversion. Dates
     follow NOTES.md's "Dates and session labels". Use **one translator per locale, each
     writing only its own file** (memory `parallel-locale-agents-collide`), and give each
     one the Student-name rule.
3. **Build the overlays.** Run
   `node scripts/i18n_build_overlay.mjs --topic faith-spiritual-life --lang <code>` for each
   locale, then
   check the work files by stamp as NOTES.md describes. `check_work_integrity` cannot
   validate a new-school splice (NOTES.md): assert directly instead. That means 0 lost, 0
   Charlotte Christian `t` changed, every new unit non-empty and none byte-identical to its
   English except the agreed keeps.
4. **Checks and browser passes** (below). In `fa` and `ar`, check two things in a browser:
   - **Closing-quote-then-period endings.** The appendix lists every quote that closes
     before the period.
   - **Ranges.** `TK–5`, `6–12`, `6–8`, `7–8`, `9–11`, `9–12`, `K–5`, `4–5`, `2026–27` and
     the `7:00 to 7:15 a.m.` span. Reword any range that reverses, and record it in NOTES.md
     as the `.5 credit` case was.
5. **Re-capture the Claude Design *Home* file.** It shows each school's research-area count
   and has been stale since before Read Reviews and the first faith school
   (`design-sync.md`, "Known drift"). Check the MCP with `mcp__claude-design__list_projects`.
   If it is not connected, stop and ask the user to reconnect it (`/design-login`).
   Then:
   1. Run `npm run build && npx vite preview`.
   2. Run the `# Home` command in `design-sync.md` with `--sha <build commit>`.
   3. Write the capture with `write_files`, passing the current etag as `if_match`.
   4. Run `npm run design:verify`.
   5. Update the drift note and `As Built - Index.md`.

   Re-capture *Faith & Spiritual Life Section* again only if the English review or
   Phase 2 changed the section.
6. **Ship.** Open the PR with `--body-file`. The PR text must name no student. Merge with
   `gh pr merge --squash --delete-branch`, check out `main` and pull, and flip the INDEX row
   to `Implemented` with the PR link. Add `## Implementation notes` to this plan. Say
   "merged — ready to deploy whenever you want it" and stop. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/faith-spiritual-life/hickory-grove-christian/*.md` (2) | written at planning; status line updated in step 2 |
| `src/data/schools.json`, `.claude/docs/faith-spiritual-life/**`, `.claude/docs/INDEX.md`, `src/content/faith-spiritual-life/**` | regenerated by the ingest |
| `src/data/faithLife/hickory-grove-christian.ts` | new |
| `src/data/faithLife.ts` | edit: `FaithOutcome` type, `tenets`/`outcomes` on `BeliefsCard`, import, `PROGRAMS` entry, comment |
| `src/components/FaithLife.tsx`, `src/index.css` (only if the design needs a new `fl-*` rule) | edit: render the two Beliefs blocks |
| `src/locales/en.json` (Phase 1), the nine other catalogs (Phase 2) | edit: `faith.tenets`, `faith.outcomes` |
| `scripts/i18n_fields.mjs` | edit: three faith paths classified as prose |
| `src/data/faithLife/README.md` | edit: second school, employment-statement rule, `tenets`/`outcomes` rules |
| `src/data/clubsPrograms/hickory-grove-christian.ts` | optional comment-only edit |
| `.claude/docs/DATA-SCHEMA.md`, `scripts/card_link_names.json` (only if `check:cardlink` asks) | regenerated |
| `.claude/docs/design-sync.md` | edit: Held-by counts, school names, Home drift note (Phase 2) |
| `src/data/overlays/work/faith-spiritual-life.<lang>.json`, `src/data/overlays/faith-spiritual-life.<lang>.json` (9 + 9) | Phase 2: spliced and translated, then rebuilt |
| `src/data/overlays/NOTES.md` | Phase 2: rollout note, plus any RTL rewording |
| `.claude/plans/INDEX.md`, this plan | status and notes |
| Claude Design: `Faith & Spiritual Life Section.dc.html` | designed (Phase 1 step 5), re-captured (step 13) |
| Claude Design: `Home.dc.html`, `As Built - Index.md` | re-captured in Phase 2 |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean. Trust `tsc -b`, not `tsc --noEmit`.
- [ ] `npm run i18n:report -- --residual` reports **0 unclassified** fields.
- [ ] `npm run build` is green with every chained check, including `check:schema`,
      `check:cardlink`, `check:seo`, `check:flags`, `check:spelling`, `check:consistency`,
      `check:live` and `check:runtime`.
- [ ] `node scripts/check_plain_language.mjs --file src/data/faithLife/hickory-grove-christian.ts`
      passes. Rewrite any flagged sentence of ours; verbatim school quotes stay as they are.
- [ ] `npm run coverage:floor`: the floor is unchanged (the area is excluded).
- [ ] **Name check** on the new data file, both research files and the generated note: no
      student name and no personal staff detail. Don't rely on word boundaries alone, and
      never print a found name back.
- [ ] **Real Chrome** (Playwright, `channel: 'chrome'`, headless, never `networkidle`) on
      `/school/hickory-grove-christian/` with every card open, at 1280 light, 1280 dark and
      390:
      - Nine cards in registry order: Chapel & Worship, Bible & Faith Classes, Small Groups &
        Discipleship, What the School Believes, What It Asks of Families, Service & Missions,
        Who Leads Spiritual Life, Faith Life for Parents, Ask the School. No Retreats.
      - Four tiles.
      - Families shows 7 PUBLISHED and 3 NOT STATED, with the legend.
      - Beliefs shows the mission, the tenets block with seven items, the outcomes block
        with three cells, the note, and no "Core values" or "Statement of faith"
        heading. It matches the Claude Design file.
      - Charlotte Christian's Beliefs card is unchanged: five values and ten articles,
        with no tenets or outcomes block.
      - Seven people, two with mailto links.
      - Twelve questions and "Research current as of November 26, 2026".
      - Navy `#14396e` and gold `#c5b358` are readable in both themes.
      - No kicker, no Compare button, page overflow 0.
- [ ] **Covenant Day** (faith-based, no data yet) and Cannon show **no** Faith & Spiritual
      Life section, chip or side-rail entry. Charlotte Christian's section is unchanged,
      with ten cards.
- [ ] `#faith-and-spiritual-life/chapel-and-worship` on the Hickory Grove page scrolls to the
      card and opens it.
- [ ] `npm run audit:mobile` for Hickory Grove at 320/360/390 finds no overflow and no
      clipped card. Log each audit to a file; never pipe it through `tail`.

### Phase 2 — Locales

- [ ] The splice reports 0 dropped in all nine locales, and the direct by-stamp assertions
      in step 3 pass.
- [ ] `npm run build` is green, including `check:live`, `check:runtime`, `check:dates` and
      `check:moneytext`.
- [ ] `check:fr`, `check:bidi`, `check:fa` and `check:hi` pass.
- [ ] `check_figures.py --topic faith-spiritual-life` and
      `npm run check:sepdrift -- --lang <code>` pass for all nine. `npm run check:digits`
      on the new units lists only deliberate rewordings. `npm run i18n:leaks -- --lang <code>`
      shows no new hit in the area.
- [ ] **Browser**, every card open: `es`, `fa` and `hi` at 1280, and `fa` and `ar` at 390.
      All prose is translated, chips are translated, ranges and quote endings are not
      reversed in RTL, and overflow is 0. Run `npm run audit:daterender` on the changed
      cards.
- [ ] `design:verify` passes for the re-captured *Home*.

## Risks

| Risk | Mitigation |
|---|---|
| The school's pages change before the build | Step 3 re-verifies; the live page wins and the research file records the change. |
| The user reads decision 2 as also covering every *mention* of a statement of faith | The four affected lines are listed under Open questions for the English review; dropping them is a small edit before Phase 2. |
| A splice re-extract blanks Charlotte Christian's translations | Phase 2 uses `i18n_splice_work.mjs` with `--dry-run` first; 0 dropped is required. |
| A student name leaks from a chapel or alumni page | The research files withhold them; there is a name check in Phase 1; the PR and commits name no student. |
| Ingest reorders `schools.json` | Restore HEAD order (step 4). |
| The tenets list reads as a statement of faith | Design step 5 makes it visibly unlike the numbered articles list; its heading says the school *lists* these beliefs; README rule. |
| A new render path leaks English to locales | Extractor rules in step 6; `i18n:report -- --residual` shows 0; Phase 2 browser check covers the two blocks in fa/ar. |
| The navy is too dark on the dark theme | Checked in Chrome at 1280 dark; raise it with the user if it fails rather than picking another hex silently. |

## Open questions

For the user at the English review. Each has a default.

- **Statement-of-faith mentions** (decision 2): four places quote or ask about a
  "Statement of Faith" without printing the document.
  1. Families: the "Family interview" row ("…share the Mission, Vision, and Statement of Faith…").
  2. Families: the NOT STATED row "Agreeing to a statement of faith".
  3. Families note: the job posting ("Committed Christian in agreement with the school's Statement of Faith").
  4. Ask the School, question 3.

  **Default:** keep all four, since they are the school's own admissions and employment
  wording. If the user says drop them, remove the row and the question, cut the Family
  Interview quote at "…share the Mission, Vision", and rephrase the note to "Committed
  Christian" plus "Active in a local bible-believing church." Then recount the tally
  (6 published, 3 not stated, or 6/2) and the question count ("Eleven questions") before
  Phase 2.
- **Design capture source** (step 13). **Default:** capture from Hickory Grove so the new
  blocks are in the design file, and record what that capture leaves out.

---

## Appendix — drafted card wording (from /faith-life Step 7, verbatim)

### Source constants

| Const | Label | URL |
|---|---|---|
| SPIRITUAL | Spiritual Life | /469460_2 |
| CHAPEL | Chapel & Worship | /chapel |
| HERE | Here I Stand | /here-i-stand-2 |
| MISSIONS | Missions & Service | /missions-and-service |
| LIONS | Lions Connect | /lions-connect |
| BELIEFS | Our Beliefs | /our-beliefs |
| ESOS | Expected Student Outcomes | /esos |
| ACADEMICS | Academics | /academics-home |
| ES | Elementary School | /elementary-school-home |
| MS | Middle School | /middle-school-home |
| HS | High School | /high-school-home |
| PERFORMING | Performing Arts | /performing |
| ATHLETICS | Athletics | /athletics-home |
| ADMISSIONS | Admissions | /admissions-home |
| EMPLOYMENT | Employment Opportunities | /employment |
| PTF | Parent Teacher Fellowship | /ptf |
| MYHGCS | myHGCS | /myhgcs |
| HOST | International Student Host Family Program | /host-families |
| ALUMNI_STAFF | Alumni at HG | /alumni-at-hg |
| ADVISORY | Advisory Board | /advisory-board |
| PREREG | Chapel Pre-Registration | /chapel-pre-registration |
| CALENDAR | 2026-2027 Calendar (PDF) | files…/calendar2026-2027.pdf |
| HS_CATALOG | 2026-2027 Course Selection Catalog | /course-selection-guide |
| MS_CATALOG | Middle School 2026-2027 Course Selection Catalog | /ms-courses |
| CHECKLIST_ES | New Elementary Families Admissions Checklist (PDF) | files…/newfamilyadmissionschecklistesnodate.pdf |
| CHECKLIST_MHS | New Middle and High School Families Admissions Checklist (PDF) | files…/newfamilyadmissionschecklistmhsnodate.pdf |
| HONOR | Student Honor Code (PDF) | files…/hgcs_studenthonorcode.pdf |
| DRESS | Middle & High School Dress Code (PDF) | files…/mshsdresscode.pdf |
| PROFILE | High School Profile 2026-2027 (PDF) | files…/2026-2027schoolprofile.pdf |
| ES_CHAPEL_SEP | Elementary Chapel recap, Sept. 17, 2026 (PDF) | files…/20260917_-_elementary_chapel_-_abraham_-_parent_handout.pdf |
| MSHS_CHAPEL_SEP | Middle & High School Chapel recap, Sept. 17, 2026 (PDF) | files…/20260917_-_ms-hs_chapel_-_abraham_-_parent_handout.pdf |
| ES_CHAPEL_OCT | Elementary Chapel recap, Oct. 22, 2026 (PDF) | files…/20261022_-_elementary_chapel_-_joseph_-_parent_handout.pdf |
| MSHS_CHAPEL_OCT | Middle & High School Chapel recap, Oct. 22, 2026 (PDF) | files…/20261022_-_ms-hs_chapel_-_joseph_-_parent_handout.pdf |
| LIONS_SEP | Lions Connect recap, Sept. 17, 2026 (PDF) | files…/20260917_-_lions_connect_-_parent_handout.pdf |
| LIONS_OCT | Lions Connect recap, Oct. 22, 2026 (PDF) | files…/20261022_-_lions_connect_-_hard_providences_-_parent_handout.pdf |
| DEVO_WK1 | Wednesday devotion recap, Aug. 19, 2026 (PDF) | files…/20260819_-_martin_luther.pdf |
| DEVO_WK2 | Wednesday devotion recap, Aug. 26, 2026 (PDF) | files…/20260826_-_augustine_of_hippo.pdf |

### colors

`{ brand: '#14396e', gold: '#c5b358' }`. The brand is from `src/data/brands.ts`. The gold is the
school's own gold, as used by its Learning Support section (user decision 2026-11-26, below).
Check light and dark.

### lead

- strong: `Hickory Grove Christian School is “a ministry of Hickory Grove Baptist Church”. The church started it in 1995. Students take Bible as a core class every year, and the church’s pastors teach in chapel.`
- muted: `The school says: “Christian faith is the basis for everything we do at Hickory Grove Christian School.”`
- sources for these facts sit on the Beliefs card (BELIEFS, PROFILE) and the Classes card.

### stats (4)

1. value `10` · label `chapels a year` · note `eight split mornings and two all-school chapels on the 2026–27 calendar` (SPIRITUAL, CALENDAR: on the Chapel card)
2. value `13` · label `years of Bible as a core class` · note `“from kindergarten through 12th grade”` (SPIRITUAL: on the Classes card)
3. value `4` · label `Bible credits to graduate` · note `one Bible course each year of high school, of 27 credits in all` (HS_CATALOG: on the Classes card)
4. value `200+` · label `Bible verses memorized` · note `by the end of elementary school, about one a week` (ES, SPIRITUAL: on the Classes card)

### chapel (EntriesCard)

headline: `Chapel meets ten times a year, mostly on Thursday mornings. Elementary students worship first, then middle and high school. Pastors from Hickory Grove Baptist Church teach, and students help lead the music.`

entries:
1. chip `{ band: 'TK–5' }` · title `Elementary chapel` · text `At 8:00 AM on chapel mornings. The 2026–27 series “follows men and women of the Bible who took a stand for God.”` · muted `Speakers in fall 2026 included the church’s Family Discipleship Pastors.`
   - check: the CHAPEL sentence is "This year's chapel series follows men and women of the Bible who took a stand for God." The quote starts at "follows", so the school's full stop is kept.
2. chip `{ band: '6–12' }` · title `Middle and high school chapel` · text `At 9:30 AM, in the sanctuary. The 2026–27 theme is “Here I Stand.” Middle schoolers take notes on chapel sheets, and high schoolers write in a Here I Stand journal.` · muted `Speakers in fall 2026 included the church’s Student Discipleship Pastors. Students in grades 6–12 wear Honor Dress to chapel.`
3. chip `{ word: 'all' }` · title `All-school chapels` · text `A Thanksgiving Chapel and a Christmas Chapel bring the whole school together. Performing arts students lead the Christmas Chapel.` · muted `Seniors also have a Senior Recognition Chapel in April.`
4. chip `{ word: 'weekly' }` · title `High school devotions` · text `Every Wednesday, high schoolers hear a devotion on one of “thirty-four witnesses who stood firm for Christ across twenty centuries.” A teacher or pastor tells each story.`
5. chip `{ band: '6–8' }` · title `Middle school devotions` · text `Teachers lead a devotion every morning. Before school, the Quiet Time Cafe is open for devotions and journaling, from 7:00 to 7:15 a.m.`
6. chip `{ band: '9–12' }` · title `Chapel Band` · text `High school students “audition, rehearse and help our worship pastors lead student-led chapel.”`
7. chip `{ band: '7–8' }` · title `Praise Team` · text `A middle school course “designed for students who desire to use their musical talents to lead others in worship.”`

note: strong `Families can watch or visit.` · text `“Every chapel is streamed live and saved to our archive.” Visitors 18 and older can register ahead.` · muted `Chapel dates and times follow the school’s 2026–27 calendar and its chapel sign-up form.`

sources: CHAPEL, SPIRITUAL, MS, HS, HERE, PERFORMING, MS_CATALOG, DRESS, CALENDAR, PREREG, ES_CHAPEL_SEP, MSHS_CHAPEL_SEP, ES_CHAPEL_OCT, MSHS_CHAPEL_OCT

verify:
- `The school's pages count chapel three ways: "Once a month" (/chapel), "One Thursday a month" (/middle-school-home) and "10 Chapels / each school year" (/469460_2). The 2026-27 calendar has 8 split chapel days plus Thanksgiving (a Friday) and Christmas: 10. March has two (Mar 11, Mar 25), and the Senior Recognition Chapel (Fri Apr 30) is an eleventh. The card prints "ten times a year"; the frequency question is on Ask the School.`
- `"HGBC pastors teach in chapel" (/469460_2) against "student-led chapel" (/performing). The card prints both as published: pastors teach, students help lead the music.`
- `Times are from the chapel pre-registration form: "Elementary Chapel (8:00am)", "Lions Connect (9:00am)", "MS/HS Chapel (9:30am)". The calendar feed stores the same times in UTC.`
- `Only the middle school page names the room ("the sanctuary"). The elementary chapel's room is not stated.`
- `Speakers are from the Chapel at Home recaps of Sept. 17 and Oct. 22, 2026. Each recap names its speaker and pastoral title.`
- `The school spells it "Quiet Time Cafe" (/middle-school-home) and "Quiet Time Café" (/469460_2). The card uses the division page's form.`
- `Whether chapel attendance is required is not stated on any public page. It is a NOT STATED row on What It Asks of Families.`

### classes (ClassesCard)

headline: `Bible is a required core class every year. Here is what each grade studies, and the four Bible credits a high school student needs to graduate.`

intro: text `“Bible classes are mandatory at the elementary, middle, and high school levels”.` · muted `Elementary students “memorize about one Bible verse each week.”`

groups:
1. name `Elementary School` · tally `Bible every day`
   - `{ label: 'Kindergarten–Grade 5', band: 'K–5', detail: 'Building on the Rock, “a biblical worldview and Bible survey curriculum.” “Each day begins with Scripture, a teacher devotional and prayer”.' }` (SPIRITUAL. Second quote: the school's sentence continues ", and students memorize…", so it closes before the period.)
   - `{ label: 'Kingdom Builders', band: '4–5', detail: 'A special class with “Biblically based lessons about things like communication, conflict resolution, problem solving, and sportsmanship”.' }` (ES)
2. name `Middle School` · tally `a Bible class every year`
   - `{ label: 'Building on the Rock', band: '6', detail: 'The Christian worldview, from Summit Ministries.' }`
   - `{ label: 'Walking in Truth', band: '7', detail: 'Compares the key beliefs of Christianity with Islam, naturalism and new spirituality. From Summit Ministries.' }`
   - `{ label: 'Light Bearers', band: '8', detail: 'Helps students “understand how they can live out their Christian worldview in a post-Christian culture.” From Summit Ministries.' }`
   - `{ label: 'Faith and leadership electives', band: '6–8', detail: 'Courses include Becoming a Young Man of God and Becoming a Young Woman of God (grades 7–8), Student on Mission, and Christian Leadership for selected 8th graders.' }`
3. name `High School` · tally `4 Bible credits to graduate`
   - `{ label: 'Old Testament Survey', band: '9', credit: '1', detail: 'College prep or honors. Students “survey the entire Bible through broad themes”.' }`
   - `{ label: 'New Testament Survey', band: '10', credit: '1', detail: 'College prep or honors. The books of the New Testament, its world and the life of Christ.' }`
   - `{ label: 'Christian Apologetics', band: '11', credit: '1', detail: 'College prep or honors. Students learn “the logical, philosophical, historical, and scientific evidences for the Christian faith.” Honors Introduction to Philosophy is the other choice.' }`
   - `{ label: 'Systematic Theology', band: '12', credit: '1', detail: 'College prep or honors. Students “solidify their understanding of doctrines essential to the orthodox Christian faith.” Honors Introduction to Ethics is the other choice.' }`
   - `{ label: 'Introduction to Bible', band: '9–12', detail: 'A course “recommended for students who have never attended a Christian school or are new to HGCS.” Enrollment is by the school’s recommendation.' }`

note: strong `Honors and college credit.` · text `Five honors Bible courses are dual enrollment courses through Judson College, “the undergraduate college program of Southeastern Baptist Theological Seminary (SEBTS).”` · muted `Middle school Spanish Immersion students take Bible in Spanish.`

sources: ACADEMICS, SPIRITUAL, ES, MS, HS, MS_CATALOG, HS_CATALOG, PROFILE

verify:
- `"13 Years / of Bible as a core class, from kindergarten through 12th grade" (/469460_2) against "From Transitional Kindergarten through 5th grade, students build a strong foundation in Bible…" (/elementary-school-home): TK would make 14. The tile prints the school's 13.`
- `/469460_2 names one 11th and one 12th grade course. The HS catalog (p. 22) also allows Honors Introduction to Philosophy (11th) and Honors Introduction to Ethics (12th) for the core unit. The card prints both.`
- `No Bible rule for a student who joins in 10th–12th grade is published. The catalog says "Minimum total credits: 1 per year" and "Transfer Credits: Students may earn and transfer credits from other accredited institutions." On Ask the School.`
- `The dual enrollment courses (HS catalog p. 4): Honors Old Testament, Honors New Testament, Honors Systematic Theology, Honors Introduction to Philosophy, Honors Introduction to Ethics.`
- `No page names a required Bible translation. Every chapel and devotion recap cites the ESV; the card does not say so.`
- `The 7th-grade catalog line spells "Chrisitanity"; the card paraphrases rather than quote the typo. The MS course is "Student on Mission" on the web page and catalog grid and "Students on Mission" on the catalog course page; the card uses the web page's form, as Student Clubs does.`
- `The Early Education Center uses "The Gospel Project for Preschool". Not on the card: the card starts at kindergarten.`

### retreats

**Omitted.** No retreat appears on any page, on the 2026–27 calendar or in the site's own search. The
question goes on Ask the School.

### groups (EntriesCard)

headline: `Where students talk about faith in smaller groups: monthly middle school groups and teacher-led high school groups.`

entries:
1. chip `{ band: '6–8' }` · title `Grove Groups` · text `“On the first Thursday of each month,” students meet by grade level to learn from “the lives of martyrs, missionaries, and mentors”, then split into small discipleship groups.`
   - check: "the lives of martyrs, missionaries, and mentors" — the source continues ", then break into…", so the quote closes before the comma.
2. chip `{ band: '9–12' }` · title `Discipleship groups (D-groups)` · text `“Every high school student is placed in a small discipleship group led by a teacher.” Groups meet in the midday Club Flex time on most Thursdays.`
3. chip `{ word: 'all' }` · title `A student pastor on campus` · text `The church’s “student discipleship pastor is on campus and available for one-on-one conversations with students.”`
4. chip `{ band: '8' }` · title `Christian Leadership` · text `A course for selected 8th graders, who “will be expected to commit to serving as campus leaders throughout the entire school year.”`

note: strong `Teams too.` · text `One goal of the athletics program is to “Disciple Athletes”: “We will strive to have great discipleship on our teams.”`

sources: SPIRITUAL, MS, HS, MS_CATALOG, ATHLETICS

verify:
- `"Groups meet several times a month" (/469460_2) against "On most Thursdays, this time is used for D-groups." (/high-school-home). The card prints the second, with its time slot; the question is on Ask the School.`
- `"first Thursday of each month" for Grove Groups does not match the chapel Thursdays on the calendar (Sept. 17, Oct. 22). Grove Groups have no calendar entries.`
- `/469460_2 does not say which divisions the student discipleship pastor serves.`
- `No elementary small group is published.`

### beliefs (BeliefsCard)

headline: `The school’s mission and vision, the beliefs it lists, and the outcomes it hopes for in every student, in the school’s own words.`

mission: `“Hickory Grove Christian School disciples students through a biblical worldview, forming them in academics, athletics, and arts to be committed to God, connected to the mission, and wise in Christ, that they may know Him and make Him known.”`

values: none. articles: none (user decision 2026-11-26).

tenets (NEW FIELD, user approval 2026-11-26; seven, verbatim, in page order, from /our-beliefs "At Hickory Grove Christian School, we believe:"; each matched live 2026-11-26; the school's straight apostrophes kept):
1. `All truth is God's truth, and that every subject should be taught through a biblical worldview.`
2. `Christian education is a shared effort among the school, the home, Hickory Grove Baptist Church, and the broader body of Christ.`
3. `Christian education must have an eternal perspective, focused on the salvation and discipleship of the next generation.`
4. `Success at HGCS is measured not only by students' leadership, excellence, and integrity, but most of all by a lifelong commitment to Jesus Christ.`
5. `A rigorous environment across academics, athletics, and the arts fully prepares students for the challenges ahead of them.`
6. `Students learn in different ways, so our teachers use a variety of instructional strategies to support each learner.`
7. `Each student is created in the image of God, with unique spiritual, academic, physical, mental, and emotional needs.`
(The design settles whether items carry quote marks, as `articles` do. Whichever it picks, the words stay char-for-char.)

outcomes (NEW FIELD; three, from /our-beliefs, /469460_2 and /academics-home, each matched live):
1. `{ name: 'Committed to God', text: 'Devoted to the Lord with rightly ordered loves' }`
2. `{ name: 'Connected to the Mission', text: 'Joined to the body of Christ in shared mission' }`
3. `{ name: 'Wise in Christ', text: 'Discerning between the biblical wisdom of God and the wisdom of the world' }`

note: strong `A ministry of Hickory Grove Baptist Church.` · text `Its vision: “To know Christ and to make Him known through Christian education.”` · muted `The school verse is Matthew 6:33. The school holds dual accreditation through Cognia and the Association of Christian Schools International (ACSI).`

sources: BELIEFS, ESOS, ACADEMICS, PROFILE, SPIRITUAL (and /accreditation)

verify:
- `The mission is printed in three wordings: the one on the card (/our-beliefs, /academics-home, /469460_2); "To disciple students in the Gospel story of creation, fall, redemption, and restoration, equipping them to be Committed to God, Connected to the Mission, and Wise in Christ." (/admissions-home, /esos); and "To equip students to serve God in the 21st century by providing an excellent academic program founded upon a biblical worldview." (Mallard Creek EEC interest form). The card prints the belief page's.`
- `By the user's decision (2026-11-26) the card prints no statement of faith. The belief pages carry none. The only document the site calls "the HGCS Statement of Faith" is a marriage, gender and sexuality statement linked from the employment application. It stays in the research file.`
- `/esos also lists what students "will" do under each outcome. Those lists stay in the research file to keep the card short.`
- `/our-beliefs vision paragraph says "completed in the fear of the Lord"; /academics-home says "consummated". The card does not quote that sentence.`

### families (FamiliesCard)

headline: `What the school’s public pages say about faith when you apply and once you enroll, and what they leave unsaid.`

groups:
1. name `When you apply`
   - `{ label: 'Pastor reference', status: 'published', detail: 'Every grade’s checklist lists a “Personal Recommendation form” from the family’s pastor. For middle and high school it is “from student/family’s pastor”.' }` (CHECKLIST_ES, CHECKLIST_MHS)
   - `{ label: 'Family interview', status: 'published', detail: '“Family Interview is an opportunity to share the Mission, Vision, and Statement of Faith, and to assess whether HGCS is the right fit for your family”.' }`
   - `{ label: 'Student questionnaire', status: 'published', detail: 'Applicants in grades 4–12 fill in a Student Questionnaire. Its questions are not on the public site.' }`
   - `{ label: 'Church members apply first', status: 'published', detail: 'Applications opened on November 2, 2026, for church members, Early Education Center students and siblings, and on November 16 for all new families.' }` (ADMISSIONS)
   - `{ label: 'A parent’s own faith', status: 'notStated', detail: 'The public pages do not say whether a parent must be a Christian or belong to a church. The Mallard Creek preschool’s interest form does ask about the family’s church and the parents’ faith.' }`
   - `{ label: 'Agreeing to a statement of faith', status: 'notStated', detail: 'The public pages do not say whether families sign one.' }`
2. name `Once enrolled`
   - `{ label: 'Bible class', status: 'published', detail: 'Required every year.' }`
   - `{ label: 'Honor Code', status: 'published', detail: '“Every high school student signs our Student Honor Code, a covenant organized around our three Expected Student Outcomes.”' }`
   - `{ label: 'Dress for chapel', status: 'published', detail: '“Honor Dress is required for all chapel programs in 6th-12th grades and at certain special events.”' }`
   - `{ label: 'Chapel attendance', status: 'notStated', detail: 'The public pages do not say whether chapel is required.' }`

(7 published, 3 not stated; the tally is computed.)

note: strong `Teachers and staff must share the faith.` · text `The job posting asks for a “Committed Christian in agreement with the school’s Statement of Faith” who is “Active in a local bible-believing church.”` · muted `The school keeps its Parent-Student Handbook and its online application behind a family login.`

sources: CHECKLIST_ES, CHECKLIST_MHS, ADMISSIONS, ACADEMICS, HS, HONOR, DRESS, EMPLOYMENT, MYHGCS

verify:
- `The Parent-Student Handbook is "available to current families in ParentSquare and the FACTS Family Portal" (/myhgcs). The online application (FACTS) needs a login. The pastor's Personal Recommendation form and the Student Questionnaire are not posted.`
- `Student Questionnaire: elementary checklist "(4th & 5th)"; middle and high school checklist, every applicant.`
- `Mallard Creek EEC interest form (Google Form) asks "Are you and your family an active member of a church?", church involvement, "your walk with the Lord (description of the parent's faith)" and whether parents "support all aspects of the school's mission". It states no admission rule and covers the preschool only.`
- `The Honor Code is signed at the Aug. 27 "Chapel/Honor Code Ceremony" by INFERENCE only. The MS page links the same code; whether MS and ES students sign it is not stated.`
- `By the user's decision (2026-11-26) the MS/HS dress code's presentation sentence is not on the card.`
- `The employment line is quoted from /employment; the employment application also asks for a church reference.`

### service (EntriesCard)

headline: `Seniors go on a mission trip to the Dominican Republic each year, and the whole school gives to a cause each quarter.`

entries:
1. chip `{ band: '12' }` · title `Senior Mission Trip` · text `“Our seniors serve together annually on a mission trip to the Dominican Republic.” The 2026–27 trip is in January 2027.`
2. chip `{ band: '9–11' }` · title `High School Mission Week` · text `“While the seniors are away, the rest of the high school serves the local community through Mission Week.”`
3. chip `{ word: 'all' }` · title `Quarterly missions collection` · text `“Each quarter, our school family gives to support a local ministry or cause.” Causes named include XChange, an addiction ministry of the church; Operation Christmas Child; and a Baby Bottle Drive “supporting the sanctity of human life”.`
4. chip `{ word: 'weekly' }` · title `HGBC Food Pantry` · text `Spanish Immersion students “serve as interpreters each week as our pastors share the Gospel with our community.” The high school aquaponics lab “grows food for the HG Food Pantry.”`
5. chip `{ band: '7–8' }` · title `Student on Mission` · text `A middle school course that “studies what God is doing around the world and how students can serve Charlotte.”`
6. chip `{ band: '9–12' }` · title `Global Missions & Language Certificate` · text `Students earn it with three units of a foreign language, honors Bible courses, “at least one international mission trip” and a missions practicum or internship.` · muted `The course catalog adds one more requirement: “Be an active church member of like-minded faith, verified through a positive letter of recommendation by a pastor, preferably the student’s Youth Pastor.”`
7. chip `{ word: 'all' }` · title `Host families` · text `Church families and school families can host an international student. The school calls it “missions in reverse”.`

note: strong `Outreach beyond Charlotte.` · text `The school names “international outreach efforts in the Dominican Republic, Ecuador, Haiti, and Kenya.”` · muted `The school’s pages give no service-hour requirement.`

sources: MISSIONS, HS, ACADEMICS, MS_CATALOG, HS_CATALOG, HOST, CALENDAR

verify:
- `The trip's cost, whether it is in tuition and whether every senior goes are not stated. The tuition page and PDF list no trip charge.`
- `LEAD only, not used: an orphan /aquaponics page (in no menu or sitemap, undated) says "each year our senior class has the opportunity to participate in mission trips—both domestic and international". The card prints the nav-linked page.`
- `Mission Week has no calendar entry; INFERENCE that it is the same January week as the senior trip.`
- `Which quarter each collection runs is not stated. Baby Bottle Drive quote: "Baby Bottle Drive: supporting the sanctity of human life".`
- `Global Missions certificate: /missions-and-service lists four requirements; HS catalog p. 9 lists six, adding the church-member and pastor-letter requirement and "Meet all HGCS graduation requirements". The card prints the web page and adds the catalog's church requirement in muted text.`
- `The Student Clubs card's code comment says the site no longer shows the four countries or aquaponics; /academics-home and /high-school-home show both on 2026-11-26.`

### staff (FaithStaffCard)

headline: `Pastors from Hickory Grove Baptist Church teach in chapel and lead the parent sessions. The school lists no chaplain of its own.`

people:
1. `{ name: 'Clint Pressley', role: 'Senior Pastor, Hickory Grove Baptist Church; Advisory Board member' }`
2. `{ name: 'Nick Gentili', role: 'Student Discipleship Pastor, Hickory Grove Baptist Church' }`
3. `{ name: 'Jacob Prince', role: 'Student Discipleship Pastor, Hickory Grove Baptist Church' }`
4. `{ name: 'Campbell Benfield', role: 'Family Discipleship Pastor, Hickory Grove Baptist Church' }`
5. `{ name: 'Ben Harris', role: 'Family Discipleship Pastor, Hickory Grove Baptist Church' }`
6. `{ name: 'Fernando Rogante', role: 'Bible Department Head, High School', email: 'fernandorogante@hgchristian.org' }`
7. `{ name: 'Austin Turner', role: 'Middle School Bible, PE', email: 'austinturner@hgchristian.org' }`

note: strong `Teachers and leaders share the Wednesday devotions.` · muted `Speakers in fall 2026 included the head of school and the high school principal.`

sources: SPIRITUAL, PROFILE, ADVISORY, ES_CHAPEL_SEP, MSHS_CHAPEL_SEP, ES_CHAPEL_OCT, MSHS_CHAPEL_OCT, HS_CATALOG, ALUMNI_STAFF, DEVO_WK1, DEVO_WK2, and /our-staff

verify:
- `No school chaplain or spiritual life director appears on any page or in the directory. The directory (/our-staff, 116 entries) gives department and email only, no titles.`
- `The four discipleship pastors' titles are from the Chapel at Home and Lions Connect recaps (Sept. 17 and Oct. 22, 2026). None has a published email on the school site.`
- `Clint Pressley's title is from the 2026-27 profile masthead; he is listed on /advisory-board.`
- `Fernando Rogante: the HS catalog lists "Bible- Fernando Rogante fernandorogante@hgchristian.org" among "the department heads". Austin Turner's role is from /alumni-at-hg; both emails are also the directory's.`
- `Devotion speakers: Week 1 the Head of School (Aug. 19), Week 2 the High School Principal (Aug. 26), from the recaps.`

### parents (EntriesCard)

headline: `A parent session on chapel mornings, take-home recaps of every chapel and devotion, and a monthly prayer group.`

entries:
1. chip `{ word: 'monthly' }` · title `Lions Connect` · text `“Lions Connect meets on chapel mornings, between Elementary Chapel and Middle and High School Chapel, so you can worship with your child and stay for both.” Church pastors lead it, at 9:00 AM.` · muted `Fall 2026 topics were “Because I Told You So” and “Hard Providences.”`
2. chip `{ word: 'monthly' }` · title `Chapel at Home` · text `After every chapel, families get a recap with the message, its Scripture and “a few questions to talk through with your child.” There is an elementary version and a middle and high school version.`
3. chip `{ word: 'weekly' }` · title `Devotion recaps` · text `A one-page recap of each high school Wednesday devotion, “so you can ask your student about it at dinner or in the car.”`
4. chip `{ word: 'monthly' }` · title `Lions in Prayer` · text `“Parents gather once a month to pray for our students, staff and school.” Meetings are at 8:00 AM on the first Monday of the month.`

note: strong `The Parent Teacher Fellowship.` · text `“We call ourselves a fellowship because we are believers united in furthering Kingdom Education.”` · muted `Contact: Cynthia Sampson, cynthiasampson@hgchristian.org.`

sources: LIONS, LIONS_SEP, LIONS_OCT, PREREG, CHAPEL, HERE, ES, PTF

verify:
- `Lions Connect's time is from the chapel pre-registration form: "Lions Connect (9:00am)".`
- `Lions in Prayer is listed on the elementary page only; its room and whether it is for every division are not stated.`
- `/lions-connect also lists recommended books; not on the card.`

### ask (FaithAskCard)

headline: `Twelve questions to take on the tour. Each covers something the school’s public pages leave unanswered or say two ways.`

questions (12):
1. `Does a parent need to be a Christian, or belong to a church, for a child to be admitted?`
2. `What does the pastor’s recommendation form ask? What if our family does not have a pastor?`
3. `May we read the Statement of Faith shared in the family interview? Do families sign it?`
4. `Is chapel required for every student?`
5. `How often does chapel meet? One page says once a month, and the 2026–27 calendar has two in March.`
6. `How often do high school discipleship groups meet? One page says several times a month, and another says most Thursdays.`
7. `Does every senior go on the Dominican Republic mission trip, and is it part of tuition?`
8. `How many Bible credits does a student who joins in 10th, 11th or 12th grade need?` (widened from "11th or 12th" at the review, to match the Classes verify note)
9. `Are there any retreats, for any grade?`
10. `Are service hours required?`
11. `Do elementary and middle school students sign the Honor Code too?`
12. `May we read the Parent-Student Handbook before we enroll?`

asOf: `November 26, 2026`

### Review-lessons check (Step 7, review-lessons.md)

1. Counts: "ten times a year" = 10 calendar chapels; "Five honors Bible courses" = 5 listed; "Twelve questions" = 12; "four Bible credits" = 4; Families 7 published / 3 not stated (computed, never typed). OK.
2. No count in shared chrome headings (all headings are chrome, unchanged). OK.
3. No typed tally. OK.
4. Mid-sentence quotes close before our period: Bible mandatory "…levels”."; "Each day begins…prayer”."; Grove Groups "…mentors”,"; Family Interview "…family”."; Kingdom Builders "…sportsmanship”."; OT Survey "…themes”."; Baby Bottle "…life”."; "missions in reverse”."; outcomes "…Christ”.". OK.
5. No quote re-capitalized: Praise Team and Apologetics quotes start mid-sentence at the school's own lower case; the faith sentence is introduced by "The school says:". The catalog's "Be an active…" keeps its capital after a colon. OK.
6. Things a family signs: the Honor Code sentence is quoted whole; the Statement of Faith is not printed by decision. OK.
7. Only what happened: speakers "in fall 2026" (Sept. 17, Oct. 22, Aug. 19, Aug. 26) all past; Lions Connect topics past. The January 2027 trip is stated as on the calendar ("is in January 2027"), not as having happened. OK.
8. Partial lists: "Causes named include", "Courses include", "Speakers … included". OK.
9. Second places: Student Clubs service card (senior trip, Mission Week, food pantry, quarterly collection, Student on Mission, certificate) agrees with these cards. Admissions guide (pastor form, family interview "mission, vision and statement of faith", Nov 2, 2026 / Nov 16 windows) agrees. Arts (Chapel Band, Bible Sketch) agrees. College Support prints the profile's credit table (Bible 4); the card says "4 Bible credits … of 27". No parent-facing edit needed elsewhere. One stale CODE COMMENT in `src/data/clubsPrograms/hickory-grove-christian.ts` (lines 8–11) says the site no longer shows the four-country trips or aquaponics; both are live. Optional comment-only fix, not a translated unit.
10. One name: "Student on Mission" (as Student Clubs); "Quiet Time Cafe"; "Hickory Grove Baptist Church" spelled out in parent text (HGBC only inside titles the school prints: "HGBC Food Pantry"). OK.
11. Disagreements: chapel frequency, D-group frequency, the three mission wordings, 13 vs TK, 11th/12th alternatives, certificate requirements, the aquaponics LEAD. Each has a verify note and, where a parent would care, an Ask question. OK.
12. Sources: every quote's page is in that card's `sources`; the tiles' and lead's pages sit on the cards that cover them. No bare homepage. OK.
13. Bookkeeping is in `verify` only. The chapel note's "follow the school's 2026–27 calendar and its chapel sign-up form" mirrors Charlotte Christian's shipped wording. OK.
14. Research files cleaned (Step 4). OK.
15. Plain language: run `node scripts/check_plain_language.mjs --file src/data/faithLife/hickory-grove-christian.ts` in /implement. Longest sentences: the Lions Connect quote (school's words, verbatim), the certificate muted quote (verbatim).
16. Two new fields (`beliefs.tenets`, `beliefs.outcomes`), approved by the user 2026-11-26: designed in Claude Design first, `PATH_OVERRIDES` entries in `scripts/i18n_fields.mjs`, the new type written as a plain multi-line `export type`.
17. Re-capture the Claude Design *Home* file at the end of Phase 2.
18. Second color is the school's own gold #c5b358.

## Implementation notes

- **Step 3 skipped**: the build ran on 2026-11-26, the planning day.
- **Two extra extractor paths**: `groups.note.strong` and `groups.note.muted` in
  `scripts/i18n_fields.mjs`. Hickory Grove is the first school with a Small Groups note
  ("Teams too."), so `i18n:report -- --residual` flagged the path as unclassified.
- **`// plain-ok: rigor`** on the fifth tenet: the hook flagged "rigorous", which is the
  school's own verbatim word.
- **Design step**: the Hickory Grove view was added to *Faith & Spiritual Life Section* after
  Charlotte Christian's Beliefs card and approved by the user ("Build it as designed"):
  the beliefs unnumbered with a gold rule and no quote marks, and the outcomes in the
  Core-values cell look. Before the re-capture, that file was copied server-side to
  `archive/2026-11 pre-hgfaithlife/Faith & Spiritual Life Section (Charlotte Christian +
  Hickory Grove design).dc.html`, which keeps Charlotte Christian's statement-of-faith list
  and Retreats card. The re-capture is from Hickory Grove at `ae07be00` (37,559 bytes).
  `app-css/app-4.css` was re-written (36,429 → 36,652 bytes, the three new rules), because a
  capture is unstyled in the project until its CSS chunk is written. Both writes were
  verified byte for byte. `As Built - Index.md` was updated.
- **Review fix outside the plan's scope (developer's pick)**: `/faith-life`'s Beliefs scoring
  row now counts `tenets` and `outcomes`, and its 60% bar now names Hickory Grove's 9 cards.
  `.claude/SKILLS.md` is dated to match.
- **Follow-up, not fixed here**: Course Offerings marks only three of Hickory Grove's honors
  Bible courses as dual enrollment (Old Testament, New Testament, Systematic Theology), while
  the HS catalog (p. 4) and this section's Classes card list five (adding Honors Introduction
  to Philosophy and Honors Introduction to Ethics). The gap is in Course Offerings, existed
  before this plan, and is out of its scope. It belongs to the next consistency or Course
  Offerings pass.
- **Ask question 8 widened at the review** from "11th or 12th grade" to "10th, 11th or
  12th grade", to match the Classes card's verify note ("No Bible rule for a student who
  joins in 10th–12th grade is published"). Still twelve questions.

### Adversarial review 2026-11-26

- **Pass 1** (commit reviewed `64b62cfa`): 6 found, 4 confirmed, 2 rejected, 4 fixed, 0 declined.
  - R1 INDEX row still In progress: rejected. The English shipped flip is the hand-back step, after the review.
  - R2 two unlisted extractor paths (`groups.note.*`): rejected as a defect. They are needed; now recorded above.
  - R3 `/faith-life` still described a one-school area, and its Beliefs scoring row lacked tenets/outcomes: fixed (outside the plan's scope, developer's pick), with `.claude/SKILLS.md` dated.
  - R4 tenets rule missing from `DATA-SCHEMA.md`: fixed in `gen_data_schema.mjs`, regenerated.
  - R5 Course Offerings marks 3 of the 5 dual-enrollment Bible courses: fixed by recording only (follow-up above; no app edit, out of scope).
  - R6 Ask question 8 narrower than its verify note: fixed (widened to 10th–12th).
- **Pass 2** (fix diff `64b62cfa..bff13ecc`): 1 found, 1 confirmed, 0 rejected, 1 fixed, 0 declined.
  - The plan appendix still showed question 8's old wording: fixed (appendix line and the note above). Fixed, not re-reviewed.

### Phase 2 — 2026-11-27

- **Approval:** the user approved the English ("The English page is approved") and asked
  for Phase 2 only. The Open-question defaults stand: all four statement-of-faith mentions
  kept, design capture from Hickory Grove.
- **Splice:** 196 kept, 157 added, 0 dropped in each of the nine locales. Translated by one
  agent per locale into scratchpad stamp maps, applied centrally by stamp, and asserted
  against `HEAD`: 157 filled, 0 Charlotte Christian `t` changed, 0 empty, 0 lost.
- **Deviation: division tabs.** es, bn and ar translated the `Elementary School` and `High
  School` tab labels, while the shared `Middle School` unit is Latin in every locale (a
  shipped Charlotte Christian unit this plan may not change). They were set to the Latin
  form, so the three tabs read as one set in all nine locales.
- **Chrome:** `faith.tenets` and `faith.outcomes` in all ten catalogs; `check:chrome` green.
- **Checks:** `tsc -b` and `npm run build` green. `check:runtime`, `check:fr`, `check:bidi`,
  `check:fa`, `check:hi`, `check:dates`, `check:moneytext`, and `check:sepdrift` and
  `check_figures.py` per locale all pass. `check:digits`: 1,413 units, 0 to review.
  `i18n:leaks`: one area hit in es (`“Israel”`, a recorded keep). `audit:daterender`
  (full sweep, render code changed): clean in all nine locales.
- **Browser:** es, fa and hi at 1280, fa and ar at 390, every card open. Nine cards, seven
  tenets, both headings translated, overflow 0, ranges isolated and drawn in order.
- **Found, not fixed (outside scope):** at 390px an isolated figure can wrap at its dash
  (`2026–27` in fa and ar). It is site-wide: 7 such wraps on Hickory Grove's fa page, 5 in
  other areas. The fix is a render-layer rule keeping an isolate on one line. Recorded in
  `src/data/overlays/NOTES.md`.
- **Claude Design:** *Home* re-captured from `a99df2f7` (18,732 bytes, `design:verify`
  byte for byte), closing the drift note; `As Built - Index.md` updated. The Home command
  needs `--card-links off`, now in `design-sync.md`. *Faith & Spiritual Life Section* was
  not re-captured: the English did not change after Phase 1.
- Phase 2 is not adversarially reviewed (per `/implement`).
