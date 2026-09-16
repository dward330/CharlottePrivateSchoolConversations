---
name: sources
title: Collapse source rows by default, and make every source hyperlink look like one
status: implemented
phases: 1
created: 2026-09-15
branch: feat/sources
prs: [304]
---

# Collapse source rows by default, and make every source hyperlink look like one

## Goal

Two changes to the citation rows that close every research card:

1. **Source rows start COLLAPSED.** Today each of the ~40 rows on a school page opens
   expanded, so the reader scrolls past a wall of citations they did not ask for. After
   this change the row renders as a single `Show sources` button, and the reader opens the
   ones they care about.
2. **Every source citation that IS a hyperlink looks like one.** Most already render a
   trailing `↗`; two link paths do not, so the same page shows two visually different
   kinds of link. All hyperlinked citations get the `↗`, plus an underline on hover.

We know it worked when: a freshly loaded school page shows no citation text until a
toggle is clicked, and every clickable citation anywhere on the page carries `↗` and
underlines when the pointer is over it.

**Single-phase — adds no user-facing text.** Both `cardLabels.showSources` and
`cardLabels.hideSources` (and the Course Offerings pair `courses.showSources` /
`courses.hideSources`) already exist and are already translated in **all ten**
`src/locales/*.json` catalogs — verified during planning: every catalog greps 4 matches
for `howSources|ideSources`. Flipping the initial state changes only WHICH existing key
renders first. The `↗` is a glyph in JSX, not a string; the hover underline is CSS. No
new key, no overlay work, no `src/data` prose change.

## Context

### The component

[`src/components/SourceRow.tsx`](../../src/components/SourceRow.tsx) is the single shared
component every citation row goes through, added 2026-08-31. Its header comment records
the decisions behind it and should be read before editing. It exports three things:

- `SourceToggle` — the button. Labelled by what the NEXT click does.
- `SourceRow` — for areas whose citations are a `Source[]` list (`{ label, url? }`).
  Renders each as either an `<a class="srcrow-item">{label} ↗</a>` or a
  `<span class="srcrow-item text-muted">`.
- `SourceRowRaw` — for the four rows whose citations are already assembled into a single
  wrapper node by the caller.

Both `SourceRow` and `SourceRowRaw` hold `const [hidden, setHidden] = useState(false)` —
**that `false` is the entire "expanded by default" behaviour**, and the two occurrences
are the whole of change 1.

The header comment currently says *"Each row therefore owns its own state and starts
EXPANDED, exactly as those two did."* That sentence becomes false with this change and
must be rewritten, not left.

### Who renders a citation, and whether it carries the arrow

Confirmed by grepping every `SourceRow` / `SourceRowRaw` consumer and every `↗` in `src/`.
There are **five** distinct link-rendering paths in the app:

| # | Path | File | Arrow today? |
|---|---|---|---|
| 1 | `SourceRow`'s `s.url` branch | `src/components/SourceRow.tsx:129` | **yes** — `{s.label} ↗` |
| 2 | ClubsProgram's inline per-tile attribution | `src/components/ClubsProgram.tsx:190` | **yes** — `{p.source.label} ↗` |
| 3 | Prose `sources` block → `.source-chip` | `src/components/ProseContent.tsx:146` | **yes** — `{hostOf(s.url)} ↗` |
| 4 | **Course Offerings' division source link** | `src/components/CourseOfferings.tsx:291–293` | **NO** |
| 5 | **`linkify()` — bare URLs in prose and in `<Cites>`** | `src/components/ProseContent.tsx:30–46`, class `.prose-link` | **NO** |

Paths 4 and 5 are the inconsistency the user is seeing. Path 1 is by far the most common
(every Arts, Sports, Clubs, College Support, After School, Summer and Admissions card).

### The three rows that are NOT links

`SourceRowRaw` has four callers. Three of them wrap a **plain string with no URL in it at
all** — verified by grepping the data files for `http`, which returns **0** in each:

- `ClubCatalog.tsx:117` → `.catalog-src-text`, from `clubCatalog.ts` `source: string`
- `ClubClusters.tsx:57` → `.clubrow-src-text`, from `clubClusters.ts` `source: string`
- `FinancialAidReport.tsx:329` and `:563` → `.fa-src-text`, from
  `financialAidReports.ts` `sources: string`

These are citations like `"Upper School Club List '25–26; school news"` — a document name,
not a URL. They stay plain text (see Decisions). The fourth `SourceRowRaw` caller,
Course Offerings, is path 4 above and DOES sometimes hold a URL (`sourceUrl` appears 29
times across `src/data/`).

### The CSS

[`src/index.css`](../../src/index.css) ends with a large, heavily commented
`Source rows — the shared .srcrow primitive` block (from line ~5729 to the end of file).
Its comment explains that **this block must stay at the END of the stylesheet**: the ten
per-area rules (`.as-src`, `.arts-src`, `.sports-src`, `.clubs-src`, `.cs-src`,
`.catalog-src`, `.courses-src`, `.clubrow-src`, `.fa-srcrow`, `.fa-sources`) are the same
specificity, so source order is what lets `.srcrow` win. **Any new rule added for this
plan goes inside or after that block.** Moving it earlier silently reverts ten rows.

`.srcrow > a` today gets only `align-self: stretch` — it has **no colour, underline or
hover rule of its own**, so it inherits the ambient anchor styling. That is why there is
somewhere to put the hover underline.

`.prose-link` (line ~1335) is the one link class that ALREADY ships an always-on faint
underline that darkens to `--brand` on hover. It is the model for the new rule, and it
needs the arrow added but **not** a hover-underline change — it already has one.

`.source-chip` (line ~1501) is a boxed card with its own `border-color` + `translateY`
hover. It is deliberately left alone: adding an underline inside a bordered chip would
fight its existing affordance.

### Print and pre-render

Collapsing by default has two knock-on effects, both checked during planning:

- **`Expand all` cannot reach the new state.** `src/pages/SchoolDetail.tsx:392`'s
  `setAllDetails()` drives `mainRef.current.querySelectorAll('details')` through the DOM.
  Source rows are React `useState`, not `<details>`, so today's expand-all would leave
  every citation hidden — which would silently gut the print-out pass that CLAUDE.md
  requires for every locale rollout. Step 4 fixes this. (The button is `import.meta.env.DEV`
  only and never ships to production; keep that guard.)
- **Pre-rendered pages lose the citation text.** `scripts/prerender.mjs` renders the
  initial state, so collapsed rows mean the citation strings are absent from the built
  HTML. `scripts/check_seo.mjs` enforces `MIN_BYTES = 20_000` per page; a school dossier
  is far above that (the SEO floor exists to catch an unrendered ~2 KB shell), so this is
  expected to stay green — but it is an explicit verification step, not an assumption.

## Decisions

- **Hover underline, not always-on underline** (user's call) — the arrow is the at-rest
  affordance and the underline appears on hover. With ~40 stacked source rows an always-on
  underline reads as noise; on contact it confirms clickability. `.prose-link` keeps its
  existing always-on underline because it renders a bare URL inline in a sentence, where
  there is no arrow-bearing label to lean on.
- **The three URL-less rows stay plain text** (user's call) — catalog, club-clusters and
  financial-aid citations hold no URL, so there is nothing to link. Adding `↗` there would
  falsely signal clickability. This keeps the arrow meaning exactly one thing: *this opens
  a page*.
- **`Expand all` also opens source rows** (user's call) — so the required browser
  print-out pass still shows citations. Implemented by having the DEV-only button click the
  toggles through the DOM, matching how it already drives `<details>` (see step 4), rather
  than lifting `hidden` into a context — no card logic changes, which is the same reasoning
  the existing comment gives.
- **No `@media print` force-open rule** — with expand-all covering the print pass, a print
  rule would only help a reader who prints without clicking anything, and it cannot work
  anyway: `hidden` gates a React conditional, so the citation nodes are not in the DOM for
  CSS to reveal.
- **`.source-chip` is excluded from the hover-underline change** — it is a bordered chip
  with its own hover treatment and already carries `↗`.
- **The arrow is added as the literal `↗` glyph in JSX**, matching the three paths that
  already do it, rather than a CSS `::after`. A CSS pseudo-element would not be selectable
  or copyable and would diverge from the three existing call sites.

## Approvals needed

**None.** This changes the default state and the styling of existing citation rows — it
adds no card, section, stat tile, Compare row, metric key or topic, so the UX-design gate
does not apply. Confirmed with the user during planning: collapse-by-default, hover
underline, URL-less rows left as text, and expand-all covering print.

## Out of scope

- Backfilling URLs into the three URL-less citation rows (club catalog, club clusters,
  financial-aid report). That is a data pass, not this change. See
  `.claude/plans/citebackfill.md` for the existing thread.
- Any change to `.source-chip`'s appearance.
- A page-level show/hide-all-sources control. The per-row toggle was the user's explicit
  call on 2026-08-31 and is not being revisited.
- Removing the now-unused-looking `cardLabels.source` / `sports.source` / `finAid.source`
  locale keys — the `SourceRow.tsx` header comment explains they are still in use and must
  not be pruned.

## Steps

**Single-phase — adds no user-facing text.** All four toggle strings already ship in all
ten locale catalogs.

1. **Collapse both shared rows by default** — in
   [`src/components/SourceRow.tsx`](../../src/components/SourceRow.tsx), change
   `useState(false)` to `useState(true)` in **both** `SourceRow` (~line 103) and
   `SourceRowRaw` (~line 160). The state is named `hidden`, so `true` means collapsed.
   Then **rewrite the header comment**: the paragraph beginning
   *"THE TOGGLE IS PER-ROW, BY DECISION"* ends with *"Each row therefore owns its own state
   and starts EXPANDED, exactly as those two did."* — that is now wrong. Replace that last
   sentence with the new default and the reason (a school page renders ~40 rows; the reader
   opens the ones they want), and note the date of this change.

2. **Add the arrow to Course Offerings' link** — in
   [`src/components/CourseOfferings.tsx`](../../src/components/CourseOfferings.tsx) around
   line 291, the `division.sourceUrl` branch renders `{division.source}` inside an `<a>`.
   Change it to `{division.source} ↗`, matching `SourceRow.tsx:129`. Leave the non-URL
   `: ( division.source )` fallback branch untouched — it is not a link.

3. **Add the arrow to linkified bare URLs** — in
   [`src/components/ProseContent.tsx`](../../src/components/ProseContent.tsx), inside
   `linkify()` (~line 38), the `<a className="prose-link">` renders `{href}`. Change it to
   render `{href} ↗`. Note the surrounding structure: the anchor is wrapped in a `<span>`
   alongside `{trailer}` (trailing sentence punctuation kept outside the href). **The arrow
   goes INSIDE the anchor, before the closing tag — never after `{trailer}`**, or a URL
   ending a sentence renders `…html. ↗` with the arrow detached from the link. `linkify()`
   feeds paragraphs, list items, headings, table cells AND the `<Cites>` source line, so
   this one edit covers every bare-URL citation in prose.

4. **Make `Expand all` open the source rows too** — in
   [`src/pages/SchoolDetail.tsx`](../../src/pages/SchoolDetail.tsx), `setAllDetails()` at
   line 392 currently only walks `<details>`. Extend it to also drive the source toggles.
   The toggle renders as `<button class="catalog-src-toggle" aria-pressed={hidden}>`, so
   `aria-pressed` is the readable state: `aria-pressed="true"` means hidden. Query
   `mainRef.current.querySelectorAll('button.catalog-src-toggle')` and click only those
   whose current state disagrees with the target — i.e. for `open === true`, click each
   button with `aria-pressed="true"`; for `open === false`, click each with
   `aria-pressed="false"`. Clicking unconditionally would toggle correctly-set rows the
   wrong way. Two ordering notes: open the `<details>` FIRST, because a source row inside a
   closed card is not mounted and therefore not in the DOM to query; and React updates
   `aria-pressed` asynchronously, so if the buttons are read and clicked in one pass the
   check must use the value read at click time (a single `forEach` over a snapshot is fine
   — each button is visited once). Update the comment above `setAllDetails` to say it now
   drives both the cards and the source toggles, and why (the print-out pass needs
   citations visible). **Keep the `import.meta.env.DEV` guard on the button.**

5. **Add the hover underline** — in [`src/index.css`](../../src/index.css), inside the
   `Source rows — the shared .srcrow primitive` block at the **end** of the file (see
   Context — this block's position is load-bearing), add a rule for `.srcrow a`. At rest:
   `text-decoration: none`. On `:hover`: `text-decoration: underline` with
   `text-underline-offset: 2px` and `color: var(--brand)`, mirroring `.prose-link:hover`
   (line ~1343) so the two link types agree on hover colour. Add a `:focus-visible` rule
   matching `.prose-link:focus-visible` (`outline: 2px solid var(--brand); outline-offset:
   2px`) so keyboard users get the same signal — the rows are keyboard-reachable and
   currently have no focus treatment of their own. Use `.srcrow a` (descendant, not `>`)
   so it reaches both `SourceRow`'s direct `.srcrow-item` anchors AND Course Offerings'
   anchor nested inside `.courses-src-text`. Write a short comment saying why the arrow is
   the at-rest affordance and the underline is hover-only. Also add the same hover rule for
   `.clubs-program-src a` (ClubsProgram's inline attribution, path 2) — it is the one
   arrow-bearing link that is NOT inside a `.srcrow`, and leaving it out would reintroduce
   the inconsistency this plan exists to remove.

6. **Check the existing `.srcrow` comment block for staleness** — the block's prose
   describes the rows' layout and the toggle. Nothing in steps 1–5 changes the layout, but
   read it and correct anything that the new default contradicts.

## Files touched

| File | Change |
|---|---|
| `src/components/SourceRow.tsx` | edit — `useState(false)` → `useState(true)` in both components; header comment rewritten |
| `src/components/CourseOfferings.tsx` | edit — add `↗` to the `sourceUrl` anchor |
| `src/components/ProseContent.tsx` | edit — add `↗` inside the `.prose-link` anchor in `linkify()` |
| `src/pages/SchoolDetail.tsx` | edit — `setAllDetails()` also clicks `.catalog-src-toggle` buttons; comment updated |
| `src/index.css` | edit — hover underline + focus ring for `.srcrow a` and `.clubs-program-src a`, in the end-of-file `.srcrow` block |

## Verification

Single-phase, so one pass.

### Automated

- [ ] `npx tsc -b` — clean. **Read the exit code**, not just the output: this repo has a
      standing note that `tsc --noEmit` passed on a type error the build caught.
- [ ] `npm run build` — succeeds. This chains `check:schema`, `check:seo`, `check:live` and
      `check:runtime`; all four should be unaffected, and `check:seo` is the one that
      matters here (it re-renders every page and enforces the 20 KB floor — collapsed
      source rows shrink each page, so confirm it stays green rather than assuming it).
- [ ] `npm run lint` — clean.
- [ ] `npm run check:chrome` — the toggle keys already exist in all ten catalogs; this
      confirms nothing was disturbed.

### Browser check (required — this change is entirely render-layer)

Run the dev server and use a **real browser**, not a headless render. CLAUDE.md records
that every defect found after the data read 100% has been render-layer, and that a headless
pass missed one a browser print-out caught.

Use a rich school (Charlotte Latin or Providence Day — ~40+ source rows across all eight
research areas):

- [ ] On load, every research card's citation row shows **only** a `Show sources` button —
      no citation text anywhere on the page.
- [ ] Clicking `Show sources` reveals the citations and the button flips to `Hide sources`;
      clicking again re-hides. Rows are independent — opening one does not open others.
- [ ] **Every** visible citation that is a link shows a trailing `↗`. Check all five paths
      specifically: a research card (Arts/Sports/College Support), the **Course Offerings**
      card, a **bare URL inside prose** (and inside a `Source:` cite line under a table),
      a prose **source chip**, and a **ClubsProgram per-tile attribution**.
- [ ] Hovering any of those links underlines it and shifts it to the brand colour. Tab to
      one and confirm the focus ring appears.
- [ ] The three URL-less rows — the **Club Catalog** card, a **club-cluster** row, and the
      **financial-aid report**'s source lines — render as plain text with **no** arrow and
      **no** hover underline. (Cannon or Providence Day have all three.)
- [ ] `Expand all` (dev server only) opens every card **and** every source row; clicking it
      again (`Collapse all`) closes both. Then print-preview the expanded page and confirm
      citations actually appear in the preview — the same trap the Farsi print-out hit, where
      collapsed panels printed as clean-looking teasers showing none of the content.

### Locale spot-check

No new strings, but the toggle now renders in its `Show` state first, which is the state a
reader sees on load:

- [ ] Load one school page in a non-Latin, non-LTR locale — `?lang=fa` (RTL) and `?lang=hi`
      — and confirm the `Show sources` button renders translated and the boxed toggle is not
      clipped. Note `:root:is([lang='bn'],[lang='te'],[lang='fa'],[lang='hi'],[lang='ar'])
      .catalog-src-toggle` at `src/index.css:4847` already carries a script-specific rule —
      confirm it still holds with the new label. The locale key is **`csc.lang`** /
      `?lang=`, not i18next's default.

## Risks

| Risk | Mitigation |
|---|---|
| `.srcrow a` over-reaches and underlines a link that is not a citation | The rule is scoped to `.srcrow` and `.clubs-program-src`, both citation-only wrappers. Confirm in the browser that no card-body or nav link picked up the hover underline. |
| `Expand all` double-toggles rows and leaves them in mixed states | Step 4 clicks only buttons whose `aria-pressed` disagrees with the target. Verify by clicking `Expand all` twice in a row and confirming state is consistent, not alternating. |
| A source row inside a closed card is not in the DOM when `setAllDetails` queries for toggles | Open the `<details>` before querying the buttons — step 4 specifies this order. Verify by loading the page fresh (all cards closed) and clicking `Expand all` once. |
| The `↗` is added after `{trailer}` in `linkify()`, detaching it from the link | Step 3 calls this out explicitly. Verify against a URL that ends a sentence (with a trailing period) in the browser. |
| Pre-rendered pages drop below the SEO byte floor | `npm run build` chains `check:seo`, which fails on it. A dossier page is far above 20 KB, so this is a check, not an expected problem. |
| The new CSS rule is added earlier in the stylesheet and loses the cascade | Step 5 requires it inside the end-of-file `.srcrow` block. The block's own comment explains why. |

## Open questions

None — all three design questions (hover underline, URL-less rows, print/expand-all
handling) were answered by the user during planning and are recorded under Decisions.


## Implementation notes

Shipped as planned; all six steps built, all four automated checks and the browser pass
green. Three things came out differently from the plan's expectations and are recorded
here so a later window does not re-derive them.

**Step 4 needed no second pass, and the plan's stated reason for one was wrong.** The plan
required opening the `<details>` before querying the toggles, because "a source row inside
a closed card is not mounted and therefore not in the DOM to query." That is not how these
cards work: a research card is an **uncontrolled `<details>` whose body is rendered
unconditionally** and merely hidden natively when closed, so all 45 toggles are in the DOM
at all times regardless of card state. An initial implementation carried a
`requestAnimationFrame` second pass to catch "newly-mounted" rows; it was removed once the
render path was checked, leaving a single `forEach`. The `<details>`-first ordering is kept
anyway — it is free and correct — but the mounting hazard it was guarding against does not
exist. Verified in the browser: one `Expand all` click on a freshly loaded page opened all
40 cards and all 45 source rows.

**Paths 3 and 5 do not render on a school page at all, so the browser could not verify
them there.** `ProseContent` — which owns both `.source-chip` and `linkify()`'s
`.prose-link` — is reached only through the *generic prose* card branch, and
`SchoolDetail.tsx:1190–1199` empties the group list for any topic that has a structured
program (`course-offerings`, `sports`, `the-arts`, `college-support`, `after-school`,
`summer-programs`, `admissions`). Only `financial-aid-tuition` can still reach it, and its
13 `.section-text` blocks across six schools happen to contain no bare URLs — despite 2,384
bare URLs existing in `src/content/**`, all of them in the now-suppressed topics. `0`
occurrences of `prose-link` and `source-chip` in `dist/` confirm this is structural, not a
probing failure.

Step 3's edit was therefore verified by **rendering `ProseContent` directly** through
`renderToStaticMarkup` over five URL shapes (mid-sentence, sentence-final, parenthesised,
two-in-one-line, comma-trailing). This positively disproves the plan's named risk: on
`Published at https://example.org/tuition.html.` the arrow renders INSIDE the anchor
(`…tuition.html ↗`) with the period outside it, never the detached `…html. ↗`. Zero arrows
fell outside an anchor in any case. Path 3 was not modified by this plan (it already
carried its arrow), so its non-rendering costs no coverage.

**`:focus-visible` needs `focus({ focusVisible: true })` to test.** A plain `.focus()` from
Playwright reports `outline-style: none` because Chromium does not treat script focus as
keyboard-originated — an easy false negative on a rule that is in fact working. With the
flag the ring measures `solid 2px rgb(18, 41, 79)`.

### Verification results

- `npx tsc -b` — exit 0.
- `npm run build` — exit 0, including the chained `check:schema` / `check:seo` /
  `check:live` / `check:runtime`. Pre-rendered pages stay far above `check:seo`'s 20 KB
  floor with citations collapsed: Providence Day 494,678 B, Charlotte Latin 419,379 B,
  Davidson Day 277,531 B.
- `npm run lint` — exit 0 (one pre-existing unrelated warning in `scripts/check_fa_script.mjs`).
- `npm run check:chrome` — exit 0, all ten catalogs.
- Browser (Charlotte Latin, real Chromium): 45/45 rows collapsed on load with 0 citation
  strings visible and every toggle reading `Show sources`; a single row opens/closes
  independently and its label flips to `Hide sources`; `Expand all` opens 40/40 cards and
  45/45 rows surfacing 102 citations, `Collapse all` re-hides all 45, and re-expanding is
  consistent rather than alternating; 99/99 `SourceRow` links, 3/3 ClubsProgram
  attributions and 3/3 Course Offerings links carry `↗`; the club catalog (1), club
  clusters (6) and financial-aid report (7) rows render as plain text with 0 anchors and 0
  arrows; hover shifts `none → underline` and `rgb(29,31,32) → rgb(18,41,79)`; 0
  non-citation links picked up an at-rest underline.
- Locales (`?lang=`): `fa` `نمایش منابع` (RTL), `hi` `स्रोत दिखाएँ`, `es` `Mostrar fuentes`
  — all translated, all 45 collapsed, none clipped (`scrollWidth === clientWidth`).
