---
name: schoolPageTitle
title: Show the school name in the sticky header once the school title scrolls out of view
status: english-done
phases: 2
created: 2026-08-07
branch: feat/school-page-title
prs: []
---

# Show the school name in the sticky header once the school title scrolls out of view

## Goal

On a school page, the `<h1>` with the school name sits in the `.dossier-header` block at
the very top. As soon as the reader scrolls into the research areas, that name disappears
under the sticky `.topnav` and there is nothing on screen saying which of the six schools
they are reading. This plan appends the school name to the sticky header — after the
existing "Charlotte School Insights" wordmark, separated by a divider — the moment the
`<h1>` leaves the viewport, and removes it again when the `<h1>` scrolls back in.

We know it worked when: loading `/school/charlotte-christian/` shows the header unchanged
(brand only); scrolling past the dossier header makes `Charlotte School Insights │
Charlotte Christian School` appear in the sticky bar; scrolling back up removes it; and
Home/Compare pages never show it at any scroll position.

## Context

Everything needed already exists — this is a small amount of new state plus one new
element and its CSS. No new data, no new topic, no new card.

**The sticky header** is [src/App.tsx:35-93](src/App.tsx#L35-L93) — a single `<nav
className="topnav">` rendered by `App`, shared by all three routes. Its CSS is
[src/index.css:146-158](src/index.css#L146-L158): `position: sticky; top: 0; z-index: 20`,
a flex row with `.brand` on the left and `.nav-actions` on the right. The brand block is:

```tsx
<a className="brand" href={toHome()} …>
  {logoOk ? <img … className="brand-logo" /> : <span className="brand-mark">CLT</span>}
  <span className="brand-name">{t('nav.brandName')}</span>
</a>
```

`.brand` already carries `min-width: 0` and `.brand-name` already ellipsises
(`overflow: hidden; text-overflow: ellipsis; white-space: nowrap`) — the comment at
[src/index.css:158-159](src/index.css#L158-L159) records that this exists precisely so the
nav cannot be forced wider than the viewport. The new element must live under the same
discipline.

**App already knows the school.** `App` calls `useRoute()` and, at
[src/App.tsx:105](src/App.tsx#L105), already does `route.name === 'school' ? brandOf(route.slug)…`
— so the slug is in hand at the header's own level. `schoolBySlug(slug)` is exported from
[src/lib/manifest.ts:23](src/lib/manifest.ts#L23) and returns the record whose `.name` is
exactly what `SchoolDetail` renders in the `<h1>`
([src/pages/SchoolDetail.tsx:428](src/pages/SchoolDetail.tsx#L428)). **No context, no
prop-drilling, and no lifting state out of `SchoolDetail` is required** — the header can
derive the name itself. Do not add a React context for this.

**The nearest analogous feature is `BackToTop`** ([src/components/BackToTop.tsx](src/components/BackToTop.tsx)):
a small component owning one boolean, driven by a scroll listener, rendered from `App`,
and CSS-faded rather than unmounted. Follow its shape — small component, own the boolean
internally, `App` passes only what it can't derive. Where it differs: `BackToTop` uses a
fixed `window.scrollY > 400` threshold, which is wrong here because the dossier header's
height varies with school (crest presence, podcast line, chip wrapping) and viewport. Use
an `IntersectionObserver` on the actual `<h1>` instead, so the swap happens exactly when
the title crosses under the nav.

**The observed element needs a stable hook.** `SchoolDetail`'s `<h1>` at
[src/pages/SchoolDetail.tsx:428](src/pages/SchoolDetail.tsx#L428) has no id or class. Give
it `id="school-title"`. The page already uses plain `document.getElementById` for
navigation ([src/pages/SchoolDetail.tsx:295-298](src/pages/SchoolDetail.tsx#L295-L298)),
so an id-based lookup matches the existing idiom. Note the hash-router caveat recorded in
that same helper — a bare `#…` href would be parsed as a route — but this is an `id` used
only as an observer target, never as an href, so it is unaffected.

**Timing trap: the `<h1>` is not in the DOM when `App` first mounts.** `SchoolDetail`
renders behind a `ready` gate and, on a cold load, returns placeholders before the real
content ([src/pages/SchoolDetail.tsx:355-399](src/pages/SchoolDetail.tsx#L355-L399)); the
route can also change under a mounted `App`. A single `useEffect` that runs
`getElementById('school-title')` once will therefore find `null` on first load. The header
must re-look-up when the route changes AND survive the element appearing later — see step 3
for the required approach.

**Sticky-nav geometry.** The topnav's height is not exposed as a CSS variable; the page
approximates it with `scroll-margin-top: 80px`
([src/index.css:757](src/index.css#L757), [:779](src/index.css#L779)). The observer's
`rootMargin` top offset should match that convention so the swap fires as the title passes
*under the nav*, not when it leaves the raw viewport.

**Print.** `@media print` already forces `.topnav { position: static }`
([src/index.css:2226-2232](src/index.css#L2226-L2232)) and the dossier header prints in
full, so the frozen name would be a duplicate of the `<h1>` on the printed page. Hide it in
print.

**i18n.** The school name itself is proper-noun research data and is NOT translated — it
comes from the manifest, exactly as the `<h1>` does. But the header needs an
`aria-label`/screen-reader treatment, and a divider, and those are UI chrome, so any new
string is a key in `src/locales/*.json` per the standard. `TRANSLATED` in
[src/lib/i18n.ts](src/lib/i18n.ts) currently covers ten locales — the ten files in
[src/locales/](src/locales/): `en, es, bn, ht, te, fr, fa, it, hi, ar`. **Read the list
from `TRANSLATED` at implementation time rather than trusting this count.**

**RTL.** `fa` and `ar` are RTL. The divider between brand and school name is a
bidi-neutral character; the school name is strong-L Latin. Per the standing rule recorded
in `CLAUDE.md`, strong-L Latin identifiers need no isolate — but a neutral separator
sitting between an RTL string and a Latin string can reorder. Use a CSS border as the
divider rather than a literal `│`/`·` character, which sidesteps bidi entirely and is also
how the rest of the app draws separators.

## Decisions

- **The school name is appended after the brand name, not substituted for it** — the
  user chose this over replacing the wordmark; site identity stays visible.
- **Not clickable** — the user chose a pure orientation label. Do not wrap it in an
  anchor or add a scroll-to-top handler; `BackToTop` already covers that need, and a
  second tap target immediately beside the brand home link invites mis-taps.
- **Rendered inside `.topnav` but OUTSIDE the `.brand` anchor** — `.brand` is a link to
  Home; putting non-clickable text inside it would make the school name part of the link's
  hit area and its accessible name.
- **Driven by `IntersectionObserver` on the `<h1>`, not a `scrollY` threshold** — the
  dossier header's height varies per school and viewport, so any fixed pixel threshold is
  wrong for some school somewhere.
- **The header derives the school name itself from `route.slug` + `schoolBySlug`** — no
  context, no prop drilling, no state lifted out of `SchoolDetail`. `App` already computes
  `brandOf(route.slug)` on the same line.
- **Hidden below 700px** — at mobile widths the brand wordmark, Compare, Contact, the
  language picker and the theme toggle already compete for the row; a second string would
  force the brand name to ellipsise to nothing. Chosen over shrinking the brand because
  the site wordmark is the one thing that must never disappear.
- **The divider is a CSS `border-left`, not a text character** — avoids bidi reordering in
  `fa`/`ar` and matches how separators are drawn elsewhere.
- **CSS opacity/transform transition, not conditional unmount** — mirrors `BackToTop`
  ([src/index.css:2146](src/index.css#L2146)), and avoids a layout jump in the nav row each
  time the boolean flips. `prefers-reduced-motion` is already globally honoured
  ([src/index.css:2184](src/index.css#L2184)).
- **Two phases** — it adds at least one new user-facing chrome string (the a11y label), so
  the standing English-first rule applies.

## Approvals needed

**None.** This is a direct UI request from the user, not an ingestion pass, so the
UX-design approval gate does not apply (see the scope carve-out in `CLAUDE.md`: "any direct
request to add or restyle UI" needs no advance approval). It adds no card, section, stat
tile, Compare row, metric key or topic.

## Out of scope

- Any change to the dossier header itself, its `<h1>` styling, or the crest.
- The Compare page (no single-school title to mirror) and Home.
- Making the frozen name clickable or adding a progress indicator / breadcrumb.
- Showing the *current research area* in the header — a plausible follow-up, and
  `activeSlug` already exists in `SchoolDetail`, but it is not what was asked and it would
  need the state lifted, which this plan deliberately avoids.
- Any change to `BackToTop`.

## Steps

### Phase 1 — English

1. **Give the school `<h1>` a stable id** — in
   [src/pages/SchoolDetail.tsx:428](src/pages/SchoolDetail.tsx#L428), change
   `<h1>{school.name}</h1>` to `<h1 id="school-title">{school.name}</h1>`. Add a one-line
   comment saying the sticky header observes this element, so it is not renamed casually.

2. **Add the a11y string to `src/locales/en.json`** — under the existing `a11y` block
   (which already holds `crestAlt`, `switchTheme`, …), add:

   ```json
   "viewingSchool": "Currently viewing {{school}}"
   ```

   Interpolation, not concatenation, per the i18n standard. English only in this phase.

3. **Create `src/components/StickySchoolTitle.tsx`** — a small component in the shape of
   [BackToTop.tsx](src/components/BackToTop.tsx).

   - Props: `{ name: string | null }`. A `null`/empty name means "not on a school page" —
     the component returns `null` immediately, so `App` needs no conditional of its own
     beyond computing the name.
   - State: `const [shown, setShown] = useState(false)`.
   - Effect, keyed on `name` (so a route change re-runs it):
     - Reset `setShown(false)` at the top of the effect — a fresh school page always starts
       with the title visible.
     - Look up `document.getElementById('school-title')`. **It may not exist yet** (the
       cold-load `ready` gate, per Context). Handle this: if the element is missing, use a
       `MutationObserver` on `document.body` (`childList: true, subtree: true`) that
       watches for it to appear, then attaches the `IntersectionObserver` and disconnects
       itself. Clean up both observers in the effect's return.
     - The `IntersectionObserver`: `new IntersectionObserver(([entry]) =>
       setShown(!entry.isIntersecting), { rootMargin: '-80px 0px 0px 0px', threshold: 0 })`.
       The `-80px` top inset matches the `scroll-margin-top: 80px` the page already uses for
       the sticky nav, so the swap fires as the title slides under the bar rather than when
       it clears the raw viewport.
   - Render (always render the element when `name` is non-null; CSS controls visibility, as
     `BackToTop` does):

     ```tsx
     <span
       className={`nav-school ${shown ? 'show' : ''}`}
       aria-hidden={!shown}
       aria-label={t('a11y.viewingSchool', { school: name })}
     >
       {name}
     </span>
     ```

     Include a header comment in the same voice as `BackToTop`'s, stating what it does and
     that it is deliberately not a link.

4. **Render it from `App.tsx`** — in [src/App.tsx](src/App.tsx):
   - Import `schoolBySlug` alongside the existing `topics, schools, brandOf` import from
     `./lib/manifest.ts` ([src/App.tsx:8](src/App.tsx#L8)), and import the new component.
   - Derive the name once:
     `const schoolName = route.name === 'school' ? (schoolBySlug(route.slug)?.name ?? null) : null`
   - Place `<StickySchoolTitle name={schoolName} />` inside `<nav className="topnav">`,
     **immediately after the closing `</a>` of `.brand`** and before
     `<div className="nav-actions">` ([src/App.tsx:53-54](src/App.tsx#L53-L54)). Not inside
     `.brand` — see Decisions.

5. **Style `.nav-school` in `src/index.css`** — add a block adjacent to the `.brand-name`
   rules ([src/index.css:171](src/index.css#L171)) so the nav styles stay together:

   - `min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` —
     the same discipline `.brand-name` already carries, so the nav can never exceed the
     viewport.
   - Typography matching the brand: `font-family: var(--heading); font-weight: 600;`
     with a slightly smaller `font-size` (~16px vs the brand's 18px) and `color: var(--muted)`
     so it reads as secondary to the wordmark.
   - The divider: `border-left: 1px solid var(--border); padding-left: 12px; margin-left: 4px;`
     — a border, not a character (see Decisions).
   - Hidden-until-scrolled, mirroring `.back-to-top`
     ([src/index.css:2146](src/index.css#L2146)): default `opacity: 0` plus a small
     `transform` offset and `pointer-events: none`; `.nav-school.show` sets `opacity: 1`
     and clears the transform. Use a `transition` on `opacity`/`transform` only — never on
     `width`, which would animate a reflow of the whole nav row.
   - `@media (max-width: 700px) { .nav-school { display: none; } }` — per Decisions.
   - Add `.nav-school` to the existing `@media print` hidden-chrome list alongside
     `.btn.contact` / `.navlink` ([src/index.css:2205-2215](src/index.css#L2205-L2215)).

6. **Typecheck, lint and build** — see Verification below.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Commit
Phase 1 to the branch. Nothing below runs until the user confirms the English wording and
the scroll behaviour are what they want.

### Phase 2 — Every other locale

This is **UI chrome only** — the school name is manifest data and is never translated, so
the overlay layer (`PROSE_TRANSLATED`) is NOT involved here. Scope is the
`src/locales/*.json` catalogs.

1. **Read `TRANSLATED` in [src/lib/i18n.ts](src/lib/i18n.ts)** and list the actual locale
   files in [src/locales/](src/locales/). Do not trust the count written in this plan.

2. **Add `a11y.viewingSchool` to every non-English catalog** — translate the value, keep
   the key and the `{{school}}` placeholder identical in every file. The placeholder must
   survive verbatim; a translated or dropped placeholder renders the literal token.

3. **Word-order note for the translator pass** — `{{school}}` is a proper noun in Latin
   script that is never localized. Position it naturally for each language rather than
   copying the English order; in RTL locales (`fa`, `ar`) it is a strong-L run inside an
   RTL sentence and needs no isolate, per the standing rule in `CLAUDE.md`. This is an
   `aria-label` and is never rendered visually, so no bidi/figure concerns apply beyond
   that.

4. **No figure, currency, or overlay work applies** — this plan introduces no numbers, no
   money, and no `src/data/**` prose. `check:sepdrift`, `check:money`, `check:currency` and
   `check:runtime` are unaffected; run them only as regression insurance.

## Files touched

| File | Change |
|---|---|
| `src/components/StickySchoolTitle.tsx` | new — observes the school `<h1>`, toggles the header label |
| `src/App.tsx` | edit — derive the school name from the route; render the component inside `.topnav` |
| `src/pages/SchoolDetail.tsx` | edit — `id="school-title"` on the `<h1>` |
| `src/index.css` | edit — `.nav-school` rules, 700px breakpoint, print hide |
| `src/locales/en.json` | edit — Phase 1: add `a11y.viewingSchool` |
| `src/locales/*.json` (9 others) | edit — Phase 2: translate that key |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — clean
- [ ] `npm run check:translations` — passes (English-only additions may flag missing keys
      in other locales; if the script treats that as a failure, note the expected diff and
      resolve it in Phase 2 rather than pre-translating)
- [ ] `npm run build` — succeeds, including the chained `prerender` + `seo:files`
- [ ] `npm run check:seo` — passes; this change touches the shared header, which is part of
      every pre-rendered page's markup

**Browser check (required — this is a pure render-layer change, and this repo's standing
lesson is that render-layer defects survive every automated check):**

- [ ] `npm run dev`, open `/school/charlotte-christian/`. At the top: header shows the
      brand only, no school name.
- [ ] Scroll down past the dossier header — `Charlotte School Insights │ Charlotte
      Christian School` appears; scroll back up — it disappears. The transition is a fade,
      with no jump or reflow of `Compare` / `Contact us` / the language picker.
- [ ] **Repeat on Charlotte Latin** — it exercises different header content (crest, chip
      wrapping) and therefore a different dossier-header height, which is the whole reason
      for the observer over a fixed threshold.
- [ ] **Hard-reload deep into the page** (scroll down, then refresh) — this hits the cold
      `ready` gate where the `<h1>` does not exist at mount. Confirm the label still
      appears, i.e. the `MutationObserver` fallback in step 3 works.
- [ ] **Navigate school → Home → Compare → school** without a reload. The label must be
      absent on Home and Compare at every scroll position, and must reset correctly on the
      second school page.
- [ ] Narrow the window below 700px — the label is gone and the brand wordmark still fits.
- [ ] Widen to ~1000px with the language set to a long-label locale — the nav does not
      wrap or overflow horizontally.
- [ ] Print preview of a school page — the label does not appear.
- [ ] Toggle dark mode — `var(--muted)` / `var(--border)` resolve correctly in both themes.

### Phase 2 — Locales

- [ ] `npm run check:translations` — every locale has `a11y.viewingSchool`, no key drift
- [ ] `npx tsc --noEmit` and `npm run build` — clean
- [ ] Regression insurance (this plan adds no prose/figures, so these should be unchanged):
      `npm run check:runtime`, `npm run check:sepdrift`, `npm run check:money`
- [ ] Browser: switch to `fa` and `ar`, scroll a school page — the label sits on the
      correct side of the RTL nav row and the CSS `border-left` divider renders on the
      expected edge. **Check this specifically:** `border-left` is physical, so in RTL it
      lands on the wrong side; if it does, switch to the logical property
      `border-inline-start` (and `padding-inline-start` / `margin-inline-start`).
- [ ] Screen-reader spot-check in one non-English locale that `aria-label` reads the
      translated sentence with the school name interpolated.

## Risks

| Risk | Mitigation |
|---|---|
| The `<h1>` is absent at mount on a cold load, so the observer never attaches and the label never appears | The `MutationObserver` fallback in step 3; explicitly covered by the hard-reload-deep-in-page browser check |
| The label's appearance reflows the nav and shifts `Compare` / `Contact us` — a CLS regression on a site with a known open CLS issue | Transition `opacity`/`transform` only, never `width`; the element is always rendered (not mounted on scroll) so it reserves its own space from first paint; verify no shift in the browser check |
| `border-left` renders on the wrong edge in `fa`/`ar` | Explicit RTL check in Phase 2 verification, with `border-inline-start` as the named fix |
| Long school names + a long-label locale overflow the nav | `min-width: 0` + ellipsis on `.nav-school`, hidden below 700px, plus the wide/long-locale browser check |
| The id `school-title` is renamed or removed later, silently breaking the header | Comment at both the `<h1>` (step 1) and in the component (step 3) naming the other side |

## Open questions

- **Should the school's brand color or crest appear beside the frozen name?** Not asked
  for, and it would compete with the logo plate already in the nav. **Default:** no — text
  only, as specified. Easy to add later if the user wants it after seeing Phase 1.
- **Exact font size of the frozen name relative to the 18px brand name.** **Default:**
  ~16px, `color: var(--muted)`, so it reads as secondary. Tune during the English review if
  it looks off.
