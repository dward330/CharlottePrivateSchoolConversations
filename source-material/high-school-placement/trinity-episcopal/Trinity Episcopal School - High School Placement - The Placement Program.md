# Trinity Episcopal School — High School Placement — The Placement Program

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** Direct `curl` fetch of raw HTML from the school's own site, text extracted
  locally. The blog was enumerated exhaustively at `blog.cfm?threadid=N` for N = 1..51;
  the staff directory and admission pages were fetched individually.
- **School:** Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202 — **K–8**.

### ⚠️ Disambiguation

"Trinity Episcopal School" in **Richmond VA** (`trinityes.org`) is a grades **8–12 high
school**; Austin TX and New Orleans also have schools of this name. Everything below is
from `tescharlotte.org` only. See the Placement Outcomes file for the full contamination
sweep (0 hits for every foreign-school marker).

## Source URLs

- **The counselor article** — https://www.tescharlotte.org/blog.cfm?threadid=6
  (⚠️ see the title-swap note below — this is NOT the post titled about counselors)
- Staculty directory — https://www.tescharlotte.org/about/faculty-staff-directory.cfm
- Admission team — https://www.tescharlotte.org/admission/
- The K-8 Advantage — https://www.tescharlotte.org/admission/k-8-advantage.cfm
- 8th Grade DC advocacy trip — https://www.tescharlotte.org/blog.cfm?threadid=15
- Advocacy panel — https://www.tescharlotte.org/blog.cfm?threadid=40

## ⚠️ A CMS defect: two blog posts have their titles SWAPPED

This matters because the obvious search lands on the wrong document.

| threadid | Title as published | What the body actually is |
|---|---|---|
| **7** | "High School Counselors Help Families Navigate Next Step" | the **Fé Patriciu hiring announcement** |
| **6** | "Trinity Featured in QCityMetro" | **the actual high-school-counselors article** |

Verified on both the `threadid` route and the canonical pretty-URL, and against
`og:title` — it reproduces both ways, so it is a genuine content error in the school's
CMS, not a fetch artifact. **threadid=6 is the substantive placement-process source on
the site.** (threadid=8 is a second, correctly-titled copy of the Patriciu announcement,
so that content is duplicated across 7 and 8.)

A second, independent title defect: **threadids 2 and 3 share the identical title**
"Trinity Celebrates the Class of 2023" with completely different bodies — #3 is the real
commencement story, #2 is a staff retirement tribute.

## The program, as the school describes it

From the school's own admission page (`/admission/k-8-advantage.cfm`), verbatim:

> "**Trinity's two high school counselors work closely with families and students to sift
> through the many options available for the next chapter in their education, whether it's
> in a public school, another independent institution, or a boarding school. This ensures
> that Trinity graduates enroll in and are prepared for the high school that is their best
> fit.**"

That three-way scope — public / independent / boarding — maps directly onto the
cumulative 57% / 31% / 12% split in the Placement Outcomes file.

> ⚠️ **The school writes "two high school counselors", NOT "two *dedicated* counselors".**
> The distinction is real: Lilla Clark's own directory title is "MS Language Arts Teacher
> & H.S. Counselor" — the role is explicitly combined with a teaching load. Do not add
> "dedicated".

### ⚠️ The two-counselor structure is RECENT — it began in 2023-24

From the counselor article (threadid=6, Aug 23 2023), verbatim:

> "To help with that process, Trinity **this year** added high school counselors as
> resources. Middle School Language Arts Teacher **Lilla Clark** is assisting families
> considering local and regional public and independent schools, and **Associate Director
> of Admission Benita Griffin** is aiding families interested in boarding schools."

"this year" dates the structure to the **2023-24 school year**. It is not a longstanding
program and should not be presented as one.

### What the counselors actually do — verbatim

Lilla Clark:
> "We spend a lot of time getting kids here, but we also have to think about when they're
> leaving… I want to prepare them for high school, socially and academically, and make sure
> that they're going to be set up for success."

Clark has been visiting area schools "and getting a feel for who might benefit from knowing
this school," then points families in a direction:
> "Do they want big class sizes? Are sports important? Extracurricular?"

On the boarding side (Benita Griffin, in 2023):
> "for every 8th Grader at Trinity and their different personalities and different
> strengths, there's a boarding school out there for their child if only they would
> consider pursuing it and exploring it."

## ⚠️ Who holds these roles TODAY — the 2023 article is stale on staffing

**Benita Griffin no longer appears in the staculty directory at all.** She is named as
the boarding counselor in the Sep 2023 article and as "Interim Director of Admission &
Financial Support" in the CAIS brochure. **Do not cite her as current staff.**

Current, as of the 2026-09-16 fetch:

| Person | Role | Scope |
|---|---|---|
| **Lilla Clark** | MS Language Arts Teacher & H.S. Counselor | public + independent |
| **Rudy Wise** | see title conflict below | boarding |

**⚠️ Rudy Wise's title disagrees between two live first-party pages:**

| Source | Title as published |
|---|---|
| `/admission/` (Admission Team block) | **"Director of Admission and Boarding School Placement"** |
| `/about/faculty-staff-directory.cfm` | **"Associate Director of Admission"** — drops placement entirely |

Attribute whichever is cited. The admission-page title is the one that carries placement
meaning; the disagreement is real and unresolved by any third source.

**Lilla Clark's title also varies across three sources:** "MS Language Arts Teacher &
H.S. Counselor" (directory), "Middle School Language Arts Teacher" (threadid=6, no
counselor title), "Middle School Language Arts Teacher **and High School Counselor**"
(threadid=28).

**⚠️ Do NOT fold in the other counselors.** Ashtyn Giller (Middle School Counselor) and
Claire Walter (K-4 Counselor) are **wellbeing/guidance roles, not placement**. The "two
high school counselors" count is Clark + Wise only.

## Related 8th-grade programming (context, not placement mechanics)

The 8th-grade year carries a Social Issues Seminar culminating in **an advocacy trip to
Washington, D.C., in May** (threadid=15), and an advocacy panel for 8th graders
(threadid=40). These are curricular/civic, **not** high-school placement steps — do not
present them as part of the placement process.

## ⚠️ Confirmed absent — the placement process is largely unpublished

Swept across all 100 sitemap pages + all 51 blog posts + both profile PDFs
(1,637,243 characters). Every one of these returned **zero** hits:

| What | Hits | Note |
|---|--:|---|
| **SSAT** | **0** | no outbound entrance test named |
| **HSPT** | **0** | no outbound entrance test named |
| SSATB / "Secondary School Admission" | **0** | |
| "high school fair" / "school fair" | **0** | |
| "mock interview" | **0** | |
| "test prep" | **0** | |
| "shadow day" | **0** | |
| "placement timeline" / "timeline" | **0** | what grade the search starts is never stated |
| "entrance test" / "placement test" / "standardized test" | **0** | |

**The outbound test question, specifically.** `ISEE` returns only **3 hits, all
INBOUND** — Trinity's own entrance testing for applicants coming *in*:

> "Grades 5-8 applicants take the **ISEE** (Independent School Entrance Exam)"
> "Complete testing: **CAIS (K-4) and ISEE (5-8)**"

With SSAT and HSPT both flat zero site-wide, **Trinity publishes nothing about any
standardized test its 8th graders sit for high school admission.** This is a safe
deliberate null.

### ⚠️ How to frame these nulls

The crawl was **sitemap-bounded (100 URLs)** and the **FACTS Family Portal is gated**.
So *"Trinity does not publish X publicly"* is well supported; *"Trinity does not do X"*
is **not**. A placement timeline or handbook is exactly the sort of document that would
live behind the parent portal.

Phrase every null as **"not published on the school's public site."**

One further limit worth recording: only one linked PDF (the school profile) was found
sitewide. Other `editoruploads` PDFs may exist unlinked from any crawled page.
