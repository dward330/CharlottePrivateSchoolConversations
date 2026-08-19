# Charlotte Country Day School — College Support — UNC System Admissions

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
| NC High School | `Charlotte Country Day School` |
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
| Applied | 65 | 80 | 69 | 48 | 54 | 56 | 63 | 70 | 58 | 69 |
| Admitted | 37 | 38 | 22 | 23 | 36 | 34 | 23 | 27 | 15 | 20 |
| Enrolled | 26 | 18 | 11 | 11 | 17 | 16 | 11 | 19 | 10 | 9 |
| Admit Rate | 56.9% | 47.5% | 31.9% | 47.9% | 66.7% | 60.7% | 36.5% | 38.6% | 25.9% | 29.0% |

### 2. NC State University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 32 | 29 | 36 | 35 | 39 | 35 | 36 | 36 | 39 | 48 |
| Admitted | 17 | 16 | 14 | 16 | 20 | 10 | 13 | 14 | 10 | 11 |
| Enrolled | 3 | 6 | 4 | 3 | 2 | — | 2 | 3 | 2 | 2 |
| Admit Rate | 53.1% | 55.2% | 38.9% | 45.7% | 51.3% | 28.6% | 36.1% | 38.9% | 25.6% | 22.9% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 4 | 5 | 6 | 9 | 7 | 8 | 19 | 10 | 13 | 16 |
| Admitted | 4 | 4 | 5 | 4 | 6 | 5 | 13 | 10 | 12 | 14 |
| Enrolled | — | — | 2 | — | 1 | 2 | 3 | 1 | 5 | 3 |
| Admit Rate | 100.0% | 80.0% | 83.3% | 44.4% | 85.7% | 62.5% | 68.4% | 100.0% | 92.3% | 87.5% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 4. East Carolina University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 4 | 4 | 9 | 10 | 3 | 6 | 6 | 6 | 5 | 11 |
| Admitted | 4 | 4 | 8 | 8 | 3 | 6 | 4 | 6 | 5 | 11 |
| Enrolled | — | — | 3 | 2 | — | 1 | — | — | 1 | — |
| Admit Rate | 100.0% | 100.0% | 88.9% | 80.0% | 100.0% | 100.0% | 66.7% | 100.0% | 100.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 10 | 5 | 16 | 15 | 7 | 7 | 12 | 10 | 13 | 17 |
| Admitted | 9 | 4 | 9 | 5 | 7 | 3 | 6 | 5 | 11 | 10 |
| Enrolled | 2 | — | 2 | — | — | — | — | 1 | — | 1 |
| Admit Rate | 90.0% | 80.0% | 56.3% | 33.3% | 100.0% | 42.9% | 50.0% | 50.0% | 84.6% | 58.8% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 6. UNC Greensboro

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 3 | 5 | 4 | 6 | 1 | 2 | 8 | 6 | 5 | 12 |
| Admitted | 3 | 5 | 4 | 4 | 1 | 2 | 7 | 5 | 5 | 11 |
| Enrolled | 1 | — | — | — | 1 | — | 2 | — | — | 1 |
| Admit Rate | 100.0% | 100.0% | 100.0% | 66.7% | 100.0% | 100.0% | 87.5% | 83.3% | 100.0% | 91.7% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 69 | 20 | 29.0% | 37.7% | 119 of 316 |
| 2 | NC State University | Fall 2025 | 48 | 11 | 22.9% | 29.9% | 58 of 194 |
| 3 | UNC Charlotte | Fall 2025 | 16 | 14 | 87.5% | 81.8% | 54 of 66 |
| 4 | East Carolina University | Fall 2025 | 11 | 11 | 100.0% | 94.1% | 32 of 34 |
| 5 | UNC Wilmington | Fall 2025 | 17 | 10 | 58.8% | 59.3% | 35 of 59 |
| 6 | UNC Greensboro | Fall 2025 | 12 | 11 | 91.7% | 90.9% | 30 of 33 |

**Combined across the six campuses, five most recent terms: 328 admitted of 702 applied = 46.7%.**

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
