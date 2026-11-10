---
name: artsfacts
title: Fix the open issues plainarts flagged — The Arts fact corrections (Christian AP Music Theory, CCD McGovern, Cannon "two offerings" and AV quote, Catholic nominee/finalist tiers, Trinity production list and recording lengths, HG "nominated", Gaston Thespian charter), literal asterisks (Catholic holdsUp, HG Exodus), Carmel's TO VERIFY bookkeeping, and Cyrillic homoglyphs in three ht translations; then all nine locales
status: implemented
phases: 2
created: 2026-11-10
branch: fix/artsfacts
prs: [477]
---

# The Arts — fix the issues plainarts flagged

## Goal

The user asked: "fix the open issues you flagged please". The issues were flagged at the end of
[`plainarts.md`](plainarts.md) (PR #476, under Candidates and in the closing report). This change
was built directly at the user's request, not through `/plan`, following the `aidsources` precedent.
This file is the record. Two-phase: English first, then the nine prose locales.

## What changed (Phase 1, English)

Each fix was checked against the school's own documents or the app's research files before
it was made.

| School · unit | Was | Now | Evidence |
|---|---|---|---|
| charlotte-christian `music.boardNote`, `verdict.ask[8]` (and the file's header comment) | "no AP Music Theory" / "There is no AP Music Theory" | AP Music Theory appears only on the Upper School curriculum guide’s AP roster, with no course description, so whether it runs is not published. The tour question now asks whether it runs. | The 2026–27 US Course Curriculum Guide's AP roster lists "Advanced Placement Music Theory" with no description (`source-material/course-offerings/charlotte-christian/…Curriculum Guide.md`). `courseOfferings.ts` and `ARTS_MATRIX` cite it. The "2 AP" stat tile and the Compare `advanced-arts-coursework` cell come from the 2026–27 **profile**, which lists two arts APs, so they stay. |
| charlotte-country-day `theatre.honestContext` | "Sabrina McGovern earned lead-category nominations in three consecutive cycles" | "placed in three consecutive cycles, twice in the Best Actress category (2023 and 2025)" | The school's own ledger shows 2024 as Best **Supporting** Actress, and 2023–24 as placements. |
| cannon `music.boardNote` | "Two offerings are unusually contemporary…" (names only one) | "Modern Ensemble is unusually contemporary for a K–12 department. It takes…" | The research file applies "unusually contemporary" to Modern Ensemble only. |
| cannon `theatre.whoRunsIt` | the AV control room "was, in the school’s words, 'specifically designed…'" | the control room "has computer systems that were, in the school’s words, …" (the quote is byte-identical) | The research file quotes: "Computer systems were specifically designed for students to assist…". |
| charlotte-catholic `theatre.headline`, `theatre.subhead` | "five more nominations in 2026"; "a rare sweep of nominations" | "five more placements in 2026"; "a rare sweep of finalist placements" | The 2026 ledger shows 4 nominees and 1 finalist, and the 2025 sweep was all finalists. The card's own `holdsUp[2]` already said "placements". |
| trinity-episcopal `verdict.ask[2]` | the profile "says 4th Grade Musical and a Middle School fall play plus winter musical" | adds "5th Grade Shakespeare Review" | The profile PDF, verbatim in the research file: "4th Grade Musical; 5th Grade Shakespeare Review; Middle School fall play, winter musical…" |
| trinity-episcopal `ladder.enrichment[0].text` | "Concerts, plays and the Shakespeare review run 20 to 70 minutes each." | "The full concerts and plays, including the Shakespeare review, run 20 to 70 minutes each." | The Vimeo table shows full performances at 21:48–69:43. The 10:48 and 13:16 items are selection clips. |
| hickory-grove-christian `theatre.honestContext`, `verdict.holdsUp[0].text` | "a repeat producer of nominated performers" | "…of recognized performers" (identical at both sites) | Christian Young was a 2025 **finalist** and a 2026 nominee. Only Aghedo was nominated in both years. |
| gaston-day `theatre.honestContext` | "It names no International Thespian Society troupe number, even though it chartered a chapter of the society." | "It does not say whether it has an International Thespian Society troupe." | The only source is the student-clubs roster, "reconstructed from third-party listings" (Private School Review, Niche). The card's own `verdict.ask[6]` asks whether a troupe exists. The Student Clubs card's honor-society entry, which carries the same claim, is a different area and is left unchanged (see below). |
| charlotte-catholic `verdict.holdsUp[0–5].text` | `**…**` in 6 units | asterisks removed, words unchanged | The arts fields render no markdown, so these showed as literal asterisks. |
| hickory-grove-christian `ladder.divisions[…].items[…]` | "the \*Exodus\* yearbook" | "the Exodus yearbook" | Same reason. |
| carmel-christian `theatre.ledger[2].year` (non-prose) | `'~2022-23 (year to verify)'` | `'~2022-23'` | Research bookkeeping that rendered to parents. `year` is not extracted, so it changes in every locale at once. |
| carmel-christian `theatre.ledger[2].result`, `music.ladder[2].text`, `visual.pathNote` | "…and is TO VERIFY." / "did not surface in this pass (TO VERIFY)." / "…is not published (TO VERIFY)." | the token is dropped and the claim kept ("could not be confirmed", "is not published") | Research bookkeeping, as in plainarts Batch 2. |

That is **22 changed prose units**, plus the one non-prose `year` cell.

**Translation-layer fix (no English change):** three ht translations held **Cyrillic homoglyphs**. They are `course-offerings` `d9d06b97` ("enteprетatif" → "entepretatif") and `sports` `1dd1117d` and `9672ce9d` ("konpetисyone" → "konpetisyone"). Their stamps are unchanged, and both overlays were rebuilt. A scan of all 136 catalog and overlay files now finds no Cyrillic. (The two ht Arts units with the same defect were fixed in #476.)

**Left as is, on purpose:**
- **Charlotte Latin "Anjali Rao ’27 (fashion, 2023)".** The user was asked at plainarts Batch 1 whether this name of a then-eighth-grader should go, and did not answer. She is in high school now, so the name stays. It is reported again.
- **Gaston Day Student Clubs' "The school charters the society…".** It is in `clubsPrograms/gaston-day.ts`, a different area with its own third-party-roster caveat. It is reported, not changed.
- **The "at time of research" bookkeeping** on Christian `theatre.season[0].detail` and Cannon `ledger[0].result`, and the 12-word UNPUBLISHED matcher gap in `plain_review.mjs`. Both are listed in plainarts Candidates as later work, not as user-facing errors.

## Verification (Phase 1)

- **Hook:** `check_plain_language.mjs --file` is clean on all 8 changed arts files.
- **Guards:** `plain_review.mjs --dir src/data/artsPrograms --arts-markers --no-md --md-paths '^$'` shows 22/22 `hook: pass`, with after-grade ≤10. Its 17 guard failures are each one of the intended corrections:
  - (n) Cannon −"two", Christian −"twice" ×2, and CCD +"twice";
  - (b) CCD +2023 +2025, and Trinity +5;
  - (h) Catholic NOMINEE lost ×2, and Carmel's "could not be confirmed" adding VERIFIED/NOTFOUND;
  - (l) Catholic `**` 6×;
  - (f) Carmel `year`.
- **Build and checks:** `npx tsc -b` and `npx vite build` pass, and so do `check:schema`, `check:spelling`, `check:matrices`, `check:schoolurls`, `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`, `check:spans` and `check:photos`.
- **`check:live`:** 22 stale `the-arts` stamps per locale, which is Phase 2's input.
- **Browser** (headed Chrome, `vite preview`, every arts card open, `?lang=en`):
  - 22/22 changed units render;
  - **0 asterisks** in any of the 8 schools' arts sections, Catholic and HG included;
  - Carmel shows no "TO VERIFY" or "(year to verify)".

## Phase 2 — every other locale

Use plainarts' Phase 2 method exactly:
1. Snapshot the `main` work files.
2. Run `i18n_splice_work.mjs --lang <code> --topic the-arts` for each locale. Expect 22 added / 22 dropped per locale.
3. Pair each added unit with its predecessor by `at`.
4. Carry the 6 Catholic `holdsUp` units and the HG Exodus item mechanically: copy the reviewed `t` with its `*`/`**` stripped, after asserting that stripping the same marks from the old English gives the new English.
5. Revise the other 15 with one subagent per locale, through plainarts' gate (with the April-Liu name exemption). Each revision keeps the reviewed terms, the tier words (placement vs nominee) and the quote.
6. Rebuild the overlays, prove by stamp, and run the plainarts Phase 2 checks.

## Implementation notes

### Phase 2 (2026-11-10)

- **Approval.** The user approved the English ("The English page is approved. Run only Phase 2"). Phase 2 ran in the same window, on `fix/artsfacts`.
- **Splice:** 1,154 kept / 22 added / 22 dropped per locale. All 22 paired 1:1 by `at`.
- **Mechanical carry** (7 units per locale: Catholic `holdsUp` ×6 and the HG Exodus item). Each reviewed `t` was copied with `*`/`**` stripped, after confirming that stripping the same marks from the old English gives the new English. No asterisk remained.
- **Revision.** The other 15 units per locale were revised by three subagents, each covering three locales, instead of nine. That deviates from the plainarts method, because the batch was small. Each `t` is the reviewed `oldT` with only the changed spans replaced, applied by exact find-and-replace.
- **Gate.** The plainarts gate, with the April-Liu name exemption, passed 22/22 in all nine locales after one fix:
  - **The problem.** In a fa mechanical unit (`d785fada`), the reviewed `t` wrote the English `+1` quality point as `1+`.
  - **The fix.** It is now `+1`, char-for-char, as plainarts Phase 2 already did for the same figure.
- **Wrong-script scan:** clean.
- **Integrity by stamp vs `main`:** 1,154 kept stamps are byte-identical, 22 are new, and 0 are blank, ×9.
- **Checks:**
  - `check:live`, `check:runtime`, `check:dates`, `check:moneytext`, `check:currency`, `check:fr`, `check:hi`, `check:fa`, `check:bidi`: ✓;
  - `check:digits`: 198 units compared · 0 to review;
  - `check:sepdrift`: 0 ×9, and `check_figures.py`: intact ×9;
  - `i18n:leaks`: 0 flags on the 22 changed paths ×9;
  - `npm run build`: green.
- **Browser** (`?lang=es|fa|hi` on Catholic, Carmel and Christian, every card open): 13/13 changed units are translated per locale. There is no English-only text, no `*`, and no "verify" token.
- **For a native reviewer:**
  - "placements" and "recognized performers" are new tier words;
  - "curriculum guide" is new wording in several locales;
  - es "Mejor Actriz" vs Carmel's English "Best Actress";
  - "5th Grade Shakespeare Review" is kept Latin in some locales and translated in te/ar, following each one's reviewed grade-label pattern.
