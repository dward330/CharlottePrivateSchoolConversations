---
name: deep-dive-podcast
title: Podcast deep-dive links under every research-area header, on all six school pages
status: implemented
phases: 2
created: 2026-08-07
branch: feat/deep-dive-podcast
prs: [116]
---

# Podcast deep-dive links under every research-area header

## Goal

Every research-area section on a school page gets a strip directly under its header rule
offering the *Charlotte Private School Conversations* episode(s) that cover that school and
that topic — a headphones mark, a one-line pitch, and a `Listen` button opening a popover
with Spotify / Apple Podcasts links. A second, page-level entry point under the school
header chips surfaces the episodes that feature the school but map to no research area
(Summer Camp, the Season 1 finale).

One data-driven component, one episode table, six school pages. A section with no matching
episode renders **nothing at all** — no strip, no placeholder. We'll know it worked when all
six school pages show the strip on exactly the 41 (school × topic) cells that have an
episode and nothing on the one that doesn't.

## Context

### The design source

Imported via the Claude Design MCP from project `5da24575-40bf-4787-8934-0fadfc56059f`:

- `Providence Day School.dc.html` — the reference render. The podcast markup is at lines
  127–160 (page-level), 210–256 (multi-episode strip, Course Offerings), and 397–422
  (single-episode strip, Student Clubs). The `.podbtn` / `.podrow` / `.scrolllist` CSS is
  in its `<style>` head at lines 27–33 and 60.
- `podcast-deep-dive-handoff-instructions.md` — placement, popover behavior, data model,
  the Providence Day mapping, and the "Rolling it out to the other schools" section.

**The design mock's token names are the Industry design-system names and do NOT exist in
this repo.** They were deliberately renamed on the way in (there's a comment recording this
at `src/index.css:1480`). The translation table — apply it to every value lifted from the
mock:

| Mock (Industry) | This repo |
|---|---|
| `--color-accent` | `--accent` |
| `--color-accent-700` | `--accent-700` |
| `--color-accent-300` | *no equivalent* — use `color-mix(in srgb, var(--accent) 45%, transparent)` |
| `--color-divider` | `--border` |
| `--color-bg` | `--bg` |
| `--color-text` | `--text` |
| `--font-heading` | `--heading` |
| `--font-body` | `--sans` |
| `.elev-md` | `box-shadow: var(--shadow-md)` |
| `.blueprint` + 4×`.corner` | `position: relative` + `1px solid var(--border)` + `<BlueprintCorners />` |
| `--space-3` / `--space-4` | literal px — the repo has no spacing scale |

`.corner` **does** exist in `src/index.css:1767` but is an unrelated Compare-table sticky
corner cell. Do not reuse it.

### Where it attaches

`src/pages/SchoolDetail.tsx` (988 lines) renders one `<section className="topic-section">`
per research area inside `covered.map((t) => …)` at line 523. The header row is
lines 652–669:

```tsx
<div className="topic-section-head">
  <span className="glyph"><TopicGlyph slug={t.slug} /></span>
  <h2>{topicLabel(tr, t.slug, t.name)}</h2>
  <span className="topic-count">…</span>
  <a className="btn" href={toCompare(…)}>…</a>
</div>
```

Its CSS is `src/index.css:780–792`. **There is no separate divider element** — the rule is
`border-bottom: 1px solid var(--border)` on `.topic-section-head` itself, which also carries
`padding-bottom: 10px; margin-bottom: 16px`. The handoff's "the header row's bottom margin is
removed; the strip carries it" therefore means: when a strip renders, `.topic-section-head`
needs `margin-bottom: 0` and the strip supplies the 16px below itself.

The loop variable is `t` (the topic) and the i18next translator is aliased **`tr`**
(`SchoolDetail.tsx:300`). Do not shadow either.

The school header chips are `div.school-header-topics` at lines 432–456, inside
`header.dossier-header`. The page-level line goes after that closing `</div>`, still inside
`.dossier-body`.

### The pattern to follow

**`src/components/LanguagePicker.tsx` is the model**, not `CellQual.tsx`. LanguagePicker is
a click-toggle dropdown with exactly the behavior the handoff asks for — outside-click +
Escape in one effect (lines 31–47, `mousedown` not `click`, listeners attached only while
open, Escape returns focus to the trigger), conditional *mounting* of the panel, and
`<BlueprintCorners />` as the panel's first child.

`CellQual.tsx` uses the native `popover` attribute specifically because its trigger lives
inside `.table-wrap { overflow: auto }` and a CSS-positioned tooltip would be clipped.
`.topic-section-head` has no `overflow`, so that rationale does not apply here.

One deviation worth knowing: **`aria-haspopup` appears nowhere in this codebase today** —
LanguagePicker uses `aria-expanded` + `aria-controls` only. The handoff explicitly asks for
`aria-haspopup`, so add it (see Decisions).

### Icons

There is no icon package. `package.json` has exactly four dependencies (`i18next`, `react`,
`react-dom`, `react-i18next`). Every icon is a hand-written inline SVG in the file that uses
it, with an invariant house style (`viewBox="0 0 24 24" fill="none" stroke="currentColor"
strokeWidth="1.5"` rounded caps/joins, always `aria-hidden="true" focusable="false"`) — see
`SchoolDetail.tsx:226–242`. The four glyphs this feature needs (headphones, chevron, Spotify
arcs, Apple mic, external-link arrow) are all present as raw SVG paths in the design mock and
should be transcribed into the new component in that house style.

### Counts — the handoff is wrong about one of these

- **Six schools, not seven.** `src/data/schools.json` has exactly six; every per-topic data
  folder has exactly six files. The handoff says "all seven school pages" and lists only six
  names. There is no seventh school. Build the component school-agnostic (it looks the school
  up in the table) so a seventh needs no component change — that is what the handoff was
  actually asking for.
- **Seven topics**, and the slug is **`the-arts`**, not `arts`.
- **`welcome-video` is not a research-area slug.** The welcome video is driven by
  `brands.ts → welcomeVideoUrl` and is documented at `WelcomeVideo.tsx:25–26` as deliberately
  not a research area. It has no episode and needs no handling — it simply isn't in `covered`.

### The full mapping, derived and verified

Derived from `uploads/episodes.txt` in the design project (identical to the PDF episode
guide). Every episode names its schools in the title or the first line of its description.
The Providence Day column reproduces the handoff's table exactly, which is what validates
the derivation.

| School | Course Offerings | Student Clubs | The Arts | Sports | College Support | After School | Fin Aid | Page-level |
|---|---|---|---|---|---|---|---|---|
| cannon | 1, 3, 6 | 22 | 8 | 15 | 30 | 12 | 5 | 10, 32 |
| charlotte-christian | 2, 4, 7 | 23 | 9 | 16 | 28 | 13 | 5 | 11, 32 |
| charlotte-country-day | 1, 3, 6 | 24 | 8 | 18 | 27 | 12 | 5 | 10, 32 |
| charlotte-latin | 2, 4, 7 | 20 | 9 | 17 | 26 | 13 | 5 | 11, 32 |
| davidson-day | 2, 4, 7 | 25 | 9 | 19 | 31 | **— none** | 5 | 11, 32 |
| providence-day | 1, 3, 6 | 21 | 8 | 14 | 29 | 12 | 5 | 10, 32 |

**41 of 42 cells have an episode. The single gap is Davidson Day → After School**, because
episode 13 covers only Charlotte Latin and Charlotte Christian. That one cell is the live
test of the "renders nothing" rule — confirm it in the browser, not just in the data.

Episodes 10, 11 and 32 have `researchArea: null`. Episode 5 (Affordability) covers all six
schools. Episodes 14–19 (athletics) and 20–31 (clubs, college support) are one school each.

### Standing repo rules that bite here

- **The hash router owns `location.hash`** — a raw `#…` anchor is parsed as a route and
  bounces home (`SchoolDetail.tsx:285–297`). Not an issue for external `https:` links, but
  do not add any in-page `#` anchor without `scrollToId`.
- **Dark theme values are duplicated in two blocks** that must stay in sync
  (`src/index.css:54–58` explains why). Any new color token goes in all three places. This
  feature should need none — everything derives from existing tokens.
- **`--radius: 0`** — square corners, no exceptions.
- **Print**: `.expand-all-bar` carries `no-print` (`SchoolDetail.tsx:509`). The popover is
  interactive chrome and should not print.
- The `<a className="btn">` at line 663 has no `.contact` link-reset. Don't clone that
  quirk — the `Listen` control is a real `<button>` anyway.

## Decisions

- **Episode titles use the design mock's condensed form** (`STEM at Cannon, Providence Day
  and Charlotte Country Day`), not the full published titles from the PDF — confirmed with
  the user at planning time. The mock's titles fit the 300–380px popover without wrapping to
  three lines; the full titles run 90+ chars. Record the full published title as a `//`
  comment beside each row for traceability back to the feed.
- **Episode titles are NOT translated** — confirmed with the user. They stay English in all
  ten locales, on the same reasoning as `AP Calculus BC` and `Upper School`: they are
  identifiers a listener matches against Spotify/Apple, where the episode exists only in
  English. Only the surrounding chrome is translated. This keeps the episode table out of
  the overlay layer entirely.
- **Davidson Day → After School renders nothing** — confirmed with the user. No fallback to
  the Summer Camp episode; that would mislabel it.
- **The episode table is the single source of truth**, one row per episode with a
  `schools[]` array — never a per-school copy. Episode 1 is one row that lights up three
  pages. This is the user's explicit requirement and the handoff's.
- **New file `src/data/podcastEpisodes.ts`**, hand-maintained, not generated. It is not
  research data about a school, so it does not belong in `src/content/**` or the ingest
  pipeline; it is closest in kind to `src/data/brands.ts` and `src/data/clubClusters.ts`,
  both hand-maintained keyed maps.
- **Follow `LanguagePicker`, not `CellQual`**, for the popover — see Context.
- **Add `aria-haspopup="true"`** even though nothing else in the repo uses it. The handoff
  asks for it explicitly and it is correct for a button that opens a popover.
- **The strip is not a new card or section under the UX-design gate.** This is design-MCP
  handoff work, which `CLAUDE.md` exempts by name ("the handoff itself is the approval").
- **Keep the neutral Lucide-style platform glyphs** from the mock rather than the official
  Spotify / Apple badges. The official marks carry brand-guideline obligations (clear space,
  minimum size, no recoloring) that conflict with a 17px inline glyph inheriting
  `currentColor` on hover. The handoff offers both; this takes the one that stays inside the
  Industry icon language.

## Approvals needed

**None.** This is Claude Design MCP handoff work, which is explicitly exempt from the
UX-design approval gate per `CLAUDE.md` ("Design work driven by the Claude Design MCP … is
*expected* to change the UX and needs **no** advance approval — the handoff itself is the
approval").

No new dependency (the icons are inline SVG). No deploy — `npm run deploy` remains the
user's call and is not part of this plan.

## Source material

**None.** The episode data is podcast metadata, not school research — it describes the show,
not a school, and nothing here feeds `src/data/metricValues.ts` or any Compare cell. The
data-provenance standard governs *school* data fetched from external sources; this is
neither fetched at implementation time nor about a school's programs.

The two source documents both live in the design project and are quoted in full in this
plan's Context and mapping table, so `/implement` needs no network access:
`podcast-deep-dive-handoff-instructions.md` and `uploads/episodes.txt` (identical to
`uploads/Charlotte-Private-School-Conversations-Episodes-Info.pdf`).

## Out of scope

- No in-page audio player. Links open the platform's own page in a new tab, which hands off
  to the installed app.
- No change to the header row itself or the `Compare on X` button — position, weight and
  markup stay exactly as they are. The only edit to `.topic-section-head` is zeroing its
  `margin-bottom` when a strip follows.
- No episode strip on the Home page, the Compare page, or the Welcome Video block.
- No new Compare row, metric key, stat tile, or topic.
- No seventh school. If one is added later the component picks it up from the table with no
  code change.
- No `npm run deploy`.

## Steps

Two phases — the strip adds user-facing chrome (`Listen to a deep dive on this topic`,
`Listen`, `Follow the show`, the `N episodes cover …` subline).

### Phase 1 — English

1. **Create the episode table** — new file `src/data/podcastEpisodes.ts`. Export
   `type PodcastEpisode = { id: number; title: string; spotifyUrl: string; appleUrl: string;
   schools: string[]; researchArea: string | null }`, the `EPISODES: PodcastEpisode[]` array
   (all 32 rows, in id order, from the mapping table in Context + the URLs in
   `uploads/episodes.txt`), and the two show-level constants `SHOW_SPOTIFY_URL =
   'https://open.spotify.com/show/31HWltz40P18VaObYhmtld'` and `SHOW_APPLE_URL =
   'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555'`.
   Add two selectors: `episodesFor(school, area)` filtering
   `e.schools.includes(school) && e.researchArea === area`, and `unmappedEpisodesFor(school)`
   filtering `e.schools.includes(school) && e.researchArea === null`. Both sort by `id`.
   Use the repo's real topic slugs — `the-arts`, not `arts`. Put the full published title in
   a `//` comment on each row.

2. **Add a check script** — new file `scripts/check_podcast_episodes.mjs`, wired as
   `"check:podcast": "node scripts/check_podcast_episodes.mjs"` in `package.json`. It must
   assert: every `schools[]` entry is a real slug in `src/data/schools.json`; every non-null
   `researchArea` is a real topic slug there; ids are unique and cover 1–32; every
   `spotifyUrl` matches `^https://open\.spotify\.com/episode/[A-Za-z0-9]+$` and every
   `appleUrl` matches the `id1894103555?i=<digits>` shape; and no two episodes share a
   Spotify or Apple URL. This is the guard that a future episode row can't silently point at
   a school or topic that doesn't exist — the failure mode is otherwise invisible, since a
   bad slug just renders nothing.

3. **Build the component** — new file `src/components/PodcastDeepDive.tsx`. One default
   export taking `{ school: string; area?: string; variant: 'section' | 'page' }`, or two
   named exports over a shared internal popover — implementer's call, but the popover must be
   written once. Behavior, transcribed from the mock:

   - Resolve episodes via the selectors from step 1. **If the list is empty, return `null`** —
     no wrapper, no empty state.
   - Strip: headphones glyph (`--accent-700`, 20px section / 16px page), a block with the
     Barlow-Condensed-600 15px title line and the 13px muted subline, and the `Listen` button
     pinned right. `flex-wrap: wrap`, subline block `flex: 1; min-width: 220px`.
   - Subline: the episode title when exactly one matches; the `N episodes cover …` count
     string when several do.
   - Popover state, outside-click and Escape: copy the effect shape from
     `LanguagePicker.tsx:31–47` verbatim — `if (!open) return` early, `mousedown` listener
     testing containment against the *wrapper* ref, `keydown` Escape closing and returning
     focus to the trigger ref, cleanup in the return, deps `[open]`.
   - Trigger: real `<button type="button">` with `aria-haspopup="true"`,
     `aria-expanded={open}`, and `aria-controls={open ? panelId : undefined}` from `useId()`.
   - Panel: conditionally mounted (not hidden), `<BlueprintCorners />` as its first child,
     `position: absolute; top: calc(100% + 8px)`, `z-index: 5`.
   - **Single episode** → header `WHERE WOULD YOU LIKE TO LISTEN?`, width 300px, two
     full-width `.podrow` links each with a platform glyph, a `flex: 1` label, and a 13px
     external-link arrow.
   - **Multiple episodes** → header is the show name, width 380px, one block per episode
     (title in Barlow Condensed 600 / 15px / line-height 1.25) with small `Spotify` / `Apple`
     buttons under it, inside a `max-height: 190px; overflow-y: auto` scroller.
   - Both variants end with the `Follow the show` footer rule linking both show pages.
   - All links `target="_blank" rel="noopener noreferrer"` (match the repo's dominant order;
     the handoff's `rel="noopener"` is a subset and the repo standard is stricter).
   - Icons as local inline SVG functions at the bottom of the file, house style per
     `SchoolDetail.tsx:226–242`. Transcribe the five paths from the mock — the headphones,
     chevron, Spotify arcs, Apple mic and external-link arrow are all quoted verbatim in
     `Providence Day School.dc.html` lines 128, 217, 226–227 and 410–411.

4. **Wire the section strip** — `src/pages/SchoolDetail.tsx`, immediately after the
   `</div>` closing `.topic-section-head` at line 669, inside the `covered.map` at 523:
   `<PodcastDeepDive school={slug} area={t.slug} variant="section" />`. Note the loop
   variable is `t` and the translator is `tr` — do not shadow.

5. **Wire the page-level line** — `src/pages/SchoolDetail.tsx`, after the closing `</div>`
   of `.school-header-topics` (line 456), still inside `.dossier-body`:
   `<PodcastDeepDive school={slug} variant="page" />`. It returns `null` when the school has
   no unmapped episodes, so the "omit the line entirely" case is automatic. (In practice all
   six schools have episode 32, so it renders on all six today.)

6. **Add the CSS** — `src/index.css`, in a new commented block near the school-detail
   section. Port `.podbtn`, `.podrow` and the `.scrolllist` thin-scrollbar rule from the
   mock's `<style>` head (lines 27–33, 60) through the token translation table in Context,
   plus the strip container, the popover panel, the popover header, the episode block and
   the `Follow the show` footer. Specifics that matter:
   - Strip background `color-mix(in oklab, var(--accent) 5%, transparent)`, with
     `border-left`/`border-right`/`border-bottom` `1px solid var(--border)` continuing the
     header rule and **no** `border-top` (the header's own `border-bottom` is that line).
   - Give the strip `margin-bottom: 16px` and add a rule zeroing
     `.topic-section-head`'s `margin-bottom` when a strip follows — an adjacent-sibling
     selector (`.topic-section-head:has(+ .podcast-strip) { margin-bottom: 0 }`) keeps this
     out of the TSX and leaves sections without a strip untouched.
   - `.podbtn[data-on='true']` for the open state, `outline: 2px solid var(--accent);
     outline-offset: 2px` on `:focus-visible` for the trigger, and `-2px` on `.podrow` inside
     the scroller (the repo's documented convention — see `.lang-row` at `index.css:298`).
   - Scrollbar `scrollbar-width: thin; scrollbar-color: color-mix(in srgb, var(--accent) 45%,
     transparent) transparent` — the mock's `--color-accent-300` has no repo equivalent.
   - The panel must not be clipped: `BlueprintCorners` marks sit at `-6px` insets, so no
     ancestor may gain `overflow: hidden`.
   - Add `.podcast-strip { display: none }` inside the existing `@media print` block —
     interactive chrome, and a print-out of a collapsed popover reads as a stray button.

7. **Add the English strings** — `src/locales/en.json`. New top-level `podcast` group, placed
   as a sibling of the per-topic feature groups (after `courses`, before `sections`, ~line
   227). Keys: `title` (`Listen to a deep dive on this topic`), `listen` (`Listen`),
   `moreEpisodes` (`More episodes`), `whereToListen` (`Where would you like to listen?`),
   `showName` (`Charlotte Private School Conversations`), `followShow` (`Follow the show`),
   `spotify` (`Spotify`), `apple` (`Apple Podcasts`), `appleShort` (`Apple`),
   `pageLine` (`{{school}} is also covered in {{count}} episodes outside these research
   areas.` — with `_one`/`_other` plural forms), and `countLine` with `_one`/`_other`
   (`{{count}} episode covers {{school}}'s {{topic}}` / `{{count}} episodes cover
   {{school}}'s {{topic}}`). Use i18next's `count` option for both plurals — never a
   hand-rolled `s`. Never concatenate fragments; interpolate so word order can change.

   **The `{{topic}}` value must be the localized topic label** via
   `topicLabel(tr, t.slug, t.name)`, not a raw slug. Note this makes the subline a genitive
   construction (`Providence Day's career pathways` in the mock) — English uses `'s`;
   Phase 2 must be free to restructure it, which the interpolation allows.

   Add an `a11y` key for the trigger's accessible name if the visible `Listen` text is not
   sufficient on its own out of context.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording and the rendered strip are what they want.

### Phase 2 — Every other locale

**UI chrome only.** The episode titles are deliberately not translated (see Decisions), so
the overlay layer and `PROSE_TRANSLATED` are **not** involved — no `src/data/overlays/**`
work, no re-extraction, no stamp recomputation. This phase touches only the catalog files.

1. **Translate the `podcast` group** into the nine non-English files in `src/locales/`, per
   `TRANSLATED` in `src/lib/i18n.ts` (`es, bn, ht, te, fr, fa, it, hi, ar` — read the array,
   don't trust this list if it has grown). Keys stay identical; only values change.

2. **Get the plurals right per language.** `countLine` and `pageLine` use i18next `count`.
   Arabic needs its full plural set (`_zero`, `_one`, `_two`, `_few`, `_many`, `_other`), not
   just `_one`/`_other` — this is the one locale where the two-form assumption silently drops
   categories.

3. **Check the genitive.** English's `{{school}}'s {{topic}}` does not carry into most of
   these languages. Restructure the sentence per locale (e.g. `los itinerarios profesionales
   de Providence Day`) rather than transliterating the possessive. The interpolation makes
   this free.

4. **Leave the proper nouns alone.** `Spotify` and `Apple Podcasts` are brand names and stay
   Latin in every locale, including `bn`, `te`, `hi`, `fa` and `ar` — the same rule that keeps
   `Upper School` and `AP` Latin. `showName` is the show's registered title and also stays
   English.

5. **RTL (`fa`, `ar`)**: the strip and popover use logical properties throughout, so no bidi
   work is expected. But the popover is anchored with `right: 0` in the mock — make sure step
   6 of Phase 1 used `inset-inline-end: 0` (as `.lang-panel` does at `index.css:250`), or the
   panel will hang off the wrong edge in Arabic and Farsi. Verify in the browser.

## Files touched

| File | Change |
|---|---|
| `src/data/podcastEpisodes.ts` | **new** — the 32-episode table, show URLs, and the two selectors |
| `src/components/PodcastDeepDive.tsx` | **new** — the strip + popover, both variants, inline SVG icons |
| `scripts/check_podcast_episodes.mjs` | **new** — validates slugs, ids and URL shapes against `schools.json` |
| `src/pages/SchoolDetail.tsx` | edit — two call sites: after `.topic-section-head` (~line 669) and after `.school-header-topics` (~line 456) |
| `src/index.css` | edit — new podcast block; `margin-bottom: 0` on a header row followed by a strip; `no-print` rule |
| `src/locales/en.json` | edit — new `podcast.*` group (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — translated `podcast.*` group (Phase 2) |
| `package.json` | edit — `check:podcast` script |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — clean
- [ ] `npm run check:podcast` — the new script passes (all slugs real, ids 1–32 unique, URLs well-formed)
- [ ] `npm run check:translations` — no missing keys in the nine other locales *(expected to
      flag the new `podcast.*` keys as English-only until Phase 2; confirm it flags exactly
      those and nothing else)*
- [ ] `npm run build` — succeeds, including `prerender` and `seo:files`
- [ ] `npm run check:seo` — still passes (no routes change, but the pre-rendered pages grow)
- [ ] **Browser check — this is the one that matters.** `npm run dev`, then walk **all six**
      school pages, not just Providence Day:
  - [ ] Providence Day matches the handoff's mapping table exactly: 3-episode popover on
        Course Offerings, single-episode popover on Student Clubs / The Arts / Sports /
        College Support / After School / Financial Aid, and the page-level `More episodes`
        line with Summer Camp + the finale.
  - [ ] **Davidson Day → After School renders no strip at all** — the one empty cell in the
        42-cell matrix. Confirm the section looks exactly as it does on `main`, with the
        header rule and its normal 16px margin intact.
  - [ ] The header row and `Compare on X` button are visually unchanged everywhere — same
        position, same weight. Diff against `main` side by side.
  - [ ] Popover behavior: opens below-right, one at a time, closes on outside click and on
        Escape, Escape returns focus to the trigger, `:focus-visible` shows the themed accent
        ring (never the browser default), links open in a new tab.
  - [ ] The multi-episode scroller caps at ~190px and scrolls with the thin scrollbar.
  - [ ] Blueprint corner marks are not clipped at any of the four panel corners.
  - [ ] Dark mode: strip tint and panel fill both read correctly from tokens with no
        dark-specific override.
  - [ ] Narrow viewport (~380px): the strip wraps rather than overflowing, and the popover
        stays on screen.
  - [ ] Print preview on one school: the strip does not print.

### Phase 2 — Locales

- [ ] `npm run check:translations` — clean, all ten catalogs in step
- [ ] `npx tsc --noEmit` and `npm run build` — still clean
- [ ] **`npm run check:runtime` is NOT expected to change** — no overlay entries are added.
      Run it anyway to confirm this phase didn't disturb any stamp.
- [ ] **Browser check across locales.** Per the standing repo lesson that every post-100%
      defect has been render-layer: switch the language picker through all ten and confirm on
      at least two school pages —
  - [ ] Chrome is translated; episode titles, `Spotify` and `Apple Podcasts` remain English/Latin.
  - [ ] The `N episodes cover …` count line reads naturally and its plural is right — check
        Arabic specifically, where the two-form assumption breaks.
  - [ ] **`fa` and `ar`: the popover anchors to the correct edge** and does not hang off
        screen. This is the concrete RTL risk in this feature.
  - [ ] No English chrome leaking into a non-English page (the recurring failure shape).

## Risks

| Risk | Mitigation |
|---|---|
| The `:has(+ .podcast-strip)` selector zeroing the header margin has no fallback in a browser without `:has()`. | `:has()` is baseline in all current browsers and the repo already uses `color-mix`, `inset-inline-*` and native `popover` — a comparable floor. The degradation is cosmetic (16px of extra space above the strip), not broken. If it bothers, pass a boolean down from `SchoolDetail` and add a class instead. |
| The popover is anchored `right: 0` in the mock; a literal port hangs off the wrong edge in `fa`/`ar`. | Use `inset-inline-end: 0`, as `.lang-panel` already does (`index.css:250`). Called out in Phase 1 step 6 and verified in Phase 2 step 5. |
| A future episode row names a school or topic slug that doesn't exist — it renders nothing, silently, and looks like the "no episode" case. | `scripts/check_podcast_episodes.mjs` (step 2) validates every slug against `schools.json` and fails the check. This is exactly the invisible failure mode the repo's other checkers exist for. |
| The mapping was derived from episode titles/descriptions rather than handed over. | The Providence Day column reproduces the handoff's own table exactly — that's the control. The handoff also instructs "treat any episode you cannot map confidently as unmapped rather than guessing"; every one of the 32 names its schools explicitly, so nothing was guessed. Spot-check episodes 13 (two schools only) and 5 (all six) during the browser pass. |
| Two popovers open at once if the shared-state assumption is wrong. | Each instance owns its own `open` state, so "one at a time" is not automatic. Closing on outside `mousedown` gives it for free — clicking trigger B fires the outside-click handler of popover A first. Confirm in the browser rather than assuming. |

## Open questions

None blocking. The three that existed at planning time — condensed vs. published episode
titles, whether titles get translated, and the Davidson Day After School gap — were all put
to the user and are recorded in Decisions.

- Whether to later swap the neutral platform glyphs for the official Spotify / Apple badges —
  **default:** keep the neutral Lucide-style marks, per Decisions. Revisiting means following
  each platform's brand guidelines for clear space and minimum size, and not recoloring them.

## Implementation notes

### Phase 1 (English) — what deviated

- **A narrow-viewport rule the plan didn't specify.** Phase 1 step 6 asked for a
  `max-width` on the panel, which caps its *size* but not its *position*. At 380px the
  380px-wide multi-episode popover rendered at `x: -242` — mostly off screen — because the
  trigger sits near the inline-end edge, so anchoring to either side pushes the panel past
  the opposite one. Fixed with a `@media (max-width: 460px)` block that drops the popover
  out of absolute positioning and lets it flow full-width inside the strip. **Found only by
  the browser pass**; `tsc`, lint, `check:podcast`, `check:seo` and the build were all green
  with the defect present — the same render-layer-only shape as every prior post-100% defect
  in this repo.

- **Episode titles: the plan under-specified, and the mock has TWO forms.** Decisions says
  titles use "the design mock's condensed form". The mock actually uses condensed titles only
  in the *multi-episode popover list* (where three compete for 380px) and the **full
  published title** in the *single-episode subline*. Both are stored — `title` (condensed)
  and `fullTitle` (published) — and each is rendered where the mock renders it. The
  single-episode sublines now match `Providence Day School.dc.html` verbatim.

- **`episode 31` in the plan's mapping table is right; an early draft of the table had it as
  page-level.** Corrected to `college-support` (Davidson Day) before any check ran. Noted
  only because the mapping table is the artifact a future window will trust.

- **`schoolName` and `topicLabel` are passed in as props** rather than looked up inside the
  component. `topicLabel(tr, t.slug, t.name)` is what makes `{{topic}}` the *localized* label
  rather than a raw slug (Phase 1 step 7 requires this), and it lives in `SchoolDetail`.

### Phase 1 verification results

`npx tsc --noEmit` clean · `npm run lint` clean (two pre-existing warnings in unrelated
scripts) · `npm run check:podcast` — 32 episodes, **41 of 42 cells** have an episode,
independently reproducing the plan's headline number · `npm run build` + `npm run check:seo`
clean, 8 pre-rendered pages · catalog parity: all nine other locales missing exactly the 13
new `podcast.*` keys and nothing else.

Browser pass (Playwright, all six school pages): every one of the 42 cells matches the
mapping table; Davidson Day → After School renders no strip and keeps its header's 16px
margin, while every section *with* a strip collapses to 0; Escape closes and restores focus;
outside click closes; a second trigger closes the first (one-at-a-time confirmed, not
assumed); scroller caps at 190px; blueprint corners unclipped with no `overflow: hidden`
ancestor; focus ring is the themed accent `rgb(89, 128, 166)` at 2px; dark mode reads from
tokens with no override; print hides both the strip and the page-level line.

### English review (2026-08-07)

Both points went to the user and both were resolved in favour of what shipped: the wordier
multi-episode subline (`3 episodes cover Providence Day School's Course Offerings`) was
preferred over the mock's shorter phrasing, and the two-form title split (condensed in the
popover list, published in the single-episode subline) was confirmed correct. **No English
wording changed**, so Phase 2 followed immediately.

### Phase 2 (locales) — what deviated

- **`countLine` was restructured for every locale, and it is NOT a translation of the
  English.** The English reads `{{count}} episodes cover {{school}}'s {{topic}}`. Rendered
  in the Romance locales that shape produced `3 épisodes traitent Offre de cours de
  Providence Day School` — because `{{topic}}` resolves to a **title-case nav label**, not a
  sentence noun, so it lands mid-clause without its article and reads as a grammar error.
  The nine locales therefore put the label **last**, after an em dash: `3 épisodes sur
  Providence Day School — Offre de cours`. This is the convention `school.compareOn`
  (`Comparer sur {{topic}}`) already uses for exactly this problem — a bare label after a
  preposition, at the end, where title case is unremarkable. Caught by reading the rendered
  output, not by any checker.

- **Arabic carries the full CLDR plural set** (`_zero`/`_one`/`_two`/`_few`/`_many`/`_other`)
  for both `countLine` and `pageLine`, matching how `courses.countCourses` already ships.
  Confirmed rendering `حلقتين` for two episodes — the dual form a two-form assumption would
  have silently replaced with `2 حلقة`.

### Phase 2 verification results

Catalog parity: all ten in step, no missing or stray keys · `npx tsc --noEmit` clean ·
`npm run build` + `npm run check:seo` clean · `npm run check:translations` — no drift ·
`npm run check:runtime` — 6065 shipped entries, every stamp still recomputes, confirming
this phase disturbed no overlay (as the plan predicted, since no overlay entry was added) ·
`npm run check:podcast` unchanged.

Browser pass across **all ten locales** on two school pages (Providence Day and Charlotte
Latin): chrome translated everywhere; episode titles, `Spotify`, `Apple Podcasts` and the
show name still Latin in all four non-Latin scripts; Arabic's dual form correct; and the
concrete RTL risk — **the popover anchors to the inline-start edge in `fa` and `ar`** and
stays on screen, verified by asserting edge alignment within 2px rather than by eye.

**One trap worth recording for the next locale pass:** the language `localStorage` key is
`csc.lang`, not `lang`. A verification script that sets the wrong key renders **English**
while reporting success — the exact silent-fallback shape `verify-i18n-in-a-browser`
warns about. It cost one screenshot here because the query-param path masked it.
