# Gaston Day School — College Support — UNC System Admissions

**Provenance:** Scraped by Claude from the UNC System **Insight** public Tableau
dashboard on **2026-08-19**, using the method recorded in the `nc-admissions-data`
skill (`.claude/skills/nc-admissions-data/reference/METHOD.md`) — headful Chrome
driven over the DevTools Protocol, real mouse events, clear-then-check-one filter
selection, values read from a screenshot because the table is canvas-rendered.

**Why this source matters:** these are *government-published* admissions outcomes per
(high school × campus) pair — not the school's own marketing figure.

## Source

| Field | Value |
|---|---|
| Dashboard | https://insight.northcarolina.edu/t/Public/views/db_freshmen/AppliedAdmittedEnrolled?:embed=y&:isGuestRedirectFromVizportal=y |
| Sheet | `Applied, Admitted, Enrolled` |
| Publisher | The University of North Carolina System — UNC Insight |
| Fetched | 2026-08-19 |

### Exact filter values used

| Filter | Value |
|---|---|
| NC High School | `Gaston Day School` |
| Institution | one of the six below, selected one at a time |
| Recent High School Graduate | `Yes` **and** `No` (the dashboard default — left as-is) |
| General / Specific High School Type | left at `(All)` |
| NC High School District | auto-set to `Not Applicable` by the school selection |
| Terms | Fall 2016 – Fall 2025 (every term the dashboard publishes for the pair) |

The district/type side effects are Tableau relational filtering, documented in the
method file §3.3 — they are not a mis-selection and were not "fixed".

## Per-term counts

Full counts, not just the derived rate: **a rate without its denominator is not
reconstructable.** A `—` cell is what the dashboard left blank — read that as
**not published**, never as zero.

### 1. UNC-Chapel Hill

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 21 | 12 | 10 | 11 | 11 | 14 | 18 | 13 | 15 | 11 |
| Admitted | 9 | 9 | 4 | 7 | 5 | 2 | 5 | 6 | 5 | 3 |
| Enrolled | 3 | 2 | 3 | 5 | 1 | 1 | 4 | 3 | 1 | 2 |
| Admit Rate | 42.9% | 75.0% | 40.0% | 63.6% | 45.5% | 14.3% | 27.8% | 46.2% | 33.3% | 27.3% |

### 2. NC State University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 12 | 18 | 12 | 17 | 15 | 16 | 17 | 15 | 13 | 15 |
| Admitted | 8 | 17 | 7 | 13 | 8 | 9 | 8 | 9 | 5 | 7 |
| Enrolled | 4 | 6 | 3 | 4 | 4 | 5 | 3 | 5 | 2 | 4 |
| Admit Rate | 66.7% | 94.4% | 58.3% | 76.5% | 53.3% | 56.3% | 47.1% | 60.0% | 38.5% | 46.7% |

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 3 | 3 | 2 | 5 | 7 | 5 | 7 | 11 | 5 | 7 |
| Admitted | 2 | 3 | 2 | 4 | 4 | 5 | 7 | 9 | 4 | 6 |
| Enrolled | — | 2 | 1 | — | 2 | 1 | 1 | 4 | 1 | 1 |
| Admit Rate | 66.7% | 100.0% | 100.0% | 80.0% | 57.1% | 100.0% | 100.0% | 81.8% | 80.0% | 85.7% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 4. East Carolina University

| | F2016 | F2017 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|
| Applied | 4 | 3 | 3 | 5 | 5 | 3 | 3 | 2 | 4 |
| Admitted | 4 | 3 | 3 | 5 | 5 | 3 | 3 | 2 | 4 |
| Enrolled | 1 | — | — | — | 1 | — | 2 | 1 | — |
| Admit Rate | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

> **Only 9 terms.** The dashboard publishes no column at all for Fall 2018 for this pair — the axis skips it. Not a scrape gap.

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 3 | 1 | 1 | 5 | 3 | 4 | 6 | 4 | 9 | 8 |
| Admitted | 3 | — | 1 | 4 | 3 | 1 | 3 | 3 | 8 | 6 |
| Enrolled | — | — | — | — | 1 | — | 2 | — | 3 | 1 |
| Admit Rate | 100.0% | 0.0% | 100.0% | 80.0% | 100.0% | 25.0% | 50.0% | 75.0% | 88.9% | 75.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 6. UNC Greensboro

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 4 | 2 | 5 | 7 | 4 | 1 | 2 | 4 | 1 | 4 |
| Admitted | 4 | 2 | 5 | 6 | 4 | 1 | 2 | 4 | 1 | 4 |
| Enrolled | — | — | 4 | 1 | 2 | — | — | — | — | — |
| Admit Rate | 100.0% | 100.0% | 100.0% | 85.7% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 11 | 3 | 27.3% | 29.6% | 21 of 71 |
| 2 | NC State University | Fall 2025 | 15 | 7 | 46.7% | 50.0% | 38 of 76 |
| 3 | UNC Charlotte | Fall 2025 | 7 | 6 | 85.7% | 88.6% | 31 of 35 |
| 4 | East Carolina University | Fall 2025 | 4 | 4 | 100.0% | 100.0% | 17 of 17 |
| 5 | UNC Wilmington | Fall 2025 | 8 | 6 | 75.0% | 67.7% | 21 of 31 |
| 6 | UNC Greensboro | Fall 2025 | 4 | 4 | 100.0% | 100.0% | 12 of 12 |

**Combined across the six campuses, five most recent terms: 140 admitted of 242 applied = 57.9%.**

## Interpretation cautions

- **This is not the university's admit rate, and not the school's selectivity.** It is
  the rate at which that university admitted *this high school's* applicants — a joint
  property of the pair. Label it that way wherever it is surfaced.
- **Carry the denominator.** Several cells here are single-digit; a 100% rate off 2
  applicants is not comparable to one off 200, and a bare percentage from a
  single-digit base must not be published.
- **UNC-system campuses only.** This says nothing about private or out-of-state
  destinations, so it complements a matriculation list and never replaces one.

## Sanity checks run

`Admitted ≤ Applied` and `Enrolled ≤ Admitted` in every published term; every displayed
Admit Rate re-derived from that term's own Applied/Admitted to within rounding. The
scrape was smoke-tested first against the method file's reference table (Cannon School
× UNC-Chapel Hill: Fall 2016 = 44 applied / 26 admitted / 13 enrolled / 59.1%; Fall
2025 = 63 applied / 20 admitted / 31.7%), which reproduced exactly.
