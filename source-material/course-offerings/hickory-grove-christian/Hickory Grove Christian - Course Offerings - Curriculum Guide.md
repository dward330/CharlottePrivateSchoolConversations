# Hickory Grove Christian School — Course Offerings

**Provenance**

- **Compiled by:** Claude Code deep research pass (`/implement add-hickory-grove-christian`).
- **Date compiled:** 2026-08-17
- **School / guide year:** Hickory Grove Christian School (HGCS), Charlotte NC — High
  School (grades 9–12). Guide year **2025-2026** (the on-site page is titled
  "2025-2026 Course Selection Guide").
- **Method:** Web search + direct fetch of HGCS's own published High School Profile PDFs
  (Fall 2025, Fall 2023, and an earlier Fall-2022 "NewHGHighSchoolProfile"), the
  high-school academics page, PrivateSchoolReview's HGCS profile, and the live +
  archived (Wayback 2025-10-28) "2025-2026 Course Selection Guide" page. **Numbers below
  (AP names, grading scale, graduation requirements, dual-enrollment partners, CEEB code)
  are verbatim from the Profile PDFs, which convert cleanly.**
- **⚠️ SUPERSEDED (2026-08-17) — the course-enumeration gap claimed below is WRONG.**
  This file concluded that a full per-department course enumeration was not publicly
  extractable because `/academics/guidance/courses` is a Finalsite JavaScript SPA that
  returns an empty body. That page is real, but it is **not the course catalog page**. The
  catalog lives at `/academics/high-school/college-and-career-planning/courses`, which
  embeds a Heyzine page-flip viewer backed by a plain **92-page PDF** whose text layer
  extracts cleanly. It yields **112 courses across 12 departments**, fully transcribed in
  the sibling file `… - 2026-2027 Course Selection Catalog.md`, which is now the
  authoritative source for this school's course data.

  **Everything else in this file remains valid** and is still the live source for the
  CEEB code, GPA/quality-point scale, class-rank policy, dual-enrollment partners,
  graduation-requirement credit counts and AP-exam results — all of which come from the
  HS Profile PDFs, not from the course-selection page. Only the *course-enumeration gap*
  claims are retracted: read the per-department section, the "Total US course count"
  derivation and the SPA-blocked flags below as a **historical record of a research
  dead-end**, not as current findings.

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://resources.finalsite.net/images/v1759254561/hgchristianorg/zymp8lu0k9m6ndgumpgi/HGCSHSProfileFall25.pdf | **2025-2026 HS Profile** — CEEB, grading/weighting scale, AP course list (14 named), honors departments, dual enrollment (Judson + NC CCP), 27-unit graduation requirements, AP-exam results |
| S2 | https://resources.finalsite.net/images/v1699879706/hgchristianorg/obmpbhs6ludijizshc8k/HGCSHSProfileFall23.pdf | **2023-2024 HS Profile** — same structure; AP list of 17 named (includes Human Geography, Computer Science A, Spanish Language & Culture); dual-enrollment credit via College at Southeastern |
| S3 | https://resources.finalsite.net/images/v1666012766/hgchristianorg/lptl19pbet7v9eowygvk/NewHGHighSchoolProfile.pdf | Earlier ("New") HS Profile (~2022-2023) — corroborates AP list + honors departments + College at Southeastern dual enrollment |
| S4 | https://www.hgchristian.org/academics/guidance/courses | "2025-2026 Course Selection Guide" — **SPA, body renders via JS; no static course list** (live + Wayback 2025-10-28 both empty of courses) |
| S5 | https://www.hgchristian.org/academics/high-school | HS overview — "advanced placement courses, a full honors track, a variety of electives", daily Bible, college-prep |
| S6 | https://www.privateschoolreview.com/hickory-grove-christian-school-profile | Third-party profile — "**17 Advanced Placement courses**" + AP Capstone Diploma; names 16 AP; "**Nine different dual-enrollment classes** transcripted through the College at Southeastern" |

## Metrics

| Metric | Value | Source |
| --- | --- | --- |
| Grade range (this area) | High School, grades 9–12 | S1 |
| Divisions with named course lists | ~~0 machine-readable~~ → **1 (Upper School)** — SUPERSEDED, see the banner above; the catalog is published | 2026-2027 Catalog |
| Upper-School departments | ~~**8**, derived from the 8 graduation-requirement credit areas~~ → **12**, per the catalog's own department sections (Bible, English, Math, Science, Social Studies, Foreign Language, Visual Arts, Performing Arts, Student Media, Technology, PE, Electives). The old 8 was a proxy built from graduation requirements because no department list was available. | 2026-2027 Catalog |
| Departments with an honors track | **6**: English, Math, Science, Social Studies, Bible, Foreign Language | S1, S2, S3 |
| **AP course count** | **17** AP courses, including the AP Capstone track (AP Seminar + AP Research) — now confirmed directly by the 2026-2027 catalog's own Advanced Placement section, which names exactly 17. The profile-vintage reconciliation below (14 in the 2025-26 profile, 17 in 2023-24) is retained as history but is no longer the basis for the figure. | 2026-2027 Catalog |
| AP Capstone | Yes — AP Seminar + AP Research; AP Capstone Diploma awarded (4 diplomas in 2024-25) | S1, S6 |
| Honors course count | **NOT PUBLISHED as a number.** Honors offered across the 6 departments above; individual honors titles are not enumerated in any machine-readable source. | S1 |
| Dual-enrollment programs | **2 partners:** (1) **Judson College** — on-campus courses awarded college credit (per S1, 2025-26); prior years credited via **the College at Southeastern** / Southeastern Baptist Theological Seminary (S2, S3). PrivateSchoolReview cites "nine different dual-enrollment classes transcripted through the College at Southeastern." (2) **NC Career and College Promise (CCP)** at local community colleges. Only HGCS-taught courses count as dual credit. | S1, S2, S3, S6 |
| **Total US (High-School) course count** | ~~NOT EXACTLY ENUMERABLE — SPA-blocked~~ → **112 courses** across 12 departments, counted from the 2026-2027 catalog. SUPERSEDED, see the banner above. | 2026-2027 Catalog |
| CEEB code | **340661** | S1, S2, S3 |
| GPA scale | 4.0 base (post-Spring-2024 scale). Honors = **+0.5** quality point; **AP = +1.0** quality point (S1). *(Earlier scale in S2/S3 weighted Honors +1.0 and AP +2.0 on a differently-anchored table.)* | S1 |
| Class rank | School does **not** rank students | S1 |
| Graduation credits | **27 units** | S1, S2 |
| AP-exam results (May 2025) | 82 students / 176 exams; 29 earned a 5, 59 a 4, 53 a 3 (on ≥1 exam) | S1 |

### Total US course count — how the figure was derived / why it is not exact

> **⚠️ RETRACTED 2026-08-17.** The reasoning in this section is preserved as the record of
> a research dead-end. Its conclusion is wrong: an exact public enumeration DOES exist, in
> the 2026-2027 Course Selection Catalog (112 courses, 12 departments). The "defensible
> floor of ~30+" and the "mark it NOT PUBLISHED" recommendation below are both obsolete —
> the Compare row now carries a real, sourced 112. Do not act on this section.

**There is no exact public enumeration of every High-School course.** Confidence: the
*count of AP courses* is high (17 + Capstone, corroborated by two independent sources);
the *total* course count is **not derivable** because the regular/honors course titles are
delivered only through the JS SPA course-selection widget (S4), which exposes no static
list, JSON, or PDF, and no archived copy exists. Any single total would be fabricated.

Best-supported partial floor, if a number is required for a Compare row:
- **17 AP courses** (named) **+ AP Capstone** are confirmed.
- **6 honors-bearing departments** each imply ≥1 honors course (≥6 honors courses).
- **8 required subject areas** each imply ≥1 standard course (≥8 standard courses).
- This yields a **defensible floor of ~30+ distinct HS courses**, but the true figure is
  higher (electives, multi-level sequences) and **cannot be pinned char-for-char**.
- **Recommendation:** mark the total course count as **NOT PUBLISHED / SPA-blocked** for
  the Compare row rather than shipping an invented total. The **AP count (17)** is the
  reliable, comparable figure this research area can populate for HGCS.

## AP courses (verbatim from the Profile PDFs) + reconciliation

**S1 — 2025-2026 HS Profile names 14** (copied char-for-char, expanding the profile's
run-on list; each is an "AP" course):

English Language and Composition · English Literature and Composition · Biology ·
Chemistry · Environmental Science · Statistics · Calculus AB · Calculus BC · US History ·
US Government and Politics · Psychology · Studio Art 2-D · AP Seminar · AP Research.

**S2 — 2023-2024 HS Profile names 17** (adds three the 2025-26 sheet omits):

English Language and Composition · English Literature and Composition · Biology ·
Chemistry · Environmental Science · Statistics · Calculus AB · Calculus BC · US History ·
US Government and Politics · **Human Geography** · **Computer Science A** · Psychology ·
**Spanish Language & Culture** · Studio Art 2-D · AP Seminar · AP Research.

**S6 (PrivateSchoolReview) reports "17 AP courses" + AP Capstone** and names 16:
AP Biology · AP Calculus AB · AP Calculus BC · AP Chemistry · AP Computer Science A ·
AP English Language and Composition · AP English Literature and Composition ·
AP Environmental Science · AP Government & Politics · AP Human Geography · AP Psychology ·
AP Research · AP Seminar · AP Spanish Language and Culture · AP Statistics ·
AP U.S. History. *(This list omits Studio Art 2-D, which the school's own profiles name.)*

**Reconciliation / headline figure:** the **"17 AP courses + AP Capstone"** count
(S4 page title / S6) is the school's current marketing figure and the best headline. The
**2025-26 profile's shorter named list (14)** reflects courses *offered/staffed that
year* (Human Geography, Computer Science A, Spanish Lang & Culture were listed in
2023-24 but dropped from the 2025-26 named list; the count "17" evidently still counts the
full catalog). **Union of all named AP titles across sources (18 distinct):**
AP English Language and Composition · AP English Literature and Composition · AP Biology ·
AP Chemistry · AP Environmental Science · AP Statistics · AP Calculus AB · AP Calculus BC ·
AP US History · AP US Government and Politics · AP Human Geography · AP Computer Science A ·
AP Psychology · AP Spanish Language and Culture · AP Studio Art 2-D · AP Seminar ·
AP Research. **TO VERIFY:** exactly which of the 18 are active in 2025-26 (profile names
14; school advertises 17). Do not ship a specific AP-title list as "current" without
confirming against the live SPA guide.

## Honors courses (verbatim, S1/S2/S3)

"Honors Courses are available in **English, Math, Science, Social Studies, Bible, and
Foreign Language**." Individual honors course *titles* are **NOT PUBLISHED** in any
machine-readable source (they live only in the JS course-selection guide).

## Dual enrollment (verbatim, S1)

"Several courses are offered on campus and awarded credit by **Judson College**. Also,
many students enroll in courses through the **NC Career and College Promise program** at
local community colleges. (Only courses taught by HGCS teachers are offered as dual
credit.)"

Prior-year phrasing (S2, S3): dual-enrollment courses "offered on the campus of HGCS and
awarded credit by **the College at Southeastern**, which is part of Southeastern Baptist
Theological Seminary," plus NC Career and College Promise. PrivateSchoolReview (S6):
"**Nine different dual-enrollment classes** transcripted through the College at
Southeastern."

## Graduation requirements (verbatim, S1 — Classes 2016 and beyond)

Bible 4 units · English 4 units · Math 4 units · Social Studies 4 units · Science 3 units ·
Foreign Language 2 units · Health/PE 1 unit · Fine Arts 1 unit · Electives 4 units —
**Total 27 units.**

## Per-department course enumeration (High School / Upper School, 2025-2026)

> **⚠️ SUPERSEDED 2026-08-17 — see the sibling file `… - 2026-2027 Course Selection
> Catalog.md`,** which enumerates all 112 courses across 12 departments from the school's
> own published catalog. The "BLOCKED" status below was a wrong-URL error, not a real
> publication gap. The AP/honors/department detail here still reflects what the HS Profile
> PDFs say, and is kept for that provenance; the *enumeration is impossible* claim is not.

**STATUS: BLOCKED — the school does not publish a machine-readable course catalog.** The
"2025-2026 Course Selection Guide" (S4) renders its course list only through a client-side
Finalsite widget; the live page, its Wayback 2025-10-28 snapshot, and an
`X-Requested-With` API fetch all return **site chrome with an empty content body**, and no
downloadable course PDF exists anywhere on the domain (verified via Wayback CDX). What each
department is confirmed to contain, from machine-readable sources:

- **Bible** (4 units required) — daily Bible; honors track available. *Individual titles
  not published.*
- **English** (4 units) — honors track; AP English Language and Composition, AP English
  Literature and Composition. *Regular/honors titles not published.*
- **Math** (4 units) — honors track; AP Calculus AB, AP Calculus BC, AP Statistics.
  *Regular/honors titles (e.g. Algebra, Geometry, Precalculus) not published.*
- **Science** (3 units) — honors track; AP Biology, AP Chemistry, AP Environmental
  Science. *Regular/honors titles not published.*
- **Social Studies** (4 units) — honors track; AP US History, AP US Government and
  Politics, AP Human Geography (named 2023-24), AP Psychology. *Regular/honors titles not
  published.*
- **Foreign Language** (2 units) — honors track; AP Spanish Language and Culture (named
  2023-24 / S6). *Regular titles (e.g. Spanish I–IV) not published.*
- **Health/PE** (1 unit). *Titles not published.*
- **Fine Arts** (1 unit) — Performing Arts + Visual Arts programs (per site nav); AP
  Studio Art 2-D. *Titles not published.*
- **Electives** (4 units) — "a variety of electives" (S5); also AP Seminar + AP Research
  (AP Capstone), AP Computer Science A (named 2023-24). *Full elective list not published.*

## Flags

- ~~**NOT EXTRACTABLE (SPA-blocked):** the full per-department course catalog and any exact
  total HS-course count.~~ **RESOLVED 2026-08-17** — the catalog is published as a PDF
  behind a Heyzine flipbook; **112 courses across 12 departments** are enumerated in the
  sibling 2026-2027 Course Selection Catalog file. The SPA page examined here was simply
  the wrong URL.
- ~~**NOT PUBLISHED (number):** honors course count; individual honors/regular course
  titles.~~ **RESOLVED** — the catalog names every regular, CP, Honors and AP title.
- **TO VERIFY:** the current dual-enrollment partner name (2025-26 profile says **Judson
  College**; prior years + PrivateSchoolReview say **College at Southeastern**). The AP
  question is now settled: the 2026-2027 catalog names exactly **17**.
- **CONFIRMED, reliable for Compare:** total course count **112**; **12** departments; AP
  count **17** (incl. AP Capstone); honors across **6** departments; dual enrollment via
  **2 programs** (Judson College / College at Southeastern + NC Career & College Promise);
  **27** grad units; CEEB **340661**; school does not rank.
