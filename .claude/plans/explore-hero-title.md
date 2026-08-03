---
name: explore-hero-title
title: Reword the home hero title to "Explore Charlotte's private schools"
status: english-done
phases: 2
created: 2026-08-02
branch: feat/explore-hero-title
prs: []
---

# Reword the home hero title to "Explore Charlotte's private schools"

## Goal

Change the home-page hero headline from **"Compare Charlotte's private schools, side by
side."** to **"Explore Charlotte's private schools"**. It's a one-key UI-chrome string
change (`home.title`) that ships in English first, then the other eight locales after the
user reviews the English wording. Done when the home page renders the new headline in
every shipped language and every check passes.

## Context

The headline lives in the `home.title` key of the per-language locale catalogs, not in
JSX — confirmed by grep, only hit is `src/locales/en.json:63`. It is UI chrome reached via
`useTranslation()`, so per the i18n standard it belongs in `src/locales/*.json`, and the
new wording carries **no interpolation** (unlike the sibling `home.lede`, which uses
`{{schools}}`/`{{topics}}`).

The key exists in all nine catalogs listed in `TRANSLATED` in
[`src/lib/i18n.ts`](../../src/lib/i18n.ts#L108) — `en, es, bn, ht, te, fr, fa, it, hi`.
Current values (from planning):

| Locale | Current `home.title` |
|---|---|
| en | `Compare Charlotte's private schools, side by side.` |
| es | `Compare las escuelas privadas de Charlotte, lado a lado.` |
| bn | `Charlotte-এর বেসরকারি স্কুলগুলো পাশাপাশি রেখে তুলনা করুন।` |
| ht | `Konpare lekòl prive Charlotte yo, kòtakòt.` |
| te | `Charlotte ప్రైవేట్ పాఠశాలలను పక్కపక్కనే పోల్చి చూడండి.` |
| fr | `Comparez les écoles privées de Charlotte, côte à côte.` |
| fa | `مدارس خصوصی شارلوت را کنار هم مقایسه کنید.` |
| it | `Confronta le scuole private di Charlotte, fianco a fianco.` |
| hi | `Charlotte के निजी स्कूलों की तुलना, आमने-सामने।` |

This is pure UI chrome — **not** the overlay/`PROSE_TRANSLATED` layer, so none of the
figure/sepdrift/money locale checks are in play, and no source-material or ingest step is
involved. The English text has no numbers, currency, or identifiers.

## Decisions

- Only `home.title` changes — the CTA button `home.ctaCompare` ("Compare schools") and the
  subtitle `home.sub_one`/`home.sub_other` ("… side by side …") keep the compare framing.
  Confirmed with the user at planning time.
- English drops the trailing period ("Explore Charlotte's private schools") to match the
  requested copy exactly; each locale follows its own sentence-final punctuation convention
  in Phase 2 (e.g. Bangla's `।`, no period where the language wouldn't use one) rather than
  mechanically copying English punctuation.
- Two-phase, per repo standard for any user-facing string — even a single word settles once
  seen rendered.

## Approvals needed

None. No new card, section, stat tile, Compare row, metric key, topic, or dependency —
this reuses an existing key and existing layout.

## Out of scope

- The "Compare schools" CTA button and the "side by side" subtitle (explicitly kept).
- Any layout, styling, or component change — text only.
- The `nav.compare` label and `/compare` route, which are unrelated to the hero copy.

## Steps

### Phase 1 — English

1. **Edit the English headline** — in [`src/locales/en.json`](../../src/locales/en.json),
   change `home.title` from `"Compare Charlotte's private schools, side by side."` to
   `"Explore Charlotte's private schools"`.

**→ STOP. `/implement` commits Phase 1, ends its turn, and waits for the user's review.**
Nothing below runs until the user confirms the English wording. Between phases the index
row sits at `English shipped`.

### Phase 2 — Every other locale

Only after that confirmation. Scope is the eight non-English catalogs in `TRANSLATED`
(`src/lib/i18n.ts`): `es, bn, ht, te, fr, fa, it, hi`. Translate the new headline
("Explore Charlotte's private schools") in each, replacing the old "compare … side by
side" value at `home.title`:

1. **es** — `src/locales/es.json`
2. **bn** — `src/locales/bn.json`
3. **ht** — `src/locales/ht.json`
4. **te** — `src/locales/te.json`
5. **fr** — `src/locales/fr.json`
6. **fa** — `src/locales/fa.json` (LTR headline, no figures — no bidi isolate needed here)
7. **it** — `src/locales/it.json`
8. **hi** — `src/locales/hi.json`

Match each locale's register and sentence-final punctuation as noted in Decisions. Keep the
JSON key identical; only the value changes. This is a plain chrome string with no figures,
so the prose-translation rollout docs' figure/identifier traps do not apply; use them only
if a register question arises.

## Files touched

| File | Change |
|---|---|
| `src/locales/en.json` | edit — `home.title` → "Explore Charlotte's private schools" (Phase 1) |
| `src/locales/es.json` | edit — translate new `home.title` (Phase 2) |
| `src/locales/bn.json` | edit — translate new `home.title` (Phase 2) |
| `src/locales/ht.json` | edit — translate new `home.title` (Phase 2) |
| `src/locales/te.json` | edit — translate new `home.title` (Phase 2) |
| `src/locales/fr.json` | edit — translate new `home.title` (Phase 2) |
| `src/locales/fa.json` | edit — translate new `home.title` (Phase 2) |
| `src/locales/it.json` | edit — translate new `home.title` (Phase 2) |
| `src/locales/hi.json` | edit — translate new `home.title` (Phase 2) |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds
- [ ] `python3 -c "import json; json.load(open('src/locales/en.json'))"` — valid JSON
- [ ] Browser check: run the dev server, load the home page in English, confirm the hero
      reads "Explore Charlotte's private schools" and the CTA button / subtitle are
      unchanged.

### Phase 2 — Locales

- [ ] Each edited `src/locales/*.json` is valid JSON (the build/tsc pass covers this, or
      the one-liner above per file).
- [ ] `npm run build` — succeeds.
- [ ] Browser check: switch the language picker through `es, bn, ht, te, fr, fa, it, hi`
      and confirm the hero shows the translated "Explore …" headline (not the old compare
      text, and not an English fallback) in each.

No `check:runtime`, `check:figures`, `check:sepdrift`, `check:money`, or print-out is
required — those guard the overlay/prose layer and figure copying, neither of which this
chrome-only, figure-free string touches.

## Risks

| Risk | Mitigation |
|---|---|
| A stale locale value is left on the old "compare" wording | Phase 2 browser sweep checks all eight; grep for "side by side" / "lado a lado" / etc. shows no `home.title` remnant. |
| Trailing-punctuation inconsistency across locales | Decision above: each locale follows its own convention, not English's dropped period. |
