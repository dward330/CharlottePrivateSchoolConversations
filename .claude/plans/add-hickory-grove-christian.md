---
name: add-hickory-grove-christian
title: Add Hickory Grove Christian School as the 9th school
status: english-done
phases: 2
created: 2026-08-17
branch: feat/add-hickory-grove-christian
prs: []
---

# Add Hickory Grove Christian School as the 9th school

## Goal

Add **Hickory Grove Christian School** (Charlotte, NC) as the app's 9th school, with all
eight research areas populated to the depth its public data supports. It ships as a full
school page — pre-rendered SEO page, Compare column, structured cards, prose, brand crest,
Welcome Video — plus overlay translations in every prose locale. Success = the school page
renders every included area to the depth of a data-rich school (not a thin one), the
Compare column shows real values with N/A/nulls only where data is genuinely unpublished,
and every automated check passes.

This is a **completed `/add-school` assessment** — viability is settled (8/8 areas viable,
~20–21 of 30 Compare rows, above the Davidson Day floor of 17/30 & 7/8). Do **not**
re-assess whether to add it; build it.

## Context

The app holds **8 schools × 8 research areas** today (`src/data/schools.json`,
`.claude/docs/DATA-SCHEMA.md`). Adding a school is a well-worn path: the last one was
**Carmel Christian (PR #140)**, and its plan `.claude/plans/add-carmel-christian.md` plus
its per-school files are the **mechanical reference** for *where things live and how
imports are wired*. **They are NOT the content model** — Carmel shipped thin (1 doc per
area in several areas). Per the standing rule, build each card to the **fullest** existing
school's structure — **Providence Day / Charlotte Latin / Cannon** (~96% Compare fill) —
populating every optional field the data supports.

Confirmed structure during planning (all paths exist):

- **Per-school data dirs** (one file per school): `src/data/sportsPrograms/<slug>.ts`,
  `artsPrograms/`, `clubsPrograms/`, `collegeSupportPrograms/`, `afterSchoolPrograms/`,
  and `summer/<slug>.ts` (note: `summer/`, not `summerPrograms/`).
- **Topic roots** holding the static `PROGRAMS` import map: `src/data/sportsProgram.ts`,
  `artsProgram.ts`, `clubsProgram.ts`, `collegeSupport.ts`, `afterSchool.ts`,
  `summerPrograms.ts`. Adding a per-school file **without** wiring its import here is a
  silent no-op — the school renders prose instead of the card.
- **Hand-maintained layers** the ingest never writes: `src/lib/metrics.ts`,
  `src/data/metricValues.ts`, `financialAidReports.ts`, `clubClusters.ts`,
  `courseOfferings.ts` (`OFFERINGS`), `clubCatalog.ts` (`CATALOG`), `collegeRankings.ts`,
  `brands.ts`. Plus `SCHOOL_NAMES` in
  `.claude/skills/ingest-source-material/build_docs.py:35`.
- **Brand precedent:** `src/data/brands.ts` — Carmel Christian's entry (line ~36) has
  `color`, `initials`, `welcomeVideoUrl: '…' // user-chosen, 2026-08-16`. Follow that shape.
- **i18n scripts with hardcoded school lists** (the silent-skip trap):
  `scripts/i18n_extract.mjs`, `check_translations.mjs`, `check_chrome_keys.mjs`,
  `i18n_audit_skips.mjs`, `check_live_resolution.mjs`, `i18n_fields.mjs`.

**Locales.** `TRANSLATED` (UI chrome) and `PROSE_TRANSLATED` (research prose) in
`src/lib/i18n.ts` are separate lists. A new school adds **prose**, so Phase 2 is the
**overlay layer** (`PROSE_TRANSLATED`), not the `src/locales/*.json` chrome catalogs —
chrome strings for a school page are school-independent and already translated. Follow
`.claude/docs/prose-translation-architecture.md` for the mechanism.

## Decisions

- **Slug `hickory-grove-christian`** — matches the school's name; consistent with existing
  `<firstword>-christian` slugs (carmel-christian, charlotte-christian).
- **Branch `feat/add-hickory-grove-christian`** — matches the plan name.
- **All 8 areas included** — settled in the assessment. Summer and Financial Aid are thin
  but include; see per-area treatment in Steps.
- **Summer Cost Planner card OMITTED** — prices are confirmed non-public (live site, all
  Wayback 2017–2026, social). Per no-empty-cards, the card is left off the data file
  entirely, not shipped with a "not published" note.
- **Financial Aid: 3 aid-outcome Compare rows are deliberate `null`** — `pct-aid`,
  `aid-awarded`, `avg-award` confirmed not published (church is IRS 990-exempt). Write
  `null`, not a value, so `check:metrics` reads them as located-and-absent, not oversights.
- **Summer catalog flagged historical/representative** — the ~15-camp list is recovered
  from 2022–2023 Wayback snapshots because the live site now hides names behind Brushfire.
  Use a `stale`/`estimate` flag on the catalog card to say so.
- **Build to the fullest school, not Carmel** — mirror Providence Day / Latin / Cannon
  depth per area; use Carmel only for file layout / import wiring.

## Approvals needed

**None.** Adding a school is automatic everywhere under §6 of the schema doc — no
UX-design gate. No new card, Compare row, metric key, or topic is introduced: every area
uses existing cards and rows.

The one thing that *would* have needed approval — a new Compare row for the NCSEAA
state-voucher figures — is **explicitly dropped** (see Out of scope). Do not add it.

## Source material

**Nothing is pre-persisted.** The `/add-school` sweep intentionally wrote no
`source-material/` files; the two deep-pass agents' files were removed. Phase 1 begins with
a **real research pass per area**, persisting to
`source-material/<topic>/hickory-grove-christian/<School> - <Topic> - <Subtopic>.md` with a
provenance header (who/when/how), source URLs, and record-level detail behind every figure —
then ingesting via the `ingest-source-material` skill. Start from these URLs (found during
assessment, so no re-searching from scratch):

**Course Offerings**
- `https://www.hgchristian.org/academics/guidance/courses` — 2025-26 Course Selection Guide
  (**SPA — needs a browser read** to enumerate courses; the exact US-course count lives here)
- `https://resources.finalsite.net/images/v1759254561/hgchristianorg/zymp8lu0k9m6ndgumpgi/HGCSHSProfileFall25.pdf`
- `https://www.hgchristian.org/academics/high-school`
- Found: real published guide; **17 AP courses** + AP Capstone; honors across 6 depts;
  dual enrollment (College at Southeastern / Judson + NC CCP); **~7–8 departments**.

**College Support**
- `https://resources.finalsite.net/images/v1699879706/hgchristianorg/obmpbhs6ludijizshc8k/HGCSHSProfileFall23.pdf`
  — school profile PDF: full **2023 acceptance list (~120+ colleges)**, grading scale, GPA
  weighting, AP list + score distribution, SAT/ACT means, National Merit / AP Scholars, **no
  class rank**. CEEB 340661.
- Class of 2023: 77% 4-yr / 17% 2-yr / 6% none. **ACT mean 19.7 (n=63); SAT median 1110
  (n=12).** AP May 2023: 83 students / 169 exams, **57 scored 3+**.
- Counselor: Tracey Bennett (Guidance Counselor) + Dr. Mildred Similton (Admin of Student
  Services); caseload computed only (~65 seniors:1, or 259:1 school-wide).

**The Arts**
- `https://www.hgchristian.org/arts` ; `https://www.hgchristian.org/arts/performing-arts`
- Blumey 2025 `https://www.blumenthalarts.org/assets/doc/2025-Blumey-All-Nominees-and-Finalists-9b848e893a.pdf`
- Blumey 2026 `https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-nominees-finalists-for-2026-blumey-awards`
- Found: TK–12 arts ladder; Band (Concert, Jazz), Choir (no orchestra); theatre 3
  productions/yr + biennial musical; **Blumey noms 2025 (Amara Aghedo, *Seussical*) & 2026
  (Christian Young; *The Little Mermaid* recognized)**; Tri-M + Thespian societies; visual
  arts Art I–IV + AP 2D Design; *Exodus* yearbook. Facilities not found (omit).

**Sports**
- `https://www.hgchristian.org/athletics` ;
  `https://www.hgchristian.org/athletics/new-coaches-and-teams`
- `https://www.maxpreps.com/nc/charlotte/hickory-grove-christian-lions/`
- `https://www.ncisaa.org/recognition/wells-fargo-cup/pastchampions2023-2024/`
- `https://www.highschoolot.com/story/grace-christian-of-sanford-wins-ncisaa-3a-baseball-title-sweeps-hickory-grove-christian/21457257/`
- Found: ~28–30 teams / 12–14 sports gr 6–12 with **V/JV/MS levels** + head coaches
  (Football Tad Baucom, Boys Bball Austin Turner, Girls Bball Dwayne Robinson, Baseball Nick
  Daddio); **NCISAA 3A**; 7 team state titles since 2002 (datable: Baseball 3A champ 2021 &
  2023, runner-up 2024; Boys Track D2 champ 2025). **D1 baseball signings Nov 2024:** Brady
  Johnson→ETSU, David Cabbage→UNCW, Ben Green→UNC Asheville (D1), Von Pelow→Mars Hill (D2).
  **Power 4 = 0 (confirmed null).** No pro alumni; no NIL/national/sports-medicine/facilities
  detail → those prose cards are confirmed-null/omit.

**Student Clubs**
- `https://www.privateschoolreview.com/hickory-grove-christian-school-profile` — **27 named
  orgs** (the school's own site has NO clubs page — confirm the roster against the yearbook
  / site during research before trusting one aggregator).
- Honor societies (5): NHS, NJHS, National Science HS, Quill & Scroll, Rho Kappa. Signature/
  service partial (Chick-fil-A Leadership Academy, Global Ambassadors, mission trips
  DR/Ecuador/Haiti/Kenya, HGBC food pantry). **Flagship competitive result NOT found (null);
  participation % NOT found (null).**

**After School**
- `https://www.hgchristian.org/life-as-a-lion/after-school-program` — Afterschool TK–5 &
  Study Hall 6–11, **2:30–5:30 PM, latest pickup 5:30**; enrichment activities listed;
  Adventure Days out-of-session **$35/day** TK–7 (a *different* program — do not use as the
  recurring aftercare rate).
- `https://www.hgchristian.org/admissions/tuition-and-fees`
- **Recurring aftercare price NOT published** → Cost Planner + `aftercare-cost` Compare row
  can't be built from published data (gap/null); `latest-pickup` 5:30 PM is found.

**Summer Programs**
- `https://www.hgchristian.org/academics/summer-camps` ;
  `https://www.hgchristian.org/athletics/athletic-camps`
- `https://brushfire.com/hgchristian/summer-camp` (details behind JS — not crawlable)
- Wayback (the catalog source):
  `http://web.archive.org/web/20230528052540/https://www.hgchristian.org/academics/summer-camps`
  ; `http://web.archive.org/web/20230528071242/https://www.hgchristian.org/athletics/athletic-camps`
  ; `http://web.archive.org/web/20221006211349/https://www.hgchristian.org/athletics/athletic-camps`
- Found: ~8 week-blocks Jun–Jul; **~15 named camps** (9–10 academic + 5–8 athletic, with
  categories, dates, **hours 9–1 academic / 9–12 athletic**, grades **rising 1st–8th** + one
  HS College Admissions Boot Camp, coaches). **Prices confirmed non-public** (Cost Planner
  omitted). **Wrap-around care confirmed NONE** (aftercare closed in summer).

**Financial Aid & Tuition**
- `https://www.hgchristian.org/admissions/tuition-and-fees` — **TK–5 $11,500 / 6–8 $12,500
  / 9–12 $13,750** (top tuition **$13,750**).
- `https://www.hgchristian.org/admissions/scholarships` — NCSEAA Opportunity Scholarship
  tiers, ESA+, FACTS Grant & Aid, 5% early-pay discount, FACTS payment plans.
- `https://projects.propublica.org/nonprofits/organizations/610604723` — church 990-exempt
  (confirmed; this is why the aid-outcome rows are nulls).
- **`top-tuition` found; `pct-aid` / `aid-awarded` / `avg-award` = confirmed nulls;
  `tuition-history` prose thin** (archives don't expose prior-year tuition).

**Rank labels.** For College Support, each college in `outcomes.colleges` carries
`{ name, cats }` only; the US News rank renders from the master `src/data/collegeRankings.ts`
via `rankLabelFor()`. Colleges already in the master (most of the ~120 acceptance list) get
their label **free**. For each college **not** in the master, add ONE row to
`collegeRankings.ts` + its source line to `source-material/college-support/US News 2026 -
Rank Labels.md`, using the **verbatim US News 2026** figure (Yahoo-search channel:
`https://search.yahoo.com/search?p=<school>+us+news+2026+ranked` works when usnews.com times
out). Never guess or use a prior-year number.

## Out of scope

- **NCSEAA state-voucher data** (per-school Opportunity Scholarship ~$1.44M / 224 recipients
  / ~$6,437 avg, 2023–24). Real and citable, but fits no existing Compare row and is **not**
  institutional need-based aid. Dropped per user. Do **not** add a voucher row/card, and do
  **not** conflate voucher $ with the aid-outcome rows.
- **Summer Cost Planner card** — omitted (no published prices).
- **Sports prose cards with no data** — Power 4 offers, pros, NIL, national profile, sports
  medicine, facilities are confirmed-null/omit; don't ship them as empty shells.
- **`the-arts :: facilities`** — not found; omit.
- No UX/layout/component changes. No new metric keys. No deploy (`npm run deploy` is the
  user's call).

## Steps

**Two-phase** — this adds ~165k-words-scale research prose and school-page text, so it ships
English-first, then the prose overlay layer for every locale after the user reviews the
English.

### Phase 1 — English

1. **Branch.** `git checkout -b feat/add-hickory-grove-christian` off latest `main`.

2. **Research + persist source-material, per area.** For each of the 8 areas, do a full
   research pass from the URLs in *Source material*, and write
   `source-material/<topic>/hickory-grove-christian/<School> - <Topic> - <Subtopic>.md`
   with a provenance header, source URLs, and record-level detail behind every figure (per
   the data-provenance standard). Key extraction tasks:
   - Course Offerings: **browser-read the Course Selection Guide SPA** to enumerate US
     courses per department (the count for the `us-courses` Compare row lives only there).
   - College Support: transcribe the profile PDF — acceptance list, GPA/rigor, SAT/ACT/AP
     distributions, National Merit / AP Scholars.
   - Summer: transcribe the ~15-camp catalog from the Wayback snapshots.
   - Confirm the club roster against the school/yearbook, not just PrivateSchoolReview.

3. **Ingest.** Run the `ingest-source-material` skill. It regenerates the distilled notes
   in `.claude/docs/`, `src/data/schools.json`, and `src/content/`. First add
   `hickory-grove-christian` → `Hickory Grove Christian School` to `SCHOOL_NAMES` in
   `.claude/skills/ingest-source-material/build_docs.py:35` so the ingest names it correctly.

4. **Metric rules — `src/lib/metrics.ts`.** For every new subtopic phrasing the ingest
   surfaces, add a `RULES` entry mapping it onto an **existing** card key. An unmatched
   subtopic silently becomes a new card (an unapproved UX change) — `npm run check:metrics`
   and the schema-doc ⚠️ flag catch these. Resolve every one onto an existing key.

5. **Structured per-school card files.** Create, mirroring the **fullest** school's file for
   each (Providence Day / Latin / Cannon), populating every optional field the data supports:
   - `src/data/sportsPrograms/hickory-grove-christian.ts` — offered (seasons w/ V/JV/MS),
     record (baseball titles 2021/2023, runner-up 2024, track 2025), pipeline (D1 baseball
     signings; P4 funnel = 0), coaching (names; pedigree thin), honors. Omit facilities /
     national / pros where no data.
   - `src/data/artsPrograms/hickory-grove-christian.ts` — ladder, theatre (Blumey ledger
     2025–26; *Seussical*, *Little Mermaid*), music (Band/Choir tracks), visual (Art I–IV,
     AP 2D Design). Omit facilities.
   - `src/data/clubsPrograms/hickory-grove-christian.ts` — affinity (thin), service
     (mission trips, food pantry), honors (5 societies).
   - `src/data/collegeSupportPrograms/hickory-grove-christian.ts` — transcript, counseling
     (Bennett/Similton), outcomes (acceptance list → `outcomes.colleges` as `{name,cats}`;
     buckets), edge, wholeClass (SAT/ACT/AP tables — set `noPercentiles: true` on tables
     that are means/tiers, not six-value percentile distributions), verdict.
   - `src/data/afterSchoolPrograms/hickory-grove-christian.ts` — coverage (TK–5 & 6–11 to
     5:30), dayInside (enrichment activities), verdict. **Omit the `cost` card** (no prices).
   - `src/data/summer/hickory-grove-christian.ts` — `catalog` only (~15 camps, flagged
     historical/representative). **Omit `costPlanner`** (no prices).

6. **Wire the imports.** Add the new per-school file to the `PROGRAMS` map in each topic
   root: `sportsProgram.ts`, `artsProgram.ts`, `clubsProgram.ts`, `collegeSupport.ts`,
   `afterSchool.ts`, `summerPrograms.ts`. **This is the silent-no-op trap** — the file does
   nothing until imported here.

7. **Standalone catalogs.**
   - `src/data/courseOfferings.ts` (`OFFERINGS`) — per-division course catalog + `guideYear`
     '2025-2026' from the Course Selection Guide.
   - `src/data/clubCatalog.ts` (`CATALOG`) — the full 27-org club list.
   - `src/data/clubClusters.ts` — Academic & Competitive Clubs rows.
   - `src/data/financialAidReports.ts` — the tuition/aid deep-dive report (tuition bands,
     NCSEAA/FACTS/ESA+ scholarship rungs, 5% early-pay, FACTS payment plans). Requires BOTH
     this REPORTS entry AND the `in-depth-report` metric key from ingest.

8. **College rank labels — `src/data/collegeRankings.ts`.** For each acceptance-list college
   **not** already in the master, add one row (verbatim US News 2026 figure) + its source to
   `source-material/college-support/US News 2026 - Rank Labels.md`. Colleges already present
   need no work. Note: `check:ranks` enforces ranked-**bucket** colleges but not a ranked
   `cats: []` college — labeling those is a manual research obligation.

9. **Compare values — `src/data/metricValues.ts`.** Add `hickory-grove-christian` to **all
   30 Compare rows** — a real value, or a deliberate `null` where confirmed unpublished.
   Nulls: Sports `p4-commits-2426` (=0/null per shape), Clubs `flagship-result` &
   `participation`, After School `aftercare-cost`, Fin Aid `pct-aid`/`aid-awarded`/
   `avg-award`, Summer `summer-care-span`, plus any area rows genuinely absent. Values:
   top-tuition $13,750, latest-pickup 5:30 PM, summer weeks/camps/ages, AP counts, bucket
   tallies (must equal the acceptance-list bucket counts), etc. `check:metrics` distinguishes
   null-vs-missing — no row may be simply absent.

10. **Brand — `src/data/brands.ts`.** Add the `hickory-grove-christian` entry: `color`
    (school navy/gold — pick the primary), `initials` (`HG` or `HGC`), and
    `welcomeVideoUrl: 'https://www.youtube.com/embed/hhtjvy5tCVE'` with a `// user-chosen,
    2026-08-17` comment (Carmel precedent). Don't let the slate fallback ship by omission.

11. **Regenerate schema + SEO.** `npm run schema` (the school changes the schema doc — build
    fails until regenerated). Confirm the pre-render picks up the new routes.

12. **Phase-1 verification** (see Verification). **→ STOP and report for the user's review of
    the English page before any translation.**

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English school page is what they want.

### Phase 2 — Every other locale (prose overlay layer)

Only after the user confirms the English page. This is the **overlay layer** per
`PROSE_TRANSLATED` in `src/lib/i18n.ts`, not the `src/locales/*.json` chrome catalogs.
Follow `.claude/docs/prose-translation-architecture.md` for the mechanism and the most-recent
worked rollout doc for the per-locale traps — don't re-derive them here.

1. **⚠️ Register the school in the i18n scripts FIRST — highest-risk step.** Before
   extracting, add `hickory-grove-christian` (+ its export mapping) to the hardcoded lists in
   **all six**: `scripts/i18n_extract.mjs`, `check_translations.mjs`, `check_chrome_keys.mjs`,
   `i18n_audit_skips.mjs`, `check_live_resolution.mjs`, and the per-slug
   `values.<slug>`/`subs.<slug>`/`quals.<slug>.kind` paths in `i18n_fields.mjs`. **A missing
   slug means the school is silently skipped and every locale reports 100% while containing no
   Hickory Grove strings.** Treat a clean coverage report as suspect until you confirm the
   school's strings actually appear in the extracted work files.

2. **Extract + classify new field paths.** Run the extractor; it flags unclassified field
   paths (a data-rich school often introduces some). Decide each: enum/code → skip;
   per-school heading that genuinely varies → prose. **Trap:** a per-school *lifted chrome
   heading* (`rosterTitle`, `checklistTitle`, `adjacentTitle`, … the `xTitle`-style fields)
   pins that heading to English in every locale. If a heading is identical for every school,
   it's chrome — leave it **off** the data file so the translated `sections.*` fallback wins.

3. **Translate the overlays** for every locale in `PROSE_TRANSLATED`, per the rollout docs.
   Figures are copied **char-for-char**, never re-typed (this matters most for the lakh/crore
   locales `hi`/`te`, which regroup at render — store the English 3-3-3 figure). RTL isolates
   for `fa`/`ar`.

4. **Phase-2 verification** (see below).

## Files touched

| File | Change |
|---|---|
| `source-material/*/hickory-grove-christian/*.md` | new — research data, all 8 areas |
| `source-material/college-support/US News 2026 - Rank Labels.md` | edit — rows for any unseen colleges |
| `.claude/skills/ingest-source-material/build_docs.py` | edit — add slug to `SCHOOL_NAMES` |
| `src/data/schools.json`, `.claude/docs/**`, `src/content/**` | regen — by ingest |
| `src/lib/metrics.ts` | edit — `RULES` for new subtopic phrasings |
| `src/data/sportsPrograms/hickory-grove-christian.ts` | new |
| `src/data/artsPrograms/hickory-grove-christian.ts` | new |
| `src/data/clubsPrograms/hickory-grove-christian.ts` | new |
| `src/data/collegeSupportPrograms/hickory-grove-christian.ts` | new |
| `src/data/afterSchoolPrograms/hickory-grove-christian.ts` | new (no `cost`) |
| `src/data/summer/hickory-grove-christian.ts` | new (`catalog` only) |
| `src/data/sportsProgram.ts`, `artsProgram.ts`, `clubsProgram.ts`, `collegeSupport.ts`, `afterSchool.ts`, `summerPrograms.ts` | edit — wire `PROGRAMS` import |
| `src/data/courseOfferings.ts`, `clubCatalog.ts`, `clubClusters.ts`, `financialAidReports.ts` | edit — add school |
| `src/data/collegeRankings.ts` | edit — rows for unseen colleges |
| `src/data/metricValues.ts` | edit — school on all 30 Compare rows |
| `src/data/brands.ts` | edit — color, initials, welcomeVideoUrl |
| `.claude/docs/DATA-SCHEMA.md` | regen — `npm run schema` |
| `scripts/i18n_extract.mjs`, `check_translations.mjs`, `check_chrome_keys.mjs`, `i18n_audit_skips.mjs`, `check_live_resolution.mjs`, `i18n_fields.mjs` | edit (Phase 2) — register slug |
| `src/data/overlays/**` (or the prose overlay files) | new (Phase 2) — translations |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run check:schema` — passes (run `npm run schema` first)
- [ ] `npm run check:metrics` — no unmatched subtopics; nulls-vs-missing resolved (school on
      all 30 rows)
- [ ] `npm run check:ranks` — every ranked-bucket college resolves; master agrees with the doc
- [ ] `npm run check:seo` — new pre-rendered page exists and clears the **20 KB `MIN_BYTES`
      floor** (a thin new school can fail this), meta description ≥70 chars, school name in markup
- [ ] `npm run build` — succeeds
- [ ] `npm run coverage:floor` — the new school lands at/above the Davidson Day floor (sanity)
- [ ] **Browser check** — open the Hickory Grove page **side-by-side with Providence Day**:
      included areas render to comparable depth; **omitted items are ABSENT, not empty**
      (Summer Cost Planner, After School cost card, arts facilities); Compare column shows
      values + N/A where expected; the brand badge is the real crest, **not** the slate
      fallback; Welcome Video plays.

### Phase 2 — Locales

- [ ] Confirm the school's strings appear in the extracted work files (NOT just a green run)
- [ ] `npm run check:runtime` — **authoritative** per-locale resolution guard; every overlay
      stamp resolves for every locale
- [ ] `npm run check:translations`, `check:sepdrift`, `check:money`, `check:currency` as the
      rollout docs call for
- [ ] **Browser print-out** on two schools (one being Hickory Grove) with panels expanded,
      per the standing render-layer lesson
- [ ] Note: `npm run check:live` is **known-incomplete** (fails on `main`; can't see
      course-offerings / metric-values / fin-aid-report / catalog / cluster) — do **not** treat
      its failures as a Phase-2 regression; `check:runtime` is the real guard.

## Risks

| Risk | Mitigation |
|---|---|
| i18n scripts silently skip the school → locales report 100% but contain no HG prose | Register slug in all six scripts **before** extracting; verify strings in work files, not the coverage number |
| Per-school file added but import not wired → renders prose, not the card, silently | Step 6 wires every `PROGRAMS` import; browser check confirms cards render |
| Course Selection Guide SPA can't be read → `us-courses` count missing | Browser-read the page in Phase 1 (step 2); it's the only source for that count |
| Thin school pre-renders under 20 KB → `check:seo` fails | Build areas to full depth (fullest-school model); check:seo is in Phase-1 verification |
| A lifted `xTitle` pins a heading to English in all locales | Step 2 of Phase 2: leave uniform headings off the data file |
| Building to Carmel's (thin) depth caps the school below its data | Mirror Providence Day / Latin / Cannon; side-by-side browser check |

## Open questions

- **Brand color** — school is navy/gold; pick the primary for `brands.ts`. **Default:** use
  the navy as `color`, `HG` as initials, if research doesn't surface an official hex.
- **Club roster provenance** — the 27-org list rides on one aggregator. **Default:** confirm
  against the school site/yearbook during research; if unconfirmable, flag the catalog card
  accordingly but still ship it.
