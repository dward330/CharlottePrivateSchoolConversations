---
name: cup-episode
description: >
  Make a Charlotte Private School Conversations podcast episode about one Wells Fargo Cup
  division (NCISAA 4A, 3A, 2A or NCHSAA 6A), with hosts who bring the energy of a sports
  network covering a championship. Asks which division, re-checks the app's Cup ledger
  against the association's own published standings (and stops on any mismatch), checks
  for in-progress standings for the current season and saves them to source-material,
  builds the NotebookLM source PDF and the talk-show prompt, and hands back the files, the
  upload steps and the traps to listen for. Coaches may be named; students never are. Also
  judges a transcript the user brings back and writes the next prompt version. Use when the
  user types /cup-episode, or asks to "make a Wells Fargo Cup episode", "a podcast on NCISAA
  4A", "turn the Cup race into an episode", or brings back a Cup episode transcript to
  check. It never edits app code, the Cup ledger or any card.
---

# /cup-episode: one Wells Fargo Cup division, as a podcast episode

The sports counterpart of `/learning-support-episode`, designed with the user on 2026-11-06
(plan `.claude/plans/cupepisode.md`). The generator is `scripts/gen_cup_episode.mjs`
(`npm run report:cup`); its header comment holds the reasons behind every rule below.

**Show rules:** the Podcast episode standard in `CLAUDE.md` applies in full. It's a talk
show, never a reading, and a PDF is never mentioned aloud. The opening is exactly "Welcome
to another episode of Charlotte Private School Conversations." charlotteschoolinsights.com
is named as a great resource to learn more at the open and the close, with each school's own
site as the authority. The generated prompt carries all three; keep them when editing it.

## The decisions this skill encodes (user, 2026-11-06)

| Decision | How it is enforced |
|---|---|
| **Ask which division**, from every division that has at least one roster school | The generator computes the list from the ledger (each Cup school's latest season). Never list it from memory. |
| **Check the live season on every run** | Step 2 compares the latest final table with the ledger; Step 3 looks for in-progress standings. A live table is its own labelled section and segment, said as not finished. |
| **Coaches may be named; students may not** (stricter than the app, and only for the audio episode) | `honors`, `pipeline.roster`, `record.bars` and `record.seasonDetail` never render. Every other string is scanned against every roster and pro name in the sports data and fails the build (exit 3) until rewritten. Sources that name a student, or are a per-person page (`/player/`, `/roster/`), are dropped from the Sources list. |
| **Hype is in the delivery, never in a fact** | A HARD RULE says so, and every streak is a computed sentence in the PDF, so the hosts never count for themselves. |
| **Streaks are computed** | Consecutive Cup wins and runner-up finishes in the same class (≥ 2), the current run, and consecutive sport title years from `cup.pointSources.titleYears`. A run in another class is stated with its class. |
| **The episode order** | Open → what the Cup is → how points work → the whole field + six-season champions → where it stands right now (only with live rows) → one segment per roster school, best latest place first → the race at the top → close. |
| **Freshness is a stop, not an override** | A ledger that disagrees with the association, or a newer *final* season, stops the build and routes to `/wells-fargo-cup`. The ledger is never changed here. |

## Step 1: which division

```bash
node scripts/gen_cup_episode.mjs        # lists the eligible divisions, exits 2
```

Show the user the list and ask which division. If the chosen division has one or two roster
schools, say so before building: one roster school makes a single-school "contenders"
segment (today 2A is Gaston Day alone and 6A is Charlotte Catholic alone).

## Step 2: the freshness check (required, and the slow step, so say it is running)

`curl` the association's standings for the division:

- **NCISAA:** Current Standings,
  `https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/` (plain HTML, one
  table per class). If it has moved on to a newer season, the ledger's latest season is on
  that season's Past Champions page (the URLs are in each Cup card's `cup.sources`).
- **NCHSAA:** the association's Cup post for the season, from Charlotte Catholic's
  `cup.sources`.

Compare **every cell** of the division's latest final season (place, tie mark, points, and
the fall/winter/spring splits where published) with `src/data/wellsFargoCup.ts`.

- **Any difference → stop.** Report the cells, and recommend a ledger correction through
  `/wells-fargo-cup` → `/plan`. Never build an episode on figures the app disagrees with.
- **A newer final season posted** (for example 2026–27, in summer 2027) **→ stop** the same
  way: the ledger gets the new season first.
- A page that cannot be reached: say which, and do not build until it can be checked.

## Step 3: the live season and extras

If the association has posted **in-progress** standings for a season newer than the ledger's
latest, transcribe the division's table into `<scratch>/live.json`:

```json
{
  "season": "2026–27", "asOf": "2026-11-20", "throughTerm": "fall",
  "source": "https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/",
  "rows": [{ "school": "Providence Day School", "slug": "providence-day",
             "place": 1, "tied": false, "fall": 222.5, "winter": 0, "spring": 0, "points": 222.5 }],
  "finalField": []
}
```

`slug` only for a roster school. `finalField` (same row shape, for the ledger's latest season)
is only for filling a field the ledger holds partially; the generator warns when it does. A
`season` already in the ledger exits 2, because a final season belongs in the ledger.

Then run a scoped sweep for **this season's results that earn Cup points** for the
division's roster schools: state championship finishes on the association's own sport pages
first, local press only as a lead. Put each fact with its URL in `<scratch>/extras.json`:

```json
{ "division": [{ "text": "...", "source": "https://..." }],
  "schools": { "providence-day": [{ "text": "...", "source": "https://..." }] } }
```

**Official association tables only for any points figure.** An AI report or a third-party
summary is a lead to check, never a source: the report behind the Cup card's design matched
10 of 60 official cells. Write extras by team, position or class, **never with a student's
name**.

### Step 3b: persist what was fetched (data-provenance standard)

Save the live table to the folder that already holds that division's standings (4A →
`providence-day`, 2A/3A → `davidson-day`, NCHSAA → `charlotte-catholic`) as
`<School> - Sports - Wells Fargo Cup Standings <season> In Progress.md`. Save school-specific
findings to `source-material/sports/<slug>/<School> - Sports - Wells Fargo Cup Points <season>
Season.md`. Each file gets a Method header, the URLs, and the record-level detail. Both names
contain "Wells Fargo Cup", so the first `sports` rule in `src/lib/metrics.ts` folds them onto
`redesign-research` and they never become prose cards.

Commit them on a `data/cup-<season>-<division>` branch with **explicit paths** (never
`git add -A`), run `ingest-source-material` (restore HEAD order in `schools.json` if the
manifest is reordered), open a PR with `--body-file`, and merge with
`gh pr merge --squash --delete-branch`. Then check out `main` and pull. The ledger is not
touched. Skip this step when nothing was fetched beyond the freshness check.

## Step 4: the name gate

```bash
npm run report:cup -- --division <slug> --overrides <scratch>/overrides.json \
  --skeleton <scratch>/skeleton.json
```

It exits **3** and lists every string carrying a student or pro name (and any email or
phone number). `--skeleton` writes them out as a starter overrides file. Merge those paths
into the overrides file and rewrite each value: a string replaces it, `null` drops it.
Paths are `<slug>.<card>.<field path>` (for example
`providence-day.coaching.featured.0.detail`) or `extras.<division|slug>.<i>.text`.

- **Student →** the team, position or class: "the senior quarterback", "a Class of 2026
  signee". **Pro alumni** are on the list too (default from the plan; revisit only if the
  user asks): "an NBA alum", "an NFL quarterback".
- **A coach flagged by mistake** (a coach named only in `worthKnowing` who shares a surname
  with a student): rewrite the sentence so it no longer carries the collision, or drop it.
- Change nothing else about the meaning, and add no fact.

The gate only knows the names in the data. **Read the rendered PDF anyway**: a first name on
its own ("his son Zeke plays for the Chargers") is invisible to it, and the first 4A build
needed exactly that rewrite.

## Step 5: notes, then build

The generic prompt runs ~2,700 characters for a one-school division and ~3,650 for 4A with a
live segment. A `--notes <file>` adds the rest, and the 4,900 budget is enforced on the
whole body. Use the notes for:

- a `PRONOUNCE:` line (Rabun Gap, Ravenscroft, Cuthbertson, Watauga, as they apply)
- **two to four** must-land lines, written **positively and without conditions** (never
  "if …"), e.g. the closest finish, a streak that ended, a school that changed class

```bash
npm run report:cup -- --division <slug> --overrides <scratch>/overrides.json \
  [--live <scratch>/live.json] [--extras <scratch>/extras.json] --notes <scratch>/notes.txt
```

Outputs go to `reports/wells-fargo-cup/` (gitignored, so an episode makes no PR):
`Wells Fargo Cup - <DIV> - NotebookLM Source.pdf`, `… Prompt.txt`, and `<division>-cup.html`.
Read the PDF with `pdftotext -layout` before handing it over, and grep it for every
`pipeline.roster` name (expect 0 hits).

## Step 6: hand over

Give both paths, then the steps:

1. [notebooklm.google.com](https://notebooklm.google.com): a new notebook named
   `Charlotte Private School Conversations — <DIV> Wells Fargo Cup`
2. Upload **the PDF as the only source**
3. Audio Overview → Deep Dive → **Customize**: paste everything below the `PASTE FROM HERE` line
4. **Length: Longer.** Generate, then bring back the transcript.

Then list the **traps to listen for**. Always include these, plus the division-specific ones:

- a spoken student name
- a streak or title the PDF does not state (especially a "six straight")
- a place or point total misread, or "tied" dropped
- a school from another class pulled into this division's race (Davidson Day's 2A Cup said
  as a 3A Cup)
- an in-progress standing spoken as final
- hype stated as fact ("the best program in the state")
- an invented game, score or opponent
- the opening line not exact; the site not named at the open and the close
- "PDF", "document" or "source" spoken; rules recited on air
- anything after the closing sentence, or only half of it

Save a project memory recording the build, the division's traps and the prompt length, as
the learning skill does.

## Step 7: judging a take

When the user brings a transcript back, **check its claims against the PDF text**
(`pdftotext -layout`, then grep). Don't just read it through, because a correct PDF does not
make a correct episode. Report a verdict (**PUBLISHABLE** or **RE-DO**), each defect with
the PDF's actual wording, and the minor residue separately.

A re-do gets a hand-edited `… Prompt v2.txt` beside the first, with a `#` header line naming
what it fixes. Keep it under 4,900: fix a defect by rewording a line, not by stacking
rules. **Compare takes rather than assume the newest is best.** If the same fix is needed for
a second division, fold it into the generator's template and rebuild.

## Step 8: after the user publishes

Adding the episode to `src/data/podcastEpisodes.ts` is a separate one-row change on its own
branch and PR, with `schools:` = every roster school in the division and
`researchArea: 'sports'`. Verify the Spotify URL via oEmbed first, and keep ids contiguous.
Deploying is the user's call, every time.

**Deliberately cannot:** edit app code, the Cup ledger or any card; speak a student's name;
build on a ledger the association disagrees with; or deploy.
