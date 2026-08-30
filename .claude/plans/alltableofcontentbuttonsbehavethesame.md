---
name: alltableofcontentbuttonsbehavethesame
title: Make the Welcome Video and Latest News table-of-contents items look and behave like every other item
status: implemented
phases: 1
created: 2026-08-30
branch: fix/toc-buttons-behave-the-same
prs: [250]
---

# Make the Welcome Video and Latest News table-of-contents items look and behave like every other item

## Goal

On a school page, the **Welcome Video** and **Latest News** entries in both tables of
contents render permanently in the school's brand colour, so they read as *selected* at
all times — even when the reader is looking at a research area. Every other entry is
neutral until clicked. This plan removes that permanent accent treatment and folds the two
entries into the same one-at-a-time selection state the research areas already use, in
**both** the horizontal chip row in the page header and the vertical sidebar rail.

It also sets the page's initial selection: on load, **Welcome Video** is the selected
entry — which is honest, because the Welcome Video section is what the reader is already
looking at when the page opens.

Done when: on load, exactly one entry is highlighted in each table of contents and it is
Welcome Video; and clicking any entry — Welcome Video, Latest News, or a research area —
highlights exactly that one and clears whatever was highlighted before.

## Context

Both tables of contents live in [`src/pages/SchoolDetail.tsx`](../../src/pages/SchoolDetail.tsx),
and both are built the same way: two hardcoded `<a>` elements for Welcome Video and Latest
News, followed by a `covered.map(...)` over the research areas.

**Selection state** is a single `useState` at [`SchoolDetail.tsx:356`](../../src/pages/SchoolDetail.tsx#L356):

```ts
const [activeSlug, setActiveSlug] = useState<string | null>(null)
```

It seeds to `null`, so **nothing** is highlighted on load today — the accent treatment on
the two entries is pure CSS and is not selection state. This plan changes that seed as
well (see step 2a): the reader lands on the Welcome Video section, so that entry should be
the one shown as selected.

Each research-area link sets it on click and compares against it to decide its class —
`t.slug === activeSlug ? 'chip is-active' : 'chip'` in the header row (line 491) and
`t.slug === activeSlug ? 'is-active' : undefined` in the sidebar (line 554). The Welcome
Video and Latest News links **never call `setActiveSlug` and never read it**. They are
outside the selection model entirely, which is half the defect — clicking them leaves the
previously-clicked research area still highlighted.

**The permanent-highlight appearance** comes from two CSS classes, each applied
unconditionally:

| Where | Element | Class | Lines |
|---|---|---|---|
| Header chip row | Welcome Video | `chip chip-accent` | `SchoolDetail.tsx:470` |
| Header chip row | Latest News | `chip chip-accent` | `SchoolDetail.tsx:480` |
| Sidebar rail | Welcome Video | `dossier-nav-welcome` | `SchoolDetail.tsx:532` |
| Sidebar rail | Latest News | `dossier-nav-welcome` | `SchoolDetail.tsx:542` |

In [`src/index.css`](../../src/index.css):

```css
/* line 538 — the header chips */
.chip-accent {
  color: var(--brand);
  border-color: color-mix(in srgb, var(--brand) 45%, transparent);
  background: color-mix(in srgb, var(--brand) 8%, transparent);
}
.chip-accent:hover { color: var(--brand); border-color: var(--brand); }

/* line 839 — the sidebar rail */
.dossier-nav-welcome {
  justify-content: flex-start !important;
  margin-bottom: 10px;
  color: var(--brand);
}
```

Compare against what "selected" actually means for a research area — `.chip.is-active`
(line 535) is `color: var(--ink); border-color: var(--brand);` and `.dossier-nav
a.is-active` (line 833) is `border-left-color: var(--brand); color: var(--ink);`. The
accent variants are a *different* highlight rather than the same one stuck on, but to a
reader they read as the same thing: these two are lit and the rest are not.

**`.dossier-nav-welcome` is doing two unrelated jobs**, and only one of them is the
defect. Its `color: var(--brand)` is the permanent highlight and must go. Its
`justify-content: flex-start !important` and `margin-bottom: 10px` are **layout** and must
stay: the sidebar's base rule `.dossier-nav a` is `justify-content: space-between`, which
exists to push the document-count badge to the right edge — and these two entries carry no
count badge, so without the override their icon and label would be flung to opposite ends
of the rail. The `margin-bottom` separates them from the `RESEARCH AREAS` group label
below. Do not delete the class; edit it.

**Neither class has any other consumer.** `grep -rn "chip-accent\|dossier-nav-welcome" src/ scripts/`
returns exactly the six lines listed above (two CSS definitions plus one `:hover`, and the
four JSX usages). Nothing else in the app or the check scripts references either name, so
this change is fully contained to the two files.

**Anchors and scroll behaviour are already correct and are not part of this change.** The
two entries link to `#welcome` and `#news`, handled by `scrollToId` at
[`SchoolDetail.tsx:317`](../../src/pages/SchoolDetail.tsx#L317), which targets the real
section ids — `<section id="welcome">` in
[`WelcomeVideo.tsx:31`](../../src/components/WelcomeVideo.tsx#L31) and
`<section id="news">` in [`LatestNews.tsx:292`](../../src/components/LatestNews.tsx#L292).
Research areas use the sibling `scrollToTopic`, which delegates to the same `scrollToId`.
Both keep their existing scroll handler untouched.

**Conditional rendering stays as-is.** Welcome Video renders only when
`brand.welcomeVideoUrl` is set; Latest News only when `newsSourceFor(slug)` returns a
source (`SchoolDetail.tsx:445`). That is the project's absence-of-data rule and this plan
does not touch it — a school with neither still shows a plain research-area list.

## Decisions

- **Widen `activeSlug` to hold `'welcome'` and `'news'` rather than adding new state** —
  the state's job is "which one table-of-contents entry is selected", and one variable is
  what makes selection mutually exclusive for free. Two booleans alongside it would let
  two entries light up at once, which is the bug in a new form. Its type is already
  `string | null`, so no type change is required; only the variable's *meaning* widens from
  "topic slug" to "table-of-contents key".
- **Seed the selection to `'welcome'`, falling back to `'news'` then the first research
  area** — the page opens scrolled to whichever section renders first, so seeding to the
  entry that matches it keeps the highlight honest. A hardcoded `'welcome'` would leave a
  school without a Welcome Video showing *nothing* selected on load, and a school with
  neither a video nor a news source showing a stale highlight for a section that does not
  exist; the fallback chain follows the render order, so the seeded entry always exists.
- **Keep the ▷ and ▤ icons** — user-confirmed during planning. They mark these two as
  not-a-research-area without implying selection; only colour/tint changes.
- **The two entries take the same `is-active` classes as a research area**, rather than a
  new modifier — that is what makes them look identical when selected, which is the ask.
- **`.chip-accent` is deleted outright; `.dossier-nav-welcome` is edited, not deleted** —
  the first is purely the accent tint, the second also carries required layout (see
  Context).
- **Single-phase** — see *Out of scope*.
- **No new locale keys** — the two labels already exist and are unchanged:
  `school.welcomeVideo` (`"Welcome Video"`) and `news.tocLabel` (`"Latest News"`) are
  present in all ten `src/locales/*.json` catalogs and are re-used verbatim.

## Approvals needed

**None.** This is a correction to the styling of existing table-of-contents entries, not a
new card, section, stat tile, Compare row, metric key, or topic — so the UX-design gate in
`CLAUDE.md` does not apply. No reordering either: the entries keep their current positions
(Welcome Video, then Latest News, then the research areas) in both tables of contents.

## Out of scope

- **No translation work, and no locale files are touched.** This is **single-phase — it
  adds no user-facing text.** Both labels already exist as keys in every catalog and are
  re-used unchanged; the change is CSS and a class expression. Do not open a Phase 2.
- **No change to scroll behaviour, anchors, or section ids.**
- **No scroll-spy.** Selection is seeded once on load (step 2a) and is click-driven
  thereafter — `activeKey` is never updated as the reader scrolls. Click-driven is how the
  research areas behave today, and matching it is the whole point; adding scroll-spy would
  be a new feature and would change the research areas' behaviour too. One consequence to
  accept deliberately: a reader who scrolls from the video down to Sports without clicking
  still sees Welcome Video highlighted.
- **No change to which entries render** (`brand.welcomeVideoUrl` / `newsSourceFor`).
- **No change to the `.dossier-nav-welcome` layout properties** (`justify-content`,
  `margin-bottom`) — only its `color`.
- **The icons stay.**

## Steps

**Single-phase — adds no user-facing text.**

1. **Branch.** `git checkout main && git pull`, then
   `git checkout -b fix/toc-buttons-behave-the-same`.

2. **Rename the state variable for its widened meaning** — in
   [`src/pages/SchoolDetail.tsx`](../../src/pages/SchoolDetail.tsx) around line 356, rename
   `activeSlug` / `setActiveSlug` to `activeKey` / `setActiveKey` and update the comment
   above it to say it holds the selected table-of-contents entry — a research-area slug, or
   `'welcome'` / `'news'` — rather than only a research area. Update the four existing
   reads/writes in the two `covered.map` blocks (lines ~491, ~494, ~554, ~557) to the new
   name. The declared type `string | null` is unchanged.

   *This rename is cosmetic but load-bearing for the next reader: a variable named
   `activeSlug` that can hold `'welcome'` invites someone to "fix" it back. If the rename
   turns out to touch more than the six sites above, keep the old name and just widen the
   comment — the rename is not worth a sprawling diff.*

2a. **Seed the selection to the first entry that actually renders** — the same
   declaration from step 2 gets an initial value instead of `null`. It must be computed,
   not hardcoded, because the two entries are conditional:

   ```ts
   /* The page opens at the top, so the first table-of-contents entry that renders is the
      section the reader is already looking at — seed the selection to match it. The chain
      follows the render order in both tables of contents (Welcome Video, Latest News, then
      the research areas), so the seeded key always names a section that exists. */
   const initialKey = brand.welcomeVideoUrl
     ? 'welcome'
     : newsSource
       ? 'news'
       : (covered[0]?.slug ?? null)
   const [activeKey, setActiveKey] = useState<string | null>(initialKey)
   ```

   **Ordering constraint — this is the one thing that will bite.** `useState` must be
   called before any early `return`, but `brand`, `newsSource` and `covered` are currently
   computed *after* the existing hooks: `covered` at `SchoolDetail.tsx:376`, and `brand`
   / `newsSource` down at lines ~443/445, below at least one early return. Do **not** move
   the `useState` down to meet them — that reorders hooks and breaks the rules of hooks.
   Instead compute what the seed needs *above* the hook. `brandOf(slug)` and
   `newsSourceFor(slug)` are pure lookups on `slug` and can be hoisted to just under the
   existing `const school = schoolBySlug(slug)`; `topicsForSchool(slug)` likewise. If
   hoisting proves awkward, the equivalent safe form is to seed `null` and set the initial
   key in a `useEffect` keyed on `slug` — but prefer the hoist, since an effect paints one
   frame with nothing selected.

   **It must re-seed when the school changes.** This component is reused across schools
   (client-side navigation between school pages does not remount it). Verify against the
   existing `useEffect(..., [slug, lang])` blocks how the page resets on a school change,
   and reset `activeKey` to the newly-computed `initialKey` there too — otherwise
   navigating from a school whose Sports area was selected to a different school leaves
   `'sports'` highlighted instead of Welcome Video. **The browser check below tests exactly
   this.**

3. **Make the header Welcome Video chip selectable** — at `SchoolDetail.tsx:468–477`,
   change `className="chip chip-accent"` to the same conditional the research areas use,
   keyed on `'welcome'`, and set the state in the click handler before scrolling:

   ```jsx
   <a
     className={activeKey === 'welcome' ? 'chip is-active' : 'chip'}
     href="#welcome"
     onClick={(e) => { setActiveKey('welcome'); scrollToId(e, 'welcome') }}
   >
     <PlayIcon size={10} />
     {tr('school.welcomeVideo')}
   </a>
   ```

   Keep the icon, the `href`, and the `scrollToId` call exactly as they are.

4. **Make the header Latest News chip selectable** — the same edit at
   `SchoolDetail.tsx:478–487`, keyed on `'news'`, keeping `<NewspaperIcon size={10} />`
   and `{tr('news.tocLabel')}`.

5. **Make the sidebar Welcome Video item selectable** — at `SchoolDetail.tsx:530–539`,
   the sidebar uses a bare `is-active` (the `.dossier-nav a` selector supplies the rest),
   so keep `dossier-nav-welcome` for its layout and append the modifier conditionally:

   ```jsx
   <a
     className={activeKey === 'welcome' ? 'dossier-nav-welcome is-active' : 'dossier-nav-welcome'}
     href="#welcome"
     onClick={(e) => { setActiveKey('welcome'); scrollToId(e, 'welcome') }}
   >
   ```

   Keep `<PlayIcon size={13} />` and the label.

6. **Make the sidebar Latest News item selectable** — the same edit at
   `SchoolDetail.tsx:540–549`, keyed on `'news'`, keeping `<NewspaperIcon size={13} />`.

7. **Delete the `.chip-accent` rules** — remove both lines 538–544 of
   [`src/index.css`](../../src/index.css) (the `.chip-accent` block *and* its
   `.chip-accent:hover` line), along with the two-line comment above them that describes
   the accent variant. With step 3–4 done, nothing references the class; leaving it would
   be dead CSS that invites reuse of the very treatment being removed.

8. **Strip the permanent brand colour from `.dossier-nav-welcome`** — in `index.css` at
   line 839, delete only the `color: var(--brand);` declaration. **Keep**
   `justify-content: flex-start !important;` and `margin-bottom: 10px;`. Rewrite the
   comment above the rule so it explains what the class is now *for* — these two entries
   carry no count badge, so they override the rail's `space-between` and sit above the
   group label — with no mention of an accent treatment. The entries then inherit the
   rail's normal `.dossier-nav a` colour, and light up via `.dossier-nav a.is-active` like
   every sibling.

9. **Verify** per the section below, then commit with explicit paths only —
   `git add src/pages/SchoolDetail.tsx src/index.css` — after running
   `git status --short` and confirming nothing else is staged.

10. **Open a PR** with `--body-file` (never a heredoc), then
    `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.

11. **Stop. Do not deploy.** Report the merge and say the change is ready to deploy
    whenever the user asks. Publishing is a separate act with a separate owner
    (`CLAUDE.md`, publishing standard).

## Files touched

| File | Change |
|---|---|
| `src/pages/SchoolDetail.tsx` | edit — widen `activeSlug`→`activeKey`; make the four Welcome Video / Latest News links set and read it, replacing their unconditional accent classes |
| `src/index.css` | edit — delete the `.chip-accent` block and its `:hover`; drop `color: var(--brand)` from `.dossier-nav-welcome`, keeping its layout properties |

## Verification

Single-phase, so one pass.

- [ ] `npx tsc --noEmit` — clean. **Then `npm run build` and read its exit code** — this
      repo has a standing lesson that `--noEmit` has passed on a type error the build
      caught; trust the build.
- [ ] `npm run build` — succeeds. This chains `check:schema`, `check:seo`, `check:live`
      and `check:runtime`; none should change, since no data, route or overlay is touched.
      A failure here is unrelated to this plan — investigate before assuming otherwise.
- [ ] `grep -rn "chip-accent" src/` — **no matches.** Confirms step 7 left no dead class
      and no orphaned usage.
- [ ] `grep -n "color: var(--brand)" src/index.css` — the `.dossier-nav-welcome` rule is
      **not** among the hits; other rules legitimately still use it.

**Browser check — required, and the only check that can actually see this defect.** Every
rule changed here is render-layer; no script in this repo asserts anything about chip
colour. Run `npm run dev` and open a school page with **both** entries present —
**Providence Day** (`/school/providence-day/`) has a Welcome Video and a news source, which
is the exact page in the bug report. Note the news section is lazy-loaded and the sidebar is
sticky, so scroll rather than judging from the initial viewport.

- [ ] **On load, Welcome Video is the selected entry** — in *both* the header chip row and
      the sidebar rail — and it wears exactly the treatment a clicked research area wears
      (`is-active`), not the old accent tint. Everything else is neutral: Latest News looks
      the same as `Admissions`, `Sports`, and the rest.
- [ ] **Exactly one entry is highlighted on load**, not two. Confirms the seed did not
      land alongside a leftover accent rule.
- [ ] **Navigate to another school page from within the app** (click through from the home
      or compare page, don't reload) — the selection **resets to that school's Welcome
      Video**, rather than keeping the entry that was selected on the previous school. This
      is the step-2a re-seed check and the most likely thing to be missed.
- [ ] **A school with no Welcome Video** — its first rendered entry (Latest News, or the
      first research area if it has no news source either) is the one selected on load, and
      no highlight points at a section that isn't on the page.
- [ ] **Click Welcome Video in the header chip row** — it takes the same `is-active`
      treatment a research-area chip takes, and the page scrolls to the video.
- [ ] **Then click a research area** — the research area lights up and **Welcome Video goes
      back to neutral.** Exactly one chip is highlighted. This is the mutual-exclusion
      assertion; it is the one most likely to fail if step 2's state is duplicated.
- [ ] **Repeat both in the vertical sidebar rail** — the brand-coloured left border moves to
      the clicked item and leaves the previous one, for Welcome Video, Latest News, and a
      research area alike.
- [ ] **Sidebar layout did not regress** — Welcome Video and Latest News still show their
      icon and label together at the **left** of the rail (not pushed apart to opposite
      ends), and still sit clear of the `RESEARCH AREAS` group label. A regression here
      means step 8 removed more than the `color` line.
- [ ] **Hover states** — hovering any of the four entries now behaves like hovering a
      research area, with no leftover accent tint.
- [ ] **A school with only one of the two** — e.g. a school with a news source but no
      Welcome Video — still renders correctly, with the remaining entry neutral and
      selectable and no gap where the other would be.

## Risks

| Risk | Mitigation |
|---|---|
| Step 8 removes the layout properties along with the colour, flinging the sidebar icon and label to opposite ends of the rail | The Context section explains why `justify-content`/`margin-bottom` exist; the sidebar-layout browser check above catches it |
| The seed is computed after the `useState` call, or the hook is moved below an early return — the rules of hooks break, or `brand` is read before it is defined | Step 2a names the exact current line numbers of `brand`/`newsSource`/`covered` and requires hoisting the lookups above the hook, with a `useEffect` fallback |
| The seed is set once and never re-computed, so navigating between school pages carries the previous school's selection over | Step 2a requires resetting on `slug` change alongside the existing `[slug, lang]` effects; the cross-school browser check above catches it |
| A school with no Welcome Video shows a highlight for a section it does not have | The seed is a fallback chain following render order, never a hardcoded `'welcome'`; there is a browser check for that school shape |
| A future reader re-adds an accent to mark these as not-a-research-area | The ▷/▤ icons already carry that distinction and are deliberately kept; the rewritten comment on `.dossier-nav-welcome` records the intent |
| The rename in step 2 sprawls into unrelated call sites | Step 2 caps it: if it touches more than the six listed sites, keep the old name and widen only the comment |

## Open questions

None — both scope questions were settled with the user during planning: the entries become
genuinely selectable (not merely de-tinted), and the ▷/▤ icons stay.
