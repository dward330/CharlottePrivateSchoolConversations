# Providence Day School — Admissions Research: Live Process Page Refresh

Provenance header
- Compiled: September 8, 2026, during an `/admissions-episode` freshness check against
  the school's own live admissions pages.
- Method: direct retrieval of providenceday.org on 2026-09-08 (`curl` + HTML-to-text
  extraction; the grade-band detail sits inside Finalsite click-tiles, so it is present
  in the served HTML but invisible to a naive text scrape — the tile content was
  extracted from the served markup and is quoted verbatim below).
- **Why this file exists.** The original research file in this folder
  ("Providence Day - Admissions - Grade-by-Grade Application Plans.md", Aug 30 2026)
  carries this caveat: *"The live admissions-process page could not be fetched during
  research. Grade-level detail comes from the official providenceday.org mirror
  ('clone') page reflecting the 2025–2026 cycle."* Six fields were consequently recorded
  as **NOT PUBLISHED**. That was a retrieval failure, **not** a publication gap — the
  school does publish all six, on the page that could not be reached. This file records
  the live page and supersedes those six markers only.
- Every figure below is copied char-for-char from the school's own pages.
- Where the school still publishes nothing, this file continues to say **NOT PUBLISHED**.
  Those markers remain load-bearing and the app must keep rendering them as
  "confirm with admissions".

**Cycle caveat — read before using any date.** The school's own two pages disagree on the
cycle LABEL while agreeing exactly on the dates. The calendar page is headed
"2026-2027 Admissions Dates & Deadlines"; the apply buttons on the admissions-process page
are headed "2027-2028 APPLICATION". The dates are identical on both pages and identical to
what the app already ships (Jan 2 2027 → Mar 5 2027), and they are for a child **starting
in fall 2027**. No date changed. The app's existing label follows the calendar page and is
left unchanged. Verify against the live calendar before acting — cycle dates shift year to
year.

## Source URLs

- Admissions process, grade-band detail (LIVE — the page the original research could not reach) — https://www.providenceday.org/admissions/admissions-process
- Admissions calendar, dates and deadlines, office contacts — https://www.providenceday.org/admissions
- Tuition and Financial Assistance — https://www.providenceday.org/admissions/tuition-and-financial-assistance
- Charger Commons application portal — https://providenceday.myschoolapp.com

---

## 1. What did NOT change

Every date the app already held was re-verified against the live calendar on 2026-09-08
and matches char-for-char. No date, fee or deposit was corrected.

Verbatim from the live admissions calendar:

> Oct 22 2026 — Lower School Admission Open House: Grades TK-5, 6:30 PM - 8:00 PM
> Nov 1 2026 — All School Admission Open House: Grades TK-12, 2:00 PM - 4:00 PM
> Jan 2 2027 — TK/K Application Form Deadline
> Jan 15 2027 — Grades 1-12 Application Form Deadline
> Feb 1 2027 — TK/K Application Materials Due
> Feb 26 2027 — TK/K Decision Notification at 4:00 p.m.
> Feb 26 2027 — Grades 1-12 Application Materials Due
> Mar 5 2027 — TK/K Contracts Due at Noon

Verbatim from the Tuition and Financial Assistance page (unchanged):

> Providence Day School partners with Clarity to determine financial need — fee "$65"
> Financial aid deadline, prospective families: "January 22, 2027"
> Financial aid deadline, current families: "November 13, 2026"
> "$2,500 non-refundable deposit" — "The deposit is then credited to the overall tuition cost"
> "Applying for financial assistance does not influence a candidate's admission selection
> to Providence Day. Separate committees make decisions regarding financial assistance
> and admission."
> 2026-2027 tuition: Transitional Kindergarten "$25,510" · Kindergarten "$28,010" ·
> Grades 1-5 "$32,960" · Grades 6-12 "$36,325"

---

## 2. NEWLY RETRIEVED — the six fields previously marked NOT PUBLISHED

All quotes below are verbatim from https://www.providenceday.org/admissions/admissions-process

### 2.1 TK/K — confirms the existing record (no change)

> The application form for Transitional Kindergarten and Kindergarten is due by January 2
> for first round consideration. All other supporting materials and assessments are due by
> February 1.
> First-round decisions are released at 4:00 p.m. on February 26.
> Applications submitted after the deadline are reviewed on a rolling basis for any
> remaining positions at each grade level.

Required Supporting Materials and Assessments:

> Preschool Teacher Recommendation Form
> Wechsler Preschool and Primary Scale of Intelligence - Fourth Edition (WPPSI-IV)
> Applicants must be at least 4 years old at the time of assessment administration
> TK/K School Readiness Screening
> TK/K Classroom Visit

### 2.2 Grades 1–5 — decision date, assessments and materials (was NOT PUBLISHED ×3)

> Please submit the application form for Grades 1-5 by January 15 to be considered in the
> first round. Supporting materials and assessments are due by February 26.
> **First-round decisions are released at 4:00 p.m. on April 9.**
> Applications submitted after the deadline are reviewed on a rolling basis for any
> remaining positions at each grade level.

Required Supporting Materials and Assessments — **the band splits by grade**:

> Rising Grade 1
> Teacher Information Form
> PD Teacher Evaluation
> Report Card
> Wechsler Preschool and Primary Scale of Intelligence - Fourth Edition (WPPSI-IV)
>
> Rising Grades 2-5
> Teacher Recommendation Form
> Transcript Release Form (first semester or second quarter grades should be included)
> Day Visit and Teacher Evaluation
> Grades 2-4: Wechsler Intelligence Scale for Children (WISC-V)
> Grade 5: Independent School Entrance Exam (ISEE)

This resolves three prior markers at once:
- the **decision date** (app held time-only, "4:00 p.m., date on the live calendar")
- the **assessment instrument** (app held "Required — instrument not published")
- the **material list and recommendation form** (app held "form not published")

It also answers a question the app explicitly left open. The app's watch-out read: *"No
student-visit step published … That doesn't mean there isn't one. Ask on your tour."*
There **is** one — "Day Visit and Teacher Evaluation" — for Rising Grades 2–5. Rising
Grade 1 has no published day-visit step.

### 2.3 Grades 6–12 — decision date, recommendation forms, test (was NOT PUBLISHED ×2)

> The deadline to submit the application form for Grades 6-12 is January 15 for first round
> consideration. Supporting materials and assessments are due by February 26.
> **First-round decisions are released at 4:00 p.m. on April 9.**
> Applications submitted after the deadline are reviewed on a rolling basis for any
> remaining positions at each grade level.

Required Supporting Materials and Assessments:

> English Recommendation Form
> Math Recommendation Form
> Transcript Release Form (first semester or second quarter grades should be included)
> Optional Day Visit
> Student and Parent Interviews
> Independent School Entrance Exam (ISEE)

International Students:

> International students applying outside of China should follow the procedures for grades
> 9-12 and submit TOEFL scores (if English is not their primary language) and ISEE exam
> scores. International students applying from China and requiring an I-20 must begin the
> admissions process via our partners at TBI-New Oasis.

This resolves:
- the **decision date** (app held time-only)
- the **recommendation forms** (app held "forms not published") — they are the **English
  Recommendation Form** and the **Math Recommendation Form**
- **which test** — the app hedged "ISEE vs. SSAT, which level, isn't published". The ISEE
  is named outright as required. **Which LEVEL remains NOT PUBLISHED** — that hedge stays.

Also newly retrieved and not previously in the app: **Student and Parent Interviews** are a
required component for this band, and the Day Visit is **optional** here (contrast Grades
2–5, where it is required).

### 2.4 Application portal

> Charger Commons, our admissions portal

---

## 3. Admissions office — one addition

Verbatim from https://www.providenceday.org/admissions ("Meet the Admissions Team"):

> Lisa Knight — Assistant Head of School for Admissions and Enrollment Management — 704-887-6002
> Jennifer Newcombe — Associate Director of Admissions — 704-887-7015
> James Garland — Associate Director of Admissions — 704-887-6029
> Carissa Goddard — Assistant Director of Enrollment Management — 704-887-7057
> Ron Johnson — Admissions Officer — 704-887-7511
> Ellen Teyssier — Admissions Officer — 704-887-7097
> Blair Roberts — Admissions Services Manager — 704-887-7040
> **Angela Montague — Admissions Associate** (no phone published; email link only)

**Angela Montague is NEW** since the Aug 2026 retrieval. No other person, title or number
changed.

Spanish-language contact, verbatim from the same page (unchanged):

> Si prefiere comunicarse en Español, puede enviar un correo electrónico a
> claudia.trower@providenceday.org o llamar al teléfono 704-887-7023.

Campus address and main phone (unchanged):

> 5800 Sardis Road, Charlotte, NC 28270 — 704.887.6000

---

## 4. STILL NOT PUBLISHED — markers that must be preserved

The app must keep rendering these as "confirm with admissions". Each was re-checked on the
live pages on 2026-09-08 and is genuinely absent:

- **The application fee amount.** Searched both the admissions and admissions-process
  pages; no fee figure appears anywhere. (The $65 Clarity figure is the financial-aid
  platform fee, a different thing, and must never be presented as the application fee.)
- **The ISEE level** for Grades 6–12 (the exam has grade-banded levels; the school names
  the exam but not the level).
- **The TK/K age cutoff** beyond "at least 4 years old at the time of assessment
  administration" — no "turns 4/5 by September 1"-style rule is published.
- **Waitlist, sibling/legacy, transfer and mid-year policies** — not published on any page
  reviewed, consistent with the original research file.

---

## 5. Terminology introduced by this file

**WISC-V** — Wechsler Intelligence Scale for Children, Fifth Edition. Required for Rising
Grades 2–4. New to the app's data with this refresh; the shared glossary covers WISC and
should be checked for the `-V` form.

**TBI-New Oasis** — the school's named partner organization through which applicants from
China requiring an I-20 must begin the process. Spoken in the admissions episode; the
shared glossary has no entry.

Both are flagged for the shared glossary at
`source-material/admissions/_shared/Admissions - Shared - Terminology Glossary.md`.
