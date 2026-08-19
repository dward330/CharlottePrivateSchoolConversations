# Davidson Day School — College Support — UNC System Admissions

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
| NC High School | `Davidson Day School` |
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
| Applied | 14 | 21 | 18 | 9 | 20 | 16 | 18 | 9 | 22 | 25 |
| Admitted | 10 | 9 | 10 | 5 | 10 | 10 | 8 | 3 | 9 | 10 |
| Enrolled | 3 | 6 | 6 | 2 | 5 | 4 | 5 | 1 | 4 | 5 |
| Admit Rate | 71.4% | 42.9% | 55.6% | 55.6% | 50.0% | 62.5% | 44.4% | 33.3% | 40.9% | 40.0% |

### 2. NC State University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 12 | 14 | 16 | 7 | 12 | 16 | 20 | 10 | 25 | 21 |
| Admitted | 9 | 9 | 10 | 4 | 6 | 7 | 7 | 3 | 13 | 9 |
| Enrolled | 1 | 3 | 2 | 1 | 3 | — | 3 | 1 | 2 | 3 |
| Admit Rate | 75.0% | 64.3% | 62.5% | 57.1% | 50.0% | 43.8% | 35.0% | 30.0% | 52.0% | 42.9% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 17 | 10 | 3 | 5 | 10 | 11 | 6 | 5 | 7 | 7 |
| Admitted | 13 | 9 | 2 | 2 | 10 | 8 | 5 | 5 | 7 | 6 |
| Enrolled | 3 | 2 | — | — | 3 | 2 | 3 | — | — | — |
| Admit Rate | 76.5% | 90.0% | 66.7% | 40.0% | 100.0% | 72.7% | 83.3% | 100.0% | 100.0% | 85.7% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 4. East Carolina University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 7 | 2 | 3 | 2 | 3 | 10 | 6 | 3 | 3 | 6 |
| Admitted | 7 | 2 | 3 | — | 3 | 10 | 6 | 3 | 3 | 6 |
| Enrolled | — | — | 1 | — | — | — | — | — | — | — |
| Admit Rate | 100.0% | 100.0% | 100.0% | 0.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 14 | 7 | 7 | 8 | 12 | 9 | 6 | 7 | 11 | 9 |
| Admitted | 8 | 6 | 6 | 6 | 10 | 5 | 4 | 5 | 8 | 7 |
| Enrolled | 1 | 2 | 1 | — | 1 | 1 | 1 | — | 1 | 1 |
| Admit Rate | 57.1% | 85.7% | 85.7% | 75.0% | 83.3% | 55.6% | 66.7% | 71.4% | 72.7% | 77.8% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 6. UNC Greensboro

| | F2016 | F2017 | F2020 | F2021 | F2022 | F2025 |
|---|---|---|---|---|---|---|
| Applied | 1 | 3 | 1 | 2 | 1 | 3 |
| Admitted | — | 3 | 1 | 2 | 1 | 3 |
| Enrolled | — | 2 | 1 | — | — | — |
| Admit Rate | 0.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

> **Only 6 terms.** The dashboard publishes no column at all for Fall 2018, Fall 2019, Fall 2023, Fall 2024 for this pair — the axis skips it. Not a scrape gap.

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 25 | 10 | 40.0% | 44.4% | 40 of 90 |
| 2 | NC State University | Fall 2025 | 21 | 9 | 42.9% | 42.4% | 39 of 92 |
| 3 | UNC Charlotte | Fall 2025 | 7 | 6 | 85.7% | 86.1% | 31 of 36 |
| 4 | East Carolina University | Fall 2025 | 6 | 6 | 100.0% | 100.0% | 28 of 28 |
| 5 | UNC Wilmington | Fall 2025 | 9 | 7 | 77.8% | 69.0% | 29 of 42 |
| 6 | UNC Greensboro | Fall 2025 | 3 | 3 | 100.0% | 100.0% | 10 of 10 |

**Combined across the six campuses, five most recent terms: 177 admitted of 298 applied = 59.4%.**

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
