---
name: devbeacon
title: Stop the Cloudflare Analytics beacon from loading on the local dev server
status: implemented
phases: 1
created: 2026-09-15
branch: fix/devbeacon
prs: [305]
---

# Stop the Cloudflare Analytics beacon from loading on the local dev server

## Goal

The Cloudflare Web Analytics beacon is a plain `<script>` tag in `index.html`, which Vite
serves verbatim on the dev server — so `npm run dev` loads it and fires page-views against
the **same token as production** (`9f82699093284a7084d5fbd2aeda1457`). The intent has
always been that only the deployed site reports telemetry.

This plan adds a small Vite plugin that strips the beacon block from `index.html` **in
`serve` mode only**. After it lands, `npm run dev` serves a document with no
`cloudflareinsights` reference anywhere; `npm run build` produces `dist/` byte-identical to
today.

**Single-phase — adds no user-facing text.** Nothing renders, no locale catalog or overlay
is touched.

## Context

### Where the beacon lives

One place in source: [`index.html:121-133`](../../index.html#L121-L133) — a seven-line
explanatory comment followed by the script tag.

```html
<!-- Cloudflare Web Analytics — privacy-first, cookieless traffic stats
     ... -->
<script
  type="module"
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "9f82699093284a7084d5fbd2aeda1457", "spa": true}'
></script>
```

`public/404.html` does **not** carry a beacon tag — verified, `grep -c` returns 0. There is
no other HTML source file with one. `index.html` is the single source.

### How it reaches production — two paths, one origin

`dist/` currently contains the beacon in **13 files**: `dist/index.html` plus the 12
pre-rendered route pages. The prerendered copies are serialized snapshots (note
`defer=""`), because [`scripts/prerender.mjs`](../../scripts/prerender.mjs) drives headless
Chromium over the built `dist/` and captures `document.documentElement.outerHTML`.

**This is the constraint that shapes the fix.** Both paths originate from the same
`index.html`. A `serve`-only strip leaves the build untouched, so all 13 files keep the
tag exactly as they have it today. An approach that instead injected the beacon from
`src/main.tsx` behind `import.meta.env.PROD` would *also* work in production — prerender
runs against a production build, so `PROD` is true there and the tag would still be
snapshotted in — but it would change *when* the beacon loads (post-hydration rather than
at parse time) for no benefit. The `serve`-only strip is strictly smaller.

### Why no check is at risk

[`scripts/check_seo.mjs`](../../scripts/check_seo.mjs) runs 11 groups of assertions over
`dist/`: titles, meta descriptions (70–160 chars), og/twitter tags, canonical, hreflang
against `urlFor()`, `EducationalOrganization` JSON-LD `addressLocality` against `BRANDS`,
sitemap/robots agreement, distinct per-school og:images, and `404.html`. **None inspects
`<script>` tags** except `jsonLdFor()`, which filters on
`type="application/ld+json"` and skips everything else.

Both `check_seo.mjs` and `prerender.mjs` enforce a `MIN_BYTES = 20_000` floor. The beacon
block is ~733 bytes against pages >100 KB, and in any case **this plan does not change
`dist/` at all**, so the floor is untouched.

The other 13 checks chained into `npm run build` (`check:schema`, `check:live`,
`check:chrome`, `check:runtime`, `check:spans`, `check:news`, …) read `src/data`,
`src/locales`, `src/content` and overlay files. None reads `index.html`.

### Vite plugin shape — verified, not assumed

Vite is **8.1.3**. There is no existing inline-plugin pattern in this repo to copy, so the
plugin is written out in full in step 1. The hook shape was verified against the installed
version by booting a real `createServer` with the plugin attached:

- `apply: 'serve'` is accepted and confines the plugin to the dev server.
- `transformIndexHtml` as an object with `{ order: 'pre', handler }` is accepted in Vite 8.
  (The older bare-function and `enforce`/`transform` spellings still work but the
  `order`/`handler` object is the current form.)

The strip regex was also verified against the real `index.html`: it matches 733 bytes,
removes every `cloudflareinsights` reference, and leaves `</body>`, `</html>`,
`<div id="root">` and the `/src/main.tsx` script tag intact.

## Decisions

- **Dev server only; `npm run preview` is deliberately NOT covered** — the user chose this
  scope. `preview` serves a production build and is used rarely and knowingly; covering it
  would need a runtime hostname guard, which must then carefully *not* fire during
  prerender (which also runs on localhost but whose output ships to production). That
  conditional is the kind of "not English / not production" bucket logic `CLAUDE.md`
  records as a repeat source of defects. Out of scope, noted below.
- **Strip in `serve` mode rather than inject in `main.tsx`** — keeps `dist/` byte-identical
  to today, so there is zero production and SEO risk. See Context.
- **The plugin lives inline in `vite.config.ts`** rather than a separate file — it is ~15
  lines with one consumer, and the repo has no `vite-plugins/` directory to follow.
- **No `pushRoute()` guard in `src/lib/analytics.ts`** — with the beacon absent on dev, its
  `pushState`/`replaceState` pair is inert for telemetry purposes and still needed for
  routing. Adding a guard would change navigation behaviour between dev and prod, which is
  worse than the problem it solves.
- **Fail loudly if the regex stops matching** — a silent no-op would leave the beacon
  loading on dev with nobody aware. See step 1.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic; no UX change;
no new dependency. The UX-design gate does not apply.

## Out of scope

- `npm run preview` — still loads the beacon (production build, localhost origin).
- `scripts/prerender.mjs` — still snapshots the beacon into the 12 route pages. Correct and
  intended.
- Any change to `dist/`, the production beacon, or the Cloudflare token.
- Any change to `src/lib/analytics.ts` — `pushRoute`, `analyticsPath`, `trackEvent` and the
  delegated click handler are all untouched.
- Historical Cloudflare data. Any localhost hits already recorded cannot be removed.

## Steps

Single-phase — adds no user-facing text.

1. **Add the strip plugin to `vite.config.ts`.** Define it above `defineConfig` and add it
   to `plugins` after `react()`. Write it out in full — there is no existing pattern in
   this repo to point at:

   ```ts
   /**
    * Strip the Cloudflare Web Analytics beacon on the DEV SERVER ONLY.
    *
    * The beacon is a static <script> in index.html, which Vite serves verbatim under
    * `vite dev` — so local browsing used to fire page-views against the same
    * production token as the live site. Only the deployed site should report telemetry.
    *
    * `apply: 'serve'` confines this to the dev server, so `vite build` output is
    * byte-identical to before this plugin existed. That matters: scripts/prerender.mjs
    * drives headless Chromium over the BUILT dist/ and snapshots the DOM into 12 route
    * pages, so the beacon must survive the build to reach production at all.
    *
    * NOT covered, deliberately: `npm run preview` serves a production build and still
    * loads the beacon. Suppressing that needs a runtime hostname check which must then
    * avoid firing during prerender (also localhost, but its output ships) — a
    * "not production" conditional this project has been bitten by before.
    */
   const stripBeaconOnDev = {
     name: 'strip-cf-beacon-on-dev',
     apply: 'serve' as const,
     transformIndexHtml: {
       order: 'pre' as const,
       handler(html: string) {
         const RE =
           /\s*<!--\s*Cloudflare Web Analytics[\s\S]*?-->\s*<script[^>]*static\.cloudflareinsights\.com[\s\S]*?<\/script>/i
         if (!RE.test(html)) {
           // Loud on purpose. If index.html is reworded and this silently stops
           // matching, the beacon quietly resumes logging localhost traffic to
           // production with nobody aware.
           console.warn(
             '\n[strip-cf-beacon-on-dev] Cloudflare beacon block NOT FOUND in index.html.\n' +
               '  If the beacon was removed, delete this plugin.\n' +
               '  If it was reworded, update the regex — dev traffic is being logged to production.\n',
           )
           return html
         }
         return html.replace(RE, '')
       },
     },
   }
   ```

   The regex intentionally matches **the comment block and the script together**, so dev
   does not serve an explanatory comment for a tag that is not there.

2. **Leave `index.html` unchanged.** It stays the single source of the beacon, and the
   build path still reads it verbatim. No edit in this step — it is listed so the
   implementer does not "helpfully" also move or gate the tag there.

## Files touched

| File | Change |
|---|---|
| `vite.config.ts` | edit — add the `stripBeaconOnDev` plugin and register it in `plugins` |

## Verification

### Dev server — the beacon must be GONE

```bash
npm run dev   # note the port it prints, typically 5173
```

- [ ] `curl -s http://localhost:5173/ | grep -c cloudflareinsights` → **`0`**
- [ ] `curl -s http://localhost:5173/ | grep -c 'id="root"'` → **`1`** (document intact)
- [ ] `curl -s http://localhost:5173/ | grep -c 'src/main.tsx'` → **`1`** (app still boots)
- [ ] The dev server prints **no** `[strip-cf-beacon-on-dev]` warning. A warning means the
      regex missed and the fix is not working.
- [ ] Load `http://localhost:5173/` in a real browser, open DevTools → Network, filter
      `cloudflareinsights` → **no request**. Click into a school page and back; still none.
      (A `curl` check alone cannot see a script injected after hydration.)

### Build — production must be UNCHANGED

```bash
npm run build
```

- [ ] Build succeeds — all 14 chained checks pass, `check:seo` included.
- [ ] `grep -rl cloudflareinsights dist | wc -l` → **`13`** (same as before the change:
      `dist/index.html` + 12 route pages).
- [ ] `grep -c cloudflareinsights dist/index.html` → **`1`**.
- [ ] `grep -c cloudflareinsights dist/school/cannon/index.html` → **`1`**.
- [ ] `npm run check:seo` → clean, 13 pre-rendered pages OK.

### Strongest single check — byte-identical production output

Prove the build is untouched rather than merely "looks fine". From a clean tree **before**
applying the change:

```bash
npm run build && cp dist/index.html /tmp/beacon-before-index.html
```

Then after applying it:

```bash
npm run build && diff /tmp/beacon-before-index.html dist/index.html && echo "IDENTICAL"
```

- [ ] Prints **`IDENTICAL`** with no diff output.

(The 12 prerendered pages are snapshots of a live render and can differ run-to-run in
incidental ways, so `dist/index.html` — the file this plugin could actually affect — is the
meaningful comparison.)

## Risks

| Risk | Mitigation |
|---|---|
| `index.html` is later reworded and the regex silently stops matching, resuming dev telemetry | The plugin `console.warn`s loudly on no-match, and the dev verification asserts no warning appears |
| The plugin accidentally applies at build time, stripping the beacon from production | `apply: 'serve'` (verified accepted by Vite 8.1.3), plus the byte-identical `diff` check above |
| Regex over-matches and removes adjacent markup | Verified against the real file: matches exactly 733 bytes; `</body>`, `</html>`, `#root` and the `main.tsx` tag all survive |
| Someone later "fixes" `preview` by adding a hostname guard that also fires during prerender, stripping the beacon from production | The plugin docstring states why `preview` is excluded and what the prerender trap is |

## Open questions

None. Scope (dev server only) was settled with the user at planning time.
