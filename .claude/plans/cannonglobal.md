---
name: cannonglobal
title: Add Cannon School to Global Exposure — a compact five-card section (trips, school levels, "The Global Studies Certificate", a retitled network, verdict), no prices or exact travel dates on the page
status: english-done
phases: 2
created: 2026-10-15
branch: feat/cannonglobal
prs: []
---

# Cannon School — Global Exposure

## Goal

Give Cannon School a **Global Exposure** section (slug `international-travel`), the fourth
school after Providence Day, Charlotte Country Day and Charlotte Latin. Cannon publishes far
less than those three, so this is deliberately a **compact** section: **five cards** plus the
lead and stat strip, not Country Day's nine. Its value to a parent is Cannon's real Global
Studies Certificate, its JrK-to-12 language and global curriculum, and a clear list of what
to ask on the tour.

It works when `/school/cannon/` renders the section after Course Offerings with these cards
in registry order — **Where They Go · Global Learning at Each School Level · The Global
Studies Certificate · <the Network title> · Verdict & Ask the School** — every fact cites a
cannonschool.org page (or a Wayback copy of one); no student, parent, teacher or trip leader
is named; no trip price, deposit or exact travel date renders; and the other three schools'
sections are byte-for-byte unchanged.

## Context

**Whether to do this at all was asked and answered.** Mid-way through `/global-exposure`
(2026-10-15) the user asked whether Cannon was still worth adding. The answer given: yes, but
as a small section — Cannon has a genuine credential (only Providence Day among the three
shipped schools has one) and real global curriculum, but publishes no trip list, no
sign-up dates and no exchange partner. The user chose to proceed on that basis. Do not
pad the section toward Country Day's depth: **a card that cannot be filled is omitted, and
its gap goes to `verdict.ask`** (README rule).

**The area today.** Read before step 1, including their Implementation notes:
`.claude/plans/ccdglobal.md` (#344), `latinglobal.md` (#349 — the closest precedent; its
Phase 2 is the method), `gestandard.md` (#348), and #350 (fa/ar year-range isolates).

- Types, registry (`INTERNATIONAL_TRAVEL_CARDS`: `trips, exchanges, signup, community, start,
  credential, network, milestones, verdict`), `TITLE_OVERRIDES`, `PROGRAMS`, overlay loader:
  `src/data/internationalTravel.ts`.
- **Model file:** `src/data/internationalTravel/charlotte-country-day.ts` (header comment,
  URL constants, `'<domain> — <page>'` labels, tone, season `timing`). **Credential model:**
  the `credential` block of `src/data/internationalTravel/providence-day.ts`.
- Data rules: `src/data/internationalTravel/README.md` — omit-to-hide; gaps only in
  `verdict.ask`; figure fields (`stats[].value`, ledger `year`) hold figures only; quote marks
  only where they mean something; most-current figure wins, marked `~`.
- Renderer `src/components/InternationalTravel.tsx` — **no change needed**, confirmed at
  planning: `StatStrip` returns `null` for `[]` (line ~79); `NetworkBody` renders the
  conference ledger only when `data.conferences.length > 0` (line ~455), and the
  `ledgerTitle` only inside that guard, so `conferences: []` with no `ledgerTitle` renders no
  empty heading; `cells` is guarded (~465); `CredentialBody` (~413) treats `quote`/`award` as
  optional.
- `src/pages/SchoolDetail.tsx` filters the registry by `itEntry[c.key] != null`.
- Two gates (README): the data file + `PROGRAMS` entry, **and** the manifest entry from
  ingesting `source-material/international-travel/cannon/`.
- `scripts/i18n_topics.mjs:96` maps `cannon` → **`cannon`**, so the export is
  `export const cannon: InternationalTravelProgram`.
- Splice a new school into existing work files with `scripts/i18n_splice_work.mjs`. **Never
  re-extract** (memory `splice-not-reextract-for-new-school`).
- Shared chrome (`cards.international-travel.*`, `travel.*` in `src/locales/en.json`) names
  no school. The chrome change is **two new keys**: `cards.international-travel.credential@cannon`
  and `cards.international-travel.network@cannon` (precedents: `credential@providence-day`,
  `network@charlotte-latin`).

**The research.** Written during `/global-exposure`, 2026-10-15:

- `source-material/international-travel/cannon/Cannon School - International Travel - Deep Research.md`
  — PDF transcription, a lead sheet with planning notes on where the PDF was wrong.
- `…/Cannon School - International Travel - Source URLs.md` — **the citation record**. Page
  keys: IP, GSMC, WT, WT23, CAT, CURR, FAQ, K, G1, G3, MSL, ISP, FA, ENDOW, GRAT, CAL, PROF25,
  N-TECHO, N-CHINA, N-CR, N-FAC, N-STUDIOS, N-ROBOT, FF-JA, FF-AT, WB-TA-2019, WB-WT-2019. It
  holds the Verified table, a trips detail table, a "Not verified" table, conflicts and
  photo candidates. **Only fetched or Wayback rows may render.** Use the keys exactly.

Key findings the PDF got wrong: the **Global Studies Mastery Credits PDF loads** (the PDF
said it could not); the **TECHO Dominican Republic article loads** and is the richest trip
record (22 Upper School students, six days in Santo Domingo, selection by interview) and it
states the **Winterm 2025 TECHO Costa Rica trip** on Cannon's own site; the **Wayback Machine
is reachable** and adds a 2019 page about a Lower School family trip to Greece planned for
summer 2020.

## Decisions

- **Five cards; four omitted.** User decisions, AskUserQuestion, **2026-10-15** — the
  approval record:
  1. **Credential: include**, titled **"The Global Studies Certificate"** via
     `TITLE_OVERRIDES` (`credential@cannon`).
  2. **Network: include, retitled** via `TITLE_OVERRIDES` (`network@cannon`). The user
     approved the shape — WACC / UNC World View, Model UN + World Quest, the teacher Global
     Education Badge, 2026 faculty travel awards, no conference ledger. **Title:**
     `'The World Affairs Council, Model UN & the Global Education Badge'` (the suggested
     title in the approved option). It names three real things on the page.
  3. **Milestones: omit** — most dated events would repeat the trip ledger, and Cannon claims
     no firsts.
  4. **Community: omit** — the only source is a 2021 International Student Program page;
     it becomes a Verdict question.
  - **Exchanges: omit** — the Tianli (Luzhou, China) sister school is sourced only to
    Wikipedia and a 2008 press release. Verdict question.
  - **Signup: omit** — no deadlines published; the 2026–27 calendar has none.
- **Per-card standard (vs Country Day), recorded at `/global-exposure` B4:**

  | Card | Status | Reason |
  |---|---|---|
  | Lead + stats | at standard | 3 pure-figure tiles |
  | `trips` | **below standard** | Cannon publishes no trip list; grade/group/selection published only for the Dominican Republic trip |
  | `exchanges` | omitted | no first-party partner |
  | `signup` | omitted | no published deadlines |
  | `community` | omitted | user, 2026-10-15 |
  | `start` | at standard | |
  | `credential` | at standard, minus graduate counts | none published |
  | `network` | **below standard** | no membership, no conference ledger; renders retitled (user, 2026-10-15) |
  | `milestones` | omitted | user, 2026-10-15 |
  | `verdict` | at standard | ~11 questions |

- **Stat strip** (pure figures, each with a whose-count note):
  - `22` · Upper School students · "on the Winterm 2026 TECHO service build in the Dominican Republic, per the school" (N-TECHO)
  - `3` · languages to try in 5th grade · "French, Mandarin Chinese and Spanish, then students choose one" (FAQ)
  - `21` · teachers with the Global Education Badge · "our count from the school's list, 2017–2024" (IP)
- **The certificate — how the two rule sets are shown.** IP shows the original requirements
  *and* says "Starting with the Class of 2024, please refer to the Global Studies Mastery
  Credits requirements." Render the **current** rules, without contradicting the page:
  - `required`: Honors Glocal Perspectives in senior year, with a capstone (CAT 2026–27:
    "required for completion of the Global Education Certificate"; IP: capstone essay and a
    presentation on a global topic) · the four Mastery Credit strands, one item each —
    Communication and language proficiency (ACTFL targets of Intermediate Mid–High by level 4
    and Advanced Low in AP) · Independence, research and critical thinking · Intercultural
    competence or collaboration · Citizenship and leadership (GSMC).
  - `beyond`: the experiences the school names — a school-sponsored trip abroad, living
    abroad for a month or more, or hosting an international student · a second Winterm
    course · global education events such as the World Affairs Council of Charlotte and World
    Quest · a sustained global team or club such as Model UN, the Southern Diversity
    Leadership Conference or UNC World View (IP, GSMC). **Do not render "at least two of"** —
    that quota is from the pre-2024 rules; whether it still applies is a Verdict question.
  - `stats`: one tile, `4` · Mastery Credit strands · "for the Class of 2024 onward". No
    graduate count (unpublished → Verdict).
  - `intro.strong` from IP ("designed to recognize students who demonstrate a global mindset
    and embody the qualities of a global citizen"; awarded at Senior Night). `intro.muted`:
    since the Class of 2024, students meet the Global Studies Mastery Credits.
  - No `quote`, no `award`.
  - **Name:** "Global Studies Certificate" everywhere (IP, the program's own page, wins over
    CAT/PROF25's "Global Education Certificate"; README conflict rule). Mention the catalog
    name nowhere on the page.
- **Trips ledger** (from the Source URLs trips detail table; newest first):
  - **`2025–26`**, note `'Winterm in January 2026; Middle School in summer 2026'`, with
    `noteByDiv: { US: 'Winterm, January 2026', MS: 'summer 2026' }`:
    - Dominican Republic · `place: 'Santo Domingo, with TECHO'` · US ·
      `group: '22 Upper School students'` · theme: Winterm service learning — building homes
      for two families · selected by interview; Spanish not required · `timing: 'Winterm 2026'`
    - Costa Rica · `place: 'San José, Arenal, Monteverde + Manuel Antonio'` · MS · theme:
      eight days of Spanish, geography and culture, incl. a Spanish-language scavenger hunt in
      Santa Elena · `timing: 'Summer 2026'` (only once its 2026 date is confirmed — step 2)
    - Germany · `place: 'Hamburg — the Hamburg Open'` · US · `group: 'Cannon Studios students'`
      · theme: an international event-technology convention · `timing: 'Winter 2026'`
      (confirm the story date — step 2; included by decision at `/global-exposure`, verified)
  - **`2024–25`**, note `'Winterm in January 2025; summer 2025'`:
    - Costa Rica · `place: 'with TECHO'` · US · theme: Winterm service learning, the first
      TECHO build · `timing: 'Winterm 2025'` (N-TECHO states it)
    - China · `place: 'Shanghai, Xi\'an, Chongqing, Zhangjiajie, Fenghuang + Changsha'` · US
      (only if step 2 supports it — see Open questions) · theme: history and culture, a visit
      to Fudan University and an AI and robotics company · `timing: 'Summer 2025'`
  - `alsoOnRecord`:
    - *Winterm in Costa Rica.* A Winterm Spanish immersion trip to Playa Sámara, Guanacaste,
      with volunteering at CREAR; the school does not give the year (WT).
    - *A Lower School family trip.* In 2019 the school planned its second Lower School family
      trip abroad, to Greece, for summer 2020, open to students 5 and up with a parent
      (WB-TA-2019). Word it as **planned**; never "went".
  - `headline`: count what renders (five trips across two school years if all survive) and
    say "Filter by division."
  - `intro.strong`: Upper School travel runs mainly through Winterm, a week after winter
    break, whose Trips and Certifications track is open to grades 9–11 (WT).
    `intro.muted`: Middle School students traveled abroad in summer 2026, and the school has
    run Upper School TECHO service builds two years running (N-CR, N-TECHO).
  - `photo`: see step 2.
- **Season wording for Winterm.** `timing` values are `'Winterm 2026'` / `'Winterm 2025'`
  (Winterm is the school's name for the January week — a season, not a date). Never a day.
- **Network card content** (title above):
  - intro.strong: the program's links run through Charlotte's World Affairs Council, UNC's
    World View and student competitions, and its mission is "thinking globally and acting
    locally" (IP). Do **not** write "belongs to no network" (latinglobal Implementation
    notes: an absence claim no page makes).
  - `conferences: []`, **no `ledgerTitle`**.
  - `cells`: **World Affairs Council of Charlotte & UNC World View** — the program's partner
    links, and qualifying events for the certificate (IP, GSMC) · **Model UN & World Quest**
    — Model UN is a Middle School academic team (MSL) and, with World Quest, counts toward the
    certificate (IP) · **Global Education Badge** — teachers earn it with at least 100 hours
    of global professional development and a capstone, such as a new Winterm course or a
    student travel program; sponsored by the North Carolina Global Education Benchmark Group;
    21 teachers 2017–2024, our count (IP).
  - `rows`: **Faculty who travel** — in 2026 the inaugural Helfrich Catalyst Fellowship sent a
    sixth-grade social studies teacher to Peru, and a Kimbrough award sent an Upper School
    English teacher to Finland, joined by a colleague with a World Affairs Council grant
    (N-FAC). Roles only, no names. Do **not** claim GEBG membership beyond the sponsorship
    sentence the page states.
- **`start`** content:
  - intro.strong: the mission line or "promote global competency… through travel, summer
    exchange, study, and service" (IP).
  - No `framework` (the Cultural Competencies Framework is an image with no text).
  - `divisions`: **Lower School · JrK–4** — Spanish from Junior Kindergarten (FAQ, K) · 1st
    grade's culture journey through five South American countries (G1) · a 3rd-grade
    imaginary trip to Costa Rica in Spanish class (G3). **Middle School · 5–8** — 5th graders
    try French, Mandarin Chinese and Spanish, then choose one (FAQ) · a Model UN team (MSL) ·
    `'**Travel abroad:** a summer trip to Costa Rica in 2026'` (N-CR). **Upper School · 9–12**
    — three years of world language, with Chinese, French and Spanish through Honors V and AP
    (CURR) · Honors World History (CURR) · Winterm, a week each January, with trips open to
    grades 9–11 (WT) · Honors Glocal Perspectives for seniors (CAT).
  - Optional `languages` block only if it adds something the divisions do not — **default:
    omit**.
- **Verdict.** `standsOut.summary`: Cannon's global program is small and centred on the Upper
  School, but it offers something most Charlotte schools do not — a Global Studies
  Certificate with published requirements — and global language learning from Junior
  Kindergarten. Points (~4): a certificate awarded at Senior Night, with a required senior
  capstone course · Spanish from JrK and a three-language choice in 5th grade · two years of
  TECHO service builds in Latin America · teachers trained through a 100-hour Global
  Education Badge. `ask` (~11): **Starting grade** (earliest grade for international travel;
  is the MS Costa Rica trip annual?) · **2026–27 trips** · **Cost** (no trip price is
  published) · **Aid** (aid covers "Required overnight class trips"; do aid or the John Riley
  Endowment for Science, Service, and Travel cover optional trips? — FA, ENDOW) · **Selection**
  (beyond the TECHO interview) · **Safety** (vendor, insurance, chaperone ratios) · **China
  sister school** (is an exchange still active?) · **Certificate rules** (do the "at least two
  experiences" rules still apply alongside the Mastery Credits?) · **Certificate earners**
  (how many seniors each year?) · **Scale** (how many students travel each year?) ·
  **International students** (does Cannon still enroll about ten a year with host families?
  — ISP, a 2021 page).
- **Privacy.** No price, deposit or exact date; season + year only. No student, parent,
  teacher, chaperone or trip leader named — render roles. No quote renders (the only
  candidates name their speaker).
- **No Compare change**; the area stays in `COMPARE_DEFERRED_TOPICS`.
- **No third-party fact renders.** Wikipedia, 3ds.com, TECHO USA, FindingSchool, Niche and
  NAIS stay out.

## Approvals needed

**None outstanding.** Adding a school to an existing area with existing cards needs no UX
approval; both title overrides were approved by the user on 2026-10-15 (Decisions). The user
reviews wording at the Phase 1 stop.

`npm run deploy` is **not** part of this plan. Merging is not publishing.

## Source material

Written during `/global-exposure` (2026-10-15), **uncommitted**, ingested by `/implement` in
step 1:

- `source-material/international-travel/cannon/Cannon School - International Travel - Deep Research.md`
- `source-material/international-travel/cannon/Cannon School - International Travel - Source URLs.md`

The PDF itself is not on disk; the transcription is the committed record.

## Out of scope

- Exchanges, Signing Up, Community and Milestones cards for Cannon.
- Renderer, type or registry changes; chrome keys beyond `credential@cannon` and
  `network@cannon`.
- Any change to the other three schools' data.
- Compare rows, `VALUE_METRICS`, home-grid cells.
- The robotics World Championship, the Australia conservation-congress student, the domestic
  MS overnight trips and the 2026 TECHO fundraising goal.
- A podcast episode. `npm run deploy` and the news Worker.

## Steps

### Phase 1 — English

1. **Branch, commit and ingest the source files.**
   - `git checkout main && git pull && git checkout -b feat/cannonglobal`.
   - `git add` the two source-material files **by explicit path**, plus this plan and
     `INDEX.md`, and commit.
   - Run the `ingest-source-material` skill for `international-travel`:
     `python .claude/skills/ingest-source-material/build_docs.py international-travel`, then
     `python scripts/build_site_content.py`, then `node scripts/check_metrics.mjs`.
   - `git status --short`; commit **only this topic's paths** (memory
     `ingest-full-rebuild-sweeps-topics`).

2. **Close the verification gaps; update the Source URLs file.**
   - Re-fetch IP, WT, N-TECHO and N-CR (`curl -sL`, browser UA) and confirm nothing moved
     since 2026-10-15. The live page wins.
   - Work the "Not verified at planning" table. In **real Chrome via Playwright** (memory
     `headed-chrome-via-playwright`; avoid `networkidle`), read the publication dates of
     N-CHINA, N-CR, N-FAC and N-STUDIOS, and N-CHINA's byline. Then:
     - N-CR dated 2026 → keep `Summer 2026`; otherwise move it to the right year.
     - N-STUDIOS dated 2026 → "last January" = January 2026, keep it in `2025–26`; otherwise
       re-place or drop it.
     - N-CHINA dated 2025 → `Summer 2025`. Division: US if the byline or page ties it to the
       Upper School (e.g. an Upper School Chinese teacher); **else** move the trip to
       `alsoOnRecord` as *China, summer 2025* (see Open questions).
     - Re-check K for the CLT/FLES wording; it is not rendered either way.
   - **Photos.** Candidates are in the Source URLs file. Download, **open each image**, and
     keep at most one for `trips`: prefer `costarica.jpg` (N-CR), else `techno_sizes.jpg`
     (N-TECHO), else `CostaRica20255.jpg` (IP). → `public/travel/cannon-<subject>.jpg`,
     resized to the scale of the existing `public/travel/` images. Drop any image with a
     legible name, sign or caption. **Never `sherrill.jpg`.** `alt`/caption name nobody;
     `credit: 'Photo: Cannon School'`.
   - Record every result under an **"Implement-time verification"** heading. Drop any fact
     still PDF-only.

3. **Cannon data — new `src/data/internationalTravel/cannon.ts`**, exporting
   `cannon: InternationalTravelProgram`. Model it on `charlotte-country-day.ts`: header comment
   (provenance, verification date, rules followed, and that Cannon publishes no exchange
   partner, sign-up dates, community figures or milestones, so those cards are omitted). URL
   constants named after the Source URLs keys (`CS = 'https://www.cannonschool.org'`, then
   `IP`, `GSMC`, `WT`, `CAT`, `CURR`, `FAQ`, `K`, `G1`, `G3`, `MSL`, `ISP`, `FA`, `ENDOW`,
   `N_TECHO`, `N_CHINA`, `N_CR`, `N_FAC`, `N_STUDIOS`, `WB_TA_2019`). Source labels
   `'cannonschool.org — <page>'`; the catalog as `'cannonschool.org — Course Catalog 2026–27
   (PDF)'`; Wayback as `'<page> (Wayback, Dec 2019)'`. **Every fact traces to a fetched or
   Wayback row.** Content per Decisions:
   - **`lead`** — strong: Cannon's global program centres on the Upper School, with a Global
     Studies Certificate awarded at Senior Night and Winterm trips abroad for grades 9–11, on
     a base of world-language study that begins in Junior Kindergarten. muted: recent travel
     includes TECHO service builds in Costa Rica and the Dominican Republic, a summer in China,
     and a first Middle School trip to Costa Rica in 2026 — **drop "first"** unless a page says
     so; default wording "a Middle School trip to Costa Rica in summer 2026".
   - **`stats`** — the three tiles in Decisions.
   - **`trips`**, **`start`**, **`credential`**, **`network`**, **`verdict`** — as in
     Decisions. Every card gets `sources` listing only the pages behind its facts.
   - Omit `exchanges`, `signup`, `community`, `milestones`.

4. **Register — `src/data/internationalTravel.ts`.**
   - Import `cannon` from `./internationalTravel/cannon.ts`; add `cannon: cannon` (or
     shorthand) to `PROGRAMS`.
   - Add `cannon: { credential: 'The Global Studies Certificate', network: 'The World Affairs
     Council, Model UN & the Global Education Badge' }` to `TITLE_OVERRIDES`.
   - Update the "Per-school entries" comment (three → four schools). No type or registry change.
   - **Chrome, `src/locales/en.json`:** add
     `"international-travel.credential@cannon": "The Global Studies Certificate"` and
     `"international-travel.network@cannon": "The World Affairs Council, Model UN & the Global Education Badge"`
     beside the other `@slug` keys. Do not touch the other nine catalogs in Phase 1.

5. **README — `src/data/internationalTravel/README.md`.** Three schools → four, adding Cannon
   (`.claude/plans/cannonglobal.md`, 2026-10-15). Add Cannon's two titles to the
   `TITLE_OVERRIDES` examples, and note that Cannon is the first **compact** section — five
   cards, with a network card that has no conference ledger.

6. **i18n classification.** `node scripts/i18n_extract.mjs --report --residual` — no new field
   paths expected. If anything appears under international-travel, classify it in
   `scripts/i18n_fields.mjs` until it reaches 0.

7. **Regenerate and check.**
   - `npm run schema && npm run check:schema` — Global Exposure 4/12 (or the current roster).
   - `npx tsc -b` (**not** `--noEmit`).
   - `npm run build` — every chained gate passes, including `check:seo` (Cannon's meta
     description gains Global Exposure and must stay ≤160 chars; if it overflows, fix in
     `src/lib/head.ts` and record it), `check:photos` and `check:live`.
   - The greps and browser checks under Verification → Phase 1.

8. **Commit Phase 1** on `feat/cannonglobal`. Stage explicit paths only (`git status --short`
   first): the data file, `internationalTravel.ts`, `src/locales/en.json`, the README, any
   photo, the ingest outputs, `DATA-SCHEMA.md`, the Source URLs file, this plan and `INDEX.md`.
   Push; verify `git rev-parse HEAD` against `git ls-remote origin feat/cannonglobal`. Set this
   plan to `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review. No PR is opened in
Phase 1.** Tell the user to run `npm run dev` and open `/school/cannon/` (every card open,
desktop and 390px). Ask specifically about: whether a five-card section reads well beside the
other three schools (the Charlotte Prep lesson — memory `charlotteprep-abandoned` — is that a
section can pass every check and still read thin); the lead and the three tiles; the
certificate's current-rules framing; the Network title; and the Hamburg Open trip's place in
the ledger. If the user rejects the section as too thin, mark this plan `abandoned` with the
reason and delete the branch — do not merge.

### Phase 2 — Every other locale

Two layers. Re-read both lists first; they can grow.

0. **UI chrome → the nine non-`en` catalogs in `TRANSLATED`** (`src/lib/i18n.ts`, currently
   `es bn ht te fr fa it hi ar`). Add and translate `cards.international-travel.credential@cannon`
   and `…network@cannon` by text insertion after the existing `@slug` keys. "Model UN" and
   "Global Education Badge" may stay Latin-script per each locale's existing Global Exposure
   choices; follow the catalog's rendering of `network@charlotte-country-day`. Never
   normalize key order in `ar.json`.

Then research prose, per `PROSE_TRANSLATED` (mechanism:
`.claude/docs/prose-translation-architecture.md`; method: latinglobal Phase 2):

1. **Splice, never re-extract:**
   `node scripts/i18n_splice_work.mjs --lang <code> --topic international-travel` per locale.
   Dropped-stamp count for the other three schools must be **0**.
2. **Translate** Cannon's new strings per locale, keyed by stamp, never by index. Parallel
   agents get **one scratch directory each** and write only stamp → translation maps, applied
   centrally (memory `parallel-locale-agents-collide`; latinglobal). Use each locale's existing
   Global Exposure renderings as the glossary. Standing rules: figures char-for-char (`22`,
   `3`, `21`, `4`, `100`, `2025–26`, `2017–2024`); names stay Latin script (Cannon, Winterm,
   TECHO, Honors Glocal Perspectives, Global Studies Mastery Credits, World Affairs Council of
   Charlotte, UNC World View, World Quest, Model UN, Hamburg Open, Fudan University, CREAR,
   ACTFL, Upper School, AP); `fa`/`ar` store no bidi isolates; `hi`/`te` never pre-group; run
   `check:fr` for `fr`.
3. **Build:** `node scripts/i18n_build_overlay.mjs --topic international-travel --lang <code>`.
4. **`src/data/overlays/NOTES.md`:** a Cannon subsection under Global Exposure with any soft
   spots, or "none".
5. **STOP for the user's test — no PR yet.** Commit, push, report the check results, and tell
   the user: `npm run build && npx vite preview`, then `/school/cannon/?lang=es`, plus `fa` and
   `ar`. End the turn.
6. **Ship, only after the user confirms.** PR via `--body-file`; flip this plan to
   `implemented` with Implementation notes and the INDEX row to `Implemented` with the PR link;
   `gh pr merge --squash --delete-branch`; `git checkout main && git pull`. **Do not deploy** —
   end with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/international-travel/cannon/*.md` (2) | new (written at planning); Source URLs gains implement-time rows |
| `src/data/schools.json`, `src/content/international-travel/cannon.json`, `.claude/docs/international-travel/cannon.md` | generated by ingest |
| `src/data/internationalTravel/cannon.ts` | new: Cannon's data |
| `src/data/internationalTravel.ts` | edit: import + `PROGRAMS` + `TITLE_OVERRIDES.cannon` + comment |
| `src/locales/en.json` | edit: `credential@cannon`, `network@cannon` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit: both keys translated (Phase 2) |
| `src/data/internationalTravel/README.md` | edit: four schools; Cannon's titles; compact-section note |
| `public/travel/cannon-*.jpg` (≤1) | new, if kept |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `scripts/i18n_fields.mjs` | only if the residual report finds a new path |
| `src/data/overlays/international-travel.{9}.json` + work files | spliced + translated (Phase 2) |
| `src/data/overlays/NOTES.md` | edit (Phase 2) |
| `.claude/plans/INDEX.md`, `.claude/plans/cannonglobal.md` | status + implementation notes |

## Verification

### Phase 1 — English

- [ ] `node scripts/check_metrics.mjs` — no new unmatched subtopic
- [ ] `npx tsc -b` — clean
- [ ] `node scripts/i18n_extract.mjs --report --residual` — 0 unclassified international-travel fields
- [ ] `npm run schema && npm run check:schema` — Cannon listed with Global Exposure data
- [ ] `npm run build` — every chained gate passes (`check:seo`, `check:photos`, `check:live`)
- [ ] `grep -n '\$[0-9]' src/data/internationalTravel/cannon.ts` — **no hits**
- [ ] `grep -nE '(January|February|March|April|May|June|July|August|September|October|November|December) [0-9]' src/data/internationalTravel/cannon.ts` — **no hits** (no signup card)
- [ ] `grep -in "not stated\|not published" src/data/internationalTravel/cannon.ts` — hits only inside `verdict`
- [ ] `grep -n "Global Education Certificate\|at least two" src/data/internationalTravel/cannon.ts` — **no hits**
- [ ] No person is named: grep the file for `Arriaga`, `Taylor`, `Garcia`, `Less`, `Oswald`,
      `Mattsson`, `Grady`, `Guiselle`, `Wang`, `Sherrill`, `Fernandez`, `Storr`, `Diskin`,
      `Riley ` (the endowment name "John Riley Endowment" is allowed only inside `verdict`) — no other hits
- [ ] Every `sources` URL is a fetched or Wayback row of the Source URLs file; spot-check five
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright,
      every `<details>` open):
  - `/school/cannon/`: Global Exposure chip and rail item after Course Offerings; lead + 3
    tiles (22 / 3 / 21) + **5 cards** in order: Where They Go · Global Learning at Each School
    Level · The Global Studies Certificate · The World Affairs Council, Model UN & the Global
    Education Badge · Verdict & Ask the School.
  - The Network card has **no empty ledger heading** and no blank gap where the ledger would be.
  - The Credential card shows one tile (`4`), the required list and the beyond list.
  - Where They Go: All / Middle School / Upper School filters; MS shows only Costa Rica 2026.
  - Photo (if any) opens in the viewer and names nobody; no empty `<figure>`.
  - `/school/providence-day/` (9 cards), `/school/charlotte-country-day/` (8) and
    `/school/charlotte-latin/` (8) unchanged.
- [ ] `npm run audit:mobile` — passes at 320/360/390px
- [ ] Dark mode legible

### Phase 2 — Locales

- [ ] Splice: 0 dropped stamps per locale
- [ ] `npm run check:chrome` — both `@cannon` keys present and translated in all ten catalogs
- [ ] `npm run check:runtime && npm run check:live` — all stamps resolve; gate 3 passes
- [ ] `python3 scripts/check_figures.py --topic international-travel --lang <code>` and
      `npm run check:sepdrift -- --lang <code>` for each of the 9 locales
- [ ] `npm run check:dates`, `check:fr`, `check:bidi`, `check:fa`, `check:hi`, `check:script`
- [ ] `node scripts/check_work_integrity.mjs` — its length assertion fails by design on a
      new-school splice; run its assertions by stamp against `main` (latinglobal): 0 lost,
      0 mutated, 0 overwritten, 0 empty new entries, 0 foreign-script, 0 bidi controls
- [ ] `npm run i18n:leaks -- --lang <code>`
- [ ] `npm run audit:daterender` and `npm run audit:moneyrender` — nothing new in the section
- [ ] `npm run audit:mobile` at 320px in translated locales
- [ ] Browser check in `es`, `fa` (RTL: `2025–26`, `2017–2024` read correctly) and `hi`, every
      card open, with both card titles translated

## Risks

| Risk | Mitigation |
|---|---|
| The section reads thin next to the other three (the Charlotte Prep failure) | The Phase 1 stop asks about it directly; abandoning is an accepted outcome |
| A story date shows the China, Costa Rica or Hamburg trip in a different year | Step 2 reads every date in a browser before the ledger is written |
| A name leaks from the stories (chaperones, students, the TECHO liaison) | Roles only; the surname grep |
| The pre-2024 "at least two" rule is shown as current | Decisions render the Mastery Credits as current; grep for "at least two" |
| The International Student Program figure (a 2021 page) is presented as current | It is not rendered; it is a Verdict question |
| Cannon's meta description passes 160 chars | `check:seo` fails loudly; fix in `src/lib/head.ts` |
| An override key is missing from a catalog | Phase 2 step 0 + `check:chrome` across all ten catalogs |

## Open questions

- **Is the China 2025 trip an Upper School trip?** Mandarin is taught in both MS and US.
  **Default:** US if step 2's browser check ties it to the Upper School (byline or wording);
  otherwise move it to `alsoOnRecord` rather than guess a division.
- **Does the Hamburg Open belong in a Global Exposure ledger?** It is an event-technology trip.
  **Default:** include (decided at `/global-exposure`); the user can drop it at the Phase 1
  review.
- **Should the 2020 Lower School Greece trip render at all, given it probably never ran?**
  **Default:** keep it in `alsoOnRecord`, worded as planned; drop it if the user objects at
  review.

## Implementation notes

**Phase 1 (English), 2026-10-15.**

- **Step 2 resolved every open date.** Each story's `article:published` meta tag (in the raw
  HTML; the browser text shows no date) gives N-CHINA 2025-07-03, N-CR 2026-07-21, N-FAC
  2026-06-04, N-STUDIOS 2026-08-25, N-TECHO 2026-01-30, so the ledger stands as planned.
  N-CHINA's byline is an Upper School Chinese teacher → the China trip renders as **US**
  (the open question's default). The badge list re-counts to 21. K has no CLT/FLES wording
  (it is on G1/G3); it was never rendered.
- **Photo:** `costarica.jpg` (N-CR) → `public/travel/cannon-costa-rica-2026.jpg`, 800×600;
  no legible name, sign or caption.
- **Year notes say "Winterm", not "January".** The plan's `note`/`noteByDiv` wording
  ("Winterm in January 2026", "Winterm, January 2026") fails its own month-plus-digit grep,
  so the 2025–26 note is "Upper School in Winterm and winter 2026; Middle School in summer
  2026" (`US: 'Winterm and winter 2026'`, `MS: 'summer 2026'`) and the 2024–25 note is
  "Winterm 2025 and summer 2025". The trips intro still says Winterm is "a week each
  January", which is no date.
- **The "at least two" Verdict question is reworded** to "asked for two global experiences
  beyond the classroom", because the plan's grep forbids the phrase anywhere in the file.
- **The 2025 TECHO trip reads "the school's first trip with TECHO"**, not "the first TECHO
  build": N-TECHO calls it only "a similar Winterm trip".
- **Catalog label is "Course Catalog 2025–26 (PDF)".** The plan said 2026–27, but the CAT
  URL in the Source URLs file is `CannonAcademicCourseCatalog2025-26DIGITAL1.pdf`.
- **A stale comment in `src/pages/SchoolDetail.tsx`** listing the researched schools now
  names Cannon too (one comment, no code change).
