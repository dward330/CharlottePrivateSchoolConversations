---
name: ccdglobalepisode
title: Add podcast episode 41 (Charlotte Country Day — Global Exposure) to CCD's Global Exposure section
status: implemented
phases: 1
created: 2026-10-18
branch: feat/ccd-global-episode
prs: [354]
---

# Add podcast episode 41 — Charlotte Country Day: Global Exposure

## Goal

Add the show's newest episode to `src/data/podcastEpisodes.ts` as row **41**:

- *Charlotte Country Day - Global Exposure - Trips, Sister Schools and a World on Campus*
- `schools: ['charlotte-country-day']`, `researchArea: 'international-travel'`

The work is done when **Charlotte Country Day's Global Exposure section header**, which
shows no Listen strip today, shows one in the single-episode form. That means the
episode's `fullTitle` as the subline, and a "Where would you like to listen?" popover
whose Spotify and Apple links open this episode. No other section changes.

## Context

### The episode (verified 2026-10-18, in the planning window)

| Field | Value | How it was verified |
|---|---|---|
| Published title | `Charlotte Country Day - Global Exposure - Trips, Sister Schools and a World on Campus` | Identical on both platforms: iTunes lookup `trackName`, and Spotify oEmbed `title`. Released 2026-10-16T10:30Z |
| Apple | `https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000796645045` | trackId `1000796645045` from `itunes.apple.com/lookup?id=1894103555&entity=podcastEpisode`. Stored in the house canonical `?i=` form, and that URL was fetched: its page title is "Charlotte Country Day - Global… - Charlotte Private School Conversations - Apple Podcasts" |
| Spotify | `https://open.spotify.com/episode/0pkM6Is7dV8PrOUBlb60d8` | The show embed (`open.spotify.com/embed/show/31HWltz40P18VaObYhmtld`) lists only the newest episode, and today that is this one. `open.spotify.com/oembed?url=…/episode/0pkM6Is7dV8PrOUBlb60d8` returns the exact title above. A mutated id returns **404** on the same endpoint, so the check really tells episodes apart |

It is the only episode released after episode 40, which is Providence Day: Global Exposure
(2026-10-12). It is therefore id **41**. The Charlotte Latin Global Exposure episode,
whose prompt was being built in October, has **not** been published on either platform as
of 2026-10-18.

The episode came from the CCD Global Exposure NotebookLM work recorded in the
`ccd-global-exposure-episode` memory. Take 2 of the v2 prompt was judged publishable and
recommended over take 1 on 2026-10-14. Which take the user uploaded is not recorded, so
the row comment does not claim one.

### The data model and render path

The data model is unchanged from `newglobalexposureepisode.md` (PR #340).

- `src/data/podcastEpisodes.ts` is a hand-maintained table that runs 1–40 today. Its rows
  have the shape `{ id, title, fullTitle, spotifyUrl, appleUrl, schools, researchArea }`.
- `SchoolDetail.tsx` renders `<PodcastDeepDive variant="section" … area={t.slug}>` in
  every topic section header, so this is a **data-only** change.
- CCD has 12 rows today, none mapped to `international-travel`. The new row therefore
  takes the component's **single**-episode branch.
- `international-travel` is a topic in `src/data/schools.json`, and
  `src/data/internationalTravel/charlotte-country-day.ts` exists (PR #344). So
  `check:podcast` check 2 passes.

## Decisions

- **`title: 'Charlotte Country Day: Global Exposure'`.** This follows row 40's condensed
  `<School>: Global Exposure` form. The published title is 85 chars and would wrap in the
  380px popover list. "Day" stays, because the school's short name in the app is
  "Charlotte Country Day".
- **`fullTitle`** is copied character for character from the published title. Its
  separators are plain ` - ` hyphens, not row 40's em-dash. Do not "normalise" them.
- **No `?si=` share token and no `&uo=4`**, matching every other row.
- **No `source-material/` file.** Only episode metadata was fetched.

## Approvals needed

None. The single-episode strip is an existing component branch, and the user asked for
this integration. Deploying stays the user's call under CLAUDE.md's publishing standard.

## Out of scope

- Any edit to `src/data/internationalTravel/**`.
- The Charlotte Latin episode, which is not published yet.
- `npm run deploy`.

## Steps

Single-phase. It adds no user-facing text: the strip's chrome keys already ship in all ten
catalogs, and episode titles are never translated (see the header comment in
`podcastEpisodes.ts`).

1. **Re-confirm nothing newer has shipped.** Run the iTunes lookup:
   `curl -s "https://itunes.apple.com/lookup?id=1894103555&entity=podcastEpisode&limit=5"`.
   If an episode newer than 2026-10-16 now exists, stop and ask the user. The ids must
   follow release order.

2. **Branch.** Create `feat/ccd-global-episode` from an up-to-date `main`.

3. **Add the row.** In `src/data/podcastEpisodes.ts`, append this after the `id: 40`
   object, inside `EPISODES`:

   ```ts
     {
       id: 41,
       // The second hand-written Global Exposure deep dive (after episode 40,
       // Providence Day), giving Charlotte Country Day's Global Exposure section
       // its Listen strip. Built from the v2 prompt; the v1 take said "23 Model
       // UN wins" where the 23 is across three competitions combined.
       title: 'Charlotte Country Day: Global Exposure',
       // Published: "Charlotte Country Day - Global Exposure - Trips, Sister Schools and a World on Campus"
       fullTitle:
         'Charlotte Country Day - Global Exposure - Trips, Sister Schools and a World on Campus',
       spotifyUrl: 'https://open.spotify.com/episode/0pkM6Is7dV8PrOUBlb60d8',
       appleUrl:
         'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000796645045',
       schools: ['charlotte-country-day'],
       researchArea: 'international-travel',
     },
   ```

4. **Fix the range comments in the same file:**
   - line 27: `/** Episode number in the show, 1–40. */` becomes `1–41`
   - line 51: `Season 2 episodes (33–40)` becomes `(33–41)`

5. **Run the checks** listed under Verification.

6. **Commit, PR, merge.**
   - Run `git status --short` first.
   - Stage **only** `src/data/podcastEpisodes.ts`, `.claude/plans/ccdglobalepisode.md` and
     `.claude/plans/INDEX.md`. Never use `git add -A`.
   - Pass the PR body via `--body-file`.
   - Squash-merge with `--delete-branch`, check out `main` and pull.
   - Verify the push landed by comparing `git rev-parse HEAD` against `git ls-remote`.
   - Flip this plan's status and its INDEX row to Implemented, with the PR link.
   - **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/podcastEpisodes.ts` | +1 row (`id: 41`), two comment ranges updated |
| `.claude/plans/ccdglobalepisode.md` | status → implemented, PR link |
| `.claude/plans/INDEX.md` | row → Implemented |

## Verification

1. **`npm run check:podcast`** must report **41 episodes clean (40 mapped to a research
   area, 1 page-level)**, with **55 of 132** school×topic cells holding an episode. The
   baseline today is 40 / 39 / 54. The cell count moving proves the regex parsed the new
   row.
2. **`npx tsc -b`** is the compile check. Do not rely on `tsc --noEmit`.
3. **`npm run build`**: the full gate chain must stay green.
4. **Browser check (required).** Run `npm run dev`, and do not wait on `networkidle` on
   school pages because it hangs. On `/school/charlotte-country-day`, check that:
   - The Global Exposure section header shows a Listen strip.
   - Its subline is *Charlotte Country Day - Global Exposure - Trips, Sister Schools and a
     World on Campus*.
   - The popover's Spotify link goes to `…/episode/0pkM6Is7dV8PrOUBlb60d8`, and its Apple
     link to `…?i=1000796645045`.
   - With `?lang=es` and `?lang=ar`, the title stays English while the chrome is
     translated, and in `ar` the strip lays out correctly right to left.
   - CCD's Admissions strip (episode 35) is unchanged.
   - Providence Day's Global Exposure strip (episode 40) still shows only episode 40.
