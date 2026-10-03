---
name: covenantadmissions
title: Refresh Covenant Day's Admissions guide to the live site — the reworded faith requirement, Grade 1's Little Lions visit, the Come See Covenant times and the moved JK/K page
status: english-done
phases: 2
created: 2026-10-02
branch: fix/covenantadmissions
prs: []
---

# Refresh Covenant Day's Admissions guide to the live site

> **Name note.** In this repo **"CDS" means Charlotte Country Day** (see
> `updatesToCDSAdmissions`, PR #261). This plan is about **Covenant Day School**
> (`covenant-day`), which also calls itself "CDS" on its own site. Do not confuse the two.

## Goal

The `/admissions-episode covenant-day` freshness check (2026-10-02) found that Covenant Day's
own site has changed in three ways the app still gets wrong or leaves out, plus one moved
page:

1. **The faith requirement is reworded.** The app quotes it as *"An essential component for
   admission is the requirement that one or both parents be professing Christians"* and says
   the interview confirms agreement with the school's statement of faith. The live page now
   says the school partners with families where **at least one parent is a Christ-follower
   and is actively involved in a local Christian church**, and parents **discuss their
   Christian testimony** at the interview. The statement-of-faith clause is gone.
2. **Grade 1 moved to the Little Lions Assessment.** The app says Grades 1–5 all work
   one-on-one with an academic resource therapist. Live: **JK/K/Grade 1** take the Little
   Lions small-group assessment; **Grades 2–5** go one-on-one.
3. **Come See Covenant times are now published**: both events are Thursday,
   **9:30–11:30 a.m.** The app says no time is published.
4. **The JK/K page moved**: `/admissions/jk-and-kindergarten-clone` returns 404 and is now
   at `/admissions/jk-and-kindergarten`.

**Done when** a parent reading Covenant Day's Admissions area (school page and printable
checklist) in any of the ten locales sees the live wording for all three, the JK/K
source link resolves, and `npm run build` exits 0.

## Context

**Why now.** The admissions podcast PDF for Covenant Day was already built from the live
values, using 18 `--overrides`. Until this plan lands, an episode listener who clicks through
to the app will find the app disagreeing with the episode. The override file was in the
planning session's scratchpad. It is **not** needed here: every replacement string is
written out in full in the steps below.

**Everything else was re-verified unchanged the same day**: all twelve Key Dates, the
deadline footnote, age guidance, instruments, recommendation forms, fees, deposit, aid and
contacts. See the source-material file.

Line numbers below are from `main` at `07c8ccfd`.

- `src/data/admissionsPrograms/covenant-day.ts`: 697 lines, one `AdmissionsProgram`.
  Bands: `jkk` (index 0), `g15` (1), `g611` (2). The fields to change:

  | Field | Line | Overlay stamp |
  |---|---|---|
  | `bands[0].steps[0].detail` (jkk visit) | 176 | `ad369715` |
  | `bands[1].steps[0].detail` (g15 visit) | 289 | `7020505f` |
  | `bands[2].steps[0].detail` (g611 visit) | 402 | `ef084d3e` |
  | `bands[0].checklistRows[0].detail` **and** `bands[1].checklistRows[0].detail` (identical text, one entry) | 222, 335 | `acc4e5e1` |
  | `bands[2].checklistRows[0].detail` | 448 | `f65be583` |
  | `bands[0].steps[4].detail` (jkk interview) | 204 | `c72094a7` |
  | `bands[1].steps[4].detail` (g15 interview) | 317 | `c0d42803` |
  | `bands[2].steps[4].detail` (g611 interview) | 430 | `4494e222` |
  | `bands[0..2].checklistRows[6].detail` (identical in all three, one entry) | 252, 365, 478 | `ebdcbf44` |
  | `bands[0].checklistRows[7].detail` | 257 | `b63a8f11` |
  | `bands[1].checklistRows[7].action` | 369 | `92a414d4` |
  | `bands[1].checklistRows[7].detail` | 370 | `121e6525` |
  | `comparison.rows[2].cells.g15` (On-campus visit) | 535 | `80ea8486` |
  | `comparison.rows[9].cells.all` (Constant in every band) | 590 | `aa5ce323` |
  | `sources[3].url` + `sources[9].label` | 661, 688 | *not extracted* |

  That is **14 distinct stamps per locale**. Measured against
  `src/data/overlays/work/admissions.es.json`: every entry's `at` list contains **only
  Covenant Day paths**, so no other school's string shares an entry and a change here
  cannot leak into another school. `sources[].label`/`url` are not extracted, so they ship
  in English in every locale already (correctly, since they are citations).

- **The header comment block** (L1–124) makes claims this plan invalidates: L83–88 lists
  "Come See Covenant times" in the NOT-PUBLISHED register, and L106–113 describes the faith
  requirement with the old "essential component" wording as a verbatim quote. Both must be
  updated.

- **`rules[].text` renders RAW** (no markdown). None of the edited fields is a `rules[]`
  entry. `**bold**` **is** supported in `steps[].detail`. It is **not** supported in
  `checklistRows[].detail`/`action` or `comparison.rows[].cells`, so write those plain.

- **The locale layer.** `admissions` → `admissionsPrograms` in `scripts/i18n_topics.mjs:46`.
  `PROSE_TRANSLATED` (`src/lib/i18n.ts:182`) = `es, bn, ht, te, fr, fa, it, hi, ar`. Each has
  `src/data/overlays/work/admissions.<lang>.json` (1,033 entries, shape
  `{text, of, at[], t}`) and a shipped `src/data/overlays/admissions.<lang>.json`
  (`{t, of, at}`, **no English**; a grep for English text there returns 0 and proves
  nothing).

- **`src/content/admissions/covenant-day.json`** is regenerated by the ingest from the
  research files. It is **not translated** (the content overlay covers only
  `financial-aid-tuition`) and **not rendered on the school page** (admissions has a
  structured program, so the generic-prose branch is emptied). Its regeneration is
  harmless, but expect it in the diff.

- **Nearest precedent: `ccaid` (PR #303)**, the same "school's site moved under us, refresh
  one school's admissions data in ten locales" shape. Read its *Implementation notes*.
  Three of its lessons are written into the steps below: (a) measure Phase 2 scope from
  the live modules, not from `check:live`'s finding list; (b) map translations **by English
  text, never by array index**; (c) after a splice, assert 0 duplicate `at` paths.

## Decisions

- **Rewrite the faith sentence, do not soften or editorialise it.** The new wording is a
  close paraphrase of the live sentence, with the two operative conditions in bold (a
  Christ-follower; actively involved in a local Christian church) and the testimony
  discussion. **Drop the statement-of-faith clause entirely**, because the live process page
  and FAQs no longer mention it. Do not add commentary on what changed. A parent needs the
  current rule, not its history.
- **Keep the old wording only in the research record**, never on the card. The 2026-09-01
  research file stays as the historical record; the new source-material file marks which
  quotes it supersedes.
- **Grade 1 stays in the Grades 1–5 band.** Its deadline and decision calendar
  (Jan 15 → Apr 9) are Grades 1–11's. The band boundary is a **calendar** boundary, and the
  file header already explains that instrument and visit changes are carried *inside* the
  band. No band is added, split or relabelled. The `g15` sublabel
  (`WPPSi → WISC V → ISEE by grade`) stays.
- **JK/K Little Lions wording becomes grade-neutral** ("a small group of applicants in the
  same grade"), because the live page says "in their respective grade" and Grade 1 now
  joins the assessment.
- **Cite the event page for the times, not Key Dates.** The Key Dates list still carries
  no time. The 2026-09-01 file correctly rejected an earlier 9:30–11:30 claim *on that
  basis*. The time is now on `/admissions/comeseecovenant`. Both facts are recorded in the
  source-material file.
- **No `sources[]` entry is added or removed.** Repoint `sources[3].url` and refresh the
  `sources[9].label` text (it says "the two open events for 2026–27"; make it name the
  Thursday 9:30–11:30 a.m. times). Leave everything else in `sources[]` alone.
- **Splice by stamp; never re-extract.** The extractor emits `t: ''` for every string and
  has no carry-over. Re-running it over a translated work file blanks it (precedent: PR #248,
  `ccaid`, Latin's PR #262).

## Approvals needed

**None.** This is a data correction inside existing cards, fields and comparison rows. It
adds no card, section, stat tile, Compare row, metric key or topic, and changes no
component, layout or styling. The UX-design gate does not apply.

This is **not** a deploy authorization. Merge and stop; publishing is the user's separate
call.

## Source material

Written during planning, **uncommitted**:

- `source-material/admissions/covenant-day/Covenant Day - Admissions - Live-Site Refresh 2026-10-02.md`:
  provenance (Playwright render, accordions opened), verbatim live quotes for all four
  changes, the superseded quotes beside them, the Key-Dates-vs-event-page note, and a list
  of what was re-verified unchanged.

**`/implement` runs the `ingest-source-material` skill on it first**, on the branch, before
editing any `src/` file.

## Out of scope

- **Deploying.**
- **Regenerating the Covenant Day admissions podcast PDF/prompt.** It was already built from
  the live values. Adding the episode to `src/data/podcastEpisodes.ts` happens after it is
  published and is a separate change.
- **The glossary case-sensitivity gap** found in the same run (the generator matches
  `WPPSI` while Covenant Day spells it `WPPSi`, so the episode PDF omits that glossary
  entry). That is a `scripts/gen_admissions_report.mjs` change, unrelated to app data.
- **Other schools' admissions data**, and every Covenant Day field verified unchanged.
- **Tuition.** Covenant Day still publishes the 2026-2027 chart only; it belongs to the
  Financial Aid & Tuition area.

## Steps

Two phases: this changes user-facing research prose reached by the overlay layer.

### Phase 1 — English

1. **Branch.** `git checkout main && git pull`, then `git checkout -b fix/covenantadmissions`.

2. **Mark the superseded quotes in the 2026-09-01 research file.** In
   `source-material/admissions/covenant-day/Covenant Day - Admissions - Grade-by-Grade Application Plans.md`,
   add a one-line italic note (no deletions) directly under each of these, pointing to
   `Covenant Day - Admissions - Live-Site Refresh 2026-10-02.md`:
   - `### 5. INTERVIEW/SHADOW` (the faith paragraph and the "JK/K" / "Grades 1-5" bullets)
   - `## Faith requirements — a real admissions gate`
   - the italic Come See Covenant "NOT PUBLISHED" note under `## Shared timeline`
   - the `jk-and-kindergarten-clone` line in `## Source list`

   Without these notes the ingest would carry both versions into
   `.claude/docs/admissions/covenant-day.md` with nothing saying which one is current.

3. **Ingest.** Run the `ingest-source-material` skill. Expect
   `.claude/docs/admissions/covenant-day.md`, `src/content/admissions/covenant-day.json` and
   possibly `src/data/schools.json` to change. **Commit the ingest on its own** before step 4,
   staging explicit paths only (never `git add -A`; run `git status --short` first).

4. **Come See Covenant times: three step details** (`src/data/admissionsPrograms/covenant-day.ts`):
   - `bands[0].steps[0].detail` (L176):
     > Applications and tours open **September 8, 2026**. The school also runs two **Come See Covenant** open events, both on a Thursday from **9:30 to 11:30 a.m.** — **October 29, 2026** for JK–5 and **November 12, 2026** for JK–11. Schedule a personal campus visit through the admissions page if the dates do not work.
   - `bands[1].steps[0].detail` (L289):
     > Applications and tours open **September 8, 2026**. Both **Come See Covenant** events cover this band, each on a Thursday from **9:30 to 11:30 a.m.** — **October 29, 2026** for JK–5 and **November 12, 2026** for JK–11. A personal campus visit can be scheduled through the admissions page instead.
   - `bands[2].steps[0].detail` (L402):
     > Applications and tours open **September 8, 2026**. The **Come See Covenant** event covering these grades is **Thursday, November 12, 2026, 9:30 to 11:30 a.m.** (JK–11). A personal campus visit can be scheduled through the admissions page instead.

5. **Come See Covenant times: checklist rows** (plain text, no markdown):
   - `bands[0].checklistRows[0].detail` (L222) **and** `bands[1].checklistRows[0].detail`
     (L335), identical:
     > Applications and tours open Sept 8, 2026. JK–5 event Thu Oct 29; JK–11 event Thu Nov 12 — both 9:30–11:30 a.m.
   - `bands[2].checklistRows[0].detail` (L448):
     > Applications and tours open Sept 8, 2026. The JK–11 event is Thu Nov 12, 9:30–11:30 a.m.

6. **Faith requirement and Grade 1 visit: the three interview step details.** Each opens
   with the same faith passage:

   > The admissions office sends a link to schedule your interview with the Admissions Director. Covenant Day is a **covenant Christian school**: it partners with families in which **at least one parent is a Christ-follower and is actively involved in a local Christian church**, and parents will be asked to **discuss their Christian testimony** during the interview.

   followed by, per band:
   - `bands[0].steps[4].detail` (L204):
     > Your child's visit is the **Little Lions Assessment**, taken with a small group of applicants in the same grade — there is no student interview at this age.
   - `bands[1].steps[4].detail` (L317):
     > **Your child's visit depends on the grade.** **Grade 1** applicants join the **Little Lions Assessment** with a small group of other Grade 1 applicants; **Grades 2–5** work **one-on-one with an academic resource therapist** to measure reading, math and writing proficiency. Neither is a shadow day, and there is no student interview until Grade 6.
   - `bands[2].steps[4].detail` (L430), the existing shadow-day text with only the faith
     passage replaced:
     > **This is the first band where the student is interviewed too.** Grades 7–11 applicants spend a morning shadowing a student in the middle or high school, have lunch with their peers, and meet an admissions staff member. **Grade 6 applicants do all of that and also take a math and English assessment** during the visit — the one extra step at the bottom of this band.

   The `g611` "first band where the student is interviewed" claim stays: the FAQ criteria
   list still reads "The interview with the parents and student (grades 6-11)".

7. **Faith requirement: the parent-interview checklist row**, all three bands (L252, L365,
   L478), identical:
   > At least one parent must be a Christ-follower actively involved in a local Christian church; you will be asked to discuss your Christian testimony.

8. **Grade 1 visit: checklist rows and comparison cell:**
   - `bands[0].checklistRows[7].detail` (L257):
     > A small-group visit with other applicants in the same grade. No student interview at this age.
   - `bands[1].checklistRows[7].action` (L369): `Bring your child for the on-campus assessment`
   - `bands[1].checklistRows[7].detail` (L370):
     > Grade 1: the Little Lions Assessment, in a small group. Grades 2–5: one-on-one with an academic resource therapist (reading, math, writing).
   - `comparison.rows[2].cells.g15` (L535):
     > Grade 1 Little Lions Assessment, in a small group · Grades 2–5 one-on-one with an academic resource therapist

9. **Faith requirement: the "Constant in every band" comparison cell**
   (`comparison.rows[9].cells.all`, L590):
   > A $100 non-refundable application fee · the FACTS/RenWeb online application · a parent interview with the Admissions Director, where at least one parent must be a Christ-follower actively involved in a local Christian church · a pastor's recommendation · a $1,000 non-refundable enrollment deposit at contract · rolling admissions after the priority dates, with no on-campus testing, shadow visit or parent interview for a non-priority applicant unless space remains after April 9

   Keep the file's existing curly apostrophe in `pastor’s`; copy the current value and
   change only the interview clause.

10. **Sources** (not translated):
    - `sources[3].url` (L661) → `https://www.covenantday.org/admissions/jk-and-kindergarten`
    - `sources[9].label` (L688) → `covenantday.org — Come See Covenant: the two open events, Thursday Oct 29 (JK–5) and Thursday Nov 12 (JK–11), both 9:30–11:30 a.m.`

11. **Header comment block** (L1–124):
    - L83–88: remove "Come See Covenant times" from the NOT-PUBLISHED register, and add a
      line that the times are published on `/admissions/comeseecovenant` (not on Key Dates).
    - L106–113: rewrite the "PROFESSING-CHRISTIAN REQUIREMENT" paragraph to quote the live
      2026-10-02 wording, note that the statement-of-faith clause was dropped by the school,
      and keep the contrast with Charlotte Christian (still true).
    - Add a short note near the THREE BANDS block (L35–46) that Grade 1's **on-campus visit**
      is now the Little Lions Assessment (a third non-coinciding boundary), and that this is
      carried inside the band like the instrument changes.
    - Leave the NOTE FOR EDITORS, the CAIS-brochure rule and the Grade 12 decision untouched.

12. **Grep for leftovers** in `covenant-day.ts`, outside the header comments:
    `professing Christians`, `statement of faith`, `confession of faith`,
    `time is published`, `carries a published time`, `no time is published`,
    `other JK/K applicants`, `jk-and-kindergarten-clone` → **0 hits each**.

13. **Phase 1 verification**: run the checks below, then commit (explicit paths), push,
    verify the push (`git rev-parse HEAD` vs `git ls-remote origin fix/covenantadmissions`)
    and open the PR with `--body-file`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Set this plan
to `english-done` and the INDEX row to *English shipped*. Nothing below runs until the user
confirms the English wording, especially the faith passage.

### Phase 2 — The nine prose locales

Scope is the **overlay layer** (`PROSE_TRANSLATED`: `es, bn, ht, te, fr, fa, it, hi, ar`),
**not** `src/locales/*.json`, because no chrome key changes. Mechanism:
`.claude/docs/prose-translation-architecture.md`.

14. **Measure scope from the live module, not from a checker.** Extract into a scratch dir
    with a throwaway lang, so no real work file is touched:
    `node scripts/i18n_extract.mjs --topic admissions --lang __verify --out <tmp>`. Then diff its stamps against
    `src/data/overlays/work/admissions.es.json`. **Expect exactly 14 retired stamps** (the
    table in Context) and their replacements. Two of the new strings are each shared by
    several paths: the jkk/g15 `checklistRows[0]` pair and the three `checklistRows[6]`.
    So the count of *new* stamps should also be 14. If it is not 14, stop and find out why
    before translating. (`ccaid` under-counted twice by trusting `check:live`'s list.)

15. **Splice by stamp in all nine work files.** For each retired stamp, replace that entry's
    `text` with the new English, `of` with the new stamp, `at` from the fresh extract, and
    `t` with a fresh translation. **Map old→new by English meaning/path, never by array
    index.** No array rows are added or removed in Phase 1, so `at` paths are stable. Still
    assert 0 duplicate `at` paths afterwards (see Verification).

16. **Translate the 14 strings per locale (126 total).** Traps that apply, from the rollout
    docs:
    - **Figures copied char-for-char, never re-typed:** `$100`, `$1,000`, `9:30–11:30 a.m.`
      / `9:30 to 11:30 a.m.`, `Sept 8, 2026`, `Oct 29`, `Nov 12`, `April 9`, grade numbers.
      `check:sepdrift` enforces separator-bearing tokens only (`$1,000`). Check the clock
      times by eye.
    - **`hi`/`te`**: store the English 3-3-3 figure; the render layer regroups.
    - **`fa`/`ar`**: RTL. Store **no** bidi isolates; they are applied at render.
    - **Keep proper names in their published form**: `Little Lions Assessment`,
      `Come See Covenant`, `FACTS/RenWeb`, `Admissions Director` stays as each locale already
      renders it elsewhere in this school's entries. Reuse the locale's existing rendering of
      `academic resource therapist` from the retired `c0d42803` entry.
    - **Register for the faith passage.** This is a religious admissions condition a parent
      may screen the school on. Translate it plainly and faithfully: "Christ-follower",
      "actively involved in a local Christian church", "Christian testimony". Do not make it
      stronger or weaker than the English. Reuse each locale's existing wording for these
      concepts from the retired `c72094a7`/`ebdcbf44` entries where it still fits.

17. **Rebuild the nine overlays**: `npm run i18n:build -- --topic admissions --lang <code>`
    for each locale (`scripts/i18n_build_overlay.mjs`, the **plain** builder, not the
    content-overlay one).

18. **Phase 2 verification**: run the checks below, commit (explicit paths), push, verify
    the push, update the PR, merge (`gh pr merge --squash --delete-branch`, pre-authorized),
    `git checkout main && git pull`. Flip the plan to `implemented` and the INDEX row to
    *Implemented* with the PR link. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/admissions/covenant-day/Covenant Day - Admissions - Live-Site Refresh 2026-10-02.md` | new: written during planning, ingested in step 3 |
| `source-material/admissions/covenant-day/Covenant Day - Admissions - Grade-by-Grade Application Plans.md` | edit: four "superseded by" notes (step 2) |
| `.claude/docs/admissions/covenant-day.md`, `src/content/admissions/covenant-day.json`, maybe `src/data/schools.json` | regenerated by the ingest |
| `src/data/admissionsPrograms/covenant-day.ts` | edit: 17 rendered fields (14 stamps), 2 `sources[]` fields, header comments |
| `src/data/overlays/work/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit: 14 entries spliced per file |
| `src/data/overlays/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | regenerated by `i18n:build` |
| `.claude/plans/covenantadmissions.md`, `.claude/plans/INDEX.md` | status + PR link + Implementation notes |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean. (Trust `tsc -b`/the build over `tsc --noEmit`, which has
      passed on errors the build caught.)
- [ ] `npm run build` exits **1 on `check:live` only**. That is the **expected Phase 1
      state**: 14 stamps per locale no longer resolve and fall back to English until
      Phase 2. Confirm every other chained check passes, and that the `check:live`
      findings are all `covenant-day` admissions paths. (`ccaid` Phase 1 was in exactly this
      state.)
- [ ] `npm run check:schema`: passes (no card/key change, so `DATA-SCHEMA.md` should not
      move).
- [ ] Step 12's greps: 0 hits.
- [ ] `npm run report:admissions -- --school covenant-day` with **no** `--overrides` now
      produces a PDF containing `9:30`, `Christ-follower` and `Grade 1 applicants join`, and
      none of `professing Christians` / `statement of faith` / `kindergarten-clone`. This
      proves the app data now matches what the episode was built from. The PDF is
      gitignored under `reports/`; don't commit it.
- [ ] **Browser check (required).** `npm run build && npm run preview`, Playwright with real
      Chrome (`channel: 'chrome'`, `headless: false`, script in the repo root as a dotfile,
      deleted after). Use `domcontentloaded`, **not** `networkidle` (it hangs on school
      pages). **Force-open every `<details>`** before asserting.
      - `/school/covenant-day/`, Admissions area, each band tab: the interview step shows the
        new faith passage; g15 shows the Grade 1 / Grades 2–5 split; the visit step shows
        9:30–11:30 a.m.; the comparison table's On-campus visit and Constant rows are
        updated; no literal `**` anywhere.
      - `/school/covenant-day/admissions-checklist/?band=jkk`, `?band=g15`, `?band=g611`:
        rows 0, 6 and 7 updated; no literal `**` (these fields are plain text).
      - "Show sources": the JK/K link points at `/admissions/jk-and-kindergarten`.

### Phase 2 — Locales

- [ ] `npm run build` exits **0** (`check:live` green again, `check:runtime` resolves all
      nine).
- [ ] `npm run check:sepdrift -- --lang <code>` for all nine: 0 drifted tokens.
- [ ] `npm run check:money`, `check:currency`, `check:bidi`, `check:fa`, `check:hi`,
      `check:fr`, `check:script`: clean.
- [ ] `node scripts/check_work_integrity.mjs --base <the Phase 1 commit>`: clean.
      **Against `main` it will flag the 14 retired entries**, because their `text`/`of`
      intentionally changed. Compare against the Phase 1 commit so only the `t` fill-ins are
      under test and assertion 4 (no foreign script) still runs on every locale.
- [ ] **0 duplicate `at` paths** across each rebuilt `src/data/overlays/admissions.<lang>.json`:
      ```js
      const c = {}; for (const e of o.strings) for (const a of e.at) c[a] = (c[a] || 0) + 1
      // assert Object.values(c).every(n => n === 1)
      ```
- [ ] `npm run i18n:leaks -- --lang <code>` for all nine, **diffed against a baseline taken on
      `main`**: no new flagged strings.
- [ ] **Browser check, all nine locales**, on `/school/covenant-day/` and the g15 checklist
      (`?lang=<code>`; the stored key is `csc.lang`): the 14 strings render translated, not
      English, and `$100` / `$1,000` / the 9:30–11:30 time are intact. Match money by
      **digits**, not the `$` symbol: `localizeMoneyText()` renders `100 US$` (es),
      `100 $US` (fr) and so on. At minimum, eyeball `es`, `hi` (lakh/crore) and `fa` (RTL).

## Risks

| Risk | Mitigation |
|---|---|
| The faith passage is mistranslated as stronger or weaker than the school's rule | Step 16's register rule; reuse each locale's reviewed vocabulary from the retired entries; the user reviews English first |
| Re-running the extractor blanks the work files | Step 15 forbids it; scratch extract with `__verify` only |
| Phase 2 scope under-counted (the `ccaid` failure) | Step 14 measures from a fresh extract and asserts exactly 14 before translating |
| Both quote versions land in `.claude/docs` with no marker | Step 2 annotates the superseded quotes before the ingest |
| A later pass re-reads Key Dates, finds no time, and reverts the 9:30–11:30 times as "not published" | The source-material file and the header comment (step 11) both say the time's source is the event page, not Key Dates |
| `check_work_integrity` run against `main` reads as failure | Verification says to run it against the Phase 1 commit |

## Open questions

- **Should the faith passage keep any bold?** **Default:** yes, as written in step 6:
  bold on "covenant Christian school", the two conditions, and "discuss their Christian
  testimony", matching how the card already emphasises admissions gates. The user's
  Phase 1 review can strip it.
- **Should `sources[9].label` stay generic rather than naming the times?** **Default:**
  name the times (step 10), since the source-list label is where a reader checks where
  a figure came from.
