---
name: removetopiccount
title: Show the research-area header topic/division count in development only
status: implemented
phases: 1
created: 2026-08-31
branch: feat/remove-topic-count
prs: [255]
---

# Show the research-area header topic/division count in development only

## Goal

On a school dossier page, each research-area section header renders the area name
followed by a muted count of the cards inside it — `Student Clubs  5 topics`,
`Course Offerings  3 divisions`. That number is an internal structure statistic: it
counts *cards we happened to build*, not anything about the school, and it invites the
wrong comparison ("why does this school only have 2?"). Hide it in production while
keeping it visible on the local dev server, where it is a useful at-a-glance signal that
a school's area was built out to the expected depth.

Done when: `npm run dev` still shows `5 topics` / `3 divisions` beside each area heading,
and a `vite build` (and therefore the live site and every pre-rendered page) shows the
area heading with no count and no stray gap before the "Compare on …" button.

## Context

**The one block that renders it** is
[`src/pages/SchoolDetail.tsx:814-821`](../../src/pages/SchoolDetail.tsx#L814-L821),
inside the `covered.map(...)` loop that builds each `<section className="topic-section">`:

```tsx
<div className="topic-section-head">
  <span className="glyph"><TopicGlyph slug={t.slug} /></span>
  <h2>{topicLabel(tr, t.slug, t.name)}</h2>
  <span className="topic-count">
    {!ready
      ? '…'
      : offerings
        ? tr('school.divisions', { count: cardCount })
        : tr('school.topics', { count: cardCount })}
  </span>
  <a className="btn" href={toCompare(t.slug, otherSlugs)} …>
    {tr('school.compareOn', …)} <ArrowIcon />
  </a>
</div>
```

Note it has **three** states, not one: a `'…'` placeholder while the research notes are
still loading, a `divisions` plural for Course Offerings, and a `topics` plural for every
other area. All three are the same span and all three go away together — the loading
ellipsis is part of this affordance, not a separate thing to preserve.

**The pattern to follow is already in this same file, twice.** The sidebar document
counts at [`SchoolDetail.tsx:605`](../../src/pages/SchoolDetail.tsx#L605) and the
"Expand all" print affordance at
[`SchoolDetail.tsx:623`](../../src/pages/SchoolDetail.tsx#L623) are both guarded by
`{import.meta.env.DEV && (...)}` and each carries a comment block explaining why that
guard is correct and must not be removed. This change is the same shape and should be
written to match them. `import.meta.env.DEV` is `true` only under the `vite` dev server
and `false` in every `vite build`, so no runtime flag, env var, or build config is needed.

**This is the direct sequel to `removedocumentcounts`** (PR #247, merged 2026-08-30),
which did exactly this to the *sidebar* counts. Read
[`.claude/plans/removedocumentcounts.md`](removedocumentcounts.md) before starting — this
plan is deliberately its twin, with one real difference called out below.

**THE ONE REAL DIFFERENCE FROM THE SIDEBAR CHANGE: this count is a TRANSLATED string.**
The sidebar counts were bare digits from `String(...).padStart(2, '0')`. These are
`tr('school.topics', { count })` and `tr('school.divisions', { count })` — i18next plural
keys that exist in **all ten** `src/locales/*.json` catalogs (verified 2026-08-31: each
catalog holds `topics_one`, `topics_other`, `divisions_one`, `divisions_other`, plus
`subAreas_*` which is a different string and out of scope). That has two consequences,
both of which point the same way:

- **The keys STAY in all ten catalogs.** They are still rendered under `npm run dev`.
  Deleting them would break the dev-only rendering this plan exists to preserve, and
  would be a nine-locale diff for zero user-visible benefit.
- **The plan is still single-phase.** No user-facing text is added, removed, or reworded
  in any locale — a string that already exists simply stops rendering in one build mode.
  There is nothing for a translator to see and nothing for the user to review in English
  before other locales follow.

**`school.topics` and `school.divisions` have no other consumer.** Grep confirms these
two `tr(...)` calls are the only sites in `src/` (2026-08-31). `home.stats.topics` in
[`src/pages/Home.tsx:79`](../../src/pages/Home.tsx#L79) is a *different* key on the Home
hero and is out of scope.

**`cardCount` is computed just above and is used nowhere else.** The chain at
[`SchoolDetail.tsx:793-810`](../../src/pages/SchoolDetail.tsx#L793-L810) derives it from
whichever structured-card accessor matched. It must stay declared where it is: `tsconfig.app.json`
sets `noUnusedLocals: true`, so if the guard were written in a way that makes the variable
unreferenced in a production build, the build would fail. **It will not** — the guard is a
*runtime* JSX conditional, so the expression referencing `cardCount` is still present in
the source that `tsc` type-checks; Vite's dead-code elimination happens after, on the
bundle. Do not "tidy" `cardCount` into the guarded branch or delete it.

**`ready` is used in ~10 other places** in the same loop (the loading state, the per-area
structured-card gates). It stays exactly as it is; only its use *inside this span* goes.

**CSS needs no change, and this is worth stating so it isn't "fixed".**
`.topic-section-head` is `display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap`
and the Compare button is pushed right by `.topic-section-head .btn { margin-left: auto }`
([`src/index.css:890-902`](../../src/index.css#L890-L902)). The count is not what
positions anything: with it gone the flex row is glyph + `h2` + button, the `margin-left:
auto` still pins the button to the right edge, and the one `gap` that disappears is the one
that was around the count. The `.topic-count` rule at
[`src/index.css:901`](../../src/index.css#L901) **stays** — it is still live under
`npm run dev`.

**No check, test, or script asserts on this count.** `.topic-count` appears in `src/` only
at the render site and the CSS rule; the sole other hit in the repo is a code sample inside
[`.claude/plans/deep-dive-podcast.md`](deep-dive-podcast.md), a historical plan document
that is not edited. `check:seo` / `prerender.mjs` enforce a 20,000-byte floor per
pre-rendered page; removing ~8 spans of ~30 bytes is ~240 bytes against pages that clear
the floor by a wide margin — not a risk, but the build runs both checks anyway.
`check:chrome` verifies that chrome keys *exist*, not that they are *rendered*, so leaving
the keys in place keeps it green.

## Decisions

- **Scope is the research-area section-header count only** — the `<span
  className="topic-count">` in `.topic-section-head`. The school header subtitle
  ("8 areas · 50 documents distilled"), the Home page school cards, and the Home hero
  stat tiles keep their counts in production and are **not** touched. Do not "finish the
  job" by extending the guard to them.
- **The `'…'` loading placeholder goes with it.** It exists only to reserve the count's
  slot while notes load. With the count hidden in production there is nothing to reserve,
  and shipping a lone ellipsis beside every heading would be worse than either state.
- **`import.meta.env.DEV`, not a new env var or config flag** — it is the mechanism this
  file already uses twice for exactly this purpose, it is statically replaced at build
  time so the branch is dead-code-eliminated, and it needs no new plumbing.
- **Guard the `<span>`, don't delete it** — the count stays useful locally, which is the
  whole point of the request ("only show that when we run locally").
- **Keep the `.topic-count` CSS rule and all ten locale keys** — still used in dev.
- **Single-phase** — adds, removes and rewords no user-facing text. No locale file is
  edited and no `src/data` prose is touched, so there is no Phase 2 and no translation
  work. See the translated-string note in Context for why an already-shipped string that
  merely stops rendering does not trigger the English-first split.

## Approvals needed

**None.** The UX-design gate in `CLAUDE.md` is satisfied: it governs *ingestion* silently
growing the UI, and explicitly exempts direct user requests to change UI. This is a direct
request (2026-08-31, with an annotated screenshot circling the `5 topics` label).

Publishing is a separate matter: **do not run `npm run deploy`.** Merging the PR is
pre-authorized; deploying is not, and this plan does not grant it.

## Out of scope

- The school header subtitle counts (`school.subAreas`, `school.subDocs`).
- The Home page school-card counts (`home.schoolCardMeta`) and the Home hero stat tiles
  (`home.stats.topics`, `home.stats.documents`) — `Home.tsx:79` is a different key.
- The sidebar document counts — already dev-only via PR #247.
- `cardCount`, `ready`, and every structured-card accessor above the render site.
- The `.topic-count` CSS rule and the `.topic-section-head` flex rules.
- All ten `src/locales/*.json` catalogs. The four plural keys stay.

## Steps

**Single-phase — adds no user-facing text.**

1. **Branch** — `git checkout -b feat/remove-topic-count` from an up-to-date `main`.

2. **Guard the count span** — in
   [`src/pages/SchoolDetail.tsx`](../../src/pages/SchoolDetail.tsx), inside the
   `covered.map(...)` section loop, wrap the whole `<span className="topic-count">` —
   including its `!ready ? '…'` branch — in an `import.meta.env.DEV` guard:

   ```tsx
   <h2>{topicLabel(tr, t.slug, t.name)}</h2>
   {/* Dev-only structure signal: how many cards this research area holds
       ("5 topics", or "3 divisions" for Course Offerings). It counts cards we
       built, not anything about the school, so a reader learns nothing from it
       and is invited into the wrong comparison — it NEVER ships to the
       production site. `import.meta.env.DEV` is true only under the `vite` dev
       server and false in every `vite build`, including the pre-render pass
       (which drives the built dist/). Do not remove the DEV guard; do not
       delete the `.topic-count` CSS rule or the `school.topics` /
       `school.divisions` keys from the ten locale catalogs — all are still live
       in dev. The `'…'` placeholder is part of this affordance: it only
       reserves the count's slot while notes load, so it goes with it. */}
   {import.meta.env.DEV && (
     <span className="topic-count">
       {!ready
         ? '…'
         : offerings
           ? tr('school.divisions', { count: cardCount })
           : tr('school.topics', { count: cardCount })}
     </span>
   )}
   ```

   Match the comment style of the two existing `import.meta.env.DEV` blocks earlier in
   the same file (the sidebar counts at ~line 605 and "Expand all" at ~line 623) — both
   explain why their guard must not be removed, and this one should read the same way.

3. **Leave everything else alone** — no CSS edit, no locale edit, no change to
   `cardCount`, `ready`, `topicLabel`, or the Compare button. Confirm with
   `git status --short` that the diff is exactly one file.

4. **Verify** — run the Verification section below.

5. **Commit and open a PR** — stage the single explicit path
   (`git add src/pages/SchoolDetail.tsx`; **never** `git add -A`), commit, push, and
   `gh pr create --body-file` (never a heredoc). If `git push` reports
   `Everything up-to-date` but the PR won't create, check `git rev-parse HEAD` against
   `git ls-remote origin feat/remove-topic-count` — this repo has hit a silent no-op push.
   Then `gh pr merge --squash --delete-branch`, `git checkout main && git pull`.

6. **Update the index** — flip this plan's row in `.claude/plans/INDEX.md` to
   `Implemented` with the PR link.

7. **Stop.** Report the merge and say the change is ready to deploy whenever the user
   wants it. Do **not** run `npm run deploy`, and do not chain it after the merge.

## Files touched

| File | Change |
|---|---|
| `src/pages/SchoolDetail.tsx` | edit — wrap the `<span className="topic-count">` in `.topic-section-head` in `import.meta.env.DEV`, with an explanatory comment |
| `.claude/plans/INDEX.md` | edit — status → `Implemented` + PR link (step 6) |
| `.claude/plans/removetopiccount.md` | edit — add `## Implementation notes` only if the build deviated |

## Verification

- [ ] `npx tsc --noEmit` — clean. **Then `npm run build` and read its exit code**, which
      is the authoritative type check: `tsc --noEmit` has passed on a type error the build
      caught (see the repo's standing note on `tsc -b`). Watch specifically for a
      `noUnusedLocals` complaint about `cardCount` — it should not appear (see Context),
      but if it does, the guard was written wrongly, and the fix is to restore the
      reference in the JSX, never to delete the variable.
- [ ] `npm run build` — succeeds end to end, including the chained `check:schema`,
      `check:live`, `check:chrome`, `check:runtime`, `check:spans` and `check:news`.
      `check:chrome` in particular must stay green: the four plural keys remain in all ten
      catalogs.
- [ ] `npm run check:seo` — passes; in particular no pre-rendered page drops under the
      20,000-byte floor.
- [ ] **Browser check, dev — count PRESENT.** `npm run dev`, open a school with several
      areas (e.g. `/school/providence-day/`), and confirm each research-area heading still
      shows `N topics` beside it, and that **Course Offerings** shows `N divisions` — the
      two branches are different strings and only that page proves both. This repo's
      standing lesson is that render-layer defects survive every automated check, so this
      step is not optional.
- [ ] **Browser check, production build — count ABSENT.** `npm run build && npx vite
      preview`, open the same school page, and confirm every area heading renders with
      **no** count, no `…`, and no stray gap between the heading and the right-aligned
      "Compare on …" button. Scroll the whole page: the count renders per area, so one
      heading proves nothing about the rest.
- [ ] **Check the pre-rendered HTML directly** —
      `grep -c 'topic-count' dist/school/providence-day/index.html` should print `0`.
      This is the cheap proof that the pre-render pass (which drives the live site's first
      paint) inherited the guard.
- [ ] **Check one non-English locale in the production build** — open
      `?lang=es` on the same page under `vite preview` and confirm no count and no
      `5 temas`-style string appears. The locale key is **`csc.lang` / `?lang=`**, not
      i18next's default; the wrong one fails silently and uniformly.
- [ ] `git status --short` before committing — exactly one file staged.
