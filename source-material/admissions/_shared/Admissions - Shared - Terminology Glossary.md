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

## The application and financial-aid platforms

### Clarity

**What it is:** a **financial aid** application platform used by K–12 private schools —
this is the aid application, NOT the admissions application. Used by 1,000+ schools.

**What is distinctive:** Clarity pioneered **IRS tax verification**, meaning the process
draws on verified tax data rather than requiring families to upload returns manually.

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
   normally. Do not stack all nine definitions into a glossary segment — they belong where
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
