# HBCUs — Membership and Count 2026

Cross-school reference. This file backs the **denominator 107** used in the new "HBCUs"
row of the Selectivity buckets table on every school's College Support page, and the
`hbcu` category applied to individual acceptances in the "Every acceptance" list.

It is filed under `_shared/` rather than a school folder because neither the denominator
nor the canonical membership list is a school-specific research finding — it is the same
fixed set for all six schools. This mirrors
`Power Four - Conference Membership 2026.md` in the same folder.

## Provenance

- **Who:** Researched by Claude (Opus 4.8) on behalf of the project owner.
- **When:** 2026-08-02.
- **How:** Live web check of the count of federally-designated HBCUs and the HBCU status
  of every candidate institution that appears on at least one of the six schools'
  acceptance lists. The candidate set was extracted from
  `src/data/collegeSupportPrograms/*.ts` and each name was confirmed against a published
  HBCU roster.
- **Method note:** This is a **membership census, not a derived count.** The HBCU
  designation is a fixed federal list, so both the denominator (107) and each school's
  numerator (an exact intersection of that school's acceptance list with the roster) are
  exact, not approximate — unlike the Top-75 buckets, which are scored against U.S. News
  rank tables around a tie boundary.

## The denominator: 107

- **107** is the count the U.S. Department of Education has given the HBCU designation,
  per the White House Initiative on HBCUs framing. This is the denominator the project
  owner chose for the bucket row (over the narrower NCES count of ~99, which reflects a
  different classification methodology).
- Recorded so a later pass does not "correct" 107 to 99: the two counts measure different
  things. 107 = DoE-designated institutions; ~99 = NCES-classified. The app uses the
  DoE designation deliberately.

## Source URLs

- https://hbculifestyle.com/hbcu-colleges-list/ — "Complete HBCU Colleges List 2026: All
  107 Schools by State"; states the 107 DoE-designated count and enumerates the roster.
- https://en.wikipedia.org/wiki/Lincoln_University_(Pennsylvania) — Lincoln (PA), HBCU.
- https://www.britannica.com/topic/Lincoln-University-Jefferson-City-Missouri — Lincoln
  (MO), also an HBCU (relevant to the Providence Day disambiguation below).

## The canonical membership used for tagging

Every institution below appears on at least one of the six schools' acceptance lists and
is a confirmed HBCU. An acceptance is tagged `hbcu` (and counted toward that school's
`n / 107`) **iff** its college name exactly matches one of these:

| Institution | Notes |
|---|---|
| Howard University | |
| Spelman College | Also `lac75` (Top-75 liberal arts) — HBCU tag is additive |
| Morehouse College | |
| Hampton University | |
| Xavier University of Louisiana | |
| Florida A&M University | |
| North Carolina A&T State University | |
| North Carolina Central University | |
| Winston-Salem State University | |
| Fayetteville State University | |
| Elizabeth City State University | |
| Johnson C. Smith University | Providence Day spells it `Johnson C Smith University` (no period) — both are the same HBCU |
| Livingstone College | |
| Morgan State University | |
| Delaware State University | |
| Albany State University | |
| Clark Atlanta University | |
| Tennessee State University | |
| Virginia State University | |
| South Carolina State University | |
| Alabama A&M University | |
| Fisk University | |
| Lincoln University | Providence Day lists a bare "Lincoln University". Both Lincoln (PA) and Lincoln (MO) are HBCUs, so this counts as an HBCU regardless of which campus is meant |

### Explicitly NOT HBCUs (guard against substring false-positives)

These appear on the lists and superficially resemble an HBCU name but are **not**
designated HBCUs. Do not tag them:

- **East Tennessee State University**, **Middle Tennessee State University** — substring
  of "Tennessee State University" (which *is* an HBCU), but these two are not.
- **Georgia Southern University**, **Charleston Southern University** — "Southern" is not
  the HBCU "Southern University"; neither is an HBCU.

## Per-school counts (as of 2026-08-02)

Exact intersection of each school's `colleges` array with the roster above, counted by
full-name match (not substring):

| School | HBCUs on list | Denominator |
|---|---|---|
| Charlotte Country Day | 18 | 107 |
| Providence Day | 14 | 107 |
| Charlotte Christian | 10 | 107 |
| Charlotte Latin | 6 | 107 |
| Cannon | 5 | 107 |
| Davidson Day | 3 | 107 |

These are the numerators written into each school's `buckets` HBCU row. Re-derive them
from the data at implementation time rather than trusting this table — the acceptance
lists may have grown since this file was written.
