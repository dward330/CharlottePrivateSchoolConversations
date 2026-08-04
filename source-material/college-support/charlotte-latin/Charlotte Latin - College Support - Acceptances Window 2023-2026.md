# Charlotte Latin School — College Support — Acceptance-Window Research (2023–2026 harmonization)

**Provenance:** Researched by Claude via web research, 2026-08-04, for the `acceptance-years`
plan (harmonize the "Where Graduates Go" window to a 2023 floor).
**School:** Charlotte Latin School, 9502 Providence Road, Charlotte, NC 28277.
**Question asked:** Can the 2023–2025 acceptance list be extended to include a Class of 2026?

## Sources read

| Source | URL | What it gave |
|---|---|---|
| College Acceptances page (live, fetched 2026-08-04) | https://www.charlottelatin.org/academics/college-counseling/acceptances | Heading verbatim **"Acceptances by the Classes of 2023-25"** — still the three-year aggregate |
| 2025–26 Upper School Profile (basis on file) | (Finalsite resource manager — see charlotte-latin.ts `PROFILE`) | Same 2023–25 "College Admission Summary", 300 institutions |

## Findings — already at the 2023 floor; 2026 not published

1. **The window already starts at 2023.** Latin's list is a three-year aggregate covering the
   **Classes of 2023, 2024 and 2025** — it satisfies the 2023 floor as-is. There is no
   pre-2023 data to remove.

2. **No Class of 2026 acceptance list exists.** The live Acceptances page (fetched
   2026-08-04) still reads "Acceptances by the Classes of 2023-25". No Class of 2026
   acceptance list is published — the school has not extended the window forward.

## Decision

**No window change.** Latin stays `2023–2025`. The `colleges` array, `buckets`, `stats`,
`collegesTotal` and `metricValues.ts` rows are unchanged — they already describe the correct
in-window list. The existing `caveat` already explains this is a three-year aggregate, not a
matriculation list; it was re-read and reads correctly under the harmonized framing (no edit
required beyond confirming it still holds once the other schools are 2023-floored). This
school required verification only, per the plan.
