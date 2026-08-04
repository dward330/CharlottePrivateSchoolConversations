---
name: acceptance-years
title: Harmonize the "Where Graduates Go" acceptance window to 2023 onward for all six schools
status: english-done
phases: 2
created: 2026-08-04
branch: feat/acceptance-years
prs: []
---

# Harmonize the "Where Graduates Go" acceptance window

## Goal

The `Where Graduates Go` card (`college-support.outcomes`) currently shows a different
acceptance window for every school — five distinct ranges across six schools — so a parent
comparing Cannon's `2022–2024` against Providence Day's `2023–2026` is comparing different
spans of time without being told. This plan does deep research on each school's published
outcomes, extends every school as far toward **2023–2026** as its sources genuinely support,
**drops all pre-2023 data**, and re-derives every dependent figure so each card is
internally consistent. Providence Day and Charlotte Country Day are already `2023–2026` and
are verified rather than rebuilt; the research targets the other four.

We'll know it worked when every school's `collegesTitle` starts at 2023, no college on any
list is there solely on the strength of a pre-2023 acceptance, and each card's bucket counts
match the list it sits beside.

## Context

### Where the data lives

Each school has one file under [`src/data/collegeSupportPrograms/`](../../src/data/collegeSupportPrograms/):
`cannon.ts`, `charlotte-christian.ts`, `charlotte-country-day.ts`, `charlotte-latin.ts`,
`davidson-day.ts`, `providence-day.ts`. The card reads the `outcomes` key, typed as
`Outcomes` in [`src/data/collegeSupport.ts:211-237`](../../src/data/collegeSupport.ts#L211-L237).

The renderer is `CollegeList` in
[`src/components/CollegeSupport.tsx:394`](../../src/components/CollegeSupport.tsx#L394). It
derives its filter chips from `data.colleges[].cats` at runtime, so removing a college
automatically removes any chip it was the last member of — **no component change is needed
for this plan**, and none should be made.

### The current state — this is the problem being fixed

| School | `collegesTitle` | What the source actually is |
|---|---|---|
| Providence Day | `Every acceptance, 2023–2026` | Live web page, 382 institutions |
| Charlotte Country Day | `Every acceptance, 2023–2026` | Live web page |
| Charlotte Latin | `Every acceptance, 2023–2025` | 3-yr aggregate in the Upper School Profile PDF, 300 institutions |
| Charlotte Christian | `Every acceptance, 2023–2025` | 3-yr aggregate, 186 institutions |
| Cannon | `Every acceptance, 2022–2024` | 3-yr aggregate; the 2025–26 profile **dropped the list entirely** |
| Davidson Day | `Every acceptance, 2021–2025` | 5-yr cumulative, 255 institutions |

### Two schools are already in-window — exempt from research, but still verified

**Providence Day and Charlotte Country Day both already read `2023–2026`**, built from the
schools' live acceptance pages (382 and 320 institutions respectively). Verified at planning
time by reading both `outcomes` blocks. They are the reference cases, not targets:

- **Do not re-fetch their acceptance data.** It is current and complete. No new research.
- **Do not re-derive their `buckets`, `stats` or `collegesTotal` wholesale.** Those figures
  are correct for the window being standardized on; churning them risks damaging good data.
- **But do verify their lists** — see step 5b. The window in the *title* was confirmed; that
  no individual college sits on the list solely on a pre-2023 acceptance was **not**. This
  matters most for Providence Day, whose own `caveat` records that the profile PDF covers
  `2022–2025`, i.e. a pre-2023 source was in play at original ingest. If a college is found
  that qualifies only via a pre-2023 year, remove it and re-derive that school's affected
  bucket counts and totals — otherwise leave both files' data alone.
- **Two prose touches**, both because they *mention* a pre-2023 year rather than contain one:
  - `providence-day.ts` — the `caveat` reads *"the live page covers 2023–2026 while the
    profile PDF covers 2022–2025"*. Keep the source citation (it is what was read), but check
    the clause still reads correctly once every other school is 2023-floored.
  - `charlotte-country-day.ts` — the Ivy `buckets[].note` reads *"absent Harvard, across
    seven published classes"*, a span far wider than the card's window. Narrow it to the
    2023–2026 list or drop the clause.

Both prose edits invalidate their overlay stamps, so these files carry into Phase 2 like any
other prose change — which means a corrected list entry rides along at no extra locale cost.

**The bulk of the work is the other four schools:** Charlotte Latin, Charlotte Christian,
Cannon and Davidson Day.

### The constraint that shapes this whole plan

**These ranges are the schools' choices, not ours.** Latin, Christian, Cannon and Davidson
Day publish only a *pre-aggregated multi-year block* — they never say which graduating class
an individual acceptance came from. That has two consequences the implementer must not try to
engineer around:

1. **Extending to 2026 requires the school to have published it.** No amount of research
   produces per-year data a school does not release.
2. **Removing pre-2023 years requires per-year lists to subtract.** For Davidson Day
   (2021–2025) and Cannon (2022–2024), the pre-2023 years are baked into a single
   undifferentiated list. You cannot compute `2023–2025` from a `2021–2025` block.

Where per-year data cannot be found, the fallback is the *narrowest defensible published
window that starts at or after 2023* — see Decisions. **Never infer, interpolate or estimate
which year an acceptance belongs to.** An unsourced list is worse than a mismatched range.

### Everything downstream of the list

The `colleges` array is not standalone. Changing it invalidates, in the same file:

- `buckets[]` — the six selectivity rows (Ivy, "Ivy Plus", Top-75 National, Top-75 Liberal,
  Power Four, HBCUs), each scored against the 2026 U.S. News tables.
- `bucketsNote` — prose that names the list size ("computed from the same 382-institution
  list") and names specific absences.
- `collegesTotal` — e.g. `'300 institutions · bold = at least one student matriculated'`.
- `stats[]` — several are list-derived (`'5 of 8'` Ivy, `'62 of 68'` Power Four, `'300'`).
- `headline` / `subhead` — both quote the range and the counts.
- `caveat` — states what the aggregate is and over which classes.
- `flags[]` / `sources[]` — sources must cite what was actually read.

The shared denominators live in [`source-material/college-support/_shared/`](../../source-material/college-support/_shared/):
`Power Four - Conference Membership 2026.md` (**denominator is 68**, all members including
Notre Dame — a web search will say 67, which is football-only; do not "correct" it),
`HBCU - Membership and Count 2026.md` (107), `HBCU - US News National Ranks 2026.md`.

### Compare-table coupling

The six bucket counts also feed the College Support Compare table (plan
[`selectivity-rows`](selectivity-rows.md), PR #93) via
[`src/data/metricValues.ts`](../../src/data/metricValues.ts). **Any bucket count that changes
here must be changed there in the same commit**, or the card and the Compare row will
disagree. Grep `metricValues.ts` for the school slug plus the bucket metric keys before
declaring a school done.

### Why two phases

`collegesTitle`, `headline`, `subhead`, `bucketsNote`, `caveat`, `collegesTotal`, the
`stats[].label` strings and `scholarshipsNote` are all **research prose**, reached by the
overlay layer — not `src/locales/*.json`. Nine non-English overlay files carry this topic
(`src/data/overlays/college-support.{es,bn,ht,te,fr,fa,it,hi,ar}.json`, per `PROSE_TRANSLATED`
in [`src/lib/i18n.ts:182`](../../src/lib/i18n.ts#L182)). Each overlay entry resolves only
while its FNV-1a stamp matches the hash of the live English at that field path; edit the
English and the entry **silently falls back to English** with no error and no coverage change.
So every string touched in Phase 1 must be re-extracted and re-translated in Phase 2.

## Decisions

- **Floor the window at 2023 for every school; ceiling is whatever each school publishes** —
  the user's instruction. A uniform 2023 start is achievable; a uniform 2026 end is not,
  because three schools do not publish 2026 acceptances.
- **Where a multi-year block cannot be split, narrow to the published sub-window that starts
  at ≥2023 — never estimate.** For Davidson Day, prefer per-class lists if research finds
  them; if not, use the most recent single published class year (e.g. Class of 2025) rather
  than keeping 2021–2022 data. For Cannon, the same: drop to whatever starts at 2023.
- **Every school that changes gets a full re-derivation** (user's choice) — buckets, note,
  total, stats, headline, subhead, caveat, sources all recomputed from the new list. No
  school is left with counts describing a list it no longer has.
- **Providence Day and Country Day are exempt from research and re-derivation, but not from
  verification** — both are already `2023–2026` from live school pages, so re-fetching would
  churn correct data. Their lists are still checked for pre-2023 stragglers (step 5b), because
  the title's window was confirmed at planning time and the per-college provenance was not.
- **Bucket counts are scored against the 2026 U.S. News tables**, matching the existing
  `bucketsNote` wording in every file. Do not switch ranking years mid-plan.
- **The `enrolling` / matriculation markers are re-derived too.** Each school defines bold
  differently (Latin = "at least one matriculated", Providence Day = "more than one",
  Christian = "Class of 2025 only", Cannon = Class of 2023 list). If the underlying class
  window changes, the marker's meaning changes with it and `collegesTotal` must say so.
- **No component or type changes.** `CollegeList` and the `Outcomes`/`College`/`Bucket` types
  already support everything here. This is a data + prose change.
- **A school whose window genuinely cannot move gets a stated reason in its `caveat`**, not a
  silent mismatch. Disclosure is the fallback, not the goal.

## Approvals needed

**None.** This plan adds no card, section, sub-section, stat tile, Compare row, metric key or
topic, and changes no component, layout or styling — the UX-design gate does not apply. It
changes the *values* behind existing cards and existing Compare rows only.

Note for the implementer: if research surfaces material that seems to warrant a *new* stat
tile or bucket row, **stop and ask the user** rather than adding it. That is the gate.

## Source material

New data fetched during implementation is persisted like any other research, per the
data-provenance standard, **before** it is used in `src/`:

- Path: `source-material/college-support/<school>/<School> - College Support - Acceptances 2023-2026.md`
- Must include: a provenance header (who/when/how), the **source URLs**, and the full
  institution-level list behind every number that lands in the app.
- These `.md` files are committed (`.gitignore` exempts `source-material/**/*.md`).
- Run the `ingest-source-material` skill after writing them, on the branch.

**Nothing was fetched during planning** — the research is the bulk of Phase 1 and belongs in
the implementing window where it can be verified against the code it feeds.

**Only four schools need research: Charlotte Latin, Charlotte Christian, Cannon and Davidson
Day.** Providence Day and Charlotte Country Day are already `2023–2026` and are explicitly
excluded — no new `source-material` files for them.

Existing per-school PDFs already in `source-material/college-support/<school>/` (`… - Outcomes.pdf`,
`… - Redesign Research 2026.md`) are the current basis and should be read first — they may
already answer the per-year question for a school without any new fetch.

## Out of scope

- Any component, layout, styling or type change.
- New cards, sections, stat tiles, buckets, Compare rows or metric keys.
- Topics other than `college-support`, and cards other than `outcomes` (1c). Do not touch
  1a/1b/1d/1e even if the research turns up something for them — note it in the PR body.
- Re-scoring against a ranking year other than U.S. News 2026.
- Deploying. Merging to `main` is fine; `npm run deploy` requires the user to say so.

## Steps

### Phase 1 — English

Work school by school. A school is "done" only when its list, buckets, stats, prose and
`metricValues.ts` rows all describe the same window.

1. **Branch** — `git checkout -b feat/acceptance-years` off an up-to-date `main`.

2. **Read what's already in hand** — for the **four target schools** (Latin, Christian,
   Cannon, Davidson Day), read `source-material/college-support/<school>/*Outcomes.pdf` and
   `*Redesign Research 2026.md`. Record, per school: the exact published window, whether any
   per-class breakdown exists, and what the bold/asterisk marker means. This alone may
   resolve Christian and Latin without new fetches.

3. **Deep-research the four target schools' current acceptance data** — look for: the
   2025–26 and 2026–27 school profile PDFs, the live College Counseling / Acceptances page,
   senior-signing and matriculation posts, and any Class of 2026 announcement. The goal per
   school is (a) can the window be extended to 2026, and (b) can pre-2023 years be split off.
   Persist every source per the **Source material** section above as you go — do not hold
   fetched data only in context.
   **Providence Day and Charlotte Country Day are excluded from this step** — their data is
   already 2023–2026 and current. Do not re-fetch them.

4. **Run the ingest pipeline** — invoke the `ingest-source-material` skill so the new
   `.md` files flow into `.claude/docs/` notes and `src/data/schools.json`. Ingestion enriches
   data only; it must not change the UX.

5. **Per target school, rebuild the `colleges` array** in
   `src/data/collegeSupportPrograms/<school>.ts` — drop every institution whose only
   acceptance falls before 2023, add any newly published ones, and re-set each entry's
   `cats` and `enrolling`. Keep `cats` keys to the existing six: `ivy`, `ivyplus`, `nu75`,
   `lac75`, `p4`, `hbcu`.

5b. **Verify — don't rebuild — Providence Day and Country Day.** Against the sources already
   cited in each file, confirm no college on either list qualifies solely through a pre-2023
   acceptance (highest risk: Providence Day, whose profile PDF covers `2022–2025`). If the
   lists are clean, change no data. If a college is found that qualifies only pre-2023,
   remove it and re-derive **that school's** affected buckets, `collegesTotal` and
   list-derived `stats` — steps 6–10 then apply to it too. Then make the two prose touches
   described in Context: Providence Day's `caveat` clause and Country Day's
   `'across seven published classes'` Ivy note.

6. **Per school, re-derive the six `buckets` rows** against the 2026 U.S. News tables and the
   shared denominators in `source-material/college-support/_shared/` — Power Four **/68**,
   HBCUs **/107**, Ivy **/8**, Ivy Plus **/17**, Top-75 **/75**. Update each row's `note`
   (the named absences change when the list changes).

7. **Per school, update every list-derived string** — `collegesTitle` (the new range),
   `collegesTotal`, `bucketsNote` (it quotes the institution count), the list-derived
   `stats[]` values and labels, `headline`, `subhead`, and `caveat` (it states the class span
   and what the marker means). Where a school's window still cannot reach 2026, say *why* in
   the `caveat`, in one clause.

8. **Per school, update `sources[]`** so every cited document is one actually read in step 2
   or 3, with a working URL. Re-check `flags[]` — a discrepancy flag about a window that no
   longer exists must be removed, not left stale.

9. **Sync `src/data/metricValues.ts`** — update every College Support selectivity-bucket
   value for every school whose counts changed in step 6, so the Compare table matches the
   card. This is the step most likely to be forgotten.

10. **Self-check for internal consistency** — for each school, confirm the number in
    `collegesTotal` equals `colleges.length`, and that each bucket count is reproducible by
    filtering `colleges` on that `cats` key. A mismatch here is the defect this plan exists
    to remove.

11. **Commit** the English work to the branch with the source-material files.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording and the year windows are what they want. Present
a summary table of the final window per school and any school that could not reach 2026.

### Phase 2 — Every other locale

Only after that confirmation. Scope is the **overlay layer** (research prose), not
`src/locales/*.json` — no UI chrome string changes in this plan.

Mechanism: [`prose-translation-architecture.md`](../docs/prose-translation-architecture.md).
Do not re-derive it here. Per-locale traps live in the rollout docs
(`prose-translation-{bn,ht,te,fr,fa,hi}.md`); read a prior doc for the *method*, never for a
register rule to inherit unexamined.

1. **Re-extract the topic's content** — run `scripts/i18n_extract_content.mjs` for
   `college-support` so the changed English fields get fresh FNV-1a stamps.

2. **Translate the changed entries into all nine locales** —
   `src/data/overlays/college-support.{es,bn,ht,te,fr,fa,it,hi,ar}.json`, per
   `PROSE_TRANSLATED` in `src/lib/i18n.ts`. Only entries whose English changed need new
   translations; unchanged entries keep their stamps.

3. **Honour the figure rules.** Every numeric figure is copied **char-for-char** from its
   English source and never re-typed — this plan is almost entirely figures, so this is the
   highest-risk locale step in it:
   - `hi` and `te` regroup lakh/crore **at render time**, so the overlay must still store the
     English 3-3-3 figure. A work file containing `$36,83,971` has hardcoded a regrouping the
     render layer would then apply a second time.
   - Percent signs stay **unspaced** in every locale, French included (`80%`, not `80 %`).
   - `fa` and `ar` are RTL: bidi-neutral figures (`2023–2026`, `9.7%`, `$23M`) need LRI…PDI
     isolates; strong-L Latin identifiers do not.
   - Currency stays USD; amounts never change, only presentation
     (`src/lib/format.ts`).

4. **Rebuild the content overlay** — `scripts/i18n_build_content_overlay.mjs`.

5. **Commit** to the same branch; both phases land in **one PR**.

## Files touched

| File | Change |
|---|---|
| `src/data/collegeSupportPrograms/cannon.ts` | edit — re-window list, buckets, stats, prose |
| `src/data/collegeSupportPrograms/charlotte-christian.ts` | edit — same |
| `src/data/collegeSupportPrograms/charlotte-latin.ts` | edit — same |
| `src/data/collegeSupportPrograms/davidson-day.ts` | edit — same |
| `src/data/collegeSupportPrograms/providence-day.ts` | edit — **prose only** (`caveat` clause); data verified, not rebuilt |
| `src/data/collegeSupportPrograms/charlotte-country-day.ts` | edit — **prose only** (Ivy bucket note); data verified, not rebuilt |
| `src/data/metricValues.ts` | edit — sync Compare bucket counts |
| `source-material/college-support/<school>/*.md` | new — fetched acceptance data + sources |
| `.claude/docs/*`, `src/data/schools.json` | regenerated by `ingest-source-material` |
| `src/data/overlays/college-support.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — Phase 2 |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — clean
- [ ] `npm run build` — succeeds
- [ ] `npm run check:metrics` — Compare values resolve
- [ ] `npm run check:sources` — every source entry well-formed
- [ ] **Per school, by hand:** `collegesTotal`'s institution count equals `colleges.length`;
      every `buckets[].count` numerator is reproducible by filtering `colleges` on that
      `cats` key. This is the check no script covers and the whole point of the plan.
- [ ] **Providence Day / Country Day regression read** — their bucket counts and
      `collegesTotal` should be *unchanged* from `main` unless step 5b found a genuine
      pre-2023 straggler. `git diff` on those two files should show prose only. An unexplained
      numeric diff there means good data was churned.
- [ ] **Browser check** — open all six school pages at `/college-support`, expand the
      *Where Graduates Go* card, and confirm: every `collegesTitle` starts at 2023; the
      filter chips still render (a chip vanishes only if that bucket is genuinely empty);
      the bucket table and the list agree.
- [ ] Cross-school read: the six windows, side by side, are defensible and any school short
      of 2026 explains itself in its `caveat`.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves against live `src/data/**`
      (this is the check that catches silent English fallback)
- [ ] `python3 scripts/check_figures.py --topic college-support` for each locale — no dropped
      or altered figures
- [ ] `npm run check:sepdrift -- --lang <code>` per locale — separator swaps are re-typings
      the figure sweep cannot see, and this plan is figure-dense
- [ ] `npm run check:money` and `npm run check:currency` — money renders through
      `localizeMoneyText()` on every path
- [ ] `npm run check:bidi` and `npm run check:fa` — RTL isolates around the new figures
- [ ] `npm run check:hi` — lakh/crore grouping
- [ ] `npm run check:translations`, `npm run check:hashes`
- [ ] **Browser print-out on two schools** — Providence Day and Charlotte Latin, in a real
      browser, with **every `<details>` panel forced open** (the dev-only *Expand all*
      button). A collapsed print-out reads clean while showing none of the part that breaks.
      Confirm an unabbreviated 7-digit figure renders correctly — `$3.25M`-style tiles prove
      nothing about digit grouping.

## Risks

| Risk | Mitigation |
|---|---|
| A school's pre-2023 years cannot be split out of its aggregate list | Fall back to the narrowest published window starting ≥2023 and state the reason in `caveat`. Never estimate which year an acceptance belongs to. |
| Bucket counts updated on the card but not in `metricValues.ts` | Step 9 is explicit; `npm run check:metrics` plus a side-by-side read of card vs Compare row. |
| Newly fetched figures are unsourced or paywalled later | Persist every source to `source-material/**/*.md` **as it is fetched**, per the data-provenance standard — the planning-window lesson. |
| Phase 2 overlays silently fall back to English | `npm run check:runtime` recomputes every stamp from live `src/data/**`; coverage at 100% does not mean the page renders the language. |
| A figure gets re-typed rather than copied during translation | `check:sepdrift` per locale — the figure sweep normalises separators and cannot see this class. |
| Dropping pre-2023 data shrinks a list enough to empty a filter chip | Expected and correct — `CollegeList` derives chips from the live list. Confirm in the browser rather than forcing a chip to stay. |
| Scope creep into cards 1a/1b/1d/1e as research surfaces other findings | Out of scope; note findings in the PR body for a future plan. |
| Providence Day / Country Day get re-researched or re-derived out of habit, churning correct data | Steps 3 and 5b name them as excluded; the Phase 1 regression read requires their diffs be prose-only. |

## Open questions

- **Can Davidson Day's 2021–2025 cumulative list be split by class?** Owner: research, step
  3. **Default if not:** narrow to the most recent published class year rather than keeping
  2021–2022 data, and state in `caveat` that the school publishes no per-class breakdown.
- **Does Cannon publish anything newer than its 2022–2024 block?** Its 2025–26 profile dropped
  the acceptance list entirely. Owner: research, step 3. **Default if nothing newer:** drop
  the pre-2023 portion if separable; if not, Cannon's card states plainly that its newest
  published list predates the window and is a cycle stale.
- **Do Charlotte Latin and Charlotte Christian publish a Class of 2026 list?** Owner:
  research, step 3. **Default if not:** they stay at 2023–2025 with a one-clause `caveat`
  explaining that 2026 is not yet published.
- **Does any college on the Providence Day or Country Day list qualify only via a pre-2023
  acceptance?** Not checked at planning time — only the titles' windows were. Owner: step 5b.
  **Default:** if the sources don't let you tell per-college, leave the lists as-is (they are
  built from live `2023–2026` pages) and note in the PR body that per-college provenance was
  not separable.
- **The seven known English strings that ship untranslated in all non-English locales**
  (documented in `CLAUDE.md`) include `collegeSupportPrograms/charlotte-christian.ts`
  `year` values. **Default:** out of scope — do not widen `i18n_fields.mjs` in this plan, but
  do not make it worse by adding new prose to a skipped field path.
