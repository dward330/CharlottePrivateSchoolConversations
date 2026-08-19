---
name: add-charlotte-catholic
title: Add Charlotte Catholic High School as the 11th school
status: implemented
phases: 2
created: 2026-08-18
branch: feat/add-charlotte-catholic
prs: [150]
---

# Add Charlotte Catholic High School as the 11th school

## Goal

Add **Charlotte Catholic High School** (Charlotte, NC) as the app's 11th school, with
**seven of eight** research areas populated to the depth its public data supports. It
ships as a full school page — pre-rendered SEO page, Compare column, structured cards,
prose, brand crest, Welcome Video — plus overlay translations in every prose locale.

Success = the school page renders every included area to the depth of a **data-rich**
school (not a thin one), **After School is absent rather than empty**, the Compare column
shows real values with `null`s only where data is confirmed unpublished, and every
automated check passes.

This is a **completed `/add-school` assessment** — viability is settled (**7/8 areas,
~23 of 30 Compare rows ≈ 77%**, clearing the Davidson Day floor of 17/30 by six rows; it
would rank ~4th of 11 on Compare fill). Do **not** re-assess whether to add it; build it.

## Context

The app holds **10 schools × 8 research areas** today (`src/data/schools.json`,
`.claude/docs/DATA-SCHEMA.md`, 377 ingested documents, 30 Compare rows). The last school
added was **Gaston Day (PR #146)**; its plan `.claude/plans/add-gaston-day.md` is the
**mechanical reference** for where things live and how imports are wired.

**It is NOT the content model.** Per the standing rule, build each card to the **fullest**
existing school's structure — **Providence Day / Charlotte Latin / Cannon** (~96% fill),
populating every optional field, stat tile, season/ledger/funnel/roster row the data
supports. Charlotte Catholic's data is genuinely rich in four areas (Course Offerings
~100%, The Arts ~94%, College Support ~90%, Sports ~83%) and must not be capped at a
thinner school's depth.

### What makes this school structurally different from all ten predecessors

Three things, each of which changes a decision downstream. None is a blocker; all are
recorded here because a fresh window would otherwise trip over them.

1. **Grades 9–12 ONLY** (~1,171–1,300 students). Every existing school is PK/K–12. This
   is why After School is omitted (below) — that area's schema is built around childcare
   for young children.
2. **NCHSAA 6A** — a private school competing in the NC **public** state association.
   Every other school in the app is NCISAA. Championship counts, conference and win-loss
   records all come from a different governing body.
3. **Part of MACS** (Mecklenburg Area Catholic Schools), Diocese of Charlotte. Tuition is
   published **centrally at discovermacs.org**, not on the school site, and the
   enumerable athletics signing source is the **diocesan paper**, not the school.

### Confirmed structure (every path below was verified during planning, 2026-08-18)

- **Per-school data dirs** (10 files each today, except `summer/` at 9):
  `src/data/sportsPrograms/<slug>.ts`, `artsPrograms/`, `clubsPrograms/`,
  `collegeSupportPrograms/`, `afterSchoolPrograms/`, and **`summer/<slug>.ts`**.
- **`PROGRAMS` maps needing a hand-added import** — verified line numbers:
  `sportsProgram.ts:433`, `artsProgram.ts:365`, `clubsProgram.ts:284`,
  `collegeSupport.ts:442`, `summerPrograms.ts:317`. **`afterSchool.ts:395` is NOT
  touched** — see the omission decision.
- **Omission mechanism, verified**: `topicsForSchool()` (`src/lib/manifest.ts:45`) filters
  to topics with `docCount > 0`. A topic with no `source-material/` folder is absent from
  the page entirely. `SchoolDetail.tsx:664` documents this precedent for Davidson Day's
  missing Summer Programs. **`src/data/summer/` holding 9 files, not 10, is the live
  precedent at the structured layer.** No conditional belongs in any component.
- **`brandFor()`** falls back to slate `#5b6472` + auto-initials (`brands.ts:114–126`), so
  a missing entry is not a breakage — it silently ships a generic badge.
- **Locale lists**: `TRANSLATED` (`i18n.ts:108`) has 10 entries; **`PROSE_TRANSLATED`
  (`i18n.ts:182`) has 9** — `es, bn, ht, te, fr, fa, it, hi, ar`. Phase 2 is 9 locales.
- **`SCHOOL_NAMES`** lives in `.claude/skills/ingest-source-material/build_docs.py`, not
  under `scripts/`.
- **SEO** generates from `schools.json` via `scripts/seo_routes.mjs` (`ROUTES` at :45,
  `LOCALES` at :90), so the page and sitemap entry are automatic. `check_seo.mjs:34` sets
  `MIN_BYTES = 20_000`.
- **30 Compare rows** confirmed by count in `src/data/metricValues.ts`.

## Decisions

Made during the `/add-school` assessment and confirmed by the user. **Do not re-litigate.**

- **After School — OMITTED entirely** — confirmed absent *by design*, not a research miss.
  MACS runs an aftercare program (ASEP) whose handbook states it serves "the K-8 children,
  full day preschoolers"; its roster names six K–8 schools with CCHS **absent** (zero
  occurrences of "Charlotte Catholic" / "high school" / "9-12"). The CCHS 90-page student
  handbook has zero mentions of aftercare/extended day/childcare.
- **Both After School Compare rows are LOWER-SCHOOL measurements by definition** —
  `latest-pickup` (`metricValues.ts:1077`) is "End of the **Lower-School** extended-care
  day"; `aftercare-cost` (`:1158`) is "the highest-priced **grade band**". A 9–12 school
  has no referent, so both are deliberate `null`s. **Do NOT press after-school detention
  (Tue/Thu 2:45–3:45pm) into service as `latest-pickup`** — it is a disciplinary window,
  not supervised pickup, and would read as "CCHS supervises until 3:45."
- **Financial Aid — INCLUDED with 3 deliberate `null`s** (`pct-aid`, `aid-awarded`,
  `avg-award`), published diocese-wide only, never per-school.
- **No Form 990 exists, structurally** — MACS EIN 56-1779865; ProPublica states it "is not
  required to submit tax filings because the IRS designates it as a religious
  organization." A **permanent** `null`. `hickory-grove-christian` already ships this exact
  shape (`metricValues.ts:596`). **Do not spend a research pass hunting for a 990.**
- **Sports commit rows were resolved by a deep pass** — `p4-commits-2426` = **10**,
  `d1-commits-2426` = **26**. Do not re-derive from scratch; verify and extend.
- **Welcome Video decided** — `https://www.youtube.com/embed/mk06OtSv9ps`
  ("Charlotte Catholic High School – Grounded in Tradition"), user-supplied and confirmed.
- **`us-departments` = 11** — site nav lists 10, curriculum-guide TOC lists 12 (incl.
  Options/Pathways + Dual Enrollment). Ship 11 with a note explaining the spread.
- **`advanced-arts-coursework` framed as "1 AP + 10 Honors"**, not an AP count — CCHS
  offers only **AP Studio Art** (no AP Music Theory, no AP Art History, confirmed by
  full-catalog sweep). An AP-only figure makes a strong program read as thin.

## Approvals needed

**None.** Adding a school is automatic everywhere per §6 of `DATA-SCHEMA.md`, and the
assessment found **no material that fits no existing card** — every finding maps onto a
card the app already has.

If the deep research pass surfaces material fitting no existing card, **stop and ask**
before building it: that is a new card under the UX-design gate.

## Source material

**None written during planning.** `/add-school` is forbidden from writing
`source-material/` — its sweep produces indicative percentages, not the vetted record.
Every URL below is a **starting point for `/implement`'s real research pass**, not a
citation to copy forward.

Persist everything found to
`source-material/<topic>/charlotte-catholic/Charlotte Catholic - <Topic> - <Subtopic>.md`
with a provenance header, source URLs and the record-level detail behind every figure,
**then** run the `ingest-source-material` skill. **Create no `after-school/` folder.**

### Course Offerings

- Landing: https://www.charlottecatholic.org/departments/counseling/course-selection/2026-2027-curriculum-guide
- **Curriculum Guide 2026-2027 (96pp)**: https://resources.finalsite.net/images/v1771958102/charlottecatholicorg/ggbqwr7ecdypclivyab5/2026-2027CurriculumGuideedited.pdf
- Prior year 2025-26 (91pp): https://resources.finalsite.net/images/v1739227314/charlottecatholicorg/f13amirasvpffdjes4nj/2025-2026CurriculumGuidewithCoverFeb-10-2517-2542.pdf
- ⚠️ **The guide is a clean TEXT-LAYER PDF.** WebFetch's summarizer wrongly reports it as
  binary/scanned — **extract with `pdftotext`**, do not conclude it is unreadable.
- Findings to verify: `us-courses` **195** (193 coded + 2 dual-enrollment `CPCC:`);
  by dept — Visual & Performing Arts 39, World Languages 28, English 18, Interdisciplinary
  Studies 18, Science 18, Mathematics 17, Social Studies 16, Options/Pathways 14,
  Theology 14, PE 8, Philosophy 3, Dual Enrollment 2. Prior-year guide = **183** (a trend
  point for the tuition-history-style narrative). `advanced-courses` **24 AP + 43 Honors +
  18 Advanced = 85**.

### College Support — the richest area

- **School Profile 2025-2026 (2pp)** — the single highest-value document:
  https://resources.finalsite.net/images/v1756128027/charlottecatholicorg/f5yfsecttu3cgmmtsh3f/CCHSSchoolProfile25-26FinalforOnline.pdf
  (landing: https://www.charlottecatholic.org/about-us/school-profile)
- Prior year 2024-25 (includes a full course catalog by dept): https://resources.finalsite.net/images/v1724094378/charlottecatholicorg/lmusvjjxiadccx7cjqmh/866592023CCHS_Profile.pdf
- Counselors: https://www.charlottecatholic.org/departments/counseling/meet-our-counselors
- Common App prompts: https://www.charlottecatholic.org/departments/counseling/college-planning-grades-9-12/common-app-essay-prompts
- NC State rep-visit venue: https://admissions.ncsu.edu/venue/charlotte-catholic-high-school/
- **169 named institutions** (Classes 2023–2025 combined; profile prose confirms "169
  different colleges and universities").
- ⚠️ **This is a MATRICULATION list, not an ACCEPTANCE list** — unlike some schools on the
  roster. Note it explicitly in the prose and the per-cell provenance so the bucket rows
  are not read as like-for-like against acceptance-based schools.
- Bucket counts to verify: `bucket-ivy` **6/8** (Cornell, Dartmouth, Harvard, Penn,
  Princeton, Yale — no Brown, no Columbia) · `bucket-ivyplus` **7/17** (6 Ivies + Duke) ·
  `bucket-nu75` **35/75** · `bucket-lac75` **17/75** (incl. all three service academies:
  Naval #3, Air Force #5, West Point #10) · `bucket-p4` **~46/68** (~48 raw hits — **needs
  manual dedupe**) · `bucket-hbcu` **2/107** (Hampton, Benedict College).
- `ap-performance` **94% scored 3+** (72% scored 4–5); 1,064 exams, 23 subjects, 345
  students, 2024-25; AP exams mandatory in each AP course.
- `counselor-caseload` — 324 seniors, 6 counselors → **~54 seniors/counselor** (~195
  students across all four grades). Named: Sovchen, Nobary, Parks, Fisher, Needham,
  Clementi. ⚠️ The counselors page shows the **2026-27** roster (drops Needham, adds Kate
  McHugh) — **pick one year and be consistent** between the tile and the prose.
- Other profile figures: 95% post-secondary; 81% public / 19% private; 38% stayed in NC;
  2% two-year; Class of 2025 earned **$17,242,184** in scholarships; weighted GPA only,
  +1 quality point AP/Honors, **10-decile GPA chart** (1st decile 4.38–4.63 → 10th
  2.25–3.14), **no class rank**, 28 credits over 4 years, "most demanding" = 2 AP junior +
  4 senior; National Merit 2025 **2 Finalists, 11 Commended**; 3 US Naval Academy
  appointments; Army ROTC scholarship at Cornell; CEEB **340 665**; Head of School
  W. Kurt Telford.
- ⚠️ **SAT 1080–1360 (226 takers) and ACT 19–28 (144 takers) are mid-50% RANGES, not
  averages.** Per the `wholeClass noPercentiles` rule, a range/average table sets
  `noPercentiles: true` — the percentile header renders only over genuine six-value
  percentile rows.
- ⚠️ `application-support` / `fit-rank` depth is locked in **Prezi embeds** (junior/senior
  process pages) — not fetchable HTML. Try to reach the Prezi content directly before
  recording either as `null`.
- AP Scholar tier counts **NOT PUBLISHED** (the profile gives exam-level performance
  instead, which is richer).

### The Arts

- Dept: https://www.charlottecatholic.org/academics/visual-and-performing-arts
- Faculty: https://www.charlottecatholic.org/academics/visual-and-performing-arts/meet-the-faculty
- Facility: https://www.charlottecatholic.org/community/fac
- Blumey records: https://www.blumenthalarts.org/assets/doc/2025-Blumey-All-Nominees-and-Finalists-9b848e893a.pdf ·
  https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-nominees-finalists-for-2026-blumey-awards ·
  https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-2026-blumey-award-winners
- **35 arts courses** (curriculum guide pp. 53–69). ~12 named ensembles: Honors Concert
  Choir, Honors Wind Ensemble, Concert Band, Choral Ensemble, Honors Women's/Men's Chamber
  Ensemble, Women's/Men's Chamber Ensemble, Freshman Men's/Women's Chorus,
  Percussion/Honors Percussion, Jazz Band (after-school), Marching Band.
- Faculty: Jacob Bohan (Band), Marcus Riter (Theatre, 12 yrs), Melissa Parks (Visual
  Art/AP Studio), Barry Johnson (Photography/Graphic Design), Tara Ryan (Dance),
  Christopher Jones (Guitar).
- Facilities — **MACS Fine Arts Center**: 650-seat auditorium, 2 art studios, band room,
  broadcast studio, ceramics studio, dance studio, darkroom + digital lab, photography lab
  (9 named spaces).
- Awards, dated + named: **5 Blumey finalists 2025** (Brenden Ortiz–Motel, Maye
  Glessner–Hodel, Jon Pacheco–Perchik, Anna Wall–Tzeitel, Connor Nichols–Rabbi);
  **3 Blumey finalists 2026** (Jack Gordon–Uncle Henry/Guard, Maye Glessner–Dorothy,
  Olivia Overhalser–Toto Puppeteer).
- ⚠️ **NO Blumey WINS in 2026** — verified against the winners release. A wins claim would
  be factually wrong.
- ⚠️ **The school's performances calendar is EMPTY ("No showings")** — the production
  season list must come from Blumey records: *Fiddler on the Roof* (2024–25),
  *The Wizard of Oz* (2025–26).

### Student Clubs

- **76 clubs, enumerable, 6 categories**, most with descriptions + meeting rooms:
  https://www.charlottecatholic.org/departments/campus-ministry/clubs → `us-organizations`
  = **76**.
- Handbook: https://resources.finalsite.net/images/v1753815058/charlottecatholicorg/f73esbbzrom3skvql13w/25-26StudentHandbookFinal.pdf
- Student life: https://www.charlottecatholic.org/community/parents/parent-information-guide/student-life-cougar-passes-student-passes
- Debate (stale): https://www.catholicnewsherald.com/faith/147-news/school-header/1702-charlotte-catholic-debate-speech-team-brings-home-more-awards
- **7 honor societies with GPA criteria**: NHS (3.9), Mu Alpha Theta (4.5 math), Science
  NHS (4.25 sci/4.0), Rho Kappa (3.75), World Language, International Thespian Society
  (3.0 + 60 pts), National Art Honor Society.
- Service (very strong): graduation requirement **70 hours over 4 years** (10 Fr / 20 So,
  Jr, Sr; **≥5 parish hours/yr**; March 1 deadline); ~23 service clubs.
- `media` — **CONFIRMED `null`.** No newspaper, yearbook or literary magazine anywhere;
  handbook has zero publications content. Closest are *courses* (Honors TV/Film/
  Production), which are not a publication.

### Sports

- 2024 class (15 athletes): https://catholicnewsherald.com/94-news/schools/9839-15-cchs-student-athletes-commit-to-college-sports
- 2026 class (8 athletes, Feb ceremony): https://catholicnewsherald.com/94-news/schools/12397-college-signing-day-big-dreams-bigger-futures
- 2025 class (Charlotte Observer, Nov 2024): https://sports.yahoo.com/national-signing-day-where-charlotte-111500239.html
- Hedrick corroboration: https://goduke.com/sports/baseball/roster
- 20 sports, 3 seasons, 31 teams/14 sports; explicit varsity/JV subpages per sport.
- Championships: football **8 titles, 11 appearances, 8-3**; girls swim **14 STRAIGHT
  2002–15**; 2026 boys LAX, girls LAX, girls soccer titles; 2016 4A basketball.
  **74 state championships since 2000 + 8 Wells Fargo Cups.**
- Win-loss: FB 25-26 **7-5** (3-3 conf, 235-198) with a full 12-game log; LAX **21-3**;
  baseball 23-10 (2024), 22-6-1 (2025).
- Facilities: **Oddo Field at Keffer Stadium**, 3,500 seats, named for Jim Oddo.
- Sports medicine: full-time licensed/certified ATs **provided by Atrium Health**; Todd
  Wisocki LAT/ATC; strength coach Mike Hazel (NSCA CSCS).
- Coaches: baseball staff page has **8 coaches with full bios, start years, records,
  pro/draft history**; AD Kevin Christmas; FB Brodowicz. Other sports thinner.
- Pros: Elijah Hood (NFL Raiders 2017, 7th rd/242), Derrick Taylor (NFL), Brendan
  McDonough + Donnie Smith (MLS), Patrick Hogan (USL), Laura DuPont (tennis).
- Awards: Will Hartman (Observer golfer of the year), Elijah Hood (Hall Trophy US Army
  POY), Mason Poveromo.
- National: boys LAX **#28 national** (MaxPreps), #1 in NC (up from #186); FB #4 in 6A.
- NIL: NCHSAA NIL policy effective 7/1/2023; CCHS is 1 of only **4 Catholic NCHSAA
  members**. No CCHS-specific deals found.
- `recruiting` (top-100 national) **NOT FOUND** — 247/On3 school pages 403/404.
- ⚠️ **The school's own athletics site publishes almost nothing usable** —
  `/athletics/national-letter-of-intent` is an empty Finalsite photo-gallery shell (live
  **and** archived; image `alt` attributes are literal `alt-text` placeholders). **The
  diocesan paper is the enumerable all-sports source.**

  **ONE EXCEPTION, confirmed by a full archive sweep (see below): the BASEBALL
  "Past Season Recaps" page.** It carries a `THANK YOU SENIORS` block naming college
  signees for each season — the only sport page on the site that publishes commitments.
  Archived snapshot: `https://web.archive.org/web/20260317060929/https://www.charlottecatholic.org/athletics/all-sports/baseball/past-season-recaps`

### ⚠️ Archive sweep — DONE, do not repeat it

A **full CDX enumeration of 4,131 archived CCHS URLs** (not truncated — a 20,000-limit
query returned the same count) plus a sweep of all 137 archived athletics pages was run on
2026-08-18. **`/implement` must not spend another pass on archive.org for signing data.**
What it established:

- **No enumerable all-sports signing list has ever existed on the site.** The school's
  full internal sitemap is archived (`/fs/pages/sitemap`, snapshot `20240602021917`, 1,089
  lines) — there is no signing-day, college-commitment or "where they're playing" page
  anywhere in it.
- **Why the live signing posts 404 and are unrecoverable:** signing coverage lived in
  JS-loaded news posts. The three archived news-index snapshots captured only Finalsite
  lorem-ipsum placeholders ("Fermentum Sollicitudin Aenean Malesuada Quam") because the
  real feed loads via JS and the crawler never captured it. **They were never archived.**
- **~70 archived news posts** under `/community/news/*`, `/post-details/*` and
  `/view-all-news/*` — all honor rolls, coach hires, uniform guidelines, registration
  notices. None about signings.
- **Baseball alumni page** (`/athletics/all-sports/baseball/alumni`) is detailed but
  **stops at class of 2023** (Jake Kernodle → Princeton). Nothing for 2024–2026.
- **Class of 2026: nothing at all in the archive.** The recaps page has a single snapshot
  (March 2026), taken before a 2026 season recap would have been written.

**Anything further for 2024–2026, and anything at all for 2026, must come from outside
archive.org and outside the school's own site.**

### Summer Programs

- https://www.charlottecatholic.org/community/students/summer-camps ·
  https://www.charlottecatholic.org/athletics/all-sports/baseball/camps-clinics
- **4 distinct camps**: Cougar Basketball (girls, Jun 8–11, rising 2–8, 9a–12p / 1–4p,
  price not published) · Eddie Hull Baseball (Jun 1–4, 8–11, 22–25, Jul 27–30; ages 6–13;
  9a–1p; **$349**, $225 Jr.) · Cougar Football (Jul 8–11, rising 3rd–9th, 8:30–11:30a,
  **$160**) · Just4Kicks Soccer (on-site, detail not published). Plus 2 non-camp programs
  (Notre Dame Vision, MYEP).
- ⚠️ The Cougar Football flyer is a **2024** artifact, not refreshed: https://resources.finalsite.net/images/v1709839178/charlottecatholicorg/iyu7apngmnkk7rl5an1s/2024CougarCampFlyer.pdf
- ⚠️ **MACS Summer Camp is OUT OF SCOPE** — $325/week, 8am–5pm, 7 weeks looks attractive
  but serves **age 5–rising 6th at St. Matthew and St. Patrick**, not CCHS. Do **not**
  attribute it to this school.
- No in-house summer school / credit recovery — the handbook twice says a failing student
  takes a course "at their expense over the summer."

### Financial Aid & Tuition

- **Tuition 2026-27, grades 9-12**: Community **$21,562** · Participating Catholic
  **$15,041** · High International **$23,562**; capital fee **$1,995/family**; application
  fee $120. https://www.discovermacs.org/admissions/tuitionandaffordability
- Opportunity Scholarship context: https://catholicnewsherald.com/schools/94-news/schools/11321-apply-now-for-2025-26-opportunity-scholarships
- Deep-dive material: **Clarity** for need assessment (**NOT** FACTS/TADS — FACTS is
  payment processing only; $65 application fee; May 15 returning-student deadline), Family
  Individualized Tuition (FIT), multi-child discounts (10/25/50/100%), NCSEAA Opportunity
  Scholarship, ESA+.
- **The parishioner / non-parishioner split is a structure NO school on the roster
  currently shows** — worth surfacing prominently in the deep-dive prose.
- `tuition-history` **NOT FOUND** — MACS publishes only the current year. Secondary sources
  give conflicting older figures ($13,348 / $9,366) with no reliable year attribution —
  **do NOT ship these.** Archived MACS snapshots are the path if the row is wanted.
- ⚠️ **PrivateSchoolReview lists CCHS tuition as $45,000 — demonstrably WRONG** against the
  official $21,562. Do not ingest.
- ⚠️ The CCHS page titled **"Financial Aid and Scholarships" is about COLLEGE aid for
  seniors** (FAFSA), not CCHS tuition assistance. An easy mis-ingest.

### ⚠️ A source that FABRICATES school attributions — read before any commit research

The **NCFootballNews 2026 commitment tracker**, read via page-summarization, returned
**18 "Charlotte Catholic" commits**. Raw-HTML parsing showed only **4 distinct athletes**.
The rest belong to **Providence Day** and **Charlotte Christian** — *both already in this
app*. **Leo Delaney (Clemson)** and **Zaid Lott (Syracuse)** are live in the repo as
Providence Day at `src/data/sportsPrograms/providence-day.ts:237-238`. Trusting it would
have inflated the new school with ~14 athletes stolen from two existing schools, while
making the existing schools' data look duplicated.

**Rule: any commit figure must be TABLE-PARSED from raw HTML, never summarized.**

Canary names — if a source attributes any of these to CCHS, the source is unreliable:
Leo Delaney, Zaid Lott, Vincent Rosen, Henry Hulbert, Daniel Phillips, Tate Estep, Ryder
Kilgannon, Elliot Newcomb, Brendan Ravin, Derrin Carr, Matthew Hankins, Trey Dukes.

**Scope this warning correctly — it applies to NCFootballNews ONLY.** The class-of-2025
Charlotte Observer roundup **is genuine**: a literal `CHARLOTTE CATHOLIC:` heading bounded
by `CENTRAL CABARRUS` above and `CHARLOTTE CHRISTIAN` below, confirmed three ways
including schema.org `alumniOf` fields on college rosters.

### The Sports deep pass — already done, verify and extend

`p4-commits-2426` = **10** · `d1-commits-2426` = **26** · 37 distinct athletes.
Per class — 2024: 16 (5 P4 / 14 D1); 2025: 12 (4 P4 / 8 D1); 2026: 9 (1 P4 / 4 D1).
At 10 P4, CCHS ranks **2nd in the app** behind Providence Day (17).

| Class | Name | Sport | College | Conf |
|---|---|---|---|---|
| 2024 | Blanca Thomas | Basketball | North Carolina | ACC |
| 2024 | Kate Daniels | Lacrosse | Louisville | ACC |
| 2024 | Jack Hedrick | Baseball | Duke | ACC |
| 2024 | Lauren Bernardo | Swim & dive | LSU | SEC |
| 2024 | Evan MacIntyre | Baseball | Indiana | Big Ten |
| 2025 | Matt McKnight | Baseball | North Carolina | ACC |
| 2025 | Madison Baumgratz | Lacrosse | Virginia Tech | ACC |
| 2025 | Will Hartman | Golf | Vanderbilt | SEC |
| 2025 | Will Guthrie | Golf | Georgia | SEC |
| 2026 | Alex Hoffman | Baseball | Virginia Tech | ACC |

#### Ten more baseball signees, from the archived Past Season Recaps page

Added by the archive sweep (2026-08-18). Quoted verbatim from `THANK YOU SENIORS` blocks
on the archived page; **six of these ten are NOT in the 37 already counted** — they raise
the documented D1 floor. The three P4/D1 names already in the table (Hedrick, MacIntyre,
McKnight) are now **independently corroborated by a second source**, which is worth noting
in the per-cell provenance.

School attribution is on the same page: *"Head Coach Eddie Hull led Charlotte Catholic to
a Southwestern 4A Conference Championship and a 22-6-1 record during the 2025 season."*

| Class | Name | Sport | College | Level |
|---|---|---|---|---|
| 2025 | Matt McKnight | Baseball | UNC Chapel Hill | **P4 (already counted)** |
| 2025 | Jahdier Rodriguez | Baseball | Rose-Hulman Institute of Technology | D3 |
| 2025 | Will O'Rourke | Baseball | Lenoir-Rhyne University | D2 |
| 2025 | Jon Fijalkowski | Baseball | Clarion University | D2 |
| 2025 | Dylan Kelleher | Baseball | Cleveland CC | JuCo |
| 2024 | Jack Hedrick | Baseball | Duke | **P4 (already counted)** |
| 2024 | Evan MacIntyre | Baseball | Indiana | **P4 (already counted)** |
| 2024 | Mason Child | Baseball | UNC Wilmington | **D1 (new)** |
| 2024 | John McKillop | Baseball | Army West Point | **D1 (new)** |
| 2024 | Brody Roderick | Baseball | Southern Wesleyan | D2 |

**Class-year assignment is safe** — each name is listed among the seniors who "wrapped up
their high school baseball careers this spring" in the named season.

⚠️ **Recount `d1-commits-2426` before shipping it.** Mason Child (UNC Wilmington) and John
McKillop (Army West Point) are D1 and appear to be **new**; if so the row is **28**, not
26. Verify against the 37-athlete list rather than assuming — and remember Army is D1 but
**not** P4. `p4-commits-2426` is unchanged at **10**.

Caveats to carry into the data comments:

- **Class 2026 is a FLOOR, and now demonstrably so.** The Feb 2026 article covers only the
  February ceremony (football/soccer/XC); CCHS holds separate fall and spring signing days.
  The archive sweep found **nothing whatsoever for 2026** — the baseball recaps page has a
  single March 2026 snapshot, taken before a 2026 recap would have been written. Hoffman
  surfaced only via reverse roster lookup. Say "documented minimum" in the note.
- **Baseball is over-represented in the documented set**, because it is the only sport
  whose page publishes signings. This is a *source* artifact, not a fact about the school —
  do not let the prose imply CCHS's college pipeline is mostly baseball.
- **Cannon Ridinger is a DOUBLE-COUNT RISK** — graduated from CCHS but earlier attended
  **Charlotte Country Day** (already in the app) and Hotchkiss. **Attribute by graduating
  school**, not any-attendance.
- **Evan MacIntyre** counted P4 at commitment time (signed Indiana; has since transferred
  to Belmont Abbey via JUCO).
- **Mary Catherine Farley (Wofford, D1) EXCLUDED** — signing-list mention only, never
  appeared on a roster.
- Air Force, Columbia, Yale, Penn, Georgetown, Army are **D1 but NOT P4**.

## Out of scope

- **After School** — no `source-material/after-school/charlotte-catholic/` folder, no
  `afterSchoolPrograms/charlotte-catholic.ts`, no `afterSchool.ts` import.
- **Any new card, section, stat tile, Compare row or metric key.** All material fits
  existing cards. A new one needs the user's approval first.
- **`npm run deploy`** — merging is not publishing. The user runs the deploy, every time.
- **Podcast episodes** — a new school has none; `check:podcast` passes silently. Do not
  invent entries.
- **Backfilling other schools' data**, even if the research incidentally turns some up.
- **`SCHOOL_SECTION_ORDER`** (`SchoolDetail.tsx:116`) — optional per-school card-order
  override, `?.`-guarded. Unlisted schools use the shared order; skipping it is fine.

## Steps

### Phase 1 — English

1. **Branch** — `git checkout -b feat/add-charlotte-catholic` off an up-to-date `main`.

2. **Deep research pass, area by area**, starting from the URLs in *Source material*.
   This is the **real** research; the assessment was reconnaissance and its figures are
   indicative. Seven areas: Course Offerings, Student Clubs, The Arts, Sports, College
   Support, Summer Programs, Financial Aid & Tuition. **Skip After School entirely.**
   Extract the curriculum guide and school profile with **`pdftotext`**, not WebFetch.
   Apply the NCFootballNews warning to every commit figure.

3. **Persist everything to `source-material/`** —
   `source-material/<topic>/charlotte-catholic/Charlotte Catholic - <Topic> - <Subtopic>.md`,
   each with a provenance header (who/when/how), the **source URLs**, and the
   record-level detail behind every figure. **Create no `after-school/` folder.**

4. **Run the `ingest-source-material` skill** — regenerates `.claude/docs/` notes,
   `src/data/schools.json` and `src/content/`. Add `charlotte-catholic` →
   `Charlotte Catholic High School` to **`SCHOOL_NAMES` in
   `.claude/skills/ingest-source-material/build_docs.py`** first, or the school ingests
   under a slugified fallback name.

5. **Map subtopics onto existing metric keys** in `src/lib/metrics.ts` — every new subtopic
   phrasing must resolve to an **existing** `RULES` key. An unmatched subtopic silently
   slugifies into its own one-off card, which is an unapproved UX change. `RULES` is
   ordered, first match wins: specific patterns before generic ones. Verify with
   `npm run check:metrics`.

6. **Write the five per-school structured-card files**, each built to the **fullest**
   school's structure (Providence Day / Charlotte Latin / Cannon), not to Gaston Day's:
   - `src/data/sportsPrograms/charlotte-catholic.ts` — all 7 cards. The `pipeline` funnel
     and roster come from the 37 named athletes above; per-sport bars still need
     assembling. Note NCHSAA (not NCISAA) in the record card.
   - `src/data/artsPrograms/charlotte-catholic.ts` — ~12 ensembles, 9 named facility
     spaces, 8 dated Blumey finalist rows across two years, 2 productions.
   - `src/data/clubsPrograms/charlotte-catholic.ts` — 76 clubs in 6 categories, 7 honor
     societies with GPA criteria, the 70-hour service requirement.
   - `src/data/collegeSupportPrograms/charlotte-catholic.ts` — 169-institution list as
     `{ name, cats }` **only** (see step 10), 10-decile GPA chart, AP performance,
     counseling roster. Mark the list as **matriculations, not acceptances**.
   - `src/data/summer/charlotte-catholic.ts` — 4 camps. **Frame these as youth camps CCHS
     athletics hosts for the surrounding community**, not programming for CCHS's own 9–12
     students, or `summer-ages` "6–13" reads as a data error on a high school's page.

   **No `afterSchoolPrograms/` file.** A card or division with **zero items is omitted
   entirely**, never shipped as an empty shell with a not-published note.

7. **Wire the five `PROGRAMS` imports** — `sportsProgram.ts:433`, `artsProgram.ts:365`,
   `clubsProgram.ts:284`, `collegeSupport.ts:442`, `summerPrograms.ts:317`. **Adding a
   per-school file without wiring its import is a SILENT no-op** — the school renders prose
   instead of cards and no check catches it. **Do not touch `afterSchool.ts:395`.**

8. **Backfill all 30 Compare rows** in `src/data/metricValues.ts` — a value **or** a
   deliberate `null` with a comment, on **every** row. A missing key is an oversight;
   `check:metrics` tells them apart. Confirmed `null`s and their reasons:
   - `latest-pickup`, `aftercare-cost` — 9–12 school, no lower school; ASEP is K-8 and
     omits CCHS. Cite the ASEP handbook scope in the comment.
   - `pct-aid`, `aid-awarded`, `avg-award` — diocese-wide only; **MACS is 990-exempt as a
     religious organization** (EIN 56-1779865). Permanent.
   - `summer-care-span` — every camp is a half-day block; no wrap-around care.
   - `media` (Student Clubs) — no publication of any kind exists.
   - `tuition-history` — only the current year is published; do not ship the conflicting
     secondary figures.
   - `recruiting` — no top-100 national athlete found.
   - **`participation` — use judgment, do not auto-null.** Cannon's value at
     `metricValues.ts:1044` is a **service-hours** figure ("~10k service hrs"), so CCHS's
     **70-hour requirement / 100% participation** may legitimately populate this row. 6 of
     10 schools are `null` here, so a `null` is also defensible.
   - **`flagship-result` — the best found is STALE (2017)**: Speech & Debate NC state
     runner-up + Darlene Singui-Tanyi Program Oral Interpretation State Champion. Nine
     years old, older than anything shipped (Carmel 2022, Cannon 2024/25). Prefer the
     **2025 Blumey finalists**, or make a targeted pass at NC Speech & Debate / Tarheel
     Forensic League / NCMEA all-state records before settling.
   - Any row using a non-numeric value shape needs `compareAs` — `check:spans` guards these
     and its `EXPECTED` table may need updating if a new value changes a leader.

9. **Standalone catalogs** — `src/data/courseOfferings.ts` (`OFFERINGS`, 195 courses across
   11 departments from the curriculum guide), `src/data/clubCatalog.ts` (`CATALOG`, 76
   clubs), `src/data/clubClusters.ts` (hand-maintained clusters),
   `src/data/financialAidReports.ts` (**REPORTS entry required alongside the
   `in-depth-report` key — `check:metrics` needs both**).

10. **College rank labels** — the per-school acceptance list carries **no ranks**; each
    entry is `{ name, cats }` and the label resolves from **`src/data/collegeRankings.ts`**
    (`rankLabelFor(name)`) at render. **~108 of the 169 institutions are already in the
    master (446 rows) and resolve for FREE.** Research only the **~59 unseen** ones, adding
    **ONE row each** to `collegeRankings.ts` plus its source to
    `source-material/college-support/_shared/US News 2026 - Rank Labels.md`. Many will be
    genuinely unranked (community, foreign, specialty, Regional) — those get no row.
    Sourcing channel: **usnews.com first**; after **five** failures in this pass, switch to
    Yahoo (`https://search.yahoo.com/search?p=<school>+us+news+2026+ranked`) and record
    which channel confirmed each figure. Never guess or use a prior-year number.
    Verify with `npm run check:ranks`.

11. **Add the brand entry** to `src/data/brands.ts`. **Three collisions to resolve
    deliberately** — `brandFor()` falls back silently, so omission ships a generic slate
    badge:
    - **Initials** — `CA`, `CM`, `CC`, `CD`, `CL`, `CV` are all taken (7 of 10 badges start
      with `C`). Pick an unused pair.
    - **Color** — CCHS is **green and gold**; sample the school's real green and keep it
      visually distinct from **Charlotte Country Day's `#107a43`**.
    - **Mascot** — CCHS are the **Cougars**, the same nickname as *both* Cannon and Carmel
      Christian. Not a code conflict, but do not let a mascot-derived crest read as theirs.
    - `welcomeVideoUrl: 'https://www.youtube.com/embed/mk06OtSv9ps'` (already decided).
    - `logo` only if a real mark is obtained; provenance to `source-material/branding/`.
      **Never substitute a design-mock mark.**

12. **Add `charlotte-catholic` to every i18n script with a hardcoded list** — do this in
    **Phase 1** so Phase 2 cannot silently skip the school. Each needs its `SLUGS` array
    and/or `EXPORTS` map updated:

    | Script | What to add |
    |---|---|
    | `scripts/i18n_extract.mjs:44,88` | `SLUGS` + `EXPORTS` |
    | `scripts/check_translations.mjs:34,77` | `SLUGS` + `EXPORTS` |
    | `scripts/check_chrome_keys.mjs:35,50` | `SLUGS` + `EXPORTS` |
    | `scripts/i18n_audit_skips.mjs:35,50` | `SLUGS` + `EXPORTS` |
    | `scripts/check_live_resolution.mjs:50` | `EXPORTS` |
    | `scripts/i18n_fields.mjs` | **three** per-slug path families — `values.charlotte-catholic` (~:364), `subs.charlotte-catholic` (~:379), `quals.charlotte-catholic.kind` (~:398) |

13. **Regenerate the schema doc** — `npm run schema`. `check:schema` **is** chained into
    `npm run build` and **will** fail until this runs, since a new school changes the
    schools table and the coverage matrix.

14. **Run Phase 1 verification** (below), then **commit and open the PR**.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording is what they want.

### Phase 2 — Every other locale

Scope: the **overlay layer** for research prose, per **`PROSE_TRANSLATED`**
(`src/lib/i18n.ts:182`) — **9 locales**: `es, bn, ht, te, fr, fa, it, hi, ar`. This is
*not* the `src/locales/*.json` chrome catalogs; adding a school introduces no new chrome
keys. Mechanism: `.claude/docs/prose-translation-architecture.md`; per-locale docs for
register and traps.

1. **Confirm the slug landed everywhere** — re-check step 12, then extract and **verify
   Charlotte Catholic's strings actually appear in the work files**. A 100% coverage report
   is **suspect until proven** — `check_translations.mjs:53` records that Summer Programs
   "was invisible here until it was added, at 0% coverage."

2. **Resolve newly-surfaced field paths** in `i18n_fields.mjs` — a data-rich school
   surfaces field paths no prior school used. `i18n_extract.mjs` reports anything neither
   in `PROSE_KEYS` nor `SKIP_KEYS` as *unclassified* and **excludes** it. Decide each:
   enum/code → skip, per-school heading → prose.
   **⚠️ The opposite trap:** never ship a lifted chrome `xTitle` (`rosterTitle`,
   `checklistTitle`, `adjacentTitle`, …) in the data file — it **pins that heading to
   English in all nine locales**. If a heading is identical for every school it is chrome:
   leave it **off** the data file so the `sections.*` fallback wins. Covenant Day shipped
   seven of these and Gaston Day five; they had to be deleted.

3. **Translate the overlays, locale by locale**, per the rollout docs. Standing traps:
   - **Figures are copied char-for-char, never re-typed** — `check:sepdrift` catches
     separator swaps the figure sweep normalizes away.
   - **`hi` / `te` regroup lakh/crore at render**, so the data must store the English
     3-3-3 figure. A work file containing `$36,83,971` has hardcoded a regrouping the
     render layer would apply a second time.
   - **`fa` / `ar` are RTL** — bidi-neutral figures need LRI…PDI isolates; strong-L Latin
     identifiers do not. Watch `≈` **outside** the isolate.
   - **Percent signs stay unspaced in every locale**, French included.
   - `fr` — `check:fr` guards course identifiers that read as translatable prose.

4. **Run Phase 2 verification** (below), then commit to the same PR and merge.

## Files touched

| File | Change |
|---|---|
| `source-material/<7 topics>/charlotte-catholic/*.md` | new — research record, provenance + URLs |
| `.claude/skills/ingest-source-material/build_docs.py` | edit — `SCHOOL_NAMES` entry |
| `src/data/schools.json` | regenerated by ingest — 11th school |
| `src/content/**` | regenerated by ingest |
| `.claude/docs/**` | regenerated by ingest + `npm run schema` |
| `src/lib/metrics.ts` | edit — `RULES` entries for new subtopic phrasings |
| `src/data/sportsPrograms/charlotte-catholic.ts` | new |
| `src/data/artsPrograms/charlotte-catholic.ts` | new |
| `src/data/clubsPrograms/charlotte-catholic.ts` | new |
| `src/data/collegeSupportPrograms/charlotte-catholic.ts` | new |
| `src/data/summer/charlotte-catholic.ts` | new |
| `src/data/sportsProgram.ts` · `artsProgram.ts` · `clubsProgram.ts` · `collegeSupport.ts` · `summerPrograms.ts` | edit — `PROGRAMS` import each |
| `src/data/metricValues.ts` | edit — all 30 rows, values or deliberate `null`s |
| `src/data/courseOfferings.ts` · `clubCatalog.ts` · `clubClusters.ts` · `financialAidReports.ts` | edit — catalog + report entries |
| `src/data/collegeRankings.ts` | edit — ~59 new rows (only the unseen institutions) |
| `source-material/college-support/_shared/US News 2026 - Rank Labels.md` | edit — sources for those rows |
| `src/data/brands.ts` | edit — color, initials, `welcomeVideoUrl` |
| `scripts/i18n_extract.mjs` · `check_translations.mjs` · `check_chrome_keys.mjs` · `i18n_audit_skips.mjs` · `check_live_resolution.mjs` · `i18n_fields.mjs` | edit — slug lists |
| `src/data/overlays/**` | new — Phase 2, 9 prose locales |

**Deliberately NOT touched:** `src/data/afterSchoolPrograms/`, `src/data/afterSchool.ts`,
`source-material/after-school/`, `src/data/podcastEpisodes.ts`.

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run check:metrics` — every school has documents for every included topic; no
      unmatched subtopics; no missing `metricValues` keys; `financialAidReports` entry
      present
- [ ] `npm run check:ranks` — every ranked-bucket college resolves in the master, and the
      master agrees with the companion doc
- [ ] `npm run check:spans` — every `compareAs` row still parses and ranks as expected
- [ ] `npm run schema` then `npm run check:schema` — doc regenerated and in step
- [ ] `npm run build` — succeeds (`check:schema` + `seo:files` are chained in)
- [ ] `npm run check:seo` — **run explicitly, it is NOT in the build.** Watch the
      **20 KB `MIN_BYTES` floor** (`check_seo.mjs:34`) — a school with one omitted area
      could plausibly pre-render under it. Also needs a meta description ≥70 chars and the
      school name in the markup.
- [ ] `npm run coverage:floor` — Charlotte Catholic appears with ~23/30 and 7/8 areas
- [ ] **Browser check** (the standing lesson: every defect surviving the automated checks
      was render-layer):
  - [ ] All seven included areas render, with real content
  - [ ] **After School is ABSENT from the page and its TOC — not an empty section**
  - [ ] Compare column shows values, and N/A only where a deliberate `null` was written
  - [ ] The badge is **not** a fallback slate square, and its green is distinguishable
        from Charlotte Country Day's
  - [ ] The Welcome Video embeds and plays
  - [ ] **Side-by-side against Providence Day or Charlotte Latin** — confirm the rich areas
        (Course Offerings, Arts, College Support, Sports) reached comparable depth rather
        than a thin school's
  - [ ] Summer Programs prose makes clear the camps serve ages 6–13 from the surrounding
        community, so the `summer-ages` row does not read as an error

### Phase 2 — Locales

- [ ] Charlotte Catholic's strings are present in the extracted work files — **verified by
      inspection, not by a green coverage report**
- [ ] `npm run check:translations` — coverage per locale
- [ ] `npm run check:runtime` — **the authoritative resolution guard**; run per locale
- [ ] `npm run check:sepdrift -- --lang <code>` — per locale
- [ ] `npm run check:figures` per topic (note: the extractor writes
      `<topic>.content.<lang>.json`)
- [ ] `npm run check:currency`, `check:money`, `check:bidi`, `check:fa`, `check:hi`,
      `check:fr`, `check:script`
- [ ] `npm run check:hashes` — overlay stamps match live English
- [ ] **Browser print-out on Charlotte Catholic + one data-rich school**, in a real
      browser, with **every `<details>` panel expanded** (the dev-only "Expand all"
      button). A default page is ~17k chars; expanded it is ~152k, and the financial-aid
      figures are collapsed on load. Confirm an unabbreviated 7-digit figure
      (`$17,242,184`) renders correctly — `$3.25M`-style tiles prove nothing about digit
      grouping.
- [ ] Grep the **rendered** page for English sentences in **table cells, chips and source
      lines** — the recurring leak shape is "a sentence wearing an identifier's clothes"

**`npm run check:live` is KNOWN-INCOMPLETE** — it fails on `main` itself (≈2,900 entries)
because it can only walk six per-school-directory topics. **Do not treat its failures as a
Phase-2 regression.** `check:runtime` is authoritative.

## Risks

| Risk | Mitigation |
|---|---|
| Fabricated commit attributions inflate CCHS with Providence Day / Charlotte Christian athletes | Table-parse raw HTML, never summarize; check the 12 canary names; the scoped warning above |
| A per-school file is written but its `PROGRAMS` import is not wired | Silent no-op — the browser check (cards vs prose) is the only thing that catches it |
| i18n scripts silently skip the new school, reporting 100% coverage | Step 12 runs in **Phase 1**; Phase 2 step 1 verifies strings in the work files by inspection |
| A lifted chrome `xTitle` pins a heading to English in all 9 locales | Phase 2 step 2; Covenant Day shipped 7, Gaston Day 5 |
| The pre-rendered page falls under the 20 KB SEO floor (one area omitted) | `npm run check:seo` explicitly; if it fails, the fix is richer prose, not a lowered floor |
| `summer-ages` "6–13" reads as a data error on a 9–12 school | Frame the camps as community youth camps in the prose and the per-cell provenance |
| Tuition mis-ingested from PrivateSchoolReview ($45,000) or the college-aid page | Both flagged in *Source material*; the official MACS figure is $21,562 |
| A research pass is burned hunting a Form 990 that does not exist | Recorded as a **permanent** structural `null` (religious-organization exemption) |
| Cannon Ridinger double-counted against Charlotte Country Day | Attribute by **graduating** school, not any-attendance |

## Open questions

- **Brand initials and hex** — unresolved deliberately; 6 two-letter `C` pairs are taken
  and the green is close to Country Day's. **Default:** pick an unused pair and a
  distinguishable green, note the choice in the PR description, and let the user correct it
  at review. Do **not** let the slate fallback ship.
- **`flagship-result`** — the only found result is 9 years old (2017).
  **Default:** make one targeted pass at NC Speech & Debate / Tarheel Forensic League /
  NCMEA records; if nothing newer, use the **2025 Blumey finalists** rather than shipping a
  2017 figure.
- **`participation`** — may be populatable from the 70-hour service requirement, following
  Cannon's service-hours precedent. **Default:** populate it if the framing is honest;
  otherwise `null` with a comment (6 of 10 schools are already `null`).
- **`us-departments` = 11** — site nav says 10, guide TOC says 12.
  **Default:** ship **11** with a note explaining the spread.
- **The Prezi-embedded counseling pages** — `application-support` / `fit-rank` depth is not
  in fetchable HTML. **Default:** one attempt to reach the Prezi content directly; if it
  fails, populate the cards from what *is* published and do not write a `null` for a card
  that has partial material.

## Implementation notes — Phase 1 (English), 2026-08-18

Phase 1 is built, reviewed by the user, and pushed to `feat/add-charlotte-catholic`
(6 commits, **no PR yet** — both phases land in one PR). Status: `english-done`.

**Read this section before starting Phase 2.** It records what shipped that the plan above
did not anticipate, and two things that would break if Phase 2 assumed the plan was still
an accurate description of the branch.

### ⚠️ Two things Phase 2 must NOT do

1. **Do NOT re-ingest `financial-aid-tuition`.** After review, the user trimmed that area
   from nine prose cards to **In-Depth Report + Fees only**. That was done at the data
   layer: six `##` headings in
   `source-material/financial-aid-tuition/charlotte-catholic/…md` were demoted to `###`,
   and `## Fees` was moved to the end of the file so it absorbs no trailing subsection.
   Re-running `build_docs.py` on this topic is safe (the heading levels are committed), but
   **re-ordering or re-promoting those headings would bring the deleted cards back**. No
   research was lost — every figure is still in the file and still renders inside the two
   surviving cards.
2. **The branch carries four cross-school UI fixes** unrelated to translation. They are
   already committed; Phase 2 should carry them into the PR body rather than treat them as
   stray diff. See "UI fixes" below.

### What shipped, against what the plan predicted

| Plan said | Actually shipped | Why |
|---|---|---|
| `media` is a confirmed `null` | **CCHS HAS publications** | The curriculum guide's Journalism (234) and Yearbook (235) descriptions state students publish the school newspaper, literary magazine, yearbook and a podcast — as English courses, not clubs. Recorded as a NOT-A-CLUB flag on the Honor Societies card. Also: `media`, `tuition-history` and `recruiting` are **prose card keys, not Compare rows** — the plan listed them as rows. |
| Brand is "green and gold" | **Light blue** — `#3a759e`, initials `CH` | Wikipedia's infobox says light blue/white/red and the school's own stylesheet has no green at all. `#75b2dd` is the site's real accent, deepened along the same hue (204.8°) to reach 4.98:1 white-on-badge. This also dissolves the plan's Country-Day-green collision worry. Provenance in `source-material/branding/charlotte-catholic/`. |
| `bucket-ivyplus` 7/17 | **9/17** | The app's own Ivy Plus set (derived from what other schools tag) includes Georgetown and Northwestern. |
| `bucket-nu75` 35/75 | **36/75** | Derived from the master `collegeRankings.ts`, not estimated. |
| `bucket-p4` ~46/68 | **39/68** | The dedupe the plan flagged was real: 40 name-rows → 39 institutions (the two Arizona State campuses are one university). |
| `d1-commits-2426` 26 | **25** | Mary Catherine Farley (Wofford) appears on a signing list but never on a college roster, so she fails the corroboration bar every other athlete clears. `p4-commits-2426` = **10**, exactly as planned. |
| step 12 lists 6 i18n scripts | **7** | `scripts/check_rank_labels.mjs` has its own hardcoded `SCHOOLS` list the plan's table missed. Added. |
| — | **5 lifted chrome `xTitle`s removed** | `nilTitle`, `pathTitle`, `leadershipTitle`, `adjacentTitle`, `rosterTitle` — the Covenant-Day-7 / Gaston-Day-5 defect, caught in Phase 1 by `npm run i18n:report`, which now reports `✓ every string field is classified`. |

Other figures landed exactly as planned: **195 courses** (24 AP + 43 Honors + 18 Advanced),
**169 institutions**, **76 clubs**, **6/8 Ivy**, **17/75 LAC**, **2/107 HBCU**.

### Coverage

**24 of 30 Compare rows (80%), 7 of 8 areas** — above the plan's ~23/30 estimate and well
clear of the 17/30 floor. 9th of 11 on fill. Expanded, the page renders **133k characters
across 34 cards** against Providence Day's 164k/33, so the rich areas were not capped at a
thin school's depth.

### UI fixes on this branch (cross-school, not CCHS-specific)

All four were found during the user's review and fixed in shared CSS/components, so **every
school gets them**. Each was regression-checked in a real browser across all 11 schools.

1. **Hairline grids lost their bottom rule on a ragged last row.** `.stat-strip`,
   `.hairline-grid` and `.fa-contents` drew top+left rules per cell and relied on the cell
   below to close each one. College Support runs 8 tiles across 5 columns, so the tiles
   above the gap had no bottom edge. Cells now draw a bottom rule too. Verified: 29 ragged
   grids across 11 schools, zero missing rules.
2. **The counseling roster painted a grey block and overflowed.** `.cs-roster` /
   `.cs-timeline` used `gap: 1px` over `background: var(--border)` — the exact pattern the
   `.stat-strip` comments warn against — so empty cells showed the backing field, and long
   emails pushed the grid 88px past the card. Now per-cell hairlines plus `min-width: 0` /
   `overflow-wrap: anywhere`.
3. **The roster forced 5 columns.** `min(roster.length, 5)` made 7 counselors sit in
   ~175px columns, wrapping emails mid-word while the short last row sat half empty. Now
   `repeat(auto-fit, minmax(232px, 1fr))` — 232px clears the longest address on one line.
4. **`.fa-split` always rendered a left column.** A section with questions but no stats or
   boxes left the checklist pinned beside dead space. It now spans full width when there is
   nothing to sit beside.

### A scroll-frame sweep was run across all 11 schools

The Club Catalog was capped at **420px** in a scroll frame (the `.courselist` pattern) —
76 clubs rendered ~3,500px, burying the card's own division notes and sources. It shrinks
below the cap when the list is short, so only schools that need a scrollbar get one.

**Deliberately not capped, having measured every list-like block on every school:** Honor
Societies (3–11 rows, 225–534px), Academic & Competitive Clubs (2–6 collapsible rows,
already progressive disclosure — nesting a scroller inside `<details>` would be worse), and
the tour checklists (`as-checklist` 907px worst case, `cs-checklist`, `arts-asks`,
`fa-questions`) which are meant to be read straight through and printed. Every large table
in the app — including Charlotte Christian's 96-row, 6,448px summer catalog — was already
capped at 320px.

### Known, pre-existing, NOT introduced here

At mobile widths with **every `<details>` force-expanded**, the page overflows horizontally
by ~47,766px. Measured on `main` before this branch: **byte-identical**. A real user never
hits it — with panels closed the page has **zero** overflow at 390px. Not chased, to keep
this change's scope honest. Worth its own plan.

### Phase 2 scope is unchanged

Nine prose locales (`es, bn, ht, te, fr, fa, it, hi, ar`), per the Phase 2 steps above.
Every string on the page is English today. The slug is already in all seven i18n scripts
(Phase 1 step 12), so the extractor sees the school — but **still verify the strings appear
in the work files by inspection**, per Phase 2 step 1.

## Implementation notes — Phase 2 (locales), 2026-08-18

All nine `PROSE_TRANSLATED` locales shipped: **es, bn, ht, te, fr, fa, it, hi, ar**.
~1,085 strings per locale (~9,765 total) across the structured layer plus the
`src/content` financial-aid blocks. `check:runtime` went from **10,269 → 11,344**
resolving entries per locale, uniform across all nine, no orphans.

### The backfill was lossless

Existing translations were carried by content hash, not re-extracted: **10,214
prior strings per locale restored byte-identical, 0 mismatches**. No shipped
wording for the other ten schools changed.

### Three defects found, none of them translation defects

1. **A stranded mid-sentence fragment on the live English page.** The provenance
   strip added in `0536fd2` tracked *blockquote* continuations but not *bullet*
   ones, and `- **Method:** …` wraps across four lines in the research files. The
   Financial Aid area opened with " affordability page — **not** from the CCHS
   site…". Fifteen sections across eight topics were affected. Fixed in `eb2efa6`;
   provenance stays fully stripped (0 occurrences under `src/content`). A recovery
   subagent refused to translate the damaged blocks and reported this instead —
   the correct call, since translating them would have locked the fragments into
   nine locales.
2. **Sport bar widths stored as percentages, not fractions** (`a486a54`).
   `SportsProgram.tsx` renders `width: ${w * 100}%`, so 21 CCHS values authored as
   `100`/`62`/`30` became 6200%–10000% — bars up to 58,800px, overflowing the page
   by **58,070px** with panels expanded, in every locale **including English**.
   Providence Day overflows 0 at the same width. A Phase 1 defect that only the
   Phase 2 browser sweep caught.
3. **22 genuine cross-locale leaks** fixed to consensus via `i18n:leaks`.

### Two structural findings worth carrying forward

- **Overlay entries are keyed by content hash, so identical English is SHARED
  across schools.** `Basketball` is one entry spanning 15 paths, only 3 of them
  CCHS; `Soccer` 11/2; `Athletic Director` 4/2. Such a string **cannot** be fixed
  for one school — editing it rewrites every school that shares it. `Athletic
  Director` is a real hi/fr leak that is currently unfixable per-school; it needs
  either a hash split or a deliberate all-schools translation.
- **A leak flag is often a locale's own convention, not a miss.** `hi` and `fa`
  keep standalone roster sport labels in Latin at every school; `it` translates
  them. Fixing to a cross-locale "consensus" would have made those locales
  internally inconsistent. Decide per locale against its own shipped choices.

### Verification

`check:runtime` green for all 9 · `check:sepdrift` exactly at pre-existing
baseline in every locale (es 178, ht 1, fa 1, six at 0) · `check:script`,
`check:bidi`, `check:fa`, `check:hi`, `check:fr`, `check:currency`, `check:money`,
`check:hashes` all pass · `tsc`, `npm run build`, `check:seo`, `check:schema`,
`check:ranks` clean. Browser sweep across all ten locales with every `<details>`
expanded: 113k–144k rendered chars, `$17,242,184` intact, `dir=rtl` for fa/ar,
After School correctly absent, **0px** horizontal overflow.

### Still open

Native-speaker review of Charlotte Catholic's new prose in every locale — the one
failure mode no check here reaches. Kreyòl and Hindi remain unreviewed generally.
