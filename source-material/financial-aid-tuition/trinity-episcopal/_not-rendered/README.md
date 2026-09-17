# Trinity Episcopal — Financial Aid & Tuition: rendering scope

**Reduced at review, 2026-09-16 (user): "Remove every card under the Financial Aid &
Tuition research area except the Per-grade cost table."**

The app therefore renders exactly ONE card for this area — the per-grade cost table
for 2026-27. Nothing here is deleted; the research record is intact and committed.

## What still renders

`../Trinity Episcopal School - Financial Aid and Tuition - Tuition and Fees.md`,
reduced to its `## Per-grade cost table — 2026-27` section.

## What was moved here, and why it is kept

| File | Holds |
|---|---|
| `… - Financial Support.md` | the 31% / $2,139,114 aid figures, the three-point aid series, how to apply via Clarity, the NC Opportunity Scholarship route |
| `… - Form 990.md` | FY2012–FY2025 filings, Head of School compensation, corroboration of the school's own figures |
| `… - School Profile 2026-27.md` | verbatim profile text for 26-27 and 25-26, the year-over-year comparison, the versioned-URL warning |

Sections cut from the Tuition and Fees file — its provenance header, source URLs, the
25-26 profile's wrong tuition figure, the four-year tuition history, FLIK lunch, other
costs, and the confirmed-absent and do-not-ship lists — are recoverable from git
history (the reduction commit on `feat/trinity-episcopal`).

**Provenance for the surviving cost table.** Retrieved by Claude (Claude Code agent) on
behalf of Derrick, 2026-09-16, by direct `curl` of the live tuition page and the
school's own "Cost of Attendance for 2026-27" Google Doc exported as text. Every dollar
figure was read verbatim from a retrieved document; none are derived, interpolated or
back-computed. School: Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202
— K–8. EIN `56-2059568`.

Sources:
- https://www.tescharlotte.org/admission/tuition-affordability.cfm
- https://docs.google.com/document/d/1jh3Oc1gO1ShFo7bDR6xGEXCwvjN8Gpn_Ylg3z6Igs0M/export?format=txt

## To restore the full area

Move the three files back up one level, restore the cut sections from git, then run
`python3 .claude/skills/ingest-source-material/build_docs.py` and
`python3 scripts/build_site_content.py`.
