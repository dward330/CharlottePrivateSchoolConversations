---
name: gradsfirst
title: Make Where Graduates Go the first card of College Support on every school page
status: in-progress
phases: 1
created: 2026-11-01
branch: feat/gradsfirst
prs: []
---

# Make Where Graduates Go the first card of College Support

## Goal

On every school page with a College Support area, *Where Graduates Go* becomes the first
card. Today it is the fourth. A parent opening the area sees the destinations answer first,
and the admission-rates card moves to second. It worked when all 11 schools show the new
order in a browser and every build gate still passes.

## Context

- **Order lives in one place.** `COLLEGE_SUPPORT_CARDS` in `src/data/collegeSupport.ts`
  (starts line 482) is an array, and array order is render order.
  `src/pages/SchoolDetail.tsx:901` filters it by the keys a school holds, and line 1272 maps
  the result. No per-school ordering exists, and the object key order inside
  `src/data/collegeSupportPrograms/<slug>.ts` has no effect on rendering.
- **Order today:** `ncAdmissions`, `transcript`, `counseling`, `outcomes`, `edge`,
  `wholeClass`, `verdict`.
- **All 11 schools hold all 7 keys**, confirmed by grep: cannon, carmel-christian,
  charlotte-catholic, charlotte-christian, charlotte-country-day, charlotte-latin,
  covenant-day, davidson-day, gaston-day, hickory-grove-christian, providence-day. The two
  K-8 schools have no College Support area.
- **`ncAdmissions` first was a deliberate 2026-08-19 decision**, written down because its
  figures are government-published. This request supersedes it, so the wording recording
  that decision has to change everywhere it appears (see Steps 2–5). The schema doc and
  `CLAUDE.md` would otherwise keep telling future windows it leads the area.
- **Layout:** `.note-cards` is a two-column grid (`src/index.css:1286`) and an open card
  spans both columns (`.note-card[open]`, line 1322). No CSS targets a card by position.
  Closed-card rows change from `ncAdmissions|transcript`, `counseling|outcomes` to
  `outcomes|ncAdmissions`, `transcript|counseling`. Rows three and four do not change.
- **Prose was checked for positional references.** The only one is the Verdict source line
  "…the sources cited on the cards above" (one per school, plus `verdictSynthesized` in
  `src/locales/en.json`). Verdict stays last, so it stays true. No research prose names
  another card in the area by position.
- **Translations are unaffected.** Card titles resolve by key through `cardTitle()`, and
  overlays stamp field paths and English hashes. Neither depends on registry position.
- **`gen_data_schema.mjs` parses this registry from source** (`parseCardRegistry`, line
  142), so the DATA-SCHEMA card table reorders itself on `npm run schema`.

## Decisions

- **Move `outcomes` to the front and leave the other six in their current relative order,
  so `ncAdmissions` becomes second.** The request names one card. This is the smallest
  change that satisfies it.
- **Final order:** `outcomes`, `ncAdmissions`, `transcript`, `counseling`, `edge`,
  `wholeClass`, `verdict`.
- **Change the registry only, with no per-school override.** The request says all schools,
  and the `collegeSupport.ts` header comment already promises a fixed order across schools.
- **Update the 11 per-school "The area's FIRST card" comments.** They are code comments and
  render nowhere, but they are false after this change, and this repo trusts its written
  claims.
- **Keep the 1a–1f labels in the `collegeSupport.ts` header comment.** They name the design
  reference's ids, not render order, and the comment says so.
- **Do not reorder the keys inside the per-school files.** It has no effect and would
  produce a large noisy diff.
- **Nothing to run for High School Placement.** Its registry already starts with `outcomes`,
  so the K-8 analogue already matches.

## Approvals needed

None. Reordering cards normally needs approval under the UX-design standard, but that gate
governs ingestion. This is the user's direct request (2026-11-01), which is the approval.

## Out of scope

- **Compare page row order.** The request is about the school-page cards.
- **Card titles, teasers or body content.**
- **Any other research area's card order.**
- **Deploying.** `npm run deploy` is the user's separate call.

## Steps

Single-phase: adds no user-facing text. Only the order of existing strings changes, so no
locale work is needed.

1. **Reorder the registry** in `src/data/collegeSupport.ts`. Move the `outcomes` object to
   the top of `COLLEGE_SUPPORT_CARDS` and rewrite the comment above it so it no longer says
   `ncAdmissions` leads:

   ```ts
   /* First, deliberately: the question most parents open this area to answer.
      Array order IS render order — SchoolDetail filters this list by which keys
      the school's program object actually has. */
   ```

   Then place `ncAdmissions` directly after it, with this comment:

   ```ts
   /* Second. The one card in the area whose figures are government-published
      rather than school-published. */
   ```

   **Trap:** `parseCardRegistry` counts square brackets and matches curly braces across the
   array body, comments included. Keep those four characters out of both comments, or the
   schema doc silently loses or mangles cards.

2. **Fix the component comment** in `src/components/CollegeSupport.tsx`, lines 217–222.
   Change "The area's FIRST card:" to "The area's SECOND card, after Where Graduates Go:",
   and change "which is the whole reason the card leads the area" to "unlike every other
   card in the area". Re-wrap to the file's width.

3. **Fix the 11 per-school comments.** In each file under `src/data/collegeSupportPrograms/`,
   replace the exact text `The area's FIRST card.` with
   `The area's SECOND card, after Where Graduates Go.`. It appears exactly once per file.
   Re-wrap only if a line becomes unreasonably long. Touch nothing but the comment.

4. **Fix the schema generator** in `scripts/gen_data_schema.mjs`, lines 486–487. Replace the
   first two lines of that paragraph, and the "— which is why it leads." clause, with:

   ```js
   w('**`ncAdmissions` is the area\'s SECOND card, after `outcomes`, and its figures are')
   w('government-published rather than school-published.** It is')
   ```

   Keep the next line (`populated by the [...]`) as it is. Then run `npm run schema`. This
   regenerates `.claude/docs/DATA-SCHEMA.md`, including the reordered card table.

5. **Fix the two hand-kept docs.**
   - `CLAUDE.md`, lines 215–217 (the `nc-admissions-data` section). Replace from
     "**This data has a home in the app:" through "school-published." with:

     > **This data has a home in the app: `ncAdmissions`, the SECOND card of College
     > Support** — *Admission Rates at the Top NC Public Universities* — added 2026-08-19.
     > It led the area until 2026-11-01, when the user moved *Where Graduates Go* to first.
     > It is still the area's one government-published card rather than a school-published
     > one.

   - `.claude/SKILLS.md`, line 280. Change "the **first card of College Support**" to "the
     **second card of College Support**, after Where Graduates Go". The skill itself does
     not change, so this is a factual correction to the entry.

6. **Verify** (see below), then commit explicit paths only, open the PR with `--body-file`,
   squash-merge, and pull `main`. Update this plan and the `INDEX.md` row with the PR. Stop
   there with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/collegeSupport.ts` | edit: move `outcomes` to the front, rewrite two comments |
| `src/components/CollegeSupport.tsx` | edit: comment only |
| `src/data/collegeSupportPrograms/*.ts` (11 files) | edit: one comment each |
| `scripts/gen_data_schema.mjs` | edit: `ncAdmissions` paragraph opening |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `CLAUDE.md` | edit: `ncAdmissions` card description |
| `.claude/SKILLS.md` | edit: one line in the `nc-admissions-data` entry |

## Verification

- [ ] `grep -rn "FIRST card" src scripts CLAUDE.md .claude/SKILLS.md .claude/docs/DATA-SCHEMA.md`
      prints nothing for College Support. The Wells Fargo and other areas' wording is not
      in scope. `grep -n "leads the area" src/components/CollegeSupport.tsx` prints nothing.
- [ ] `npm run check:schema` passes, and the `college-support` card table in
      `DATA-SCHEMA.md` starts `outcomes`, then `ncAdmissions`, and still lists 7 cards.
      A missing card here means the Step 1 comment broke the parser.
- [ ] `npx tsc -b` passes. Use this, not `tsc --noEmit`.
- [ ] `npm run build` passes, including the chained `check:live`, `check:runtime` and
      `check:seo` gates.
- [ ] **Browser check of all 11 schools, plus two locales.** Run `npx vite preview`, then
      write this as `.gradsfirst-check.mjs` at the repo root (Playwright only resolves from
      inside the tree), run it, and `rm` it. Never stage it.

      ```js
      import { chromium } from 'playwright'
      const slugs = ['cannon','carmel-christian','charlotte-catholic','charlotte-christian',
        'charlotte-country-day','charlotte-latin','covenant-day','davidson-day','gaston-day',
        'hickory-grove-christian','providence-day']
      const want = ['Where Graduates Go','Admission Rates at the Top NC Public Universities',
        'The Transcript Colleges See','The Counseling Engine',"The Applicant's Edge",
        'Whole Class Analytics','Verdict & Visit Checklist']
      const browser = await chromium.launch({ channel: 'chrome', headless: false })
      const page = await browser.newPage()
      let bad = 0
      for (const s of slugs) {
        await page.goto(`http://localhost:4173/school/${s}/?lang=en`, { waitUntil: 'domcontentloaded' })
        await page.waitForTimeout(2500)
        for (let y = 0; y < 40; y++) { await page.evaluate(() => window.scrollBy(0, 2500)); await page.waitForTimeout(60) }
        const got = await page.$$eval('.note-card-cs > summary .topic-title', (e) => e.map((n) => n.textContent.trim()))
        const ok = JSON.stringify(got) === JSON.stringify(want)
        if (!ok) bad++
        console.log(ok ? 'ok ' : 'BAD', s, ok ? '' : got)
      }
      await browser.close()
      process.exit(bad ? 1 : 0)
      ```

      Passes when all 11 print `ok`. A count other than 11 or an empty `got` means the page
      did not finish loading, which is not a pass. Do not use `networkidle`: school pages
      never go idle.
- [ ] **Locales.** Open `providence-day` with `?lang=es` and `?lang=ar`, and confirm the
      first `.note-card-cs` title is that catalog's `college-support.outcomes` string. Then
      open the card and confirm its body renders. The Arabic page confirms RTL grid order.
- [ ] **Open-card layout.** On one school at desktop width, open the first card and confirm
      it spans both columns and *Admission Rates* sits below it. Then run
      `npm run audit:mobile -- --only providence-day,cannon` for a clean result at phone
      width.

## Risks

| Risk | Mitigation |
|---|---|
| A bracket or brace in the new registry comments breaks `parseCardRegistry` | Step 1 trap, plus the 7-card check on `DATA-SCHEMA.md` |
| A stale claim survives that `ncAdmissions` leads | The grep check in Verification |
| Heavier first card pushes the rest of the area down the page when opened | Cards are closed on load, so nothing shifts until a reader opens one; the same applies to it in any position |

## Open questions

None.
