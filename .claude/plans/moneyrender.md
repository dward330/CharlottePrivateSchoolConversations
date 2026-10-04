---
name: moneyrender
title: Route every render site that shows a baked $ figure through localizeMoneyText() — ~363 unlocalized figures across ~25 sites in 12 files — and add a rendered-page census that catches the next one
status: implemented
phases: 1
created: 2026-10-04
branch: fix/moneyrender
prs: [328]
---

# Localize every money figure the app renders

## Goal

Research data writes money US-style (`$11.50`), and `localizeMoneyText()`
(`src/lib/format.ts`) re-renders it in the reader's convention (`11,50 US$` in es,
`11,50 $US` in fr, `11,50 USD` in it). That only works when every path to the screen calls it.
**A rendered-page census on 2026-10-04 found 363 `$` figures that reach the Spanish page
unlocalized, across 25 distinct render sites.** One example: Trinity's Financial Aid row
`Comida (FLIK) — por menú · $11.50` sits two lines from the same figure rendered correctly in
prose, `11,50 US$`. The page shows one figure two ways.

**Done when** the census reports **0** unlocalized figures on every school page, the
Compare page and the admissions checklists in `es` and `fr`, and English renders no
figure differently except for added digit grouping (see Decisions).

## Context

**How the census works.** It is the detector this plan turns into a script (step 2). In
`es`, `fr` and `it`, a localized figure puts the currency AFTER the number (`250 US$`), so
**any `$` followed by a digit in their rendered text is a figure that skipped
localization.** Run against a real build in real Chrome: every `<details>` forced open,
every admissions band tab clicked, each school page, `/compare/` for five money topics, and
`/school/<slug>/admissions-checklist/?band=…`. It walks DOM text nodes and records each
one's class chain. The planning run's raw output is in Appendix A.

**Why `check:money` misses all of it.** `scripts/check_money_render_paths.mjs` greps JSX
for `{…}` expressions whose identifier sounds like money (`value|price|fee|amount|val|total|cost|figure`).
Every site below renders a field called `label`, `text`, `title`, `detail`, `action`,
`teaser`, `delta`, `cell` or `note`, and those names do not match. An identifier grep cannot see this
class at all, which is why the guard has to look at rendered output.

**Render sites found** (count = distinct text nodes in `es`; file:line from `main` at
`2c688c35`):

| Count | CSS class | Render site |
|---|---|---|
| 112 | `prose-table` (100 lede + 12 section) | `src/components/ProseContent.tsx`: `linkify()` → `emphasize()` (L30, used for `para`, list items, table `th`/`td` at L137). **Not one ProseContent path localizes**, paragraphs included. |
| 57 | `fa-component` | `FinancialAidReport.tsx:280`, `{c.label}` in `ComponentGrid` (the FLIK row) |
| 45 | `adx-row-action` / `adx-row-body` | `src/pages/AdmissionsChecklist.tsx:138–139`, `{r.action}` / `{r.detail}` |
| 25 | `text-muted < as-td` | `AfterSchool.tsx` / `SummerPrograms.tsx` table detail cells (find the `as-td` muted spans) |
| 21 | `tip-body` | `src/components/CellQual.tsx:105`, `{qual.text}` (Compare tooltips) |
| 13 | `topic-teaser` | `src/pages/SchoolDetail.tsx:1063/1089/1120/1152`, `{d.teaser}` |
| 11 | `as-lead` | `AfterSchool.tsx:115`, `SummerPrograms.tsx:112` |
| 9 | `text-muted < as-lead` | `AfterSchool.tsx` / `SummerPrograms.tsx`, a muted span inside the lead |
| 9 | `adx-disclaimer` | `AdmissionsChecklist.tsx:166` |
| 9 | `adx-callout` | `AdmissionsChecklist.tsx:128` |
| 8 | `as-tl-tier` | `AfterSchool.tsx:205/225`. Also `title={r.flatLabel}`, an attribute |
| 7 + 7 | `tag-accent` / `tag-neutral` in `cs-chips` | `CollegeSupport.tsx:653` (and the neutral sibling) |
| 4 | `adm-step-title` | `AdmissionsProgram.tsx:144`, `{s.title}` |
| 3 + 1 | `fa-questions` | `FinancialAidReport.tsx:460` |
| 3 | `as-note` | `AdmissionsProgram.tsx:280` / `AfterSchool.tsx:581/713` / `SummerPrograms.tsx:236`. Check which one holds `$` |
| 3 | `adm-deadline-label` | `AdmissionsProgram.tsx:117` |
| 3 + 1 | `stat-tile-label` | `FinancialAidReport.tsx:445/478` (and `AdmissionsProgram.tsx:429` if it holds `$`) |
| 2 | `cs-lead` | `CollegeSupport.tsx:97` |
| 2 | `cs-stat-label` | `CollegeSupport.tsx:125` |
| 2 | `arts-enrich-row` | `ArtsProgram.tsx:123` |
| 1 | `fa-bar-delta` | `FinancialAidReport.tsx:134`, `{b.delta}` (`+$950`) |
| 1 | `adm-rule-text` | `AdmissionsProgram.tsx:238` |
| 1 | `arts-check` | `ArtsProgram.tsx:354` |
| 1 | `cs-check-row` | `CollegeSupport.tsx:862` |
| 1 + 1 | `as-estimate-row` | `AfterSchool.tsx:460`, `SummerPrograms.tsx:564`, `{…panelLabel}` |

The line numbers are a map, not the spec. **The census is the spec**: a site is done when
the census stops reporting it.

**Wrapping is safe to repeat in practice, but do it once.** `localizeMoneyText` output in
`es`/`fr`/`it` contains no `$` followed by a digit, so a second pass is a no-op. In
`ht`/`hi`/`te` the figure keeps a leading `$`, and a second pass re-parses `$36,83,971` as
`$36`, so the output is the same. In `fa`/`ar` a second pass **nests** the LRI…PDI
isolates. That is harmless to read, but it is untidy and `check:bidi` does not expect it.
So **wrap at exactly one layer, the leaf that renders text.** Where a component's
`RichText` helper already localizes (`FinancialAidReport.tsx:33`), do not wrap its input
as well.

**Precedent.** `FinancialAidReport.tsx:23–34` is the model. Its `RichText` splits on
`**bold**` and runs `localizeMoneyText` over every segment. Several components already
have a local `RichText` or emphasis splitter; reuse it where it exists rather than
adding a second one.

**English changes slightly, by design.** `localizeMoneyText` in English re-groups an
ungrouped figure (`$2500` → `$2,500`) and is otherwise the identity (PR #327 fixed the
comma and cents cases). That is the treatment every already-localized site gives English
today. Expect a handful of `$NNNN` → `$N,NNN` changes in English and nothing else.

## Decisions

- **Fix the whole class, not just the FLIK row** (user, 2026-10-04: "plan and fix that
  issue"). The FLIK row is one of 363, and its site alone renders 57.
- **Single-phase: adds no user-facing text.** No string, key or overlay changes. Render
  only.
- **`ProseContent`: localize inside `emphasize()`**, on its plain string segments only.
  This covers paragraphs, lists and table cells in one place, and **never touches URLs**:
  `linkify` splits URLs out before `emphasize` runs, and an href must not be rewritten.
- **The guard is a rendered-page census, not a wider identifier grep.** Widening
  `SUSPECT` to `label|text|title|detail` would flag hundreds of non-money fields and park
  `check:money` at a permanent non-zero count, which is the failure mode `CLAUDE.md`
  records three times.
- **The census is NOT chained into `npm run build`.** It needs a preview server and a real
  browser. It is a required verification step for this plan, and documented as the check
  to run after adding a render site or a locale. It exits 0 when clean, so it never sits
  at a permanent non-zero count.
- **`title=` attributes count.** A tooltip is read text. The census reads `title` and
  `aria-label` attributes as well as text nodes.

## Approvals needed

**None.** This is a render-correctness fix. It adds no card, section, tile, row, key or
topic, and changes no layout or styling.

This is **not** deploy authorization. Merge and stop.

## Out of scope

- Any data edit. The source figures are correct.
- `check:money`'s identifier grep stays as it is (see Decisions).
- `src/locales/*.json` chrome strings that contain `$`, if any. The census will show them;
  record any found in the Implementation notes.
- Deploying.

## Steps

Single-phase — adds no user-facing text.

1. **Branch.** `git checkout main && git pull`, then `git checkout -b fix/moneyrender`.
   Set this plan to `in-progress`, here and in `INDEX.md`.

2. **Write the census: `scripts/audit_money_render.mjs`**, with
   `"audit:moneyrender": "node scripts/audit_money_render.mjs"` in `package.json`. Base it
   on Appendix B, which is the planning-time script, verified working. Requirements:
   - Takes `--base <url>` (default `http://localhost:4173`, the `vite preview` default) and
     `--lang <code>`, which may be repeated (default `es` and `fr`). Reject `en`, `hi`, `te`,
     `ht`, `bn`, `fa` and `ar` with a one-line explanation: their localized figure keeps a
     leading `$`, or is isolated, so a leading-`$` scan cannot tell localized from raw.
   - If the server is unreachable, print one line saying to run `npm run build && npm run preview` and exit **2**.
   - Launch Playwright with `channel: 'chrome'`, `headless: false`. Use `domcontentloaded`
     plus a 2.5s settle, never `networkidle` (see memory: it hangs on school pages). Scroll
     to trigger lazy sections, force-open every `<details>`, and click every `.adm-band`
     tab, harvesting after each click.
   - Routes: every slug in `src/data/schools.json`; `/compare/` for each of
     `financial-aid-tuition, admissions, after-school, summer-programs, college-support`
     with every slug selected; `/school/<slug>/admissions-checklist/` with no band and with
     each band key that school's admissions data defines (read the keys from the
     rendered `.adm-band` count, or try the known set `tkk5 es ms hs intl lower middle upper`).
   - Harvest text nodes matching `/\$\d/`, plus `title` and `aria-label` attributes, each
     recorded with the class chain of its nearest four ancestors.
   - Output grouped by leaf class: count, first route, first text. Exit **1** on any finding
     and **0** when clean, with a ✓ summary line.

3. **Run the census against `main`'s build to record the baseline.** Run
   `npm run build && npx vite preview`, then `npm run audit:moneyrender`. Expect about 363
   `es` findings in about 25 classes, matching Appendix A. Record the `es` and `fr` totals
   for the Implementation notes.

4. **ProseContent.** In `src/components/ProseContent.tsx`, import `localizeMoneyText` from
   `../lib/format.ts` and apply it to the **plain string segments** inside `emphasize()`,
   both the bold and the non-bold parts. Do not apply it in `linkify`'s URL branch. Also
   check `case 'scope'` (L104, `{b.text}`) and `case 'facts'` (L122, `b.lines.join`), and
   wrap them if the census reports them.

5. **FinancialAidReport.tsx.** Wrap `{c.label}` (L280, ComponentGrid), `{b.delta}` (L134),
   the `fa-questions` items (L460), and the `stat-tile-label` `{s.label}` at L445/L478.
   Use `localizeMoneyText(…)` for plain fields, or the file's own `RichText`, which
   already localizes, where the field carries `**`. Keep `key={c.label}` raw, because a
   key is not DOM text.

6. **AdmissionsChecklist.tsx** (`src/pages/`): `{r.action}`, `{r.detail}` (L138–139), the
   callout (L128) and `{guide.checklist.disclaimer}` (L166).

7. **AdmissionsProgram.tsx**: `adm-step-title` `{s.title}` (L144), `adm-deadline-label`
   `{d.label}` (L117), `adm-rule-text` (L238), `as-note` `{data.spineNote}` (L280), and
   `stat-tile-label` (L429) if it is reported. Leave the step `detail` fields alone if they
   already go through a localizing helper, since the census did not report them.

8. **AfterSchool.tsx and SummerPrograms.tsx**: `as-lead` (L115 / L112) and its muted
   span; the `as-td` muted detail cells; `as-tl-tier`, both its text and its
   `title={r.flatLabel}` (L205/225); `as-estimate-row` `{…panelLabel}` (L460 / L564); and
   the `as-note` lines (L581/713, L236).

9. **CollegeSupport.tsx**: the `cs-chips` tags (L653 and the neutral sibling), `cs-lead`
   (L97), `cs-stat-label` (L125) and `cs-check-row` (L862). **CellQual.tsx**: `{qual.text}`
   (L105). **ArtsProgram.tsx**: `arts-enrich-row` (L123) and `arts-check` (L354).
   **SchoolDetail.tsx**: `{d.teaser}` at L1063/1089/1120/1152.

10. **Re-run the census after each file or two.** Stop when `es` and `fr` both report
    **0**. A class the table above does not list is still in scope: the census is the spec.

11. **Document it.**
    - In `CLAUDE.md`'s i18n standard, beside the `check:moneytext` paragraph, add:
      > **`npm run audit:moneyrender` is the render-site guard.** It loads every school,
      > Compare and checklist page in real Chrome in `es`/`fr`, where a localized figure
      > never has a leading `$`, and reports every `$<digit>` that reached the screen. It
      > found 363 across 25 sites that `check:money`'s identifier grep could not see,
      > because the fields were called `label`, `text` or `detail`. Run it after adding a
      > render site or a locale. It needs `npm run preview`, so it is not in the build.
    - Add one line to `check_money_render_paths.mjs`'s header comment pointing to the census
      as the complement for fields whose names don't sound like money.

12. **Verify** (below), commit with explicit paths, push and verify the push, open the PR
    with `--body-file`, merge (`gh pr merge --squash --delete-branch`), then
    `git checkout main && git pull`. Flip this plan to `implemented` and the INDEX row to
    *Implemented* with the PR link. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `scripts/audit_money_render.mjs` | new: the rendered-page census |
| `package.json` | `audit:moneyrender` |
| `src/components/ProseContent.tsx` | localize in `emphasize()` |
| `src/components/FinancialAidReport.tsx` | component labels, delta, questions, tile labels |
| `src/pages/AdmissionsChecklist.tsx` | rows, callout, disclaimer |
| `src/components/AdmissionsProgram.tsx` | step titles, deadline labels, rule text, notes |
| `src/components/AfterSchool.tsx`, `SummerPrograms.tsx` | lead, table cells, timeline tiers + title attr, estimate rows, notes |
| `src/components/CollegeSupport.tsx`, `CellQual.tsx`, `ArtsProgram.tsx` | chips, lead, stat labels, checklist, tooltips, arts rows |
| `src/pages/SchoolDetail.tsx` | topic teasers |
| `scripts/check_money_render_paths.mjs` | header comment pointer |
| `CLAUDE.md` | one paragraph |
| `.claude/plans/moneyrender.md`, `.claude/plans/INDEX.md` | status, PR, notes |

## Verification

- [ ] The census on `main`'s build reports about 363 `es` findings. Record `es` and `fr`.
- [ ] After the fix, `npm run audit:moneyrender` (es + fr) reports **0**, and also
      `--lang it` reports **0**.
- [ ] **Negative test (isolated):** temporarily remove the wrap from ONE site (`{c.label}`
      at FinancialAidReport L280), rebuild and re-run the census. It must report exactly
      the `fa-component` class, then restore. Check which class printed.
- [ ] `npx tsc -b`: clean. `npm run build`: exits 0.
- [ ] `npm run check:moneytext`, `check:money`, `check:bidi`, `check:currency`: clean.
- [ ] **No double isolates in `fa`:** on `/school/trinity-episcopal/?lang=fa` and
      `/school/cannon/?lang=fa`, with panels open, the rendered text contains no
      `⁦⁦` and no `⁦[^⁩]*⁦`. That would mean a figure was
      wrapped twice.
- [ ] **English is unchanged except for grouping.** Capture `document.body.innerText`
      with all panels open for every school page in `en`, on `main`'s build and on this
      branch, and diff them. The only differences allowed are `$NNNN` → `$N,NNN`
      re-groupings. Anything else is a regression.
- [ ] **Eyeball in real Chrome:** Trinity `es` Financial Aid card, where the FLIK row reads
      `11,50 US$`; Cannon `es` After School timeline and table; the Charlotte Christian `es`
      admissions checklist.

## Risks

| Risk | Mitigation |
|---|---|
| Double localization nests bidi isolates in fa/ar | Wrap at one layer; the `fa` double-isolate assertion |
| An href is rewritten in ProseContent | Localize only in `emphasize()`, after `linkify` splits URLs out; the English diff would show a changed URL |
| English output shifts beyond grouping | The whole-site English innerText diff |
| A site renders a React node, not a string | Wrap the string field before it becomes a node, or inside the node's own text helper |

## Open questions

None.

## Appendix A — planning-time census, es, `main` @ `2c688c35`

363 text nodes in 25 leaf classes. The top entries are `prose-table` 112, `fa-component`
57, `adx-row-*` 45, `as-td` muted 25 and `tip-body` 21. The full table is in Context.

## Appendix B — the planning-time census script

Verified working on 2026-10-04 against `vite preview --port 4319`. Generalize it per step 2.

```js
import { chromium } from 'playwright'
import fs from 'fs'
const B = 'http://localhost:4319'
const lang = process.argv[2] || 'es'
const slugs = JSON.parse(fs.readFileSync('src/data/schools.json')).schools.map(s => s.slug)
const browser = await chromium.launch({ channel: 'chrome', headless: false })
const page = await browser.newPage()
const harvest = () => page.evaluate(() => {
  const out = []
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  for (let n; (n = w.nextNode());) {
    const t = n.nodeValue
    if (!/\$\d/.test(t)) continue
    let el = n.parentElement, chain = []
    while (el && chain.length < 4) { if (el.className && typeof el.className === 'string') chain.push(el.className.split(' ')[0]); el = el.parentElement }
    out.push({ cls: chain.join(' < '), text: t.trim().slice(0, 90) })
  }
  return out
})
const rows = []
const visit = async (url, tag) => {
  await page.goto(url, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(2500)
  for (let y = 0; y < 30; y++) { await page.mouse.wheel(0, 3000); await page.waitForTimeout(60) }
  await page.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = true)); await page.waitForTimeout(300)
  const seen = new Set()
  const take = async () => { for (const r of await harvest()) { const k = r.cls + '|' + r.text; if (!seen.has(k)) { seen.add(k); rows.push({ tag, ...r }) } } }
  await take()
  const n = await page.locator('.adm-band').count()
  for (let i = 0; i < n; i++) { await page.locator('.adm-band').nth(i).click(); await page.waitForTimeout(250); await page.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = true)); await take() }
}
for (const s of slugs) await visit(`${B}/school/${s}/?lang=${lang}`, s)
const cmp = slugs.join(',')
for (const topic of ['financial-aid-tuition', 'admissions', 'after-school', 'summer-programs', 'college-support'])
  await visit(`${B}/compare/?topic=${topic}&schools=${encodeURIComponent(cmp)}&lang=${lang}`, `compare:${topic}`)
for (const s of slugs) for (const band of ['', 'tkk5', 'es', 'ms', 'hs', 'intl', 'lower', 'middle', 'upper']) {
  await page.goto(`${B}/school/${s}/admissions-checklist/?${band ? 'band=' + band + '&' : ''}lang=${lang}`, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(1200)
  for (const r of await harvest()) rows.push({ tag: `${s}:checklist`, ...r })
}
await browser.close()
```

## Implementation notes

- **Baseline, from the census script on `main`'s build:** es **316** figures across **26**
  sites, and fr **322** across **29**. That is below the plan's 363 because the script
  deduplicates the checklist, where a missing band falls back to the default and repeats
  every row; the planning run counted those repeats. **After the fix: es 0, fr 0, it 0.**
- **French surfaced three sites Spanish did not:** `sports-lead`, `sports-note` and
  `arts-ledger-result`. They were wrapped, and so was every other `sports-note` field
  (`footnote`, `didNotWin`, `funnelNote`, `rosterNote`, `worthKnowing`, `careNote`,
  `scheduleNote`, `broadcast`), because they are all prose that can carry a figure. This
  is why the census scans two locales by default.
- **Also wrapped beyond the table:** `ProseContent` `scope` and `facts` blocks; the
  checklist callout `lead`; `AdmissionsProgram` rule titles; the `title` attribute on the
  flat after-school tier, which is guarded because `r.flatLabel` is optional; and every
  `SchoolDetail` topic teaser (10 paths, 8 of them `…[card.key]!.headline`), not only the
  4 the plan listed.
- **English was unchanged, not merely "changed only by grouping".** I compared every
  school page's full English text with all panels open and every band tab clicked, on
  `main` and on this branch. 11 of 12 schools were identical. The 12th (Country Day)
  differed only in the live Latest News fetch state ("CONTACTING…" on one run, "unavailable"
  on the other), which is network timing. No `$NNNN` regrouping occurred.
- **No nested isolates:** 0 in `fa` and `ar` on Trinity, Cannon, Charlotte Christian and
  Gaston Day (184–410 isolated figures per page). Every figure is wrapped exactly once.
- **Negative test (isolated):** I restored only `{c.label}` at FinancialAidReport L280 and
  rebuilt. The census then reported **exactly 57 figures at 1 site, `fa-component`**, and
  exited 1. The wrap was restored, and the final build was verified.
- **Eyeballed in real Chrome (es):**
  - Trinity: `Comida (FLIK) — por menú · 11,50 US$`, the row that started this.
  - Cannon: `AFTER SCHOOL PROGRAM · 3:00–6:00 · 3.784 US$/AÑO`, and no raw `$3,784`
    remains.
- **No `src/locales/*.json` chrome string held a `$` figure.** The census reported none.
