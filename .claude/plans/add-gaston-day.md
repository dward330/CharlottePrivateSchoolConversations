---
name: add-gaston-day
title: Add Gaston Day School as the 10th school
status: implemented
phases: 2
created: 2026-08-18
branch: feat/add-gaston-day
prs: [146]
---

# Add Gaston Day School as the 10th school

## Goal

Add **Gaston Day School** (Gastonia, NC) as the app's 10th school, with all eight research
areas populated to the depth its public data supports. It ships as a full school page —
pre-rendered SEO page, Compare column, structured cards, prose, brand crest, Welcome Video
— plus overlay translations in every prose locale. Success = the school page renders every
area to the depth of a **data-rich** school (not a thin one), the Compare column shows real
values with `null`s only where data is confirmed unpublished, and every automated check
passes.

This is a **completed `/add-school` assessment** — viability is settled (**8/8 areas,
~23 of 30 Compare rows ≈ 77%**, comfortably above the Davidson Day floor of 17/30 & 7/8;
it would rank ~4th of 10 on Compare fill, between Charlotte Christian at 80% and Hickory
Grove at 70%). Do **not** re-assess whether to add it; build it.

## Context

The app holds **9 schools × 8 research areas** today (`src/data/schools.json`,
`.claude/docs/DATA-SCHEMA.md`, 368 ingested documents). The last school added was
**Hickory Grove Christian (PR #143)**; its plan `.claude/plans/add-hickory-grove-christian.md`
and per-school files are the **mechanical reference** for where things live and how imports
are wired. **They are NOT the content model** — Hickory Grove shipped thin (70% fill, 1 doc
per area in several areas). Per the standing rule, build each card to the **fullest**
existing school's structure — **Providence Day / Charlotte Latin / Cannon** (~96% fill).

Gaston Day's data is genuinely rich — **College Support at ~95%** is near the top of the
roster — and must not be capped at a thin school's depth.

### Confirmed structure (every path below was verified during planning)

- **Per-school data dirs** (one file per school, 9 files each today):
  `src/data/sportsPrograms/<slug>.ts`, `artsPrograms/`, `clubsPrograms/`,
  `collegeSupportPrograms/`, `afterSchoolPrograms/`, and **`summer/<slug>.ts`**
  (note: `summer/`, *not* `summerPrograms/` — and it holds only 8 files; `davidson-day.ts`
  is absent by design, the live precedent for an omitted topic).
- **Topic roots** holding the static `PROGRAMS` import map — line numbers verified
  2026-08-18: `src/data/sportsProgram.ts:432`, `artsProgram.ts:365`, `clubsProgram.ts:283`,
  `collegeSupport.ts:441`, `afterSchool.ts:394`, `summerPrograms.ts:316`. Adding a
  per-school file **without** wiring its import here is a **silent no-op** — the school
  renders prose instead of the card, and no check catches it.
- **Hand-maintained layers** the ingest never writes: `src/lib/metrics.ts`,
  `src/data/metricValues.ts` (**30 rows**, verified), `financialAidReports.ts`,
  `clubClusters.ts`, `courseOfferings.ts` (`OFFERINGS`), `clubCatalog.ts` (`CATALOG`),
  `collegeRankings.ts`, `brands.ts`. Plus `SCHOOL_NAMES` in
  `.claude/skills/ingest-source-material/build_docs.py:35`.
- **`null` precedent** in `metricValues.ts` — written with an inline reason comment, e.g.
  `'davidson-day': null, // aid budget not published` (lines 234, 555, 594, 625). Follow
  that shape exactly; `check:metrics` distinguishes a deliberate `null` from a missing key.
- **i18n scripts with hardcoded school lists** (the silent-skip trap) — verified line
  numbers: `scripts/i18n_extract.mjs:44,87`, `check_translations.mjs:34,76`,
  `check_chrome_keys.mjs:35,49`, `i18n_audit_skips.mjs:35,49`,
  `check_live_resolution.mjs:50`, and `i18n_fields.mjs:343+` (three separate blocks —
  `values.<slug>`, `subs.<slug>`, `quals.<slug>.kind`). **Confirmed during planning that
  `hickory-grove-christian` appears in all three `i18n_fields.mjs` blocks** — so the
  established pattern is complete and `gaston-day` must be added to all three the same way.
- **SEO is generated from `schools.json`** (`scripts/seo_routes.mjs:33`), so the
  pre-rendered page, sitemap entry and hreflang alternates are automatic. `LOCALES`
  (`seo_routes.mjs:90`) already matches `TRANSLATED` — no edit needed for a school-only
  change. `check_seo.mjs:34` enforces `MIN_BYTES = 20_000`.

**Locales.** `TRANSLATED` (UI chrome, `src/lib/i18n.ts:108`) and `PROSE_TRANSLATED`
(research prose, `i18n.ts:182`) are separate lists. A new school adds **prose**, so Phase 2
is the **overlay layer** — the 9 locales in `PROSE_TRANSLATED`
(`es, bn, ht, te, fr, fa, it, hi, ar`), *not* the `src/locales/*.json` chrome catalogs.
School-page chrome is school-independent and already translated. Follow
`.claude/docs/prose-translation-architecture.md` for the mechanism.

## Decisions

- **Slug `gaston-day`** — matches the school name; consistent with the existing
  `davidson-day` / `covenant-day` pattern. Initials **`GD`** are free (`CD` is Charlotte
  Country Day, `CV` was Covenant Day's workaround for that collision, `DD` is Davidson Day).
- **Branch `feat/add-gaston-day`** — matches the plan name.
- **All 8 areas included, none omitted** — settled in the assessment.
- **Gastonia is ~25 mi west of Charlotte** — the first school on the roster outside
  Charlotte-metro proper. The user proceeded knowingly; this is not a defect to re-raise.
- **Sports `p4-commits-2426` and `d1-commits-2426` are deliberate `null`s** — a focused
  deep pass confirmed the school publishes **no enumerated signing list** (local press,
  athletics-site news, and NCSA/recruiting DBs all checked; NCSA's Gaston Day pages are
  generic recruit-marketing pages with no commit lists). Write `null` with a reason
  comment. **Do not spend a research pass rediscovering this absence** — a third pass was
  declined at assessment time as motivated reasoning.
- **Brand colors confirmed navy + white, from the live site** (user-supplied screenshot of
  `gastonday.org`, 2026-08-18). The crest, nav links and Apply-Now button are all a
  mid-to-dark navy on white; the shield is navy-and-white striped. **There is no secondary
  accent** — no gold or green to fall back on. The crest also carries a **`GD` monogram**,
  independently confirming `initials: 'GD'`.
- **The navy is a near-collision, and resolving it is a real judgment call — not "pick a
  navy."** The site's navy reads close to the `#1e3a6f`–`#22437e` range (**eyeballed from a
  screenshot; JPEG compression and display scaling both shift the value, so treat it as
  indicative and sample the real value in Phase 1** — see Open questions). That range sits
  **between two existing brands**: Hickory Grove `#14396e` and Charlotte Latin `#12294f`.
  Seven of nine brands are already blue-family: `#002855`, `#12294f`, `#13294b`, `#14396e`,
  `#1e40af`, `#1e5fd1` (plus green `#107a43`, maroon `#8a2433`, red `#be123c`).
  The badge's job is instant recognition in a 10-school Compare column, so **fidelity to the
  school's actual navy and distinguishability from its neighbors are in genuine tension
  here**. Record the reasoning in a comment either way, following `brands.ts:76-82` which
  documents exactly this kind of choice.
- **Financial-aid figures: the school's own profile wins.** Private School Review reports
  45% aid and 466 enrollment; the school's 2025-26 Academic Profile says **26% tuition
  assistance** and **510 enrollment**. Use the school's figures; flag the conflict.
- **Club counts carry a `verify` flag** — the club roster is reconstructed from third-party
  listings (Private School Review, Niche), not a school-published dated list.
- **Build to the fullest school, not Hickory Grove** — mirror Providence Day / Latin /
  Cannon depth per area; use Hickory Grove only for file layout and import wiring.

## Approvals needed

**None.** Adding a school is automatic everywhere under §6 of the schema doc — no
UX-design gate. No new card, Compare row, metric key, or topic is introduced: every area
maps onto existing cards and rows. The distinctive iGEM / VEX Robotics material maps onto
the existing Student Clubs `signature` card and the `flagship-result` Compare row.

**If Phase 1 research surfaces material that fits no existing card, that IS a new card and
needs the user's explicit approval BEFORE building it** — surface it and wait, per the
UX-design standard.

## Source material

**No `source-material/` was written by `/add-school`** — deliberate, per that skill's
boundary: a sweep sized for percentages produces indicative figures, not the vetted record.
**Phase 1 begins with a full research pass**, persisting everything to
`source-material/<topic>/gaston-day/Gaston Day School - <Topic> - <Subtopic>.md` with a
provenance header, source URLs and record-level detail, **then** running the
`ingest-source-material` skill.

### Hard data already extracted from primary PDFs (transcribe, do not re-derive)

**Tuition & Fees 2025-26** — `SCHEDULE-OF-TUITION-FEES-2025-2026.pdf`:

| Grade band | Tuition | Fees | Total |
|---|--:|--:|--:|
| Preschool (3s)/Pre-K (4s) Half-Day | $7,875 | $900 | $8,775 |
| Preschool/Pre-K Full Day | $9,900 | $990 | $10,890 |
| Kindergarten–Fourth | $17,700 | $1,800 | $19,500 |
| Fifth–Eighth | $19,375 | $2,050 | $21,425 |
| **Ninth–Twelfth** | $20,215 | $2,175 | **$22,390** |

Bus: Round Trip $2,500 / One Way $1,630 / Per Trip $18. Music lessons $35/lesson.
**Lower School After School Care: 3:00–6:00, $95/week or $30/day.**
**Middle School After School Care: 4:00–6:00, $55/week or $15/day.** Extended Day Drop-In $25.

→ After School is **fully populatable**: `latest-pickup` = 6:00 PM (**use the 12-hour clock
per the standing rule, and `compareAs: 'span'` handling per the clock-span precedent**),
`aftercare-cost` from the rates above with a `subs` line for the other billing period.

**Academic Profile 2025-26** — `New-GDS-Profile-25-26.pdf`:

- Class of 2026: **35 seniors**. Class of 2025: **95%** to four-year colleges. **26%** of
  student body on tuition assistance. Enrollment **510**, **68** FT faculty, **8:1**, CEEB **340297**.
- 4.0 scale; Honors +0.50, AP +1.0. **No class rank published.** Course load 6 courses.
- AP limits: 1 AP in grade 10, 3 in each of grades 11 and 12.
- **AP % scoring 3+**: 2021 72% · 2022 76% · 2023 86% · 2024 89% · **2025 95%** (all AP
  students required to sit the exam).
- **ACT mid-50% composite**: 2021 24–32 · 2022 21–28 · 2023 22–28 · 2024 24–31 · 2025 22–28.
- **SAT mid-50% 2025**: EBRW 630–690, M 580–670, **Total 1190–1330** (2021–24 series also in PDF).
- **GPA quintiles** (Class of 2026, end of junior year): 1st 4.3–4.74 · 2nd 4.0–4.27 ·
  3rd 3.61–3.95 · 4th 3.09–3.57 · 5th 2.5–3.05.
- Grade-distribution-by-department table (English/Arts/History/Math/Science/Languages), 2024-25.
- **Merit scholarships**: 2022 23 students/$2.6M · 2023 25/$2.75M · 2024 20/$3.87M ·
  2025 21/$3.76M.
- Requirements: English 4y, Math 4y, Science 3y, Social Studies 3y, World Language through
  Level III, Fine Arts 2y, PE/Health 1y; **25 hrs service/yr (40 for NHS)**; **Capstone
  Project ≥40 hrs required of all seniors**.
- AP courses in the table: English Lit & Comp, English Lang & Comp, Calculus AB, Calculus
  BC, Biology, Chemistry, Physics II, US History, Government & Economics, Computer Science.
  **Count from the actual table** — PSR says 9, other sources say 10.
- **College Counseling: Peter Gangemi (Director) + Kristy Smith (Assistant)**; 35 seniors
  → `counselor-caseload` derivable. **Resolve the denominator carefully** (2 counselors
  ≈ 18:1 vs. 1 director = 35:1) and qualify the cell with a `quals` tooltip.
- **COLLEGE ACCEPTANCES 2019–2025 — a ~250-institution list** (bold = Class of 2025
  enrolled). Spans Yale, Stanford, Dartmouth, Duke, Johns Hopkins, Georgetown, Carnegie
  Mellon, Rice, Vanderbilt, Emory, Notre Dame, Middlebury, Swarthmore, Bryn Mawr, Grinnell,
  Colby, Davidson, W&L, Wake Forest, UNC-CH, UVA, Michigan, UCLA, Berkeley, USC, NYU, BU,
  Northeastern, Tufts, Brandeis, Bucknell, Lehigh, Villanova, RPI, Colorado School of Mines,
  West Point; foreign (UCL, King's College London, Toronto, Melbourne, Sydney, Yonsei);
  specialty art (RISD, SCAD, SVA, MICA, School of the Art Institute of Chicago, Minneapolis
  College of Art & Design, AMDA).

**Sports** — 19 team sports (MaxPreps). Boys: baseball, basketball, cross country, golf,
lacrosse, soccer, swimming, tennis, volleyball, wrestling. Girls: basketball, cross country,
field hockey, golf, soccer, softball, swimming, tennis, volleyball. Plus cheering and track
& field (PSR). MS teams: volleyball, baseball, co-ed cross country. **~70% of grades 6–12
play ≥1 sport.** AD: **Lulu Brase**.
**NCISAA 2A championship ledger:** volleyball **2021, 2024, 2025** (2025 final def. St.
Thomas More Academy 3–2 on Oct 25 2025; plus 3 further finals appearances and 5 league
titles over the decade); girls tennis **2021, 2023, 2024, 2025** (3 straight through 2025,
4 overall; 2025 def. Epiphany School; an earlier title over Trinity School of Durham &
Chapel Hill); boys soccer **2024**.

**Arts** — Pamela Kimbrell Warlick Visual & Performing Arts Center: **550 seats**, modern
lighting/sound, professional dance studio. Two major shows/year incl. spring musical; drama
from grade 2. Ensembles: MS Instrumental Ensemble (woodwinds/brass/percussion/piano/guitar),
MS Chorus, US Vocal Performance Ensemble. Private lessons by contracted professionals.
Visual arts: drawing, painting, ceramics, printmaking, portfolio development; Visual Art
I–III + Visual Art IV (H). Awards: chorus "superior" in regional adjudications over 6 years;
entrance to UNC School of the Arts and Governor's School; numerous Scholastic Art Awards;
*Blutopia* holds Scholastic Art & Writing Awards + NC Scholastic Media Association Literary
Magazine Contest recognition. Fine Arts Chair: **Travis Johnson**.

**Student Clubs** — ~14-club Upper School roster: Blutopia, Chess, Classics, Drama, French,
Spanish, Peer Mentoring, Public Debate, Science Olympiad, Student Government (MS + US),
Theatre Arts, Yearbook, MS Literary Magazine, US Literary & Arts Magazine. Also Interact,
Mock Trial, Quiz Bowl, FCA, Art Club, Spirit Club, Junior Heart Board, International Club,
3-D Printing Club, Green Team, International Council. Honor societies: **National Honor
Society, National Beta Club, International Thespian Society**. Honor Code enforced by a
student-led **Honor Council**; President's Service Award (100+ hrs).
**iGEM synthetic-biology team — GOLD MEDAL winner**, teams in 2012, 2016, 2018, 2020
(projects: kudzu phytotoxin; *E. coli* K-12 isobutanol biofuel). **VEX Robotics**: launched
its own team and qualified for TSA VEX Nationals in 2023, its first year competing;
previously 4th at state in FIRST Robotics. Signature: Sunship Earth peer mentoring
(juniors/seniors mentor 4th graders), Capstone.

**Summer** — Camp Spartan (full-day), half-day enrichment camps, partner camps (Charlotte
Children's Theater, Studio Elite, Legends Camps), Nike Sports Camps, **before/after/between-
camp wrap-around care**, tutoring. Cooking camp July 27–31 2026. Directors: Lulu Brase,
Julie Dellibovi, Ben Tipton. **Session dates/ages/prices sit behind a linked Google Doc
catalog the page does not inline** — that catalog is the single unlock for Summer's
remaining ~43%, and is likely crackable.

### Source URLs by area

- **College Support / Course Offerings** — `https://www.gastonday.org/wp-content/uploads/2025/09/New-GDS-Profile-25-26.pdf` ·
  `.../2023/10/GDScollegeprofile2324.pdf` · `https://www.gastonday.org/collegecounseling/` ·
  `/upper-school/` · `/academics/`
- **Financial Aid / After School** — `.../2025/01/SCHEDULE-OF-TUITION-FEES-2025-2026.pdf` ·
  `.../2024/02/tuition-and-fees-24-25.pdf` · `/cost-and-financial-aid/` · `/afterschoolprogram/`
- **Sports** — `https://gastondayathletics.com/` · `https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/` ·
  `https://www.highschoolot.com/gaston-day-school/17527719/` ·
  `.../the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/` ·
  `.../the-2024-25-ncisaa-team-state-champions-in-every-sport/22016545/` ·
  `.../2022/06/Gaston-Day-School-Athletic-Handbook-updated-June-2022.pdf` ·
  `https://www.nfhsnetwork.com/schools/gaston-day-school-gastonia-nc`
- **Arts** — `https://www.gastonday.org/arts/`
- **Clubs** — `https://www.privateschoolreview.com/gaston-day-school-profile` ·
  `https://www.niche.com/k12/gaston-day-school-gastonia-nc/` ·
  `https://issuu.com/gdsblutopia/docs/blutopia_2012` · iGEM: `2012.igem.org:443/Team:Gaston_Day_School/Team`,
  `2016.igem.org/Team:Gaston_Day`, `2018.igem.org:443/Team:Gaston_Day_School`,
  `2020.igem.org/Team:Gaston_Day_School/Team` · `https://www.molecularcloud.org/html/igem/detail/30.html`
- **Summer** — `https://www.gastonday.org/summerprograms/` ·
  `https://www.ussportscamps.com/basketball/nike/nike-basketball-camp-gaston-day-school` ·
  `https://241play.org/camps/gaston-day/`
- **Baseline** — `https://nces.ed.gov/surveys/pss/privateschoolsearch/school_detail.asp?ID=01011099` ·
  `https://www.usnews.com/education/k12/north-carolina/gaston-day-school-310279` ·
  `https://www.findingschool.com/gaston-day-school` · `https://www.teenlife.com/l/school/gaston-day-school/`

### Site navigation (from the live site, 2026-08-18)

Top-level nav: **About Us · Admission · Academics · Athletics · Summer Programs · Support ·
My GDS · Calendar · Back to School**, plus an **Apply Now** button. Two things follow:

- **`ACADEMICS` opens a dropdown** with six children — **Early / Lower School, Middle
  School, Upper School, College Counseling, Arts, International Program**. These are the
  canonical entry points for the curriculum, arts and college-support research, and
  `/academics/` itself is a landing page rather than the content.
- **`SUMMER PROGRAMS` is a top-level nav item**, not a sub-page — relevant when hunting the
  camp catalog that gates Summer's remaining coverage.
- **An `International Program` page exists that the sweep never surfaced** — see Open
  questions. The Upper School and Early/Lower School pages were also not read during the
  sweep and may carry club, arts and division-level material.

### Fetch-path gotchas (found during the sweep — these save a cycle)

- **`gastondayathletics.com` is JS-rendered.** Sport rosters, levels, championship banners
  and signing news are invisible to a plain fetch — the same class as the documented
  Finalsite popup-tile trap. **MaxPreps was the working substitute** for the sport list.
- **The school's PDFs are image-based.** WebFetch returns unusable raw PDF data;
  **`pdftotext -layout` on the downloaded file works perfectly** and is how the tuition and
  profile data above was extracted. Use that path.
- `niche.com` and the `igem.org` team pages **403** to WebFetch; the *2025-2026* athletics
  handbook URL **404s** (try the 2026-2027 handbook linked from the athletics site).

## Out of scope

- **No new Compare row, card, section, metric key or topic.** Everything maps onto the
  existing 30 rows and existing cards.
- **No deploy.** `npm run deploy` is the user's call, every time — never run it here.
- **No podcast episodes.** Gaston Day has none; do not invent entries. `check:podcast`
  validates one-directionally and passes silently on a school with none.
- **`SCHOOL_SECTION_ORDER`** (`src/pages/SchoolDetail.tsx`) is an optional, `?.`-guarded
  per-school card-order override — skip it; the shared order is correct.
- **No re-assessment of viability**, and **no third research pass on athletic commits**.

## Steps

### Phase 1 — English

1. **Branch** — `git checkout -b feat/add-gaston-day` off an up-to-date `main`.

2. **Deep research pass, area by area**, starting from the URLs above. This is the real
   research; the sweep was reconnaissance. Use `pdftotext -layout` for the school's PDFs.
   **Priority unlock: the Summer Google Doc catalog** (session dates/ages/prices) — it is
   the one document that materially moves an area's coverage.
   **Also read the six ACADEMICS dropdown pages the sweep never opened** —
   `/early-lower-school/`, `/middle-school/`, `/upper-school/`, `/collegecounseling/`,
   `/arts/`, and the **International Program** page (see Open questions). Division-level
   pages are where per-division club, arts and curriculum detail usually lives.

3. **Persist everything to `source-material/`** — `source-material/<topic>/gaston-day/Gaston
   Day School - <Topic> - <Subtopic>.md`, each with a provenance header (who/when/how), the
   **source URLs**, and the record-level detail behind every figure. Nothing enters the app
   that is not traceable to one of these files.

4. **Run the `ingest-source-material` skill** — regenerates `.claude/docs/` notes,
   `src/data/schools.json` and `src/content/`. Add `"gaston-day": "Gaston Day School"` to
   `SCHOOL_NAMES` in `.claude/skills/ingest-source-material/build_docs.py:35` **first**, or
   the school renders with a slug-derived name.

5. **Map subtopics onto existing metric keys** in `src/lib/metrics.ts` — every new subtopic
   phrasing must resolve to an **existing** card key. An unmatched subtopic **silently
   becomes a new card**, which is an unapproved UX change. `npm run check:metrics` reports
   unmatched keys; the schema doc flags them ⚠️.

6. **Write the six per-school structured-card files**, each built to the **fullest** school's
   structure (Providence Day / Latin / Cannon), populating every optional field, stat tile,
   season/ledger/funnel/roster row and sub-card the data supports:
   `src/data/sportsPrograms/gaston-day.ts`, `artsPrograms/gaston-day.ts`,
   `clubsPrograms/gaston-day.ts`, `collegeSupportPrograms/gaston-day.ts`,
   `afterSchoolPrograms/gaston-day.ts`, **`summer/gaston-day.ts`**.
   - A card or division with **zero items is omitted entirely** — never an empty shell with
     a "not published" note; move the scope note to a sibling card.
   - **Do NOT include lifted chrome headings** (`rosterTitle`, `checklistTitle`,
     `adjacentTitle`, and other `xTitle`-style fields whose translated fallback lives in
     `sections.*`). They pin the heading to English in all 10 locales. Covenant Day shipped
     seven of these and they had to be deleted. Keep an `xTitle` **only** where the heading
     genuinely varies per school.

7. **Wire the six `PROGRAMS` imports** — `sportsProgram.ts:432`, `artsProgram.ts:365`,
   `clubsProgram.ts:283`, `collegeSupport.ts:441`, `afterSchool.ts:394`,
   `summerPrograms.ts:316`. **Adding a per-school file without its import is a silent
   no-op** and no check catches it. Verify each card actually renders.

8. **Backfill all 30 Compare rows** in `src/data/metricValues.ts` — a value **or** a
   deliberate `null` with a reason comment for **every** row. A missing key is an oversight;
   `check:metrics` tells them apart.
   - `p4-commits-2426` and `d1-commits-2426` → **`null, // no published signing list`**.
   - `latest-pickup` → 6:00 PM, 12-hour clock, span-aware.
   - `aftercare-cost` → from the published rates, with a `subs` line.
   - Add `quals` provenance tooltips where the roster's other schools carry them.

9. **Standalone catalogs** — `src/data/courseOfferings.ts` (`OFFERINGS`, from the profile's
   course table), `src/data/clubCatalog.ts` (`CATALOG`, with a **`verify` flag** since the
   roster is third-party-sourced), `src/data/clubClusters.ts`,
   `src/data/financialAidReports.ts` (**transcribe the financial-aid deep-dive into a
   structured REPORTS entry in this same pass** — never leave it as prose).

10. **College rank labels** — the per-school acceptance list carries **no ranks**
    (`{ name, cats }` only); labels resolve by name at render from the single master
    `src/data/collegeRankings.ts`. **Most of this ~250-college list is already in the master
    and costs nothing.** For each institution the master **lacks**, research its **2026**
    rank once and add **one row** plus its source line to
    `source-material/college-support/US News 2026 - Rank Labels.md`.
    - The rule is **inclusive**: any U.S. News **National** or **National Liberal Arts** rank
      at any position or band gets a label, independent of the `cats` buckets.
    - **No label** for: U.S. News *Regional* institutions, community/technical colleges,
      specialty art/music/design schools, seminaries, and **foreign** universities. On this
      list that includes UCL, King's College London, Toronto, Melbourne, Sydney, Yonsei,
      RISD, SCAD, SVA, MICA, School of the Art Institute of Chicago, Minneapolis College of
      Art & Design, AMDA, Marion Military Institute, Montreat, Brevard.
    - Sourcing channel that works when usnews.com times out: **Yahoo search**
      (`https://search.yahoo.com/search?p=<school>+us+news+2026+ranked`), which surfaces the
      verbatim "In the 2026 edition of Best Colleges, <school> is ranked No. #N in <category>"
      line. **Never guess, and never use a prior-year number.**
    - `check:ranks` does **not** catch a missing label on a `cats: []` college — labeling a
      ranked non-bucketed college is a research obligation, not something the check flags.

11. **Add the brand entry** to `src/data/brands.ts` — **sample the school's real navy from
    the live site rather than eyeballing it** (the crest, nav links and Apply-Now button all
    carry it), then resolve it against Hickory Grove `#14396e` and Charlotte Latin `#12294f`
    per the Decisions and Open-questions entries, with the reasoning in a comment following
    `brands.ts:76-82`. Then `initials: 'GD'` (confirmed by the crest monogram), and
    **`welcomeVideoUrl: 'https://www.youtube.com/embed/f1ohuLbiKJI'`** (user-chosen,
    2026-08-18 — "Gaston Day Overview"). `brandFor()` falls back to slate `#5b6472` plus
    derived initials, so a missing entry is not a breakage but ships a generic badge — do
    not let the fallback ship by omission.

12. **Add `gaston-day` to every i18n script with a hardcoded list** — do this in Phase 1 so
    Phase 2 cannot silently skip the school: `i18n_extract.mjs:44,87`,
    `check_translations.mjs:34,76`, `check_chrome_keys.mjs:35,49`,
    `i18n_audit_skips.mjs:35,49`, `check_live_resolution.mjs:50`, and **all three blocks** in
    `i18n_fields.mjs` (`values.gaston-day` → prose, `subs.gaston-day` → prose,
    `quals.gaston-day.kind` → **skip**, matching the `hickory-grove-christian` entries).

13. **Regenerate the schema doc** — `npm run schema`. `check:schema` **is** chained into
    `npm run build` and **will** fail until this runs.

14. **Run Phase 1 verification** (below), then **commit and open the PR**.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want. Set the plan's status to
`english-done` and the index row to `English shipped`.

### Phase 2 — Every other locale

Only after that confirmation. Scope is the **overlay layer** for the 9 locales in
`PROSE_TRANSLATED` (`es, bn, ht, te, fr, fa, it, hi, ar`) — **not** the `src/locales/*.json`
chrome catalogs. Follow `.claude/docs/prose-translation-architecture.md` for the mechanism
and the per-locale rollout docs for register; do not re-derive either.

1. **Confirm the slug landed everywhere** — re-check step 12, then extract and **verify
   Gaston Day's strings actually appear in the extracted work files**. **Treat a 100%
   coverage report as suspect until you have seen its strings**; the repo has been bitten by
   exactly this (Summer Programs "was invisible here until it was added, at 0% coverage",
   `check_translations.mjs:53`).

2. **Resolve newly-surfaced field paths** in `i18n_fields.mjs` — a data-rich school
   populates card fields no prior school used, and `i18n_extract.mjs` **silently excludes**
   any path that is neither in `PROSE_KEYS` nor `SKIP_KEYS`. Decide each: enum/code → skip,
   per-school heading → prose. (Covenant Day hit `compareAs`, `questionsTitle`,
   `meritTitle`/`depthTitle`/`trustTitle`.)

3. **Translate the overlays, locale by locale**, per the rollout docs. Standing traps:
   figures are copied **char-for-char** and never re-typed; lakh/crore grouping for
   `hi`/`te` (store the English 3-3-3 figure — the render layer regroups, so a work file
   containing `$36,83,971` double-applies it); RTL bidi isolates for `fa`/`ar`; percent
   signs stay **unspaced in every locale, French included**.

4. **Run Phase 2 verification** (below), then commit to the same PR and merge.

## Files touched

| File | Change |
|---|---|
| `source-material/<topic>/gaston-day/*.md` | new — the research record, all 8 areas |
| `src/data/schools.json` | generated by ingest — adds the 10th school |
| `src/content/**` | generated by ingest |
| `.claude/docs/**` notes | generated by ingest |
| `.claude/skills/ingest-source-material/build_docs.py` | edit — `SCHOOL_NAMES` +1 row |
| `src/lib/metrics.ts` | edit — map new subtopic phrasings onto existing keys |
| `src/data/sportsPrograms/gaston-day.ts` | new |
| `src/data/artsPrograms/gaston-day.ts` | new |
| `src/data/clubsPrograms/gaston-day.ts` | new |
| `src/data/collegeSupportPrograms/gaston-day.ts` | new |
| `src/data/afterSchoolPrograms/gaston-day.ts` | new |
| `src/data/summer/gaston-day.ts` | new (note the `summer/` dir name) |
| `src/data/{sportsProgram,artsProgram,clubsProgram,collegeSupport,afterSchool,summerPrograms}.ts` | edit — wire 6 `PROGRAMS` imports |
| `src/data/metricValues.ts` | edit — all 30 rows, incl. 2 deliberate `null`s |
| `src/data/courseOfferings.ts` | edit — `OFFERINGS` entry |
| `src/data/clubCatalog.ts` | edit — `CATALOG` entry (with `verify` flag) |
| `src/data/clubClusters.ts` | edit — cluster rows |
| `src/data/financialAidReports.ts` | edit — structured REPORTS entry |
| `src/data/collegeRankings.ts` | edit — only institutions the master lacks |
| `source-material/college-support/US News 2026 - Rank Labels.md` | edit — source lines for any added rank |
| `src/data/brands.ts` | edit — color, `GD`, `welcomeVideoUrl` |
| `scripts/{i18n_extract,check_translations,check_chrome_keys,i18n_audit_skips,check_live_resolution,i18n_fields}.mjs` | edit — add `gaston-day` |
| `.claude/docs/DATA-SCHEMA.md` | regenerated via `npm run schema` |
| `src/data/overlays/**` | new — Phase 2 overlay entries, 9 locales |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run check:metrics` — no missing keys; the 2 commit rows read as deliberate `null`s
- [ ] `npm run check:ranks` — every ranked-bucket college resolves in the master
- [ ] `npm run schema` then `npm run check:schema` — doc regenerated and in sync
- [ ] `npm run build` — succeeds (chains `check:schema`, `seo:files`)
- [ ] `npm run check:seo` — **run explicitly; it is NOT in the build.** Watch the
      `MIN_BYTES = 20_000` pre-render floor (`check_seo.mjs:34`) — **a thin new school can
      plausibly fail this**, and it needs a meta description ≥70 chars with the school name
      in the markup
- [ ] `npm run coverage:floor` — Gaston Day appears, fill rate ≈ the predicted ~23/30
- [ ] `npm run check:podcast` — passes silently (no episodes)
- [ ] **Browser check on `/school/gaston-day`** — this repo's standing lesson is that every
      defect surviving the automated checks was render-layer:
  - [ ] All 8 areas render; **all six structured cards appear** (a missing card = an unwired
        `PROGRAMS` import, the silent no-op)
  - [ ] **Side-by-side against Providence Day or Charlotte Latin** — confirm the rich areas
        (esp. College Support) reached full depth rather than a thin school's depth
  - [ ] Compare column shows real values, with N/A only on the two commit rows
  - [ ] The badge is the deliberate crest, **not** the fallback slate `#5b6472` square
  - [ ] **All ten badges side by side in the Compare column** — Gaston Day's navy must be
        tellable at a glance from Hickory Grove `#14396e` and Charlotte Latin `#12294f`.
        This comparison is what settles the color question; a hex value in isolation does not
  - [ ] The Welcome Video section renders and plays

### Phase 2 — Locales

- [ ] **`gaston-day` confirmed present in all six i18n scripts**, and its strings visibly
      present in the extracted work files — **not** merely a green coverage run
- [ ] `npm run check:translations` — coverage complete for all 9 prose locales
- [ ] `npm run check:runtime` — **the authoritative resolution guard**; run per locale
- [ ] `npm run check:figures` per topic · `npm run check:sepdrift -- --lang <code>` ·
      `npm run check:currency` · `npm run check:money` · `npm run check:script`
- [ ] `npm run check:bidi` / `check:fa` (RTL) · `check:hi` (Devanagari numerals) · `check:fr`
- [ ] **Browser print-out on Gaston Day plus one data-rich school**, in a **real browser**,
      with **every `<details>` panel forced open** — a print-out of collapsed teasers reads
      clean while showing none of the part that breaks. Confirm an unabbreviated 7-digit
      figure renders correctly (the `$3.87M` merit figures abbreviate; find a full one)
- [ ] `npm run check:live` — **expect pre-existing failures on `main` (~2,900 entries)**;
      it structurally cannot see course-offerings, metric-values, financial-aid-report or the
      club catalog/cluster modules. **Do not burn a cycle investigating its delta** —
      `check:runtime` is authoritative

## Risks

| Risk | Mitigation |
|---|---|
| **Silent i18n skip** — a hardcoded `SLUGS`/`EXPORTS` list misses `gaston-day`, Phase 2 reports 100% and ships English prose to 9 locales | Step 12 does this in **Phase 1**, before any translation. Verification requires seeing the school's strings in the work files, not a green run |
| **Unwired `PROGRAMS` import** — the per-school file exists but the card never renders; no check catches it | Step 7 is its own step; the Phase-1 browser check explicitly counts all six cards |
| **Capping depth at a thin school** — copying Hickory Grove's structure silently limits a ~95%-coverage area | Decisions and step 6 name Providence Day / Latin / Cannon as the content model; the browser check is a side-by-side |
| **Lifted chrome headings** pin headings to English in all 10 locales | Step 6 calls out the `xTitle` rule explicitly; Covenant Day's 7 deletions are the precedent |
| **SEO byte floor** — a new school pre-renders under 20 KB and fails `check:seo` | Called out as a real possible outcome; if it fails, the fix is more prose depth, which is wanted anyway |
| **Rank-label misses** on `cats: []` colleges — `check:ranks` cannot see them | Step 10 states the inclusive rule and the no-label buckets, and flags this as a research obligation |
| **Financial-aid figure conflict** (26% vs 45%, 510 vs 466) shipping the wrong number | Decision recorded: the school's own profile wins; flag with `verify` |
| **Deploy assumed to follow merge** | Out of scope; `npm run deploy` is the user's call every time |

## Open questions

- **Summer Google Doc catalog** — does it yield session dates, ages and prices? It is the
  single unlock for Summer's remaining ~43% (`summer-weeks`, `summer-camps`, `summer-ages`,
  `summer-care-span`, and the Cost Planner card).
  **Default:** if the catalog cannot be retrieved, populate what the page states (Camp
  Spartan, half/full-day, partner camps, wrap-around care), write the unobtainable Compare
  rows as deliberate `null`s, and **omit the Cost Planner card entirely** per the
  no-empty-cards rule — the Hickory Grove precedent.
- **`counselor-caseload` denominator** — 35 seniors over 2 counselors (≈18:1) or over the
  1 director (35:1)?
  **Default:** use the two-counselor figure, since Kristy Smith is titled Assistant Director
  *of College Counseling*, and qualify the cell with a `quals` tooltip naming both roles.
- **Brand navy — fidelity vs. distinguishability.** The school's real navy sits between
  Hickory Grove `#14396e` and Charlotte Latin `#12294f`. Using the true color makes three
  badges near-identical in the Compare column; nudging it darker or more saturated keeps the
  badge legible but is no longer quite the school's blue.
  **Default:** **sample the real hex first** — pull the crest/nav color from the live site
  (screenshot eyeballing is not accurate enough to commit) — then, if it lands within ~10%
  of either neighbor, shift it deeper/more saturated until it is visibly distinct, and say
  so in the comment. Confirm all ten badges side by side in the Phase-1 browser check; that
  comparison, not a hex value in isolation, is what settles it.
- **International Program** — the site's ACADEMICS menu lists an **International Program**
  the sweep never surfaced, and the academic profile's world-language exception ("International
  students for whom English is a second language are not required to take an additional world
  language") corroborates a real international cohort. Unknown whether it carries enough
  published material to matter, and which area it belongs to.
  **Default:** research it in the Phase-1 pass and fold it into **existing** cards — most
  likely Course Offerings (curriculum) and the College Support academic case. **If it turns
  out to fit no existing card, that is a new card and needs the user's approval BEFORE it is
  built** — surface it and wait, per the UX-design standard. Do not create a new topic for it.

## Implementation notes — Phase 1 (English), 2026-08-18

**Status: English shipped and pushed** on `feat/add-gaston-day` (7 commits, no PR yet,
not deployed). The user reviewed the rendered page and accepted it after five rounds of
fixes, all recorded below.

### Deviations from the plan, and why

- **Coverage came in at 25/30 (83%), 8/8 areas — 7th of 10**, above the plan's predicted
  ~23/30 (77%). The difference is the Summer catalog (below).
- **The Summer Google Doc catalog WAS retrievable** — the plan's priority unlock and open
  question. The page's linked Google Doc returns only a JS shell to WebFetch, but the
  plain-text export endpoint (`/export?format=txt` in place of `/edit`) returns it whole.
  That single document supplied 30 camps with dates, ages, times and prices, and is what
  lifted Summer from mostly-null to fully populated including the Cost Planner.
- **Brand is navy AND gold**, not the plan's "navy + white, no secondary accent". Sampled
  from the school's own wordmark: navy `#00263f`, gold `#c8a058`. The plan expected a
  near-collision needing a nudge; it turned out not to — `#00263f` is the darkest navy in
  the set and is cleanly distinct from Hickory Grove `#14396e` and Charlotte Latin
  `#12294f`, verified by rendering all four badges side by side. No adjustment was made,
  so the badge is the school's real color.
- **The Affinity & Identity Groups card was OMITTED** (user call at review). The school
  names no identity groups, has no DEI office or staff, and its own About page carries a
  "DIVERSITY & DIFFERENCE" heading whose body is unfilled Lorem ipsum. Per the
  no-empty-cards rule a card of pure gap flags is not shipped.
- **`usnews.com` hard-blocks this environment** — TLS completes, no body ever returns
  (`curl` reports `http=000`; WebFetch times out). The user set a standing rule during
  this build: try usnews.com first, and after five blocks in one pass switch to the Yahoo
  channel for the remainder. Recorded in `add-school/SKILL.md` and the shared rank-labels
  doc, not just here.
- **Babson College is a confirmed NOT-FOUND rank** and ships unlabeled rather than
  guessed. Its prominent WSJ/College Pulse #2 is a different publisher and must not be
  mistaken for a U.S. News figure by a later pass.

### Review-step bugs found and fixed (all by the user, all in the browser)

1. **Affinity card held the general club roster** (Chess, Yearbook, Science Olympiad).
   Behind it sat a larger bug: the Club Catalog and Academic & Competitive Clubs cards
   **never rendered at all** — the single ingested subtopic matched `/honor societ/i` and
   folded onto `honor-societies`, so the `catalog` and `academic-clubs` keys those cards
   attach to never existed. `check:metrics` passed throughout: every subtopic DID match a
   rule, just the wrong one. Fixed by splitting the source file to the roster naming
   convention. **Both lessons are now rules in the generated schema doc.**
2. **Selectivity buckets missing denominators**, and three counts wrong (nu75 40→41,
   lac75 21→23, hbcu 4→5) after Tougaloo was added as both HBCU and lac75 without the
   tallies being updated. Fixed in the bucket table, the six Compare cells and the verdict
   prose. Counts are now derived from the college list, not transcribed.
3. **Financial Aid rendered NINE prose cards** duplicating the structured Deep Dive
   Report, because the source file used `## ` headings where every other school uses
   `### `. Six were removed and two the user wanted kept (Bus services, Named
   scholarships) were restored as their own sections, ordered last so no content bleeds
   into them. `(S1)`-style source-ref suffixes stripped from headings.
4. **Markdown `**bold**` printed its asterisks** rather than rendering — app-wide and
   pre-existing, 793 table rows across all ten schools (Country Day's college-support
   alone had 160). `ProseContent` now renders bold; `proseSummary()` and `make_preview()`
   strip it, since teasers are plain text. Also cleared two long-standing teaser leaks on
   Covenant Day and Davidson Day.
5. **Carmel Christian's buckets** (pre-existing on `main`, fixed here at the user's
   request): three bare Compare cells, a wrong Ivy Plus denominator (`2 / 12` — the set is
   17), and a `~10` that contradicted its own table's `7 / 75`. Recounted from the `cats`
   list: nu75 32, lac75 10, p4 44, hbcu 8. P4 is 44 not 45 because Alabama appears twice
   in a list that deliberately preserves the school's verbatim duplicates.

### Carried into Phase 2

- `gaston-day` was added to **all six** i18n scripts in Phase 1, including all three
  `i18n_fields.mjs` blocks, and **verified by extracting to a scratch locale and confirming
  Gaston Day's strings (including iGEM) actually appear in the work file** — not by a green
  coverage run.
- The `## ` → `### ` heading change and the affinity-card removal both altered English
  prose, so any overlay extraction must happen AFTER this branch's final English state.
- Two Compare cells hold prose worth watching in translation: the after-school
  discrepancy flags, and the `latest-pickup` / `aftercare-cost` tooltips, which explain a
  conflict between two of the school's own sources.

---

## Implementation notes — Phase 2 (locales), 2026-08-18

**Status: shipped.** All nine `PROSE_TRANSLATED` locales (`es, it, bn, ar, fr, ht, hi, fa,
te`) carry Gaston Day's full prose surface — **967 strings each, 8,703 total**. Both phases
are in PR #146.

### Two Phase-1 defects the extraction surfaced

Neither was visible to any check; both would have shipped English to all nine locales.

1. **Five lifted chrome headings.** `pathTitle`, `holdsUpTitle`, `adjacentTitle` and both
   `checklistTitle`s were byte-identical to the `sections.*` / `cardLabels.*` fallback they
   override, which pins the heading to English everywhere. Deleted, so each falls back to
   its translated catalog string. The nine that genuinely diverge were kept and added to
   `PROSE_KEYS` — which also cleared the **15 unclassified field paths** `i18n_extract.mjs`
   was silently excluding. `artsProgram.ts`'s `askTitle` was dead (declared, never read) and
   was removed.
2. **Provenance rendering to readers.** "Compiled by: Claude Code deep research pass" was
   visible on the financial-aid page. The source used `**Provenance**` where every other
   school uses `## Provenance`, so ingest never made it its own subtopic and
   `INTERNAL_SUBTOPICS` in `src/lib/content.ts` could not see it. Fixed at the source (six
   sibling `###` promoted to `##` so the block stays bounded) and re-ingested.

### A second extraction path the plan did not anticipate

The plan's step 1 covers `src/data/**`. The **`src/content` overlay layer is separate**, has
no `guardExisting`, and held **zero** Gaston Day sections. Only `financial-aid-tuition`
carries live blocks (`student-clubs` reports 0 — every section is card-replaced), and it
needed its own hash-preserving merge. Verified by content — 971 strings with `iGEM`,
`Camp Spartan`, `Gastonia` present — not by a coverage number.

### `npm run check:runtime` was only ever checking French

It was pinned to `--lang fr` in `package.json`. This is the authoritative guard — the one
check that catches an overlay silently falling back to English while coverage reads 100% —
so **eight of nine locales were shipping unverified by it**. Now sweeps every locale in
`PROSE_TRANSLATED` via `scripts/check_runtime_all.mjs`; `check:runtime:one` keeps the
single-locale form. It found 7 orphaned entries on its first run (stale stamps from Phase
1's Carmel corrections), cleared by rebuilding.

### Defects found and fixed during translation

- **A dropped clause** in Kreyòl: the senior-capstone string lost "with documentation and
  reporting throughout — and carries 0.25 credit" entirely. Fluent output, missing a
  sentence — caught by comparing the multiset of numeric tokens against the English, not by
  `check:sepdrift`, which passed.
- **`Choice time`** left English in `hi` **and** `te` while six locales translated it and
  both translate every sibling label in the same card.
- **`Arts`** left English in `it` (now `Arti`), found by the cross-locale leak triage.
- An Arabic string spelling **`68` as words** rather than keeping the digits.
- Three Spanish entries an interrupted early run had filled with **raw English**.

### The browser print-out earned its place again

Panels forced open (40 `<details>` per locale, ~93k → ~108k chars). It found
**`Private lessons with contracted professional musicians`** rendering English in every
locale: it sits in `ensembles`, classified "proper noun — ensemble name" and skipped from
extraction. Coverage read 100% because the field was never extracted at all. This is the
**fourth** instance of the recorded shape — a field right for most values and wrong for a
few — after `value`, `tier` and `kind`.

Fixed at the data layer (`Private lessons`, detail moved to the already-prose `boardNote`)
rather than by flipping the path: `music.tracks[].ensembles` holds 95 values of which 91 are
genuine proper nouns, and the extractor matches by path suffix, so reclassifying would
re-open a topic complete in nine languages to translate ensemble names that must stay
English. **Four sibling occurrences remain** in cannon / charlotte-country-day /
davidson-day, recorded in `src/data/overlays/NOTES.md`.

### One documentation bug corrected

`NOTES.md` told Spanish translators to localize separators in prose figures
(`20,642` → `20.642`) — the exact re-typing `check:sepdrift` now rejects, and the likely
origin of the **178 drifted `es` tokens still open on `main`**. The rule postdates the note.
Corrected to state the char-for-char requirement, with the history recorded.

### Verification

`check:runtime` all 9 locales resolve (10,268 entries each) · `check:translations` 100%, no
drift · `check:sepdrift` 0 added drift (pre-existing: `es` 178, `ht` 1, `fa` 1) ·
`check:fr` · `check:hi` · `check:fa` · `check:bidi` · `check:script` · `check:currency` ·
`check:money` · `check:quals` · `check:schema` · `check:ranks` · `check:seo` · `tsc` ·
`npm run build` — all clean. Browser print-out on all 10 locales, panels open, RTL correct
for `fa`/`ar`, no pre-paint English flash.

### Left undone, deliberately

- The **178 pre-existing `es` drifted tokens** (unit conversions like `45,730 sq ft` →
  `4.248 m²`) — a defect on `main`, not introduced here.
- The **four remaining `ensembles` prose values** on other schools.
- **Native-speaker review** for Kreyòl and Hindi, which both still ship unreviewed.
