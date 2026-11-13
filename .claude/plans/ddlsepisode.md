---
name: ddlsepisode
title: Add the published Davidson Day Learning Support episode to the podcast table, so Davidson Day's Learning Support section shows its Listen strip
status: in-progress
phases: 1
created: 2026-11-13
branch: feat/ddlsepisode
prs: []
---

# Add the Davidson Day Learning Support episode to the podcast table

## Goal

*Davidson Day - Learning Support - One Request Form, a 13-Person Center and Therapy on
Campus* was published on 2026-11-04. It is the only feed episode missing from
`src/data/podcastEpisodes.ts`, so Davidson Day's Learning Support section has no Listen
strip. This plan adds its row. It worked when that section shows the strip linking to the
episode on Spotify and Apple, and `npm run check:podcast` passes.

## Context

- `src/data/podcastEpisodes.ts` holds the table `EPISODES` (45 rows today, ids 1–45), one
  row per episode. `episodesFor(school, area)` filters it by `schools[]` and
  `researchArea`, then sorts newest-first **by descending `id`**. The doc comment on that
  function says ids follow release order: "the table is maintained in release order".
  `src/components/PodcastDeepDive.tsx` renders the strip and uses `id` only as a React
  key.
- The type's doc comment says `id` is the **"Episode number in the show"**.
- `scripts/check_podcast_episodes.mjs` (`npm run check:podcast`) checks:
  - every school and area slug is real;
  - ids are unique and contiguous from 1;
  - the Spotify URL is `https://open.spotify.com/episode/<id>`;
  - the Apple URL is `…/charlotte-private-school-conversations/id1894103555?i=<digits>`
    with no extra query parameters;
  - no URL is shared between two rows.
- **Precedent:** episode 44 (Charlotte Country Day Learning Support, PR #385) and episode
  45 (the 4A Cup, PR #434, commit `c282ae0b`). Each was a one-file edit to this table.
  Match episode 44's row shape exactly: a short comment, `title`, a `// Published:`
  comment with the feed title, then `fullTitle`, `spotifyUrl`, `appleUrl`, `schools`,
  `researchArea`.
- **Release order, verified 2026-11-13 against the feed**
  (`https://anchor.fm/s/11187a32c/podcast/rss`, and Apple's
  `itunes.apple.com/lookup?id=1894103555&entity=podcastEpisode`):

  | Episode | Published | Feed number | Table id today |
  |---|---|---|---|
  | Davidson Day Learning Support | 2026-11-04 | Season 2, episode 13 | missing |
  | Wells Fargo Cup 2025-2026, NCISAA 4A | 2026-11-06 | Season 2, episode 14 | 45 |

  Davidson Day came out first, so it is show episode **45** and the Cup is **46**.

- **Verified links for the new row:**
  - Spotify: `https://open.spotify.com/episode/1Th5lDxzBAG2DnLc0jb5YT`. This was the one
    episode ID on the show page that is not already in the table, and Spotify's oEmbed
    returns the exact published title for it.
  - Apple: `https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000799798853`.
    The Apple lookup gives `i=1000799798853` for this title. The `uo=4` it appends is
    dropped to match the checker's pattern.
- **Data is in place.** `src/data/learningSupport/davidson-day.ts` exists, so the
  `learning-support` topic renders on Davidson Day's page.

## Decisions

- **Number the new episode 45 and renumber the Cup episode 46.** Appending it as 46 would
  break two things:
  - the type's own definition of `id` as the episode number in the show;
  - the release-order rule `episodesFor` depends on.

  No school's strip changes order either way, because Davidson Day is not in the 4A Cup
  row. The renumber keeps the rule true for future rows. (During planning this episode was
  first called "episode 46". The feed's numbering corrected that.)
- **Place the Davidson Day row before the Cup row** in the array, so array order still
  matches id order.
- **Short title:** `'Davidson Day: Learning Support'`, following episode 44's
  `'Charlotte Country Day: Learning Support'`.
- **Row comment:** say that this is the third `/learning-support-episode` production, the
  one that gives Davidson Day's Learning Support section its Listen strip. Don't invent
  take or prompt-version details that weren't recorded.
- **Not translated:** titles are identifiers that match Spotify and Apple, per the file
  header, so no locale work is needed.
- **No source-material file:** this is show metadata, outside the ingest pipeline by
  design (file header).

## Approvals needed

None. The Listen strip is an existing component, and adding a row is how every earlier
episode reached its page.

## Out of scope

- New episodes, or changes to any other row's content.
- Changes to `PodcastDeepDive.tsx` or `check_podcast_episodes.mjs`.
- Deploying. Merge, then stop (publishing standard in `CLAUDE.md`).

## Steps

Single-phase. It adds no user-facing text: episode titles are not translated, and the
strip's chrome already exists in all ten catalogs.

1. **Branch.** Start from an up-to-date `main`: `git checkout main && git pull`, then
   `git checkout -b feat/ddlsepisode`. The working tree is shared with other sessions, so
   never stash and never `git add -A`.
2. **Renumber the Cup row.** In `src/data/podcastEpisodes.ts`, change the 4A Cup row's
   `id: 45` to `id: 46`.
3. **Insert the Davidson Day row** directly before the Cup row, shaped like episode 44:

   ```ts
   {
     id: 45,
     // The third `/learning-support-episode` production, giving Davidson Day's
     // Learning Support & Student Services section its Listen strip.
     title: 'Davidson Day: Learning Support',
     // Published: "Davidson Day - Learning Support - One Request Form, a 13-Person Center and Therapy on Campus"
     fullTitle:
       'Davidson Day - Learning Support - One Request Form, a 13-Person Center and Therapy on Campus',
     spotifyUrl: 'https://open.spotify.com/episode/1Th5lDxzBAG2DnLc0jb5YT',
     appleUrl:
       'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000799798853',
     schools: ['davidson-day'],
     researchArea: 'learning-support',
   },
   ```

   `check:podcast` matches each row with `\n  \},`. Keep the two-space indent before the
   closing `},`.
4. **Update the two range comments** in the same file:
   - On the type, `/** Episode number in the show, 1–45. */` becomes `1–46`.
   - The `EPISODES` doc comment's "Season 2 episodes (33–45)" becomes `(33–46)`.
5. **Regenerate the schema doc only if it changed:** run `npm run schema`. It is expected
   to produce no diff, since `DATA-SCHEMA.md` names the file but does not count its rows.
   Commit the doc if it did change.
6. **Commit, open the PR and merge:**
   - Stage `src/data/podcastEpisodes.ts` by explicit path, plus
     `.claude/plans/ddlsepisode.md` and the `INDEX.md` row.
   - Before committing, run `git status --short`. If another session has uncommitted
     edits in `INDEX.md`, stage only this plan's row: build that version of the file
     with `git hash-object -w`, then `git update-index --cacheinfo`.
   - Open the PR with `--body-file`, then `gh pr merge --squash --delete-branch`, then
     check out `main` and pull.
   - Flip the plan's status and its INDEX row to Implemented, with the PR link.
   - Stop at "merged — ready to deploy whenever you want it". **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `src/data/podcastEpisodes.ts` | edit: new row (id 45), Cup row renumbered to 46, two range comments |
| `.claude/plans/ddlsepisode.md` | status, PR link |
| `.claude/plans/INDEX.md` | row flipped to Implemented |

## Verification

- [ ] `npm run check:podcast` passes: ids 1–46 contiguous, URLs well formed and unique.
- [ ] `npx tsc -b` is clean. Use `-b`, not `--noEmit` (see memory "Trust tsc -b").
- [ ] `npm run build` succeeds. It chains `check:schema`, `check:live` and the other gates.
- [ ] **Browser check** (`npm run dev`, Davidson Day's school page, English):
  - The Learning Support section shows the Listen strip with the title *Davidson Day:
    Learning Support*.
  - Its Spotify and Apple links open this episode, and the Apple page title matches.
- [ ] **Browser check, one other locale** (`?lang=es`): the strip renders, and the title
  stays in English by design.
- [ ] **Sports sections of two 4A schools** (for example Providence Day and Cannon): the
  4A Cup episode still shows in their strips after the renumber.
- [ ] **Re-run the feed match.** Every feed title matches a `fullTitle` in the table,
  46 of 46. Load the table with
  `node --experimental-strip-types --input-type=module` from a copy of the file, then
  compare normalized titles against the RSS item titles.

## Open questions

- Was anything worth recording about how this episode was produced (prompt version,
  take)? The memory note `dd-learning-episode.md` says it was built on 2026-11-02 and
  awaiting its transcript. **Default:** use the generic row comment in step 3, and don't
  invent take details.
