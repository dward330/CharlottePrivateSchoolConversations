---
name: plaincourses
title: Plain-language rewrite of the Course Offerings area's English prose in src/data/courseOfferings.ts (106 worklist units across 11 schools, 98 hook-flagged + 8 at grade 10–12, ~2,990 before-words; Charlotte Catholic alone 53) plus 27 extra units, with every course title, tag, department, grade band, prerequisite, credit and AP/Honors/Advanced level unchanged, "rigorous" replaced by what makes the course hard, one sentence per description, and Charlotte Catholic's 17 descriptions attached to the wrong course, 2 duplicate descriptions and 4 truncated titles fixed from the school's own 2026–27 guide in their own commit; the filter's hardcoded English no-match message moved into two context-aware chrome keys; new `--courses-markers` guard set in plain_review.mjs; English in four reviewed batches, then all nine prose locales
status: in-progress
phases: 2
batches: 4                     # Phase 1 is built in four batches, each with its own review stop
created: 2026-11-11
branch: feat/plaincourses
prs: []
---

# Plain-language rewrite of the Course Offerings area

## Goal

Rewrite the Course Offerings research area's existing English prose to the plain-language
standard in `CLAUDE.md`. The reader is an average parent; the target is grade 8–10; no
sentence runs past 30 words.

- **Scope:** `src/data/courseOfferings.ts` only. It is one module holding all 13 schools behind
  the `courseOfferings(slug)` accessor (`ACCESSORS['course-offerings']` in
  `scripts/i18n_topics.mjs`), so worklists and batches are built per school inside it, the way
  plainaid built them inside `financialAidReports.ts`. **106 worklist units** today (98
  hook-flagged, 8 at grade 10–12 only), of which 105 are prose to rewrite and 1 is a department
  name that must not change (Decisions). Plus **27 extra units** (Context: "Extra units").
- **Precedent.** This is the eighth per-area follow-up, after plaincollege (#467),
  plainadmissions (#469), plainaid (#471), plainarts (#476), plainclubs (#479), plainsmall
  (#481) and plainsports (#484). **plainsports is the model**, with plainsmall and plainaid
  (the accessor-mode precedent) behind it: the same bar, the same review file and guards
  (`scripts/plain_review.mjs`), the same independent subagent review per batch, and the same
  two-phase English-then-translation process. Every earlier plan's Style rulings carry over as
  precedent.

It worked when:

- **Hook:** `node scripts/check_plain_language.mjs --file src/data/courseOfferings.ts` reports
  **0 issues** (today **143 issues** on 95 distinct texts: the hook reports each distinct text
  once, so identical Catholic descriptions count once; the department name is one of them).
- **Grade bar.** Every rendered ≥30-word Course Offerings unit this plan changes is at grade
  ≤10, or appears in "Residual units above grade 10" with its reason.
- **`npm run check:plain`:** course-offerings **Flagged 0** (today 95) and **Jargon 0** (today
  37); every other area unchanged.
- **Course identity is untouched.** No `title` (except the 4 truncated Catholic titles,
  restored to the guide's full wording), `tag`, `departments[].name`, `divisions[].title`,
  `divisions[].grades`, `guideYear`, `source` or `sourceUrl` changes (guard (q), Step 1).
  `npm run check:matrices` passes with the same language and department matches as `main`.
- **Nothing a parent compares has changed** in the rewritten prose ("Content that must
  survive"): no course, book, curriculum, program, person or school name added or removed; no
  prerequisite, grade eligibility, credit, duration, exam, AP/Honors/Advanced/college-level,
  audition/application or required/elective marker lost or gained; no figure re-typed. The
  guards prove the mechanical part; the reviewer and the user check the rest.
- **One sentence per description** (guard (r)); list-shaped descriptions use a ` · ` run.
- **"Rigorous" is gone** from every rewritten unit except inside a quote of the school's own
  words.
- **Charlotte Catholic is fixed against its own guide**: the 17 descriptions that belong to
  another course, the 2 pairs of different courses sharing one description, the 24 descriptions
  cut off with "…" and the 4 truncated titles (Context: "Charlotte Catholic").
- **Bookkeeping and comparisons.** The sweep (Context) finds no rendered unit, and the one
  Course Offerings comparison `nocompare` lists is gone.
- **Approvals.** The user has approved the English of all four batches, and an independent
  subagent has checked every before/after pair.
- **Translations.** All nine prose locales carry fresh translations of every changed unit, and
  every overlay check is green.

**Two-phase.** Course Offerings prose renders to parents, so Phase 1 is English only and stops
for review, and Phase 2 translates. Phase 1 is split into **four batches with a review stop
after each**, sized for a ~20-minute review ("Batch plan").

## Context

### The worklist (measured 2026-11-11 at `df4dd5c9`)

Generated with `node scripts/plain_review.mjs --topic course-offerings --worklist <scratch>`:
the hook-flagged units, plus the ≥30-word units at grade 10–12. Course Offerings has no `flags`
arrays and no `kind: 'verify'` field.

| School | Units | Hook-flagged | Grade 10–12 only | Long (>30-word sentence) | Grade >12 | Jargon | Before-words | Max grade | Hook issues |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| providence-day | 6 | 6 | 0 | 0 | 0 | 6 | 93 | — | 6 |
| charlotte-latin | 1 | 1 | 0 | 0 | 0 | 1 | 15 | — | 1 |
| charlotte-country-day | 2 | 2 | 0 | 0 | 0 | 2 | 28 | — | 2 |
| cannon | 7 | 7 | 0 | 0 | 0 | 8 | 108 | — | 8 |
| davidson-day | 5 | 5 | 0 | 0 | 0 | 6 | 87 | — | 6 |
| charlotte-christian | 5 | 5 | 0 | 1 | 0 | 4 | 99 | 11.9 | 5 |
| covenant-day | 19 | 17 | 2 | 8 | 16 | 1 | 595 | 24.7 | 25 |
| carmel-christian | 3 | 3 | 0 | 2 | 2 | 1 | 90 | 19.8 | 5 |
| hickory-grove-christian | 3 | 3 | 0 | 2 | 2 | 1 | 79 | 17.2 | 5 |
| trinity-episcopal | 2 | 1 | 1 | 1 | 1 | 0 | 85 | 17.2 | 2 |
| charlotte-catholic | 53 | 48 | 5 | 33 | 39 | 10 | 1,707 | 22.0 | 82 |
| gaston-day, charlotte-prep | 0 | — | — | — | — | — | — | — | 0 |
| **Total** | **106** | **98** | **8** | **47** | **60** | **40** | **~2,990** | 24.7 | **147** |

(Grade is computed only for units of ≥30 words, so "—" means every unit is shorter. The issue
count here is per worklist row; the hook's per-file count is 143 on 95 distinct texts because
it de-duplicates by text.)

`npm run check:plain` today, course-offerings row: prose units **3,173**, Flagged **95**,
Jargon **37**, British **0**, >30-word sentence **46**, Grade >10 **68**, Grade >12 **58**.

**Worklist sites by path:** `divisions[].departments[].courses[].description` 98;
`divisions[].notPublished` 4 (Covenant ×2, Carmel, Trinity); `divisions[].teaser` 3
(Covenant `[2]`, HG `[0]`, `[1]`); `divisions[].departments[].name` 1 (Catholic
`[0].departments[1].name` "Interdisciplinary Studies", a department name: Decisions).

**Jargon on the worklist** (all from `scripts/plain_language.json` `terms`): rigor/rigorous 20,
interdisciplinary 8 (one is the department name), holistic 3, experiential 2, scaffolded 2,
differentiated instruction 1, asynchronous 1, executive functioning 1, social-emotional 1,
pedagogy 1. The list's plain word for **holistic** ("the school looks at the whole application")
is an admissions gloss and is wrong for courses; the register below gives the course meaning.

**Two shapes of unit dominate.** Most non-Catholic units are short, one-sentence descriptions
whose only problem is a jargon word. Covenant Day's JK–5 rows and a few others are long topic
lists (grade 14–25 because FK reads a list as one long sentence). Charlotte Catholic's units are
the first ~35 words of its catalog prose, multi-sentence, 24 of them cut off mid-sentence with
"…".

### How each field renders (what a rewrite may contain)

Confirmed in `src/components/CourseOfferings.tsx` and `src/pages/SchoolDetail.tsx`.

- **No Course Offerings field renders markdown.** `description` renders through
  `<Highlighted text={c.description} query={q} />` and `notPublished` as a plain `<p
  className="courses-gap">`. A `*` would ship literally. **No prose unit holds a `*` today.**
  Every batch runs with `--no-md --md-paths '^$'` (guards (o) and (l)).
- **`teaser`** renders in the collapsed division card through `localizeMoneyText(d.teaser)`
  (`SchoolDetail.tsx` ~line 1320). The type's own doc comment says **"Counts must match the data
  below"**: every course, department and AP count in a teaser stays exactly as written.
- **`description` and `notPublished` render raw** (no money formatting). Never move a `$`
  amount into them. No worklist unit holds `$`.
- **Descriptions are searched.** The per-card filter matches the query against `c.title` OR
  `c.description` (case-insensitive, `CourseOfferings.tsx` ~line 150). A book, author,
  curriculum or program name that leaves a description stops being findable. Guard (p) protects
  capitalized names.
- **`notPublished`** sits above the course list and explains the grain of what the school
  publishes. It must stay non-empty wherever it is set: `src/lib/courseMatrix.ts` reads its
  presence to add a "not named, not taught" line to every Compare cell for that division.
- **Course identity fields** (`title`, `tag`, `departments[].name`, `divisions[].title`,
  `divisions[].grades`, `guideYear`) are **classified as prose** by `scripts/i18n_fields.mjs`
  (so they translate), which means guard (f) ("non-prose leaf changed") does **not** protect
  them. Guard (q) does (Step 1).
- **RTL:** grade ranges and course levels are isolated at render for `fa`/`ar`. Nothing is typed
  into the English for this.

### What the rewritten text must survive (checks and readers of this prose)

- **The hook** runs after every Edit/Write on `src/data/courseOfferings.ts` (it is an accessor
  file: `scopeOf` returns `kind: 'accessor'`, tested in `check_plain_language.test.mjs`). It
  blocks at grade 12, sentences over 30 words, jargon and British spelling.
- **`npm run check:matrices`** (in the build; `scripts/check_compare_matrices.mjs`) builds the
  Compare course matrix from **department names and course titles** (`DEPARTMENT_ALIASES`,
  `TITLE_ALIASES`, the language patterns in `src/lib/courseMatrix.ts`) and checks every Arts
  `{ course }` cite is an exact course title. It reads no description. Department names and
  titles must stay byte-identical (the 4 Catholic title fixes are checked here: none is aliased,
  cited or a language match; "Honors Latin American Influence … in the United States" still does
  not match Latin, by the bundle rule in `courseMatrix.ts` line 15–22).
- **`npm run check:fr`** (`scripts/check_fr_identifiers.mjs`, Phase 2) requires every `FROZEN`
  identifier in an English `text` to appear in its French `t`: `AP French Language and Culture`,
  `Advanced Placement French Language`, `French III Honors`, `Advanced Placement`, `Honors`,
  `AP`, `IB`, `Upper School`, `Middle School`, `Lower School`, the school names, `Model UN`,
  `Mock Trial` and the rest. **The English rewrite keeps every FROZEN identifier its before-text
  holds, in the same form** (`Advanced Placement French Language and Culture` stays spelled
  out; it is never shortened to "AP French"), so the identifier stays searchable and check:fr
  keeps guarding it.
- **`check:spelling`** (in the build): no British form may enter. `theatre` and `theater` are
  both allowed (Catholic's "Honors Theatre: Design and Tech" is a title).
- **`check:moneytext`, `check:dates`** (in the build): no worklist unit holds money; date forms
  ("in May", "Grades 2–5") are guarded by guard (g).
- **`check:schema`** reads card keys, not prose. The new source-material file (Step 2a, Batch 3)
  adds a document to the manifest; `npm run schema` is re-run only if `check:schema` drifts.
- **`check:live`** fails during Phase 1, by design (below).

### Content that must survive every rewrite

This is the list Step 3 applies and the reviewer checks against.

1. **Course identity, byte-identical** (guard (q)): every title (including codes and levels:
   Honors, AP, Advanced Placement, Post-AP, Advanced, CP, SASP, IB, "French III Honors",
   "Latin III", "English 6"), every tag, every department name, every division title and grade
   band ("TK – Grade 5", "JK/JrK", "GRADES 9 – 12", "Age 2 – Grade 4"), `guideYear`, `source`.
2. **Facts inside a description, in the form written:** prerequisites ("requires 90 in Algebra
   I", "after Physics I"), grade eligibility ("for seniors", "Grades 2–5", "4th grade learns
   recorder"), credits, duration (semester / full year / quarterly / weekly), exam requirements
   ("all students take the … exam"), placement and selection (audition, application, teacher
   recommendation), required vs elective, and "taught only in Spanish". Digits stay digits and
   words stay words ("five Cs", "four-year", "nine-unit", "20 Spanish-speaking countries").
3. **Level markers keep their place.** AP / Honors / Advanced / Post-AP / college-level /
   dual enrollment / "equivalent to an introductory college-level course" / "a semester of
   college calculus" stay attached to the right course. A rewrite never adds a level word the
   before-text lacked ("an honors course" on a course whose description never said so), and
   never makes a course sound easier or harder than its catalog says.
4. **Names exactly as printed:** books and authors (A Long Way Gone, Much Ado About Nothing,
   Predictably Irrational), curricula and methods (Singapore Math, Orton-Gillingham, Science of
   Reading, Accelerated Reader, Analytical Grammar, Summit Ministries, Jesse Tree, National
   World Language Standards, Anthologia), named programs (TK Goes Global, CREATE Junior,
   Options Program, SASP, Signature Learning Experience), Bible books and figures, people, and
   every school name. **Never add or remove a name** (guard (p)).
5. **Full lists stay full and in order.** A topic list is never trimmed to a sample, and a
   sample ("such as", "including", "e.g.") never becomes a full list.
6. **The school's voice stays the school's.** A school claim ("the school’s profile describes
   as …") keeps its attribution; a description built from department-level framing (Latin) is
   never presented as per-course catalog copy.
7. **Published vs not published vs does not exist** (plainsmall item 5): "publishes per-grade
   subject areas … rather than a full course catalog" is a not-published claim and stays one.
   "No … catalog exists" is a does-not-exist claim the evidence does not support and is fixed
   to "publishes no …" (Batches 1 and 2 fixes commits).
8. **Quoted spans stay byte-identical** (guard (d)): e.g. Carmel `"Math"`, Prep's quoted school
   lines. Rewrite around them.
9. **This school only.** No rewrite adds a comparison with another school (user ruling,
   2026-11-11, plainsports Batch 1; plan `nocompare`). Implicit comparisons that name no school
   and no site set ("an unusually broad elective slate", "which is normal for K–5") stay.

### Near-repeats (text shared across units)

Measured with an identical-text scan and a 7-word shingle scan over every rendered Course
Offerings prose unit (scratch script, not committed). **No text is shared across schools**
except two `notPublished` patterns. Every other repeat is inside Charlotte Catholic, where
parallel courses share the school's own boilerplate. Each template is rewritten **once and used
identically at every site** (only the language or subject word changes), including off-worklist
sites, which go into `worklist-extra-batch<N>.json`.

| Id | Template (today) | Sites | Batch | Default rewrite (measure before use) |
|---|---|---|---|---|
| **N1** | "<School> publishes <X> … rather than as named, individually-described courses. The rows below are those <Z> as the school states them." | `notPublished`: Trinity `divisions[0]` (W), Gaston Day `divisions[0]` (+) | 2 | "<School> publishes <X> as <Y>, not as separate courses with their own descriptions. The rows below are those <Z>, as the school states them." Trinity's third sentence is a fixes-commit edit (below) |
| **N2** | "Covenant Day publishes per-grade subject areas and competencies for <grades 6–8 / JK–5> rather than a <full course catalog / named-course catalog>. The <honors tracks and electives / Specials> below are the school’s own named courses; the <remaining rows …>." | Covenant `divisions[1]`, `divisions[2]` `notPublished` (both W) | 2 | Split the second sentence at the semicolon. "…the per-grade rows condense that grade’s published competency description" → "each grade’s row is a short summary of what the school publishes for that grade" (and the `[1]` form to match). Keep "per-grade subject areas and competencies" and "rather than" (the not-published claim) in both |
| **C1** | "This rigorous course is designed for students who possess a strong work ethic and (the) ability to think critically and includes the in depth study of …" | Catholic Honors Geometry `[2].courses[4]`, Honors Algebra II `[2].courses[7]`, Honors Pre-Calculus `[2].courses[12]` (W); Honors Chemistry `[6].courses[4]`, Honors Anatomy and Physiology `[6].courses[8]` (W, fixes commit) | 3 | Lead: "An in-depth course for students with a strong work ethic and critical-thinking skills, covering …" then the course's own topic list (` · ` run if 4+ items run past 30 words). PACE stays ("in-depth", "work ethic"); no "honors" is added (LEVEL) |
| **C2** | "This course is an advanced course designed to develop in the students a greater understanding and comprehension of the <French/Spanish> language, by continuing the development and application of the language on reading, writing, listening and…" | Catholic Advanced French III `[10].courses[3]`, Advanced Spanish III `[10].courses[22]` (W) | 4 | One sentence from the guide's own entry: "Builds French reading, writing, listening and speaking, with a strong focus on grammar and speaking in class." (Spanish identical but for the language). "advanced" stays (ADVANCED) |
| **C3** | "This course is designed to prepare the student for Honors <X> IV or AP <X> Language and Culture, developing … more complex reading, writing, listening and speaking." | Catholic Honors French III `[10].courses[4]`, Honors German III `[10].courses[9]`, Honors Spanish III `[10].courses[24]` (W) | 4 | "Prepares students for Honors <X> IV or AP <X> Language and Culture at a fast pace, with more complex reading, writing, listening and speaking." The guide's own entries say "Students work at a rapid pace" (French; check German and Spanish in section C before using "fast pace"). **French III's "Honors Spanish IV" is the guide's own error** (Unit notes) |
| **C4** | "The Advanced Placement <X> Language and Culture course is equivalent to an introductory college-level course and is designed to advance students’ communicative proficiency in <X> within a culturally rich and content-based framework." | Catholic AP French V `[10].courses[6]`, AP German V `[10].courses[11]`, AP Spanish V `[10].courses[26]` (W) | 4 | "The Advanced Placement <X> Language and Culture course is equivalent to an introductory college-level course and builds students’ ability to communicate in <X> through cultural content." Keeps the FROZEN "Advanced Placement French Language" identifier and COLLEGE |
| **C5** | "This course is designed to educate students on the proper techniques of weightlifting, how to target specific muscle groups and … a lifting schedule specifically to the needs of the <male/female> population." | Catholic Men’s `[5].courses[3]`, Women’s Weightlifting `[5].courses[4]` (W) | 3 | "Teaches safe weightlifting technique, how to work specific muscle groups and how to plan a lifting schedule for <male/female> students." |
| **C6** | "This course includes the study of World Literature through novels, short stories(,) drama, and poetry; grammar … introduction to…" | Catholic English 10 `[0].courses[4]`, Advanced English 10 `[0].courses[5]` (W; the only difference is the guide's own missing comma) | 3 | Identical rewrite at both sites, completed from section C. The missing comma is not carried |
| **C7** | "This course includes (a brief) review of operations with integers, fractions, and decimals; solving equations …" | Catholic Algebra I `[2].courses[0]`, Advanced Algebra I `[2].courses[1]` (W) | 3 | Identical rewrite except "a review" vs "a brief review", which the guide distinguishes |

**Inside Catholic, three pairs of different courses share one identical description today.**
Each is a defect, not a template, and is fixed in the Batch 3 fixes commit (below): Honors
Chemistry / Honors Anatomy and Physiology (both hold only the school's shared opening sentence,
which says nothing about either course), AP Physics 1 / AP Physics C (Physics 1 holds Physics C's
text) and Latin II / Advanced Latin II (the guide's Advanced entry adds a faster pace and harder
material, which the cut text lost). After the fixes they are no longer identical, so guard (j)
does not fire in the wording pass.

### Research bookkeeping and comparisons (the sweep, measured 2026-11-11 at `df4dd5c9`)

CLAUDE.md "Research bookkeeping is dev-only" applies. Course Offerings has **no `flags` field
and no `toVerify`**, so every hit is rewritten in place (plainsports precedent): the
parent-facing point stays, the research verb goes.

`/implement` reruns this sweep over every rendered Course Offerings prose unit at each batch's
Step 2a. It is plainsports' `BOOKKEEPING_RE` plus `\bverbatim\b`, `\bexists?\b`,
`\bcondense[ds]?\b`, `\brows? (?:below|carry|here)\b`, `\bsite-wide\b`, `\bmarketing prose\b`,
and the nocompare comparison pattern (`on this site|in this app|in this comparison|on this
roster|no other school|schools? here|peers here`).

| Batch | Unit | W/+ | Today (the problem part) | Treatment |
|---|---|:-:|---|---|
| 1 | Latin `divisions[2].notPublished` | + | "Titles here are verbatim; descriptions are drawn from the school’s department-level framing." | Keep the point (descriptions are not per-course school copy): "The course titles are the school’s own; each description comes from how the school describes that department." |
| 1 | DD `divisions[1].notPublished` | + | "No Middle School course catalog or curriculum guide **exists**. … everything else on the Middle School page is **marketing prose**." | **Fixes commit.** "Davidson Day publishes no Middle School course catalog or curriculum guide." … "the rest of the Middle School page describes the program in general terms." |
| 2 | Trinity `divisions[0].notPublished` | W | "No Lower School course catalog **exists** — the only PDF published site-wide is a philanthropy guide." | **Fixes commit.** "Trinity publishes no Lower School course catalog." The philanthropy-guide sentence is a search result with no parent use; it leaves the page (recorded in the fixes review file) |
| 2 | Covenant `divisions[0].teaser` | + | "a Restoration & Sustainability department **no other school here runs**" | **Fixes commit, only if plan `nocompare` has not landed** (`git log main --oneline \| grep nocompare` shows only the plan commits #482/#483 today). Use nocompare's own approved wording, row 36: "…and a Restoration & Sustainability department, which is rare." Record it in `nocompare.md` Implementation notes so that plan skips row 36. If nocompare has landed, the unit is already fixed: drop it from this plan |
| 2 | Covenant `divisions[1]`, `[2]` `notPublished` | W | "the remaining rows carry …" / "the per-grade rows condense …" | Site mechanics with a parent point (the rows are summaries). Template N2 |
| 2 | Carmel `divisions[2].notPublished` | W | "the rows below carry the guide’s own per-grade descriptions" | Keep (site mechanics, true). "which is normal for K–5" is an implicit comparison and stays |
| 2 | Gaston `divisions[0].notPublished` | + | "The rows below are those strands as the school states them." | Template N1 site (no bookkeeping) |

Known false positives: "JavaScript" in HG course descriptions (a programming language); "peer"
in Catholic Options Scholars, Cannon creative writing and HG Middle School units (students'
peers); Davidson Day `divisions[1].teaser` "the only Middle School courses Davidson Day
publishes" (the school's own scope); Carmel `divisions[1].teaser` "unusually broad" (implicit);
Prep's quoted "most other schools" (a quote); Catholic "Blessed Trinity" (not the school).

### Charlotte Catholic (checked 2026-11-11 against the school's 2026–27 Curriculum Guide)

Catholic's descriptions were machine-extracted from the 96-page guide in plan
`add-charlotte-catholic` and capped at ~220 characters. Planning re-downloaded the guide and
saved the full text behind every Catholic unit this plan touches to
`source-material/course-offerings/charlotte-catholic/Charlotte Catholic - Course Offerings - Full Descriptions 2026-2027.md`
(**uncommitted**; Step 2a of Batch 3 commits and ingests it). That file is the drafter's source
for every Catholic rewrite. Its "Census" section holds the evidence for the fixes below.

**The census.** Each of the 199 app courses was looked up by title among the guide's 201 course
headers. **182 descriptions match their own entry; 17 carry another entry's text:**

- **14 Options Program / Pathways Program rows** (`divisions[0].departments[3].courses[0–13]`)
  all carry the description of *Introduction to Philosophy: Human Person* (504), the next
  described entry. The guide gives the 13 Options courses **no description at all** (a header,
  grade and "Prerequisite: Enrollment in the Options Program" only, plus a section introduction).
  Pathway Program (507) has its own description.
- **AP Physics 1: Algebra-Based** (`[6].courses[13]`, W) carries AP Physics C: Mechanics.
- **Advanced Placement European History** (`[7].courses[16]`, +) carries the theology course
  *Faith and Revelation: Knowing* (013).
- **Introduction to Photography** (`[9].courses[8]`, +) carries Photography II (328).

**Duplicate pairs** (above): Honors Chemistry / Honors Anatomy and Physiology, Latin II /
Advanced Latin II.

**Truncation.** 24 Catholic descriptions end in "…" (21 on the worklist; English 11
`[0].courses[8]`, Honors English 11 `[0].courses[9]` and Honors World History `[7].courses[2]`
are not). Honors U.S. History `[7].courses[5]` (W) stops at "than college prep U.S." without an
ellipsis; the guide continues "History."

**Four titles were cut at a line wrap** (the 2026-11-05 correction in the existing Catholic
record fixed five others and missed these):

| Path | App title | The guide's full title (code) |
|---|---|---|
| `divisions[0].departments[1].courses[8].title` | Honors Latin American Influence | Honors Latin American Influence in the United States (535) |
| `divisions[0].departments[8].courses[0].title` | Faith and Revelation: Knowing | Faith and Revelation: Knowing God through Sacred Scripture (013) |
| `divisions[0].departments[8].courses[3].title` | The Mystery of Redemption and Christian | The Mystery of Redemption and Christian Discipleship (023) |
| `divisions[0].departments[9].courses[26].title` | Behind the Scenes: Set Design, Construction, | Behind the Scenes: Set Design, Construction, Lighting, Sound and Costuming (309) |

(The guide prints each title's second line under the first; the existing Catholic record lists
the cut forms. None of the four is in `TITLE_ALIASES`, cited by an Arts card, or a language
match. The Arts card's own ensemble list names "Behind the Scenes: Set Design and Construction"
in `artsPrograms/charlotte-catholic.ts`; that is a separate field and stays.) Restoring the published title is the "titles are
transcribed verbatim" rule applied, not a rewrite: these are the one exception to guard (q),
and they are approved at the Batch 3 review (Approvals).

### Phase 1 builds fail at `check:live`, by design

Every changed unit gets a new FNV-1a stamp. The nine shipped `course-offerings` overlays hold
the old stamps, so `npm run build` stops at `check:live` (it walks this topic through
`ACCESSORS`; plainaid precedent). The steps below run `npx tsc -b && npx vite build` and the
build's later checks by hand. Phase 2 makes the full build green.

### Phase 2 machinery (existing, unchanged)

- **Prose overlays.** One topic, `course-offerings`: work files
  `src/data/overlays/work/course-offerings.<lang>.json`, built overlays
  `src/data/overlays/course-offerings.<lang>.json` (both exist for all nine locales). Then
  `node scripts/i18n_splice_work.mjs --lang <code> --topic course-offerings` (*kept / added /
  dropped*), `node scripts/i18n_build_overlay.mjs --topic course-offerings --lang <code>`,
  `python3 scripts/check_figures.py --topic course-offerings --lang <code>`.
- **Work-file entries are per distinct text, with an `at` list of every site.** The Human Person
  description today is **one** entry whose `at` holds 15 paths (the real Philosophy course plus
  the 14 Options rows). After the fixes it keeps 1 path, and the Options rows become several new
  entries. So *added* and *dropped* are counted in stamps, not sites, and will not equal the site
  count (Phase 2 Step 2).
- **Locales.** `PROSE_TRANSLATED` in `src/lib/i18n.ts` = es, bn, ht, te, fr, fa, it, hi, ar.
  Mechanism: `.claude/docs/prose-translation-architecture.md`. Precedent: the plainsports Phase 2
  implementation note (revise-the-predecessor pipeline, three agents, scratch gate).
  Course-offerings terminology: `src/data/overlays/NOTES.md` "Stage 6 — Course Offerings"
  (course-title policy; Honors kept English; prerequisite thresholds are figures; reading-list
  titles) and "The governing finding — department names and course titles are separate
  classes".
- **One chrome change, at the user's request (2026-11-11).** The filter's hardcoded English
  no-match message becomes two `courses.*` keys (Step 1b, Phase 2 Step 0). No other
  `src/locales/*.json` key changes.

## Decisions

- **plainsports' Decisions carry over unless this section overrides them**, and through it
  every earlier plan's: keep-and-explain over `plain-ok`; quoted spans untouchable; one string
  per path, no structural change; words outside the jargon list fixed only inside changed units;
  American spelling; a fresh `general-purpose` reviewer per batch; the gloss rules; templates
  rewritten identically at every site, off-worklist sites included; fact problems found in scope
  fixed in their own commit before the wording pass; "this app" / "on this roster" never added.
- **Four batches, by school, each with a review stop** ("Batch plan"). Sizing uses
  before-words: earlier reviews ran 1,000–1,500 in 20 minutes. Batch 1 is small on purpose: it
  also lands the tooling and sets the jargon register every later batch copies.
- **One branch, one PR, opened only after Phase 2.** Each batch is its own commit, plus a fixes
  commit in Batches 1, 2 and 3, on `feat/plaincourses`.
- **One sentence per description** (the user's brief: "designed as one sentence each. Keep each
  one short rather than splitting it into several sentences"). Guard (r) fails a description
  that ends with more sentences than it began with. Catholic's multi-sentence catalog excerpts
  become one sentence. Teasers and `notPublished` notes are not descriptions and may split.
- **A list-shaped description becomes a ` · ` run** when it cannot fit in one ≤30-word sentence:
  the items in their order, none dropped, each item's words unchanged where possible, after an
  optional short lead ("Topics:" is not needed; the course title is the lead). The hook's
  `sentences()` splits on ` · ` (plainadmissions), so each item is measured on its own. Covenant
  Day's JK–5 rows, Carmel's literacy block and Charlotte Christian's JK–Gr 3 Bible row are the
  main cases. This is the plainsports `·` rule (4+ parallel items) applied to descriptions;
  three items take commas.
- **"Rigorous" is replaced by what makes the course hard**, in this order: (1) the demand the
  unit itself already states (faster pace, more depth, proofs, more math, college-level
  material, a required exam); (2) the demand the school's own catalog entry states (for
  Catholic, section C of the new source file; for every other school, its record in
  `source-material/course-offerings/<school>/`); (3) when neither names one, the jargon list's
  own plain word "demanding". The school's word survives only inside a quote of the school's
  words, and only where the claim is the point (Latin's profile comparison, Unit notes). A
  rewrite never adds a prerequisite, grade minimum or figure to explain the difficulty: that is a
  new fact (guard (b)).
- **Course-vocabulary register** (keep, explain or replace, inside changed units):

  | Term | Treatment |
  |---|---|
  | AP, Advanced Placement, Honors, Advanced, Post-AP, CP, IB, dual enrollment, college-level, prerequisite, elective, semester, credit, AP exam | **Keep** (the card's own vocabulary and tags; parents meet them on every transcript) |
  | rigor / rigorous | the order above |
  | interdisciplinary | "combining subjects" / "drawing on <the subjects it names>" |
  | holistic | "whole-person" (wellness, health) / "all-around" (language proficiency). Never the list's admissions gloss |
  | experiential | "hands-on" (drop it where "hands-on" already stands beside it) |
  | scaffolded | "built up step by step" / "with step-by-step support" |
  | differentiated instruction | "teaching adjusted to each student’s level" |
  | asynchronous | "taken on the student’s own schedule" |
  | executive functioning | "planning and focus skills" |
  | social-emotional wellness | "emotional and social well-being" (the list's pattern matches "social-emotional" and "social emotional") |
  | pedagogy | "teaching" |
  | advanced-low (ACTFL) | **Keep and explain:** "the advanced-low level (a standard language-proficiency level)" |
  | in depth / in-depth, subitizing, morphology, intertestamental, stoichiometric, kinesiology | subject terms the course teaches: **keep** |
  | "This course is designed to…", "Students will…", "The purpose of this course is…" | catalog boilerplate: drop it and lead with the verb ("Teaches …", "Covers …", "Prepares …") |

- **The department name "Interdisciplinary Studies"** (Catholic `divisions[0].departments[1].name`)
  is the school's own department name, a Compare matrix key (`DEPARTMENT_ALIASES`) and a tab
  label. It stays. It gets `// plain-ok: interdisciplinary` on its line in Batch 3 and a row in
  the "plain-ok register". This is the plan's one `plain-ok`.
- **Charlotte Catholic is fixed against its own guide, in its own commit** (Batch 3 Step 2a),
  before the wording pass, so the wording-pass guards compare against corrected text:
  - the **17 census rows**: each gets one sentence condensed from its **own** guide entry. The 13
    Options courses have no description in the guide, so theirs say what the guide does give
    (grade and prerequisite) and, for the English and math courses, the section introduction's
    "Specialized English and Mathematics courses focus on developing essential life skills":
    - Options English 9–12: "A life-skills English course for grade <N> students in the Options
      Program."
    - Math Life 1 / 2: "A life-skills math course for grade <9 / 10> students in the Options
      Program."
    - Options Year 1–4, Options PE, Options Personal Finance, Options Financial Management:
      "For grade <N> students in the Options Program; the school’s guide gives no other
      description." (PE: "grades 9–12".)
    - Pathway Program, AP Physics 1, AP European History, Introduction to Photography: one
      sentence each from section C (Unit notes).
  - the **2 duplicate pairs**: Honors Chemistry and Honors Anatomy and Physiology get template C1
    with their own topic lists; Advanced Latin II gets its own guide clause (faster pace, harder
    material); Latin II is unchanged in this commit;
  - the **4 truncated titles**, restored to the guide's full wording.
  These are the only fact fixes in Batch 3. A **new** problem found while drafting is fixed the
  same way, with evidence recorded in that batch's fixes review file; when the right fix is
  unclear, report it at the batch review instead.
- **Truncated descriptions ("…")** are completed in the wording pass, in one sentence, using only
  words from the course's own guide entry. When completing the clause would push the sentence
  past 30 words or add a figure or name, the cut fragment is dropped instead and the sentence
  ends on the last complete item. The review file's notes column says which.
- **Every worklist description is checked against its course** before it is rewritten: the
  drafter confirms the description is about that title, using the school's
  `source-material/course-offerings/<school>/` record. A mismatch outside Catholic goes into that
  batch's fixes commit, with evidence. (Only Catholic was censused; the others were hand-written.)
- **`plain_review.mjs` gains `--courses-markers`, guard (q) and guard (r)** (Step 1), opt-in and
  calibrated, as each earlier plan's marker set was.

## Batch plan (Phase 1)

| Batch | Schools | Units (W + extra) | Before-words | Why this grouping |
|---|---|--:|--:|---|
| **1 — calibration** | **Step 1 tooling** + **fixes commit** (DD `notPublished`) + **Providence Day** (6) + **Charlotte Latin** (1 + 1) + **Charlotte Country Day** (2) + **Cannon** (7) + **Davidson Day** (5 + 1) | **23** | ~390 | Short, one-sentence descriptions whose only problem is jargon: 9 of the 13 "rigorous" units outside Catholic, plus interdisciplinary, holistic, experiential, scaffolded, asynchronous, differentiated, pedagogy, executive functioning, social-emotional. The register is set here on the richest schools, and the new classes are calibrated on the cleanest rewrites. |
| **2** | **fixes commit** (Trinity `notPublished`; Covenant teaser if nocompare has not landed) + **Charlotte Christian** (5) + **Covenant Day** (19 + 1) + **Carmel Christian** (3) + **Hickory Grove** (3) + **Trinity Episcopal** (2) + **Gaston Day** (0 + 1) | **34** | ~1,010 | The list-shaped descriptions (Covenant JK–5, Carmel literacy, Christian Bible) where the ` · ` rule is set, and every `notPublished` note (templates N1, N2) and the two HG teasers. |
| **3** | **Catholic source + fixes commit** (17 census rows, 2 duplicate pairs, 4 titles) + **Charlotte Catholic, departments 0–6** (English, Interdisciplinary, Math, Options, Philosophy, PE, Science: 24 W + 2 truncated extras; the department name gets its `plain-ok`) | **26 + 24 fix leaves** (20 descriptions, 4 titles; 4 of the descriptions are also on the worklist) | ~800 + fixes | The fixes land first so the wording pass works on the right text. The fixes commit is Catholic-wide (it also touches AP European History, Introduction to Photography, Advanced Latin II and three titles in departments 7–10). Templates C1, C5, C6, C7. |
| **4** | **Charlotte Catholic, departments 7–10** (Social Studies, Theology, Visual and Performing Arts, World Languages: 28 W + Honors World History) | **29** | ~980 | The language templates C2–C4, the theology units, the dance/music units. |

**Units changed in Phase 1:** 105 worklist prose units + 23 extra prose units (Latin, DD,
Gaston, Covenant teaser, 16 Catholic census rows off the worklist, 3 Catholic truncations) + 4
Catholic titles = **132 sites** (131 if nocompare lands first). Phase 2 runs **once**, after
Batch 4 is approved.

**Batch arguments** (Steps 2 and 4). Every call adds
`--topic course-offerings --no-md --md-paths '^$' --courses-markers`, plus:

- Batch 1: `--slugs providence-day,charlotte-latin,charlotte-country-day,cannon,davidson-day --paths '(?:description|teaser|notPublished)$'`
- Batch 2: `--slugs charlotte-christian,covenant-day,carmel-christian,hickory-grove-christian,trinity-episcopal,gaston-day --paths '(?:description|teaser|notPublished)$'`
- Batch 3: `--slugs charlotte-catholic --paths '^divisions\[0\]\.departments\[[0-6]\]\.courses\[\d+\]\.description$'`
- Batch 4: `--slugs charlotte-catholic --paths '^divisions\[0\]\.departments\[(?:[7-9]|10)\]\.courses\[\d+\]\.description$'`

(`--paths` keeps the department name off every worklist. Guards (a), (f), (j), (k) and (q)
still run over the whole file. The four titles change only in the Batch 3 fixes commit, so the
wording-pass runs, based on that commit or later, see no title change; the fixes review run is
the one that passes `--allow-titles`.)

**Progress tracking across windows.** Each batch is built in its own window. After each batch,
`/implement` fills that batch's row in "Batch progress". The front matter stays
`status: in-progress` through Batches 1–3 and becomes `english-done` (INDEX: *English shipped*)
only after Batch 4.

### Batch progress

| Batch | Commit | Review file(s) | Reviewer findings (fixed) | User verdict |
|---|---|---|---|---|
| 1 (tooling) | — | — | — | — |
| 1 (fixes) | — | — | — | — |
| 1 | — | — | — | — |
| 2 (fixes) | — | — | — | — |
| 2 | — | — | — | — |
| 3 (source + fixes) | — | — | — | — |
| 3 | — | — | — | — |
| 4 | — | — | — | — |

### Template wordings (as built)

*Filled in by `/implement` the first time each template is rewritten. Later batches copy the
text here exactly.*

| Id | Final wording | Set in batch |
|---|---|---|
| | | |

### Unit notes (things the drafter must not get wrong)

Defaults are suggestions; measure each against the guards before use (Style rulings).

**Batch 1**
- PD `divisions[1].departments[4].courses[7]` ("Interdisciplinary innovation work through
  entrepreneurial sprints."): "Innovation projects that combine subjects, run as short
  entrepreneurial sprints."
- PD `[2].departments[0].courses[13]` (an AP course): keep "AP", every subject in order, and
  "African American experience".
- PD `[2].departments[2].courses[3]`: "rigorous treatment and in-depth development of … proofs"
  → "builds direct and indirect proofs in depth across …" (PACE kept by "in depth").
- PD `[2].departments[3].courses[1]`: "Moves faster than Physics I and uses more math, adding
  circular motion and waves." Keep "Physics I" (the prerequisite course).
- PD `[2].departments[5].courses[3]`: experiential → "hands-on"; keep "social value" and
  "customer and marketplace feedback".
- PD `[2].departments[6].courses[6]`: keep "AP Spanish Language Exam" byte-identical (FROZEN
  "AP" and the exam); "holistic proficiency approach" → "an approach that builds all-around
  language skills"; "Spanish-only classroom conversation" keeps ONLY ("only").
- Latin `[2].departments[1].courses[7]`: a school claim. "An honors course that the school’s
  profile calls as demanding as AP U.S. History." Keep "the school’s profile" and "AP U.S.
  History".
- Latin `divisions[2].notPublished` (+): bookkeeping table.
- CCD `[0].departments[0].courses[2]`: "toward rigorous problem solving" → "building toward
  harder problem solving".
- CCD `[1].departments[2].courses[4]`: "Scaffolded across the Middle School" → "Built up step
  by step across the Middle School" (keep "Middle School", FROZEN).
- Cannon `[0].departments[0].courses[0]`: keep the four strands in order.
- Cannon `[2].departments[1].courses[2]`: "at greater rigor and depth than Honors Geometry" → "in
  more depth and at a harder level than Honors Geometry" (keeps the comparison with the
  school's own Honors Geometry; that is within-school).
- Cannon `[2].departments[1].courses[12]`: keep "a semester of college calculus" (COLLEGE).
- Cannon `[2].departments[2].courses[16]`: "An asynchronous fully online course" → "A fully
  online course, taken on the student’s own schedule, …".
- Cannon `[2].departments[4].courses[5]` (AP Spanish Language and Culture: Advanced): keep
  "taught exclusively in Spanish" in ONLY ("taught only in Spanish") and explain advanced-low.
- Cannon `[2].departments[7].courses[0]`: "holistic wellness" → "whole-person wellness"; keep
  kinesiology, exercise physiology, biomechanics.
- DD `[0].departments[0].courses[0]`: keep the three program names and age bands
  ("Early Preschool (2s/3s)" …) byte-identical; executive functioning and social-emotional per the
  register.
- DD `[2].departments[0].courses[3]`: keep the three book titles and "English II".
- DD `[2].departments[8].courses[4]`: "monthly pedagogy seminars" → "monthly seminars on
  teaching"; "Upper School" and "middle-school" stay.

**Batch 2**
- Christian `[0].departments[0].courses[0]` (JK–Gr 3 Bible): ` · ` run, one item per grade:
  "JK: Heroes of the Faith, God’s Love for All and the Truth of God’s Word · K: a Survey of the
  Bible · Gr 1: Creation through the Promised Land · Gr 2: The Gospels · Gr 3: Israel". Every
  capitalized title stays.
- Christian `[2].departments[2].courses[2]`: "at a more rigorous and faster pace" → "at a faster
  pace" plus "more formal, proof-centered" (PACE kept).
- Covenant JK–5 rows (`divisions[2].departments[0–7]`): ` · ` runs of the existing strands in
  order. Keep every figure ("to 20", "to 1,000", "0–12", "10,000,000", "2- and 3-digit"), every
  Bible name and "4th grade learns recorder and 5th grade band instruments".
- Covenant `[1].departments[2].courses[1]` ("Rigorous literary analysis …"): what makes it hard
  is in the unit itself (analytical essays, formal responses): "In-depth literary analysis …".
- Covenant `divisions[2].teaser` (30 words, grade 13.4): keep every count ("Five to six", "seven
  grades", "six named Specials") and the three examples; may split into two sentences.
- HG `divisions[0].teaser`, `[1].teaser`: keep "112 courses across 12 departments", "17 Advanced
  Placement", "the full AP Capstone track", "CP and Honors levels", "41 courses across 9
  departments", "Algebra 1 for qualifying 8th-grade honors students", "a 5K running course"; may
  split.
- HG `[0].departments[2].courses[4]`: "at a rigorous pace" → "at a fast pace"; keep
  "Precalculus and Calculus".
- Carmel `[2].departments[0].courses[2]`: ` · ` run of the strands; keep Science of Reading,
  Orton-Gillingham, "Accelerated Reader from Grade 1", "Analytical Grammar by Grade 5".
- Carmel `[2].departments[1].courses[3]`: keep "as a form of worship" and the three instruments.
- Trinity `[0].departments[1].courses[0]` (39 words): keep "five Cs", "National World Language
  Standards", "20 Spanish-speaking countries", "grades 4-5" (hyphen as written), "Anthologia".
  It may be one sentence of ≤30 words plus nothing else: move "heritage speakers in grades 4-5
  …" into a second clause only if it fits; otherwise, as a description, it is the one place a
  second sentence is allowed by the user at review. **Default:** "All students take Spanish as
  an enrichment class built on the five Cs of the National World Language Standards and the
  culture of 20 Spanish-speaking countries; heritage speakers in grades 4-5 use the Anthologia
  program at school and at home." (two clauses, one sentence; measure: if over 30 words, show
  both options at the review).

**Batch 3 (Catholic, departments 0–6)** — draft from section C of the new source file.
- AP Calculus BC `[2].courses[16]`: keep "roughly equivalent to both first and second semester
  college calculus courses" (ESTIMATE "roughly", COLLEGE) and "Calculus AB".
- Honors Civil and Construction Engineering `[1].courses[18]`: keep "college level courses in
  these fields" (COLLEGE).
- Assistants `[1].courses[2]`: keep how they are evaluated ("willingness to learn, initiative
  and performance of assigned tasks").
- Options Scholars `[1].courses[4]`: "peer mentors for those enrolled in the Options Program";
  keep "intellectual and developmental disabilities".
- Logic `[4].courses[2]`: "Logic is the art of habitually reasoning from true premises to true
  conclusions" is the school's definition; keep it as the school's ("The school defines logic
  as …") or drop it for the course's purpose. Do not restate it as our own claim.
- Pathway Program (fixes): "A two-year extension of the Options Program that builds life skills,
  job readiness and independence through classes, job training, internships and community
  experiences."
- AP Physics 1 (fixes): "An algebra-based, introductory college-level physics course; every
  student takes the AP Physics 1: Algebra-Based exam." (Keep the exam; never end on "May".)
- AP European History (fixes, department 7, landed in this batch's fixes commit): "Covers key
  events, figures and developments in Europe from 1450 to the present, with practice analyzing
  sources and building arguments; every student takes the AP European History exam."
- Introduction to Photography (fixes, department 9): "An introduction to photographic
  composition and the controls of a digital SLR camera, with a focus on available light."

**Batch 4 (Catholic, departments 7–10)**
- Honors U.S. History `[7].courses[5]`: complete "college prep U.S. History" (the guide's words);
  "with more rigor" → what the guide says makes it harder ("more independent reading, source
  analysis and historical writing").
- Honors Politics `[7].courses[10]`: "greater depth, pace, and academic rigor" → "greater depth
  and a faster pace, with more reading and writing" (guide).
- Theology `[8].courses[3–10]`: keep every capitalized theological term exactly (Original Sin,
  Death, Resurrection, Ascension, Sacrament of Communion, Sacrament of Salvation, Divine
  Revelation, Sacred Tradition, Sacred Scripture, Fathers of the Church, Baptism). These are
  the school's own capitalizations; guard (p) protects them. `[8].courses[4]` is a statement of
  belief, not a course description: lead with what the course covers ("Studies the Church as …").
- Dance I–III `[9].courses[30–32]`: keep "incoming freshmen", "little or no formal dance
  instruction", "Dance I freshman year", "honors level", "two staged recitals are required".
- Concert Band `[9].courses[33]`: keep "through an audition" (AUDITION) and every expectation.
- Honors French III `[10].courses[4]`: **the guide itself says "Honors Spanish IV"**. The guide's
  own Honors French IV entry lists "Honors French III" as its prerequisite, so the French path is
  clear. **Default:** "Prepares students for Honors French IV or AP French Language and Culture
  …", recorded in the Batch 4 review file as a fact fix with that evidence (it lands in a Batch 4
  fixes commit of its own). The user may prefer to keep the school's text as printed.
- AP French / German / Spanish V: template C4. AP Spanish VI `[10].courses[27]` (off-worklist)
  is not a C4 site (its text differs); leave it.
- Advanced Latin III `[10].courses[15]`: keep "adapted and authentic Latin literature".

### Style rulings

**Carried over from all seven earlier per-area plans.** The full text is in
[`plainsports.md`](plainsports.md) "Style rulings" (which summarizes plainsmall, plainclubs and
plainarts, whose own sections hold the rest). The drafter reads plainsports' and plainsmall's
before Batch 1, and the reviewer gets both. The reviewer's recurring findings across all seven
plans are the checklist: strengthened claims; wrong referents after a split; dropped narrowing
words; a gloss that changed a term's meaning; not-published turned into does-not-exist; a school
statement turned into our own claim; a full list turned into a sample; a cross-school claim; a
bare pronoun after a split.

**From this plan** (set at planning; overrulable at the Batch 1 review):
- One sentence per description; ` · ` runs for list-shaped descriptions (Decisions).
- The "rigorous" order and the course-vocabulary register (Decisions).
- Catalog boilerplate ("This course is designed to…", "Students will…") is dropped; the
  description leads with its verb.
- A difficulty comparison with the school's own lower level ("than Honors Geometry", "than
  Physics I", "than college prep U.S. History") is within-school and stays.

*Rulings from later batches are added here by `/implement`.* If a resume command arrives with
the `<, with these rulings: …>` placeholder unfilled, read it as "approved, no rulings", as
every earlier plan did, and record that batch's choices here as precedent.

### plain-ok register

*Every `// plain-ok` marker or `plain_language.json` `allow` entry added, with path, term and
reason.*

| Path | Term | Reason |
|---|---|---|
| `charlotte-catholic:divisions[0].departments[1].name` | interdisciplinary | The school's own department name "Interdisciplinary Studies"; a tab label and a `DEPARTMENT_ALIASES` key in `src/lib/courseMatrix.ts`. Added in Batch 3. |

## Approvals needed

**No UX gate.** No card, section, Compare row, metric key, topic, ordering or layout change; no
field is added or split. The one chrome change (Step 1b, the no-match message) was requested by
the user directly on 2026-11-11, which is its approval. It keeps the same element, class and
position, and changes only the wording and which of two messages shows.

The gates are the user's wording reviews: one per batch, then Phase 1 → 2. Three planning
choices can be overruled at review; each has a default that `/implement` applies if no answer
comes:

- **The Catholic fixes** (17 census rows, 2 duplicate pairs, **4 restored titles**) land in their
  own commit before Batch 3's wording pass, shown in `review-batch3-fixes.md` with the guide's
  evidence. The titles are the one exception to "titles never change"; **asked for at planning
  time** (see the closing report). Default: restore them.
- **The 13 Options Program descriptions** say what the guide gives (grade, prerequisite, life
  skills) and that it gives no other description. The alternative is leaving the wrong Philosophy
  text, which is not offered.
- **` · ` runs for list descriptions** (Covenant, Carmel, Christian), shown at the Batch 2 review.
  The alternative is a ≤30-word sentence that keeps the full list and is left above grade 10 as a
  residual.

## Source material

**Staged by `/plan`, uncommitted:**
`source-material/course-offerings/charlotte-catholic/Charlotte Catholic - Course Offerings - Full Descriptions 2026-2027.md`.
It holds the provenance (curl download of the guide's official PDF, 96 pages, SHA-256
`6db5f418…a3a5`, `pdftotext -layout`, zero-width spaces and split `i`/`l`/`j` artifacts
removed), the source URLs, the 17-row census, the 13 Options entries with the section
introduction verbatim, and the full guide description for 58 courses: every Catholic worklist
description, the 3 off-worklist truncations, and the census rows' own entries.

`/implement` commits it and runs the `ingest-source-material` skill on Batch 3's branch state
(Step 2a): `python3 .claude/skills/ingest-source-material/build_docs.py course-offerings` then
`python3 scripts/build_site_content.py`. Expected changes: `.claude/docs/course-offerings/charlotte-catholic.md`,
`src/content/course-offerings/charlotte-catholic.json`, `src/data/schools.json`. **Revert any
"Rebuilt" date-only diff** in other schools' docs, and if `schools.json` reorders, restore `HEAD`
order (memory `two-topic-ingest-reorders-manifest`). Course Offerings renders its structured
component instead of any prose (`SchoolDetail.tsx` line 1312), and `course-offerings` is not a
live topic of the content extractor (`LIVE` in `scripts/i18n_extract_content.mjs`), so the new
document renders nowhere and adds no translation work. Confirm in the browser (Step 7) that no new
card appears.

No other school needs fetched data. Every other unit uses the data file and the school's
existing `source-material/course-offerings/<school>/` record.

## Out of scope

- **Other areas** and their prose; `src/content/**` (beyond what the ingest regenerates).
- **`src/data/metricValues.ts`**, `src/lib/courseMatrix.ts`, `src/lib/metrics.ts`.
- **`src/locales/*.json`**, apart from the two no-match keys (Step 1b), and any other change to
  `CourseOfferings.tsx`.
- **`scripts/plain_language.json`** (no entry added; the `holistic` gloss problem is recorded as a
  candidate).
- **Course identity fields**, except the 4 Catholic titles: no title, tag, department, division
  title, grade band, `guideYear`, `source` or `sourceUrl` change.
- **Units not changed by this plan:** every off-worklist unit except the 27 named extras. The
  worklists plus `worklist-extra-batch<N>.json` are the contract. Catholic's other 182 matched
  descriptions are not rewritten, even where they are long, unless on the worklist.
- **A census of the other 12 schools' descriptions** against their sources (Candidates).
- **Freshness:** re-verifying course lists against live school sites. Only Catholic's guide was
  re-downloaded, and only to read descriptions already in the app.
- **Structural changes:** no new fields, no `toVerify`, no card or layout change.
- **Deploying.** Merging is pre-authorized; `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

**Batch 1 runs Steps 1, 1b and 2–8. Batches 2–4 each run Steps 2–8 for their own schools.** Before
starting Batch 2 or later, run `git checkout feat/plaincourses`, then
`git fetch && git rebase origin/main`. Do not stash (memory `never-git-stash-in-shared-tree`).
If a rebase conflicts in `courseOfferings.ts`, re-run Step 2 after resolving it.

1. **Review tooling** (Batch 1 only; part of the Batch 1 English commit).

   **(a) `--courses-markers` in `scripts/plain_review.mjs`.** Keep every existing option and
   guard, and keep default behavior byte-for-byte. Update the header comment and the usage line.
   It enables the shared ESTIMATE and BOUND, borrows CLAIM, VERIFIED, NOTFOUND, AUDITION, OPEN
   (arts), APPLICATION, ADVANCED, ONLY, FIRST (clubs) and THIRDPARTY (aid), and adds these new
   classes, case-insensitive, presence/absence per unit as today:
   - LEVEL: `\bAP\b|\bAdvanced Placement\b|\bhonors?\b|\bpost-AP\b|\bIB\b|\bcollege[- ]prep\b|\bCP\b`
   - COLLEGE: `\bcollege[- ]level\b|\bcollege (?:credit|courses?|calculus)\b|\bsemesters? of college\b|\bdual[- ]enroll\w*|\b(?:introductory|first[- ]year|first[- ]semester) college\b|\buniversity\b|\bCPCC\b`
   - PACE: `\bfaster\b|\bfast\b|\bpace\b|\baccelerated\b|\bin[- ]depth\b|\bdepth\b|\bdemanding\b|\bharder\b|\bchalleng\w*|\brigou?r\w*|\bintensive\b|\bwork ethic\b|\bworkload\b`
   - EXAM: `\bexams?\b|\bexamination\b`
   - DURATION: `\bsemesters?\b|\bfull[- ]year\b|\byear[- ]long\b|\byearlong\b|\bquarter(?:ly|s)?\b|\btrimester\b|\bweekly\b|\bmonthly\b|\bdaily\b`
   - GRADELEVEL: `\bgrades? \d|\b\d+(?:st|nd|rd|th)[- ]grade\w*|\bfreshm[ae]n\b|\bsophomores?\b|\bjuniors?\b(?! kindergarten)|\bseniors?\b|\bkindergarten\b|\b(?:JK|TK|PK)\b`
   - ELECTIVE: `\belectives?\b`
   - IMMERSION: `\btaught (?:entirely |exclusively |only )?in\b|\b\w+-only\b|\bimmersion\b|\btarget language\b`

   Replacing "rigorous" with "faster pace" stays inside PACE and passes; dropping the demand
   altogether, or adding one the before-text lacked, fails. Guard (n) (count words and `N+`) runs
   under `--courses-markers` too.

   **(b) Guard (p), names, under `--courses-markers`** (as under `--sports-markers`), with a
   courses stoplist added to `NAME_STOP` for sentence-start words of course descriptions:
   `Students Student Course Courses Class Classes Topics Content Covers Covering Uses Offers Moves
   Develops Reads Prepares Builds Explores Introduces Includes Designed Focuses Emphasis Through
   Using Learning Teaching Taught Open Required Elective Daily Weekly Monthly Builds Teaches
   Studies Continues Combines Innovation Positional Phonics Place`. Calibrate the list on the
   no-change run and the Batch 1 drafts; add a word only with a recorded reason.

   **(c) Guard (q), course identity, under `--courses-markers`.** In accessor mode, over every
   school in the module: fail when any leaf whose path ends in `.title`, `.tag`,
   `departments[N].name`, `divisions[N].grades`, `guideYear`, `.source` or `.sourceUrl` differs
   between base and working tree. A `--allow-titles <file.json>` option lists `slug:path` title
   leaves that may change (Batch 3's four), and each must change to the exact string in the file.

   **(d) Guard (r), one sentence per description, under `--courses-markers`.** For each changed
   `….description`, count sentences with `sentences()` from `check_plain_language.mjs`, but
   count a ` · ` run as one: fail when the after-count exceeds the before-count; note it in the
   row when the after-count is above 1.

   **(e) Negative tests**, one per new class plus (p), (q), (r) and (n), each isolated (memory
   `negative-test-must-isolate-the-assertion`): copy `src/data/courseOfferings.ts` to the
   scratchpad byte-for-byte; plant exactly one fault; run `--check` with the Batch 1 arguments
   plus `--slugs <that school>`; confirm exit 1 with **that class and that `slug:path`**, reading
   which message printed; restore and confirm `cmp` is clean. Faults (pick a unit holding only one
   token of the class; replace a fault that cannot isolate its class and record why, as
   plainsports did):
   - LEVEL: Latin `[2].departments[1].courses[7]` "An honors course" → "A course".
   - COLLEGE: Cannon `[2].departments[1].courses[12]` "a semester of college calculus" → "a
     semester of calculus".
   - PACE: PD `[2].departments[3].courses[1]` "Moves faster and is more mathematically
     rigorous than" → "Moves beside" (removes both PACE tokens).
   - EXAM: PD `[2].departments[6].courses[6]` delete " for the AP Spanish Language Exam".
   - DURATION / GRADELEVEL / ELECTIVE / IMMERSION: pick on the day from a unit holding exactly
     one token; record the choice.
   - (p): DD `[2].departments[0].courses[3]` delete "Much Ado About Nothing, and ".
   - (q): any school, change one `tag` (e.g. `'AP'` → `'AP '`).
   - (r): PD `[2].departments[3].courses[1]` append " It is hard.".
   - (n): Trinity `[0].departments[1].courses[0]` "five Cs" → "the Cs".
   - (o): any PD unit, append `*`.

   **(f) Calibrate on approved work, and record the result** in Implementation notes. Run each
   row without and with `--courses-markers`, inside a worktree at that merge (copy the new
   `scripts/plain_review.mjs` into each worktree's `scripts/` first; `ROOT` comes from the
   script's location), then `git worktree remove` it.

   | Area | Worktree at (merge) | Command (inside it) | Known result without `--courses-markers` |
   |---|---|---|---|
   | The Arts | `7c2f73df` (#476) | `--dir src/data/artsPrograms --base da0805fa --arts-markers --no-md --md-paths '^$' --check` | 0 |
   | Financial Aid (accessor) | `8a4fdbec` (#471) | `--topic financial-aid-report --base 792fbd6a --aid-markers --check` (add plainaid's `--md-paths` from its Step 4) | read it; record it |
   | Sports | `df4dd5c9` (#484) | `--dir src/data/sportsPrograms --base 19f63d0e --no-md --md-paths '^$' --sports-markers --check` | read it; record it (plainsports' approved by-design (p) hits) |
   | Course Offerings, no change | working tree, Step 1 only | `--topic course-offerings --base HEAD --no-md --md-paths '^$' --courses-markers --check` | **0 rows, exit 0** |

   The without-run must match the known result. Read every new hit from the with-run; a real
   past slip goes under Candidates; a class that is too tight is loosened only with a recorded
   reason, in the script's comments. **Default mode is unchanged:** run the old and new script on
   the Arts row and `diff` the two `--out` files; they must be identical apart from the date line.

1b. **The no-match message** (Batch 1 only; its own commit, before Step 2, so the wording pass
   diffs stay data-only). Added at the user's request, 2026-11-11.

   **Today.** `src/components/CourseOfferings.tsx` lines 275–279 render bare JSX text:
   `No courses match “{q}” — try a shorter term or another department.` It has three faults:
   it is English in all ten locales; "another department" is wrong advice on the **All** tab
   (already searching every department) and in a one-department division (no tabs are shown);
   and it joins two ideas with a dash.

   **The change.**
   - Add two keys to the `courses` object in `src/locales/en.json`, beside `countMatch`:
     ```json
     "noMatch": "No courses match “{{query}}”. Try a shorter search.",
     "noMatchInDept": "No courses in this department match “{{query}}”. Try a shorter search or the {{allTab}} tab."
     ```
   - In `CourseOfferings.tsx`, replace the bare text with
     `{showingAll ? t('courses.noMatch', { query: iq }) : t('courses.noMatchInDept', { query: iq, allTab: t('courses.allTab') })}`,
     where `const iq = '⁨' + q + '⁩'` (FSI … PDI). The isolate keeps a Latin query and
     its quote marks in order inside a `fa`/`ar` sentence. It is invisible in LTR locales.
     `showingAll` is already in scope. A one-department division never leaves the All tab
     (its tab row is hidden), so it always gets `noMatch`. That is correct, because it has no
     other tab to suggest.
   - `{{allTab}}` reuses the visible tab label (`courses.allTab`, "All"), so the hint always names
     the tab exactly as it is shown on screen. The quote marks live inside the string, so each
     locale writes its own (fr « », etc.). `escapeValue: false` is already set in `i18n.ts`.
   - Nothing else changes: same element, same `courses-empty` class, same position.
   - **Phase 1 renders English in every locale** through `fallbackLng`, the same as today. The
     nine other catalogs get the keys in Phase 2 (Step 0).

   **Checks.** The plain-language hook runs on the `en.json` edit and must pass. Then run
   `npx tsc -b` and `npm run check:spelling`. `check:chrome` does **not** cover `t()` keys (it
   only audits skip-fields, memory `chrome-check-is-not-a-new-key-gate`), so it proves nothing
   here. Verify in the browser instead (Step 7, Batch 1).

   **Commit:** `CourseOfferings.tsx` and `src/locales/en.json` only, with the message
   `plaincourses: no-match message as chrome keys (English)`.

2. **(a) Sweep, re-measure, and the fixes commit.** The sweep runs in every batch; the fixes
   commit exists in Batches 1, 2 and 3 (and Batch 4 only if the Honors French III default is
   taken). It lands **before** the worklist is generated, so the wording-pass guards compare
   against the fixed text.
   - **Rerun the sweep** (Context) over every rendered Course Offerings unit. Every hit must be
     in the table or its known false positives; a new hit is judged by the Decisions and added to
     the table before going on.
   - **Batch 3 only, first:** commit the staged source file on its own
     (`plaincourses: Charlotte Catholic full course descriptions (source material)`), run the
     ingest (Source material), and commit its outputs with it. Re-run the census against the
     committed file's section A (title lookup of all 199 courses): if the count of mismatches is
     not 17, stop and report.
   - **Apply this batch's fixes with Edit** (the hook sees each edit):
     - **Batch 1:** DD `divisions[1].notPublished`.
     - **Batch 2:** Trinity `divisions[0].notPublished` (its third sentence); Covenant
       `divisions[0].teaser` if nocompare has not landed (and the `nocompare.md` note).
     - **Batch 3:** the 17 census descriptions, the 2 duplicate pairs (Honors Chemistry, Honors
       Anatomy and Physiology, Advanced Latin II) and the 4 titles (Decisions).
     - **Batch 4 (default taken):** Honors French III's "Honors Spanish IV".
   - **Check:** `git diff` shows only those leaves. For Batch 3, the four titles match the guide
     exactly (write them to `.claude/plans/plaincourses-data/titles-batch3.json` for
     `--allow-titles`).
   - **Hand review.** Write `.claude/plans/plaincourses-data/review-batch<N>-fixes.md`: path,
     before, after and evidence (the source file's census row or entry, or the other school
     data). Generate rows with
     `node scripts/plain_review.mjs --topic course-offerings --slugs <batch> --out <that file>`
     **without** `--check`; guards fire here by design, and the file records which.
   - **Commit** as "plaincourses: batch <N> fixes — <what>". Record its SHA in "Batch progress";
     Steps 4–5 of this batch run with `--base <that SHA>`.

   **(b) Generate this batch's worklist.**
   `node scripts/plain_review.mjs <batch arguments> --worklist .claude/plans/plaincourses-data/worklist-batch<N>.json`.
   Compare the per-school counts with the Context table (Batch 3 + 4 together: 52 Catholic
   descriptions). If they differ, `main` moved: use the regenerated list and note it. **Write
   `.claude/plans/plaincourses-data/worklist-extra-batch<N>.json` by hand**, in the generator's
   format, listing this batch's extra units: Batch 1 Latin and DD `notPublished`; Batch 2 Gaston
   `notPublished` (and the Covenant teaser if fixed here); Batch 3 the off-worklist census rows in
   departments 0–6 (the 14 Options/Pathway rows), English 11 and Honors English 11; Batch 4
   Honors World History, AP European History and Introduction to Photography (fixed in Batch 3,
   listed here only if the wording pass changes them again).

3. **Draft, measure, then apply** (plainsports' method).
   - **Draft** to a scratch JSON keyed by `at`. Catholic drafts read section C of the source
     file; every other school's drafts read its `source-material/course-offerings/<school>/`
     record and first confirm the description belongs to its title (Decisions).
   - **Measure** with a scratch script that runs the real `analyze` plus the Step 1 guard
     functions against the original.
   - **Check:** every capitalized word the before-text had is in the after-text (guard (p)); no
     `*`; no new straight `"` in a unit that holds one; every FROZEN identifier from
     `check_fr_identifiers.mjs` the before-text held is still there in the same form.
   - **Apply** with an exact-match script that refuses an old literal it cannot find or finds
     more than once (the file holds identical strings: Latin II / Advanced Latin II until the
     fixes land; match on the surrounding `title:` line). Build each template from one shared
     string in the draft file.
   - **Re-run the hook by hand.** A scripted write bypasses the hook. Run the Step 4 hook command
     and fix any remaining batch unit with Edit, so the hook sees it.
   - **Rules for every unit:** the Decisions, the Style rulings, the Unit notes and every item of
     "Content that must survive". Same meaning and the same conditions. One sentence per
     description, ≤30 words, aiming for 15–20; units of 30+ words at grade ≤10.
   - **Quote delimiters.** Keep each string valid TS. The file uses single-quoted strings with
     curly `’` apostrophes, and double quotes where a string holds `'` or `"` (e.g.
     `"PDS Middle School Course of Study '25–26"`).
   - **Fill "Template wordings (as built)"** for every template this batch set.

4. **Measure.**
   - **Hook:** `node scripts/check_plain_language.mjs --file src/data/courseOfferings.ts`. After
     each batch, every remaining issue is in a later batch's school (or, after Batch 3,
     departments 7–10). After Batch 4, **0** remain.
   - **Review file and guards:**
     `node scripts/plain_review.mjs <batch arguments> --base <this batch's fixes SHA, or the previous batch's English commit, or main for Batch 1> --allow .claude/plans/plaincourses-data/worklist-batch<N>.json[,worklist-extra-batch<N>.json] --out .claude/plans/plaincourses-data/review-batch<N>.md --check`.
     It must exit 0, with every row reading `hook: pass`. A guard hit that is by design (a
     Catholic truncation completed with the guide's words entering a class) is listed in the
     review file under "Guard hits by design" with the guide sentence that supports it; any other
     hit is fixed.
   - **Sweep:** no hit in this batch's schools other than the known false positives.
   - **Templates:** grep one shared phrase per template set so far; every site reads identically
     (only the language or subject word differs).
   - **Identity:** guard (q) passed; `git diff main -- src/data/courseOfferings.ts | grep -E
     "^[-+]\s+(title|tag|name|grades|guideYear|source):"` shows only Batch 3's four titles.
   - **Stray edits:** `git diff --name-only main -- src/ scripts/` lists only
     `src/data/courseOfferings.ts`, `scripts/plain_review.mjs` (from Batch 1) and, from Batch 3,
     the ingest outputs (`src/content/course-offerings/charlotte-catholic.json`,
     `src/data/schools.json`).
   - **Residuals:** put every row with an after-grade above 10 into "Residual units above grade
     10", with a one-line reason.

5. **Independent review.** Spawn one `general-purpose` subagent with the Agent tool. It never
   sees the drafting conversation.
   - **Give it:** this batch's review file(s); this plan's "Content that must survive", "How each
     field renders", "Near-repeats", "Research bookkeeping and comparisons", "Charlotte
     Catholic", "Unit notes", Decisions and Style rulings, plus `plainsports.md` and
     `plainsmall.md` "Style rulings"; for fixes batches, `review-batch<N>-fixes.md`; the data
     file; for Catholic batches, the new source file; for other schools, their
     `source-material/course-offerings/<school>/` records; `src/components/CourseOfferings.tsx`;
     for Batches 2–4, the earlier review files that set each template.
   - **Tell it to check every row for:** meaning drift, or a course made to sound harder or
     easier; a dropped prerequisite, grade, duration, exam, credit or selection rule; a level
     marker added or lost (AP / Honors / Advanced / college-level); a name, book, curriculum or
     program added or removed; a full list trimmed or reordered; a figure re-typed or a count word
     turned into digits; "rigorous" replaced by a demand the course's own text does not support;
     a description that is no longer about its title (or still is not, after a fix); a
     truncation completed with words not in the guide; a school claim made our own; a
     not-published note turned into does-not-exist; a comparison with another school added; a
     template that differs from its other sites; a FROZEN identifier shortened or dropped; a
     sentence that is now plainer but wrong.
   - **Its output:** it fixes each finding in the source file (the hook still applies), then
     re-runs Step 4. It returns a findings list: path, problem, fix.
   - **After it returns:** regenerate the review file, then append the findings under
     `## Independent review`. Record the count in "Batch progress".

6. **Checks.**
   - **Build:** `npx tsc -b`, then `npx vite build`.
   - **The build's later checks, by hand:**
     `npm run check:schema && npm run check:spelling && npm run check:flags && npm run check:matrices && npm run check:schoolurls && npm run check:chrome && npm run check:runtime && npm run check:moneytext && npm run check:dates && npm run check:spans && npm run check:photos`,
     plus `npm run test:plain`.
   - **`check:matrices`:** same output as on `main`. Save `main`'s output once, in Batch 1, by
     running `node scripts/check_compare_matrices.mjs` inside a `git worktree` at `main` (never
     `git stash`), and diff each batch's output against it.
   - **`check:live` stale stamps are expected** only in `course-offerings`. Record the count
     (Phase 2's input) and confirm no other topic appears.
   - **Schema drift:** if `check:schema` drifts (possible after the Batch 3 ingest), run `npm run
     schema` and commit the doc.

7. **Browser check.**
   - **Setup:** `npx vite preview` after the build. Headed Chrome via Playwright (memory
     `headed-chrome-via-playwright`); never wait on `networkidle`; probe with `textContent`
     scoped to the Course Offerings section.
   - **For each batch school**, open `/school/<slug>/?topic=course-offerings&lang=en`, open every
     division card, click the **All** tab and every department tab, and confirm: every changed
     description renders as written (match the live module's text); ` · ` runs read correctly;
     every changed `notPublished` note shows above its list; collapsed teasers show the changed
     text with counts intact; no literal `*`; no card was added (Batch 3 ingest).
   - **Search:** type one book, curriculum or program name from a rewritten unit into the
     division's filter box and confirm the course is found.
   - **Batch 1, no-match message:** on Providence Day, type `zzqx` into a division's filter on
     the **All** tab and confirm "No courses match “zzqx”. Try a shorter search." Then click a
     department tab and confirm the in-department message ends "…or the All tab." Then open a
     one-department division (Davidson Day's Lower School card, the only one today, with 2
     courses and no tab row) and confirm it shows the All-tab message.
   - **Batch 3:** the four restored titles render in full and the Options rows show their own
     descriptions.
   - **Phone width:** one look at 390px per batch with every card open: no page overflow (or
     `npm run audit:mobile`).

8. **Commit and stop.**
   - **Stage explicit paths only.** Run `git status --short` first, and never `git add -A`.
     Stage `src/data/courseOfferings.ts`; `.claude/plans/plaincourses-data/*`; this plan, with
     "Batch progress" and "Template wordings" filled in; **Batch 1:** `scripts/plain_review.mjs`.
     Fixes commits stage only their fixed data and `review-batch<N>-fixes.md` (Batch 3 also the
     source file, the ingest outputs and `titles-batch3.json`; Batch 2 also `nocompare.md` if
     the teaser was fixed here). The Step 1b commit stages only `src/components/CourseOfferings.tsx`
     and `src/locales/en.json`.
   - **Commit and push.** Commit with `plaincourses: batch <N> English — <schools>`. Push, then
     check that `git rev-parse HEAD` equals `git ls-remote origin feat/plaincourses` (memory
     `git-push-silently-noop`). Do **not** open the PR.
   - **Report to the user:** the review file paths; before/after counts; residual units; the
     reviewer's findings and any fact flag; template wordings set; for Batch 1, the calibration
     result; for Batch 3, the fixes with their evidence; the URLs from Step 7.
   - **Give the paste-in command for the next window:**
     - after Batches 1–3:
       `/implement plaincourses — Batch <N+1>. Batch <N> English is approved<, with these rulings: …>.`
     - after Batch 4: set `status: english-done` and the INDEX row to *English shipped*. Then
       give
       `/implement plaincourses — Phase 2. All four English batches are approved. Run only Phase 2.`

   **→ STOP after each batch.** On resume, put the user's rulings into "Style rulings" and their
   verdict into "Batch progress" *before* the next batch's Step 2. If the user asked for changes
   to a batch already built, make them, re-run Steps 4–6 for that batch, and amend its review
   file.

**→ STOP. After Batch 4, `/implement` ends its turn and waits.** Nothing below runs until the
user confirms all four batches.

### Phase 2 — Every other locale

**Scope:** the `course-offerings` prose overlay in the nine `PROSE_TRANSLATED` locales (es, bn,
ht, te, fr, fa, it, hi, ar), plus the two Step 1b chrome keys in the nine non-English
`TRANSLATED` catalogs (`src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json`). No content overlay,
no `metric-values`.

0. **Chrome keys first** (its own commit, `plaincourses: no-match message, all locales`). Add
   `courses.noMatch` and `courses.noMatchInDept` to each of the nine catalogs, beside that
   catalog's `countMatch`. Keep `{{query}}` and `{{allTab}}` exactly as they are, and use the
   locale's own quote marks around `{{query}}`. Match the register of the catalog's existing
   `courses.filterPlaceholder` ("search" should be the same word that catalog already uses for
   filtering). The `allTab` value is interpolated, so never type the tab's word into the string.
   Check with
   `node --input-type=module -e "import fs from 'node:fs';for(const l of ['en','es','bn','ht','te','fr','fa','it','hi','ar']){const c=JSON.parse(fs.readFileSync('src/locales/'+l+'.json','utf8')).courses;for(const k of ['noMatch','noMatchInDept']){const v=c?.[k];const en=JSON.parse(fs.readFileSync('src/locales/en.json','utf8')).courses[k];if(!v||(l!=='en'&&v===en)||!v.includes('{{query}}')||(k==='noMatchInDept'&&!v.includes('{{allTab}}')))console.log('BAD',l,k,v)}}"`
   It must print nothing.

For the mechanism, see `.claude/docs/prose-translation-architecture.md`; the worked precedent is
the plainsports Phase 2 implementation note (the scratch `BRIEF.md` + `gate.mjs` pattern it
describes). The locale traps in those docs apply unchanged: figures copied char-for-char, `%`
unspaced; lakh/crore regrouping and RTL isolates are render-layer, never typed into `t`.

Four traps are specific to Course Offerings:

- **The course-title policy** (NOTES.md Stage 6). The 4 restored Catholic titles follow their
  predecessors: a locale that kept the title in English keeps the full English title; one that
  translated it translates the added words the same way.
- **Identifiers stay searchable.** AP / IB course names, "Honors", level-numbered names
  (`Latin III`), branded names, book titles, curricula and program names stay as their
  predecessor has them. **`check:fr`** enforces the FROZEN list for `fr`.
- **Prerequisite thresholds and grade figures are figures** (`90 in Algebra I`, `0–12`,
  `10,000,000`, `grades 4-5` with its hyphen), and the ` · ` count matches the English.
- **Stamps, not sites.** The Human Person entry keeps its stamp (the Philosophy course still holds
  it); the 14 Options/Pathway sites move to new entries. Several new texts repeat across sites
  (the Options template, C1–C7). Translate each distinct new text once.

Steps:

1. **Snapshot the base work files** before splicing: for each locale,
   `git show main:src/data/overlays/work/course-offerings.<lang>.json` into the session
   scratchpad.
2. **Splice.** For each locale, `node scripts/i18n_splice_work.mjs --lang <code> --topic course-offerings`.
   *Added* equals the number of **distinct new texts** and *dropped* the number of old texts no
   site holds any more; neither equals the 132-site count. Before translating, compute both
   numbers from the live module and the snapshot with a scratch script, and stop if the splice
   disagrees.
3. **Translate each *added* unit as a revision of its reviewed predecessor.**
   - **Pairing.** Pair by `at` path: for each new text, the predecessor is the old entry whose
     `at` held that path. For the 17 census rows the predecessor translated the **wrong**
     course's text: give the translator the guide sentence instead and say so; only terminology
     and register carry over. The Options rows share one template per course type.
   - **The instruction.** Revise the reviewed translation to say what the new English says. Keep
     terminology, register, name forms and reviewed choices wherever the meaning is unchanged.
     Each template is translated once per locale and reused at every site.
   - **The key.** The final `t` is keyed to the **new stamp**, never to an index.
   - **Subagents.** Three `general-purpose` subagents of three locales each (es/fr/it, bn/hi/te,
     ht/fa/ar), each in its own scratch subdirectory, reading only its task file and writing only
     its own output (memory `parallel-locale-agents-collide`).
   - **The gate.** The plainsports scratch gate (`gate.mjs` pattern): numeric-token multiset;
     money/percent/year/`N+` multiset; no `*`; ` · ` and `→` counts; no bidi controls and no
     non-Western digits; `t` ≠ English and a 0.4–2.5 length ratio; no English month or weekday
     outside a quote; a wrong-script scan (Bangla danda is the known false positive; fa rejects
     Arabic ي/ك, ar rejects Persian-only letters); every capitalized Latin name token of the
     English present in `t`, with a stoplist of description sentence-starters.
4. **Rebuild** with `node scripts/i18n_build_overlay.mjs --topic course-offerings --lang <code>`.
5. **Verify by stamp.** Run `node scripts/check_work_integrity.mjs`, which reports false
   "violations" after a splice (memory `comparerows-shipped`). Then prove against the snapshot:
   every kept stamp has `text` and `t` byte-identical, and every new stamp is non-blank.
6. **Run the Phase 2 checks** (Verification below). Then: fill in Implementation notes; set
   `status: implemented` and `prs: [<n>]`, and the INDEX row to *Implemented* with the PR link;
   open the PR with `--body-file` (per-batch counts, links to the review files, reviewer
   findings, the Catholic fixes with evidence, the template wordings, the guard calibration);
   squash-merge (pre-authorized), then `git checkout main && git pull`.

   **Do not deploy.** Report "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/courseOfferings.ts` | edit: 105 worklist prose units + 23 extra prose units + 4 Catholic titles; one `// plain-ok` comment; fixes in their own commits |
| `scripts/plain_review.mjs` | edit (Batch 1): `--courses-markers` (new classes in (h), (n)), guards (p), (q), (r), `--allow-titles`; header comment and usage |
| `source-material/course-offerings/charlotte-catholic/Charlotte Catholic - Course Offerings - Full Descriptions 2026-2027.md` | new (staged by `/plan`; committed in Batch 3) |
| `.claude/docs/course-offerings/charlotte-catholic.md`, `src/content/course-offerings/charlotte-catholic.json`, `src/data/schools.json` | regenerated by the Batch 3 ingest |
| `src/components/CourseOfferings.tsx` | edit (Step 1b): the no-match message reads `courses.noMatch` / `courses.noMatchInDept` |
| `src/locales/en.json` | edit (Step 1b): two `courses.*` keys |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2 Step 0): the same two keys, translated |
| `src/data/overlays/work/course-offerings.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2): spliced and translated |
| `src/data/overlays/course-offerings.{same 9}.json` | edit (Phase 2): rebuilt |
| `.claude/plans/plaincourses-data/worklist-batch{1..4}.json`, `worklist-extra-batch{1..4}.json`, `review-batch{1..4}.md`, `review-batch{1,2,3}-fixes.md` (+ `review-batch4-fixes.md` if taken), `titles-batch3.json` | new |
| `.claude/plans/plaincourses.md`, `.claude/plans/INDEX.md` | edit: progress, template wordings, rulings, notes, status |
| `.claude/plans/nocompare.md` | edit (Batch 2, only if its row 36 is done here): an Implementation note |
| `.claude/docs/DATA-SCHEMA.md` | only if `check:schema` drifts |

No skill or slash command changes, so `.claude/SKILLS.md` is not touched. No `CLAUDE.md` change.

## Verification

### Phase 1 — English (per batch)

- [ ] **Hook:** `node scripts/check_plain_language.mjs --file src/data/courseOfferings.ts`:
  every remaining issue is in a later batch's units. After Batch 4, 0 remain.
- [ ] **Guards:** the Step 4 `plain_review.mjs … --courses-markers --check` exits 0; every row is
  `hook: pass`; by-design hits are listed with their guide sentence.
- [ ] **Batch 1 tooling:** each negative test failed on its planted fault with the right class or
  guard and `slug:path`, and the file was restored `cmp`-clean; the calibration runs are recorded
  and the without-flag results match; the Course Offerings no-change run is 0 rows; the
  default-mode diff is empty; the worktrees are removed.
- [ ] **Fixes:** each fixes commit holds only its named leaves; `review-batch<N>-fixes.md`
  records before, after and evidence. Batch 3: the census re-run finds 17; the source file and
  ingest outputs are committed; no date-only doc diffs remain.
- [ ] **Identity:** guard (q) passes; only Batch 3's four titles changed, to the guide's exact
  wording; `check:matrices` output equals `main`'s.
- [ ] **One sentence:** guard (r) passes; ` · ` runs keep every item in order.
- [ ] **Jargon:** no "rigor"/"rigorous" outside a quote in any changed unit.
- [ ] **Sweep:** no bookkeeping or comparison hit in the batch's schools beyond the known false
  positives.
- [ ] **Templates:** every template reads identically at every site set so far, and matches
  "Template wordings (as built)".
- [ ] **No asterisks:** guard (o).
- [ ] **Stray edits:** `git diff --name-only main -- src/ scripts/` lists only the expected files.
- [ ] **Residuals:** every after-grade >10 row is listed in "Residual units above grade 10".
- [ ] **Independent review:** done, and its findings fixed and recorded.
- [ ] **Build and checks:** `npx tsc -b` clean, `npx vite build` succeeds, the Step 6 list is
  green, and the `check:live` stale count covers only `course-offerings`.
- [ ] **Browser:** the Step 7 items for this batch.
- [ ] **After Batch 4:** `npm run check:plain` shows course-offerings **Flagged 0** (baseline 95)
  and **Jargon 0** (baseline 37); Grade >10 equals the residuals plus off-worklist units; every
  other area unchanged from the Context baseline.

### Phase 2 — Locales

- [ ] **Chrome keys.** The Step 0 one-liner prints nothing. In the browser, on Providence Day in
  `es` and `fa`, the filter's no-match message (All tab and a department tab) is in the locale,
  the query shows inside the locale's quote marks, and in `fa` the Latin query stays in order.
- [ ] **Resolution.** `npm run check:live && npm run check:runtime`: clean.
- [ ] **Digits.** `npm run check:digits`: no finding on a changed unit.
- [ ] **Figures and separators, per locale.** `npm run check:sepdrift -- --lang <code>` and
  `python3 scripts/check_figures.py --topic course-offerings --lang <code>`.
- [ ] **Locale checks.** `npm run check:fr` (the FROZEN identifiers), `check:dates`,
  `check:moneytext`, `check:currency`, `check:hi`, `check:fa`, `check:bidi`, `check:chrome`. Then
  `node scripts/check_work_integrity.mjs`, followed by the by-stamp proof (Phase 2 Step 5).
- [ ] **Leaks.** `npm run i18n:leaks -- --lang <code>`: no flag on a changed path (it prints `at`
  paths; match them against the worklists).
- [ ] **Build.** `npm run build`: green end to end.
- [ ] **Render audit.** `npm run build && npx vite preview`, then
  `npm run audit:daterender -- --lang es --lang fa --lang hi` (9+ minutes) and
  `npm run audit:moneyrender`: no new finding in Course Offerings compared with `main`.
- [ ] **Browser.** Charlotte Catholic, Covenant Day, Cannon and Providence Day in `es`, `fa` and
  `hi`, `?topic=course-offerings`, every card and tab open: every changed unit is in the locale;
  titles, tags, names and figures intact; ` · ` runs intact; no stray `*`; grade ranges read
  correctly in RTL (strip bidi isolates before probing; memory `ccdprofile-shipped`); the four
  restored titles show their translated or kept form per their predecessor.

## Risks

| Risk | Mitigation |
|---|---|
| A course title, tag or department name changes | Guard (q) over every school; `--allow-titles` for the four; Step 4 diff grep; `check:matrices` compared with `main` |
| A rewrite makes a course sound easier or harder, or invents a demand | PACE, LEVEL, COLLEGE classes; the "rigorous" order; reviewer item |
| A Catholic rewrite draws on the wrong course | The census (17 fixed first); section C keyed by app path; reviewer gets the source file |
| A truncation is completed with invented words | Decisions rule (guide words only, else drop the fragment); notes column; reviewer item |
| A list is trimmed or reordered in a ` · ` run | Guard (p) and (b) on names and figures; reviewer item; Step 7 reads the runs |
| A name, book or curriculum leaves a description and stops being searchable | Guard (p); Step 7 search probe |
| The Options and duplicate fixes confuse Phase 2 pairing | Phase 2 Step 2 counts stamps, not sites; Step 3 pairs census rows with the guide sentence, not the wrong predecessor |
| nocompare lands mid-plan and touches the same teaser | Batch 2 Step 2a checks `git log`; one owner per unit, recorded in `nocompare.md` |
| New classes false-positive and block good rewrites | Calibrated on three approved areas and a no-change run; loosen only with a recorded reason |

## Open questions

- **The 4 Catholic titles** (Approvals). **Default:** restore them to the guide's wording in the
  Batch 3 fixes commit. If the user says titles must not move even when truncated, drop them from
  `--allow-titles` and record them as candidates.
- **Honors French III's "Honors Spanish IV"** (the guide's own error). **Default:** "Honors French
  IV", with the guide's Honors French IV prerequisite as evidence, in a Batch 4 fixes commit. The
  alternative keeps the school's text as printed.
- **Trinity's 39-word Spanish description** may not fit one sentence of ≤30 words. **Default:**
  one sentence with two clauses; if it cannot fit, show both options at the Batch 2 review.
- **Words outside the jargon list** (in-depth, catalog boilerplate, advanced-low). **Default:**
  handle them per the register inside changed units, and list candidates for
  `plain_language.json` in Implementation notes. Do not edit that file.

## Residual units above grade 10

*Filled in by `/implement`: path, after-grade, reason.*

| Path | After-grade | Reason |
|---|--:|---|
| | | |

## Implementation notes

*Filled in by `/implement`, one section per batch, then Phase 2.*

### Candidates noticed while planning, not acted on

- **`plain_language.json` `holistic` gloss** ("the school looks at the whole application") is an
  admissions meaning; in Course Offerings, After School and Learning Support "holistic" means
  whole-person. The term's `plain` text could say both.
- **A description-to-title census for the other 12 schools.** Only Catholic's descriptions were
  machine-extracted; the others were written by hand, so the Catholic failure mode is unlikely
  there, but nothing has checked.
- **Catholic's other 182 descriptions** are the catalog's first ~35 words, multi-sentence and in
  catalog register ("This course is designed to…"), but under the hook's thresholds. A later pass
  could condense them to the one-sentence design too.
