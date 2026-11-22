---
name: consistency4
title: Fix the findings of the round-4 consistency rescan, our errors first
status: in-progress
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
- D items, user decisions and UX-gated changes are held (table below).
- The three rule candidates are not fixes, so they are not built here.

## Approvals needed

- CAR-T4 (planner component), CAR-T9 (heading) and COV-T14 (header). None is approved.
  None is built. Once approved, each is designed in Claude Design first.

## Out of scope

| id | why held |
|---|---|
| PD-T1 | User decision: drop two colleges from the prose, or restore them to the list (the merge-never-replace rule). |
| CCD-T4 | Category D: needs your ruling or a source we could not open. |
| CCD-T11 | Category D: needs your ruling or a source we could not open. |
| CCD-T15 | Category D: needs your ruling or a source we could not open. |
| CAN-T17 | Category D: needs your ruling or a source we could not open. |
| LAT-T15 | Category D: needs your ruling or a source we could not open. |
| LAT-T16 | Category D: needs your ruling or a source we could not open. |
| LAT-T17 | Category D: needs your ruling or a source we could not open. |
| LAT-T18 | Category D: needs your ruling or a source we could not open. |
| CC-T16 | Category D: needs your ruling or a source we could not open. |
| COV-T14 | UX gate and chrome: a per-school table header. |
| COV-T15 | Category D: needs your ruling or a source we could not open. |
| CAR-T4 | UX gate: the planner needs a days-per-week field and a component change. |
| CAR-T6 | Category D: needs your ruling or a source we could not open. |
| CAR-T8 | Category D: needs your ruling or a source we could not open. |
| CAR-T9 | UX gate and chrome: a per-school matrix heading, or a rebuilt matrix. |
| DD-T4 | Category D: needs your ruling or a source we could not open. |

## Steps

### Phase 1 — English

1. Commit the worklist and the source-material re-verification notes.
2. Build the rows below. The exact finding for each is in `consistency4-data/findings.md`
   and the linked sweep file.
3. Ingest any source-material prose change through `ingest-source-material`.
4. Regenerate the schema and run the checks and the browser checks.
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
