---
name: arrangements
title: Home-page rearrangement — drop the nav Compare link, swap the two home sections, simplify the school cards, and remove the blueprint corner marks site-wide
status: english-done
phases: 2
created: 2026-08-23
branch: feat/arrangements
prs: []
---

# Home-page rearrangement and blueprint-corner removal

## Goal

Four independent visual simplifications, gathered because they were reviewed together:

1. **Remove the "Compare" link from the top nav**, leaving Contact us / language / theme.
2. **Swap the two home-page sections** — *The schools* moves above *What you can explore*,
   headings and all.
3. **Simplify the school cards** — drop the row of topic chips (which shortens the card),
   and reword the meta line from `8 topics · 53 documents` to
   `8 topics · 53 documents distilled`.
4. **Remove the `+` blueprint registration marks** from every corner they appear on, in all
   nine call sites across the app.

Done when the home page renders in the new order with shorter, chip-free school cards, no
`+` marks appear anywhere in the app, the top nav has no Compare link, and the reworded
meta line reads naturally in all ten locales.

## Context

### 1 — The nav Compare link

[App.tsx:62-68](src/App.tsx#L62-L68), inside `.nav-actions`:

```jsx
<a
  className={`navlink ${route.name === 'compare' ? 'on' : ''}`}
  href={toCompare(topics[0]?.slug ?? null, allSlugs)}
  onClick={(e) => { e.preventDefault(); navigate(toCompare(topics[0]?.slug ?? null, allSlugs)) }}
>
  {t('nav.compare')}
</a>
```

`grep -rn "nav.compare" src/ scripts/ index.html` returns **exactly this one JSX line**
plus the ten catalog entries. This is the only `.navlink` in the app — CSS at
[index.css:263-272](src/index.css#L263-L272), a mobile hide at
[index.css:2365](src/index.css#L2365), and a print hide at
[index.css:2354](src/index.css#L2354) (`.navlink` is the last selector in that grouped
print rule, so removing it there needs care with the trailing `{ display: none; }`).

**Reachability after removal — verified, not assumed.** Compare stays reachable from:
the hero `Compare schools` CTA ([Home.tsx:50-56](src/pages/Home.tsx#L50-L56)), all seven
`Compare all →` topic cells ([Home.tsx:96-110](src/pages/Home.tsx#L96-L110)), the
per-topic compare links on school pages, and the pre-rendered `/compare` route in
`scripts/seo_routes.mjs`. **No route is removed**, so `npm run check:seo` is unaffected.

The trade-off the user accepted: from a *school detail* page there is no longer a
one-click path to Compare — you go Home first. That is deliberate.

### 2 — The section swap

[Home.tsx:93-152](src/pages/Home.tsx#L93-L152) holds two sibling `<section className="block">`
elements in this order: topics (`aria-labelledby="topics-h"`) then schools
(`aria-labelledby="schools-h"`, `id="schools"`). Swapping is a straight reorder of the two
JSX blocks — no shared state, no prop threading, `allSlugs` and `navigate` are in scope for
both.

**Two things the swap moves that are easy to miss:**

- **`.block + .block { border-top: 1px solid var(--border); }`**
  ([index.css:677](src/index.css#L677)) draws the divider on whichever section is *second*.
  After the swap the rule still applies correctly — the divider stays between them — but
  it now sits under the schools grid rather than under the topic grid. No CSS change
  needed; noted so it is not "fixed".
- **The `#schools` anchor.** The hero's `Browse a school` button
  ([Home.tsx:58-68](src/pages/Home.tsx#L58-L68)) scrolls to `document.getElementById('schools')`.
  The `id="schools"` must travel with the schools section, which it does automatically if
  the whole `<section>` is moved as a unit. `.block { scroll-margin-top: 70px; }` keeps
  the offset. The button becomes a much shorter scroll — that is fine and expected.

### 3 — The school cards

[Home.tsx:117-150](src/pages/Home.tsx#L117-L150). Two edits:

- Delete the `<div className="school-card-topics">` block
  ([Home.tsx:141-147](src/pages/Home.tsx#L141-L147)) with its `.mini-chip` spans.
- Reword `home.schoolCardMeta`, today `"{{topics}} topics · {{documents}} documents"`
  ([en.json:113](src/locales/en.json#L113)), to
  `"{{topics}} topics · {{documents}} documents distilled"`.

**`covered` is still needed** — it feeds `topics: covered.length` on the meta line, which
the user chose to keep. Do **not** delete the `topicsForSchool(s.slug)` call. `TopicGlyph`
and `topicLabel` become unused *in the schools section* but are still used by the topics
section ([Home.tsx:106-107](src/pages/Home.tsx#L106-L107)) — **keep both imports.**

**"distilled" is established vocabulary here, not a new coinage.** The hero stat tile
already says `source documents distilled`
([en.json:107-108](src/locales/en.json#L107-L108)) and all ten catalogs already carry a
translation of that word (`destilados`, `distillés`, `distillati`, `संकलित`,
`سند منبع خلاصه‌شده`, …). **Phase 2 should reuse each locale's existing choice** rather than
picking a fresh word — that is the single most useful instruction in this plan for the
translation pass.

**CSS that becomes dead.** `.school-card-topics` ([index.css:740](src/index.css#L740)) and
`.mini-chip` ([index.css:554-566](src/index.css#L554-L566)) — and `grep -rn "mini-chip" src/`
confirms `.mini-chip` is used **only** on these cards, nowhere else. Both rule sets should
be deleted, not left orphaned.

**Card height.** `.school-card` is `display: flex; flex-direction: column; gap: 12px`
inside `.school-grid { align-items: stretch }`
([index.css:719-740](src/index.css#L719-L740)). Removing the chips shortens every card, and
because the grid stretches, all cards in a row shrink together — no ragged heights. The
chips row carried `margin-top: auto` to push itself to the bottom; with it gone the head
block is the only child and needs no replacement rule.

### 4 — The blueprint corner marks

[BlueprintCorners.tsx](src/components/BlueprintCorners.tsx) is a 9-line component
rendering four `<i className="bp-corner …" />` elements. **Nine call sites across six
files**, all confirmed by grep:

| File | Line(s) | What it frames |
|---|---|---|
| [Home.tsx](src/pages/Home.tsx#L49) | 49 | the hero `Compare schools` CTA (`.cta-frame`) |
| [Home.tsx](src/pages/Home.tsx#L131) | 131 | each school card |
| [SchoolDetail.tsx](src/pages/SchoolDetail.tsx#L441) | 441 | `.dossier-header` |
| [SchoolDetail.tsx](src/pages/SchoolDetail.tsx#L774) | 774, 802, 832, 867, 905, 947, 988, 1048 | each `.note-card` (course/sports/arts/college/after-school/summer/clubs/generic) |
| [Compare.tsx](src/pages/Compare.tsx#L266) | 266 | `.table-frame` |
| [WelcomeVideo.tsx](src/components/WelcomeVideo.tsx#L39) | 39 | `.welcome-frame` |
| [LanguagePicker.tsx](src/components/LanguagePicker.tsx#L78) | 78 | the open `.lang-panel` |
| [PodcastDeepDive.tsx](src/components/PodcastDeepDive.tsx#L105) | 105 | the open `.podcast-panel` |
| [CellQual.tsx](src/components/CellQual.tsx#L104) | 104 | the Compare cell tooltip |

The user chose **remove everywhere**, so the component file is deleted outright.

**The marks are purely decorative** — `<i>` elements with no text, `pointer-events: none`,
`aria-hidden` by having no content. Removing them changes no accessibility tree and no
layout: they are absolutely positioned at `-6px` **outside** their parent's border box, so
nothing reflows. **The hairline borders they sat on are drawn by the parent** — `.cta-frame`,
`.school-card`, `.note-card`, `.table-frame` etc. each own their own `border: 1px solid
var(--border)`. **Do not remove those borders**; the frames stay, only the `+` marks go.

**CSS to delete:** the `.bp-corner` block at
[index.css:2065-2080](src/index.css#L2065-L2080) (seven rules including the `::before` /
`::after` and the four `.tl/.tr/.bl/.br` logical-inset variants). Also drop `.bp-corner`
from the grouped print rule at [index.css:2354](src/index.css#L2354) — the selector list
continues to `.qual-dot, .no-print, .btn.contact, …`, so deleting the one line is safe as
long as the commas stay well-formed.

**Two comments reference the component and go stale.** The design-provenance comment at
[index.css:905](src/index.css#L905) explains that the mock's `.corner` marks became
`<BlueprintCorners />` / `.bp-corner`. Reword it rather than deleting the surrounding
comment — it also records why `.corner` was *not* reused (it means a Compare-table sticky
cell). The doc-comment inside `BlueprintCorners.tsx` goes with the file.

### Layers and checks

**Everything here is UI chrome.** Only one catalog string changes
(`home.schoolCardMeta`), and one becomes orphaned (`nav.compare`). **Nothing touches
`src/data/**`, the overlay layer, hashes, or extraction** — so no `check:runtime`,
`check:live`, `check:sepdrift`, `check:figures` work is involved. `PROSE_TRANSLATED` is
not in scope.

**`nav.compare` should be deleted from all ten catalogs, not left behind.** No script in
this repo reports orphaned chrome keys (`check_chrome_keys.mjs` verifies the opposite
direction — that a *promised* key exists), so a stale key would sit there silently. Remove
it in the same pass that removes the JSX.

`npm run check:chrome` reads all ten catalogs and is the gate for `home.schoolCardMeta`
existing everywhere. It reports "present in `en`, missing elsewhere" on its own exit-0
path, which is exactly the state Phase 1 ships in.

## Decisions

- **Compare stays reachable only from Home** — the user chose "just remove it"; no footer
  link is added and the hero CTA is kept.
- **All nine corner-mark sites go, and the component is deleted** — the user chose
  "everywhere". A component with zero call sites is worse than none.
- **The topic count stays on the meta line** — user's choice; only the chip row is removed.
- **`nav.compare` is deleted from all ten catalogs** rather than left orphaned — nothing
  in the repo would ever flag it.
- **The parent borders stay** — only the `+` marks are decorative; `.school-card`,
  `.cta-frame`, `.note-card`, `.table-frame` keep their hairlines.
- **`.mini-chip` and `.school-card-topics` CSS is deleted** — grep confirms `.mini-chip`
  has no other consumer.
- **Phase 2 reuses each locale's existing word for "distilled"** from
  `home.stats.documents_*` rather than choosing a new one — it keeps the home page
  internally consistent within each language.

## Approvals needed

**None outstanding.** The UX-design gate covers *ingestion* silently growing the UI; this
is a direct user request to change UI, which the standard explicitly exempts ("The same is
true of any direct request to add or restyle UI"). The three open judgment calls were put
to the user during planning and answered: remove the nav link outright, remove the corner
marks everywhere, keep the topic count.

## Out of scope

- Any change to the Compare page itself, its route, or `seo_routes.mjs`.
- The hero CTAs, stat tiles, eyebrow, lede, or freshness line.
- The topic grid's contents or its `hairline-grid` cell-edge rules — the section moves as
  a unit, unchanged inside.
- The school-page (`SchoolDetail`) layout beyond removing nine `<BlueprintCorners />`
  elements.
- Any `src/data/**` prose, overlay, or research content.
- Deploying. `npm run deploy` is the user's call, separately, after merge.

## Steps

### Phase 1 — English

1. **Remove the nav Compare link** — in [src/App.tsx](src/App.tsx), delete the
   `<a className={`navlink …`}>` element at lines 62-68 inside `.nav-actions`. Then remove
   the now-unused pieces of line 3's import (`toCompare`) and line 21's `allSlugs` **only
   if nothing else in the file uses them** — check first: `topics` (line 8) and `schools`
   (line 8) are both used elsewhere in the file, so trim precisely rather than by eye.
   `npx tsc --noEmit` will catch an over-trim; an unused import will not fail the build, so
   grep the file rather than relying on the compiler.

2. **Delete the `nav.compare` key from `src/locales/en.json`.** (The other nine catalogs
   are Phase 2 — see the note there; this is a deletion, so doing it in one pass would also
   be defensible, but keeping the split makes the two phases reviewable independently.)

3. **Swap the two home sections** — in [src/pages/Home.tsx](src/pages/Home.tsx), move the
   entire `<section aria-labelledby="schools-h" … id="schools">` block (lines 114-152)
   **above** the `<section aria-labelledby="topics-h">` block (lines 93-112). Move each as
   a complete unit including its `<h2>`; change nothing inside either. Verify `id="schools"`
   travelled with it.

4. **Drop the school-card topic chips** — in the same file, delete the
   `<div className="school-card-topics">…</div>` block (lines 141-147). **Keep** the
   `const covered = topicsForSchool(s.slug)` line — the meta line still uses
   `covered.length`. Keep the `TopicGlyph` and `topicLabel` imports; the topics section
   still uses both.

5. **Reword the meta string** — in [src/locales/en.json](src/locales/en.json#L113) change
   `home.schoolCardMeta` to `"{{topics}} topics · {{documents}} documents distilled"`.
   Preserve the `·` (U+00B7) with a space either side and both `{{…}}` placeholders
   verbatim.

6. **Remove every `<BlueprintCorners />` call site** — nine of them, in
   [Home.tsx](src/pages/Home.tsx) (lines 49, 131),
   [SchoolDetail.tsx](src/pages/SchoolDetail.tsx) (441, 774, 802, 832, 867, 905, 947, 988,
   1048), [Compare.tsx](src/pages/Compare.tsx#L266),
   [WelcomeVideo.tsx](src/components/WelcomeVideo.tsx#L39),
   [LanguagePicker.tsx](src/components/LanguagePicker.tsx#L78),
   [PodcastDeepDive.tsx](src/components/PodcastDeepDive.tsx#L105) and
   [CellQual.tsx](src/components/CellQual.tsx#L104). Delete the matching `import` line from
   each of those six files. **Leave every parent element and its `border` intact** —
   `.cta-frame`, `.school-card`, `.dossier-header`, `.note-card`, `.table-frame`,
   `.welcome-frame`, `.lang-panel`, `.podcast-panel`, the Compare tooltip.
   Re-grep afterwards: `grep -rn "BlueprintCorners" src/` must return nothing.

7. **Delete the component** — remove
   [src/components/BlueprintCorners.tsx](src/components/BlueprintCorners.tsx).

8. **Delete the dead CSS** in [src/index.css](src/index.css):
   - the `.bp-corner` block, lines 2065-2080 (the base rule, the `::before`/`::after`
     pair, and the four `.tl/.tr/.bl/.br` logical-inset rules);
   - the `.bp-corner,` line from the grouped `@media print` selector list at line 2354 —
     keep the surrounding commas well-formed so `.qual-dot`, `.no-print`, `.btn.contact`,
     `.podcast-strip`, `.podcast-pageline`, `.nav-school` and `.navlink` still resolve;
   - `.school-card-topics` (line 740) and `.mini-chip` + `.mini-chip svg`
     (lines 554-566).
   Leave `.cta-frame` (line 651) — it is the CTA's own border, not a corner mark. Leave
   `.table-frame`'s `position: relative` (line 2064); it is harmless and the block comment
   above it should be reworded rather than the rule deleted.

9. **Decide the `.navlink` CSS.** After step 1 the app has no `.navlink` element. Delete
   `.navlink`, `.navlink:hover`, `.navlink.on` (lines 263-272), the mobile hide (line 2365)
   and the print-rule entry (line 2354) **together**, so no half-dead selector survives.
   Confirm with `grep -rn "navlink" src/` returning nothing.

10. **Reword the two stale comments** — the design-provenance comment at
    [index.css:905](src/index.css#L905) mentioning `<BlueprintCorners />` / `.bp-corner`,
    and the `/* comparison table — blueprint frame with registration marks at the corners */`
    comment above `.table-frame` at [index.css:2063](src/index.css#L2063). Keep the part of
    the first comment explaining why `.corner` was not reused — that reason still holds.

11. **Build and check** — run the Phase 1 verification below.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version looks right.

### Phase 2 — Every other locale

Scope is **UI chrome only** — the nine non-English `src/locales/*.json` catalogs named by
`TRANSLATED` in [src/lib/i18n.ts](src/lib/i18n.ts): `es`, `bn`, `ht`, `te`, `fr`, `fa`,
`it`, `hi`, `ar`. **The overlay / `PROSE_TRANSLATED` layer is not involved** — no
extraction, no hashes, no `check:runtime` or `check:live` work.

1. **Translate `home.schoolCardMeta` in all nine catalogs** — append the locale's own word
   for *distilled* to the existing string. **Take that word from the same catalog's
   `home.stats.documents_one` / `documents_other`**, which already renders
   "source documents distilled" in the hero tile:

   | Locale | Existing hero wording | Existing card wording |
   |---|---|---|
   | `es` | `documentos fuente destilados` | `{{topics}} temas · {{documents}} documentos` |
   | `fr` | `documents sources distillés` | `{{topics}} sujets · {{documents}} documents` |
   | `it` | `documenti originali distillati` | `{{topics}} argomenti · {{documents}} documenti` |
   | `ht` | `dokiman sous distile` | `{{topics}} sijè · {{documents}} dokiman` |
   | `bn` | `উৎস-নথি সংক্ষেপিত` | `{{topics}}টি বিষয় · {{documents}}টি নথি` |
   | `te` | `మూల పత్రాలు సంగ్రహించబడ్డాయి` | `{{topics}} అంశాలు · {{documents}} పత్రాలు` |
   | `hi` | `स्रोत दस्तावेज़ संकलित` | `{{topics}} विषय · {{documents}} दस्तावेज़` |
   | `fa` | `سند منبع خلاصه‌شده` | `{{topics}} موضوع · {{documents}} سند` |
   | `ar` | `وثيقة مصدرية مُقطَّرة` | `{{topics}} موضوعات · {{documents}} وثائق` |

   Adjust for agreement — the hero form modifies *source documents*, the card form modifies
   *documents*, so Romance-language participles may need a different ending (`es`:
   `documentos destilados`, not `destilado`). Keep the `·` and both `{{…}}` placeholders
   byte-identical. `ar` and `fa` are RTL: the placeholders are numeric and the surrounding
   text is Arabic-script, matching the existing string's structure — do not add bidi marks
   the current value does not have.

2. **Delete `nav.compare` from the nine catalogs** — the key has no consumer after Phase 1.
   Note `ar.json` is offset from the others (its `nav`/`home` blocks sit at different line
   numbers), so locate the key by name, not by line.

3. **Re-run the locale checks** below.

## Files touched

| File | Change |
|---|---|
| `src/App.tsx` | edit — remove the `.navlink` Compare anchor and any imports it alone used |
| `src/pages/Home.tsx` | edit — swap the two sections; drop the school-card chip row; drop 2 `<BlueprintCorners />` |
| `src/pages/SchoolDetail.tsx` | edit — drop 9 `<BlueprintCorners />` and the import |
| `src/pages/Compare.tsx` | edit — drop 1 `<BlueprintCorners />` and the import |
| `src/components/WelcomeVideo.tsx` | edit — drop 1 `<BlueprintCorners />` and the import |
| `src/components/LanguagePicker.tsx` | edit — drop 1 `<BlueprintCorners />` and the import |
| `src/components/PodcastDeepDive.tsx` | edit — drop 1 `<BlueprintCorners />` and the import |
| `src/components/CellQual.tsx` | edit — drop 1 `<BlueprintCorners />` and the import |
| `src/components/BlueprintCorners.tsx` | **delete** |
| `src/index.css` | edit — delete `.bp-corner` (×7 rules), `.navlink` (×3), `.mini-chip` (×2), `.school-card-topics`; trim 2 print-rule selectors; reword 2 comments |
| `src/locales/en.json` | edit — reword `home.schoolCardMeta`, delete `nav.compare` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — same two changes (Phase 2) |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean.
- [ ] `grep -rn "BlueprintCorners" src/` — **no output**, and the file is gone.
- [ ] `grep -rn "bp-corner\|navlink\|mini-chip\|school-card-topics" src/` — **no output**.
- [ ] `grep -rn "nav.compare" src/` — **no output**.
- [ ] `npm run check:chrome` — exit 0. `home.schoolCardMeta` present in `en`; the nine
      "pending translation" notices are the expected Phase-1 state.
- [ ] `npm run build` — succeeds. It chains `check:schema`, `check:live`, `check:runtime`,
      `prerender`, `seo:files` and `check:seo`; **all should be unaffected**, since no
      route, school, or `src/data` prose changed. If `check:live` or `check:runtime`
      reports anything, something outside this plan's scope was touched — stop and look.
- [ ] `npm run check:seo` — exit 0; `/compare` is still a pre-rendered route.
- [ ] **Browser check** (`npm run dev`, real Chrome — this repo's standing lesson is that
      render-layer defects survive every source check):
  - Home renders **The schools** first, **What you can explore** second, with the hairline
    divider still between them.
  - School cards show badge + name + `8 topics · 53 documents distilled`, **no chip row**,
    and are visibly shorter; all cards in a row are the same height.
  - The hero **Browse a school** button still scrolls to the schools grid.
  - Top nav shows Contact us / language / theme — **no Compare**; the hero
    **Compare schools** CTA and the topic cells' **Compare all →** still reach `/compare`.
  - **No `+` marks anywhere**: home cards, hero CTA, a school page's header and its
    collapsed *and expanded* note-cards, the Compare table frame, a Compare cell tooltip,
    the open language picker, the podcast panel, the welcome video frame. Their **borders
    are still there**.
  - Toggle dark mode — the borders still read correctly with the marks gone.

### Phase 2 — Locales

- [ ] `npm run check:chrome` — exit 0 **with no "pending translation" lines** for
      `home.schoolCardMeta`.
- [ ] `node -e "for (const f of require('fs').readdirSync('src/locales')) JSON.parse(require('fs').readFileSync('src/locales/'+f))"`
      — all ten catalogs still parse.
- [ ] `grep -rn '"compare"' src/locales/*.json | grep -c nav` — confirm `nav.compare` is
      gone from all ten (the `compare.*` block is a different key — do not delete it).
- [ ] `npm run build` — succeeds.
- [ ] **Browser spot-check the school cards in at least four locales**, including one RTL
      (`ar` or `fa`), one Indic (`hi` or `te`) and one Romance (`es` or `fr`): the meta line
      reads naturally, the `·` sits between the two counts, and the RTL line is not
      visually reversed.

## Risks

| Risk | Mitigation |
|---|---|
| Over-trimming imports in `App.tsx` after removing the nav link | `npx tsc --noEmit`; and grep the file for each identifier before deleting it — an unused import does not fail the build |
| Deleting a parent's `border` along with its corner marks, flattening a card | The marks are separate `<i>` elements; step 6 says explicitly to leave the parent untouched. The browser check looks for the borders specifically |
| The grouped `@media print` selector list breaking when `.bp-corner` / `.navlink` are removed from it | Both are in a comma list ending `{ display: none; }` — remove the lines and confirm the remaining selectors still parse; `npm run build` fails on malformed CSS |
| `#schools` anchor lost in the section swap, breaking the hero's Browse button | Move the whole `<section>` as one unit; the browser check clicks the button |
| Phase 2 inventing a new word for "distilled" per locale, desyncing card and hero copy | The Phase 2 table pins each locale's existing hero wording as the source |
| Deleting the `compare.*` catalog block while removing `nav.compare` | They are different keys; the Phase 2 check greps for the `nav`-scoped one specifically |

## Open questions

None — the three judgment calls (Compare reachability, corner-mark scope, whether the topic
count survives) were put to the user at planning time and answered.
