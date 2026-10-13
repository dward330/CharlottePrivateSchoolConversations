---
name: ccdglobal
title: Add Charlotte Country Day to Global Exposure — six existing cards plus two new shared cards (Global Community on Campus, Firsts & Milestones), credential omitted
status: english-done
phases: 2
created: 2026-10-12
branch: feat/ccdglobal
prs: []
---

# Charlotte Country Day — Global Exposure

## Goal

Give Charlotte Country Day a **Global Exposure** section (slug `international-travel`),
the second school after Providence Day. Providence Day is the template: same lead line,
stat strip and card contract. The section also goes beyond it with **two new optional
cards** shared by every school: **Global Community on Campus** and **Firsts &
Milestones**. Country Day publishes no global diploma, so its **Credential card is
omitted**.

It works when `/school/charlotte-country-day/` renders the section after Course Offerings
with eight cards in registry order, every fact cites a live charlottecountryday.org page
(or a Wayback copy of one), no student is named, no trip price or exact travel date is
rendered, and Providence Day's section is unchanged apart from the three chrome label
edits listed under Decisions.

## Context

**The area today.** Global Exposure shipped in PR #338 (`.claude/plans/intltravel.md`) and
was extended by PR #341 (`.claude/plans/pdtrips2027.md`). Read both before step 1,
particularly their Implementation notes, which record user corrections that apply here.
- Types, card registry, `TITLE_OVERRIDES`, `PROGRAMS`, overlay loader:
  `src/data/internationalTravel.ts`.
- Providence Day's data: `src/data/internationalTravel/providence-day.ts` (669 lines). This
  is the model for the new file's shape, tone and source-label style.
- Data rules: `src/data/internationalTravel/README.md`. **Read it first**: a URL for every
  fact, quote marks only where meaningful, gaps only in `verdict.ask`, the most current
  figure marked `~` when the school's pages disagree, no student named, photos optional.
- Renderer: `src/components/InternationalTravel.tsx`. It has one body component per card
  and an explicit `switch` dispatcher at the bottom (`InternationalTravelCardBody`), plus
  local helpers `Lead`, `Heading`, `StatStrip`, `Row` and `Photo`.
- `src/pages/SchoolDetail.tsx` filters `INTERNATIONAL_TRAVEL_CARDS` by
  `itEntry[c.key] != null` (~line 967) and renders each card as a `<details>` whose teaser is
  `travel[card.key]!.headline` (~line 1390). **A new card key therefore renders with no
  SchoolDetail change**, as long as the type, registry entry and dispatcher case exist and
  the card has a `headline`. Confirm this at step 4 rather than assuming it.
- Two gates (README): the data file + `PROGRAMS` entry, **and** a
  `source-material/international-travel/charlotte-country-day/` folder in the manifest.
- `scripts/i18n_topics.mjs:95` already maps `charlotte-country-day` → `charlotteCountryDay`,
  so the export name is fixed.
- `scripts/i18n_fields.mjs:683-741` holds the area's `PATH_OVERRIDES` block. Default leaf
  rules that matter here: `label`, `title`, `text` and `headline` are prose; `name` is
  skipped (proper noun); `year` and stat `value` are skipped (figures).
- `scripts/gen_data_schema.mjs:235` parses the registry from source, so new card keys reach
  `DATA-SCHEMA.md` through `npm run schema`.
- Splicing work files for a new school in an existing topic:
  `scripts/i18n_splice_work.mjs` (pdtrips2027 Phase 2 step 1). **Never re-extract.**

**Three pieces of existing chrome are Providence Day-specific** and would read wrong on
Country Day's page (`src/locales/en.json`):
- `cards.international-travel.signup` = "Signing Up for Travel & GSD" (GSD is PD's diploma)
- `travel.out` = "PD student abroad:"
- `travel.in` = "Partner student at PD:"

**The research.**
- `source-material/international-travel/charlotte-country-day/Charlotte Country Day - International Travel - Deep Research.md`
  is the transcription of the user's 15-page Claude deep-research PDF. It is a lead sheet,
  not a citation.
- `…/Charlotte Country Day - International Travel - Source URLs.md` is **the citation
  record**. Every row says whether the claim was *fetched* live on 2026-10-12, seen only in
  a *Wayback* snapshot, or is *PDF only*. Only fetched or Wayback rows may render. PDF-only
  rows are fetched at implement time or dropped.
- **Planning found more than the PDF did.** The PDF said the Middle School Global
  Experiences page would not load. It loads, and it holds the full 2026–27 Middle School
  program: six experiences, each with grade, group-size cap, selection method, homestay and
  sister school. The detail table in the Source URLs file is the spec for those six trips.
  A March 2024 Wayback copy of the Upper School page confirms the 2023–24 program, including
  a London choir trip the PDF missed and Seville homestays.

## Decisions

- **Providence Day's card contract, mapped as follows.**
  - Country Day: `trips`, `exchanges`, `signup`, `start`, `network`, `community`,
    `milestones`, `verdict`.
  - **No `credential`.** The user chose to omit it (2026-10-12). Under omit-to-hide, the
    card does not render. The IB Diploma goes in the Upper School items of `start` instead.
    "Is a global certificate planned?" becomes a Verdict question.
- **Two new optional card keys, approved by the user on 2026-10-12.**
  - `community` — **"Global Community on Campus"**
  - `milestones` — **"Firsts & Milestones"**

  They are shared, registry-level cards. Providence Day has neither, so they are absent from
  its page until its research supplies them. That is the README's absence-of-data rule;
  never add an empty or placeholder card.
- **Registry order** (the user fixed the first four on 2026-10-11; the new cards go just
  before the Verdict, so the Verdict stays last):
  `trips`, `exchanges`, `signup`, `start`, `credential`, `network`, `community`,
  `milestones`, `verdict`.
- **Widths.** `milestones` joins `WIDE_TRAVEL_CARDS`, because a timeline reads badly
  two-up. `community` stays half-width.
- **New types reuse the existing renderer pieces. No new CSS unless the browser check
  shows a gap.**
  ```ts
  export type CommunityCard = {
    headline: string
    intro: TravelLead
    stats: TravelStat[]                    // small strip, as CredentialCard
    cells: { name: string; text: string }[] // it-grid it-cells, as NetworkCard
    rows?: { label: string; text: string }[]
    sources: Source[]
  }
  export type MilestonesCard = {
    headline: string
    intro: TravelLead
    /** Oldest first. `year` is a figure ("1992", "2020–22"); key rows by year + title. */
    events: { year: string; title: string; text: string }[]
    sources: Source[]
  }
  ```
  - `CommunityBody`: `Lead` → `StatStrip` (`it-stats-sm`) → `it-grid it-cells` →
    optional `it-rows` of `Row` → `SourceRow`.
  - `MilestonesBody`: `Lead` → `it-rows it-block`, one
    `Row label={localizeMoneyText(e.year)} text={`**${e.title}.** ${e.text}`}` per event
    → `SourceRow`. Year ranges must go through `localizeMoneyText()`: the pdtrips2027
    fix found raw ranges rendering `27–2026` in fa/ar.
  - React key: `` `${e.year}-${e.title}` ``, because 1992 has two events.
- **Chrome changes, all three needed by a second school** (en in Phase 1, the other nine
  catalogs in Phase 2):
  - `cards.international-travel.signup` → **"Signing Up for Travel"**.
  - Add `cards.international-travel.signup@providence-day` = "Signing Up for Travel & GSD",
    plus a `providence-day.signup` entry in `TITLE_OVERRIDES`. **In Phase 1, copy each
    locale's existing `signup` translation into the new `@providence-day` key in all nine
    catalogs**, so Providence Day's title never regresses to English. That is a move, not a
    translation.
  - `travel.out` → **"Abroad:"** and `travel.in` → **"Visiting:"**. The partner `out`/`in`
    strings name their own subject ("6th graders, for a week of homestay in winter"). This
    rewords Providence Day's two labels too; check them at the Phase 1 review.
  - New card titles: `cards.international-travel.community`,
    `cards.international-travel.milestones`.
  - Country Day override: `cards.international-travel.network@charlotte-country-day` =
    **"Model UN, WorldQuest & Charlotte's Global Partners"**, plus a
    `'charlotte-country-day': { network: … }` entry in `TITLE_OVERRIDES`. Country Day has no
    Round Square or similar membership; its network is competitions and Charlotte civic
    partners.
- **Privacy, from the pdtrips2027 review (memory `no-trip-costs-or-travel-dates-on-page`).**
  - **No trip price, deposit or airfare** is rendered. Country Day publishes Middle School
    prices; they stay in the Source URLs file only.
  - **No exact travel dates.** Use season and year ("winter 2027", "spring break 2027",
    "summer 2027"). Registration and application deadlines may render.
  - **No student, parent or trip leader is named.** Staff may be named only when the page
    needs it, which it does not, so name nobody but the school.
  - **No financial-aid award or decision rows** in Signing Up. The user removed PD's.
- **Stat values are pure figures.** A word inside a tile `value` renders English in every
  locale (`'1 yr'`, `'5:30 PM'` are still open defects). Lead stat strip, all from the IS
  page or `MS`:
  - `27` · countries · "visited by students on Country Day trips since 2015"
  - `6` · Middle School experiences · "in 2026–27, from 6th grade"
  - `11` · exchange partnerships · "incl. Rotary, AFS-YES, Kennedy-Lugar YES and sister schools in Canada, Peru and the UK"
  - `1988` · International Studies founded · "the first comprehensive program in Charlotte, per the school"
- **Network conferences ledger, one row per school year.** `year` is a skipped figure field,
  so "Nov 2025" would leak English, and `Row` is keyed by `year`, so two rows in one year
  would collide. Join conferences within a year with " · ", as Providence Day's `2024–25`
  row does.
- **Exchange partner `years` is a skipped figure field**, so it holds a figure span only
  (`'1991–2027'`), never "since 1991". The "since" wording goes in `out`/`in` or the intro.
- **Sister-school names follow the current page.**
  - **King Edward VI School** (MS-GE).
  - **Externat Saint-Coeur de Marie**.
  - **Prescott School, Arequipa**: MS-GE wording. Its spellings vary; see the Source URLs
    file.
  - **Jinrui School**: the 2027 page spelling. Jinrui is not in the school's current
    partner list, so it appears under exchange **visitors** and the China trip, not as a
    partner tile.
- **The 2025–26 Upper School trips (France, Ecuador, South Korea) render only if verified.**
  They are PDF-only: the live page dropped them, and Wayback has no 2025–26 capture. Step 2
  tries once. If nothing confirms them, the ledger skips 2025–26, and "Did the 2026 trips
  run?" becomes a Verdict question.
- **2023–24 is labelled as scheduled, not run.** Its source is the March 2024 page, with
  "tentative" dates. Use the year-group `note`: "as scheduled in March 2024".
- **One quote may render, unattributed.** The England-exchange reflection from N-FAM ("This
  exchange gave us the opportunity…"). Optional, and only if a card has a natural slot.
  Neither `community` nor `exchanges` has a quote field, so the default is to leave it in
  research.
- **No Compare change.** The area stays in `COMPARE_DEFERRED_TOPICS`.

## Approvals needed

**None outstanding.**
- The two new cards (`community`, `milestones`) and omitting `credential` were approved
  by the user on 2026-10-12, in the `/plan ccdglobal` conversation.
- The chrome rewording (`signup`, `travel.out`, `travel.in`) and the Country Day network
  title are wording inside that approved scope. The user reviews them at the Phase 1 stop.

`npm run deploy` is **not** part of this plan. Merging is not publishing.

## Source material

Written during planning, **uncommitted**, and ingested by `/implement` in step 1:

- `source-material/international-travel/charlotte-country-day/Charlotte Country Day - International Travel - Deep Research.md`:
  the PDF transcription. Students go unnamed; costs and exact dates are recorded.
- `source-material/international-travel/charlotte-country-day/Charlotte Country Day - International Travel - Source URLs.md`:
  the per-fact citation record. It includes the full Middle School 2026–27 detail table,
  the "Not verified" list and the spelling conflicts.

The PDF itself is not on disk. It was attached to the planning conversation, and the `.md`
transcription is the committed record.

## Out of scope

- A Credential card for Country Day (user decision).
- Back-filling `community` or `milestones` for Providence Day. That needs its own research
  pass; the cards stay absent there.
- Compare rows, `VALUE_METRICS`, or a home-grid cell.
- Rendering IB pass rates, Seal of Biliteracy counts or Cox Global Citizenship Award
  recipients. They are PDF-only tallies and close to student-level.
- The International Parents Group board chair, trip leaders, staff phone numbers or emails.
- A podcast episode.
- `npm run deploy`, and the news Worker.

## Steps

### Phase 1 — English

1. **Branch, commit and ingest the source files.**
   - `git checkout main && git pull && git checkout -b feat/ccdglobal`.
   - `git add` the two source-material files above **by explicit path** and commit.
   - Run the `ingest-source-material` skill for `international-travel`:
     - `python .claude/skills/ingest-source-material/build_docs.py international-travel`
     - `python scripts/build_site_content.py`
     - `node scripts/check_metrics.mjs`

     The catch-all `RULES['international-travel']` covers any subtopic, so check_metrics
     stays clean.
   - Run `git status --short` and **commit only the paths this topic changed**. A full
     rebuild can sweep other topics (memory `ingest-full-rebuild-sweeps-topics`).

2. **Close the verification gaps, then update the Source URLs file.** Work through its
   "Not verified at planning" table:
   - **Lower School grade span.** Fetch https://www.charlottecountryday.org/cd-education/lower-school
     and confirm "JK–4" before rendering it.
   - **2025–26 Upper School trips.** One search (school news, parent presentation). If
     unconfirmed, drop them (Decisions).
   - **Taste of Cultures posts** (Lebanon, Latin): fetch both; they are linked from IS.
   - **Nov 2024 VAMUN post**: fetch. If it is live, add the 2024–25 row detail.
   - **IB 1992 and MS-exchange 1993 history tiles**: copy their item URLs from the HIST
     page's links.
   - **Photos.** Download
     - `M_Canada2.jpg` ("Students in Quebec", IS) to
       `public/travel/charlotte-country-day-quebec-exchange.jpg`
     - `Southampton_2.jpg` ("Southampton Exchange", MS-GE) to
       `public/travel/charlotte-country-day-southampton-exchange.jpg`

     Use the `t_image_size_4` URLs in the Source URLs file. **Open each image** and confirm
     that no name is visible in it (a jersey, a sign, a caption burned into the image). Drop
     any image that shows one.

   Record every result in the Source URLs file under an "Implement-time verification"
   heading. Drop any fact that is still PDF-only.

3. **Types, registry and overrides — `src/data/internationalTravel.ts`.**
   - Add `CommunityCard` and `MilestonesCard` exactly as in Decisions.
   - Add `community?: CommunityCard` and `milestones?: MilestonesCard` to
     `InternationalTravelProgram`.
   - Registry: insert `{ key: 'community', title: 'Global Community on Campus' }` and
     `{ key: 'milestones', title: 'Firsts & Milestones' }` after `network`, before
     `verdict`. Widen the `satisfies` key union to match. Change the `signup` fallback title
     to `'Signing Up for Travel'`.
   - Add `'milestones'` to `WIDE_TRAVEL_CARDS`.
   - `TITLE_OVERRIDES`: add `signup: 'Signing Up for Travel & GSD'` under `providence-day`,
     and add `'charlotte-country-day': { network: "Model UN, WorldQuest & Charlotte's Global Partners" }`.
   - Import `charlotteCountryDay` from `./internationalTravel/charlotte-country-day.ts` and
     add it to `PROGRAMS`.
   - Update the file's header comment ("seven cards" → the new count) and the "Only
     Providence Day is researched" comment.

4. **Renderer — `src/components/InternationalTravel.tsx`.**
   - Add `CommunityBody` and `MilestonesBody` as specified in Decisions, using the existing
     helpers only.
   - Add `case 'community'` and `case 'milestones'` to `InternationalTravelCardBody`.
   - Grep `src/pages/SchoolDetail.tsx` for any hard-coded travel key list (the
     `cardCount` ternary ~942-960, `itCards`) and confirm the new keys flow through
     `INTERNATIONAL_TRAVEL_CARDS` alone. If one does not, extend it and note that in
     Implementation notes.

5. **Country Day data — new `src/data/internationalTravel/charlotte-country-day.ts`**,
   exporting `charlotteCountryDay: InternationalTravelProgram`.
   - Follow `providence-day.ts`'s layout:
     - URL constants at the top, using the Source URLs keys (IS, US-GE, MS-GE, MS, HIST and
       its item URLs, ENDOW, OFF, IPG, N-2023, N-FAM, N-5MS, N-2020, N-LNY, N-SHAPE, the
       Model UN posts, WB-US-2024);
     - a header comment naming the Source URLs file as the record;
     - source labels as `'charlottecountryday.org — <page>'`.
   - **Every fact must trace to a fetched or Wayback row.** The content per card:

   - **`lead`.**
     - strong: travel from 6th grade, run by an Office of International Studies the school
       dates to 1988; sister-school exchanges with homestays in Québec City, Arequipa and
       Southampton; faculty-led Upper School trips over spring break and summer.
     - muted: the school counts 27 countries visited by students since 2015, on six
       continents.
   - **`stats`**: the four tiles in Decisions.
   - **`trips`** (wide; division tabs appear automatically, since MS and US are both
     present). Year groups, newest first:
     - **`2026–27`**, note `'Middle School in winter and spring 2027; Upper School over spring break and in summer 2027'`.
       - The six MS experiences, from the detail table:
         - Québec (6th grade · usually up to 12 · homestay Québec City · French immersion, preference to French students)
         - Peru (7th grade Spanish · usually 10–12 · homestay Arequipa)
         - France (see the grade conflict below · up to 15, lottery if needed · Limoges, Charlotte's sister city, the Loire Valley and Normandy's D-Day sites)
         - Southampton (8th grade · 8–10 · competitive, with a project proposal and an interview · homestay · creative arts)
         - Costa Rica (8th grade Spanish · up to 10 · homestay Monteverde · morning language lessons)
         - Italy (8th grade · up to 15, lottery if needed · preference to Latin students · Roman sites, Pompeii and Herculaneum)
       - The four US trips:
         - Rwanda: spring break 2027 · priority to French students, open to all ·
           reconciliation after the 1994 Genocide against the Tutsi · environment ·
           Francophone identity
         - Greece: spring break 2027 · priority to Latin students · ancient sites ·
           migration in Europe since 1995 · Greece–Turkey relations
         - China: spring break 2027 · priority to Chinese students · Silk Road, Dunhuang to
           Xi'an · students at Jinrui School in Shanghai
         - Argentina: **summer 2027** · priority to Spanish students · exchange with
           Argentine students · a service-learning project in Paraná · Iguazú
       - `timing` holds the season only.
       - Language priority goes in `theme`, not `group`. `group` is size or grade as the
         source states it.
       - **France grade:** the heading says "7th & 8th Grade" and the eligibility text
         says "8th grade student at the time of the experience". Render `group` as
         `'grade 8 · up to 15'`, and put the conflict in a Verdict question.
     - **`2025–26`**: only the trips step 2 verified. Otherwise omit the group.
     - **`2023–24`**, note `'as scheduled in March 2024'`: Oman & UAE (grades 9–12) ·
       London choir with Voces8 (choir students, grades 9–11) · Japan · New Zealand (Māori
       culture and the environment) · Spain (`homestay: 'Seville'`, Honors Spanish II or
       higher) · Sweden & Denmark (design and sustainability). Source: WB-US-2024.
     - **`2022–23`**, note `'summer 2023, the first summer trips since 2019'`: Italy Arts
       (Florence + Cortona; offered every two years) · Iceland (sustainability and
       environmental science) · Spain & Morocco (Spanish immersion) · Poland, Germany and
       France (Charlotte's sister cities Wrocław, Krefeld and Limoges). Source: N-2023.
     - **`alsoOnRecord`**:
       - 2015: the state's first school to send students to Cuba (HIST);
       - since 1993, more than 800 Middle School students have traveled, 65 of them in
         2018–19 (N-5MS);
       - November 2019: 12 Middle School students in Arequipa, including a visit to the
         mayor (N-2020);
       - 2020–22: travel paused (N-2020).
     - **`photo`**: the Southampton image (if step 2 kept it).
       - alt: `'Country Day Middle School students on the Southampton sister-school exchange'`
       - `credit: 'Photo: Charlotte Country Day School'`
     - **`headline`**: count the rendered trips and state the count ("N trips and exchanges
       across 2022–23 to 2026–27…"), ending "Filter by division." as Providence Day's does.
   - **`exchanges`.**
     - Partners: three tiles.
       - Canada · `'2017–2027'` · `'Externat Saint-Coeur de Marie, Québec City'` ·
         out `'6th graders, for a week of homestay in winter'` ·
         in `'Québec students visit in spring'`.
       - England · `'1991–2027'` · `'King Edward VI School, Southampton'` ·
         out `'8th graders, with a creative-arts project'` ·
         in `'KES students visit in the fall'`.
       - Peru · `'2019–2027'` (first documented visit, November 2019) ·
         `'Prescott School, Arequipa'` · out `'7th-grade Spanish students, in spring'` ·
         in `'Prescott students visit in January'`.
     - Intro: the IS wording on two-week exchanges with homestays, sightseeing and some
       classes, plus the school's sister-school partnerships since 1992.
     - `homestays`: Québec City, Arequipa, Southampton (the exchanges); Monteverde, Costa
       Rica (the 8th-grade Spanish trip); Seville (the 2024 Spain trip). One complete
       sentence each.
     - `visitors`:
       - Jinrui School students spent a week at the Middle School in early 2025 (N-LNY);
       - the 11 exchange partnerships include Rotary, AFS-YES and the State Department's
         Kennedy-Lugar YES program (IS);
       - families can host for a few days, weeks or a semester (IPG).
     - `photo`: the Québec image (if kept), with credit.
   - **`signup`** (title from the generic key, "Signing Up for Travel"). `footnote: false`,
     because these dates come from the Global Experiences pages, not a calendar.
     - **Upper School · 2027 trips**, note `'2026 cycle'`: four rows, each with
       `audience: 'Upper School'`:
       - `August 24, 2026` · Student Assembly
       - `September 1, 2026` · Parent & Student Info Meeting
       - `September 1–25, 2026` · Trip applications and financial aid applications due
       - `October 2–16, 2026` · Registration
     - **Middle School · 2026–27 experiences**, note `'2026–27'`:
       - `April 20, 2026` · Applications and Global Programs Financial Aid Application due —
         Québec, France, Southampton, Costa Rica and Italy
       - `August 30, 2026` · Peru application and financial aid application due
     - intro:
       - Trip aid requires a Parents' Financial Statement on file with Admissions, plus the
         Global Programs Financial Aid Application.
       - Upper School trips give priority to students of the matching language.
       - Southampton selects by project proposal and interview; France and Italy use a
         lottery if oversubscribed.
     - **No** decision/award rows and **no** deposit amounts.
   - **`start`** ("Global Learning at Each School Level"):
     - `framework`: the four pillars with short texts from IS:
       - International Travel Experiences
       - Sister School Exchanges
       - Connecting Curriculum
       - Global-Minded Faculty
     - `divisions`, no `theme` (the school publishes none):
       - **Lower School** (grades per step 2): students in all three divisions discuss the
         world beyond our borders (IS); a third-grade global studies unit (N-2020);
         4th-grade leaders open the Lunar New Year celebration (N-LNY).
       - **Middle School · 5–8**: `'**Travel begins in 6th grade:** six experiences in 2026–27'`;
         French, Spanish and Latin (MS); foreign soil samples in environmental science (IS);
         Model UN and Global Action Team (IS).
       - **Upper School · 9–12**: faculty-led trips over spring break and summer, and about
         two weeks at partner schools, usually in June (OFF); AP Comparative Government,
         World Religions and International Relations (IS); the IB Diploma, which Country
         Day was the first NC school to offer, in 1992 (HIST/IS); a semester away through
         School Year Abroad, Alzar School or Maine Coast Semester (OFF).
     - **No `languages` block**: no grade-by-grade sequence is published, so it becomes a
       Verdict question.
   - **`network`** (override title).
     - intro: no global-school network membership is published; the program leans on
       competitions and Charlotte's own global institutions, "Global starts Local" (the
       director's phrase, IS; quote it as the program's motto).
     - `ledgerTitle: 'Model UN conferences'`.
     - `conferences`:
       - `2025–26`: hosted CHARMUN in September · VAMUN at UVA, 10 delegates, a Best
         Delegate award and a commendation · MUNCH at UNC-Chapel Hill, 20 students
       - `2024–25`: MUNCH, 17 students, six awards (+ the Nov 2024 VAMUN row if step 2
         verified it)
     - `cells`:
       - **Academic WorldQuest**: first place nearly every year; 23 wins across
         WorldQuest, Euro Challenge and Model UN conferences
       - **Charlotte's sister cities**: Arequipa, Limoges, Krefeld and Wrocław, with
         trips and forums
       - **Community partners**: the World Affairs Council of Charlotte, International
         House and members of the North Carolina diplomatic corps
     - `rows`:
       - **Faculty who travel**: grants, sabbaticals and international research grants;
         the J. R. Williams Fellowship funds international travel for a teacher after five
         years at Country Day (ENDOW); in 2007, NC's first full teacher exchange with China
         (HIST)
       - **Semester programs**: Country Day is one of fourteen member schools of Maine
         Coast Semester; credit for approved programs, GPA unaffected (OFF)
   - **`community`** ("Global Community on Campus").
     - intro: IS, "Country Day is home to families and students who represent a wide range
       of cultures and nationalities…".
     - `stats`:
       - `57` · parent nationalities
       - `20` · languages spoken by faculty · "100+ teachers speak a second language"
       - `1982` · English as a Second Language · "the first area independent school to offer it"
     - `cells`:
       - **English as a Second Language**: the first and only NC independent school with a
         full-time ESL program (IS); 75 international students in its first two years (HIST)
       - **International Parents Group**: welcomes new international families; the Big
         Saturday International Food Hall with dishes from more than 20 countries; a fall
         dinner of around 80 (IPG)
       - **Visiting diplomats**: lunches with the ambassadors of Myanmar, Finland, Jamaica,
         the Czech Republic, Germany and Cape Verde (IS)
       - **Cultural celebrations**: Lunar New Year with over 1,000 handmade dumplings, and
         Taste of Cultures (N-LNY, plus the Taste of Cultures posts if step 2 fetched them)
       - **Global clubs**: Model UN, Interact, the International Studies Board, World Quest
         and Euro Challenge (IS)
   - **`milestones`** ("Firsts & Milestones"), oldest first, each from HIST/ENDOW/MS-GE:
     - 1977 · the Mildred Dalton Cox Endowment for International Studies, which funds
       students who could not otherwise take part (ENDOW)
     - 1982 · ESL arrives (HIST)
     - 1988 · the first International Studies program in Charlotte (HIST)
     - 1991 · the King Edward VI School exchange begins (MS-GE)
     - 1992 · sister schools in France and Germany (HIST)
     - 1992 · the first NC school to offer the IB Diploma (HIST)
     - 1993 · Middle School sister-school exchanges begin (HIST)
     - 1997 · the J. R. Williams faculty travel fellowship (ENDOW)
     - 2007 · NC's first full teacher exchange with China (HIST)
     - 2015 · the first NC school to take students to Cuba (HIST)
     - 2017 · the Externat Saint-Coeur de Marie exchange begins (MS-GE)
     - 2020–22 · travel paused; summer 2023 brings the first summer trips since 2019
       (N-2020, N-2023)
     - 2027 · four Upper School trips and six Middle School experiences planned (US-GE, MS-GE)

     The headline is a one-line framing, e.g. "Nearly fifty years of global firsts, from a
     1977 travel-aid fund to a 2027 program of ten trips and exchanges."
   - **`verdict`**.
     - `standsOut.summary`: Country Day stands out for how early and how concretely travel
       begins, with six published Middle School experiences from 6th grade, and for
       sister-school exchanges running since 1991.
     - Points:
       - 6th-grade start, with grade, group size and selection published for every Middle
         School trip
       - three sister schools with homestays both ways
       - a run of state firsts: 1988, 1992, 2007, 2015
       - a global community on campus: 57 parent nationalities and full-time ESL
     - `ask`, about 9 entries:
       - **Upper School prices**: the 2027 Upper School prices aren't published; what does
         a trip cost and include? Mention that the Middle School pages list theirs, without
         quoting a figure.
       - **Aid**: how much does the Cox fund award a year? Does tuition aid extend to trips?
       - **Selection**: beyond language priority, how are Upper School places decided?
       - **Safety**: vendors, insurance, chaperone ratios. The director reviews travel
         partners in person (N-SHAPE), but no protocol is published.
       - **2026 trips**: did the 2025–26 Upper School trips run? (Only if step 2 dropped
         them.)
       - **France grade**: is the Middle School France trip open to 7th graders?
       - **Jinrui**: is the Shanghai school a formal sister school?
       - **Hosting**: must exchange families host in return?
       - **Lower School and languages**: what global and language curriculum runs before
         Middle School, and is there a published language sequence?
       - **Credential**: is a global certificate or diploma planned?
       - **Scale**: how many students travel each year? The last published figure is 65
         Middle School students, in 2018–19.

6. **Chrome — `src/locales/en.json`** (Phase 1), as listed in Decisions:
   - `signup` retitle;
   - `signup@providence-day`;
   - `community` and `milestones` titles;
   - `network@charlotte-country-day`;
   - `travel.out` / `travel.in`.

   Then the **move**: in each of the nine other catalogs, add
   `cards.international-travel.signup@providence-day` with that locale's **current**
   `cards.international-travel.signup` value. Leave the generic key's old translation in
   place until Phase 2. `check:chrome` reports the changed keys as pending, which is
   expected.
   - Do not run a key-order normalizer over `ar.json`.

7. **i18n field classification — `scripts/i18n_fields.mjs`**, in the international-travel
   block:
   - `['community.cells[].name', true]` — `name` is skipped by default, and "Global clubs"
     is prose. This is the same reason as the existing `network.cells[].name`.
   - `['milestones.events[].year', false]` — explicit, a figure.
   - Run `node scripts/i18n_extract.mjs --report --residual` and classify anything it
     reports under international-travel. It must reach 0.

8. **README — `src/data/internationalTravel/README.md`.**
   - "Providence Day is the only occupant" → two schools.
   - Document the two new optional cards and the rule that no school ships them empty.
   - Note that the Credential card is omitted where no global credential exists, citing
     Country Day.
   - Record the season-only travel timing and no-price rules (they currently live only in
     memory).

9. **Regenerate and check.**
   - `npm run schema && npm run check:schema`: DATA-SCHEMA lists `community` and
     `milestones`, and "Schools with data: 2/12".
   - `npx tsc -b`. **Not** `--noEmit`.
   - `npm run build`. Expect `check:live` to fail on the new and changed English until
     Phase 2 (pdtrips2027 recorded the same). Every other gate must pass, including
     `check:seo`: Country Day's meta description gains "global exposure" and must stay
     ≤160 characters.
   - The greps and browser checks under Verification → Phase 1.

10. **Commit Phase 1** on `feat/ccdglobal`.
    - Stage explicit paths only: the data file, `internationalTravel.ts`, the component,
      the README, the 10 catalogs, `i18n_fields.mjs`, the two photos, the ingest outputs and
      DATA-SCHEMA.
    - Push, then verify with `git rev-parse HEAD` against
      `git ls-remote origin feat/ccdglobal`.
    - Set this plan to `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review. No PR is opened
in Phase 1.** Tell the user to run `npm run dev` and open:
- `/school/charlotte-country-day/` — the full section, every card open, desktop and 390px;
- `/school/providence-day/` — confirm the only changes are the "Abroad:" and "Visiting:"
  labels; the "Signing Up for Travel & GSD" title should be unchanged.

Ask specifically about:
- the Country Day network title;
- the Firsts & Milestones wording;
- whether the "Abroad:" and "Visiting:" labels read well on both schools.

Nothing below runs until they confirm the English.

### Phase 2 — Every other locale

Two layers, two mechanisms. Re-read both lists first; they can grow.

1. **UI chrome → the nine non-`en` catalogs in `TRANSLATED`** (`src/lib/i18n.ts`,
   currently `es bn ht te fr fa it hi ar`). Translate:
   - `cards.international-travel.signup` (new generic wording);
   - `.community`, `.milestones`, `.network@charlotte-country-day`;
   - `travel.out`, `travel.in`.

   `@providence-day` was moved in Phase 1; leave it alone. Do not normalize key order in
   `ar.json`.
2. **Research prose → overlay layer, per `PROSE_TRANSLATED`.**
   - **Splice, never re-extract:**
     `node scripts/i18n_splice_work.mjs --lang <code> --topic international-travel` for
     each locale. It keeps Providence Day's translations by stamp and adds Country Day's
     English as `t: ''`. Providence Day's dropped-stamp count should be **0**: no
     Providence Day prose changes in this plan. A non-zero drop means a misconfigured
     extract.
   - Translate per locale, keyed by stamp or English text, never by index. Run parallel
     agents with **one scratch directory each** (memory `parallel-locale-agents-collide`).
     Reuse each locale's existing Global Exposure renderings ("homestay", "Upper School",
     "spring break") from its `international-travel.<lang>.json` work file as the glossary.
   - Standing rules:
     - figures char-for-char: `27`, `1988`, `2026–27`, `1991–2027`, `8–10`, `1,000`;
     - dates translate, their digits do not: `October 2–16, 2026`;
     - school and program names stay Latin script: King Edward VI School, Externat
       Saint-Coeur de Marie, Prescott School, Jinrui School, School Year Abroad, Maine Coast
       Semester, Academic WorldQuest, Euro Challenge, CHARMUN/VAMUN/MUNCH, IB, ESL;
     - "Global starts Local" stays verbatim as a quoted motto;
     - `fa`/`ar` store no bidi isolates; `hi`/`te` never pre-group;
     - in `fr`, run `check:fr`.
   - Build: `node scripts/i18n_build_overlay.mjs --topic international-travel --lang <code>`.
3. **`src/data/overlays/NOTES.md`**: add a Country Day subsection under Global Exposure
   with any soft spots, or "none".
4. **STOP for the user's test — no PR yet** (the pdtrips2027 precedent, 2026-10-12).
   - Commit and push.
   - Report the check results.
   - Tell the user how to test: `npm run build && npx vite preview`, then
     `/school/charlotte-country-day/?lang=es`, plus `fa` and `ar`.
   - End the turn.
5. **Ship, only after the user confirms.**
   - Open the PR with `--body-file`.
   - Flip this plan to `implemented` and add Implementation notes; set the INDEX row to
     Implemented with the PR link.
   - `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.
   - **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/international-travel/charlotte-country-day/*.md` (2) | new: transcription + citation record (written while planning) |
| `src/data/schools.json`, `src/content/international-travel/charlotte-country-day.json`, `.claude/docs/international-travel/charlotte-country-day.md` | generated by ingest |
| `src/data/internationalTravel.ts` | edit: 2 types, 2 registry keys, signup fallback title, `WIDE_TRAVEL_CARDS`, `TITLE_OVERRIDES` (PD signup, CCD network), `PROGRAMS` |
| `src/data/internationalTravel/charlotte-country-day.ts` | new: Country Day data |
| `src/data/internationalTravel/README.md` | edit: two schools, new cards, privacy rules |
| `src/components/InternationalTravel.tsx` | edit: `CommunityBody`, `MilestonesBody`, 2 dispatcher cases |
| `public/travel/charlotte-country-day-*.jpg` (≤2) | new: official photos, no names |
| `src/locales/en.json` | edit: 6 keys + 1 new override (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit: `signup@providence-day` move (Phase 1); translations (Phase 2) |
| `scripts/i18n_fields.mjs` | edit: 2 path overrides |
| `src/data/overlays/international-travel.{9}.json` + work files | edit: spliced + translated (Phase 2) |
| `src/data/overlays/NOTES.md` | edit (Phase 2) |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `.claude/plans/INDEX.md`, `.claude/plans/ccdglobal.md` | status + implementation notes |

## Verification

### Phase 1 — English

- [ ] `node scripts/check_metrics.mjs`: no unmatched subtopic
- [ ] `npx tsc -b`: clean
- [ ] `node scripts/i18n_extract.mjs --report --residual`: 0 unclassified international-travel fields
- [ ] `npm run schema && npm run check:schema`: passes; `community` and `milestones` are
      listed
- [ ] `npm run build`: every gate passes except the expected `check:live` English drift.
      `check:seo` passes (Country Day's description ≤160 chars). `check:photos` passes.
- [ ] `grep -n '\$[0-9]' src/data/internationalTravel/charlotte-country-day.ts`: **no hits**
      (no prices)
- [ ] `grep -nE '(January|February|March|April|May|June|July|August|September|October|November|December) [0-9]' src/data/internationalTravel/charlotte-country-day.ts`:
      hits **only** inside `signup` (application and registration deadlines)
- [ ] `grep -in "not stated\|not published" src/data/internationalTravel/charlotte-country-day.ts`:
      hits only inside `verdict`
- [ ] Every `sources` URL in the new file appears in the Source URLs file as fetched or
      Wayback. Spot-check five by opening them.
- [ ] No student, parent or trip leader is named. Grep the file for the surnames listed on
      MS-GE and the news posts (e.g. `Gates`, `Strickland`, `Coley`, `Buford`, `Haggart`).
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright,
      every `<details>` open):
  - `/school/charlotte-country-day/`: the Global Exposure chip and rail item sit after
    Course Offerings. The section shows the lead, 4 tiles and **8 cards** in this order:
    1. Where They Go
    2. Exchanges & Homestays
    3. Signing Up for Travel
    4. Global Learning at Each School Level
    5. Model UN, WorldQuest & Charlotte's Global Partners
    6. Global Community on Campus
    7. Firsts & Milestones
    8. Verdict & Ask the School

    There is no Credential card.
  - Where They Go: the All / Middle School / Upper School tabs work. The Middle School
    filter shows the six 2026–27 experiences. Homestay tags appear only where a homestay
    is recorded.
  - Both photos open in the photo viewer and name nobody. There is no empty `<figure>`.
  - Firsts & Milestones spans the full width and lists events oldest first; both 1992 rows
    render.
  - `/school/providence-day/` still shows **7 cards** with titles unchanged, including
    "Signing Up for Travel & GSD". Only the "Abroad:" and "Visiting:" labels differ.
  - Another school (e.g. `/school/cannon/`) has no Global Exposure section.
- [ ] `npm run audit:mobile`: passes at 320/360/390px
- [ ] Dark mode: the new cards' tiles and rows stay legible

### Phase 2 — Locales

- [ ] `npm run check:chrome`: no key pending in any catalog
- [ ] `npm run check:runtime && npm run check:live`: all international-travel stamps
      resolve; gate 3 passes
- [ ] `python3 scripts/check_figures.py --topic international-travel --lang <code>` and
      `npm run check:sepdrift -- --lang <code>`, for each of the 9 locales
- [ ] `npm run check:dates`, `check:fr`, `check:bidi`, `check:fa`, `check:hi`,
      `node scripts/check_work_integrity.mjs` (see its header for flags; the `--base` trap is in memory `covenantadmissions-shipped`)
- [ ] `npm run i18n:leaks -- --lang <code>`
- [ ] `npm run audit:daterender` and `npm run audit:moneyrender`: no new English dates or
      raw `$` in the section
- [ ] `npm run audit:mobile` at 320px in translated locales
- [ ] Browser check in `es`, `fa` (RTL: milestone years and ledger ranges read correctly,
      not `27–2026`) and `hi`, every card open; plural trip counts in `ar`

## Risks

| Risk | Mitigation |
|---|---|
| A new card key misses a SchoolDetail touch point and silently doesn't render | Step 4 greps SchoolDetail; the browser check counts 8 cards |
| A PD-specific title regresses to English in nine locales when `signup` is retitled | Phase 1 moves each locale's existing translation into `signup@providence-day` before anything else |
| A word in a skipped figure field (stat `value`, `year`, partner `years`) leaks English | Pure-figure values (Decisions); `audit:daterender` in Phase 2 |
| A minor's name reaches the page via a photo or a copied sentence | Step 2 opens each image; the surname grep in Verification |
| Prices or exact travel dates creep back in from the detailed MS page | The `$` and month-day greps in Verification |
| The Southampton or Québec image is unusable | Photos are optional; omit and the column fills (README) |

## Open questions

- **Should Providence Day get `community` and `milestones` later?** **Default:** no action
  in this plan. Mention in the PR body that PD's research would need a pass for them.

## Implementation notes

**Phase 1 (English) built 2026-10-12 on `feat/ccdglobal`.**

**Step 2 results** (recorded in the Source URLs file under "Implement-time verification"):
- Lower School is **JK–4** (fetched).
- **2025–26 Upper School trips dropped.** The live page shows only the 2027 cycle. A
  site-restricted search returned a search-engine summary of the older page listing
  France / Ecuador / South Korea, but a search cache is not a citable page, and the
  Wayback API returned 429. The ledger skips 2025–26; "2025–26 trips" is a Verdict
  question.
- Taste of Cultures (Lebanon, Latin) and the Nov 2024 VAMUN post are live. VAMUN 2024 is
  added to the network ledger's `2024–25` row: 12 delegates, verbal commendations for two
  delegations.
- History item URLs: `first-ib-school-in-nc`, `first-middle-school-exchange-program`.
- Both photos kept, and neither shows a legible name. They were resized to PD's scale
  (800×600, 675×900). The "Southampton Exchange" photo was taken at St Paul's, London,
  so its caption says the exchange includes London visits, which the MS-GE page states.

**Deviations from the plan:**
- **IB wording is "the first private school in North Carolina".** The IB history item page
  says "first private school"; the timeline tile and IS say "first NC school". The app
  renders the narrower claim, which all three pages support. It appears in `start` (Upper
  School) and `milestones`.
- **Grade wording uses ordinals** ("8th grade · up to 15 students", not "grade 8 · up to
  15"), the area's one-grade-convention rule from intltravel's wording pass.
- **The 2023–24 trips carry season `timing`** ("Spring 2024", "Summer 2024"), as PD's
  2023–24 Greece row does. Their groups come from WB-US-2024 and N-2023 (Oman & UAE
  grades 9–12, the rest 9–11).
- **Three month-year mentions outside `signup` were rephrased to seasons** (Arequipa "fall
  2019", Seville "summer 2024", Taste of Cultures "spring 2026"), so the month-day grep
  hits only Signing Up. The one remaining hit is the plan's own year-group note "as
  scheduled in March 2024", which dates a page snapshot, not a trip.
- **The headline count is 20 trips over three school years** (10 in 2026–27, 6 in
  2023–24, 4 in 2022–23). It names the three years instead of a span, because 2024–25
  and 2025–26 are absent.
- **The Verdict has 11 questions.** All the plan's candidates apply, including "2025–26
  trips".
- `SchoolDetail.tsx`: only a stale comment changed. The new keys flow through
  `INTERNATIONAL_TRAVEL_CARDS`, `WIDE_TRAVEL_CARDS` and the `headline` teaser, with no
  logic change.
- **The ingest also refreshed Providence Day's research note** with its already-committed
  2027 trips source file, which had not been re-ingested after #341. It is the same
  topic, and the commit is limited to this topic's paths.
- **`npm run build` exits 0, `check:live` included.** No Providence Day prose changed, so
  no shipped stamp went stale. Country Day's English is simply untranslated until Phase 2.

**Phase 1 verification:**
- `check_metrics` passes, with no unmatched travel subtopic.
- `tsc -b` passes.
- `i18n_extract --report --residual` reports 0 unclassified fields (international-travel:
  549 strings).
- `schema` and `check:schema` pass. The schema shows 2/12 schools and lists `community`
  and `milestones`.
- `npm run build` passes every chained gate, including `check:seo` (Country Day's meta
  description is 158 chars) and `check:photos`.
- The price grep finds no hits. Date hits are only in `signup`, plus the snapshot note
  above. "Not published" appears only in `verdict`. The name grep finds nothing.
- All 29 `sources` URLs appear in the Source URLs file.
- Real Chrome (Playwright, `channel: 'chrome'`, every `<details>` open):
  - the 8 titles appear in plan order, with no Credential card;
  - the 4 tiles show 27 / 6 / 11 / 1988;
  - trips, milestones and verdict are wide;
  - the division filter shows All 20, MS 6, US 14;
  - homestay tags appear only on Canada, Peru, England, Costa Rica and Spain (2024);
  - both photos load and open in the viewer;
  - milestones are listed oldest first, with both 1992 rows;
  - PD has 7 cards and keeps "Signing Up for Travel & GSD";
  - Cannon has no section;
  - 390px has no overflow;
  - dark mode stays legible.
- `audit:mobile` finds 0 page overflow.

**Phase 1 review (2026-10-12): photos are shown in color.** At the user's request, the
grayscale filter came off `.it-photo img` (every Global Exposure photo, Providence Day's
included). The duotone treatment (grayscale + accent background + multiply) came off
`.su-photo img` in the Summer Programs band, so photos look as the source publishes them
on every school. No school has Summer photos yet, so that change shows only once one does.
Verified in real Chrome: computed `filter: none` on both schools' Global Exposure photos.

**Phase 1 review (2026-10-12): the year note follows the division filter.** At the user's
request, `TripYear` gained an optional `noteByDiv` (`Partial<Record<TravelDivision,
string>>`). Under the Middle School or Upper School tab it replaces `note`; under All, the
combined note shows. Country Day's 2026–27 row uses it ("winter and spring 2027" /
"over spring break and in summer 2027"). The new paths are classified as prose in
`PATH_OVERRIDES`, so Phase 2 translates them. Providence Day has no `noteByDiv`, and its
ledger is unchanged. Verified in real Chrome across all three tabs on both schools.
