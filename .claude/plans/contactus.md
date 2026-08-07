---
name: contactus
title: "Contact us" mailto button in the shared header
status: implemented
phases: 2
created: 2026-08-06
branch: feat/contact-us-button
prs: [114]
---

# "Contact us" mailto button in the shared header

## Goal

Add a single **"Contact us"** button to the app's sticky top nav, on every page. It is a
plain `mailto:` anchor that opens the visitor's default mail client pre-addressed to
`k12schoolResearcher@gmail.com` with the subject `Charlotte School Insights — Inquiry`.
No form, no modal, no backend.

We'll know it worked when the button renders between **Compare** and the language picker
on all three routes (home, school detail, compare), matches the existing nav button
styling in both themes, collapses to an icon-only square below 480px, fires a
`contact_click` analytics event, and reads "Contact us" in English / its translation in
each of the other nine locales.

## Context

### The nav is already shared — this is one edit

[`src/App.tsx:33-63`](../../src/App.tsx#L33-L63) renders the single `<nav className="topnav">`
for the whole app. `<main>` swaps between `Home`, `SchoolDetail` and `Compare` beneath it,
so there is exactly one header component and the button is inserted once. The design
handoff anticipated this ("expected to be one edit in the shared header, not four").

Current DOM order inside `.nav-actions` ([`src/App.tsx:52-62`](../../src/App.tsx#L52-L62)):

```
brand (logo + wordmark)  →  .nav-actions[ Compare · LanguagePicker · ThemeToggle ]
```

The button goes **between the Compare link and `<LanguagePicker />`**, per the handoff.
`.nav-actions` is `display: flex; align-items: center; gap: 8px; flex: none;`
([`src/index.css:192`](../../src/index.css#L192)) so a new flex child needs no layout change.

### ⚠️ The handoff's class names DO NOT EXIST in this codebase

This is the single biggest trap in this plan. The README specifies
`.btn.btn-secondary`, `.btn.btn-icon.btn-secondary`, and tokens `--color-divider`,
`--font-heading`, `--color-accent`. **None of these exist here.** They are Industry
design-system names from the `.dc.html` prototypes. Verified by grep — zero hits across
`src/**`.

The real primitives in [`src/index.css:403-422`](../../src/index.css#L403-L422):

```css
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px;
  font-family: var(--heading);        /* Barlow Condensed */
  font-weight: 600; font-size: 15px; letter-spacing: 0.02em;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: transform 0.08s ease, background 0.15s ease;
}
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.btn.primary { background: var(--accent); color: var(--bg); border-color: var(--accent); }
.btn.ghost   { background: var(--surface); color: var(--text); }
.btn.ghost:hover { background: var(--surface-2); }
.btn.small   { padding: 7px 13px; font-size: 13px; }
```

**Name mapping — use the right-hand column, never the left:**

| Handoff (Industry) | This codebase |
|---|---|
| `.btn.btn-secondary` | `.btn.ghost.small` |
| `.btn.btn-icon.btn-secondary` | `.btn.ghost.contact-icon` (new modifier, step 4) |
| `var(--color-divider)` | `var(--border)` |
| `var(--font-heading)` | `var(--heading)` |
| `var(--color-accent)` | `var(--accent)` |
| `var(--color-text)` | `var(--text)` |

`.btn.ghost.small` already gives 7px 13px padding, 13px Barlow Condensed 600, a 1px
`var(--border)` outline, transparent-ish `var(--surface)` fill, square corners
(`--radius: 0` globally), the `:focus-visible` accent ring at 2px/2px offset, and the
`translateY(1px)` press state. That is the handoff's spec, already built. The one
divergence is font-size (13px here vs the spec's 14px) and padding (13px horizontal vs
12px) — **accept the existing values.** The instruction is explicit: use existing
`.btn` styling and tokens rather than new hexes or hard-coded sizes.

Dark mode needs no work — `--border`, `--text` and `--surface` already flip under
`body[data-theme="dark"]`.

### There is no analytics event API yet

[`src/lib/analytics.ts`](../../src/lib/analytics.ts) is page-views only: `relativePath`,
`pathForHash`, `carryOverParams`, `analyticsPath`, `pushRoute`, `initAnalytics`. There is
**no** `trackEvent`, no `gtag`, no `dataLayer`. The only analytics vendor is the
Cloudflare Web Analytics beacon, loaded in
[`index.html:131-132`](../../index.html#L131-L132) with
`data-cf-beacon='{"token": "…", "spa": true}'`.

**Cloudflare Web Analytics (free tier) has no custom-event API.** It records page-views
only. So `contact_click` cannot be sent to the existing vendor. See *Decisions* for how
this is handled and *Open questions* for what to confirm.

### The delegated click handler will ignore a mailto — correctly

`initAnalytics()` ([`src/lib/analytics.ts`](../../src/lib/analytics.ts), the
`document.addEventListener('click', …)` block) intercepts in-app anchors. It early-returns
unless `href` starts with `/` or `#/`, and its comment already names `mailto:` as falling
through to normal browser handling. **No change needed there** — the mailto anchor will not
be hijacked into `pushRoute`. Do not "fix" this.

### Responsive: the 480px fallback, and an existing 900px rule

- [`src/index.css:180`](../../src/index.css#L180) — `@media (max-width: 480px)` already
  exists for `.brand-logo`; another 480px block at
  [`src/index.css:349`](../../src/index.css#L349).
- [`src/index.css:1994`](../../src/index.css#L1994) — `.navlink { display: none; }` is
  inside the **`@media print`** block, alongside `.theme-toggle`, `.lang-picker`,
  `.back-to-top`. It is NOT a screen breakpoint. **The contact button must be added to
  that print-hidden list** — it is a screen-only affordance like the others, and a
  print-out should not carry a dead mailto button. Easy to miss.

### i18n

Nav strings live under `nav.*` in [`src/locales/en.json`](../../src/locales/en.json):
`brandName`, `homeAria`, `compare`, `footerDisclaimer`. There are **ten** catalogs —
`TRANSLATED` in [`src/lib/i18n.ts:108`](../../src/lib/i18n.ts#L108) is
`['en', 'es', 'bn', 'ht', 'te', 'fr', 'fa', 'it', 'hi', 'ar']`, and
`ls src/locales/` confirms ten files. This is **UI chrome**, so it is the catalog layer —
NOT the `PROSE_TRANSLATED` overlay layer. Nine files get translated in Phase 2.

Four of those locales are non-Latin (`bn`, `te`, `hi`, `ar`) and two are RTL (`fa`, `ar`).
The label is plain text with no figures, so none of the figure/bidi traps in `CLAUDE.md`
apply — but the **icon must sit on the correct side in RTL**, which flex handles
automatically under `dir="rtl"`.

### SEO

No new route, so `ROUTES` in `scripts/seo_routes.mjs` is untouched. Adding a nav string
does not change meta descriptions ([`src/lib/head.ts`](../../src/lib/head.ts) composes
those from school and topic names). `npm run check:seo` should stay green; run it anyway
since the header is in every pre-rendered page.

## Decisions

- **Use `.btn.ghost.small`, not a new button variant** — it is the existing outlined
  small nav-scale button and matches the handoff's intent (outlined, square, 1px border,
  transparent fill, reserved-accent-for-CTAs). Adding `.btn-secondary` would fork the
  design system for one button.
- **Accept 13px/`.small` padding over the handoff's literal 14px / 7px 12px** — the user's
  instruction says use existing `.btn.btn-secondary` styling and token variables "rather
  than new hexes or hard-coded sizes". Matching the sibling nav controls beats matching a
  prototype's pixel values to the unit.
- **Email address goes in a new `src/lib/contact.ts`** — the user asked for a
  config/constants file rather than inlined JSX. `src/lib/` is where every other
  cross-cutting constant lives (`STICKY_PARAMS`, `TRANSLATED`); a new one-purpose module is
  consistent and keeps the mailto URL construction (including em-dash encoding) in one
  tested place. Not added to an existing file because none is a general constants bag.
- **Subject line stays English in every locale** — the handoff says so explicitly, and it
  routes inbound mail into one recognisable bucket. It therefore lives in
  `contact.ts`, **not** in the locale catalogs.
- **`contact_click` is emitted through a new `trackEvent()` in `src/lib/analytics.ts`**,
  which is a **safe no-op today** — it pushes to `window.dataLayer` if present and
  otherwise does nothing, wrapped in try/catch. Rationale: Cloudflare's free tier has no
  custom-event API, so nothing can actually receive the event right now. A no-op with a
  real call site is the honest version — the button is instrumented, the seam exists, and
  wiring a vendor later is a one-function change. **Do not add a new analytics vendor,
  script tag, or dependency to satisfy this.** See *Open questions*.
- **Icon is inlined SVG in the component, not an icon library** — no icon dependency
  exists in this repo, and the handoff's Lucide `mail` path is four lines of markup.
- **The button is hidden in print** — added to the existing screen-only list at
  [`src/index.css:1994`](../../src/index.css#L1994), matching `.theme-toggle` and
  `.lang-picker`.
- **Two phases** — it adds a user-facing string (`nav.contact`), so the standing
  English-first rule applies.

## Approvals needed

**None.** This is a Claude Design MCP handoff
(`design_handoff_contact_us_button/README.md` in design project
`5da24575-40bf-4787-8934-0fadfc56059f`), and under the UX-design standard in `CLAUDE.md` a
design handoff *is* the approval — the advance-approval gate covers ingestion work, not
design work. No new card, section, metric key, Compare row or topic is involved.

## Source material

None. No external school data is fetched by this plan; the data-provenance standard does
not apply.

The design references are **not on disk** — they live in the Claude Design project. If
`/implement` wants them, read via the DesignSync MCP tool
(`projectId: 5da24575-40bf-4787-8934-0fadfc56059f`):

- `design_handoff_contact_us_button/README.md` — the spec (fully quoted in *Context* above)
- `design_handoff_contact_us_button/Home.dc.html`, `Compare Schools.dc.html`,
  `Providence Day School.dc.html`, `Financial Aid & Tuition.dc.html` — visual references

**They are references, not code to copy.** Everything needed to build this is already in
this document; the MCP read is optional and the plan does not block on it.

## Out of scope

- Any contact **form**, modal, backend, Worker, or third-party form service. Explicitly a
  plain `mailto:` (the user chose "mailto: link only").
- A `/contact` **route or page**. No `ROUTES` entry, no sitemap change, no pre-rendered page.
- Adding a real analytics vendor or custom-event backend (see *Decisions*).
- Any other header change — brand, Compare link, `LanguagePicker`, `ThemeToggle` all stay
  exactly as they are. The user said "don't change anything else in the header."
- Translating the mailto **subject line**.
- Deploying. `npm run deploy` is the user's call, always.

## Steps

### Phase 1 — English

1. **Create `src/lib/contact.ts`** — the address constant and the URL builder:

   ```ts
   /** Inbound contact address for the site. Single source of truth — do not inline. */
   export const CONTACT_EMAIL = 'k12schoolResearcher@gmail.com'

   /**
    * Subject stays ENGLISH in every locale (per the design handoff): it routes
    * inbound mail into one recognisable bucket, so it is not a catalog string.
    * The dash is an em dash, U+2014.
    */
   export const CONTACT_SUBJECT = 'Charlotte School Insights — Inquiry'

   /** `mailto:` href with the subject URL-encoded. No body is pre-filled. */
   export function contactMailto(): string {
     return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`
   }
   ```

   `encodeURIComponent` turns the em dash into `%E2%80%94`, matching the handoff.

2. **Add `trackEvent()` to `src/lib/analytics.ts`** — append below `initAnalytics()`.
   Best-effort and guarded, in the same spirit as the rest of that module:

   ```ts
   /**
    * Fire a custom analytics event.
    *
    * NO-OP TODAY, DELIBERATELY. The only analytics vendor here is Cloudflare Web
    * Analytics (index.html), whose free tier records PAGE-VIEWS ONLY and has no
    * custom-event API — so there is nothing to send this to yet. This exists so
    * call sites are instrumented and a future vendor is a one-function change,
    * not a hunt through components. Guarded so it can never break a click.
    */
   export function trackEvent(name: string, props?: Record<string, string>): void {
     if (typeof window === 'undefined') return
     try {
       const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer
       if (Array.isArray(dl)) dl.push({ event: name, ...props })
     } catch {
       // Analytics must never break interaction.
     }
   }
   ```

3. **Add the `nav.contact` key to `src/locales/en.json`** — inside the existing `nav`
   object, after `compare`:

   ```json
   "contact": "Contact us"
   ```

   English only in this phase. Do not touch the other nine files yet.

4. **Add the icon-only styles to `src/index.css`** — near the `.btn` primitives
   ([`src/index.css:403-422`](../../src/index.css#L403-L422)), a modifier that squares the
   button and hides the label below 480px:

   ```css
   /* Contact button: label + mail glyph normally; below 480px the nav runs out
      of room, so the label is dropped and the button becomes a 32px square.
      Hidden entirely rather than shown label-less is NOT an option (handoff). */
   .btn.contact { text-decoration: none; color: var(--text); }
   @media (max-width: 480px) {
     .btn.contact { padding: 7px; }
     .btn.contact .contact-label { display: none; }
   }
   ```

   `text-decoration: none` and the explicit `color` are needed because this is the first
   `<a class="btn">` in the nav — `.btn` was authored for `<button>`, so an anchor would
   otherwise inherit link underline/colour. Verify that in the browser (step 7).

5. **Hide it in print** — add `.btn.contact` to the screen-only list at
   [`src/index.css:1994`](../../src/index.css#L1994), alongside `.theme-toggle`,
   `.lang-picker`, `.back-to-top`, `.navlink`:

   ```css
   .theme-toggle,
   .lang-picker,
   .back-to-top,
   .bp-corner,
   .qual-dot,
   .no-print,
   .btn.contact,
   .navlink { display: none; }
   ```

6. **Insert the button in `src/App.tsx`** — one new element in `.nav-actions`, between the
   Compare anchor (closes at [line 59](../../src/App.tsx#L59)) and
   `<LanguagePicker />` ([line 60](../../src/App.tsx#L60)). Add the imports for
   `contactMailto` / `CONTACT_EMAIL` (`./lib/contact.ts`) and `trackEvent`
   (`./lib/analytics.ts`).

   ```tsx
   <a
     className="btn ghost small contact"
     href={contactMailto()}
     title={t('nav.contactTitle', { email: CONTACT_EMAIL })}
     aria-label={t('nav.contact')}
     onClick={() => trackEvent('contact_click')}
   >
     <svg
       width="15" height="15" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true"
     >
       <rect x="3" y="5" width="18" height="14" />
       <path d="m3 7 9 6 9-6" />
     </svg>
     <span className="contact-label">{t('nav.contact')}</span>
   </a>
   ```

   Notes that matter:
   - **No `target="_blank"`** (handoff: leaves an empty tab behind).
   - **No `e.preventDefault()`** — the browser must handle the mailto. `trackEvent` is
     synchronous and fire-and-forget, so the navigation is unaffected.
   - It is a real `<a>`, never a `<button>` + `window.location` (handoff, a11y).
   - `aria-label` is always present, so the accessible name survives the 480px
     label-hidden state without conditional rendering.
   - The `<svg>` is `aria-hidden`; note React needs camelCase (`strokeWidth`,
     `strokeLinecap`) — the handoff's HTML uses kebab-case.

7. **Add the `nav.contactTitle` key to `src/locales/en.json`** — the hover tooltip that
   exposes the address, interpolated so word order can change per language:

   ```json
   "contactTitle": "Email {{email}}"
   ```

   Interpolation rather than concatenation, per the i18n standard.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording and the rendered button are what they want.

### Phase 2 — Every other locale

UI chrome, so this is the **catalog layer only** — `src/locales/*.json`. The
`PROSE_TRANSLATED` overlay layer is **not involved**; no overlay rebuild, no
`i18n:build`, no figure/sepdrift checks (there are no figures in either string).

1. **Add `nav.contact` and `nav.contactTitle` to the nine non-English catalogs** —
   `es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar` (per `TRANSLATED` in
   [`src/lib/i18n.ts:108`](../../src/lib/i18n.ts#L108) — re-read it rather than trusting
   this list, it grows). Keys identical, values translated, same position in the `nav`
   object as English.

   - Keep `{{email}}` **verbatim** in every `contactTitle` — an interpolation token, never
     translated.
   - Register per locale, per the rollout docs: `hi` targets मानक हिन्दी and avoids
     over-Sanskritized forms; `ht` must not drift toward French; `fa` is formal written
     standard. See `.claude/docs/prose-translation-<lang>.md`.
   - `fa` and `ar` are RTL: the label is plain text with no bidi-neutral figures, so **no
     LRI/PDI isolates are needed**. Do not add them.

2. **Confirm the icon side flips in RTL** — under `dir="rtl"` the flex row reverses so the
   mail glyph should sit to the right of the label in `fa`/`ar`. Verify in the browser;
   only add a rule if it does not.

## Files touched

| File | Change |
|---|---|
| `src/lib/contact.ts` | **new** — `CONTACT_EMAIL`, `CONTACT_SUBJECT`, `contactMailto()` |
| `src/lib/analytics.ts` | edit — append guarded no-op `trackEvent()` |
| `src/App.tsx` | edit — one `<a class="btn ghost small contact">` in `.nav-actions`, plus two imports |
| `src/index.css` | edit — `.btn.contact` rules + 480px icon-only block; add to the print-hidden list |
| `src/locales/en.json` | edit — `nav.contact`, `nav.contactTitle` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — same two keys, translated (Phase 2) |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — clean
- [ ] `npm run build` — succeeds
- [ ] `npm run check:seo` — green (header ships into every pre-rendered page)
- [ ] **Browser, `npm run dev`** — this repo's standing lesson is that render-layer
      defects survive every automated check, so these are not optional:
  - [ ] Button appears between **Compare** and the language picker on **all three**
        routes — home, a school page, compare.
  - [ ] It renders as an outlined square-cornered button matching the sibling nav
        controls — **no link underline, no blue/visited link colour** (the `.btn` styles
        were written for `<button>`; this is the first anchor to use them).
  - [ ] Hover shows the address in the native tooltip; hover/press/`:focus-visible` states
        all fire (Tab to it — the 2px accent ring must show).
  - [ ] Dark mode: border, label and glyph all legible and theme-correct.
  - [ ] **Narrow to <480px** — label disappears, button becomes a ~32px square with the
        glyph centred, and it is **still visible** (never `display: none`).
  - [ ] Clicking opens the mail client with the right To: and the subject rendered as
        `Charlotte School Insights — Inquiry` with a real em dash (not `%E2%80%94`, not `?`).
  - [ ] Back button still works after clicking Contact and returning — confirms the
        delegated handler in `analytics.ts` did not intercept the mailto.
  - [ ] `Cmd/Ctrl+P` print preview — the button is **absent**.

### Phase 2 — Locales

- [ ] `npx tsc --noEmit` && `npm run build` — clean
- [ ] Every catalog parses and has both keys:
      `node -e "for (const l of ['en','es','bn','ht','te','fr','fa','it','hi','ar']) { const n=require('./src/locales/'+l+'.json').nav; if(!n.contact||!n.contactTitle) throw new Error(l); if(!n.contactTitle.includes('{{email}}')) throw new Error('token lost: '+l); } console.log('ok')"`
- [ ] **Browser check in all ten locales** via the language picker — the label is
      translated, not English, on every one. (`CLAUDE.md`: overlays and catalogs fail
      *silently* to English; a source-level check passes while the page renders English.
      Restart the dev server if a catalog edit does not appear.)
- [ ] `fa` and `ar`: button sits correctly in the RTL nav, glyph on the expected side,
      nothing overlapping the language picker.
- [ ] Longest translation (likely `de`-style compounds are absent, but check `bn`/`te`/`hi`
      which set wide glyphs) does not wrap or push the nav past the viewport at 768px.

## Risks

| Risk | Mitigation |
|---|---|
| Implementer copies the handoff's `.btn-secondary` / `--color-divider` verbatim; classes silently do nothing and the button renders unstyled | The mapping table in *Context* is explicit. Grep-verified: those names have **zero** hits in `src/`. Browser check catches it. |
| `.btn` was authored for `<button>`; as an `<a>` it may inherit underline/link colour | Step 4 sets `text-decoration: none` and an explicit `color`. First browser check item. |
| The delegated click handler in `analytics.ts` hijacks the mailto | It early-returns unless `href` starts with `/` or `#/`. Verified in source; the Back-button check confirms it at runtime. Do not modify that handler. |
| `contact_click` looks wired but reaches nothing | Documented as a deliberate no-op in the function's own comment and in *Decisions*. Raised in *Open questions*. |
| Adding a nav item overflows the header on small screens | The 480px icon-only fallback is required, not optional; `.nav-actions` already wraps. Explicit browser step. |
| Print-out gains a dead button | Step 5 adds it to the existing print-hidden list; print-preview is a verification item. |

## Open questions

- **Where should `contact_click` actually go?** Cloudflare Web Analytics' free tier has no
  custom-event API, so the event has no receiver today. — **default:** ship the guarded
  no-op `trackEvent()` from step 2 and mention it in the PR body. Do **not** add a vendor,
  script tag, or dependency to make it live; that is a separate decision the user makes.
- **Is `k12schoolResearcher@gmail.com` correct, including the capital `S`?** It is
  case-preserved from the handoff README. — **default:** use it exactly as written; it is
  a single constant in `src/lib/contact.ts` and trivial to change.

## Implementation notes

Built as planned; both open questions shipped on their stated defaults (guarded no-op
`trackEvent()`, address verbatim including the capital `S`). No step was dropped and no
deviation from the design was needed — the mapping table in *Context* was correct, and
`.btn.ghost.small` carried the handoff's intent without a new variant.

Three things worth recording for whoever touches this next.

**The RTL glyph flip needed no CSS.** Phase 2 step 2 anticipated possibly adding a rule;
flex under `dir="rtl"` handled it on its own. Verified by measuring the glyph's centre
against the label's in a browser, in both `fa` and `ar` — the check is geometric, not a
screenshot eyeball, so it will catch a regression.

**A dark-mode check silently tested the wrong thing, and is the reason this repo's
browser-check rule exists.** The first verification pass set `data-theme` on `<body>` from
JS and asserted the button's colours. It reported PASS while measuring a *light* page
twice: `data-theme` lives on `<html>` (`:root`), and it is React state, so a hand-set
attribute is reverted on the next render. Both dark assertions were vacuous. Re-run by
clicking the real `.theme-toggle`, the label flips `rgb(29,31,32)` → `rgb(230,231,232)`
over a background of luminance 24. **When verifying theme-dependent styling, drive the
toggle — never set the attribute.**

**`mailto:` handoff to the mail client is outside what the page controls.** During review
the button opened Outlook Web in Edge rather than macOS Mail. That is browser-level
protocol-handler config (`edge://settings/content/handlers`), which overrides the macOS
default reader; the href carries no target or vendor hint. Confirmed as intended
behaviour and deliberately left alone — forcing a specific webmail target would break the
link for everyone whose setup differs. Worth knowing before anyone files it as a bug.

### Verification actually run

Beyond the plan's list: `check:translations` (no drift), `check:bidi` (0 isolates leaked
into LTR locales), `check:fa`, `check:hi`, and `check_chrome_keys.mjs`. The browser passes
were scripted with Playwright — 31 assertions in Phase 1, 99 across all ten locales in
Phase 2 (label not falling back to English, `{{email}}` interpolated with no raw token,
href identical in every locale, direction, glyph side, picker overlap, and the 390/768/1280
widths). Telugu is the widest label at 174px and fits.

`i18n:leaks` was **not** run — it requires `--lang` and targets the prose overlay layer,
which this change does not touch. The overlay checks (`check:runtime`, `check:sepdrift`,
`check:figures`) are likewise not applicable: this is catalog-layer chrome with no figures.
