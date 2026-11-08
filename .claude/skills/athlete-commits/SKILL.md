---
name: athlete-commits
description: >
  Refresh one roster school's College Pipeline card (Sports) and its two Compare commit rows
  by cross-referencing the school's varsity rosters — the school's own team pages and
  MaxPreps for the last three seasons plus the current one — against college rosters,
  247Sports, RealGM, SwimSwam, PrepVolleyball, Prep Girls Hoops and the NC Football News
  trackers, to find college commitments the card does not have. Asks which school if not
  given and refuses any school that is not in the web app. Tells the developer to turn on the
  Claude in Chrome extension first, because the one source that lists every basketball
  graduate's college blocks every scripted fetch. Reports new, changed and ruled-out
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
signees the card had never heard of. The flow is **school → rosters → each senior
cross-referenced → graduate test → report → source-material → `/plan` → `/implement`**.

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
  there. Check the school's roster for the athlete's senior season. Two Cannon leads failed
  it — one spent his senior year at Overtime Elite, one left after his junior year — and
  both would have inflated the count.
- **Verbal commitments are listed, never counted.** A current senior with a public commitment
  goes on the roster (the Brooke Busby precedent) and stays out of the funnel, the sport bars
  and Compare until they sign.
- **No student is named in the record unless they have a documented commitment or were a
  lead that was ruled out.** Current students without a commitment are recorded as counts
  per sport. The rosters you pull are full of minors.
- **"Scholarship" is never claimed.** The card counts documented commitments to college
  athletics at any level: walk-ons count (Nick Arnold, Duke; Hayes Galloway, Clemson), D3
  counts, junior college counts.
- **No deploy.**

## Step 0 — Turn on Claude in Chrome

Tell the developer, before anything else:

> Make sure the **Claude in Chrome** extension is enabled and Chrome is open. RealGM's
> school page — the one source that lists every basketball graduate with the college they
> went to — returns 403 to curl and to WebFetch, and could only be read through the browser.
> On the Cannon pass it was what surfaced Swartz, Murash, Martin, Baker and Ingram.

Then load the browser tools in **one** `ToolSearch` call:

```
select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__browser_batch,mcp__claude-in-chrome__tabs_close_mcp
```

Call `tabs_context_mcp` with `createIfEmpty: true`, work in that tab, and close it at the
end. If the extension is not connected, stop and say so rather than skipping RealGM — a pass
without it will report basketball as "nothing found" when the answer was one page away.
On3's domain is **not permitted** in the extension either; its data reaches you only through
search snippets, so do not spend a turn on it.

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
classes, levels), `funnel[]` counts, `sportBars[]`, the two Compare values and their
`quals.<slug>.text`, and the existing provenance file
`source-material/sports/<slug>/<School> - Sports - College Commitments 2024-2026.md`. The
report in step 5 is a diff against this.

## Step 2 — Pull the rosters

Scope is the school's **six highest-profile recruiting sports** — football, boys basketball,
girls basketball, baseball, soccer (both) and volleyball — plus any sport that already holds
one of the school's Power 4 commits (swimming, for Cannon). Give the other sports one
OR-search each and say in the record that they got no roster pass.

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
current one for each target sport. Some sports 404 for every season (Cannon's girls soccer):
record that as **unchecked**, not as a null. Football may live under a second MaxPreps
school slug (Cannon's is `cannon-cannon-concord-academy-cougars`); search "MaxPreps <school>
football roster" to find it.

From each roster, list the seniors (`Sr.`) by season — those are the graduating classes in
the 2024–26 window — and the current seniors, who are the verbal-commitment candidates.

## Step 3 — Cross-reference every senior

Work sport by sport, in this order of sources; stop at the first confirmation and record it.

| Sport | Best first source | Then |
|---|---|---|
| Basketball (both) | **RealGM school page** in Chrome: `basketball.realgm.com/highschool/teams/<id>/<School>` — HS grad year and College column for every player it knows | the college's roster page; Prep Girls Hoops player pages (girls; show "Committed"); Phenom Hoop Report |
| Football | **NC Football News commitment tracker** per class (`/2026-north-carolina-high-school-football-college-commits/`, `/2027-…`; the 2024 and 2025 slugs differ — search) | 247Sports player page via WebFetch (rating, Composite ranks, "Hard Commit"); the college's roster page |
| Volleyball | **PrepVolleyball school page** (`/high-school-volleyball-details/women/<school>/hsid-<id>`) lists every commitment it tracks | the college's season preview or roster |
| Soccer | TopDrawerSoccer team profile (user-submitted — a commitment there is a lead) | the college's roster |
| Baseball / softball | Perfect Game and Prep Baseball Report via search | the college's roster |
| Swimming | SwimSwam and Swimming World via search ("<name> commits"); the Charlotte Observer's preseason swimming preview names verbals | the college's roster |
| Any | Grouped OR-searches of 4–6 names + "commit OR roster OR college" | the Charlotte Observer preseason previews (via Yahoo), which list "committed to …" for basketball and swimming |

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
  `'Football'`, `'Volleyball'`, `'Swimming'`, `'Track & Field'`, `'Girls Lacrosse'`. A sport
  that no source publishes stays `'Not published'`.

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

## Step 7 — Hand off to `/plan`

Invoke `/plan` with the name `<slug>commits` and a brief that mirrors
`.claude/plans/cannoncommits.md`: the per-athlete verification table, the exact roster
rows in the card's conventions (classes newest-signed first, verbals last; P4 → D1 → D2 →
D3 within a class), the funnel counts and widths, the sport bars, the five prose fields to
rewrite (`headline`, `subhead`, `funnelNote`, `realityCheck`, `rosterNote` — never say what
was searched or could not be found; say what the school does or does not publish), the
`sources[]` additions, the two Compare values and the shared `quals` text, the `metrics.ts`
rule if needed, and the Phase 2 unit forecast (five `sports` prose units plus one
`metric-values` unit per locale; new roster rows attach to existing identifier units; roster
indexes shift, so the splice matches by stamp, never by path). Two-phase, as every card
change with prose is. Say whether the UX gate applies (no `pipeline` card today → yes).
