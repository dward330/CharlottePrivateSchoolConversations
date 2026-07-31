# French (Français) research-prose translation — rollout

**Status:** **COMPLETE AND REVIEWED.** All nine topics plus the 331-key chrome
catalog translated; every automated check passes; both browser print-outs done
and all four defects they found fixed; **native-speaker review passed
(2026-07-30)**. `fr` is live in `TRANSLATED` and `PROSE_TRANSLATED`.
Written and executed 2026-07-30.

**French ships REVIEWED — in Spanish/Bangla/Telugu's position, not Kreyòl's.**
French speakers read the rendered pages and accepted the prose. That closes the
one failure mode no check in this repo can reach: register, naturalness, and
whether leaving `Upper School` and `French III Honors` in English reads as
deliberate rather than as an oversight.

> ## START HERE (fresh session)
>
> French is the **sixth** language, after English, Spanish, Bangla, Haitian
> Creole and Telugu. Its cost shape is **Kreyòl, not Bangla or Telugu**: Latin
> script, no declared font, **no typography spike**. It is the first rollout
> without one.
>
> **Read [`prose-translation-ht.md`](./prose-translation-ht.md) for the method**
> (closest precedent — Latin script, no font work) and
> [`prose-translation-architecture.md`](./prose-translation-architecture.md) for
> the language-independent mechanism. Do not re-derive either. This doc holds
> only what is French-specific.
>
> **Branch:** `i18n/french-rollout`.
>
> ### What is left
>
> **Nothing.** Read this doc for the METHOD, not for open work.
>
> ### The print-out rounds
>
> | Round | School | Result |
> |---|---|---|
> | 1 | Charlotte Latin (real browser, 65pp) | **3 defects** — see §4 |
> | 2 | Providence Day (real browser, 80pp) | **1 defect** — stat tiles |
>
> **Every one was render-layer, and every automated check had passed.** Three
> of the four were NOT French-specific: two affect Spanish identically and one
> affects `te`/`ht`/`en` too. This is the fourth consecutive rollout where the
> print-out found what no checker could — do not treat a clean checker run as a
> substitute for it.
>
> Providence Day earned its place as the second school. Latin's tiles read
> `$36,500` / `$3.25M` — wrong, but only once you know. Providence Day puts
> `$3.68M` and `3 683 971 $US` on the *same document*, which is what made the
> contradiction unmissable.
>
> ### Progress — all translated, all verified
>
> | Topic | Strings | Figures | Identifiers | Overlay |
> |---|---|---|---|---|
> | metric-values | 126 | ✅ | ✅ | ✅ |
> | student-clubs | 517 | ✅ | ✅ | ✅ |
> | sports | 656 | ✅ | ✅ | ✅ |
> | after-school | 654 | ✅ | ✅ | ✅ |
> | the-arts | 599 | ✅ | ✅ | ✅ |
> | college-support | 926 | ✅ | ✅ | ✅ |
> | course-offerings | 1,848 | ✅ | ✅ | ✅ |
> | financial-aid-report | 571 | ✅ | ✅ | ✅ |
> | financial-aid-tuition (content) | 27 | ✅ | ✅ | ✅ |
> | **shipped entries** | **5,924** | | | |
> | UI chrome `src/locales/fr.json` | 331 keys | — | | |
>
> `financial-aid-report` is 571 of 572 because the 572nd source string is an
> empty `body` field in the data. There is nothing to translate; it is not a gap.
>
> ### The loop that was used, per topic
>
> ```
> node scripts/i18n_extract.mjs --topic <t> --lang fr
> # translate the `t` fields in src/data/overlays/work/<topic>.fr.json
> python3 scripts/check_figures.py --topic <t> --lang fr   # AFTER EVERY TOPIC
> node scripts/i18n_build_overlay.mjs --topic <t> --lang fr
> node scripts/check_fr_identifiers.mjs                    # fr-specific, see §1a
> node scripts/check_translations.mjs --lang fr
> ```
>
> ### Settled — do NOT re-raise
>
> | Decision | Value | Where |
> |---|---|---|
> | Direction | LTR | §0 |
> | Font | **none** — Barlow covers é è ê à ç ô û ï | §0 |
> | Typography spike | **not needed** — first rollout without one | §0 |
> | Digits | Western, 3-3-3 grouping | §0 |
> | Grouping separator | **U+202F narrow no-break space** — `3 683 971` | §0 |
> | `FIGURE_SAFE_NUMBERS` | **fr gets NO entry** (owner, 2026-07-30) | §0 |
> | Symbol placement | **trails** — `3 683 971 $US`, derived via `Intl` | §0 |
> | Currency | USD always; **formatting only, never conversion** | §0 |
> | Register | **formal `vous` throughout** | §1 |
> | Identifiers | Latin/English — institutions, AP/Honors, platforms | §1 |
> | French-language course names | **FROZEN — do not translate** | §1a |
>
> Run the **figure sweep after every topic**, not at the end — it caught a real
> defect in Bangla's `sports` after that topic was already marked complete.
>
> Once a work file holds translations, `i18n_extract.mjs` refuses to overwrite it
> — that guard is deliberate, do not `--force` past it.

**Mechanism:** see [`prose-translation-architecture.md`](./prose-translation-architecture.md).

---

## 0. Phase 0 — CONFIRMED COMPLETE, do not redo

Verified 2026-07-30 by running `Intl` in this repo's Node, all six locales side
by side.

1. **`fr` is already in `SUPPORTED`** in `src/lib/i18n.ts`
   (`{ code: 'fr', label: 'French', native: 'Français' }`) and **declares no
   `font`** — Barlow covers French's accented Latin. No `syncFont()` work, no
   Google Fonts request.
2. **LTR.** The `[data-prose='en'] main` LTR-pin question stays untouched; it
   remains open for Arabic and Farsi only.
3. **No typography spike.** Bangla and Telugu each needed one because they are
   non-Latin scripts in a design built for Barlow. French is Latin script in the
   same face English already uses. Zero `:root[lang='fr']` CSS rules exist and
   none should be added. **This is the first rollout with no spike at all.**

### 0a. Figures — the decision, and why it differs from every predecessor

Measured, 2026-07-30:

| Locale | `3683971` | `$3,683,971` | Symbol |
|---|---|---|---|
| en-US | `3,683,971` | `$3,683,971` | leads |
| es | `3.683.971` | `3.683.971 US$` | trails |
| ht | `3,683,971` | `$3,683,971` | leads |
| bn | `৩৬,৮৩,৯৭১` | `৩৬,৮৩,৯৭১ US$` | trails |
| te | `36,83,971` | `$36,83,971` | leads |
| **fr** | **`3 683 971`** | **`3 683 971 $US`** | **trails** |

French is unlike all five predecessors: narrow-no-break-space grouping, comma
decimal separator, trailing symbol. **No prior locale does this.**

**Decision: `fr` gets NO `FIGURE_SAFE_NUMBERS` entry** (owner, 2026-07-30).

The reasoning turns on one fact: **French grouping is 3-3-3.** The digits are
Western, the digit count is identical, and the group boundaries fall in exactly
the same places as English. `FIGURE_SAFE_NUMBERS` exists for locales whose
convention "would make a figure unrecognisable against its English source"
(`src/lib/figureLocale.ts`) — that is, where **the boundaries move**:

- `bn` and `te` use lakh/crore, so `3,683,971` becomes `36,83,971`. A different-
  looking number that no longer matches the school's published Report on
  Philanthropy. `bn` was therefore added to the list; `te` was deliberately left
  out because the owner wanted native grouping for Telugu readers.
- **`fr` swaps the separator at identical boundaries.** `3 683 971` is still
  recognisably the same figure, digit for digit. That is a *separator* change,
  not a *regrouping*.

The precedent is **Spanish, not Bangla**: `es` already diverges from en-US on
separators (`3.683.971`) and was deliberately left out of the list, because that
is genuinely how Spanish writes numbers and it must keep working. French is the
same case.

The decimal comma is a non-issue for money: tuition renders at
`maximumFractionDigits: 0`, so no money figure gets a decimal separator at all.
It appears only in `winPct` (`0,857`), which is correct French.

**Two consequences, recorded rather than buried:**

1. **No automated check watches French figures.** `check_bn_numerals.mjs`
   asserts the strict 3-3-3 shape only for locales *inside*
   `FIGURE_SAFE_NUMBERS`, so it correctly stays silent about `fr`. The
   `check_figures.py` sweep after every topic is the real guard here, which is
   why this doc repeats that it runs per-topic and not once at the end.
2. **`fr` is the first trailing-symbol locale since the `currencyLeads()` fix**
   (PR #61). Both `money()` and `localizeMoneyText()` now derive placement from
   `Intl.formatToParts` rather than a language check. That fix has only ever been
   exercised by `es` and by leading locales; French is its first genuinely new
   trailing test. The defect it fixed — `3.25 M US$` rendering beside `$36,500`
   on one page — is exactly what to hunt for in the print-out. Expect
   `220 K $US` beside `3 683 971 $US`, consistently trailing.

**Formatting only, never conversion.** Currency stays USD, amounts are never
re-typed. No EUR, no exchange rate, no dual display. Same standing rule as every
other locale.

### 0a2. Percent signs stay UNSPACED — `90%`, not `90 %`

Found by the figure sweep on the very first topic (`metric-values`, 4 strings).

French orthography puts a narrow no-break space before `%`, and `Intl` agrees:
`new Intl.NumberFormat('fr', {style:'percent'}).format(0.9)` → `90 %` (U+00A0).
Typographically, `80 %+ de participation` is the correct French.

**It is nevertheless wrong here, and the precedent is already set.** `es` has the
*same* convention — `Intl` gives Spanish `90 %` too — yet the shipped Spanish
overlay writes `92%` unspaced. Verified across `es`, `ht` and `te` over six
topics: **zero strings** use a spaced percent.

Two reasons, both already standing rules:

1. `check_figures.py` treats `80 %` as having dropped the figure `80%`. That is
   not checker pedantry — these percentages are citations a parent matches
   against the school's own published page, and NOTES.md's rule is that
   **figures are never re-typed**. The `%` travels with the digits.
2. CLAUDE.md's whole-number-percent standard governs the *figure*, and the
   sweep is the only automated guard `fr` has (§0a, consequence 1).

**Rule: strip the space in any translated percent.** Applied mechanically after
translating each topic, before the sweep.

### 0b. The ligature guard matters more here than anywhere

`font-variant-ligatures: none` in `src/index.css` is **load-bearing for French**,
and French is the locale that would have found the bug rather than merely being
protected by it.

The Google-Fonts Barlow build substitutes an `ffi`/`ffl` ligature its shipped
subset has no glyph for, drawing a missing-glyph box. It was caught in Spanish
via `oficial` / `dificultad` — but Spanish spells those with **one** `f`. French
spells them `officiel` and `difficile`, with a **true `ffi` cluster**, as do
`efficace`, `suffisant`, `difficulté`, `affiche`. French hits the exact
three-letter cluster at high frequency.

**Leave the guard alone.** Recorded here only so that if anyone ever proposes
narrowing it back to the discretionary class, French is the locale that breaks
loudest and most visibly.

---

## 1. The register decision (SETTLED, binding)

**Formal `vous` throughout.** Owner's call, 2026-07-30.

The corpus is parent-facing research about institutions, in the register of an
admissions handbook. In French, `tu` toward an unknown adult reader is not merely
informal — it is a social error, and unlike English there is no neutral middle.
`vous` is the only unmarked option.

**What it forces.** Less than it appears, because the corpus is overwhelmingly
**third-person declarative** — "the school reports", "no methodology is
published". Direct address is rare. So `vous` governs a small set of sites:
imperative CTAs and any second-person hedge. Where it does appear it locks
agreement (`vous êtes invité(e)`).

**It interacts with the hedges, and the hedges win.** `vous devrez` and
`il vous faudra peut-être` are different claims. The hedges are the point of this
corpus — "documented minimum", "the school's claim", "an absence of evidence
rather than a stated policy" — and a hedge softened in translation turns a caveat
into a claim. Never smooth one for register's sake.

### The Kreyòl register rule does NOT carry over — it inverts

`prose-translation-ht.md` §1 pins one rule hard: **do not drift into French.**
For Kreyòl, `Upper School` → *l'École Supérieure* was the warning case, because
French is the language of institutional gatekeeping in Haiti and a parent-facing
corpus that drifts French defeats its own purpose.

**For `fr` that same output is simply correct French.** The ht §1 rule is a
worked example of *how to pin a register axis*, not a rule to inherit. Do not
carry it over unexamined.

French's own axis is different and far less politically loaded: **how much
English school vocabulary to keep.** The answer follows the standing convention
unchanged (§1b).

### 1a. FROZEN — French-language names already in the corpus

**This is the French-specific trap, and it is larger than it looks.** There are
**977 sites containing the word "French"** across `src/data` and `src/content`.

In every other locale, a string like `French III Honors` is conspicuously
foreign and no translator would touch it. **In French it reads as translatable
prose.** These sit in the same work file, looking like the same kind of thing:

| Must NOT move (identifier) | Must move (prose) |
|---|---|
| `French III Honors` | `A five-level French sequence.` |
| `AP French Language and Culture` | `Builds French vocabulary around family, education, food…` |
| `French 7 Advanced: Francophone Culture through Literature` | `College-level French language and culture.` |
| `Advanced Placement French Language: Advanced` | `An intensive class preparing students for the AP French language examination.` |
| `French / German / Spanish I–V` | `All students are exposed to both French and Spanish…` |

This is a **new failure shape**, and it is the inverse of the Telugu one. Telugu
leaked via "a sentence wearing an identifier's clothes" (a hedge in a proper-noun
field). French leaks via **an identifier wearing a sentence's clothes**. Neither
the skip audit nor `check_figures.py` can see it, because both strings are
correctly classified as prose.

**The freeze-list** — verified counts, 2026-07-30:

| String | Sites |
|---|---|
| `AP French Language and Culture` (+ `& Culture`, `Language`) | 41 |
| `French III Honors` | 14 |
| `Pi Delta Phi` | 14 |
| `Société Honoraire de Français` | 3 |
| `French I`–`French V`, `French 1–8`, `French 6/7/8` | ~440 |
| `Francophone` (inside course titles) | 36 |

Also frozen: `Honors Greek I–IV`, `AP Spanish Language`, `AP Spanish Literature`,
`AP Latin` and every other course code, by the same logic.

**Check the rendered page for drift.** A grep of the rendered HTML for these
exact strings is part of the print-out, not an optional extra.

### 1b. What stays Latin / English — unchanged from Bangla, Kreyòl and Telugu

**Searchable identifiers** a parent must be able to type into a school's website
or say aloud on a tour:

- **Institution and division names:** `Charlotte Latin School`, `Providence Day`,
  `Upper School`, `Middle School`, `Lower School`, `NCISAA`.
- **Course codes and levels:** `AP`, `IB`, `Honors`, `Advanced Placement`.
  (325 `AP`, 264 `Honors`, 84 `IB` in the corpus.)
- **Platform and program names:** `Clarity`, `Scoir`, `Naviance`, `FACTS`,
  `SSAT`, `Extended Day`, `Model United Nations`, `Mock Trial`, `National Merit`,
  `Cum Laude Society`.
- **Award, festival and venue names**, athlete and staff names, award categories
  inside citations.

A parent cannot search providenceday.org for *Cycle Supérieur*. Translating an
identifier destroys its function as an identifier.

**Translated:** generic descriptors, analysis, and **all hedges**.

**Untouched:** every figure, scoreline, GPA, clock time and date.

**Verbatim quoted source strings stay English**, inside their original quotation
marks — markdown rate tables and Wayback quotes are citations, not prose.

### 1c. Unit suffixes need an `fr` entry

`UNIT_SUFFIX` in `src/lib/format.ts` has an `es` entry only, and there are 64
`/yr`-style sites in the data. French needs `/an`, `/mois`, `/sem.`, `/cours`,
`/h`. Presentation only, same rule as everything else here.

---

## 2. Pre-existing cross-locale leak found during Phase 0 — NOT French-specific

`node scripts/i18n_audit_skips.mjs --suspect` flags six fields. Five (`id`,
`name`, `program`, `value`, `year`) are not in `REVIEWED_SKIPS`, so they flag on
every run and were cleared by eye in prior rollouts. Re-checking them for French
surfaced **real English strings that ship untranslated in all four existing
locales** (`es`, `bn`, `ht`, `te`) — confirmed absent from every overlay:

| Value | Field | File |
|---|---|---|
| `The 2023–24 peak` | `program` | `sportsPrograms/davidson-day.ts:178` |
| `The 2025–26 decline` | `program` | `sportsPrograms/davidson-day.ts:186` |
| `Football — Estep era` | `program` | `sportsPrograms/charlotte-christian.ts:148` |
| `2 years` | `value` | `artsPrograms/cannon.ts:58` |
| `1 credit` | `value` | `artsPrograms/davidson-day.ts:57` |
| `15-yr (2024–25 profile)` | `year` | `collegeSupportPrograms/charlotte-christian.ts:237` |
| `15-yr (2021–22 profile)` | `year` | `collegeSupportPrograms/charlotte-christian.ts:238` |

This is the **exact shape** CLAUDE.md warns about: *a field classified correctly
for the values it held when it was classified, which later gained one value that
is prose.* `program` is genuinely a sport name for 23 of 27 values — and an
editorial phrase for 4 of them.

**Not fixed in this rollout.** It is a pre-existing defect in four shipped
locales, not a French one, and fixing it means widening `i18n_fields.mjs`
path-level rules and re-extracting topics that are already complete in four
languages. Raised to the owner separately; recorded here so it is not
re-discovered as "a French bug".

---

## 3. Verification — Phase 2

Seven checks, all passing as of 2026-07-30. They catch different classes, and
skipping one lets a class through.

| # | Check | Result |
|---|---|---|
| 1 | `check_translations.mjs --lang fr` | ✅ 9/9 topics 100%, no drift |
| 2 | `check_chrome_keys.mjs` | ✅ every chrome-claiming skip resolves |
| 3 | `check_hash_parity.mjs` | ✅ 8 cases, build == runtime |
| 4 | `check_figures.py --lang fr` | ✅ all 9 topics, figures intact |
| 5 | `check_fr_identifiers.mjs` | ✅ 5,897 strings, no drift (§1a) |
| 5b | `check_currency_shape.mjs` | ✅ all 6 locales consistent |
| 5c | `check_money_render_paths.mjs` | ✅ every money render site localizes |
| 6 | `check_runtime_resolution.mjs --lang fr` | ✅ 5,924 stamps recompute |
| 7 | **Browser print-out** | ✅ 2 rounds, 4 defects, all fixed (§4) |

Checks 5 and 6 are new in this rollout and are wired into `package.json` as
`npm run check:fr` and `npm run check:runtime`.

**`check_runtime_resolution.mjs` is the one the repo was missing.** Coverage
reporting 100% does not mean the page renders French: a shipped entry only
resolves if its FNV-1a stamp still equals the hash of the live English at that
field path, and if it does not, the runtime falls back to English **silently** —
no error, no coverage change. The script recomputes every stamp from live
`src/data/**`. Verified in both directions (corrupting one stamp exits 1) and
against `es`/`bn`/`ht`/`te`, which all pass unchanged.

**The `TRANSLATED` / `PROSE_TRANSLATED` flip is DONE**, and deliberately landed
*before* the print-out — `setLanguage()` rejects any code not in `TRANSLATED`,
so `fr` would be unselectable otherwise. The Bangla doc flags its own ordering
here as wrong; this rollout does not repeat it.

### Also confirmed in the BUILT output, not the source

- All nine `*.fr-*.js` overlay chunks emit as lazy per-locale bundles.
- `font-variant-ligatures: none` survives minification (§0b).
- **Zero `:root[lang='fr']` CSS rules exist**, which is correct — French needs
  none, and none should ever be added.

### Currency renders consistently — the PR #61 regression does not recur

`fr` is the first trailing-symbol locale added since `currencyLeads()` started
deriving placement from `Intl.formatToParts`. Simulated across the real
`format.ts` logic:

| | tile | 7-digit | abbreviated |
|---|---|---|---|
| en / ht | `$36,325` | `$3,683,971` | `$3.25M` |
| es | `36.325 US$` | `3.683.971 US$` | `3,25 M US$` |
| te | `$36,325` | `$36,83,971` | `$3.25M` |
| **fr** | **`36 325 $US`** | **`3 683 971 $US`** | **`3,25 M US$`** |

All three French forms trail, so the defect PR #61 fixed — `3.25 M US$` beside
`$36,500` on the same page — cannot recur here. **Confirm it on the rendered
page anyway**; this is a simulation, and the ht rollout's round 4 is precisely
the case where a headless pass missed a currency bug a real browser found.

### Print-out — load-bearing, not ceremony

All five Telugu defects were render-layer and invisible to every checker. Four
of the five lived in **table cells, chips and source lines** — the places where
a short label passes for a code.

Required, per CLAUDE.md:

- **A real browser**, not headless. A headless render passed Charlotte Latin
  clean; the 65-page browser print-out found the currency bug.
- **Two schools** — Providence Day **and** Charlotte Latin. Latin carries the
  most flag chips and the densest College Support hedges.
- **All `<details>` panels expanded.** A default page is ~17k characters; fully
  expanded it is ~152k, and the financial-aid sections holding the large figures
  are collapsed on load.
- **An unabbreviated 7-digit figure.** `$3.25M`-style tiles prove nothing about
  grouping — only figures like `$3,683,971` do. Expect `3 683 971 $US` with
  U+202F narrow-no-break-space separators.
- **Grep the rendered page** for English sentences in table cells, chips and
  source lines.
- **Grep the rendered page for the §1a freeze-list** — any French course name
  that drifted into translated prose. `check_fr_identifiers.mjs` covers the work
  files; only the rendered page proves what a parent actually sees.

French-specific expectations for round 1:

- Trailing-symbol consistency (`220 K $US` beside `3 683 971 $US`).
- No missing-glyph boxes in `officiel`, `difficile`, `efficace` — the ligature
  guard doing its job (§0b). French is the locale that would *find* this bug,
  not merely be protected by it.
- No drifted French course names (§1a).

### Review status — REVIEWED AND ACCEPTED, 2026-07-30

French speakers read the rendered pages and accepted the prose. French
therefore ships in the same position as Spanish, Bangla and Telugu — **not**
Kreyòl's. The formal-`vous` register call (§1), the hedge strengths, and the
decision to leave `Upper School` and `French III Honors` in English (§1a) all
stand as reviewed rather than merely asserted.

---

## 4. What the print-outs found — four defects, three of them cross-locale

Recorded in full because the pattern matters more than the individual bugs.

### Round 1 — Charlotte Latin, 65 pages

1. **`18 h 00` in a stat tile** *(fr only, translation error)*. Every other time
   on the page read 12-hour (`sortie 1:30`, `jusqu'à 6:00 p.m.`). One string out
   of 205, translated in the first topic before the clock convention was
   settled. These times are matched against the school's own bell schedule, so
   they keep `H:MM`.

2. **Prose money never localized** *(fr AND es)*. `RichText` rendered card prose
   verbatim while the sibling `price`/`fee`/`value` fields localized, so a
   coverage bar read `1 725 $US/SEM.` beside a callout reading `$1,725`.
   214 prose strings carry a `$`. Fixed in all three `RichText` copies.

3. **Hardcoded currency symbol** *(fr, te, ht, en)*. The abbreviated-magnitude
   branch hardcoded `US$` — correct for exactly one locale, Spanish, the one it
   was written against. **Same shape as the bug PR #61 fixed**, surviving in the
   *symbol* after being fixed in the *placement*.

### Round 2 — Providence Day, 80 pages

4. **Stat tiles bypassed `localizeMoneyText`** *(all non-en locales)*.
   `SchoolDetail` rendered `vm.values[slug]` raw, so `$3.68M` sat thirteen pages
   above a report reading `3 683 971 $US`. The most visible element on every
   school page — and `Compare.tsx` had been localizing the *same data*
   correctly all along.

### The lesson, and the two checkers it produced

**Three separate paths to the screen were bypassing `localizeMoneyText`.** Every
instance is invisible to English readers, which is why none surfaced until a
non-English print-out. Two new checks now close that gap:

- **`check_currency_shape.mjs`** (`npm run check:currency`) — asserts every
  money form in a locale carries the same symbol on the same side, and that
  English never moves.
- **`check_money_render_paths.mjs`** (`npm run check:money`) — greps JSX for
  figure-shaped expressions rendered without localizing, with a `REVIEWED` list
  for fields hand-verified never to hold one. **It immediately found 8 sites
  nobody had thought to check** (financial-aid figure captions and chart notes),
  which were localized defensively rather than marked safe on today's values.

Both were verified in *both* directions — they pass on the fixed code and fail
against the pre-fix code.

### Print-out — load-bearing, not ceremony

All five Telugu defects were render-layer and invisible to every checker. Four of
the five lived in **table cells, chips and source lines** — the places where a
short label passes for a code.

Required, per CLAUDE.md:

- **A real browser**, not headless. A headless render passed Charlotte Latin
  clean; the 65-page browser print-out found the currency bug.
- **Two schools** — Providence Day **and** Charlotte Latin. Latin carries the
  most flag chips and the densest College Support hedges.
- **All `<details>` panels expanded.** A default page is ~17k characters; fully
  expanded it is ~152k, and the financial-aid sections holding the large figures
  are collapsed on load.
- **An unabbreviated 7-digit figure.** `$3.25M`-style tiles prove nothing about
  grouping — only figures like `$3,683,971` do. For `fr` the expected render is
  `3 683 971 $US` with U+202F separators.
- **Grep the rendered page** for English sentences in table cells, chips and
  source lines.
- **Grep the rendered page for the §1a freeze-list** — any French course name
  that drifted into translated prose.

French-specific expectations for round 1:

- Trailing-symbol consistency (`220 K $US` beside `3 683 971 $US`) — `fr` is the
  first new test of the `currencyLeads()` fix.
- No missing-glyph boxes in `officiel`, `difficile`, `efficace` — the ligature
  guard doing its job (§0b).
- No drifted French course names (§1a).
