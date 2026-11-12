---
name: coursecensus
title: Course Offerings follow-up to plaincourses (#485) — a description-to-catalog census of every school but Charlotte Catholic (1,531 descriptions, checked against each school's own catalog, re-downloaded where the committed record only mirrors the app), the one-sentence design applied to the 68 Charlotte Catholic boilerplate openers and 21 multi-sentence descriptions, the 24 formerly cut-off Charlotte Catholic descriptions completed with the topics plaincourses dropped, and four small narrowings; English in four reviewed batches, then all nine prose locales
status: in-progress
phases: 2
batches: 4
created: 2026-11-11
branch: feat/coursecensus
prs: []
---

# Course Offerings: census and completion (follow-up to plaincourses)

## Goal

Plan `plaincourses` (#485, merged and deployed 2026-11-11) made the Course Offerings English plain.
Four things it noticed were out of its scope. This plan does them:

1. **Census.** Check every course description of the 12 schools other than Charlotte Catholic
   against that school's **own catalog**. Fix any description that is not about its course, says
   something the catalog does not, or narrows the catalog in a way that changes the meaning.
   plaincourses only censused Charlotte Catholic, and its reviewers still found four errors
   elsewhere that predated it (three at Davidson Day, one at Covenant Day).
2. **One sentence per description, everywhere.** 68 Charlotte Catholic descriptions still open with
   catalog boilerplate ("This course is designed to…", "Students will…"), and 21 descriptions at
   six schools are more than one sentence.
3. **Complete the cut-off descriptions.** plaincourses completed Charlotte Catholic's 24
   "…"-truncated descriptions only to the end of the clause the "…" cut, then dropped the rest.
   Now that the "…" is gone they read as complete when they are not (Algebra I has no
   polynomials or quadratic functions; English 11 has no American Literature survey).
4. **Four small narrowings** plaincourses left as they were (Pathway Program, Covenant Day Music,
   Covenant Day Grade 3 Math, and one guide error to record).

It worked when:

- **Census:** every one of the 1,531 descriptions has a verdict in a committed census table, with
  the catalog evidence behind every fix; every fix is in its own commit with that evidence.
- **Sources:** each school was checked against its catalog text, not against a copy of the app.
  The five schools whose record mirrors the app have their catalog saved as new source material
  and ingested.
- **Item 2:** no Course Offerings description opens with catalog boilerplate, and none is more
  than one sentence (a ` · ` run counts as one).
- **Item 3:** each of the 24 rows carries the full topic list of its guide entry (rule in
  Decisions).
- **Item 8:** the three narrowings fixed; the guide's German III error recorded.
- **Plain language holds:** `node scripts/check_plain_language.mjs --file src/data/courseOfferings.ts`
  stays **clean**; `npm run check:plain` course-offerings stays **Flagged 0 / Jargon 0**, with no
  new unit above grade 10 except the ones listed in "Residual units above grade 10".
- **Course identity unchanged:** no title, tag, department name, grade band, `guideYear`,
  `source` or `sourceUrl` changes (guard (q)). `npm run check:matrices` output equals `main`'s.
- **Translations:** all nine prose locales carry fresh translations of every changed unit, and
  every overlay check is green.

**Two-phase.** This is parent-facing prose, so Phase 1 is English only, in **four batches with a
review stop after each**, and Phase 2 translates once, after Batch 4.

## Context

### What plaincourses left (measured 2026-11-11 at `2aaed550`)

- `src/data/courseOfferings.ts` holds all 13 schools behind `courseOfferings(slug)`
  (`ACCESSORS['course-offerings']` in `scripts/i18n_topics.mjs`). Each school is a
  `const <NAME>: CourseOfferings` block (`PROVIDENCE_DAY`, `CHARLOTTE_LATIN`,
  `CHARLOTTE_COUNTRY_DAY`, `CANNON`, `CHARLOTTE_CHRISTIAN`, `COVENANT_DAY`, `DAVIDSON_DAY`,
  `CARMEL_CHRISTIAN`, `HICKORY_GROVE_CHRISTIAN`, `GASTON_DAY`, `CHARLOTTE_CATHOLIC`,
  `TRINITY_EPISCOPAL`, `CHARLOTTE_PREP`).
- The hook reports the file **clean**. `check:plain` course-offerings: 3,189 prose units,
  Flagged 0, Jargon 0, Grade >10 7 (all listed in `plaincourses.md` "Residual units above
  grade 10").
- **Every** rule, register entry, template wording and style ruling in
  [`plaincourses.md`](plaincourses.md) is in force here. Read its "Decisions", "Content that must
  survive every rewrite", "How each field renders", "Style rulings" (including the Batch 1–3
  precedent paragraphs), "Template wordings (as built)" and every Implementation note before Batch
  1. This plan does not restate them.

### Descriptions per school, and what each school's record holds

A mechanical pre-filter (scratch, at planning) looked up each title in the school's committed
`source-material/course-offerings/<slug>/*.md` record and measured how many of the description's
content words appear near that title. It also measured how often the record holds the app's
description **word for word**. A record that holds the app's own text cannot catch drift.

| School | Descriptions | Words | Title in record | Pre-filter flags (no title / low overlap) | App text verbatim in record | Check against |
|---|--:|--:|--:|--:|--:|---|
| providence-day | 213 | 3,531 | 201 | 12 / 32 | 6% | record (fuller catalog prose) |
| charlotte-latin | 145 | 1,039 | 144 | 1 / 4 | **91%** | **the school's own pages** (re-fetched) |
| charlotte-country-day | 169 | 1,976 | 167 | 2 / 0 | **92%** | **2025-26 Course Catalogue PDF** (re-downloaded) |
| cannon | 131 | 2,067 | 130 | 1 / 1 | **83%** | **2026-2027 Academic Course Catalog PDF** (re-downloaded) |
| charlotte-christian | 166 | 2,459 | 157 | 9 / 3 | **57%** | **2026-27 US guide, MS overview, LS brochure PDFs** (re-downloaded) |
| covenant-day | 163 | 2,205 | 119 | 44 / 46 | 1% | record (four division records) |
| davidson-day | 101 | 1,575 | 98 | 3 / 0 | **60%** | **2026-2027 Upper School Course Catalog** (re-read from Issuu page images) |
| carmel-christian | 153 | 1,028 | 137 | 16 / 81 | 3% | record + the "site-written" test below |
| hickory-grove-christian | 153 | 2,599 | 143 | 10 / 11 | 0% | record (full 2026-27 catalogs) |
| gaston-day | 56 | 529 | 56 | 0 / 43 | 0% | record |
| trinity-episcopal | 44 | 756 | 35 | 9 / 13 | 0% | record |
| charlotte-prep | 37 | 491 | 31 | 6 / 10 | 14% | record |
| **Total** | **1,531** | **~20,250** | | **357 flagged** | | |

The pre-filter is a starting list, **not** the census. The Davidson Day errors plaincourses found
(example books presented as the full list, a dropped "to prepare for AP World History", a
narrowed "fine and gross motor skills") all had high word overlap. Every row needs reading.

**Many flagged rows are site-written, not catalog text.** Where a school publishes titles but no
per-course descriptions, the app carries short summaries written for the site ("The honors track
of the entry course.", "The standard track of US history.", "Honors American literature."). This
is most of Carmel (its catalog descriptions are JS- and token-gated, per its record), much of
Covenant Day's high school, and Gaston Day's Middle School strands. These are allowed. The census
checks that each one claims nothing beyond what the title, the school's course structure and the
record support (Decisions).

### Primary sources (reachability checked at planning, 2026-11-11; nothing downloaded)

All answered HTTP 200:

| School | Source | URL (from the committed record) |
|---|---|---|
| charlotte-country-day | 2025-26 Course Catalogue (Aug. update), PDF, 1.13 MB | https://resources.finalsite.net/images/v1755633363/charlottecds/kt72slq7bqecmr1hswmm/2025-26CourseCatalogueAugustupdate.pdf |
| cannon | 2026-2027 Academic Course Catalog, PDF, 1.63 MB | https://resources.finalsite.net/images/v1769529893/cannonschoolorg/ihl0lzuqgs9loqntga7z/CannonAcademicCourseCatalog2026-2027.pdf |
| charlotte-christian | 2026-27 US Course Curriculum Guide, PDF, 1.50 MB | https://resources.finalsite.net/images/v1769627723/charlotte/charlotte/charlotte/charlotte/charlotte/charlotte/zfkrvos5nbatuumajvz4/2026-27USCourseCurriculumGuidedocx.pdf |
| charlotte-christian | Middle School Course Curriculum overview, PDF, 3.49 MB | https://resources.finalsite.net/images/v1740582395/charlotte/avxqip1tnakoukzjqeew/MiddleSchoolCourseCurriculumoverview.pdf |
| charlotte-christian | Lower School Curriculum Brochure, PDF, 3.32 MB | https://resources.finalsite.net/images/v1773163759/charlotte/vo0qupxeeyux545r0nqs/LSCurriculumBrochure.pdf |
| charlotte-latin | Upper School course offerings (titles only), Middle School page (verbatim descriptions), department pages | https://www.charlottelatin.org/academics/upper-school/course-offerings, https://www.charlottelatin.org/academics/middle-school, and the other S-refs in its record |
| davidson-day | 2026-2027 Upper School Course Catalog (Issuu, 71 pp.) | https://issuu.com/davidsondayschool/docs/2026-2027_upper_school_course_catalog |

Charlotte Latin's Upper School publishes **titles without per-course descriptions**. Its app
descriptions are drawn from department-level framing, and its `divisions[2].notPublished` says
so. Its census checks each Upper School description against **its department's** page text, not
a course entry.

**Davidson Day's catalog is not text-extractable.** Its record says: "Issuu's text APIs return
HTTP 403. The catalog was extracted by pulling all 71 page images from
`image.isu.pub/260402123341-cdbc20014618b50dcafae1b78b43224f/jpg/page_N.jpg` and OCR'ing them via
the macOS Vision framework … Re-verification should use that path." Batch 2 uses that path (Step
2a).

### Charlotte Catholic (items 2, 3 and 8)

- The school's 2026–27 Curriculum Guide is
  https://resources.finalsite.net/images/v1771958102/charlottecatholicorg/ggbqwr7ecdypclivyab5/2026-2027CurriculumGuideedited.pdf,
  96 pp., SHA-256 `6db5f41830a28040a399e0e20fd9b0df3d942085e2f9b3e9712f3545d225a3a5`.
  It was re-downloaded twice on 2026-11-11 and the hash was unchanged.
- **Committed source:**
  `source-material/course-offerings/charlotte-catholic/Charlotte Catholic - Course Offerings - Curriculum Guide Full Descriptions 2026-2027.md`.
  - **Section C** holds the full guide entry for every plaincourses Catholic unit. That includes all
    24 formerly cut-off rows, keyed by app path without the `divisions[0].` prefix.
  - **Section D** holds seven entries added for the voice amendment.
  - **Extraction trap, learned in plaincourses:** `pdftotext -layout` puts U+200B between words.
    Read it **as a space**, never delete it, or words run together ("tendtobecurious"). Then
    collapse runs of spaces and rejoin a lone `i`/`l`/`j` to the word after it.
- **Item 2, the 68 boilerplate openers** (`/^(This (course|class|program)|The (course|purpose)|Students will)/`),
  by department: English 8, Interdisciplinary Studies 6, Mathematics 8, Philosophy 2, Physical
  Education 3, Science 4, Social Studies 8, Theology 6, Visual and Performing Arts 12, World
  Languages 8, Dual Enrollment 3. Four of them are also multi-sentence. None is in section C or D,
  so Batch 4 extracts their entries first (Step 2a).
- **Item 2, the 21 multi-sentence descriptions** (` · ` folded to a comma before counting, as
  guard (r) does):

  | School | Paths (`divisions[N].departments[N].courses[N]`) |
  |---|---|
  | charlotte-christian (3) | `[2].[4].[2]` World History II · `[2].[4].[4]` AP World History: Modern · `[2].[4].[7]` AP United States History |
  | charlotte-catholic (6) | `[0].[1].[5]` SAT Prep · `[0].[5].[5]` Jazzercise · `[0].[6].[11]` AP Chemistry · `[0].[7].[15]` AP Micro & Macroeconomics · `[0].[8].[0]` Faith and Revelation · `[0].[9].[0]` Art I |
  | charlotte-country-day (1) | `[2].[3].[12]` Ancient Empires (3 sentences) |
  | cannon (1) | `[0].[0].[3]` Social Studies |
  | hickory-grove-christian (1) | `[0].[4].[9]` AP Government and Politics |
  | trinity-episcopal (9) | `[0].[1].[1]` IDEA (STEM) Lab · `[0].[2].[0]` K–8 Technology Program · `[1].[0].[0]` Math 6 · `[1].[0].[2]` Advanced Pre-Algebra · `[1].[0].[5]` Algebra 1 · `[1].[0].[7]` Geometry · `[1].[3].[1]` Science · `[1].[4].[3]` Computer Science · `[1].[4].[9]` Choice Electives |

  (`[d].[p].[c]` is shorthand for `divisions[d].departments[p].courses[c]`.)
- **Item 3, the 24 formerly cut-off rows** (`description` ended in "…" at `df4dd5c9`). All are
  Charlotte Catholic, all have their guide entry in section C, and their default additions are
  in "Item 3 rows" below.
- **Item 8.**
  - Pathway Program (`[3].courses[13]`, today: "A two-year extension of the Options Program
    beyond the traditional high school experience · classes, job training, internships and
    community experiences build life skills, workplace and college readiness, and
    independence."). The guide's skills list is "essential life skills, workplace readiness,
    social communication, community navigation, and college readiness". Its activities are a
    sample: "offering opportunities **such as** job training, internships, guided community
    experiences, and continued academic development".
  - The guide's Honors German III entry (436) says "the Spanish-speaking world", a typing error in
    a sentence the app does not carry. **Record only.**
- **Item 8, Covenant Day** (record:
  `source-material/course-offerings/covenant-day/Covenant Day School - Course Offerings - Lower School Curriculum.md`).
  - **Music** `divisions[2].departments[7].courses[1]`, today "… · a children’s choir and private
    piano, vocal and guitar lessons are available." Record line 190: "4th & 5th grade students
    interested in singing can join the children’s choir."
  - **Grade 3 Math** `divisions[2].departments[4].courses[1]`, today "Place value to 10,000,
    rounding, mental math and estimation · bar models for word problems · …". Record line 134:
    "…place value to 10,000, rounding numbers, mental math and estimation, addition and
    subtraction to 10.000, bar models…". "10.000" is the school's own typing error; the same
    sentence writes "10,000".

### Checks and readers of this prose

Unchanged from plaincourses "What the rewritten text must survive": the hook (accessor kind),
`check:matrices` (titles and department names only), `check:fr` FROZEN identifiers (Phase 2),
`check:spelling`, `check:dates`, `check:moneytext`, `check:schema` (after each ingest), and
`check:live`, which **fails during Phase 1 by design** until Phase 2 re-translates the changed
units. `npm run check:metrics` already exits 1 on `main` because of a Charlotte Christian sports
subtopic outside this plan. Compare its Course Offerings lines only, and **capture `$?` before
piping it** (plaincourses once misread `| tail`'s exit code as the check's).

### Review tooling (exists, unchanged)

`scripts/plain_review.mjs --topic course-offerings --courses-markers --no-md --md-paths '^$'`,
with `--slugs`, `--paths`, `--base`, `--allow <worklist[,extra]>`, `--allow-titles`, `--out`,
`--worklist` and `--check`. It runs guards (a)–(r): LEVEL, COLLEGE, PACE, EXAM, DURATION,
GRADELEVEL, ELECTIVE, IMMERSION and the borrowed classes; (p) names, with `COURSES_NAME_STOP`;
(q) course identity over the whole file; (r) one sentence per description. A **fact fix trips
guards by design** (new names, markers, digits): fixes runs go **without** `--check`, and their
review file records the hits; wording runs use `--check`. Add a stoplist word only with a
recorded reason, as plaincourses did.

## Decisions

- **Every plaincourses decision, register entry, template and style ruling carries over.** Where
  this plan's rows touch a plaincourses template site (C1–C7, the Latin pair, the Options rows,
  N1, N2), the template wording stays identical at every site. If a completion changes one site
  of a template, it changes every site.
- **The census verdicts**, one per description:
  `OK` · `SITE-WRITTEN-OK` (a site summary that claims nothing beyond the title, the course
  structure or the record) · `NOT-ABOUT-COURSE` (it describes another course, or nothing) ·
  `MISSTATES` (says something the catalog does not, or contradicts it) · `NARROWS` (drops a
  qualifier, condition or list item so the meaning changes: a sample shown as the full list, a
  dropped "to prepare for AP World History", "fine and gross" → "fine") · `UNSUPPORTED`
  (a site-written claim the record does not support).
  Only the last four are fixed. A description that is shorter than its catalog but still true is
  `OK`: the census is not a completion pass for the other 12 schools.
- **Evidence is the school's own text.** For the five re-sourced schools that means the newly
  saved catalog file. A fix quotes it with page/line. No third-party page is evidence of a course.
- **The census reads the version the app was built from.** If a school has published a newer
  catalog year since its record was compiled, that is freshness, not a census finding. Note it
  under Candidates and do not refresh.
- **The census is done by a fresh `general-purpose` subagent per school** (several in parallel,
  each writing only its own scratch output). It reads the school's source text and every
  description, and returns a table: `path · title · verdict · evidence (quote + location) ·
  proposed fix`. The implementer checks every non-`OK` row against the source before applying
  it. The census subagent never edits the repo.
- **Census fixes land in a fixes commit per batch, before that batch's wording pass**, with
  `review-batch<N>-fixes.md` (plaincourses Step 2a pattern). A fix is written to the plain
  standard straight away (one sentence, the hook passes), so the wording pass does not touch it
  again.
- **Item 2 condenses, it does not add.** A boilerplate opener or a second sentence is rewritten
  into one sentence with the same facts. Nothing new is added from the guide, except where item 3
  or a census finding applies. The guide entry is read only to confirm the meaning.
- **Item 3's completion rule** (replaces plaincourses' "stop at the cut clause" rule for these 24
  rows only):
  - (a) Restore everything in the **sentence the "…" cut**.
  - (b) Also restore a **later sentence's topic list**, and any later **requirement or condition**
    (required, mandatory, only, audition, prerequisite-like, honors/advanced distinction).
  - (c) Skip marketing, teaching-method and duration sentences ("This course meets for a full
    year").
  - Lists go into ` · ` runs, items in the guide's order, each item's words kept where possible.
  - Every item is measured on its own (the hook splits on ` · `). A row may run past 30 words in
    total; no single item or lead may.
  - A completion that enters a guard class is a by-design hit and is listed with its guide sentence.
- **Item 8 defaults:**
  - **Pathway.** Restore the sample ("such as") and the two dropped skills.
  - **Covenant Music.** "a children’s choir for 4th and 5th graders".
  - **Covenant Grade 3 Math.** Add "addition and subtraction to 10,000" in its place in the list,
    written "10,000": the school's own "10.000" is an evident typo beside its own "place value to
    10,000". Record the choice.
  - **German III.** A line in the Charlotte Catholic source file's provenance header, beside the
    other recorded guide errors.
- **New source files** are named `<School> - Course Offerings - Curriculum Guide Full Descriptions <year>.md`
  so the subtopic matches the existing `curriculum` rule in `src/lib/metrics.ts`. Under any other
  name the ingest creates an unmatched ⚠️ card key in `DATA-SCHEMA.md` (plaincourses
  Implementation notes, Batch 3).
- **Four batches, by source type and size** ("Batch plan"). One branch, one PR, opened only after
  Phase 2.

## Batch plan (Phase 1)

| Batch | Work | Descriptions censused | Other units |
|---|---|--:|---|
| **1** | Re-source **Charlotte Country Day** and **Charlotte Latin** (save + ingest). Census **Providence Day, Charlotte Latin, Charlotte Country Day**. | 527 | CCD Ancient Empires (item 2) |
| **2** | Re-source **Cannon**, **Charlotte Christian**, **Davidson Day** (save + ingest; DD by page-image OCR). Census those three. | 398 | Christian ×3, Cannon ×1 (item 2) |
| **3** | Census **Covenant Day, Carmel, Hickory Grove, Gaston Day, Trinity, Charlotte Prep** (records only; the site-written test matters most here). | 606 | Trinity ×9, HG ×1 (item 2); Covenant Music and Grade 3 Math (item 8) |
| **4** | **Charlotte Catholic**: extract the 68 + 6 entries (section E), item 2 (68 openers + 6 multi-sentence), item 3 (24 rows), Pathway (item 8), German III note. | — (censused by plaincourses) | ~98 units |

Each batch is a review stop sized for about 20 minutes. In a census batch, the user reviews the
fix table (the non-`OK` rows), not 500 verdicts. The full census table is committed for the
record.

### Batch progress

| Batch | Sources commit | Census table | Fixes commit | Wording commit | Reviewer findings | User verdict |
|---|---|---|---|---|---|---|
| 1 | `2066da3c`, `ab89d799`, `a95a9584` (ingest `6b882c9a`, `19c1fb7b`, `39408ece`) | `census-{providence-day,charlotte-latin,charlotte-country-day}.md` (`4ee6078e`) | `4ee6078e` (54), `647257fb` (13) | `9ee41278` | 7 wording edits, 5 fact findings, 3 of 25 `OK` re-checks overturned | pending |
| 2 | — | — | — | — | — | — |
| 3 | — | — | — | — | — | — |
| 4 | — | — | — | — | — | — |

### Item 3 rows (defaults; the drafter confirms each against section C)

All Charlotte Catholic, `divisions[0].departments[N].courses[N].description`. "Add" is what rule
(a)/(b) restores. "—" means the row is already complete under the rule; confirm and leave it.

| Path | Course | Add (from section C) |
|---|---|---|
| `[0].[4]`, `[0].[5]` | English 10, Advanced English 10 (C6, both sites) | (a) "continued work on vocabulary, reading comprehension and literary terms" |
| `[0].[8]` | English 11 | (a) vocabulary · "a survey of the periods and genres of American Literature, with attention to historical and social contexts" |
| `[0].[9]` | Honors English 11 | (a) vocabulary · the American Literature survey; (b) "required extra reading and frequent short papers" |
| `[0].[11]` | English 12 | (a) "documented essays using primary and, in some cases, secondary sources" · vocabulary development |
| `[1].[2]` | Assistants | (b) "may only be taken one time" (ONLY) |
| `[1].[18]` | Honors Civil and Construction Engineering | (b) bridges and the basics of structural analysis · city infrastructure and city planning |
| `[2].[0]`, `[2].[1]` | Algebra I, Advanced Algebra I (C7, both sites) | (a) operations with polynomials · factoring polynomials · quadratic functions · displays and numerical summaries of data |
| `[2].[4]` | Honors Geometry (C1) | — |
| `[2].[7]` | Honors Algebra II (C1) | (a) complex numbers · correlation and regression · normal models · confidence intervals for proportions and means |
| `[2].[12]` | Honors Pre-Calculus (C1) | (b) probability · counting · sequences and series · conic sections · the complex number system · hypothesis testing for means and proportions |
| `[2].[16]` | AP Calculus BC | (b) limits · derivatives · definite integrals · the Fundamental Theorem of Calculus · series; (b) "every student must take the AP Calculus BC exam" (EXAM, as AP Physics 1 and AP European History already say) |
| `[6].[0]` | Biology | (b) cell structure and function · the structure and function of plants and animals · reproduction · genetics · evolution · ecology; (b) labs and dissection count toward the grade |
| `[6].[3]` | Advanced Chemistry | — (a sample, "including"; it stays a sample) |
| `[6].[13]` | AP Physics 1 | (b) the content areas: Kinematics · Forces and Translational Dynamics · Work, Energy, and Power · Linear Momentum · Torque and Rotational Dynamics · Energy and Momentum of Rotating Systems · Oscillations · Fluids |
| `[6].[14]` | AP Physics C: Mechanics | (b) "heavily lab based", problem solving with calculus · "every student must take the AP Physics C: Mechanics exam" (the "AP Calculus must be taken concurrently" line is eligibility, not description: skip it) |
| `[7].[2]` | Honors World History | (b) from Ancient World history through early China to the Cold War · "not a Eurocentric class": Africa, Asia and Latin America as well as Europe |
| `[9].[24]` | Honors Theatre: Design and Tech | (b) students run all lighting and sound for the school's facilities and take leadership roles in every production |
| `[9].[32]` | Honors Dance III | (b) "the purchase of appropriate dance shoes is required" |
| `[9].[33]` | Concert Band | (b) after-school rehearsals and performances are mandatory · members also march in the fall · at-home practice is required |
| `[9].[38]` | Guitar II | (b) students perform in groups and solo |
| `[10].[3]`, `[10].[22]` | Advanced French III, Advanced Spanish III (C2, both sites) | (a) "with a strong emphasis on grammatical concepts and speaking" |

## Approvals needed

**None** (no card, section, Compare row, metric key, ordering or layout change; no field added or
split). The gates are the user's four batch reviews and the Phase 1 → 2 approval. Three planning
defaults can be overruled at review: the item 3 rule (b) scope, the "10,000" spelling, and
treating site-written summaries as allowed (`SITE-WRITTEN-OK`).

## Source material

To be fetched by `/implement`, not at planning (only reachability was checked). Each goes to
`source-material/course-offerings/<slug>/<School> - Course Offerings - Curriculum Guide Full Descriptions <year>.md`
with a provenance header (method, date, URL, SHA-256 of the PDF, extraction cleanup), the source
URLs table, and the full text of every course the app lists, in app order, keyed by app path:

- Batch 1: Charlotte Country Day (2025-26 Course Catalogue); Charlotte Latin (the Upper School
  course-offerings page, the Middle School page and the department pages its record cites, as
  fetched HTML text).
- Batch 2: Cannon (2026-2027 Academic Course Catalog); Charlotte Christian (2026-27 US guide, MS
  overview, LS brochure); Davidson Day (2026-2027 Upper School Course Catalog, from the Issuu page
  images by OCR, as its record describes).
- Batch 4: Charlotte Catholic, **section E** appended to the existing full-descriptions file (the
  68 boilerplate rows and the 6 multi-sentence rows; same guide, same SHA, same cleanup).

Each batch commits its source files on their own, then runs the `ingest-source-material` skill:
`python3 .claude/skills/ingest-source-material/build_docs.py course-offerings` then
`python3 scripts/build_site_content.py`. Then:
- revert the other schools' date-only "Rebuilt" doc diffs;
- restore `src/data/schools.json` to `HEAD` order plus the new document (it reorders: memory
  `two-topic-ingest-reorders-manifest`);
- run `npm run schema` if `check:schema` drifts, and confirm no ⚠️ card key appeared.

The note builder truncates each document at 45,000 characters, so a long file may change only its
note header.

## Out of scope

- Charlotte Catholic's census (done in plaincourses) and **completing** descriptions at the other
  12 schools: a true-but-shorter description stays as it is.
- Freshness: refreshing a school to a newer catalog year (record it as a candidate).
- Course identity fields (no title, tag, department, grade band, `guideYear`, `source` change), the
  Compare matrix, `metricValues.ts`, `metrics.ts`, components, chrome, layout.
- Teasers' counts and `notPublished` notes, unless a census fix makes one false. If so, report it
  at review, and do not silently rewrite it.
- `scripts/plain_language.json`, and the "holistic" gloss and `check:metrics` candidates from
  plaincourses.
- Deploying.

## Steps

### Phase 1 — English

**Each batch runs Steps 1–8 for its own scope.** Before every batch: `git checkout feat/coursecensus`
(create it from `main` in Batch 1), `git fetch && git rebase origin/main`. Never `git stash`
(memory `never-git-stash-in-shared-tree`).

1. **Status** (Batch 1 only). Set this plan's front matter `status: in-progress` and the INDEX row
   to *In progress*, committed with the first commit.

2. **Sources** (Batches 1, 2, 4).
   - **(a) Fetch and save.** Download each source in "Source material" to the session scratchpad
     and record its SHA-256. Extract the text: `pdftotext -layout`, read U+200B as a space, then
     collapse spaces. For Davidson Day, fetch the 71 page images from the `image.isu.pub` path in
     its record and OCR them with the macOS Vision framework (a small Swift or Python-`pyobjc`
     script); spot-check the pages its record names (8, 11, 28, 70) by reading the images.
   - **(b) Write the files.** Write the full-descriptions file per school (format above). For
     Charlotte Catholic, section E.
   - **(c) If a source fails:** for any reason (gone, changed beyond the app's version, OCR
     unusable), census that school against its record. Say so in the batch report and the
     Implementation notes.
   - **(d) Commit and ingest.** Commit the source files alone
     (`coursecensus: batch <N> sources — <schools>`). Then ingest, clean up as "Source material"
     says, and commit the ingest outputs (`coursecensus: batch <N> ingest`).

3. **Census** (Batches 1–3).
   - **(a) Run the census subagents.** Spawn one fresh `general-purpose` subagent per school, in
     parallel. Give each:
     - the school's source text, or the new file;
     - its committed record;
     - a scratch dump of every description, with its path, title, department and division;
     - this plan's "Decisions" (the verdicts);
     - plaincourses "Content that must survive every rewrite";
     - the pre-filter flags for that school, as a starting point only.

     It returns `census-<slug>.tsv` in its own scratch subdirectory, with one row per description:
     path · title · verdict · evidence (quote + page/line) · proposed fix (one sentence, plain
     standard). It writes nothing else.
   - **(b) Verify and commit the census.** Re-check every non-`OK` row against the source
     yourself; downgrade a finding that the evidence does not support, and record why. Commit the
     table as `.claude/plans/coursecensus-data/census-<slug>.md`: a verdict summary per school,
     then the non-`OK` rows with evidence, then all rows collapsed under a `<details>` block.

4. **Fixes commit** (every batch with a census finding; Batch 3 also takes the two Covenant item-8
   rows).
   - **(a) Apply.** Apply the verified fixes by an exact-literal script that refuses a missing or
     duplicated literal. Where one text sits at several sites (an identical description),
     anchor each edit on its course title within the school's `const` block. Then run
     `node scripts/check_plain_language.mjs --file src/data/courseOfferings.ts` by hand: a
     scripted write bypasses the hook. It must stay clean.
   - **(b) Check the diff.** `git diff` shows only the fixed leaves (a leaf-diff script against
     `HEAD`).
   - **(c) Write the review file.** Generate `.claude/plans/coursecensus-data/review-batch<N>-fixes.md`
     with `node scripts/plain_review.mjs --topic course-offerings --courses-markers --no-md --md-paths '^$' --slugs <batch schools> --paths '(?:description|teaser|notPublished)$' --base HEAD --out <file>`
     (**without** `--check`), then append the evidence table: path, verdict, before, after, source
     quote. Guard (q) must pass: no identity leaf changed.
   - **(d) Commit.** `coursecensus: batch <N> census fixes — <schools>`.

5. **Wording** (item 2 rows in Batches 1–3; items 2, 3 and Pathway in Batch 4).
   - **(a) Worklist.** Write `.claude/plans/coursecensus-data/worklist-batch<N>.json` by hand in
     the plain_review worklist format (`{ generated, topic, note, total, units: [{ at, slug, path }] }`),
     listing exactly this batch's wording units.
   - **(b) Draft.** Draft in a scratch JSON keyed by `at`. Measure with the hook's own functions
     (`analyze`, `fleschKincaid`, `sentences`, exported from
     `scripts/check_plain_language.mjs`). Apply by the exact-literal script, then re-run the hook
     by hand.
   - **(c) Review file.** `node scripts/plain_review.mjs --topic course-offerings --courses-markers --no-md --md-paths '^$' --slugs <schools> --paths '(?:description|teaser|notPublished)$' --base <this batch's fixes SHA, or the ingest SHA> --allow .claude/plans/coursecensus-data/worklist-batch<N>.json --out .claude/plans/coursecensus-data/review-batch<N>.md --check`.
     It must exit 0, or 1 on by-design hits only. Item 3 completions entering a class are
     by-design hits; list each with its guide sentence under "Guard hits by design". Every row
     must read `hook: pass`.
   - **(d) Templates.** A completion at a template site (C1, C2, C6, C7) is written once and used
     identically at every site of that template. Record each new wording in this plan's
     Implementation notes, and leave `plaincourses.md` unchanged as the record of what it shipped.

6. **Independent review.** One fresh `general-purpose` subagent per batch, which never saw the
   drafting.
   - **Give it:**
     - this batch's census tables, fixes review file and wording review file;
     - the source files;
     - this plan's Decisions and "Item 3 rows";
     - plaincourses' "Content that must survive", "Style rulings" and "Template wordings";
     - `src/components/CourseOfferings.tsx`.
   - **It checks every fix and every rewritten row for:**
     - meaning drift;
     - a fact the evidence does not support;
     - a dropped prerequisite, grade, duration, exam, selection rule or level marker;
     - a sample turned into a full list, or the reverse;
     - a reordered list;
     - a re-typed figure;
     - a template differing across its sites;
     - a FROZEN identifier (`scripts/check_fr_identifiers.mjs`) shortened or dropped;
     - a bare pronoun after a ` · ` split;
     - first- or second-person voice;
     - a school claim made our own.
   - **It also re-checks a random 5% of the census `OK` verdicts per school** (at least 5 rows),
     and reports any it disagrees with.
   - **Its output:** it fixes wording findings in place with Edit (the hook must pass). It reports,
     rather than edits, any finding that is a fact error in the original text. Those go into a
     second fixes commit with evidence, applied against the original text, and then the wording is
     restored on top (plaincourses Batch 1 `db076885` pattern).
   - **Afterwards:** regenerate the review file and append `## Independent review`.

7. **Checks.**
   - **Build:** `npx tsc -b`, then `npx vite build`.
   - **The build's later checks, by hand:**
     `npm run check:schema && npm run check:spelling && npm run check:flags && npm run check:matrices && npm run check:schoolurls && npm run check:chrome && npm run check:runtime && npm run check:moneytext && npm run check:dates && npm run check:spans && npm run check:photos`,
     then `npm run test:plain`.
   - **`check:matrices`:** run `node scripts/check_compare_matrices.mjs` and diff it against
     `main`'s output (save it once in Batch 1 from a `git worktree` at `main`). It must be identical.
   - **`check:live`:** it fails only in `course-offerings`. Record the stale count.
   - **Hook:** the hook is clean, and `check:plain` course-offerings is Flagged 0 / Jargon 0.

8. **Browser check, commit and stop.**
   - **Browser.** `npx vite preview`, headed Chrome via Playwright (memory
     `headed-chrome-via-playwright`), every card open. Every changed description renders exactly
     as the module holds it. Scope to `.note-card-report:has(.courses)`: every topic's report cards
     are on the page whatever `?topic=` says. Also confirm:
     - ` · ` runs read correctly;
     - a search for one restored item finds its course (e.g. "quadratic" → Algebra I,
       "American Literature" → English 11);
     - no literal `*`;
     - no new card after an ingest;
     - no overflow at 390px.

     Copy the script into the repo root to resolve playwright, and delete it after.
   - **Commit and push.** Stage explicit paths only. Commit
     `coursecensus: batch <N> English — <scope>`, push, and check `git rev-parse HEAD` against
     `git ls-remote origin feat/coursecensus`. **Do not open the PR.**
   - **Report.** Report the census verdict counts per school, the fixes with evidence, the
     wording review files, residuals, the reviewer findings and the paste-in command:
     - after Batches 1–3: `/implement coursecensus — Batch <N+1>. Batch <N> English is approved.`
     - after Batch 4: set `status: english-done` and the INDEX row to *English shipped*, then
       give `/implement coursecensus — Phase 2. All four English batches are approved. Run only Phase 2.`

   **→ STOP after each batch.** On resume, record the user's verdict and any rulings in "Batch
   progress" and the Implementation notes before the next batch's first step.

**→ STOP. After Batch 4, `/implement` ends its turn and waits.** Nothing below runs until the
user approves all four batches.

### Phase 2 — Every other locale

**Scope:** the `course-offerings` prose overlay in the nine `PROSE_TRANSLATED` locales (es, bn, ht,
te, fr, fa, it, hi, ar). No chrome key changes. Mechanism:
`.claude/docs/prose-translation-architecture.md`. **The worked precedent is plaincourses' "Phase 2
(2026-11-11)" Implementation note**; follow it step for step. Its scratch scripts lived in a
session scratchpad and are gone, so rebuild them from that note:
- the base snapshot;
- the splice count check;
- `mktask` (pairing by `at`);
- the brief;
- the gate, **including its title-keep exemption** (a title whose predecessor kept it English may
  stay English);
- the by-stamp proof;
- the locale browser check.

1. **Snapshot** each locale's work file from `main`:
   `git show main:src/data/overlays/work/course-offerings.<lang>.json` → scratch.
2. **Count, then splice.**
   - Before splicing, compute *added* (distinct new texts not in the snapshot) and *dropped* (old
     texts no site holds any more) from the live module.
   - Then run `node scripts/i18n_splice_work.mjs --lang <code> --topic course-offerings --dry-run`;
     it must match.
   - Then splice all nine.
3. **Translate.**
   - **Task files.** Pair each added unit with its reviewed predecessor by `at`. Flag census
     `NOT-ABOUT-COURSE` rows: their predecessor translated the wrong course's text, so translate
     fresh and carry over only terminology.
   - **Subagents.** Three `general-purpose` subagents (es/fr/it, bn/hi/te, ht/fa/ar), each in its
     own scratch subdirectory, reading only its task files and the brief and writing only its own
     `out.json` (memory `parallel-locale-agents-collide`).
   - **Templates.** Translate each once per locale, reusing plaincourses' existing renderings
     where the template is unchanged.
4. **Gate, apply, rebuild.**
   - Gate every unit in every locale. Confirm each file holds its own language (sample one shared
     unit per locale: the script check cannot separate es/fr/it/ht).
   - Apply, then `node scripts/i18n_build_overlay.mjs --topic course-offerings --lang <code>` and
     `python3 scripts/check_figures.py --topic course-offerings --lang <code>`.
5. **Verify by stamp** against the snapshots: kept stamps byte-identical, new stamps non-blank and
   not English (titles aside). `node scripts/check_work_integrity.mjs` reports the splice's
   string-count change as a "violation" per locale. That is expected; any wrong-language finding
   is not.
6. **Checks** (Verification, Phase 2). Then:
   - write Implementation notes;
   - set `status: implemented` and `prs: [<n>]`, and the INDEX row to *Implemented* with the link;
   - open the PR with `--body-file`;
   - squash-merge (pre-authorized), then `git checkout main && git pull`.

   **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/courseOfferings.ts` | edit: census fixes (12 schools), item 2 (89 units), item 3 (24 rows), item 8 (3 rows) |
| `source-material/course-offerings/{charlotte-country-day,charlotte-latin,cannon,charlotte-christian,davidson-day}/<School> - Course Offerings - Curriculum Guide Full Descriptions <year>.md` | new (Batches 1–2) |
| `source-material/course-offerings/charlotte-catholic/Charlotte Catholic - Course Offerings - Curriculum Guide Full Descriptions 2026-2027.md` | edit: section E (Batch 4); German III line in the provenance header |
| `.claude/docs/course-offerings/<slug>.md`, `src/content/course-offerings/<slug>.json`, `src/data/schools.json`, `.claude/docs/INDEX.md`, `.claude/docs/DATA-SCHEMA.md` | regenerated by each ingest |
| `scripts/plain_review.mjs` | edit only if a stoplist word is needed (with a recorded reason) |
| `src/data/overlays/work/course-offerings.{es,bn,ht,te,fr,fa,it,hi,ar}.json`, `src/data/overlays/course-offerings.{same}.json` | Phase 2 |
| `.claude/plans/coursecensus-data/*` (census tables, worklists, review files) | new |
| `.claude/plans/coursecensus.md`, `.claude/plans/INDEX.md` | progress, notes, status |

No skill or command changes, so `.claude/SKILLS.md` is not touched. No `CLAUDE.md` change.

## Verification

### Phase 1 — English (per batch)

- [ ] **Sources:** each new file has its SHA-256 (PDFs), URL table and full text. The ingest ran,
  `check:schema` passes after `npm run schema`, there is no ⚠️ card key, no date-only doc diffs,
  and `schools.json` is in `HEAD` order.
- [ ] **Census:** `census-<slug>.md` committed for every school in the batch; every description
  has a verdict; every non-`OK` row has a quote and location; the reviewer's 5% `OK` re-check
  found no disagreement (or each is resolved and recorded).
- [ ] **Fixes:** the fixes commit holds only the fixed leaves; `review-batch<N>-fixes.md` lists
  before, after, verdict and evidence; guard (q) passes.
- [ ] **Wording:** the Step 5 `--check` exits 0, or 1 on listed by-design hits only; every row
  `hook: pass`; no description opens with boilerplate and none is more than one sentence in this
  batch's scope.
- [ ] **Hook** clean; `check:plain` course-offerings Flagged 0 / Jargon 0; any new Grade >10 unit
  listed in "Residual units above grade 10".
- [ ] **Templates** identical at every site.
- [ ] **Build and checks:** `npx tsc -b`, `npx vite build`, the Step 7 list, `test:plain`;
  `check:matrices` equals `main`'s; `check:live` stale only in `course-offerings`.
- [ ] **Browser:** the Step 8 items.
- [ ] **After Batch 4:** no description in the file matches the boilerplate opener pattern or
  counts more than one sentence; the 24 item-3 rows carry their table's additions.

### Phase 2 — Locales

- [ ] Splice counts match the independent count; gate passes for every unit in every locale; each
  file holds its own language.
- [ ] By-stamp proof: kept byte-identical, new non-blank.
- [ ] `npm run build` green end to end (`check:live` and `check:runtime` included).
- [ ] `npm run check:digits` (deliberate renderings recorded), `check:sepdrift -- --lang <code>`
  ×9, `check_figures.py --topic course-offerings --lang <code>` ×9, `check:fr`, `check:hi`,
  `check:fa`, `check:bidi`, `check:dates`, `check:moneytext`, `check:currency`, `check:chrome`.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9: 0 flags on the changed paths (match `slug:path`).
- [ ] `npm run build && npx vite preview`, then `npm run audit:daterender -- --lang es --lang fa --lang hi`
  and `npm run audit:moneyrender`: no new Course Offerings finding.
- [ ] Browser, all nine locales, every school with a changed unit: every changed site renders its
  translation; ranges in order in fa/ar (glyph x-positions, bidi isolates stripped).

## Risks

| Risk | Mitigation |
|---|---|
| The census becomes a rewrite of the area | `OK` covers true-but-shorter; only four verdicts are fixed; completion is out of scope outside Catholic's 24 rows |
| A census subagent invents a finding | The implementer re-checks every non-`OK` row against the source; the reviewer re-checks 5% of `OK` rows |
| A source changed since the record was built | Check against the version the record cites; a newer catalog is a candidate, not a finding |
| Davidson Day OCR is unusable | Census DD against its record and say so |
| A fix changes a template site and not its siblings | Step 5(d); reviewer item; template grep |
| Item 3 completions overload a row | Each ` · ` item is measured alone; rule (c) skips marketing and duration sentences |
| An ingest reorders `schools.json` or mints a ⚠️ key | "Curriculum Guide Full Descriptions" naming; restore `HEAD` order; `check:schema` |

## Open questions

- **Item 3 rule (b)** (later-sentence topic lists and requirements). **Default:** apply it as the
  "Item 3 rows" table lists. The alternative is rule (a) only (the cut sentence).
- **Covenant Grade 3 Math "10,000" vs the school's "10.000".** **Default:** "10,000", recorded.
- **Site-written summaries** (`SITE-WRITTEN-OK`). **Default:** allowed when they claim nothing
  beyond the title, structure or record. The alternative, replacing each with a "not published"
  framing, would be a structural change and is out of scope.
- **A newer catalog year found while re-sourcing.** **Default:** record it under Candidates; do not
  refresh.

## Residual units above grade 10

*Filled in by `/implement`: path, after-grade, reason.*

| Path | After-grade | Reason |
|---|--:|---|
| | | |

## Implementation notes

*Filled in by `/implement`, one section per batch, then Phase 2.*

### Batch 1 — Providence Day, Charlotte Latin, Charlotte Country Day

**Deviation 1: Providence Day was re-sourced too.** The Context table says its record holds
"fuller catalog prose"; it holds one-line condensations like the app's, so it could not show what
the catalog says. Its 2025-2026 Upper and Middle School Course of Study PDFs (URLs from the
record, SHA-256 in the new file's header) and its Lower School and Global Education pages were
saved as `Providence Day - Course Offerings - Curriculum Guide Full Descriptions 2025-2026.md`
(`ab89d799`) and ingested (`19c1fb7b`).

**Deviation 2: Charlotte Latin publishes per-course Upper School descriptions.** Every title on its
course-offerings page is a Finalsite click-to-open post (element `fsEl_31330`, 136 posts: 122
courses plus department introductions), invisible to a plain fetch — the trap recorded for Covenant
Day in memory `finalsite-popup-tiles-hide-data`. The posts were fetched from the popup endpoint and
the census judged each Upper School row against **its own post**, not department framing as the
Context section planned. The Lower and Middle School pages' 8 posts were fetched too. Consequence,
reported at review and not changed (out of scope): Latin's Upper School `notPublished` ("titles
without per-course descriptions … each description comes from how the school describes that
department") is false, and its teaser's "129 courses" does not match the 122 course posts.

**Sources.** Country Day: the 2025-26 guide PDF, SHA-256
`b777a4f809f4a527938cc1801f6c6c15575bf2df71b584b7244bee971382af0d` (unchanged from the record's
URL; the PDF's `Subject` metadata still says 2023-24, its cover and footers 2025-26), extracted
column by column with `pdfplumber` because `pdftotext -layout` interleaves the two columns; plus the
Lower and Middle School hub and grade pages. The Middle School overview page (the only page naming
its Latin option) was left out of the first commit and added in `a95a9584` / `39408ece`. All three
ingests: other schools' date-only note rebuilds reverted, `schools.json` restored to HEAD order plus
the new documents, `npm run schema` run, no ⚠️ card key.

**Census.** Three fresh `general-purpose` subagents, one per school, with a common brief (verdicts,
evidence rule, minimal one-sentence fixes); no pre-filter list was available (the planning scratch
is gone), so every row was read. Every non-OK row was re-checked against the source; one OK was
upgraded (Latin Chemistry II (AP): "college-level second-year chemistry" reads as second-year
college chemistry; the school says it equals first-year college general chemistry) and one fix
widened (Country Day Honors Physics I: "accelerated" is not in the guide). Verdicts after the
review below:

| School | Rows | OK | SITE-WRITTEN-OK | Rows fixed | `4ee6078e` edits | `647257fb` edits |
|---|--:|--:|--:|--:|--:|--:|
| providence-day | 213 | 191 | 9 | 13 | 11 | 2 (both new rows) |
| charlotte-latin | 145 | 117 | 4 | 24 | 20 | 5 (4 new rows, Visions of the Future again) |
| charlotte-country-day | 169 | 141 | 5 | 23 | 23 | 6 (all rows already fixed once) |
| **Total** | **527** | **449** | **18** | **60** | **54** | **13** |

(Counts in the committed `census-*.md` files are the first-round verdicts; the second-round rows are
in `review-batch1-fixes2.md`.) What the fixes correct: Country Day's entry requirements cut short
against the guide's p. 8 qualification table (recommendations, second grade routes, prerequisite
courses), "accelerated" where the guide says depth, Algebra III/Trigonometry called a bridge,
Orchestra called a full orchestra, the Lower School language choice; Latin's claims its posts do not
support (grades, "senior semester", "honors pace", "nationally ranked", Fab Lab, Git), "primarily
seniors" narrowed, seminars with an honors option called honors courses, Stagecraft II not a sequel,
a Middle School "Upper School credit" claim with no source on three rows; Providence Day's samples
shown as full lists (plays, novels, religions, countries, authors), a dropped "the loss of", dropped
prerequisites, an aim stated as an outcome.

**Independent review.** All 54 first-round fixes confirmed. 7 wording edits made in place. 5 fact
findings plus 3 overturned `OK` rows (12% of the 25-row sample) and 2 related rows: fixed in a
second fixes commit against the committed text (`647257fb`, plaincourses `db076885` pattern), the
wording restored on top, so the Step 5 review base for Batch 1 is `647257fb`.

**Wording (item 2).** Country Day Ancient Empires counted as three sentences only because guard
(r)'s `sentences()` splits at "c." (circa); "c. 3000 BCE to c. 1000 CE" → "about 3000 BCE to about
1000 CE" (the guide: "c. 3000 BCE … around 1000 CE"). `--check` exits 1 on one by-design hit,
(p) "I" from "Physics I" in a reviewer edit (recorded in `review-batch1.md`). A second
multi-sentence row, Latin `divisions[1].departments[4].courses[0]` (Latin 7), counts two only
because it quotes the school's own question ("Are you ready to travel back in time?"); quoted spans
are protected, so it is left and raised at review. Guard note: IMMERSION matches "taught in Middle
School" (a false match on the "taught only in Spanish" pattern; no language-of-instruction claim).

**Checks.** `tsc -b` clean; `vite build` succeeds; `check:schema`, `check:spelling`,
`check:flags`, `check:schoolurls`, `check:chrome`, `check:runtime`, `check:moneytext`,
`check:dates`, `check:spans`, `check:photos` exit 0; `test:plain` 32/32; `check:matrices` output
byte-identical to `main`'s. Hook clean; `check:plain` course-offerings Flagged 0 / Jargon 0 /
Grade >10 7 (unchanged; no new residual). `check:live` fails only in `course-offerings`: **61
stale entries per locale** (every Batch 1 changed description).

**Browser** (real Chrome via Playwright, `vite preview`): all 9 division cards of the three schools
render every description (213 + 145 + 169 rows) and every `notPublished` note exactly as the module
holds them; no literal `*`; searches found Modern Dramatic Literature ("loss of individualism"),
Visions of the Future ("dystopian") and Honors Algebra II ("teacher recommendation"); no overflow at
390px.

**Reported at review, not changed** (identity fields and notes are out of scope): Latin
`notPublished` and teaser above; Providence Day's Lower School teaser "Singapore Math … from TK"
(the school says kindergarten–5) and note "There is no … guide" (does-not-exist form); Country Day's
Lower and Middle School notes ("There is no … catalog") and Middle School teaser and Geometry tag
("high-school credit", unsupported by its pages); Latin tags contradicting the posts (two seminars
tagged `Honors`, Engineering I/II `Year` vs semester, Middle School Engineering `Gr 6` vs Grades
6–8, four English electives `Semester` with no semester line).

**Popup scan of the other nine schools (user question, 2026-11-11).** The 48 web pages their
records cite were scanned for Finalsite click-to-open posts. Nothing needs re-sourcing: Cannon's
posts are division prose and honor societies (no courses); Davidson Day's are links; Covenant Day's
course posts are already in its records; Charlotte Christian, Hickory Grove, Gaston Day and
Charlotte Prep have none; Carmel's gap is its known JS-gated Calaméo guide. **Trinity Episcopal's
four cited pages now return 404** (site moved): its Batch 3 census reads the record of the version
the app was built from, and the move is a freshness candidate.
