---
name: christianglobal
title: Add Charlotte Christian School to Global Exposure — seven cards (exchanges and credential omitted; network retitled "SCORE International & the Winterim Mission Partners"), 29 Winterim trips abroad over four school years from the school's own Winterim packets; no prices or exact travel dates on the page
status: implemented
phases: 2
created: 2026-10-16
branch: feat/christianglobal
prs: [352]
---

# Charlotte Christian School — Global Exposure

## Goal

Give Charlotte Christian School a **Global Exposure** section (slug `international-travel`).
It is the fifth school, after Providence Day, Charlotte Country Day, Charlotte Latin and
Cannon. Charlotte Christian publishes no global program page, credential or exchange. What it
does publish, in its yearly **Winterim packets**, is unusually detailed. Upper School students
must take part in Winterim, a week of experiences each year, and the packets list seven or
eight trips abroad a year. Each trip comes with its grade band, group size, theme and mission
or service partner. The section's value to a parent is that ledger, the school's
faith-and-service framing of travel, and a clear list of what to ask on the tour.

It works when `/school/charlotte-christian/` renders the section after Course Offerings with
**seven cards** in registry order:

**Where They Go · Signing Up for Travel · Global Community on Campus · Global Learning at
Each School Level · SCORE International & the Winterim Mission Partners · Firsts &
Milestones · Verdict & Ask the School**

The section also has to meet these rules:

- Every fact cites a charlottechristian.com page, a school-linked PDF, or a Wayback copy of one.
- No student, parent, teacher or trip leader is named.
- No trip price, deposit or exact travel date renders.
- The other four schools' sections are byte-for-byte unchanged.

## Context

**The area today.** Read these before step 1, including their Implementation notes:

- `.claude/plans/cannonglobal.md` (#351). It is the most recent precedent, and its Phase 2 is the method.
- `latinglobal.md` (#349).
- `ccdglobal.md` (#344).
- `gestandard.md` (#348).
- PR #350 (fa/ar year-range isolates).

Where things live:

- **Types, registry and loaders:** `src/data/internationalTravel.ts` holds the types, the
  registry, `TITLE_OVERRIDES`, `PROGRAMS` and the overlay loader. The registry is
  `INTERNATIONAL_TRAVEL_CARDS`: `trips, exchanges, signup, community, start, credential,
  network, milestones, verdict`.
- **Model file:** `src/data/internationalTravel/charlotte-country-day.ts`. Copy its header
  comment, URL constants, `'<domain> — <page>'` labels, `framework` block (around line 451),
  signup `groups` (around line 393), `milestones` (around line 617) and network ledger (around
  line 512).
- **Compact network precedent:** `src/data/internationalTravel/cannon.ts` (a Winterim-style
  ledger and a network card with cells and rows).
- **Data rules:** `src/data/internationalTravel/README.md`.
  - A card the school publishes nothing for is left out (omit-to-hide).
  - Gaps appear only in `verdict.ask`.
  - Figure fields hold figures only: `stats[].value`, ledger `year`, milestone `year`.
  - Quote marks only where they mean something.
  - Where pages give different figures, the most current one wins.
- **Renderer:** `src/components/InternationalTravel.tsx` needs **no change**. Confirmed at
  planning:
  - `StatStrip` returns `null` for `[]` (line 79), so a community card with `stats: []` is fine
    (Latin precedent, `charlotte-latin.ts:504`).
  - The `framework` grid renders only when non-empty (line 309).
  - The network ledger and its `ledgerTitle` render only when `conferences.length > 0` (line 455).
  - The signup groups map (line 493) works with a single group.
- **Card filtering:** `src/pages/SchoolDetail.tsx` filters the registry by `itEntry[c.key] != null`.
  Its comment at **line 961** lists the researched schools ("…Country Day, Charlotte Latin
  and Cannon are researched…") and needs Charlotte Christian added (comment only).
- **The second comment:** `src/data/internationalTravel.ts:277` holds the same list, which
  also gains Charlotte Christian.
- **Export name:** `scripts/i18n_topics.mjs:93` maps `'charlotte-christian'` →
  **`charlotteChristian`**, so the export is
  `export const charlotteChristian: InternationalTravelProgram`.
- **i18n fields:** `scripts/i18n_fields.mjs` already classifies every path this school uses,
  because Country Day ships the same cards. `signup.groups[].events[].name`/`.audience` are
  prose (lines 721–727). `when` is prose globally (line 84), so the dates translate under
  `check:dates`. `milestones.events[].year` is a figure (line 745).
- **Splicing:** splice the new school into existing work files with
  `scripts/i18n_splice_work.mjs`. **Never re-extract** (memory
  `splice-not-reextract-for-new-school`).
- **Chrome:** the shared chrome (`cards.international-travel.*` and `travel.*` in
  `src/locales/en.json`) names no school. Checked at planning: no school-specific leak. The
  only chrome change is **one new key**, `cards.international-travel.network@charlotte-christian`.
  The precedent is `network@charlotte-latin`.

**The research.** It was written during `/global-exposure` on 2026-10-16 and is uncommitted.
It is ingested in step 1.

- `source-material/international-travel/charlotte-christian/Charlotte Christian - International Travel - Deep Research.md`
  is the PDF transcription. It is a lead sheet and is never cited.
- `…/Charlotte Christian - International Travel - Source URLs.md` is **the citation record**.
  It contains:
  - the page keys (US, CURR, DIV, SPIR, APPLY, TUI, HIST, PAR, SS, EOS, FF, KH, KH-KNC, KH-CRAY,
    **WP27, WP26, WP24, WB-US-2022**, USG, MSG, LSB, G280, EN2922, N1417, N894, V0708, V0910,
    V1011A, V1011B, V1112, V1213, MCF);
  - the Verified table;
  - a **29-row trip detail table**;
  - a "Not verified" table;
  - conflicts and spellings;
  - photo candidates.

  **Only fetched or Wayback rows may render.** Use the keys exactly.

**What verification changed.** The deep-research PDF was wrong on these points:

- The PDF said the 2027 Winterim Packet "could not be opened". **It loads** from the Upper
  School page's own link (WP27).
- The 2026 packet (WP26) and the 2024 packet (WP24) are on **Wayback**, and so is an
  **Aug 2022 Upper School page listing Winterim 2023's trips** (WB-US-2022). Together they
  give four school years of trips with grade band, group size and partner.
- **J-Term started in 2013–14**, not "by 2012-13". V1213 announces it for "next year", from
  the Class of 2017.
- The 2010–11 Belize/India/Bolivia list is **one teacher's personal history**, not school trips.
- The "inner-city Christian school" Vacation Bible School is **in Panama**, not Charlotte.
- Harvard Model Congress 2010–11 was "the largest delegation of students from any school in
  the nation", not "a political event".
- The Winterim credit "conflict" is not a conflict: .25 a year toward 1.0.
- The Knights Nations Club article loads.
- The Multicultural Festival story is **404 with no Wayback copy**, so it is dropped. The
  festival itself is verified on CURR and LSB.

## Decisions

**User decisions** (AskUserQuestion at `/global-exposure` B4, **2026-10-16**). This is the
approval record.

1. **Exchanges & Homestays: omit** ("Omit card (Recommended)").
   - The only exchange on record is **Experiencias Interculturales**: begun 2008 as "Faces",
     Guatemalan high schoolers spending eight weeks with CCS host families and attending
     Upper School classes. It appears only in V0910 and is inbound only.
   - It becomes a **Firsts & Milestones** row.
   - "Does it still run?" becomes a **Verdict** question.
2. **Network: include, retitled** ("SCORE & mission partners (Recommended)").
   - `TITLE_OVERRIDES['charlotte-christian'] = { network: 'SCORE International & the Winterim Mission Partners' }`.
   - Key: `cards.international-travel.network@charlotte-christian`.
   - The ledger is one row per school year of SCORE International trips on record.

**Credential: omit.** No global credential is published. "Seal of Biliteracy" appears only in
one student's Senior Spotlight honors list, which is not a program page, so it becomes a
Verdict question.

**Per-card standard** (vs Country Day), recorded at B4:

| Card | Status | Reason |
|---|---|---|
| Lead + stats | at standard | 4 pure-figure tiles |
| `trips` | **below standard** | No homestays published. Selection is one school-wide priority rule, not per trip. No 2024–25 packet was found. Upper School only. |
| `exchanges` | omitted | user decision, 2026-10-16 |
| `signup` | **below standard** | one division (only the Upper School travels) |
| `community` | **below standard** | cells only; no published community figures |
| `start` | at standard | the school's own framework (Winterim's five goals) |
| `credential` | omitted | none published |
| `network` | at standard | retitled (user decision, 2026-10-16) |
| `milestones` | at standard | ≥5 dated events |
| `verdict` | at standard | ~12 questions |

**Lead.**

- strong: Upper School students at Charlotte Christian take part in Winterim, a week each year
  at the turn of February and March, with seven or eight trips abroad offered each year from
  9th grade (WP27, WP26).
- muted: Most trips pair travel with a mission or service partner, from SCORE International in
  the Dominican Republic, on record since 2009–10, to Samaritan's Feet in Portugal (WP27,
  V0910).
- Wording may tighten. **Do not claim "every student travels abroad"**: Winterim is required,
  but going abroad is one option among local and domestic ones.

**Stat strip.** All pure figures, each with a whose-count note:

- `7` · trips abroad · "offered in Winterim 2027, per the school's packet" (WP27)
- `15` · countries · "our count from four Winterim packets, 2023–2027" (WP27, WP26, WP24, WB-US-2022)
- `1.0` · Winterim credit to graduate · ".25 each Upper School year" (WP27, USG)
- `2009–10` · first SCORE International trip on record · "31 students to the Dominican Republic, per the school" (V0910)

The 15 countries are Austria, Brazil, Canada, Costa Rica, Dominican Republic, Ecuador,
France, Germany, Greece, Iceland, Italy, Mexico, Panama, Portugal and the United Kingdom
(England and Scotland counted once). This list is in the Source URLs file.

**Trips are "offered".** WP27 says "Final trip size and offerings will be determined
according to registrations", and the packets are offering lists. So:

- The headline and intro say trips were **offered** (e.g. "29 trips abroad offered across four
  Winterims…").
- "Which offered trips ran?" is a Verdict question.
- Never write "students traveled to" for a packet-only trip.

**Trips ledger.** Newest first, all `div: 'US'`. `group` uses ordinal grade wording plus the
packet's range:

- For WP26/WP27, the packet's "Number of students" range: `'10th–12th grade · 16–32 students'`.
- For WP24/WB-US-2022, the packet's "Max." figure: `'up to 40 students'`.
- Single-sex trips add the word: `'10th–12th grade · girls · 16–30 students'`.
- Team trips: `'Varsity baseball team · up to 25 students'`.

`timing` is `'Winterim 2027'` etc. Never a day. Each year's `note` is the Winterim name only
(e.g. `'Winterim 2027'`). Do **not** use "January"/"March" + digit; see the Cannon
Implementation notes on the month grep. No `noteByDiv`: one division.

Themes come from the Source URLs trip table, shortened. Partner names stay.

- **`2026–27`** (WP27):
  - Brazil · São Paulo · `9th–12th grade · female athletes · 16–40 students` · a sports ministry tour, with sport clinics and local churches, with Missionary Athletes International.
  - Canada · Québec · `10th–12th grade · 25–35 students` · French conversation and a Québec winter, with service alongside a local church.
  - Dominican Republic · `10th–12th grade · 16–32 students` · service learning with SCORE International.
  - Iceland · `11th–12th grade · 35–40 students` · landscape and culture, with an environmental-stewardship service project.
  - Italy · Sorrento, Pompeii + Rome · `9th–12th grade · 24–32 students` · art, history and faith, with service in Rome.
  - Mexico · La Paz · `10th–12th grade · 16–20 students` · service and spiritual formation with Rancho El Camino.
  - Portugal · Lisbon · `10th–12th grade · 10–12 students` · shoe distribution with Samaritan's Feet.
- **`2025–26`** (WP26):
  - Greece · Athens, Corinth + Nafplio · `11th–12th grade · 16–40 students` · in Paul's footsteps, with a beach clean-up.
  - Brazil · Rio de Janeiro · `10th–12th grade · 18–30 students` · Afro-Brazilian culture, with a day of service.
  - Brazil · Rio de Janeiro · `9th–12th grade · female athletes · 10–25 students` · a sports ministry tour.
  - England · Birmingham · `10th–12th grade · 16–20 students` · a mission trip with a local church: food distribution and youth outreach.
  - Costa Rica · `10th–12th grade · girls · 16–30 students` · wildlife biology and conservation, with tree-planting and a wildlife sanctuary.
  - Dominican Republic · `10th–12th grade · 16–30 students` · service learning with SCORE International.
  - Panama · `9th–10th grade · 16–21 students` · Vacation Bible School at an inner-city Christian school, Panamá Viejo and an Emberá village.
  - Scotland · Highlands, Edinburgh + Glasgow · `10th–12th grade · girls · 20–30 students` · history and culture, with a day of service in Glasgow.
- **`2023–24`** (WP24):
  - Dominican Republic · `10th–12th grade · up to 40 students` · SCORE International.
  - Dominican Republic · `Varsity baseball team · up to 25 students` · service with SCORE International and two exhibition games.
  - Ecuador · Quito, Baños + Isla de la Plata · `10th–12th grade · up to 27 students` · Spanish practice and a cocoa plantation.
  - Iceland · `10th–12th grade · up to 35 students`.
  - Germany & Austria · Munich + Salzburg · `9th–12th grade · up to 35 students` · history and culture.
  - Greece & Italy · `9th–12th grade · up to 36 students` · art, history and faith.
  - Panama · `9th–10th grade · up to 20 students` · mission and service.
  - Portugal · Lisbon · `10th–12th grade · up to 15 students` · Samaritan's Feet.
- **`2022–23`** (WB-US-2022):
  - Dominican Republic · `10th–12th grade · up to 40 students` · SCORE International.
  - Dominican Republic · `Varsity baseball team · up to 22 students` · SCORE International.
  - Italy & Greece · `9th–12th grade · up to 36 students`.
  - England & France · London, Stratford-upon-Avon + Paris · `9th–12th grade · up to 30 students` · literary history.
  - Mexico · La Misión, Baja California · `10th–12th grade · up to 15 students` · Samaritan's Feet.
  - Panama · `9th–12th grade · up to 20 students`.
- **Excluded from the ledger:**
  - Puerto Rico (2023; a U.S. territory, which the school filed with out-of-town trips).
  - Pacific Northwest (2027; filed under **Domestic Travel**, though it reaches Vancouver Island).
  - Every local or domestic experience.
  - Peru (see conflicts).
- Since `dest` is the country, a two-country trip uses `'Germany & Austria'`-style `dest`,
  following Cannon/Latin. A trip whose `place` would repeat `dest` omits `place`.

**`trips.alsoOnRecord`** (lead + one sentence each):

- *Mission trips from 1998.* School-sponsored mission trips with faculty and students went
  to Mexico in 1998, Costa Rica in 1999 and Austria in 2000 (V0708).
- *SCORE International, 2009–10.* 31 students worked with SCORE International in the
  Dominican Republic (V0910).
- *Summer 2011.* 42 students joined school mission trips to the Dominican Republic or to Sea
  Island, Georgia, with Habitat for Humanity (V1112). Domestic leg named for context only.
- *The first J-Term.* The 2013–14 J-Term was announced with mission trips to Uganda,
  Nicaragua or the Dominican Republic and trips to France and New York (V1213). Word it as
  **announced**.
- *Salamanca, summer 2018.* Upper School students traveled to Spain for language and
  cultural immersion (N1417, G280).
- *Italy, J-Term 2020.* 40 students, staff and parents traced Christian art and history
  through Rome (EN2922). The year is our inference from the newsletter, so say "J-Term,
  winter 2020" only if step 2's check supports it. Otherwise say "a J-Term trip to Italy",
  undated.
- *Basketball in Limoges.* Four varsity players represented Charlotte in a partner-cities
  tournament in Limoges, France, in 2009–10 (V0910).

**`trips.photo`:**

- Source: St Peter's Square, `23_US-Winterim-4.png` (US). Saved as
  `public/travel/charlotte-christian-italy.jpg` at the scale of the other `public/travel/`
  images.
- `alt`: "Charlotte Christian Upper School students in St Peter's Square, Rome".
- `caption`: `{ title: 'Italy, on Winterim', text: 'A Winterim trip in Rome, at St Peter\'s Square.' }`.
  **No year**: the year is only in the filename.
- `credit`: `'Photo: Charlotte Christian School'`.

**`signup`.** One group:

- `title: 'Upper School · Winterim 2027'`, `note: '2026 cycle'`, `footnote: true`.
- `events` (all `audience: 'Upper School'`, from WP27):
  - `July 24, 2026` · Registration opens
  - `August 28, 2026` · Registration and deposit close, at midnight
  - `September 5, 2026` · Registrations confirmed by email
  - `September 11, 2026` · Financial contracts, liability release forms and passport copies due
- `intro.strong`: the priority rule (WP27). Priority goes by highest grade level available,
  first-time attendees, curriculum connections, accuracy of registration information and
  demonstrated readiness. Time of registration counts least.
- `intro.muted`: international trips need a passport valid six months past the trip, and the
  packet points families to outside travel insurers (WP27). Name no insurer, or name them as
  the packet does. **Default:** do not name them.
- `headline`: e.g. "Registration for Winterim 2027 opened in July 2026 and closed in August,
  with contracts and passport copies due in September."
- **Step 2 checks for a newer (2028) packet.** If one is posted, use its cycle instead.

**`community`.** `stats: []`. Cells:

- **Global Knights**: a 5th-grade Middle School elective and Middle School student group, and
  an Upper School club (MSG, DIV).
- **Knights Nations Club**: Upper School students learning about local and international
  communities, from international grocery stores to how Easter is celebrated across the globe
  (KH-KNC).
- **Global Awareness Prefect**: one of nine Upper School student-government prefects (US).
- **Romans 12**: members of the school community who meet monthly and, per the school,
  strengthen its multicultural and global awareness (DIV).
- **Multicultural Festival**: an annual Lower School celebration in Spanish class (CURR, LSB).
- **International students**: the school enrolls international students on I-20 visas and
  does not provide host families (APPLY). The fee and the "no aid" line are research only. The
  no-aid fact may appear in the Verdict.

intro.strong comes from DIV ("cultural empathy, global awareness and a posture of humility").
Name the office by title only: "the Director of Diversity, Belonging and Global Awareness". The
KH-CRAY crayon drive (Nigeria) is **optional**. **Default: omit**, since it is service rather
than global community.

**`start`.**

- `framework`: Winterim's five goals, from WP27:
  - Love God: spiritual growth in student and faculty relationships.
  - Pursue Excellence: problem solving, independence and life skills in new settings.
  - Walk Humbly: discover the heritage, beliefs and experiences of another cultural context.
  - Show Kindness: serve a community.
  - Seek Truth: explore sites, museums and landmarks.
- `divisions`:
  - **Lower School · JK–4**
    - Spanish, with an annual Multicultural Festival.
    - Social studies that widens from families and neighborhoods to global geography.
    - Learning about other cultures through literature, guest speakers and projects.
  - **Middle School · 5–8**
    - A 5th-grade Language Survey of French, Latin and Spanish, then one language through 8th grade.
    - Global Knights and Multicultural Studies electives.
    - Heritage months in world-language classes.
    - Field trips: Sudan Interior Missions (6th), the Holocaust butterfly memorial (7th), Civil Rights (8th).
    - Modern World Civilizations.
  - **Upper School · 9–12**
    - French, Latin and Spanish through AP.
    - Survey of World Literature ("What does it mean to be an engaged global citizen?").
    - AP World History: Modern.
    - Winterim each year, with trips abroad from 9th grade.
- intro.strong: "The study of modern and classical languages equips students to impact the
  global culture for Christ" (CURR), as the program's own line.

**`network`** (title per decision 2).

- intro.strong: the school's travel runs through long-standing mission and service partners,
  above all SCORE International in the Dominican Republic.
- intro.muted: the Upper School's Model UN club and a record at Harvard Model Congress.
- Do **not** write "belongs to no network" (latinglobal lesson).
- `ledgerTitle: 'SCORE International trips on record'`. `conferences` rows:
  - `2026–27`: Winterim 2027, 10th–12th grade.
  - `2025–26`: Winterim 2026.
  - `2023–24`: Winterim 2024, plus a varsity baseball service trip.
  - `2022–23`: Winterim 2023, plus a varsity baseball service trip.
  - `2009–10`: 31 students.
  - Summer 2011 does **not** get a row: V1112 says "Dominican Republic or Sea Island" and does
    not name SCORE.
- `cells`:
  - **SCORE International**: a Christ-centered ministry the school's Dominican Republic trips
    serve with, through sports, orphan care and construction (WP27, V0910).
  - **Samaritan's Feet**: shoe-distribution trips to Baja California (2023) and Lisbon (2024, 2027).
  - **Missionary Athletes International**: the female athletes' sports ministry tour in Brazil (2027).
  - **Rancho El Camino**: service in La Paz, Mexico (2027).
- `rows`:
  - **Model UN**: an Upper School club (US).
  - **Harvard Model Congress**: in 2010–11, 43 juniors and seniors made up the largest
    delegation of any school in the nation, in the school's eighth year there (V1011B).
  - **Academic WorldQuest**: eight students competed in 2011, in the World Affairs Council of
    Charlotte's contest (V1112).
  - Optional **Travel partners** row naming Joshua Expeditions, Grand Classroom and EF Tours
    (WP26/WP27). **Default: include.**

**`milestones`.** Oldest first, pure-figure `year`. Never compute a start year from
"seventh year" / "eighth year", and give no J-Term→Winterim rename year.

- `1998` · Mission trips abroad · School-sponsored mission trips to Mexico, then Costa Rica
  (1999) and Austria (2000) (V0708).
- `2008` · Families host Guatemalan students · The Faces exchange, later Experiencias
  Interculturales, began, with visiting high schoolers living with school families for eight
  weeks (V0910).
- `2009–10` · SCORE International · 31 students served in the Dominican Republic (V0910).
- `2009–10` · Lord of All Nations · The Lower School's Multicultural Day represented 24
  countries (V0910). One year, two events; rows are keyed by year + title.
- `2010–11` · Harvard Model Congress · The largest delegation of any school in the nation
  (V1011B).
- `2013–14` · J-Term begins · A required week of experiences each Upper School year, from the
  Class of 2017 (V1213).
- `2022–23` · Winterim · The week runs as Winterim, with trips abroad each year (WB-US-2022).
  Word it as "by 2022–23", not as a rename date. **Default:** title "Winterim", text
  "Winterim 2023 offered six trips abroad".

**`verdict`.**

- `standsOut.summary`: Charlotte Christian has no global diploma or exchange program, but
  every Upper School year includes Winterim, and its packets publish seven or eight trips
  abroad a year. Each comes with a grade band, group size and a mission or service partner.
- Points (~4):
  - A required Winterim every Upper School year.
  - Trips abroad from 9th grade, published with grade bands and group sizes.
  - Mission and service partners since 2009–10.
  - Three languages to sample in 5th grade.
- `ask` (one per gap):
  - **Cost**: what does a Winterim trip include, and how far can the price move? No price
    renders.
  - **Aid**: aid covers up to half of tuition, and families pay "all fees" (TUI). Does any aid
    or fund help with Winterim travel?
  - **9th grade**: most trips are 10th–12th or 11th–12th grade, with priority to the highest
    grade. How often does a 9th grader get a trip abroad?
  - **Which trips ran**: which offered trips ran each year?
  - **2025**: no Winterim 2025 packet is published. Which trips went?
  - **Safety**: chaperone ratios, and what insurance the school carries. The packet points
    families to outside insurers.
  - **Exchanges**: does Experiencias Interculturales still run, or any exchange?
  - **Credential**: is a global certificate or the Seal of Biliteracy offered school-wide?
  - **Scale**: how many students go abroad each year?
  - **Middle and Lower School**: any travel before 9th grade?
  - **Model UN today**: which conferences, and does the school still attend Harvard Model Congress?
  - **International students**: how many, and is there English-language support?

**Privacy.**

- Never rendered: trip prices, deposits, the $2,000 international-student fee, exact travel
  dates, leaders' names. All stay in the Source URLs file.
- `timing` is the Winterim name.
- Registration deadlines are not travel dates and may render.
- No student is named. KH-KNC, SS, EOS, EN2922 and the Voice issues all name students; take
  roles and facts only. The director renders by title.

**Spellings:** São Paulo, Panamá Viejo, Emberá, Neuschwanstein, Québec.

**Conflicts.**

- **Peru never renders.** A senior's Senior Spotlight recalls a 10th-grade Winterim trip to
  Peru (2023–24), but WP24 lists no Peru trip, so the packet wins.
- **Winterim timing:** the current packet wins ("late February into March"). The US page's
  "end of February" is not quoted.

**No Compare change.** The area stays in `COMPARE_DEFERRED_TOPICS`.

**No third-party fact renders.** Partner names come from the school's own packets.
FindingSchool and MinistryWatch stay out.

## Approvals needed

**None outstanding.** Adding a school to an existing area with existing cards needs no UX
approval, and the network title override was approved on 2026-10-16 (Decisions). The user
reviews wording at the Phase 1 stop.

`npm run deploy` is **not** part of this plan. Merging is not publishing.

## Source material

Both files were written during `/global-exposure` on 2026-10-16. They are **uncommitted**,
and `/implement` ingests them in step 1:

- `source-material/international-travel/charlotte-christian/Charlotte Christian - International Travel - Deep Research.md`
- `source-material/international-travel/charlotte-christian/Charlotte Christian - International Travel - Source URLs.md`

The PDF itself is not on disk. The transcription is the committed record.

## Out of scope

- Exchanges and Credential cards for Charlotte Christian.
- Renderer, type or registry changes, and chrome keys beyond `network@charlotte-christian`.
- Any change to the other four schools' data.
- Compare rows, `VALUE_METRICS` and home-grid cells.
- Domestic and local Winterim experiences, the MS crayon drive, NSLI-Y and family mission
  trips (student or family activities), and the Breckenridge senior trip.
- A podcast episode, `npm run deploy` and the news Worker.

## Steps

### Phase 1 — English

1. **Branch, commit and ingest the source files.**
   - `git checkout main && git pull && git checkout -b feat/christianglobal`.
   - `git add` the two source-material files **by explicit path**, plus this plan and
     `INDEX.md`, and commit.
   - Run the `ingest-source-material` skill for `international-travel`:
     `python .claude/skills/ingest-source-material/build_docs.py international-travel`, then
     `python scripts/build_site_content.py`, then `node scripts/check_metrics.mjs`.
   - Run `git status --short`, then commit **only this topic's paths** (memory
     `ingest-full-rebuild-sweeps-topics`).

2. **Close the verification gaps and update the Source URLs file.**
   - Re-fetch US, DIV, WP27, CURR and APPLY (`curl -sL`, browser UA). Confirm nothing moved
     since 2026-10-16. The live page wins.
   - **Look for a newer packet.** Check whether the US page's packet link still points to
     `ba353ab7-…` (2027). If a 2028 packet has posted, add its trips as a `2027–28` year and
     use its sign-up cycle.
   - Try once more for a **Winterim 2025 packet**, by searching the Wayback CDX for the
     Parents' Hub (PAR) in 2024–25. It was temporarily offline at planning. If one is found,
     add `2024–25` trips and update the counts.
   - Confirm the EN2922 year if possible (the musical "Feb. 6-8" and the "2020 Western Region
     Honors Orchestra" point to winter 2020). The default wording is in Decisions.
   - **Photo:** download `23_US-Winterim-4.png` at `t_image_size_3`, **open it**, confirm no
     legible name, sign or caption, then save it as `public/travel/charlotte-christian-italy.jpg`.
   - Record every result under an **"Implement-time verification"** heading. Drop any fact
     that is still PDF-only.

3. **Charlotte Christian data: new `src/data/internationalTravel/charlotte-christian.ts`.**
   - It exports `charlotteChristian: InternationalTravelProgram`.
   - Model it on `charlotte-country-day.ts`. The header comment covers provenance, the
     verification date and the rules followed. It also states that the school publishes no
     exchange or credential, so those cards are omitted (user decision 2026-10-16), and that
     trips are packet **offerings**.
   - URL constants are named after the Source URLs keys: `CCS = 'https://www.charlottechristian.com'`,
     `RM`, `VOICE`, `KHP`, then `US`, `CURR`, `DIV`, `SPIR`, `APPLY`, `TUI`, `KH_KNC`, `USG`,
     `MSG`, `LSB`, `G280`, `EN2922`, `N1417`, `WP27`, `WP26`, `WP24`, `WB_US_2022`, `V0708`,
     `V0910`, `V1011B`, `V1112`, `V1213`. Cite WP27 as the school's own
     `${RM}/ba353ab7-5279-4db7-bbf6-68f09cc3fc31` link.
   - Source labels:
     - `'charlottechristian.com — <page>'`;
     - packets as `'charlottechristian.com — Winterim 2027 packet (PDF)'`;
     - Wayback copies as `'Winterim 2026 packet (Wayback, Oct 2025)'`,
       `'Winterim 2024 packet (Wayback, Dec 2023)'` and `'Upper School (Wayback, Aug 2022)'`;
     - Voice issues as `'charlottechristian.com — The Voice, 2009–10 (PDF)'`.
   - **Every fact traces to a fetched or Wayback row.**
   - Content follows Decisions: `lead`, `stats`, `trips`, `signup`, `community`, `start`,
     `network`, `milestones`, `verdict`. Every card's `sources` lists only the pages behind
     its facts.
   - Omit `exchanges` and `credential`.

4. **Register in `src/data/internationalTravel.ts`.**
   - Import `charlotteChristian` from `./internationalTravel/charlotte-christian.ts` and add
     `'charlotte-christian': charlotteChristian` to `PROGRAMS`.
   - Add `'charlotte-christian': { network: 'SCORE International & the Winterim Mission Partners' }`
     to `TITLE_OVERRIDES`.
   - Update the comment at line 277 to include Charlotte Christian, and the matching comment
     at `src/pages/SchoolDetail.tsx:961`. Comments only; no type or registry change.
   - **Chrome, `src/locales/en.json`:** add
     `"international-travel.network@charlotte-christian": "SCORE International & the Winterim Mission Partners"`
     beside the other `@slug` keys. Do not touch the other nine catalogs in Phase 1.

5. **Update `src/data/internationalTravel/README.md`.**
   - Change four schools to five, adding Charlotte Christian (`.claude/plans/christianglobal.md`, 2026-10-16).
   - Add its network title to the `TITLE_OVERRIDES` examples.
   - Note that its ledger is built from the school's **Winterim packets** (school-hosted
     PDFs, three via Wayback), worded as offerings.

6. **i18n classification.** Run `node scripts/i18n_extract.mjs --report --residual`. No new
   field paths are expected. If anything appears under international-travel, classify it in
   `scripts/i18n_fields.mjs` until the report reaches 0.

7. **Regenerate and check.**
   - `npm run schema && npm run check:schema`.
   - `npx tsc -b` (**not** `--noEmit`).
   - `npm run build`. Every chained gate must pass, including:
     - `check:seo`: Charlotte Christian's meta description gains Global Exposure and must stay
       ≤160 chars. If it overflows, fix it in `src/lib/head.ts` and record the fix.
     - `check:photos`.
     - `check:live`.
   - Run the greps and browser checks under Verification → Phase 1.

8. **Commit Phase 1** on `feat/christianglobal`.
   - Run `git status --short` first, then stage explicit paths only: the data file,
     `internationalTravel.ts`, `SchoolDetail.tsx`, `src/locales/en.json`, the README, the
     photo, the ingest outputs, `DATA-SCHEMA.md`, the Source URLs file, this plan and
     `INDEX.md`.
   - Push, then verify `git rev-parse HEAD` against `git ls-remote origin feat/christianglobal`.
   - Set this plan to `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review. No PR is opened in
Phase 1.**

Tell the user to run `npm run dev` and open `/school/charlotte-christian/` with every card
open, at desktop width and at 390px. Ask specifically about:

- Whether 29 packet trips read well as **offerings**, and whether the ledger is too long.
  **Fallback:** keep the two newest years in `years` and move 2023–24 and 2022–23 into
  `alsoOnRecord` summaries.
- The lead and the four tiles, especially the `2009–10` tile.
- The network title and its SCORE ledger.
- The faith-and-service framing of the start card's framework.
- Whether a sign-up card whose deadlines have passed earns its place.

### Phase 2 — Every other locale

There are two layers. Re-read both lists first, because they can grow.

0. **UI chrome: the nine non-`en` catalogs in `TRANSLATED`** (`src/lib/i18n.ts`, currently
   `es bn ht te fr fa it hi ar`).
   - Add and translate `cards.international-travel.network@charlotte-christian` by text
     insertion after `network@cannon`.
   - "SCORE International" and "Winterim" stay in Latin script.
   - Follow each catalog's rendering of `network@charlotte-latin`.
   - Never normalize key order in `ar.json`.

Then the research prose, per `PROSE_TRANSLATED`. The mechanism is in
`.claude/docs/prose-translation-architecture.md`; the method is cannonglobal Phase 2.

1. **Splice, never re-extract:**
   `node scripts/i18n_splice_work.mjs --lang <code> --topic international-travel` for each
   locale. The dropped-stamp count for the other four schools must be **0**.
2. **Translate** Charlotte Christian's new strings for each locale, keyed by stamp, never by
   index.
   - Parallel agents get **one scratch directory each** and write only stamp → translation
     maps, which are applied centrally (memory `parallel-locale-agents-collide`).
   - Use each locale's existing Global Exposure renderings as the glossary.
   - Standing rules:
     - Figures stay char-for-char: `7`, `15`, `1.0`, `.25`, `2009–10`, `31`, `43`, `24`,
       ranges such as `16–32`, school years.
     - These names stay in Latin script: Charlotte Christian, Winterim, J-Term, SCORE
       International, Samaritan's Feet, Missionary Athletes International, Rancho El Camino,
       Joshua Expeditions, Grand Classroom, EF Tours, Global Knights, Knights Nations Club,
       Global Awareness Prefect, Romans 12, Harvard Model Congress, Academic WorldQuest,
       Model UN, Experiencias Interculturales, Upper School, AP.
     - Winterim's five goal names (Love God, Pursue Excellence, Walk Humbly, Show Kindness,
       Seek Truth) are the school's named framework. **Default:** keep them in English as
       names and translate their text lines. Follow how Country Day's framework names were
       handled in each locale.
     - `fa`/`ar` store no bidi isolates.
     - `hi`/`te` never pre-group digits.
     - Run `check:fr` for `fr`.
   - Dates in sign-up `when` translate (`check:dates`). First of the month is never involved
     here.
3. **Build:** `node scripts/i18n_build_overlay.mjs --topic international-travel --lang <code>`.
4. **`src/data/overlays/NOTES.md`:** add a Charlotte Christian subsection under Global
   Exposure with any soft spots, or "none".
5. **STOP for the user's test, with no PR yet.**
   - Commit, push and report the check results.
   - Tell the user to run `npm run build && npx vite preview`, then open
     `/school/charlotte-christian/?lang=es`, plus `fa` and `ar`.
   - End the turn.
6. **Ship only after the user confirms.**
   - Open the PR via `--body-file`.
   - Flip this plan to `implemented` with Implementation notes, and the INDEX row to
     `Implemented` with the PR link.
   - Run `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.
   - **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/international-travel/charlotte-christian/*.md` (2) | new (written at planning); Source URLs gains implement-time rows |
| `src/data/schools.json`, `src/content/international-travel/charlotte-christian.json`, `.claude/docs/international-travel/charlotte-christian.md` | generated by ingest |
| `src/data/internationalTravel/charlotte-christian.ts` | new: the school's data |
| `src/data/internationalTravel.ts` | edit: import + `PROGRAMS` + `TITLE_OVERRIDES['charlotte-christian']` + comment |
| `src/pages/SchoolDetail.tsx` | edit: comment at line 961 only |
| `src/locales/en.json` | edit: `network@charlotte-christian` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit: the key translated (Phase 2) |
| `src/data/internationalTravel/README.md` | edit: five schools; the title; packet-offerings note |
| `public/travel/charlotte-christian-italy.jpg` | new |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `scripts/i18n_fields.mjs` | only if the residual report finds a new path |
| `src/data/overlays/international-travel.{9}.json` + work files | spliced + translated (Phase 2) |
| `src/data/overlays/NOTES.md` | edit (Phase 2) |
| `.claude/plans/INDEX.md`, `.claude/plans/christianglobal.md` | status + implementation notes |

## Verification

### Phase 1 — English

- [ ] `node scripts/check_metrics.mjs` — no new unmatched subtopic
- [ ] `npx tsc -b` — clean
- [ ] `node scripts/i18n_extract.mjs --report --residual` — 0 unclassified international-travel fields
- [ ] `npm run schema && npm run check:schema` — Charlotte Christian is listed with Global Exposure
- [ ] `npm run build` — every chained gate passes (`check:seo`, `check:photos`, `check:live`)
- [ ] `grep -n '\$[0-9]' src/data/internationalTravel/charlotte-christian.ts` — **no hits**
- [ ] `grep -nE "(Feb|Mar)\.? [0-9]|February [0-9]|March [0-9]" src/data/internationalTravel/charlotte-christian.ts`
      — **no hits**. No travel date; the sign-up dates are July to September.
- [ ] `grep -in "not stated\|not published" src/data/internationalTravel/charlotte-christian.ts` — hits only inside `verdict`
- [ ] `grep -n "Peru\|Puerto Rico\|Vancouver\|Belize" src/data/internationalTravel/charlotte-christian.ts` — **no hits**
- [ ] No person is named. Grep the file for `Walker`, `Gillette`, `Giller`, `Reeves`,
      `Sturdevant`, `Pleshko`, `Brilhante`, `McCarrick`, `Cochran`, `Simmons`, `Gatlin`,
      `Mendieta`, `Rice`, `McGinnis`, `Gyorfi`, `Jones`, `Foxx`, `Abarca`, `Szymborski`,
      `McKnabb`, `Ulman`, `Schenck`, `Little`, `Caceres`, `Foskey`, `Moreau`. There should
      be no hits.
- [ ] Every `sources` URL is a fetched or Wayback row of the Source URLs file. Spot-check five.
- [ ] Trip count in `years` equals the headline's number, and countries equal the `15` tile
      (or both are updated together if step 2 adds a year).
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright,
      every `<details>` open, no `networkidle`):
  - `/school/charlotte-christian/`: the Global Exposure chip and rail item come after Course
    Offerings.
  - The lead, the **4 tiles** (7 / 15 / 1.0 / 2009–10) and **7 cards** appear in order:
    Where They Go · Signing Up for Travel · Global Community on Campus · Global Learning at
    Each School Level · SCORE International & the Winterim Mission Partners · Firsts &
    Milestones · Verdict & Ask the School.
  - Where They Go: the division filter shows only Upper School trips. No homestay tag
    appears. The photo opens in the viewer and names nobody.
  - Community shows no stat strip and no empty gap.
  - The Network ledger heading is "SCORE International trips on record".
  - `/school/providence-day/` (9 cards), `/school/charlotte-country-day/` (8),
    `/school/charlotte-latin/` (8) and `/school/cannon/` (5) are unchanged.
- [ ] `npm run audit:mobile` — passes at 320/360/390px
- [ ] `npm run audit:daterender` — the sign-up dates are the only dates in the section
- [ ] Dark mode is legible

### Phase 2 — Locales

- [ ] Splice: 0 dropped stamps per locale
- [ ] `npm run check:chrome` — `network@charlotte-christian` is present and translated in all ten catalogs
- [ ] `npm run check:runtime && npm run check:live` — all stamps resolve; gate 3 passes
- [ ] `python3 scripts/check_figures.py --topic international-travel --lang <code>` and
      `npm run check:sepdrift -- --lang <code>` for each of the 9 locales
- [ ] `npm run check:dates`, `check:fr`, `check:bidi`, `check:fa`, `check:hi`, `check:script`
- [ ] By-stamp integrity vs `main` (cannonglobal method; `check_work_integrity.mjs`'s length
      assertion fails by design on a new-school splice): 0 lost, 0 mutated, 0 overwritten,
      0 empty new entries, 0 foreign-script, 0 bidi controls
- [ ] `npm run i18n:leaks -- --lang <code>`
- [ ] `npm run audit:daterender` and `npm run audit:moneyrender` — nothing new in the section
- [ ] `npm run audit:mobile` at 320px in translated locales
- [ ] Browser check in `es`, `fa` and `hi` with every card open. In `fa`/`ar`, the `2009–10`
      tile and the ledger years must read left-to-right (#350; memory `intltravel-shipped`:
      stat tiles are not bidi-isolated, so measure glyph x-position).

## Risks

| Risk | Mitigation |
|---|---|
| A packet trip is presented as having run | "Offered" wording rule; Verdict asks which ran; grep for "traveled to" in the ledger intro |
| The 29-trip ledger feels long | The Phase 1 stop asks; fallback is two years in `years` and the rest in `alsoOnRecord` |
| A leader's or student's name leaks from the packets, Voice issues or KH article | Roles only; the surname grep |
| A travel date leaks via a `note` or theme | Notes are "Winterim 2027"-style; the Feb/Mar grep |
| A 2028 packet posts between planning and implementing | Step 2 checks the US page's link first |
| The meta description passes 160 chars | `check:seo` fails loudly; fix in `src/lib/head.ts` |
| The override key is missing from a catalog | Phase 2 step 0 + `check:chrome` across all ten catalogs |

## Open questions

- **Should the sign-up card ship with deadlines already past?** **Default:** yes, labeled
  `2026 cycle` like Country Day's, unless step 2 finds a newer packet. The user can drop it
  at the Phase 1 review.
- **Should all four years stay in the ledger?** **Default:** all four. Use the fallback
  above if the user finds it long.
- **Should the travel-partner row (Joshua Expeditions, Grand Classroom, EF Tours) render?**
  **Default:** include. Drop it at review if it reads like advertising.

## Implementation notes

**Phase 1 (English), 2026-10-16.**

- **Step 2 found the Winterim 2025 packet**, so the plan's "no 2024–25 packet" gap is
  closed. The Parents' Hub Wayback snapshots (Sep and Dec 2024) link
  `2025WinterimPacket.pdf`. Its live URL is 404, but CDX holds a 2024-09-21 capture, now
  cited as **WP25** (`'Winterim 2025 packet (Wayback, Sep 2024)'`). It lists 6 trips abroad:
  Cuba (Samaritan's Feet), the Dominican Republic (SCORE), Ireland, Italy, Montréal + Québec
  City, and Panama. Puerto Rico is filed under Domestic and is excluded, as in 2023.
  Knock-on changes, all recorded in the Source URLs file under "Implement-time
  verification":
  - **35 trips over five Winterims** (not 29 over four); the headline says "Thirty-five".
  - **17 countries** (Cuba and Ireland added); the tile note is "our count from five
    Winterims, 2023–2027".
  - "Seven or eight trips abroad a year" becomes **"six to eight"** in the lead and the
    Verdict summary.
  - The SCORE ledger gains a `2024–25` row.
  - The Samaritan's Feet cell names Cuba ("Baja California, Lisbon and Cuba, offered in four
    Winterims from 2023 to 2027").
  - The Verdict's "2025" question is dropped, leaving **eleven** questions.
- **No 2028 packet.** The Upper School page still links `ba353ab7-…` (2027). The US, DIV,
  CURR, APPLY and WP27 pages are unchanged.
- **EN2922 supports winter 2020** ("2019-20 donors", 2020 honors, a "Feb. 6-8" musical), so
  the alsoOnRecord row reads "Italy, winter 2020".
- **No division filter renders.** `InternationalTravel.tsx` shows the tabs only when
  `divs.size >= 2`, so a single-division ledger has none. The trips headline therefore drops
  the other schools' closing "Filter by division." The Phase 1 browser check confirms 0 tab
  rows.
- **Photo:** `23_US-Winterim-4.png` is already a JPEG at 800×533 and was saved as is.
- **Defaults taken:** the travel-partners row is included; insurers are not named; the
  crayon drive is omitted; the sign-up card ships as the `2026 cycle`; all five years stay in
  the ledger.


**Phase 2 (locales), 2026-10-17. PR #352.**

- **Splice:** 834 kept, 227 added, **0 dropped** in all nine locales. Nine parallel
  translators each wrote a stamp → translation map to a private scratch directory, and
  the maps were applied centrally by stamp. The first run hit the weekly usage limit before
  writing anything; the re-run completed.
- **Goal names needed no decision.** The five Winterim goal names are not extracted
  (skipped as proper names, like Country Day's framework), so they render English as the
  default intended.
- **Cross-locale fixes:**
  - The two quoted school sentences are kept verbatim in English in all nine locales, per
    every rollout doc; es/fr/it/ht/ar had translated them and hi had added a gloss.
  - "Lord of All Nations" stays English everywhere (es/bn had translated it).
- **fa bidi fix the plan did not anticipate.** In fa, a digit-led sentence after a
  Latin-ending lead joins the lead's LTR run, so three rows drew wrong. Two read
  `31 دانش‌آموز…` after a SCORE lead and one read `J-Term، 40 نفر`. All three were
  restructured so the digit follows Persian text (*در آن سال 31…*, *جمعاً 40*). This was
  verified by glyph x-position in real Chrome; ar was clean.
- **Left as is:** short grade ranges (`10–12`) draw in RTL order in fa/ar on every
  school (Providence Day 16/18, Country Day 11/13). It is a site-wide render question,
  recorded in NOTES.
- **Process slip:** a mid-audit `npm run build` replaced `dist/` and killed the first
  `audit:daterender`/`audit:moneyrender` run. Both were re-run clean against the final
  build.
