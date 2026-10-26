---
name: global-exposure
description: >
  Build a school's Global Exposure research area (slug `international-travel`) from Claude
  deep research, in two modes. MODE A — no PDF yet: ask which school, then hand the user
  the deep-research prompt to paste into Claude deep research, in ONE copy-paste block.
  MODE B — the user attaches the resulting PDF: transcribe it into source-material, verify
  its claims against the school's own LIVE pages into a Source URLs citation record, map
  the findings onto the Global Exposure card registry, ask the user about any card to add
  or omit, then hand off to /plan. Use when the user types /global-exposure, or asks for
  "the deep research prompt for <school>'s global exposure / international travel", "a
  global exposure section for <school>", or attaches a global-travel research PDF for a
  school. Charlotte Country Day is the standard; going beyond it is welcome but needs the
  user's approval. This skill writes ONLY source-material and the plan (via /plan) — never app
  code.
---

# /global-exposure — from a deep-research prompt to a Global Exposure plan

The repeatable version of what built Charlotte Country Day's section
(`.claude/plans/ccdglobal.md`, 2026-10-12): **prompt → user runs Claude deep research →
PDF → verified research files → `/plan`**. Charlotte Country Day's section
(`.claude/plans/ccdglobal.md`, `src/data/internationalTravel/charlotte-country-day.ts`)
is the standard (named by the user, 2026-10-13), within reason, judged on what the
school's own website publishes. Providence Day's section (`.claude/plans/intltravel.md`)
was the original template and remains the model for the `credential` card, which Country
Day does not have. Going beyond the standard in data or UX is welcome, but always with the
user's approval.

## The standard: Charlotte Country Day

The bar each card is measured against in B4. It is Country Day's *depth*, not its facts.
A school that publishes less is not a defect: **a card the school cannot reach the bar on
is filled as far as verified facts allow, never padded; a card it cannot fill at all is
omitted and its gap goes to `verdict.ask`.**

- **Lead + stats:** a lead and up to 4 stat tiles, each a pure figure (`27`, `1988`),
  each with a `note` saying whose count it is ("per the school").
- **`trips`:** trips across every school year the site (or Wayback) documents — Country
  Day has 20 over three years. **Every trip carries grade, group size, selection method
  (in `theme`), season `timing` and `homestay`** where the school publishes them. Grade
  wording is ordinal ("8th grade · up to 15 students"). A multi-division year uses
  `noteByDiv`. Older or dropped trips go to `alsoOnRecord`; a dropped year's page is cited
  by its Wayback copy. A photo where the school publishes a usable one.
- **`exchanges`:** each sister school with outbound and inbound legs, `years` as a
  pure-figure span, homestays, `visitors`, and a photo where usable.
- **`signup`:** one group per division, every event tagged with an `audience`.
  Application and registration deadlines only — never travel dates or prices.
- **`community`:** pure-figure stats plus cells (ESL, international parents, visiting
  diplomats, cultural celebrations, global clubs — Country Day has 3 stats and 5 cells).
  **Rendered only with ≥3 verified cells** (`pdcommunity.md` → Decisions).
- **`start`:** the school's own framework (Country Day's 4 pillars) where it publishes
  one, plus divisions with items.
- **`network`:** retitled per school through `TITLE_OVERRIDES` to name the school's real
  network. With no Round Square-type membership, Country Day's "Model UN, WorldQuest &
  Charlotte's Global Partners" is the example. A conference ledger, one row per school
  year.
- **`milestones`:** dated events, oldest first — a pure-figure `year`, a short bold
  `title`, one sentence of `text`. Claimed firsts are worded "per the school", and the
  **narrowest claim every page supports** is the one rendered (`ccdglobal.md` →
  Implementation notes). **Rendered only with ≥5 verified dated events**
  (`pdcommunity.md` → Decisions).
- **`credential`:** Country Day has none. If the school publishes a global diploma or
  certificate, model **Providence Day's GSD block** (`providence-day.ts`), and its title
  must be a per-school `TITLE_OVERRIDES` entry.
- **`verdict`:** a `standsOut` summary plus ~4 points, and **one `ask` question per gap**
  (Country Day has 11).
- **Conflicting years:** the program's own current page wins, or the row is omitted —
  never "2005 or 2007".
- **Wording:** month-year mentions are rephrased to seasons; season `timing` on every
  trip that has one.
- **File conventions:** a header comment stating provenance, verification date and the
  rules followed; URL constants at the top; source labels as `'<domain> — <page>'`; card
  order as in the registry.

## Hard constraints

- **This skill writes no app code.** Its outputs are the prompt (mode A), two
  `source-material/international-travel/<slug>/*.md` files, and a `/plan` handoff (mode B).
  `/implement` builds.
- **The deep-research PDF is a lead sheet, never a citation.** It is AI-generated. A fact
  reaches the app only once it is confirmed on a live page, recorded in the Source URLs
  file.
- **Sourcing rule (user, 2026-10-12, memory `global-exposure-official-sources-rule`):**
  every fact *about the school* comes from the school's own site, a school-run site (e.g.
  its Google Site), or a Wayback copy of one. **The allowed exception** is a third-party
  page for a detail about an outside event or network, e.g. roundsquare.org for "the 57th
  Round Square International Conference". Even then, the school's participation must come
  from the school. List any third-party-sourced detail in the `/plan` brief so the user
  sees it.
- **Privacy (memory `no-trip-costs-or-travel-dates-on-page`):** trip prices, deposits and
  exact travel dates are recorded in the research files but **never rendered**. The page
  uses season + year. No student is named anywhere, including in research files; no parent
  or trip leader is named on the page.

## Mode detection

- **No PDF in the conversation** → mode A.
- **A global-travel research PDF is attached** (or the user points at one) → mode B. If the
  school is unclear, ask.

## Mode A — hand over the prompt

1. **Ask which school** in one message: the name, city and state. If it is not in
   `src/data/schools.json`, say that adding the school to the app is `/add-school`'s job.
   Global Exposure is a research area on an existing school page. Offer to run
   `/add-school` first.
2. **Fill the template** in [`prompt-template.md`](prompt-template.md). Read it fresh every
   run, because it is edited over time.
   - `{{DOMAIN}}`: confirm the official site by fetching its home page. Never guess a
     domain.
   - `{{GRADES}}`: from the school's site.
   - `{{DISAMBIGUATION}}`: one sentence naming the likely name collision (memory
     `trinity-episcopal-disambiguation-trap`: same-named schools exist). Omit it if there is
     none.
   - `{{PEERS}}`: 2–3 Charlotte schools, preferring those that already have a
     `src/data/internationalTravel/<slug>.ts`.
3. **Print the filled prompt inside ONE fenced block** using four backticks, with nothing
   else inside it. The user asked for exactly this: one window to copy.
4. **Then say, briefly:**
   - **Where to run it:** Claude deep research. Deliver as a PDF.
   - **What happens next:** attach the PDF here and run `/global-exposure` again (or just
     attach it).
   - **The sourcing note:** the prompt allows tagged [Secondary] sources; the user chose
     that (2026-10-12) over an official-only prompt. Only facts confirmed on the school's
     own site reach the page, with the event/network exception above. Do not re-offer the
     strict version unless the user asks.
5. **Stop.** Mode A writes no files.

## Mode B — the PDF has arrived

### B1. Read the template and the current state

- `src/data/internationalTravel.ts`: the **live** `INTERNATIONAL_TRAVEL_CARDS` registry,
  the types, `TITLE_OVERRIDES` and `WIDE_TRAVEL_CARDS`. **Never list cards from memory.**
  The registry grows (`community` and `milestones` were added by `ccdglobal`).
- `src/data/internationalTravel/README.md`: the data rules every school file follows.
- `src/data/internationalTravel/charlotte-country-day.ts`: **the standard school's shape,
  tone and depth.**
- `src/data/internationalTravel/providence-day.ts`: its `credential` block only, if the
  school has a credential.
- `src/locales/en.json` → the `cards.international-travel.*` and `travel.*` keys. **Look
  for chrome that names a specific school** (Providence Day's "GSD" and "PD" both leaked
  into shared chrome once). Anything school-specific must become a per-school
  `TITLE_OVERRIDES` entry or neutral wording, and the plan must say so.
- `.claude/plans/INDEX.md`: is there already a plan for this school?

### B2. Transcribe the PDF

Write `source-material/international-travel/<slug>/<School> - International Travel - Deep Research.md`.
Name it with the short school name the school's other `source-material/*/<slug>/` files
use, and make it a full transcription:
- **A warning header:** this is an AI-generated summary and a lead sheet, not a primary
  source.
- **Provenance:** the PDF's title, filename and page count, the date, and that it came
  from this skill's prompt.
- **Every section, table and URL**, in PDF order. Keep its [Official]/[Secondary] tags.
  Add planning notes where the PDF was wrong.
- **No student names**, even if the PDF slipped one in. Costs and exact dates **are**
  kept.

### B3. Verify against the live site — the step that matters

Fetch the school's pages yourself (`curl -sL` with a browser user agent, then strip the
HTML to text; WebFetch if curl is blocked). Use one scratch directory. Cover at least:
- the global/international program page;
- **each division's travel page, including any the PDF said it could not load.** On
  2026-10-12 the PDF said Country Day's Middle School Global Experiences page would not
  load. It loaded at once, and it held the richest data in the whole area (six trips with
  grade, group size, selection and homestay). **"Could not load" from deep research is a
  reason to retry, never a finding.**
- the history/timeline page, the endowment page, the off-campus or study-away page, any
  international-parents page;
- the key news posts the PDF cites.

For trips dropped from the live page, query the Wayback CDX
(`https://web.archive.org/cdx/search/cdx?url=<page>&output=json&fl=timestamp&filter=statuscode:200`)
and read the nearest snapshot.

Write `source-material/international-travel/<slug>/<School> - International Travel - Source URLs.md`,
following Country Day's file as the model:
- **Verification levels:** fetched / Wayback / PDF only / 404. Only fetched or Wayback
  facts may render.
- **A page-key table** (short keys such as IS, US-GE and MS-GE, mapped to URLs).
- **A Verified table:** fact group → source → how → notes.
- **Detail tables** for anything the page will show trip by trip. Costs and exact dates
  are recorded here, marked *research only*.
- **A "Not verified at planning — `/implement` fetches or drops" table.**
- **Official-page conflicts and spellings.** The current page wins. The README's rule is
  the most current figure, marked `~`.
- **Photo candidates:** URL, alt text, a note on whether the filename or alt text names a
  person, and an instruction to open the image before use.

### B4. Map onto the cards, and ask

Build a short mapping in the conversation: for each registry card, what this school can
fill from **verified** facts. Then mark each card **at standard / below standard (one-line
reason) / omitted**, measured against [the standard](#the-standard-charlotte-country-day),
and put that table in the conversation before the question round. A card below standard
is not a question for the user unless the reason is a choice; the reason goes into the
`/plan` brief. Then ask the user (AskUserQuestion, one round) only about
what is genuinely theirs to decide:
- **A card the school cannot fill.** The default is to omit it (omit-to-hide), and the gap
  becomes a Verdict question. Retitling a card to hold something it was not designed for is
  the alternative, and usually the wrong one (memory `k8-data-does-not-fit-k12-card-types`).
- **Material that fits no existing card.** Propose a new shared card: what it holds, how
  much verified data supports it, and why no existing card fits. **A new card needs the
  user's explicit approval** (CLAUDE.md UX standard). A new card is shared and optional, so
  every school without the data omits it.
- **A per-school title override** for `credential` or `network`, when the school's version
  is a named thing.

### B5. Hand off to `/plan`

Invoke the `plan` skill with a brief that carries everything a fresh window needs:
- the slug;
- the two source files;
- the card mapping and the user's decisions, quoted with their date as the approval
  record;
- the per-card standard table from B4;
- the school-specific chrome found in B1;
- every PDF-only fact still to verify;
- any third-party-sourced detail;
- the privacy rules.

The plan must be **two-phase** (English first, then the nine locales), and must splice
work files for the new school rather than re-extracting
(memory `splice-not-reextract-for-new-school`).

The area is on Compare (since 2026-10-26, plan `globalcompare`), so the brief must also say:
the plan **must fill the school's five `travel-*` Compare cells in
`src/data/metricValues.ts`, each with a `quals` tooltip** (trips abroad this school year,
youngest division, host-family stays, credential, countries reached). `npm run
check:travelrows` derives every figure from the ledger and fails the build until they
match, and fails on any destination not yet classified as a country or domestic. Its Phase
2 therefore also touches the `metric-values` overlays, not only `international-travel`.

`/plan` asks for the plan name and ends with the `/implement <name>` handoff. This skill
ends there too. **Do not commit** the source files; `/implement` commits them on its
branch.

## Deliberately cannot

- Run the deep research itself. The user runs it in Claude deep research, which produces
  the PDF this skill expects.
- Edit `src/**`, locale catalogs or any generated file.
- Render a fact the Source URLs file does not mark fetched or Wayback.
- Add a card without the user's approval in B4.
