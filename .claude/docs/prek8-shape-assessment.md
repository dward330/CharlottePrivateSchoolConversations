# PreK–8 school shape — assessment & decisions (Charlotte Preparatory School)

**Status:** assessment complete, decisions made, NOTHING BUILT.
**Date:** 2026-09-15. **Written by:** `/add-school` run, carried across a session restart.
**Nothing was written to `source-material/`, no app code changed, no plan registered.**

This file exists because the assessment conversation ended before implementation, and a
fresh window cannot re-derive the decisions below. Read it with
[`prek8-placement-design-brief.md`](prek8-placement-design-brief.md), which holds the
design brief for the one new research area.

---

## 1. The candidate

**Charlotte Preparatory School** — charlotteprep.org · 212 Boyce Road, Charlotte NC 28211
· **PreK–8, no high school** · ~440 students · 8:1 ratio · avg class 16 · founded 1971
(as Charlotte Montessori; renamed 1998 when the Middle School was added) · Head of School
**Todd Ballaban** · proposed slug `charlotte-prep`.

Three divisions: **Montessori Early School** (ages 2–5), **Lower School** (K–4),
**Middle School** (5–8 — note 5th grade sits in MS).

> ⚠️ **Two identity traps.**
> 1. **`charlotteprepfl.com`** is a *Florida* school (Port Charlotte) that ranks alongside
>    the real school on nearly every query and has its own tuition/admissions/aid pages.
>    Every figure in these notes is from **charlotteprep.org**.
> 2. **Search will tell you the Head of School is "N. Blair Fisher." That is STALE** —
>    Fisher left for St. Paul's Episcopal (Mobile AL), then Fayetteville Academy. An
>    archived head-of-school search PDF on the site reinforces the stale name.

**Method note worth reusing:** the Finalsite `sitemap.xml` is a *sitemapindex* pointing at
a gzipped child at `/cache/sitemap.xml.gz`. Decompressing it yields the **complete 176-URL
inventory** (64 pages + 112 news stories). That is what turns "I didn't find a curriculum
guide" into "**the site provably has none**" — a confirmed null rather than a not-found.
The site's own `/search?s=` endpoint is **broken** (returns "no records found" for terms
that demonstrably exist) and must not be used as evidence of absence.

---

## 2. Why the standing `/add-school` bar does not apply

`npm run coverage:floor` derives the bar from the thinnest shipped school (Davidson Day,
17/30 Compare rows, 7/9 areas). **Charlotte Prep cannot reach it, and no research can
change that** — it is arithmetic from the schema, not a research finding.

**14 of the 30 Compare rows require Grades 9–12 to exist:**

| Area | Rows | Why impossible at PreK–8 |
|---|--:|---|
| Course Offerings | 3/3 | `us-courses`, `us-departments` are *Upper School* counts; `advanced-courses` is AP |
| Student Clubs | 1/3 | `us-organizations` is *Upper School* organizations |
| Sports | 2/2 | `p4-commits-2426`, `d1-commits-2426` — no recruited seniors |
| College Support | 8/8 | the whole area — 8th graders go to **high school**, not college |

Ceiling **16/30**; bar **17/30**. It misses by one row with every remaining row found.

**The sharpest way to see the mismatch:** Davidson Day fills **all 14** rows Charlotte Prep
structurally cannot, while its own 13 nulls sit in aid/arts/summer — areas where Prep could
score. The two schools fail in **non-overlapping** ways, which is exactly why a single
17/30 threshold does not transfer to a PreK–8 candidate.

`0 / 8` on the Ivy row would also be **actively misleading**: it reads as "zero Ivies from
this school's graduates," when the truth is there is no graduating class that applies to
college at all.

**Precedent that the schema already tolerates a missing division:** `charlotte-catholic` is
a **9–12-only** school in a K–12 roster, carrying 6 deliberate nulls including
`latest-pickup: null // no referent — CCHS is a 9-12 school with no lower school`
(`src/data/metricValues.ts`). Charlotte Prep is the mirror image — missing the top rather
than the bottom.

---

## 3. DECISIONS MADE (user-set, 2026-09-15)

These are settled. Do not re-litigate them.

### 3.1 College Support is not offered to schools with no high school

> *"college support should not be there for schools with no high school"*

**Mechanism — already automatic, no code needed.** `topicsForSchool()`
(`src/lib/manifest.ts:45`) filters to `docCount > 0`, and `SchoolDetail.tsx` maps over that
filtered list. Creating **no** `source-material/college-support/charlotte-prep/` folder
makes the area, its nav entry and its cards simply not exist. This is the standing
absence-not-emptiness rule and the live Davidson Day / Summer Programs precedent.

### 3.2 PreK–8 schools are excluded from Compare entirely

> *"I would not add schools with no high schools to the compare page or give them compare
> buttons on their school page cards"*

**This one DOES need code, in four places** (all read from the same `allSchools` source):

| Surface | File | Change |
|---|---|---|
| Compare picker pills | `src/pages/Compare.tsx:268` | filter `allSchools` |
| Compare columns | `src/pages/Compare.tsx:212` and `:237` | filter `wanted` / `cols` |
| Per-topic Compare button | `src/pages/SchoolDetail.tsx:869` | omit the link |
| **Self-injection** | `src/pages/SchoolDetail.tsx:502` | drop the `s === slug` clause for these schools |

`src/pages/Home.tsx:18` is **already safe** — it filters to `COMPARE_DEFAULT_SCHOOLS`.

> **The easy-to-miss one is the column filter.** Without it the rule holds in the UI but
> leaks through a hand-edited or shared `?schools=charlotte-prep` URL — the kind of gap
> that survives every checker because nobody clicks it.

**Consequences, all good:**
- The ≥17/30 Compare bar **stops applying** to PreK–8 schools. The gate becomes research-area coverage alone.
- `src/data/metricValues.ts` needs **no `charlotte-prep` entries at all** — not 14 nulls, not 30. **`npm run check:metrics` must be taught this**, or it will report 30 missing keys as oversights.
- **Stat tiles** on the school page read the same `VALUE_METRICS` (`SchoolDetail.tsx:900`), so a school absent from that layer shows none. **Admissions already solves this** — it renders its 4-tile band from the topic's own data (`AdmissionsStatBand`, `SchoolDetail.tsx:913`) specifically to avoid shipping a Compare surface the user had deferred (2026-08-30). Follow that pattern.

### 3.3 Summer Programs is OMITTED for Charlotte Prep

> *"omit this since it looks like program is discontinued"*

**Evidence it is discontinued, not merely undocumented:** the live 176-URL sitemap contains
**zero** summer/camp pages (7 grep hits are all false positives — "**camp**us master plan",
"**camp**us culture", and five news stories about summer *reading*). Every candidate URL
404s, *including the registration link the brochure itself prints*. Wayback CDX shows camp
pages existed for a decade (`/summer`, `/student-life/summer-camp`, `/community/summer-camp`,
`camp-prep` branding) and have **all** been removed. Newest artifact is the Summer 2025
brochure.

### 3.4 A High School Placement research area WILL be added

> *"we can add that research area for schools that go up to 8th grade"*

PreK–8 only; renders nowhere else (same `docCount > 0` mechanism). See the design brief.

---

## 4. The PreK–8 shape: 8 research areas

**9 existing − College Support − Summer Programs + High School Placement.**

Percentages are **estimates from a scoped sweep** (`~`), counts beside them because
denominators are small and uneven.

| # | Research area | Cards | Coverage | Verdict |
|---|---|--:|--:|---|
| 1 | **Admissions** | 2/2 | **~100%** | include — verified vs. CAIS brochure |
| 6 | **After School** | 8/8 | **~100%** | include — verified firsthand |
| 8 | **High School Placement** *(new)* | ~4/5 | **~80%** | include — see §5 caveat |
| 7 | **Financial Aid & Tuition** | 2/3 | **~67%** | include |
| 4 | **The Arts** | 7/11 | **~64%** | include |
| 3 | **Student Clubs** | 5/8 | **~63%** | include |
| 5 | **Sports** | 9/19 | **~47%** | include — **see the correction below** |
| 2 | **Course Offerings** | 1/2 | **~50%** | include, flagged |

### Sports ~47% is a category error, not a weak area

Six of the twelve core Sports cards — `matriculation`, `power-4`, `pros`, `recruiting`,
`nil`, `national-profile` — are 9–12 constructs that exist for **no** middle school.
Scored on what a PreK–8 school could possibly hold, Sports is **9 of 13, ~69%**.

**The Sports card registry should drop those six cards for PreK–8 schools**, the same way
College Support drops out entirely. The only genuine gaps are **no named athletic facility
anywhere on the site** (real finding — even the campus master plan names none) and no
sports medicine.

### Course Offerings ~50% is real but the number is near-meaningless

It quantizes to 0/25/50/75/100. **Substance: no curriculum guide exists anywhere on the
176-URL site.** The six "MS departments" are **inferred from staff job titles, not
published** — flag as `estimate`, never state as fact.

---

## 5. Caveats that must travel with these numbers

- **High School Placement's ~80% is the softest figure here.** The other seven are scored
  against cards that exist; this one is scored against cards not yet designed. It will move.
- **Carry denominators on small cells.** 97% is **40 of 41 graduates**; the 10-year 96% has
  **no published denominator**. Neither is an admit rate — both are *acceptance to
  top-two-choice* rates.
- **The roster's fill rates reflect research effort already spent**, so the test is "could
  plausibly reach that level with a full research pass," not "scores it on first sweep."

---

## 6. Two open questions

1. **`npm run check:metrics`** must learn that a Compare-excluded school legitimately has
   no `metricValues.ts` keys, or it reports 30 oversights.
2. **`npm run check:seo`** has a `MIN_BYTES = 20_000` floor (`check_seo.mjs:34`). A PreK–8
   school with 8 areas and no Compare surface is a **plausible** candidate to pre-render
   under it. Check explicitly; it is not chained into `npm run build`.

---

## 7. Verified data (spot-checks done firsthand, not just via sweep)

Re-verified directly against charlotteprep.org during the assessment:

- **Tuition 2026-2027**, every figure: Pre-Primary **$17,700** · Primary **$18,500** ·
  Transitional K **$23,900** · Montessori K **$25,800** · Kindergarten **$25,800** ·
  Grades 1–4 **$28,800** · **Grades 5–8 $30,200 (highest)**.
  > `top-tuition` **$30,200 is a Grade 5–8 ceiling** — not comparable to a K–12 school's
  > 12th-grade figure. Another reason Compare exclusion is right.
- **After School:** ends **5:30 p.m.** · **$4,500/yr** (K–4 and 5–8 alike) · **$20/hour**
  drop-in · Pre-Primary/Primary Extended Day $5,900 · TK Extended Day $2,700 ·
  Pre-Primary/Primary School Day $3,400 · **3% younger-sibling discount**.
- **Before-school care: a published NEGATIVE** — free early drop-off 7:45 a.m. (LS/MS) /
  8:00 a.m. (Early School), and *"No additional before-school care is available at this
  time."* One exception: Beginner Chorus meets **7:15–8:00 a.m.**
- **Fees:** application **$100** · enrollment deposit **$2,000** · New Family Commitment
  **$1,000** · Parents' Association **$150**/student/yr · Tuition Refund Plan ~1.45%.

### Admissions — verified against the CAIS 2027-28 brochure

**⚠️ Two different cycle years are BOTH correct on this site — label them separately.**
Tuition is **2026-2027** (in force now); admissions dates are the **2027-2028** cycle (now
open). Confirmed: the application page links `.../Admissions/2027-2028-Forms/cais-2027-2028-upload.pdf`
and that brochure's explicit years match the site's bare dates exactly. The standing sanity
test (a 2027-28 cycle runs Oct 2026 → Apr 2027) **passes**.

**The school's OWN bands — TWO, not three.** Page headings verbatim: **"Early School &
Kindergarten"** and **"Grades 1-8"**. *Do not invent a 1–4 / 5–8 split* — testing differs
inside the band, but dates do not.

| Milestone | Early School & K | Grades 1–8 |
|---|---|---|
| Priority application deadline | **January 2** | **January 15** |
| Supporting materials | February 1 | February 26 |
| **Decision notification** | **February 26, 4:00 p.m.** | **April 9, 4:00 p.m.** |
| **Contract due** | **March 5, 12:00 p.m.** | **April 16, 12:00 p.m.** |

**Testing splits INSIDE the Grades 1–8 band** — this is the sentence most likely to be
written wrongly:
- **WPPSI-IV** — Montessori K / Kindergarten, **and Grade 1**
- **WISC-V** — **Grades 2–4**
- **ISEE** — **Grades 5–8**

CAIS fees **$300** WPPSI-IV / **$300** WISC-V (paid to the psychologist). Portal is
**FACTS** (`/admissions/apply-now` 301-redirects to `sis.factsmgt.com`). Prep's own CAIS
testing date is **Sat. Jan. 30, 2027** — independently corroborated in two files already in
this repo (`source-material/admissions/charlotte-country-day/…CAIS Testing Consortium.md`
and `…/charlotte-christian/…Grade-by-Grade Application Plans.md`).

### Financial aid
Platform **Clarity** (same as Charlotte Christian per PR #303) · deadline **January 15** ·
**aid is K–8 only** — *not* offered for the Montessori Early School (a real restriction) ·
**% receiving aid, total awarded, and average award are all UNPUBLISHED** (confirmed absent,
not merely unfound) · Form 990 **EIN 45-2588411**, FY June 2025 revenue **$15,824,777**,
expenses $11,260,242, assets $34,396,041 — ProPublica
`https://projects.propublica.org/nonprofits/organizations/452588411`.
**Best remaining lead for the three missing aid figures: Form 990 Schedule I / Part IX.**

### Sports
7 sports by season — Fall: Coed Cross-Country, Boys Soccer, Girls Tennis, Girls Volleyball ·
Winter: Boys/Girls Basketball · Spring: Coed Golf, Girls Soccer, Boys Tennis · Year-round:
Girls Cheerleading. **11 teams grades 5–8** · **80%+ MS participation** · **18 conference/
tournament titles** · conference is the **"QCC"** (used unexpanded everywhere; expansion and
member list **not published**) · AD **Renee Suttles** (staff directory only — the athletics
page names no AD) · volleyball head coach **Mandi Mohammed** (7 years) · 2024 QCC titles in
girls basketball (first in 14 years, 9 straight wins) and girls volleyball.
**No athletic facility is named anywhere on the site.**
> The athletics page's summary list says "Boys **and Girls** Soccer/Tennis" while its own
> seasonal breakdown splits them by season. **The seasonal list is the more specific
> statement.**

### The Arts
`/student-life/fine-arts` — Visual Arts, Drama, Music. **Band grades 4–8** · Primary Chorus
(1–2) and Beginner Chorus (3–6) · **no orchestra, strings, or jazz band anywhere**.
Productions: ***Alice*** (Nov 14–15 2025) and ***Willy Wonka Jr.*** (Apr 19–20 2024,
"our annual 3rd-8th grade musical") — **both staged in the GYMNASIUM**, which strongly
implies **no theater/auditorium**. Only named spaces: "Art Studio", "Music Cottage".
Performance venues are genuinely impressive: **Carnegie Hall (DCINY)**, Biltmore Estate,
Knights/Hornets games. **20+ arts events/year.** A real PreK–8 ladder is documented.
No arts awards (one acceptance to Walnut Hill ≠ an award).

### Student Clubs
No clubs list exists. ~10 items recoverable from news + the after-school page:
**Model UN** (best-documented — CHARMUN member, 20 delegates, founded 2020, named 2023/2024
delegate awards), Set Design Club, Stage Crew, D&D Club, Chess, **BUDEE** (signature
cross-division mentorship), **Joy Term** (K-8 intersession, "over 20 courses"), **After
School Studios** (14 named), **Science Fair** (8th grader 3rd in physics, NC state fair),
High School Fair. **No honor society. No yearbook. No student newspaper** (only a
first-grade class newspaper). **Service learning has a real page** with 4 named programs.

### Course Offerings
**No catalog exists.** Recoverable: **Spanish is the sole world language, K–8** · LS specials
on a **6-day rotation** (Fine Arts, Technology/STEM, Spanish, PE) · **MS elective rule** —
5th graders choose **Chorus or Band** while taking both Drama and Art; from **7th grade**
they choose **Drama or Art** (this is in the admissions packet PDF **only**, not the site) ·
8th-grade **Leadership** class · Health. **No honors / AP / high-school-credit courses** —
unstated rather than denied, but the Spanish line ("skills they will need to succeed in high
school Spanish") implies no HS credit.

---

## 8. Source URLs

**School:** `/` · `/about/fast-facts` · `/about/faculty-staff-directory` ·
`/about/mission-vision` · `/about/welcome-from-head-of-school` ·
`/about/strategic-plan-2022-2027/campus-master-plan`
**Academics:** `/academics/academics-overview` · `/academics/lower-school` ·
`/academics/middle-school` · `/academics/middle-school/high-school-admissions-process` ·
`/academics/middle-school/college-destinations` *(slug says college — content is HIGH SCHOOL)*
**Student life:** `/student-life/athletics` · `/student-life/fine-arts` ·
`/student-life/after-school` · `/student-life/leadership` · `/student-life/life-at-prep` ·
`/community/service-learning` · **`/student-life/beyond-charlotte-prep`** *(the placement list)*
**Admissions/aid:** `/admissions/application-process` · `/admissions/tuition-fees` ·
`/admissions/apply-now` *(301 → FACTS)* ·
`/uploads/files/Admissions/2027-2028-Forms/cais-2027-2028-upload.pdf`
**News (the de-facto source — static pages are marketing):**
`/community/news/stories/class-of-2026-high-school-destinations` ·
`.../class-of-2025-high-school-destinations` ·
`.../stories?id=381634%2Fclass-of-2024-high-school-destinations` ·
`.../prep-to-mccallie-and-beyond` · `.../model-un-club-awarded-at-conference` ·
`.../sparking-debate-to-grow-critical-thinking` · `.../tigers-win-qcc-championship` ·
`.../victory-for-girls-volleyball` · `.../joy-term-returns` · `.../prep-players-present-alice` ·
`.../charlotte-prep-presents-willy-wonka-jr` · `.../a-stage-set-for-success` ·
`.../prep-scholar-awarded-at-state-science-fair` ·
`.../prep-8th-grader-accepted-to-walnut-hill-school-for-the-arts`
**Off-site:** `https://projects.propublica.org/nonprofits/organizations/452588411`
**Archived (Summer 2025 brochure — do NOT publish as current):**
`https://web.archive.org/web/20241124043846if_/https://charlotteprep.org/uploads/files/summer-camp-brochure-2025.pdf`

**Do not re-OCR** `fall-2025-admissions-packet-web.pdf` (9.1 MB, image-scanned, older
cycle) — the live application page plus the CAIS PDF supersede it.

---

## 9. What happens next

**Two pieces of work, in order. Neither has been started.**

1. **Build the PreK–8 shape** — §3.2 Compare exclusion, drop the 6 college-bound Sports
   cards for these schools, register the High School Placement area.
   **UX-gated: needs the user's approval before `/implement` runs.**
2. **Add Charlotte Prep** as its first occupant — via `/add-school`'s normal `/plan` →
   `/implement` handoff. Deep research is `/implement`'s job, starting from §8's URLs.
   Two-phase (English first, then the nine prose locales).

**Still to ask the user:** the **Welcome Video** question (`/add-school` step 5b) — a
YouTube embed URL or an explicit "none". It was never reached in the assessment session.

**Design dependency:** the user wants the High School Placement area designed in **Claude
Design** first — project **"Charlotte School Compare Website Design"**. See
[`prek8-placement-design-brief.md`](prek8-placement-design-brief.md). As of 2026-09-15 the
`claude-design` MCP server failed to connect (`FIRST_PARTY_AUTH_REJECTED`, HTTP 403);
`/design-login` fixed **`DesignSync`** (a different, design-system-only surface that cannot
see canvas projects) but the MCP server needs a **session restart** to retry.
