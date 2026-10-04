# Hickory Grove Christian — Admissions — Live-Site Refresh 2026-10-04

## Provenance

- **Retrieved:** 2026-10-04, during the `/admissions-episode hickory-grove-christian`
  freshness check. Recorded during `/plan hickorygroverefresh`.
- **Method:** plain `curl` (desktop Chrome user agent) of each hgchristian.org page. Unlike
  Covenant Day, these Finalsite pages return their body text server-rendered, so no browser
  render was needed. HTML was stripped to text and the content block read directly. Both
  admission-checklist PDFs were re-fetched through `/fs/resource-manager/view/<guid>` (302 →
  resources.finalsite.net) and extracted with `pdftotext -layout`.
- **Sourcing constraint:** official hgchristian.org pages only.
- **Scope:** this file records only what **changed** since the 2026-09-01 research pass
  (`Hickory Grove Christian - Admissions - Grade-by-Grade Application Plans.md`) and the
  2026-08-17 financial-aid pass
  (`source-material/financial-aid-tuition/hickory-grove-christian/Hickory Grove Christian - Financial Aid - Deep Dive Report.md`).
  It **supersedes** the specific quotes named below in those files, and nothing else in
  them.

## What did NOT change (verified the same day)

The application windows (priority **November 2, 2026** for Hickory Grove Baptist Church
members, Early Education Center students and current-student siblings; public
**November 16, 2026**). Both checklist PDFs, still footed "Revised 11/17/25", including the
$500 nonrefundable enrollment deposit applied toward tuition, the per-grade forms, the
high-school-only shadow day and the automatic-denial rule. The TK/K5 birthday cutoffs
(October 16 / April 16) and the skills assessment. The international TOEFL Jr. 750+ /
SLEP 50+ thresholds, translated transcripts through IEE, health insurance through American
Benefit Services (843-214-2447), and full payment before the first day. Sheila Chaney,
"Director of Admissions and International Student Program", admissions@hgchristian.org
(`/admissions/international-program`). Mrs. Lori Cheuvront, Elementary School Principal
(`/academics/tk-or-k5`). The Apply page still reads "apply here for the 2026-2027 school
year". The Early Education Center phones (Harris 704-531-4059, Mallard Creek 704-531-5345).

## 1. CHANGED — the application fee window (`/admissions/admissions-process`)

Live, 2026-10-04:

> "APPLICATION FEE (TK - 12TH GRADE):"
> "APPLICATION FEE: $250.00 (November, 2 2026 - May 31, 2027)"
> "LATE ENROLLMENT APPLICATION FEE: $500 (June 1, 2027 and later)"
> "-Application fee is non-refundable"
> "-Application fee is NOT applied toward tuition"

**Supersedes** the 2026-09-01 quote "$250.00 (November, 17 2025 - May 31, 2026)" / "$500
(June 1, 2026 and later)". The school has rolled the window forward to the open cycle, so
the live inconsistency recorded in 2026-09-01 (a fee window that predated the application
dates on the same page) **no longer exists**. A 2027–28 applicant pays $250 through May 31,
2027.

## 2. GONE — the acceptance-before-aid precondition (`/admissions/scholarships`)

The 2026-09-01 pass recorded that "new families must be accepted for enrollment before
applying for aid". **The live page carries no such statement.** It now reads:

> "How do I apply for the HGCS Financial Aid or NCSEAA?"
> "FACTS Grant & Aid"
> "Apply immediately for any other financial aid from the school by requesting information
> from the finance office – email finance@hgchristian.org"
> "There is a $40 application charge from FACTS."

and, under "How does this help me?":

> "Everyone can now apply for the NCSEAA."
> "You can reduce overall tuition if awarded a 2026 - 2027 NCSEAA Scholarship."
> "If you are still waiting to receive the NCSEAA, you can apply for the HGCS FACTS Grant &
> Aid until all available funds have been allocated."
> "If you believe your needs will NOT be met through the NCSEAA, contact the Finance Office
> to apply for the limited amount of Hickory Grove financial assistance."

and under the income-cap question: "No income restrictions exist for APPLYING. There are
income considerations for the amount awarded."

## 3. CHANGED — the NC Opportunity Scholarship dates (`/admissions/scholarships`)

Live:

> "NCSEAA/Opportunity Scholarship"
> "Click here to apply"
> "Applications open February 1st."

No year, no closing date and no renewal date are given. **Supersedes** the 2026-09-01
"February 2 - March 2, 2026" window and "must be completed by April 15, 2026" renewal, and
the 2026-08-17 financial-aid file's "Feb 6 – Mar 6 (2025 cycle); priority deadline March 2,
2026 with April notification; late applications accepted through August". Those dates
belong to closed cycles and must not be restored from either file.

The award tiers on the page are unchanged and still labelled 2026-2027 ("The full award
amount for 2026-2027 is $7,942"; tiers $7,942 / $7,148 / $4,766 / $3,574). The page
contains one typo, "Tier 1: 100% of the 2026-2026 full award amount", which is recorded
here and not reproduced.

## 4. NEW / CHANGED — discounts (`/admissions/scholarships`)

> "HGCS does NOT provide AUTOMATIC discounts (i.e., multi-child, like-minded pastor,
> etc). HOWEVER, families will still earn a 5% discount for paying the entire school year
> tuition by May 31st."

New to the **admissions** record. The financial-aid file already held the 5% discount but
dated it "May 31, 2026". The live page gives **no year**, so the app should say "by May 31"
and nothing more.

## 5. NEW — the international application fee is now published with two timings

`/admissions/international-program/international-student-enrollment-process`, live:

> Step 2: "If accepted: You will be notified by email. Pay the non-refundable application
> fee. HGCS official will mail the I-20 if student is accepted."

and, at the foot of the same page (not recorded on 2026-09-01):

> "The application fee is due at the time of application and is non-refundable."

The page now contradicts itself on **when** the fee is paid. The amount is still not
published. The app should present both timings and send the family to the international
office, without picking one.

The "International Tuition/Fees include" list also now names **PSAT/ ACT testing**,
**Local College visits** and **Extra required class reading books**, alongside the items
already recorded (orientation, weekly meetings with the International Student Director,
reports to agencies and families, airport transportation, I-20 maintenance, daily school
lunch, athletic fee, Chromebook/technology fee, class field trips).

## 6. CHANGED — office hours (`/about-us/contact-uslocation`)

> "MAIN OFFICE HOURS/PHONE/FAX 7:30 AM–3:30 PM office: 704-531-4008 fax: 704-531-3509"

**Supersedes** the 2026-09-01 "Mon–Fri 7:30 a.m.–3:00 p.m." for the 704-531-4008 line. No
page carrying "3:00" was found on 2026-10-04. Division offices are listed as 7:15 AM–3:30 PM
(Elementary 704-531-4195, Middle 704-531-3519, High 704-531-4077).

## 7. NEW / CHANGED — Mallard Creek (`/academics/hgcs-mallard-creek-campus`, `/academics/early-education-center`)

> "This fall, Hickory Grove Christian School is exploring an expansion to our Mallard Creek
> Campus, beginning with Transitional Kindergarten and Kindergarten. This program would
> launch with a Classical Christian approach to education…"
> "The program would begin with Transitional Kindergarten (TK) and Kindergarten, which would
> be determined by enrollment. Long-term plans include growing one grade level at a time…"

The wording is **conditional** ("exploring", "would launch"), where the app says the campus
"is launching".

> "How do families apply? Families who are interested should submit an application. Due to
> the expected limited availability, applications submitted before February 18 will be
> considered first for enrollment."

**February 18 is deliberately NOT carried into the app.** The page gives no year, and the
"This fall … exploring" framing reads as the prior cycle's text. A bare "February 18" would
be spoken or read as a 2027 date the school has not published. The "expected limited
availability" is carried.

Early Education Center page: Mallard Creek EEC **email** `mallardcreekeec@hgchristian.org`,
which is new to the record (Harris: harriseec@hgchristian.org, already recorded).

## Out-of-scope finding (recorded, not acted on)

`/admissions/tuition-and-fees` now publishes financial policies: a written withdrawal notice
"minimum of two weeks prior to withdrawal" via the FACTS Family portal; records held on a
delinquent account; no re-enrollment after a year-end delinquency. The 2026-08-17
financial-aid report says "no late-payment or withdrawal terms appear on the retrieved
sources". That claim is now stale, but it is **not** one of the seven freshness-check
differences and is left for a separate pass.

## Sources

- https://hgchristian.org/admissions/admissions-process
- https://hgchristian.org/admissions/scholarships
- https://hgchristian.org/admissions/international-program/international-student-enrollment-process
- https://hgchristian.org/admissions/international-program
- https://www.hgchristian.org/about-us/contact-uslocation
- https://hgchristian.org/academics/hgcs-mallard-creek-campus
- https://hgchristian.org/academics/early-education-center
- https://hgchristian.org/academics/tk-or-k5
- https://hgchristian.org/admissions/apply-to-hgcs
- https://hgchristian.org/admissions/tuition-and-fees
- https://www.hgchristian.org/fs/resource-manager/view/adf10069-819d-4420-83c4-ebba8281c071 (elementary checklist, Revised 11/17/25)
- https://www.hgchristian.org/fs/resource-manager/view/c7376a64-1d57-4a98-a5fb-6cab591a4c65 (middle & high checklist, Revised 11/17/25)
