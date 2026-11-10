---
name: plainarts
title: Plain-language rewrite of The Arts area's English prose (13 schools, 132 sites / 132 distinct texts in src/data/artsPrograms/), English in five reviewed batches, then all nine prose locales
status: english-done
phases: 2
batches: 5                     # Phase 1 is built in five batches, each with its own review stop
created: 2026-11-10
branch: feat/plainarts
prs: []
---

# Plain-language rewrite — The Arts

## Goal

Rewrite the existing English prose in The Arts research area so it meets the
plain-language standard in `CLAUDE.md`. The reader is an average parent, the target is
grade 8–10, and no sentence runs past 30 words. This is the fourth per-area follow-up,
after College Support ([`plaincollege.md`](plaincollege.md), PR #467), Admissions
([`plainadmissions.md`](plainadmissions.md), PR #469) and Financial Aid
([`plainaid.md`](plainaid.md), PR #471).

**plainaid is the model**, with plainadmissions and plaincollege behind it. This plan keeps
their bar, their review file and guards (`scripts/plain_review.mjs`), their independent
subagent review per batch and their two-phase process. It restates what a fresh window
needs, and it adds what is specific to The Arts.

The Arts differs from the earlier areas in four ways:

- **It is mostly names.** Ensembles, courses, productions, roles, venues, teachers,
  students, award categories and festivals. A unit is often a list of them, and the
  grades above 18 come from those lists (`theatre.ledger[].result` reaches 22–23). Every
  name stays exactly as written.
- **Recognition comes in tiers, and the tier is the finding.** Win, finalist, nominee,
  placement, participation; the school's claim vs what Blumenthal or NCTC published; "could
  not be found" vs "not published". A plainer sentence that merges two tiers is worse than
  the long one.
- **The arts cards render no markdown at all.** Every field is plain text, so `**` or `*`
  in a unit ships as literal asterisks. That is the opposite of Financial Aid.
- **The Compare Arts matrix quotes this prose.** `src/data/artsMatrix.ts` cites verbatim
  fragments of each school's arts file, and `check:matrices` (in the build) fails if a
  fragment disappears.

It worked when:

- `for f in src/data/artsPrograms/*.ts; do node scripts/check_plain_language.mjs --file $f; done` reports **0 issues**
  (171 today on 107 units).
- Every ≥30-word unit is at grade ≤10, or appears in "Residual units above grade 10" with
  its reason.
- No name, count, grade level, eligibility or audition rule, credit or year requirement,
  date, figure, quote, URL or email changed. No win/finalist/nominee tier, audition/open
  marker, school-claim/verified marker or not-found/not-published marker was lost or
  added, and every `theatre` / `theater` stays as written. The extended review generator
  (Step 1) proves the mechanical part. The independent reviewer and the user check the
  rest.
- `check:matrices` stays green: every Compare Arts cite is still in its school's file.
- The user has approved the English of all five batches, and an independent subagent has
  checked every before/after pair.
- All nine prose locales carry fresh translations of the rewritten units, and every
  overlay check is green.

**Two-phase.** It changes research prose a parent reads, so Phase 1 is English only and
stops for review. Phase 2 translates. Phase 1 is further split into **five batches with a
review stop after each**, sized for a ~20-minute review (see "Batch plan").

## Context

### The worklist (measured 2026-11-10 at `da0805fa`)

Measured with the real generator:
`node scripts/plain_review.mjs --dir src/data/artsPrograms --worklist <scratch>.json`. Its
counts match `npm run check:plain`: the `the-arts` area shows 1,279 prose units, 107
flagged and 122 at grade >10. **Worklist** = hook-flagged units plus the ≥30-word units at
grade 10–12 the hook does not flag yet (the generator's definition).

| School | Hook-flagged | Grade 10–12 only | **Worklist** | Before-words |
|---|--:|--:|--:|--:|
| cannon | 14 | 3 | **17** | 1,038 |
| davidson-day | 14 | 3 | **17** | 995 |
| charlotte-country-day | 13 | 3 | **16** | 939 |
| charlotte-christian | 10 | 3 | **13** | 826 |
| providence-day | 10 | 3 | **13** | 686 |
| charlotte-latin | 6 | 6 | **12** | 627 |
| trinity-episcopal (K–8) | 11 | 0 | **11** | 460 |
| gaston-day | 10 | 0 | **10** | 375 |
| carmel-christian | 7 | 1 | **8** | 368 |
| hickory-grove-christian | 6 | 1 | **7** | 272 |
| charlotte-catholic | 3 | 2 | **5** | 291 |
| charlotte-prep (K–8) | 2 | 0 | **2** | 64 |
| covenant-day | 1 | 0 | **1** | 42 |
| **Total** | **107** | **25** | **132** | **6,983** |

The hook reports **171 issues** on those 107 units: 88 long sentences, 78 grade, and **5
jargon**: `rigor` (Cannon `music.subhead`), `experiential learning` (Latin
`ladder.divisions[0].items[0]`, Gaston `ladder.divisions[0].items[2]`) and `pedagogy`
(Trinity `visual.headline`, `verdict.headline`).

**Worklist sites by field** (132): `ladder.enrichment[].text` 24,
`theatre.ledger[].result` 17, `verdict.holdsUp[].text` 15, `theatre.honestContext` 11,
`visual.footnote` 10, `music.boardNote` 8, `theatre.whoRunsIt` 6, `music.ladderNote` 6,
`verdict.ask[]` 6, `music.ladder[].text` 5, `visual.exhibits[].detail` 5,
`theatre.venueNote` 4, `visual.pathNote` 3, `ladder.subhead` 2,
`ladder.divisions[].items[]` 2, `visual.subhead` 2, `verdict.headline` 2,
`music.subhead` 1, `theatre.subhead` 1, `theatre.headline` 1, `visual.headline` 1.

**132 paths are 132 distinct texts.** No worklist text appears at a second path anywhere in
the 13 files, so there are **no exact repeat groups**. There are many near-repeats (next
section).

### Near-repeats (text shared across cards or schools)

Measured with a 7-word shingle scan over all 1,297 arts prose units (scratch script, not
committed). The rules are plainaid's:

- **Both sites on the worklist:** rewrite the shared part the same way at every site, and
  change only what differs. The first batch to rewrite a shared part sets its wording; a
  later batch copies it, and the reviewer checks it against the earlier review file.
- **One site off the worklist:** where the shared part is a whole sentence or clause, keep
  it **byte-identical** in the worklist unit and rewrite only the rest. Where it is only a
  shared name or list, the names and their order must still agree with the off-worklist
  site.

**Both on the worklist** (rewrite identically):

| Shared part | Sites | Batch |
|---|---|---|
| "No wins. N finalist placements…: Best Actress (…), Best Actor (…), …" (same lead, same list form) | providence-day `theatre.ledger[0].result`, `[1].result` | 1 |
| The NCTC record: Superior ratings, Overall Regional Site Winner (Adjudicators’ Choice), Regional (Audience Choice), Excellence in Directing, the Radium Girls State Festival run with state-level Lighting and Set Design honors | providence-day `theatre.honestContext`, `verdict.holdsUp[1].text` | 1 |
| "five students into the 2026 ACDA Southern Region Honor Choir" | providence-day `music.ladder[2].text`, `verdict.holdsUp[2].text` | 1 |
| "Three dedicated drama directors, one per division" | charlotte-country-day `ladder.subhead`, `theatre.whoRunsIt` (and off-worklist `verdict.holdsUp[5].text`, kept byte-identical) | 2 |
| The Hance Fine Arts Center space list (four studios, two-story dance studio, music suite with practice rooms, Black Box Theater) | charlotte-country-day `ladder.enrichment[1].text`, `verdict.holdsUp[0].text` | 2 |
| "so performance, rehearsal and studio work never compete for the same room" | charlotte-country-day `theatre.venueNote`, `verdict.holdsUp[0].text` | 2 |
| "Roughly nine placements incl. Best Overall Direction, Best Choreography Execution and Best Ensemble/Chorus, plus … No win located." | charlotte-country-day `theatre.ledger[2].result`, `[3].result` | 2 |
| "no external visual-arts recognition (Scholastic or otherwise)" | carmel-christian `visual.footnote`, hickory-grove-christian `visual.footnote`, cannon `visual.footnote` ("(Scholastic Art & Writing or otherwise)" — keep its longer name) | 2 → 3, 5 |
| "the NCTC festival draws 3,500+ students from 100+ schools across 130+ productions" | charlotte-country-day `theatre.honestContext`, cannon `theatre.honestContext` | 2 → 3 |
| "Five finalist placements, (again) one in every performance category: Best Actor (…), …" | cannon `theatre.ledger[1].result`, `[3].result` | 3 |
| "a full musical out of a very small student body … far fewer peers" | davidson-day `theatre.honestContext`, `verdict.holdsUp[1].text` | 4 |
| Trinity's Ghana exchange: Children Inspiring Hope (CIH), begun 2023-24, "second consecutive year as of October 2024", "CIH's first new partner school since the pandemic", led by Jen Rankey-Zona with CIH founder Amy Gaylor Nedriga | trinity-episcopal `ladder.enrichment[1].text`, `visual.exhibits[4].detail`, `visual.subhead` | 4 |
| "a 2025 CATO Excellence in Teaching Award … one of six educators recognized across the Charlotte area" | trinity-episcopal `visual.subhead`, `visual.exhibits[3].detail` | 4 |
| "choice-based" / "named pedagogy" (the jargon gloss) | trinity-episcopal `visual.headline`, `verdict.headline` | 4 |
| "Amara Aghedo and Christian Young … across both years — a repeat producer of nominated performers" | hickory-grove-christian `theatre.honestContext`, `verdict.holdsUp[0].text` | 5 |

**One site off the worklist** (keep the shared sentence or clause byte-identical in the
worklist unit):

| Shared text | Worklist site | Off-worklist site(s) |
|---|---|---|
| "the backstage/technical course starts in Grade 6 — a year before the acting course" (also a Compare cite) | charlotte-latin `theatre.whoRunsIt` | `ladder.divisions[1].items[1]`, `verdict.holdsUp[1].text` |
| "the same +1 quality point as an Honors academic course" | charlotte-catholic `music.ladderNote` | `verdict.holdsUp[1].text` |
| "individual production titles were not published at time of research" | charlotte-christian `ladder.enrichment[2].text` | `theatre.season[0].detail` (and cannon `theatre.ledger[0].result`) |
| the Worship and Performing Arts center's black box / scene shop / dressing rooms | charlotte-christian `ladder.enrichment[0].text` | `theatre.venueNote`, `verdict.holdsUp[1].text` |
| the Lower School Fine Arts Center | charlotte-country-day `ladder.enrichment[1].text` | `visual.exhibits[2].detail` |
| NCTC naming Jenny Goodfellow North Carolina’s 2022 K-12 Theatre Arts Educator | charlotte-country-day `theatre.honestContext` | `verdict.holdsUp[4].text` |
| "Honors, AP or Advanced Topics — there is no regular-track arts course" | cannon `verdict.holdsUp[0].text` | `ladder.headline` |
| "Honors Theater I, II and Theater in Performance" | cannon `theatre.whoRunsIt` | `ladder.divisions[2].items[3]` |
| "an auditioned 40-person chorus" | cannon `ladder.enrichment[0].text` | `verdict.holdsUp[5].text` |
| the five-category sweep / "regional placement, state advancement or named award" | cannon `theatre.honestContext` | `verdict.holdsUp[1].text`, `verdict.ask[2]` |
| "The Jazz Combo is audition-only" | cannon `music.boardNote` | `music.ladder[1].text` |
| "…the new Texas Grace Audio Lab" (the off-worklist site says "Backed by"; the two never matched word for word, corrected at Batch 3) | cannon `verdict.holdsUp[4].text` | `music.ladder[2].text` |
| "…or Tri-M chapter could be found" | davidson-day `verdict.ask[4]` | cannon `verdict.ask[3]` |
| "only one fine-arts credit is required to graduate" | davidson-day `verdict.holdsUp[5].text` | `ladder.subhead` (and covenant-day `ladder.subhead`) |
| "Best Ensemble/Chorus and Best Overall Direction" | davidson-day `theatre.honestContext`, `ledger[2].result`, `verdict.holdsUp[2].text` | `theatre.headline` |
| "a student once won a scholarship for non-performing theater work" | davidson-day `theatre.whoRunsIt` | `verdict.ask[3]` |
| "a materially lower barrier than an auditioned band or choir" | davidson-day `verdict.holdsUp[0].text` | `music.ladder[0].text` |
| "…matter more here than at a school that …everything" (the off-worklist site says "documents", the worklist unit "publishes"; the two never matched word for word, corrected at Batch 4) | davidson-day `music.ladderNote` | `verdict.subhead` |
| "…followed by an in-person round by invitation" (the off-worklist site says "a video round"; the two never matched word for word, corrected at Batch 2) | carmel-christian `music.boardNote` | `music.ladder[1].text` |
| "participate in adjudicated festivals annually, and the Middle School band has earned superior ratings at ACSI band festivals" | hickory-grove-christian `ladder.enrichment[0].text` | `music.ladder[1].text`, `verdict.holdsUp[2].text` |
| "numerous Scholastic Art and Writing Awards" | gaston-day `visual.exhibits[1].detail` | `verdict.holdsUp[3].text` |
| the quote "at chapels, commencement, and various venues outside of school" | trinity-episcopal `ladder.enrichment[0].text` | `music.ladder[2].text` |

### How each field renders (what a rewrite may contain)

Confirmed in `src/components/ArtsProgram.tsx`. **No arts field renders markdown.** Every
field is either raw `{text}` or `localizeMoneyText(text)`, which returns a plain string.
So:

- **Never add `**` or `*` to any arts unit.** Guard (l) runs with `--md-paths '^$'` (a
  regex no path matches), so any `**` count change fails, and the new guard (o) fails a
  single `*` (Step 1).
- **Two worklist units already ship literal single asterisks**: covenant-day
  `theatre.honestContext` (`*Curtains*`) and gaston-day `theatre.honestContext`
  (`*shape*`, `*record*`). Drop the asterisks and keep the words (plainaid's Christian
  precedent). Never add quote marks in their place, because guard (d) counts quoted spans.
- **Caps emphasis is the arts files' only emphasis** ("parent AND faculty", "NOT won",
  "ONLY AP course", "NON-performing", "NO stagecraft", "FINALIST — not nominee",
  "GOLD KEY", "Best Actress WIN"). Keep each capitalized word capitalized, on the same
  word, as plainaid kept `**` on the same words.

| Field | Renders as | Notes for a rewrite |
|---|---|---|
| `*.headline` | `<strong>` lead, then `subhead` in muted text after a space | They read as one paragraph. Splitting a headline is fine; keep it short. |
| `verdict.holdsUp[].text`, `music.ladder[].text` | `<strong>{label}</strong> — {text}` | The text **starts lowercase**, continuing the bold label. Keep the first word lowercase; later sentences start capitalized. |
| `theatre.ledger[].result` | a grid cell beside `year` and `show`, with a WIN chip when `win: true` | `win` is not edited. The text must still agree with it ("No win located" stays where `win` is absent). |
| `verdict.ask[]` | a checkbox row | It ends as a question. A statement may come before the question, as several do today. |
| `ladder.divisions[].items[]` | one line in a division column | Short; a gloss in parentheses is fine. |
| `visual.pathNote` | after `· ` on the course-path row | Cannon's ends with no period; keep each unit's ending style. |
| `localizeMoneyText` fields | `ladder.enrichment[].text`, `whoRunsIt`, `venueNote`, `honestContext`, `ledger[].result`, `boardNote`, `ladderNote`, `visual.footnote`, `holdsUp[].text`, headlines, subheads | Safe for money. |
| raw fields (no money localization) | `theatre.season[].detail`, `music.ladder[].text`, `visual.media[].detail`, `visual.pathNote`, `visual.exhibits[].detail`, `verdict.ask[]`, `divisions[].items[]` | **Never move a `$` amount into one of these.** None holds one today. |

The cards are `<details class="note-card note-card-report note-card-arts">` inside
`#topic-the-arts` on `/school/<slug>/` (`SchoolDetail.tsx`), one per card key: `ladder`,
`theatre`, `music`, `visual`, `verdict`.

### What the rewritten text must survive (checks and readers of this prose)

- **The hook** runs after every Edit/Write on `src/data/artsPrograms/*.ts`. It blocks only
  at grade 12 and enforces American spelling. The grade-10 target is measured by the
  review generator.
- **`check:matrices`** (in the build, `scripts/check_compare_matrices.mjs`) asserts every
  string cite in `ARTS_MATRIX` (`src/data/artsMatrix.ts`) is still a **substring of that
  school's `src/data/artsPrograms/<slug>.ts`**. 16 cite strings sit inside worklist units.
  Most are names that recur in the file (`Jazz Ensemble`, `Contemporary Ensemble`), but
  three are clauses, and one exists **only** in a worklist unit:
  - `charlotte-latin:ladder.divisions[0].items[0]`: **"Experiential music"** (cite
    `generalMusic.LS`). It is the file's only copy. The unit is also flagged for the
    `experiential learning` jargon. Keep "Experiential music" verbatim and explain it in
    parentheses right after (the checker's `explained()` accepts a parenthetical).
  - `charlotte-latin:theatre.whoRunsIt`: "the backstage/technical course starts in Grade 6"
    (`technicalTheatre.MS`). Keep it verbatim (it is also a near-repeat).
  - `charlotte-christian:theatre.whoRunsIt`: "technical directing and stage management"
    (`technicalTheatre.US`). Keep it verbatim.
  - The rest, kept verbatim as names anyway: cannon "Media Arts"; charlotte-catholic
    "Jazz Band", "Marching Band"; davidson-day "Theatre Performance Ensemble", "Film Studies
    & Production", "Contemporary Ensemble"; gaston-day "Concert Choir"; providence-day
    "Jazz Ensemble", "A Cappella", "Musical".

  Never edit `artsMatrix.ts` to follow a rewrite. Rewrite around the cite instead.
- **Non-prose fields are not on the worklist and are not edited**: `stats[].value/label`,
  `divisions[].name/grades`, `enrichment[].label`, `season[].season/kind`,
  `ledger[].year/show/win`, `tracks[].label/ensembles`, `ladder[].label`, `media[].name`,
  `path[].name`, `exhibits[].when/name`, `holdsUp[].label`, `*Title`, `photo`, `sources`.
  `ensembles`, `show`, `name`, `value`, `year` and `grades` are skipped by
  `classifyField` (`scripts/i18n_fields.mjs`) as names and figures. Many of them repeat a
  name or figure the prose states (`year` "2025" beside a ledger result; a stat tile
  "3 AP" beside a subhead), so **every name and figure in a rewritten unit must survive
  char-for-char**. Guards (b), (f), (k) and (m) enforce this.
- **`check:spelling`** (in the build) fails on any British form. Two British forms the map
  does not catch sit in worklist units: charlotte-christian `ladder.enrichment[0].text`
  "two storeys" (→ "two stories") and charlotte-latin `music.ladder[2].text`
  "clarinettist" (→ "clarinetist"). Fix both in the rewrite. **`theatre` / `theater` are
  left exactly as written** (usspelling decision, user 2026-11-09). Both forms occur, often
  in names (`Black Box Theater`, `Honors Theater I`, `Theatre Performance Ensemble`), and
  a unit may hold both. Guard (h)'s new THEATRE / THEATER classes enforce it.
- **`check:schema`** reads card keys, not prose, so no drift is expected.
- **`check:dates`** reads only the work files, so it has no effect in Phase 1. In Phase 2
  it fails a translation that keeps an English month next to a day or year outside a quote.
- **`check:digits`** (Phase 2) compares the numeric tokens of each new `t` with its English.

### Arts content that must survive every rewrite

This is the list Step 3 applies and the reviewer checks against.

1. **Names exactly as printed.** Ensembles (Varsity Chorus, Modern Ensemble, Jazz Combo,
   Ignite Band, Contemporary Ensemble, Theatre Performance Ensemble, ACT 1, ACT 2),
   courses (Honors Theater I, Honors Visual Foundations, Advanced Topics: Art History,
   Music Technology I–III, Visual Art IV (H), Honors Portfolio Prep (364), "Jazz 1"),
   productions and roles ("Best Actor (Griffen Evans as Harry Bright)"), venues (Cindric
   Performing Arts Center, Leck Family thrust stage, Gorelick Family Theater, Hance Fine
   Arts Center, McMahon Fine Arts Foyer, The Mill, Texas Grace Audio Lab), teachers and
   students, award categories (Best Featured Performer, Best Choreography Execution, Best
   Student Set Designer, Best Overall Direction), festivals and bodies (Blumey, NCTC, CITA,
   NCAIS, NC-ASTA, ACDA, ACSI, NCMEA, Scholastic Art & Writing, Jimmy Awards, CATO, Arts &
   Science Council, Children Inspiring Hope), platforms (Soundtrap, Ableton Live, Logic
   Pro, GarageBand, Vimeo), and Trinity's Vimeo titles with their dates and run times.
   Class-year marks stay (`’28`). A name keeps its spelling, case and punctuation.
2. **Recognition tiers, exactly.** "win" / "won" / "WIN", "finalist", "nominee" /
   "nomination" / "nod", "placement", "honorable mention", "1st Place", "3rd Place",
   "Superior ratings", "participation". On the Blumey ledgers a **nominee** (top 6) ranks
   above a **finalist** (Charlotte Christian `ledger[0]`: "FINALIST — not nominee … one
   tier below nomination"). Never merge tiers, never upgrade one ("ten finalist
   placements, not ten awards"), and keep every "No wins" / "No win located".
3. **Counts, in the form written.** Digits stay digits and words stay words: `40`,
   `3,500+`, `100+`, `130+`, `70+`, `~9`, "roughly 39", "Roughly nine", "about nine",
   "five", "ten", "Twelve", "seven", "nine", "roughly fifteen", "11th chair of 20",
   "a 1,500-applicant field", "1,500-student school". The `+`, `~` and "roughly" /
   "about" qualifiers stay attached. A count keeps its noun (placements vs awards, students
   vs schools vs productions).
4. **Grade levels and who is eligible.** "Grade 6", "6th grader", "12th graders", "grades
   9–12", "3rd–8th grade", "K–2", "(3–5, 6–8)", "from Grade 4 up", "Middle and Upper
   School", "new students must audition", "a Charlotte-area senior pursuing a
   NON-performing career", "open to all levels, all instruments and vocalists".
5. **Audition and prerequisite rules, and who decides.** "auditioned", "audition-only",
   "audition-based", "a video submission followed by an in-person round by invitation",
   "select company", "no audition", "requires a year of 'Jazz 1'", "requires departmental
   approval", "the single mandatory gateway", "can also be entered by doing three company
   productions instead of the prerequisite", "Members must perform publicly at least once
   per quarter", "no performance requirement".
6. **Credit and year requirements, and course weighting.** "two-year arts graduation
   requirement", "Two years of fine arts are required to graduate", "only one fine-arts
   credit is required", "claim the PE credit for theater", "for-credit honors ensemble",
   "carry academic credit toward the two-year requirement", "+1 quality point",
   "Honors +0.50 weighting rather than an AP +1.0", "may be repeated for a second
   portfolio", "most are repeatable".
7. **Dates, years and times, in the form written.** `2025-26` (hyphen) and `2019–2025`
   (en dash) each keep their own form. So do "Fall 2017", "fall 2018", "spring 2022",
   "since 2012", "May 17, 2026", "announced May 18", "as of October 2024", "Oct 2021",
   "11-16-21 (21:48)", "1:30–2 p.m.", "7:30 a.m.", "the 9th annual Blumeys", "the 4th
   annual Blumeys". A result keeps its year, and a year keeps its result.
8. **The school's own claim vs what an outside source shows.** Keep "the school claims",
   "school-reported", "in the school’s words", "the school’s own word", "Treat 'five
   championships' as the school’s claim", "verified", "independently confirmed",
   "confirmed directly by Blumenthal Arts", "per the contractor", "per the architect",
   "per Blumenthal’s own labeling", "which the official PDF did not confirm".
9. **Not found vs not published vs does not exist.** "could not be found", "not found",
   "no … could be located" (our search came up empty) is a different claim from "is not
   published" / "the school publishes no …" (the school does not say), and both differ
   from "there is no …" (it does not exist, as with Cannon's missing catalog courses). Keep
   each in its own class, keep "a verified absence from the nominee list, not evidence it
   sat the year out", and keep "a floor, not a complete history".
10. **Hedges and inferences.** "likely", "appears to", "implies", "suggests", "reads as",
    "inferred", "inferential", "may be stale", "may well be larger", "at least",
    "roughly", "about". A rewrite never turns an inference into a fact, or a fact into a
    hedge.
11. **Quoted spans stay byte-identical**, such as `"specifically designed for students to
    assist in the technical side of productions."`, `"26 BLUMEY Awards,"`,
    `"100% participation"`, `"award-winning"`, `"a variety of media."`, `"pursue
    admission"`, `"numerous"`, `"SOLD OUT!"`, `"Singin' in the Rain"`, `"I'm humbled and
    honored."` Rewrite around them.
12. **Direction of every comparison.** "better than the enrollment would predict", "thinner
    here than in theatre or music", "stronger than most peer schools publish", "one tier
    below", "a year before the acting course", "more than English, Science or
    Mathematics". A cross-school claim ("most peer schools", "Few peer schools") is checked
    against the other arts files before it is kept (plainaid Batch 3 precedent).

### Phase 1 builds fail at `check:live`, by design

Every rewritten unit gets a new FNV-1a stamp. The nine shipped `the-arts` overlays still
hold the old stamps, so `npm run build` stops at `check:live` with stale entries (checked:
on `main` it passes every locale). The steps below run `tsc -b && vite build` and the
build's later checks by hand. Phase 2 makes the full build green.

### Phase 2 machinery (existing, unchanged)

- Work files: `src/data/overlays/work/the-arts.<lang>.json`. Their `strings[]` hold
  `{ text, of, at: ["<slug>:<path>", …], t }` (es has 1,176). The `at` format is the same
  `slug:path` the review generator emits.
- `node scripts/i18n_splice_work.mjs --lang <code> --topic the-arts` joins a fresh extract
  to the work file by stamp and reports *kept / added / dropped*.
- `node scripts/i18n_build_overlay.mjs --topic the-arts --lang <code>` rebuilds
  `src/data/overlays/the-arts.<lang>.json`.
- `python3 scripts/check_figures.py --topic the-arts --lang <code>`.
- Locales: `PROSE_TRANSLATED` in `src/lib/i18n.ts` = es, bn, ht, te, fr, fa, it, hi, ar.
  For the mechanism, see `.claude/docs/prose-translation-architecture.md`. The worked
  precedent is plainaid's "Phase 2" implementation notes, which this plan repeats.

## Decisions

- **Scope is `src/data/artsPrograms/*.ts` only** (132 sites). No `src/content`, no
  `source-material/`, no `artsMatrix.ts`, no `artsProgram.ts` card titles.
- **Five batches, each with a review stop** (see "Batch plan"). Sizing uses before-words:
  plainaid's careful before/after read ran at 1,200–1,500 before-words in 20 minutes. The
  five batches are 1,307–1,473 words. Batch 1 is the calibration batch and also lands the
  tooling.
- **One branch, one PR, opened only after Phase 2.** Each batch is its own commit on
  `feat/plainarts`.
- **plainaid's Decisions carry over unless this section overrides them.** That covers:
  - keep-and-explain over `plain-ok`;
  - quoted spans untouchable;
  - splitting as the main tool;
  - one string per path, with no structural change;
  - no fixing other standards in passing (with the two named exceptions below);
  - words outside the jargon list fixed only inside worklist units;
  - American spelling;
  - a fresh `general-purpose` reviewer per batch;
  - research bookkeeping rewritten for plainness, never moved.
- **A long list of names becomes a `·` run inside the same string** (plainaid precedent:
  4+ parallel items after a short lead ending in a colon). This is the main tool for the
  ledger results and the faculty, space, festival and calendar lists. Every item stays, in
  order, with its parentheses. For example, Cannon `ledger[1]`: "Five finalist placements,
  one in every performance category: Best Actor (Griffen Evans as Harry Bright) · Best
  Actress (Avery Fawcett as Rosie) · …". The `sentences()` splitter reads ` · ` as a break
  (#469). Prefer plain sentences for three items or fewer. The cards already use `·` in
  division heads and path notes.
- **Caps emphasis stays on the same words** (see "How each field renders").
- **The two stray single-asterisk italics are dropped** (Covenant `*Curtains*`, Gaston
  `*shape*` / `*record*`), keeping the words. Nothing replaces them.
- **Jargon (5 units), keep-and-explain or replace:**
  - Latin `ladder.divisions[0].items[0]`: keep "Experiential music" (a Compare cite) and
    explain it. **Corrected at Batch 1:** the checker's `explained()` accepts only a
    parenthesis right after the matched word or one wrapping it, so the wording planned here
    ("Experiential music (learning music by doing it)") fails the hook. Shipped: "Hands-on
    music classes (Experiential music) — rhythm, melody, genre through singing, dancing and
    playing".
  - Gaston `ladder.divisions[0].items[2]`: replace with the plain word: "Hands-on learning
    through frequent field trips, guest speakers and virtual tours". Check first that the
    phrase is not a Gaston Day cite or quote (it is not in `ARTS_MATRIX`).
  - Trinity `visual.headline` and `verdict.headline`: "pedagogy" → "teaching method",
    identically at both sites: "A named, choice-based teaching method — Teaching Artistic
    Behaviors (TAB) — …" and "a named teaching method". Keep "Teaching Artistic Behaviors"
    and "choice-based" exactly; TAB is used by `verdict.ask[5]`, so naming it here is
    allowed and helps.
  - Cannon `music.subhead` "rising rigor under a consistent course name" → say what it
    means: the work gets harder each year while the course keeps the same name.
- **Gloss rules** (plainaid): a general term may be glossed from general knowledge
  (adjudicated festival: a festival where judges rate each group; thrust stage: a stage
  that juts into the audience; black box: a small, flexible theater room; proscenium: a
  stage framed by an arch, with the audience on one side; master class; portfolio). A
  school's or program's own acronym or term is glossed only from the source, never
  invented: TAB, CDE, NCTC, CITA, NCAIS, ACDA, ACSI and MACS stay as written unless the
  same file spells them out. **A gloss must not add a marker word of a class the unit does
  not already hold** (guard (h) reads it as a new claim).
- **Vocabulary for this area**, applied only inside worklist units:
  - "this pass", "in one research pass", "at time of research", "surfaced", "the
    baseline", "prior research" → say the plain point with the same meaning: what was or
    was not found, and that the list may be incomplete. Keep the meaning; drop the
    research process.
  - "a curricular artifact of required drama" → "a result of drama being required";
  - "articulated" (a course sequence) → "laid out step by step";
  - "substantiates" → "backs up"; "corroborate" → "confirm"; "attested" → "documented";
  - "inferential" → "our inference" is still bookkeeping; prefer "the school does not draw
    that link";
  - "quadrennially" → "every four years";
  - "the honest finding rather than a research failure" → the plain point;
  - "this series", "this roster", "peers" (meaning the schools on the site) → "the other
    schools on this site" (plaincollege precedent), only where the comparison is checked;
  - "materially lower" → "much lower"; "denominator" → "what the count is out of".
- **"TO VERIFY" leaves the prose.** carmel-christian `theatre.ledger[1].result` ends "a
  likely labeling quirk (she played Lily); TO VERIFY." That token is research
  bookkeeping, which `CLAUDE.md` says is dev-only, and arts data has no `verify` field to
  move it to. The rewrite drops the token and keeps the hedge it stands for ("likely a
  labeling error, since she played Lily"). Precedent: hickorygrovecommits (#461) stripped
  TO-VERIFY bookkeeping the same way. This is a deliberate guard-(h)-neutral change; list
  it in Implementation notes.
- **The eighth-grade student's name** in charlotte-latin `music.ladder[2].text` ("Sofia
  Rodrigues Angrisano, an eighth-grade clarinettist") conflicts with the standing rule to
  omit K–8 students' names (memory `no-minor-student-names`: report the recognition, not
  the child). **Default: drop the name in the rewrite** ("An eighth-grade clarinetist
  cleared …"), keeping every other fact. This is the one content removal in the plan, so
  it is an Open question the user can overrule before Batch 1. The research file in
  `source-material/` keeps the name.
- **The review generator gains arts marker classes and two small guards, opt-in, and they
  stay generic** (Step 1). They are calibrated on the three approved areas.

## Batch plan (Phase 1)

| Batch | Schools | Paths | Before-words | Why this grouping |
|---|---|--:|--:|---|
| **1 — calibration** | providence-day (13), charlotte-latin (12), charlotte-prep (2), covenant-day (1) | **28** | 1,419 | PD is the model school: a full ledger, the NCTC record and the ACDA repeat, the "26 BLUMEY Awards" claim vs one verified win, and the longest faculty list. Latin holds the only-copy Compare cite ("Experiential music") with its jargon, the eighth-grade name, "clarinettist", the 23.3-grade Scholastic list and the backstage cite. Prep adds a K–8 school and a grade-range list; Covenant adds the single-asterisk decision. Batch 1 also lands the tooling. |
| **2** | charlotte-country-day (16), carmel-christian (8) | **24** | 1,307 | CCD holds the longest unit (171 words), two parallel ledger rows, the "five championships" claim, the NCTC-scale sentence Cannon copies, and the Hance space list. Carmel has the WIN row, the TO VERIFY token, and sets the "Scholastic or otherwise" wording. |
| **3** | cannon (17), charlotte-catholic (5) | **22** | 1,329 | Cannon has the two parallel sweep rows, the missing-catalog-course caveats, the `rigor` jargon, and copies the NCTC and Scholastic wording. Catholic has the "+1 quality point" near-repeat, the faculty and nine-space lists, and "NOT won". |
| **4** | davidson-day (17), trinity-episcopal (11) | **28** | 1,455 | DD has the no-director and no-stagecraft units, the $5,000 scholarship, the Matilda Jr. exclusion and the small-school near-repeat. Trinity has both `pedagogy` units, the Ghana and CATO near-repeats, the Vimeo title list and the two conflicting production lists. |
| **5** | charlotte-christian (13), hickory-grove-christian (7), gaston-day (10) | **30** | 1,473 | Christian has the contractor-vs-school facility claims, "two storeys", the tier-defining "FINALIST — not nominee" row and the CITA one-data-point claim. HG copies the Scholastic wording and has its own Aghedo repeat. Gaston has the `experiential learning` item, `*shape*`/`*record*`, the seven-school acceptance list and "+0.50 vs +1.0". |

28 + 24 + 22 + 28 + 30 = **132** paths. Phase 2 runs **once**, after Batch 5 is approved.

**Batch arguments** (Steps 2 and 4), with `--dir src/data/artsPrograms`:
- Batch 1: `--slugs providence-day,charlotte-latin,charlotte-prep,covenant-day`
- Batch 2: `--slugs charlotte-country-day,carmel-christian`
- Batch 3: `--slugs cannon,charlotte-catholic`
- Batch 4: `--slugs davidson-day,trinity-episcopal`
- Batch 5: `--slugs charlotte-christian,hickory-grove-christian,gaston-day`

No `--paths` split is needed: every school sits wholly inside one batch.

**Progress tracking across windows.** Each batch is built in its own window. After each
batch, `/implement` fills that batch's row in "Batch progress". The front matter stays
`status: in-progress` through Batches 1–4. It becomes `english-done` (INDEX: *English
shipped*) only after Batch 5.

### Batch progress

| Batch | Commit | Review file | Reviewer findings (fixed) | User verdict |
|---|---|---|---|---|
| 1 | `e24c2796` | [review-batch1.md](plainarts-data/review-batch1.md) | 10 (all fixed: 6 unclear referents after a split, 1 overclaim (exhibited work), 1 strengthened verb ("runs" → "organizes"), 2 wording shifts ("jobs", "lessons")) | approved 2026-11-10, no rulings |
| 2 | `54da2493` | [review-batch2.md](plainarts-data/review-batch2.md) | 12 (all fixed: 4 referents, 3 restored unit-note keeps, 2 strengthened claims ("led to", "keeps producing"), 1 weakened figure ("high" for 100%), 1 wrong gloss (proscenium), 1 tense) | approved 2026-11-10, no rulings |
| 3 | `581246f3` | [review-batch3.md](plainarts-data/review-batch3.md) | 13 (all fixed: 5 referents, 1 widened entry rule (three productions → Theater in Performance only), 1 weakened verb ("asked" for "assigned"), 1 narrowed scope, 1 wrong "who shares", 1 wrong "scheduled", 3 wording) | approved 2026-11-10, no rulings |
| 4 | `fba99594` | [review-batch4.md](plainarts-data/review-batch4.md) | 12 (all fixed: 7 referents incl. the shared Ghana sentence at both sites, 3 "outside" read as outside Charlotte / outdoor, 1 dropped "such as", 1 fragment) | approved 2026-11-10, no rulings |
| 5 | `ab7cd636` | [review-batch5.md](plainarts-data/review-batch5.md) | 14 (all fixed: 6 referents, 1 not-named → does-not-exist, 1 overstated "built into classes", 1 paraphrased school term restored, 1 weakened contest recognition, 1 appositive, 1 list item merged, 1 "outside school", 1 "count") | |

### Unit notes (things the drafter must not get wrong)

Seeded at planning time from reading all 132 units. These are not rulings, only traps.

**Batch 1**
- **PD `theatre.honestContext`**: the school's `"26 BLUMEY Awards,"` counts nominations and
  finalist placements together with wins. Keep "exactly one outright win is verifiable —
  Max Odom, 2022", "5–6 finalists each year, converted none", "Its high-water mark was
  2016–2022", and the full NCTC list (shared with `holdsUp[1]`).
- **PD `theatre.ledger[4].result`**: "independently confirmed"; "Best Musical (Tier 2)";
  both went elsewhere, to the named schools.
- **PD `music.ladder[2].text`**: the calendar list is seven fixed dates; keep them in
  order. Keep "Verified result" and "one of them in her first year in chorus".
- **PD `visual.footnote`**: 7 faculty names in three divisions; two Gold Keys out of
  "roughly fifteen awards overall"; "No national-level Scholastic medals were found"
  (not found, not "none exist"); "appears to be the capstone" is a hedge.
- **PD `ladder.enrichment[1].text`**: "over 40 masterclass opportunities
  (school-reported, no time window given)".
- **Latin `theatre.honestContext`**: "a floor, not a complete history"; "Blumey-based
  (musical), not NCTC-based (play festival)".
- **Latin `music.ladderNote`**: "one named All-State student"; the absence of auditioned
  ensembles means no published route to progress on campus.
- **Latin `visual.footnote`** (grade 23.3): a `·` run for the Scholastic list. Keep "GOLD
  KEY", "the top regional award, which advances to national judging", each class-year
  mark, each medium and title, and the Fab Lab caveat.
- **Latin `ladder.enrichment[0].text`**: "parent AND faculty"; the five committees in
  order; "a broader definition than most peers" is a cross-school claim to check.
- **Prep `ladder.enrichment[0].text`**: "Fee-based"; "from a sample list" stays (the list
  is not complete); every grade range in its parentheses.
- **Covenant `theatre.honestContext`**: drop `*` around Curtains; "the one show
  recoverable by name" means the only one the school's pages name.

**Batch 2**
- **CCD `theatre.honestContext`** (171 words): the school claims five state
  championships; one title is verified (The Crane Wife, fall 2018, with the prior title in
  fall 2017, title unknown); all five predate 2025. Keep "Treat 'five championships' as
  the school’s claim", "nominated every year from 2022 through 2025", "zero wins after
  2022", "drew a blank in 2026", and Goodfellow's award "confirmed on NCTC’s own awards
  page".
- **CCD `theatre.ledger[3].result`**: "The school also claims a Best Musical nod, which the
  official PDF did not confirm."
- **CCD `theatre.whoRunsIt`**: why staffing backs up the JK–12 claim better than
  `"100% participation"` (drama is required from JK). Stage Management finalists "in both
  2023 and 2024".
- **CCD `music.boardNote`**: the `"8 ensembles"` headline spans Middle and Upper School;
  the honors/open split is **inferred** from the "Honors" and "Chamber" labels.
- **CCD `music.ladderNote`**: two claims are deliberately absent; keep what each was.
- **CCD `verdict.ask[1]`**: zero 2026 nominations for Frozen, after five in 2025 and
  "about nine" in 2023 and 2024. It stays a question with both possible reasons.
- **Carmel `theatre.ledger[0].result`**: the WIN, the Jimmy Awards dates, and "five more
  placements across four categories" (4 finalists + 1 nominee).
- **Carmel `theatre.ledger[1].result`**: "Seven placements, no win"; Caeden Moore and Sasha
  Mashchenko each appear twice; drop TO VERIFY (Decisions).
- **Carmel `theatre.honestContext`**: the 2024 nominations belong to Anastasia, not to
  `"Singin' in the Rain"`; the undated news page's earlier pair (Pisacano, Wilson).
- **Carmel `verdict.holdsUp[1].text`**: "six across five categories" and "seven in 2024".

**Batch 3**
- **Cannon `theatre.whoRunsIt`** (130 words): "No technical director is named publicly";
  the quoted AV-room phrase; the catalog has no "Acting" or "Stagecraft" course "despite
  the website naming them"; the three-productions alternative to the prerequisite.
- **Cannon `theatre.ledger[2].result`**: "a verified absence from the nominee list, not
  evidence it sat the year out".
- **Cannon `theatre.honestContext`**: "ten finalist placements, not ten awards"; "no
  Cannon winner line was found"; "appears to reach back to at least 2019, but that page is
  no longer readable".
- **Cannon `visual.footnote`**: Media Arts has **no course entry** in the 2025-26 catalog;
  "Studio Arts I" and "Media Arts I" do not exist as catalog courses (does-not-exist, kept
  as such); "No external visual-arts recognition (Scholastic Art & Writing or otherwise)
  could be found" (not found).
- **Cannon `music.boardNote`**: the Modern Ensemble quote; "a named Hip-Hop MC role in a
  for-credit honors ensemble is genuinely rare" (cross-school claim, keep as the school
  comparison it is).
- **Catholic `theatre.honestContext`**: "has NOT won a Blumey in either year — verified
  against Blumenthal’s own 2026 winners release"; the four schools named; "reconstructed
  from Blumey records".
- **Catholic `visual.footnote`**: six faculty with subjects, then nine named spaces (count
  them: 9). Both lists can be `·` runs. "The center serves all MACS schools".
- **Catholic `visual.pathNote`**: "confirmed by sweeping all 199 courses" → plain, keep
  "all 199 courses".

**Batch 4**
- **DD `theatre.whoRunsIt`** (126 words): no director named in any source; the 2023 Best
  Overall Direction nomination is credited to the school; the ensemble is select (new
  students must audition); "NO stagecraft or technical theatre course in the 2026-27
  catalog"; Film Studies & Production is video editing; backstage work "exists in some
  form; whether through a class, club or crew is unpublished".
- **DD `theatre.ledger[3].result`**: the `$5,000` Gordon Hay Scholarship, NON-performing;
  "well attested" vs "the year attribution … is not confirmed".
- **DD `theatre.honestContext`**: the Matilda Jr. correction (a separate community company,
  so excluded). Keep "no NCTC participation, placement or award could be found".
- **DD `visual.footnote`**: `"pursue admission"` describes where students apply, "rather
  than confirmed admissions"; the photographer honor came through yearbook and
  journalism, housed under English.
- **DD `ladder.enrichment[1].text`**: two catalog photographs "point toward" multi-use
  space; keep "appears to be".
- **Trinity `music.ladder[3].text`** (grade 21.1): a `·` run of the Vimeo titles, each with
  its date and run time exactly (`11-16-21 (21:48)`, `(Oct 2021, 33:37)`).
- **Trinity `verdict.ask[2]`**: two conflicting production lists, the 2026-27 profile vs the
  web pages. Keep both lists exactly and end on "Which is current?"
- **Trinity `visual.exhibits[0].detail`**: six students, "one student each from K, 1st, 2nd
  and 4th, and two from 3rd". No names (K–8 rule); add none.
- **Trinity `visual.exhibits[3].detail`**: two quotes, each attributed; "a founding teacher
  of the school".

**Batch 5**
- **Christian `ladder.enrichment[0].text`**: "two storeys" → "two stories"; "roughly
  20,500–20,800 sq ft", "seating 518 per the architect"; the three spaces come from the
  contractor and are not on the school's pages, "so confirm them on a tour".
- **Christian `theatre.ledger[0].result`**: "FINALIST — not nominee"; "did not reach the
  top-6 nominee cut"; "Field: 50 schools".
- **Christian `theatre.ledger[1].result`**: six placements with places and names; a `·` run.
- **Christian `theatre.honestContext`**: the 2013 win "confirmed directly by Blumenthal
  Arts"; no win or top-6 nomination since; 17 → 50 schools; the CITA `"each year"` claim
  rests on one published year, 2016.
- **Christian `theatre.whoRunsIt`**: the 2016 staff names "may be stale"; the cite
  "technical directing and stage management" stays verbatim.
- **Christian `music.boardNote`**: the Honors label "implies" selective entry but no
  audition requirement is stated; the tiering reflects the published structure.
- **Christian `ladder.enrichment[3].text`**: the Apple link is not drawn by the school
  ("the school does not state it"), and the designation years are not published.
- **HG `theatre.ledger[1].result`**: Aghedo is both a nominee and a finalist; keep both.
- **HG `verdict.headline`**: "two years running"; the open questions are venue, director
  and orchestra.
- **Gaston `visual.pathNote`**: `+0.50` and `+1.0` exactly; "Visual Art IV (H) is the
  terminal course" (glossable as the last course in the sequence).
- **Gaston `visual.exhibits[2].detail`**: "2019–2025" and the seven schools in order.
- **Gaston `visual.footnote`**: `"numerous"` is the school's word, "reproduced rather than
  quantified".
- **Gaston `theatre.honestContext`**: drop `*`; "deliberately carries no awards ledger
  rather than an empty one".

### Style rulings

**Carried over from plaincollege, plainadmissions and plainaid (precedent; the user
approved every batch of all three):**

- Keep-and-explain with a parenthetical for a named term a parent must recognize. No
  `plain-ok` was needed in 259 + 131 + 85 units there, and the target here is the same.
- "rather than modelled" → "rather than estimated"; "in this set" / "this series" →
  "among the schools on this site"; "legible" → "clear"; "granular" → "detailed";
  "interpolated" → "estimated"; "spike" → "standout strength"; "Interdisciplinary" →
  "Across subjects".
- **A published maximum or limit is never glossed as a typical figure**, and a published
  rule is never turned into a guess.
- A long chain or list is split at a boundary as "First: … Then: …" or a `·` run, keeping
  every item in order. A `·` item holding two facts may be split into two items in place.
- A time or abbreviation ending in a period (`a.m.`, `p.m.`, `Jr.`, `incl.`, initials) is
  moved off the sentence end, because the checker does not split there.
- A school's document, program, course or assessment term is never paraphrased.
- A school's own description that a split detaches is re-attributed ("The school says
  …"), never left as our claim.
- A requirement word is never softened ("must" stays "must", "requires" never becomes
  "includes").
- A not-published claim keeps a not-published verb ("No director is published"), never
  "there is no …"; "It publishes no …" for a not-published list.
- A gloss sits where it cannot break the not-published phrase.
- A referent after a split names its noun ("the ensemble", "that festival"), never a bare
  "it" / "this" / "That".
- An overclaim verb is never upgraded, and "only" covers everything the source says, so a
  split never adds "also".
- A marker word the before-text had is never swapped for one outside its class.
- A cross-school claim is checked against every school's file before it is kept, and a
  false "every" becomes the true quantifier.
- Terms "as published then" stay in the present tense inside that frame, so they never
  sound lapsed.
- **The reviewer's recurring findings there are the checklist here**: strengthened claims,
  wrong referents after a split, dropped narrowing words, a gloss that changed a term's
  meaning, not-published turned into does-not-exist, a school statement turned into our own
  claim, and a false cross-school claim.

*Rulings from this plan's Batch 1 onward are added here by `/implement`.* If a resume
command arrives with the `<, with these rulings: …>` placeholder unfilled, read it as
"approved, no rulings", as all three earlier plans did, and record that batch's choices
here as precedent.

- **Batch 1 (approved 2026-11-10): no rulings.** The resume command arrived with the
  `<, with these rulings: …>` placeholder unfilled, read as "approved, no rulings". So both
  defaults stand: the eighth-grade student's name stays out of Latin `music.ladder[2]`, and
  Anjali Rao ’27 stays in Latin `visual.footnote`. Batch 1's choices stand as precedent:
  - ledger rows and name lists of 4+ items become a `·` run after a colon lead, with the
    lead ("No wins. N finalist placements…:") kept parallel across a school's rows;
  - a quoted span that ends a sentence goes at the end of the unit, or is followed by a
    short sentence, because the checker merges it with what follows;
  - a jargon term that is also a Compare cite is wrapped in parentheses after its plain
    form ("Hands-on music classes (Experiential music)");
  - no count word is added that the before-text lacked (guard (n)): "the Gold Key art
    pieces", not "the two Gold Key pieces";
  - a lowercase cite stays lowercase, with a lead word added before it ("First, the
    backstage/technical course…");
  - a referent after a split names its noun ("The production had no placement…", "the
    Fab Lab is not shown…", "such a selection").

- **Batch 2 (approved 2026-11-10): no rulings.** Placeholder unfilled again. The two
  flagged items (CCD McGovern fact error, Carmel `ledger[2].year` "(year to verify)") got
  no answer, so they stay unchanged under Candidates. Batch 2's choices stand:
  - a shared noun phrase carries over, but each school keeps its own verb class ("turned
    up" / "could be found" / "is published");
  - a quoted figure is never softened ("high" for "100%");
  - a gloss describes the right thing (a proscenium theater, not "a stage");
  - "led to" / "keeps producing" are causal or trend claims; the before-text's "became" /
    "repeat producer" stay;
  - an unclear "house" becomes "hall", never "theater", when the unit holds no THEATER.

- **Batch 3 (approved 2026-11-10): no rulings.** Placeholder unfilled again. The four
  flagged before-text issues got no answer, so they stay under Candidates. Batch 3's choices
  stand:
  - a rule that applies to one course is never widened to a whole sequence by a split
    ("enter Theater in Performance", not "enter it");
  - the before-text's verb of authority stays ("assigned", not "asked");
  - when a guard's long-span pattern matched across a sentence break in the before-text,
    the rewrite carries a true marker of the same class instead ("The school names no …");
  - a unit whose quote would merge with the next sentence is reordered to end on the quote.

- **Batch 4 (approved 2026-11-10): no rulings.** Placeholder unfilled again. The two Trinity
  before-text flags stay under Candidates. Batch 4's choices stand:
  - "outside" next to a place name or "exhibitions" becomes "off-campus", never "outside
    Charlotte" or "outdoor";
  - a sample keeps its narrowing word ("including", "such as");
  - an appositive after a split attaches to the person, not the award ("She was one of…");
  - a not-found list leads with "None of these appears in any source:", never "No source
    names…" (which reads as not-published).

### plain-ok register

*Every `// plain-ok` marker added, with path, term and reason. Target: empty.*

## Approvals needed

**None up front.** No card, section, Compare row, metric key, topic or layout changes.
This is a data-text rewrite under the standard the user set. The gates are the user's
wording reviews: one per batch, then Phase 1 → 2.

One default needs a yes or no **before Batch 1** (Open questions): dropping the
eighth-grade student's name from Latin's All-State unit.

## Out of scope

- Other research areas, `src/locales/en.json` (including the arts chrome:
  `cardLabels.*`, `sections.whyItHoldsUp`, `sections.askOnTour`), `src/data/metricValues.ts`,
  `src/data/artsMatrix.ts`, `src/lib/artsMatrix.ts`, `src/data/artsProgram.ts` (card titles
  and `TITLE_OVERRIDES`) and every chrome catalog.
- `src/content/the-arts/**`, `source-material/the-arts/**` and any content overlay.
- Every off-worklist field and unit, including every non-prose field listed in Context and
  every off-worklist near-repeat site. The worklist is the contract.
- Any structural, card, ordering, component or styling change. No new fields, no split
  arrays, no unit moved between fields, no `win` flag changed.
- Editing `scripts/plain_language.json`, lowering `maxGrade`, or changing
  `scripts/check_plain_language.mjs`.
- Re-verifying recognition, rosters or productions against live pages. This is a wording
  pass, not a freshness pass.
- Deploying. Merging is pre-authorized; `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

**Batch 1 runs Steps 1–8. Batches 2–5 each run Steps 2–8 for their own scope.** Before
starting Batch 2 or later, run `git checkout feat/plainarts`, then
`git fetch && git rebase origin/main`. Do not stash (memory
`never-git-stash-in-shared-tree`). If a rebase conflicts in `src/data/artsPrograms/`,
re-run Step 2 after resolving it, since `main` may have changed a worklist unit.

Every `plain_review.mjs` call in this plan passes `--dir src/data/artsPrograms`.

1. **Extend `scripts/plain_review.mjs`** (Batch 1 only). Keep every existing option and
   guard, and keep the default behavior byte-for-byte when the new flags are absent.
   Update the header comment (options, GUARDS).

   **(a) `--arts-markers`: arts marker classes for guard (h).** Opt-in, like
   `--aid-markers`. Case-insensitive, presence/absence per unit as today, with the
   masking order shown:
   - WIN: `\bwins?\b|\bwon\b|\bwinners?\b|\bwinning\b`;
   - NOMINEE: `\bnominat\w*|\bnominees?\b|\bnoms\b|\bnods?\b`;
   - FINALIST: `\bfinalists?\b`;
   - OPEN (masked before AUDITION): `\bno audition\b|\bnon-?auditioned\b|\bopen to (?:all|any)\b|\bany level\b|\ball levels\b`;
   - AUDITION: `\baudition\w*|\bselective\b|\bselect (?:company|ensemble|plays?)\b`;
   - CLAIM: `\bclaims?\b|\bclaimed\b|\bschool-reported\b|\bself-reported\b|\bin the school[’']s (?:own )?words\b|\bthe school[’']s own (?:word|framing|claim)\b|\bthe school (?:says|states|reports|describes|calls|cites)\b`;
   - VERIFIED: `\bverified\b|\bverifiable\b|\bconfirmed\b|\bindependently\b|\battested\b|\bcorroborated\b|\bcross-checked\b`;
   - NOTFOUND: `\b(?:could not|couldn[’']t|cannot) be (?:found|located|confirmed|verified)\b|\bnot (?:found|located)\b|\b(?:was|were) (?:not )?found\b|\bno [^.;]{0,80}\b(?:could be|was|were) (?:found|located)\b`;
   - THEATRE: `\btheatres?\b`; THEATER: `\btheaters?\b` (so `theatre` ↔ `theater` fails
     both ways, and a unit holding both must keep both);
   - and, reused from the aid set, ESTIMATE and BOUND, with BOUND also matching
     `\d\+` (`3,500+`).

   A synonym inside one class is free. Leaving a class, or entering one, fails.

   **(b) New guard (n), on with `--arts-markers`: count words and `N+` tokens.** Guard (b)
   compares digit runs only, so "five finalists" → "four finalists" and `3,500+` →
   `3,500` pass it today. Compare, per unit, the multiset of:
   - number words `\b(?:two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|dozen|twice)\b`
     and ordinal words `second` … `twelfth`, lowercased ("one" and "first" are left out,
     because splits add them freely);
   - plus-suffixed figures `\d+(?:,\d{3})*\+`.

   Fail with `(n) <at>: count words differ <diff>`.

   **(c) New guard (o), `--no-md`: a single asterisk.** The arts fields render no markdown,
   so a changed unit whose after-text contains any `*` fails:
   `(o) <at>: "*" in a field that renders no markdown`. Run every batch with `--no-md` and
   `--md-paths '^$'`, so guard (l) also fails any `**` count change.

   **(d) Negative tests, one per new guard or class family**, each isolated (memory
   `negative-test-must-isolate-the-assertion`):
   - copy the target `src/data/artsPrograms/<slug>.ts` byte-for-byte to the scratchpad;
   - plant exactly one fault in one Batch 1 unit and run `--check` with the Batch 1
     arguments;
   - confirm it exits 1 with **that guard's letter and that `slug:path`**, and nothing else
     where possible;
   - restore from the copy and confirm `cmp` is clean.

   The faults:
   - (h) WIN/NOMINEE: PD `theatre.ledger[4].result` "Also nominated for" → "Also won";
   - (h) CLAIM: PD `ladder.enrichment[1].text` delete "(school-reported, no time window
     given)" → expect CLAIM lost;
   - (h) NOTFOUND: PD `visual.footnote` "were found" → "were published" (expect NOTFOUND
     lost and UNPUBLISHED added);
   - (h) THEATRE/THEATER: PD `theatre.whoRunsIt` "the theater without the spotlight" →
     "the theatre without the spotlight". The unit already says "Upper School theatre", so
     expect THEATER lost only;
   - (h) AUDITION: Latin `music.ladderNote` delete "auditioned";
   - (n): PD `visual.footnote` "roughly fifteen awards" → "roughly twelve awards"; and,
     separately, Cannon `theatre.honestContext` `3,500+` → `3,500`, run with
     `--slugs cannon` (expect (n), and (h) BOUND lost, since `\d\+` is in BOUND);
   - (o): Covenant `theatre.honestContext` keep `*Curtains*` in an otherwise-changed draft
     (run with `--slugs covenant-day`);
   - (l): add `**` around one word in Latin `theatre.whoRunsIt`.

   **(e) Calibrate on approved work, and record the result** in Implementation notes.
   Expect few hits from the arts classes on non-arts text. Read every hit: a real past slip
   goes under Candidates; a class that is too tight is loosened only with a recorded
   reason. **A worktree holds the old script.** `ROOT` comes from the script's own
   location, so copy the new `scripts/plain_review.mjs` into each worktree's `scripts/`
   before running it there.
   - College Support: `node scripts/plain_review.mjs --dir src/data/collegeSupportPrograms --base c761a159 --arts-markers --check`.
     plainaid recorded 3 known (h) hits in the default mode.
   - Admissions: `git worktree add <scratchpad>/wt-adm b181a8d8`, then from inside it
     `node scripts/plain_review.mjs --dir src/data/admissionsPrograms --base 9c0e0720 --arts-markers --check`.
     plainaid recorded 16 known failures (the approved cycle relabel). Then
     `git worktree remove <scratchpad>/wt-adm`.
   - Financial Aid: `git worktree add <scratchpad>/wt-aid 8a4fdbec` (the #471 merge),
     then from inside it
     `node scripts/plain_review.mjs --topic financial-aid-report --base 792fbd6a --aid-markers --arts-markers --check`.
     Run it in a worktree because #472 and #474 later changed that file. Then remove the
     worktree.
   - Without `--arts-markers` and `--no-md`, both runs must give the same result as
     before the change.
2. **Generate this batch's worklist.**
   `node scripts/plain_review.mjs --dir src/data/artsPrograms --slugs <batch slugs> --worklist .claude/plans/plainarts-data/worklist-batch<N>.json`.
   Compare its counts with the Batch plan table. If they differ, `main` moved. Use the
   regenerated list and note the difference in Implementation notes.
3. **Draft, measure, then apply** (plainaid's method):
   - Write the drafts to a scratch JSON keyed by `at`.
   - Run a scratch script over every draft. It calls the real `analyze`, plus the Step 1
     guard functions, against the original.
   - Before applying, check every draft against `ARTS_MATRIX`: each cite string that was
     in the before-text of that school's file must still be in the file after the
     replacement.
   - Only then apply with an exact-match script that refuses any old literal it cannot
     find, or finds more than once. Build each near-repeat from one shared string in the
     draft file.
   - A scripted write bypasses the hook. Afterwards run
     `for f in src/data/artsPrograms/*.ts; do node scripts/check_plain_language.mjs --file $f; done`, and fix any
     remaining **batch** unit with Edit, so the hook sees it.

   Apply the Decisions, the Style rulings, the Unit notes and **every item of "Arts content
   that must survive"**. For every unit:
   - Same meaning, same hedges and conditions, same direction of every comparison.
   - Sentences ≤30 words, aiming for 15–20. Units of 30+ words at grade ≤10.
   - Keep each string's quote delimiter valid TS. The arts files use single quotes with
     curly `’` for apostrophes; a straight `'` inside a single-quoted string must be
     escaped. Check the delimiter of every string you edit.
4. **Measure.**
   - `for f in src/data/artsPrograms/*.ts; do node scripts/check_plain_language.mjs --file $f; done`. After Batches
     1–4, confirm that **every remaining issue is on a later batch's school**. After Batch
     5: **0 issues**.
   - `node scripts/plain_review.mjs --dir src/data/artsPrograms --slugs <batch slugs> --allow <worklists 1..N> --md-paths '^$' --no-md --arts-markers --out .claude/plans/plainarts-data/review-batch<N>.md --check`:
     exit 0, with every row reading `hook: pass`.
   - `git diff --name-only main -- src/data/artsPrograms/` lists only this and earlier
     batches' schools. In `--dir` mode the per-file guards cover only `--slugs`, so this
     is what catches a stray edit in another school's file.
   - Put every row with an after-grade above 10 into "Residual units above grade 10", with
     a one-line reason. Expected candidates are the long name lists that cannot become
     `·` runs, and units built around a long official name.
   - Confirm that every near-repeat in this batch reads identically at all its sites, and
     matches the earlier batch's wording where one set it. Grep one shared phrase per
     group.
5. **Independent review.** Spawn one `general-purpose` subagent with the Agent tool. Give
   it:
   - the path to `review-batch<N>.md`;
   - this plan's sections "Arts content that must survive", "How each field renders",
     "Near-repeats", "Unit notes", Decisions and Style rulings;
   - the batch's `src/data/artsPrograms/<slug>.ts` files, and `src/data/artsMatrix.ts`;
   - for Batches 3–5, the earlier review file that set each shared wording.

   It never sees the drafting conversation. Tell it to check **every** row for:
   - meaning drift, or a strengthened or weakened claim;
   - a dropped hedge or condition ("likely", "appears", "implies", "at least", "roughly",
     "about", "may");
   - a recognition tier changed, merged or upgraded (win / nominee / finalist / placement /
     participation), or a "no win" lost;
   - an audition, prerequisite, eligibility, grade-level, credit or year requirement
     changed;
   - the school's claim vs a verified or outside-source fact blurred;
   - not-found vs not-published vs does-not-exist swapped;
   - a name, count, date, time or figure changed, or a word count turned into digits;
   - `theatre`/`theater` changed, or caps emphasis moved;
   - a referent made ambiguous by a split;
   - a cross-school claim that the other arts files contradict;
   - a sentence that is now plainer but wrong.

   It fixes each finding in the source file (the hook still applies), then re-runs Step 4's
   commands. It returns a findings list: path, problem, fix. Regenerate the table, then
   append the findings under `## Independent review` at the end of `review-batch<N>.md`
   (the generator keeps that tail). Record the count in "Batch progress".
6. **Checks.**
   - Run `npx tsc -b`, then `npx vite build`.
   - Then run, by hand:
     `npm run check:schema && npm run check:spelling && npm run check:matrices && npm run check:schoolurls && npm run check:chrome && npm run check:runtime && npm run check:moneytext && npm run check:dates && npm run check:spans && npm run check:photos`.
   - `npm run check:live` **is expected** to report stale `the-arts` stamps, for exactly
     the rewritten texts so far. Record the count, which is Phase 2's input. Confirm that
     no other topic appears.
   - If `check:schema` drifts, run `npm run schema` and commit the doc. No drift is
     expected.
7. **Browser check.** Run `npx vite preview` after the build. Use headed Chrome via
   Playwright (memory `headed-chrome-via-playwright`). Do not wait on `networkidle`
   (memory `browser-check-networkidle-hangs`). Probe with `textContent`, not `innerText`
   (memory `innertext-case-false-pass`). For each batch school:
   - Open `/school/<slug>/?topic=the-arts&lang=en`, and open every
     `details.note-card-arts` inside `#topic-the-arts`. Scope every probe to that section,
     because a school page renders every topic.
   - Confirm that every rewritten unit renders (match the live module's text), and that
     **no `*` appears in any rewritten unit's rendered text**. (Charlotte Catholic's
     off-worklist `holdsUp` asterisks are a known Candidate; see below.)
   - Confirm that each `holdsUp` / `music.ladder` row still reads as "Label — lowercase
     continuation", and each ledger row's WIN chip still matches its text.
   - Open the Compare page with the batch's schools (`/compare/?schools=<slugs>&topic=the-arts`)
     and confirm the Arts rows still show "Yes" where they did (`check:matrices` proves
     the cites; this proves the page).
   - Take one look at 390px width on one batch school with every arts card open, and check
     for no page overflow.
8. **Commit and stop.** Stage explicit paths only. Run `git status --short` first, and never
   `git add -A`. Stage:
   - the batch's `src/data/artsPrograms/<slug>.ts` files;
   - `.claude/plans/plainarts-data/worklist-batch<N>.json` and `review-batch<N>.md`;
   - Batch 1 only: `scripts/plain_review.mjs`;
   - this plan, with "Batch progress" filled in.

   Commit with the message `plainarts: batch <N> English — <schools>`. Push, then check
   that `git rev-parse HEAD` equals `git ls-remote origin feat/plainarts` (memory
   `git-push-silently-noop`). Do **not** open the PR. Report to the user:
   - the review file path;
   - the before/after counts;
   - the residual units;
   - the reviewer's findings, and any flagged factual correction;
   - the URLs from Step 7.

   Give the paste-in command for the next window:
   - after Batches 1–4:
     `/implement plainarts — Batch <N+1>. Batch <N> English is approved<, with these rulings: …>.`
   - after Batch 5: set `status: english-done` and the INDEX row to *English shipped*.
     Then give `/implement plainarts — Phase 2. All five English batches are approved. Run only Phase 2.`

   **→ STOP after each batch.** On resume, put the user's rulings into "Style rulings" and
   their verdict into "Batch progress" *before* the next batch's Step 2. If the user asked
   for changes to a batch already built, make them, re-run Steps 4–6 for that batch, and
   amend its review file.

**→ STOP. After Batch 5, `/implement` ends its turn and waits.** Nothing below runs until
the user confirms all five batches.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on the
**`the-arts` overlay topic only**. No chrome catalogs and no content overlay. For the
mechanism, see `.claude/docs/prose-translation-architecture.md`. The precedent is
plainaid's Phase 2 notes, which this repeats. The locale traps in those docs apply
unchanged: figures char-for-char with `%` unspaced; lakh/crore regrouping and RTL isolates
are render-layer, never typed into `t`; searchable identifiers stay Latin; `fr`
identifiers (`check:fr`, which guards course codes such as `French III Honors`).

Three traps are specific to this area:

- **Names follow the reviewed predecessor.** Where it kept an ensemble, course, venue,
  production, role or award category in English (`Best Actor`, `Jazz Combo`, `Honors
  Theater I`, `Cindric Performing Arts Center`), keep it. Where it translated a
  descriptive name, keep that translation. Student and teacher names, and their roles,
  are never translated or re-spelled.
- **`·` runs and caps emphasis carry over.** The gate counts ` · ` separators. Where the
  English keeps a word in capitals for emphasis, the translation keeps the predecessor's
  way of marking it.
- **No markdown, in any locale.** A `t` with `*` or `**` ships literal asterisks. The gate
  fails it.

Steps:

1. **Snapshot the base work files** before splicing. Run
   `git show main:src/data/overlays/work/the-arts.<lang>.json` for each locale, into the
   session scratchpad. They hold the native-reviewed translations of the *old* English.
2. **Splice.** Run `node scripts/i18n_splice_work.mjs --lang <code> --topic the-arts` for
   each locale. Expect *added* ≈ *dropped* ≈ the final `check:live` stale count (≈132). A
   rewrite that happens to equal an existing string merges into it and lowers *added*. If
   the counts are lopsided, stop and investigate.
3. **Translate each *added* unit as a revision of its reviewed predecessor.** Pair it with
   the dropped unit at the same `at` path. Give the translator the old English, the old
   `t` and the new English. The instruction is to **revise the reviewed translation to say
   what the new English says**. Keep its terminology, register, date forms and reviewed
   choices wherever the meaning is unchanged. Split sentences where the English now splits,
   and turn a list into a `·` run where the English now does. The final `t` is keyed to the
   **new stamp**, never to an index.

   Run nine parallel `general-purpose` subagents, one per locale. Each gets its own scratch
   subdirectory, reads only its task file and writes only its own output file (memory
   `parallel-locale-agents-collide`).

   A scratch apply script gates every output before it writes it to the work file. Reuse
   plainaid's gate (its copy was in that session's scratchpad; rebuild it from the list):
   - the numeric-token multiset against the new English;
   - the money/percent/year token multiset (guard (m)'s regexes);
   - the `**` count (0) and no single `*`;
   - the ` · ` count;
   - no bidi controls and no non-Western digits;
   - `t` ≠ English, and the 0.4–2.5 length ratio;
   - no English month or weekday name outside a quote the English also quotes.
4. **Rebuild** each overlay with
   `node scripts/i18n_build_overlay.mjs --topic the-arts --lang <code>`.
5. **Verify by stamp, not by `check_work_integrity`**, which reports false "violations"
   after a splice (memory `comparerows-shipped`). Run it anyway. Then prove integrity
   against the snapshot: every kept stamp has `text` and `t` byte-identical, every new
   stamp is non-blank, and every locale passes.
6. **Run the Phase 2 checks** (Verification below). Then:
   - fill in Implementation notes;
   - set the plan's `status: implemented` and `prs: [<n>]`, and the INDEX row to
     *Implemented* with the PR link;
   - open the PR with `--body-file`. The body has the per-school counts, links to the five
     review files, a summary of the reviewer findings and the guard calibration result;
   - squash-merge (pre-authorized), then `git checkout main && git pull`.

   **Do not deploy.** Report "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/artsPrograms/*.ts` (13 files) | edit: rewrite the 132 worklist prose sites; no key, path, name, figure, date, `win` flag or non-prose change |
| `scripts/plain_review.mjs` | edit: `--arts-markers` (arts marker classes in (h), guard (n) count words and `N+`), `--no-md` (guard (o)); header comment |
| `.claude/plans/plainarts-data/worklist-batch{1..5}.json` | new: per-batch worklists |
| `.claude/plans/plainarts-data/review-batch{1..5}.md` | new: before/after review tables + independent-review findings |
| `src/data/overlays/work/the-arts.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2): spliced and translated |
| `src/data/overlays/the-arts.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2): rebuilt |
| `.claude/plans/plainarts.md`, `.claude/plans/INDEX.md` | edit: progress, rulings, notes, status |
| `.claude/docs/DATA-SCHEMA.md` | only if `check:schema` drifts (not expected) |

`package.json` needs no edit, because `plain:review` already exists. No skill or slash
command changes, so `.claude/SKILLS.md` is not touched.

## Verification

### Phase 1 — English (per batch)

- [ ] `for f in src/data/artsPrograms/*.ts; do node scripts/check_plain_language.mjs --file $f; done`: every remaining
      issue is on a later batch's school. After Batch 5, 0 issues.
- [ ] `node scripts/plain_review.mjs --dir src/data/artsPrograms --slugs … --allow … --md-paths '^$' --no-md --arts-markers --check`:
      exit 0. Every row is `hook: pass`.
- [ ] `git diff --name-only main -- src/data/artsPrograms/` lists only batch schools.
- [ ] Batch 1: each new guard's negative test failed on its planted fault with the right
      letter and `slug:path`, and the file was restored to `cmp`-clean. The three
      calibration runs are recorded. The worktrees are removed.
- [ ] Every new `·` run holds every item of the list it replaced, in order.
- [ ] Every Compare cite inside a rewritten unit is still in its file; `check:matrices` is
      green.
- [ ] Every after-grade >10 row is listed in "Residual units above grade 10".
- [ ] The near-repeats read identically at every site, across batches; the off-worklist
      shared sentences are byte-identical.
- [ ] The independent subagent review is done, and its findings are fixed and recorded.
- [ ] `npx tsc -b` is clean. `npx vite build` succeeds. The Step 6 list is green. The
      `check:live` stale count is recorded, and it covers only `the-arts`.
- [ ] Browser: every arts card open on each batch school; every rewritten unit renders
      with no `*`; Compare Arts rows unchanged; one 390px look.
- [ ] After Batch 5: `npm run check:plain` shows **the-arts Flagged 0** (baseline 107).
      Grade >10 equals the residual count plus the off-worklist units at grade >10 under
      30 words (baseline 122). Every other area is unchanged.

### Phase 2 — Locales

- [ ] `npm run check:live && npm run check:runtime`: clean.
- [ ] `npm run check:digits`: no finding on a rewritten unit.
- [ ] Per locale: `npm run check:sepdrift -- --lang <code>` and
      `python3 scripts/check_figures.py --topic the-arts --lang <code>`.
- [ ] `npm run check:dates`, `check:moneytext`, `check:currency`, `check:fr`, `check:hi`,
      `check:fa`, `check:bidi`; `node scripts/check_work_integrity.mjs`, followed by the
      by-stamp proof (Phase 2 Step 5).
- [ ] `npm run i18n:leaks -- --lang <code>`: no flag on a rewritten path. It prints `at`
      paths, not stamps, so match its flags against the worklist paths (memory
      `plainadmissions-shipped`).
- [ ] `npm run build`: green end to end.
- [ ] `npm run build && npx vite preview`, then
      `npm run audit:daterender -- --lang es --lang fa --lang hi`: no new finding on a
      school page's arts section compared with `main`. It takes 9+ minutes.
- [ ] Browser: one Batch 1 school (providence-day) and one Batch 5 school
      (charlotte-christian) in `es`, `fa` and `hi` (`?lang=`), with every arts card open.
      Check that every rewritten unit is in the locale, that names and figures are intact,
      that no `*` renders, and that ranges read correctly in RTL. Strip bidi isolates before
      probing text (memory `ccdprofile-shipped`).

## Risks

| Risk | Mitigation |
|---|---|
| A split merges or upgrades a recognition tier ("finalist" → "award", "nominated" → "won") | WIN / NOMINEE / FINALIST classes; "must survive" item 2; the reviewer's checklist |
| A word count changes ("five" → "four") or a `+` drops (`3,500+` → `3,500`) | New guard (n); (b) and (m) for digits |
| A rewrite removes a fragment the Compare matrix cites | Step 3 pre-apply cite check; `check:matrices` in Step 6; Compare browser look |
| `**` or `*` added to a field that renders no markdown | Guards (l) with `--md-paths '^$'` and (o); browser check for `*` |
| `theatre` ↔ `theater` drift | THEATRE / THEATER classes; Decisions |
| "could not be found" turned into "not published" or "does not exist" | NOTFOUND and UNPUBLISHED classes; "must survive" item 9 |
| A near-repeat diverges across cards or schools | Near-repeat tables; later batches copy the earlier wording; grep in Step 4 |
| A stray edit lands in a school outside the batch | `git diff --name-only` in Step 4 |
| New classes false-positive and block legitimate rewrites | Calibrated on the three approved areas in Step 1; loosen only with a recorded reason |

## Open questions

- **The eighth-grade student's name** (Latin `music.ladder[2].text`). **Default:** drop it
  in the Batch 1 rewrite, per the K–8 names rule, keeping every other fact. The user may
  overrule this before or at the Batch 1 review.
- **"TO VERIFY"** (Carmel `theatre.ledger[1].result`). **Default:** drop the token and keep
  the "likely" hedge (Decisions).
- **Words outside the jargon list** ("articulated", "corroborate", "quadrennially",
  "artifact", "inferential"). **Default:** fix them only inside worklist units, and list
  them in Implementation notes as candidates for `plain_language.json`. Do not edit that
  file.

## Residual units above grade 10

*Filled in by `/implement`: path, after-grade, reason.*

| Path | After-grade | Reason |
|---|--:|---|
| — | — | **None.** All 132 rewritten units are at grade ≤10 (highest 9.9). |

## Implementation notes

*Filled in by `/implement`, one section per batch, then Phase 2.*

### Batch 1 (2026-11-10)

**Defaults applied** (Open questions, no user ruling yet):
- The eighth-grade student's name is dropped from Latin `music.ladder[2].text`.
- "TO VERIFY" is to be dropped in Batch 2.
- Off-list words are fixed only inside worklist units.

**Step 1 — `scripts/plain_review.mjs`.** `--arts-markers` and `--no-md` were added as planned. Default mode is unchanged: the College Support calibration still shows exactly its 3 known failures. Two calibration refinements were made, each recorded in the script's comments:
- **COUNTWORD skips "third-party".** College Support's approved "third-party validations" read as an ordinal.
- **CLAIM drops neutral attribution ("the school says/states/…").** The approved plainadmissions re-attribution ruling ("The school says …") added it to 3 approved units. CLAIM keeps "claim(s/ed)", "school-reported", "self-reported", "in the school’s words" and "the school’s own word/framing/claim".

**Calibration result (recorded).** Every remaining arts-class hit was read:

| Run | Without the new flags | With `--arts-markers` |
|---|---|---|
| College Support, `--base c761a159` | 3 (the known (h) hits) | 34 (3 known + 31 arts hits, none a slip) |
| Admissions, worktree `b181a8d8`, `--base 9c0e0720` | 16 (the known cycle relabel) | 23 (16 known + 7 arts hits, none a slip) |
| Financial Aid, worktree `8a4fdbec`, `--topic financial-aid-report --base 792fbd6a --aid-markers` | 2 (the approved 62% removal) | 12 (2 known + 10 arts hits, none a slip) |

The arts hits fall into three groups:
- **Domain mismatches:** "selective" for colleges, and "confirmed" for scholarships.
- **The approved "a second look" idiom.**
- **Approved splits that added a count word** ("All three come from…", "two figures", "Second, …"). In The Arts a new count is a new claim, so (n) stays strict here. A drafter keeps the before-text's counts.

**The worktree needs the new script.** As the plan warned, each worktree held the old script, so the new one was copied into it before each run. Both worktrees were removed afterwards.

**Negative tests.** For each test, the file was copied, one fault planted, `--check` run, and the file restored; `cmp` was clean every time.

| Guard | Fault planted | Result |
|---|---|---|
| (h) WIN/NOMINEE | PD `ledger[4]` "Also nominated for" → "Also won" | exit 1: WIN added, NOMINEE lost |
| (h) CLAIM | PD `enrichment[1]`: "The school claims … (school-reported, …)" → "There are …" | exit 1: CLAIM lost (2→0). A first plant that deleted only the parenthetical was correctly a count note, since "claims" remained. |
| (h) NOTFOUND | PD `visual.footnote`: both "were found" / "was not found" → "published" | exit 1: NOTFOUND lost, UNPUBLISHED added |
| (h) THEATER | PD `whoRunsIt` "the theater without" → "the theatre without" | exit 1: THEATER lost only |
| (h) AUDITION | Latin `music.ladderNote` "auditioned" deleted | exit 1: AUDITION lost |
| (n) word | PD `visual.footnote` "fifteen" → "twelve" | exit 1: (n) |
| (n) plus | Cannon `honestContext` `3,500+` → `3,500` | exit 1: (n) only. BOUND stays present through `100+`/`130+`, so it is a count note, not a loss as the plan expected. |
| (o) | Covenant `*Curtains*` kept in a changed draft | exit 1: (o) |
| (l) | `**` around a name in Latin `whoRunsIt` | exit 1: (l) and (o) |

**Deviation: the plan's checker command was a no-op.** `check_plain_language.mjs` has no `--dir` option. It ignores the flag and exits 0 silently. Every `--dir src/data/artsPrograms` call in this plan is now a `--file` loop over the 13 files. After Batch 1 the four batch files are clean; the other nine hold 145 issues, which is 171 minus Batch 1's 26.

**Build.** The worklist matched the plan: 28 units. All 28 drafts were measured with the real `analyze` and checked against `ARTS_MATRIX` before applying. Four needed a second pass:
- PD `enrichment[1]` (10.2);
- Latin `enrichment[0]` (10.9);
- Latin `visual.footnote`. The checker's quote quirk merged its closing quote with the next sentence into 39 words, so the quoted sentence moved to the end of the unit.
- Latin's jargon item. The plan's wording fails the hook (see the corrected Decision), so it became "Hands-on music classes (Experiential music)".

Every guard passed on the first `--check` after applying. Ledger rows and long name lists became `·` runs. Covenant's `*Curtains*` lost its asterisks.

**Independent review: 10 findings, all fixed** (see the review file). Six were referents after a split. The other four were an overclaim (PD's "awarded work was exhibited" → the Gold Key art pieces), a strengthened verb ("runs" → "organizes" auditions), and two wording shifts ("jobs", "lessons"). The reviewer also confirmed the plan's Experiential-music wording fails the hook, and that "a wider definition than most peer schools use" holds against the other 12 files.

**Step 6 checks.** All green:
- `npx tsc -b` and `npx vite build`;
- `check:schema`, `check:spelling`, `check:matrices`, `check:schoolurls`, `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`, `check:photos`.

`check:live` reports **28 stale stamps per locale, all `the-arts`**: exactly the 28 rewritten texts. Running total for Phase 2: **28**.

**Step 7 browser check** (headed Chrome via Playwright, `vite preview`, every `details.note-card-arts` open inside `#topic-the-arts`, `?lang=en`):
- **28/28** rewritten units render. `holdsUp` and `music.ladder` rows were matched as "Label — text".
- The four arts sections contain **0** asterisks.
- At 390px, PD with every card open has `scrollWidth` 390.
- The Compare Arts cells come only from `ARTS_MATRIX`, which is unchanged, and `check:matrices` proves every cite. The Compare page rendered its "Not listed" cells as before.

### Batch 2 (2026-11-10)

**Resume.** Batch 1 was approved with no rulings (placeholder unfilled; recorded under "Style rulings"). `main` had not moved, so the rebase was a no-op.

**Worklist** matched the plan: 24 units (charlotte-country-day 16, carmel-christian 8).

**Build.** All 24 drafts were measured and cite-checked before applying. Three needed a second pass:
- CCD `whoRunsIt` (10.4);
- CCD `ledger[4]` (10.1);
- CCD `holdsUp[0]` (10.7).

Every guard passed on the first `--check`, for Batch 2 and for Batches 1–2 together.
- **"TO VERIFY" is gone** from Carmel `ledger[1]`, as the Decision says. The "likely" hedge is kept.
- **Carmel `visual.footnote` sets the shared noun phrase** "no external visual-arts recognition (Scholastic or otherwise)". Its verb is "turned up", because "was found" would have entered the NOTFOUND class, which the before-text's "surfaced in this pass" did not hold.
- **CCD sets the NCTC-scale sentence** that Cannon copies: "For scale, the NCTC festival draws 3,500+ students from 100+ schools across 130+ productions."

**Independent review: 12 findings, all fixed** (see the review file). The reviewer also reported one fact error in the before-text, left unchanged and flagged: CCD's "Sabrina McGovern earned lead-category nominations in three consecutive cycles" disagrees with the school's own ledger, where 2024 is Best Supporting Actress. It also caught that the plan's near-repeat table misquoted Carmel `music.ladder[1]`; the table is corrected.

**Step 6 checks.** All green:
- `npx tsc -b` and `npx vite build`;
- `check:schema`, `check:spelling`, `check:matrices`, `check:schoolurls`, `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`, `check:photos`.

`check:live` reports **52 stale stamps per locale, all `the-arts`** (28 + 24). Running total for Phase 2: **52**.

**Step 7 browser check:**
- **24/24** rewritten units render, with 0 asterisks in either arts section.
- One WIN chip on each school, matching its one `win` row (CCD 2022, Carmel 2026).
- At 390px, CCD with every card open has `scrollWidth` 390.

### Batch 3 (2026-11-10)

**Resume.** Batch 2 was approved with no rulings (placeholder unfilled; recorded under "Style rulings"). `main` had not moved.

**Worklist** matched the plan: 22 units (cannon 17, charlotte-catholic 5).

**Build.** All 22 drafts measured clean on the first pass. After applying, guard (h) failed once: UNPUBLISHED was lost on cannon `visual.footnote`. It was a **spurious match in the before-text**: the long-span alternative `no … stated` ran from "NO course entry" across to "AP Studio Art's stated prerequisites", and the split broke the span. The unit's sentence "No CDE or Media Arts instructor is named." became "The school names no CDE or Media Arts instructor." That is the same claim, and a true not-published marker, made with Edit so the hook saw it.
- Cannon copies CCD's NCTC-scale sentence byte-for-byte. Its extra clause becomes its own sentence: "Select plays advance from regionals to state."
- Cannon keeps its longer "(Scholastic Art & Writing or otherwise)", with its own verb ("could be found").
- `whoRunsIt` was reordered so the unit ends on its quote. That avoids the checker's quote-merge quirk.

**Independent review: 13 findings, all fixed** (see the review file). The reviewer checked Cannon's research file, which found one real widening: "Students can also enter it" had made the three-productions alternative apply to the whole theater sequence, when it applies only to Theater in Performance.

It also reported four before-text issues, left unchanged:
- Cannon's "Two offerings are unusually contemporary" names only one.
- Cannon's AV quote is about the computer systems in the control room, not the room itself.
- Catholic's off-worklist `theatre.headline` / `subhead` blur nominee and finalist.
- The plan's near-repeat table misquoted Cannon `music.ladder[2]` (table corrected).

**Step 6 checks.** All green:
- `npx tsc -b` and `npx vite build`;
- `check:schema`, `check:spelling`, `check:matrices`, `check:schoolurls`, `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`, `check:photos`.

`check:live` reports **74 stale stamps per locale, all `the-arts`** (28 + 24 + 22). Running total for Phase 2: **74**.

**Step 7 browser check:**
- **22/22** rewritten units render.
- Cannon's arts section has 0 asterisks.
- Catholic's has 40, all from the six off-worklist `verdict.holdsUp[]` units with `**` (Candidates). Guard (o) proves none of them is in a rewritten unit.
- At 390px, Cannon with every card open has `scrollWidth` 390.

### Batch 4 (2026-11-10)

**Resume.** Batch 3 was approved with no rulings (placeholder unfilled; recorded under "Style rulings"). `main` had not moved.

**Worklist** matched the plan: 28 units (davidson-day 17, trinity-episcopal 11).

**Build.** All 28 drafts were measured and cite-checked. One needed a second pass: DD `ask[4]` (11.1), now a question followed by a `·` list of what could not be found.

After applying, guard (h) failed once. DD `ladder.enrichment[3]`'s "No source names any of these" matched UNPUBLISHED (`no … names`), a class the before-text lacked. It became "None of these appears in any source", made with Edit. A meaning slip was fixed at the same time: the item is "a named arts faculty member", since two teachers are pictured but unnamed.

The Trinity near-repeats were built from shared sentences: "Trinity was CIH's first new partner school since the pandemic." and "…leads the exchange with CIH founder Amy Gaylor Nedriga." Both `pedagogy` units now say "teaching method".

**Independent review: 12 findings, all fixed** (see the review file). The fixes cover 7 referents, 3 cases of "outside" misreading (outside Charlotte, or outdoor), a dropped "such as" and a fragment.

The reviewer also reported three before-text issues, left unchanged:
- Trinity's `ask[2]` overstates the profile-vs-web conflict: the profile also lists 5th Grade Shakespeare.
- Trinity's "20 to 70 minutes each" leaves out a 10:48 Fiddler selection.
- The plan's near-repeat table misquoted DD `verdict.subhead` (corrected).

**Step 6 checks.** All green:
- `npx tsc -b` and `npx vite build`;
- `check:schema`, `check:spelling`, `check:matrices`, `check:schoolurls`, `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`, `check:photos`.

`check:live` reports **102 stale stamps per locale, all `the-arts`** (28 + 24 + 22 + 28). Running total for Phase 2: **102**.

**Step 7 browser check:**
- **28/28** rewritten units render, with 0 asterisks on either school.
- At 390px, DD with every card open has `scrollWidth` 390.

### Batch 5 (2026-11-10)

**Resume.** Batch 4 was approved with no rulings (placeholder unfilled; recorded under "Style rulings"). `main` had not moved.

**Worklist** matched the plan: 30 units (charlotte-christian 13, hickory-grove-christian 7, gaston-day 10).

**Build.** All 30 drafts were measured and cite-checked.

Six HG/Gaston units needed a second pass. Hickory Grove's festival sentence is one of them. The plan wanted it byte-identical with the off-worklist `music.ladder[1]`, but it could not reach the target that way: whole, it measured grade 12.0, which the hook flags. It was split in two with every fact and its order kept, and "adjudicated festivals (where judges rate each group)" was glossed. That is a deviation from the near-repeat table, recorded here.

Two guard catches came before the review:
- **Gaston "won praise".** It added WIN, so it became "earned praise".
- **HG `visual.footnote` UNPUBLISHED "added" (0→1). This exposes a matcher gap.** The before-text's not-published sentence runs longer than the `no … is published` span of 12 words. So the guard never saw it as a not-published claim, and any shorter form read as a new one. The unit now says "None of these is published: …", the same claim. It was made with Edit.

**Independent review: 14 findings, all fixed** (see the review file). The reviewer also reported three before-text fact problems:
- **Charlotte Christian says there is no AP Music Theory, but the course catalog data and the Compare page say there is.**
- HG's "repeat producer of nominated performers" counts Young, who was a finalist in 2025.
- Gaston's Thespian Society claim rests only on the student-clubs research.

**Step 6 checks.** All green:
- `npx tsc -b` and `npx vite build`;
- `check:schema`, `check:spelling`, `check:matrices`, `check:schoolurls`, `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`, `check:photos`.

`check:live` reports **132 stale stamps per locale, all `the-arts`** (28 + 24 + 22 + 28 + 30). That is Phase 2's input.

**Step 7 browser check:**
- **30/30** rewritten units render.
- Christian and Gaston show 0 asterisks.
- HG shows 2, from the off-worklist division item "the *Exodus* yearbook", which is the same on `main` (Candidates).
- At 390px, Christian with every card open has `scrollWidth` 390.

### Phase 1 close-out (2026-11-10)

- `plain_review.mjs --dir src/data/artsPrograms` over **all 13 schools**, with all five worklists and every arts guard, exits 0.
- Every arts file is hook-clean. The baseline was 171 issues on 107 units.
- `npm run check:plain`: **the-arts Flagged 0** (baseline 107), Sentence >30 **0**, Grade >10 **0** (baseline 122), Grade >12 **0**. Every other area is unchanged: sports 79, student-clubs 103, admissions 0, college-support 0.
- **Rewritten:** 132 units across 13 files. Independent reviewers found and fixed 10 + 12 + 13 + 12 + 14 = **61** problems.
- **Content changes beyond wording:**
  - the eighth-grade student's name is gone (default);
  - Carmel's "TO VERIFY" is gone (Decision);
  - "storeys" and "clarinettist" are now American spellings;
  - two stray single-asterisk italics are gone.
- `plain-ok` markers added: none.

### Phase 2 (2026-11-10)

- **Approval.** The user approved the English ("The English page is approved. Run only Phase 2"). Phase 2 ran in the same window as Batch 5, on `feat/plainarts`.
- **Splice matched exactly.** `i18n_splice_work.mjs --topic the-arts` gave **1,044 kept / 132 added / 132 dropped** in all nine locales. That equals the final `check:live` count. Every added unit paired 1:1 with its dropped predecessor by `at` path (0 unpaired), using the `main` work files as the source of the old English and old `t`. No rewrite merged into an existing string.
- **Translation.** Nine parallel `general-purpose` subagents, one per locale, each *revised* the reviewed `t` to match the new English. Each got 45 reviewed same-area units as a terminology reference and its locale's rollout doc, read only its own task file and wrote only its own output. The scratch gate is plainaid's gate with four additions: the ` · ` count, no `*`, `N+` tokens among the money/percent/year tokens, and an English-month check that exempts a month word followed by the same capitalized word as the English. That last one was added mid-run, because "April" in the student name April Liu was flagged in every locale. All nine passed with 0 problems.
- **Wrong-script scan.** No wrong-script characters were found in any output (Bangla's danda U+0964 is excluded; it is the known false positive). The ht translator found and fixed a **Cyrillic "е" (U+0435) inside "nominе"** in two reviewed ht units, `f00fcab5` and `c8c58c4c`. It is worth scanning the rest of the ht work files for this.
- **Systematic changes worth a native reviewer's look:**
  - **The new glosses have no reviewed predecessor in any locale:** proscenium, adjudicated festivals and ratings, production-level categories, capstone, "Hands-on music classes (Experiential music)", residency, and "teaching method" replacing "pedagogy".
  - **The digit rule forced counts and ordinals into digits.** Where the English has a digit, reviewed word forms became digits:
    - ar "المركز 1", "الصف 6";
    - fa "9مین";
    - bn "সেরা 6";
    - hi "4वें";
    - `N+` tokens in place of "more than N" in every locale (`3,500+`, `70+`, `20+`).

    Where the English spells a number out ("Fifth grade", "eighth-grade", "sophomore"), the translation now spells it out too.
  - **es times follow the English 12-hour form** (`1:30–2 p. m.`) instead of the reviewed 24-hour form.
  - **Some reviewed choices were kept** where they are an established convention: fr "la 5th grade" (25 reviewed fr units keep grade labels in English), Carmel and Hickory Grove's English award names, and the ht "plafon anba" for "a floor".
  - **The approved English corrections were carried into every locale:** the student name dropped, TO VERIFY dropped, both asterisk pairs dropped, Christian "no AP Music Theory is named", and Trinity "off-campus".
- **Integrity, by stamp against the `main` snapshots:** in every locale, **1,044 kept stamps** have `text` and `t` byte-identical, **132 are new**, and **0 are blank**. Each rebuilt overlay holds 1,176 entries.

  `check_work_integrity.mjs` reports 263–264 "violations" per locale (2,374 in all). All of them sit on the 132 spliced positions, because the checker compares by array index (memory `comparerows-shipped`). The 263s are a single unit in te and fa (`0cb1c9bd`) where only the "mutated" half fired; its translation was confirmed to be revised.
- **Checks:**
  - `check:live` ✓ and `check:runtime` ✓;
  - `check:digits`: **1,188 units compared · 0 to review**;
  - `check:dates`, `check:moneytext`, `check:currency`, `check:fr`, `check:hi`, `check:fa`, `check:bidi`: ✓;
  - `check:sepdrift`: 0 drifted, ×9;
  - `check_figures.py --topic the-arts`: figures intact, ×9;
  - `i18n:leaks`: **0 flags on any of the 132 changed paths** in any locale (it prints `slug:path`, matched against the five worklists);
  - `npm run build`: green end to end.
- **Browser** (headed Chrome, `vite preview`, every arts card open, `?lang=es|fa|hi` on Providence Day and Charlotte Christian): **78/78** rewritten units show their translation, after stripping bidi isolates and normalizing Persian digits. 0 English-only segments are visible, and 0 asterisks.
- **Render audit:** `audit:daterender` (es, fa, hi) is clean, with no English-form date on any school, Compare or checklist page.

### Candidates noticed, not acted on

*Seeded at planning time. `/implement` adds to this list.*

- **Charlotte Catholic's verdict card ships literal `**`.** All six
  `charlotte-catholic:verdict.holdsUp[].text` units hold `**…**` (for example
  `'**39 of 199 courses** — more than English…'`), and `ArtsProgram.tsx` renders
  `holdsUp[].text` through `localizeMoneyText()` only, so a parent sees the asterisks.
  They are off the worklist. The fix is either a data edit (strip the `**`, then carry the
  nine translations over) or a component change (render `**` as `<strong>`, a UX change
  needing approval). Recommended as a small follow-up plan.
- **Research bookkeeping in parent-facing arts prose**, which `CLAUDE.md` says belongs in
  dev-only fields. The arts type has no `verify` field, so this plan rewrites it plainly
  and does not move it ("this pass", "at time of research", "prior research … was an
  error", "Two baseline claims did not survive verification"). Off-worklist sites carry the
  same phrases (charlotte-christian `theatre.season[0].detail`, cannon
  `theatre.ledger[0].result`: "were not published at time of research"). A later plan
  could add a dev-only field to the arts type.
- **A second K–8-grade student's name, found at Batch 1.** charlotte-latin
  `visual.footnote` lists "Anjali Rao ’27 (fashion, 2023)". A Class of 2027 student was in
  8th grade in 2022–23. She is in high school now, and the plan's default covered only
  the current eighth grader, so the name is kept. **Flagged for the user.**
- **CCD's McGovern claim (found at Batch 2).** `charlotte-country-day:theatre.honestContext`
  says "lead-category nominations in three consecutive cycles". The ledger shows 2024 as Best
  Supporting Actress, so two of three are lead categories. This is a fact fix, not a wording
  one. **Flagged for the user.**
- **Before-text issues found at Batch 3**, all unchanged and **flagged for the user**:
  - cannon `music.boardNote` says "Two offerings are unusually contemporary" but describes
    only Modern Ensemble (probably Modern Ensemble and Music Technology);
  - cannon `theatre.whoRunsIt`'s quote is about the control room's computer systems, not
    the room itself;
  - charlotte-catholic `theatre.headline` "five more nominations in 2026" covers 4
    nominees and 1 finalist, and `theatre.subhead` "a rare sweep of nominations"
    describes 2025's finalists. Both are off the worklist.
- **Before-text issues found at Batch 4**, unchanged and **flagged for the user**:
  - trinity-episcopal `verdict.ask[2]` says the 2026-27 profile lists only "4th Grade
    Musical and a Middle School fall play plus winter musical". The profile also lists 5th
    Grade Shakespeare Review, so the conflict it asks about is overstated;
  - trinity-episcopal `ladder.enrichment[0]`'s "20 to 70 minutes each" does not cover the
    10:48 Spring Arts Fest 2020 Fiddler selections (arguably not a full play).
- **Before-text fact problems found at Batch 5**, unchanged and **flagged for the user**:
  - **charlotte-christian AP Music Theory conflict.** `music.boardNote` and off-worklist
    `verdict.ask[8]` say there is no AP Music Theory. `src/data/courseOfferings.ts` lists
    "Advanced Placement Music Theory" (US Course Curriculum Guide '26–27), and
    `ARTS_MATRIX['charlotte-christian'].musicTheory.US` cites it, so Compare shows Yes. The
    Arts card and Compare disagree. Recommended next fix.
  - hickory-grove-christian "a repeat producer of nominated performers" (`theatre.
    honestContext`, `holdsUp[0]`): Young was a 2025 finalist and a 2026 nominee, so only
    Aghedo was nominated in both years.
  - gaston-day `theatre.honestContext` says the school chartered the International Thespian
    Society, while off-worklist `verdict.ask[6]` asks whether a troupe exists. The only
    source is the student-clubs research file.
- **Hickory Grove ships a literal single-asterisk italic** in off-worklist
  `ladder.divisions[…].items[…]`: "the *Exodus* yearbook". It is the same on `main`, and it
  renders as asterisks because the arts fields render no markdown. Fix: drop the asterisks
  (a one-line data edit and its nine translations), alongside Catholic's `**`.
- **Guard (h)'s UNPUBLISHED long-span pattern stops at 12 words**, so a not-published
  sentence with a long noun list is invisible to it. It was hit twice (Cannon Batch 3,
  HG Batch 5). Widening it would change the earlier areas' calibration, so it is left
  as is.
- **Research bookkeeping in a non-prose field.** carmel-christian `theatre.ledger[2].year` is
  `'~2022-23 (year to verify)'`. `year` is not prose, so it is untranslated and off every
  worklist, and the "(year to verify)" renders to parents in every locale.
- **Student names on the ledgers** are high-school students and are allowed by the K–8
  rule. No other K–8-grade student name was found in the arts files (the Latin one is
  handled above).
