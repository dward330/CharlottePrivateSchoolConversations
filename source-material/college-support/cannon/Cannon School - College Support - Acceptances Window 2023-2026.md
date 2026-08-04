# Cannon School — College Support — Acceptance-Window Research (2023–2026 harmonization)

**Provenance:** Researched by Claude via web research, 2026-08-04, for the `acceptance-years`
plan (harmonize the "Where Graduates Go" window to a 2023 floor).
**School:** Cannon School, 5801 Poplar Tent Road, Concord, NC 28027 | CEEB 340879.
**Question asked:** Can the published acceptance list be (a) extended to a 2025/2026 class,
and (b) split so pre-2023 (Class of 2022) acceptances can be dropped, leaving a ≥2023 window?

## Sources read

| Source | URL | What it gave |
|---|---|---|
| College Counseling page (live, fetched 2026-08-04) | https://www.cannonschool.org/academics/college-counseling | Program/parent-programming/team only — **no acceptance list of any year** |
| 2025–26 School Profile (basis on file) | https://resources.finalsite.net/images/v1757349467/cannonschoolorg/i5lqf0krxcb4uejss6ul/Cannon_2526_Profile.pdf | Class of 2025 outcome stats (98% four-year) but the **acceptance list was dropped from this edition** |
| 2024–25 School Profile (the last edition carrying a list) | https://resources.finalsite.net/images/v1727105974/cannonschoolorg/q6vdhpxfxelejegmx4n8/2024-2025_StudentProfile_87212e_webemail.pdf | The **2022–2024 three-year acceptance rollup** (283 institutions) — the newest list Cannon publishes |

## Findings — the window CANNOT move to a 2023 floor

1. **Nothing newer than 2022–2024 is published.** The 2025–26 profile — the current edition —
   **dropped the acceptance list entirely**; it publishes only aggregate Class of 2025 outcome
   percentages. Repeated site-scoped and open-web searches for a Class of 2025 or 2026 named
   destination/acceptance list returned nothing. So the window cannot be extended forward; the
   newest available list is already one full cycle stale (this is the state the existing card
   already documents).

2. **The list is a single 2022–2024 aggregate block.** The list is explicitly "College
   Acceptances" across three graduating classes (2022, 2023, 2024). Cannon publishes **no
   per-class breakdown** of which class an acceptance came from. (The separately published
   Class of 2023 *matriculation* list drives the `enrolling` markers, but that is enrollment,
   not the acceptance list, and it is a single class — it cannot re-window the acceptance list.)

3. **Therefore the pre-2023 year (Class of 2022) cannot be subtracted.** Splitting 2023–2024
   out of the 2022–2024 block would require inferring each institution's class — forbidden by
   the plan.

## Decision (user, 2026-08-04)

**Keep the full published list (2022–2024) and disclose the constraint in the `caveat`.**
The `collegesTitle` stays at the real published window `2022–2024`; it is NOT re-dated. The
caveat (which already flags the aggregate/stale nature) is extended to state that because the
school publishes only a pre-aggregated three-year block with no per-class split, the pre-2023
year cannot be removed and the window predates the 2023 floor the other schools share.

No change to the `colleges` array, `buckets`, `stats`, `collegesTotal`, or `metricValues.ts`
rows — all continue to describe the same 283-institution 2022–2024 list.
