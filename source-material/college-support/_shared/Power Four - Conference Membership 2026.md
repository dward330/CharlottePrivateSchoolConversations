# Power Four — Conference Membership 2026

Cross-school reference. This file backs the **denominator 68** used in the "Power Four"
row of the Selectivity buckets table on every school's College Support page, and in
Charlotte Latin's Power Four stat tile and subhead.

It is filed under `_shared/` rather than a school folder because the figure is not a
school-specific research finding — it is the same fixed membership for all six schools.

## Provenance

- **Who:** Researched by Claude (Opus 5) on behalf of the project owner.
- **When:** 2026-08-02.
- **How:** Live web check of each of the four conferences' membership rosters at the time
  of writing, cross-read against a general search summary that disagreed (see
  "The 67-vs-68 discrepancy" below). Verified specifically because the app asserts the
  figure as an exact denominator, and the repo previously carried a stale one (64).
- **Method note:** This is a **membership census, not a derived count.** Unlike the
  Top-75 bucket figures — which are scored against U.S. News rank tables and are
  approximate around the tie boundary — conference membership is a fixed, enumerable
  list. The count below is exact.

## Source URLs

- https://en.wikipedia.org/wiki/Atlantic_Coast_Conference
- https://en.wikipedia.org/wiki/Southeastern_Conference
- https://en.wikipedia.org/wiki/Big_Ten_Conference
- https://en.wikipedia.org/wiki/Big_12_Conference

## The count

| Conference | Full members |
|---|---|
| ACC | 18 |
| SEC | 16 |
| Big Ten | 18 |
| Big 12 | 16 |
| **Total** | **68** |

## The 67-vs-68 discrepancy — read this before "correcting" the figure

A search-engine summary of the same question returns **67**, and published articles
routinely say the ACC has **17** members. Both numbers are defensible; they answer
different questions.

- **68 counts member institutions.** The ACC has 18, including **Notre Dame**, which
  joined in all conference sports *except football* and men's ice hockey, remaining a
  football independent.
- **67 counts football-playing members**, excluding Notre Dame. This is the count used by
  college-football coverage, which is most of what is written about these conferences.

**This app needs 68.** The buckets count *college acceptances* — an academic list, not a
football schedule — so a school that is an ACC member for every sport but one belongs in
the denominator. Notre Dame appears on five of the six schools' published acceptance
lists (all but Cannon), so excluding it would produce a denominator that a numerator can
exceed.

If a future pass finds 67 in a source and moves to "fix" this: check whether that source
is counting football membership first.

## Member-by-member breakdown

### ACC — 18

Boston College, California, Clemson, Duke, Florida State, Georgia Tech, Louisville,
Miami, North Carolina, NC State, **Notre Dame** (non-football member), Pittsburgh, SMU,
Stanford, Syracuse, Virginia, Virginia Tech, Wake Forest.

Cal, Stanford and SMU joined in 2024.

### SEC — 16

Alabama, Arkansas, Auburn, Florida, Georgia, Kentucky, LSU, Ole Miss, Mississippi State,
Missouri, Oklahoma, South Carolina, Tennessee, Texas, Texas A&M, Vanderbilt.

Oklahoma and Texas joined in the 2024–25 academic year.

### Big Ten — 18

Illinois, Indiana, Iowa, Maryland, Michigan, Michigan State, Minnesota, Nebraska,
Northwestern, Ohio State, Oregon, Penn State, Purdue, Rutgers, UCLA, USC, Washington,
Wisconsin.

UCLA, USC, Oregon and Washington joined on 2024-08-02.

### Big 12 — 16

Arizona, Arizona State, Baylor, BYU, UCF, Cincinnati, Colorado, Houston, Iowa State,
Kansas, Kansas State, Oklahoma State, TCU, Texas Tech, Utah, West Virginia.

## Why 64 was stale

Charlotte Latin's research file
(`charlotte-latin/Charlotte Latin - College Support - Redesign Research 2026.md`, the
`63 of 64 member institutions` line) recorded a **64-member** Power Four. That was the
**pre-2024-realignment** membership. The four schools added since — Cal, Stanford and SMU
to the ACC, and the Pac-12 quartet to the Big Ten, against Pac-12 dissolution — moved the
total to 68.

The rest of the College Support card is scored against the **2026 U.S. News** tables, so
64 was inconsistent with its own card. It was reconciled to 68 in the
`bucket-denominators` change; see that plan for the numerator treatment.
