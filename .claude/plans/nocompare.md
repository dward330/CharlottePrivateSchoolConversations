---
name: nocompare
title: Remove cross-school comparisons from every school page outside Sports (78 units across After School, Summer, Global Exposure, Course Offerings, College Support, Admissions, Financial Aid, The Arts and Student Clubs), so each page says what that school publishes or does; English in two reviewed batches, then all nine prose locales
status: not-implemented
phases: 2
batches: 2                     # Phase 1 is built in two batches, each with its own review stop
created: 2026-11-11
branch: feat/nocompare
prs: []
---

# Remove cross-school comparisons from school pages

## Goal

A school's page should be about that school. The user ruled on 2026-11-11, at the plainsports
Batch 1 review: *"school pages should be focused on the school and not trying to mention what
others dont do."* Today about 78 rendered prose units outside Sports compare the school with
other schools on this site ("the most transparent pricing in this set", "No other school on
this site prices tuition this way", "every peer here charges for morning care"). This plan
removes each comparison and keeps what the school itself publishes or does.

It worked when:

- The re-scan (Step 2) finds **no rendered unit** in scope that matches a REMOVE rule
  ("Rulings"), other than the KEEP cases listed there.
- Every census unit ("Census") reads as its Treatment says, or as an approved variant.
- Nothing else in those units changed: no figure, date, quote, URL, name of this school's own
  people or programs, `**` span count or non-prose leaf (guards, Step 4).
- All nine prose locales carry the revised translations, and every overlay check is green.

**Two-phase.** This is research prose that renders to parents, so Phase 1 is English only
and stops for review, and Phase 2 translates. Phase 1 has **two batches**, each with a review
stop.

## Rulings (the user's, 2026-11-11 — the test for every unit)

**REMOVE** a clause, sentence or framing that:

1. **names another school** in order to compare ("where Charlotte Country Day names
   OrthoCarolina", "only Providence Day and Davidson Day publish …");
2. **points at this site's set of schools**: "on this site", "in this app", "in this set",
   "in this comparison", "on this roster", "here" meaning the site's schools ("the only
   school here", "every peer here", "of any school here", "the other five schools here",
   "of the six schools", "among these schools", "at any of these schools");
3. **names a peer group** belonging to the school: "its peers", "its regional peers", "its
   larger peers", "its CISAA peers".

**KEEP:**

- **Implicit comparisons** that name no school and do not point at this site's set:
  "few schools disclose", "most schools do not", "many peers don't offer", "several peers
  charge a premium", "unusually transparent", "a role most peer offices do not staff".
- **Rankings of the school's own result, with their source**: "more than any other school in
  the division" (CCD swimming records), "the largest delegation of any school in the nation"
  (Christian, Harvard Model Congress), "the first independent school in the country to host
  a CDF Freedom School" (PD), "a global network membership no other school in the state
  holds" (PD).
- **Comparisons inside one school**: "two weeks ahead of every other grade", "every other
  contest is free", "more than at any younger grade", "unlike JK/K".
- **"peers" meaning fellow students**: "lunch with peers", "peer support groups", "elected
  by grade-level peers", "peer-reviewed journal".
- **Results that name an opponent or award winner**: "Both went to other schools: Tier-2
  Best Musical to Central Academy, and Direction to Charlotte Country Day" (PD Arts).
- **Conference or league membership** that names other schools.
- **Quoted school text**, byte-identical (Charlotte Prep's "one of the few schools that
  allow 5th Graders …" and "a full year ahead of learning at most other schools").
- **Comparison guidance for the reader** that makes no claim about other schools: "the
  figure to compare against other schools' published tuition", "the like-for-like figure
  against other schools" (Catholic, Gaston Financial Aid).

**How to remove — rewrite first, delete as the fallback** (user suggestion, 2026-11-11:
*"rewrite those problematic comparison statements in a way not to be a comparison to a named
school"*).

1. **Preferred: rewrite to a statement about this school** that keeps the parent's point
   without naming any school or pointing at this site's set, using a hedged general term the
   KEEP rule allows: "unusually", "few schools", "many schools", "rare", "a common standard".
   "No other school in this set publishes its schedule at all" → "Few schools publish their
   after-school schedule at all." "The most transparent pricing in this set" → "unusually
   transparent pricing".
2. **The rewrite must not claim more than the evidence.** The old claim covered the 13
   schools on this site; a general claim covers schools at large. Use a **hedged** word
   ("few", "many", "unusually"), never an absolute one ("no school", "the only", "the most").
   Where even the hedged form is a stretch (a price "unusually low" only because it is the
   lowest of thirteen), **delete the clause instead.**
3. **Delete** when the comparison carries no parent point beyond the ranking ("— the heaviest
   caseload in this comparison" after "for 85 seniors"), or per item 2.
4. A headline, label or caption *built around* the comparison ("The most X program here —
   …") becomes an absolute or hedged statement about the school ("An unusually flexible
   program …").

**Never fact-check and keep** a REMOVE comparison as it stands: true or false, the
named-school or this-site framing goes. Each unit's choice (rewrite or delete) is recorded
in the review file.

## Context

### The census (scanned 2026-11-11 on `main` at `19f63d0e`)

Two scans ran over every rendered prose unit: the `check_plain_language.mjs` `corpus()` file
list (each `src/data/<dir>/<slug>.ts`, the accessor modules and the Student Clubs layers),
loaded with `loadUnits()`, which applies the flag-visibility skip. They found 234 distinct
units outside `sportsPrograms/` and `metricValues.ts`. Each was classified under the Rulings,
and **78 are REMOVE**: the table below. The other 156 are KEEP (implicit, own-result
ranking, within-school, student "peers", opponent results, quotes, guidance) or false
positives ("compared with the Class of 2025 table", "relative to the admission decision").

The scans are a **lower bound** (memory `unit-conversion-allowlist-is-a-lower-bound`), so
Step 2 re-runs them with the patterns in "Scan patterns" and classifies any new hit.

`at` = the unit label `plain_review.mjs` and the overlay work files use: `slug:path` (Clubs
layers prefix the path with `clusters.` / `catalog.`). Default treatments are the planner's
(rewrite first, per "How to remove"); measure each against the guards and the evidence before use.

**Batch A — After School, Summer, Global Exposure, Course Offerings (36 units)**

| # | at | Comparison today | Default treatment |
|--:|---|---|---|
| 1 | `providence-day:verdict.headline` (afterSchool) | "with the most transparent pricing in this set" | "with unusually transparent pricing"; keep "many peers don’t offer" (implicit) |
| 2 | `charlotte-christian:coverage.headline` | ", and one of the sharpest split deadlines in this set" | "— a full hour earlier, an unusually sharp split." |
| 3 | `charlotte-christian:dayInside.headline` | "is the only school here that publishes an actual timed daily schedule — and it protects" | "Charlotte Christian publishes an actual timed daily schedule, which few schools do, and it protects …" |
| 4 | `charlotte-christian:verdict.strengths[0]` | "No other school in this set publishes its schedule at all." | "Few schools publish their after-school schedule at all." |
| 5 | `charlotte-christian:verdict.watchouts[4]` | ", unlike most peers here" | "**Snack is not provided** in either program, though many schools provide one." |
| 6 | `charlotte-christian:verdict.headline` | "The most operationally transparent program here" | "An unusually transparent program — a published schedule, …" |
| 7 | `charlotte-country-day:coverage.headline` | "— the finest-grained coverage ladder of any school here" | "— an unusually fine-grained coverage ladder." |
| 8 | `charlotte-country-day:verdict.headline` | "The most flexible and most transparently priced after-school program in this set — and the one whose enrichment offering you cannot actually see before you enroll." | "An unusually flexible, transparently priced after-school program, but its enrichment offering cannot be seen before you enroll." |
| 9 | `cannon:cost.aside.text` | "— the most forgiving occasional-use option in this set" | "— an unusually forgiving option for occasional use." |
| 10 | `cannon:verdict.strengths[1]` | ", which several peers here do not do at all" | "…, 11:45 a.m.–4:00 p.m., which many schools do not do at all." |
| 11 | `cannon:verdict.strengths[2]` | "— the most forgiving occasional-use model in this set" | "— an unusually forgiving model for occasional use." |
| 12 | `cannon:verdict.strengths[4]` | bold "**The largest fully priced enrichment catalog on this site**" | "**An unusually large, fully priced enrichment catalog**" (same `**` count) |
| 13 | `cannon:verdict.headline` | "The most flexible program here for occasional users, with the deepest published enrichment catalog" | "An unusually flexible program for occasional users, with a deep published enrichment catalog — …" |
| 14 | `covenant-day:coverage.facts[0].text` | "— the only free morning care in this comparison" | "— free morning care, which few schools offer" |
| 15 | `covenant-day:verdict.headline` | "The most parent-friendly entry price in this set" | "An unusually parent-friendly entry price — free morning care, $20 drop-ins — …" |
| 16 | `covenant-day:verdict.subhead` | "matches the 6:00 p.m. peer standard" | "Coverage runs to the common 6:00 p.m. close; the catalog opacity is the one real gap." |
| 17 | `covenant-day:verdict.strengths[0]` | "— every peer here charges for morning care." | "— most schools charge for morning care." |
| 18 | `covenant-day:verdict.strengths[2]` | "matches the best pickup time in this comparison" | "**Coverage to 6:00 p.m. for JK–8** matches the latest pickup most schools offer." |
| 19 | `davidson-day:verdict.strengths[0]` | "— including a toddler tier most schools here do not cover at all" | "— including a toddler tier many schools do not cover at all."; keep "competitive with peers" |
| 20 | `gaston-day:coverage.facts[5].text` | ", which is normal on this roster but worth stating" | ", which is common but worth stating" |
| 21 | `gaston-day:dayInside.subhead` | "Unusually for this roster, " | "Unusually, Gaston Day prints the actual clock rather than describing the program in general terms." |
| 22 | `trinity-episcopal:verdict.headline` | "The most deliberately affordable after-school program on this roster" | "An unusually affordable after-school program, by design — …" |
| 23 | `trinity-episcopal:verdict.strengths[0]` | "No other school in this set prices after-school care on ability to pay at all." | "Few schools price after-school care on ability to pay at all." |
| 24 | `trinity-episcopal:verdict.strengths[4]` | ", the latest close on this roster" | ", a late close," |
| 25 | `providence-day:catalog.headline` (summer) | "The largest published slate of the six schools — " | "An unusually large published slate: 170 priced camps across nine sessions, …" |
| 26 | `providence-day:catalog.camps[1].desc` | "— the longest published camp day at any of these schools." | "— an unusually long published camp day." |
| 27 | `charlotte-country-day:catalog.headline` (summer) | "tier no other school here offers" | "…including a dedicated farm campus tier, which is rare." |
| 28 | `charlotte-country-day:costPlanner.tiers[6].detail` | "— a tier no other school here has." | "The farm campus premium — a rare tier." |
| 29 | `charlotte-country-day:catalog.camps[0].desc` | "— the tier that sets Country Day apart from the other five schools here." | "On the school’s own farm, a rare setting for a summer camp." (guard (n): "five" leaves, by design) |
| 30 | `cannon:costPlanner.headline` | "is the only one of these programs that takes a deposit" | **delete** the comparison: "Camp Cannon takes a deposit: 50% at registration, the balance due May 15." ("unusual" would overreach; ONLY leaves, by design) |
| 31 | `covenant-day:catalog.camps[19].desc` | "— the rare HS academic camp in this set." | "— a rare high-school academic camp." |
| 32 | `providence-day:verdict.standsOut.summary` (internationalTravel) | "Among Charlotte private schools, " | "Providence Day stands out for …" ("stands out" is implicit) |
| 33 | `charlotte-country-day:verdict.standsOut.summary` | "Among the schools on this site, Country Day publishes the most Middle School travel: six experiences from 6th grade." | "Country Day publishes an unusually full Middle School travel program: six experiences from 6th grade." |
| 34 | `cannon:verdict.standsOut.summary` | "Among the other schools on this site, only Providence Day and Davidson Day publish a global studies credential." | "Few schools publish a global studies credential." |
| 35 | `davidson-day:verdict.standsOut.summary` | "is unlike any other school's here: its travel is" | "Davidson Day's global program is unusual: its travel is archaeology research, not touring." |
| 36 | `covenant-day:divisions[0].teaser` (course-offerings) | "a Restoration & Sustainability department no other school here runs" | "…and a Restoration & Sustainability department, which is rare." |

Rows 1–24 are `src/data/afterSchoolPrograms/`, 25–31 `src/data/summer/`, 32–35
`src/data/internationalTravel/`, 36 `src/data/courseOfferings.ts`.

**Batch B — College Support, Admissions, Financial Aid, The Arts, Student Clubs (42 units)**

| # | at | Comparison today | Default treatment |
|--:|---|---|---|
| 37 | `charlotte-christian:counseling.timeline[2].note` (collegeSupport) | "The most structured junior-year requirement in this set" | "An unusually structured junior-year requirement" |
| 38 | `charlotte-christian:verdict.headline` | "It comes with the thinnest learning-support disclosure among the schools on this site." | "It publishes unusually little about learning support." |
| 39 | `charlotte-catholic:transcript.flags[0].text` (kind `gap`, renders) | "the Scholar/Scholar with Distinction ledger other schools show cannot be built here" | "But it means the Scholar/Scholar with Distinction ledger many school profiles show cannot be shown for this school." |
| 40 | `charlotte-catholic:verdict.subhead` | "the tuition structure answers one no other school on this roster raises" | "…— and the tuition structure answers one few schools raise." |
| 41 | `charlotte-country-day:wholeClass.support[2].text` | "Uniquely among the schools here, " | "Unusually, the ERP explicitly **“assists …”** — …" (bold span byte-identical) |
| 42 | `cannon:wholeClass.support[0].text` | "It is also some of the best-documented learning support of the schools on this site." | "It is also unusually well-documented learning support." |
| 43 | `cannon:verdict.headline` | "But it shares less about outcomes than its larger peers." | "But it shares less about outcomes than many larger schools do." |
| 44 | `covenant-day:counseling.headline` | ", the heaviest caseload in this comparison" | **delete**; end "for 85 seniors." (no point beyond the ranking) |
| 45 | `covenant-day:edge.headline` | "a department no other school has" | "a department few schools have" |
| 46 | `covenant-day:edge.levers[0].items[0]` | " — unique among these schools" | " — an unusual structure" |
| 47 | `covenant-day:verdict.points[1].label` | "The heaviest caseload in this comparison" | "A heavy caseload" (its `text` already says "One dedicated college counselor for 85 seniors") |
| 48 | `davidson-day:verdict.subhead` | "will find less here than anywhere else in this set" | "…will find less here than at most schools, which puts the burden of verification on the tour." |
| 49 | `gaston-day:verdict.points[2].text` | "is among the lowest on this roster" | "…, and the ~18:1 senior caseload is unusually low." |
| 50 | `charlotte-christian:guide.bands[0].steps[3].detail` (admissions) | "— a document the other Charlotte schools do not ask for up front." | "— a document many schools do not ask for up front." (the quote stays byte-identical) |
| 51 | `covenant-day:guide.aid.text` | ", and it is unique among the Charlotte schools" | "There is also one unusual step you must complete first." |
| 52 | `providence-day:sections[0].figureNote` (financial-aid-report) | "Among the schools on this site, this kind of list is published less consistently than any other item these reports track." | "Schools publish this kind of list less consistently than most other cost details." |
| 53 | `charlotte-christian:sections[2].boxes[0].body` | "No other school on this site made its own aid application depend on a state application." | "Few schools make their own aid application depend on a state application." |
| 54 | `charlotte-catholic:sections[0].figureNote` | "No other school on this site prices tuition this way: " | "Few schools price tuition this way: **price depends on parish participation, …**" |
| 55 | `charlotte-catholic:sections[2].boxes[0].body` | "because some other schools on this site use FACTS Grant & Aid" | "because some schools use FACTS Grant & Aid to assess need." (implicit) |
| 56 | `covenant-day:sections[0].figureCaption` | " — the lowest top rate in this comparison" | **delete**: "Published tuition by grade band" ("unusually low" would overreach: it is the lowest of 13) |
| 57 | `covenant-day:sections[0].figureNote2` | "Several other schools on this site do not publish a list like this." | "Many schools do not publish a list like this." |
| 58 | `covenant-day:sections[2].timeline[1].detail` | " — a hard gate no peer school here imposes" | " — a hard gate few schools impose" |
| 59 | `covenant-day:sections[3].boxes[0].body` | "Most other schools on this site file a Form 990, so their aid totals can be checked against a return." | "When a school files a Form 990, its aid totals can be checked against a return." (keeps `990`) |
| 60 | `covenant-day:sections[6].stats[1].label` | " — the lowest top tuition in this comparison" | **delete**: "top band" (as #56) |
| 61 | `davidson-day:sections[5].boxes[0].body` | ", one of the steadiest patterns among the schools on this site" | ", an unusually steady pattern" |
| 62 | `carmel-christian:sections[3].boxes[0].body` | same 990 sentence as #59 | same treatment, byte-identical to #59 |
| 63 | `hickory-grove-christian:sections[2].boxes[0].body` | same 990 sentence as #59 | same treatment, byte-identical to #59 |
| 64 | `gaston-day:sections[2].timeline[0].detail` | "Clarity is the aid platform most schools on this site use." | "Clarity is a widely used aid platform." |
| 65 | `gaston-day:sections[3].boxes[0].body` | ", and few schools on this roster publish one at all" | ", and few schools publish one at all." |
| 66 | `gaston-day:sections[5].boxes[0].body` | "Most other schools on this site publish at least the number of installments." | "Many schools publish at least the number of installments." |
| 67 | `trinity-episcopal:sections[1].figureNote` | ", one of very few schools on this roster to do so" | "Trinity prices the activity fee **per grade**, which few schools do." |
| 68 | `trinity-episcopal:sections[3].figureNote` | ", which few schools on this roster publish" | "A genuine three-point series, which few schools publish: **26% / …**" |
| 69 | `charlotte-country-day:verdict.headline` (artsPrograms) | "The deepest arts facilities of any school in this set" | "Unusually deep arts facilities, a dual AP-and-IB ceiling, …" |
| 70 | `covenant-day:ladder.subhead` | " — a rung no other school here has" | " — a rung few schools have." |
| 71 | `carmel-christian:verdict.headline` | "a leaner music and visual-arts footprint than its regional peers" | "…a leaner music and visual-arts footprint than many schools in the region." (no school named) |
| 72 | `providence-day:affinity.subhead` (clubsPrograms) | "The deepest published affinity structure in this comparison set" | "An unusually deep published affinity structure, built out steadily from 1995 onward — …" |
| 73 | `charlotte-latin:affinity.subhead` | "publishes markedly less on this than its peers" | "Charlotte Latin publishes markedly less on this than many schools: no roster page, no counts, and no divisional breakout." |
| 74 | `charlotte-latin:honors.headline` | ", uniquely in this comparison," | ", unusually," |
| 75 | `charlotte-catholic:affinity.subhead` | "is one of the most transparent on this roster" | "The directory is unusually transparent: most entries publish …" (implicit) |
| 76 | `cannon:honors.headline` | " — the widest span in this comparison," | "Twelve honor societies — an unusually wide span, reaching social studies, …" |
| 77 | `davidson-day:service.subhead` | "The smallest school in this comparison publishes the least overall" | "A small school that publishes little overall — but its civic programming is …" |
| 78 | `charlotte-catholic:clusters.rows[0].note` (clubClusters layer) | ", older than any competitive result shipped for another school here," | "That coverage is from 2017, so no current standing can be claimed." (nothing to rewrite: the comparison was the site's own bookkeeping) |

Rows 37–49 are `src/data/collegeSupportPrograms/`, 50–51 `src/data/admissionsPrograms/`,
52–68 `src/data/financialAidReports.ts`, 69–71 `src/data/artsPrograms/`, 72–77
`src/data/clubsPrograms/`, 78 `src/data/clubClusters.ts`.

**Repeats.** #59, #62 and #63 share one sentence and stay byte-identical after the rewrite
(guard (j) groups repeats only within one school, so check these by grep).

### Scan patterns (Step 2 re-runs both)

The scanner loads every unit the way `npm run check:plain` does:

```js
import { corpus, loadUnits } from './scripts/check_plain_language.mjs'
for (const f of await corpus(ROOT)) {
  if (f.scope.kind === 'chrome') continue
  for (const u of await loadUnits(join(ROOT, f.relPath), f.scope)) if (CMP.test(u.text)) print(f.relPath, u.path, u.text)
}
```

Pattern 1 (the first scan):

```
/\bunlike\b|\bother (?:schools?|peers?|high schools?|programs? on|CISAA|NCISAA|Charlotte)\b|\bpeers?\b|\bpeer schools?\b|\bin this (?:comparison|app|set|roster)\b|\bon this (?:roster|site)\b|\bamong (?:the )?(?:schools|Charlotte|peers|private)\b|\bof any (?:school|other)\b|\bthan any (?:other )?school\b|\bno other school\b|\bevery other\b|\bmost (?:Charlotte|other|schools|peer)\b|\bfew (?:other )?schools\b|\bby contrast\b|\bin contrast\b|\bwhereas\b|\bcompared (?:with|to)\b|\bcomparison\b|\brelative to\b|\bthe only (?:school|one)\b|\bstands? out\b|\bdifferentiator\b|\bless than (?:at|other)\b|\bmore than (?:at|other)\b|\bhigher (?:share|rate) than\b|\bwhere [A-Z][a-z]+(?: [A-Z][a-z]+)* (?:names|publishes|lists|offers|has)\b|\bof the (?:six|seven|eight|nine|ten|eleven|twelve|thirteen) schools\b|\bacross (?:the )?(?:schools|roster)\b|\bany school\b/i
```

Pattern 2 (wider; found 8 more):

```
/\b(?:schools?|programs?|peers?|offices?|profiles?) (?:here|beside it|on this (?:site|roster)|in this (?:set|comparison|app))\b|\bhere (?:does|do|offers?|has|publishes)\b|\bany (?:other )?(?:school|peer)s?\b|\bother (?:Charlotte|independent|private|K–12|local|area) (?:schools?|programs?)\b|\bCharlotte(?:-area)? (?:independent|private) schools\b|\bits (?:larger |regional |CISAA |local )?peers\b|\bthan (?:its|their) (?:larger |regional )?peers\b|\bthe (?:six|seven|eight|nine|ten|eleven|twelve|thirteen) schools\b|\b(?:of|among|across) (?:the|these) (?:schools|programs)\b|\bpeer (?:schools?|programs?|offices?|K–12|profiles?|standard)\b|\bthis (?:set|comparison|roster)\b|\bthe other schools\b|\buniquely\b|\bunique among\b|\bthe only (?:school|program|one)\b|\bnone of the other\b/i
```

Also grep by hand for "here" superlatives the patterns miss: `/\b(?:most|least|largest|smallest|deepest|widest|heaviest|lowest|highest|latest|earliest|best|only)\b[^.;]{0,60}\bhere\b/i`.
Exclude `src/data/sportsPrograms/` and `src/data/metricValues.ts` (Out of scope).

### How these fields render

- **Markdown.** Admissions (`steps[].detail`, `watchOuts[].text`, `aid.text`), Financial
  Aid (`boxes[].body`, `figureNote`, `figureNote2`, `componentsNote`, `timeline[].detail`, …),
  After School and Summer units hold `**` spans that render bold. **No rewrite adds or removes
  a `**`.** Every batch runs `plain_review.mjs` with `--md-paths '^$'`, so guard (l) fails any
  `**` count change. The Arts and Student Clubs render no markdown, so their calls add
  `--no-md` (guard (o): no `*`).
- **Headlines are teasers.** `verdict.headline`, `*.headline` and `catalog.headline` show on
  the collapsed card (`SchoolDetail.tsx` renders `localizeMoneyText(headline)`). Rewriting
  them changes the teaser, which is expected here; the browser check confirms each new teaser.
- **Searched text.** After School and Summer `camps[].desc` / `classes[].desc` are searched
  by the catalog filter (`c.desc.toLowerCase().includes(q)`); a shorter desc is fine.
- **Money.** `$` amounts stay char-for-char in the field they are in; never move one into a
  different field (`check:moneytext` runs the real `format.ts`).

### Related work

- **Plan `plainsports`** (branch `feat/plainsports`, in progress) owns Sports and removes its
  comparisons batch by batch under the same ruling. Its list is in its "Style rulings". This
  plan never edits `src/data/sportsPrograms/`.
- **Precedent** for the review machinery: `plainsmall.md` (fixes commits, review files,
  `plain_review.mjs` guards, the Phase 2 revise-predecessor pipeline).

## Decisions

- **Remove, never fact-check and keep** — the user's rule; a true comparison goes too.
- **Rewrite to a hedged, school-focused statement first; delete only as the fallback** — the
  user's suggestion while this plan was written. It keeps the parent's point; the hedge keeps
  the claim inside the evidence ("How to remove").
- **Implicit comparisons and own-result rankings stay** — the user's two follow-up rulings.
- **Sports and the Compare page are out of scope** — Sports belongs to plainsports; the
  Compare page cell tips (`metricValues.ts`) are comparative by design.
- **Two batches by area**, ~36 and ~42 short edits, each reviewable in one sitting.
- **One branch, one PR, opened after Phase 2.** Each batch is its own commit on
  `feat/nocompare`.
- **No new tooling.** `plain_review.mjs` already has every guard needed. Guards (h), (n), (b)
  and (p) may fire when the removed clause held a marker word, a count word, a digit or a
  school name; each such failure is allowed **only** when the token sits inside the removed
  comparison, and each is listed in the review file.
- **No edit outside the census units**, except a new hit from the Step 2 re-scan that is
  classified REMOVE and added to the batch's worklist.
- **Research bookkeeping seen in passing is not fixed here** (e.g. Christian Financial Aid
  "(retrieved 14 Sep 2026)"); list it under Implementation notes as a candidate.

## Approvals needed

**None up front.** No card, section, Compare row, metric key, topic, ordering, layout or chrome
change; no field is added or split. The gates are the user's wording reviews: one per batch,
then Phase 1 → 2.

## Out of scope

- `src/data/sportsPrograms/` (plan `plainsports`).
- `src/data/metricValues.ts` (Compare page), `src/locales/*.json` (chrome), `src/content/**`.
- KEEP cases (Rulings), including implicit comparisons and own-result rankings.
- Fact-checking any figure, plain-language rewrites beyond the removed clause, and any
  structural change.
- Deploying. Merging is pre-authorized; `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

**Each batch runs Steps 2–7.** Before Batch B: `git checkout feat/nocompare`, then
`git fetch && git rebase origin/main`. Do not stash (memory `never-git-stash-in-shared-tree`).

1. **Branch** (Batch A only): `git checkout -b feat/nocompare origin/main`. Set this plan's
   status to `in-progress` here and in `INDEX.md`.

2. **Re-scan and lock the batch's worklist.**
   - Run both "Scan patterns" plus the "here" grep over the batch's areas. Classify every hit
     not in the Census under the Rulings. A new REMOVE hit joins the batch (add its row to
     the Census here, with a treatment). A hit whose unit no longer exists or no longer
     compares (`main` moved) leaves it; note both in Implementation notes.
   - Write `.claude/plans/nocompare-data/worklist-batch<A|B>.json` by hand in the
     `plain_review.mjs` worklist format: `{"units":[{"at":"<slug>:<path>","text":"<current
     English>"}, …]}`, one entry per unit, using the `at` labels in the Census. The
     `--allow` guard (k) reads only `units[].at`.

3. **Edit each unit with Edit** (the plain-language hook sees each edit). Apply the
   treatment, keeping everything outside the removed comparison byte-identical. Keep each
   string valid TS: single-quoted strings use curly `’`; a straight `'` means the string is
   double-quoted.

4. **Guards and review file.** Run one call per directory or accessor topic in the batch,
   `--base main` for Batch A and `--base <Batch A commit>` for Batch B:
   - After School: `node scripts/plain_review.mjs --dir src/data/afterSchoolPrograms --base <b> --allow .claude/plans/nocompare-data/worklist-batchA.json --md-paths '^$' --small-markers --out .claude/plans/nocompare-data/review-batchA-after-school.md --check`
   - Summer: the same with `--dir src/data/summer` and `review-batchA-summer.md`.
   - Global Exposure: `--dir src/data/internationalTravel`, `review-batchA-global.md`.
   - Course Offerings: `--topic course-offerings --slugs covenant-day`, `review-batchA-courses.md`.
   - College Support: `--dir src/data/collegeSupportPrograms --md-paths '^$'`, `review-batchB-college.md`.
   - Admissions: `--dir src/data/admissionsPrograms --md-paths '^$'`, `review-batchB-admissions.md`.
   - Financial Aid: `--topic financial-aid-report --md-paths '^$' --aid-markers`, `review-batchB-aid.md`.
   - The Arts: `--dir src/data/artsPrograms --no-md --md-paths '^$' --arts-markers`, `review-batchB-arts.md`.
   - Student Clubs: `--dir src/data/clubsPrograms --layers --no-md --md-paths '^$' --clubs-markers`, `review-batchB-clubs.md`.

   Each must exit 0, **or** fail only on guards (b), (h), (n) or (p) whose token lies inside
   the removed comparison. Append a `## Guard failures by design` table to that review file:
   at, guard line, removed span. Any other failure is a real error: fix it. Then:
   - **Repeats:** `grep -c "When a school files a Form 990, its aid totals can be checked against a return." src/data/financialAidReports.ts` → 3 (Batch B).
   - **Hook loop:** `for f in <the batch's files>; do node scripts/check_plain_language.mjs --file $f; done` → clean.
   - **Stray edits:** `git diff --name-only main -- src/ scripts/` lists only the batch's files
     (and Batch A's, for Batch B).
   - **Re-scan:** both patterns return no REMOVE hit in the batch's areas.

5. **Independent review.** Spawn one fresh `general-purpose` subagent (it never sees this
   conversation). Give it the batch's review files, this plan's "Rulings" and "Census", and
   the batch's data files. It checks every row for: a comparison still present; a KEEP case
   removed; meaning drift in what is left; a dropped hedge, condition or figure; a `**` span
   changed; a reworded headline that now overclaims ("A deep catalog" where the school's
   own data does not support "deep"); a by-design guard failure whose token is **not**
   inside the removed span; a rewrite that generalizes past the evidence or uses an absolute
   ("no school", "the only", "the most") where a hedge belongs ("How to remove"). It fixes findings with Edit and re-runs Step 4. Append its
   findings under `## Independent review` in the first review file of the batch.

6. **Checks.**
   - `npx tsc -b`, then `npx vite build`.
   - `npm run check:schema && npm run check:spelling && npm run check:flags && npm run check:matrices && npm run check:chrome && npm run check:runtime && npm run check:moneytext && npm run check:dates && npm run check:spans`, plus `npm run test:plain`.
   - `npm run check:live` **fails by design** in Phase 1: stale stamps only in the batch's
     topics, one per changed unit per locale. Record the per-topic counts (Phase 2's input)
     and confirm no other topic appears. `npm run build` stops at `check:live`, which is why
     the steps above run its parts by hand.

7. **Browser check and commit.**
   - `npx vite preview` after the build; headed Chrome via Playwright (memory
     `headed-chrome-via-playwright`; script in the repo root as a dotfile, removed after).
     For each school in the batch, open `/school/<slug>/?topic=<topic>&lang=en` for each
     changed topic (topic slugs: `after-school`, `summer-programs`, `international-travel`,
     `course-offerings`, `college-support`, `admissions`, `financial-aid-report`,
     `the-arts`, `student-clubs`), open every `<details>`, and confirm with `textContent`
     that each changed unit renders its new text, that each changed headline is the new
     teaser, and that no removed comparison phrase remains.
   - Stage explicit paths only (`git status --short` first, never `git add -A`): the batch's
     data files, `.claude/plans/nocompare-data/*`, this plan. Commit
     `nocompare: batch <A|B> English — <areas>`, push, and confirm `git rev-parse HEAD` equals
     `git ls-remote origin feat/nocompare`.
   - Report to the user: the review file paths, the changed units per area, the reviewer's
     findings, the by-design guard failures, the re-scan's new hits, and the pages to look at.
     After Batch A give `/implement nocompare — Batch B. Batch A English is approved<, with
     these rulings: …>.`; after Batch B set `status: english-done` (INDEX *English shipped*)
     and give `/implement nocompare — Phase 2. Both English batches are approved. Run only
     Phase 2.`

**→ STOP after each batch.** On resume, record the user's rulings in this plan's
Implementation notes before the next step.

**→ STOP after Batch B. `/implement` ends its turn and waits.** Nothing below runs until the
user confirms both batches.

### Phase 2 — Every other locale

**Scope:** the prose overlays of the changed topics, in the nine `PROSE_TRANSLATED` locales
(`es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`; read the list from `src/lib/i18n.ts`).
Topics: `after-school`, `summer-programs`, `international-travel`, `course-offerings`,
`college-support`, `admissions`, `financial-aid-report`, `the-arts`, `student-clubs` (the
Clubs layers live in the `student-clubs` overlay). No chrome catalog, no `metric-values`.
Mechanism: `.claude/docs/prose-translation-architecture.md`; precedent: the plainsmall Phase 2
implementation note (revise the reviewed predecessor).

1. **Snapshot** each base work file: `git show main:src/data/overlays/work/<topic>.<lang>.json`
   into the session scratchpad.
2. **Splice** each topic per locale: `node scripts/i18n_splice_work.mjs --lang <code> --topic <topic>`.
   Expect *added* = *dropped* = that topic's Phase 1 `check:live` stale count. Lopsided counts
   → stop and investigate.
3. **Translate each added unit as a revision of its predecessor** (pair it with the dropped
   unit at the same `at`). The edit is almost always a deletion: remove the same clause from
   the reviewed translation and keep every other word, name form and register choice. A
   reworded headline is revised to the new English. The 990 sentence (#59, #62, #63) is
   translated once per locale and reused. Key every `t` to the **new stamp**, never an index.
   Use three `general-purpose` subagents of three locales each (`es`/`fr`/`it`,
   `bn`/`hi`/`te`, `ht`/`fa`/`ar`), each in its own scratch subdirectory, reading only its
   task file and writing only its output (memory `parallel-locale-agents-collide`). Gate
   every output before applying it, as plainsmall did: numeric-token multiset vs the new
   English; money/percent/year tokens; the `**` count; no bidi controls, no non-Western
   digits; `t` ≠ English and a 0.4–2.5 length ratio; no English month outside a quote; the
   wrong-script scan (Bangla danda is the known false positive; `fa` rejects Arabic ي/ك, `ar`
   rejects Persian-only letters).
4. **Rebuild** each overlay: `node scripts/i18n_build_overlay.mjs --topic <topic> --lang <code>`.
5. **Verify by stamp.** `check_work_integrity` reports false violations after a splice
   (memory `comparerows-shipped`); prove against the snapshot instead that every kept stamp
   has `text` and `t` byte-identical and every new stamp is non-blank.
6. **Run the Phase 2 checks** (below). Then fill in Implementation notes; set `status:
   implemented` and `prs: [<n>]`, and the INDEX row to *Implemented* with the PR link; open
   the PR with `--body-file` (per-area counts, review-file links, reviewer findings, the
   by-design guard failures); squash-merge (pre-authorized); `git checkout main && git pull`.
   **Do not deploy.** Report "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/afterSchoolPrograms/{providence-day,charlotte-christian,charlotte-country-day,cannon,covenant-day,davidson-day,gaston-day,trinity-episcopal}.ts` | edit (Batch A) |
| `src/data/summer/{providence-day,charlotte-country-day,cannon,covenant-day}.ts` | edit (Batch A) |
| `src/data/internationalTravel/{providence-day,charlotte-country-day,cannon,davidson-day}.ts` | edit (Batch A) |
| `src/data/courseOfferings.ts` | edit (Batch A, Covenant Day teaser) |
| `src/data/collegeSupportPrograms/{charlotte-christian,charlotte-catholic,charlotte-country-day,cannon,covenant-day,davidson-day,gaston-day}.ts` | edit (Batch B) |
| `src/data/admissionsPrograms/{charlotte-christian,covenant-day}.ts` | edit (Batch B) |
| `src/data/financialAidReports.ts` | edit (Batch B) |
| `src/data/artsPrograms/{charlotte-country-day,covenant-day,carmel-christian}.ts` | edit (Batch B) |
| `src/data/clubsPrograms/{providence-day,charlotte-latin,charlotte-catholic,cannon,davidson-day}.ts`, `src/data/clubClusters.ts` | edit (Batch B) |
| `src/data/overlays/work/<topic>.<lang>.json`, `src/data/overlays/<topic>.<lang>.json` (9 topics × 9 locales) | edit (Phase 2) |
| `.claude/plans/nocompare-data/worklist-batch{A,B}.json`, `review-batch*.md` | new |
| `.claude/plans/nocompare.md`, `.claude/plans/INDEX.md` | edit: status, notes |

No skill or command changes, so `.claude/SKILLS.md` is not touched.

## Verification

### Phase 1 — English (per batch)

- [ ] Re-scan: no REMOVE hit left in the batch's areas; new hits classified and recorded.
- [ ] Every Step 4 `plain_review.mjs … --check` exits 0 or fails only by design, each listed.
- [ ] No `**` count change anywhere (guard (l)); no `*` in Arts or Clubs (guard (o)).
- [ ] The 990 sentence is identical at all three Financial Aid sites (Batch B).
- [ ] Hook loop clean on every changed file.
- [ ] `git diff --name-only main -- src/ scripts/` lists only the batch's files.
- [ ] Independent review done; findings fixed and recorded.
- [ ] `npx tsc -b` clean, `npx vite build` succeeds, the Step 6 list green; `check:live` stale
  only in the batch's topics.
- [ ] Browser: every changed unit and teaser renders; no removed phrase remains.

### Phase 2 — Locales

- [ ] `npm run check:live && npm run check:runtime` — clean.
- [ ] `npm run check:digits` — no finding on a changed unit.
- [ ] Per locale: `npm run check:sepdrift -- --lang <code>` and
  `python3 scripts/check_figures.py --topic <topic> --lang <code>` for each changed topic.
- [ ] `npm run check:dates`, `check:moneytext`, `check:currency`, `check:fr`, `check:hi`,
  `check:fa`, `check:bidi`, `check:chrome`; then `node scripts/check_work_integrity.mjs` and
  the by-stamp proof.
- [ ] `npm run i18n:leaks -- --lang <code>` for each locale: no flag on a changed path.
- [ ] `npm run build` — green end to end.
- [ ] Browser, `es` / `fa` / `hi`: Covenant Day After School and Financial Aid, Charlotte
  Catholic College Support, Cannon Summer — each changed unit is in the locale with the
  comparison gone (strip bidi isolates before probing `fa`; memory `ccdprofile-shipped`).

## Risks

| Risk | Mitigation |
|---|---|
| A reworded headline overclaims ("deep", "large") | Reviewer item; the school's own data must support the adjective |
| A rewrite generalizes past the evidence (a claim about 13 schools becomes one about all schools) | Hedged words only ("few", "many", "unusually"), never "no school" / "the only"; delete where even the hedge is a stretch; reviewer item |
| A KEEP case gets removed (implicit comparison, own ranking, student "peers") | Rulings list with examples; reviewer item |
| The scans miss a comparison | Two patterns plus the "here" grep; re-run at each batch; reviewer looks for leftovers |
| A by-design guard failure hides a real slip | Each failure listed with its removed span; reviewer checks the token is inside it |
| Phase 2 deletes the wrong clause in a locale | Revise-predecessor pairing by `at`; numeric and `**` gates; leaks check |

## Open questions

- **The hedged rewrites ("unusually", "few schools") are the site's judgment, not the school's
  claim.** They follow the KEEP rule for implicit comparisons. **Default:** use them, and
  delete where even the hedge is a stretch (#30, #44, #56, #60). The Batch A review is the
  place to overrule the style. #47 "A heavy caseload" likewise. If the user prefers, #47 can echo its
  text ("One counselor for 85 seniors", which adds digits to the label and trips guard (b)
  by design).
- **Cannon College Support headline (#43)** uses the implicit KEEP form ("than many larger
  schools do") rather than deleting, because "But it shares less about outcomes." alone has
  no object. **Default:** the implicit form.

## Implementation notes

*Filled in by `/implement`.*

### Candidates noticed, not acted on

- Christian Financial Aid `sections[2].boxes[0].body` holds research bookkeeping: "(retrieved
  14 Sep 2026)".
- Davidson Day Financial Aid `sections[5].boxes[0].body` "But archived copies show 2022–23
  onward" (archive provenance in prose).
