---
name: hbcu-bucket
title: Add an HBCUs selectivity bucket and acceptance-list filter
status: in-progress
phases: 2
created: 2026-08-02
branch: feat/hbcu-bucket
prs: []
---

# Add an HBCUs selectivity bucket and acceptance-list filter

## Goal

Add a sixth row — **HBCUs** (Historically Black Colleges & Universities) — to the
Selectivity buckets table on every school's College Support page, showing how many of the
107 federally-designated HBCUs appear on that school's acceptance list (`n / 107`). At the
same time, add an **HBCUs** filter chip to the "Every acceptance" search area so a parent
can filter the acceptance list down to HBCUs, exactly as the existing Ivy League / Power
Four chips work. Done means: every school's bucket table has an HBCUs row with the right
count; every HBCU acceptance is tagged so the filter returns it; and the new row and its
note read correctly in all nine languages.

## Context

**The table.** Rendered by
[`CollegeSupport.tsx:490-517`](src/components/CollegeSupport.tsx#L490-L517). Each row
prints `b.tier` (plus optional `b.note`) in one cell and `b.count` verbatim in the other.
There is **no formatting logic** — `count` is a hand-authored string (`'8 / 8'` is typed
that way). Adding a bucket is purely a data edit: append a `{ tier, count, note }` object
to each school's `outcomes.buckets` array. The component, the `Bucket` type at
[`collegeSupport.ts:174`](src/data/collegeSupport.ts#L174), and the CSS are untouched.

**The filter chips.** `COLLEGE_FILTERS` at
[`collegeSupport.ts:201-208`](src/data/collegeSupport.ts#L201-L208) is the render-ordered
chip list. Each `College` carries a `cats: string[]` of the bucket keys it belongs to
([`collegeSupport.ts:187-198`](src/data/collegeSupport.ts#L187-L198)). `CollegeList`
([`CollegeSupport.tsx:401-479`](src/components/CollegeSupport.tsx#L401-L479)) shows a chip
only for a bucket some college on *this* school's list actually belongs to
(`available`, line 410-413), and filters the list by `c.cats.includes(filter)` (line 419).
So the filter works by: (a) a new `{ key: 'hbcu', label: 'HBCUs' }` entry in
`COLLEGE_FILTERS`, and (b) `'hbcu'` pushed onto the `cats` of every HBCU acceptance.

**The chip labels are hardcoded English — a pre-existing gap, deliberately left as-is.**
[`CollegeSupport.tsx:440`](src/components/CollegeSupport.tsx#L440) renders `{f.label}`
directly; the labels never pass through `t()` and appear in no locale file. So even in
Spanish the chips read "Ivy Plus", "Power Four" today. The new HBCUs chip inherits that
behaviour by design (see Decisions) — this plan does **not** fix the chip-i18n gap, and
"HBCUs" as an acronym is commonly left untranslated anyway. This is why Phase 2 touches the
**bucket row** (translated) but **not** the chip.

**Why this is two-phase.** `outcomes.buckets[].tier` **is a translated prose field** —
[`i18n_fields.mjs:260`](scripts/i18n_fields.mjs#L260) marks it prose, and
`src/data/overlays/college-support.*.json` carries a `.tier` entry per bucket index per
locale (verified: `buckets[0].tier` … `buckets[4].tier` all have overlay entries). Adding
`buckets[5]` creates a **new** translated path (`outcomes.buckets[5].tier`, and
`outcomes.buckets[5].note`) in all six schools. The tier string `"HBCUs"` and the note need
translating (or a deliberate no-op) in all eight non-English locales. New user-facing prose
→ English first, review, then translate. This is the standing repo rule, not a per-plan
choice.

**The counts.** Confirmed by exact full-name intersection of each school's `colleges`
array with the canonical HBCU roster (see Source material). Denominator **107** (DoE
designation), per the user's choice.

| School | File | HBCU count |
|---|---|---|
| Charlotte Country Day | [charlotte-country-day.ts](src/data/collegeSupportPrograms/charlotte-country-day.ts) | 18 |
| Providence Day | [providence-day.ts](src/data/collegeSupportPrograms/providence-day.ts) | 14 |
| Charlotte Christian | [charlotte-christian.ts](src/data/collegeSupportPrograms/charlotte-christian.ts) | 10 |
| Charlotte Latin | [charlotte-latin.ts](src/data/collegeSupportPrograms/charlotte-latin.ts) | 6 |
| Cannon | [cannon.ts](src/data/collegeSupportPrograms/cannon.ts) | 5 |
| Davidson Day | [davidson-day.ts](src/data/collegeSupportPrograms/davidson-day.ts) | 3 |

The exact institution list per school is in the source file. **Re-derive both the count and
the tagged names from the data at implementation time** — the lists may have grown. The
recommended method is in step 3.

**Substring trap.** "Tennessee State University" IS an HBCU; "East Tennessee State
University" and "Middle Tennessee State University" are NOT. "Southern University" is an
HBCU; "Georgia Southern" and "Charleston Southern" are NOT. Tag by **full-name exact
match**, never substring — this is why the recommended method uses `grep -Fxf` against an
exact-name list, not a loose regex. (A loose regex during planning over-counted Country Day
at 20 and Cannon at 7; the exact match gives 18 and 5.)

**Prior art — read it.** [`bucket-denominators.md`](.claude/plans/bucket-denominators.md)
was the immediately-prior change to this exact table (PR #89). Its *Implementation notes*
record four lessons this plan depends on:
1. `npm run check:sources` does **not** read `source-material/` — it validates translation
   *work files*, takes `--lang`, and never inspects the provenance folder. The `_shared/`
   folder is safe; provenance is convention-enforced, not script-enforced.
2. `npm run check:runtime` validates each shipped stamp against the **work file's** stored
   text, not live `src/data/**`, so it can pass clean on genuinely stale overlays. The
   browser language switcher (locale key `csc.lang`) is what actually proves a locale
   renders.
3. `_shared/` is the established home for a cross-school canonical list.
4. `buckets[].note` and `buckets[].tier` are both translated fields.

## Decisions

- **Denominator is 107** — user's call. The DoE-designated HBCU count, not the narrower
  NCES ~99. Recorded in the source file so it isn't "corrected" later.
- **Tag membership by a canonical exact-name list, not by re-researching acceptances** —
  user's call. Deterministic and auditable, same model as Power Four / Top-75 membership.
- **The HBCU row renders as `tier: 'HBCUs'` + a short note** spelling the acronym out once
  (`'— Historically Black Colleges & Universities'`) — user's call. The note is translated
  prose (Phase 2), consistent with other rows' notes.
- **Row position: last, after Power Four** — keeps the existing five in their established
  order (which the overlays index by position: `buckets[0..4]`), so no existing overlay
  entry shifts index. HBCUs becomes `buckets[5]` everywhere.
- **Chip label stays hardcoded English (`label: 'HBCUs'`)** — user's call. Matches the
  existing five chips, none of which are internationalized. Fixing chip-i18n for all six is
  explicitly out of scope.
- **Filter chip appears only where the school has ≥1 HBCU acceptance** — automatic, via the
  existing `available` logic. All six schools have at least three, so all six show it.
- **Numerators for the OTHER five buckets are not recomputed** — this plan adds the HBCU
  row and tags HBCU acceptances only.
- **`hbcu` is additive to `cats`** — Spelman already carries `['lac75']`; it becomes
  `['lac75', 'hbcu']`. A college can be in multiple buckets.

## Approvals needed

**A new selectivity bucket row + a new filter chip is a UX-design change** — a new Compare
row / stat-tile-class addition under `CLAUDE.md`'s UX-design gate. **This needs the user's
explicit approval before `/implement` runs.** The reasoning: the material (107 HBCUs, and
3–18 per school already on the acceptance lists) is a distinct selectivity lens no existing
bucket captures — HBCUs cut across the Top-75 and Power Four tiers rather than nesting in
them (e.g. Spelman is Top-75 liberal arts *and* an HBCU; Howard is neither Top-75 nor
Power Four). The addition is one table row plus one filter chip, styled identically to the
existing five — no new component, layout, or CSS.

The user requested this feature directly and chose the denominator, filter scope, and note
style, which reads as approval — but the gate calls for it to be explicit, so `/implement`
should confirm the user still wants the row + chip added before step 2, and stop if not.

## Source material

Already written during planning, **uncommitted**:

- `source-material/college-support/_shared/HBCU - Membership and Count 2026.md` —
  provenance for the 107 denominator, the canonical 24-name HBCU roster (every HBCU that
  appears on any of the six lists), the substring-trap exclusions, and the per-school
  counts. Sources: the DoE-107 roster, plus the two Lincoln University disambiguations.

`/implement` **ingests this first** via the `ingest-source-material` skill (step 1), same
as any research data — even though, per prior art, no automated check reads the folder;
running the pipeline is still the standard.

## Out of scope

- Recomputing any of the other five buckets' numerators.
- Internationalizing the filter chips (the pre-existing `{f.label}` hardcoding) — all six
  chips, not just HBCUs, and a separate concern.
- Tagging individual acceptances with a *visible* HBCU marker in the list (the user chose
  "filter option", not "tag each acceptance visibly"). The `cats` tag is what drives the
  filter; no new UI on the row itself.
- Any component, CSS, or `Bucket`/`College` type change. Both types already support this
  (`buckets` is an array; `cats` is `string[]`).
- Re-verifying the roster against a live DoE feed at implementation time (the source file
  is the reference).

## Steps

### Phase 1 — English

1. **Ingest the source material.** Run the `ingest-source-material` skill so the new
   `_shared/HBCU - Membership and Count 2026.md` flows through the pipeline like any
   research file, and `src/data/schools.json` / the distilled docs stay in sync. Per
   `bucket-denominators.md`'s notes this file is provenance-only and no check reads it, but
   run the pipeline anyway — it's the standard and it's cheap.

2. **Add the filter chip.** In
   [`collegeSupport.ts`](src/data/collegeSupport.ts), append to `COLLEGE_FILTERS`
   (after the `p4` entry, [line 207](src/data/collegeSupport.ts#L207)):
   ```ts
   { key: 'hbcu', label: 'HBCUs' },
   ```
   Update the `cats` doc comment at
   [`collegeSupport.ts:192-194`](src/data/collegeSupport.ts#L192-L194) to include
   `'hbcu'` in the listed keys.

3. **Tag every HBCU acceptance across the six files.** For each of the six
   `src/data/collegeSupportPrograms/*.ts`, add `'hbcu'` to the `cats` array of every
   college whose name exactly matches the roster in the source file. Derive the set
   mechanically rather than by eye — an exact-name intersection, e.g.:
   ```sh
   # exact HBCU names, one per line, in /tmp/hbcu_names.txt (see the source file's roster;
   # include BOTH 'Johnson C. Smith University' and 'Johnson C Smith University')
   for f in src/data/collegeSupportPrograms/*.ts; do
     echo "=== $f ==="
     grep -E "^\s*\{ name: '" "$f" | sed -E "s/.*name: '([^']*)'.*/\1/" \
       | grep -Fxf /tmp/hbcu_names.txt
   done
   ```
   Then for each matched name, add `'hbcu'` to its existing `cats` (additive — Spelman
   becomes `['lac75', 'hbcu']`; a bare `cats: []` becomes `cats: ['hbcu']`). The expected
   per-file counts are: Country Day 18, Providence Day 14, Christian 10, Latin 6, Cannon 5,
   Davidson Day 3. **If a file's tagged count doesn't match, stop and reconcile against the
   source file before proceeding** — do not ship a mismatched numerator and tag set.

4. **Add the HBCU bucket row to all six files.** Append to each school's `outcomes.buckets`
   array, **after** the Power Four row (making it `buckets[5]`):
   ```ts
   { tier: 'HBCUs', count: '<n> / 107', note: '— Historically Black Colleges & Universities' },
   ```
   with `<n>` the count from step 3 for that school (Country Day 18, Providence Day 14,
   Christian 10, Latin 6, Cannon 5, Davidson Day 3). Use the `' / '` spacing that matches
   the Ivy rows exactly. The `note` uses the same leading `— ` em-dash as the other notes.

5. **Verify English (see Phase 1 verification), then STOP.**

**→ STOP. `/implement` commits Phase 1 to the branch and ends its turn here.** The bucket
row wording (`HBCUs` + the note) and the count must be reviewed by the user before any
translation. Flip the index row to `English shipped`. Nothing in Phase 2 runs until the
user confirms.

### Phase 2 — Every other locale

Only after the user confirms the English row. The scope is the **overlay layer** (research
prose), not the locale chrome files — per `PROSE_TRANSLATED`. The chip label is not
translated (see Decisions), so `src/locales/*.json` is untouched.

Follow `.claude/docs/prose-translation-architecture.md` for the mechanism; do not
re-derive it. The concrete work:

1. **Add overlay entries for the two new prose paths in each of the eight non-English
   locales** — `es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`
   (`src/data/overlays/college-support.<lang>.json`). The new paths are
   `outcomes.buckets[5].tier` (value `"HBCUs"`) and `outcomes.buckets[5].note`
   (`"— Historically Black Colleges & Universities"`), for all six schools. Each entry
   needs the FNV-1a `of` stamp of the live English at that path plus the translated `t`
   value. Translate the **note** into each language; for the **tier**, translate or keep
   the "HBCUs" acronym per the norm for that language (Farsi/Bangla/Telugu/Hindi may keep
   the Latin acronym or render the expansion — a translator call, consistent with how each
   locale handled other proper-noun-ish tiers like "Ivy League").

2. **Match by field path, never by index position in the array** — but note the new entry
   IS at a fixed path (`buckets[5].*`), so this is additive, not a re-key of existing
   entries. No existing overlay entry moves.

3. **Locale traps that apply.** The count `'<n> / 107'` is a `count` field, which is **not**
   translated (confirmed in prior art — `count` appears in no i18n rule and no overlay), so
   it renders from English in every locale and needs no per-locale figure work. Therefore
   the lakh/crore regrouping (`hi`/`te`), RTL isolates (`fa`), and sepdrift concerns do
   **not** touch this plan's numbers — 107 is a bare 3-digit integer with no separator.
   Still run the figure/sepdrift sweeps in verification to confirm nothing regressed.

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/_shared/HBCU - Membership and Count 2026.md` | new — provenance for the 107 denominator + canonical roster (written at planning time) |
| `src/data/collegeSupport.ts` | edit — add `{ key: 'hbcu', label: 'HBCUs' }` to `COLLEGE_FILTERS`; update `cats` doc comment |
| `src/data/collegeSupportPrograms/charlotte-country-day.ts` | edit — tag 18 HBCU acceptances + add HBCU bucket row (`18 / 107`) |
| `src/data/collegeSupportPrograms/providence-day.ts` | edit — tag 14 + bucket row (`14 / 107`) |
| `src/data/collegeSupportPrograms/charlotte-christian.ts` | edit — tag 10 + bucket row (`10 / 107`) |
| `src/data/collegeSupportPrograms/charlotte-latin.ts` | edit — tag 6 + bucket row (`6 / 107`) |
| `src/data/collegeSupportPrograms/cannon.ts` | edit — tag 5 + bucket row (`5 / 107`) |
| `src/data/collegeSupportPrograms/davidson-day.ts` | edit — tag 3 + bucket row (`3 / 107`) |
| `src/data/schools.json` + `.claude/docs/**` | regenerated by the ingest step (step 1) |
| `src/data/overlays/college-support.*.json` | Phase 2 — new `buckets[5].tier` + `.note` entries in eight locales |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds
- [ ] `npm run lint` — clean
- [ ] `grep -rn "tier: 'HBCUs'" src/data/collegeSupportPrograms/` — six rows, one per
      school, each with a ` / 107` count.
- [ ] **Tag count matches numerator, per file.** For each file, count `'hbcu'` in `cats`
      and confirm it equals the bucket numerator (18/14/10/6/5/3). A mismatch means a
      tagged college wasn't counted or vice-versa.
- [ ] **Browser check (required).** `npm run dev`; open **Charlotte Country Day** (18, the
      most HBCU acceptances — the chip and the row are most exercised) and **Davidson Day**
      (3, the fewest — confirm the chip still appears and the filter returns exactly the
      three). For each: the bucket table shows a sixth row `HBCUs … n / 107` aligned with
      the others and not wrapping; the "Every acceptance" area shows an **HBCUs** filter
      chip; clicking it narrows the list to exactly the HBCU acceptances; the count line
      (`Showing n`) matches the numerator.
- [ ] **Spelman cross-membership.** On any school, confirm Spelman appears under BOTH the
      Top-75 Liberal chip and the HBCUs chip (its `cats` is `['lac75', 'hbcu']`).

### Phase 2 — Locales

- [ ] `npm run check:runtime` — run across **all eight** locales, not just `fr`. Every
      overlay stamp resolves; the two new `buckets[5]` paths per school are present and
      their stamps match live English. (Recall from prior art: this validates against the
      work file, so also do the browser check below.)
- [ ] `npm run check:sepdrift -- --lang <each>` — confirm no separator drift introduced
      (107 has none; this guards regressions only). Note the known pre-existing `es` drift
      (179 tokens) is out of scope — confirm the count is unchanged from `main`.
- [ ] `python3 scripts/check_figures.py` (or the per-locale invocation the rollout docs
      use) — the `107` figure round-trips in every locale.
- [ ] **Browser check per locale (required).** Switch language via the app switcher
      (locale key `csc.lang`), open one school, and confirm the HBCU bucket row renders the
      translated note (and the tier per that locale's convention) — not a silent English
      fallback. Do this for at least `es`, one RTL (`fa`), and one lakh/crore (`hi`), since
      those exercise the render paths most likely to break.
- [ ] **Print-out on two schools** per the standing rule — Charlotte Latin and one other,
      panels expanded — confirming the bucket table's new row appears in the print layout
      (the deep-dive-collapsed print bug from PR #71 is the reason this is explicit).

## Risks

| Risk | Mitigation |
|---|---|
| Substring false-positives tag non-HBCUs (East/Middle Tennessee State, Georgia/Charleston Southern) | Step 3 tags by **exact full-name match** (`grep -Fxf`), never substring. The source file lists the exclusions explicitly. Verify tag-count == numerator per file. |
| `buckets[5]` is a new translated path; a missing overlay entry falls back to English silently in a locale | Phase 2 adds the entry in all eight locales; `check:runtime` + the per-locale browser check are the detectors. Prior art warns `check:runtime` alone can pass on stale overlays — the browser check is the real proof. |
| Adding a bucket without UX approval violates the design gate | Approvals section flags it; `/implement` confirms with the user before step 2. |
| Providence Day's `Lincoln University` is ambiguous (PA vs MO) | Both Lincolns are HBCUs, so it counts either way — documented in the source file. No action needed. |
| The chip label ships English to all locales | Accepted, per Decisions — matches the existing five chips; chip-i18n is a separate, out-of-scope concern. |
| Acceptance lists grew since planning, so a hardcoded count is stale | Step 3 re-derives counts from the data at implementation time; the planning table is a cross-check, not the source of truth. |

## Open questions

- Should the "HBCUs" acronym itself be translated or kept Latin in the non-Latin-script
  locales (`bn`, `te`, `fa`, `hi`)? — **default:** keep it consistent with how each locale
  already handles proper-noun-ish tiers (e.g. whether "Ivy League" was transliterated or
  kept). The note (the spelled-out expansion) is always translated regardless. This is a
  Phase 2 translator judgment, not a blocker.
- Does the user want the filter chip to also appear when a school has zero HBCU acceptances
  (it currently won't, via `available`)? — **default:** no; all six schools have ≥3, so the
  question is moot for the current data, and hiding an always-empty chip is the existing
  correct behaviour.
