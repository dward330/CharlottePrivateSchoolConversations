---
name: faith-life
description: >
  Build a faith-based school's Faith & Spiritual Life research area (slug
  `faith-spiritual-life`) from the school's own website. Asks which school if not given
  and refuses a school that is not in the app or is not faith-based. Runs two research
  passes over the school's OWN public pages (a broad first pass, then a targeted pass on
  what the first could not find), folds the corrections in, re-verifies the facts the
  cards would print, scores how much of the ten-card section could be filled, and says
  plainly whether there is enough for a healthy section (go / no-go). On a go it checks
  the draft against every mistake the first build's reviews caught, then hands off to
  /plan. Use when the user types /faith-life, or asks to "add Faith & Spiritual Life for
  <school>", "add the faith section for <school>", "research <school>'s chapel and
  beliefs", "do the next faith school". Charlotte Christian is the shipped model. This
  skill writes ONLY source-material and the plan (via /plan), never app code. A finding
  that fits none of the ten cards is offered as a new card, which needs the user's
  approval and a Claude Design file first.
---

# /faith-life — from a school's own website to a Faith & Spiritual Life plan

The repeatable version of what built Charlotte Christian's section
(`.claude/plans/faithlife.md`, 2026-11-26). The flow is **two research passes on the
school's own site → fold and re-verify → score → go / no-go → pre-plan checks → `/plan` →
`/implement`**.

Unlike `/learning-support`, **there is no deep-research prompt and no PDF.** This skill
does the research itself, by fetching the school's pages. That is how the first school
was done, and it worked: two passes found about 150 checkable facts and 13 places where
the school's own pages disagree.

**Charlotte Christian is the model** for shape, tone and depth:
`src/data/faithLife/charlotte-christian.ts` and its two research files under
`source-material/faith-spiritual-life/charlotte-christian/`. Its facts are not the model.
The rule is *fill every card the school publishes enough for*, never "match its counts".

## Hard constraints

- **This skill writes no app code.** Its outputs are two research files under
  `source-material/faith-spiritual-life/<slug>/` and a `/plan` handoff.
- **Only the school's own public pages are evidence.** The school's site, documents that
  site hosts or links as its own, and its own calendar. **No third-party page and no
  church, parish, diocese or denomination site**, unless the school's site links that exact
  document as its own. Such a page is a lead to check against the school's pages.
- **Cards cite only pages a visitor can reach from the site's own navigation** (user,
  2026-11-27, first applied to Covenant Day). A public email or communications archive, an
  unlinked page or a document reached only from one is researched as a **lead**: it can
  point to a menu page that states the fact, and it can raise a question for Ask the
  School, but a card never prints a fact from it. It applies to every school added from
  Covenant Day on. Charlotte Christian's shipped cards (2026-11-26) still cite its email archive and four school emails; they are a recorded exception, not a precedent.
- **Faith-based schools only.** The school's own site must describe it as a religious
  school. Never add this area to a school that does not.
- **A belief statement is copied whole and verbatim.** No summary, no softening, no
  comment, no article left out. A parent should read it as the school wrote it. The one
  exception is the next rule.
- **The site is rated E for everyone** (user, 2026-11-27). A school's statement on human
  sexuality is never recorded, printed, quoted or summarized: not in a research file, a
  card, a `verify` note, the plan, a commit, a PR or a reply. That holds even inside a
  statement otherwise quoted whole. The research file records only that further text
  exists and is not recorded, by this rule.
- **NOT STATED is a finding.** A requirement the public pages do not state is recorded as
  not stated. It is never written as "not required".
- **No student is named**, anywhere: research files, the plan, the brief, a commit, a
  reply. A student who spoke in chapel is "an Upper School student leader". Source pages
  and PDFs will show student names in tool output. Never copy one out.
- **No personal staff detail.** A staff directory can print a personal email address, a
  place of worship, and a staff member's children. None of it is recorded. A leader's
  bio that the school publishes as a bio is fine.
- **No trip prices and no exact travel dates.** Season and year only.
- **A dated or third-hand document is a LEAD, never a fact**: an old enrollment packet, an
  old magazine, a preview-host page, a search-engine summary, anything read by eye from an
  image. Mark it LEAD in the research file and print nothing from it.
- **This school only.** No comparison with another school's beliefs or practices.
- **Compare stays off** (`COMPARE_DEFERRED_TOPICS`) and the area stays out of the
  `/add-school` floor (`FLOOR_EXCLUDED_AREAS`).

## Step 0 — which school

1. **Ask which school** if the user did not say. If it is not in `src/data/schools.json`,
   adding the school is `/add-school`'s job; say so and stop.
2. **Confirm it is faith-based from its own home or About page**, and quote the sentence.
   If the site does not say so, stop and tell the user.
3. If `src/data/faithLife/<slug>.ts` already exists, say so and ask whether this is a
   refresh. If `.claude/plans/INDEX.md` already has a plan for it, say so.
4. **Confirm the school by name and city on its own pages** before researching. Same-name
   schools exist in other states.

## Step 1 — read the live contract

Read these every run. Never list cards or fields from memory.

- `src/data/faithLife.ts`: the live `FAITH_LIFE_CARDS`, `WIDE_FAITH_CARDS` and types.
- `src/data/faithLife/README.md`: the data rules.
- **Every file in `src/data/faithLife/`**: the shipped schools. Note each one's card count
  and item counts; Step 5 needs them.
- `src/locales/en.json` → `cards.faith-spiritual-life.*` and `faith.*`: the shared titles
  and chips. They must stay neutral across schools and denominations.
- The model school's two research files, as the record format.

## Step 2 — first pass: the broad sweep

Follow **[`research-brief.md`](research-brief.md), Part A**. You may run it yourself or
give it to one fresh agent; if you delegate, paste the brief's hard rules into the
agent's prompt, because it will not have this file.

Write `source-material/faith-spiritual-life/<slug>/<School> - Faith and Spiritual Life - Official Site Research.md`.

## Step 3 — second pass: the gaps

Read the first file's "Not found" and "Could not read" lists and its inferences. Follow
**[`research-brief.md`](research-brief.md), Part B** to try to close each one from public
official pages only.

Write `<School> - Faith and Spiritual Life - Second Pass Gap Research.md`: new sources,
what failed, findings per gap, a verdict per gap (CLOSED / PARTLY / STILL NOT FOUND ON
PUBLIC PAGES) and a **"Corrections to the first-pass file"** list.

A gap that stays open after this pass is a real finding. It becomes a NOT STATED row or a
question on the Ask the School card. Report it plainly.

## Step 4 — fold, clean and re-verify

1. **Fold every correction into the first file**, each marked "(second pass)". An
   inference the second pass confirmed is relabelled CONFIRMED with its quote.
2. **Clean both files**: no agent hand-off lines ("no file was edited"), no personal
   staff detail, and every internal note under a `## Method` heading. The ingested text
   ships in a public chunk.
3. **Re-read both files once for student names.**
4. **Re-verify the facts the cards would print** against a fresh download of each page:
   the belief statement (every article, char-for-char), worship days and times, required
   religion courses and credits, staff titles and directory emails, and every figure.
   Record it under the first file's `## Method` as
   `### Re-verification <date> (/faith-life)`. If a value moved, the live page wins and the
   file says what changed.

## Step 5 — score the coverage: the go / no-go

Map the verified facts onto the ten cards. Print this table, **always with counts**:

| Card | What this school can fill (verified only) | Status |
|---|---|---|
| Chapel & Worship | services by division with day, time or place: n; worship teams: n | at standard / thin / omitted |
| Bible & Faith Classes | grades or courses with a published topic: n; required credits: stated or not | … |
| Retreats | retreats or faith days by division: n | … |
| Small Groups & Discipleship | named groups with who, when or how: n | … |
| What the School Believes | mission: y/n; values: n; belief-statement articles: n; listed beliefs (`tenets`): n; hoped-for outcomes: n | … |
| What It Asks of Families | rows published: n; not stated: m | … |
| Service & Missions | named projects or partners: n; an hours rule: stated or not | … |
| Who Leads Spiritual Life | named people with a published role: n; with a directory email: n | … |
| Faith Life for Parents | named parent groups or emails: n | … |
| Ask the School | one question per gap or conflict: n | — |

**A card with zero items is omitted**, never shipped empty. Its scope note moves to a
sibling card or becomes a question.

**The bar is computed from the thinnest shipped school, never remembered.** Count the
cards each file in `src/data/faithLife/` holds and take the lowest. **GO** when all four
hold:

1. the school publishes a mission or belief page that can fill What the School Believes;
2. at least **two** of Chapel & Worship, Bible & Faith Classes and Retreats are verified
   with a division or grade and a day, time, course or place;
3. the school can fill at least **60% of the thinnest shipped school's card count**,
   rounded up (6 today: Hickory Grove Christian, the thinnest shipped school, holds 9 cards);
4. at least one **named person with a published faith role**.

**NO-GO** otherwise. Say which test failed, with counts. **Before a NO-GO, offer one
deeper pass**: the course catalog, the school profile, the handbook if it is public, the
calendar month by month, the news board end to end, and a public email archive as a
lead to menu pages (never a card source). A deep pass
that confirms the gaps is a useful result. Never soften a no-go.

## Step 6 — ask only what is the user's to decide (one round)

- **Proceed?** Show the GO / NO-GO with the table.
- **Material that fits no card.** Other traditions publish things the first school did
  not: sacraments and sacramental preparation, a religious order or sponsoring body, a
  campus ministry office, a chaplain's program, clergy on staff. **First try the existing
  cards**: Mass or Eucharist is worship and belongs on Chapel & Worship; theology and
  religion courses belong on Bible & Faith Classes; clergy belong on Who Leads Spiritual
  Life. Card titles are shared chrome and are **not** renamed per school. Propose a new
  card only when a body of verified material fits none of the ten. Say what it holds, how
  many facts support it, and why no card fits. **A new card needs the user's explicit
  approval, and then a Claude Design file before anything is built** (the UX-design
  standard in `CLAUDE.md`). If the Claude Design tools are not connected, stop and ask the
  user to reconnect. Never build a new card undesigned.
- **A sensitive belief statement.** Tell the user, in one line, that the statement is
  printed whole and which articles a parent is likely to ask about. It is printed whole
  except for any part on human sexuality, which is left out without comment (the E for
  everyone rule above). Never describe that part to the user beyond saying it is left out.
- **The two colors.** `colors.brand` is the school's color in `src/data/brands.ts`.
  `colors.gold` is the school's own second color. When the second color is white, or the
  school has none, propose a lighter tint from the brand color's own ramp (Charlotte
  Christian: royal blue `#1e40af` with `#60a5fa`) and say why. Confirm the hex values.

## Step 7 — check the draft before it becomes a plan

Draft every card's wording, then run it through
**[`review-lessons.md`](review-lessons.md)**. It lists the eighteen things four review
passes caught on the first school, plus the E-for-everyone check (item 19). Each one is cheap to avoid here and costs a review
round later. Fix what you find and list in the brief anything you could not settle.

## Step 8 — hand off to `/plan`

Invoke the `plan` skill with a brief carrying everything a fresh window needs:

- the slug, the two research files and the re-verification date;
- the coverage table and the GO verdict with its counts;
- the user's decisions from Step 6, quoted with their date as the approval record;
- the drafted wording for the lead, the tiles and every card, with each quote and its
  source page;
- the dev-only `verify` notes: what could not be read, how a pattern was counted, and
  every place the school's own pages disagree;
- the LEADs, marked as not to be printed;
- the colors;
- the second-place findings from `review-lessons.md` item 9, with any edit they need in
  another area's data file;
- the hard constraints above.

**The plan must say:**

- It is **two-phase** (English first, then every locale in `PROSE_TRANSLATED`).
- Phase 1 writes `src/data/faithLife/<slug>.ts`, registers it in `PROGRAMS` in
  `src/data/faithLife.ts`, ingests the research, and adds **no component, CSS, chrome key
  or extractor rule** unless a new card was approved. `npm run i18n:report -- --residual`
  must still report 0 unclassified fields.
- A data-only add needs **no design step**, with one exception: the design project's
  *Home* file shows each school's research-area count, so the plan re-captures *Home* at
  the end of Phase 2 (see `.claude/docs/design-sync.md`). A new card adds the full
  design-first steps.
- Phase 2 **splices** the new school into the work files and never re-extracts the topic,
  translates the belief statement whole, and checks quote-then-period endings and time
  and grade ranges in `fa` and `ar` in a browser.
- Verification: `npx tsc -b`, `npm run build`, the plain-language check on the new file,
  a name check, real Chrome at 1280 light, 1280 dark and 390 with every card open,
  `audit:mobile` for the school, and a look at one faith-based school with no data to
  confirm it shows no section.

`/plan` asks for the plan name and ends with the `/implement <name>` handoff. **Do not
commit** the research files; `/implement` commits them on its branch.

## Step 9 — `/implement`

The normal flow. It runs its own adversarial review at the end of Phase 1, checks the
findings, asks which to fix, and reviews the fixes once. Step 7 exists so that review
finds little. **Never deploy** unless the user asks at that moment.

## Deliberately cannot

- Edit `src/**`, a locale catalog or any generated file.
- Use a third-party page, or a church or diocese site, as evidence.
- Print a fact the research files mark LEAD, INFERENCE or not found.
- Summarize, shorten or comment on a belief statement.
- Record or print a school's statement on human sexuality (the site is rated E for
  everyone, user 2026-11-27).
- Add a card, rename a shared card title, or build a design without the user's approval.
- Add the area to a school whose own site does not call it a religious school.
