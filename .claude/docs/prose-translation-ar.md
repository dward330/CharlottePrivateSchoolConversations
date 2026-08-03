# Arabic (العربية) research-prose translation — rollout

**Status:** **COMPLETE — data + code done, native review OPEN.** All nine prose
topics are 100% translated, the 385-key chrome catalog is built and validated,
and `ar` is now in both `TRANSLATED` and `PROSE_TRANSLATED`. Every automated
check is green (translations, figures, sep-drift, bidi, currency, money, runtime
resolution, work-sources), `tsc -b && vite build` succeeds, lint is clean, and
the cross-locale leak diff is clean (all 133 flagged items are identifier/
proper-noun retentions consistent with the reviewed locales — §5). The
two-school browser print-out was done (Providence Day 63pp, Charlotte Latin
61pp, panels force-expanded) and the **live render is clean** — it also exposed
a PDF-text-layer shaping artifact that is NOT a shipping defect (§6). Written and
executed 2026-08-03. **Only the native-speaker review (§4) remains.**

Arabic is the **tenth** language, after English, Spanish, French, Haitian
Creole, Farsi, Bangla, Hindi, Telugu and Italian. It is the **second RTL
locale** and the **second to use `Noto Naskh Arabic`** — Farsi is the only prior
RTL rollout, so `prose-translation-fa.md` is the primary template.

> ## START HERE (fresh session)
>
> **Read [`prose-translation-fa.md`](./prose-translation-fa.md) for the METHOD**
> — it is the only other RTL locale, shares this exact font, and is where all the
> bidi/isolate render-layer work was done. Read
> [`prose-translation-architecture.md`](./prose-translation-architecture.md) for
> the language-independent mechanism. Do not re-derive either.
>
> **`ar` and `fa` DIVERGE — do not assume all RTL locales are alike.** This doc
> exists partly to be that second RTL example. The single sharpest divergence is
> the figure decision (§0a): **`fa` IS in `FIGURE_SAFE_NUMBERS`, `ar` is NOT.**
> Read §0a before citing either as precedent.
>
> **Branch:** `i18n/arabic-rollout`.
>
> ### Settled — do NOT re-raise
>
> | Decision | Value | Where |
> |---|---|---|
> | Direction | **RTL** — the second one (fa was first) | §0 |
> | Font | `Noto Naskh Arabic`, shared with `fa` | §0 |
> | Typography spike | **not needed** — joins fa's proven selectors; browser-verified | §0b |
> | Digits | **Western** — `3,683,971` (Intl('ar') already emits these) | §0a |
> | `FIGURE_SAFE_NUMBERS` | **`ar` is NOT on the list** — the fa precedent does NOT carry | §0a |
> | Grouping | 3-3-3, boundaries never move (unlike bn/hi lakh-crore) | §0a |
> | Symbol placement | **trails** — `3,683,971 US$`, with an RLM prefix | §0a |
> | Currency | USD always; **formatting only, never conversion** | §0a |
> | Percent sign | ASCII `%`, unspaced — Intl's `٪`/LRM form never runs (data is literal) | §0a |
> | Register | **Modern Standard Arabic** (فصحى معاصرة), school-circular register | §1 |
> | Identifiers | Latin/English — institutions, AP/GPA/NIL, divisions, platforms | §1b |
> | Arabic course names | **none exist** — ar does NOT inherit fr's identifier trap | §1c |
> | Chrome plurals | **6 CLDR forms** (zero/one/two/few/many/other) — see §2 | §2 |
> | 7-string open defect | **carried forward**, as every prior locale did | §3 |
>
> ### Progress
>
> | Topic | Strings | State |
> |---|---|---|
> | metric-values | 160 | ✅ 100% |
> | student-clubs | 517 | ✅ 100% |
> | sports | 656 | ✅ 100% |
> | after-school | 654 | ✅ 100% |
> | the-arts | 599 | ✅ 100% |
> | college-support | 928 | ✅ 100% |
> | course-offerings | 1,848 | ✅ 100% |
> | financial-aid-report | 572 | ✅ 100% (3 = the 7-string carried defect) |
> | financial-aid-tuition (content) | 27 | ✅ 100% |
> | UI chrome `src/locales/ar.json` | 385 keys | ✅ built + validated |
>
> **5,961 English source strings across 9 overlay files; every stamp
> recomputes from live English (`check:runtime --lang ar`).**
>
> ### The loop, per topic
>
> ```
> node scripts/i18n_extract.mjs --topic <t> --lang ar     # writes blank work file
> # translate the `t` fields in src/data/overlays/work/<t>.ar.json
> node scripts/check_sep_drift.mjs --lang ar --topic <t>   # separator drift
> python3 scripts/check_figures.py --topic <t> --lang ar   # figures round-trip
> node scripts/i18n_build_overlay.mjs --topic <t> --lang ar
> node scripts/check_translations.mjs --lang ar            # coverage + drift
> ```
>
> Run BOTH figure checks after every topic — they catch different things (the
> hi doc §4 is the canonical writeup).
>
> ### KEY TRANSLATION MAPS BY ENGLISH TEXT, NEVER BY INDEX
>
> Inherited hard rule from the fa rollout: an index-keyed map drifted +1 mid-file
> and shipped ~94 strings of fluent prose on the wrong original, at 100%
> coverage, past every checker except `check_figures.py`. Key every map by the
> English string itself.

**Mechanism:** see [`prose-translation-architecture.md`](./prose-translation-architecture.md).

---

## 0. Phase 0 — COMPLETE, verified 2026-08-03. Do not redo.

`ar` was already in `SUPPORTED` with `rtl: true` and
`font: 'Noto Naskh Arabic'` (shared with `fa`) — this rollout ships it, it does
not add the entry.

### 0a. Figures — `ar` is NOT in `FIGURE_SAFE_NUMBERS`. This INVERTS fa.

Measured in this repo's Node, 2026-08-03:

| Locale | `3683971` | `$3,250,000` (currency) | Symbol |
|---|---|---|---|
| en-US | `3,683,971` | `$3,250,000` | leads |
| **fa** | **`۳٬۶۸۳٬۹۷۱`** (Eastern-Arabic) | `\u200E$۳٬۲۵۰٬۰۰۰` | leads |
| **ar** | **`3,683,971`** (WESTERN) | `\u200F3,250,000 US$` | **trails**, RLM prefix |

**Why the fa precedent does NOT carry.** `fa` is on the list for **digits
alone**: `Intl.NumberFormat('fa')` emits Eastern-Arabic numerals that share no
glyph with the figure printed in the school's document, so a parent cannot match
them. **`ar` has neither problem.** Modern Standard Arabic as `Intl` renders it
uses **Western digits and 3-3-3 grouping** — byte-identical to English on both
axes. Its separator and symbol placement differ (symbol trails, RLM prefix), but
*a separator/placement difference at identical digit boundaries* is exactly the
**es / fr / it** case, all three deliberately EXCLUDED from the list. So `ar`
follows es/fr/it, not fa.

`FIGURE_SAFE_NUMBERS` stays `['bn', 'fa']`. Owner default, stated at kickoff and
adopted: no `ar` entry.

**Consequence worth stating plainly.** `ar` is the **first RTL locale NOT on the
list**, so it is the first to render its own digits through `numberLocale()`
unchanged — every prior RTL locale (only `fa`) borrowed `en-US` wholesale. Here
"unchanged" *equals* `en-US` anyway, because `ar`'s digits already ARE Western
3-3-3. The distinction still matters for the next RTL locale, which may not be.

### 0a2. The trailing-symbol-in-RTL combination — NEW, and it renders correctly

`ar` is the **first locale that both TRAILS its currency symbol (`US$`) AND is
RTL.** `fa` leads its symbol; every trailing locale before `ar` (es/bn/fr/it) is
LTR. That combination had never rendered. De-risked before any translation, by
measuring rendered glyph x-positions in Chromium (`.spike-tmp/ar_bidi_probe.mjs`):

| Logical (what format.ts emits) | Visual L→R in RTL prose |
|---|---|
| `\u2066\u200F3,683,971 US$\u2069` | `3,683,971US$` — digits then symbol, **symbol does not jump** |
| `\u206636,325 US$\u2069` | `36,325US$` |
| `\u20662025–26\u2069` | `2025–26` — **not** `26–2025` |
| `\u206682%\u2069` | `82%` — **not** `%82` |

The `bidiIsolate()` / `isolateNeutralFigures()` machinery in `src/lib/format.ts`
carries to Arabic unchanged. The RLM (`U+200F`) that Intl prepends inside the
isolate is harmless (same posture as fa's LRM). **Still re-verify on the
print-out** — a measurement is not a print-out.

### 0a3. `currencyLeads()` returns FALSE for `ar`, correctly

`Intl.NumberFormat('ar', {style:'currency'})` emits parts as
`[literal RLM, integer, …, literal space, currency "US$"]`. The position-based
`currencyLeads()` (PR #61 / fa fix — compares indices, not slot 0) returns
`false`, so `ar` takes the trailing branch and renders `3,683,971 US$`. Verified
by `check_currency_shape.mjs` (ar added to its LOCALES): full and abbreviated
figures both trail `US$` consistently.

### 0a4. Percent — the Intl LRM-wrapped form never runs

`Intl.NumberFormat('ar', {style:'percent'})` emits `90\u200E%\u200E` (LRM-
wrapped). **But the corpus bakes percentages as literal `90%` strings** (556×
`50%` etc.), and no code path formats a percent through Intl (`grep` for
`style:'percent'` in `src/` → none). So the LRM marks never appear; percentages
travel as literal text through `localizeMoneyText()` and are wrapped in
`LRI…PDI` by `isolateNeutralFigures()` in RTL, rendering `82%` not `%82`.
Percent stays ASCII `%`, unspaced — the standing rule, same as every locale.

### 0a5. `check_rtl_bidi.mjs` extended to `ar`, and `ar` kept OFF its FIGURE_SAFE

The checker hardcoded `FIGURE_SAFE = ['bn','fa']` and built a formatter for
`'fa'`. Added a parallel `ar` section (same NEUTRAL_CASES / SAFE_CASES) plus an
assertion that no Eastern-Arabic digit leaks into an `ar` figure. `ar` is
deliberately absent from the checker's `FIGURE_SAFE`, mirroring
`figureLocale.ts`.

### 0b. Typography — no spike needed; joins fa's selectors; browser-verified

`ar` shares `fa`'s Naskh face and Arabic script exactly, so the caps-tracking
kill and the line-height fix are properties of the **script**, not the language —
`fa`'s spike already measured them for Arabic script. `ar` was added to all 50
shared `:root:is([lang='bn'], [lang='te'], [lang='fa'], [lang='hi'], [lang='ar'])`
selectors and given its own `:root[lang='ar'] { line-height: 1.6 }` block
(identical to `fa`).

**Scoping verified IN A BROWSER across all 11 locales** (not by reading the CSS —
the stronger check the hi rollout introduced). Probed computed
`letter-spacing`/`line-height` on 12 tracked class names:

- Every Latin locale (`es`/`fr`/`ht`/`it`) byte-identical to `en` — **zero leaks**.
- `bn`/`te`/`fa`/`hi`/`ar` all `letter-spacing: normal` on caps labels.
- `ar` root line-height = 25.6px, **byte-identical to `fa`** on every probed
  property.

---

## 1. Register — Modern Standard Arabic (الفصحى المعاصرة)

The corpus is parent-facing research about institutions, in the register of an
**admissions handbook or a newspaper education page**. Arabic's register axis is
**MSA vs dialect, and how formal within MSA.**

Target: **contemporary Modern Standard Arabic** (فصحى معاصرة / لغة الصحافة) — the
Arabic a school circular or an education-section article is written in. Explicitly
NOT:

- **Classical / Qur'anic Arabic** — archaic vocabulary and syntax read as
  religious or literary, wrong for a tuition comparison.
- **Any regional dialect** (Egyptian, Levantine, Gulf, Maghrebi) — a document
  families across the Arabic-speaking world use to compare figures stays in the
  shared written standard, not one country's spoken variety.

**What it forces:**

- **Full MSA morphology**, no dialectal contractions or spellings.
- **Domain vocabulary that MSA genuinely uses**: `مدرسة`, `طالب`, `رسوم`,
  `منحة`, `مرحلة`, `فصل دراسي` — educated administrative Arabic, not calqued
  coinages and not over-classicised synonyms.
- **The hedges survive intact and never soften into claims.** "school-reported",
  "no methodology published", "an absence of evidence rather than a stated
  policy" are the point of this corpus. This is the highest-risk register call
  and the one no automated check can reach — the reason `ar` wants a native
  review (§4).

### 1b. What stays Latin / English — unchanged from every prior locale

**Searchable identifiers** a parent types into a school's site or says on a tour:
institution and division names (`Charlotte Latin School`, `Providence Day`,
`Upper School`, `Middle School`, `Lower School`, `NCISAA`); course codes and
levels (`AP`, `IB`, `Honors`, `GPA`); platforms and programs (`Clarity`,
`Scoir`, `Naviance`, `FACTS`, `National Merit`, `Power 4`, `NIL`, `D1`); award,
festival, venue, athlete and staff names. **Every figure, scoreline, GPA, clock
time and date is untouched.** Verbatim quoted source strings stay English inside
their quotation marks — rate tables and Wayback quotes are citations, not prose.

### 1c. `ar` does NOT inherit French's identifier trap

The corpus contains **no Arabic-language course, club or program names**, so
there is no `French III Honors` analogue — nothing that reads as translatable
prose in Arabic while being a searchable course code. Grepped `src/data/**` and
`src/content/**` for Arabic-language program identifiers: none. Same finding as
Italian and Hindi; **no `check:ar` identifier guard is needed.** (The
*directional* analogue — a Latin identifier scrambling inside RTL — was measured
clean for fa, 27/27 intact, and re-checked here in §0a2.)

---

## 2. Chrome plurals — Arabic has SIX CLDR categories, English has two

This is the one genuinely structural difference `ar` has from every prior
locale. `Intl.PluralRules('ar')` resolves **zero / one / two / few / many /
other**; English resolves only **one / other**. i18next 26 selects the plural
suffix via `Intl.PluralRules` for the target locale, so a naive copy of
`en.json` (which carries only `_one`/`_other`) makes counts of 0, 2, 3–10 and
11–99 **fall back to English** — silently, because the Arabic `_other` never
matches those categories.

**Fix: `src/locales/ar.json` supplies all six forms** for every pluralized key.
13 pluralized pairs in `en.json` → 6 forms each in `ar.json`, so `ar.json` has
**385 leaf keys vs en.json's 333** (+52 = 13 × 4 extra forms). Verified in
i18next: every count 0–120 across all 13 keys resolves to Arabic, **zero English
leaks**. No checker flags the extra keys — none asserts chrome key-set parity
across locales (checked).

The 13 keys: `home.stats.{schools,topics,documents}`, `compare.{sub,coverage}`,
`school.{divisions,subAreas,subDocs,topics}`, `sports.stateTitleMatrix`,
`afterSchool.{colDays,daysUntilPickup}`, `courses.countCourses`.

**Register note for the reviewer:** because the digit is shown numerically, the
dual (`_two`) and few (`_few`) forms can read slightly redundantly beside the
numeral (`2 موسمين`). This is the standard i18next surface across the site and is
acceptable in administrative Arabic; flagged in `overlays/NOTES.md` in case the
reviewer prefers a numeral-agnostic phrasing.

---

## 3. The 7-string known open defect — CARRIED FORWARD

The strings in `program`/`value`/`year` documented in CLAUDE.md ship as English
in every non-English locale; `ar` inherits the same 7. Fixing means widening
`i18n_fields.mjs` path rules and re-extracting topics already complete in eight
languages. Every prior locale carried it; carrying it keeps `ar` consistent.

---

## 4. Review — OPEN

`ar` has **no native-speaker review yet**, so it ships in Kreyòl's/Hindi's
unreviewed position, not the reviewed position of Spanish, Bangla, Telugu, French
and Farsi. The one failure mode no automated check reaches is §1: whether the
register drifts toward Classical Arabic or toward a regional dialect, and whether
any hedge softened into a claim. Soft spots are recorded per topic in
`src/data/overlays/NOTES.md` for that pass.

To point a reviewer at a page: `?lang=ar` on any URL once the flip lands, e.g.
`https://charlotteschoolinsights.com/?lang=ar#/school/providence-day`.

---

## 5. Cross-locale leak diff — clean (all 133 items are legitimate)

`npm run i18n:leaks -- --lang ar` reports **133 strings `ar` kept English that
≥2 reference locales translated.** Every one was reviewed; **none is a genuine
prose leak.** By field type:

| Field class | ~count | Example | Verdict |
|---|---|---|---|
| `courses.title` | ~70 | `Global Studies: Africa`, `French & Spanish` | course names — identifier, English (matches it/fr) |
| `courses.tag` | ~35 | `Gr 5–8`, `Advanced`, `Audition`, `Gateway` | grade band / level tag — identifier |
| `departments.name` | ~25 | `Arts`, `English`, `Bible`, `Fine Arts` | department name — identifier |
| `honors.label`, `coaching.stats.label` | ~14 | `McDonald's All-American`, `PTR national Coach of the Year` | named award — proper noun |
| `clusters.rows.name` | 2 | `Esports`, `Robotics` | activity-cluster name — identifier |
| `counseling.timeline.items`, `affinity.groups.detail` | 3 | `Freshman & Sophomore Planning Night`, `Super Women's Affinity Group` | event / group name — proper noun |
| `metric-values [6].label` | 1 | `"Ivy Plus"` | quoted proper term |

**The tell:** the diff fires wherever the *unreviewed* bn/fa/ht translated an
identifier that the *reviewed* es/it/te/fr left English. `ar` deliberately
follows the reviewed majority. Verified there is **no leak in any prose-typed
field** — `grep` of the diff for `.summary`/`.note`/`.detail`/`.text`/`.intro`/
`.blurb`/`.body` returns nothing. So the identifier policy `ar` applied (§1b)
holds across the whole corpus, and the 133 items are the expected shape, not a
gap. This mirrors the it/fr result exactly.

---

## 6. Print-out — the live render is clean; a PDF-text-layer artifact is NOT a defect

A two-school browser print-out was run (Providence Day 63pp, Charlotte Latin
61pp, all `<details>` force-expanded). It surfaced something that **reads as a
bug but is not one**, and is worth recording so it is not re-chased next time.

**Symptom.** In the exported **PDF's text layer**, Arabic *body prose* appears
garbled — letters that should join are split, dots/diacritics detach, syllables
scatter mid-line (e.g. `تنشر` came out as `.ٮكسٮ`-like fragments). The heading
layer and the on-page **image** render looked fine, so it read as a
prose-only render failure — exactly the "cards printed collapsed / mangled RTL
band" class the fa rollout warns about.

**It is not a render bug.** Verified three independent ways against the *live*
page (`?lang=ar`), not the PDF:

1. **DOM text is correct, joined, logical-order Unicode.** Sampled paragraph:
   `تنشر Charlotte Latin مجالات مواد Lower School، لا حصصًا مُسمّاة …`.
   Codepoints of the first word are `62a 646 634 631` = ت ن ش ر, standard
   letters in correct order — no presentation-form mangling in the data.
2. **Computed style is right:** `font-family: "Noto Naskh Arabic"`,
   `direction: rtl`, `unicode-bidi: isolate`.
3. **Rendered pixels are perfect.** A 2× device-scale browser screenshot of the
   same prose shows fully-joined Naskh, seated diacritics (مُسمّاة with
   shadda+damma), and Latin identifiers sitting LTR inside the RTL line.

**Conclusion.** The garble lives **only in the PDF's extracted/selectable text
layer** — a Chromium print-pipeline complex-script quirk (glyphs are positioned
correctly on the page; the text run behind them is emitted unshaped and
reversed). A human reading either the screen or the printed page sees correct
Arabic. It is a print-*export* artifact, not our data and not our render, and it
did **not** block shipping. If a future reviewer prints `ar` (or any RTL locale)
and sees scrambled selectable text, this is that — check the live DOM/pixels
before treating it as a defect. Not fixed here (it is outside app code); flagged
so it is not re-discovered as a bug.
