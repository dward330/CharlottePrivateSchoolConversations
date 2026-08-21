---
name: halfday
title: Translate 'Half day' — the one day-vocabulary value with no chrome key, rendering English in all nine locales
status: not-implemented
phases: 2
created: 2026-08-20
branch: i18n/half-day-chrome-key
prs: []
---

# Translate `'Half day'`, the one day-vocabulary value with no chrome key

## Goal

`'Half day'` is a value in `days` and `dayFilters` in
[`src/data/summer/charlotte-catholic.ts`](../../src/data/summer/charlotte-catholic.ts). Those
fields are deliberately **skipped** by the prose extractor on the written promise that UI
chrome renders them from a locale key. No such key exists for this value, so `dayLabel()`'s
`defaultValue` returns the raw English and the filter chip on Charlotte Catholic's Summer
Programs card reads **"Half day"** in Spanish, Bangla, Haitian Creole, Telugu, French, Farsi,
Italian, Hindi and Arabic alike.

Done when `node scripts/check_chrome_keys.mjs` exits **0**, the chip renders in the reader's
language in a browser in a non-English locale, and the checker's contract has been tightened
so the *next* value added to this vocabulary fails at author time rather than shipping.

## Context

### The defect, verified 2026-08-20

Five occurrences, all in `src/data/summer/charlotte-catholic.ts`:

| Line | Field |
|---|---|
| 51 | `dayFilters: ['Half day']` |
| 65 | `days: ['Half day']` (Cougar Basketball Camp) |
| 77 | `days: ['Half day']` (Eddie Hull Baseball Camp) |
| 89 | `days: ['Half day']` (Cougar Football Camp) |
| 102 | `days: ['Half day']` (Just4Kicks Soccer) |

`node scripts/check_chrome_keys.mjs` currently prints and exits **1** (confirmed by
`node scripts/check_chrome_keys.mjs >/dev/null; echo $?` → `1`):

```
✗ days → afterSchool.day_*
     "Half day" · "Mon" · "Tue" · "Wed" · "Thu" · "Fri"
     ^ NO LOCALE KEY for "Half day"
✗ dayFilters → afterSchool.day_*
     "All" · "Mon" · "Tue" · "Wed" · "Thu" · "Fri" · "Half day"
     ^ NO LOCALE KEY for "Half day"
```

**This is not a package.json script.** There is no `check:chrome` in `package.json` — run it
as `node scripts/check_chrome_keys.mjs`. It only became able to see this at all with PR #167
(the `checklive` plan), which replaced its five-topic map with the shared
`scripts/i18n_topics.mjs` and thereby gave it its first-ever read of the `summer-programs`
topic. The defect is pre-existing on `main`, not introduced by that PR.

### The render path

Both areas share one helper — identical code in two files:

- [`src/components/SummerPrograms.tsx:79-81`](../../src/components/SummerPrograms.tsx#L79)
- [`src/components/AfterSchool.tsx:77-79`](../../src/components/AfterSchool.tsx#L77)

```ts
function dayLabel(t: TFunction, day: string): string {
  return t(`afterSchool.day_${day}`, { defaultValue: day })
}
```

The key is **interpolated from the raw value**, so `'Half day'` looks for
`afterSchool.day_Half day` — a key that does not exist — and `defaultValue` silently returns
the English. That silence is the whole defect class: no error, no coverage change, nothing an
extractor or a stamp check can see.

**Where `'Half day'` actually reaches the page — one place, not five.**

- **`dayFilters`** → rendered, at
  [`SummerPrograms.tsx:298`](../../src/components/SummerPrograms.tsx#L298):
  `{d === 'All' ? t('summerPrograms.dayFilterAll') : dayLabel(t, d)}`. This is the filter
  chip. **This is the visible defect.**
- **`days`** → **not rendered**. In the summer catalog it is a filter-match token array only
  ([`SummerPrograms.tsx:228`](../../src/components/SummerPrograms.tsx#L228):
  `const dayOk = day === 'All' || c.days.includes(day)`). The "when" column at
  [line 349](../../src/components/SummerPrograms.tsx#L349) renders `c.dayLabel`, a *different*
  field holding `'June 8–11'`, `'July'` etc.

  (In After School the sibling scalar `c.day` **is** rendered, at
  [`AfterSchool.tsx:649`](../../src/components/AfterSchool.tsx#L649). No After School data
  file carries `'Half day'`, so nothing there is affected today.)

So `days` and `dayFilters` must **match each other by value** for the filter to work, and one
of the two is displayed. That coupling is what rules out design option (c) below.

### The vocabulary today, measured app-wide

The complete set of distinct values across `day`, `days` and `dayFilters` in all of
`src/data/**`:

```
"All"  "Mon"  "Tue"  "Wed"  "Thu"  "Fri"  "—"  "Half day"
```

`'Half day'` is the **only** non-weekday member — and it is a **duration**, not a weekday. It
is a different kind of thing living in a weekday-vocabulary field: exactly CLAUDE.md's
recurring *"a sentence wearing an identifier's clothes"* shape, one notch milder (a phrase
rather than a sentence).

`'—'` and `'All'` are deliberately exempt — see the `exempt` lists in
[`scripts/check_chrome_keys.mjs:54-57`](../../scripts/check_chrome_keys.mjs#L54); `'All'` is a
filter sentinel compared against rather than displayed, and has its own keys
(`summerPrograms.dayFilterAll` / `afterSchool.dayFilterAll`).

Charlotte Catholic is also the **only** school with a non-empty summer `dayFilters` — every
other `src/data/summer/*.ts` has `dayFilters: []`. So this one chip is the entire user-visible
blast radius.

### Why the value is what it is

The source record supports it as a real, deliberate fact rather than sloppy data —
`source-material/summer-programs/charlotte-catholic/Charlotte Catholic - Summer Programs -
2026 Camp Catalog.md:83`:

> every CCHS camp is a **half-day block** (3–4 hours). There is no wrap-around or full-day
> care.

CCHS publishes no weekday pattern for any camp, so the day axis carries the one thing it does
publish. The data is right; the chrome is missing.

### The existing key set

`src/locales/en.json` (`afterSchool` block, lines 209–214) holds `day_Mon`, `day_Tue`,
`day_Wed`, `day_Thu`, `day_Fri` and `dayFilterAll`. All nine other catalogs carry the same
five, correctly translated — e.g. `es` `Lun/Mar/Mié/Jue/Vie`, `fr` `lun./mar./mer./jeu./ven.`,
`ar` `الاثنين…`, `hi` `सोम…`. So the pattern to follow is established and complete; this plan
adds a **sixth** member to it.

### Two verified facts that unblock the design choice

1. **An i18next key containing a space resolves.** Tested against the repo's own i18next:
   `t('afterSchool.day_Half day')` returned the value from a nested `afterSchool` object with
   the literal key `'day_Half day'`. The default `keySeparator` is `.`, so a space is not a
   separator and nothing needs escaping. Both the space form and an underscore-slug form work.
2. **Locale-catalog key parity is currently perfect** — all nine locales have zero missing
   keys against `en.json`. (`ar.json` has 68 *extra* keys; every one is an Arabic plural form
   `_zero/_two/_few/_many`, verified by suffix, so it is not drift.) A new key must therefore
   land in all ten files or it becomes the first parity gap.

### Nothing else guards this

`check_chrome_keys.mjs` reads **only `src/locales/en.json`**. It is the only script under
`scripts/` besides `i18n_fields.mjs` that reads `src/locales/` at all — so *no check in this
repo verifies that a chrome key exists in the other nine catalogs*. A Phase-2 miss would be
invisible to every automated check, which is why Phase 2's verification below reads the
catalogs directly.

## Decisions

### The design choice — recommendation, with reasoning

Three options were considered. **Take (a).**

**(a) — RECOMMENDED. Add a locale key for the value, keeping it in the day vocabulary, and
give `dayLabel()` a value→key-slug mapping.**

Add `afterSchool.day_HalfDay` (or the space form; see below) to all ten catalogs, and slug
the interpolated value in `dayLabel()` so a value with a space produces a well-formed key.

Why this and not the others:

- **It is the smallest change that makes the promise true.** The field's skip description
  already claims chrome ownership; the fix is to supply the chrome, which is precisely what
  `check_chrome_keys.mjs` was written to demand. Nothing about the classification was wrong —
  `'Half day'` *is* a closed-vocabulary token, identical for every school that would ever use
  it, and it does not belong in the per-school prose overlay.
- **It preserves the filter coupling.** `days` and `dayFilters` are compared by value
  ([`SummerPrograms.tsx:228`](../../src/components/SummerPrograms.tsx#L228) and
  [`:294`](../../src/components/SummerPrograms.tsx#L294)); the English token stays the state
  value and only the *label* is translated, which is exactly how `'All'` is already handled
  and is documented as such in the `AfterSchool.tsx` comment at line 592.
- **It scales to the next value.** A slug mapping plus a tightened checker (step 5) turns
  "someone adds `'Full day'` or `'Evening'`" from a silent English leak into a loud failure.

**(b) — Rejected: treat it as a separate field/concept.** Introduce e.g. a `duration` axis and
move `'Half day'` out of the day vocabulary. This is arguably the *conceptually* cleanest —
the value genuinely is a duration — but it is a **UX change**: a new filter axis (or the
removal of Charlotte Catholic's only day chip) alters the rendered card and therefore trips
CLAUDE.md's UX-design gate, needing the user's prior approval. It also costs a type change to
`Camp`/`CampCatalog` in [`src/data/summerPrograms.ts:86-115`](../../src/data/summerPrograms.ts#L86),
edits to both components, and a data migration — all to fix one string in one school's card.
The cost/benefit is plainly wrong for a defect this size, and the coupling argument above
means the day axis would then be *empty* for Charlotte Catholic, so the chip disappears
entirely — a product decision nobody asked for.

**(c) — Rejected: drop `'Half day'` from `dayFilters` and leave it only in `days`.** The chip
vanishes, the checker still fails on the `days` leaf, and Charlotte Catholic loses its only
day filter. This trades a visible defect for a data deletion and does not even clear the
check. Not viable.

**Note the recommendation is (a) *with* a slug mapping, not (a) bare.** Adding a literal
`"day_Half day"` key would work — verified above — but it makes the key set inconsistent
(five keys are code-shaped, one has a space), it is fragile against a future value with
punctuation, and it reads as an accident in a translator's file. Slugging is one line.

### Other decisions

- **Key name: `afterSchool.day_HalfDay`.** Keeps the existing `afterSchool.day_*` namespace,
  which both components already share deliberately ("the words are the same words" —
  `SummerPrograms.tsx:70-77`). PascalCase after the prefix so the slug rule is trivially
  `value.replace(/[^A-Za-z0-9]/g, '')`-shaped and reversible by eye.
- **Slug in `dayLabel()`, not at the call sites.** Both copies of the helper change
  identically; the call sites keep passing raw values, and the state/filter comparisons stay
  on the English token.
- **English wording: `Half day`** — unchanged from the data value, so the English page is
  byte-identical after Phase 1. That is deliberate: it makes Phase 1's browser check a pure
  regression check (nothing should *look* different in English), and it means the only thing
  the user reviews is the string that goes to the translators.
- **Tighten the checker's contract (step 5), in the same PR.** Recommendation: make
  `check_chrome_keys.mjs` a **build gate**. See *Open questions* for the alternative.
- **Two phases.** A new `src/locales/*.json` key is user-facing text by CLAUDE.md's i18n
  standard, so Phase 1 ships English and stops.

## Approvals needed

**None.**

Adding a locale key for a string the app **already renders** is not a new card, section,
sub-section, stat tile, Compare row, metric key or topic, and it does not reorder or restyle
anything. The chip at `SummerPrograms.tsx:298` exists today and will occupy the same place
with the same English wording after Phase 1 — only its non-English rendering changes. Under
CLAUDE.md's UX-design gate this is enrichment of an existing surface, which is explicitly
allowed.

This is worth stating rather than skipping, because the *rejected* option (b) — a separate
duration axis — **would** have needed approval, and the reason it was rejected is partly that.

## Out of scope

- **Any change to `src/data/summer/charlotte-catholic.ts`.** The data is correct and
  source-backed; this is a chrome fix.
- **The overlay layer (`src/data/overlays/**`).** `days`/`dayFilters` stay in `SKIP_KEYS` —
  the classification was right. Nothing in `PROSE_TRANSLATED` changes. Getting this layer
  wrong is the standing trap: **this is a `src/locales/*.json` chrome fix, not a prose overlay
  fix.**
- **Introducing a duration/`'Full day'` axis** (option b). Recorded as considered and
  rejected, not deferred work.
- **The four advisory findings from `i18n_audit_skips.mjs`** that PR #167 newly surfaced.
  Separate matter.
- **Wiring `i18n_audit_skips.mjs` into `package.json`.** Only `check_chrome_keys.mjs` is in
  question here (step 5).

## Steps

**Two phases** — this adds a user-facing string (`afterSchool.day_HalfDay`) to the locale
catalogs. Phase 1 is English only; `/implement` stops for the user's review before any other
locale is touched.

### Phase 1 — English

1. **Branch** — `i18n/half-day-chrome-key` off current `main`.

2. **Record the baseline.** Run and save the output of:
   ```bash
   node scripts/check_chrome_keys.mjs; echo "exit=$?"
   ```
   Expect `exit=1` with the two `✗` blocks quoted in Context. This is the before-state the
   fix is measured against.

3. **Add the key to `src/locales/en.json`** — inside the existing `afterSchool` block, beside
   `day_Fri`/`day_Mon`/… (lines 209–214). The block is alphabetically sorted, so
   `"day_HalfDay": "Half day"` sorts between `"day_Fri"` and `"day_Mon"`. Match the file's
   existing 2-space indentation and quoting exactly; do not reformat the file.

4. **Slug the value in `dayLabel()` — both copies.** In
   [`src/components/SummerPrograms.tsx:79`](../../src/components/SummerPrograms.tsx#L79) and
   [`src/components/AfterSchool.tsx:77`](../../src/components/AfterSchool.tsx#L77), which are
   currently byte-identical and must stay so:

   ```ts
   function dayLabel(t: TFunction, day: string): string {
     return t(`afterSchool.day_${day.replace(/[^A-Za-z0-9]/g, '')}`, { defaultValue: day })
   }
   ```

   The five weekday codes are unaffected (already alphanumeric); `'—'` slugs to the empty
   string, which finds no key and falls through to `defaultValue: day` — the same `'—'` it
   renders today. Verify that em-dash behaviour explicitly; it is the one value the slug
   changes the lookup for.

   **Extend the existing doc comment above each helper** (`SummerPrograms.tsx:70-78`,
   `AfterSchool.tsx:68-76`). Today it says the vocabulary is "a closed five-value vocabulary
   (Mon…Fri)". That is now false. Say instead that the vocabulary is closed but no longer
   weekdays-only, that `'Half day'` is a duration Charlotte Catholic uses because it publishes
   no weekday pattern, that the raw value is slugged into the key so a value with a space
   still resolves, and that **`check_chrome_keys.mjs` is what stops the next such value
   shipping as English.**

5. **Tighten the checker's contract so the next value fails loudly.** In
   [`scripts/check_chrome_keys.mjs`](../../scripts/check_chrome_keys.mjs):

   a. **Teach `CLAIMS` the slug**, so the checker computes the same key the component does.
      The `CLAIMS` rows already support an optional `map` (used by the `basis` row at line 59
      and applied at line 183). Add it to the three day rows:
      ```js
      const daySlug = (v) => v.replace(/[^A-Za-z0-9]/g, '')
      { leaf: 'day',        prefix: 'afterSchool.day_', exempt: ['—'], map: daySlug },
      { leaf: 'days',       prefix: 'afterSchool.day_', exempt: ['—'], map: daySlug },
      { leaf: 'dayFilters', prefix: 'afterSchool.day_', exempt: ['All', '—'], map: daySlug },
      ```
      Keep the `map` definition adjacent to the component's, with a comment naming both
      `dayLabel()` sites, so the two cannot drift apart unnoticed.

   b. **Add the tightening that matters — check every locale, not just English.** Today
      `hasKey()` reads only `src/locales/en.json` (line 65), so a key present in `en` and
      missing from the other nine passes clean. That is exactly the Phase-2 failure mode this
      plan can produce, and nothing else in `scripts/` would catch it (no other script reads
      `src/locales/` except `i18n_fields.mjs`). Load every catalog named by `TRANSLATED` in
      `src/lib/i18n.ts` — **parsed from that file, not hardcoded**, the same
      drift-resistance rule `check_seo.mjs` already applies to `LOCALES` — and report a
      missing key per locale.

      Because Phase 1 deliberately ships `en` alone, this **will** report nine missing keys
      at the end of Phase 1. That is correct and expected: it is the check announcing that
      Phase 2 has not run yet. Give the per-locale finding its own distinct message and a
      **separate exit-code path** so it can be read as "translation pending" rather than
      "broken promise" — see Verification for the exact expected states.

   c. **Make an unlisted value a hard failure with an actionable message.** The existing
      message already says the raw English reaches the page; add the missing half — that a
      new member of a chrome vocabulary needs a key in every catalog *and* a `CLAIMS`/`map`
      review, and name `src/locales/en.json` and this file as the two places to edit.

6. **Wire it into the build.** Add `"check:chrome": "node scripts/check_chrome_keys.mjs"` to
   `package.json` scripts, and append `&& npm run check:chrome` to the `build` script (which
   today ends `… && npm run check:ncsuper && npm run check:live`).

   **Gate this on the check being green.** During Phase 1 it will not be — step 5b makes it
   report nine pending locales. So: add the `check:chrome` script entry in Phase 1, but do
   **not** add it to `build` until Phase 2 (step 10). If the per-locale finding is given a
   non-blocking exit path in 5b, chaining it in Phase 1 is acceptable; the implementer picks
   one and says which in the PR body. Never leave `build` red at the Phase-1 stop.

7. **Phase-1 browser check** — see Verification. English must be **visually unchanged**.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until the user confirms the English wording (`Half day`) is what they want. If they want
different wording — `Half-day`, `Half day only`, `Half-day camps` — that changes the `en`
value in step 3 and, if they want the *data* to match, is a separate decision to raise before
Phase 2, since the data value is source-backed and out of scope here.

### Phase 2 — Every other locale

Only after that confirmation.

**Layer: the UI-chrome catalogs.** `src/locales/<lang>.json` for the nine locales in
`TRANSLATED` (`src/lib/i18n.ts:108`, minus `en`):

```
es  bn  ht  te  fr  fa  it  hi  ar
```

**Not** the overlay layer, and **not** `PROSE_TRANSLATED` — no `src/data/overlays/**` file is
touched by this plan.

8. **Add `afterSchool.day_HalfDay` to each of the nine catalogs.** Insert into the existing
   `afterSchool` block in alphabetical position beside that file's existing `day_*` keys.

   **Translate to the sense "a half-day session/block", not a literal calendar phrase.** The
   value labels a filter chip meaning *these camps run a half-day block of 3–4 hours*. Match
   each locale's established register in the same file — the five weekday keys are the direct
   precedent, and the neighbouring `afterSchool.daysUntilPickup_*` strings show each locale's
   wording for day-length concepts.

   Locale-specific care, per the rollout docs in `.claude/docs/`:
   - **`ar` and `fa` are RTL.** The string is pure prose with no figures or Latin
     identifiers, so no LRI/PDI isolate is required — but confirm in the browser rather than
     assuming (`prose-translation-fa.md`).
   - **`hi`/`te`/`bn`** carry no digits here, so no lakh/crore or numeral concern applies.
   - **No figure appears in this string**, so `check:figures` / `check:sepdrift` have nothing
     to say about it — do not expect them to move.

9. **Do not add plural variants.** The string is not counted; `ar`'s 68 extra `_zero/_two/
   _few/_many` keys all belong to genuinely pluralised strings (`colDays`,
   `daysUntilPickup`). Adding a bare `day_HalfDay` to `ar` keeps parity at
   *0 missing / 68 extra*, unchanged.

10. **Chain `check:chrome` into `build`** (deferred from step 6) once the check is fully
    green across all ten catalogs.

11. **Record the rule where the next author will read it.** Add a short entry to `CLAUDE.md`
    under the i18n standard: that `day`/`days`/`dayFilters` are a **closed chrome vocabulary
    that is no longer weekdays-only**, that every member needs a key in **all ten** catalogs,
    that the value is slugged into the key so spaces and punctuation are safe, and that
    `npm run check:chrome` is the gate. One or two sentences — this belongs beside the
    existing note about skipped fields that ship English.

## Files touched

| File | Change |
|---|---|
| `src/locales/en.json` | edit — add `afterSchool.day_HalfDay: "Half day"` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — add the translated key, 9 files (Phase 2) |
| `src/components/SummerPrograms.tsx` | edit — slug the value in `dayLabel()` (~line 79); update the doc comment above it |
| `src/components/AfterSchool.tsx` | edit — identical change (~line 77) |
| `scripts/check_chrome_keys.mjs` | edit — `map: daySlug` on the three day `CLAIMS` rows; check all `TRANSLATED` catalogs, not just `en`; sharper failure message |
| `package.json` | edit — add `check:chrome`; chain into `build` (Phase 2) |
| `CLAUDE.md` | edit — record the vocabulary rule and the new gate |

**Not touched:** `src/data/summer/charlotte-catholic.ts`, `scripts/i18n_fields.mjs`
(`SKIP_KEYS` classification is correct and stays), any `src/data/overlays/**` file.

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean
- [ ] `node scripts/check_chrome_keys.mjs` — the two `✗` blocks for `days` / `dayFilters` are
      **gone**. English resolution for `'Half day'` succeeds. Per step 5b the run will also
      report the nine locales as pending; confirm that message names the locales explicitly
      and is distinguishable from a genuine broken promise.
- [ ] `npm run build` — succeeds (do not chain `check:chrome` into `build` if it would fail
      the Phase-1 stop; see step 6)
- [ ] `npm run check:seo` — pre-render/`<head>` surface unaffected
- [ ] **Em-dash regression, explicitly.** The slug turns `'—'` into `''`. Confirm every
      After School row whose `day` is `'—'` still renders `—` and not an empty cell or a key
      string. `src/data/afterSchoolPrograms/charlotte-latin.ts:263-265` is the ready example
      (`Atomz Lab`, `Book Adventures`, `Cheer` all carry `day: '—'`) — load
      `/school/charlotte-latin/` After School and read that column.
- [ ] **Browser check — English must be visually UNCHANGED.** `npm run preview`, then
      `/school/charlotte-catholic/` → Summer Programs. The day filter chip still reads
      **"Half day"**, still filters all four camps, and the "when" column still shows
      `June 8–11` / `June 2–5 · June 9–12 · July 21–24` / `July` / `Not published`. Also load
      a school with real weekday chips — `/school/providence-day/` and `/school/cannon/`
      After School — and confirm `Mon`…`Fri` are unchanged.

### Phase 2 — Locales

- [ ] **`node scripts/check_chrome_keys.mjs` exits 0.** This is the success criterion for the
      whole plan. Confirm with `node scripts/check_chrome_keys.mjs >/dev/null; echo $?` → `0`
      (the exit code is set via `process.exitCode`, so a bare pipe through `tail` will show
      `0` misleadingly — check it unpiped).
- [ ] **Locale parity, measured directly** — every catalog has zero keys missing against
      `en.json`, and `ar` still has exactly its 68 plural extras:
      ```bash
      python3 - <<'PY'
      import json
      def flat(d,p=''):
          out=set()
          for k,v in d.items():
              n=f'{p}.{k}' if p else k
              out |= flat(v,n) if isinstance(v,dict) else {n}
          return out
      e=flat(json.load(open('src/locales/en.json')))
      for l in ['es','bn','ht','te','fr','fa','it','hi','ar']:
          o=flat(json.load(open(f'src/locales/{l}.json')))
          print(l,'missing',len(e-o),'extra',len(o-e))
      PY
      ```
      Expect `missing 0` for all nine, `extra 0` for eight and `extra 68` for `ar`.
- [ ] `npm run check:runtime` — unchanged; no overlay stamp is touched by this plan, so any
      movement here means something out of scope was edited
- [ ] `npm run check:translations` — unchanged
- [ ] `npm run check:live` — unchanged (0 in all nine, per PR #167)
- [ ] `npm run check:bidi` and `npm run check:fa` — pass, for the two RTL catalogs
- [ ] `npm run build` — succeeds with `check:chrome` chained in
- [ ] **BROWSER CHECK — the step this plan exists for, and the one no script can do.**
      CLAUDE.md's standing lesson is that every defect found after the data read 100% has
      been render-layer. With `npm run preview`, load

      ```
      /school/charlotte-catholic/?lang=<code>
      ```

      for **all nine** locales, scroll to **Summer Programs**, and for each confirm:
      1. the day filter chip reads in that locale's script — **not** the English "Half day";
      2. clicking it still filters to all four camps (the English token is the state value,
         so a broken translation would break filtering — check, don't assume);
      3. the chip does not wrap or overflow its row. The Bangla, Telugu, Hindi and Arabic
         renderings are typically wider than Latin, and this chip sits in a `.as-filters`
         row beside the category and grade chips;
      4. for `ar` and `fa`, the chip reads right-to-left and sits correctly in the RTL row.

      Do this in a **real browser**, not headless — the repo has a recorded case of a
      headless render passing while a real print-out found a currency bug.
- [ ] **Spot-check one weekday locale page for regression** —
      `/school/providence-day/?lang=fr` After School: `lun.`…`ven.` still render.

## Risks

| Risk | Mitigation |
|---|---|
| The slug changes lookup for `'—'` and blanks a cell | Explicit em-dash check in Phase-1 verification; `''` finds no key and falls to `defaultValue: day`, which is the current behaviour — but confirm it in the browser rather than reasoning about it |
| A translated label breaks the filter, which compares English tokens | Only the *label* is translated; state and `includes()` stay on the raw value, exactly as `'All'` already works (`AfterSchool.tsx:592` comment). Phase-2 browser check clicks the chip |
| The key lands in `en` and is forgotten in one locale | Step 5b makes the checker read all `TRANSLATED` catalogs — today nothing does. The parity script in Phase-2 verification is the second guard |
| The two `dayLabel()` copies drift apart | They are byte-identical today and step 4 changes both; the `CLAIMS` comment in step 5a names both sites |
| Chaining `check:chrome` into `build` turns the Phase-1 stop red | Step 6 defers the `build` wiring to Phase 2, or requires a non-blocking exit path for the pending-locale finding |
| Someone later adds `'Full day'` or `'Evening'` and it ships English again | That is what step 5 exists for — the checker fails on any unlisted value, and step 6 makes it a build gate. **This is the durable half of the plan; the key itself is the one-line half** |

## Open questions

- **Will other schools gain non-weekday day values?** Plausible, and the plan assumes yes.
  `'Half day'` arrived because CCHS publishes a duration and no weekday pattern — a common
  shape for community sports camps, and eight of the ten schools currently have an empty
  summer `dayFilters`, so the axis is mostly unpopulated rather than settled. `'Full day'`,
  `'Morning'`, `'Afternoon'`, `'Weekends'` are all realistic next members. **Default:** build
  for it — take option (a) with the slug and the tightened checker (steps 4–6) rather than
  hardcoding one key, so the *next* value costs one catalog line per locale and fails loudly
  until it gets them.
- **Should `check:chrome` be a blocking build gate, or advisory?** The `checklive` plan
  deliberately left this script unwired, and `check_translations.mjs` documents an explicit
  "advisory, not CI-blocking" posture for a layer that drifts by design. But this vocabulary
  does **not** drift by design — it is closed, it changes only when someone deliberately adds
  a value, and the whole failure mode is that nobody notices. **Default: make it a blocking
  gate** (step 6/10). If the user prefers advisory, add the `check:chrome` script entry, skip
  the `build` chaining, and say so in the PR body.
- **Should the English wording be `Half day` or `Half-day`?** The data value and the source
  record both say half-day/half day. **Default:** keep `Half day`, byte-identical to the data
  value, so Phase 1 is a pure no-visible-change commit. Raise it at the Phase-1 review — it is
  precisely the kind of wording call the English-first stop exists for.
