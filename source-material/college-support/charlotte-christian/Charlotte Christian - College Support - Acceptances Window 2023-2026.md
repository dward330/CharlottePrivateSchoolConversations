# Charlotte Christian School — College Support — Acceptance-Window Research (2023–2026 harmonization)

**Provenance:** Researched by Claude via web research, 2026-08-04, for the `acceptance-years`
plan (harmonize the "Where Graduates Go" window to a 2023 floor).
**School:** Charlotte Christian School, 7301 Sardis Road, Charlotte, NC 28270.
**Question asked:** Can the 2023–2025 acceptance list be extended to include a Class of 2026?

## Sources read

| Source | URL | What it gave |
|---|---|---|
| College Counseling page (live, fetched 2026-08-04) | https://www.charlottechristian.com/academics/college-counseling | Links to the current School Profile + College & Career Planning brochure |
| Class of 2025 page (live) | https://www.charlottechristian.com/academics/seniorclass | The **Class of 2025** is the current graduating-class document ("Celebrating the Class of 2025") — $6.4M scholarships, 99% four-year |
| College & Career Planning brochure (basis on file) | (see charlotte-christian.ts `CCS`) | The **2023–2025** three-year acceptance list, 186 institutions |

## Findings — already at the 2023 floor; 2026 not published

1. **The window already starts at 2023.** Christian's list is a three-year aggregate covering
   the **Classes of 2023, 2024 and 2025** — it satisfies the 2023 floor as-is. There is no
   pre-2023 data to remove. (The `buckets[].note` correctly observes that Yale "appears only on
   the older list" — i.e. a pre-2023 edition — confirming the current list is already
   2023-floored and the older data is already excluded.)

2. **No Class of 2026 acceptance list exists.** The school's current graduating-class document
   is "Celebrating the Class of 2025"; the Class of 2026 has not been published as a graduating
   class. No Class of 2026 acceptance list is available — the window cannot be extended forward.

## Decision

**No window change.** Christian stays `2023–2025`. The `colleges` array, `buckets`, `stats`,
`collegesTotal` and `metricValues.ts` rows are unchanged. The existing `caveat` already
explains this is a three-year acceptance list (asterisk = Class of 2025 enrollment only) and
reads correctly under the harmonized framing. This school required verification only, per the
plan.

## Note carried to PR body (out of scope here)

Charlotte Christian's `collegeSupportPrograms/charlotte-christian.ts` `year` field is one of
the seven known English strings that ship untranslated in all non-English locales (documented
in CLAUDE.md). This plan does **not** widen `i18n_fields.mjs`, and adds no new prose to that
skipped field path. Recorded so it is not re-discovered as a new bug.
