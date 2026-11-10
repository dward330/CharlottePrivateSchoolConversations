---
name: thespianname
title: Remove Gaston Day's third-party International Thespian Society claim from Student Clubs (school website or documents only) and the eighth-grade-era student name from Charlotte Latin's Arts card; then all nine locales
status: english-done
phases: 2
created: 2026-11-10
branch: fix/thespianname
prs: []
---

# Gaston Thespian claim and Latin student name

## Goal

The user answered the two questions left open by [`artsfacts.md`](artsfacts.md) (#477), on 2026-11-10:

- **#1, Charlotte Latin "Anjali Rao ’27 (fashion, 2023)":** "remove student name". She was an eighth grader at the time of the 2023 award (K–8 names rule).
- **#2, Gaston Day's Student Clubs Thespian claim:** "only school website or docs only".

Built directly at the user's request (`aidsources` precedent). This file is the record. Two-phase.

## Evidence for #2

The claim came only from `source-material/student-clubs/gaston-day/…Academic and Competitive Clubs.md`, whose roster is "reconstructed from third-party listings — Private School Review and Niche". Three of the school's own sources were checked on 2026-11-10, and none names an International Thespian Society troupe or any honor society:
- `https://www.gastonday.org/arts/` (its Drama section mentions only two shows a year and the Actors' Conservatory Theatre);
- `https://www.gastonday.org/upper-school/` (which names only "3-D Printing Club … Green Team … International Council");
- the 2025-26 Academic Profile, as recorded in the app's research.

## What changed (Phase 1, English)

| File · unit | Change |
|---|---|
| `clubsPrograms/gaston-day.ts` `honors.societies[]` | International Thespian Society entry removed |
| `clubsPrograms/gaston-day.ts` `honors.headline` | "Three chartered honor societies" → "Two chartered honor societies" |
| `clubsPrograms/gaston-day.ts` `honors.flags[0].text` (dev-only gap flag) | "any of the three societies" → "either society" |
| `clubClusters.ts` gaston `rows[4].oneLiner` / `.note` | ", International Thespian Society" dropped; "Three chartered societies" → "Two"; "troupe numbers" dropped |
| `clubCatalog.ts` gaston | the International Thespian Society entry removed |
| `metricValues.ts` `us-organizations` gaston | `'31'` → `'30'` (28 named clubs + 2 honor societies; the comment records why) |
| `artsPrograms/charlotte-latin.ts` `visual.footnote` | "Anjali Rao ’27 (fashion, 2023)" → "another student (fashion, 2023)" |

Gaston's Arts card already says "It does not say whether it has an International Thespian Society troupe" (#477), so it needed no change. The Thespian entries for other schools are school-sourced and untouched.

## Verification (Phase 1)

- **Hook:** `charlotte-latin.ts` is clean. The three Student Clubs files report only pre-existing issues; that area has not had its plain-language pass yet, and these edits only shortened strings.
- **Build and checks:** `tsc -b` and `vite build` pass, and so do `check:schema`, `spelling`, `matrices`, `schoolurls`, `chrome`, `runtime`, `moneytext`, `dates`, `spans` and `photos`.
- **`check:live`:** 6 stale `student-clubs` stamps and 1 stale `the-arts` stamp per locale. 2 of them are removed strings; the other 5 changed and are Phase 2's input.
- **Browser** (`?lang=en`):
  - Latin's Arts card shows no "Anjali" and does show "another student (fashion, 2023)";
  - Gaston's Student Clubs shows no "International Thespian" and reads "Two chartered honor societies";
  - Compare `us-organizations` shows Gaston at 30.

## Phase 2

Splice `the-arts` and `student-clubs` for each locale, expecting 5 added and 7 dropped in total per locale. Then revise the 5 changed units against their reviewed predecessors, gate them, rebuild, prove by stamp, and run the plainarts Phase 2 checks.

## Implementation notes

*Phase 2 notes go here.*
