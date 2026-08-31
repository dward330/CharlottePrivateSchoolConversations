---
name: removebandcount
title: Remove the grade-band-count stat tile from the Admissions area for Providence Day and Charlotte Country Day
status: implemented
phases: 2
created: 2026-08-31
branch: fix/remove-band-count-tile
prs: [259]
---

# Remove the grade-band-count stat tile from the Admissions area

## Goal

Delete the leading `3 / grade bands, each with its own …` stat tile from the Admissions
research area's stat strip on **every school that has one**, so no school's Admissions
section opens with a band count. Two schools carry it today — Providence Day
(`grade bands, each with its own process`) and Charlotte Country Day
(`grade bands, each with its own calendar`). Charlotte Christian's equivalent tile was
already deleted in PR #258, so this change finishes the job across the area.

We know it worked when Providence Day and Charlotte Country Day each render **three** stat
tiles above the Admissions card with no band count, Charlotte Christian still renders its
three, and `npm run build` is green in all ten locales with nothing falling back to
English.

## Context

### This is the same operation PR #258 already performed, one school over

[`.claude/plans/fixcharlottechristianadmissionsidecards.md`](fixcharlottechristianadmissionsidecards.md)
deleted exactly this tile for Charlotte Christian and shipped it in PR #258. **Read that
plan's "The translation layer — this is the hard part" section and its
`## Implementation notes`** before starting — the procedure below is the same one,
re-measured for the two remaining schools, and its Implementation notes record three
corrections that still apply. Nothing about the mechanism needs re-deriving.

### Where the tile lives

Only three of the eleven schools have an Admissions card at all. Their data lives in
`src/data/admissionsPrograms/<slug>.ts`, typed by `src/data/admissionsPrograms.ts` and
rendered by `src/components/AdmissionsProgram.tsx`.

`stats` is typed at
[src/data/admissionsPrograms.ts:152](src/data/admissionsPrograms.ts#L152) as
`{ value: string; label: string }[]` and rendered by `AdmissionsStatBand` at
[src/components/AdmissionsProgram.tsx:417](src/components/AdmissionsProgram.tsx#L417).
There is **exactly one consumer** — `AdmissionsStatBand`, mounted once at
[src/pages/SchoolDetail.tsx:885](src/pages/SchoolDetail.tsx#L885). The printable checklist
page uses `checklist`, not `stats`, so it is entirely unaffected. `stats` is deliberately
**not** in `VALUE_METRICS`, so there is no Compare row to update either (see the comment
above `AdmissionsStatBand`).

The two tiles to delete, both `stats[0]`:

| School | File | Line | Value / label |
|---|---|---|---|
| Providence Day | [src/data/admissionsPrograms/providence-day.ts:30](src/data/admissionsPrograms/providence-day.ts#L30) | 30 | `{ value: '3', label: 'grade bands, each with its own process' }` |
| Charlotte Country Day | [src/data/admissionsPrograms/charlotte-country-day.ts:71](src/data/admissionsPrograms/charlotte-country-day.ts#L71) | 71 | `{ value: '3', label: 'grade bands, each with its own calendar' }` |

Each school drops from four tiles to three. **No CSS change is needed** —
`.stat-strip` at [src/index.css:1128](src/index.css#L1128) is
`grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))`, so it reflows on its own.
This was confirmed by PR #258 doing the identical 4→3 reduction.

### The translation layer — this is the hard part

Admissions prose is translated into all nine locales in `PROSE_TRANSLATED`
([src/lib/i18n.ts:182](src/lib/i18n.ts#L182)): `es bn ht te fr fa it hi ar`. Each has a
shipped overlay `src/data/overlays/admissions.<lang>.json` **and** a work-file sibling
`src/data/overlays/work/admissions.<lang>.json`. **Both need every edit** — 2 × 9 = 18
files. All nine work files hold **444 entries** today and are structurally identical; the
edit below is byte-for-byte the same operation in each.

**Resolution is path-keyed with a stamp guard.** `indexOverlay()` at
[src/lib/localizeData.ts:59](src/lib/localizeData.ts#L59) builds a `Map` keyed by each
**`at` path**; `walk()` at [src/lib/localizeData.ts:132](src/lib/localizeData.ts#L132)
looks a string up **by path** and uses the `of` stamp only as a staleness guard:

```ts
const hit = index.get(path)
if (!hit || hit.of !== stampFor(node)) return node   // fall back to English
return hit.t
```

So deleting `stats[0]` shifts `stats[1] → [0]`, `[2] → [1]`, `[3] → [2]`. The three
survivors per school keep their stamps but **change their paths**, so their `at` entries
must be rewritten. Their stamps stay valid, which is exactly why `check:live` and
`check:runtime` both stay green while the tiles silently render English — see
"Checks that will catch a mistake here" below.

**Measured from `src/data/overlays/work/admissions.fr.json` (identical in all nine):**

| Stamp | English | `at` paths today |
|---|---|---|
| `1b9dbd14` | `grade bands, each with its own process` | `providence-day:guide.stats[0].label` **(sole path — delete whole)** |
| `67f7b475` | `grade bands, each with its own calendar` | `charlotte-country-day:guide.stats[0].label` **(sole path — delete whole)** |
| `297b9d6d` | `TK/K application deadline — earlier than everyone else` | `providence-day:guide.stats[1].label` |
| `0115e4c6` | `Grades 1–12 application deadline` | `providence-day:guide.stats[2].label`, `charlotte-christian:guide.stats[1].label`, `charlotte-country-day:guide.stats[2].label` |
| `9edfe10e` | `enrollment deposit, credited toward tuition` | `providence-day:guide.stats[3].label` |
| `0a55ba87` | `JK/K application deadline — two weeks ahead of everyone else` | `charlotte-christian:guide.stats[0].label`, `charlotte-country-day:guide.stats[1].label` |
| `27f1c3e0` | `enrollment deposit — of tuition, credited toward it` | `charlotte-country-day:guide.stats[3].label` |

**Both tiles to delete are school-exclusive**, so each is removed whole — no `at` element
surgery on the deleted entries themselves. The risk is entirely in the six re-paths.

**Three of the six survivors sit in `at` arrays SHARED with another school.** `0115e4c6`
covers all three schools, and `0a55ba87` covers Charlotte Christian as well as Country
Day. **Charlotte Christian's paths must not move** — its `stats` array is not being
touched by this plan. Rewriting a whole `at` array instead of the single element is the
mistake that silently breaks a school this plan never intended to change, at 100%
coverage with every checker green. This is the same trap PR #258 hit from the other
direction, and its Implementation notes confirm the element-wise edit held.

**Nothing is re-translated by this plan.** Every survivor keeps its existing, already
reviewed translation — only its path changes. No new English is written, so there is no
new string to translate in any locale.

**`stats[].value` is never extracted.** No `guide.stats[*].value` path exists in any work
file, so the `'3'` itself has no overlay entry to remove. Do not go looking for one.

**Never run `i18n_extract.mjs` to apply this.** It emits `t: ''` for entries it has not
seen translated, which would blank all nine files. Splice and re-path the work files with
a script, then rebuild. This is the standing lesson from PR #248 and PR #258.

**The builder is a pure pass-through** ([scripts/i18n_build_overlay.mjs](scripts/i18n_build_overlay.mjs)):
it copies `{t, of, at}` straight through and drops only entries with an empty `t`. Editing
the **work** file and rebuilding is therefore sufficient.

### Checks that will catch a mistake here

- `npm run check:live` (chained into `npm run build`) exits 1 on any shipped overlay entry
  whose stamp no longer occurs in live English. This is what makes deleting the two
  entries mandatory rather than optional — leaving them in leaves the build red.
- `npm run check:runtime` recomputes every stamp from the work file's `text`.
- **Neither check verifies that an `at` path still EXISTS in the data.** A survivor left
  pointing at `stats[3]` when only `stats[0..2]` exist renders English with both checkers
  green. That failure mode is visible **only in a browser**, which is why the browser
  check in Verification is mandatory rather than a courtesy.

## Decisions

- **Delete the tile from the data, do not hide it in the component.** The repo's standing
  rule is that omission is expressed as absence of data, never as a conditional in a
  component. `AdmissionsStatBand` needs no change at all.
- **Do not change the `stats` type or make the field optional.** Both schools keep a
  non-empty three-element array; the `stats.length === 0` guard already in the component
  stays as-is and is not exercised.
- **Do not backfill a replacement tile.** The user asked for the band count removed, not
  swapped for something else. Three tiles is the shipped shape for Charlotte Christian
  already.
- **Leave `spineNote` and the `headline` prose alone.** Country Day's headline mentions
  the process "breaks twice", and both `spineNote`s discuss the bands — but neither states
  a bare count as a tile, and the user's request was scoped to the tile in the screenshot.
  Rewriting prose would add nine translations to a change that needs none.
- **Re-stamp/re-path in place rather than delete-then-add**, per PR #258's Implementation
  note 2: mutating an entry keeps it at its original array position, which keeps the diff
  surgical instead of reshuffling the file.
- **Two phases**, because Admissions prose is translated. Phase 1 is the two English data
  deletions; Phase 2 is the overlay surgery. Note the unusual shape: Phase 2 writes **no
  new translated text** — it only re-paths existing entries. It is still a separate phase
  because Phase 1 alone leaves `npm run build` red (see Verification).

## Approvals needed

**None.** This removes an existing stat tile rather than adding a card, section, stat
tile, Compare row, metric key, or topic, so the UX-design gate does not apply — and the
user requested the removal directly. No new user-facing string is written.

## Out of scope

- Charlotte Christian's `stats` array — already three tiles, already correct. Its paths
  must be left **exactly** where they are.
- The other eight schools — they have no Admissions card at all.
- Stat strips in any other research area (Sports, Arts, College Support), which use
  different data and different components.
- Any `rules`, `bands`, `comparison`, `contacts` or `checklist` content.
- Deploying. Merging is not publishing.

## Steps

### Phase 1 — English

1. **Branch** from an up-to-date `main`: `git checkout main && git pull && git checkout -b
   fix/remove-band-count-tile`.

2. **Delete `stats[0]` from Providence Day.** In
   [src/data/admissionsPrograms/providence-day.ts:30](src/data/admissionsPrograms/providence-day.ts#L30),
   remove the line `{ value: '3', label: 'grade bands, each with its own process' },`
   leaving a three-element `stats` array beginning with the `Jan 2, 2027` TK/K tile.

3. **Delete `stats[0]` from Charlotte Country Day.** In
   [src/data/admissionsPrograms/charlotte-country-day.ts:71](src/data/admissionsPrograms/charlotte-country-day.ts#L71),
   remove the line `{ value: '3', label: 'grade bands, each with its own calendar' },`
   leaving a three-element array beginning with the `Jan 2, 2027` JK/K tile.

4. **Add a one-line note to each file's `stats` array** recording that the band-count tile
   was removed by request (2026-08-31), so a later pass reads it as a decision rather than
   an unresearched gap — the same reason PR #258 annotated Charlotte Christian's file. Keep
   it to a single comment line; do not restate this plan.

5. **Do NOT touch `src/components/AdmissionsProgram.tsx` or `src/index.css`.** Both already
   handle a three-tile strip; PR #258 proved it.

6. **Verify Phase 1** per the Verification section, then commit and push. **`npm run build`
   will be RED at `check:live`** with 2 unresolvable stamps per locale — that is the
   expected, correct Phase-1 state, cleared by Phase 2. Do not "fix" it by editing
   `FOREIGN_TOPICS` or any allowlist.

7. **Stop and report to the user.** Show them the two schools rendering three tiles and
   wait for their confirmation before starting Phase 2. Per the repo's standing two-phase
   rule, both phases land in **one** PR.

### Phase 2 — Every other locale

Nine locales per `PROSE_TRANSLATED`: `es bn ht te fr fa it hi ar`. This is the **overlay**
layer, not `src/locales/*.json` — no UI chrome changes in this plan. See
[`.claude/docs/prose-translation-architecture.md`](../docs/prose-translation-architecture.md)
for the mechanism.

8. **Re-measure the worklist before editing anything.** Run
   `node scripts/check_live_resolution.mjs --verbose` and confirm it names exactly the
   **two** stamps `1b9dbd14` and `67f7b475` per locale. The checker **exits at the first
   failing locale** and its default output is display-capped, so use `--verbose` and re-run
   after each fix. If it names anything else, stop — Phase 1 changed more than intended.

9. **Write one surgery script** (in the scratchpad, **not** committed to the repo) that
   runs over each of the nine `src/data/overlays/work/admissions.<lang>.json` files. Dump
   with 2-space indent, `ensure_ascii=False` (Python) or `JSON.stringify(j, null, 2) +
   '\n'` (Node), and a trailing newline — otherwise the non-Latin scripts re-escape into a
   whole-file noise diff.

   **(a) Splice out the two deleted tiles**, matching on the **`of` stamp**, never the
   array index:

   | Stamp | English | Why removed whole |
   |---|---|---|
   | `1b9dbd14` | `grade bands, each with its own process` | sole `at` is `providence-day:guide.stats[0].label` |
   | `67f7b475` | `grade bands, each with its own calendar` | sole `at` is `charlotte-country-day:guide.stats[0].label` |

   **Assert a drop count of exactly 2 per language**, and **assert each entry's `at` array
   has length 1 and names only the expected school** before splicing. A silent 0-drop
   leaves the build red for a confusing reason; a splice of a shared entry breaks a school
   silently.

   **(b) Re-path the six survivors, operating on the `at` array ELEMENT-WISE.**

   | Stamp | Edit | Leave untouched |
   |---|---|---|
   | `297b9d6d` | `providence-day:guide.stats[1].label` → `…stats[0].label` | *(sole path)* |
   | `0115e4c6` | `providence-day:guide.stats[2].label` → `…stats[1].label` **and** `charlotte-country-day:guide.stats[2].label` → `…stats[1].label` | **`charlotte-christian:guide.stats[1].label`** |
   | `9edfe10e` | `providence-day:guide.stats[3].label` → `…stats[2].label` | *(sole path)* |
   | `0a55ba87` | `charlotte-country-day:guide.stats[1].label` → `…stats[0].label` | **`charlotte-christian:guide.stats[0].label`** |
   | `27f1c3e0` | `charlotte-country-day:guide.stats[3].label` → `…stats[2].label` | *(sole path)* |

   That is **six path replacements across five entries** (`0115e4c6` carries two). **Assert
   each replacement fires exactly once per language**, and assert that no
   `charlotte-christian:` path anywhere in the file changed — diff the set of
   Charlotte-Christian paths before and after and require it identical. Rewriting a whole
   `at` array instead of one element is the one mistake here that ships silently.

   **Do not touch any `t` or `text` field.** No string is retranslated; only paths move.

10. **Rebuild all nine overlays**:
    `node scripts/i18n_build_overlay.mjs --topic admissions --lang <lang>` for each of
    `es bn ht te fr fa it hi ar`. The builder is a pass-through, so each shipped file
    mirrors its work file minus empty-`t` entries. Expect **444 → 442** entries per file.

11. **Prove the deletions are gone.** `grep -l '1b9dbd14\|67f7b475' src/data/overlays/admissions.*.json src/data/overlays/work/admissions.*.json`
    must print **nothing**. Also confirm no `providence-day:guide.stats[3]` and no
    `charlotte-country-day:guide.stats[3]` path survives anywhere under
    `src/data/overlays/`, and that `charlotte-christian:guide.stats[0..2]` all still do.

12. **Verify Phase 2** per the Verification section, then commit and open **one PR carrying
    both phases**. Pass the body via `--body-file`, never a heredoc. Stage explicit paths —
    never `git add -A`.

13. **Merge** (`gh pr merge --squash --delete-branch` — pre-authorized), then
    `git checkout main && git pull`. Flip the row in `.claude/plans/INDEX.md` to
    *Implemented* with the PR link, and add an `## Implementation notes` section here if
    the build deviated from this plan. **Do not deploy** — publishing needs the user's
    explicit say-so in the moment.

## Files touched

| File | Change |
|---|---|
| `src/data/admissionsPrograms/providence-day.ts` | edit — `stats[0]` deleted, one comment line added |
| `src/data/admissionsPrograms/charlotte-country-day.ts` | edit — `stats[0]` deleted, one comment line added |
| `src/data/overlays/work/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | 9 files — 2 entries spliced, 6 paths rewritten element-wise |
| `src/data/overlays/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | 9 files — rebuilt from the work files |
| `.claude/plans/INDEX.md` | status → Implemented, PR link |

No component, CSS, locale-catalog, schema-doc or `source-material/` change. `npm run
check:schema` is unaffected: `DATA-SCHEMA.md` records the `stats` **field**, not its
element count.

## Verification

### Phase 1 — English

- `npx tsc -b` exits 0. **Read the exit code, not just the output** — `tsc --noEmit` has
  passed here on a type error the build caught.
- `npm run build` — expect **RED at `check:live`**, naming exactly 2 unresolvable stamps
  per locale (`1b9dbd14`, `67f7b475`). Any other count means Phase 1 went wrong.
- **Browser check** (Playwright headed; use `domcontentloaded`, **not** `networkidle` —
  the Latest News fetch means the network never idles on a school page). On
  `/school/providence-day` and `/school/charlotte-country-day`, expand the Admissions
  section and confirm **three** `.stat-tile` elements, none containing "grade bands".
  Confirm `/school/charlotte-christian` still shows its three.

### Phase 2 — Locales

- `npm run build` **green end to end**, including `check:live`, `check:runtime`,
  `check:chrome` and `check:schema`.
- `node scripts/check_live_resolution.mjs --verbose` reports **0** unresolvable entries in
  all nine locales.
- `python3 scripts/check_figures.py --topic admissions --lang <code>` for each of the nine
  — it is a **Python script, not an npm one** (PR #258's Implementation note 1). Figures
  must be unchanged; this plan re-types none.
- `npm run i18n:leaks` totals **byte-identical** to the pre-change state in all nine
  locales. No string was added or rewritten, so any movement is a defect.
- `npm run check:sepdrift -- --lang <code>` green for all nine (no figure was touched, so
  this should be a no-op confirmation).
- **Browser check — this is the only place the re-path failure mode is visible.** With
  `?lang=es`, `?lang=hi` and `?lang=ar`, load **all three** admissions schools:
  - Providence Day: **three** stat tiles, **all three labels translated**.
  - Charlotte Country Day: **three** stat tiles, **all three labels translated**.
  - Charlotte Christian: **three** stat tiles, **all three labels translated** — this is
    the regression check on the shared `at` entries, not a courtesy.

  A tile rendering its English label is the silent path-break this whole procedure exists
  to prevent. Check `ar` specifically as the RTL case.

## Risks

| Risk | Mitigation |
|---|---|
| Re-pathing a whole `at` array breaks Charlotte Christian's tiles silently | Element-wise replacement only; script asserts the Charlotte-Christian path set is byte-identical before and after; browser check on all three schools in three locales |
| A re-extract blanks all nine translated files | Never run `i18n_extract.mjs`; the surgery script edits work files directly |
| Splicing a shared entry | Script asserts `len(at) == 1` and the expected school before splicing either stamp |
| Non-Latin scripts re-escape into a whole-file diff | `ensure_ascii=False` / `JSON.stringify(…, null, 2)`, 2-space indent, trailing newline |
| Phase 1's red build gets "fixed" by an allowlist edit | Step 6 states the red build is expected; `FOREIGN_TOPICS` edits are explicitly forbidden |

## Open questions

None. The tile, its two locations, its nine-locale overlay footprint and the exact re-path
table were all measured during planning and are recorded above.

## Implementation notes

Built as planned; both phases shipped in PR #259. Three things worth recording.

**The measured worklist matched the plan exactly.** All nine work files held 444 entries
and were byte-identical in structure, and every one of the seven affected stamps sat at the
same index with the same `at` array in all nine (`1b9dbd14` at 2, `67f7b475` at 322,
`0a55ba87` at 150, and so on). `check_live_resolution.mjs --verbose` named exactly the two
expected stamps. Nothing needed re-deriving from PR #258.

**The round-trip format was confirmed before editing, not assumed.** Reading each work file
and re-dumping it with `json.dumps(..., ensure_ascii=False, indent=2) + '\n'` reproduced the
on-disk bytes exactly in all nine, which is what kept the non-Latin diffs surgical
(28 changed lines per file, no re-escaping noise). Worth doing first on any future overlay
surgery — it turns the escaping risk into a checked precondition rather than something you
discover in the diff.

**`npm run i18n:leaks` needs `--lang <code>`** and has no all-locale mode; a bare
`npm run i18n:leaks` prints a usage line and exits. The plan's "totals byte-identical"
requirement was met by capturing per-locale output, stashing only `src/data/overlays/`, and
re-running to get a true pre-change baseline — the outputs were identical, not merely equal
in count.
