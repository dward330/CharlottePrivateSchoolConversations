---
name: compareSectionHeader
title: Reword the home topics section header from "What you can explore" to "What you can compare"
status: english-done
phases: 2
created: 2026-08-23
branch: feat/compare-section-header
prs: []
---

# Reword the home topics section header to "What you can compare"

## Goal

The home page's topic-grid section is headed **"What you can explore"**, but every tile in
that grid links to the Compare view and carries a "Compare all →" CTA. The heading
describes a browsing action the section does not offer. Change it to **"What you can
compare"** — one UI-chrome key (`home.topicsHeading`), English first, then the nine other
locale catalogs after the user reviews the English. Done when the home page renders the new
heading in every shipped language, the pre-rendered `dist/index.html` carries it, and every
check passes.

## Context

**The section is a Compare launcher, not an explorer.** In
[`src/pages/Home.tsx`](../../src/pages/Home.tsx#L123-L141) the heading renders as
`<h2 id="topics-h">{t('home.topicsHeading')}</h2>`, and every cell beneath it is an
`<a href={toCompare(topic.slug, allSlugs)}>` — the Compare route with that topic selected
and all schools loaded — whose CTA span is `{t('home.compareAll')}` ("Compare all →").
There is no topic page to explore; the only destination is Compare. That mismatch is the
whole reason for this change.

**Two supporting reasons, both from the rendered page.** The hero title directly above
already reads "Explore Charlotte's private schools" (`home.title`, set by the
[`explore-hero-title`](explore-hero-title.md) plan, PR #94), so "What you can explore"
repeats the verb within one screen. And the sibling section immediately above it is headed "The schools"
(`home.schoolsHeading`, [`Home.tsx:92`](../../src/pages/Home.tsx#L92) — the topics grid was
moved below it by the [`arrangements`](arrangements.md) plan, PR #178) — a bare noun phrase
— so a noun clause here reads as a matched pair, which is why the chosen wording keeps the
"What you can …" shape rather than switching to an imperative like "Compare by topic".

**The key is UI chrome and exists in all ten catalogs.** `grep` for `topicsHeading` across
`src/` returns exactly two hits: the `Home.tsx` render above and the key itself in the
catalogs. It is reached via `useTranslation()`, so per the i18n standard it belongs in
`src/locales/*.json` — **not** the `PROSE_TRANSLATED` overlay layer. The value carries no
interpolation, no figures, no currency, and no identifiers.

`TRANSLATED` in [`src/lib/i18n.ts`](../../src/lib/i18n.ts#L108) is
`['en', 'es', 'bn', 'ht', 'te', 'fr', 'fa', 'it', 'hi', 'ar']` — **ten locales**. Note this
is one more than the nine in the `explore-hero-title` precedent: `ar` shipped after that
plan was written. Read the list from `i18n.ts` at implementation time rather than trusting
this sentence. Current values, read from the catalogs during planning:

| Locale | Current `home.topicsHeading` |
|---|---|
| en | `What you can explore` |
| es | `Qué puede explorar` |
| bn | `যা যা দেখতে পারেন` |
| ht | `Sa ou ka eksplore` |
| te | `మీరు పరిశీలించగలిగేవి` |
| fr | `Ce que vous pouvez explorer` |
| fa | `آنچه می‌توانید کاوش کنید` |
| it | `Cosa puoi esplorare` |
| hi | `आप क्या देख सकते हैं` |
| ar | `ما الذي يمكنك استكشافه` |

**No check in this repo guards this key, and that is worth knowing up front.** Only two
scripts under `scripts/` read `src/locales/` at all — `check_chrome_keys.mjs` and
`i18n_fields.mjs`. `check:chrome` audits *data fields that were skipped by the prose
extractor on the promise that chrome renders them* (the `day` / `days` / `dayFilters`
vocabulary); it does not enumerate arbitrary catalog keys, so it will neither fail nor
report on `home.topicsHeading`. **Consequence for Phase 1: the build stays green with only
`en` edited, and nothing will print a "pending translation" line.** Do not wait for such a
signal — the browser check is the gate.

**The home page is pre-rendered, in English only.** `dist/index.html` contains the literal
string once, and it is the only pre-rendered file that does (the per-locale catalogs are
loaded client-side; there is no `dist/es/index.html`). So Phase 1 is the phase that changes
crawler-visible HTML, and it only lands there after `npm run prerender`, which
`npm run build` chains. Phase 2 changes nothing in `dist/`. The string is not part of any
`<title>`, meta description, or JSON-LD — `grep` for `topicsHeading` across `scripts/` and
`src/lib/head.ts` returns nothing — so the SEO metadata budget in `check:seo` is unaffected.

## Decisions

- **"What you can compare"**, chosen over "Compare by topic", "Research areas", "Compare on
  any topic" and "Topics to compare" — it is the minimum edit, preserves the noun-clause
  parallel with the sibling "The schools" heading, and sets up the existing "Compare all →"
  CTA instead of contradicting it. Settled with the user at planning time; `/implement`
  should not re-open the wording.
- **Only `home.topicsHeading` changes.** The sibling `home.compareAll` ("Compare all →"),
  `home.schoolsHeading` ("The schools") and the hero `home.title` all stay exactly as they
  are.
- **No trailing period**, matching the current value and the sibling headings. Each locale
  follows its own convention in Phase 2 rather than mechanically copying English
  punctuation.
- **Two-phase**, per the repo standard for any user-facing string — even a three-word
  heading settles only once seen rendered.
- **Translate the new *meaning*, not the old string.** Every current non-English value
  renders some form of *explore* (`explorar`, `eksplore`, `esplorare`, `کاوش`,
  `استكشافه`). The verb changes to *compare*; this is a meaning shift, not a synonym swap,
  so each locale gets the verb it actually uses for side-by-side comparison — the same
  posture the [`headingChange`](headingChange.md) plan took for parent → independent.

## Approvals needed

None. No new card, section, stat tile, Compare row, metric key, topic, dependency, or
layout change — this reuses an existing key in an existing section. The UX-design gate
covers *adding* surface area; rewording a string already on the page is not that.

## Out of scope

- The "Compare all →" CTA (`home.compareAll`), the "The schools" heading
  (`home.schoolsHeading`), and the hero title/lede — all explicitly kept.
- Any layout, styling, component, or routing change. Text only; `Home.tsx` is **not**
  edited — it already reads the key.
- The `nav.compare` label and the `/compare` route.
- `npm run deploy`. Merging is not publishing; the deploy is the user's call, separately.

## Steps

### Phase 1 — English

1. **Branch** — `git checkout -b feat/compare-section-header` off an up-to-date `main`.
2. **Edit the English heading** — in [`src/locales/en.json`](../../src/locales/en.json),
   change `home.topicsHeading` from `"What you can explore"` to `"What you can compare"`.
   That is the only edit in this phase; no other key and no `src/` file changes.
3. **Rebuild so the pre-rendered home page carries it** — `npm run build`, which chains
   `prerender`. Confirm `dist/index.html` now contains "What you can compare" and no longer
   contains "What you can explore".
4. **Commit** to the branch.

**→ STOP. `/implement` commits Phase 1, ends its turn, and waits for the user's review.**
Nothing below runs until the user confirms the English wording. Between phases the index
row sits at `English shipped`. Note again that no check will flag the nine untranslated
catalogs — the absence of a warning is not confirmation that Phase 2 is unnecessary.

### Phase 2 — Every other locale

Only after that confirmation. Scope is the nine non-English catalogs in `TRANSLATED`
(re-read [`src/lib/i18n.ts`](../../src/lib/i18n.ts#L108) rather than trusting this list):
`es, bn, ht, te, fr, fa, it, hi, ar`. In each, replace the *explore*-verb value at
`home.topicsHeading` with the *compare* equivalent, keeping the key identical:

1. **es** — `src/locales/es.json`
2. **bn** — `src/locales/bn.json`
3. **ht** — `src/locales/ht.json` — Kreyòl has no native-speaker review; keep the register
   plain and watch for drift toward French (`konpare`, not a French borrowing).
4. **te** — `src/locales/te.json` — target vyāvahārika register, not grānthika.
5. **fr** — `src/locales/fr.json`
6. **fa** — `src/locales/fa.json` — RTL, but the string is pure prose with no figures or
   Latin identifiers, so **no LRI/PDI bidi isolate is needed here**.
7. **it** — `src/locales/it.json`
8. **hi** — `src/locales/hi.json` — मानक हिन्दी, not over-Sanskritized; a Devanagari
   loanword is fine where it is what a school circular would print.
9. **ar** — `src/locales/ar.json` — RTL, same note as `fa`.

This is a plain chrome string with no figures, currency, or identifiers, so the
prose-translation rollout docs' figure/sepdrift/identifier traps do not apply. Consult
`.claude/docs/prose-translation-<lang>.md` only if a register question arises.

10. **Commit** to the same branch and open one PR covering both phases.

## Files touched

| File | Change |
|---|---|
| `src/locales/en.json` | edit — `home.topicsHeading` → "What you can compare" (Phase 1) |
| `src/locales/es.json` | edit — translate new `home.topicsHeading` (Phase 2) |
| `src/locales/bn.json` | edit — translate new `home.topicsHeading` (Phase 2) |
| `src/locales/ht.json` | edit — translate new `home.topicsHeading` (Phase 2) |
| `src/locales/te.json` | edit — translate new `home.topicsHeading` (Phase 2) |
| `src/locales/fr.json` | edit — translate new `home.topicsHeading` (Phase 2) |
| `src/locales/fa.json` | edit — translate new `home.topicsHeading` (Phase 2) |
| `src/locales/it.json` | edit — translate new `home.topicsHeading` (Phase 2) |
| `src/locales/hi.json` | edit — translate new `home.topicsHeading` (Phase 2) |
| `src/locales/ar.json` | edit — translate new `home.topicsHeading` (Phase 2) |

No file under `src/components/`, `src/pages/`, `src/data/`, or `scripts/` is touched.
`dist/` changes as a build artifact, not as an edit.

## Verification

### Phase 1 — English

- [ ] `python3 -c "import json; json.load(open('src/locales/en.json'))"` — valid JSON
- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds (this also runs `check:schema`, `check:ranks`,
      `check:ncsuper`, `check:live`, `check:chrome`, `check:runtime`, `check:spans`; none
      of them govern this key, so a pass here means "nothing else broke", not "the heading
      is right")
- [ ] `grep -c "What you can compare" dist/index.html` — returns 1, and
      `grep -c "What you can explore" dist/index.html` returns 0
- [ ] **Browser check** — dev server, home page in English: the topic grid is headed "What
      you can compare"; the "Compare all →" CTA on each tile, the hero title, and the "The
      schools" heading above are all unchanged. Confirm the heading still fits on one line
      at a narrow (mobile) width.

### Phase 2 — Locales

- [ ] Each edited `src/locales/*.json` is valid JSON (the build covers this; the one-liner
      above per file is the faster check)
- [ ] `npm run build` — succeeds
- [ ] `grep -l "explorar\|eksplore\|esplorare\|کاوش\|استكشافه" src/locales/*.json` — no hit
      is at `home.topicsHeading` (guards the "one stale catalog" risk below)
- [ ] **Browser check** — switch the language picker through all nine and confirm the topic
      grid header shows the translated *compare* wording, not the old *explore* value and
      not an English fallback. Pay attention to `hi` and `te`, whose headings run long and
      ship at 1.45 line-height, and to `fa`/`ar` for RTL alignment of the `<h2>`.

No `check:figures`, `check:sepdrift`, `check:money`, `check:currency`, or print-out is
required — those guard the overlay/prose layer and figure copying, and this is a
figure-free chrome string. No `check:seo` run is needed either: the string is absent from
every `<title>`, meta description and canonical.

## Risks

| Risk | Mitigation |
|---|---|
| A catalog is left on the old *explore* wording — invisible, since no check guards this key | The Phase 2 grep above, plus the nine-locale browser sweep. Both are explicit verification items, not incidental. |
| Phase 1 ships and Phase 2 is forgotten, because the build is green and silent | Called out twice in the plan; the index row sits at `English shipped` until both land, and both phases go in one PR. |
| A translator renders *compare* as a synonym for *explore*, preserving the defect in that language | Decisions section states this is a meaning shift; the grep checks for the old verb stems specifically. |
| The longer wording wraps to two lines in `hi`/`te`/`ar` and unbalances the grid | Explicit browser check at narrow width in both phases. If it wraps badly, "Topics to compare" is the pre-agreed shorter fallback — raise it with the user rather than silently substituting. |

## Open questions

None. The wording, the phase split, and the scope were all settled with the user at
planning time.
