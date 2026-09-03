---
name: removeCompareButton
title: Remove the home hero's Compare CTA; open Compare on College Support with a six-school default
status: implemented
phases: 1
created: 2026-09-02
branch: feat/remove-compare-button
prs: [269]
---

# Remove the home Compare CTA, lead Compare with College Support, default it to six schools

## Goal

Three independent changes, all on surfaces a reader sees:

1. **Home page** — delete the blue `Compare schools →` primary CTA from the hero, and
   promote the remaining `Browse a school` button into the primary style so the hero keeps
   one solid focal object.
2. **Compare page** — make **College Support** both the leftmost topic pill and the topic
   the page opens on, without disturbing the reading order of any school dossier.
3. **Compare page** — when the URL names no schools, open on a fixed six:
   Cannon, Charlotte Christian, Charlotte Country Day, Charlotte Latin, Davidson Day,
   Providence Day.

We know it worked when: the home hero shows exactly one button, styled primary, reading
`Browse a school`; a bare `/compare/` renders a six-column College Support table instead
of today's empty state; and every school page's section order is byte-for-byte unchanged.

## Context

Everything below was read during planning. Paths and names are confirmed to exist.

### The home CTA

[`src/pages/Home.tsx:44-67`](../../src/pages/Home.tsx#L44-L67) — the hero's `.hero-actions`
row holds three children:

- a `<span className="cta-frame">` wrapping an `<a className="btn primary">` whose label is
  `{t('home.ctaCompare')} <ArrowIcon />`, href `compareAll`;
- an `<a className="btn ghost">` labelled `{t('home.ctaBrowse')}`, which scrolls to
  `#schools` in place (it deliberately does **not** touch `location.hash` — the hash router
  owns that);
- a `<span className="freshness">`.

`compareAll` is computed at [`Home.tsx:32`](../../src/pages/Home.tsx#L32) as
`toCompare(topics[0]?.slug ?? null, allSlugs)` and is used **only** by the button being
deleted, so it becomes dead. `ArrowIcon` (defined at
[`Home.tsx:8-25`](../../src/pages/Home.tsx#L8-L25)) is likewise used **only** there —
grep confirms one call site.

`t('home.ctaCompare')` has exactly one consumer in `src/`, this button. It exists in all
ten `src/locales/*.json` catalogs. **Nothing in this repo gates unused locale keys** —
`scripts/check_chrome_keys.mjs` checks the opposite direction (a key the code looks up must
exist in every catalog), so leaving the key in place is inert, and removing it from all ten
is also safe. See Decisions.

CSS, [`src/index.css:617-625`](../../src/index.css#L617-L625):

```
.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.hero-actions .btn { padding: 10px 22px; }
/* blueprint frame around the primary CTA — the one solid object on the page */
.cta-frame { position: relative; display: inline-flex; border: 1px solid var(--border); }
```

`.cta-frame` has exactly two references in the whole repo — this rule and the one JSX use
being removed. Since the plan re-uses it around the promoted `Browse a school` button, the
rule stays.

**Not affected:** the home page's *topic grid* lower down
([`Home.tsx:126-141`](../../src/pages/Home.tsx#L126-L141)) also links into Compare, one
`Compare all →` cell per topic. Those are a different surface and the user asked only about
the hero button. They stay exactly as they are, including their all-eleven-school query.

### Compare's topic order and landing topic

Two separate mechanisms, deliberately:

- **Pill order** — [`Compare.tsx:232`](../../src/pages/Compare.tsx#L232) maps over `topics`,
  exported from [`src/lib/manifest.ts:15`](../../src/lib/manifest.ts#L15) as
  `orderBySlug(manifest.topics)`, which routes through `orderTopicSlugs()` and therefore
  through `TOPIC_ORDER` in
  [`src/lib/metrics.ts:257-266`](../../src/lib/metrics.ts#L257-L266).
- **Landing topic** — `COMPARE_DEFAULT_TOPIC` at
  [`src/lib/metrics.ts:289`](../../src/lib/metrics.ts#L289), currently `'course-offerings'`,
  consumed by [`Compare.tsx:199-201`](../../src/pages/Compare.tsx#L199-L201) *and* by
  [`scripts/seo_routes.mjs:103`](../../scripts/seo_routes.mjs#L103).

**`TOPIC_ORDER` must NOT be edited.** Its own comment says it drives "the topic section
headers themselves … on a school page and the topic list on Home". Confirmed: `SchoolDetail`
orders its dossier sections through `topicsForSchool()`, which is also `orderTopicSlugs()`.
Moving `college-support` to the front of `TOPIC_ORDER` would put College Support above
Admissions on all eleven school pages and reshuffle the home topic grid — far outside what
was asked. The Compare pill row therefore needs its **own** ordering, applied locally in
`Compare.tsx`.

`COMPARE_DEFAULT_TOPIC`'s docblock explains why it is deliberately not `TOPIC_ORDER[0]`:
Admissions has one research-coverage row and no Compare value rows, so opening there
produced a near-empty table that fell under `check:seo`'s 20 KB byte floor. Changing the
constant to `college-support` is safe on both counts and in fact improves them —
`src/data/metricValues.ts` holds **8** value rows for `college-support` versus **3** for
`course-offerings` (counted during planning), so the landing table gets *denser*, not
thinner. **Update that docblock**; leaving it saying "Course Offerings" would make the
next reader distrust the constant.

### Compare's school selection — today there is no default

[`Compare.tsx:205`](../../src/pages/Compare.tsx#L205):

```ts
const selected = allSchools.map((s) => s.slug).filter((slug) => schools.includes(slug))
```

`schools` is the prop, fed from
[`src/lib/router.ts`](../../src/lib/router.ts) `parsePath()`, which reads
`?schools=` and yields `[]` when absent. With an empty array `selected` is empty, `cols` is
empty, and the page renders `t('compare.empty')` —
[`Compare.tsx:268`](../../src/pages/Compare.tsx#L268). So **a bare `/compare/` renders an
empty table today**, and two places work around that by never linking to a bare one:

- [`scripts/seo_routes.mjs:83-105`](../../scripts/seo_routes.mjs#L83-L105) — a long comment
  states outright *"Compare.tsx has no all-schools default, and giving it one is out of
  scope for this plan"*, then pins the pre-rendered/canonical/sitemap URL to
  `?topic=<COMPARE_DEFAULT_TOPIC>&schools=<all eleven>`.
- [`src/lib/head.ts:139-159`](../../src/lib/head.ts#L139-L159) — the runtime canonical is
  built from `route.topic` / `route.schools` the same way; `check_seo.mjs` asserts the two
  agree exactly (it compares the emitted canonical string against `urlFor(route)`).

This plan adds the default the seo_routes comment says didn't exist. **The critical
constraint:** the default must be applied *inside `Compare.tsx`*, not in the router and not
in `head.ts`. `head.ts` builds the canonical from `route.schools` — if the router started
injecting six slugs into `route.schools`, the runtime canonical for a bare `/compare/`
would become `?schools=<six>` while `seo_routes.mjs` still pre-renders and sitemaps
`?schools=<eleven>`, and `check:seo` fails on the canonical mismatch. Keeping the default
local to the component leaves `route.schools` empty, so the canonical for a bare
`/compare/` is unchanged and `check:seo` stays green.

### The six schools

All six slugs verified present in `src/data/schools.json`:

| Requested | Slug |
|---|---|
| Cannon | `cannon` |
| Charlotte Christian | `charlotte-christian` |
| Charlotte Country Day | `charlotte-country-day` |
| Charlotte Latin | `charlotte-latin` |
| Davidson Day | `davidson-day` |
| Providence Day School | `providence-day` |

Column order is **not** taken from that list — `Compare.tsx` deliberately re-derives it from
manifest order at line 205 ("preserving manifest order for stable columns"). Manifest order
happens to render them in the same sequence anyway.

## Decisions

- **Single-phase — adds no user-facing text.** Every string involved already exists in all
  ten catalogs. `home.ctaBrowse` is reused verbatim; nothing new is authored. Per CLAUDE.md
  the plan says so explicitly rather than leaving it inferred.
- **`Browse a school` is promoted to primary** (user's choice) — it inherits
  `className="btn primary"` and the `.cta-frame` wrapper, so the hero keeps exactly one
  solid focal object rather than degrading to a lone ghost outline.
- **No arrow icon on the promoted button.** `ArrowIcon` was the Compare CTA's affordance for
  navigating away; `Browse a school` scrolls down the same page, so an arrow pointing right
  would misdescribe it. `ArrowIcon` is deleted with its only caller.
- **`home.ctaCompare` is removed from all ten catalogs.** Nothing gates unused keys either
  way, so this is housekeeping — but leaving a key whose only consumer was just deleted
  invites a future reader to think the button still exists. Remove it from `en` and the nine
  others in the same commit; that is a deletion of dead data, not a translation change, so
  it does not make the plan two-phase.
- **The Compare pill order is reordered locally in `Compare.tsx`, never in `TOPIC_ORDER`** —
  see Context. `TOPIC_ORDER` governs school-page section order, and this change must not
  touch it.
- **The six-school default lives in `Compare.tsx`, not the router or `head.ts`** — see
  Context; putting it upstream breaks `check:seo`'s canonical assertion.
- **The default applies only when the URL names no schools** (user's choice). Any link
  carrying `?schools=` — the home topic tiles, a school page's compare link, the SEO
  canonical — keeps rendering exactly what it names, including a deliberate
  one-school selection.
- **Deselecting every school still shows the empty state.** The default is for *URL absence*,
  not for *an empty selection*. If a reader toggles all six off, `toggleSchool` navigates to
  a URL with no `schools` param — which would otherwise re-apply the default and make the
  pills feel broken. Step 5 handles this explicitly; it is the one non-obvious edge in the
  change.
- **The SEO canonical keeps all eleven schools.** Changing it would move the pre-rendered
  page, the sitemap entry and the canonical together, and the user asked about the in-app
  default, not the indexed URL.

## Approvals needed

**None.** No new card, section, sub-section, stat tile, Compare row, metric key or topic is
added. Reordering the Compare topic pills is a reordering of existing UI, which the
UX-design gate does cover — but this plan *is* the user's explicit request for it, given in
the `/plan` invocation, so the gate is satisfied. Nothing here is an ingestion side effect.

No deploy is authorized by this plan. `/implement` merges and stops.

## Source material

None. No external data is fetched; no `source-material/` file is written.

## Out of scope

- The home page's **topic grid** `Compare all →` links (`Home.tsx:126-141`) — they keep
  linking with all eleven schools.
- `SchoolDetail.tsx`'s per-topic compare link (`Compare against the other schools`,
  `SchoolDetail.tsx:840`) — untouched.
- `TOPIC_ORDER` and therefore school-page section order and the home topic grid order.
- The pre-rendered `/compare/` URL, the sitemap, and the canonical — all keep the
  eleven-school query.
- `home.ctaBrowse`'s wording, the `#schools` scroll behaviour, and the freshness line.

## Steps

**Single-phase — adds no user-facing text.**

1. **Delete the Compare CTA from the home hero** — in
   [`src/pages/Home.tsx`](../../src/pages/Home.tsx), remove the whole
   `<span className="cta-frame">…</span>` block (lines ~47-54) containing the
   `btn primary` anchor.

2. **Promote `Browse a school`** — in the same file, wrap the remaining
   `{t('home.ctaBrowse')}` anchor in a `<span className="cta-frame">` and change its
   `className` from `"btn ghost"` to `"btn primary"`. Keep its `href="#schools"` and its
   existing `onClick` verbatim, including the comment explaining why it calls
   `preventDefault()` (the hash router owns `location.hash`).

3. **Remove the now-dead code in `Home.tsx`** — delete the `ArrowIcon` component
   (lines ~8-25) and the `const compareAll = …` line (~32). Then fix the import at line 6:
   `toCompare` is still used by the topic grid at line 130, so keep it; only remove an
   import if `npx tsc --noEmit` reports it unused. Verify with
   `grep -n "ArrowIcon\|compareAll" src/pages/Home.tsx` returning nothing.

4. **Drop `home.ctaCompare` from all ten catalogs** — remove the `"ctaCompare"` line from
   the `home` block of each of `src/locales/{en,es,bn,ht,te,fr,fa,it,hi,ar}.json`. Confirm
   afterwards that `grep -rn "ctaCompare" src/` returns nothing and each file still parses
   (`node -e "require('./src/locales/ar.json')"` etc., or rely on the build).

5. **Add the six-school default to `Compare.tsx`** — in
   [`src/pages/Compare.tsx`](../../src/pages/Compare.tsx), above the component, add an
   exported-or-local constant with a comment explaining the two things a fresh reader needs:

   ```ts
   /* The schools a bare /compare/ opens on. Before this existed, /compare/ with
      no ?schools= rendered an empty table (see the comment in
      scripts/seo_routes.mjs, which pins the INDEXED compare URL to all eleven
      schools precisely because there was no default).

      Applied HERE, in the component, and deliberately not in the router: the
      canonical URL in src/lib/head.ts is built from route.schools, and
      check:seo asserts it matches what scripts/seo_routes.mjs pre-rendered. If
      the router injected these six into route.schools, a bare /compare/ would
      declare a six-school canonical while the sitemap advertised an
      eleven-school one, and the build would fail on the mismatch. */
   const DEFAULT_COMPARE_SCHOOLS = [
     'cannon',
     'charlotte-christian',
     'charlotte-country-day',
     'charlotte-latin',
     'davidson-day',
     'providence-day',
   ]
   ```

   Then change the selection derivation at line ~205. The current line is:

   ```ts
   const selected = allSchools.map((s) => s.slug).filter((slug) => schools.includes(slug))
   ```

   Replace with a form that distinguishes *URL named none* from *user deselected all*:

   ```ts
   /* `schools` is [] both when the URL carries no ?schools= at all and when the
      reader has toggled every pill off. Only the FIRST should fall back to the
      default — re-applying it on a deliberate deselection would make the pills
      feel broken. toggleSchool() below always navigates with an explicit
      (possibly empty) selection, so `cleared` tells the two apart. */
   const wanted = cleared ? [] : schools.length ? schools : DEFAULT_COMPARE_SCHOOLS
   const selected = allSchools.map((s) => s.slug).filter((slug) => wanted.includes(slug))
   ```

   Implement `cleared` as component state initialised `false`, set to `true` inside
   `toggleSchool` when the computed `next` array is empty and reset to `false` whenever it
   is non-empty. Filtering through `allSchools` already discards any unknown slug, so a
   typo in the constant degrades to fewer columns rather than a crash.

   Note `setTopic` and `toggleSchool` (lines 207-214) navigate with `toCompare(t, selected)`
   — since `selected` is now the resolved six, the first topic click promotes the default
   into the URL. That is correct and wanted.

6. **Make College Support the landing topic** — in
   [`src/lib/metrics.ts`](../../src/lib/metrics.ts), change
   `export const COMPARE_DEFAULT_TOPIC = 'course-offerings'` to `'college-support'`, and
   **rewrite its docblock** (lines 268-288). Keep the existing explanation of why it is not
   `TOPIC_ORDER[0]` (Admissions is near-empty and dropped the page under the byte floor) and
   why `seo_routes.mjs` imports it rather than re-deriving. Replace the "Course Offerings
   carries value rows for every school" sentence with the current reason: College Support
   carries **8** value rows in `src/data/metricValues.ts`, more than any other topic
   (Course Offerings has 3), so it is the densest landing table.

7. **Make College Support the first Compare pill** — in `Compare.tsx`, derive a
   Compare-local ordering rather than mapping `topics` directly at line 232:

   ```ts
   /* Compare leads with College Support (the topic the page opens on — see
      COMPARE_DEFAULT_TOPIC), so the leftmost pill is the one already active on
      arrival. Done HERE and not in TOPIC_ORDER: that array is the reading order
      of a school DOSSIER, where Admissions leads deliberately, and reordering it
      would move College Support to the top of all eleven school pages and of the
      home topic grid. */
   const compareTopics = [
     ...topics.filter((x) => x.slug === COMPARE_DEFAULT_TOPIC),
     ...topics.filter((x) => x.slug !== COMPARE_DEFAULT_TOPIC),
   ]
   ```

   Map over `compareTopics` in the pill row. Keying off `COMPARE_DEFAULT_TOPIC` rather than
   a second hardcoded `'college-support'` keeps the leading pill and the landing topic from
   ever drifting apart. Leave the `topics[0]?.slug ?? null` fallback at line 201 as-is — it
   is the degrade path for a mis-set constant and should stay pointed at the manifest.

8. **Run the full verification below**, then open the PR.

## Files touched

| File | Change |
|---|---|
| `src/pages/Home.tsx` | edit — delete the Compare CTA, `ArrowIcon` and `compareAll`; promote `Browse a school` to `btn primary` inside `.cta-frame` |
| `src/pages/Compare.tsx` | edit — add `DEFAULT_COMPARE_SCHOOLS` + `cleared` state; lead the pill row with `COMPARE_DEFAULT_TOPIC` |
| `src/lib/metrics.ts` | edit — `COMPARE_DEFAULT_TOPIC` → `'college-support'`, docblock rewritten |
| `src/locales/en.json` + 9 others | edit — remove the now-unused `home.ctaCompare` key |

No file is created or deleted. `src/index.css` is **not** touched — `.cta-frame` is reused.

## Verification

Single-phase, so one pass.

- [ ] `npx tsc --noEmit` — clean. **Then also read `npm run build`'s exit code** — CLAUDE.md
      records that `--noEmit` has passed on a type error the build caught.
- [ ] `npm run build` — succeeds. This chains `check:schema`, `check:seo`, `check:live` and
      `check:runtime`.
- [ ] `npm run check:seo` — green. **This is the one that matters most here.** It asserts
      the pre-rendered `/compare/` page's canonical equals `urlFor(route)` from
      `seo_routes.mjs`; because `COMPARE_DEFAULT_TOPIC` feeds that URL, changing the constant
      moves the canonical, the sitemap entry and the pre-rendered page together. A pass means
      all three agree on `?topic=college-support&schools=<all eleven>`. It also enforces the
      20 KB byte floor on that page — College Support's 8 value rows clear it comfortably,
      but read the number rather than assuming.
- [ ] `npm run check:chrome` — green. It verifies every key the code *looks up* exists in all
      ten catalogs; removing an unlooked-up key must not perturb it.
- [ ] `grep -rn "ctaCompare\|ArrowIcon\|compareAll" src/` — returns nothing.
- [ ] `git diff --stat src/lib/metrics.ts` — confirm the diff touches only
      `COMPARE_DEFAULT_TOPIC` and its comment. **`TOPIC_ORDER` must be unchanged.**

### Browser check (required — this change is entirely render-layer)

CLAUDE.md's standing lesson is that render-layer defects survive every automated check. Run
`npm run dev` and, in a real browser:

- [ ] **Home** — the hero shows exactly **one** button, framed and blue, reading
      `Browse a school`. No `Compare schools →`. Clicking it scrolls to the schools section
      and **does not change the URL**. The freshness line still sits beside it, and the
      row still wraps correctly at a narrow width (`.hero-actions` is `flex-wrap: wrap`).
- [ ] **Home, lower down** — the topic grid's `Compare all →` cells still work and still
      open Compare with all eleven schools.
- [ ] **Bare `/compare/`** — opens on College Support with **six** columns: Cannon,
      Charlotte Christian, Charlotte Country Day, Charlotte Latin, Davidson Day,
      Providence Day. The College Support pill is **leftmost and active**.
- [ ] **Pill row order** — College Support first, then Admissions, Course Offerings,
      Student Clubs, The Arts, Sports, After School, Summer Programs (the rest keep
      `TOPIC_ORDER`).
- [ ] **Explicit URL wins** — `/compare/?schools=cannon` shows exactly one column, not seven.
      This is the regression the `cleared` logic and the URL-absence-only rule exist to
      prevent.
- [ ] **Deselect-all** — from the six-school default, toggle every school pill off. The page
      must show the empty state, **not** snap back to six.
- [ ] **A school page is unchanged** — open `/school/providence-day/` and confirm the
      research-area sections still lead with **Admissions**, not College Support. This is the
      check that catches an accidental `TOPIC_ORDER` edit.
- [ ] **One non-English locale** — `/compare/?lang=es`. The six columns and the College
      Support-first pill order must hold; the pills are labelled through `topicLabel()`, so a
      reordering bug would surface as an untranslated or mis-ordered row.

## Risks

| Risk | Mitigation |
|---|---|
| Editing `TOPIC_ORDER` instead of ordering locally — moves College Support to the top of all eleven school pages | Step 7 orders in `Compare.tsx`; verification diffs `metrics.ts` and opens a school page |
| Injecting the default into the router or `head.ts` — the runtime canonical for a bare `/compare/` diverges from the sitemap and `check:seo` fails | Step 5's comment states the constraint; `npm run check:seo` catches it |
| A typo'd slug in `DEFAULT_COMPARE_SCHOOLS` silently drops a column | The `allSchools.filter` already discards unknowns; the browser check counts six by name |
| Deselect-all snapping back to the default, making the pills feel broken | The `cleared` flag in step 5, with its own browser check |
| The lone remaining hero button reads as unbalanced at some viewport | `.hero-actions` is `flex-wrap: wrap` and unchanged; the browser check includes a narrow width |

## Open questions

None. Both ambiguities raised at planning time were answered by the user:

- *Where the six-school default applies* — **only when the URL names no schools.**
- *What happens to `Browse a school`* — **promoted to the primary style.**
- *What "first topic" means* — **both the first pill and the landing topic.**

## Implementation notes

Implemented 2026-09-02 on `feat/remove-compare-button`. All eight planned steps shipped as
written. The user added three changes mid-build, each an extension of the same idea:

1. **The home topic grid ("What you can compare") also leads with College Support.** The
   plan explicitly put that grid out of scope, keeping it in `TOPIC_ORDER` sequence. The
   user asked for it during the build, so `Home.tsx` now derives its own `homeTopics`
   ordering — the same local-reorder pattern step 7 uses for the Compare pills, and again
   **not** a `TOPIC_ORDER` edit.

2. **Admissions moved to the END of that home grid.** Asked for immediately after (1), so
   the home order is College Support first, Admissions last, `TOPIC_ORDER` in between. This
   makes the home grid's order deliberately *different* from the Compare pill row's, which
   keeps Admissions in second place. They are two lists for a reason and should not be
   collapsed into one.

3. **A school page's per-topic compare link opens on that school plus the six.** Previously
   it linked with all eleven (`otherSlugs`, a misleading name — it never excluded the
   current school). Now `compareSlugs` filters the manifest to `this school ∪ the six`, so
   Providence Day yields six columns (no duplicate) and Gaston Day yields seven. Each link
   still carries its own topic, unchanged.

**One structural deviation from step 5.** The plan put `DEFAULT_COMPARE_SCHOOLS` local to
`Compare.tsx`. Change (3) gave the list a second consumer, so it was promoted to
`COMPARE_DEFAULT_SCHOOLS` in `src/lib/metrics.ts`, exported beside `COMPARE_DEFAULT_TOPIC`
— the same reasoning that already keeps the landing topic in one shared place rather than
letting two call sites drift. The plan's critical constraint is unchanged and restated in
the new docblock: the default is applied **by the components**, never by the router or
`head.ts`, so `route.schools` stays empty for a bare `/compare/` and the canonical still
matches the eleven-school pre-rendered URL. `npm run check:seo` confirms it.

`src/pages/SchoolDetail.tsx` is therefore also touched, which the plan's *Files touched*
table did not anticipate.

### Verification results

`npx tsc --noEmit` 0 · `npm run build` 0 (chains `check:schema`, `check:live`,
`check:runtime`, `check:chrome`, `check:ranks`, `check:news` and more) · `npm run check:seo`
0, 13 pre-rendered pages, sitemap and robots all OK · `npm run check:chrome` 0 across all
ten catalogs · `TOPIC_ORDER` unchanged (diff of `metrics.ts` touches only
`COMPARE_DEFAULT_TOPIC`, its docblock, and the new `COMPARE_DEFAULT_SCHOOLS`).

Browser check (Playwright, real Chromium, `npm run dev`) — every box in the checklist
passed, plus the three added behaviours:

- Hero: exactly one button, `btn primary`, framed, `Browse a school`, no arrow; clicking it
  scrolls without changing the URL; freshness line intact; still one button at 380px wide.
- Home grid: `College Support | Course Offerings | Student Clubs | The Arts | Sports |
  After School | Summer Programs | Financial Aid & Tuition | Admissions`; cells still link
  with all eleven schools (12 columns on click).
- Bare `/compare/`: College Support leftmost and active, six columns, URL stays bare,
  canonical unchanged.
- `/compare/?schools=cannon`: one column — explicit URLs still win.
- Deselect-all: empty state, does **not** snap back to six.
- `?lang=es`: order and six columns hold with translated labels.
- `/school/providence-day/` sections still lead Admissions, confirming no `TOPIC_ORDER` edit.
- School compare links: providence-day → 6 columns; gaston-day → 7.
