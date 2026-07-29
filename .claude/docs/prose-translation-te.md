# Telugu (Andhra Pradesh) research-prose translation — rollout

**Status:** **IN PROGRESS.** Phase 0 complete (script/typography spike done, two
defects found and fixed, verified in a real browser). Register decisions settled.
Translation not started. Written 2026-07-29.

> ## START HERE (fresh session)
>
> Telugu is the **fifth** language, after English, Spanish, Bangla and Haitian
> Creole. Its cost shape is **Bangla, not Kreyòl**: it needs a declared font
> (Barlow ships no Telugu glyphs) and it needed a real typography spike.
>
> **Read [`prose-translation-bn.md`](./prose-translation-bn.md) for the method**
> and [`prose-translation-architecture.md`](./prose-translation-architecture.md)
> for the language-independent mechanism. Do not re-derive either. This doc holds
> only what is Telugu-specific.
>
> **Branch:** `i18n/telugu-rollout`.
>
> ### Settled — do NOT re-raise
>
> | Decision | Value | Where |
> |---|---|---|
> | Direction | LTR (`Intl.Locale('te').getTextInfo().direction`) | §0 |
> | Digits | Western (`36,325`), NOT Telugu numerals | §0 |
> | Grouping | **lakh/crore — `$32,50,000`** | §0 |
> | `FIGURE_SAFE_NUMBERS` | **te gets NO entry** (diverges from bn) | §0 |
> | Currency | USD always; **formatting only, never conversion** | §0 |
> | Symbol placement | leads, `$32,50,000` — derived via `Intl`, not hardcoded | §0 |
> | Register | **vyāvahārika** (educated modern standard) | §1 |
> | Loanwords | **Latin for education terms of art** | §1 |
> | Variety | **bound to Andhra Pradesh usage** | §1 |
> | Font | `Noto Sans Telugu`, already in `SUPPORTED` | §2 |
>
> ### The loop, per topic
>
> ```
> node scripts/i18n_extract.mjs --topic <t> --lang te      # first time only
> # translate the `t` fields in src/data/overlays/work/<topic>.te.json
> python3 scripts/check_figures.py --topic <t> --lang te   # figures round-trip
> node scripts/i18n_build_overlay.mjs --topic <t> --lang te
> node scripts/check_translations.mjs --lang te            # coverage + drift
> ```
>
> Run the **figure sweep after every topic**, not at the end — it caught a real
> defect in Bangla's `sports` after that topic was already marked complete.
>
> ### What is left
>
> Everything after Phase 0: the 326-key chrome catalog, nine topics of prose,
> Phase 2 verification, the `TRANSLATED`/`PROSE_TRANSLATED` flip, and browser
> print-outs on **Providence Day and Charlotte Latin**.

**Mechanism:** see [`prose-translation-architecture.md`](./prose-translation-architecture.md).
**Prior rollouts:** [`prose-translation-bn.md`](./prose-translation-bn.md) (the
template — non-Latin script, font, spike) and
[`prose-translation-ht.md`](./prose-translation-ht.md) (Latin script, no spike).

---

## 0. Figures — settled before the rollout began

Confirmed by `Intl` in this repo's Node, 2026-07-29:

```
direction            ltr
3683971              36,83,971        ← lakh/crore, Western digits
$3,250,000           $32,50,000       ← symbol LEADS
$36,325              $36,325          ← identical to en below 6 digits
```

**Telugu keeps its native lakh/crore grouping.** This is the first locale to
diverge from Bangla here, and the divergence is deliberate — **do not copy the
`bn` line reflexively.**

- `bn` is in `FIGURE_SAFE_NUMBERS` (`src/lib/figureLocale.ts`), so it borrows
  `en-US` grouping. It was put there because a Bangla print-out rendered
  `36,83,971` for a philanthropy total, and a regrouped figure no longer matches
  the school's own published document.
- **`te` is deliberately NOT in that list.** The owner's decision, 2026-07-29:
  Telugu readers get native grouping, so `$3,250,000` renders `$32,50,000`.

So the *same rendering* that was a defect in Bangla is the *wanted behaviour* in
Telugu. `check_bn_numerals.mjs` only asserts the 3-3-3 shape for locales inside
`FIGURE_SAFE_NUMBERS`, so it correctly stays silent about `te`.

**Formatting only, never conversion.** The currency stays USD and the amount
never changes — only grouping and symbol placement localize. No INR, no exchange
rate, no dual display. Same standing rule as every other locale.

**Symbol placement comes from `Intl`, not a language check.** Telugu leads (`$32,50,000`)
like English and Kreyòl, unlike Spanish and Bangla which trail. The pre-PR-#61
`lang().startsWith('en')` branch would have gotten this wrong; `currencyLeads()`
in `src/lib/format.ts` derives it correctly. Nothing to do — noted because Telugu
is the locale that would have exposed that bug had it not already been fixed.

---

## 1. Register — settled 2026-07-29 by the owner

Telugu's register question is the analogue of Bangla's Dhaka-vs-Kolkata and
Kreyòl's French-drift. Three decisions:

### 1a. Vyāvahārika, the educated modern standard

Telugu has a genuine diglossia: **grānthika** (classical/literary) versus
**vyāvahārika** (spoken/modern). Use **vyāvahārika at an educated written
register** — the Telugu of newspapers, school circulars and government notices.

- Not grānthika: archaic for informational prose. A parent reading about tuition
  would find it oddly ceremonial, and it is no longer used for this kind of writing.
- Not colloquial: this is a document families use to compare tuition figures and
  admissions outcomes, and colloquial forms vary more across regions.

### 1b. Keep Latin for education terms of art

Beyond the standing convention (institution names, AP/Honors/IB, platform names,
athlete and staff names — all Latin, always), **also keep Latin** for terms a
parent will meet in English on the school's own site and must be able to search
for and say aloud:

`Upper School` · `Middle School` · `Lower School` · `Honor Society` ·
`Extended Day` · `varsity` · `GPA` · `transcript` · `counselor`

Translate generic nouns, all analysis, and **all hedges**. Do not transliterate
these into Telugu script — స్కూల్ for *school* reads fluently but breaks the
searchability that is the whole reason for the rule.

This matches what the Bangla rollout settled in its §4.4.

### 1c. Bound to Andhra Pradesh usage

**The variety is binding, as Dhaka was for Bangla.** Target coastal **Andhra
Pradesh** usage, not Telangana/Hyderabad.

The written standards are far closer than Bangladeshi vs West Bengali Bangla —
the divergence is mostly spoken and lexical — but the owner chose to bind it
rather than aim for a neutral standard, so it is a translation instruction and
not a footnote. Prefer Andhra lexical choices; avoid Telangana-marked vocabulary
and Urdu-influenced Hyderabadi forms.

**The locale code stays `te`.** No Telangana variant is offered, so there is
nothing to disambiguate at the locale level, and changing it would churn the
catalog filename and the stored-preference key for no gain. The picker names the
region in both scripts so a reader is never left guessing. If a Telangana variant
is ever added, split then: `te-IN` is useless for this (both are `te-IN`), so it
would need a custom tag.

### 1d. Carried over unchanged from Spanish and Bangla

- **Direct quotations stay English**, inside their original quotation marks. The
  research quotes school marketing copy deliberately, often to show exactly what
  a school does and does not claim.
- **Figures are never re-typed.** Handled at render time by `localizeMoneyText()`.
- **Hedges are preserved literally.** "documented minimum", "school-reported",
  "encouraged, not required", "an absence of evidence rather than a stated
  policy" — never smoothed. This is the highest-risk part of the translation and
  the reason the corpus wants review.
- **Verbatim quoted source strings stay English** — markdown rate tables and
  Wayback quotes are citations, not prose.

---

## 2. Phase 0 — script and typography spike ✅ COMPLETE 2026-07-29

`syncFont()` already swaps `--sans`/`--heading` to `'Noto Sans Telugu'` for `te`,
keeping Barlow in the stack for Latin runs. `te` was already in `SUPPORTED` with
that font declared. **Font loading worked first time — no tofu, no fallback.**

**Reproducing:** `telugu-spike.html` at the repo root (gitignored, absent from
`dist`) renders ~35 hostile strings through the app's real stylesheet and the
exact font stack `syncFont()` injects for `te`. Run the dev server and open
`/telugu-spike.html`.

Two defects found, both fixed in `src/index.css`, both verified fixed in a real
browser render. Neither was visible to any checker.

### Finding 1 — letterspacing, same fix as Bangla, DIFFERENT mechanism

43 CSS rules pair `text-transform: uppercase` with tracking up to `0.14em`, tuned
for Latin caps. Uppercase is inert in Telugu; the tracking is not.

**But it breaks Telugu differently than it broke Bangla, and the distinction is
worth keeping straight:**

- **Bangla** joins letters horizontally under a মাত্রা headstroke, so tracking
  forces gaps *inside a single character* — `রাজ্য-শিরোপার` rendered with visible
  holes.
- **Telugu** stacks its subscripts *vertically* below the base consonant, so its
  conjuncts **survive tracking intact** — `రాష్ట్ర`, `విద్యార్థి`, `సంక్షిప్త` all held
  together at 0.14em in the spike. What breaks instead is the spacing *between*
  syllable clusters: the line scatters into loose fragments and word boundaries
  stop being legible. `రాష్ట్ర టైటిల్ పట్టిక` read as disconnected pieces.

Same fix — tracking → 0 — so the 43 selectors are now shared via
`:root:is([lang='bn'], [lang='te'])`. Uppercase itself is left alone: inert in
both scripts, and removing it would risk the Latin runs (AP, NCISAA) that share
those labels.

### Finding 2 — line-height, WORSE than Bangla

Headings run 1.05–1.15, comfortable for Latin caps. Bangla needed 1.45. **Telugu
needs more**, because it stacks marks both above *and* below the baseline with no
headstroke anchoring them: on a two-line heading, line 1's subscripts met line
2's vowel signs (`ై`, `ో`). Nearly touching at 1.45.

Fixed: **1.6 on headings, 1.7 on body**, for `te` only.

`.stat-tile-val` is deliberately excluded from the 1.6 override — it holds
figures (`$36,325`, `~44:1`), which are Latin runs where extra leading only
loosens the tile.

### Finding 3 — stat tiles were FINE

No fixed height, so they grew cleanly, exactly as in Bangla. Mixed Telugu/Latin
on one line (`varsity క్రీడలు`, `ఒక్కో counselor కు`) rendered correctly with
Barlow picking up the Latin runs. **Recorded so nobody later "fixes" a problem
that never existed.**

### Scoping verified

All overrides are scoped to `[lang='bn']` / `[lang='te']`. Confirmed in the
**built** CSS (not the source) that the only unscoped `letter-spacing: 0` rules
are the same **7** that pre-date the Bangla change — all `.hint` / `.text-muted`
helpers, unrelated. Nothing leaked to Latin locales.

---

## 3. What remains

Follow the bn doc's Phase 1 → 2 → 3 in order. Two Telugu-specific notes:

**Phase 2, check 4 — the figure sweep.** `check_figures.py` compares figures
between `text` and `t`. Telugu keeps Western digits, so figures should round-trip
byte-identically in the work files; the lakh/crore regrouping happens at
**render** time via `Intl`, never in the data. A grouping change appearing in a
work file is a defect.

**Phase 2, check 6 — flip before you print.** `setLanguage()` rejects any code
not in `TRANSLATED`, so `te` is unselectable until Phase 3 lands. Flip first,
print second — the flip is two lines and trivially reverted. (The bn doc lists
these in the wrong order and says so.)

**Print-out schools: Providence Day and Charlotte Latin.** Latin exercises
flag-chip and hedge paths Providence Day never touches. **In a real browser** — a
headless render passed Latin clean while the 65-page browser print-out found the
Kreyòl currency bug.

**Watch for the "not English is one bucket" shape.** The last two cross-locale
defects both had it: an English footer disclaimer in `src/App.tsx` shipping to
every non-English locale, and `localizeMoneyText()` branching on
`lang().startsWith('en')`. Telugu is the first locale that both leads its currency
symbol *and* uses non-Western grouping, so it is a good probe for anything that
still conflates the two.

---

## 4. Review

**Open.** No Telugu speaker has reviewed this yet.

Record terminology choices and soft spots in `src/data/overlays/NOTES.md` per
topic, as Spanish and Bangla did, so a reviewer gets a list rather than 84k words
of undifferentiated prose. The two things a non-speaker structurally cannot
check:

1. **Register drift toward grānthika** — the Telugu analogue of Kreyòl's French
   drift. Invisible to every automated check in this repo.
2. **Andhra vs Telangana lexical marking** — §1c binds this, and only a speaker
   can confirm it held across 84k words.

Kreyòl shipped **without** a native-speaker review (2026-07-29) and that is
recorded as a known gap in CLAUDE.md. Whether Telugu ships the same way is the
owner's call.
