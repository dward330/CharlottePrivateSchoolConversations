---
name: compare-no-hsp
title: Remove High School Placement from the Compare page (topic pill, deep link, and the home "What you can compare" cell)
status: in-progress
phases: 1
created: 2026-10-05
branch: feat/compare-no-hsp
prs: []
---

# Remove High School Placement from the Compare page

## Goal

The Compare page shows a **High School Placement** topic pill. Selecting it gives a table
with nothing in it: the only school that has High School Placement research is Trinity
Episcopal, a PreK–8 school, and PreK–8 schools are excluded from Compare entirely. This
plan removes the topic from every route into Compare.

It worked when:

- `/compare/` shows **9 topic pills, not 10**, and none of them is High School Placement.
- `/compare/?topic=high-school-placement` falls back to College Support instead of
  rendering the dead table.
- The home page's **"What you can compare"** grid has no High School Placement cell.
- School dossiers are unchanged. Trinity Episcopal still shows its High School Placement
  section, and no school page changes its section order.

## Context

Everything below was read during planning. Every path and name was confirmed to exist.

### Why the pill exists at all

PR #308 (plan [`prek8shape.md`](prek8shape.md)) added the `high-school-placement` research
area and excluded PreK–8 schools from Compare through `comparableSchools`
([`src/lib/manifest.ts:49`](../../src/lib/manifest.ts#L49)). That plan says "Compare rows
for High School Placement — the area has no Compare surface by design" (prek8shape.md
line ~137). It filtered the Compare **schools**, but it never filtered the Compare
**topics**, so the pill was left behind.

The data proves the table is always empty. In `src/data/schools.json` the
`high-school-placement` topic has exactly one matrix row: `trinity-episcopal: 3 docs`.
Trinity has `hasHighSchool: false` ([`src/data/brands.ts:235`](../../src/data/brands.ts#L235)),
so it never appears as a Compare column. `metricValues.ts` has no rows for the topic, and
no K-12 school has HSP research. Every column of the HSP Compare table reads "n/a".

The manifest has 10 topics: `admissions after-school college-support course-offerings
financial-aid-tuition high-school-placement sports student-clubs summer-programs the-arts`.

### The three Compare entry points

1. **Compare's own pill row:** [`src/pages/Compare.tsx`](../../src/pages/Compare.tsx).
   - Line ~16: imports `topics` and `topicBySlug` from `../lib/manifest.ts`.
   - Lines ~208–211: the default/active topic:
     ```ts
     const defaultTopic = topicBySlug(COMPARE_DEFAULT_TOPIC)
       ? COMPARE_DEFAULT_TOPIC
       : topics[0]?.slug ?? null
     const activeTopic = topic && topicBySlug(topic) ? topic : defaultTopic
     ```
     Any manifest topic is accepted from `?topic=`, which is why the HSP deep link renders.
   - Lines ~239–242: `compareTopics` = `topics` with College Support moved first. This
     drives the pills (line ~260).
2. **Home topic grid:** [`src/pages/Home.tsx:29-33`](../../src/pages/Home.tsx#L29-L33).
   `homeTopics` is built from `topics`. Every cell links `toCompare(topic.slug, …)` and
   says "Compare all →" under the heading "What you can compare" (`home.topicsHeading` /
   `home.compareAll` in `src/locales/en.json`). That makes it a Compare entry point too.
   Today its HSP cell opens the empty table.
3. **Per-topic "Compare on …" button on a school page:**
   [`src/pages/SchoolDetail.tsx:987`](../../src/pages/SchoolDetail.tsx#L987). It is gated
   on `comparable = hasHighSchool(slug)` (line ~546), so Trinity never shows it. A K-12
   school never has an HSP section, because the topic only renders when the school has
   documents for it. This entry point **already never links to HSP** and needs no change.

### Not affected

- `topics` itself feeds school dossiers, `projectStats()` (the home lede's
  "{{topics}} areas" count and the topics stat tile), `head.ts` meta descriptions
  (`topicList(3)`), and the SEO surface. **None of these change.** HSP is a real research
  area. It just has nothing to compare.
- `scripts/seo_routes.mjs` pre-renders only `/compare/?topic=${COMPARE_DEFAULT_TOPIC}&schools=…`
  (College Support). It has no per-topic Compare routes and no sitemap change.
- `src/lib/head.ts:171-190` echoes `route.topic` into the canonical. A hand-typed
  `?topic=high-school-placement` URL will still carry that topic in its canonical even
  though the page renders College Support. That URL is in no sitemap and no link, so it is
  left alone (see Out of scope).

### The nearest pattern

`comparableSchools` in `manifest.ts` is the model: one derived, documented export that
every Compare consumer reads, so the consumers cannot drift apart. Its docstring says
"DERIVE FROM THIS, never from `schools`, anywhere Compare is the subject". The new topic
list follows the same shape.

## Decisions

- **Derive the list; don't hardcode the slug.** Add
  `comparableTopics = topics.filter((t) => comparableSchools.some((s) => docCount(t.slug, s.slug) > 0))`
  to `manifest.ts`. A topic belongs on Compare only if at least one Compare column could
  hold research for it. That is the standing *absence, not a conditional* rule, and it means
  a second PreK–8-only area would drop off with no code change. Today it removes exactly
  `high-school-placement`; Step 4 asserts that.
- **Also drop the home grid cell.** The grid is headed "What you can compare" and every
  cell says "Compare all →". A cell that leads to a page without that topic would be a
  broken promise. *This goes one step past the literal request; see Open questions.*
- **Reject `?topic=high-school-placement` and fall back to the default.** Without this,
  the pill disappears but a shared or old link still renders the dead table. Falling back
  matches how an unknown topic is handled today.
- **Leave `SchoolDetail.tsx` alone.** Its button is already unreachable for HSP (see
  Context, entry point 3). Adding a second gate would be a redundant conditional.
- **Leave `TOPIC_ORDER` in `metrics.ts` alone.** It is the dossier reading order, and HSP
  keeps its slot on Trinity's page.
- **Record the rule in the generated schema doc**, since `/add-school` reads §7 first. A
  future K-8 assessment should know the area has no Compare pill. The edit goes in the
  generator, never the doc.

## Approvals needed

**None outstanding.** Removing a Compare topic is a UX change, but the user asked for it
directly (2026-10-05), and a direct request is the approval. Dropping the matching home
grid cell is a consequence the user should confirm. It is flagged under Open questions and
has a default.

## Out of scope

- Any change to Trinity Episcopal's dossier or to the HSP research area.
- `TOPIC_ORDER`, `COMPARE_DEFAULT_TOPIC`, `COMPARE_DEFAULT_SCHOOLS`.
- The home lede / topics stat tile count. Those count research areas, not Compare topics,
  and stay at 10.
- Normalizing the canonical URL in `head.ts` for a hand-typed `?topic=high-school-placement`.
- Any locale work.

## Steps

**Single-phase. This adds no user-facing text.** It only removes a pill and a grid cell
that render existing strings. No `src/locales/*.json` key is added or removed:
`topics.high-school-placement`-style labels are still used on Trinity's dossier. Do not
delete any locale key.

1. **Add `comparableTopics` to [`src/lib/manifest.ts`](../../src/lib/manifest.ts).**
   - Place it right after `topicsForSchool`. `docCount` is a hoisted function declaration
     that reads the top-level `manifest`, and `topics` / `comparableSchools` are defined
     above, so module-scope evaluation is safe.
   - Code:
     ```ts
     export const comparableTopics: Topic[] = topics.filter((t) =>
       comparableSchools.some((s) => docCount(t.slug, s.slug) > 0),
     )
     ```
   - Write a docstring in the style of `comparableSchools`'s. It should say:
     - why the export exists: a topic only K-8 schools research would give a table of
       all-"n/a" columns;
     - that today it removes exactly `high-school-placement`;
     - "DERIVE FROM THIS, never from `topics`, anywhere Compare is the subject";
     - the two consumers (Compare.tsx, Home.tsx).
2. **Point [`src/pages/Compare.tsx`](../../src/pages/Compare.tsx) at it.**
   - Import `comparableTopics` from `../lib/manifest.ts`.
   - Validate the default against it: `comparableTopics.some((x) => x.slug === COMPARE_DEFAULT_TOPIC)`.
     If that fails, fall back to `comparableTopics[0]?.slug ?? null`.
   - Validate `activeTopic` against it, so `?topic=high-school-placement` (or any
     non-comparable slug) falls back to `defaultTopic`.
   - Build `compareTopics` from `comparableTopics`, not `topics`.
   - If `topics` / `topicBySlug` still have a use in the file after these edits, leave
     them. Otherwise remove them from the import, because `tsc -b` with `noUnusedLocals`
     will flag them. Line ~306 uses `topicBySlug(activeTopic ?? '')?.name` for the corner
     label, so `topicBySlug` stays.
   - Add a short comment in the existing style that points at `comparableTopics`.
3. **Point [`src/pages/Home.tsx`](../../src/pages/Home.tsx) `homeTopics` at it.**
   - Replace the three `topics.filter(...)` calls in `homeTopics` with
     `comparableTopics.filter(...)`. Keep the College-Support-first / Admissions-last order.
   - Update the import.
   - Add one line to the block comment above it: the grid is a Compare entry point, so it
     lists Compare's topics, not every research area.
4. **Assert the derivation removes exactly one topic.** Recompute it from `schools.json`.
   Trinity is the only `hasHighSchool: false` school in `brands.ts`, so check that first:
   ```
   node -e 'const m=require("./src/data/schools.json");const k8=["trinity-episcopal"];console.log(m.topics.filter(t=>m.matrix.some(r=>r.topic_slug===t.slug&&!k8.includes(r.school_slug)&&r.doc_count>0)).map(t=>t.slug))'
   ```
   Expect 9 slugs, without `high-school-placement`. If any other topic drops, stop: the
   derivation is wrong for this roster.
5. **Record the rule in the schema doc generator.** In
   [`scripts/gen_data_schema.mjs`](../../scripts/gen_data_schema.mjs), §7 (the K-8 shape):
   - Line ~801 is the `| Compare page | a column | **excluded entirely** — no button, no
     column, no \`metricValues.ts\` rows |` row. Extend it, or add a sentence under the
     table, to say that a research area held only by K-8 schools (today
     High School Placement) gets **no Compare topic pill and no home "What you can
     compare" cell**, derived by `comparableTopics` in `src/lib/manifest.ts`.
   - Also extend the line ~784 sentence "drives the Compare exclusion
     (`comparableSchools` …) and nothing else automatically". It should now name
     `comparableTopics` as the second automatic consequence.
   - Then run `npm run schema` and `npm run check:schema`.
6. **Update the docstring cross-references.**
   - `comparableSchools`'s docstring in `manifest.ts`: one line pointing at
     `comparableTopics` as its topic-axis sibling.
   - The `brands.ts` comment at line ~76: if it lists what `hasHighSchool: false` drives,
     add the topic consequence.
7. **Branch, commit, PR, merge.**
   - Branch `feat/compare-no-hsp`.
   - Stage explicit paths only:
     - `src/lib/manifest.ts`
     - `src/pages/Compare.tsx`
     - `src/pages/Home.tsx`
     - `scripts/gen_data_schema.mjs`
     - `.claude/docs/DATA-SCHEMA.md`
     - `src/data/brands.ts`, if touched
     - this plan
     - `.claude/plans/INDEX.md`
   - Run `git status --short` first, and never `git add -A`.
   - PR body via `--body-file`. Squash-merge, then check out `main` and pull.
   - **Do not deploy.** End with "merged — ready to deploy whenever you want it."

## Files touched

| File | Change |
|---|---|
| `src/lib/manifest.ts` | edit: new `comparableTopics` export + docstrings |
| `src/pages/Compare.tsx` | edit: pills, default topic and `?topic=` validation read `comparableTopics` |
| `src/pages/Home.tsx` | edit: `homeTopics` reads `comparableTopics` |
| `scripts/gen_data_schema.mjs` | edit: §7 records the topic-axis exclusion |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `src/data/brands.ts` | edit (comment only), if its `hasHighSchool` comment lists consequences |

## Verification

- [ ] `npx tsc -b`: clean. Use `-b`, not `--noEmit`, per the repo lesson.
- [ ] Step 4's assertion prints 9 topics, without `high-school-placement`.
- [ ] `npm run check:schema`: passes after `npm run schema`.
- [ ] `npm run build`: succeeds. This chains `check:seo`, so the pre-rendered Compare page
      still clears its byte floor and the canonical is unchanged.
- [ ] `grep -c 'high-school-placement' dist/compare/index.html`: expect `0`. The
      pre-rendered Compare page has no HSP pill.
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright
      per the memory notes; avoid `networkidle` on school pages):
  - `/compare/` shows 9 pills, College Support first and active, no High School Placement.
  - `/compare/?topic=high-school-placement` renders College Support with its pill active.
  - `/compare/?topic=sports` still renders Sports, so the validation didn't over-reject.
  - Home `/`: the "What you can compare" grid has 9 cells and no High School Placement.
    The hero lede and topics stat tile still say 10 areas.
  - `/school/trinity-episcopal/`: the High School Placement section still renders with its
    cards, and there is no Compare button anywhere on the page (unchanged).
  - `/school/providence-day/`: section order is unchanged, and each section's
    "Compare on …" button still opens Compare on that topic.
  - Repeat the `/compare/` pill count once in a non-English locale (`?lang=es`).

## Risks

| Risk | Mitigation |
|---|---|
| The derivation drops a topic other than HSP (e.g. a topic only partially researched) | It only drops a topic **no** comparable school has a single document for. Step 4 asserts the exact result before shipping. |
| A third Compare entry point is added later and reads `topics` directly | The docstring's "DERIVE FROM THIS" line, mirroring `comparableSchools` |
| Removing `topics` from Compare.tsx's import while it is still used | `tsc -b` catches it; the corner label still uses `topicBySlug` |

## Open questions

- **Should the home grid's High School Placement cell go too?** The user asked only about
  the Compare page. **Default: yes, remove it.** The grid is headed "What you can compare",
  and its cell opens the same empty table this plan removes. If the user says keep it,
  skip Step 3 and accept that the cell will open Compare on College Support instead.
