# Carmel Christian School — College Support — UNC System Admissions

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
| NC High School | `Carmel Christian` |
| ↳ note | The dashboard lists this school as **`Carmel Christian`**, not "Carmel Christian School". Exact-match required. |
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
| Applied | 7 | 11 | 14 | 8 | 20 | 16 | 30 | 29 | 22 | 16 |
| Admitted | 5 | 6 | 3 | 4 | 8 | 7 | 9 | 8 | 9 | 4 |
| Enrolled | 3 | 5 | 2 | 3 | 6 | 4 | 6 | 5 | 7 | 0 |
| Admit Rate | 71.4% | 54.5% | 21.4% | 50.0% | 40.0% | 43.8% | 30.0% | 27.6% | 40.9% | 25.0% |

### 2. NC State University

| | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|
| Applied | 2 | 27 | 41 | 30 | 26 |
| Admitted | 2 | 12 | 10 | 9 | 8 |
| Enrolled | 2 | 4 | 4 | 4 | 2 |
| Admit Rate | 100.0% | 44.4% | 24.4% | 30.0% | 30.8% |

> **Only 5 terms.** The dashboard publishes no column at all for Fall 2016, Fall 2017, Fall 2018, Fall 2019, Fall 2020 for this pair — the axis skips it. Not a scrape gap.

### 3. UNC Charlotte

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 20 | 13 | 25 | 21 | 28 | 23 | 26 | 30 | 21 | 30 |
| Admitted | 9 | 10 | 21 | 16 | 23 | 21 | 23 | 23 | 16 | 17 |
| Enrolled | 1 | 2 | 4 | 5 | 6 | 3 | 7 | 7 | 4 | 5 |
| Admit Rate | 45.0% | 76.9% | 84.0% | 76.2% | 82.1% | 91.3% | 88.5% | 76.7% | 76.2% | 56.7% |

### 4. East Carolina University

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 2 | 11 | 6 | 9 | 10 | 8 | 13 | 10 | 20 | 20 |
| Admitted | 2 | 8 | 6 | 8 | 10 | 8 | 12 | 9 | 16 | 20 |
| Enrolled | 2 | 1 | 1 | — | 2 | 2 | 1 | 1 | 3 | 3 |
| Admit Rate | 100.0% | 72.7% | 100.0% | 88.9% | 100.0% | 100.0% | 92.3% | 90.0% | 80.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

### 5. UNC Wilmington

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 6 | 8 | 18 | 21 | 19 | 13 | 20 | 27 | 26 | 31 |
| Admitted | 5 | 3 | 8 | 14 | 14 | 6 | 16 | 17 | 24 | 19 |
| Enrolled | 1 | 2 | 3 | 9 | 2 | 3 | 5 | 3 | 7 | 4 |
| Admit Rate | 83.3% | 37.5% | 44.4% | 66.7% | 73.7% | 46.2% | 80.0% | 63.0% | 92.3% | 61.3% |

### 6. UNC Greensboro

| | F2016 | F2017 | F2018 | F2019 | F2020 | F2021 | F2022 | F2023 | F2024 | F2025 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 1 | 1 | 7 | 14 | 5 | 3 | 6 | 5 | 4 | 9 |
| Admitted | 1 | 1 | 6 | 13 | 5 | 3 | 4 | 3 | 2 | 9 |
| Enrolled | — | — | 3 | 2 | 1 | — | — | — | — | 3 |
| Admit Rate | 100.0% | 100.0% | 85.7% | 92.9% | 100.0% | 100.0% | 66.7% | 60.0% | 50.0% | 100.0% |

> One or more cells are blank on the dashboard and are recorded as `—` = **not published**. They are excluded from the pooled sums rather than counted as zero.

## Derived figures

The five-year figure is **pooled** — `sum(admitted) / sum(applied)` across the five
most recent terms — and deliberately **not** the mean of the five annual rates, which
would weight a 6-applicant year the same as a 60-applicant one.

| # | University | Latest term | Applied | Admitted | Admit rate | 5-yr pooled | 5-yr counts |
|---|---|---|---|---|---|---|---|
| 1 | UNC-Chapel Hill | Fall 2025 | 16 | 4 | 25.0% | 32.7% | 37 of 113 |
| 2 | NC State University | Fall 2025 | 26 | 8 | 30.8% | 32.5% | 41 of 126 |
| 3 | UNC Charlotte | Fall 2025 | 30 | 17 | 56.7% | 76.9% | 100 of 130 |
| 4 | East Carolina University | Fall 2025 | 20 | 20 | 100.0% | 91.5% | 65 of 71 |
| 5 | UNC Wilmington | Fall 2025 | 31 | 19 | 61.3% | 70.1% | 82 of 117 |
| 6 | UNC Greensboro | Fall 2025 | 9 | 9 | 100.0% | 77.8% | 21 of 27 |

**Combined across the six campuses, five most recent terms: 346 admitted of 584 applied = 59.2%.**

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
