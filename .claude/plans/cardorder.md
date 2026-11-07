---
name: cardorder
title: Reorder two research areas on school pages — Whole Class Analytics third in College Support, Club Catalog & Overview first in Student Clubs
status: implemented
phases: 1
created: 2026-11-07
branch: feat/cardorder
prs: [443]
---

# Card order: Whole Class Analytics third, Club Catalog first

## Goal

Two card moves on every school page. Both were requested by the user on 2026-11-07.

1. **College Support:** *Whole Class Analytics* moves from sixth to third, directly after
   *Admission Rates at the Top NC Public Universities*.
2. **Student Clubs:** *Club Catalog & Overview* moves from last to first.

The work is done when every school shows both new orders in a browser and every build gate
passes.

## Context

### College Support

- **The order is set in one place.** `COLLEGE_SUPPORT_CARDS` in `src/data/collegeSupport.ts`
  (starts at line 482) is an array, and its order is the render order.
  `src/pages/SchoolDetail.tsx:902` filters it by the keys a school holds, and
  `csCards.map` renders the result. Nothing orders cards per school, and the key order
  inside `src/data/collegeSupportPrograms/<slug>.ts` has no effect.
- **Current order:** `outcomes`, `ncAdmissions`, `transcript`, `counseling`, `edge`,
  `wholeClass`, `verdict`. This order comes from plan `gradsfirst` (PR #394).
- **All 11 high schools have `wholeClass`.** The two K–8 schools have no College Support
  area.
- **No text refers to this card's position.** The only positional line in the area is
  Verdict's "…sources cited on the cards above". Verdict stays last, so that line is still
  true.
- `CLAUDE.md` and `.claude/SKILLS.md` do not say where `wholeClass` sits. The DATA-SCHEMA
  card table is parsed from the registry (`parseCardRegistry` in
  `scripts/gen_data_schema.mjs`), so it reorders itself on `npm run schema`.

### Student Clubs: harder, because two layers are merged

- **The area renders two layers into one `.note-cards` grid**
  (`src/pages/SchoolDetail.tsx`, around lines 1531–1570):
  1. First, the structured cards `clubsCards.map(...)` from `CLUBS_CARDS` in
     `src/data/clubsProgram.ts` (line 198): `affinity`, `service`, `honors`. A school
     renders only the cards it holds.
  2. Then the prose-group loop `(… ? [] : groups).map((g) => { … })`. For Student Clubs,
     line 886 filters `groups` to `clubsProseKeys = {'academic-clubs', 'catalog'}`.
     Within that loop, `catalog` swaps its prose body for `ClubCatalogBody`, and
     `academic-clubs` swaps its body for `ClubClustersBody`.
- **So the order today is:** `affinity`, `service`, `honors`, `academic-clubs`, `catalog`.
  Catalog is last for two reasons. The structured cards are emitted before the prose loop
  in JSX. And `SECTION_ORDER['student-clubs']` in `src/lib/metrics.ts` (lines 452–466)
  deliberately ranks `catalog` last. Its comment calls the catalog "the reference appendix
  to the themed cards above it".
- **Reordering `CLUBS_CARDS` cannot move the catalog**, because it is not in that
  registry. The fix is to render the `catalog` prose group *before* `clubsCards` in JSX.
  The `SECTION_ORDER` change on its own would only swap the two prose cards.
- **All 13 schools have a `clubsProgram` entry** (13 files in `src/data/clubsPrograms/`),
  a `catalog` prose group (DATA-SCHEMA: `catalog` 13/13), and a `CATALOG` entry in
  `src/data/clubCatalog.ts` (line 1063). So the catalog-first path applies to every
  school, K–8 included.
- **Order is set at render time, so translations are not affected.** `orderMetricKeys` runs
  in `src/lib/content.ts:198` at load. Overlays are keyed by field path and English hash,
  not group position. Card titles resolve by key (`metricLabel` / `cardTitle`).
- The header count at `SchoolDetail.tsx` around line 1038
  (`clubsCards.length + groups.length`) is order-independent.
- **No positional text.** The "below" and "above" phrases in the clubs data all refer to
  places inside their own card. Examples are Cannon's "Everything below is what the
  school does publish" and Providence Day's "The full roster above…".
- **`SECTION_ORDER` is also read by `scripts/gen_data_schema.mjs`** (line 360, via
  `orderMetricKeys`), so the DATA-SCHEMA Student Clubs prose table reorders on
  `npm run schema`.

## Decisions

- **Move only the named card in each area.** Everything else keeps its relative order.
  - College Support: `outcomes`, `ncAdmissions`, **`wholeClass`**, `transcript`,
    `counseling`, `edge`, `verdict`.
  - Student Clubs: **`catalog`**, `affinity`, `service`, `honors`, `academic-clubs`.
    Academic & Competitive Clubs stays last, after the structured cards, as it is today.
- **Change only the shared registries and render code.** There is no per-school override,
  because the request covers every school.
- **Clubs: hoist the prose-group callback into a named function** instead of duplicating
  its ~100-line body. Render the catalog group with it before `clubsCards`, then render the
  remaining groups after. This keeps one copy of the catalog, cluster and Financial Aid
  report branching.
- **Move `catalog` to the front of `SECTION_ORDER['student-clubs']` and rewrite its
  comment.** On its own this would only swap the two prose cards. It keeps the shared
  order, DATA-SCHEMA, and the comment's stated intent consistent with what renders.
- **College Support: reorder the `CollegeSupportProgram` type's fields** (around line 465)
  to match the registry. The comment above that type says cards render "in this fixed
  order", and the field list was already stale after `gradsfirst`.
- **Keep the `1a…1f` / `1a…1c` design-reference labels and `num` fields.** They name design
  ids, not render order, and the `num` values do not render.
- **Leave the Compare page alone.** The request is about school-page cards.

## Approvals needed

None. Card reordering normally falls under the UX-design gate, but that gate governs
ingestion. This change is the user's direct request (2026-11-07), and the request is the
approval.

## Out of scope

- Compare row order, card titles, teasers and body content.
- Card order in any other research area.
- Deploying. `npm run deploy` is a separate decision for the user.

## Steps

Single-phase: this plan adds no user-facing text. Only the order of existing strings
changes, so no locale work is needed.

1. **Branch.** `git checkout -b feat/cardorder` from an up-to-date `main`.

2. **College Support registry**, in `src/data/collegeSupport.ts`.
   - Cut the `wholeClass` object (`title: 'Whole Class Analytics'` and its kicker) and
     paste it directly after the `ncAdmissions` object, before `transcript`.
   - Put this comment above it:

     ```ts
     /* Third, directly after the admit rates: the read on the middle of the
        class, not just the top. */
     ```

   - Reorder the `CollegeSupportProgram` fields to `outcomes`, `ncAdmissions`,
     `wholeClass`, `transcript`, `counseling`, `edge`, `verdict`. Every field stays
     optional and unchanged.

   **Trap:** `parseCardRegistry` counts square brackets and matches curly braces across the
   array body, comments included. Keep `[`, `]`, `{` and `}` out of the comment, or the
   schema doc silently loses or mangles cards.

3. **Clubs shared order**, in `src/lib/metrics.ts` `SECTION_ORDER['student-clubs']`.
   - Move `'catalog'` to the front of the array.
   - Replace the comment above it with:

     ```ts
     // Student Clubs: the Club Catalog & Overview card leads the area — it is the
     // full index of every club, so a parent sees the whole roster before the
     // themed cards (user, 2026-11-07). On pages with a structured clubs entry,
     // SchoolDetail also renders it ahead of the 1a–1c cards.
     ```

4. **Clubs render order**, in `src/pages/SchoolDetail.tsx`.
   1. Inside the `covered.map((t) => { … })` closure, before its `return (`
      (around line 1040), define:

      ```tsx
      const renderGroup = (g: MetricGroup) => { /* body moved verbatim */ }
      ```

      Move the existing callback body into it verbatim, from `const report = …` through
      the closing `</details>`. Everything it reads (`t`, `slug`, `lang`, `tr`) is
      already in scope there. `MetricGroup` is already imported (line 12).
   2. Also before the `return`, compute the list the JSX ternary computes today, and split
      it:

      ```tsx
      const proseGroups =
        (t.slug === 'course-offerings' && offerings) || /* …same nine conditions… */
          ? [] : groups
      const leadGroups = clubs ? proseGroups.filter((g) => g.metric.key === 'catalog') : []
      const tailGroups = clubs ? proseGroups.filter((g) => g.metric.key !== 'catalog') : proseGroups
      ```

      Copy the ten conditions exactly from the current JSX ternary (course-offerings,
      sports, the-arts, college-support, high-school-placement, after-school,
      summer-programs, admissions, international-travel, learning-support).
   3. In the JSX, inside the same `<div className="note-cards">`, render in this order:
      `{leadGroups.map(renderGroup)}`, then the existing `clubsCards.map(...)` block
      unchanged, then `{tailGroups.map(renderGroup)}` in place of the old
      `(…ternary…).map((g) => { … })`.
   4. Update the two comments that describe the old order:
      - the JSX comment at around line 1532 ("the three redesigned cards, in the fixed
        1a–1c order, ahead of the two prose cards…")
      - the `clubs` comment at around line 862 ("the structured cards render first")

      Both should say the Club Catalog renders first, then the 1a–1c cards, then Academic
      & Competitive Clubs. Keep the "one grid, not two" explanation, which is still the
      reason everything stays in one `.note-cards`.

   Keep the diff a move, not a rewrite. Run `git diff --stat` and read the diff, and
   confirm the body of `renderGroup` is byte-identical to the old callback.

5. **Regenerate the schema doc:** `npm run schema`. This reorders the College Support card
   table and the Student Clubs prose table in `.claude/docs/DATA-SCHEMA.md`.

6. **Verify** (see below).

7. **Ship.**
   - Run `git status --short`, then stage these paths explicitly:
     `src/data/collegeSupport.ts`, `src/lib/metrics.ts`, `src/pages/SchoolDetail.tsx`,
     `.claude/docs/DATA-SCHEMA.md`, this plan and `.claude/plans/INDEX.md`.
   - Commit and push. Check `git rev-parse HEAD` against
     `git ls-remote origin feat/cardorder`.
   - Open the PR with `--body-file`, squash-merge with `--delete-branch`, check out `main`
     and pull.
   - Update this plan's front matter and the `INDEX.md` row with the PR.
   - Stop with "merged — ready to deploy whenever you want it". Do not deploy.

## Files touched

| File | Change |
|---|---|
| `src/data/collegeSupport.ts` | `wholeClass` registry entry to third, one comment, type field order |
| `src/lib/metrics.ts` | `catalog` first in `SECTION_ORDER['student-clubs']`, comment |
| `src/pages/SchoolDetail.tsx` | hoist prose-group callback to `renderGroup`; catalog before `clubsCards`; two comments |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |

## Verification

- [ ] `npm run check:schema` passes. In `DATA-SCHEMA.md`:
  - The College Support card table reads `outcomes`, `ncAdmissions`, `wholeClass`,
    `transcript`, `counseling`, `edge`, `verdict`, and all 7 cards are present.
  - The Student Clubs prose table starts with `catalog`.
- [ ] `npx tsc -b` passes. Use this, not `tsc --noEmit`.
- [ ] `npm run build` passes, including the chained `check:live`, `check:runtime` and
      `check:seo` gates.
- [ ] **Browser check of both areas on every school.**
  - Run `npm run build && npx vite preview`.
  - Write the script below to `.cardorder-check.mjs` at the repo root (Playwright only
    resolves from inside the tree), run it with `node`, then `rm` it. Never stage it.
  - Clubs titles vary per school: some cards are omitted, and Charlotte Christian and the
    two K–8 schools retitle one card. So the clubs assertion is only that the first card is
    *Club Catalog & Overview* and *Academic & Competitive Clubs*, where present, is last.

      ```js
      import { chromium } from 'playwright'
      const hs = ['cannon','carmel-christian','charlotte-catholic','charlotte-christian',
        'charlotte-country-day','charlotte-latin','covenant-day','davidson-day','gaston-day',
        'hickory-grove-christian','providence-day']
      const all = [...hs, 'charlotte-prep', 'trinity-episcopal']
      const csWant = ['Where Graduates Go','Admission Rates at the Top NC Public Universities',
        'Whole Class Analytics','The Transcript Colleges See','The Counseling Engine',
        "The Applicant's Edge",'Verdict & Visit Checklist']
      const browser = await chromium.launch({ channel: 'chrome', headless: false })
      const page = await browser.newPage()
      let bad = 0
      for (const s of all) {
        await page.goto(`http://localhost:4173/school/${s}/?lang=en`, { waitUntil: 'domcontentloaded' })
        await page.waitForTimeout(2500)
        for (let y = 0; y < 40; y++) { await page.evaluate(() => window.scrollBy(0, 2500)); await page.waitForTimeout(60) }
        const titles = (sel) => page.$$eval(sel, (e) => e.map((n) => n.textContent.trim()))
        const clubs = await titles('#topic-student-clubs .note-cards > details > summary .topic-title')
        const okClubs = clubs.length >= 2 && clubs[0] === 'Club Catalog & Overview' &&
          (!clubs.includes('Academic & Competitive Clubs') || clubs.at(-1) === 'Academic & Competitive Clubs')
        let okCs = true, cs = []
        if (hs.includes(s)) {
          cs = await titles('.note-card-cs > summary .topic-title')
          okCs = JSON.stringify(cs) === JSON.stringify(csWant)
        }
        if (!okClubs || !okCs) bad++
        console.log(okClubs && okCs ? 'ok ' : 'BAD', s, okClubs ? '' : clubs, okCs ? '' : cs)
      }
      await browser.close()
      process.exit(bad ? 1 : 0)
      ```

  - The check passes when all 13 schools print `ok`.
  - An empty or short title list means the page did not finish loading, and that is not a
    pass.
  - If a selector matches nothing, check it against the live DOM before concluding
    anything. `#topic-student-clubs` is the section id (`id={`topic-${t.slug}`}`).
  - Do not use `networkidle`, because school pages never go idle.
- [ ] **Card bodies still work.**
  - On `providence-day`, open Club Catalog and confirm the filterable interest index
    renders and its filter chips work.
  - Open Academic & Competitive Clubs and confirm the cluster rows render, not prose.
    A prose body here means `renderGroup` lost the `clusters` branch.
  - Open Whole Class Analytics and confirm the score tables render.
- [ ] **Locales.** Open `providence-day` with `?lang=es` and `?lang=ar`. Confirm the first
      Student Clubs title is that catalog's `catalog` label and the third College Support
      title is its `wholeClass` title. Open both cards and confirm the bodies render. The
      Arabic page confirms RTL grid order.
- [ ] **Layout.**
  - At desktop width, open Club Catalog on one school and confirm it spans both columns,
    with the next card below it.
  - Run `npm run audit:mobile -- --only providence-day,cannon,charlotte-prep` and confirm a
    clean result at phone width.

## Risks

| Risk | Mitigation |
|---|---|
| Hoisting the callback drops or alters a branch (report / clusters / catalog) | Move verbatim; read the diff; the card-body checks above |
| A bracket or brace in the new registry comment breaks `parseCardRegistry` | Step 2 trap, plus the 7-card check in `DATA-SCHEMA.md` |
| Club Catalog is the longest clubs card, so opening it pushes the themed cards down | Cards are closed on load, so nothing shifts until a reader opens one; this is the order the user asked for |

## Open questions

None.

## Implementation notes

Built as planned (PR #443). The one detail the plan left open: the hoisted
`renderGroup` body and the `proseGroups` conditions were dedented uniformly by
6 spaces to sit at their new nesting level, and a script confirmed the body is
otherwise byte-identical to the old inline callback.
