---
name: hickorygroverefresh
title: Refresh Hickory Grove Christian's Admissions guide and Financial Aid card to the live site — the rolled-forward fee window, the dropped acceptance-before-aid rule, the NCSEAA and discount dates, the international fee timing, office hours and Mallard Creek
status: implemented
phases: 2
created: 2026-10-04
branch: fix/hickorygroverefresh
prs: [326]
---

# Refresh Hickory Grove Christian's Admissions and Financial Aid data to the live site

## Goal

The `/admissions-episode hickory-grove-christian` freshness check (2026-10-04) found **seven**
differences between the app and hgchristian.org. Two of them can cost a family:

1. **Application fee — CHANGED.** The app tells every applicant to "confirm the current fee",
   because the published $250 window (to May 31, 2026) predated the November 2026
   application dates. The school has **rolled the window forward**: $250 from Nov 2, 2026
   through May 31, 2027, and $500 from June 1, 2027. It is non-refundable and not applied
   toward tuition. The inconsistency is gone.
2. **Acceptance-before-aid — GONE.** The app says new families "must be accepted for
   enrollment before they can apply for aid". The school no longer says that. It now says
   "Apply immediately … email finance@hgchristian.org", and aid is awarded until funds run
   out.
3. **NCSEAA dates — CHANGED.** The app shows the closed Feb 2 – Mar 2, 2026 window (Admissions)
   and the Feb 6 – Mar 6 2025 / Mar 2, 2026 dates (Financial Aid). The live page says only
   "Applications open February 1st."
4. **5% early-pay discount — NEW to Admissions, re-dated in Financial Aid.** The live page
   says "by May 31st" with no year. The Financial Aid card says "May 31, 2026".
5. **International application fee timing — NEW contradiction.** The school's page now says
   both "due at the time of application" and (in its step list) paid after acceptance. The
   app states only "after".
6. **Office hours — CHANGED.** 7:30 a.m.–3:00 p.m. → 7:30 a.m.–3:30 p.m.
7. **Mallard Creek — CHANGED/NEW.** The school is "exploring" the classical TK/K expansion
   (the app says "is launching"), expects limited availability, and publishes a Mallard
   Creek EEC email.

**Done when** a parent reading Hickory Grove's Admissions area (school page and printable
checklist) and its Financial Aid & Tuition card, in any of the ten locales, sees the live
values for all seven, and `npm run build` exits 0.

## Context

**Why now.** The admissions podcast PDF was already built from the live values, with 23
`--overrides` on 2026-10-04, so a listener who clicks through will find the app
contradicting the episode. The override file lived in the planning session's scratchpad and
is **not** needed: every replacement string is written out in full below.

**Everything else was re-verified unchanged the same day.** See "What did NOT change" in the
source-material file.

Line numbers are from `main` at `3c7867d8`.

### Admissions: `src/data/admissionsPrograms/hickory-grove-christian.ts` (1,073 lines)

Bands: `tkk5` (0), `es` (1), `ms` (2), `hs` (3), `intl` (4). Fields to change, with each
field's overlay stamp in `src/data/overlays/work/admissions.es.json`:

| # | Field | Line | Stamp |
|---|---|---|---|
| A1 | `bands[0].steps[0].detail` (tkk5 inquiry/visit, Mallard Creek "launching") | 220 | `8b2d59d6` |
| A2 | `bands[0].steps[2].detail` (tkk5 apply + fee + Mallard Creek "not published") | 234 | `b0b3a64e` |
| A3 | `bands[1].steps[1].detail` (es apply + fee) | 346 | `4880974f` |
| A4 | `bands[2].steps[1].detail` **and** `bands[3].steps[1].detail` (ms/hs, identical, one entry) | 463, 595 | `f05c506f` |
| A5 | `bands[0].checklistRows[2].detail` | 283 | `f43abcab` |
| A6 | `bands[1..3].checklistRows[1].detail` (identical in three bands, one entry) | 390, 507, 646 | `3d61d2a5` |
| A7 | `bands[4].steps[1].detail` (intl application, fee) | 739 | `2a722558` |
| A8 | `bands[4].steps[4].detail` (intl acceptance → I-20) | 760 | `d21aa6d6` |
| A9 | `bands[4].steps[7].detail` (intl "what the program includes") | 781 | `504cbdc2` |
| A10 | `bands[4].checklistRows[1].detail` | 797 | `7c746076` |
| A11 | `bands[4].checklistRows[4].action` | 811 | `3dc7c8d1` |
| A12 | `bands[4].checklistRows[4].detail` | 812 | `77a93204` |
| A13 | `aid.text` | 846 | `250e2905` |
| A14 | `checklist.aidPanel.items[0]` | 979 | `95b6ccfd` |
| A15 | `checklist.aidPanel.items[1]` | 980 | `7eb67c47` |
| A16 | `checklist.aidPanel.items[2]` | 981 | `7bb9b07d` |
| A17 | `checklist.aidPanel.items[4]` | 983 | `2dc6a621` |
| A18 | `comparison.rows[8].cells.all` ("Constant in every band") | 937 | `2330fb6d` |
| A19 | `contacts.address` | 947 | `87d21ad5` |
| A20 | `contacts.people[1].detail` (Admissions office) | 956 | `c4bb6418` |
| A21 | `contacts.people[3].detail` (EEC — Mallard Creek) | 964 | `bb554855` |
| A22 | `checklist.contactPanel.lines[0]` | 989 | `84d557ec` |
| A23 | `checklist.disclaimer` | 996 | `263c78d5` |

That is **23 retired stamps per locale**. `checklist.aidPanel.items[3]` (ESA+, L982) is
**unchanged**. The array keeps five items, so no `at` path moves. I measured each entry's `at`
list: **every one holds only `hickory-grove-christian:` paths**, so no change here can leak
into another school.

Not extracted (they ship in English everywhere, as citations): `sources[].label/url`. Two
labels need text edits: `sources[0]` (L1002) and `sources[4]` (L1022).

The **header comment block** (L1–170) makes claims this plan invalidates: L26–38 (the fee
"LIVE INCONSISTENCY", "both figures ship"), L110–115 and L134–145 (the "2027–28 NCSEAA
window not yet published" lines), and L163–170 (contacts). Update them in step 9.

**Markdown support:** `**bold**` renders in `steps[].detail`, `watchOuts[].text` and
`aid.text`. It does **not** render in `checklistRows[]`, `comparison.rows[].cells`,
`contacts.*` or `checklist.*`, so write those fields plain.

### Financial Aid: `src/data/financialAidReports.ts`, `HICKORY_GROVE_CHRISTIAN` (L2218)

Stamps from `src/data/overlays/work/financial-aid-report.es.json`. All are Hickory Grove only:

| # | Field | Line | Stamp |
|---|---|---|---|
| F1 | `sections[1].timeline[0].when` (`'Feb–Mar'`) | 2264 | `2df569b9` |
| F2 | `sections[1].timeline[0].detail` (NCSEAA window) | 2266 | `47db5b22` |
| F3 | `sections[1].timeline[1].detail` (5% by May 31, 2026) | 2271 | `df30db5e` |
| F4 | `sections[3].plans[0].detail` (5% tile) | 2328 | `61c7ba8f` |

That is **4 retired stamps per locale** in the `financial-aid-report` topic. `timeline[1].when`
(`'By May 31'`) is already correct and stays.

### The locale layer

`admissions` → `admissionsPrograms`, and `financial-aid-report` → accessor
`financialAidReport` (`scripts/i18n_topics.mjs`). `PROSE_TRANSLATED` (`src/lib/i18n.ts:182`)
is `es, bn, ht, te, fr, fa, it, hi, ar`. Each locale has
`src/data/overlays/work/<topic>.<lang>.json` (`{text, of, at[], t}`) and a shipped
`src/data/overlays/<topic>.<lang>.json` (no English).

**`src/content/**` regenerates harmlessly.** The ingest rewrites
`src/content/admissions/hickory-grove-christian.json` and
`src/content/financial-aid-tuition/hickory-grove-christian.json`. Neither is translated or
rendered for this school, because a structured layer replaces both. The content overlay has
**zero** Hickory Grove blocks (measured), so `check:live` gate 2 is unaffected. Expect both
files in the diff.

**Nearest precedent: `covenantadmissions` (PR #324)**, the same shape for one school. Read
its *Implementation notes*. Three of its lessons are built into the steps: measure Phase 2
scope from a fresh extract; splice by stamp, never by array index; and its
`check_work_integrity --base` verification line was **wrong** (see Phase 2 verification).

## Decisions

- **Mallard Creek's "applications submitted before February 18 will be considered first" is
  NOT carried into the app** (user, 2026-10-04). The page gives no year and reads as the
  prior cycle's text. A bare "February 18" would read as a 2027 date the school has not
  published. Carry only "limited availability", and leave the date in the research file.
- **The international fee shows both published timings and sends the family to the
  international office** (user, 2026-10-04). Do not pick one. The amount stays "not
  published".
- **The fee is now stated as a fact.** The 2026-09-01 "both figures ship, confirm with the
  office" decision existed only because of the stale window. That window is gone, so remove
  the hedge everywhere.
- **No fee stat tile is added.** The header's old reason ("the figure is in doubt") no longer
  holds, but adding a stat tile is a UX change that needs approval. It is out of scope.
- **The 5% discount and NCSEAA opening carry no year** ("by May 31", "February 1"), because
  the school gives none. Never add one.
- **Admissions `aid.text` gains the discount and no-automatic-discounts line.** These are
  facts on the scholarships page a parent acts on, and the Financial Aid card already
  carries the 5% figure.
- **Office hours: 3:30 p.m.** is the live "MAIN OFFICE" figure for 704-531-4008. The label
  stays "admissions" for the email, and the phone line is called the main office in
  `contacts.address`.
- **"is launching" → "plans to open … would grow"**, which matches the school's own
  conditional wording without editorialising.
- **The Financial Aid card's stale withdrawal claim is OUT of scope.** L2372 says "no late-payment
  or withdrawal terms appear". It is recorded in the source-material file as a finding for a
  separate pass, because it was not one of the seven differences.
- **Splice by stamp; never re-extract a real work file.** The extractor emits `t: ''` and has
  no carry-over.

## Approvals needed

**None.** This is a data correction inside existing fields. It adds no card, section, stat
tile, Compare row, metric key or topic, and changes no component, layout or styling.

This is **not** deploy authorization. Merge and stop.

## Source material

Written during planning, **uncommitted**:

- `source-material/admissions/hickory-grove-christian/Hickory Grove Christian - Admissions - Live-Site Refresh 2026-10-04.md`.
  It holds provenance, verbatim live quotes for all seven differences, the superseded quotes,
  what was re-verified unchanged, the February 18 decision, and the out-of-scope withdrawal
  finding.

**`/implement` runs the `ingest-source-material` skill on it first** (step 3), on the branch.

## Out of scope

- Deploying.
- Re-generating the Hickory Grove podcast PDF/prompt. It was already built from the live
  values.
- The Financial Aid card's withdrawal/delinquency claim (L2372), the student-services fee
  note (L2253), tuition figures, and the "automatic discounts discontinued as of 2026-2027"
  wording. The last one is not contradicted by the live page.
- A fee stat tile.
- The episode's `podcastEpisodes.ts` row. Episode 38 (Covenant Day) is a separate plan,
  `newcovenantdayepisode`. Hickory Grove's episode is not published yet.
- The glossary gaps the generator reported (SLEP, ESA). Those need sourced entries and are a
  separate change.

## Steps

Two phases: this changes user-facing research prose reached by the overlay layer.

### Phase 1 — English

1. **Branch.** `git checkout main && git pull`, then `git checkout -b fix/hickorygroverefresh`.

2. **Mark the superseded quotes** with a one-line italic note (no deletions) pointing to
   `Hickory Grove Christian - Admissions - Live-Site Refresh 2026-10-04.md`:
   - In `source-material/admissions/hickory-grove-christian/Hickory Grove Christian - Admissions - Grade-by-Grade Application Plans.md`:
     under `### ⚠️ Two genuine, LIVE inconsistencies on the school's own site` (the fee
     quote, L39–40); under `## Campus is an admissions dimension` (the "launching" line,
     L212); under `## Financial aid — and its order-of-operations precondition` (L229);
     under `## International Program (F-1) — a genuinely separate process` (the fee timing);
     and under `## Admissions office contact — as published` (the 3:00 hours, L346).
   - In `source-material/financial-aid-tuition/hickory-grove-christian/Hickory Grove Christian - Financial Aid - Deep Dive Report.md`:
     directly under the NCSEAA paragraph (L69–71) and under `**4. 5% early-payment discount.**`
     (L82). Add **no** new `##` heading to this file, because every `##` becomes a subtopic on
     ingest.

   Without these notes the ingest would carry both versions into `.claude/docs/` with nothing
   saying which is current.

3. **Ingest.** Run the `ingest-source-material` skill. Expect
   `.claude/docs/admissions/hickory-grove-christian.md`,
   `.claude/docs/financial-aid-tuition/hickory-grove-christian.md` (if it exists),
   `src/content/admissions/hickory-grove-christian.json`,
   `src/content/financial-aid-tuition/hickory-grove-christian.json`, and possibly
   `src/data/schools.json` to change. **Commit the ingest on its own**, staging explicit paths
   only (`git status --short` first, never `git add -A`).

4. **The fee: four step details** (`hickory-grove-christian.ts`). Every one ends with the
   same fee passage, FEE:

   > On the fee: the school publishes a **non-refundable $250 application fee** for applications from **November 2, 2026 through May 31, 2027**, rising to a **$500 late enrollment application fee from June 1, 2027**. The application fee is **not applied toward tuition**.

   - A2, `bands[0].steps[2].detail` (L234):
     > Apply through the FACTS portal for your campus — **Harris and Mallard Creek use different portals**. The school expects **limited availability at Mallard Creek**, so confirm its dates and steps with the admissions office if you are applying there. Send your child's **birth certificate** and **Immunization Registry Record** with the application. FEE
   - A3, `bands[1].steps[1].detail` (L346):
     > Apply through the **FACTS portal**, and send your child's **birth certificate** and **Immunization Registry Record** with the application. FEE
   - A4, `bands[2].steps[1].detail` (L463) **and** `bands[3].steps[1].detail` (L595), identical:
     > Apply through the **FACTS portal**, and send your child's **birth certificate** and **Immunization Registry record** with the application. FEE

   (Substitute FEE literally. The `Record`/`record` capitalisation difference is existing and
   deliberate: keep it, so the stamp sharing stays as it is today.)

5. **The fee: checklist rows and the comparison constant** (plain text):
   - A5, `bands[0].checklistRows[2].detail` (L283):
     > Harris and Mallard Creek use different portals. Non-refundable and not applied toward tuition: $250 through May 31, 2027, then $500.
   - A6, `bands[1..3].checklistRows[1].detail` (L390, L507, L646), identical:
     > Non-refundable and not applied toward tuition: $250 through May 31, 2027, then $500.
   - A18, `comparison.rows[8].cells.all` (L937). Copy the current value, keep its curly
     `family’s`, and replace only the fee clause
     `the FACTS online application, with the published $250/$500 fee window predating the current application dates`
     with:
     > the FACTS online application, with a non-refundable $250 application fee through May 31, 2027 ($500 from June 1, 2027), not applied toward tuition
   - A23, `checklist.disclaimer` (L996):
     > Dates are the 2027–28 entry cycle as published on hgchristian.org, re-checked against the live site on October 4, 2026, together with both new-family admission checklists revised 11/17/25. The application fee is $250 from November 2, 2026 through May 31, 2027, and $500 from June 1, 2027. Cycle dates shift year to year — verify against the live site before acting. Compiled by Charlotte School Compare; not affiliated with Hickory Grove Christian School.

6. **Aid** (`aid.text` supports `**`; the panel items are plain):
   - A13, `aid.text` (L846):
     > Aid runs through **FACTS Grant & Aid Assessment**, and **FACTS charges $40** to process the application; request the aid information from the **finance office** at finance@hgchristian.org. The order of operations: apply for, accept or renew the **NC Opportunity Scholarship** through the state education assistance authority — **anyone can apply**, with no income cap on applying, and applications open **February 1** — and if you are still waiting on it, or it will not meet your need, apply to Hickory Grove for aid, awarded "until all available funds have been allocated". **ESA+** is available for children with disabilities attending an eligible non-public school. Hickory Grove offers **no automatic discounts** such as multi-child or pastor discounts, but families earn a **5% discount for paying the whole school year's tuition by May 31**.
   - A14, `checklist.aidPanel.items[0]`:
     > Aid runs through FACTS Grant & Aid Assessment, and FACTS charges $40 to process the application. Request it from the finance office — finance@hgchristian.org.
   - A15, `items[1]`:
     > Apply for, accept or renew the NC Opportunity Scholarship first — anyone can apply, and applications open February 1.
   - A16, `items[2]`:
     > If you are still waiting on the state scholarship, or it will not meet your need, apply to Hickory Grove for aid — awarded until all available funds have been allocated.
   - `items[3]` (ESA+): **unchanged**.
   - A17, `items[4]`:
     > No automatic discounts (multi-child, pastor), but a 5% discount for paying the full year's tuition by May 31.

7. **International** (A7–A9 support `**`; A10–A12 are plain):
   - A7, `bands[4].steps[1].detail` (L739):
     > The same online admission application as domestic applicants, submitted to the **International Admissions Office**. The application fee is **non-refundable**, but its **amount is not published**, and the school's page states its timing two ways — **due at the time of application** in one line, and paid **after acceptance** in its step-by-step list — so **confirm both the amount and when it is due with the international office**.
   - A8, `bands[4].steps[4].detail` (L760):
     > An accepted student is **notified by email**, and a school official then **mails the I-20**. The school's step-by-step list places the **non-refundable application fee** at this point, although another line on the same page says it is due with the application — settle that with the international office. With the I-20 in hand, the student **arranges an interview with the U.S. Embassy in their own country to obtain the F-1 visa** — that appointment is the family's to book, and embassy waiting times are outside the school's control, so start it as soon as the I-20 arrives.
   - A9, `bands[4].steps[7].detail` (L781):
     > The program covers an **orientation before school starts**, **PSAT and ACT testing**, **weekly meetings with the International Student Director**, regular reports back to families and agencies, **airport transportation** at the start and end of the year, **I-20 maintenance**, daily lunch, athletic and technology fees, local college visits, class field trips and required class reading books. One thing to plan for: **re-enrollment is not automatic** — it is applied for each year rather than carried forward.
   - A10, `bands[4].checklistRows[1].detail` (L797):
     > Submitted to the International Admissions Office. The fee is non-refundable; its amount is not published, and the page gives its timing as both at application and after acceptance — confirm.
   - A11, `bands[4].checklistRows[4].action` (L811): `Watch for the acceptance email`
   - A12, `bands[4].checklistRows[4].detail` (L812):
     > The step list places the non-refundable application fee here; another line says it is due with the application — confirm which.

   Leave the step title `Acceptance, the application fee, then the I-20` as it is. It matches
   the school's step list.

8. **Hours and Mallard Creek** (plain except A1):
   - A1, `bands[0].steps[0].detail` (L220): change only
     `while **Mallard Creek** is launching a **classical Christian TK and Kindergarten** that grows one grade a year`
     to
     `while **Mallard Creek** plans to open a **classical Christian TK and Kindergarten** that would grow one grade a year`.
   - A19, `contacts.address` (L947):
     > 7200 E. WT Harris Blvd., Charlotte, NC 28215 · main office 704-531-4008 · admissions@hgchristian.org · Mon–Fri 7:30 a.m.–3:30 p.m. Mail is addressed separately, to 6050 Hickory Grove Road, Charlotte, NC 28215 — the church and school complex. Only one admissions staff member is named on the school’s site; the office lines below are published for the areas she does not cover.
   - A20, `contacts.people[1].detail` (L956): `704-531-4008 · Mon–Fri 7:30 a.m.–3:30 p.m. · admissions@hgchristian.org`
   - A21, `contacts.people[3].detail` (L964): `Half-day preschool and the classical TK/K campus · 704-531-5345 · mallardcreekeec@hgchristian.org`
   - A22, `checklist.contactPanel.lines[0]` (L989): `Admissions — 704-531-4008 · admissions@hgchristian.org · Mon–Fri 7:30 a.m.–3:30 p.m.`

9. **Sources labels and header comments** (not translated):
   - `sources[0].label` (L1002): replace `the published $250/$500 application-fee window` with
     `the $250 application fee through May 31, 2027 and the $500 late fee from June 1, 2027`.
   - `sources[4].label` (L1022) →
     `hgchristian.org — scholarships: FACTS Grant & Aid, the $40 FACTS charge, the apply-immediately instruction, the NC Opportunity Scholarship order of operations and February 1 opening, ESA+, and the 5% pay-by-May-31 discount`
   - Header L26–38: rewrite the "LIVE INCONSISTENCY" block. Say the school rolled the window
     forward on or before 2026-10-04 ($250 Nov 2, 2026 – May 31, 2027; $500 from June 1,
     2027), so the hedge was removed. Keep the "not a stat tile" sentence, re-reasoned as
     "adding one is a UX change needing approval".
   - Header L110–115 and L134–145: drop the "2027–28 NCSEAA window not yet published" claims
     (the page now says February 1, no year). Record that the acceptance-before-aid
     precondition was **dropped by the school** (2026-10-04), so a later pass does not restore
     it from the 2026-09-01 file. Add the Mallard Creek February 18 decision (not carried,
     undated).
   - Header L163–170: note the hours are the MAIN OFFICE 7:30–3:30 figure.

10. **Financial Aid card** (`src/data/financialAidReports.ts`; `**` renders in these fields
    today, so keep the same emphasis style):
    - F1, `timeline[0].when` (L2264): `'Feb–Mar'` → `'From Feb 1'`
    - F2, `timeline[0].detail` (L2266):
      > The **NCSEAA Opportunity Scholarship** application opens **February 1**; anyone can apply — there is no income cap on applying — and the award scales with household income
    - F3, `timeline[1].detail` (L2271):
      > A **5% discount** applies when the whole school year's tuition is paid by **May 31**
    - F4, `sections[3].plans[0].detail` (L2328):
      > Off tuition if the whole school year is paid by **May 31**.

11. **Grep for leftovers**, excluding the header comments:
    - in `hickory-grove-christian.ts`: `predates`, `window that has passed`,
      `May 31, 2026`, `June 1, 2026`, `accepted for enrollment`, `March 2, 2026`,
      `April 15, 2026`, `3:00 p.m`, `is launching`, `Paid after the decision` → **0 hits each**.
    - in the `HICKORY_GROVE_CHRISTIAN` block of `financialAidReports.ts`: `May 31, 2026`,
      `March 2, 2026`, `Feb 6` → **0 hits**.

12. **Phase 1 verification**: run the checks below, then commit (explicit paths), push, and
    verify the push (`git rev-parse HEAD` vs `git ls-remote origin fix/hickorygroverefresh`).
    Hold the PR until Phase 2, as `covenantadmissions` did.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Set this plan to
`english-done` and the INDEX row to *English shipped*. Nothing below runs until the user
confirms the English. Review the international fee passage and the aid paragraph closely.

### Phase 2 — The nine prose locales

Scope is the **overlay layer** (`PROSE_TRANSLATED`: `es, bn, ht, te, fr, fa, it, hi, ar`),
in **two topics**: `admissions` and `financial-aid-report`. **Not** `src/locales/*.json`,
because no chrome key changes. Mechanism: `.claude/docs/prose-translation-architecture.md`.

13. **Measure scope from the live modules, not from a checker.** Extract both topics into a
    scratch dir with a throwaway lang:
    `node scripts/i18n_extract.mjs --topic admissions --lang __verify --out <tmp>` and the same
    for `--topic financial-aid-report`. Diff the stamps against the `es` work files.
    **Expect exactly 23 retired + 23 new in `admissions` and 4 + 4 in
    `financial-aid-report`**, with each new stamp's `at` list equal to its retired one's.
    A4 and A6 stay shared, the same as today. If either count is off, stop and find out why
    before translating.

14. **Splice by stamp in all 18 work files** (9 locales × 2 topics). For each retired stamp,
    replace `text`, `of` and `at` from the fresh extract, and `t` with a fresh translation.
    **Map by `at` path or English meaning, never by array index.** No array rows are added or
    removed, so paths are stable.

15. **Translate: 27 strings per locale, 243 in total.** Traps from the rollout docs:
    - **Figures copied char-for-char, never re-typed:** `$250`, `$500`, `$40`, `5%`,
      `704-531-4008`, `704-531-5345`, `7:30 a.m.–3:30 p.m.`, `November 2, 2026`,
      `May 31, 2027`, `June 1, 2027`, `February 1`, `May 31`, `11/17/25`, and the emails.
      `check:sepdrift` covers separator-bearing tokens only, so check the dates and times by
      eye. Clock times follow each locale's existing convention (see `covenantadmissions`
      Implementation notes: `es/fr/it/ht` keep `a.m.`; the others use their word for morning
      beside the same digits). Reuse each locale's rendering from the retired A19/A20/A22
      entries.
    - **`hi`/`te`**: store the English 3-3-3 figure. **`fa`/`ar`**: store no bidi isolates.
    - **Keep identifiers as published:** `FACTS`, `FACTS Grant & Aid`, `NCSEAA`, `ESA+`,
      `I-20`, `F-1`, `PSAT`, `ACT`, `Harris`, `Mallard Creek`, `Early Education Center`.
      Reuse each locale's existing wording for these from the retired entries.
    - **Do not resolve the international fee ambiguity in translation.** Both timings, plus
      "confirm", must survive in every locale. The A7/A8/A10/A12 entries are the ones a
      translator is most likely to "tidy".
    - **No year on "February 1" or "May 31"** in any locale.

16. **Rebuild the 18 overlays:** `npm run i18n:build -- --topic admissions --lang <code>` and
    `npm run i18n:build -- --topic financial-aid-report --lang <code>` for each of the nine.

17. **Phase 2 verification**: run the checks below, commit (explicit paths), push, verify the
    push, open the PR with `--body-file`, merge (`gh pr merge --squash --delete-branch`,
    pre-authorized), then `git checkout main && git pull`. Flip the plan to `implemented` and
    the INDEX row to *Implemented* with the PR link. **Do not deploy.** End with "merged —
    ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/admissions/hickory-grove-christian/Hickory Grove Christian - Admissions - Live-Site Refresh 2026-10-04.md` | new: written during planning, ingested in step 3 |
| `source-material/admissions/hickory-grove-christian/Hickory Grove Christian - Admissions - Grade-by-Grade Application Plans.md` | five "superseded by" notes |
| `source-material/financial-aid-tuition/hickory-grove-christian/Hickory Grove Christian - Financial Aid - Deep Dive Report.md` | two "superseded by" notes |
| `.claude/docs/…`, `src/content/{admissions,financial-aid-tuition}/hickory-grove-christian.json`, maybe `src/data/schools.json` | regenerated by the ingest |
| `src/data/admissionsPrograms/hickory-grove-christian.ts` | 23 stamps' fields (27 paths), 2 source labels, header comments |
| `src/data/financialAidReports.ts` | 4 fields in `HICKORY_GROVE_CHRISTIAN` |
| `src/data/overlays/work/{admissions,financial-aid-report}.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | 23 / 4 entries spliced per file |
| `src/data/overlays/{admissions,financial-aid-report}.{…9 locales}.json` | regenerated by `i18n:build` |
| `.claude/plans/hickorygroverefresh.md`, `.claude/plans/INDEX.md` | status + PR link + Implementation notes |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean.
- [ ] `npm run build` exits **1 on `check:live` only**. That is the **expected Phase 1 state**:
      27 stamps per locale fall back to English until Phase 2. Confirm every other chained
      check passes, and that every `check:live` finding is a `hickory-grove-christian`
      admissions or financial-aid-report path.
- [ ] `npm run check:schema` and `npm run check:metrics`: pass. The new source-material
      file's `##` headings must not surface as a ⚠️ unmatched subtopic. If one does, map it in
      `src/lib/metrics.ts` `RULES` the same way the Covenant Day refresh file is handled, and
      run `npm run schema`.
- [ ] Step 11's greps: 0 hits.
- [ ] `npm run report:admissions -- --school hickory-grove-christian` with **no**
      `--overrides` produces a PDF whose text (`pdftotext`) contains `May 31, 2027`,
      `June 1, 2027`, `February 1`, `5% discount`, `3:30 p.m`, `mallardcreekeec` and
      `due at the time of application`, and none of `May 31, 2026`, `predates`,
      `accepted for enrollment`, `March 2, 2026`, `3:00 p.m`. This proves the app now matches
      the episode. The PDF is gitignored under `reports/`.
- [ ] **Browser check (required).** `npm run build && npm run preview`, then Playwright with real
      Chrome (`channel: 'chrome'`, `headless: false`, a dotfile script in the repo root,
      deleted after). Use `domcontentloaded`, **not** `networkidle`. **Force-open every
      `<details>`** before asserting.
      - `/school/hickory-grove-christian/`, Admissions, each of the five band tabs: the fee
        passage, the aid paragraph, the intl fee wording, the contacts hours, and no literal
        `**`.
      - Financial Aid & Tuition card: the "From Feb 1" timeline row and the 5% tile say
        "May 31" with no year.
      - `/school/hickory-grove-christian/admissions-checklist/?band=tkk5`, `?band=ms`,
        `?band=intl`: rows updated, aid panel updated, disclaimer updated, no literal `**`.

### Phase 2 — Locales

- [ ] `npm run build` exits **0**.
- [ ] `npm run check:sepdrift -- --lang <code>` for all nine: 0 drifted tokens.
- [ ] `npm run check:money`, `check:currency`, `check:bidi`, `check:fa`, `check:hi`, `check:fr`,
      `check:script`: clean.
- [ ] **Work-file integrity: do NOT use `check_work_integrity --base <Phase 1 commit>`.** Phase 1
      never touches the work files, so that base equals `main`, and the script reports every
      intentionally changed entry as a violation (`covenantadmissions` notes). Instead, diff
      each work file against `main` and assert that **exactly 23 (admissions) / 4
      (financial-aid-report) entries changed, all of them the intended stamps**.
      `check:script` covers the foreign-script assertion.
- [ ] **0 duplicate `at` paths** in each of the 18 rebuilt overlays:
      ```js
      const c = {}; for (const e of o.strings) for (const a of e.at) c[a] = (c[a] || 0) + 1
      // assert Object.values(c).every(n => n === 1)
      ```
- [ ] `npm run i18n:leaks -- --lang <code>` for all nine, diffed against a baseline taken on
      `main`: no new flagged strings.
- [ ] **Browser check, all nine locales** (`?lang=<code>`), on `/school/hickory-grove-christian/`
      (Admissions, intl band and Financial Aid card) and `?band=intl` on the checklist. The 27
      strings render translated, and the figures survive. Match money by **digits**, not the `$`
      symbol (`localizeMoneyText()` renders `250 US$` etc.). Allow a ~2.5s settle wait on the
      first cold load (`covenantadmissions` notes). At minimum, eyeball `es`, `hi` and `fa`.

## Risks

| Risk | Mitigation |
|---|---|
| A translator resolves the international fee contradiction into one timing | Step 15 names A7/A8/A10/A12 explicitly; the browser check reads `intl` in every locale |
| A year gets added to "February 1" / "May 31" | Decisions + step 15; the research file records that no year is published |
| A later pass restores "accepted before aid" or the Feb 2 – Mar 2, 2026 window from the 2026-09-01 file | Step 2's superseded notes + step 9's header comment |
| The refresh file's `##` headings become a new subtopic or card | Phase 1 `check:metrics` / `check:schema` gate |
| Phase 2 scope under-counted | Step 13 asserts 23 + 4 from a fresh extract |
| Re-running the extractor blanks real work files | Scratch extract with `__verify` only |

## Open questions

- **Should `aid.text` carry the 5% discount, or leave it to the Financial Aid card?** —
  **default:** carry it (step 6), since it is on the same scholarships page a parent reads for
  aid timing. The user's Phase 1 review can drop the last sentence.
- **Should the Mallard Creek EEC email also appear in `checklist.contactPanel.lines[3]`?** —
  **default:** no. That line lists phones only for both EECs today. Keep its shape.

## Implementation notes

- **Phase 1 committed and stopped; the PR was opened in Phase 2**, as `covenantadmissions` did.
- **Step 13 measured exactly 23 retired / 23 new (`admissions`) and 4 / 4
  (`financial-aid-report`) in all nine locales**, each new stamp's `at` list equal to its
  retired one's. The splice matched by `at` path plus old English, never by index. Before it
  wrote, a validator checked every translation for its figures, `**` count, year count, bidi
  controls, native digits and English-form dates. All 18 work files round-trip byte-identically
  through `JSON.stringify(…, null, 2)`, so only the 27 entries per locale changed.
- **Deviation — dates are written in each locale's own form, not copied from the retired
  entries.** Hickory Grove's earlier admissions translations left 7 of 11 dates in English
  form (`hasta el May 31, 2026`) in `es`/`fr`/`it`/`ht`, against **0** for every other school
  in the topic. The translators first copied that quirk. It was corrected to the
  topic-wide convention (`31 de mayo de 2027`, `1er février`, `31 মে 2027`, `1 फ़रवरी`, …),
  with Western digits and still no year on February 1 / May 31.
- **Clock times reuse the retired A19/A20/A22 rendering in every locale.** For Hickory Grove
  that rendering is Latin `7:30 a.m.–3:30 p.m.` in all nine, so step 15's
  "word for morning" split (a Charlotte Latin precedent) did not apply. Only 3:00 → 3:30
  changed.
- **Verification.** `npx tsc -b` was clean, and `npm run build` exited 0, `check:live`
  included. `check:sepdrift` showed 0 drifted tokens in all nine locales. `check:money`,
  `check:currency`, `check:bidi`, `check:fa`, `check:hi`, `check:fr`, `check:script` and
  `check:runtime` were all clean. The work-file diff against `main` showed exactly 23 / 4
  changed entries per locale, all intended stamps, with 0 duplicate `at` paths in the 18
  overlays. `i18n:leaks` added no new flags in any locale and removed 1 each in `es`/`te`/`hi`:
  the old `Feb–Mar` label those three had kept in English.
- **Browser check (real Chrome, all nine locales):** I clicked each of the 5 band tabs on
  the school page with every `<details>` forced open, then loaded the checklist at
  `?band=tkk5|es|ms|intl`. All 27 strings render translated in every locale, with the
  figures present and no literal `**`. The first matcher missed strings because rendering
  is localized: `250 US$` (es/fr), `250 USD` (it), and LRI/PDI-isolated figures (fa/ar).
  Normalizing those confirmed every string.
- **Found, NOT fixed (out of scope): `localizeMoneyText()` drops a comma that directly
  follows a figure.** The regex at `src/lib/format.ts:268`, `\$(\d[\d,]*…)`, captures the
  trailing comma in `$250, non rimborsabile`, and reformatting then loses it, so it renders
  `250 USD non rimborsabile`. It is pre-existing and app-wide: 327 such commas across seven
  locales' work files (bn 69, te 59, it 46, fr 41, es 40, hi 39, ht 33). The fix is a regex
  change touching every page, so it belongs in its own plan.
