---
name: schoolwebsitelink
title: Link the school name and mascot crest on each dossier header to that school's own homepage
status: implemented
phases: 2
created: 2026-09-17
branch: feat/school-website-link
prs: [313]
---

# Link the school name and mascot crest to the school's own website

## Goal

On every school dossier page, the `<h1>` school name and the mascot crest beside it become
links to that school's real homepage, opening in a new tab. A parent reading our research
can reach the primary source in one click, instead of leaving the site to search for it.

Done when: all twelve school pages render a working outbound link on the name, the seven
schools with a crest render one on the crest too, the sticky-nav title swap still fires,
and a new screen-reader user hears one labelled link per target rather than two unlabelled
ones.

## Context

### Where the header lives

The dossier header is [`src/pages/SchoolDetail.tsx:557-631`](../../src/pages/SchoolDetail.tsx#L557).
Its three relevant pieces:

- `<SchoolBadge slug={slug} name={school.name} size={84} />` (line 558) — the monogram
  badge. **Not in scope**, see Out of scope.
- `<h1 id="school-title">{school.name}</h1>` (line 564).
- `<img className="dossier-crest" src={brand.logo} … />` (lines 620-626), rendered only
  when `brand.logo` is set.

### The `id="school-title"` trap — read this before editing the `<h1>`

[`src/components/StickySchoolTitle.tsx`](../../src/components/StickySchoolTitle.tsx)
attaches an `IntersectionObserver` to `document.getElementById('school-title')` to decide
when the school name has scrolled under the sticky nav. It also runs a `MutationObserver`
waiting for that element to appear behind `SchoolDetail`'s `ready` gate.

**The anchor must go INSIDE the `<h1>`, wrapping the text**, not around the `<h1>`, and the
`id` stays on the `<h1>`. Wrapping the heading in an `<a>` would leave the id on an element
whose intersection geometry has changed, and an `<h1>` inside an `<a>` inside a flex column
is also a heading-semantics regression. There is no automated check for this — the sticky
title is verified by scrolling, and it is in the browser checks below.

### The pattern to follow

The app already links outbound to school and college homepages, twice, and both land in the
same visual language:

- [`src/components/HighSchoolPlacement.tsx:264-283`](../../src/components/HighSchoolPlacement.tsx#L264)
  — a destination high school links to its homepage with
  `target="_blank" rel="noreferrer noopener"`, and renders **plain text** when no URL
  resolves. Its CSS is `.hsp-dest-out` at [`src/index.css:4591`](../../src/index.css#L4591):
  `color: inherit; text-decoration: none;` plus `:hover { text-decoration: underline; }`.
  **That is exactly the treatment this plan wants** (see Decisions).
- [`src/components/CollegeSupport.tsx:590`](../../src/components/CollegeSupport.tsx#L590)
  — every college name on "Where Graduates Go", resolved from the single master table
  [`src/data/collegeUrls.ts`](../../src/data/collegeUrls.ts) (PR #311, 2026-09-16).

### Where the URL belongs

[`src/data/brands.ts`](../../src/data/brands.ts) — the hand-maintained per-school config
that already carries `logo`, `city`, `welcomeVideoUrl` and `hasHighSchool`. Its header
comment (lines 42-50) records **why** per-school config lives here rather than on the
`School` record in `schools.json`: the ingest pipeline rebuilds every `schools.json` school
record as a bare `{slug, name}` from the source-material folder names
(`build_docs.py:187`), so a field written there is silently erased by the next ingest run.
A homepage URL in `schools.json` would vanish with no error and no failing check.

The `Brand` type is at [`src/data/brands.ts:57-64`](../../src/data/brands.ts#L57).

### All twelve URLs are already in the repo — do not re-fetch them

`source-material/branding/_shared/All Schools - Branding - Campus City and Address.md`
carries eleven of the twelve, each verified 2026-08-23 against the school's own site
alongside the `city` values already shipped. Trinity Episcopal's is in
`source-material/branding/trinity-episcopal/Trinity Episcopal School - Branding - Crest and Brand Color.md`.
Ten are independently corroborated by the `domain:` fields in
[`src/lib/news/sources.ts`](../../src/lib/news/sources.ts).

| slug | homepage |
|---|---|
| `cannon` | `https://www.cannonschool.org/` |
| `carmel-christian` | `https://www.carmelchristian.org/` |
| `charlotte-catholic` | `https://www.charlottecatholic.org/` |
| `charlotte-christian` | `https://www.charlottechristian.com/` |
| `charlotte-country-day` | `https://www.charlottecountryday.org/` |
| `charlotte-latin` | `https://www.charlottelatin.org/` |
| `covenant-day` | `https://www.covenantday.org/` |
| `davidson-day` | `https://www.davidsonday.org/` |
| `gaston-day` | `https://www.gastonday.org/` |
| `hickory-grove-christian` | `https://www.hgchristian.org/` |
| `providence-day` | `https://www.providenceday.org/` |
| `trinity-episcopal` | `https://www.tescharlotte.org/` |

Note `charlotte-christian` is `.com`, not `.org` — the odd one out, and an easy silent
typo. Step 1 re-verifies each with a live HTTP check before committing.

### Crest coverage is partial, by design

Seven of twelve schools have a crest in [`public/logos/`](../../public/logos/): cannon,
charlotte-christian, charlotte-country-day, charlotte-latin, davidson-day, providence-day,
trinity-episcopal. The other five (carmel-christian, charlotte-catholic, covenant-day,
gaston-day, hickory-grove-christian) render no crest at all. So the crest link exists on
7/12 pages, and **the name link is the primary affordance** — the crest is a bonus.

### CLS: the crest's reserved box must survive

The `<img>` comment at [`SchoolDetail.tsx:610-619`](../../src/pages/SchoolDetail.tsx#L610)
and the `.dossier-crest` rule at [`src/index.css:781`](../../src/index.css#L781) exist to
fix a 0.35 desktop CLS. `.dossier-crest` sets `flex: 0 0 auto; height: clamp(…);
aspect-ratio: 3/2; width: auto; max-width: 40%; align-self: center`. Those properties are
applied to the **`<img>` itself**. Wrapping it in an `<a>` inserts a new flex item between
`.dossier-header` and the image, and an inline `<a>` will not carry the flex sizing — so
the reserved box is lost and the CLS regression returns.

**The fix is to give the wrapper `.dossier-crest-link` the flex/sizing properties and leave
the intrinsic-size properties on the `<img>`.** This is measured, not assumed — see
Verification.

## Decisions

- **`homepageUrl?: string` on `Brand`, optional** — user-chosen 2026-09-17. Matches
  `logo?` and `welcomeVideoUrl?`, and matches how `HighSchoolPlacement` and
  `CollegeSupport` already behave: no resolvable homepage renders as plain text, a
  confirmed result rather than a gap. Not required like `city`, which is required for the
  different reason that a missing city would make a page silently claim Charlotte.
- **Subtle link cue — hover underline only, no `↗` arrow** — user-chosen 2026-09-17. The
  `<h1>` is `clamp(30px, 5vw, 44px)`; an arrow beside it is conspicuous. Reuses the
  `.hsp-dest-out` treatment (`color: inherit`, underline on hover) already shipped.
- **The URL lives in `brands.ts`, not `schools.json`** — the ingest pipeline rebuilds
  `schools.json` school records as bare `{slug, name}`, erasing any added field with no
  error. See Context.
- **No master-table indirection like `collegeUrls.ts`** — that file exists because one
  college appears in many schools' lists and must resolve to one URL everywhere. Here each
  school appears exactly once, keyed by slug. A second file would add a lookup with no
  ambiguity to resolve.
- **The anchor goes inside the `<h1>`, `id` stays on the `<h1>`** — protects the
  `StickySchoolTitle` observer and heading semantics. See Context.
- **Crest link is `aria-hidden`, name link carries the label** — the crest sits
  immediately beside the name and points to the same URL. Two links to one target is
  duplicate-link noise for a screen-reader user; hiding the crest link from the
  accessibility tree leaves one labelled link. The `<img alt>` (`a11y.crestAlt`) stays as
  it is for the non-link case.
- **A new `check:schoolurls` script** — mirrors `check:collegeurls`, and this repo's
  standing lesson is that a hand-maintained URL table needs a gate or it rots silently.
  It asserts shape and uniqueness, **not coverage** — see step 6.
- **No `source-material/` writes in this plan** — every URL is already persisted with its
  provenance. Step 1 adds one verification line to the existing `_shared` file rather than
  creating a new one.

## Approvals needed

**None.** This adds no card, section, sub-section, stat tile, Compare row, metric key or
topic, and reorders nothing. It adds link behaviour to a header that already exists, plus
one optional field on an existing hand-maintained config type. The UX-design gate in
`CLAUDE.md` does not apply.

Two `a11y.*` keys are new chrome strings and follow the normal i18n standard (Phase 2).

**Deploying is NOT authorized by this plan.** `/implement` merges and stops.

## Source material

No new external data. Every URL is already in the repo with provenance (see Context).

Step 1 appends a **verification line** — date and HTTP status per URL — to the existing
`source-material/branding/_shared/All Schools - Branding - Campus City and Address.md`,
and adds Trinity Episcopal's homepage to that shared table so all twelve sit in one place.
No new file, and **no `ingest-source-material` run is needed** — the branding topic feeds
no research area and this edit adds no subtopic.

## Out of scope

- **`SchoolBadge`** — the monogram badge is a fallback stand-in for a logo, is also used in
  the "More Charlotte-area schools" row at [`SchoolDetail.tsx:1477`](../../src/pages/SchoolDetail.tsx#L1477)
  where it links to an *internal* dossier, and is `role="img"`. Linking it outbound in one
  place and internally in another is exactly the inconsistency to avoid. Leave it alone.
- **`StickySchoolTitle`** — deliberately not a link (its own header comment says so). Not
  changed.
- **Home page and Compare page school names** — they link to internal dossiers, correctly.
- **The "More Charlotte-area schools" row** — internal links.
- **Deep links** (admissions page, athletics site). Homepage root only.
- **Adding crests for the five schools without one.**

## Steps

Two phases: step 5 adds two new user-facing `a11y` keys.

### Phase 1 — English

1. **Verify all twelve URLs live, then record it.** For each URL in the Context table run
   `curl -sS -o /dev/null -w '%{http_code} %{url_effective}\n' -L --max-time 20 <url>`.
   Expect `200`. If one redirects to a different host, **use the final host** and note it.
   If one fails, do not guess a replacement — leave that school's `homepageUrl` off
   entirely (the optional-field decision makes that render as plain text) and record it in
   Implementation notes. Then append a `## Homepage verification 2026-09-17` section to
   `source-material/branding/_shared/All Schools - Branding - Campus City and Address.md`
   with a `| school | url | status | checked |` table for all twelve, and add Trinity
   Episcopal's row to that file's main table (it is currently only in its own folder).

2. **Add `homepageUrl` to the `Brand` type.** In
   [`src/data/brands.ts`](../../src/data/brands.ts), add `homepageUrl?: string` to the
   `Brand` type (line ~57), and a header comment block in the file's existing style
   explaining: it is the school's own homepage root, shown as the link behind the dossier
   name and crest; optional, and a school without one renders as plain text rather than a
   broken link; it belongs here and not in `schools.json` because ingest rebuilds those
   records; and provenance is in `source-material/branding/_shared/`.

3. **Populate all twelve entries.** Add the verified `homepageUrl` to each of the twelve
   school objects in `BRANDS`. Do **not** add one to the `FALLBACK` return at
   [`brands.ts:220`](../../src/data/brands.ts#L220) — an unknown school has no known
   homepage.

4. **Link the `<h1>` in `SchoolDetail.tsx`.** At
   [line 564](../../src/pages/SchoolDetail.tsx#L564), keep `<h1 id="school-title">` exactly
   as it is and wrap only its text:

   ```tsx
   <h1 id="school-title">
     {brand.homepageUrl ? (
       <a
         className="school-title-link"
         href={brand.homepageUrl}
         target="_blank"
         rel="noreferrer noopener"
         aria-label={tr('a11y.schoolSiteLink', { school: school.name })}
       >
         {school.name}
       </a>
     ) : (
       school.name
     )}
   </h1>
   ```

   Add a comment above it naming the `StickySchoolTitle` constraint — the `id` stays on the
   `<h1>` and the anchor goes inside it.

5. **Link the crest.** At [lines 609-627](../../src/pages/SchoolDetail.tsx#L609), when
   **both** `brand.logo` and `brand.homepageUrl` are set, wrap the existing `<img>` in
   `<a className="dossier-crest-link" href={brand.homepageUrl} target="_blank"
   rel="noreferrer noopener" aria-hidden="true" tabIndex={-1}>`. Keep the `<img>` and all
   its attributes — `className="dossier-crest"`, `src`, `alt`, `width={1200}`,
   `height={800}` — unchanged. When `logo` is set but `homepageUrl` is not, render the bare
   `<img>` exactly as today.

   `aria-hidden` + `tabIndex={-1}` implement the duplicate-link decision: keyboard and
   screen-reader users get the one labelled link on the name.

6. **Add the two `a11y` keys to `src/locales/en.json` only.** In the `a11y` block
   (line ~462, alphabetical — it currently runs `crestAlt`, `switchTheme`, `themeDark`,
   `themeLight`, `viewingSchool`):
   - `"schoolSiteLink": "Visit the {{school}} website (opens in a new tab)"`
   - `"opensNewTab": "opens in a new tab"` — **only if** a second string is actually needed
     after step 4; if `schoolSiteLink` alone covers it, skip this key rather than shipping
     an unused one. `check:chrome` reports unused keys.

   Phase 2 translates these into the other nine catalogs.

7. **Add the CSS.** In [`src/index.css`](../../src/index.css), beside the
   `.dossier-header h1` rule (line ~740):

   ```css
   .school-title-link { color: inherit; text-decoration: none; }
   .school-title-link:hover { text-decoration: underline; }
   ```

   And for the crest wrapper, **move the flex/sizing properties up to the link** while
   leaving intrinsic sizing on the image (see the CLS note in Context):

   ```css
   .dossier-crest-link {
     flex: 0 0 auto;
     display: block;
     height: clamp(72px, 9vw, 104px);
     max-width: 40%;
     align-self: center;
   }
   .dossier-crest-link .dossier-crest { height: 100%; max-width: 100%; }
   ```

   Add a comment pointing at the CLS history in `.claude/plans/vitals.md` and `ccwrap.md`,
   stating that the reserved box must survive the wrapper.

8. **Write `scripts/check_schoolurls.mjs` and register it.** Modelled on
   [`scripts/check_college_urls.mjs`](../../scripts/check_college_urls.mjs), whose header
   comment explains the coverage stance to copy. It must:
   - Import `BRANDS` from `src/data/brands.ts` (plain Node 24 type-stripping; `brands.ts`
     has no `import.meta.glob`, so it imports cleanly — unlike the six `*Program.ts`
     registries).
   - Read the school list from `src/data/schools.json`, **never a hardcoded array** — the
     lesson `check:ranks` learned when a literal 9-entry array stopped covering two schools
     added after it.
   - **Fail (exit 1)** on: a malformed `homepageUrl` (not `https://`, has a path beyond
     `/`, has a query or fragment); two schools sharing a URL; a `homepageUrl` on a slug
     not in `schools.json`.
   - **Not fail** on a school with no `homepageUrl` — print an informational
     `linked N/12` line instead. Coverage is deliberately unasserted, for the reason
     `check_college_urls.mjs` documents: a gate nobody can get to zero stops being read
     (`CLAUDE.md` records that failure three times over).
   - Exit 2 on setup error.

   Add `"check:schoolurls": "node scripts/check_schoolurls.mjs"` to `package.json` scripts,
   and chain it into `"build"` immediately after `check:collegeurls`.

9. **Check whether `DATA-SCHEMA.md` needs a line.** `homepageUrl` is per-school brand
   config, the same class as `logo` and `welcomeVideoUrl`. Check whether
   [`scripts/gen_data_schema.mjs`](../../scripts/gen_data_schema.mjs) documents those two;
   if it does, add `homepageUrl` alongside them and run `npm run schema` +
   `npm run check:schema`. **If it does not document them, say so explicitly in the PR body
   rather than silently skipping** — per the standing rule in `CLAUDE.md`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version — specifically that the hover-underline cue is
discoverable enough on the `<h1>`, since that was a judgment call.

### Phase 2 — Every other locale

UI chrome only. **The research-prose overlay layer (`PROSE_TRANSLATED`) is NOT touched** —
this plan adds no `src/data/**` prose, so no extractor run, no overlay rebuild, no rollout
doc applies.

Scope is the nine non-English catalogs in [`src/locales/`](../../src/locales/), per
`TRANSLATED` in [`src/lib/i18n.ts:108`](../../src/lib/i18n.ts#L108): `es`, `bn`, `ht`,
`te`, `fr`, `fa`, `it`, `hi`, `ar`.

1. **Translate the new `a11y` key(s)** into all nine catalogs, keeping the key names and
   the `{{school}}` placeholder identical. Keep each in its catalog's existing `a11y` block
   and ordering.
2. **Keep `{{school}}` positioned naturally per language** — it interpolates a proper noun,
   so word order moves. Do not concatenate fragments.
3. **`ar` and `fa` are RTL.** The string is pure chrome with an interpolated proper noun
   and holds no figures, so no LRI/PDI isolate work applies — unlike the prose layer. State
   that in the PR body so a later reviewer does not go looking.
4. **Run `npm run check:chrome`** — it reads all ten catalogs and fails on a key present in
   `en` but missing elsewhere.

## Files touched

| File | Change |
|---|---|
| `src/data/brands.ts` | edit — add `homepageUrl?: string` to `Brand` + header comment; twelve values |
| `src/pages/SchoolDetail.tsx` | edit — link the `<h1>` text and wrap the crest `<img>` |
| `src/index.css` | edit — `.school-title-link` and `.dossier-crest-link` rules |
| `src/locales/en.json` | edit — new `a11y.schoolSiteLink` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — same key translated (Phase 2) |
| `scripts/check_schoolurls.mjs` | new — URL shape/uniqueness gate |
| `package.json` | edit — `check:schoolurls` script + chained into `build` |
| `source-material/branding/_shared/All Schools - Branding - Campus City and Address.md` | edit — verification table + Trinity row |
| `.claude/docs/DATA-SCHEMA.md` + `scripts/gen_data_schema.mjs` | edit — only if step 9 finds brand fields are documented |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean. (Use `tsc -b`, not `tsc --noEmit`; see the memory note.)
- [ ] `npm run check:schoolurls` — exits 0, prints `linked 12/12`.
- [ ] `npm run check:chrome` — the new `en` key is reported as present-in-`en`,
      awaiting-translation on **exit 0**, not as a broken promise.
- [ ] `npm run build` — succeeds with the new check chained in.
- [ ] **Negative test of the new checker.** Corrupt `brands.ts` — set one school's
      `homepageUrl` to `http://example.com/admissions?x=1` — confirm `check:schoolurls`
      exits **1** and that the message names the *shape* violation, not something else.
      Then `git diff` the file back. Corrupt the artifact under test, not an upstream
      input, and read *which* message printed.
- [ ] **Browser check, real headed browser** (Playwright per the memory note; do not use
      `networkidle` on school pages — it hangs). On **two** schools:
      - `/school/providence-day/` — **has** a crest. Confirm the `<h1>` name is a link, it
        hover-underlines, it opens `providenceday.org` in a new tab, and the crest is
        clickable to the same URL.
      - `/school/covenant-day/` — has **no** crest. Confirm the name still links and
        nothing else changed.
- [ ] **Sticky-nav regression check** — on `/school/providence-day/`, scroll until the
      `<h1>` passes under the sticky nav and confirm the school name still appears in the
      nav bar. This is the `id="school-title"` observer; nothing automated covers it.
- [ ] **Keyboard/a11y check** — Tab through the header. The crest link must be **skipped**
      (`tabIndex={-1}`), and the name link must announce the `schoolSiteLink` label. Assert
      on the accessibility tree, not on `innerText` — and make any text assertion
      case-insensitive (the memory note on non-Latin false-passes).
- [ ] **CLS check — the one that could regress.**
      `npm run check:vitals -- --route /school/providence-day/ --runs 5`. Compare against
      the same command on `main` **before** the change. The crest wrapper must not
      reintroduce the 0.35 shift. If it does, the flex properties did not transfer to
      `.dossier-crest-link` — fix the CSS, do not remove the crest link.
- [ ] `npm run check:seo` — the header changed; confirm no pre-rendered page fell under the
      byte floor.

### Phase 2 — Locales

- [ ] `npm run check:chrome` — exits 0 with the key present in all ten catalogs.
- [ ] `npx tsc -b` and `npm run build` — clean.
- [ ] **Browser check in two locales**, one RTL: load `/school/providence-day/?lang=ar` and
      `?lang=hi` (the locale key is `csc.lang` / `?lang=` — memory note). Confirm the
      `<h1>` link renders correctly and the `aria-label` is translated. In `ar`, confirm
      the header does not mis-lay-out around the link.
- [ ] `npm run check:runtime` and `npm run check:live` — should be unaffected (no prose
      overlay touched); run them to confirm the chrome edit did not disturb them.
- [ ] **No print-out required.** The rollout docs' print-out step guards prose-overlay and
      figure rendering, neither of which this plan touches.

## Risks

| Risk | Mitigation |
|---|---|
| Wrapping the crest `<img>` reintroduces the 0.35 CLS | Flex/sizing properties move to `.dossier-crest-link`; `check:vitals` is a required Phase-1 check, compared against `main` |
| The `<h1>` anchor breaks the `StickySchoolTitle` observer | Anchor goes **inside** the `<h1>`; `id` unmoved; explicit manual scroll check — nothing automated covers it |
| A homepage URL rots (school changes domain) | `check:schoolurls` guards shape and uniqueness but deliberately does **not** fetch — a network call in a build gate is flaky. Live status is recorded in `source-material/` with a date, re-verified when a school is touched |
| `charlottechristian.com` typo'd to `.org` | Step 1 verifies every URL live before it is written, and flags the `.com` explicitly |
| Two links to one target confuse screen readers | Crest link is `aria-hidden` + `tabIndex={-1}`; verified in the keyboard/a11y check |
| The hover-only cue is undiscoverable | That is precisely what the Phase-1 review gate is for; swapping in the `↗` is a one-line change at that point |

## Open questions

- **Does `gen_data_schema.mjs` document brand-config fields at all?** — **default:** if it
  documents `logo`/`welcomeVideoUrl`, add `homepageUrl` beside them and regenerate; if it
  does not, add nothing and state that explicitly in the PR body.
- **Should `a11y.opensNewTab` exist as a separate key?** — **default:** no. Ship only
  `schoolSiteLink`, which already carries the new-tab phrasing. Do not add an unused key.

## Implementation notes

### Phase 1 — deviations and findings

**Two open questions, both resolved to their stated defaults.**
`a11y.opensNewTab` was NOT added — `schoolSiteLink` already carries the new-tab
phrasing, and an unused key is reported by `check:chrome`. And
`gen_data_schema.mjs` DOES document brand-config fields: it derives the `Brand`
table by parsing the type, so `homepageUrl` appeared in `DATA-SCHEMA.md` on the
first `npm run schema` with no generator edit needed.

**All twelve URLs verified live; none changed.** Eleven returned 200 to a bare
`curl`. **Carmel Christian returned 503 — and is not down:** it answers 503 with a
zero-length body to curl's default UA and 200 to a browser UA, with
`Vary: User-Agent` on the response. That is UA-based bot filtering, and the apex
behaves identically. Recorded in the `_shared` branding file, because a future
re-verification pass running bare `curl` would otherwise read it as broken and
"fix" a URL that was never wrong. It is also the concrete reason
`check_schoolurls.mjs` makes no network call.

**The CSS moved `aspect-ratio` to the wrapper, which the plan's snippet omitted.**
Step 7 listed `flex`, `display`, `height`, `max-width` and `align-self` for
`.dossier-crest-link`. That is not sufficient: `aspect-ratio: 3/2` is what reserves
the box *before the PNG arrives*, which is the entire CLS fix. Without it the
wrapper has zero width until the image loads. `.dossier-crest-link` therefore
repeats `aspect-ratio` and `width: auto` too.

**User-requested change during the build:** the hover underline is drawn in the
school's own brand color rather than the text color, via
`text-decoration-color: var(--brand)` (plus 2px thickness and a 4px offset so a
thin accent stays visible under a 44px heading). `--brand` is already set per
school on `.school-page`, so this needs no per-school CSS and picks up a new
school's hex automatically. The name itself stays `color: inherit` — several brand
hexes are deep navies that would read as low-contrast body text at heading size.

**A second user-reported bug was fixed on this branch** (commit 2): sentence-length
financial-aid tags overlapping the card beside them on Charlotte Latin. Unrelated
to the link work but in the same header/card CSS surface. See that commit message
for the measurement; the fix is scoped to `.fa-box-head .tag-outline` because
`.tag-outline` is shared with eight components whose chips are correctly `nowrap`.

**A near-miss worth recording: `git checkout <file>` reverted uncommitted work.**
The plan's negative test says to corrupt `brands.ts` and "`git diff` the file
back". `git checkout src/data/brands.ts` was used — and because the file had not
yet been committed, it discarded the entire feature (the type change, the header
comment and all twelve URLs), not just the corruption. The checker then honestly
reported `linked 0/12`, which is what surfaced it. **Back up the file first, or
commit before a negative test.** The re-run used a scratchpad copy.

**Both negative tests pass on the right message and the right exit code.** A
malformed URL (`http://example.com/admissions?x=1`) exits 1 naming three distinct
shape violations; a duplicated URL exits 1 naming both schools. Note `npm run
<script> | tail` masks the exit code — `${PIPESTATUS[0]}` or a direct `node` call
is needed to read it.

### Verification results

- `npx tsc -b` — clean.
- `npm run check:schoolurls` — exit 0, `linked 12/12 schools`.
- `npm run check:chrome` — exit 0 (it audits skip-field promises, not new keys).
- `npm run check:schema` — up to date after `npm run schema`.
- `npm run build` — succeeds with `check:schoolurls` chained in after
  `check:collegeurls`.
- `npm run check:seo` — exit 0; no pre-rendered page fell under the byte floor.
- **CLS, measured against `main` in a separate worktree** — `/school/providence-day/`
  desktop 0.0000 on main vs 0.0016 on the branch; both GOOD, nowhere near the 0.35
  regression. `/school/charlotte-latin/` 0.0012 after the tag fix.
- **Browser (headed Chromium via Playwright), providence-day + covenant-day** —
  name link present/labelled/`target=_blank`/`rel=noopener`; `id="school-title"`
  still on the `<h1>`; crest link present only where a crest exists, pointing at
  the same URL, `aria-hidden` and skipped by Tab; crest wrapper reserves a real
  156x104 box at `aspect-ratio: 3/2`, `flex: 0 0`; hover underline resolves to each
  school's own brand hex (`#be123c`, `#002855`).
- **Sticky-nav observer** — `.nav-school` is hidden at the top, gains `show` once
  the `<h1>` scrolls out, carries the school name, and hides again on scroll back.
  Verified on both schools; the anchor-inside-the-`<h1>` constraint holds.
- **Chip sweep, all twelve school pages with every `<details>` expanded** — 4,729
  chips, 0 overflowing (2 before the fix), 4 wrapping to a second line (exactly the
  sentence-length ones).

### Phase 2 — deviations and findings

**No deviations.** One key, `a11y.schoolSiteLink`, into the nine non-English
catalogs, inserted after `crestAlt` to hold each catalog's existing alphabetical
`a11y` ordering. `a11y.opensNewTab` was never created (Phase 1's resolved
default), so there was nothing else to translate. No prose overlay, extractor or
rollout doc was touched, as the plan specified.

**`{{school}}` moves as expected, and two locales put it first.** `bn`
(`{{school}}-এর ওয়েবসাইট দেখুন`), `te` and `hi` lead with the school name because
the verb is final; `es`/`fr`/`it`/`ht`/`ar`/`fa` lead with the verb. Nothing is
concatenated — each is one interpolated string.

**RTL needed no isolate work, as the plan predicted.** `ar` and `fa` hold no
figures; the one embedded strong-LTR run is the school's own proper noun, which
the bidi algorithm places correctly with no LRI/PDI. Confirmed in the browser: the
`<h1>` computes `direction: rtl` and still sits inside its header box
(`h1.right=1084 <= header.right=1225`), so the link introduces no RTL overflow.

**`check:chrome` passes but does NOT gate this key.** It audits skip-field
promises, not new catalog keys (recorded in the `chrome-check-is-not-a-new-key-gate`
memory note) — its ✓ here is real but says nothing about the nine insertions. The
actual evidence is the browser sweep below plus a parse-and-assert pass over all
ten catalogs: key present exactly once, inside `a11y`, `{{school}}` intact.

**Two Playwright API notes for the next locale pass.** `page.accessibility` no
longer exists in the installed version — use `locator.ariaSnapshot()`, which still
reads the computed role and name rather than `innerText` (the non-Latin
case-false-pass trap). And a browser script kept in the scratchpad cannot resolve
`playwright`; it has to run from the repo root.

### Phase 2 verification results

- **Browser, headed Chromium, all TEN locales on `/school/providence-day/`** —
  computed ARIA role `link`; `aria-label` translated in each, carrying the school
  name, with no raw `{{…}}` or `a11y.` key leaking; `href` `https://www.providenceday.org/`,
  `target=_blank`, `rel=noreferrer noopener`; `id="school-title"` still on the
  `<h1>`; crest link `aria-hidden=true`, `tabIndex=-1`, same href, reserving a real
  156x104 box; crest absent from the tab order in every locale.
- `npm run check:chrome` — exit 0 (skip-field promises; see the caveat above).
- `npx tsc -b` — clean.
- `npm run build` — exit 0, with `check:schoolurls`, `check:seo`, `check:schema`
  and `check:news` all green in the chain.
- `npm run check:runtime` — exit 0, all 9 prose locales resolve (12,924 entries
  each), confirming the chrome edit disturbed no overlay.
- No print-out, per the plan: no prose overlay or figure rendering is touched.
