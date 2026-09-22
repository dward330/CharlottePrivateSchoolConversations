---
name: updateCollegeRankings
title: Update every college rank label from the US News 2026 edition to the 2027 edition
status: implemented
phases: 1
created: 2026-09-22
branch: feat/update-college-rankings
prs: [316]
---

# Update the master college-rankings table to the US News 2027 edition

## Goal

U.S. News released the **2027 edition** of Best Colleges on **2026-09-22** (today).
Every rank label the app renders comes from one master table,
[`src/data/collegeRankings.ts`](../../src/data/collegeRankings.ts), and all **449
rows are still 2026 figures**. This plan re-fetches the 2027 rank for every
institution already in that table and rewrites the master, its human-readable
companion, and any `cats` bucket tag whose rank crossed a cutoff.

Success: every one of the 449 rows carries a **verbatim 2027 figure**, `npm run
check:ranks` and `npm run check:buckets` both pass, and no figure has been
carried forward from 2026 unverified.

**The user supplied National #1–#299 as a PDF, already parsed and committed**
(295 rows, cross-validated, 0 disagreements). That resolves **234 of our 326
National rows** and leaves ~92 National residuals plus **all 123 Liberal Arts
rows** to fetch live. See *The user supplied National #1–#299* in Context.

**Scope is the colleges we already track** — this plan adds no new institutions.

## Context

### The single master, and the two surfaces that read it

`src/data/collegeRankings.ts` (553 lines) exports:

- `COLLEGE_RANKINGS` — **449 rows**, `"Institution Name": "National Rank #80"`.
  **326 National, 123 Liberal** (counted programmatically, not by grep).
  Includes **13 published bands** (`#395-434`, `#183-201`) — a band is a real
  published value; never flatten one to a single number.
- `normName()` — shared with `collegeMemberships.ts`; **keep one copy**.
- `ALIAS` — ~25 spelling variants mapped to canonical rows.
- `rankLabelFor(name)` — the only read path.

Consumers verified by grep:

| Consumer | Use |
|---|---|
| `src/components/CollegeSupport.tsx:589` | renders the label on each acceptance-list row |
| `scripts/check_rank_labels.mjs` | every ranked-bucket college must resolve; master ↔ `.md` sync |
| `scripts/check_selectivity_buckets.mjs` | **parses the rank number** and asserts `nu75`/`lac75` tags agree |

Acceptance-list data files store only `{ name, cats }` — **no inline labels**, so
there is exactly one place to edit.

### ⚠️ The bucket cascade — the real risk in this plan

`check:buckets` (`npm run check:buckets`) re-derives `nu75` / `lac75` membership
from the rank number with a **cutoff of 75**, across **2,700 college entries in
11 schools**. A college crossing 75 in either direction makes the build fail until
its `cats` array is fixed in `src/data/collegeSupportPrograms/<slug>.ts`.

**36 rows currently sit in the #66–#85 band** — every one is a cutoff-flip
candidate. The checker's own rule is authoritative and must be obeyed:

> The master `collegeRankings.ts` is authoritative: fix the `cats` array in
> `src/data/collegeSupportPrograms/<slug>.ts`, **never a rank in the master.**

Both checks pass on `main` today (verified), so any failure is caused by this change.

### ⚠️ The Top-75 COUNTS move too — not just the tags

**This was missed on the 2027 pass and is the reason `check:buckets` now gates
it.** The bucket cascade above is about `cats` *tags*. Separately, every school
prints a **Top-75 tier COUNT**, and those are derived from the ranks — so a new
edition moves them silently. #316 shipped green with all 11 schools still
printing their 2026 counts (Cannon `46 / 75` when 66 institutions qualified).

The counts live on **four** surfaces, and all four must move together:

1. the `buckets` row in `src/data/collegeSupportPrograms/<slug>.ts`
2. a stat tile, on the schools that have one
3. the Compare cell in `src/data/metricValues.ts`
4. **the qual sentence that spells the figure out in prose** (`"58 of the top
   75 National Universities appear on …"`) — a number in prose drifts exactly
   as easily as one in a cell, and this is the surface a reviewer forgets

Counted as **distinct institutions** via `canonicalRanked()`, never as tagged
rows, and **clamped at 75**: ties put 79 National and 77 Liberal institutions
inside the band, so a saturated school reads `75 / 75`, not `77 / 75`.

`npm run check:buckets` now fails on any of the four, so this cannot ship
stale again — but **recompute rather than waiting for the checker**, and
re-date the edition prose (`"matched against the 2027 U.S. News tables"`) in
the same pass. `Redesign Research 2026` is a dossier filename, not an edition;
leave it.

⚠️ **This is what makes a rankings update TWO-PHASE.** Editing that English
prose invalidates the overlay stamps for those strings — 360 of them on the
2027 pass (40 entries × 9 locales) — so `check:live` fails until Phase 2
re-translates them. Plan for it rather than discovering it at build time.

### The `.md` companion, and a gap worth knowing

`source-material/college-support/_shared/US News 2026 - Rank Labels.md` is the
sourced human-readable companion. `check_rank_labels.mjs:108` **hardcodes that
filename**, so renaming the file to `2027` requires editing the checker in the
same commit or the build fails with a setup error (exit 2).

**Measured gap:** the master holds 449 rows but the `.md` only 412 (405 distinct
after normalization) — **47 master rows have no `.md` row**. The drift guard only
compares rows present in *both*, so those 47 are invisible to it. They are
spelling aliases (`Arizona State University (Tempe)`, `Penn State University`,
`Rensselaer Polytechnic Inst.`, …). This is pre-existing, not introduced here;
the plan keeps them as aliases rather than growing the doc.

### This is a methodology-change year — expect broad movement

Not a few nudges. U.S. News added an **"Earnings by Major"** metric and expanded
eligibility to a record ~1,700 schools. **MIT took #1**, displacing Princeton,
which had held it since the 2012 edition. A spot-check already found **Duke
#6 → #8**. Ranks move in both directions; nothing may be assumed unchanged.

### ✅ The user supplied National #1–#299 as a PDF — already parsed

**Read this before planning any fetch.** The user printed the live 2027 National
Universities page to PDF on 2026-09-22 and supplied it during planning. It is
**already parsed and cross-validated**, and the 295 rows are committed as a
markdown table inside
**`source-material/college-support/_shared/US News 2027 - National PDF Harvest.md`**,
along with the provenance, the parsing traps and the full coverage analysis.

⚠️ **The rows live in the `.md`, not a sidecar `.json`, deliberately** —
`.gitignore` excludes `source-material/**` and exempts **only `*.md`**, so a
`.json` beside it is silently dropped. Keep any future harvest in the `.md`.

Headline numbers, measured during planning:

| | Count |
|---|---|
| PDF rows parsed (all with a rank, none missing) | **295** (#1 → #308) |
| Cross-validated against independent verbatim sentences | **106 agree, 0 disagree** |
| Of our 326 National rows: resolved from the PDF | **234** |
| Of our 326 National rows: still needing a fetch | **92** |
| Of the 234 resolved: **changed** | **203 (93%)** |
| Of the 234 resolved: unchanged | 16 |

**The 93% churn rate confirms this plan's premise** — a methodology-change year
moves nearly everything. It also means a careless join is dangerous: almost every
row *should* change, so a wrong-but-plausible number will not stand out.

Three things the harvest does **not** cover, each a real gap:

1. **National Liberal Arts Colleges — all 123 master rows, entirely unfetched.**
   That is a separate ranking page. This is the single biggest remaining chunk.
2. **The deep tail.** The PDF reaches #308 but holds only 12 rows ≥#290, and
   omits schools that rank inside its range (**Iowa State, LSU, UT Dallas**).
   Treat it as authoritative for ~#1–#299 and partial beyond. **Never infer
   "unranked" from absence.**
3. **Every 2026 band row** (`#395-434`, `#183-201`) sits past the PDF's reach.

**Many of the 92 "missing" are alias artifacts, not absences** — U.S. News writes
`Georgia Institute of Technology`, `William & Mary`, `Virginia Tech`,
`Purdue University--Main Campus`, `University of North Carolina--Chapel Hill`.
The harvest doc tabulates 14 of them with their 2027 ranks. **Resolve by alias
before fetching**: every one resolved is a profile fetch avoided, and ban risk
scales with fetch count.

### ⛔ How to fetch the REST — every simple channel is blocked

Measured today from this environment. `example.com` and `github.com` both return
`200` from the same shell, so this is **U.S. News blocking, not sandbox egress**:

| Channel | Result |
|---|---|
| `curl` + browser UA + `--compressed` | `http=000` — TLS completes, no body |
| `curl` to the `/best-colleges/api/search` JSON path | `http=000` |
| `WebFetch` on the rankings page | **timeout at 60s** |
| **Yahoo-search fallback** (the channel the 2026 pass used) | **HTTP 500 — DEAD** |
| **Playwright headed Chrome** | **HTTP 200, real content** ✅ |

The full verified recipe, with both routes and their traps, is written up in
**`source-material/college-support/_shared/US News 2027 - Fetch Method.md`**
(staged by this plan). Read that file before writing any scraper — it records
two traps that **return HTTP 200 while serving wrong data**:

1. The first ~29 school anchors on a ranking page are a **"SUMMARY" teaser list,
   not the table** — they carry no rank.
2. **`?_page=2` silently returns page 1** (verified: identical first rows).

The table is **lazy-loaded on scroll**. Per-school profile pages carry the
verbatim sentence *"In the 2027 edition of Best Colleges, X is ranked No. …"*,
which is the authoritative form the project's sourcing rule wants.

### ⚠️ Do not parallelize the fetch

Niche **IP-banned this project on 2026-09-17** when two agents fetched in
parallel (see [`boardingranks.md`](boardingranks.md)). One browser, sequential,
~5–6s between profile fetches. Probe one URL before a long run.

## Decisions

- **Rewrite in place; do not add a second table** — the whole design of this file
  is that a rank lives in exactly one place. A 2026/2027 dual table would
  reintroduce the drift it exists to prevent.
- **Rename the `.md` companion to `US News 2027 - Rank Labels.md`** and update the
  hardcoded path in `check_rank_labels.mjs:108` in the same commit — the filename
  states the edition, and a file named `2026` holding 2027 figures is a trap.
- **Preserve the existing row set, aliases and band shapes** — this plan updates
  figures, it does not re-scope the table. A college that loses its ranking
  entirely is *removed* (so `rankLabelFor` returns undefined and no label
  renders), which is the documented behaviour for an unranked school.
- **Use the supplied PDF first, then Route B (list pages), then Route A
  (profiles)** — in that order, cheapest and safest first. 449 profile fetches at
  6s each is ~45 minutes and risks an IP ban; the PDF already removes 234 of
  them, and the Liberal Arts list page covers 123 more in one pass.
- **Single-phase** — adds **no user-facing text**. The label *strings*
  (`"National Rank #80"`) are generated from a number by existing code, and the
  chrome around them already exists in all ten catalogs. Only digits change.
- **`rank: 1..6` in `ncAdmissions` is NOT a US News rank** — verified: it is the
  1–6 display ordering of the Top 6 NC universities. Out of scope.

## Approvals needed

**None.** This is a data refresh inside an existing card — no new card, section,
stat tile, Compare row, metric key or topic, and no component or styling change.
The UX-design gate does not apply.

Note for the closing report: **this plan does not deploy.** Publishing is a
separate act needing its own fresh instruction.

## Source material

Already written during planning, **uncommitted** — `/implement` commits these:

- `source-material/college-support/_shared/US News 2027 - Fetch Method.md` — the
  verified fetch method, the blocked-channel measurements, both HTTP-200 traps,
  and the rate-limit warning. Sources are listed in the file.
- `source-material/college-support/_shared/US News 2027 - National PDF Harvest.md`
  — provenance for the user's PDF, the parsing traps, the cross-validation result
  and the full coverage analysis against the master.
  **The 295 parsed rows are a markdown table inside that same file**, so no
  re-parse of an 80 MB binary is ever needed. The PDF itself stays in
  `~/Downloads`, uncommitted (bulky binaries are gitignored per the
  data-provenance standard).

To be written by `/implement`:

- `source-material/college-support/_shared/US News 2027 - Rank Labels.md` — the
  sourced companion, replacing the 2026 file (which is **deleted**, not kept
  alongside; git history retains it).

These are reference tables, not per-school research, so the
`ingest-source-material` pipeline does **not** apply — nothing here feeds
`.claude/docs/` notes or `schools.json`. `check:ranks` is the gate that keeps the
`.md` and the master in lockstep.

## Out of scope

- **Adding colleges** not already in the master. The 2027 edition ranks more
  schools; that is a separate enrichment pass.
- **Re-tagging buckets beyond what the rank change forces.** Only fix a `cats`
  array that `check:buckets` actually flags.
- **`highSchools.ts` / `rankLabel`** — a different table on a different scale
  (see the guard comment at `src/data/highSchoolPlacement.ts:236`). The Niche
  boarding ranks are [`boardingranks.md`](boardingranks.md), a separate plan.
- **The `ncAdmissions` `rank: 1..6`** ordering — not a US News figure.
- **The 47 alias rows missing from the `.md`.** Pre-existing and benign.
- **Deploying.**

## Steps

**Single-phase — adds no user-facing text.** Only numbers inside existing
generated label strings change.

1. **Branch.** `git checkout -b feat/update-college-rankings` off an up-to-date
   `main`.

2. **Read both method files first** — `US News 2027 - Fetch Method.md` (the
   HTTP-200 traps and the ban risk) and `US News 2027 - National PDF Harvest.md`
   (what the supplied PDF already covers, and the alias table). Do not improvise
   a scraper, and do not re-fetch what the harvest already holds.

3. **Snapshot the current state** so the diff is reviewable later:
   ```bash
   node -e "const m=require('./src/data/collegeRankings.ts')" 2>/dev/null || true
   git show HEAD:src/data/collegeRankings.ts > /tmp/rankings-2026.ts
   ```
   Also record the 36 rows in the #66–#85 cutoff band — they are the
   bucket-flip watchlist.

4. **Write the scraper as a repo-root dotfile** (e.g. `.fetch-usnews.mjs`) —
   Playwright resolves `node_modules` from the *script's* directory, so a
   scratchpad script fails with `ERR_MODULE_NOT_FOUND`. `rm` it when done; it is
   **not** committed.

   Launch exactly as the method file specifies (`channel:'chrome'`,
   `headless:false`, `--disable-blink-features=AutomationControlled`,
   `--disable-http2`).

5. **Join the supplied PDF harvest to the master FIRST — fetch nothing yet.**
   Parse the 295-row table out of `US News 2027 - National PDF Harvest.md` and
   join it to the 326 National rows using `normName()` **imported from `src/data/collegeRankings.ts`** (never
   re-implemented). Key by **name, never by index**.

   Then run a second pass over the unmatched rows with a looser key — strip `*`,
   strip parentheticals, and **split on `--`** — to catch U.S. News's campus
   spellings. Planning measured **234 resolved / 92 residual** this way.

   Work through the 14-row alias table in the harvest doc by hand; each entry
   resolved here is a live fetch avoided. Any *new* spelling variant that has to
   be added belongs in the `ALIAS` map, not as a duplicate row.

6. **Fetch only what remains**, via headed Chrome per the method file:
   - **All 123 National Liberal Arts rows** — the biggest chunk, entirely
     uncovered by the PDF. Use Route B on the
     `national-liberal-arts-colleges` page: scroll to force the lazy-loaded
     table, take anchors matching `/\/best-colleges\/[a-z0-9-]+-\d{4,}$/`, walk
     up ≤7 ancestors for `/#(\d+)(?:-(\d+))?\s*in\s*National Liberal Arts/`.
     **Filter the `READ MORE »` junk row.** **Prove pagination by diffing
     consecutive page row sets** — `?_page=2` returned page 1 verbatim.
   - **The ~92 National residuals** — the deep tail (old rank >#300), every 2026
     band row, and the confirmed genuine absences **Iowa State, LSU, UT Dallas**.
     Use Route A (profile pages), sequentially, ~5–6s apart.

   For every Route A fetch, **assert the sentence reads "In the 2027 edition"**
   before accepting the number. Write each harvest to a scratchpad JSON so a
   re-run needs no re-fetch.

7. **Resolve anything still unresolved, and record confirmed absences.** An
   institution genuinely absent from both 2027 tables (now Regional, closed, or
   unranked) is **removed from the master** — so `rankLabelFor` returns undefined
   and no label renders — and recorded as a confirmed absence in the `.md`, never
   left as a stale 2026 figure. **Absence from the PDF is not evidence of this**;
   only a live profile check is.

8. **Rewrite `src/data/collegeRankings.ts`.** Update the label values only. Keep
   the row order (alphabetical), the `ALIAS` map, `normName()`, `BY_NORM` and
   `rankLabelFor()` exactly as they are. Update the header comment from `2026` to
   `2027`, including the `.md` filename it references.

9. **Write `US News 2027 - Rank Labels.md`** and `git rm` the 2026 file. Preserve
   the existing structure: provenance header, then the
   `| Institution | Rank label |` table the checker parses with
   `/^\| (.+?) \| ((?:National|Liberal) Rank #[^|]+?) \|/gm`. Record the **channel
   per figure** (Route A vs Route B) and note that the 2026 Yahoo fallback is dead.

10. **Update the hardcoded path in `scripts/check_rank_labels.mjs:108`** to the
    2027 filename, and refresh the `2026` references in its docstring.

11. **Run `npm run check:buckets` and fix the fallout.** For every flagged
    college, edit the `cats` array in
    `src/data/collegeSupportPrograms/<slug>.ts` — **never a rank in the master**.
    Expect both directions: over-inclusion (tagged, no longer qualifies) and
    under-inclusion (now qualifies, untagged — it would otherwise vanish behind
    its own filter).

12. **Regenerate the schema doc** — `npm run schema` then `npm run check:schema`.

13. **Commit with explicit paths** (`git status --short` first; never `git add -A`),
    open a PR via `--body-file`, and squash-merge. Then check out `main` and pull.

## Files touched

| File | Change |
|---|---|
| `src/data/collegeRankings.ts` | edit — 449 label values updated to 2027; header comment re-dated |
| `source-material/college-support/_shared/US News 2027 - Rank Labels.md` | new — sourced companion, replacing the 2026 file |
| `source-material/college-support/_shared/US News 2026 - Rank Labels.md` | **deleted** (`git rm`) |
| `source-material/college-support/_shared/US News 2027 - Fetch Method.md` | new — already staged during planning |
| `source-material/college-support/_shared/US News 2027 - National PDF Harvest.md` | new — already staged; provenance + coverage analysis for the user's PDF |
| `scripts/check_rank_labels.mjs` | edit — hardcoded `.md` filename + docstring year |
| `src/data/collegeSupportPrograms/<slug>.ts` | edit — only `cats` arrays `check:buckets` flags |
| `.claude/docs/DATA-SCHEMA.md` | regenerated via `npm run schema` |

## Verification

Single-phase, so one pass.

- [ ] **Every figure is 2027.** Spot-check ≥5 rows against their profile page and
      confirm the sentence reads *"In the 2027 edition of Best Colleges"*.
      Anchors verified during planning: **MIT #1**, **Princeton #2**,
      **Harvard #3**, **Yale #4**, **Caltech #5**, **Duke #8** (was #6),
      **Georgia Tech #29**, **UNC–Chapel Hill #27**, **Williams #1 Liberal**.
- [ ] **The churn rate is plausible.** Planning measured **203 of 219 matched
      National rows changed (93%)**. A final diff showing only a handful of
      changes means the join silently failed — investigate rather than ship.
- [ ] `npm run check:ranks` — every ranked-bucket college resolves, and the master
      agrees with the **2027** `.md`.
- [ ] `npm run check:buckets` — `nu75`/`lac75` agree with the new ranks across all
      2,700 entries in 11 schools. **This is the one most likely to fail.**
- [ ] `npm run check:schema` — the generated doc matches.
- [ ] `npx tsc --noEmit` — clean. (Prefer `npx tsc -b` per the memory note.)
- [ ] `npm run build` — succeeds end to end (it chains `check:ranks`,
      `check:buckets`, `check:schema` and the rest).
- [ ] **Diff review** — `git diff /tmp/rankings-2026.ts` equivalent: confirm every
      changed line is a *number* change inside an existing label shape. Any row
      whose **category** flipped (National ↔ Liberal) is a red flag for a bad join
      and must be re-confirmed against its profile page.
- [ ] **Band shapes preserved** — `grep -oE 'Rank #[0-9]+-[0-9]+'` still returns
      only genuine published bands; no band was flattened to a single number.
- [ ] **No row lost silently** — the master's row count is 449 minus any
      deliberately removed (now-unranked) institutions, each recorded in the `.md`.
- [ ] **Browser check** — dev server, a school with a long acceptance list
      (Providence Day, 382 rows; Charlotte Latin, 300). **Expand every
      `<details>`** — a collapsed page renders ~17k chars vs ~152k open, so
      labels are invisible otherwise. Confirm labels render beside college names
      and the selectivity filters still return sane counts.

## Risks

| Risk | Mitigation |
|---|---|
| **U.S. News IP-bans this project mid-run** (Niche did, 2026-09-17) | One browser, sequential, ~5–6s spacing. Never two agents. Probe one URL first; if blocked, stop and wait rather than retrying hard. |
| **A silent HTTP-200 wrong-data trap** (teaser list; `?_page=2`) | Both are documented in the method file. Assert every harvested row has a non-null rank, and prove pagination by diffing consecutive page row sets. |
| **Bucket cascade fails the build** across 11 school files | Expected, not exceptional — step 11 owns it. Fix `cats`, never the master. |
| **A bad name join silently attaches a rank to the wrong college** | Join by `normName()`, never by index. The category-flip check in Verification is the tripwire. |
| **Renaming the `.md` breaks `check:ranks` with exit 2** | Step 10 edits the hardcoded path in the same commit. |
| **Methodology change means a school is no longer ranked at all** | Remove the row so no label renders, and record the confirmed absence in the `.md`. Never keep a 2026 figure. |
| **Partial run leaves a half-2026/half-2027 table** | Write the raw harvest to scratchpad JSON first; the master is rewritten in one pass from the complete joined set, not incrementally. |

## Open questions

- **Should institutions newly ranked in 2027 but absent from the master be
  added?** — **default: no.** Record them in the report as a follow-up. The master
  exists to label colleges our schools' graduates actually go to; adding
  institutions nobody was accepted to grows it without changing any page.
- **If a college's 2027 band differs in shape from its 2026 band** (e.g. a banded
  school now carries a single rank) — **default:** take the 2027 published form
  verbatim. The band is a published value, not a formatting choice.
- **If U.S. News blocks headed Chrome too by implementation time** — **default:**
  stop and report. Do not fall back to Yahoo (it 500s) and do not carry 2026
  figures forward. A stale table that is *labelled* 2026 is safer than a
  half-updated one labelled 2027.

## Implementation notes

Implemented 2026-09-22. **449 rows resolved, 0 unresolved: 395 changed, 29
unchanged, 25 removed — 424 rows remain.** Churn 93%, matching the plan's
prediction. All checks green, `npm run build` exits 0.

Five things went differently from the plan, each worth recording.

**1. Route B needed a `Load More` button, not scrolling.** The plan's recipe
(14 `mouse.wheel` passes) yields **29 anchors and stops** — the list is not
infinite-scroll. 60 scroll passes over 54 seconds moved the count not at all.
The real control is a `Load More` button clicked 10–14 times, and
`btn.click()` **times out** because an overlay intercepts it;
`btn.dispatchEvent('click')` works. This mattered a lot: the plan expected
Route B to cover the 123 Liberal Arts rows, and the documented recipe would
have returned ~41, pushing ~120 rows onto profile fetches — the exact ban risk
the plan was written to avoid. With the button: **National 290 rows, Liberal
Arts 203 rows.**

**2. Three more HTTP-200 traps, beyond the two the plan knew about.** Every
U.S. News search surface is broken: `/search?q=` works for ~25 queries then
**rate-limits to empty results forever** (indistinguishable from "no such
school"), `/best-colleges/search?q=` **ignores the query** and returns the
default #1-ranked list, and every JSON API path 404s inside an HTML error
page. Profile ids came from DuckDuckGo instead. All now in the method file.

**3. A wrong-school join happened, and a rank-level check could not have seen
it.** `Mississippi College` resolved to **University of Mississippi** (#179) —
a real school, real 2027 rank, real verbatim sentence, wrong institution. The
guard that caught it reads the school's **own name** out of the profile
sentence and compares it to what was asked for. A slug-word heuristic is not
enough: "mississippi" is in both slugs, which is how it passed. The same check
surfaced two genuine **renames** — `Mississippi College` → *Mississippi
Christian University*, `Virginia Wesleyan University` → *Batten University* —
which look identical to a bad join until the id is verified.

**4. The loose join key had a campus-collision bug, found by the plan's own
category-flip tripwire.** Stripping parentheticals collapsed
`University of North Carolina (Charlotte)` to `univ of north carolina`, which
matched **Chapel Hill (#27)**. Fixed by splitting into two keys: `looseKeep`
unwraps a campus tag into words, and `looseBare` (which drops it) is consulted
**only when it maps to exactly one harvest row**. Twelve rows that no
automatic key may safely resolve — bare flagships like `University of
Michigan`, `University of Texas` — are an explicit hand alias table instead,
mapping to the flagship campus as the 2026 master already did.

**5. The `.md` companion is generated, not hand-written.** It records the
channel per figure and the 25 confirmed absences with their reasons.

Two plan assumptions were wrong and are corrected in the source docs: **Iowa
State, LSU and UT Dallas are all ranked in 2027** (#116 / #202 / #121) — they
were missing from the PDF, not from the ranking, which is the concrete case
for the harvest doc's own "never infer unranked from absence" rule. And the
**2027 band shape is `#382-422`**, not 2026's `#395-434`, so a row banded in
both years still changes.

### Verification

- `npm run build` — **exit 0**, all chained checks pass.
- `npm run check:ranks` / `check:buckets` / `check:schema` — pass
  (buckets: 2,700 entries in 11 schools).
- `npx tsc -b` — clean.
- **9/9 plan anchors** match (MIT #1 … Williams #1 Liberal).
- **Live spot-check, 6/6** against profile pages across different channels
  (Duke #8, Wake Forest #34, Davidson Liberal #16, Elon #100, Clemson #80,
  Appalachian State correctly absent — Regional).
- **Cross-channel agreement:** 271 rows overlap between the PDF and the live
  National list; **271 agree, 0 disagree.** (`University of St. Thomas` looks
  like a conflict but is two different schools sharing a name, MN #156 and TX
  #202; the master holds neither.)
- **0 category flips** (National ↔ Liberal) — the plan's bad-join tripwire.
- **Browser check** (dev server, every `<details>` expanded): Providence Day
  165,879 chars / 249 labels, Charlotte Latin 143,135 / 224; no stale
  `#395-434` band on either page. Both selectivity chips filter correctly —
  Top-75 National shows 78 labels, all National and all ≤75; Top-75 Liberal
  shows 51, all Liberal and all ≤75.

### Follow-up kept out of the diff

The 2027 edition ranks ~1,700 schools, so institutions newly ranked but absent
from the master were **not added** (the plan's stated default). Separately,
**25 colleges dropped out of the national tables entirely** this year; their
acceptance-list rows now render with no label, which is correct but is a
visible change on those pages worth a look.
