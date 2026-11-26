---
name: episode-ideas
description: >
  Suggest a ranked list of new episodes for the podcast Charlotte Private School
  Conversations. Reads what the web app holds on every school, reads every episode already
  published (the live feed, not only the app's table) so nothing is suggested twice,
  researches what parents are asking about on Reddit, local forums and local press, then
  scores and ranks the ideas. An idea may cover one school, several schools, one research
  area or a theme across areas. Use when the user types /episode-ideas, or asks "what
  episodes should we make next", "suggest podcast episodes", "episode ideas for <school>",
  "what haven't we covered on the show", "what do parents want to hear about". This skill
  SUGGESTS ONLY: it never builds an episode, never edits app code or research data, and
  never adds a row to the episode table.
---

# /episode-ideas: what should the show cover next?

Three inputs, one ranked list:

1. **What the app holds.** An episode can only state facts the app already has.
2. **What is already published.** An idea the show has done is not an idea.
3. **What parents want to hear.** Demand moves an idea up the list. It never adds a fact.

The user may narrow the run ("for Covenant Day", "sports only", "five ideas", "something
for January"). With no scope, cover every school and area and return **10** ranked ideas.
Do not stop to ask for a scope.

**Show rules:** the Podcast episode standard and the Student-name standard in `CLAUDE.md`
apply to everything this skill writes, working titles and hooks included.

## Step 1: what is published, and what is open (computed)

```bash
npm run episodes:gaps          # node scripts/episode_gaps.mjs
```

It reads the **live feed** (Apple's public lookup for the show) and joins it to
`src/data/podcastEpisodes.ts`. It prints every published episode with its date, title and
description, then the school × research-area grid, then every **open pair**: research in
the app, no episode.

- **"Published but NOT in podcastEpisodes.ts" is a real finding.** The table trails each
  release by a PR, so it is a lower bound. Treat every such episode as published, and tell
  the user the table needs it. Do not add the row here.
- **Exit 3 means the feed was not read.** Rerun. If it still fails, open the show page
  (`SHOW_SPOTIFY_URL` / `SHOW_APPLE_URL` in `podcastEpisodes.ts`) in a browser and compare
  the newest episodes by hand. Say in the report which way the check was done. Never rank
  against the table alone without saying so.
- Never list schools, areas or episodes from memory. Read them from this output.

## Step 2: read the catalog for angles, not just pairs

The grid is a first filter. **Read every published title and description.** An episode maps
to one research area, but its title names its angle: episodes 1 and 2 are STEM, inside
Course Offerings. So a covered pair can still have an open angle, and a theme that crosses
areas never shows in the grid.

Write down, for your own use, the angle of each episode. Then apply this test to every idea:

> **An idea is a duplicate when a published episode has the same school set, the same area
> and the same angle.**

| Idea | Verdict |
|---|---|
| Same school, same area, same angle | Duplicate. Drop it. |
| Same school and area, a different angle the title did not cover | New. Name the nearest episode and say how this differs. |
| A new school on a format the show already runs (the next school's College Support) | New. This is the commonest good idea. |
| Several schools compared on something only single-school episodes covered | New. |
| Same school, area and angle, but the app's data has changed since (a new school year, a new profile, a new season) | An **update**, never a new idea. Label it "Update", name what changed, and rank it below new ideas unless the change is large. |

Compare each idea's release date context too: an episode from before a data refresh may be
out of date, which is what makes an update worth it.

## Step 3: what the app can back

Every idea needs real material behind it. Check, do not assume:

- [`DATA-SCHEMA.md`](../../docs/DATA-SCHEMA.md) for which cards and Compare rows each school
  holds in each area.
- `npm run coverage:floor` for how full each school is. A thin area makes a thin episode.
- The school's page content itself (`src/data/<area>/<slug>.ts`, `src/content/<area>/`,
  `src/data/metricValues.ts`) for the specific figures an idea would lean on.

Rules for this step:

- **An idea names the cards that back it**, each with its card deep link
  (`/school/<slug>/#<area name>/<card name>`; `npm run audit:cardlink -- --list` prints them
  all, and needs a build and preview running).
- **Any figure in a working title or hook is copied char-for-char from the app's data.**
  Never round, total or estimate one for a title. No figure is fine.
- **An area with too little for about ten minutes of talk is not an episode on its own.**
  Fold it into a multi-school or cross-area idea, or leave it out.
- **Look for the shapes the grid cannot show:**
  - a Compare row where the schools differ widely (tuition, aid, AP, admit rates, commits);
  - one theme across areas at one school (what a family pays in total: tuition, after
    school, summer, trips are costs, but see the Global Exposure rule below);
  - a group of schools with something in common (the Christian schools, the K–8 schools,
    one Cup division, one part of town);
  - a parent decision ("moving from K–8 to high school", "applying for aid for the first
    time") that several cards answer together.

**Hard limits that remove an idea however much parents want it:**

| Limit | Why |
|---|---|
| No student is named, and no idea depends on one | Student-name standard. The podcast is stricter than the app: athletes are not named either. |
| No Learning Support comparison between schools | That area is "this school only". One school per episode. |
| No trip costs or travel dates | Global Exposure privacy rule. Season and year only. |
| Nothing from Read Reviews | It holds links only. No rating, grade or review text is in the repo, and none goes in an episode. |
| No area the school's page does not have | A K–8 school has no College Support. A school with no data in an area has no episode in it. |
| No fact the app does not hold | If parents ask about it and we do not have it, it goes in the "We don't hold this yet" list. |

## Step 4: what parents want to hear (web research)

Run the searches together. Use `WebSearch`; load it with `ToolSearch` first if needed.

Where to look:

- **Reddit:** r/Charlotte first, then r/CharlotteNC-style local subs the search turns up,
  and the wider parent subs (r/Parenting, r/privateschool, r/ApplyingToCollege) for
  questions that are not local.
- **Local forums:** City-Data's Charlotte forum, local parent groups that are publicly
  readable.
- **Local press:** The Charlotte Observer, Axios Charlotte, The Charlotte Ledger, WFAE,
  Charlotte Magazine, Charlotte Parent, for what is in the news about private schools.
- **Search itself:** the "People also ask" questions on searches such as "Charlotte private
  school tuition", "<school> vs <school>", "best private school Charlotte for <thing>".
- **The calendar.** Check today's date. An idea is timely when its subject is about to
  matter: application and financial-aid deadlines (fall and winter), summer camp
  registration (late winter), the Cup standings after each sports season, college decisions
  (spring), a new school year's tuition.

Suggested first queries (add the roster school names from Step 1's output):

```
reddit Charlotte private school which one
reddit Charlotte private school worth it tuition
reddit Charlotte private school financial aid
reddit "Providence Day" OR "Charlotte Latin" OR "Country Day"
city-data Charlotte private schools
Charlotte private school admissions 2026
```

Reddit often blocks a scripted fetch. Use the search result text first. If a thread must be
read in full, tell the user to turn on the Claude in Chrome extension and read it there.

**Rules for what comes back. These are HARD:**

- **It is a demand signal, never a source.** A Reddit post is evidence that parents ask a
  question. It is never evidence of anything about a school. No claim from a post enters a
  suggestion as a fact, and nothing found here is written to `source-material/`.
- **Record the question, not the post.** Write the theme in your own words, with the thread
  URL and its month and year. No usernames. No quoted posts. No ratings or review text.
  No student or family is named, even when the post names one.
- **Prefer the last two years.** An older thread still counts when the question is
  evergreen (cost, admissions odds); say how old it is.
- **Count what you found.** "4 threads since 2025 asking how the schools compare on aid" is
  a signal. "Parents care about aid" is not.
- **Found nothing is a result.** If the searches fail or turn up nothing usable, say so and
  rank on the other axes. Never invent demand.
- **Search queries stay generic.** School names and public topics only. Nothing about the
  user or this project goes into a query.

Sort what you find into two piles: questions the app can answer (they feed the ranking) and
questions it cannot (they feed the "We don't hold this yet" list).

## Step 5: score and rank

Score every surviving idea. Show the numbers; a rank with no reasons cannot be argued with.

| Axis | Points | What earns them |
|---|---|---|
| **Parent demand** | 0–5 | 0 = no signal found. 3 = several recent threads or a current news story. 5 = a question that keeps coming back across sources. |
| **Material in the app** | 0–5 | How much the app holds for it. 5 = full cards and Compare rows for every school in the idea. 2 or below is thin: say so. |
| **New to the catalog** | 0–3 | 3 = no episode near it. 1 = a new angle on a covered pair. 0 = an update. |
| **Timely** | 0–2 | 2 = its subject matters in the next 6–8 weeks. |
| **Ready to make** | 0–2 | 2 = a generator skill exists for it (see Step 6). 1 = a hand-written prompt on shipped data. 0 = needs research first. |

Total out of 17. Break ties by demand, then by material. An idea with **Material ≤ 1** is
not ranked: move it to "We don't hold this yet".

Aim for a mixed list. If the top ten are all "next school's College Support", keep the best
two or three of each repeating format and say how many more of that format are open.

## Step 6: the report

Give the user the ranked list in the reply, and save the same text to
`reports/episode-ideas/<YYYY-MM-DD>.md` (`reports/` is gitignored, so nothing is committed).

**The list is a running one** (user, 2026-11-26). `reports/episode-ideas/RUNNING.md` holds
every idea suggested so far that has not been made. Each run:

1. **Read `RUNNING.md` first.** If it is missing, build it from the dated reports in the
   folder. If there are none, this is the first run.
2. **Take out what has been published.** Check every idea in it against Step 1's output,
   the live feed and `podcastEpisodes.ts` alike, with Step 2's duplicate test. An idea whose
   episode exists is removed, and the report names it under **Made since the last run**
   with its episode number.
3. **Carry the rest forward.** An earlier idea stays on the list with its
   "first suggested <date>". Score it again on today's data and calendar, since timeliness
   and material both move. If the app no longer backs it, or a hard limit now removes it,
   take it out and say why under "Left out on purpose".
4. **Add this run's new ideas,** each marked "new this run".
5. **Rank old and new together** in one table, best first, with a "First suggested" column.
   The running list has no cap: the 10 is how many **new** ideas a run adds. A scoped run
   ("for Covenant Day") adds its ideas and shows the whole list, with the scope's ideas
   marked.
6. **Write the merged list back** to `RUNNING.md` and to the dated report.

A new idea that matches one already on the list is the same idea. Keep the first date and
the better wording. Never list it twice.

Open with three lines: how many episodes are published (and how the feed was checked), how
many open pairs the grid shows, and how the demand research went.

Then a summary table, best first:

| # | Working title | Type | Schools | Score | First suggested | Make it with |
|---|---|---|---|---|---|---|

Then one block per idea:

- **Working title**, in the show's own style: `<School or group> - <Area or theme> - <hook>`.
  Read the published titles for the pattern.
- **Type:** one school / several schools / cross-area theme / timely / update.
- **Schools and areas.**
- **Why parents care:** the demand found, with counts and URLs. Or "no demand signal found".
- **What the app has:** the cards and Compare rows that back it, with card deep links, and
  two or three figures a host could react to.
- **Nearest published episode,** by number and title, and how this one differs. Or "none".
- **Score:** the five numbers and the total.
- **How to make it:**

  | The idea is | Route |
  |---|---|
  | One school's admissions process | `/admissions-episode` |
  | One school's Learning Support | `/learning-support-episode` (only where that area shipped) |
  | One Wells Fargo Cup division | `/cup-episode` |
  | Anything else | A hand-written NotebookLM prompt and source PDF, under the Podcast episode standard. Say so plainly: there is no generator for it yet. |

- **Watch for:** any limit from Step 3 that the episode will brush against.

Close with three short lists:

- **Made since the last run:** ideas taken off the running list because their episode is
  now published, each with its episode number. Leave the list out on a first run.

- **We don't hold this yet:** what parents ask that the app cannot answer, each with its
  demand evidence. These are research leads. Name the route (`/add-school`, `/plan`, a
  research skill) but start nothing.
- **Left out on purpose:** ideas dropped as duplicates or by a hard limit, one line each
  with the reason, so the user can see they were considered.

Then stop. The user picks. Making the episode is another skill's job, and adding a
published episode to `podcastEpisodes.ts` is its own PR.

## When an episode is published, its idea comes off the list

This holds outside a run of this skill (user, 2026-11-26). Whenever a row is added to
`podcastEpisodes.ts`, or the user says an episode is out, open
`reports/episode-ideas/RUNNING.md` and remove the idea that episode covers. Use Step 2's
duplicate test: same school set, same area, same angle. Tell the user which idea came off,
or that none matched. The file is gitignored, so this is a local edit and never part of the
PR. The next run's feed check catches anything this step missed.

## What this skill never does

- Build a PDF, a prompt or an episode.
- Edit app code, research data, `source-material/` or `podcastEpisodes.ts`.
- Treat a forum post as a fact about a school, or copy a post, a username, a rating or a
  name into anything it writes.
- Suggest an episode the feed already has.
- Commit anything. Its only output is the reply and the gitignored report files.
