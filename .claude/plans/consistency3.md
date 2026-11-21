---
name: consistency3
title: Fix the residue of plans consistency and consistency2 found by re-scan #2
status: english-done
phases: 2
created: 2026-11-21
branch: fix/consistency3
prs: []
closing_loop: consistency-self-scan
---

# Fix the residue of plans `consistency` and `consistency2` (re-scan #2)

## Goal

A second re-scan of the deployed site (main `d19fc9da`, 2026-11-20) checked every row of both
earlier plans and swept all 13 school pages again. This plan fixes what it found: **4 leftover
fixes** from the earlier plans and **24 new value conflicts** (a 25th, LAT-S1, is closed with no change). Every one is a figure or
sentence that disagrees with another figure on the same page or on Compare.

It also closes two items that earlier rounds parked (user, 2026-11-21): **LAT-13**, Latin's
after-school tile with no basis, which needs a small approved UX tweak, and **CCD-R8**,
Country Day's endowed-scholarship figure, whose only source page was believed gone. *(At
implement the page turned out to be live. The ladder stays and cites it; see
Implementation notes and settled S7.)*

It worked when a fresh page dump agrees on every ID in this plan and `npm run build` passes.

## Context

- **Worklists are the authority.** `.claude/plans/consistency3-data/rescan3-*.md` holds,
  per school group, the exact quoted text, the data file and line, the page line in the
  `pages3` dump and the evidence for every ID. `brief3.md` is the brief the re-scan ran on.
  Line numbers are approximate after any edit; match on the quoted text.
- **The re-scan's own conclusion:** both earlier plans held almost everywhere. All four
  leftovers share one cause: a fix landed in one card and missed a second card restating the
  same fact. The last re-scan wrongly marked HG-17, PD-17 and GD-14 resolved, so consistency2
  never touched them.
- **Build gates today:** `scripts/check_consistency.mjs` gates R1–R7 and R9–R11; R8 is
  `--report` only. `npm run check:buckets` checks every `nu75`/`lac75` tag and printed
  "N / 75" count against `src/data/collegeRankings.ts`.
- **Top-75 counts are settled and NOT in scope.** Re-scan #2 noted that ties put 79
  National Universities at #75 or better, so PD (78) and CCD (76) show "75 / 75". The user
  confirmed on 2026-11-21 that capping at 75 / 75 is the rule worked out in PR #317
  (`check:buckets` clamps with `Math.min(institutions, 75)`). LAT-S1 is therefore closed
  with no change. Do not add tie notes, change quals or touch the clamp.
- **Gaston Day merit table (GD-S2).** `src/components/CollegeSupport.tsx` ~L358 renders the
  ledger column header as `tr('cardLabels.nationalMerit')` ("National Merit & College Board
  honors", `en.json` ~L728). It has no per-school override. `Transcript` in
  `src/data/collegeSupport.ts` ~L190 has `meritTitle?` but no column field.
- **Per-school Arts card titles (GD-S1)** are wired as COV-25 did it: an entry in
  `TITLE_OVERRIDES` in `src/data/artsProgram.ts` (~L330, beside `covenant-day` and
  `carmel-christian`), plus `cards.the-arts.ladder@<slug>` in every `src/locales/*.json`
  (`en.json` ~L653–674). The existing alias
  `{ from: 'the-tk-12-arts-ladder', topic: 'the-arts', key: 'ladder' }` in
  `src/lib/cardLinkAliases.ts` is topic-scoped, so the old link already resolves; run
  `npm run check:cardlink` to confirm it needs no new entry.
- **LAT-13: Latin's after-school tile.** The After School section head shows a stat tile
  "≈$930/mo · Cost of after-school care" (`metricValues.ts` `aftercare-cost`,
  'charlotte-latin' ~L1982). `$4,650 × 2 ÷ 10 = $930` is right, but the tile does not say what
  it buys: TK/K, the 1:30–6:00 p.m. tier, five days a week, billed $4,650 a semester. The
  Compare tooltip (`quals['charlotte-latin']`, ~L2026) says so; the school-page tile cannot. The
  tile renders in `src/pages/SchoolDetail.tsx` ~L1371–1395: value, then `subs` **only for
  College Support**, then the shared `vm.label`. There is no per-school line, which is why the
  first plan left LAT-13 as a component change (`consistency.md` → Implementation notes).
- **CCD-R8: Country Day's endowed-scholarship figure.** In `financialAidReports.ts`, the CCD
  report's `fa-merit` section (~L278–307) holds a `ladder` of four donor gift levels ($220K /
  25% / $9,900 up to $880K / 100% / $39,600), with `figureCaption`, `figureNote` and
  `figureNote2`, plus a "No merit track" box naming example endowed funds. All of it came from
  the school's **Endowment & Capital Giving** page via the deep-dive PDF ("retrieved 23 Jul
  2026"). Re-scan #1 found that page 404s at four likely URLs. The section's `source` (~L306)
  and the report's `sources` line (~L380) both name it; that is what the card's and the
  report's **Show sources** rows print. On the built page `$39,600` appears only in this
  ladder: the deep-dive prose in `src/content/financial-aid-tuition/charlotte-country-day.json`
  also tables it but does not render on the school page. With no `ladder`, `hasFigure` is
  false (`FinancialAidReport.tsx` ~L381) and the section renders its boxes and source row only.
- **Claude Design.** The app's design project is **Charlotte School Compare Website Design**
  (`5da24575-40bf-4787-8934-0fadfc56059f`). Its files are captures of the built app, one per
  page type and per research area; [`.claude/docs/design-sync.md`](../docs/design-sync.md) has
  the capture → write → `design:verify` loop, each file's capture command and the write traps.
  Section files are captured from a reference school (Providence Day for After School and
  College Support), and `design:capture --extra <slug>:<area>/<card>` adds another school's
  card, as the Financial Aid file does for Gaston Day. The MCP said standalone Claude Design
  closes on 2026-12-14.
- **Phase 2 mechanics** are the ones `consistency2` used (its `## Implementation notes` →
  Phase 2): `i18n_splice_work.mjs` per locale, token substitution for figure-only edits with
  the replacement count asserted, minimal edits of the reviewed `t`, one agent per locale in
  a private directory, and central validation. The mechanism is in
  `.claude/docs/prose-translation-architecture.md`.

## Decisions

- **Name:** `consistency3`. The user typed "contingency3"; it was read as this plan's
  series name, and the data folder already uses it.
- **GD-S2: per-school column header (user, 2026-11-21; this is the UX approval).** Add an
  optional boolean `meritCollegeAwards?: boolean` to `Transcript`. When true, the column
  header renders `tr('cardLabels.collegeMeritAwards')`, "College merit awards". It is a
  boolean, not a string, so the prose extractor never sees it; the label is chrome in all ten
  catalogs.
- **PD-S1: the Compare `ensembles` cell becomes "6 ensembles".** The row is "count or breadth
  … as each note describes them", the card's tile already says 6, and CCD counts all eight of
  its groups, auditioned included. The qual names both groups.
- **B items** (CC-S3, PD-S2, TRI-S1, TRI-S2) follow the standing pattern. Both values are
  shown and attributed, with a dev-only `kind: 'verify'` flag where the card has a `flags`
  field and a code comment where it does not (CCD-27 precedent). An ask-the-school line goes
  in where the card has a checklist. No value is picked.
- **C items** (COV-S1, DD-S6, DD-S7) change the label or year wording only.
- **CCD-S2 / Cannon rows with no recorded short-week price** (Vet Science, Exploradores,
  Watercolor Wonders, Irish Dance: absent from the brochure record's Week 2 sample) get a
  code comment only. Inventing a price is worse than the gap.
- **LAT-S1 (Top-75 denominator) is closed, no change** — the 75 / 75 cap is the settled
  rule (user, 2026-11-21; PR #317).
- **LAT-13: approved UX tweak (user, 2026-11-21), designed in Claude Design.** The school-page
  stat tile gains an optional per-school **basis line** under its value. Data: a new optional
  `tileBasis?: Record<string, string>` on a `VALUE_METRICS` entry, set only for
  `aftercare-cost` → `'charlotte-latin'`: "TK/K · 5 days to 6:00 p.m. · $4,650 a semester".
  It renders on the school page only; Compare already carries the qual tooltip and the sub.
  Every other tile renders exactly as today. The exact look (class, size, position against the
  value and the label) is settled **in the Claude Design project first** (step 0b), and the
  build matches it. Default if the design does not decide otherwise: the `stat-tile-sub` style
  College Support tiles use, between value and label.
- **CCD-R8: remove everything resting on the dead page (user, 2026-11-21).** *Superseded at implement: the page is live, and the user ruled on 2026-11-22 to keep the ladder and cite it (settled S7).* The page is gone,
  so nothing it alone supports stays: the whole `ladder` with `figureCaption`, `figureNote` and
  `figureNote2`, and the endowed-fund example sentences in the "No merit track" box. What stays
  is only what a **live** Country Day page supports: the need-based statement, the section's
  `tag`, the NOT PUBLISHED box. "Endowment & Capital Giving" comes out of the section's
  `source` and the report's `sources` line. Before deleting, re-confirm the page is still gone
  (step 3); if it has come back at a new URL, stop and ask instead.
- **Every approved UX change in this plan is designed in Claude Design and kept in sync**
  (standing rule in CLAUDE.md, set 2026-11-21). That covers LAT-13 **and GD-S2**. Design first,
  build to the design, then re-capture so the project shows what shipped. If the Claude Design
  MCP is not connected, stop and ask the user to reconnect it (`/design-login`); never fall
  back to an Artifact canvas or skip the design.
- **No new checker rule this round.** A short-week price rule needs a per-school
  registry of which weeks are short, which the summer data does not hold. A "<Sport> leads
  with N commits" rule was considered and dropped: DD-S3's count (7) is right and only the
  named list is short, so the rule would pass on the defect it was meant for. Most other
  findings are one card restating another in prose, which no field rule reads. Recorded so
  neither is re-proposed as an oversight.
- **One PR, two phases**, the same shape as `consistency2`.

## Approvals needed

1. **UX-gate items, both approved by the user on 2026-11-21:**
   - **GD-S2**, the per-school merit column header;
   - **LAT-13**, the per-school basis line on a school-page stat tile.

   Both must be designed in the Claude Design project before they are built (step 0b), and
   that needs the Claude Design MCP connected. **If it is not connected when `/implement`
   starts, stop and ask the user to reconnect** (`/design-login`).
2. **Defaults the user may override before `/implement`** (none blocks):
   - PD-S1: Compare `ensembles` reads "6 ensembles".
   - The four B items are attributed, not resolved.

## Source material

Four `source-material/**/*.md` files carry a
`### Re-verification 2026-11-20 (plan consistency2, re-scan)` section, appended during the
re-scan and **uncommitted** in the shared tree. Each sits under its file's single
`## Method` heading, so the ingest keeps it off the page (verified while planning):

- `source-material/summer-programs/charlotte-christian/Charlotte Christian - Summer Programs - Camp Catalog.md`: the 2026 at-a-glance PDF's week headings (CC-S1).
- `source-material/summer-programs/charlotte-country-day/CCD - Summer Programs - Camp Catalog.md`: the short-week prices from the 2026 listing (CCD-S1, CCD-S2). It also notes that the Camp Leaders page now shows Summer 2027.
- `source-material/learning-support/charlotte-country-day/Charlotte Country Day - Learning Support - Official Site Research.md`: the ERP page quotes by division (CCD-S3).
- `source-material/course-offerings/trinity-episcopal/Trinity Episcopal School - Course Offerings - Middle School Curriculum.md`: the live At a Glance strip, "16 Enrichment courses" (TRI-S1).

Two research records also hold **our own** wrong derivations, fixed in Phase 1 step 6:
- the CC Camp Catalog record, L27 "two-week break (June 29 - July 3)";
- the DD Sports Redesign Research record, L153 and L212 "8 of 13 sports are undocumented".

## Out of scope

- Standing rulings in `.claude/skills/consistency-self-scan/settled.md`: LAT-D1, GD-24,
  CAN-3, CC-R3 and CAR-R2 (S2–S6). LAT-13 and CCD-R8 were on this list and are now **in**
  scope (user, 2026-11-21).
- Anything about the Top-75 counts (LAT-S1): the 75 / 75 cap is the settled rule.
- R8 groups. Every group for every school was triaged as different facts sharing a noun.
- Optional polish the re-scan noted but did not count as a conflict: PD-R4's bare "100%"
  tile, and CCD-R1's leftover "Chamber/Honors Choir" ladder bullet label. Fold them in only
  if they are in a file already being edited.
- Deploying. `npm run deploy` is the user's call, separately.

## Steps

### Phase 1 — English

0. **Branch and commit the evidence.**
   - `git checkout main && git pull --ff-only && git checkout -b fix/consistency3`.
   - Run `git status --short` and confirm the four source-material files above are modified.
     Stage **only** those paths, plus `.claude/plans/consistency3.md`,
     `.claude/plans/consistency3-data/` and the `.claude/plans/INDEX.md` row. Never
     `git add -A`; never `git stash`. Another session may share the tree.
   - Commit: "consistency3: re-scan #2 evidence and plan".
0b. **Claude Design gate, then design GD-S2 and LAT-13.**
   - Call the Claude Design MCP's `list_projects`. If it fails or the tools are missing, **stop
     and ask the user to reconnect Claude Design** (`/design-login`), then retry. Do not go
     on to the GD-S2 or LAT-13 rows without it, and never substitute an Artifact canvas. The
     data-only rows need no design and may proceed.
   - Read [`.claude/docs/design-sync.md`](../docs/design-sync.md) and the memory notes on the
     write path (`finalize_plan` with `scope: "project"`, one file per page, `<x-dc>` editable
     format, page colours on a wrapper).
   - **GD-S2:** in `College Support Section Redesign.dc.html`, show Gaston Day's Transcript
     card with the "College merit awards" column header beside the default header.
   - **LAT-13:** in `After School Section Redesign.dc.html` (or `Shared Components.dc.html`,
     whichever holds the stat strip), show Charlotte Latin's tile with its basis line, and
     note that tiles without a `tileBasis` are unchanged.
   - Give the user the project link and say what changed. The approval is already given, so
     carry on; their review comes at the English stop.
1. **Ingest.** Run the `ingest-source-material` skill. `src/content/**` should change only
   where an appended `## Method` displaces a trailing `---` (as in consistency2). Diff it to
   confirm. If `src/data/schools.json` comes back reordered, restore the HEAD order.
2. **The 4 leftover fixes.**

   | ID | File(s) | Change |
   |---|---|---|
   | HG-17 | `summer/hickory-grove-christian.ts` ~L33; `metricValues.ts` ~L2134 (qual) and ~L2118 (comment) | "10 academic" → "9 academic" in all three. Recount: 9 + Boot Camp + 5 athletic = 15 camps; 11 + 1 + 5 = 17 sessions. |
   | PD-17 | `clubsPrograms/providence-day.ts` ~L119 | "a global network membership no other school in the state holds" → "a global network membership only one other school in the state holds". This matches the tile at ~L142 and `internationalTravel/providence-day.ts` ~L498. |
   | GD-14 | `collegeSupportPrograms/gaston-day.ts` ~L469 | "Two counselors for a graduating class of 35 — roughly 18 seniors each — …" → "Two college-counseling staff, a director and an assistant, for a graduating class of 35, with the four-year sequence starting in eighth grade rather than eleventh." This matches the tile and the Compare qual. Keep the card's ask. |
   | DD-R2 | `collegeSupportPrograms/davidson-day.ts` ~L819 | "The program runs in four countries, each with a documented start year." → "The 2026–27 profile lists four countries, each with a start year; the 2027 schedule names three." |

3. **New A fixes.** Exact wording and evidence are in the worklists' Part 2 tables.

   | ID | File(s) | Change |
   |---|---|---|
   | CC-S1 | `summer/charlotte-christian.ts` ~L29; `metricValues.ts` ~L2096 qual, ~L2069 comment | "a two-week break around July 4" → "a one-week break for July 4 (no camps June 29 – July 3)". Qual: "Six weeks, but not consecutive: there are no camps the week of June 29 – July 3." |
   | CC-S2 | `collegeSupportPrograms/charlotte-christian.ts` ~L774 | "down from 16 six years earlier" → "down from 16 in the 2021–22 profile". |
   | COV-S2 | `metricValues.ts` `advanced-arts-coursework` Covenant qual (~L1625) | "Choir Honors, Symphonic Band Honors and Honors Auditioned Theatre are the performing-side advanced courses." |
   | CAR-S1 | `sportsPrograms/carmel-christian.ts` ~L29 | "Boys' basketball, soccer, volleyball and baseball carry a JV and Middle School ladder; …". Recheck against the chips (girls' basketball V·MS, baseball V·JV·MS). |
   | PD-S1 | `artsPrograms/providence-day.ts` ~L40 tile, ~L215 teaser, ~L221 ensembles, ~L233 caveat; `metricValues.ts` `ensembles` PD value (~L1657) and qual (~L1687) | Move Jazz Ensemble to the auditioned group, citing the 2026–27 US Course of Study ("Prerequisite: Audition is required"). Tile: "6 · ensembles: 3 curricular + 3 auditioned". Teaser: "Three curricular ensembles plus auditioned groups". Drop "Whether Jazz Ensemble is formally auditioned is not published". Compare: "6 ensembles". Qual: "Three curricular ensembles (Band, Orchestra, Chorus) and three auditioned groups (Jazz Ensemble, A Cappella, The ChargHers)." Check the A Cappella and ChargHers names on the card first. |
   | CCD-S1 | `summer/charlotte-country-day.ts` ~L28 headline, ~L1027 planner sentence | "Two of the eight weeks are shortened — for Juneteenth and for July 3. Half-day camps cost $230 in both. Full-day camps cost less only in the July 3 week (Camp Buccaneer $460, Outdoor Adventure $480)." Make the planner sentence agree. |
   | CCD-S2 | `summer/charlotte-country-day.ts` the 7 half-day rows (~L342, 485, 563, 693, 758, 798, 824); `summer/cannon.ts` Baseball ~L309, Busy Bees ~L452, Music Tech ~L765 | Add the short-week price to each desc, as Golf does: CCD "$230 in the four-day weeks, $280 otherwise"; Cannon "$180 in Week 2" (Busy Bees "$196 in Week 2"). For Cannon ~L596, 648, 792 and 871, add a code comment only (per Decisions). |
   | CCD-S3 | `collegeSupportPrograms/charlotte-country-day.ts` ~L863 model, ~L938 ask | Model: "The Upper School model: four academic coaches help with subjects and with planning, organizing and focus skills (one coach across core classes in 9th grade, then Humanities or STEM)." Drop the learning-specialist sentence. Ask: "What caseload does each of the four Upper School academic coaches carry, and what are their credentials?" |
   | DD-S1 | `sportsPrograms/davidson-day.ts` ~L100 footnote | Append "…and its single 'Varsity/JV Girls Basketball' line is shown as two chips." That gives 35 − 3 + 1 = 33. |
   | DD-S2 | `sportsPrograms/davidson-day.ts` ~L504 | "…so head coaches are documented for only three of its sports: volleyball, soccer and basketball." |
   | DD-S3 | `sportsPrograms/davidson-day.ts` ~L282 | "…Furman and Wofford, a Division II signee at Charleston (WV), and a preferred walk-on …". |
   | DD-S4 | `sportsPrograms/davidson-day.ts` ~L387 | "across three sports and NASCAR" → "across three leagues (NBA, NFL and WNBA) and NASCAR". |
   | DD-S5 | `financialAidReports.ts` ~L1143, ~L1327, comment ~L1131 | "Through 2023–24 the band had six labelled options (half-day from $12,290 in 2022–23). By 2025–26 only full-time rows remained." Date the half-day price in the ~84% sentence (2022–23). Check against the card's own reduced-day table. |
   | GD-S1 | `src/data/artsProgram.ts` `TITLE_OVERRIDES` (add `gaston-day`); `src/locales/en.json` `cards.the-arts.ladder@gaston-day` | "The PS–12 Arts Ladder". English in Phase 1; the other nine catalogs in Phase 2. Run `npm run check:cardlink` and add an alias only if it asks. |
   | GD-S2 | `src/data/collegeSupport.ts` `Transcript` (+ `meritCollegeAwards?: boolean`, documented); `src/components/CollegeSupport.tsx` ~L358; `collegeSupportPrograms/gaston-day.ts` (~L404, set it true); `src/locales/en.json` `cardLabels.collegeMeritAwards` "College merit awards" | Per Decisions. `npm run schema` and `npm run check:schema` (the type changed). |
   | GD-S3 | `financialAidReports.ts` ~L2416 | "$175–$300/week" → "$140–$300/week". |
   | LAT-13 | `src/data/metricValues.ts` (the metric type + `aftercare-cost` `tileBasis: { 'charlotte-latin': 'TK/K · 5 days to 6:00 p.m. · $4,650 a semester' }`); `src/pages/SchoolDetail.tsx` ~L1383–1392 | Render `vm.tileBasis?.[slug]` through `localizeMoneyText()` on the school-page tile, as step 0b's design shows. Register `tileBasis` as prose in `scripts/i18n_fields.mjs` (`PROSE_KEYS`) so Phase 2 extracts it; confirm with `check:live` that no existing path moved. Compare is unchanged. `npm run schema && npm run check:schema`. |
   | CCD-R8 | `src/data/financialAidReports.ts` CCD `fa-merit` (~L278–307) and `sources` (~L380); CCD FA record `## Method` | First re-check the Endowment & Capital Giving page: the site's search and nav, plus likely URLs. Record what each returns under `### Re-verification <date> (plan consistency3, implement)` in `## Method` of `Charlotte Country Day - Financial Aid and Tuition - Tuition History.md`. If it is gone, delete `ladder`, `figureCaption`, `figureNote` and `figureNote2`, and the endowed-fund example sentences in the "No merit track" box. Re-open the live Tuition & Financial Aid page and Admissions FAQs, and keep a sentence, the `tag` or a box only if they support it. Drop "Endowment & Capital Giving" from the section `source` and the `sources` line. Grep `src/data` and the built CCD page for `$39,600`, `$880K` and "Endowment & Capital Giving" afterward: zero hits. If the page is found, stop and ask. |
   | HG-S1 | `artsPrograms/hickory-grove-christian.ts` ~L46 | "a Blumey nominee from The Little Mermaid" → "three Blumey nominees from The Little Mermaid". Fix the caption grammar to fit. |

4. **B and C items, plus the research records.**

   | ID | File(s) | Change |
   |---|---|---|
   | CC-S3 (B) | `metricValues.ts` `advanced-arts-coursework` CC qual (~L1631) + a code comment on the cell (~L1594) | The values stay "2 AP + 9 Honors". Qual adds: "The 2026–27 curriculum guide also lists AP Music Theory (no description) and two more Honors ensembles, Chamber Ensemble and UKnight Worship." |
   | PD-S2 (B) | `internationalTravel/providence-day.ts` ~L384 headline (body ~L388 and ~L354 stay) | "Eight partner schools in seven countries, with stays of two to four weeks; the school's Global Map logs its Bermuda exchange as two separate one-week visits." Add a code comment citing both pages. |
   | TRI-S1 (B) | `courseOfferings.ts` ~L8576 teaser | "The school's At a Glance page counts 16 enrichment courses across Lower and Middle School; its School Profile lists 6 in the Lower School and 13 in the Middle School." Add a verify flag if the division supports `flags`, else a code comment. |
   | TRI-S2 (B) | `artsPrograms/trinity-episcopal.ts` checklist / asks; `courseOfferings.ts` ~L8641 code comment | Arts ask: "Do 5th graders still take general music alongside chorus or band?" No value change on either card. |
   | COV-S1 (C) | `sportsPrograms/covenant-day.ts` ~L355 headline, ~L360 kicker | "…has coached varsity volleyball since 2003 (22 seasons through 2024)…"; kicker "Volleyball, since 2003". |
   | DD-S6 (C) | `collegeSupportPrograms/davidson-day.ts` ~L786 | "seven across four countries (the UK, Canada, Denmark and Italy)". |
   | DD-S7 (C) | `metricValues.ts` `latest-pickup` DD qual (~L1943) | "From the school's archived 2020 Extended Care page (2:45–6:00 p.m., TT–8). The program pages have since been removed and K–4 now dismisses at 3:05, so confirm current hours." The cell stays 6:00 PM. |
   | records | CC Camp Catalog.md L27; DD Sports Redesign Research.md L153, L212 | Correct our own wording to match CC-S1 and DD-S2. Each research record is ours, not a school quote. |

5. **Gate and docs.**
   - Run `node scripts/check_consistency.mjs` and `--report`; both must stay clean.
   - Re-triage R8 in the PR body.
5b. **Bring the Claude Design project in sync with the build** (after step 6's build and
   preview). Re-capture the two files step 0b changed, so they show what shipped rather than
   the mock. College Support: the file's command from `design-sync.md` plus
   `--extra gaston-day:college-support/<transcript card>`. After School: the file's command,
   plus Charlotte Latin's stat tile. If `design:capture` cannot take another school's section
   head, keep Latin's tile as its own labelled block in the file, copied from the built DOM.
   Write each file, run `npm run design:verify` on it, and update `design-sync.md`'s
   Inventory, Results and the capture commands with the new `--sha`.
6. **Verify** (Phase 1 checklist below). Commit to the branch.
6b. **Adversarial review** (`/implement` step 5b; brief:
   `.claude/skills/consistency-self-scan/review.md`). One fresh agent gets this plan, the
   worklists in `consistency3-data/`, `git diff main...fix/consistency3` and fresh page dumps,
   and tries to prove the work wrong. Verify each finding, fix the real ones on the branch,
   record found / fixed / rejected in `## Implementation notes`. Then set the plan status to
   `english-done` and the INDEX row to *English shipped*, with the review counts in the
   hand-back.

**→ STOP. `/implement` ends its turn here and waits for the user's review of the English.**

### Phase 2 — Every other locale

Research prose via the overlay layer for every locale in `PROSE_TRANSLATED`
(`src/lib/i18n.ts`: es, bn, ht, te, fr, fa, it, hi, ar). **Chrome:** two new keys,
`cards.the-arts.ladder@gaston-day` and `cardLabels.collegeMeritAwards`, go into all ten
catalogs in `TRANSLATED` (`src/locales/{en,es,bn,ht,te,fr,fa,it,hi,ar}.json`).

1. **Extract and splice.** Run `scripts/i18n_extract.mjs` per locale, then
   `scripts/i18n_splice_work.mjs`, joining by stamp. Never pop on apply, because stamps
   recur across topics. Run a by-stamp audit that no kept `t` changed. Report kept, added
   and dropped counts.
1b. **Removed units (CCD-R8).** The deleted ladder details, figure notes and box sentences
   drop out of the extract. Confirm the splice reports them as dropped, and that the shortened
   box body and both source lines are re-translated as minimal edits in step 3. LAT-13's
   `tileBasis` is one new unit per locale; keep "TK/K" and "$4,650" as figures.
2. **Carry over figure-only edits** by token substitution, asserting one replacement per
   locale: HG-17 "10" → "9", GD-S3 "$175" → "$140", and the PD Compare "4 ensembles" →
   "6 ensembles".
3. **Translate the changed sentences** as minimal edits of the reviewed `t`. Run one agent per
   locale in a private directory, then validate centrally: digits, markdown, native digits
   and isolates, script share, length ratio.
4. **Chrome keys** in the nine non-English catalogs. "PS–12" keeps its grade codes as the
   other `@slug` ladder titles do.
5. **Build the overlays**, run the Phase 2 checks, then open the PR with `--body-file` and
   merge with `gh pr merge --squash --delete-branch`. Pull `main`, flip the INDEX row to
   *Implemented* with the PR link, and write `## Implementation notes`. **Do not deploy.**
6. **Rescan** (`/implement` step 10). With `main` pulled, run `/consistency-self-scan`. It
   runs in RESCAN mode against this round. If it is clean, say so and stop. If not, it
   recommends `consistency4` and asks the user whether to plan it now or hold off.

## Files touched

| File | Change |
|---|---|
| `src/data/metricValues.ts` | HG-17, CC-S1, CC-S3, COV-S2, PD-S1, DD-S7, LAT-13 `tileBasis` |
| `src/data/collegeSupportPrograms/{gaston-day,davidson-day,charlotte-christian,charlotte-country-day}.ts` | GD-14, GD-S2 flag, DD-R2, DD-S6, CC-S2, CCD-S3 |
| `src/data/collegeSupport.ts`, `src/components/CollegeSupport.tsx` | GD-S2 `meritCollegeAwards` |
| `src/data/artsProgram.ts`, `src/locales/*.json` | GD-S1 title override; `cardLabels.collegeMeritAwards` |
| `src/data/summer/{hickory-grove-christian,charlotte-christian,charlotte-country-day,cannon}.ts` | HG-17, CC-S1, CCD-S1, CCD-S2 |
| `src/data/clubsPrograms/providence-day.ts` | PD-17 |
| `src/data/sportsPrograms/{davidson-day,carmel-christian,covenant-day}.ts` | DD-S1–S4, CAR-S1, COV-S1 |
| `src/data/artsPrograms/{providence-day,hickory-grove-christian,trinity-episcopal}.ts` | PD-S1, HG-S1, TRI-S2 |
| `src/data/internationalTravel/providence-day.ts` | PD-S2 |
| `src/data/financialAidReports.ts` | DD-S5, GD-S3, CCD-R8 |
| `src/pages/SchoolDetail.tsx`, `scripts/i18n_fields.mjs` | LAT-13 basis line; `tileBasis` is prose |
| `source-material/financial-aid-tuition/charlotte-country-day/…Tuition History.md` | CCD-R8 re-verification under `## Method` |
| Claude Design project; `.claude/docs/design-sync.md` | GD-S2 and LAT-13 designed (0b), re-captured as built (5b) |
| `src/data/courseOfferings.ts` | TRI-S1, TRI-S2 comment |
| `source-material/.../CC Camp Catalog.md`, `.../DD Sports Redesign Research 2026.md` | our wording fixed |
| `.claude/docs/DATA-SCHEMA.md` | regenerate (`npm run schema`) |
| `src/data/overlays/**` | Phase 2 |

## Verification

### Phase 1 — English

- [ ] `node scripts/check_consistency.mjs` exits 0 after the fixes.
- [ ] `npx tsc -b` is clean; `npm run schema && npm run check:schema`; `npm run build`
      succeeds up to the expected English-first stop at `check:live`. Run each later gate on
      its own: `check:chrome` (two keys awaiting translation, exit 0), `check:runtime`,
      `check:moneytext`, `check:dates`, `check:cardlink`.
- [ ] Run the plain-language hook by hand over every file a script edited:
      `node scripts/check_plain_language.mjs --hook`.
- [ ] Rebuild and re-dump with
      `python3 -I .claude/plans/consistency-data/dump_pages.py dist/school <out>`. Tick every
      ID in this plan against the new dump.
- [ ] `npm run design:verify` passes for every Claude Design file step 5b wrote.
- [ ] `npx vite preview`, then `npm run audit:mobile`, `npm run audit:moneyrender` and
      `npm run audit:daterender` (default branch scope).
- [ ] Browser checks (real Chrome):
  - Gaston Day College Support, the merit table header, and the Arts card title and its
    old `#the-arts/the-tk-12-arts-ladder` link;
  - Charlotte Latin After School: the tile's basis line, matching the Claude Design file, at
    320px too; Providence Day's After School tiles unchanged;
  - Country Day Financial Aid › Merit & Scholarships: no ladder, no empty figure space,
    Show sources without Endowment & Capital Giving;
  - PD Arts tile and Music board;
  - Compare › The Arts (PD "6 ensembles");
  - CCD Summer short-week rows;
  - DD Sports Offered footnote against the chips.

### Phase 2 — Locales

- [ ] `npm run check:live`, `npm run check:runtime`, `npm run check:chrome` (no key awaiting
      translation) — clean.
- [ ] `npm run check:digits`, `npm run check:sepdrift -- --lang <code>` for each locale,
      `npm run check:dates`, `npm run check:moneytext` — no new findings.
- [ ] `python3 scripts/check_figures.py --topic <topic> --lang <code>` for each touched topic.
- [ ] `npm run build` passes end to end.
- [ ] Browser spot check: in `fa`/`ar`, "June 29 – July 3" and "$140–$300" read
      left-to-right; in `hi`/`te`, "$12,290" grouping. Check the Gaston Day header in `es`.

## Risks

| Risk | Mitigation |
|---|---|
| Adding `meritCollegeAwards` shifts an overlay path | A boolean is not extracted; check:live confirms no path moved |
| Claude Design is disconnected or closes (standalone closes 2026-12-14) | Step 0b stops and asks the user to reconnect; GD-S2 and LAT-13 wait, the data-only fixes need no design |
| A dead page's figure survives in a second place | Step 3's CCD-R8 grep of `src/data` and the built page must return zero |
| The shared tree has another session's files | Stage explicit paths; `git status --short` before every commit |
| A desc price edit trips `check:moneytext` (punctuation after a figure) | Run it after step 5, not only in the build |

## Open questions

- **PD-S1 Compare value:** "6 ensembles" (default) vs "3 ensembles" curricular-only.
- **TRI-S2:** whether Trinity 5th graders keep general music. Default: ask, no value change.

## Implementation notes

### Phase 1 (2026-11-22, branch `fix/consistency3`, commit `229961c8`)

- **CCD-R8 is held, not built.** Step 3's precondition failed: the Endowment & Capital Giving
  page is **live** at https://www.charlottecountryday.org/about/support/endowment-capital
  (HTTP 200). Re-scan #1's four guessed slugs never tried `endowment-capital`. It is linked
  from /about/support and from the Tuition & FA page's "Review a full list of scholarship
  offerings". The four gift levels, "$39,600" and "+6,000 annually" match the ladder word
  for word. Per the plan ("If the page is found, stop and ask"), nothing was deleted. The
  evidence is under `### Re-verification 2026-11-22` in the CCD Tuition History record.
  **User ruling, 2026-11-22: keep the ladder and cite the live page.** The section `source`
  and the report `sources` line now carry the URL ("retrieved 22 Nov 2026"), and the ruling
  is settled as **S7** in `.claude/skills/consistency-self-scan/settled.md`, so a rescan does
  not re-raise it. **Phase 2 step 1b therefore changes:** no units are removed. The two
  edited source lines are re-translated as minimal edits instead.
- **LAT-13 `tileBasis` is registered in `PATH_OVERRIDES`, not `PROSE_KEYS`.** Its leaf key
  is the school slug, so a `PROSE_KEYS` entry would never match. It follows `subs`, with
  one `['tileBasis.<slug>', true]` per high school.
- **Cannon CCD-S2 descs follow Cannon's own price style** ("$180.00 in the four-day Week 2
  and $225.00 otherwise", as its Golf row does), not the plan's bare "$180 in Week 2".
  Country Day rows use the plan's "$230 in the four-day weeks, $280 otherwise".
- **Plain-language rewrites** (the hook, run by hand, flagged sentences over 30 words that
  this plan's edits touched). DD-S3 became three sentences ("Basketball leads with seven
  commits. Five signed with … and one with Division II Charleston (WV). The seventh is a
  preferred walk-on …"). DD-S1's appended clause became its own sentence. The COV-S2 qual
  became "… On the performing side, the advanced courses are Choir Honors, Symphonic Band
  Honors and Honors Auditioned Theatre." The CC-S3 qual now opens "The school’s 2026–27
  profile lists two AP arts courses … It also lists nine Honors Fine Arts courses: …".
- **CCD-S3:** the label already reads "The Upper School model", so the text opens "**Four
  academic coaches** help …" rather than repeating the label.
- **DD-S6** reads "seven across four countries, the UK, Canada, Denmark and Italy (UCL, …)".
  The school list stays in the parentheses.
- **TRI-S1 / TRI-S2:** Course Offerings has no `flags` field, so both B items carry a code
  comment. The Arts visit checklist gained the plan's ask.
- **CAR-S1** was checked against the chips: boys' basketball, both soccers, volleyball and
  baseball are V·JV·MS, and girls' basketball is V·MS.
- **GD-S1:** `check:cardlink` asked only for a snapshot update, not an alias. The topic-scoped
  alias already resolves the old link, as confirmed in Chrome.
- **Design (0b and 5b).** Both mocks were captured from the pre-change build. Each proposed
  element was patched in with a dashed outline and a labelled block, then written and
  `design:verify`'d before the build. In 5b both files were re-captured from `229961c8`. Latin's
  stat strip is a labelled block copied from the built DOM, because `--extra` takes cards by
  id and a stat strip has none.
- **Ingest:** `schools.json` came back reordered and was restored to HEAD order (no content
  change). 121 notes whose only change was the "Rebuilt" date were restored.

### Adversarial review (step 6b, 2026-11-22): 5 found, 5 fixed (one in part)

One fresh agent got the plan, the worklists, `git diff main...fix/consistency3` and the page
dump, and nothing else.

1. **PD-S1, second card. Fixed in part.** The honors ladder's "Audition up" step named only
   A Cappella and the ChargHers. It now opens "Jazz Ensemble requires an audition." The
   reviewer also asked to drop "band/jazz" from step 01. **Rejected:** step 01 lists the
   concert cycles each semester, not how a student joins an ensemble, so the jazz concert
   stays.
2. **GD-14, second card. Fixed.** Whole Class Analytics still asserted "~18 seniors per
   counselor", which the card's own ask questions. It now reads "With 35 seniors and two
   college-counseling staff, …", matching the GD-14 headline.
3. **DD-S3, second card. Fixed.** The reality check's "seven college signees" now reads
   "seven college commitments", because one of the seven is a preferred walk-on.
4. **CCD-R8 docs. Fixed.** The Goal, the Decisions and the INDEX row said the ladder was
   removed. All three now record that the page is live and the ladder kept (S7).
5. **CCD-R8 uncommitted, rendering unchecked. Fixed.** The source-line edits, S7,
   `design-sync.md` and these notes were committed; the site was rebuilt and re-dumped, and
   the Show sources line was checked.

Every other ID was confirmed as decided, including the recounts, the short-week prices
against the evidence, the design-file match and the collateral check.

### Second pass on the fixes (2026-11-22, the capped loop from #515): 2 found, 2 fixed, loop closed

One more fresh agent reviewed only `git diff 229961c8..0ff53627` against the first pass's
findings, with their resolutions. It confirmed all five first-pass fixes and found:

1. **GD-14, a third card. Fixed.** The Verdict's "the ~18:1 senior caseload is unusually low"
   stated the computed ratio as fact, five lines above the ask that questions it. It now
   reads "two college-counseling staff for 35 seniors is an unusually small caseload."
2. **CCD-R8 source wording. Fixed.** "re-checked 22 Nov 2026" described our own research
   step on a parent-facing line. Both lines now say "retrieved 22 Nov 2026", like every
   other source line in the report. The re-check stays in the code comment and the
   `## Method` record.

That was the second pass, so per the cap the review loop ends here. Nothing is left open.
