---
name: allcommits
title: "College commits (all levels)" Compare row, counted-means-listed (dance/cheer listed as Other), JUCO tag, plain floor wording, /athlete-commits maintains it
status: english-done
phases: 2
created: 2026-11-22
branch: feat/allcommits
prs: []
---

# "College commits (all levels)" on Compare, and "Documented minimum" retired

## Goal

Compare › Sports gains a fourth commit row, **College commits (all levels)**, directly under
*Division I commits*. It shows every documented college-athletics commitment in the Classes
of 2024–2026, the same total each school's College Pipeline funnel already shows. Smaller
and Division III-heavy programs (Charlotte Latin, Covenant Day) can then be seen next to
the Division I-heavy ones. The researcher phrase "Documented minimum" is retired from every
commit row, cell tip and pipeline card. It is replaced by a plain sentence a parent
understands: **"Not every school publishes a full signing list, so the real count may be
higher."** `/athlete-commits` learns to maintain the new row, and `check:consistency` gates
it against the roster.

**A new rule for every school, the user's 2026-11-22: if an athlete is counted, they are
listed.** Today Charlotte Latin (3 dance/cheer signees) and Charlotte Country Day (1 cheer
signee) count athletes in their funnel total who are not on the card's roster, through
`offRosterCommits`. Those four go onto the roster with a new level tag, **Other**, for
commitments outside the NCAA divisions and NAIA. `offRosterCommits` is then deleted from the
type, so the rule cannot be broken again.

Done means: the row renders in the right place with the right 11 values, `check:consistency`
fails if any value drifts from the roster, no parent-facing commit text says "documented
minimum", every counted athlete is a roster row on the card, and all ten languages match
after Phase 2.

## Revised 2026-11-22, after consistency4 merged (user: "you can update the allcommits plan")

**Build this after plan `consistency5` merges.** It is written against that tree. What changed:

- **No USCAA level, tag, note or tip.** The premise was false. Johnson & Wales Charlotte's own
  2026–27 pages name the Coast-To-Coast Athletic Conference and NCAA Division III, and never the
  USCAA (saved in Gaston Day's 2024-2026 commitments record). `consistency5` makes that row
  C2C / D3 and rewrites its note (CAR-U6). This plan does not touch it.
- **Notre Dame stays Power 4** (user, settled S8). The P4 row note keeps "or to Notre Dame", and
  Charlotte Christian's P4 tip keeps its Notre Dame sentence, so it is no longer shared with D1.
- **Davidson Day's tip keeps `consistency5`'s DD-U6 fix.**
- **The floor is 33/45 (73%) since consistency4,** so this row should make it 34/46.
- **`consistency5`'s R12 check must skip `Other` rows** (step 7).
- **Every quoted "before" string is a snapshot.** Edit from the live text, change only the floor
  wording, and keep any fact a later plan put there. If a draft below would drop one, the live
  fact wins.

## Context

### The data already exists

- `src/lib/pipeline.ts` → `pipelineCounts(p).all` is `windowRows(p).length +
  (p.offRosterCommits ?? 0)`: every Class of 2024–26 roster row at any level, plus
  commitments the card counts but does not list. This is the number the funnel's first
  stage and each card's headline already show ("63 college commitments across 2024–26 …").
- Computed on 2026-11-22 from `main`'s data (all / NCAA D I–III / D1 / P4):

  | Slug | all | NCAA | D1 | P4 |
  |---|---|---|---|---|
  | cannon | 23 | 23 | 12 | 4 |
  | carmel-christian | 20 | 19 | 6 | 1 |
  | charlotte-catholic | 54 | 54 | 39 | 15 |
  | charlotte-christian | 48 | 48 | 35 (36 after consistency5) | 11 |
  | charlotte-country-day | 48 | 47 | 28 | 9 |
  | charlotte-latin | 63 | 60 | 22 | 8 |
  | covenant-day | 35 | 32 | 10 | 1 |
  | davidson-day | 21 | 21 | 13 | 5 |
  | gaston-day | 3 | 3 | 2 | 1 |
  | hickory-grove-christian | 7 | 7 | 4 | 0 |
  | providence-day | 86 | 86 | 39 | 16 |

  "NCAA" here counts roster `level` in P4/D1/D2/D3. Re-derive at build time rather than
  trusting this table: a commits refresh may land first (see step 1).
- **What "all levels" actually contains.** `CommitLevel` is `'P4' | 'D1' | 'D2' | 'D3' |
  'NAIA'` (`src/data/sportsProgram.ts` ~L182). There is no junior-college level, so those rows
  are filed under `D3` today, with the real body in `conf`. **This plan gives them their own
  tag, `JUCO` (step 1d):**
  - **NAIA (4):** Carmel — James Wood ’26 (WVU Tech); Covenant Day — Brode Dixon ’25 (Asbury),
    Lydia Johnson ’25 and Millie Jones ’25 (Taylor).
  - **Junior college, `conf: 'NJCAA'` (5):** Cannon — Evan Ingram ’25 (Davidson-Davie CC);
    Covenant Day — Isaac Snapp ’25, Jalen Boyd ’26, Matthew Dorsey ’26; Hickory Grove — Colby
    Vanhook ’24 (Gaston College).
  - **Off-roster (`offRosterCommits`), confirmed during planning:** Charlotte Latin **3**:
    Class of 2025 college dance and cheer signees (Belton, Kim: dance; Bradley: cheer — see
    `rosterNote` ~L343 and the Latin source file ~L123). Charlotte Country Day **1**: a college
    cheer signee (Blount; `funnelNote` ~L246 and the CCD source file ~L122). Both cards already
    say so in parent-facing prose, but neither names them. **This plan lists them** (step 1b):
    - Latin, Class of 2025: Maya Belton (Dance, College of Charleston), Cordelia Kim (Dance,
      Rutgers), Zoe Bradley (Cheer, Tulane). Source: `source-material/sports/charlotte-latin/
      Charlotte Latin - Sports - College Commitments 2024-2026.md` ~L123–125, "Apr 2025 post"
      (the school's own signing post).
    - CCD, Class of 2024: Kendall Blount (Cheer, Louisville). Source: `CCD - Sports - College
      Commitments 2024-2026.md` ~L122–129 (school list; May 2024 signing post). That paragraph
      records a **user decision of 2026-11-08 that she is "not a roster row"**, which the user
      reversed on 2026-11-22 (this plan).
    All four may be named under the Student-name standard, for athletics only: each is named
    for a college team in a sport the school fields at varsity (Latin: Dance Team and
    Cheerleading; Country Day: Cheerleading, all on Sports Offered). Having graduated is not
    the reason: a student is still a student after graduating. Never attach an arts or academic
    fact to these names. No
    fetch is needed: the school's own signing post is already cited.

  So the row's sub-heading must name junior colleges as well as NCAA and NAIA. An
  NCAA-plus-NAIA-only description would be untrue for Cannon, Covenant Day and Hickory
  Grove.

### The three existing commit rows

`src/data/metricValues.ts`, `VALUE_METRICS`, in this order (line numbers as of `6e148c22`, since moved by consistency4: find by key):

- `p4-commits-2426` (~L2318): label *Power 4 commits*, a note ending "Documented minimum.",
  and 7 `quals` of `kind: 'minimum'`.
- `d1-commits-2426` (~L2368): *Division I commits*, a note ending "Documented minimum.",
  8 `quals`.
- `seniors-committed` (~L2429): *Current seniors committed*, a note containing "Documented
  minimum as of the most recent sweep". Its 11 quals all point at the shared
  `SENIORS_QUAL` constant (~L168), which contains "a documented minimum".

The block comment above `p4-commits-2426` (~L2296) explains the nesting and says "DOCUMENTED
MINIMUMS". It is a code comment and may keep that wording, but extend it to say the new row
is the superset (P4 ⊆ D1 ⊆ all).

The new row goes **between `d1-commits-2426` and `seniors-committed`**. `seniors-committed`
itself was inserted mid-array the same way (plan `seniorsrow`, its comment at ~L2410), so
the mechanics are known: overlay paths in `metric-values` carry the array index, and every
later row's translations strand until the nine work files are re-spliced by stamp (memory
`metric-values-midarray-insert-shifts-paths`).

### The "Documented minimum" tip heading is shared

`CellQual.tsx:36` renders `t(\`compare.qual.${qual.kind}\`)` as the uppercase heading of every
cell tip. `compare.qual.minimum` is `"Documented minimum"` (`src/locales/en.json` ~L154).
`kind: 'minimum'` is used by **seven** rows: the three commit rows plus `bucket-nu75`,
`bucket-lac75`, `ensembles` and `us-organizations`. The signing-list sentence would be false
on those four, so the heading becomes the generic **"At least"**, which is true on all seven.
The tip bodies of those four rows are **not** edited. Three `us-organizations` bodies say
"documented floor", which is out of scope (see Out of scope).

### Pipeline card prose that says it

Four `src/data/sportsPrograms/<slug>.ts` fields (sports overlay topic):

- `covenant-day.ts` ~L214 `funnelNote`: "These are documented minimums. They come from …"
- `charlotte-catholic.ts` ~L262 `funnelNote`: "… The three classes below are a documented
  minimum. CCHS holds separate fall, winter and spring signing days and publishes no
  combined list. So athletes appear here once a signing article …"
- `hickory-grove-christian.ts` ~L218 `realityCheck`: "… The school publishes no all-sport
  signing list, so the count is a documented minimum."
- `gaston-day.ts` ~L274 `realityCheck`: "… The school publishes no signing list or
  signing-day announcements, so the count is a documented minimum. …"

`src/content/sports/*.json` also contains the phrase. That is generated from
`source-material/` research records, which the plain-language standard excludes, and it does
not render on school pages (memory `prosecontent-unreachable-on-school-pages`). Leave it.

### The gate

`scripts/check_consistency.mjs` R1b (~L201) loops over
`[['p4-commits-2426','p4'], ['d1-commits-2426','d1'], ['seniors-committed','seniors']]` and
compares each cell's leading integer with `pipelineCounts`. `counts.all` is already
computed. The doc comment at the top (~L19) lists R1b's keys. Note `if (v == null)
continue`: a school with a pipeline but no cell is silently skipped. The new row has a
value for all 11 schools, so this is fine; do not change the null rule.

### /athlete-commits

`.claude/skills/athlete-commits/SKILL.md` (338 lines) names the Compare rows it maintains in
five places, and it is already stale: the description and ~L32 still say "two Compare commit
rows", though it maintains three since `seniorsrow`.

- the front-matter `description` ("its two Compare commit rows");
- ~L31–34 (intro: "the Compare rows `p4-commits-2426` and `d1-commits-2426` are typed in …");
- ~L113–115 (step 1's read list: "the three Compare values (…)");
- ~L121–131 (the window check: "rename both keys (`2426` → `2527`)");
- step 5 ~L287 ("the two Compare values before → after");
- step 7 ~L330–337 (the handoff brief: "the three Compare values — the two window rows and
  `seniors-committed`", and the Phase 2 unit forecast).

It has no guidance on cell-tip wording beyond step 7's "never say what was searched or could
not be found; say what the school does or does not publish". `.claude/SKILLS.md` has its row
at ~L32 and its section at ~L553.

### Coverage floor

`npm run coverage:floor` prints **Davidson Day 33/45 (73%)** since consistency4, and CLAUDE.md
and `.claude/skills/add-school/SKILL.md` say the same. Davidson Day has a value on the new row,
so it should become 34/46, but **write whatever the script prints**.
The row is not floor-excluded (only `international-travel` and the three Cup keys are).

### Claude Design

The project is **Charlotte School Compare Website Design**
(`5da24575-40bf-4787-8934-0fadfc56059f`). `.claude/docs/design-sync.md` holds the capture →
write → `design:verify` loop and each file's capture command. The only Compare capture,
`Compare Schools.dc.html` (+ `(2 of 2)`), is the **College Support** view. **No file shows
Compare › Sports.** `Sports Compare Matrix.dc.html` is a decision record and stays untouched.
The memory note `claude-design-write-path` has the write traps (`finalize_plan` with
`scope: "project"`, inline data, `design:verify` strips the injected run).

## Decisions

- **Key `all-commits-2426`, label `College commits (all levels)`.** The key follows the
  window suffix of its siblings, so it rolls with them. The label is the one the user chose
  (2026-11-22).
- **Value = `pipelineCounts().all`, not an NCAA-only count.** It matches each card's funnel
  and headline exactly. An NCAA-only row would disagree with four school pages (Latin 60 vs
  63, Covenant 32 vs 35, CCD 47 vs 48, Carmel 19 vs 20): the self-contradiction
  `check:consistency` exists to stop. User's choice, 2026-11-22.
- **Sub-heading (the row `note`), no row-header tooltip.** The siblings explain themselves
  in `note`; only the Cup rows have a header tip. User's choice.
- **The sub-heading names junior colleges.** The user's brief said "D1–DIII + NAIA". The
  data has 5 junior-college rows inside "all", so naming only NCAA and NAIA would be untrue for
  three schools. "At any level" covers the dance/cheer signees. The list is introduced with
  **"That includes"**, never "That covers": "covers" reads as complete and would be untrue for
  Latin and CCD (dance/cheer). User agreed 2026-11-22. The full sub-heading is in step 2.
- **The sub-heading points readers to the names (user, 2026-11-22).** A reader who counts the
  card's roster under "All" gets a different number at 6 of 11 schools. The roster also lists
  Class of 2027 verbals (Cannon +6, Catholic +5, Charlotte Christian +1, Gaston Day +1,
  Providence Day +10, Latin +1). So the note says the names are on the College Pipeline card,
  which also lists current seniors' commitments that are not counted. Once step 1b lists the
  four dance/cheer signees, every school's roster minus its '27 rows equals the Compare value
  exactly. Making the roster itself match (a "Classes of 2024–26" tab or a split counter) is a
  separate UX change and out of scope.
- **Counted means listed, at every school (user, 2026-11-22). A standing rule.** Every
  commitment in a funnel total is a roster row, so a parent can count the names. The
  scholarship question is not the test: Division III gives no athletic scholarships, and its
  athletes are listed. It reverses the 2026-11-08 decision that CCD's cheer signee is "not a
  roster row". Enforced by deleting `offRosterCommits` from `CollegePipeline`, so there is
  no longer any way to count someone without listing them. Written into `/athlete-commits`.
- **A new `CommitLevel`, `'Other'`, for a college team in a sport outside the college
  athletics divisions (today: dance and cheer).** The four rows cannot honestly be P4/D1
  (Louisville is ACC, but cheer is not an NCAA sport), D3 or NAIA. "Other" was chosen over
  "Spirit" or "Cheer/Dance" because the new rule will apply to any future non-division
  athlete. The level tag renders the raw code, and the `level` field is skipped by the i18n
  extractor as a code (`i18n_fields.mjs` ~L202, "recruiting tier code"). A word would
  therefore render English in nine locales: the "sentence wearing an identifier's clothes"
  leak. So the data keeps the code `'Other'`, and the tag renders it through a chrome key,
  `cardLabels.levelOther`. Flag the label at the English review. Junior-college rows
  are not Other: they play in a college athletics association, so they get their own tag
  (next decision).
- **One more level, `'JUCO'` (user, 2026-11-22).** The 5 junior-college rows stop being filed
  as `D3`, and the three list notes stop apologising for it ("listed at the D3 level, because
  this table has no NJCAA level"). **JUCO over NJCAA:** JUCO is the word parents, coaches and
  recruiting coverage use, and `conf` already says NJCAA. So every tag answers one question:
  what association does this team play in? Other is only for teams outside any association.
  JUCO is a name, shown as-is in every locale like NAIA, so it needs no chrome key. Each
  school's `rosterNote` explains it once, in translated prose. Order within a class: P4 → D1 →
  D2 → D3 → NAIA → JUCO → Other. It does not count in D1/P4 or the sport bars, and no total
  moves. The USCAA level first approved with it was withdrawn the same day (see Revised).
- **Other rows are in "All" only.** The D1 and P4 filter tabs exclude them already
  (`SportsProgram.tsx` ~L841). They are never in the D1 or P4 counts or the sport bars
  (`pipeline.ts` `isD1` / `isP4`), so only `all` sees them, as today.
- **Replacement wording, user-chosen 2026-11-22, amended the same day:** row notes end with
  **"Not every school publishes a full signing list, so the real count may be higher."** The
  first draft said "Most schools publish no full signing list". That is not true: Providence
  Day, Country Day, Latin and Covenant Day publish full lists, and Carmel and Davidson Day
  (2025–26) publish part of one. So "most" overstated it, and the user approved "Not every
  school". The same sentence closes all four commit-row notes. A per-school cell tip
  names the school instead ("Cannon publishes no signing list, so the real count may be
  higher.") or, where the school's own publishing is already described, ends "The real count
  may be higher." Never "documented minimum", "documented", "confirmed on", "sweep" or other
  research bookkeeping (CLAUDE.md, "Research bookkeeping is dev-only").
- **Tip heading `compare.qual.minimum` → "At least".** It is shared with four non-sports rows
  where the signing-list sentence would be false. The key name stays `minimum`, so no data
  changes.
- **The four non-sports `kind: 'minimum'` rows keep their bodies.** Only their heading
  changes.
- **No tips on the new row.** The note already carries the floor sentence and names junior
  college and NAIA. Latin's and CCD's dance/cheer signees are listed on their cards with the
  Other tag (user, 2026-11-22), and Gaston Day's one planned tip rested on the withdrawn USCAA
  claim.
- **Rewrite, never find-and-replace.** Many tips go on with school detail after the phrase,
  so each one is edited as a sentence. The drafts are in step 4.
- **Two source-material notes, one-topic ingest.** The new row's value needs no research
  edit. It is derived from roster rows that each school's `… College Commitments
  2024-2026.md` already tables row by row, and R1b enforces it. But the Latin and CCD files
  say their dance/cheer signees are "total only" and (CCD) "not a roster row". The next
  `/athlete-commits` run diffs against these files, so each gets a dated superseded note
  (step 1c), and `/implement` runs the ingest for the `sports` topic. `src/content/sports/*`
  is not in the content overlay (`i18n_extract_content.mjs` `LIVE` holds only
  financial-aid-tuition and student-clubs), so the ingest creates no translation work.
- **Guard against reintroduction twice:** a `documented minimum` term in
  `scripts/plain_language.json` (the hook then flags it in any edited in-scope text), and a
  wording rule in `/athlete-commits`.
- **Fix the skill's stale "two rows" while there.** It is the same text being edited.

## Approvals needed

- **UX change: approved.** The new Compare row was approved by the user in the planning
  conversation on **2026-11-22**: the label, its place under *Division I commits*, the
  sub-heading-not-tooltip choice and the "At least" heading follow from that discussion.
  The heading change was raised as a consequence of the shared kind; the plan proceeds on
  it and flags it at the English review.
- **UX change: approved.** Listing the four dance/cheer signees with a new level tag on the
  College Pipeline roster, and the counted-means-listed rule, were approved by the user on
  **2026-11-22**. The tag's word ("Other") is the plan's choice and is flagged at the review.
  The user also approved, the same day, relabelling the junior-college rows with a new
  **JUCO** tag (label chosen with the user). A USCAA tag approved with it was withdrawn when
  the user had this plan updated: no athlete is at a USCAA college.
- **Claude Design must be connected** (step 0b). If `list_projects` fails, stop and ask the
  user to reconnect (`/design-login`). Never use an Artifact canvas.
- No deploy. Merging is pre-authorized; `npm run deploy` is the user's separate call.

## Out of scope

- An NCAA-only or per-division (D2, D3) row.
- "Documented floor" in `us-organizations` tips, and every other non-commit use of
  "documented". Raise it with the user afterwards as a possible follow-up.
- Row-header tooltips on any commit row.
- Making the College Pipeline roster's count match Compare directly (a "Classes of 2024–26"
  filter or a split "N of M" counter). That is a UX change for its own plan.
- `source-material/**` beyond the superseded notes in steps 1c and 1d. Hand edits to
  `src/content/**` (the ingest regenerates it).
- Rolling the 2024–26 window.
- Registering the pipeline in `scripts/data_dependents.json`. Worth a follow-up: the roster
  now feeds four Compare rows.

## Steps

### Phase 1 — English

0. **Branch and commit the plan.** First confirm `consistency5` is merged
   (`grep -n "conf: 'USCAA'" src/data/sportsPrograms/*.ts` returns nothing). If it is not, stop
   and tell the user. Then, from an up-to-date `main`:
   `git checkout -b feat/allcommits`. Stage `.claude/plans/allcommits.md` and the INDEX row by
   explicit path (never `git add -A`, never `git stash`; another session may share the tree).
   If `INDEX.md` has other sessions' edits, stage only this row (the `cannoncommits2` trick:
   `git hash-object -w` a copy with just this change, then `git update-index --cacheinfo`).
   Commit: "allcommits: plan".

0b. **Claude Design gate, then design the row.**
   - Call the Claude Design MCP's `list_projects`. If it fails or the tools are missing,
     **stop and ask the user to reconnect Claude Design** (`/design-login`). No fallback.
   - Read `.claude/docs/design-sync.md` and memory `claude-design-write-path`.
   - `npm run build && npx vite preview`, then capture today's Compare › Sports as a **new**
     file:
     `npm run design:capture -- '--page' '/compare/?topic=sports&schools=cannon%2Ccarmel-christian%2Ccharlotte-catholic%2Ccharlotte-christian%2Ccharlotte-country-day%2Ccharlotte-latin%2Ccovenant-day%2Cdavidson-day%2Cgaston-day%2Chickory-grove-christian%2Cprovidence-day' '--name' 'Compare Schools — Sports' '--out' <out> '--refs' 'every high school, Sports' '--sha' <HEAD> '--interactive' 'row tips and the leader tint'`.
   - Edit the captured file to show the change: the new row between *Division I commits*
     and *Current seniors committed*, with label, sub-heading and the 11 values from the
     Context table (leader tint on Providence Day's 86). Show the three reworded sub-headings.
     Add a small static mock of one open tip with the **AT LEAST** heading (popovers are
     dropped by the capture).
   - **The Other tag:** in `Sports Section Redesign.dc.html` (Providence Day's sports
     section, which has no Other row), add a mock College Pipeline roster row showing a cheer
     signee with the **Other** level tag (`tag-neutral`, like D2/D3/NAIA), with a one-line
     annotation: "Other = a college team in a sport outside the college athletics divisions
     (dance, cheer). Counted in All; never in D1/P4." Beside it, mock a **JUCO** row (a
     junior-college signee, `conf` NJCAA), `tag-neutral`, with the
     note line "JUCO = junior college, a two-year college." 
   - Write it to the project (`write_files`, new path, etag `"0"`), then `design:verify`.
     Add its capture command under *Capture commands* in `.claude/docs/design-sync.md`.
   - Give the user the project link and say what changed. The approval is already given, so
     carry on. Their review comes at the English stop.

1. **Re-derive the values.** Run the Context's derivation (a throwaway script in the
   scratchpad importing `src/lib/pipeline.ts` under `node --experimental-strip-types`,
   iterating `src/data/sportsPrograms/*.ts`). If any `all` differs from the Context table,
   a commits refresh landed: use the live numbers, and re-check every count written
   inside a tip (Covenant Day's "35", Charlotte Catholic's "Fifteen", "Thirty-nine" and "54",
   Charlotte Christian's "eleven"). Step 1b does not change any `all` value: it moves 4
   athletes from `offRosterCommits` to roster rows.

1a. **The two new levels, JUCO and Other** (user, 2026-11-22):
   - `src/data/sportsProgram.ts` ~L182: `CommitLevel` becomes `'P4' | 'D1' | 'D2' | 'D3' |
     'NAIA' | 'JUCO' | 'Other'`. Doc comments: JUCO = "a junior (two-year) college, NJCAA"; Other = "a college
     team in a sport outside the college athletics divisions (dance, cheer)". Add: "Both
     count in the funnel's all stage only, never D1/P4."
   - `src/components/SportsProgram.tsx`: `LEVEL_TAG` (~L747) gains `JUCO` and
     `Other`, both `'tag-neutral'`
     (the `Record<CommitLevel, …>` makes `tsc -b` demand it). In `RosterRow` (~L800), render
     the tag text through a chrome key for non-acronym codes:
     `const LEVEL_LABEL: Partial<Record<CommitLevel, string>> = { Other: 'cardLabels.levelOther' }`
     and `{LEVEL_LABEL[row.level] ? t(LEVEL_LABEL[row.level]!) : row.level}`. Acronyms stay
     raw, as today. Check that `RosterRow` has `t` in scope; it is a plain function, so it
     may need `useTranslation()` or a prop.
   - `src/locales/en.json`: add `cardLabels.levelOther: "Other"` beside `cardLabels.filterAll`
     (~L718). Only `en` in Phase 1. `check:chrome` then reports it as awaiting translation
     (exit 0).
   - `scripts/i18n_fields.mjs` ~L202: extend the `level` skip reason to "recruiting tier code
     (P4, D1); a non-acronym code renders through `cardLabels.level<Code>`". The code `'Other'`
     still never reaches a work file.
   - `src/lib/pipeline.ts`: no logic change. `isD1` / `isP4` already exclude Other. Update the
     `all` doc comment (~L38) once 1c removes the off-roster term.

1b. **List the four signees** (rows in the card's conventions: within a class P4 → D1 → D2 →
   D3 → NAIA → JUCO → Other; `conf: '—'`, the D3 / non-conference convention):
   - `src/data/sportsPrograms/charlotte-latin.ts`, at the end of the `'25` block (after Logan
     Yee, ~L322):
     `{ cls: "'25", name: 'Maya Belton', sport: 'Dance', college: 'College of Charleston', conf: '—', level: 'Other' },`
     `{ cls: "'25", name: 'Cordelia Kim', sport: 'Dance', college: 'Rutgers', conf: '—', level: 'Other' },`
     `{ cls: "'25", name: 'Zoe Bradley', sport: 'Cheer', college: 'Tulane', conf: '—', level: 'Other' },`
   - `src/data/sportsPrograms/charlotte-country-day.ts`, at the end of the `'24` block (after
     Amare Bethel, ~L309):
     `{ cls: "'24", name: 'Kendall Blount', sport: 'Cheer', college: 'Louisville', conf: '—', level: 'Other' },`
   - Copy the spellings and colleges from the two source files cited in Context, not from
     this plan, if they differ.
   - Check the sport strings against the roster's sport vocabulary and the R2 rule ("no bar
     names a sport the roster never uses" only applies to bars, so new sports are fine).
     Check also whether `sport` values are extracted for translation; the convention is that
     roster sport chips stay English (memory `latincommits-shipped`).

1c. **Delete `offRosterCommits`:**
   - Remove `offRosterCommits: 3` (`charlotte-latin.ts` ~L243) and `offRosterCommits: 1`
     (`charlotte-country-day.ts` ~L227).
   - Remove the field and its doc comment from `CollegePipeline` (`src/data/sportsProgram.ts`
     ~L259–263). In `src/lib/pipeline.ts`, `all: rows.length` and the doc comment "Every
     documented commitment, 2024–26: every roster row in the window." (`tsc -b` finds any
     other reader; the grep in planning found none outside these files.)
   - Reword the card prose that says they are not listed:
     - Latin `rosterNote` (~L343): "Three Class of 2025 signees to college dance and cheer
       teams are counted in the funnel but not listed, because neither is an NCAA-sponsored
       sport." → "Other marks the three Class of 2025 signees to college dance and cheer
       teams. Neither is an NCAA sport, so they count in the funnel total but not in the
       Division I or Power 4 counts."
     - CCD `rosterNote` (~L312): append "Other marks a college cheer signee. Cheer is not an
       NCAA sport, so she counts in the funnel total but not in the Division I or Power 4
       counts."
     - The Latin `funnelNote` (~L262) and CCD `funnelNote` (~L246) sentences ("The count
       includes three signees to college dance and cheer teams, which sit outside the NCAA
       divisions shown here." / "The school’s count of 48 includes one signee in college
       cheer, …") stay true. Leave them.
   - **Source material:** add a dated note directly above each paragraph that says the signees
     are "total only" / "not a roster row": `Charlotte Latin - Sports - College Commitments
     2024-2026.md` (~L123 table and the provenance note ~L23) and `CCD - Sports - College
     Commitments 2024-2026.md` (~L122–129). Use this wording: "**Superseded 2026-11-22 (plan
     `allcommits`):** counted means listed. These signees are now roster rows with level
     `Other`; they are still outside the Division I and Power 4 counts." Then run the
     `ingest-source-material` skill for the `sports` topic. Diff `src/content/sports/` to
     confirm it changed only for these two schools. If `src/data/schools.json` comes back
     reordered, restore HEAD order (memory `two-topic-ingest-reorders-manifest`). Run the
     ingest once, after step 1d's notes are written too.

1d. **Relabel the junior-college rows** (user, 2026-11-22):
   - `level: 'D3'` → `'JUCO'` on the five `conf: 'NJCAA'` rows: Evan Ingram ’25
     (`cannon.ts` ~L268), Isaac Snapp ’25, Jalen Boyd ’26, Matthew Dorsey ’26
     (`covenant-day.ts` ~L253, 264, 265) and Colby Vanhook ’24 (`hickory-grove-christian.ts`
     ~L226). Keep `conf` as is. First run
     `grep -n "conf: 'NJCAA'" src/data/sportsPrograms/*.ts`, so a row added since planning is
     not missed. Gaston Day's Johnson & Wales row stays D3.
   - Move each relabelled row to its place in its class: after D3 and NAIA, per the order in
     Decisions.
   - Rewrite the sentence in each `rosterNote` that apologises for the D3 filing:
     - `cannon.ts` ~L308: "Evan Ingram’s junior college is listed at the D3 level, because
       this table has no NJCAA level." → "JUCO = junior college, a two-year college."
     - `covenant-day.ts` ~L268: "The three junior-college signees are listed at the D3 level,
       because this table has no NJCAA level." → "JUCO = junior college, a two-year college."
     - `hickory-grove-christian.ts` ~L229: "Colby Vanhook’s junior college is listed at the D3
       level, because this table has no NJCAA level." → "JUCO = junior college, a two-year
       college."
   - Planning checked that no card prose at these three schools counts Division III, so no
     figure moves. Re-check with `grep -n -i "division iii\|\bD3\b"` on the three files after
     the edit. The Compare all-levels values and every funnel are unchanged.
   - **Source material:** the same dated note as step 1c above each school's level table in
     `Cannon - Sports - College Commitments 2024-2026.md`, `Covenant Day School - Sports -
     College Commitments 2024-2026.md` and `Hickory Grove Christian - Sports - College
     Commitments 2024-2026.md`: "**Superseded 2026-11-22 (plan `allcommits`):** junior-college
     rows now carry level `JUCO` on the card, not `D3`." Then run the single `sports` ingest
     (step 1c).

2. **Add the row** in `src/data/metricValues.ts`, between `d1-commits-2426` and the
   `seniors-committed` comment block:

   ```ts
   // Sits directly under Division I by the user's request (2026-11-22, plan `allcommits`):
   // P4 ⊆ D1 ⊆ all. The value is pipelineCounts().all — every 2024–26 roster row at any level
   // (counted means listed: every athlete here is a name on the card) — so it equals each
   // card's funnel; check:consistency R1b gates it. Junior-college and dance/cheer
   // rows carry levels JUCO and Other. Inserting
   // mid-array shifts later overlay paths: re-splice in Phase 2.
   {
     topic: 'sports',
     key: 'all-commits-2426',
     label: 'College commits (all levels)',
     note: 'Distinct athletes committed to play a college sport at any level, Classes of 2024–2026. That includes NCAA Division I, II and III, the NAIA (a separate college sports association) and junior colleges. The Division I count above is part of this total. Names are on the school’s College Pipeline card, which also lists current seniors’ commitments that are not counted here. Not every school publishes a full signing list, so the real count may be higher.',
     values: { /* 11 slugs, values from step 1, one comment each naming what is beyond D1 */ },
   },
   ```

   Value comments: say what the non-D1 part is made of (e.g. Covenant `'35'`: "10 D1 · 3 NAIA
   (Dixon, Johnson, Jones) · 3 NJCAA (Snapp, Boyd, Dorsey) · rest D2/D3"). Add
   `'charlotte-prep': null` and `'trinity-episcopal': null` only if `seniors-committed` does
   and the type requires it. Mirror the sibling rows. Extend the block comment above
   `p4-commits-2426` to say the nesting is now P4 ⊆ D1 ⊆ all.

3. **Reword the three existing row notes** (`metricValues.ts`):
   - P4: `'Distinct athletes committed to an SEC / Big Ten / ACC / Big 12 program or to Notre Dame, Classes of 2024–2026. Not every school publishes a full signing list, so the real count may be higher.'`
   - D1: `'Distinct athletes committed to any NCAA Division I program, Classes of 2024–2026 (includes the Power 4 count above). Not every school publishes a full signing list, so the real count may be higher.'`
   - Seniors: `'Class of 2027 athletes with a public college-athletics commitment at any level, verbal until signed. They join the rows above when the class graduates. Not every school publishes a full signing list, so the real count may be higher.'`
     ("as of the most recent sweep" and "the window rolls" are bookkeeping and jargon. Keep
     the class year in the note: the window roll edits it.)
   - `SENIORS_QUAL` (~L168): `'Public commitments by the current senior class, counted at any level and verbal until signed. The count grows through the spring signing period, and not every school publishes a full signing list, so the real count may be higher. Names are on the school’s College Pipeline card.'`

4. **Rewrite the cell tips.** Keep `kind: 'minimum'` on all of them. Strings identical
   across the P4 and D1 rows must stay identical (they share one translation unit).

   **4a. Shared by P4 and D1:**
   - cannon: `'Cannon publishes no signing list, so the real count may be higher. Several of Cannon’s best-known athletes committed outside the Classes of 2024–2026 and are not counted here.'`
   - charlotte-latin: `'Charlotte Latin names every signee from its three yearly signing events. Its academically strong classes send many athletes to Division III.'` (Latin publishes every name, so no "may be higher" clause. The **At least** heading still frames it. See Open questions.)
   - davidson-day: `'Davidson Day published no signing list for the Class of 2024, which comes from college rosters. The Class of 2025 comes from the school’s seven-athlete signing list and college rosters, and the Class of 2026 from the school’s recap. The real count may be higher.'` (keep the facts as consistency5 shipped them)

   **4b. Per row:**
   - P4 charlotte-christian: `'The school’s public commitment list runs through 2025, so its Class of 2026 comes from college rosters and the school’s own announcements. The eleven include two Notre Dame football signees. The real count may be higher.'`
   - D1 charlotte-christian: `'The school’s public commitment list runs through 2025, so its Class of 2026 comes from college rosters and the school’s own announcements. The real count may be higher.'`
   - P4 charlotte-catholic: `'Fifteen Power Four commitments across the Classes of 2024-2026, named in the school’s signing articles, newspaper signing lists and the colleges’ own rosters. CCHS publishes no combined signing list, so the real count may be higher.'` (keep `2024-2026` char-for-char)
   - P4 covenant-day: `'Emily Eaton (’24) signed with Louisville field hockey, an ACC program, and started every game as a freshman. She is the one Power Four commitment among the 35 that the school’s signing posts and alumni lists name for 2024–2026. The real count may be higher.'`
   - P4 gaston-day: `'Anne Bradley Bing (’25) signed with South Carolina volleyball, an SEC program. Gaston Day publishes no signing list, so the real count may be higher.'`
   - D1 charlotte-catholic: `'Thirty-nine of the 54 athletes named for 2024–2026 went to Division I programs, and the Power Four count is part of that. CCHS publishes no combined signing list, so the real count may be higher.'` (drops "never found on a college roster are excluded", which is method)
   - D1 covenant-day: `'The school’s own signing posts and alumni lists name all ten: Eaton and Marcus (’24); Huitt, Dirks, Gardner, Stanley and Rivens (’25), Gardner at Appalachian State and Rivens in football at UNC Charlotte; Neil, Welsh and Houseton (’26). The real count may be higher.'`
   - D1 hickory-grove-christian: `'Three baseball and one football: Conner Barozzino (Appalachian State) and Jahzir Dukes (North Carolina Central, football) in the Class of 2024, and Davis Cabbage (UNC Wilmington) and Ben Green (UNC Asheville) in the Class of 2025. All four are mid-major Division I. The school publishes no all-sport signing list, so the real count may be higher.'`
   - D1 gaston-day: `'Both volleyball: Megan Brown (’24) at Wofford and Anne Bradley Bing (’25) at South Carolina. Gaston Day publishes no signing list, so the real count may be higher.'`

   **4c. New row (`all-commits-2426`): no tips** (see Decisions).

   The plain-language hook runs on each edit. Rewrite anything it flags rather than adding
   `plain-ok`.

5. **Reword the four card fields** (`src/data/sportsPrograms/`), changing only the
   floor sentence:
   - `covenant-day.ts` `funnelNote`: replace "These are documented minimums. They come from
     the school’s own signing posts, …" with "These counts come from the school’s own signing
     posts, …" and add before "The school’s cumulative claim …": "The real count may be
     higher."
   - `charlotte-catholic.ts` `funnelNote`: "The three classes below are a documented
     minimum." → delete; after "… publishes no combined list." the existing "So athletes
     appear here once …" carries the reason; append at the end "The real count may be
     higher."
   - `hickory-grove-christian.ts` `realityCheck`: "… signing list, so the count is a
     documented minimum." → "… signing list, so the real count may be higher."
   - `gaston-day.ts` `realityCheck`: "… signing-day announcements, so the count is a
     documented minimum." → "… signing-day announcements, so the real count may be higher."
   Then `grep -rn -i "documented minimum" src/data src/locales src/components src/pages
   src/lib` must return nothing (comments in `metricValues.ts` excepted).

6. **Tip heading** — `src/locales/en.json` `compare.qual.minimum`: `"Documented minimum"` →
   `"At least"`. Only `en` in Phase 1 (an English-first value change; the other nine
   catalogs keep the old translation until Phase 2. `check:chrome` cannot see a value
   change, so Phase 2 lists them explicitly).

7. **Gate the row** — `scripts/check_consistency.mjs`: add `['all-commits-2426', 'all']` to
   the R1b list (~L201) and the key to the R1b line of the header comment (~L19). Negative
   test (CLAUDE.md "A negative test must isolate its assertion"): set Latin's new cell to
   `'62'`, run `npm run check:consistency`, confirm the message is exactly the R1b line for
   `all-commits-2426` / `charlotte-latin` / 63, then restore and diff the file clean.
   **R12 (one college, one conference, from consistency5) must skip `level: 'Other'` rows:**
   cheer at Louisville is no conference while field hockey there is ACC. Skip by level, never
   by school or college, and negative-test that R12 still fails on a corrupted D1 row.

8. **Guard the phrase** — `scripts/plain_language.json` `terms`: add
   `{ "term": "documented minimum", "match": "documented minimums?", "plain": "say what the school publishes, then: so the real count may be higher" }`.
   Confirm `npm run check:plain` still exits 0 and that the hook flags a test edit
   containing the phrase.

9. **`/athlete-commits`** — `.claude/skills/athlete-commits/SKILL.md`:
   - `description`: "its two Compare commit rows" → "its four Compare commit rows".
   - Intro (~L31–34): name all four keys (`p4-commits-2426`, `d1-commits-2426`,
     `all-commits-2426`, `seniors-committed`). Say the new one equals the funnel's
     `pipelineCounts().all` (every window roster row), and that `check:consistency`
     R1b fails the build on any of the four that disagrees with the roster.
   - **New hard constraint, "Counted means listed"** (user, 2026-11-22), beside "Verbal
     commitments are listed, never counted in the window": every commitment a funnel total
     counts is a roster row with a name, at every school. A college team in a sport outside
     the college athletics divisions (dance, cheer) gets `level: 'Other'` and `conf: '—'`.
     It counts in the funnel's all stage and on the all-levels Compare row, never in D1/P4 or
     the sport bars. Whether the sport offers scholarships is not the test (Division III
     offers none and is listed). There is no off-roster count (`offRosterCommits` was
     removed); never add one back.
   - Step 4 classification (wherever it maps a college to a level): a junior college
     (NJCAA) is `JUCO`, and a college team outside any
     association (dance, cheer) is `Other`. Never file one as `D3`. Take a college's association from
     that college's own athletics site for the current season, never from RealGM or memory.
     Step 7's roster-row
     ordering: "P4 → D1 → D2 → D3 → NAIA → JUCO → Other within a class". Any
     `rosterNote` using JUCO explains it once ("JUCO = junior college, a two-year
     college.").
   - Step 1 read list (~L114): four Compare values.
   - Window check (~L125): "rename both keys" → "rename the three window keys (`…-2426` →
     `…-2527`) and their labels and notes".
   - Step 5 deltas (~L287): "the two Compare values" → "the three window Compare values
     (P4, D1, all levels) and `seniors-committed`, before → after".
   - Step 7 handoff (~L330–337): the four Compare values. The forecast becomes "one
     `metric-values` unit per changed qual string, plus the value-only cells, which carry by
     token substitution".
   - New short subsection under step 7, **Wording for row notes and cell tips**: never write
     "documented minimum" (the plain-language hook flags it). Say what the school publishes,
     then "so the real count may be higher", or "The real count may be higher." when the
     school's publishing is already described. A school that names every signee gets no
     "may be higher" clause. No research bookkeeping ("confirmed on", "sweep", "we found").
     Cite this plan.

10. **`.claude/SKILLS.md`** — update the `athlete-commits` row (~L32) and section (~L553):
    four Compare rows, the new key, the wording rule, counted-means-listed. Same PR (CLAUDE.md
    rule).

10b. **DATA-SCHEMA rule.** The schema doc is what `/add-school` reads first, and it is
    generated. In `scripts/gen_data_schema.mjs`, where the College Pipeline card is
    described, add: "Counted means listed: every commitment in the funnel is a roster row.
    Level `JUCO` = a junior college (NJCAA), `Other` = a college team outside any
    association (dance, cheer); both count in all only, never D1/P4; neither is ever filed as
    D3." `npm run schema` (step 12) regenerates it. The `CommitLevel` union and
    `CollegePipeline` fields update themselves. Check that `offRosterCommits?` is gone from
    the generated `CollegePipeline` line (~L365 today).

11. **Floor text** — run `npm run coverage:floor` and copy what it prints (expected Davidson
    Day 34/46) into:
    - CLAUDE.md "Adding a school": the floor figure and the inclusive example, plus a clause in
      the row-total history: "45 → 46 when the `all-commits-2426` row shipped, 2026-11-xx, plan
      `allcommits`".
    - `.claude/skills/add-school/SKILL.md` at every `33/45`, `32/45`, `45 Compare rows` and
      `≥33 of 45` (grep for them), and the same figures in `.claude/SKILLS.md`.
    The "~2.2 points per row" figures stay roughly right; update them only if the script's
    own line changes.

12. **Schema + checks** — `npm run schema`, then the Phase 1 verification below.

13. **Re-capture** the design file from the built app (`npm run build && npx vite preview`,
    the step 0b capture command with `--sha` = the build commit), write it over its etag,
    `design:verify`. Also re-capture `Sports Section Redesign.dc.html` with its command from
    `design-sync.md`, plus `--extra charlotte-latin:sports/<the Latin pipeline card's link
    name>` and `--extra covenant-day:sports/<its pipeline card>` (`npm run audit:cardlink --
    --list` prints both link names), so real Other, JUCO and NAIA rows ship in the file. This
    replaces the 0b mock rows. The project now shows what shipped, not the mock.

14. **Commit** explicit paths only (`git status --short` first): "allcommits Phase 1: College
    commits (all levels) row, plain floor wording, /athlete-commits maintains it (English)".
    Push, verify `git rev-parse HEAD` = `git ls-remote origin feat/allcommits`, open the PR
    with `--body-file`, and set the INDEX row to **English shipped**.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Point the user at
`/compare/?topic=sports&schools=…` (all 11) on the preview and the four pipeline cards.
Ask them specifically about: the sub-heading's "junior colleges" (it goes beyond their
"D1–DIII + NAIA"), Latin's tips with no "may be higher" clause, the "AT LEAST" heading
on the four non-sports rows, the **Other** tag on the four dance/cheer rows (Latin and
Country Day's College Pipeline cards), and the **JUCO** tag with its note
line (Cannon, Covenant Day, Hickory Grove).

### Phase 2 — Every other locale

Only after the user confirms the English. Mechanism:
`.claude/docs/prose-translation-architecture.md`; precedent: `seniorsrow` Implementation
notes (a mid-array row plus a `sports` splice) and `consistency2`'s Phase 2 (minimal edits
of reviewed `t`, one agent per locale in a private directory, central validation). Locales:
`PROSE_TRANSLATED` = es, bn, ht, te, fr, fa, it, hi, ar.

1. **Re-splice `metric-values`** for each of the nine:
   `node scripts/i18n_splice_work.mjs --lang <l> --topic metric-values`. The mid-array insert
   shifts every later row's path, so the splice matches by stamp. Expect new units: the new
   label and note; the 3 reworded notes and `SENIORS_QUAL`; and the
   reworded tip strings (3 shared + 9 per-row). Record the kept / added / dropped counts.
2. **Splice `sports`** for the four card fields and the five `rosterNote` edits (Latin
   reworded, CCD appended, and the Cannon, Covenant Day and Hickory Grove
   JUCO sentences): `--topic sports`. The new and moved roster rows shift roster
   indexes in five files, so the splice matches by stamp, never by path. Names, colleges, `conf` and
   `level` are skipped fields and add no units. Confirm whether the `sport` values `Dance`
   and `Cheer` come up as new units; by convention roster sport chips stay English.
3. **Translate the new and changed units.** Edit the reviewed `t` minimally where the change
   is one sentence (the four card fields and most tips). The floor sentence should read the
   same way within each locale on every row. Copy figures char-for-char (`2024–2026`,
   `2024-2026`, `’24`), keep the NCAA, NAIA, JUCO, SEC and ACC identifiers Latin, and follow
   the RTL isolate and lakh/crore rules from the rollout docs. The phrase "documented
   minimum" in a locale's old `t` must not survive in the new one.
4. **Chrome:** set `compare.qual.minimum` to the "At least" equivalent in all nine
   non-English catalogs: `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json`. It is short, and it
   renders as an uppercase tip kicker. Add `cardLabels.levelOther` (the Other tag) to the
   same nine. It sits in a narrow tag column beside "D3", so keep it to one short word.
5. **Build the overlays** (`node scripts/i18n_build_overlay.mjs` per locale and topic, as the
   precedent did) and run the Phase 2 verification.
6. **Commit, push, merge.** Set the INDEX row to **Implemented** with the PR link, add
   `## Implementation notes` here for anything that deviated, and record a memory entry.
   Then stop: "merged — ready to deploy whenever you want it". **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `src/data/metricValues.ts` | new `all-commits-2426` row; 3 notes, `SENIORS_QUAL`, 15 tips reworded |
| `src/data/sportsPrograms/{covenant-day,charlotte-catholic,hickory-grove-christian,gaston-day}.ts` | floor sentence reworded |
| `src/data/sportsPrograms/{charlotte-latin,charlotte-country-day}.ts` | 3 + 1 Other roster rows; `offRosterCommits` removed; `rosterNote` edits |
| `src/data/sportsProgram.ts` | `CommitLevel` gains `'JUCO'`, `'Other'`; `offRosterCommits` removed |
| `src/data/sportsPrograms/{cannon,covenant-day,hickory-grove-christian}.ts` | 5 rows → `JUCO`, reordered; `rosterNote` sentence rewritten |
| `src/lib/pipeline.ts` | `all` = window roster rows only |
| `src/components/SportsProgram.tsx` | `LEVEL_TAG.Other`; Other tag text through `cardLabels.levelOther` |
| `scripts/i18n_fields.mjs` | `level` skip reason extended |
| `scripts/gen_data_schema.mjs` | counted-means-listed rule in the College Pipeline section |
| `source-material/sports/{charlotte-latin,charlotte-country-day,cannon,covenant-day,hickory-grove-christian}/… College Commitments 2024-2026.md` | superseded notes; then ingest (`src/content/sports/`, `.claude/docs/sports/`) |
| `src/locales/en.json` (+ 9 catalogs in Phase 2) | `compare.qual.minimum` → "At least"; new `cardLabels.levelOther` |
| `scripts/check_consistency.mjs` | R1b gains `all-commits-2426` |
| `scripts/plain_language.json` | `documented minimum` term |
| `.claude/skills/athlete-commits/SKILL.md` | four rows, window roll, wording rule |
| `.claude/SKILLS.md` | athlete-commits row + section |
| `CLAUDE.md`, `.claude/skills/add-school/SKILL.md` | floor figure from the script; row total 45 → 46 |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `.claude/docs/design-sync.md` | capture command for the new design file |
| `src/data/overlays/work/metric-values.*.json`, `sports.*.json`, overlays | Phase 2 |
| Claude Design project | new `Compare Schools — Sports.dc.html`, designed (0b) and re-captured (13); `Sports Section Redesign.dc.html` Other row (0b mock, 13 re-capture) |
| `.claude/plans/allcommits.md`, `INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean (memory: trust `tsc -b`, not `--noEmit`)
- [ ] `npm run check:consistency` — 0 findings; the step 7 negative test printed the R1b
      line for the right key and school
- [ ] `npm run check:schema`, `npm run check:spelling`, `npm run check:chrome` — pass
- [ ] `npm run check:plain` exits 0. `grep -rni "documented minimum"` over `src/data`
      (outside comments), `src/locales/en.json` and the components returns nothing
- [ ] `npm run coverage:floor` — total 46. Its floor line matches CLAUDE.md and add-school
- [ ] `npm run build` — succeeds (it chains `check:live`, `check:runtime`, `check:cardlink`,
      `check:schema` and the rest)
- [ ] **Browser** (`npm run build && npx vite preview`, Playwright headed Chrome, memory
      `headed-chrome-via-playwright`). Open
      `/compare/?topic=sports&schools=<all 11>`:
      - the row order is Power 4 → Division I → College commits (all levels) → Current
        seniors committed;
      - the 11 values match step 1 and the leader tint is on Providence Day;
      - the three sub-headings read as written;
      - the new row has no tip, and a P4/D1 tip opens with heading **AT LEAST** (qual tips
        are hidden divs; memory `ddathletes-shipped`);
      - one `ensembles` tip (`?topic=the-arts`), one `us-organizations` tip and one bucket
        tip (`?topic=college-support`) also show AT LEAST;
      - the four pipeline cards' notes read correctly.
      Then the Latin and CCD school pages, College Pipeline card open: the four rows appear
      with an **Other** tag; the "All" counter rises by 3 and 1 (Latin 64, CCD 48); the D1
      and P4 tabs do not show them; the funnel, headline and sport bars are unchanged. **At
      every one of the 11 schools, the "All" rows minus the '27 rows equal the Compare
      all-levels value.** Check that by script over the data, and in the browser for Latin
      and CCD. On Cannon, Covenant Day and Hickory Grove, the relabelled rows show
      **JUCO**, sit after D3 and NAIA in their class, and the list note's new
      sentence reads correctly. `grep -c "level: 'D3'"` falls by exactly 5 across
      `src/data/sportsPrograms/`.
- [ ] `npm run audit:mobile` (scoped to the branch) — no overflow on the Compare page at
      320/360/390px (note the known pre-existing Compare overflow, memory
      `compare-page-overflows-at-phone-widths`: report only new overflow)

### Phase 2 — Locales

- [ ] `npm run check:live` and `npm run check:runtime` — every stamp resolves, including the
      rows after the insert (the mid-array shift is the failure mode here)
- [ ] `npm run check:sepdrift -- --lang <l>`, `check_figures.py` for `metric-values` and
      `sports`, and `npm run check:digits` (scoped to new units) for each of the nine locales
- [ ] `npm run check:chrome` — `compare.qual.minimum` present in all ten. Then compare the
      nine values by eye: none may still be a translation of "documented"
- [ ] `npm run check:dates`, `npm run check:fr` — pass
- [ ] `node scripts/check_work_integrity.mjs`: after a splice it reports index-shift
      "mutations", which is expected (memory `comparerows-shipped`). Verify by stamp instead
- [ ] `npm run build` — succeeds
- [ ] **Browser**, `es`, `fa` and `hi`: the Sports Compare page shows the new row
      translated, and the four rows after it (the seniors row and the first Global Exposure
      row) still render translated rather than in English. That proves the re-splice. In
      `fa`, check that the `2024–2026` range is not reversed (memory
      `rtl-figure-range-reverses`; strip bidi isolates before probing)

## Risks

| Risk | Mitigation |
|---|---|
| Mid-array insert strands later rows' translations in English | Phase 2 step 1 re-splice by stamp; Phase 2 browser check on the rows after it |
| A draft here overwrites a fact consistency4 or consistency5 shipped | Edit from the live text (see Revised), then diff each changed string against `main` |
| A commits refresh lands before this plan and moves the totals | Step 1 re-derives; R1b fails the build on any stale cell |
| "At least" reads oddly on a non-sports tip | Called out at the English review; the key is unchanged, so a different word is a one-line edit |
| A translator keeps the old "documented minimum" sense | Phase 2 step 3 rule; eyeball the nine chrome values |
| Shared P4/D1 tip strings drift apart in editing | Step 4a: keep them byte-identical (one unit each) |
| The Other tag renders English in a locale | It goes through `cardLabels.levelOther`, which `check:chrome` lists until all ten catalogs have it; Phase 2 browser check on a Latin card |
| A future refresh adds an unlisted count again | `offRosterCommits` no longer exists (`tsc -b` rejects it); the skill states the rule |

## Open questions

- **Charlotte Latin's tips: add "The real count may be higher" or not?** Latin publishes
  every signee's name, so a "may be higher" clause would undersell its list. **Default:** no
  clause (step 4a); the AT LEAST heading still marks the number as a floor. Ask at the
  English review.
- **Is "junior colleges" in the sub-heading OK?** The user asked for D I–III + NAIA. **Default:**
  include it, because without it the note is untrue for three schools; ask at the review.

## Implementation notes

### Phase 1 — English (2026-11-23, branch `feat/allcommits`)

Built as planned from `c4a9c9eb`. `consistency5` was merged (no `conf: 'USCAA'`), and step 1's
re-derivation matched the Context table exactly (Charlotte Christian D1 36). Open questions ran
on their defaults: Latin's tips have no "may be higher" clause, and the sub-heading names
junior colleges.

Deviations and choices:

- **Step 0b capture.** The capture script now turns card links on for any non-area page, so the
  Compare capture needs `--card-links off`. The project stores file names with a plain hyphen,
  so the file is `Compare Schools - Sports.dc.html`, not "—". Another session's preview held
  port 4173, so captures ran against a copy of `dist` on another port (`--base`).
- **Step 1c/1d ingest ran in an isolated tree** (a `git archive` of the branch plus the raw
  PDFs, the redaction list and the edited records). Other sessions had uncommitted edits in
  four sports Redesign Research files and Carmel's Cup standings, and a plain run would have
  baked them into the notes. Only the changed schools' notes and content chunks were copied
  back. Date-only notes were dropped, and `schools.json` was a pure reorder, so HEAD order was kept.
- **Two tips split for the 30-word limit** (the hook would have flagged them): Covenant Day's
  and Hickory Grove's D1 tips. The facts are the same as the plan's drafts.
- **Latin tip wording:** the plan's draft "academically strong" replaced the live "academically
  heavy".
- **Step 13 re-capture.** The Sports file was re-captured with the two existing Winning Record
  extras, plus a labelled block holding one real JUCO, NAIA and Other roster row taken from the
  built pages. A whole-pipeline `--extra` failed twice. The capture trims a roster to its first 6
  rows, so the rows that matter were cut. Two extra pipeline cards also made the file 96 KB,
  over the largest proven write.
- **Added mid-build, user 2026-11-23: the roster runs newest class first.** `CollegePipelineBody`
  now sorts by class (newest first, so the Class of 2027 verbals lead), then by level within a
  class (P4 → D1 → D2 → D3 → NAIA → JUCO → Other). This fixes all 11 schools, including Covenant
  Day's oldest-first order. No data or translation change. It was designed in *Sports Section
  Redesign* first, then built and re-captured. The skill's handoff convention now says
  "newest class first". This came after both review passes, so it is **fixed, not re-reviewed**.
- **No PR at the English stop.** Plan step 14 says to open one. `/implement` step 6 keeps both
  phases in one PR, opened after Phase 2.

Verification: `tsc -b` clean. `npm run build` stops only at the expected English-first
`check:live` (stale stamps on the reworded units, Phase 2). Every later gate exits 0 on its own:
chrome, runtime, moneytext, dates, spans, news, photos and cardlink. check:consistency (with
both negative tests), schema, spelling, quals, plain, flags, matrices, sportsmatrix and cup all
pass. `coverage:floor`: 46 rows, Davidson Day 34/46 (73%). Browser (headless Playwright): the
row order, the 11 values, the PD leader tint, no tips on the new row, and AT LEAST on the commit
tips and on the ensembles, bucket and us-organizations tips. Other is 3 + 1 rows (Latin 64,
CCD 48), and the D1/P4 tabs exclude it. JUCO sits after D3 and NAIA. All 11 rosters run newest
class first. `audit:mobile`: no broken card and no page overflow. Compare's phone-width overflow
(1,240px) is the same on `main`.

### Adversarial review 2026-11-23

- **Pass 1:** 8 found, 5 confirmed, 3 rejected, 4 fixed, 1 declined.
  - #1 (R2) should-fix, Carmel's dance signee excluded for a reason the plan reverses: **fixed**.
    The skill Hard constraint and the schema rule now say an Other row needs the school to field
    that sport at varsity. Carmel's realityCheck is reworded, its record has dated notes, and
    Carmel is re-ingested.
  - #2 (R3) should-fix, Covenant Day "names every signee" and then "may be higher": **declined
    by developer**.
  - #3 (R4) minor, the skill docs named only the P4 and D1 window rows: **fixed**.
  - #4 (R5) minor, CCD's rosterNote said its labels come "from each college's NCAA status":
    **fixed**.
  - #5 (R7) minor, the CLAUDE.md floor history sentence: **fixed**.
  - R1 step 13 not done: **rejected**, sequenced after the review on purpose. R6 R8 noise:
    **rejected**, report-only false positives. R8 no notes yet: **rejected**, written here.
- **Pass 2 (on `5829ad3b..0effd3f3`):** 2 found, 2 confirmed, 0 fixed, 2 declined.
  - #1 (R1) should-fix, the varsity condition is missing from the skill's Step 4 and its
    SKILLS.md row: **declined by developer (open)**.
  - #2 (R2) minor, Carmel's record still gives the old reason under the new note: **declined by
    developer (open)**.
- **Fixed, not re-reviewed:** the newest-class-first roster sort (`7511268d`).
