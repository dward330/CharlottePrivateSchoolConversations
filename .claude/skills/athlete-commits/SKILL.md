---
name: athlete-commits
description: >
  Refresh one roster school's College Pipeline card (Sports) and its two Compare commit rows
  by cross-referencing the school's varsity rosters — every varsity sport the school fields,
  from the school's own team pages and MaxPreps for the last three seasons plus the current
  one — against the HighSchoolOT per-sport recruiting trackers, college rosters, 247Sports,
  RealGM, LaxNumbers, SwimSwam, PrepVolleyball, Prep Girls Hoops and the NC Football News
  trackers, to find college commitments the card does not have. Asks which school if not
  given and refuses any school that is not in the web app. Tells the developer to turn on the
  Claude in Chrome extension first, because RealGM (every basketball graduate's college) and
  LaxNumbers (every lacrosse commit) block every scripted fetch. Reports new, changed and ruled-out
  athletes with the funnel and Compare deltas, saves the verified record to
  source-material, and hands off to /plan. Use when the user types /athlete-commits, or asks
  to "find new college commits for <school>", "cross-reference <school>'s rosters",
  "refresh <school>'s college pipeline", "are there athletes we're missing for <school>".
  This skill writes ONLY source-material and the plan (via /plan), never app code.
---

# /athlete-commits — from a school's varsity rosters to a College Pipeline plan

The repeatable version of what rebuilt Cannon's card (`.claude/plans/cannoncommits.md`,
2026-11-08): a shallow web search had found six commitments in three years; reading the
rosters and following each senior to a college roster found **fourteen**, two of them Power 4
signees the card had never heard of. A second pass over the sports the first one had
skipped (`cannoncommits2`) found nine more — a third Power 4, five Division I and three
Division III, eight of them in lacrosse — which is why the scope below is **every varsity
sport the school fields**, not a shortlist. The flow is **school → rosters → each senior cross-referenced →
graduate test → report → source-material → `/plan` → `/implement`**.

The card is data-driven (`pipeline` in `src/data/sportsPrograms/<slug>.ts`, rendered by
`src/components/SportsProgram.tsx`), and the Compare rows `p4-commits-2426` and
`d1-commits-2426` are typed in `src/data/metricValues.ts`. So a refresh needs **data, not
component changes**.

## Hard constraints

- **Only schools in the web app.** The slug must be in `src/data/schools.json`. This skill
  never researches a school the app does not cover; for that, run `/add-school`.
- **This skill writes no app code.** Its outputs are `source-material/sports/<slug>/*.md`
  files and a `/plan` handoff.
- **Every athlete is confirmed on the college's own roster or signing release, or on two
  independent published sources.** A recruiting database's college column is a lead, not a
  confirmation: RealGM listed Jake Baker at Western Carolina (where he transferred), not East
  Carolina (where he signed).
- **The graduate test.** An athlete counts for the school only if they finished high school
  there. Check the school's roster for the athlete's senior season, and read the college
  roster's "Last School" line. Three Cannon leads failed it — one spent his senior year at
  Overtime Elite, one left after his junior year, and a Dartmouth faceoff commit every
  lacrosse database files under Cannon is listed by Dartmouth with a Connecticut prep school
  as his last school — and each would have inflated the count.
- **Verbal commitments are listed, never counted in the window.** A current senior with a
  public commitment goes on the roster (the Brooke Busby precedent) and stays out of the
  funnel, the sport bars and the Power 4 / Division I rows until they sign and the window
  rolls. They **are** the value of the `seniors-committed` Compare row (plan `seniorsrow`),
  which counts the current senior class at any level, verbal or signed.
- **The current senior class's commitments are always retained in their own file**,
  `<School> - Sports - College Commitments Class of <year>.md`, so that when the window
  rolls the class can be promoted into the counts without re-research. That file is never
  deleted; the roll merges its confirmed rows into the window file and leaves it in place.
- **No student is named in the record unless they have a documented commitment or were a
  lead that was ruled out.** Current students without a commitment are recorded as counts
  per sport. The rosters you pull are full of minors.
- **"Scholarship" is never claimed.** The card counts documented commitments to college
  athletics at any level: walk-ons count (Nick Arnold, Duke; Hayes Galloway, Clemson), D3
  counts, junior college counts.
- **No deploy.**

## Step 0 — Turn on Claude in Chrome

Tell the developer, before anything else:

> Make sure the **Claude in Chrome** extension is enabled and Chrome is open. Two sources
> return 403 to curl and to WebFetch and can only be read through the browser: RealGM's
> school page (every basketball graduate with the college they went to) and LaxNumbers'
> team recruits page (every lacrosse commit by class). On the Cannon passes they surfaced
> five of the eight basketball names and all eight lacrosse names.

Then load the browser tools in **one** `ToolSearch` call:

```
select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__browser_batch,mcp__claude-in-chrome__tabs_close_mcp
```

Call `tabs_context_mcp` with `createIfEmpty: true`, work in that tab, and close it at the
end. If the extension is not connected, stop and say so rather than skipping RealGM — a pass
without it will report basketball as "nothing found" when the answer was one page away.
On3's and SwimCloud's domains are **not permitted** in the extension (and both are
Cloudflare-blocked to curl); their data reaches you only through search snippets, so do not
spend a turn on either.

**Chrome is required for a graduate refresh and optional for the current-senior pass.**
Current seniors have no college roster yet, so their evidence lives in commitment trackers
and club lists that answer curl; on the eleven-school seniors sweep of 2026-11-08 the
browser contributed two RealGM nulls and the final page check, nothing more. Say which pass
you are running, and do not stall a seniors pass on a disconnected extension.

## Step 1 — Which school

If the user did not name one, ask. Then read `src/data/schools.json` and `src/data/brands.ts`
and **stop** on either of these:

- the slug is not in `schools.json` — "this skill only runs for schools in the web app; run
  `/add-school` first";
- `hasHighSchool: false` in `brands.ts` (Charlotte Prep, Trinity Episcopal) — a K-8 school
  has no College Pipeline card and no Compare rows.

If the school's `src/data/sportsPrograms/<slug>.ts` has **no `pipeline` card** (Gaston Day
today), say so: the sweep can still run, but a card the school never had is a **new card**
under the UX-design gate, and the handoff must say the user's approval is needed before
`/implement`. A school with a card needs no approval — every change fills existing fields.

Read before researching, and write down what the card holds today: `roster[]` (names,
classes, levels), `funnel[]` counts, `sportBars[]`, the three Compare values
(`p4-commits-2426`, `d1-commits-2426`, `seniors-committed`) and their `quals.<slug>.text`,
and the existing provenance files `source-material/sports/<slug>/<School> - Sports - College
Commitments 2024-2026.md` and `… - College Commitments Class of <year>.md`. The report in
step 5 is a diff against this.

**The window check — run it every time, and say the result.** The Power 4 and Division I
rows cover a three-class window; its last year is in the keys (`…-2426` → 2026). Work out
the current senior class (the school year's end: month ≥ 7 → year + 1, else year) and the
most recently graduated class (current − 1; a class counts as graduated from 1 June). If
the most recently graduated class is **later than the window's last year, tell the user it
is time to roll the window by one**, and that the roll is its own plan, not part of this
school's refresh: rename both keys (`2426` → `2527`) and their labels and notes, recount
every school from the retained `College Commitments Class of <year>.md` files (promoting
that class's confirmed rows into each school's window file), move the `seniors-committed`
row and the roster's verbal block to the new senior class, and update the floor paragraph in
`CLAUDE.md`. Never roll the window inside one school's refresh — the rows are comparable
only if every school rolls together. (Set 2026-11-08 with the user; Cannon's 2027 verbals
are the first class waiting on it.)

## Step 2 — Pull the rosters

Scope is **every varsity sport the school fields.** The first Cannon pass covered six
"major" sports and missed eight lacrosse commits, five of them Division I and one Power 4;
across the roster schools, lacrosse, track and swimming each produce more commitments than
volleyball, and Davidson Day's Power 4 list includes an equestrian. The roster pull is
cheap once MaxPreps answers, so pull them all. Depth is tiered in step 3: full per-name
cross-reference wherever a sport has a commitment database, grouped searches plus a
college-roster check where it does not (cheer, equestrian, crew). Say in the record which
tier each sport got.

**The school's own site first.** Find the team pages. A Finalsite athletics site (Cannon:
`athletics.<school>.org/teams/team-details/~athletics-team-id/<id>`) server-renders the
roster with class years, so `curl` works; other platforms differ, so look before assuming.
Two traps: out-of-season teams show an empty roster ("No players were found"), and the roster
is **cleared between seasons**, so last year's seniors are not there and Wayback usually has
no snapshot. The school's site gives you the current classes; it rarely gives you the
graduates.

**MaxPreps for the past seasons.** `https://www.maxpreps.com/nc/<city>/<school>-<mascot>/<sport>/<yy-yy>/roster/`
answers `curl` with a browser user agent and server-renders a `<tr>` table of name, grade and
position. Use the **path form** for a past season (`/basketball/24-25/roster/`); the
`?season=` query form silently returns the current season. Pull the last three seasons and the
current one for each sport. Sport slugs that are not obvious: girls soccer is
`/soccer/girls/spring/`, girls tennis `/tennis/girls/fall/`, girls golf `/golf/girls/fall/`,
cross country `/cross-country/`, and `/track-and-field/` and `/swimming/` 404 for Cannon in
every season. Golf and wrestling pages often exist with an empty table. A sport that 404s or
is empty for every season is recorded as **unchecked**, not as a null. Football may live
under a second MaxPreps school slug (Cannon's is `cannon-cannon-concord-academy-cougars`);
search "MaxPreps <school> football roster" to find it.

From each roster, list the seniors (`Sr.`) by season — those are the graduating classes in
the 2024–26 window — and the current seniors, who are the verbal-commitment candidates.

## Step 3 — Cross-reference every senior

**Start with the HighSchoolOT recruiting trackers — one page per sport, statewide, and
they answer curl.** The hub is
`https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/`;
it links 17 trackers (baseball, softball, boys and girls basketball, boys and girls
lacrosse, boys and girls soccer, boys and girls swimming & diving, boys and girls tennis,
boys and girls golf, volleyball, wrestling, football via NC Football News). Fetch every one
and grep the school's name; each hit prints `<name>, <school> — <college>` under a division
and class heading. On Cannon this surfaced a girls basketball commit no other source had
(confirmed on Elon's roster), the sport behind a "Not published" row (confirmed on the
college's volleyball roster) and a tennis lead the college's roster did not confirm. The
trackers are reader-submitted and run a class or two behind, so they are the map, not the
confirmation.

Then work sport by sport, in this order of sources; stop at the first confirmation and
record it.

| Sport | Best first source | Then |
|---|---|---|
| Basketball (both) | **RealGM school page** in Chrome: `basketball.realgm.com/highschool/teams/<id>/<School>` — HS grad year and College column for every player it knows | the college's roster page; Prep Girls Hoops player pages (girls; show "Committed"); Phenom Hoop Report |
| Football | **NC Football News commitment tracker** per class (`/2026-north-carolina-high-school-football-college-commits/`, `/2027-…`; the 2024 and 2025 slugs differ — search) | 247Sports player page via WebFetch (rating, Composite ranks, "Hard Commit"); the college's roster page |
| Lacrosse (both) | **LaxNumbers team recruits page** in Chrome: `laxnumbers.com/team_info.php?y=<year>&t=<id>&s=2` (boys; find the id by search), one page per season, columns Name · Class · Club · Pos · Div · College | the college's roster page; Inside Lacrosse; the Charlotte Observer's All-Observer lacrosse teams (June, via Yahoo) name commits |
| Volleyball | **PrepVolleyball school page** (`/high-school-volleyball-details/women/<school>/hsid-<id>`) lists every commitment it tracks | the college's season preview or roster |
| Soccer | TopDrawerSoccer team profile (user-submitted — a commitment there is a lead) | the college's roster |
| Baseball / softball | Perfect Game and Prep Baseball Report via search | the college's roster |
| Swimming | SwimSwam and Swimming World via search ("<name> commits"); the Charlotte Observer's preseason swimming preview names verbals | the college's roster (SwimCloud is blocked both ways) |
| Tennis | TennisRecruiting.net commitment lists via search | the college's roster |
| Track / XC | MileSplit NC signing coverage via search | the college's roster |
| Golf | Junior Golf Scoreboard commitments via search | the college's roster |
| Field hockey | MAX Field Hockey commitments via search | the college's roster |
| Wrestling | InterMat / FloWrestling commit lists via search | the college's roster |
| Any | Grouped OR-searches of 4–6 names + "commit OR roster OR college" | the Charlotte Observer preseason previews (via Yahoo), which print "committed to …" for every school in one article: swimming and girls/boys basketball in early November, lacrosse and baseball/softball in February–March, the All-Observer teams each June |

### The current-senior pass (feeds `seniors-committed`)

The yearly refresh of the *Current seniors committed* row is a different job from a
graduate refresh, and the eleven-school sweep of 2026-11-08 (plan `seniorsrow`) set its rules:

- **Time it to the signing waves.** Schools publish their named signing-day posts in three
  waves — mid-November (early period opens the second Wednesday), early February and late
  April — and the HighSchoolOT trackers fill in after each. A sweep run before mid-November
  read `'0'` for five of eleven schools whose posts were simply not up yet. Run the pass after
  each wave; a value taken earlier is provisional and the file must say so.
- **Run it roster-wide first.** The strongest sources list every school at once, so read each
  once and grep all eleven names: the NC Football News class tracker, 247Sports' NC class
  rankings pages (football and basketball), Team 91 Charlotte's "The Scoop — The
  Commitments" and Ultimate Lacrosse Charlotte's and Team 91 Carolina's commitment pages,
  Prep Baseball Report's NC class rankings, PrepVolleyball's class watchlist, and the
  Observer previews above. Only then go school by school for the schools' own posts.
- **Confirm the class year on the school's roster before counting.** The previews mix
  juniors and seniors in one list: two Providence Day swimmers committed to Florida and UNC
  were juniors (Class of 2028) and would have inflated the row.
- **Grade the evidence.** A club's own newsletter about its own players counts as a source
  (Team 91's Scoop confirmed a LaxNumbers-only lead). A tracker and a roundup from the same
  publisher count once (two NC Football News items left two Charlotte Catholic commits as
  leads). An athletic director quoted on the record in a newspaper is the school speaking
  (Gaston Day's Stanford swimmer). Prep Baseball Report and Perfect Game are independent of
  each other. A self-reported profile (SportsRecruits, a TopDrawerSoccer team page) is a
  lead; TopDrawerSoccer's editorial recruiting roundups are a source.
- **Write the per-class file for every school, including the zeros**, and carry the leads
  in it so the next wave's pass starts from them (Step 6).

**A user-submitted database alone is a lead, not a row.** LaxNumbers listed three Cannon
Class-of-2027 verbals that no second source confirmed; they stay in the record as leads. A
lead confirmed by a second reader-submitted list (HighSchoolOT + SportsRecruits) but absent
from the college's published roster for the entry year is also **not** a row — one Cannon
girls lacrosse commit was missing from the college's roster for the season she should have
joined, which reads as a decommit until the college says otherwise.

**The confirmation is the college's own page.** Sidearm roster pages (`goheels.com`,
`ecupirates.com`, `hscathletics.com`, `generalssports.com`, `athletics.hamilton.edu`,
`region10sports.com` for NJCAA Region 10, …) all answer `curl` and print
"Hometown / High School", which is also your graduate-test evidence. A signing release
("<College> signs <name>") is as good. A tracker, a fan forum or an athlete's own social bio
is a second source, never the only one.

**Transfers.** A player's current team is often not the one they signed with out of high
school (Swartz Miami → Creighton; Baker East Carolina → Western Carolina; Galloway North
Carolina → Clemson). The card shows the **college committed to out of the school**; the
move goes in one `rosterNote` sentence and in the record.

**Name forms.** Use the school's own roster spelling (`Marcus Sales`, not the recruiting
sites' `Marcus Sales Jr.`), unless the school's roster prints a legal name nobody publishes
under (`Gary Cooler` → `Tripp Cooler`, which the school's own preview to the Observer uses).
Record the choice.

## Step 4 — Classify

- **Power 4 = SEC / Big Ten / ACC / Big 12** only. Notre Dame counts as ACC on this card.
- **Level and conference strings reuse the existing vocabulary** — grep
  `src/data/sportsPrograms/*.ts` for `level:` and `conf:` before writing a new one. The
  American Athletic Conference is `'American'` (5 uses) not `'AAC'` (3); Furman is
  `'Southern'` where the school's own file already uses it. A new string is a new translation
  unit in nine locales.
- **Junior college** has no `CommitLevel`: list at `'D3'` with `conf: 'NJCAA'` and say so in
  `rosterNote` (Covenant Day precedent, `covenant-day.ts`).
- **`rank247`** only when 247Sports publishes a Composite rank (football and basketball);
  omit the field otherwise, never a placeholder. Read the live page before typing the numbers
  — a September rank and the final Composite differ.
- **Sport labels** reuse existing units: `'Boys Basketball'`, `'Girls Basketball'`,
  `'Football'`, `'Volleyball'`, `'Swimming'`, `'Track & Field'`, `'Boys Lacrosse'`,
  `'Girls Lacrosse'`, `'Boys Tennis'`, `'Girls Soccer'`. A sport that no source publishes
  stays `'Not published'` — and a tracker for a different sport may be what fills it (the
  volleyball tracker named the sport behind Cannon's "William Smith" row).
- **When sources disagree on the sport**, follow the editorial source, record the
  disagreement in the per-class file, and re-check the college's roster when it is
  published (a Charlotte Catholic Bucknell commit is a soccer forward to TopDrawerSoccer and
  a lacrosse midfielder to his club).

## Step 5 — Report

Print, before any persistence, so the user sees the result:

- **New athletes** in the 2024–26 window, each with college, conference, level and the
  confirming URL; **changed rows** (a sport filled, a conference corrected); **verbals** for
  the current class, marked as uncounted.
- **Ruled out**, each with the reason (graduate test, offer-not-commit, mislabelled school,
  unverified).
- **The deltas**: funnel before → after (committed / D1 / P4), by-sport counts, and the two
  Compare values before → after.
- **Nulls** (what was searched and found empty, as counts per sport and class) and
  **unchecked** (rosters that could not be retrieved) — kept apart, because a null is a
  finding and an unchecked gap is not.

A pass that finds nothing new is a useful result: it converts "almost certainly
undercounted" into a confirmed floor, and the record says so.

## Step 6 — Persist

Write, uningested (`/implement` runs the ingest on a branch):

1. **Rebuild** `source-material/sports/<slug>/<School> - Sports - College Commitments 2024-2026.md`
   — keep the filename, which already folds onto the `matriculation` key in
   `src/lib/metrics.ts`. Shape it like Cannon's: provenance header with the standard applied
   and the graduate test, a Sources list with every URL, one table per class with a
   *Confirmed by* column, totals → app metric values, a Class-of-<current> verbal appendix,
   and an *Excluded* list.
2. **New** `source-material/sports/<slug>/<School> - Sports - Varsity Roster Cross-Reference <year>.md`
   — scope, which rosters were pulled and from where, which sources were reachable, the
   nulls and the unchecked gaps, the leads ruled out. Names only for committed or ruled-out
   athletes. The `/roster cross-reference/i` rule folds it onto the research dossier; if that
   rule is not yet in `src/lib/metrics.ts` (it ships with plan `cannoncommits`), the plan
   must add it.
3. **One superseded note** in the school's `… - Sports - Redesign Research 2026.md` (or
   whatever its sports dossier is called) above the section the old pipeline table sits in,
   pointing at the two files.
4. **Write or extend** `source-material/sports/<slug>/<School> - Sports - College Commitments Class of <year>.md`
   for the current senior class — every public commitment found (verbal or signed, any
   level), each with its sources and a *Confirmed by* column, plus the leads that failed the
   two-source rule. It folds onto `matriculation` via the `/college commitments/i` rule. This
   file is the value of the `seniors-committed` Compare row and the data the window roll
   promotes, so it is written **even when the class has zero commitments** (the sweep itself
   is the finding) and is **never deleted**.

## Step 7 — Hand off to `/plan`

Invoke `/plan` with the name `<slug>commits` and a brief that mirrors
`.claude/plans/cannoncommits.md`: the per-athlete verification table, the exact roster
rows in the card's conventions (classes newest-signed first, verbals last; P4 → D1 → D2 →
D3 within a class), the funnel counts and widths, the sport bars, the five prose fields to
rewrite (`headline`, `subhead`, `funnelNote`, `realityCheck`, `rosterNote` — never say what
was searched or could not be found; say what the school does or does not publish), the
`sources[]` additions, the three Compare values — the two window rows and
`seniors-committed` (the count of the per-class file's confirmed rows, any level) — and the
shared `quals` text, the `metrics.ts` rule if needed, and the Phase 2 unit forecast (five
`sports` prose units plus one `metric-values` unit per locale; new roster rows attach to
existing identifier units; roster indexes shift, so the splice matches by stamp, never by
path). Two-phase, as every card change with prose is. Say whether the UX gate applies (no
`pipeline` card today → yes), and repeat the window check's result so the plan records it.
