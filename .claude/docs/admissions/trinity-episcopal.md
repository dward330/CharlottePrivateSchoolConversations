# Trinity Episcopal School — Admissions
> Distilled from 2 source document(s) in `source-material/admissions/trinity-episcopal/`. Auto-extracted full text, lightly cleaned. Rebuilt 2026-09-16.
**Documents:** Application Process and Testing, CAIS Consortium


---

## Application Process and Testing

*Source file: `Trinity Episcopal School - Admissions - Application Process and Testing.md`*

# Trinity Episcopal School — Admissions — Application Process and Testing

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** Direct `curl` fetch of raw HTML, text extracted locally; quotes are
 char-for-char from page source, not from a summarizing fetcher.
- **School:** Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202 — **K–8**.

## Source URLs

- Admission process — https://www.tescharlotte.org/admission/admission-process.cfm
- Admission events and tours — https://www.tescharlotte.org/admission/admission-events-and-tours.cfm
- Admission team — https://www.tescharlotte.org/admission/

## ⚠️⚠️ THREE NON-ALIGNED GRADE SPLITS — the sentence most likely to be written wrongly

Trinity's admissions bands **do not line up with each other**, and the natural
simplifying sentence is false.

| Split | Boundary | Bands |
|---|---|---|
| **Deadlines and decisions** | K vs 1 | **K** / **1–8** |
| **Testing instrument** | 1 vs 2, and 4 vs 5 | **K–1** / **2–4** / **5–8** |
| **Administering body** | 4 vs 5 | **CAIS (K–4)** / **ISEE (5–8)** |

> ⛔ **"Grades 1–8 take the ISEE" is FALSE.** The ISEE is **grades 5–8 only**.
> The deadline band "Grades 1-8" spans *both* testing boundaries, which is precisely why
> the wrong sentence is so tempting.

**Verbatim, under "Admission Testing":**
> "Grades **K-1** applicants take the **WPPSI-IV** (Wechsler Preschool & Primary Scale of
> Intelligence)"
> "Grades **2-4** applicants take the **WISC-V** (Wechsler Intelligence Scale for
> Children)"
> "Grades **5-8** applicants take the **ISEE** (Independent School Entrance Exam)"

**Verbatim, from the Admission Checklist sidebar:**
> "Complete testing: **CAIS (K-4) and ISEE (5-8)**"

## The 2027-28 cycle — and the label agrees with the dates

Verbatim:
> "The deadlines to apply for the **2027-28 school year** are:"

| Stage | Kindergarten | Grades 1–8 |
|---|---|---|
| **Application deadline** | **January 2, 2027** | **January 15, 2027** |
| **Supporting materials** | **February 1, 2027** | **February 26, 2027** |
| **Decisions emailed** | **Friday, February 26, 2027** | **Friday, April 9, 2027** |

> ⚠️ **The cycle label and the dates agree** — which is unusual enough to be worth
> verifying, and it checks out. **Do not "correct" the 2027-28 label.**

The page also notes: "We are still accepting applications for the 2026-2027 school year
in select grades."

> ⚠️ **Note the collision:** **February 26, 2027** is simultaneously the *grades 1–8
> supporting-materials* deadline and the *Kindergarten decision* date. Both are correct.
> Likewise **February 1, 2027** is both the K supporting-materials deadline and the
> prospective-family financial-aid deadline.

## Portal, visits and recommendations

**Portal: FACTS** — "Setup your FACTS admission account", "Submit the application and
application fee". Site-wide navigation carries "FACTS Family Portal".
**There is no Ravenna anywhere on this site.**

**Wildcat Visit Day**, verbatim:
> "Applicants will be invited to register to spend the day on campus (rising 1st-8th) or
> attend a morning observation session (rising Kindergarten) beginning in **November**."

**Teacher recommendations**, verbatim:
> "Teacher recommendations are required for all K-8 applicants. **Rising 6-8 applicants
> are required to submit two teacher recommendations, an English teacher and math teacher
> recommendation.** Transcripts are also required for all 1st-8th Grade applicants."

> ⚠️ The page says recommendations are required for **all K–8**, and specifies **two**
> only for rising 6–8. It does **not** say "one for K–4" — that would be an inference.

**Follow-Up Conference**, offered to every family, verbatim:
> "We invite **every family** who completes the application process to sit down with our
> admission team to share what we have learned about their child through the process and
> help the family discern how Trinity Episcopal School can best partner with the family in
> support of their child."

**Spanish-language contact** is published: "Si su idioma principal es el español y
prefiere comunicarse en español, póngase en contacto con Fé Patriciu."

## Open houses — and two school-side errors

| Event | Date as printed | Weekday check | process.cfm time | events-and-tours.cfm time |
|---|---|---|---|---|
| Kindergarten Open House | "Tuesday, Sept. 29, 2026" | ✅ correct | 9:30 – 11:00 a.m. | 9:30-11:00 a.m. |
| K–8 Open House | "Thursday, Nov. 5, 2026" | ✅ correct | 9:30 – 11:00 a.m. | 9:30-11:00 a.m. |
| K–8 Open House | "Thursday, Dec. 1, 2026" | ⛔ **Dec 1 2026 is a TUESDAY** | **9:00 – 10:30 a.m.** | **9:30-11:00 a.m.** |

**Two distinct errors, both on the Dec 1 event:**
1. **The weekday is wrong** — labelled "Thursday", it is a Tuesday. (Sept 29 and Nov 5 are
 both correctly labelled; this is the only weekday error.)
2. **The time disagrees between the school's own two pages** — 9:00–10:30 on the process
 page versus 9:30–11:00 on the events page.

**Preserve and flag both. Do not silently fix them.**

Open houses are held "in **Trinity's Center for Community and the Arts**".

## A third date error — the stale financial-aid deadline

The process page states, verbatim:
> "The financial support application deadline for prospective families is **Thursday,
> February 1, 2026**."

This is **a year stale** (the tuition page says **Feb. 1, 2027**), **and** Feb 1 2026 is a
**Sunday**, not a Thursday. The root cause is traceable: the 2026-05-09 archived snapshot
shows the tuition page itself once read "Thursday, February 1, 2026" — the process page was
never rolled forward. See the Financial Support file.

**Every other date on the process page is correctly 2027.** Only the aid line is stale.

## ⛔ Confirmed absent

| Item | Status |
|---|---|
| **Application fee amount** | **Confirmed absent.** The checklist says "Submit the application and application fee" and never states a figure. `grep -o '\$[0-9][0-9,.]*'` over the entire raw HTML returns **zero dollar signs on the page**. |
| **Acceptance rate** | **Confirmed absent** — not on the site, not in either profile PDF |
| **Individual tour dates** | **Confirmed absent by policy** — "To schedule a tour, click on an admission team member below for their calendar, or contact the Admission office at admissions@tescharlotte.org or 980-207-5898." |
| **Enrollment-contract deadline** | **Not published by Trinity.** It is reachable only via the CAIS brochure, and there it is a **CAIS-wide rule**, not a Trinity date. State it as a CAIS rule. |


---

## CAIS Consortium

*Source file: `Trinity Episcopal School - Admissions - CAIS Consortium.md`*

# Trinity Episcopal School — Admissions — CAIS Consortium

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** Downloaded the consortium brochure PDF — **hosted on Trinity's own domain** —
 and extracted with `pdftotext -layout` (301 lines). Quotes are char-for-char.
- **School:** Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202 — **K–8**.

## Source URL

- https://www.tescharlotte.org/editoruploads/files/CAIS2024-25final.pdf

## ⚠️ This is the 2024-25 edition — its STRUCTURE carries forward, its DATES do not

The cover reads "2024-2025" and its inner dates run December 2023 – April 2024.

**Carries forward:** the seven members, the two instruments and their grade bands, the
$275 testing fees, the coaching/re-testing invalidation rule, the common
notification-and-reply structure, and the no-contract-before-deadline guarantee.

**Does NOT carry forward:** every specific date. CAIS's own K deadline in this edition was
Dec 31 2023 and grades 1–4 Jan 15 2024, which **does not match** Trinity's current K Jan 2
/ 1–8 Jan 15 — a further reason not to reuse these dates as current.

## The seven members

Verbatim from the brochure's own eligibility list:

1. Charlotte Christian School
2. Charlotte Country Day School
3. Charlotte Latin School
4. **Charlotte Preparatory School**
5. Covenant Day School
6. Providence Day School
7. **Trinity Episcopal School**

> Five of the seven have dossiers in this app. Charlotte Preparatory School does not —
> it was assessed and **abandoned** (`.claude/plans/charlotteprep.md`).

Trinity's contact in the brochure: **Benita Griffin, Interim Director of Admission &
Financial Support**, 750 East 9th Street, Charlotte, NC 28202-3102, 704-358-8101.

> ⚠️ **Benita Griffin no longer appears in Trinity's staculty directory.** This brochure
> is a 2024-25 document and its contact is stale. Do not cite her as current staff.

## The testing instruments

Verbatim:
> "They are the **Wechsler Preschool and Primary Scale of Intelligence–Fourth Edition
> (WPPSI-IV)** for **Pre-K, Kindergarten, and Grade 1** applicants; and the **Wechsler
> Intelligence Scale for Children–Fifth Edition (WISC-V)** for **rising Grades 2-4**."

This is **consistent** with Trinity's own "Grades K-1 / Grades 2-4" bands. (CAIS includes
Pre-K because other members enroll Pre-K; Trinity starts at Kindergarten.)

**Testing fees**, verbatim:
> "Testing Fees: **$275** for WPPSI-IV / **$275** for WISC-V"

## ⚠️ The invalidation rule — the single most consequential policy here

Verbatim, and it appears **twice** in the brochure:

> "Psychologists will report to the schools any indication that a child has been
> **coached, tutored, or re-tested**. Any indication of the aforementioned will
> **invalidate your application to any CAIS school**. Parents will be asked to sign a
> **Test Validity Verification Form** at the psychologist's office to ensure no prior
> testing/coaching has occurred."

**The penalty is consortium-wide, not school-specific** — it invalidates the application
at *every* CAIS school, which is materially different from a single school's rule.

## Other policies, verbatim

> "children must be **at least four years of age at the time of testing**, and the
> assessment can be administered **only once in a twelve month period**."

> "Please schedule with **only one psychologist**." / "Book an appointment with one
> psychologist **ONLY**."

> "In addition to the assessment, CAIS schools require an **interview with each child**…
> typically held **November–February**."

> "test results that are **limited to percentile ranges** are sent to the parents and to
> the designated schools"

> "There will be **no refund** if there is a cancellation **within 48 hours** of the
> appointment."

## Common notification and reply dates — the STRUCTURE

Verbatim (2024-25 edition dates — **stale, quoted for structure only**):

> "TK/JK/K for all CAIS schools: Notification date is Friday, February 23, 2024. Contracts
> must be returned by Friday, March 1, 2024."
> "Grades 1-4 for all CAIS schools: Notification date is Friday, March 28, 2024. Contracts
> must be returned by Thursday, April 5, 2024."

And the guarantee that makes the consortium matter to a family:

> "**No contract for a CAIS school will be required prior to this deadline.**"

**This is why the enrollment-contract deadline is a CAIS rule rather than a Trinity
date** — the consortium sets a common floor so that no member school can force a family's
hand before the others have replied.

## What this means for a Trinity applicant, by grade

| Applying to | Instrument | Administered by | Fee |
|---|---|---|---|
| **K–1** | WPPSI-IV | CAIS consortium psychologist | $275 |
| **2–4** | WISC-V | CAIS consortium psychologist | $275 |
| **5–8** | **ISEE** | **Not CAIS** — the ISEE is a separate exam | *(no CAIS fee)* |

**Grades 5–8 sit outside the CAIS testing arrangement entirely.** The consortium's
instruments, fees, invalidation rule and common notification dates apply to **K–4
applicants only**.


---

## Sources referenced across these documents

- https://www.tescharlotte.org/admission/
- https://www.tescharlotte.org/admission/admission-events-and-tours.cfm
- https://www.tescharlotte.org/admission/admission-process.cfm
- https://www.tescharlotte.org/editoruploads/files/CAIS2024-25final.pdf
