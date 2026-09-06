---
name: admissionsreport
title: Generate a per-school Admissions PDF report plus the NotebookLM prompt that turns it into a podcast episode
status: not-implemented
phases: 1
created: 2026-09-06
branch: feat/admissions-report
prs: []
---

# Per-school Admissions PDF report + NotebookLM episode prompt

## Goal

A repeatable generator — `npm run report:admissions -- --school <slug>` — that reads a
school's **Admissions** research area and writes two files:

- `reports/admissions/<slug>-admissions-notebooklm.pdf` — a self-contained source document
  holding every admissions fact the app knows about that school: the entry bands, the
  ordered application steps, the deadline tiles, the cross-band comparison table, the
  watch-outs, the financial-aid parallel note, the admissions-office contacts, and the
  source URLs. Its final page is a clearly fenced **Appendix A** carrying the NotebookLM
  prompt.
- `reports/admissions/<slug>-notebooklm-prompt.txt` — the same prompt as plain text, to
  paste into NotebookLM without dragging a selection across a PDF.

Upload the PDF to a NotebookLM notebook, paste the prompt, and it produces a
*Charlotte Private School Conversations* episode that walks a parent through **how to
actually apply to that school** — the steps in order, the deadlines that matter, which
assessment their child sits, what to submit, and who to phone. The episode opens and
closes by pointing parents at **www.charlotteschoolinsights.com** to follow the guidance
and generate a checklist for themselves.

We will know it worked when `--school providence-day` writes a PDF whose band count,
deadline dates, contact names and source URLs match
`src/data/admissionsPrograms/providence-day.ts` exactly, and when running the same command
for all six admissions schools produces six correct reports with **no code change between
them**. Running it for a school with no admissions data prints a clear "not enough data"
message and exits **without writing any file**.

## Why this is worth building

The Admissions research area is the app's most *procedural* data — it is already a set of
ordered steps with dates, tests, forms and phone numbers, typed per school in
`src/data/admissionsPrograms/<slug>.ts`. That is exactly the shape a spoken how-to episode
needs, and it is exactly the shape NotebookLM handles well when handed a clean single
document. Today that data can only be read on the website; there is no artifact to hand a
generative tool.

The reason to generate rather than hand-write: there are six admissions schools today and
the area is still growing, the entry cycles roll over every year, and every date in the
data is a citation a parent matches against the school's own calendar. A hand-written
report is stale the first time a cycle turns and nothing tells you it went stale. This is
the same reasoning that makes `DATA-SCHEMA.md` generated rather than hand-maintained.

## Scope decisions, already settled — do not re-litigate

Answered by the user at planning time on 2026-09-06:

| Decision | Answer |
|---|---|
| PDF generation | A Node script rendering HTML → PDF through the **Playwright Chromium the build already uses**. No new dependency. |
| Report scope | **Admissions research area ONLY.** No tuition figures, no college outcomes, no school-identity prose from other areas. |
| Band coverage | **All bands in one report**, one PDF per school. The prompt gives each band its own episode segment. |
| Episode length | **~15–20 minutes**, a standard deep dive. |
| Output location | `reports/admissions/`, **gitignored** — regenerate from data, never commit a stale binary. |
| Prompt delivery | **Both** — printed inside the PDF as a fenced Appendix A, *and* written as a separate `.txt`. |

And from a mid-planning clarification by the user, which shapes the whole prompt:

> **the admissions episode is about how to apply and who to contact and etc**

The episode is a **practical application how-to**, not a school review and not a "why
choose this school" pitch. Every segment must answer a *do-this* question: what do I
submit, by when, which test, who do I call. The prompt below is written to enforce that,
and the PDF deliberately carries no marketing prose because the Admissions area holds none.

## Context — what the implementing window needs to know

### Where the data lives

Six of eleven schools have an Admissions research area. Verified 2026-09-06:

```
src/data/admissionsPrograms/
  charlotte-christian.ts        4 bands   2026–27 entry cycle
  charlotte-country-day.ts      3 bands   2027–28 entry cycle
  charlotte-latin.ts            4 bands   2026–27 entry cycle
  covenant-day.ts               3 bands   2027–28 entry cycle
  hickory-grove-christian.ts    5 bands   2027–28 entry cycle
  providence-day.ts             3 bands   2026–27 entry cycle
```

The five schools with **no** admissions data are `cannon`, `carmel-christian`,
`charlotte-catholic`, `davidson-day`, `gaston-day`. For those, the command must stop —
see "The no-data gate" below.

### ⛔ The registry cannot be imported under Node — import the school file directly

`src/data/admissionsPrograms.ts` calls `import.meta.glob` at module scope for its locale
overlays (line ~355). That is a **Vite compile-time transform which throws under plain
Node**, and the module deliberately does not guard it — a runtime guard survives into the
bundle and silently kills every overlay. This is the identical constraint that forces
`scripts/gen_data_schema.mjs` to *parse* the `*Program.ts` card registries rather than
import them.

**The per-school modules have no glob and import cleanly.** Verified at planning time:

```bash
node -e "
const m = await import('./src/data/admissionsPrograms/providence-day.ts');
console.log(m.providenceDay.guide.bands.map(b=>b.key).join(','))
"
# -> tkk,g15,g612
```

So the script imports `../src/data/admissionsPrograms/<slug>.ts` and takes
`Object.values(module)[0].guide`. Do **not** import the registry, and do **not** re-parse
source text — a real import is available here and gives real typed objects.

Note the named export differs per file (`providenceDay`, `charlotteLatin`, …), which is
why `Object.values(mod)[0]` is the right accessor rather than a name derived from the slug.
Guard it: if the module has no single export with a `.guide`, fail loudly rather than
writing a half-empty PDF.

### The data shape — read the types before rendering

`src/data/admissionsPrograms.ts` lines 40–200 carry the full type set with doc comments.
The report renders `AdmissionsGuide`:

| Field | What it is | Report section |
|---|---|---|
| `headline` | one-paragraph orientation | §1 opening |
| `cycle` | e.g. `'2026–27 entry cycle'` | printed on **every page header** |
| `stats[]` | `{value,label}` headline figures | §1 key figures |
| `rules[]` | `{title,text}` framing rules | §1 how this process works |
| `spineNote` | the shared inquire→apply→materials→decision→contract spine | §2 |
| `bands[]` | `AdBand` — the heart of the report | §3, one sub-section each |
| `aid` | `{title,text,button}` parallel financial-aid clock | §4 |
| `comparison` | `{kicker,title,rows}` cross-band table | §5 |
| `contacts` | `{kicker,title,address,people[]}` | §6 |
| `checklist` | `portalNote`, `aidPanel`, `contactPanel`, `disclaimer` | §7 |
| `sources[]` | `{label,url?}` citations | §8 |

Per band (`AdBand`): `key`, `label`, `sublabel?`, `title`, `deadlines[]` (4 tiles),
`steps[]` (ordered, each `{title, tag, tagKind, detail}`), `watchOuts[]`,
`checklistCallout?`, `checklistRows[]` (`{action, detail, due}`).

**Render both `steps` and `checklistRows`.** They are deliberately not the same list — the
type's own comment says the paper sheet splits actions the on-screen stepper merges. For a
spoken episode the `checklistRows` are the more useful sequence, and the prompt leans on
them; but `steps` carry the `detail` prose that explains *why*. Include both, labeled
clearly so NotebookLM does not read them as two different processes.

### Optional fields are genuinely absent — omit, never render an empty shell

Measured across all six schools at planning time:

- `sublabel` — **absent on some Charlotte Latin bands** (a deliberate user decision, 2026-08-31)
- `watchOuts` — **empty on some bands** of charlotte-christian, charlotte-latin, covenant-day, hickory-grove-christian
- `checklistCallout` — **absent on some Charlotte Country Day bands**
- `comparison.rows[].cells` — **every school has at least one `{all: string}` row**, which
  spans every band column instead of carrying per-band cells

This is the project's standing **zero-items rule**: a card or division with zero items is
omitted entirely, never shipped as an empty shell. Apply it in the PDF — a band with no
watch-outs emits no "Watch out for" heading at all. And handle the `{all: …}` comparison
row: rendered as a single full-width cell, not as a blank row.

### The cycle rule is load-bearing

`admissionsPrograms.ts` states it in capitals: only the CURRENT entry cycle ships, and
`cycle` labels every date. The report must print the cycle string in the **running header
of every page** and repeat `checklist.disclaimer` verbatim, because that disclaimer carries
the "cycle dates shift year to year — verify against the live calendar before acting"
warning. An episode that states a date without that caveat is the single worst failure mode
here — a parent could miss a deadline. The prompt requires the caveat to be spoken aloud.

Note the two cycles in flight: three schools are on `2026–27` and three on `2027–28`. The
report must never normalize them.

### `unpublished` deadlines and "confirm with admissions"

`AdDeadline.unpublished` marks a tile whose `value` is a known constant (`'4:00 p.m.'`)
rather than a published date. It is **not rendered in the app**, deliberately. In this
report it **should** be surfaced — as a short marker such as `(time only — date on the
school's live calendar)` — because NotebookLM cannot infer it and would otherwise speak
"4:00 p.m." as if it were a date. This is a divergence from the app's render and it is
intentional; note it in the script's header comment so a later pass does not "fix" it.

**Only Providence Day exercises this path.** Measured at planning time: `providence-day`
carries **2** `unpublished` tiles (the Grades 1–5 and 6–12 decision releases, both
`'4:00 p.m.'`); the other five schools carry **0** — Country Day's file states outright that
"Every CCDS date on this card is published, so no tile carries `unpublished`". So test this
marker on the Providence Day PDF specifically; a pass on any other school proves nothing
about it.

Similarly, the data carries the schools' own **NOT PUBLISHED** findings as visible phrases
like `'Required — instrument not published'` and `'confirm with admissions'`. These are
load-bearing research findings, not gaps to tidy. Print them as-is, and have the prompt
instruct the hosts to say "the school doesn't publish this — call and ask" rather than
skipping the row or guessing.

### `**bold**` is real markdown in three fields — and NOT supported in the rest

Measured at planning time: the six data files carry **676 `**` markers** between them
(hickory-grove-christian alone has 286, providence-day 16). This is not incidental — it is
a deliberate, documented convention, and the data files carry a `NOTE FOR EDITORS` block
spelling out exactly where it applies:

> `rules[].text` is rendered RAW — `<strong>{title}</strong> {text}` in
> AdmissionsProgram.tsx — so it is the one prose field on this card with NO markdown
> support. A `**bold**` span here ships as literal asterisks. `Emphasized` covers
> `steps[].detail`, `watchOuts[].text` and `aid.text`, but not this, and not
> `deadlines[].value` / `label`.

So the report must convert `**…**` in exactly these fields:

- `bands[].steps[].detail`
- `bands[].watchOuts[].text`
- `aid.text`

and must **not** treat `**` as markup anywhere else — in `rules[].text`,
`deadlines[].value`, `deadlines[].label`, `comparison.rows[].cells`, `checklistRows[]`,
`spineNote` or `headline`, a literal `**` would be a data defect, not emphasis. (There
should be none; if the implementer finds one, report it rather than silently rendering it.)

The app's own converter is `Emphasized` in `src/components/AdmissionsProgram.tsx:85`, and
the report should use the same split so the two renderings cannot diverge:

```js
text.split(/(\*\*[^*]+\*\*)/g)   // odd parts are the bold spans
```

Reimplement that regex in the script — do not import the component (it is TSX and pulls in
React). Emit `<strong>` for the bold parts.

**Do not print raw `**` into the PDF.** This exact defect shipped in this repo before: card
teasers leaked raw markdown into 103 of 674 teasers because `proseSummary` fell through to
unparsed source. Add a post-render assertion — after building the HTML string, fail if it
still contains `**` — which turns a silent cosmetic leak into a build error.

There are **no pipe-table markers** in this data (`grep -c "|"` returns 0 for all six
files), so the table-leak half of that prior defect does not apply here.

### Playwright is already available

`playwright` is a devDependency and three scripts already drive its Chromium:
`scripts/prerender.mjs`, `scripts/gen_og_images.mjs`, `scripts/check_vitals.mjs`. Follow
`gen_og_images.mjs` — it launches `chromium`, sets content, and captures. For PDF use
`page.pdf({ format: 'Letter', printBackground: true, margin: …, displayHeaderFooter: true,
headerTemplate, footerTemplate })`.

**`page.pdf()` requires headless Chromium** — it throws in headed mode. Launch plain
`chromium.launch()` as the other scripts do.

Set the page content with `page.setContent(html, { waitUntil: 'load' })`. Do **not** use
`networkidle` — a known trap in this repo (the app's Latest News fetches live so the
network never idles). This report's HTML is fully self-contained with no network requests,
so `load` fires immediately, but use `'load'` explicitly rather than relying on the default.

### This is US Letter, for a US audience, and it is a source document not a design piece

The PDF is read by a machine and skimmed by the user — it is not a published artifact. Keep
the styling plain and high-contrast: a serif or system font stack, real headings (`h1`–`h3`)
so structure is unambiguous, generous line-height, no dark backgrounds, no brand color
fields that could bleed. Do **not** import the app's CSS or brand tokens; a self-contained
`<style>` block in the generated HTML keeps the script independent of app styling churn.

Include the school name, the cycle, and a page number in the running header/footer so a
NotebookLM citation to "page 4" is meaningful.

## The no-data gate

**This is a hard requirement from the user.** If the named school has no Admissions
research area, the command must stop and explain — not degrade, not produce a thin report.

Order of checks, most specific message first:

1. **Slug not in `src/data/schools.json`** → `No school with slug "<x>". Known slugs: …`
   (list all eleven). Exit 2.
2. **Slug is a real school but has no `src/data/admissionsPrograms/<slug>.ts`** → the
   real message:

```
Charlotte Catholic High School has no Admissions research area, so there is not
enough data to build an admissions report or a podcast episode for it.

The Admissions area is what carries the entry bands, application steps, deadlines,
assessments and admissions-office contacts an episode needs. Without it there is
nothing to say beyond generalities.

Schools that DO have admissions data today:
  charlotte-christian, charlotte-country-day, charlotte-latin,
  covenant-day, hickory-grove-christian, providence-day

To add it for this school, research the school's own admissions pages into
source-material/admissions/<slug>/ and build the card — see .claude/plans/admissions.md.
```

Exit code 2. **Write no files** — not a stub PDF, not an empty prompt.

3. **The module exists but `guide` is undefined** → same message as (2). The type makes
   `guide` optional and a school with no guide renders no section.

Derive the school's display name from `schools.json` for the message. Do not hardcode
eleven names.

## Build steps

### Step 1 — `reports/` is gitignored

Add to `.gitignore`:

```
# Generated NotebookLM report artifacts — regenerate with `npm run report:admissions`
reports/
```

Verified at planning time: no `reports/` directory exists and nothing in `.gitignore` or
`package.json` references that path, so the entry is additive.

### Step 2 — `scripts/gen_admissions_report.mjs`

The whole generator, one file. Structure it as:

1. **Arg parsing** — `--school <slug>` (required), `--out <dir>` (default
   `reports/admissions`), `--quiet`. If `--school` is missing, print the six available
   slugs and exit 2. Follow the arg style of the existing `scripts/check_*.mjs`.
2. **Resolve the school** — read `src/data/schools.json` for the display name; run the
   no-data gate above.
3. **Import the data** — `await import('../src/data/admissionsPrograms/<slug>.ts')`, take
   `Object.values(mod)[0].guide`.
4. **Build the HTML** — one template function per section (§1–§8 in the table above), plus
   the fenced Appendix A carrying the prompt.
5. **Build the prompt string** — one function, `buildPrompt(school, guide)`, returning the
   text in "The NotebookLM prompt" below with the school name, cycle, band count and band
   labels interpolated. **The same string** is used for Appendix A and the `.txt`, so they
   can never drift.
6. **Render** — Playwright → `page.pdf()`.
7. **Write** both files; print their paths and sizes unless `--quiet`.

**The script must be pure** — `npm run check:script` (`scripts/check_script_purity.mjs`)
exists in this repo; run it and comply with whatever it enforces.

Add to `package.json` scripts:

```json
"report:admissions": "node scripts/gen_admissions_report.mjs"
```

**No `--experimental-strip-types` flag is needed.** Verified at planning time on Node
v24.18.0: `node -e "import('./src/data/admissionsPrograms/covenant-day.ts')"` resolves with
no flag, and `gen_og_images.mjs` already imports `../src/data/brands.ts` under a plain
`node scripts/…` invocation. Match that.

**Do NOT chain this into `npm run build`.** It writes gitignored artifacts on demand; the
build must not depend on it and must not slow down for it.

### Step 3 — the `/admissions-episode` command

The user must be able to **reuse this per school**, and it must **prompt for the school**.
Create `.claude/commands/admissions-episode.md` — a slash command, because this is a
run-it-again-per-school operation, not a one-time implementation.

It must:

1. **Ask which school**, listing the six that have admissions data with their band counts
   and entry cycles, plus a note naming the five that do not. Accept a slug or a name.
   If the user passed an argument, use it — but still validate it.
2. **Run the no-data gate** and stop with the explanation above if the school has none.
   State plainly that no files were written.
3. Run `npm run report:admissions -- --school <slug>`.
4. Report the two output paths, and print the **NotebookLM upload instructions**:
   - open notebooklm.google.com, create a notebook named
     `Charlotte Private School Conversations — <School> Admissions`
   - upload the PDF as the only source
   - open Audio Overview → Customize, paste the prompt from the `.txt`
   - generate, then download the audio
5. Remind the user to **listen before publishing**, specifically checking that the dates
   and the entry cycle were spoken correctly and that the
   `www.charlotteschoolinsights.com` mention landed at both the open and the close.

Keep the command thin — it orchestrates, the script does the work.

### Step 4 — verification

Run all of these and record the output in the PR:

```bash
# every school with data produces a report, with no code change between them
for s in charlotte-christian charlotte-country-day charlotte-latin \
         covenant-day hickory-grove-christian providence-day; do
  npm run report:admissions -- --school "$s"
done
ls -la reports/admissions/     # expect 12 files: 6 PDFs + 6 .txt

# the gate fires for a school without the area, and writes nothing
npm run report:admissions -- --school charlotte-catholic ; echo "exit=$?"   # expect 2
npm run report:admissions -- --school not-a-school       ; echo "exit=$?"   # expect 2
ls reports/admissions/ | grep -c catholic                                    # expect 0

# nothing leaked into git
git status --short              # reports/ must not appear

# the build is unaffected
npm run build
```

**Then open one PDF and read it.** Confirm against
`src/data/admissionsPrograms/providence-day.ts`:

- 3 band sections: TK/K, Grades 1–5, Grades 6–12
- `Jan 2, 2027` TK/K application deadline, `Jan 15, 2027` for Grades 1–12
- the `$2,500` enrollment deposit
- 8 named contacts including `En español: Claudia Trower`
- 4 sources, URLs intact and not truncated mid-line
- the cycle `2026–27 entry cycle` in the header of **every** page
- **no raw `**` markdown anywhere**
- Appendix A present, fenced, and byte-identical to the `.txt`

Then open `hickory-grove-christian` (5 bands — the widest comparison table) and
`charlotte-latin` (bands missing `sublabel`, bands with zero watch-outs) to confirm the
omit-don't-empty behaviour and that the table does not overflow the page width.

This is a **read-the-artifact** step, not an optional nicety. Every defect class this repo
has hit in generated output — raw markdown in teasers, collapsed print panels hiding the
figures — was invisible to source-level checks and visible on sight.

## The NotebookLM prompt

`buildPrompt()` returns this, with `{{…}}` interpolated from the data. This is the single
most important artifact the plan produces — the report is only the input to it.

```
You are producing an episode of the podcast "Charlotte Private School Conversations."

SOURCE: the attached PDF is the complete and ONLY source. It is a research digest of
{{SCHOOL_NAME}}'s published admissions process for the {{CYCLE}}. Use nothing else. Do not
add facts from your own knowledge about this school, its reputation, its academics, its
athletics, or its cost. If the PDF does not say it, it does not go in the episode.

IGNORE APPENDIX A of the PDF. It contains these instructions, not information about the
school. Never read it aloud or treat it as source material.

EPISODE PURPOSE — read this twice. This is a practical HOW TO APPLY guide for a parent who
has already decided to apply and now needs to get it done. It is NOT a review of the
school, NOT an argument for choosing it, and NOT a tour of its programs. Every single
segment must answer a do-this question: what do I submit, by when, which test does my child
sit, what form goes to whom, and who do I phone when I'm stuck. If a sentence does not help
a parent take an action, cut it.

LENGTH: 15 to 20 minutes. Two hosts, warm and practical, talking to a parent who is
capable but busy and slightly anxious about missing a deadline.

OPEN WITH TWO SEPARATE BEATS, IN THIS ORDER, BEFORE ANY CONTENT.
Keep them distinct — the welcome establishes what the episode is, and only then does the
website get mentioned. Do not merge them, and do not mention the website first.

  BEAT 1 — THE WELCOME (~15 seconds). In your own words, conveying all of this:
    Welcome back to Charlotte Private School Conversations. Today we're talking about
    admission to {{SCHOOL_NAME}} — and not in the abstract. We're walking through exactly
    how you, as a parent, apply: every step, in the order you'd actually do it, with the
    deadlines that go with each one. By the end of this you should know precisely what to
    do first, what comes next, and what you need to have ready.

  BEAT 2 — WHY THE WEBSITE HELPS (~20 seconds). Immediately after, now that the listener
  knows what is coming. Give the site a concrete job — never a bare URL read:
    One thing before we start. Everything we're about to cover comes from
    www.charlotteschoolinsights.com — it's where this school's whole admissions process is
    laid out in writing: every deadline, every form, every contact. Two reasons to pull it
    up right now. First, we're going to say a lot of dates out loud, and you shouldn't have
    to write them down — they're all on the page. Second, the site lets you pick your
    child's entry grade and filters everything down to just your track, then gives you a
    checklist you can print and tick off. So the best way to listen to this episode is with
    that page open, building your own list as we go.

  WHY BEAT 2 IS FRAMED THAT WAY — keep this reasoning if you reword it. This school runs
  {{BAND_COUNT}} separate entry tracks, so most of what a listener hears will not apply to
  their own child. Audio cannot filter; the website can. Pointing at it as the thing that
  narrows the process down to THEIR track is both true and the site's real advantage over
  the episode. Never pitch it as a generic recommendation.

THEN RUN THESE SEGMENTS IN THIS ORDER:

1. THE SHAPE OF THIS APPLICATION (~2 min)
   The one portal the school uses, and the fact that the process splits into
   {{BAND_COUNT}} entry bands: {{BAND_LABELS}}. Explain that a parent only needs to follow
   the band their child is entering, and tell them how to identify theirs. Cover the shared
   spine — inquire, apply, submit materials, decision, contract — so the later segments have
   a skeleton to hang on.

2. THE SEGMENTS THAT DIFFER — one per entry band ({{BAND_COUNT}} segments, ~2-3 min each)
   For EACH band in the PDF, in the order the PDF gives them, cover:
     - who this band is for
     - the steps IN ORDER, as a parent would actually do them
     - the deadline for each step, spoken as a full date
     - which assessment or screening the child sits, by name
     - which forms and records must be sent, and who sends them
     - the band's watch-outs, if the PDF lists any for that band
   Say the band's name clearly at the start and end of its segment so a parent can skip to
   theirs.

3. THE MONEY CLOCK RUNS SEPARATELY (~1-2 min)
   The financial-aid process and its own deadline, exactly as the PDF states it. Make the
   point that it is a parallel track with a different date, and that applying for aid does
   not affect the admission decision where the PDF says so. Do not discuss whether the
   school is worth the money — that is not this episode.

4. SIDE BY SIDE (~2 min)
   Walk the cross-band comparison table: what actually changes between bands and what is
   identical in all of them. This is the segment a parent with two children of different
   ages needs.

5. WHO TO CONTACT (~1-2 min)
   Name the admissions office, its address and main number, and the specific people the PDF
   names with their roles. If the PDF names a Spanish-speaking contact, say so explicitly.
   Encourage calling early rather than guessing.

6. THE THINGS THE SCHOOL DOESN'T PUBLISH (~1 min)
   The PDF marks some items "not published", "confirm with admissions", or gives a time
   without a date. Say these plainly: the school does not publish it, so call and ask. Never
   fill one of these gaps with a guess or an assumption from another school.

CLOSE WITH THIS (~30 seconds):
  Recap the two or three dates that matter most for this school. Then, in your own words:
    That's the whole application. Every date and every contact we mentioned is at
    www.charlotteschoolinsights.com — pick your child's entry grade and it'll show you just
    your track, then print you a checklist. Do three things this week: send the inquiry
    form, put the deadlines in your calendar today, and call the admissions office about
    anything you're unsure of. They'd far rather hear from you early.

  The two website mentions do DIFFERENT jobs and must not be interchangeable: the open says
  "listen with this open", the close says "now go and act on it". Both name the
  entry-grade filter and the printable checklist, because that is the specific help on
  offer.

HARD RULES:
- Every date you speak must be labeled as the {{CYCLE}}. At least once, say clearly that
  cycle dates shift from year to year and that parents must verify against the school's own
  live admissions calendar before acting. This is the most important caveat in the episode.
- Speak dates in full ("January the fifteenth, twenty twenty-seven"), never as digits.
- Never invent a date, a fee, a test name, a form name, or a person's name. If the PDF says
  it is not published, say that it is not published.
- Do not compare this school to any other school, or rank it. This episode is about one
  application.
- Do not describe the school's academics, sports, arts, or college outcomes. Out of scope.
- Mention www.charlotteschoolinsights.com exactly twice: once in the opening's second
  beat, once in the close. Never in between — sprinkling it through the middle reads as an
  advertisement and undoes the credibility of the rest. Each mention must state what the
  site actually DOES for the listener (filters to their entry grade, gives a printable
  checklist, holds every date so they need not take notes), never just the address.
- Say "Charlotte Private School Conversations" in the opening, and open with "Welcome
  back" — this is an established show, not a first episode.
```

### The two website mentions are claims about the app — verified

The open and close both promise the listener two specific things. Both were verified
against the live app at planning time, so the episode is not overselling:

- **"pick your child's entry grade and it filters to just your track"** — real. The band
  selector is `AdmissionsGuideBody` in `src/components/AdmissionsProgram.tsx:236`, labeled
  `admissions.applyingFor` ("I'm applying for…"), and it re-renders the whole guide for the
  selected band. It collapses for a one-band school (`single`), which no admissions school
  is today.
- **"gives you a checklist you can print and tick off"** — real. The `Export checklist`
  button (`admissions.exportChecklist`) links to a dedicated per-band route,
  `/school/<slug>/admissions-checklist/?band=<key>`, rendered by
  `src/pages/AdmissionsChecklist.tsx` with `@media print` rules in `src/index.css`.

If either affordance is ever removed or renamed, **the prompt's opening and closing lines
must change with it** — otherwise the episode sends parents to a control that no longer
exists. Note the dependency here rather than discovering it from a listener.

Interpolate `{{SCHOOL_NAME}}` from `schools.json`, `{{CYCLE}}` from `guide.cycle`,
`{{BAND_COUNT}}` from `guide.bands.length`, `{{BAND_LABELS}}` from the band labels joined
readably (`'TK / Kindergarten, Grades 1–5, and Grades 6–12'`).

Note the segment count is **data-driven** — Hickory Grove has 5 bands and will get 5 band
segments, which is why segment 2 is written as a loop rather than a fixed list. For a
5-band school the prompt's own 15–20 minute budget gets tight; that is acceptable and
NotebookLM will compress, but do not hardcode per-band minute counts that sum past the
budget.

## What this plan deliberately does NOT do

- **No app code changes.** No new component, no new route, no UI. This is a build-time
  generator writing gitignored files. The UX-approval gate is therefore not engaged, and
  nothing here touches `src/`.
- **No new dependency.** Playwright is already a devDependency.
- **No translation.** The report and prompt are English-only, single-phase. They are not
  user-facing app text — they are a research artifact and a tool instruction, neither of
  which lives in `src/locales/*.json` or the prose overlays. This plan is **phases: 1** for
  that reason. Do not add these strings to any locale catalog.
- **No new source-material.** Every fact comes from data already committed and already
  cited. Nothing is fetched, so the data-provenance standard is satisfied by the existing
  files.
- **No episode row in `src/data/podcastEpisodes.ts`.** The episodes this produces are not
  published yet. Once one is live, adding it to that table (so it appears under the
  school's Admissions header) is a separate, one-line change — see
  `.claude/plans/newcharlottechristianepisode.md` for that pattern.

## Risks

**NotebookLM reads Appendix A aloud.** The prompt tells it not to, and the appendix is
fenced and labeled — but this is a generative tool and instruction-following is not
guaranteed. If it happens on the first test, the fix is to drop Appendix A from the PDF and
ship the prompt only as `.txt`; the `.txt` is written either way, so nothing is lost. Test
this on the first real generation and record the result in the PR.

**A wide comparison table overflows.** Hickory Grove's 5 bands make a 6-column table on
Letter portrait. Check it visually; if it overflows, either rotate that one section to
landscape via a CSS page rule or render the comparison as per-band lists instead. Do not
let a column run off the page — a truncated date is worse than no table.

**The episode states a date without the cycle caveat.** The single highest-consequence
failure: a parent misses a real deadline. Mitigated three ways — the cycle in every page
header, the verbatim disclaimer in the PDF, and a hard rule in the prompt — and it is the
first thing to check when listening back.

## Verification checklist for the PR

- [ ] `npm run report:admissions -- --school providence-day` writes both files
- [ ] All six admissions schools generate with no code change between them
- [ ] `charlotte-catholic` and a bogus slug both exit 2 and write nothing
- [ ] `git status --short` shows no `reports/` entries
- [ ] `npm run build` passes unchanged
- [ ] `npm run lint` and `npm run check:script` pass
- [ ] The Providence Day PDF was **opened and read** against its data file
- [ ] Hickory Grove (5 bands) and Charlotte Latin (missing optionals) render correctly
- [ ] No raw `**` in any PDF (the post-render assertion fires on regression)
- [ ] Bold rendered in `steps[].detail`, `watchOuts[].text`, `aid.text` — and nowhere else
- [ ] Appendix A is byte-identical to the `.txt`

## To build this

```
/implement admissionsreport
```
