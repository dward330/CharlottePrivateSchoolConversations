---
name: moreEpisodes
title: Name the episode in the single-episode podcast popover, so "More episodes" says what it is
status: implemented
phases: 1
created: 2026-09-08
branch: feat/more-episodes-title
prs: [296]
---

# Name the episode in the single-episode podcast popover

## Goal

When a school page's podcast popover offers exactly **one** episode, it currently shows no
episode title at all — just `WHERE WOULD YOU LIKE TO LISTEN?` above a Spotify row and an
Apple row. The multi-episode popover already lists a title per episode, so the reader gets
*less* context in the case where there is *less* to disambiguate.

Add the episode's condensed title inside the single-episode popover, above the two
platform rows, for **both** variants of `PodcastDeepDive`. After this change, someone who
clicks the page-header's `More episodes` button sees `Season 1 Finale — The Full Recap`
instead of an unlabelled pair of links, and the 42 single-episode section popovers gain
the same label.

We'll know it worked when the popover under `More episodes` on any of the six original
school pages names episode 32, and the single-episode `Listen` popover in a section (e.g.
Providence Day → Student Clubs) names its episode too.

## Context

### The component

Everything lives in one file: [`src/components/PodcastDeepDive.tsx`](src/components/PodcastDeepDive.tsx).
It is school-agnostic and driven entirely by
[`src/data/podcastEpisodes.ts`](src/data/podcastEpisodes.ts); adding a school or an episode
needs no change to the component. It renders two variants over **one shared popover**:

- `variant="page"` — the line under the school-header chips
  ([`SchoolDetail.tsx:539`](src/pages/SchoolDetail.tsx#L539)), fed by
  `unmappedEpisodesFor(school)`. Button label: `podcast.moreEpisodes` ("More episodes").
- `variant="section"` — the strip under a research-area header
  ([`SchoolDetail.tsx:859-865`](src/pages/SchoolDetail.tsx#L859-L865)), fed by
  `episodesFor(school, area)`. Button label: `podcast.listen` ("Listen").

Inside the popover the component branches on
[`const single = episodes.length === 1 ? episodes[0] : null`](src/components/PodcastDeepDive.tsx#L79):

- **`single` truthy** → header `podcast.whereToListen`, then `.podcast-rows` with two
  `.podrow` links. **No title is rendered anywhere in this branch.** ← the defect.
- **`single` null** → header `podcast.showName`, then `.podcast-list` mapping each episode
  to a `.podcast-episode` block whose first child is
  `<div className="podcast-episode-title">{e.title}</div>`.

So the fix is to render that same `.podcast-episode-title` in the `single` branch. The
class, its CSS and its no-translate semantics all already exist.

### Why the user only notices this on the page line

The `section` variant compensates outside the popover: its subline
([`PodcastDeepDive.tsx:196-204`](src/components/PodcastDeepDive.tsx#L196-L204)) prints
`single.fullTitle` when there is one episode, and the `podcast.countLine` sentence when
there are several. The `page` variant has no such subline — it prints only
`podcast.pageLine` ("Cannon School is also covered in 1 episode outside these research
areas."), which never names the episode. That is the asymmetry the user is describing.

### What the live data actually looks like

Measured by parsing `EPISODES` (35 rows) rather than assumed:

- **Exactly one episode maps to no research area: id 32**, `Season 1 Finale — The Full
  Recap` (`fullTitle`: `Season 1 Finale - Charlotte Private School Conversations - The
  Full Recap`). It covers all six original schools — `cannon`, `charlotte-christian`,
  `charlotte-country-day`, `charlotte-latin`, `davidson-day`, `providence-day`. So the
  page-level line renders on those six pages and **always** in the single-episode state
  today; the five newer schools show no page line at all.
- **42 of 49 populated (school × research-area) cells hold exactly one episode**, so the
  section popover hits the `single` branch far more often than the multi branch. This
  change therefore improves 42 section popovers as well as 6 page lines — which is why it
  belongs in the shared branch rather than in the page line's sentence.

### Constraints that apply

- **Episode titles are never translated** — the file header of `podcastEpisodes.ts` and
  the component's own doc comment both state it: they are identifiers a listener matches
  against Spotify and Apple, where the episode exists only in English. The same rule that
  keeps `AP Calculus BC` in English. The multi-episode branch already carries a comment
  saying so at the `.podcast-episode-title` it renders; mirror that comment on the new one.
- **The popover width branches on `single`**:
  `className={single ? 'podcast-panel' : 'podcast-panel wide'}` — 300px vs 380px
  ([`src/index.css:1053-1067`](src/index.css#L1053-L1067)). The condensed `title` values
  are short enough for 300px (the longest, `'STEM at Cannon, Providence Day and Charlotte
  Country Day'`, wraps to ~3 lines at 15px in 300px — acceptable, and it is already what
  the `wide` list shows at 380px). **Do not widen the panel** — see Decisions.
- `.podcast-episode-title` already carries `margin-bottom: 7px`
  ([`src/index.css:1147-1153`](src/index.css#L1147-L1153)), which is the gap it needs above
  `.podcast-rows` too, so **no new CSS is required**. Verify this in the browser rather
  than trusting it.

### Checks that cover this area

`npm run check:podcast` (`scripts/check_podcast_episodes.mjs`) validates every school and
research-area slug in `EPISODES` against `schools.json`. It is **not** in the `build`
chain, so run it explicitly. `npm run check:chrome` reads all ten `src/locales/*.json`
catalogs; it is in the build chain and will stay green because this change adds no key.

## Decisions

- **Render the title inside the popover, in the shared `single` branch — not in the page
  line's sentence.** Chosen by the user. It fixes the page line *and* the 42 single-episode
  section popovers with one edit, and keeps the `page` variant's quiet one-line shape
  intact instead of growing a long title into the header area.
- **Use the condensed `title`, not `fullTitle`.** Chosen by the user. It is what the
  multi-episode list already shows, so the two branches agree; `fullTitle` runs 90+ chars
  and would wrap to three lines inside the 300px panel. `fullTitle` stays where it is — the
  section subline outside the popover — so the published wording is still on the page.
- **Reuse `.podcast-episode-title` verbatim; add no new class and no new CSS.** Its
  font/size/line-height/margin are exactly what this slot wants, and reusing it means the
  two branches can never drift apart visually.
- **Keep the `podcast.whereToListen` header.** The title answers "what is this"; the header
  answers "what do I do next". Both are useful and the panel has room for both. No locale
  key is added or changed.
- **Keep the 300px panel width for `single`.** Widening to 380px would change the layout of
  42 section popovers that are not otherwise part of this request, and the condensed titles
  fit.
- **Leave the `podcast.pageLine` sentence untouched.** It stays "…is also covered in 1
  episode outside these research areas." — no wording change, so no locale work.

## Approvals needed

**None.** This is not a new card, section, stat tile, Compare row, metric key or topic — it
adds a title to an existing popover using an existing class. It is not driven by ingestion,
so the UX-design gate in `CLAUDE.md` does not apply; and it adds no user-facing *string*
(the title is data that is deliberately never translated), so no locale approval is needed
either.

## Out of scope

- Changing the `podcast.pageLine` or `podcast.countLine` wording.
- Changing the section variant's `fullTitle` subline.
- Widening `.podcast-panel`, or any other podcast CSS change beyond what the browser pass
  proves is needed.
- Adding, removing or re-mapping any episode in `podcastEpisodes.ts`.
- Any locale catalog edit. See the phase note below.

## Steps

**Single-phase — adds no user-facing text.** The only new thing on screen is an episode
title read from `EPISODES`, which is deliberately never translated (see Context). No key is
added to `src/locales/*.json` and no overlay entry is created, so there is nothing for a
Phase 2 to translate. This is the same reasoning that made the podcast strip's episode
titles single-phase in `deep-dive-podcast.md`.

1. **Branch.** `git checkout -b feat/more-episodes-title` from an up-to-date `main`.

2. **Render the title in the single-episode branch** —
   [`src/components/PodcastDeepDive.tsx`](src/components/PodcastDeepDive.tsx), inside
   `{single ? ( … ) : ( … )}`, immediately after `<div className="podcast-panel-head">…</div>`
   and **before** `<div className="podcast-rows">`. Add:

   ```tsx
   {/* Not translated by design — an identifier the listener matches against
       the platform, where it exists only in English. The condensed `title`,
       not `fullTitle`: the published wording runs 90+ characters and wraps to
       three lines inside the 300px single-episode panel. */}
   <div className="podcast-episode-title">{single.title}</div>
   ```

   Place it inside the `single ?` arm so it renders for **both** variants. Do not add it to
   the `page` variant's `.podcast-pageline-text` sentence, and do not touch the `wide`
   branch, which already renders the same class per episode.

3. **Update the component's doc comment** — the block at the top of
   `PodcastDeepDive.tsx` describes the two variants and the popover. Extend the sentence
   about episode titles so it records that the **single**-episode popover names its episode
   too, and why (`More episodes` gives the reader no clue what the episode is otherwise).
   A fresh reader should not have to infer that the two branches deliberately agree.

4. **Confirm no CSS change is needed** — open the popover in a browser (step 2 of
   Verification). `.podcast-episode-title`'s existing `margin-bottom: 7px` should give the
   right gap above `.podcast-rows`. **Only if the browser pass shows a wrong gap or an
   overflow**, add a scoped rule next to the existing `.podcast-episode-title` block in
   [`src/index.css`](src/index.css#L1147) — e.g.
   `.podcast-panel:not(.wide) .podcast-episode-title { … }`. Do not pre-emptively add CSS.

5. **Commit and open a PR** per the git standard — explicit staged paths (never
   `git add -A`; run `git status --short` first and confirm every path belongs to this
   change), `--body-file` for the PR body. Then squash-merge with
   `gh pr merge --squash --delete-branch`, check out `main` and pull.

6. **Do not deploy.** Report the PR and stop. Publishing is a separate act with a separate
   owner — see the publishing standard in `CLAUDE.md`.

## Files touched

| File | Change |
|---|---|
| `src/components/PodcastDeepDive.tsx` | edit — render `.podcast-episode-title` with `single.title` in the single-episode popover branch; extend the doc comment |
| `src/index.css` | edit — **only if** the browser pass shows a spacing/overflow problem; expected to be untouched |

## Verification

### Automated

- [ ] `npx tsc -b` — clean. (Use `tsc -b`, **not** `--noEmit`: this repo has a recorded
      case of `--noEmit` passing on a type error the build caught. Read the exit code.)
- [ ] `npm run build` — succeeds. This chains `check:seo`, `check:schema`, `check:live`,
      `check:chrome`, `check:runtime`, `check:spans` and `check:news`; all should be
      unaffected.
- [ ] `npm run check:podcast` — passes, unchanged (it is not in the build chain).
- [ ] `npm run check:chrome` — green, and **confirm it reports no new pending key**, which
      is the positive evidence that this change really added no chrome string.

### Browser (required — this is a render-layer change)

Run against a real browser via Playwright (`headed-chrome-via-playwright` in the memory
notes; there is no `chromium-cli` here). **Use `domcontentloaded`, not `networkidle`** —
the Latest News section fetches live, so the network never idles on a school page.

- [ ] **Page-level popover, the case that prompted this.** Open any of the six original
      school pages (`/school/cannon`), click **More episodes**, and confirm the popover
      shows `Season 1 Finale — The Full Recap` above the Spotify and Apple rows.
- [ ] **Section-level single-episode popover.** On the same page, find a research-area
      strip whose button says **Listen** and whose subline is a single `fullTitle`, click
      it, and confirm the popover now names the episode with the condensed `title`. The
      condensed title and the subline's `fullTitle` differ — that is expected, not a bug.
- [ ] **Multi-episode popover unchanged.** Find a strip whose subline is a count line
      (`3 episodes cover …`), open it, and confirm the `wide` panel still lists one title
      per episode with no duplication and no layout change.
- [ ] **Spacing and overflow at 300px.** Confirm the title does not overflow the 300px
      panel and the gap above the platform rows looks right. Check the longest condensed
      title in play on that page.
- [ ] **Narrow viewport (≤460px).** At that width the panel drops out of absolute
      positioning (`src/index.css:1077-1089`) and flows at full width. Confirm the title
      wraps cleanly and the panel is still on screen.
- [ ] **One RTL locale.** Load the same page with `?lang=fa` (the locale key is
      **`csc.lang`**, not i18next's default — setting the wrong key renders English while
      reporting success). Confirm the title is left-aligned-in-RTL correctly via
      `text-align: start` and the panel still anchors to the inline-start edge without
      going off screen. The title itself stays in English — that is correct.

## Risks

| Risk | Mitigation |
|---|---|
| A long condensed title overflows or looks cramped in the 300px panel | Explicit browser step at 300px and at ≤460px; the fallback is a scoped rule in step 4, not widening the panel |
| The title reads as redundant beside the section subline's `fullTitle` | They are different strings (condensed vs published) in different places (popover vs strip); the browser step checks this reads sensibly rather than assuming it |
| Someone later "fixes" the untranslated title in an i18n pass | Step 3 records the reason in the component doc comment, next to the existing identical comment on the multi branch |

## Open questions

None. Both design questions — where the title goes and which field to use — were settled by
the user during planning and are recorded in Decisions.

## Implementation notes

Built as planned, with no deviations of substance.

- **No CSS change was needed**, as step 4 anticipated. The browser pass confirmed
  `.podcast-episode-title`'s existing `margin-bottom: 7px` gives the right gap above
  `.podcast-rows`, and the title does not overflow: at 300px it measured
  `scrollWidth === clientWidth === 270`. `src/index.css` is untouched.
- **The `single` arm needed a fragment wrapper.** It previously returned a single
  `.podcast-rows` element; adding a sibling title required wrapping both in `<>…</>`,
  which reindented the two `.podrow` links by two spaces. That is the whole reason the
  diff is larger than the four lines step 2 quotes.
- **Narrow-viewport note for a future reader.** The plan expected the panel to "drop out
  of absolute positioning" at ≤460px. The rule at `src/index.css:1075-1086` actually sets
  `position: static` on `.podcast-pop` (the *wrapper*) and re-anchors the panel with
  `inset-inline: 0`, so the panel itself stays `absolute` — measured at x=37.8→279.3 in a
  420px viewport, fully on screen. Behaviour is correct; only the plan's description of the
  mechanism was loose.

### Verification results

| Check | Result |
|---|---|
| `npx tsc -b` | exit 0 |
| `npm run build` | exit 0 — full chain (`check:seo`, `check:schema`, `check:live`, `check:chrome`, `check:runtime`, `check:spans`, `check:news`) green |
| `npm run check:podcast` | exit 0 — 35 episodes clean, 49 of 99 cells populated |
| `npm run check:chrome` | exit 0 — every chrome-claiming skip resolves in all 10 catalogs, **no new pending key** |

Browser pass (Playwright, headed Chromium, `domcontentloaded`, dev server on :5174):

| Case | Result |
|---|---|
| Page popover, `/school/cannon` → More episodes | `Season 1 Finale — The Full Recap`; child order `head → title → rows → follow`; panel `podcast-panel` (not `wide`) |
| Section single, Cannon → Student Clubs | `Inside Cannon's Student Clubs: Councils, Competition & Community`; same order |
| Section multi | unchanged — `wide` at 380px, 3 distinct titles, no duplication |
| Spacing / overflow at 300px | `margin-bottom: 7px`, `scrollWidth == clientWidth == 270` — no overflow |
| Narrow viewport, 420px | title wraps clean, panel fully on screen (37.8→279.3 of 420) |
| RTL, `?lang=fa` | `dir=rtl`, `csc.lang=fa`, chrome genuinely Persian; title `text-align: start`, panel on screen, title stays English (correct) |
