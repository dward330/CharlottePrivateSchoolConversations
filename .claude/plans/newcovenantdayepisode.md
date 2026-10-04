---
name: newcovenantdayepisode
title: Add podcast episode 38 (Covenant Day — How to Apply) to Covenant Day's Admissions section
status: in-progress
phases: 1
created: 2026-10-04
branch: feat/new-covenant-day-episode
prs: []
---

# Add podcast episode 38 to Covenant Day's Admissions section

## Goal

Add the show's newest episode, *Covenant Day School - Admissions - How to Apply (For Fall
2027 Entry)*, to `src/data/podcastEpisodes.ts` as `id: 38`, mapped to
`schools: ['covenant-day']` and `researchArea: 'admissions'`.

It worked when Covenant Day's **Admissions** section header shows a podcast Listen strip
**where it currently has none**. The strip should be the single-episode form: the episode's
`fullTitle` as the subline, and a "Where would you like to listen?" popover with Spotify and
Apple links that open this episode. No other school page and no other section changes.

## Context

### The episode (verified 2026-10-04, in the planning window)

Both links were confirmed against the platforms themselves, not typed from memory:

| Field | Value | How it was verified |
|---|---|---|
| Published title | `Covenant Day School - Admissions - How to Apply (For Fall 2027 Entry)` | Identical on both platforms |
| Spotify | `https://open.spotify.com/episode/1fNQS33RMq2CYxko7KAkvv` | Newest item in the show embed (`open.spotify.com/embed/show/31HWltz40P18VaObYhmtld`). Spotify oEmbed for the URL returns the exact title above |
| Apple | `https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000793129231` | iTunes lookup API (`itunes.apple.com/lookup?id=1894103555&entity=podcastEpisode`): trackId `1000793129231`, released 2026-10-04, newest in the feed |

The Apple feed's release order puts it straight after episode 37 (Charlotte Christian, How to
Apply, 2026-09-16), so it is **episode 38**.

### The data model

`src/data/podcastEpisodes.ts` is a **hand-maintained** table with one row per episode. It sits
outside `src/content/**` and the ingest pipeline, because it is metadata about the show rather
than research about a school. The `PodcastEpisode` type is
`{ id, title, fullTitle, spotifyUrl, appleUrl, schools, researchArea }`. Rows 34–37 are the
four earlier `/admissions-episode` productions. Each maps to one school with
`researchArea: 'admissions'`, and each carries a short comment above its `title`. The new row
copies their shape exactly.

`episodesFor(school, area)` filters rows and sorts them newest-first. It needs no edit.

### What renders

`src/pages/SchoolDetail.tsx:1002` renders `<PodcastDeepDive variant="section" … area={t.slug}>`
in every topic section header. `src/components/PodcastDeepDive.tsx` renders nothing when
`episodesFor` is empty. That is why Covenant Day's Admissions section has no strip today:
Covenant Day has **zero** rows in the table (`grep -c covenant-day` returns 0).

One row gives it one episode, so the component takes its existing **single** branch
(`episodes.length === 1`). That is the same transition episode 35 caused for Country Day's
Admissions section. It is designed component behaviour, so it needs **no UX approval**.

Covenant Day has an Admissions research area: `src/data/admissionsPrograms/covenant-day.ts`
exists, and `schools.json`'s `matrix` has an `admissions × covenant-day` cell. So
`check:podcast` check 2 (the topic slug is real) will pass.

### Why this is single-phase

Single-phase: it adds no user-facing text. The single-episode strip uses chrome keys that
already ship in all ten catalogs, because other schools' Admissions sections render this
same branch today. Episode titles are **never translated** (see the header comment in
`podcastEpisodes.ts`), because they are identifiers a listener matches against Spotify and
Apple.

## Decisions

- **`id: 38`** — this follows Apple's release order, and `check:podcast` requires ids from 1..N
  with no gaps.
- **`researchArea: 'admissions'`, not `null`** — the episode is about one school's admissions
  process. `null` is reserved for the page-level "More episodes" line (today only episode 32,
  the season finale).
- **Condensed `title`: `'Covenant Day: How to Apply'`** — this matches the `<School>: How to
  Apply` form of rows 34–37. The school's name has no "School" suffix there, the same way
  rows 35 and 37 shorten their schools.
- **`fullTitle`** — copied character-for-character from the published title above, with a
  `// Published: "…"` comment line, as rows 34–37 do.
- **Row comment** — two lines saying this is the fifth `/admissions-episode` production and
  the fifth row to map to `admissions`, and that it gives Covenant Day's Admissions section
  its first Listen strip. Nothing longer: unlike 36 and 37, there is no second-take or
  overrides history to record.
- **No `source-material/` file** — no school data was fetched, only episode metadata, and the
  table is deliberately outside the ingest pipeline.

## Approvals needed

None. The single-episode strip is the component's existing branch, already live on four other
schools' Admissions sections. Deploying stays the user's call, as always (see CLAUDE.md's
publishing standard).

## Out of scope

- Re-generating the episode or its report.
- Any edit to `src/data/admissionsPrograms/covenant-day.ts`.
- The Hickory Grove admissions data refresh that `/admissions-episode` found on 2026-10-04.
  That is a separate change.
- `npm run deploy`.

## Steps

Single-phase — adds no user-facing text.

1. **Branch.** Create `feat/new-covenant-day-episode` from an up-to-date `main`.

2. **Add the row.** In `src/data/podcastEpisodes.ts`, append after the `id: 37` object,
   inside `EPISODES`:

   ```ts
     {
       id: 38,
       // The fifth `/admissions-episode` production and the fifth to map to
       // `admissions` — Covenant Day's first episode, so its Admissions section
       // gains a Listen strip where it previously had none.
       title: 'Covenant Day: How to Apply',
       // Published: "Covenant Day School - Admissions - How to Apply (For Fall 2027 Entry)"
       fullTitle:
         'Covenant Day School - Admissions - How to Apply (For Fall 2027 Entry)',
       spotifyUrl: 'https://open.spotify.com/episode/1fNQS33RMq2CYxko7KAkvv',
       appleUrl:
         'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000793129231',
       schools: ['covenant-day'],
       researchArea: 'admissions',
     },
   ```

3. **Fix the stale range comments in the same file.** These are already stale (the table
   holds 37 rows today):
   - the `id` doc comment on the `PodcastEpisode` type, `/** Episode number in the show, 1–35. */`
     → `1–38`
   - the `EPISODES` doc comment, `All 32 Season 1 episodes plus the Season 2 episodes (33–35)`
     → `(33–38)`

4. **Run the checks** (see Verification).

5. **Commit, PR, merge.** Stage **only** `src/data/podcastEpisodes.ts`, `.claude/plans/newcovenantdayepisode.md`
   and `.claude/plans/INDEX.md`. Run `git status --short` first, and never use `git add -A`.
   Pass the PR body via `--body-file`. Squash-merge with `--delete-branch`, then check out
   `main` and pull. Flip this plan's status and its INDEX row to Implemented with the PR link.
   **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/podcastEpisodes.ts` | +1 row (`id: 38`), two comment ranges corrected |
| `.claude/plans/newcovenantdayepisode.md` | status → implemented, PR link |
| `.claude/plans/INDEX.md` | row → Implemented |

## Verification

1. `npm run check:podcast` — must report **38 episodes clean (37 mapped to a research area, 1
   page-level)**. The count going from 37 to 38 is what proves the regex parsed the new row
   rather than skipping it.
2. `npx tsc -b` — compile check. Trust `tsc -b`, not `tsc --noEmit`.
3. `npm run build` — the full gate chain (prerender, `check:seo`, `check:live`, `check:chrome`,
   `check:runtime`, …) must stay green.
4. **Browser check, required.** Run `npm run dev`, open `/school/covenant-day`, and scroll to the
   Admissions section header. Avoid `networkidle` on school pages, because it hangs. Confirm:
   - a Listen strip now appears, with subline *Covenant Day School - Admissions - How to Apply
     (For Fall 2027 Entry)*;
   - the popover's Spotify link resolves to `…/episode/1fNQS33RMq2CYxko7KAkvv` and the Apple
     link to `…?i=1000793129231`;
   - one other locale (e.g. `?lang=es`) shows the same English title with translated chrome
     around it;
   - another school's Admissions strip (e.g. Charlotte Latin) is unchanged.
