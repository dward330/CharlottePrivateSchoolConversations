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
