# Covenant Day School — College Support — UNC System Admissions

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
| NC High School | `Covenant Day School` |
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
| Applied | 24 | 28 | 36 | 33 | 31 | 25 | 25 | 26 | 27 | 33 |
| Admitted | 14 | 12 | 14 | 14 | 9 | 14 | 10 | 8 | 6 | 9 |
| Enrolled | 7 | 6 | 12 | 12 | 3 | 6 | 5 | 5 | 5 | 6 |
| Admit Rate | 58.3% | 42.9% | 38.9% | 42.4% | 29.0% | 56.0% | 40.0% | 30.8% | 22.2% | 27.3% |

### 2. NC State University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 23 | 20 | 21 | 29 | 28 | 32 | 25 | 36 | 33 | 42 |
| Admitted | 11 | 10 | 11 | 17 | 16 | 17 | 15 | 23 | 21 | 22 |
| Enrolled | 3 | 4 | 3 | 7 | 8 | 3 | 6 | 10 | 8 | 8 |
| Admit Rate | 47.8% | 50.0% | 52.4% | 58.6% | 57.1% | 53.1% | 60.0% | 63.9% | 63.6% | 52.4% |

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 21 | 15 | 16 | 17 | 17 | 11 | 10 | 8 | 15 | 19 |
| Admitted | 17 | 13 | 12 | 11 | 15 | 10 | 10 | 7 | 13 | 17 |
| Enrolled | 4 | 4 | 4 | 1 | — | 1 | 1 | — | 5 | 6 |
| Admit Rate | 81.0% | 86.7% | 75.0% | 64.7% | 88.2% | 90.9% | 100.0% | 87.5% | 86.7% | 89.5% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 4. East Carolina University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 7 | 1 | 3 | 6 | 5 | 7 | 8 | 1 | 15 | 7 |
| Admitted | 5 | 1 | 2 | 4 | 4 | 6 | 6 | 1 | 13 | 6 |
| Enrolled | 2 | — | — | — | — | 1 | — | 1 | 1 | — |
| Admit Rate | 71.4% | 100.0% | 66.7% | 66.7% | 80.0% | 85.7% | 75.0% | 100.0% | 86.7% | 85.7% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 9 | 13 | 17 | 19 | 19 | 12 | 11 | 13 | 22 | 22 |
| Admitted | 8 | 11 | 12 | 16 | 16 | 8 | 7 | 8 | 17 | 16 |
| Enrolled | 1 | — | 6 | 2 | 9 | 2 | — | 2 | 6 | 8 |
| Admit Rate | 88.9% | 84.6% | 70.6% | 84.2% | 84.2% | 66.7% | 63.6% | 61.5% | 77.3% | 72.7% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 6. UNC Greensboro

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|
| Applied | 3 | 8 | 5 | 2 | 1 | 3 | 2 | 3 | 5 |
| Admitted | 3 | 7 | 4 | 2 | 1 | 3 | 2 | 3 | 2 |
| Enrolled | 1 | 2 | — | — | — | — | — | — | — |
| Admit Rate | 100.0% | 87.5% | 80.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 40.0% |

> **Only 9 terms.** The dashboard publishes no column at all for Fall 2023 for this pair — the axis skips it. Not a scrape gap.

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 33 | 9 | 27.3% | 34.6% | 47 of 136 |
| 2 | NC State University | Fall 2025 | 42 | 22 | 52.4% | 58.3% | 98 of 168 |
| 3 | UNC Charlotte | Fall 2025 | 19 | 17 | 89.5% | 90.5% | 57 of 63 |
| 4 | East Carolina University | Fall 2025 | 7 | 6 | 85.7% | 84.2% | 32 of 38 |
| 5 | UNC Wilmington | Fall 2025 | 22 | 16 | 72.7% | 70.0% | 56 of 80 |
| 6 | UNC Greensboro | Fall 2025 | 5 | 2 | 40.0% | 78.6% | 11 of 14 |

**Combined across the six campuses, five most recent terms: 301 admitted of 499 applied = 60.3%.**

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
