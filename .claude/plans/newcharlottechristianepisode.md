---
name: newcharlottechristianepisode
title: Add podcast episode 33 (Saleh Athletic Center) to Charlotte Christian's Sports section
status: implemented
phases: 1
created: 2026-09-06
branch: feat/new-charlotte-christian-episode
prs: [274]
---

# Add podcast episode 33 to Charlotte Christian's Sports section

## Goal

Add the show's newest episode — *Charlotte Christian School - The New Saleh Athletic
Center Takes Shape (Season 2 Premiere)* — to `src/data/podcastEpisodes.ts` as `id: 33`,
mapped to `schools: ['charlotte-christian']` and `researchArea: 'sports'`.

We will know it worked when Charlotte Christian's **Sports** section header strip changes
from the single-episode form (which shows episode 16's own title and a
"Where would you like to listen?" popover) to the **two-episode** form: the count line
reads *"2 episodes cover Charlotte Christian's Sports"* and the popover lists episodes 16
and 33 with per-episode Spotify/Apple links. No other school page and no other section
changes at all.

## Context

### The answer to the question that prompted this plan

The user asked whether episode 33 belongs in the **Sports** section or the page-level
**More episodes** line. It is Sports, decisively — and the reason is that the app already
holds the exact facility the episode is about, inside the Sports research area:

| What the episode says | Where the app already holds it |
|---|---|
| "the 53,000-square-foot final piece" | `src/data/sportsPrograms/charlotte-christian.ts:411` — `facilities.headline`, *"A 53,000 sq ft athletic center broke ground in November 2025…"* |
| "Saleh Athletic Center" | `src/data/sportsPrograms/charlotte-christian.ts:439` — `facilities.venues[0]`, `{ name: 'Saleh Athletic Center', detail: '53,000+ sq ft — broke ground Nov 2025' }` |
| groundbreaking timeline | `src/data/sportsPrograms/charlotte-christian.ts:488` — the WCNC groundbreaking source |

`researchArea: null` (the More-episodes line) is reserved for episodes that map to **no**
research area — today only episode 32, the season finale, which recaps everything. An
episode about one school's one athletic building is the opposite of that. Putting it in
the page-level line would bury a topic-specific deep dive under a "outside these research
areas" label that is factually wrong.

### The data model

`src/data/podcastEpisodes.ts` is a **hand-maintained** table, one row per episode, outside
`src/content/**` and the ingest pipeline (it is metadata about the show, not research about
a school). Its header comment says so explicitly. The `PodcastEpisode` type:

```ts
type PodcastEpisode = {
  id: number
  title: string        // condensed, for the multi-episode popover list
  fullTitle: string    // exactly as published in the feed
  spotifyUrl: string
  appleUrl: string
  schools: string[]    // slugs from schools.json
  researchArea: string | null
}
```

Two accessors drive the UI, both already correct for this change with no edit:

- `episodesFor(school, area)` — filters and **sorts by id**, so episode 33 lands after 16.
- `unmappedEpisodesFor(school)` — the `researchArea === null` set; untouched here.

### What renders, and what changes on the page

`src/components/PodcastDeepDive.tsx` is school-agnostic and looks everything up, so **it
needs no change**. But note the single→multi transition it performs at line ~78:

```ts
const single = episodes.length === 1 ? episodes[0] : null
```

Charlotte Christian's Sports strip is currently `single` (episode 16 alone). Adding
episode 33 flips it to the multi branch, which is a **real visual change** to that strip:

- The panel gains the `wide` class (`'podcast-panel'` → `'podcast-panel wide'`).
- The head text switches from `t('podcast.whereToListen')` to `t('podcast.showName')`.
- The body switches from two big `.podrow` links to a `.podcast-list.scrolllist` of
  `.podcast-episode` blocks, each with small Spotify/Apple links.
- The strip subline switches from the single episode's `fullTitle` to the
  `podcast.countLine` plural.

This is the component's existing, designed behaviour for a section with more than one
episode — Charlotte Christian's Course Offerings already renders it — so it needs **no UX
approval**. It is worth knowing about only so the reviewer is not surprised that the Sports
popover looks different from before.

### Why this is single-phase

**Every string this change needs already exists in all ten catalogs.** The multi-episode
branch uses `podcast.showName`, `podcast.spotify`, `podcast.appleShort`,
`podcast.followShow` and the plural `podcast.countLine_other` — all present in
`src/locales/en.json` today (verified) and, since they ship on other schools' multi-episode
sections, in every other catalog too.

And **episode titles are deliberately never translated.** The file header states the rule:
they are identifiers a listener matches against Spotify and Apple, where the episode exists
only in English — the same rule that keeps `AP Calculus BC` in English. The component
carries a matching comment at the `.podcast-episode-title` render. So the new row's `title`
and `fullTitle` are English in every locale, by design, and **no overlay work exists to do**.

### The guard that makes this safe

`scripts/check_podcast_episodes.mjs` (`npm run check:podcast`) validates the table. It
matters here because the failure mode is invisible: a row naming a slug that does not exist
renders **nothing at all**, byte-identical to the legitimate "this area has no episode"
case. Its seven checks include: school and topic slugs must exist in `schools.json`; ids
unique and **contiguous from 1** (so `33` is required to be exactly the next id, and a gap
would fail); Spotify URLs matching `^https://open\.spotify\.com/episode/[A-Za-z0-9]+$`;
Apple URLs matching `id1894103555\?i=\d+`; and **no two episodes sharing a URL**, which is
the copy-paste slip this change is most exposed to.

The check **parses the TypeScript source with a regex** rather than importing it. The row
regex is `/\{\s*\n\s*id:\s*(\d+),([\s\S]*?)\n  \},/g` — so the new row must follow the
existing formatting exactly: object opens `{`, `id:` on the next line, and the row closes
with `  },` at two-space indent. Prettier-style reflowing that breaks this shape makes the
row invisible to the checker rather than failing it.

### The one stale comment this creates

`src/data/podcastEpisodes.ts` has three places that assert the table is 32 episodes of one
season, all of which become wrong:

- The `id` field doc: `/** Episode number in the show, 1–32. */`
- The `EPISODES` doc: `All 32 Season 1 episodes, in id order.` — and, in the same block,
  *"Only episode 32 (the season finale) still maps to no research area."*
- Episode 32's own inline comment calls itself "the finale … reaches all six pages".

These are comments, so nothing breaks, but a fresh window reading them would be misled
about the show's shape. Fix them as part of the change.

## Decisions

- **Sports, not More episodes** — the episode is about one facility the Sports area
  already documents; `researchArea: null` is for episodes mapping to no area at all.
- **`id: 33`, not a season-aware id** — `check:podcast` requires ids contiguous from 1
  across the whole table, and `episodesFor` sorts by id. Introducing a `season` field or
  restarting numbering at 1 would break both. The show's own Season 2 / Episode 1 numbering
  is recorded in the source-material file instead.
- **Condensed `title`: `Charlotte Christian: The New Saleh Athletic Center Takes Shape`** —
  the published title is 94 characters and wraps to three lines in the 380px popover, which
  is exactly what the `title` field exists to avoid. This drops the redundant `School` and
  the `(Season 2 Premiere)` parenthetical, matching how episode 28 condenses
  *"Charlotte Christian School — A Parent's Guide…"* to *"Charlotte Christian: A Parent's
  Guide…"*. `fullTitle` keeps the published wording verbatim.
- **`fullTitle` uses the feed's ASCII hyphen `-`, not an em-dash** — it is copied
  character-for-character from the feed. Episode 28 uses `—` because *its* published title
  does. Do not "tidy" this.
- **The new facts in the episode are NOT published to the Sports card** — see Out of scope.
- **Single-phase** — adds no new user-facing strings, and episode titles are never
  translated.

## Approvals needed

**None.** This adds a row to an existing hand-maintained table that feeds an existing
component. No new card, section, stat tile, Compare row, metric key, or topic; no
component, layout, or styling change. The single→multi popover switch described in Context
is the component's own existing behaviour, already live on other sections.

## Source material

Already written during planning, **uncommitted**:

- `source-material/sports/charlotte-christian/Charlotte Christian - Sports - Podcast Episode 33 Saleh Athletic Center.md`

It records the full provenance trail, the verbatim feed fields (title, season/episode,
pubDate, duration, guid, both platform ids), the episode description, the mapping rationale,
and the new facts the episode carries that the app does not yet hold.

**Do NOT run `ingest-source-material` on it.** The podcast table is deliberately outside
the ingest pipeline (the file header says so), and ingesting a file under
`source-material/sports/` would regenerate `.claude/docs/` notes and `src/data/schools.json`
as though it were Sports *research*. It is provenance for a metadata row. Commit it as a
plain file alongside the code change.

### How the Spotify URL was obtained — read this before re-deriving it

The RSS feed does **not** contain the canonical `open.spotify.com/episode/<id>` URL. Its
`<link>` is the *creator* URL (`podcasters.spotify.com`, redirecting to
`creators.spotify.com`), whose HTML carries only the Anchor short-id `e3obskr` — there is no
base-62 Spotify episode id anywhere on that page, and `open.spotify.com/oembed` times out.

The working path: fetch `https://open.spotify.com/embed/show/31HWltz40P18VaObYhmtld` with a
browser User-Agent, which surfaces the newest episode's `spotify:episode:<id>`, then
**verify** it via `https://open.spotify.com/embed/episode/<id>` — whose `name` and
`releaseDate` were confirmed to match the feed exactly (`2026-09-04T20:31:00Z`). Both ids in
the step below are already verified; no re-fetching is needed.

## Out of scope

- **Publishing the new facts the episode carries.** The episode states *seating for over
  1,100*, a *January 2027 completion target*, named *performance / wrestling / training*
  spaces, and the *"final piece of the Master Campus Plan"* framing. None are in the app.
  The first directly contradicts the live `facilities.careNote`, which says *"Seating
  capacities are not published for any Charlotte Christian venue."* Editing the Sports
  facilities card is a separate change — and the show is AI-assisted and synthesizes public
  data, so it is a **secondary** source that should be confirmed against the school's own
  facilities page or the WCNC article before anything is published. The facts are recorded
  in the source-material file for whoever picks that up.
- **Any Season 2 modelling** — no `season` field, no UI grouping by season.
- **Adding this episode to any other school** — it names Charlotte Christian only.
- **The Latest News section**, which is unrelated and separately sourced.

## Steps

**Single-phase — adds no user-facing text.** All chrome strings already exist in all ten
catalogs, and episode titles are never translated.

1. **Branch** — `git checkout main && git pull`, then
   `git checkout -b feat/new-charlotte-christian-episode`.

2. **Append the episode row** to the end of the `EPISODES` array in
   `src/data/podcastEpisodes.ts`, after episode 32 and before the closing `]`. Match the
   surrounding formatting exactly — `check:podcast` parses this file with a regex that
   requires `id:` on the line after `{` and the row to close with `  },`:

   ```ts
     {
       id: 33,
       // The Season 2 premiere. The show numbers it Season 2 Episode 1; `id` is
       // the show-wide sequence, which `check:podcast` requires to be contiguous
       // and `episodesFor` sorts by.
       title: 'Charlotte Christian: The New Saleh Athletic Center Takes Shape',
       // Published: "Charlotte Christian School - The New Saleh Athletic Center Takes Shape (Season 2 Premiere)"
       fullTitle:
         'Charlotte Christian School - The New Saleh Athletic Center Takes Shape (Season 2 Premiere)',
       spotifyUrl: 'https://open.spotify.com/episode/6TLyGudcsLUiE7tLcCIgSG',
       appleUrl:
         'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000787925116',
       schools: ['charlotte-christian'],
       researchArea: 'sports',
     },
   ```

3. **Fix the three now-stale comments** in the same file:
   - The `id` field doc — `1–32` → `1–33`.
   - The `EPISODES` block doc — `All 32 Season 1 episodes, in id order.` should say the
     table holds all 32 Season 1 episodes plus the Season 2 premiere. In the same block,
     *"Only episode 32 (the season finale) still maps to no research area"* is still true
     and should stay true — keep it, but make clear it is about episode 32 specifically,
     not "the last episode".
   - Episode 32's inline comment says "the finale recaps the whole season" — still accurate;
     leave it, but do not let it imply it is the newest episode.

4. **Commit the source-material file** written during planning
   (`source-material/sports/charlotte-christian/Charlotte Christian - Sports - Podcast Episode 33 Saleh Athletic Center.md`)
   in the same commit. Stage **explicit paths** — never `git add -A`.

5. **Run verification** (below), then open a PR and squash-merge it.

## Files touched

| File | Change |
|---|---|
| `src/data/podcastEpisodes.ts` | edit — append the `id: 33` row; refresh three stale count comments |
| `source-material/sports/charlotte-christian/Charlotte Christian - Sports - Podcast Episode 33 Saleh Athletic Center.md` | new — provenance for the row (already written, uncommitted) |

No component, CSS, locale, or overlay file changes.

## Verification

- [ ] `npm run check:podcast` — clean. This is the gate that matters: it confirms
      `charlotte-christian` and `sports` are real slugs, ids are contiguous through 33, both
      URLs are well-formed, and **neither URL duplicates another episode's**.
- [ ] `npx tsc --noEmit` — clean. Note the standing repo lesson that `--noEmit` has passed
      on a type error the build caught; trust `npm run build`'s exit code as the real check.
- [ ] `npm run build` — succeeds (this also runs `check:schema`, `check:seo`, `check:live`).
- [ ] **Browser check** — `npm run dev`, open Charlotte Christian's page, scroll to
      **Sports**. Confirm:
      - the strip subline now reads *"2 episodes cover Charlotte Christian's Sports"*
        (the plural `countLine_other`), not episode 16's title;
      - clicking **Listen** opens the **wide** panel headed *"Charlotte Private School
        Conversations"* listing **both** episodes, 16 first then 33;
      - episode 33's Spotify and Apple links each open the Saleh Athletic Center episode —
        **click them both**, since a wrong-but-well-formed URL passes `check:podcast`;
      - the page-level **More episodes** line is unchanged (still the finale only).
- [ ] **Regression spot-check** — open one other school (Cannon or Providence Day) and
      confirm its Sports strip is untouched and still single-episode.

## Risks

| Risk | Mitigation |
|---|---|
| A URL is well-formed but points at the wrong episode — `check:podcast` only checks shape | Both ids were verified against Spotify's and Apple's own pages during planning (title + release date matched the feed). The browser check clicks both links. |
| The new row is formatted so the checker's regex skips it — it then passes vacuously | Match the existing row shape exactly (step 2). Confirm the row was seen: `check:podcast` reporting 33 episodes, not 32. |
| Someone ingests the source-material file, regenerating notes and `schools.json` | Called out in Source material: the podcast table is outside the ingest pipeline. Commit the file plainly. |
| The single→multi popover switch reads as an unapproved UX change at review | It is the component's existing designed behaviour, already live on Charlotte Christian's Course Offerings section. Flagged in Context and Approvals. |

## Open questions

- **Should the new facts (1,100 seats, January 2027 completion) be added to the Sports
  facilities card?** They contradict the live *"Seating capacities are not published"* note
  and come from an AI-assisted secondary source. — **default:** do not add them; leave the
  card unchanged and leave the facts recorded in the source-material file for a separate,
  primary-sourced pass.
- **Should the condensed `title` keep "(Season 2 Premiere)"?** — **default:** no, as
  decided above; it costs a popover line and the season is not modelled anywhere in the UI.


## Implementation notes

Built as planned — the `id: 33` row, the three stale comments, and the source-material
file. `check:podcast` reports **33 episodes**, which is the confirmation the plan asked
for that the row was actually seen by the regex rather than skipped vacuously.

**One addition beyond the plan, requested by the user mid-build:** episode lists are now
sorted **newest-first**. `episodesFor` and `unmappedEpisodesFor` both sorted ascending by
`id`, so episode 33 rendered *below* episode 16 in the Sports popover. Both now sort
descending.

Descending `id` is descending release date rather than a proxy for it: `check:podcast`
requires ids contiguous from 1 and the table is maintained in release order, so the two
orderings cannot diverge. Both accessors feed only `PodcastDeepDive.tsx`, which maps the
array in render order and reads `episodes[0]` only in the single-episode branch — so
nothing else depended on the old ordering.

This also flipped the ordering of every pre-existing multi-episode section. **All six
school pages are affected, across seven sections** — every school has a three-episode
Course Offerings strip, and Charlotte Christian additionally has the new two-episode
Sports strip:

| School | Section | Was | Now |
|---|---|---|---|
| cannon | course-offerings | 1 → 3 → 6 | 6 → 3 → 1 |
| charlotte-christian | course-offerings | 2 → 4 → 7 | 7 → 4 → 2 |
| charlotte-christian | sports | 16 → 33 | 33 → 16 |
| charlotte-country-day | course-offerings | 1 → 3 → 6 | 6 → 3 → 1 |
| charlotte-latin | course-offerings | 2 → 4 → 7 | 7 → 4 → 2 |
| davidson-day | course-offerings | 2 → 4 → 7 | 7 → 4 → 2 |
| providence-day | course-offerings | 1 → 3 → 6 | 6 → 3 → 1 |

Verified in a browser on Charlotte Christian (Sports and Course Offerings both flipped).
The PR body and commit message for #274 cite Course Offerings as "2 → 7 → 9"; the correct
ids are **2 → 4 → 7**, mis-transcribed from a browser check that read rendered titles
rather than ids. The ordering flip itself was correctly observed.

The page-level "More episodes" list is sorted too, though the ordering is not yet visible
anywhere — episode 32 is still the only `researchArea: null` episode, on all six pages.

The plan's Out-of-scope items were respected: the episode's new facts (1,100 seats,
January 2027 completion) are recorded in the source-material file only and were **not**
published to the Sports facilities card, since they contradict the live `careNote` and
come from an AI-assisted secondary source.
