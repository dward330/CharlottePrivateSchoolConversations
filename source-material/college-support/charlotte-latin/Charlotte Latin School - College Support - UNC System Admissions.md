# Charlotte Latin School — College Support — UNC System Admissions

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
| NC High School | `Charlotte Latin School` |
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
| Applied | 54 | 61 | 69 | 51 | 42 | 48 | 60 | 57 | 66 | 69 |
| Admitted | 35 | 28 | 21 | 20 | 24 | 26 | 24 | 21 | 21 | 23 |
| Enrolled | 17 | 12 | 9 | 8 | 12 | 10 | 11 | 12 | 11 | 14 |
| Admit Rate | 64.8% | 45.9% | 30.4% | 39.2% | 57.1% | 54.2% | 40.0% | 36.8% | 31.8% | 33.3% |

### 2. NC State University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 30 | 31 | 32 | 35 | 29 | 41 | 47 | 46 | 50 | 67 |
| Admitted | 21 | 19 | 14 | 18 | 13 | 16 | 18 | 13 | 13 | 23 |
| Enrolled | 2 | 5 | — | 4 | 1 | 3 | 6 | 2 | 2 | 4 |
| Admit Rate | 70.0% | 61.3% | 43.8% | 51.4% | 44.8% | 39.0% | 38.3% | 28.3% | 26.0% | 34.3% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 6 | 12 | 9 | 11 | 10 | 5 | 10 | 9 | 15 | 14 |
| Admitted | 5 | 10 | 8 | 11 | 9 | 4 | 9 | 7 | 13 | 11 |
| Enrolled | 1 | 3 | 1 | 1 | 3 | — | — | — | 2 | 2 |
| Admit Rate | 83.3% | 83.3% | 88.9% | 100.0% | 90.0% | 80.0% | 90.0% | 77.8% | 86.7% | 78.6% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 4. East Carolina University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 1 | 3 | 4 | 8 | 9 | 9 | 7 | 9 | 8 | 10 |
| Admitted | 1 | 3 | 4 | 8 | 9 | 8 | 7 | 8 | 6 | 10 |
| Enrolled | — | 1 | 1 | 2 | — | 2 | 1 | 3 | — | 4 |
| Admit Rate | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 88.9% | 100.0% | 88.9% | 75.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 6 | 6 | 4 | 13 | 10 | 9 | 4 | 13 | 17 | 25 |
| Admitted | 5 | 3 | 1 | 12 | 7 | 8 | 1 | 6 | 7 | 13 |
| Enrolled | 1 | 1 | 1 | 2 | 3 | 1 | — | 2 | 2 | 1 |
| Admit Rate | 83.3% | 50.0% | 25.0% | 92.3% | 70.0% | 88.9% | 25.0% | 46.2% | 41.2% | 52.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 6. UNC Greensboro

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 2 | 2 | 1 | 4 | 4 | 3 | 3 | 4 | 1 | 8 |
| Admitted | 2 | 2 | 1 | 4 | 4 | 3 | 3 | 3 | 1 | 8 |
| Enrolled | — | 1 | — | — | — | — | — | — | 1 | — |
| Admit Rate | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 75.0% | 100.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 69 | 23 | 33.3% | 38.3% | 115 of 300 |
| 2 | NC State University | Fall 2025 | 67 | 23 | 34.3% | 33.1% | 83 of 251 |
| 3 | UNC Charlotte | Fall 2025 | 14 | 11 | 78.6% | 83.0% | 44 of 53 |
| 4 | East Carolina University | Fall 2025 | 10 | 10 | 100.0% | 90.7% | 39 of 43 |
| 5 | UNC Wilmington | Fall 2025 | 25 | 13 | 52.0% | 51.5% | 35 of 68 |
| 6 | UNC Greensboro | Fall 2025 | 8 | 8 | 100.0% | 94.7% | 18 of 19 |

**Combined across the six campuses, five most recent terms: 334 admitted of 734 applied = 45.5%.**

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
