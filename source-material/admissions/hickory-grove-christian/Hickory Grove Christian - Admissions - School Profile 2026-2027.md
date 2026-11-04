# Hickory Grove Christian School — Admissions (High School Profile 2026–2027)

## Method

- **Compiled by:** Claude Code, during `/plan hgprofile`, 2026-11-04.
- **How:** the "About the School" block on page 1 of the school's own 2026–27 High School
  Profile, extracted with `pdftotext -layout` and transcribed verbatim. The full profile
  transcription, with the PDF's SHA-1, is in
  `source-material/college-support/hickory-grove-christian/Hickory Grove Christian - College Support - School Profile 2026-2027.md`.
- **Authority:** the school's live admissions pages remain the authority for the admissions
  process (see `… - Admissions - Live-Site Refresh 2026-10-04.md`). The profile is the
  school's own document too. Where it adds a requirement the live pages do not state, cite
  the profile. Where the two disagree, report it rather than choosing one.

## Source URLs

- https://resources.finalsite.net/images/v1790771210/hgchristianorg/l6paia83bjrvwh9kpm20/2026-2027SchoolProfile.pdf
  (2026–2027 High School Profile, page 1, "About the School")

## High-school admission requirement (verbatim)

"All students seeking enrollment in grades 9-12 are required to complete an entrance test for
the purpose of proper grade placement. **Prospective students must score at or above their
grade level and be in good standing with their current school to be admitted.**"

- The app's high-school band already says the entrance test is mandatory and decides grade
  placement. It does **not** state the **at-or-above-grade-level score bar** or the
  **good-standing** condition. The good-standing condition is consistent with the shipped
  "suspensions, expulsions or failed courses are an automatic denial" rule.

## Enrollment context (verbatim; not an admissions-process fact)

"We proudly serve a diverse population of 287 high school students with 60% being students
of color, including 3 international students representing the countries of Myanmar, South
Korea, and Vietnam."

- This is recorded for reference. The admissions guide has no enrollment field, and this plan
  adds none.

## Contact (verbatim, unchanged)

Sheila Chaney — Director of Admissions & International Student Program —
sheilachaney@hgchristian.org

## Live-site check (`/implement hgprofile`, 2026-11-04)

Before the profile's bar was written into the app, the live admissions pages were re-read in
Chrome. `https://hgchristian.org/admissions/admissions-process` and
`https://hgchristian.org/admissions/apply-to-hgcs` now both render the same rewritten
Admissions Home page.

- **Bar:** the page states no entrance-test requirement or grade-level bar, so it does not
  conflict with the profile. The profile's sentence was used.
- **Application fee: the live page now disagrees with the app.** It reads (verbatim):
  "Application Fee The application fee is non-refundable and is not applied toward tuition.
  STANDARD ENROLLMENT **$300** Applications submitted November 2, 2026 – May 31, 2027 LATE
  ENROLLMENT **$550** Applications submitted June 1, 2027 or later". The app (from the
  2026-10-04 refresh) ships $250 and $500. The windows are unchanged: November 2 for
  "EEC students, HGBC members, and siblings of current students", November 16 for "All new
  families". **Not changed by `hgprofile`**, which does not cover admissions fees. It is left
  for a separate admissions refresh.
- **Team (verbatim):** Sheila Chaney, Director of Admissions & International Student
  Program · Shelly Rivenbark, Registrar · Amanda Wright, School Finance · Jared Daulton,
  Communications Coordinator.
