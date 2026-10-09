---
name: photolightbox
title: Click-to-enlarge photo viewer (modal lightbox) for every photo surface — sports facilities, arts cards, summer band
status: implemented
phases: 2
created: 2026-10-09
branch: feat/photolightbox
prs: [336]
---

# Click-to-enlarge photo viewer

## Goal

Today every research photo is a small cropped thumbnail (sports facilities are 170px tall,
`object-fit: cover`), so a parent cannot see the venue properly. Clicking or tapping a photo
should open a modal that shows the **whole, uncropped image** as large as the screen allows,
with its caption and credit, closable by ✕, Escape or a click on the backdrop, and with
previous/next arrows when the photo belongs to a group. It applies to all three photo
surfaces: sports **Facilities**, the **Arts** card photos and the **Summer Programs** photo
band. Done means: any photo on a school page opens, reads clearly, navigates and closes by
mouse, keyboard and touch, in all ten locales including RTL.

## Context

Three photo surfaces exist, each rendering a `<figure><img/><figcaption/></figure>` with no
click behaviour:

| Surface | Component | Data type | Thumb CSS | Live data |
|---|---|---|---|---|
| Sports → Facilities | `FacilitiesBody` in `src/components/SportsProgram.tsx` (~line 582–603), `src={assetUrl(p.src)}`, `alt={p.name}` | `FacilityPhoto` in `src/data/sportsProgram.ts:294` — `src, name, meta?, caption?, credit?` | `.sports-photo img` in `src/index.css` (~3182): 170px tall, cover | 16 photos across 6 schools (Cannon, Charlotte Christian, Charlotte Latin, Country Day, Providence Day, Davidson Day), groups of 2–3 |
| Arts cards | private `Photo` in `src/components/ArtsProgram.tsx:72`, used at lines ~118, ~169, ~282 (one photo per card) | `ArtsPhoto` in `src/data/artsProgram.ts:57` — `src, name, caption?, credit?` | `.arts-photo img` (~3395): 200px tall, cover | 7 photos: Cannon, Charlotte Latin, Country Day |
| Summer photo band | exported `SummerPhotoBand` in `src/components/SummerPrograms.tsx:180`, rendered at `src/pages/SchoolDetail.tsx:1262`; note `src={p.src}` with **no** `assetUrl` | `SummerPhoto` in `src/data/summerPrograms.ts:218` — `src, caption, alt` | `.su-photo img` (~5243): 4:3, cover, **grayscale duotone filter** | **No school has summer photos today** — wired but data-empty |

Image files live in `public/facilities/` and `public/arts/`. Measured sizes: facilities are
**1200px** on the long edge (one, `cannon-randy-marion-field.jpg`, is portrait 900×1200);
arts are 1600px except `cannon-ctc-production.png` (800×640) and
`charlotte-country-day-anastasia.jpg` (2025×2025). So the existing files are already much
sharper than the thumbnails show them, and the modal can show the **same file** — it is
already in the browser cache from the thumbnail, so it opens instantly.

**No modal exists anywhere in the app.** The nearest overlay patterns are
`src/components/LanguagePicker.tsx` (~line 29) and `src/components/PodcastDeepDive.tsx`
(~line 58): both close on Escape and return focus to their trigger via a `keydown` listener
in a `useEffect`. Follow that focus-return convention. The highest z-index in the CSS is 200
(`.lang-panel`); the site nav is sticky.

Photo `name` / `caption` / `credit` / `meta` / `alt` are research data and already arrive
localized from the overlay layer (or are deliberately kept in English) by the time the
component sees them — the modal reuses those same values and adds **no prose**. The only
new text is UI chrome (button labels, counter).

RTL: `src/lib/i18n.ts:410` sets `<html dir="rtl">` for `fa` and `ar`. `isRtl()` in
`src/lib/format.ts:26` is module-private; read `document.documentElement.dir === 'rtl'`
directly rather than exporting it.

## Decisions

- **Native `<dialog>` + `showModal()`**, no new dependency — it puts the modal in the top
  layer (above the sticky nav whatever its z-index), traps focus, makes the page inert, and
  fires `cancel` on Escape. A lightbox library is not worth a dependency for this.
- **One shared component, `src/components/PhotoViewer.tsx`**, used by all three surfaces —
  the user asked for all photo surfaces; one component keeps them behaving identically.
- **Mount the `<dialog>` only while open** (render `null` when `index === null`, call
  `showModal()` in a `useEffect` after mount). Prerendered HTML therefore gains no dialog
  markup, and `check:seo` byte counts are unaffected.
- **Grouping:** Facilities = one group per school (prev/next across its 2–3 photos); Summer
  band = one group; each Arts card = a single photo (no arrows, no counter). Arrows and the
  "2 of 3" counter render only when the group has more than one photo.
- **Show the photo un-cropped and un-filtered.** The modal uses `object-fit: contain` and
  does **not** apply the summer duotone `filter` — the point of enlarging is to see the real
  photo.
- **Never upscale past natural size.** `max-width: 100%; max-height: …; width: auto;
  height: auto` on the modal image, so an 800px PNG stays crisp rather than blurring at 1400px.
- **Same `src` as the thumbnail**, resolved exactly as each surface already resolves it
  (`assetUrl(...)` for facilities and arts; `p.src` as-is for summer). Do not "fix" the
  summer `src` in this plan — `vite.config.ts` has `base: '/'`, so it works, and changing it
  is unrelated.
- **The trigger is a `<button type="button">` wrapping the `<img>`**, not an `onClick` on the
  image — keyboard and screen-reader users must be able to open it. The existing
  `.sports-photo img` / `.arts-photo img` / `.su-photo img` selectors still match because
  the `<img>` stays a descendant, so thumbnails look identical. Affordance: `cursor:
  zoom-in`, a small magnifier glyph in the corner on hover/focus, and a visible focus ring.
- **Close on:** the ✕ button, Escape (native `cancel`), and a click on the backdrop (a
  click whose `target` is the `<dialog>` element itself — style the dialog so the visible
  panel is an inner element and the dialog box covers the viewport).
- **Keyboard:** ArrowLeft / ArrowRight step through the group, wrapping at the ends. **In
  RTL, swap them** (ArrowLeft = next) and mirror the arrow glyphs, so "next" always points
  in the reading direction.
- **Focus:** focus the ✕ button on open; on close, explicitly `focus()` the trigger button
  that opened it (the LanguagePicker convention — do not rely on browser focus restore).
- **Scroll lock:** add class `photo-viewer-open` to `<html>` while open
  (`overflow: hidden`), removed on close and on unmount.
- **Class prefix `pv-`** (`.pv-dialog`, `.pv-panel`, `.pv-img`, `.pv-nav`, `.pv-close`,
  `.pv-caption`, `.pv-count`) and `.photo-zoom` for the trigger. **Never an `ad-` prefix** —
  EasyList hides those (see memory `never-use-ad-class-prefix`).
- **Motion:** a short fade/scale-in on open, disabled under `prefers-reduced-motion: reduce`
  (both existing `@media (prefers-reduced-motion: reduce)` blocks are precedent).
- **Print:** the dialog is never printed — add `.pv-dialog { display: none }` and drop the
  zoom glyph inside `@media print`.
- **No analytics event.** Not requested.
- **No UX approval gate.** This is a direct user request to add UI, which `CLAUDE.md`'s UX
  standard exempts; it adds no card, section, Compare row or data field. No
  `DATA-SCHEMA.md` change (no data types change).

## Approvals needed

None. (Direct UI request — exempt from the UX-design gate. No new dependency, no data, no
deploy. The usual English review between phases still applies.)

## Out of scope

- Sourcing higher-resolution originals. The modal shows the files we have (mostly 1200–1600px).
- Pinch-zoom / pan inside the modal, and swipe gestures. Arrow buttons work on touch.
- Photos outside the three research surfaces: Latest News thumbnails (they link off-site to
  the article), logos, OG images.
- Changing thumbnail sizes, crops or the duotone treatment on the page itself.
- Adding summer photo data (no school has any yet).

## Steps

### Phase 1 — English

1. **Branch.** `git checkout -b feat/photolightbox` from an up-to-date `main`.

2. **Add the chrome keys to `src/locales/en.json` only**, as a new top-level
   `"photoViewer"` object:
   ```json
   "photoViewer": {
     "open": "Enlarge photo: {{name}}",
     "close": "Close",
     "previous": "Previous photo",
     "next": "Next photo",
     "position": "{{current}} of {{total}}",
     "dialogLabel": "Photo viewer"
   }
   ```
   `position` uses plain interpolation, not `count` — it is not a plural (and Arabic's
   `_two` form would swallow `{{count}}`; see memory `arabic-dual-absorbs-numeral`).

3. **Create `src/components/PhotoViewer.tsx`** exporting:
   - `type ViewerPhoto = { src: string; alt: string; title?: string; meta?: string; caption?: string; credit?: string }`
     — `src` already resolved (callers pass `assetUrl(...)` themselves).
   - `function PhotoZoomButton({ label, onOpen, buttonRef?, children })` — a
     `<button type="button" className="photo-zoom" aria-label={t('photoViewer.open', { name: label })} aria-haspopup="dialog">`
     wrapping `children` (the `<img>`) plus an `aria-hidden` magnifier SVG
     (`.photo-zoom-glyph`).
   - `function PhotoViewer({ photos, index, onIndexChange, onClose })` — renders `null`
     when `index === null`; otherwise a `<dialog className="pv-dialog" aria-label={t('photoViewer.dialogLabel')}>`
     containing `.pv-panel` → `.pv-close` (✕, `aria-label` close), `.pv-stage` with the
     `<img className="pv-img" src alt>` and, when `photos.length > 1`, `.pv-nav.pv-prev` /
     `.pv-nav.pv-next` buttons; then a `<figcaption className="pv-caption">` mirroring the
     thumbnail caption (bold `title`, ` · meta`, muted `caption`, muted `credit`) and, when
     `photos.length > 1`, `.pv-count` with `t('photoViewer.position', { current: index + 1, total })`.
     Run `title`/`caption`/`meta` through `localizeMoneyText` where the thumbnail caption
     already does (check each surface; facilities `meta` like `'4,100 sq ft'` is rendered raw
     today — match the thumbnail exactly, do not add or remove localization).
   - Behaviour inside `PhotoViewer`: `useEffect` on open → `dialogRef.current.showModal()`,
     add `photo-viewer-open` to `document.documentElement.classList`, focus `.pv-close`;
     cleanup removes the class. `onCancel` (Escape) → `preventDefault()` then `onClose()`.
     `onClick` with `e.target === e.currentTarget` → `onClose()`. `onKeyDown` handles
     ArrowLeft/ArrowRight with wrap-around, swapped when
     `document.documentElement.dir === 'rtl'`.
   - A small hook `usePhotoViewer()` returning `{ index, open(i, triggerEl), close, setIndex }`
     that remembers the trigger element and calls `.focus()` on it after closing — so each
     surface needs only a few lines.

4. **Wire Facilities** — in `FacilitiesBody` (`src/components/SportsProgram.tsx`), build
   `ViewerPhoto[]` from `data.photos` (`src: assetUrl(p.src)`, `alt: p.name`, `title: p.name`,
   `meta`, `caption`, `credit`), wrap each `<img>` in `PhotoZoomButton`, and render one
   `<PhotoViewer>` after the `.sports-photos` grid. Keep the `<figcaption>` outside the button.

5. **Wire Arts** — in the private `Photo` component (`src/components/ArtsProgram.tsx:72`),
   use `usePhotoViewer()` locally (hooks must run before the `if (!photo) return null` —
   move the early return below the hook call), wrap the `<img>`, render a single-photo
   `<PhotoViewer>`. All three call sites are covered by that one change.

6. **Wire Summer** — in `SummerPhotoBand` (`src/components/SummerPrograms.tsx:180`), same
   pattern with `alt: p.alt`, `caption: p.caption`, no title/credit; keep the early
   `return null` *after* the hook call. `src` stays `p.src`.

7. **CSS in `src/index.css`**, in a new block after the facilities section (~3200), with a
   header comment naming this plan:
   - `.photo-zoom` — button reset (`display:block; width:100%; padding:0; border:0;
     background:none; cursor:zoom-in; position:relative`), `:focus-visible` outline using an
     existing token (`var(--brand)` or `var(--text)`), and `.photo-zoom-glyph` absolutely
     positioned in the bottom-inline-end corner, `opacity:0` → `1` on `:hover` /
     `:focus-visible`.
   - `.pv-dialog` — `border:0; padding:0; max-width:none; max-height:none; width:100vw;
     height:100dvh; background:transparent; display:grid; place-items:center`;
     `.pv-dialog::backdrop { background: rgb(0 0 0 / .85) }` (fixed dark scrim in both
     themes, like any photo viewer).
   - `.pv-panel` — `max-width:min(1400px, 94vw)`; `.pv-img` — `display:block;
     max-width:100%; max-height:calc(100dvh - 160px); width:auto; height:auto;
     object-fit:contain; margin-inline:auto`. No filter.
   - `.pv-caption` / `.pv-count` — light text on the scrim, centred, constrained width,
     `font-size:13px`, strong in `var(--heading)` like the thumbnails.
   - `.pv-close`, `.pv-nav` — ≥44px circular hit targets, high-contrast on the scrim;
     `.pv-prev`/`.pv-next` placed with `inset-inline-start`/`inset-inline-end`; glyphs
     mirrored under `[dir="rtl"]` (`transform: scaleX(-1)`). On narrow screens (≤640px) move
     the arrows below the image rather than overlaying it.
   - `html.photo-viewer-open { overflow: hidden }`.
   - Open animation (`@keyframes pv-in`, ~150ms opacity + scale .98→1), and a
     `@media (prefers-reduced-motion: reduce)` override that removes it.
   - `@media print { .pv-dialog, .photo-zoom-glyph { display:none } }`.

8. **Check the chrome-key gate** — `npm run check:chrome` should report the six
   `photoViewer.*` keys as *present in en, awaiting translation* (exit 0). If it instead
   reports them missing, check that `check_chrome_keys.mjs` picks up `t('photoViewer.…')`
   calls; fix the key, not the checker.

9. **Commit** (stage explicit paths only — `git status --short` first) and push. Open the
   PR (body via `--body-file`). Set the plan to `english-done` and the INDEX row to
   *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** The user
checks the look and wording in the browser (the six English strings, the magnifier
affordance, the scrim, caption layout). Nothing below runs until they confirm.

### Phase 2 — Every other locale

UI chrome only — the `src/locales/*.json` catalogs listed in `TRANSLATED`
(`src/lib/i18n.ts:108`): **es, bn, ht, te, fr, fa, it, hi, ar**. No research prose changes,
so no overlay / `PROSE_TRANSLATED` work.

1. **Add the `photoViewer` object to each of the nine catalogs** with translated values,
   keys identical, `{{name}}` / `{{current}}` / `{{total}}` placeholders preserved. The
   `position` string must keep both placeholders in an order natural to the language.
   Follow each locale's register notes in its `.claude/docs/prose-translation-<lang>.md`.
2. **Commit** to the same branch, update the PR, merge (`gh pr merge --squash
   --delete-branch`), `git checkout main && git pull`. Flip the plan to `implemented` and the
   INDEX row to *Implemented* with the PR link. **Do not deploy** — say "merged — ready to
   deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `src/components/PhotoViewer.tsx` | new — `PhotoViewer`, `PhotoZoomButton`, `usePhotoViewer`, `ViewerPhoto` |
| `src/components/SportsProgram.tsx` | edit — `FacilitiesBody` wraps photos, renders viewer |
| `src/components/ArtsProgram.tsx` | edit — `Photo` wraps its image, renders viewer |
| `src/components/SummerPrograms.tsx` | edit — `SummerPhotoBand` wraps photos, renders viewer |
| `src/index.css` | edit — `.photo-zoom*`, `.pv-*`, scroll lock, print + reduced-motion rules |
| `src/locales/en.json` | edit (Phase 1) — `photoViewer.*` |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2) — `photoViewer.*` |
| `.claude/plans/photolightbox.md`, `.claude/plans/INDEX.md` | status updates |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean (trust `tsc -b`, not `tsc --noEmit`; see memory
      `trust-tsc-b-not-tsc-noemit`)
- [ ] `npm run lint` — clean
- [ ] `npm run check:chrome` — `photoViewer.*` listed as awaiting translation, exit 0
- [ ] `npm run build` — succeeds (includes prerender + `check:seo`; the closed viewer adds no
      markup to prerendered pages)
- [ ] **Browser check** — `npm run build && npx vite preview`, real Chrome via Playwright
      (memory `headed-chrome-via-playwright`; avoid `networkidle` on school pages — memory
      `browser-check-networkidle-hangs`). Open each `<details>` first (memory
      `expand-details-before-browser-check`). On `/school/cannon` **Sports → Facilities**:
      - Clicking each thumbnail opens the modal with the **uncropped** image, caption,
        credit and "1 of 3"; the portrait `cannon-randy-marion-field.jpg` fits the viewport
        height without cropping.
      - Next/Previous buttons and ArrowRight/ArrowLeft move and wrap around.
      - Escape, ✕ and a backdrop click each close it, and focus returns to the thumbnail that
        opened it. Tab cannot leave the dialog while it is open; the page does not scroll
        behind it.
      - Keyboard only: Tab to a thumbnail, Enter opens it.
      - Arts: a Cannon or Charlotte Latin arts card photo opens with no arrows/counter;
        `cannon-ctc-production.png` (800px) is not upscaled past its natural width.
      - Phone width (390px): image fits, arrows sit below it, ✕ reachable.
      - Dark theme: the scrim and controls read well.
      - Thumbnails look exactly as before (same crop and height) apart from the hover glyph.
- [ ] **Summer** has no live data: temporarily add a two-entry `photos` array to one school's
      summer data locally, confirm the band opens with arrows and **no** duotone filter in
      the modal, then revert that edit (`git diff` must show no data change).
- [ ] Print preview of a school page: no modal artefacts, no magnifier glyphs.

### Phase 2 — Locales

- [ ] `npm run check:chrome` — no `photoViewer.*` keys awaiting translation in any of the ten
- [ ] `npm run build` — succeeds
- [ ] Browser: open the Cannon Facilities viewer in `?lang=es`, `?lang=ar` and `?lang=hi`
      (memory `lang-param-is-csc-lang`). In `ar`: arrows mirrored, ArrowLeft goes to the
      **next** photo, counter reads naturally, and the button `aria-label`s are Arabic.
      In `hi`: the Devanagari labels are not clipped.

## Risks

| Risk | Mitigation |
|---|---|
| Wrapping the `<img>` in a `<button>` shifts thumbnail layout (inline-block baseline gap, default button padding) | Full button reset in `.photo-zoom` incl. `display:block`; compare thumbnails before/after in the browser check |
| Backdrop click also fires on a click inside the panel's padding | Make the dialog box the full viewport and close only when `target === currentTarget`; the panel is a child, so clicks on it never match |
| `showModal()` throws if called on an already-open dialog (React StrictMode double-invokes effects in dev) | Guard with `if (!dialog.open) dialog.showModal()` |
| Hooks-before-early-return mistake in `Photo` / `SummerPhotoBand` | Steps 5–6 say to call the hook first; `tsc -b` + lint `rules-of-hooks` catch it |
| Scroll-lock class left on `<html>` if the component unmounts while open (route change) | Remove the class in the effect cleanup, not only in `onClose` |

## Open questions

- Should a photo deep-link (e.g. `#photo=2`) open the viewer? — **default:** no; not
  requested, and it would touch the router.

## Implementation notes

Phase 1 (English) built 2026-10-09 on `feat/photolightbox`. Deviations from the plan:

- **Swipe added (was Out of scope).** The user asked mid-build for the viewer to be
  mobile-ready. A horizontal swipe on the image (≥40px, and 1.5× more horizontal than
  vertical) steps through the group, mirrored in RTL; `.pv-stage` keeps
  `touch-action: pan-y pinch-zoom`. The ≤640px layout, 44px targets, `dvh` sizing and
  safe-area insets were in the plan; on touch screens (`hover: none`) the magnifier glyph is
  always shown, since there is no hover to reveal it.
- **`usePhotoViewer` lives in its own file**, `src/components/usePhotoViewer.ts`. Exporting
  a hook beside components in `PhotoViewer.tsx` tripped oxlint's
  `react(only-export-components)`, and the plan required clean lint.
- **Focus restore waits for the dialog to unmount.** Calling `trigger.focus()` inside
  `close()` (as the plan sketched) silently did nothing in the browser: the modal
  `<dialog>` is still open and the page still inert at that moment. The hook now refocuses
  in an effect after the commit that removes the dialog. Caught by the browser check.
- **✕ is `position: fixed` in the viewport corner**, not absolute in the panel. Inside the
  panel it needed a 52px row above the image, which pushed the credit line off the bottom
  of an 800px-tall desktop viewport. The image reserves 190px (desktop) / 290px (≤640px)
  for the counter and caption; captions fit at 1280×800, 1440×700, 390×844 and 390×667.
  The scrim is `0.92` black rather than `0.85`, because caption text was competing with the
  page showing through on phones.
- **Captions get no `localizeMoneyText`.** None of the three thumbnail captions applies it
  today, so the viewer doesn't either. This matches the thumbnails exactly, as the plan required.
- **Step 8 expectation was wrong:** `check:chrome` audits skip-field promises, not new keys,
  so it never lists `photoViewer.*` as awaiting translation (exit 0 either way). Phase 2's
  completeness has to be checked by diffing the ten catalogs' `photoViewer` objects.
- **PR deferred to Phase 2.** Step 9 says to open the PR in Phase 1. Per `/implement`, both
  phases land in one PR, so Phase 1 is committed and pushed with no PR open yet.
- RTL observation for Phase 2: the English `"2 of 3"` renders as `of 3 2` under
  `dir="rtl"` (bidi reordering of a Latin string). The Arabic/Farsi `position` strings fix
  it. Check it in the Phase 2 `?lang=ar` browser pass.
- **Added `check:photos` (user request after Phase 1).** The user asked whether future
  cards with photos would get the viewer. Photo *data* on the three surfaces already does;
  a new photo *surface* would not. `scripts/check_photo_viewer.mjs`, chained into
  `npm run build`, fails on any JSX `<img>` under `src/` that is neither inside a
  `PhotoZoomButton` nor on its exemption list. The list holds five entries: the viewer's
  own image, the site logo, the school crest and two news thumbnails, each with a reason. It
  also fails on a stale or over-broad exemption, and on a file that renders
  `PhotoZoomButton` with no `PhotoViewer`. Negative-tested on all three paths. The rule is
  also in `DATA-SCHEMA.md` §3 (via `gen_data_schema.mjs`) so `/add-school` and `/plan`
  see it. It cannot see CSS `background-image` photos or `createElement('img')`; none
  exist today.

Phase 2 (locales) built 2026-10-09 in a fresh window. `photoViewer.*` was added to all nine
catalogs by appending to the parsed JSON; every catalog round-tripped byte-identically
first, so the diff is only the new object. Completeness was checked by a scripted diff of
keys and placeholders across all ten catalogs, because `check:chrome` cannot see new keys.
In the browser, `ar` renders the counter as `1 من 3` and the English `of 3 2` RTL reordering
noted above is gone. ArrowLeft goes to the next photo in `ar`. PR #336.
