---
name: hidedistilledcounts
title: Show the "N documents distilled" counts on the school header and home school cards in development only
status: not-implemented
phases: 1
created: 2026-10-25
branch: feat/hide-distilled-counts
prs: []
---

# Show the "N documents distilled" counts in development only

## Goal

Two places still show parents how many source documents were distilled for a school:

1. **School page header subtitle**: `9 research areas · 112 documents distilled`.
2. **Home page school cards**: `9 topics · 112 documents distilled` under each school name.

That number describes our research corpus, not the school. It tells a parent nothing and
invites the wrong comparison ("why does this school only have 40?"). Hide it in
production and keep it on the local dev server, where it is still useful as a quick
coverage signal.

Done when `npm run dev` still renders both strings exactly as today, and a `vite build`
(the live site and every pre-rendered page) renders:
- school header: `9 research areas`, with no trailing ` · `
- home card: `9 topics`, with no trailing ` · `

## Context

**The pattern already exists three times in `src/pages/SchoolDetail.tsx`.** The sidebar
per-topic document counts (PR #247, plan `removedocumentcounts`), the research-area
header topic counts (PR #255, plan `removetopiccount`) and the "Expand all" print button
are all wrapped in `{import.meta.env.DEV && (...)}`. That value is statically replaced at
build time, so the production branch is dead-code-eliminated, and `prerender.mjs` (which
drives the built `dist/`) inherits the behaviour for free. Follow that pattern here. Do
not add an env var or build flag.

**Surface 1: school header**, at
[`src/pages/SchoolDetail.tsx:624-627`](../../src/pages/SchoolDetail.tsx#L624-L627):

```tsx
<p className="school-sub">
  {tr('school.subAreas', { count: covered.length })} ·{' '}
  {tr('school.subDocs', { count: totalDocs })}
</p>
```

`totalDocs` is computed at
[`SchoolDetail.tsx:573`](../../src/pages/SchoolDetail.tsx#L573). The ` · ` separator is
literal JSX text, so the separator has to move inside the guard with the docs string.
If it stays outside, production renders `9 research areas ·`.

**Surface 2: home school card**, at
[`src/pages/Home.tsx:93`](../../src/pages/Home.tsx#L93) (`const docs = …`) and
[`Home.tsx:109-111`](../../src/pages/Home.tsx#L109-L111):

```tsx
<span className="school-card-meta">
  {t('home.schoolCardMeta', { topics: covered.length, documents: docs })}
</span>
```

Unlike the header, this is **one locale key holding both halves**:
`"home.schoolCardMeta": "{{topics}} topics · {{documents}} documents distilled"`, in all
ten catalogs. It can't be split with a JSX guard. In production, render the existing
plural key **`school.topics`** instead (`"{{count}} topic"` / `"{{count}} topics"`). That
key is already translated in all ten catalogs (`TRANSLATED` in `src/lib/i18n.ts`: en, es,
bn, ht, te, fr, fa, it, hi, ar), including every Arabic CLDR form
(`_zero/_one/_two/_few/_many/_other`), because PR #255's section-header count uses it. In
English it is word-for-word the first half of `schoolCardMeta`. As a side benefit it
pluralizes correctly: `schoolCardMeta` hard-codes "topics", so a 1-area school would
read "1 topics".

## Decisions

- **Single-phase.** No text is added or reworded. Two shipped strings stop rendering in
  one build mode, and the home card falls back to an already-translated key. There is
  nothing new for a translator or a review to look at. Same reasoning as
  `removetopiccount`.
- **Use `import.meta.env.DEV`.** It is the established mechanism in this file (three
  guards already). Production gets DCE, and the pre-render pass inherits it.
- **Home card in production uses `t('school.topics', { count: covered.length })`.** A
  new key (e.g. `home.schoolCardTopics`) would add user-facing text and force a
  two-phase plan across ten catalogs, just to say what an existing reviewed key already
  says.
- **Keep every key, variable and CSS rule.** `home.schoolCardMeta`, `school.subDocs`,
  `totalDocs`, `docs` and `docCount` are all still used in dev. `docCount` also decides
  which areas render at all, through `topicsForSchool`. Do not delete or "tidy" any of
  them into the guarded branch. The `removetopiccount` record found that a runtime JSX
  guard causes no `noUnusedLocals` failure.
- **Add a short comment at each guard**, matching the comment-block style of the sidebar
  guard at `SchoolDetail.tsx:751-763`: why it is dev-only, and not to remove the guard.

## Approvals needed

None. This removes a display element and adds no card, section, tile or row.

## Out of scope

- **The home hero's site-wide document count**: the `home.lede` sentence ("…distilled
  from {{documents}} source documents") and the third hero stat tile
  (`home.stats.documents`, "source documents distilled"). The request covered the count
  *per school*, and these are the project-wide total. They are untouched. Hiding them
  would be a separate decision (see Open questions).
- The footer disclaimer (`footerDisclaimer`, "Notes are distilled… extracts of source
  documents"). It contains no count.
- The sidebar per-topic counts and the section-header topic counts. Both are already
  dev-only.
- Deploying. Merge only. Publishing is the user's call.

## Steps

Single-phase. Adds no user-facing text.

1. **Branch.** Create `feat/hide-distilled-counts` from up-to-date `main`.
2. **School header: guard the docs half.** In `src/pages/SchoolDetail.tsx` (~line 624),
   change the `.school-sub` paragraph to:

   ```tsx
   <p className="school-sub">
     {tr('school.subAreas', { count: covered.length })}
     {/* <comment: dev-only corpus statistic, see the sidebar guard below; keep the DEV guard> */}
     {import.meta.env.DEV && <> · {tr('school.subDocs', { count: totalDocs })}</>}
   </p>
   ```

   The ` · ` must sit inside the fragment. Keep `totalDocs` at line 573 unchanged.
3. **Home card: switch the key by build mode.** In `src/pages/Home.tsx` (~line 109),
   change the `.school-card-meta` span content to:

   ```tsx
   {/* <comment: dev shows the distilled-document count; production shows only the
       area count via the already-translated school.topics plural key> */}
   {import.meta.env.DEV
     ? t('home.schoolCardMeta', { topics: covered.length, documents: docs })
     : t('school.topics', { count: covered.length })}
   ```

   Keep `const docs` at line 93 and the `docCount` import unchanged. Check that `t` in
   `Home.tsx` comes from `useTranslation()` with no namespace prefix, so `'school.topics'`
   resolves the same way `'home.…'` does. Confirm by reading the top of the component.
4. **Typecheck and build.** `npx tsc -b`, then `npm run build`. Use `tsc -b`, not
   `tsc --noEmit` (see memory `trust-tsc-b-not-tsc-noemit`).
5. **Browser check (dev + prod).** See Verification.
6. **Commit, PR, merge.** Stage only the two files with explicit paths. Run
   `git status --short` before committing. PR body goes via `--body-file`. Then
   `gh pr merge --squash --delete-branch`, `git checkout main && git pull`. Flip this
   plan's status and the INDEX row to Implemented with the PR link, in a follow-up PR
   (never directly on `main`). **Do not deploy.** Report "merged — ready to deploy
   whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/pages/SchoolDetail.tsx` | edit: wrap ` · {subDocs}` in `import.meta.env.DEV` |
| `src/pages/Home.tsx` | edit: DEV → `home.schoolCardMeta`, prod → `school.topics` |
| `.claude/plans/hidedistilledcounts.md`, `.claude/plans/INDEX.md` | status flip after merge |

## Verification

- [ ] `npx tsc -b`: clean.
- [ ] `npm run build`: succeeds. The full chain includes `check:seo`, `check:chrome` and
      `check:live`, and `check:chrome` stays green because every key still exists.
- [ ] **Pre-render proof (cheap):**
      `grep -c 'documents distilled' dist/school/providence-day/index.html` → `0`, and
      `grep -c 'documents distilled' dist/index.html` → `0` (also check the slug folder
      names under `dist/school/`). Expect `dist/index.html` to still contain the hero
      tile label "source documents distilled", which is out of scope. Grep for
      `· ` + digits + ` documents` if needed to tell them apart.
- [ ] **Browser, dev vs prod side by side** (Playwright, `domcontentloaded`, never
      `networkidle`; see memory `browser-check-networkidle-hangs`):
  - `npm run dev`: a school page header reads `N research areas · M documents distilled`.
    Home cards read `N topics · M documents distilled`.
  - `npx vite preview` on the build: header reads `N research areas`, with no trailing
    `·` and no stray whitespace. Home cards read `N topics`.
  - In prod, also load `?lang=es` and `?lang=ar` on the home page. Cards show the
    translated `school.topics` plural (es `N apartados`; ar a correct plural form), not
    a raw key and not English.
  - Check one school with a singular count if any exists. Otherwise it is enough to
    confirm the key is plural-aware (`school.topics_one` exists).

## Risks

| Risk | Mitigation |
|---|---|
| The ` · ` separator is left outside the guard, so prod shows `9 research areas ·` | Step 2 puts it inside the fragment. The browser check reads the exact text. |
| The Spanish home card changes noun from `temas` (in `schoolCardMeta`) to `apartados` (in `school.topics`) in prod | Accepted. Both are reviewed strings, and `apartados` is already what the school page's section headers say. Flagged to the user at planning time. |
| Someone removes `docs` / `totalDocs` as "unused in prod" | Keep-comments at each guard, plus the Decisions note. |

## Open questions

- Should the home hero's **site-wide** total (lede sentence + third stat tile) also go
  dev-only? **Default:** no, leave it. It was not requested. Removing a stat tile and
  rewording the lede would be a UX change, and a rewording would make it two-phase.
