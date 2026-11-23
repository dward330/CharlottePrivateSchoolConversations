---
name: scangroups
title: Split the consistency self-scan's sweep into eight school groups, so a rescan finishes sooner
status: in-progress
phases: 1
created: 2026-11-23
branch: docs/scangroups
prs: []
---

# Eight sweep groups for /consistency-self-scan

## Goal

A consistency scan's sweep takes as long as its slowest agent. Today that agent holds three
large school pages (about 560 KB of page text), while Latin's agent holds one (175 KB). This plan
rebalances the sweep from four groups to eight, so the largest group shrinks to about 342 KB, and
it raises the skill's agent cap from four to eight. The five largest pages (Providence Day, Country
Day, Latin, Cannon, Charlotte Christian) each get their own agent. Done means the skill, its sweep brief and
`.claude/SKILLS.md` all describe eight groups, and the next `/consistency-self-scan` run spawns eight
sweeps that cover all 13 schools.

**Single-phase. It adds no user-facing text:** the change touches only skill documents under
`.claude/`.

## Context

- **The skill:** [`.claude/skills/consistency-self-scan/SKILL.md`](../skills/consistency-self-scan/SKILL.md).
  The relevant passages:
  - **Step 0** (~L92–93): "Tell the user in one line what will run: … and that the sweep fans out
    up to four agents and takes a while."
  - **Step 4** (~L146–159): the default groups table, "used in rounds 2 and 3", and "Stay at
    four agents or fewer."
  - **Step 5** (~L181–203) merges cross-school causes into `X` rows. With more groups, more of that
    pattern-spotting falls to the parent.
- **Today's four groups**, with page bytes from the round-7 dump of `main` at `2f824d05`
  (2026-11-23, `dump_pages.py` output in KB):

  | Group | Schools (KB) | Total |
  |---|---|---|
  | `pd-ccd-cannon` | providence-day 199, charlotte-country-day 191, cannon 170 | 560 |
  | `latin` | charlotte-latin 175 | 175 |
  | `cc-cchs-cov-carmel` | charlotte-christian 166, charlotte-catholic 151, covenant-day 109, carmel-christian 99 | 525 |
  | `dd-gd-hg-k8` | davidson-day 140, hickory-grove-christian 115, gaston-day 103, trinity-episcopal 89, charlotte-prep 59 | 506 |

  **All three multi-school groups are about the same size.** Splitting only two of them, as first
  suggested in the planning conversation, would leave `pd-ccd-cannon` at 560 KB as the pace-setter
  and save nothing. The plan rebalances all three instead.
- **Measured duration:** round 7's Latin sweep (175 KB, one school) took 570 s with 57 tool uses.
  Durations of the other three round-7 sweeps were not in hand when this plan was written.
- **The sweep brief:** [`.claude/skills/consistency-self-scan/brief.md`](../skills/consistency-self-scan/brief.md).
  Its own text says "You are one of several parallel researchers" and fills `{{SCHOOLS}}`,
  `{{PREFIXES}}` and `{{OUTPUT}}` per agent, so it needs no change for the group count. **It has no
  student-name rule**, which CLAUDE.md's Student-name standard requires in "the brief of any agent
  that fetches or writes research". The round-7 parent had to add the rule to each agent's prompt
  by hand. Step 3 below closes that gap.
- **The register:** [`.claude/SKILLS.md`](../SKILLS.md), the `consistency-self-scan` section
  (~L650–700). Its "updated" line is ~L657, and its Step-4 row (~L681) reads "Up to four
  `general-purpose` sweep agents in parallel, one per school group".
- The ID prefixes (`PD`, `CCD`, `CAN`, `LAT`, `CC`, `CCHS`, `COV`, `CAR`, `DD`, `GD`, `HG`, `TRI`,
  `PREP`) are per school, not per group, so the earlier worklists keep matching.
- `dump_pages.py`, `review.md` and `settled.md` do not mention groups. No script reads the group
  names.

## Decisions

- **Eight groups, not thirteen.** One agent per school would multiply the fixed reading (brief,
  the prior worklists, `settled.md`, the prior plan) 13 times, and an agent that sees one school
  cannot notice a pattern across schools. Eight cuts the largest group from 560 KB to 342 KB, gives
  the five largest pages an agent each, and keeps two or three schools in the other three.
- **Providence Day, Country Day, Cannon and Charlotte Christian each get their own group** (user,
  2026-11-23). Earlier drafts paired them as `pd-ccd` (390 KB) and `cannon-cc` (336 KB).
- **The pace-setter is now `dd-gd-car` (342 KB).** Splitting Cannon from Charlotte Christian gives
  each a dedicated reader but does not shorten the scan, because `dd-gd-car` is larger than either
  pair was. A later round that wants more speed splits that group next.
- **The new table** (bytes from the 2026-11-23 dump):

  | Group | Schools | KB |
  |---|---|---|
  | `pd` | providence-day | 199 |
  | `ccd` | charlotte-country-day | 191 |
  | `latin` | charlotte-latin | 175 |
  | `cannon` | cannon | 170 |
  | `cc` | charlotte-christian | 166 |
  | `cchs-cov` | charlotte-catholic, covenant-day | 260 |
  | `dd-gd-car` | davidson-day, gaston-day, carmel-christian | 342 |
  | `hg-k8` | hickory-grove-christian, trinity-episcopal, charlotte-prep | 263 |

  Reasons: the five largest pages each have an agent. Latin has been alone in every round. The two K–8 schools stay together, because their shape (no College Support, no
  Compare rows) is a pattern of its own.
- **The table is a default, not a fixed list.** The existing rule stays: balance by the dump's
  byte counts, and add a new school to the smallest group. The cap becomes "eight agents or fewer".
- **Cross-school mitigation goes in Step 5.** Before merging X rows, the parent greps each new
  finding's class in the dumps of schools outside the group that raised it. That is the pattern
  detection a larger group used to provide for free. It matters most for the five one-school
  groups.
- **Record sweep durations.** `findings.md` lists each sweep's wall-clock time beside its group,
  so a later round can rebalance by measured time rather than bytes alone.
- **The student-name rule goes into `brief.md`** (step 3). It is not part of the speed change, but
  it is a hard rule missing from the same skill's agent brief. Drop step 3 if the user prefers it in
  a separate PR.

## Approvals needed

None. No UX, card, chrome or data change; skill documents only.

## Out of scope

| item | why |
|---|---|
| Running a scan with the new groups | The next round does that |
| `review.md` or `/implement` step 5b | Unaffected by sweep grouping. Another session's uncommitted plan `implreview` changes step 5b; do not touch it |
| The refused-host list in the agent prompts | Per-round, set in each round's plan |
| Any change under `src/` or `scripts/` | None needed |

## Steps

Single-phase. It adds no user-facing text.

0. **Branch.** `git fetch`, then `git switch -c docs/scangroups origin/main`. The working tree is
   shared: never stash. `.claude/plans/INDEX.md` may hold other sessions' uncommitted rows
   (`allcommits`, `implreview`). Commit only this plan's row: build the staged copy from HEAD's
   file plus this row, via `git hash-object -w` and `git update-index --cacheinfo`, as
   `consistency6` step 0 records. Never commit `allcommits.md` or `implreview.md`.

1. **`SKILL.md`, Step 4.**
   - Replace the default-groups table with the eight-row table from Decisions, adding a KB column
     headed "(2026-11-23 dump)".
   - Change "The default, used in rounds 2 and 3:" to "The default since round 8 (plan
     `scangroups`), balanced on the 2026-11-23 dump. Rounds 2–7 used four groups (`pd-ccd-cannon`,
     `latin`, `cc-cchs-cov-carmel`, `dd-gd-hg-k8`)."
   - Replace "Stay at four agents or fewer." with "Stay at eight agents or fewer. One agent per school
     costs 13 times the fixed reading and loses cross-school patterns."
   - Change the output-file example `rescan4-latin.md` only if it reads wrong. It does not name a
     split group, so it can stay.

2. **`SKILL.md`, Steps 0 and 5.**
   - Step 0 (~L93): "fans out up to four agents" → "fans out up to eight agents".
   - Step 5: insert a new item between 2 and 3: "**2a. Look across groups.** For each new finding,
     grep its class (the phrase or value shape) in the dumps of schools outside the group that
     raised it. A match is either an X row or a new finding at that school. Eight groups see fewer
     schools each, and five see only one, so this is the parent's job."
   - Step 5, item 4, `findings.md` contents: add "each sweep's wall-clock time beside its group".

3. **`brief.md`, Hard rules.** Add a bullet near the top of `## Hard rules`, written as CLAUDE.md's
   Student-name standard states it:
   - **⛔ Never expose the name of a student who is not an athlete**, in anything you write: the
     output file, any source-material append, any command output you quote.
   - Only athletes may be named, and only for athletics. Staff and adults stay named.
   - From a source that may hold names, report counts, never the matched text. Never print a diff
     of a regenerated content chunk. Write `[name withheld]` in a research record where a name is
     taken out.

   Do not repeat any actual name in the brief, the plan, the commit or the PR.

4. **`.claude/SKILLS.md`, the `consistency-self-scan` section.**
   - The Step-4 row (~L681): "Up to four" → "Up to eight", adding "(eight school groups since plan
     `scangroups`)".
   - The Step-5 row: add "checks each new finding's class at schools outside the group that raised
     it, and records each sweep's time".
   - The "updated" line (~L657): prepend "2026-11-23 (eight sweep groups, the brief's student-name
     rule, plan scangroups);". Keep the earlier entries.

5. **Self-check.** `grep -n -i "four agents\|up to four\|four groups" .claude/skills/consistency-self-scan/*.md .claude/SKILLS.md`
   should return nothing except the historical sentence in step 1. Confirm the eight groups name
   every slug in `src/data/schools.json` exactly once:
   `node -e "const s=require('./src/data/schools.json'); console.log((s.schools??s).map(x=>x.slug??x.id).sort().join(' '))"`
   (adapt the accessor to the file's shape, then compare with the table's 13 slugs).

6. **Commit, PR, merge.** Stage the three files and this plan's INDEX row by explicit path. PR body
   via `--body-file`. Squash-merge with `--delete-branch`, then check out `main` and pull. Set this
   plan to `implemented`, with `prs`, and its INDEX row to Implemented with the PR link. No deploy:
   nothing here ships to the site.

## Files touched

| File | Change |
|---|---|
| `.claude/skills/consistency-self-scan/SKILL.md` | Eight-group table, cap of eight, the Step 0 line, Step 5 item 2a and sweep times |
| `.claude/skills/consistency-self-scan/brief.md` | Student-name rule in Hard rules |
| `.claude/SKILLS.md` | Step-4 and Step-5 rows, updated line |
| `.claude/plans/scangroups.md`, `.claude/plans/INDEX.md` | Status and PR link |

## Verification

- [ ] Step 5's grep finds no stale "four", apart from the historical sentence.
- [ ] The eight-group table covers all 13 slugs in `src/data/schools.json`, each exactly once.
- [ ] `brief.md` carries the student-name rule. `git diff` adds no person's name anywhere.
- [ ] `git status --short` before committing shows only the files above. `allcommits.md` and
      `implreview.md` are not staged.
- [ ] No `npm run build` needed (no app file changes). Running `npm run check:schema` and
      `check:spelling` is harmless and should exit 0.
