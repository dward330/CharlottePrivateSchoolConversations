# Charlotte Christian School — College Support — UNC System Admissions

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
| NC High School | `Charlotte Christian School` |
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
| Applied | 35 | 28 | 42 | 24 | 34 | 28 | 24 | 42 | 31 | 38 |
| Admitted | 17 | 11 | 14 | 11 | 13 | 8 | 7 | 13 | 8 | 10 |
| Enrolled | 9 | 8 | 11 | 5 | 10 | 5 | 4 | 10 | 7 | 5 |
| Admit Rate | 48.6% | 39.3% | 33.3% | 45.8% | 38.2% | 28.6% | 29.2% | 31.0% | 25.8% | 26.3% |

### 2. NC State University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 32 | 25 | 40 | 27 | 33 | 42 | 44 | 48 | 41 | 31 |
| Admitted | 18 | 16 | 25 | 14 | 16 | 14 | 17 | 18 | 10 | 14 |
| Enrolled | 4 | 4 | 11 | 5 | 2 | 3 | 8 | 3 | 5 | 2 |
| Admit Rate | 56.3% | 64.0% | 62.5% | 51.9% | 48.5% | 33.3% | 38.6% | 37.5% | 24.4% | 45.2% |

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 19 | 18 | 20 | 26 | 18 | 34 | 18 | 32 | 24 | 11 |
| Admitted | 14 | 10 | 16 | 21 | 14 | 28 | 17 | 29 | 21 | 8 |
| Enrolled | 2 | 2 | 4 | 5 | 5 | 8 | 5 | 4 | 4 | 1 |
| Admit Rate | 73.7% | 55.6% | 80.0% | 80.8% | 77.8% | 82.4% | 94.4% | 90.6% | 87.5% | 72.7% |

### 4. East Carolina University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 19 | 10 | 11 | 15 | 18 | 26 | 19 | 10 | 16 | 9 |
| Admitted | 16 | 8 | 11 | 15 | 17 | 26 | 19 | 9 | 15 | 8 |
| Enrolled | 2 | 1 | 1 | 1 | 5 | 6 | 2 | 1 | 2 | 1 |
| Admit Rate | 84.2% | 80.0% | 100.0% | 100.0% | 94.4% | 100.0% | 100.0% | 90.0% | 93.8% | 88.9% |

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 12 | 18 | 15 | 17 | 20 | 29 | 30 | 13 | 22 | 15 |
| Admitted | 10 | 9 | 9 | 9 | 10 | 10 | 16 | 10 | 18 | 9 |
| Enrolled | 2 | 1 | — | 1 | 5 | 2 | 3 | — | 2 | 4 |
| Admit Rate | 83.3% | 50.0% | 60.0% | 52.9% | 50.0% | 34.5% | 53.3% | 76.9% | 81.8% | 60.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 6. UNC Greensboro

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 4 | 6 | 1 | 2 | 2 | 1 | 7 | 5 | 4 | 3 |
| Admitted | 4 | 5 | 1 | 2 | 2 | 1 | 7 | 5 | 4 | 3 |
| Enrolled | — | 1 | — | — | — | — | — | — | 1 | 1 |
| Admit Rate | 100.0% | 83.3% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 38 | 10 | 26.3% | 28.2% | 46 of 163 |
| 2 | NC State University | Fall 2025 | 31 | 14 | 45.2% | 35.4% | 73 of 206 |
| 3 | UNC Charlotte | Fall 2025 | 11 | 8 | 72.7% | 86.6% | 103 of 119 |
| 4 | East Carolina University | Fall 2025 | 9 | 8 | 88.9% | 96.3% | 77 of 80 |
| 5 | UNC Wilmington | Fall 2025 | 15 | 9 | 60.0% | 57.8% | 63 of 109 |
| 6 | UNC Greensboro | Fall 2025 | 3 | 3 | 100.0% | 100.0% | 20 of 20 |

**Combined across the six campuses, five most recent terms: 382 admitted of 697 applied = 54.8%.**

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
