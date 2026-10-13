---
name: pdcommunity
title: Add Global Community on Campus and Firsts & Milestones to Providence Day's Global Exposure, from a focused Claude deep-research PDF
status: english-done
phases: 2
created: 2026-10-13
branch: feat/pdcommunity
prs: []
---

# Providence Day — Global Community on Campus + Firsts & Milestones

## Goal

Providence Day's Global Exposure section gains the two shared optional cards that Charlotte
Country Day introduced in PR #344:
- `community`, titled "Global Community on Campus";
- `milestones`, titled "Firsts & Milestones".

Their data comes from a **focused Claude deep-research PDF**. The user runs the prompt in
**Appendix A** and attaches the PDF to the `/implement` window. The PDF is transcribed and
then verified fact by fact against live providenceday.org pages before anything renders.

It works when `/school/providence-day/` shows **9 cards** in registry order, with the two new
ones between "Round Square & the Wider Network" and the Verdict. Every new fact must trace to
a fetched or Wayback row in PD's Source URLs file, no student may be named, and Country Day's
section must be unchanged.

## Prerequisite — the PDF (read first)

**`/implement` cannot start Phase 1 without the deep-research PDF.**
- Step 1 checks for it.
- If it is not attached and no transcription exists at
  `source-material/international-travel/providence-day/Providence Day - International Travel - Community and Milestones Deep Research.md`,
  `/implement` stops, prints the Appendix A prompt in one four-backtick block, and asks the
  user to run it in Claude deep research and attach the PDF.
- Do not research the cards from scratch instead. The user chose the deep-research route
  (2026-10-13).

## Context

- **The cards already exist.**
  - `src/data/internationalTravel.ts` defines `CommunityCard` and `MilestonesCard`, both
    registry entries (after `network`, before `verdict`), and `milestones` in
    `WIDE_TRAVEL_CARDS`.
  - `src/components/InternationalTravel.tsx` has `CommunityBody` and `MilestonesBody` plus
    their dispatcher cases.
  - **No code, type or registry change is needed.** This plan adds data only.
- **The model to mirror:** `src/data/internationalTravel/charlotte-country-day.ts`, its
  `community` and `milestones` blocks. Match them for:
  - **shape:** intro, ≤3 pure-figure stat tiles, 3–5 cells, optional rows, sources;
  - **events:** oldest first, a pure-figure `year`, a short bold `title`, one sentence of
    `text`;
  - **tone:** "per the school" on any first the school claims;
  - **source labels:** `'providenceday.org — <page>'`.
- **PD's file:** `src/data/internationalTravel/providence-day.ts`. Insert the two blocks
  after `network` and before `verdict`, the same order Country Day's file uses. Its URL
  constants are at the top; add new ones there.
- **Data rules:** `src/data/internationalTravel/README.md`. **Read it first.** It covers:
  - a URL for every fact;
  - quote marks only where meaningful;
  - gaps only in `verdict.ask`;
  - the most current figure marked `~` when the school's own pages disagree;
  - pure figures in `value` and `year` fields;
  - no student named;
  - every card optional, and never shipped empty.

  Its line "Providence Day has neither until its research supplies them" must be updated.
- **Chrome is already done.** `cards.international-travel.community` and `.milestones` exist
  and are translated in all 10 catalogs (PR #344). **No locale catalog changes.**
- **i18n classification is already done.** `scripts/i18n_fields.mjs` has
  `['community.cells[].name', true]` and `['milestones.events[].year', false]` in the
  international-travel `PATH_OVERRIDES` block. The default leaf rules cover the rest.
- **Existing PD research and its traps.**
  - `source-material/international-travel/providence-day/`:
    - `… - Deep Research.md`, the first PDF. Its "Timeline of program milestones" table, at
      around line 403, is a lead sheet only.
    - `… - Source URLs.md`, the citation record. The new verification section goes here.
    - `… - 2027 Global Trips.md`.
  - **Round Square since 2016.** The first PDF said PD "became a Round Square Global Member"
    in 2016. **No live page says 2016.** PD's pages say "for over a decade"
    (`.claude/plans/intltravel.md`, Implementation notes). Without a verified year, Round
    Square cannot be a milestone row.
  - **GSD start year.** PD's pages conflict, "2005 or 2007"
    (`intltravel.md`). `year` is a pure-figure field, so a row cannot say "2005 or 2007"
    (see Decisions).
- **Sourcing rule** (memory `global-exposure-official-sources-rule`). Facts about the school
  come only from:
  - providenceday.org;
  - a school-run site, such as `sites.google.com/providenceday.org/gsd-homepage/*`;
  - a Wayback copy of either.

  The exception: a third-party page may supply a detail about an outside event or network,
  for example roundsquare.org.
- **Privacy:** no student is named anywhere, including the research files. No parent, staff
  member or trip leader is named on the page.

## Decisions

- **Plan name `pdcommunity`.** The user gave none, and we were on `main`.
- **A focused prompt, not the full template.**
  - `.claude/skills/global-exposure/prompt-template.md` researches the whole area, which PD
    already has.
  - Appendix A keeps that template's **sourcing rules 1–7 verbatim** and narrows the
    sections to its §14 (global community), the "Timeline of program milestones" (expanded
    to the school's claimed firsts) and §18 (scale).
  - The skill and its template are **not edited** (see Out of scope).
- **Omit thresholds**, which apply the "zero-items" rule (never ship an empty shell):
  - **`community` renders only with ≥3 verified cells.** Its stat tiles are optional and
    must be school-published figures, never our tallies.
  - **`milestones` renders only with ≥5 verified dated events.**
  - A card below its threshold is **omitted**, and its gap becomes a `verdict.ask` question.
  - If **both** fall short, stop after step 4 and report. The plan then moves to `abandoned`
    with the findings recorded.
- **Conflicting years.** When the school's pages disagree on a year, use the one the
  program's own current page states, for example the GSD site for the GSD. Record the other
  in the Source URLs conflicts section. If no page is clearly authoritative, **omit the
  row**. Never write "2005 or 2007" in `year`.
- **Overlap with existing PD cards is allowed but brief.** A milestone may name the GSD or
  Round Square, but in one line, without repeating the Credential card's figures (`~375`,
  `~20`, `B−`).
- **The `verdict` card is touched only to keep it accurate.**
  - **Add** an Ask question for any omitted card's gap.
  - **Remove** any existing question that the new verified data now answers.
  - Leave the `standsOut` points unchanged unless the new data clearly belongs there. Each
    change is listed in Implementation notes.
- **No photos.** The community and milestones cards have no photo field.
- **Splice, never re-extract**, in Phase 2. `scripts/i18n_splice_work.mjs` keeps every
  existing translation by stamp (memory `splice-not-reextract-for-new-school`).

## Approvals needed

**None.**
- `community` and `milestones` are shared registry cards the user approved on 2026-10-12
  (`ccdglobal`). Adding PD's data to existing cards is data enrichment under the
  UX-design standard.
- The user asked for this plan on 2026-10-13 ("generate /plan for the third bullet").

`npm run deploy` is **not** part of this plan. Merging is not publishing.

## Source material

None is written yet. `/implement` writes both files from the PDF:
- `source-material/international-travel/providence-day/Providence Day - International Travel - Community and Milestones Deep Research.md`
  is the PDF transcription. It is a lead sheet, never a citation.
- A new section appended to
  `source-material/international-travel/providence-day/Providence Day - International Travel - Source URLs.md`:
  `## Community & Milestones verification (<date>, /implement pdcommunity)`.

## Out of scope

- Changes to PD's other seven cards, beyond the Verdict touch in Decisions.
- Charlotte Country Day's section.
- A new card, card type, renderer or chrome key.
- Editing the `/global-exposure` skill or its template. That would also mean updating
  `.claude/SKILLS.md`; offer it as a follow-up suggestion only. A reusable "add the
  community/milestones cards to an existing school" prompt mode would be the natural
  version.
- Compare, `VALUE_METRICS`, a podcast episode, `npm run deploy`.

## Steps

### Phase 1 — English

1. **Gate on the PDF.** If the user has not attached the deep-research PDF, print Appendix
   A's prompt in one four-backtick block. Say: run it in Claude deep research, deliver it as
   a PDF, attach it here. Then **end the turn**.

2. **Branch.**
   - Run `git checkout main && git pull && git checkout -b feat/pdcommunity`.
   - Set this plan to `in-progress` and its INDEX row to `In progress`.

3. **Transcribe the PDF** to `…/Providence Day - International Travel - Community and Milestones Deep Research.md`:
   - a header warning that this is an AI-generated lead sheet, not a primary source;
   - provenance (PDF title, filename, page count, date, "from the pdcommunity Appendix A
     prompt");
   - every section, table and URL in PDF order, with its [Official]/[Secondary] tags kept;
   - **no student names**, even if the PDF has them.

4. **Verify against live pages**, and append the Source URLs section.
   - Fetch each cited providenceday.org page with `curl -sL` and a browser user agent,
     strip it to text, and read the claim in it.
   - Cover at least:
     - the Global Education page (`/the-pd-difference/global-education`);
     - any history/timeline or "About" page;
     - the endowment page (`/philanthropy/endowment`);
     - the GSD site pages;
     - any international-families, ESL/ELL or diversity page;
     - the news posts the PDF cites for cultural events.
   - **"Could not load" in the PDF is a reason to retry, never a finding.**
   - For a fact gone from the live page, query the Wayback CDX
     (`https://web.archive.org/cdx/search/cdx?url=<page>&output=json&fl=timestamp&filter=statuscode:200`)
     and read the nearest snapshot.
   - The new section follows the existing file's style:
     - verification levels: fetched / Wayback / PDF only / 404;
     - a Verified table (fact → URL → how → notes);
     - a "Not verified — dropped" table;
     - a "Conflicts" list.
   - Only fetched or Wayback facts may render.
   - Then apply the Decisions thresholds. If both cards fall short, stop here (see
     Decisions).

5. **Commit and ingest.**
   - `git add` the two source files **by explicit path** and commit.
   - Run:
     ```
     python3 .claude/skills/ingest-source-material/build_docs.py international-travel
     python3 scripts/build_site_content.py
     node scripts/check_metrics.mjs
     ```
     `RULES['international-travel']` is a catch-all, so there should be no unmatched
     subtopic.
   - `git status --short`, then commit **only** this topic's paths:
     - `.claude/docs/international-travel/providence-day.md`;
     - `.claude/docs/INDEX.md`;
     - `src/content/international-travel/providence-day.json`;
     - `src/data/schools.json`.

6. **Write the data** in `src/data/internationalTravel/providence-day.ts`.
   - Add URL constants for any new pages.
   - Insert `community: { … }` and `milestones: { … }` between `network` and `verdict`,
     mirroring `charlotte-country-day.ts`.
   - Each card has a `headline`, the collapsed teaser. Milestones' headline is a one-line
     framing, as Country Day's is.
   - **Stat `value`s and event `year`s hold pure figures** (`1970`, `2020–21`), with words
     in the label or text.
   - Mark the school's own claimed firsts "per the school".
   - Each card's `sources` lists only the pages behind its facts.
   - Update the header comment's rules line if needed.
   - Apply the Verdict touch from Decisions.

7. **README.** In `src/data/internationalTravel/README.md`, change "Providence Day has
   neither until its research supplies them" to reflect which of the two cards PD now has.

8. **Regenerate and check.**
   - `node scripts/i18n_extract.mjs --report --residual`: 0 unclassified international-travel
     fields.
   - `npm run schema && npm run check:schema`.
   - `npx tsc -b`. **Not** `--noEmit`.
   - `npm run build`. Expect it to pass: PD's existing stamps are unchanged, unless the
     Verdict edit changed one. In that case `check:live` reports that string until Phase 2,
     which is expected.
   - The greps and browser checks under Verification → Phase 1.

9. **Commit Phase 1.**
   - Stage explicit paths: the data file, the README, `DATA-SCHEMA.md`, and the plan and
     INDEX.
   - Push, then confirm `git rev-parse HEAD` equals `git ls-remote origin feat/pdcommunity`.
   - Set the plan to `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** No PR yet. Tell
the user to open `/school/providence-day/` with every card open, at desktop width and at
390px. Ask about the wording of both new cards and any Verdict change.

### Phase 2 — Every other locale

Research prose only: the overlay layer, per `PROSE_TRANSLATED` in `src/lib/i18n.ts`
(currently `es bn ht te fr fa it hi ar`). There is **no chrome change**: both titles are
already in all 10 catalogs. The mechanism is in `.claude/docs/prose-translation-architecture.md`.

1. **Splice**, for each locale:
   `node scripts/i18n_splice_work.mjs --lang <code> --topic international-travel`.
   - Expect KEPT = the current count, ADDED = the new PD strings, and **DROPPED = 0**.
   - A Verdict question removed in step 6 is the one legitimate drop. Any other drop means a
     misconfigured extract: stop.

2. **Translate**, filling every empty `t`, keyed by stamp and never by index.
   - **Glossary:** each locale's existing translations of **Country Day's** `community` and
     `milestones` entries in the same work file. Reuse their phrasing so the two schools'
     cards read alike: "per the school", "sister school", the ESL rendering, how "firsts" is
     phrased.
   - If using parallel agents, give **one scratch directory each** (memory
     `parallel-locale-agents-collide`).
   - Standing rules:
     - figures char-for-char;
     - dates translate, their digits don't;
     - names stay in Latin script (Round Square, Global Studies Diploma, GSD, and so on);
     - `fa`/`ar` store **no bidi controls**. If a figure must follow a Latin title, reorder
       the sentence (NOTES.md, the Country Day section);
     - `hi`/`te` never pre-group digits.

3. **Build** each overlay:
   `node scripts/i18n_build_overlay.mjs --topic international-travel --lang <code>`.

4. **Cross-locale review.**
   - Run `npm run i18n:leaks -- --lang <code>` for all 9 locales. A PD string kept in
     English by 1–3 locales while ≥6 translated it is a leak; fix it to the consensus.
   - Run `check_work_integrity` by stamp, not by `--base main`: its length assertion exits
     early on any splice (NOTES.md, Country Day). Assert by stamp against `main`:
     - 0 lost;
     - 0 `text`/`of` mutated;
     - 0 existing `t` overwritten;
     - all new entries are `providence-day:community…` or `…milestones…`;
     - 0 empty.

5. **NOTES.md.** In `src/data/overlays/NOTES.md`, add a short "Providence Day — community &
   milestones" subsection with soft spots, or "none".

6. **STOP for the user's test** (the pdtrips2027 / ccdglobal precedent).
   - Commit explicit paths and push.
   - Report the check results.
   - Tell the user: `npm run build && npx vite preview`, then `/school/providence-day/?lang=es`,
     `?lang=fa` and `?lang=ar`.

7. **Ship, only after the user confirms.**
   - `gh pr create --body-file …`.
   - Set this plan to `implemented` with `prs: [N]` and add Implementation notes. Set the
     INDEX row to Implemented with the PR link.
   - `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.
   - **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/international-travel/providence-day/… - Community and Milestones Deep Research.md` | new: PDF transcription |
| `source-material/international-travel/providence-day/… - Source URLs.md` | append: verification section |
| `.claude/docs/international-travel/providence-day.md`, `.claude/docs/INDEX.md`, `src/content/international-travel/providence-day.json`, `src/data/schools.json` | generated by ingest |
| `src/data/internationalTravel/providence-day.ts` | add `community`, `milestones`; Verdict touch |
| `src/data/internationalTravel/README.md` | PD now has the card(s) |
| `.claude/docs/DATA-SCHEMA.md` | regenerated, if anything changes |
| `src/data/overlays/work/international-travel.{9}.json`, `src/data/overlays/international-travel.{9}.json` | Phase 2: spliced + translated |
| `src/data/overlays/NOTES.md` | Phase 2 |
| `.claude/plans/pdcommunity.md`, `.claude/plans/INDEX.md` | status + notes |

No `src/locales/*.json`, `src/components/**` or `scripts/**` change is expected. If one
turns out to be needed, say why in the Implementation notes.

## Verification

### Phase 1 — English

- [ ] `node scripts/check_metrics.mjs`: no unmatched subtopic
- [ ] `npx tsc -b`: clean
- [ ] `node scripts/i18n_extract.mjs --report --residual`: 0 unclassified international-travel fields
- [ ] `npm run schema && npm run check:schema`: passes
- [ ] `npm run build`: every gate passes, except a `check:live` finding on a deliberately
      edited Verdict string
- [ ] `grep -n '\$[0-9]' src/data/internationalTravel/providence-day.ts`: no hits
- [ ] `grep -in "not stated\|not published" src/data/internationalTravel/providence-day.ts`: hits only in `verdict`
- [ ] Every new `sources` URL appears in the new Source URLs section as fetched or Wayback.
      Open five of them.
- [ ] No student, parent or staff name in the two new blocks: grep for the surnames in the
      transcription.
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright
      with `channel: 'chrome'`, every `<details>` open):
  - [ ] `/school/providence-day/` shows **9 cards** (or 8 if one card was omitted by
        threshold), in this order:
    1. Where They Go
    2. Exchanges & Homestays
    3. Signing Up for Travel & GSD
    4. Global Learning at Each School Level
    5. The Global Studies Diploma
    6. Round Square & the Wider Network
    7. Global Community on Campus
    8. Firsts & Milestones
    9. Verdict & Ask the School
  - [ ] Global Community is half-width, and Firsts & Milestones spans the full width with
        events oldest first.
  - [ ] Stat tiles show pure figures.
  - [ ] Dark mode is legible.
  - [ ] `/school/charlotte-country-day/` is unchanged at 8 cards.
- [ ] `npm run audit:mobile -- --only providence-day`: no broken card, no page overflow

### Phase 2 — Locales

- [ ] Splice: DROPPED = 0 (or exactly the removed Verdict strings) for every locale
- [ ] `npm run check:runtime && npm run check:live`
- [ ] `python3 scripts/check_figures.py --topic international-travel --lang <code>` and
      `npm run check:sepdrift -- --lang <code>` for all 9 locales
- [ ] `npm run check:dates`, `check:bidi`, `check:fa`, `check:hi`, `check:fr`, `check:script`
- [ ] The by-stamp integrity assertions in Phase 2 step 4
- [ ] `npm run i18n:leaks -- --lang <code>` for all 9 locales, triaged
- [ ] `npm run audit:daterender`; `npm run audit:mobile -- --only providence-day --lang fa --lang ar --lang es --widths 320`
- [ ] Browser check in `es`, `fa` and `ar` with every card open: milestone years and ranges
      read in the right order in fa/ar (`2020–21`, not `21–2020`)

## Risks

| Risk | Mitigation |
|---|---|
| The PDF repeats the first PDF's unverifiable claims ("Round Square 2016") | The prompt names the known conflicts; step 4 renders only fetched or Wayback facts |
| Thin results produce an empty-looking card | Omit thresholds (≥3 cells, ≥5 events); the gap goes to the Verdict |
| A minor's name reaches the page from a news post about a cultural event | No names in research files either; the Phase 1 surname grep |
| A word in a figure field leaks English in 9 locales | Pure-figure `value`/`year` (README); `audit:daterender` in Phase 2 |

## Open questions

- **Should the focused prompt become a reusable `/global-exposure` mode** for adding the
  community/milestones cards to any school? **Default:** no, not in this plan. Mention it
  as a suggestion in the PR body.

## Appendix A — the deep-research prompt

The user pastes this into **Claude deep research** and attaches the resulting PDF to the
`/implement pdcommunity` window. Sourcing rules 1–7 are copied verbatim from
`.claude/skills/global-exposure/prompt-template.md` (v1, 2026-10-12); the sections are
narrowed to the two cards.

````
Research Providence Day School (Charlotte, North Carolina; official site
providenceday.org; independent TK–12 school) and produce a focused research
dossier on two things only: its GLOBAL COMMUNITY ON CAMPUS and its GLOBAL
EDUCATION FIRSTS & MILESTONES, as of today. Make sure every source is about
THIS school. Several other schools share the name (Providence Country Day
School in Rhode Island, Providence School in Florida, and others), so discard
any source that is not about Providence Day School in Charlotte, NC.

Do NOT re-research Providence Day's student trips, exchanges, trip
registration, the Global Studies Diploma's requirements, or Round Square
conferences. They are already documented. Mention them only where a dated
milestone or a community fact needs them.

Title it: "Providence Day School (Charlotte, NC): Global Community &
Milestones — Research Dossier (as of <month year>)"

SOURCING RULES (these matter more than coverage)
1. The school's own website is the authority. Work through providenceday.org
   first. That includes its news and stories, divisional pages (Lower, Middle,
   Upper), any Global Education / global programs / travel pages, the academic
   calendar, admissions pages, course catalogs or program-of-studies PDFs,
   annual reports, giving/endowment pages, and any Google Sites or PDFs the
   school publishes.
   Also check archived versions (web.archive.org) when a current page is thin.
   If a page fails to load, retry it and say so explicitly. Do not conclude that
   its content does not exist.
2. Tag every fact [Official] (the school's own pages, PDFs or sites) or
   [Secondary] (anything else: Round Square, partner schools, local press,
   Wikipedia, directories). Use Secondary only to corroborate Official facts or to
   fill gaps, and label it clearly when you do.
3. Every fact gets its FULL source URL inline, next to the fact (not a site name
   and not a footnote number). If a fact comes from a PDF, give the PDF's URL and
   the page number.
4. Quote the school's exact wording for program names, mission lines,
   requirements and figures. Never round or reformat a number.
5. When two official pages disagree (e.g. a founding year, a graduate count, a
   membership date), report both quotes with both URLs, and flag the conflict.
   Do not pick one.
6. When something cannot be found, say "NOT PUBLISHED" and list what you
   searched. Never infer or estimate. If you compute a figure yourself (e.g.
   counting countries from a trip list), label it "our tally" and show the list
   it came from.
7. Do NOT name any student. Describe the trip or the achievement, not the child.
   Faculty and staff may be named when the school names them.

KNOWN OPEN QUESTIONS — resolve these with exact quotes and URLs if you can:
- The year Providence Day joined Round Square (a previous dossier said 2016;
  the school's current pages say "for over a decade"). Find any official page
  that states the year.
- The first year of the Global Studies Diploma and its first graduates
  (official pages have said both 2005 and 2007). Quote each with its URL.
- The year the Global Education program (or its office/director role) began.

SECTIONS

TL;DR: 3–5 bullets on how international the campus community is, and the
program's headline firsts.

Fact card: a table with columns Item | Finding | Source type | URL. Cover at
least: international student enrollment; countries or nationalities
represented by students or families; languages spoken by families or faculty;
ESL/ELL/EAL support; an international-families parent group; the number of
world languages taught; the program's founding year; firsts the school claims.

A. Global community on campus:
   - international students: count, countries, and how they enroll (direct
     enrollment, exchange, host programs), with the year of each figure;
   - multilingual and international families: nationalities or languages the
     school reports, and parent groups for international families (name, year
     founded, what they do);
   - English-language support (ESL/ELL/EAL): whether it exists, for which
     grades, and since when;
   - cultural celebrations and heritage events: international nights or fairs,
     Lunar New Year, Diwali, heritage months, multicultural festivals (name,
     year, what happens, scale if stated);
   - global or cultural student clubs and affinity groups with an
     international focus, by division;
   - visiting speakers, diplomats and ambassador series (who, when, format);
   - faculty: international faculty, languages faculty speak, faculty exchange
     or visiting teachers from abroad;
   - families who host visiting students (how the school arranges it, length of
     stays).

B. Firsts & milestones timeline: Year | Milestone | Exact quote | Source type |
   URL. Include every year-dated event in the school's global education
   history:
   - the school's founding (1970?) only as context;
   - when Global Education, its office, or its director role began;
   - Global Studies Diploma: first year, first graduates, later changes (e.g.
     the Global Ambassador distinction);
   - Round Square membership (year joined, Global Member status);
   - the first year of each exchange partnership or sister-school
     relationship;
   - the first trip to a notable destination, or the first Middle School trip;
   - endowed funds for global education (name, year established, quoted
     purpose);
   - the faculty Global Educator Certificate and faculty awards (year begun);
   - outside recognition of the program (e.g. accreditation comments, awards)
     with the year;
   - every "first" the school claims ("first in the nation", "first in
     North Carolina", "first in Charlotte"), quoted exactly with its URL;
   - any entries on an official history or timeline page that touch global
     education.

C. Scale & participation: any figure the school gives for international
   enrollment, families' nationalities, ESL students, parent-group membership,
   event attendance or club membership, with the exact wording, the year, and
   the URL. Year-over-year figures are especially valuable.

D. Content worth noting: anything substantial about the global community or
   program history that fits none of A–C, with how much published data
   supports it.

Caveats: date ranges covered, pages you could not load or verify, and items that
are historical and may not reflect current practice.

APPENDIX — Source URL list: every URL cited, grouped by section, with page title
and the date the page was published or last updated if shown.

Deliver the result as a PDF.
````

## Implementation notes

### Phase 1 (2026-10-13)

- **Both cards render.** `community` has 5 cells and 3 stat tiles; `milestones` has 10
  events (thresholds: ≥3 / ≥5). Verification is in the Source URLs file's
  "Community & Milestones verification (2026-10-13)" section.
- **The PDF's three "could not load" posts all loaded on retry** (IGL endorsement, Cultural
  Connections, Charlotte Chinese Academy) and supplied the strongest facts. The
  "June 2026 national recognition" is now confirmed as the **Institute for Global Learning
  endorsement** (one of 11 schools worldwide, announced April 2026).
- **GSD milestone year is 2007, not the GSD Google site's 2005.** This deviates from the
  Decisions example ("the GSD site for the GSD"). The GSD's own providenceday.org page
  ("Created in 2007"), the Global Education page, the admissions page and the 2026–27
  college profile all say 2007. The GSD Google site is internally inconsistent: its FAQ
  says 2005 had the first graduating class, but its own alumni roster begins with the
  Class of 2007. Recorded under Conflicts.
- **Round Square has no milestone row.** The Fall 2015 magazine says "recently became an
  official member" (2015). A Wayback copy of the Global Education page (2025-05-17) says
  "Global Member … in 2016". The live page says "for over a decade". No page is
  authoritative.
- **Verdict unchanged.** Neither card was omitted, and no existing Ask question is answered
  by the new data (none concerned the community). `standsOut` was left as is, so no
  existing stamp changed and Phase 2 should drop nothing.
- Cultural Connections' attendance figures render without a year. The post (Sep 25 2026,
  reprinted from PD Magazine) implies 2025–26, but that is an inference. The IGL
  certificate's "2025–26" comes from "this year" in a June 2026 post.
- Not rendered, though verified: the 2015 ELL curriculum map, FOCUS (2006), the
  Multicultural Task Force (2004), the World Peace Mandala, hosted French students and the
  Postcard figures. They are historical, or already on PD's other cards.
