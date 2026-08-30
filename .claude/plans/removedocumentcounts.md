---
name: removedocumentcounts
title: Show the sidebar research-area document counts in development only
status: implemented
phases: 1
created: 2026-08-30
branch: feat/remove-document-counts
prs: []
---

# Show the sidebar research-area document counts in development only

## Goal

On a school dossier page, the "Research areas" sidebar lists each area with a
zero-padded count of the underlying source documents beside it (`Admissions 01`,
`Sports 15`, `College Support 11`). That number is an internal corpus statistic — it
tells a parent nothing about the school and invites the wrong comparison ("why does
this school only have 1?"). Hide it in production while keeping it visible on the local
dev server, where it is a useful at-a-glance signal of research coverage.

Done when: `npm run dev` still shows the counts, and a `vite build` (and therefore the
live site and every pre-rendered page) shows the area names with no number.

## Context

**The one line that renders them** is
[`src/pages/SchoolDetail.tsx:562`](../../src/pages/SchoolDetail.tsx#L562), inside the
`covered.map(...)` loop that builds `<aside className="dossier-nav">`:

```tsx
{covered.map((t) => (
  <a
    key={t.slug}
    className={t.slug === activeSlug ? 'is-active' : undefined}
    href={`#topic-${t.slug}`}
    onClick={(e) => { setActiveSlug(t.slug); scrollToTopic(e, t.slug) }}
  >
    {topicLabel(tr, t.slug, t.name)}
    <span className="count">{String(docCount(t.slug, slug)).padStart(2, '0')}</span>
  </a>
))}
```

**The pattern to follow is already in this same file, ~16 lines below.** The
"Expand all" print affordance at
[`src/pages/SchoolDetail.tsx:578`](../../src/pages/SchoolDetail.tsx#L578) is guarded by
`{import.meta.env.DEV && (...)}` and carries a comment block explaining exactly why that
guard is correct and must not be removed. This change is the same shape and should be
written to match it — same guard, same style of explanatory comment. `import.meta.env.DEV`
is `true` only under the `vite` dev server and `false` in every `vite build`, so no
runtime flag, env var, or build config is needed.

**Pre-rendering inherits the behaviour for free.** `scripts/prerender.mjs` drives
Playwright over the *built* `dist/`, so `DEV` is already false there and the counts will
be absent from the pre-rendered HTML too — which is what we want. There is no separate
prerender-mode branch to add.

**`docCount` has three other consumers; only one is in scope.** From
`src/lib/manifest.ts:36`:

| Site | What it renders | In scope? |
|---|---|---|
| `SchoolDetail.tsx:562` | the circled sidebar counts | **yes** |
| `SchoolDetail.tsx:446` → `:465` | `totalDocs`, shown as "· N documents distilled" in the school header subtitle | no — see Decisions |
| `Home.tsx:96` | per-school-card "N documents distilled" | no — see Decisions |
| `manifest.ts:46` (`topicsForSchool`) | filters to areas with `docCount > 0` — controls which areas render at all | no — must not change |

That last row is the one to be careful of: `docCount` is load-bearing for *which* areas
appear, so the function itself and its import stay exactly as they are. This change only
stops one `<span>` from rendering.

**CSS needs no change, and this is worth stating so it isn't "fixed".**
`.dossier-nav a` is `display: flex; justify-content: space-between` — the count is what
it was spacing against. With the count gone the anchor has a single flex child, and
`space-between` positions a lone child at the start, so the labels stay left-aligned
exactly as they are today. The `.dossier-nav-welcome` rule at `src/index.css:839` already
documents this relationship (it sets `justify-content: flex-start !important` "because it
carries no count badge") — that rule is for a *different* element and stays untouched. The
two `.count` rules at `src/index.css:834-835` also stay: they are still live under
`npm run dev`, so deleting them would break the dev-only rendering this plan is
preserving.

**No check, test, or script asserts on these counts.** `scripts/gen_data_schema.mjs`
defines its own local `docCount` map (line 190) read straight from `schools.json` — it
never touches the component. `check:seo` / `prerender.mjs` enforce a 20,000-byte floor per
pre-rendered page; removing ~9 spans of ~20 bytes each is ~180 bytes against pages that
clear the floor by a wide margin, so it is not a risk, but the build runs both checks
anyway.

## Decisions

- **Scope is the sidebar counts only** — confirmed with the user during planning
  (2026-08-30). The school header subtitle ("8 areas · 50 documents distilled") and the
  Home page school cards ("8 topics · 50 documents distilled") keep their counts in
  production and are **not** touched. Do not "finish the job" by extending the guard to
  them.
- **`import.meta.env.DEV`, not a new env var or a config flag** — it is the mechanism this
  file already uses for exactly this purpose (dev-only affordance), it is statically
  replaced at build time so the branch is dead-code-eliminated, and it needs no new
  plumbing.
- **Guard the `<span>`, don't delete it** — the counts stay useful locally as a coverage
  signal, which is the whole point of the request ("only show those when we locally run
  the project").
- **Keep the `.count` CSS rules** — still used in dev.
- **Single-phase** — adds and changes no user-facing text. Nothing is added to
  `src/locales/*.json`, and no `src/data` prose is touched, so no Phase 2 and no
  translation work. The counts are bare digits produced by `String(...).padStart()`, not a
  translated string.

## Approvals needed

**None.** The UX-design gate in `CLAUDE.md` is satisfied: it governs *ingestion* silently
growing the UI, and explicitly exempts direct user requests to change UI. This is a direct
request (2026-08-30, with an annotated screenshot), and the user confirmed at planning time
that `/implement` should proceed without re-asking.

Publishing is a separate matter: **do not run `npm run deploy`.** Merging the PR is
pre-authorized; deploying is not, and this plan does not grant it.

## Out of scope

- The school header subtitle count (`SchoolDetail.tsx:446`/`:465`, `school.subDocs`).
- The Home page school-card counts (`Home.tsx:96`, `home.schoolCardMeta`) and the Home
  hero `home.stats.documents` tile.
- `docCount()` in `src/lib/manifest.ts` and `topicsForSchool()` — unchanged.
- The `.dossier-nav .count` CSS rules — unchanged.
- Any locale file. Nothing here is translated text.

## Steps

**Single-phase — adds no user-facing text.**

1. **Branch** — `git checkout -b feat/remove-document-counts` from an up-to-date `main`.

2. **Guard the count span** — in
   [`src/pages/SchoolDetail.tsx`](../../src/pages/SchoolDetail.tsx), inside the
   `covered.map(...)` nav loop, wrap the count in an `import.meta.env.DEV` guard:

   ```tsx
   {topicLabel(tr, t.slug, t.name)}
   {/* Dev-only research-coverage signal: the number of source documents
       distilled into this area. It is an internal corpus statistic, not
       information about the school, so it never ships to the live site —
       `import.meta.env.DEV` is true only under the `vite` dev server and
       false in every `vite build` (including the pre-render pass, which
       drives the built dist/). Keep the guard; keep the `.count` CSS,
       which is still live in dev. */}
   {import.meta.env.DEV && (
     <span className="count">{String(docCount(t.slug, slug)).padStart(2, '0')}</span>
   )}
   ```

   Match the comment style of the existing `import.meta.env.DEV` block ~16 lines below
   (the "Expand all" affordance) — that block explains why its guard must not be removed,
   and this one should read the same way.

3. **Leave everything else alone** — no CSS edit, no change to `docCount`, no change to
   the `totalDocs` subtitle or `Home.tsx`, no locale files. Confirm with
   `git status --short` that the diff is exactly one file.

4. **Verify** — run the Verification section below.

5. **Commit and open a PR** — stage the single explicit path (`git add
   src/pages/SchoolDetail.tsx`; never `git add -A`), commit, push, and
   `gh pr create --body-file` (never a heredoc). Then
   `gh pr merge --squash --delete-branch`, `git checkout main && git pull`.

6. **Update the index** — flip this plan's row in `.claude/plans/INDEX.md` to
   `Implemented` with the PR link.

7. **Stop.** Report the merge and say the change is ready to deploy whenever the user
   wants it. Do **not** run `npm run deploy`.

## Files touched

| File | Change |
|---|---|
| `src/pages/SchoolDetail.tsx` | edit — wrap the `<span className="count">` in the dossier nav in `import.meta.env.DEV`, with an explanatory comment |
| `.claude/plans/INDEX.md` | edit — status → `Implemented` + PR link (step 6) |
| `.claude/plans/removedocumentcounts.md` | edit — add `## Implementation notes` only if the build deviated |

## Verification

- [ ] `npx tsc --noEmit` — clean. **Then `npm run build` and read its exit code**, which is
      the authoritative type check: `tsc --noEmit` has passed on a type error the build
      caught (see the repo's standing note on `tsc -b`).
- [ ] `npm run build` — succeeds end to end, including the chained `check:schema`,
      `check:live`, `check:chrome`, `check:runtime`, `check:spans`, `check:news` and the
      prerender pass.
- [ ] `npm run check:seo` — passes; in particular no pre-rendered page drops under the
      20,000-byte floor.
- [ ] **Browser check, dev — counts PRESENT.** `npm run dev`, open a school with a rich
      sidebar (e.g. `/school/providence-day/`), and confirm the "Research areas" list still
      shows `01`/`08`/`15`-style numbers, right-aligned as today. This repo's standing
      lesson is that render-layer defects survive every automated check, so this step is
      not optional.
- [ ] **Browser check, production build — counts ABSENT.** `npm run build && npx vite
      preview`, open the same school page, and confirm the area names render with **no**
      number and stay left-aligned with no layout shift or stray gap. Check one collapsed
      and one expanded state of the page; also confirm the active-area left-border
      highlight still works (`.dossier-nav a.is-active`).
- [ ] **Pre-rendered HTML.** `grep -c 'class="count"' dist/school/providence-day/index.html`
      → expect `0`. This is the cheap proof that the guard survived the build rather than
      being merely invisible.
- [ ] **One non-English locale, production build** — load the same page with `?lang=es`
      and confirm the sidebar still renders correctly with the counts gone (the labels are
      longer in several locales; this is the layout worth one look). Note the locale key is
      `csc.lang` / `?lang=`, not i18next's default.

## Risks

| Risk | Mitigation |
|---|---|
| Someone later "tidies up" the now-unused-looking `.count` CSS or the `docCount` import | The step-2 comment says explicitly that both are still live in dev |
| The guard is extended to the header subtitle or Home cards by a well-meaning follow-up | Out of scope is stated twice — in Decisions and its own section |
| `space-between` leaves a visible gap or right-aligns the label with the count gone | A lone flex child under `space-between` sits at the start; confirmed against the existing `.dossier-nav-welcome` precedent, and the production browser check looks for exactly this |
| Momentum carries the session into `npm run deploy` after the merge | Step 7 ends the turn; the publishing standard is restated in Approvals |

## Open questions

None. Scope and the UX gate were both settled with the user during planning on 2026-08-30.
