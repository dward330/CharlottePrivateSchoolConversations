---
name: charlotteprep
title: Add Charlotte Preparatory School — the first PreK–8 school, with deep research across eight research areas
status: abandoned
phases: 2
created: 2026-09-16
branch: feat/charlotte-prep  # built, then deleted 2026-09-16
prs: []
---

# Add Charlotte Preparatory School

## Goal

Add **Charlotte Preparatory School** (charlotteprep.org, PreK–8, ~440 students, slug
`charlotte-prep`) as the app's twelfth school and the first to occupy the PreK–8 shape.
This plan **performs the deep research** — the assessment's figures came from a deliberately
shallow sweep and several areas have named, unexploited leads.

Success: a dossier page with **eight research areas**, no College Support section, no Summer
Programs section, no Compare button anywhere, and every figure traceable to a committed
`source-material/` file.

## Context

**This plan depends on [`prek8shape`](prek8shape.md) being merged first.** That plan creates
the High School Placement area, the `hasHighSchool` flag and the Compare exclusion. Building
this one first would mean writing research for a card registry that does not exist. Check the
index: if `prek8shape` is not *Implemented*, stop and say so.

**The two source documents are authoritative and already written.** Read both before starting:

- [`.claude/docs/prek8-shape-assessment.md`](../docs/prek8-shape-assessment.md) — the
  decisions, the verified data (§7), and the full source-URL list (§8)
- [`.claude/docs/prek8-placement-design-brief.md`](../docs/prek8-placement-design-brief.md) —
  the design brief for the new area

**⚠️ Two identity traps that will silently corrupt this research.** Both are documented in
assessment §1 and both are easy to fall into:

1. **`charlotteprepfl.com` is a different school** — Port Charlotte, *Florida*. It ranks
   alongside the real school on nearly every query and has its own tuition, admissions and aid
   pages. **Every figure must come from `charlotteprep.org`.**
2. **Search will say the Head of School is "N. Blair Fisher." That is STALE.** Fisher left for
   St. Paul's Episcopal (Mobile AL), then Fayetteville Academy. An archived head-of-school
   search PDF on the site reinforces the wrong name. The current head is **Todd Ballaban**.

**The site's own search is broken** — `/search?s=` returns "no records found" for terms that
demonstrably exist. **Never use it as evidence of absence.** The reliable inventory is the
Finalsite `sitemap.xml`, which is a *sitemapindex* pointing at a gzipped child at
`/cache/sitemap.xml.gz`; decompressing it yields the complete **176-URL inventory** (64 pages
+ 112 news stories). That is what converts "I didn't find it" into a confirmed null.

**The news stories are the real source.** The static marketing pages are thin; 112 of the 176
URLs are news stories, and that is where the placement outcomes, club activity, arts
productions and athletics results actually live.

## Decisions

- **Eight research areas** — the nine existing, minus College Support (§3.1: not offered to
  schools with no high school), minus Summer Programs (§3.3: discontinued, evidenced), plus
  High School Placement.
- **Omission is absence, never a conditional.** A topic with no `source-material/` folder does
  not render. Create **no** `source-material/college-support/charlotte-prep/` and **no**
  `source-material/summer-programs/charlotte-prep/` — that is the entire mechanism.
- **A zero-item card is omitted entirely**, never shipped as an empty shell with a
  not-published note. The scope note moves to a sibling card.
- **Mirror the RICHEST schools' card structure** — Providence Day, Charlotte Latin, Cannon —
  never the most recently added school. Reaching for the freshest example silently caps a new
  school at a thin school's depth.
- **No `metricValues.ts` entries at all.** Charlotte Prep is Compare-excluded, so it needs
  neither 14 nulls nor 30. `check:metrics` was taught this in `prek8shape` step 10.
- **The six college-bound Sports prose cards are omitted by not writing them** — no code
  change. `matriculation`, `power-4`, `pros`, `recruiting`, `nil`, `national-profile` have no
  referent at a middle school.
- **Welcome video:** `https://www.youtube.com/watch?v=nfND7dh96Nw` (user-supplied 2026-09-15).
- **Two phases** — this adds ~8 areas of research prose, the largest translation surface of any
  recent plan.

## Approvals needed

**None outstanding.** Adding a school needs no UX approval (§6 of the schema doc — it is
automatic everywhere), and the PreK–8 shape was approved 2026-09-15. **If research turns up
material that fits no existing card**, that is a new card and DOES need approval — surface it
to the user and land the rest meanwhile rather than implementing it pre-emptively.

## Source material

**Nothing has been fetched yet.** This plan's research step writes all of it. Every file goes
to `source-material/<topic>/charlotte-prep/Charlotte Prep - <Topic> - <Subtopic>.md` with a
provenance header (who/when/how), the **source URLs**, and the record-level detail behind every
figure. Assessment §8 holds the full starting URL list.

**Do not re-OCR** `fall-2025-admissions-packet-web.pdf` (9.1 MB, image-scanned, older cycle) —
the live application page plus the CAIS PDF supersede it.

## Out of scope

- **Any change to the PreK–8 shape itself** — that is `prek8shape`. If this plan needs a shape
  change, that is a finding to report, not a fix to make here.
- **College Support and Summer Programs** — deliberately absent, not deferred.
- **`metricValues.ts` / Compare rows** — Charlotte Prep has no Compare surface.
- **Latest News** — adding this school's news feed is the separate `add-school-news` skill; it
  needs a Cloudflare credential from the user.

## Steps

### Phase 1 — English

1. **Verify the prerequisite.** Confirm `prek8shape` is *Implemented* in
   [`INDEX.md`](INDEX.md) and that `src/data/highSchoolPlacement.ts` exists. If not, stop.

2. **Pull the full URL inventory.** Fetch `charlotteprep.org/sitemap.xml`, follow the
   sitemapindex to `/cache/sitemap.xml.gz`, decompress, and keep the 176-URL list as the
   research map. Everything below is scoped against it; a URL absent from it does not exist.

3. **Deep research — the four areas with named, unexploited leads.** These are where the
   assessment's shallow sweep left real headroom. A deep pass that finds nothing is a
   **useful** result: it converts a *not-found* into a confirmed `null`. Report it, never
   soften it.

   - **Financial Aid (~67%)** — % receiving aid, total awarded and average award are all
     unpublished on-site. **The lead is Form 990 Schedule I / Part IX**, EIN **45-2588411**
     (ProPublica: `https://projects.propublica.org/nonprofits/organizations/452588411`;
     FY June 2025 revenue $15,824,777, expenses $11,260,242, assets $34,396,041). Aid is
     **K–8 only** — *not* offered for the Montessori Early School. Platform **Clarity**,
     deadline **January 15**.
   - **Sports (~47%, or ~69% scored on what a PreK–8 school could hold)** — the **QCC**
     conference is used unexpanded everywhere; its expansion and member list are unpublished.
     Try the conference and state middle-school athletics sources. Known: 7 sports, 11 teams
     grades 5–8, 80%+ MS participation, 18 conference/tournament titles, AD **Renee Suttles**,
     volleyball head coach **Mandi Mohammed**. **No athletic facility is named anywhere** —
     verify, then record as a confirmed null.
   - **Student Clubs (~63%)** — no clubs list exists; the ~10 known items were recovered
     piecemeal. **Systematically read the 112 news stories.** Known: Model UN (CHARMUN, 20
     delegates, founded 2020), Set Design, Stage Crew, D&D, Chess, **BUDEE**, **Joy Term**,
     After School Studios (14 named), Science Fair, High School Fair. Confirmed absent: honor
     society, yearbook, student newspaper.
   - **High School Placement (~80%, the softest figure)** — it was scored against cards that
     did not exist. Now they do. Re-score against the four real card keys. Primary sources:
     `/student-life/beyond-charlotte-prep` (the placement list),
     `/academics/middle-school/high-school-admissions-process`, and
     `/academics/middle-school/college-destinations` *(slug says college — content is HIGH
     SCHOOL)*, plus the per-class destination stories.

4. **Deep research — the four remaining areas.** Admissions (~100%, verified against the CAIS
   2027-28 brochure), After School (~100%, verified firsthand), The Arts (~64%), Course
   Offerings (~50%). Assessment §7 holds verified values for each; re-confirm rather than
   trusting the transcription, and extend where the news stories allow.

5. **Persist everything to `source-material/`.** Per the data-provenance standard: one `.md`
   per topic/subtopic, provenance header, source URLs, record-level detail. These are committed
   (the `.gitignore` exempts `source-material/**/*.md`).

6. **Report the re-scored coverage before building.** Print a per-area table: cards filled /
   cards possible, **with counts beside every percentage** — one item swings Sports ~4 points
   and Course Offerings 25. If an area landed materially below the assessment's estimate, say
   so and ask before building it thin.

7. **Run the ingest pipeline.** Use the `ingest-source-material` skill — it regenerates
   `.claude/docs/` notes and `src/data/schools.json`, then covers the hand-maintained layers.
   Do not hand-edit generated files.

8. **Add the hand-maintained school record.** A `charlotte-prep` entry in
   [`src/data/brands.ts`](../../src/data/brands.ts) with city and a **contrast-checked** brand
   color: it fills `.badge` behind white text *and* renders as a text color on light surfaces,
   so verify ≥4.5:1 white-on-badge and check it is not a near-twin of an existing school's hue
   (see the `charlotte-catholic` entry's comment for the standard this is held to). Set
   `hasHighSchool: false` wherever `prek8shape` put that flag.

9. **Write the structured card data.** Per-school files in the `*Programs/` directories for
   each area that has one — including `highSchoolPlacementPrograms/charlotte-prep.ts`, built
   from the design. **Omit any optional field with no data; omit any card that would list zero
   items.**

10. **Add the welcome video** — `https://www.youtube.com/watch?v=nfND7dh96Nw`, wired the way
    existing schools' videos are.

11. **Add the English chrome keys**, if the school needs any school-scoped ones. A school-scoped
    card title with no locale key renders English in every locale and `check:chrome` cannot see
    it — register any `TITLE_OVERRIDES` key in all catalogs.

12. **Regenerate the schema doc** — `npm run schema`, then `npm run check:schema`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** They will read
the English dossier and may find bugs; fix those before Phase 2. **Every bug found and fixed
at this review triggers a schema-doc check** — a rule discovered through a review bug protects
future schools only if it lands in `gen_data_schema.mjs`. If no doc update is needed, say so
explicitly rather than silently skipping it.

### Phase 2 — Every other locale

Only after that confirmation. Scope is **research prose** — the overlay layer per
`PROSE_TRANSLATED`, not the `src/locales/*.json` catalogs (those are only touched if step 11
added keys). This is the larger of the two mechanisms; see
[`prose-translation-architecture.md`](../docs/prose-translation-architecture.md) for it, and
[`prose-translation-bn.md`](../docs/prose-translation-bn.md) as the worked non-Latin example.

1. **Extract, translate and build the overlay for all nine prose locales.** The extractor has
   **no carry-over branch** — extract to a throwaway lang and merge by English text, asserting
   zero dropped, rather than re-extracting over shipped translations.
2. **Figures are copied char-for-char and never re-typed.** Run `npm run check:figures` and
   `npm run check:sepdrift -- --lang <code>` for every locale: the figure sweep normalises
   separators and cannot see a `20,642` → `20.642` swap on its own.
3. **Units are never converted.** `53,000 sq ft` stays `53,000 sq ft` in every locale.
4. **Check the lakh/crore locales** (`hi`, `te`) and the **RTL locales** (`fa`, `ar`) per their
   rollout docs.
5. **Browser print-out on the new school**, with every `<details>` **forced open** — a print-out
   of collapsed teasers reads clean while showing none of the part that breaks.

## Files touched

| File | Change |
|---|---|
| `source-material/<8 topics>/charlotte-prep/*.md` | new — the research record, committed |
| `.claude/docs/*` | regenerated by ingest |
| `src/data/schools.json` | regenerated by ingest — adds the school |
| `src/data/brands.ts` | edit — `charlotte-prep` entry, contrast-checked |
| `src/data/*Programs/charlotte-prep.ts` | new — structured cards per area |
| `src/data/highSchoolPlacementPrograms/charlotte-prep.ts` | new — the four placement cards |
| `src/data/overlays/**` | Phase 2 — nine prose locales |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` clean **and** `npm run build` green — read the build's exit code
- [ ] `npm run check:metrics` — clean; Charlotte Prep skipped from `metricValues` with the note
- [ ] `npm run check:schema` — doc lists the school and its eight areas
- [ ] `npm run check:seo` — the new page pre-renders above the 20 KB floor and has its own
      `<title>`, description, canonical and sitemap entry
- [ ] `npm run coverage:floor` — run it and **report** the new school's figures; the ≥17/30
      Compare bar does **not** apply to a Compare-excluded school
- [ ] **Browser check.** The dossier shows **eight** areas; **no** College Support section;
      **no** Summer Programs section; **no** Compare button anywhere; the school is **absent**
      from the Compare picker, columns and counts; it **does** appear in other schools' "More
      schools" row. Use `domcontentloaded`, not `networkidle`.
- [ ] **No existing school page changed** — diff the eleven other `dist/school/*/index.html`

### Phase 2 — Locales

- [ ] `npm run check:runtime` and `npm run check:live` — every overlay stamp resolves
- [ ] `npm run check:figures` and `npm run check:sepdrift -- --lang <code>` per locale
- [ ] `npm run check:money`, `npm run check:currency`, `npm run check:chrome`
- [ ] Browser print-out, panels forced open, on Charlotte Prep in at least one RTL and one
      lakh/crore locale

## Risks

| Risk | Mitigation |
|---|---|
| **Florida school's data contaminates a figure** | Every fetch is `charlotteprep.org`; record the URL in the source file so a wrong-domain figure is traceable |
| **Stale head of school ships as fact** | Todd Ballaban, not N. Blair Fisher; the archived search PDF actively reinforces the wrong name |
| Broken site search read as evidence of absence | Use the decompressed 176-URL sitemap as the inventory; never `/search?s=` |
| An area lands far below its estimate and ships thin | Step 6 reports coverage **before** building and asks |
| A zero-item card ships as an empty shell | Standing rule: omit the card entirely, move the scope note to a sibling |
| Mirroring the newest school caps depth | Mirror Providence Day / Charlotte Latin / Cannon |
| Two cycle years confused | Tuition is **2026-2027**; admissions dates are the **2027-2028** cycle. Both are correct — label them separately |

## Open questions

- **Do the three missing aid figures exist in the Form 990?** — **default:** if Schedule I /
  Part IX does not carry them, record a confirmed `null` and omit the field. Do not estimate.
- **Does the QCC expansion/member list exist anywhere?** — **default:** ship `QCC` unexpanded,
  as the school does, and record the expansion as not published.
- **Does research surface material fitting no existing card?** — **default:** land everything
  else, surface the suggestion to the user, and do **not** build the new card without approval.

---

## ABANDONED 2026-09-16 — the user rejected the rendered data gaps

**Charlotte Preparatory School is NOT in the app, and this plan is not to be re-run
as written.** Phase 1 (English) was fully built, verified and pushed to
`feat/charlotte-prep`; the user reviewed the rendered dossier and rejected it —
*"I didn't like how the data gaps came out"* — and asked for the entry to be deleted.
The branch was deleted locally and on the remote, **nothing was ever merged to
`main`**, and the site was never deployed with the school. Phase 2 (the nine prose
locales) never ran.

### What "the data gaps came out badly" refers to

The school cleared the coverage gate on paper — 8 of 10 research areas, 21/28
consensus prose cards, ~75% — but that gate measures *which cards have data*, not
*how the page reads once the absences are rendered*. What shipped had:

- **Sports at 3 of 7 cards.** No athletic facility is named anywhere across the
  school's 176-URL site, no win-loss records, no sports medicine, no individual
  awards. Four omitted cards reads as a thin area even though the three remaining
  ones were genuinely rich.
- **Not-published notes carrying real weight in every area** — the placement team is
  never named, the QCC conference is never expanded, no clubs list exists, no
  curriculum guide exists, no studio fee is ever quantified.
- **No Compare surface at all**, by design: no Compare row, no `VALUE_METRICS` stat
  tile, and therefore no comparison to any peer anywhere on the page.

None of this was a research shortfall. Every gap was converted to a confirmed null
against the full site inventory, which is exactly what this plan asked for. It is a
judgment that a PreK-8 school with this publication footprint does not make a dossier
worth shipping — and **that judgment is the durable finding.**

### The lesson, if a PreK-8 school is ever reconsidered

Not "research harder". The point is that **`/add-school`'s coverage percentages did
not predict how the page would read**: a card counts as covered when it has data, and
that says nothing about how many not-published notes end up sitting beside it. A
future assessment should look at a *rendered* page before committing to the work,
which is the same reason this project already insists on a browser check rather than
trusting green checkers.

### What survived, and what did not

**Kept** — re-applied on `fix/roster-assumptions`, because all four are independent
of this school and two are bugs on `main` today:

1. `src/lib/head.ts` — every school's meta description counted the SITE's research
   areas, so Charlotte Catholic and Davidson Day claimed 9 while holding 7, Cannon 9
   while holding 8.
2. `build_docs.py` — a full ingest would have added an unapproved **News research
   area to ten existing school pages**; `news` now joins `branding` in
   `INTERNAL_TOPICS`.
3. `coverage_floor.mjs` — a Compare-excluded school became "thinnest shipped" and the
   printed `/add-school` bar read **0/30**, i.e. no bar at all.
4. `seo_routes.mjs` — the Compare canonical, hreflang alternates and sitemap named a
   school Compare will never draw a column for.

**Discarded** — the eight `source-material/` research files, the manifest and content
entries, the `brands.ts` entry, and all sixteen structured cards across six
registries. The research is recoverable from the deleted branch via reflog if it is
ever wanted; it is deliberately not kept in the tree.

**Left in place on `main`**, at the user's direction — the **High School Placement**
research area from PR #308. It is inert with an empty registry (every existing school
page is byte-identical, which was that PR's own verification) and stays ready for a
future PreK-8 school with no further work.

### Research findings worth keeping, if anyone revisits this school

- **Form 990 Schedule I** gives the aid figures the school does not publish:
  **FY2023 $368,575 to 47 recipients**, **FY2022 $363,160 to 48**. The retrieval path
  is non-obvious — ProPublica's PDFs 403, the S3 XML bucket is retired, and the IRS
  bulk `TEOS_XML` zips are what works (note the case: `05A`, not `05a`).
- **`/academics/middle-school/college-destinations` genuinely IS colleges** (~90
  institutions). The assessment doc records the opposite; it is wrong.
- **The assessment's 990 financials are wrong** — it cites an FY2025 filing that does
  not exist; the latest return is FY2023 at $9,564,533 revenue.
- **The QCC conference expansion is published nowhere**, on or off the school's site.
- **Destinations are 60 in four categories** (14/15/17/14), not the brief's "50+", and
  **10 of 14** Charlotte-area independents have a dossier here, not 12.
