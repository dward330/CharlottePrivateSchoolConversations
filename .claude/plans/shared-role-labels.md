---
name: shared-role-labels
title: Translate two athletics role labels that four locales left in English across three schools
status: implemented
phases: 1
created: 2026-08-19
branch: i18n/shared-role-labels
prs: [151]
---

# Translate two athletics role labels that four locales left in English

## Goal

Two overlay entries — `Athletic Director` and `Strength & conditioning` — ship untranslated
in four locales each, while five other locales translate both and the same locales translate
62–87% of comparable role strings. Fill those eight locale-cells so the labels read in the
reader's language on all three school pages that share them.

Done when every locale renders both labels in its own language (or has a recorded reason not
to), `check:runtime` still resolves 11,344 entries per locale with no orphans, and the three
affected school pages are confirmed in a browser.

## Context

### Why this is a plan and not a one-line edit

**The overlay layer is keyed by CONTENT HASH, not by school.** One entry serves every school
whose English text matches, so editing `Athletic Director` changes **three** school pages at
once — two of which have nothing to do with the work that surfaced the issue:

| String | Topic file | Paths | Schools sharing the hash |
|---|---|---|---|
| `Athletic Director` | `sports.<lang>.json` | 4 | `charlotte-catholic`, `covenant-day`, `gaston-day` |
| `Strength & conditioning` | `sports.<lang>.json` | 2 | `charlotte-catholic`, `covenant-day` |

Exact paths (read from `sports.es.json`, 2026-08-19):

```
Athletic Director        charlotte-catholic:coaching.featured[0].kicker
                         charlotte-catholic:coaching.tenure[1].role
                         covenant-day:coaching.tenure[1].role
                         gaston-day:facilities.care[0].label

Strength & conditioning  charlotte-catholic:facilities.care[2].label
                         covenant-day:facilities.care[0].label
```

This constraint is what blocked the fix during the Charlotte Catholic Phase 2 rollout
(PR #150) — the triage agents were scoped to `charlotte-catholic:` paths only and correctly
**refused** these entries rather than silently rewriting other schools' pages. Fixing them
requires a deliberate cross-school decision, which is this plan.

### Current state, measured 2026-08-19

`Athletic Director`:

| es | bn | ht | te | fr | fa | it | hi | ar |
|---|---|---|---|---|---|---|---|---|
| Director deportivo | **English** | Direktè Atletik | **English** | **English** | مدیر ورزشی | Direttore atletico | **English** | المدير الرياضي |

`Strength & conditioning`:

| es | bn | ht | te | fr | fa | it | hi | ar |
|---|---|---|---|---|---|---|---|---|
| Fuerza y acondicionamiento | **English** | Fòs ak kondisyònman | **English** | Préparation physique | قدرت و آماده‌سازی | **English** | **English** | القوة واللياقة |

Five of nine locales translate each. **Eight locale-cells to fill.**

### Why these two are misses and not convention

Over `coaching.tenure[].role` and `coaching.featured[].kicker` (68 strings), the four
lagging locales already translate most comparable strings:

| Locale | Role strings translated |
|---|---|
| bn | 87% (59/68) |
| te | 72% (49/68) |
| fr | 62% (42/68) |
| hi | 62% (42/68) |

Leaving these two in English contradicts each locale's own established behaviour. That is
the test applied — a locale's own shipped choices, not a cross-locale majority.

### Render sites (confirmed in `src/components/SportsProgram.tsx`)

- `coaching.featured[].kicker` → `SportsProgram.tsx:554` (`.sports-pro-kicker`)
- `coaching.tenure[].role` → `SportsProgram.tsx:572` (tenure roster)
- `facilities.care[].label` → `SportsProgram.tsx:650` (care/facilities list)

All three are plain text nodes; no layout or width constraint depends on the string length,
but the browser check below should still confirm no wrapping regression in the tenure roster,
which is a grid.

## Decisions

- **Scope is these two strings only** — the four other shared-hash entries flagged during
  PR #150 (`Basketball`, `Soccer`, `Choral`, `Health`) were measured and **rejected as
  deliberate convention**, not leaks. See *Explicitly out of scope* below. (User-confirmed,
  2026-08-19.)
- **Fix at the shared entry, accepting the cross-school effect** — rather than splitting the
  hash per school. A split would mean altering the English source text of one school to make
  it differ, which corrupts data to work around a storage detail. The label is the same
  English in all three places and should read the same in every language.
- **Translate to each locale's own register, not to a single imported rendering** — the
  implementer picks the wording per locale from that locale's existing role vocabulary in
  `sports.<lang>.json`, not by transliterating the Spanish.
- **Single-phase.** The English already exists and does not change; this only fills locale
  overlays. No new `src/locales/*.json` key, no new card, section, or Compare row.

## Explicitly out of scope — measured and rejected

Do **not** "fix" these while in the neighbourhood. They were flagged by `i18n:leaks` during
PR #150 and measured against each locale's own conventions:

| String | Why it stays English |
|---|---|
| `Basketball`, `Soccer` | Every locale keeps **75–97%** of sport labels in Latin (hi 97%, it 88%, fa 84%, fr 84%, te 75%). Translating these two would leave 27–31 sibling sport labels inconsistent. |
| `Health` | Every locale keeps **95–99%** of `courses[].title` in Latin (te/fr/fa/ar 99%, it 98%, hi 96%, bn 95%). Course titles are searchable identifiers. |
| `Choral` | Music-track labels; `te` keeps `Band`/`Chorus`/`Orchestra` Latin universally. |

Recorded here so a later pass does not re-litigate them.

## Approvals needed

None. No new card, section, stat tile, Compare row, metric key, or topic; no component,
layout, or styling change. This is data-only enrichment of existing fields, which the
UX-design gate explicitly allows.

Worth telling the user in the `/implement` report, though: **three school pages change in
four locales**, including two schools unrelated to the work that surfaced the issue.

## Steps

1. **Branch** — `i18n/shared-role-labels` off current `main`.

2. **Record the pre-change baseline** so any regression is attributable:

   ```bash
   npm run check:runtime            # expect 11,344 entries × 9 locales, no orphans
   for l in es bn ht te fr fa it hi ar; do npm run check:sepdrift -- --lang $l; done
   ```
   Baseline drift counts: **es 178, ht 1, fa 1, and 0 for bn/te/fr/it/hi/ar.** These are
   pre-existing; they must not increase.

3. **Translate `Athletic Director` for `bn`, `te`, `fr`, `hi`.** In each
   `src/data/overlays/work/sports.<lang>.json`, find the entry whose `text` is exactly
   `Athletic Director` and set `t`. Match the locale's existing role vocabulary — check how
   it already renders `Director of Athletics`, `Head Coach` and `Director of College
   Counseling` in the same file, and stay consistent with that.

   Note `bn` currently keeps *every* `Director of …` title in Latin. If, on inspection, that
   proves to be a deliberate and total convention for title-case director roles, record it as
   a keep with the evidence rather than forcing a translation — the test is the locale's own
   consistency, not this plan's expectation.

4. **Translate `Strength & conditioning` for `bn`, `te`, `it`, `hi`.** Same file and method.
   This one is a descriptive facility label rather than a job title, so it is a weaker
   candidate for a "keep" than step 3.

5. **Do not touch any other entry.** Guard the edit by re-reading each entry's `at` array
   before writing and asserting the `text` matches exactly; the risk in this plan is
   collateral edits, not wrong wording.

6. **Rebuild the overlays** for the four affected locales (all nine is also fine and safer):

   ```bash
   node scripts/i18n_build_overlay.mjs --topic sports --lang <code>
   ```

7. **Update `src/data/overlays/NOTES.md`** with a short entry: these two labels are shared
   across `charlotte-catholic`, `covenant-day` and `gaston-day` by content hash, so they were
   translated for all three together, and the four sport/course strings above were measured
   and deliberately left English.

8. **Consider a durable note on hash-sharing** (open question below) — if taken, add it to
   `scripts/gen_data_schema.mjs` and run `npm run schema` + `npm run check:schema`.

## Verification

Single-phase; run all of it.

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds
- [ ] `npm run check:runtime` — **all 9 locales, 11,344 entries each, no orphans.** This is
      the authoritative guard: a failed stamp falls back to English silently.
- [ ] `npm run check:sepdrift -- --lang <code>` for all nine — must equal the step-2
      baseline exactly (es 178, ht 1, fa 1, rest 0). Neither string carries a figure, so any
      change here means something else was touched.
- [ ] `npm run check:script` — every overlay still in its own script
- [ ] `npm run check:hi` — Western digits, no lakh/crore regrouping
- [ ] `npm run check:fr` — frozen identifiers preserved
- [ ] `npm run check:bidi` — no isolate leakage
- [ ] `npm run i18n:leaks -- --lang <code>` for `bn`, `te`, `fr`, `hi`, `it` — each locale's
      flag count should fall by the number of strings fixed; confirm no new flags appear.
- [ ] **Browser check — this is the step the plan exists for.** With `npm run preview`, load
      **all three** schools in **each of the four** locales:

      /school/charlotte-catholic/?lang=<code>
      /school/covenant-day/?lang=<code>
      /school/gaston-day/?lang=<code>

      Confirm for each: the label renders translated, the coaching-tenure grid does not wrap
      or overflow with the longer string, and `facilities.care` still lays out correctly.
      Gaston Day is the easiest to forget — its path is `facilities.care[0].label`, a
      different field from the other two.

## Risks

| Risk | Mitigation |
|---|---|
| A collateral edit changes an unrelated entry sharing a similar string | Step 5 — assert exact `text` match and re-read `at` before writing; `check:runtime` catches an orphaned stamp |
| A longer translation breaks the tenure grid or care list layout | Browser check across all three schools; `bn`/`te`/`hi` scripts are typically wider than Latin |
| A "fix" that actually contradicts the locale's convention | Steps 3–4 require checking sibling role strings first, and permit a recorded keep over a forced translation |
| Reviewer surprised that Covenant Day and Gaston Day changed | Say it in the PR body — the shared hash is the reason, and it is the whole point of the plan |

## Open questions

- **Should hash-sharing be documented durably?** It has now caused confusion twice: once
  during the PR #150 triage, and once in the follow-up summary that mis-described four
  convention keeps as leaks. A sentence in `DATA-SCHEMA.md` (via
  `scripts/gen_data_schema.mjs`) saying *overlay entries are keyed by content hash and one
  entry may serve several schools* would stop the next window rediscovering it.
  **Default:** add it, and note in the PR body that the doc was regenerated.
- **Is `bn`'s all-Latin treatment of `Director of …` titles deliberate?** Step 3 resolves
  this by inspection. **Default:** if `bn` keeps every other `Director of …` in Latin, leave
  `Athletic Director` English for `bn` and record the evidence; fix the other three locales.

## Implementation notes

Implemented 2026-08-19 on `i18n/shared-role-labels`. **Four of the eight planned
locale-cells were filled; the other four are recorded keeps** — the outcome step 3
explicitly permitted, generalized from `bn` to all four lagging locales on the same
evidence.

### `Strength & conditioning` — translated for `bn`, `te`, `it`, `hi` (as planned)

| Locale | Rendering |
|---|---|
| bn | স্ট্রেংথ ও কন্ডিশনিং |
| te | స్ట్రెంగ్త్ & కండిషనింగ్ |
| it | Forza e condizionamento |
| hi | स्ट्रेंथ और कंडीशनिंग |

Confirmed a genuine leak by the `facilities.care[].label` class — a homogeneous set of
21 sibling labels of which every locale already translates 18–21, including the
adjacent `S&C staff` and `Strength as curriculum`. The lowercase `conditioning` marks
it descriptive rather than a job title.

### `Athletic Director` — NOT translated; recorded keep for `bn`, `te`, `fr`, `hi`

The plan's step 3 anticipated this for `bn` and told the implementer to record a keep
with evidence rather than force a translation. Inspection showed the convention is not
`bn`-specific: **all four locales keep 6 of 6 bare `Director` job titles in Latin, with
zero exceptions** — `Director of Athletics`, `Director of Sports Performance`,
`Director of Athletic Performance`, `Associate Athletic Director`, `Football Program
Director`, and `Athletic Director` itself. The only `Director` strings they touch are
compound, where a sport-name prefix is translated and the title stays Latin
(`কুস্তি · Director of S&C`).

**Why the plan's 62–87% figure pointed the other way.** That rate was measured over all
68 `coaching.tenure[].role` / `featured[].kicker` strings, most of which are a sport
name plus an editorial clause (`Boys Basketball — 19 yrs as assistant`); those are
translated because the clause is prose. Narrowed to the comparable class — bare job
titles — the four locales translate `Head Coach` and `Athletic Trainer` but no
`Director` title at all. Translating this one would have made it the sole translated
director title in each locale.

`it` was left as-is because it already shipped `Direttore atletico`, and `es`/`ht`/
`fa`/`ar` likewise keep their existing translations. The label therefore reads
translated in 5 of 9 locales and English in 4, each per that locale's own convention.

### Open question resolved

The hash-sharing note was added (the plan's default) — to `scripts/gen_data_schema.mjs`
in the §3 preamble, so it covers all six structured areas; `DATA-SCHEMA.md` regenerated
and `check:schema` passes.

### Verification

`tsc` clean · `build` passes · `check:runtime` 11,344 × 9 with no orphans (unchanged) ·
`check:sepdrift` identical to baseline in all nine (es 178, ht 1, fa 1, rest 0) ·
`check:script`, `check:hi`, `check:fr`, `check:bidi`, `check:schema`, `check:ranks` pass.

`i18n:leaks` — `Strength & conditioning` cleared the flag list in all five affected
locales. `Athletic Director` still flags in `bn`/`te`/`fr`/`hi`, which is correct: the
checker's own output states each flag is a review item, not automatically a defect, and
the keep is now documented in `src/data/overlays/NOTES.md`.

**Browser check (real Chromium, panels force-expanded)** across all three schools × five
locales: the label renders translated, no horizontal scroll, and no overflow in the
kicker/tenure/care containers. One correction to a first-pass reading — Gaston Day
appeared to show an untranslated `Athletic Director` in `it`, but that was a full-page
text match against surrounding prose; the `.sports-care-label` itself correctly renders
`Direttore atletico` (and `Director deportivo` in `es`).
