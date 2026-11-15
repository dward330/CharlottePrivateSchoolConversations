---
name: trinitysite
title: Re-source every Trinity Episcopal fact to its redesigned website, and let the live site override the app
status: english-done
phases: 2
created: 2026-11-14
branch: fix/trinitysite
prs: []
---

# Re-source Trinity Episcopal to its redesigned website

## Goal

Trinity Episcopal School (`trinity-episcopal`, K–8, tescharlotte.org) moved its whole website
to a new Finalsite platform in fall 2026. **Every Trinity URL the app cites now 404s except the
homepage**, and many pages say different things than they did. This plan re-points every
citation to where the content now lives, and **makes the app say what the live site says**
across all nine of Trinity's research areas: correct what changed, remove what the site no
longer states, and add live information that fits an existing card. Done means: no
tescharlotte.org link on Trinity's page 404s, no fact on the page contradicts the live site,
and every changed sentence is translated in the nine prose locales.

It also unblocks a planned K–8 High School Placement podcast episode (Charlotte Prep +
Trinity, Trinity using only what the app shows), which must wait for this to ship.

## Context

### What was measured on 2026-11-14

- **45 distinct tescharlotte.org URLs** are cited across `src/` and `source-material/` (213
  citations; list with file:line in `reports/trinity-site-2026-11-14/cited_locations.txt`).
  Every one returned 404 except the homepage (`cited_status.txt`; the 429s are rate-limit
  responses — the site throttles, so pace any live request 5s+).
- **The new site has 43 site-map pages + 4 unlisted giving pages, 14 news posts (Jan–Oct
  2026 only — nothing older was migrated) and 9 linked documents.** All of it is crawled to
  `reports/trinity-site-2026-11-14/` (gitignored, local; read its `README.md`). The academics
  and K-8 pages hold their text in click-to-open popup tiles; the crawl captured every one
  (`=== POPUP n: <title> ===`). Some pages also have collapsed accordions the crawl missed;
  the research agents fetched those raw (`applying-to-trinity`, `service-learning`,
  `wildcat-summer-camp`) — the text is in the source-material recheck subsections.
- **The school profile moved:** `https://resources.finalsite.net/images/v1790266877/tescharlotteorg/jraele9yxiqjc8nohifm/26-27SchoolProfile.pdf`
  (linked as "School Profile" from `/about-us/trinity-at-a-glance`). Same edition, text
  identical to our transcription. It is cited 15+ times.
- **The CAIS testing brochure has a new edition:** 2027-28, `https://resources.finalsite.net/images/v1790272603/tescharlotteorg/iwsznwbihbhflkundb91/CAIS2027-2028Upload1.pdf`
  (fee $275 → $300, 72-hour cancellation rule, $100 non-refundable cancellation fee).
- Trinity has **no Latest News feed** and **no Learning Support area** in the app, so
  neither is affected. Branding (colors, crest) is unchanged.
- **Every other link Trinity's data stores was checked the same day and is still live —
  no change needed:**
  - **Vimeo:** the welcome video `player.vimeo.com/video/1179403154` (`src/data/brands.ts`)
    and the 8 performance videos plus the channel feed in `artsPrograms/trinity-episcopal.ts`
    all return 200 on oEmbed. The channel has no performance video newer than "Shakespeare
    2025".
  - **Google Docs:** the Cost of Attendance doc (After School) and the five summer docs (the
    program info, the "Welcome to Wildcat Summer 2026" letter, the FAQ, camp descriptions
    and the camp grid CSV) all still return 200. None is linked from the new site anymore.
  - **Architect's page:** `fmkarchitects.com/work/community/trinity-episcopal-school`
    (Sports facilities) returns 200.
  - **Form 990:** ProPublica (Financial Aid) is unaffected by the redesign and already
    current through FY2025, the newest filing.
  - **Logo and destination links:** the logo is a local file (`public/logos/`), and the
    destination high-school links come from `src/data/highSchools.ts`, not Trinity's
    site.

### The evidence worklists (read these — they ARE the step detail)

Three research passes compared every fact the app shows against the crawl. Their reports:

| Worklist | Areas |
|---|---|
| [`trinitysite-data/admissions-aid-placement-branding.md`](trinitysite-data/admissions-aid-placement-branding.md) | admissions, financial-aid-tuition, high-school-placement, branding |
| [`trinitysite-data/courses-arts-clubs.md`](trinitysite-data/courses-arts-clubs.md) | course-offerings, the-arts, student-clubs (`clubsPrograms`, `clubCatalog`, `clubClusters`) |
| [`trinitysite-data/sports-afterschool-summer.md`](trinitysite-data/sports-afterschool-summer.md) | sports, after-school, summer-programs |

Each has: **A** an old→new URL map with every citing file:line; **B** a differences table
(app location, app value, live value verbatim, source, whether it is translated prose);
**C** facts whose only source is gone; **D** new live information that fits existing cards.
The verbatim live text behind every row is in a `### Live-site recheck, 2026-11-14`
subsection at the end of `## Provenance` in each Trinity source-material file (22 files,
written during planning, uncommitted — see Source material).

**Two of the worklists were written before the user's decisions below** (the
admissions/aid/placement and sports/after-school/summer ones). Where a worklist calls a gone
past event "historical — keep" or offers a Wayback URL as the citation, **the Decisions
section overrides it.** The courses/arts/clubs worklist already applies the decisions.

### The code each area lives in

| Area (i18n topic) | Structured file(s) | Generated prose (regenerates at ingest, not rendered for Trinity unless noted) |
|---|---|---|
| admissions (`admissions`) | `src/data/admissionsPrograms/trinity-episcopal.ts` | `src/content/admissions/trinity-episcopal.json` |
| financial aid (`financial-aid-report`) | `src/data/financialAidReports.ts` (Trinity entry, ~L2840–3000) | `src/content/financial-aid-tuition/trinity-episcopal.json` (content overlay has **0** Trinity blocks) |
| high school placement (`high-school-placement`) | `src/data/highSchoolPlacementPrograms/trinity-episcopal.ts` | `src/content/high-school-placement/trinity-episcopal.json` |
| course offerings (`course-offerings`) | `src/data/courseOfferings.ts` (Trinity block, ~L8510–8830) | `src/content/course-offerings/trinity-episcopal.json` |
| the arts (`the-arts`) | `src/data/artsPrograms/trinity-episcopal.ts` | `src/content/the-arts/trinity-episcopal.json` |
| student clubs (`student-clubs` + EXTRA_LAYERS) | `src/data/clubsPrograms/trinity-episcopal.ts`, `src/data/clubCatalog.ts`, `src/data/clubClusters.ts` (Trinity entries) | `src/content/student-clubs/trinity-episcopal.json` |
| sports (`sports`) | `src/data/sportsPrograms/trinity-episcopal.ts` | `src/content/sports/trinity-episcopal.json` |
| after school (`after-school`) | `src/data/afterSchoolPrograms/trinity-episcopal.ts` | `src/content/after-school/trinity-episcopal.json` |
| summer (`summer-programs`) | `src/data/summer/trinity-episcopal.ts` | `src/content/summer-programs/trinity-episcopal.json` |
| branding | `src/data/brands.ts` (homepage still 200 — no change) | — |

Topic → module mapping is `TOPICS` / `ACCESSORS` / `EXTRA_LAYERS` in `scripts/i18n_topics.mjs`
(never re-declare it). `PROSE_TRANSLATED` (`src/lib/i18n.ts:183`) is
`es, bn, ht, te, fr, fa, it, hi, ar`.

**What needs translating and what doesn't.** URL constants, `sourceUrl`, `source` and
`sources[].label` fields are **not** extracted (worklist column "Prose? no"), so a pure link
fix costs no translation. Every rendered prose field that changes is a new stamp in its
topic's work files and must be re-translated in all nine locales, or it silently falls back
to English (`check:live` catches it). Student Clubs GAP/COUNT flags never render
(`src/lib/flagVisibility.ts`).

### Nearest precedent

`.claude/plans/hickorygroverefresh.md` (one school's live-site refresh, two phases). Copy its
Phase 2 shape — measure scope from a fresh extract, splice by stamp, never by index — and
read its *Implementation notes* and `covenantadmissions`' for the traps (notably:
`check_work_integrity --base` reports every intended change as a violation; diff the work
files against `main` instead).

## Decisions

All set by the user on 2026-11-14 unless marked as a planning call.

- **The live site overrides the app wherever they differ.** — user's instruction for the
  whole pass.
- **Past events whose page is gone come OUT, even though they are true ("live site only").**
  This removes, among others: the Mock Trial state titles 2023–25 and the "both won state
  championships" line; the 2025 CATO teaching award; the Ghana / Children Inspiring Hope art
  exchange; the Fall 2023 and Winter 2024 sports titles and the "published exactly two
  seasons" footnote; the May 2024 DC trip (46 eighth-graders); the 954-lb food drive; the
  counselor-structure "added in 2023-24" line and the 2023 counselor quotes in High School
  Placement; and in Financial Aid the multi-year history drawn from gone pages (the 26% /
  29% aid series, the 25-26 profile's 28.9%, the 2023-24→2025-26 tuition history) unless the
  same figure is on a live page. **Wayback copies are kept in source-material as the record,
  never cited on the page.** — user.
- **Current-state facts the live site no longer states are removed or replaced with the
  live wording** (TED income bands → flat $380 / $355 sibling; the 8:00–5:30 hours; karate
  and cheer club; affinity-group purpose statements; Koinonia detail; Pride/Sankofa chapels;
  the Spanish-language contact; "Wildcat Visit Day"; the passed Sept 29 / Nov 5 open houses;
  $11.50 per lunch and "FLIK is not reduced…", which survive only in the unlinked Cost of
  Attendance doc). — follows from the first decision.
- **Exception — Summer Programs keeps the 2026 catalog, clearly labeled as the 2026
  season.** The camp page now only says "Check back in January 2027 for Camp
  Registration!"; the 2026 grid (75 camps, $225–$785) and the fees doc still open but are
  no longer linked. Keep the camps, prices and fees, label every headline/subhead as the
  2026 season, cite the school's own docs, and add the live "registration for 2027 opens
  in January" line and the firmer nut rule. The same 2026 label applies to the summer line
  in After School (`coverage.summer`) and Financial Aid (`fa-beyond.components` summer
  camp). Refresh when the 2027 catalog posts. — user.
- **New live information that fits an existing card is added** (worklist section D): e.g.
  the Fall 2026 QCAA championships, the 7th–8th electives, named music/theatre staff, the
  $100 application fee, CAIS 2027-28 dates, the Opportunity Scholarship requirement, the
  Mayor Vi Lyles Endowed Scholarship. **No new card, section, sub-section, stat tile,
  Compare row or metric key.** — user ("Add it").
- **Any "the school does not publish X" claim the live site now answers is rewritten**
  (arts: auditorium and music staff; admissions: application fee; aid: merit/endowed
  scholarship, Opportunity Scholarship interaction; clubs: Chapel Music; HSP checklist: who
  holds each counselor role). Leaving them would print a false statement. — planning call.
- **Proper names are spelled correctly, not copied from a typo:** the poet is **Jaki Shelton
  Green** (the school's post writes "Greene"). Where the school's own text has a known slip
  (e.g. the CAIS brochure calls two Fridays "Thursday"), state the date, not the weekday. —
  planning call.
- **Staff are named by their live title.** Director of Auxiliary Services is **Jocelyn
  Anderson** (leadership block + directory; one contact line still says Purdie — the
  directory wins). Counselors: Lilla Clark ("Middle School ELA Teacher, High School
  Counselor") and Rudy Wise ("Director of Admission, Boarding School Counselor"). —
  planning call.
- **Class of 2026 lifers:** the post body says 30, the news-board teaser 31. The app shows
  neither (it is source-material only); record both there, no app change. — planning call.
- **Student names:** remove the named Class of 2026 student and the named Class of 2025
  commencement speaker from `High School Placement - Placement Outcomes.md`'s findings
  (standing no-minor-names rule). — planning call.
- **The `src/content/**` JSONs are not hand-edited**; they regenerate from source-material
  at the ingest step. — repo convention.
- **Camp Independence days:** the school's own CSV shows both sections running overnight
  Wed–Thu plus Fri morning, so the app's "Runs Monday and Tuesday only" / `Mon–Tue` is
  wrong. Fix it while the summer file is open. — planning call (not caused by the redesign,
  but it is the school's own data).

## Approvals needed

**None.** No new card, section, sub-section, tile, Compare row or metric key — every
addition goes into a card Trinity already shows (UX-design standard "Allowed: adding,
correcting, and extending the data behind cards and sections the app already has"). If
implementation finds a section D item that only fits by creating a new sub-block, **skip it
and list it in Implementation notes** rather than adding UI.

No deploy: merging is pre-authorized; publishing is the user's call.

## Source material

Written during planning, **uncommitted**, to be committed and ingested in Phase 1 step 2.
Each got a `### Live-site recheck, 2026-11-14` subsection at the end of its `## Provenance`
section (Tuition and Fees had none, so a `## Provenance` section was added). No new files,
no new `## ` headings, no student names in the new text.

- `source-material/admissions/trinity-episcopal/` — `… Admissions - Application Process and Testing.md`, `… Admissions - CAIS Consortium.md`
- `source-material/after-school/trinity-episcopal/… After School - Trinity Extended Day.md`
- `source-material/branding/trinity-episcopal/… Branding - Crest and Brand Color.md`
- `source-material/course-offerings/trinity-episcopal/` — `… Lower School and Technology.md`, `… Middle School Curriculum.md`
- `source-material/financial-aid-tuition/trinity-episcopal/` — `… Financial Support.md`, `… School Profile 2026-27.md`, `… Tuition and Fees.md`
- `source-material/high-school-placement/trinity-episcopal/` — `… Placement Outcomes.md`, `… The Placement Program.md`, `… Where They Land.md`
- `source-material/sports/trinity-episcopal/` — `… Selected Results and Coaching.md`, `… Sports Offered and Participation.md`
- `source-material/student-clubs/trinity-episcopal/` — `… Academic and Competitive Clubs.md`, `… Affinity and Identity Groups.md`, `… Club Catalog and Traditions.md`, `… Service and Civic Engagement.md`
- `source-material/summer-programs/trinity-episcopal/` — `… Summer Costs and Policies.md`, `… Wildcat Summer Camp Catalog.md`
- `source-material/the-arts/trinity-episcopal/` — `… Program Overview and Ensembles.md`, `… Recognition and Exhibitions.md`

(Full names all start `Trinity Episcopal School - <Topic> - `.) Not touched: `Form 990.md`
(no tescharlotte sources) and `branding/_shared/…Campus City and Address.md` (shared; the
homepage is unchanged).

The original documents (profile, CAIS 2027-28, academic calendar, Clarity 2027-28 guide,
Impact Report, Tuition Refund Plan, three articles) are in
`reports/trinity-site-2026-11-14/docs/` with `pdftotext` output. Copy the PDFs the app cites
(profile, CAIS) into the matching `source-material/<topic>/trinity-episcopal/` folders for
local reading (PDFs are gitignored there) — but check first that the ingest does not turn a
new PDF into a new subtopic; if it would, leave them in `reports/` only.

## Out of scope

- Trinity's Latest News section (it has none) and Learning Support (no such area).
- Any new card, section, tile or Compare row (Trinity is K–8 and off Compare anyway).
- Changing how any component renders; translating `src/content/**` blocks.
- The CCD Learning Support mention of "tescharlotte.org (CAIS brochure copy)" in
  `src/content/learning-support/charlotte-country-day.json` — it is a bare domain in a
  "third-party pages the dossier saw but did not use" list, not a link; leave it.
- The High School Placement podcast episode (built after this ships, separately).
- Deploying.

## Steps

Two phases: Phase 1 builds everything in English and stops for the user's review; Phase 2
translates the changed prose into the nine prose locales.

### Phase 1 — English

1. **Branch.** `git checkout main && git pull`, then `git checkout -b fix/trinitysite`.
   `git status --short` must show only the 22 source-material files above (plus this plan
   and its `trinitysite-data/` folder if not yet committed). Never `git add -A`.

2. **Commit the evidence, then ingest.** Stage the 22 source-material files, this plan,
   `.claude/plans/trinitysite-data/*.md` and the INDEX row by explicit path; commit. Then,
   in each finding section of those files (above `## Provenance`), apply the decisions so
   the record matches what the app will say: mark superseded statements with a one-line
   italic "*Superseded 2026-11-14 — see Live-site recheck*" note rather than deleting
   research, and delete the two student names from `Placement Outcomes.md`. Keep every
   finding parent-readable and every internal note under `## Provenance`/`## Method`
   (memory: research-prose-renders-to-parents). Run the `ingest-source-material` skill.
   If `src/data/schools.json` comes back reordered, restore HEAD order (memory:
   two-topic-ingest-reorders-manifest). Run `npm run check:metrics`: no new ⚠️ unmatched
   subtopic — the recheck lives under `###`, so none is expected; if one appears, map it in
   `src/lib/metrics.ts` `RULES` onto the topic's existing research key and `npm run schema`.

3. **Admissions** — `src/data/admissionsPrograms/trinity-episcopal.ts`. Work through
   worklist `admissions-aid-placement-branding.md` §A (URLs) and §B "Admissions" row by row:
   the CAIS constant → the 2027-28 PDF; $275 → $300 in every prose and figure field listed;
   the 72-hour / $100 cancellation rule replacing the 48-hour one; drop "percentile ranges";
   the $100 application fee replacing every "fee not published"; the Feb 1, 2027 aid
   deadline (drop the 2026-typo warning); Dec 1, 2026 open house as **Tuesday**, 9:30–11:00
   a.m., and drop the passed Sept 29 / Nov 5 dates; "Wildcat Visit Day" → the live
   description (day on campus for rising 1st–8th, morning observation for rising K,
   from November); drop "still accepting 2026-2027 applications"; drop the Spanish-language
   contact; fix the doubled phone and point booking to the events page; update the
   disclaimer (CAIS dates now match Trinity's; drop "retrieved in September 2026" in
   favor of the new check date). Add §D items that fit existing steps/rows (Clarity "about
   20 minutes", "contact the Admission Office before submitting" for aid applicants, the
   CAIS 2027 K and Grades 1–4 notification/contract dates — state the dates, not the
   brochure's wrong weekdays — and the admission team's live titles).

4. **Financial Aid & Tuition** — Trinity entry in `src/data/financialAidReports.ts`. Worklist
   §B "Financial Aid": Kindergarten band 210 → **215** (figure) and the "$210" prose →
   $215; `figureNote2` (the tuition page now prints the per-grade table, TED rates and FLIK
   plans — drop "lives in a Google Doc"); TED component → flat "$380 ($355 each additional
   sibling)" plus the live half-day / full-day rates; remove the $11.50 per-meal and "FLIK
   is not reduced" text (unlinked doc only), keep the confirmed annual $1,375 / $1,520 and
   20-meal $195 / $210; summer camp line labeled as the 2026 season (summer decision);
   application fee $100; `componentsNote` (Books dashes) rewritten or dropped; timeline
   "2026-27 Clarity" → "2027-28 Clarity Family Application Guide" and Jan 2, 2027 as the
   **Kindergarten application deadline**, not an opening; `fa-merit` rewritten — the
   Opportunity Scholarship is **required** for aid applicants, accepted since 2014,
   2027-28 applications open the first Monday of February 2027 with awards from April
   2027; the Mayor Vi Lyles Endowed Scholarship replaces "no named endowed scholarship
   appears"; page names → "Tuition & Financial Support" / "Applying to Trinity"; meta date.
   **Remove** the history figures from gone pages (Decisions) unless the same figure is on
   a live page; keep 31%, $2,139,114, 419, $11.09M, tuition $26,670 / $28,690 (confirmed).
   Check the "$2.1 million" on Trinity At a Glance agrees with what the card says.

5. **High School Placement** — `src/data/highSchoolPlacementPrograms/trinity-episcopal.ts`.
   `PROFILE` and `K8` constants → new URLs; **delete** `COUNSELORS` and
   `placement.sources[1]` (threadid=6 gone, no archive). Rewrite `placement.headline`
   without "a structure the school added in 2023-24", and `steps[0].text` without the 2023
   counselor quotes, from the live K-8 Advantage popup ("Trinity's two high school
   counselors work closely with families and students to sift through the many options…")
   and the Oct 8, 2026 alumni-panel post (search starts in the fall of 8th grade; an alumni
   panel on Sept 21 moderated by the high school counselor; the in-person interview part of
   high school applications). `verdict.checklist[3]` — the roles are now named on the staff
   directory; rewrite as a question that is still open (e.g. how the two roles split the
   work), or drop. Keep checklist [0], [1], [4], [5] (still unpublished; 99 lines, 41
   asterisks confirmed). Everything else (two counselors, the K–8 thesis quote, 9 years,
   12% boarding, the 95-school list) is confirmed unchanged. Keep the header-comment
   reasoning accurate (it cites threadid=6 and the 2023-24 structure).

6. **Course Offerings** — Trinity block in `src/data/courseOfferings.ts`. Apply
   `courses-arts-clubs.md` §B items 1–12. Removing the Drama Elective row must not leave a
   department empty.

7. **The Arts** — `src/data/artsPrograms/trinity-episcopal.ts`. Apply
   `courses-arts-clubs.md` §B items 13–24 (CATO and Ghana removed everywhere; the two
   now-false verdict asks rewritten; music and theatre staff and the 2026 grant added).

8. **Student Clubs** — `src/data/clubsPrograms/trinity-episcopal.ts`, then the Trinity rows
   of `src/data/clubCatalog.ts` and `src/data/clubClusters.ts`. Apply
   `courses-arts-clubs.md` §B items 25–47 (mock-trial titles, the 2024 DC trip and the food
   drive removed; affinity purpose statements removed; service partners 12 → 10 and the
   Grade 4 partner; Honor Code 2003 and the undated Pledge; Chapel Music added). Then item
   39: no sub-block may render with zero items — omit it instead. **Card title check:**
   Trinity's honors card carries a title override, "Competitions & Student Leadership"
   (`src/data/clubsProgram.ts`, ~L245). With the mock-trial championship record removed, read
   the rebuilt card. If "Competitions" still fits (Mock Trial and Speech & Debate still
   compete as electives), keep the title. If it no longer fits, **do not rename it in this
   plan**: a rename is a UX change and breaks the card's deep link. List it in
   Implementation notes and ask the user. Also update the header comment in
   `src/data/artsProgram.ts` (~L336) that cites "a CATO teaching award".

9. **Sports** — `src/data/sportsPrograms/trinity-episcopal.ts`. Worklist
   `sports-afterschool-summer.md` §A–B "Sports", with the Decisions override: conference →
   **Queen City Athletic Association (QCAA)** in `offered.subhead`, `stats[3]` value/label
   and every other mention; **remove** the Fall 2023 / Winter 2024 results and the "two
   seasons" footnote, and replace them with the Fall 2026 post (7th/8th boys soccer
   undefeated QCAA champions; first-ever QCAA volleyball championship win, 8th-grade girls
   regular-season runner-up; boys and girls cross country QCAA Championship Run-Off wins,
   three runners each in the top 5; an 8th grader won the boys race — **no student name**).
   Cite the season and the post date (Oct 21, 2026), never the post's later game dates.
   Grade bands: keep only those the post confirms. Coaching: remove "head basketball coach
   since 2004", "20 yrs", "~250" and the "20 daggum years" quote (source gone); David Martin
   is "Athletic Director"; Jason Martin is "K-8 Healthful Living Teacher" and coaches cross
   country; add Jalen Haffaney, "Assistant Athletic Director & P.E. Teacher". Volleyball
   staculty coaches may be added by title; leave the parent/alum soccer coaches unnamed.
   Remove the stale `offered.sources[4]` label. If a coaching sub-block is left with zero
   items, omit it. The motto, the no-cuts quote, the 10 season-teams and 90% are confirmed.

10. **After School** — `src/data/afterSchoolPrograms/trinity-episcopal.ts`. Worklist §B
    "After school": replace the income-band pricing everywhere it feeds (`coverage.headline`,
    `coverage.subhead`, `basisNote`, `facts[0]`, `verdict.headline`, `strengths[0]` and
    `[3]`, `checklist[1]` and `[7]`) with "Monthly Rate: $380 ($355 for each additional
    sibling)" — no bands, no "Estimated"; half-day $51/day ($30 with financial support,
    complimentary for monthly-registered students) and full-day $72/day ($45 first sibling /
    $40 each additional with financial support), offered during conferences — drop the
    8:00–5:30 and 5:30-close claims; drop-in $31 / $25 and "until 6:00 p.m." confirmed;
    Jocelyn **Anderson**; `dayInside` rewritten from the live page (homework and reading,
    outdoor play, art, board games, Fun/Film Fridays; drop the Honor Code, group projects and
    the character tagline); enrichments → "chess club, boys and girls run clubs, music
    lessons, and much more", for an additional fee — **remove** the Karate and Cheer club
    classes; `coverage.summer.text` keeps the 2026 dates/prices **labeled 2026** (summer
    decision) with the confirmed care hours. Note in data that monthly and drop-in
    registration is currently closed only if an existing field holds registration status.
    URL constants → the new TED and camp pages; the Cost of Attendance doc is no longer
    linked — cite the tuition page instead.

11. **Summer Programs** — `src/data/summer/trinity-episcopal.ts`. Per the summer decision:
    keep the 2026 slate, prices and fees; make `catalog.headline` and `catalog.subhead` say
    plainly that this is the **2026** season and that 2027 registration opens in January
    2027 ("Check back in January 2027 for Camp Registration!"); confirmed hours stay;
    `costPlanner.fees[5]` → the live nut rule ("please do not send any snacks containing
    nuts… We will also discourage the sharing of snacks"); keep the 2026 fee terms labeled
    2026; fix Camp Independence (both rows, ~L440 and ~L453): the days are overnight
    Wed–Thu plus Friday morning per the school's CSV — correct `desc` and the day fields.
    Camp-page URL constant → `/community/wildcat-summer-camp`; keep the doc/CSV URLs (they
    still resolve and are the school's own).

12. **Sweep for leftovers.** `grep -rn "tescharlotte.org/" src/data src/lib` — only the new
    URLs and the homepage may remain (expect 0 hits for `.cfm`, `blog.cfm`,
    `editoruploads`, and the old slug-style news posts). Also grep `src/data` for
    `Queen City Conference`, `Purdie`, `275`, `Epiphany`, `CATO`, `Ghana`, `Wildcat Visit
    Day`, `threadid`, `2002` (Honor Code), `Greene` → 0 hits in Trinity code (check each hit
    is Trinity's before changing anything; other schools may legitimately use a word).
    Run `npm run schema` if `check:schema` reports drift.

13. **Phase 1 verification** (below), then commit by explicit path, push, verify the push
    (`git rev-parse HEAD` vs `git ls-remote origin fix/trinitysite`), and open the PR with
    `--body-file`. Set the plan to `english-done` and the INDEX row to *English shipped*.
    **→ STOP.** End the turn and ask the user to review the English on
    `/school/trinity-episcopal/` (dev server) before any translation.

### Phase 2 — Every other locale

Only after the user confirms the English. Scope is the **overlay layer** for the nine
`PROSE_TRANSLATED` locales (`es, bn, ht, te, fr, fa, it, hi, ar`), in up to **nine topics**:
`admissions`, `financial-aid-report`, `high-school-placement`, `course-offerings`,
`the-arts`, `student-clubs` (with its `clusters` and `catalog` layers), `sports`,
`after-school`, `summer-programs`. **Not** `src/locales/*.json` — no chrome key changes.
Mechanism: `.claude/docs/prose-translation-architecture.md`; per-locale traps in the
`prose-translation-<lang>.md` docs.

14. **Measure scope from the live modules.** For each topic, extract to a throwaway lang
    (`node scripts/i18n_extract.mjs --topic <t> --lang __verify --out <tmp>`) and diff the
    stamps against the `es` work file. Record per topic: retired, new, unchanged. Every
    retired/new stamp must be a Trinity path (`at` contains `trinity-episcopal` or the
    Trinity accessor path). Any non-Trinity stamp in the diff means something outside scope
    changed — stop and find it. Write the counts into Implementation notes.

15. **Splice by stamp** with `scripts/i18n_splice_work.mjs --lang <code>` (all nine).
    Entries whose English changed only by a spelling swap can carry their `t` with
    `scripts/i18n_restamp.mjs`; every other new stamp gets a fresh translation. **Map by
    `at` path or meaning, never by array index.** Where a row was deleted (Drama Elective,
    Karate, Cheer club, the DC-trip program, removed exhibits), check later array paths
    for staleness (memory: overlay-at-paths-go-stale-on-row-delete).

16. **Translate.** Traps that apply here (from the rollout docs):
    - Figures char-for-char, never re-typed: `$300`, `$100`, `$380`, `$355`, `$51`, `$30`,
      `$72`, `$45`, `$40`, `$31`, `$25`, `$215`, `$26,670`, `$28,690`, `$1,375`, `$1,520`,
      `$195`, `$210`, `$225`, `$785`, `72`, `10`, `16`, the dates (`February 1, 2027`,
      `January 2, 2027`, `Dec. 1, 2026`, `Oct 21, 2026`), times (`9:30-11:00 a.m.`,
      `7:45–9:00 a.m.`, `4:00–5:30`, `6:00 p.m.`), grade bands. Dates translate; their
      digits do not (`check:dates`).
    - `hi`/`te` store the English 3-3-3 figure; `fa`/`ar` store no bidi isolates.
    - Keep identifiers as published: `QCAA`, `CAIS`, `WPPSI-IV`, `WISC-V`, `ISEE`,
      `Clarity`, `FLIK`, `TED`, `Koinonia`, `12 Tribes`, `TAB`, `Code.org`, `Opportunity
      Scholarship`, `Upper School`-style program names; reuse each locale's existing
      rendering from the retired entries.
    - The "2026 season" label on summer text must survive in every locale.
    - `fr`: course codes stay English (`check:fr`).

17. **Rebuild the overlays:** `npm run i18n:build -- --topic <t> --lang <code>` for every
    topic × locale touched.

18. **Phase 2 verification** (below), commit by explicit path, push, verify the push,
    update the PR, merge (`gh pr merge --squash --delete-branch`, pre-authorized), then
    `git checkout main && git pull`. Flip the plan to `implemented` (with an
    `## Implementation notes` section for any deviation) and the INDEX row to
    *Implemented* with the PR link. **Do not deploy.** End with "merged — ready to deploy
    whenever you want it".

## Files touched

| File | Change |
|---|---|
| 22 `source-material/*/trinity-episcopal/*.md` (Source material list) | planning recheck subsections (committed in step 2) + superseded notes + 2 student names removed |
| `.claude/docs/…`, `src/content/*/trinity-episcopal.json`, maybe `src/data/schools.json`, `.claude/docs/DATA-SCHEMA.md` | regenerated (ingest, `npm run schema`) |
| `src/data/admissionsPrograms/trinity-episcopal.ts` | step 3 |
| `src/data/financialAidReports.ts` | step 4, Trinity entry only |
| `src/data/highSchoolPlacementPrograms/trinity-episcopal.ts` | step 5 |
| `src/data/courseOfferings.ts` | step 6, Trinity block only |
| `src/data/artsPrograms/trinity-episcopal.ts` | step 7 |
| `src/data/clubsPrograms/trinity-episcopal.ts`, `src/data/clubCatalog.ts`, `src/data/clubClusters.ts` | step 8, Trinity entries only |
| `src/data/sportsPrograms/trinity-episcopal.ts` | step 9 |
| `src/data/afterSchoolPrograms/trinity-episcopal.ts` | step 10 |
| `src/data/summer/trinity-episcopal.ts` | step 11 |
| `src/data/overlays/work/<topic>.<lang>.json`, `src/data/overlays/<topic>.<lang>.json` | Phase 2, up to 9 topics × 9 locales |
| `.claude/plans/trinitysite.md`, `.claude/plans/trinitysite-data/*.md`, `.claude/plans/INDEX.md` | status, PR, notes |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean.
- [ ] `npm run build` — every chained check passes **except `check:live`**, whose findings
      must all be Trinity paths in the nine topics (the changed stamps fall back to English
      until Phase 2). That is the expected Phase 1 state; list the count in the PR.
- [ ] `npm run check:metrics`, `npm run check:schema`, `npm run check:spelling`,
      `npm run check:cardlink` — pass. A `check:cardlink` failure means a card or area title
      changed: add the former name to `src/lib/cardLinkAliases.ts` as it instructs.
- [ ] `npm run check:plain` — no new Trinity line over the hook's limits (the hook already
      runs on each edit).
- [ ] Step 12 greps — 0 unexpected hits.
- [ ] **Link check:** extract every `tescharlotte.org` / `resources.finalsite.net` /
      `drive.google.com` / `docs.google.com` / `vimeo.com` / `fmkarchitects.com` URL from the
      Trinity files under `src/data` (plus `welcomeVideoUrl` in `src/data/brands.ts`)
      and fetch each **slowly** (5s apart, real browser UA): every one 200. No 404.
- [ ] **Browser check (required).** `npm run build && npx vite preview`, then Playwright
      (real Chrome, `domcontentloaded`, never `networkidle`), `/school/trinity-episcopal/`
      with **every `<details>` forced open**: each area shows the corrected values (spot-check
      $300, $100, $215, $380, QCAA, the Fall 2026 results, 10 service partners, 2003, the
      2026-season label on summer), none of the removed ones (CATO, Ghana, mock-trial
      titles, Queen City Conference, karate, income bands, Purdie), no empty card or
      sub-block, and no literal `**`. Also open the admissions checklist route for Trinity.
      Run `npm run audit:mobile` for Trinity (removals change card widths).
- [ ] Ask the user to review the English.

### Phase 2 — Locales

- [ ] `npm run build` exits **0** (`check:live`, `check:runtime` included).
- [ ] Work files: diff each against `main` — exactly the stamps measured in step 14
      changed, all Trinity. (Not `check_work_integrity --base`.)
- [ ] `npm run check:sepdrift -- --lang <code>` all nine — 0; `npm run check:digits` — review
      every finding; `npm run check:dates`, `check:money`, `check:moneytext`,
      `check:currency`, `check:bidi`, `check:fa`, `check:hi`, `check:fr`, `check:script` —
      clean; `python3 scripts/check_figures.py --lang <code> --topic <t>` per topic.
- [ ] 0 duplicate `at` paths in every rebuilt overlay (snippet in
      `hickorygroverefresh.md` Phase 2 verification).
- [ ] `npm run i18n:leaks -- --lang <code>` diffed against a `main` baseline — no new
      Trinity leaks.
- [ ] `npm run audit:daterender` and `npm run audit:moneyrender` (preview server) — no new
      Trinity findings.
- [ ] **Browser check, all nine locales** (`?lang=<code>`) on `/school/trinity-episcopal/`
      with every card open: the changed strings render translated, figures survive (match
      money by digits). Eyeball at least `es`, `hi`, `fa`.

## Risks

| Risk | Mitigation |
|---|---|
| A removal empties a card or sub-block, shipping an empty shell | Zero-items rule: omit it; the browser check opens every card and looks for empty ones |
| A worklist predating the decisions keeps a gone past event with a Wayback citation | Decisions section overrides; step 12 greps for CATO, Ghana, mock-trial, Queen City Conference |
| A removed array row shifts overlay `at` paths, so translations attach to the wrong row | Splice by stamp and check later array paths (step 15); browser check in 3 locales |
| The rate-limited site 429s the link check and reads as broken links | 5s spacing, real UA; a 429 is retried, never treated as a 404 |
| The ingest turns a source-material change into a new card | Recheck text is under `###` inside `## Provenance`; `check:metrics` after ingest |
| Trinity's site keeps changing (the crawl is a snapshot) | Spot-check the highest-value figures ($300 CAIS, $100 fee, $380 TED, $215 K) live before Phase 1 commit; note any drift |
| A "not published" claim survives that the live site now answers | Decision + worklist B rows; review every `ask`/`checklist`/`notPublished` string in the nine files during step 12 |

## Open questions

- **Copy the profile/CAIS PDFs into `source-material/`?** — **default:** only if the ingest
  ignores them (test on one); otherwise leave them in `reports/trinity-site-2026-11-14/docs/`.
- **A section D item that fits no existing field** — **default:** skip it and list it in
  Implementation notes for the user; never add UI.

## Implementation notes

### Phase 1 (English), 2026-11-14

Built in three parallel passes, one per worklist, then ingested and verified together.

**Deviations and judgment calls (all within existing cards, no new UI):**

- **No PR opened yet.** Plan step 13 says open the PR in Phase 1. `/implement` keeps the
  PR for after Phase 2, so Phase 1 is committed and pushed to `fix/trinitysite` only.
- **PDFs not copied into `source-material/`** (open question 1). Every cited fact is
  already transcribed there, so the copies would add nothing.
- **After School timeline:** the "Full days (school closed)" bar was removed, because the
  live site gives no hours for it. Its $72 rate stays in the facts, marked "offered during
  conferences". The half-day bar now ends at TED's published 6:00 p.m. close (it used to
  say 5:30, which is no longer stated). Added checklist question: "What hours does TED run
  on half days and conference days?"
- **Sports coaching tiles:** the old since-2004 / 20 yrs / ~250 tiles were replaced with
  counts from live pages: "3 athletics staff on the Athletics page" and "4 QCAA titles in
  Fall 2026" (soccer, volleyball, boys and girls cross country Run-Off). Volleyball coaches
  are named by staff title. Parent and alum soccer coaches are unnamed.
- **Summer Camp Independence:** `dayLabel` is `Mon–Fri` (an existing value, so no new
  chrome key). `hours` is `9-4p M-Tu · 9a W-Th (overnight) · 9-12p Fri`, per the school's CSV.
- **Course Offerings:** the Middle School department "Weekly Enrichments" was renamed
  "Enrichments", to match the live heading. A department is not a card, so
  `check:cardlink` passes. Added rows: Gr 6 "Digital Learning / Computer Science"
  (Enrichments) and "Chapel" (Community Life). Drama Elective removed; Arts & Ensembles
  keeps 2 rows. The four Faith Studies/FOCUS rows still say "one of the 13 weekly Middle
  School enrichments listed in the School Profile", which is still true of the live profile.
- **Financial Aid:** the prior-year tuition bars and % change were removed with the
  tuition history (gone pages). The lunch "Aid does not reach the lunch line" box was
  removed, so `fa-beyond` has no `boxes`. Added rows: Clarity fee $65, TED half-day $51,
  TED conference full-day $72. Section and box titles were left unchanged so card links
  hold. "$2.1 million" on Trinity At a Glance agrees with $2,139,114.
- **Clubs:** the Mock Trial / Speech & Debate cluster evidence moved from
  'verified'/"Verified — event" to 'reported'/"School-published". The service DC-trip row
  was rebuilt from 2025-26 live material (value '2': Raleigh and Washington, D.C.).
  Invisible Differences is off the affinity card (its only description came from the gone
  page). The 2025-26 profile's MathCats/Book Club comparison was dropped as a gone-page
  fact. The honors title "Competitions & Student Leadership" was kept: Mock Trial and
  Speech & Debate still compete as coached electives, though no current result is
  published.
- **Arts:** added "Banners for Ground Zero" (September 2001) as a visual-arts exhibit
  (its source post is live), a music "Who teaches it" row (Wallace, Moorman, the 2026
  Light the Fire grant), the Nov 10 / Nov 19 concerts, and Leslie Cossor. The stipend
  awards keep the post date, March 2026.
- **HSP:** `steps[0]` says the search starts "in the fall of 8th grade", per the plan.
  The Oct 8 post implies this but does not use that phrase.

**Section D items skipped** (each would have needed a new field or block, or added
nothing): the main phone and the "CCA Auditorium" room name in Admissions (already
covered); the CAIS ESL nonverbal index and the non-refundable-after-Jan-1 booking rule
(they would lengthen an already long step; easy to add if wanted); the Trinity Endowment
line; the Jan 2026 Raleigh/D.C. mention in HSP (it sits on the clubs service card
instead); the "What makes Wildcat Summer Camp stand out?" list (no field); TED
"registration closed" (no field holds registration status; recorded in source-material);
WOW Week, Science Buddies and 12 Tribes as course rows.

**Ingest:** the per-topic `build_docs.py` runs reordered `schools.json` and re-dated every
school's note. HEAD order was restored, and date-only note diffs were reverted, so only the
nine Trinity notes, the nine Trinity content JSONs and the `generated` date changed.
`check:metrics` reports no new unmatched subtopic. Its "branding file not ingested" line
predates this branch: branding is not an ingested topic.

**Phase 1 verification:**
- `tsc -b` is clean.
- `npm run build` passes every chained check up to `check:live`, which fails as expected:
  454 findings per locale × 9 = 4,086. Mapped through the work files' `of` → `at`, all
  454 are Trinity-only paths. Per topic (per locale): admissions 70, after-school 70,
  course-offerings 32, financial-aid-report 44, high-school-placement 16, sports 30,
  student-clubs 110, summer-programs 20, the-arts 62.
- The checks after `check:live` in the chain were run on their own and all exit 0:
  `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`,
  `check:news`, `check:photos`, `check:cardlink`.
- `check:schema` and `check:spelling` pass.
- The step 12 greps found 0 stale terms in Trinity prose. The remaining hits are header
  comments recording what was removed, plus 2026 summer camp prices of $275, which are
  correct.
- Link check: 43 unique URLs fetched 6s apart, and 42 returned 200. The welcome video
  player returns 401 to a request with no referer; its oEmbed returns 200, and `brands.ts`
  is unchanged.
- The live spot-check on 2026-11-14 confirmed $215 K, $380/$355, the $100 fee, the $300
  CAIS fee and the 72-hour rule.
- Browser check (real Chrome, every `<details>` open, both band tabs): every expected
  value is present and every removed one is absent. The "separate" / "12% since 2004"
  matches were false positives. There are no empty cards and no literal `**`. The
  admissions checklist route is correct.
- `audit:mobile --only trinity-episcopal`: 0 broken cards and 0 page overflow.

**Phase 2 scope:** the 454 retired stamps per locale above, plus whatever is new. Measure
both from a fresh extract (step 14).

### Review fix: unsourced ladder percentages (user-approved UX change, 2026-11-14)

At the English review, the user asked what the 25% and 31% on Trinity's State Funding
ladder meant. Neither was a share of tuition, which is what the field is defined as. The
25% (State) had no source; it matched Gaston Day's State rung and was most likely copied
as a bar width. The 31% (Need) is the share of *students* aided, a different measure.
Both predate this plan; they shipped with #312. Gaston Day's Merit rung had the same
defect (`share: 40` beside "The award amount is not published").

With the user's approval, `ScholarshipRung.share` is now optional. A rung without it
renders no bar and no percentage, and its label is top-aligned (`.fa-ladder-gift--nobar`).
`share` was removed from Trinity State, Trinity Need and Gaston Day Merit. No rung text
changed, so there is nothing new to translate. Verified in real Chrome on both schools,
and `audit:mobile` finds 0 broken cards on either.

Second pass on Gaston Day's ladder, also at the user's request:
- **State (`share: 25`) removed.** Gaston Day publishes "approximately $3,000 to $7,000"
  against tuition of $19,500–$22,390. That is roughly 13–36% depending on award and grade
  band, which is a range rather than one share, and no source states 25%.
- **The W. Duke Kimbrell rung keeps its published 100% bar.** Its label changed from
  "100%" to **"Top merit"**, so the figure no longer appears three times in one row.

**Phase 2 note:** this adds **one non-Trinity stamp** to `financial-aid-report`:
`gaston-day:sections[4].ladder[0].gift`, `'100%'` → `'Top merit'` (the retired `es` stamp
is `2f97df3b`). Step 14's "any non-Trinity stamp means stop" rule should expect exactly
this one. Translate it in all nine locales, reusing each locale's existing rendering of
the `Merit` gift label (`es` "Mérito").

### Phase 2 (nine prose locales), 2026-11-14

Run in a fresh window after the user approved the English.

**Scope (step 14), measured from a fresh extract against the `es` work files:** 231 new
and 232 retired stamps per locale, identical in all nine. Every one is a Trinity path,
except the expected Gaston Day gift label (`7f035f15` "Top merit" replacing `2f97df3b`
"100%"). Per topic, new/retired: admissions 37/36, sports 14/16, the-arts 27/31,
student-clubs 50/57, after-school 33/35, high-school-placement 8/8, summer-programs 9/10,
course-offerings 27/16, financial-aid-report 26/23. College Support, Global Exposure,
Learning Support and metric-values were untouched (0/0). On `main` no locale had an
untranslated entry, so every empty `t` after the splice was a new stamp.

**Method.**
- **Splice:** `i18n_splice_work.mjs --lang <code>` was run for all nine locales. 414 kept
  entries per run had their `at` refreshed, and every refreshed path is a Trinity path.
- **Translation:** nine parallel agents, one per locale, each with a private scratch
  folder. Each agent wrote only an `of` → `t` map and touched no repo file (the
  parallel-agents lesson).
- **Applying:** a central script applied the maps. It refused to overwrite any existing
  `t` and refused any bidi control character.
- **Rebuild:** the overlays were rebuilt with `i18n:build` for all 81 topic × locale pairs.

**Central corrections to agent output** (each at the agent's own flag or a leak finding):
- **9/11:** fr, it and es now use the local name of the date ("du 11-Septembre",
  "dell’11 settembre", "del 11 de septiembre"). ht and the non-Latin locales keep "9/11".
- **20th century:** es "siglo XX" and it "XX secolo". fr keeps "20e siècle".
- **"board games":** hi बोर्ड गेम and te బోర్డ్ ఆటలు. Both agents had left it in Latin script,
  but each locale translates every other activity chip on the card.
- **Admissions contact titles:** bn, it and hi had left the new Trinity titles in English
  (Chief Enrollment Officer, Director of Admission and Boarding School Placement, and in
  it also Registrar). All three locales translate these titles for other schools. The
  titles are now translated, with gender-neutral forms in it ("Responsabile …").
- **Sports role:** "Assistant Athletic Director & P.E. Teacher" now translates the P.E.
  half in it and te and keeps "Athletic Director" in Latin script. That is how both
  locales render the "Athletic Director · P.E. Teacher" titles already shipped.

**Kept as-is** (listed by the agents or by `i18n:leaks`, judged correct):
- Course titles stay English per the course-title policy: `Chapel`, `Computer Science`,
  `Choice Electives`, `Digital Learning / Computer Science`. The last two show up as
  "new" in the leak diff only because inserted rows shifted their paths.
- The quote-only Choir/Band course description stays verbatim, as in 7 of 9 locales.
- fa and ar write `←` in the admissions step chain (`ff91126a`). The chain is RTL
  prose, so the arrow points in reading order. The `→` rule applies to Latin runs only.
- Clubs flag `615e5377` keeps its bookkeeping wording. It is a Student Clubs `gap`
  flag, so it never renders.

**Phase 2 verification:**
- `npm run build` exits **0**. `check:live` is green in all 9 locales (it was 4,086
  findings at the end of Phase 1). `check:runtime` resolves 15,588 entries per locale.
- Work files diffed against `main`: 2,079 new stamps (231 × 9), 2,088 retired
  (232 × 9), 0 existing translations changed, and no non-Trinity `at` change.
- `check_work_integrity --base main`: every violation is structural (string counts, and
  the one reordered high-school-placement entry), as this plan predicted. There is no
  foreign script in any locale, and fa/ar separate cleanly (77.8% vs 0% Persian-only
  letters). A stopword check on the four Latin-script locales, read line by line, found
  no cross-locale prose.
- `check:sepdrift` is 0 drifted in all nine. `check:dates`, `check:moneytext`,
  `check:currency`, `check:bidi`, `check:fa`, `check:hi`, `check:fr`, `check:script`,
  `check:translations` and `check:hashes` are clean. `check_figures.py` passes all 81
  topic × locale pairs.
- `check:money` exits 1, **identically on `main`**: two Cup render sites in
  `SportsProgram.tsx`. The failure predates this branch and is unrelated to it.
- `check:digits`: 2,079 units compared, 5 to review. All 5 are the deliberate
  9/11 and 20th-century rewordings above.
- 0 duplicate `at` paths in the 81 rebuilt overlays.
- `i18n:leaks` diffed against a `main` baseline: no new Trinity leak after the fixes
  above, except the keeps listed.
- Browser check in real Chrome on the preview build: `/school/trinity-episcopal/` with
  every `<details>` open and every band tab clicked, both checklist bands, and the
  Gaston Day page. In every locale all probeable new strings render. The only misses
  are 4 Student Clubs `gap`/`count` flags, which are hidden by design. es, hi and fa
  were eyeballed: the CAIS $300, TED $380/$355, K $26,670 and the Dec. 1 open house
  render correctly, es localizes money (`300 US$`), and no literal `**` appears.

**Source-label dates (found by `audit:daterender`, fixed in this phase).** In every
locale the date audit flagged `Jan 8 2026` in a Trinity clubs `source.label`. Source
labels are not extracted, so a full English date renders untranslated on every locale's
page. Phase 1 introduced it. All six Trinity source labels that carried a full date now
use month and year only (`Jan 2026`, `Oct 2026`, `Mar 2026`, `March 2026`), the form
Charlotte Prep's labels already use. They are in clubs (3), sports (2), arts (2) and
high-school-placement (1). A dry-run splice shows 0 added and 0 dropped stamps, so no
translation is affected.

**PAUSED 2026-11-14 (user request, going offline).** Everything above is committed on
`fix/trinitysite`. Remaining:
1. `npm run build`, then `npx vite preview --port 4173`.
2. Re-run `npm run audit:daterender`. Expect 0 Trinity findings. The pre-fix run flagged
   only the source label, in es/bn/ht/te/fr/fa/it/hi, and was stopped during `ar`.
3. Run `npm run audit:moneyrender`. It has not run yet. Expect no new Trinity findings.
4. Push, open the PR (`--body-file`), squash-merge, `git checkout main && git pull`.
   Then set this plan to `implemented` with the PR number, and the INDEX row to
   *Implemented*. **Do not deploy.**
