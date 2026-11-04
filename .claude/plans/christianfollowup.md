---
name: christianfollowup
title: Use the rest of Charlotte Christian's 2026–27 profile — fill its empty Arts "Advanced coursework" Compare cell (2 AP + 9 Honors) and correct the Sports coaching card, which still calls Shonn Brown Upper School Principal (he is Associate Head of School; Dr. Phil Masters is Principal)
status: implemented
phases: 2
created: 2026-11-04
branch: feat/christian-profile-followup
prs: [422]
---

# Use the rest of Charlotte Christian's 2026–27 profile

## Goal

The user asked for "the latest testing data and GPA percentiles and any other data we can use"
from Charlotte Christian's **2026–27 Academic & Student Profile**:

```
https://resources.finalsite.net/images/v1725038322/charlotte/b12msqpqbmeqjqgszan1/2024_USprofile_admiss.pdf
```

**The testing data and GPA percentiles are already live.** Plan `christianprofile` (PR #418,
merged and deployed 2026-11-04) added all of the following to
`src/data/collegeSupportPrograms/charlotte-christian.ts`, in all ten locales:
- SAT 1120–1320 (83 testers) and ACT 21–29 (90 testers);
- the GPA middle 50% (3.604–4.199);
- the five Class of 2026 quintiles;
- 2026 AP results, the ~55:1 caseload, the matriculation split, scholarships, National Merit,
  the conservatory and Seal of Biliteracy shares, dual enrollment and the disciplinary policy.

This plan does **not** redo that work. Planning re-checked every figure on `main` on
2026-11-04: each one matches the profile.

A sweep of every Charlotte Christian data file against the profile found **two remaining
uses**, both outside College Support:

1. **Arts → Compare "Advanced coursework" is `null`** for Charlotte Christian, with the
   comment "advanced arts coursework not detailed". The profile's page 3 table now details it:
   **2 AP** (AP Art History, AP Art & Design) and **9 Honors** Fine Arts courses.
2. **The Sports coaching card is wrong about Shonn Brown.** It says he "remains Principal
   today" and labels him "now Upper School Principal". The profile's contact block, the
   school's leadership page and its Upper School page all name **Dr. Phil Masters** as Upper
   School Principal. The leadership page lists Brown as **Associate Head of School**.

It is done when both render correctly in English and then in the nine prose locales, and
`npm run build` is green.

## Context

### Sources (already on disk, uncommitted)

- **The profile transcription:**
  `source-material/college-support/charlotte-christian/Charlotte Christian - College Support - School Profile 2026-2027.md`,
  committed in #418. Its "Page 3" table holds the Fine Arts rows used here, and its "Contact
  block" names Masters.
- **The leadership correction:** written during this planning and **uncommitted**. It is a
  "Correction, 2026-11-04" section appended to
  `source-material/sports/charlotte-christian/Charlotte Christian - Sports - Redesign Research 2026.md`,
  quoting the leadership page, the Upper School page and the profile. It was appended to the
  existing file, rather than written as a new one, so ingest creates **no new research
  subtopic**.

### The profile's Fine Arts rows (page 3, verbatim)

- **Honors (9):** Acting Studio; Art III; Broadcasting; Upper School Choir; Digital Design and
  Animation II; Digital Music II; Jazz Band; Orchestra; Wind Ensemble.
- **AP / college level (2):** AP Art History; AP Art & Design.

Broadcasting is counted because the profile prints it under Fine Arts. The count follows the
school's own table.

### Files

- [`src/data/metricValues.ts`](../../src/data/metricValues.ts): the row `key: 'advanced-arts-coursework'`
  (topic `the-arts`, near line 1184).
  - The Charlotte Christian value is `null` at ~line 1190.
  - The row has a `quals` block (~1201–1231) with no Charlotte Christian entry.
  - **Format precedent:** Charlotte Catholic's `'1 AP + 12 Honors'` and its qual.
- [`src/data/sportsPrograms/charlotte-christian.ts`](../../src/data/sportsPrograms/charlotte-christian.ts),
  the `coaching` card (line 393):
  - `featured[]` Shonn Brown `detail` (~line 419) contains "while serving as Upper School
    Principal from 2017. He stepped down at 51 citing the strain of the dual role, and remains
    Principal today."
  - `tenure[0].role` (~line 423) reads `'Boys Basketball — now Upper School Principal'`.
  - `coaching.sources` starts at ~line 433.
- **Not changed:**
  - The Arts card (`src/data/artsPrograms/charlotte-christian.ts`) already names AP Art History
    and AP Art & Design. Its "six Honors ensembles" claim is sourced to the Upper School page
    and curriculum guide; the profile's list is "advanced course options" and not exhaustive,
    so it does not contradict them.
  - Research-note mentions of Brown in `source-material/college-support/...Redesign Research 2026.md`,
    which already flags the change as a discrepancy, render nowhere and stay.

### Why two phases

Both edits are research prose in overlay topics: `metric-values` (the qual) and `sports` (the
detail and tenure role). So English ships first, then the nine `PROSE_TRANSLATED` locales: es,
bn, ht, te, fr, fa, it, hi, ar. **There are no `src/locales/*.json` chrome changes.**

## Decisions

- **Arts cell value: `'2 AP + 9 Honors'`.** This follows Charlotte Catholic's format, since an
  AP-only count would understate a nine-course Honors tier.
  - Comment: `// 2026–27 profile, p.3 Fine Arts: AP Art History, AP Art & Design + 9 Honors (incl. Broadcasting)`.
  - Qual (`kind: 'scope'`): "Two AP arts courses, AP Art History and AP Art & Design, over nine
    Honors Fine Arts courses on the school's 2026–27 profile: Acting Studio, Art III,
    Broadcasting, Upper School Choir, Digital Design and Animation II, Digital Music II, Jazz
    Band, Orchestra and Wind Ensemble."
  - This backfills a school into an existing metric, so **no UX approval is needed**.
  - The row is unranked text, so it gets no leader tint (memory `compare-leader-ranks-strings`).
    Check that in the browser anyway.
- **Brown's wording states only what the sources say.** No date is published for his move, so
  never write "in 2026" or "since".
  - The `detail` sentence becomes: "…sending ten players to the professional ranks, while
    serving as Upper School Principal from 2017. He stepped down at 51 citing the strain of the
    dual role, and is now an Associate Head of School; Dr. Phil Masters is Upper School
    Principal."
  - The rest of the detail (the Luke Boythe clause onward) is unchanged.
  - `tenure[0].role`: `'Boys Basketball — now Associate Head of School'`.
  - Add a source to `coaching.sources`:
    `{ label: 'charlottechristian.com — Leadership (Associate Head of School, Upper School Principal)', url: 'https://www.charlottechristian.com/about/leadership' }`.
    Append it at the end, so no existing `at` path moves.
- **Out of scope:**
  - The **Celebrating the Class of 2026** document now linked from the Upper School page. The
    user asked about this PDF; offer that document as a follow-up.
  - JK–12 enrollment by division, and the head of school name. Neither has an existing home.
  - Deploying. **Never run `npm run deploy`.**

## Approvals needed

**None.** One `null` Compare cell is filled in an existing row, and one card's existing text is
corrected.

## Steps

### Phase 1 — English

1. **Branch and ingest.**
   - `git checkout main && git pull && git checkout -b feat/christian-profile-followup`.
   - Run `ingest-source-material` for `sports/charlotte-christian` to pick up the appended
     correction.
   - Keep only that school's sports changes. Watch for a manifest reorder (memory
     `two-topic-ingest-reorders-manifest`).
   - Stage explicit paths only, never `git add -A`.
2. **Arts Compare cell.** In `src/data/metricValues.ts`, set the Charlotte Christian value of
   `advanced-arts-coursework` and add its `quals` entry, both per Decisions.
3. **Sports coaching card.** Edit the `detail`, `tenure[0].role` and `coaching.sources` in
   `src/data/sportsPrograms/charlotte-christian.ts`, per Decisions.
4. Run `npm run schema`. Then run Verification Phase 1.
5. Commit and push. Verify the push with `git rev-parse HEAD` against
   `git ls-remote origin feat/christian-profile-followup`.
6. Set the INDEX row to `English shipped`, then **stop** for the user's review of the
   Compare Arts row and the Sports coaching card.

### Phase 2 — the nine prose locales (after the user approves the English)

7. **Re-extract and translate** the `metric-values` and `sports` overlays.
   - Use the method recorded in memory `christianprofile-shipped`. `i18n_extract.mjs` has **no
     carry-over**, so:
     1. re-extract to a throwaway `--lang xx --out <scratch>`;
     2. carry each locale's `t` across by **English text**;
     3. translate only the misses (expected: one qual, one detail, one role, one source label);
     4. rebuild with `i18n_build_overlay.mjs`.
   - Follow `prose-translation-architecture.md` and the per-locale docs.
   - Copy names and course titles as the existing entries do. Copy figures char-for-char.
8. **Finish.**
   - Run Verification Phase 2.
   - Open the PR with `--body-file` and merge it with `gh pr merge --squash --delete-branch`.
   - `git checkout main && git pull`.
   - Flip the INDEX row to Implemented with the PR link.
   - Say "merged — ready to deploy whenever you want it", and **do not deploy**.

## Verification

### Phase 1

- `npx tsc -b && npm run check:metrics && npm run check:schema`
- `npm run build`
- `grep -n "remains Principal\|now Upper School Principal" src/data/sportsPrograms/charlotte-christian.ts`
  should return nothing.
- **Browser** (`npm run build && npx vite preview`, Playwright, every `<details>` open):
  - Compare → The Arts: Charlotte Christian shows `2 AP + 9 Honors` with its tooltip.
  - The Charlotte Christian Sports coaching card shows the new detail and tenure role, and
    lists the Leadership source.

### Phase 2

- `npm run build`, which chains `check:live`, `check:runtime` and `check:chrome`.
- Per locale: `npm run check:sepdrift -- --lang <code>` and `npm run check:work`.
  Run `npm run check:fr` for French.
- `npm run i18n:leaks -- --lang <code>`, filtered to the changed `at` paths.
- Browser spot-check of both surfaces in `es` and `fa`.

## Implementation notes

- **Phase 2 used `i18n_splice_work.mjs`** (keyed by stamp) rather than a hand-rolled carry-over:
  sports had 2 units re-stamped (the Brown detail and tenure role) and metric-values gained 2
  (the `2 AP + 9 Honors` value and its qual). The new Leadership source label is not an
  extracted path, so it needed no translation. Titles follow each locale's existing handling:
  `Associate Head of School` is kept in English where that locale already keeps
  `Upper School Principal` / `Assistant Head of School`, and fa and ar translate it.
- **Added at the user's request during Phase 2:** both `kind: 'gap'` flags were removed from
  Charlotte Christian's College Support card. One was the 2021–22 "insufficient testing results"
  publication gap, the other "No gap-year policy or counselling is published…". The splice
  dropped their 2 units from every college-support work file. The research record in
  `source-material/` is unchanged.
