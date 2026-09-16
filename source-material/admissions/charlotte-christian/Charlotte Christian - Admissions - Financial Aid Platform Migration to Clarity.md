# Charlotte Christian — Admissions — Financial Aid Platform Migration to Clarity

## Provenance

- **Who / when:** retrieved 2026-09-14 by Claude (Opus 5) during the
  `/admissions-episode` freshness check for Charlotte Christian School, and
  re-verified 2026-09-15 while planning `ccaid`.
- **How:** `curl` of the school's own live pages, read as raw HTML rather than
  through a summarizer (see the trap below), plus `pdftotext` of the five
  admissions PDFs the Apply page links.
- **Why it exists:** the app's shipped admissions card
  (`src/data/admissionsPrograms/charlotte-christian.ts`) states the school uses
  **SSS by NAIS, school code 2318**, requires a parallel **NC Opportunity
  Scholarship** application, and that the current-cycle aid deadline is **not
  published**. All three are now wrong on the school's own site.

## Source URLs

- https://www.charlottechristian.com/admissions/tuition — tuition & financial
  assistance (the page carrying every finding below)
- https://www.charlottechristian.com/admissions/apply — Apply, stamped
  "Updated: 9/1/2026", labelled "Application Process for the 2027-28 School Year"
- https://www.charlottechristian.com/fs/resource-manager/view/8927b24e-2e89-43ee-857d-77b3310982c2 — 2026-27 Admissions Calendar PDF
- https://www.charlottechristian.com/fs/resource-manager/view/b895e462-2799-4653-ab0b-f27eaaecca24 — 2026-27 Tuition & Fees PDF

## Finding 1 — aid moved from SSS by NAIS to Clarity

Verbatim from the live tuition page:

> "Apply for Financial Assistance via Clarity … The application takes less than
> an hour to complete and is mobile-friendly. The application fee is $65.
> Current family applications are due by Nov. 1, 2026. Prospective family
> applications are due by Jan. 22, 2027."

> "All financial assistance is awarded based on demonstrated financial need and
> is assessed through an independent third-party program, Clarity."

**Measured, not inferred:** on the raw HTML of that page, `SSS` = 0
occurrences, `NAIS` = 0, `2318` = 0. The school code no longer applies — Clarity
does not use one.

Support contacts published for Clarity: support@clarityapp.com, 206-210-3752.

## Finding 2 — the aid deadlines ARE published

| Who | Deadline |
|---|---|
| Prospective families | **Jan 22, 2027** |
| Current families | **Nov 1, 2026** |

The app currently says *"The deadline for this cycle is not published — confirm
it with the business office."* That was correct when researched (the only dated
sheet was a prior cycle's) and is now superseded.

Note Jan 22 falls **a week after** the Jan 15 grades 1–12 application deadline
and **three weeks after** the Jan 2 JK/K one.

## Finding 3 — the NC Opportunity Scholarship requirement is GONE

`Opportunity` = 0 occurrences and `ncseaa` = 0 on the live tuition page. The app
currently states every aid family "must ALSO apply to the North Carolina
Opportunity Scholarship Program, which opens February 2" and calls it "a second,
mandatory application."

Corroborating, from elsewhere in this repo's own research
(`src/data/financialAidReports.ts`, the Charlotte Christian block): "North
Carolina Opportunity Scholarship participation concludes after 2025–26."
That is consistent with the requirement disappearing for the 2027-28 cycle.

## Finding 4 — Clarity webinar dates (new, replaces the Opportunity item)

Free family information webinars covering the application and tax-verification
process, published on the same page:

- Tuesday, Sept. 29, 10 p.m. EST
- Wednesday, Sept. 30, 6 p.m. EST
- Tuesday, Oct. 27, 10 p.m. EST
- Wednesday, Oct. 28, 6 p.m. EST
- Tuesday, Dec. 8, 8:30 p.m. EST

## Unchanged, re-verified 2026-09-14

- Aid is **need-based only**, capped at **50 percent of tuition** — verbatim:
  "Financial assistance grants will not exceed 50 percent of tuition."
- Awards granted only after a child is accepted.
- Enrollment deposit **$1,500**, new-family fee **$1,250**, international student
  fee **$2,000/yr**, installment fee **$300** (10-month plan), TPP **$250**.
- Tuition 2026-27: JK/K **$21,300** · Grades 1-4 **$23,295** · Grades 5-8
  **$24,575** · Grades 9-12 **$27,055**.
- Kimberly Davenport, business office, ext. 6202 — still the aid contact.

## ⚠️ TRAP — the $65 is NOT the application fee

The sentence "The application fee is $65" sits **inside the Clarity paragraph**
and is the **aid platform's** fee. The school's **admissions** application fee
is **$100**, stated four times on the Apply page and in all three process PDFs
("Submit application for each child with a $100 non-refundable fee").

A page summarizer conflated the two and reported the application fee as $65.
Reading the raw HTML separated them. **Both figures are real and they are
different fees — never collapse them.**

## ⚠️ Cycle labelling — the school's own documents disagree

The Apply page (rewritten 1 Sep 2026) heads these dates
**"Application Process for the 2027-28 School Year"**. The Admissions Calendar
and Tuition PDFs — unchanged since June/Aug 2026 — head the *same dates*
**"2026-27"**.

The dates are identical either way: apply Jan 2027 → decide Feb/Apr 2027 →
start **Aug 2027**, which is the **2027-28** school year. The school's newest
document is right; the PDFs carry the older labelling convention.

The app currently ships `cycle: '2026–27 entry cycle'`.

## Also noted — a typo on the school's live page

The Apply page's "Grades JK-1" tab reads *"Priority applications for JK/K are
due by January 2, **2026**"* while the top of the same page, the JK–Grade 1
checklist PDF and every other reference say **2027**. 2027 is correct.

This is a *second* such typo at this school: the Admissions Calendar PDF prints
"Sunday, Feb. 1, **2026** — JK-K File Materials Due", already documented and
corrected to 2027 in the app's data file.
