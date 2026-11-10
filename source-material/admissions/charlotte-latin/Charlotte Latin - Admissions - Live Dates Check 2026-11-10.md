# Charlotte Latin — Admissions — Live Dates Check 2026-11-10

## Provenance

- **Retrieved:** 2026-11-10 by Claude Code. The raw HTML was fetched with `curl` and tag-stripped, and the quotes below are exact text from it. This was a freshness check on whether Latin has published dates for the *following* cycle (fall 2028 entry), prompted by the "Next cycle: no dates published yet" line in `Charlotte Latin - Admissions - Grade-by-Grade Application Plans.md`.
- **Sources (official school pages only):**
  - https://www.charlottelatin.org/admissions/application-process
  - https://www.charlottelatin.org/admissions
- **Cycle convention:** the site labels a cycle by the school year the child **enters** (user decision 2026-11-10). The dates below are for fall 2027 entry, the **2027–28 entry cycle**.

## Finding 1 — no fall 2028 entry dates are published

Neither page mentions 2027–28 as an *application* year, 2028–29, or fall 2028. Every dated item is for the current cycle: deadlines in January–February 2027, and events and notifications in October 2026 through April 2027. So the research note's "next cycle: no dates published yet" is **still true** as of 2026-11-10. Only its label is now wrong: it says "(2027–28)", which under the entry-year convention is the *current* cycle.

## Finding 2 — dates the app data says Latin does not publish

The Application Process page now carries an **"Important Admissions and Financial Aid Dates"** block. Verbatim:

> Important Admissions and Financial Aid Dates
> September 15: Financial aid online application opens
> January 2: TK and K applications due
> January 15: Grades 1-11 applications due; New family/applicant deadline for financial aid application
> February 26: TK and K notification day; TK and K financial award decisions communicated
> April 9: Grades 1-11 notification day; Grades 1-11 financial aid award decisions communicated

The block gives no year. Every other date on the page is in 2027 (the "January 2, 2027 - Application due" lists, and "February 26, 2027 - All file material due"). Feb 26 and Apr 9 also match the 2027 notification dates the other CAIS schools in this app publish. So these are read as **February 26, 2027** and **April 9, 2027**. That reading is inferred from context; the block itself states no year.

The same page's event calendar also lists:

> Oct 15 2026 — K-12 Sibling Admissions Applications Due — all day — Hawks Club Room 4

The Admissions landing page still says:

> Applications for the 2026–27 school year are available through our online portal.

That is the school's own apply-year wording, and it is the same split Providence Day's site shows.

## Why it matters

`src/data/admissionsPrograms/charlotte-latin.ts` is built on "THE DEFINING STRUCTURAL FACT — NO DECISION OR CONTRACT DATES, ANY BAND" (verified 2026-08-31). Its checklist rows say "Confirm the decision and contract dates with admissions". As of 2026-11-10 the school publishes notification days for both tracks. It still publishes no enrollment-contract date. The file's header comment also records that "No sibling, legacy/alumni or faculty-children preference is published for TK–12". The calendar now shows a separate, earlier K-12 sibling application deadline (Oct 15, 2026, already past). A separate deadline is not by itself a published admission preference, but the card does not mention it.

This file is not ingested. A data refresh of the Latin admissions card should go through `/plan`.
