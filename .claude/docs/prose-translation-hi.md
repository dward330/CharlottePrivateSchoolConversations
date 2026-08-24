# Hindi (हिन्दी) research-prose translation — rollout

**Status:** **COMPLETE, PRINT-OUT SIGNED OFF, and NATIVE-SPEAKER REVIEWED
(2026-08-23).** Nothing outstanding. All nine topics + the 333-key chrome
catalog translated, every automated check green, `hi` live in `TRANSLATED` and
`PROSE_TRANSLATED`. Written 2026-08-02; review closed 2026-08-23.

> ## START HERE (fresh session)
>
> Hindi is the **ninth** language, after English, Spanish, Bangla, Haitian
> Creole, Telugu, French, Farsi and Italian. Its cost shape is **Telugu** — a
> declared Noto font, a real typography spike, and the same lakh/crore figure
> decision — but its typography failure mode is **Bangla's**, not Telugu's.
>
> ### Done
>
> | Topic | Strings |
> |---|---|
> | metric-values | 126 |
> | student-clubs | 517 |
> | sports | 656 |
> | after-school | 654 |
> | the-arts | 599 |
> | financial-aid-report | 572 |
> | college-support | 926 |
> | course-offerings | 1,848 |
> | financial-aid-tuition (content) | 27 |
> | **prose total** | **5,925** |
> | UI chrome `src/locales/hi.json` | 333 keys |
>
> Coverage is 5,924 / 5,925: the one gap is an entry whose **English source is
> empty**, so there is nothing to translate. Verified, not assumed.
>
> ### What is left
>
> 1. ~~The browser print-out~~ — **DONE, 2026-08-02.** Providence Day (66pp) and
>    Charlotte Latin (65pp), fully expanded, real browser. **Both clean — the
>    first rollout in this repo to find ZERO print-out defects.** See §5a.
> 2. ~~A native-speaker review~~ — **DONE, 2026-08-23.** A Hindi speaker read
>    the deployed pages and accepted the prose. The Sanskritization axis (§6)
>    was the thing being checked; `hi` now ships reviewed.
>
> **Read [`prose-translation-te.md`](./prose-translation-te.md) for the method**
> and [`prose-translation-architecture.md`](./prose-translation-architecture.md)
> for the language-independent mechanism. Do not re-derive either. This doc
> holds only what is Hindi-specific.
>
> **Branch:** `i18n/hindi-rollout`.
>
> ### Settled — do NOT re-raise
>
> | Decision | Value | Where |
> |---|---|---|
> | Direction | LTR — no bidi/isolate work at all | §0 |
> | Digits | Western (`36,325`), NOT Devanagari `०१२३` | §0 |
> | Grouping | **lakh/crore — `$32,50,000`** | §0 |
> | `FIGURE_SAFE_NUMBERS` | **hi gets NO entry** (follows `te`, not `bn`) — owner-confirmed twice | §0 |
> | Currency | USD always; **formatting only, never conversion** | §0 |
> | Symbol placement | leads, `$32,50,000` — derived via `Intl` | §0 |
> | Percent | unspaced (`90%`) — Intl already gives this | §0 |
> | Register | **मानक हिन्दी**, educated modern written standard | §1 |
> | Sanskritization | **avoid** शुद्ध हिन्दी coinages; everyday word wins | §1 |
> | Loanwords | Devanagari for domain loanwords; Latin for identifiers | §1 |
> | Font | `Noto Sans Devanagari`, already in `SUPPORTED` | §2 |
> | Identifier guard | **not needed** — no Hindi/Urdu/Sanskrit course in corpus | §3 |
> | 7-string open defect | **carried forward**, as every prior locale did | §3 |
>
> ### The loop, per topic
>
> ```
> # work file already exists — do NOT re-extract (it would blank it)
> # translate the `t` fields in src/data/overlays/work/<topic>.hi.json
> node scripts/check_hi_numerals.mjs                       # §0 — digits + grouping
> node scripts/check_sep_drift.mjs --lang hi --topic <t>   # §4 — separator drift
> python3 scripts/check_figures.py --topic <t> --lang hi   # figures round-trip
> node scripts/i18n_build_overlay.mjs --topic <t> --lang hi
> node scripts/check_translations.mjs --lang hi            # coverage + drift
> ```
>
> Run **both** figure checks after every topic. They catch different things —
> see §4, which is the single most transferable finding in this doc.

**Mechanism:** see [`prose-translation-architecture.md`](./prose-translation-architecture.md).
**Prior rollouts:** [`prose-translation-te.md`](./prose-translation-te.md) is the
closest analog (non-Latin, font, spike, lakh/crore) and
[`prose-translation-bn.md`](./prose-translation-bn.md) is the other non-Latin
worked example. Read a prior doc for the *method*, never for a register rule to
inherit unexamined — see the French doc's §1, which inverts Kreyòl's.

---

## 0. Figures — settled before the rollout began

Confirmed by `Intl` in this repo's Node, 2026-08-02:

```
direction            ltr
3683971              36,83,971        ← lakh/crore, WESTERN digits
123456789            12,34,56,789     ← 2-2-…-3, boundaries keep moving
$3,250,000           $32,50,000       ← symbol LEADS
$36,325              $36,325          ← identical to en below 6 digits
0.857                0.857            ← winPct, dot decimal, English-like
90%                  90%              ← unspaced, nothing to strip
```

**Hindi is byte-identical to Telugu on every figure axis.** That is the whole
reason `te` is the template rather than `bn`.

### Why hi gets NO `FIGURE_SAFE_NUMBERS` entry

This is the one genuinely owner-level decision in the rollout, and it is the
same fork Telugu faced. Both `bn` and `te` regroup to lakh/crore; they sit on
opposite sides of the list:

- **`bn` IS on the list.** A Bangla print-out rendered `36,83,971` for a
  philanthropy total, and a regrouped figure no longer matches the school's own
  published document. (`bn` is *also* on it for digits — Intl emits `৩৬,৮৩,৯৭১`.)
- **`te` is deliberately OFF it.** The owner's call, 2026-07-29: Telugu readers
  get native grouping, so `$3,250,000` renders `$32,50,000`.
- **`hi` follows `te`.** Hindi readers in India read lakh/crore natively, and
  `te` already proved the render layer handles it cleanly. **Confirmed by the
  owner 2026-08-02**, then re-confirmed after the rollout shipped with the
  tile-vs-prose split below actually on screen. Settled — do not re-litigate.

Note the two locales differ on *why*, which is worth keeping straight: Bangla's
case is over-determined (digits AND grouping), while Hindi's is grouping alone —
Hindi's digits are already Western, so the `bn` digit defect cannot arise here.
`check_bn_numerals.mjs` only asserts the 3-3-3 shape for locales inside
`FIGURE_SAFE_NUMBERS`, so it correctly stays silent about `hi`.

**The interaction this creates, stated plainly.** A stat tile and the prose
sentence beside it can show the same figure two ways:

```
stat tile (rendered from a raw number, regrouped by Intl)   $36,83,971
prose figure (baked in the data, never re-typed)            $3,683,971
```

Both are individually correct and every automated check passes with both on
screen. This is inherited from Telugu deliberately, not a defect — written up
for a reviewer in `src/data/overlays/NOTES.md`.

**Formatting only, never conversion.** Currency stays USD, the amount never
changes, no INR, no exchange rate, no dual display. Standing rule.

---

## 1. Register — मानक हिन्दी, the educated modern written standard

Hindi's register question is the analogue of Telugu's grānthika-vs-vyāvahārika
and Kreyòl's French-drift. **Pinned axis: how Sanskritized.**

### 1a. Not over-Sanskritized शुद्ध हिन्दी

Target the Hindi of a **school circular, a newspaper education page, or an
admissions handbook**. Hindi supports a very wide register range, from
Sanskrit-heavy formal prose to Hindustani everyday speech, and the failure mode
here is reaching for a Sanskrit coinage when the ordinary word is what a parent
actually says:

| Prefer | Over |
|---|---|
| कोर्स / पाठ्यक्रम | अध्ययनक्रम |
| रिपोर्ट | प्रतिवेदन |
| स्कूल / विद्यालय | शिक्षणसंस्थान |
| फ़ीस / ट्यूशन / शुल्क | शुल्क-राशि |
| प्रतिशत | शतांश |

A parent comparing tuition figures should not feel they are reading a government
gazette. **This is the single highest-risk register call in the rollout**, and it
is precisely the class the Telugu and Farsi native-speaker reviews caught — in
both cases the reviewer's note was about naturalness, not accuracy.

Equally, **not colloquial or Hinglish-heavy**: this is a document families use to
compare figures, so it stays composed and written. No second-person address.

### 1b. Loanwords: Devanagari for the domain, Latin for identifiers

Two different rules, and conflating them is the mistake:

- **Everyday English loanwords Hindi genuinely uses in this domain get written
  in Devanagari:** स्कूल, कॉलेज, कोर्स, रिपोर्ट, ट्यूशन, कैंपस, क्लब, टीम, कोच, स्कोर.
  Calquing these into Sanskrit equivalents is the §1a failure.
- **Searchable identifiers stay in LATIN script**, because a parent must be able
  to type them into a search box and say them on a tour: `Upper School`,
  `Middle School`, `Lower School`, `Extended Day`, `Honor Society`, `varsity`,
  `GPA`, `transcript`, `counselor`, `AP`, `IB`, `Honors`, `NCISAA`, plus every
  institution, college, platform, award and person name.

So `स्कूल` for the generic noun, but `Upper School` for the division a school
names on its own site. This matches what Bangla settled in its §4.4 and Telugu
in its §1b — do **not** transliterate the identifiers into Devanagari, however
fluently स्कूल reads.

### 1c. No regional variant is bound

Unlike Bangla (Dhaka binding) and Telugu (Andhra Pradesh binding), **no regional
variety is specified for Hindi.** Standard written Hindi is far more uniform
across the Hindi belt than those two cases, the divergence is mostly spoken, and
no second variant is offered in the picker — so there is nothing to
disambiguate. The locale code is plain `hi` and the picker names no region.

### 1d. Carried over unchanged from every prior locale

- **Direct quotations stay English**, inside their original quotation marks.
- **Figures are never re-typed.** Render-time only.
- **Hedges are preserved literally** — "documented minimum", "school-reported",
  "encouraged, not required", "an absence of evidence rather than a stated
  policy". Never smoothed into claims. This is the highest-risk part of the
  translation and the reason the corpus wants a review.
- **Verbatim quoted source strings stay English** — rate tables and Wayback
  quotes are citations, not prose.

---

## 2. Phase 0 — script and typography spike ✅ COMPLETE 2026-08-02

`syncFont()` already swaps `--sans`/`--heading` to `'Noto Sans Devanagari'` for
`hi`, keeping Barlow in the stack for Latin runs. `hi` was already in `SUPPORTED`
with that font declared. **Font loading worked first time — no tofu, no
fallback**, verified by probing every deep conjunct (क्ष त्र ज्ञ द्ध श्र ह्म ङ्क) and
the full matra set for zero-width rendering.

**Reproducing:** `hindi-spike.html` at the repo root (gitignored, absent from
`dist`) renders ~40 hostile strings through the app's real stylesheet and the
exact font stack `syncFont()` injects for `hi`. Run the dev server and open
`/hindi-spike.html`.

Two defects found, both fixed in `src/index.css`, both scoped to `[lang='hi']`.

### Finding 1 — letterspacing breaks the शिरोरेखा. This is the BANGLA case.

43 CSS rules pair `text-transform: uppercase` with tracking up to `0.14em`,
tuned for Latin caps. Uppercase is inert in Devanagari; the tracking is not.

**Devanagari fails the way Bangla fails, not the way Telugu fails** — and the
docs predicted this correctly, which is worth recording because the Telugu doc
had to correct the same prediction for its own script:

- **Bangla** joins letters under a মাত্রা headstroke, so tracking forces gaps
  *inside* a single character.
- **Telugu** stacks subscripts *vertically*, so its conjuncts survive tracking
  intact and what breaks is the spacing *between* clusters.
- **Devanagari** joins under a शिरोरেखा headstroke like Bangla, so tracking cuts
  the stroke itself.

**Measured rather than eyeballed.** Rasterised `पाठशाला` at 64px, found the
darkest horizontal pixel row (the headstroke), and counted contiguous ink runs
along it:

| tracking | ink runs | stroke width | gaps |
|---|---|---|---|
| 0 | 3 | 223px | 3, 3 |
| 0.02em | 3 | 227px | 5, 3 |
| **0.06em** | **5** | 235px | 3, 7, 3, 2 |
| 0.10em | 5 | 242px | 5, 10, 3, 5 |
| 0.14em | 5 | 250px | 8, 12, 3, 8 |

So tracking both **adds** breaks (3 runs → 5) and **widens** the existing ones
(3px → 12px). The 3 runs at tracking 0 are Noto's own hairline joins, not a
defect. Fixed: tracking → 0, sharing the existing 43-selector list, which is now
`:root:is([lang='bn'], [lang='te'], [lang='fa'], [lang='hi'])`.

### Finding 2 — line-height clips, between Bangla and Telugu in severity

Headings run 1.05–1.15. Measured the ink-box gap between consecutive line boxes
on two-line samples carrying deep matras both above (ी ै ो ं) and below (ु ृ ्र):

| line-height | heading gap | body gap |
|---|---|---|
| 1.05 | **−5.1px** | **−4.3px** |
| 1.15 | **−3.2px** | **−2.9px** |
| 1.30 | **−0.3px** | **−0.8px** |
| 1.45 | +2.5px | +1.3px (tight) |
| 1.60 | +5.4px | +3.4px |

Negative means the ink rows genuinely overlap. Fixed: **1.45 on headings**
(the shared bn/fa value) and **1.6 at body size**.

That places Hindi between Bangla (1.65 body) and Telugu (1.7 body): Devanagari
anchors its vowel signs on the headstroke as Bangla does, but carries a second
rank of marks below the baseline that Bangla mostly does not.

### Finding 3 — stat tiles were FINE

No fixed height, so they grew cleanly — 12 tiles, zero overflow. Mixed
Devanagari/Latin on one line (`varsity खेल`, `प्रति counselor`) rendered correctly
with Barlow picking up the Latin runs. **Recorded so nobody later "fixes" a
problem that never existed** — the fourth script in a row for which this is true.

### Scoping verified IN A BROWSER, not in the source

Prior rollouts verified scoping by reading the built CSS. This one probed the
live computed style: 12 of the tracked class names, across all 9 locales.

```
sel              en      es      fr      it      ht      bn      te      fa      hi
.eyebrow      1.54px  1.54px  1.54px  1.54px  1.54px  normal  normal  normal  normal
.sports-h     1.12px  1.12px  1.12px  1.12px  1.12px  normal  normal  normal  normal
…
root l-h        24px    24px    24px    24px    24px  26.4px  27.2px  25.6px  25.6px
```

Every Latin locale is byte-identical to English on every probed property.
**Zero leaks.**

---

## 3. Hindi-specific questions, and their answers

**No identifier guard is needed.** French required `check_fr_identifiers.mjs`
because `French III Honors` and `AP French Language and Culture` are searchable
course codes that read as translatable prose *in French only*. Grepped the whole
corpus (`src/data/**`, `src/content/**`) for Hindi/Hindustani/Urdu/Sanskrit: the
only hit is a prose mention inside `NOTES.md` about Telugu. **There is no Hindi
course, club or program anywhere in the corpus**, so the French trap has no
Hindi analogue. Same finding as Italian, which likewise needed no guard.

**No bidi work.** Hindi is LTR, so the RTL LTR-pin question stays untouched
(still only Arabic and Farsi) and no isolate handling is involved. This is why
Hindi is substantially cheaper than Farsi was.

**`UNIT_SUFFIX` — no `hi` entry.** `format.ts` carries per-unit suffix maps for
`es`/`fr`/`it` (`/yr` → `/año`, `/an`, `/anno`). Hindi is left without one, so
`/yr` renders as-is. Reasoning: the suffix sits immediately after a `$` figure in
a tile (`$1,725/yr`), where the whole run is a Latin-script citation a parent
matches against the school's published rate card; splicing `/वर्ष` into the middle
of that run mixes scripts inside a single token for no comprehension gain, and
the surrounding prose already says "per year" in Hindi. The `es`/`fr`/`it`
entries exist because those locales keep the run entirely in Latin script, so the
suffix does not change scripts. **Revisit if a reviewer disagrees** — it is a
one-line addition and affects ~64 sites.

**The 7-string known open defect is CARRIED FORWARD.** The strings in
`program`/`value`/`year` documented in CLAUDE.md ship as English in every
non-English locale; Hindi inherits the same 7. Fixing means widening
`i18n_fields.mjs` path rules and re-extracting topics already complete in seven
languages. Every prior locale carried it; carrying it keeps Hindi consistent
rather than making it the odd one out. Confirmed present and unchanged by
`i18n_audit_skips.mjs` during this rollout.

---

## 4. The two figure checks catch DIFFERENT things — run both

This is the most transferable finding here, inherited from the Italian rollout
and made sharper by the lakh/crore decision.

`check_figures.py` **normalizes 3-3-3 group separators** before comparing, so it
is structurally blind to a figure that kept its digits but swapped separators:

```
20,642 → 20.642      4.33 → 4,33      $30,000 → $30.000      0.5 → 0,5
```

Every one of those is still a forbidden re-typing — the rule is that a figure is
copied **char-for-char** from its English source, because a parent matches it
against the school's own page. The Italian rollout found **64** such re-typings
that the sweep passed clean, concentrated in GPA decimals and thousands
separators in `college-support`.

`scripts/check_sep_drift.mjs` closes it: every numeric token in a `t` field that
carries an internal separator must appear **verbatim** in that entry's English
`text`. Promoted to a committed script during this rollout.

**Why it matters MORE for a lakh/crore locale.** Because `hi` regroups at
*render* time, the data must still store the English 3-3-3 figure. A translator
who "helpfully" writes `$36,83,971` into a work file has hardcoded a regrouping
that the render layer would then apply *again*. That token is absent from the
English text, so `check_sep_drift.mjs` flags it — and
`check_hi_numerals.mjs` flags the 2-2-3 shape directly as a second net.

**Also: the decimal-figure trap.** `5.0%`, `4.5%`, `1.05` must keep the DOT.
Hindi uses a dot decimal natively so the pull is weaker than it was for Italian,
but the rule is absolute: only the render layer localizes separators.

### 4a. A stale command in every prior rollout doc, fixed here

The per-topic loop that the bn/te/fr/fa docs all quote includes:

```
python3 scripts/check_figures.py --topic financial-aid-tuition --lang hi
```

That spelling **never matched a file**. The content-overlay extractor writes
`financial-aid-tuition.content.<lang>.json`, so the path was wrong for every
locale that ran it. It printed a loud `✗ no such work file` and exited non-zero,
so it never shipped a *silent* pass — but the command as documented was simply
broken, and the honest reading is that this topic's figure sweep was likely
skipped or worked around in earlier rollouts rather than run.

Fixed in `check_figures.py`: `--topic <t>` now falls back to the `.content`
spelling when the plain one does not exist. A genuinely missing topic still
fails with exit 1 — verified both ways.

### 4b. `check_runtime_resolution.mjs` reported ✓ on ZERO files

Found the same way, and the more dangerous of the two. Run against a locale with
no overlays built yet, it printed:

```
hi: 0 shipped entries across 0 overlay file(s)
✓ every shipped stamp recomputes from live English — entries will resolve
```

Exit 0. This is **the** check whose entire job is proving the page renders the
language instead of silently falling back to English — and it emitted the same
tick for "0 entries verified" as for "5,924 entries verified". A typo'd `--lang`,
or running it before the overlays are built, read as a pass.

It is the shape CLAUDE.md already warns about in another context: *beware any
check whose sample size doubles as its coverage*. Now exits 1 with an
explanation when it finds nothing. Verified in both directions — fails on an
empty locale, still passes on `fr`'s 5,924 real entries.

Both fixes are language-independent and benefit every future locale.

---

## 4c. The cross-locale leak diff is the highest-yield review tool

Inherited from the Italian rollout, where it found **167** leaks the eye had
caught only 2 of. `.spike-tmp/find_hi_english_leaks.mjs` reports every string
where Hindi kept the English verbatim **and ≥2 of `es`/`fr`/`it`/`te`/`bn`
translated that same English**.

The insight is that two independently-reviewed locales agreeing a string is
prose is far stronger evidence than any heuristic about what "looks like" an
identifier — and it needs no judgement about the new language at all.

**64 review items for Hindi; 28 were genuine leaks and were fixed:**

| Class | Example | Fix |
|---|---|---|
| Month abbreviations | `15 Feb 2026` | `15 फ़र. 2026` — digits/year stay Western |
| Grade-band ordinals | `1st–5th`, `TK–2nd` | `1ली–5वीं`, `TK–2री` |
| am/pm clock markers | `2:00–3:00 pm` | `दोपहर 2:00–3:00` (te and bn both do this) |
| Descriptive labels | `enrichment`, `Drop-in`, `Activity buses` | translated |

The other **36 were reviewed and deliberately kept**: sport names in roster
columns, named awards (`Gatorade Player of the Year`), production titles, source
domains, and course-catalog lists a family matches against the school's page.
The fixer records those as explicit no-op entries, so the decision is documented
rather than merely implied by absence.

**Run this before the print-out, not after.** It is cheap, and it finds the
class of defect that a rendered-page review structurally cannot: a short English
label that looks deliberate.

## 5. What remains

Follow the te/bn Phase 1 → 2 → 3 order. Phase 2's checks, all of which must be
green before the print-out:

1. `check_translations.mjs --lang hi` — coverage and drift, all topics
2. `check_chrome_keys.mjs` — every chrome-claiming skip resolves
3. `check_hash_parity.mjs` — build-time and runtime stamps agree
4. `check_figures.py` + `check_sep_drift.mjs` + `check_hi_numerals.mjs` — §4
5. `check_runtime_resolution.mjs --lang hi` — **the check that proves the page
   renders Hindi rather than silently falling back to English**
6. `check_currency_shape.mjs`, `check_money_render_paths.mjs`
7. `tsc`, `lint`, production build
8. **Browser print-out on TWO schools** — Providence Day and Charlotte Latin,
   panels force-expanded

**Flip before you print.** `setLanguage()` rejects any code not in `TRANSLATED`,
so `hi` is unselectable until the flip lands. Flip first, print second. **Done** —
`hi` is in both lists.

### Headless render results (2026-08-02) — checks 1–7 all green

Both print-out schools were rendered in headless Chromium with all 36 `<details>`
panels force-expanded. **This does not replace the browser print-out**, but it
front-loads everything a headless pass can see:

| | Providence Day | Charlotte Latin |
|---|---|---|
| panels expanded | 36 | 36 |
| page text | 6,862 → 149,775 chars | 6,429 → 125,207 chars |
| Devanagari chars | 72,889 | 61,208 |
| **Devanagari DIGITS** | **0** | **0** |
| stranded English prose | none | none |

`html lang=hi dir=ltr data-prose=hi`, Noto Sans Devanagari resolved on both.
Every remaining English line on either page is a course title — a deliberately
kept catalog identifier — checked individually rather than by eye.

**The lakh/crore split, confirmed live on Charlotte Latin.** This is the
documented Telugu interaction, not a defect:

```
.stat-tile-val   (rendered from a raw number)      $4,69,800   $1,46,000
prose figures    (baked in data, never re-typed)   $100,000+   $154,000+   $17,900
```

Figures below 6 digits group identically either way (`$36,500`, `$17,900`),
which is why the split is only visible on the large ones — and why a print-out
that never reaches an unabbreviated 7-digit figure proves nothing about it.

**The print-out is a required step, not a formality.** Every defect found after
the data read 100% in every prior rollout has been render-layer, and several
were not specific to the language being added. For Hindi specifically, look for:

- lakh/crore figures rendering (`$36,83,971`) — and at least one **unabbreviated
  7-digit** figure, which only exists in the financial-aid sections. `$3.25M`
  tiles prove nothing about grouping.
- **Expand the panels first.** A default school page is ~17k characters; with
  every `<details>` opened it is ~152k, and the financial-aid deep-dive holding
  the large figures is collapsed on load.
- no missing-glyph boxes in Devanagari conjuncts
- no Devanagari digits (`०१२३`) anywhere in a figure
- no English sentences stranded in **table cells, chips, or source lines** —
  the recurring "a sentence wearing an identifier's clothes" shape
- school names staying Latin

---

## 6. Review

**CLOSED — ACCEPTED 2026-08-23.** The review was conducted ON THE LIVE SITE: a
Hindi speaker read the deployed pages at charlotteschoolinsights.com rather than
a local build or an exported document (commissioned 2026-08-02, accepted
2026-08-23). `hi` ships **reviewed**, alongside every other locale.

**This is a deliberate change of method from every prior locale, and it has one
consequence worth stating.** Earlier reviews read a local render or a print-out;
this one reads production. That is a *better* test — it is exactly what a family
sees, including the real font fetch, the deployed bundle and the live analytics
path — but it means **the unreviewed prose is publicly visible while the review
is in progress**. That was the owner's call and is the normal state for this
site, which has shipped every locale's prose before its review returned. That
window is now closed for `hi` — the review returned and accepted.

To point the reviewer at a page directly: `?lang=hi` on any URL, e.g.
`https://charlotteschoolinsights.com/?lang=hi#/school/providence-day`. The
language also persists once chosen from the picker.

The one failure mode no automated check in this repo can reach is §1a: whether
the register drifts toward over-Sanskritized शुद्ध हिन्दी a parent would not
actually use. The Telugu and Farsi reviews both caught exactly this class.
Soft spots are recorded per topic in `src/data/overlays/NOTES.md` so a reviewer
gets a list rather than 84k words of undifferentiated prose.

Note what a rendered-page review does *not* certify: strings that never reach a
page — a hedge inside a proper-noun-classified field, for example — are
invisible to the reviewer exactly as they are to every checker. A speaker review
complements the render-layer sweeps; it does not replace them.
