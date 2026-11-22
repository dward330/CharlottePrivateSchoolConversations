---
name: consistency4
title: Fix the findings of the round-4 consistency rescan, our errors first
status: english-done
phases: 2
created: 2026-11-22
branch: fix/consistency4
prs: []
closing_loop: consistency-self-scan
---

# Fix the round-4 consistency findings

## Goal

The rescan of `main` at `13551180` after consistency3 (PR #516) found 8 residue rows and 161
new findings (`consistency4-data/findings.md`). This plan fixes them, category A (our errors)
first.

## Context

Asked "plan now or hold off", the user replied on 2026-11-22: "Make the fixes in this feature
work please, especially the our errors part". So Phase 1 is planned and built in the window
that ran the rescan, an exception the user made to the two-window default. The English-first
stop, the UX gate and the no-deploy rule still apply.

## Decisions

- A first, then the residue rows, then B (attribution, no winner picked) and C (labels).
- Every value from an outside source is re-opened before it is typed. A value that moved,
  or whose source cannot be opened, is held and reported.
- A site that refused a fetch is not fetched again in this round.
- The held items were ruled on the same day (see Approvals). Five stay held.
- The three rule candidates are not fixes, so they are not built here.

## Approvals needed

**All given by the user, 2026-11-22:** "Approved for the 3 ux fixes. Include notre dame as power 4.
Providence day colleges -> fix. The rest is your recommendation".

- **CAR-T4, CAR-T9 and COV-T14 are approved.** Each is designed in Claude Design first, built to
  that design, then re-captured from the built app.
  - CAR-T4: a days-per-week field on the planner tier, and the per-camp-day figure divides by it.
    It is set on every four- and three-day tier at every school (11 tiers, six schools).
  - CAR-T9: Carmel's matrix heading reads "State-title matrix, 2019–26".
    Hickory Grove's reads "State-title matrix, 2021–25": the same bug at a second
    school, approved by the user 2026-11-22 ("Go with your recommendation").
  - COV-T14: Covenant's merit-table column header reads "AP results" (chrome, ten catalogs).
- **CC-T16: Notre Dame counts as Power 4, football included.** Football keeps "FBS Ind." in the
  conference column. Charlotte Christian 9 → 11, Charlotte Catholic stays 15. The cards and the
  Compare row note say "plus Notre Dame".
- **PD-T1: fixed by dropping both names from the two sentences.** The recommendation first given
  was to restore them to the list. That premise was false: neither was ever in the shipped list
  and neither is in the live 2023–2026 profile. Both come from a 2022–2025 list that never
  shipped, so merge-never-replace does not apply and nothing leaves the list.
- **CCD-T11:** keep the current class label (settled S9).
- **CCD-T4, CCD-T15, LAT-T18:** drop the unsourced claim.
- **LAT-T15, LAT-T16, LAT-T17:** fix from the committed record.
- **COV-T4:** the headline follows the list (89 if the recount holds).
- **CCD-T1, CCD-T2:** price the rows, with no all-in estimate.
- **CAN-T15:** the honor-society count stays twelve.
- **GD-T11 / X1:** the tile reads "Not published".
- **CAN-T17, CAR-T8:** left until a source can be opened.
- **COV-T15, CAR-T6, DD-T4:** approved and built 2026-11-22, after the English approval (the user: "Yes
  go with your recommendation on the fixes for those 3 schools"). Covenant is 19 camps by a browser
  check; the other two come from records already saved. **COV-T15 removes an array item: re-splice
  the summer-programs locale paths.**

## Out of scope

| id | why held |
|---|---|
| CAN-T17 | Left by the user until its source can be opened. |
| CAR-T8 | Left by the user until its source can be opened. |
| CCD-T11 | Kept as it is, by the user (settled S9). |

## Steps

### Phase 1 — English

1. Commit the worklist and the source-material re-verification notes.
2. Build the rows below. The exact finding for each is in `consistency4-data/findings.md`
   and the linked sweep file.
3. Ingest any source-material prose change through `ingest-source-material`.
4. Regenerate the schema and run the checks and the browser checks.
4a. Build the items ruled on 2026-11-22 (see Approvals).
5. Adversarial review (`/implement` 5b), then stop for the English review.

| id | cat | group | limit on the fix |
|---|---|---|---|
| PD-T4 | A | pd-ccd-cannon |  |
| PD-T5 | A | pd-ccd-cannon |  |
| PD-T6 | A | pd-ccd-cannon |  |
| PD-T7 | A | pd-ccd-cannon |  |
| PD-T8 | A | pd-ccd-cannon |  |
| PD-T9 | A | pd-ccd-cannon |  |
| PD-T10 | A | pd-ccd-cannon |  |
| PD-T11 | A | pd-ccd-cannon |  |
| PD-T12 | A | pd-ccd-cannon |  |
| PD-T14 | A | pd-ccd-cannon |  |
| PD-T15 | A | pd-ccd-cannon |  |
| PD-T18 | A | pd-ccd-cannon |  |
| CCD-T1 | A | pd-ccd-cannon | Price the row and make the percentage and its sentence true. Do not build an all-in estimate and do not add a figure, tile or row type: that is behind the UX gate. |
| CCD-T2 | A | pd-ccd-cannon | Same limit as CCD-T1. |
| CCD-T6 | A | pd-ccd-cannon |  |
| CCD-T7 | A | pd-ccd-cannon |  |
| CCD-T8 | A | pd-ccd-cannon |  |
| CCD-T14 | A | pd-ccd-cannon |  |
| CCD-T17 | A | pd-ccd-cannon |  |
| CCD-T18 | A | pd-ccd-cannon |  |
| CCD-T19 | A | pd-ccd-cannon |  |
| CCD-T20 | A | pd-ccd-cannon |  |
| CCD-T21 | A | pd-ccd-cannon |  |
| CCD-T24 | A | pd-ccd-cannon |  |
| CAN-T1 | A | pd-ccd-cannon |  |
| CAN-T2 | A | pd-ccd-cannon |  |
| CAN-T3 | A | pd-ccd-cannon |  |
| CAN-T4 | A | pd-ccd-cannon |  |
| CAN-T6 | A | pd-ccd-cannon |  |
| CAN-T7 | A | pd-ccd-cannon |  |
| CAN-T8 | A | dd-gd-hg-k8 | Owned by the dd-gd-hg-k8 group with GD-T3 (the shared row note). |
| CAN-T9 | A | pd-ccd-cannon |  |
| CAN-T10 | A | pd-ccd-cannon |  |
| CAN-T11 | A | pd-ccd-cannon |  |
| CAN-T14 | A | pd-ccd-cannon |  |
| LAT-T1 | A | latin |  |
| LAT-T3 | A | latin |  |
| LAT-T4 | A | latin |  |
| LAT-T6 | A | latin |  |
| LAT-T7 | A | latin | Delete the comparative clause. |
| LAT-T8 | A | latin |  |
| LAT-T9 | A | latin | blumenthalarts.org refused a fetch, so do not type 41. The 59 is dated 2026 on the same page: remove the wrong field size from the 2022 sentence. |
| LAT-T12 | A | latin |  |
| LAT-T13 | A | latin | Text inside the existing card only. No new sub-block. |
| LAT-T14 | A | latin |  |
| CC-T1 | A | cc-cchs-cov-carmel |  |
| CC-T2 | A | cc-cchs-cov-carmel |  |
| CC-T3 | A | cc-cchs-cov-carmel | Needs Blumenthal, which refused a fetch. Build only what a page on the school's own site supports; otherwise hold it. |
| CC-T4 | A | cc-cchs-cov-carmel | Remove our own inference ("rare sweep", "whole-cast") without typing a new claim about how Blumenthal picks finalists. |
| CC-T5 | A | cc-cchs-cov-carmel |  |
| CC-T6 | A | cc-cchs-cov-carmel |  |
| CC-T7 | A | cc-cchs-cov-carmel |  |
| CC-T8 | A | cc-cchs-cov-carmel |  |
| CC-T9 | A | cc-cchs-cov-carmel |  |
| CC-T10 | A | cc-cchs-cov-carmel |  |
| CC-T11 | A | cc-cchs-cov-carmel |  |
| CC-T12 | A | cc-cchs-cov-carmel |  |
| CC-T13 | A | cc-cchs-cov-carmel |  |
| CC-T14 | A | cc-cchs-cov-carmel |  |
| CCHS-T2 | A | cc-cchs-cov-carmel |  |
| CCHS-T3 | A | cc-cchs-cov-carmel |  |
| CCHS-T4 | A | cc-cchs-cov-carmel |  |
| CCHS-T5 | A | cc-cchs-cov-carmel |  |
| CCHS-T6 | A | cc-cchs-cov-carmel |  |
| CCHS-T7 | A | cc-cchs-cov-carmel | Same as CC-T3. |
| CCHS-T8 | A | cc-cchs-cov-carmel |  |
| CCHS-T10 | A | cc-cchs-cov-carmel |  |
| CCHS-T11 | A | cc-cchs-cov-carmel |  |
| CCHS-T12 | A | cc-cchs-cov-carmel |  |
| CCHS-T14 | A | cc-cchs-cov-carmel |  |
| CCHS-T15 | A | cc-cchs-cov-carmel |  |
| COV-T1 | A | cc-cchs-cov-carmel |  |
| COV-T2 | A | cc-cchs-cov-carmel |  |
| COV-T3 | A | cc-cchs-cov-carmel |  |
| COV-T4 | A | cc-cchs-cov-carmel | Delete CP Statistics after re-checking both sources. The headline then follows the list beneath it (89 if the recount holds). 86 stays a question for the user. |
| COV-T5 | A | cc-cchs-cov-carmel |  |
| COV-T6 | A | cc-cchs-cov-carmel |  |
| COV-T7 | A | cc-cchs-cov-carmel |  |
| COV-T11 | A | cc-cchs-cov-carmel |  |
| COV-T13 | A | cc-cchs-cov-carmel |  |
| CAR-T1 | A | cc-cchs-cov-carmel | An internal recount of the six placements on the card. |
| CAR-T2 | A | cc-cchs-cov-carmel | Same as CC-T3. |
| CAR-T3 | A | cc-cchs-cov-carmel | Same as CC-T3. |
| CAR-T5 | A | cc-cchs-cov-carmel |  |
| DD-T1 | A | dd-gd-hg-k8 |  |
| DD-T2 | A | dd-gd-hg-k8 |  |
| DD-T5 | A | dd-gd-hg-k8 |  |
| GD-T1 | A | dd-gd-hg-k8 |  |
| GD-T2 | A | dd-gd-hg-k8 |  |
| GD-T3 | A | dd-gd-hg-k8 | Also owns CAN-T8, the aftercare-cost row note and Hickory Grove's qual. |
| GD-T4 | A | dd-gd-hg-k8 |  |
| GD-T5 | A | dd-gd-hg-k8 |  |
| GD-T6 | A | dd-gd-hg-k8 |  |
| GD-T7 | A | dd-gd-hg-k8 |  |
| GD-T8 | A | dd-gd-hg-k8 |  |
| GD-T9 | A | dd-gd-hg-k8 |  |
| GD-T12 | A | dd-gd-hg-k8 |  |
| GD-T13 | A | dd-gd-hg-k8 |  |
| GD-T14 | A | dd-gd-hg-k8 |  |
| GD-T15 | A | dd-gd-hg-k8 |  |
| HG-T1 | A | dd-gd-hg-k8 |  |
| HG-T2 | A | dd-gd-hg-k8 |  |
| HG-T3 | A | dd-gd-hg-k8 |  |
| HG-T4 | A | dd-gd-hg-k8 |  |
| HG-T5 | A | dd-gd-hg-k8 | Change the data, not a shared en.json label. |
| HG-T8 | A | dd-gd-hg-k8 |  |
| TRI-T1 | A | dd-gd-hg-k8 |  |
| TRI-T2 | A | dd-gd-hg-k8 |  |
| TRI-T3 | A | dd-gd-hg-k8 |  |
| TRI-T4 | A | dd-gd-hg-k8 |  |
| PREP-T1 | A | dd-gd-hg-k8 |  |
| PREP-T2 | A | dd-gd-hg-k8 |  |
| PREP-T3 | A | dd-gd-hg-k8 |  |
| PREP-T4 | A | dd-gd-hg-k8 |  |
| CCD-28 | residue | pd-ccd-cannon | Round-1 residue: attribute the Verdict's "first in North Carolina" as L695/L718 do. |
| CCD-R1 | residue | pd-ccd-cannon | Round-2 residue: make the audition wording match the guide it cites. |
| PD-S1w | residue | pd-ccd-cannon | One word lost in round 3: "A Cappella and the ChargHers hold their own" needs "auditions" at the end of that phrase. |
| P-R4 | residue | latin | Round-3 residue: drop the year from the two aid-document link labels, after re-opening the Policies page and the documents. |
| P-R5 | residue | latin | Round-3 residue: the eight remaining "no contract date published" strings become "no contract due date" wording, as the round-3 fix did. |
| CAR-S1 | residue | cc-cchs-cov-carmel | Round-3 regression: the sports-ladder sentence must match the offered chips. |
| X1 | residue | cc-cchs-cov-carmel | The "$0" unpublished-aid tile at Covenant and Carmel becomes "Not published". |
| DD-S7 | residue | dd-gd-hg-k8 | Round-3 residue: the verdict must not present the 2020 6:00 window as current. |
| CCD-T3 | B | pd-ccd-cannon |  |
| CCD-T9 | B | pd-ccd-cannon |  |
| CCD-T10 | B | pd-ccd-cannon |  |
| CCD-T13 | B | pd-ccd-cannon |  |
| CCD-T22 | B | pd-ccd-cannon |  |
| CCD-T23 | B | pd-ccd-cannon |  |
| CAN-T12 | B | pd-ccd-cannon |  |
| CAN-T13 | B | pd-ccd-cannon |  |
| CAN-T15 | B | pd-ccd-cannon | Attribute the news post and fix the dev flag. The count stays twelve. |
| CAN-T16 | B | pd-ccd-cannon |  |
| LAT-T2 | B | latin |  |
| CCHS-T1 | B | cc-cchs-cov-carmel |  |
| COV-T8 | B | cc-cchs-cov-carmel |  |
| COV-T9 | B | cc-cchs-cov-carmel |  |
| DD-T3 | B | dd-gd-hg-k8 |  |
| GD-T10 | B | dd-gd-hg-k8 |  |
| GD-T16 | B | dd-gd-hg-k8 |  |
| HG-T6 | B | dd-gd-hg-k8 |  |
| HG-T7 | B | dd-gd-hg-k8 |  |
| PD-T2 | C | pd-ccd-cannon |  |
| PD-T3 | C | pd-ccd-cannon |  |
| PD-T13 | C | pd-ccd-cannon |  |
| PD-T16 | C | pd-ccd-cannon |  |
| PD-T17 | C | pd-ccd-cannon |  |
| CCD-T5 | C | pd-ccd-cannon |  |
| CCD-T12 | C | pd-ccd-cannon |  |
| CCD-T16 | C | pd-ccd-cannon |  |
| CAN-T5 | C | pd-ccd-cannon |  |
| LAT-T10 | C | latin |  |
| CC-T15 | C | cc-cchs-cov-carmel |  |
| CCHS-T9 | C | cc-cchs-cov-carmel |  |
| CCHS-T13 | C | cc-cchs-cov-carmel |  |
| COV-T10 | C | cc-cchs-cov-carmel |  |
| COV-T12 | C | cc-cchs-cov-carmel |  |
| CAR-T7 | C | cc-cchs-cov-carmel |  |
| CAR-T10 | C | cc-cchs-cov-carmel |  |
| DD-T6 | C | dd-gd-hg-k8 |  |
| GD-T11 | C | dd-gd-hg-k8 | Value "Not published" at Gaston Day and Hickory Grove. The Christian group does the same at Covenant and Carmel. Check that the value fits the figure slot. |
| HG-T9 | C | dd-gd-hg-k8 |  |

### Phase 2 — Every other locale

1. Merge `origin/main`. Re-extract, splice by stamp and run
   `consistency3-data/path_replay.mjs` to `TOTAL 0` in every locale.
2. Translate the changed units in es, bn, ht, te, fr, fa, it, hi and ar. Write `$a–$b`
   ranges in words in fa and ar.
3. Also fix the translation items consistency3 found and left: four title keys in the nine
   catalogs (`the-arts.ladder@charlotte-catholic`, `admissions.guide@` for Charlotte
   Christian, Hickory Grove and Trinity), es "El director" for the Covenant director, the
   English "million" in Gaston Day's merit rows, and older fa/ar money ranges and arrows.
4. Open the PR with `--body-file`, squash-merge, pull main, close the records, then rescan.
   Do not deploy.

## Verification

### Phase 1 — English

- [ ] `npm run build` up to the expected English-first stop at `check:live`, then each
      later gate on its own.
- [ ] `check:consistency`, `check:tuition`, `check:schema`, `coverage:floor`.
- [ ] The plain-language hook over every edited file.
- [ ] Page dumps: every built ID is visible and the old value is gone.
- [ ] `audit:mobile`, and a browser check of every changed planner and figure slot.

### Phase 2 — Locales

- [ ] `check:live`, `check:runtime`, `check:chrome`, `check:sepdrift`, `check:digits`,
      `check_figures.py`, `check:dates`, the path replay and the three browser audits.

## Implementation notes

### Phase 1 (2026-11-22, `fix/consistency4`)

- **How it was built.** Four agents fixed one school group each in a private copy of the branch.
  The parent read each app diff, re-opened the doubtful and high-stakes sources, applied it and
  ran the gates. Of 161 assigned rows: 153 built, 6 part-built, 2 held. The rows ruled on later
  and the approved UX fixes were built by the parent afterward.
- **Blumenthal rows: closed after review 1.** CCHS-T7, CAR-T3, CC-T3 and CAR-T2 were held
  because the site refused a fetch. The scan had already saved the lists, final 2026 nominees
  included, so they were built from those copies with no new request.
- **X2 was not complete, and is now.** A census of every roster school in the saved 2024, 2025
  and 2026 lists found false claims the scan missed: Hickory Grove 2026 (five finalists, not three
  nominees), Davidson Day 2025 (five finalists, not none), Country Day 2026 and 2024, Providence
  Day 2026's tiers, and Cannon's and Latin's missing 2026 finalists. All fixed.
- **Found, not built (omissions, no false claim):** Gaston Day has Blumey nominees or finalists in
  2024, 2025 and 2026 and no Blumey mention on its card. Older finalist years are missing at
  Davidson Day (2024), Latin (2023, 2024), Carmel (2023), Charlotte Christian (2023) and
  Charlotte Catholic (2024).
- **Adversarial review 2 (the capped last pass): 14 found, 14 fixed, 0 rejected.** These last fixes
  had no reviewer: the rescan covers them.
- **Found, not fixed, preexisting: student names in shipped content.** The `src/content/the-arts`
  files (generated from the research records) carry students named in Blumey lists, and Vite
  publishes them as lazy chunks even though no page renders them. The repo is public too. This
  needs the user's decision, so it was not changed here.
- **Adversarial review 1: 11 found, 11 fixed, 0 rejected.** For iGEM (finding 7) the wording is
  fixed. Whether a past team stays in Gaston Day's count of ten is the user's call.
- **More moved paths for Phase 2:** the Christian and Carmel Blumey ledgers, and theatre sources.
- **Part-built for want of a field:** GD-T10 (one `sourceUrl` per division), and DD-T3, HG-T6,
  HG-T7 (those cards take no verify flags, so a code comment holds the note).
- **Deviations from the worklist's proposed fix:**
  - CCD-T6: grades 1–2 also wait, 15 minutes.
  - CCD-T7: the 3:00 tier is "carpool siblings only", said on the card.
  - CCD-T20: the ask is narrowed, not dropped.
  - CAN-T16: both limits are attributed, the profile's to the Class of 2027.
  - LAT-T3: the ask says "such as", because more programs have no fee.
  - HG-T2: the value reads "rising 1–8, plus 11th and 12th". The proposed "rising 1–8, 11–12"
    failed `check:spans` and dropped out of the Compare ranking.
  - X1: the label drops "published", so the tile does not say it twice.
  - CC-T16 also corrected the sentence that the new count made false: football has six of the
    eleven Power 4 signees.
- **Design.** The three mocks were written to Claude Design and verified byte for byte before
  the build (Summer Programs Section, Sports Section Redesign, College Support Section
  Redesign). Re-capture them from the final Phase 1 build, after the review's fixes.
- **Ingest.** 88 generated files. schools.json kept HEAD order (same records), and 69 date-only
  notes were put back. No research bookkeeping reaches a page dump.
- **Coverage floor:** Davidson Day is now 33/45 (73%). CLAUDE.md, the add-school skill and its
  register entry were updated in d08a247a, approved by the user 2026-11-22.
- **Verified:** every build gate exits 0 except `check:live` (the expected English-first stop).
  The plain-language hook has 0 findings in 70 files. `audit:mobile` has 0 broken cards and 0
  overflow. The planner, both matrix headings and the column header were read in Chrome.

### Traps for Phase 2

- **Moved paths:** Latin Financial Aid questions (bus Q4 removed), PD After School checklist (one
  removed), Cannon Financial Aid components (one removed), CCD After School tiers (one inserted),
  Charlotte Christian theatre ledger and sources (inserted), Covenant math courses (CP Statistics
  removed), DD and GD questions, GD payment plans and checklists. Require `path_replay` TOTAL 0.
- **`src/content` moved.** `check:live` also reports a stale block in
  `financial-aid-tuition.content`. Re-run the content extractor (`i18n_extract_content.mjs`) and
  translate the changed blocks: they are a different layer from the data overlays.
- **"Not published" in `sections[].stats[].value` is skipped by the extractor** and would render
  English in nine locales. It needs an override that does not pull every figure into translation.
- **New chrome key:** `cardLabels.apResults`, for nine catalogs. `check:chrome` does not list it.
- **New prose key:** `matrixTitle`.
- **New money ranges** (`$195–$375`, `$1,670–$1,785`, `$175 to $600`): words in fa and ar.

### Phase 1 handed back (2026-11-22)

The design re-capture is done and verified. The English awaits the user's review.

**The user answered on 2026-11-22. The English is approved ("English is fine").**

1. **Student names:** "Please remove non-athlete student names. Thats a hard rule not to expose
   their names". This ends the 2026-11-10 allowance for names in research files. It runs on its
   own branch from main (`fix/student-names`). **Phase 2 merges main first and never carries a
   non-athlete student name into a translation, plan, work file or commit message.**
2. **Gaston Day iGEM:** "If there is no proof it is still active, drop the club". No proof was
   found, so it is out of the catalog (nine), clusters, honors, College Support and Compare
   (settled S10). **Array items were removed here: re-splice the locale paths.**
3. **Country Day's Compare cell:** now "2 Blumey wins (2022)".
4. **Missing award history** (Gaston Day, older years at five schools): next round, consistency5.

**Found, not fixed, preexisting:** literal markdown asterisks render in Providence Day College
Support, The Applicant's Edge, Senior Project row ("has *no* community-service requirement").
