---
name: cupepisode
title: /cup-episode — a podcast episode on one Wells Fargo Cup division (e.g. NCISAA 4A), with hyped sports-analyst hosts
status: implemented
phases: 1
created: 2026-11-06
branch: feat/cup-episode
prs: []
---

# /cup-episode: a Wells Fargo Cup division as a podcast episode

## Goal

A new skill, `/cup-episode`, plus its generator `scripts/gen_cup_episode.mjs`
(`npm run report:cup`), turns **one Wells Fargo Cup division** (NCISAA 4A, 3A, 2A, or
NCHSAA 6A) into a NotebookLM source PDF and a talk-show prompt for an episode of
*Charlotte Private School Conversations*. The skill asks which division. The episode explains
what the Cup is and how points work, names every school in the division, and then goes school
by school through the **roster schools** in that division (the ones with app pages). For each
it covers the latest final place, the best finish of the six seasons, Cup streaks, and the
sports its points come from. The hosts bring the energy of a sports network covering a
championship. It works when the user can run `/cup-episode`, pick "NCISAA 4A", upload the
PDF and paste the prompt, and get an episode that covers all seven 4A roster schools with
every figure matching the ledger.

It is the sports counterpart of `/learning-support-episode`
(`.claude/skills/learning-support-episode/SKILL.md`, `scripts/gen_learning_episode.mjs`), and
follows that skill's structure and mechanics wherever this plan does not say otherwise.

## Context

**The data already exists. This plan reads it and never changes it.**

- `src/data/wellsFargoCup.ts` is the shared ledger. `CUP_RECORDS` holds per-school,
  per-season rows (`association`, `classification`, `season`, `place`, `tied?`, `points`,
  `fall`/`winter`/`spring`). `CUP_DIVISION_LEADERS` holds places 1–2 of every division the
  cards show, including off-roster schools. `CUP_SEASONS` runs `2020–21` … `2025–26`
  (**final** standings only). `CUP_POINTS` is `[50, 45, 40, 35, 30, 25, 20, 15]`.
  `CUP_SHORT_NAMES` / `CUP_HIGH_SCHOOLS` hold display names. `CUP_FIELD_SIZES` holds published
  field sizes (`NCISAA|4A: 17`, `2A: 25`, `3A: 26`). `CUP_SPORTS` holds the sports that score,
  per association and term.
- `src/lib/wellsFargoCup.ts` holds the computed rules, each taking the ledger as its last
  argument: `recordsFor`, `cupName`, `classLabel`, `divisionRows`, `seasonRival`,
  `nearestRival`, `headlineStats` (gives `cupsWon`, `seasonsTotal`, `latest`, `peak`,
  `latestMargin`, `bestSeason`, `currentStreak`, and `bestFinish`, which is the best place
  and the most recent one on a tie), `isComeback` and `leadOverNext`.
- Both modules import under **plain Node 24** (type stripping). `scripts/check_cup_ledger.mjs`
  already does `await import('../src/data/wellsFargoCup.ts')` and
  `await import('../src/lib/wellsFargoCup.ts')`, and it imports each
  `src/data/sportsPrograms/<slug>.ts` directly (lines 93–95). Copy that technique. Do **not**
  import `src/data/sportsProgram.ts` (the registry), because it calls `import.meta.glob`.
- Per-school sports data is in `src/data/sportsPrograms/<slug>.ts` (`SportsProgram` type in
  `src/data/sportsProgram.ts`). A `cup` key (`CupProgram`: `pointSources[]` with `sport`,
  `gender`, `season`, `titleYears[]`, `runnerUpYears?[]`, plus `sources[]`) is what marks a
  school as having a Cup card. Ten roster schools have one today. The other cards used here
  are `record` (`WinningRecord`: `headline`, `seasonLabels`, `rows[{program, cells[{result,
  record?}], note?}]`, `didNotWin?`, `bars[]`), `coaching` (`Coaching`: `featured[{kicker,
  name, stats[], detail}]`, `tenure[]`, `worthKnowing?`) and `pipeline` (`CollegePipeline`:
  `funnel[]`, `sportBars[]`, and `roster[]` of **named student commits**).
- The Cup card's own explainer copy lives in `src/locales/en.json` under `sports.cup`:
  `what1`, `what2`, `what3`, `what3Nchsaa`, `tieRule`, `sport_<key>`, `genderSport_boys/girls`,
  and `term_fall/winter/spring`. The generator reads `en.json` for these, the way
  `gen_learning_episode.mjs` reads `en.learning.glossary` (line 245).
- **Divisions with a roster school, from 2025–26** (each school's latest record):
  - NCISAA 4A, 7 of 17: Providence Day 1st, Charlotte Latin 2nd, Charlotte Country Day 3rd,
    Cannon 5th, Charlotte Christian 8th, Covenant Day 15th, Carmel Christian 16th. The ledger
    holds all 17 for 2025–26.
  - NCISAA 3A: Davidson Day and Hickory Grove Christian. **Davidson Day moved from 2A to 3A**,
    and it won 2A in 2023–24.
  - NCISAA 2A: Gaston Day.
  - NCHSAA 6A: Charlotte Catholic. The NCHSAA publishes only the top of each class (the ledger
    holds the top five), and its scoring adds five participation points per playoff sport.
- Hype facts already in the ledger: Providence Day has **four straight 4A Cups**
  (2022–23 → 2025–26) and 5 of 6. Charlotte Country Day won 4A in 2021–22. Providence Day
  won 2025–26 by **2.5 points** (692.5 to Latin's 690). The `pointSources` hold sport title
  runs, e.g. Providence Day girls soccer 2024, 2025 and 2026.
- **Live state, checked 2026-11-06:** the NCISAA "Current Standings" page
  (`https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/`) still shows the
  **2025–26** totals. No 2026–27 standings had been posted. The page is plain HTML and `curl`
  gets it, with one table per class. Its 2025–26 2A table lists 25 schools, the same as
  `CUP_FIELD_SIZES`.
- `reports/` is gitignored (`.gitignore` line 50), so episodes produce no PR. That matches the
  other two episode skills.
- Show rules are in the **Podcast episode standard** in `CLAUDE.md`: a real talk show; never
  say PDF, document or source aloud; the exact opening line; charlotteschoolinsights.com as
  a great resource to learn more at the open and the close. Also apply the standing NotebookLM
  lessons in memory: a conditional in a prompt gets dropped (decide segments in the generator);
  hedges get dropped; any descriptive phrase in a prompt can come back as a claim; the
  Customize box truncates silently at ~4,909 characters, so the budget is 4,900.

## Decisions

User decisions, 2026-11-06:

- **Ask which division**, and offer **every division that has at least one roster school**,
  computed from the ledger and never listed from memory. Today that is NCISAA 4A, 3A and 2A,
  and NCHSAA 6A. Before building a division with only one or two roster schools, the skill
  says so (one roster school makes a single-school "contenders" segment).
- **Check the live season on every run.** If the association has posted in-progress standings
  for the current season, the episode has a "where it stands right now" segment beside the
  latest final standings. Fetched data is **saved to source-material with URLs** and committed
  through a small data PR (see Steps). The app's ledger is **never** changed by this skill.
- **Coaches may be named; students may not.** Coaches appear as the school's athletics pages
  and the `coaching` card publish them. Players appear by team, position or class, never by
  name. (This is stricter than the app, which may name high school students, and it applies
  only to the audio episode.)
- **Hosts bring sports-broadcast energy**, as if covering a professional championship. The
  hype is in the delivery and the reactions, **never in a fact**.

Planning decisions (the user can correct these):

- **Names:** skill `cup-episode` (`/cup-episode`); generator `scripts/gen_cup_episode.mjs`;
  npm script `report:cup`; output folder `reports/wells-fargo-cup/`; division argument as a
  slug: `ncisaa-4a`, `ncisaa-3a`, `ncisaa-2a`, `nchsaa-6a`. These follow the
  `report:learning` / `reports/learning-support/` precedent.
- **Episode order**, fixed in the generator: open → what the Cup is → how points work → the
  whole field (latest final standings, plus the six-season champions list) → where it stands
  right now (only when a live table was supplied) → **one segment per roster school**, best
  latest place first → the race at the top → close. User criteria 2 and 3 set this order.
- **One numbered prompt segment per roster school.** Naming every school makes it hard for the
  hosts to skip one or rush the second half, and it is not a conditional.
- **Streaks are computed and written into the PDF as sentences**, never left for the hosts
  to work out: the longest run of consecutive Cup wins (any length ≥ 2), the current run, and
  sport title runs from `pointSources.titleYears`. "Back-to-back" means consecutive seasons
  in the ledger or consecutive years in `titleYears`. A run in another class (Davidson Day in
  2A) is stated with its class.
- **Best finish of the six seasons** uses `headlineStats().bestFinish`, said with its class
  and season, plus how many times the school reached that place.
- **Per-school content: the `cup`, `record` and `coaching` cards, and pipeline counts only.**
  From `pipeline` take the `funnel` labels and counts and the `sportBars`, never the `roster`.
  The `honors`, `national`, `facilities` and `offered` cards are **left out**. `honors` names
  students and pro alumni, and the other three are off the Cup topic. See Open questions.
- **Student-name gate, fail-closed (exit 3)**, modelled on `gen_learning_episode.mjs`'s
  "unspeakable-string gate" (lines 171–238). The name list is every `pipeline.roster[].name`
  and `honors.pros[].name` across all roster schools. Every string the generator would render
  is scanned against it, including the `--extras` file. A `--overrides` file rewrites or drops
  (`null`) the strings it lists, and `--skeleton` writes a starter overrides file. Coach names
  from `coaching.featured[].name` / `coaching.tenure[].name` are **allowed** and never on
  the list. As in the learning skill, the gate only knows the names in the data, so the skill
  still has to read the PDF.
- **No school's own figure is re-typed.** Places, points and splits come from the ledger at
  run time. The only typed figures are the in-progress table in `--live` and the researched
  extras, and each of those carries its source URL.
- **Freshness check is a stop, not an override.** The skill re-fetches the association's latest
  final table for the division and compares it with the ledger. If any cell differs, it stops
  and recommends a ledger correction through `/wells-fargo-cup` → `/plan`. It does not build
  an episode on figures the app disagrees with. If the association has posted a **new final**
  season (for example 2026–27, in summer 2027), the skill stops the same way: the ledger
  gets a new season first.
- **NCHSAA divisions** use `what3Nchsaa` and say "the published top finishers" instead of
  "every school". This is decided in the generator from `association`, never as a prompt
  conditional.
- **NotebookLM length: Longer.** The user said a long episode is fine.
- **Cup history text** is a constant in the generator (`HISTORY`) carrying only what the
  NCISAA page says: presented since 1985, sponsored by Wells Fargo Bank, awarded per
  classification for the most combined points, an engraved silver cup. A comment cites
  `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup History and
  Scoring.md`. The app's existing `what2` line (formerly the Wachovia Cup) is reused as the app
  already says it. Any longer history (all-time Cup counts) is a researched extra that has to
  be fetched from the NCISAA Past Champions archive and saved first.
- **Single-phase.** The skill and script add no app UI and no `src/data` prose. The episode
  files are English-only and gitignored.

## Approvals needed

None. No card, section, Compare row or metric is added, and no app UI changes. Deploying
stays the user's call, and this plan never deploys.

## Source material

- **Written during planning (uncommitted):**
  `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup History and
  Scoring.md`. It holds the NCISAA History and Scoring page text, retrieved 2026-11-06, and
  records that Current Standings still showed 2025–26 that day. Its subtopic contains "Wells
  Fargo Cup", so the first `sports` rule in `src/lib/metrics.ts` (line 265) folds it into
  `redesign-research` and it cannot become a prose card. `/implement` ingests it first
  (step 1).
- Fetched at run time by the skill, not by this plan: the in-progress standings and any
  researched extras (see step 3, skill Step 3).

## Out of scope

- Any change to `src/data/wellsFargoCup.ts`, `src/lib/wellsFargoCup.ts`, any
  `src/data/sportsPrograms/*.ts`, or any card. Ledger updates belong to `/wells-fargo-cup`.
- Adding a published episode to `src/data/podcastEpisodes.ts`. That is a later one-row PR
  per episode (skill Step 8).
- Making episodes for divisions with no roster school.
- Translating the episode. Episodes are English-only.
- Transcribing the 1999–2000 → 2019–20 Past Champions archive. The skill may do it per run as
  an extra.

## Steps

Single-phase: this adds no user-facing text in the app.

1. **Branch and ingest the staged source.** `git checkout -b feat/cup-episode` from an
   up-to-date `main`. Run the `ingest-source-material` skill for
   `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup History
   and Scoring.md`. Confirm the `src/data/schools.json` diff only adds that file under
   Providence Day's sports `redesign-research` key. If the manifest is reordered, restore
   HEAD order (memory: two-topic ingest reorders the manifest). `npm run check:metrics` should
   show no new unmatched subtopic.

2. **Write `scripts/gen_cup_episode.mjs`**, modelled on `scripts/gen_learning_episode.mjs`
   (header comment with the ⛔ reasons, `value()`/`die()`/`say()` helpers, the Playwright
   PDF render with `waitUntil: 'load'` and the same `page.pdf` options, `PROMPT_CHAR_BUDGET =
   4900`, the "PASTE FROM HERE" header, and the exit codes 0 / 2 / 3).

   **CLI:**
   ```
   node scripts/gen_cup_episode.mjs                       # lists eligible divisions, exits 2
   node scripts/gen_cup_episode.mjs --division ncisaa-4a \
     [--live <file.json>] [--extras <file.json>] [--overrides <file.json>] \
     [--skeleton <file.json>] [--notes <file.txt>]
   ```

   **a. Roster and divisions.** Import the ledger and the lib as `check_cup_ledger.mjs`
   does. Import every `src/data/sportsPrograms/*.ts` and keep the ones whose export has a `cup`
   key. For each, `headlineStats(slug).latest` gives its current `association` and
   `classification`. Group roster schools by `<association>-<classification>`, lowercased
   (`ncisaa-4a`). With no `--division`, print each eligible division, its roster schools and
   its field size, then exit 2. An unknown division also exits 2 and lists the valid ones.
   Display names come from `src/data/schools.json` for roster schools and from
   `CUP_SHORT_NAMES` otherwise.

   **b. Division facts (all computed).** Let `L` be the latest season in `CUP_SEASONS`.
   - *Field:* every `CUP_RECORDS` row with that association, class and season `L`, sorted
     by place, with tied places rendered as "tied for 9th". If the row count is below
     `CUP_FIELD_SIZES[`${assoc}|${cls}`]`, print a warning on stdout and add the missing
     names from `--live`'s optional `finalField` (below). For NCHSAA, title the section
     "the published top finishers" and use `tableNoteNchsaa` from `en.json`.
   - *Six-season champions:* for each season, `CUP_DIVISION_LEADERS` place 1 and place 2
     in this association and class, with points. Some roster schools were in another class
     in some seasons. Each roster-school segment states its own class per season instead.
   - *Race at the top:* the top two in `L` and the gap between them, plus the smallest
     1st-to-2nd gap across the six seasons and its season.

   **c. Per roster school**, ordered by place in `L`:
   - each season's class, place (with "tied for"), points and the fall/winter/spring
     splits where stored;
   - from `headlineStats`: `cupsWon` of `seasonsTotal`, `bestFinish` (place, class and season,
     plus the count of seasons at that place), `peak`, `latestMargin` (a win margin or the
     gap behind the winner, using `seasonRival` for the name) and `bestSeason`;
   - **streak sentences**: the longest run of consecutive place-1 seasons in the same class
     (≥ 2), and the current run when it differs. For example: "Providence Day has won four
     straight 4A Wells Fargo Cups: 2022–23, 2023–24, 2024–25 and 2025–26." Also state
     back-to-back runner-up runs (place 2), since they are good material for the race segment;
   - **where its points come from**: each `cup.pointSources` entry as "Girls soccer: state
     champions 2024, 2025 and 2026", using `sports.cup.genderSport_*` + `sport_<key>` from
     `en.json`, and computing **sport title runs** (consecutive `titleYears` ≥ 2 → "three
     straight state titles");
   - `record`: the `headline`, every `rows[]` entry as "Program: 2023–24 state champion
     (12–1), …" (turn `seasonLabels` like `'23–24` into `2023–24`, and the `result` codes into
     words: STATE → state champion, STATE x2 → two state titles, RUNNER-UP → runner-up,
     SEMIFINAL → semifinalist, NONE → did not reach the semifinals) with the `note`, then
     `didNotWin`. Leave out `bars` and `seasonDetail`. They are long, and `seasonDetail` is the
     likeliest field to name a player;
   - `coaching`: each `featured` coach's `kicker`, `name`, `stats` and `detail`; `tenure`
     rows as "name, role, since …"; `worthKnowing`;
   - `pipeline`: `funnel` (label and count) and `sportBars` (sport and count) only, under a
     heading "Playing in college, by the numbers". Never the `roster`.
   - a card the school lacks is skipped silently. Every school has a `cup` card by
     construction.

   **d. `--live <file.json>`**, optional. It is written by the skill from the association's
   live page:
   ```json
   {
     "season": "2026–27", "asOf": "2026-11-20", "throughTerm": "fall",
     "source": "https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/",
     "rows": [{ "school": "Providence Day School", "slug": "providence-day",
                "place": 1, "tied": false, "fall": 222.5, "winter": 0, "spring": 0, "points": 222.5 }],
     "finalField": []
   }
   ```
   When `rows` is non-empty, render the section "Where it stands right now: <season>, as of
   <asOf>, after the <throughTerm> season", list the rows, and state in the PDF that the
   season is not finished. Fail with exit 2 if `season` is already in `CUP_SEASONS`, because
   a final season belongs in the ledger. `finalField` is the same row shape for season `L`,
   used only to fill a partial field in (b).

   **e. `--extras <file.json>`**, optional. These are researched facts, each with a source:
   ```json
   { "division": [{ "text": "...", "source": "https://..." }],
     "schools": { "providence-day": [{ "text": "...", "source": "https://..." }] } }
   ```
   Division extras render after the history. School extras render at the end of that
   school's section, under "Also this season". Every source URL is listed in a
   "Sources" section at the end of the PDF, along with each roster school's `cup.sources`.

   **f. The gate (exit 3).** Build the student name list described in Decisions. Use
   `problemsIn`/`scan` from `gen_learning_episode.mjs` lines 171–238, restricted to names.
   Fee, email and phone are irrelevant here, though email and phone are still worth flagging.
   Scan the assembled per-school content and the extras, apply `--overrides`
   (`{ "<path>": "rewritten" | null }`, where a path is `<slug>.<card>.<field path>` or
   `extras.<division|slug>.<i>.text`), and exit 3 listing each offending path while any
   remain. `--skeleton` writes them out. After rendering, scan the final HTML again before the
   PDF is written.

   **g. HTML → PDF.** Same styling approach as the learning generator: Georgia, plain
   headings, tables for the field and the per-season rows. Sections, in this order:
   1. *About this episode*: division, latest final season, "as of" date (the run date), and
      one line saying that the standings come from the association's published tables.
   2. *What the Wells Fargo Cup is*: `HISTORY` + `what1` + `what2` (with `{{school}}`
      replaced by "Charlotte-area schools" and `{{association}}/{{classification}}` filled in).
   3. *How points are earned*: the `CUP_POINTS` ladder written out, `tieRule`, `what3` or
      `what3Nchsaa`, the three terms, and the sports that count from `CUP_SPORTS[assoc]`
      (fall, winter and spring lists, using `en.json` labels).
   4. *The <division> field, <L> final standings*: every school, then the six-season
      champions list.
   5. *Where it stands right now* (only with `--live` rows).
   6. *One section per roster school* (c).
   7. *The race at the top* (b).
   8. *Sources*.

   **h. The prompt.** Decide the segments in code from what exists, with no conditionals in
   the text. Draft body (keep the wording and trim filler only if the budget needs it; the
   per-school lines are generated):

   ```
   Produce an episode of "Charlotte Private School Conversations": "The ${DIV} Wells Fargo Cup Race." Two hosts with the energy of a sports network's studio show covering a championship: big reactions, quick banter, real excitement when a school strings titles together. The attached PDF is the ONLY source; if it does not say it, it does not go in. SHOW FORMAT: a real talk show, never a reading. The hosts trade takes in their own words, voicing opinions as opinions while every fact comes from the PDF. Never mention a PDF, document, source, text, file or notes aloud; say "the final standings show" or "our research found." Give every school equal care; never rush the second half.

   THESE INSTRUCTIONS ARE PRIVATE. Follow them silently. The hosts never announce, recite or discuss any rule here.

   OPEN with exactly: "Welcome to another episode of Charlotte Private School Conversations." Say in a sentence that this episode covers the ${DIV} Wells Fargo Cup race, then name www.charlotteschoolinsights.com as a great resource to learn more, with each school's own website as the authority.

   SEGMENTS, in this order:
   1) WHAT THE CUP IS. Its history and what it rewards: a whole athletic program, across a full year.
   2) HOW POINTS WORK. The ladder from 50 down to 15, how ties split, the three seasons, and a handful of the sports that count.
   3) THE FIELD. Name every school in the ${L} final standings with its place, briefly. Then the champions of the last six seasons.
   [4) WHERE IT STANDS RIGHT NOW. The standings so far in ${LIVE_SEASON}, as of ${AS_OF}. The season is not finished; say so.]   ← only emitted with live rows
   n) ${SCHOOL}. Latest final place and points, best finish of the six seasons, Cups won, every streak in its section with full energy, where its points come from, and its coach.   ← one per roster school
   n+1) THE RACE AT THE TOP. The closest finishes in "The race at the top."

   CLOSE — its own beat, never cut short. Three one-line takeaways, called our takes. Point once more to www.charlotteschoolinsights.com as a great resource to learn more, with each school's own website as the authority. Then a host ENDS the episode on this sentence, word for word and COMPLETE: "We've reported only what the published standings and each school's own results show; every season starts at zero, and the next Cup is still up for grabs."

   HARD RULES:
   - The hype is in the delivery, never in a fact. Dynasty, three-peat and back-to-back fit only a run the PDF states.
   - Every place, point total, season and title exactly as written. Never invent a game, score, opponent, player, record or ranking.
   - Name no student. Say the team, the position or the class. Name a coach only as written.
   - "Tied for" stays "tied for."
   - Discuss only schools in the PDF. A prediction is a take, said as one.
   - Read no URL aloud but www.charlotteschoolinsights.com, twice.
   - Never spell a word letter by letter.
   - The episode's last words are the full closing sentence. Nothing after it.
   ```

   `${DIV}` is "NCISAA 4A" and so on. For NCHSAA, segment 2 swaps in "plus five points for
   each sport that reaches the playoffs", and segment 3 says "the published top finishers"
   instead of "every school". Both are decided in code. Append `--notes` after the
   HARD RULES, as the learning generator does. **Enforce the 4,900 budget on the whole
   substituted body.** 4A, with seven school segments and a live segment, is the worst case.
   If it overflows, shorten the per-school line, never a HARD RULE. Prompt header: as in
   `gen_learning_episode.mjs`, but "Length: **Longer**".

   **i. Write** to `reports/wells-fargo-cup/`:
   `Wells Fargo Cup - <DIV> - NotebookLM Source.pdf`, `… Prompt.txt`, and
   `<division>-cup.html`. Print a one-line summary: the division, the roster schools, whether
   there is a live segment, the gate status and the prompt length.

3. **Write `.claude/skills/cup-episode/SKILL.md`**, with frontmatter `name: cup-episode` and a
   description in the style of `learning-support-episode`'s (triggers: "/cup-episode", "make a
   Wells Fargo Cup episode", "a podcast on NCISAA 4A", or a transcript brought back to check).
   Body sections:
   - Show rules pointer (Podcast episode standard), and the decisions table from this plan's
     Decisions (division asked, live check, coaches named and students not, hype in delivery
     only, streaks computed, freshness = stop).
   - **Step 1, which division.** Run the generator with no args, show the list, and ask the
     user. Mention it when the chosen division has one or two roster schools.
   - **Step 2, freshness check (required, and the slow step, so say it is running).** `curl`
     the association's standings. For NCISAA, use Current Standings, and the Past Champions
     page for the ledger's latest season if Current Standings has moved on. For NCHSAA, use
     the association's Cup post. Compare every cell for the division's season `L` with the
     ledger. Any difference, or a newer **final** season → **stop**, report the cells, and
     recommend `/wells-fargo-cup`. Never build on figures the app disagrees with.
   - **Step 3, the live season and extras.** If in-progress standings for a newer season are
     posted, transcribe the division's table into `<scratch>/live.json`. Then run a scoped
     sweep for this season's results that earn Cup points for the roster schools in the
     division (state championship finishes on the association's own sport pages first,
     then local press as a lead) and anything else worth saying. Put each fact with its URL in
     `<scratch>/extras.json`. Official association tables only for any points figure. An AI
     report or a third-party summary is a lead to check, never a source (memory: the 10 of 60
     report).
   - **Step 3b, persist what was fetched (data-provenance standard).** Save the live table to
     the folder that already holds that division's standings (4A → `providence-day`, 2A/3A →
     `davidson-day`, NCHSAA → `charlotte-catholic`) as `<School> - Sports - Wells Fargo Cup
     Standings <season> In Progress.md`. Save school-specific findings to
     `source-material/sports/<slug>/<School> - Sports - Wells Fargo Cup Points <season>
     Season.md`, with a Method header, the URLs, and the record-level detail. Both names
     contain "Wells Fargo Cup", so they fold onto `redesign-research` and never become cards.
     Commit them on a `data/cup-<season>-<division>` branch with **explicit paths** (never
     `git add -A`), run `ingest-source-material`, open a PR with `--body-file`, and merge with
     `gh pr merge --squash --delete-branch`. Then check out `main` and pull. The ledger is not
     touched.
   - **Step 4, the name gate.** Run with `--skeleton`. Rewrite every flagged string to the
     team, position or class, or set it to `null`. Never put a student's name into `extras`.
   - **Step 5, notes and build.** A `PRONOUNCE:` line (e.g. Rabun Gap, Ravenscroft, Cuthbertson
     as they apply), and 2–4 must-land lines written positively and without conditions.
     Then build. Read the PDF with `pdftotext -layout` before handing it over.
   - **Step 6, hand over.** Give the file paths and the steps: a new NotebookLM notebook
     `Charlotte Private School Conversations — <DIV> Wells Fargo Cup`, the PDF as the only
     source, Audio Overview → Deep Dive → Customize, paste below the line, **Length: Longer**.
     Then the **traps to listen for**: a spoken student name; a streak or title the PDF does
     not state (especially a "six straight"); a place or point total misread, or "tied"
     dropped; a school from another class pulled into this division's race; an in-progress
     standing spoken as final; hype stated as fact ("the best program in the state"); an
     invented game, score or opponent; the opening line not exact; the site not named at the
     open and the close; "PDF", "document" or "source" spoken; anything after the closing
     sentence.
   - **Step 7, judging a take.** Same as `learning-support-episode` Step 6: check claims
     against `pdftotext` output, give a PUBLISHABLE or RE-DO verdict, hand-edit `Prompt v2`
     under the budget, and compare takes rather than assume the newest is best.
   - **Step 8, after the user publishes.** A separate one-row PR adding the episode to
     `src/data/podcastEpisodes.ts` with `schools:` = every roster school in the division and
     `researchArea: 'sports'`. Verify the Spotify URL via oEmbed, and keep ids contiguous.
     Deploying is the user's call, every time.
   - **Deliberately cannot:** edit app code, the ledger or any card; speak a student's name;
     deploy.
   - Save a project memory after each episode build, as the learning skill does.

4. **Add the npm script** to `package.json`: `"report:cup": "node scripts/gen_cup_episode.mjs"`,
   beside `report:learning`.

5. **Update `.claude/SKILLS.md`** in this same PR. Add an At-a-glance row
   (`| 🏆🎙️ | [`cup-episode`](#cup-episode) | One Cup division → podcast | ❌ Generates files |
   Single |`, using whichever emoji is not already taken). Add a full `## cup-episode` section
   modelled on the `learning-support-episode` section: path, "added 2026-11-06", generator,
   the numbered steps, and call-outs for the episode order, the name rule, the live check and
   "deliberately cannot". Bump the counter **11 → 12 active** and **Last updated**. Change
   "Three stand alone: `add-school-news`, `admissions-episode` and `learning-support-episode`"
   to four, adding `cup-episode`.

6. **Update the Podcast episode standard in `CLAUDE.md`.** Add `/cup-episode`
   (`scripts/gen_cup_episode.mjs`) to the opening sentence's list of prompt sources, so the
   three show rules visibly cover it.

7. **Commit, PR, merge.** Stage explicit paths only (`git status --short` first): the
   script, the skill, `package.json`, `.claude/SKILLS.md`, `CLAUDE.md`, this plan,
   `.claude/plans/INDEX.md`, the staged source file and the ingest outputs. Open the PR with
   `--body-file`. Verify the push with `git rev-parse HEAD` against `git ls-remote`. Merge
   with `gh pr merge --squash --delete-branch`, then check out `main` and pull. Flip the
   INDEX row to Implemented with the PR link. **Do not deploy.** Nothing here touches the
   site anyway.

## Files touched

| File | Change |
|---|---|
| `scripts/gen_cup_episode.mjs` | new: the generator |
| `.claude/skills/cup-episode/SKILL.md` | new: the skill |
| `package.json` | edit: `report:cup` script |
| `.claude/SKILLS.md` | edit: new row and section, counter, stand-alone list |
| `CLAUDE.md` | edit: Podcast episode standard names the new generator |
| `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup History and Scoring.md` | new (staged during planning) |
| `src/data/schools.json`, `.claude/docs/…` | regenerated by ingest |
| `.claude/plans/cupepisode.md`, `.claude/plans/INDEX.md` | status updates |

## Verification

- [ ] `node scripts/gen_cup_episode.mjs` exits **2** and lists exactly `ncisaa-4a` (7 roster
      schools, field 17), `ncisaa-3a` (Davidson Day, Hickory Grove Christian), `ncisaa-2a`
      (Gaston Day) and `nchsaa-6a` (Charlotte Catholic).
- [ ] `--division ncisaa-9a` exits 2 and lists the valid divisions.
- [ ] `--division ncisaa-4a` (no live file) exits **0** or **3**. If 3, every flagged string is
      a real student name, which proves the gate fires on real data. Resolve with overrides
      and rebuild to exit 0.
- [ ] `pdftotext -layout` of the 4A PDF contains all **17** 2025–26 schools in place order;
      "four straight" (or the generator's exact phrasing) with the seasons 2022–23 through
      2025–26 for Providence Day; Charlotte Country Day's 2021–22 Cup; the 692.5–690 margin;
      Providence Day girls soccer's 2024–2026 title run; a coach name from a `coaching` card;
      and **no** name from any `pipeline.roster` (grep each one, expecting 0 hits).
- [ ] Every figure in the PDF's per-school tables equals the ledger. Spot-check Cannon
      2020–21 (4th, 463.75) and Carmel Christian 2025–26 (16th, 160).
- [ ] `--division ncisaa-3a`: Davidson Day's best finish reads as **1st in 2A, 2023–24**,
      with the class named, and its Cup is never presented as a 3A title.
- [ ] `--division nchsaa-6a`: the field is titled as the published top finishers, and the
      points section includes the five participation points.
- [ ] **Negative test, isolated:** copy a real `pipeline.roster` name into a throwaway
      `extras.json` and run → exit **3**, and the message names that `extras` path (read
      *which* message printed). Remove it → exit 0.
- [ ] A throwaway `live.json` with two rows → the PDF has the "Where it stands right now"
      section and the prompt has the extra segment. Setting `season` to `2025–26` → exit 2.
- [ ] Prompt body ≤ 4,900 characters for every division (the script refuses otherwise). Record
      the 4A length with the live segment in Implementation notes.
- [ ] The prompt contains the exact opening line, the site twice, and no "if ".
- [ ] `npm run check:cup` and `npm run check:metrics` pass. The ledger and lib are unchanged
      (`git diff --stat main -- src/` shows only `schools.json` from the ingest).
- [ ] `npm run build` passes after the ingest.

## Risks

| Risk | Mitigation |
|---|---|
| Hype makes hosts inflate facts ("best program in the state", "six straight") | The HARD RULE puts hype in the delivery only; streaks are pre-computed sentences; the traps list names it |
| A student name hides in prose the gate cannot match (a `record.note`, a press extra) | `seasonDetail` and `bars` are left out; `honors` is left out; the skill requires reading the PDF; extras are written by hand without names |
| A prompt over 4,900 characters is truncated silently | The hard budget check in the script; per-school lines are the first thing to trim |
| In-progress standings spoken as final | Its own labelled section and segment, "as of" date, "the season is not finished" |
| Ledger is stale against the association | The freshness check stops the build and routes to `/wells-fargo-cup` |
| Ingest reorders `schools.json` | Restore HEAD order (memory: two-topic ingest reorders the manifest) |

## Open questions

- **Pro alumni.** `honors.pros` are adults, and naming them ("a Providence Day alum now in the
  NFL") would be good sports-talk material, but the user's rule was "coaches yes, students no".
  — **default:** leave `honors` out entirely and keep pro names on the gate list. Revisit if
  the user asks.
- **Team nicknames** (Chargers, Hawks…). These are not in the ledger. — **default:** say them
  only where a school's own extras supply them with a URL.

## Implementation notes

Built 2026-11-06 on `feat/cup-episode`. Deviations from the plan, each found while reading
the generated PDFs:

- **`NONE` result cells are left out, not spoken as "did not reach the semifinals".** The card
  renders `NONE` as a bare dash and claims nothing; the plan's wording would be a new claim,
  and a false one for meet-scored sports (girls swimming).
- **The Sources list is gated too.** The first 4A build passed the string gate yet carried
  four roster names: pipeline citations are per-player pages ("Prep Girls Hoops — <name>",
  `/player/<first-last>/`). A source is now dropped when its label or URL (case- and
  hyphen-blind) matches a name, when its label matches a surname, or when its URL is a
  per-person page (`/player/`, `/roster/`, `/athlete/`, `/profile/`). The final
  belt-and-braces scan covers the whole page, Sources included. Sources also include the
  `record`, `coaching` and `pipeline` cards' citations, not only `cup.sources`.
- **Surname tokens skip coaches, school-name words and common words** (`Hall`, `Field`…):
  a pro's surname "Hall" flagged every "Hall of Fame".
- **Partial fields are said as partial.** The 2A ledger holds 22 of the 25 listed schools; the
  other three are listed with a blank place on 0 points (`CUP_FIELD_SIZES` comment), and the
  PDF now says exactly that instead of "all 25 of them".
- **NCHSAA note:** only the first clause of `tableNoteNchsaa` is used, because the PDF table
  has no dashes for "a dash means…" to refer to.
- **The prompt's "if it does not say it" became "what it does not say does not go in"**, so
  the verification's no-"if" check holds literally.
- **Per-school prompt lines are decided in code:** "every streak in its section" only when the
  school has one, "its coaches" only when its coaching card has entries (Carmel Christian's
  and Hickory Grove's `featured` are empty). Placeholder or unverified tenure `since` values
  ("tenure", "not published") never render.
- Emoji 📣, since 🏆 and 🎙️ are both taken.

Verification results:

- No args → exit 2 listing `ncisaa-4a` (7 schools, field 17), `nchsaa-6a` (Charlotte
  Catholic), `ncisaa-3a` (Davidson Day, Hickory Grove Christian), `ncisaa-2a` (Gaston Day).
  `ncisaa-9a` → exit 2 with the list.
- 4A without overrides → **exit 3** on real names (Stephen Curry, Will Grier, Alvin Pearman,
  a signee's surname). Resolved with overrides → exit 0. The PDF also needed "his son Zeke"
  rewritten by hand, invisible to the gate, which the skill now cites as the reason to read it.
- 4A PDF: all 17 schools in place order; "four straight NCISAA 4A Wells Fargo Cups: 2022–23,
  2023–24, 2024–25 and 2025–26"; Country Day 2021–22 (1 of 6); 692.5 to 690 (2.5); girls
  soccer 2024, 2025 and 2026 (three straight); Chad Grier named; Cannon 2020–21 4th 463.75 and
  Carmel 2025–26 16th 160. A sweep of all 344 roster and pro names finds **0** hits in each of
  the four PDFs, and 0 `/player/` URLs.
- 3A: Davidson Day's best finish reads "1st in NCISAA 2A, 2023–24", with the class-change note.
- 6A: field titled "published top finishers"; five participation points in the text and prompt.
- Negative test: a roster name in `extras.cannon.0.text` → exit 3 naming that path; removed → 0.
- Live file with two rows → the section and prompt segment appear; `season: 2025–26` → exit 2.
- Prompt bodies: 4A with live **3,649**, 4A 3,531, 3A 2,872, 6A 2,830, 2A 2,731 (budget 4,900).
  Exact opening line once, the site at open and close, no "if ".
- `check:cup` OK; `check:metrics` shows no new unmatched subtopic; `npm run schema` picked up
  the one new document; `npm run build` passes. `git diff --stat main -- src/` shows only the
  ingest outputs (`schools.json`, `src/content/sports/providence-day.json`).
- The freshness check (skill Step 2) belongs to an episode run, not this build, and was not run.
