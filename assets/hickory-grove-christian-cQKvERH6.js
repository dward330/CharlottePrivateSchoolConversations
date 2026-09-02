var e=`hickory-grove-christian`,t=`admissions`,n=18,r=[{subtopic:`Grade-by-Grade Application Plans`,source_file:`Hickory Grove Christian - Admissions - Grade-by-Grade Application Plans.md`,preview:`# Hickory Grove Christian — Admissions — Grade-by-Grade Application Plans`,text:`# Hickory Grove Christian — Admissions — Grade-by-Grade Application Plans`},{subtopic:`⚠️ Cycle audit`,source_file:null,preview:`The open application cycle is 2027–28, published on the Admissions Process page (rendered 2026-09-01): > "APPLICATIONS OPEN: Hickory Grove Baptist Church members, Early Education Center students, > and current HGCS student's siblings: November 2, 2026" > "Applications open to the public: November 16, 2026" ### The…`,text:`**The open application cycle is 2027–28**, published on the Admissions Process page
(rendered 2026-09-01):

> "APPLICATIONS OPEN: Hickory Grove Baptist Church members, Early Education Center students,
> and current HGCS student's siblings: **November 2, 2026**"
> "Applications open to the public: **November 16, 2026**"

### The prior pass reported a four-way date conflict. It is really ONE live source plus stale echoes.

| Source | Dates | Status |
|---|---|---|
| **Admissions Process page** (live, rendered) | Priority **Nov 2, 2026** · public **Nov 16, 2026** | **AUTHORITATIVE — the open 2027–28 cycle** |
| FACTS portal narrative (indexed) | Dec 15, 2025 priority · Jan 5/6, 2026 public | Prior cycle (2026–27) carried on the portal |
| Prior Admissions Process capture | Nov 17, 2025 · Dec 1, 2025 | Superseded by the live page |
| \`/admissions/registration-info\` | Dec 16, 2024 · Jan 6, 2025 | **404 on live fetch** — closed cycle |

There is **one** live authoritative source. Ship Nov 2 / Nov 16, 2026 and nothing else.

### ⚠️ Two genuine, LIVE inconsistencies on the school's own site

**1. The application-fee window is stale, and it sits on the SAME page as the current dates.**
Verbatim, rendered 2026-09-01, immediately below the November 2026 application dates:

> "APPLICATION FEE: **$250.00 (November, 17 2025 - May 31, 2026)**"
> "LATE ENROLLMENT APPLICATION FEE: **$500 (June 1, 2026 and later)**"
> "-Application fee is non-refundable"
> "-Application fee is not applied toward tuition"

The fee window belongs to the **prior** cycle. Read literally, every applicant in the
2027–28 cycle pays the $500 late fee, because the $250 window closed 31 May 2026 — before
applications even opened on 2 November 2026. **This is the school's inconsistency, not a
research gap.** Reproduce both figures and say the published window predates the current
application dates; do not silently pick one.

**2. The Apply page carries a prior-cycle label.** \`/admissions/apply-to-hgcs\` reads
**"APPLY HERE FOR THE 2026-2027 SCHOOL YEAR"** (rendered 2026-09-01) while the Admissions
Process page publishes the November 2026 dates for 2027–28. Two official pages, two cycle
labels. The Process page carries the dated, specific content and is the better source.`},{subtopic:`⚠️ The website's THREE steps are not the real process — the checklists publish FOUR`,source_file:null,preview:`The Admissions Process page presents STEP 1: INQUIRE → STEP 2: VISIT → STEP 3: APPLY. Those three steps only get a family to the application. Both admission-checklist PDFs (Revised 11/17/25) publish a different and more complete four-step structure that begins where the website's ends: STEP #1 APPLICATION → STEP #2…`,text:`The Admissions Process page presents **STEP 1: INQUIRE → STEP 2: VISIT → STEP 3: APPLY**.
Those three steps only get a family *to* the application.

Both admission-checklist PDFs (Revised **11/17/25**) publish a different and more complete
four-step structure that begins where the website's ends:

**STEP #1 APPLICATION → STEP #2 TESTING (and SHADOW, high school only) → STEP #3 INTERVIEW
REQUIREMENTS → STEP #4 ADMISSIONS ACCEPTANCE OR NON-ACCEPTANCE**

Both are official. The card's spine should be the **combined** sequence: inquire → visit →
apply + fee → submit the band's forms → testing → family interview → decision → enrollment
deposit.`},{subtopic:`Structure — four grade bands plus a separate International band`,source_file:null,preview:`| Band | Grades | Forms | Assessment | Shadow | Campus | |---|---|---|---|---|---| | TK / K5 | TK, K5 | Information form · Readiness Checklist · pastor recommendation | Developmentally appropriate skills/readiness screening | No | Harris (+ Mallard Creek classical TK/K, separate portal) | | Elementary | 1st–5th |…`,text:`| Band | Grades | Forms | Assessment | Shadow | Campus |
|---|---|---|---|---|---|
| TK / K5 | TK, K5 | Information form · Readiness Checklist · pastor recommendation | Developmentally appropriate **skills/readiness screening** | No | Harris (+ Mallard Creek classical TK/K, separate portal) |
| Elementary | 1st–5th | Academic Referral · Student Questionnaire (4th & 5th only) · report cards · pastor recommendation | Testing via Student Services | No | Harris |
| Middle | 6th–8th | Math · English · Principal/Counselor · pastor recommendations · transcript · standardized scores · Student Questionnaire | Testing via Student Services | **No** | Harris |
| High | 9th–12th | Same Middle & High checklist | Testing via Student Services + **mandatory entrance test for grade placement** | **Yes — required** | Harris |
| International (F-1) | secondary | Separate process — see below | TOEFL Jr. 750+ / SLEP 50+ | N/A | Harris |

**The Middle/High split is real but subtle:** grades 6–12 share ONE checklist, so the forms
are identical. What differs is that **the shadow day is high-school-only** ("High school
required only- shadow an HG student") and the **entrance test for grade placement is
published only for 9–12**.`},{subtopic:`The two admission checklists — RETRIEVED IN FULL`,source_file:null,preview:'because the resource-manager URLs never surfaced in a searchable index"). They are retrievable: `/fs/resource-manager/view/<guid>` 302-redirects to `resources.finalsite.net` — the same pattern used for Country Day, Charlotte Christian and Charlotte Latin. Both return HTTP 200 and extract cleanly with `pdftotext…',text:`because the resource-manager URLs never surfaced in a searchable index"). They are
retrievable: \`/fs/resource-manager/view/<guid>\` **302-redirects** to \`resources.finalsite.net\`
— the same pattern used for Country Day, Charlotte Christian and Charlotte Latin. Both return
HTTP 200 and extract cleanly with \`pdftotext -layout\`.

- Elementary: \`/fs/resource-manager/view/adf10069-819d-4420-83c4-ebba8281c071\`
 → \`NewFamilyAdmissionsChecklistESNoDate.pdf\`
- Middle & High: \`/fs/resource-manager/view/c7376a64-1d57-4a98-a5fb-6cab591a4c65\`
 → \`NewFamilyAdmissionsChecklistMHSNoDate.pdf\`

Both footers read **"Revised 11/17/25"**.

### NEW ELEMENTARY FAMILIES ADMISSIONS CHECKLIST — VERBATIM

**STEP #1 — APPLICATION**
> "Complete the online application and submit the application fee"
> "Birth certificate"
> "Immunization Registry Record"

Then, split by band:

| TK – K5 | 1st–5th Grade |
|---|---|
| "Information form" | "Academic Referral form (from current teacher)" |
| "Readiness Checklist (from preschool or daycare teacher)" | "Student Questionnaire (4th & 5th)" |
| "Personal Recommendation form (from family's pastor)" | "Report Card (at least 2 years' worth)" |
| | "Educational/diagnostic testing results, current IEP/504 if applicable" |
| | "Personal Recommendation form (from family's pastor)" |

**STEP #2 — TESTING**
> "Testing is scheduled through the Student Services office **AFTER** the admissions office
> receives all of the required forms."

**STEP #3 — INTERVIEW REQUIREMENTS**
> "Family Interview will be scheduled as long as steps 2 and 3 are completed favorably"
> "Family Interview is an opportunity to share the Mission, Vision, and Statement of Faith,
> and to assess whether HGCS is the right fit for your family"

**STEP #4 — ADMISSIONS ACCEPTANCE OR NON-ACCEPTANCE**
> "Final decision is communicated in writing contingent upon: Satisfactory grades · Letters
> of recommendation · Interview · Satisfactory behavior reports · Entrance testing · Review
> of IEP/504/Psychoeducational Evaluation"

**Footer — VERBATIM, and both findings are new:**
> "*Please note any suspensions, expulsions and/or failed courses is an automatic denial of
> admission."
> "Upon acceptance, a nonrefundable deposit of **$500** is required and will apply toward
> tuition."

### NEW MIDDLE AND HIGH SCHOOL FAMILIES ADMISSIONS CHECKLIST — VERBATIM

**STEP #1 — APPLICATION**
> "Complete the online application and submit the application fee"
> "Birth certificate"
> "Immunization Registry record"
> "Copy of most recent 2 years of report cards"
> "Copy of high school transcript"
> "Educational/diagnostic testing results, current IEP/504/Accommodations plan if applicable"
> "Standardized testing results"
> "Student Questionnaire"
> "Math Teacher Recommendation form"
> "English Teacher Recommendation form"
> "Principal or Guidance Counselor Recommendation form"
> "Personal Recommendation form (from student/family's pastor)"

**STEP #2 — TESTING AND STUDENT SHADOW**
> "**High school required only**- shadow an HG student (complete request form). Testing is
> scheduled through the Student Services office AFTER the admissions office receives all of
> the required forms."

**STEP #3 and #4** are identical to the Elementary checklist, including the automatic-denial
rule and the **$500** nonrefundable deposit.

### What the checklists resolved

Five items the prior pass listed as NOT RETRIEVED are now published facts:

1. **The enrollment deposit: $500, nonrefundable, applied toward tuition.**
2. **Recommendation forms by grade** — including that the **pastor's Personal Recommendation
 is required at EVERY grade, TK–12**.
3. **Testing sequencing** — testing is scheduled only *after* all forms are received.
4. **The shadow day is high-school-only** — settles whether 6–8 shares the 9–12 requirements.
5. **A published automatic-denial rule** — suspensions, expulsions or failed courses.`},{subtopic:`The Christian-commitment question — ANSWERED`,source_file:null,preview:`The prior pass recorded a mandatory Christian-commitment requirement as "NOT explicitly published." The checklists answer it in two places: - A "Personal Recommendation form (from family's pastor)" is a required STEP #1 item in every band, TK–12. - The Family Interview is *"an opportunity to share the Mission, Vision,…`,text:`The prior pass recorded a mandatory Christian-commitment requirement as "NOT explicitly
published." The checklists answer it in two places:

- **A "Personal Recommendation form (from family's pastor)" is a required STEP #1 item in
 every band, TK–12.**
- The Family Interview is *"an opportunity to share the Mission, Vision, and Statement of
 Faith, and to assess whether HGCS is the right fit for your family."*

So there is a **pastoral reference requirement at every grade** and a mission-fit interview.
There is **no published requirement that a parent be a professing Christian** — unlike
Covenant Day, which states one outright. Report what is published: a required pastoral
reference and a fit interview, not a professed-faith gate.

**The full verbatim Statement of Faith text remains NOT RETRIEVED** (referenced only).`},{subtopic:`Age eligibility — TK vs K5 — VERBATIM`,source_file:null,preview:`From the school's own "TK or K5" page: > Kindergarten (K5): "turning five by October 16 of the school year you are applying for" > Transitional Kindergarten (TK): "turning five on or before April 16" > "Transitional Kindergarten should serve as a bridge between preschool and kindergarten - to > help provide students…`,text:`From the school's own "TK or K5" page:

> Kindergarten (K5): "turning five **by October 16** of the school year you are applying for"
> Transitional Kindergarten (TK): "turning five **on or before April 16**"
> "Transitional Kindergarten should serve as a bridge between preschool and kindergarten - to
> help provide students with time to develop the fundamental skills needed for success."
> "Students will still have to qualify for the program by **passing a developmentally
> appropriate skills assessment** during the admissions process."

Placement between the two youngest grades is therefore **birthday cutoffs (Oct 16 / Apr 16)
plus a readiness screening**. TK is the earliest K–12 entry point; below it the **Early
Education Center** runs preschool, enrolled through the EEC office (704-531-5345), **not**
the K–12 admissions checklist.

**No independent-toileting requirement is published** for TK/K5.`},{subtopic:`Campus is an admissions dimension`,source_file:null,preview:`- Harris Campus — 7200 E. WT Harris Blvd., Charlotte NC 28215. TK–12 plus a full-day Early Education Center. FACTS portal memberId 496. - Mallard Creek Campus — 13200 Mallard Creek Rd. A half-day preschool EEC and a newly launching classical Christian TK and Kindergarten, growing one grade at a time, with students…`,text:`- **Harris Campus** — 7200 E. WT Harris Blvd., Charlotte NC 28215. TK–12 plus a **full-day**
 Early Education Center. FACTS portal **memberId 496**.
- **Mallard Creek Campus** — 13200 Mallard Creek Rd. A **half-day** preschool EEC and a newly
 launching **classical Christian TK and Kindergarten**, growing one grade at a time, with
 students integrating into Harris at middle school. **Separate FACTS portal, memberId 15083.**

**Whether Mallard Creek's classical TK/K runs different steps or deadlines than Harris is NOT
PUBLISHED.**`},{subtopic:`Platform`,source_file:null,preview:"- Application: FACTS SIS Admissions — `hg-nc.client.factsmgt.com/oa/index.cfm?memberid=496` (Harris) and `?memberid=15083` (Mallard Creek). The legacy RenWeb URL `hg-nc.client.renweb.com/oa/?memberid=496` resolves to the same FACTS system. - Inquiry (Step 1) and Visit (Step 2) are Google Forms linked from the…",text:`- **Application:** FACTS SIS Admissions — \`hg-nc.client.factsmgt.com/oa/index.cfm?memberid=496\`
 (Harris) and \`?memberid=15083\` (Mallard Creek). The legacy RenWeb URL
 \`hg-nc.client.renweb.com/oa/?memberid=496\` resolves to the same FACTS system.
- **Inquiry (Step 1) and Visit (Step 2)** are Google Forms linked from the Admissions Process
 page.
- After submission families "track admissions status online … monitor when the school
 receives supplemental application forms, and if necessary reprint the supplemental forms."
- **Financial aid:** FACTS Grant & Aid Assessment.`},{subtopic:`Financial aid — and its order-of-operations precondition`,source_file:null,preview:`Platform: FACTS Grant & Aid. "There is a $40 application charge from FACTS." Order of operations (from the Scholarships page): new families must be accepted for enrollment before applying for aid; families should first apply for/accept/renew the NC Opportunity Scholarship (NCSEAA), then may apply for HGCS FACTS Grant…`,text:`**Platform:** FACTS Grant & Aid. **"There is a $40 application charge from FACTS."**

**Order of operations (from the Scholarships page):** new families must be accepted for
enrollment before applying for aid; families should first apply for/accept/renew the **NC
Opportunity Scholarship (NCSEAA)**, then may apply for HGCS FACTS Grant & Aid "until all
available funds have been allocated" if needs are not met.

**⚠️ Correction to the prior pass:** it recorded the Scholarships page as carrying stale
2025 dates ("February 6 – March 6, 2025"; renewal "April 15, 2025"). **The live page has
been updated.** Verified 2026-09-01:

- NC Opportunity Scholarship priority window: **"February 2 - March 2, 2026"**
- After March 2, 2026 — standard cycle, awards communicated in August
- NCSEAA renewal: **"must be completed by April 15, 2026"**

These are the **2026–2027** NCSEAA cycle. NCSEAA deadlines shift yearly and are set by the
state, not the school; the 2027–28 window is not yet published.

**ESA+** is referenced as an NCSEAA option for "children with disabilities who attend school
in an eligible non-public school setting."

**A reduced enrollment deposit for aid applicants is NOT PUBLISHED.**`},{subtopic:`International Program (F-1) — a genuinely separate process`,source_file:null,preview:`Director: Sheila M. Chaney, Director of Admissions and International Student Program — admissions@hgchristian.org, 704-531-4008. Program began 2013; HGCS is SEVIS-certified and issues its own I-20s. Ordered process — VERBATIM from the International Student Enrollment Process page: 1. Interview — "Skype/WeChat/WhatsApp…`,text:`**Director:** Sheila M. Chaney, Director of Admissions and International Student Program —
admissions@hgchristian.org, **704-531-4008**. Program began **2013**; HGCS is
**SEVIS-certified and issues its own I-20s**.

**Ordered process — VERBATIM from the International Student Enrollment Process page:**

1. **Interview** — "Skype/WeChat/WhatsApp interview with school official."
2. **Application** — "Completed online admission application."
3. **English proficiency** — **"TOEFL Jr. 750+ and SLEP 50+"**, with the school "willing to
 discuss other testing options."
4. **Submit to the International Admissions Office** — the HGCS online admission application;
 TOEFL Jr. or TOEFL score sheet; **"Middle and/or High School transcripts (translated into
 English)"**, via **International Education Evaluations (IEE)** — myiee.org /
 info@foreigntranscripts.com.
5. **Review** of "prior academic and behavioral performance" and standardized test scores.
6. **If accepted** — notified by email → pay the non-refundable application fee → "HGCS
 official will mail the I-20 if student is accepted" → "Students must arrange an interview
 with the U.S. Embassy in their respective country to obtain an F1 visa."
7. **Homestay** — coordinated by the HGCS Student Coordinator, who "will contact student/agent
 with homestay information if homestay is required." Host-family homestay provided since
 2013; arrangement and vetting handled internally.
8. **Health insurance** — **"American Benefit Services (Short Term Medical) – Call
 843-214-2447 or email wesley.abs@gmail.com."** Plus an international-student immunizations
 form and a current physical.
9. **Full payment before day one** — "Full payment must be received prior to the first day of
 school before the student can be enrolled … If full payment is not made prior to the first
 day of school, the student's application will be placed on financial hold."
10. **Included services** — orientation before school starts, weekly meetings with the
 International Student Director, reports to agencies/families, airport transportation,
 I-20 maintenance, lunch, athletic/technology fees and field trips. **Re-enrollment is NOT
 automatic.**

**Early withdrawal:** "Early Withdrawal fee of **$500.00 and 50% of the International
Tuition**."

**NOT PUBLISHED:** the international application-fee amount, international tuition figure,
acceptance deposit, any separate international deadline, whether financial aid is available
to international students, and host-family vetting/background-check specifics.`},{subtopic:`All-applicant policies`,source_file:null,preview:`- Admissions priority — an earlier application window, not a tuition discount, for "Hickory Grove Baptist Church members, Early Education Center students, and current HGCS student's siblings." Whether non-priority applicants receive fewer testing/visit/interview slots is NOT PUBLISHED. - Rolling admission — indicated…`,text:`- **Admissions priority** — an *earlier application window*, not a tuition discount, for
 "Hickory Grove Baptist Church members, Early Education Center students, and current HGCS
 student's siblings." **Whether non-priority applicants receive fewer testing/visit/interview
 slots is NOT PUBLISHED.**
- **Rolling admission** — indicated by "limited availability … please call to confirm your
 student's specific grade." **No fixed single notification date is published.**
- **Withdrawal** — "Each child is considered enrolled for the entire school year unless the
 admissions office receives his/her written withdrawal notice (form … in FACTS Family
 portal) minimum of two weeks prior to withdrawal." Records/transcripts are held for
 financial delinquency; a year-end delinquency bars re-enrollment.
- **Waitlist** — capacity waitlists are referenced ("be placed on a waiting list"); a formal
 **procedure is NOT PUBLISHED**.
- **Legacy/alumni, faculty children, re-application by denied applicants, transfer/mid-year
 entry** — NOT PUBLISHED as discrete written policies.
- **Non-discrimination — VERBATIM:** "Hickory Grove Christian School admits students of any
 race, color, and national or ethnic origin to all the rights, privileges, programs, and
 activities generally accorded or made available to students at the school. HGCS does not
 discriminate on the basis of race, color, national or ethnic origin in administration of
 its educational policies."`},{subtopic:`Divisions`,source_file:null,preview:`The school describes itself as an Early Education Center, Elementary School, Middle School, and High School. Published grade spans: Elementary School (TK–5), Middle School (6th–8th), High School (9th–12th).`,text:`The school describes itself as an **Early Education Center, Elementary School, Middle School,
and High School**. Published grade spans: **Elementary School (TK–5), Middle School (6th–8th),
High School (9th–12th)**.`},{subtopic:`Tuition — NOT PUBLISHED on the site`,source_file:null,preview:'⚠️ Correction to the prior pass: it treated the two fee PDFs linked from the Tuition & Fees page as tuition schedules whose "fee TABLE did not render." Retrieved 2026-09-01, both are Educational Support Services fee schedules — learning-support pricing, not tuition: - `EdSupportServicesFees26-27.pdf` — "2026-2027…',text:`**⚠️ Correction to the prior pass:** it treated the two fee PDFs linked from the Tuition & Fees
page as tuition schedules whose "fee TABLE did not render." Retrieved 2026-09-01, **both are
Educational Support Services fee schedules** — learning-support pricing, not tuition:

- \`EdSupportServicesFees26-27.pdf\` — "2026-2027 HICKORY GROVE CHRISTIAN SCHOOL EDUCATIONAL
 SUPPORT SERVICES FEES": case management $300/year; pull-out testing $370–$1200/year;
 case management + instruction $1892–$4414/year; high-school academic flex $1806/year,
 academic coaching $2227/year, instructional support class $4455/year; applied
 interventions $1500–$2000/year. "All services require an annual contract/financial
 agreement."
- \`StudentServicesFees25-26_1.pdf\` — the prior year's equivalent.

**Actual tuition by grade is not published anywhere on the public site.** Not a gap in the
admissions card — tuition belongs to the Financial Aid & Tuition area — but the prior pass's
assumption was wrong and should not be repeated.`},{subtopic:`Admissions office contact — as published`,source_file:null,preview:`Director of Admissions & International Student Program: Sheila M. Chaney — admissions@hgchristian.org (also seen as sheilachaney@hgchristian.org in an event listing), 704-531-4008. General admissions office: 704-531-4008, Mon–Fri 7:30 a.m.–3:00 p.m., admissions@hgchristian.org. Campus address (academic): 7200 E. WT…`,text:`**Director of Admissions & International Student Program:** Sheila M. Chaney —
admissions@hgchristian.org (also seen as sheilachaney@hgchristian.org in an event listing),
**704-531-4008**.
**General admissions office:** 704-531-4008, Mon–Fri **7:30 a.m.–3:00 p.m.**,
admissions@hgchristian.org.
**Campus address (academic):** 7200 E. WT Harris Blvd., Charlotte, NC 28215.
**Mailing address:** 6050 Hickory Grove Road, Charlotte, NC 28215 (the church/school complex;
finance/registrar historically at this address). **Reproduce both; do not silently reconcile.**
**Elementary Principal:** Mrs. Lori Cheuvront — loricheuvront@hgchristian.org, 704-531-4195.
**Early Education Center — Harris:** 704-531-4059, harriseec@hgchristian.org.
**Early Education Center — Mallard Creek:** 704-531-5345.
**School main / prospective inquiries:** 704-531-4198 (published on the church's HGCS
ministry page).

**⚠️ Possible stale number:** an old Admissions page lists **704-531-3589**; the current
published admissions number is **704-531-4008**. Ship the current one.

**Only ONE admissions staff member is named** anywhere on the site.`},{subtopic:`NOT PUBLISHED / NOT RETRIEVED`,source_file:null,preview:`- Full verbatim Statement of Faith — referenced only. - Tuition by grade — not published (see the correction above). - International application fee, international tuition, acceptance deposit, separate international deadline, international financial-aid availability, host-family vetting. - Whether Mallard Creek's…`,text:`- **Full verbatim Statement of Faith** — referenced only.
- **Tuition by grade** — not published (see the correction above).
- **International application fee, international tuition, acceptance deposit, separate
 international deadline, international financial-aid availability, host-family vetting.**
- **Whether Mallard Creek's classical TK/K has different steps or deadlines than Harris.**
- **HGBC-member tuition discount** (as distinct from the admissions priority window).
- **Whether non-priority applicants receive fewer testing/visit/interview slots.**
- **Waitlist procedure; legacy/alumni, faculty-children, denied re-application, mid-year
 transfer** written policies.
- **A fixed single notification date** — admission is rolling and capacity-dependent.
- **Reduced enrollment deposit for aid applicants.**
- **Independent-toileting/readiness requirement** for the youngest K–12 entry.
- **Which specific assessment instrument** is used at each band — the checklists name
 "Entrance testing" and a "developmentally appropriate skills assessment" but no instrument
 (no WPPSI/WISC/ISEE reference anywhere on the site).
- **The 2027–28 NCSEAA application window** — set by the state, not yet published.`},{subtopic:`Confusable-school note`,source_file:null,preview:`Content from Hickory Christian Academy (Hickory, NC) — a different school with Sept 1 / Dec 31 age cutoffs that do NOT match HGCS's Oct 16 / Apr 16 — was encountered and rejected. "Hickory Grove Elementary School" listings in PA/IL/NC public districts are unrelated public schools and were excluded.…`,text:`Content from **Hickory Christian Academy (Hickory, NC)** — a different school with Sept 1 /
Dec 31 age cutoffs that do NOT match HGCS's Oct 16 / Apr 16 — was encountered and **rejected**.
"Hickory Grove Elementary School" listings in PA/IL/NC public districts are unrelated public
schools and were excluded. International-program templates from Delaware County Christian
School and Grace Christian School (VT) were never treated as HGCS policy.`},{subtopic:`Source list (official URLs, verified 2026-09-01)`,source_file:null,preview:`- <https://hgchristian.org/admissions/admissions-process> — rendered; the three website steps, priority/public Nov 2026 dates, the stale $250/$500 fee window, both checklist links, non-discrimination - <https://www.hgchristian.org/fs/resource-manager/view/adf10069-819d-4420-83c4-ebba8281c071> →…`,text:`- <https://hgchristian.org/admissions/admissions-process> — **rendered**; the three website
 steps, priority/public Nov 2026 dates, the stale $250/$500 fee window, both checklist links,
 non-discrimination
- <https://www.hgchristian.org/fs/resource-manager/view/adf10069-819d-4420-83c4-ebba8281c071>
 → \`NewFamilyAdmissionsChecklistESNoDate.pdf\` — **RETRIEVED** — Elementary checklist, all
 four steps, TK–K5 vs 1st–5th forms, $500 deposit, automatic-denial rule
- <https://www.hgchristian.org/fs/resource-manager/view/c7376a64-1d57-4a98-a5fb-6cab591a4c65>
 → \`NewFamilyAdmissionsChecklistMHSNoDate.pdf\` — **RETRIEVED** — Middle & High checklist,
 three recommendation forms, high-school-only shadow
- <https://hgchristian.org/academics/tk-or-k5> — Oct 16 / Apr 16 cutoffs, readiness assessment
- <https://hgchristian.org/admissions/scholarships> — FACTS Grant & Aid, $40 charge, NCSEAA
 order of operations, **updated Feb 2 – Mar 2, 2026 window and Apr 15, 2026 renewal**
- <https://hgchristian.org/admissions/international-program/international-student-enrollment-process>
 — the full ordered international process
- <https://hgchristian.org/admissions/international-program/host-families> — homestay; vetting
 specifics NOT PUBLISHED
- <https://hgchristian.org/admissions/tuition-and-fees> — financial policies; **the linked PDFs
 are Educational Support Services fees, NOT tuition**
- <https://www.hgchristian.org/fs/resource-manager/view/7dd54753-7033-45a4-8e4b-9f62e25bc311>
 → \`EdSupportServicesFees26-27.pdf\` — **RETRIEVED** — learning-support fee schedule
- <https://hgchristian.org/admissions/apply-to-hgcs> — **rendered**; carries the prior-cycle
 "2026-2027 SCHOOL YEAR" label
- <https://hgchristian.org/academics/early-education-center> (+ \`/harris-campus\`,
 \`/mallard-creek-campus\`) — campus addresses, half-day vs full-day preschool, EEC phone
- <https://hgchristian.org/academics/hgcs-mallard-creek-campus> — classical TK/K launch
- <https://hg-nc.client.factsmgt.com/oa/index.cfm?memberid=496> (Harris) and \`?memberid=15083\`
 (Mallard Creek) — FACTS application portals
- <https://hickorygrove.org/ministries/other-ministries/christian-school/> — the church's own
 page about the school; used only for the 704-531-4198 number and program facts
- \`/admissions/registration-info\` — **404 on live fetch**; stale 2024–25 duplicate. Recorded
 so a later pass does not go looking for it.

---`}],i={school_slug:e,topic_slug:t,section_count:18,sections:r};export{i as default,e as school_slug,n as section_count,r as sections,t as topic_slug};