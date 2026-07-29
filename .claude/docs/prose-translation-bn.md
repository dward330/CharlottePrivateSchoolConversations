# Bangla (Bangladesh) research-prose translation — rollout

**Status:** **Phase 1 COMPLETE — all 9 topics + chrome translated.** Phase 2
checkers pass. Written 2026-07-28.

> ## START HERE (fresh session)
>
> Phases 0 and 1 are **done**. All nine topics are translated, built and
> committed, plus the 326-key UI chrome catalog. Every Phase 2 *checker*
> passes. What remains is Phase 2's **print-out** and Phase 3.
>
> **Branch:** `i18n/bengali-bangladesh-label` (PR #58, open). All pushed.
>
> ### Done (100% coverage, no drift, figures verified)
>
> | Topic | Strings |
> |---|---|
> | metric-values | 126 |
> | student-clubs | 517 |
> | sports | 636 |
> | after-school | 654 |
> | financial-aid-report | 572 |
> | the-arts | 599 |
> | college-support | 926 |
> | course-offerings | 1,848 |
> | financial-aid-tuition (content) | 27 |
> | **prose total** | **5,905** |
> | UI chrome `src/locales/bn.json` | 326 keys |
>
> Counts for student-clubs, after-school and college-support are 3 lower than
> the original extraction: `flags[].kind` is an enum key, not prose, and is now
> excluded. See "the `kind` bug" below.
>
> ### What is left
>
> 1. **Full-page print-out** (Phase 2 step 6) — the only check that catches
>    render bugs. Spanish needed ~12 rounds. **Verify in a browser**, not in the
>    source: overlays fail silently, and source-level checks pass while the page
>    renders English.
> 2. **Phase 3** — add `'bn'` to both `TRANSLATED` and `PROSE_TRANSLATED` in
>    `src/lib/i18n.ts`. Deliberately NOT done yet: it is gated on a clean
>    print-out. `bn` is already in `SUPPORTED` with its font, and the catalog
>    loads from the glob automatically, so this is a two-line change.
> 3. **Native-speaker review** by a *Bangladeshi* Bangla speaker (§6). Soft
>    spots and terminology are listed per topic in
>    `src/data/overlays/NOTES.md`.
>
> ### The loop, per topic (for future languages)
>
> ```
> # work file already exists — do NOT re-extract (it would blank it)
> # translate the `t` fields in src/data/overlays/work/<topic>.bn.json
> node scripts/check_bn_numerals.mjs                     # §4.1 — Western digits
> python3 scripts/check_figures.py --topic <t> --lang bn # figures round-trip
> node scripts/i18n_build_overlay.mjs --topic <t> --lang bn
> node scripts/check_translations.mjs --lang bn          # coverage + drift
> ```
>
> **The figure-integrity sweep is now a script** — `scripts/check_figures.py`,
> run it after every topic. It caught a real defect in sports *after* that topic
> was marked complete (`$30.5M` rendered as "3.05 কোটি ডলার"). Coverage read
> 100% before and after; only this check sees it.
>
> Two things the regex as originally written in this doc got wrong, now fixed in
> the script: `[\d,]+` absorbed a trailing clause comma (so `$470, তা-ও` read as
> the figure `$470,` — 15 phantom failures in after-school alone), and the
> content extractor keys its units under `sections`, not `strings`.
>
> **The sweep is necessary but not sufficient.** It only sees `$`/`%`/years. In
> `financial-aid-tuition` a blanket `' and ' → ' ও '` corrupted text *inside*
> quoted Wayback citations ("2022-2023 Tuition **ও** Fees") while every dollar
> figure stayed intact — the sweep passed. For provenance documents also check
> **quoted-string and timestamp parity** between `text` and `t`.
>
> ### The `kind` bug — worth reading before the next language
>
> Flag chips render via `FLAG_LABEL[f.kind]` (`'verify'` → "TO VERIFY"). The
> leaf `kind` was classified as prose (correct for artsPrograms, where it holds
> season phrases like "Play / One-Act"), so the overlay rewrote the **lookup
> key** and every chip fell to `undefined`. Spanish had been shipping **58 blank
> evidence chips** across all six schools, on the one card where the qualifier
> IS the parent-facing content. Coverage read 100% throughout.
>
> Now pinned `['*.flags[].kind', false]` in `PATH_OVERRIDES`, with the chip
> wording moved to locale keys (`collegeSupport.flag_*`, `clubs.flag_*`) as
> `afterSchool.flag_*` already did. This is the third leaf — after `value` and
> `tier` — that is right for most of its values and wrong for a few.
>
> ### Register decisions already made (keep consistent — see §4)
>
> - **Latin, always:** school/college/program names, award and festival names
>   (Blumey, NCTC, Morehead-Cain), venue names, course codes (AP, IB, Honors),
>   platform names (Clarity, Scoir), athlete and staff names, and award
>   categories inside citations (Best Actress).
> - **Translated:** generic descriptors, analysis, and all hedges. The hedges
>   are the point of this corpus — "documented minimum", "the school's claim",
>   "an absence of evidence rather than a stated policy" — never smooth them.
> - **Untouched:** every figure, scoreline, GPA, clock time and date.
>
> Read §0 (Dhaka standard is binding) and §5 (Spanish lessons) before starting.
**Mechanism:** see [`prose-translation-architecture.md`](./prose-translation-architecture.md).
That doc is language-independent; this one is only the Bangla rollout.
**Prior rollout:** [`prose-translation-es.md`](./prose-translation-es.md) — Spanish,
complete, eight stages. Read its lessons section before starting.

---

## 0. The variety is binding: Dhaka / Bangladesh standard

This is **বাংলাদেশের প্রমিত বাংলা** — the Bangladeshi standard, as written and
spoken in Dhaka. It is **not** the West Bengal / Kolkata standard.

That is a translation instruction, not a footnote. The two standards diverge in
exactly the places this corpus lives:

| | Bangladesh (use this) | West Bengal (do not) |
|---|---|---|
| water | পানি | জল |
| invitation | দাওয়াত | নিমন্ত্রণ |
| lexical lean | more Perso-Arabic | more Sanskritic |
| loanword handling | English school terms commonly kept | more often calqued |

A Dhaka reader notices the Kolkata register immediately, and vice versa. In a
corpus this dense with school terminology, tuition language and institution
names, drifting between the two would read as sloppy at best.

**The locale code stays `bn`, not `bn-BD`.** No Kolkata variant is offered, so
there is nothing to disambiguate at the locale level, and changing it would
churn the catalog filename and the stored-preference key for no gain. The
picker names the country in both scripts — বাংলা (বাংলাদেশ) / "Bengali
(Bangladesh)" — so a reader is never left guessing. If a Kolkata variant is
ever added, split then: `bn-BD` and `bn-IN`.

---

## 1. Why this is ONE stage, not eight

Spanish ran in eight stages. Bangla should run in **one translation pass**.
This is not optimism — the reason is specific and checkable.

**The Spanish stages were paced by discovery, not by translation volume.** Each
topic needed its fields classified, its component read on the render path, its
leaks found:

- Stage 6 found 4 hardcoded leaks, 2 aria-labels, and `description`/`teaser`
  unclassified — silently dropping **948 strings**.
- Stage 7 found 6 leaks (bare JSX, a default parameter, template literals),
  three mixed-value fields, and 13 unclassified paths including the 49
  parent-facing questions.

**None of that recurs.** Field classification, `PATH_OVERRIDES`, the chrome-key
promises, the extractors and the checkers all key off the **English source**,
so they are language-independent and already correct.

Verified 2026-07-28: `node scripts/i18n_extract.mjs --topic sports --lang bn
--report` runs today, with zero setup, and reports the same 636 units / 9,752
words it reports for Spanish.

**What remains per language is translation and review** — plus one genuinely
new risk area, below.

---

## 2. The one genuinely new thing: Bangla script at paragraph length

Spanish shared Barlow with English. Bangla does not.

`syncFont()` in `src/lib/i18n.ts` already swaps `--sans` and `--heading` to
`'Noto Sans Bengali'`, keeping Barlow in the stack as the fallback for Latin
runs — acronyms, dollar figures and school names that stay English regardless
of locale. That wiring is done and needs no work.

**What is untested is how it looks.** The design's line-height, heading metrics
and fixed-height tiles were built for Barlow. Bangla has:

- taller glyphs and a headstroke (মাত্রা) that changes effective line height
- different ascender/descender behaviour than Latin
- no capital forms, so the all-caps section labels (`SECCIÓN 01` → its Bangla
  equivalent) need checking — `text-transform: uppercase` is a no-op in Bangla
  and the letterspacing built for caps may read oddly

This is LTR, so the RTL LTR-pin question stays untouched. That remains open for
Arabic and Farsi.

**Do this investigation BEFORE translating**, not after — it is cheap on 20
strings and expensive on 5,914.

---

## 3. Plan

### Phase 0 — script and typography spike (before any translation)

Translate a **deliberately hostile sample of ~30 strings** and print it:

- the longest headline and subhead in the corpus
- a fixed-height stat tile (`27` / `varsity sports / programs`)
- an all-caps section label and a `NO PUBLICADO`-style flag
- a table row with mixed Bangla prose and Latin figures (`$36,325`, `2026–27`)
- a hairline-grid card, to confirm the per-cell rules still land
- one long bulleted list item that wraps

Check: line-height, heading crowding, tile overflow, caps labels, and
Bangla/Latin mixing on the same line.

**Known before the spike even renders:** 43 CSS rules combine
`text-transform: uppercase` with letterspacing up to `0.14em`, tuned for Latin
caps. Uppercase is a no-op in Bangla, but the letterspacing is not — applied to
Bangla it separates conjuncts and breaks the মাত্রা headstroke. Expect a
`:root[lang='bn']` override; the spike confirms how bad, and where.

**Reproducing:** `bangla-spike.html` at the repo root (gitignored, absent from
`dist`) renders 30 hostile strings through the app's real stylesheet and the
exact font stack `syncFont()` injects for `bn`. Run the dev server and open
`/bangla-spike.html`. Fix in CSS **before** the main pass. Any
fix here is language-scoped (`:root[lang='bn']`) unless it is a genuine bug for
everyone — the Spanish rollout found five of those, so expect some.

**Spike results (2026-07-28) — Phase 0 is COMPLETE.** Three findings:

1. **Letterspacing breaks conjuncts — the serious one.** Bangla joins letters
   under a মাত্রা headstroke; the Latin-caps tracking (up to 0.14em across 43
   rules) forces gaps *inside* single characters. `রাজ্য-শিরোপার` rendered with
   visible holes. Fixed: tracking → 0 for `bn`. Uppercase itself is left alone
   — inert in Bangla, and removing it would risk the Latin runs (AP, NCISAA)
   that share those labels.
2. **Tight line-height clips.** Headings at 1.05–1.15 are fine for Latin caps
   but not for a script stacking vowel signs above *and* below the headstroke.
   Fixed: 1.45 on headings, 1.65 on body, for `bn` only.
3. **Stat tiles were fine.** No fixed height, so they grew cleanly. Recorded so
   nobody later "fixes" a problem that never existed.

All overrides are scoped `:root[lang='bn']` — verified that the only unscoped
`letter-spacing: 0` rules in the built CSS are 7 that pre-date this change.
Font loading worked first time; no tofu, no fallback.

### Phase 1 — one translation pass, all topics

Extract every topic at once, translate, build overlays, wire nothing new:

```
node scripts/i18n_extract.mjs --topic <each> --lang bn
node scripts/i18n_build_overlay.mjs --topic <each> --lang bn
node scripts/i18n_extract_content.mjs --topic financial-aid-tuition --lang bn
node scripts/i18n_build_content_overlay.mjs --topic financial-aid-tuition --lang bn
```

**Surface (measured 2026-07-28, identical to Spanish):**

| Topic | Units | Words |
|---|---|---|
| course-offerings | 1,848 | 16,054 |
| college-support | 929 | 17,536 |
| after-school | 657 | 9,550 |
| sports | 636 | 9,752 |
| the-arts | 599 | 12,916 |
| financial-aid-report | 572 | 9,630 |
| student-clubs | 520 | 7,110 |
| metric-values | 126 | 644 |
| financial-aid-tuition (content) | 27 | 1,061 |
| **TOTAL** | **5,914** | **84,253** |

Plus **320 UI-chrome keys** (~1,223 words) in `src/locales/bn.json` — copy
`en.json`, translate the values, keys stay identical.

### Phase 2 — verification, in this order

The Spanish rollout proved these catch **different** classes of bug, and that
skipping any one of them lets a whole class through:

1. ✅ `check_translations.mjs` — coverage and drift, all topics. 100%, no drift.
2. ✅ `check_chrome_keys.mjs` — every chrome-claiming skip resolves.
3. ✅ `check_hash_parity.mjs` — build-time and runtime stamps agree, 8 cases.
4. ✅ **Figure-integrity pass** — now `scripts/check_figures.py`. Clean across
   all nine work files. Bangla uses its own digits (০১২৩) — **do not** convert
   figures. See §4. Note its blind spot: it only sees `$`/`%`/years, so for
   provenance documents also check quoted-string and timestamp parity.
5. ✅ **Runtime resolution test** — all 5,904 overlay entries carry a hash and a
   translation, and every stamp recomputed from the live English matches its
   stored `of`, so the overlays resolve rather than silently falling back.
   Stage 7's `metricValues` bug read 100% while rendering English.
6. ⬜ **Full-page print-out** — the only check that catches render bugs. Spanish
   needed ~12 rounds; expect fewer here, but not zero. **Do this in a browser**
   — source-level checks pass while the page renders English.

### Phase 3 — flip `PROSE_TRANSLATED`  ⬜ not yet done

Add `'bn'` to both `TRANSLATED` and `PROSE_TRANSLATED` in `src/lib/i18n.ts`
only once the print-out is clean. `bn` is already in `SUPPORTED` with its font,
and `loadCatalog` picks `src/locales/bn.json` up from the glob automatically,
so no `resources` change is needed — this is a two-line edit.

---

## 4. Decisions to make before translating

Record the answer in `src/data/overlays/NOTES.md` as each is settled.

1. **Numerals — SETTLED 2026-07-28: Western digits, everywhere.** Bangla has
   its own (০১২৩৪৫৬৭৮৯), and the Phase 0 spike drifted into them twice —
   `SECTION 01` → `অধ্যায় ০১` and `LAST 3 SEASONS` → `সর্বশেষ ৩ মৌসুম` — while
   every dollar figure, year and Wayback timestamp in the same document stayed
   Western. That inconsistency inside one page is exactly the failure mode to
   avoid at 84k words.

   **Rule: never use Bangla digits.** Every number in this corpus is either a
   checkable citation a family matches against the school's own English page
   (tuition tables, Wayback timestamps, SAT scores, `2026–27`) or a figure
   `localizeMoneyText()` formats and which expects Western digits. Mixing the
   two numeral systems on one line reads as a typo, and switching wholesale
   would break the citations. Mirrors the Spanish rule: presentation may
   localise, the figure never changes.

   Worth flagging to the reviewer: Bangladeshi Bangla in practice uses both,
   and a Dhaka reader would not find `৩ মৌসুম` wrong in isolation. This is a
   consistency decision for a citation-heavy corpus, not a claim about the
   language.

2. **School and institution names.** `Charlotte Country Day School`,
   `Providence Day`, `NCISAA`, `Model United Nations` — keep in Latin script.
   A parent has to be able to search and say them. Same rule as Spanish.

3. **AP / IB course titles.** Spanish settled this: translate plain descriptive
   titles, keep anything a family must match against a published catalog
   (`AP English 11: Language & Composition`, `English 9`). Carry it forward.

4. **Transliterate or keep?** Bangla commonly writes English institutional
   loanwords in Bangla script (স্কুল for "school"). Decide once, corpus-wide,
   whether terms like *Upper School*, *Extended Day*, *Honor Society* are
   transliterated, translated, or kept Latin. **Recommendation: keep Latin for
   proper program names, translate generic nouns** — but a Dhaka reviewer
   should confirm, because this is the single most visible register choice.

5. **Verbatim quoted source strings stay English.** Unchanged from Spanish:
   markdown rate tables and Wayback quotes are citations, not prose.

---

## 5. Lessons carried from Spanish

Do not relearn these:

- **Read the component on the render path**, not grep. Grep cannot see bare JSX
  text, default parameter values, or template-composed strings.
- **Enumerate a field's distinct values before classifying it.** A leaf name
  describes the typical value, not all of them.
- **Coverage checkers can report 100% while the page renders English.** Always
  run a runtime resolution test.
- **A card can be fully translated and still be framed by English** — headings
  and teasers render outside the body.
- **Verify in the BUILT output**, not the source. See [[ffi-ligature-trap]]:
  `font-variant-ligatures` must stay `none`, and `ffi` is a *common* ligature.
- **Print-outs catch what checkers structurally cannot.** Five language-
  independent bugs surfaced this way during the Spanish rollout.

---

## 6. Review

One native-speaker review pass at the end, by a **Bangladeshi** Bangla speaker
— not a Kolkata speaker, for the reasons in §0. Terminology choices and soft
spots go in `src/data/overlays/NOTES.md` per topic, as they did for Spanish, so
the reviewer gets a list rather than 84k words of undifferentiated prose.
