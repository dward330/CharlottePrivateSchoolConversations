# Farsi (فارسی) research-prose translation — rollout

**Status:** **IN PROGRESS — Phase 0 complete and merged (PR #66); 6 of 9 topics
translated.** `fa` is the **seventh** language, after English, Spanish, Bangla,
Haitian Creole, Telugu and French. Written and executed 2026-07-30.

**`fa` is NOT yet in `TRANSLATED` or `PROSE_TRANSLATED`** — the flip, the UI
chrome catalog, and the two browser print-outs all remain ahead. See the
progress table in START HERE for exactly what is done.

**`fa` is the first RTL locale to reach `PROSE_TRANSLATED`, and that is the
point of this rollout.** Every RTL page before it rendered LTR-pinned English.

> ## START HERE (fresh session)
>
> **Read [`prose-translation-bn.md`](./prose-translation-bn.md) for the method**
> (closest precedent on SCRIPT — non-Latin, declared font, front-loaded
> typography spike) and
> [`prose-translation-architecture.md`](./prose-translation-architecture.md) for
> the language-independent mechanism. Do not re-derive either.
>
> Read [`prose-translation-fr.md`](./prose-translation-fr.md) §4 for the
> print-out defects — three of French's four were NOT French-specific and are
> the class of bug to expect here too.
>
> **Branch:** `i18n/farsi-rollout`.
>
> ### The register rule INVERTS the French one — do not inherit it
>
> French's axis was T–V (`vous`), a grammatical fork forcing agreement
> everywhere. **Persian's axis is lexical**: formal written Persian vs
> colloquial Tehrani. See §1.
>
> ### Settled — do NOT re-raise
>
> | Decision | Value | Where |
> |---|---|---|
> | Direction | **RTL** — the first one | §0 |
> | Font | `Noto Naskh Arabic`, shared with `ar` | §0 |
> | Typography spike | **required and done** | §0b |
> | Digits | **Western** — `3,683,971`, never `۳٬۶۸۳٬۹۷۱` | §0a |
> | `FIGURE_SAFE_NUMBERS` | **`fa` IS on the list — on DIGITS alone** | §0a |
> | Grouping separator | moot — `numberLocale()` swaps to `en-US` | §0a |
> | Percent sign | ASCII `%`, unspaced — never `٪` | §0a |
> | Symbol placement | **leads** — `$3,683,971` | §0a |
> | Currency | USD always; **formatting only, never conversion** | §0a |
> | Register | **formal written Persian** | §1 |
> | Identifiers | Latin/English — institutions, AP/Honors, platforms | §1b |
> | Persian course names | **none exist** — fa does NOT inherit fr's §1a trap | §1c |
>
> ### Progress — 6 of 9 topics translated
>
> | Topic | Strings | State |
> |---|---|---|
> | metric-values | 126 | ✅ 100% |
> | student-clubs | 517 | ✅ 100% |
> | sports | 656 | ✅ 100% |
> | after-school | 654 | ✅ 100% |
> | the-arts | 599 | ✅ 100% |
> | college-support | 926 | ✅ 100% |
> | course-offerings | 1,848 | not started |
> | financial-aid-report | 572 | not started |
> | financial-aid-tuition (content) | 27 | not started |
> | **shipped entries** | **3,478** | |
>
> UI chrome (`src/locales/fa.json`) is **not** started either — `fa` is not yet
> in `TRANSLATED` or `PROSE_TRANSLATED`, so the flip and the print-outs are
> still ahead. A partial state must not claim the prose is translated.
>
> **Half-filled work files are reverted, not committed.** A `t` field holding
> English reports as translated coverage while rendering English — the exact
> failure `check_runtime_resolution.mjs` exists to catch. Topics are either
> 100% or "not started".
>
> ### The loop, per topic
>
> ```
> node scripts/i18n_extract.mjs --topic <t> --lang fa
> # translate the `t` fields in src/data/overlays/work/<topic>.fa.json
> node scripts/check_fa_script.mjs                        # digits + ZWNJ
> python3 scripts/check_figures.py --topic <t> --lang fa  # AFTER EVERY TOPIC
> node scripts/i18n_build_overlay.mjs --topic <t> --lang fa
> node scripts/check_translations.mjs --lang fa
> ```
>
> Once a work file holds translations, `i18n_extract.mjs` refuses to overwrite
> it — that guard is deliberate, do not `--force` past it.
>
> ### KEY TRANSLATION MAPS BY ENGLISH TEXT, NEVER BY INDEX
>
> **A new failure mode, found in `after-school` and recorded by no prior
> rollout doc.** An index-keyed map (`{0: '…', 1: '…'}`) drifted by **+1**
> across several ranges mid-file, so ~94 strings received a fluent Persian
> translation belonging to their *neighbour*.
>
> What makes this dangerous is what it survives:
>
> - `check_translations.mjs` reports **100% coverage** — every field is filled.
> - `check_runtime_resolution.mjs` **passes** — every stamp still matches.
> - The page renders **fluent Persian**, just describing the wrong thing.
> - A reader who does not read English cannot detect it at all.
>
> Only `check_figures.py` caught it, and only because a figure appeared in one
> string and not its neighbour. **A drifted map with no figures in range would
> ship silently.**
>
> Repaired by re-anchoring each translation onto the English whose figure-set it
> shares (0 misaligned after repair, asserted before building the overlay).
> Every map since is keyed by the English string itself, which makes the whole
> class structurally impossible.

**Mechanism:** see [`prose-translation-architecture.md`](./prose-translation-architecture.md).

---

## 0. Phase 0 — COMPLETE, committed. Do not redo.

Verified 2026-07-30 by running `Intl` in this repo's Node and by measuring a
real Chromium render.

1. **`fa` is already in `SUPPORTED`** with `rtl: true` and
   `font: 'Noto Naskh Arabic'` (shared with Arabic). Confirmed, not re-derived.
2. **Direction is `rtl`** — `new Intl.Locale('fa').getTextInfo().direction`.
3. **The `ffi` ligature guard in `src/index.css` is Latin-only and irrelevant
   here — and it STAYS.** Arabic script is obligatorily cursive and Naskh has
   its own shaping behaviour; that is a separate question from
   `font-variant-ligatures`, and the guard still protects the Latin runs
   (`AP`, `NCISAA`, school names) that appear on every Farsi page.

### 0a. Figures — `fa` JOINS `FIGURE_SAFE_NUMBERS`, on digits alone

Measured, 2026-07-30:

| Locale | `3683971` | `$3,683,971` | Symbol |
|---|---|---|---|
| en-US | `3,683,971` | `$3,683,971` | leads |
| es | `3.683.971` | `3.683.971 US$` | trails |
| ht | `3,683,971` | `$3,683,971` | leads |
| bn | `৩৬,৮৩,৯৭১` | `৩৬,৮৩,৯৭১ US$` | trails |
| te | `36,83,971` | `$36,83,971` | leads |
| fr | `3 683 971` | `3 683 971 $US` | trails |
| **fa** | **`۳٬۶۸۳٬۹۷۱`** | **`\u200E$۳٬۶۸۳٬۹۷۱`** | **leads** |
| fa-u-nu-latn | `3,683,971` | `\u200E$ 3,683,971` | leads |

**This was a genuine question, not a lookup, because the two halves point
opposite ways:**

- **GROUPING says leave it out.** `fa` groups **3-3-3**, exactly like English.
  The boundaries never move — unlike `bn`/`te` lakh–crore. Its separator differs
  (U+066C ARABIC THOUSANDS SEPARATOR, not a comma), but *a separator swap at
  identical boundaries* is the Spanish and French case, and both are
  deliberately **excluded** from the list.
- **DIGITS say put it in, and they win.** `Intl.NumberFormat('fa')` emits
  Eastern Arabic numerals. **Not one glyph is shared** with the figure printed
  in the school's Report on Philanthropy. That fails the list's own criterion —
  "would make a figure unrecognisable against its English source" — on digits
  alone, whatever the grouping does.

**Decision: `fa` is on the list.** It is precedent for **digits**, never for
separators: `numberLocale()` swaps the whole locale to `en-US`, so U+066C is
never rendered and the separator question never arises. A future locale that
differs *only* in its separator should follow `es`/`fr` and stay off.

`fa-u-nu-latn` would give Western digits while keeping the locale, but it also
inserts a space between symbol and amount (`$ 36,325`). Borrowing `en-US`
wholesale, as every other entry does, avoids that and keeps one mechanism.

**One knock-on, for free:** `check_bn_numerals.mjs` asserts the strict 3-3-3
shape for every locale *inside* `FIGURE_SAFE_NUMBERS`, so it now covers `fa`
without modification — and correctly, since `fa` genuinely is 3-3-3.

**Percent signs stay ASCII `%` and unspaced.** Persian has its own `٪`
(U+066A). It is not used here, for the same reason `fr` does not get `80 %`:
these percentages are citations a parent matches against the school's own page,
and `check_figures.py` reads a swapped sign as a dropped figure. Caught on the
first topic — `check_fa_script.mjs` now enforces it alongside the digits rule.

**Formatting only, never conversion.** Currency stays USD, amounts are never
re-typed. No rial, no toman, no exchange rate, no dual display.

### 0a2. What RTL forces on figures that no LTR locale exercised

**This is the genuinely new finding of the rollout, and it is three defects.**

Measured in Chromium against real corpus sentences by sorting each token's
characters by rendered x-position — a DOM text dump cannot see any of this,
because the *logical* string is correct and only the *visual* order is wrong:

| Logical | Rendered | Sites |
|---|---|---|
| `$3,683,971` | symbol on the **RIGHT** — `3,683,971$` | 15/15 money tokens |
| `2025–26` | **`26–2025`** — a factually WRONG year range | 133 corpus strings |
| `82%` | `%82` | 59 corpus strings |

All three for the same reason: `$`, en-dash and `%` are bidi-**neutral**, so a
digit–neutral–digit cluster is laid out by *paragraph* direction rather than as
one left-to-right run.

**Latin identifiers were FINE — 27/27 intact.** `Upper School`,
`AP Calculus BC`, `NCISAA 4A`, `Charlotte Latin` all render correctly, because
strong-L letters carry their own direction. So the *directional* analogue of
French's identifier trap that this rollout was told to watch for **does not
bite**; neutrality is the whole problem, not Latin-in-RTL as such.

**An LRM is NOT sufficient.** `Intl.NumberFormat('fa')` does prepend a U+200E
LRM, and it survives `money()`. Tested side by side in Chromium: the LRM form
**still rendered the symbol on the wrong side**; only `LRI…PDI` and `<bdi>`
fixed it. An LRM influences a run's resolved level; it does not *isolate*.

**Fix: isolate CHARACTERS (U+2066 LRI … U+2069 PDI) in `src/lib/format.ts`**,
not markup and not CSS — these strings render as plain text in stat tiles,
chips, table cells and `RichText` segments, several of which would strip an
element. Applied in `money()`, in the abbreviated branch, and via
`isolateNeutralFigures()` for the year-range and percent shapes that
`localizeMoneyText()` never rewrites. **No-op outside RTL**, so all six shipped
locales are byte-identical — asserted per-locale by `npm run check:bidi`.

### 0a3. `currencyLeads()` was broken by an invisible character

Separate defect, found in the same spike. `currencyLeads()` tested
`formatToParts(1)[0]?.type === 'currency'` — but for `fa` slot 0 holds the
invisible **LRM literal**, so it returned `false` and Farsi took the *trailing*
branch: `3.25 M $` beside `$3,683,971` on the same page.

**That is the PR #61 defect exactly, resurrected by a character you cannot
see** — and the third time this shape has shipped (placement, then symbol, now
the placement *test*). Now compares the **positions** of the `currency` and
`integer` parts, which no number of bidi marks can fool.

`check_currency_shape.mjs` carried a copy of the same buggy test and **would
have missed it**. Fixed there too, and verified in both directions: it fails
against the pre-fix logic and passes against the fix.

### 0b. The typography spike — three findings

`farsi-spike.html` (gitignored, like its Bangla and Telugu predecessors) renders
hostile strings through the app's real stylesheet with `data-prose="fa"` set
deliberately, so the LTR pin does **not** apply. That is the post-flip state
nobody had seen.

1. **Letterspacing — same fix as bn/te, different mechanism.** The earlier docs
   predicted Bangla-style breakage. That is **not** what happens: at 0.14em the
   cursive joins do **not** break — Naskh keeps its connecting strokes. What
   tracking does is stretch the connectors and inflate the run ~7% (124px →
   133px measured), until the gap *within* a word approaches the gap *between*
   words. In a script with no capitals, that word boundary is the main parsing
   cue. Fixed: tracking → 0, joining the shared `bn`/`te` selector list (50
   selectors widened).
2. **Line-height.** Naskh's deep descenders and sub-baseline dots crowd the next
   line at 1.05. 1.45 clears them on headings; 1.6 was more than it needed.
   Body leading 1.6 — between Bangla's 1.65 and the Latin default.
3. **Stat tiles were FINE.** 10 tiles measured, zero label overflow. Recorded so
   nobody later "fixes" a problem that never existed — the third rollout in a
   row to confirm this.

Also confirmed in the render: **Noto Naskh Arabic loads** (173px vs 240px
monospace fallback — distinct, no tofu), and **ZWNJ is honoured** by the shipped
font (307px vs 276px for the same string).

---

## 1. The register decision — formal written Persian

**Formal written Persian (فارسی معیار نوشتاری).**

The corpus is parent-facing research about institutions, in the register of an
admissions handbook. **Persian's register axis is not French's.** French's was
T–V, a grammatical fork. Persian's is lexical and stylistic: **formal written
Persian vs colloquial Tehrani**.

Like French, the corpus is overwhelmingly **third-person declarative** — "the
school reports", "no methodology is published" — so direct address is rare and
the register governs vocabulary far more than morphology.

**What it forces:**

- **Full verb forms, never colloquial contractions** — `می‌شود` not `می‌شه`,
  `است` not the clitic `-ه`. Colloquial Tehrani in a research document reads as
  unserious.
- **Arabic-derived vocabulary: moderate, and the test is DOMAIN.** Academic and
  administrative Persian genuinely uses it (`تحصیلات`, `دانش‌آموز`, `اطلاعات`),
  and in that domain it reads as **educated, not stilted**. What reads as
  stilted is reaching for rare Arabic forms where a common Persian word exists —
  or the inverse, militant Persian purism. Standard educated usage, the register
  of an Iranian school prospectus.
- **The hedges still win over register.** "documented minimum", "the school's
  claim", "an absence of evidence rather than a stated policy" are the point of
  this corpus. A hedge softened for register's sake turns a caveat into a claim.

### 1a. ZWNJ is a correctness issue, not a style one

Persian requires U+200C ZERO WIDTH NON-JOINER in very common constructions: the
continuous prefix (`می‌شود`), plurals of compounds (`برنامه‌ها`), and compound
nouns (`دانش‌آموز`). Without it the cursive letters wrongly join and the word is
**misspelled**, not merely informal.

It is zero-width, so a dropped ZWNJ is invisible in a diff, in review, and to
every other checker in this repo. `scripts/check_fa_script.mjs`
(`npm run check:fa`) guards the five highest-frequency shapes. Validated in both
directions: zero false positives on correct Persian, all five broken forms
caught.

### 1b. What stays Latin / English — unchanged from bn, ht, te and fr

**Searchable identifiers** a parent must type into a school's website or say
aloud on a tour:

- **Institution and division names:** `Charlotte Latin School`, `Providence Day`,
  `Upper School`, `Middle School`, `Lower School`, `NCISAA`.
- **Course codes and levels:** `AP`, `IB`, `Honors`, `Advanced Placement`.
- **Platform and program names:** `Clarity`, `Scoir`, `Naviance`, `FACTS`,
  `SSAT`, `Extended Day`, `Model United Nations`, `National Merit`.
- **Award, festival and venue names**, athlete and staff names.

**Translated:** generic descriptors, analysis, and **all hedges**.
**Untouched:** every figure, scoreline, GPA, clock time and date.
**Verbatim quoted source strings stay English**, inside their original quotation
marks — markdown rate tables and Wayback quotes are citations, not prose.

### 1c. `fa` does NOT inherit French's identifier trap

The corpus contains **no Persian-language course names**, so there is no
`French III Honors` analogue — nothing that reads as translatable prose in
Farsi while being a searchable course code.

The *directional* analogue this rollout was told to watch for — a Latin
identifier inside an RTL sentence displaying scrambled — **was measured and does
not occur** (§0a2, 27/27 intact). It is still checked on the rendered page,
because a measurement is not a print-out.

---

## 2. Pre-existing cross-locale leak — NOT Farsi-specific

`node scripts/i18n_audit_skips.mjs --suspect` flags the same six fields it
flagged during the French rollout, including the **seven English strings that
ship untranslated in all five non-English locales** recorded in CLAUDE.md
(`program`, `value`, `year` in five files).

**Confirmed unchanged, and not fixed in this rollout** — it is a pre-existing
defect in five shipped locales, and fixing it means widening `i18n_fields.mjs`
path rules and re-extracting topics already complete in five languages. `fa`
will ship these English too, exactly as `es`/`bn`/`ht`/`te`/`fr` do. Recorded so
it is not re-discovered as "a Farsi bug".

---

## 2a. What the checkers caught DURING translation

Three defects in four topics, none of which a reader could have detected. Worth
recording because each one justifies a check that a rushed rollout would skip:

| # | Caught by | Defect |
|---|---|---|
| 1 | `check_fa_script.mjs` | 15 strings drifted into **Persian digits** (`۳ محور اصلی`) while every figure beside them stayed Western — the exact inconsistency §0a exists to prevent, and the same slip the Bangla spike made twice. |
| 2 | `check_figures.py` (sports) | `$30.5M` and `$10M` **written out as Persian words** instead of kept literal. Figures are never re-typed. Found *after* the topic otherwise read complete. |
| 3 | `check_figures.py` (after-school) | The **+1 index drift** described in START HERE — ~94 translations attached to the wrong English, at 100% reported coverage. |

Defects 2 and 3 both surfaced in the per-topic figure sweep, which is the whole
argument for running it after **every** topic rather than once at the end. The
Bangla doc makes the same point from its own experience; this rollout is the
second confirmation.

---

## 3. Verification — Phase 2

| # | Check | Command |
|---|---|---|
| 1 | coverage + drift | `node scripts/check_translations.mjs --lang fa` |
| 2 | chrome keys resolve | `node scripts/check_chrome_keys.mjs` |
| 3 | hash parity | `npm run check:hashes` |
| 4 | figures round-trip | `python3 scripts/check_figures.py --lang fa` |
| 5 | **digits + ZWNJ** | `npm run check:fa` — **new** |
| 5b | **RTL bidi isolates** | `npm run check:bidi` — **new** |
| 5c | currency shape | `npm run check:currency` |
| 5d | money render paths | `npm run check:money` |
| 6 | runtime resolution | `npm run check:runtime` (needs `--lang fa`) |
| 7 | **browser print-out** | two schools, real browser |

Checks 5 and 5b are new in this rollout. Both were verified in **both**
directions — they fail against the pre-fix code and pass against the fix.

### The print-out — load-bearing, not ceremony

Every defect in the last four rollouts was render-layer and invisible to every
checker; three of French's four were not even French-specific. Required, per
CLAUDE.md:

- **A real browser**, not headless.
- **Two schools** — Charlotte Latin **and** Providence Day.
- **All `<details>` panels expanded** (~17k chars → ~152k).
- **An unabbreviated 7-digit figure** — `$3,683,971`, not `$3.25M`.
- **Grep the rendered page** for English sentences in table cells, chips and
  source lines.

Farsi-specific expectations:

- **Every `$` on the LEFT of its digits**, and no `26–2025` year ranges. This is
  the fix from §0a2 proven on screen rather than in a measurement harness.
- **Leading symbol throughout** — `$3.25M` beside `$3,683,971`, never
  `3.25 M $` (§0a3).
- **Western digits everywhere** — no `۳٬۶۸۳٬۹۷۱`.
- No broken cursive joins or scattered word boundaries in caps labels (§0b).
- Latin identifiers intact inside RTL sentences (§1c).
