# Admissions Terminology — Shared Glossary

Provenance header
- Compiled: September 6, 2026, for the `admissionsreport` plan (the per-school Admissions
  PDF + NotebookLM podcast episode).
- Why it exists: the six schools' admissions data names nine pieces of jargon —
  WPPSI-IV, WISC-V, ISEE, SSAT, ERB, CTP, CAIS, Clarity, FACTS — and **defines none of
  them.** The data says who administers a test and when it is due, never what it measures.
  A parent hearing "your child sits the WPPSI-IV" in a podcast episode learns nothing and
  may reasonably worry. This file is the authored, sourced definition set that lets the
  episode explain each term without inventing anything.
- Scope: general, cross-school, and NOT school-specific. Every school-specific fact —
  which band sits which test, which deadline, which fee — stays in that school's own
  research file and its `src/data/admissionsPrograms/<slug>.ts`. Nothing here overrides a
  school's own published statement.
- Method: each entry researched against the publisher's or administering body's own pages
  where one exists (Pearson for the Wechsler scales, ERB for the ISEE, Clarity and FACTS
  for the platforms), with secondary sources used only for cross-checking.

**This file is not a claim about any school's process.** It is a plain-language reference
for terms those processes use.

## Source URLs

- WPPSI-IV — https://www.pearsonassessments.com/en-us/Store/Professional-Assessments/Cognition-&-Neuro/Wechsler-Preschool-and-Primary-Scale-of-Intelligence-|-Fourth-Edition/p/100000102
- WISC-V — https://www.pearsonassessments.com/en-us/Store/Professional-Assessments/Cognition-&-Neuro/Wechsler-Intelligence-Scale-for-Children-|-Fifth-Edition-/p/100000771
- ISEE (administering body) — https://www.erblearn.org/families/isee-by-erb/
- ISEE overview — https://www.erblearn.org/blog/what-is-the-isee/
- SSAT — https://en.wikipedia.org/wiki/Secondary_School_Admission_Test
- CAIS testing (Charlotte Area Independent Schools) — https://www.charlottecountryday.org/admissions/admissions-process
- CAIS provider description — https://alderwoodpsych.com/cais-admissions-testing/
- TOEFL (ETS, test family and iBT skills) — https://www.ets.org/toefl.html
- TOEFL Junior (age range, three measured sections) — https://www.ets.org/toefl/junior/prepare.html
- SEVIS / I-20 / I-901 fee (ICE, primary source) — https://www.ice.gov/sevis/students
- Clarity — https://clarityschools.com/
- FACTS — https://factsmgt.com/features/enrollment-management/

---

## The cognitive assessments (younger applicants)

### WPPSI-IV — Wechsler Preschool and Primary Scale of Intelligence, Fourth Edition

**What it is:** an individually administered cognitive assessment, given one-to-one by a
psychologist, published by Pearson.

**Who takes it:** children aged **2 years 6 months to 7 years 7 months**, split into two
age bands (2:6–3:11 and 4:0–7:7). In practice this is the JK/TK/Kindergarten and Grade 1
admissions population.

**What it measures:** general intellectual ability (a Full Scale IQ), built from index
scores covering **verbal comprehension, visual spatial ability, fluid reasoning, working
memory and processing speed**.

**How to describe it to a parent:** a one-to-one session with a psychologist that looks at
how a young child reasons, remembers and solves problems — not a test of what they have
been taught, and not something to revise for.

### WISC-V — Wechsler Intelligence Scale for Children, Fifth Edition

**What it is:** the same family of assessment as the WPPSI, for older children. Also
Pearson, also administered one-to-one by a psychologist.

**Who takes it:** children aged **6 years 0 months to 16 years 11 months**. Typically takes
**45–65 minutes**.

**What it measures:** the same five index areas as the WPPSI-IV — verbal comprehension,
visual spatial, fluid reasoning, working memory, processing speed — plus a Full Scale IQ.

**The relationship worth stating aloud:** the WPPSI and the WISC are the same assessment
family at different ages. A school switching from WPPSI to WISC between grades is following
the age boundary, not raising the bar.

---

## The standardized entrance exams (older applicants)

### ISEE — Independent School Entrance Exam

**What it is:** a standardized admissions test written and administered by the **ERB**
(Educational Records Bureau). Unlike the Wechsler scales, this is a sit-down exam, not a
one-to-one session.

**Who takes it:** applicants to **Grades 2–12**, at four levels — Primary (entering grades
2–4), Lower (5–6), Middle (7–8) and Upper (9–12). **The level is set by the grade the child
is applying TO, not the grade they are currently in** — a common point of confusion.

**What it measures:** five sections — **Verbal Reasoning, Quantitative Reasoning, Reading
Comprehension, Mathematics Achievement, and a 30-minute essay.** The reasoning sections
test how a student thinks; the comprehension and achievement sections test what they have
learned. The essay is not scored but is sent to the schools.

**Format:** available online and on paper; availability varies by location.

### SSAT — Secondary School Admission Test

**What it is:** the other main independent-school entrance exam, and the ISEE's direct
alternative. Some schools accept either.

**Who takes it:** students in grades 3–11.

**What it measures:** three scored areas — **Verbal, Quantitative (two math sections
combined into one score), and Reading** — reported per section with percentile ranks, plus
an unscored writing sample sent to schools. (The published score scale is deliberately
omitted here, per rule 4 below: no school in this project publishes an admissions score
threshold, so a range on the page invites a "what counts as good?" inference that nothing
in the source supports.)

**How it differs from the ISEE, briefly:** the SSAT has two quantitative sections combined
into one score where the ISEE reports four sections separately, and the SSAT lets the
student choose a creative or expository essay prompt, where the ISEE requires expository.
(A relative-difficulty comparison that earlier drafts carried has been removed, per rule 3
below — it is exactly the claim the rule forbids.)

### ERB — Educational Records Bureau

The non-profit that writes and administers the ISEE. When a school's instructions say
"register through the ERB", that is the testing body, not another exam.

### CTP — Comprehensive Testing Program

The ERB's achievement-test series, used by some schools for placement or internal
assessment. Distinct from the ISEE despite sharing an administering body.

---

## The Charlotte-specific piece

### CAIS — Charlotte Area Independent Schools

**What it is:** a local consortium of independent schools that share a **common admissions
testing process**. Members include Charlotte Christian, Charlotte Country Day, Charlotte
Latin, Charlotte Preparatory, Providence Day and Trinity Episcopal.

**How it works:** the family books directly with a psychologist from the CAIS-approved
provider list — the school does not arrange it — and the psychologist administers the
**WPPSI-IV or WISC-V** depending on the child's grade.

**The fact most worth telling a parent:** the testing process is **standard across member
schools**, so one CAIS assessment can serve applications to several of them. A family
applying to three CAIS schools does not sit three tests. Families should still confirm with
each school's admissions office that the result will be accepted and ask the psychologist to
send scores to every school being applied to.

**Cost, where a school publishes one:** the fee is paid to the psychologist directly, not
the school. Charlotte Latin's data records $300; treat any figure as school- and
provider-specific and cite the school's own page.

---

## The international-applicant terms

### TOEFL — Test of English as a Foreign Language

**What it is:** an English-language proficiency test published by **ETS** (Educational
Testing Service). It measures a student's command of English; it is **not** an admissions
test of academic ability, and it does not replace one.

**Who takes it:** international applicants, where a school asks for it. Note that "TOEFL"
names a **family** of tests rather than one exam — the TOEFL iBT is the university-level
test, while **TOEFL Junior** is the one built for middle-school-age students (ages 11+) in
English-medium schools. A school that says only "the TOEFL" has not said which; the family
is the safe thing to name, and which product to sit is a question for the admissions
office.

**What it measures:** the TOEFL iBT covers reading, listening, speaking and writing. The
TOEFL Junior Standard test covers Reading Comprehension, Listening Comprehension, and
Language Form and Meaning.

**The point to make in an episode:** where a school asks for the TOEFL, it is normally **in
addition to** that band's usual entrance test, not instead of it — follow the school's own
wording. Which TOEFL product, and how it is delivered, is set by the school and ETS, not by
this glossary.

### SEVIS — Student and Exchange Visitor Information System

**What it is:** a US government database, run by **Immigration and Customs Enforcement
(ICE)** within the Department of Homeland Security, that holds the record of every
international student attending a US school on an F or M visa. It is a record system, not a
test and not a school process.

**The I-20:** formally the *Certificate of Eligibility for Nonimmigrant Student Status* —
the paper form of a student's SEVIS record. **Only a school that is SEVP-certified can
issue one**, and it issues it after the student is accepted. A family cannot produce an
I-20 themselves.

**The I-901 SEVIS fee:** paid by the student or family, directly, before applying for the
visa; the receipt is presented at the visa application. It is a **government fee, separate
from anything the school charges**.

**Why it matters here:** the same process applies to a K–12 private school as to a
university. Whether a given school is SEVP-certified, and what its own international
procedure is, is **a question for that school's admissions office** — several schools in
this project explicitly do not publish it.

### TBI-New Oasis

**What it is:** an international education **company**, not a test, a school or a
government body. Its full name is the TBI-New Oasis International Group (Tower Bridge
International Group), with offices in Herndon, Virginia and Beijing. It partners with US
private schools to build and run their international-student programs, and on the family
side it supports the school application, arranges and monitors a **homestay** with a host
family, and provides academic and cultural support once the student arrives.

**Why a school names it:** where a school works with TBI-New Oasis, it may require
applicants from China who need an I-20 to **begin** the process through it rather than
through the school's own portal. That is a routing instruction — which door to enter — and
it is published by the school, not by this glossary.

**What it does NOT do — say this carefully:** it does **not** issue the I-20. Only an
SEVP-certified school can, and only after acceptance (see the SEVIS entry above). TBI-New
Oasis's own materials describe supporting the application and translating the documents a
student needs for an F-1 visa; they do not claim to issue the certificate. Do not tell a
family the agency gets them their visa.

**In an episode:** name it, say plainly that it is the school's named partner organization
and the starting point that school publishes for this specific group of applicants, and
**send the family to the admissions office for the details.** Fees, exactly which applicants
are in scope, and what the agency does versus what the school does are not published in the
material this project holds. It applies to a narrow set of applicants — do not imply every
international family goes through it.

## The application and financial-aid platforms

### Clarity

**What it is:** a **financial aid** application platform used by K–12 private schools —
this is the aid application, NOT the admissions application. Used by 1,000+ schools.

**What is distinctive:** Clarity pioneered **IRS tax verification**, meaning the process
can draw on verified tax data rather than requiring families to upload returns manually.
**This is a property of the platform, not a promise about any one school.** Whether a
given school's families see that option — and what documents they are actually asked for
— is set by the school's own aid instructions. Do not tell a parent they will not need
their tax returns.

**Verification does not always succeed, and success does not end the paperwork.** Clarity's
own help pages document both. Direct IRS verification fails for ordinary reasons — a
shortened or preferred first name that does not match the 1040, an address differing down
to the street suffix, corrected documents still being processed, an active audit — and the
family then fills the gaps in manually. Separately, and even when every figure verifies:
*"Even if all of your information was successfully verified through the IRS, you could
still receive a request for further documentation for the school(s) you are applying to."*

**In an episode:** it is fine, and useful, to lead with the good case — this can save a lot
of uploading. Follow it with the caveat in the same breath, and **tell the family to keep
their returns to hand regardless**. The parent who is told the IRS handles it, and is then
asked for documents in January, is who this paragraph exists to protect.

**The point to make in an episode:** Clarity runs on its own clock with its own deadline,
separate from the admissions application. Both must be completed on time.

### FACTS (FACTS Management)

**What it is:** a broader K–12 school platform used for **admissions, enrollment, tuition
billing and financial aid assessment**, serving 12,000+ schools. Related to the RenWeb
student information system.

**Why it differs from Clarity in practice:** a school on FACTS may run the *application*
and the *aid* process through the same platform, where a school on Clarity typically has
the admissions portal in one system and aid in Clarity. Always follow the specific school's
instructions.

### School-branded portals — Charger Commons, myCCS, and similar

Several schools brand their admissions portal: **Charger Commons** (Providence Day, built
on Blackbaud/myschoolapp), **myCCS** (Charlotte Christian). These are the school's own
front door for applying — the account is created after the inquiry form, and the portal
generates a personalized checklist tracking every step.

**The useful framing:** a branded portal name is the school's own website, not a third-party
test or service. Nothing extra to sign up for beyond what the school invites you to.

---

## Rules for using this glossary in a podcast episode

1. **Define a term the first time it is spoken**, in one or two plain sentences, then use it
   normally. Do not stack all twelve definitions into a glossary segment — they belong where
   the term arises.
2. **Never let a definition override a school's own statement.** If a school's data says the
   WISC-V is used for rising Grades 2–4, that is the fact; this file only explains what the
   WISC-V *is*.
3. **Do not state a test's difficulty, or how to prepare for it.** The cognitive assessments
   in particular are not revisable, and implying otherwise would mislead parents into
   coaching a four-year-old.
4. **Do not give score ranges, cutoffs, or what a "good" result looks like.** No school in
   this project publishes an admissions score threshold, and inventing one is the worst
   possible failure here.
5. **Prefer the reassuring, factual register.** These terms sound clinical; a parent hearing
   "intelligence scale" needs to know it is a normal, routine part of applying.
