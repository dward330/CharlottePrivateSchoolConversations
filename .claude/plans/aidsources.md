---
name: aidsources
title: Financial Aid & Tuition uses only official sources — remove third-party figures (Covenant/Carmel ~20% on aid, PD aggregator tuition box, DD commercial-990 figure, Catholic secondary-source figures, Gaston's Private School Review 45%/466) and replace Hickory Grove's mirror-sourced tuition with the school's own 2026–27 rates; then all nine locales
status: implemented
phases: 2
created: 2026-11-10
branch: fix/aidsources
prs: [474]
---

# Financial Aid & Tuition — official sources only

## Goal

The user's rule (2026-11-10): "If they dont come from the tax forms or official school
sites or docs, lets remove them from the financial aid and tuition stuff. That is a
critical area." This change applies it to the Financial Aid report
(`src/data/financialAidReports.ts`) and to the Compare Financial Aid rows
(`src/data/metricValues.ts`). Built directly at the user's request after an inventory,
not through `/plan`. This file is the record.

## Decisions (user rulings, 2026-11-10, via AskUserQuestion)

- **News reports quoting the school: keep.** Country Day's 2025–26 prior-year bands and
  its "356 students on aid in 2022–23" come from Axios Charlotte, and they stay.
- **Government data: keep.** Gaston Day's NCES enrollment (448) and Hickory Grove's NC
  Opportunity Scholarship state annual-report totals stay.
- **Hickory Grove's mirror-sourced bands: confirm on the school's own site, else
  remove.** The school's page was read in headed Chrome. It now shows its 2026–27 rates,
  which differ from the mirrored ones, so the school's figures replace them.
- **Warnings built on third-party figures: remove entirely.**
- **Unambiguous removals:** Covenant Day's and Carmel Christian's "~20% on aid"
  (PrivateSchoolReview / schooltuitions.org only).

## What changed (Phase 1, English)

| School | Change |
|---|---|
| covenant-day, carmel-christian | `sections[3].stats[0]` (~20% tile) removed. `figureNote` → "The school publishes no share of students on aid, no total awarded and no average award." The questions lose "(The ~20% figure is third-party…)". Aggregators are removed from the section `source` and the footer. Compare `pct-aid` → `null`; Covenant's tip is removed. |
| providence-day | `sections[6]` "NAVIGATION HAZARD" box (aggregator tuition figures) removed. Footer: "Commercial tuition aggregators are the source of no figure here." |
| davidson-day | `sections[5]` "A THIRD-PARTY FIGURE, NOT A SCHOOL ONE" box ($742,270 via a commercial 990 digitizer) removed, with Instrumentl removed from the footer. |
| charlotte-catholic | `framing[1].body` → "MACS publishes the 2026-27 schedule and no tuition history, so this report shows no tuition trend." The secondary-source $13,348 / $9,366 are gone. |
| gaston-day | `sections[3].figureNote`: the Private School Review 45% is gone. `boxes[2]`: PSR's 466 is gone, and the NCES 448 stays. The question comparing 26% with PSR's 45% is removed. PSR is removed from `source` and the footer. |
| hickory-grove-christian | Bands are now the school's own 2026–27 rates: **$11,900 / $12,900 / $14,100** (were mirror-sourced $11,500 / $12,500 / $13,750). `meta` is "2026–27 tuition · figures as of 10 Nov 2026". `framing[1].body` reuses the shared, already-translated "Every dollar figure carries the school year it applies to. Undated school figures are flagged, not guessed." `figureNote` gives a $2,200 spread and names the school's page. `figureNote2` now lists the page's $700 Spanish Immersion add-on, bus at $1,000 and after-school care at $2,600 / $1,300. The top-band tile is $14,100, and source lines name the school page. In Compare: tuition-lower $11,900, middle $12,900, upper $14,100, runs $178,400 / $95,100 / $56,400, with 2026–27 sub-lines and tips. |
| Compare `pct-aid` note | Now lists Covenant Day and Carmel Christian among the schools that do not publish the figure. |

**Provenance.** The school page's verbatim text, URL and retrieval date are appended to
`source-material/financial-aid-tuition/hickory-grove-christian/Hickory Grove Christian - Financial Aid - Deep Dive Report.md`
("Update 2026-11-10"), then re-ingested (`build_docs.py financial-aid-tuition` +
`build_site_content.py`). Noise was restored, and `schools.json` is unchanged. The
appended section sits in the card-replaced Deep Dive Report, so it renders nowhere and is
not extracted for translation. `DATA-SCHEMA.md` is regenerated: `pct-aid` fill is
7/13 → 5/13.

**Unchanged on purpose:**
- the research notes in `source-material/`, which keep the third-party data as research;
- the Deep Dive Report prose in `src/content`, which does not render;
- the Clubs Compare rows that use third-party rosters (another area, outside the
  user's "financial aid and tuition" scope).

## Verification (Phase 1)

- `npx tsc -b` and `vite build` are green. `check:tuition` passes: 62 cells match, and HG
  shows $11,900 / $12,900 / $14,100 / $178,400 / $95,100 / $56,400 for 2026–27.
- `check:spelling`, `check:moneytext`, `check:dates` and `check:chrome` are green.
  `check:schema` is green after `npm run schema`.
- `check_plain_language.mjs --file src/data/financialAidReports.ts`: clean. No hook issue
  on any changed `metricValues.ts` line; the issues it lists predate this change.
- `coverage:floor`: unchanged. Davidson Day is still the floor; Covenant Day is at 91% and
  Carmel at 84%.
- `check:live` fails as designed until Phase 2: 18 stale `financial-aid-report` entries
  and 18 `metric-values` entries per locale. These are removed units, changed units and
  path shifts from the removed tiles.
- **Browser** (headed Chrome, `?lang=en`):
  - all seven schools' cards show the new text, and none of the removed figures or
    sources appear;
  - the Compare page (`?schools=…`) shows HG's new tuition cells, and Covenant / Carmel
    show N/A for "% receiving aid";
  - 390px HG shows no overflow.

  The one "45%" left on Gaston's card is its own section-completeness meter, not a figure.

## Phase 2 — every other locale

Use the `financial-aid-report` and `metric-values` overlay topics, with plainaid's Phase 2
method:
1. Snapshot the `main` work files.
2. Run `i18n_splice_work.mjs --topic financial-aid-report` and `--topic metric-values` for
   each locale. Removed units drop. Kept units refresh their `at`, which covers the path
   shift from the removed `stats[0]`. Each changed unit is added.
3. Pair each added unit with its dropped predecessor by `at`, and revise the reviewed
   translation. Figures are copied char-for-char, and the HG sub-lines and tips carry the
   new figures. HG `framing[1].body` should merge into the existing shared translation
   with no new work.
4. Rebuild with `i18n_build_overlay.mjs`.
5. Prove integrity by stamp, then run `check:live`, `check:runtime`, `check:digits`,
   `check:dates`, `check:moneytext`, `check:sepdrift` ×9, `check_figures.py` ×9 for both
   topics, and `npm run build`.
6. Browser check in `es`, `fa` and `hi`. Then open the PR, squash-merge, and do not deploy.

## Implementation notes — Phase 2 (2026-11-10)

- **Approval.** The user approved the English ("The English page is approved. Run only Phase 2"). Phase 2 ran in the same window, on `fix/aidsources`.
- **Splice:**
  - `financial-aid-report`: 958 kept / 8 added / 18 dropped per locale. The removed units drop, and Hickory Grove's `framing[1].body` merged into the shared, already-translated sentence.
  - `metric-values`: 890 kept / 14 added / 18 dropped. Several HG sub-lines merged into existing shared strings.
  - All 22 added units paired with a predecessor by `at` (0 unpaired).
- **Mechanical carry** (7 units per locale: HG's six Compare values and the `(2026–27 · TK–5)` sub-line): token swap on the reviewed `t`, after asserting that the same swap turns the old English into the new.
  - A first pass read `2025–26` as two numbers and produced "2027–27". The assertion caught it before anything was written, and the year-span-first pattern fixed it.
- **Translation.** Nine parallel `general-purpose` agents, one per locale, revised the remaining 15 units against their reviewed predecessors. The gate checked:
  - digits, and money/percent/year tokens;
  - `**` count;
  - no bidi controls and no non-Western digits;
  - `t` ≠ English and the length ratio;
  - English months.

  It found **0 problems ×9**.
- **Integrity by stamp vs the `main` snapshots:** across all 18 work files, every kept stamp has `text` and `t` byte-identical, and 0 new stamps are blank. Overlays: 965 (financial-aid-report) and 904 (metric-values) entries per locale.
- **Checks:**
  - `check:live` ✓ and `check:runtime` ✓;
  - `check:digits`: 198 compared, 0 to review;
  - `check:dates`, `check:moneytext`, `check:currency`, `check:fr`, `check:hi`, `check:fa`, `check:bidi`: ✓;
  - `check:sepdrift`: 0 ×9, and `check_figures.py` intact ×9 for both topics;
  - `i18n:leaks`: 0 flags on the 24 changed paths ×9;
  - `npm run build`: green.
- **Browser** (headed Chrome, `es`/`fa`/`hi`, seven schools' report cards plus Compare): 0 English leftovers, none of the removed figures or sources, and HG's new bands and Compare runs present. Hindi shows `$1,78,400`, the intended lakh grouping.
- **For a native reviewer:** HG `figureNote2` is new text in every locale (add-on, payment plan, after-school childcare, Mallard Creek bus).
