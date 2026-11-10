---
name: thespianname
title: Three user rulings — non-athlete student names removed site-wide (60 strings, 13 files); Gaston Day's Student Clubs rebuilt from the school's own website and documents only (third-party roster, Beta, Honor Council, Thespian Society removed; Compare count ≥10); then all nine locales
status: implemented
phases: 2
created: 2026-11-10
branch: fix/thespianname
prs: []
---

# Non-athlete student names, and Gaston Day clubs from school sources only

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

Splice **four topics** for each locale: `the-arts`, `student-clubs` (which covers `clubsPrograms`, `clubCatalog` and `clubClusters`), `college-support` and `metric-values`. Take the counts from the splice. Removed Gaston entries drop with no successor.

1. Pair each added unit with its predecessor by `at`.
2. Carry mechanically where the change is a pure name removal that a token edit of the reviewed `t` can reproduce, asserting on the English as plainarts did.
3. Revise the rest against the reviewed predecessor, with one subagent per group of locales and the plainarts gate (name exemption included). Each revision must not reintroduce any removed name; grep each `t` for the 95 removed names.
4. Rebuild the overlays, prove by stamp, and run the plainarts Phase 2 checks.

## Rulings 2 and 3 (same day)

- **Ruling 2.** The user: "Remove cary Mone name. Only student athletes name get mentioned since that case is so public." This is now a standing rule (memory `student-names-athletes-only`).
  - **Census.** A read-only census agent read every non-sports `src/data` prose string and found **63 strings naming 110 non-athlete students**, plus 4 unsure cases. All four keep their names: Ian Shephard (an adult playwright), Matthew Doty and Cade Tyson (athletes), and Eliza Newell (an adult instructor).
  - **Edits.** An editing agent removed the names in **60 strings across 13 files**: 10 arts files, 2 College Support files, `clubClusters.ts` and `metricValues.ts`. Every recognition, tier, role, year and ` · ` structure was kept. Examples:
    - "Best Actor (Griffen Evans as Harry Bright)" → "Best Actor (as Harry Bright)";
    - "Ella Hennessy ’28 took a GOLD KEY" → "a student took a GOLD KEY";
    - "Amara Aghedo and Christian Young" → "Two performers".
  - **Not edited.** The `src/content/**` research prose, where about 305 names are concentrated in Charlotte Christian's college list, is not rendered on these pages and is not edited here.
- **Ruling 3.** The user: "Gets gatson day club list only from school official docs or websites". A fresh research pass (persisted to `source-material/student-clubs/gaston-day/…Club Catalog and Overview.md`, "Update 2026-11-10", then re-ingested; the manifest order and other schools' Rebuilt dates were restored) checked:
  - the Upper School, Middle School and Arts pages;
  - the Academic Profiles for 2025-26 and 2023-24;
  - Fast Facts, Why Gaston Day, International, College Counseling and the strategic plan;
  - the school's issuu archive.

  **Result:** 10 school-named organizations — iGEM, VEX Robotics, 3-D Printing Club, Blutopia, Yearbook, Upper School Student Government, Peer Mentoring, Green Team, International Council and NHS.
  - **Removed (20 third-party entries):** among them National Beta Club, "Honor Council" (the school names only an Honor Code), Science Olympiad, Mock Trial, Quiz Bowl, FCA and the language and arts clubs. The iGEM years and projects, which came from wikis only, were removed too.
  - **Rewritten:** the Club Catalog, the Academic & Competitive Clubs card (the third-party "Competition clubs" row is gone) and the honors card (NHS only).
  - **Compare:**
    - `us-organizations` is now `≥10`;
    - the clubs matrix's FCA override and two orphan aliases were removed, so Gaston's arts-performance, faith and special-interest cells now read "Not listed";
    - the iGEM tip is now in the school's words.
  - **Schema:** `DATA-SCHEMA.md` regenerated.
- **Verification.**
  - **Hook:** all 13 arts files are hook-clean. The student-clubs and metricValues files report only issues that predate this change.
  - **Build and checks:** `tsc -b`, `vite build`, `check:schema`, `spelling`, `matrices`, `schoolurls`, `chrome`, `runtime`, `moneytext`, `dates`, `spans` and `photos` are all green.
  - **Review guards:** `plain_review --arts-markers` shows only the expected hits: the class-year digits that went with names, "April" (in April Liu) read as a month, and "two performers" where exactly two people were named.
  - **Browser:** across all 13 schools' arts, student-clubs and college-support sections, **0 of 95** removed full names render. Gaston's Student Clubs shows no Thespian Society, Beta Club, Mock Trial or third-party source.

## Implementation notes

### Phase 2 (2026-11-10)

- **Approval.** The user approved the English ("The English page is approved. Run only Phase 2"). Phase 2 ran in the same window, on `fix/thespianname`.
- **Splice** across 4 topics, per locale:
  - `the-arts` +53/−53;
  - `student-clubs` +27/−49 (22 removed Gaston entries have no successor; 4 new units have no predecessor);
  - `college-support` +2/−2;
  - `metric-values` +4/−4.
- **Translation.** Three subagents covered three locales each, 86 units per locale.
  - **Name removals:** made as exact cuts in the reviewed `t`.
  - **Gaston clubs:** pairing by `at` matched the wrong items where the catalog was rebuilt, so these units were translated fresh, with the old `t` as a terminology hint only.
- **Gate.** The plainarts gate gained two checks: a scan for the **95 removed names** and a scope-aware `**` rule. Two of its original rules were wrong for this batch and were fixed mid-run:
  - **The asterisk ban.** It is now a `**`-count match. College Support's `transcript.merit[].detail` renders `**bold**`, and `**6**` and `**16**` were restored in the 6 locales that had dropped them.
  - **`t` ≠ English.** It now allows figure-only values (Gaston's Compare `≥10` is kept as `≥10` in every locale, like `≥20`/`≥14`) and units whose reviewed predecessor also kept English (te keeps National Merit tier labels in Latin by convention).

  All nine locales then passed with 0 problems.
- **Integrity by stamp vs `main`:** every kept stamp is byte-identical and 0 new units are blank, in all 4 topics ×9. Across every non-sports overlay, **0 removed names** and **0 Cyrillic** characters remain.
- **Checks:**
  - `check:live`, `check:runtime`, `check:dates`, `check:moneytext`, `check:currency`, `check:fr`, `check:hi`, `check:fa`, `check:bidi`: ✓;
  - `check:digits`: 774 units · 0 to review;
  - `check:sepdrift`: 0 ×9, and `check_figures.py`: intact for all 4 topics ×9;
  - `npm run build`: green.
  - `i18n:leaks`: 1 flag on a changed path (te `charlotte-latin:transcript.merit[1].detail`). It is a legitimate keep: te renders every National Merit tier label in Latin.
- **Browser** (`?lang=es|fa|hi`, 11 schools × arts, student-clubs and college-support, every card open): **0** removed names render. Gaston's Student Clubs shows no Thespian Society, Beta Club or Mock Trial, and no untranslated English verdict.
- **For a native reviewer:**
  - "a student" / "two performers" phrasing and its gender choices (generic masculine unless the role implies otherwise);
  - glosses added where a short label would have equalled the English ("Honor Code", "National Honor Society", "Blutopia, Yearbook");
  - the Gaston clubs units are new translations with no reviewed predecessor.
