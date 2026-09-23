---
name: cannonUpdate
title: Remove three editorial caveat blocks from Cannon's College Support outcomes card
status: english-done
phases: 2
created: 2026-09-22
branch: fix/cannon-update
prs: []
---

# Remove three editorial caveat blocks from Cannon's College Support outcomes card

## Goal

Delete three blocks of hedging prose from Cannon School's College Support "outcomes" card
(card 1c, *Where Graduates Go*): the bucket-counts note, the "Honest caveat" paragraph,
and the "TO VERIFY" flag. All three are editorial apparatus about how the data was
derived rather than findings a parent needs. After this, the card renders its stats,
bucket table, acceptance list and sources with no note, no caveat paragraph, and no flag
chip — in all ten locales.

Success looks like: those three passages appear nowhere in the rendered Cannon page in
any locale, `npm run build` is green (which runs `check:live` and `check:runtime`, the
two gates that would catch a stranded overlay entry), and no other school's card changes.

## Context

All three targets live in one object — the `outcomes` export of
[`src/data/collegeSupportPrograms/cannon.ts`](../../src/data/collegeSupportPrograms/cannon.ts):

| Field | Line (approx.) | Rendered as |
|---|---|---|
| `outcomes.bucketsNote` | 599–600 | `<Note>` under the bucket table |
| `outcomes.caveat` | 612–613 | `<p class="cs-note">` prefixed by the bold **Honest caveat:** label |
| `outcomes.flags[0]` | 614–618 | the `TO VERIFY` chip + text, via `<Flags>` |

The renderer is
[`src/components/CollegeSupport.tsx`](../../src/components/CollegeSupport.tsx) — the 1c
block around lines 640–692. **No component change is needed**, because all three degrade
cleanly on their own:

- `bucketsNote` is rendered `{data.bucketsNote && <Note … />}` (line 655) and typed
  optional (`bucketsNote?: string`, `src/data/collegeSupport.ts:318`).
- `caveat` is rendered `{data.caveat && …}` (line 682) and typed optional
  (`caveat?: string`, `src/data/collegeSupport.ts:333`).
- `flags` is **required** (`flags: CsFlag[]`, `src/data/collegeSupport.ts:334`, no `?`),
  but `Flags()` returns `null` on an empty array (`src/components/CollegeSupport.tsx:77`).
  So set `flags: []` — **do not delete the key** and do not change the type.

**Overlay footprint — measured, not assumed.** Each of the nine prose locales carries
exactly three entries for these paths, with identical stamps everywhere:

| Path | Stamp |
|---|---|
| `cannon:outcomes.bucketsNote` | `93f1ff47` |
| `cannon:outcomes.caveat` | `66301b34` |
| `cannon:outcomes.flags[0].text` | `43f2f993` |

That is 3 × 9 = **27 entries in `src/data/overlays/work/college-support.<lang>.json`**
and the same 27 in the built `src/data/overlays/college-support.<lang>.json`.

Two facts that make this safe, both verified during planning:

- **Each stamp is Cannon-only.** No entry's `at` array pairs these stamps with another
  school's path, so deleting them strands no other school. (Contrast
  `outcomes.buckets[*].tier`, where one entry's `at` lists all eleven schools — those are
  untouched here.)
- **The `flags[0]` index trap does not apply.** Deleting a row from an array normally
  stales the `at`-paths of every later sibling. Cannon's `outcomes.flags` has exactly one
  row and no `flags[1]` exists in any locale, so there is no sibling to renumber.

`check:runtime` reports `orphaned` entries (`scripts/check_runtime_resolution.mjs:173`) —
an overlay entry whose stamp no longer matches live English. That is the net which
catches a locale file missed in Phase 2, and it is chained into `npm run build`.

## Decisions

- **Remove the whole `bucketsNote`, not just the Columbia sentences** — user's explicit
  call (2026-09-22), chosen over the narrower option. Cannon becomes the only one of
  eleven schools whose bucket table carries no provenance line; that is accepted.
- **Leave every other mention of the Columbia ambiguity in place** — user's call. The Ivy
  bucket note (`'— Brown, Cornell, Penn; absent Harvard, Yale, Princeton, Dartmouth,
  Columbia'`) and the `'3 of 8'` stat tile both stay. They are consistent with the strict
  reading, so removing the caveat leaves no contradiction on the page.
- **`flags: []` rather than deleting the key** — `flags` is non-optional on the type, and
  `Flags()` already no-ops on an empty array. Emptying the array avoids touching
  `src/data/collegeSupport.ts`, which eleven schools share.
- **Two-phase, but Phase 1 has nothing to word** — see below. The English review is a
  *layout* review (does the card read right with three blocks gone), not a wording one.
- **No `source-material/` change** — this removes prose from the app layer only. The
  underlying research files under `source-material/college-support/cannon/` stay exactly
  as they are; the caveats remain true of the source data, they are just no longer
  surfaced. No ingest step.

## Approvals needed

**None.** This removes rendered elements rather than adding any — no new card, section,
stat tile, Compare row, metric key or topic, and no reordering. The UX-design gate
(`CLAUDE.md`) covers additions and reorderings; a deletion the user explicitly requested
is not gated.

Note that **deploying is still the user's separate call** and is out of scope here.

## Out of scope

- Any other school's `bucketsNote`, `caveat` or `flags` — ten other schools have these
  fields and all stay untouched.
- The Ivy bucket note and the `3 of 8` stat tile on Cannon (see Decisions).
- `src/data/collegeSupport.ts` — no type change.
- `src/components/CollegeSupport.tsx` — no renderer change.
- `source-material/**` — no ingest, no re-fetch.
- Deploying. Merge and stop.

## Steps

Two phases, per the standing English-first rule. **The split is unusual here and the
implementer should understand why before deciding to collapse it:** this plan adds no new
wording, so there is no phrasing to settle. What Phase 1 buys is a look at the *card with
three blocks removed* — whether the bucket table now ends abruptly, whether the sources
row reads as orphaned without the caveat above it. If that review says "put one back",
doing it before the nine overlay edits saves redoing them. Phase 2 is then mechanical.

### Phase 1 — English

1. **Branch** — `git checkout -b fix/cannon-update` from an up-to-date `main`.

2. **Delete `bucketsNote`** — in `src/data/collegeSupportPrograms/cannon.ts`, remove the
   `bucketsNote:` key and its string (approx. lines 599–600, the one beginning
   *"Counts are computed from the same list you can filter at right"*). Remove the whole
   key, not just part of the value.

3. **Delete `caveat`** — in the same file, remove the `caveat:` key and its string
   (approx. lines 612–613, beginning *"the headline list is explicitly “College
   Acceptances”"*).

4. **Empty `flags`** — in the same file, replace the `flags: [ … ]` array of the
   `outcomes` object (approx. lines 614–618, the `kind: 'verify'` entry beginning *"The
   profile’s bold “enrolled” markers"*) with `flags: []`. **Keep the key.** Make sure you
   are editing the `flags` belonging to `outcomes` — other cards in this file have their
   own `flags` arrays that must not change.

5. **Check the file header comment** — lines 14–23 of `cannon.ts` carry a
   "Two structural notes that shape what renders below" block describing the stale
   acceptance list and the PDF-extraction problem. Note 2 says *"The card says exactly
   that"*, which stops being true once step 4 lands. Update that comment so it describes
   what the file now does — the `enrolling` markers still come from the matriculation
   list, the card just no longer says so. This is a code comment, not user-facing text.

6. **Type-check and build** — `npx tsc --noEmit`, then `npm run build`. Expect
   `check:runtime` / `check:live` to **fail** at this point with orphaned or stale entries
   for the three stamps, because the overlays still carry them. That failure is the
   expected state between phases; note the exact counts and carry on to the review.

7. **Browser check the English card** — run the app, open Cannon → College Support, expand
   the *Where Graduates Go* card. Confirm: no note under the bucket table, no **Honest
   caveat** paragraph, no `TO VERIFY` chip, and that the stats / buckets / acceptance list
   / sources all still render. Screenshot it for the user.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing
below runs until they confirm the card reads right with the three blocks gone.

### Phase 2 — Every other locale

Only after that confirmation. Scope is the **overlay layer** (research prose), not the
`src/locales/*.json` chrome catalogs — nothing here is a chrome key. The nine locales are
`PROSE_TRANSLATED` in `src/lib/i18n.ts`: `es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`,
`ar`. Mechanism: `.claude/docs/prose-translation-architecture.md`.

8. **Delete the 27 work-file entries** — for each of the nine locales, in
   `src/data/overlays/work/college-support.<lang>.json`, remove from the `strings` array
   every entry whose `of` stamp is `93f1ff47`, `66301b34` or `43f2f993`. Match **by
   stamp, never by index** — the array order is not stable across locales. Three entries
   per file, 27 total.

   Round-trip the JSON before trusting any script that does this: read, re-serialize,
   diff against the original to prove the dump is faithful, *then* apply the deletion.
   (`strings` is an array; an entry's `at` is an array of path strings.)

9. **Rebuild the overlays** — `npm run i18n:build` to regenerate the nine
   `src/data/overlays/college-support.<lang>.json` files from the work files. If that
   script is per-locale, run it for each. Afterwards confirm the three stamps appear in
   **zero** files:
   `grep -l '93f1ff47\|66301b34\|43f2f993' src/data/overlays/*.json src/data/overlays/work/*.json`
   should print nothing.

10. **Full build** — `npm run build`. The `check:runtime` / `check:live` failures from
    step 6 must now be gone; orphaned count back to 0.

11. **Browser check two locales** — one Latin and one non-Latin/RTL (e.g. `es` and `ar`),
    via `?lang=es`. Confirm the three blocks are absent and the rest of the card renders
    in-language. The standing lesson is that render-layer defects survive every automated
    check.

12. **PR** — open one PR covering both phases, body via `--body-file`. Stage explicit
    paths (`git status --short` first); never `git add -A`. Squash-merge, then check out
    `main` and pull. **Do not deploy** — that is a separate instruction from the user.

## Files touched

| File | Change |
|---|---|
| `src/data/collegeSupportPrograms/cannon.ts` | edit — drop `outcomes.bucketsNote`, drop `outcomes.caveat`, set `outcomes.flags: []`, refresh the header comment |
| `src/data/overlays/work/college-support.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit ×9 — remove 3 entries each by stamp |
| `src/data/overlays/college-support.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | regenerated ×9 by `npm run i18n:build` |
| `.claude/plans/INDEX.md` | edit — flip status, add PR link |
| `.claude/plans/cannonUpdate.md` | edit — add implementation notes if the build deviated |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `grep -c "almost certainly means\|Honest caveat\|did not survive PDF" src/data/collegeSupportPrograms/cannon.ts` — 0 matches outside the header comment
- [ ] `npm run build` — expected to fail at `check:runtime`/`check:live` with orphans for the three stamps; record the counts
- [ ] Browser: Cannon → College Support → *Where Graduates Go* renders with no note, no caveat paragraph, no `TO VERIFY` chip; stats, buckets, acceptance list and sources intact

### Phase 2 — Locales

- [ ] The three stamps appear in **zero** files under `src/data/overlays/` (grep above)
- [ ] `npm run check:runtime` — 0 orphaned, 0 mismatched
- [ ] `npm run check:live` — clean
- [ ] `npm run build` — fully green
- [ ] Browser at `?lang=es` and `?lang=ar` — three blocks absent, rest of card in-language

## Risks

| Risk | Mitigation |
|---|---|
| Editing the wrong `flags` array — `cannon.ts` has several cards each with their own | Step 4 names the `outcomes` object explicitly; `tsc` will not catch this, so confirm by the surrounding `kind: 'verify'` text before deleting |
| Deleting overlay entries by index, corrupting unrelated rows | Step 8 mandates matching by stamp and round-tripping the JSON first |
| A locale file missed in step 8 | `check:runtime` reports it as an orphan and fails the build |
| Removing `flags` entirely instead of emptying it | `flags` is non-optional on `CsFlag[]`; `tsc -b` fails immediately. Trust `tsc -b`, not `tsc --noEmit` |
| Deploying as the last step of the merge loop | Explicitly out of scope — merge, say "ready to deploy whenever you want it", end the turn |

## Open questions

None. Both scope questions were settled with the user at planning time and are recorded
under Decisions.

## Implementation notes

### Scope grew during the Phase 1 review — two more removals, both user-requested

The user reviewed the rendered card mid-build and asked for two further blocks to go.
Both were added to Phase 1 rather than deferred, and both are recorded here because they
change the Phase 2 footprint.

**1. `wholeClass.supportNote` (Cannon only) — stamp `721d42a9`.**
*"Not published: how many students are on formal learning plans, whether accommodations
carry a fee, and specialist credentials."* Same layer and shape as the plan's original
three: Cannon-only research prose in `cannon.ts`, one overlay entry per locale, optional
on the type. Removed the same way. **Phase 2 therefore deletes 4 stamps × 9 locales = 36
work entries, not 27.**

**2. The acceptance-list link legend — a DIFFERENT layer, and it affects all 11 schools.**
*"282 college names link to their homepages."* This is **chrome**
(`collegeSupport.linkLegend`), not research prose: rendered by `CollegeSupport.tsx` for
every school's acceptance list, with keys in all ten `src/locales/*.json` catalogs. The
user was offered Cannon-only suppression (which would have needed a per-school
conditional in the component, against the standing "omission is absence of data" rule)
and **chose removal for every school**.

Removing it touched three things the plan did not anticipate:

- the render block in `src/components/CollegeSupport.tsx`;
- the `linkLegend*` keys in all ten catalogs — **24 keys, not 20**, because Arabic carries
  six CLDR plural forms (`zero`/`one`/`two`/`few`/`many`/`other`) where the other nine
  carry two;
- two pieces of now-dead code: the `const linked = useMemo(...)` that fed only the legend,
  and the orphaned `.cs-link-legend` CSS rule in `src/index.css`. The `↗` arrows and the
  `.cs-college-arrow` rule **stay** — the links still work, they are just no longer
  explained.

`npm run check:chrome` passes, which is the gate that would have caught a key removed
from `en.json` but left in the other nine.

### Two browser-check false positives worth not repeating

The first automated probe reported two failures that were both the probe's fault:

- **"acceptance list title MISSING"** — the title renders as `EVERY ACCEPTANCE,
  2022–2024`, uppercased by CSS, and the probe matched case-sensitively against the source
  string `'Every acceptance, 2022–2024'`. This is the `innertext-case-false-pass` trap
  already on record, in its inverted form.
- **"TO VERIFY chip PRESENT"** — ten `TO VERIFY` chips remain on the Cannon page, all
  belonging to other cards (the athletics funnel, NC admissions, AP exams, counselor
  ratio, GPA bands, After School, Summer). A whole-page `innerText` scan cannot answer a
  per-card question; scoping to the outcomes card container resolved it.

A third probe attempt selected the 18-character heading element as "the card" and reported
everything absent — an assertion that passes for the wrong reason. The container must be
climbed until it actually holds the acceptance list.

Also note `sources` renders behind a `SHOW SOURCES` toggle, so it is legitimately absent
from the card's `innerText` until expanded.
