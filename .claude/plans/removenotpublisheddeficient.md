---
name: removenotpublisheddeficient
title: Remove the "Not published ≠ deficient." framing rule and let the remaining two share the row
status: in-progress
phases: 1
created: 2026-08-30
branch: fix/remove-not-published-deficient
prs: []
---

# Remove the "Not published ≠ deficient." framing rule

## Goal

The Admissions card *Grade-by-Grade Application Guide* opens with a row of three framing
rules. The third — **"Not published ≠ deficient."** — is being retired permanently. After
this change the row holds **two** rules, and they split the full row width between them
instead of leaving the third column's space empty.

We'll know it worked when the Providence Day admissions card renders exactly two rules
across the full card width (no dead third column) in English **and** in all nine prose
locales, and `npm run build` — which chains `check:live`, `check:runtime` and
`check:chrome` — passes.

## Context

**One school has this data.** `src/data/admissionsPrograms/` contains a single file,
[`providence-day.ts`](../../src/data/admissionsPrograms/providence-day.ts). The rule being
removed is `guide.rules[2]`, at lines 47–50:

```ts
      {
        title: 'Not published ≠ deficient.',
        text: "The application-fee amount and some band checklists aren't on the website. Those gaps are flagged below — confirm them with the admissions office.",
      },
```

The screenshot's "Charger Commons" text confirms this is Providence Day, despite the
circled block's neighbours reading generically.

**One component renders it.** [`AdmissionsProgram.tsx:242-254`](../../src/components/AdmissionsProgram.tsx#L242-L254)
maps `data.rules` into `.ad-rule` children of `.ad-rules`. The count is data-driven, so
deleting the entry removes the block with **no component change required**. The standalone
printable checklist page (`src/pages/AdmissionsChecklist.tsx`) does **not** render the
rules row — grep confirms `ad-rule` appears only in `AdmissionsProgram.tsx` and
`src/index.css`.

**The grid hardcodes three columns.** [`src/index.css:5158-5164`](../../src/index.css#L5158-L5164):

```css
.ad-rules {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
  ...
}
```

With two children this leaves the third column's width unused, which is precisely the
"extra space" the user wants redistributed. There is one responsive override at
[`src/index.css:5503`](../../src/index.css#L5503) inside `@media (max-width: 900px)` that
collapses to `1fr` — that stays as-is.

**⚠️ The two strings are translated in nine locales, and this is the part that will bite.**
`admissions` is a registered prose topic (`scripts/i18n_topics.mjs:45`), so
`src/data/overlays/admissions.<lang>.json` exists for all nine of `PROSE_TRANSLATED`
(`es bn ht te fr fa it hi ar`). In **every** one of the nine, the two entries sit at array
indices **10 and 11**, with these exact stamps:

| Index | `at` path | `of` stamp |
|---|---|---|
| 10 | `providence-day:guide.rules[2].title` | `0e93db6b` |
| 11 | `providence-day:guide.rules[2].text` | `4860d402` |

Each overlay has a work-file sibling at `src/data/overlays/work/admissions.<lang>.json`
holding the same entries plus the English `text`. Both layers must be edited together.

Three mechanisms make this non-optional:

- **`check:live` (`scripts/check_live_resolution.mjs`) exits 1** on any shipped overlay
  entry whose stamp no longer occurs in the live `src/data` English. Deleting the TS entry
  and leaving the overlays alone leaves stamps `0e93db6b` / `4860d402` unresolvable in nine
  files → a red build. It is chained into `npm run build`.
- **`check:runtime` (`scripts/check_runtime_resolution.mjs`) exits 1** on any shipped
  overlay entry whose stamp has no matching English source in the **work file**. Deleting
  from the work file but not rebuilding the overlay reports them `orphaned`. Also chained
  into `npm run build`.
- **Stamps are content hashes, not path hashes** (`scripts/i18n_stamp.mjs` — FNV-1a over
  the string only). So the surviving `rules[0]` / `rules[1]` entries keep resolving even
  though their sibling index vanished; the `at` paths of the survivors are unchanged
  (`rules[0]`, `rules[1]`) because we remove the **last** element. **No reindexing is
  needed** — this is why removing the third rule is cheap and removing the first would not
  have been.

**Do NOT re-run `i18n_extract.mjs`.** Extraction emits `t: ''` for every string; it is not
a merge. `guardExisting()` (`scripts/i18n_extract.mjs:133`) refuses to overwrite a
translated work file without `--force`, and forcing it would blank all nine translated
Spanish/Bangla/… admissions files. The correct operation for a *deletion* is a surgical
splice of the two entries out of each work file, then a rebuild of each overlay via
`scripts/i18n_build_overlay.mjs` (which reads the work file and drops `text`).

**No chrome keys involved.** The rule strings live in the data layer, not
`src/locales/*.json`; grep for `deficient` in `src/locales/` returns nothing.

**No schema drift.** `.claude/docs/DATA-SCHEMA.md:699` lists `AdmissionsGuide`'s field
*names* only (`… stats, rules, spineNote …`), not the rule count, so `npm run check:schema`
is unaffected. Run it anyway as part of `npm run build`.

## Decisions

- **Single-phase.** — This plan *removes* user-facing text and *deletes* its nine
  translations; it adds no new string a translator must see. There is no English wording
  to review before propagating, so the English/locale split serves no purpose here. Both
  the TS deletion and the nine overlay deletions land in one PR.
- **Splice the work files + rebuild the overlays; never re-extract.** — `i18n_extract.mjs`
  blanks every `t`, and its `--force` escape hatch has already wiped a locale's work files
  once (recorded in the script's own docstring).
- **Redistribute with `grid-template-columns: 1fr 1fr`, not `repeat(auto-fit, …)`.** —
  Only one school holds admissions data and its `rules` array will be exactly 2 after this
  change; a hardcoded two-column rule is the smallest honest edit and matches how the file
  already writes `1fr 1fr 1fr`. An `auto-fit` rule would silently change behaviour for a
  hypothetical future 4-rule school without anyone deciding that.
- **Delete the third `RULE_ICONS` entry? No — leave it.** — `RULE_ICONS[i % length]`
  indexes by position, so with two rules only entries 0 and 1 are ever reached. The unused
  info-circle glyph is inert, and removing it would silently re-map icons if a third rule
  is ever added back.
- **Update the component's `{/* The three framing rules … */}` comment and the
  `AdmissionsGuide.rules` JSDoc**, both of which say "three". — A stale count comment is
  the kind of thing the next reader trusts.
- **`Not published ≠ deficient.` is removed permanently, not made conditional.** — Per the
  repo's standing rule, omission is expressed as absence of data, never as a conditional in
  a component.

## Approvals needed

**None.** This removes an existing block rather than adding a card, section, stat tile,
Compare row, metric key, or topic, and the user has explicitly requested it. The
UX-design gate governs *ingestion* growing the interface, not a directly-requested removal.

## Out of scope

- Any other rule in the row — `One portal.` and `Dates are cycle-specific.` keep their
  exact wording.
- The `NOT PUBLISHED` markers elsewhere in the admissions data. The removed rule *described*
  those gaps; the gaps themselves (the unpublished application-fee amount, the Grades 1–5
  material list, etc.) remain flagged inline in the band steps and the file's header
  comment. **Do not go hunting for and removing those** — only the framing block goes.
- The `Unpublished ≠ deficient.` titles in `src/data/financialAidReports.ts` (10
  occurrences). Different card, different area, not circled, not in scope.
- The responsive `@media (max-width: 900px) { .ad-rules { grid-template-columns: 1fr; } }`
  rule — unchanged.
- Any deploy. Merging is not publishing.

## Steps

**Single-phase — removes user-facing text and its existing translations; adds no new
string, so there is no English-first review gate.**

1. **Branch.** `git checkout main && git pull && git checkout -b fix/remove-not-published-deficient`.

2. **Delete the rule from the data.** In
   [`src/data/admissionsPrograms/providence-day.ts`](../../src/data/admissionsPrograms/providence-day.ts),
   remove the third object in `guide.rules` (lines 47–50) — the one whose `title` is
   `'Not published ≠ deficient.'`. Leave the preceding `Dates are cycle-specific.` object's
   trailing comma valid. The `rules` array must end with exactly two entries.

3. **Update the file's header comment if it counts the rules.** Re-read the top-of-file
   comment block (lines 1–20) — it describes the school's `NOT PUBLISHED` markers being
   "rendered as 'confirm with admissions'". That statement stays true (the band steps still
   carry those notes), so **no edit is expected here**; confirm rather than assume, and only
   touch it if it explicitly references the removed framing rule.

4. **Fix the two "three" comments.**
   - [`src/components/AdmissionsProgram.tsx:242`](../../src/components/AdmissionsProgram.tsx#L242) —
     `{/* The three framing rules — how the process works before any date. */}` →
     `{/* The framing rules — how the process works before any date. */}`
   - [`src/data/admissionsPrograms.ts:153`](../../src/data/admissionsPrograms.ts#L153) —
     `/** The three framing rules above the band selector. */` →
     `/** The framing rules above the band selector. */`

5. **Widen the grid to two columns.** In [`src/index.css`](../../src/index.css#L5157-L5164),
   change `.ad-rules`'s `grid-template-columns: 1fr 1fr 1fr;` to `grid-template-columns: 1fr 1fr;`
   and update the section comment above it (`/* The three framing rules … */`) to drop
   "three". Leave `gap`, `margin-bottom`, `padding-bottom` and `border-bottom` untouched —
   the two columns absorb the freed width automatically, which is the requested
   redistribution. **Do not touch** the `@media (max-width: 900px)` override at line 5503.

6. **Splice the two entries out of all nine work files.** For each
   `lang` in `es bn ht te fr fa it hi ar`, edit
   `src/data/overlays/work/admissions.<lang>.json` and remove the two objects in `strings`
   whose `of` is `0e93db6b` and `4860d402` (equivalently: whose `at` contains
   `providence-day:guide.rules[2].title` / `…[2].text`). They are at indices 10 and 11 in
   every file today, but **match on the `of` stamp, not the index** — the index is a
   coincidence of ordering, and keying by position is exactly the failure mode this repo
   has recorded before. Each file should go from 151 entries to 149. Preserve the file's
   2-space indentation and trailing newline (`JSON.stringify(payload, null, 2) + '\n'` is
   what the extractor writes).

   A scripted splice is fine and preferable to nine hand-edits, e.g.:

   ```bash
   for L in es bn ht te fr fa it hi ar; do
     python3 - "$L" <<'PY'
   import json, sys
   L = sys.argv[1]
   p = f'src/data/overlays/work/admissions.{L}.json'
   d = json.load(open(p))
   before = len(d['strings'])
   d['strings'] = [e for e in d['strings'] if e.get('of') not in ('0e93db6b', '4860d402')]
   assert len(d['strings']) == before - 2, f'{L}: expected to drop 2, dropped {before - len(d["strings"])}'
   open(p, 'w').write(json.dumps(d, ensure_ascii=False, indent=2) + '\n')
   print(f'{L}: {before} -> {len(d["strings"])}')
   PY
   done
   ```

   **The `assert` is load-bearing** — a silent 0-drop (typo'd stamp) would leave the
   overlays stale and the build red for a confusing reason. Note `ensure_ascii=False`:
   the extractor writes real UTF-8, and re-escaping every Bangla/Telugu/Arabic character
   to `\uXXXX` would produce a 9-file diff of pure noise. **Verify with
   `git diff --stat src/data/overlays/work/` that each file shows a small diff, not a
   whole-file rewrite** — if a file rewrote entirely, the encoding or indent is wrong;
   revert it and retry.

7. **Rebuild all nine overlays from the spliced work files.**

   ```bash
   for L in es bn ht te fr fa it hi ar; do
     node scripts/i18n_build_overlay.mjs --topic admissions --lang "$L"
   done
   ```

   Then confirm each `src/data/overlays/admissions.<lang>.json` also lost exactly the two
   entries and no longer contains `0e93db6b` or `4860d402`:

   ```bash
   grep -l '0e93db6b\|4860d402' src/data/overlays/admissions.*.json src/data/overlays/work/admissions.*.json
   ```

   That must print **nothing**.

8. **Run the verification block below.**

9. **Commit with explicit paths** — never `git add -A`. The staged set is exactly:
   `src/data/admissionsPrograms/providence-day.ts`, `src/data/admissionsPrograms.ts`,
   `src/components/AdmissionsProgram.tsx`, `src/index.css`, the nine
   `src/data/overlays/admissions.*.json`, the nine
   `src/data/overlays/work/admissions.*.json`, plus `.claude/plans/INDEX.md` and this plan
   file. Run `git status --short` first and confirm every staged path belongs to this
   change.

10. **Open the PR** (`--body-file`, never a heredoc), squash-merge with
    `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.

11. **STOP. Do not deploy.** Report "merged — ready to deploy whenever you want it" and end
    the turn. A deploy needs the user's explicit, in-the-moment instruction.

## Files touched

| File | Change |
|---|---|
| `src/data/admissionsPrograms/providence-day.ts` | edit — delete `guide.rules[2]` (the `Not published ≠ deficient.` object) |
| `src/data/admissionsPrograms.ts` | edit — JSDoc on `rules` drops "three" |
| `src/components/AdmissionsProgram.tsx` | edit — comment drops "three"; no logic change (the map is data-driven) |
| `src/index.css` | edit — `.ad-rules` `grid-template-columns: 1fr 1fr 1fr` → `1fr 1fr`, comment updated |
| `src/data/overlays/work/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit ×9 — splice out stamps `0e93db6b` and `4860d402` (151 → 149 entries) |
| `src/data/overlays/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | regenerated ×9 — rebuilt from the spliced work files |
| `.claude/plans/INDEX.md` | edit — flip this plan's row to Implemented + PR link |
| `.claude/plans/removenotpublisheddeficient.md` | edit — status → implemented, `prs` filled |

## Verification

Run in this order. The first two are the ones that catch the overlay mistake.

- [ ] `npm run check:live` — exit 0 for all nine locales. **This is the gate that catches a
      forgotten overlay splice.** A failure naming stamp `0e93db6b` or `4860d402` means step
      7 didn't run or didn't take.
- [ ] `npm run check:runtime` — exit 0. A `shipped stamp … has no matching English source`
      line means the work file and the overlay disagree (step 6 ran, step 7 didn't).
- [ ] `npm run check:sources` for each locale — the spliced work files' remaining `text` /
      `of` pairs must still agree; this proves the splice didn't corrupt neighbours.
- [ ] `npx tsc --noEmit` — clean.
- [ ] `npm run build` — **succeeds, and read the exit code**, not just the tail of the
      output. This chains `check:schema`, `check:live`, `check:chrome`, `check:runtime`,
      `check:spans` and the SEO/prerender steps. (`tsc --noEmit` has passed on a type error
      that `tsc -b` inside the build caught, so the build is the real check.)
- [ ] `npm run check:seo` — the pre-rendered admissions pages regenerate cleanly.

**Browser check — required, not a formality.** Every defect in this repo found after the
data read 100% has been render-layer. Run `npm run dev` and open Providence Day's admissions
card. Use `domcontentloaded`, **not** `networkidle` — the Latest News section fetches live so
the network never idles.

- [ ] **English** — the row shows exactly **two** rules, side by side, spanning the full
      card width with no empty third column and no orphaned icon. Confirm the calendar and
      clock icons are the ones rendering (not the info circle).
- [ ] **At least three locales, including one RTL** — e.g. `?lang=es`, `?lang=hi`, `?lang=ar`.
      The locale key is `csc.lang` / the `?lang=` query param, **not** i18next's default key;
      the wrong one fails silently and uniformly. Both surviving rules must render
      **translated**, not English — an English `One portal.` on the Spanish page means a
      neighbouring entry's stamp broke during the splice.
- [ ] **Narrow the viewport below 900px** — the row must still collapse to a single column
      (the untouched media query), now with two stacked rules.

## Risks

| Risk | Mitigation |
|---|---|
| Deleting the TS entry without touching the overlays → red build in nine locales | `check:live` is chained into `npm run build` and names the exact stamps; steps 6–7 are ordered before verification |
| Splicing the work files without rebuilding the overlays → `check:runtime` reports orphans | The `grep -l` in step 7 must print nothing before moving on |
| Re-running `i18n_extract.mjs --force` to "regenerate" → blanks all nine translated files | Explicitly forbidden in Decisions and Context; the operation is a splice + rebuild |
| A JSON rewrite re-escapes non-Latin scripts, producing a 9-file noise diff | `ensure_ascii=False` + the `git diff --stat` sanity check in step 6 |
| Matching by index instead of by stamp | Step 6 filters on `of`; the assert catches a 0-drop |
| Removing a *middle* rule later would reindex `rules[2]` → `rules[1]` and break the survivors' `at` paths | Not applicable here — we remove the **last** element, so no surviving path shifts. Recorded so a future removal knows to re-extract instead |

## Open questions

- Should the two surviving rules be **centred** in the row, or left-aligned filling the full
  width? The plan's `1fr 1fr` fills the full width, so each rule's text column roughly
  grows from ~1/3 to ~1/2 of the card. That is the literal reading of "spread the new extra
  space among the remaining 2". — **default:** `1fr 1fr`, full width, as written. If the
  user prefers the two rules kept at their current narrower measure and centred, that is a
  one-line follow-up (`grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 66%;
  margin-inline: auto;`) — do not pre-emptively build it.
