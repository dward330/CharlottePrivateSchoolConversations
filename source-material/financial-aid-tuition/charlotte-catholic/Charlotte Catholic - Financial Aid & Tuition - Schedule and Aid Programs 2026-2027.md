# Charlotte Catholic High School — Financial Aid & Tuition (Schedule and Aid Programs 2026-2027)

**Provenance**

- **Compiled by:** Claude Code deep research pass (`/implement add-charlotte-catholic`).
- **Date compiled:** 2026-08-18
- **Method:** Tuition and fee figures fetched directly from the **MACS** tuition and
  affordability page — **not** from the CCHS site, which does not publish tuition. Every
  figure below is quoted as published. Two well-known wrong sources were checked and
  rejected; both are documented under the warnings.
- **School:** Charlotte Catholic High School, grades 9–12, part of **Mecklenburg Area
  Catholic Schools (MACS)**, Diocese of Charlotte.

## ⚠️ Tuition is set centrally by MACS, not by the school

Unlike every independent school on this roster, CCHS does not set or publish its own
tuition. **MACS publishes one high-school schedule covering grades 9–12** at
discovermacs.org, and the school site links to it. That is why the source below is a
diocesan page rather than a school page.

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://www.discovermacs.org/admissions/tuitionandaffordability | **MACS Tuition & Affordability** — the 2026-27 high-school tuition schedule, all fees, Family Individualized Tuition, the Clarity application, multi-child discounts, OSP and ESA+, and every deadline below |
| S2 | https://catholicnewsherald.com/schools/94-news/schools/11321-apply-now-for-2025-26-opportunity-scholarships | NC Opportunity Scholarship context for diocesan families |

## Tuition 2026-2027, grades 9–12

| Rate | Amount |
| --- | --- |
| **Community rate** (non-parishioner) | **$21,562** |
| **Participating Catholic rate** | **$15,041** |
| **High International rate** | **$23,562** |

**The parishioner / non-parishioner split is a tuition structure no other school on this
roster shows.** A participating Catholic family pays **$6,521 less** than a community-rate
family for the same seat — a ~30% difference driven by parish participation rather than by
financial need. The app's `top-tuition` row uses the **$23,562** International rate as the
school's highest published tier, consistent with how that row is defined for other schools.

## Fees

| Fee | Amount |
| --- | --- |
| Application fee | **$120 per student** |
| Continuous enrollment fee | **$150 per returning student** |
| **Capital fee** | **$1,995 per family** |
| FACTS payment plan fee | **$15–$45 per family** |

Note the capital fee is charged **per family**, not per student — so it does not scale with
the number of children enrolled, unlike the application and enrollment fees.

## Financial aid mechanisms

- **Family Individualized Tuition (FIT)** — the need-based program. Awards vary by family
  circumstance and fund availability.
- **Clarity** is the need-assessment application. ⚠️ **Not FACTS and not TADS** — FACTS
  appears in this system only as the **payment processor**, which is an easy
  mis-attribution. The Clarity application carries a **$65** fee.
- **Multi-child discounts** (participating Catholic families only): **2nd child 10%** ·
  **3rd child 25%** · **4th child 50%** · **5th and additional children 100%**.
- **NC Opportunity Scholarship Program (OSP)** — awards up to **$7,000+** annually, with
  **no income cap**.
- **Education Student Accounts (ESA+)** — **$9,000** or **$17,000** yearly for students with
  qualifying disabilities.

## Deadlines

- **FIT applications: May 15** for returning students; new families are encouraged to apply
  alongside the admission application.
- **NCSEAA scholarship applications open in February** for the following school year.
- **2026-27 enrollment opens 3/23/26.**

## ⚠️ Two sources that are wrong, and are deliberately not ingested

1. **PrivateSchoolReview lists CCHS tuition as $45,000.** That is **demonstrably wrong** —
   more than double the official community rate of $21,562 published by MACS itself. Not
   used.
2. **The CCHS page titled "Financial Aid and Scholarships" is about COLLEGE financial aid
   for seniors** (FAFSA, college scholarship search), **not** CCHS tuition assistance. It
   is an easy mis-ingest for a page with that exact title, and it is not the source of
   anything here.

## Confirmed structural nulls

- **`pct-aid`, `aid-awarded`, `avg-award` — permanently null.** MACS publishes aid figures
  **diocese-wide only**, never per school. There is no CCHS-specific percentage of students
  on aid, total aid awarded, or average award anywhere in the published record.
- **No Form 990 exists, structurally.** MACS operates under **EIN 56-1779865**, and
  ProPublica's Nonprofit Explorer states the organization "is not required to submit tax
  filings because the IRS designates it as a **religious organization**." **This is a
  permanent null, not a research gap** — no future pass will find a 990, and none should be
  spent looking. `hickory-grove-christian` already ships this same shape in the app.
- **`tuition-history` — not published.** MACS publishes only the **current** year's
  schedule. Secondary sources give conflicting older figures ($13,348 and $9,366) with no
  reliable year attribution; **those are not shipped**, because a tuition-history row built
  from unattributable figures is worse than no row. Archived MACS snapshots would be the
  path if this row is ever wanted.
