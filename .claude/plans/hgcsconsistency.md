---
name: hgcsconsistency
title: Fix five consistency issues on Hickory Grove Christian's dossier — stale ESS text in College Support, the $2,227 fee question, ESS scope vs. the wellness team, the staff-list split, and TK vs. K5
status: english-done
phases: 2
created: 2026-10-23
branch: fix/hgcsconsistency
prs: []
---

# Hickory Grove Christian — five consistency fixes

## Goal

Learning Support & Student Services (PR #357, 2026-10-21) has made some text on Hickory
Grove Christian's page (`/school/hickory-grove-christian/`) stale, and left a few seams
between areas. This plan fixes five of them. Every change rests on a passage in the school's
own pages, re-fetched 2026-10-23. A parent reading College Support and Learning Support
should no longer meet two contradicting claims.

The user's request numbered the items **1, 3, 4, 5, 6** (there is no item 2). This plan
keeps that numbering so the closing summary maps one-to-one.

## Context

**Where the content lives** (all confirmed):

- Learning Support data: `src/data/learningSupport/hickory-grove-christian.ts`. Types are in
  `src/data/learningSupport.ts`, rendered by `src/components/LearningSupport.tsx`.
- College Support data: `src/data/collegeSupportPrograms/hickory-grove-christian.ts`.
  Rendered by `src/components/CollegeSupport.tsx`, dispatched from
  `CollegeSupportCardBody` in `src/pages/SchoolDetail.tsx` (≈L273).
- Research record: `source-material/learning-support/hickory-grove-christian/Hickory Grove Christian - Learning Support - Official Site Research.md`.
  **It now ends with a "Re-verification 2026-10-23 (plan `hgcsconsistency`)" section,
  written during planning and not yet committed or ingested.** That section is the
  authority for every decision below. Its source IDs are S1, S2, S3, S5, S7, and a new
  S14 (`https://www.hgchristian.org/academics/tk-or-k5`).
- Overlays: `src/data/overlays/{learning-support,college-support}.<lang>.json`, with work
  files in `src/data/overlays/work/`. All nine `PROSE_TRANSLATED` locales (es, bn, ht, te,
  fr, fa, it, hi, ar) already have both topics.

**The stale-claim sweep (item 1) is complete.** All HGCS data was grepped: every
`src/data/*Programs/hickory-grove-christian.ts`, `src/data/summer/…`, every
`src/content/*/hickory-grove-christian.json`, plus `financialAidReports.ts`,
`metricValues.ts`, `courseOfferings.ts` and `highSchools.ts`. The search terms were ESS /
Educational Support / SCA / learning difference / resource room / accommodation / 504 /
IEP / tutor. **Only two stale claims exist, both in College Support:**

- `wholeClass.support[0].text` (≈L534): "…but publishes no learning-differences program
  detail, resource-room description, or accommodations figures."
- `verdict.checklist[3]` (≈L591): "What does Educational Support Services (ESS) provide,
  and how are College Board / ACT accommodations documented?"

The Admissions mentions of IEP/504 and of the ESS fee PDFs are accurate and stay. The
stale line is **not** in the College Support research file, so it was written during
synthesis and nothing upstream needs correcting.

**Cross-topic link pattern.** College Support's `RichText` handles `**bold**` only, and
there is no link markup in data. The existing precedent is AfterSchool's "See Summer
Programs →" (`src/components/AfterSchool.tsx` ≈L284–300). There, `SchoolDetail` passes
`hasSummer={covered.some((c) => c.slug === 'summer-programs')}` (≈L1351). The anchor
scrolls in place with `preventDefault` + `scrollIntoView`, because the hash router owns
`location.hash`. Its label is the chrome key `afterSchool.seeSummer`, and its style is
`.as-summer-link` (`src/index.css` ≈L5346). Section ids are `topic-${slug}`
(`SchoolDetail.tsx` ≈L1025), so the target is `topic-learning-support`.

**Fields already exist for every new sentence.** `EligibilityCard.note?: string` renders
muted under the three cells (`LearningSupport.tsx` ≈L161). `StaffCard.note?: LearningLead`
renders under the staff list (≈L305). Neither is set for Hickory Grove today. Both are
already classified for extraction: `staff.note.strong` / `.muted` are explicit in
`scripts/i18n_fields.mjs` ≈L793, and `note` is a default prose field (L29).

## Decisions

- **Item 1 — stale ESS text.** The support row becomes a brief accurate summary, and a
  "See Learning Support & Student Services →" link scrolls to `#topic-learning-support`.
  The link reuses the AfterSchool `hasSummer` pattern and shows only when the school has
  that area. The checklist question narrows to College Board / ACT accommodations, which
  no source answers (the fee schedule's "testing accommodations" are in-school testing).
- **Item 3 — $2,227 is genuinely Academic Coaching.** S3 prints "Academic Coaching
  $2227/year* / Up to 3 hours weekly $1113/semester". The HS Instructional Support Class
  separately prints "$4455/year*" then "$2227/year". The grid row stays as is. Ask-the-School
  question #2 stays, because the class's second figure is a real ambiguity in the PDF. It is
  **reworded** to say the class *prints two figures*, so it no longer reads as a clash with
  the coaching fee. No TO VERIFY note is needed.
- **Item 3 — every other grid fee matches S3.** $300; $370/$760/$1,200; $1,892–$4,414;
  $1,806/$903; $4,455; $1,500–$2,000. The "$300+" / "up to $4,455" stat tile is right.
  There are **no mismatches**.
- **Item 4 — clarify in both places.** Add `eligibility.note`, and add one sentence to the
  "Counseling & emotional support" row detail. The wording stays within what S2/S5 say: the
  exclusion is about ESS's own specialization, and the wellness team offers faith-based
  counsel. "Not clinical" is phrased as **"the school does not describe it as clinical or
  behavioral intervention"**, because no source says either way, and the research records
  that no licensed counselor or psychologist is named.
- **Item 5 — note, don't add.** S2's SS Staff list (the basis of "9 named Student Services
  staff") does not include Bennett. She is listed on S7, the High School → College and
  Career Planning page. Adding her would break the stat's definition, so `staff.note`
  explains the split and points to College Support. The stat stays **9**. Add `COUNSELING`
  to `staff.sources` so the note is cited.
- **Item 6 — sources are silent on TK.** The school enrolls TK (S14), and every ESS fee
  line starts at K5 (S3). The tile value stays **K–12**. Its note says TK access is not
  stated, and a seventh Ask-the-School question is added.
- **The new question is appended last** (index 6), not inserted. Inserting shifts the `at`
  paths of every later question and stales their overlay entries (memory:
  `overlay-at-paths-go-stale-on-row-delete`).
- **`ask.asOf` → "October 23, 2026".** The card's convention is "the date the research
  was checked", and the research was re-checked that day.
- **No "NOT STATED" chip is added for TK.** Chips belong to service rows, and TK is a grade
  span, not a service. A dashed chip in the stat strip would be a new UI element. The
  prose "is not stated" is enough, and the question carries it.

## Approvals needed

- **The College Support → Learning Support link is a small UI addition**: a component prop,
  one chrome key and one CSS rule. The user asked for it directly ("Link or anchor it to
  #topic-learning-support"), and CLAUDE.md treats a direct request to add UI as its own
  approval. No further approval is needed, but the Phase 1 review should look at it.
- Otherwise **none**. There are no new cards, sections, stat tiles, metric keys or Compare
  rows. `eligibility.note` and `staff.note` are existing optional fields of existing cards.

## Source material

- `source-material/learning-support/hickory-grove-christian/Hickory Grove Christian - Learning Support - Official Site Research.md`:
  appended "Re-verification 2026-10-23" (Q1–Q4) during planning. **Uncommitted, not yet
  ingested.** Step 1 ingests it.

## Out of scope

- Re-wording College Support's counseling card. It calls the office "two-person (Bennett +
  Similton)", which matches its own source, the High School Profiles. Only Learning
  Support's staff card gets the bridging note.
- The 2024-25 SCA fee PDF (S4), which the ESS page still links.
- The Compare page. Learning Support stays in `COMPARE_DEFERRED_TOPICS`.
- Deploying. **Never** run `npm run deploy`.

## Steps

### Phase 1 — English

1. **Branch and ingest.** `git checkout -b fix/hgcsconsistency` from an up-to-date `main`.
   Run the `ingest-source-material` skill for the changed research file. This regenerates
   `.claude/docs/learning-support/…`, `src/content/learning-support/hickory-grove-christian.json`,
   and `src/data/schools.json` if anything moved. Inspect the diff: only learning-support
   files should change.

2. **Item 1a: College Support support row.** In
   `src/data/collegeSupportPrograms/hickory-grove-christian.ts`, `wholeClass.support[0]`,
   keep `label: 'Educational Support Services'` and replace `text` with:

   > `'Fee-based **Educational Support Services (ESS)**, under an annual contract, serve K5 through 12th grade: accommodations plans built from educational testing or a prior 504/IEP, approved testing accommodations, and high school Academic Coaching.'`

   (S2: "Educational Support Services also assists with the implementation and monitoring
   of accommodation plans". S3: "All services require an annual contract/financial
   agreement", the K5-12th lines, "Approved Pull-Out/Push-In Testing Services", and
   "Academic Coaching".)

3. **Item 1b: the link.**
   - `src/components/CollegeSupport.tsx`: give `WholeClassBody` a second prop,
     `hasLearningSupport = false` (`{ data, hasLearningSupport = false }: { data: WholeClass;
     hasLearningSupport?: boolean }`). Inside the support `<div>`, after `<Rows rows={data.support} />`
     and before `supportNote`, render the link only when `hasLearningSupport`:
     `<p className="cs-ls-link-row"><a className="cs-ls-link" href="#topic-learning-support"
     onClick={…preventDefault; document.getElementById('topic-learning-support')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{t('collegeSupport.seeLearningSupport')}</a></p>`.
     Copy AfterSchool's comment explaining why the anchor scrolls in place.
   - `src/pages/SchoolDetail.tsx`: give `CollegeSupportCardBody` a `hasLearningSupport`
     prop, pass it through in the `'wholeClass'` case, and at the call site (≈L1260) pass
     `hasLearningSupport={covered.some((c) => c.slug === 'learning-support')}`. These are
     the only two consumers of `WholeClassBody` (grep confirmed).
   - `src/locales/en.json`: add `"seeLearningSupport": "See Learning Support & Student Services →"`
     to the `collegeSupport` block (≈L264).
   - `src/index.css`: next to the other `cs-` rules, add
     `.cs-ls-link-row { margin: 8px 0 0; }`,
     `.cs-ls-link { color: var(--brand); font-weight: 600; }` and
     `.cs-ls-link:hover { text-decoration: underline; }`. **Not** `white-space: nowrap`:
     the translated label is long and must wrap at 320px.

4. **Item 1c: College Support checklist.** Replace `verdict.checklist[3]` with:

   > `'How does the school document and support College Board and ACT testing accommodations for a student with an ESS accommodations plan?'`

   Keep it at index 3, an in-place text swap.

5. **Item 3: fee question.** In `src/data/learningSupport/hickory-grove-christian.ts`,
   replace `ask.questions[1]` with:

   > `'The 2026–27 fee schedule prints two figures for the HS Instructional Support Class: $4,455 a year and $2,227 “/year.” Is $2,227 the per-semester price?'`

   Leave the Executive-function coaching row's `$2,227 a year, or $1,113 a semester`
   unchanged.

6. **Item 4: scope clarification.**
   - Add `eligibility.note`:
     > `'That limit is on ESS’s academic services. A separate wellness team offers “biblical counsel through mentorship and discipleship, peer support groups”; the school does not describe that support as clinical or behavioral intervention.'`
   - In the "Counseling & emotional support" row, append one sentence to `detail`:
     > `… The high school has a Director of Counseling. This team is separate from ESS, and the school does not describe its support as clinical or behavioral intervention.`
   - Add `WELLNESS` to `eligibility.sources` (it becomes `[ESS, HUB, WELLNESS]`).

   The quoted fragment is verbatim from S5. Do not alter it.

7. **Item 5: staff note.** Add to `staff`:
   ```ts
   note: {
     strong: 'Tracey Bennett, the high school’s Director of Counseling, is not on this list.',
     muted: 'The school lists her on its College and Career Planning page rather than the Student Services staff list. College Support covers the counseling office, where the school profile pairs her with Dr. Similton.',
   },
   ```
   Set `staff.sources: [ESS, COUNSELING]`. Leave `headline` ("Nine named Student Services
   staff…") and `stats[1]` (`'9'`) unchanged; both stay accurate.

8. **Item 6: TK.**
   - `stats[0].note` →
     `'K5 through 12th grade, per the 2026–27 fee schedule; ESS access for Transitional Kindergarten is not stated'`.
     `value` stays `'K–12'`.
   - Append `ask.questions[6]`:
     > `'Can a Transitional Kindergarten (TK) student receive ESS services? Every line on the 2026–27 fee schedule starts at K5.'`
   - `ask.headline` →
     `'Seven questions to take on the tour, covering what the school’s site leaves unanswered: methods, fees, documentation, grade span, therapy and health staff.'`
   - `ask.asOf` → `'October 23, 2026'`.
   - In the file's header comment, change "fetched 2026-10-20" to "fetched 2026-10-20,
     re-verified 2026-10-23".

9. **Regenerate and check.** Run `npm run schema`; no card or key changes, so
   `DATA-SCHEMA.md` should not move. Then run `npx tsc -b` and `npm run build`
   (see Verification; `check:live` is expected red).

10. **Browser check** (Verification below), then commit with **explicit paths**
    (`git status --short` first), push, and verify the push
    (`git rev-parse HEAD` vs `git ls-remote origin fix/hgcsconsistency`). Flip the plan
    and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing
below runs until they confirm the English. Include the per-item summary the user asked for
in that stop message (see "Closing summary" below).

### Phase 2 — Every other locale

Two layers, both needed:

- **Prose overlays** (`PROSE_TRANSLATED`: es, bn, ht, te, fr, fa, it, hi, ar) for
  `learning-support` and `college-support`. Mechanism:
  `.claude/docs/prose-translation-architecture.md`.
- **Chrome**: `collegeSupport.seeLearningSupport` in the nine non-`en` catalogs of
  `TRANSLATED` (`src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json`).

11. **Measure scope from a fresh extract.** For each topic, run
    `node scripts/i18n_extract.mjs --topic <topic> --lang __verify --out <scratch>` and diff
    its stamps against `src/data/overlays/work/<topic>.es.json`. **Expected:**
    - `college-support`: 2 retired + 2 new (the support row and checklist[3]).
    - `learning-support`: about 6 retired + 9 new. Retired: `stats[0].note`, the
      counseling `detail`, `ask.headline`, `ask.questions[1]`, `ask.asOf`. New: those same
      five, plus `eligibility.note`, `staff.note.strong`, `staff.note.muted` and
      `ask.questions[6]`. The `WELLNESS`/`COUNSELING` source labels already exist as
      strings and only gain `at` paths.

    If the counts differ, find out why before translating.

12. **Splice by stamp** into all nine work files per topic. Map old→new by path and meaning,
    **never by array index** (memory: `splice-work-files-by-stamp`). Reuse each locale's
    existing wording for "Educational Support Services", "Academic Coaching", "wellness
    team", "Transitional Kindergarten" (check the admissions overlay's `tkk5` strings) and
    "Director of Counseling". Rules from the rollout docs:
    - Figures char-for-char: `$4,455`, `$2,227`, `K5`, `K–12`, `504/IEP`.
    - `hi`/`te`: store the English 3-3-3 figure.
    - `fa`/`ar`: store no bidi isolates. Watch figure ranges, which reverse in RTL (see
      `src/data/overlays/NOTES.md`; the `learningsupport` plan reworded "1–2" as
      "1 to 2").
    - Dates translate (`October 23, 2026`).
    - Quotes: the S5 fragment is a translated quotation inside quote marks. Translate it as
      each locale already rendered the same fragment in the counseling row and the `social`
      verdict.
    - Names stay Latin: Tracey Bennett, Dr. Similton.
    - College Board / ACT stay Latin.

13. **Rebuild overlays:** `npm run i18n:build -- --topic <topic> --lang <code>` for both
    topics × nine locales.

14. **Chrome key**: add `collegeSupport.seeLearningSupport` to the nine catalogs, after a
    JSON round-trip check (memory: `round-trip-overlay-json-first`). Arabic needs no plural.

15. **Phase 2 verification** (below). Then commit with explicit paths, push and verify,
    open the PR (`--body-file`), and merge with `gh pr merge --squash --delete-branch`.
    Run `git checkout main && git pull`. Flip the plan to `implemented` and the INDEX row
    to *Implemented* with the PR link. **Do not deploy.** End with "merged — ready to
    deploy whenever you want it".

## Closing summary (for the Phase 1 stop message and the PR body)

The user asked for a short summary per item, giving what changed, the source passage that
settled it, and what is left NOT STATED / TO VERIFY. Write it from the Decisions above:

- **1**: support row + link + checklist narrowed. Source: S2 and S3. Only the two
  College Support strings were stale; Admissions is accurate.
- **3**: $2,227/$1,113 is Academic Coaching (S3 layout, quoted in the research file Q1).
  Question #2 reworded, not removed: the HS Instructional Support Class's own second figure
  is still ambiguous. All other fees match. No TO VERIFY was needed.
- **4**: two sentences. Sources: S2 (ESS's own specialization) and S5 (wellness). "Not
  clinical" is worded as "the school does not describe it as…", because no source says.
- **5**: Bennett is on S7, not S2's staff list. A note was added, she was not added to the
  list, and the stat stays 9.
- **6**: silent. S14 confirms TK exists; S3 starts every line at K5. The tile stays K–12,
  the note says TK access is not stated, and question 7 was added.
- **Translations**: Phase 2 regenerates both topics' overlays in nine locales plus one
  chrome key.

## Files touched

| File | Change |
|---|---|
| `source-material/learning-support/hickory-grove-christian/…Official Site Research.md` | appended during planning; committed in Phase 1 |
| `.claude/docs/learning-support/…`, `src/content/learning-support/hickory-grove-christian.json`, maybe `src/data/schools.json` | regenerated by ingest |
| `src/data/collegeSupportPrograms/hickory-grove-christian.ts` | support row text, checklist[3] |
| `src/data/learningSupport/hickory-grove-christian.ts` | stats[0].note, eligibility.note + sources, counseling detail, staff.note + sources, ask.headline/questions[1]/questions[6]/asOf, header comment |
| `src/components/CollegeSupport.tsx` | `WholeClassBody` `hasLearningSupport` prop + link |
| `src/pages/SchoolDetail.tsx` | `CollegeSupportCardBody` prop threading + call site |
| `src/index.css` | `.cs-ls-link-row`, `.cs-ls-link` |
| `src/locales/*.json` (10) | `collegeSupport.seeLearningSupport` (en in Phase 1, nine in Phase 2) |
| `src/data/overlays/work/{learning-support,college-support}.<9>.json`, `src/data/overlays/{…}.<9>.json` | Phase 2 splice + rebuild |
| `.claude/plans/hgcsconsistency.md`, `.claude/plans/INDEX.md` | status, PR, Implementation notes |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean.
- [ ] `npm run build`: **exits 1 on `check:live` only**, with findings limited to the
      learning-support and college-support paths edited above. This is the expected Phase 1
      state, as in `covenantadmissions` and `ccaid`. Every other chained check passes.
      `check:chrome` reports `collegeSupport.seeLearningSupport` as awaiting translation
      (exit 0).
- [ ] `npm run check:schema`: passes.
- [ ] Grep: `grep -n "publishes no learning-differences\|What does Educational Support Services" src/data/collegeSupportPrograms/hickory-grove-christian.ts` → 0 hits.
- [ ] **Browser check (required).** `npm run build` (bypass the expected `check:live` exit
      by running `npx vite build && npm run prerender` if needed) then `npx vite preview`.
      Use Playwright with real Chrome (`channel: 'chrome'`), `domcontentloaded` (**not**
      `networkidle`), and **every `<details>` forced open**. On `/school/hickory-grove-christian/`:
      - College Support → Whole Class Analytics: the new ESS row renders with **bold**, not
        literal `**`. The "See Learning Support & Student Services →" link is present.
        Clicking it scrolls to `#topic-learning-support` and the URL stays on the school
        page, not bounced home.
      - Verdict checklist item 4 shows the new College Board / ACT question.
      - Learning Support: the K–12 tile note mentions Transitional Kindergarten. "Can They
        Serve My Child?" shows the new muted note. The Counseling row (filter "All", and
        the "social" need) shows the added sentence. The staff card shows the Bennett note
        under nine people. Ask the School shows **7** questions, #2 reworded, and "Research
        current as of October 23, 2026".
      - "Show sources" on Eligibility lists Wellness; on Staff, it lists College and Career
        Planning.
      - A school **without** Learning Support (e.g. `/school/cannon/`) shows **no** link in
        its Whole Class card.
      - `npm run audit:mobile -- --only hickory-grove-christian`: 0 overflow, 0 broken cards.

### Phase 2 — Locales

- [ ] `npm run build` exits **0**: `check:live` green, `check:runtime` resolves all nine,
      and `check:chrome` reports nothing awaiting.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted tokens.
- [ ] `check_figures.py --topic learning-support` and `--topic college-support` ×9: clean.
- [ ] `npm run check:money`, `check:currency`, `check:bidi`, `check:fa`, `check:hi`,
      `check:fr`, `check:script`, `check:dates`: clean.
- [ ] `node scripts/check_work_integrity.mjs --base <Phase 1 commit>`: clean. Against
      `main` it flags the retired entries by design.
- [ ] 0 duplicate `at` paths in each rebuilt overlay.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, diffed against a baseline taken on `main`:
      no new hits.
- [ ] **Browser**: `es`, `hi` and `fa` at 1280 (`?lang=<code>`), with every card open. The
      new strings render translated, `$2,227` / `$4,455` are localized correctly, the
      College Support link label is translated and still scrolls, and fa has no reversed
      ranges. Then `audit:mobile -- --only hickory-grove-christian --lang <code>` at 320px
      for every locale; the longest link label must wrap without overflow.

## Risks

| Risk | Mitigation |
|---|---|
| Inserting the TK question mid-list stales later questions' overlays | Appended at index 6 (Decisions) |
| The scope note overstates ("not clinical") beyond the sources | Worded as "the school does not describe it as…"; S5 quote verbatim |
| The link label overflows at 320px in long locales | No `nowrap`; `audit:mobile` at 320 in Phase 2 |
| Phase 2 under-counts the retired stamps | Step 11 measures from a fresh `__verify` extract, not from `check:live` |

## Open questions

- **Should the TK question sit next to the fee question rather than last?** **Default:**
  last, to avoid shifting overlay paths. The user can ask to reorder at the Phase 1 review.
