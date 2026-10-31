---
name: cannonlearningepisode
title: Add podcast episodes 42 (Charlotte Latin — Global Exposure), 43 (Cannon — Learning Support) and 44 (Charlotte Country Day — Learning Support) to their school pages
status: implemented
phases: 1
created: 2026-10-27
amended: 2026-10-31
branch: feat/learning-support-episodes
prs: [385]
---

# Add podcast episodes 42–44 — the two Learning Support episodes (and the Latin episode before them)

## Goal

The user's request (2026-10-31): *the Learning Support episodes are live for Cannon and
Charlotte Country Day; link them in the usual way.* The usual place is the **section header
of the matching research area**. Every research-area section header already renders
`<PodcastDeepDive variant="section" area={t.slug}>` (`src/pages/SchoolDetail.tsx` ~l.1100),
so this is a **data-only** change to `src/data/podcastEpisodes.ts`.

The work is done when the Learning Support & Student Services section headers on
`/school/cannon` and `/school/charlotte-country-day`, which have no Listen strip today, each
show one in the single-episode form: the published title as the subline, and a popover whose
Spotify and Apple links open that episode.

**This plan also adds the Charlotte Latin Global Exposure episode as id 42.** It was
published on 2026-10-19, after episode 41 and before the Cannon episode, and was never added
to the table. `check:podcast` requires ids to run 1..N with no gaps, and the table is kept in
release order (`episodesFor` sorts newest-first by id). Cannon therefore cannot correctly be
43 without a 42. Adding Latin also gives Charlotte Latin's Global Exposure section (shipped
in PR #349) its Listen strip.

This plan was first written 2026-10-27 for Cannon and Latin alone. It was amended 2026-10-31
to add CCD, which published on 2026-10-28, and to fill in Latin's Spotify id.

## Context

### The episodes (all verified 2026-10-31, in the planning window)

Source: `curl -s "https://itunes.apple.com/lookup?id=1894103555&entity=podcastEpisode&limit=8"`.
The newest tracks are CCD Learning Support (10-28), Cannon (10-26), Latin (10-19), CCD Global
Exposure (10-16, already row 41), Providence Day (10-12, row 40) and Hickory Grove (10-06,
row 39). Nothing else is missing.

Every Spotify id below came from the show page in real Chrome and was then confirmed by
oEmbed, which returned 200 with the exact title. A one-character mutation of the Latin and
CCD ids returned 404, and the Cannon id was mutation-tested on 2026-10-27, so the check
really tells episodes apart. Every Apple URL below was fetched in the exact stored form, and
its `<title>` names the right episode.

| Row | Published title (`fullTitle`, copied from iTunes) | Released |
|---|---|---|
| 42 | `Charlotte Latin: Global Exposure — Sister Schools, Summer Travel and School Year Abroad` | 2026-10-19 |
| 43 | `Cannon School: Learning Support and Student Services` | 2026-10-26 |
| 44 | `Charlotte Country Day - Learning Support - Two Doors In, Per-Session Support and Therapy on Campus` | 2026-10-28 |

| Row | Spotify id | Apple `i=` |
|---|---|---|
| 42 | `4PUzj2VJKXygIwhepVII81` | `1000797059237` |
| 43 | `4ErtZ1ZQCX8eWIavo5trPi` | `1000798155746` |
| 44 | `1PC0EZAAOmCE1TzvNw6Iar` | `1000798499679` |

### The data model and render path

- `src/data/podcastEpisodes.ts` holds rows 1–41 today, with the shape
  `{ id, title, fullTitle, spotifyUrl, appleUrl, schools, researchArea }`.
- `learning-support` and `international-travel` are both topic slugs in
  `src/data/schools.json`, so `check:podcast` check 2 passes. The data files
  `src/data/learningSupport/cannon.ts`, `src/data/learningSupport/charlotte-country-day.ts`
  and `src/data/internationalTravel/charlotte-latin.ts` all exist.
- No row maps to `learning-support` today, and the only `international-travel` rows are 40
  (Providence Day) and 41 (CCD). All three strips therefore take the component's
  **single**-episode branch, and each row adds one new school×topic cell.
- Baseline: `check:podcast` reports **41 episodes clean (40 mapped, 1 page-level); 55 of 156
  school×topic cells have an episode.**
- These are the **first episodes mapped to `learning-support`**. The strip's chrome keys
  (`podcast.*`) already ship in all ten catalogs, and `topicLabel` comes from the existing
  `topicLabel(tr, t.slug, t.name)`, so the area needs no new key.
- `.claude/skills/learning-support-episode/SKILL.md` Step 7 confirms this path: add a row
  with `researchArea: 'learning-support'`, verify Spotify by oEmbed, and let the strip pick
  it up with no other change.

## Decisions

- **`title` values:** `'Charlotte Latin: Global Exposure'`, `'Cannon: Learning Support'` and
  `'Charlotte Country Day: Learning Support'`. These follow the condensed `<School>: <Area>`
  form of rows 39–41 and the app's short school names.
- **Each `fullTitle` is copied character for character** from iTunes. Do not normalise
  Latin's em-dash or CCD's spaced hyphens.
- **Store URLs in the house canonical form**: Apple as
  `…/charlotte-private-school-conversations/id1894103555?i=<id>` (not the episode-slug path
  iTunes returns, and no `&uo=4`). Spotify gets no `?si=` token.
- **Row comments do not claim which take was uploaded.** The memories record Cannon's take 2
  as judged publishable and CCD's take 7 as publishable pending a check of its close, but
  not which take was published. The comments below are worded accordingly.
- **No `source-material/` file.** Only episode metadata was fetched.
- **This plan was amended, not replaced.** The name stays `cannonlearningepisode` so there
  is one plan for this work rather than a stale one beside a new one.

## Approvals needed

None. The single-episode strip is an existing component branch, and the user asked for this
integration. Including Latin goes beyond the literal request, but it is forced by the
contiguous-id rule (see Goal). Deploying stays the user's call under CLAUDE.md's publishing
standard.

## Out of scope

- Any edit to `src/data/learningSupport/**` or `src/data/internationalTravel/**`. In
  particular, this plan does **not** fix the two CCD data issues found while making the
  episode: `staff.headline` says "seven counselors" against six elsewhere on the page, and
  the services row "Learning-support class" gives only the study-hall/special-area/lunch
  pattern, not the Lower School's core-classroom time. Fixing them changes research prose,
  so it needs its own two-phase plan.
- `npm run deploy`.

## Steps

Single-phase. It adds no user-facing text: the strip's chrome keys already ship in all ten
catalogs, and episode titles are never translated (see the header comment in
`podcastEpisodes.ts`).

1. **Re-confirm the release list.** Re-run the iTunes lookup above. If an episode newer than
   2026-10-28 now exists, stop and ask the user, because ids must follow release order.

2. **Branch.** Create `feat/learning-support-episodes` from an up-to-date `main`. This plan
   and its INDEX row are uncommitted changes in the working tree, and they carry over to the
   branch.

3. **Add the three rows.** In `src/data/podcastEpisodes.ts`, append these after the `id: 41`
   object, inside `EPISODES`:

   ```ts
     {
       id: 42,
       // The third hand-written Global Exposure deep dive (after 40, Providence
       // Day, and 41, Charlotte Country Day), giving Charlotte Latin's Global
       // Exposure section its Listen strip.
       title: 'Charlotte Latin: Global Exposure',
       // Published: "Charlotte Latin: Global Exposure — Sister Schools, Summer Travel and School Year Abroad"
       fullTitle:
         'Charlotte Latin: Global Exposure — Sister Schools, Summer Travel and School Year Abroad',
       spotifyUrl: 'https://open.spotify.com/episode/4PUzj2VJKXygIwhepVII81',
       appleUrl:
         'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000797059237',
       schools: ['charlotte-latin'],
       researchArea: 'international-travel',
     },
     {
       id: 43,
       // The first `/learning-support-episode` production and the first episode
       // to map to `learning-support`, giving Cannon's Learning Support & Student
       // Services section its Listen strip. Take 2 of the v2 prompt was judged
       // publishable; take 1 spoke a crisis-line number and called OT/PT
       // "outsourced".
       title: 'Cannon: Learning Support',
       // Published: "Cannon School: Learning Support and Student Services"
       fullTitle: 'Cannon School: Learning Support and Student Services',
       spotifyUrl: 'https://open.spotify.com/episode/4ErtZ1ZQCX8eWIavo5trPi',
       appleUrl:
         'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000798155746',
       schools: ['cannon'],
       researchArea: 'learning-support',
     },
     {
       id: 44,
       // The second `/learning-support-episode` production, giving Charlotte
       // Country Day's Learning Support & Student Services section its Listen
       // strip. Six takes were judged re-do before take 7 of the v6 prompt, whose
       // content was the cleanest of the run.
       title: 'Charlotte Country Day: Learning Support',
       // Published: "Charlotte Country Day - Learning Support - Two Doors In, Per-Session Support and Therapy on Campus"
       fullTitle:
         'Charlotte Country Day - Learning Support - Two Doors In, Per-Session Support and Therapy on Campus',
       spotifyUrl: 'https://open.spotify.com/episode/1PC0EZAAOmCE1TzvNw6Iar',
       appleUrl:
         'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000798499679',
       schools: ['charlotte-country-day'],
       researchArea: 'learning-support',
     },
   ```

4. **Fix the range comments in the same file:**
   - line 27: `/** Episode number in the show, 1–41. */` becomes `1–44`
   - line 51: `Season 2 episodes (33–41)` becomes `(33–44)`

5. **Run the checks** listed under Verification.

6. **Commit, PR, merge.**
   - Run `git status --short` first.
   - Stage **only** `src/data/podcastEpisodes.ts`, `.claude/plans/cannonlearningepisode.md`
     and `.claude/plans/INDEX.md`. Never use `git add -A`.
   - Pass the PR body via `--body-file`.
   - Squash-merge with `--delete-branch`, check out `main` and pull.
   - Verify the push landed by comparing `git rev-parse HEAD` against `git ls-remote`.
   - Flip this plan's status and its INDEX row to Implemented, with the PR link.
   - **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/podcastEpisodes.ts` | +3 rows (`id: 42`, `43`, `44`), two comment ranges updated |
| `.claude/plans/cannonlearningepisode.md` | status → implemented, PR link |
| `.claude/plans/INDEX.md` | row → Implemented |

## Verification

1. **`npm run check:podcast`** must report **44 episodes clean (43 mapped to a research
   area, 1 page-level); 58 of 156 school×topic cells have an episode.** The baseline is
   41 / 40 / 55. All three counts moving by 3 proves the parser read all three rows.
2. **`npx tsc -b`** is the compile check. Do not rely on `tsc --noEmit`.
3. **`npm run build`**: the full gate chain must stay green.
4. **Browser check (required).** Run `npm run dev`, and do not wait on `networkidle` on
   school pages because it hangs. Check that:
   - On `/school/cannon`, the **Learning Support & Student Services** section header shows a
     Listen strip whose subline is *Cannon School: Learning Support and Student Services*.
     The popover's Spotify link goes to `…/episode/4ErtZ1ZQCX8eWIavo5trPi` and its Apple
     link to `…?i=1000798155746`. Check that the strip sits above the Learning Support lead
     and stat band without disturbing them, because these are the first strips in this
     section.
   - On `/school/charlotte-country-day`, the same section shows a strip with the published
     CCD Learning Support title, Spotify `…/episode/1PC0EZAAOmCE1TzvNw6Iar` and Apple
     `…?i=1000798499679`. CCD's Global Exposure strip still shows episode 41.
   - On `/school/charlotte-latin`, the **Global Exposure** section header shows a strip
     for episode 42, Spotify `…/episode/4PUzj2VJKXygIwhepVII81` and Apple `…?i=1000797059237`.
   - No other section on these three pages gained or lost a strip.
   - The Learning Support sections of Davidson Day, Hickory Grove and Charlotte Catholic show
     **no** strip.
   - With `?lang=es` and `?lang=ar`, the titles stay English while the chrome is translated
     (including the count line's localized topic label), and in `ar` the strip lays out
     correctly right to left.
