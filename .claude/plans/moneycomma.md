---
name: moneycomma
title: Stop localizeMoneyText() from eating the comma after a figure and the trailing zeros of cents — in every locale, English included — and add a check that runs the real format.ts
status: implemented
phases: 1
created: 2026-10-04
branch: fix/moneycomma
prs: [327]
---

# Stop the money formatter from mutating figures

## Goal

Every money figure baked into the research prose is re-rendered at runtime by
`localizeMoneyText()` (`src/lib/format.ts`). Two defects make what renders differ from
what the school published:

1. **The comma after a figure disappears.** `a fee of $250, non-refundable` renders
   `a fee of $250 non-refundable`. In Italian it renders `250 USD non rimborsabile`, and
   `($850, $1,500, $9,000)` is broken too.
2. **Cents lose their trailing zero.** `$11.50/hr` renders `$11.5/hr`, `$1.00` renders
   `$1`, `$11,647.50` renders `$11,647.5`, and the abbreviated `$3.0M` renders `$3M`.

Both happen **in every locale, English included**. Both are pre-existing and app-wide.
The project's standing rule is that a figure is copied char-for-char because a parent
matches it against the school's own page, and these two render-time mutations break that
rule on every page.

**Done when** both render correctly in all ten locales, a new build-chained check runs the
**real** `format.ts` against the whole corpus and exits 0, and a browser check confirms
the fix on the pages listed in Verification.

## Context

**The comma bug.** `src/lib/format.ts:268`:

```ts
const withMoney = text.replace(/(≈)?\$(\d[\d,]*(?:\.\d+)?)([KM])?/g, (whole, approx, digits, suffix) => {
  const n = Number(digits.replace(/,/g, ''))
```

`[\d,]*` is greedy and also matches a comma followed by a space, so `$250,` captures
`250,`. `Number('250')` then rebuilds the figure through `money(n)`, and the comma is
gone. This hits English as well, because `money()` reformats in every locale. Measured
with the real module on 2026-10-04: `fees $2,175, as the school` → `fees $2,175 as the school`
(en), `fees 2.175 US$ as the school` (es).

Measured scale, by grepping for `\$\d[\d,]*,(?!\d)`:
- **33** occurrences in English source under `src/data/**/*.ts`. Files: `metricValues.ts`,
  `financialAidReports.ts`, and the `afterSchoolPrograms/`, `admissionsPrograms/` and
  `summer/` files for trinity-episcopal, charlotte-country-day and cannon.
- **327** in translated work-file `t` values: bn 69, te 59, it 46, fr 41, es 40, hi 39,
  ht 33. fa and ar have none, because they punctuate with `،`.

**The cents bug.** `money()` (`format.ts:134`) asks Intl for `maximumFractionDigits: 0`
and then **substitutes** the digits with `number(n)` (`format.ts:165`). `number(n)` is
`new Intl.NumberFormat(figureLocale(), { useGrouping: 'always' })`, which defaults to at
most 3 fraction digits with trailing zeros dropped, so `11.5` renders `11.5`. The suffix
branch (`$3.0M`) calls `number(n)` directly and has the same flaw. About 30 occurrences
were measured in `src/data` (`$1.00` ×6, `$11.50` ×7, `$180.00` ×6, `$11,647.50`,
`$3.0M` ×2, …), in `metricValues.ts`, `financialAidReports.ts`,
`afterSchoolPrograms/{cannon,providence-day}.ts`,
`admissionsPrograms/hickory-grove-christian.ts` and `summer/{cannon,charlotte-latin}.ts`.

**The fix, proven on a scratch copy of the real module** (Node 24, plain `node`, with
`./i18n.ts` replaced by a stub):

- Regex: `/(≈)?\$(\d+(?:,\d{3})*(?:\.\d+)?)([KM])?/g`. A grouping comma must now be
  followed by exactly three digits, so `$250,000,` keeps `250,000` and leaves the trailing
  comma alone. `$2500` still matches through `\d+`.
- Fraction length: `localizeMoneyText` passes the source's fraction-digit count through to
  `money()` and `number()`. Verified outputs:
  - `$250, non` → `$250, non` in en, and `250 US$, non` in es.
  - `($850, $1,500, $9,000)` → unchanged in en, and `(850 USD, 1.500 USD, 9.000 USD)` in it.
  - `$250,000, then` → `$2,50,000, then` in hi.
  - `≈$378/mo, or` → `≈378 US$/mes, or` in es.
  - `$3.25M, and` and `$220K, then` are unchanged in behaviour.

**Callers.** `money()` has **15 external callers** (`AfterSchool.tsx` ×4,
`FinancialAidReport.tsx` ×3, `SummerPrograms.tsx` ×8). All of them pass computed numbers
(prices, totals). They must keep today's output, so the new parameter is **optional**, and
leaving it out keeps exactly today's behaviour. `localizeMoneyText` is called from 9
components, 3 pages and `metricValues.ts`; its signature does not change.

**There is a mirrored copy of the logic.** `scripts/check_rtl_bidi.mjs:46–110`
re-implements `localizeMoneyText` on purpose: "Mirrors src/lib/format.ts. Kept in sync
deliberately", because format.ts "is not importable under plain Node". Its regex is at
L98. `scripts/check_currency_shape.mjs` mirrors only `currencyLeads()` and is unaffected.

**Why no existing check caught either bug.** `check:bidi`, `check:currency` and
`check:money` either mirror the logic or audit call sites. None of them runs the real
function over real data. `check_figures.py` and `check:sepdrift` compare data with data,
never with rendered output.

**The real `format.ts` CAN run under plain Node 24.** Its only imports are `./i18n.ts`
(which uses Vite's `import.meta.glob` and cannot load) and `./figureLocale.ts` (plain).
Copy `format.ts` and `figureLocale.ts` into a temp dir next to a stub
`i18n.ts` (`export default { resolvedLanguage: 'en', language: 'en' }`, mutated per
locale), and `node` imports `format.ts` directly through native type stripping. This was
verified during planning. `esbuild` is **not** a project dependency (`npx esbuild` only
works from a cache), so the check must not use it. `isRtl()` reads `document`, which is
undefined under Node, so the check runs LTR. That is fine, because RTL isolates are
`check:bidi`'s job.

## Decisions

- **Fix both defects in one plan** (user, 2026-10-04): same function, and the same defect
  class, where a rendered figure no longer matches the school's page.
- **Single-phase: this adds no user-facing text.** No string, key or overlay changes. Only
  render output changes, so there is no translation step.
- **The fraction count comes from the source token, never from a fixed `2`.** `$3.25M`
  keeps 2 digits, `$3.0M` keeps 1, and `$378` keeps 0. Copy what the school wrote.
- **`money(n)` and `number(n)` gain an optional `fractionDigits?: number`.** When it is
  given, set both `minimumFractionDigits` and `maximumFractionDigits` to it. When it is
  absent, the options object is unchanged, so the 15 component callers are byte-identical.
- **The new check runs the real module, not another mirror.** A third hand-kept copy would
  drift the way the reason for this plan did.
- **Chain the new check into `npm run build`** after `check:runtime`. It is fast and has
  no network, and the class it guards is silent.
- **Keep `check_rtl_bidi.mjs`'s mirror and update it.** Rewriting that checker to import
  the real module is a good follow-up, but it is not this plan.

## Approvals needed

**None.** This is a render-correctness fix. It adds no card, section, tile, Compare row,
metric key or topic, and changes no layout or styling. Output text changes only where it
was wrong.

This is **not** deploy authorization. Merge and stop.

## Out of scope

- `src/lib/prose.ts:1044` `VALUE_TOKEN`. It is anchored (`^…$`) to whole tokens and does
  not reformat, so it is a different mechanism.
- Rewriting `check_rtl_bidi.mjs` to import the real module.
- Any data edit. The source figures are already correct; only the renderer is wrong.
- Deploying.

## Steps

Single-phase — adds no user-facing text.

1. **Branch.** `git checkout main && git pull`, then `git checkout -b fix/moneycomma`.
   Set this plan to `in-progress`, here and in `INDEX.md`.

2. **Write the check first, and watch it fail on `main`'s code.** Create
   `scripts/check_money_text.mjs` and add `"check:moneytext": "node scripts/check_money_text.mjs"`
   to `package.json`.
   - **Loader:** `mkdtempSync` in `os.tmpdir()`. Copy `src/lib/format.ts`, or the path given
     by `--format <path>` (used for the negative test), together with
     `src/lib/figureLocale.ts`. Write the stub `i18n.ts`, then
     `await import(pathToFileURL(tmp/format.ts))`. If the import throws, for example
     because format.ts gained a new import, print one line naming the cause and exit **2**,
     not 1. Remove the temp dir in `finally`.
   - **Locales:** parse `TRANSLATED` from `src/lib/i18n.ts` source, the same technique
     `check_chrome_keys.mjs` uses. Never hardcode the list.
   - **Fixed cases** (every locale): each must keep the character after the figure, and keep
     the source's fraction digits after the locale's decimal separator:
     `fees $2,175, as`, `a fee of $250, non`, `($850, $1,500, $9,000)`, `$250,000, then`,
     `$1,018–$3,290, or`, `$11.50/hr`, `$1.00`, `$11,647.50`, `$3.0M`, `$3.25M, and`,
     `$220K, then`, `≈$378/mo, or`, `$36,500`, `$3,683,971.`.
   - **Corpus invariant 1, the comma:** for every input string, the count of `/,(?!\d)/`
     in the output must equal the count in the input. A rendered figure never ends in a
     comma, and every grouping or decimal comma Intl emits is followed by a digit.
   - **Corpus invariant 2, cents:** for every input token matching
     `\$\d+(?:,\d{3})*\.(\d+)`, the output must contain that fraction-digit string
     immediately after `.` or `,`.
   - **Corpus:** every `text` (under `en`) and every `t` (under its own locale) across
     `src/data/overlays/work/*.json`, plus every line of `src/data/**/*.ts` containing
     `$` followed by a digit (under `en`). The lines catch figure fields the extractor
     skips.
   - **Output:** a count per locale, the first 5 failures with input and output, and a
     non-zero exit on any failure. Exit 0 when everything is clean.
   - Run it now. **Expect it to FAIL**, with roughly 360 comma failures plus the cents
     cases. Record the counts for the implementation notes.

3. **Fix the regex** at `src/lib/format.ts:268`:
   `/(≈)?\$(\d+(?:,\d{3})*(?:\.\d+)?)([KM])?/g`. Above it, add a short comment saying why a
   grouping comma must be followed by three digits (`$250, non` used to lose its comma),
   in the style of the existing `≈` comment.

4. **Carry the fraction length.**
   - `number(n: number, fractionDigits?: number)`: when `fractionDigits` is defined, add
     `minimumFractionDigits` and `maximumFractionDigits` (both set to it) to the options.
   - `money(n: number, fractionDigits?: number)`: pass it to `number(n, fractionDigits)`.
     The `maximumFractionDigits: 0` on the Intl call that only supplies placement parts
     stays as it is, because only the numeric run is substituted.
   - In `localizeMoneyText`, compute
     `const fd = digits.includes('.') ? digits.split('.')[1].length : undefined`, then use
     `number(n, fd)` in the suffix branch, and `money(n, fd)` both in the plain return and
     inside the `near` (≈) isolate.
   - Extend the `money()` doc comment with one sentence saying why the parameter exists.

5. **Mirror both changes in `scripts/check_rtl_bidi.mjs`** (the regex at L98, and the
   `number`/`money` helpers above it), keeping its "Mirrors src/lib/format.ts" contract.

6. **Re-run `npm run check:moneytext` and expect exit 0.** Then run the negative test from
   the next section.

7. **Chain the check into the build.** In `package.json` `"build"`, insert
   `&& npm run check:moneytext` immediately after `npm run check:runtime`.

8. **Document it in `CLAUDE.md`.** In the i18n standard, after the sentence
   "Two new checks now close that class: `npm run check:currency` and `npm run check:money`.",
   add one short paragraph:
   > **`check:moneytext` is the only check that runs the REAL `format.ts`** (copied
   > beside a stub `i18n.ts` and imported under plain Node). It asserts that rendering
   > never eats the punctuation after a figure or the trailing zeros of cents. Both
   > shipped for months in every locale, including English, because every other money
   > check mirrors the logic or audits call sites.

9. **Verify** (see below), commit with explicit paths, push and verify the push, open the
   PR with `--body-file`, merge (`gh pr merge --squash --delete-branch`, pre-authorized),
   then `git checkout main && git pull`. Flip this plan to `implemented` with the PR number,
   and the INDEX row to *Implemented*. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `src/lib/format.ts` | regex at L268; optional `fractionDigits` on `number()` and `money()`; `localizeMoneyText` passes it |
| `scripts/check_rtl_bidi.mjs` | mirror the regex and fraction handling |
| `scripts/check_money_text.mjs` | new: runs the real format.ts against fixed cases and the whole corpus |
| `package.json` | `check:moneytext` script; chained into `build` after `check:runtime` |
| `CLAUDE.md` | one paragraph in the i18n standard |
| `.claude/plans/moneycomma.md`, `.claude/plans/INDEX.md` | status, PR, implementation notes |

## Verification

- [ ] Before the fix, `npm run check:moneytext` **fails**, with the comma and cents counts
      recorded.
- [ ] After the fix, `npm run check:moneytext` exits **0**.
- [ ] **Negative test (isolated):** copy the fixed `format.ts` to a temp path, restore only
      the old regex `\d[\d,]*` in the **copy**, and run
      `node scripts/check_money_text.mjs --format <copy>`. It must exit 1, and the printed
      failures must be **comma** failures. A second copy restores only the cents behaviour
      (drop the `fd` argument) and must print **cents** failures. Read which message
      printed; a failure for the wrong reason proves nothing.
- [ ] `npx tsc -b`: clean.
- [ ] `npm run build`: exits 0 with `check:moneytext` in the chain.
- [ ] `npm run check:bidi`, `check:currency`, `check:money`: all clean.
- [ ] **Browser check (required), real Chrome via Playwright** (`channel: 'chrome'`,
      `headless: false`, a dotfile script in the repo root deleted afterwards). Run
      `npm run build && npm run preview`, use `domcontentloaded` with a ~2.5s settle, and
      **force-open every `<details>`** first. Then assert these:
      - `en`, `/school/charlotte-country-day/`, Admissions: the text contains
        `$300, paid` (or `$300, separate`). Before the fix it read `$300 paid`.
      - `it`, `/school/hickory-grove-christian/`, Admissions, the Elementary band: contains
        `250 USD, non rimborsabile`.
      - `en`, `/school/trinity-episcopal/`, Financial Aid & Tuition card: contains `$11.50`.
      - `es`, the same card: contains `11,50 US$`.
      - `en`, `/school/charlotte-latin/`, Financial Aid card: `$3.0M` renders as `$3.0M`.
      - `fa`, `/school/hickory-grove-christian/`: figures still render inside LRI…PDI
        isolates, which shows the RTL path is undisturbed.
- [ ] Spot-check that the 15 direct `money()` callers are unchanged: the After School and
      Summer Programs price estimators on `/school/cannon/` show the same figures as on
      `main`, so whole dollars gain no `.00`.

## Risks

| Risk | Mitigation |
|---|---|
| A component caller starts showing `.00` | The parameter is optional, and leaving it out keeps today's options object. The browser spot-check covers the estimators |
| The new check's loader breaks when format.ts gains an import | It exits 2 with a one-line cause, kept separate from real findings |
| The mirror in `check_rtl_bidi.mjs` drifts again | Step 5 updates it; the real-module check is the backstop |
| `,(?!\d)` miscounts in a locale whose Intl output emits a comma before a non-digit | No locale in `TRANSLATED` does: the separators are `,` `.` NNBSP `٬`, each followed by a digit. The fixed cases would show it |

## Open questions

None.

## Implementation notes

- **Baseline, measured with the new check on the unfixed code:** 748 failing strings
  (distinct locale × string) across all ten locales. English had 56 comma and 82 cents
  failures, and each other locale had 5–62 comma and 33 cents failures. The check now
  deduplicates its inputs; its first run counted each English `text` once per locale's work
  file (×9). After the fix: **0**, over 6,236 money-bearing strings.
- **Negative tests isolated their assertions.** A copy with only the old regex produced
  comma findings only, at exactly the baseline counts. A copy with only `fd` forced to
  `undefined` produced cents findings only. `src/lib/format.ts` itself was never touched
  for either test.
- **The `CLAUDE.md` paragraph sits after the "Two new checks now close that class"
  sentence**, as planned. The sentence wraps across two lines there, so the edit went in by
  line rather than by string match.
- **Browser check (real Chrome) passed on every planned page:**
  - en Country Day: `($300, separate from…`
  - it Hickory Grove, Elementary: `250 USD, non rimborsabile`
  - en Trinity: `$11.50 per lunch`
  - es Trinity: `11,50 US$`
  - en Charlotte Latin: `$3.0M`
  - fa Hickory Grove: `⁦‎$500⁩`, still isolated
  
  Two first-pass "failures" were matcher errors. Intl places a no-break space between the
  figure and `US$`/`USD`. And Cannon's `$1.00 / min` late-pickup fee is a correct source
  figure that now renders as published, not a stray `.00` from a component caller.
- **Out of scope, noticed during the browser check:** Trinity's Financial Aid ledger row
  `Comida (FLIK) — por menú · $11.50` renders unlocalized in `es`, so that render site never
  calls `localizeMoneyText`. It is a separate issue from these two bugs.
