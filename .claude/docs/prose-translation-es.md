# Spanish research-prose translation — rollout

**Status:** Stages 1–4 of 8 landed. Written 2026-07-27.
**Mechanism:** see [`prose-translation-architecture.md`](./prose-translation-architecture.md).
That doc is language-independent; this one is only the Spanish rollout.

Spanish has full UI-chrome coverage today (PRs #40–#43), so a Spanish reader
currently sees Spanish headings above English paragraphs. This closes that gap.

---

## Stage order

Cheapest and lowest-stakes first, so the machinery is proven before it touches
admissions outcomes and tuition. Word counts below are **measured**
(`node scripts/i18n_extract.mjs --report`), not estimated.

| Stage | Scope | Words | Fields | Why here |
|---|---|---|---|---|
| 0 ✅ | Extraction + `check_translations.mjs` + field classification. No prose, no `localized()`. | — | — | **Done.** Machinery alone; measured the real surface |
| 1 ✅ | **Student Clubs** (3 modules) | 7,044 | 577 | **Done.** Smallest topic; proved the pipeline end-to-end and landed `localized()` + accessor rewiring |
| 2 ✅ | **The Arts** | 12,843 | 587 | **Done.** Low stakes; first substantial prose volume |
| 3 ✅ | **Sports** | 9,553 | 719 | **Done.** Most field sites — stressed reinjection breadth |
| 4 ✅ | **After School** | 9,550 | 657 | **Done.** Money strings verified: every `$` figure preserved verbatim, none hand-converted — `localizeMoneyText()` still owns presentation |
| 5 | **College Support** | 17,463 | 896 | Highest stakes and largest: admissions outcomes |
| 6 | **Course Offerings** (`courseOfferings.ts`) | 17,858 | 2,992 | Found by the sibling-layer audit; its own card, own module |
| 7 | **Financial Aid** — deep-dive report (`financialAidReports.ts`) | 11,464 | 934 | Structured card; highest stakes |
| 8 | **Financial Aid** — ingested prose (`src/content`) | ~39k | — | The only `src/content` stage; do last |
| — | **Stat tiles / Compare rows** (`metricValues.ts`) | 704 | 184 | Small; fold into whichever stage touches its topic |

**Stage 1 changed from The Arts to Student Clubs** on the measured numbers, and that
turned out to matter for a second reason: Student Clubs renders from **three**
modules, not one, so it exposed the sibling-layer problem on the cheapest topic.

**Sibling-layer audit (2026-07-27).** After Stage 1 shipped two English cards, every
topic was checked against the accessors `SchoolDetail` actually calls. Findings:

- Sports, The Arts, College Support, After School each render from a **single**
  `*Programs/<slug>.ts` module — no hidden siblings. Their stage numbers stand.
- Student Clubs renders from **three** (`clubsPrograms` + `clubClusters` +
  `clubCatalog`) — the Stage 1 gap, now closed.
- **`courseOfferings.ts` (17,858 words) and `financialAidReports.ts` (11,464) were
  never in the plan at all.** Both are per-school research prose behind their own
  cards. They are now stages 6 and 7.
- `metricValues.ts` (704 words) carries stat-tile labels and Compare-row notes.

Total across all stages: **~97,700 words**, up from the 54,427 the plan carried
before the audit — a 79% increase, all of it work that was always there and simply
uncounted.

**One stage per PR.** Nine PRs. Nothing batches.

Stage 8 is the only one touching the still-prose-first `src/content/` layer, and the
only place the ingest-desync concern is real. Same overlay + hash mechanism, keyed by
`(school, topic, subtopic)`; because runtime falls back to English on hash mismatch,
an ingest pass that rewrites a section degrades it to English rather than corrupting
it. Expect this stage to need the most iteration — no ingest pass has yet interacted
with an overlay.

**Do not flip `PROSE_TRANSLATED` to include `'es'` until Stage 8 lands.**

---

## Review

**Decision, 2026-07-27 (project owner): stages proceed without a review gate.**
Spanish review happens once, after all stages are complete. No stage waits on a
reviewer, and no stage is blocked from merging for lack of one.

Practical consequences:

- Stages 1–8 land back-to-back at whatever pace the work allows.
- **`PROSE_TRANSLATED` stays `[]` until the end-of-rollout review.** This is the one
  remaining ordering constraint, and it is technical rather than editorial: that list
  drives `data-prose` on `<html>` and the RTL LTR-pin CSS rule (see
  [`prose-vs-chrome-translation-layers`]). It also means the Spanish prose is not
  presented as finished while it is still unreviewed.
- Corrections arrive in bulk against the whole corpus. The overlay format makes this
  cheap: a reviewer edits `t` values in `src/data/overlays/<topic>.es.json` without
  touching English or structure, and `check_translations.mjs` verifies nothing drifted
  underneath them.

**Translation notes are kept as we go** in `src/data/overlays/NOTES.md` — terminology
choices, hedges that were hard to carry into Spanish, and anything a stage was unsure
of. This costs almost nothing during the work and gives the eventual review a list of
known soft spots rather than an undifferentiated ~98k-word wall.

Worth stating plainly, since it is the risk being accepted rather than removed: this
is factual research families use for five-figure decisions, the prose carries
deliberate hedges ("school-reported, no methodology published"), and a mistranslation
is invisible to a reader who does not read Spanish. A systematic error in how a hedge
is rendered will surface at the end rather than after the first stage. `NOTES.md` and
the `PROSE_TRANSLATED` hold are what keep that recoverable.

---

## Permitted compressions

If nine PRs is too much ceremony, these are defensible:

- **Merge stages 2–4** (The Arts, Sports, After School) — the three lowest-stakes
  remaining content stages, sharing one code path.
- **Fold `metricValues.ts`** into whichever stage touches its topic rather than giving
  it one of its own; it is 704 words.

**Not compressible: stages 5, 7 and 8** (College Support, and both halves of Financial
Aid). Those are the admissions-outcome and tuition numbers — the reason the caution
exists at all. Stage 6 (Course Offerings) is large but low-stakes; it can move earlier
if a stage needs to be cheap.

---

## Also open, independent of this work

A native-speaker review of the **already-shipped** `src/locales/es.json`. Editorial
headings like "La dosis de realidad" (*the reality check*) and "Puntos a vigilar"
(*watch-outs*) carry tone that was never human-checked. Worth doing before Spanish is
promoted publicly, and it is a much smaller ask than any prose stage — a good first
task for whoever is found to review.
