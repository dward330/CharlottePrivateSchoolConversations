---
name: add-carmel-christian
title: Add Carmel Christian School as the 8th school
status: english-done
phases: 2
created: 2026-08-16
branch: feat/add-carmel-christian
prs: []
---

# Add Carmel Christian School as the 8th school

## Goal

Add **Carmel Christian School** (Matthews, NC) to the app as the eighth school, covering
all eight research areas. Research is fetched, persisted to `source-material/`, ingested,
and backfilled across every hand-maintained layer — so the school renders a full page,
holds a Compare column with real values, and gains a pre-rendered SEO page.

Done means: the school page renders eight research areas in English; the Compare table
shows Carmel Christian values (and deliberate `null`s where data is confirmed absent);
`npm run build`, `check:metrics`, `check:ranks`, `check:seo` and `check:schema` all pass;
and the prose is translated into the nine locales in `PROSE_TRANSLATED`.

## Context

This plan follows a completed `/add-school` assessment (2026-08-16), including a **deep
pass on Student Clubs**. **The coverage sweep is done and the include/omit decisions are
made** — do not re-run the sweep or re-litigate the areas. The sweep was *reconnaissance*
producing indicative figures; it deliberately wrote **no** `source-material/`. Deep
research is this plan's Phase 1, step 2.

**Assessment result: GO.** Against the bar of ≥17/30 Compare rows and ≥6/8 areas
(calibrated to Davidson Day, 17/30 and 7/8 — run `npm run coverage:floor` to recompute):

| Research area | Coverage (est.) | Verdict | The data |
|---|--:|---|---|
| Course Offerings | ~100% (4/4) | include | Published 2026-27 HS Curriculum Guide (Calameo); 16 AP courses; ~9 departments |
| After School | ~100% | include | "Grow and Go" Extended Day, fully published handbook: 6pm pickup, $245/mo 5-day |
| Summer Programs | ~100% (5/5) | include | "Summer Adventures": 6 weeks, ~36 named camps, $180/wk — Davidson Day has none |
| College Support | ~87% (13/15) | include | 200+ acceptance list, AP data (73% scored 3+), named counselor |
| Sports | ~83% | include | ~28 teams, basketball state title, Bryce Slay NIL, ≥4 D1 commits |
| The Arts | ~70% (7/10) | include | K–12 span, 2026 Blumey Best Actress win, theatre seasons |
| Student Clubs | ~65% (5–6/9) | include | Deep pass done: honor societies + student govt + signature programs; media/affinity absent |
| Financial Aid & Tuition | ~50% (3/6) | include | Tuition fully published (top $18,750); aid stats thin |

Columns follow the `/add-school` schema: core prose = card keys 5–6 of 7 existing schools
hold; structured = card field sets whose **required** fields are findable; Compare = rows
with a specific published or derivable number. **All figures are estimates** from a shallow
sweep plus one deep pass — ~23/30 Compare rows and 8/8 areas viable. A full research pass
should go higher, not lower. Carmel Christian would land mid-pack, stronger than Davidson
Day (56%) and Charlotte Christian (80%).

**The school.** Carmel Christian School, Matthews, North Carolina (Charlotte metro).
Slug `carmel-christian`. Site carmelchristian.org. Private Christian K–12, a ministry of
Carmel Baptist Church (founded 1993). ~1,130 students. NCISAA 4A. Mascot: Cougars.
AD: Grant Coffey. Finalsite CMS (`apps/pages/index.jsp?uREC_ID=...` URL shape).

**Welcome Video** (decided in `/add-school`): embed URL
`https://www.youtube.com/embed/0ILLfsxWGYg` (user pasted `youtu.be/0ILLfsxWGYg`, confirmed
twice). Goes in the `brands.ts` entry as `welcomeVideoUrl`.

**Code shape, verified 2026-08-16:**

- `topicsForSchool()` (`src/lib/manifest.ts:46`) filters to `docCount > 0`; the school page
  renders only those. A topic with no `source-material/` folder is **absent from the page
  entirely**. Davidson Day's missing Summer Programs is the live precedent.
- **`SchoolDetail.tsx:604-605` is the direct precedent for the `affinity` omission** — it
  documents Davidson Day publishing no affinity roster and the card being omitted rather
  than rendered empty ("A school with no data for a card omits it entirely rather than
  rendering it empty"). Follow that reasoning exactly, and it applies equally to the
  `media` card here.
- The six structured-card `PROGRAMS` maps are static `Record`s of explicit imports:
  `sportsProgram.ts:430`, `artsProgram.ts:363`, `clubsProgram.ts:281`,
  `collegeSupport.ts:435`, `afterSchool.ts:392`, `summerPrograms.ts:314`.
- `brandFor()` falls back to slate `#5b6472` + initials from the name — graceful, but a
  generic badge. Existing initials in use: `CA` (Cannon), `CC` (Charlotte Christian),
  `CD` (Charlotte Country Day), `CL` (Charlotte Latin), `CV` (Covenant Day), `DD`
  (Davidson Day), `PD` (Providence Day). **`CC` and `CA` are both taken** — see Decisions.
- `TRANSLATED` is 10 locales; **`PROSE_TRANSLATED` is 9** (`src/lib/i18n.ts:182`):
  `es, bn, ht, te, fr, fa, it, hi, ar`. That is Phase 2's scope. A new school adds **no**
  new UI-chrome keys, so the `src/locales/*.json` catalogs are untouched.
- `npm run build` runs `tsc -b && vite build && prerender && seo:files && check:schema`.
  **`check:seo` is NOT in the build** — run it explicitly.

## Decisions

- **Build each card to the FULLEST structure its data supports — mirror the richest school
  for that area, not one fixed template.** Covenant Day is used below only as a *mechanical*
  reference (where a file lives, how a `PROGRAMS` import is wired) because it is the most
  recent add — **it is NOT the content model.** Covenant Day is a thin school; copying its
  depth would cap Carmel Christian below what its data can fill. For each area, look at the
  **fullest existing example** — Providence Day, Charlotte Latin and Cannon are the deep,
  complete ones (96% Compare fill) — and populate every optional card field, stat tile,
  season/ledger row, funnel stage and sub-card that Carmel Christian has real data for.
  A field is left off **only** where the data genuinely is not published (then it follows
  the absence-not-emptiness rule), never because a thinner school happened to leave it off.
  Concretely: Sports, College Support, After School, Summer Programs, The Arts and Course
  Offerings should mirror the **full** structure (Carmel Christian is data-rich in all six);
  Student Clubs and the aid-stats half of Financial Aid are the two places a thinner
  treatment is correct, because the data is confirmed thin — see below.
- **All eight research areas are included** — every area met or exceeded the ~50% per-area
  line. Student Clubs started at ~44% and was taken to a **step-5 deep pass**, which raised
  it to ~65% and, more importantly, converted several *not-founds* into confirmed absences.
- **Brand initials: `CM`** (not `CC`/`CA`, both taken). `CM` reads naturally as CarMel and
  is unambiguous. Verify the school's actual colors (navy/red is indicated); if genuinely
  unavailable, pick from navy/red and say so in the PR. Add a code comment noting why `CC`
  was avoided, mirroring the existing `CV` comment (`brands.ts:59`).
- **The `media` card is omitted** — the deep pass confirmed no yearbook, newspaper, or
  literary magazine on any source (only a *Broadcast Journalism* MS elective). Only 2/7
  existing schools carry `media`, so its absence is not a gap. Omit the card (leave the
  field off the data file), don't render it empty.
- **The `affinity` card is omitted** — the school groups student life around faith/ministry
  (missions, Windy Gap, chapel worship, prayer events), not identity. Confirmed absent
  across handbook + site + aggregators. Only 4/7 schools carry `affinity`. Omit per
  `SchoolDetail.tsx:604-605`.
- **Student Clubs is honest-but-thin by design.** Clubs at Carmel Christian are
  *student-initiated by application* (stated in the family handbook), so there is no
  standing roster to publish. Build the `honors` (NHS, National Beta Club, NJHS, Spanish
  Honor Society), student-government, service and signature-program content that IS
  documented. `us-organizations` Compare tops out at a defensible **~4–5** — a low but
  honest number, not a `null`.
- **`p4-commits-2426` = 0** is a confirmed value, not a gap — the two top prospects (Cody
  Peck, Bryce Slay) held P4 offers but committed to mid-majors (Dayton A10, Marshall Sun
  Belt). Re-verify during research, but treat 0 as the expected answer.
- **`top-tuition` uses 2026-27 ($18,750, grades 9–12)** from the published fee PDF. Keep
  the prose beside it on the same year.
- **`pct-aid` (20%) is third-party only** (PrivateSchoolReview) — flag it (`verify`) or
  omit; it must not be presented at the same confidence as the school-published tuition
  table.
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
produced indicative figures, not the vetted record. Phase 1 step 2 does the real research
and persists everything under the data-provenance standard to:

```
source-material/<topic>/carmel-christian/Carmel Christian School - <Topic> - <Subtopic>.md
```

Each file needs a provenance header (who/when/how), the **source URLs**, and the
record-level detail behind every figure. Then ingest via the `ingest-source-material`
skill. Nothing enters the app that is not traceable to one of these files.

### Source URLs found by the sweep — the head start

**Course Offerings:**
- `https://www.carmelchristian.org/apps/pages/index.jsp?uREC_ID=587939&type=d&pREC_ID=1133088`
  (HS Curriculum page — AP count, departments)
- `https://www.calameo.com/read/003203619b939a7cb178b` (**26-27 HS Curriculum Guide** —
  the full catalog with course descriptions; JS-rendered, transcribe from the Calameo
  reader; exact per-course/dept totals live here)

**Student Clubs** (incl. the deep pass):
- `https://carmelchristian.org/pdf/carmel_parent/Family%20Handbook-Final.pdf` — **the
  authoritative source.** Its "Clubs, Associations and Extra-Curricular Activities" section
  lists the honor societies + student government and states the student-initiated model.
  **Parse with `pdftotext`, not WebFetch** (WebFetch returned it as an unreadable binary;
  `pdftotext` extracted it cleanly in the deep pass).
- `https://www.privateschoolreview.com/carmel-christian-school-profile/28105` (third-party
  "14 extracurriculars" — school-wide, mixes arts/honor-societies; do NOT use as an Upper
  School club count)

**The Arts:**
- `https://carmelchristian.org/arts/` (K–12 arts hub)
- `https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=910928&id=0` (2024-25 season:
  Seussical KIDS / Lion King Jr / Oklahoma!)
- `https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=791781&id=0` (Blumey noms —
  Singin' in the Rain)
- `https://www.wfae.org/arts-culture/2026-05-18/blumey-awards-winners-announced` (2026
  Blumey **Best Actress WIN** — Anna Jernigan)
- `https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-nominees-finalists-for-2026-blumey-awards`
- `https://www.axios.com/local/charlotte/2026/05/11/finalists-named-for-charlotte-s-high-school-theater-awards`

**Sports:**
- `https://www.carmelchristianathletics.org/` and `/inside-athletics/` (full sports-offered
  list, V/JV/MS by season, ~28 teams)
- `https://carmelchristian.org/athletics101`
- `https://www.maxpreps.com/nc/matthews/carmel-christian-cougars/`
- `https://www.highschoolot.com/story/christ-school-edges-carmel-christian-for-ncisaa-4a-boys-basketball-title/20736737/`
  (2023 4A final)
- `https://www.highschoolot.com/story/providence-day-shuts-out-carmel-christian-for-third-straight-ncisaa-4a-girls-soccer-championship/22359052/`
  (2026 girls soccer runner-up)
- `https://247sports.com/player/cody-peck-46150042/` (2026, 6'10", 4-star, P4 offers →
  Dayton)
- `https://prephoops.com/player/bryce-slay/` · `https://n.rivals.com/content/athletes/bryce-slay-298362`
  (Marshall commit, NIL)
- `https://www.wcnc.com/article/sports/basketball/charlotte-basketball-player-signs-historic-nil-deal/275-cc45809a-3f77-4da9-9096-f94ff40c4a64`
  (Bryce Slay NIL story)
- `https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=999101&id=0` (**Class of 2026
  Athletic Signing** — the roster to walk for the full D1 commit count)

**College Support** (highest value):
- `https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487269&type=d` (**College
  Acceptances** — 200+ named institutions; no timeframe/bucket counts stated, so bucket the
  names yourself)
- `https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487268&type=d` (Guidance Staff —
  counselor names; Marsha Berry is the dedicated college counselor)
- `https://www.carmelchristian.org/apps/news/show_news.jsp?REC_ID=896723&id=0` (**AP Honor
  Roll** — 73% of seniors scored 3+ on ≥1 AP, 80% took ≥1, 19% took 5+, 14 AP courses / 21
  sections / 12 teachers, Platinum)
- `https://carmelchristian.org/pdf/2022-23_Carmel_Christian_High_School_Profile__.pdf`
  (school profile PDF — **404s now**; a current-year edition exists, RELOCATE it — see the
  nulls-to-resolve list)
- `https://carmelchristian.org/pdf/College_tips_and_Information_for_HS_Students.pdf`
  (application-support guidance)

**After School:**
- `https://carmelchristian.org/extended-day` ("Grow and Go")
- `https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487137&type=d&pREC_ID=1082888`
  (After School Care — hours)
- `https://www.carmelchristian.org/pdf/Extended_Day%20Handbook_26-27.pdf` (**pricing +
  hours** — a scanned/image PDF; the authoritative cost source)

**Summer Programs:**
- `https://carmelchristian.org/summer-adventures`
- `https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487146&type=d&pREC_ID=1106980`
  (**Camp Descriptions** — ~36 named camps, grade bands, weekly pricing)

**Financial Aid & Tuition:**
- `https://www.carmelchristian.org/apps/pages/index.jsp?uREC_ID=503176&type=d` (Tuition &
  Financial Aid landing)
- `https://www.carmelchristian.org/pdf/2026-2027%20Tuition%20and%20Enrollment%20Fees_web.pdf`
  (**published tuition table** — the highest-value single doc)
- `https://projects.propublica.org/nonprofits/organizations/562107877` (Carmel Educational
  Foundation 990, EIN 56-2107877 — related, not the school itself)

### Hard data already in hand

Use these as the research pass's starting point — **re-verify each against its source**
before writing it into a `source-material/` file; they come from a shallow sweep.

**Course Offerings.** 16 AP courses; ~9 departments (Bible, English, Math, Science, Social
Studies, World Languages, Health & Fitness, Arts, Electives). Full course list is inside
the Calameo 2026-27 guide — transcribe for the `us-courses` / `us-departments` counts.
Write down the de-duplication rule (a subject taught at CP/Honors/AP is one title or three?
— match how the existing schools were counted).

**After School.** "Grow and Go" Extended Day. Latest pickup **6:00 p.m.** (After School
3:00–6:00; Young Cougars Club 1:15–3:00; Before School 7:30–8:00 a.m.). Published rates
(handbook, no inquiry gate): After School/After YCC **$245/mo 5-day, $190/mo 3-day, $30/day
drop-in**; YCC $230 / $175; Before School $110/mo. Late pickup fee $10 per 10 min.
→ `latest-pickup` = 6:00 p.m.; `aftercare-cost` = **decide the row's definition** — see the
Covenant Day precedent (that row is highest-band × latest-pickup × 5 days; confirm what the
existing schools' values represent before writing Carmel's).

**Summer Programs.** "Summer Adventures", June 8–July 23 2026, **6 weeks** (weeks 2–3 are
3-day). Half-day Mon–Thu 9:00 a.m.–12:00 p.m. Rising K–8. ~**36 named camps** across the 6
weeks. Pricing **$180/wk** ($150 short weeks); After Camp Lunch Hour 12–1 p.m. +$40/wk
($30 short). Wrap-around care is limited to that 1-hour lunch add-on — no full before/after
camp care published. → all four summer Compare rows populatable (`summer-weeks` 6,
`summer-camps` ~36, `summer-ages` rising K–8, `summer-care-span` = the 1-hr lunch add-on).

**College Support.** AP: **73% of seniors scored 3+ on ≥1 AP exam** (note the nuance — this
is "% scoring 3+ on at least one exam," not a per-exam pass rate; confirm how the existing
schools' `ap-performance` values are defined before writing it), 80% took ≥1, 19% took 5+;
14 AP courses / 21 sections / 12 teachers; Platinum AP Honor Roll. Dedicated college
counselor Marsha Berry (+ academic advisor, HS personal counselor, ES/MS counselor —
4 total, but only 1 dedicated to college). **200+ college acceptance list** published (no
timeframe or per-bucket counts stated — you bucket the names into ivy / ivyplus / nu75 /
lac75 / p4 / hbcu). Named acceptances already spotted span the buckets: Princeton, Duke,
Vanderbilt (ivy/ivyplus); UNC, UVA, Georgia Tech, NYU, Wake Forest (nu75); Davidson,
Washington & Lee, Furman, Rhodes (lac75). Third-party secondary stats (**unverified**,
override with the profile PDF once relocated): ~SAT 1220 / ACT 29 / GPA 3.67.

**Sports.** ~28 MS+HS teams (full V/JV/MS list on the athletics site). Championships: boys
basketball 2019 NCISAA 3A champ, 2022 title, 2023 4A final loss to Christ School (53–48);
boys soccer 4 straight finals through 2022; girls soccer 2026 4A runner-up (lost 2–1 to
Providence Day, finished 14–5). NIL: **Bryce Slay** (G, 2025, 6'6", Marshall commit),
historic NIL deal (College HUNKS), son of ex-NBA Tamar Slay. D1 commits (a **floor** of ≥4,
not a total): Cody Peck ('26, 6'10", 4-star ~#68 nat'l, held NC State/Wake/LSU/SMU offers →
**Dayton**, A10), Bryce Slay (**Marshall**, Sun Belt), Jordan Buzzard (**Coastal Carolina**),
Logan Johnson (**UNC Asheville**). `p4-commits-2426` = **0** (top prospects took mid-majors).
Walk the Class-of-2026 Athletic Signing article for the full D1 count. THIN: coaches roster,
facilities (Alumni Gym referenced; no facilities page found).

**The Arts.** K–12 span. **2026 Blumey Awards Best Actress WIN** — Anna Jernigan (Ariel in
*Footloose*); plus Best Actor finalist James Coleman (Ren) and a Best Choreography nom for
*Footloose*. Earlier Blumey noms: Darien Pisacano (Best Actress), Dylan Wilson (Best Actor)
for *Singin' in the Rain*. 2024-25 season: *Seussical KIDS* (5th gr), *Lion King Jr* (MS),
*Oklahoma!* (HS). Ensembles confirmed: band, choir, student worship band (no orchestra
confirmed; no named-ensemble roster published). Advanced-arts-course count and arts
facilities not published as such. → `program-span` and `signature-recognition` (the Blumey
win) populatable; `advanced-arts-coursework` and `ensembles` Compare rows likely `null`.

**Student Clubs** (deep pass — authoritative, from the family handbook). Honor societies:
**NHS, National Beta Club (gr. 10–12), National Junior Honor Society (MS, 8th gr), Spanish
Honor Society**. Student government: Student Council (HS), SGA (MS, 9 students gr. 6–8).
Signature programs/traditions: J-term / mission trips (incl. international HS trips), Windy
Gap Retreat (fall spiritual retreat), Ignite Praise Band (chapel worship), See You at the
Pole, Spirit Week / Homecoming, Timothy Project, Cornerstone Prayer Ministry. Service:
implied via Timothy Project + missions (no service-hour requirement or total published).
Lower/Extended-Day: Young Cougars Club, Enrichment Classes incl. a Chess Enrichment Class,
Junior Athletic Clinics, STEM Lab, Field Day. **Upper School organization count = ~4–5**
(the named standing bodies + a documented create-a-club-on-application mechanism).
**Confirmed absent** (deep pass, not a search failure): publications/media, affinity groups.

**Financial Aid & Tuition.** Tuition (2026-27 PDF, no inquiry gate): **K $12,500 · Gr 1-5
$14,400 · Gr 6-8 $17,100 · Gr 9-12 $18,750** (+$550 tech fee in 9th, +$200 senior fee);
$500 enrollment fee; $600/child discount for Carmel Baptist Church members and for the 3rd+
child. Aid via FACTS; references NC Opportunity Scholarship. → `top-tuition` = **$18,750**.
Aid stats: only third-party 20%-on-aid (PrivateSchoolReview, **not** school-confirmed); no
total aid or average award anywhere. **Form 990: the school is church-exempt** (ministry of
Carmel Baptist) so files none; a related **Carmel Educational Foundation** (EIN 56-2107877)
files one (FY Jul 2025: revenue $1,068,745, expenses $618,023, net assets $1,894,088, no
scholarship line) — connection probable but not explicitly stated, so it does not yield a
school-level aid figure.

## Out of scope

- **Deploying.** `npm run deploy` is the user's call, every time. This plan merges a PR; it
  does not publish.
- **Native-speaker review** of the nine translated locales (the user handles these over
  time).
- **Backfilling other schools** — this plan touches only `carmel-christian` rows and files.
- **Any new card, section, Compare row, or metric key.** If research demands one, stop and
  get approval.
- **Podcast episodes** for the new school.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout -b feat/add-carmel-christian` off an up-to-date `main`.

2. **Deep research pass, per included area.** Start from the URLs above; this is the real
   research the sweep deliberately did not do. Constrain every search to
   `carmelchristian.org` or "Matthews NC" — **"Carmel" collides with many unrelated schools**
   (Carmel HS Indiana, Carmel Unified California, Carmel schools in IL/UK). The Matthews NC
   Cougars are the target.

   Targets worth chasing (NOT-FOUND on a shallow pass, not confirmed absent — see the nulls
   list for what NOT to chase):
   - **College Support — relocate the current-year HS Profile PDF.** The 2022-23 edition was
     at `carmelchristian.org/pdf/2022-23_Carmel_Christian_High_School_Profile__.pdf` (now
     404). A newer one exists (naming convention `<year>_Carmel_Christian_High_School_Profile`).
     It carries SAT/ACT/GPA scale and matriculation — needed before writing those as `null`.
     If it uses a custom-encoded font like other Finalsite profiles, extract with
     `pdftotext -layout` locally, not WebFetch.
   - **Sports — the full D1 commit count.** ≥4 is a floor. Walk the Class-of-2026 Athletic
     Signing article (`show_news.jsp?REC_ID=999101`) and cross-ref 247Sports/On3/MaxPreps
     for a complete named list across all sports.
   - **The Arts — named ensembles and advanced arts courses.** The arts pages are hub pages;
     try the performance calendar, news archive, and the Calameo curriculum guide for AP/
     honors arts course titles.
   - **Course Offerings — transcribe the Calameo guide** for exact `us-courses` /
     `us-departments` totals (the landing page gives only the AP count and department names).

   **Do not go hunting for these — they are confirmed absent** (see the confirmed-not-
   published list below): a school-level Form 990, club participation %, affinity groups,
   publications/media, aid dollar totals, a broad Upper School club roster.

3. **Persist everything to `source-material/`.** One `.md` per topic × subtopic at
   `source-material/<topic>/carmel-christian/Carmel Christian School - <Topic> - <Subtopic>.md`,
   each with a provenance header (who/when/how), source URLs, and the record-level detail
   behind every figure. Match the file *shape* of an existing school's `source-material/` —
   look at a **data-rich** one (Providence Day, Charlotte Latin, Cannon) so the research
   captures every field the fullest card can hold, not just the fields a thin school filled.

4. **Ingest.** Run the `ingest-source-material` skill. It regenerates `.claude/docs/` notes,
   `src/data/schools.json` and `src/content/`. **First add `carmel-christian` to
   `SCHOOL_NAMES` in `.claude/skills/ingest-source-material/build_docs.py:35`**
   (`"carmel-christian": "Carmel Christian School"`) or the school gets a slugified display
   name.

5. **Map subtopics onto existing metric keys** in `src/lib/metrics.ts`. Every new subtopic
   phrasing must resolve to an **existing** card key via a `RULES` entry. An unmatched
   subtopic **silently becomes its own card**, which is an unapproved UX change.
   `npm run check:metrics` reports unmatched subtopics — it must be clean.

6. **Backfill `src/data/metricValues.ts`** — a value or a deliberate `null` for
   `carmel-christian` on **every one of the 30 Compare rows**. A missing key is an
   oversight; `check:metrics` tells the two apart. Known values:
   `latest-pickup` = 6:00 p.m., `top-tuition` = $18,750, `ap-performance` = 73%,
   **`p4-commits-2426` = 0 (a confirmed value, not a gap)**, the six acceptance-bucket rows
   from bucketing the 200+ list, the four summer rows, `d1-commits-2426` (the full walked
   count), `us-courses` / `advanced-courses` (16) / `us-departments` (~9),
   `program-span` (K–12), `signature-recognition` (2026 Blumey Best Actress),
   `us-organizations` (~4–5), `aftercare-cost` (per the row's definition).
   Deliberate `null`s: `counselor-caseload`, `aid-awarded`, `avg-award`, `participation`,
   `advanced-arts-coursework`, `ensembles`; `pct-aid` flagged `verify` (third-party 20%) or
   `null`. Add `quals` provenance tooltips where the Q-flagged rows call for them.

   **Counting rules are decisions, not transcriptions — write the rule down** in the
   source-material file (`us-courses` de-dup rule; `us-departments` 8 vs 9; `advanced-courses`
   the profile/guide overrides third-party counts; `us-organizations` counts standing Upper
   School bodies only, not MS/enrichment, and not the third-party "14").

7. **Write the per-school structured-card files** for the six topics:
   `src/data/sportsPrograms/carmel-christian.ts`, `artsPrograms/`, `clubsPrograms/`,
   `collegeSupportPrograms/`, `afterSchoolPrograms/`, `summer/carmel-christian.ts` (confirm
   the summer directory name against the existing per-school summer files).
   **Mirror the FULLEST existing school for each card, not Covenant Day** (see the first
   Decision). Open a data-rich example for the topic — Providence Day, Charlotte Latin or
   Cannon — and populate every optional field, stat tile, season/ledger/funnel/roster row
   and sub-card that Carmel Christian has real data for. Carmel Christian is data-rich in
   Sports, College Support, After School, Summer, Course Offerings and the awards half of
   The Arts, so those cards should reach the full structure, not a reduced one. Leave a field
   off **only** where the data is genuinely unpublished.
   **Omit `affinity` AND `media`** from the clubs file (leave those optional fields off
   entirely — see `SchoolDetail.tsx:604-605`). Sparse is worse than absent: prefer omitting a
   card to padding it with "not published"; where a real gap must be shown, use the topic's
   existing flag types (`gap` / `verify` / `estimate` / `stale`).
   **On the College Support card:** if the school publishes no percentile distributions for
   SAT/ACT averages or AP Scholar tiers, set **`noPercentiles: true`** on those ScoreTables
   to suppress the percentile header (the Covenant Day review rule).
   **On the acceptance list:** every ivy / ivyplus / nu75 / lac75 college MUST carry its US
   News `rankLabel`, copied from `source-material/college-support/_shared/US News 2026 - Rank
   Labels.md` — **never re-typed**. `npm run check:ranks` enforces this in the build.

8. **⚠️ Wire the import in each `PROGRAMS` map** — `sportsProgram.ts:430`,
   `artsProgram.ts:363`, `clubsProgram.ts:281`, `collegeSupport.ts:435`,
   `afterSchool.ts:392`, `summerPrograms.ts:314`. Nothing auto-discovers these files.
   **Adding the per-school file without wiring the import is a silent no-op** — the school
   renders prose instead of cards and no check catches it. (Line numbers verified 2026-08-16;
   re-grep `const PROGRAMS` if they've drifted.)

9. **Backfill the remaining hand-maintained layers**, each a real step:
   `src/data/financialAidReports.ts` (the structured tuition/aid card — tuition bands,
   cost components priced/range/unpriced, the aid timeline, payment plans),
   `src/data/courseOfferings.ts` (`OFFERINGS` — transcribed from the Calameo guide; capture
   every division published, not HS-only, if lower/middle course lists exist in the guide),
   `src/data/clubCatalog.ts` (`CATALOG`), `src/data/clubClusters.ts`. For each, mirror a
   **data-rich** school's entry (Providence Day / Charlotte Latin / Cannon) to see the full
   field set — not the thinnest school's — and fill everything Carmel Christian's data
   supports.

10. **Add `carmel-christian` to `src/data/brands.ts`** with `color`, `initials: 'CM'`, and
    `welcomeVideoUrl: 'https://www.youtube.com/embed/0ILLfsxWGYg'`. Add a comment noting
    `CC`/`CA` were taken (mirroring the `CV` comment at `brands.ts:59`). **Verify the actual
    school colors** rather than assuming; navy/red is indicated.

11. **Regenerate the schema doc** — `npm run schema`. `check:schema` **is** chained into
    `npm run build` and will fail until this runs, since a new school changes the schools
    table and the coverage matrix.

12. **Browser check** (see Verification). This repo's standing lesson is that every defect
    surviving the automated checks was render-layer.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want. Set `status: english-done`
and the index row to `English shipped`.

### Phase 2 — Every other locale

Scope is the **overlay layer** for research prose, per `PROSE_TRANSLATED`
(`src/lib/i18n.ts:182`) — **nine locales**: `es, bn, ht, te, fr, fa, it, hi, ar`. This is
*not* the `src/locales/*.json` chrome catalog; a new school adds no new UI chrome keys.
Read `.claude/docs/prose-translation-architecture.md` for the mechanism rather than
re-deriving it, and the per-locale rollout docs for their traps.

13. **⚠️ HIGHEST-RISK STEP — add `carmel-christian` to every hardcoded school list, BEFORE
    extracting.** These scripts hold literal `SLUGS` arrays and slug→export maps, and will
    **silently skip** a school that is missing. The failure mode is not a red check — it is
    a clean run that never looked, reporting 100% coverage on prose it never extracted.

    | Script | What to add |
    |---|---|
    | `scripts/i18n_extract.mjs` (`SLUGS` :44, `EXPORTS` :86) | slug + `'carmel-christian': 'carmelChristian'` |
    | `scripts/check_translations.mjs` (`SLUGS` :34, `EXPORTS` :75) | slug + export |
    | `scripts/check_chrome_keys.mjs` (`SLUGS` :35, `EXPORTS` :48) | slug + export |
    | `scripts/i18n_audit_skips.mjs` (`SLUGS` :35, `EXPORTS` :48) | slug + export |
    | `scripts/check_live_resolution.mjs` (`EXPORTS` :50) | export |
    | `scripts/i18n_fields.mjs` (:347, :359, :372) | `values.carmel-christian`, `subs.carmel-christian`, `quals.carmel-christian.kind` |

    The export name follows the existing convention (`davidson-day` → `davidsonDay`), so
    `carmel-christian` → `carmelChristian`. The repo has been bitten by exactly this shape —
    `check_translations.mjs` records that Summer Programs *"was invisible here until it was
    added, at 0% coverage."* **Treat a 100% coverage report on Carmel Christian as suspect
    until you have confirmed its slug is in all six**, and verify by checking that the
    school's strings actually appear in the extracted work files rather than trusting a green
    run. (Line numbers verified 2026-08-16; re-grep if drifted.)

    **Expect a round of `i18n_fields.mjs` classification edits.** `i18n_extract.mjs` reports
    any field path that is neither in `PROSE_KEYS` nor `SKIP_KEYS` as *unclassified* and
    excludes it. A data-rich school can populate a card field no prior school used — decide
    each: enum/code → skip, per-school heading → prose. **The trap runs the other way too:**
    do NOT ship a lifted chrome heading (`rosterTitle`, `checklistTitle`, … the `xTitle`-style
    fields whose translated fallback lives in `sections.*`) in the data file — it pins that
    heading to English in all ten locales. Covenant Day shipped seven of these and they had
    to be deleted. If a heading is the same for every school, it is chrome — leave it off the
    data file.

14. **Extract, translate, build the overlays** for the nine locales, following the rollout
    docs. Figures are copied **char-for-char** from the English source and never re-typed —
    a parent matches them against the school's own page. Locale-specific traps the docs
    record: lakh/crore regrouping for `hi`/`te` (the data must still store the English 3-3-3
    figure; a work file containing a pre-regrouped figure double-applies it), RTL bidi
    isolates for `fa`/`ar` (stored plain in data, wrapped at render), French identifiers,
    separator drift.

15. **Run the full locale check suite** (see Verification).

## Files touched

| File | Change |
|---|---|
| `source-material/<topic>/carmel-christian/*.md` | new — the research record, one per subtopic |
| `.claude/skills/ingest-source-material/build_docs.py` | edit — add to `SCHOOL_NAMES` (:35) |
| `src/data/schools.json` | regenerated by ingest — adds the school |
| `src/content/**` | regenerated by ingest |
| `.claude/docs/**` notes | regenerated by ingest |
| `src/lib/metrics.ts` | edit — `RULES` entries mapping new subtopic phrasings to existing keys |
| `src/data/metricValues.ts` | edit — a value or deliberate `null` on all 30 rows, plus `quals` |
| `src/data/sportsPrograms/carmel-christian.ts` | new |
| `src/data/artsPrograms/carmel-christian.ts` | new |
| `src/data/clubsPrograms/carmel-christian.ts` | new — **no `affinity`, no `media`** field |
| `src/data/collegeSupportPrograms/carmel-christian.ts` | new — `noPercentiles` where no distributions; rank labels on acceptances |
| `src/data/afterSchoolPrograms/carmel-christian.ts` | new |
| `src/data/summer/carmel-christian.ts` | new (confirm dir name) |
| `src/data/sportsProgram.ts` | edit — import + `PROGRAMS` entry (:430) |
| `src/data/artsProgram.ts` | edit — import + `PROGRAMS` entry (:363) |
| `src/data/clubsProgram.ts` | edit — import + `PROGRAMS` entry (:281) |
| `src/data/collegeSupport.ts` | edit — import + `PROGRAMS` entry (:435) |
| `src/data/afterSchool.ts` | edit — import + `PROGRAMS` entry (:392) |
| `src/data/summerPrograms.ts` | edit — import + `PROGRAMS` entry (:314) |
| `src/data/financialAidReports.ts` | edit — new `REPORTS` entry |
| `src/data/courseOfferings.ts` | edit — new `OFFERINGS` entry |
| `src/data/clubCatalog.ts` | edit — new `CATALOG` entry |
| `src/data/clubClusters.ts` | edit — new entry |
| `src/data/brands.ts` | edit — color + `CM` initials + welcomeVideoUrl |
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
- [ ] `npm run check:ranks` — every ranked-bucket college on the acceptance list carries its
      US News `rankLabel`
- [ ] `npm run check:schema` — passes after `npm run schema`
- [ ] `npm run check:quals` · `npm run check:spans` · `npm run check:sources` — clean
- [ ] `npm run check:podcast` — passes (a school with no episodes passes silently, correct
      here)
- [ ] `npm run build` — succeeds
- [ ] **`npm run check:seo`** — explicitly, since it is **not** in the build. Watch the
      `MIN_BYTES = 20_000` floor (`check_seo.mjs:34`) — **a thinner new school can pre-render
      under 20 KB and fail.** Carmel Christian is mid-pack, so lower risk than a truly thin
      school, but the Student Clubs and Financial Aid sections are lean — check. Also needs a
      meta description ≥70 chars and the school name in the markup.
- [ ] `npm run coverage:floor` — Carmel Christian appears; confirm its fill rate is at or
      above the ~23/30 the sweep estimated, and that the floor school is unchanged
- [ ] **Browser check on `/school/carmel-christian`** — all eight research areas render; the
      omitted `affinity` and `media` cards are **absent, not empty**; the Compare column
      shows values and N/A where expected; the badge is the real `CM` brand, not a fallback
      slate square; the Welcome Video renders; the structured cards render (if a topic shows
      prose where a card was expected, the `PROGRAMS` import in step 8 was missed)
- [ ] **Fidelity check — open the same page side-by-side with a data-rich school**
      (Providence Day or Charlotte Latin) and confirm the data-rich areas (Sports, College
      Support, After School, Summer, Course Offerings, The Arts) reached the **full** card
      structure — every stat tile, season/ledger/funnel/roster row and sub-card the richer
      school shows, wherever Carmel Christian has the data. A card that renders but is
      visibly shallower than the reference *without* a data reason means step 7 under-built
      it. Student Clubs and the aid stats are the only areas expected to read thinner.

### Phase 2 — Locales

- [ ] **Confirm `carmel-christian` is in all six script lists** before trusting any coverage
      number, and that its strings appear in the extracted work files
- [ ] `npm run check:translations` — coverage per locale
- [ ] `npm run check:runtime` — every overlay stamp resolves against live `src/data/**`
      (**the authoritative resolution guard**)
- [ ] `npm run check:sepdrift -- --lang <code>` per locale — no re-typed figures
- [ ] `npm run check:currency` · `npm run check:money` — no bypassed `localizeMoneyText()`
- [ ] `npm run check:bidi` · `npm run check:fa` — RTL isolates for `fa`/`ar`
- [ ] `npm run check:hi` · `npm run check:fr` · `npm run check:script` — locale-specific
- [ ] `npm run i18n:leaks` — no English leaking into a locale (per-locale; the Covenant Day
      rollout found 46 genuine prose leaks here that no other check caught)
- [ ] **`npm run check:live` is KNOWN-INCOMPLETE** — it fails on `main` (~2,900 entries)
      because it cannot walk course-offerings / metric-values / financial-aid-report / the
      standalone club catalog+cluster modules, so those entries always read unresolvable for
      *every* school. **Do not treat its failures as a Phase-2 regression**; `check:runtime`
      is authoritative. Confirm the delta is entirely pre-existing.
- [ ] **Browser print-out of the Carmel Christian page** with panels force-expanded, in a
      real browser, per the rollout docs — a default page renders ~17k chars, expanded ~152k,
      and the financial-aid figures live in the collapsed sections. Confirm the deep-dive
      figures actually appear (the Farsi print-path lesson).

## Risks

| Risk | Mitigation |
|---|---|
| **i18n scripts silently skip the new school** — a clean run reporting 100% on prose never extracted | Step 13 is a gate: add the slug to all six lists *before* extracting, then verify strings appear in the work files. Never trust the green run alone. |
| **Structured-card file added without the `PROGRAMS` import** — silent no-op, no check catches it | Step 8 lists all six line numbers; the browser check in Phase 1 catches it (prose renders where a card was expected). |
| **Wrong "Carmel" school** — many unrelated schools share the name (Carmel IN, Carmel CA) | Constrain every search to `carmelchristian.org` or "Matthews NC". |
| **Family handbook / profile PDF unreadable via WebFetch** | Use `pdftotext` locally (the deep pass proved the handbook parses that way; WebFetch returned a binary). Profile PDF may use a custom font — `pdftotext -layout`. |
| **Acceptance-list rank labels missing** — breaks `check:ranks` in the build | Copy every ranked-bucket college's label from the `_shared` 2026 rank table; never re-type. Step 7 + the check. |
| **Whole-Class percentile header over average-only tables** | Set `noPercentiles: true` on any ScoreTable that is averages/tier-counts, not distributions (the Covenant Day review rule). |
| **Third-party figures presented at primary confidence** | `pct-aid` 20% is aggregator-only — flag `verify` or omit. The "14 extracurriculars" is not a club count. The relocated profile PDF overrides third-party AP/SAT/ACT counts. |
| **Pre-rendered page under the 20 KB SEO floor** | Run `check:seo` explicitly; it is not in `npm run build`. Carmel is mid-pack but has two lean sections. |
| **An unmatched subtopic silently becomes a new card** = unapproved UX change | Step 5 maps every phrasing onto an existing key; `check:metrics` must be clean. |
| **`aftercare-cost` row misdefined** | The row's meaning (highest band × latest pickup × 5 days) bit Covenant Day — the plan's naive rate was wrong. Confirm what the existing schools' values represent before writing Carmel's. |
| **Research surfaces material fitting no existing card** | Stop and get the user's approval before building it. Land everything else meanwhile. |

### Confirmed-not-published — write deliberate `null`s / omissions, do NOT research these

Each was checked in the sweep or the Student Clubs deep pass. These are confirmed absences,
not gaps. Burning a research pass rediscovering them is the specific waste this section
exists to prevent.

1. **`media` card (publications) — confirmed absent.** The deep pass found no yearbook,
   newspaper, or literary magazine on the handbook, site, or any aggregator (only a
   *Broadcast Journalism* MS elective). Omit the card. Only 2/7 schools carry it.
2. **`affinity` card — confirmed absent.** Faith/ministry grouping, not identity. Omit the
   card (`SchoolDetail.tsx:604-605`). Only 4/7 schools carry it.
3. **`participation` (Student Clubs)** — no participation % on any school page or aggregator.
   Deliberate `null`.
4. **`aid-awarded` and `avg-award`** — not published anywhere. The school is church-exempt
   (ministry of Carmel Baptist) so files no Form 990; the related Carmel Educational
   Foundation's 990 has no scholarship line and no confirmed school link. Deliberate `null`s.
5. **`counselor-caseload`** — not published (one dedicated college counselor for the senior
   class; the ratio is not stated). Deliberate `null` unless the relocated profile PDF gives
   a senior count.
6. **`advanced-arts-coursework` and `ensembles`** — not published as counts/rosters (arts
   pages are hubs). Likely `null`; a targeted pass in step 2 may recover them, but do not
   over-invest.
7. **`p4-commits-2426` = 0 is a CONFIRMED VALUE, not a gap.** The two top prospects held P4
   offers and chose mid-majors. Re-verify, but 0 is expected.

## Open questions

- **Does a current-year HS Profile PDF exist with SAT/ACT/GPA?** The 2022-23 edition 404s
  but a newer one demonstrably exists. **Default:** relocate it in step 2; if genuinely
  unreachable, write SAT/ACT/GPA/`wholeClass` as `null`/omitted and note it — do not use the
  unverified third-party ~1220/29/3.67 as primary.
- **What is the full D1 commit count?** ≥4 is a floor. **Default:** walk the Class-of-2026
  signing article + cross-ref recruiting DBs; if only the 4 named resolve, ship 4 and note it
  as a floor in the `quals`.
- **`us-departments`: 8 or 9?** Depends on whether Electives/Bible count as their own
  department. **Default:** count from the Calameo guide's own department structure and write
  the rule down.
- **`us-organizations`: the exact Upper School count (~4–5).** **Default:** count standing
  HS bodies only (NHS, Beta, Spanish Honor Society, Student Council) + note the
  create-a-club mechanism; do not inflate with MS/enrichment or the third-party "14".
- **Carmel Christian's exact brand colors.** **Default:** verify from the site; if genuinely
  unavailable, pick from the Cougars' navy/red and say so in the PR. Initials are `CM`.
- **Summer directory name** — confirm `src/data/summer/` vs another path against the existing
  `covenant-day` summer file before creating Carmel's.

## Review-session progress (2026-08-16) — PAUSED, resuming in a new window

Phase 1 (English) is built and committed on `feat/add-carmel-christian`. The user is
mid-review; several review fixes have already landed. **Still in the English-review
phase — Phase 2 (nine-locale translation) has NOT started, no PR is open, nothing is
deployed.**

**Branch state:** clean tree, full `npm run build` green, `check:ranks` / `check:quals` /
`check:seo` / `check:schema` all pass. Last commit `e6cdf2b`.

**Review fixes applied this session (all committed):**
1. **Middle School course division added** — a re-check found Carmel DOES publish an MS
   named-course list (the first pass missed it). `courseOfferings.ts` now has HS + MS.
2. **Lower School course division added** — the user supplied the 2026-27 Elementary
   Course Description Guide PDF (saved to `source-material/course-offerings/carmel-christian/`).
   Built a K–5 division (5 core subjects + 6 Special Areas), modeled on Providence Day's
   Lower School shape. Carmel now shows all three divisions: Lower, Middle, High.
3. **Financial Aid collapsed to the single In-Depth Report card** — the provenance file's
   `##` sub-headings were slugifying into 8 orphan prose cards; demoted to `###` so only
   the structured report renders. (Latent ingest trap — worth remembering.)
4. **Roster-wide rank labels** — every acceptance-list college with a real US News
   National Universities or National Liberal Arts rank now shows it (was: 16 P4-tail unis
   like ASU #117 and several HBCUs went unlabeled). Applied to all 8 schools (96 labels).
   **User rule:** HBCUs get a label ONLY if they hold a National/LAC rank — HBCU-specialty
   and Regional ranks stay unlabeled. `_shared` rank table updated with sourcing caveats
   (usnews.com blocked automated fetch; a few numbers flagged worth a manual verbatim
   confirm — Texas Tech #198, Winston-Salem National-vs-Regional).

**Rank-label side-task shipped mid-review (2026-08-16):** the user asked for
acceptance-list colleges to show a US News rank even outside the top-75 buckets
(triggered by Drexel #80 rendering unlabeled). This broadened the rank rule to
label ANY college with a real 2026 National/LAC rank. Researched + verified all
240 rank-worthy colleges across the 8 lists (Yahoo-search channel; two agreeing
2026 profile confirmations each), corrected 15 stale pre-2026 labels, updated
the `_shared` table and the `add-school` SKILL. **Shipped for the 7 EXISTING
schools as its own PR #137 → merged → DEPLOYED live** (kept separate from this
unreviewed Carmel English build). Carmel's own identical labels are committed on
this branch (8edfd05). See memory `rank-labels-inclusive-shipped` — note the
merge-time reconciliation (take main's version of the 7 existing-school files).

**What remains:**
- Finish the user's English review (they may have more card-by-card feedback).
- On their explicit go-ahead: **Phase 2** — nine locales (`es, bn, ht, te, fr, fa, it,
  hi, ar`), per the Phase-2 steps above. ⚠️ Add `carmel-christian` to the six i18n script
  lists FIRST (they silently skip a new school). Note the acceptance-list prose grew
  (rank labels are chrome-ish but the college names are data) — re-extract cleanly.
- Then open ONE PR with both phases, flip status to `implemented`.
- Do NOT deploy without the user's in-the-moment say-so.
