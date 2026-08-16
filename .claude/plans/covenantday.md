---
name: covenantday
title: Add Covenant Day School as the 7th school
status: english-done
phases: 2
created: 2026-08-15
branch: feat/add-covenant-day
prs: []
---

# Add Covenant Day School as the 7th school

## Goal

Add **Covenant Day School** (Matthews, NC) to the app as the seventh school, covering all
eight research areas. Research is fetched, persisted to `source-material/`, ingested, and
backfilled across every hand-maintained layer — so the school renders a full page, holds a
Compare column with real values, and gains a pre-rendered SEO page.

Done means: the school page renders eight research areas in English; the Compare table
shows Covenant Day values (and deliberate `null`s where data is confirmed absent);
`npm run build`, `check:metrics`, `check:seo` and `check:schema` all pass; and the prose is
translated into the nine locales in `PROSE_TRANSLATED`.

## Context

This plan follows a completed `/add-school` assessment (2026-08-15). **The coverage sweep
is done and the include/omit decisions are made** — do not re-run the sweep or re-litigate
the areas. The sweep was *reconnaissance* producing indicative figures; it deliberately
wrote **no** `source-material/`. Deep research is this plan's Phase 1, step 1.

**Assessment result: GO.** Against the bar of ≥17/30 Compare rows and ≥6/8 areas
(calibrated to Davidson Day, 17/30 and 7/8 — run `npm run coverage:floor` to recompute):

| Research area | Core prose | Structured card | Compare rows | Coverage | Verdict |
|---|--:|--:|--:|--:|---|
| Course Offerings | 1/1 | — | 3/3 | ~100% (4/4) | include |
| Student Clubs | 3/3 | 2/3 | 0/3 | ~56% (5/9) | include (thin rows) |
| The Arts | 3/3 | 4/5 | 4/4 | ~92% (11/12) | include |
| Sports | 11/14 | 5/7 | 2/2 | ~78% (18/23) | include |
| College Support | 8/8 | 4/6 | 8/8 | ~91% (20/22) | include |
| After School | 4/4 | 3/4 | 2/2 | ~90% (9/10) | include |
| Summer Programs | 1/1 | 2/2 | 4/4 | ~100% (7/7) | include |
| Financial Aid & Tuition | 1/1 | — | 2/4 | ~60% (3/5) | include |

Columns: core prose = card keys 5–6 of 6 existing schools hold; structured = card field
sets whose **required** fields are findable; Compare = rows with a specific published or
derivable number. **All figures are estimates** from a shallow sweep — ~26/30 Compare rows
and 8/8 areas, second-strongest candidate ever assessed behind Cannon and Providence Day
(29/30). A full research pass should go higher, not lower.

**The school.** Covenant Day School, Matthews, North Carolina (Charlotte metro).
Slug `covenant-day`. Site covenantday.org. Private Christian JK/TK–12, a ministry of
Christ Covenant Church (PCA). ~1,035–1,052 students, ~367 high school, 85 seniors.
CEEB code 342532. Finalsite CMS. Mascot: Lions.

**Code shape, verified 2026-08-15:**

- `topicsForSchool()` (`src/lib/manifest.ts:45`) filters to `docCount > 0`; `SchoolDetail.tsx:362`
  renders only those. A topic with no `source-material/` folder is **absent from the page
  entirely**. Davidson Day's missing Summer Programs is the live precedent, with
  explanatory comments at `SchoolDetail.tsx:645` and `:665`.
- **`SchoolDetail.tsx:605` is the direct precedent for the `affinity` omission** — it
  documents Davidson Day publishing no affinity roster and the card being omitted rather
  than rendered empty. Follow that comment's reasoning exactly.
- The six structured-card `PROGRAMS` maps are static `Record`s of explicit imports:
  `sportsProgram.ts:429`, `artsProgram.ts:362`, `clubsProgram.ts:280`,
  `collegeSupport.ts:423`, `afterSchool.ts:391`, `summerPrograms.ts:313`.
- `brandFor()` (`src/data/brands.ts:70`) falls back to `FALLBACK_COLOR = '#5b6472'`
  (`brands.ts:68`) plus initials from the name — graceful, but a generic badge.
- `TRANSLATED` is 10 locales; **`PROSE_TRANSLATED` is 9** (`src/lib/i18n.ts:182`):
  `es, bn, ht, te, fr, fa, it, hi, ar`. That is Phase 2's scope.
- `npm run build` = `tsc -b && vite build && prerender && seo:files && check:schema`.
  **`check:seo` is NOT in the build** — run it explicitly.

## Decisions

- **All eight research areas are included** — every area met or exceeded the ~50% per-area
  line, so no include/omit walk was needed.
- **The `affinity` card is omitted** — the school groups by discipleship (Chapel by age,
  student-led Bible studies, HS Advisory Groups, Homeroom Devotions, Missions), not
  identity. Confirmed-not-published against `/campus-life/student-life` and
  `/campus-life/discipleship`. Structurally absent, not a coverage failure.
- **`wholeClass` is omitted or shipped partial** — the school publishes averages and
  aggregate rates but never distributions, consistent across all three profile editions,
  following directly from its stated no-rank policy. A deeper pass will not recover it.
- **`top-tuition` uses 2026-27 ($22,790, grades 9-12)** — two tuition years are live at
  once; pick one explicitly or the Compare row silently disagrees with the prose beside it.
- **The HS Profile is primary for all course counts** — third-party AP counts conflict
  (PrivateSchoolReview says 15 then names 18; Niche said 21 and 16) and are overridden.
- **`pct-aid` (20%) is third-party only** — flag it (`verify`) or omit it; it must not be
  presented at the same confidence as the school-published tuition table.
- **No podcast episodes** — a new school has none, and that is fine. Do not invent entries.
- **Two-phase** — the school adds substantial research prose.

## Approvals needed

**None.** Adding a school needs no UX approval — per §6 of `DATA-SCHEMA.md` it is automatic
everywhere. The sweep found no material requiring a new card, section, or Compare row.

**If deep research surfaces material fitting no existing card**, that is a new card and
**does** need the user's approval before it is built. Surface it and wait; land the rest
meanwhile.

## Source material

**None written yet.** `/add-school` deliberately wrote no `source-material/` — its sweep
produced indicative figures, not the vetted record. Phase 1 step 1 does the real research
and persists everything under the data-provenance standard to:

```
source-material/<topic>/covenant-day/Covenant Day School - <Topic> - <Subtopic>.md
```

Each file needs a provenance header (who/when/how), the **source URLs**, and the
record-level detail behind every figure. Then ingest via the `ingest-source-material`
skill. Nothing enters the app that is not traceable to one of these files.

### Source URLs found by the sweep — the head start

**College Support** (highest value — the school profile PDFs):

- `https://resources.finalsite.net/images/v1758547252/covenant/x8i0qddxvctsp5jqbpmt/2025-26HSGuidanceProfile.pdf`
  — **most current** (cover reads 2026-2027). 85 seniors, 96% AP 3+, 5-yr AP + SAT/ACT
  trends, 2023–2026 acceptance list.
- `https://resources.finalsite.net/images/v1726168257/covenant/jg1wjr67fw5ewgwy5bkz/2024-2025HSGuidanceProfilefinal_1.pdf`
  — edition linked live; 2021–2024 acceptance list; Class of 2024 SAT 1243 / ACT 27.
- `https://resources.finalsite.net/images/v1695399666/covenant/zogqb5jfwbqp0henpd36/HighSchoolProfileFINAL9-12.pdf`
  — 2023-24; Class of 2023 SAT 1268 / ACT 26; 93% AP 3+; 2018–2023 acceptance list.
- `https://resources.finalsite.net/images/v1690917786/covenant/xhkxh3l7vry1xkhytyho/2023-2024HSGuidanceProfilefinal.pdf`
  — displays 2024-2025. **Also the Course Offerings source**: full HS course matrix
  (dept × CP/Honors/AP), dual-enrollment markers, grad requirements, weighted scale,
  39 teaching faculty, 1035 students / 367 HS, Class of 2024 AP data (168 students /
  344 exams, 35 Scholars w/ Distinction, 13 w/ Honor, 29 Scholars), varsity sport list,
  2021–2024 acceptance list (~350 institutions).
- `https://www.covenantday.org/fs/resource-manager/view/062375ff-cd17-49d9-9334-b194210f5f5f`
  — stable live link (302 → the 2024-25 PDF).
- `https://www.covenantday.org/academics/college-guidance` — counselor roster, bios,
  credentials, tenure.

**Course Offerings:** `https://www.covenantday.org/academics/high-school` ·
`https://www.covenantday.org/academics` (divisions are `lower-school` / `middle-school` /
**`high-school`** — `/academics/upper-school` 404s).

**Student Clubs:** `https://www.covenantday.org/campus-life/service` ·
`/campus-life/student-life` (traditions/retreats, **no club roster**) ·
`/campus-life/discipleship` · `/campus-life` (7 sub-pages, no clubs directory) ·
`https://www.privateschoolreview.com/covenant-day-school-profile` (**only** club roster,
27 items, third-party) · `https://ncmocktrial.org/compete/history/` (for chasing
`flagship-result`) · `https://www.niche.com/k12/covenant-day-school-matthews-nc/`
(403s to WebFetch).

**The Arts:** `https://www.covenantday.org/arts` · `/arts/visual-arts` · `/arts/music` ·
`/arts/theater` · `/arts/arts-association` (**unread** — possible participation stats).

**Sports:** `https://www.covenantday.org/athletics` · `/athletics/teams` ·
`/athletics/facilities` · `/athletics/strength-and-conditioning` (**unread** — likeliest
athlete-care home) · `/athletics/scheduleandscores` · `/athletics/lionsnews` (hub for all
signing/coach articles) · `.../2025fallsportshighlights1` ·
`.../seven-cds-students-celebrate-athletic-collegiate-commitments` (Nov 2024, 7 athletes) ·
`.../7-cds-students-celebrate-athletic-collegiate-commitments-2026` (Apr 2026, 7) ·
`.../8-cds-students-celebrate-athletic-collegiate-commitments` (Apr 2025, 8) ·
`.../5-cds-students-celebrate-athletic-collegiate-commitments-1763136645005` (**unread**,
in-window) · `.../6-cds-student-athletes-sign-national-letters-of-intent-1724265198114`
(**unread**) · `.../2-student-athletes-commit-to-d1-schools` (**unread**, explicitly D1) ·
`.../2026-spring-sports-highlights-1781042195259` (**unread**, likely the softball title) ·
`.../jordan-langs-named-head-varsity-football-coach` · `.../katie-johnson-…` ·
`.../mike-freace-begins-tenure-as-athletic-director` ·
`https://www.maxpreps.com/nc/matthews/covenant-day-lions/` · `.../football/history/` ·
`.../basketball/standings/` ·
`https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/`

**After School:** `https://www.covenantday.org/campus-life/extended-day` ·
`https://www.covenantday.org/admissions/faqs` (per-division bell/dismissal times, class sizes).

**Summer:** `https://www.covenantday.org/campus-life/summercamps` ·
`https://resources.finalsite.net/images/v1682640148/covenant/paxehweyjmvlplhjelub/2023SummerCampBrochure_42523.pdf`
(2023 policies: care prices/hours, sibling discount, refund schedule) ·
`https://www.covenantday.org/uploaded/My_School/Campus_Life/Photos/Summer_Camps/Summer_Camps_-_Camp_Descriptions.pdf`
(2018 full catalog — **only** source with per-camp price + hours + grades together) ·
`https://covenantdayschool.campbrainregistration.com` (live 2026 portal, JS-rendered) ·
`https://charlotte.kidsoutandabout.com/content/summer-camps-covenant-day-school`

**Financial Aid:** `https://www.covenantday.org/admissions/tuition-financial-aid` ·
`https://resources.finalsite.net/images/v1754326613/covenant/bhpp1ljaepvofjcqlxnh/2025-2026TuitionPaymentTermsandConditions.pdf`
(**highest-value single doc**: 2025-26 tuition table, both payment plans, all fees,
withdrawal + aid policy) ·
`https://projects.propublica.org/nonprofits/organizations/561656570` (confirms **no 990**) ·
`https://www.schooltuitions.org/school/matthews-nc-covenant_day_school` (corroborates 20% aid).

### Hard data already in hand

Use these as the research pass's starting point — **re-verify each against its source**
before writing it into a `source-material/` file; they come from a shallow sweep.

**Tuition** 2026-27: JK/K $15,490 · Gr 1-5 $17,790 · Gr 6-8 $20,490 · Gr 9-12 $22,790.
2025-26: JK/K $14,290 · Gr 1-5 $16,590 · Gr 6-8 $19,290 · Gr 9-12 $21,590.
Fees: $1,000 enrollment deposit, $50/yr FACTS monthly-plan fee, 3.05% card processing.
Discounts: $1,500 multi-child (3rd+), $400 Christ Covenant Church member. Payment plans:
Annual (full by May 1) or Monthly (nine installments, autopay 5th or 20th). Accepts NC
Opportunity Scholarship + ESA+ (NCSEAA); **proof of NC Opportunity application is a
mandatory aid prerequisite**.

**Extended Day** sessions end 3:00pm (JK/K) / 4:30pm / 6:00pm; free before-care from
7:30am. Monthly ladder: Drop In $20 · 1 day/wk $58 · 2 $112 · 3 $162 · 4 $206 · 5 $248.
*"Monthly rate applies to all months except August and December, which are exactly half."*
Annual table $522–$6,696 "for 10 Months". Dismissals: JK/K 1:30pm, Lower 3:00pm, Middle
3:10pm, High 3:15pm; **Wednesdays start 8:50am not 8:15am**.
→ `latest-pickup` = 6:00 p.m.; `aftercare-cost` = $248/month.

**Summer 2026** Weeks 1-8, June 1–July 31. ~19–20 camps named (school markets "29 camps" —
needs one reconciling pass). Grades JK-12/TK-12. Before Care $50/wk (7:30-8:45am), After
Care $50/wk (4:00-5:30pm), Lunch Care $30/wk (12-1pm); Camp Lion / Cub Camp include all
three free. Exchange fee $20, cancellation $35, $50 non-refundable registration included in
all camp costs. Sibling discount $50 half-day / $75 full-day. Early bird on/before Feb 27.
Third-party current range "$170-$325".

**College Support** 85 seniors · 96% of AP exams scored 3+ (2026) · 5-yr series
84/93/92/96/96% · 78% scored 4-5. Class of 2024 SAT 1243 / ACT 27; Class of 2023 SAT 1268 /
ACT 26. 26→28 National Merit Finalists, 61→70 Commended since 2006. Caseload 85:1 (85
seniors, 1 Guidance & College Counseling Director; plus 1 Guidance Counselor, 1 Clinical
Counselor). Mills named NACCAP K-12 Professional of the Year. **Two complete multi-year
acceptance lists** (2021–2024 and 2023–2026), each ~350+ institutions, **with bold denoting
actual matriculation** — so acceptances *and* yield are recoverable, and all seven bucket
rows are classifiable. They overlap at 2023–2024, so classification can be cross-validated.
Weighted GPA: 4.33 A+ scale, Honors +0.5, AP/DE +1.0. 25 Carnegie Units to graduate. No AP
for freshmen; sophomores max one AP. 80–81% of HS faculty hold advanced degrees. **No class
rank** (stated policy). Dual enrollment with Covenant College; SevenStar Academy online
partner. Accreditations: CSI, SACS/AdvancED, NCAIS.

**Sports** 18 teams (school) / 21 varsity (MaxPreps). 82% athletic participation. "More
than 26 state championship appearances" since 2006. 2025-26 softball NCISAA state title.
Boys soccer 1-seed, hosted final, lost 2-1 to Christ School; **ranked first nationally**
during an 8-game unbeaten streak (2025). Volleyball three straight 3A runner-up. 175+
collegiate athletes since 2006. Coaches: Mike Freace (AD), Michael Laney (Asst AD /
basketball), Chad Smith (S&C), Aja Teich (SID), Vanessa Laney, Rachael Klohr, David
Houseton, Julius Klohr, Mike Hawks, Bobby Wehane; dated hires Jordan Langs (football),
Katie Johnson (girls soccer). Facilities: Main Gym (800+), Auxiliary Gym, Fullwood Field,
Covenant Field (turf), Davis Track (4-lane 200m), Warner Park (27 acres), six tennis courts
+ pavilion, Webb Fitness Center (2015, gr.6-12).

**Arts** JK/TK-12 span; art integrated JK-K, sequential from grade 1. Blumey ledger: 2013
Best Featured Performer **win**, 2014 two nominations, 2016 Student Critic Award **win**,
2017 Best Ensemble, 2018 two, 2019 Best Actress. 2025 National Shakespeare Competition
finalist Caroline Garbarino. Music in the Parks adjudications 2021-2025. Ensembles (~9-10):
Lower general music + gr.5 intro; MS Band 6-8, MS Choir 6-8, MS Worship Band; HS Symphonic
Band, HS Choir, HS Worship Band; Tri-M Honor Society, CDS Children's Choir gr.3-5, HS A
Cappella. Visual path: Intro to Art → Art 2/3 (2D/3D) → Honors Studio Art → AP Studio Art,
plus Digital Photography, Graphic Design, Ceramics, Yearbook. Exhibits: ArtWalk, Art Talk
AP Art Exhibit, Pineville Art Show, Youth Art Month, Mint Hill Arts Competition. Advanced
arts coursework = AP Studio Art + Honors Studio Art (2, or 3 counting Auditioned Theater).

**Clubs** Mock Trial, Robotics / First Lego League, Junior First Lego League, Latin (JCL)
Club, French Club, Book Club, Sustainability Engineering, Beta Club. Honor societies: NHS,
National Art Honor Society, Spanish Honor Society, International Thespian Society (division
and what-each-recognizes **not found**). Traditions: Color War, Homecoming (Warner Park),
Spirit Week + all-school pep rally, Spirit Fridays, Covenant Crazies, Windy Gap 3-day
retreat, Kanuga 5th-grade overnight, Field Day. Academic signatures: Senior Capstone
Project, McKnight Oratory. Service: Goodness Gorillas (4th gr, "nearly twenty different
sites"), Doulos Day (MS, twice a year), ContainIt (HS, shipping-container housing, "more
than 30 teens" on Pine Ridge Reservation), Restore525. Partners: Matthews HELP Center,
Matthews Habitat for Humanity, Operation Christmas Child, Brookstone Schools, Alexander
Children's Home, Love INC. **No service-hour requirement or total published.**

**Distinctive:** "Restoration & Sustainability" is both a named HS department and a
differentiator in the college-support narrative.

## Out of scope

- **Deploying.** `npm run deploy` is the user's call, every time. This plan merges a PR; it
  does not publish.
- **Native-speaker review** of the nine translated locales.
- **Backfilling other schools** — this plan touches only `covenant-day` rows and files.
- **Any new card, section, Compare row, or metric key.** If research demands one, stop and
  get approval.
- **Podcast episodes** for the new school.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout -b feat/add-covenant-day` off an up-to-date `main`.

2. **Deep research pass, per included area.** Start from the URLs above; this is the real
   research the sweep deliberately did not do. Constrain every search to `covenantday.org`
   or "Matthews NC" — **"Covenant" collides with at least four unrelated schools** (Covenant
   School Charlottesville, Covenant Dallas, Covenant Christian Academy GA, Covenant College
   TN). A Patrick Estes NFL result belongs to one of those and was correctly excluded from
   `pros`; do not re-admit it.

   **Extract the profile PDFs locally with `pdftotext -layout`, not WebFetch.** All three
   use a custom-encoded font: body prose extracts as mojibake (`ŽǀĞŶĂŶƚĂǇ` = "Covenant
   Day"), which is why WebFetch reported them unreadable. **The numbers and the acceptance
   lists extract cleanly** — that is the part that matters.

   **Date every PDF edition by its cover text only.** Filenames and internal metadata are
   both wrong: `2025-26HSGuidanceProfile.pdf` has cover text reading **2026-2027** and
   metadata titled `2021-2022 HS Guidance Profile markup.pdf` (a stale reused template);
   `2023-2024HSGuidanceProfilefinal.pdf` **displays 2024-2025**. Anyone dating by filename
   or metadata mislabels all three.

   Targets worth chasing (all NOT-FOUND on a shallow pass, not confirmed absent):
   - **Arts `theatre` — named production titles.** `/arts/theater` lists production
     *categories* (MS Musical, HS Musical, Spring Drama, Theater Nights, Shakespeare
     Competition, NCTC) but no titles. Try the performance calendar and news archive.
     The card's *required* field is missing while its *optional* award ledger is rich.
   - **Summer per-camp prices/hours/grades for the current year** — behind the JS-rendered
     CampBrain portal. Try its session-list JSON endpoint or a current-year brochure.
   - **`counseling` grade-by-grade timeline** — try the parent handbook, course-planning
     guide, archived pages. Only fragments surfaced.
   - **`sports-medicine`** — fetch `/athletics/strength-and-conditioning` directly; it is
     the likeliest home for athletic-trainer / athlete-care detail.
   - **The four unread signing articles** — `d1-commits-2426` is a verified **floor**, not a
     total. Cheapest remaining win. Known: 2026 class 2 D1 (Jane Neil/Louisiana Tech, Ethan
     Welsh/ECU), 2025 class 1 D1 (Hamilton Huitt/Queens); the Nov-2024 article adds 3 more
     (Dirks/Gardner-Webb, Gardner/Davidson, Stanley/Wofford) if in-window.

   **Do not go hunting for these — they are confirmed absent** (see Risks for the full
   list): Form 990 figures, club participation %, affinity groups, GPA/score distributions,
   scholarship dollar totals, NCMEA/All-State honors.

3. **Persist everything to `source-material/`.** One `.md` per topic × subtopic at
   `source-material/<topic>/covenant-day/Covenant Day School - <Topic> - <Subtopic>.md`,
   each with a provenance header (who/when/how), source URLs, and the record-level detail
   behind every figure. Match the shape of an existing school's files.

4. **Ingest.** Run the `ingest-source-material` skill. It regenerates `.claude/docs/` notes,
   `src/data/schools.json` and `src/content/`. **First add `covenant-day` to `SCHOOL_NAMES`
   in `.claude/skills/ingest-source-material/build_docs.py:35`** or the school gets a
   slugified display name.

5. **Map subtopics onto existing metric keys** in `src/lib/metrics.ts`. Every new subtopic
   phrasing must resolve to an **existing** card key via a `RULES` entry. An unmatched
   subtopic **silently becomes its own card**, which is an unapproved UX change.
   `npm run check:metrics` reports unmatched subtopics — it must be clean.

6. **Backfill `src/data/metricValues.ts`** — a value or a deliberate `null` for
   `covenant-day` on **every one of the 30 Compare rows**. A missing key is an oversight;
   `check:metrics` tells the two apart. Known values include `latest-pickup` = 6:00 p.m.,
   `aftercare-cost` = $248/month, `top-tuition` = $22,790 (2026-27), `ap-performance` = 96%,
   `counselor-caseload` = 85:1, **`p4-commits-2426` = 0 (a confirmed value, not a gap)**.
   Deliberate `null`s: `aid-awarded`, `avg-award`, `participation`.
   Add `quals` provenance tooltips where the Q-flagged rows call for them.

   **Counting rules are decisions, not transcriptions — write the rule down** in the
   source-material file: `us-courses` (~90 course cells / ~65-70 distinct titles; "Biology"
   appears at CP, Honors **and** AP — state the de-duplication rule), `us-departments`
   (8 or 9 — Bible has 3.5 units of graduation requirement but no matrix row),
   `advanced-courses` (~17-20 AP; **the profile overrides all third-party counts**).
   For `us-organizations`, **do not use the third-party 27 as-is** — it mixes divisions
   (MS Board Game Club, Junior First Lego League, After School Children's Choir gr.3-5) and
   non-clubs (piano/voice lessons, men's volleyball); an Upper School count needs manual
   filtering and school-owned confirmation.

7. **Write the per-school structured-card files** for the six topics:
   `src/data/sportsPrograms/covenant-day.ts`, `artsPrograms/`, `clubsPrograms/`,
   `collegeSupportPrograms/`, `afterSchoolPrograms/`, `summer/covenant-day.ts`.
   **Omit `affinity`** from the clubs file (leave the optional field off entirely — see
   `SchoolDetail.tsx:605`, which documents exactly this for Davidson Day). **Omit or ship
   partial `wholeClass`** in college support. Sparse is worse than absent: prefer omitting a
   card to padding it with "not published"; where a real gap must be shown, use the topic's
   existing flag types (`gap` / `verify` / `estimate` / `stale`).

8. **⚠️ Wire the import in each `PROGRAMS` map** — `sportsProgram.ts:429`,
   `artsProgram.ts:362`, `clubsProgram.ts:280`, `collegeSupport.ts:423`,
   `afterSchool.ts:391`, `summerPrograms.ts:313`. Nothing auto-discovers these files.
   **Adding the per-school file without wiring the import is a silent no-op** — the school
   renders prose instead of cards and no check catches it.

9. **Backfill the remaining hand-maintained layers**, each a real step:
   `src/data/financialAidReports.ts` (the structured tuition/aid card — needs tuition bands,
   cost components priced/range/unpriced, the aid timeline, both payment plans),
   `src/data/courseOfferings.ts` (`OFFERINGS` — **high-school only**; no JK-5 or 6-8 named
   course lists surfaced, those pages describe competencies), `src/data/clubCatalog.ts`
   (`CATALOG`), `src/data/clubClusters.ts`.

10. **Add `covenant-day` to `src/data/brands.ts`** with a deliberate color and initials.
    `brandFor()` (`brands.ts:70`) falls back to slate `#5b6472` + derived initials, so
    omitting it is not a breakage — but the school ships with a generic badge and no crest.
    Covenant Day are the Lions; **verify the actual school colors** rather than assuming.

11. **Regenerate the schema doc** — `npm run schema`. `check:schema` **is** chained into
    `npm run build` and will fail until this runs, since a new school changes the schools
    table and the coverage matrix.

12. **Browser check** (see Verification). This repo's standing lesson is that every defect
    surviving the automated checks was render-layer.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope is the **overlay layer** for research prose, per `PROSE_TRANSLATED`
(`src/lib/i18n.ts:182`) — **nine locales**: `es, bn, ht, te, fr, fa, it, hi, ar`. This is
*not* the `src/locales/*.json` chrome catalog; a new school adds no new UI chrome keys.
Read `.claude/docs/prose-translation-architecture.md` for the mechanism rather than
re-deriving it, and the per-locale rollout docs for their traps.

13. **⚠️ HIGHEST-RISK STEP — add `covenant-day` to every hardcoded school list, BEFORE
    extracting.** These scripts hold literal `SLUGS` arrays and slug→export maps, and will
    **silently skip** a school that is missing. The failure mode is not a red check — it is
    a clean run that never looked, reporting 100% coverage on prose it never extracted.

    | Script | What to add |
    |---|---|
    | `scripts/i18n_extract.mjs:44,86` | `SLUGS` + `EXPORTS` map |
    | `scripts/check_translations.mjs:34,75` | `SLUGS` + `EXPORTS` map |
    | `scripts/check_chrome_keys.mjs:35,48` | `SLUGS` + `EXPORTS` map |
    | `scripts/i18n_audit_skips.mjs:35,48` | `SLUGS` + `EXPORTS` map |
    | `scripts/check_live_resolution.mjs:50` | `EXPORTS` map |
    | `scripts/i18n_fields.mjs:339,350,362` | per-slug `values.<slug>` / `subs.<slug>` / `quals.<slug>.kind` paths |

    The export name follows the existing convention (`davidson-day` → `davidsonDay`), so
    `covenant-day` → `covenantDay`. The repo has been bitten by exactly this shape —
    `check_translations.mjs:53` records that Summer Programs *"was invisible here until it
    was added, at 0% coverage."* **Treat a 100% coverage report on Covenant Day as suspect
    until you have confirmed its slug is in all six**, and verify by checking that the
    school's strings actually appear in the extracted work files rather than trusting a
    green run.

14. **Extract, translate, build the overlays** for the nine locales, following the rollout
    docs. Figures are copied **char-for-char** from the English source and never re-typed —
    a parent matches them against the school's own page. Locale-specific traps the docs
    record: lakh/crore regrouping for `hi`/`te` (the data must still store the English
    3-3-3 figure), RTL bidi isolates for `fa`/`ar`, French identifiers, separator drift.

15. **Run the full locale check suite** (see Verification).

## Files touched

| File | Change |
|---|---|
| `source-material/<topic>/covenant-day/*.md` | new — the research record, one per subtopic |
| `.claude/skills/ingest-source-material/build_docs.py` | edit — add to `SCHOOL_NAMES` (:35) |
| `src/data/schools.json` | regenerated by ingest — adds the school |
| `src/content/**` | regenerated by ingest |
| `.claude/docs/**` notes | regenerated by ingest |
| `src/lib/metrics.ts` | edit — `RULES` entries mapping new subtopic phrasings to existing keys |
| `src/data/metricValues.ts` | edit — a value or deliberate `null` on all 30 rows, plus `quals` |
| `src/data/sportsPrograms/covenant-day.ts` | new |
| `src/data/artsPrograms/covenant-day.ts` | new |
| `src/data/clubsPrograms/covenant-day.ts` | new — **no `affinity` field** |
| `src/data/collegeSupportPrograms/covenant-day.ts` | new — `wholeClass` omitted or partial |
| `src/data/afterSchoolPrograms/covenant-day.ts` | new |
| `src/data/summer/covenant-day.ts` | new |
| `src/data/sportsProgram.ts` | edit — import + `PROGRAMS` entry (:429) |
| `src/data/artsProgram.ts` | edit — import + `PROGRAMS` entry (:362) |
| `src/data/clubsProgram.ts` | edit — import + `PROGRAMS` entry (:280) |
| `src/data/collegeSupport.ts` | edit — import + `PROGRAMS` entry (:423) |
| `src/data/afterSchool.ts` | edit — import + `PROGRAMS` entry (:391) |
| `src/data/summerPrograms.ts` | edit — import + `PROGRAMS` entry (:313) |
| `src/data/financialAidReports.ts` | edit — new `REPORTS` entry |
| `src/data/courseOfferings.ts` | edit — new `OFFERINGS` entry (HS only) |
| `src/data/clubCatalog.ts` | edit — new `CATALOG` entry |
| `src/data/clubClusters.ts` | edit — new entry |
| `src/data/brands.ts` | edit — color + initials |
| `.claude/docs/DATA-SCHEMA.md` | regenerated by `npm run schema` |
| `scripts/i18n_extract.mjs` | edit — `SLUGS` + `EXPORTS` (Phase 2) |
| `scripts/check_translations.mjs` | edit — `SLUGS` + `EXPORTS` (Phase 2) |
| `scripts/check_chrome_keys.mjs` | edit — `SLUGS` + `EXPORTS` (Phase 2) |
| `scripts/i18n_audit_skips.mjs` | edit — `SLUGS` + `EXPORTS` (Phase 2) |
| `scripts/check_live_resolution.mjs` | edit — `EXPORTS` (Phase 2) |
| `scripts/i18n_fields.mjs` | edit — per-slug paths (Phase 2) |
| `src/data/overlays/**` | new — nine locale overlays (Phase 2) |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run check:metrics` — **no unmatched subtopics** (an unmatched one is an
      unapproved new card) and no Compare gaps; confirms `null` vs missing
- [ ] `npm run check:schema` — passes after `npm run schema`
- [ ] `npm run check:quals` · `npm run check:spans` · `npm run check:sources` — clean
- [ ] `npm run check:podcast` — passes (validates one-directionally; a school with no
      episodes passes silently, which is correct here)
- [ ] `npm run build` — succeeds
- [ ] **`npm run check:seo`** — explicitly, since it is **not** in the build. Watch the
      `MIN_BYTES = 20_000` floor (`check_seo.mjs:34`) — a thin new school can pre-render
      under 20 KB and fail. Also needs a meta description ≥70 chars (`:98`) and the school
      name present in the markup. Covenant Day is data-rich so this is lower risk, but check.
- [ ] `npm run coverage:floor` — Covenant Day appears; confirm its fill rate is at or above
      the ~26/30 the sweep estimated, and that the floor school is unchanged
- [ ] **Browser check on `/school/covenant-day`** — all eight research areas render; the
      omitted `affinity` card is **absent, not empty**; the Compare column shows values and
      N/A where expected; the badge is a real brand, not a fallback slate square; the
      structured cards render (if a topic shows prose where a card was expected, the
      `PROGRAMS` import in step 8 was missed)

### Phase 2 — Locales

- [ ] **Confirm `covenant-day` is in all six script lists** before trusting any coverage
      number, and that its strings appear in the extracted work files
- [ ] `npm run check:translations` — coverage per locale
- [ ] `npm run check:runtime` — every overlay stamp resolves against live `src/data/**`
- [ ] `npm run check:live` · `npm run check:hashes` — clean
- [ ] `npm run check:sepdrift -- --lang <code>` per locale — no re-typed figures
- [ ] `npm run check:currency` · `npm run check:money` — no bypassed `localizeMoneyText()`
- [ ] `npm run check:bidi` · `npm run check:fa` — RTL isolates for `fa`/`ar`
- [ ] `npm run check:hi` · `npm run check:fr` · `npm run check:script` — locale-specific
- [ ] `npm run i18n:leaks` — no English leaking into a locale
- [ ] **Browser print-out of the Covenant Day page** with panels force-expanded, in a real
      browser, per the rollout docs — a default page renders ~17k chars, expanded ~152k, and
      the financial-aid figures live in the collapsed sections

## Risks

| Risk | Mitigation |
|---|---|
| **i18n scripts silently skip the new school** — a clean run reporting 100% on prose never extracted | Step 13 is a gate: add the slug to all six lists *before* extracting, then verify strings appear in the work files. Never trust the green run alone. |
| **Structured-card file added without the `PROGRAMS` import** — silent no-op, no check catches it | Step 8 lists all six line numbers; the browser check in Phase 1 catches it (prose renders where a card was expected). |
| **PDF editions mislabeled by year** — filenames and metadata both lie | Date by cover text only. Recorded in step 2 with the three specific contradictions. |
| **PDF text extracts as mojibake** | Use `pdftotext -layout` locally, not WebFetch. Numbers and acceptance lists extract cleanly. |
| **Tuition year ambiguity** — site shows 2026-27, payment PDF shows 2025-26 | Decided: `top-tuition` = $22,790 (2026-27). Keep the prose beside it on the same year. |
| **Wrong "Covenant" school** — four unrelated schools share the name | Constrain every search to `covenantday.org` or "Matthews NC". The Patrick Estes NFL result belongs to another school. |
| **Third-party figures presented at primary confidence** | `pct-aid` 20% is aggregator-only (school's own page is silent) — flag `verify` or omit. The 27-item club roster is not school-owned and mixes divisions. Profile PDF overrides all third-party AP counts. |
| **Pre-rendered page under the 20 KB SEO floor** | Run `check:seo` explicitly; it is not in `npm run build`. |
| **An unmatched subtopic silently becomes a new card** = unapproved UX change | Step 5 maps every phrasing onto an existing key; `check:metrics` must be clean. |
| **Research surfaces material fitting no existing card** | Stop and get the user's approval before building it. Land everything else meanwhile. |

### Confirmed-not-published — write deliberate `null`s, do NOT research these

Each was checked against the relevant page. These are confirmed absences, not gaps. Burning
a research pass rediscovering them is the specific waste this section exists to prevent.

1. **`aid-awarded` and `avg-award` — structural dead end.** Covenant Day is a ministry of
   Christ Covenant Church (PCA); the IRS designates it a **religious organization not
   required to file Form 990**. Verified on ProPublica (EIN 56-1656570, tax-exempt since
   June 1989): *"Nonprofit Explorer has no Form 990 data for Covenant Day School Inc."*
   GuideStar, Cause IQ and Charity Navigator will be equally empty. **Every other school in
   this project is a 990 filer — this is a first for the roster.** No 990 exists to find.
2. **`participation` (Student Clubs)** — no participation % on any school page or
   aggregator; PrivateSchoolReview explicitly carries none.
3. **`affinity` card** — the school's grouping model is faith/structure-based, not identity.
   Omit the card.
4. **`wholeClass` distributions** — averages and aggregate rates only, never distributions,
   across all three profile editions; follows from the stated no-rank policy.
5. **Scholarship dollar totals** — checked across three profiles, the news feed, and two
   targeted searches. Qualitative claims only.
6. **NCMEA / All-State music honors** — explicitly absent from the arts/music page.
7. **`p4-commits-2426` = 0 is a CONFIRMED VALUE, not a gap.** 15 commits verified across
   the two in-window signing classes, zero Power Four; ceiling is D1 mid-major (Louisiana
   Tech, East Carolina, Gardner-Webb, Davidson, Wofford, Queens). This also substantively
   explains why `nil` and `recruiting` (top-100) are empty — that coverage tracks P4
   pipelines. Do not treat those as research failures.

## Open questions

- **`wholeClass`: omit entirely, or ship partial?** The aggregate tables are strong (5-yr AP
  series, SAT/ACT averages, AP Scholar tiers) but the required distributions are absent.
  **Default:** ship it partial with the aggregate tables and a `gap` flag, since the
  material is genuinely useful; omit if it reads as padded.
- **Do LS/MS course lists exist?** Only the HS matrix surfaced. **Default:** ship
  `courseOfferings.ts` high-school-only and note the scope in the entry.
- **Reconcile "29 camps" (marketing) against ~19–20 named on the page.**
  **Default:** use the count actually enumerable from the page and note the discrepancy.
- **Team count: 18 (school) vs 21 varsity / 50 total (MaxPreps).** Per-sport V/JV/MS levels
  are stated only in aggregate, so the `offered` card needs the 18 team pages walked.
  **Default:** use the school's own figure, walk the team pages for levels.
- **Covenant Day's exact brand colors.** **Default:** verify from the site; if genuinely
  unavailable, pick from the Lions' navy/gold and say so in the PR.
