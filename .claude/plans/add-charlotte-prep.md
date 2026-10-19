---
name: add-charlotte-prep
title: Add Charlotte Preparatory School — a PreK–8 school, nine research areas, High School Placement as the headline
status: english-done
phases: 2
created: 2026-10-19
branch: feat/add-charlotte-prep
prs: []
---

# Add Charlotte Preparatory School

## Goal

Add Charlotte Preparatory School (PreK–8, Charlotte NC) as the app's thirteenth school and
the **second occupant of the K–8 shape**, after Trinity Episcopal. It ships nine research
areas, with High School Placement as the area that justifies it. It has **no College
Support area, no Global Exposure area and no Compare column**. Done means the page renders
in English and in all nine prose locales. The user reviews the rendered English page and
accepts how its gaps read **before** any translation starts.

## Context

### ⚠️ Start from this document, not from the older one

`.claude/plans/charlotteprep.md` (status *abandoned*, 2026-09-16) is an earlier attempt at
this same school. **The user explicitly asked (2026-10-19) to forget it and start from
scratch.** Do not read it for decisions, inherit its findings or re-run it. This plan comes
from a fresh `/add-school` assessment run on 2026-10-19, and everything here was
re-established from live sources that day. Leave the old plan and its INDEX row untouched.

### The school

- **Charlotte Preparatory School**, 212 Boyce Road, Charlotte, NC 28211.
- Slug `charlotte-prep`. Export name `charlottePrep`.
- Site https://charlotteprep.org/.
- **Grades PreK–8.** Montessori Pre-Primary entry starts at age 2. The footer on every page
  says "PreK-8th Grade". There is also https://charlotteprep.org/about/the-prek-8-model.
- About 440 students per Fast Facts. The admissions welcome page says "around 400"; record
  the conflict and do not pick one silently.
- **Form 990 filer:** EIN 45-2588411.

### The K–8 shape is built and has one occupant: copy Trinity mechanically

**Read §7 of [`DATA-SCHEMA.md`](../docs/DATA-SCHEMA.md) first.** Trinity Episcopal
([`add-trinity-episcopal.md`](add-trinity-episcopal.md), PR #312) is the worked precedent.
Its `## Implementation notes` section records where K–12 card types misfit K–8 data. Read
that section before writing any card. Everything a new K–8 school needs already exists:

| Piece | Where | Charlotte Prep needs |
|---|---|---|
| K–8 flag | `hasHighSchool` in `src/data/brands.ts:90` (Trinity entry `:217`) | `hasHighSchool: false` |
| Compare exclusion | `comparableSchools` in `src/lib/manifest.ts` | nothing — driven by the flag |
| HSP registry | `PROGRAMS` in `src/data/highSchoolPlacement.ts:329-332` | import + entry |
| HSP per-school dir | `src/data/highSchoolPlacementPrograms/` (read its `README.md`) | `charlotte-prep.ts` |
| HS master | `src/data/highSchools.ts` (`highSchoolFor(name)`) | rows for any destination it lacks |
| i18n school list | `SLUGS` / `EXPORTS` in `scripts/i18n_topics.mjs:26,102`. HSP is already in `TOPICS` (`:59`) | `'charlotte-prep'` + `'charlotte-prep': 'charlottePrep'` |
| School display name | `SCHOOL_NAMES` in `.claude/skills/ingest-source-material/build_docs.py` (Trinity `:50`) | one entry |
| Vimeo prerender | third-party embeds are already blocked during prerender (Trinity fix) | nothing |

**Structured-card registries.** Each needs one import and one `PROGRAMS` entry. A
per-school file without its import is a **silent no-op**.

| Root module | Per-school dir |
|---|---|
| `src/data/sportsProgram.ts` (`:433/447`) | `sportsPrograms/` |
| `src/data/artsProgram.ts` (`:395/409`) | `artsPrograms/` |
| `src/data/clubsProgram.ts` (`:284/298`) | `clubsPrograms/` |
| `src/data/afterSchool.ts` (`:394/407`) | `afterSchoolPrograms/` |
| `src/data/summerPrograms.ts` (`:299/330`) | **`summer/`**, not `summerPrograms/` |
| `src/data/admissionsPrograms.ts` (`:331/356`) | `admissionsPrograms/` |
| `src/data/highSchoolPlacement.ts` | `highSchoolPlacementPrograms/` |

**Standalone modules:** `clubClusters.ts`, `clubCatalog.ts`, `financialAidReports.ts`.
`courseOfferings.ts` is **not** touched; see Decisions.

**Per-school card titles.** `TITLE_OVERRIDES` exists in `artsProgram.ts` (Trinity `:340`)
and `admissionsPrograms.ts` (Trinity `:285`). Every override **must** come with a
`cards.<topic>.<card>@charlotte-prep` key in **all ten** `src/locales/*.json`. Otherwise
the heading renders the literal English in every locale, and `check:chrome` does not catch
it. Precedent: `the-arts.ladder@trinity-episcopal` at `src/locales/en.json:410`.

### How the data is published, and how to reach it

- **Site inventory:** https://charlotteprep.org/sitemap.xml points to
  `/cache/sitemap.xml.gz`, which lists 178 URLs including 113 news stories. **Enumerate
  from that. The site's own `/search` is unreliable.** Most specifics live in news stories,
  not section pages.
- **Issuu** (https://issuu.com/charlottepreparatoryschool) holds the high-school placement
  brochure, the 2022 viewbook and the summer brochure. The page images 403 unless fetched
  with header `Referer: https://issuu.com/`, using the page list in the
  `reader3.isu.pub/.../reader3_4.json` document.
- **Wayback** holds the summer catalog (live pages now 404), tuition history, the athletics
  history and Founders Field.
- **Vimeo** (vimeo.com/charlotteprep) needs a headed browser to list titles.
- **Name rule:** news stories name students as first name plus last initial. Under the
  standing no-minor-names rule, carry recognitions and aggregates, never the child.

## Decisions

These were made during the 2026-10-19 `/add-school` assessment, most of them by the user.
Do not re-litigate them.

**Coverage** (indicative, from the sweep). The K–8 shape has no Compare rows, so
percentages pool prose cards and structured-card fields only.

| Area | Prose | Structured | Coverage | Decision |
|---|--:|--:|--:|---|
| Admissions | 1/1 | 1/1 | ~100% (2/2) | **include** |
| Course Offerings | 1/1 | catalog 0/1 | ~50% (1/2) | **include, prose only** |
| Global Exposure | 1/1 | 7/9 | ~80% (8/10) after a deep pass, up from ~50% | **OMIT** |
| Student Clubs | 3/5 | 2/3 | ~63% (5/8) | **include** |
| The Arts | 5/7 | 5/5 | ~83% (10/12) | **include** |
| Sports | 5/8 | 2/3 | ~64% (7/11) after a deep pass, up from ~55% | **include as-is** |
| High School Placement | 3/3 | 4/4 | ~100% (7/7) | **include** |
| After School | 4/4 | 4/4 | ~100% (8/8) | **include** |
| Summer Programs | 1/1 | 2/2 | ~100% (3/3) | **include, archive-sourced** |
| Financial Aid & Tuition | 1/1 | 1/1 | ~100% (2/2) | **include** |

The gate is read live from `npm run coverage:floor`: the floor school is Davidson Day at
8/11 areas, and the bar is one below that, 7/11. **Charlotte Prep ships 9/11**, the same
count as Trinity. College Support is structurally absent and Global Exposure is omitted.

Per-area decisions:

- **Global Exposure: omitted, by having no `source-material/international-travel/charlotte-prep/` folder.**
  The deep pass raised the score, but the gain was mostly 2012–2015 history. There is
  **one** trip: Costa Rica, spring 2025, 12 middle-school students. The strategic plan
  calls it a "potential" grade 7–8 trip, and no repeat has been published. The Trieste /
  Ocotlán exchange last appears on the site in 2015. Sign-up and credential are confirmed
  not published. The useful community facts (77 countries, Spanish K–8, Model UN) belong
  in other areas' prose where they fit.
- **Sports: two cards, `offered` and `coaching`.**
  - `record` is omitted. Its `TitleResult` vocabulary is NCISAA state titles, and these
    are Queen City Conference titles, so they go as prose. This is the Trinity precedent.
  - `pipeline`, `honors`, `facilities` and `national` do not apply to a K–8 school (§7).
- **Course Offerings: one curriculum prose card. No `OFFERINGS` entry in `courseOfferings.ts`.**
  A course catalog is **confirmed not published**: no curriculum guide or program of
  studies exists anywhere in the 178-URL inventory or the PDFs it links. Shipping an empty
  catalog would break the zero-items rule.
- **Student Clubs:**
  - Cards `service` and `honors`.
  - `affinity` is omitted: no affinity groups are published. A Multicultural Club appears
    only in a 2017 Wayback snapshot.
  - No current clubs list is published, so the catalog prose is built from the activities
    found in news stories.
  - Check whether the `honors` card's shared title, "Honor Societies", fits a
    competition-only ledger. Charlotte Prep has no honor society. Trinity hit the same
    problem and left it as an open review item. A title override would need the user's
    OK, so raise it at review and do not change it in the build.
- **Admissions: two bands, chosen by the user.** They mirror the school's own process,
  which has two deadline tracks:
  - **Early School & K**, key `esk`.
  - **Grades 1–8**, key `g18`.

  The test split is spelled out **inside** the Grades 1–8 band, because it does not fall on
  the band boundary (see Per-area findings). Add a `TITLE_OVERRIDES` entry in
  `admissionsPrograms.ts` so the guide heading names these bands, along the lines of
  `Grade-by-Grade Application Guide — Early School & K · 1–8`. Follow Trinity's `:285`
  comment and add the matching locale key.
- **The Arts:** five cards (`ladder`, `theatre`, `music`, `visual`, `verdict`).
  - Add `TITLE_OVERRIDES` for `ladder` (K–8, not TK–12) and `theatre`. The shared title
    names the Blumeys, a high-school award a K–8 school cannot enter. Mirror Trinity's
    `:340` entry.
  - Each override needs its ten locale keys.
- **After School:** all four cards. The `cost` card *is* buildable here, unlike Trinity's,
  because the school publishes an annual price and a drop-in rate. Studio prices are a
  confirmed null.
- **Summer Programs:** `catalog` and `costPlanner`, from the 2026 Wayback capture. The live
  pages 404 and nothing for 2027 is posted. The card must say it describes summer 2026.
- **Financial Aid & Tuition:** the In-Depth Report plus a `tuition-history` card. **No other
  cards.** Keep provenance, gap lists and source URLs as `###` headings under the intro,
  never as `##`.
- **High School Placement:** all four cards (`outcomes`, `placement`, `destinations`,
  `verdict`), with the `outcomes` caveat below.
- **High School Placement class video (user request, 2026-10-19; design approved by the
  request itself).** The school's own Vimeo "Class of 2026 High School Destinations" (0:50,
  May 2026), embed form `https://player.vimeo.com/video/1193696537`, sits **below the
  area's four-card grid**. The design is in Claude Design → project *Charlotte School
  Compare Website Design* → `High School Placement Class Video.dc.html`; follow its
  "Notes back to engineering" exactly:
  - one optional field `classVideo?: { url, classYear }` on `HighSchoolPlacementProgram`,
    set to `{ url: 'https://player.vimeo.com/video/1193696537', classYear: 2026 }`
  - render it after the `.note-cards` grid closes, never as a grid item
  - reuse the `.welcome-frame` / `.welcome-embed` treatment with an h3 head
  - put the heading ("Where the Class of {{year}} Is Headed") and caption in new chrome
    keys with `{{year}}` / `{{school}}` interpolation, never as data strings
  - absent field → nothing renders (Trinity unchanged)
  - add no student names
- **No college card**, even though the school publishes about 90 colleges at
  `/academics/middle-school/college-destinations`. This is settled in §7. The list may stay
  in `source-material/`, but it renders nowhere.
- **Welcome Video:** `https://player.vimeo.com/video/1145994566`, "Lower School at
  Charlotte Prep", 1:11, Dec 2025, from the school's own Vimeo account. `player.vimeo.com`
  returns 401 to curl whatever the Referer. That is Vimeo bot-blocking, identical to
  Trinity's working embed, and not an embed restriction. Vimeo's oEmbed returns a normal
  embed for it.
- **Card depth:** mirror the **fullest** school for every K–12-shared card (Providence Day,
  Charlotte Latin, Cannon). Use Trinity only as the **mechanical** reference for the
  K–8-specific parts: the HSP file, the omitted cards and the overrides. Drop a field only
  where the data is genuinely unpublished.

## Approvals needed

**None before `/implement` starts.**
- A school addition is automatic (§6), and the K–8 shape was approved 2026-09-15.
- No material was found that fits no existing card.
- The `TITLE_OVERRIDES` entries follow the Trinity precedent: a retitled card is not a new
  card.
- The **class video below the HSP grid** is a UX addition the user requested directly, with
  a Claude Design artboard, on 2026-10-19. That request is the approval; build it to the
  artboard.

Two things **are** put to the user at the Step 15 review, not decided by `/implement`:

- The `honors` clubs title. Changing it is a UX change and needs the user's OK.
- Whether the rendered gaps read acceptably.

## Source material

Nothing was written during planning. The `/add-school` sweep was reconnaissance and its
findings are **indicative**. `/implement` does the real research pass, starting from the
URLs below, and writes the source files. Name each one
`source-material/<topic>/charlotte-prep/Charlotte Preparatory School - <Topic> - <Subtopic>.md`.
Each file needs a provenance header and source URLs, and must say which items are
*confirmed not published* and which were simply *not found*.

| Topic folder | Planned files (subtopic) |
|---|---|
| `admissions` | Application Process and Testing · CAIS Consortium 2027-28 |
| `course-offerings` | Curriculum by Division |
| `student-clubs` | Club Catalog and Traditions · Academic and Competitive Clubs · Service and Civic Engagement |
| `the-arts` | Program Overview and Ensembles · Productions and Recognition |
| `sports` | Sports Offered and Participation · Selected Results and Coaching |
| `high-school-placement` | Placement Outcomes · The Placement Program · Where They Land |
| `after-school` | After School Program and Studios |
| `summer-programs` | Summer Adventures 2026 Catalog · Summer 2026 Costs |
| `financial-aid-tuition` | Tuition and Fees 2026-27 · Tuition Assistance · Tuition History · Form 990 |
| `branding` | Crest and Brand Color |

Match subtopic phrasings to existing rules in `src/lib/metrics.ts`. Trinity's filenames are
the proven set; reuse them where the content matches.

## Out of scope

- Global Exposure, College Support, any Compare row or `metricValues.ts` entry, and podcast
  episodes.
- A Latest News section (that is the separate `add-school-news` skill).
- Any change to a K–12 card type. A K–8-aware `PlacementClass` / `WinningRecord` is a
  UX-gate conversation recorded in Trinity's notes, not part of this plan.
- `npm run deploy`. It is never run without the user's in-the-moment instruction.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout -b feat/add-charlotte-prep` from an up-to-date `main`. Stage
   explicit paths only, never `git add -A`.

2. **Capture the at-risk sources first, before any other research.**
   - **The summer catalog** from Wayback:
     https://web.archive.org/web/20260226113337/https://charlotteprep.org/community/summer-camp-registration
     and https://web.archive.org/web/20260226113216/https://charlotteprep.org/community/summer-camp/summer-camp-brochure.
     The live pages already return 404.
   - **The Issuu high-school placement brochure**, transcribed page by page.
   - **The 2026–27 tuition page.** It is versioned by school year.

   Write their full text into the source files.

3. **Deep research pass, one area at a time.** Start from Per-area findings and the URL
   list below. Write every `source-material/` file in the table above. Carry every
   denominator. Resolve or explicitly record every conflict listed in Per-area findings.
   - **Form 990:** check Schedule I and Part IX for grants and scholarships. Retrieve the
     XML via the IRS TEOS bulk zips, because ProPublica's PDFs often 403; see memory
     `irs-990-retrieval-path`. If it yields a total-aid figure, it fills the one Financial
     Aid gap. Label it as coming from the 990, not from the school.
   - **Branding:** sample the brand color from the school's own logo or wordmark, and save
     a usable crest as `public/logos/charlotte-prep.png`.

4. **Ingest.**
   - First add `"charlotte-prep": "Charlotte Preparatory School"` to `SCHOOL_NAMES` in
     `.claude/skills/ingest-source-material/build_docs.py`.
   - Then run the **`ingest-source-material`** skill.
   - **Verify:** `src/data/schools.json` lists `charlotte-prep` with **exactly nine topics**,
     and **no `college-support` or `international-travel`**.

5. **Metric mapping.** Run `npm run check:metrics`. Expect **zero unmatched subtopics**, and
   `charlotte-prep` listed in its Compare-excluded skip line. Map any unmatched phrasing
   onto an **existing** key in `src/lib/metrics.ts`. An unmatched subtopic silently becomes
   a new card, which is an unapproved UX change.

6. **`src/data/brands.ts`:** add a `charlotte-prep` entry modelled on Trinity's (`:217`):
   - `color` (sampled, not guessed), `initials` (e.g. `'CP'`, after checking for clashes
     with existing entries), `city: 'Charlotte'`
   - `logo: '/logos/charlotte-prep.png'`, `hasHighSchool: false`
   - `welcomeVideoUrl: 'https://player.vimeo.com/video/1145994566'`

7. **High School Placement, the headline area.**
   - Write `src/data/highSchoolPlacementPrograms/charlotte-prep.ts` and wire it into
     `PROGRAMS` in `src/data/highSchoolPlacement.ts`.
   - Add a row to `src/data/highSchools.ts` for every named destination the master lacks.
     Per-school files carry only `{ name, slug? }`. Store rank labels **whole** (§7).
   - Read the `outcomes` caveat in Per-area findings before writing `classes`.
   - **Class video** (see Decisions):
     - add the optional `classVideo` field to the `HighSchoolPlacementProgram` type in
       `src/data/highSchoolPlacement.ts`
     - render the block in `SchoolDetail.tsx`, after the HSP section's `.note-cards` grid
       (or in `src/components/HighSchoolPlacement.tsx`, whichever keeps it outside the
       grid), reusing the Welcome Video frame classes in `src/index.css`
     - add the heading and caption keys to `src/locales/en.json` (`school.classVideo*` or
       the nearest existing namespace)
     - set the field on Charlotte Prep only
     - keep the same `allow` / `referrerPolicy` / `loading="lazy"` iframe attributes as
       `WelcomeVideo.tsx`, and confirm `prerender.mjs`'s third-party embed block covers
       this iframe too

8. **Sports.** Write `src/data/sportsPrograms/charlotte-prep.ts` with `offered` and
   `coaching` only, and wire the import. The QCC titles go in prose. Avoid the three traps
   listed in Per-area findings.

9. **The Arts.**
   - Write `src/data/artsPrograms/charlotte-prep.ts` with `ladder`, `theatre`, `music`,
     `visual` and `verdict`, and wire the import.
   - Add `TITLE_OVERRIDES['charlotte-prep']` for `ladder` and `theatre`, plus `verdict` if
     its "why it holds up" column ships empty, as Trinity's did.
   - Add the matching `cards.the-arts.<card>@charlotte-prep` keys to `src/locales/en.json`.
     The other nine catalogs come in Phase 2.

10. **Student Clubs.**
    - Write `src/data/clubsPrograms/charlotte-prep.ts` with `service` and `honors`, and
      wire the import.
    - Add entries to `src/data/clubClusters.ts` (Academic & Competitive) and
      `src/data/clubCatalog.ts` (`CATALOG`). Both are prose-metric cards: they render only
      if a subtopic resolved to `academic-clubs` / `catalog`, so name the source files
      accordingly.
    - Apply the zero-items rule to any cluster or division with nothing in it.

11. **After School.** Write `src/data/afterSchoolPrograms/charlotte-prep.ts` with
    `coverage`, `cost`, `dayInside` and `verdict`, and wire the import.

12. **Summer Programs.** Write `src/data/summer/charlotte-prep.ts` with `catalog` and
    `costPlanner`, and wire the import. Label everything as summer 2026, and hedge camp
    hours and early-bird status per Per-area findings.

13. **Admissions.**
    - Write `src/data/admissionsPrograms/charlotte-prep.ts` with the `guide` card, bands
      `esk` / `g18`, and wire the import.
    - Add the `TITLE_OVERRIDES` entry and its `en` locale key.
    - Leave lifted chrome headings (`xTitle`-style fields) **off** the data file.

14. **Financial Aid and regenerate.**
    - Add the `charlotte-prep` report to `src/data/financialAidReports.ts`.
    - Run `npm run schema`, then `npx tsc -b`, `npm run check:seo` and `npm run build`.

15. **→ Browser review: the step that decides.**
    - Run the app. Read Charlotte Prep's page **in a real browser with every `<details>`
      expanded**; a collapsed page hides the financial figures.
    - Compare it side by side with **Providence Day** (the fullest school) and **Trinity
      Episcopal** (the K–8 precedent). Record expanded text length and card count for all
      three, as Trinity's notes did.
    - **Confirm:**
      - nine areas render
      - College Support and Global Exposure are **absent, not empty**
      - omitted cards are absent, not shells
      - no Compare button appears anywhere, and `?schools=charlotte-prep` cannot inject a
        Compare column
      - the badge is the crest, not the slate fallback
      - the Vimeo video plays
      - the `@charlotte-prep` card titles render
      - the Class of 2026 video sits below the HSP grid and plays
      - Trinity's HSP section is unchanged, with no empty video frame
    - **Then show the user and ask directly whether the rendered gaps read acceptably.**
      Name the thinnest areas: Sports at 2 cards, Course Offerings with no catalog, and the
      Clubs `honors` title question.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

**Two layers, both in scope:**

- **Research prose:** the overlay layer for the nine `PROSE_TRANSLATED` locales
  (`src/lib/i18n.ts:182`): `es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`.
- **UI chrome:** the new `@charlotte-prep` title keys in the nine non-`en` catalogs of
  `TRANSLATED` (`src/lib/i18n.ts:108`).

The mechanism is in
[`prose-translation-architecture.md`](../docs/prose-translation-architecture.md). Use
[`prose-translation-bn.md`](../docs/prose-translation-bn.md) and
[`prose-translation-ht.md`](../docs/prose-translation-ht.md) as worked examples, and read
Trinity's `## Implementation notes — Phase 2` before starting.

16. **Register the school.** In `scripts/i18n_topics.mjs`, add `'charlotte-prep'` to
    `SLUGS` and `'charlotte-prep': 'charlottePrep'` to `EXPORTS`. That one file is enough;
    every consumer imports it, so never re-declare the constants. `high-school-placement`
    is already in `TOPICS`.

17. **Splice, do not re-extract.** Add Charlotte Prep's units to each work file by
    **stamp**, joining by stamp and never by index (memory `splice-not-reextract-for-new-school`).
    Then confirm **positively** that Charlotte Prep's own strings appear in the extracted
    output, with non-zero units for every one of its nine topics. Treat a 100% coverage
    report as suspect until you have seen them.

18. **Classify any newly surfaced field paths** in `scripts/i18n_fields.mjs`:
    enum/code → skip, per-school heading → prose. Trinity's build surfaced 43 such paths,
    so expect a round of these edits.

19. **Translate, build overlays, merge by stamp.**
    - Figures are copied char-for-char, units included, and never converted.
    - Mind `hi`/`te` lakh/crore grouping and `fa`/`ar` RTL isolates.
    - **If translating locales in parallel, do not share a scratchpad.** Read memory
      `parallel-locale-agents-collide` first. Run `node scripts/check_work_integrity.mjs`, the integrity check that
      asks whether prose is in the right language.

20. **Chrome keys.** Add the `@charlotte-prep` card-title keys **and the two class-video
    keys** (heading + caption, keeping `{{year}}` / `{{school}}` intact) to the nine non-`en`
    catalogs. Reuse each locale's existing un-scoped title and change only the band or
    grade span.

## Files touched

| File | Change |
|---|---|
| `source-material/<9 topics + branding>/charlotte-prep/*.md` | new: the research record |
| `src/data/schools.json`, `src/content/**`, `.claude/docs/*` notes | regenerated by ingest |
| `.claude/skills/ingest-source-material/build_docs.py` | edit: `SCHOOL_NAMES` |
| `src/lib/metrics.ts` | edit only if a phrasing needs mapping to an existing key |
| `src/data/brands.ts` | edit: new entry incl. `hasHighSchool: false` + Vimeo URL |
| `public/logos/charlotte-prep.png` | new |
| `src/data/highSchoolPlacementPrograms/charlotte-prep.ts` | new: 4 cards |
| `src/data/sportsPrograms/charlotte-prep.ts` | new: 2 cards |
| `src/data/artsPrograms/charlotte-prep.ts` | new: 5 cards |
| `src/data/clubsPrograms/charlotte-prep.ts` | new: 2 cards |
| `src/data/afterSchoolPrograms/charlotte-prep.ts` | new: 4 cards |
| `src/data/summer/charlotte-prep.ts` | new: 2 cards |
| `src/data/admissionsPrograms/charlotte-prep.ts` | new: `guide` |
| `src/data/{highSchoolPlacement,sportsProgram,artsProgram,clubsProgram,afterSchool,summerPrograms,admissionsPrograms}.ts` | edit: import + `PROGRAMS` entry each; `TITLE_OVERRIDES` in arts + admissions |
| `src/data/{highSchools,clubClusters,clubCatalog,financialAidReports}.ts` | edit |
| `src/data/courseOfferings.ts`, `src/data/metricValues.ts` | **NOT touched** |
| `src/locales/*.json` | `@charlotte-prep` title keys: `en` in Phase 1, nine others in Phase 2 |
| `scripts/i18n_topics.mjs`, `scripts/i18n_fields.mjs` | Phase 2 edits |
| `src/data/overlays/*.json` | Phase 2: translated prose |
| `.claude/docs/DATA-SCHEMA.md` | regenerated by `npm run schema` |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean. Trust `tsc -b`, not `tsc --noEmit`.
- [ ] `npm run check:metrics`: zero unmatched subtopics, and `charlotte-prep` listed in the
      Compare-excluded skip line.
- [ ] `npm run schema && npm run check:schema`: no drift.
- [ ] `npm run coverage:floor`: Charlotte Prep reported under "Excluded from the floor" at
      **9/11** areas.
- [ ] `npm run check:seo`: passes.
- [ ] `npm run build`: succeeds with all checks chained.
- [ ] `grep -c charlotte-prep src/data/metricValues.ts` returns **0**.
- [ ] `src/data/schools.json` shows 9 topics, none of them `college-support` or
      `international-travel`.
- [ ] **Step 15 browser check passed, and the user has accepted how the gaps read.**

### Phase 2 — Locales

- [ ] Charlotte Prep's strings appear in every work file, with non-zero units in all nine
      topics. Check this directly; do not infer it from a coverage %.
- [ ] `npm run check:chrome`: the `@charlotte-prep` keys are present in all ten catalogs.
- [ ] `npm run check:runtime` (authoritative) and `npm run check:live`: clean.
- [ ] `node scripts/check_work_integrity.mjs`, `python3 scripts/check_figures.py` per topic, plus `check:sepdrift` / `check:money` /
      `check:dates` per locale.
- [ ] `npm run build`: succeeds.
- [ ] Runs against `npm run build && npx vite preview`: `npm run audit:moneyrender`,
      `npm run audit:daterender` and `npm run audit:mobile`.
- [ ] **Browser print-out with panels forced open**, in one RTL locale (`fa` or `ar`) and
      one lakh/crore locale (`hi` or `te`). The `@charlotte-prep` headings must be
      translated, and the deep-dive figures must actually appear.

## Risks

| Risk | Mitigation |
|---|---|
| The user rejects the rendered page | Step 15 puts the review before any locale work and asks directly, naming the thin areas. Prefer omitting a card to padding it with not-published notes. |
| A structured-card file ships without its import, a silent no-op | Steps 7–13 each name both edits. Step 15 confirms the cards render. |
| A `TITLE_OVERRIDES` entry renders English in nine locales | Step 20, plus the print-out check. `check:chrome` does not see overrides. |
| Stale figures shipped as current ("18 titles", a departed coach, stale packet dates, a 2022 W-2 reference) | Each is called out in Per-area findings. Treat any figure without a date as suspect. |
| A school's sources contradict each other (see Per-area findings) | Record both in the source file. Ship the more specific or more recent one, with the date it carries, or hedge. Never average. |
| Summer is out of date by publication | Label the cards 2026. If a 2027 catalog appears during `/implement`, use it instead. |

## Open questions

- **Derived `acceptedCount` in HSP `outcomes`.** The school publishes 97% (2026) and 100%
  (2024) but never the counts; 38/39 and 29/29 come from its named-graduate lists.
  **Default:** if the deep pass confirms each list is the whole class, ship both classes
  with a "count derived from the school's published list" note in the source file.
  Otherwise leave `classes: []` and carry the rates in `stats`, the Trinity precedent.
- **The Clubs `honors` title ("Honor Societies") over a competition-only ledger.**
  **Default:** ship the shared title and raise it at Step 15.
- **The aid deadline.** The page body says Jan 2 and its FAQ says Jan 15. **Default:**
  show both as the school's own conflicting statements, as a `verify` flag, and do not
  pick one.

## Per-area findings (from the 2026-10-19 sweep, indicative)

### Admissions: about 100%

2027–28 cycle. The year label and the dates **agree**: the CAIS brochure dates Fri Feb 26,
Fri Mar 5, Thu Apr 9 and Thu Apr 16, 2027.

| | Early School & K (`esk`) | Grades 1–8 (`g18`) |
|---|---|---|
| Priority application deadline | Jan 2 | Jan 15 |
| Supporting materials due | CAIS testing + teacher recs by Feb 1 | recs, testing, transcripts by Feb 26 |
| Decision | Feb 26, 4:00 p.m., by email | Apr 9, 4:00 p.m. |
| Enrollment contract due | Mar 5, noon | Apr 16, noon |

**⚠️ The test split does not fall on the band boundary:**

| Grade | Test |
|---|---|
| Montessori K / K, **and Grade 1** | WPPSI-IV |
| Grades 2–4 | WISC-V |
| Grades 5–8 | ISEE |
| Below Montessori K | none |

Never write "Grades 1–8 take the WISC-V" or any sentence of that shape.

Other facts:

- **Fees:** application fee $100. CAIS testing fee $300 for the WPPSI-IV or WISC-V.
- **Portal:** FACTS SIS Admissions.
- **Director of Enrollment:** Seher Khanna.
- **Age cutoffs (by Aug 1):** age 2 for Pre-Primary, 3 for Primary, 4 for TK, 5 for K.
- **Visits:** a Montessori Meet and Greet, and a K Play Day for applicants in Round 1.
- **Stale source:** the fall 2025 admissions packet carries Dec 31 and Feb 28. Ignore it.

URLs:
- https://charlotteprep.org/admissions/application-process
- https://charlotteprep.org/uploads/files/Admissions/2027-2028-Forms/cais-2027-2028-upload.pdf
- https://sis.factsmgt.com/admissions-parent/home?districtCode=cp-nc&memberId=1133
- Stale, do not use for dates: https://charlotteprep.org/uploads/files/Admissions/fall-2025-admissions-packet-web.pdf

### Financial Aid & Tuition: about 100%, one gap

**2026–27 tuition:**

| Program | Tuition |
|---|---|
| Pre-Primary, 8:30–12 | $17,700 |
| Primary, 8:30–12 | $18,500 |
| TK, 8:30–2:30 | $23,900 |
| Montessori K | $25,800 |
| K | $25,800 |
| Grades 1–4 | $28,800 |
| Grades 5–8 | $30,200 |

**Early School add-ons:**

| Add-on | Price |
|---|---|
| Pre-Primary/Primary "School Day" (only for families with a sibling in TK–8) | $3,400 |
| Pre-Primary/Primary Extended Day, to 5:30 | $5,900 |
| TK Extended Day | $2,700 |

**Fees:**

| Fee | Amount |
|---|---|
| Down payment (credited to tuition) | $2,000 |
| Parents' Association | $150 |
| New Family Commitment (one-time) | $1,000 |
| Tuition Refund Plan | about 1.45%, required unless paid in full by May 1 |
| Sibling discount | 3% |

Lunch is through FLIK and billed separately.

**Aid:** Clarity, grades K–8, need plus merit plus fit.
- **Conflict:** the aid deadline is Jan 2 in the page body and Jan 15 in the FAQ.
- **Stale reference:** the FAQ mentions "2022 W2 and 1040".
- **Not published:** the share of students on aid and total aid dollars. Try the 990.

**990:**
- ProPublica lists EIN 45-2588411.
- The latest extracted tax year is 2023 (FY ending June 2024), revenue $9,564,533.
- A tax-year-2024 filing is listed without extracted data.

**Tuition history (Wayback, K / 1–4 / 5–8):**

| Year | K | 1–4 | 5–8 |
|---|---|---|---|
| 2015 (unlabelled) | $16,860 | $17,800 | $18,350 |
| 2018–19 | $17,350 | $19,300 | $20,200 |
| 2021–22 | $19,100 | $21,300 | $22,300 |
| 2023–24 | $21,300 | $23,800 | $25,000 |
| 2024–25 | $22,400 | $25,000 | $26,250 |
| 2026–27 | $25,800 | $28,800 | $30,200 |

2025–26 is missing; those captures return HTTP 520.

URLs:
- https://charlotteprep.org/admissions/tuition-fees
- https://charlotteprep.org/uploads/files/Admissions/Tuition-Assistance/trp_20pamphlet_202026-2027.pdf
- https://charlotteprep.org/uploads/files/Admissions/Tuition-Assistance/2526-clarity-family-application-guide.pdf
- https://projects.propublica.org/nonprofits/organizations/452588411
- Wayback timestamps:
  - `20150804004312` (/admissions/tuition.cfm)
  - `20180204144733`
  - `20211206170346` (/admissions/tuition-fees)
  - `20230130003405`
  - `20241124043626`

### High School Placement: about 100%, the area that justifies the school

**`outcomes`:**

| Class | Published top-two rate | Graduates (named list) | Count (derived) |
|---|---|---|---|
| 2026 | 97%, "accepted into one or both of their top two choices" | 39 | 38 |
| 2025 | none published | 27 | — |
| 2024 | 100% (admissions packet) | 29 | 29 |
| 2023 | none published | 20 | — |

- The counts are **derived**; see Open questions. 2026 also: "15 students were accepted to
  every school they applied to."
- **Conflicts:**
  - The ten-year rate is "96% over the past 10 years" on the Middle School page, but "94%
    since 2015" in the Goldilocks story. Neither gives a denominator.
  - Fast Facts gives 614 alumni, 62 high schools, 23 private and 16 boarding, but the
    page's own destination list holds 64 schools, 19 of them boarding.
- **A cumulative sector split is NOT published.** Per-class splits from the named lists are
  our own counts and must be labelled that way:

  | Class | Independent | Public | Boarding |
  |---|---|---|---|
  | 2026 | 26 | 12 | 1 |
  | 2025 | 20 | 6 | 1 |
  | 2024 | 15 | 10 | 4 |
  | 2023 | 13 | 6 | 1 |

  York Prep Academy was counted as public charter, which is an assumption.
- **Scholarships:**
  - 2025: a Grant D. Williams Foundation Scholarship at Providence Day, and a
    Michaels-Dickson Scholar at McCallie.
  - "Over the past 16 years… 11 graduates to McCallie, seven of whom earned the
    Michaels-Dickson."

**`placement`:**

- **The team is published by title only:** head of middle school, assistant director of
  placement, placement coordinator. The Head of Middle School is named, **Jessica
  Stargell**, who also teaches the grade 8 Leadership class. The other two titles are
  unnamed.
- **The path:** a 12-step path in the Issuu brochure, plus:
  - a spring Parent Coffee for rising grade 8 parents
  - a September High School Fair and Boarding School Fair (40+ schools invited)
  - one-on-one meetings with each grade 8 student and their parents
  - interview etiquette taught in the Leadership class, and mock interviews
  - free ISEE prep, with the ISEE taken in grade 7 for practice and in grade 8 for real
  - transcripts and recommendations sent electronically
- **Not published:** how many schools families typically apply to. SSAT is never
  mentioned.

**`destinations`:**

- 64 named high schools in four school-defined categories:

  | Category | Schools |
  |---|---|
  | Charlotte-area independent | 14 |
  | Boarding (includes UNCSA and the SC Governor's School) | 19 |
  | Charlotte-area public | 17 |
  | Other cities and countries | 14 |

- Per-class named lists exist for 2023–2026. 2022 and earlier were not found.
- The brochure's list differs slightly from the page's; reconcile and record.
- The master groups schools by its own `kind`, not by the school's own categories (§7).

URLs:
- https://charlotteprep.org/student-life/beyond-charlotte-prep
- https://charlotteprep.org/academics/middle-school
- https://charlotteprep.org/academics/middle-school/high-school-admissions-process
- https://issuu.com/charlottepreparatoryschool/docs/cp-hsbrochure_for_web
- https://charlotteprep.org/about/fast-facts
- News stories, each at `https://charlotteprep.org/community/news/stories/<slug>`:
  - `class-of-2026-high-school-destinations`
  - `class-of-2025-high-school-destinations`
  - `class-of-2024-high-school-destinations`
  - `class-of-2023-high-school-destinations`
  - `the-goldilocks-effect-choosing-the-right-sized-school`
  - `prep-to-mccallie-and-beyond`
  - `the-path-to-high-school`
  - `top-high-schools-visit-recruit-prep-students`
  - `testing-at-charlotte-prep`
  - `prep-8th-grader-accepted-at-walnut-hill-school-for-the-arts`

### Sports: about 64%, two cards

**`offered`:** 11 teams, grades 5–8 (5th graders play).

| Season | Sports |
|---|---|
| Fall | Coed Cross-Country, Boys Soccer, Girls Tennis, Girls Volleyball |
| Winter | Boys & Girls Basketball |
| Spring | Coed Golf, Girls Soccer, Boys Tennis |
| Not stated | Girls Cheer (a Country Day page shows a winter fixture) |

- **Younger grades:** After School Athletic Studios cover Pre-Primary through grade 8.
- **Fees:** athletics fees have been folded into tuition since 2024–25.
- **Participation conflict:** Fast Facts says 70+%; the athletics page says "more than 80
  percent".
- **History:** lacrosse and flag football existed around 2010–2013 and are gone.

**`coaching`:**

- **AD Renee Suttles:**
  - B.S., Kennesaw State
  - at Charlotte Prep since 2018, as middle school PE teacher and Intramural Coordinator
  - previously Moses Middle School, GA, where she coached softball and girls' basketball
  - Clover SD Teacher of the Year, 2011
  - attended AD training in summer 2025
- **The previous AD was "Coach Shelley"** (`lshelley@`, still AD in September 2024).
  Earlier ADs were Josh Lutkus (2013) and Coach Floyd (2015).

**Results (prose):**

- Girls' basketball, 2023–24: QCC regular season (first in 10 years) and QCC Tournament
  (first in 14 years).
- Girls' volleyball: QCC Tournament, October 2024.
- QCC is the **Queen City Conference**, per the 2013 archived portal. In 2010 the school
  played in the Charlotte-Gaston Athletic Association.

**Facilities:**

- **Founders Field**, developed in 2013 and dedicated March 2014. The name appears only in
  Wayback.
- The field is being restored after the modular classrooms on it were decommissioned in
  fall 2025. Hedge its current name and status.
- The gym is unnamed and doubles as the theatre.

**Confirmed not published:**
- the QCC membership roster (publish none)
- win-loss records
- sports medicine (no athletic trainer; a full-time RN only)
- team levels (A/B)
- individual awards

**⚠️ Traps:**
- Fast Facts' "18 conference and tournament titles" is unchanged since 2013, when it read
  "in the last five years". **Never present it as current.**
- Volleyball coach Mandi Mohammed is no longer in the staff directory, and Coach Shelley
  is the former AD. **Name neither as current staff.**

URLs:
- https://charlotteprep.org/student-life/athletics
- https://charlotteprep.org/about/faculty-staff-directory?id=455452
- News stories at `https://charlotteprep.org/community/news/stories/<slug>`:
  - `tigers-win-qcc-championship`
  - `victory-for-girls-volleyball`
  - `playing-it-forward-prep-grads-give-back`
  - `summer-of-growth-teachers-learning-leading-and-innovating`
  - `message-from-head-of-school-coffee`
- https://charlotteprep.org/about/strategic-plan-2022-2027
- Wayback:
  - https://web.archive.org/web/20130719131848/http://www.charlotteprep.org/athletics/portal/default.asp
  - https://web.archive.org/web/20101226175815/http://www.charlotteprep.org:80/athletics.html
  - https://web.archive.org/web/20211206172645/https://www.charlotteprep.org/student-life/athletics
  - https://web.archive.org/web/20150807133708/http://www.charlotteprep.org:80/about-us/campus.cfm
  - https://web.archive.org/web/20150227033323/http://www.charlotteprep.org:80/fielddedication
  - https://web.archive.org/web/20130130002213/http://www.charlotteprep.org:80/fastfacts
- https://www.charlottecountryday.org/cd-experience/athletics/teams/athletics-team/~athletics-team-id/167

### Student Clubs: about 63%

**`service`:**

- Five goals stated for the program.
- Events: the Annual Family Day of Service, the Student Morning of Service, the PA Holiday
  Drive ("Preppy's Pantry") and Lower School nursing-home visits.
- Student projects: a Hurricane Helene drive, the grade 8 BUDEE tutoring of grade 4
  buddies, and a grade 3 day at Weddington Farm.
- The current page names no partner organisations. The 2018 partners are stale.
- A service-hours requirement is not published.

**`honors` (competition only):**

- CHARMUN Model UN: the school's first delegate awards in 2023, two more in 2024 with 20
  delegates attending. The club has run since 2020.
- 2024 NC State Science & Engineering Fair: 3rd place in physics.
- **There is no honor society.**

**Catalog prose:**

- Activities currently evidenced in news stories: Model UN, Set Design club and Stage Crew,
  the student-founded D&D Club, and Student Council.
- Traditions: BUDEE mentorship, the Honor Code and Four Pillars, Joy Term (January 2025
  and 2026), the Pep Rally, Ignite presentations, and Grandparents & Special Friends Day.
- The 2017 clubs list is stale; do not present it as current.

URLs:
- https://charlotteprep.org/community/service-learning
- https://charlotteprep.org/student-life/leadership
- https://charlotteprep.org/about/diversity-equity-inclusion-belonging
- News stories at `https://charlotteprep.org/community/news/stories/<slug>`:
  - `model-un-club-awarded-at-conference`
  - `prep-scholar-awarded-at-state-science-fair`
  - `support-for-hurricane-helene-recovery`
  - `prep-s-inaugural-joy-term`
  - `joy-term-returns`
  - `how-our-middle-schoolers-become-leaders`
  - `a-stage-set-for-success`

### The Arts: about 83%, every card thin-ish

- **`ladder`:**
  - K–4 fine arts sit inside a 6-day rotation.
  - Band runs grades 4–8.
  - In grade 5, students choose Chorus or Band and also take Drama and Art; from grade 7
    they choose Drama or Art. Middle-school drama is a year-long elective.
  - After School Studios add arts options.
  - Per-grade frequency is unknown; check the packet's sample schedules.
- **`theatre`:**
  - *Willy Wonka Jr.*, April 19–20, 2024, the grade 3–8 musical, staged in the gym.
  - *Alice*, a one-act, November 14–15, 2025.
  - Full lists of productions by year were not found, and Vimeo may hold them.
- **`music`:**
  - Band and choruses.
  - Performances at Knights and Hornets games and at the Biltmore Estate.
  - A Carnegie Hall performance with Distinguished Concerts International New York is
    **uncorroborated**. Verify or hedge it.
- **`visual`:**
  - A spiral curriculum covering drawing, painting, printmaking, sculpture, collage,
    weaving and digital photography.
  - A Winter Fine Arts Showcase.
  - Scholastic awards were NOT FOUND, and the deep pass should check.
- **Faculty and facilities:** faculty are in the staff directory. The Music Cottage and Art
  Studio are named only in passing.

URLs:
- https://www.charlotteprep.org/student-life/fine-arts
- News stories at `https://charlotteprep.org/community/news/stories/<slug>`:
  - `charlotte-prep-presents-willy-wonka-jr`
  - `prep-players-present-alice`
- https://web.archive.org/web/20160331073126/http://www.charlotteprep.org/student-life/theater.cfm
- https://www.ncmea.net/wp-content/uploads/2026/06/JobDescription-MusicChorusTeacherK-8_updatedJune2026_JS-MW.pdf
- https://vimeo.com/charlotteprep

### Course Offerings: prose only

- **Montessori:** age bands 2–3, 3–4 and 5–6 (AMS member).
- **Lower School:** workshop model; a 6-day specials rotation of music, drama, art,
  Technology/STEM, Spanish and PE.
- **Middle School:**
  - Spanish is a core class; Spanish runs K–8.
  - Coding and robotics, and a Leadership class.
  - PE twice a week.
  - The packet says "math a full year ahead".
  - **8th-grade Algebra/Geometry is inferred only** from a CTP-5 Algebra sub-test note.
    Hedge it or drop it, since Trinity's equivalent claim proved unsupported.
- **Testing:** CTP-5 in grades 3–6, ISEE in grades 7–8, National Spanish Exam in grade 8.

URLs:
- https://charlotteprep.org/academics/academics-overview
- https://charlotteprep.org/academics/montessori-early-school
- https://charlotteprep.org/academics/lower-school
- https://charlotteprep.org/uploads/files/philosophy-of-education.pdf
- https://charlotteprep.org/uploads/files/portrait-of-a-graduate-2025.pdf
- News stories at `https://charlotteprep.org/community/news/stories/<slug>`:
  - `designing-an-excellent-curriculum`
  - `building-the-foundations-for-student-learning`

### After School: about 100%

**`coverage`:**
- The After School Program runs from dismissal to 5:30 for K–8, grouped as K, 1–2, 3–4 and
  MS.
- Early School Extended Day also runs to 5:30.
- Early drop-off is 8:00 (Early School) and 7:45 (Lower and Middle School).
- **Verbatim, a confirmed gap:** "No additional before-school care is available at this
  time."
- Younger siblings wait for an older sibling's later dismissal at no charge.
- Holiday and workday coverage: not found.

**`cost`:**

| Option | Price |
|---|---|
| After School Program, K–8, 3:00–5:30 | $4,500/yr |
| Drop-in | $20/hr |
| Early School add-ons | see the Financial Aid section |

**`dayInside`:**
- Snack, homework time, themed activities and free time.
- After School Studios: 12-week fee-based sessions, from a list labelled "Sample". Studio
  prices are **confirmed not published**.

URLs:
- https://charlotteprep.org/student-life/after-school
- https://charlotteprep.org/admissions/tuition-fees

### Summer Programs: about 100%, archive-sourced

**Summer Adventures at Prep 2026**, June 8 – July 31 (7 weeks).

- **Weekly options:**
  - Young Adventurers (Early School P/TK): full or half day
  - Traditional Camp (K–7): full or half day
  - Junior Counselor: rising or graduated 8th graders
- **Specialty camps (one or two a week):** Art Explorers, Amazing Athletes, Rhythm &
  Beats, Kidokinetics, Broadway Bound Juniors, GameMakers Coding, Basketball, Quantum
  Creators, Volleyball and Junior Gourmet.

**Prices:**

| Camp | Full day | Half day |
|---|---|---|
| Traditional Camp, most weeks | $500/wk | $250/wk |
| Traditional Camp, June 8 week | $525 | $275 |
| Traditional Camp, 4-day week | $420 | $225 |
| Young Adventurers, most weeks | $500/wk | $250/wk |
| Young Adventurers, 4-day week | $400 | $200 |
| Young Adventurers, June 22 week | $525 | $250 |

| Specialty camp | Price |
|---|---|
| Art Explorers, Junior Gourmet | $600 |
| GameMakers Coding, Quantum Creators | $550 |
| Broadway Bound | $525 |
| Amazing Athletes, Rhythm & Beats, Basketball, Volleyball, Kidokinetics (July) | $500 each |
| Kidokinetics (4-day week) | $400 |
| Junior Counselor | $300/wk |

| Extended care | Most weeks | 4-day week |
|---|---|---|
| Before Care (8:00–9:00) only | $60 | $55 |
| After Care (4:00–5:00) only | $60 | $55 |
| Both | $110 | $100 |

Midsummer Tutoring is an add-on at $60 per session, or $150 for all three.

**Uncertain, so hedge on the page:**
- Whether these prices are already early-bird discounted ($25 off per week through Jan 15)
  or regular.
- The camp-day hours, inferred as about 9–4. Macaroni Kid lists 8–4.
- The Nike Soccer Camp is run by a third party.

URLs:
- https://web.archive.org/web/20260226113337/https://charlotteprep.org/community/summer-camp-registration
- https://web.archive.org/web/20260226113216/https://charlotteprep.org/community/summer-camp/summer-camp-brochure
- https://issuu.com/charlottepreparatoryschool/docs/summer_adventures_2026
- https://www.ussportscamps.com/soccer/nike/nike-soccer-camp-charlotte-prep-school

### Not built: Global Exposure (for the record)

These findings were made but are not built:

- Costa Rica, spring 2025, 12 middle-school students, with three teachers named.
  - The strategic plan lists a "potential" grade 7–8 Costa Rica unit.
  - No repeat has been published.
- The Trieste / Ocotlán exchanges appear only in 2015 Wayback captures.
- Community size: 77 countries per Fast Facts, against 43 per the fall 2025 packet. That
  is a conflict.

Story: https://www.charlotteprep.org/community/news/stories/prep-middle-schoolers-visit-costa-rica.
If the user later wants this area, it is a separate `/global-exposure` run.

## Implementation notes — Phase 1 (2026-10-19)

Phase 1 shipped English-only on `feat/add-charlotte-prep`. `npm run build`
exits 0 with every chained check; `npm run audit:mobile` is clean at 320/360/390px; the
page was checked in real Chrome (headed Playwright) with every `<details>` open.

### How the page reads (Step 15)

| School | Expanded text | Cards | Areas |
|---|--:|--:|--:|
| Providence Day (fullest) | 182,086 | 44 | 10 |
| Trinity Episcopal (K–8 precedent) | 69,152 | 23 | 9 |
| **Charlotte Prep** | **64,191** | **25** | **9** |

Confirmed in the browser: nine areas; College Support and Global Exposure absent (not
empty); no empty card; no Compare link anywhere; `/compare/?schools=charlotte-prep,…` shows
no Charlotte Prep column; the badge is `/logos/charlotte-prep.png`; both Vimeo players load
(page titles "Lower School at Charlotte Prep" and "Class of 2026 High School Destinations");
the class video sits after the HSP grid, not inside it; Trinity renders no video frame; the
`@charlotte-prep` arts and admissions titles render; 0 backticks and 0 "not published"
phrases on the expanded page.

### Where the build deviated from the plan

1. **Three research filenames changed** so their subtopics fold onto existing metric keys
   instead of slugifying into unapproved cards: "Tuition Assistance" → **Financial Support**
   (Trinity's filename), "Productions and Recognition" → **Theatre Productions and
   Recognition**, After School → **After School Program Overview**. `check:metrics`: zero
   unmatched Charlotte Prep subtopics.
2. **HSP `outcomes`: `classes: []`, per the Open-question default.** No class size is
   published anywhere (178 URLs, both packets, both brochure revisions, six annual
   reports). The rates ship as stat tiles beside each class list's size ("39 graduates
   named on the class list"). New finds: a **96% rate for 2025** (2024-25 Annual Report) and
   a **95% "top choice" (singular) rate for 2023** — a different measure, so it is quoted in
   the subhead, not tiled. `tenYear` is unused because it renders only inside the class
   table; the 96% ten-year figure is a NO DENOM. tile instead.
3. **Destinations are the union of the website list, the brochure list and the 2023–2026
   class lists**, grouped by true kind (66 schools). **39 rows were added to
   `highSchools.ts`** and to the `_shared` companion doc, **all unranked** (Niche 403'd; US
   News needs a headed browser) — a follow-up. Two identifications are ours and noted in the
   rows: Northwestern HS = Rock Hill SC, York Prep Academy = York Preparatory Academy, Rock
   Hill. St. Andrew's resolves to the existing Delaware row though Charlotte Prep never says
   which — the card note says so.
4. **Summer prices corrected.** The plan's table was the registration form's (partly
   early-bird) prices; the cards use the brochure's regular prices ($525/$275 Traditional)
   and state the form's figures in a fee note. Camp hours are resolved: 9:00–4:00. June 29–
   July 3 is a closed week; the only four-day week is June 15–18.
5. **Financial Aid: the 990 series is eight years (FY2018–FY2025)**, newest $476,679 to 49
   students. The plan's 990 years were off by one ($9,564,533 is FY ending June 2023). The
   school DOES publish a share: "10% of Charlotte Prep families received tuition
   assistance" (2024-25) — families, not students, so never combined with the 990 count.
   Aid excludes Pre-Primary/Primary/TK. 2025-26 tuition is unarchived, so the tuition
   table compares with 2024-25 and labels every change "+15% (2 yrs)".
6. **Course Offerings: the plan's "8th-grade Algebra/Geometry is inferred only" now has a
   first-party line** (the April 2026 testing table's "CTP-5 Algebra Sub-Test (For students
   in Geometry or Algebra only)"). The body says only that some 8th graders are in Algebra
   or Geometry. Two 2018 Issuu curriculum overviews exist; the stale 2018 table and a
   publication-gap list were moved under `## Method` so they do not render.
7. **Course Offerings is the first school page to render `ProseContent` source chips**
   (no structured catalog, so its prose card renders). `.source-chip-label` is
   `nowrap` + ellipsis, which `audit:mobile` flagged as clipped at phone width. Fixed in
   data (labels ≤31 chars), not CSS. The latent CSS behaviour remains for any future
   prose-only card with long citation labels.
8. **Sports:** Country Day's team page 167 is girls' tennis, not cheer; the athletics page
   names **10** teams while Fast Facts says 11 — the tile says both. The AD date is
   unpublished; the 2020 bio is the source for the Clover/Moses details.
9. **Arts:** Scholastic recognition is now a *confirmed* absence (0 hits in 23 Mid-Carolina
   lists, 2020–2026); Carnegie Hall stays attributed to the school's own page, undated.
   Only `ladder` and `theatre` got overrides — the verdict ships a "why it holds up" column,
   so the shared verdict title stands.
10. **Clubs:** the plan's "Model UN + one science-fair result" grew to a Region 6 science
    fair record (19 state-advancing placements 2024–26; Junior Physics 1st three years) and
    a MOSAIC MS Diversity Club (catalog, not `affinity`). The stale service list is 2015,
    not 2018.
11. **Brand color #2b458c**, not the raw #1d2e5e, which sits 19–22 RGB units from three
    existing navies — graded along the school's own hue, the Trinity precedent.
12. **One extra chrome key**, `school.classVideoIframeTitle`, for the iframe's accessible
    title, beside the plan's heading and caption keys.
13. **Ingest side effect, not shipped:** a full rebuild rewrote every school's notes (date
    stamps) and also picked up a section PR #355 added to Davidson Day's Global Exposure
    source without re-ingesting. All non-Charlotte-Prep churn was reverted; that Davidson
    Day drift is pre-existing and left for its own change.

### Review change (user, 2026-10-19): Where Graduates Go + Where They Land merged

- **A K–8 school with both `outcomes` and `destinations` now shows them as ONE card**
  (option 1 of two offered). `hspCardsFor()` in `highSchoolPlacement.ts` drops the separate
  Where They Land card and the destination index renders inside Where Graduates Go, under
  its own "Where They Land" head, with one merged sources row. **Trinity is unchanged**,
  because it has no `outcomes`. Charlotte Prep's area is now 3 cards plus the video.
- **New `classTallies`** on `Outcomes`: per-class destination counts for 2023–2026,
  OUR count from the school's named lists, with names normalised to master spellings so they
  link. Ranks are hidden inside the tallies; they show once in the index below. Where tallies
  exist, the ACCEPTANCE ≠ MATRICULATION caveat is dropped, because these lists ARE where
  each graduate is heading.
- **A false headline was fixed.** "In each of the last four classes, more went to Charlotte
  Latin than anywhere else" was untrue: 2025 was a three-way tie at 6, and 2024 a tie with
  Providence High at 7. It now reads "across the last four classes, Charlotte Latin took the
  most: 29 of the 115 named graduates."
- **A latent build bug was fixed: `prerender.mjs`'s embed block never matched Vimeo.**
  `(^|\.)player\.vimeo\.com` needs a dot or start-of-string before `player`, but a real
  URL has `/`, so only `www.youtube.com` was ever blocked. Trinity built by luck. Charlotte
  Prep's two Vimeo embeds timed out the prerender. The pattern is now anchored on the host.
- `DATA-SCHEMA.md` §7 records the merge rule and the `classTallies` conventions (in the
  generator).

### For Phase 2

- New `en` chrome keys to translate (nine catalogs): `school.classVideo`,
  `school.classVideoCaption`, `school.classVideoIframeTitle`,
  `cards.the-arts.ladder@charlotte-prep`, `cards.the-arts.theatre@charlotte-prep`,
  `cards.admissions.guide@charlotte-prep`, and the tally keys
  `highSchoolPlacement.classTallies`, `.classTalliesNote`, `.tallyClass`,
  `.tallyListed_one` / `_other` (pluralised, so use each locale's CLDR plural forms;
  `ar` has six).
- Steps 16–20 as written. `high-school-placement` is already in `TOPICS`.

### Open for the user at review

- **The Clubs `honors` card is titled "Honor Societies"** over a competition ledger;
  Charlotte Prep has no honor society. A title override needs your OK.
- **Thinnest areas:** Sports (2 cards), Course Offerings (one prose card, no catalog).
- **The class video shows students' faces** (the school's own publication); the page adds
  no names. Worth one watch before it ships.
