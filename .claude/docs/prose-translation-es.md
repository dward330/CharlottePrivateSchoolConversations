# Spanish research-prose translation — rollout

**Status:** not started. Written 2026-07-27.
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
| 1 | **Student Clubs** | 4,607 | 240 | **Smallest topic** — proves the pipeline end-to-end on the least content. Also lands `localized()` + accessor rewiring |
| 2 | **The Arts** | 12,988 | 587 | Low stakes; first substantial prose volume |
| 3 | **Sports** | 9,939 | 719 | Most field sites — stresses reinjection breadth |
| 4 | **After School** | 9,430 | 603 | Money strings — verify `localizeMoneyText()` still owns them |
| 5 | **College Support** | 17,463 | 896 | Highest stakes and largest: admissions outcomes |
| 6 | **Financial Aid** | ~39k (`src/content`) | — | Highest stakes; the only `src/content` stage; do last |

**Stage 1 changed from The Arts to Student Clubs** on the measured numbers. The Arts
is 12,988 words — nearly 3× Student Clubs — and the first stage carries the
architecture risk (`localized()`, accessor rewiring) as well as the first
translation. Pairing that risk with the smallest content gets the machinery reviewed
on 240 fields rather than 587.

Total for stages 1–5: **54,427 words** across 3,045 field sites.

**One stage per PR.** Seven PRs. Nothing batches.

Stage 6 is the only one touching the still-prose-first `src/content/` layer, and the
only place the ingest-desync concern is real. Same overlay + hash mechanism, keyed by
`(school, topic, subtopic)`; because runtime falls back to English on hash mismatch,
an ingest pass that rewrites a section degrades it to English rather than corrupting
it. Expect this stage to need the most iteration — no ingest pass has yet interacted
with an overlay.

**Do not flip `PROSE_TRANSLATED` to include `'es'` until Stage 6 passes review.**

---

## Review gate

Every content stage (1–6) is gated on native-speaker review before merge. **Stage 0
is not** — it contains no Spanish, so its review is an ordinary code review.

**As of July 2026 no reviewer is identified.** This is the single largest risk to the
rollout and it is a resourcing question, not an engineering one: stages 1–5 are
**54,427 measured words**, plus ~39k at stage 6 — roughly 93k words of review across
six rounds. The realistic failure mode is that Stage 0 lands and the rest stalls.

For scale: stage 1 alone is 4,607 words (a comfortable single sitting), while stage 5
is 17,463 (several). Recruiting one reviewer for stage 1 is a genuinely small ask and
is the right first commitment — it validates both the translation quality and the
review workflow before anyone signs up for the large topics.

Deliberate consequence: **Stage 0 is worth doing on its own merits** — it is
risk-free, language-independent, and converts the estimates above into a measured
number that says how much reviewer time is actually being asked for. Do not start
Stage 1 before a reviewer exists; translating prose that cannot be reviewed inverts
the gate the whole plan is built around and would sit unmerged.

If reviewers prove scarce, ship **fewer topics well** rather than all seven
unreviewed. Partial coverage is a supported state end-to-end — untranslated fields
fall back to English silently.

---

## Permitted compressions

If seven PRs is too much ceremony, these are defensible:

- **Fold Stage 0 into Stage 1** — machinery plus The Arts. Sooner working Spanish, at
  the cost of reviewing architecture and first translation output together. Not
  recommended, but reasonable.
- **Merge stages 2–4** (Sports, Clubs, After School) — the three lowest-stakes content
  stages, sharing one code path. Gets you to five PRs.

**Not compressible: stages 5 and 6** (College Support, Financial Aid), and neither
folds into anything else. Those are the admissions-outcome and tuition numbers — the
reason the gate exists at all.

---

## Also open, independent of this work

A native-speaker review of the **already-shipped** `src/locales/es.json`. Editorial
headings like "La dosis de realidad" (*the reality check*) and "Puntos a vigilar"
(*watch-outs*) carry tone that was never human-checked. Worth doing before Spanish is
promoted publicly, and it is a much smaller ask than any prose stage — a good first
task for whoever is found to review.
