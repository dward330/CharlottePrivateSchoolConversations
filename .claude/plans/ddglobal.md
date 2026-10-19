---
name: ddglobal
title: Add Davidson Day School to Global Exposure — six cards (exchanges, signup and community omitted; credential "The Global Studies Diploma Distinction"; network "AFAR & the Archaeology Conferences"), nine AFAR summer digs over three school years with AFAR's grade bands credited to AFAR; no prices or exact travel dates on the page
status: implemented
phases: 2
created: 2026-10-18
branch: feat/ddglobal
prs: [355]
---

# Davidson Day School — Global Exposure

## Goal

Give Davidson Day School a **Global Exposure** section (slug `international-travel`). It is
the sixth school, after Providence Day, Charlotte Country Day, Charlotte Latin, Cannon and
Charlotte Christian. Davidson Day's global program is narrow and unusual. Its travel is
**AFAR**, the American Foreign Academic Research archaeology field school, which the school's
Director of Global Studies founded and leads. AFAR runs summer digs in Spain, Portugal and
Belize, and students present their research at university conferences. The program is
paired with an Upper School credential, the **Global Studies Diploma Distinction**. The
section's value to a parent is that research pathway, the credential's requirements, and an
honest list of what the school's website does not say.

It works when `/school/davidson-day/` renders the section after Course Offerings with
**six cards** in registry order:

**Where They Go · Global Learning at Each School Level · The Global Studies Diploma
Distinction · AFAR & the Archaeology Conferences · Firsts & Milestones · Verdict & Ask the
School**

The section also has to meet these rules:

- Every fact cites a davidsonday.org page or a Wayback copy of one. The one exception is
  AFAR's grade bands and group sizes, which come from goafar.org (decision 1).
- No student, parent, teacher or trip leader is named.
- No trip price, deposit, fee or exact travel date renders.
- The other five schools' sections are byte-for-byte unchanged.

## Context

**The area today.** Read these before step 1, including their Implementation notes:

- `.claude/plans/christianglobal.md` (#352). It is the most recent precedent, and its Phase 2
  is the method.
- `cannonglobal.md` (#351). The closest in shape: a compact section with a credential and a
  network card.
- `ccdglobal.md` (#344), the standard.
- `gestandard.md` (#348).
- PR #350 (fa/ar year-range isolates).

Where things live (all confirmed at planning, 2026-10-18):

- **Types, registry and loaders:** `src/data/internationalTravel.ts` holds the types, the
  registry, `TITLE_OVERRIDES`, `PROGRAMS` and the overlay loader. The registry is
  `INTERNATIONAL_TRAVEL_CARDS`: `trips, exchanges, signup, community, start, credential,
  network, milestones, verdict`.
- **Model file:** `src/data/internationalTravel/charlotte-country-day.ts`. Copy its header
  comment, URL constants, `'<domain> — <page>'` labels, network ledger and `milestones`.
- **Credential model:** the `credential` block in
  `src/data/internationalTravel/providence-day.ts` (stats, required, beyond, optional quote
  and award). `cannon.ts` is the compact version (one stat, no quote, no award).
- **Data rules:** `src/data/internationalTravel/README.md`.
  - A card the school publishes nothing for is left out (omit-to-hide).
  - Gaps appear only in `verdict.ask`.
  - Figure fields hold figures only: `stats[].value`, ledger `year`, milestone `year`.
  - Quote marks only where they mean something.
  - Where pages give different figures, the most current one wins.
- **Renderer:** `src/components/InternationalTravel.tsx` needs **no change**.
  - The division tabs render only when `divs.size >= 2` (line 205). Every Davidson Day trip
    is `div: 'US'`, so **no filter renders**. The trips headline therefore does not end
    with "Filter by division." (christianglobal Implementation notes).
  - The credential `quote` and `award` render only when present (lines 437, 443).
  - The network ledger renders only when `conferences.length > 0` (line 455).
- **Comments that list the researched schools** need Davidson Day added (comments only):
  - `src/data/internationalTravel.ts:280`
  - `src/pages/SchoolDetail.tsx:961`
- **Export name:** `scripts/i18n_topics.mjs:98` maps `'davidson-day'` → **`davidsonDay`**,
  so the export is `export const davidsonDay: InternationalTravelProgram`.
- **i18n fields:** `scripts/i18n_fields.mjs` already classifies every path this school uses,
  because Providence Day and Cannon ship `credential` and Country Day ships the rest.
- **Splicing:** splice the new school into existing work files with
  `scripts/i18n_splice_work.mjs`. **Never re-extract** (memory
  `splice-not-reextract-for-new-school`).
- **Chrome:** the shared `cards.international-travel.*` and `travel.*` keys in
  `src/locales/en.json` name no school. Checked at planning: no school-specific leak. The
  only chrome change is **two new keys**, `credential@davidson-day` and
  `network@davidson-day`. The precedents are `credential@cannon` and `network@cannon`
  (`en.json` lines ~427–429).
- **Photos:** every existing `public/travel/` photo is a `.jpg`.

**The research.** It was written during `/global-exposure` on 2026-10-18 and is uncommitted.
It is ingested in step 1.

- `source-material/international-travel/davidson-day/Davidson Day - International Travel - Deep Research.md`
  is the PDF transcription. It is a lead sheet and is never cited.
- `…/Davidson Day - International Travel - Source URLs.md` is **the citation record**. It
  contains:
  - the page keys: GSD, DIST, B-2026, B-2024, B-SPACH, B-DD, MS, US, CC, DIR, TUI, FUND,
    **WB-IT-FEB, WB-IT-MAR, WB-GSDP, WB-GSDP-25, WB-IR**, and the AFAR keys AFAR-ES,
    AFAR-PT, AFAR-BZ, AFAR-HIST, AFAR-AID;
  - the Verified table;
  - an AFAR detail table (grades, group, lodging; prices and dates marked research only);
  - a "Not verified" table;
  - conflicts and spellings;
  - photo candidates.

  **Only fetched or Wayback rows may render, plus the AFAR grade and group columns.** Use
  the keys exactly.

**What verification changed.** The headline finding is that **the school's International
Travel page is gone**: `/student-life/international-travel` returns 404 and has left the
site nav. The older Global Studies Diploma Program pages are 404 too. Their text survives
on Wayback, so those facts are cited by their Wayback copies. The deep-research PDF was
also wrong or incomplete on these points:

- The PDF could not retrieve the 2026-10-05 post "Four Students, Three Countries, One
  Summer of Fieldwork" (B-2026). **It loads.** It confirms the summer 2026 digs and says
  2026 was **AFAR's final season at Cahal Pech**, after 20 seasons. In 2027 the Belize
  project moves to **Baking Pot**. It also mentions **Pook's Hill**, a Belize project open
  only to Davidson Day alumni.
- The PDF did not check Wayback. The archived **International Research** page (WB-IR, 2023
  and 2024 copies) gives the school's own history: AFAR "Since inception in 2006"; Cahal
  Pech since 2006, with western-ball-court work since 2015; Mieza, Greece since 2017 ("the
  2017 and 2018 research trips"); a Helsinki conference "in early 2020".
- The **Middle School Spain/France trip** is on the February 2026 Wayback copy only. It is
  gone from the March 2026 copy.
- AFAR's Spain band is **8th** to 12th grade now, not the PDF's 7th.
- The 2017 news story (`news-detail?pk=964700`) is 404 with **no Wayback copy**, so its
  "Oct. 20" presentation is dropped. Greece is still verified through WB-IR.

## Decisions

**User decisions** (AskUserQuestion at `/global-exposure` B4, **2026-10-18**). This is the
approval record.

1. **AFAR detail: "Yes, credited 'per AFAR' (Recommended)".**
   - Trip rows may show AFAR's grade bands and group sizes from goafar.org: Spain 8th–12th,
     Portugal 10th–12th, Belize (Baking Pot) 9th–12th; "up to 18 students" per session.
   - They are worded as AFAR's figures, under the outside-program exception.
   - Prices and dates still never render.
2. **Middle School Spain & France trip: "Also on the record (Recommended)".**
   - It becomes one `alsoOnRecord` line citing WB-IT-FEB, plus a Verdict question asking
     whether it still runs.
   - It is not a ledger row, because it has no school year.
3. **Network title: "AFAR & the Archaeology Conferences (Recommended)".**
4. **Credential title: "The Global Studies Diploma Distinction (Recommended)".**

```ts
TITLE_OVERRIDES['davidson-day'] = {
  credential: 'The Global Studies Diploma Distinction',
  network: 'AFAR & the Archaeology Conferences',
}
```

The keys are `cards.international-travel.credential@davidson-day` and
`cards.international-travel.network@davidson-day`.

**Omitted cards.** Each gap becomes a Verdict question.

- **`exchanges`**: no partner school, exchange or homestay is published, and AFAR lodging
  is inns, resorts and rental houses.
- **`signup`**: no school deadline is published. AFAR's dates are travel dates, which never
  render.
- **`community`**: fewer than 3 verified cells, the threshold set in `pdcommunity.md`.
  The community-partner list is local service, apart from AFAR itself.

**Per-card standard** (vs Country Day), recorded at B4:

| Card | Status | Reason |
|---|---|---|
| Lead + stats | at standard | 4 pure-figure tiles |
| `trips` | **below standard** | Only AFAR digs; the one Middle School trip is undated (decision 2). No homestays. Grade and group come from AFAR only, and only for the announced 2027 sessions. No selection method is published. |
| `exchanges` | omitted | nothing published |
| `signup` | omitted | no school deadlines |
| `community` | omitted | fewer than 3 verified cells |
| `start` | **below standard** | No school framework; Lower School has only Spanish. |
| `credential` | at standard, minus counts and award | Full current requirements; no graduate count or award is published. |
| `network` | **below standard** | No Round Square-type membership; AFAR plus a three-row conference ledger. |
| `milestones` | at standard | 9 dated events, all from school pages |
| `verdict` | at standard | ~12 questions |

**Lead.**

- strong: Davidson Day's travel is AFAR, the American Foreign Academic Research
  archaeology field school. AFAR sends students each summer to dig alongside professional
  archaeologists in Spain, Portugal and Belize, and to present their research at university
  conferences (WB-IT-MAR, B-2026, B-2024).
- muted: It pairs with the Global Studies Diploma Distinction, an Upper School pathway
  offered since 2021, and most students in it take part in AFAR (GSD).
- Wording may tighten. **Do not claim the Middle School travels today** (decision 2), and
  do not name the director.

**Stat strip.** All pure figures, each with a whose-count note:

- `3` · countries with AFAR digs · "Spain, Portugal and Belize, per the school" (WB-IT-MAR, B-2026)
- `20` · seasons at Cahal Pech · "2006–2026, in western Belize, per the school" (WB-IR, B-2026)
- `10` · students presented at Mount Royal University · "in Calgary, fall 2024, nine of them in the Global Studies Diploma" (B-2024)
- `2021` · Global Studies Diploma Distinction began · "per the school" (GSD)

**Trips ledger.** Newest first. Every trip is `div: 'US'`: the school files AFAR under
"Upper School International Travel and Research" (WB-IT-MAR), even though AFAR's Spain band
starts at 8th grade. `timing` is the season (`'Summer 2027'`). It is never a date, even
though Spain 2027 starts in late May. No `noteByDiv`, since there is one division. No
`homestay`. `group` follows decision 1, and **only on the 2026–27 rows**, which are the
sessions AFAR's current pages describe. Earlier years carry no `group`, because AFAR's
bands are current figures.

- **`2026–27`**: `note: 'Summer 2027, as announced'` (B-2026, AFAR pages).
  - Spain · Zorita de los Canes · `group: '8th–12th grade · up to 18 students per session, per AFAR'` · the medieval castle excavation.
  - Portugal · Tróia · `group: '10th–12th grade · 18 students per session, per AFAR'` · the Roman fish-salting town, buried and preserved under sand.
  - Belize · Baking Pot · `group: '9th–12th grade · up to 18 students, per AFAR'` · AFAR's first season at a new Maya site, about 20 minutes upriver from Cahal Pech.
- **`2025–26`**: `note: 'Summer 2026'` (B-2026, WB-IT-MAR).
  - Spain · Zorita de los Canes · its 11th field season · two of the castle's rooms and an underground chamber.
  - Portugal · Tróia · on record since 2018.
  - Belize · Cahal Pech · the final season of 20 at the Maya site.
- **`2023–24`**: `note: 'Summer 2024'` (B-2024). Belize, Portugal and Spain. `place` names
  Cahal Pech, Tróia and Zorita de los Canes, the three sites the school listed in 2024
  (WB-IR, Aug 2024). Theme: research that students later presented in Calgary.

That makes **nine trips** across three school years. The headline gives that count (e.g.
"Nine AFAR digs over three summers — 2024, 2026 and the announced 2027 — in Spain, Portugal
and Belize."). **No summer 2025 row**: it is implied only by a named student's words in
B-2026.

**`trips.alsoOnRecord`** (lead + one sentence each):

- *Middle School, Spain & France.* The school's travel page described a summer language
  and cultural immersion trip to Madrid, Toledo and Paris, with a Flamenco evening and a
  Paris cooking class. It appears in early 2026 and is gone from later copies (WB-IT-FEB,
  decision 2).
- *Greece, 2017–18.* AFAR dug at Mieza, the ancient Macedonian city, in the 2017 and 2018
  research trips (WB-IR).
- *North Carolina, November 2024.* 13 students worked on the Adam Spach Rock House
  excavation in Winston-Salem, the first high school students to work on a site with the
  North Carolina State Historic Preservation Office, per the school (B-SPACH).

Pook's Hill (alumni only) is the network card's row, not an `alsoOnRecord` line.

**`trips.intro`.**

- strong: Students work alongside professional archaeologists, with lectures and excursions
  built into each day (WB-IT-MAR).
- muted: The school's travel page no longer appears on its site, so the newest trip details
  come from a fall 2026 school story (B-2026). Keep it to that fact: no speculation about
  why.

**`trips.photo`:**

- Source: the og:image of B-2026, `2026AFAR.png` (1200×800). It shows the Tróia dig team
  with a "TRÓIA" pennant.
- Convert and save as `public/travel/davidson-day-troia-2026.jpg` (the other
  `public/travel/` photos are JPEGs). This supersedes the `.png` name in the Source URLs
  file.
- `alt`: "Davidson Day AFAR students and archaeologists at the Tróia excavation in Portugal".
- `caption`: `{ title: 'Tróia, Portugal', text: 'The AFAR team at the Roman site of Tróia, summer 2026.' }`.
- `credit`: `'Photo: Davidson Day School'`.
- B-2026's inline caption ("Left to right: …") names students but belongs to a different
  image. Never copy it.

**`start`.** No `framework`, since the school publishes none.

- intro.strong: from US: the curriculum equips students "to lead on the global stage". Use
  the school's line or paraphrase it; GSD's "an increasingly interconnected world" is the
  alternative.
- intro.muted: travel begins in the Upper School, through AFAR.
- `divisions`:
  - **Early Childhood & Lower School · age 2–grade 4** (Davidson Day starts at "two years
    old")
    - Spanish, taught by an Early Childhood & Lower School Spanish teacher (DIR).
  - **Middle School · 5–8**
    - Spanish, and French with the Upper School (DIR).
    - Students ready for the next level take world language classes in the Upper School (MS).
    - A summer trip to Spain and France was on record in early 2026 (WB-IT-FEB). Optional
      here, since it is already in `alsoOnRecord`. **Default:** omit it here.
  - **Upper School · 9–12**
    - AFAR's summer digs in Spain, Portugal and Belize (WB-IT-MAR).
    - The Global Studies Diploma Distinction, applied for at the end of sophomore year (B-DD).
    - French and Spanish through AP (GSD).
    - Honors Anthropology, and Research Methods and Capstone Research in 11th and 12th grade (GSD).
- `divisions[].grades` is a **skipped grade-code field** (`scripts/i18n_fields.mjs:451`),
  so it holds codes only: `'EC–4'`, `'5–8'`, `'9–12'`. The "age 2" wording goes in the item
  text ("Spanish from Early Childhood, which starts at age two").

**`credential`** (title per decision 4; model Providence Day's block).

- headline: e.g. "An Upper School distinction since 2021: Honors Anthropology, four global
  APs, a language, a 100-hour practicum and two years of original research, presented by
  every senior."
- intro.strong: the school's definition (GSD): it "prepares students to understand an
  increasingly interconnected world through rigorous academic study, language immersion,
  and transformative international experiences". Quoted, because it is the program's own
  statement.
- intro.muted: one of three Diploma Distinctions; students apply at the end of sophomore
  year and spend two years going deep (B-DD, DIST).
- `stats`:
  - `2021` · offered since · "per the school"
  - `4` · global AP electives · "chosen from six options"
  - `100` · practicum hours · "at least, in an approved internship, volunteer opportunity or pre-collegiate program"
- `required` (GSD, current page wins):
  - Honors Anthropology
  - Four of: AP World History or AP European History, AP Environmental Science, AP
    Psychology, AP Macroeconomics, AP with WE Service Recognition, AP Spanish or AP French
    Language & Culture
  - Level IV, or three levels of the same language in Upper School
  - At least 100 practicum hours, plus quarterly Ethics Labs
  - Research Methods Honors (11th grade) and Capstone Research Honors Mentorship (12th grade)
  - A capstone presentation at the Davidson Day Scholars Research Conference
- `beyond`:
  - AFAR field research in Spain, Portugal or Belize, which most students take (GSD)
  - Practicum experiences that often include international travel, research, language
    immersion or cross-cultural service (GSD)
  - Presenting research at academic conferences, such as Mount Royal University's (B-2024)
- No `quote` or `award`: no award is published, and the quotable lines in B-2024 come from
  named students or the director. **Default:** omit `quote`.
- **The old program rules never render** (WB-GSDP): two weeks of international field
  research and four levels of a language. "Is international research still required?" is a
  Verdict question.

**`network`** (title per decision 3).

- intro.strong: AFAR is the school's partnering archaeology field school. It has run for
  more than 20 years, and more than 500 students have taken part in its projects, per the
  school (B-2026). That figure is AFAR-wide, so say so.
- intro.muted: students present at academic conferences to "close the scientific cycle"
  (WB-GSDP), and AFAR hosts conferences of its own (WB-IR).
- Do **not** write "belongs to no network" (latinglobal lesson).
- `ledgerTitle: 'Academic conferences'`. `conferences` rows:
  - `2025–26`: Mount Royal University's archaeology conference in Calgary and Banff · a
    Maya-themed conference at Disney's Coronado Springs Resort in Florida, hosted by AFAR
    and other archaeologists · excavations in Friedberg, North Carolina (WB-GSDP-25,
    WB-GSDP). These were offered "this academic year", so word them as opportunities, not
    attendance.
  - `2024–25`: Mount Royal University, Calgary · 10 students gave three presentations on
    their summer 2024 research (B-2024).
  - `2019–20`: a collaborative keynote lecture and presentation at a conference hosted by
    the National Museum of Finland in Helsinki, early 2020 (WB-IR).
- `cells`:
  - **AFAR**: the school calls it its partnering international archaeological field school;
    a community partnership (B-2026, CC).
  - **AFAR's conferences**: AFAR hosts two international conferences on Maya archaeology
    each year, including Maya at the Playa, held virtually (WB-IR).
  - **NC State Historic Preservation Office**: the 2024 Adam Spach Rock House dig, with the
    Environmental Research Group (B-SPACH). Name the organizations, never the people.
  - **Optional, BVAR** (Belize Valley Archaeological Reconnaissance Project): AFAR's Belize
    partner. This is a **third-party** fact (AFAR-BZ), allowed under the outside-network
    exception. **Default:** include it. The school's own WB-IT-MAR names the "Belize Valley
    Archaeological Reconnaissance Project" as its Belize project, so cite **WB-IT-MAR**
    and the cell needs no third-party source.
- `rows` is required on `NetworkCard`, and the renderer emits its `.it-rows` wrapper
  unconditionally, so do not ship `rows: []`. Ship one row:
  - **For alumni**: Pook's Hill in Belize is an AFAR project open only to Davidson Day
    alumni; a 2026 graduate served as one of its two lab directors (B-2026). Name nobody.

**`milestones`.** Oldest first, pure-figure `year`. Firsts are worded "per the school".

- `2006` · AFAR begins · Research starts at the Maya site of Cahal Pech in western Belize (WB-IR).
- `2015` · The western ball court · Cahal Pech work turns to the ball court beside the royal palace plaza (WB-IR).
- `2017` · Greece · AFAR begins at Mieza, the ancient Macedonian city (WB-IR).
- `2018` · Portugal · Research begins at the Roman city of Tróia (WB-IT-MAR).
- `2020` · Helsinki · Students give a keynote lecture and presentation at the National Museum of Finland (WB-IR).
- `2021` · The Global Studies Diploma · The distinction is first offered (GSD).
- `2024` · A North Carolina first · The first high school students on a dig with the State Historic Preservation Office, per the school (B-SPACH).
- `2026` · Cahal Pech ends · The 20th and final season at the site (B-2026).
- `2027` · Baking Pot · The Belize project moves to a new Maya site (B-2026).

**Never compute** a Zorita start year (pages say 2014, "six summers" and "11th season").

**`verdict`.**

- `standsOut.summary`: Davidson Day's global program is unlike any other school's here.
  Its travel is archaeological research rather than tourism. Students dig alongside
  professionals in Spain, Portugal and Belize, and present their findings at university
  conferences, inside a two-year Upper School research distinction.
- Points (~4):
  - Summer field research at three active sites, one of them on record for 20 seasons.
  - Student research presented at Mount Royal University, 10 students in fall 2024.
  - A credential with two years of original research and a senior capstone.
  - The first high school dig with the North Carolina State Historic Preservation Office, per the school.
- `ask` (one per gap):
  - **Travel page**: the school's International Travel page has been removed. Where does it
    now publish its trips?
  - **Middle School**: does the Spain and France summer trip still run, and from what grade?
  - **Grades**: AFAR sets its own grade bands. What is the earliest grade a Davidson Day
    student can join?
  - **Cost**: what does a dig cost a Davidson Day family, and what does the Field
    Experience fee cover? Never render the fee or AFAR's prices.
  - **Aid**: does school financial aid cover AFAR or any trip, beyond AFAR's own assistance?
  - **Selection**: how are places decided when a session fills?
  - **Safety**: chaperone ratios, insurance, and who leads each trip?
  - **Exchanges**: any exchange, sister school or homestay?
  - **Research requirement**: does the Distinction still require international field
    research, as the older program page did?
  - **Graduates**: how many students have earned the Distinction since 2021?
  - **Scale**: how many Davidson Day students go on AFAR each summer?
  - **Beyond archaeology**: the school says international service trips and language
    immersion are to come. When?
  - **Continuity**: the program is led by the founder of AFAR. Who would run it otherwise?
  - Trim to ~12 at the Phase 1 review if it reads long.

**Privacy.**

- Never rendered: AFAR's prices, deposits, the Field Experience fee, exact travel dates
  (e.g. the 2027 sessions), and any name.
- B-2024, B-SPACH and B-2026 name students. B-SPACH names parents and archaeologists. The
  older pages name the director, the college counselor and a division head. Take roles and
  facts only, and refer to "the Director of Global Studies" if the role is needed at all.
- `timing` is the season and year.

**Conflicts.** The current page wins:

- AFAR stands for "American Foreign **Academic** Research" (WB-IT-MAR, B-2026), not
  "Archaeological" (B-2024).
- The Calgary host is **Mount Royal University**, not the University of Calgary (WB-IR).
- The Distinction requirements come from GSD, not WB-GSDP.
- AFAR began in **2006**. AFAR-HIST's meta tag says 2007, which is the incorporation.
- Spelling: Tróia, with the accent.

**No Compare change.** The area stays in `COMPARE_DEFERRED_TOPICS`.

**Third-party facts that render** (list them in the PR body):

- AFAR's grade bands and group sizes on the three 2026–27 rows (decision 1).
- Nothing else. BVAR is cited from the school's own WB-IT-MAR.

## Approvals needed

**None outstanding.**

- Adding a school to an existing area with existing cards needs no UX approval.
- Both title overrides and the AFAR exception were approved on 2026-10-18 (Decisions).
- The user reviews wording at the Phase 1 stop.

`npm run deploy` is **not** part of this plan. Merging is not publishing.

## Source material

Both files were written during `/global-exposure` on 2026-10-18. They are **uncommitted**,
and `/implement` ingests them in step 1:

- `source-material/international-travel/davidson-day/Davidson Day - International Travel - Deep Research.md`
- `source-material/international-travel/davidson-day/Davidson Day - International Travel - Source URLs.md`

The PDF itself is not on disk. The transcription is the committed record.

## Out of scope

- Exchanges, Signing Up and Community cards for Davidson Day.
- Renderer, type or registry changes, and chrome keys beyond the two `@davidson-day` keys.
- Any change to the other five schools' data.
- Compare rows, `VALUE_METRICS` and home-grid cells.
- Charlotte Magazine, Lake Norman Publications and the AFAR documentary (secondary, about
  the school or a person).
- A podcast episode, `npm run deploy` and the news Worker.

## Steps

### Phase 1 — English

1. **Branch, commit and ingest the source files.**
   - `git checkout main && git pull && git checkout -b feat/ddglobal`.
   - `git add` the two source-material files **by explicit path**, plus this plan and
     `INDEX.md`, and commit.
   - Run the `ingest-source-material` skill for `international-travel`:
     `python .claude/skills/ingest-source-material/build_docs.py international-travel`, then
     `python scripts/build_site_content.py`, then `node scripts/check_metrics.mjs`.
   - Run `git status --short`, then commit **only this topic's paths** (memory
     `ingest-full-rebuild-sweeps-topics`).

2. **Close the verification gaps and update the Source URLs file.**
   - Re-fetch GSD, B-2026, MS, US, DIR and CC (`curl -sL`, browser UA), and confirm nothing
     moved since 2026-10-18.
   - **Check whether the International Travel page has come back**, at its old URL or a new
     one: search the site nav and `https://www.davidsonday.org/student-life`. If it is back,
     it replaces the Wayback citations, and its Middle School section, if present, settles
     decision 2's Verdict question.
   - Re-fetch AFAR-ES, AFAR-PT and AFAR-BZ, and confirm the grade bands and group sizes.
   - Optional: open the Issuu Distinctions brochure linked from GSD. If it gives a graduate
     count or cohort size, add a credential stat and drop the Verdict's "Graduates"
     question.
   - **Photo:** download `2026AFAR.png`, **open it**, confirm no legible name or caption,
     then convert it to JPEG (`sips -s format jpeg … --out public/travel/davidson-day-troia-2026.jpg`)
     at the scale of the other `public/travel/` images.
   - Record every result under an **"Implement-time verification"** heading. Drop any fact
     that is still PDF-only.

3. **Davidson Day data: new `src/data/internationalTravel/davidson-day.ts`.**
   - It exports `davidsonDay: InternationalTravelProgram`.
   - Model it on `charlotte-country-day.ts`, with the credential from `providence-day.ts`.
     The header comment covers provenance, the verification date and the rules followed.
     It also states:
     - the school's International Travel page is gone, so its facts cite Wayback;
     - AFAR's grade bands and group sizes are credited to AFAR (user decision 2026-10-18);
     - `exchanges`, `signup` and `community` are omitted.
   - URL constants are named after the Source URLs keys: `DDS = 'https://www.davidsonday.org'`,
     `BLOG = \`${DDS}/p/~board/all-blogs/post\``, then `GSD`, `DIST`, `B_2026`, `B_2024`,
     `B_SPACH`, `B_DD`, `MS`, `US`, `CC`, `DIR`, `WB_IT_FEB`, `WB_IT_MAR`, `WB_GSDP`,
     `WB_GSDP_25`, `WB_IR`, `AFAR_ES`, `AFAR_PT`, `AFAR_BZ`. Wayback URLs are the
     **non-`id_`** form in the Source URLs page-key table.
   - Source labels:
     - `'davidsonday.org — <page>'`;
     - Wayback copies as `'International Travel (Wayback, Mar 2026)'`,
       `'International Travel (Wayback, Feb 2026)'`,
       `'Global Studies Diploma Program (Wayback, Feb 2026)'`,
       `'Global Studies Diploma Program (Wayback, Nov 2025)'` and
       `'International Research (Wayback, Aug 2024)'`;
     - AFAR pages as `'goafar.org — Spain'` etc., **only** in `trips.sources`.
   - **Every fact traces to a fetched or Wayback row**, or to the AFAR grade and group
     columns.
   - Content follows Decisions: `lead`, `stats`, `trips`, `start`, `credential`, `network`,
     `milestones`, `verdict`. Every card's `sources` lists only the pages behind its facts.
   - Omit `exchanges`, `signup` and `community`.

4. **Register in `src/data/internationalTravel.ts`.**
   - Import `davidsonDay` from `./internationalTravel/davidson-day.ts` and add
     `'davidson-day': davidsonDay` to `PROGRAMS`.
   - Add the `TITLE_OVERRIDES['davidson-day']` entry from Decisions.
   - Update the comment at line 280 to include Davidson Day, and the matching comment at
     `src/pages/SchoolDetail.tsx:961`. Comments only; no type or registry change.
   - **Chrome, `src/locales/en.json`:** add
     `"international-travel.credential@davidson-day": "The Global Studies Diploma Distinction"`
     and `"international-travel.network@davidson-day": "AFAR & the Archaeology Conferences"`
     beside the other `@slug` keys. Do not touch the other nine catalogs in Phase 1.

5. **Update `src/data/internationalTravel/README.md`.**
   - Change five schools to six, adding Davidson Day (`.claude/plans/ddglobal.md`, 2026-10-18).
   - Add both titles to the `TITLE_OVERRIDES` examples.
   - Note two firsts: the first section whose school removed its travel page, so it is built
     from Wayback copies and fall 2026 school posts; and the first to render a third-party
     figure on a trip row (AFAR's grade bands, by user decision).

6. **i18n classification.** Run `node scripts/i18n_extract.mjs --report --residual`. No new
   field paths are expected. If anything appears under international-travel, classify it in
   `scripts/i18n_fields.mjs` until the report reaches 0. This step also settles the `start`
   `grades` wording (Decisions).

7. **Regenerate and check.**
   - `npm run schema && npm run check:schema`.
   - `npx tsc -b` (**not** `--noEmit`).
   - `npm run build`. Every chained gate must pass, including:
     - `check:seo`: Davidson Day's meta description gains Global Exposure and must stay
       ≤160 chars. If it overflows, fix it in `src/lib/head.ts` and record the fix.
     - `check:photos`.
     - `check:live`.
   - Run the greps and browser checks under Verification → Phase 1.

8. **Commit Phase 1** on `feat/ddglobal`.
   - Run `git status --short` first, then stage explicit paths only: the data file,
     `internationalTravel.ts`, `SchoolDetail.tsx`, `src/locales/en.json`, the README, the
     photo, the ingest outputs, `DATA-SCHEMA.md`, the Source URLs file, this plan and
     `INDEX.md`.
   - Push, then verify `git rev-parse HEAD` against `git ls-remote origin feat/ddglobal`.
   - Set this plan to `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review. No PR is opened in
Phase 1.**

Tell the user to run `npm run dev` and open `/school/davidson-day/` with every card open, at
desktop width and at 390px. Ask specifically about:

- Whether a section with **no Middle School travel in the ledger** is fair to the school, or
  whether the Spain & France trip should be more prominent than an `alsoOnRecord` line.
- The "per AFAR" wording on the 2026–27 rows.
- The lead and the four tiles, especially `20` seasons at a site AFAR has now left.
- The trips intro's line that the school's travel page is gone. Fair, or too pointed?
- The Verdict's length (~13 questions) and the Continuity question's tone.

### Phase 2 — Every other locale

There are two layers. Re-read both lists first, because they can grow.

0. **UI chrome: the nine non-`en` catalogs in `TRANSLATED`** (`src/lib/i18n.ts`, currently
   `es bn ht te fr fa it hi ar`).
   - Add and translate `credential@davidson-day` and `network@davidson-day` by text
     insertion after `network@charlotte-christian`.
   - "AFAR" stays in Latin script.
   - Follow each catalog's rendering of `credential@cannon` and `credential@providence-day`
     for the credential, and `network@cannon` for the network.
   - Never normalize key order in `ar.json`.

Then the research prose, per `PROSE_TRANSLATED`. The mechanism is in
`.claude/docs/prose-translation-architecture.md`; the method is christianglobal Phase 2.

1. **Splice, never re-extract:**
   `node scripts/i18n_splice_work.mjs --lang <code> --topic international-travel` for each
   locale. The dropped-stamp count for the other five schools must be **0**.
2. **Translate** Davidson Day's new strings for each locale, keyed by stamp, never by index.
   - Parallel agents get **one scratch directory each** and write only stamp → translation
     maps, which are applied centrally (memory `parallel-locale-agents-collide`).
   - Use each locale's existing Global Exposure renderings as the glossary.
   - Standing rules:
     - Figures stay char-for-char: `3`, `20`, `10`, `2021`, `100`, `18`, `13`, `500`, school
       years, grade ranges.
     - These names stay in Latin script: Davidson Day, AFAR, American Foreign Academic
       Research, Global Studies Diploma Distinction (as a program name), Zorita de los
       Canes, Tróia, Cahal Pech, Baking Pot, Pook's Hill, Mieza, Mount Royal University,
       Maya at the Playa, Disney's Coronado Springs Resort, Adam Spach Rock House,
       Environmental Research Group, Belize Valley Archaeological Reconnaissance Project,
       Upper School, AP and every AP course name, Honors Anthropology, Davidson Day Scholars
       Research Conference.
     - The quoted GSD definition stays verbatim in English in every locale (christianglobal
       lesson).
     - `fa`/`ar` store no bidi isolates.
     - `hi`/`te` never pre-group digits.
     - Run `check:fr` for `fr`.
3. **Build:** `node scripts/i18n_build_overlay.mjs --topic international-travel --lang <code>`.
4. **`src/data/overlays/NOTES.md`:** add a Davidson Day subsection under Global Exposure
   with any soft spots, or "none".
5. **STOP for the user's test, with no PR yet.**
   - Commit, push and report the check results.
   - Tell the user to run `npm run build && npx vite preview`, then open
     `/school/davidson-day/?lang=es`, plus `fa` and `ar`.
   - End the turn.
6. **Ship only after the user confirms.**
   - Open the PR via `--body-file`. List the third-party AFAR figures in the body.
   - Flip this plan to `implemented` with Implementation notes, and the INDEX row to
     `Implemented` with the PR link.
   - Run `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.
   - **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/international-travel/davidson-day/*.md` (2) | new (written at planning); Source URLs gains implement-time rows |
| `src/data/schools.json`, `src/content/international-travel/davidson-day.json`, `.claude/docs/international-travel/davidson-day.md` | generated by ingest |
| `src/data/internationalTravel/davidson-day.ts` | new: the school's data |
| `src/data/internationalTravel.ts` | edit: import + `PROGRAMS` + `TITLE_OVERRIDES['davidson-day']` + comment |
| `src/pages/SchoolDetail.tsx` | edit: comment at line 961 only |
| `src/locales/en.json` | edit: two `@davidson-day` keys (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit: both keys translated (Phase 2) |
| `src/data/internationalTravel/README.md` | edit: six schools; the titles; the Wayback and AFAR-exception notes |
| `public/travel/davidson-day-troia-2026.jpg` | new |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `scripts/i18n_fields.mjs` | only if the residual report finds a new path |
| `src/data/overlays/international-travel.{9}.json` + work files | spliced + translated (Phase 2) |
| `src/data/overlays/NOTES.md` | edit (Phase 2) |
| `.claude/plans/INDEX.md`, `.claude/plans/ddglobal.md` | status + implementation notes |

## Verification

### Phase 1 — English

- [ ] `node scripts/check_metrics.mjs` — no new unmatched subtopic
- [ ] `npx tsc -b` — clean
- [ ] `node scripts/i18n_extract.mjs --report --residual` — 0 unclassified international-travel fields
- [ ] `npm run schema && npm run check:schema` — Davidson Day is listed with Global Exposure
- [ ] `npm run build` — every chained gate passes (`check:seo`, `check:photos`, `check:live`)
- [ ] `grep -n '\$[0-9]' src/data/internationalTravel/davidson-day.ts` — **no hits**
- [ ] `grep -nE "(May|June|July) [0-9]|[0-9]{1,2}(st|nd|rd|th)\b" src/data/internationalTravel/davidson-day.ts`
      — **no hits**. No travel date or session date renders.
- [ ] `grep -in "not stated\|not published" src/data/internationalTravel/davidson-day.ts` — hits only inside `verdict`
- [ ] `grep -in "Archaeological Research\|University of Calgary\|7th" src/data/internationalTravel/davidson-day.ts` — **no hits** (conflict losers)
- [ ] No person is named. Grep the file for `Saunders`, `Hill`, `Smith`, `Pritchard`,
      `Creswell`, `Cresswell`, `Mirro`, `Sturm`, `Palmer`, `Urban`, `Bishop`, `Griffith`,
      `Gray`, `Lanter`, `Awe`, `Lambeth`, `Ogle`, `Starnes`, `Rayment`, `Holden`, `Adkins`,
      `Lippiner`, `Ashe`, `Barsosky`, `Kamp`, `Berkman`. There should be no hits.
      (`Pook's Hill` is a place: exempt it, e.g. `grep -n "Hill" | grep -v "Pook"`.)
- [ ] `goafar.org` appears only in `trips.sources`
- [ ] Every `sources` URL is a fetched or Wayback row of the Source URLs file. Spot-check five.
- [ ] Trip count in `years` equals the headline's number (9 unless step 2 changes it)
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright,
      every `<details>` open, no `networkidle`):
  - `/school/davidson-day/`: the Global Exposure chip and rail item come after Course
    Offerings.
  - The lead, the **4 tiles** (3 / 20 / 10 / 2021) and **6 cards** appear in order: Where
    They Go · Global Learning at Each School Level · The Global Studies Diploma Distinction ·
    AFAR & the Archaeology Conferences · Firsts & Milestones · Verdict & Ask the School.
  - Where They Go: **no division tabs**; no homestay tag; the photo opens in the viewer and
    names nobody.
  - The network ledger heading is "Academic conferences", with one "For alumni" row.
  - `/school/providence-day/` (9 cards), `/school/charlotte-country-day/` (8),
    `/school/charlotte-latin/` (8), `/school/cannon/` (5) and
    `/school/charlotte-christian/` (7) are unchanged.
- [ ] `npm run audit:mobile` — passes at 320/360/390px
- [ ] `npm run audit:daterender` — no English-form date in the section
- [ ] Dark mode is legible

### Phase 2 — Locales

- [ ] Splice: 0 dropped stamps per locale
- [ ] `npm run check:chrome` — both `@davidson-day` keys present and translated in all ten catalogs
- [ ] `npm run check:runtime && npm run check:live` — all stamps resolve; gate 3 passes
- [ ] `python3 scripts/check_figures.py --topic international-travel --lang <code>` and
      `npm run check:sepdrift -- --lang <code>` for each of the 9 locales
- [ ] `npm run check:dates`, `check:fr`, `check:bidi`, `check:fa`, `check:hi`, `check:script`
- [ ] By-stamp integrity vs `main` (christianglobal method; `check_work_integrity.mjs`'s
      length assertion fails by design on a new-school splice): 0 lost, 0 mutated,
      0 overwritten, 0 empty new entries, 0 foreign-script, 0 bidi controls
- [ ] `npm run i18n:leaks -- --lang <code>`
- [ ] `npm run audit:daterender` and `npm run audit:moneyrender` — nothing new in the section
- [ ] `npm run audit:mobile` at 320px in translated locales
- [ ] Browser check in `es`, `fa` and `hi` with every card open. In `fa`/`ar`, the `2021` and
      `10` tiles, the ledger years and the `8th–12th`-style bands must read left-to-right
      (#350; christianglobal's fa digit-after-Latin-lead trap — "AFAR" ends many leads, so
      check every row that starts with a digit after it).

## Risks

| Risk | Mitigation |
|---|---|
| AFAR's figures read as the school's | "per AFAR" on every row that carries them; `goafar.org` only in `trips.sources`; the Phase 1 stop asks |
| A Wayback-only fact has changed on a page we cannot see | Step 2 re-checks for the travel page; the trips intro says the newest details come from fall 2026 |
| A name leaks from a blog post (they name every student) | Roles only; the surname grep |
| A travel date leaks (the 2027 sessions are in B-2026) | Notes and timing are season-only; the date grep |
| The section reads as a critique of a thin program | Verdict asks are neutral questions; the Phase 1 stop asks about tone |
| A one-division ledger renders an empty gap | Browser check; christianglobal confirmed the tab case |
| The meta description passes 160 chars | `check:seo` fails loudly; fix in `src/lib/head.ts` |
| An override key is missing from a catalog | Phase 2 step 0 + `check:chrome` across all ten catalogs |

## Open questions

- **Should the BVAR cell render?** **Default:** include it, cited to WB-IT-MAR, the
  school's own page. Drop it at review if it reads as padding.
- **Should the network card carry a Davidson College row?** **Default:** no, since the
  partnership is civic rather than global. The card's one row is Pook's Hill.
- **Should the Middle School `start` item repeat the Spain & France trip?** **Default:** no;
  it lives in `alsoOnRecord` only (decision 2).
- **Credential quote?** **Default:** none. The quotable lines come from named students or
  the director.

## Implementation notes

**Phase 1 (English) — built 2026-10-18 on `feat/ddglobal`.** Deviations from the plan:

- **Trips intro, muted line.** The International Travel page is still 404, but the Student
  Life page's "International Travel" tile now links to the Global Studies Diploma
  Distinction page. The line states that fact instead of "no longer appears on its site".
- **2023–24 rows get per-site themes** from WB-IR (Aug 2024): the western ball court, the
  Roman fish-salting factory and the castle above the Tagus River, each "· research later
  presented in Calgary". Repeating one theme three times read as a template.
- **Middle School `start` item** names Spanish and Upper School language classes only. The
  directory lists an *Upper School* French teacher, so "French with the Upper School" was an
  inference and was dropped.
- **Verdict** has 13 questions, all from the plan. The Continuity question is worded "How is
  it staffed and led beyond one person?", not "Who would run it otherwise?".
- **Defaults applied:** BVAR cell included, cited to WB-IT-MAR; no Davidson College row; no
  credential quote; Middle School trip in `alsoOnRecord` only. The Issuu brochure gives no
  graduate count, so the Graduates question stays.
- **Plan greps:** the date grep hits only grade ordinals (`8th–12th grade`, `11th field
  season`), and the conflict grep hits "archaeological research rather than touring" in the
  verdict. Neither is a real finding.

**Phase 1 verification:** `tsc -b` clean; residual 0; schema current; `npm run build` green
(check:seo, with the meta description at 151 chars; check:photos; check:live;
check:runtime). The Playwright check found 6 cards in order, tiles 3/20/10/2021, no tabs,
9 trips, the photo in the viewer, and no overflow at 1280 or 390 dark. The other schools
show 9/8/8/5/7 cards. `audit:mobile` passes.

**For Phase 2:** `audit:daterender` reports exactly one hit per locale (9):
`North Carolina, November 2024.`, an `alsoOnRecord` lead. That field is prose
(`i18n_fields.mjs:707`) and just isn't translated yet, so translating it must bring the
audit to 0.

**Phase 2 (locales), 2026-10-19. PR #355.**

- **Splice:** 1067 kept, 129 added and **0 dropped** in all nine locales. Nine parallel translators each wrote a stamp → translation map to a private scratch directory, and the maps were applied centrally by stamp.
- **Chrome:** both `@davidson-day` keys were added to the nine catalogs by text insertion after `network@charlotte-christian`. Key order is unchanged, ar included.
- **Central fixes:**
  - te and hi had worded "offered since" (the label under the `2021` tile) as a question. Both now use a postposition that reads after the year.
  - fa's "as announced" had gained "by the school", which the English does not say, so it was removed.
  - All nine kept the GSD quote verbatim, so no quote fixes were needed this time.
- **Deviation from the Verification list:** the plan asked that `8th–12th`-style bands read left-to-right in fa/ar. They draw in RTL order. Charlotte Christian (shipped and reviewed) does the same, because RichText isolates only `\d{4}–\d{2}` year ranges. That is the documented site-wide residual, so it was left unchanged rather than fixed for one school. In real Chrome there are 0 digit-after-Latin inversions in fa or ar.
- **fr adds a digit:** "sophomore year" is *10e année*, a digit the English lacks. It follows fr's shipped *12e année* for "seniors", passes `check_figures`, and is listed as a soft spot in NOTES.
- **Results:** `audit:daterender` is 0 in all nine locales; the Phase 1 hit is now translated. `audit:moneyrender` and `audit:mobile` (320px × 9 locales) are clean.
