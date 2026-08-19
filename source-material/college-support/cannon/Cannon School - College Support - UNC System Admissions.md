# Cannon School — College Support — UNC System Admissions

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
| NC High School | `Cannon School` |
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
| Applied | 44 | 45 | 48 | 42 | 40 | 47 | 55 | 59 | 49 | 63 |
| Admitted | 26 | 27 | 23 | 23 | 18 | 16 | 15 | 28 | 23 | 20 |
| Enrolled | 13 | 14 | 9 | 15 | 9 | 8 | 5 | 14 | 11 | 9 |
| Admit Rate | 59.1% | 60.0% | 47.9% | 54.8% | 45.0% | 34.0% | 27.3% | 47.5% | 46.9% | 31.7% |

### 2. NC State University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 29 | 27 | 29 | 48 | 38 | 45 | 40 | 59 | 40 | 52 |
| Admitted | 21 | 16 | 16 | 31 | 20 | 23 | 25 | 28 | 27 | 34 |
| Enrolled | 3 | 1 | 6 | 8 | 8 | 7 | 10 | 7 | 9 | 10 |
| Admit Rate | 72.4% | 59.3% | 55.2% | 64.6% | 52.6% | 51.1% | 62.5% | 47.5% | 67.5% | 65.4% |

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 14 | 13 | 21 | 25 | 16 | 17 | 21 | 17 | 19 | 25 |
| Admitted | 9 | 13 | 14 | 25 | 16 | 14 | 21 | 16 | 19 | 25 |
| Enrolled | 1 | 4 | 2 | 4 | 1 | 2 | 5 | 3 | 6 | 1 |
| Admit Rate | 64.3% | 100.0% | 66.7% | 100.0% | 100.0% | 82.4% | 100.0% | 94.1% | 100.0% | 100.0% |

### 4. East Carolina University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 10 | 9 | 6 | 13 | 11 | 20 | 14 | 7 | 9 | 12 |
| Admitted | 9 | 8 | 6 | 13 | 10 | 19 | 13 | 7 | 9 | 12 |
| Enrolled | 1 | 2 | — | 1 | 2 | 4 | — | 1 | 1 | 2 |
| Admit Rate | 90.0% | 88.9% | 100.0% | 100.0% | 90.9% | 95.0% | 92.9% | 100.0% | 100.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 13 | 17 | 21 | 21 | 12 | 22 | 25 | 16 | 14 | 17 |
| Admitted | 11 | 9 | 12 | 14 | 8 | 10 | 19 | 10 | 10 | 12 |
| Enrolled | 5 | — | 2 | 5 | 3 | 2 | 2 | 1 | — | 1 |
| Admit Rate | 84.6% | 52.9% | 57.1% | 66.7% | 66.7% | 45.5% | 76.0% | 62.5% | 71.4% | 70.6% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 6. UNC Greensboro

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 1 | 1 | 3 | 4 | 1 | 6 | 2 | 4 | 4 | 8 |
| Admitted | 1 | 1 | 2 | 4 | 1 | 6 | 2 | 4 | 4 | 8 |
| Enrolled | — | — | — | 1 | — | 1 | — | 1 | — | 1 |
| Admit Rate | 100.0% | 100.0% | 66.7% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 63 | 20 | 31.7% | 37.4% | 102 of 273 |
| 2 | NC State University | Fall 2025 | 52 | 34 | 65.4% | 58.1% | 137 of 236 |
| 3 | UNC Charlotte | Fall 2025 | 25 | 25 | 100.0% | 96.0% | 95 of 99 |
| 4 | East Carolina University | Fall 2025 | 12 | 12 | 100.0% | 96.8% | 60 of 62 |
| 5 | UNC Wilmington | Fall 2025 | 17 | 12 | 70.6% | 64.9% | 61 of 94 |
| 6 | UNC Greensboro | Fall 2025 | 8 | 8 | 100.0% | 100.0% | 24 of 24 |

**Combined across the six campuses, five most recent terms: 479 admitted of 788 applied = 60.8%.**

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
