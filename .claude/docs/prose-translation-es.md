# Spanish research-prose translation — rollout

**Status:** not started. Written 2026-07-27.
**Mechanism:** see [`prose-translation-architecture.md`](./prose-translation-architecture.md).
That doc is language-independent; this one is only the Spanish rollout.

Spanish has full UI-chrome coverage today (PRs #40–#43), so a Spanish reader
currently sees Spanish headings above English paragraphs. This closes that gap.

---

## Stage order

Cheapest and lowest-stakes first, so the machinery is proven before it touches
admissions outcomes and tuition. Word counts are **extrapolated, not measured** —
Stage 0 replaces them.

| Stage | Scope | Est. words | Why here |
|---|---|---|---|
| 0 | Extraction + `check_translations.mjs` + TM dedupe. No prose, no `localized()`. | — | Machinery alone; measures the real surface |
| 1 | **The Arts** | ~8k | Lowest stakes; proves the pipeline end-to-end. Also lands `localized()` + accessor rewiring |
| 2 | **Sports** | ~10k | High volume, heavy label reuse — validates the TM dedup |
| 3 | **Student Clubs** | ~5k + surviving prose | Small; exercises the mixed prose+card path |
| 4 | **After School** | ~7k | First money strings — verify `localizeMoneyText()` still owns them |
| 5 | **College Support** | ~12k | Highest stakes: admissions outcomes |
| 6 | **Financial Aid** | ~39k prose + reports | Highest stakes and highest volume; do last |

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
rollout and it is a resourcing question, not an engineering one: stages 1–6 are
roughly 80k words of review across six rounds. The realistic failure mode is that
Stage 0 lands and the rest stalls.

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
