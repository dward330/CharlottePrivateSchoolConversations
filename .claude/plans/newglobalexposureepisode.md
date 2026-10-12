---
name: newglobalexposureepisode
title: Add podcast episodes 39 (Hickory Grove — How to Apply) and 40 (Providence Day — Global Exposure) to their research-area sections
status: implemented
phases: 1
created: 2026-10-12
branch: feat/new-global-exposure-episode
prs: [340]
---

# Add podcast episodes 39 and 40

## Goal

Add the show's two newest episodes to `src/data/podcastEpisodes.ts`, in release order:

- **39** — *Hickory Grove Christian School - Admissions - How to Apply (For Fall 2027 Entry)*:
  `schools: ['hickory-grove-christian']`, `researchArea: 'admissions'`. It was published
  2026-10-06 and **never added**, so the table stops at 38 today.
- **40** — *Providence Day: Global Exposure — Trips, Exchanges & the Global Studies Diploma*:
  `schools: ['providence-day']`, `researchArea: 'international-travel'`.

The work is done when **two** section headers that show no podcast Listen strip today each
show one:

- Hickory Grove's **Admissions** section
- Providence Day's **Global Exposure** section

Each should be the single-episode form: the episode's `fullTitle` as the subline, and a
"Where would you like to listen?" popover whose Spotify and Apple links open that episode.
No other section changes.

## Context

### The episodes (verified 2026-10-12, in the planning window)

| # | Field | Value | How it was verified |
|---|---|---|---|
| 39 | Published title | `Hickory Grove Christian School - Admissions - How to Apply (For Fall 2027 Entry)` | iTunes lookup API (`itunes.apple.com/lookup?id=1894103555&entity=podcastEpisode`), released 2026-10-06 |
| 39 | Apple | `https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000793352678` | trackId `1000793352678` in the same lookup |
| 39 | Spotify | `https://open.spotify.com/episode/2F3UEhjtO91CFyu05NDM7W` | Supplied by the user 2026-10-12; oEmbed `title` matches exactly; `?si=` dropped |
| 40 | Published title | `Providence Day: Global Exposure — Trips, Exchanges & the Global Studies Diploma` | Identical on both platforms (Spotify oEmbed `title`; iTunes lookup `trackName`), released 2026-10-12 |
| 40 | Spotify | `https://open.spotify.com/episode/1W1nwBzsqGFaTrIGUyBx8A` | Supplied by the user. `open.spotify.com/oembed?url=…/episode/1W1nwBzsqGFaTrIGUyBx8A` returns the exact title above. The `?si=` share token is dropped, matching every other row |
| 40 | Apple | `https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000796003539` | Supplied by the user in slug form (`…/providence-day-global-exposure-trips-exchanges-the/id1894103555?i=…`). Stored in the house **canonical `?i=` form**, which every other row uses and which resolves to the same episode (fetched: page title "Providence Day: Global Exposur… - Charlotte Private School Conversations") |

The Apple feed's release order is 38 Covenant Day (2026-10-04), 39 Hickory Grove
(2026-10-06), then 40 Global Exposure (2026-10-12).

### Blocking input — the Hickory Grove Spotify episode URL

Spotify's show embed (`open.spotify.com/embed/show/31HWltz40P18VaObYhmtld`) lists **only the
newest episode**, so the technique the earlier episode plans used to recover an episode id
returns only episode 40. The planning window asked the user for the link. **If this plan
still shows "NOT YET SUPPLIED" above when `/implement` runs, ask the user for it and wait.**
Never derive it some other way. A wrong but well-formed URL passes `check:podcast`
(see the `ep36-providence-day-shipped` memory: a **show** URL is not an **episode** URL).

Once you have the URL, verify it **before** storing it:

```bash
curl -sL "https://open.spotify.com/oembed?url=https://open.spotify.com/episode/<id>"
```

Its `title` must be exactly `Hickory Grove Christian School - Admissions - How to Apply (For
Fall 2027 Entry)`. Store it as `https://open.spotify.com/episode/<id>`, with no `?si=`.

### The data model

`src/data/podcastEpisodes.ts` is a **hand-maintained** table with one row per episode, outside
the ingest pipeline. The `PodcastEpisode` type is
`{ id, title, fullTitle, spotifyUrl, appleUrl, schools, researchArea }`. Rows 34–38 are the
`/admissions-episode` productions. Each has a short comment above its `title` and a
`// Published: "…"` line above `fullTitle`. `episodesFor(school, area)` filters and sorts
newest-first, and needs no edit.

### What renders

`src/pages/SchoolDetail.tsx:1041` renders
`<PodcastDeepDive variant="section" … area={t.slug}>` in **every** topic section header,
`international-travel` included. That makes this a data-only change. `PodcastDeepDive`
renders nothing when `episodesFor` is empty. Neither school × area has a row today
(`grep -c hickory src/data/podcastEpisodes.ts` → 0, and no row carries
`international-travel`), so each new row takes the component's existing **single** branch.

Both slugs are real, so `check:podcast` check 2 will pass:

- `international-travel` is a topic in `src/data/schools.json`.
- `hickory-grove-christian` has an Admissions area: `src/data/admissionsPrograms/hickory-grove-christian.ts`
  exists, and `source-material/admissions/hickory-grove-christian/` is in the manifest.

Episode 40 is the **first episode to map to a non-admissions Season 2 research area** since
episode 33 (`sports`). That needs no special handling: the component is generic over
`area`.

## Decisions

- **Add both rows, not only 40.** The user decided this on 2026-10-12. `check:podcast` requires
  ids contiguous from 1 and the table follows release order. Skipping Hickory Grove would
  either leave a gap that fails the check, or number Global Exposure 39 so the table stops
  matching the feed.
- **`title` for 39: `'Hickory Grove Christian: How to Apply'`.** This follows the
  `<School>: How to Apply` form of rows 34–38, which drop "School" (`Charlotte Christian`,
  `Covenant Day`).
- **`title` for 40: `'Providence Day: Global Exposure'`.** The condensed form drops the
  subtitle after the em-dash. The published title (85 chars) would wrap in the 380px popover
  list, which is why `title` exists. `fullTitle` keeps it whole.
- **`fullTitle`** — both copied character-for-character from the published titles above,
  including 40's em-dash `—` and `&`.
- **`researchArea: 'international-travel'`** for 40. The area is *displayed* as "Global
  Exposure", but its slug is still `international-travel` (`src/data/internationalTravel/README.md`).
- **No `source-material/` file** — only episode metadata was fetched.

## Approvals needed

None. The single-episode strip is the component's existing branch, and the user asked for
this integration. Deploying stays the user's call (CLAUDE.md's publishing standard).

## Out of scope

- Re-generating either episode, report or prompt.
- Any edit to `src/data/internationalTravel/**` or `src/data/admissionsPrograms/**`.
- `npm run deploy`.

## Steps

Single-phase — adds no user-facing text. The strip's chrome keys already ship in all ten
catalogs, and episode titles are never translated (header comment in `podcastEpisodes.ts`).

1. **Get the blocking input.** If the Hickory Grove Spotify URL above is still "NOT YET
   SUPPLIED", ask the user and wait. Verify it with oEmbed as described above.

2. **Branch.** Create `feat/new-global-exposure-episode` from an up-to-date `main`.

3. **Add the rows.** In `src/data/podcastEpisodes.ts`, append after the `id: 38` object,
   inside `EPISODES`:

   ```ts
     {
       id: 39,
       // The sixth `/admissions-episode` production and the sixth to map to
       // `admissions`: Hickory Grove's first episode, so its Admissions section
       // gains a Listen strip. Take 5 of the v4 prompt (2026-10-05).
       title: 'Hickory Grove Christian: How to Apply',
       // Published: "Hickory Grove Christian School - Admissions - How to Apply (For Fall 2027 Entry)"
       fullTitle:
         'Hickory Grove Christian School - Admissions - How to Apply (For Fall 2027 Entry)',
       spotifyUrl: 'https://open.spotify.com/episode/<VERIFIED ID>',
       appleUrl:
         'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000793352678',
       schools: ['hickory-grove-christian'],
       researchArea: 'admissions',
     },
     {
       id: 40,
       // The first research-area deep dive written by hand rather than through
       // `/admissions-episode`, and the first to map to `international-travel`
       // (displayed as Global Exposure). It gives Providence Day's Global
       // Exposure section its Listen strip. Take 2 of the v3 prompt; the first
       // take invented a "hosting covers it if you can't afford travel" claim.
       title: 'Providence Day: Global Exposure',
       // Published: "Providence Day: Global Exposure — Trips, Exchanges & the Global Studies Diploma"
       fullTitle:
         'Providence Day: Global Exposure — Trips, Exchanges & the Global Studies Diploma',
       spotifyUrl: 'https://open.spotify.com/episode/1W1nwBzsqGFaTrIGUyBx8A',
       appleUrl:
         'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000796003539',
       schools: ['providence-day'],
       researchArea: 'international-travel',
     },
   ```

4. **Fix the range comments in the same file:**
   - the `id` doc comment on `PodcastEpisode`: `/** Episode number in the show, 1–38. */` → `1–40`
   - the `EPISODES` doc comment: `Season 2 episodes (33–38)` → `(33–40)`

5. **Run the checks** (see Verification).

6. **Commit, PR, merge.** Stage **only** `src/data/podcastEpisodes.ts`,
   `.claude/plans/newglobalexposureepisode.md` and `.claude/plans/INDEX.md`. Run
   `git status --short` first, and never use `git add -A`. Pass the PR body via
   `--body-file`. Squash-merge with `--delete-branch`, check out `main` and pull, then verify
   the push landed (`git rev-parse HEAD` vs `git ls-remote`). Flip this plan's status and its
   INDEX row to Implemented with the PR link. **Do not deploy.** End with "merged — ready to
   deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/podcastEpisodes.ts` | +2 rows (`id: 39`, `id: 40`), two comment ranges updated |
| `.claude/plans/newglobalexposureepisode.md` | status → implemented, PR link |
| `.claude/plans/INDEX.md` | row → Implemented |

## Verification

1. `npm run check:podcast` must report **40 episodes clean (39 mapped to a research area, 1
   page-level)**, and **54 of 132** school×topic cells with an episode (52 today; both cells
   are new). Both counts moving proves the regex parsed both rows rather than skipping one.
2. `npx tsc -b` — the compile check. Trust `tsc -b`, not `tsc --noEmit`.
3. `npm run build` — the full gate chain must stay green.
4. **Browser check, required.** Run `npm run dev`. Avoid `networkidle` on school pages,
   because it hangs. Then:
   - `/school/hickory-grove-christian`, Admissions section header: a Listen strip, with
     subline *Hickory Grove Christian School - Admissions - How to Apply (For Fall 2027
     Entry)*. The popover's Spotify link goes to the verified id, and its Apple link to
     `…?i=1000793352678`.
   - `/school/providence-day`, Global Exposure section header: a Listen strip, with subline
     *Providence Day: Global Exposure — Trips, Exchanges & the Global Studies Diploma*. Spotify
     goes to `…/episode/1W1nwBzsqGFaTrIGUyBx8A`, and Apple to `…?i=1000796003539`.
   - `?lang=es` and `?lang=ar` on the Providence Day page: the title stays English, the
     chrome is translated, and in `ar` the strip lays out correctly RTL.
   - Providence Day's Admissions strip (episode 36) is unchanged.
