# collegeNameHyperlink — link every college name on "Where Graduates Go" to its homepage

**Status:** english-done
**Plan written:** 2026-09-16
**Phases:** Two — English/app first, locales second (adds one new user-facing chrome string)

---

## Summary

Turn the college names in the College Support → **Where Graduates Go** acceptance list into
hyperlinks to each institution's official homepage, using the app's existing external-link
affordance (trailing `↗` at rest, underline on hover). URLs live in **one new master file**,
`src/data/collegeUrls.ts`, resolved at render time by name — exactly mirroring how
`collegeRankings.ts` already resolves rank labels — so a URL is written once and every
school's list picks it up.

The research is the bulk of the work: **921 distinct college names** across the 11 schools'
acceptance lists need a verified homepage URL each.

---

## Decisions already made (do not re-litigate)

| Decision | Choice | Why |
|---|---|---|
| **Research scope** | All **921** distinct names in one pass | User's call, 2026-09-16. A partially-linked list renders visibly mixed — some rows clickable, some not, with no pattern a parent can read. Names that genuinely cannot be linked are recorded as **confirmed null**, not left unresearched. |
| **Where URLs live** | New file `src/data/collegeUrls.ts` | User's call, 2026-09-16. A `COLLEGE_URLS: Record<string, string>` map + `urlFor(name)`, mirroring `COLLEGE_RANKINGS` / `rankLabelFor`. Kept out of `collegeRankings.ts` because the two populations differ (449 ranked vs 921 named) and that file's name would stop describing it. |
| **Per-school `url` field on `College`** | **Rejected** | Contradicts the architecture stated in `collegeRankings.ts`'s own header. Would mean editing ~2,571 entries across 11 files and duplicating a single URL up to 11 times. |
| Normalization | Reuse the exported `normName()` from `collegeRankings.ts` | It is already shared with `collegeMemberships.ts` under an explicit "keep ONE copy; two would drift" rule. A third copy would violate it. |
| Link target | `target="_blank" rel="noreferrer noopener"` | Every external link in the app already does this (`SourceRow.tsx:139`, `CourseOfferings.tsx:294`, `ClubsProgram.tsx:189`, `LatestNews.tsx:181`). |

---

## UX-approval status

**Approved in the request itself.** The user asked for the hyperlink + hover-underline +
diagonal-arrow treatment by name, which is the approval the UX-design standard requires for a
styling change. This plan adds **no new card, section, stat tile, Compare row, metric key or
topic** — it changes how an existing list row renders.

One thing inside this plan *is* a judgment call the user should see rendered before it is
considered settled: the **legend line** (step 8). It is proposed, not mandated — see that step.

---

## Current state (verified 2026-09-16)

### The render surface

`CollegeList` in **`src/components/CollegeSupport.tsx:483-563`**. The name is rendered at
**lines 547-549** as a plain `<span>` inside a `<div className="cs-college">` row:

```tsx
<div key={c.name} className="cs-college">
  <span className={c.enrolling ? 'cs-college-name is-enrolling' : 'cs-college-name'}>
    {c.name}
  </span>
  {rankLabel && <span className="cs-college-rank text-muted">{rankLabel}</span>}
</div>
```

- The row is a `<div>`, **not** an `<a>` — no link affordance today.
- `rankLabelFor(c.name)` is imported at **line 36** — the exact pattern `urlFor` will mirror.
- `key={c.name}` — names are the identity; `College` carries no id or slug.

CSS at **`src/index.css:4072-4091`**. `.cs-college-name` has **no base rule**, only the
`.is-enrolling` modifier (`font-weight: 600`) — so there is no existing declaration to fight.

### The data

- **`src/data/collegeSupport.ts:282`** — `export type College = { name: string; cats: string[]; enrolling?: boolean }`
- **`src/data/collegeSupportPrograms/*.ts`** — 11 school files, ~2,571 raw entries,
  **921 distinct names** (verified:
  `grep -hoE "^\s+\{ name: '[^']+'" src/data/collegeSupportPrograms/*.ts | sed -E "s/.*name: '//;s/'$//" | sort -u | wc -l`)
- **`src/data/collegeRankings.ts`** — the existing master. 449 entries, plus exported
  `normName()` (line 484), a private `BY_NORM` map (line 500), a private `ALIAS` map of ~25
  variant→canonical mappings (line 508), and `rankLabelFor()` (line 551).

### The affordance to reuse

Documented at length in **`src/index.css:6079-6100`**, implemented at **6101-6119**:

> THE ARROW IS THE AT-REST AFFORDANCE, the underline is hover-only. […] An always-on
> underline was rejected (user's call): stacked forty rows deep it reads as noise, where on
> contact it confirms what the arrow already claims.

```css
.srcrow a, .clubs-program-src a {
  text-decoration: none;
  transition: color 0.12s ease, text-decoration-color 0.12s ease;
}
.srcrow a:hover, .clubs-program-src a:hover {
  color: var(--brand); text-decoration: underline; text-underline-offset: 2px;
}
.srcrow a:focus-visible, .clubs-program-src a:focus-visible {
  outline: 2px solid var(--brand); outline-offset: 2px; border-radius: 2px;
}
```

**The `↗` glyph is typed in JSX, never in CSS** — there is no `::after { content: '↗' }`
anywhere in the repo. All five existing call sites type the character literally
(`SourceRow.tsx:139`, `CourseOfferings.tsx:295`, `ClubsProgram.tsx:190`,
`ProseContent.tsx:44`, `ProseContent.tsx:150`). **Follow that; do not invent a CSS pseudo-element.**

The cleanest reference implementation is `SourceRow.tsx:130-145`, which forks
linked→`<a>` / unlinked→`<span>` — the exact graceful-degradation shape this feature needs.

### What is explicitly OUT of scope

- **`NcAdmissionsBody`** (`CollegeSupport.tsx:202-250`, university name at line 235). Only 6
  rows per school (the standing Top 6 NC publics). Linking them is a reasonable follow-up but
  is **not** part of this plan — keep the diff to one surface. Note it in the PR body.
- **`high-school-placement.outcomes`** — the other locale key reading "Where Graduates Go".
  Those chips are **high schools**, not colleges (`DestinationChip`,
  `HighSchoolPlacement.tsx:203-227`), and they already link *into this app's own dossiers*
  with their own `↗` and left-edge treatment. Do not touch them.

---

## i18n scope — important, and narrower than it looks

**`collegeRankings.ts` is not in `TOPICS`** (`scripts/i18n_topics.mjs:44-56`), so it is never
walked by the prose extractor. `collegeUrls.ts` as a sibling master **inherits that** — and
URLs are not translatable prose in any case. **Do not add either file to `i18n_topics.mjs`,
the extractor, `PROSE_TRANSLATED`, or any overlay.**

The only translatable string this plan adds is the **legend line** (step 8), which is UI
chrome → `src/locales/*.json`.

---

# Phase 1 — English + the app layer

## Step 1 — Research all 921 homepage URLs

Extract the canonical worklist first:

```bash
grep -hoE "^\s+\{ name: '[^']+'" src/data/collegeSupportPrograms/*.ts \
  | sed -E "s/.*name: '//;s/'\$//" | sort -u > /tmp/college-names.txt
wc -l /tmp/college-names.txt     # expect 921
```

For each name, find the institution's **official homepage** — the root domain a parent would
land on, not a deep link:

- ✅ `https://www.duke.edu`, `https://www.unc.edu`, `https://www.ncsu.edu`
- ❌ an admissions sub-page, a Wikipedia article, a US News profile, a redirector

Rules that must hold:

1. **`https://`, no trailing slash**, host as the institution publishes it (keep `www.` if
   that is what resolves).
2. **Verify each URL resolves** — a 200, or a redirect chain ending at the same institution.
   Record the *final* URL if a redirect is permanent (`ncsu.edu` → `www.ncsu.edu`).
3. **A branch campus gets its own URL where it has one.** This mirrors the rule already
   stated in `collegeRankings.ts`'s `ALIAS` comment: a branch campus that is its own
   institution is deliberately not collapsed into the flagship.
4. **Confirmed-null is a real, valuable result.** A defunct institution, a name too ambiguous
   to resolve, or a non-degree program gets recorded in the source-material `.md` as
   `— (no homepage: <reason>)` and is simply **absent** from `COLLEGE_URLS`. It then renders
   as plain text, exactly as today. Never guess a URL to fill a row.

Batching this across parallel subagents is fine and expected at this volume; require each to
report the verified final URL and an HTTP status per name.

## Step 2 — Persist the research (data-provenance standard)

Write **`source-material/college-support/_shared/College Homepages 2026.md`**.

It sits beside the three existing `_shared` masters and follows their shape — read
`US News 2026 - Rank Labels.md` first and match it:

- A provenance header: who, when, how (fetched + verified, 2026-09-16).
- One row per college: **canonical name | homepage URL | how verified** (HTTP status / final
  redirect target).
- The confirmed-null rows, each with its reason.

This file is committed (`.gitignore` exempts `source-material/**/*.md`) and is the
human-readable companion the checker in step 6 diffs against.

## Step 3 — Create `src/data/collegeUrls.ts`

Mirror `collegeRankings.ts` structurally, including a header comment stating the invariant.

```ts
// GENERATED SOURCE OF TRUTH — the master college-homepage table.
//
// Every college name rendered on a school's "Where Graduates Go" acceptance list
// resolves its homepage link from THIS file, so a URL lives in exactly one place
// and a correction updates all 11 schools at once. Acceptance-list data files
// carry only { name, cats } — never an inline url. Look one up with urlFor(name).
//
// Human-readable companion (with per-URL verification) lives at
// source-material/college-support/_shared/College Homepages 2026.md and is kept
// in sync with this file (npm run check:collegeurls).
//
// A college with no resolvable homepage (defunct, ambiguous, non-degree) is
// simply absent — urlFor returns undefined and the name renders as plain text.

import { normName } from './collegeRankings.ts'

export const COLLEGE_URLS: Record<string, string> = {
  "Abilene Christian University": "https://www.acu.edu",
  // …921-minus-nulls rows, sorted by key
}

const BY_NORM: Map<string, string> = new Map(
  Object.entries(COLLEGE_URLS).map(([name, url]) => [normName(name), url]),
)

/** The official homepage for a college by any of its name spellings, or
 *  undefined if none resolves (so it should render as plain text). */
export function urlFor(name: string): string | undefined {
  return BY_NORM.get(normName(name))
}
```

**Two things to get right:**

- **Import `normName` from `collegeRankings.ts`** — do not redefine it. That file's comment
  (lines 481-484) explicitly requires one shared copy.
- **The alias problem is different here.** `collegeRankings.ts` keeps a private `ALIAS` map
  because its 449 canonical keys must absorb spelling variants from the school lists. This
  file is built **from the school lists themselves**, so every name in them is already a key
  — no alias layer is needed, and adding one would be dead code. If a name's `normName()`
  collides with another (two keys normalizing identically), resolve it by keeping the
  more-specific name and let both share the URL only if they are genuinely the same
  institution. Step 6's checker catches collisions.

## Step 4 — Link the name in `CollegeList`

`src/components/CollegeSupport.tsx`. Add the import beside line 36:

```tsx
import { urlFor } from '../data/collegeUrls.ts'
```

Replace the row body (lines 545-556), forking exactly as `SourceRow.tsx:130-145` does:

```tsx
{shown.map((c) => {
  const rankLabel = rankLabelFor(c.name)
  const href = urlFor(c.name)
  const nameCls = c.enrolling ? 'cs-college-name is-enrolling' : 'cs-college-name'
  return (
    <div key={c.name} className="cs-college">
      {href ? (
        <a className={nameCls} href={href} target="_blank" rel="noreferrer noopener">
          {c.name} ↗
        </a>
      ) : (
        <span className={nameCls}>{c.name}</span>
      )}
      {rankLabel && <span className="cs-college-rank text-muted">{rankLabel}</span>}
    </div>
  )
})}
```

- The `↗` is **typed in JSX, inside the anchor** — matching all five existing call sites.
- `.cs-college-name` stays on both branches so `.is-enrolling`'s bold survives either way.
- An unlinked college renders **byte-identical to today**.

## Step 5 — Style it

`src/index.css`, in the `.cs-college` block around lines 4072-4091. Reuse the citation model
rather than re-deriving it, and add a short comment pointing at the rationale block at 6079:

```css
/* Acceptance-list college names link to the institution's homepage. Same model
   as the citation links at line 6101: the ↗ is the at-rest affordance, the
   underline is hover-only — forty rows of permanent underline reads as noise. */
a.cs-college-name {
  color: inherit;
  text-decoration: none;
  transition: color 0.12s ease, text-decoration-color 0.12s ease;
}
a.cs-college-name:hover {
  color: var(--brand);
  text-decoration: underline;
  text-underline-offset: 2px;
}
a.cs-college-name:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
  border-radius: 2px;
}
```

**Do not** extend the `.srcrow a, .clubs-program-src a` selector list to cover this. Those
two are citation surfaces; the comment above them describes them as such. A parallel rule
with its own comment keeps both readable.

Consider whether the `↗` needs its own muted colour at rest. `.hsp-dest-arrow`
(`index.css:4387`) uses `color: var(--brand); font-size: 10px`. Judge it in the browser at
step 10 — at 13px row text a full-size arrow may be heavy. If it needs toning, wrap it in a
`<span className="cs-college-arrow" aria-hidden="true">` per `DestinationChip`'s precedent.

## Step 6 — Add `npm run check:collegeurls`

New `scripts/check_college_urls.mjs`, modelled on `scripts/check_rank_labels.mjs`. Read that
file first — especially its **COVERAGE** comment (lines 25-31), which records that a
hardcoded 9-school list silently under-covered the roster. **Read the school directory from
disk**, with the same `LOCALE_RE` filter.

Four assertions:

1. **Shape** — every `COLLEGE_URLS` value is `https://`, has no trailing slash, and parses as
   a URL.
2. **No normalization collisions** — no two `COLLEGE_URLS` keys produce the same
   `normName()`. (`collegeRankings.ts` cannot have this problem the same way; this file can,
   since its keys come straight from the school lists.)
3. **No orphan rows** — every `COLLEGE_URLS` key appears as a college name in at least one
   `collegeSupportPrograms/*.ts`. A stale row is dead weight that survives a college being
   renamed.
4. **Sync with the `.md` companion** — mirror the drift guard at `check_rank_labels.mjs:99+`,
   which diffs the TS master against its `_shared` markdown so the sourced doc can never
   silently drift from what renders.

**Deliberately NOT asserted: coverage.** Do not fail the build when a college has no URL —
confirmed-nulls are legitimate (step 1, rule 4), and a coverage gate would sit permanently
red. That is the failure mode `CLAUDE.md` records three times (`check:sepdrift`,
`check:live`-at-4,646, the identical-strings report). Instead **print the count** as an
informational line (`— 903 of 921 names linked; 18 confirmed unlinkable`) and exit 0.

Wire into `package.json`:

```json
"check:collegeurls": "node scripts/check_college_urls.mjs",
```

and add it to the `build` chain, after `check:ranks` (it is the same family of check):

```
… && npm run check:ranks && npm run check:collegeurls && npm run check:buckets && …
```

## Step 7 — Do NOT run the ingest pipeline for this

The `_shared` markdown from step 2 is a **companion to a code master**, not per-school
research prose. The three files already in `source-material/college-support/_shared/` follow
this pattern: they back `collegeRankings.ts` and `collegeMemberships.ts` and feed a checker,
not `src/data/schools.json`. Running `ingest-source-material` here would try to turn a URL
table into a research card. **Skip it, and say so in the PR body.**

## Step 8 — The legend line (proposed; needs the user's eye)

`CollegeList` explains none of its affordances today — there is no legend for the bold
`is-enrolling` treatment either. The `↗` may be self-evident enough at this density.

**Build it, but flag it explicitly for the review at step 11** so the user can keep or cut it
after seeing it rendered. The precedent is
`HighSchoolPlacement.tsx:518-528` + `collegeSupport.crossLinkLegend`.

Add to **`src/locales/en.json` only** in Phase 1, under `collegeSupport`:

```json
"linkLegend_one": "{{count}} college name links to its homepage.",
"linkLegend_other": "{{count}} college names link to their homepages."
```

Render it beside the existing `.cs-count` line (`CollegeSupport.tsx:538-541`), counting
`shown.filter((c) => urlFor(c.name)).length`.

**Use i18next's `count` option for the plural** — never a hand-rolled `s` suffix. Note that
`ar` needs all six CLDR forms and Arabic's `_two` carries no `{{count}}`; that is Phase 2's
problem, but write the key with `count` from the start so it is possible.

If the user cuts it at step 11, remove the key from `en.json` too — a dangling unused key
will be reported by `npm run check:chrome`.

## Step 9 — Automated verification (Phase 1)

```bash
npx tsc -b                    # trust tsc -b, not tsc --noEmit
npm run lint
npm run check:collegeurls     # new
npm run check:ranks
npm run check:buckets
npm run check:chrome          # the new en-only key reports on the exit-0 path
npm run build                 # runs the full chain incl. check:seo / check:schema
```

`check:chrome` reports a key present in `en` and awaiting translation on **exit 0** with the
key named — that is the expected Phase 1 state, not a failure.

## Step 10 — Browser verification (required, not a formality)

`CLAUDE.md` records that **every defect found after the data read 100% has been
render-layer**, and this change is purely render-layer. A headless pass is not sufficient.

In a **real browser** (`npm run dev`):

1. Open a school with a long list — **Providence Day** (382 entries) — and
   **Charlotte Latin**, which exercises different paths.
2. **Expand the collapsed `<details>` panels.** A default school page renders ~17k chars;
   fully open it is ~152k. The acceptance list is inside a collapsed card.
3. Confirm: names are **not underlined at rest**; the `↗` sits at the end of the name; hover
   adds the underline and the brand colour; **Tab** reaches each link and shows the
   focus-visible outline.
4. Click three links — one flagship, one liberal-arts college, one branch campus — and
   confirm each lands on the right institution in a new tab.
5. Confirm an **unlinked** college renders as plain text with no arrow and no stray spacing.
6. Confirm the **rank label still sits right-aligned** and the two-column
   `grid-template-columns: 1fr auto` did not shift now that column 1 is an inline `<a>`.
7. Confirm the **filter chips and the search box still work** over linked rows.
8. Check **dark mode** — `color: inherit` at rest and `var(--brand)` on hover must both be
   legible.

## Step 11 — Stop for the user's review

Commit Phase 1 to the branch, then **stop**. Report to the user:

- The linked/unlinkable counts, and the list of confirmed-nulls.
- **The legend line from step 8 — keep it, reword it, or cut it?** This is the one wording
  decision in the plan.
- The arrow sizing call from step 5.

Do not begin Phase 2 until the user confirms the wording.

---

# Phase 2 — Locales

Only after the user has signed off on the English.

## Step 12 — Translate the legend key

**UI chrome only.** This is the `src/locales/*.json` layer, **not** the prose overlay.

Read `TRANSLATED` in `src/lib/i18n.ts` for the live list and add the key to every catalog
there (do not hardcode a count — it grows). Today that is
`en, es, bn, ht, te, fr, fa, it, hi, ar`.

Traps that apply:

- **Arabic needs all six CLDR plural forms**, and `_two` carries no `{{count}}` — the dual
  absorbs the numeral. Getting this wrong kills Arabic plurals.
- **Never normalize key order** in `ar.json` — that has broken Arabic plurals before.
- `{{count}}` is a bare integer here, so no `localizeMoneyText()` / figure-safety concern
  applies.

**No prose-overlay work at all.** `collegeUrls.ts` holds no prose; the college names
themselves are proper nouns already rendered untranslated from the data files, unchanged by
this plan.

## Step 13 — Verification (Phase 2)

```bash
npm run check:chrome      # must now be clean across all ten catalogs
npm run check:runtime
npm run check:live
npm run build
```

Then a **browser check in at least two non-English locales**, one of them RTL:

- **`?lang=ar`** or `?lang=fa` — confirm the `↗` sits on the correct side of the name in an
  RTL paragraph and the row does not mangle. The arrow is a bidi-neutral glyph after a
  strong-L Latin college name; if it lands on the wrong side, wrap the name+arrow in an
  LRI…PDI isolate the way the figures already are.
- **`?lang=hi`** or `?lang=bn` — confirm the count in the legend renders with the right
  digits and the plural reads correctly.

The locale key is `csc.lang` / `?lang=`.

---

## Risks

| Risk | Mitigation |
|---|---|
| A wrong URL sends a parent to the wrong institution | Step 1 requires a verified resolve per URL and records the status in the `.md`. Step 6 asserts shape; step 10 spot-checks three live. |
| `normName()` collapses two distinct institutions into one URL | Step 6 assertion 2 fails the build on any collision. |
| 921 rows make the component re-render slowly | `urlFor` is a `Map.get` over a module-level map built once — the same cost profile as `rankLabelFor`, which already runs per row today. |
| The `↗` breaks the two-column grid or wraps oddly on a long name | Step 10 checks 6 and 8 cover this in both themes. |
| A college is renamed later and its URL row goes stale | Step 6 assertion 3 flags orphan rows. |

---

## Files touched

**New**
- `src/data/collegeUrls.ts`
- `scripts/check_college_urls.mjs`
- `source-material/college-support/_shared/College Homepages 2026.md`

**Modified**
- `src/components/CollegeSupport.tsx` (import + `CollegeList` row, ~lines 36, 538-556)
- `src/index.css` (new `a.cs-college-name` rules near 4091)
- `package.json` (`check:collegeurls` + the `build` chain)
- `src/locales/en.json` (Phase 1), then all ten catalogs (Phase 2)

**Not touched:** `scripts/i18n_topics.mjs`, any overlay, `PROSE_TRANSLATED`,
`src/data/collegeSupportPrograms/*.ts`, `src/data/collegeSupport.ts`,
`NcAdmissionsBody`, `HighSchoolPlacement.tsx`.

---

## Git

Branch `feat/college-name-hyperlink`. Stage **explicit paths** — never `git add -A`; the
working tree is shared and has twice swept unrelated files into a PR. Run
`git status --short` before each commit.

One PR containing both phases. PR body via `--body-file`, never a heredoc. Note in it that
`ingest-source-material` was deliberately skipped (step 7) and that `NcAdmissionsBody`
remains unlinked (out of scope).

---

## Implementation notes — Phase 1 (2026-09-16)

Four deviations from the plan as written. All are corrections to the plan, not scope changes.

### 1. The name count is 951, not 921 — the plan's extraction command is WRONG

The plan's step-1 grep (`grep -hoE "^\s+\{ name: '[^']+'"`) **silently under-counts**. The
data files escape apostrophes (`'Saint Joseph\'s University'`), so `[^']+` stops at the
backslash. Two consequences:

- **7 phantom names** were researched and discarded (`Saint Joseph\`, `St. John\`,
  `St. Joseph\`, `Saint Mary\`, `Hawai\`, `King\`, `The University of Virginia\`). Three
  research agents correctly reported them as unresolvable — the strings are meaningless.
- **37 real names were never extracted**, and would have shipped as silently unlinked rows:
  `Saint Augustine's University`, `Louisburg College`, `Clinton College`,
  `York Technical College`, `Carolina University`, `St. John's University`,
  `Penn State University, University Park`, `University of California, Riverside` and 29
  more. These skew **local** (NC/SC institutions) — the ones a Charlotte parent is most
  likely to click.

**The trap worth remembering: the bad grep returned exactly 921, the number the plan
predicted.** The count agreeing was not evidence of correctness. Replaced with a Node
extractor that imports the modules and reads `outcomes.colleges[].name` — the same
technique `check_rank_labels.mjs` uses, authoritative because it reads what the app renders.
The method note is recorded in the `_shared` .md so a regenerating pass cannot repeat it.

Final: **951 distinct names · 933 linked · 18 confirmed-null.**

### 2. `var(--ink)`, not `var(--brand)`, for the hover tint

The plan's CSS snippet specified `color: var(--brand)`. Measured in a real browser, that
fails WCAG AA badly in dark mode: **1.23:1** for Charlotte Latin's navy (effectively
invisible) and 2.83:1 for Providence Day's crimson.

The codebase already solves this: **`--ink` is the brand colour prepared for use as TEXT**,
which the dark theme lightens via `color-mix(in srgb, var(--brand) 60%, #e6e7e8)`
(`index.css` ~line 150). `.note-card > summary:hover .topic-title` uses it for exactly this
hover-tint purpose. Switching lifted navy to 3.82:1 and crimson to 5.00:1.

**Residual, deliberately NOT fixed here:** 3.82:1 is still below AA 4.5 for body text — but
it is *precisely* the site-wide `--ink` value, byte-identical to the pre-existing
`.stat-tile-val` and `.dossier-nav a.is-active` on the same page. Retuning `--ink` would
restyle those site-wide and needs the UX gate. The links never depend on that colour alone:
at rest they are 14.39:1 (`inherit`), and hover adds an **underline** beside the tint.

### 3. Two normalization collisions, resolved toward the specific site

Different research agents resolved the same institution differently:
- `Boston Conservatory at Berklee` → `bostonconservatory.berklee.edu` (the conservatory's
  own site), not the `berklee.edu` parent.
- `Rutgers University, New Brunswick` → `newbrunswick.rutgers.edu` (the campus site),
  matching the two other spellings of that row.

Step 6's assertion 2 caught both. Three path-bearing URLs were also redirect artifacts and
were reduced to their roots (`allegheny.edu`, `barry.edu`, `binghamton.edu`); the three
remaining paths (`newschool.edu/parsons`, `/parsons-paris`, `slu.edu/madrid`) are correct —
each row names a school *within* a university and the path is that school's actual home,
verified by the destination's own page title.

### 4. `Queens University` — a locally-wrong resolution, overridden

The research pass resolved the bare name to **Queen's University Kingston, Ontario** by
national convention. That is wrong for this corpus. The row is Charlotte Latin's, marked
`enrolling: true`; every other school in the roster writes the institution as
`Queens University of Charlotte`; and Providence Day lists `Queens University Belfast`
separately. Overridden to `https://www.queens.edu` and **confirmed by clicking it in a
browser** — the destination titles itself "Welcome to Charlotte's University — Queens
University of Charlotte."

This is the general risk in delegating name resolution: a nationally-sensible reading can be
locally wrong, and nothing automated detects it. The override and its reasoning are recorded
in the `_shared` .md.

### Verification performed

`npx tsc -b` · `npm run lint` · `check:collegeurls` · `check:ranks` · `check:buckets` ·
`check:chrome` · **full `npm run build` green** (every check in the chain, incl. `check:live`
and `check:runtime`).

The new gate was **negative-tested**: all four assertions were corrupted one at a time and
each fired with its own message; the artifact was diffed back byte-identical afterward.

Browser check (headed Chromium, Providence Day 382 rows / Charlotte Latin 300 rows, all 40
`<details>` forced open — 166k and 143k chars respectively, vs ~17k collapsed): no underline
at rest, `↗` present and `aria-hidden`, underline + tint on hover, focus-visible outline,
`target=_blank rel="noreferrer noopener"`, rank labels still right-aligned on the unchanged
`1fr auto` grid, unlinked rows plain with no arrow or stray space, search and filter chips
working over linked rows, legend recounting with the filter, and both themes measured.
Six links clicked through to confirm the destination, including both Penn State rows
(Brandywine → its own campus site, University Park → the flagship root).

**One harness bug worth recording:** the first hover assertion reported "NO underline on
hover" for Charlotte Latin. That was the *test*, not the product — the first link sat at
`y=25521`, far below the viewport, so Playwright's `.hover()` silently no-op'd. Providence
Day passed only because its list happened to land in view. Fixed with
`scrollIntoViewIfNeeded()` before every hover. A contrast-ratio helper also mis-parsed
`color(srgb 0.80 …)` (what `color-mix` returns) as 0-255 and reported a *passing*
`2692252433:1`; fixed to parse both formats before any conclusion was drawn from it.
