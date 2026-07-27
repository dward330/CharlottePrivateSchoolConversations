# Charlotte Country Day School — College Support (Redesign Research 2026)

## Provenance

- **School:** Charlotte Country Day School (CCDS / "Country Day"), 1440 Carmel Road, Charlotte, NC 28226
- **Researched by:** Claude, via live web research (WebSearch + WebFetch, with local PDF text extraction via `pypdf` for school-published PDFs that do not render as text)
- **Date of research:** 2026-07-26
- **Method:** Primary sources were the school's own published PDFs (2025-26 School Profile, 2024-25 School Profile, 2015-16 School Profile, College Acceptances 2023–2026, College Acceptances 2022–2025), the school's College Counseling web pages, and school news posts. Selectivity tiering was scored against 2026 U.S. News rankings.
- **Identifiers:** CEEB / High School Code **340666**; IB Code **0667**
- **Key caveat:** The school published **two different "current" data sets** during this window — the **2025-26 School Profile** (Class of 2025 data, dated ~Oct 2025) and the **Class of 2026 outcomes news post + College Acceptances 2023–2026 PDF** (dated May 2026). Where they differ, both are shown below and the discrepancy is flagged. They are not contradictory so much as *different graduating classes*, but the school's own College Counseling landing page mixes them without labeling, which is a genuine sourcing hazard.

### A note on bold detection in the acceptance PDFs

The acceptance-list PDFs mark matriculation with **bold** type, which is lost in plain text extraction. Bold names were recovered programmatically by inspecting the embedded font of each text run (`/BaseFont` containing "Bold") in the PDF content stream. The 70 bolded names recovered from the 2023–2026 PDF match the school's separately published claim of "70 colleges/universities" attended by the Class of 2026 exactly — a strong cross-validation of the method.

---

## Card — The Transcript Colleges See

### AP scope

**2025-26 Profile (2025 exam administration, most recent):**

| Metric | Value |
|---|---|
| AP exams sat | **530** |
| Students sitting AP exams | **238** |
| Overall % scoring 3+ | **93%** |
| Overall % scoring 4 or 5 | **74%** |
| AP courses offered | **25** |
| Honors subject areas | **17** |

**AP results by discipline (2025):**

| Discipline | % Tests Scoring 3+ | % Tests Scoring 4 or 5 |
|---|---|---|
| English | 97% | 77% |
| Fine Arts | 81% | 36% |
| History / Social Science | 99% | 89% |
| Math | 88% | 67% |
| Modern & Classical Languages | 82% | 44% |
| Science | 87% | 66% |
| **Overall** | **93%** | **74%** |

**Prior year for trend (2024-25 Profile, 2024 exam administration):**

| Metric | Value |
|---|---|
| AP exams sat | 532 |
| Students sitting AP exams | 223 |
| Overall % scoring 3+ | 89% |
| Overall % scoring 4 or 5 | 70% |
| AP courses offered | 24 |
| Honors subject areas | 14 |

By discipline (2024): English 94%/69%; Fine Arts 71%/30%; History/Social Science 94%/83%; Math 74%/56%; Modern & Classical Languages 90%/77%; Science 93%/68%; Overall 89%/70%.

> **Trend note:** Every discipline except Modern & Classical Languages improved from 2024 to 2025; Math moved the most (3+ rate 74% → 88%). Modern & Classical Languages fell (90% → 82% on 3+, and 77% → 44% on 4/5) — a large single-year swing the school does not explain.

### Exam policy / AP access policy

Verbatim from the 2025-26 Profile (identical wording in 2024-25):

> "AP courses are generally not available until the junior year. We recommend students take no more than three APs each year, but we do not limit."

- **AP access is gated by year, not capped by count.** APs start junior year; the three-per-year figure is an explicit *recommendation* with an explicit *non-limit*.
- The school does **not** publish a mandatory-AP-exam policy (i.e. whether enrollment in an AP course obliges the student to sit the exam). `NOT PUBLISHED`.
- From the Upper School curriculum page: "The final AP exam is the driver for the curriculum, and all AP courses are taught with the intention of students earning high marks on these exams." This implies strong exam expectation but is not a stated requirement.
- Historic (2015-16 Profile) note on advanced-course gating: "Enrollment in these Honors and AP-level courses requires a grade qualification based on performance in the year prior." Whether that prerequisite gate still applies in 2025-26 is `TO VERIFY` — the current profile does not repeat it.

### AP load distribution

**Class of 2026** (2025-26 Profile; excludes students in the IB program):

| APs taken across Upper School | Students |
|---|---|
| 0–2 | 42 |
| 3–5 | 47 |
| 6+ | 53 |

- 81% of the Class of 2026 enrolled in at least one AP class during Upper School.
- 85% of Upper School students take at least one advanced course (Honors, AP, or IB) before graduation.

**Class of 2025** (2024-25 Profile), for contrast: 0–2: 54 students; 3–5: 44; 6+: 40. 77% enrolled in ≥1 AP; 82% took ≥1 advanced course.

> The advanced-course load is rising: the 6+ AP cohort grew from 40 to 53 students year over year, and the 0–2 cohort shrank from 54 to 42.

### National Merit ledger by class year

| Class | Semifinalists | Finalists | Commended | Other | Source |
|---|---|---|---|---|---|
| 2015 | 4 | 4 | 10 | — | 2015-16 Profile |
| 2018 | 7 | NOT PUBLISHED | 8 | — | News, 10/1/18 |
| 2021 | 9 | NOT PUBLISHED | 8 | 17 total in 97th pctile+ | News, 9/29/20 |
| 2022 | 11 | NOT PUBLISHED | 13 | — | News, 10/8/21 |
| 2024 | 7 | 7 | 2 | 1 Scholar; 1 College-Sponsored Scholar | 2024-25 Profile |
| 2025 | 2 | 2 | 5 | — | 2025-26 Profile |
| 2026 | **6** | **5** | **13** | 1 NMSC Special Scholarship (C.D. Spangler Foundation) | News 9/25/25 (SF) + News 5/26/26 (F/C) |

Notes and cautions on this table:

- **Class-year labelling is inconsistent across sources and is the single biggest trap here.** The 9/29/20 post explicitly names "Class of 2021"; the 10/8/21 post says "senior class" in Oct 2021, i.e. Class of 2022. Semifinalist announcements land in the fall of senior year, so a Sept 2025 announcement = Class of 2026.
- The 9/25/25 post ("six National Merit Semifinalists") names: Benjamin Eligator, Tilly King, Caroline Mallard, Brady Mills, Ella Grace Parsons, Soraya Shah. Six semifinalists → five finalists is internally consistent with the May 2026 post.
- **Class of 2025 is a conspicuous trough** (2 SF / 2 F / 5 Commended) between Class of 2024 (7/7/2) and Class of 2026 (6/5/13). Both neighbouring years are 3x higher. This is school-reported in the official profile and is not obviously an error, but it is an outlier worth asking about. `TO VERIFY`
- **College Board National Recognition Program awards: NOT PUBLISHED.** Despite a school news headline referencing academic recognition programs, no CCD source found publishes a count of College Board National Recognition Program awardees (National African American / Hispanic / Indigenous / Rural & Small Town / First-Generation Recognition). Do not populate this metric.

### AP Scholar ledger (historic — no recent data)

| Year announced | National AP Scholar | Distinction | Honor | AP Scholar | Total | Exams / Courses |
|---|---|---|---|---|---|---|
| 2018 | 10 | 45 | 8 | 30 | — | 459 exams / 23 courses |
| 2020 | 7 | 56 | 17 | 25 | 98 | 481 exams / 27 courses (avg score 4.02) |
| 2021 | NOT PUBLISHED | 38 | 19 | 28 | 85 | 506 exams / 26 courses |

> **AP Scholar counts have not been published since the 2021 news post.** The 2024-25 and 2025-26 School Profiles report AP *score distributions* but no AP Scholar award counts. `NOT PUBLISHED` for recent classes.

### IB Diploma Programme (a genuine CCD differentiator)

- Charlotte Country Day was the **first school in North Carolina to offer the IB Diploma Program**. (2025-26 Profile says "first school in North Carolina"; the 2015-16 Profile says "the only one offered by a private school in North Carolina" — a claim of exclusivity that has since been dropped.)
- **~20 students enroll in the full IB Diploma each year, in their junior year.**
- **Five-year average IB Diploma pass rate: 88%** (2025-26 Profile).
  - **DISCREPANCY:** The 2024-25 Profile states the five-year average pass rate is **91%**. Both are "over the last five years" claims from consecutive profiles. Show both.
- Historic single-year pass rates: IB Class of 2018 100%; IB Class of 2020 100%; IB Class of 2021 96%.
- IB Code 0667. The 2015-16 Profile references 24 IB courses.

### Post-AP course depth

The 2025-26 Profile publishes an explicit three-column "MOST RIGOROUS COURSES BY DISCIPLINE" table with a dedicated **Post-AP** column — a deliberate signal to admissions readers that the ceiling extends past AP.

| Discipline | Post-AP offerings |
|---|---|
| **Mathematics** | Advanced AP Statistics with R and R Studio; **Calculus III / IB Analysis HL** |
| **Sciences / Technology** | Organic Chemistry (0.5); Physical Computational Biochemistry (0.5) |
| English | *(none listed in Post-AP column)* |
| History & Social Studies | *(none listed in Post-AP column)* |
| Modern & Classical Languages | *(none listed in Post-AP column)* |
| Fine Arts | *(none listed in Post-AP column)* |

- **Post-AP math:** Calculus III (dual-listed with IB Analysis HL) is the top of the math sequence. AP Calculus BC feeds it. There is also a post-AP *statistics* path (Advanced AP Statistics with R and R Studio) — unusual, and a real signal for quant-leaning applicants.
- **Post-AP science:** Organic Chemistry is a semester elective; the 2015-16 profile states it is "for students who have completed AP or IB Chemistry." Physical Computational Biochemistry is the newer addition (present 2025-26).
- **Computer science:** AP Computer Science A is offered, sitting in the Mathematics row. **There is no post-AP CS course listed** (no Data Structures, no AP CS Principles listed either). This is a genuine gap relative to the math/science depth. `NOT PUBLISHED` / appears absent.
- **World language:** The ceiling is AP or IB HL (AP French / IB French HL; AP Spanish / IB Spanish HL; AP Latin / IB Latin; IB Chinese). Honors Chinese runs I–V. **No post-AP language seminar is listed.** Note the 2015-16 profile listed **German** (Honors German II/III/IV, Advanced German Study) — German no longer appears in the 2024-25 or 2025-26 profiles, so the language roster has *contracted* to Chinese, French, Spanish, Latin.

### Beyond-campus academic options

There is **no Global Online Academy (GOA) membership** listed on the off-campus learning page or either recent profile. `NOT PUBLISHED` / appears absent. Do not assume GOA.

What CCD *does* offer off-campus (from the Off-Campus Learning page):

| Program | Detail |
|---|---|
| **School Year Abroad (SYA)** | Semester or full year in Rennes (France), Zaragoza (Spain), or Viterbo (Italy); host family; courses in the target language plus American core courses; earns Upper School graduation credit |
| **Maine Coast Semester at Chewonki** | Juniors; ~40 students nationally; half academic year on a 400-acre coastal Maine peninsula; earns one co-curricular credit plus fine arts studio credit |
| **ALZAR** | Semester program in Patagonia and Idaho; experiential, Chilean cultural immersion; core subjects required, limited AP exams offered on national testing days |
| **Sister school exchanges / study trips / service learning** | Faculty-led, ~two weeks, typically June; academic credit "as able"; run by the International Studies office |
| **Science Outreach Program** | Summer; rising juniors/seniors work with science professors at local institutions on primary research; present at the annual Science Symposium |

> **Important transcript caveat, verbatim from the school:** outside summer courses "do not transfer to the Country Day transcript or factor into a student's GPA," and Country Day does not offer summer courses for credit. This is a meaningful policy — no summer grade-padding, and no summer credit recovery.

### How the grade is engineered to be trusted

**Weighting (stable across all three profiles reviewed — 2015-16, 2024-25, 2025-26):**

> "Weighted Courses: 0.5 is added to the GPA calculation for Honors courses. 1.0 is added for AP/IB courses."

- This is a **flat additive bump on a 4.0 base**, not a quality-point table. Ceiling is therefore ~5.0 for an all-AP/IB load. Observed top-quintile median weighted GPA of 4.472 (Class of 2025) is consistent with that.
- **No separate "quality points" table is published.** `NOT PUBLISHED`.

**Grading scale — DISCREPANCY between consecutive profiles:**

| 2025-26 Profile (granular, +/- bands) | 2024-25 Profile (coarse, whole letters) |
|---|---|
| A+ 100–98, A 97–93, A- 92–90 | A 100–90 |
| B+ 89–87, B 86–83, B- 82–80 | B 89–80 |
| C+ 79–77, C 76–73, C- 72–70 | C 79–70 |
| D+ 69–67, D 66–63, D- 62–60 | D 69–60 |
| F 59–0 | F 59 and below |

> **Flagged discrepancy.** These are not the same scale. The 2025-26 profile publishes a full plus/minus band structure including an **A+ (98–100)** tier; the 2024-25 profile publishes only whole-letter ranges. Either the school changed its grading scale between 2024-25 and 2025-26, or the earlier profile simply summarized. The presence of an A+ band materially affects whether an unweighted GPA can exceed 4.0. `TO VERIFY` with the school — this is a good tour question.

**Class rank policy — the important structural point:**

- **No class rank statement appears anywhere** in the 2025-26, 2024-25, or 2015-16 School Profiles, nor on the For College Representatives page. There is no "Charlotte Country Day does not rank" sentence to quote. `NOT PUBLISHED` as an explicit policy statement.
- **However, CCD does not report a rank; it reports a quintile table** — and has done so continuously since at least 2015-16. This is the functional equivalent of "we don't rank, but here is the shape of the class," and it is *more* informative to an admissions reader than most no-rank schools provide, because it ties GPA bands to median test scores.
- **The 2025-26 quintile table is materially richer than any prior year** — it adds median SAT and median ACT per quintile, which the 2024-25 and 2015-16 tables did not have. See the Whole Class Analytics card.

**Defined "most rigorous" course-load norms:**

- CCD does **not** publish a numeric definition of "most rigorous" (e.g. "5 of 6 core courses at AP/IB level"). `NOT PUBLISHED`.
- What it publishes instead is (a) the "MOST RIGOROUS COURSES BY DISCIPLINE" table naming the specific Honors / AP-IB / Post-AP course that constitutes the ceiling in each discipline, and (b) the AP-load distribution buckets (0–2 / 3–5 / 6+) that let a reader locate a candidate against classmates. Combined with the quintile table, a reader can triangulate rigor without a stated rubric.
- The school's stated *philosophy* cuts against a maximal-load norm, verbatim: "we value the opportunity for reflection as students select the areas in which they want to engage with highest rigor, balancing challenge with intentionality."

### Sources

- https://resources.finalsite.net/images/v1759320688/charlottecds/dn5vss9ud5xxwzyt70ah/CCDSSchoolProfile2025-2026-FINAL.pdf
- https://resources.finalsite.net/images/v1726775598/charlottecds/enzt08thdabvh3uxiz0i/2024-2025CCDSSchoolProfile.pdf
- https://www.charlottecountryday.org/uploaded/country_day_education/college_guidance/CCDSCollegeProfileFINAL.pdf
- https://www.charlottecountryday.org/cd-education/upper-school/us-curriculum
- https://www.charlottecountryday.org/cd-education/upper-school/us-curriculum/off-campus
- https://www.charlottecountryday.org/cd-education/upper-school/international-baccalaureate
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/congratulations-national-merit-semifinalists
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/students-shine-in-academic-recognition-programs
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/academic-recognitions
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/celebrating-academic-honors
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/class-of-2026-college-admissions-outcomes

---

## Card — The Counseling Engine

### Staffing and ratio

| Metric | Value | Source |
|---|---|---|
| Full-time college counselors | **5** | College Counseling landing page (2026) |
| Upper School enrollment | **548** | 2025-26 Profile |
| Senior class size | **141** (Class of 2025 and Class of 2026 both) | 2025-26 Profile; 5/26/26 news post |
| **Counselor : Upper School student ratio** | **~1 : 110** | Derived — 548 ÷ 5. `TO VERIFY` — this is a computed figure, not school-published. |
| **Counselor : senior ratio (caseload)** | **~1 : 28** | Derived — 141 ÷ 5. `TO VERIFY` — computed. The real caseload is likely juniors + seniors, i.e. ~1:56. |
| Combined admissions experience | "more than 100 years" | College Counseling landing page |

> The school does **not publish a counselor:student ratio** itself. `NOT PUBLISHED` as a stated figure — both ratios above are my arithmetic and must be tagged as derived if surfaced in the app.

### Named roster — and a live leadership transition

**DISCREPANCY / TRANSITION — this is the most important thing on this card.** Two official CCD sources name **different Directors of College Counseling**, and both are correct as of their own date:

| Source | Director named | Team as listed |
|---|---|---|
| **2025-26 School Profile** (pub. ~Oct 2025) | **Catherine Odum, Director** | Meredith High (Assoc. Dir.), Brooke Tevlin (Assoc. Dir.), Jonathan Woog (Assoc. Dir.), Donna Witman (Registrar) |
| **College Counseling web pages** (current, 2026) | **Allison Tate, Director** | Catherine Odum (**Senior** Assoc. Dir.), Meredith High (Assoc. Dir.), Brooke Tevlin (Assoc. Dir.), Jonathan Woog (Assoc. Dir.) |

**Resolution:** A school news post dated **2/18/26** announces **Allison Slater Tate appointed Director of College Counseling, effective July 1, 2026**, following a national search. Catherine Odum has moved to **Senior Associate Director**. So:

- Through the Class of 2026 cycle, the office was led by **Catherine Odum**.
- From **July 1, 2026** (i.e. the Class of 2027 cycle onward), it is led by **Allison Slater Tate**.
- The 2025-26 School Profile is now **stale on this point** and will presumably be corrected in the 2026-27 profile.

**Current roster (2026-27 forward):**

| Name | Title | Contact |
|---|---|---|
| **Allison Slater Tate** | Director of College Counseling (eff. 7/1/2026) | allison.tate@charlottecountryday.org · (704) 943-4713 |
| **Catherine Odum** | Senior Associate Director of College Counseling | catherine.odum@charlottecountryday.org · (704) 943-4683 |
| **Meredith High** | Associate Director of College Counseling | meredith.high@charlottecountryday.org |
| **Brooke Tevlin** | Associate Director of College Counseling | brooke.tevlin@charlottecountryday.org |
| **Jonathan Woog** | Associate Director of College Counseling | jonathan.woog@charlottecountryday.org |
| **Donna Witman** | Registrar | donna.witman@charlottecountryday.org |

Office: college@charlottecountryday.org · (704) 943-4680

**Director tenure / lineage** (assembled from profiles across years):

- **2015-16:** Katie Elsasser, Director. Catherine Loftin Odum, Associate Director. Jonathan Woog, **Assistant** Director.
- **2024-25:** Catherine Odum, Director. (Team: High, Woog, Witman — **Tevlin not yet listed**.)
- **2025-26:** Catherine Odum, Director. (Tevlin now listed — so Brooke Tevlin joined between the 2024-25 and 2025-26 profiles.)
- **2026-27:** Allison Slater Tate, Director; Odum → Senior Associate Director.

> **Jonathan Woog has been in the office since at least 2015-16 — 10+ years of continuity**, rising from Assistant to Associate Director. Catherine Odum has been in the office since at least 2015-16 as well (11+ years), serving as Associate Director → Director → Senior Associate Director. That is unusually deep institutional memory, and it materially softens the risk of the 2026 director change.

**Individual bios/credentials:** The Meet Our Team page publishes **names, titles, and contact information only** — no tenure, degrees, prior employers, or credentials for any counselor. `NOT PUBLISHED`.

What *is* published about the incoming Director (2/18/26 news post), verbatim fragments: "extensive experience in both independent and public school settings"; has "built and led comprehensive college counseling programs"; a "nationally published writer and frequent speaker on college admissions, parenting, adolescent mental health, and student development." Specific prior employers, degrees, and years of experience are **NOT PUBLISHED** by the school. `TO VERIFY`

### The four-year 9→12 timeline (named programming)

This is published in detail on the BucsNet college counseling page and is one of CCD's stronger disclosures.

**9th Grade — "Settle In, Discover, and Grow"**
- **Freshman Seminar** — introduction to the college process
- **PSAT in March** (school-administered)
- Introduction to their college counselor (spring)
- **Introduction to the Scoir platform** (spring)
- Focus: foundational habits, exploring interests, forming teacher relationships

**10th Grade — "Think Strategically"**
- **PreACT in October** (school-administered)
- **Charlotte Area Case Studies program in April** — a named, distinctive event; a mock-admissions-committee exercise run across Charlotte-area schools
- Begin meeting with the college counselor (winter)
- Local college visits encouraged
- Focus: intentional course selection, understanding IB/AP options, deepening extracurriculars

**11th Grade — "Engage with Purpose and Begin Your College Search"**
- **PSAT in October** (the National Merit Scholarship Qualifying Test)
- **College Night for Juniors in November**
- College representative visits, fall and spring
- One-on-one counselor meetings begin at the start of second semester
- SAT and/or ACT registration and testing; diagnostic for both recommended; possible retest spring or early fall senior year
- **Teacher recommendation letters requested by end of junior year**
- Begin drafting essays and the Common Application over the summer

**12th Grade — "Find Colleges That Are Right for You"**
- **College Application and Essay Workshop in August** (before senior year starts)
- College representative visits throughout the fall
- Complete testing if needed
- **Financial aid forms** and **SRAR/STARS** self-reported academic record where required
- Interview preparation; waitlist decision navigation with the counselor

> **Counselor assignment timing:** students are *introduced* to a counselor in 9th grade (spring), *begin meeting* in 10th (winter), and move to **one-on-one meetings from the start of junior second semester**. The College Search Process page frames it as "each student receives a college counselor who provides holistic guidance" in grades 11–12. So the intensive relationship is a two-year one, layered on two years of lighter contact.

### Application mechanics the office owns

| Mechanic | Evidence |
|---|---|
| **Applications** | Common Application; Scoir for document transmission and college research. Class of 2026 submitted **1,107 applications to 203 institutions** (avg ~8 per student). |
| **Essays** | Named **College Application and Essay Workshop in August** of senior year; drafting begins summer after junior year |
| **Testing** | School-administered **PSAT (gr. 9, March)**, **PreACT (gr. 10, October)**, **PSAT/NMSQT (gr. 11, October)**; office advises diagnostic-both-then-choose, and explicitly notes "Most colleges are now test-optional, meaning students choose whether their SAT or ACT scores are included in their application." |
| **Teacher recommendations** | Requested by end of junior year. The College Search Process page describes CCD letters as "extensive and uniquely individualized." |
| **Financial aid** | FAFSA and financial aid forms handled in senior year; the College Search Process page references "financial aid consideration support" |
| **Scholarship search** | The College Search Process page references "scholarship evaluation assistance." No named scholarship-search tool or database is published. `NOT PUBLISHED` |
| **Transcripts / school report** | Owned by **Donna Witman, Registrar** — a dedicated registrar role separate from the counseling staff |
| **Accommodations** | The **Educational Resource Program** "assists in requesting accommodations with the College Board, ACT, and IB" — i.e. testing accommodations are handled by ERP, not the college office |

### Reach and tools

| Metric | Value | Source |
|---|---|---|
| **College rep visits / year** | **150+ college admissions officers visit each year** | College Counseling landing page |
| **Rep visit window (2026)** | **August 24 – November 20, 2026** | For College Representatives page |
| **Rep visit format** | 60-minute sessions with juniors and seniors; five daily slots — 8:00, 9:35, 10:45, 1:00, 2:10 | For College Representatives page |
| **Platform** | **Scoir** (both for students and for rep-visit scheduling via Scoir Visits) — *not* Naviance, *not* MaiaLearning | For College Representatives page; BucsNet timeline |
| **Also used** | Common Application; FAFSA; SRAR / STARS self-reported academic record | BucsNet timeline |
| **Published School Profile** | **Yes** — annually, as a public PDF, with CEEB 340666 and IB 0667 on the cover | 2025-26 Profile |
| **Campus visits made by staff** | **NOT PUBLISHED** — no count of colleges visited by counselors per year is published anywhere | — |

**Professional memberships held by the school (from the Profile's "Selected Memberships" block)** — directly relevant to counseling credibility:

- **Association of College Counselors in Independent Schools (ACCIS)**
- **National Association for College Admission Counseling (NACAC)**
- **Southern Association for College Admission Counseling (SACAC)**
- Also: NAIS, NCAIS, Cum Laude Society, CASE, The College Board, IB Diploma Programme

> Note: ACCIS, NACAC and SACAC memberships appear in the 2025-26 and 2024-25 Profiles but **do not appear** in the 2015-16 Profile's membership list — these are relatively recent formalizations.

### Sources

- https://www.charlottecountryday.org/cd-education/college-counseling
- https://www.charlottecountryday.org/cd-education/college-counseling/meet-our-team
- https://www.charlottecountryday.org/cd-education/college-counseling/college-search-process
- https://www.charlottecountryday.org/cd-education/college-counseling/for-college-representatives
- https://www.charlottecountryday.org/bucsnet/upper-school/college-counseling
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/allison-slater-tate-appointed-director-of-college-counseling
- https://www.charlottecountryday.org/cd-education/educational-resource-program
- https://resources.finalsite.net/images/v1759320688/charlottecds/dn5vss9ud5xxwzyt70ah/CCDSSchoolProfile2025-2026-FINAL.pdf
- https://resources.finalsite.net/images/v1726775598/charlottecds/enzt08thdabvh3uxiz0i/2024-2025CCDSSchoolProfile.pdf
- https://www.charlottecountryday.org/uploaded/country_day_education/college_guidance/CCDSCollegeProfileFINAL.pdf

---

## Card — Where Graduates Go

### Outcomes headline

**Class of 2026** (news post 5/26/26 — the freshest and most detailed outcomes disclosure CCD has ever published):

| Metric | Value |
|---|---|
| Class size | **141 seniors** |
| Colleges/universities **attended** | **70**, across 23 states, Washington D.C., and Canada |
| Colleges/universities **admitted to** | **170** unique institutions |
| Applications submitted | **1,107**, to **203** institutions (avg ~8 per student) |
| Scholarship offers | **over $14.7 million** |
| Out-of-state / in-state | **68% out-of-state / 32% in-state NC** |
| Private / public | **45% private / 55% public** |
| Seniors competing in college athletics | **13** |
| **UNC-Chapel Hill matriculants** | **32 students** — by far the single largest destination |
| % to four-year college | "100% of seniors admitted to college" (landing page) |

**Class of 2025** (2025-26 School Profile):

| Metric | Value |
|---|---|
| Class size | **141 seniors** |
| Scholarship offers | **$13 million** |
| Student-athletes continuing in college | **18** (and **61** across the last four classes) |

**Class of 2025 college destination by region** (2025-26 Profile):

| Region | Share |
|---|---|
| Southeast | 33.3% |
| North Carolina | 29% |
| Northeast | 13% |
| Mid-Atlantic | 11.6% |
| Southwest | 5.8% |
| West | 4.3% |
| Midwest | 2.2% |
| International | 0.7% |

> Regional split confirms a **strongly Southeast-anchored** outcome: NC + Southeast = **62.3%** of the Class of 2025. Only 2.2% went to the Midwest.

> **DISCREPANCY / labelling hazard — flag this prominently.** The College Counseling landing page presents "**170** admitted colleges", "**1,107** applications", "**$14.7 million** in scholarships" and "**34** recipients of the Morehead-Cain" *side by side on one page*, and a WebFetch of that page attributes the first three to the "Class of 2026." But:
> - **$14.7M / 170 / 1,107 are Class of 2026 figures** (confirmed by the 5/26/26 news post).
> - **$13M is the Class of 2025 figure** (2025-26 School Profile). Do not mix.
> - **The "34 Morehead-Cain recipients" figure is NOT a single-year number.** The Class of 2026 post names exactly **1 Morehead-Cain Scholar**. 34 is a **cumulative/historic** count of Morehead-Cain recipients over many years. Presenting 34 as a class-year statistic would be badly misleading. `TO VERIFY` — the school does not state the time window for the 34.

### % to four-year college

- The College Counseling landing page states **"100% of seniors admitted to college."** Note this is an *admission* rate, not a matriculation rate.
- Niche reports "After graduation, 100% of students from this school go on to attend a 4-year college" — third-party, not school-published. `TO VERIFY`
- The Class of 2026 post's own framing (141 seniors attending 70 institutions across 23 states + DC + Canada) is consistent with ~100% four-year matriculation but the school does not state a matriculation percentage explicitly. **A precise "% enrolling at a four-year college" is NOT PUBLISHED.**

### The acceptance list — year range and caveat

Two lists are currently published:

| List | Year range | Bold convention | "As of" date | Count |
|---|---|---|---|---|
| **College Acceptances 2023–2026** (current) | **2023–2026** (four graduating classes) | "Bold indicates schools enrolling one or more members of the **Class of 2026**" | **5/28/2026** | ~320 institutions |
| College Acceptances 2022–2025 (in 2025-26 Profile) | **2022–2025** | "Bold indicates schools enrolling one or more members of the Class of 2025" | 8/15/2025 | ~300 institutions |
| College Acceptances 2020–2023 (legacy PDF still linked) | 2020–2023 | — | — | — |

> **ACCEPTANCE vs MATRICULATION CAVEAT — essential.** This is a **four-year cumulative acceptance list**, not a one-year list and not a matriculation list. Roughly **320 institutions** appear because ~564 students across four classes each applied to ~8 colleges. Only the **70 bolded names** represent institutions actually **enrolling** a member of the Class of 2026. Any headline that reads "CCD students get into Yale/Princeton/MIT" is drawing on a four-year acceptance pool. Always pair the list with (a) the four-year range, (b) the bold = enrolling convention, and (c) the fact that 141 students spread across 70 destinations.

### Where the Class of 2026 actually enrolled (the 70 bolded institutions)

Recovered by font analysis of the 2023–2026 PDF. This count matches the school's stated "70 colleges/universities" exactly.

Agnes Scott College · Appalachian State University · Auburn University · Bates College · Berklee College of Music · Boston University · Bucknell University · Carnegie Mellon University · Clark Atlanta University · Clemson University · College of Charleston · Duke University · East Carolina University · Elon University · Embry-Riddle Aeronautical University · Emory University · Florida Institute of Technology · Furman University · Gettysburg College · Hampton University · High Point University · Howard University · Indiana University · James Madison University · Lafayette College · Liberty University · Middlebury College · North Carolina A&T State University · North Carolina State University · Northeastern University · Purdue University · Queens University of Charlotte · Randolph-Macon College · Rhodes College · Rochester Institute of Technology · Southern Methodist University · Southwest Minnesota State University · Stanford University · Syracuse University · Texas Christian University · The Ohio State University · Tulane University · United States Naval Academy · University of Alabama · University of California (Los Angeles) · University of Colorado (Boulder) · University of Florida · University of Georgia · University of Kentucky · University of Maryland · University of Miami · University of Michigan · University of Mississippi · University of North Carolina (Chapel Hill) · University of North Carolina (Charlotte) · University of Notre Dame · University of Richmond · University of South Carolina · University of Tampa · University of Tennessee · University of the South · University of Toronto · University of Virginia · Vanderbilt University · Virginia Tech · Wake Forest University · Washington and Lee University · Wofford College

*(That is 68 distinct institutions in the recovered bold set; the school's own count is 70. Two bolded entries may have been missed by font detection where a name spans a line break or uses a mixed font run. Treat 70 as the authoritative count and this list as ~97% complete.)* `TO VERIFY`

**Notable enrolling destinations:** Stanford, Duke, Emory, Vanderbilt, Notre Dame, Carnegie Mellon, Michigan, UCLA, UVA, Middlebury, Bates, Washington and Lee, US Naval Academy, University of Toronto, Berklee College of Music.

### Full acceptance list, 2023–2026 (as of 5/28/2026)

**Bold** = enrolling one or more members of the Class of 2026. Rank labels are 2026 U.S. News (NU = National Universities; LAC = National Liberal Arts Colleges) where confidently known.

| Institution | Enrolling (C/O 2026) | 2026 U.S. News |
|---|---|---|
| **Agnes Scott College** | Yes | LAC |
| Albany State University | | |
| Allegheny College | | LAC |
| American University | | NU |
| Amherst College | | **LAC #2** |
| Anderson University | | |
| **Appalachian State University** | Yes | |
| Arizona State University | | NU |
| Art Center College of Design | | |
| **Auburn University** | Yes | NU |
| Ball State University | | NU |
| Bard College | | LAC |
| Barnard College | | **LAC #13** |
| **Bates College** | Yes | **LAC #24** |
| Baylor University | | NU |
| Belmont Abbey College | | |
| Belmont University | | |
| **Berklee College of Music** | Yes | Conservatory |
| Berry College | | |
| Birmingham-Southern College | | |
| Boston College | | **NU #36** |
| **Boston University** | Yes | **NU #42** |
| Brandeis University | | **NU T-69** |
| Brenau University | | |
| Bridgewater College | | |
| Brigham Young University | | NU |
| Brown University | | **NU #13** (Ivy) |
| Bryn Mawr College | | **LAC #30** |
| **Bucknell University** | Yes | **LAC #30** |
| Butler University | | |
| Campbell University | | |
| Cape Fear Community College | | 2-year |
| **Carnegie Mellon University** | Yes | **NU #20** |
| Case Western Reserve University | | NU |
| Catawba College | | |
| Central Michigan University | | |
| Central Piedmont Community College | | 2-year |
| Christopher Newport University | | |
| **Clark Atlanta University** | Yes | HBCU |
| Clarkson University | | |
| **Clemson University** | Yes | NU |
| Coastal Carolina University | | |
| Colby College | | **LAC #24** |
| Colgate University | | **LAC #22** |
| **College of Charleston** | Yes | |
| College of the Holy Cross | | **LAC #27** |
| Colorado College | | **LAC #30** |
| Colorado State University | | |
| Columbia College Chicago | | |
| Columbia University | | **NU #15** (Ivy) |
| Columbus State University | | |
| Connecticut College | | LAC |
| Cornell University | | **NU #12** (Ivy) |
| Dartmouth College | | **NU #13** (Ivy) |
| Davidson College | | **LAC #13** |
| Delaware State University | | HBCU |
| Denison University | | **LAC #34** |
| DePaul University | | |
| DePauw University | | LAC |
| Dickinson College | | **LAC T-45** |
| Drew University | | |
| Drexel University | | NU |
| Duke Kunshan University | | International |
| **Duke University** | Yes | **NU #7** |
| Duquesne University | | |
| Durham University | | International (UK) |
| Earlham College | | LAC |
| **East Carolina University** | Yes | |
| East Tennessee State University | | |
| Elizabeth City State University | | HBCU |
| **Elon University** | Yes | |
| **Embry-Riddle Aeronautical University** | Yes | |
| Emerson College | | |
| **Emory University** | Yes | **NU #24** |
| Endicott College | | |
| Fairfield University | | |
| Fayetteville State University | | HBCU |
| Fisher College | | |
| Florida A&M University | | HBCU |
| Florida Atlantic University | | |
| Florida Gulf Coast University | | |
| **Florida Institute of Technology** | Yes | |
| Florida International University | | |
| Florida State University | | NU |
| Fordham University | | NU |
| **Furman University** | Yes | **LAC T-45** |
| George Mason University | | NU |
| George Washington University | | NU |
| Georgetown University | | **NU #24** |
| Georgia Southern University | | |
| Georgia State University | | |
| Georgia Tech | | **NU #32** |
| **Gettysburg College** | Yes | LAC |
| Greensboro College | | |
| Guilford College | | |
| Hamilton College | | **LAC #13** |
| Hampden-Sydney College | | LAC |
| **Hampton University** | Yes | HBCU |
| Haverford College | | **LAC #24** |
| Hawai'i Pacific University | | |
| **High Point University** | Yes | |
| Hobart and William Smith Colleges | | LAC |
| **Howard University** | Yes | HBCU / NU |
| **Indiana University** | Yes | NU |
| Ithaca College | | |
| Jacksonville University | | |
| **James Madison University** | Yes | |
| Johnson & Wales University | | |
| Kansas State University | | |
| Kenyon College | | **LAC T-45** |
| King's College London | | International (UK) |
| **Lafayette College** | Yes | **LAC #30** |
| Lees-McRae College | | |
| Lehigh University | | **NU #46** |
| Lenoir-Rhyne University | | |
| **Liberty University** | Yes | |
| Long Island University | | |
| Louisiana State University | | NU |
| Loyola Marymount University | | |
| Loyola University Chicago | | |
| Loyola University Maryland | | |
| Loyola University New Orleans | | |
| Manhattan School of Music | | Conservatory |
| Marist University | | |
| Marquette University | | NU |
| Marshall University | | |
| Maryland Institute College of Art | | Art school |
| Marymount Manhattan College | | |
| Marymount University | | |
| Massachusetts College of Art and Design | | Art school |
| Massachusetts Institute of Technology | | **NU #2** |
| Mercer University | | |
| Meredith College | | |
| Metropolitan State University of Denver | | |
| Miami University | | NU |
| Michigan State University | | NU |
| Middle Tennessee State University | | |
| **Middlebury College** | Yes | **LAC #13** |
| Mississippi State University | | |
| Molloy University | | |
| Montana State University | | |
| Montclair State University | | |
| Morehouse College | | HBCU |
| Morgan State University | | HBCU |
| Mount Holyoke College | | **LAC #29** |
| New York University | | **NU #32** |
| **North Carolina A&T State University** | Yes | HBCU |
| North Carolina Central University | | HBCU |
| **North Carolina State University** | Yes | NU |
| **Northeastern University** | Yes | **NU #46** |
| Nova Southeastern University | | |
| Oberlin College | | LAC |
| Occidental College | | **LAC T-35** |
| Oglethorpe University | | |
| Ohio University | | |
| Oklahoma City University | | |
| Oklahoma State University | | |
| Olin College of Engineering | | Engineering |
| Otis College of Art and Design | | Art school |
| Otterbein University | | |
| Pace University | | |
| Palm Beach Atlantic University | | |
| Parsons Paris at The New School | | International / Art |
| Parsons School of Design at The New School | | Art school |
| Penn State University | | **NU T-59** |
| Pepperdine University | | NU |
| Point Park University | | |
| Pratt Institute | | Art school |
| Presbyterian College | | |
| Princeton University | | **NU #1** (Ivy) |
| Providence College | | |
| **Purdue University** | Yes | **NU #46** |
| **Queens University of Charlotte** | Yes | |
| Radford University | | |
| **Randolph-Macon College** | Yes | LAC |
| Rensselaer Polytechnic Institute | | **NU T-64** |
| Rhode Island School of Design | | Art school |
| **Rhodes College** | Yes | LAC |
| Rice University | | **NU #17** |
| Richmond American University London | | International (UK) |
| Roanoke College | | |
| **Rochester Institute of Technology** | Yes | NU |
| Rollins College | | |
| Roosevelt University | | |
| Rutgers University | | **NU #42** |
| Saint Joseph's University | | |
| Samford University | | |
| San Diego State University | | |
| Santa Clara University | | NU |
| Sarah Lawrence College | | LAC |
| Savannah College of Art and Design | | Art school |
| School of the Art Institute of Chicago | | Art school |
| Seton Hall University | | |
| Skidmore College | | **LAC T-37** |
| Smith College | | **LAC #13** |
| South Carolina State University | | HBCU |
| **Southern Methodist University** | Yes | NU |
| **Southwest Minnesota State University** | Yes | |
| Spelman College | | **LAC T-37** / HBCU |
| St. Lawrence University | | LAC |
| St. Olaf College | | LAC |
| **Stanford University** | Yes | **NU #4** |
| Stevens Institute of Technology | | NU |
| Suffolk University | | |
| **Syracuse University** | Yes | **NU T-75** |
| Temple University | | |
| Tennessee State University | | HBCU |
| Texas A&M University | | NU |
| **Texas Christian University** | Yes | NU |
| Texas State University | | |
| The Boston Conservatory at Berklee | | Conservatory |
| **The Ohio State University** | Yes | **NU #41** |
| The University of Edinburgh | | International (UK) |
| Tufts University | | **NU #36** |
| **Tulane University** | Yes | NU |
| Union College | | **LAC #44** |
| United States Air Force Academy | | **LAC #5** / Academy |
| United States Military Academy | | **LAC #10** / Academy |
| **United States Naval Academy** | Yes | **LAC #3** / Academy |
| University College Dublin | | International (IE) |
| **University of Alabama** | Yes | NU |
| University of Alabama (Birmingham) | | |
| University of Arizona | | NU |
| University of Arkansas | | |
| University of Bath | | International (UK) |
| University of Bristol | | International (UK) |
| University of California (Berkeley) | | **NU #15** |
| University of California (Davis) | | **NU #32** |
| University of California (Irvine) | | **NU #32** |
| **University of California (Los Angeles)** | Yes | **NU #17** |
| University of California (San Diego) | | **NU #29** |
| University of California (Santa Barbara) | | **NU #40** |
| University of Central Florida | | |
| University of Chicago | | **NU #6** |
| **University of Colorado (Boulder)** | Yes | NU |
| University of Connecticut | | **NU T-69** |
| University of Delaware | | NU |
| University of Denver | | |
| **University of Florida** | Yes | **NU #30** |
| **University of Georgia** | Yes | **NU #46** |
| University of Hartford | | |
| University of Illinois (Urbana-Champaign) | | **NU #36** |
| University of Iowa | | |
| University of Kansas | | |
| **University of Kentucky** | Yes | |
| University of Louisville | | |
| University of Lynchburg | | |
| University of Mary Washington | | |
| **University of Maryland** | Yes | **NU #42** |
| University of Maryland Eastern Shore | | HBCU |
| University of Massachusetts (Amherst) | | **NU T-64** |
| University of Massachusetts (Boston) | | |
| University of Memphis | | |
| **University of Miami** | Yes | NU |
| **University of Michigan** | Yes | **NU #20** |
| University of Minnesota | | NU |
| **University of Mississippi** | Yes | |
| University of Missouri | | |
| University of Nevada (Las Vegas) | | |
| University of North Carolina (Asheville) | | |
| **University of North Carolina (Chapel Hill)** | Yes — **32 students** | **NU #26** |
| **University of North Carolina (Charlotte)** | Yes | |
| University of North Carolina (Greensboro) | | |
| University of North Carolina (Pembroke) | | |
| University of North Carolina (Wilmington) | | |
| University of North Carolina School of the Arts | | Conservatory |
| **University of Notre Dame** | Yes | **NU #20** |
| University of Oklahoma | | |
| University of Oregon | | |
| University of Pennsylvania | | **NU #7** (Ivy) |
| University of Pittsburgh | | **NU T-69** |
| University of Pittsburgh (Johnstown) | | |
| University of Rhode Island | | |
| **University of Richmond** | Yes | **LAC #22** |
| University of Rochester | | **NU #46** |
| University of San Diego | | |
| University of San Francisco | | |
| **University of South Carolina** | Yes | NU |
| University of South Florida | | |
| University of Southern California | | **NU #28** |
| University of St Andrews | | International (UK) |
| **University of Tampa** | Yes | |
| **University of Tennessee** | Yes | NU |
| University of Texas | | **NU #30** |
| **University of the South (Sewanee)** | Yes | **LAC T-45** |
| **University of Toronto** | Yes | International (CA) |
| University of Utah | | |
| University of Vermont | | |
| **University of Virginia** | Yes | **NU #26** |
| University of Washington | | **NU #42** |
| University of Wisconsin | | **NU #36** |
| University of Wyoming | | |
| **Vanderbilt University** | Yes | **NU #17** |
| Villanova University | | **NU #57** |
| Virginia Commonwealth University | | |
| Virginia State University | | HBCU |
| **Virginia Tech** | Yes | NU |
| Virginia Wesleyan University | | |
| Wagner College | | |
| **Wake Forest University** | Yes | NU |
| **Washington and Lee University** | Yes | **LAC #21** |
| Washington University in St. Louis | | **NU #20** |
| Webster University | | |
| Wellesley College | | **LAC #7** |
| Wesleyan University | | **LAC #13** |
| West Virginia University | | |
| West Virginia Wesleyan College | | |
| Western Carolina University | | |
| William & Mary | | **NU T-51** |
| Williams College | | **LAC #1** |
| Wingate University | | |
| Winston-Salem State University | | HBCU |
| Winthrop University | | |
| **Wofford College** | Yes | LAC |
| Worcester Polytechnic Institute | | NU |
| Xavier University | | |
| Xavier University of Louisiana | | HBCU |
| **Yale University** | Yes*? | **NU #5** (Ivy) |
| York College of Pennsylvania | | |
| Zaytuna College | | |

> *Yale appears in the 2022–2025 list as **bold** (enrolling a member of the Class of 2025). In the 2023–2026 list it appears **not bold**. Both are consistent — a Yale matriculant in 2025 but not 2026.

**Names present in the 2022–2025 list but dropped from the 2023–2026 list** (i.e. acceptances from the Class of 2022 that aged out): Bryn Mawr appears in both; notable drops include *University of Nebraska*, *University of Notre Dame* (still present), *Sweet Briar College*, *Saint Michael's College*, *Stony Brook University*, *Hofstra University*, *Marshall University* (still present), *Occidental* (still present). The 2022–2025 list also included **Duke Kunshan University**, **University of Glasgow**, and **University of Edinburgh**; the 2023–2026 list retains Duke Kunshan and Edinburgh but **drops Glasgow** and **adds** University College Dublin, University of Bath, and University of Bristol.

### Selectivity bucket counts (scored against 2026 U.S. News)

**Ivy League — 7 of 8 (acceptances, 2023–2026):**

| Ivy | Accepted 2023–2026? |
|---|---|
| Brown | Yes |
| Columbia | Yes |
| Cornell | Yes |
| Dartmouth | Yes |
| Harvard | **NO — absent** |
| Princeton | Yes |
| University of Pennsylvania | Yes |
| Yale | Yes |

> **Named absence: Harvard University does not appear on the 2023–2026 acceptance list.** It also does not appear on the 2022–2025 list. Across seven graduating classes of published data, no Harvard acceptance is listed. This is an honest and notable gap. `NOT PUBLISHED` alternatively — but the lists are presented as complete, so absence is meaningful.
>
> **Of the 7 Ivies accepted, ZERO are bolded as enrolling for the Class of 2026.** No Class of 2026 student enrolled at an Ivy. (Class of 2025 did enroll at Brown, Cornell, Dartmouth, Princeton, Yale and Barnard per the 2022–2025 bolding.) This is a real year-over-year swing worth noting rather than smoothing over.

**"Ivy Plus" (Ivies + Stanford, MIT, UChicago, Duke) — 11 of 12 accepted:**

Brown, Columbia, Cornell, Dartmouth, Penn, Princeton, Yale, **Stanford**, **MIT**, **UChicago**, **Duke**. Missing: **Harvard**.
- **Enrolling (C/O 2026): Stanford and Duke** — 2 of 12.

**Top-75 National Universities (2026 U.S. News) — acceptances:**

Princeton (1), MIT (2), Stanford (4), Yale (5), UChicago (6), Duke (7), Penn (7), Cornell (12), Brown (13), Dartmouth (13), Columbia (15), UC Berkeley (15), Rice (17), UCLA (17), Vanderbilt (17), Carnegie Mellon (20), Michigan (20), Notre Dame (20), WUSTL (20), Emory (24), Georgetown (24), UNC-Chapel Hill (26), Virginia (26), USC (28), UC San Diego (29), Florida (30), UT Austin (30), Georgia Tech (32), NYU (32), UC Davis (32), UC Irvine (32), Boston College (36), Tufts (36), UIUC (36), Wisconsin (36), UC Santa Barbara (40), Ohio State (41), Boston University (42), Rutgers (42), Maryland (42), Washington (42), Lehigh (46), Northeastern (46), Purdue (46), Georgia (46), Rochester (46), William & Mary (T-51), Villanova (57), Penn State (T-59), RPI (T-64), UMass Amherst (T-64), Brandeis (T-69), UConn (T-69), Pittsburgh (T-69), Syracuse (T-75).

**≈55 distinct Top-75 National Universities on the acceptance list.** `TO VERIFY` — count depends on how ties at T-75 are handled and on the exact published rank of institutions I could confirm only as "NU" (Clemson, Florida State, Fordham, Miami, Minnesota, Texas A&M, Wake Forest, SMU, Tulane, Santa Clara, Pepperdine, Stevens, WPI, Michigan State, Miami OH, Marquette, LSU, Arizona, Delaware, Drexel, GWU, George Mason, Case Western, Baylor, Ball State, Arizona State, BYU, American, RIT, Virginia Tech, NC State, Auburn, South Carolina, Tennessee, Indiana, Colorado Boulder) — several of these plausibly fall inside the top 75 but I could not confirm their exact 2026 rank from the sources fetched, so they are excluded from the count above rather than guessed.

**Enrolling at Top-75 National Universities (C/O 2026):** Stanford (4), Duke (7), UCLA (17), Vanderbilt (17), Carnegie Mellon (20), Michigan (20), Notre Dame (20), Emory (24), UNC-Chapel Hill (26), Virginia (26), Florida (30), Ohio State (41), Boston University (42), Maryland (42), Northeastern (46), Purdue (46), Georgia (46), Syracuse (T-75) — **18 confirmed**, plus additional unranked-here publics.

**Top-75 National Liberal Arts Colleges (2026 U.S. News) — acceptances:**

Williams (1), Amherst (2), **US Naval Academy (3)**, **US Air Force Academy (5)**, Wellesley (7), **US Military Academy (10)**, Barnard (13), Davidson (13), Hamilton (13), Middlebury (13), Smith (13), Wesleyan (13), Washington and Lee (21), Colgate (22), Richmond (22), Bates (24), Colby (24), Haverford (24), Holy Cross (27), Mount Holyoke (29), Bryn Mawr (30), Bucknell (30), Colorado College (30), Lafayette (30), Denison (34), Occidental (T-35), Skidmore (T-37), Spelman (T-37), Union (44), Dickinson (T-45), Furman (T-45), Kenyon (T-45), Sewanee/University of the South (T-45).

**≈33 distinct Top-75 Liberal Arts Colleges accepted** (all within the top 50, which is notable — the strength is concentrated at the very top of the LAC list). Plus additional LACs whose exact rank I could not confirm (Bard, Connecticut College, DePauw, Earlham, Hampden-Sydney, Hobart & William Smith, Oberlin, Randolph-Macon, Rhodes, Sarah Lawrence, St. Lawrence, St. Olaf, Wofford, Agnes Scott, Allegheny, Gettysburg). `TO VERIFY`

> **Notably, all three federal service academies rank as top-10 Liberal Arts Colleges in 2026 U.S. News** (Navy #3, Air Force #5, Army #10), and **all three appear on CCD's acceptance list** — with the **Naval Academy bolded as enrolling** a Class of 2026 student.

**Enrolling at Top-75 LACs (C/O 2026):** US Naval Academy (3), Middlebury (13), Washington and Lee (21), Richmond (22), Bates (24), Bucknell (30), Lafayette (30), Denison (34), Furman (T-45), Sewanee (T-45) — **10 confirmed**, plus Agnes Scott, Gettysburg, Randolph-Macon, Rhodes, Wofford.

**Power Four conference schools (acceptances):**
- **ACC:** Duke, UNC, NC State, Virginia, Virginia Tech, Wake Forest, Clemson, Florida State, Miami, Boston College, Louisville, Pittsburgh, Syracuse, SMU, Georgia Tech, Stanford, California(UC Berkeley) — extensive
- **SEC:** Alabama, Auburn, Florida, Georgia, Kentucky, LSU, Mississippi, Mississippi State, Missouri, South Carolina, Tennessee, Texas A&M, Texas, Vanderbilt, Oklahoma, Arkansas — extensive
- **Big Ten:** Illinois, Indiana, Iowa, Maryland, Michigan, Michigan State, Minnesota, Nebraska (2022–25 list), Ohio State, Penn State, Purdue, Rutgers, UCLA, USC, Washington, Wisconsin, Oregon — extensive
- **Big 12:** Baylor, Colorado, Kansas, Kansas State, Oklahoma State, TCU, Texas Tech (not listed), Arizona, Arizona State, BYU, Cincinnati (not listed), UCF, Houston (not listed), Iowa State (not listed), West Virginia
- **Effectively the full Power Four footprint is represented.** Precise counts `TO VERIFY` against a current conference-membership list.

### Scholarship and named-award headline

| Award | Detail | Class |
|---|---|---|
| **Total merit/athletic/talent scholarship offers** | **$14.7 million** | Class of 2026 |
| | **$13 million** | Class of 2025 |
| | $11.9 million | Class of 2024 |
| | $8.2 million | Class of 2015 |
| **Morehead-Cain (UNC-Chapel Hill)** | **1 Scholar** | Class of 2026 |
| | **34 recipients** — cumulative/historic, window unstated `TO VERIFY` | All-time |
| **US Naval Academy Appointment** | 1 | Class of 2026 |
| **NMSC Special Scholarship** | C.D. Spangler Foundation sponsor | Class of 2026 |
| **Agnes Scott Marvin B. Perry Presidential Scholarship** | 1 | Class of 2026 |
| **February One Scholarship (NC A&T)** | 1 | Class of 2026 |
| **Notable awards, recent graduates (2025-26 Profile)** | Coca-Cola Scholar; **Jefferson Scholar (UVA)**; **Jack Kent Cooke Scholar**; Military Academy Appointments; **Morehead-Cain Scholars**; **QuestBridge College Match Scholar**; **Ron Brown Scholar** | Recent |
| **Historic (2015-16 Profile)** | Morehead-Cain Scholars; Jefferson Scholar (UVA); **Park Scholars (NC State)**; **Robertson Scholars (Duke)**; Naval Academy Appointments; President's Scholar (Georgia Tech). 27 students each earned >$100,000 in combined offers (Class of 2015) | 2015 |

> **Robertson Scholars:** appears only in the **2015-16** profile's list, **not** in the 2024-25 or 2025-26 profiles. Do not present Robertson as a current pipeline. Same for **Park Scholars (NC State)** and **President's Scholar (Georgia Tech)**.
> **QuestBridge, Ron Brown, Jack Kent Cooke, Coca-Cola** appear in the current (2025-26) profile's "recent graduates" list but with **no counts and no years**. `TO VERIFY` — these are unquantified.
> **ROTC scholarships: NOT PUBLISHED.** No CCD source mentions ROTC awards.

### Sources

- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/class-of-2026-college-admissions-outcomes
- https://resources.finalsite.net/images/v1779992327/charlottecds/qit66txtuedke1lr4hcx/CollegeAcceptances2023-2026.pdf
- https://resources.finalsite.net/images/v1759320688/charlottecds/dn5vss9ud5xxwzyt70ah/CCDSSchoolProfile2025-2026-FINAL.pdf
- https://resources.finalsite.net/images/v1686238614/charlottecds/sqapm2638povsgf4n5ga/CollegeAcceptances2020-2023.pdf
- https://www.charlottecountryday.org/uploaded/country_day_education/college_guidance/College_Acceptances_2013-2016_(for_Profile).pdf
- https://www.charlottecountryday.org/cd-education/college-counseling
- https://resources.finalsite.net/images/v1726775598/charlottecds/enzt08thdabvh3uxiz0i/2024-2025CCDSSchoolProfile.pdf
- https://www.charlottecountryday.org/uploaded/country_day_education/college_guidance/CCDSCollegeProfileFINAL.pdf
- https://www.usnews.com/best-colleges/rankings/national-universities
- https://www.collegekickstart.com/blog/item/u-s-news-world-report-posts-2026-college-rankings

---

## Card — The Applicant's Edge

### Lever 1 — Build the spike

**Signature / distinction programs**

| Program | What it is | Scale / detail |
|---|---|---|
| **IB Diploma Programme** | Full two-year IB Diploma alongside the CCD diploma. **First school in North Carolina to offer it.** | ~20 students per year enroll in the full diploma, starting junior year. 5-yr avg pass rate **88%** (2025-26 profile) / **91%** (2024-25 profile) — discrepancy flagged. IB Code 0667. |
| **Senior Externship** | One-day job-shadowing and mentoring immersion, typically each **January**. Launched **2017**. | Partnered with **175+ local employers across 20+ industries**. In a recent year, **136 seniors** placed with **68 Charlotte-area employers**. Hosts are largely current/past CCD parents and alumni. |
| **Science Outreach Program** | Summer primary research placement — students "work with science professors at local institutions" and serve as researchers at college labs. | Rising juniors and seniors; significant summer time commitment; participants present findings at the annual **Science Symposium**. |
| **Weddington Farm** | **330-acre living classroom** with produce, livestock, beekeeping, mushroom farming, and a **ten-mile trail system**. | Integrated programming in sustainable agriculture, ecology, biology, environmental science, and entrepreneurship. A genuinely uncommon asset for an urban independent school. |
| **International Studies / global travel** | Sister-school exchanges, global service, academic and cultural immersion; faculty-led, ~2 weeks, typically June. | Academic credit "as able." Distinct International Studies office. **14% international students** in the school. |
| **Special Olympics Mecklenburg County Spring Games** | Upper School takes a **two-day break from classes every April since 1984** to host. | Students serve as buddies, timekeepers, event assistants. A 40+ year institutional commitment — rare and highly legible to admissions readers. |

**Required internship / capstone / independent research**

- **There is no required internship, capstone, or independent research thesis.** The Senior Externship is a **one-day** experience and the school does not state that it is mandatory. `NOT PUBLISHED` whether externship participation is required — though 136 seniors participating out of a ~141-senior class implies it is near-universal in practice. `TO VERIFY`
- The Upper School curriculum page does **not** describe a senior capstone, independent study track, or research requirement.
- The closest thing to a research capstone is (a) the **IB Extended Essay** implied by full IB Diploma enrollment (~20 students/yr) — CCD does not name it explicitly, but it is a required component of the IB Diploma — and (b) the **Science Outreach Program** with its Science Symposium presentation, which is optional and summer-based.
- **Compared to peers:** CCD has **no Global Studies Diploma-style capstone** (contrast Providence Day's Global Studies Diploma with its required capstone research paper). CCD's differentiation is the IB Diploma instead.

**Recruiting and arts tracks**

- **Athletic recruiting:** an **average of 15 graduating seniors annually** commit to NCAA Division I, II, or III programs (collegiate athletics page). The 2025-26 Profile reports **18** student-athletes from the Class of 2025 continuing their sport, and **61 across the last four classes** (avg ~15/yr — internally consistent). The Class of 2026 post reports **13** seniors competing in college athletics.
  - Support structure, verbatim: "we partner with our College Counseling Office to offer extensive guidance throughout the college recruiting process."
  - **No named recruiting coordinator and no dedicated recruiting staff position is published.** `NOT PUBLISHED`
  - Athletic scale: **72 sports teams** across Middle & Upper School; **87% of students** play a Middle or Upper School sport.
  - Recruited destinations named on the collegiate athletics page span **Yale, Dartmouth, Princeton**, Division III colleges, and military academies.
- **Arts track:** **50+ arts performances and events per year** (2025-26 Profile; note the 2024-25 Profile said **70** — see discrepancy below). AP Studio Art in three tracks (2D, Design/Photography, Sculpture), AP Art History, AP Music Theory, IB Art I & II (SL/HL), IB Theater Arts (SL/HL), Honors Chamber Choir / Concert Choir / Symphonic Band / Orchestra. National Art Honor Society and Tri-M Music Honor Society chapters.
  - Conservatory-level outcomes are real: acceptances at **Berklee College of Music** (enrolling C/O 2026), **Manhattan School of Music**, **Boston Conservatory at Berklee**, **RISD**, **Pratt**, **SAIC**, **Parsons** (New York and Paris), **MICA**, **SCAD**, **UNC School of the Arts**, **Otis**, **Art Center College of Design**, **Massachusetts College of Art and Design**.

> **DISCREPANCY:** arts events per year — 2025-26 Profile says **"50+"**; 2024-25 Profile says **"70"**; 2015-16 Profile says **"70+"**. The number went *down* in the most recent profile. Show both current figures.

> **DISCREPANCY:** Weddington Farm trail system — 2025-26 Profile says **"ten-mile trail system"**; 2024-25 Profile says **"eight-mile trail system."** Likely genuine expansion, but note both.

> **DISCREPANCY:** grades served — the 2025-26 Profile's "By the Numbers" says **14 grades served (Junior Kindergarten – 12)**; the 2024-25 Profile says **13**. JK through 12 is 14 grade levels (JK, K, 1–12), so the 2025-26 figure appears to be a correction of an earlier error.

### Lever 2 — The school's leverage

**The School Profile as an instrument**

CCD's profile is a deliberately-built admissions instrument, and the 2025-26 edition is materially stronger than its predecessor:

- **It publishes a quintile table that ties GPA bands to median SAT and median ACT** — new in 2025-26. This lets an admissions reader place a candidate's GPA in context *and* sanity-check it against testing, without the school ever assigning a rank. Very few schools give readers this much.
- It names the **specific ceiling course in each discipline** via the "MOST RIGOROUS COURSES BY DISCIPLINE" table with a dedicated Post-AP column — pre-empting the "did this student take the hardest thing available?" question.
- It publishes **AP-load distribution buckets** (0–2 / 3–5 / 6+) so a reader can locate a candidate against classmates.
- It states the weighting formula explicitly (+0.5 Honors, +1.0 AP/IB).
- It carries **CEEB 340666** and **IB 0667** on the cover, plus the full counseling roster with direct emails.
- It discloses AP results **by discipline**, not just in aggregate — including the weak spots (Fine Arts 81%/36%). That candor is itself a credibility signal.

**What the profile deliberately withholds:** class rank, individual SAT/ACT distributions (dropped in 2025-26 — see Whole Class Analytics), AP Scholar counts, and any numeric "most rigorous" rubric.

**Integrity / discipline reporting and NACAC compliance**

- **Honor Code:** students pledge annually — verbatim: *"I pledge my honor that I have neither given nor received aid on this assignment."* Violations trigger **Honor Council** hearings and disciplinary action. The Honor Council is student-run and is listed among the school's leadership opportunities.
- **NACAC / SACAC / ACCIS membership** is published in the profile's memberships block, which signals adherence to those bodies' Guide to Ethical Practice — including the norms around accurate reporting of student records.
- **The school does not publish its disciplinary-disclosure policy** — i.e. whether and how it reports Honor Council findings or suspensions on the secondary school report to colleges. `NOT PUBLISHED`. This is a sharp tour question.

**Repeat pipelines to specific colleges**

The strongest evidence of institutional pipelines:

| Pipeline | Evidence |
|---|---|
| **UNC-Chapel Hill** | **32 Class of 2026 students enrolled** — 23% of the entire class at a single institution. Plus **34 Morehead-Cain recipients** cumulatively. This is the dominant relationship by an enormous margin. |
| **In-state NC publics** | 29% of the Class of 2025 stayed in NC. NC State, UNC-Charlotte, App State, ECU, UNCW all bolded as enrolling. |
| **Southeast regionals** | Elon, High Point, Clemson, College of Charleston, Furman, Wofford, Sewanee, Rhodes, Wake Forest, Auburn, Alabama, Georgia, South Carolina, Tennessee all recur as enrolling institutions across both list vintages. |
| **Service academies** | Naval Academy, West Point, and Air Force Academy all appear; Naval Academy enrolling in both the 2025 and 2026 classes; "Military Academy Appointments" is a standing line in the profile's notable-awards list across a decade. |
| **UVA** | Jefferson Scholar named in both 2015-16 and 2025-26 profiles; UVA bolded as enrolling in both list vintages. |

> **A pipeline that has *lapsed*:** **Duke's Robertson Scholars** and **NC State's Park Scholars** appear in the 2015-16 profile's notable-awards list but **not** in the 2024-25 or 2025-26 lists. Do not present these as current.

**Two-way relationships and memberships**

- **150+ college admissions officers visit campus each year**, in a structured program: **Scoir Visits** scheduling, a defined window (**Aug 24 – Nov 20, 2026**), 60-minute sessions, five fixed daily slots (8:00, 9:35, 10:45, 1:00, 2:10), with a named director-level contact and direct phone line for reps. This is a professionalized, high-throughput intake operation, not ad-hoc hosting.
- **Charlotte Area Case Studies program (April, 10th grade)** — a cross-school Charlotte-area collaboration that puts sophomores inside a mock admissions committee. Evidence of a regional counselor network, and unusual to offer this early.
- Institutional memberships: **ACCIS, NACAC, SACAC, NAIS, NCAIS, Cum Laude Society, CASE, The College Board, IB**.
- **Accreditation:** Southern Association of Colleges and Schools; Southern Association of Independent Schools.
- **Faculty credibility markers** (2025-26 Profile): the Upper School faculty includes **AP exam readers**, **Klingenstein Fellows**, **National Board graders**, **National Board Certified** teachers, Arts and Science grant winners, and World Affairs Council grant winners. **82% hold advanced degrees**; 100% engage in professional development annually; **83 administrative and teaching staff**; **7:1 Upper School student-faculty ratio**. AP readers on staff is a direct two-way link into the College Board.
- **Senior Externship's 175+ employer network** is drawn largely from current and past CCD parents and alumni — a demonstrable community-leverage asset, and the closest thing CCD has to a professional-network moat.

### Sources

- https://resources.finalsite.net/images/v1759320688/charlottecds/dn5vss9ud5xxwzyt70ah/CCDSSchoolProfile2025-2026-FINAL.pdf
- https://resources.finalsite.net/images/v1726775598/charlottecds/enzt08thdabvh3uxiz0i/2024-2025CCDSSchoolProfile.pdf
- https://www.charlottecountryday.org/cd-experience/beyond-the-classroom/externship
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/local-partnerships-elevate-country-days-senior-externship-program
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/seniors-gain-career-insights-through-externships
- https://www.charlottecountryday.org/cd-experience/athletics/collegiate-athletics
- https://www.charlottecountryday.org/cd-education/upper-school/us-curriculum
- https://www.charlottecountryday.org/cd-education/upper-school/us-curriculum/off-campus
- https://www.charlottecountryday.org/cd-education/international-studies
- https://www.charlottecountryday.org/cd-education/college-counseling/for-college-representatives
- https://www.charlottecountryday.org/bucsnet/upper-school/college-counseling
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/class-of-2026-college-admissions-outcomes

---

## Card — Whole Class Analytics

### The central finding: CCD stopped publishing test-score distributions

This is the most important analytic fact about CCD's transparency, and it must be stated plainly:

- The **2024-25 School Profile published full middle-50% ranges** for SAT (Total, EBRW, Math) and ACT (Composite, English, Math, Reading, Science).
- The **2025-26 School Profile publishes none of that.** It replaced the standalone SAT/ACT blocks with **median SAT and median ACT per GPA quintile**.
- Neither profile has **ever** published 10th / 25th / 75th / 90th percentiles, a mean, or the **number of testers**.

### SAT

| Metric | Value | Source |
|---|---|---|
| **Total, middle 50%** | **1155 – 1385** | 2024-25 Profile (Class of 2024) |
| **EBRW, middle 50%** | **585 – 700** | 2024-25 Profile (Class of 2024) |
| **Math, middle 50%** | **590 – 690** | 2024-25 Profile (Class of 2024) |
| 10th / 90th percentile | **NOT PUBLISHED** | — |
| Mean | **NOT PUBLISHED** | — |
| **Number of SAT testers** | **NOT PUBLISHED** | — |
| Class of 2025 / 2026 SAT ranges | **NOT PUBLISHED** — dropped from the 2025-26 profile | — |

> Interpreting the middle 50% as 25th/75th percentiles: **SAT 25th ≈ 1155, 75th ≈ 1385** for the Class of 2024. Median is not directly given but the quintile table (below) puts the **3rd-quintile median SAT at 1290**, which is a reasonable proxy for the class median. `TO VERIFY` — 1290 is the middle-quintile median, not a true class median.

Historic, for context (2015-16 Profile, Class of 2015, **pre-2016 SAT redesign — not comparable to current scores**): Critical Reading 550–660; Math 570–680; Writing 570–670.

### ACT

| Metric | Value | Source |
|---|---|---|
| **Composite, middle 50%** | **24 – 31** | 2024-25 Profile (Class of 2024) |
| English, middle 50% | 23 – 32 | 2024-25 Profile |
| Math, middle 50% | 22 – 29 | 2024-25 Profile |
| Reading, middle 50% | 24 – 32 | 2024-25 Profile |
| Science, middle 50% | 24 – 31 | 2024-25 Profile |
| 10th / 90th percentile | **NOT PUBLISHED** | — |
| Mean | **NOT PUBLISHED** | — |
| **Number of ACT testers** | **NOT PUBLISHED** | — |
| Class of 2025 / 2026 ACT ranges | **NOT PUBLISHED** — dropped from the 2025-26 profile | — |

Historic (2015-16 Profile, Class of 2015): Composite 26–31; English 26–33; Math 26–30; Reading 25–33; Science Reasoning 25–32.

> **Note the direction of travel:** the Class of 2015 ACT composite middle 50% was **26–31**; the Class of 2024's was **24–31**. The floor dropped two points while the ceiling held. Plausibly a test-optional-era composition effect (weaker testers now still report to the school but fewer submit to colleges), but the school offers no explanation. `TO VERIFY`

### GPA distribution — quintile table

**Class of 2025 (141 seniors), 2025-26 Profile.** *"Represents grades earned only at Charlotte Country Day as of the end of junior year."* This is the richest version CCD has published — it adds median SAT and median ACT per quintile:

| Quintile | Median Weighted Cumulative GPA | Median SAT | Median ACT |
|---|---|---|---|
| **1st** | **4.472** | **1470** | **33** |
| 2nd | 4.140 | 1360 | 32 |
| 3rd | 3.877 | 1290 | 30 |
| 4th | 3.513 | 1220 | 27 |
| **5th** | **2.991** | **1110** | **24** |

**Class of 2025 (138 seniors), 2024-25 Profile** — same class, different cut, published a year earlier as GPA *ranges* and *means*:

| Quintile | Range | Mean |
|---|---|---|
| Top | 4.805 – 4.275 | 4.540 |
| 2nd | 4.260 – 3.926 | 4.093 |
| 3rd | 3.919 – 3.599 | 3.759 |
| 4th | 3.597 – 3.268 | 3.432 |
| 5th | 3.266 – 2.076 | 2.671 |

> **DISCREPANCY — same class, two different senior counts.** The 2024-25 Profile says the Class of 2025 has **138 seniors**; the 2025-26 Profile says **141 seniors**. Almost certainly late enrollment between publication dates, but both are official. Show both.
>
> Also note the two tables report **different statistics** for the same class (means-and-ranges vs medians), so the numbers are not directly comparable — e.g. top quintile **mean 4.540** vs top quintile **median 4.472**. Both are correct.

**Class of 2016 (119 seniors), 2015-16 Profile** — for long-run trend:

| Quintile | Range | Mean |
|---|---|---|
| Top | 4.583 – 3.936 | 4.198 |
| 2nd | 3.935 – 3.676 | 3.813 |
| 3rd | 3.666 – 3.380 | 3.519 |
| 4th | 3.365 – 3.102 | 3.233 |
| 5th | 3.084 – 2.546 | 2.891 |

> **Ten-year grade trend:** the top-quintile mean rose from **4.198 (C/O 2016)** to **4.540 (C/O 2025)** — a +0.34 shift. The 5th-quintile mean fell slightly (2.891 → 2.671). The distribution has stretched at both ends. Also note the **5th-quintile floor dropped from 2.546 to 2.076**, meaning the current bottom of the class is meaningfully lower than a decade ago.

### Learning-difference support

**Educational Resource Program (ERP)** — the named JK–12 support structure.

| Element | Detail |
|---|---|
| Scope | JK–12: tutoring, accommodations, assessments, psychoeducational evaluation referrals, across Lower, Middle, and Upper School |
| **Upper School model** | **Academic coaches** "assist students who need additional support and review in content areas and executive functioning skills" |
| **Learning specialists** | "dedicated learning specialists work one-on-one with students to help them recognize and utilize their strengths as they learn and apply strategies to become more independent learners" |
| **Testing accommodations** | ERP "assists in requesting accommodations with the **College Board, ACT, and IB**" — directly relevant to college admissions testing |
| Delivery | Hourly tutoring sessions before, during, or after the school day |
| Philosophy | Develops "foundational, academic, and executive function skills through differentiated learning practices"; "celebrates diverse learning styles while empowering students to become confident, independent learners"; also a resource for parents and teachers |
| Stated goal | Students become "independent learners and self-advocates" |
| **Named staff** | **NOT PUBLISHED** — no learning specialist or academic coach is named, and no staff roster, count, or credentials are given anywhere on the ERP page. `NOT PUBLISHED` |
| Contact | Lynette Harris — lynette.harris@charlottecountryday.org · (704) 943-4630 `TO VERIFY` (role/title not stated in the source; appears as a general Upper School contact) |
| **Number of learning specialists** | **NOT PUBLISHED** |
| **Psychoeducational evaluations** | The ERP page does **not** claim to perform these; a separate summary describes "referrals." Team members "work together to determine students' academic abilities and limitations." Ambiguous — `TO VERIFY` |

Related facility: the **John and Claudia Belk Upper School Learning Center** (library), a **14,000-square-foot** facility with **two professional librarians** and collaborative learning spaces, open 7:30 am – 4:00 pm.

### How the middle of the class and non-traditional paths are served

**The middle of the class — the quintile table is the honest answer.** CCD publishes what most schools hide: the 4th quintile has a median weighted GPA of **3.513** with median **SAT 1220 / ACT 27**, and the 5th quintile sits at **2.991 / 1110 / 24**. That is a real spread, and the outcomes list matches it.

Evidence the middle and bottom of the class are genuinely served:

- **Breadth of the list is the proof.** The 2023–2026 acceptance list runs ~320 institutions from Princeton and MIT down to **Cape Fear Community College** and **Central Piedmont Community College** — CCD publishes its community-college acceptances, which many peer schools quietly omit. That is a meaningful transparency signal.
- **Enrolling institutions for the Class of 2026 include broad-access publics and regionals**: Appalachian State, East Carolina, UNC-Charlotte, High Point, Queens University of Charlotte, Liberty, University of Tampa, University of Mississippi, University of Kentucky, Southwest Minnesota State. The bolded list is not a top-25 highlight reel.
- **55% of the Class of 2026 enrolled at public universities**, and **32% stayed in North Carolina** — a pragmatic, value-conscious pattern rather than a prestige-maximizing one.
- **Regional/less-selective NC institutions appear throughout**: Belmont Abbey, Campbell, Catawba, Gardner-Webb, Greensboro, Guilford, Lees-McRae, Lenoir-Rhyne, Mars Hill, Meredith, NC Wesleyan, Queens, UNC-Asheville, UNC-Pembroke, Western Carolina, Wingate, Winston-Salem State.
- **HBCU pipeline is substantial and real**: North Carolina A&T (enrolling), Howard (enrolling), Hampton (enrolling), Clark Atlanta (enrolling), plus Spelman, Morehouse, Xavier of Louisiana, Delaware State, Elizabeth City State, Fayetteville State, Florida A&M, Morgan State, NC Central, South Carolina State, Tennessee State, UMES, Virginia State, Winston-Salem State. A **February One Scholarship (NC A&T)** was won by the Class of 2026, and a **Ron Brown Scholar** appears in the profile's notable awards.

**Non-traditional paths:**

| Path | Evidence |
|---|---|
| **Conservatories / art schools** | Strong and well-established: **Berklee College of Music (enrolling)**, Manhattan School of Music, Boston Conservatory at Berklee, RISD, Pratt, School of the Art Institute of Chicago, Parsons (NY **and** Paris), MICA, SCAD, UNC School of the Arts, Otis College of Art and Design, Art Center College of Design, Massachusetts College of Art and Design, Columbia College Chicago. **~14 dedicated arts/music institutions** on the list. |
| **Service academies** | **US Naval Academy (enrolling, C/O 2026 — 1 appointment)**, US Military Academy at West Point, US Air Force Academy. "Military Academy Appointments" is a standing line in the profile's notable-awards list across a decade. |
| **International universities** | **University of Toronto (enrolling)**, plus St Andrews, Edinburgh, Durham, King's College London, Bath, Bristol, University College Dublin, Richmond American University London, Parsons Paris, Duke Kunshan. **~11 international institutions.** The Class of 2025 sent **0.7%** abroad. Supported by 14% international enrollment and a distinct International Studies office. |
| **Community college** | Cape Fear CC and Central Piedmont CC both published on the acceptance list. |
| **Gap year** | **NOT PUBLISHED.** No CCD source found mentions gap-year counseling, gap-year placement counts, or a deferral policy. This is a genuine gap in disclosure. |
| **Direct-to-work / military enlistment** | **NOT PUBLISHED.** |
| **Semester-away programs** (a CCD strength) | School Year Abroad (France/Spain/Italy), Maine Coast Semester at Chewonki, ALZAR (Patagonia/Idaho) — all carry credit back to the CCD transcript. |

### Sources

- https://resources.finalsite.net/images/v1759320688/charlottecds/dn5vss9ud5xxwzyt70ah/CCDSSchoolProfile2025-2026-FINAL.pdf
- https://resources.finalsite.net/images/v1726775598/charlottecds/enzt08thdabvh3uxiz0i/2024-2025CCDSSchoolProfile.pdf
- https://www.charlottecountryday.org/uploaded/country_day_education/college_guidance/CCDSCollegeProfileFINAL.pdf
- https://www.charlottecountryday.org/cd-education/educational-resource-program
- https://www.charlottecountryday.org/bucsnet/quick-reference
- https://resources.finalsite.net/images/v1779992327/charlottecds/qit66txtuedke1lr4hcx/CollegeAcceptances2023-2026.pdf
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/class-of-2026-college-admissions-outcomes
- https://www.charlottecountryday.org/cd-education/upper-school/us-curriculum/off-campus
- https://www.niche.com/k12/charlotte-country-day-school-charlotte-nc/academics/

---

## Card — Verdict & Visit Checklist

### Why it holds up — evidence-backed verdict points

1. **The profile gives admissions readers more usable context than almost any peer — a quintile table that ties GPA bands to median SAT *and* median ACT.** The 2025-26 table runs from 1st quintile (4.472 / 1470 / 33) to 5th (2.991 / 1110 / 24). CCD never assigns a class rank, yet a reader can place any candidate precisely. Adding per-quintile test medians was **new in 2025-26** — the school is actively investing in the instrument.

2. **AP performance is high and improving, and it is disclosed by discipline including the weak spots.** 2025: **530 exams / 238 students / 93% scoring 3+ / 74% scoring 4-5**, up from 89%/70% in 2024. History-Social Science hit 99%/89% and English 97%/77%. The school also publishes Fine Arts at 81%/36% rather than hiding it — that candor is a credibility signal in itself.

3. **The IB Diploma is a genuine structural differentiator, not marketing.** CCD was the **first school in North Carolina** to offer it, ~20 students per year complete the full diploma from junior year, and the five-year average pass rate is **88%** (2025-26 profile). Very few Charlotte-area independents offer a full IB Diploma alongside 25 APs — it gives non-AP-shaped students a second legible path to maximum rigor.

4. **The counseling office is deep, stable, and professionalized despite a director change.** Five full-time counselors for 548 Upper School students (~1:110 derived; ~1:28 per senior class), **100+ years combined experience**, and **150+ college reps hosted annually** through a structured Scoir Visits program with a fixed window and five daily slots. Critically, **Jonathan Woog and Catherine Odum have both been in the office since at least 2015-16** — so the July 2026 arrival of Allison Slater Tate as Director sits on top of a decade of institutional memory, not a vacuum.

5. **The four-year timeline is real, named, and starts genuinely early.** Freshman Seminar and Scoir introduction in 9th; **PreACT and the Charlotte Area Case Studies program in 10th**; College Night for Juniors, PSAT/NMSQT and teacher-rec requests in 11th; **College Application and Essay Workshop in August** before senior year. Putting sophomores inside a mock admissions committee is unusual and shows a live regional counselor network.

6. **The outcomes list is honest across the whole distribution — including the parts most schools hide.** 141 seniors enrolled at **70 institutions across 23 states, DC, and Canada**; **55% public, 45% private**; and the published acceptance list includes **Cape Fear and Central Piedmont community colleges** alongside Princeton and MIT. **32 students to UNC-Chapel Hill** (23% of the class) is a pipeline of real economic value, and **$14.7M in scholarship offers** plus a substantial HBCU pipeline (NC A&T, Howard, Hampton, Clark Atlanta all enrolling) show breadth rather than a prestige highlight reel.

### Ask on the tour — questions targeting what CCD does NOT publish

1. **"Your 2024-25 profile published SAT and ACT middle-50% ranges. The 2025-26 profile dropped them and replaced them with per-quintile medians. Why — and what were the Class of 2025 and 2026 SAT/ACT middle-50% ranges and how many students tested?"**
   *Targets the single biggest disclosure regression. The 2024-25 numbers were SAT total 1155–1385 and ACT composite 24–31; the number of testers has* **never** *been published in any year. Any school that shows medians but not N is showing you a shape without a sample size.*

2. **"The Class of 2025 had 2 National Merit Semifinalists and 2 Finalists. The classes on either side had 7 and 6 Semifinalists. What happened in 2025?"**
   *A 3x trough between two normal years, published in the school's own profile. Either a genuine cohort anomaly or a reporting issue — either way the answer is informative.*

3. **"No Class of 2026 student enrolled at an Ivy, though the four-year list shows acceptances at seven of the eight — Harvard is absent across seven published classes. How do you read that, and what does your Ivy/Ivy-Plus matriculation look like year over year?"**
   *Tests whether they engage honestly with the acceptance-vs-matriculation gap. The four-year cumulative list makes single-year reality hard to see, and the Class of 2025 did enroll at Brown, Cornell, Dartmouth, Princeton and Yale — so 2026 is a real swing.*

4. **"What exactly does the '34 Morehead-Cain recipients' figure cover — how many years? And how many Morehead-Cain finalists and recipients did the Class of 2026 produce?"**
   *The landing page shows 34 next to Class of 2026 statistics, but the Class of 2026 post names exactly* **one** *Morehead-Cain Scholar. Ask them to state the window. This is the most misleading number on their website.*

5. **"How many learning specialists and academic coaches work with Upper School students, what are their credentials, and what is the caseload? And how do you report Honor Council findings and disciplinary actions on the secondary school report?"**
   *Two things published nowhere: the ERP names no staff, gives no count and no credentials; and the disciplinary-disclosure policy is entirely absent despite NACAC membership. Both matter enormously to specific families.*

6. **"How many colleges do your counselors visit each year, is the Senior Externship required, and what gap-year, post-AP computer science, and capstone-research options exist?"**
   *A cluster of unpublished items: staff campus-visit counts are absent entirely; externship is one day in January with 136 of ~141 seniors participating but is never stated as required; there is* **no post-AP CS course** *despite Calculus III and post-AP chemistry existing; and there is* **no required capstone or independent research** *and no gap-year disclosure of any kind.*

### Sources

- https://resources.finalsite.net/images/v1759320688/charlottecds/dn5vss9ud5xxwzyt70ah/CCDSSchoolProfile2025-2026-FINAL.pdf
- https://resources.finalsite.net/images/v1726775598/charlottecds/enzt08thdabvh3uxiz0i/2024-2025CCDSSchoolProfile.pdf
- https://www.charlottecountryday.org/uploaded/country_day_education/college_guidance/CCDSCollegeProfileFINAL.pdf
- https://resources.finalsite.net/images/v1779992327/charlottecds/qit66txtuedke1lr4hcx/CollegeAcceptances2023-2026.pdf
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/class-of-2026-college-admissions-outcomes
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/congratulations-national-merit-semifinalists
- https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/allison-slater-tate-appointed-director-of-college-counseling
- https://www.charlottecountryday.org/cd-education/college-counseling
- https://www.charlottecountryday.org/cd-education/college-counseling/meet-our-team
- https://www.charlottecountryday.org/cd-education/educational-resource-program
- https://www.charlottecountryday.org/bucsnet/upper-school/college-counseling
- https://www.charlottecountryday.org/cd-experience/beyond-the-classroom/externship
- https://www.charlottecountryday.org/cd-experience/athletics/collegiate-athletics
- https://www.charlottecountryday.org/cd-education/upper-school/us-curriculum/off-campus
- https://www.usnews.com/best-colleges/rankings/national-universities

---

## Appendix — Master source list

**School Profiles (PDF)**
- 2025-26: https://resources.finalsite.net/images/v1759320688/charlottecds/dn5vss9ud5xxwzyt70ah/CCDSSchoolProfile2025-2026-FINAL.pdf
- 2024-25: https://resources.finalsite.net/images/v1726775598/charlottecds/enzt08thdabvh3uxiz0i/2024-2025CCDSSchoolProfile.pdf
- 2015-16: https://www.charlottecountryday.org/uploaded/country_day_education/college_guidance/CCDSCollegeProfileFINAL.pdf

**College acceptance lists (PDF)**
- 2023–2026 (current, as of 5/28/2026): https://resources.finalsite.net/images/v1779992327/charlottecds/qit66txtuedke1lr4hcx/CollegeAcceptances2023-2026.pdf
- 2020–2023: https://resources.finalsite.net/images/v1686238614/charlottecds/sqapm2638povsgf4n5ga/CollegeAcceptances2020-2023.pdf
- 2013–2016: https://www.charlottecountryday.org/uploaded/country_day_education/college_guidance/College_Acceptances_2013-2016_(for_Profile).pdf
- 2022–2025 is embedded as page 4 of the 2025-26 School Profile PDF above.

**College counseling pages**
- https://www.charlottecountryday.org/cd-education/college-counseling
- https://www.charlottecountryday.org/cd-education/college-counseling/meet-our-team
- https://www.charlottecountryday.org/cd-education/college-counseling/college-search-process
- https://www.charlottecountryday.org/cd-education/college-counseling/for-college-representatives
- https://www.charlottecountryday.org/bucsnet/upper-school/college-counseling

**Academic / program pages**
- https://www.charlottecountryday.org/cd-education/upper-school
- https://www.charlottecountryday.org/cd-education/upper-school/us-curriculum
- https://www.charlottecountryday.org/cd-education/upper-school/us-curriculum/off-campus
- https://www.charlottecountryday.org/cd-education/upper-school/international-baccalaureate
- https://www.charlottecountryday.org/cd-education/educational-resource-program
- https://www.charlottecountryday.org/cd-education/international-studies
- https://www.charlottecountryday.org/cd-experience/beyond-the-classroom
- https://www.charlottecountryday.org/cd-experience/beyond-the-classroom/externship
- https://www.charlottecountryday.org/cd-experience/athletics/collegiate-athletics
- https://www.charlottecountryday.org/bucsnet/quick-reference

**News posts**
- Class of 2026 outcomes (5/26/26): https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/class-of-2026-college-admissions-outcomes
- Allison Slater Tate appointed Director (2/18/26): https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/allison-slater-tate-appointed-director-of-college-counseling
- National Merit Semifinalists (9/25/25): https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/congratulations-national-merit-semifinalists
- Academic Recognition — NM, AP, IB, Biliteracy (10/8/21): https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/students-shine-in-academic-recognition-programs
- Academic Recognitions (9/29/20): https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/academic-recognitions
- Celebrating Academic Honors (10/1/18): https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/celebrating-academic-honors
- Local Partnerships Elevate Senior Externship: https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/local-partnerships-elevate-country-days-senior-externship-program
- Seniors Gain Career Insights Through Externships: https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/seniors-gain-career-insights-through-externships
- Student-Athletes Commit to College Athletic Programs: https://www.charlottecountryday.org/news-events/news-details-page/~board/athletics-news/post/student-athletes-commit-to-college-athletic-programs2

**Third-party / rankings**
- https://www.usnews.com/best-colleges/rankings/national-universities
- https://www.collegekickstart.com/blog/item/u-s-news-world-report-posts-2026-college-rankings
- https://www.niche.com/k12/charlotte-country-day-school-charlotte-nc/
- https://www.niche.com/k12/charlotte-country-day-school-charlotte-nc/academics/
- https://en.wikipedia.org/wiki/Charlotte_Country_Day_School
