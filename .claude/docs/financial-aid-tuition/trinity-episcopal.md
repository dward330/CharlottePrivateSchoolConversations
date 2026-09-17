# Trinity Episcopal School — Financial Aid & Tuition
> Distilled from 4 source document(s) in `source-material/financial-aid-tuition/trinity-episcopal/`. Auto-extracted full text, lightly cleaned. Rebuilt 2026-09-16.
**Documents:** Financial Support, Form 990, School Profile 2026-27, Tuition and Fees


---

## Financial Support

*Source file: `Trinity Episcopal School - Financial Aid and Tuition - Financial Support.md`*

# Trinity Episcopal School — Financial Aid and Tuition — Financial Support

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** Direct `curl` fetch of the live tuition and admission-process pages, plus
 Internet Archive snapshots (raw `id_` modifier) via the Memento TimeMap endpoint.
 Every figure read verbatim from a retrieved document.
- **School:** Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202 — **K–8**.

## Source URLs

- Tuition & affordability — https://www.tescharlotte.org/admission/tuition-affordability.cfm
- Admission process — https://www.tescharlotte.org/admission/admission-process.cfm
- 2026-27 School Profile (PDF) — https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf
- Archived tuition pages — https://web.archive.org/web/timemap/link/https://www.tescharlotte.org/admission/tuition-affordability.cfm

## The headline figures — 2026-27

From the 2026-27 School Profile, verbatim:

> "**Financial Support Recipients: 31% of students** (excludes Tuition Remission)"
> "**Financial Support Awards: $2,139,114**"

Context from the same document: **operating budget `$11.09 million`**, enrollment **419**,
faculty/staff **59 faculty, 28 administrative, 7 extended day & support**.

So aid is roughly **19% of the operating budget** — but note that is a computed ratio,
not a published one; present the two figures, not the quotient.

## A three-point aid series — and the school has since DELETED its own statistic

Archived tuition pages carried a sentence the **live page no longer has** (grep for
"awarded" on today's page: **0 hits**):

> *(2023-09 → 2025-01)* "In the 2023-24 school year, we awarded **$2.1 million** in
> financial support to **26%** of our students."

> *(2025-09 → 2026-05)* "In the 2025-26 school year, we awarded **$2 million** in
> financial support to **29%** of our students."

| Year | % receiving support | Total awarded | Source |
|---|--:|--:|---|
| 2023-24 | **26%** | `$2.1 million` | tuition page (archived) |
| 2025-26 | **29%** | `$2 million` | tuition page (archived) |
| 2026-27 | **31%** | `$2,139,114` | 26-27 profile PDF |

**The school removed the sentence sometime after 2026-05-09.** The series survives only
in the archive plus the current profile PDF — another reason the PDF capture mattered.

> ⚠️ The **25-26 profile PDF says "28.9%"** where the **web page says "29%"** for the same
> year. Per the whole-number percentage convention, **29%** is the shippable form.
> Carry the **"(excludes Tuition Remission)"** qualifier — it is first-party and material.

**This independently vindicates rejecting the third-party "over 25%" claim**: the school's
own trajectory runs 26% → 29% → 31%.

## How to apply

**Platform: Clarity.** Verbatim:
> "All qualified families may apply for financial support through **Clarity**."
> "Financial awards are based on **demonstrated need** as assessed by Clarity. **The
> application for financial support has no bearing on admission.**"

Portal: `app.clarityapp.com`. The school also links a "2026-27 Clarity Family Application
Guide".

### ⚠️ Deadlines differ by family type — returning families are due TWO MONTHS EARLIER

Both verbatim from the tuition page, both for the **2027-28** aid year:

> **`Dec. 1, 2026`** — "Deadline for **returning families** seeking financial support for
> 2027-28. This includes returning families that currently receive financial support and
> those that do not but will seek it next year."

> **`Feb. 1, 2027`** — "Financial support application deadline for families with a child
> **beginning at Trinity in fall 2027**."

**Using the wrong one misinforms exactly the reader this area serves.** A returning family
that works from the prospective-family date is two months late.

### ⚠️ A school-side error to preserve, with its root cause

The **admission-process page** states, verbatim:
> "The financial support application deadline for prospective families is **Thursday,
> February 1, 2026**."

That is **a year stale** — and the root cause is identifiable. The 2026-05-09 archived
snapshot shows the **tuition page itself** then read "Thursday, February 1, 2026". When
the tuition page rolled forward to 2027, **the process page was not updated**.

Two further details worth recording:
- **Every other date on the process page is correctly 2027** (applications Jan 2 / Jan 15
 2027, materials Feb 1 / Feb 26 2027, decisions Feb 26 / Apr 9 2027). Only the aid line
 is stale.
- **`Feb 1 2026` is also labelled "Thursday" — Feb 1 2026 is a Sunday.** (Feb 1 2024 *was*
 a Thursday, consistent with a two-year-old copy-forward.)

**Trust the tuition page. Flag the discrepancy; do not silently fix it.**

## A separate funding route — NC Opportunity Scholarship

Verbatim:
> "Trinity Episcopal School is acutely aware of the challenges of paying tuition and has
> an **additional option** for you to explore beyond financial support. Please visit the
> **NC Opportunity Scholarship Program** website to see if your family qualifies for this
> resource through the **North Carolina State Education Assistance Authority**."

Promoted as a distinct route, not as part of the school's own aid.

## ⛔ Confirmed absent

- **Average award size** — no source anywhere.
- **Enrollment deposit** — zero hits.
- **Application fee amount** — zero dollar signs on the entire process page.
- **Any aid figure for grades separately** — aid is reported school-wide only.


---

## Form 990

*Source file: `Trinity Episcopal School - Financial Aid and Tuition - Form 990.md`*

# Trinity Episcopal School — Financial Aid and Tuition — Form 990

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** ProPublica Nonprofit Explorer — the structured JSON API for FY2012–FY2023,
 and the HTML organization page for FY2024–FY2025 (the two newest filings are
 `filings_without_data`, i.e. PDF-only). Every figure read verbatim.
- **Organization:** Trinity Episcopal School, **EIN `56-2059568`**,
 750 E 9TH ST, Charlotte NC 28202-3102. NTEE `B20`. IRS ruling date `1998-09-01`.

## Source URLs

- https://projects.propublica.org/nonprofits/organizations/562059568
- https://projects.propublica.org/nonprofits/api/v2/organizations/562059568.json

> ⚠️ **ProPublica's `download-filing?path=…` PDF endpoint is blocked** by a "Security
> Check" interstitial — it returns a ~1.3 MB HTML challenge page, not a PDF. The HTML
> organization page is the working route for the newest two years. Do not retry the PDF
> endpoint expecting a document.

## Fourteen years of filings — FY2012 to FY2025

Fiscal years end in June.

| FY | Total revenue | Total expenses | Total assets (EOY) | Total liabilities (EOY) |
|---|--:|--:|--:|--:|
| 2012 | `$7,454,569` | `$7,371,716` | `$24,664,284` | `$6,397,455` |
| 2013 | `$7,707,726` | `$7,710,524` | `$23,920,478` | `$5,324,264` |
| 2014 | `$8,557,140` | `$8,114,039` | `$25,024,608` | `$4,906,466` |
| 2015 | `$9,079,450` | `$8,546,066` | `$24,841,259` | `$4,243,366` |
| 2016 | `$11,626,922` | `$9,140,832` | `$26,846,534` | `$4,337,523` |
| 2017 | `$15,610,570` | `$9,567,811` | `$33,133,312` | `$4,203,128` |
| 2018 | `$13,075,052` | `$9,785,062` | `$37,165,230` | `$3,788,863` |
| 2019 | `$10,441,364` | `$9,959,775` | `$39,305,274` | `$4,943,014` |
| 2020 | `$10,025,269` | `$10,284,783` | `$38,652,821` | `$4,463,027` |
| 2021 | `$10,627,054` | `$10,531,482` | `$42,878,442` | `$4,296,244` |
| 2022 | `$12,708,246` | `$11,866,346` | `$39,313,678` | `$3,429,258` |
| 2023 | `$13,275,095` | `$12,768,402` | `$41,359,780` | `$3,261,003` |
| 2024 | `$13,006,317` | `$13,228,500` | `$42,567,418` | `$3,014,338` |
| **2025** | **`$16,157,612`** | **`$13,656,485`** | **`$47,316,809`** | `$3,732,082` |

**Three deficit years** — FY2013, FY2020 and FY2024 ran expenses above revenue.

**Assets have roughly doubled** across the series, `$24,664,284` → `$47,316,809`, while
**liabilities more than halved**, `$6,397,455` → `$3,732,082`.

**FY2017's `$15,610,570`** is a revenue spike well above the surrounding years — likely a
campaign or gift year, though the 990 summary does not say so. Do not characterize it
without the detail schedules.

## Head of School compensation

| FY | Name | Title as filed | Compensation |
|---|---|---|--:|
| 2014 | Thomas Franz | Head Of School | `$216,658` |
| 2015 | Thomas Franz | Head Of School | `$230,036` |
| 2016 | Thomas Franz | Head Of School | `$232,788` |
| 2017 | Thomas Franz | Head Of School | `$245,470` |
| 2018 | Thomas Franz | Head Of School | `$284,121` |
| 2019 | Thomas Franz | Head Of School | `$284,927` |
| 2020 | Thomas Franz | Head Of School | `$284,927` |
| 2021 | Thomas J Franz | Head Of School | `$297,102` |
| 2022 | Thomas J Franz | Head Of School | `$285,264` |
| 2023 | Imana Sherrill | **Head Of School From 7/1/22** | `$142,379` |
| 2024 | Imana Sherrill | Head Of School | `$268,604` |
| **2025** | **Imana Sherrill** | Head Of School | **`$275,198`** |

> ⚠️ **FY2023's `$142,379` is a PARTIAL-YEAR figure, not a pay cut.** The filing's own
> title reads "Head Of School **From 7/1/22**". Publishing it in a series without that
> note would misinform — it looks like a 50% reduction and is not one.

The leadership transition is visible in the data: **Thomas Franz** through FY2022,
**Imana Sherrill** from FY2023.

## How this corroborates the school's own figures

The 26-27 profile states an operating budget of **`$11.09 million`**. FY2025 total
expenses were **`$13,656,485`** — these are different measures (a forward-looking
operating budget versus total 990 expenses including non-operating items), so they should
**not** be presented as agreeing or disagreeing. Report each with its own label.


---

## School Profile 2026-27

*Source file: `Trinity Episcopal School - Financial Aid and Tuition - School Profile 2026-27.md`*

# Trinity Episcopal School — Financial Aid and Tuition — School Profile 2026-27

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** Direct `curl` download of the school's own PDF, extracted with
 `pdftotext -layout`. Reproduced verbatim below.
- **School:** Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202 — **K–8**.

## Source URLs

- **2026-27 edition** — https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf
 (841,498 bytes, retrieved 2026-09-16)
- **2025-26 edition** — https://www.tescharlotte.org/editoruploads/files/25-26SchoolProfile.pdf
 (156,683 bytes, retrieved 2026-09-16)

## ⚠️ WHY THIS FILE EXISTS — the URL is versioned and the old one 404s

**The School Profile is the single richest source on this school**, and its URL is
versioned by school year. **When the 27-28 edition ships, the 26-27 URL will 404.** The
24-25 edition and earlier are already gone from the live site, and only the 25-26 was
ever archived.

It is linked from **one place only** — the Middle School page — and is not in the
sitemap's crawlable page set as content.

**Both currently-live editions were captured in full before any other work.** Everything
downstream that cites enrollment, tuition, the cumulative placement split, the club list
or the athletics-by-season list depends on this capture.

## ⚠️ A known error in the 25-26 edition

The 2025-26 profile states `Tuition ('25-'26): $25,400 (K-5); $25,771 (6-8)`.
**`$25,771` is the 2024-25 grade 6–8 figure** — the PDF carried the prior year forward.
The school's own tuition page said **`$27,320`** for 2025-26. See the Tuition and Fees
file. **Never cite this PDF for grade 6–8 tuition.**

## ⚠️ The asterisks are unexplained

41 of 99 high schools and 71 of 160 colleges carry a trailing asterisk. **No legend
exists anywhere in the document** — searched and confirmed absent. Publish no
interpretation. The destination lists themselves are transcribed in
`high-school-placement/trinity-episcopal/… Where They Land.md`.

---

## Verbatim text — 2026-27 edition

The destination lists are omitted here (they run to 259 entries and are transcribed in
the Where They Land file); everything preceding them is reproduced exactly.

```
 2026-2027 School Profile

 Trinity Episcopal School is committed to the breadth of the Episcopal tradition in both its unity and diversity. A student of Trinity is
 challenged to academic excellence while honored as an individual with unique potential.

 As faculty and families together influence young lives, students themselves will be affirmed as ambassadors of grace, citizens who
 live and teach an ethic of service and respect for others. A student of Trinity is trained in the example of Christ and toward a
 stewardship of healthy body, lively soul and discerning mind.

ABOUT OUR Grades: K-8
SCHOOL School Leadership: Imana Sherrill, Head of School; Sommers Errington, Board of Trustees Chair
 Location: 750 E. 9th Street, Charlotte, NC 28202; First Ward Garden District of Charlotte’s Center City
 Founded: 2000
 Operating Budget ('26-'27): $11.09 million
 Tuition ('26-'27): $26,670 (K-5); $28,690 (6-8)
 Accreditation: Southern Association of Independent Schools (SAIS)

ABOUT OUR ABOUT OUR
PROGRAM COMMUNITY

Student-to-Teacher Ratio: 22:2 (K-2), 24:2 (3-5), 20:1 (6-8) Enrollment: 419
Workshop Instuctional Model: Collaborative, inquiry- and problem-based
 Faculty/Staff: 59 Faculty, 28 Administrative,
 learning experiences, as well as differentiated instruction and lesson design
 7 Extended Day & Support Staff
 supported by a team of Learning Catalysts

K- 8 Technology Program: facilitated by Digital Learning Catalysts Gender of Students: 48% Male (203), 52% Female (216)
 1:1 iPads for all students K-1
 1:1 Chromebooks for all students Gr. 2-8 Financial Support Recipients: 31% of students
 (excludes Tuition Remission)
K- 8 Service Learning: Curriculum & Community Partnerships,
 Community Garden and Aquaponics Program
 Financial Support Awards: $2,139,114
K- 8 Faith Studies: Bible lessons, study of world religions, etc.
 Race: Ethnicity:
K- 8 Performing Arts Program: 4th Grade Musical; 5th Grade Shakespeare
 Review; Middle School fall play, winter musical, and choir and band concerts Black/African American- 18% Hispanic/Latino/Latinx - 7%
 Asian- 1% Non-Hispanic/Latino/Latinx -
Weekly Enrichments: Lower School- Healthful Living (PE & Wellness), Latino/Latinx/Hispanic- 6% 62%
 Spanish, Visual Arts, IDEA (STEM) Lab, Faith Studies, and Music Not Reported - 31%
 Two or More Races- 8%
 Middle School- Art, PE, Hebrew Scriptures (6), Christian Narratives (7), World White- 65%
 Religions (8), Learning Lab (6), Music Ensembles (6), Healthful Living (7),
 Not Reported- 2%
 Computer Science (7), Speech & Debate (7), Social Issues Seminar (8), FOCUS
 Period (6-8) and Choice Electives (7-8)
 Religious Affiliation:
Community Life Groups: 12 Tribes of Trinity (Gr. 3-5) & Koinonia (Gr. 6-8) Christian- 75% Hinduism/Buddhism- <1%
Greet The Week: Monday mornings, the school gathers as a community to begin Christian, Baptist- 4% Judaism- 1%
 the week with songs, Bible verses, the Lord’s Prayer and announcements. Christian, Episcopalian- 14% Muslim- <1%
 Christian, Mormon- <1% Other- 2%
Chapel: K-2 & 3-5 Bi-Weekly Chapel; 6-8 Weekly Chapel; K-8 Weekly Chapel
 (Latter Day Saints) None- 4%
Middle School Athletics: Fall- Girls’ Volleyball, Co-ed Cross Country, Christian, Lutheran- <1%
 Boys’ Soccer, Girls’ Tennis, Flag Football Winter- Boys’ and Girls’ Basketball Not Reported- 16%
 Christian, Methodist- 6%
 Spring- Boys’ Tennis, Co-ed Track & Field, Girls’ Soccer, Co-ed Golf, Flag Football
 Christian, Presbyterian- 17%
Student Clubs & Groups: Lower School- Chess Club, Girls on the Run & Let Christian, Pentecostal- <1%
 Me Run, Young Children of Color, Middle School- Odyssey of the Mind, Young
 Christian, Roman Catholic- 5%
 People of Color, Young People for Social Justice Group, Gender Sexuality
 Alliance Group, Radagast Rabies, Creative Writing, Climate Justice, Koinonia Christian, Non-denominational- 15%
 Representatives, Honor Council, Invisible Differences, Spirituality and Chapel Christian, No denomination specified - 10%
 Music, Monday Math Mania Christian, Other- 1%
ABOUT OUR Trinity graduated its first eighth-grade class in June 2004. A total of 1,060 students have graduated
ALUMNI over the past 23 years (Class of 2004-2026). Over the years, our alumni have chosen the following:

 Independent Schools: 31% • Public Schools: 57% • Boarding Schools: 12%
```

---

## Verbatim text — 2025-26 edition

Captured for the longitudinal figures. Note the tuition error above.

```
 2025-2026 SCHOOL PROFILE

 Trinity Episcopal School is committed to the breadth of the Episcopal tradition in both its unity and diversity. A student of Trinity is
 challenged to academic excellence while honored as an individual with unique potential.

 As faculty and families together influence young lives, students themselves will be affirmed as ambassadors of grace, citizens who live and
 teach an ethic of service and respect for others. A student of Trinity is trained in the example of Christ and toward a stewardship of
 healthy body, lively soul and discerning mind.

 about our Grades: K-8
 SCHOOL School Leadership: Imana Sherrill, Head of School; Eugene J. Brown, Board of Trustees Chair
 Location: 750 E. 9th Street, Charlotte, NC 28202; First Ward Garden District of Charlotte’s Center City
 Founded: 2000
 Operating Budget ('25-'26): $11.09 million
 Tuition ('25-'26): $25,400 (K-5); $25,771 (6-8)
 Accreditation: Southern Association of Independent Schools (SAIS)

 about our about our
 PROGRAM COMMUNITY

Student-to-Teacher Ratio: 22:2 (K-2), 24:2 (3-5), 20:1 (6-8) Enrollment: 433
Workshop Instuctional Model: Collaborative, inquiry- and problem-based Faculty/Staff: 59 Faculty, 28 Administrative,
 learning experiences, as well as differentiated instruction and lesson design 7 Extended Day & Support Staff
 supported by a team of Learning Catalysts
K-8 Technology Program: facilitated by Digital Learning Catalysts Gender of Students: 48% Boys, 52% Girls
 1:1 iPads for all students K-1
 1:1 Chromebooks for all students Gr. 2-8 Financial Support Recipients: 28.9% of students
 (excludes Tuition Remission)
K-8 Service Learning: Curriculum & Community Partnerships,
 Community Garden and Aquaponics Program Financial Support Award-s: $2 million
K-8 Faith Studies: Bible lessons, study of world religions, etc. Race: Ethnicity:
K-8 Performing Arts Program: 4th Grade Musical; 5th Grade Shakespeare Black /African American- 15% Hispanic/Latino/Latinx - 7%
 Review; Middle School fall play, winter musical, and choir and band concerts Asian- 1% Non-Hispanic/Latino/Latinx -
Weekly Enrichments: Lower School- Healthful Living (PE & Wellness), Latino/Latinx/Hispanic- 6% 53%
 Spanish, Visual Arts, IDEA (STEM) Lab, Faith Studies, and Music Two or More Races- 9% Not Reported - 40%
 Middle School- Art, PE, Hebrew Scriptures (6), Christian Narratives (7), World White- 66%
 Religions (8), Learning Lab (6), Music Ensembles (6), Healthful Living (7), Not Reported- 3%
 Computer Science (7), Speech & Debate (7), Social Issues Seminar (8), FOCUS
 Period (6-8) and Choice Electives (7-8) Religious Affiliation:
Community Life Groups: 12 Tribes of Trinity (Gr. 3-5) & Koinonia (Gr. 6-8) Christian- 81% Hinduism/Buddhism- 1%
 Christian Baptist- 7% Judaism- 2%
Greet The Week: Monday mornings, the school gathers as a community to begin
 the week with songs, Bible verses, the Lord’s Prayer and announcements. Christian Catholic- 8% Muslim- <1%
 Christian Mormon- <1% Other- 6%
Chapel: K-2 & 3-5 Bi-Weekly Chapel; 6-8 Weekly Chapel; K-8 Weekly Chapel (Latter Day Saints) Not Reported- 10%
Middle School Athletics: Fall- Girls’ Volleyball, Co-ed Cross Country, Christian Pentecostal- 3%
 Boys’ Soccer, Girls’ Tennis, Winter- Boys’ and Girls’ Basketball Christian Non-denominational- 19%
 Spring– Boys’ Tennis, Co-ed Track & Field, Girls’ Soccer, Co-ed Golf
 Christian Protestants- 51%
Student Clubs & Groups: Lower School- Chess Club, MathCats, Girls on the (Methodist, Lutheran, Presbyterian, Episcopal, Moravian)
 Run & Let Me Run, Young Children of Color, Middle School- Odyssey of the Christian No denomination specified - 12%
 Mind, Young People of Color, Young People for Social Justice Group, Gender
 Sexuality Alliance Group, Book Club, Radagast Rabies, Creative Writing, Climate
 Justice, Koinonia Representatives, Honor Council
 about our Trinity graduated its first eighth-grade class in June 2004. A total of 1,009 students have graduated over the past
ALUMNI 22 years (Class of 2004-2025). Over the years, our alumni have chosen the following:

 Independent Schools: 31% • Public Schools: 57% • Boarding Schools: 12%
```

---

## Year-over-year comparison

| | 2025-26 | 2026-27 |
|---|--:|--:|
| Enrollment | 433 | **419** |
| Tuition K-5 | $25,400 | $26,670 |
| Tuition 6-8 | ⚠️ *PDF says $25,771; the tuition page said $27,320* | $28,690 |
| Financial support recipients | 28.9% | **31%** |
| Financial support awards | $2 million | **$2,139,114** |
| Operating budget | $11.09 million | $11.09 million |
| Cumulative graduates | 1,009 (2004-2025, 22 years) | **1,060 (2004-2026, 23 years)** |
| Independent / Public / Boarding | 31% / 57% / 12% | 31% / 57% / 12% |
| Board of Trustees Chair | Eugene J. Brown | **Sommers Errington** |
| Faculty/Staff | 59 / 28 / 7 | 59 / 28 / 7 |

**Enrollment fell by 14** (433 → 419) while **aid rose** in both share and dollars.

**Flag Football is new in 26-27** — it appears in both the fall and spring athletics
lists in the 26-27 edition and **is entirely absent from the 25-26 edition**. The live
athletics page does not mention it at all. See the Sports files.

**MathCats and Book Club** appear in the 25-26 club list and are **gone** from 26-27.

**Religious affiliation reporting changed format** between editions — 25-26 groups
"Christian Protestants- 51% (Methodist, Lutheran, Presbyterian, Episcopal, Moravian)"
while 26-27 breaks those out individually. The two years' religion figures are therefore
**not directly comparable**.


---

## Tuition and Fees

*Source file: `Trinity Episcopal School - Financial Aid and Tuition - Tuition and Fees.md`*

# Trinity Episcopal School — Financial Aid and Tuition — Tuition and Fees

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** Direct `curl` fetch of the live tuition page and the school's own
 "Cost of Attendance for 2026-27" Google Doc (exported as text); tuition history
 recovered from Internet Archive snapshots fetched with the raw `id_` modifier.
 **Every dollar figure below was read verbatim from a retrieved document. None are
 derived, interpolated or back-computed.**
- **School:** Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202 — **K–8**.
 EIN `56-2059568`.

## Source URLs

- Tuition & affordability — https://www.tescharlotte.org/admission/tuition-affordability.cfm
- **Cost of Attendance for 2026-27** — https://docs.google.com/document/d/1jh3Oc1gO1ShFo7bDR6xGEXCwvjN8Gpn_Ylg3z6Igs0M/export?format=txt
- 2026-27 School Profile (PDF) — https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf

> **All pricing lives in the Google Doc, not on the tuition page.** Cite the doc for
> every fee figure.

## ⛔ CRITICAL: the school's own 25-26 profile PDF carries a WRONG tuition figure

The **2025-26 School Profile PDF** states `Tuition ('25-'26): $25,400 (K-5); $25,771 (6-8)`.

**`$25,771` is the 2024-25 grade 6–8 figure.** The PDF carried the prior year forward.
Proven against the school's own tuition page across four archived snapshots:

| Snapshot | K-5 | 6-8 |
|---|--:|--:|
| 2024-02-29 | $23,961 | **$25,771** |
| 2025-01-16 | $23,961 | **$25,771** |
| 2025-09-09 | $25,400 | **$27,320** |
| 2026-05-09 | $26,670 | $28,690 |

**Never cite the 25-26 profile PDF for grade 6–8 tuition.** Use the tuition page.

## Tuition history — four years, first-party

| Year | K–5 | 6–8 | Source |
|---|--:|--:|---|
| 2023-24 | `$22,605*` | `$24,312*` | archived tuition page, 20230923052136 |
| 2024-25 | `$23,961` | `$25,771` | archived, 20240229225316 |
| 2025-26 | `$25,400` | `$27,320` | archived, 20250909135927 |
| **2026-27** | **`$26,670`** | **`$28,690`** | live page |

Year-over-year: **+6.0% → +6.0% → +5.0%**, identically for both bands. The two bands
have moved in lockstep; they have not diverged.

> The `*` on the 2023-24 figures is in the source; the footnote it points to was not
> captured in the text extraction.

### ⚠️ Method note — the Wayback CDX API was down; use the TimeMap endpoint

`https://web.archive.org/cdx/search/cdx?...` returned "Internet Archive: Temporarily
Offline" on every attempt, and `archive.org/wayback/available` returned **429**. The
working substitute, which yielded all 16 snapshots:

```
https://web.archive.org/web/timemap/link/<url>
```

**Worth recording as the standing CDX fallback.**

## Per-grade cost table — 2026-27

From "Cost of Attendance for 2026-27", verbatim:

| Grade | Tuition | Activity Fee | Books |
|---|--:|--:|---|
| K | `$26,670` | `$210` | `---------` |
| 1 | `$26,670` | `$225` | `----------` |
| 2 | `$26,670` | `$225` | `----------` |
| 3 | `$26,670` | `$305` | `----------` |
| 4 | `$26,670` | `$545` | `----------` |
| 5 | `$26,670` | `$735` | `----------` |
| 6 | `$28,690` | `$965` | `---------` |
| 7 | `$28,690` | `$965` | `----------` |
| 8 | `$28,690` | `$1,045` | `----------` |

The activity fee is **not smoothly monotonic** — grades 1–2 share `$225`, grades 6–7
share `$965`, and it steps sharply at grade 4 (`$545`) and again at grade 6 (`$965`).

### ⚠️ The books row means "included", not "not published"

Every grade shows a run of hyphens. The reasoning:

- The **Lunch** and **TED** columns contain **pointer text** ("Options in chart below",
 "Based on income in chart below") — i.e. the school uses **words** when it means
 "see elsewhere".
- It uses **dashes** when it means a null.
- The document is titled "**Cost** of Attendance".

So the dashes read as **no charge**. **Render as "included."**

> Honest caveat: the document never writes the word "included". This is an inference
> from the formatting, defensible but not a verbatim quote — say "no book charge is
> listed", not "the school states books are included".

## Lunch — FLIK

From the same doc, verbatim:
> "FLIK is not reduced for families receiving financial support. Your child has access to
> purchase lunch by keying in their PIN number and will be charged **$11.50**. The charges
> will be reflected on your monthly FACTS statement. Please note, it is more economical to
> purchase a 20-meal block than pay $11.50 per lunch. If you plan to have your child(ren)
> purchase lunch more than 3 times per week, a full annual plan is the most economical."

| | Lower School | Middle School |
|---|--:|--:|
| Annual Plan | `$1,375` | `$1,520` |
| 20 Meal Block | `$195` | `$210` |

> ⚠️ **"FLIK is not reduced for families receiving financial support"** is a notable
> affordability caveat and worth surfacing — aid covers tuition, not meals.

## Other costs

**Tuition refund insurance:** the school is insured by **A.W.G. Dewar, Inc.**, with a
brochure linked. **No price for the plan is published.**

## ⛔ Confirmed absent

| Item | Status |
|---|---|
| **Application fee amount** | **Confirmed absent.** The checklist says "Submit the application and application fee" and never states a number. A `grep -o '\$[0-9][0-9,.]*'` over the entire raw HTML of the admissions process page returns **zero dollar signs**. |
| **Enrollment deposit** | **Confirmed absent** — zero hits across the tuition page, process page and cost document. |
| **Average award size** | **Confirmed absent** — no source anywhere. (It is arithmetically derivable from the aid total and recipient share, but **a derived figure must not be published as a school figure**.) |

## ⛔ Do not ship these third-party figures

- **PrivateSchoolReview's `$17,752`** — **confirmed stale**. It matches no year from
 2023-24 through 2026-27.
- **A third-party "over 25% receive aid" claim** — untraceable to any live page, and
 superseded by the school's own first-party series (see the Financial Support file).


---

## Sources referenced across these documents

- https://docs.google.com/document/d/1jh3Oc1gO1ShFo7bDR6xGEXCwvjN8Gpn_Ylg3z6Igs0M/export?format=txt
- https://projects.propublica.org/nonprofits/api/v2/organizations/562059568.json
- https://projects.propublica.org/nonprofits/organizations/562059568
- https://web.archive.org/cdx/search/cdx?...`
- https://web.archive.org/web/timemap/link/<url>
- https://web.archive.org/web/timemap/link/https://www.tescharlotte.org/admission/tuition-affordability.cfm
- https://www.tescharlotte.org/admission/admission-process.cfm
- https://www.tescharlotte.org/admission/tuition-affordability.cfm
- https://www.tescharlotte.org/editoruploads/files/25-26SchoolProfile.pdf
- https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf
