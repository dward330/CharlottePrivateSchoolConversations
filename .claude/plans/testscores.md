---
name: testscores
title: Compare › College Support gains SAT and ACT rows (median · average · middle 50% · class year, stacked) at the top of the section, and the HBCUs row moves up to sit after Power Four
status: implemented
phases: 2
created: 2026-11-07
branch: feat/testscores
prs: [439]
---

# Compare › College Support: SAT and ACT rows, and HBCUs moved up

## Goal

The Compare page's College Support section gets two new rows at the top, **SAT total** and
**ACT composite**. Each school's cell stacks four lines: **Median**, **Average**,
**Middle 50%**, then the class year in parentheses beneath (`(Class of 2026)`). A line the
school does not publish shows a dash. Separately, the **HBCUs** row moves up to sit
directly after **Power Four**, ahead of the six NC admit-rate rows. Success means a parent
can compare every school's published test scores in one place, with every figure copied
exactly from that school's own profile, in all ten locales.

## Context

- **Compare rows are `VALUE_METRICS` in `src/data/metricValues.ts`.** The College Support
  rows today, in order: `ap-performance`, `ap-top-scores`, `bucket-ivy`, `bucket-ivyplus`,
  `bucket-nu75`, `bucket-lac75`, `bucket-p4`, six `nc-admit-*` rows, `bucket-hbcu`,
  `counselor-caseload`. The `ValueMetric` type (about lines 33–135) already has `values`
  (the figure), `subs` (a quieter second line), `quals` (a per-cell tooltip), `noLead`,
  and `compareOnly` (keeps a row off the school-page stat-tile strip).
- **Cells render in `src/pages/Compare.tsx`**, about lines 566–625: `values[slug]` becomes
  `.mark-val` (26px, brand colour), wrapped in `<CellQual>` when `quals[slug]` exists;
  `subs[slug]` becomes `.mark-sub` beneath. A null value renders
  `<span className="mark-na" title={t('compare.notAvailable')}>{t('compare.na')}</span>`.
  CSS: `.mark-val` / `.mark-sub` in `src/index.css` about lines 2526–2550.
- **No cell type has more than two lines today**, so this needs a small new render branch.
  Nearest precedent for a structured row: the `nc-admit-*` rows (value + `subs` +
  `compareOnly` + a checker, `scripts/check_nc_compare_rows.mjs`). Nearest precedent for a
  new metric-values row through both i18n phases: plan [`cupbest`](cupbest.md) (#437).
- **The score data already exists on every school's College Support card**, in
  `scoreTables` inside `src/data/collegeSupportPrograms/<slug>.ts`, and each figure was
  traced to `source-material/college-support/<school>/…School Profile….md`. Spot-checked
  during planning: PD `1334` / `1220–1460`, Cannon `1290-1410`, CCHS `1070`, HG `1090`
  are all present in their source files. **No new fetch, no source-material change, no
  ingest step.**
- **What schools publish** (verified in the card files during planning):
  - Whole-class **median**: only Hickory Grove, SAT 1090. It was printed **mid-year** in
    the 2025–26 profile from 20 testers; the 2026–27 profile gives the final **mean** 1066
    from 45 testers. No school publishes a whole-class ACT median. Country Day and
    Providence Day publish medians or means *per GPA fifth*. Those are not class medians
    and are **not** used.
  - **Average**: Providence Day, Charlotte Latin, Covenant Day, Hickory Grove.
  - **Middle 50% only**: Cannon, Carmel Christian, Charlotte Catholic, Charlotte
    Christian, Charlotte Country Day, Gaston Day. Providence Day publishes both an average
    and a middle 50%.
  - **Nothing**: Davidson Day withholds all test data by choice.
- **`check:ncrows` pins the NC rows' position.** `scripts/check_nc_compare_rows.mjs`
  lines 72–83 require the six `nc-admit-*` rows to sit **immediately before**
  `bucket-hbcu`. Moving HBCUs up fails the build unless that rule changes to **immediately
  after** `bucket-hbcu`. The file's header comment (line 22) says the same and needs the
  same edit.
- **Coverage floor.** `npm run coverage:floor` today: 37 Compare rows, and Davidson Day is
  the thinnest school at 23/37. Two new rows with Davidson Day null on both give **23/39**.
  Davidson Day stays the floor school and the 23-row bar is unchanged. CLAUDE.md still
  quotes "23/36 (63%)" from before `ap-top-scores`.
- **`check:quals` (`scripts/check_qual_coverage.mjs`)** flags any `values` cell that looks
  coded, such as a range `1220–1460`, unless it has a `quals` entry. In these rows every
  line is labelled, so a range is explained by its "Middle 50%" label.
- **i18n.** `values.<slug>` and `subs.<slug>` are prose paths in `scripts/i18n_fields.mjs`
  (about lines 397–419), so new figures and `(Class of 2026)` sub-lines extract into the
  `metric-values` work file. Figure-only units round-trip unchanged. `label`, `note` and
  `quals[].text` are prose globally. Locales: `TRANSLATED` in `src/lib/i18n.ts` =
  `en es bn ht te fr fa it hi ar`, and `PROSE_TRANSLATED` = the nine non-English ones.

## Decisions

- **Row keys `sat-scores` and `act-scores`, labels `SAT total` and `ACT composite`.** They
  are the first two College Support rows, ahead of `ap-performance`. The user chose top of
  the section.
- **Each cell stacks Median, Average, Middle 50%, then `(Class of YYYY)`.** The user chose to
  add the range line, so six schools that publish only a range still get a figure. The year
  line is the class the figures describe, worded `(Class of 2026)` to match each card's own
  hint. A bare `(2026)` was rejected because Charlotte Catholic's figures are Class of 2027,
  and a bare future year reads like a typo.
- **An absent line shows a dash**, rendered like `mark-na`
  (`title={t('compare.notAvailable')}`) so screen readers get "Not available". Davidson
  Day's whole cell is the normal N/A.
- **The data shape is a new optional field `scores` on `ValueMetric`:**
  `scores?: Record<string, { median: string | null; mean: string | null; mid50: string | null }>`.
  `values[slug]` stays and **mirrors the first non-null line** (median, then mean, then
  mid50), so the coverage floor (which brace-parses `values:{…}` from source), the schema
  doc, `englishValueOf` and the N/A logic keep working unchanged. `subs[slug]` holds the
  year line. The new checker enforces the mirror, so the duplication cannot drift.
- **`noLead: true` on both rows.** The cells mix three different statistics, so tinting a
  "best" one would compare a median against a range. There is no ranking.
- **`compareOnly: true` on both rows.** Each school page already shows these figures in its
  Whole Class card's score tables, so a tile would repeat them directly above that card.
  This is the same rationale as the `nc-admit-*` rows.
- **Hickory Grove's mid-year median 1090 is shown**, with a `scope` qual explaining that it
  was printed mid-year from 20 testers while the average 1066 is the final figure from 45.
  It is the only class median any school publishes, and the user asked for a median line.
- **Charlotte Country Day's Class of 2024 range is shown**, with a `scope` qual: it is the
  most recent range the school published, because the 2025–26 profile replaced ranges with
  medians per GPA fifth.
- **The qual dot attaches to the cell's first published line**, which is also the line
  `values[slug]` mirrors. That is HG's median and CCD's range.
- **Cannon's top-10% band is not shown.** It is none of the three requested statistics, and
  it stays on the card.
- **Charlotte Latin uses the Class of 2026**, the complete class. The Class of 2027 figures
  are partial ("still testing") and stay on the card.
- **The two rows count toward the coverage floor.** Unlike the Cup rows, any school with a
  published profile can fill them, so they are not association-limited. The floor stays 23
  rows, now out of 39.
- **`check:quals` skips `scores` rows**, because every line in them is labelled. The skip
  goes in the script with a comment, rather than adding quals the cells do not need.
- **A new checker, `check:scores`, is chained into `npm run build`.** It follows
  `check:ncrows` and `check:cup`, which guard their hand-typed rows the same way.

## Approvals needed

**None outstanding.** The user asked for the two Compare rows, their placement, the
stacked layout and the HBCU reorder directly on 2026-11-07. A direct request to add UI
counts as the UX approval (CLAUDE.md UX-design standard, "Scope").

## Out of scope

- No change to any school's College Support card or its `scoreTables`.
- No section scores (SAT Math, ACT English and so on) and no tester counts in the Compare
  cells. The cards keep those.
- No per-GPA-fifth medians and no interpolated median (for example the midpoint of a range).
- No new research. A school that publishes nothing stays N/A.
- No other reordering beyond moving HBCUs.
- No deploy. Publishing is the user's call, every time.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout main && git pull && git checkout -b feat/testscores`.

2. **Extend the type**, `src/data/metricValues.ts`. Add to `ValueMetric`, with a doc comment
   in the style of its neighbours:
   ```ts
   /**
    * Stacked test-score lines (SAT / ACT rows): each school's published median, average
    * and middle-50% range, rendered as labelled lines with `subs` (the class) beneath.
    * `values[slug]` mirrors the first non-null line (median → mean → mid50) so the
    * floor, schema doc and N/A logic read the row like any other; check:scores enforces it.
    * A null line renders a dash. Figures are copied verbatim from the school's card.
    */
   scores?: Record<string, { median: string | null; mean: string | null; mid50: string | null }>
   ```

3. **Add the two rows** as the first entries under the `// === College Support ===`
   banner, **before** `ap-performance`. Use these exact figures, with an en dash `–` in
   ranges:

   | slug | SAT median | SAT mean | SAT mid50 | ACT median | ACT mean | ACT mid50 | sub (both rows) |
   |---|---|---|---|---|---|---|---|
   | providence-day | null | `1334` | `1220–1460` | null | `27` | `23–31` | `(Class of 2025)` |
   | charlotte-latin | null | `1308.5` | null | null | `27.2` | null | `(Class of 2026)` |
   | covenant-day | null | `1263` | null | null | `26` | null | `(Class of 2026)` |
   | hickory-grove-christian | `1090` | `1066` | null | null | `20.5` | null | `(Class of 2026)` |
   | cannon | null | null | `1290–1410` | null | null | `25–31` | `(Class of 2026)` |
   | carmel-christian | null | null | `1060–1260` | null | null | `22–30` | `(Class of 2024)` |
   | charlotte-catholic | null | null | `1070–1320` | null | null | `20–27` | `(Class of 2027)` |
   | charlotte-christian | null | null | `1120–1320` | null | null | `21–29` | `(Class of 2026)` |
   | charlotte-country-day | null | null | `1155–1385` | null | null | `24–31` | `(Class of 2024)` |
   | gaston-day | null | null | `1190–1330` | null | null | `22–28` | `(Class of 2025)` |
   | davidson-day | — no `scores` entry, no `subs` entry, `values: null` | | | | | | |

   Before typing, **re-read each figure and class year from that school's `scoreTables`**
   in `src/data/collegeSupportPrograms/<slug>.ts`. If one disagrees with this table, the
   card wins. Note the change under Implementation notes.

   `values[slug]` = the first non-null of median → mean → mid50, so SAT HG = `'1090'`,
   SAT PD = `'1334'`, SAT Cannon = `'1290–1410'`, ACT HG = `'20.5'`, and so on.

   Row fields:
   - SAT: `key: 'sat-scores'`, `label: 'SAT total'`, `noLead: true`, `compareOnly: true`,
     `note: 'Each school’s published SAT total for the class named beneath: the median, the average and the middle 50%. A dash means the school does not publish that figure; Davidson Day publishes no test scores.'`
   - ACT: `key: 'act-scores'`, `label: 'ACT composite'`, same flags,
     `note: 'Each school’s published ACT composite for the class named beneath: the median, the average and the middle 50%. A dash means the school does not publish that figure; Davidson Day publishes no test scores.'`
   - `quals` on the SAT row only:
     - `'hickory-grove-christian': { kind: 'scope', text: 'The median was printed mid-year from 20 testers; the average is the school’s final figure for the class, from 45 testers.' }`
     - `'charlotte-country-day': { kind: 'scope', text: 'The most recent SAT range the school has published. Its 2025–26 profile replaced the range with a median for each fifth of the class.' }`
   - `quals` on the ACT row: CCD only, the same text with "SAT" → "ACT".

   Add a short code comment above the pair: the rows are guarded by `check:scores`, and
   figures come from each card's `scoreTables`.

4. **Move `bucket-hbcu`.** Cut the whole `bucket-hbcu` object (about line 843) and paste it
   directly after `bucket-p4`, before the `// compareOnly:` comment block that introduces
   the `nc-admit-*` rows. Also fix any comment there that says the NC rows come before
   HBCUs.

5. **Update `scripts/check_nc_compare_rows.mjs`.** At lines 72–83, require the six
   contiguous `nc-admit-*` rows to sit **immediately after** `bucket-hbcu`
   (`idx[0] === hbcu + 1`). Reword the finding message and the header bullet at line 22
   to "immediately after `bucket-hbcu`". Grep `scripts/`, `.claude/` and `CLAUDE.md` for
   `before \`bucket-hbcu\`` / `before bucket-hbcu` and fix any other prose that states the
   old order.

6. **Render the stack**, `src/pages/Compare.tsx`, in the cell branch (about lines 566–625).
   When `vm.scores?.[s.slug]` exists, render this in place of the single `.mark-val`, and
   keep the existing `sub` line after it:
   ```tsx
   <span className="score-stack">
     {(['median', 'mean', 'mid50'] as const).map((k) => {
       const fig = sc[k]
       return (
         <span key={k} className="score-line">
           <span className="score-label">{t(`compare.score.${k}`)}</span>
           {fig != null
             ? /* first published line carries the qual dot, if any */
               …CellQual (value=localizeMoneyText(fig)) when this is the first non-null line and vm.quals?.[s.slug], else
               <span className="score-fig">{localizeMoneyText(fig)}</span>
             : <span className="score-fig score-none" title={t('compare.notAvailable')}>—</span>}
         </span>
       )
     })}
   </span>
   ```
   Pass figures through `localizeMoneyText`, the same call `.mark-val` uses, so digit
   localization (bn/fa/ar) and the site-wide RTL range fix (#367) apply. The `—` is a
   glyph, not a word, so it needs no locale key. Leader tint never applies, because both
   rows set `noLead`. Leave the `ncAdmit` and plain branches untouched.

   `CellQual` renders its value as `.mark-val`. Either give it an optional
   `valueClassName` prop (default `'mark-val'`), passing `'score-fig'` from here, or add a
   CSS rule `.score-line .qual .mark-val` that matches `.score-fig`. **Prefer the prop**,
   because it is explicit. `CellQual` has other callers, so keep the default.

7. **CSS**, `src/index.css`, beside `.mark-sub`:
   - `.score-stack { display: flex; flex-direction: column; gap: 4px; }`
   - `.score-line { display: flex; align-items: baseline; gap: 6px; white-space: nowrap; }`
   - `.score-label`: 11px, `var(--muted)`, `font-weight: 600`, letter-spacing as other
     small labels (and **scope any caps tracking with the same `:lang()` exclusions the
     other 43 caps-tracking rules use**, since Devanagari/Bangla break under tracking —
     simplest is to not uppercase/track it at all).
   - `.score-fig`: `var(--heading)` font, 600, **18px**, `color: var(--brand)`,
     `line-height: 1`. It must reuse the dark-theme lightening `.mark-val` gets (about
     lines 174–186): add `.score-fig` to those selectors.
   - `.score-none { color: var(--muted); font-weight: 500; }`
   - Inside the stack, `.mark-sub` keeps its own style and its `margin-top: 5px` still works.

8. **Chrome keys**, `src/locales/en.json`, under `compare`:
   `"score": { "median": "Median", "mean": "Average", "mid50": "Middle 50%" }`.
   Phase 1 changes **only `en.json`**. `check:chrome` reports the missing translations on
   its exit-0 path.

9. **`check:quals` skip**, `scripts/check_qual_coverage.mjs`: in the loop over
   `VALUE_METRICS`, `if (m.scores) continue`, with a one-line comment. Every line of a
   score row is labelled ("Middle 50%"), so a range in `values` is explained by its label.

10. **New checker `scripts/check_score_rows.mjs`**, as `"check:scores"` in `package.json`,
    chained into `"build"` right after `check:ncrows`. Import `VALUE_METRICS` (it imports
    under plain Node, as `check_nc_compare_rows.mjs` does). Assert:
    - `sat-scores` and `act-scores` exist, are `topic: 'college-support'`, and are the
      first two college-support rows in that order;
    - both rows carry `noLead` and `compareOnly`;
    - for every slug: `values[slug] == null` ⇔ no `scores[slug]` ⇔ no `subs[slug]`;
    - `values[slug]` equals the first non-null of `median`, `mean`, `mid50`, and at least one is non-null;
    - every non-null `mid50` matches `/^\d+–\d+$/` (en dash), and median/mean match `/^\d+(\.\d+)?$/`;
    - every `subs[slug]` matches `/^\(Class of \d{4}\)$/`;
    - **traceability:** every non-null figure appears verbatim in the text of
      `src/data/collegeSupportPrograms/<slug>.ts`. For a range, both endpoints must appear.
      For Cannon the card file prints `1290`/`1410` as separate cells, so check endpoints,
      not the joined string. Say in the script's header that a two-digit ACT figure is a
      weak substring test, so this check is a floor, not proof;
    - the SAT and ACT rows agree on which slugs are non-null and on each slug's `subs`.

    Print findings and exit 1 on any. Run a **negative test** that isolates the assertion:
    corrupt one `values` mirror in `metricValues.ts`, confirm *that* message prints, then
    revert with `git diff` empty.

11. **Schema doc generator**, `scripts/gen_data_schema.mjs` about line 845: add
    `vm.scores ? 'S' : ''` to the flags array, and add `S` to wherever the flag legend is
    written (grep `'sub'` / `compareOnly ? 'C'` for the legend). Then `npm run schema`.

12. **Coverage floor wording.** Run `npm run coverage:floor`. Expected: 39 rows, Davidson
    Day 23/39 (59%), 9/12 areas. In `CLAUDE.md` ("Adding a school") and
    `.claude/skills/add-school/SKILL.md`, update the dated sentence that quotes the floor
    ("23/36 Compare rows (**63%**)", "~2.8 points", "≥23 of 36") to the script's new
    output, dated 2026-11-07. Mention that the SAT/ACT rows joined the count. Keep the
    "read it from the script" warning. `.claude/SKILLS.md` needs no change: no skill
    changes behaviour.

13. **Commit Phase 1** (stage explicit paths only; `git status --short` first), push, verify
    the push (`git rev-parse HEAD` vs `git ls-remote origin feat/testscores`), open the PR
    with `--body-file`, set INDEX row to **English shipped**.

**→ STOP. `/implement` ends its turn here and waits for the user's review** of the English
Compare page: wording of the three line labels, the two row notes, the two quals, the year
line and the stacked layout. Nothing below runs until they confirm.

### Phase 2 — Every other locale

Two layers, both in scope:

- **UI chrome**: `compare.score.median` / `.mean` / `.mid50` in the nine non-English
  catalogs: `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json`.
- **Research prose (metric-values overlay)**: the two new `label`s, two `note`s, three
  `quals[].text`, the `(Class of YYYY)` sub-lines and the figure-only `values` cells,
  for the nine `PROSE_TRANSLATED` locales. Follow
  `.claude/docs/prose-translation-architecture.md`, and use plan `cupbest` (#437) as the
  worked example for metric-values rows.

1. **Extract.** Run the prose extractor for `metric-values` per the architecture doc.
   First run it to a throwaway `--lang __verify` and confirm the exact new-unit diff:
   two labels, two notes, three qual texts, subs and values cells. Confirm that **no
   `scores.*` leaf was extracted**. They are figure-only by design. If any was, add
   `['scores.<slug>.median', false]`-style skips to `scripts/i18n_fields.mjs` (the
   suffix matcher needs per-slug paths, like `quals.<slug>.kind`) and re-extract.
2. **Translate** the new units in each of the nine work files. Figures are copied
   char-for-char and never re-typed (`1308.5`, `1220–1460`). `(Class of 2026)` translates
   its words and keeps its digits. Hindi/Telugu lakh grouping and RTL isolates are handled
   at render, so store the English figure. See the locale rollout docs for each register.
3. **Build overlays** and add the three chrome keys to the nine catalogs.
4. **Commit Phase 2** to the same branch and PR, merge (`gh pr merge --squash
   --delete-branch`), pull `main`, flip the INDEX row to **Implemented** with the PR
   link, and add `## Implementation notes` if the build deviated. **Do not deploy.**
   Say "merged — ready to deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `src/data/metricValues.ts` | edit: `scores` field on `ValueMetric`; two new rows; move `bucket-hbcu` after `bucket-p4` |
| `src/pages/Compare.tsx` | edit: score-stack render branch |
| `src/components/CellQual.tsx` | edit: optional `valueClassName` prop |
| `src/index.css` | edit: `.score-stack`, `.score-line`, `.score-label`, `.score-fig`, `.score-none`, dark-theme selector |
| `src/locales/en.json` (Phase 1), nine others (Phase 2) | edit: `compare.score.*` |
| `scripts/check_nc_compare_rows.mjs` | edit: NC rows now immediately after `bucket-hbcu` |
| `scripts/check_qual_coverage.mjs` | edit: skip `scores` rows |
| `scripts/check_score_rows.mjs` | new: `check:scores` |
| `package.json` | edit: `check:scores` script, chained into `build` |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | edit + regenerate: `S` flag, new rows |
| `CLAUDE.md`, `.claude/skills/add-school/SKILL.md` | edit: floor sentence → 23/39 |
| `scripts/i18n_fields.mjs` | edit only if `scores.*` leaves get extracted (Phase 2 step 1) |
| metric-values work files + overlays (Phase 2) | new units translated |
| `.claude/plans/INDEX.md`, this plan | status, PR link, implementation notes |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean (trust `tsc -b`, not `--noEmit`)
- [ ] `npm run check:scores` — passes; the negative test printed the mirror message and was reverted
- [ ] `npm run check:ncrows` — passes with HBCUs moved
- [ ] `npm run check:quals` — no new flags
- [ ] `npm run check:schema` — clean after `npm run schema`
- [ ] `npm run coverage:floor` — 39 rows, Davidson Day 23/39, the floor school is unchanged
- [ ] `npm run build` — succeeds, full chain
- [ ] **Browser check** (`npm run dev`, real Chrome via Playwright): Compare → College
      Support with all 11 high schools selected. SAT and ACT are the first two rows. Each
      cell reads Median / Average / Middle 50% / (Class of …) top to bottom, with dashes
      where unpublished. Davidson Day shows N/A. HG SAT and CCD SAT/ACT show a qual dot,
      and the tooltip text is correct. There is no leader tint. HBCUs comes after Power
      Four and before the NC admit rates. Check light and dark theme.
- [ ] Check that the school page for any school shows **no** new stat tile (`compareOnly`).
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile`. Pass means no page
      overflow at 320/360/390. The stacked cell must not widen the Compare table past
      its scroll region in a way that clips content.

### Phase 2 — Locales

- [ ] `npm run check:runtime` and `npm run check:live` — clean
- [ ] `npm run check:chrome` — `compare.score.*` present in all ten catalogs
- [ ] `check_figures.py` for `metric-values` per language, plus `npm run check:sepdrift -- --lang <code>` and `npm run check:digits` — figures char-for-char
- [ ] `npm run check:dates`, `npm run check:fr`, `npm run check:bidi` — clean
- [ ] Browser check in `fa` and `ar`: middle-50% ranges read low–high. Verify by glyph-x
      position, not text, because a reversed range passes every text check. Also check
      in `bn` (native digits) and `hi` (Western digits).
- [ ] `npm run build` — succeeds

## Risks

| Risk | Mitigation |
|---|---|
| `values` mirror drifts from `scores` on a later edit | `check:scores` in the build fails on it |
| An RTL range renders reversed (`1460–1220`) | Use `localizeMoneyText`, the path #367 fixed. Verify by glyph-x scan in fa/ar |
| The stacked cell is too wide or tall at phone width | 18px figures, nowrap lines, and `audit:mobile` with every card open |
| `scores.*` leaves get extracted as prose and re-typed | Phase 2 step 1: diff via throwaway `--lang __verify`, add skips if needed |
| CLAUDE.md floor sentence goes stale again | Updated from the script output in step 12 |

## Open questions

- Should Hickory Grove's mid-year median (1090, n=20) show beside its final average (1066,
  n=45)? — **default:** show it, with the scope qual in step 3.
- Is `(Class of 2026)` the right wording for the year line, or would the user prefer a bare
  `(2026)`? — **default:** `(Class of …)`. It is cheap to change at the Phase 1 review.

## Implementation notes

- **Phase 1 (2026-11-07).** Every figure and class year in the step-3 table matched the
  cards' `scoreTables`; no correction needed.
- **A line no school in the row publishes is hidden** (user request mid-build). No school
  publishes an ACT median, so the ACT row shows Average and Middle 50% only; SAT keeps
  Median because of Hickory Grove's 1090. Implemented as `scoreLinesFor(vm)` in
  `Compare.tsx`, which is computed from the whole row, not the selected columns, so a line
  does not appear and disappear as schools are toggled.
- **The ScoreStack is its own small component** in `Compare.tsx`, not inline JSX.
- **The coverage floor reads 58%**, not the plan's expected 59%: the script prints
  23/39 as 58%. CLAUDE.md and the add-school skill quote the script.
- **Dark theme:** `.score-fig:not(.score-none)` joins the `.mark-val` lightening, so
  dashes stay muted.
- **The PR is not opened in Phase 1.** Per `/implement`, the branch is pushed and the PR
  opens with Phase 2, where step 13 had it opening now.
- **Phase 2 (2026-11-07).** `i18n_splice_work.mjs --topic metric-values` kept 743, added 29
  and dropped 0 per locale. The 29 are two labels, two notes, three qual texts, four
  `(Class of YYYY)` subs and 18 figure-only `values` cells, which are stored verbatim.
  - **`scores.*` leaves were unclassified**, as step 1 anticipated: 33 per-slug skips
    (`scores.<slug>.median|mean|mid50`) went into `scripts/i18n_fields.mjs`.
  - **The splice also repaired Phase 1's index shift.** Metric-values overlay paths carry
    the `VALUE_METRICS` index (`providence-day:[17].label`). The two inserted rows and the
    HBCU move therefore left every later row's translations on stale paths until the
    splice refreshed `at` by stamp, which is most of the work-file diff. Any later
    mid-array insertion needs the same splice.
  - **Wording:** each locale reuses its own earlier rendering of `SAT total`,
    `ACT composite`, `Median` and `middle 50%` from the College Support card's work file.
    The `(Class of …)` line is translated in all nine (es `Promoción de`, bn `ব্যাচ`,
    fa `دورهٔ`, ar `دفعة` …).
  - **Checks:** `check:runtime` and `check:live` passed for all 9. `check:chrome` passed.
    `check:digits` compared 261 units with 0 to review. `check:sepdrift` ×9 found 0.
    `check_figures.py` ×9 passed. `check:dates`, `check:fr`, `check:bidi`, `check:fa`,
    `check:hi` and `npm run build` passed.
  - **Leaks:** `i18n:leaks` flags only `SAT total` (kept in es/fr) and `ACT composite`
    (kept in fr/it/bn/te/hi). Both match each locale's existing choice on the card.
  - **Browser** (Playwright, real Chrome, fa/ar/bn/hi/es): labels, notes, line labels and
    class lines are translated, and HBCUs follows Power Four. Every middle-50% range reads
    low→high by glyph-x position in fa and ar. The CCD tooltips are translated.
