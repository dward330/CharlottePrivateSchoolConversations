---
name: learning-support
description: >
  Build a school's Learning Support & Student Services research area (slug
  `learning-support`) in four steps. STEP 1 — no PDF yet: ask which school, then hand the
  user the deep-research prompt to paste into Claude deep research, in ONE copy-paste
  block. STEP 2 — the user attaches the resulting PDF: transcribe it, verify every claim
  against the school's OWN live pages, score how much of the six-card section could be
  filled, and say plainly whether there is enough for a healthy section (go / no-go).
  STEP 3 — on a go, hand off to /plan. STEP 4 is the usual /implement. Use when the user
  types /learning-support, or asks for "the learning support deep research prompt for
  <school>", "a learning support section for <school>", or attaches a learning-support /
  student-services research PDF for a school. Cannon School is the depth reference; the
  go/no-go bar is computed from the thinnest school already shipped.
  This skill writes ONLY source-material and the plan (via /plan), never app code.
---

# /learning-support — from a deep-research prompt to a Learning Support plan

The repeatable version of what built Hickory Grove Christian's section
(`.claude/plans/learningsupport.md`, 2026-10-20). The flow is **prompt → user runs Claude
deep research → PDF → verified research file + go/no-go → `/plan` → `/implement`**.

**Two references, each for what it shows best** (user decision, 2026-10-24; in force
since Cannon shipped in PR #361). Their shape, tone and depth are the model; their facts
are not.

- **Cannon School (`src/data/learningSupport/cannon.ts`) is the depth reference**, the
  section a new build should match. It has the fuller section: more rendered and
  published service rows, four stat tiles, four testing entries, twelve staff (with their
  published emails) and a written eligibility policy quoted in all three cells.
- **Hickory Grove Christian (`src/data/learningSupport/hickory-grove-christian.ts`) is
  the reference for two patterns Cannon lacks**: `IH_FEE` rows built from a published
  fee schedule, and the `[[504|…]]` / `[[iep|…]]` glossary markers for a school that
  names those plans. Copy those from Hickory Grove when the new school has them.
- **The GO/NO-GO bar is neither of them by name.** It is computed from the *thinnest*
  shipped school (2c), the same way `/add-school` calibrates its floor. Build to the
  richest school and gate on the thinnest.

## Hard constraints

- **This skill writes no app code.** Its outputs are the prompt (step 1), one
  `source-material/learning-support/<slug>/*.md` research file (step 2) and a `/plan`
  handoff (step 3).
- **Official school sources only** (user rule, 2026-10-20). A fact reaches the app only
  when it is confirmed on the school's own site, a PDF that site hosts or links, its own
  job posting, or a Wayback copy of one of those. The deep-research PDF is AI-generated:
  a lead sheet, never a citation. **No third-party evidence**, even tagged: the
  Charlotte Speech and Hearing Center screening listing in the original design was
  dropped for exactly this reason.
- **This school only.** No cohort comparisons, no state-funding content (ESA+,
  Opportunity Scholarship), no public-district evaluation route (`src/data/learningSupport/README.md`).
- **NOT STATED is a finding, not a failure.** An unmentioned service renders a dashed
  NOT STATED chip. "Not offered" is written only when the school says so, and then the
  row is `EXCLUDED` and stays out of the matrix.
- **No student is named**, including in research files. Staff are named as the school
  names them.
- **Compare stays off** for this area (`COMPARE_DEFERRED_TOPICS`) until the user says
  otherwise.

## Mode detection

- **No PDF in the conversation** → step 1.
- **A learning-support research PDF is attached** (or the user points at one) → step 2.
  If the school is unclear, ask.

## Step 1 — hand over the prompt

1. **Ask which school**, with its city and state, in one message. If it is not in
   `src/data/schools.json`, adding the school is `/add-school`'s job; offer to run it
   first. If `src/data/learningSupport/<slug>.ts` already exists, say so and ask whether
   this is a refresh.
2. **Fill** [`prompt-template.md`](prompt-template.md). Read it fresh every run.
   - `{{DOMAIN}}`: confirm by fetching the school's home page. Never guess it.
   - `{{GRADES}}`: from the school's site.
   - `{{DISAMBIGUATION}}`: one sentence naming a likely same-name collision (memory
     `trinity-episcopal-disambiguation-trap`); omit if none.
3. **Print the filled prompt inside ONE fenced block** using four backticks, with
   nothing else inside it.
4. **Then say briefly:** run it in Claude deep research and deliver it as a PDF; attach
   the PDF here (or run `/learning-support` again with it).
5. **Stop.** Step 1 writes no files.

## Step 2 — the PDF has arrived: verify, score, decide

### 2a. Read the live contract

- `src/data/learningSupport.ts`: the **live** `LEARNING_SUPPORT_CARDS`, the types,
  `LearningCode`, `LEARNING_NEEDS`. Never list cards from memory.
- `src/data/learningSupport/README.md`: the data rules.
- **Every file in `src/data/learningSupport/`** (the shipped schools, keyed in
  `PROGRAMS`): Cannon for depth and the fullest service-row set, Hickory Grove for fee
  rows and glossary markers. Both use source labels in the form `'<domain> — <page>'`.
- `src/locales/en.json` → `cards.learning-support.*` and `learning.*`: look for chrome
  that names one school. It must stay neutral.
- `.claude/plans/INDEX.md`: is there already a plan for this school?

### 2b. Verify against the live site — the step that matters

Fetch the school's pages yourself: `curl -sL` with a browser user agent into one scratch
directory, then strip the HTML to text (WebFetch only if curl is blocked). Cover at least:

- the student-services hub and the learning-support program page. **Check the site's own
  navigation for a renamed program**: Hickory Grove's "Student Center for Advancement"
  URL 404ed because it had become "Educational Support Services". A 404 on the PDF's URL
  is a reason to look for the new page, never a finding;
- **every fee-schedule PDF** the program page links: download it, `pdftotext -layout`
  it, *and* render it (`pdftoppm -png`) and look at it. Table layouts garble in text
  mode, and Hickory Grove's schedule carried a likely misprint ("$2227/year" where a
  per-semester price belonged) that only the image made clear;
- the staff list, plus **each person's email as the school's own directory publishes it**.
  On Finalsite sites that is the `FS.util.insertEmail(el, "<domain reversed>",
  "<local reversed>")` call on the directory or profile popup. Never build an address
  from a name pattern; record each one with its directory id (see the README rule).
  **The same applies to anyone the Therapy card would name** (a speech-language
  pathologist, an OT on staff): find their published email too, because they render
  in `therapy.people` with the same mailto row (user rule, 2026-10-25);
- wellness / counseling pages; any crisis-resources page;
- the admissions checklists (documentation asked for at admission);
- the careers page (learning-support postings name reporting lines and frameworks);
- any international-student page (English-language requirements, ESL).

Write `source-material/learning-support/<slug>/<School> - Learning Support - Official Site Research.md`,
modelled on Cannon's file (Hickory Grove's for a fee-schedule transcription):
- a provenance header (who / when / how, official sources only);
- a **Source URLs table** (S1, S2, …) with status (fetched / Wayback / 404);
- **verbatim excerpts** per page, the full fee-schedule transcription, and the staff
  table;
- **excluded content recorded, not rendered** (ESA+, district route);
- a **"Not found on any official page"** list, which becomes the NOT STATED rows;
- **"Corrections to the PDF"**: everything the PDF said that the live site contradicts or
  does not support. The live site wins.

Also keep a short transcription of the PDF itself as
`<School> - Learning Support - Deep Research.md`, with a warning header saying it is an
AI-generated lead sheet, not a source. No student names.

### 2c. Score the coverage — the go / no-go

Map the verified facts onto the six cards and the Services-at-a-Glance rows (start from
Cannon's row set, which is Hickory Grove's plus "Early identification (JK–2)"; add a row
only for a service the school genuinely offers that none of the shipped files names). Then print this table in the conversation, **always with counts
beside percentages**:

| Card | What this school can fill (verified only) | Status |
|---|---|---|
| Can They Serve My Child? | eligible / plan / scope cells verified: n of 3 | at standard / below / omitted |
| Services at a Glance | **published rows** (any code except NS): n of N; NS rows: m | … |
| Therapy & Related Services | always renders (the gap is the finding) | — |
| Testing & Evaluation | entries about **identifying a need** (screening, evaluation, intake): n. Admission tests do not count | … |
| Who You'll Work With | named staff: n | … |
| Ask the School | questions: one per gap or inconsistency | — |

**The bar is the thinnest shipped school, computed rather than remembered.** At run
time, count the published service rows (any rendered code except `NS`; `EXCLUDED` is not
rendered) in **every** file in `src/data/learningSupport/`, and take the **lowest**. Name
that school in the verdict. Do not trust a number written here. As of 2026-10-25 the
thinnest is Hickory Grove, 14 published of 23 rendered rows (+1 EXCLUDED), 9 staff; Cannon
is 17 of 25, 12 staff. So test 3 needs 7. The bar does not rise just because a richer
school ships, and it falls if a thinner one does.
The verdict:

- **GO** when *all four* hold:
  1. the school has an official page naming a learning-support program or service;
  2. at least **2 of the 3** eligibility cells are verified, one of them being who is
     eligible or how a 504/IEP is handled;
  3. published service rows are **at least half of the thinnest shipped school's count**
     (rounded up);
  4. at least **one named staff member** or one published fee.
- **NO-GO** otherwise. Say which test failed, with counts. A thin section would be a
  page of NOT STATED chips, and that is worse than no section.
- **Before a NO-GO, offer one deeper pass** (Wayback copies of renamed or removed pages,
  the handbook PDF, the school profile, the course catalog for a support class, the
  careers archive). A deep pass that confirms the gaps is a useful result: report it and
  stop. Never soften a no-go.

The NOT STATED rule still holds on a GO: a gap renders as a chip, never as a blank.

### 2d. Ask only what is the user's to decide (one AskUserQuestion round)

- **Proceed?** Present GO/NO-GO with the table. On a GO the default is to proceed.
- **Material that fits no card.** Propose a new shared card: what it holds, how much
  verified data supports it, and why no existing card fits. **A new card needs the
  user's explicit approval** (CLAUDE.md UX standard).
- **The section colours.** Default: the school's own two brand colours from its official
  site or logo, as `colors.brand` (the darker; it carries ink and fills) and
  `colors.gold` (the accent; rules and badges only). Confirm the hex values with the
  user.

## Step 3 — hand off to `/plan`

On a GO, invoke the `plan` skill with a brief carrying everything a fresh window needs:
- the slug and the research file(s);
- the coverage table from 2c and the GO verdict with its counts;
- the user's decisions, quoted with their date as the approval record;
- the service-row mapping, with each row's code, need tags and the exact quoted wording;
- the colours;
- every "Corrections to the PDF" item;
- the hard constraints above.

The plan must be **two-phase** (English first, then the nine locales), must splice work
files for the new school rather than re-extracting (memory
`splice-not-reextract-for-new-school`), and needs no UX approval for the six existing
cards (the Hickory Grove handoff approved them). `/plan` asks for the plan name and ends
with the `/implement <name>` handoff. **Do not commit** the source files; `/implement`
commits them on its branch.

## Step 4 — `/implement`

The normal flow: branch, ingest, write `src/data/learningSupport/<slug>.ts`, register it
in `PROGRAMS`, build, browser-check at desktop and 390px with every card open, stop for
the English review, translate, PR, merge. **Never deploy** unless the user asks at that
moment.

## Deliberately cannot

- Run the deep research itself. The user runs it in Claude deep research.
- Edit `src/**`, locale catalogs or any generated file.
- Render a fact the research file does not mark fetched or Wayback.
- Use a third-party page as evidence of a school service.
- Add a card without the user's approval in 2d.
