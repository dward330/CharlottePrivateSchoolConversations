# Carmel Christian School — College Support — 2024–25 High School Profile

## Provenance

- **Who/when/how:** Fetched 2026-08-24 by Claude during the `citeurls` plan, which set out
  to backfill two citations that had been left URL-less and flagged `TO VERIFY`.
- **Why this file exists:** the prior research pass recorded that "the current-year School
  Profile PDF 404s under every filename variant and Wayback was rate-limited during this
  pass," and fell back to a Google cache of the **2022–23** profile (Class of 2022). That
  conclusion was **wrong** — the current profile is published and returns HTTP 200. It was
  located via a Wayback CDX listing of the domain, which surfaced the live filename.
- **Method note for future passes:** the school rotates the profile filename each year and
  serves it from two interchangeable paths. Do not conclude "not published" from a filename
  guess; list the domain's archived URLs (`web.archive.org/cdx/search/cdx?url=<domain>*`)
  and test the candidates.

## Source URLs

| ID | URL | Status 2026-08-24 |
|---|---|---|
| S1 | https://carmelchristian.org/pdf/High_School_Profile_24-25.pdf | **200**, application/pdf, 157,525 bytes — LIVE, canonical |
| S2 | https://www.carmelchristian.org/pdf/2024-2025/High%20School%20Profile%2024-25.pdf | 200 — same document, alternate path (byte-identical size) |
| S3 | http://web.archive.org/web/20230702021602/https://carmelchristian.org/pdf/2022-23_Carmel_Christian_High_School_Profile__.pdf | 200 — archived **2022–23** profile, the superseded source |
| S4 | https://carmelchristian.org/pdf/2022-23_Carmel_Christian_High_School_Profile__.pdf | 404 — the 2022–23 original, no longer served |

S1 is the citation URL used in the app. S3 is retained because it is the provenance for the
figures the app carried until this pass.

## Hard data — Class of 2024 (from S1)

### Middle 50%

| Metric | Class of 2024 (S1) | Previously shown — Class of 2022 (S3) |
|---|---|---|
| SAT total (1600 scale) | **1060 – 1260** | 1030 – 1290 |
| ACT composite | **22 – 30** | 25 – 33 |
| GPA, weighted | **3.67 – 4.50** | 3.64 – 4.58 |
| GPA, unweighted | **3.29 – 3.81** | 3.35 – 3.86 |

Both profiles publish ranges only — no percentiles, no tester counts, no GPA quintiles.

### Class rank and GPA calculation (S1)

- "Carmel Christian School does not rank students." — unchanged from the 2022–23 profile.
- GPA is on a 4.0 scale; **honors courses receive one extra quality point and AP courses
  receive two extra quality points**. All CCS high-school courses count toward GPA;
  transfer credits are enclosed with the transcript but excluded from the CCS cumulative
  GPA.
- **Forward-looking change, new in this profile:** "Beginning with the Class of 2026,
  honors courses will receive an additional weight of 0.5 and AP courses will receive an
  additional weight of 1.0." The 2022–23 profile carried no such statement.

### Grading scale (S1)

| Grade | Standard (unweighted) | Honors (weighted) | AP (weighted) |
|---|---|---|---|
| A (90–100) | 4 | 5 | 6 |
| B (80–89) | 3 | 4 | 5 |
| C (70–79) | 2 | 3 | 4 |
| D (60–69) | 1 | 1 | 1 |
| F (59 and below) | 0 | 0 | 0 |

### Advanced Placement (S1)

- **142 students took AP exams in May 2024**, with **94 percent receiving at least one
  score of 3 or higher**.
- AP Scholars with Distinction: 21 · Scholars with Honors: 14 · Scholars: 28 ·
  **Total recognized: 66**
- AP Capstone Seminar & Research Certificate: 6 · AP Capstone Diploma: 7
- AP courses available: **14** (13 in the 2022–23 profile).

> **Denominator caution.** The 94% here is *students receiving at least one score of 3+*,
> out of 142 exam-takers. It is **not** the same measure as the AP School Honor Roll's
> "73% of seniors scored 3+", which is a share of the senior class. The existing card
> already carries a flag warning against conflating these two; that flag remains correct.

### National Merit (S1)

- National Merit Winner: 1 (2023)
- National Merit Scholar Finalist: 5 (2023)
- NMS Special Scholarship: 1 (2023)
- NMS Commended Students: 2 (2024)

> Note: this is a per-year snapshot, not the multi-year ledger a merit card charts. The
> existing card's decision to carry no merit ledger still holds.

### School facts (S1)

- CEEB School Code: **342527**
- Total student body: 1,133 · High school enrollment: 356 · Average class size: 18
- Founded 1993; high school established Fall 2010; semester calendar; one-to-one technology
- Graduation requirement: 26 total credits, plus mission experience, Impact Week
  completions and 20 service hours per year
- Accreditations: AdvancEd/Cognia, ACSI, NCAIS, NACCAP, Greater Charlotte Association of
  Christian Schools, Southern Baptist Association Christian Schools
- Address: 1145 Pineville-Matthews Road, Matthews, NC 28105 · 704.849.9723 #2

### Outcomes statement (S1)

"100% of our college-bound seniors have been accepted to colleges/universities of their
choice." — a school-reported claim, carrying no counts; not treated as an admit rate.

## What changed in the app as a result

Two citations in `src/data/collegeSupportPrograms/carmel-christian.ts` were URL-less and
flagged `TO VERIFY` against the cached 2022–23 profile. Both now cite S1, and the figures
were refreshed from Class of 2022 to **Class of 2024**. The `TO VERIFY` flags that existed
solely because the current profile could not be located were cleared; the separate AP
Honor Roll year flag is unrelated and remains.
