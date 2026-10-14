---
name: latinglobal
title: Add Charlotte Latin to Global Exposure — eight cards (credential omitted; network retitled "School Year Abroad & the Wider Network"), four ledger years from the school's Global Studies Google Site, no prices or exact travel dates on the page
status: english-done
phases: 2
created: 2026-10-13
branch: feat/latinglobal
prs: []
---

# Charlotte Latin — Global Exposure

## Goal

Give Charlotte Latin School a **Global Exposure** section (slug `international-travel`),
the third school after Providence Day and Charlotte Country Day. Country Day's section is
the standard (`.claude/plans/ccdglobal.md`, `src/data/internationalTravel/charlotte-country-day.ts`),
and Latin is built to its depth wherever Latin's own pages support it.

It works when `/school/charlotte-latin/` renders the section after Course Offerings with
**eight cards** in registry order — Where They Go · Exchanges & Homestays · Signing Up for
Travel · Global Community on Campus · Global Learning at Each School Level · School Year
Abroad & the Wider Network · Firsts & Milestones · Verdict & Ask the School — every fact cites a page on charlottelatin.org, the
school's Global Studies Google Site, or a Wayback copy of one; no student, parent or trip
leader is named; no trip price, deposit or exact travel date renders; and the other two
schools' sections are byte-for-byte unchanged.

## Context

**The area today.** Read these before step 1, including their Implementation notes:
`.claude/plans/intltravel.md` (#338), `pdtrips2027.md` (#341), `ccdglobal.md` (#344),
`pdcommunity.md` (#346), `communityfourth.md` (#347), `gestandard.md` (#348).

- Types, the card registry (`INTERNATIONAL_TRAVEL_CARDS`), `TITLE_OVERRIDES`,
  `WIDE_TRAVEL_CARDS`, `PROGRAMS` and the overlay loader: `src/data/internationalTravel.ts`.
  The registry order is `trips, exchanges, signup, community, start, credential, network,
  milestones, verdict`.
- **The model file:** `src/data/internationalTravel/charlotte-country-day.ts` — header
  comment, URL constants at the top, `'<domain> — <page>'` source labels, card order, tone,
  ordinal grade wording ("8th grade · up to 15 students"), season `timing`, `noteByDiv`.
- Data rules: `src/data/internationalTravel/README.md`. Read it first. Every optional block
  is omit-to-hide; gaps go only to `verdict.ask`; figure fields (`stats[].value`,
  milestone `year`, ledger `year`, partner `years`) hold figures only; no prices or exact
  travel dates; photos optional, real, in source color, naming nobody.
- Renderer: `src/components/InternationalTravel.tsx`. **No renderer change is needed.**
  Confirmed at planning: `StatStrip` returns `null` for an empty array (line ~79), so
  `community.stats: []` renders cleanly; `CommunityBody` (~line 524) renders cells; event
  `audience` renders as a neutral tag (~line 505); `ExchangePartner.out`/`in` are optional.
- `src/pages/SchoolDetail.tsx` filters the registry by `itEntry[c.key] != null`, so the
  omitted `credential` card simply does not render.
- Two gates (README): the data file + `PROGRAMS` entry, **and** the manifest entry produced
  by ingesting `source-material/international-travel/charlotte-latin/`.
- `scripts/i18n_topics.mjs:92` already maps `charlotte-latin` → **`charlotteLatin`**, so
  the export name is fixed.
- Splicing a new school into existing work files: `scripts/i18n_splice_work.mjs`
  (ccdglobal Phase 2 step 2). **Never re-extract.**
- Shared chrome (`cards.international-travel.*`, `travel.*` in `src/locales/en.json`) was
  checked at planning: nothing in it names another school. **The only chrome change is one
  new key**, `cards.international-travel.network@charlotte-latin`, for the title override
  (the precedent is `network@charlotte-country-day`, ccdglobal).

**The research — and the key finding.** Latin runs **two official sites**:

- `charlottelatin.org` carries the overview: the Global Education page (key **GE**), the
  division pages, tuition and the Plus Fund.
- The **Global Studies Google Site** (`sites.google.com/charlottelatin.org/globalstudies`,
  school-run, signed by the Director of Community, Belonging and Global Education) carries
  every 2026–27 trip page, the application, the travel and host-family FAQs, the Important
  Dates calendar, the 2026–27 visiting-school schedule and two trip blogs.

The deep-research PDF reported the Google Site as blocked; **it loads with plain `curl`**,
and it supplies everything the PDF called "NOT PUBLISHED" — dates, group caps, homestays,
eligibility, selection, the safety provider (International SOS) and the sign-up calendar.
The PDF's "program page" (`/leading-programs/global-studies-and-travel-opportunities`) is now
**404**; a Wayback copy (WB-GS-2510) survives.

- `source-material/international-travel/charlotte-latin/Charlotte Latin - International Travel - Deep Research.md`
  — PDF transcription, a lead sheet with planning notes on where the PDF was wrong.
- `…/Charlotte Latin - International Travel - Source URLs.md` — **the citation record**:
  the page-key table (GE, MS, LS, US, CO, TUI, AG, LEAD, G-PROG, G-ARG … G-QUE, G-APP,
  G-FAQ, G-DATES, G-SIS, G-SIS27, G-HOST, BLOG-ARG23, BLOG-SA26, N-GLOBAL, N-HOST, N-GEBG,
  N-SUNNY, N-MSMUN, N-HMUN, N-DIW25, N-DIW23, N-LNY26, N-LNY25, WB-GS-2510, WB-GAPP-2510,
  WB-GHOME-2502), the Verified table, the **2026–27 detail table**, the ledger shape, the
  "Not verified" table, conflicts/spellings and photo candidates. **Only fetched or Wayback
  rows may render.** Use the keys below exactly as that file defines them.

## Decisions

- **Eight cards; `credential` omitted.** Latin publishes no global diploma or certificate.
  "Is one planned?" is a Verdict question.
- **`network` renders, retitled "School Year Abroad & the Wider Network".** **User decision,
  2026-10-13**, made during `/global-exposure` B4. The user first chose "Omit the Network
  card", then changed their mind the same day: "lets go with your recommendation", which
  was the option *"SYA & the Wider Network"*. **That reversal is the approval record.**
  Latin has no Round Square-type membership; its strongest verified network fact is School
  Year Abroad membership (G-EXT). The card holds SYA and the approved semester schools, the
  Independent Schools Cultural Alliance, educator conferences, faculty travel and a short
  Model UN ledger.
  - `TITLE_OVERRIDES['charlotte-latin'] = { network: 'School Year Abroad & the Wider Network' }`.
  - New chrome key `cards.international-travel.network@charlotte-latin` with the same
    English. Phase 1 adds it to `en.json` only; Phase 2 translates it in the nine other
    catalogs. `check:chrome` reports it as pending in between, which is expected.
  - The ledger is thin: two rows, ten years apart. That is a known below-standard point,
    accepted with the title.
- **Per-card standard (vs. Country Day), recorded at `/global-exposure` B4:**

  | Card | Status | Reason |
  |---|---|---|
  | Lead + stats | at standard | |
  | `trips` | at standard | 22 trips over four school years; 2026–27 fully detailed |
  | `exchanges` | at standard | Germany and China have no current leg → Verdict |
  | `signup` | below standard (layout) | Latin publishes one calendar for both divisions → groups by phase, events tagged by `audience` |
  | `community` | below standard | no published figures on international families, ESL or languages → `stats: []`; 6 cells (≥3, so it renders) |
  | `start` | at standard | |
  | `credential` | omitted | none published |
  | `network` | below standard | renders as "School Year Abroad & the Wider Network" (user, 2026-10-13); the Model UN ledger has only two rows (2024–25, 2015–16) |
  | `milestones` | at standard | ≥5 dated events |
  | `verdict` | at standard | |

- **Stat strip** (pure figures, each with a "per the school"-style note):
  - `7` · sister schools · "in Germany, France, Argentina, Italy, China and South Africa" (GE)
  - `1989` · first sister school · "Jugenddorf Christophorusschule, Bad Zwesten, Germany" (GE)
  - `8` · travel programs · "in 2026–27, for students in grades 6–11" (G-PROG, G-FAQ)
  - `5` · visiting sister-school groups · "hosted by Latin families in 2026–27" (G-SIS27)
- **Starting grade.** G-FAQ: "current grades 6-11" may apply; "Middle School" means rising
  7th–9th graders. Render it as **travel opening to 6th graders, for a trip the summer
  after**, never as "6th graders travel". The MS page's grade-level class trips (Atlanta,
  Québec, Washington, D.C., "Beginning in sixth grade") are a **separate** thing and go in
  `start`, not the ledger.
- **Two Québec trips exist** (Source URLs → conflicts): a grade-level class trip (MS page)
  and the elective Global Studies trip to Montreal and Québec City (G-QUE; the 2025 one was
  "new this year", 22 students, N-GLOBAL). The ledger holds only the elective;
  "which grade's class trip goes to Québec?" is a Verdict question.
- **Ledger years and labels.**
  - `2026–27` — the eight G-PROG programs, with `noteByDiv`
    (`MS: 'summer 2027'`, `US: 'summer 2027'` — or omit `noteByDiv` if both read the same;
    the combined `note` is `'all eight programs in summer 2027'`).
  - `2025–26` — note `'Upper School programs as offered in October 2025'`. Germany,
    Argentina, New Mexico, Belgium & the Netherlands, South Africa (leadership course). Only
    South Africa is confirmed run (BLOG-SA26), so it alone gets `timing: 'Summer 2026'`;
    "did the others run?" is a Verdict question.
  - `2024–25` — note `'summer 2025'` (N-GLOBAL; dated by its `summer_25_*.jpg` images and
    its position in the news index).
  - `2022–23` — note `'summer 2023'` (BLOG-ARG23, G-ENG).
  - **Division of a 2024–25 / 2022–23 trip comes from GE's program lists** (Argentina,
    France, Italy, South Africa, Spain = Upper School; England ISCA, Québec = Middle School).
    Record this inference in Implementation notes.
- **Selection is program-wide, not per trip** (G-APP, G-FAQ): an online application; Upper
  School applicants interview and name a faculty/staff reference; Middle School applicants
  name a reference and interview only if oversubscribed; a waitlist when full. It goes in
  the `trips` intro and the `signup` intro, not in each trip's `theme`. Trip-specific
  prerequisites (Spain: Spanish III and/or a teacher recommendation; South Africa exchange:
  two girls and two boys) do go in the trip.
- **The South Africa long-term exchange homestay** is girls only (St. Anne's host families);
  Hilton boys board in a dormitory. Set `homestay: 'Pietermaritzburg'` (the G-SAX wording for
  where they live) and say "girls stay with host families; boys board at Hilton College" in
  `theme`, so the Homestay tag is not read as covering both.
- **Spellings** (GE wins): Sainte Marie Grand LeBrun · Istituto Bertrand Russell · Colegio
  Carmen Arriola de Marin · St. Anne's Diocesan College · Hilton College · partner location
  "Hilton, South Africa". Name no staff member, including the director.
- **Partner `years`** are pure-figure spans: Germany `1989–2026` (last documented: the
  2025–26 program), France `1996–2027`, Argentina `1998–2027`, Italy `2002–2027`, South
  Africa ×2 `2008–2027`, China **`2006`** (no documented activity since; the start year
  alone, with no `out`/`in`).
- **No trip price, deposit, airfare or exact travel date renders** — season + year only.
  The sign-up calendar's deadlines and meetings may render, including "reservation
  agreements and deposits due" **without the amount**. Visiting-group dates render as a
  season ("in the fall", "in winter").
- **No quote renders.** The Google Site's student reflections are unattributed but come from
  named-student pages; the host-parent quote names its family. Leave them in research.
- **No Compare change**; the area stays in `COMPARE_DEFERRED_TOPICS`.
- **No third-party fact renders.** The Carney Sandoe brochure (73 students/yr, the new
  directorate), ZipRecruiter, U.S. News, GuideStar and stannes.co.za stay out.

## Approvals needed

**None outstanding.** Adding a school to an existing research area with existing cards
needs no UX approval. The `network` title override was approved by the user on
2026-10-13 (see Decisions). The user reviews wording at the Phase 1 stop.

`npm run deploy` is **not** part of this plan. Merging is not publishing.

## Source material

Written during `/global-exposure` (2026-10-13), **uncommitted**, ingested by `/implement`
in step 1:

- `source-material/international-travel/charlotte-latin/Charlotte Latin - International Travel - Deep Research.md`
- `source-material/international-travel/charlotte-latin/Charlotte Latin - International Travel - Source URLs.md`

The PDF itself is not on disk; the transcription is the committed record. Students are
unnamed in both files; prices and exact dates are recorded there only.

## Out of scope

- A Credential card for Latin.
- Renderer, type or registry changes; any chrome key beyond `network@charlotte-latin`.
- Any change to Providence Day's or Country Day's data.
- Compare rows, `VALUE_METRICS`, home-grid cells.
- The Carney Sandoe "73 students" figure, the student podcast episode, the Pablo Cartaya
  visit, the media gallery (`cf_media g=742`).
- A podcast episode. `npm run deploy` and the news Worker.

## Steps

### Phase 1 — English

1. **Branch, commit and ingest the source files.**
   - `git checkout main && git pull && git checkout -b feat/latinglobal`.
   - `git add` the two source-material files above **by explicit path** and commit.
   - Run the `ingest-source-material` skill for `international-travel`:
     - `python .claude/skills/ingest-source-material/build_docs.py international-travel`
     - `python scripts/build_site_content.py`
     - `node scripts/check_metrics.mjs` — the catch-all `RULES['international-travel']`
       should keep it clean.
   - `git status --short`; **commit only this topic's paths** (memory
     `ingest-full-rebuild-sweeps-topics`).

2. **Close the verification gaps; update the Source URLs file.**
   - Re-fetch G-PROG, G-DATES, G-SIS27 and GE (`curl -sL` with a browser UA) and confirm
     nothing moved since 2026-10-13. If a program or date changed, the live page wins;
     record it.
   - Work the "Not verified at planning" table: fetch the 2017–18 and 2020–21 US profile
     PDFs only if a card will use them (default: it will not — drop); fetch the
     "2023 Middle School Model United Nations" post from the school-news index — if it gives
     a count, it may join the Model UN community cell; drop the LS "Global Partners in TK/KG"
     and "Schools Around the World" claims.
   - **Photos.** Candidates are in the Source URLs file. Copy the exact `v<version>` path
     from the page source, download at `t_image_size_4`, and **open each image**:
     - trips: `summer_25_1.jpg` (or `_2`/`_3`), else `SouthAfrica_Leadershipcover.jpg` →
       `public/travel/charlotte-latin-<subject>.jpg`;
     - exchanges: `argentina2.jpg` → `public/travel/charlotte-latin-argentina-exchange.jpg`.

     Drop any image showing a legible name, sign or caption, or one that matches the named
     student's lab visit in N-GLOBAL. Resize to the scale of the existing `public/travel/`
     images. Name no one in `alt` or caption; `credit: 'Photo: Charlotte Latin School'`.
   - Record every result under an **"Implement-time verification"** heading. Drop any fact
     still PDF-only.

3. **Latin data — new `src/data/internationalTravel/charlotte-latin.ts`**, exporting
   `charlotteLatin: InternationalTravelProgram`. Model it on `charlotte-country-day.ts`:
   header comment (provenance, verification date, rules followed, "Latin publishes no global
   credential, so the `credential` card is omitted"), URL
   constants named after the Source URLs keys (`CL = 'https://www.charlottelatin.org'`,
   `GS = 'https://sites.google.com/charlottelatin.org/globalstudies'`, then `GE`, `MS`, `LS`,
   `US`, `CO`, `AG`, `G_PROG`, `G_ARG` … `WB_GAPP_2510`), source labels
   `'charlottelatin.org — <page>'` and `'Global Studies site — <page>'`, and the Wayback
   label style `'<page> (Wayback, Oct 2025)'`. **Every fact traces to a fetched or Wayback
   row.** Content per card (wording is a draft; tighten it, keep the facts):

   - **`lead`.**
     - strong: Global Studies travel opens to 6th graders, for summer programs, and is built
       around seven sister schools on four continents, with exchanges and homestays both
       ways in Argentina, France, Italy and South Africa.
     - muted: In 2026–27 that is eight programs, from a credit-bearing leadership course in
       South Africa to two weeks in England with the Independent Schools Cultural Alliance.
   - **`stats`**: the four tiles in Decisions.
   - **`trips`** (wide). `intro.strong`: every program runs in the summer, open to students
     in grades 6–11, with an application, a faculty or staff reference, and — for Upper
     School — an interview. `intro.muted`: Latin's sister schools host most Upper School
     trips, and families who travel are strongly encouraged to host a visiting student in
     return. Year groups, newest first:
     - **`2026–27`** (G-PROG and each program page):
       - Argentina · `place: 'Buenos Aires — Colegio Carmen Arriola de Marin'` · US ·
         `group: 'rising 10th–12th graders · up to 12 students'` · theme: sister-school
         exchange, language and culture, classes with host siblings · `Summer 2027` ·
         `homestay: 'Buenos Aires'`
       - France · `'Bordeaux — Sainte Marie Grand LeBrun, then three days in Paris'` · US ·
         up to 12 · sister-school exchange, language and culture · `Summer 2027` ·
         `homestay: 'Bordeaux'`
       - Italy · `'Milan, Guastalla — Istituto Bertrand Russell, then Venice'` · US · up to
         12 · sister-school exchange, a week with host families · `Summer 2027` ·
         `homestay: 'Guastalla'`
       - South Africa · `'Cape Town, Durban + Pietermaritzburg'` · US · up to 12 ·
         Cultural and Comparative Leadership, a credit-bearing Upper School leadership
         elective graded on the transcript · workshops at Hilton College and St. Anne's ·
         `Summer 2027`
       - South Africa · `'Pietermaritzburg — St. Anne's Diocesan College and Hilton College'`
         · US · `group: 'two girls and two boys, rising juniors and seniors'` · long-term
         sister-school exchange of four to six weeks; girls stay with host families, boys
         board at Hilton College · `Summer 2027` · `homestay: 'Pietermaritzburg'`
       - Spain · `'Cádiz'` · US · up to 12 · two weeks of language immersion run by Centro
         Mundolengua · Spanish III and/or a teacher's recommendation required ·
         `Summer 2027` · `homestay: 'Cádiz'`
       - England · `'Southern England, with the Independent Schools Cultural Alliance'` · MS
         · `group: 'rising 7th–9th graders · up to 12 students'` · two weeks alongside
         students from schools around the world · `Summer 2027`
       - Canada · `'Montreal + Québec City'` · MS · up to 20 · five days of French-Canadian
         culture; no French classes required; runs every other year · `Summer 2027`
     - **`2025–26`** (WB-GAPP-2510 for the list, GE for each theme, BLOG-SA26 for South
       Africa): Germany (sister-school exchange · innovation and design) · Argentina
       (sister-school exchange) · New Mexico (arts immersion) · Belgium & the Netherlands
       (peace, justice and memory) · South Africa (Cultural and Comparative Leadership,
       `timing: 'Summer 2026'`). All US. No group sizes (unpublished).
     - **`2024–25`** (N-GLOBAL): Argentina · Canada (`group: '22 students'`, MS, five days,
       new that year) · England (MS) · France (homestay Bordeaux) · Italy (run without a
       tour organizer) · South Africa (`group: '12 students'`, over two weeks, the first Latin
       trip for academic credit) · Spain. All `timing: 'Summer 2025'`.
     - **`2022–23`**: Argentina (US, `homestay: 'Buenos Aires'`, classes at Colegio Marín,
       BLOG-ARG23) · England (MS, two weeks with ISCA, G-ENG). `timing: 'Summer 2023'`.
     - **`alsoOnRecord`**:
       - *Costa Rica and Yellowstone.* GE also lists Middle School programs in Costa Rica
         (leadership and sustainability) and Yellowstone and Grand Teton (leadership and the
         environment), with no year.
       - *Class trips.* Middle School grade-level trips to Atlanta, Québec and Washington,
         D.C., beginning in 6th grade (MS).
     - **`photo`**: the kept trips image, if any.
     - **`headline`**: count the rendered trips (22 if all survive step 2) and name the years
       ("Twenty-two trips across four school years — 2022–23, 2024–25, 2025–26 and 2026–27 —
       … Filter by division.").
   - **`exchanges`.**
     - intro.strong: G-SIS — Latin welcomes sister-school groups for two- or six-week
       exchanges; visitors stay with Latin families and attend classes with their host
       siblings, and Latin returns the visit with summer programs. intro.muted: the
       relationships date back more than 30 years (G-HOST).
     - `partners` (7, in GE order): Germany `1989–2026` Jugenddorf Christophorusschule, Bad
       Zwesten (no legs) · France `1996–2027` Sainte Marie Grand LeBrun, Bordeaux · out
       `'Upper School students, in summer 2027'` · in `'Bordeaux students visit in the spring'`
       · Argentina `1998–2027` Colegio Carmen Arriola de Marin, Buenos Aires · out
       `'Upper School students, in summer 2027'` · in `'12 Marín students visit in winter'` ·
       Italy `2002–2027` Istituto Bertrand Russell, Guastalla · out `'Upper School students,
       for a week of homestay in summer 2027'` · in `'12 Russell students visit in the fall'`
       · China `2006` Luzhou Laojiao Tianfu Middle School, Luzhou City (no legs) · South
       Africa `2008–2027` Hilton College, Hilton · out `'two boys, boarding for four to six
       weeks in summer 2027'` · in `'two Hilton students visit for six weeks in late fall'` ·
       South Africa `2008–2027` St. Anne's Diocesan College, Hilton · out `'two girls, with
       host families for four to six weeks in summer 2027'` · in `'two St. Anne's students
       visit for six weeks in the fall'`.
     - `homestays` (one complete sentence each): Buenos Aires, Argentina · Bordeaux, France ·
       Guastalla, Italy · Pietermaritzburg, South Africa (girls only; boys board) · Cádiz,
       Spain (with at least one other Latin student; not a sister school).
     - `visitors`: a visiting group is usually about 12 students and two teachers, for 10–14
       days, joining classes and group outings (G-HOST) · every adult in a host home completes
       a background check arranged by the school (G-HOST) · families need not have an Upper
       School student to host, and Upper School travelers on a sister-school exchange are
       strongly encouraged to host (G-HOST).
     - `photo`: the Argentina image, if kept.
     - headline: seven sister schools since 1989, five of them hosting or visiting in
       2026–27, with homestays both ways.
   - **`signup`** (generic title). `footnote: false`. intro.strong: one application for every
     program, reviewed by the Global Studies office, senior administration and trip leaders;
     intro.muted: the selection and waitlist rules (Decisions). Two groups, every event with
     an `audience`:
     - **Applying · 2026–27 programs**, note `'2026 cycle'`: `August 31, 2026` applications
       open · `September 10, 2026` student assemblies · `September 22, 2026` parent interest
       meeting · `October 2, 2026` applications close (Middle & Upper School) ·
       `October 15, 2026` England roster announced (Middle School) · `October 30, 2026`
       South Africa applications close (Upper School; detail "extended deadline for the
       leadership course and the long-term exchange") · `October 30, 2026` rosters announced.
     - **After acceptance**, note `'2026–27'`: `November 13, 2026` reservation agreements and
       deposits due · `December 10, 2026` parent meeting · `January 22, 2027` paperwork due
       · `March 31, 2027` final payment due · `May 17, 2027` parent meeting.
     - Two events on `October 30, 2026` are fine only if the renderer keys events by more
       than `when`; **check the key in `SignupBody` first** — if it keys by `when`, merge them
       into one event ("South Africa applications close; rosters announced").
     - No amounts, no financial-aid decision rows.
   - **`community`** ("Global Community on Campus"). `stats: []`. intro.strong (GE): by
     welcoming sister-school visitors and creating cross-cultural experiences, Latin brings
     the world to campus. Cells:
     - **Host families** — Latin families host visiting sister-school groups each year, five
       in 2026–27, from Italy, South Africa, Argentina and France (G-SIS27, G-HOST).
     - **Diwali** — a student-led assembly for the Middle and Upper School by the Indian
       Student Alliance, held each year since 2022–23, when Diwali also joined the school
       calendar (N-DIW23, N-DIW25).
     - **Lunar New Year** — programming in all three divisions, organized by students and
       advised by Global Studies and the Office of Diversity, Equity and Inclusion
       (N-LNY26, N-LNY25).
     - **Charlotte's sister cities** — a whole-school World Fair on Charlotte's six sister
       cities at Sunny's Day, spring 2026 (N-SUNNY).
     - **Silk Road Evening** — the Middle School's annual event (GE).
     - **Model UN** — part of the school's on-campus global programming, in the Middle and
       Upper School (GE). The conference detail goes in the `network` ledger, not here.
   - **`start`** ("Global Learning at Each School Level").
     - `framework` — the GE page's four parts: **Travel Opportunities** (exchanges, service
       learning, international athletics and study abroad, for Middle and Upper School) ·
       **Sister Schools** (seven, the cornerstone of travel and exchange) · **Faculty
       Development** (faculty travel abroad, so teachers bring global insight back to the
       classroom; the destinations are listed in `network`) · **On-Campus Programming**
       (sister-school visitors and cross-cultural experiences).
     - `divisions`:
       - **Lower School · TK–5**: Spanish for every student, TK through 5th grade (LS) ·
         the Passport Program's studies of countries and cultures (GE) · Global Partners, an
         annual deep dive into one country (GE) · Holidays Around the World (LS).
       - **Middle School · 6–8**: `'**Global Studies travel opens in 6th grade**, for summer
         programs'` (G-FAQ) · grade-level class trips to Atlanta, Québec and Washington,
         D.C., beginning in 6th grade (MS) · French, Spanish and Latin, including French I,
         Spanish I and Latin I (MS) · History 6 on the ancient civilizations of the Middle
         East, Africa, China, India and Europe (MS) · the annual Silk Road Evening (GE).
       - **Upper School · 9–12**: three credits in one world language, plus World History I
         and II (CO) · AP Comparative Government and AP European History (CO) · Cultural and
         Comparative Leadership, a credit-bearing elective taught in South Africa (G-SAL) ·
         a semester or year away through School Year Abroad or an approved semester school,
         preferably in the spring of junior year (G-EXT, G-PROG).
     - No `languages` block.
   - **`network`** (title from the override: "School Year Abroad & the Wider Network").
     - intro.strong: Latin belongs to no global-schools network like Round Square. Its wider
       network is School Year Abroad, where it is a member school, plus the programs and
       educators' groups it travels with. intro.muted: travel also includes international
       athletic competition and study abroad (GE).
     - `ledgerTitle: 'Model UN conferences'`.
     - `conferences`, one row per school year, as pure-figure `year`s:
       - `2024–25`: the Middle School Model UN conference at Appalachian State; five
         delegates, two named Best Delegates (N-MSMUN).
       - `2015–16`: Harvard Model UN in Boston; 14 Upper School students represented
         Lithuania (N-HMUN).
       - Add a `2022–23` row only if step 2 fetched the "2023 Middle School Model United
         Nations" post and it gives a count.
     - `cells`:
       - **School Year Abroad**: Latin is now a member school. Its students get preferred
         admission and priority for need-based aid at SYA's campuses in Rennes, Viterbo and
         Zaragoza (G-EXT).
       - **Semester schools**: a school-approved list (Alzar School, High Mountain
         Institute, The Island School, The Mountain School, the School for Ethics and Global
         Leadership, The Outdoor Academy), with SYA and semester-school campus visits each
         fall (G-EXT, G-HOME).
       - **Independent Schools Cultural Alliance**: Latin's Middle School England program
         runs with ISCA, alongside students from schools around the world (G-ENG).
     - `rows`:
       - **Faculty who travel**: recent faculty travel includes AP training in Seville, a
         language-acquisition workshop in Agen, a Lower School visit to the Argentine sister
         school, the World Leadership School educator program in Peru, the Lapland
         International Forum for Education in Finland, and a presentation at the Institute
         for Global Learning Conference in Canada (GE).
       - **Educators' conferences**: in spring 2022, faculty and staff attended the Global
         Education Benchmark Group's Global Educators Conference in San Diego, and two Lower
         School teachers presented (N-GEBG). **Do not claim GEBG membership**; the school
         does not state it.
     - sources: G-EXT, G-PROG, G-HOME, G-ENG, GE, N-GEBG, N-MSMUN, N-HMUN.
   - **`milestones`** ("Firsts & Milestones"), oldest first, `year` pure figures, claimed
     firsts worded "per the school" in their narrowest supported form:
     - `1989` Germany — the first sister school, Jugenddorf Christophorusschule (GE)
     - `1996` France — Sainte Marie Grand LeBrun (GE)
     - `1998` Argentina — Colegio Carmen Arriola de Marin (GE)
     - `2002` Italy — Istituto Bertrand Russell (GE)
     - `2006` China — Luzhou Laojiao Tianfu Middle School (GE)
     - `2008` South Africa — Hilton College and St. Anne's Diocesan College (GE)
     - `2022–23` Diwali — the first annual Diwali assembly, and Diwali on the school calendar
       (N-DIW23)
     - `2025` A trip for credit — South Africa, the first Latin trip students could earn
       academic credit for, per the school (N-GLOBAL)
     - `2025` Québec — a new Middle School trip, 22 students (N-GLOBAL)
     - `2025` Without a tour company — France and Italy planned by the school itself
       (N-GLOBAL)
     - `2027` Eight programs — six for Upper School and two for Middle School (G-PROG)

     Headline: e.g. "From a first sister school in 1989 to eight summer programs in 2027."
   - **`verdict`.**
     - `standsOut.summary`: Latin stands out for the depth of its sister-school network —
       seven partners since 1989, with homestays both ways and reciprocal hosting — and for
       publishing how travel works: eligibility, selection, a sign-up calendar and its safety
       provider.
     - points (~4): seven sister schools on four continents, the oldest from 1989 · a
       credit-bearing leadership course taught in South Africa · a School Year Abroad member
       school · trip leaders trained in first aid, CPR and risk management, with International
       SOS emergency, medical and evacuation cover (G-FAQ).
     - `ask` (~10):
       - **2025–26 trips.** Did Germany, Argentina, New Mexico and Belgium & the Netherlands
         run? Only South Africa is documented.
       - **Costa Rica and Yellowstone.** The Global Education page lists them; are they
         still offered, and when?
       - **Québec class trip.** Which grade's class trip goes to Québec, and how does it
         differ from the elective Montreal and Québec City program?
       - **China.** Is the 2006 sister school in Luzhou still active?
       - **Germany.** Will the Bad Zwesten exchange return after 2025–26?
       - **Aid.** How does the Plus Fund — which helps families on substantial aid with costs
         beyond tuition, including travel — apply to a trip, and how is it requested? (AG)
       - **Chaperones.** How many trip leaders travel with each group?
       - **Scale.** How many students travel each year?
       - **Credential.** Is a global certificate or distinction planned?
       - **Lower School.** Is any travel or exchange planned before 6th grade?
     - sources: GE, G-PROG, G-FAQ, AG, MS, WB-GAPP-2510.

4. **Register — `src/data/internationalTravel.ts`.**
   - Import `charlotteLatin` from `./internationalTravel/charlotte-latin.ts` and add
     `'charlotte-latin': charlotteLatin` to `PROGRAMS`.
   - Add `'charlotte-latin': { network: 'School Year Abroad & the Wider Network' }` to
     `TITLE_OVERRIDES`.
   - Update the "Per-school entries" comment ("Providence Day and Charlotte Country Day are
     researched" → three schools).
   - No type or registry change.
   - **Chrome, `src/locales/en.json`:** add
     `"international-travel.network@charlotte-latin": "School Year Abroad & the Wider Network"`
     beside `network@charlotte-country-day`. Do not touch the other nine catalogs in Phase 1;
     never run a key-order normalizer over `ar.json`.

5. **README — `src/data/internationalTravel/README.md`.** "Two schools" → three, adding
   Charlotte Latin (`.claude/plans/latinglobal.md`, 2026-10-13). Add Latin's network title
   to the `TITLE_OVERRIDES` examples, and note that a school-run Google Site counts as the
   school's own site for sourcing.

6. **i18n classification.** `node scripts/i18n_extract.mjs --report --residual` — no new
   field paths are expected (every path exists from Country Day). If anything is reported
   under international-travel, classify it in `scripts/i18n_fields.mjs`; it must reach 0.

7. **Regenerate and check.**
   - `npm run schema && npm run check:schema` — "Schools with data: 3/12" (or the current
     roster count).
   - `npx tsc -b` (**not** `--noEmit`).
   - `npm run build` — every gate must pass, including `check:seo` (Latin's meta description
     gains "global exposure" and must stay ≤160 chars; if it overflows, see
     `src/lib/head.ts` and record the fix) and `check:photos`. `check:live` should pass: no
     shipped prose changes.
   - The greps and browser checks under Verification → Phase 1.

8. **Commit Phase 1** on `feat/latinglobal`. Stage explicit paths only (`git status --short`
   first): the data file, `internationalTravel.ts`, `src/locales/en.json`, the README, any photos, the ingest
   outputs, `DATA-SCHEMA.md`, the Source URLs file, this plan and `INDEX.md`. Push; verify
   `git rev-parse HEAD` against `git ls-remote origin feat/latinglobal`. Set this plan to
   `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review. No PR is opened
in Phase 1.** Tell the user to run `npm run dev` and open `/school/charlotte-latin/` (every
card open, desktop and 390px). Ask specifically about: the lead line and the four tiles; the
2025–26 "as offered" labelling; the South Africa exchange homestay wording; the community
cells with no stat strip; the Network card's title and its two-row Model UN ledger. Nothing below runs until they confirm the English.

### Phase 2 — Every other locale

Two layers. Re-read both lists first; they can grow.

0. **UI chrome → the nine non-`en` catalogs in `TRANSLATED`** (`src/lib/i18n.ts`, currently
   `es bn ht te fr fa it hi ar`). Add and translate
   `cards.international-travel.network@charlotte-latin`. "School Year Abroad" stays in Latin
   script as a program name, as Country Day's network title keeps "Model UN" and
   "WorldQuest". Do not normalize key order in `ar.json`.

Then research prose, per `PROSE_TRANSLATED` (mechanism:
`.claude/docs/prose-translation-architecture.md` and ccdglobal's Phase 2):

1. **Splice, never re-extract:**
   `node scripts/i18n_splice_work.mjs --lang <code> --topic international-travel` per locale.
   Providence Day's and Country Day's dropped-stamp count must be **0**; a non-zero drop
   means a misconfigured extract.
2. **Translate** Latin's new strings per locale, keyed by stamp or English text, never by
   index. Parallel agents get **one scratch directory each** (memory
   `parallel-locale-agents-collide`). Use each locale's existing Global Exposure renderings
   as the glossary. Standing rules: figures char-for-char (`7`, `1989`, `2026–27`,
   `1998–2027`, `22`, `12`); dates translate, their digits do not (`October 2, 2026`);
   school and program names stay Latin script (Jugenddorf Christophorusschule, Sainte Marie
   Grand LeBrun, Colegio Carmen Arriola de Marin, Istituto Bertrand Russell, Luzhou Laojiao
   Tianfu Middle School, Hilton College, St. Anne's Diocesan College, Centro Mundolengua,
   Independent Schools Cultural Alliance, School Year Abroad, International SOS, Upper
   School, AP); `fa`/`ar` store no bidi isolates; `hi`/`te` never pre-group; run `check:fr`
   for `fr`.
3. **Build:** `node scripts/i18n_build_overlay.mjs --topic international-travel --lang <code>`.
4. **`src/data/overlays/NOTES.md`:** a Charlotte Latin subsection under Global Exposure with
   any soft spots, or "none".
5. **STOP for the user's test — no PR yet.** Commit, push, report the check results, and tell
   the user: `npm run build && npx vite preview`, then `/school/charlotte-latin/?lang=es`,
   plus `fa` and `ar`. End the turn.
6. **Ship, only after the user confirms.** PR via `--body-file`; flip this plan to
   `implemented` with Implementation notes and the INDEX row to `Implemented` with the PR
   link; `gh pr merge --squash --delete-branch`; `git checkout main && git pull`. **Do not
   deploy** — end with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/international-travel/charlotte-latin/*.md` (2) | new (written at planning); Source URLs gains implement-time rows |
| `src/data/schools.json`, `src/content/international-travel/charlotte-latin.json`, `.claude/docs/international-travel/charlotte-latin.md` | generated by ingest |
| `src/data/internationalTravel/charlotte-latin.ts` | new: Latin's data |
| `src/data/internationalTravel.ts` | edit: import + `PROGRAMS` entry + `TITLE_OVERRIDES['charlotte-latin'].network` + comment |
| `src/locales/en.json` | edit: `network@charlotte-latin` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit: `network@charlotte-latin` translated (Phase 2) |
| `src/data/internationalTravel/README.md` | edit: three schools; Latin's network title; Google Site sourcing |
| `public/travel/charlotte-latin-*.jpg` (≤2) | new, if kept |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `scripts/i18n_fields.mjs` | only if the residual report finds a new path |
| `src/data/overlays/international-travel.{9}.json` + work files | spliced + translated (Phase 2) |
| `src/data/overlays/NOTES.md` | edit (Phase 2) |
| `.claude/plans/INDEX.md`, `.claude/plans/latinglobal.md` | status + implementation notes |

## Verification

### Phase 1 — English

- [ ] `node scripts/check_metrics.mjs` — no unmatched subtopic
- [ ] `npx tsc -b` — clean
- [ ] `node scripts/i18n_extract.mjs --report --residual` — 0 unclassified international-travel fields
- [ ] `npm run schema && npm run check:schema` — passes; Latin listed with data
- [ ] `npm run build` — every chained gate passes (`check:seo`, `check:photos`, `check:live`)
- [ ] `grep -n '\$[0-9]' src/data/internationalTravel/charlotte-latin.ts` — **no hits**
- [ ] `grep -nE '(January|February|March|April|May|June|July|August|September|October|November|December) [0-9]' src/data/internationalTravel/charlotte-latin.ts`
      — hits **only** inside `signup`
- [ ] `grep -in "not stated\|not published" src/data/internationalTravel/charlotte-latin.ts` — hits only inside `verdict`
- [ ] Every `sources` URL in the new file is a fetched or Wayback row of the Source URLs file; spot-check five
- [ ] No person is named: grep the file for `Taylor`, `Willis`, `Paridy`, `Clutter`, `Cammer`,
      `Nurkin`, `Gullapalli`, `Wimbish`, `Roth`, `Sinclair` — **no hits**
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright,
      every `<details>` open; memory `headed-chrome-via-playwright`, avoid `networkidle`):
  - `/school/charlotte-latin/`: Global Exposure chip and rail item after Course Offerings;
    lead + 4 tiles (7 / 1989 / 8 / 5) + **8 cards** in this order: Where They Go · Exchanges
    & Homestays · Signing Up for Travel · Global Community on Campus · Global Learning at Each
    School Level · School Year Abroad & the Wider Network · Firsts & Milestones · Verdict &
    Ask the School. No Credential card.
  - The Network card shows the "Model UN conferences" ledger with `2024–25` above `2015–16`.
  - Where They Go: All / Middle School / Upper School tabs; MS shows the England and Québec
    rows (+ 2024–25 and 2022–23 MS rows); Homestay tags only where recorded.
  - Global Community on Campus shows no empty stat strip.
  - Photos (if any) open in the viewer and name nobody; no empty `<figure>`.
  - `/school/providence-day/` (7 cards) and `/school/charlotte-country-day/` (8 cards) unchanged.
- [ ] `npm run audit:mobile` — passes at 320/360/390px
- [ ] Dark mode legible

### Phase 2 — Locales

- [ ] Splice: 0 dropped stamps per locale
- [ ] `npm run check:chrome` — `network@charlotte-latin` present and translated in all ten catalogs; nothing pending
- [ ] `npm run check:runtime && npm run check:live` — all stamps resolve; gate 3 passes
- [ ] `python3 scripts/check_figures.py --topic international-travel --lang <code>` and
      `npm run check:sepdrift -- --lang <code>` for each of the 9 locales
- [ ] `npm run check:dates`, `check:fr`, `check:bidi`, `check:fa`, `check:hi`, `check:script`
- [ ] `node scripts/check_work_integrity.mjs` — on a new-school splice its length assertion
      fails by design (ccdglobal Implementation notes); run its four assertions by stamp
      against `main` instead: 0 lost, 0 mutated, 0 PD/CCD `t` overwritten, 0 empty new entries
- [ ] `npm run i18n:leaks -- --lang <code>`
- [ ] `npm run audit:daterender` and `npm run audit:moneyrender` — nothing new in the section
- [ ] `npm run audit:mobile` at 320px in translated locales
- [ ] Browser check in `es`, `fa` (RTL: `1998–2027`, `2026–27` read correctly) and `hi`, every
      card open, with the Network title translated; plural trip counts in `ar`

## Risks

| Risk | Mitigation |
|---|---|
| The Google Site changes before `/implement` (a program added or dropped) | Step 2 re-fetches the four key pages; the live page wins |
| A name reaches the page from the blogs, the hosting story or the Diwali/LNY posts | Counts only; the surname grep in Verification |
| A price, the $1,000 deposit or an exact travel date creeps in from the detail table | The `$` and month-day greps |
| The 2024–25 / 2022–23 division inference is wrong | It follows GE's own program lists; recorded in Implementation notes; the user reviews at the Phase 1 stop |
| Two `signup` events on one date collide on a React key | Step 3 checks `SignupBody`'s key and merges if needed |
| Latin's meta description passes 160 chars | `check:seo` fails loudly; fix in `src/lib/head.ts` |
| The override key is missing from a catalog, so the title renders in English there | Phase 2 step 0 + `check:chrome` across all ten catalogs |

## Open questions

- **Should `noteByDiv` be used for 2026–27, when both divisions travel in summer 2027?**
  **Default:** omit `noteByDiv`; one `note` covers both.
- **Is a third ledger detail — the 2025–26 Middle School programs — recoverable?** The
  Wayback copy says only "all trips". **Default:** no MS rows for 2025–26.

## Implementation notes

### Phase 1 (English) — 2026-10-13, branch `feat/latinglobal`

Built as planned, with these deviations and recorded inferences:

- **Step 2 re-fetch:** G-PROG, G-DATES, G-SIS27 and GE were unchanged. The 2023 Middle
  School Model UN post (`/~board/news/post/2023-ms-mun`, new key N-MSMUN23) gives a count
  — eight delegates at CHARMUN, Providence Day School, February 2023, with six awards — so
  the Network ledger has a **third row, `2022–23`**, as the plan allowed. Students unnamed.
- **Photos kept:** `summer_25_2.jpg` → `public/travel/charlotte-latin-south-africa-2025.jpg`
  (the summer 2025 South Africa group at the Cape of Good Hope sign) for `trips`, and
  `argentina2.jpg` → `public/travel/charlotte-latin-argentina-exchange.jpg` for
  `exchanges`. Both opened and checked; reasons for the three not kept are in the Source
  URLs file.
- **2025–26 ledger note** reads `'Upper School programs as offered in fall 2025'`, not "in
  October 2025": the plan's month-and-year wording would have tripped its own
  month-day grep (dates only inside `signup`).
- **2025–26 Argentina theme** is `'Sister-school exchange'` (GE says "Sister school
  cultural exchange"); South Africa 2025–26 got `place: 'Cape Town + around Durban'` and
  "a two-and-a-half-week course" from BLOG-SA26.
- **Signup:** `SignupBody` keys events by `name`, so the two October 30, 2026 events stay
  separate. Roster dates render as `'By October 15, 2026'` / `'By October 30, 2026'`
  (G-FAQ: "by", "no later than"). The two parent meetings are named "First" and "Second"
  so their keys differ.
- **Signup intro** says applications are reviewed "by the Global Studies office and senior
  administration" — G-APP's wording; the plan's "and trip leaders" applies only to
  interviews.
- **Network intro** is stated positively ("Latin's wider network is School Year Abroad…")
  and drops "Latin belongs to no global-schools network like Round Square" — an absence
  claim no page makes.
- **Division inference** (recorded per Decisions): 2024–25 and 2022–23 trips take their
  division from GE's program lists — Argentina, France, Italy, South Africa and Spain are
  Upper School; England (ISCA) and Québec are Middle School. N-GLOBAL confirms Canada (MS)
  and South Africa (US) directly.
- **Extra verification rows** in the Source URLs file: CO's world-language and history
  requirements, AG's Plus Fund purpose, and G-APP / G-FAQ's selection and roster dates.
- **Comment fix outside Files touched:** `src/pages/SchoolDetail.tsx` had a comment
  naming only Providence Day and Country Day as researched; it now names Latin too.
  Comment only.
- **Plan typo:** Verification says Providence Day has 7 cards. It has **9** since
  pdcommunity (#346); it is unchanged by this branch.

Verification: `check_metrics` clean for this topic (one pre-existing `sports` unmatched
subtopic, Charlotte Christian); `i18n_extract --report --residual` — every field
classified; `npm run schema && check:schema` — Global Exposure 3/12; `npx tsc -b` clean;
`npm run build` — every chained gate passes (`check:seo` with Latin's meta at 152 chars,
`check:photos`, `check:live`, `check:runtime`, `check:dates`); the `$`, month-day,
"not published" and surname greps return what the plan expects; real-Chrome check (8
cards in order, 4 tiles, 22 trips / 5 MS / 17 US, Network ledger 2024–25 → 2022–23 →
2015–16, no empty community stat strip, photo viewer opens, no overflow at 390px, dark
mode legible; Providence Day 9 and Country Day 8 cards unchanged); `npm run audit:mobile`
— 0 page overflows.

### Phase 2 (locales) — 2026-10-13/14, branch `feat/latinglobal`

Built as planned through step 4. Awaiting the user's browser test (step 5) before the PR.

- **Chrome:** `network@charlotte-latin` added to the nine catalogs by text insertion after
  `network@charlotte-country-day`. Key order is untouched, including `ar.json`.
- **Splice:** 523 kept, 211 added, **0 dropped** per locale.
- **Translation:** nine parallel agents, each with a private scratch directory. Each wrote
  only a stamp → translation map. The maps were applied centrally by `of` stamp, so no
  agent touched the repo.
- **Cross-locale fixes** made after the agents finished:
  - it "Holidays Around the World" was reverted to the English name (8 of 9 keep it).
  - fr "Semester schools" cell label is now translated.
  - es "dos profesoras" became gender-neutral *docentes*.
  - te "World Fair" now follows hi's native phrase + *(World Fair)*.
  - fa/ar "Harvard Model UN · 14 …" was reordered so the figure follows Arabic-script
    text (rule W7, NOTES).
- **Not changed, recorded in NOTES:**
  - `start.framework[].name` renders English, by Country Day's precedent (skipped as a
    proper noun).
  - Two pre-existing fa/ar render sites draw a year range reversed: the trip year-group
    label and a bold Verdict topic. They show on Country Day's page too.

Phase 2 verification:
- splice 0 dropped ×9;
- `check:figures` and `check:sepdrift` clean ×9;
- `check:chrome`, `check:runtime`, `check:live`, `check:dates`, `check:fr`, `check:bidi`,
  `check:fa`, `check:hi` and `check:script` all exit 0;
- `check:work` fails on its length assertion by design. The same assertions were run by
  stamp against `main`: 0 lost / 0 mutated / 0 overwritten / 211 added (all Latin) /
  0 empty / 0 foreign-script / 0 bidi controls, ×9;
- `npm run build` exits 0;
- `audit:daterender` passes in 9 locales and `audit:moneyrender` in es/fr;
- `audit:mobile` passes, including 320px for Latin in es/fa/hi/ar/bn;
- real Chrome, every `<details>` open, es/fa/hi/ar: the 8 Global Exposure cards are
  translated and in order with the Network title translated. In fa, 23 of 25 year ranges
  in the section draw in order (the 2 exceptions are above).
