---
name: add-trinity-episcopal
title: Add Trinity Episcopal School — the first K–8 school to occupy the PreK–8 shape, across eight research areas
status: implemented
phases: 2
created: 2026-09-16
branch: feat/trinity-episcopal
prs: [312]
---

# Add Trinity Episcopal School

## Goal

Add **Trinity Episcopal School** (tescharlotte.org, **K–8**, 419 students, slug
`trinity-episcopal`) as the app's twelfth school and **the first occupant of the PreK–8
shape** that PR #308 shipped inert.

Success: a dossier page with **eight research areas**, no College Support section, no
Compare button or column anywhere, a High School Placement area carrying a 23-year
placement record, and every figure traceable to a committed `source-material/` file.

This plan **performs the deep research**. The `/add-school` assessment was a deliberately
shallow sweep sized to produce percentages; its URLs are the head start, not the record.

## Context

### The precedent that governs this plan

**[`charlotteprep`](charlotteprep.md) was built through Phase 1 and then DELETED** — the
user reviewed the rendered dossier and rejected it: *"I didn't like how the data gaps came
out."* It cleared the coverage gate on paper (~75%, 8 of 10 areas) and still read badly.
Read that plan's `## ABANDONED` section before starting. Its three named causes were:

1. **Sports at 3 of 7 cards** — four omitted cards read as a thin area.
2. **Not-published notes carrying real weight in every area.**
3. **No Compare surface at all**, so no comparison to any peer anywhere on the page.

**Cause 3 applies identically to Trinity and cannot be fixed** — it is inherent to the
PreK–8 shape. Causes 1 and 2 are where Trinity differs, and the difference is why this
school was approved where Charlotte Prep was not: **6 of its 8 areas came back at low gap
density**, and its two thin areas both improved on a deeper look.

**The durable lesson, restated:** coverage percentages measure *which cards have data* and
say nothing about *how many not-published notes end up beside them*. This plan therefore
schedules the user's review of the rendered English page as **Step 14, before any locale
work** — and Phase 1 deliberately front-loads the two areas most likely to disappoint
(Sports, The Arts) so they are visible early rather than at the end.

### The PreK–8 machinery already exists

PR #308 ([`prek8shape`](prek8shape.md)) shipped the whole shape with **no occupant**.
Verified in the tree today:

| Piece | State | File |
|---|---|---|
| High School Placement area | 4 cards, component built | `src/components/HighSchoolPlacement.tsx` |
| Its registry | **`const PROGRAMS: Record<string, HighSchoolPlacementProgram> = {}`** | `src/data/highSchoolPlacement.ts:327` |
| Its overlay glob | wired, matches nothing yet | `highSchoolPlacement.ts:343` |
| Its metric rules | **already present**, keys `outcomes`/`placement`/`destinations`/`verdict` | `src/lib/metrics.ts:174` |
| Its slot in reading order | after College Support, deliberately | `src/lib/metrics.ts:294` (`TOPIC_ORDER`) |
| Compare exclusion | `hasHighSchool(slug)` → `comparableSchools` | `src/lib/manifest.ts:19,49` |
| `check:metrics` awareness | skips Compare-excluded schools and prints the skip | `scripts/check_metrics.mjs` |
| Chrome keys | already in all ten `src/locales/*.json` | — |

**`src/data/highSchoolPlacementPrograms/README.md` names the exact two edits** to add a
school, and warns that *the card data and the research manifest are separate gates* — the
area renders only if **both** `source-material/high-school-placement/trinity-episcopal/`
exists **and** the module is imported into `PROGRAMS`.

**UX approval for the whole PreK–8 shape was granted 2026-09-15.** Do not re-ask.

### Three corrections to the `/add-school` brief, found by reading the tree

These matter because each one would otherwise cost the implementing window a wrong turn.

1. **The Vimeo welcome video needs NO component change.** The brief flagged it as a UX
   gate. In fact `WelcomeVideo` (`src/components/WelcomeVideo.tsx:39-46`) passes `url`
   straight into `<iframe src>` with **no YouTube-specific logic**, and the other three
   `welcomeVideoUrl` usages in `SchoolDetail.tsx` (`:385`, `:570`, `:632`) are truthiness
   checks only. A repo-wide grep for `youtube` outside the brands data returns **exactly
   one hit: a comment** (`src/data/brands.ts:19`). So the change is the data entry plus
   updating that comment. Keep every existing YouTube URL working — nothing needs touching.
2. **The i18n school list is now ONE file, not six.** The brief lists `SLUGS`/`EXPORTS`
   edits across `i18n_extract.mjs`, `check_translations.mjs`, `check_chrome_keys.mjs`,
   `i18n_audit_skips.mjs`, `check_live_resolution.mjs` and `i18n_fields.mjs`. Those were
   consolidated into **`scripts/i18n_topics.mjs`** (`SLUGS` at `:26`, `EXPORTS` at `:77`),
   which all five consumers import and which says in its own header: *"Never re-declare any
   of these five constants locally; add here and every consumer picks it up."*
3. **The SEO byte floor is not a real risk.** The older PreK–8 doc flagged
   `MIN_BYTES = 20_000` (`scripts/check_seo.mjs:46`). The thinnest shipped schools
   pre-render at **306–310 KB** — a 15× margin. Still run `check:seo`; do not plan around it.
   (Also: `check:seo` **is** now chained into `npm run build`, contrary to that doc.)

### ⚠️ The one genuinely missing piece — and it is silent

**`high-school-placement` is NOT in `TOPICS` in `scripts/i18n_topics.mjs`.** Verified:
`grep -n "placement" scripts/i18n_topics.mjs` returns **nothing**.

PR #308 wired the *runtime* (the overlay glob is live and will load
`./overlays/high-school-placement.<lang>.json` the moment one exists) but never registered
the topic with the *build* side, because no school occupied it. So today the prose
extractor does not know the topic exists.

**Left unfixed, Phase 2 would report 100% coverage while Trinity's single most important
area ships English to all nine locales** — the exact silent-skip failure mode `CLAUDE.md`
warns about, and one no check would catch, because a topic that was never extracted
produces no unresolved stamps to fail on. Step 16 fixes it; Step 17 verifies it positively.

### The school

**Trinity Episcopal School** · 750 E. 9th Street, Charlotte NC 28202 (First Ward, uptown) ·
**K–8, no high school** — starts at **Kindergarten**, no PreK (unlike Charlotte Prep) ·
enrollment **419** · founded 2000 · Episcopal, co-ed · Head of School **Imana Sherrill** ·
SAIS-accredited · NCES `A0302431` · EIN `56-2059568` · mascot **Wildcats**.

### ⚠️ Identity trap — the most expensive mistake available here

**"Trinity Episcopal School" in Richmond VA (`trinityes.org`) is a grades 8–12 HIGH
SCHOOL.** Austin TX (`austintrinity.org`) and New Orleans LA (`trinitynola.org`) also
exist. Richmond has exactly the varsity sports, college matriculation and AP catalog a K–8
school lacks — so a careless search *"finds"* what you were looking for and it is the wrong
school.

Actually mis-attributed during the sweep, each caught only because agents were briefed:
production titles **Matilda / Annie / Frozen / High School Musical** (Austin); a Clubs &
Organizations page and a full varsity schedule (Richmond); a 2018 "new gym and performing
arts center" story (Austin); YouTube `@trinityepiscopalschoolRVA` (Richmond); NJHS
"GPA 3.6 / March induction" details (some other school entirely).

**Scope every query to `tescharlotte.org`, "750 E. 9th", the NCES ID or the EIN.** Treat
any varsity / state-championship / college-commit / AP-catalog result as Richmond's until
proven otherwise.

### ⚠️ Method — Trinity's real data is OFF its own web pages

The site is **FACTS Website Services / ColdFusion `.cfm`**, with a **100-URL sitemap**
verified complete against the homepage nav. `/arts`, `/clubs`, `/student-life` and any
course catalog **provably do not exist as pages** — yet all that data *is* published,
elsewhere. **A sitemap-only sweep would wrongly fail this school.**

- **The School Profile PDF is the single richest source** —
  `https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf`, linked **only**
  from the Middle School page. Carries tuition, enrollment, aid figures, operating budget,
  faculty counts, demographics, athletics by season (including **Flag Football**, which the
  athletics page omits), the full clubs list, weekly enrichments by grade, **~101 named high
  schools (2004–2026)** and **~165 colleges (2004–2022)**.
  **⚠️ It is versioned by school year and the old URL 404s when a new one ships** (24-25 and
  earlier are gone; only 25-26 was ever archived). **Capture it into `source-material/`
  first, before anything else, or the cumulative data becomes uncitable.**
- **Google Docs** hold every price. Export as text with `/export?format=txt`:
  - TED aftercare + per-grade activity fees + lunch — `1jh3Oc1gO1ShFo7bDR6xGEXCwvjN8Gpn_Ylg3z6Igs0M`
  - 75 priced summer camps — `1phMvzNdyn2_EYf4TwGnuS2ZzI8virOrQCi3SBBtCn1k`
  - Camp weekly grid (CSV) — `1KkkMI4t7nInLLNfDj1yhNgRo_Ajl7B99I_TZAaJpfHk`
  - Camp fees/policies — `14ZB0WDM6t513Z0VYqYbaZkyObFOHxXwXjypYaB1_yX0`
  - Camp logistics — `1Cl3nXtJdZBnKxaOfeY8wiSXgZ8xESIxbPVDU3X2wLzE` · FAQ — `1_xo5HoOEkunBn-BZj22o-jCTtnH9RPGMUXWeQ7AR2E8`
- **Vimeo holds the arts production titles** — 60 videos, catalog via
  `https://vimeo.com/api/v2/tescharlotte/videos.json` (the channel page is JS-rendered and
  yields nothing). This is what resolves the Arts "no production titles" gap.
- **The blog is enumerable at `blog.cfm?threadid=N`, N = 1..51.** `/blog.cfm` shows only 11
  posts and has **no paging**; the tag filter is broken (all three tags return zero).
  `threadid` is the only enumeration route.
- **Two traps that defeat HTTP-status checks:** `about/school-profile.cfm` returns **200**
  but is a 554-byte "Page Not Published" stub (the real profile is the PDF); empty blog
  threads also return **200**, at 40,906 bytes. **Check body size, not status.** 404s are a
  constant 1,231 bytes. `robots.txt` 404s.

## Decisions

- **Eight research areas** — the nine existing, minus College Support, plus High School
  Placement. College Support is **not offered to a school with no high school** (user
  decision 2026-09-15); create no `source-material/college-support/trinity-episcopal/`.
- **No `src/data/metricValues.ts` entries at all** — not 30, not 14 nulls. Trinity is
  Compare-excluded, and `check:metrics` already skips such schools. Adding nulls would
  re-introduce the `0 / 8 Ivy League` problem `manifest.ts` documents as *actively false*.
- **The Arts ships at REDUCED structure** (user, 2026-09-16) — build `ladder`, `music`,
  `visual`, `theatre`. **Omit any facilities card and any awards card**; both are confirmed
  empty. Zero-items rule.
- **Sports ships without its `facilities` card** (user, 2026-09-16) — build `offered`,
  `record`, `coaching`. Fold the on-campus gymnasium and the "106,500 sq ft on a 4.5-acre
  uptown site" fact into a sibling card. The six college-bound cards (`matriculation`,
  `power-4`, `pros`, `recruiting`, `nil`, `national-profile`) drop per the approved PreK–8
  shape — their absence is **not** a gap for a middle school.
- **Welcome video is Vimeo `1179403154` "Say Yes to TES"** (1:25, Apr 2026), verified
  embeddable (`embed_privacy: anywhere`). Use `https://player.vimeo.com/video/1179403154`.
  Trinity publishes on Vimeo, not YouTube.
- **Mirror the richest schools** (Providence Day, Charlotte Latin, Cannon — ~96% fill), not
  the most recently added. Reduce below full structure **only** where data is genuinely
  unpublished, and then omit the card entirely rather than ship it empty.
- **Publications card is omitted** — no yearbook, newspaper or literary magazine exists
  anywhere. Zero-items rule, not a not-published note.
- **Register `high-school-placement` in `i18n_topics.mjs`** rather than leaving Phase 2 to
  fail silently. It is a one-line fix to a shared module and benefits every future PreK–8
  school.

## Approvals needed

**None outstanding.** Both gates are already granted:

- The **PreK–8 shape** (High School Placement area, Compare exclusion, six dropped Sports
  cards) — user, **2026-09-15**.
- **Vimeo support for the welcome video** — user, **2026-09-16**. Note this turned out to
  need no component change at all (see Context correction 1), so it is a data entry plus a
  comment fix.

**⛔ SETTLED, 2026-09-16 — no college card on a K–8 school.** Trinity publishes a
**college list (Classes of 2004–2022, 160 institutions** including Harvard, Stanford,
MIT, Duke, Brown, Penn) plus **2 Morehead-Cain Scholars**. It was raised at review and
the user ruled it out: *"no college card for schools that cap at 8th grade."*

**This is a standing rule for the PreK–8 shape, not a Trinity-specific decision**, and
the reasoning generalises: those alumni reached those colleges after **four years at a
different high school**. A college card on a K–8 dossier would credit this school with
an outcome another school produced, which is the same error as reading its cumulative
31/57/12 split as a per-class rate. The list stays in the committed research record
(`source-material/high-school-placement/trinity-episcopal/… Where They Land.md`) and
renders nowhere.

## Source material

**Nothing was written during planning** — `/add-school` writes no `source-material/` by
design, and this planning pass wrote none either. Every file below is **still to be
fetched**, by `/implement`, in Step 1.

Target layout — `source-material/<topic>/trinity-episcopal/Trinity Episcopal School - <Topic> - <Subtopic>.md`,
each with a provenance header (who/when/how), **source URLs**, and the record-level detail
behind every figure:

| Topic folder | Subtopics to write |
|---|---|
| `admissions/` | Application Process and Deadlines; Entry Bands and Testing; CAIS Consortium |
| `course-offerings/` | Middle School Curriculum; Lower School Curriculum; Technology and STEM |
| `student-clubs/` | Club Catalog and Overview; Academic and Competitive Clubs; Affinity and Identity Groups; Service and Civic Engagement; Honor Societies |
| `the-arts/` | Program Overview; Performing Arts and Ensembles; Theatre Productions; Visual Arts |
| `sports/` | Sports Offered; Selected Results and Championships; Coaching |
| `high-school-placement/` | Placement Outcomes; Where They Land; The Placement Program |
| `after-school/` | Extended Day Program and Hours; Extended Day Costs |
| `summer-programs/` | Wildcat Summer Camp Catalog; Summer Costs and Policies |
| `financial-aid-tuition/` | Tuition and Fees; Financial Support; Form 990 |

**Capture the School Profile PDF's full text first** (Step 1) — it is versioned and its URL
will 404 when the 27-28 edition ships.

`/implement` ingests these via the **`ingest-source-material`** skill (Step 2). Nothing
enters the app that is not traceable to one of them.

## Out of scope

- **Charlotte Prep.** Abandoned 2026-09-16; not to be revived by this plan.
- **A fifth High School Placement card for college outcomes.** **SETTLED — never, for any
  school that ends at 8th grade** (user, 2026-09-16). Not deferred; ruled out.
- **The Trinity Voice magazine archive** (`issuu.com/tescharlotte`, 18 issues 2011–2026).
  It is the likeliest home of pre-2023 class placement lists, but Issuu serves page images
  only — text endpoints return AccessDenied — so it would need OCR of ~900 pages. Recorded
  as a known unexhausted lead, deliberately not attempted.
- **Form 990 Schedule I** for total aid awarded. Optional: the profile PDF already gives
  first-party 31% / $2,139,114, so the 990 would only corroborate. Do not block on it.
- **A Latest News section.** Separate skill (`add-school-news`), separate Worker deploy,
  needs a Cloudflare credential. Not part of adding a school.
- **Deploying.** Merging is not publishing; `npm run deploy` is the user's call, separately.

## Steps

### Phase 1 — English

1. **Capture the School Profile PDF before anything else.** Download
   `https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf`, extract with
   `pdftotext -layout`, and write its full content into
   `source-material/financial-aid-tuition/trinity-episcopal/Trinity Episcopal School - Financial Aid and Tuition - School Profile 2026-27.md`
   with the provenance header. **Do this first** — the URL 404s when the next edition ships.
   Also capture the 25-26 edition (still live) for the longitudinal figures.
   Then run the **deep research pass per area**, starting from the URLs in Context and the
   per-area findings below, and write every `source-material/` file from the table above.
   Carry every denominator; distinguish *confirmed absent* from *not found* in each file.

2. **Ingest.** Run the **`ingest-source-material`** skill. It regenerates
   `.claude/docs/` notes, `src/data/schools.json` and `src/content/`. Add
   `trinity-episcopal` to `SCHOOL_NAMES` in
   `.claude/skills/ingest-source-material/build_docs.py:37` first, or the school renders
   with a slugified name.
   **Verify the manifest afterwards:** `trinity-episcopal` must appear with **exactly eight
   topics** and **no `college-support`**.

3. **Map every subtopic onto an EXISTING metric key** in `src/lib/metrics.ts`. Run
   `npm run check:metrics` and confirm zero unmatched subtopics. **An unmatched subtopic
   silently becomes a new card, which is an unapproved UX change.** The
   `high-school-placement` rules already exist at `metrics.ts:174` with the right four keys.

4. **`src/data/brands.ts`** — add the `trinity-episcopal` entry: `color` (sampled from the
   school's own wordmark, not guessed), `initials: 'TES'`, `city: 'Charlotte'`,
   **`hasHighSchool: false`**, and
   `welcomeVideoUrl: 'https://player.vimeo.com/video/1179403154'`.
   Update the comment at `brands.ts:18-19` so it no longer says YouTube-only — Vimeo is now
   supported, and every existing YouTube URL keeps working unchanged.
   Add `public/logos/trinity-episcopal.png` and the `logo` field if a usable mark exists;
   otherwise omit `logo` deliberately (do **not** let the slate fallback ship by accident).

5. **High School Placement — the headline area.** Write
   `src/data/highSchoolPlacementPrograms/trinity-episcopal.ts` exporting a
   `HighSchoolPlacementProgram`, then **add the import and the `PROGRAMS` entry** in
   `src/data/highSchoolPlacement.ts:327` (currently `{}`). Both edits, per that directory's
   README — the file alone is a silent no-op.
   Fill all four cards: `outcomes`, `placement`, `destinations`, `verdict`. See the
   per-area findings below for the data, and **read the asterisk warning there.**

6. **Sports — reduced.** Write `src/data/sportsPrograms/trinity-episcopal.ts` with
   `offered`, `record` and `coaching` **only**; wire the import into `SPORTS_CARDS`'
   `PROGRAMS` map. Omit `facilities` and the six college-bound cards entirely.
   Present results as **"selected results", never a record table** — there are only two
   seasons.

7. **The Arts — reduced.** Write `src/data/artsPrograms/trinity-episcopal.ts` with
   `ladder`, `music`, `visual` and `theatre`; wire the import. Omit any facilities and
   awards card.

8. **Student Clubs.** Write `src/data/clubsPrograms/trinity-episcopal.ts` (`affinity`,
   `service`, `honors`) and wire the import. Then add Trinity to the two standalone
   modules: `src/data/clubClusters.ts` (Academic & Competitive) and
   `src/data/clubCatalog.ts` (`CATALOG`). **Both are PROSE-metric cards** — they render
   nothing unless a subtopic resolved to `academic-clubs` / `catalog` respectively, so name
   the source files to the roster convention. Omit any publications card.

9. **After School.** Write `src/data/afterSchoolPrograms/trinity-episcopal.ts` with all
   four cards — `coverage`, `cost`, `dayInside`, `verdict` — and wire the import. The
   **Cost Planner is fully buildable**: the income-banded ladder plus the published
   "18.5 days/month × 10 months" billing basis makes an annual figure defensible.
   Record **morning care as a confirmed null** (afternoon-only).

10. **Summer Programs.** Write `src/data/summer/trinity-episcopal.ts` (note: `summer/`, not
    `summerPrograms/`) with `catalog` and `costPlanner`; wire the import. **The design
    problem here is aggregation, not gaps** — 75 priced camps is too many to list;
    aggregate by price band, week, grade coverage and vendor strand.

11. **Admissions.** Write `src/data/admissionsPrograms/trinity-episcopal.ts` with the
    `guide` card; wire the import. **Settle the band keys deliberately** — see the
    three-non-aligned-splits warning below. Do not inherit Providence Day's (`tkk`/`g15`/
    `g612`) or Country Day's (`jkk`/`g14`/`g512`).

12. **Course Offerings and Financial Aid.** Add Trinity to `src/data/courseOfferings.ts`
    (`OFFERINGS`) and `src/data/financialAidReports.ts`.
    **Financial Aid renders the In-Depth Report, not a card per `##` heading** — target the
    structured report plus at most one or two genuinely additive cards (a fee table, a
    tuition history). Keep scaffolding, provenance and gap inventories as `###` under the
    intro. Charlotte Catholic first shipped **nine** cards here, including bare
    `Source URLs` and `Provenance` cards; do not repeat that.

13. **Regenerate and check.** `npm run schema` (required — `check:schema` is chained into
    the build and will fail otherwise), then `npm run check:seo` explicitly.

14. **→ Browser review, and this is the step that decides.** Run the app and read
    Trinity's page **in a real browser, with every `<details>` expanded** (a collapsed page
    renders ~17k chars; expanded ~152k — the financial-aid figures are inside the collapsed
    panels). Compare side-by-side with a data-rich school (Providence Day).
    Confirm: the eight areas render · **College Support is ABSENT, not empty** · the omitted
    cards are absent, not empty shells · **no Compare button appears anywhere** · the badge
    is not a fallback slate square · **the Vimeo welcome video actually plays**.
    Then **show the user, and ask directly whether the rendered gaps read acceptably** —
    naming Sports and The Arts as the two thinnest areas. Raise the college-list fifth-card
    question here. **This is the check that rejected Charlotte Prep, and last time it came
    too late.**

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Nine prose locales, per `PROSE_TRANSLATED` (`src/lib/i18n.ts:182`): `es`, `bn`, `ht`, `te`,
`fr`, `fa`, `it`, `hi`, `ar`. Mechanism lives in
[`prose-translation-architecture.md`](../docs/prose-translation-architecture.md); use
[`prose-translation-bn.md`](../docs/prose-translation-bn.md) as the worked non-Latin example
and [`prose-translation-ht.md`](../docs/prose-translation-ht.md) for a Latin one. **Do not
copy Italian's process** — it shipped with no rollout doc and no register axis.

15. **Add the school to the shared i18n module.** `scripts/i18n_topics.mjs` — add
    `'trinity-episcopal'` to `SLUGS` (`:26`) and `'trinity-episcopal': 'trinityEpiscopal'`
    to `EXPORTS` (`:77`). **One file only** — all five consumers import it. Do not
    re-declare these constants locally anywhere.

16. **⚠️ Register `high-school-placement` in `TOPICS`** in the same file
    (`scripts/i18n_topics.mjs:41`), mapping it to `'highSchoolPlacementPrograms'`.
    **It is currently absent entirely** — `grep -n "placement" scripts/i18n_topics.mjs`
    returns nothing. Without this the extractor never sees Trinity's most important area and
    Phase 2 reports 100% while shipping English to all nine locales. The runtime overlay
    glob (`highSchoolPlacement.ts:343`) is already wired and will pick up the file.

17. **Prove the registration worked before translating anything.** Run the extractor and
    confirm Trinity's strings actually appear in the work files — specifically that
    `high-school-placement` yields a non-zero unit count. **Treat a 100% coverage report as
    suspect until you have seen Trinity's own strings in the extracted output.** This repo
    has been bitten by exactly this shape before (`check_translations.mjs:53` records Summer
    Programs being invisible at 0% until it was added).

18. **Expect a round of `i18n_fields.mjs` edits.** A data-rich new school surfaces field
    paths the extractor cannot classify; each must be decided — enum/code → skip, per-school
    heading → prose. **Watch the opposite trap:** a per-school `xTitle` that lifts a *chrome*
    heading pins it to English in all ten locales. If a heading is the same for every school
    it is chrome — leave it off the data file. Covenant Day shipped seven such fields and
    they had to be deleted.

19. **Translate, build overlays, and merge by stamp.** Follow the rollout doc. Figures are
    copied **char-for-char** and never re-typed — units included (the `es` unit-conversion
    allowlist was deleted 2026-08-24). Mind `hi`/`te` lakh–crore grouping and `fa`/`ar` RTL
    isolates.

## Files touched

| File | Change |
|---|---|
| `source-material/<8 topics>/trinity-episcopal/*.md` | new — the research record, ~22 files |
| `src/data/schools.json` | regenerated by ingest — adds the school + 8 topics |
| `src/content/**` | regenerated by ingest |
| `.claude/skills/ingest-source-material/build_docs.py` | edit — `SCHOOL_NAMES` entry |
| `src/lib/metrics.ts` | edit — only if a subtopic needs mapping to an existing key |
| `src/data/brands.ts` | edit — new entry incl. `hasHighSchool: false` + Vimeo URL; fix the YouTube-only comment |
| `public/logos/trinity-episcopal.png` | new — if a usable mark exists |
| `src/data/highSchoolPlacementPrograms/trinity-episcopal.ts` | **new — first occupant of the area** |
| `src/data/highSchoolPlacement.ts` | edit — import + `PROGRAMS` entry (currently `{}`) |
| `src/data/sportsPrograms/trinity-episcopal.ts` | new — 3 cards only |
| `src/data/artsPrograms/trinity-episcopal.ts` | new — 4 cards |
| `src/data/clubsPrograms/trinity-episcopal.ts` | new — 3 cards |
| `src/data/afterSchoolPrograms/trinity-episcopal.ts` | new — 4 cards |
| `src/data/summer/trinity-episcopal.ts` | new — 2 cards |
| `src/data/admissionsPrograms/trinity-episcopal.ts` | new — `guide` card |
| `src/data/{sportsProgram,artsProgram,clubsProgram,afterSchool,summerPrograms,admissionsPrograms}.ts` | edit — one import + `PROGRAMS` entry each |
| `src/data/{clubClusters,clubCatalog,courseOfferings,financialAidReports}.ts` | edit — Trinity entries |
| `src/data/metricValues.ts` | **NOT touched — Compare-excluded school** |
| `scripts/i18n_topics.mjs` | edit — `SLUGS`, `EXPORTS`, **and `TOPICS` for `high-school-placement`** |
| `scripts/i18n_fields.mjs` | edit — per-slug paths + any newly surfaced field classifications |
| `src/data/overlays/*.{9 locales}.json` | Phase 2 — translated prose |
| `.claude/docs/DATA-SCHEMA.md` | regenerated by `npm run schema` |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean (trust `tsc -b`, not `tsc --noEmit`)
- [ ] `npm run check:metrics` — passes, **and prints `trinity-episcopal` in its
      Compare-excluded skip line**. Zero unmatched subtopics.
- [ ] `npm run schema && npm run check:schema` — doc regenerated, no drift
- [ ] `npm run check:seo` — passes (the 20 KB floor is a 15× margin; verify, don't worry)
- [ ] `npm run build` — succeeds end to end
- [ ] `grep -c trinity-episcopal src/data/metricValues.ts` → **0**
- [ ] The manifest shows Trinity with **8 topics, no `college-support`**
- [ ] **Browser check (Step 14), `<details>` expanded, side-by-side with Providence Day** —
      areas render; College Support and the omitted cards are **absent, not empty**; no
      Compare button anywhere; `?schools=trinity-episcopal` cannot inject a column into
      Compare; badge is not a fallback square; **the Vimeo video plays**
- [ ] **The user has reviewed the rendered page and accepted how the gaps read**

### Phase 2 — Locales

- [ ] **Trinity's strings appear in the extracted work files**, with a non-zero
      `high-school-placement` unit count — checked directly, not inferred from a coverage %
- [ ] `npm run check:chrome` — every chrome key present in all ten catalogs
- [ ] `npm run check:runtime` — **authoritative**; every overlay stamp resolves, per locale
- [ ] `npm run check:live` — no new unresolvable entries attributable to Trinity
- [ ] `npm run check:figures` / `check:sepdrift` / `check:money` / `check:currency` per locale
- [ ] `npm run build` — succeeds with all checks chained
- [ ] **Browser print-out of Trinity's page, panels forced open**, in at least one RTL
      (`fa` or `ar`) and one lakh/crore locale (`hi` or `te`)

## Risks

| Risk | Mitigation |
|---|---|
| **The user rejects the rendered page, as with Charlotte Prep** | Step 14 puts the review before *any* locale work and asks the question directly. Prefer omitting a card to padding it. Phase 1 front-loads Sports and The Arts so the thin areas are visible early. |
| **`high-school-placement` never reaches the extractor** | Step 16 registers it; Step 17 verifies positively rather than trusting a coverage number. |
| **Richmond VA data contaminates the research** | Every source file records its URL; scope queries to `tescharlotte.org`. Any varsity/college-commit/AP finding is a red flag to re-check. |
| **The School Profile PDF 404s mid-implementation** | Step 1 captures its full text into `source-material/` before any other work. |
| **A structured-card file ships without its import** — silent no-op, no check catches it | Each of Steps 5–11 names both edits explicitly. Browser check confirms cards actually render. |
| **An unmatched subtopic silently creates a new card** (unapproved UX change) | Step 3 runs `check:metrics` before anything else is built. |
| **The 2026 placement post duplicates Myers Park** (11 bullets, 10 schools) | Transcribe as 10; note the school's own duplicate in the source file. |

## Open questions

- **Does the asterisk on ~41 high schools and ~71 colleges in the School Profile PDF mean
  "multiple attendees"?** No legend exists anywhere in the document — searched and confirmed
  absent. **Default: do not publish any interpretation of it.** Transcribe the names without
  the marker, and note in the source file that the marker exists and is unexplained. Ask the
  school if it ever matters.
- ~~**Should the college list (2004–2022, ~165 institutions, 2 Morehead-Cain Scholars) get a
  fifth High School Placement card?**~~ **SETTLED — NO (user, 2026-09-16):** *"no college
  card for schools that cap at 8th grade."* This is a standing rule for every PreK–8
  school, not a one-off for Trinity. Do not re-raise it.
- **Does a strings/orchestra ensemble exist?** Sources conflict — one says "fourth grade…
  chorus, strings or band", the LS Enrichments page (direct fetch) says fifth grade, chorus
  or band, no strings. **Default: trust the direct fetch; do not ship "strings".**
- **Flag Football** appears in the profile PDF (fall and spring) but not the athletics page.
  **Default: include it, citing the profile PDF as the more complete source, and note the
  discrepancy.**

---

## Per-area research findings

Everything below was verified during the `/add-school` sweep, much of it firsthand. It is
the **head start**, not the record — Step 1 still does the deep pass and writes the
`source-material/` files.

### Admissions — ~100%, low gap density

`https://www.tescharlotte.org/admission/admission-process.cfm`

Cycle **2027-28**, and **the label agrees with the dates** (rare — verify, but do not
"correct" it). Application deadlines **Jan 2 2027** (K) / **Jan 15 2027** (1–8). Supporting
materials **Feb 1** / **Feb 26 2027**. Decisions **Fri Feb 26 2027** (K) / **Fri Apr 9
2027** (1–8). Portal **FACTS** (not Ravenna). Wildcat Visit Day from November; two teacher
recommendations (English + math) for rising 6–8; a Follow-Up Conference offered to every
family. Open houses: K **Sep 29 2026** 9:30–11:00; K–8 **Nov 5 2026** 9:30–11:00; K–8
**Dec 1 2026**.

**Trinity is a CAIS member** and the consortium brochure is hosted on its own domain:
`https://www.tescharlotte.org/editoruploads/files/CAIS2024-25final.pdf` (2024-25 edition —
the *structure* carries forward, the dates do not). Seven members including Trinity;
WPPSI-IV for Pre-K/K/1, WISC-V for rising 2–4; testing fees $275; coaching or re-testing
**invalidates the application at every CAIS school**; common notification and reply dates;
*"No contract for a CAIS school will be required prior to this deadline."*

**⚠️ THREE NON-ALIGNED GRADE SPLITS — the sentence most likely to be written wrongly.**
Deadline/decision bands are **K / 1–8**. The CAIS-vs-ISEE boundary is **4/5**. The
instrument boundary is **1/2**. So: WPPSI-IV (K–1), WISC-V (2–4), **ISEE (5–8)**, with
"CAIS (K–4) and ISEE (5–8)" as the administering-body split. *"Grades 1–8 take the ISEE"*
is the natural sentence and it is **false**.

**Confirmed not published:** the application fee **amount** (referenced in the checklist,
never stated — not a single `$` on the process page); the enrollment-contract deadline
(available only via CAIS, so state it as a CAIS rule, not a Trinity-published date);
acceptance rate; individual tour dates (by policy — they direct to the Admission Office).

**⚠️ THREE SCHOOL-SIDE ERRORS — preserve and flag, do not silently fix.**
(1) The prospective-family aid deadline reads **Feb 1 2026** on the process page but
**Feb 1 2027** on the tuition page — both verified firsthand. The 2026 one is a year stale;
trust the tuition page. (2) **Dec 1 2026 is labeled "Thursday" — it is a Tuesday.**
(3) The Dec 1 open-house **time** differs between the school's own two pages (9:00–10:30 vs
9:30–11:00).

### Financial Aid & Tuition — ~100%, moderate gap density

`https://www.tescharlotte.org/admission/tuition-affordability.cfm`

**2026-27: $26,670 (K–5) · $28,690 (6–8 — the top band).** Aid platform **Clarity**.
**Aid deadlines differ by family type: Dec 1 2026 (returning) vs Feb 1 2027 (prospective)**
— returning families are due ~2 months *earlier*, and using the wrong one misinforms
exactly the reader this area serves. NC Opportunity Scholarship promoted as a separate
route. Dewar tuition refund insurance.

Per-grade **activity fees $210 (K) → $1,045 (8th)**. FLIK lunch $11.50/meal; LS annual
$1,375 / MS $1,520; 20-meal block $195/$210. **Books show `-----` for every grade —
affirmatively no charge. Render as "included", not "not published."**

From the profile PDF: **31% of students receive support, $2,139,114 awarded**, operating
budget **$11.09M**, faculty 59 + 28 admin + 7 extended-day.
**Form 990** (EIN 56-2059568, ProPublica, filings 2012–2025): FY2025 revenue $16,157,612,
expenses $13,656,485, assets $47,316,809; Head of School compensation $275,198.

**Not published:** average award size (no source anywhere); tuition history (the live site
posts only the current year — Wayback was down during the sweep, so *unresolved* rather
than confirmed absent); enrollment deposit (confirmed absent from an otherwise exhaustive
cost document).
**Do NOT ship** the third-party *"over 25% receive aid"* claim — untraceable to any live
page; the profile PDF's first-party **31%** supersedes it. **Do NOT ship**
PrivateSchoolReview's **$17,752** tuition — flatly stale against the school's own figures.

### After School — ~100%, low gap density

`https://www.tescharlotte.org/community/trinity-extended-day.cfm` — **Trinity Extended Day
(TED)**. **Latest pickup 6:00 pm.** School day 8:00 am–3:00 pm.

**Income-scaled monthly rates** (verified firsthand from the Google Doc):
< $30K **$105** · $30–60K **$135** · $60–90K **$195** · > $90K **$380** ($355 sibling).
Drop-in **$31/day** ($25 with aid); full day (TES closed, TED 8:00–5:30) **$72/day**
($45 first child / $40 sibling with aid); half day complimentary to monthly attendees,
else **$51/day** ($30 with aid).
**Billing is averaged over 18.5 days/month × 10 months** — this is what makes an annual
Cost Planner figure defensible. 1.5% late fee after 14 days.
**Late-pickup policy is NON-MONETARY: three occasions → removal from TED.** (Contrast the
*camp*, which charges $5/minute — do not conflate them.)
Staff: Jocelyn Purdie (Director of Auxiliary Services), Nancy Guerra (Assistant Director).
Enrichments are named but **unpriced**: chess club, music lessons, karate, cheer club.

**⚠️ "Enrichments" is overloaded at Trinity.** The Lower/Middle School "Enrichments" pages
are **curricular** subjects (free, under Academics) — a different thing from TED's paid
add-ons. Do not cross-wire them.

**Morning / before-school care is a CONFIRMED NULL** — established by crawling all site
URLs and grepping for morning/before-care patterns; zero hits. TED is afternoon-only.
TED registration is *currently closed* — a time-varying state; quote rates and policies,
not status.

### Summer Programs — ~100%, very low gap density

`https://www.tescharlotte.org/community/wildcat-summer-camp.cfm` (the slug is
**wildcat-summer-camp**; `/community/summer-camp.cfm` 404s).

**The camp is LIVE — the opposite of Charlotte Prep's discontinued one**, established
positively three ways: HTTP 200 with 2026 content, a 2026-dated catalogue, and a
Trinity-branded CampBrain portal stating registration opens Jan 19 2026.

**6 weeks, Jun 15 – Jul 24 2026** (week 1 is 4 days — no camp Jun 19, Juneteenth).
**Rising K–8. Open to the public**, not just Trinity families. **75 named camps, 76 price
points, $225–$785, median $265** (15 full-day, 59 half-day). Half-day 9–12 and 1–4;
full-day 9–4. Before-care 7:45–9:00 **$85/wk**; after-care 4:00–5:30 **$90/wk**; both
**$175/wk** (no after-care for half-day campers ending at noon).
$50 non-refundable deposit per camp + $25 admin fee; balance auto-drafted May 1;
**`4ORMORE` = $25 off each camp** for 4+ full-day weeks; late pickup **$5/min** after a
5-minute grace. Aid available but **excludes CAMMP, TES Academy and Black Rocket**.
School-run with vendor content embedded (Mad Science, Black Rocket); TES Academy is
Trinity's own academic strand.

**The design problem is aggregation, not gaps.** Not published: per-camp capacity, staff
ratios. Camp lunch is confirmed BYO.

### Student Clubs — ~89%, low gap density

**Affinity groups are unusually well populated** (verified firsthand,
`/diversity/affinity-groups.cfm`) — **five named student groups with grade ranges and
purpose statements**: Young Children of Color (K–5), 12 Tribes of Trinity (3–5), Young
People of Color (MS), Young People for Social Justice (MS), Gender Sexuality Alliance (MS)
— plus **four parent groups**: Café con Padres, KINDRED, Invisible Differences, Diversity &
Belonging Committee. The GSA has organized a Pride Chapel.
**Remember the schema rule:** `affinity` is for **identity** groups only — chess, yearbook
and Odyssey of the Mind belong on the club catalog and academic-clubs cards.

**Service learning is a grade-by-grade ladder with 12 named partners**
(`/spirituality/service-learning.cfm`): K & 1 Nourish Up · 2 InReach · 3 Roof Above /
Urban Ministry Center · 4 The Epiphany School · 5 Galilee Ministries · 6 8th Street
Friendship Garden + Charlotte Community ToolBank + Nourish Up · 7 Crisis Assistance
Ministry + Hope Haven + First Ward Child Development Center · 8 a social-action research
project plus a **capstone advocacy trip to Washington DC**. The uptown location is
integral — the school's own line is *"Trinity has the longest hallways in Charlotte."*

Honor and leadership: **National Junior Honor Society, Student Council, Honor Council** —
all three present. **⚠️ Do not carry the NJHS "GPA 3.6 / induction in March" details;
those came from other schools' pages.**
Signature traditions: Koinonia small groups, Science Buddies (8th ↔ K), RISE (5th grade),
Greet the Week (Mondays), 12 Tribes. The full named club list is in the **profile PDF** —
there is no clubs page on the site.

**Not published:** yearbook, newspaper, literary magazine — none found anywhere.
**Omit any publications card entirely** rather than shipping a not-published note.

### The Arts — ~67%, moderate gap density, REDUCED structure

Content lives in `/academics/lower-school-enrichments.cfm` and
`/academics/middle-school-enrichments.cfm` — **there is no `/arts` page.**

Ensembles with a real progression: chorus or band from 5th grade; 6th grade choir or band;
**Advanced Band / Advanced Choir** in 7–8. The profile PDF names the **"K–8 Performing Arts
Program"**: *"4th Grade Musical; 5th Grade Shakespeare Review; Middle School fall play,
winter musical, and choir and band concerts."*
Recurring named events: **1st Grade Fairy Tale Plays, 4th Grade Musical, 5th Grade
Shakespeare, MS fall play, winter musical**.
Visual arts uses a **named pedagogy — Teaching Artistic Behaviors (TAB)**, choice-based,
students working in *"centers or mini art studios"*; media: painting, clay, printmaking.
MS drama elective plus an after-school production.

**Production TITLES are on Vimeo** — *Emma: A Pop Musical* (2025), 4th Grade *Aladdin*
(2021), *Fiddler on the Roof* selections (2020), *Shakespeare 2025*, *1st Grade Fairy Tale
Plays* (2025), 5th/6th Grade Band and Choir concerts with dates. **This makes the `theatre`
card richer than the ~67% score credits.**
**⚠️ Never ship Matilda / Annie / Frozen / High School Musical — those are Austin's.**

**Confirmed absent → omit those cards:** no named arts facilities (the only named campus
facility is the IDEA STEM Lab, which is not an arts space); no awards or recognition of any
kind; no gallery or exhibit programme.

### Course Offerings — ~75%, low-moderate gap density

`/academics/middle-school-curriculum.cfm` + `/academics/lower-school-curriculum.cfm`

**A real published math track with placement by performance criteria:** Gr 6 Math 6 ·
Gr 7 Pre-Algebra, Advanced Pre-Algebra · Gr 8 Foundations in Algebra, Math 1, **Algebra 1**,
Math 2, **Geometry**.
**High-school-credit courses in middle school — the K–8 analogue of "advanced courses":**
Algebra 1 and Geometry for HS credit in 8th; **Spanish I or Latin I** completed by the end
of 8th (*"a high school level course"*).
LS Spanish K–5 via the named **Descubre el Español**. Social Studies by grade: 6
Geography/Civics & Global Issues · 7 Modern World History · 8 Modern US History.
Named LS curricula: **Math in Focus 2020** (Singapore), **Amplify Science**.
Technology: 1:1 iPads K–1, Chromebooks 2–8, "Digital Learning Catalysts", **IDEA (STEM)
Lab**, Computer Science (7), Learning Lab (6).

**~24–26 enumerable MS courses**, and the 13-item MS weekly-enrichment list with grade
levels is **published verbatim in the profile PDF — a published fact, NOT an `estimate`
flag.** (This was the brief's explicit question.)

**Confirmed absent:** no curriculum guide or course catalog document exists (the profile
PDF substitutes, and it is a good one); no course descriptions; **"Choice Electives (7–8)"
is named but its contents are never listed** — the single most annoying gap; no
promotion/graduation requirements.

### Sports — ~40% → ~65% after the deep pass, REDUCED structure

`/community/athletics.cfm` (note: under `/community/`, not `/athletics/` — that 404s).

**7 distinct sports across 10 season-teams.** Fall: volleyball (G), cross country (co-ed),
soccer (B), tennis (G). Winter: basketball (B, G). Spring: tennis (B), track & field
(co-ed), soccer (G), golf (co-ed). The profile PDF **adds Flag Football** in fall and
spring. Two directly quotable lines: *"we do not make skill-based cuts"* and *"Typically,
90% of the Middle School student body participates."* Athletic Director **David Martin**.

**What the deep pass found — all first-party, verified firsthand:**
- **The conference is the Queen City Conference (QCC)**, named twice across two sports and
  two seasons.
- **Feb 8 2024 — the first basketball championship in school history**, 8th-grade boys,
  **undefeated season, 54–23 over Carmel Christian**, at home (`blog.cfm?threadid=12`).
- **Fall 2023** (`blog.cfm?threadid=10`): boys soccer won the QCC **title and tournament**;
  8th-grade volleyball **tied for first**; **girls cross country conference champion for the
  4th year running, ranked #1 among NC independent schools, 7 runners all-conference**; boys
  XC third, 3 runners top-15, 1 all-conference.
- **Coaching:** David Martin, AD **and head basketball coach since 2004** — a ~20-year
  tenure, ~250 athletes, with a quotable line (*"For 20 daggum years…"*). Jason Martin
  assistant. Grady Smith coached 8th-grade girls basketball, retired June 2023 (historical).
- Teams are fielded **by grade band, not A/B**: 7th/8th soccer, 8th volleyball, 6th/7th
  volleyball and soccer, 8th boys basketball.

**⚠️ CRITICAL NEGATIVE — Trinity is NOT in the GCMSAA**, the league the eight big Charlotte
independents play in. Country Day's own MS athletics information sheet lists its members
(Cannon, Charlotte Christian, Country Day, Latin, Covenant Day, Holy Trinity, Lake Norman
Charter, Providence Day) and **Trinity is absent**; Latin's 2025-26 MS schedule corroborates.
**Never describe Trinity as competing against the peer schools already in this app.** That
is the natural assumption and it is false.

**Confirmed nulls after multiple independent approaches — write deliberate nulls, do NOT
re-hunt:** the QCC member roster (the conference has no web presence at all), **all outdoor
venues** (soccer, track, XC, golf), schedules, rosters, win-loss series, team levels, and
any athletic trainer. The public calendar has **no Athletics category**. Confirmed present:
an **on-campus gymnasium** (FMK Architects, Phase II) on a **106,500 sq ft / 4.5-acre**
First Ward campus — fold this into a sibling card, not a facilities card.

**Present results as "selected results", never a record table** — there are only two
seasons (Fall 2023, Winter 2024) and nothing published after Feb 2024.

### High School Placement — ~90%, the area that justifies adding this school

**A genuine three-point longitudinal series with denominators on every point. Both PDF
vintages verified firsthand:**

| Window | Graduates | Independent | Public | Boarding |
|---|--:|--:|--:|--:|
| 2004–2014 | 442 | 32% | 53% | 15% |
| 2004–2025 | 1,009 | 31% | 57% | 12% |
| 2004–2026 | **1,060** | 31% | 57% | 12% |

(The 2014 row is from a Wayback snapshot of the old HTML profile page.)
**The split is CUMULATIVE since 2004, not per-class — label it that way.**

**Per-class series, all verified:**

| Class | Graduates | "Lifers" | Distinct HS | Named list? |
|---|--:|--:|--:|---|
| 2023 | 49 | not published | 11 | No — count only |
| 2024 | 51 | 9 | 17 (+3 other states) | No — count only |
| 2025 | 54 | 28 | 16 | **Yes** (`threadid=29`) |
| 2026 | 51 | 30 | 10 | **Yes** (`threadid=48`) |

**⚠️ The 2026 post lists "Myers Park High School" twice — 11 bullets, 10 distinct schools.**
Transcribe as 10 and note the school's own duplicate. The 2023/2024 count-only posts are a
confirmed **editorial choice**, not an absence.
Lifer rate trend: 18% (2024) → 52% (2025) → 59% (2026).

**Cumulative destination list: ~101 named high schools (2004–2026)** in the profile PDF,
bucketable into the school's own independent/public/boarding categories.
**Many destinations are schools THIS APP ALREADY COVERS** — Country Day, Latin, Providence
Day, Cannon, Covenant Day, Charlotte Christian, Davidson Day, Charlotte Catholic — a
cross-link no other school on the site can offer, and exactly what the `destinations` card
was designed for.

**⚠️ ~41 of the high schools and ~71 of the colleges carry an ASTERISK with no legend
anywhere in the PDF** — searched and confirmed absent. It plausibly marks multiple
attendees, but that is **not stated**. Do not publish any interpretation of it.

**Placement staff — two named:** **Lilla Clark**, MS Language Arts Teacher & **H.S.
Counselor**; **Rudy Wise**, **Director of Admission and Boarding School Placement** — a
title that directly explains the 12% boarding figure. (The staff directory gives Wise a
different title than the admission landing page; the two live pages disagree.) The school
states **"two dedicated high school counselors"** covering public, independent and boarding
— matching the 31/57/12 split. Quotable K–8 thesis on `/admission/k-8-advantage.cfm`:
choose the right high school *"at the right time… at the end of 8th grade rather than at the
beginning of kindergarten."*

**Confirmed not published** (established by crawling all 100 sitemap URLs and all 51 blog
posts): the **outbound** standardized test 8th graders sit for high school admission (SSAT
and HSPT get **zero** hits; ISEE appears only twice and both are **inbound**, i.e. Trinity's
own entrance testing); **% accepted to first-choice or top-two-choice** (zero hits — there
is **no Charlotte Prep-style "97%" equivalent, and this is the single biggest difference
from that school**); high school merit scholarship counts or dollars; any placement timeline
(what grade the search starts); high school fairs, mock interviews, or test prep.

**One CMS defect:** the post titled *"High School Counselors Help Families Navigate Next
Step"* (`threadid=7`) has a **title/body mismatch** — its body is a hiring announcement, and
the actual counselor article text appears lost and unarchived. That is the one piece of
placement-process prose that cannot be recovered.

**Bonus data with no home in the four-card area:** the **college list (2004–2022, ~165
institutions)** including Harvard, Stanford, MIT, Duke, Brown and Penn, plus **2
Morehead-Cain Scholars** (from an alumni graphic — note its "904 alumni" tile is **stale**
against the PDF's 1,060; use the PDF). See *Approvals needed*.

---

## Implementation notes — Phase 1 (2026-09-16)

Phase 1 shipped English-only across 10 commits on `feat/trinity-episcopal`. The build
is green (21 chained checks, exit 0) and the page was verified in a real browser.

### Where the build deviated from the plan

**1. Three structured-card types encode K–12 assumptions, and Trinity's data is a
different shape — not a thinner version of the same shape.** This is the single
biggest finding of the build, and it recurred three times:

- `PlacementClass` requires `acceptedPct` + `acceptedCount`, rendered under a chrome
  header reading **"Accepted to a top-two choice"** in all ten locales. Trinity
  publishes no acceptance rate — "first choice", "top two" and "97%" return **zero
  hits** across 100 sitemap pages, 51 blog posts and both profile PDFs. It publishes
  **matriculation** instead (graduates / "lifers" / distinct high schools per class).
  Shipped `classes: []` with the series in `stats` and `destinations`.
- `WinningRecord` requires a state-title matrix and win-% bars, and `TitleResult` is
  an NCISAA vocabulary where `RUNNER-UP` means *lost the state final*. Trinity won
  **middle-school Queen City Conference** titles, which the type cannot express — a
  first draft labelled four championships `RUNNER-UP`. The `record` card is omitted
  and the results ship as prose.
- The shared arts theatre card is titled **"Theatre & the Blumeys"**, a high-school
  award a K–8 school cannot enter. Fixed with `TITLE_OVERRIDES` + locale keys.

Each was resolved by omission plus prose, which is honest and needed no UX approval.
**A PreK–8-aware variant of these types is the real fix and is a UX-gate conversation.**

**2. The After School Cost Planner is NOT buildable as the plan assumed.** The plan
says a published "18.5 days/month × 10 months" billing basis makes an annual figure
defensible. **That basis does not exist** (0 hits for `18.5`, `averag`, `10 month`),
and the school labels its own monthly figure "**Estimated**". Two further TED policies
the plan cited — a 1.5% late fee and a three-occasion removal rule — are also absent;
the two-instance removal rule belongs to the **camp**. TED ships as monthly rates with
no derived annual total, and the `cost` card is omitted because every available
`basis` value either publishes a forbidden annual total or prints a wrong unit.

**3. `⛔ The plan's "Algebra 1 and Geometry for HS credit in 8th" is unsupported.**
Trinity never says it. The only high-school-credit claim on the site is the world
language (Spanish I / Latin I), and that is what shipped.

**4. The Arts is NOT a thin area — two "confirmed absent" claims were wrong.** The
plan omits an awards card because awards were "confirmed empty". In fact Trinity has
two student art awards, a Youth Art Month exhibition at the Carolina Theatre, a
"Deeply Rooted" exhibition at the VAPA Center, a 2025 CATO Excellence in Teaching
Award for its Visual Arts Director, and an ongoing Ghana art exchange. The earlier
reading came from searching only the two Enrichments pages; the recognition lives in
the blog. **User approved building it in (2026-09-16), without student names.**

**5. Mock Trial — three-peat NC state champions — was missing from the plan entirely**,
as was a Speech & Debate state championship. Both shipped. Conversely **NJHS and
Student Council do NOT ship**: both return zero hits site-wide despite confident
third-party web prose, the same contamination class as the bogus "NJHS GPA 3.6" detail.

**6. A figure in the plan is wrong.** 2025-26 grade 6–8 tuition is **$27,320**, not
$25,771 — the school's own 25-26 profile PDF carried the prior year forward. Proven
against four archived snapshots of its tuition page. Both bands rose identically at
+6.0% / +6.0% / +5.0%.

**7. A build-blocking defect, fixed.** Trinity is the first school with a **Vimeo**
welcome video, and Vimeo sits behind a Cloudflare bot challenge whose `blob:` request
never settles — so `prerender.mjs`'s `waitUntil: 'networkidle'` timed out and
**`npm run build` failed for the whole site**. Third-party video embeds are now
blocked during prerender. Measured: 15s+ timeout with the embed, 685ms without.
The video itself plays correctly for a real visitor (verified in a headed browser).

**8. Counting corrections.** The club roster is **15**, not 14 (my source file's
heading disagreed with the verbatim quote beneath it). The blog has **51 real posts**
with no empty threads, and the counselor article is **recoverable** — threadids 6 and
7 have their titles *swapped*, where the plan recorded the article as lost.

### Also done early, from Phase 2

Steps 15–16 were pulled forward: `scripts/i18n_topics.mjs` now registers
`trinity-episcopal` **and** the `high-school-placement` topic. The topic was absent
entirely, so without it Phase 2 would have reported 100% coverage while shipping the
school's most important area as English to all nine locales. Verified positively —
the extractor now reaches **254 translatable strings** in that area.

### How the page reads (Step 14)

Expanded, in a real browser, against two reference schools:

| School | Text | Cards |
|---|--:|--:|
| Providence Day (richest) | 166,837 | 40 |
| **Trinity Episcopal** | **117,519** | **43** |
| Davidson Day (the coverage floor) | 100,654 | 31 |

Nine areas render; College Support is **absent, not empty**; no Compare button appears
and `?schools=trinity-episcopal` cannot inject a column; the badge is the school crest.
**Sports is the thinnest area at 2 cards** (6,640 chars) — the one place the page
visibly runs short.

### Open for the user at review

- **Sports ships 2 cards.** Everything published is there, but it is the thinnest area.
- ~~A fifth High School Placement card for the college list~~ — **CLOSED (user,
  2026-09-16): no college card for schools that cap at 8th grade.** A standing rule for
  the PreK–8 shape, not a Trinity-specific decision. The list stays in the committed
  research record only.
- **Extending `PlacementClass`** with matriculation fields, so the per-class series
  (graduates / lifers / distinct schools) renders as a table instead of stat tiles.
- **The `honors` clubs card is titled "Honor Societies"** but holds a competition
  ledger — Trinity has no chartered society. A title override would need approval.
- **Admissions `watchOuts` is populated** here, against the four most recent cards
  shipping `watchOuts: []` (decision 2026-09-01). Trinity's carry the three errors in
  the school's own published copy, which no step can. Easy to empty for consistency.

---

## Implementation notes — Phase 2 (2026-09-17)

Nine prose locales translated, built and verified: `es`, `bn`, `ht`, `te`, `fr`, `fa`,
`it`, `hi`, `ar`. 627 Trinity strings per locale (5,643 total), plus one pre-existing
Compare figure whose English had moved on `main`.

### Steps 15-16 were already done in Phase 1

`scripts/i18n_topics.mjs` registered `trinity-episcopal` and the `high-school-placement`
topic during Phase 1 (commit `8803ad6`), pulled forward because the topic was absent
entirely. Step 17's positive verification held: the area extracts **65 field sites / 53
distinct strings**. (Phase 1's note of "254 translatable strings" was a pre-classification
field count, not distinct strings.)

### Step 18 was larger than "a round of edits" — 43 unclassified paths

All from Trinity, and an unclassified field is **excluded from extraction rather than
flagged**, so each would have shipped English at 100% coverage:

- `destinations.categories[].notes.*` (38) — keyed by the destination school's own NAME,
  so every entry is its own path and no leaf-key list can cover them. Needed a new
  **prefix-wildcard** pattern form. Prose: most are places a reader should recognise, and
  one is a hedge flagging the school's own misspelling — a sentence among 37 identifiers.
- `schools[].slug` → skip (a machine identifier; translating it silently degrades the
  cross-link to plain text).
- `placement.stats[].denominator`, `cells.k`, `cells.g18`, `adjacentTitle`,
  `leadershipTitle` → prose.

`adjacentTitle` **returns after a 2026-08-18 deletion**, on the same terms as `askTitle`:
Gaston Day's value was byte-identical to its fallback (a lifted heading), Trinity's
genuinely diverges. Re-run the uniform test on the value, not the field's history.

### Three defects found and fixed, none of them translation

1. **The `PATH_OVERRIDES` matcher was copy-pasted into four scripts.** They agreed by
   luck; the new pattern form had to land in all four or the checkers would classify
   fields differently from the extractor. Now one exported `pathOverride()`.
2. **The content extractor asked a different question from the renderer.** `CARD_REPLACED`
   matched the SUBTOPIC (`/deep.?dive/i`) while `SchoolDetail` keys off the normalized
   metric key. That held only while every school's research arrived as one unsliceable
   PDF; Trinity's is committed markdown, so it split into 22 sections (`Source URLs`,
   `Verbatim text — 2026-27 edition`, `Fourteen years of filings`) that all fold onto
   `in-depth-report`. It was offering **79 sections of research apparatus** for
   translation into nine locales, none of it reachable by a reader. Fixed to resolve the
   metric key — which also caught **34 blocks for Charlotte Catholic and Gaston Day that
   nine locales had already paid to translate**, card-replaced and equally unreachable.
   `check:live` gate 2 (`shipped ⊆ fresh extract`) correctly failed on them.
3. **`i18n_extract.mjs` has no carry-over**, so there was no supported way to add a
   school's strings to nine translated work files. `scripts/i18n_splice_work.mjs` does
   that merge, joined on the FNV-1a stamp, never the index. Result: 12,260 kept, 628
   added, **0 dropped**, identically in all nine.

### ⚠️ Parallel translation exposed a defect class — read this before doing it again

The nine locales were translated by nine agents in parallel. **They shared one scratchpad
directory and several used generic helper-script names** (`apply.mjs`, `<topic>.json`).
Those files overwrote each other mid-run, so agents executed siblings' scripts against the
**wrong locale's files**. Four agents hit it independently.

Three caught their own damage. **One did not:** `high-school-placement.ht.json` held 28
Devanagari entries and `sports.ht.json` 19 Telugu entries — Hindi and Telugu prose shipped
as Kreyòl — while that agent's own verification reported clean.

**It reported clean honestly.** Every checker in this repo compares figures
(`check:sepdrift`), stamps (`check:translations`) or hashes (`check:runtime`). **None of
them asks whether the prose is in the right language.**

`scripts/check_work_integrity.mjs` closes that. Per entry, against the base ref: `text`/
`of`/`at` byte-identical, no pre-existing `t` overwritten, `strings.length` and `lang`
unchanged, no foreign script. Two findings are baked into it:

- **The danda trap.** A naive Devanagari range check reports a CLEAN Bangla corpus as
  thousands of contaminated entries — U+0964/U+0965 sit in the Devanagari block but are
  shared punctuation Bangla uses normally (5,494 false positives on the first run).
- **What it cannot see, stated by the check itself** rather than left to be assumed: it
  cannot separate `fa` from `ar`, or `es`/`it`/`fr`/`ht` from each other. For `fa`/`ar` it
  falls back to a measurable signal — Persian-only letters (پ چ ژ گ) in **77.4% of `fa`
  entries vs 0.0% of `ar`**.

**If translating locales in parallel again: give each agent a private scratch directory,
hardcode the locale suffix in every script, and key every map by English text or stamp,
never by index.**

### The cross-locale leak review earned its place

`i18n:leaks` flags strings one locale kept in English that others translated. Most flags
are legitimate keeps, so **the signal is the band**: of Trinity's strings, 48 were
leak-shaped (kept by 1-3 locales, translated by ≥6). Triaged against what the other
locales actually did, **23 were genuine misses** and were fixed to the consensus
rendering — `hi` `Visit Checklist`, `ar` `Arts & Ensembles` / `Community Life`, `bn`
`Grade 1-8`, `te` four date strings, `ht`/`hi` `High School Placement`. The other 25 are
defensible keeps (`Rising N-M` grade codes, the WPPSI-IV/WISC-V/ISEE row, a street
address, camp hour codes).

Two further quality passes the automated checks cannot do:

- **Hedges.** All 20 hedge-bearing Trinity entries survive at full length in every locale.
  A softened hedge turns a caveat into a claim and is invisible to a reader who cannot
  check the English.
- **Untranslated leak shapes.** The long strings left byte-identical to English are the
  *same 8-10 in every locale* — direct quotations, a street address, a list of club proper
  nouns. Nine agents converging independently is the evidence they are keeps.

### Verification

| Check | Result |
|---|---|
| `check:runtime` | ✓ 9/9 locales, 12,924 entries each — **authoritative** |
| `check:live` | ✓ 9/9 against live English + 36 foreign-topic blocks each |
| `check:translations` | ✓ 100% per topic, no drift; `high-school-placement` 65/65 |
| `check:sepdrift` | ✓ 0 drifted figure tokens × 9 locales |
| `check:hi` / `check:fa` / `check:fr` / `check:bidi` | ✓ all clean |
| `check:money` / `check:currency` | ✓ every render site localizes |
| `npm run build` | ✓ exit 0, all 21 chained checks |
| Browser, panels forced open | ✓ see below |

**Browser check (Playwright, `<details>` forced open, ~70k chars vs ~17k collapsed).**
Eight areas render translated in every locale; **College Support absent, no Compare
button** in all nine; `dir=rtl` and `data-prose` correct for `ar`/`fa`; the Vimeo iframe
present in every locale.

**The lakh/crore interaction verified end to end, which is the subtlest rule here:**
`hi`/`te` render **`$21,39,114`** from a stored `$2,139,114`, while `fa` renders
`$2,139,114`. The render layer regroups exactly once because the data stores no
regrouping (verified: 0 stored regroupings in either locale). Zero Eastern-Arabic digits
anywhere; percentages unspaced in every locale.

### Left for the user, deliberately not in this diff

**`verdict.headline` on High School Placement is the bare string `'High School
Placement'`**, which renders as a bold lead paragraph directly under a card already
titled with the area name — so the page prints that heading twice, in all ten locales.
The English was approved and is now translated into nine locales, so changing it here
would invalidate all nine mid-flight. Two agents independently flagged it as looking like
placeholder data. It is a small English-layer fix worth making separately.
