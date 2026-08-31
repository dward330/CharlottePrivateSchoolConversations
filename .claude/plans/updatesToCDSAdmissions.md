---
name: updatesToCDSAdmissions
title: Six trims to Charlotte Country Day's Admissions guide — two watch-out cards, three prose cuts and one checklist callout
status: english-done
phases: 2
created: 2026-08-31
branch: fix/cds-admissions-trims
prs: []
---

# Six trims to Charlotte Country Day's Admissions guide

## Goal

Six edits the user asked for after reviewing the rendered Charlotte Country Day Admissions
section and its printable checklist. All six are **removals** — nothing is added or
reworded for style. They fall in two of the school's three grade bands:

| # | Target | Band | Shape |
|---|---|---|---|
| 1 | `One test serves seven schools` watch-out card | JK/K | delete whole card |
| 2 | `Why JK/K is its own band` — last sentence | JK/K | trim text, card stays |
| 3 | `Budget the testing fee separately` watch-out card | Grades 1–4 | delete whole card |
| 4 | `Same test as JK/K, different clock` — the brochure aside | Grades 1–4 | trim text, card stays |
| 5 | `The portal is your material list.` checklist callout | Grades 1–4 | delete whole callout |
| 6 | `Your deadline is Jan 2, not Jan 15.` → `Your deadline is Jan 2.` | JK/K | trim lead |
| 7 | `— after the application, which is correct and not a misprint` | JK/K | trim callout text |
| 8 | `application Jan 2 rather than…` → `applications are due Jan 2 rather than…` | JK/K | reword, same stamp |

Edit 4 carries a standing editorial rule the user stated with it: **never describe what a
source document contains** — "the consortium brochure covers Pre-K through Grade 4" tells a
parent about a brochure instead of telling them the fact. We speak as the party holding the
information.

Edit 6 changes **two schools**, not one — see Context; the user chose that deliberately.

**Edit 7 was added mid-build (2026-08-31), after the user saw the rendered Country Day JK/K
checklist sheet.** It removes the `— after the application, which is correct and not a
misprint` aside from the JK/K `checklistCallout.text`. Like edit 6 it is applied to **both**
Country Day and Charlotte Christian, to keep the two JK/K sheets consistent — but unlike
edit 6 the two are **separate overlay entries** (`f2534f0b` cd / `eb3db25a` cc), because the
English differs by a comma and a trailing clause. Country Day's sentence ends there
(`…is due Jan 15.`); Charlotte Christian's continues, so its em-dash pair closes back into
`…is due Jan 15 and cannot be requested before November 1.` Both are **retranslate**
operations, bringing the Phase-2 worklist to 6 splices + 5 retranslations = **11 stamps**.

**Edit 8 was also added mid-build (2026-08-31)**, on the same review pass. It is the one
edit in this plan that is a **reword rather than a removal**: `— application Jan 2 rather
than Jan 15, decisions Feb 26 rather than April 9` was elliptical to the point of reading as
telegraphese, and becomes `— applications are due Jan 2 rather than Jan 15, decisions
release Feb 26 rather than April 9`. The user proposed `application**s** are due`, a plural
verb on a singular noun; it ships fully plural. **Edit 8 adds no new stamp** — it rewrites
the same `4a73f750` string edit 2 already trims, so the worklist stays at **11**. That also
means edit 2's Phase-2 retranslation is no longer a pure trim: see step 16.

We know it worked when Country Day's JK/K band renders one watch-out card with a shortened
paragraph; the Grades 1–4 band renders one watch-out card with the brochure clause gone;
that band's printable checklist sheet opens straight at the row list with no tinted callout
bar; both JK/K checklist sheets (Country Day **and** Charlotte Christian) read
`Your deadline is Jan 2.`; and `npm run build` is green with every locale still rendering
translated prose rather than falling back to English.

## Context

### Where all six live

Every target is in **one file** —
[src/data/admissionsPrograms/charlotte-country-day.ts](src/data/admissionsPrograms/charlotte-country-day.ts)
— except edit 6, which additionally touches
[src/data/admissionsPrograms/charlotte-christian.ts](src/data/admissionsPrograms/charlotte-christian.ts).
The data is typed by [src/data/admissionsPrograms.ts](src/data/admissionsPrograms.ts) and
rendered by two components.

Exact current locations:

| # | Line | Field |
|---|---|---|
| 1 | [:170](src/data/admissionsPrograms/charlotte-country-day.ts#L170) | `bands[0].watchOuts[1]` (`kicker` + `text`) |
| 2 | [:166](src/data/admissionsPrograms/charlotte-country-day.ts#L166) | `bands[0].watchOuts[0].text` |
| 3 | [:307](src/data/admissionsPrograms/charlotte-country-day.ts#L307) | `bands[1].watchOuts[1]` (`kicker` + `text`) |
| 4 | [:303](src/data/admissionsPrograms/charlotte-country-day.ts#L303) | `bands[1].watchOuts[0].text` |
| 5 | [:312](src/data/admissionsPrograms/charlotte-country-day.ts#L312) | `bands[1].checklistCallout` (whole object) |
| 6 | [:175](src/data/admissionsPrograms/charlotte-country-day.ts#L175) + [charlotte-christian.ts:228](src/data/admissionsPrograms/charlotte-christian.ts#L228) | `bands[0].checklistCallout.lead` |

The three bands are `jkk` ([:96](src/data/admissionsPrograms/charlotte-country-day.ts#L96)),
`g14` ([:233](src/data/admissionsPrograms/charlotte-country-day.ts#L233)) and `g512`
([:365](src/data/admissionsPrograms/charlotte-country-day.ts#L365)). **Band `g512` is not
touched by any edit** — its two watch-outs and its `Book the ISEE early.` callout stay
exactly as they are.

### Two render paths, and they are different pages

- **Watch-outs (edits 1–4) render on the school page.** `AdWatchOut` is
  `{ kicker: string; text: string }` at
  [src/data/admissionsPrograms.ts:86](src/data/admissionsPrograms.ts#L86); the band field
  `watchOuts: AdWatchOut[]` at [:114](src/data/admissionsPrograms.ts#L114) is **required**.
  Rendered at exactly one place,
  [src/components/AdmissionsProgram.tsx:298–312](src/components/AdmissionsProgram.tsx#L298-L312),
  inside `<div className="ad-watch">`.

- **Checklist callouts (edits 5–6) render on the standalone printable sheet.**
  `checklistCallout` is read at exactly one place,
  [src/pages/AdmissionsChecklist.tsx:124–126](src/pages/AdmissionsChecklist.tsx#L124-L126)
  — the route `/school/<slug>/admissions-checklist/`. **It does not appear on the school
  page at all.** Confirmed by grep: the only two references repo-wide are the type
  declaration and that one render.

  That route already warms its own overlay —
  [AdmissionsChecklist.tsx:49](src/pages/AdmissionsChecklist.tsx#L49) calls
  `loadAdmissionsOverlay(lang)` and gates render behind a ready flag. **Do not remove or
  reorder that**; it is the fix for a shipped defect where the sheet rendered English in all
  nine locales at 100% coverage with every checker green.

### No CSS change is needed anywhere

`.ad-watch` at [src/index.css:5318](src/index.css#L5318) is
`display: flex; flex-direction: column; gap: 14px` — **a one-card column is already a
correct shape**, no `:empty` state and no grid track to collapse. `.ad-grid`'s `is-wide`
modifier only triggers at `watchOuts.length === 0`, which never happens here (both bands
keep one card). `.adx-callout` at [src/index.css:5568](src/index.css#L5568) is a plain
block that simply is not emitted when the field is absent.

Do **not** touch `src/index.css`.

### Edit 5 needs the type made optional — the one code change in this plan

`checklistCallout: { lead: string; text: string }` at
[src/data/admissionsPrograms.ts:116](src/data/admissionsPrograms.ts#L116) is **required**,
and all **10 bands across all three admissions schools** currently carry one (Providence Day
3, Charlotte Christian 4, Country Day 3). Removing Country Day's Grades 1–4 callout
therefore needs the field made optional plus a render guard. The user chose this over
blanking `text` and leaving a short bar, so that no empty tinted band ships and any future
band can omit it the same way.

### The translation layer — this is the hard part

Admissions is a translated prose topic (`admissions: 'admissionsPrograms'` at
[scripts/i18n_topics.mjs:45](scripts/i18n_topics.mjs#L45)), shipped in all nine
`PROSE_TRANSLATED` locales ([src/lib/i18n.ts:182](src/lib/i18n.ts#L182)): `es bn ht te fr
fa it hi ar`. Each has a shipped overlay `src/data/overlays/admissions.<lang>.json` and a
work-file sibling `src/data/overlays/work/admissions.<lang>.json`. **Measured: all 18 files
hold exactly 442 units and all twelve stamps below are present in every one.**

**How resolution works, because it decides the procedure.** `indexOverlay()` at
[src/lib/localizeData.ts:59](src/lib/localizeData.ts#L59) keys a `Map` by each **`at`
path**; `walk()` at [:132](src/lib/localizeData.ts#L132) looks up by path and uses the `of`
stamp only as a staleness guard — a mismatch silently returns English. So the runtime is
**path-keyed with a stamp guard**, and an array deletion that shifts sibling indices breaks
the *paths* of survivors even when their stamps are still valid.

**Both card deletions here are LAST-element deletions, which is the cheap case.** Edit 1
removes `bands[0].watchOuts[1]` and edit 3 removes `bands[1].watchOuts[1]`; in each case
`watchOuts[0]` survives at index 0 with its path unchanged. **No re-pathing is needed
anywhere in this plan** — unlike PR #259, which deleted `stats[0]` and had to rewrite six
survivors' `at` entries. Do not import that step from the precedent plan.

**The complete overlay worklist**, measured from the work files:

| # | Stamp | English (truncated) | `at` | Operation |
|---|---|---|---|---|
| 1 | `a920c12f` | `One test serves seven schools` | cd `bands[0].watchOuts[1].kicker` | **splice** |
| 1 | `bc71c525` | `The CAIS screening is a consortium assessment…` | cd `bands[0].watchOuts[1].text` | **splice** |
| 2 | `4a73f750` | `This band runs on an **entirely earlier calendar**…` | cd `bands[0].watchOuts[0].text` | **retranslate** (new stamp) |
| 3 | `172e523b` | `Budget the testing fee separately` | cd `bands[1].watchOuts[1].kicker` | **splice** |
| 3 | `8f8a3d93` | `The **$300** CAIS fee is paid…` | cd `bands[1].watchOuts[1].text` | **splice** |
| 4 | `b002c06d` | `Grades 1–4 sit inside the **same CAIS screening population**…` | cd `bands[1].watchOuts[0].text` | **retranslate** (new stamp) |
| 5 | `b7d8d954` | `The portal is your material list.` | cd `bands[1].checklistCallout.lead` | **splice** |
| 5 | `5c1d54ec` | `Unlike JK/K, grades 1–4 have no separately published…` | cd `bands[1].checklistCallout.text` | **splice** |
| 6 | `f4958447` | `Your deadline is Jan 2, not Jan 15.` | **cc `bands[0].checklistCallout.lead` + cd `bands[0].checklistCallout.lead`** | **retranslate** (new stamp, **2 paths**) |
| 7 | `f2534f0b` | `…due Jan 15 — after the application, which is correct…` | cd `bands[0].checklistCallout.text` | **retranslate** (new stamp) |
| 7 | `eb3db25a` | `…due Jan 15 — after the application… — and cannot be requested…` | cc `bands[0].checklistCallout.text` | **retranslate** (new stamp) |

(`cd` = charlotte-country-day, `cc` = charlotte-christian.)

**Edit 6 is a SHARED entry — this is the trap in this plan.** Stamp `f4958447` carries two
`at` paths because the extractor de-duplicates identical English into one entry covering
many paths. Charlotte Christian's JK/K callout is the byte-identical string. The user chose
to change **both schools** (both read `Your deadline is Jan 2.`), which is also the easy
case: change the English in both `.ts` files, and the single overlay entry keeps both `at`
paths and gets one new stamp and one new translation. **If you change only one school's
English, the entry must be SPLIT — do not do that here.**

Two stamps left alone that look adjacent and are not: `11ad6e67`
(`Why JK/K is its own band` — edit 2 trims the *text*, never the kicker) and `0f710f2f`
(`Same test as JK/K, different clock` — same, edit 4 trims the text).

**Superseded by edit 7:** `f2534f0b` (cd `bands[0].checklistCallout.text`) was originally on
this leave-alone list, because edit 6 trims only the `lead`. Edit 7 trims that `text` as
well, so it is now a retranslate — along with its Charlotte Christian counterpart
`eb3db25a`.

**Why a re-extract is the wrong tool.** `i18n_extract.mjs` emits `t: ''` for entries it has
not seen translated, which would **blank all nine translated files**. Never re-extract to
apply a deletion — splice the work files, then rebuild with
`scripts/i18n_build_overlay.mjs`, which is a pure pass-through that copies `{t, of, at}`
and drops only empty-`t` entries. This is the standing lesson from PR #248 and PR #258.

**The three retranslations are trims, not fresh translations.** Each removed clause has a
one-to-one counterpart the translator already rendered (verified in `es` and `ar`), so the
correct operation is to delete that clause from the existing `t` and leave the rest of the
sentence untouched — not to re-translate the paragraph. This is what keeps the register
consistent with the reviewed prose around it.

### Checks that will catch a mistake

- `npm run check:live` (chained into `npm run build`) exits 1 on any shipped overlay entry
  whose stamp no longer occurs in live English. **This is what makes Phase 2 mandatory
  rather than optional** — and it is why Phase 1 legitimately ends with a red build.
- `npm run check:runtime` recomputes every stamp from the work file's `text`, and also
  enforces non-empty + length-ratio rules on every translated value.
- `npm run check:sepdrift -- --lang <code>` guards against separator re-typing in the
  edited figures (`Jan 2`, `$300`, `$100` all appear in these strings).
- **Neither resolution checker verifies that an `at` path still EXISTS in the data.** That
  failure mode is silent, renders English, and is visible only in a browser. Hence the
  browser step in Verification.

## Decisions

- **Make `checklistCallout` optional rather than blanking its `text`** — user's choice.
  `checklistCallout?: { lead: string; text: string }` plus a truthiness guard in
  `AdmissionsChecklist.tsx`. The alternative left an empty tinted bar on the sheet.
- **Edit 6 changes both Country Day and Charlotte Christian** — user's choice. Keeps the
  two JK/K sheets consistent and avoids splitting a shared overlay entry.
- **Both card deletions keep one sibling card; `watchOuts` never becomes `[]`** — so
  `.ad-grid` keeps its two-column layout and the `is-wide` path is not exercised. Nothing
  in `AdmissionsProgram.tsx` or `index.css` changes.
- **Band `g512` (Grades 5–12) is untouched.** No edit names it.
- **Facts removed are not relocated.** The user asked for these cuts, not for the content
  to be preserved elsewhere. The CAIS consortium rules, the $300 fee terms and the portal
  material list all remain covered by `steps[].detail` in the same bands — verified: the
  JK/K `CAIS screening + classroom visit` step already carries the $300-vs-$100 split, and
  the Grades 1–4 `Provide supporting materials` step already says the portal is the list.
- **The research files are not edited.** `source-material/admissions/charlotte-country-day/`
  keeps the full CAIS detail with its provenance; this plan trims the *presentation*, and
  the record of what the school published stays intact.
- **Leave a one-line comment at each cut site** recording that it was removed by user
  request (2026-08-31), so a later enrichment pass reads it as a decision rather than an
  unresearched gap. Same reason PR #258 annotated Charlotte Christian's file. One line
  each; do not restate this plan.

## Approvals needed

**None.** Every edit removes existing content from existing cards — no new card, section,
stat tile, Compare row, metric key or topic, and no reordering. The UX-design gate in
`CLAUDE.md` does not apply. The type change in edit 5 is a widening (required → optional)
that adds no surface.

## Steps

### Phase 1 — English

1. **Branch** from an up-to-date `main`:
   `git checkout main && git pull && git checkout -b fix/cds-admissions-trims`.

2. **Edit 1 — delete the `One test serves seven schools` card.** In
   [charlotte-country-day.ts:169–172](src/data/admissionsPrograms/charlotte-country-day.ts#L169-L172),
   remove the entire second object from `bands[0].watchOuts`, leaving a **one-element**
   array holding only `Why JK/K is its own band`. Do not change the array to `[]` and do not
   remove the `watchOuts` key.

3. **Edits 2 + 8 — trim the last sentence of `Why JK/K is its own band`, and reword its
   opening clause.** In the surviving
   `bands[0].watchOuts[0].text`, drop the final sentence in full, including everything after
   its semicolon. The result is exactly:

   ```
   This band runs on an **entirely earlier calendar** — applications are due Jan 2 rather than Jan 15, decisions release Feb 26 rather than April 9. It also carries two requirements the older bands do not: a **separately deadlined teacher recommendation** and a **classroom visit** for your child.
   ```

   (Removed: `Miss the Jan 2 date and you are not on the Grades 1–12 track as a fallback; you are late for this one.`)

4. **Edit 3 — delete the `Budget the testing fee separately` card.** In
   [charlotte-country-day.ts:306–309](src/data/admissionsPrograms/charlotte-country-day.ts#L306-L309),
   remove the entire second object from `bands[1].watchOuts`, leaving a **one-element**
   array holding only `Same test as JK/K, different clock`.

5. **Edit 4 — remove the brochure aside from `Same test as JK/K, different clock`.** In the
   surviving `bands[1].watchOuts[0].text`, delete the em-dashed parenthetical
   `— the consortium brochure covers Pre-K through Grade 4 —` and close the sentence
   cleanly. The result is exactly:

   ```
   Grades 1–4 sit inside the **same CAIS screening population** as JK/K, but on the **later Grades 1–12 calendar**. So the assessment is the JK/K one while every date is the older bands'. The instrument itself splits at **Grade 1 vs Grade 2**, not at the band boundary: a Grade 1 applicant takes the WPPSI-IV, a rising Grade 2–4 applicant the WISC-V.
   ```

   Note the comma replacing the opening em dash — the sentence must not be left with a
   dangling `as JK/K but on`. This is the edit carrying the editorial rule: we state the
   fact, we do not narrate the brochure.

6. **Edit 5a — make `checklistCallout` optional.** At
   [src/data/admissionsPrograms.ts:116](src/data/admissionsPrograms.ts#L116) change
   `checklistCallout: { lead: string; text: string }` to
   `checklistCallout?: { lead: string; text: string }`, and update the doc comment above it
   to say the callout is optional and a band that omits it opens straight at the row list.

7. **Edit 5b — guard the render.** At
   [src/pages/AdmissionsChecklist.tsx:124–126](src/pages/AdmissionsChecklist.tsx#L124-L126)
   wrap the `<div className="adx-callout">` in `{active.checklistCallout && ( … )}` so the
   div is **not emitted at all** when the field is absent — not rendered empty. Add a short
   comment saying why, mirroring the `watchOuts` comment in `AdmissionsProgram.tsx`.

8. **Edit 5c — delete the callout from Country Day's Grades 1–4 band.** Remove the whole
   `checklistCallout: { … }` object at
   [charlotte-country-day.ts:311–314](src/data/admissionsPrograms/charlotte-country-day.ts#L311-L314).
   `checklistRows` immediately below it is **not** touched.

9. **Edit 6 — trim the shared JK/K lead in BOTH schools.** Change
   `lead: 'Your deadline is Jan 2, not Jan 15.'` to `lead: 'Your deadline is Jan 2.'` at
   **both** [charlotte-country-day.ts:175](src/data/admissionsPrograms/charlotte-country-day.ts#L175)
   **and** [charlotte-christian.ts:228](src/data/admissionsPrograms/charlotte-christian.ts#L228).
   The `text` beneath each is unchanged in both files — including its
   `The teacher recommendation is due Jan 15` sentence, which is where that fact now lives.

10. **Edit 7 — remove the misprint aside from BOTH JK/K callout texts.** In
    `charlotte-country-day.ts` the sentence ends: `The teacher recommendation is due Jan 15.`
    In `charlotte-christian.ts` the sentence continues, so the em-dash pair closes back into
    the following clause: `The teacher recommendation is due Jan 15 and cannot be requested
    before November 1.` Do not leave a dangling em dash in either.

11. **Add the one-line decision comments** described in Decisions.

12. **Do NOT touch `src/index.css`.** `.ad-watch` already renders a one-card column and
    `.adx-callout` simply is not emitted. No stylesheet change is correct here.

13. **Verify Phase 1** per the Verification section, then commit and push. **`npm run build`
    will be RED at `check:live`** with **11 unresolvable stamps per locale** (6 spliced + 5
    retranslated). That is the expected, correct Phase-1 state, cleared by Phase 2. Do not
    "fix" it by editing `FOREIGN_TOPICS` or any allowlist.

14. **Stop and report to the user.** Show them the two bands rendering one watch-out card
    each, the Grades 1–4 checklist sheet with no callout bar, and both JK/K sheets reading
    `Your deadline is Jan 2.` Wait for their confirmation before starting Phase 2. Per the
    repo's standing two-phase rule, both phases land in **one** PR.

### Phase 2 — Every other locale

Nine locales per `PROSE_TRANSLATED`: `es bn ht te fr fa it hi ar`. This is the **overlay**
layer, not `src/locales/*.json` — this plan adds no UI chrome. See
[`.claude/docs/prose-translation-architecture.md`](../docs/prose-translation-architecture.md)
for the mechanism.

14. **Re-measure the worklist before editing anything.** Run
    `node scripts/check_live_resolution.mjs --topic admissions --lang es --verbose` and
    confirm it names exactly the **eleven** stamps from the Context table. The checker exits
    at the first failing locale and its default output is display-capped, so use
    `--verbose`. If it names anything else, stop — Phase 1 changed more than intended.

15. **Write one surgery script** (in the scratchpad, **not** committed) running over each of
    the nine `src/data/overlays/work/admissions.<lang>.json` files. Dump with 2-space
    indent, `ensure_ascii=False` (Python) or `JSON.stringify(j, null, 2) + '\n'` (Node), and
    a trailing newline — otherwise the non-Latin scripts re-escape into a whole-file noise
    diff.

    **(a) Splice out the six deleted strings**, matching on the **`of` stamp**, never the
    array index:

    | Stamp | English |
    |---|---|
    | `a920c12f` | `One test serves seven schools` |
    | `bc71c525` | `The CAIS screening is a consortium assessment…` |
    | `172e523b` | `Budget the testing fee separately` |
    | `8f8a3d93` | `The **$300** CAIS fee is paid…` |
    | `b7d8d954` | `The portal is your material list.` |
    | `5c1d54ec` | `Unlike JK/K, grades 1–4 have no separately published…` |

    **Before splicing each, assert its `at` array has length 1 and names only
    `charlotte-country-day`.** All six are sole-path entries; a splice of a shared entry
    would break another school silently. **Assert a drop count of exactly 6 per language** —
    a silent 0-drop leaves the build red for a confusing reason.

    **(b) Do NOT re-path anything.** Both deletions are last-element removals, so every
    surviving `at` path is still correct. If you find yourself editing an `at` string, stop
    — that means the wrong element was deleted in Phase 1.

16. **Retranslate the five edited strings.** For each of `4a73f750` (edit 2), `b002c06d`
    (edit 4), `f4958447` (edit 6), `f2534f0b` (edit 7, cd) and `eb3db25a` (edit 7, cc), in
    each of the nine work files:

    - Update `text` to the **new English** from Phase 1.
    - Update `of` to the **new stamp** — recompute it, do not invent it. Get it from
      `check:live --verbose` output or from the same FNV-1a helper the extractor uses.
    - **Trim the existing `t` rather than re-translating it.** Each removed clause has a
      one-to-one counterpart already rendered by the reviewed translation:
      - `4a73f750` — TWO changes, because edits 2 and 8 share this string. Delete the final
        sentence (the `Miss the Jan 2 date…` / `; you are late for this one` clause); AND
        reword the opening elliptical clause to match the new English — `applications are
        due Jan 2 rather than Jan 15, decisions release Feb 26 rather than April 9`. The
        second is the only place in this plan where a translation gains words rather than
        losing them, so it cannot be done by deletion alone. Keep `Jan 2`, `Jan 15`,
        `Feb 26` and `April 9` char-for-char.
      - `b002c06d` — delete the em-dashed brochure clause and repair the join to a comma, as
        in the English.
      - `f4958447` — delete the trailing `, not Jan 15` equivalent (e.g. `es`
        `Su plazo es el 2 de enero, no el 15 de enero.` → `Su plazo es el 2 de enero.`).
      - `f2534f0b` / `eb3db25a` — delete the `after the application, which is correct and
        not a misprint` aside. For `f2534f0b` (Country Day) the sentence then ENDS at
        `Jan 15`; for `eb3db25a` (Charlotte Christian) it continues, so rejoin to the
        `and cannot be requested before November 1` clause without a dangling dash.
    - **Leave `f4958447`'s `at` array with BOTH paths** (`charlotte-christian:…` and
      `charlotte-country-day:…`). Both schools changed identically, so one entry still
      serves both. Do not split it.

    **Figures are copied char-for-char and never re-typed** — `Jan 2`, `Jan 15`, `Feb 26`,
    `April 9`, `Grade 1`, `Grade 2`, `WPPSI-IV`, `WISC-V`. For `fa` and `ar`, keep the
    existing LRI/PDI isolate handling exactly as the surrounding text has it — isolates are
    applied at render, so the stored strings carry none. For `hi` and `te`, store no
    regrouped digits.

17. **Rebuild the nine shipped overlays:**
    `for l in es bn ht te fr fa it hi ar; do node scripts/i18n_build_overlay.mjs --topic admissions --lang $l; done`

18. **Assert the six stamps are gone from all 18 files:**
    `grep -l 'a920c12f\|bc71c525\|172e523b\|8f8a3d93\|b7d8d954\|5c1d54ec' src/data/overlays/admissions.*.json src/data/overlays/work/admissions.*.json`
    must print **nothing**. And confirm each file dropped from 442 to **436** units (the five retranslations change stamps in place and do not change the count).

19. **Run the full Verification below**, then commit to the same branch, open one PR
    covering both phases, and update `.claude/plans/INDEX.md`.

## Verification

### Phase 1

```bash
npx tsc -b                                   # NOT --noEmit; read the exit code
npm run check:schema
npm run dev                                  # then the browser checks below
```

`npm run build` is expected to fail at `check:live` in Phase 1. Confirm it fails with
**exactly the nine expected stamps** and nothing else — that is the check, not the green.

**Browser, English** (`npm run dev`, then `?lang=en`):

- `/school/charlotte-country-day/` → Admissions → **JK/K**: one watch-out card
  (`Why JK/K is its own band`), opening `…— applications are due Jan 2 rather than Jan 15,
  decisions release Feb 26 rather than April 9.` and ending at `…classroom visit for your
  child.` The card is
  still in the right-hand column beside the stepper, not full width.
- Same page → **Grades 1–4**: one watch-out card (`Same test as JK/K, different clock`),
  with no brochure clause and no dangling `as JK/K but on`.
- Same page → **Grades 5–12**: **two** cards, unchanged.
- `/school/charlotte-country-day/admissions-checklist/` → Grades 1–4 → sheet opens straight
  at the numbered rows, **no tinted bar**, and no empty space where it was.
- Same route → JK/K → `Your deadline is Jan 2.` followed by a sentence ending
  `The teacher recommendation is due Jan 15.` — no misprint aside, no dangling dash.
- `/school/charlotte-christian/admissions-checklist/` → JK/K → `Your deadline is Jan 2.` and
  `…due Jan 15 and cannot be requested before November 1.`
- `/school/providence-day/admissions-checklist/` → all three bands still show their callout
  bars (the optional-field change must not drop them).

**The admissions card is inside a collapsed `<details>`** — a `waitForSelector('.ad-watch')`
times out on a hidden element. Force every `<details>.open = true` before measuring, and use
`domcontentloaded` rather than `networkidle` (the Latest News fetches live, so the network
never idles).

### Phase 2

```bash
npm run build                                # green now: check:live, check:runtime, check:chrome, check:schema
npm run check:live
npm run check:runtime
for l in es bn ht te fr fa it hi ar; do npm run check:sepdrift -- --lang $l; done
```

**Browser, per locale.** Load `/school/charlotte-country-day/?lang=<code>` and
`/school/charlotte-country-day/admissions-checklist/?lang=<code>` for **at least `es`, `ar`
and `hi`** — one Latin, one RTL, one lakh/crore script. The locale key is `csc.lang` /
`?lang=`, **not** i18next's default. For each, confirm:

- The surviving watch-out cards render **translated**, not English.
- The JK/K checklist lead reads the trimmed translated form, on **both** Country Day and
  Charlotte Christian.
- The Grades 1–4 sheet shows no callout bar.
- `ar` and `fa`: the figures inside the trimmed paragraphs still read left-to-right.

A silent fall-back to English is the failure mode no checker sees — this browser pass is
the only thing that catches it.

## Risks

| Risk | Why it matters | Mitigation |
|---|---|---|
| Splicing the shared `f4958447` entry instead of retranslating it | Charlotte Christian's JK/K sheet silently falls back to English | Step 15(a) asserts `len(at) == 1` before every splice; `f4958447` is not on the splice list |
| Deleting `watchOuts[0]` instead of `[1]` | Reindexes the survivor; its `at` path breaks and the card renders English with every checker green | Steps 2 and 4 name the **second** object explicitly; step 15(b) says stop if any `at` needs editing |
| Re-extracting instead of splicing | Blanks all nine translated files (`t: ''`) | Called out in Context and step 15; PR #248 / #258 precedent |
| Making the type optional without the render guard | `active.checklistCallout.lead` throws on the Grades 1–4 sheet | `tsc -b` catches it; step 7 pairs the guard with the type change |
| Trimming the English but forgetting a stamp update | Overlay entry becomes unresolvable; locale renders English | `check:live` in the build catches every one |
