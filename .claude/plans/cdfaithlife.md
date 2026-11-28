---
name: cdfaithlife
title: Add Covenant Day School to the Faith & Spiritual Life research area (third school), and bring the two shipped faith sections under the E-for-everyone rule
status: implemented
phases: 2
created: 2026-11-27
branch: feat/cdfaithlife
prs: [541]
---

# Add Covenant Day School to Faith & Spiritual Life

## Goal

Covenant Day School's page gains the Faith & Spiritual Life section with all ten cards:
chapel, Bible classes, retreats, small groups, beliefs, what it asks of families, service,
who leads, faith life for parents and Ask the School. Every card is built from the school's
own **public menu pages**. It works when the section renders in English with every card
correct and verified (Phase 1), then in every `PROSE_TRANSLATED` locale (Phase 2).

The plan also does three things alongside:
- It corrects one overclaiming sentence on Covenant Day's Student Clubs Service card.
- It writes the user's new standing "rated E for everyone" rule into the `/faith-life` skill.
- **It brings the two shipped faith sections under that rule** (user request, 2026-11-27).
  Charlotte Christian's What the School Believes card drops its marriage article, and the
  Charlotte Christian and Hickory Grove research files, generated notes, content chunks,
  translations and one dev note lose every passage on that topic.

## Context

- **The area exists.** Plan `faithlife` (PR #537) built it for Charlotte Christian, and
  plan `hgfaithlife` (PR #539) added Hickory Grove Christian. The types and the card
  registry are in `src/data/faithLife.ts` (`FAITH_LIFE_CARDS`, `PROGRAMS`), the renderer
  is `src/components/FaithLife.tsx`, and the data rules are in
  `src/data/faithLife/README.md`. **This is a data-only add.** Every field the draft uses
  already exists (`values`, `outcomes`, `articles`, `note`, `tally`, `credit`-less rows,
  the `weekly`/`all`/`yearly` word chips), so there is no new type, component, CSS, chrome
  key or extractor rule.
- **Model file:** `src/data/faithLife/hickory-grove-christian.ts` (its `BASE`, `src()`,
  `doc()` helpers and Source constants pattern). Charlotte Christian is the model for
  depth and for a card with `articles`.
- **Second places**, already checked at planning (review-lessons item 9):
  - Admissions (`src/data/admissionsPrograms/covenant-day.ts`) states the parent faith rule
    in the process page's wording and the JK–11 pastor's form. It agrees with the draft.
  - Course Offerings (`COVENANT_DAY` in `src/data/courseOfferings.ts`) has the same four HS
    Bible course names, "3.5 units" and weekly JK/K chapel. It agrees.
  - College Support has "3.5 units of Bible". It agrees.
  - Arts (`src/data/artsPrograms/covenant-day.ts`) names "Zach Thompson, Worship and Choir
    Teacher", the two worship bands and Worship Leadership. It agrees, and the Staff card
    uses the Arts form of the title.
  - **Student Clubs disagrees, once:** `src/data/clubsPrograms/covenant-day.ts` →
    `service.subhead` reads "Program-based rather than hours-logged: no service-hour
    requirement exists, and the school publishes no annual totals." The evidence (every
    page, document and 2026-27 email searched) is only that **no requirement is
    published**. The new Service card says "The school publishes no service-hour
    requirement", so the Clubs line is reworded to match (step 7). That sentence is an
    extracted unit (`covenant-day:service.subhead` in `src/data/overlays/work/student-clubs.<lang>.json`),
    so Phase 2 carries it into nine locales. The `gap` flag beside it never renders
    (`src/lib/flagVisibility.ts`) and is left alone.
- `scripts/data_dependents.json` already lists `src/data/faithLife/<slug>.ts` against
  Course Offerings, so nothing new needs wiring there.
- The working tree is shared. At planning it already held unrelated modified
  `source-material/` files (after-school, international-travel, sports) and an untracked
  `.claude/plans/consistency7-data/` folder. **Never stage them.**

## Decisions

User decisions, 2026-11-27, at `/faith-life` Step 6. This is the approval record:

1. **Proceed.** The user, verbatim: *"Do not discuss the human sexuality part, always
   remember this site should be rated E for everyone. You can proceed"*.
   - `beliefs.articles` holds **only** the nine-point "brief summary of what we believe"
     from /about-us/who-we-are, in page order, char-for-char.
   - The further text that follows it on that tab is never printed, quoted, summarized or
     described: not in a card, a `verify` note, a commit, a PR or a reply. The research
     files were already cleaned of it at planning.
   - This is a standing rule (memory `site-rated-e-for-everyone`), and step 8 writes it into
     the skill.
2. **The school–church tie goes on existing cards.** No new card and no design step:
   - the church note on What the School Believes;
   - the $400 church-member discount and the staff and trustee rows on What It Asks of
     Families;
   - the Head of School note on Who Leads.
3. **Cards cite public menu pages only.** Nothing is printed from these:
   - the school's comms archive (`/lions-web-pages-clone/comms-archive`);
   - any other unlinked page (`/lions-web-pages-clone/*`, `/convocation`,
     `/baccalaureateservice`, `/pancakeswithpastors`);
   - the 2026-27 Viewbook (reached from an unlinked download page).

   So the Wednesday chapel times, the Moms in Prayer time and room, the student chaplain
   team, the HS Seminars, the adult-led MS Bible studies and the fall 2026 Doulos Day
   partners are **not printed**. The draft carries each in `verify` and, where a parent
   would ask, on Ask the School.

   Confirmed public at planning: the calendar (header "Calendar" link on every page), the
   Campus Map and the Booster Club (both in the main menu), the curriculum and milestone
   tiles (on the division pages), and the HS Profile and Tuition Terms PDFs (linked from
   /academics/college-guidance and /admissions/tuition-financial-aid).
4. **Colors:** `colors.brand` is `#002855` (brands.ts). `colors.gold` is `#1E7EA7`, the
   school's own `--secondary-color` in its site theme. The site uses no gold.

5. **Clean up the two shipped faith sections** (added after the plan was first written).
   The user, verbatim: *"include in this plan to clean up those school's religious sections
   to for the rated E rule. Remove the marriage text"*. Scope:
   - Charlotte Christian: the card's marriage article and every research passage on that
     topic.
   - Hickory Grove: the employment-linked document's text (its title names the topic) and
     every research passage on the topic.

   Planning decisions inside that scope:
   - **Charlotte Christian's article 7 stays.** It reads "We believe that man, male and
     female, was created in the image of God, but fell into sin…". That is doctrine on
     creation and the fall, not on marriage or sexuality.
   - **The SHOW KINDNESS quote stays.** It names gender only in a list of things no one is
     judged by.
   - **The `faithlife` and `hgfaithlife` plans are left as written.** They are records of
     what shipped and why, and they quote none of the text: they only name the decisions.
   - **Course catalogs in other areas are out of scope.** For example, the Hickory Grove HS
     catalog's apologetics line survives in Course Offerings research. They are not the
     religious sections the user named. Only the copy of that line inside the faith
     research file goes.

Planning decisions:

- **No `tenets`.** The three core values are multi-sentence paragraphs. The first one is
  quoted in the lead, and the four-commitment community statement stays in the research
  file. **Why:** the card already carries mission, five pillars, six outcomes and nine
  articles.
- **The five vision pillars go in `values`** (`{ name, verse }`, verse as the school
  prints it: "Phil 4:8"). **Why:** this is exactly the shape `values` was built for.
  **Reversed at review (2026-11-27):** `values` renders under the fixed heading "Core
  values", and the school's core values are a different three, so the pillars were dropped
  (developer's pick). See Implementation notes.
- **The six Portrait of a Graduate items go in `outcomes`**, each name with the first
  sentence of its description, verbatim. **Why:** an outcome takes a one-line description.
- **Sources link the division page that holds a tile**, not the Finalsite pop-up endpoint.
  The pop-up ids stay in the research file. **Why:** a parent clicking a pop-up URL gets an
  HTML fragment.
- **Fort Caswell is a Retreats note, not a cell.** **Why:** its faith content is in the
  Classic Magazine only (a LEAD).
- **The chapel day and time are not printed and not called "not published".** **Why:** the
  school does publish them, but only in emails the user excluded. The question goes on Ask
  the School.

## Approvals needed

None outstanding. The four decisions above are the user's, dated 2026-11-27. This adds a
school to an existing area with existing fields, which needs no UX approval (§6 of
`DATA-SCHEMA.md`). **Deploying** is the user's call at that moment, as always.

## Source material

Written at `/faith-life` time, **uncommitted** in the working tree. `/implement` commits
and ingests them:

- `source-material/faith-spiritual-life/covenant-day/Covenant Day School - Faith and Spiritual Life - Official Site Research.md`:
  - the first pass, with the second pass's 24 corrections folded in, each marked
    "(second pass)";
  - re-verified 2026-11-27 under `## Method` → "Re-verification 2026-11-27 (/faith-life)":
    41 quoted strings and 13 staff rows, nothing moved.
- `source-material/faith-spiritual-life/covenant-day/Covenant Day School - Faith and Spiritual Life - Second Pass Gap Research.md`.

Faith-based confirmation (/about-us): "Covenant Day is a JK-12 Christ-centered college
preparatory school located in Matthews, NC. Covenant Day is a ministry of Christ Covenant
Church (PCA) and serves approximately 1,030 students." The footer address is 800 Fullwood
Lane, Matthews, NC 28105.

**LEADs, never printed:**
- the 2025-2026 Classic Magazine and the Annual Report 2025-2026, both read by eye from
  Issuu images: the Spiritual Formation Growth Journey, "Bible With Parent", soccer
  pre-game chapels, the church funding figures;
- the superseded 2025-26 HS Profile ("3 units of Bible").

## Out of scope

- Anything outside the faith area that mentions the topic: course-catalog research, the
  Student Clubs affinity-group wording, `DATA-SCHEMA.md`'s sports "gender" field. The
  user's request named the religious sections.
- Compare (the area stays in `COMPARE_DEFERRED_TOPICS`) and the `/add-school` floor (it
  stays in `FLOOR_EXCLUDED_AREAS`).
- Any card from the excluded sources (decision 3).
- Fixing the school's own inconsistencies (the off-topic address, enrollment and tuition
  conflicts in the research file).

## Steps

### Phase 1 — English

1. **Branch.** Run `git status --short` first, then
   `git checkout main && git pull && git checkout -b feat/cdfaithlife`. Stage explicit
   paths only. Never `git add -A`, and never `git stash`.
2. **Re-check the research files.** Read both in full. Confirm:
   - no student name;
   - no personal staff detail;
   - every internal note under `## Method`;
   - no trace of the text excluded by decision 1. Grep for it by topic, and never print a
     match back.
3. **Re-verify, if building on a later day than 2026-11-27.** Fetch fresh copies (`curl -sL`
   with a desktop user agent, one request every ~2 seconds; the site returned HTTP 429 to a
   fast crawl) and re-check:
   - the nine articles;
   - "3.5 units of Bible*" (HS Profile PDF);
   - the four HS Bible course names;
   - the 10 staff titles and emails: directory element 34652, `FS.util.insertEmail`
     arguments reversed;
   - every curly-quoted span in the appendix.

   If a value moved, the live page wins: build from it and record the change under the
   first file's `## Method`. On the same day, skip this step.
3b. **E-rule cleanup of the two shipped faith sections** (decision 5). Do this before the
   ingest, which regenerates the notes and chunks from the research files.
   1. **`src/data/faithLife/charlotte-christian.ts`:**
      - Delete the eighth `beliefs.articles` entry (the one this decision excludes).
        Nine articles remain, in page order.
      - Change `beliefs.headline` from `'The school’s mission, its five core values and
        its ten-point statement of faith, in the school’s own words.'` to `'The school’s
        mission, its five core values and its statement of faith, in the school’s own
        words.'`. Nine are shown, so the count goes (review-lessons 1).
      - Add one `beliefs.verify` note: `'The statement of faith on /about/what-we-believe
        has ten articles; the card prints nine. One is left out by the user’s decision of
        2026-11-27: the site is rated E for everyone.'`
      - Add the same exclusion to the header comment's kept-out list, in those words and no
        more.
      - Grep the file for any other count of the articles ("ten", "10") and fix it.
   2. **`src/data/faithLife/hickory-grove-christian.ts`:** in `beliefs.verify`, replace
      the sentence that named the employment-linked document's topic with `is linked from the employment application. Its
      text is not recorded (user decision 2026-11-27: the site is rated E for everyone).`
   3. **`source-material/faith-spiritual-life/charlotte-christian/Charlotte Christian - Faith and Spiritual Life - Official Site Research.md`:**
      - In the numbered statement of faith, replace item 8's text with
        `(not recorded: user decision 2026-11-27, the site is rated E for everyone)`. Keep
        the number, so the other articles keep theirs.
      - Delete the Findings bullet on this topic (the one that follows the numbered statement).
      - Delete the "Not found" bullet on this topic.
      - In Conflicts item 1, delete the sentence on the excluded article, and any other
        sentence there that describes the bylaws' lifestyle statement on this topic.
      - Fix any count in `## Method` that says ten articles are carried.
      - Do the same in the Second Pass file if the step-3b.6 grep finds anything.
   4. **`source-material/faith-spiritual-life/hickory-grove-christian/Hickory Grove Christian - Faith and Spiritual Life - Official Site Research.md`:**
      - Replace the whole `**Statement of Faith (verbatim, whole, in page order)**` block
        with one paragraph. That is the heading, its intro paragraph, the `Title:` line and
        every numbered item through `17. ● I believe in the HGCS Statement of Faith.` The
        new paragraph: `The school's site links one document it calls "the HGCS Statement of
        Faith", from the employment application only. Its text is not recorded here (user
        decision 2026-11-27: the site is rated E for everyone).`
      - In the linked-documents table, reword the employment-application row's description
        to that neutral form.
      - In the apologetics bullet (`- Apologetics content: "Students will also learn about
        various ethical systems and how to respond to issues such as …`), cut the quote
        after `various ethical systems` and close it there: `"Students will also learn
        about various ethical systems"`, with the remaining words dropped.
      - Delete the `"Application" article` bullet.
      - Reword the "A general doctrinal statement…" not-found bullet so it names no topic.
      - In the Method table, change `Statement of Faith (17 numbered items, verbatim)` to
        `an employment-linked document (not recorded)`.
      - Reword the line that prints that document's page header so it names no topic.
   5. **`…/hickory-grove-christian/Hickory Grove Christian - Faith and Spiritual Life - Second Pass Gap Research.md`:**
      reword the "Still not found" bullet (about line 167) so it names the document without
      its topic.
   6. **Grep check.** Run:
      `git grep -n -i -E "marriage|sexual|gender|homosexual" -- 'src/data/faithLife*' 'src/data/faithLife/**' 'source-material/faith-spiritual-life/**'`.
      The only hit allowed is Charlotte Christian's SHOW KINDNESS quote ("…race, gender or
      beliefs"). Never print a removed passage back in a reply, a commit or the PR.
   7. **The translations follow in Phase 2** (step 1's expected splice counts). Leave every
      `src/data/overlays/**` file alone in Phase 1. The build stays green, because
      `check:live` only reports a shipped entry whose English is gone.
4. **Ingest.** Run the `ingest-source-material` skill for this topic
   (`python .claude/skills/ingest-source-material/build_docs.py faith-spiritual-life`).
   Then:
   - Read the generated notes under `.claude/docs/faith-spiritual-life/` for student names
     and for the excluded text. All three schools' notes and `src/content/faith-spiritual-life/*.json`
     regenerate. Run the step-3b.6 grep over `.claude/docs/faith-spiritual-life/` and
     `src/content/faith-spiritual-life/` too: the same single SHOW KINDNESS hit is allowed.
   - If `src/data/schools.json` shows a large reorder, restore the HEAD order and keep only
     the new entry (memory `two-topic-ingest-reorders-manifest`).
5. **Write `src/data/faithLife/covenant-day.ts`**, exporting `covenantDay: FaithLifeProgram`.
   Model it on `hickory-grove-christian.ts`:
   - **Header comment:** name the two research files and the kept-out list: student names,
     personal staff detail, trip prices and exact travel dates, every LEAD, everything from
     the comms archive, unlinked pages and the Viewbook (decision 3), and "the text after
     the nine-point summary on the What We Believe tab (user decision 2026-11-27)". Say no
     more than that about it.
   - **Helpers:** `BASE = 'https://www.covenantday.org'`; `src(label, path)` takes a path
     or an absolute URL; labels are `covenantday.org — <label>`.
   - **Source constants:** the table in the appendix.
   - **Content:** the appendix draft, field for field: `colors`, `lead`, the four `stats`,
     and all ten cards. Each card's `sources` is the list in its `// sources:` comment, and
     its `verify` is copied as written. Copy every quote exactly, with curly quotes and
     apostrophes as written. Figures stay US-style.
6. **Register it** in `src/data/faithLife.ts`:
   - Import `covenantDay`.
   - Add `'covenant-day': covenantDay` to `PROGRAMS`.
   - Rewrite the comment above it ("Charlotte Christian and Hickory Grove Christian are
     researched") to name all three schools.
7. **Clubs subhead.** In `src/data/clubsPrograms/covenant-day.ts`, change `service.subhead` to:
   `'Program-based rather than hours-logged: the school publishes no service-hour requirement and no annual totals.'`
   Leave the `gap` flag text and the header comment as they are.
8. **Write the E-for-everyone rule into the skill** (same PR, per CLAUDE.md):
   - `.claude/skills/faith-life/SKILL.md`:
     - Add a Hard-constraints bullet: the site is rated E for everyone, so a school's
       statement on human sexuality is never recorded, printed, quoted or summarized,
       even inside a statement otherwise quoted whole (user, 2026-11-27).
     - Rewrite Step 6's "A sensitive belief statement" bullet. It now says "Do not edit
       it": make it say that the statement is printed whole except for that part, which
       is left out without comment.
     - Add "Deliberately cannot: record or print a school's statement on human sexuality".
   - `.claude/skills/faith-life/research-brief.md`: add the same rule to "Rules for both
     passes". The research file records only that further text exists and is not recorded,
     by this rule.
   - `.claude/skills/faith-life/review-lessons.md`: add item 19. Before the plan, grep the
     draft and both research files for that content.
   - `src/data/faithLife/README.md`:
     - Under "Belief statements are verbatim and whole", add the exception and its date.
     - Add Covenant Day as the third school (2026-11-27, plan `cdfaithlife`).
     - Add one line: cards cite only pages a visitor can reach from the site's own
       navigation. An unlinked page or archive is not cited (Covenant Day, user decision
       2026-11-27).
   - `.claude/SKILLS.md`, the `faith-life` section: add the E-for-everyone rule to what the
     skill refuses to do, with the date.
9. **Regenerate.**
   - Run `npm run schema`. `DATA-SCHEMA.md` should gain Covenant Day under the area, with
     no new type.
   - Run `npm run check:cardlink`. Card titles are shared, so no alias should be needed. If
     it asks for a snapshot update, run `npm run check:cardlink -- --update` and confirm the
     diff only adds Covenant Day rows.
10. **Docs.** In `.claude/docs/design-sync.md`, "### Faith & Spiritual Life":
    - Name all three schools.
    - Raise the "Held by" counts: every card +1. Retreats goes 1 → 2, since Covenant Day
      has one.
11. **Verify Phase 1** (below).
12. **Commit and push.**
    - Commit with explicit paths: the two Covenant Day research files, the four cleaned
      Charlotte Christian and Hickory Grove research files, the two cleaned data files, the
      ingest outputs, the new data file, `faithLife.ts`, the Clubs file, the README, the skill files, `SKILLS.md`,
      `DATA-SCHEMA.md`, `design-sync.md`, this plan and `INDEX.md`.
    - Push, and confirm it landed: `git rev-parse HEAD` against
      `git ls-remote origin feat/cdfaithlife`.
    - Set the INDEX row to `English shipped`. `/implement` runs its adversarial review here.

**→ STOP. `/implement` ends its turn here and waits for the user's review of the English
section.** In the hand-back:
- list the Open questions below;
- say that Charlotte Christian's card now shows nine articles and that the English pages
  of both older schools were checked.

Nothing below runs until the user confirms the English.

### Phase 2 — Every other locale

Scope:
- The **prose overlay** for `faith-spiritual-life` in every `PROSE_TRANSLATED` locale. Read
  the list from `src/lib/i18n.ts`; today it is `es bn ht te fr fa it hi ar`.
- **Plus** the one re-stamped Student Clubs unit.
- **Plus one chrome key**, `faith.statementOfFaith`, reworded in English at review
  (user-approved 2026-11-27): "Belief statement, in the school’s own words". Each of the nine
  other `src/locales/*.json` catalogs still holds the old heading's translation, and
  `check:chrome` only checks the key exists, so no gate catches the stale value. Translate it
  from the new English in all nine (step 3b below).

For the mechanism, see `.claude/docs/prose-translation-architecture.md` and
`src/data/overlays/NOTES.md`.

1. **Splice, never re-extract.** For each locale:
   - Run `node scripts/i18n_splice_work.mjs --lang <code> --topic faith-spiritual-life --dry-run`.
   - Expect:
     - every Hickory Grove unit **kept**;
     - every Charlotte Christian unit **kept** except **exactly 2 dropped**: the removed
       article (`charlotte-christian:beliefs.articles[7]`) and the old "ten-point"
       `beliefs.headline`;
     - 1 Charlotte Christian unit **added** (the new headline);
     - the Covenant Day units **added**.

     Any other dropped unit means a misconfigured extract: stop and investigate.
   - The two articles after the removed one keep their translations. Their `at` refreshes
     from `articles[8]`/`[9]` to `articles[7]`/`[8]` (the splice joins by stamp, never by
     index). Confirm that in each work file.
   - Then run it without `--dry-run`.
2. **Translate every added unit** in `src/data/overlays/work/faith-spiritual-life.<lang>.json`.
   Fill only the empty `t` fields; leave the other two schools' translations untouched.
   - Charlotte Christian's new headline: start from that locale's old headline translation
     (in git history, `git show main:src/data/overlays/work/faith-spiritual-life.<lang>.json`)
     and drop only the "ten-point" count.
   - The nine articles are translated **whole**, one unit each, nothing dropped or merged.
   - Every quoted school sentence is translated, as the other schools' were.
   - **Keep as published:**
     - names: Christ Covenant Church, Presbyterian Church in America (PCA), Westminster
       Confession of Faith and Catechisms, Windy Gap, Fort Caswell, Goodness Gorillas,
       Doulos Days, Penny Wars, ContainIt, Pine Ridge Reservation, Matthews HELP Center,
       Operation Christmas Child, Matthews Habitat for Humanity, Alexander Children’s Home,
       Love INC., Beta Club, Moms in Prayer, Dads Prayer Gathering, Worship Center;
     - course names: Old Testament Survey, New Testament Survey, Christian Doctrine,
       Engaging the Culture - An Introduction to Apologetics and Worldviews, Worship
       Leadership;
     - Bible references (`Phil 4:8` …), staff names, titles and emails.
   - Reuse each locale's existing renderings for shared words (chapel, devotion,
     discipleship, advisory, NOT STATED).
   - Copy figures char-for-char (`3.5`, `25`, `$400`, `30`, `2026–27`), with no regrouping
     and no unit conversion. Dates follow NOTES.md's "Dates and session labels".
   - Use **one translator per locale, each writing only its own file** (memory
     `parallel-locale-agents-collide`). Give each the Student-name rule and the
     E-for-everyone rule.
3. **Re-stamp the Clubs unit.** In each `src/data/overlays/work/student-clubs.<lang>.json`:
   - Find the unit whose `at` includes `covenant-day:service.subhead`.
   - Carry its translation over to the new English, adjusting the wording to "the school
     publishes no service-hour requirement" (`scripts/i18n_restamp.mjs` carries `t` by
     path; check its usage first).
   - Rebuild with `node scripts/i18n_build_overlay.mjs --topic student-clubs --lang <code>`.
3b. **Translate the chrome key** `faith.statementOfFaith` in `es bn ht te fr fa it hi ar`
   from the new English ("Belief statement, in the school’s own words"), reusing each
   locale's existing word for "belief" from the `faith.*` keys. Keep it short: it is a
   small caps heading.
4. **Build the faith overlays.** Run
   `node scripts/i18n_build_overlay.mjs --topic faith-spiritual-life --lang <code>` for each
   locale, then check by stamp as NOTES.md describes. `check_work_integrity` cannot
   validate a new-school splice, so assert directly:
   - 0 lost beyond the two Charlotte Christian units in step 1;
   - 0 changed `t` on the other two schools, apart from the new Charlotte Christian headline;
   - the removed article's stamp appears in **no** work file and **no** built overlay, in
     all nine locales (search by its `of` stamp, never by its text);
   - every new unit non-empty;
   - none byte-identical to its English except agreed keeps.
5. **Checks and browser passes** (below). In `fa` and `ar`, check in a browser:
   - **Quotes that close before the period.** Examples:
     - “All subjects are taught from a biblical worldview”.
     - “parents will be asked to discuss their Christian testimony”.
     - “serve at nearly twenty different sites”.
     - “must be enrolled in a Bible course each year”.
     - “usually organized and led by students”.
     - “time in God’s Word”.
     - “filled with chapels, team-building, and free time”.
     - “The family’s active involvement in a local church”.
     - “another pastor on staff, an elder, a deacon, or a ministry leader who knows your
       family well”.
     - “Prayer partnership”.
   - **Ranges:** `JK–5`, `JK–11`, `JK–12`, `6–8`, `6–12`, `9–12`, `10th–12th`, `2026–27`,
     `JK-12` (inside the discount quote), `Ephesians 2:11-22`. Reword any that reverses,
     and record it in NOTES.md.
6. **Re-capture the Claude Design *Home* file** (it shows each school's research-area
   count).
   - Check the MCP with `mcp__claude-design__list_projects`. If it is not connected, stop
     and ask the user to reconnect it (`/design-login`).
   - Run `npm run build && npx vite preview`.
   - Run the `# Home` command in `design-sync.md` with `--sha <build commit>`.
   - Write the capture with `write_files`, passing the current etag as `if_match`.
   - Run `npm run design:verify`.
   - Update `As Built - Index.md` and the drift note.
   - The *Faith & Spiritual Life Section* file is not re-captured: the section's design is
     unchanged.
7. **Ship.**
   - Open the PR with `--body-file`. The PR text names no student and does not describe
     the excluded text.
   - Merge with `gh pr merge --squash --delete-branch`, check out `main` and pull.
   - Flip the INDEX row to `Implemented` with the PR link, and add
     `## Implementation notes` to this plan.
   - Say "merged — ready to deploy whenever you want it" and stop. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/faith-spiritual-life/covenant-day/*.md` (2) | written at planning; committed in step 12 |
| `src/data/schools.json`, `.claude/docs/faith-spiritual-life/**`, `.claude/docs/INDEX.md`, `src/content/faith-spiritual-life/**` | regenerated by the ingest |
| `src/data/faithLife/covenant-day.ts` | new |
| `src/data/faithLife.ts` | edit: import, `PROGRAMS` entry, comment |
| `src/data/clubsPrograms/covenant-day.ts` | edit: `service.subhead` wording |
| `src/data/faithLife/charlotte-christian.ts` | edit: marriage article removed (9 articles), headline count dropped, one verify note, header comment |
| `src/data/faithLife/hickory-grove-christian.ts` | edit: one verify note made neutral |
| `source-material/faith-spiritual-life/charlotte-christian/*.md`, `source-material/faith-spiritual-life/hickory-grove-christian/*.md` (4) | edit: E-rule cleanup (step 3b) |
| `src/data/faithLife/README.md` | edit: third school, E-for-everyone exception, public-pages-only line |
| `.claude/skills/faith-life/SKILL.md`, `research-brief.md`, `review-lessons.md` | edit: E-for-everyone rule |
| `.claude/SKILLS.md` | edit: `faith-life` section |
| `.claude/docs/DATA-SCHEMA.md`, `scripts/card_link_names.json` (only if asked) | regenerated |
| `.claude/docs/design-sync.md` | edit: school names, Held-by counts; Home drift note (Phase 2) |
| `src/data/overlays/work/faith-spiritual-life.<lang>.json`, `src/data/overlays/faith-spiritual-life.<lang>.json` (9 + 9) | Phase 2: spliced, translated, rebuilt |
| `src/data/overlays/work/student-clubs.<lang>.json`, `src/data/overlays/student-clubs.<lang>.json` (9 + 9) | Phase 2: one unit re-stamped and rebuilt |
| `src/data/overlays/NOTES.md` | Phase 2: rollout note, plus any RTL rewording |
| `.claude/plans/INDEX.md`, this plan | status and notes |
| `.claude/docs/faith-spiritual-life/*.md`, `src/content/faith-spiritual-life/*.json` | regenerated for all three schools |
| Claude Design: `Home.dc.html`, `As Built - Index.md` | re-captured in Phase 2 |
| `src/locales/en.json` | Phase 1 review follow-up (user-approved UX change): `faith.statementOfFaith` reworded |
| `src/locales/*.json` (9 others) | Phase 2: `faith.statementOfFaith` translated |
| Claude Design: `Faith & Spiritual Life Section - Covenant Day.dc.html` | new: designed first, re-captured at `aad0553a` |
| `CLAUDE.md`, `scripts/gen_data_schema.mjs` | review fix: E-for-everyone exception |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean. Trust `tsc -b`, not `tsc --noEmit`.
- [ ] `npm run i18n:report -- --residual` reports **0 unclassified** fields.
- [ ] `npm run build` is green with every chained check, including `check:schema`,
      `check:cardlink`, `check:seo`, `check:flags`, `check:spelling`,
      `check:consistency`, `check:live` and `check:runtime`.
- [ ] `node scripts/check_plain_language.mjs --file src/data/faithLife/covenant-day.ts`
      reports clean (it did at planning). Also run it on
      `src/data/clubsPrograms/covenant-day.ts`.
- [ ] `npm run coverage:floor`: the floor is unchanged (the area is excluded).
- [ ] **Name check** on the new data file, both research files and the generated note:
      no student name and no personal staff detail. Don't rely on word boundaries alone,
      and never print a found name back. Also check that none of the excluded text is
      present.
- [ ] **Real Chrome** (Playwright, `channel: 'chrome'`, headless, never `networkidle`) on
      `/school/covenant-day/`, every card open, at 1280 light, 1280 dark and 390:
      - [ ] All ten cards appear in registry order, including Retreats.
      - [ ] Four tiles: `JK–12`, `3.5`, `JK–11`, `$400`.
      - [ ] Families shows **8 PUBLISHED and 4 NOT STATED** (corrected from 9 at the review: 4 + 2 + 2) in three groups, with the legend.
      - [ ] Beliefs shows the mission, six outcomes (no values block: pillars dropped at review), the
            note, and a numbered list of **nine** articles.
      - [ ] Ten people, all with mailto links.
      - [ ] Twelve questions (thirteen before the Doulos question was removed at review), and "Research current as of November 27, 2026".
      - [ ] Navy `#002855` and blue `#1E7EA7` are readable in both themes. The navy is the
            darkest brand in the set: check text and rules on the dark theme especially.
      - [ ] No kicker, no Compare button, page overflow 0.
- [ ] Charlotte Christian still has 10 cards, and its Beliefs card shows **nine** numbered
      articles, with the marriage article gone and the headline carrying no count.
      Hickory Grove still has 9 cards and looks unchanged.
- [ ] The step-3b.6 grep, extended to `.claude/docs/faith-spiritual-life/` and
      `src/content/faith-spiritual-life/`, finds only the SHOW KINDNESS line.
      **Carmel Christian** (faith-based, no faith data) and Cannon show **no** Faith &
      Spiritual Life section, chip or side-rail entry.
- [ ] The Covenant Day Student Clubs Service card shows the new subhead.
- [ ] `#faith-and-spiritual-life/retreats` on the Covenant Day page scrolls to the card
      and opens it.
- [ ] `npm run audit:mobile` for Covenant Day at 320/360/390 finds no overflow and no
      clipped card. Log each audit to a file; never pipe it through `tail`.

### Phase 2 — Locales

- [ ] The splice reports exactly the 2 expected Charlotte Christian drops in all nine
      locales, and the direct by-stamp assertions in step 4 pass. That includes the removed
      article's stamp being absent from every work file and built overlay.
- [ ] Browser: Charlotte Christian's Beliefs card in `es` and `fa` shows nine translated
      articles in the right order, with the translated headline.
- [ ] The Clubs unit resolves in all nine locales (`npm run check:live`).
- [ ] `npm run build` is green, including `check:live`, `check:runtime`, `check:dates` and
      `check:moneytext` (`$400` sits inside a quote).
- [ ] `check:fr`, `check:bidi`, `check:fa` and `check:hi` pass.
- [ ] `check_figures.py --topic faith-spiritual-life` and
      `npm run check:sepdrift -- --lang <code>` pass for all nine.
      `npm run check:digits` on the new units lists only deliberate rewordings.
      `npm run i18n:leaks -- --lang <code>` shows no new hit in the area.
- [ ] **Browser**, every card open: `es`, `fa` and `hi` at 1280, and `fa` and `ar` at 390.
      All prose is translated, ranges and quote endings are not reversed in RTL, and
      overflow is 0. Run `npm run audit:daterender` and `npm run audit:moneyrender` on the
      changed cards (with `npm run build && npx vite preview`).
- [ ] `faith.statementOfFaith` in all nine catalogs translates the new English (diff each
      against `main`: every one changed); browser shows it above the article list in `es`
      and `fa`.
- [ ] `design:verify` passes for the re-captured *Home*.

## Risks

| Risk | Mitigation |
|---|---|
| The school's pages change before the build | Step 3 re-verifies; the live page wins and the research file records the change. |
| Excluded text slips into a file, chunk or PR | It is already stripped from the research files. Step 2 and the Phase 1 name check grep for it; the header comment names the decision only. |
| A splice re-extract blanks the other schools' translations | `i18n_splice_work.mjs --dry-run` first; 0 dropped is required. |
| A student name leaks from a news post or magazine | The research files withhold them, there is a name check in Phase 1, and the PR and commits name no student. |
| `#002855` is too dark on the dark theme | Checked at 1280 dark. Raise it with the user rather than picking another hex silently. |
| Ingest reorders `schools.json` | Restore HEAD order (step 4). |
| A removed article's translation survives in a built overlay | Step 4's by-stamp assertion; `check:live` also reports a shipped entry whose English is gone. |
| The Charlotte Christian articles after the removed one lose their translation | The splice joins by stamp, not index; step 1 confirms the refreshed `at` per locale. |
| The Clubs re-stamp is lost in one locale | `check:live` fails on a stale stamp, and the step 3 assertion is per locale. |

## Open questions

For the user at the English review. Each has a default.

- **The chapel day and time.** The school publishes them (Wednesdays; lower school
  9:15 a.m., middle school 10:20 a.m., high school 11:00 a.m.), but only in its weekly
  emails, which decision 3 excludes. The card leaves them off and asks on Ask the School.
  **Default:** keep it so.
- **The Claude Design archive copy.** `archive/2026-11 pre-hgfaithlife/` in the design
  project holds the earlier Charlotte Christian capture, which shows the marriage article.
  The live *Faith & Spiritual Life Section* capture is from Hickory Grove, so it shows no
  articles. **Default:** leave the archive copy (the project is private), and ask the user
  whether to delete it.
- **Mike or Michael Wiersma** (LS principal): he is not on the Staff card, so nothing to
  settle unless he is added. **Default:** not listed.

---

## Appendix — drafted card wording (from /faith-life Step 7, verbatim)

Every curly-quoted span (51) and the six outcome sentences were checked verbatim against
the raw downloads at planning, with 0 misses. The plain-language checker reported it
**clean**. Build the data file from this text. Source names in the `// sources:` comments
map to the constants below.

### Source constants

Base `https://www.covenantday.org`. Labels are `covenantday.org — <label>`.

| Constant | Path | Label |
|---|---|---|
| `ABOUT` | `/about-us` | About Us |
| `WHO_WE_ARE` | `/about-us/who-we-are` | Who We Are |
| `LEADERSHIP` | `/about-us/leadership` | Leadership |
| `CAREERS` | `/about-us/careers` | Careers at CDS |
| `DIRECTORY` | `/about-us/faculty-staff` | Faculty & Staff |
| `CAMPUS_MAP` | `/about-us/campusmap` | Campus Map |
| `CALENDAR` | `/about-us/calendar` | School Calendar 2026–27 |
| `KEY_DATES` | `/fs/resource-manager/view/417ef148-7631-4d24-a131-14ea2ad5f441` | 2026-2027 Key Dates (PDF) |
| `ACADEMICS` | `/academics` | Academics |
| `LS` | `/academics/lower-school` | Lower School (curriculum and milestones) |
| `MS` | `/academics/middle-school` | Middle School (curriculum and milestones) |
| `HS` | `/academics/high-school` | High School (courses and milestones) |
| `PROFILE` | `/fs/resource-manager/view/553e845a-d32a-4eb6-ad18-d8a291a151c2` | 2026-2027 High School Profile (PDF) |
| `PROCESS` | `/admissions/process` | Admissions Process |
| `FAQS` | `/admissions/faqs` | Admissions FAQs |
| `TUITION` | `/admissions/tuition-financial-aid` | Tuition & Financial Aid |
| `TUITION_TERMS` | `/fs/resource-manager/view/32382ef0-4be4-4d11-b090-3a79562ed4ec` | 2026-2027 Tuition Payment Terms and Conditions (PDF) |
| `CAMPUS_LIFE` | `/campus-life` | Campus Life |
| `DISCIPLESHIP` | `/campus-life/discipleship` | Discipleship |
| `SERVICE` | `/campus-life/service` | Service |
| `STUDENT_LIFE` | `/campus-life/student-life` | Student Life |
| `MUSIC` | `/arts/music` | Music |
| `BOOSTER` | `/athletics/booster-club` | Booster Club |

The draft's tile names map to these page constants:
- `JK_TILE`, `K_TILE`, `LS_TILES`, `GORILLAS`, `FT_CASWELL`, `MISSIONS_WEEK` → `LS`;
- `MS_TILES`, `MS_WINDY_GAP`, `DOULOS` → `MS`;
- `HS_BIBLE_TILE`, `HS_ARTS_TILE`, `HS_ADVISORY`, `HS_WINDY_GAP` → `HS`.

Each card lists each page once. The pop-up post ids are in the research file.

### The draft

```ts
// DRAFT wording for src/data/faithLife/covenant-day.ts (/faith-life Step 7, 2026-11-27).
// Sources are named by constant; /implement defines them. Public menu pages only
// (user decision 2026-11-27): no comms-archive email, no unlinked page, no Viewbook.

export const covenantDay = {
  colors: { brand: '#002855', gold: '#1E7EA7' },

  lead: {
    strong:
      'Covenant Day School is “a ministry of Christ Covenant Church (PCA)”, a Presbyterian church in Matthews. Students take Bible in every grade, and chapel meets every week.',
    muted:
      'Its first core value: “Our foundation is built on the absolute truth of God and His word, and every aspect of our education is permeated by our faith in Christ.”',
  },

  stats: [
    { value: 'JK–12', label: 'a Bible class in every grade', note: 'from junior kindergarten through 12th grade' },
    { value: '3.5', label: 'Bible units to graduate', note: 'of 25 units in all, with a Bible course each year' },
    { value: 'JK–11', label: 'grades that need a pastor’s recommendation', note: 'and one parent must be a Christ-follower' },
    { value: '$400', label: 'discount for church members', note: 'per student, for members of Christ Covenant Church' },
  ],

  chapel: {
    headline:
      'Chapel meets every week, with students grouped by age. The whole school gathers for chapel in the church’s Worship Center.',
    entries: [
      {
        chip: { word: 'weekly' },
        title: 'Weekly chapel',
        text: '“Chapels are separated by age and include praise songs, scripture reading, and a message from guest speakers, principals, or teachers.”',
        muted: 'Junior kindergarten and kindergarten students attend chapel every week.',
      },
      {
        chip: { band: '6–8' },
        title: 'Middle school chapel',
        text: 'The school lists “meaningful chapels” among what middle schoolers gain. Students in 8th grade “can participate in chapel leadership.”',
      },
      {
        chip: { word: 'all' },
        title: 'All-school chapels',
        text: 'The whole school meets in the Worship Center of Christ Covenant Church for chapels and celebrations. The 2026–27 calendar has Convocation in September and an All-School Christmas Chapel in December.',
        muted: 'Baccalaureate for seniors is in May.',
      },
      {
        chip: { band: '6–12' },
        title: 'Worship bands',
        text: 'The music program lists a Middle School Worship Band and a High School Worship Band.',
      },
      {
        chip: { band: '9–12' },
        title: 'Worship Leadership',
        text: 'A college-prep fine arts course in leading worship.',
      },
    ],
    note: {
      strong: 'Teachers pray too.',
      text: '“Several times every week, teachers gather before homeroom to pray for one another and their students.”',
      muted: 'The whole faculty and staff also “meet quarterly for worship and devotions.”',
    },
    // sources: DISCIPLESHIP, MS, JK_TILE, K_TILE, CAMPUS_MAP, CALENDAR, KEY_DATES, MUSIC, HS_ARTS_TILE
    verify: [
      'The chapel day and times (Wednesdays: LS 9:15 a.m., MS 10:20 a.m., HS 11:00 a.m.) are published only in the school’s weekly emails at /lions-web-pages-clone/comms-archive, which no menu links. By the user’s decision (2026-11-27) the cards cite public menu pages only, so the day and time are not printed. The question is on Ask the School.',
      'The middle and high school weekly chapel rooms are not stated on any page. The lower school’s (the Worship Center) is in an email only.',
      'Whether chapel attendance is required is not stated on any public page. It is a NOT STATED row on What It Asks of Families.',
      'No page mentions sacraments or a liturgy in chapel.',
      'The worship teacher is "Worship and Choir Teacher" on /arts/music, /about-us/careers and /about-us/our-stories, and "MS/HS Choir Director & Music Teacher" in the directory. The Staff card uses the music page’s form, as the Arts card does.',
      '"Chapel Leadership (8th grade)" is a named elective in the 2026-27 Viewbook, which is reached from an unlinked download page. The card quotes /academics/middle-school instead.',
    ],
  },

  classes: {
    headline:
      'Bible is taught in every grade, from junior kindergarten through 12th grade. Here is what each grade studies, and the Bible units a high schooler needs to graduate.',
    intro: {
      text: 'The school says “All subjects are taught from a biblical worldview”.',
      muted: 'It names theology among its core subjects, beside literature, math, science, history and world languages.',
    },
    groups: [
      {
        name: 'Lower School',
        tally: 'Bible every year',
        rows: [
          { label: 'Junior Kindergarten', band: 'JK', detail: 'God’s love, short Scripture passages to memorize, and key Bible characters and their stories.' },
          { label: 'Kindergarten', band: 'K', detail: 'Friendship with God and others, short Scripture passages, and Bible characters and their stories.' },
          { label: 'Grade 1', band: '1', detail: 'Abraham through the settling of the Promised Land, then Judges and Ruth through the exile and return of Israel, with Psalms and Proverbs.' },
          { label: 'Grade 2', band: '2', detail: 'A review of the Old Testament with the Jesse Tree, then the New Testament: the life, death and resurrection of Jesus, the early church and Paul’s journeys.' },
          { label: 'Grade 3', band: '3', detail: 'Creation through the Promised Land, ending with a study of Ephesians.' },
          { label: 'Grade 4', band: '4', detail: 'Philippians, Judges, Joshua and the kings of Israel, Jewish feasts and the fruit of the Spirit. The Goodness Gorillas unit ends in a service project.' },
          { label: 'Grade 5', band: '5', detail: '1 Peter, the Old Testament covenants, how the Gospels were written, and the life and ministry of Jesus.' },
        ],
      },
      {
        name: 'Middle School',
        tally: 'Bible every year',
        rows: [
          { label: 'Old Testament survey', band: '6', detail: 'Students build a Christian worldview “from the study of scripture.”' },
          { label: 'The Gospels', band: '7', detail: 'The life of Christ, how to study the Bible, and “the habit of personal devotions.”' },
          { label: 'Acts and the letters of Paul', band: '8', detail: 'Applying Scripture to daily life, and learning how to share their faith.' },
        ],
      },
      {
        name: 'High School',
        tally: '3.5 Bible units to graduate',
        rows: [
          { label: 'Old Testament Survey', band: '9', detail: 'College prep.' },
          { label: 'New Testament Survey', band: '10', detail: 'College prep.' },
          { label: 'Christian Doctrine', band: '11', detail: 'College prep.' },
          {
            label: 'Engaging the Culture - An Introduction to Apologetics and Worldviews',
            band: '12',
            detail: 'College prep. Apologetics is the case for the Christian faith.',
          },
        ],
      },
    ],
    note: {
      strong: 'A Bible course every year.',
      text: 'High schoolers “must be enrolled in a Bible course each year”. 3.5 units of Bible count toward the 25 units needed to graduate.',
      muted: 'The school does not say which course carries the half unit.',
    },
    // sources: ACADEMICS, LS, LS_TILES (posts 666–672), GORILLAS, MS_TILES (675–677), HS_BIBLE_TILE (683), PROFILE
    verify: [
      'The 2026-2027 HS Profile requires "3.5 units of Bible*" with "* Students must be enrolled in a Bible course each year"; the Bible tile lists four courses, one per grade, with no credits. Which course is the half unit is on Ask the School.',
      'LEAD: the superseded 2025-26 profile read "3 units of Bible". Not printed.',
      'No page names a Bible translation, a curriculum publisher, or a rule for a student who joins in grades 10-12. Both are on Ask the School.',
      'The profile marks dual enrollment (Covenant College) on three non-Bible courses only.',
      'No lower school Bible teacher is listed in the directory.',
    ],
  },

  retreats: {
    headline: 'Middle and high school start each year with a retreat at Windy Gap. Retreats are included in tuition.',
    cells: [
      {
        title: 'High school: Windy Gap',
        text: 'Students and teachers “step away from the busyness of life to reconnect—with one another and, most importantly, with the Lord.” The days hold games, skits, cabin time and “time in God’s Word”.',
      },
      {
        title: 'Middle school: Windy Gap',
        text: 'A trip in August with friends and teachers, “filled with chapels, team-building, and free time”.',
      },
    ],
    note: {
      strong: 'In tuition.',
      text: 'Tuition includes “school retreats and required field trips”.',
      muted: 'Fifth graders also take an overnight trip to Fort Caswell, on the North Carolina coast, in the spring.',
    },
    // sources: HS_WINDY_GAP (post 626), MS_WINDY_GAP (633), STUDENT_LIFE, CALENDAR, TUITION, FT_CASWELL (632)
    verify: [
      '/campus-life/student-life calls Windy Gap "a three-day retreat"; the two milestone tiles call it a "weekend". The 2026-27 calendar lists each division’s trip on three consecutive weekdays in August 2026. The card says "in August" and quotes neither length.',
      '"filled with chapels, team-building, and free time" is from /campus-life/student-life, which names middle and high school together.',
      'The 5th-grade trip: Fort Caswell on the LS milestone tile and the 2026-27 calendar (May 2027); Kanuga on /campus-life/student-life. The card prints Fort Caswell; the conflict is on Ask the School. Its faith content is in the Classic Magazine only (LEAD), so it is a note, not a cell.',
      'Whether every student must attend Windy Gap is not stated on a public page. Who runs it and its speaker are not stated.',
      'No lower school retreat is published.',
    ],
  },

  groups: {
    headline:
      'Where students pray and talk about faith in smaller groups: daily homeroom devotions, weekly high school advisory groups and student-led Bible studies.',
    entries: [
      {
        chip: { word: 'all' },
        title: 'Homeroom devotions',
        text: '“Each day during homeroom, teachers lead a devotional for students.” Students share prayer requests and pray for one another.',
      },
      {
        chip: { band: '9–12' },
        title: 'Advisory groups',
        text: 'Teacher-led groups meet weekly and “stay together all year long.” Students learn about the year’s spiritual theme, report on their schoolwork and pray together.',
        muted: 'Groups are often “guided by a book study focused on spiritual growth.”',
      },
      {
        chip: { word: 'all' },
        title: 'Student Bible studies',
        text: 'Small discipleship groups “usually organized and led by students”. They meet before and after school.',
      },
    ],
    // sources: DISCIPLESHIP, MS, HS_ADVISORY (post 621)
    verify: [
      'Student chaplains (a high school student chaplain team that writes advisory lessons), the HS Chaplain’s Seminars and two adult-led middle school Bible studies are published only in the weekly emails, so they are not printed (user decision 2026-11-27). Student chaplains are on Ask the School.',
      'The 2026-27 spiritual theme is not on a public page.',
      'The discipleship page does not say which divisions have homeroom devotions; /academics/middle-school confirms "small-group devotions in homeroom".',
      'No house system and no named faith club (FCA, Young Life) is published.',
    ],
  },

  beliefs: {
    headline:
      'The school’s mission, the five parts of its vision, its belief summary and the six marks it hopes to see in every graduate, in the school’s own words.',
    mission:
      '“The mission of Covenant Day School is to assist the Christian family by providing an education marked by a biblical worldview and academic excellence so that students are equipped to be salt and light for God’s glory.”',
    values: [
      { name: 'Excellence', verse: 'Phil 4:8' },
      { name: 'Mentorship', verse: 'Proverbs 22:6' },
      { name: 'Partnership', verse: 'Ephesians 2:11-22' },
      { name: 'Discipleship', verse: 'Romans 12:2' },
      { name: 'Service', verse: 'Galatians 5:13' },
    ],
    outcomes: [
      { name: 'Follow Christ', text: 'Our graduates recognize that their daily spiritual and intellectual lives are inseparable and complementary, with Christ at the center.' },
      { name: 'Serve Others', text: 'Our graduates demonstrate a love for God, the church as the body of Christ, and all people by affirming others as God’s image bearers.' },
      { name: 'Pursue Wisdom', text: 'Our graduates continue to pursue wisdom and knowledge throughout their lives.' },
      { name: 'Communicate Effectively', text: 'Our graduates communicate confidently and effectively in written, spoken, mathematical, and technological languages.' },
      { name: 'Learn Purposefully', text: 'Our graduates have a passion for learning and the academic tools necessary to thrive as they purposefully take the next steps in their lives.' },
      { name: 'Engage the Culture', text: 'As ambassadors for Christ, our graduates are equipped to represent Him well collegiately in academics, athletics, and/or fine arts.' },
    ],
    note: {
      strong: 'A ministry of Christ Covenant Church (PCA).',
      text: 'The church is “a congregation in the Presbyterian Church in America”. The school says it “is guided by the same doctrinal convictions”, found in the Westminster Confession of Faith and Catechisms.',
      muted: 'The school also says “many—indeed, most—of our families come from other church traditions.”',
    },
    articles: [
      '“We believe the Bible is the written word of God, inspired by the Holy Spirit and without error in the original manuscripts. The Bible is the revelation of God’s truth and is infallible and authoritative in all matters of faith and practice.”',
      '“We believe in the Holy Trinity. There is one God, who exists eternally in three persons: the Father, the Son, and the Holy Spirit.”',
      '“We believe that all are sinners and totally unable to save themselves from God’s displeasure, except by His mercy.”',
      '“We believe that salvation is by God alone as He sovereignly chooses those He will save. We believe His choice is based on His grace, not on any human individual merit, or foreseen faith.”',
      '“We believe that Jesus Christ is the eternal Son of God, who through His perfect life and sacrificial death atoned for the sins of all who will trust in Him, alone, for salvation.”',
      '“We believe that God is gracious and faithful to His people not simply as individuals but as families in successive generations according to His covenant promises.”',
      '“We believe that the Holy Spirit indwells God’s people and gives them the strength and wisdom to trust Christ and follow Him.”',
      '“We believe that Jesus will return, bodily and visibly, to judge all mankind and to receive His people to Himself.”',
      '“We believe that all aspects of our lives are to be lived to the glory of God under the Lordship of Jesus Christ.”',
    ],
    // sources: WHO_WE_ARE, ABOUT, PROFILE
    verify: [
      'The nine articles are the "brief summary of what we believe" on /about-us/who-we-are, in page order. The same tab carries further text after them; it is not printed, by the user’s decision of 2026-11-27.',
      'The Westminster Confession is not hosted by the school: /about-us/careers links it to a denomination page. The card names it without a link.',
      'Also on /about-us/who-we-are and not on the card: three core values (the first is quoted in the lead), the four-commitment "Christian Community at Covenant Day" statement, and the school verse "We are taking every thought captive to the obedience of Christ." (2 Corinthians 10:5b).',
      'The vision pillars are printed with their verses as the school writes them ("Phil 4:8").',
    ],
  },

  families: {
    headline: 'What the school’s public pages say about faith when you apply and once you enroll, and what they leave unsaid.',
    groups: [
      {
        name: 'When you apply',
        rows: [
          { label: 'A Christian parent', status: 'published', detail: 'The school partners with families where “at least one parent is a Christ-follower and is actively involved in a local Christian church.”' },
          { label: 'Your Christian testimony', status: 'published', detail: 'At the parent interview, “parents will be asked to discuss their Christian testimony”.' },
          { label: 'Pastor’s recommendation', status: 'published', detail: 'Required for grades JK–11. If you do not know your senior pastor, the form may come from “another pastor on staff, an elder, a deacon, or a ministry leader who knows your family well”.' },
          { label: 'Church involvement', status: 'published', detail: 'The admission criteria include “The family’s active involvement in a local church”.' },
          { label: 'The student’s own faith', status: 'notStated', detail: 'The public pages do not say whether a student must profess faith or answer faith questions.' },
          { label: 'Signing the school’s beliefs', status: 'notStated', detail: 'The public pages do not say whether parents must sign or affirm the belief summary.' },
        ],
      },
      {
        name: 'Once you enroll',
        rows: [
          { label: 'Bible class', status: 'published', detail: 'High schoolers “must be enrolled in a Bible course each year”.' },
          { label: 'Church-member discount', status: 'published', detail: '“A $400 discount is available for each student in grades JK-12 whose parents are members of Christ Covenant Church.” The family “must affirm the church membership statement that is part of the online enrollment process.”' },
          { label: 'Chapel attendance', status: 'notStated', detail: 'The public pages do not say whether chapel is required.' },
          { label: 'A family agreement', status: 'notStated', detail: 'No family agreement, handbook or conduct code is on the school’s public pages.' },
        ],
      },
      {
        name: 'For staff and trustees',
        rows: [
          { label: 'Staff', status: 'published', detail: 'All staff “must subscribe to the Reformed faith and that doctrine as set forth in the Westminster Confession of Faith”.' },
          { label: 'Trustees', status: 'published', detail: 'The Session (the elders) of Christ Covenant Church appoints the Board of Trustees.' },
        ],
      },
    ],
    note: {
      strong: 'A “three-legged stool”.',
      text: 'The school wants “the church, family, and school to all be on the same page.”',
    },
    // sources: PROCESS, FAQS, TUITION, TUITION_TERMS, PROFILE, CAREERS, LEADERSHIP
    verify: [
      'Two wordings of the parent rule: /admissions/process ("at least one parent is a Christ-follower and is actively involved in a local Christian church") and /admissions/faqs ("at least one parent must be a professing Christian with a personal relationship with Jesus Christ and active participation in a Christian church"). The card quotes the process page, as the Admissions card does.',
      'Who is interviewed: the FAQ lists "The interview with the parents and student (grades 6-11)"; the process page has every family meet the Admissions Director. On Ask the School.',
      'The online application, the pastor’s form and the enrollment church membership statement are behind a login and were not read.',
      'The membership-statement sentence is from the 2026-2027 Tuition Payment Terms and Conditions PDF: "To receive this discount, the responsible party must affirm the church membership statement that is part of the online enrollment process."',
      '"Session (the elders)" glosses the church’s governing body for parents; the school’s own sentence is "The Session of Christ Covenant Church appoints the Board of Trustees of Covenant Day School to hold the school in trust".',
    ],
  },

  service: {
    headline:
      'Service grows with age, from campus jobs in lower school to a high school team that builds homes from shipping containers. Mission trips have gone to Spain, Haiti, Belize and South Dakota.',
    entries: [
      { chip: { band: 'JK–5' }, title: 'Lower school service', text: 'Projects include boxes for Operation Christmas Child, visits to a nearby assisted living home and support for the Matthews HELP Center.' },
      { chip: { band: '4' }, title: 'Goodness Gorillas', text: 'Fourth graders “serve at nearly twenty different sites”. It ends their Bible unit on the fruit of the Spirit.' },
      { chip: { band: 'JK–5' }, title: 'Missions Week', text: 'Students “hear from missionaries and learn about cultures from around the world.”', muted: 'It falls in February on the 2026–27 calendar.' },
      { chip: { band: '6–8' }, title: 'Doulos Days', text: 'Each middle school grade has a day of service with local ministries, nonprofits and neighbors. The schoolwide Penny Wars contest helps pay for the projects.' },
      { chip: { band: '9–12' }, title: 'ContainIt', text: 'Students turn used shipping containers into homes for teens on Pine Ridge Reservation in South Dakota. “Their vision is to provide housing for more than 30 teens.”' },
      { chip: { band: '9–12' }, title: 'High school service', text: 'Beta Club projects, weekly lunchtime tutoring at local schools, and service with partners such as Matthews Habitat for Humanity, Alexander Children’s Home and Love INC.' },
      { chip: { word: 'all' }, title: 'Mission trips', text: 'Students “have been on school-sponsored mission trips to Spain, Haiti, Belize, and Pine Ridge Reservation in South Dakota.”', muted: 'The school does not list trip years or a 2026–27 trip.' },
    ],
    note: {
      strong: 'No hours count.',
      text: 'The school publishes no service-hour requirement. Its plan follows the Bible’s order of being “Christ’s witnesses to the world beginning in Jerusalem, then to Judea and Samaria, and then to the ends of the earth.”',
    },
    // sources: SERVICE, DISCIPLESHIP, GORILLAS (post 630), MISSIONS_WEEK (640), DOULOS (636), CALENDAR
    verify: [
      'Doulos Day: "Twice a year" on /campus-life/service; "dedicated service days for each middle school grade" on the MS milestone tile. The card prints the tile; the count is on Ask the School.',
      'No service-hour number appears on any page, document or 2026-27 email. Second place: the Student Clubs Service card subhead says "no service-hour requirement exists", a stronger claim than the evidence; see the plan.',
      'Fall 2026 Doulos Day partners and the "Coin Clash" rename of Penny Wars are in emails only; not printed.',
    ],
  },

  staff: {
    headline: 'The people who lead spiritual life at Covenant Day, with the email each one lists in the school directory.',
    people: [
      { name: 'Phil Davis', role: 'Spiritual Formation Director', email: 'pdavis@covenantday.org' },
      { name: 'William Hunter', role: 'HS Chaplain & Bible Teacher', email: 'whunter@covenantday.org' },
      { name: 'Jeff Dennison', role: 'HS Bible Teacher', email: 'jdennison@covenantday.org' },
      { name: 'Jason Haas', role: 'HS Bible Teacher', email: 'jhaas@covenantday.org' },
      { name: 'Donal Walsh', role: 'HS Bible & History Teacher', email: 'dwalsh@covenantday.org' },
      { name: 'Barbara Murray', role: 'MS Bible Teacher', email: 'bmurray@covenantday.org' },
      { name: 'Josh Nguyen', role: 'MS Bible Teacher', email: 'jnguyen@covenantday.org' },
      { name: 'Zach Thompson', role: 'Worship and Choir Teacher', email: 'zthompson@covenantday.org' },
      { name: 'Stephanie Hayes', role: 'Student Culture Director', email: 'shayes@covenantday.org' },
      { name: 'Mark Helmer', role: 'Head of School', email: 'mhelmer@covenantday.org' },
    ],
    note: {
      strong: 'The Head of School’s hope:',
      muted: '“Students being transformed and becoming disciples of Christ, being anchored in their faith so that they know what they believe and why they believe it.”',
    },
    // sources: DIRECTORY, MUSIC, LEADERSHIP, PROFILE
    verify: [
      'Titles and emails from /about-us/faculty-staff (element 34652), FS.util.insertEmail reversed; re-checked 2026-11-27.',
      'Zach Thompson: "MS/HS Choir Director & Music Teacher" in the directory; the card uses "Worship and Choir Teacher" from /arts/music, as the Arts card does.',
      'The HS Profile: "our spiritual formation director and student culture director serve across all grade levels". That is why the Student Culture Director is listed.',
      'The three principals may give chapel messages ("guest speakers, principals, or teachers"); they are not listed, since no page names a faith role for them.',
    ],
  },

  parents: {
    headline: 'Weekly prayer groups for moms and for dads, and ways for grandparents and boosters to pray for the school.',
    entries: [
      { chip: { word: 'weekly' }, title: 'Moms in Prayer', text: '“Covenant Day School’s Moms in Prayer groups meet weekly during the school year.” Moms pray together for the school community.' },
      { chip: { word: 'weekly' }, title: 'Dads Prayer Gathering', text: '“Every Friday, CDS dads gather at the tennis gazebo for a time of fellowship and prayer.”' },
      { chip: { word: 'yearly' }, title: 'Grandparents Prayer Walk', text: 'The 2026–27 calendar lists a Grandparents Prayer Walk in August.' },
      { chip: { word: 'all' }, title: 'Booster Club prayer partners', text: 'Booster Club members can sign up for a “Prayer partnership”: a coach and an athlete to pray for all year.' },
    ],
    // sources: DISCIPLESHIP, CAMPUS_LIFE, FAQS, CALENDAR, BOOSTER
    verify: [
      'Moms in Prayer’s day, time and room (Tuesdays, 8:15 a.m., the CLC prayer chapel) and the Weekly Prayer Point are published only in the weekly emails; not printed (user decision 2026-11-27). On Ask the School.',
      'The Booster page reads "Prayer partnership (receive a coach and athlete to pray for throughout the year)". Membership amounts on that page are not copied.',
      'The Grandparents Prayer Walk is a calendar title only; any description is in the Classic Magazine (LEAD).',
      'The Viewbook lists "Bible Study & Prayer Groups" for parents; not printed (unlinked download page), and no details are published.',
    ],
  },

  ask: {
    headline: 'Questions the school’s public pages leave open, to bring to a tour or an interview.',
    questions: [
      'What day and time is chapel for each division, and can parents attend?',
      'Is chapel attendance required?',
      'Must a student share the family’s faith, or answer faith questions, to be admitted?',
      'Do parents sign or affirm the school’s belief summary, or any family agreement?',
      'Who is interviewed at each grade: parents only, or the student too?',
      'Which high school Bible course carries the half unit, and what does a student who joins in 10th–12th grade take?',
      'Which Bible translation do classes use?',
      'Must every middle and high school student go to Windy Gap, and who leads it?',
      'Is the 5th-grade spring trip to Fort Caswell or to Kanuga? The school’s pages name both.',
      'How many Doulos Days does each middle school grade have in a year?',
      'Are any mission trips planned for 2026–27, and for which grades?',
      'Do high school students serve as student chaplains?',
      'When and where does Moms in Prayer meet?',
    ],
    asOf: 'November 27, 2026',
  },
}
```

### Review-lessons check (Step 7, review-lessons.md)

All 18 items checked against the draft at planning:

- **1–3 (counts):** "five parts of its vision" = 5 values (both dropped at review); "six marks" = 6 outcomes; no
  count in a shared heading; the Families tally is computed by the component (8 published,
  4 not stated).
- **4–6 (quotes):** every mid-sentence quote closes before our period. No school capital
  or punctuation is changed. The church-membership sentence a family must affirm is quoted
  from "must affirm" to the end of the school's sentence.
- **7–8 (claims):** "the 2026–27 calendar has" for scheduled events. "Projects include" and
  "partners such as" for partial lists.
- **9–11 (second places):** checked; one fix (Clubs subhead, step 7). The worship
  teacher's title follows the Arts card, and the conflicts are in `verify` and on Ask the
  School.
- **12 (sources):** the lead's sources are on Beliefs (`WHO_WE_ARE`, `ABOUT`). The tiles'
  sources are on Classes (`PROFILE`, `LS`) and Families (`PROCESS`, `TUITION`). The
  membership sentence's PDF is on Families.
- **13–14:** all bookkeeping is in `verify`, and the research files are clean.
- **15:** the plain-language check is clean.
- **16:** no new field.
- **17:** Home is re-captured in Phase 2.
- **18:** the second color is the school's own.

---

## Implementation notes

### Phase 1 deviations (2026-11-27)

- **`npm run build` is red on `check:live` in Phase 1.** The plan said it would stay green,
  but `check:live` fails on a shipped overlay entry whose English is gone. It reports exactly
  three stamps in each of the nine locales: the removed Charlotte Christian article, its old
  "ten-point" headline, and the old Covenant Day Clubs `service.subhead`. All three are
  Phase 2 work (the splice and the Clubs re-stamp). `vite build` and the prerender run before
  `check:live`, so `dist` was fresh. Every chained check after it (`check:chrome`,
  `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`, `check:news`,
  `check:photos`, `check:cardlink`) was run on its own and passed.
- **Families shows 8 published, not 9** (4 + 2 + 2). The draft never had a ninth row; the
  plan's checklist was miscounted and is corrected.
- **Hickory Grove research: the dress code's presentation sentence was also removed**,
  along with the two Method lines that listed it. It falls under the same topic as decision
  5. The quote counts in that file's Method were adjusted to match.
- **Hickory Grove research, Second Pass file:** the `pdfinfo` Title quote was cut to
  "(`pdfinfo` Title)", since the title names the topic.
- **The `src/content/faith-spiritual-life/*.json` chunks** are regenerated by
  `python scripts/build_site_content.py`, not by `build_docs.py`. The plan's step 4 left out
  that second command.
- **Review fixes** (below): the five vision pillars were dropped from Beliefs; Doulos Days
  now says "Twice a year" and its Ask the School question is gone (12 questions); the
  Service note reads "No hours published."; the Lower School service entry names the
  on-campus tasks; Homeroom devotions carries a 6–8 chip; `CLAUDE.md` and
  `DATA-SCHEMA.md` (via `gen_data_schema.mjs`) carry the E-for-everyone exception.

### Adversarial review 2026-11-27

**Pass 1** (commit reviewed `e28ab287`): 12 found, 10 confirmed, 2 rejected, 9 fixed (one of
them partly), 1 recorded as a follow-up, 0 declined.

- #1 (R1) must-fix, pillars under "Core values": fixed, pillars dropped (developer's route).
- #2 (R2) should-fix, Doulos Day count vs Clubs: fixed.
- #3 (R3) should-fix, "No hours count.": fixed.
- #4 (R4) should-fix, E-rule missing from CLAUDE.md and DATA-SCHEMA.md: fixed.
- #5 (R5) should-fix, plan's "9 PUBLISHED": fixed (8).
- #6 (R7) minor, CC bylaws verify note: fixed.
- #7 (R8) minor, "campus jobs" with no entry: fixed.
- #8 (R9) minor, ALL chips: partly fixed. Homeroom devotions → 6–8; Student Bible studies
  keeps ALL, since its source names no division (verify note).
- #9 (R10) minor, plan quoted removed text: fixed.
- #10 (R6) minor, the "Statement of faith, as the school publishes it" chrome heading:
  recorded as a follow-up. It is a UX change that needs approval and a Claude Design step.
- R11 rejected: the index flips to English shipped at the English stop, after the review.
- R12 rejected for Phase 1: `src/data/overlays/NOTES.md` "ten articles" is corrected in
  Phase 2's rollout note.

**Pass 2** (fix diff `e28ab287..4e86decd`): 3 found, 3 confirmed, 0 rejected, 3 fixed,
0 declined.

- #1 should-fix, the plan still listed the pillars: fixed (decision, checklist and
  review-lessons lines).
- #2 should-fix, the checklist's thirteen questions: fixed (twelve).
- #3 minor, the Doulos verify note left out the per-grade email evidence: fixed (dev-only
  note).

**Fixed, not re-reviewed:** the three pass-2 fixes above. **Open:** pass-1 #10 (the
statement-of-faith chrome heading), a follow-up needing UX approval. **Closed 2026-11-27:**
the user approved it. `faith.statementOfFaith` now reads "Belief statement, in the school’s
own words". It was designed first in a new Claude Design file, *Faith & Spiritual Life
Section - Covenant Day* (Covenant Day's capture, since the older Charlotte Christian copy
holds the removed article), then built (`aad0553a`), then re-captured from the built app
and verified byte for byte by `design:verify`. A third review pass was run at the user's
request (below).

**Pass 3** (full review of the whole branch at `f53c39bc`, run at the user's request after
the approved heading change; the skill's two-pass cap gives way to the user's ask): 3 found,
3 confirmed, 0 rejected, 3 fixed, 0 declined. The heading matched its Claude Design file char
for char, and no excluded text remained anywhere.

- #1 should-fix, the README's "cite only menu-reachable pages" line contradicted the skill
  and brief, which listed a public email archive as evidence: fixed. The user made it a rule
  for every school: an archive or unlinked page is a lead, never a card source (SKILL.md,
  research-brief.md, SKILLS.md, README).
- #2 should-fix, Phase 2 said "No chrome keys" although `faith.statementOfFaith` changed:
  fixed (scope line, step 3b, a verification line, Files touched, the INDEX row).
- #3 minor, the Mission trips `ALL` chip with no published grade levels: fixed as a dev-only
  verify note. The chip stays, since every entry needs one and no band is supported.

**Fixed, not re-reviewed (pass 3):** all three above.

### Email links (user requests, 2026-11-27, outside the plan's original scope)

Two UX changes, each designed in Claude Design first, built, then re-captured and verified
byte for byte (`app-css/app-4.css` too):

- **Staff emails** (`.ls-person-email`, Learning Support and Faith & Spiritual Life) showed
  no sign of being links. They now carry a `↗` at rest and an underline on hover, the
  house link model. The arrow first used `--brand`, which vanished on the dark theme, so
  it takes the link's own color.
- **Admissions contact emails** were plain text. `WithEmailLinks` in
  `AdmissionsProgram.tsx` makes each email in the office line and each person's line a
  `mailto:` link (subject "<School> Inquiry"), styled `.email-link` the same way. It works
  on translated text too, since the overlays keep the address verbatim.
- **The arrow never wraps alone** (user spotted it on Cass Shortt's line): it is an inline
  `::after` glued by a no-break space, and the hover underline sits on the address's
  `<bdi>` only. Checked at 320–1280px in real Chrome.
- Not changed: the printable Admissions checklist's contact panel, and College Support's
  counselor emails (already underlined, no arrow).

**English approved by the user, 2026-11-27** ("english looks good"), including the reworded belief-list heading and the email links. Phase 2 may start.

**Phase 2 carry-overs:** translate the changed chrome key `faith.statementOfFaith` in all
nine other `src/locales/*.json` catalogs (each still holds the old heading's translation);
add the new design file to `As Built - Index.md` with the Home re-capture; correct `NOTES.md`'s "ten articles" to nine; the splice should drop
exactly the 2 Charlotte Christian units; re-stamp the Clubs unit.

### Phase 2 (2026-11-27)

Run in a fresh window from the plan alone. No deviation from the Phase 2 steps except
step 3, below.

- **Splice:** 351 kept, 172 added, 2 dropped in every locale, and the 2 are exactly
  `charlotte-christian:beliefs.articles[7]` (the removed article) and the old
  `beliefs.headline`. The two later articles kept their translations, `at` now `[7]`/`[8]`.
  The removed article's stamp is in no work file and no built overlay.
- **Translation:** one translator per locale wrote a stamp→translation map in the
  scratchpad, applied centrally by stamp: 172 filled, 0 other `t` changed, 0 empty. One fa
  phrase was corrected centrally ("three-legged stool").
- **Step 3 deviation:** `i18n_restamp.mjs` only carries spelling-only changes, so it cannot
  carry the reworded Clubs subhead. That unit was spliced (`student-clubs`: 1010 kept, 1 added,
  1 dropped per locale) and re-translated by hand from each locale's old rendering.
- **Chrome:** `faith.statementOfFaith` translated in all nine catalogs.
- **Checks:** `tsc -b` clean; `npm run build` green including `check:live` (red in Phase 1, by
  design) and `check:runtime`; `check:fr`, `check:bidi`, `check:fa`, `check:hi`,
  `check:dates`, `check:moneytext`, `check:chrome` pass; `check_figures.py` and
  `check:sepdrift` pass for all nine; `check:digits` 1,557 new units, 0 flagged; `i18n:leaks`
  area hits are two recorded keeps (es "Israel", it lowercase "school: Windy Gap" titles).
- **Browser (real Chrome, headless):** Covenant Day 10 cards and 9 articles under the new
  heading in es/fa/hi at 1280 and fa/ar at 390, overflow 0; Charlotte Christian 9 articles in
  es and fa; Hickory Grove 9 cards. fa/ar ranges: 20 per page, 0 reversed by glyph position;
  one ar `2026–27` wraps at its dash at 390 (the open site-wide wrap in NOTES.md).
  `audit:daterender` (all nine) and `audit:moneyrender` (es, fr), full sweep, both clean.
- **Claude Design:** *Home* re-captured at `b0bd3adb` (Covenant Day 11 areas, 576 documents)
  and verified byte for byte; `As Built - Index.md` gained the two Covenant Day files and a
  refresh note; `app-css/` matched the build.
- **Phase 2 is not reviewed** (per `/implement`); the rollout note in NOTES.md lists the soft
  spots for a native reviewer.

### Re-review of the unreviewed fixes (2026-11-27, after #541, at the user's request)

One fresh reviewer read the pass-3 rule fix (commit `a8d947d4`) and the three Phase 2 edits
made outside the translators (the fa stool line, the Clubs subhead, the heading key):
6 found, 6 confirmed, 0 rejected, 6 fixed, 0 declined. Fixed in a follow-up PR.

- #1 (R1) must-fix, the archive rule said "for every school" while Charlotte Christian's
  shipped cards cite its email archive and four school emails: fixed by narrowing the rule
  (user's choice) to every school from Covenant Day on, with Charlotte Christian recorded as an
  exception (SKILL.md, research-brief.md, SKILLS.md, README).
- #2 (R4) should-fix, the central fa stool edit read "a four-legged stool with three legs":
  fixed, reverted to the translator's «چهارپایهٔ سه‌پایه»; NOTES.md corrected.
- #3 (R2) minor, brief: packets reached only from an email are leads: fixed.
- #4 (R3) minor, brief: the `LEAD:` definition now names archive and unlinked-page material: fixed.
- #5 (R6) minor, fa heading «زبان» could read "language": fixed to «به بیان خود مدرسه».
- #6 (R5) minor, it heading «credo» reads as a creed: fixed to «convinzioni».

Checks after the fixes: `check:runtime`, `check:fa`, `check:bidi`, `check:chrome`,
`check:digits`, fa `check:sepdrift` pass; `npm run build` green; Chrome shows the new fa and it
headings over nine articles and the fa stool line. **Fixed, not re-reviewed:** these six.

### Second re-review (2026-11-27, PR #542 at the user's request)

One fresh reviewer read commit `820ae8c9`: 3 found (2 reported, 1 noted as an overstatement),
3 confirmed, 0 rejected, 3 fixed, 0 declined. No must-fix.

- #1 (R1) minor, the research brief's rule text carried no scope note although the note above
  said four files were narrowed: fixed, the brief's rule now names the Covenant Day scope and the
  Charlotte Christian exception.
- #2 (R2) minor, the brief's "chapel recaps were here" line could read as precedent: fixed,
  marked as a recorded exception.
- #3 minor, NOTES.md gave the wrong reason for the fa revert (چار is only a colloquial spelling of
  چهار): fixed, the reason is now the double indefinite and the clumsy wording.

**Fixed, not re-reviewed:** these three (doc text only). **Open:** none.
