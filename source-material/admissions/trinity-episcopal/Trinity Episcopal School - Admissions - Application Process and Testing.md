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
