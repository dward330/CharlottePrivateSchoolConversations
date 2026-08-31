---
name: fixcharlottechristianadmissionsidecards
title: Remove Charlotte Christian's admissions watch-out cards and the "4 entry bands" tile, and cut the rule-card prose across all three admissions schools
status: implemented
phases: 2
created: 2026-08-31
branch: fix/cc-admissions-side-cards
prs: [258]
---

# Remove Charlotte Christian's admissions watch-out cards and the "4 entry bands" tile, and cut the rule-card prose

## Goal

Three trims to the Admissions research area, all requested by the user after reviewing the
rendered Charlotte Christian page:

1. **Delete all eight "watch-out" side cards** from Charlotte Christian — the bordered
   cards in the right column beside the application stepper, two per band across all four
   bands. The stepper then spans the full card width.
2. **Delete the `4 / entry bands, each with its own calendar` stat tile** from Charlotte
   Christian's 4-tile stat strip, leaving three tiles.
3. **Shorten the two rule-card paragraphs** (`guide.rules[*].text`) for **all three**
   schools that have an Admissions card — Charlotte Christian, Charlotte Country Day and
   Providence Day — to a consistent, much tighter density.

We know it worked when Charlotte Christian's Admissions section renders a full-width
stepper with no right-hand cards, three stat tiles, and two short rule cards; when
Providence Day and Country Day render two short rule cards and are otherwise unchanged;
and when `npm run build` is green in all ten locales with no English falling back.

## Context

### Where the three targets live

All three schools' Admissions data lives in `src/data/admissionsPrograms/<slug>.ts`, typed
by `src/data/admissionsPrograms.ts` and rendered by
`src/components/AdmissionsProgram.tsx`. Only three of the eleven schools have an Admissions
card at all: `charlotte-christian.ts`, `charlotte-country-day.ts`, `providence-day.ts`.

**1. The watch-out cards.** `AdWatchOut` is declared at
[src/data/admissionsPrograms.ts:86](src/data/admissionsPrograms.ts#L86) as
`{ kicker: string; text: string }`, and the band field at
[src/data/admissionsPrograms.ts:114](src/data/admissionsPrograms.ts#L114) is
`watchOuts: AdWatchOut[]` — **required, not optional**. It is rendered at exactly one
place, [src/components/AdmissionsProgram.tsx:298](src/components/AdmissionsProgram.tsx#L298),
inside `<div className="ad-watch">`, which is the right-hand child of `.ad-grid`. There is
**no second consumer** — the printable checklist page uses `checklistCallout` and
`checklistRows`, not `watchOuts`, so the checklist is entirely unaffected by this change.

Charlotte Christian's eight watch-outs sit at
[src/data/admissionsPrograms/charlotte-christian.ts:201](src/data/admissionsPrograms/charlotte-christian.ts#L201),
[:332](src/data/admissionsPrograms/charlotte-christian.ts#L332),
[:456](src/data/admissionsPrograms/charlotte-christian.ts#L456) and
[:588](src/data/admissionsPrograms/charlotte-christian.ts#L588) — two per band, four bands.

**2. The stat tile.** `stats` is typed at
[src/data/admissionsPrograms.ts:152](src/data/admissionsPrograms.ts#L152) as
`{ value: string; label: string }[]` and rendered by `AdmissionsStatBand` at
[src/components/AdmissionsProgram.tsx:410](src/components/AdmissionsProgram.tsx#L410).
The target is `stats[0]` at
[src/data/admissionsPrograms/charlotte-christian.ts:108](src/data/admissionsPrograms/charlotte-christian.ts#L108):

```ts
{ value: '4', label: 'entry bands, each with its own calendar' },
```

**3. The rule cards.** `rules[].text` for each school. Current lengths, measured:

| Entry | Chars | Note |
|---|---|---|
| `charlotte-christian:guide.rules[0].text` | 338 | longest — the user circled this one |
| `charlotte-christian:guide.rules[1].text` | 382 | longest — the user circled this one |
| `charlotte-country-day:guide.rules[0].text` | 236 | |
| `charlotte-country-day:guide.rules[1].text` | 202 | |
| `providence-day:guide.rules[0].text` | 160 | already near target |
| `providence-day:guide.rules[1].text` | 133 | already near target |

**Providence Day is effectively the house style already.** Aim the other two at its
density (~120–160 chars), and trim Providence Day's own two only lightly if at all.

### The CSS the layout change touches

`.ad-grid` at [src/index.css:5267](src/index.css#L5267) is
`grid-template-columns: 1.5fr 1fr` with the stepper left and `.ad-watch` right. At
[src/index.css:5499](src/index.css#L5499) a media query already collapses it to `1fr` on
narrow viewports, so a single-column `.ad-grid` is a shape the stylesheet already supports.

`.stat-strip` at [src/index.css:1128](src/index.css#L1128) is
`repeat(auto-fit, minmax(180px, 1fr))` — **it reflows to three tiles with no CSS change at
all.** No stylesheet edit is needed for the stat-tile removal.

### The translation layer — this is the hard part

The Admissions prose is translated into all nine locales in `PROSE_TRANSLATED`
([src/lib/i18n.ts:182](src/lib/i18n.ts#L182)): `es bn ht te fr fa it hi ar`. Each has a
shipped overlay `src/data/overlays/admissions.<lang>.json` and a work-file sibling
`src/data/overlays/work/admissions.<lang>.json`. **Both need every edit** — 2 × 9 = 18
files.

**How resolution actually works, because it decides the whole procedure.**
`indexOverlay()` at [src/lib/localizeData.ts:59](src/lib/localizeData.ts#L59) builds a
`Map` keyed by each **`at` path**; `walk()` at
[src/lib/localizeData.ts:132](src/lib/localizeData.ts#L132) looks a string up **by path**
and then uses the `of` stamp only as a staleness *guard*:

```ts
const hit = index.get(path)
if (!hit || hit.of !== stampFor(node)) return node   // fall back to English
return hit.t
```

So the runtime is **path-keyed with a stamp guard** — which means an array deletion that
shifts sibling indices breaks the *paths* of every survivor even though their stamps are
still perfectly valid. This is the difference between the two deletions in this plan:

- **The watch-outs delete cleanly.** Every band's `watchOuts` array is emptied *entirely*,
  so no sibling survives to be reindexed. Straight splice.
- **The stat tile does not.** Deleting `stats[0]` shifts `stats[1] → [0]`, `[2] → [1]`,
  `[3] → [2]`. The three survivors keep their stamps but change their paths, so their `at`
  entries must be **rewritten**, not just left alone.

**And two of those three survivors are shared with other schools**, measured from the work
file:

| Current path | Becomes | `at` array also contains |
|---|---|---|
| `charlotte-christian:guide.stats[1].label` | `…stats[0].label` | `charlotte-country-day:guide.stats[1].label` |
| `charlotte-christian:guide.stats[2].label` | `…stats[1].label` | `providence-day:guide.stats[2].label`, `charlotte-country-day:guide.stats[2].label` |
| `charlotte-christian:guide.stats[3].label` | `…stats[2].label` | *(none — Charlotte Christian only)* |

The extractor de-duplicates identical English into **one entry covering many paths**. So
for the first two rows you **cannot rename the path in place** — that would silently move
Country Day's and Providence Day's tiles to paths that do not exist in their data, and
their tiles would fall back to English with every checker still green. The correct
operation is to **edit only the Charlotte Christian element of the `at` array**, leaving
the other schools' paths untouched. The third row is Charlotte-Christian-only and is a
plain rename.

**Why a re-extract is the wrong tool.** `i18n_extract.mjs` emits `t: ''` for entries it has
not seen translated, which would **blank all nine translated files**. Never re-extract to
apply a deletion — splice and rewrite the work files by hand, then rebuild. This is the
lesson from PR #248, the last plan that deleted a translated data string.

**The builder is a pure pass-through**, confirmed by reading
[scripts/i18n_build_overlay.mjs](scripts/i18n_build_overlay.mjs): it copies `{t, of, at}`
straight through and drops only entries with an empty `t`. So editing the **work** file and
rebuilding is sufficient — there is no separate transform to satisfy.

**The rule-card shortening is a rewrite, not a deletion**, so it takes the ordinary
English-then-translate path: change the English, the stamp changes, the old overlay entry
becomes unresolvable, and a fresh translation is written against the new stamp. Six
strings × nine locales.

**One entry in the rules block must NOT be touched.**
`guide.rules[0].title` — the string `'One portal.'` — is a single overlay entry whose `at`
covers **all three schools**. Likewise `guide.rules[1].title` (`'Dates are cycle-specific.'`)
covers Providence Day and Country Day. Editing a title would ripple into schools outside
this plan's intent. **Shorten only the `.text` fields; leave every `.title` exactly as it
is.** Charlotte Christian's `rules[1].title` is its own 63-char string and is likewise
left alone.

### Checks that will catch a mistake here

- `npm run check:live` (chained into `npm run build`) exits 1 on any shipped overlay entry
  whose stamp no longer occurs in live English. This is what makes the deletion procedure
  mandatory rather than optional.
- `npm run check:runtime` recomputes every stamp from the work file's `text`.
- Neither check verifies that an `at` **path** still exists in the data — that failure mode
  is silent, renders English, and is only visible in a browser. Hence the browser check in
  Verification.

## Decisions

- **Empty the `watchOuts` arrays; do not delete the field or change the type** — `watchOuts:
  AdWatchOut[]` stays required, and Charlotte Christian ships `watchOuts: []`. Making the
  field optional would be a wider type change touching two schools that still use it, for
  no benefit; the render guard is a length check either way.
- **`.ad-grid` collapses to one column when the band has no watch-outs** — user's choice.
  The rule keys off "this band has no watch-outs", so it is automatic for any future school
  in the same position, and Providence Day / Country Day are untouched.
- **The collapse is driven by a modifier class from the component, not by `:empty`** — the
  `.ad-watch` div is not rendered at all when the list is empty, so `:empty` would never
  match. `AdmissionsProgram.tsx` adds `is-wide` to `.ad-grid` and skips the `.ad-watch`
  wrapper entirely.
- **No CSS change for the stat strip** — `repeat(auto-fit, minmax(180px, 1fr))` already
  reflows to three tiles.
- **Shorten `rules[].text` for all three schools, but never `rules[].title`** — the titles
  are shared overlay entries across schools (see Context).
- **Providence Day's rule text is the density target (~120–160 chars)** — it is already
  there, so it is trimmed only if a genuine redundancy shows up, not to hit a number.
- **The printable checklist is not touched** — `checklistCallout` and `checklistRows` are
  separate fields with no dependency on `watchOuts`. Charlotte Christian's checklist callouts
  restate some of the same facts, and that is deliberate: the paper sheet is a standalone
  artifact.
- **Facts removed with the watch-outs are not relocated into the steps** — the user asked
  for the cards gone, not for their content preserved elsewhere. Most of the material is
  already carried by `steps[].detail` and the checklist callouts.

## Approvals needed

**None.** All three changes *remove* or *shorten* existing surface — no new card, section,
stat tile, Compare row, metric key or topic, so the UX-design gate does not apply. The
`.ad-grid` modifier class is a layout consequence of a removal the user explicitly asked
for, in a shape the stylesheet already supports at narrow widths.

The user has already chosen, during planning: full-width stepper (over leaving dead space),
delete the overlay entries (over English-only), rule-card text only (over also cutting the
headline and spine note), and all three schools for the shortening (over Charlotte Christian
alone).

## Source material

None. This plan removes and shortens existing prose; it fetches no new school data and
ingests nothing. The underlying research files under
`source-material/admissions/charlotte-christian/` are **left exactly as they are** — they
are the provenance record of what the school publishes, and they stay complete even when the
app presents less of it.

## Out of scope

- Providence Day's and Country Day's **watch-out cards** — they keep all six.
- Providence Day's and Country Day's **stat tiles** — unchanged.
- Every `rules[].title`, on all three schools.
- Charlotte Christian's `guide.headline` and `guide.spineNote` — the user considered and
  explicitly declined shortening these.
- The printable checklist pages.
- The `unpublished` flag, the deadline strip, the financial-aid strip, and the band selector.
- Deploying. Merging is not publishing.

## Steps

Two phases — Phase 1 changes user-facing English prose, Phase 2 propagates to nine locales.

### Phase 1 — English

1. **Branch.** `git checkout main && git pull && git checkout -b fix/cc-admissions-side-cards`.

2. **Empty Charlotte Christian's watch-outs.** In
   `src/data/admissionsPrograms/charlotte-christian.ts`, replace each of the four
   `watchOuts: [ … ]` blocks (lines ~201, ~332, ~456, ~588) with `watchOuts: [],`.
   Delete the eight objects entirely — do not comment them out. Confirm afterwards that
   `grep -c 'kicker:' src/data/admissionsPrograms/charlotte-christian.ts` prints `0`.

3. **Record why, in the file's header comment.** Add a short note to the block comment at
   the top of `charlotte-christian.ts` stating that the watch-outs were removed at the
   user's request on 2026-08-31 and that `watchOuts: []` is deliberate rather than
   unresearched — the same way the file already records the Statement of Faith finding.
   Without this a later pass reads four empty arrays as a gap to backfill.

4. **Delete the stat tile.** In the same file, remove
   `{ value: '4', label: 'entry bands, each with its own calendar' },` from the `stats`
   array (line ~108), leaving three tiles.

5. **Collapse the grid when a band has no watch-outs.** In
   `src/components/AdmissionsProgram.tsx` around
   [line 295](src/components/AdmissionsProgram.tsx#L295), replace the unconditional
   `.ad-grid` / `.ad-watch` block with a guarded one:

   ```tsx
   const hasWatch = band.watchOuts.length > 0
   …
   <div className={`ad-grid${hasWatch ? '' : ' is-wide'}`}>
     <Stepper band={band} />
     {hasWatch && (
       <div className="ad-watch">
         {band.watchOuts.map((w) => ( … unchanged … ))}
       </div>
     )}
   </div>
   ```

   Skip the `.ad-watch` wrapper entirely rather than rendering it empty — an empty flex
   column still consumes a grid track.

6. **Add the modifier rule to the stylesheet.** In `src/index.css`, immediately after the
   `.ad-grid` block at [line 5267](src/index.css#L5267), add:

   ```css
   /* A school with no watch-outs (Charlotte Christian) gives the whole card
      width to the stepper rather than leaving an empty right-hand track. */
   .ad-grid.is-wide { grid-template-columns: 1fr; }
   ```

   Leave the existing narrow-viewport rule at
   [line 5499](src/index.css#L5499) alone — it already sets `1fr` and the two agree.

7. **Shorten the six rule texts.** Rewrite `guide.rules[0].text` and
   `guide.rules[1].text` in all three of
   `src/data/admissionsPrograms/charlotte-christian.ts`,
   `src/data/admissionsPrograms/charlotte-country-day.ts` and
   `src/data/admissionsPrograms/providence-day.ts`, targeting ~120–160 characters each —
   Providence Day's current density. **Do not touch any `rules[].title`.**

   Rules for the rewrite:
   - Keep every **figure, date, proper noun and portal name** char-for-char (`myCCS`,
     `Veracross`, `Charger Commons`, `2026–27`, `2027–28`, `Charlotte Area Independent
     Schools`). A figure is never re-typed.
   - Keep any **direct quotation** intact or drop it entirely — never paraphrase inside
     quotation marks. Charlotte Christian's `rules[1].text` quotes the school
     ("maintains rolling admissions where grade level space permits"); the quote is the
     evidentiary core of the rule, so keep it and cut the framing around it.
   - Preserve the `**bold**` markup convention that `Emphasized` parses.
   - Do not invent facts to fill space, and do not preserve a fact by moving it elsewhere —
     cutting is the point.

   Suggested Charlotte Christian targets, to be refined in the writing:
   - `rules[0].text` (338 → ~110): *"Everything runs through myCCS — inquire, apply, upload
     documents, and get your decision, all in one place."*
   - `rules[1].text` (382 → ~150): *"Every date below is the 2026–27 cycle. These are the
     CAIS priority dates; after them the school "maintains rolling admissions where grade
     level space permits.""*

8. **Verify Phase 1** per the Verification section below, including the browser check.

9. **Commit** with explicit paths — never `git add -A`, per the git standard. Expect exactly
   five files: the three data files, the component, and the stylesheet.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** The rule-card
rewrites are new English prose, and their wording must be confirmed before it is multiplied
by nine. Nothing below runs until the user confirms.

### Phase 2 — Every other locale

Nine locales, per `PROSE_TRANSLATED` in [src/lib/i18n.ts:182](src/lib/i18n.ts#L182):
`es bn ht te fr fa it hi ar`. This is the **overlay** layer, not `src/locales/*.json` — no
UI chrome changes in this plan. See
[`.claude/docs/prose-translation-architecture.md`](.claude/docs/prose-translation-architecture.md)
for the mechanism, and the per-locale rollout docs in `.claude/docs/` for each language's
register rules and traps.

**Never run `i18n_extract.mjs` to apply any of this** — it emits `t: ''` and would blank all
nine files. Every edit below is a scripted, surgical edit to the work files followed by a
rebuild.

10. **Write one script that does all three work-file operations**, run over each of the nine
    languages against `src/data/overlays/work/admissions.<lang>.json`. Write it to the
    scratchpad, not into the repo. Load and dump with 2-space indent, `ensure_ascii=False`
    (or `JSON.stringify(j, null, 2) + '\n'` in Node), and a trailing newline, or the
    non-Latin scripts re-escape into a whole-file noise diff.

    **(a) Splice out the 16 watch-out entries**, matching on the **`of` stamp**, never the
    array index:

    ```
    b2e6fc3d  6dad4f4f  2ae6c12a  1a00cacb   (band 0 — JK/K)
    48c627ae  90db7d86  74152332  70832918   (band 1 — Grade 1)
    dfba6a6a  8e09060a  17ec4e33  c5c39583   (band 2)
    cc14d076  a221bcb2  8609f0d2  3f10f567   (band 3)
    ```

    All 16 are Charlotte-Christian-only entries — verified: no `at` array among them names
    another school, so each is removed whole. **Assert a drop count of exactly 16 per
    language**; a silent 0-drop leaves the build red for a confusing reason.

    **(b) Remove the deleted stat tile and re-path its three survivors.** Remove the entry
    with stamp `1e27eb52` (`'entry bands, each with its own calendar'`, Charlotte-Christian-only,
    so removed whole). Then, **operating on the `at` array element-wise**:

    | Stamp | Edit |
    |---|---|
    | `0a55ba87` | replace `charlotte-christian:guide.stats[1].label` → `…stats[0].label`; **leave `charlotte-country-day:guide.stats[1].label` untouched** |
    | `0115e4c6` | replace `charlotte-christian:guide.stats[2].label` → `…stats[1].label`; **leave the providence-day and charlotte-country-day paths untouched** |
    | `64501c19` | replace `charlotte-christian:guide.stats[3].label` → `…stats[2].label` (sole path) |

    Assert each replacement fired exactly once per language. Rewriting a whole `at` array
    instead of one element is the mistake that silently breaks two other schools' tiles.

    **(c) Blank the six rewritten rule texts.** For each of the six old stamps, set `t: ''`
    (rather than deleting the entry) so the builder drops it from the shipped overlay while
    the work file keeps a slot to translate into. Current stamps:
    `6f367afa` and `843809fb` (Charlotte Christian), plus the two Country Day and two
    Providence Day `rules[*].text` entries — **re-read these from the work file at
    implementation time rather than trusting a stamp transcribed here**, since they must
    match the English as it stood before step 7.

    Then add a fresh entry per rewritten string with the **new** stamp (computed via
    `scripts/i18n_stamp.mjs`), the new English in `text`, the correct `at` path, and `t: ''`
    ready for translation.

11. **Translate the six rewritten rule texts into all nine locales.** Follow each locale's
    rollout doc. The standing traps apply: figures and portal names copied char-for-char and
    never re-typed; lakh/crore grouping is a **render-time** concern for `hi`/`te` so the
    data still stores the English 3-3-3 figure; `fa` and `ar` are RTL but store **no** bidi
    isolates — those are applied at render.

12. **Rebuild all nine overlays.** For each language:
    `node scripts/i18n_build_overlay.mjs --topic admissions --lang <lang>`.
    The builder is a pass-through, so the shipped file simply mirrors the edited work file
    minus empty-`t` entries.

13. **Prove the deletions are gone.** For each of the 17 removed stamps,
    `grep -l '<stamp>' src/data/overlays/{,work/}admissions.*.json` must print **nothing**.
    Also confirm no `charlotte-christian:guide.stats[3]` or `…watchOuts` path survives
    anywhere under `src/data/overlays/`.

14. **Verify Phase 2** per the Verification section, then commit and open **one PR carrying
    both phases**, per the repo's standing two-phase-one-PR rule. Pass the body via
    `--body-file`, never a heredoc.

15. **Merge** (`gh pr merge --squash --delete-branch` — pre-authorized), then
    `git checkout main && git pull`. Flip the row in `.claude/plans/INDEX.md` to
    *Implemented* with the PR link. **Do not deploy** — publishing is a separate act needing
    the user's explicit say-so in the moment.

## Files touched

| File | Change |
|---|---|
| `src/data/admissionsPrograms/charlotte-christian.ts` | edit — four `watchOuts` arrays emptied, `stats[0]` deleted, two `rules[].text` shortened, header note added |
| `src/data/admissionsPrograms/charlotte-country-day.ts` | edit — two `rules[].text` shortened |
| `src/data/admissionsPrograms/providence-day.ts` | edit — two `rules[].text` shortened (lightly; already near target) |
| `src/components/AdmissionsProgram.tsx` | edit — `.ad-watch` rendered only when the band has watch-outs; `is-wide` modifier on `.ad-grid` |
| `src/index.css` | edit — one new rule, `.ad-grid.is-wide { grid-template-columns: 1fr; }` |
| `src/data/overlays/work/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — 17 entries spliced, 3 `at` paths re-pathed element-wise, 6 rule texts re-stamped and re-translated |
| `src/data/overlays/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | rebuilt from the work files |
| `.claude/plans/INDEX.md` | edit — status flipped to Implemented with the PR link |

**No type change** to `src/data/admissionsPrograms.ts` — `watchOuts` stays required, and
Charlotte Christian ships an empty array.

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean. **Also read `npm run build`'s exit code**; `--noEmit` has
      passed on a type error the build caught.
- [ ] `npm run build` — succeeds. This chains `check:live`, `check:runtime`, `check:schema`
      and `check:seo`. **Expect it to be RED at this point**, and expect the failure to be
      `check:live` reporting the 17 deleted-English stamps plus the 6 rewritten ones as
      unresolvable. That is the correct Phase-1 state — Phase 2 clears it. A build that is
      *green* here means the deletions did not land.
- [ ] `grep -c 'kicker:' src/data/admissionsPrograms/charlotte-christian.ts` → `0`.
- [ ] `grep -c 'entry bands' src/data/admissionsPrograms/charlotte-christian.ts` → `0`.
- [ ] Every `rules[].text` across the three files is ≤ ~170 chars; every `rules[].title` is
      byte-identical to `main`
      (`git diff main -- src/data/admissionsPrograms/ | grep '^[-+].*title:'` prints nothing).
- [ ] **Browser check** (`npm run dev`, Charlotte Christian's page, Admissions section).
      Two traps: the Admissions card sits inside a collapsed `<details>`, so force
      `document.querySelectorAll('details').forEach(d => d.open = true)` before measuring;
      and use `domcontentloaded`, **not** `networkidle` — the Latest News section fetches
      live and the network never idles. Confirm:
      - No `.ad-watch-card` in the DOM on **any** of the four bands — click through all four.
      - `.ad-grid` carries `is-wide` and computes to a single column; the stepper spans the
        full card width with no dead track.
      - The stat strip shows **three** tiles, evenly filling the row with no ragged gap.
      - Both rule cards render short, and their bold spans still render as `<strong>` — a
        stray `**` means the markup convention was broken in the rewrite.
- [ ] Providence Day and Country Day still render **three** watch-out cards each in a
      two-column grid — the regression this change could plausibly cause.

### Phase 2 — Locales

- [ ] `npm run check:live` — exit 0. This is the gate the deletion procedure exists for.
- [ ] `npm run check:runtime` — exit 0; every overlay stamp resolves.
- [ ] `npm run check:sepdrift -- --lang <code>` for each of the nine — exit 0. It reads the
      **work** files, so a stale work file escapes it; step 10 edits both.
- [ ] `npm run check:figures` / `check:money` / `check:currency` — unchanged from `main`.
- [ ] `npm run build` — green end to end.
- [ ] `git diff --stat` on the overlays shows a **surgical** diff. A whole-file reformat on
      `bn`/`te`/`hi`/`fa`/`ar` means the JSON dump options were wrong (step 10) — fix the
      dump and redo rather than committing the noise.
- [ ] **Browser check in a non-English locale** — load Charlotte Christian's Admissions
      section at `?lang=es` and again at `?lang=hi`. The locale key is **`csc.lang`
      / `?lang=`**, not i18next's default; the wrong one fails silently and uniformly.
      Confirm the three stat tile **labels** are translated — that is the direct test of the
      element-wise `at` re-pathing in step 10(b), and the one failure mode no checker sees.
- [ ] **Check Country Day and Providence Day at `?lang=es` too** — their `stats[1]` and
      `stats[2]` labels share overlay entries with Charlotte Christian's re-pathed tiles. If
      step 10(b) rewrote a whole `at` array instead of one element, their tiles render
      English while every check stays green. This is the single highest-value check in the
      plan.

## Risks

| Risk | Mitigation |
|---|---|
| Re-pathing `stats` clobbers Country Day's / Providence Day's shared `at` entries — silent English fallback, all checks green | Edit the `at` array **element-wise**, assert one replacement per language, and check both other schools in a browser at `?lang=es` (last Verification item) |
| A re-extract is used to apply the deletions, blanking all nine locales | Step 10 states the prohibition explicitly; the work-file edit is scripted and asserts its drop counts |
| Non-Latin work files reformat into an unreadable diff | 2-space indent + `ensure_ascii=False` + trailing newline; `git diff --stat` is a Phase-2 check |
| Shortening a rule paraphrases inside a quotation, or re-types a figure | Step 7 forbids both; `check:sepdrift` and `check:figures` guard the figures, and the quote rule is a review item |
| `check:live` red at the end of Phase 1 is mistaken for a broken build | Verification names it as the *expected* Phase-1 state and says a green build there means the deletions did not land |
| A later pass reads `watchOuts: []` as an unresearched gap and backfills it | Step 3 records the removal and its date in the file's header comment |

## Open questions

- Whether Providence Day's two rule texts (160 / 133 chars) need trimming at all, given they
  already sit at the target density. — **default:** leave them as they are, and note in the
  PR body that they were reviewed and found already compliant. The user asked for
  consistency, and they are the standard the other two are being cut toward.

## Implementation notes

### Phase 1 — three corrections to the plan as written

1. **`rules[].text` has NO markdown support — step 7's "preserve the `**bold**` markup
   convention" is wrong.** The rules block renders raw at
   [src/components/AdmissionsProgram.tsx:250](src/components/AdmissionsProgram.tsx#L250) as
   `<strong>{r.title}</strong> {r.text}` — no `Emphasized` wrapper — so a `**bold**` span
   here ships as literal asterisks. `charlotte-christian.ts`'s own header comment already
   records this, and the plan's Context contradicted it. All four rewrites are therefore
   plain prose with no `**`; the browser check asserted `stray: false` on every rendered
   rule.

2. **`grep -c 'kicker:' → 0` is not the right assertion.** `kicker` is not unique to
   watch-outs — `comparison`, `contacts`, `checklist.aidPanel` and `checklist.contactPanel`
   each carry one, so the file still holds four legitimately. The deletion was verified
   instead by `git diff | grep -c '^-.*kicker:'` → **8** (the eight watch-out objects) and
   by all four bands reporting `watchOuts.length === 0`.

3. **Providence Day was left untouched**, per the plan's own Open-questions default. Its two
   rule texts (160 / 133 chars) were reviewed against the rewritten Charlotte Christian
   (153 / 219 incl. title) and Country Day (166 / 171 incl. title) cards and are already at
   or below the target density — they *are* the standard the other two were cut toward, so
   trimming them would have moved the target rather than met it.

**Charlotte Christian's `rules[1].text` is 155 chars, above the ~120–160 midpoint but at
the ceiling**, because the plan requires the school's direct quotation
("maintains rolling admissions where grade level space permits") kept intact rather than
paraphrased. The framing around it was cut to `CAIS` — the bare abbreviation the card
already uses in eight other places and expands once, in the Grades 2–4 testing step.

### Phase 1 verification results

- `npx tsc --noEmit` — exit 0.
- `npm run build` — **exit 1, as the plan predicts**, with `check:live` reporting exactly
  **21 unresolvable shipped entries per locale** across all nine: 16 watch-outs + 1 stat
  tile + 4 rewritten rule texts. A green build here would have meant the deletions did not
  land. Phase 2 clears this.
- Browser check (Playwright, 1440×1000, `domcontentloaded`, all `<details>` forced open),
  all four Charlotte Christian bands: `.ad-grid` carries `is-wide`, computes to a single
  `924px` column, `.ad-watch-card` count **0**, `.ad-watch` wrapper count **0**, stepper
  width **924px** = full grid width.
- Stat strip renders **three** tiles; the "entry bands" tile is gone.
- Both rule cards render their titles as `<strong>` with no stray `**`.
- **Regression check passed** — Providence Day and Country Day both still render **2
  watch-out cards on every band** in a two-column `542px / 361px` grid.
- `git diff main -- src/data/admissionsPrograms/ | grep '^[-+].*title:'` prints nothing —
  no `rules[].title` was touched, so the shared cross-school overlay entries are intact.

### Added during Phase 1 review — the financial-aid strip

The user asked for Charlotte Christian's `aid.text` to be shortened too, after seeing it
rendered. The plan lists the financial-aid strip under **Out of scope**, so this is a
deliberate, user-requested extension of Phase 1 rather than plan drift — recorded here so
Phase 2 knows to expect a fifth re-stamped string.

**792 → 320 chars**, cut on the same reasoning the plan applies to the watch-outs: every
fact removed is carried in full by the printable checklist's `aidPanel` (all five items)
and by the links block, and the paper sheet is the standalone artifact. What stays is what
a parent must act on — the platform and school code to start with, the mandatory second
application, and the unpublished deadline. What goes is the two long direct quotes about
timing (dropped **entirely** rather than paraphrased, per the plan's quote rule) and the
"completing early matters" gloss they supported.

**Unlike `rules[].text`, `aid.text` DOES go through `Emphasized`**
([AdmissionsProgram.tsx:331](src/components/AdmissionsProgram.tsx#L331)), so `**bold**` is
real markup here and was preserved. The two fields are adjacent on the same card and
behave oppositely — worth knowing before editing either.

Browser-verified: 6 bold spans render as `<strong>`, no stray `**`, strip height 107px
(Providence Day 88px, Country Day 127px — it is no longer the outlier). Country Day's and
Providence Day's aid strips were left untouched.

### Also added during Phase 1 review — the two URL-less source notes

The user asked for Charlotte Christian's two `Retrieved Aug 2026.` source-row paragraphs to
go: one recording that no faith-based application component is published, one listing what
the school does not publish (current-cycle aid deadline, waitlist, legacy/faculty-child
preference, sibling preference beyond the JK–K track, re-application, transfer, mid-year
entry, visa/I-20/SEVIS, 2027–28 dates and tuition). Also out of scope in the plan, so also
recorded here as a user-requested extension.

`AdSource.url` is **optional**, so these are a clean data-only deletion — no type change and
no component change; `SourceRow` already renders a URL-less entry as a plain `<span>` and
only bails at `sources.length === 0`. **All twelve cited URL sources are untouched**, so the
citation surface the repo's standard cares about is intact — what went was prose sitting in
a row of links.

Checked before cutting, per the no-orphaned-findings rule: **neither note was the only
record.** The faith finding is stated in this file's header comment and rendered to users in
the Grades 5–12 questionnaire step ("Nothing published describes it as a faith
questionnaire"); each not-published item is already named where it matters, the aid strip
carrying the unpublished-deadline warning in its own text. The research file under
`source-material/admissions/charlotte-christian/` remains the full record either way. A
header note records the removal so a later pass does not restore them as missing provenance.

Browser-verified: Charlotte Christian's admissions source row is now **12 links and zero
prose spans**. Country Day and Providence Day each keep their single note, untouched.

### Note for Phase 2 — MEASURED, supersedes step 10's counts

The English is approved (user, 2026-08-31), so Phase 2 is clear to run. Phase 1 grew past
the plan during review, so **step 10's counts are stale**. The authoritative worklist is
`node scripts/check_live_resolution.mjs --verbose`, which reports **22 unresolvable stamps
per locale**, identically across all nine — not the 17 the plan predicts. Note the checker
**exits at the first failing locale**, so a per-locale total needs it re-run after each fix,
and its default output is **display-capped**; use `--verbose` or the count is short.

The 22, verified against the `fr` overlay:

| Count | What | Operation |
|---|---|---|
| 16 | watch-outs — the exact stamps in step 10(a) | splice out whole; all Charlotte-Christian-only |
| 1 | stat tile `1e27eb52` | splice out whole, then re-path its three survivors **element-wise** per step 10(b) — unchanged, still the highest-risk item |
| 4 | rule texts: `6f367afa` + `843809fb` (Charlotte Christian), `96717b90` + `7f009b04` (Country Day) | blank `t`, re-stamp, re-translate |
| 1 | aid text `74172915` (Charlotte Christian) | blank `t`, re-stamp, re-translate |

So it is **five** strings to re-translate, not six. Two corrections to step 10(c): Providence
Day was **not** rewritten, so its two `rules[*].text` entries stay exactly as they are; and
Charlotte Christian's `aid.text` is a fifth string the plan never anticipated.

**The two deleted source notes need NO overlay work.** `sources[].label` is not extracted —
there is no `charlotte-christian:guide.sources[*].label` path in any work file, so the
source row is never translated in any locale. Do not go looking for their stamps; they do
not exist.

**`aid.text` renders through `Emphasized`**, so its `**bold**` markup is real and must be
carried into all nine translations — unlike `rules[].text`, which renders raw. Getting this
backwards ships literal asterisks in one field or drops emphasis in the other.

### Phase 2 — shipped, and three notes on the plan's Phase-2 steps

Ran clean against the measured worklist above: **22 stamps per locale, identical across all
nine**, 461 → 444 entries per work file. The surgery script asserted its own counts (17
splices, 3 element-wise re-paths firing exactly once each, 5 re-stamps) and refused to splice
any entry whose `at` named a school other than Charlotte Christian.

**The element-wise re-path — the plan's highest-risk item — held.** Verified in a browser at
`?lang=es`/`hi`/`ar`: Charlotte Christian renders **three translated** stat tiles, while
Country Day and Providence Day still render **four translated** tiles each. Their shared `at`
entries (`0a55ba87`, `0115e4c6`) kept every non-Charlotte-Christian path.

Three corrections to step 10 as written:

1. **`check:figures` is not an npm script.** The Verification section names it as though it
   were; it is `python3 scripts/check_figures.py --topic admissions --lang <code>`. Run per
   locale — 444 strings each, figures intact in all nine.

2. **Re-stamping in place beats delete-then-add.** Step 10(c) says to set `t: ''` on the old
   entry and *add a fresh entry* with the new stamp. Mutating the existing entry's `of` /
   `text` / `t` instead keeps it at its original array position, which is what makes the diff
   145–172 lines per file rather than a reshuffle. The builder is a pass-through either way.

3. **Providence Day's `stats` were never at risk from the rules work, but its tiles were.**
   The plan flags the shared-`at` risk on the stat entries only in the abstract; the concrete
   confirmation is that `0115e4c6` covers `providence-day:guide.stats[2].label`, so the
   browser check on Providence Day is not a courtesy regression test — it is the only place
   that failure mode is visible.

**No new leaks.** `i18n:leaks` totals are byte-identical to the pre-Phase-2 state in all nine
locales (es 162, bn 187, ht 179, te 363, fr 296, fa 165, it 344, hi 247, ar 173), and none of
the five rewritten paths or three re-pathed stat paths appear in any locale's report.

Translations reuse each locale's already-reviewed renderings of the terms that survived the
cut — including the direct quotation in `rules[1]`, which was lifted verbatim from the
existing reviewed translation rather than re-translated. That keeps the shortened prose
consistent with the surrounding shipped text and keeps the quote inside the plan's no-
paraphrase rule.
