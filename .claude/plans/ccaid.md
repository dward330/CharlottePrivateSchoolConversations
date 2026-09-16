---
name: ccaid
title: Correct Charlotte Christian's financial-aid data — SSS by NAIS → Clarity, and publish the deadlines the school now publishes
status: not-implemented
phases: 2
created: 2026-09-15
branch: fix/ccaid
prs: []
---

# Correct Charlotte Christian's financial-aid data (SSS by NAIS → Clarity)

## Goal

Charlotte Christian School has moved financial aid off **SSS by NAIS** to **Clarity**, now
publishes both aid deadlines the app records as *"not published"*, and no longer requires
the parallel **NC Opportunity Scholarship** application the app calls mandatory. The app
currently sends aid applicants to a platform the school has left, and links to its login
page.

This plan corrects the four affected strings in
`src/data/admissionsPrograms/charlotte-christian.ts` plus two stale source entries, fixes
one line in `src/data/financialAidReports.ts`, and re-translates the changed strings into
the nine prose locales. Done when a parent reading the Admissions area in any locale is
told to apply through Clarity by Jan 22 2027, and `npm run build` is green.

## Context

The freshness check run by `/admissions-episode` on 2026-09-14 compared the app's shipped
data against the school's own live pages and found four differences. Episode 37 (PR #301)
was **built from the corrected values**, so the published podcast is currently ahead of
the website — this plan closes that gap.

**Everything below was verified against raw HTML, not a summarizer** (see the `$65` trap in
Decisions). The full record with verbatim quotes is in the source-material file listed
under *Source material*.

What exists today — all line numbers from `main` at `a626d1c`:

- `src/data/admissionsPrograms/charlotte-christian.ts` — **887 lines.** The
  `AdmissionsProgram` for this school. Four aid strings are wrong:
  - **L662** `guide.aid.text` — "Aid runs through **SSS by NAIS** (school code **2318**)
    … Every aid family must **also apply to the North Carolina Opportunity Scholarship
    Program**, which opens February 2. **The deadline for this cycle is not published**".
  - **L807** `guide.checklist.aidPanel.items[0]` — "Apply through SSS by NAIS — Charlotte
    Christian's school code is 2318. Upload the federal income tax return, W-2…"
  - **L810** `items[3]` — the mandatory NC Opportunity Scholarship item.
  - **L811** `items[4]` — "The aid deadline for the 2026–27 cycle is not published…"

  Plus two stale entries in `sources[]`: **L849** (label mentions SSS + Opportunity) and
  **L877–878** (an entry whose `url` is `sssandtadsfa.my.site.com`, a platform the school
  no longer uses), **L882–883** (the `k12.ncseaa.edu` Opportunity entry).

- `src/data/financialAidReports.ts` — the `CHARLOTTE_CHRISTIAN` block spans **L633–884**.
  **L726** carries a timeline row: *"Priority deadline for **current families** and for new
  **JK/K** applicants — via SSS by NAIS, school code 2318"* dated `2 Feb 2026`.

  Note **L269** (a *different* school's block) already says *"a stale portal page still
  names the old SSS platform — the live admissions page (Clarity) is the one to trust"* —
  part of the repo already knows about this migration.

- **The locale layer.** `admissions` maps to `admissionsPrograms` in
  `scripts/i18n_topics.mjs:45`. `PROSE_TRANSLATED` (`src/lib/i18n.ts:182`) is
  `['es','bn','ht','te','fr','fa','it','hi','ar']` — **nine locales**. Each has
  `src/data/overlays/admissions.<lang>.json` (923 entries) with a work-file sibling at
  `src/data/overlays/work/admissions.<lang>.json`.

  **Measured, not assumed:** exactly **4 entries per locale** carry these strings —
  stamps `5cdd7282` (`guide.aid.text`), `41ae2429` (`aidPanel.items[0]`), `483d6800`
  (`items[3]`), `92270c6b` (`items[4]`). **4 × 9 = 36 retranslations.**

  ⚠️ The **shipped** overlay stores `t` (translation) + `of` (FNV-1a stamp) and **not** the
  English — a grep for English text there returns 0 and means nothing. The **work** file
  carries the English in `text`. This bit during planning; do not repeat it.

- **`rules[].text` renders RAW** (`<strong>{title}</strong> {text}` in
  `AdmissionsProgram.tsx`) — no markdown. `**bold**` IS supported in `steps[].detail`,
  `watchOuts[].text` and `aid.text`. The file's own NOTE FOR EDITORS block says so. None of
  the strings this plan edits are `rules[].text`, but do not "tidy" one into that field.

## Decisions

- **Keep the `$100` admissions fee and add the `$65` Clarity fee as a separate figure** —
  the live page's sentence "The application fee is $65" sits inside the Clarity paragraph
  and is the *aid platform's* fee. A summarizer conflated them; raw HTML separated them.
  Both are real and different. Never collapse them.
- **Ship `cycle` as `2027–28 entry cycle`** — the Apply page, rewritten 1 Sep 2026, heads
  these exact dates "2027-28 School Year" while the older PDFs head the same dates
  "2026-27". Apply Jan 2027 → decide Apr 2027 → start Aug 2027 = the 2027-28 school year.
  The newest document wins. **No date value changes** — this is a label correction only.
- **Delete the NC Opportunity Scholarship item rather than soften it** — it is absent from
  the live page (`Opportunity` = 0 occurrences), and this repo's own financial-aid research
  records that NC Opportunity Scholarship participation "concludes after 2025–26". Stating
  a mandatory second application that no longer exists is worse than silence.
- **Replace `items[3]` with the Clarity webinar dates** rather than leaving a 4-item list —
  keeps the panel's shape and adds genuinely useful published information.
- **Do NOT re-extract the overlays; splice by stamp.** Re-running the extractor rewrites
  all nine work files wholesale. The established technique for editing a handful of
  translated strings is to splice the affected entries **by stamp** and rebuild — see
  `removenotpublisheddeficient` (PR #248), which did exactly this.
- **Do not touch `src/data/financialAidReports.ts` L269** — it belongs to a different
  school's block and is already correct.
- **Leave the school's own typos alone.** The Apply page says "January 2, **2026**" on one
  tab; the calendar PDF says "Feb. 1, **2026**". Both are the school's errors, both already
  corrected to 2027 in the app, and both are documented in the source-material file.

## Approvals needed

**None.** This is a data correction that re-uses existing cards, fields and Compare rows —
no new card, section, stat tile, Compare row, metric key or topic, and no component,
layout or styling change. The UX-design gate does not apply.

It is **not** a deploy authorization: publishing remains the user's separate call.

## Source material

Already written during planning, **uncommitted**:

- `source-material/admissions/charlotte-christian/Charlotte Christian - Admissions - Financial Aid Platform Migration to Clarity.md`

It carries the provenance header, the four source URLs, verbatim quotes for every figure,
the `$65`-vs-`$100` trap, the cycle-label conflict and the school's two typos.

**`/implement` runs the `ingest-source-material` skill on it first**, on the branch, before
editing any `src/` file.

## Out of scope

- **Deploying.** Merge and stop.
- **Re-generating episode 37 or its PDF.** The episode already ships the corrected values;
  this plan brings the app up to it. The other five schools' episodes are explicitly **not**
  being regenerated (user's call, 2026-09-15).
- **The other five admissions schools.** Only Charlotte Christian migrated.
- **Tuition figures.** Re-verified unchanged (JK/K $21,300 · 1-4 $23,295 · 5-8 $24,575 ·
  9-12 $27,055) and out of scope.
- **`src/data/financialAidReports.ts` beyond the single L726 row.** That report is a
  historical 2026-27 document with its own retrieval date; only the row that names the
  platform as current guidance is corrected.

## Steps

Two phases — this changes user-facing research prose reached by the overlay layer.

### Phase 1 — English

1. **Branch** — `git checkout -b fix/ccaid` from an up-to-date `main`.

2. **Ingest the source material** — run the `ingest-source-material` skill so the new
   `source-material/admissions/charlotte-christian/…Clarity.md` flows into
   `.claude/docs/` notes and `src/data/schools.json`. Commit the result before step 3, so
   the ingest is separable from the hand edits.

3. **Correct `guide.aid.text`** (`src/data/admissionsPrograms/charlotte-christian.ts`,
   ~L662). Replace with — `**bold**` IS supported in this field:

   > Aid runs through **Clarity** — the school moved off SSS by NAIS, and no school code is
   > used — is **need-based only** and is capped at **50 percent of tuition**. The Clarity
   > application carries its own **$65 fee**, separate from the $100 admissions application
   > fee, and takes under an hour. **Prospective families apply by Jan 22, 2027**; families
   > already at the school apply by Nov 1, 2026. Awards are made only after a student is
   > accepted.

4. **Correct `aidPanel.items[0]`** (~L807):

   > Apply through Clarity, the school's financial-assistance platform — it replaced SSS by
   > NAIS, so a school code is no longer used. The application takes under an hour, is
   > mobile-friendly, and carries a $65 application fee of its own, separate from the $100
   > admissions fee.

5. **Replace `aidPanel.items[3]`** (~L810) — the NC Opportunity Scholarship item becomes:

   > Clarity runs free family information webinars each fall covering the application and
   > tax-verification process: Sept 29 (10 p.m.), Sept 30 (6 p.m.), Oct 27 (10 p.m.),
   > Oct 28 (6 p.m.) and Dec 8, 2026 (8:30 p.m. EST), each with its own registration link.

6. **Correct `aidPanel.items[4]`** (~L811) — the "not published" line becomes:

   > The aid deadlines are published for this cycle: prospective families apply by
   > Jan 22, 2027 and current families by Nov 1, 2026. Note that Jan 22 falls a week after
   > the Jan 15 admissions deadline for grades 1-12, and three weeks after the Jan 2 JK/K
   > one.

7. **Update `cycle`** (~L131) from `'2026–27 entry cycle'` to `'2027–28 entry cycle'`.
   **Label only — change no date value.** Then grep the file for `2026–27` /
   `2026-27` and update only strings describing *this* entry cycle; leave the tuition-chart
   citation and the provenance/header comments referring to the 2026-27 PDFs alone.

8. **Fix the three stale `sources[]` entries** (~L849, ~L877–878, ~L882–883):
   - L849 label → name Clarity, its $65 fee, the Jan 22 2027 / Nov 1 2026 due dates, the
     50 percent cap and the fee schedule. Drop "SSS by NAIS" and "NC Opportunity
     Scholarship".
   - The `sssandtadsfa.my.site.com` entry → Clarity, `url` becomes
     `https://www.charlottechristian.com/admissions/tuition` (the school's own page carries
     the apply link; do not invent a Clarity deep link).
   - The `k12.ncseaa.edu` entry → **delete it**, or repoint to the tuition page as the
     Clarity-webinars source. Do not leave a live link to a requirement the school dropped.

9. **Update the file's header comment block.** It currently asserts the live
   `/admissions/apply` page is STALE and that the aid deadline is NOT PUBLISHED — both now
   false. Rewrite that section to record: the Apply page was refreshed 1 Sep 2026 and is
   now authoritative for the cycle label; aid moved to Clarity; the deadlines are
   published; the Opportunity requirement is gone. **Keep** the four-bands-from-three-
   documents finding, the two-typos note and the NOTE FOR EDITORS block — all still true.

10. **Correct `src/data/financialAidReports.ts` L726** — the timeline `detail` becomes
    "Priority deadline for **current families** — via Clarity" and the `when` becomes
    `1 Nov 2026`. Add a sibling row `when: '22 Jan 2027'`, detail "Priority deadline for
    **prospective families** — via Clarity". Leave every other row, the confidence score and
    the block's retrieval date untouched.

11. **English verification** — run the Phase 1 checks below.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording.

### Phase 2 — The nine prose locales

Scope is the **overlay layer**, not `src/locales/*.json` — this is research prose, not UI
chrome. Locales per `PROSE_TRANSLATED` (`src/lib/i18n.ts:182`):
`es, bn, ht, te, fr, fa, it, hi, ar`. Mechanism:
`.claude/docs/prose-translation-architecture.md`.

12. **Locate the affected entries by stamp** in each
    `src/data/overlays/work/admissions.<lang>.json`. The four current English stamps are
    `5cdd7282`, `41ae2429`, `483d6800`, `92270c6b`. **Re-derive them after Phase 1** —
    editing the English changes every stamp; the old values only locate the entries to
    replace.

13. **Splice, do not re-extract.** For each of the 9 work files, replace those 4 entries'
    `text` with the new English and `t` with a fresh translation, and update `of` to the new
    stamp. **Never re-run the extractor** — it rewrites all nine files wholesale
    (precedent: `removenotpublisheddeficient`, PR #248).

14. **Translate the four strings per locale (36 total).** Traps that apply here, from the
    rollout docs:
    - **Figures are copied char-for-char, never re-typed** — `$65`, `$100`, `50 percent`,
      `Jan 22, 2027`, `Nov 1, 2026`, `Jan 15`, `Jan 2`. `check:sepdrift` enforces this.
    - **`hi` / `te` are lakh/crore locales** — the data must still store the English 3-3-3
      figure; the render layer regroups. Do not pre-group.
    - **`fa` / `ar` are RTL** — overlays store **no** bidi isolates; they are applied at
      render. Do not add LRI/PDI to the stored strings.
    - **`%` stays unspaced in every locale, French included.**
    - Keep `Clarity` as a proper noun in every locale; it is a product name.

15. **Rebuild the nine overlays** with `scripts/i18n_build_overlay.mjs` (topic
    `admissions`). This is the **plain** overlay builder — *not*
    `i18n_build_content_overlay.mjs`, which serves the separate `src/content` layer.

16. **Locale verification** — run the Phase 2 checks below.

## Files touched

| File | Change |
|---|---|
| `source-material/admissions/charlotte-christian/Charlotte Christian - Admissions - Financial Aid Platform Migration to Clarity.md` | new — written during planning, ingested by `/implement` |
| `src/data/admissionsPrograms/charlotte-christian.ts` | edit — 4 aid strings, `cycle` label, 3 `sources[]` entries, header comment |
| `src/data/financialAidReports.ts` | edit — one timeline row (L726) + one added row |
| `src/data/overlays/work/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — 4 entries spliced per file (36 total) |
| `src/data/overlays/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | regenerated by the overlay builder |
| `.claude/docs/**`, `src/data/schools.json` | regenerated by `ingest-source-material` |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean. **Also read `npm run build`'s exit code**: `--noEmit` has
      passed on a type error the build caught.
- [ ] `npm run build` — exit 0 (chains `check:schema`, `check:seo`, `check:live`,
      `check:runtime`, `check:podcast`, `check:news`).
- [ ] `grep -rn "SSS by NAIS\|2318\|sssandtadsfa\|k12.ncseaa" src/data/admissionsPrograms/charlotte-christian.ts`
      → **0 hits**, except any deliberate "replaced SSS by NAIS" framing.
- [ ] `grep -n "not published" src/data/admissionsPrograms/charlotte-christian.ts` → the
      aid-deadline instance is gone (other not-published items may legitimately remain).
- [ ] **Browser check** — `npm run dev`, open Charlotte Christian → Admissions, expand the
      aid card and the printable checklist. Confirm: Clarity named, $65 and $100 both
      present and distinct, Jan 22 2027 and Nov 1 2026 shown, no Opportunity Scholarship,
      cycle reads 2027–28. A render-layer defect survives every automated check in this
      repo — this step is not optional.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves against the work file.
- [ ] `npm run check:live` — stamps resolve against **live** `src/data` (catches English
      edited after extraction, which `check:runtime` cannot see). Must be **0
      unresolvable**.
- [ ] `npm run check:sepdrift -- --lang <code>` for all nine — **0 drifted tokens**.
- [ ] `npm run check:figures` / `check:money` / `check:currency` — clean.
- [ ] `npm run build` — exit 0.
- [ ] **Browser check in at least `es`, `hi` (lakh/crore) and `fa` (RTL)** — `?lang=es`
      etc. Note the locale key is `csc.lang`, not i18next's default. Confirm the aid card
      renders the translated text and the figures are unmangled.

## Risks

| Risk | Mitigation |
|---|---|
| Re-running the extractor instead of splicing rewrites all 9 work files | Step 13 forbids it; PR #248 is the worked precedent |
| Stale stamps used to locate entries after the English changes | Step 12 says re-derive them post-Phase-1; old values are locators only |
| `$65` conflated with the `$100` application fee | Both figures named explicitly in steps 3–4 and in the source-material trap section; browser check asserts both |
| Grepping the shipped overlay for English returns 0 and reads as "no impact" | Context section records that the shipped file stores `t`+`of` only; use the work file |
| Cycle relabel silently shifts a date | Step 7 is label-only; every date value is asserted unchanged by the browser check |

## Open questions

- **Should `sources[]` keep a Clarity entry at all, or fold it into the tuition-page
  source?** — **default:** keep a distinct Clarity entry pointing at
  `charlottechristian.com/admissions/tuition`, since the card names Clarity as the platform
  and a reader will look for it.
- **Does the school publish a Clarity deep link worth citing?** — **default:** no; cite the
  school's own tuition page. Do not invent or guess a Clarity URL.
