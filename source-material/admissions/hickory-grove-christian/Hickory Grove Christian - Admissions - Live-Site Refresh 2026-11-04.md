# Hickory Grove Christian School — Admissions (Live-Site Refresh 2026-11-04)

## Method

- **Compiled by:** Claude Code, on the user's request (2026-11-04) to update the admissions
  data that had gone out of date, during `/implement hgprofile`.
- **How:** every hgchristian.org URL the admissions card cited was loaded in real Google
  Chrome (Playwright, `channel: 'chrome'`), every "Expand All" accordion opened, and the
  page text read. The linked PDFs were downloaded and read with `pdftotext -layout`.
- **What happened to the site:** hgchristian.org was restructured onto a ParentSquare
  "smartsites" build. **Every old `/admissions/…` and `/academics/…` URL now redirects to a
  hub page** (`/admissions-home` or `/academics-home`), and the two checklist PDFs at
  `/fs/resource-manager/view/<guid>` now return **HTTP 404**. The pages and documents now
  live at the URLs below.
- Supersedes the corresponding facts in `… - Admissions - Live-Site Refresh 2026-10-04.md`
  where they disagree. That file stays the record of the October state.

## Source URLs (live 2026-11-04)

| Page | URL | Replaces |
|---|---|---|
| Admissions Home | https://hgchristian.org/admissions-home | `/admissions/admissions-process`, `/admissions/apply-to-hgcs` |
| Elementary checklist PDF (Revised 11/17/25, posted 2026-10-08) | https://files.smartsites.parentsquare.com/14485/newfamilyadmissionschecklistesnodate.pdf | `/fs/resource-manager/view/adf10069-…` (404) |
| Middle & high checklist PDF (Revised 11/17/25, posted 2026-10-08) | https://files.smartsites.parentsquare.com/14485/newfamilyadmissionschecklistmhsnodate.pdf | `/fs/resource-manager/view/c7376a64-…` (404) |
| What is TK and K5? | https://hgchristian.org/tk-and-k5 | `/academics/tk-or-k5` |
| NC State Scholarships | https://hgchristian.org/scholarships | `/admissions/scholarships` |
| Scholarships & Financial Aid Home | https://hgchristian.org/scholarships-financial-aid | new |
| Federal Education Tax Credit | https://hgchristian.org/taxcredit | new |
| Tuition and Fees | https://hgchristian.org/tuition-and-fees | `/admissions/tuition-and-fees` |
| Tuition rates PDF (Revised 1/5/26) | https://files.smartsites.parentsquare.com/14485/tuitionrates26-27.pdf | new |
| Educational Support Services fees PDF (Revised 1/22/26) | https://files.smartsites.parentsquare.com/14485/edsupportservicesfees26-27.pdf | — |
| International Student Program Home | https://hgchristian.org/international-program-home | `/admissions/international-program` |
| International Student Program Admissions | https://hgchristian.org/international-student-enrollment-pr | `/admissions/international-program/international-student-enrollment-process` |
| International Student Host Family Program | https://hgchristian.org/host-families | `/admissions/international-program/host-families` |
| Early Education Center Home | https://hgchristian.org/early-education-center-home | `/academics/early-education-center` |
| Mallard Creek Campus (EEC) | https://hgchristian.org/mallard-creek-campus | — |
| Harris Campus (EEC) | https://hgchristian.org/harris-campus-home | — |
| Open House registration ("Step 2: Visit") | https://hgchristian.org/visit → https://docs.google.com/forms/d/e/1FAIpQLSclbYLClkKoIu9Xb8l-V-DUMQDqQA2Ta0My95XheY2c3PwrCg/viewform | — |

**Not found on the new site:** `/academics/hgcs-mallard-creek-campus` (the page that
described a classical Christian TK and Kindergarten at Mallard Creek) redirects to
`/academics-home`. None of 16 crawled academics and admissions pages mentions a classical
TK/K. The Mallard Creek FACTS portal (memberId 15083) still loads. Raised with the user,
not changed.

## Admissions Home (verbatim)

"Step 1: Inquire · Step 2: Visit · Step 3: Apply"

"Applications Open — Applications for the 2027-2028 school year open soon. We would love to
welcome your family to HGCS. FOR OUR HGCS FAMILY **November 2** EEC students, HGBC members,
and siblings of current students · WELCOMING NEW FAMILIES **November 16** All new families"

"Application Fee — The application fee is non-refundable and is not applied toward tuition.
STANDARD ENROLLMENT **$300** Applications submitted November 2, 2026 – May 31, 2027 · LATE
ENROLLMENT **$550** Applications submitted June 1, 2027 or later"

- **Changed:** the fee was $250 / $500 on 2026-10-04. The windows are unchanged.
- "Step 2: Visit" now links to `/visit`, which redirects to the **Admissions Open House**
  registration form: "Admissions Open House is scheduled for **Tuesday, November 10,
  2026**." Time slots: 12:00 pm, 4:00 pm, 6:00 pm. Grade-level tours: Elementary (TK-5th),
  Middle School (6th-8th), High School (9th-12th). Every attending adult must be listed with
  name and birthdate for a visitor badge.
- "Step 3: Apply" links to the FACTS portal for memberId 496 (Harris).

"Admissions & Enrollment Team": **Sheila Chaney**, Director of Admissions & International
Student Program · **Shelly Rivenbark**, Registrar · **Amanda Wright**, School Finance ·
**Jared Daulton**, Communications Coordinator. (Only Sheila Chaney's email is linked:
sheilachaney@hgchristian.org. General: admissions@hgchristian.org.)

## New-family checklists

Both PDFs were re-downloaded from their new URLs:

- elementary: SHA-1 `b3dce6e91138212a329053b6389bcb0d0ad6ceaa`
- middle & high: SHA-1 `24dfc27bb8d2c18929401167426ac8e2603de2f6`

Both footers still read "**Revised 11/17/25**". The text is **unchanged** from the October
record: the forms, testing after all forms arrive, the high-school-only shadow day, the
four-step sequence, the automatic-denial rule, and the "$500 nonrefundable deposit … will
apply toward tuition".

## TK and K5 (verbatim, unchanged)

TK for children "turning five on or before April 16"; K5 for those "turning five by October
16"; both "will still have to qualify for the program by passing a developmentally
appropriate skills assessment during the admissions process." Elementary School Principal:
Mrs. Lori Cheuvront.

## Financial aid (verbatim)

- Scholarships & Financial Aid Home: "HGCS also offers limited needs-based financial aid
  through FACTS Grant & Aid. Contact the Finance Office at finance@hgchristian.org.
  **Financial Aid Applications can only be submitted upon completion of your HGCS
  Application.**" — new wording. It is a completed-application precondition, not the
  acceptance precondition the 2026-10-04 refresh recorded as dropped.
- NC State Scholarships: "The Opportunity Scholarship Application will open February 1,
  2027, for the 2027-2028 School Year." FAQ (unchanged): no income cap on applying; FACTS
  "$40 application charge"; "Apply immediately…"; "HGCS does NOT provide AUTOMATIC discounts
  (i.e., multi-child, like-minded pastor, etc). HOWEVER, families will still earn a 5%
  discount for paying the entire school year tuition by May 31st." Also lists 2026-2027
  award tiers (full award $7,942; tiers $7,942 / $7,148 / $4,766 / $3,574). These are state
  figures, not recorded on the admissions card.
- Federal Education Tax Credit (verbatim, summarised): "Beginning January 1, 2027, a new
  federal program called the Education Freedom Tax Credit allows taxpayers to redirect a
  portion of the federal income taxes they already owe toward K–12 scholarships. North
  Carolina is a participating state". Gifts go through an approved Scholarship Granting
  Organization (SGO); "Families apply directly through the SGO, not through HGCS"; "Who is
  HGCS's SGO partner? We're finalizing that now and will announce it on this page." Up to
  $1,700 per individual, $3,400 for married couples filing jointly.

## Tuition and Fees (verbatim; Financial Aid & Tuition area, not admissions)

"2026-2027 Tuition and Fees — Elementary **$11,900.00** · Middle School **$12,900.00** · High
School **$14,100.00** · K-8th Spanish Immersion: Additional $700 · Bus Transportation:
From/To HGCS Mallard Creek Campus location is a yearly charge of $1,000 · TK-5th Grade After
School Childcare: $2,600; yearly · 6th-12th Grade After School Childcare: $1,300; yearly."

The PDF "2026-2027 HICKORY GROVE CHRISTIAN SCHOOL TUITION RATES AND YEARLY FEES" (Revised
1/5/26) carries the same figures, with "6th-12th grade After School Study Hall".

- **Discrepancy outside admissions:** Compare's tuition cell ships Hickory Grove Grades 9–12
  as `$13,750`. The school's own 2026–27 page and PDF say **$14,100**. That is the Financial
  Aid & Tuition area, so it was not changed in this admissions pass. It was reported to the
  user.

## International Student Program Admissions (verbatim)

"Admission to HGCS is based on the following: Online interview with the Director of the
International Student Program and the Principal · Completed online admission application ·
Prior academic and behavioral performance · Standardized test scores ( **TOEFL – 80 /
Duolingo 115**) *willing to discuss other testing options"

"Step 1 — Complete the following as part of the online application: Copy of passport and
birth certificate · Copy of immunization record · **Math and English teacher
recommendation** · TOEFL or Duolingo score sheet · High School transcript (translated into
English) · The previous 2 years of report cards (translated into English) · Any
accomodations plan, educational evaluations, medical diagnosis, if applicable. · **Pay the
non-refundable application fee**. Please refer to International Education Evaluations (IEE)
for assistance or email info@foreigntranscripts.com for further information."

"Step 2 — If accepted: You will be notified by email. The HGCS official will mail the I-20
to the parent/guardian if the student is accepted. Students must arrange an interview with
the U.S. Embassy in their respective country to obtain an F1 visa. HGCS Student Coordinator
will contact the student/agent with homestay information if homestay is required. **Full
payment must be received by August 1st before the student can be enrolled.** Submit the
following forms before arrival: Proof of health insurance — American Benefit Services
(Short Term Medical) - Call 843-214-2447 or email wesley.abs@gmail.com · International
student immunizations form · Current physical or health exam"

"If full payment is not made prior to the first day of school, the student's application
will be placed on financial hold. A student cannot attend school until financial
arrangements have been made. Re-enrollment in HGCS is not automatic."

Inclusions (unchanged): orientation, PSAT/ACT testing, weekly meetings with the International
Student Director, reports to agencies and families, Charlotte airport transportation at the
start and end of each year, I-20 maintenance, daily school lunch, athletic fee,
Chromebook/technology fee, local college visits, class field trips, extra required reading
books.

"**The application fee is due at the time of application and is non-refundable.** Students
who withdraw any time after school begins will be assessed the Early Withdrawal fee of
$500.00 and 50% of the International Tuition."

- **Changed against the app (2026-10-04 state):**
  - English thresholds: TOEFL Jr. 750 / SLEP 50 → **TOEFL 80 / Duolingo 115**.
  - Interview: "Skype, WeChat or WhatsApp with a school official", listed first → an **online
    interview with the Director of the International Student Program and the Principal**,
    listed as a basis of admission with no position in the steps.
  - The fee's timing is **no longer contradictory**: Step 1 includes paying it and the page
    says it is due at application. The amount is still not published.
  - **Math and English teacher recommendations** are now required (the app said none were
    published).
  - The **2 previous years of report cards (translated)**, a passport copy and any
    accommodations plan join the transcript.
  - Full payment has a date: **by August 1**.
  - The I-20 is mailed **to the parent/guardian**.
  - "SEVIS-certified" is not stated on the current pages.

International Student Program Home: "Established in 2013 with students from China, the HGCS
International Student Program has grown into a vibrant, multicultural community welcoming
students from around the world, including Vietnam, South Korea, France, the Ivory Coast,
Ecuador, Brazil, Myanmar, England, Congo, Bosnia, Jamaica, the Bahamas, and Germany."

Host Family Program: offers "members of Hickory Grove Baptist Church and families with
students enrolled at HGCS" the chance to host; contact the Director of International Student
Program at admissions@hgchristian.org.

## Early Education Center (unchanged in substance)

Half-day preschool at Mallard Creek (9:00 AM–1:00 PM, September–May) and full-day preschool
at Harris (7 AM–5:30 PM). Harris 704-531-4059, harriseec@hgchristian.org; Mallard Creek
704-531-5345, mallardcreekeec@hgchristian.org. Monthly preschool tuition and a $150 Harris
application fee are published. Those are preschool figures, outside the TK–12 card.
