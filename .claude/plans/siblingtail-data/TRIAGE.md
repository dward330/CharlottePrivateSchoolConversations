# siblingtail — Phase 1 triage result

Measured 2026-08-24 on branch `i18n/sibling-tail`. Regenerate with
`node .claude/plans/siblingtail-data/build_worklist.mjs`.

## The counts — and why they differ from the plan's 35

The plan quoted **35 untriaged of 653**. Both halves of that are raw detector *rows*,
which double-count: one string flags once per parent group it appears in, and once per
locale. Deduplicating gives the real shape:

| | Count |
|---|---|
| Raw detector rows, 9 locales (`653` in the plan — reproduced exactly) | 653 |
| Distinct `(string, locale)` pairs | 574 |
| Distinct strings (union of 9 locales) | 128 |
| Distinct strings already in the NOTES.md ledger | 120 |
| **Untriaged distinct strings** | **8** |
| **Untriaged `(string, locale)` pairs** | **25** |

The ledger cross-reference was checked two ways beyond a bare substring test, because a
false "already ledgered" would hide a real leak:

1. Every one of the 120 matches lands inside an actual markdown **table row** of the
   ledger, not in surrounding prose (`0` matched only in prose).
2. The ledger is keyed by `(string, locale)`. Every flagged pair's locale is named in its
   own ledger row — `0` strings were flagged in a locale the ledger had not recorded.

So the worklist is exactly these 8 strings / 25 pairs.

## The verdicts

**Ratio: 4 LEAK : 4 KEEP by string; 8 LEAK : 17 KEEP by `(string, locale)` pair.**

| # | String | Flagged in | Verdict | Evidence |
|---|---|---|---|---|
| 1 | `4.60 / 3.96 / 2.49` | ar, bn, fa, fr, ht, te | **KEEP** ×6 | Bare figure triple (three GPAs). Its caption sibling *is* translated. Figures are copied char-for-char; the sibling `21` is kept in the same group. |
| 2 | `7:45 AM–5:00 PM` | ar, fr | **LEAK** ×2 | fr and ar translate the AM/PM marker on **four of five** clock spans in the same cell and miss this one. The other seven locales keep all five — a convention, correctly unflagged. |
| 3 | `DECA → ICDC ’26` | bn, es, fa, fr, hi, ht, it, te | **KEEP** ×8 | Two organisation acronyms, an arrow and a year. Every translated sibling carries a common noun (`finalists`, `place`, `awards`, `medal`); this row has none. Same class as the ledgered `QuestBridge Scholar → Stanford`. |
| 4 | `Drop-in (Before School, CCS)` | bn, hi, ht, te | **LEAK** ×3 (bn, hi, ht) · **KEEP** ×1 (te) | bn/hi/ht each translate two of the three `Drop-in (…)` siblings and keep exactly this one. te keeps `drop-in` as a Latin loanword everywhere in the topic (`Drop-in రేటు`, `Drop-in సంరక్షణ`) and `Before School`/`CCS` are kept identifiers — nothing left to translate. |
| 5 | `Engaging the Culture - An Introduction to Apologetics and Worldviews` | es | **KEEP** ×1 | **All nine** locales keep this title; all nine translate the short sibling labels (`Christian Doctrine` → `Doctrina cristiana`, `ఈసాई सिद्धांत`, …). A published catalog course name with a subtitle, matchable against the school's catalog. |
| 6 | `Fine Arts (Art, Music, Drama)` | ar, fr | **LEAK** ×2 | Both fr and ar translate the bare `Fine Arts` in the same file (`Beaux-arts`, `الفنون الجميلة`), so it is not a kept identifier in either. The parenthetical is three plain common nouns. es/ht/bn/hi all translated the full string. |
| 7 | `Pathway Program` | fr | **KEEP** ×1 | Sits beside `Options Program`, which fr also keeps; the translated sibling prose names the track in Latin (`la filière Options`). Named Charlotte Catholic programme identifiers, handled consistently. |
| 8 | `World Language (daily)` | fr | **LEAK** ×1 | fr translates `World Language` → `Langue étrangère` and `World Language Rotation` → `Rotation des langues étrangères` in the same file, and translates the immediate sibling. `(daily)` is a plain common word. es/ht/bn/hi translated it. |

## Phase 2 worklist — the 8 `(string, locale)` edits

Each rendering below is **derived from a translated sibling in the same locale and file**,
not composed fresh. Figures and identifiers are copied char-for-char.

### `metric-values` — `7:45 AM–5:00 PM`

Siblings define the pattern exactly: digits keep `H:MM` (matched against the school's own
bell schedule, per `.claude/docs/prose-translation-fr.md` §4), only the marker localizes.

| Locale | Sibling precedent | New `t` |
|---|---|---|
| `fr` | `7:30 AM–5:30 PM` → `7:30 a.m.–5:30 p.m.` | `7:45 a.m.–5:00 p.m.` |
| `ar` | `7:30 AM–5:30 PM` → `7:30 صباحًا–5:30 مساءً` | `7:45 صباحًا–5:00 مساءً` |

### `after-school` — `Drop-in (Before School, CCS)`

`Before School` and `CCS` stay Latin in every sibling; only the leading `Drop-in` and any
common noun move.

| Locale | Sibling precedent | New `t` |
|---|---|---|
| `bn` | `Drop-in (Before School, WEE sibling)` → `Drop-in (Before School, WEE ভাইবোন)` | `Drop-in (Before School, CCS)` — **see note** |
| `hi` | `Drop-in (YCC & After School)` → `Drop-in (YCC और After School)` | `Drop-in (Before School, CCS)` — **see note** |
| `ht` | `Drop-in (YCC & After School)` → `San randevou (YCC & After School)` | `San randevou (Before School, CCS)` |

**Note for `bn` and `hi`:** both keep `Drop-in` itself as a Latin loanword in their
siblings, and translate only the tail common noun (`sibling`, `&`). This string's tail is
`CCS`, an acronym — so under a strict reading of each locale's own convention there is
**nothing translatable left**, exactly the argument that makes it a KEEP for `te`.
**Phase 2 must re-decide `bn` and `hi` on that basis** and is expected to reclassify them
to KEEP; only `ht` (which translates `Drop-in` itself → `San randevou`) is an unambiguous
edit. Recorded here rather than silently resolved, because Phase 1 triaged on the group
evidence and Phase 2 has the translation evidence — every prior pass reclassified rows at
this step.

### `course-offerings` — `Fine Arts (Art, Music, Drama)`

| Locale | Sibling precedent | New `t` |
|---|---|---|
| `fr` | `Fine Arts` → `Beaux-arts`; es rendering `Bellas artes (arte, música, teatro)` | `Beaux-arts (arts plastiques, musique, théâtre)` |
| `ar` | `Fine Arts` → `الفنون الجميلة`; `Fine Arts electives` → `مواد الفنون الجميلة الاختيارية` | `الفنون الجميلة (فنون، موسيقى، مسرح)` |

### `course-offerings` — `World Language (daily)`

| Locale | Sibling precedent | New `t` |
|---|---|---|
| `fr` | `World Language` → `Langue étrangère`; sibling prose uses `Des cours quotidiens` | `Langue étrangère (quotidien)` |

## One adjacent finding, deliberately NOT folded in

`World Language (Online)` (`course-offerings`, `carmel-christian`, `fr`) is the **same
defect as #8** — fr keeps it while translating the bare `World Language`. The detector did
**not** flag it: its parent group did not clear the `--min-sibs 3` threshold. It is a
different school and outside this plan's stated scope (the 8 flagged strings), so it is
recorded here as a follow-up rather than fixed silently.

## What this pass says about the detector class

Sub-threshold within-locale findings ran **4 LEAK : 4 KEEP by string**. That sits between
`#196`'s 1:6.4 tail and `capsleaks`' 54:0 caps half — a third distinct ratio, confirming
`capsleaks`' recorded lesson that these classes must not share one threshold.

Two structural observations worth carrying forward:

- **The ledger is doing its job.** 120 of 128 distinct strings were already recorded, so
  the pass cost was almost entirely in the cross-reference, not the triage. The raw 653 is
  noise; the real queue was 8.
- **#2 is the clearest case yet for this detector's existence.** All nine locales keep
  `7:45 AM–5:00 PM`, so it scores 0/9 on the consensus detector and is invisible to it by
  construction — yet in `fr` and `ar` it is a lone English cell among four translated
  siblings. That is precisely the blind spot PR #198 documented.

## Browser-check note for Phase 2 — where each string actually renders

Per `capsleaks`' recorded trap, check a string's `at` path before treating a browser MISS
as a defect. The two Compare-row strings are especially misleading:

| String | `at` path | Renders on |
|---|---|---|
| `7:45 AM–5:00 PM` | `providence-day:[27].values.gaston-day` | The **Compare** page, `summer-care-span` row — the `providence-day` prefix is the row's *leader*, and the cell belongs to **Gaston Day**. Not a Providence Day school page. |
| `DECA → ICDC ’26` (KEEP) | `providence-day:[20].values` | Compare page. |
| `Drop-in (Before School, CCS)` | `carmel-christian:cost.fees` | Carmel Christian → After School. |
| `Fine Arts (Art, Music, Drama)` | `charlotte-country-day:divisions[0]…` | Charlotte Country Day → Course Offerings, Lower School. |
| `World Language (daily)` | `cannon:divisions[1]…` | Cannon → Course Offerings, Middle School. |

Confirmed against `npm run build`, whose `compareAs` check prints
`gaston-day  7:45 AM–5:00 PM -> 555` under the `summer-care-span` row.
