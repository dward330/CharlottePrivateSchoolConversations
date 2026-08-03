---
name: bucket-denominators
title: Show a denominator on every selectivity-bucket row, not just the Ivy rows
status: implemented
phases: 1
created: 2026-08-02
branch: feat/bucket-denominators
prs: [89]
---

# Show a denominator on every selectivity-bucket row

## Goal

In the **Selectivity buckets** table on every school's College Support page, the Ivy
League and "Ivy Plus" rows show a ratio (`8 / 8`, `17 / 17`) while the other three rows
show a bare count (`58`, `43`, `57`). A reader can tell that 8 of 8 Ivies is total
saturation, but has no way to know whether 58 Top-75 nationals is most of them or half.

Give the remaining three tiers — **Top-75 National Universities**, **Top-75 Liberal
Arts**, and **Power Four** — the same `n / N` treatment, across all six schools. Done
means every row in every school's bucket table reads as a ratio, and the Power Four
denominator is backed by a committed source file.

## Context

**The table.** Rendered by [`CollegeSupport.tsx:490-517`](src/components/CollegeSupport.tsx#L490-L517).
Each row prints `b.tier` (plus optional `b.note`) in one cell and `b.count` verbatim in
the other:

```tsx
<td className="cs-td cs-td-count">{b.count}</td>
```

There is **no formatting logic** — `count` is a hand-authored string. `8 / 8` is literally
typed that way in the data. So this change is entirely a data edit; the component, the
`Bucket` type in [`collegeSupport.ts:216`](src/data/collegeSupport.ts#L216), and the CSS
are all untouched.

**The data.** Six files under [`src/data/collegeSupportPrograms/`](src/data/collegeSupportPrograms/),
each with a five-row `outcomes.buckets` array in a fixed tier order (Ivy League, Ivy Plus,
Top-75 National, Top-75 Liberal Arts, Power Four). Current values:

| School | File:line | Top-75 Nat | Top-75 LA | Power Four |
|---|---|---|---|---|
| Providence Day | [providence-day.ts:619-621](src/data/collegeSupportPrograms/providence-day.ts#L619-L621) | 58 | 43 | 57 |
| Charlotte Latin | [charlotte-latin.ts:538-540](src/data/collegeSupportPrograms/charlotte-latin.ts#L538-L540) | 53 | 40 | 53 |
| Charlotte Country Day | [charlotte-country-day.ts:560-562](src/data/collegeSupportPrograms/charlotte-country-day.ts#L560-L562) | 55 | 41 | 53 |
| Cannon | [cannon.ts:476-478](src/data/collegeSupportPrograms/cannon.ts#L476-L478) | 46 | 27 | 43 |
| Davidson Day | [davidson-day.ts:471-473](src/data/collegeSupportPrograms/davidson-day.ts#L471-L473) | 44 | 26 | 42 |
| Charlotte Christian | [charlotte-christian.ts:402-404](src/data/collegeSupportPrograms/charlotte-christian.ts#L402-L404) | 30 | 7 | 34 |

18 values to change. Line numbers are from planning time — **grep for `tier: 'Power Four'`
rather than trusting them.**

**i18n — why this is single-phase.** `outcomes.buckets[].count` is **not** a translated
field. [`scripts/i18n_fields.mjs:260`](scripts/i18n_fields.mjs#L260) marks
`outcomes.buckets[].tier` as prose (because "Top-75 National Universities" is a
descriptive phrase, not a proper noun), and `note` is covered by the general prose rules —
but `count` appears in no rule and in no overlay. Verified directly against
`src/data/overlays/college-support.es.json`: every bucket entry keys on a `.tier` or
`.note` path, none on `.count`.

This matters twice over:

1. No new English prose is added, so there is nothing to translate.
2. The overlay layer's FNV-1a stamps (`of` in each entry) hash the English text **at the
   stamped path**. Since no stamped path is being edited, no stamp goes stale and the
   silent-fallback failure mode described in `CLAUDE.md` cannot trigger here. All eight
   non-English locales pick up the new denominators for free, because they render the
   English `count` by design.

**The Power Four conflict — the one genuinely hard part.** Charlotte Latin's page currently
asserts a 64-member Power Four in three places:

- `buckets[4].note` — `'— 63 of 64 by the researcher's exact count'` ([charlotte-latin.ts:540](src/data/collegeSupportPrograms/charlotte-latin.ts#L540))
- `stats[3]` — `{ value: '63 of 64', label: 'Power Four universities represented' }` ([charlotte-latin.ts:533](src/data/collegeSupportPrograms/charlotte-latin.ts#L533))
- `subhead` — `'…63 of the 64 Power Four universities appear on the list…'` ([charlotte-latin.ts:528](src/data/collegeSupportPrograms/charlotte-latin.ts#L528))

and it is documented in committed source material at
`source-material/college-support/charlotte-latin/Charlotte Latin - College Support - Redesign Research 2026.md:439`
(`63 of 64 member institutions`).

**64 is the pre-2024-realignment membership.** Current Power Four membership is 68 (ACC 18,
SEC 16, Big Ten 18, Big 12 16), which is the era the rest of the card is scored against —
`bucketsNote` on every school says the counts run against *the 2026 U.S. News tables*.

Writing `53 / 68` into Latin's table without touching the other three would put **three
different Power Four denominators on one card**. Step 2 handles this deliberately; see
Decisions.

**Provenance.** `CLAUDE.md`'s data-provenance standard requires any figure surfaced in the
app to trace to a committed `source-material/**/*.md`. No file in the repo currently
establishes 68 — the only committed Power Four denominator is Latin's 64. Step 1 exists to
close that gap **before** any figure is written, and `npm run check:sources` is in the
verification list.

## Decisions

- **Power Four denominator is 68, not 64** — user's call. Post-2024 realignment (ACC 18 +
  SEC 16 + Big Ten 18 + Big 12 16), consistent with the 2026 U.S. News framing the rest of
  the card already uses. 64 is stale.
- **Top-75 denominator is a plain `/ 75`, and no note text changes** — user's call. The
  `bucketsNote` on each school already states the tie caveat ("U.S. News publishes heavy
  ties around the 70–75 boundary"), so the approximation is disclosed for a reader who
  looks. Adding a per-row caveat would introduce new English prose and force this into a
  two-phase translated plan for very little gain.
- **Format is `n / N` with spaces around the slash** — matches the existing Ivy rows
  exactly (`8 / 8`, `17 / 17`). Do not use `n/N` or `n of N`; the `of` spelling is used in
  the *stat tiles*, which are a different, translated field.
- **Latin's three conflicting Power Four figures are reconciled to 68, not left mixed** —
  a card showing `53 / 68`, `63 of 64`, and "63 of the 64" simultaneously is worse than
  either figure alone. See step 2 for the exact treatment and why the numerator stays 63.
- **Counts (numerators) are not recomputed** — this plan adds denominators only. Whether
  Cannon's 46 Top-75 nationals is still accurate is out of scope.

## Approvals needed

**None.** This adds no card, section, stat tile, Compare row, metric key, or topic, and
changes no component, layout, or styling — it edits the value of an existing field in an
existing table. The UX-design gate in `CLAUDE.md` does not apply.

Note the one judgment worth flagging back to the user at PR time: step 2 edits Charlotte
Latin's `subhead` and one `stats` tile, which **are** translated fields. See Risks.

## Out of scope

- Recomputing any numerator. Numbers stay as they are.
- The Ivy League and "Ivy Plus" rows — already correct.
- Any change to `bucketsNote` text on any school (except Latin's Power Four sentence, per
  step 2).
- Re-verifying the Top-75 counts against current U.S. News tables.
- Any component, CSS, or type change.

## Steps

**Single-phase — adds no user-facing text.** Every edit replaces the value of an existing
`count` field with a longer string in the same format already used by the Ivy rows. The
one exception (step 2, Latin's prose) *revises* existing translated strings rather than
adding new ones, and is handled explicitly there.

1. **Persist the Power Four membership source.** Before writing any `/ 68`, create
   `source-material/college-support/_shared/Power Four - Conference Membership 2026.md`
   (create the `_shared/` folder; the ingest pipeline keys on `<topic>/<school>/`, so
   confirm a non-school folder here does not break `npm run check:sources` — if it does,
   put the file under each school's folder or the closest existing convention instead).
   It needs a provenance header (who/when/how), **source URLs**, and the member-by-member
   breakdown behind 68: ACC 18, SEC 16, Big Ten 18, Big 12 16. Do a live check of current
   membership rather than trusting this plan's arithmetic — if the real figure is not 68,
   **stop and report it** instead of writing a number the source contradicts.

2. **Reconcile Charlotte Latin's Power Four figures** in
   [`charlotte-latin.ts`](src/data/collegeSupportPrograms/charlotte-latin.ts). Three
   places assert 64. The numerator 63 is a real research finding (63 institutions from the
   list appear) and **stays**; only the denominator moves. If the 2026 membership is 68 and
   Minnesota is still the only absence, then 63 of 64 becomes some `n of 68` — and the
   honest move is that **the four schools added in realignment may or may not be on
   Latin's 2023–25 acceptance list, which was compiled against the old membership.**
   Do not guess. Check the four added institutions against the `colleges` array in that
   same file and recount, then write the true numerator. Update all three sites
   consistently:
   - `buckets[4].note` — the `'— 63 of 64 by the researcher's exact count'` string
   - `stats[3].value` — `'63 of 64'`
   - `subhead` — `'…63 of the 64 Power Four universities…'`

   If the recount is not cleanly determinable from the data in the file, **leave Latin's
   numerator at 63, set the denominator to 68 in all three places, and note the caveat in
   the PR description** rather than inventing a number.

3. **Add denominators to the three tiers, all six schools.** In each of the six files
   under [`src/data/collegeSupportPrograms/`](src/data/collegeSupportPrograms/), edit the
   three `count` values (leave `tier` and `note` untouched except per step 2):

   | Tier | Format |
   |---|---|
   | `Top-75 National Universities` | `'<n> / 75'` |
   | `Top-75 Liberal Arts` | `'<n> / 75'` |
   | `Power Four` | `'<n> / 68'` |

   Resulting values, using the current numerators from the Context table:

   - **providence-day.ts** — `'58 / 75'`, `'43 / 75'`, `'57 / 68'`
   - **charlotte-latin.ts** — `'53 / 75'`, `'40 / 75'`, `'53 / 68'`
   - **charlotte-country-day.ts** — `'55 / 75'`, `'41 / 75'`, `'53 / 68'`
   - **cannon.ts** — `'46 / 75'`, `'27 / 75'`, `'43 / 68'`
   - **davidson-day.ts** — `'44 / 75'`, `'26 / 75'`, `'42 / 68'`
   - **charlotte-christian.ts** — `'30 / 75'`, `'7 / 75'`, `'34 / 68'`

   Re-read each numerator from the file as you go rather than trusting this table — it was
   captured at planning time.

4. **Confirm no overlay work is needed.** Run `npm run check:runtime`. It must pass with
   no new failures. If it reports a stale stamp, something in step 2 touched a translated
   field — that is expected for Latin's `subhead` and `stats[3].value`, and those two
   entries need their overlay `t` values updated in the eight
   `src/data/overlays/college-support.<lang>.json` files (`es`, `bn`, `ht`, `te`, `fr`,
   `fa`, `it`, `hi`), matching by **text, never by index** — the changed figure is a bare
   numeral inside otherwise-unchanged prose, so update the numeral in place in each
   locale's existing translation. Do not re-translate the sentence.

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/_shared/Power Four - Conference Membership 2026.md` | new — provenance for the 68-member denominator, with source URLs |
| `src/data/collegeSupportPrograms/providence-day.ts` | edit — 3 `count` values |
| `src/data/collegeSupportPrograms/charlotte-latin.ts` | edit — 3 `count` values + `subhead`, `stats[3].value`, `buckets[4].note` per step 2 |
| `src/data/collegeSupportPrograms/charlotte-country-day.ts` | edit — 3 `count` values |
| `src/data/collegeSupportPrograms/cannon.ts` | edit — 3 `count` values |
| `src/data/collegeSupportPrograms/davidson-day.ts` | edit — 3 `count` values |
| `src/data/collegeSupportPrograms/charlotte-christian.ts` | edit — 3 `count` values |
| `src/data/overlays/college-support.*.json` | edit — **only if** step 4 shows stale stamps from Latin's prose |

## Verification

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds
- [ ] `npm run lint` — clean
- [ ] `npm run check:sources` — the new source-material file is picked up and every figure
      traces to a source
- [ ] `npm run check:runtime` — every overlay stamp still resolves (see step 4 if not)
- [ ] `npm run check:sepdrift` — no separator drift introduced. Relevant because `/ 75`
      and `/ 68` are new numeric tokens; confirm the checker does not read the space-slash
      as a group separator.
- [ ] `grep -rn "tier: 'Top-75\|tier: 'Power Four" src/data/collegeSupportPrograms/` —
      all 18 values show a ` / ` denominator, none missed
- [ ] **Browser check (required).** `npm run dev`, open **two** schools — **Providence
      Day** (the screenshot case, saturated counts) and **Charlotte Christian** (the
      lowest counts, `7 / 75`, where a small numerator against a large denominator is most
      likely to look wrong). Confirm the bucket table's right-hand column shows five
      ratios, aligned, with no wrapping in the narrow `cs-td-count` cell.
- [ ] **Check one non-English locale in the browser** — switch to `es` and confirm the
      bucket table shows the new denominators (they render from English `count` by design)
      while the tier labels stay translated. This repo's standing lesson is that
      render-layer defects survive every automated check.
- [ ] **Charlotte Latin specifically** — confirm the page no longer shows two different
      Power Four denominators between the stat tile, the subhead, and the table row.

## Risks

| Risk | Mitigation |
|---|---|
| Step 2 edits Latin's `subhead` and a `stats` tile, which **are** translated fields — a bare edit desyncs eight locales silently | `npm run check:runtime` is the detector; step 4 says exactly what to do. Match overlay entries by text, never index (see `CLAUDE.md`). |
| `/ 68` is asserted without a committed source | Step 1 runs first and blocks on it. If live membership is not 68, stop and report rather than writing it. |
| Latin's numerator (63) was counted against a 64-member field and may be wrong against 68 | Step 2 says recount from the file's own `colleges` array; if not determinable, keep 63, set 68, and flag it in the PR. Do not invent a number. |
| `/ 75` reads as more precise than the tie-caveated counts are | Accepted, per Decisions — `bucketsNote` already discloses it on every school. |
| The `cs-td-count` cell is styled for short values and may wrap at `43 / 75` | Covered by the browser check; the Ivy rows already carry `17 / 17`, so the cell handles at least that width. |

## Open questions

- Does the ingest pipeline / `check:sources` tolerate a non-school folder under
  `source-material/college-support/`? — **default:** if `_shared/` breaks the check, place
  the Power Four membership file in the school folder that most needs it
  (`charlotte-latin/`, since it is the one with a conflicting published figure) and
  reference it from the others.
- Is the correct Power Four numerator for Charlotte Latin still 63 under a 68-member
  field? — **default:** keep 63, write `/ 68`, and say plainly in the PR description that
  the numerator was counted against the old 64-member membership and was not recounted.

## Implementation notes

Shipped as planned, with four deviations worth recording.

**1. `check:sources` is not a provenance checker, and the step-1 open question was moot.**
The plan expected `npm run check:sources` to validate the new `source-material/` file. It
does not: `scripts/check_work_sources.mjs` verifies that translation *work files* have not
had their English `text` altered, takes a required `--lang`, and never reads
`source-material/` at all. No automated check inspects that folder's structure, so the
`_shared/` folder posed no risk. The data-provenance standard is enforced by convention
here, not by a script. The file was created at
`source-material/college-support/_shared/Power Four - Conference Membership 2026.md`.

**2. The Power Four membership is 68, but a naive live check says 67.** Confirmed
member-by-member: ACC 18, SEC 16, Big Ten 18, Big 12 16. A general search summary returns
**67**, and most published articles say the ACC has 17 — both count *football-playing*
members, excluding **Notre Dame**, an ACC member in every sport but football. Since these
buckets count college acceptances rather than football schedules, 68 is correct, and Notre
Dame appears on five of the six schools' lists. The distinction is written into the source
file so a later pass does not "correct" 68 back to 67.

**3. Charlotte Latin's numerator was recounted, and "63 of 64" was wrong on both terms.**
The plan allowed keeping 63 if a recount was not cleanly determinable. It was determinable.
Matching Latin's `colleges` array against the full 68-member roster gives **62 present, six
absent** — Minnesota, Nebraska, BYU, UCF, Houston and Kansas State. The original research
claim that Minnesota was "the single absence" was already wrong against the old 64-member
field, since Nebraska, BYU, UCF, Houston and Kansas State were all members pre-realignment
too. All four sites now read `62 of 68`. (One caveat: the list carries
`Rutgers University (Camden)`, a different campus from the Big Ten's New Brunswick, so 62
is if anything generous; the six absences hold either way.)

**4. A fourth conflicting site existed, and `buckets[4].note` is translated.** The plan
named three places asserting 64; there was a fourth at
`charlotte-latin.ts:697` (`verdict.points[4].text`). Leaving it would have reproduced the
mixed-denominator problem step 2 exists to prevent, so it was fixed. All four strings are
translated fields — including `buckets[4].note`, which the plan assumed was not — so
**32 overlay entries (4 strings × 8 locales)** were restamped and their numerals updated in
place, matched by field path and never re-translated. The `subhead` needed more than a
numeral swap, because "the single absence being Minnesota" became a six-item list that
differs grammatically per language; the work files' `text` fields were updated in step with
the shipped overlays.

**`check:runtime` did not detect this drift, and its header comment overstates what it
does.** It validates each shipped stamp against the *work file's* stored `text`, not against
live `src/data/**`. Because the work file still held the old sentence, stamp and text agreed
with each other and all eight locales reported a clean pass while four entries per locale
were genuinely stale and would have silently fallen back to English. The drift was found by
stamping the changed English directly and searching the overlays for the resulting hash.
This is the same silent-fallback failure mode `CLAUDE.md` warns about, and the standing
lesson holds: the browser check is what actually proved the fix, via the app's own language
switcher (the locale key is `csc.lang`; writing `i18nextLng` does nothing).

**Verification beyond the plan's list.** `check:runtime` and `check:sources` were run across
all eight locales rather than only `fr`. `check:sepdrift` reports 179 pre-existing drifted
tokens in `es` and 1 each in `ht`/`fa`; these were confirmed identical on `main` before and
after this change, so none were introduced here. The `es` figure is a real open defect but
out of scope. Wrapping was measured by true line-box count (`Range.getClientRects()`) rather
than cell height, at both 1280px and 390px: no `.cs-td-count` cell wraps.
