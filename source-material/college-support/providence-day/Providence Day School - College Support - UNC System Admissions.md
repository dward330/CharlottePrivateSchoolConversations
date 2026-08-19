# Providence Day School — College Support — UNC System Admissions

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
| NC High School | `Providence Day School` |
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
| Applied | 72 | 64 | 70 | 79 | 58 | 71 | 70 | 82 | 93 | 103 |
| Admitted | 53 | 41 | 41 | 41 | 40 | 32 | 26 | 33 | 38 | 47 |
| Enrolled | 27 | 14 | 20 | 15 | 18 | 12 | 10 | 18 | 20 | 24 |
| Admit Rate | 73.6% | 64.1% | 58.6% | 51.9% | 69.0% | 45.1% | 37.1% | 40.2% | 40.9% | 45.6% |

### 2. NC State University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 47 | 34 | 47 | 54 | 60 | 48 | 58 | 58 | 69 | 71 |
| Admitted | 33 | 26 | 30 | 38 | 27 | 18 | 29 | 20 | 27 | 23 |
| Enrolled | 7 | 10 | 3 | 13 | 2 | 2 | 10 | 4 | 6 | — |
| Admit Rate | 70.2% | 76.5% | 63.8% | 70.4% | 45.0% | 37.5% | 50.0% | 34.5% | 39.1% | 32.4% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 11 | 9 | 8 | 15 | 16 | 6 | 15 | 12 | 14 | 20 |
| Admitted | 9 | 8 | 5 | 10 | 14 | 6 | 14 | 11 | 12 | 17 |
| Enrolled | — | 1 | — | 3 | 3 | 1 | 1 | 3 | 4 | 4 |
| Admit Rate | 81.8% | 88.9% | 62.5% | 66.7% | 87.5% | 100.0% | 93.3% | 91.7% | 85.7% | 85.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 4. East Carolina University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 4 | 7 | 5 | 14 | 8 | 24 | 16 | 7 | 7 | 13 |
| Admitted | 4 | 5 | 4 | 12 | 8 | 22 | 14 | 7 | 6 | 12 |
| Enrolled | 2 | 3 | 1 | 1 | 1 | 1 | 3 | 1 | — | — |
| Admit Rate | 100.0% | 71.4% | 80.0% | 85.7% | 100.0% | 91.7% | 87.5% | 100.0% | 85.7% | 92.3% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 16 | 9 | 10 | 17 | 13 | 12 | 20 | 14 | 18 | 19 |
| Admitted | 13 | 5 | 6 | 14 | 8 | 5 | 10 | 9 | 14 | 10 |
| Enrolled | 2 | 2 | 1 | 3 | 1 | 2 | 2 | 3 | 2 | 2 |
| Admit Rate | 81.3% | 55.6% | 60.0% | 82.4% | 61.5% | 41.7% | 50.0% | 64.3% | 77.8% | 52.6% |

### 6. UNC Greensboro

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 5 | 1 | 1 | 6 | 4 | 6 | 10 | 8 | 6 | 7 |
| Admitted | 5 | 1 | 1 | 6 | 4 | 6 | 10 | 8 | 6 | 7 |
| Enrolled | 4 | — | — | 1 | 1 | — | 2 | — | 1 | — |
| Admit Rate | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 103 | 47 | 45.6% | 42.0% | 176 of 419 |
| 2 | NC State University | Fall 2025 | 71 | 23 | 32.4% | 38.5% | 117 of 304 |
| 3 | UNC Charlotte | Fall 2025 | 20 | 17 | 85.0% | 89.6% | 60 of 67 |
| 4 | East Carolina University | Fall 2025 | 13 | 12 | 92.3% | 91.0% | 61 of 67 |
| 5 | UNC Wilmington | Fall 2025 | 19 | 10 | 52.6% | 57.8% | 48 of 83 |
| 6 | UNC Greensboro | Fall 2025 | 7 | 7 | 100.0% | 100.0% | 37 of 37 |

**Combined across the six campuses, five most recent terms: 499 admitted of 977 applied = 51.1%.**

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
