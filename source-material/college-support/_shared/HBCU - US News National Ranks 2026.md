# HBCUs — U.S. News National Ranks 2026

Cross-school reference. Backs the `rankLabel` values shown beside individual HBCU
acceptances in the "Every acceptance" list on the College Support pages.

Filed under `_shared/` (like `HBCU - Membership and Count 2026.md` and the Power Four
membership list) because a school's U.S. News rank is the same fact wherever that school
appears — it is not a per-school research finding.

## Provenance

- **Who:** Researched by Claude (Opus 4.8) on behalf of the project owner.
- **When:** 2026-08-02.
- **How:** Web check of each HBCU's placement in the U.S. News & World Report **2026 Best
  Colleges** rankings, distinguishing the *National Universities* and *National Liberal
  Arts Colleges* tables (the two the app's `rankLabel` field draws from) from the separate
  *HBCU* and *Regional* tables (which the app does not label).

## Scope decision (project owner's call, 2026-08-02)

The app's `rankLabel` shows only two U.S. News tables — `National Rank #N` (National
Universities) and `Liberal Rank #N` (National Liberal Arts Colleges) — and historically
was populated only down to about **#147**, the window used for the Top-75 selectivity
buckets. Schools past that window are deliberately left **blank** (hundreds of non-HBCU
acceptances carry no rank).

Only HBCUs with a **confidently verified, single published number inside that convention**
are labelled. HBCUs ranked deep in National Universities (roughly #169–#400, where U.S.
News reporting is less precise and secondary sources disagree) are left blank, matching
how every other school at that rank depth is treated. This keeps the figures trustworthy
(a parent matches them against U.S. News's own page) and the list internally consistent.

## Ranks applied

| Institution | U.S. News 2026 table | rankLabel | Confidence |
|---|---|---|---|
| Howard University | National Universities | `National Rank #88` | High — multiple independent sources agree on #88 |
| Morehouse College | National Liberal Arts Colleges | `Liberal Rank #96` | High — confirmed by Morehouse's own 2026 rankings press release ("No. 96 among liberal arts colleges nationwide") |
| Spelman College | National Liberal Arts Colleges | `Liberal Rank #39` (already in app) | Incumbent value kept; one secondary source reported #37, but the existing #39 is retained rather than churned |

## Deliberately NOT labelled (deep National-University ranks, left blank)

These are National Universities but rank well past the app's ~#147 labelling window, and
the exact numbers came only from search snippets that disagreed (two different schools
returned the same #329), so no single number is trustworthy enough to cite as a figure a
parent would match against U.S. News:

- Florida A&M University (~#169), North Carolina A&T State University (~#232),
  Hampton University (~#273), Morgan State University (~#329), Clark Atlanta University
  (~#329), Tennessee State University (bottom tier / banded).

The remaining tagged HBCUs (NC Central, Winston-Salem State, Fayetteville State,
Elizabeth City State, Johnson C. Smith, Livingstone, Delaware State, Albany State,
Virginia State, South Carolina State, Alabama A&M, Fisk, Lincoln) are Regional
Universities, Regional Colleges, or ranked only in the HBCU table — no National/Liberal
number applies, so they stay blank as before.

## Source URLs

- https://www.usnews.com/best-colleges/howard-university-1448 — Howard University profile
  (National Universities #88, 2026).
- https://news.morehouse.edu/2026-us-news-world-report-rankings — Morehouse College, 2026
  U.S. News rankings press release ("No. 96 among liberal arts colleges nationwide").
- https://www.usnews.com/best-colleges/rankings/national-universities — 2026 National
  Universities table (436 ranked).
- https://www.usnews.com/best-colleges/rankings/national-liberal-arts-colleges — 2026
  National Liberal Arts Colleges table.
