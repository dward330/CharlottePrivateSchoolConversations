# Davidson Day School — College Support — Acceptance-Window Research (2023–2026 harmonization)

**Provenance:** Researched by Claude via web research + local PDF text extraction, 2026-08-04,
for the `acceptance-years` plan (harmonize the "Where Graduates Go" window to a 2023 floor).
**School:** Davidson Day School, 750 Jetton Street, Davidson, NC 28036.
**Question asked:** Can the published acceptance list be (a) extended to a 2026 class, and
(b) split so that pre-2023 (Class of 2021, 2022) acceptances can be dropped, leaving a
window that starts at ≥2023?

## Sources read

| Source | URL | What it gave |
|---|---|---|
| College Counseling page (live, fetched 2026-08-04) | https://www.davidsonday.org/academics/college-counseling | Class of 2025 aggregate highlights only — NO named per-class acceptance list |
| School Profile 2025–2026 (4-page PDF, text-extracted with pypdf) | https://resources.finalsite.net/images/v1764962120/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf | The acceptance list, headed verbatim **"Colleges & Universities Accepting Davidson Day Students \| 2021 – 2025"** |

## Findings — the window CANNOT move to a 2023 floor

1. **No Class of 2026 acceptance list exists.** The current (2025–26) profile publishes a
   Class of 2026 **GPA distribution** (Highest 4.60 / Median 3.96 / Lowest 2.49) and states
   outright it "will not be providing the testing profiles for the Class of 2026." It does
   **not** publish a Class of 2026 acceptance or matriculation list. So the window cannot be
   extended forward.

2. **The list is a single, undifferentiated 2021–2025 block.** The only named acceptance
   list the school publishes is headed **"…Accepting Davidson Day Students | 2021 – 2025"** —
   a five-year cumulative list. The school publishes **no per-class breakdown** of which
   graduating class an individual acceptance came from. The Class of 2025 highlights say the
   class "selected 35 different colleges" but the school **never names those 35**.

3. **Therefore the pre-2023 years (Class of 2021, 2022) cannot be subtracted.** There is no
   per-class list to narrow to. Computing a 2023–2025 sub-window from the 2021–2025 block
   would require inferring which class each of the 255 institutions belongs to — which the
   plan explicitly forbids ("Never infer, interpolate or estimate which year an acceptance
   belongs to. An unsourced list is worse than a mismatched range.").

## Decision (user, 2026-08-04)

**Keep the full published list (2021–2025) and disclose the constraint in the `caveat`.**
The card's `collegesTitle` stays at the real published window `2021–2025`; it is NOT re-dated
to imply a 2023 start it cannot support. The caveat states plainly that the school publishes
only a five-year cumulative block with no per-class breakdown, so the pre-2023 years cannot
be split off and the window predates the 2023 floor the other schools share.

No change to the `colleges` array, `buckets`, `stats`, `collegesTotal`, or `metricValues.ts`
rows — all continue to describe the same 255-institution 2021–2025 list they already sit beside.
