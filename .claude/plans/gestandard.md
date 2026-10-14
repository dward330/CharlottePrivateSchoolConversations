---
name: gestandard
title: Make Charlotte Country Day the standard for the /global-exposure skill (replacing Providence Day as the template)
status: in-progress
phases: 1
created: 2026-10-13
branch: docs/gestandard
prs: []
---

# Charlotte Country Day becomes the Global Exposure standard

## Goal

The `/global-exposure` skill currently names **Providence Day** as "the template and the
standard" that every new school's Global Exposure section is measured against. The user
asked (2026-10-13) for **Charlotte Country Day** to be the new standard. After this change,
every place that tells a future run what to mirror and what bar to meet points at
`src/data/internationalTravel/charlotte-country-day.ts`. It also spells out *what* that bar
is: the concrete depth Country Day reached, card by card. That way mode B can say "at
standard" or "below standard" per card, not just "fits the registry".

It works when a grep for "Providence Day is the template" (and its variants) across the
skill, its template, `.claude/SKILLS.md`, the data README and the memory note returns
nothing. The skill should name Country Day as the standard with an explicit per-card bar,
and Providence Day only as the reference for the one card Country Day lacks (`credential`).

## Context

**The skill:** `.claude/skills/global-exposure/`
- `SKILL.md` (183 lines). The Providence Day "template/standard" language is at:
  - the frontmatter `description` (line ~13): "Providence Day is the template; going
    beyond it is welcome but needs the user's approval."
  - the intro paragraph (lines ~20–24): "Providence Day's section
    (`.claude/plans/intltravel.md`) is the template and the standard, within reason, judged
    on what the school's own website publishes."
  - B1 (line ~89): "`src/data/internationalTravel/providence-day.ts`: the template school's
    shape and tone."
  - B3 already names Country Day's Source URLs file as the model. Keep that.
  - B4 maps findings onto registry cards but has **no depth bar**. It asks only "what can
    this school fill".
- `prompt-template.md` (197 lines). Its examples already use Country Day. Its "Editing
  the template" note says v1 was written for Country Day "from the Providence Day
  dossier's shape". **Section numbers 1–20 must stay stable**, because mode B maps PDF
  sections to cards by number.

**The registry SKILLS.md:** `.claude/SKILLS.md`, the `global-exposure` section at line ~310.
Line ~320 reads "Providence Day's section is the template and the standard; going beyond it
is welcome, but only with the user's approval." The At-a-glance row is at line ~27. The
"Maintaining" table requires updating the section and its `updated` date when a skill's
behaviour materially changes. CLAUDE.md requires this in the **same PR**.

**The data README:** `src/data/internationalTravel/README.md`. It describes both schools
and the data rules, but names no model file for a new school. Its examples (PD's `~375`
GSD tile, PD's `TITLE_OVERRIDES`) are rule illustrations and stay.

**The memory note** (outside the repo, not committed):
`~/.claude/projects/-Users-Derrick-Desktop-CharlottePrivateSchoolConversations/memory/global-exposure-official-sources-rule.md`
line 12: "(Providence Day is the template, and going beyond it in data and UX is welcome)".

**What Country Day's section actually is.** These numbers come from
`src/data/internationalTravel/charlotte-country-day.ts`, read at planning time. Re-read the
file at step 1; if it has changed, use the live values.
- **8 cards:** `trips`, `exchanges`, `signup`, `community`, `start`, `network`,
  `milestones`, `verdict`. **No `credential`**, because the school publishes no global
  diploma. Its IB Diploma sits in `start`'s Upper School items, and "Is a global
  certificate planned?" is a Verdict question.
- **Lead + 4 stat tiles**, all pure figures (`27`, `6`, `11`, `1988`). Each has a `note`
  saying whose count it is ("per the school").
- **`trips`:** 20 trips over three school years. **Every Middle School trip carries grade,
  group size, selection method (in `theme`), season `timing` and `homestay`** where the
  school publishes them. A multi-division year uses `noteByDiv`. There is an
  `alsoOnRecord` list, a photo, and 8 sources, including a Wayback copy for a year the live
  page dropped.
- **`exchanges`:** sister schools with homestays both ways, plus `visitors` and a photo.
  Partner `years` is a pure figure span.
- **`signup`:** one group per division, each event tagged with an `audience`. It shows
  deadlines and never travel dates or prices.
- **`community`:** 3 pure-figure stat tiles and 5 cells (ESL, International Parents
  Group, visiting diplomats, cultural celebrations, global clubs).
- **`start`:** a 4-pillar `framework`, plus divisions with items.
- **`network`:** retitled through `TITLE_OVERRIDES`
  ("Model UN, WorldQuest & Charlotte's Global Partners"), because the school has no Round
  Square-type membership. It has a one-row-per-school-year conference ledger.
- **`milestones`:** dated events, oldest first, a pure-figure `year`, a bold short `title`
  and one sentence of `text`. Claimed firsts are worded "per the school", and the narrowest
  claim all pages support is the one rendered (the IB "first private school in NC" call,
  `ccdglobal.md` Implementation notes).
- **`verdict`:** a `standsOut` summary plus 4 points, and **11 `ask` questions**, one per
  gap.
- **Header comment** stating provenance, verification date and the rules followed. URL
  constants are at the top. Source labels use `'<domain> — <page>'`.
- **Research files:** `source-material/international-travel/charlotte-country-day/`
  holds both `Deep Research.md` and `Source URLs.md`. The latter is already the skill's
  B3 model.

**Lessons recorded in `.claude/plans/ccdglobal.md` → Implementation notes** belong in the
standard: ordinal grade wording ("8th grade · up to 15 students"), season `timing` on
every trip that has one, month-year mentions rephrased to seasons, and the narrowest
supported claim. **`.claude/plans/pdcommunity.md` → Decisions** set two omit thresholds
that were deliberately kept out of the skill at the time (its Out of scope says editing the
skill was a follow-up). This plan folds them in:
- `community` renders only with **≥3 verified cells**;
- `milestones` renders only with **≥5 verified dated events**;
- conflicting years → the program's own current page wins, or the row is omitted, never
  "2005 or 2007".

## Decisions

- **Country Day is "the standard"; Providence Day becomes the reference for `credential`
  only.** Country Day has no credential card, so a school that *does* publish a global
  diploma still needs a model for that one card, and PD's GSD block is the only one. This
  avoids implying that a credential is now discouraged.
- **The standard is "within reason, judged on what the school's own website publishes"**.
  That qualifier carries over unchanged. A school below Country Day's depth on a card
  because it publishes less is not a defect. Omit-to-hide and `verdict.ask` still apply.
  Going **beyond** Country Day (data or UX) stays welcome with the user's approval.
- **Write the bar as a short checklist inside `SKILL.md`** (a new subsection, "The
  standard: Charlotte Country Day"), not as a separate file. The skill is the one document
  mode B reads first, and the bar is ~20 lines.
- **B4's mapping gains a depth column.** For each card, it states "at standard / below
  standard (why) / omitted", measured against the checklist. The user then sees how the
  new school compares, the same way `/add-school` reports coverage.
- **The pdcommunity omit thresholds (≥3 cells, ≥5 events) become skill rules**, quoted
  with their origin. They were written for PD, but they are the zero-items rule applied to
  these two cards and hold for any school.
- **`prompt-template.md`: the sections are unchanged and the numbering is stable.** Edit
  only the "Editing the template" history (add a v2 line: Country Day named the standard,
  2026-10-13, sections unchanged) and the `{{PEERS}}` guidance (prefer Charlotte Country
  Day first, then Providence Day). Its §3 trip-table columns already ask for grade, group
  size, homestay and selection, which is the detail Country Day's standard depends on.
- **Add a "model file" line to `src/data/internationalTravel/README.md`**: a new school's
  file mirrors `charlotte-country-day.ts` (header comment, URL constants, source-label
  style, card order), and PD's file is the model for `credential` only. This is a
  documentation edit under `src/` that changes no behaviour. It is in scope because a fresh
  `/implement` window reads that README first.
- **Update the memory note's parenthetical** to name Country Day as the standard. The note
  is outside the repo, so it is not part of the PR. Do it in the same session.
- **Single-phase.** This adds no user-facing text: skill docs, the skills index, a data
  README and a memory note only. No locale catalog, overlay or `src/data` value changes.
- **Branch prefix `docs/`.** This is a docs-only change, and it still goes through a PR
  (CLAUDE.md git standard has no docs carve-out).

## Approvals needed

**None.** The user requested this change directly (2026-10-13). It changes no UX, card,
chrome or data. `npm run deploy` is not part of this plan, and nothing here would need it,
because skill files do not ship to the site.

## Out of scope

- Bringing Providence Day's section up to the new standard (e.g. adding per-trip grade,
  group size or timing to PD's trips). That is a data plan for a separate `/plan` and
  would need PD research. Mention it in the PR body as a possible follow-up.
- A new skill mode (e.g. "add the community/milestones cards to an existing school",
  suggested in `pdcommunity.md`'s Out of scope). Not requested.
- Any change to the card registry, types, renderer, chrome keys or prompt sections.
- `CLAUDE.md`. It does not mention the Global Exposure template, so nothing there goes
  stale.

## Steps

*Single-phase — adds no user-facing text.*

1. **Branch and re-read.** `git checkout main && git pull`, then
   `git checkout -b docs/gestandard`. Re-read
   `src/data/internationalTravel/charlotte-country-day.ts` and confirm the counts in Context
   (cards present, trips, community cells, milestone events, ask questions). Use the live
   numbers in step 2 if any differ.

2. **`SKILL.md`: name the standard.** In `.claude/skills/global-exposure/SKILL.md`:
   - Frontmatter `description`: replace "Providence Day is the template; going beyond it is
     welcome but needs the user's approval." with "Charlotte Country Day is the standard;
     going beyond it is welcome but needs the user's approval." Keep the rest of the
     description verbatim.
   - Intro paragraph: replace the Providence Day sentence with **Charlotte Country Day's
     section (`.claude/plans/ccdglobal.md`, `src/data/internationalTravel/charlotte-country-day.ts`)
     is the standard (named by the user, 2026-10-13), within reason, judged on what the
     school's own website publishes.** Follow it with a sentence that Providence Day
     (`intltravel.md`) was the original template and remains the model for the
     `credential` card, which Country Day does not have.
   - Add a new `## The standard: Charlotte Country Day` section after the intro and before
     `## Hard constraints`. Make it a compact checklist built from Context → "What Country
     Day's section actually is", one bullet per card plus the lead/stats, file
     conventions and the ccdglobal lessons. Each bullet states the *bar* ("every trip
     carries grade, group size, selection, season timing and homestay where the school
     publishes them"), not Country Day's specific facts. Include:
     - the two omit thresholds (`community` ≥3 verified cells, `milestones` ≥5 verified
       dated events), citing `pdcommunity.md`;
     - the conflicting-years rule;
     - "a card the school cannot reach the bar on is filled as far as verified facts allow,
       never padded; a card it cannot fill at all is omitted and its gap goes to
       `verdict.ask`";
     - `credential`: model PD's GSD block (`providence-day.ts`), and the title must be a
       per-school `TITLE_OVERRIDES` entry;
     - `network`: retitled per school to name the school's real network (Country Day's
       title is the example when there is no Round Square-type membership).
   - B1: change the `providence-day.ts` bullet to
     `src/data/internationalTravel/charlotte-country-day.ts`: **the standard school's shape,
     tone and depth**. Add a bullet: `providence-day.ts` → its `credential` block only, if
     the school has a credential.
   - B4: add the depth column. After building the per-card mapping, mark each card **at
     standard / below standard (one-line reason) / omitted**, measured against the new
     section. Put the table in the conversation before the AskUserQuestion round. A card
     below standard is not a question for the user unless the reason is a choice; the
     reason goes into the `/plan` brief.
   - B5: add "the per-card standard table from B4" to the list the brief must carry.
   - Leave the B3 sentence naming Country Day's Source URLs file as the model unchanged.

3. **`prompt-template.md`.** In `.claude/skills/global-exposure/prompt-template.md`:
   - Under **Editing the template**, append: "v2 (2026-10-13): Charlotte Country Day named
     the standard for `/global-exposure` (plan `gestandard`). Sections unchanged; §3's
     trip-table columns (grade, group size, homestay, selection, timing) are the detail
     that standard depends on, so keep them."
   - In the placeholder table's `{{PEERS}}` row, change the "Where it comes from" text to
     "2–3 Charlotte schools for section 10; prefer ones already in Global Exposure,
     Charlotte Country Day first". **Change nothing inside the four-backtick prompt
     block.**

4. **`src/data/internationalTravel/README.md`.** After the "Two schools" paragraph, add a
   short paragraph: "**The model for a new school is `charlotte-country-day.ts`** (the
   `/global-exposure` standard since 2026-10-13): its header comment, URL constants at the
   top, `'<domain> — <page>'` source labels and card order. Providence Day's file is the
   model for the `credential` card only, which Country Day does not have." Touch nothing
   else in the file.

5. **`.claude/SKILLS.md`.** In the `global-exposure` section:
   - Replace "Providence Day's section is the template and the standard; going beyond it is
     welcome, but only with the user's approval." with "Charlotte Country Day's section is
     the standard (since 2026-10-13); Providence Day remains the model for the
     `credential` card only. Going beyond the standard is welcome, but only with the user's
     approval."
   - Add ` · updated 2026-10-13` (use the actual implement date) to the path line, beside
     `added 2026-10-12`.
   - In the mode table's **B** row, add "rates each card at / below standard" to "What it
     does".
   - Add one callout in the section's existing style: **📏 The bar is Country Day's
     depth** — e.g. every trip carries grade, group size, selection, season and homestay
     where published; `community` needs ≥3 cells and `milestones` ≥5 events, or the card is
     omitted.
   - Check the At-a-glance row (line ~27). Its description ("Deep-research prompt →
     verified Global Exposure plan") stays accurate. Leave it unless the counter or columns
     need touching.

6. **Memory note.** Edit
   `~/.claude/projects/-Users-Derrick-Desktop-CharlottePrivateSchoolConversations/memory/global-exposure-official-sources-rule.md`
   line 12: replace "(Providence Day is the template, and going beyond it in data and UX is
   welcome)" with "(Providence Day was the template; Charlotte Country Day is the standard
   since 2026-10-13, and going beyond it in data and UX is welcome)". This file is not
   committed.

7. **Commit, PR, merge.** Run `git status --short` and confirm that only these paths are
   modified: `.claude/skills/global-exposure/SKILL.md`,
   `.claude/skills/global-exposure/prompt-template.md`,
   `src/data/internationalTravel/README.md`, `.claude/SKILLS.md`,
   `.claude/plans/gestandard.md`, `.claude/plans/INDEX.md`. Stage those explicit paths
   (never `git add -A`) and commit. Push, then verify with `git rev-parse HEAD` vs
   `git ls-remote origin docs/gestandard`. Open the PR with `--body-file`, noting the PD
   "bring up to standard" follow-up, then `gh pr merge --squash --delete-branch`, and
   `git checkout main && git pull`. Flip the INDEX row to *Implemented* with the PR link
   (in the same PR if done before merging; otherwise a follow-up branch + PR, never a
   direct commit to `main`). **Do not run `npm run deploy`.**

## Files touched

| File | Change |
|---|---|
| `.claude/skills/global-exposure/SKILL.md` | edit — Country Day named the standard; new "The standard" checklist section; B1/B4/B5 updated |
| `.claude/skills/global-exposure/prompt-template.md` | edit — v2 history line; `{{PEERS}}` guidance. Prompt body unchanged |
| `src/data/internationalTravel/README.md` | edit — one "model file" paragraph |
| `.claude/SKILLS.md` | edit — global-exposure section: standard sentence, updated date, mode-B row, one callout |
| `.claude/plans/gestandard.md`, `.claude/plans/INDEX.md` | status → implemented, PR link |
| memory `global-exposure-official-sources-rule.md` | edit — outside the repo, not committed |

## Verification

- [ ] `grep -rn -i "providence day.*template\|template.*providence day\|providence day.*standard" .claude/skills/global-exposure .claude/SKILLS.md src/data/internationalTravel/README.md`.
      The only hits should describe PD as the *former* template or the `credential` model.
- [ ] `grep -n "Charlotte Country Day" .claude/skills/global-exposure/SKILL.md` shows it in
      the description, the intro, the new standard section and B1.
- [ ] The four-backtick prompt block in `prompt-template.md` is byte-identical to `main`:
      `git diff main -- .claude/skills/global-exposure/prompt-template.md` touches only
      lines outside the fence.
- [ ] Every count quoted in the new standard section matches
      `charlotte-country-day.ts` as re-read in step 1.
- [ ] `npm run build` succeeds. It is a sanity check only: no app code changed, but the
      README sits under `src/`.
- [ ] Dry-read: walk mode B's steps B1–B5 as a fresh reader would. Each reference to "the
      standard" or "the model" must resolve to a real file path.

## Open questions

- Should the standard also require a photo on `trips` and `exchanges`, given that Country
  Day has both? — **default:** no. Photos stay optional (README rule); the checklist says
  "a photo where the school publishes a usable one".
