---
name: shareurl
title: The address bar follows the reader — opening a card or clicking an area chip shows that deep link in the URL, with no reload, no new history entry and no extra Cloudflare page-view
status: implemented
phases: 1
created: 2026-11-14
branch: feat/shareurl
prs: [496]
---

# The address bar shows the deep link for what the reader is looking at

## Goal

When a reader opens a research card, the address bar changes to that card's deep link
(`/school/providence-day/#sports/the-college-pipeline`). When they click a research-area
chip in either table of contents, it changes to the area link (`#sports`). The page does
not reload, the Back button is unchanged, and Cloudflare Web Analytics logs no extra
page-view. Whatever the reader copies from the address bar is the link that brings someone
else to the same place.

It worked if `audit:cardlink` shows the URL tracking every click, and the new
`audit:pageviews` shows **exactly one** beacon page-view per page load, however many cards
and chips are clicked.

## Context

**This reverses a standing rule, at the user's request (2026-11-14).** Card deep links
shipped in PRs #493–#495 (plan [`cardlink`](cardlink.md)) under the rule "Read the hash,
never write it". The reason given was that the Cloudflare beacon (`index.html`,
`"spa": true`) logs a page-view on every History API write. The user now wants the URL to
follow the reader, provided telemetry is not affected. This plan replaces the rule with
"write the hash only through the quiet helper, only with `replaceState`". The places that
state the old rule are listed in step 8.

### What the beacon actually does (measured 2026-11-14, live site, headed Chrome)

The live `beacon.min.js` (version `2026.10.1`) no longer works the way the comments in
`src/lib/analytics.ts` describe. With `spa: true` (mode `HistoryAndNavigationAPI`):

- **If the browser has the Navigation API** (`'navigation' in window`: Chrome/Edge, and
  recent Safari and Firefox), the beacon adds a `navigation.addEventListener('navigate', …)`
  listener. **Every** same-document navigation (pushState, **replaceState**, hash change)
  whose destination URL differs from `location.href` logs a new page-view (a `Load` event,
  `eventType: 1`, `nt: "routing-apis"`, `ntapi: 1`). The reported `location` has hash
  **and** query stripped, so it reports a second view of the same path.
- **Otherwise** it patches `history.pushState` only and listens to `popstate`.
  `replaceState` is not seen at all.

Probe results (beacon POSTs to `/cdn-cgi/rum` intercepted with Playwright `route.fulfill`
so nothing reached the dashboard):

| Probe | Extra `Load` events |
|---|---|
| Hash-only `history.replaceState` on `/school/providence-day/`, no guard | **1** (phantom page-view) |
| Same, with a `navigate` listener registered **before** the beacon (Playwright `addInitScript`) that calls `e.stopImmediatePropagation()` while a flag is set | **0**, and the URL still updated |
| Same guard registered **after** the beacon, even with `{ capture: true }` | 1 (capture does not reorder listeners on `navigation`) |
| An in-app click (`pushRoute`) from `/school/providence-day/?lang=es` to Cannon | **2** (pre-existing double count) |

Three facts follow:

1. The `navigate` event is dispatched **synchronously** inside `replaceState` (the
   listener saw `flag: true`, `navigationType: "replace"`). A flag set around the call
   is reliable.
2. **The guard must be registered before the beacon's listener.** Registration order is
   the only thing that works. `src/main.tsx` is too late: it does `await ready` at top
   level, and during that await the deferred beacon module can run. An **inline classic
   `<script>` in `<head>`** runs during parsing, before every module script, on both the
   dev page and every pre-rendered page. (`dist/school/providence-day/index.html` today:
   two inline head scripts, then the bundle, then the beacon at the end of `<body>`.)
3. **The app already over-counts.** `pushRoute()` (`src/lib/analytics.ts`) does
   `pushState(bare path)` then `replaceState(path with query)`. The second write logs a
   second page-view whenever the URL has a query. That means every in-app navigation by a
   reader with `?lang=`, and **every** Compare navigation and Compare filter click
   (`?topic=&schools=`). `syncUrl()` in `src/lib/i18n.ts` (a `replaceState` on language
   switch) also logs a page-view for the same page. The same helper fixes both (step 2).

### The code today

- `src/lib/cardLink.ts`: `linkName()`, `cardLinkId()`, `openFromHash()`, plus the ⛔ "READ
  THE HASH, NEVER WRITE IT" doc comment on `openFromHash`.
- `src/pages/SchoolDetail.tsx`:
  - `scrollToTopic()` / `scrollToId()` (~line 397–406) carry "a click must never write the
    hash" comments.
  - The deep-link effect (~line 576–605) keeps a `handledHash` ref keyed on
    `slug + location.hash`. It runs on `ready` (which a language switch toggles) and on
    `hashchange`. `replaceState` fires neither `hashchange` nor `popstate`, so writing does
    not re-trigger it. But a later `ready` re-run would see the **new** hash and scroll
    back to that card. Step 4 handles this.
  - **Two tables of contents** with the same three kinds of chip. The header chips are
    ~line 683–715 and the rail is ~line 772–806. Welcome (`href="#welcome"`), News
    (`href="#news"`) and one chip per research area (`href={`#topic-${t.slug}`}`), each
    with `onClick` → `setActiveKey(...)` + `scrollToId` / `scrollToTopic`.
  - Every research card is an uncontrolled `<details className="note-card…">` whose `id` is
    `cardLinkId(areaEn, <English title>)`, so it is always `<area>/<card>` with a `/`.
    There are ~12 render sites (lines ~1137–1754). **Do not edit each one.** One delegated
    listener on `<main className="dossier-main" ref={mainRef}>` (~line 826) covers them all.
    The audit's own definition of a top-level card is
    `details.note-card` with `!d.parentElement.closest('.note-card')`. Nested `<details>`
    (club-cluster rows) are not cards.
  - `setAllDetails()`, the dev-only "Expand all", opens cards programmatically.
    `openFromHash` does too. Neither may write the URL.
- `src/lib/analytics.ts`: `pushRoute()` and its long header comment. That comment says
  "only pushState triggers a page-view", which is now false for Navigation-API browsers.
- `src/lib/i18n.ts`: `syncUrl()` (~line 262).
- `src/main.tsx`: two startup `replaceState`s (the 404 `?redirect=` restore and the legacy
  `#/` rewrite). Both run before the beacon has registered anything, so they log nothing.
  **Leave them alone.**
- `index.html`: two inline head scripts (theme pin, i18n-pending), the module entry, and
  the beacon at the end of `<body>` with a comment block.
- `scripts/audit_card_links.mjs` (`npm run audit:cardlink`) counts History writes through
  an init-script wrapper. It **asserts that closing/reopening a card makes 0 History
  writes**, which this plan inverts. It **aborts every request matching
  `/cloudflareinsights\.com/`**, which also blocks `static.cloudflareinsights.com/beacon.min.js`
  itself, so the beacon never runs inside that audit.

## Decisions

- **`history.replaceState`, never `pushState` and never `location.hash = …`.** `pushState`
  adds a history entry per click, so Back would step through every card. In non-Navigation-API
  browsers it is also exactly what the beacon patches, and no guard can silence it.
  Assigning `location.hash` adds an entry, fires `hashchange` (re-running `openFromHash`)
  and triggers the browser's native fragment jump. With `replaceState`, Back still leaves
  the page in one press, exactly as today.
- **Silence the beacon only for our own writes, using a flag plus `stopImmediatePropagation`,
  in an inline `<head>` script.** It is precise, because only writes made through the helper
  set the flag. It needs no change to the beacon or its config: `spa` has only modes 0/1/2,
  and there is no "pushState only" mode to switch to. It survives prerender, because
  `index.html` is the template for every page. It does **not** `preventDefault`, which
  would cancel the URL change.
- **Writes happen on user clicks only.** A top-level card's `<summary>` click
  (mouse or keyboard: Enter/Space fire `click` on a summary) and a table-of-contents chip
  click. Never on scroll (no scroll-spy, which matches the TOC's existing "deliberately NOT a
  scroll-spy"), never on `openFromHash`, never on "Expand all".
- **Click marks intent, `toggle` commits.** The click handler records which card was
  clicked. A capture-phase `toggle` listener on `mainRef` writes the URL once that same
  card's `open` state has actually changed. (`toggle` does not bubble, but capture-phase
  listeners on an ancestor still receive it.) A toggle the click did not cause, or a click
  that did not toggle, writes nothing. That excludes programmatic opens without
  special-casing them.
- **Open a card → `#<card id>`. Close a card → `#<area>`, but only if the URL currently
  points at that card.** Closing some other card leaves the URL alone. The area half is
  `id.split('/')[0]`, already the `linkName()` of the English area name.
- **Area chip → `#<linkName(English area name)>`**, the canonical area form from
  CLAUDE.md ("the area half is the area's name, never its slug"), never `#topic-<slug>`.
  The chips' `href` changes to the same value, so "Copy link address" on a chip matches
  the address bar. `#topic-<slug>` links stay readable forever. Only the chip's own `href`
  stops emitting them. Cross-links inside components (`AfterSchool.tsx`,
  `AdmissionsProgram.tsx`, `CollegeSupport.tsx`, `AdmissionsChecklist.tsx`) are untouched.
- **Welcome Video and Latest News chips clear the hash** (bare `/school/<slug>/` plus the
  query). Those two sections are not part of the card-link scheme. `openFromHash` hands
  `welcome`/`news` to the browser's own fragment scroll, which drifts.
- **The query string and `history.state` are preserved on every write.** `?lang=es` stays.
  The written URL is relative (`location.pathname + location.search + hash`), per the
  relative-URL lesson in `analytics.ts`.
- **A no-op write is skipped** (target URL equals the current one), so re-clicking a chip
  does nothing to history.
- **Opening a card also selects its area in the table of contents** (`setActiveKey(slug)`),
  the same thing a deep-link landing does since #495. Otherwise the URL says Sports while
  the highlighted chip still says Welcome Video. The `slug` comes from the card's
  `closest('.topic-section').id` minus `topic-`.
- **Fix the pre-existing double counts with the same helper, in this plan:** the
  `replaceState` in `pushRoute()` and the one in `syncUrl()`. Same mechanism, a few lines,
  same audit. **Expect the dashboard to drop** for Compare and for non-English readers'
  in-app navigation after deploy. That drop is the count becoming correct, not lost
  traffic. The PR body and the deploy note must say so.
- **Single-phase: adds no user-facing text.** The change is URL and history behaviour only.
  No locale key, no prose, no rendered string changes. The chip `href` is not text.

## Approvals needed

- **The rule reversal: APPROVED by the user 2026-11-14.** The user asked for the URL to follow
  the reader. After reviewing this plan they approved replacing the CLAUDE.md "Read the hash,
  never write it" rule. The paragraph is edited in this PR (step 8).
- **The pre-existing double-count fix (step 2's `pushRoute`/`syncUrl` part): APPROVED by the
  user 2026-11-14.** It was found while planning, and the user chose to include it. Build it.
- No UX-gate item: no new card, section, chip or styling. The one visible change beyond the
  URL is the TOC highlight following an opened card (see Decisions), which reuses #495's
  behaviour.
- Deploy: the user's call, as always.

## Out of scope

- A "copy link" or share button. Not requested, and it would be new UI under the UX gate.
- Writing the URL on scroll (scroll-spy).
- Nested `<details>` (club-cluster rows) and citation `SourceRow` toggles. They are not
  card links.
- The Compare page, the admissions checklist and the home page. Only school pages have card
  links.
- **The fallback-browser double count.** In browsers without the Navigation API, the beacon
  patches `pushState` and listens to `popstate`. `pushRoute` dispatches a synthetic
  `popstate` after its push. When the URL has a query, the beacon's `O != rt()` check (its
  `rt()` includes the query) logs a second view. Fixing that means intercepting the
  beacon's `window` `popstate` listener. That share of browsers is small and shrinking.
  Record it in the `analytics.ts` comment as a known residual and leave it.
- Retiring the push/replace pair in `pushRoute` (the "retires in a follow-up" note in
  `analytics.ts`). Not this plan.

## Steps

Single-phase — adds no user-facing text.

1. **Add the guard to `index.html`.** Add a third inline classic `<script>` in `<head>`,
   **after the two existing inline scripts and before any module script**, with a comment
   block in the house style explaining why it exists and why it must run before the beacon
   (cite the measurements in this plan). Contents, kept tiny and dependency-free:

   ```html
   <script>
     ;(function () {
       try {
         window.__cscQuietUrl = false
         if (window.navigation && navigation.addEventListener) {
           navigation.addEventListener('navigate', function (e) {
             if (window.__cscQuietUrl) e.stopImmediatePropagation()
           })
         }
       } catch (e) {}
     })()
   </script>
   ```

   Do **not** add `{ capture: true }` as if it helped. It was measured not to reorder
   anything. Do **not** call `preventDefault()`. Also update the beacon comment block at
   the bottom of `index.html`: the beacon now uses the Navigation API, and the head guard
   is what keeps our own URL writes from counting.

2. **Add `quietReplaceUrl()` to `src/lib/analytics.ts` and route the existing replaces
   through it.**
   - New export:
     ```ts
     /** replaceState that the Cloudflare beacon does not count as a page-view. */
     export function quietReplaceUrl(url: string | URL, state: unknown = window.history.state): void {
       const w = window as unknown as { __cscQuietUrl?: boolean }
       w.__cscQuietUrl = true
       try {
         window.history.replaceState(state, '', url)
       } finally {
         w.__cscQuietUrl = false
       }
     }
     ```
     Let a throw propagate to callers, which already wrap History calls in try/catch.
   - In `pushRoute()`, replace `window.history.replaceState(null, '', path)` with
     `quietReplaceUrl(path, null)`. Leave the `pushState` alone, since it is the real
     page-view.
   - In `src/lib/i18n.ts` `syncUrl()`, replace `window.history.replaceState(window.history.state, '', url)`
     with `quietReplaceUrl(url)`. Check the import does not create a cycle: `analytics.ts`
     imports nothing from `i18n.ts` today. If it would, put `quietReplaceUrl` in a new
     leaf module `src/lib/quietUrl.ts` instead and import it from both.
   - Rewrite the stale parts of the `analytics.ts` header comment: the beacon reads
     `navigate` events where the Navigation API exists, and `replaceState` counts there
     unless it goes through `quietReplaceUrl`. Record the fallback-browser residual from
     *Out of scope*.

3. **Add the URL writer to `src/lib/cardLink.ts`.**
   ```ts
   /** Show `hash` (no leading '#'; null clears it) in the address bar, quietly. */
   export function showLinkInUrl(hash: string | null): void
   ```
   It builds `location.pathname + location.search + (hash ? '#' + hash : '')` and returns
   early if that equals `location.pathname + location.search + location.hash`. Otherwise it
   calls `quietReplaceUrl(target)` inside try/catch (a URL write must never break a click).
   Add `export function areaOfCardId(id: string): string` → `id.split('/')[0]`. Replace the
   ⛔ comment on `openFromHash` with the new rule. `openFromHash` itself still never writes.
   Only `showLinkInUrl` does, and only `replaceState`, through `quietReplaceUrl`, because a
   raw `replaceState` logs a phantom page-view in Navigation-API browsers.

4. **Wire the cards in `src/pages/SchoolDetail.tsx`.** One `useEffect` (deps `[slug]`)
   that attaches two native listeners to `mainRef.current`:
   - `click` (bubble): `const summary = (e.target as Element).closest('summary')`. Its
     `parentElement` must be a `HTMLDetailsElement` with class `note-card`, an `id`
     containing `/`, and no `.note-card` ancestor above it. Ignore the click if the target
     is inside an `a` or `button` within the summary. Record that `<details>` in a ref
     (`pendingCard`).
   - `toggle` (**capture: true**, since `toggle` does not bubble): if `e.target !==
     pendingCard.current`, return. Clear the ref, then:
     - `card.open` → `showLinkInUrl(card.id)`, and `setActiveKey(<area slug>)` from
       `card.closest('.topic-section')?.id.replace(/^topic-/, '')`.
     - closed → if `decodeURIComponent(location.hash.slice(1)).toLowerCase() === card.id`,
       `showLinkInUrl(areaOfCardId(card.id))`.
   - After every write, set `handledHash.current = slug + location.hash`, so a later
     `ready` re-run (language switch) does not treat the written hash as a new inbound link
     and scroll the reader back to it. Move the `handledHash` ref declaration above this
     effect if needed.

5. **Wire both tables of contents in `src/pages/SchoolDetail.tsx`.** Compute the area link
   once per area, `linkName(topicLabel(enT, t.slug, t.name))`, the same expression the
   deep-link effect uses. In **both** the header chips (~683–715) and the rail (~772–806):
   - research-area chip: `href={`#${areaLink}`}`, and in `onClick` after the scroll,
     `showLinkInUrl(areaLink)` and update `handledHash.current`;
   - Welcome and News chips: `showLinkInUrl(null)` and update `handledHash.current`. Keep
     their `href="#welcome"` / `href="#news"`.
   Update the "a click must never write the hash" comments on `scrollToTopic` /
   `scrollToId`. Those functions still don't write. The chip handlers do, through
   `showLinkInUrl`. Rename `scrollToTopic`'s target only if it no longer matches. It
   still scrolls to `topic-<slug>`, and the section ids **never** change (CLAUDE.md).

6. **Update `scripts/audit_card_links.mjs` (`audit:cardlink`).**
   - Invert the toggle check. Clicking a card's summary open must leave
     `location.hash === '#' + id`. Closing it must leave `'#' + <area>`. Each write must be a
     `replaceState` (0 `pushState`, `history.length` unchanged).
   - Add, once per school: click each area chip in the header TOC → hash is `#<area>`.
     Click Welcome/News (when present) → no hash.
   - Keep the load-time assertions as they are. A plain deep-link **load** still makes 0
     pushState and no hash-changing write. Only clicks write.
   - Update the header comment and the final `ok:` line ("0 History calls" is no longer
     the claim. Say "URL follows clicks, 0 pushState").

7. **New `scripts/audit_page_views.mjs` + `"audit:pageviews"` in `package.json`.** This is
   the telemetry guard. Headed Chrome (`channel: 'chrome'`). It must **let
   `static.cloudflareinsights.com/beacon.min.js` load** and intercept only the beacon POSTs
   (`page.route('**/cdn-cgi/rum**', …)`). Parse `postData()` JSON, record `eventType`, and
   `route.fulfill({ status: 204, body: '' })` so nothing reaches the dashboard. Count
   `eventType === 1` (`Load`) events. `--base` (default `http://localhost:4173`), exit 0/1/2
   like `audit:cardlink`. Assertions:
   - `/school/providence-day/`: after settle, exactly 1 Load. Then open 3 cards, close 1,
     click 2 area chips and the Welcome chip → still exactly 1 Load, and the URL changed
     as expected.
   - The same page with `?lang=es` → 1 Load, then the same clicks → still 1.
   - In-app navigation from `/school/providence-day/?lang=es` to another school by clicking
     a real in-app link → exactly **+1** Load (was +2 on 2026-11-14).
   - Compare: from `/compare/?topic=sports&schools=…` (build the URL with `toCompare` or
     copy a real one), click one school toggle → exactly +1 Load.
   - Switch language through the real language control on a school page → +0 Loads.
   - First, assert that `'navigation' in window` is true in the test browser. If it is not,
     the audit proves nothing and must exit 2 saying so.
   - If the beacon does not send its initial Load from `localhost` (it should, since the
     token is not domain-checked client-side, but verify), say so and allow
     `--base https://charlotteschoolinsights.com` **only after deploy and only with the
     user's go-ahead**. The interception still blocks every POST.
   Not chained into `npm run build`, since it needs a served build, like `audit:cardlink`.

8. **Replace the old rule everywhere it is written.**
   - `CLAUDE.md` → "Card deep links": replace the **"Read the hash, never write it."**
     paragraph. New text: card and area clicks show the link in the address bar through
     `showLinkInUrl` → `quietReplaceUrl` (replaceState only, never pushState or
     `location.hash`). The beacon counts any raw replaceState as a page-view where the
     Navigation API exists, and the `<head>` guard in `index.html` is what stops it.
     Loads and `openFromHash` still never write. `npm run audit:pageviews` is the check.
     Also amend the `audit:cardlink` sentence ("0 History calls" → "0 pushState, URL
     follows clicks").
   - The comments named in steps 2–6 (`cardLink.ts`, `SchoolDetail.tsx` deep-link effect
     and chip helpers, `analytics.ts`, `index.html`, both audit headers).
   - `.claude/SKILLS.md`: no change (no skill or command changes). Confirm and say so in
     the PR.

9. **Branch, build, PR.** `git checkout -b feat/shareurl`, stage explicit paths only (see
   *Files touched*), PR body via `--body-file`. The body must state the dashboard drop for
   Compare and `?lang=` navigation (step 2) and why it is a correction. Merge per the
   standing workflow. **Do not deploy.** End with "merged — ready to deploy whenever you
   want it."

## Files touched

| File | Change |
|---|---|
| `index.html` | edit — inline `<head>` navigate guard; beacon comment updated |
| `src/lib/analytics.ts` (or new `src/lib/quietUrl.ts`) | edit — `quietReplaceUrl()`; `pushRoute` uses it; header comment corrected |
| `src/lib/i18n.ts` | edit — `syncUrl` uses `quietReplaceUrl` |
| `src/lib/cardLink.ts` | edit — `showLinkInUrl()`, `areaOfCardId()`; ⛔ comment replaced |
| `src/pages/SchoolDetail.tsx` | edit — delegated card click/toggle listeners; both TOCs write the area link; chip `href`s; comments |
| `scripts/audit_card_links.mjs` | edit — toggle check inverted; chip-click checks; header |
| `scripts/audit_page_views.mjs` | new — beacon Load-count audit |
| `package.json` | edit — `audit:pageviews` script |
| `CLAUDE.md` | edit — Card deep links rule replaced |
| `.claude/plans/shareurl.md`, `.claude/plans/INDEX.md` | edit — status, PR, implementation notes |

## Verification

- [ ] `npx tsc -b` — clean (trust `tsc -b`, not `--noEmit`; see memory)
- [ ] `npm run build` — succeeds (includes `check:cardlink`, `check:seo`, `check:chrome`;
      none should move, and `check:seo` must still pass with the new chip `href`s)
- [ ] `grep -n '<script' dist/school/providence-day/index.html` — the new guard is an
      inline script **before** the module bundle and the beacon on a pre-rendered page
- [ ] `npx vite preview` in one shell, then `npm run audit:cardlink` — passes, with the
      inverted toggle checks
- [ ] `npm run audit:pageviews` — every assertion passes: 1 Load per page load, +0 for
      card/chip clicks and language switch, +1 (not +2) for in-app navigation with
      `?lang=es` and for a Compare toggle
- [ ] **Negative test, isolating the assertion:** temporarily change the guard's
      `stopImmediatePropagation()` line to a no-op in `dist/` (the artifact under test, not
      `index.html`), re-serve, and confirm `audit:pageviews` **fails** with phantom Loads.
      Read which message printed. Then rebuild and confirm the diff is clean.
- [ ] Manual, headed Chrome on the preview: open three cards on Providence Day → the address
      bar shows the last card's link. Copy it into a new tab → that card opens. Press Back
      once → you leave the school page (no stepping through cards). Switch to Español → the
      URL keeps the hash and `?lang=es`, and the page does not jump back to the card after
      you scroll away. Click the Sports chip → `#sports`. Click Welcome Video → bare URL.
- [ ] Manual, on Safari if available (it may or may not have the Navigation API): the URL
      still follows clicks. Note in the PR whether `navigation` existed there.

## Risks

| Risk | Mitigation |
|---|---|
| The beacon changes again (it already moved from pushState-patching to the Navigation API since PR #104) | `audit:pageviews` measures real beacon POSTs, not our reading of its source. Re-run it after any beacon-related report. Write the measured version (`2026.10.1`) into the `index.html` comment. |
| Guard runs after the beacon on some page | It is an inline head script, so it always runs during parsing. The `dist` grep in Verification confirms the order on a pre-rendered page. |
| `stopImmediatePropagation` hides navigations from some other `navigate` listener | The app registers none (`grep -rn "navigate'" src` is empty today). The flag is set only during our own synchronous `replaceState`. |
| A language switch re-runs the deep-link effect and scrolls back to the written card | `handledHash.current` is updated on every write (steps 4–5). This is checked manually in Verification. |
| Dashboard numbers drop after deploy and look like lost traffic | Stated in the PR body and the deploy note: Compare and `?lang=` in-app navigations were double-counted before. |

## Open questions

None. Both questions raised while planning were settled by the user on 2026-11-14: the rule
reversal is approved, and the `pushRoute`/`syncUrl` double-count fix is in scope.

## Implementation notes

Built as planned, with these differences:

- **`quietReplaceUrl()` lives in `src/lib/analytics.ts`.** It creates no import cycle,
  because `analytics.ts` imports nothing. `cardLink.ts` imports it as `./analytics.ts`
  because `check:cardlink` imports `cardLink.ts` under plain Node. `analytics.ts` touches
  `window` and `import.meta.env` only inside functions, so that import is safe.
- **The negative test found one more double count the plan did not list.** With the guard
  disabled, a plain `?lang=es` **load** logged 2 page-views. The extra one comes from
  `syncUrl()` running at startup after the beacon has registered. It is not one of the
  `src/main.tsx` writes, which do run before the beacon. Routing `syncUrl` through
  `quietReplaceUrl` fixes it as well, so every first visit from a `?lang=` link was
  counted twice until now.
- **`audit:pageviews`, the in-app navigation step:** the only cross-school link on the
  Providence Day page is in the Wells Fargo Cup table, inside a closed card. The audit
  opens that card through `d.open = true`, which writes no URL, and then clicks the link
  for real. It also waits for the Welcome Video chip's re-aiming scroll to finish before
  that click. A click made mid-scroll landed on whatever had moved under the pointer and
  navigated nowhere, which first showed up as a false "0 page-views". The audit now fails
  outright when the click does not navigate.
- **`audit:cardlink` chip checks run during the collect pass** (one page per school), not
  as separate probes. The first full run failed 2 of 711 links, and both passed when those
  two schools were re-run alone. One was a chip click that landed mid-scroll, the same
  harness problem as above, so the chip clicks now wait until `scrollY` holds still. The
  other was a one-off landing miss on Charlotte Catholic's camp catalog, unrelated to URL
  writes. The full run after the fix was clean: 742 links on 13 schools.
- **Safari:** Playwright's WebKit (Safari 26.5 engine) has the Navigation API. The URL
  follows clicks there, and a load followed by 3 card opens and 2 chips logs exactly 1
  beacon page-view, so the guard covers Safari too. Real Safari.app was not driven.

**Measured results.** All 8 `audit:pageviews` assertions pass. The negative test
(`stopImmediatePropagation()` → `void 0` in the 15 `dist/` pages) fails 6 of them:
8 and 9 phantom page-views for the click sequences, 2 per in-app navigation, 2 per
Compare toggle, 1 per language switch, and 2 on a `?lang=es` load. `dist/` was then
restored, and a diff against the backup came back clean.
