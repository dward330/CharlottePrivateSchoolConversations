# Charlotte Catholic High School — College Support — UNC System Admissions

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
| NC High School | `Charlotte Catholic High School` |
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
| Applied | 74 | 97 | 84 | 89 | 70 | 96 | 89 | 81 | 90 | 103 |
| Admitted | 44 | 53 | 33 | 39 | 26 | 29 | 31 | 30 | 26 | 24 |
| Enrolled | 25 | 35 | 20 | 28 | 12 | 11 | 17 | 22 | 19 | 16 |
| Admit Rate | 59.5% | 54.6% | 39.3% | 43.8% | 37.1% | 30.2% | 34.8% | 37.0% | 28.9% | 23.3% |

### 2. NC State University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 109 | 141 | 119 | 124 | 140 | 134 | 130 | 112 | 115 | 141 |
| Admitted | 59 | 98 | 60 | 69 | 67 | 51 | 46 | 23 | 51 | 39 |
| Enrolled | 26 | 31 | 25 | 25 | 25 | 23 | 17 | 3 | 18 | 14 |
| Admit Rate | 54.1% | 69.5% | 50.4% | 55.6% | 47.9% | 38.1% | 35.4% | 20.5% | 44.3% | 27.7% |

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 95 | 95 | 104 | 90 | 96 | 87 | 77 | 61 | 39 | 65 |
| Admitted | 76 | 77 | 72 | 62 | 72 | 79 | 69 | 55 | 33 | 57 |
| Enrolled | 15 | 21 | 22 | 6 | 19 | 18 | 17 | 8 | 5 | 15 |
| Admit Rate | 80.0% | 81.1% | 69.2% | 68.9% | 75.0% | 90.8% | 89.6% | 90.2% | 84.6% | 87.7% |

### 4. East Carolina University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 66 | 61 | 55 | 44 | 53 | 50 | 47 | 39 | 46 | 48 |
| Admitted | 60 | 57 | 49 | 36 | 48 | 50 | 46 | 33 | 45 | 47 |
| Enrolled | 19 | 22 | 12 | 11 | 12 | 9 | 10 | 2 | 6 | 6 |
| Admit Rate | 90.9% | 93.4% | 89.1% | 81.8% | 90.6% | 100.0% | 97.9% | 84.6% | 97.8% | 97.9% |

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 72 | 77 | 73 | 71 | 82 | 85 | 70 | 77 | 60 | 91 |
| Admitted | 51 | 53 | 42 | 45 | 60 | 49 | 48 | 53 | 38 | 62 |
| Enrolled | 17 | 11 | 15 | 13 | 19 | 13 | 9 | 6 | 5 | 15 |
| Admit Rate | 70.8% | 68.8% | 57.5% | 63.4% | 73.2% | 57.6% | 68.6% | 68.8% | 63.3% | 68.1% |

### 6. UNC Greensboro

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 15 | 16 | 17 | 11 | 14 | 15 | 16 | 14 | 5 | 17 |
| Admitted | 12 | 15 | 14 | 9 | 12 | 15 | 15 | 11 | 4 | 16 |
| Enrolled | — | 5 | 1 | — | 1 | 3 | 2 | 2 | 3 | 2 |
| Admit Rate | 80.0% | 93.8% | 82.4% | 81.8% | 85.7% | 100.0% | 93.8% | 78.6% | 80.0% | 94.1% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 103 | 24 | 23.3% | 30.5% | 140 of 459 |
| 2 | NC State University | Fall 2025 | 141 | 39 | 27.7% | 33.2% | 210 of 632 |
| 3 | UNC Charlotte | Fall 2025 | 65 | 57 | 87.7% | 89.1% | 293 of 329 |
| 4 | East Carolina University | Fall 2025 | 48 | 47 | 97.9% | 96.1% | 221 of 230 |
| 5 | UNC Wilmington | Fall 2025 | 91 | 62 | 68.1% | 65.3% | 250 of 383 |
| 6 | UNC Greensboro | Fall 2025 | 17 | 16 | 94.1% | 91.0% | 61 of 67 |

**Combined across the six campuses, five most recent terms: 1175 admitted of 2100 applied = 56.0%.**

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
