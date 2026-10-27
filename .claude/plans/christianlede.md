---
name: christianlede
title: Trim Charlotte Christian's "Where Graduates Go" lead and scholarships note
status: implemented
phases: 2
created: 2026-10-27
branch: fix/christianlede
prs: []
---

# Trim Charlotte Christian's "Where Graduates Go" lead and scholarships note

## Goal

On Charlotte Christian's school page, College Support → **Where Graduates Go**, the lead
paragraph currently reads:

> **409 acceptances for 94 graduates, and 99% of graduates go on to a four-year college — but
> only about a sixth of the accepting institutions actually enrolled anyone.** Charlotte
> Christian is the only school here that gives Christian colleges and HBCUs their own named
> tiers, and 14% of recent graduates attend a Christian college.

The user asked for two edits (2026-10-27), and after them it should read:

> **409 acceptances for 94 graduates, and 99% of graduates go on to a four-year college.**
> 14% of recent graduates attend a Christian college.

The user also asked, in the same session, to remove the **scholarships note** that appears
lower on the same card, below the scholarships list. It is two sentences, and the user asked
to remove both, so the whole note goes:

> The Class of 2025 total is printed in the school’s own Celebrating Seniors booklet as
> “$6,400,00” — a digit is missing, and the school’s website renders the same figure as “more
> than $6.4 million”, which is used here. Publishing roughly ninety individually named awards
> is unusually granular. Morehead-Cain, QuestBridge and ROTC outcomes are not published, and
> no federal service academy appears on either list.

The change is done when the lead renders as above, the note no longer renders, and both
changes hold in all nine prose locales.

## Context

- Both strings live in one file:
  [`src/data/collegeSupportPrograms/charlotte-christian.ts`](../../src/data/collegeSupportPrograms/charlotte-christian.ts),
  inside the `outcomes` object (around lines 501–505):
  - `outcomes.headline` (line ~503). It renders bold.
  - `outcomes.subhead` (line ~505). It renders muted.
- They are rendered by `Lead` in
  [`src/components/CollegeSupport.tsx`](../../src/components/CollegeSupport.tsx) (line ~96),
  which prints `<strong>{headline}</strong>` followed by `<span> {subhead}</span>`.
  **No component change is needed.** This is a data-only edit.
- The scholarships note is `outcomes.scholarshipsNote` in the same file (line ~531). Its type
  is optional (`scholarshipsNote?: string` in `src/data/collegeSupport.ts`, line ~337), and
  it renders only when present
  (`{data.scholarshipsNote && <Note … />}`, `CollegeSupport.tsx` line ~676). Deleting the
  key therefore removes the note cleanly. The `scholarships` list above it stays, including
  its `'~90 individually named awards published'` item. So does the
  `**Granular scholarship reporting**` flag text around line 564, which the user did not
  mention.
- The lead sentences appear nowhere else. A grep over `src/`, `source-material/` and
  `.claude/docs/` found them only in that `.ts` file and in the nine overlay work files.
  The scholarships note's wording also appears in research files
  (`source-material/college-support/charlotte-christian/…Redesign Research 2026.md`,
  `.claude/docs/college-support/charlotte-christian.md`,
  `src/content/college-support/charlotte-christian.json`). Those files are the research
  record, and the edit is to what the page shows, so **leave them unchanged**. No ingest is
  needed.
- **Overlay entries.** Both strings are research prose, translated through the
  `college-support` overlay. Each locale holds one entry per string, and each entry has a
  single `at` path, so neither entry is shared with another school:

  | Field | Current stamp | New English | New stamp |
  |---|---|---|---|
  | `charlotte-christian:outcomes.headline` | `fd604a93` | `409 acceptances for 94 graduates, and 99% of graduates go on to a four-year college.` | `b397ce13` |
  | `charlotte-christian:outcomes.subhead` | `c20561b5` | `14% of recent graduates attend a Christian college.` | `9ae8c63c` |
  | `charlotte-christian:outcomes.scholarshipsNote` | `dadd8b4c` | *(field deleted)* | *(entry spliced out)* |

  During planning, all nine work files were checked: each holds `dadd8b4c` exactly once, with
  the single `at` path above.

  The new stamps were computed during planning with `stamp()` from `scripts/i18n_stamp.mjs`.
  Neither new stamp already occurs in any overlay or work file, so no existing entry is
  merged. **Recompute them during the build anyway.** Use the stamps you compute; the ones
  in this table are only for cross-checking.
- Locale files: `src/data/overlays/work/college-support.<lang>.json` (1,723 units each) and
  the shipped `src/data/overlays/college-support.<lang>.json`, for
  `es bn ht te fr fa it hi ar` (`PROSE_TRANSLATED`).
- The nearest precedent is [`updatesToCDSAdmissions`](updatesToCDSAdmissions.md), Phase 2
  step 16: retranslate an edited string by **trimming the reviewed translation** and
  restamping it in place.

## Decisions

- **Two-phase.** The change edits research prose that parents read, so the English-first
  rule applies. Phase 1 edits only the `.ts` file.
- **Trim the translations, don't retranslate them.** Each removed clause is a clean
  sub-span of an already reviewed translation. Deleting it keeps the native-speaker-reviewed
  wording.
- **Edit the two lead entries in place, keyed by `of` stamp.** Change only `text` and `of`,
  and keep `at` as it is. **Splice out the `dadd8b4c` entry.** Each work file goes from 1,723
  units to **1,722**. Removing an object key, not an array element, shifts no other `at`
  path.
- **Delete the `scholarshipsNote` key; don't set it to `''`.** An empty string still counts
  as a field, and the extractor would emit a unit for it. Absence is how omission is
  expressed in this repo.
- **The subhead keeps its own sentence, starting with the figure.** The user gave the exact
  wording. Starting a sentence with a numeral is acceptable here.
- **Nothing else changes.** That includes the scholarships list items, the "Granular
  scholarship reporting" flag, the 14% Christian college stat tile, the HBCU
  bucket and the "sixth" wording elsewhere in the file (the GPA "sixth semester" lines are
  unrelated).

## Approvals needed

None. This edits existing data and adds no card, row or UI.

## Out of scope

- Other schools' College Support leads.
- The stat tiles and selectivity buckets on the same card.
- Deploying. Merging is not publishing.

## Addendum — Charlotte Country Day flag (added 2026-10-27, during Phase 1)

After Phase 1 was committed, the user asked in the same session to remove this text from
Charlotte Country Day's **Where Graduates Go** card:

> The enrolling markers were recovered from the acceptance PDF’s embedded font runs, because
> bold is lost in plain-text extraction. That returned 69 names against the school’s own count
> of 70 — treat 70 as authoritative and this list as about 97% complete.

It was the only entry in `outcomes.flags` in
`src/data/collegeSupportPrograms/charlotte-country-day.ts`, and that is now `flags: []`.
`Flags` returns `null` on an empty array (`CollegeSupport.tsx` line ~78), so nothing renders.
The provenance code comment at the top of that file (line ~20) stays, since it is internal.
I folded this into this plan because Phase 2 edits the same nine `college-support` overlays.

| Field | Stamp | Change |
|---|---|---|
| `charlotte-country-day:outcomes.flags[0].text` | `b193be2b` | entry spliced out (it is the only array element, so no `at` path shifts) |

**Phase 2 changes:** step 7's re-measure must name **four** stamps (`fd604a93`, `c20561b5`,
`dadd8b4c`, `b193be2b`). Step 8 also splices out `b193be2b`: assert its `at` is exactly
`['charlotte-country-day:outcomes.flags[0].text']` and that it is dropped once per file, so
each work file goes from 1,723 to **1,721** units. Step 10's grep adds `b193be2b`. The
Phase 2 browser check adds `/school/charlotte-country-day/?lang=es`: the flag is absent.

## Steps

### Phase 1 — English

1. **Branch** off an up-to-date `main`: `git checkout main && git pull && git checkout -b fix/christianlede`.
2. **Edit `outcomes.headline`** in `src/data/collegeSupportPrograms/charlotte-christian.ts`.
   Delete ` — but only about a sixth of the accepting institutions actually enrolled anyone`
   and keep the final period. The new value is exactly:
   `'409 acceptances for 94 graduates, and 99% of graduates go on to a four-year college.'`
3. **Edit `outcomes.subhead`** in the same file. The new value is exactly:
   `'14% of recent graduates attend a Christian college.'`
4. **Delete `outcomes.scholarshipsNote`** in the same file: remove both the
   `scholarshipsNote:` line and its string line, so the key is gone. Leave `scholarships: […]`
   and `flags: []` on either side of it untouched.
5. **Verify Phase 1** (see Verification), then commit **only that file** (`git add` it
   explicitly; run `git status --short` first) and push. `npm run build` **will fail at
   `check:live`** with three stale stamps in each locale: `fd604a93`, `c20561b5` and
   `dadd8b4c`. That failure is expected after Phase 1, and Phase 2 clears it.
6. **STOP.** Show the user the rendered English lead and the scholarships block without its
   note, and wait for them to confirm.

**→ `/implement` ends its turn here.** Set the INDEX row to `English shipped`.

### Phase 2 — Every other locale

The scope is the nine prose locales in `PROSE_TRANSLATED`: `es bn ht te fr fa it hi ar`. This
uses the **overlay** layer, not `src/locales/*.json`, because no chrome changes. For the
mechanism, see [`.claude/docs/prose-translation-architecture.md`](../docs/prose-translation-architecture.md).

7. **Re-measure first.** Run
   `node scripts/check_live_resolution.mjs --topic college-support --lang es --verbose`.
   It must name exactly `fd604a93`, `c20561b5` and `dadd8b4c`. If it names anything else, stop: Phase 1
   changed more than intended.
8. **Edit the nine work files** with one scratchpad script (do not commit the script). For
   each `src/data/overlays/work/college-support.<lang>.json`:
   - **Splice out the `dadd8b4c` unit** (the scholarships note). Find it by stamp, assert
     its `at` is exactly `['charlotte-christian:outcomes.scholarshipsNote']`, and assert
     that exactly 1 unit is dropped per file.
   - For the two lead units: find each **by `of` stamp**, never by array index. Assert that it is found exactly
     once and that `at` is the single expected `charlotte-christian:outcomes.*` path.
   - Set `text` to the new English, and set `of` to the recomputed `stamp(text)`.
   - **Trim `t`:**
     - Headline (`fd604a93`): delete the em-dashed contrast clause. This is everything from
       the ` — ` (es `— pero solo…`, fr `— mais seul…`, ar `— لكن…`, hi `— पर…`) to the end
       of the sentence. Then close with the locale's sentence-final punctuation: `.` for
       Latin-script locales and `ar`/`fa` as the existing string uses it, and `।` for `hi`
       and `bn` if that is what the existing string ends with. Match the punctuation the
       current `t` already ends with. Example, es:
       `409 admisiones para 94 graduados, y el 99% de los graduados continúa en una universidad de cuatro años.`
     - Subhead (`c20561b5`): keep only the translation's final clause about 14% of recent
       graduates. Drop the "only school here … named tiers" part and its joining conjunction,
       and capitalize the first word where the script has case. Example, es:
       `El 14% de los graduados recientes estudia en una universidad cristiana.`
       fr: `14% des diplômés récents fréquentent une université chrétienne.`
       In `hi`, the existing clause is `हाल के 14% स्नातक किसी Christian कॉलेज में जाते हैं।`.
       Keep each locale's own wording of this clause and only remove what precedes it.
   - Keep the figures character for character (`409`, `94`, `99%`, `14%`). The `%` stays
     unspaced, even in French. Store no bidi isolates for `fa`/`ar`, because isolates are
     applied at render. Store no regrouped digits for `hi`/`te`.
   - Write the files back with 2-space indent, `ensure_ascii=False` and a trailing newline,
     so non-Latin scripts don't re-escape and produce a whole-file diff. Assert that each
     file now has **1,721** units (it had 1,723; see the Addendum).
9. **Rebuild the nine shipped overlays:**
   `for l in es bn ht te fr fa it hi ar; do node scripts/i18n_build_overlay.mjs --topic college-support --lang $l; done`
10. **Assert the old stamps are gone:**
   `grep -l 'fd604a93\|c20561b5\|dadd8b4c' src/data/overlays/college-support.*.json src/data/overlays/work/college-support.*.json`
   must print nothing.
11. **Run the Phase 2 Verification.** Then commit the 18 overlay files to the same branch
    (explicit paths only), open one PR covering both phases with `--body-file`, squash-merge
    it, check out `main` and pull. Set the INDEX row to `Implemented` with the PR link.
    **Do not deploy.** End with "merged — ready to deploy whenever you want it."

## Files touched

| File | Change |
|---|---|
| `src/data/collegeSupportPrograms/charlotte-christian.ts` | edit `outcomes.headline` + `outcomes.subhead`; delete `outcomes.scholarshipsNote` |
| `src/data/overlays/work/college-support.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | restamp + trim 2 entries, splice out 1 (`dadd8b4c`) each |
| `src/data/overlays/college-support.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | rebuilt from the work files |
| `.claude/plans/INDEX.md` | status updates |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean. Use `tsc -b`, not `--noEmit`.
- [ ] `npm run check:schema`: clean (no schema impact expected).
- [ ] `npm run build` fails **only** at `check:live`, naming exactly `fd604a93`,
      `c20561b5` and `dadd8b4c`.
- [ ] Browser (`npm run dev`), `/school/charlotte-christian/?lang=en` → College Support →
      open **Where Graduates Go**. Force `<details>` open and use `domcontentloaded`, not
      `networkidle`. The lead shows the bold
      `409 acceptances for 94 graduates, and 99% of graduates go on to a four-year college.`
      followed by the muted `14% of recent graduates attend a Christian college.` It has
      no dangling dash, no "only school here", and no double space or double period.
      Lower on the same card, the scholarships list still shows its five items, and **no
      note follows it**: no `$6,400,00` and no "Morehead-Cain". There is no empty gap where
      the note used to be.

### Phase 2 — Locales

- [ ] `npm run build`: green, including `check:live` and `check:runtime`.
- [ ] `npm run check:live` and `npm run check:runtime`: clean.
- [ ] `for l in es bn ht te fr fa it hi ar; do npm run check:sepdrift -- --lang $l; done`:
      no new findings.
- [ ] `npm run check:bidi`, `npm run check:fa`, `npm run check:hi`: clean.
- [ ] Browser: `/school/charlotte-christian/?lang=es`, `?lang=ar` and `?lang=hi` (one
      Latin, one RTL and one lakh/crore locale). The lead renders **translated, not
      English**, in both parts, with no clause about a sixth of institutions or about named
      tiers. The scholarships note is absent. In `ar`, `99%` and `14%` read correctly inside the RTL paragraph.

## Risks

| Risk | Mitigation |
|---|---|
| A trimmed translation keeps a fragment of the deleted clause | Step 7 assertions plus the per-locale browser check. Read each of the 18 new `t` values once before writing |
| The stamp is mistyped, so the locale silently falls back to English | Recompute it with `stamp()`. `check:live`/`check:runtime` catch a mismatch |
| Whole-file JSON re-encoding noise | 2-space indent, `ensure_ascii=False`, trailing newline. Check that `git diff --stat` shows about 4 changed lines per work file |

## Implementation notes

- **Scope grew by one string, at the user's request, mid-Phase 1:** Charlotte Country Day's
  `outcomes.flags[0]` (the "enrolling markers … about 97% complete" TO VERIFY flag) was
  removed too. See the Addendum. Work files therefore went 1,723 → **1,721** units, not 1,722.
- Both phases ran in one window. The user approved the English (2026-10-27) before any
  translation was touched.
- The trims are exactly as planned. The headline was cut at ` — `, keeping the existing
  sentence-final mark (`।` for bn/hi, `.` elsewhere). Each subhead keeps only the locale's
  own reviewed 14% clause (es/it gained a capital `El`/`Il`). Recomputed stamps matched the
  plan: `b397ce13`, `9ae8c63c`.
- Verification: `npm run build` green. `check:live`, `check:runtime`, `check:bidi`,
  `check:fa` and `check:hi` exit 0. `check:sepdrift` shows 0 drift in all nine locales.
  Playwright on the `vite preview` build, all `<details>` open: Charlotte Christian in
  es/ar/hi renders the trimmed lead translated, with no English and no stale clause. CCD
  in es/ar has no flag.
- Not part of this plan but shipped alongside it: PR #381 made every TO VERIFY tag
  dev-only site-wide, which would also have hidden the CCD flag in production.

