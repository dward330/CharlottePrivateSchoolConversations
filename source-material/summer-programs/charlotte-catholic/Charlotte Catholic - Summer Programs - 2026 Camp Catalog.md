# Charlotte Catholic High School — Summer Programs (2026 Camp Catalog)

**Provenance**

- **Compiled by:** Claude Code deep research pass (`/implement add-charlotte-catholic`).
- **Date compiled:** 2026-08-18
- **Method:** School summer-camps page and the baseball camps/clinics page fetched
  directly. Figures are quoted only where the school publishes them; where a price or a
  detail is not on the page it is recorded as not published rather than filled from a
  secondary source.
- **School:** Charlotte Catholic High School, grades 9–12.

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://www.charlottecatholic.org/community/students/summer-camps | Summer camps landing page — Cougar Basketball Camp; Notre Dame Vision; Mayor's Youth Employment Program |
| S2 | https://www.charlottecatholic.org/athletics/all-sports/baseball/camps-clinics | Eddie Hull Baseball Camp — sessions, ages, daily times, location |
| S3 | https://resources.finalsite.net/images/v1709839178/charlottecatholicorg/iyu7apngmnkk7rl5an1s/2024CougarCampFlyer.pdf | Cougar Football Camp flyer — ⚠️ **a 2024 artifact**, see the caveat |
| S4 | https://resources.finalsite.net/images/v1753815058/charlottecatholicorg/f73esbbzrom3skvql13w/25-26StudentHandbookFinal.pdf | Student Handbook — confirms there is no in-house summer school or credit recovery |

## ⚠️ Read this before interpreting any age or grade figure

**These are youth camps that CCHS athletics hosts for the surrounding community — they are
not summer programming for CCHS's own 9–12 students.** The camps serve **rising 2nd
through 9th graders and children aged 6–13**, which on a 9–12 high school's page would
otherwise read as a data error. Every age range below describes the *campers CCHS hosts*,
who are mostly younger than CCHS's own student body. The app states this explicitly in its
Summer Programs prose and in the per-cell provenance for the `summer-ages` row.

## ⚠️ MACS Summer Camp is OUT OF SCOPE and is deliberately not recorded here

Mecklenburg Area Catholic Schools runs an attractive full-day summer camp — **$325/week,
8am–5pm, 7 weeks** — but it serves **age 5 through rising 6th grade at St. Matthew and St.
Patrick**, not at Charlotte Catholic. Attributing it to CCHS would put a wrap-around
childcare program on a high school's page that the high school does not run. It is
excluded, and this is why the `summer-care-span` row is a deliberate null.

## The camps

| Camp | Dates | Ages / grades | Daily times | Cost |
| --- | --- | --- | --- | --- |
| **Cougar Basketball Camp** (girls) | June 8–11 | Rising grades **2–8** | Rising 2–5: **9:00 AM–12:00 PM**; rising 6–8: **1:00 PM–4:00 PM** | Not published |
| **Eddie Hull Baseball Camp** | **June 2–5, June 9–12, July 21–24** (the sessions the page currently lists) | Ages **6–13** | **9:00 AM–1:00 PM** (check-in 8:45 AM) | Not published on the school page — registration and fees are handled off-site at eddiehullbaseballcamps.com |
| **Cougar Football Camp** | July (see caveat) | Rising **3rd–9th** | 8:30–11:30 AM | **$160** per the flyer |
| **Just4Kicks Soccer** | Not published | Not published | Not published | Not published |

**Eddie Hull Baseball Camp** is held at **Freedom Park (Dilworth LL Ballfields)**, not on
the CCHS campus. Instruction covers dynamic warm-ups, baserunning, offensive and defensive
station work and age-grouped gameplay; campers bring their own lunch.

### ⚠️ The football camp flyer is a 2024 artifact

The Cougar Football Camp flyer (S3) is a **2024** document that has not been refreshed on
the school's site. Its **$160** price and its grade range are recorded here as *what the
school currently publishes*, with the staleness noted — not as a confirmed 2026 price.

### Session dates carry a year caveat

The baseball camps page (S2) currently lists its sessions under a **2025** heading. They
are recorded verbatim as published rather than rolled forward to 2026, because a re-typed
date would assert a schedule the school has not announced.

## Non-camp summer programs

| Program | Detail |
| --- | --- |
| **Notre Dame Vision 2026** | A week-long residential faith-formation experience at the University of Notre Dame, for high-school students |
| **Mayor's Youth Employment Program (MYEP)** | **June 22 – July 31, 2026** (6 weeks); ages **16–18**; up to **150** total work hours; pay **starting at $13/hour**; onsite, remote and hybrid placements |

MYEP is a City of Charlotte program that CCHS surfaces to its students, not a CCHS program.
Notre Dame Vision is likewise hosted by Notre Dame. **Neither is a CCHS-run camp**, so
neither is counted in the camp total.

## No in-house summer school or credit recovery

The Student Handbook (S4) states **twice** that a student who fails a course takes that
course **"at their expense over the summer"** — i.e. externally. CCHS runs no summer school,
no credit-recovery program and no enrichment academic term of its own.

## Deliberate nulls established by this record

- **`summer-care-span`** — every CCHS camp is a **half-day block** (3–4 hours). There is no
  wrap-around or full-day care. The MACS 8am–5pm camp is a different school's program (see
  above) and is not attributed here.
- **Camp pricing is only partly published** — the basketball camp publishes no fee, and the
  baseball camp's fees live on a third-party registration site.
