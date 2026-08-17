---
name: hickory-grove-course-descriptions
title: Replace Hickory Grove's AP-only course stub with the full 2026-2027 catalog (117 courses, 11 departments)
status: in-progress
phases: 2
created: 2026-08-17
branch: feat/hickory-grove-course-descriptions
prs: []
---

# Hickory Grove course descriptions — the real catalog

## Goal

Hickory Grove Christian's Course Offerings card is by far the thinnest of the nine
schools: **one division, 17 AP courses, and placeholder descriptions** ("Named AP science
course."). That is not because the school publishes little — it is because the original
research pass looked at the wrong URL, concluded the catalog was JavaScript-blocked, and
shipped the AP list as a documented gap.

**The catalog is fully published and machine-readable.** This plan replaces the stub with
the school's real **2026-2027 Course Selection Catalog**: 117 unique courses across 11
departments, each with the school's own grade levels, prerequisites and course
descriptions. It also corrects three Compare rows that carry figures derived from the
superseded 2025-2026 profile — including one that ships `null` with a "not publicly
available" note this research disproves.

We know it worked when Hickory Grove's Upper School card has 11 department tabs with real
per-course prose, the `us-courses` Compare row shows a real number instead of "Not
published", and its overlay field-site count rises from 67 (today's stub) toward the
~400–650 the other eight schools carry.

## Context

### What ships today

[`src/data/courseOfferings.ts:6783-6871`](src/data/courseOfferings.ts#L6783-L6871) —
`HICKORY_GROVE_CHRISTIAN`, `guideYear: '2025-2026'`. One division ("Upper School
Courses"), 8 departments, **17 courses, all AP**, and a long `notPublished` note stating
the course list "renders only through a JavaScript 'Course Selection Guide'". Descriptions
are placeholders: *"Named AP science course."*, *"The higher AP calculus course."*

The comment block above it (lines 6783–6796) explains the SPA limitation and why only one
division ships. **All of it is now wrong and must be rewritten**, not merely appended to.

The type layer needs no change — `Course` / `Department` / `Division` / `CourseOfferings`
([`src/data/courseOfferings.ts:36-86`](src/data/courseOfferings.ts#L36-L86)) already model
everything this data needs. `Course.tag` renders AP/Post-AP in tag-accent and anything
else (Honors, CP, grade bands) in tag-outline.

### Why the original pass was wrong

The prior research file recorded the course page as `/academics/guidance/courses` — a
Finalsite SPA that genuinely returns an empty body. **The real page is
`/academics/high-school/college-and-career-planning/courses`**, which embeds a **Heyzine
page-flip viewer** (`https://heyzine.com/flip-book/ab637c042c.html`). Heyzine serves the
book from a plain PDF on its CDN, and that PDF's text layer extracts cleanly.

No page-turning, JS rendering, or browser automation was needed — despite the viewer's
left/right arrows implying otherwise. `curl` the flipbook HTML, grep for the `.pdf` on
`cdnm.heyzine.com`, download, `pdftotext -layout`. **This is a reusable channel: when a
school's catalog is behind a flipbook viewer (Heyzine, Calaméo, Issuu), look for the
backing PDF before recording a not-published gap.**

### The data, already extracted and committed

92 pages, 177 `Course Title:` records, **117 unique titles**. Every record has Course Title
/ Grade Level(s) / Prerequisite / Course Description, and **zero records extracted thin**
(all 177 descriptions ≥40 chars). Department structure comes from divider pages, so each
course maps unambiguously:

| Department | Catalog pages | Courses |
|---|---|---|
| Advanced Placement | 15–20 | 17 |
| Bible | 21–27 | 11 |
| English | 28–34 | 10 |
| Foreign Language | 35–39 | 7 |
| Math | 40–45 | 11 |
| Performing Arts | 46–49 | 8 |
| Physical Education | 50–52 | 6 |
| Science | 53–59 | 16 |
| Social Studies | 60–66 | 11 |
| Student Media | 67–69 | 7 |
| Technology | 70–71 | 3 |
| Visual Arts | 72–75 | 10 |
| Comprehensive List of Electives | 76–92 | 60 (re-listing, see below) |

The **AP section's 17 courses corroborate independently** against both the HS Profile
figure already in the app and PrivateSchoolReview's "17 Advanced Placement courses" — good
evidence the extraction is faithful.

The **Comprehensive List of Electives is a cross-cutting index**, not a 12th department:
its 60 entries re-list courses that also appear under their home department. Counting it
as a tab would show AP Biology twice.

### The nearest analogous card

[`COVENANT_DAY`](src/data/courseOfferings.ts#L5149) is the pattern to follow — AP courses
filed into their **home department** and tagged `'AP'` (e.g. `AP English Language &
Composition` sits inside the English department), with CP and Honors levels listed as
separate entries carrying `tag: 'CP'` / `tag: 'Honors'`. Hickory Grove's catalog is
level-qualified the same way (`Algebra II - College Preparatory`, `Algebra II - Honors`),
so it maps onto this convention directly.

### The overlay layer (matters for Phase 2)

`src/data/overlays/course-offerings.<lang>.json` — 9 locales, `strings[]` entries of shape
`{t, of, at[]}` where `of` is an **FNV-1a stamp of the live English** and `at[]` lists the
field paths it serves. **Rewriting this school's English prose invalidates every Hickory
Grove stamp in all 9 files**; those entries then silently fall back to English with no
error and no coverage change (see the `check:runtime` note in CLAUDE.md).

Hickory Grove currently holds **67 field-sites** per locale — vs Providence Day 671,
Country Day 537, Covenant Day 522, Davidson Day 330. After this change it should land in
that range, so Phase 2 is a substantial re-extract, not a touch-up.

Some entries are **shared across schools** (e.g. one `Asignaturas de Lower School` entry
serves eight schools' `divisions[0].title`). Do not delete a shared entry when re-doing
Hickory Grove's — only its `at[]` membership changes.

### Metric rows that key off this data

[`src/data/metricValues.ts`](src/data/metricValues.ts) — three rows in the
`course-offerings` topic carry figures derived from the now-superseded 2025-2026 profile:

- **`us-courses`** (line 124) — `null`, commented *"full course list is SPA-blocked…
  only the AP catalog is publicly enumerable"*, plus a `quals` scope note (line 148)
  saying the same. **Both are now false.**
- **`advanced-courses`** (line 172) — `'17 AP'`. The headline figure is right, but its
  comment and `quals` note (line 196) hedge on "2025-26 profile names 14, 2023-24 named
  17". The 2026-2027 catalog names 17 outright, so the hedge goes.
- **`us-departments`** (line 215) — `'8'`, derived from graduation-requirement subject
  areas because no department list was available. **The catalog publishes 11.**

## Decisions

- **11 department tabs, AP folded into home departments** — matches Covenant Day and
  Providence Day; a standalone AP tab would list AP Biology under both AP and Science.
  (User decision, 2026-08-17.)
- **The Comprehensive List of Electives becomes no tab** — it is a duplicate view of
  courses already filed under their departments.
- **The 2026-2027 catalog fully supersedes the 2025-2026 data — old figures are removed,
  not kept alongside.** `guideYear` becomes `'2026-2027'`, the HS-Profile-derived hedges
  come out of the metric comments and quals, and the stale SPA claims are deleted rather
  than softened. (User decision, 2026-08-17: *"only use the 2026-2027 data now that we
  have it, remove the last year data"*.)
  **Scoped to course offerings only** (user confirmation, 2026-08-17) — the HS Profile
  PDFs stay authoritative for every other topic. See *Out of scope*.
- **Populate the `us-courses` Compare row** — re-uses an existing row, so no UX approval
  needed. (User decision, 2026-08-17.)
- **Still one division (Upper School)** — the catalog is a high-school catalog. HGCS
  publishes no named Lower/Middle course lists, so no empty division card ships (standing
  rule: a division with zero items is omitted entirely).
- **Drop `notPublished` from the division entirely** — that field exists to explain a
  reduced grain honestly. With 117 named courses there is nothing to explain, and leaving
  a "not publicly available" note beside a full catalog would be actively wrong.
- **Count `us-courses` as 117** — unique titles, consistent with how the other schools
  count level-qualified entries (Covenant Day counts `Algebra 1` and `Algebra 1 Honors`
  separately, and so does this catalog). Record the 177-vs-117 distinction in the qual
  note so the number is auditable.
- **Certificate tracks are recorded but not built** — see *Out of scope*.

## Approvals needed

**None.** Every change re-uses an existing card, division, department-tab pattern and
Compare row. No new card, section, stat tile, Compare row, metric key or topic — so the
UX-design gate is not engaged.

Two things worth flagging to the user at review time rather than treating as blockers:

- The `us-departments` figure moves **8 → 11**. That is a data correction, not a new row.
- The three certificate tracks (below) would need a new card, and therefore approval, if
  the user later wants them shown.

## Source material

Already written during planning, **uncommitted**:

- `source-material/course-offerings/hickory-grove-christian/Hickory Grove Christian - Course Offerings - 2026-2027 Course Selection Catalog.md`
  — 1,197 lines. Provenance header, the three source URLs, the department/page table, the
  three certificate tracks, the AP eligibility policy, and **all 177 course records
  verbatim** (title, grade levels, prerequisite, full description).

Sources:

| Ref | URL |
|---|---|
| S1 | `https://www.hgchristian.org/academics/high-school/college-and-career-planning/courses` |
| S2 | `https://heyzine.com/flip-book/ab637c042c.html` |
| S3 | `https://cdnm.heyzine.com/files/uploaded/v3/ab637c042cee7badd9cfb618c436c69383236370-6.pdf` |

The **older** file in the same folder — `Hickory Grove Christian - Course Offerings -
Curriculum Guide.md` — remains valid for CEEB code, grading scale, dual enrollment and
graduation requirements (all from the HS Profile PDFs). Only its *course-enumeration gap*
claim is superseded, and the new file says so explicitly. **Keep both**; do not delete the
older file.

`/implement` runs the `ingest-source-material` skill on the new file as step 1.

## Out of scope

- **The three certificate tracks** — AP Capstone Diploma™, Global Missions & Language
  Certificate, Medical Sciences Certificate. Fully transcribed in the source-material file
  (requirements and all), but showing them needs a new card, which needs UX approval. Not
  built here; raise it with the user separately.
- **The AP eligibility policy** (exam required for all AP students; 80+ in the
  prerequisite for AP Biology/Calculus/Chemistry). Same reason — transcribed, not shown.
- **Lower and Middle School divisions.** HGCS publishes no named course lists for them.
- **Other schools' course data.** This plan touches Hickory Grove only.
- **Hickory Grove data in every other research area.** "Remove the 2025-2026 data" means
  **course offerings only** (user confirmation, 2026-08-17). The Fall-2025 / Fall-2023 HS
  Profile PDFs remain the live source for CEEB code, grading scale, dual enrollment,
  graduation requirements and AP-exam results, and the older
  `Hickory Grove Christian - Course Offerings - Curriculum Guide.md` stays committed for
  exactly that reason. The school's other **27** metric rows — across `college-support`,
  `financial-aid-tuition`, `the-arts`, `student-clubs`, `after-school`,
  `summer-programs` and `sports` — are **not touched**. Only the three
  `course-offerings` rows named in the steps change.
  - One deliberate near-miss: `the-arts :: advanced-arts-coursework` reads
    `'AP Studio Art 2D'` while the new catalog titles the course **"Advanced Placement 2D
    Studio Art"**. That row is in a different topic and stays as-is; the full title is used
    **inside the course card only**. Flag it to the user rather than silently editing it.
- **Deploying.** `npm run deploy` is the user's call, always.

## Steps

### Phase 1 — English

1. **Branch** — `git checkout main && git pull`, then
   `git checkout -b feat/hickory-grove-course-descriptions`.

2. **Ingest the source material** — run the `ingest-source-material` skill so the new
   catalog file flows through the pipeline (distilled notes + `src/data/schools.json`).
   Commit the source-material file with it.

3. **Rewrite the `HICKORY_GROVE_CHRISTIAN` comment block**
   ([`src/data/courseOfferings.ts:6783-6796`](src/data/courseOfferings.ts#L6783-L6796)) —
   delete the SPA-limitation narrative entirely. Replace with: 2026-2027 catalog, sourced
   from the Heyzine-backed PDF, 117 unique courses across 11 departments, AP filed into
   home departments, electives index deliberately not a tab, still one division because
   HGCS publishes no named Lower/Middle lists. **Note that this supersedes the earlier
   SPA-blocked conclusion**, so nobody re-derives the old gap.

4. **Set `guideYear: '2026-2027'`** (line 6798).

5. **Rebuild the division** (lines 6800–6870) —
   - `title: 'Upper School Courses'`, `grades: 'Grades 9 – 12'` (unchanged).
   - **Delete `notPublished`** entirely.
   - New `teaser` — counts must match the data below it (the type comment requires this).
     Lead with the real scale: 117 courses, 11 departments, 17 AP plus AP Capstone.
   - `source`: the 2026-2027 Course Selection Catalog; `sourceUrl`: **S1** (the school's
     own page, not the Heyzine CDN — the CDN URL is a content-hash that will rot).

6. **Write the 11 departments** — Bible (11), English (10), Foreign Language (7), Math
   (11), Performing Arts (8), Physical Education (6), Science (16), Social Studies (11),
   Student Media (7), Technology (3), Visual Arts (10). For each course:
   - `title` — **verbatim** from the catalog (`Algebra II - College Preparatory`, not
     "Algebra II CP").
   - `tag` — `'AP'` for the 17 AP courses; `'Honors'`; `'CP'`; or the grade band where the
     catalog gives no level. AP renders in tag-accent, the rest in tag-outline.
   - `description` — **one sentence, condensed from the catalog's own prose** for that
     course. This is the whole point of the plan: no more "Named AP science course."
     Match the density of the Covenant Day / Providence Day entries. Do not copy the full
     multi-sentence catalog paragraph, and do not invent detail the catalog does not give.
   - The 17 AP courses go into their home departments (AP Biology → Science, AP Calculus
     AB/BC + AP Statistics → Math, AP Seminar/Research → decide a home and say which in
     the comment, AP 2D Studio Art → Visual Arts, AP Computer Science A → Technology).

7. **Fix `us-courses`** ([`src/data/metricValues.ts:124`](src/data/metricValues.ts#L124))
   — `null` → `'117'`. Replace the SPA comment. **Rewrite the `quals` scope note**
   (line ~148), which currently says a total count "is not publicly available": state
   instead that 117 is the count of unique titles in the 2026-2027 catalog, that
   level-qualified variants count separately (as at the other schools), and that the
   catalog's 177 total records include an electives index re-listing courses filed under
   their home departments.

8. **Fix `advanced-courses`** (line ~172) — keep `'17 AP'`; drop the "2025-26 profile
   names 14" hedge from the comment, and rewrite the `quals` note (line ~196) to cite the
   2026-2027 catalog's own 17-course AP section plus AP Capstone (AP Seminar + AP
   Research), removing the profile-vintage discrepancy language.

9. **Fix `us-departments`** (line ~215) — `'8'` → `'11'`, with the comment listing the
   catalog's real departments (Bible, English, Foreign Language, Math, Performing Arts,
   Physical Education, Science, Social Studies, Student Media, Technology, Visual Arts)
   and noting the old 8 was derived from graduation-requirement subject areas before the
   catalog was available.

10. **Regenerate the schema doc** — `npm run schema`, then `npm run check:schema`.

11. **Commit and open the PR** with Phase 1 only. Do **not** touch any overlay file yet.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** 117 course
descriptions are 117 pieces of new user-facing prose; propagating them to 9 locales before
the user has read the English multiplies every revision by nine.

### Phase 2 — Every other locale

Only after the user confirms the English wording. This is **research prose**, so it is the
**overlay layer** per `PROSE_TRANSLATED` — *not* `src/locales/*.json`. No UI chrome
changes in this plan.

Mechanism: [`prose-translation-architecture.md`](.claude/docs/prose-translation-architecture.md).
Do not re-derive it. The 9 locales are `es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`
— confirm against `PROSE_TRANSLATED` in [`src/lib/i18n.ts`](src/lib/i18n.ts) rather than
trusting this list.

1. **Re-extract the topic** — Hickory Grove's English prose changed wholesale, so every
   one of its ~67 existing stamps in `course-offerings.<lang>.json` is now stale. Use the
   **hash-preserving re-extract** method from the Covenant Day pass
   ([`covenantDayCourseOfferings.md`](.claude/plans/covenantDayCourseOfferings.md)) so
   the other eight schools' entries keep their stamps untouched.

2. **Translate the new field-sites in all 9 locales** — expect Hickory Grove to grow from
   67 toward the 400–650 range the other schools sit in.

3. **Watch the shared entries** — some `strings[]` entries serve several schools via
   `at[]`. Hickory Grove's paths join or leave those lists; never delete an entry another
   school still points at.

4. **Locale-specific traps** — per the rollout docs, not re-derived here. Course titles
   (`Algebra II - College Preparatory`, `AP Calculus BC`) are **searchable identifiers and
   stay in English** — this is exactly the case `check:fr` guards. Grade bands (`9-12`)
   and any figure are copied char-for-char, never re-typed.

5. **Run the full locale check suite** (see Verification).

## Files touched

| File | Change |
|---|---|
| `source-material/course-offerings/hickory-grove-christian/Hickory Grove Christian - Course Offerings - 2026-2027 Course Selection Catalog.md` | new — written during planning, uncommitted; 177 course records + provenance |
| `src/data/courseOfferings.ts` | edit — rewrite `HICKORY_GROVE_CHRISTIAN` (~lines 6783–6871): comment block, `guideYear`, teaser/source, drop `notPublished`, 11 departments × 117 courses |
| `src/data/metricValues.ts` | edit — `us-courses` null→117 (+ quals rewrite), `advanced-courses` comment/quals de-hedged, `us-departments` 8→11 |
| `.claude/docs/DATA-SCHEMA.md` | regenerated by `npm run schema` |
| `src/data/schools.json` + `.claude/docs/` notes | regenerated by `ingest-source-material` |
| `src/data/overlays/course-offerings.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | **Phase 2 only** — re-extract + translate Hickory Grove's field-sites |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run check:schema` — passes (run `npm run schema` first)
- [ ] `npm run check:metrics` — no unmatched subtopics introduced
- [ ] `npm run check:quals` — the rewritten `us-courses` / `advanced-courses` quals still
      satisfy coverage
- [ ] `npm run build` — succeeds (chains `check:seo` and `check:schema`)
- [ ] **Browser check** — open the Hickory Grove school page, expand Course Offerings:
      all 11 department tabs present, tab switching lists the right courses, AP courses
      render in tag-accent and Honors/CP in tag-outline, **no "not published" note
      remains**, and the teaser counts match the actual data.
- [ ] **Browser check** — the Compare page shows Hickory Grove with a real number in
      "Upper School courses catalogued" (not "Not published"), 11 departments, and its
      per-cell tooltip shows the rewritten qual text.
- [ ] **Spot-check 5 courses against the source PDF** — title verbatim, grade level and
      level tag correct, description faithful to the catalog and not invented.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves against live `src/data/**`
      (this is the check that catches a stale stamp falling back to English silently)
- [ ] `npm run check:live` — live resolution
- [ ] `npm run check:translations` — field-site coverage per locale
- [ ] `npm run check:hashes` — stamp parity
- [ ] `npm run check:fr` — French identifier guard (course titles must stay English)
- [ ] `npm run check:sepdrift -- --lang <code>` for each locale — no separator re-typing
- [ ] `npm run check:script` / `check:bidi` / `check:fa` / `check:hi` as the rollout docs
      direct
- [ ] **Browser check in a real browser, panels expanded** — render the Hickory Grove
      course card in at least one RTL locale (`fa` or `ar`) and one lakh/crore locale
      (`hi` or `te`). Confirm course titles stayed English, no English sentence leaked
      into a department tab label, and grade bands read correctly under RTL.

## Risks

| Risk | Mitigation |
|---|---|
| 117 hand-written descriptions is the bulk of the work and invites drift into invented detail | Every description condensed from the transcribed catalog text in the source-material file; spot-check 5 against the PDF at verification |
| Rewriting English prose silently invalidates all 9 locales' stamps for this school | `check:runtime` is the guard and is listed in Phase 2; the phase split means English settles before any translation spend |
| The Heyzine CDN URL is a content hash and will rot | `sourceUrl` on the card is the school's own page (S1); the CDN URL lives only in the source-material provenance table |
| The catalog's 177 records vs 117 unique titles could produce a double-counted Compare figure | Electives index deliberately excluded as a tab; the 177-vs-117 distinction is written into the `us-courses` qual note |
| `us-departments` 8 → 11 changes a shipped number a user may have seen | Called out in *Approvals needed* to surface at review; the comment records why the old 8 existed |

## Open questions

- **Where do AP Seminar and AP Research live** now that there is no standalone AP tab? The
  catalog files them under Advanced Placement only. **Default:** put both in an
  `Electives` department if one emerges naturally from the catalog's elective list;
  otherwise English, and say which was chosen in the code comment.
- **Should the three certificate tracks be shown?** Needs UX approval for a new card.
  **Default:** do not build; the data is preserved in source-material and the plan raises
  it separately.
