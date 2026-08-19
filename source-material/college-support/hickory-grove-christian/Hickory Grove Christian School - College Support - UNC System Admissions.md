# Hickory Grove Christian School — College Support — UNC System Admissions

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
| NC High School | `Hickory Grove Christian School` |
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
| Applied | 12 | 15 | 11 | 15 | 6 | 8 | 13 | 9 | 5 | 10 |
| Admitted | 5 | 7 | 5 | 5 | 3 | 2 | 2 | 5 | 1 | 2 |
| Enrolled | 2 | 3 | 3 | 2 | 1 | 1 | 1 | — | — | 1 |
| Admit Rate | 41.7% | 46.7% | 45.5% | 33.3% | 50.0% | 25.0% | 15.4% | 55.6% | 20.0% | 20.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 2. NC State University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 17 | 18 | 24 | 20 | 19 | 18 | 18 | 12 | 9 | 19 |
| Admitted | 4 | 10 | 11 | 13 | 3 | 12 | 7 | 7 | 5 | 10 |
| Enrolled | — | 5 | 4 | 5 | 1 | 7 | 3 | 2 | 1 | 4 |
| Admit Rate | 23.5% | 55.6% | 45.8% | 65.0% | 15.8% | 66.7% | 38.9% | 58.3% | 55.6% | 52.6% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 33 | 53 | 41 | 44 | 25 | 19 | 21 | 24 | 18 | 25 |
| Admitted | 26 | 38 | 30 | 31 | 21 | 18 | 21 | 21 | 17 | 21 |
| Enrolled | 14 | 20 | 12 | 16 | 10 | 5 | 6 | 8 | 5 | 10 |
| Admit Rate | 78.8% | 71.7% | 73.2% | 70.5% | 84.0% | 94.7% | 100.0% | 87.5% | 94.4% | 84.0% |

### 4. East Carolina University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 8 | 6 | 10 | 10 | 7 | 12 | 9 | 8 | 2 | 5 |
| Admitted | 7 | 4 | 10 | 8 | 7 | 12 | 8 | 7 | 1 | 5 |
| Enrolled | 3 | — | 3 | 4 | — | 1 | 2 | 2 | — | 1 |
| Admit Rate | 87.5% | 66.7% | 100.0% | 80.0% | 100.0% | 100.0% | 88.9% | 87.5% | 50.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 6 | 7 | 7 | 6 | 3 | 13 | 12 | 8 | 5 | 8 |
| Admitted | 6 | 4 | 3 | 3 | 3 | 12 | 12 | 7 | 4 | 7 |
| Enrolled | 4 | 1 | — | — | 2 | 4 | 5 | 3 | — | 1 |
| Admit Rate | 100.0% | 57.1% | 42.9% | 50.0% | 100.0% | 92.3% | 100.0% | 87.5% | 80.0% | 87.5% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 6. UNC Greensboro

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 5 | 4 | 8 | 6 | 4 | 6 | 6 | 12 | 2 | 6 |
| Admitted | 5 | 4 | 6 | 5 | 3 | 6 | 5 | 11 | 2 | 6 |
| Enrolled | — | 3 | 1 | 1 | — | 5 | 1 | 3 | 1 | 2 |
| Admit Rate | 100.0% | 100.0% | 75.0% | 83.3% | 75.0% | 100.0% | 83.3% | 91.7% | 100.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 10 | 2 | 20.0% | 26.7% | 12 of 45 |
| 2 | NC State University | Fall 2025 | 19 | 10 | 52.6% | 53.9% | 41 of 76 |
| 3 | UNC Charlotte | Fall 2025 | 25 | 21 | 84.0% | 91.6% | 98 of 107 |
| 4 | East Carolina University | Fall 2025 | 5 | 5 | 100.0% | 91.7% | 33 of 36 |
| 5 | UNC Wilmington | Fall 2025 | 8 | 7 | 87.5% | 91.3% | 42 of 46 |
| 6 | UNC Greensboro | Fall 2025 | 6 | 6 | 100.0% | 93.8% | 30 of 32 |

**Combined across the six campuses, five most recent terms: 256 admitted of 342 applied = 74.9%.**

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
