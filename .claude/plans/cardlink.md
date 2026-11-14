---
name: cardlink
title: Shareable links that scroll to AND open one research card on a school page, named by the area and card names
status: implemented
phases: 1
created: 2026-11-13
branch: feat/cardlink
prs: [493, 494]
---

# Card deep links

## Goal

A link such as
`https://charlotteschoolinsights.com/school/providence-day/#sports/the-college-pipeline`
loads Providence Day's page, scrolls to **The College Pipeline** card in **Sports**, and
opens it. The link is written in the **names a reader sees**: the research area's English
name, a slash, then the card's English name, with `-` between words. The scheme works for
every research card on every school page, and on translated pages too.

It must not change what Cloudflare Web Analytics records. A visit through a card link logs
as `/school/<slug>/`, exactly like a plain visit, and opening or closing a card logs
nothing.

Done when the browser check in Verification passes on the built site.

## The naming rule (HARD rule, set by the user 2026-11-13)

**`#<area name>/<card name>`**. Both parts come from the **English name exactly as the
page shows it** for that school, converted by one function, `linkName()`:

1. Turn `&` into the word `and`.
2. Remove apostrophes (`'` and `’`), so `Applicant's` becomes `applicants`.
3. Strip accents (NFD, then drop combining marks).
4. Lower-case.
5. Turn every run of characters outside `[a-z0-9]` into a single `-`. This covers spaces,
   `:`, `—`, `–`, `·`, `/`, `+`, `(`, `)` and `,`.
6. Trim `-` from both ends.

The **area** part is the area's English name, never its internal slug. The **card** part is
the card's English title as rendered for *that school*, including per-school title variants.

| Area / card as shown | Link |
|---|---|
| Sports / The College Pipeline | `#sports/the-college-pipeline` |
| Sports / Coaching: Pedigree & Continuity | `#sports/coaching-pedigree-and-continuity` |
| College Support / Where Graduates Go | `#college-support/where-graduates-go` |
| College Support / The Applicant's Edge | `#college-support/the-applicants-edge` |
| Global Exposure (slug `international-travel`) / Verdict & Visit Checklist | `#global-exposure/verdict-and-visit-checklist` |
| Financial Aid & Tuition / In-Depth Report | `#financial-aid-and-tuition/in-depth-report` |
| Learning Support & Student Services / … | `#learning-support-and-student-services/…` |
| The Arts / The TK–12 Arts Ladder (Cannon shows "The JrK–12 Arts Ladder") | `#the-arts/the-tk-12-arts-ladder` (Cannon: `#the-arts/the-jrk-12-arts-ladder`) |
| Admissions / Grade-by-Grade Application Guide — TK/K · 1–5 · 6–12 | `#admissions/grade-by-grade-application-guide-tk-k-1-5-6-12` |
| Course Offerings / Upper School Courses | `#course-offerings/upper-school-courses` |
| Sports (area only) | `#sports` |

**An area-only link** (`#sports`, `#global-exposure`) scrolls to that area's section, so the
area half of the rule also works on its own.

**HARD: the existing `#topic-<slug>` links stay working, permanently, as an additional way
in.** The user has already shared
`https://charlotteschoolinsights.com/school/providence-day/#topic-sports` (2026-11-13), so
it must keep landing on Providence Day's Sports section. `#sports` and `#topic-sports` are
two links to the same place. Never remove or rename the `topic-<slug>` section ids, and
never make `openFromHash` act on a `topic-…` hash: the browser's own anchor scroll handles
it today, and that is the behaviour being preserved. The browser audit (step 7) asserts it.

**Translated pages use the same English link.** `?lang=es#sports/the-college-pipeline`
opens the same card. The link is built from the English name even when the page shows the
card's title in Spanish, so one link works in every language.

**A rename changes the link, and the OLD link keeps working (HARD, user 2026-11-13).**
Because the name *is* the link, renaming a card or area changes its link automatically:
there is no second list of links to keep in sync. Links that are already shared must not
break, though. So every rename **also records the old name as a former name**, in
`src/lib/cardLinkAliases.ts`, and the old link keeps opening the same card forever,
exactly as `#topic-sports` is kept. **The build fails when a card or area name changes
and no former-name entry was added** (`check:cardlink`, step 2b), so the rule cannot be
forgotten. A card that is *removed* (not renamed) has nothing to open. Its old links
land on the area's section.

## Context

- **Section links already work.** Each research area is
  `<section id="topic-<slug>">` (`src/pages/SchoolDetail.tsx` ~line 1171), and
  `.topic-section { scroll-margin-top: 80px }` (`src/index.css:1038`) clears the sticky
  header. On 2026-11-13, `…/school/providence-day/#topic-sports` was checked in Chrome on
  the live site: it landed on Sports at 80px from the top and stayed there for 9s.

  The comment above `scrollToTopic` (SchoolDetail.tsx ~line 391), which says a raw
  `#topic-…` hash "would be parsed as an unknown route and bounce home", is out of date.
  It dates from the hash router. Today `parseLocation()` (`src/lib/router.ts`) reads the
  pathname first and only looks at the hash when the path is the site root and the hash
  starts with `#/`. `src/main.tsx:57` rewrites only `#/…` legacy links. A
  `#sports/the-college-pipeline` hash on a `/school/<slug>/` path is therefore inert today.
  It never starts with `/`, so it can never be mistaken for a legacy route.
- **Cards have no id and are not pre-rendered.** Every card is an uncontrolled `<details>`
  with no `id`. The live pre-rendered Providence Day HTML holds just **one** `<details>`,
  because the cards render only once `ready` is true, after the async notes load
  (`useEffect` ~line 505, `setReady(true)`). So the browser's own anchor scroll can never
  find a card on first paint. JavaScript has to open the card and scroll to it after
  `ready`.
- **Where each card's displayed title comes from.** These are all in `SchoolDetail.tsx`,
  all `<details className="note-card …">`. Find them with `grep -n "<details"`, because
  line numbers drift.
  | Line (approx.) | Area | Title expression rendered today |
  |---|---|---|
  | 1091 | prose cards, every area (`renderGroup`) | `metricLabel(tr, g.metric.key, g.metric.label, t.slug)` |
  | 1315 | `course-offerings` | `d.title`: translated data; English via `courseOfferings(slug, 'en').divisions[i].title` |
  | 1339 | `sports` | `cardTitle(tr, 'sports', card.key, card.title)` |
  | 1370 | `the-arts` | `cardTitle(tr, 'the-arts', card.key, artsCardTitle(slug, card), artsOverrideSlug(slug, card.key))` |
  | 1404 | `college-support` | `cardTitle(tr, 'college-support', card.key, card.title)` |
  | 1443 / 1494 / 1536 / 1570 / 1605 / 1638 | high-school-placement / after-school / summer-programs / admissions / international-travel / learning-support | the `cardTitle(...)` call at each site |
  | 1678 | `student-clubs` structured cards | `cardTitle(tr, 'student-clubs', card.key, clubsCardTitle(slug, card), clubsOverrideSlug(slug, card.key))` |

  The area name is `topicLabel(tr, t.slug, t.name)`. Per-school variants live in
  `en.json` as `cards.<area>.<key>@<school>` (e.g. `cards.the-arts.ladder@cannon`), which
  `cardTitle` already resolves. **Building the link from the same call with an English
  `t` gives exactly the English name the page shows for that school.** Leave out the
  nested `<details>` in `ClubClusters.tsx` and `AdmissionsProgram.tsx`, which sit inside
  cards.
- **The scroll helper to reuse:** `scrollToSection(id)` (`src/lib/scrollToSection.ts`)
  smooth-scrolls and then keeps re-aiming for 12s while the page grows: lazy Latest
  News, the research swapping in. It stops when the reader takes over (`wheel`,
  `pointerdown`, `keydown`, `popstate`). Opening the card does not move its top edge, so
  following the card is safe.
- **Analytics constraint.** The Cloudflare beacon runs with `"spa": true`
  (`index.html:132`). It records a page-view on History API navigations and reports
  `pathname` only, never the hash (`src/lib/analytics.ts:5-7`). Nothing in `src/` writes
  `location.hash` today (grep confirmed). The in-app chips call `preventDefault()` and
  `scrollToSection()` without touching the URL.
- **Ids that must not be confused with card ids:** `topic-<slug>`, `welcome`, `news`,
  `school-title`, `more-schools-heading`, `hsp-view-select`, Financial Aid report sections
  `fa-*`, and React `useId` ids. None of them contains `/`, and every card id does, so the
  two kinds can never collide.

## Decisions

- **The format is the user's hard rule above.** The slash and "& → and" were chosen by the
  user on 2026-11-13 over a single-dash join and dropping `&`.
- **The id goes on the `<details>` element itself**: `id="sports/the-college-pipeline"`.
  HTML allows `/` in an id, and `getElementById` handles it. `linkName()` and
  `cardLinkId(areaName, cardName)` live in one file, so the rule is defined exactly once.
- **Use the English translator, not a parallel name list.** In `SchoolDetail`, get
  `const enT = i18n.getFixedT('en')` and pass it to the same `topicLabel` / `cardTitle` /
  `metricLabel` call that renders the title. A second hand-kept list of names would drift
  the first time a card was renamed.
- **Course Offerings uses `courseOfferings(slug, 'en').divisions[i].title`.** Division
  order is the same in every locale, because the overlay translates values in place.
- **Read the hash; never write it.** The page reads `location.hash` once the cards are
  `ready`, and again on `hashchange` (a read-only listener). It never calls `pushState` or
  `replaceState` and never sets `location.hash`. Opening and closing a card stays a pure
  DOM change. This is the whole analytics guarantee.
- **Matching** is done on the decoded, lower-cased hash.
  - `<area>/<card>` matches a card id: open the card and scroll to it.
  - `<area>/<anything>` with no such card: scroll to the area's section.
  - `<area>` alone: scroll to the area's section.
  - Anything else (including `topic-…`, `welcome` and `news`, which the browser or the
    chips already handle): do nothing.

  The area name is resolved against the covered topics via `linkName(topicLabel(enT, …))`.
- **Former names point at the card's stable identity, never at its new name.** A card's
  identity is `<topic slug>:<card key>` (`sports:pipeline`; prose cards use
  `g.metric.key`; Course Offerings uses `linkName` of the English division title). Every
  card `<details>` carries it as `data-card="sports:pipeline"`. An alias says "former name
  X in topic T means card key K", so a card renamed twice needs no edit to its first alias.
  Area aliases map a former area name to the topic slug.
- **Former names are school-agnostic.** A card alias applies on every school page that has
  that card, which is harmless: it opens that school's own card with that key.
- **Rename detection is a build-time snapshot of the English name sources**, not a browser
  crawl. Every English card and area name comes from one of four places. Three are in
  `en.json`: `topics.*`, `cards.<topic>.<key>` (including `@<school>` variants) and
  `metrics.*` (flat and `metrics.<topic>.<key>`). The fourth is the Course Offerings
  division titles from `courseOfferings(slug, 'en')`, which imports under plain Node. The
  registry `title:` fallbacks only show when an `en.json` key is missing, and every card
  has its key. The implementer confirms that claim in step 2b rather than trusting it.
- **Open first, then scroll:** set `details.open = true`, then call `scrollToSection(id)`.
- **Run once per hash per page.** Track the last handled `slug + hash` in a ref, so a
  language switch (which re-runs the load effect and toggles `ready`) does not pull a
  reader back after they have scrolled away.
- **No copy-link button and no visible UI change.** The user asked only for links to hand
  out. A visible affordance needs its own approval.
- **`.note-card { scroll-margin-top: 80px }`**, matching `.topic-section`, so the opened
  card's title clears the sticky header.
- **Single-phase.** It adds no user-facing text: ids are not rendered text, and there is no
  new locale key.

## Approvals needed

None. The user asked for this directly on 2026-11-13 and set the naming rule. It adds no
card, section, row or visible chrome. Deploying is, as always, the user's separate call.

## Out of scope

- A visible "copy link" or share button on cards.
- Updating the URL when a reader opens a card (it would log page-views).
- Any `?ref=` / UTM tracking parameter.
- Translated-name links (`#deportes/...`). One English link serves every locale.
- Pre-rendering card bodies, and changes to `sitemap.xml` / `seo_routes.mjs`. A hash is not
  a route.
- Deep links on the Compare page or the admissions checklist.

## Steps

Single-phase: adds no user-facing text.

1. **Branch.** `git checkout main && git pull && git checkout -b feat/cardlink`.

2. **Add the helper:** new file `src/lib/cardLink.ts`:
   - `export function linkName(name: string): string`: the six-step rule above, in that
     order. The header comment quotes the rule and says it is a hard rule set by the user.
   - `export function cardLinkId(areaName: string, cardName: string): string` →
     `` `${linkName(areaName)}/${linkName(cardName)}` ``.
   - `export function openFromHash(hash: string, areas: { slug: string; link: string }[]): boolean`:
     strip the leading `#`, `decodeURIComponent` (inside try/catch), lower-case.
     - If it is empty or starts with `/` or `topic-`, return false.
     - Split it at the first `/` into `area` and `card`.
     - Resolve the area. Try `areas.find(a => a.link === area)` first, then an
       `AREA_ALIASES` entry whose `from === area`, which gives the topic slug. If neither
       matches, return false.
     - If `card` is present, resolve it inside that topic in this order:
       (1) `document.getElementById(currentArea + '/' + card)`, the current name;
       (2) a `CARD_ALIASES` entry whose `from === card` and whose `topic` is this topic
       or absent, giving `key`; then find
       `document.querySelector('details.note-card[data-card="<topic>:<key>"]')`.
       If an element is found, set `open = true`, call `scrollToSection(el.id)` and return
       true.
     - Otherwise call `scrollToSection('topic-' + slug)` and return true.

     Put a header comment on the function that **forbids writing to `location` or
     `history`**, and give the reason (Cloudflare beacon, `spa: true`, page-view per
     History call).
   - Add a small unit check, `scripts/check_card_link.mjs`, plus
     `"check:cardlink": "node scripts/check_card_link.mjs"`. It imports `linkName` under
     plain Node, because `cardLink.ts` must not import `scrollToSection` at module scope in
     a way that breaks Node: put `openFromHash` in the same file but import
     `scrollToSection` lazily, or split it into a second file. It asserts every row of the
     table in "The naming rule" exactly. Chain it into `npm run build` beside the other
     `check:*` scripts.

2a. **Former-name list:** new file `src/lib/cardLinkAliases.ts`, empty at launch:
   ```ts
   /** Former area names → topic slug. Never delete an entry: a shared link depends on it. */
   export const AREA_ALIASES: { from: string; topic: string; since: string }[] = []
   /** Former card names → card key. `topic` absent = any topic (flat `metrics.*` keys). */
   export const CARD_ALIASES: { from: string; topic?: string; key: string; since: string }[] = []
   ```
   `from` is already in `linkName()` form, and `since` is the ISO date of the rename. The
   header comment states the HARD rule (old links keep opening their card forever), says
   entries are never removed, and points at `check:cardlink`.

2b. **Rename gate, `check:cardlink`, in the build.** Extend `scripts/check_card_link.mjs`
   (from step 2) with a snapshot, `scripts/card_link_names.json`, committed and generated
   by `npm run check:cardlink -- --update`. It maps each name source to its `linkName()`:
   - every `topics.<slug>` value in `src/locales/en.json` → `area:<slug>`;
   - every `cards.<topic>.<key>` and `cards.<topic>.<key>@<school>` → `card:<topic>:<key>[@school]`;
   - every `metrics.<key>` and `metrics.<topic>.<key>` → `metric:<key>` / `metric:<topic>:<key>`;
   - every Course Offerings division, `courseOfferings(slug, 'en').divisions[i].title`
     for each school → `course:<slug>:<i>`.

   On a normal run, recompute and diff against the snapshot.
   - **A changed link name** fails unless a matching alias exists. For an area, that is
     an `AREA_ALIASES` entry `{ from: <old>, topic }`. For a card or metric, it is a
     `CARD_ALIASES` entry `{ from: <old>, key }` with the right topic, or no topic for a
     flat metric. Course Offerings uses `key: linkName(<new title>)`.
     The failure message prints the exact alias line to paste, then says to run
     `--update`.
   - **A removed source** is reported but passes, because its old links fall back to the
     area.
   - **A new source** passes and is added by `--update`.
   - Also fail on two things. An alias whose `from` equals a *current* name in the same
     topic, since it would be shadowed and is almost always a mistake. And any alias line
     deleted since `main`: compare against `git show main:src/lib/cardLinkAliases.ts`, and
     skip that comparison when `main` is not available.
   - **Confirm the "every card has an en.json key" claim** while writing this. For each
     `*_CARDS` registry (parse `key:` / `title:` the way `gen_data_schema.mjs` does) and
     each `TITLE_OVERRIDES` entry in `artsProgram.ts` / `clubsProgram.ts`, assert a
     matching `cards.*` key exists in `en.json`. If one is missing, add the key to `en.json`
     with the identical English value. That is not new text. Never widen the snapshot to
     parse fallback titles instead.

   Chain `check:cardlink` into `npm run build` beside the other `check:*` scripts. Run
   `--update` once to create the snapshot, and commit it.

3. **Put the id on every card:** in `src/pages/SchoolDetail.tsx`, define
   `const enT = i18n.getFixedT('en')` near `useTranslation()`. At each top-level card
   `<details>` in the Context table, add
   `id={cardLinkId(topicLabel(enT, t.slug, t.name), <same title expression with enT in place of tr>)}`.
   For Course Offerings, compute `const offeringsEn = t.slug === 'course-offerings' ? courseOfferings(slug, 'en') : undefined`
   beside `offerings`, and use `offeringsEn?.divisions[i]?.title ?? d.title` with the map
   index `i`.
   On the same element add `data-card={`${t.slug}:${key}`}`. The key is `card.key`, or
   `g.metric.key` for prose cards, or `linkName(<English division title>)` for Course
   Offerings.

4. **Open on load and on hashchange:** in `SchoolDetail`, add a `useEffect` with
   dependencies `[ready, slug]`:
   - If `!ready`, return.
   - Build `areas = covered.map(t => ({ slug: t.slug, link: linkName(topicLabel(enT, t.slug, t.name)) }))`.
   - Define `run`. It computes `key = slug + location.hash` and returns if
     `handled.current === key`. Otherwise it sets `handled.current = key` and calls
     `openFromHash(location.hash, areas)`. `handled` is a `useRef<string | null>(null)`.
   - Call `run()` inside `requestAnimationFrame`, so the cards from this render are in the
     DOM. Then `window.addEventListener('hashchange', run)`, and remove it on cleanup.

5. **Scroll margin:** in `src/index.css`, next to `.topic-section { scroll-margin-top: 80px; }`
   (~line 1038), add `.note-card { scroll-margin-top: 80px; }`.

6. **Fix the stale comment** above `scrollToTopic` (~line 391). Say the chips call
   `preventDefault()` so that a click never writes the hash (each History change would log a
   Cloudflare page-view), and that an inbound hash is read by `openFromHash` in
   `src/lib/cardLink.ts`. Do not change the chip behaviour.

7. **Browser audit script:** new `scripts/audit_card_links.mjs`, plus
   `"audit:cardlink": "node scripts/audit_card_links.mjs"`. Follow the
   `audit_mobile_layout.mjs` pattern: it needs `npm run build && npx vite preview`,
   `--base` defaults to `http://localhost:4173`, and it supports `--only <slug,…>`. Keep
   it out of `npm run build`. Import Playwright from a script under `scripts/`, because it
   does not resolve from the scratchpad. For every school in `src/data/schools.json`:
   - Load `/school/<slug>/` and collect every `details.note-card[id]`.
     - **Fail** if any id appears twice on the page.
     - **Fail** if any card has no id.
     - **Fail** if an id is not `linkName(area h2 text)` + `/` + `linkName(summary .topic-title text)`
       on the English page. This proves the id is the visible name and not something else.
   - For each card id, load `/school/<slug>/#<id>` in a fresh page with an `addInitScript`
     that wraps `history.pushState` / `history.replaceState` to count calls. After 3s,
     assert four things. The target `<details>` is `open`. Its
     `getBoundingClientRect().top` is between 0 and 200. Push/replace calls after load are
     **0**. `location.href` still ends with the original hash.
   - Per school, check four more links: area only (`#sports` → the Sports section top is
     between 0 and 200), **the preserved legacy form** (`#topic-<slug>` for every covered
     area → that section's top is between 0 and 200, with 0 History calls; this must
     include the exact shared link
     `/school/providence-day/#topic-sports`), an unknown card (`#sports/does-not-exist` →
     the Sports section), every `CARD_ALIASES` / `AREA_ALIASES` entry that applies to a
     card this school has (the old link opens the current card; vacuous at launch, but it
     guards every later rename), and one locale
     (`/school/providence-day/?lang=es#sports/the-college-pipeline` → the card is open and
     in view).
   - Print a per-school count and exit 1 on any failure. A full run is ~120 cards, about
     4 min.

8. **Write the link list and document the scheme:**
   - Have `audit_card_links.mjs` accept `--list`, which prints every school's full card
     links (`https://charlotteschoolinsights.com/school/<slug>/#<id>`) grouped by area, so
     the user can copy any of them.
   - Add a "Card deep links" subsection to `CLAUDE.md` under the Search-indexability
     standard. It states the hard naming rule (area name `/` card name, `-` between words,
     `&` → `and`, other punctuation dropped, English names on every locale), the
     read-never-write rule and why, the **rename rule** (a renamed card or area keeps its
     old link through `src/lib/cardLinkAliases.ts`, entries never deleted, enforced by
     `check:cardlink`), the permanent `#topic-<slug>` links, and the `check:cardlink` /
     `check:cardlink -- --update` / `audit:cardlink -- --list` commands.
   - In `scripts/gen_data_schema.mjs`, add one line where the card registries are listed,
     saying each card's link is `#<area name>/<card name>` per `linkName()` in
     `src/lib/cardLink.ts`. Then run `npm run schema`.

9. **Commit (explicit paths only, never `git add -A`), PR, merge.** Run
   `git status --short` first. Then stage `src/lib/cardLink.ts`,
   `src/lib/cardLinkAliases.ts`, `scripts/card_link_names.json`,
   `src/pages/SchoolDetail.tsx`, `src/index.css`, `scripts/check_card_link.mjs`,
   `scripts/audit_card_links.mjs`, `package.json`, `CLAUDE.md`,
   `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md`,
   `.claude/plans/cardlink.md` and `.claude/plans/INDEX.md`. Pass the PR body via
   `--body-file`, then `gh pr merge --squash --delete-branch`, then
   `git checkout main && git pull`. Flip the INDEX row to *Implemented* with the PR link.
   **Do not run `npm run deploy`.** End with "merged, ready to deploy whenever you want
   it", plus the Providence Day link list from `--list`.

## Files touched

| File | Change |
|---|---|
| `src/lib/cardLink.ts` | new: `linkName`, `cardLinkId`, `openFromHash` |
| `src/lib/cardLinkAliases.ts` | new: former area/card names (empty at launch, never pruned) |
| `scripts/card_link_names.json` | new: committed snapshot of every English name source → link name |
| `src/pages/SchoolDetail.tsx` | `id` + `data-card` on every top-level card `<details>`; hash effect; comment fix |
| `src/index.css` | `.note-card { scroll-margin-top: 80px }` |
| `scripts/check_card_link.mjs` | new: naming-rule unit check + rename gate, in the build |
| `scripts/audit_card_links.mjs` | new: browser audit + `--list` |
| `package.json` | `check:cardlink` (chained into build), `audit:cardlink` |
| `CLAUDE.md` | "Card deep links" subsection |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | one-line link note, regenerated |

## Verification

- [ ] `npm run check:cardlink`: every example in the naming-rule table converts exactly, and the snapshot matches.
- [ ] **Negative test of the rename gate** (isolate the assertion, then restore): change `cards.sports.pipeline` in `en.json` to `The College Pathway` → `check:cardlink` exits 1 and prints the alias line `{ from: 'the-college-pipeline', topic: 'sports', key: 'pipeline', … }`. Add that alias → it passes. Then, on a `vite preview` build with that rename, `#sports/the-college-pipeline` still opens the card (now titled The College Pathway). Revert `en.json`, the alias and the snapshot with `git diff` and confirm all three are clean.
- [ ] `npx tsc -b`: clean (trust `tsc -b`, not `tsc --noEmit`).
- [ ] `npm run build`: succeeds, including `check:schema`, `check:seo`, `check:live`,
  `check:runtime` and `check:cardlink`.
- [ ] `npm run build && npx vite preview`, then `npm run audit:cardlink`: exits 0. Every
  card on every school has a unique id equal to its visible English area and card name,
  opens and is in view, with **0 pushState/replaceState calls**.
- [ ] Manual check in headed Chrome: open
  `http://localhost:4173/school/providence-day/#sports/the-college-pipeline`. The College
  Pipeline card is open with its title just under the header. Clicking other cards open
  and shut does not change the address bar. Back leaves the page and does not step through
  card states.
- [ ] Same URL with `?lang=es` before the `#`: the same card opens (title shown in Spanish).
- [ ] Phone width: the same URL at 390px lands with the card title in view. Then
  `npm run audit:mobile -- --only providence-day` still passes.
- [ ] Regression: the shared link
  `http://localhost:4173/school/providence-day/#topic-sports` still lands on the Sports
  section (the user is already sharing its live form), a legacy `/#/school/cannon`
  still rewrites to `/school/cannon/`, and a plain `/school/cannon/` load does not scroll.

## Risks

| Risk | Mitigation |
|---|---|
| A future change "helpfully" updates the hash when a card opens, and Cloudflare page-views inflate | Header comment on `openFromHash` forbids it; `audit:cardlink` asserts 0 History calls |
| A card rename breaks an already-shared link | `check:cardlink` fails the build until the old name is added to `cardLinkAliases.ts`; the audit proves each alias opens the card |
| Someone prunes an "unused" alias | Header comment forbids it; `check:cardlink` fails on any alias deleted since `main` |
| An id is built from a different string than the visible title | The audit compares each id with `linkName()` of the rendered English area and card names |
| Two cards in one area convert to the same name | The audit fails on any duplicate id |
| Language switch yanks the reader back to the card | `handled` ref keyed by slug + hash |

## Open questions

None. The format, separator and `&` handling were settled by the user on 2026-11-13.

## Implementation notes

Built as planned. Where the build deviated:

- **The "every card has an en.json key" claim was false for four titles.** The
  step-2b registry check found per-school `TITLE_OVERRIDES` with no `cards.*` key:
  `the-arts.ladder@charlotte-catholic`, `admissions.guide@charlotte-christian`,
  `admissions.guide@hickory-grove-christian` and `admissions.guide@trinity-episcopal`.
  Per the plan, each was added to `en.json` with the identical English (no new text).
  No other locale has them either, so these four titles render English on every
  non-English page today, before and after this change (pre-existing, left for a
  translation pass).
- **Prose-card names in the snapshot come from the manifest, not just `en.json`.** Each
  `schools.json` document runs through `resolveMetric()` and is named the way
  `metricLabel()` names it (topic-scoped key, flat key, then label). That also covers
  fall-through metrics whose name is the raw subtopic. Every metric is keyed
  `metric:<topic>:<key>`, so its alias always carries a topic.
- **`--update` also refuses a rename that has no alias**, so the snapshot cannot be
  regenerated past the gate.
- **`linkName` turns `&` into ` and ` with spaces**, so `R&D` becomes `r-and-d`. Every
  example in the table converts identically.
- **The legacy `#topic-<slug>` landing is a warning in `audit:cardlink`, not a failure.**
  That scroll is the browser's own fragment scroll, deliberately untouched. Measured on
  the live site (main, headed Chrome, 2026-11-13), it is not stable before this change:
  `/school/trinity-episcopal/#topic-the-arts` landed at 80px on one load and did not
  scroll on the next, and `/school/providence-day/#topic-admissions` did not scroll at
  all. The first area under Latest News drifts ~340–640px as the news loads. A legacy
  probe still fails on any History call. The shared `/school/providence-day/#topic-sports`
  landed at 80px in the audit and in the manual check.
- **The audit runs headed Chrome by default (`--headless` to override), and runs the
  legacy probes one at a time.** Headless Chromium skips the post-load fragment scroll.
  A window that is not in front does too: four concurrent windows turned ~50 of 130
  legacy probes into false warnings, and every sampled one landed at 80px when re-run
  alone.
- **History accounting in the audit.** The app's own startup `?lang=` rewrite
  (`src/main.tsx`) is a `replaceState` that keeps the hash, so the audit counts every
  `pushState` plus any write that drops or changes the hash. Each card probe also closes
  and reopens the card and asserts no History write of any kind. A last area that cannot
  scroll up to the header counts as landed when the page is at its bottom (Financial
  Aid on the two K–8 pages, 259px).
- **The negative test's browser half ran on a `vite build` into a scratch dir**, served
  on port 4319 alongside the main audit. `#sports/the-college-pipeline` opened the card
  renamed "The College Pathway" (open, 80px, hash unchanged). Then `en.json`, the alias
  and the snapshot were reverted, and the diff is clean.
- **The "alias deleted since main" check is vacuous until this merges**, because
  `cardLinkAliases.ts` is not on `main` yet. The script skips it when `main` has no file.

Verification: `check:cardlink` ok (184 names); rename gate exit 1 with the alias line,
exit 0 with the alias, exit 1 on a shadowing alias; `tsc -b` clean; `npm run build`
green; `audit:cardlink` ok, 753 links on 13 schools (506 cards), 0 History calls, 21
legacy warnings; manual headed Chrome: the card is open at 80px, toggling 3 cards leaves
the URL alone with 0 History calls, Back returns to the previous page, `?lang=es` opens
"La cantera universitaria" at 80px, 390px lands at 80px, `#topic-sports` lands at 80px,
`/#/school/cannon` rewrites to `/school/cannon/`, and a plain load stays at scrollY 0;
`audit:mobile --only providence-day` clean.

### Follow-up: `#topic-<slug>` links re-aimed (#494)

After #493 the user chose the suggested fix (2026-11-13), overriding the plan's "never
make `openFromHash` act on a `topic-…` hash". `openFromHash` now re-aims
`#topic-<slug>` with `scrollToSection` once the research is ready, exactly as it does
card links. It is still read-only on the URL, and the `topic-<slug>` ids are unchanged.
`audit:cardlink` now fails a missed legacy landing instead of warning: 742 links on 13
schools, all landed, 0 History calls. (The 753 recorded above included 11 alias probes
from the rename test's temporary alias, which was still in the file when that run
started.)
