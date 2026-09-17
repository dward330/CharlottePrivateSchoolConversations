# Trinity Episcopal School — High School Placement — Placement Outcomes

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** Direct `curl` fetch of the school's own pages and blog posts (raw HTML,
  text extracted locally — not via a summarizing fetcher), plus `pdftotext -layout` on
  the school's own School Profile PDFs. Every figure below was read from a retrieved
  first-party document. None are derived, interpolated or back-computed.
- **School:** Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202 — **K–8**,
  no high school. NCES `A0302431`, EIN `56-2059568`.

### ⚠️ Disambiguation — this is the CHARLOTTE K–8 school

Unrelated schools share this name, and one of them is a **high school**, which makes
careless sourcing especially dangerous for *this* topic:

- **Trinity Episcopal School, Richmond VA** (`trinityes.org`) — grades **8–12**
- Trinity Episcopal School, Austin TX (`austintrinity.org`)
- Trinity Episcopal School, New Orleans LA (`trinitynola.org`)

A contamination sweep over the full 1.64 MB retrieved corpus returned: `trinityes.org` 0
hits, `austintrinity` 0, `trinitynola` 0, `varsity` 0, `Advanced Placement` 0,
`9th Grade` 0, `12th Grade` 0. The corpus self-identifies as 750 E. 9th Street 99 times
and "K-8" 150 times.

## Source URLs

- 2026-27 School Profile (PDF) — https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf
- 2025-26 School Profile (PDF) — https://www.tescharlotte.org/editoruploads/files/25-26SchoolProfile.pdf
- Class of 2026 — https://www.tescharlotte.org/blog.cfm?threadid=48
- Class of 2025 — https://www.tescharlotte.org/blog.cfm?threadid=29
- Class of 2024 — https://www.tescharlotte.org/blog.cfm?threadid=16
- Class of 2023 — https://www.tescharlotte.org/blog.cfm?threadid=3
- The K-8 Advantage — https://www.tescharlotte.org/admission/k-8-advantage.cfm

> ⚠️ **The profile PDF URL is versioned by school year and the old URL 404s when a new
> edition ships.** The 24-25 edition and earlier are already gone, and only the 25-26 was
> ever archived. Both currently-live editions were captured in full on 2026-09-16; that
> capture is why the longitudinal rows below remain citable.

## The cumulative split — Trinity's headline placement figure

Verbatim from the **2026-27** profile:

> "Trinity graduated its first eighth-grade class in June 2004. A total of **1,060
> students have graduated over the past 23 years (Class of 2004-2026)**. Over the years,
> our alumni have chosen the following:
> **Independent Schools: 31% • Public Schools: 57% • Boarding Schools: 12%**"

**⚠️ This split is CUMULATIVE since 2004 — it is not a per-class rate.** The denominator
is 1,060 graduates across 23 classes. Label it that way wherever it appears.

### The three-point longitudinal series

| Window | Graduates | Independent | Public | Boarding | Source |
|---|--:|--:|--:|--:|---|
| 2004–2014 | 442 | 32% | 53% | 15% | Wayback snapshot of the old HTML profile page |
| 2004–2025 | 1,009 | 31% | 57% | 12% | 25-26 profile PDF |
| 2004–2026 | **1,060** | 31% | 57% | 12% | 26-27 profile PDF |

The 2025 → 2026 step adds 51 graduates (1,009 → 1,060), which matches the Class of 2026's
published size exactly — an internal consistency check that passes.

## Per-class series

Every row below is first-party and carries its denominator.

| Class | Graduates | "Lifers" | Lifer rate | Distinct high schools | Named list published? |
|---|--:|--:|--:|--:|---|
| 2023 | 49 | not published | — | 11 | **No** — count only |
| 2024 | 51 | 9 | 18% | 17 (+ schools in 3 other states) | **No** — count only |
| 2025 | 54 | 28 | 52% | 16 | **Yes** |
| 2026 | 51 | 30 | 59% | 10 | **Yes** |

**The count-only years are an editorial choice, not an absence.** Named lists appear in
2025 and 2026; 2023 and 2024 publish counts only, in otherwise-complete commencement
articles.

**⚠️ The lifer rate is volatile and not monotonic** — 18% → 52% → 59%. The 2024 figure
is an outlier against the two later years. Always carry the denominator; never present a
lifer trend as a smooth line.

### Verbatim sourcing for each class

**Class of 2026** (threadid=48, June 06, 2026, by Chris Miller):
> "'This moment felt like it was an eternity away,' said student Aleyah Whitaker, one of
> **30** Trinity 'lifers' in the graduating class. **Fifty-one** students received a
> graduation certificate…"

**Class of 2025** (threadid=29, June 05, 2025, by Chris Miller):
> "**Fifty-four** 8th Grade students, including **28** 'lifers' who have been at Trinity
> since Kindergarten, received certificates and a blessing from the school chaplains
> during the service."

This class "brought the number of alumni to over 1,000" in Trinity's 25th school year.
Commencement address by Lucy Lindvall TES '24.

**Class of 2024** (threadid=16, June 04, 2024):
> "**Fifty-one** students, including **9** Trinity 'lifers,' received their certificates…"
> "The Class of 2024 will continue on to **17 different high schools in the Charlotte
> area as well as schools in 3 other states**."

**Class of 2023** (threadid=3, June 05, 2023):
> "**Forty-nine** students marked the end of their time as a Trinity student and the
> beginning of their next chapters at **11 different schools**."

## ⚠️ Trinity publishes NO placement success rate — a confirmed, deliberate null

This is the single most important negative in this topic, and the sharpest difference
from a school whose placement data looks superficially similar.

Swept across **all 100 sitemap pages + all 51 blog posts + both profile PDFs**
(1,637,243 characters):

| Term | Hits |
|---|--:|
| "first choice" / "first-choice" | **0** |
| "top two" / "top-two" / "top choice" | **0** |
| "97%" | **0** |
| "% of graduates" / "% were accepted" / "accepted to" / "100% of" | **0** |
| "merit scholarship" / "merit aid" | **0** |

**Trinity's placement story is entirely named lists plus a cumulative 31/57/12 split —
never a success rate.** Do not manufacture a rate from the named lists, and do not
present the lifer rate as one: a lifer is a student who *stayed at Trinity K–8*, which
is a retention figure, not a placement outcome.

**No high school merit scholarship counts or dollars are published either.**

## ⚠️ Data-quality defects in the school's own sources — preserve, do not silently fix

1. **The Class of 2026 list prints "Myers Park High School" twice.** 11 bullets,
   **10 distinct schools**. Verified in the raw HTML `<li>` sequence, at positions **1
   and 7**. Items 2–11 are alphabetical and the leading entry breaks that order, so it
   reads as an editing slip where a first entry was never deleted. Publish as 10 distinct,
   noting the school's own duplicate — never print 11.
2. **"St Timothy's, Raleigh"** (Class of 2026) is published without a period after "St",
   and is a **different school** from the profile PDF's "St. Timothy's School, MD". Do not
   merge or normalize them.
3. **Board chair conflict between first-party sources:** the 26-27 profile names
   **Sommers Errington**; the June 2026 commencement post names **Eugene Brown** (the
   25-26 profile says Eugene J. Brown). One is stale; the profile is the later document.

## The K–8 thesis — the school's own framing of why placement happens at 8th grade

From `/admission/k-8-advantage.cfm`, section heading **"Choosing the Right High School -
At the Right Time"**:

> "Trinity's teachers and administrators have a unique perspective on students' growth
> and development… But in those nine years, parents and teachers garner invaluable insight
> about the child's interests, strengths, and learning styles. **The result — parents feel
> more confident about finding the high school that's best suited for their child at the
> end of 8th Grade rather than at the beginning of Kindergarten.**"

Other framing from the same page: "9 uninterrupted years on one campus"; "By the time they
begin high school, Trinity graduates have 9 years of leadership experience."

> ⚠️ The same page claims "Research consistently shows K-8 students outperform peers in
> traditional middle school models on measures of academic engagement, math and reading
> achievement, and high school readiness" — **with no citation of any kind**. Treat as the
> school's marketing claim, not as evidence, and do not repeat it as fact.
