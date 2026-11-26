# /faith-life — what the first school's reviews caught

<!--
  Used by /faith-life Step 7. Charlotte Christian's build (plan `faithlife`, 2026-11-26)
  went through four adversarial review passes that confirmed 19 findings. None was a wrong
  figure or a student name, because the research was verified first. All of them were the
  kinds of thing below. Check a new school's draft against each one BEFORE the /plan
  handoff, and add a line here when a later school's review finds a new kind.
-->

Check the drafted lead, tiles and cards against each item. Fix what you can and list the
rest in the `/plan` brief.

## Counts

1. **Every typed count equals its rows.** "Ten questions", "its five core values", "four
   more a year", "one of nine student leaders", "N more teachers are listed". Recount each
   against the list it describes. On the first school a "six more Bible teachers" line was
   really five: two of the six were already on the card.
2. **A heading shared by every school carries no count.** "Core values", not "Five core
   values". Chrome is the same string for a school with four.
3. **Tallies are computed.** Never type "2 published · 3 not stated".

## Quotes

4. **A quote ends where the school's sentence ends, or it closes before the period.**
   When you stop a quote mid-sentence, the closing mark comes before your own period:
   `“all students participate”.` Putting the period inside claims the school's sentence
   ended there.
5. **Never change a quote's capitals or punctuation.** Do not capitalize a word the
   school printed in lower case to start your sentence. Rewrite your sentence instead
   ("The school says “all students are asked…”"). Do not swap the school's "!" for a
   period: end the quote before it.
6. **Quote the whole of anything a family must sign or agree to.** Cutting "…and
   Responsible Use Policy" off a sentence about what parents sign changed its meaning.

## Claims

7. **Say what has happened, not what is scheduled.** A speaker listed for next week has
   not spoken. Write "Speakers listed for fall 2026 include…", or leave them out.
8. **A short list is not the whole list.** "Its requirements include…" when you name
   three of seven.
9. **Look for the second place.** For every fact the new cards state, search the same
   school's other areas for the same fact said differently: Student Clubs (service
   programs, service hours, faith clubs), College Support (distinctions, graduation
   requirements), Course Offerings (religion courses, credits, course names), Global
   Exposure (mission trips), Learning Support, Admissions (application steps). Grep
   `src/data/**/<slug>.ts` and the school's built page text. When two cards disagree,
   fix the one that is wrong, or keep the published fact and put the conflict on Ask the
   School. **An edit to an already-translated sentence is nine more edits**: say so in
   the brief, and have the plan re-stamp that unit in every locale work file by its `at`
   path, adjust each translation to match, rebuild that topic's overlays and run
   `check:live`.
10. **One name for one thing across the page.** If another card already names a
    distinction, a program or a building, use the same form, and note in `verify` when
    the school's own pages spell it two ways.
11. **When the school's pages disagree, never pick a winner silently.** Print the
    published fact a parent can check, record both quotes in `verify`, and carry the
    question on Ask the School.

## Sources and notes

12. **Every claim's page is in that card's own `sources`.** Check the lead and the tiles
    too: their sources belong on the card that covers them. A quote from a brochure needs
    the brochure, not the page that links it. Never a bare homepage.
13. **Research bookkeeping goes in `verify`, never in parent text.** What could not be
    read, how a weekday was counted, what was inferred. Parent text says what the school
    publishes or does not.
14. **Research files are clean before the ingest.** No agent hand-off lines, no personal
    staff detail, internal notes under `## Method`. The ingested text ships publicly.

## The build

15. **Plain language.** Short sentences. A lead paragraph that names the school's
    self-description, its denomination and its two main practices will run long: split
    it. Run `node scripts/check_plain_language.mjs --file <the data file>`.
16. **Nothing new needs wiring for a data-only add.** `scripts/data_dependents.json`
    already lists `src/data/faithLife/<slug>.ts` against Course Offerings, and the
    extractor already classifies every field. If the draft needs a new field, that is a
    code change: say so in the brief, and the plan adds its `PATH_OVERRIDES` entry and
    writes any new type as a plain multi-line `export type X = { … }` (the schema
    generator cannot read an intersection or a one-line type).
17. **The design project's *Home* file goes stale.** It shows each school's research-area
    count. The plan re-captures it at the end of Phase 2.
18. **The second accent color is the school's own.** Never a placeholder. If the school
    has no usable second color, a lighter tint from the brand color's ramp, checked in
    light and dark.
