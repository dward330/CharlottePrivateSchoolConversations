# Covenant Day — Admissions — Live-Site Refresh 2026-10-02

## Provenance

- **Retrieved:** 2026-10-02, during the `/admissions-episode covenant-day` freshness check,
  and recorded during `/plan covenantadmissions`.
- **Method:** each page rendered in real Google Chrome via Playwright
  (`channel: 'chrome'`, `headless: false`), with every accordion force-opened before the
  `innerText` was read. `/admissions/process` is a JavaScript-rendered accordion that returns
  **no body text to a plain `curl`**, so that render is the only valid way to read it (see the
  method note in `Covenant Day - Admissions - Grade-by-Grade Application Plans.md`). The
  moved JK/K page was also confirmed by plain `curl`.
- **Sourcing constraint:** official covenantday.org pages only.
- **Scope:** this file records only what **changed** since the 2026-09-01 research pass. It
  **supersedes** the specific quotes named below in
  `Covenant Day - Admissions - Grade-by-Grade Application Plans.md`, and nothing else in it.

## What did NOT change (verified the same day)

Every date on the Key Dates list (Sep 8 2026 → Apr 16 2027, all twelve entries), the
priority-deadline footnote, the age guidance (four by Mar 1 2027 for JK, five by Jun 1 2027
for K), the screening instruments (WPPSi for JK–1, WISC V for 2–4, ISEE for 5–11), the
recommendation forms by grade, the $100 application fee, the $1,000 enrollment deposit, the
FACTS aid process and its NC Opportunity Scholarship precondition, the 2026-2027 tuition
chart, and the four admissions staff with their phone numbers.

## 1. CHANGED — the faith requirement (`/admissions/process`, step 5)

**Live wording, VERBATIM:**

> "The Admissions Office will provide a link to schedule your parent interview with the
> Admissions Director. **Covenant Day is a covenant Christian school. This means we partner
> with families in which at least one parent is a Christ-follower and is actively involved in
> a local Christian church. As such, parents will be asked to discuss their Christian
> testimony during the interview.** We also want to get to know your student! Therefore,
> every applicant will schedule a time to join us on campus. The Admissions Office will
> provide a link to schedule your student's visit."

**Superseded wording** (2026-09-01 file, §5 and "Faith requirements"): *"An essential
component for admission is the requirement that one or both parents be professing Christians
as evidenced by their confession of faith in Jesus Christ alone as Savior. As such, the
interview will be conducted to verify a Christian testimony from one or both parents and
ascertain agreement with the school's statement of faith."*

**What moved:**
- **Added:** active involvement in a local Christian church is now part of the requirement
  stated on the process page.
- **Gone:** "essential component for admission", "confession of faith in Jesus Christ alone
  as Savior", and agreement with the school's **statement of faith**. The phrase "statement
  of faith" appears **zero times** on the live process page and on the FAQs.

**Consistent with the FAQs** (`/admissions/faqs`, unchanged), VERBATIM:

> "In a covenantal Christian school, at least one parent must be a professing Christian with
> a personal relationship with Jesus Christ and active participation in a Christian church."

The FAQ admissions-criteria list still includes *"The family's active involvement in a local
church"* and *"The interview with the parents and student (grades 6-11)"*.

## 2. CHANGED — Grade 1's on-campus visit (`/admissions/process`, step 5)

**Live wording, VERBATIM:**

> - "JK/K/Grade 1 applicants will participate in our Little Lions Assessment with a small
>   group of applicants in their respective grade."
> - "Grades 2-5 applicants will work one-on-one with an academic resource therapist to
>   measure their reading, math, and writing proficiency."
> - "Grade 6 applicants will spend a morning shadowing a 6th-grade student, enjoy lunch with
>   the middle school, meet with an admissions staff member, and take a math and English
>   assessment."
> - "Grade 7-11 applicants will spend a morning shadowing a student in the middle or high
>   school, enjoy lunch with their peers, and meet with an admissions staff member."

**Superseded wording:** *"JK/K applicants will participate in our Little Lions Assessment
with a small group of JK/K friends."* / *"Grades 1-5 applicants will work one-on-one with an
academic resource therapist…"*

**What moved:** Grade 1 now takes the **Little Lions Assessment** (small group, with other
Grade 1 applicants) rather than the one-on-one session. The one-on-one session is now
**Grades 2–5**. The Grade 6 and Grade 7–11 bullets are unchanged.

This makes Grade 1 the one grade in the Grades 1–5 band whose on-campus visit **and**
screening instrument (WPPSi) both match the JK/K band, while its deadline and decision
calendar (Jan 15 → Apr 9) stay with Grades 1–11.

## 3. NEW — Come See Covenant times (`/admissions/comeseecovenant`)

**Live wording, VERBATIM:**

> "COME SEE COVENANT: JK–5 — Thursday, October 29 | 9:30–11:30 a.m. — Designed for families
> considering JK through 5th grade"
>
> "COME SEE COVENANT: JK–11 — Thursday, November 12 | 9:30–11:30 a.m. — Designed for families
> considering JK through 11th grade"

`/admissions/visit-cds` corroborates the days: *"join us at an upcoming Come See Covenant open
house event on either Thursday, October 29 (JK-5) or Thursday, November 12 (JK-11)."*

**Note on the earlier "NOT PUBLISHED" finding.** The 2026-09-01 file records that a prior
pass reported a 9:30–11:30 a.m. time and rejected it because *"the rendered Key Dates list
carries no time for either event."* That was correct **for the Key Dates list**, and it is
still true: the Key Dates list carries no time on 2026-10-02 either. The time is published on
the **event's own page**, which is the source for it. Cite `/admissions/comeseecovenant`, not
Key Dates.

## 4. MOVED — the JK/K page

- `https://www.covenantday.org/admissions/jk-and-kindergarten-clone` → **HTTP 404**
- `https://www.covenantday.org/admissions/jk-and-kindergarten` → **HTTP 200**, linked from the
  admissions nav as "Junior Kindergarten & Kindergarten"

Content is unchanged, VERBATIM: *"We recommend that a child be four years old by March 1,
2027, to apply for junior kindergarten (JK) and five years old by June 1, 2027, to apply to
kindergarten. Since each child is unique and develops on their own timeline, developmental
maturity, including social, emotional, physical, and academic readiness, is also considered
when recommending the best class for your child."*

## Sources

- <https://www.covenantday.org/admissions/process> — faith requirement and per-grade
  on-campus visit (rendered, accordions opened)
- <https://www.covenantday.org/admissions/comeseecovenant> — both event times
- <https://www.covenantday.org/admissions/visit-cds> — event days corroborated
- <https://www.covenantday.org/admissions/faqs> — covenantal-school definition, admissions
  criteria
- <https://www.covenantday.org/admissions/jk-and-kindergarten> — JK/K page at its new URL
- <https://www.covenantday.org/admissions> — Key Dates, re-verified unchanged
- <https://www.covenantday.org/admissions/apply-to-cds> — cycle and footnote, re-verified
  unchanged
- <https://www.covenantday.org/admissions/tuition-financial-aid> — aid and deposit,
  re-verified unchanged
- <https://www.covenantday.org/admissions/meet-the-team> — contacts, re-verified unchanged
