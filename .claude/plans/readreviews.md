---
name: readreviews
title: Read Reviews research area — link boxes to GreatSchools, Niche and SchoolDigger on every school page
status: in-progress
phases: 2
created: 2026-11-25
branch: feat/readreviews
prs: []
---

# Read Reviews research area

## Goal

Every school page gains a last research area, **Read Reviews**. It holds no cards and no
research prose: just one rectangular box per review site (GreatSchools, Niche, SchoolDigger
to start), each showing the site's logo and name and opening **that school's own page on
that site** in a new tab. It works when a parent on any of the 13 school pages can click a
box and land on the right school's reviews.

## Context

**User request (2026-11-25):** "design a new research area section (for individual school
pages) called 'Read Reviews' … box form (rectangular) visual name and logos for places
parents can click on and get routed to for specific reviews about the respective school …
To start lets include GreatSchools, Niche, and School Digger." This direct request is the
UX approval for the section. Four choices were then confirmed by the user:

1. **A research area, links only.** Listed under "Research areas" in the side nav, same
   section header, own `#read-reviews` link. No cards. Off Compare and out of the
   `/add-school` coverage floor.
2. **Last** in the reading order, after Summer Programs.
3. **Logo, name, link only.** No ratings or grades copied from the sites.
4. The design was **drafted in Claude Design during planning** (done, see below).

**The design exists.** `Read Reviews Section.dc.html` in the Claude Design project
*Charlotte School Compare Website Design* (`5da24575-40bf-4787-8934-0fadfc56059f`):
https://claude.ai/design/p/5da24575-40bf-4787-8934-0fadfc56059f?file=Read+Reviews+Section.dc.html
It is a mock built on the app's own captured CSS (`app-css/app-*.css`), with the new rules
in a `<style>` block marked "NEW in this design". It shows a desktop frame (three boxes in
a row, then the map block with a striped stand-in for Google's iframe) and a 390px phone frame (one box per row, logo plate on the left). Logo plates show the
site name as plain text, which is also the default the build ships (see the logo decision). Read the file with the Claude Design MCP `read_file`
before building; it is the reference for markup, class names and CSS.

**How a research area gets onto a page today.** A topic exists when
`source-material/<topic>/<school>/` holds a file: the ingest
(`.claude/skills/ingest-source-material/build_docs.py`) writes it into
`src/data/schools.json` (`topics`, `matrix[].doc_count`), and
`topicsForSchool()` in `src/lib/manifest.ts` yields it. `SchoolDetail.tsx` then renders it
with no further wiring: the side-nav entry (line ~877), the header chips (~784), the
`<section id="topic-<slug>">` with `.topic-section-head` (~1303), scroll-spy, and the area
deep link from `areaLink(t)` (~597). The folder name `read-reviews` becomes the name
"Read Reviews" by the ingest's default title-casing, so the area link is `#read-reviews`.

**The nearest pattern is a full-substitution area** such as Learning Support
(`src/pages/SchoolDetail.tsx` ~1138–1146, 1182–1183, 1428): a typed entry replaces the
ingested prose, which `RULES[topic]` in `src/lib/metrics.ts` folds onto one metric key so
nothing slugifies into a stray prose card. Read Reviews follows it, minus the cards.

**Where a topic slug is registered** (each confirmed by grep on `learning-support`):
`TOPIC_ORDER` and `RULES` in `src/lib/metrics.ts`; `COMPARE_DEFERRED_TOPICS` in
`src/lib/manifest.ts`; `PATHS` in `src/components/TopicGlyph.tsx`; `topics.*` in
`src/locales/*.json`; `AREA_FILES` in `scripts/design_capture.mjs`; the file→topic map in
`scripts/audit_scope.mjs` (~line 118); `FLOOR_EXCLUDED_TOPICS` in
`scripts/coverage_floor.mjs`; `scripts/gen_data_schema.mjs`. It is **not** registered in
`scripts/i18n_topics.mjs`: that list is for areas with research prose, and this one has
none.

**Research findings about the three sites** (full record:
`source-material/branding/_shared/All Schools - Read Reviews - Review Site Links.md`):

- All 13 GreatSchools pages were opened and confirmed by name and address.
- **All 13 Niche reviews pages were opened in Chrome on 2026-11-25** and confirmed by name
  and city. A scripted fetch of Niche or SchoolDigger gets HTTP 403.
- **The 13 SchoolDigger URLs come from search results only**, and Charlotte Prep's was never
  confirmed. The Claude in Chrome extension refused `schooldigger.com` and
  `greatschools.org` ("Navigation to this domain is not allowed") until the user allows
  those sites in it.
- **SchoolDigger is mostly a data site for private schools.** Reviews sit on the profile
  page and are few; some schools appear to have none.
- **Logos are not free to use.** GreatSchools' terms say "You may not use GreatSchools
  Trademarks without our prior written permission." Niche's brand guidelines cover only sites that
  display licensed Niche content. SchoolDigger states no terms. See the logo decision.

## Decisions

- **It is a real manifest topic, slug `read-reviews`** — the nav, header chips, scroll-spy
  and area link then work with no special-casing, and "absence of data = no section" holds.
- **It counts as a research area wherever the page counts them** (the school header's area
  count, Home's stats, the meta description's "N areas") — the user chose "research area",
  and a header count that disagrees with the nav list beside it would be a consistency
  finding. It is last in `TOPIC_ORDER`, so it never enters a meta description's topic
  sample. *Assumption; see Open questions.*
- **It is excluded from Compare and from the coverage floor** — confirmed by the user. A
  candidate school gets this area for free, so counting it would loosen the `/add-school`
  gate by one.
- **URLs live in one hand-kept file, `src/data/reviewSites.ts`**, not in per-school modules
  — the data is 3 URLs per school, and one table is easier to check for a wrong-school link.
- **Link to the reviews page where the site has one**: GreatSchools and Niche get the
  profile URL plus `reviews/`; SchoolDigger gets the profile page (it has no other).
- **A box with no verified URL for a school is omitted; a school with no boxes gets no
  `source-material/read-reviews/` folder and so no section.** Never an empty shell.
- **Site names are brand names and stay in Latin script in every locale.**
- **No review text, rating, grade or reviewer name is copied into the repo.** The app only
  links out. This also keeps the Student-name standard out of play; do not paste review
  text into a source file, comment, commit or PR.
- **No kicker, no card count.** The dev-only "N topics" count is hidden for this area.
- **The link label is the same at every width** ("Read reviews on Niche"), as the design shows.
- **The site name appears once per box**, on the plate. The design has no second name line.
- **Logo use stays on the safe and compliant side (user, 2026-11-25: "make sure we stay on
  the safe and complient side with the logo use").** The rule, in full:
  1. **The default is a text plate**: the site's name as plain text in the app's own heading
     type and ink color. Naming a site in order to link to it is ordinary reference use.
  2. **A text plate never imitates the brand**: not the site's logo font, colors, icon or
     lockup. It is the name, nothing more.
  3. **A logo file ships only with a recorded basis**: either the site's own published terms
     expressly allow this use (followed exactly, including any attribution wording, size or
     clear-space rule), or the user holds the site's **written permission**. "No terms
     found" is not permission.
  4. **Outcome of the research: all three ship as text plates, with no logo file.**
     GreatSchools' terms require prior written permission. SchoolDigger publishes no terms.
     Niche's brand guidelines (read in Chrome, 2026-11-25) cover only sites that display
     licensed Niche content, need Niche's approval before launch, and require "Powered by"
     beside the logo, which would be untrue here. Do not re-open this per site.
  5. **No logo is hot-linked** from a site's servers, and none is redrawn, recolored or cropped.
  6. **Nothing suggests endorsement or partnership.** The note under the boxes stays.
- **The name plate is colored with the school's own color** (user chose Option A,
  2026-11-25): `background: var(--brand)` with the name in white, the design's
  **Option A**. `--brand` is already set on every school page, so the color is the
  school's, never a review site's, which keeps the logo rule intact. The design file also
  shows a rejected **Option B** (the `.is-tint` rules and its frame): do not build or port
  it; the re-capture replaces the file. Check white-on-`--brand` contrast is at least 4.5:1 for all 13
  school colors in `src/data/brands.ts`, and check the navy schools on the dark theme. A
  site that later gets a cleared logo file shows it on a white plate instead.

- **A Google map sits under the boxes, as decoration** (user, 2026-11-25: "Lets put in the
  reviews section, i dont want it on the school page as a default. I just want to use it as
  decoration cause that section is already thin"). It is a road-map view (not satellite)
  of the school. It lives **only** inside Read Reviews, never elsewhere on the page.
  - **Google's own keyless embed only**: the iframe `src` that Google Maps itself hands out
    under Share → "Embed a map" (`https://www.google.com/maps/embed?pb=…`). No API key, no
    Maps JavaScript, no screenshot or static image of a map, no undocumented
    `?output=embed` URL. Google's attribution inside the iframe is never covered or cropped.
  - **It mounts only in the browser, and only when the section nears the viewport**
    (an `IntersectionObserver`, as Latest News fetches only when visible). The pre-rendered
    HTML holds no iframe, so the pre-render cannot hang on it (the Vimeo trap).
  - **Its height is reserved** (320px, 240px on phones), so nothing shifts when it loads.
  - **Google's place card may show Google's star rating.** That is Google's widget and the
    user accepted it; we still copy no rating into the repo.
  - A school with no embed URL shows the boxes and no map. Never an empty frame.
  - **Zoom: neighborhood scale, about zoom 15, the school pinned in the center, the same
    level for all 13 schools** (user, 2026-11-25: street names and local business names
    should give "a good sense of direction and location"). The embed code is believed to
    capture the view on screen when it is copied; **confirm that on the first school**
    before doing the rest. Google decides which business labels appear; we cannot add any.
  - **Two links sit in the map's footer, stacked: "Open in Google Maps", then "Open in
    Apple Maps" below it** (user, 2026-11-25). The Apple link uses Apple's documented Map
    Links form, `https://maps.apple.com/?address=<street address, city, NC zip>&q=<school name>`
    (both values URL-encoded). It opens the Maps app on Apple devices and Apple's web map
    elsewhere. Plain text links only: no Apple or Google logo or badge.

## Approvals needed

1. **None for logos.** The user settled it: follow the logo rule in *Decisions*. `/implement`
   does not ask again and does not add a logo on its own judgment in a doubtful case; a
   doubtful case is a text plate. If the user later brings written permission from a site,
   that is a small follow-up change.
2. **Deploy** is the user's call, as always. Nothing here deploys.

The section itself is approved (direct request, 2026-11-25) and already designed.

## Source material

- **Written during planning, uncommitted:**
  `source-material/branding/_shared/All Schools - Read Reviews - Review Site Links.md` — all
  39 candidate URLs, how each was verified, site names, logo and brand-terms findings.
  It is under `branding/` on purpose: the ingest skips that folder, so the area cannot
  switch on before the code exists.
- **To be written by `/implement`:** 13 files,
  `source-material/read-reviews/<school-slug>/<School Name> - Read Reviews - Review Site Links.md`,
  each with a provenance header, the date checked, and that school's verified URLs. Then the
  `ingest-source-material` skill.

## Out of scope

- A map anywhere else on the school page, a "Location" section, directions or commute tools.

- Ratings, grades, review counts or review text from any site.
- Compare rows, stat tiles, a podcast strip, cards.
- More sites than the three named (the registry makes adding one a data edit, but each new
  site is a new approval).
- The PreK-8 pages get the same section; nothing special is built for them.
- Deploying.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout main && git pull && git checkout -b feat/readreviews`. Stage
   explicit paths only; the tree has unrelated modified `source-material` files and an
   untracked `.claude/plans/consistency7-data/` that are not part of this plan.

2. **Check the Claude Design MCP** with `list_projects`. If it is not connected, stop and
   ask the user to reconnect (`/design-login`). Read `Read Reviews Section.dc.html` from the
   project. Do not redesign it; if the user edited it since 2026-11-25, build to the edited
   file. (Note: the MCP printed a notice that it stops working no later than 2026-12-14.
   If it is already gone, stop and tell the user rather than substituting anything.)

3. **Verify the SchoolDigger URLs in a real browser.** Niche is done and GreatSchools was
   fetched at planning; do not redo them. Ask the user to turn on Claude in Chrome **and to
   allow `schooldigger.com` and `greatschools.org` in the extension**. Then, for each of the
   13 SchoolDigger URLs in the staging record: open it, confirm the page shows the school's
   **name and city** (Charlotte Prep must not be the Port Charlotte FL school), and record
   the final URL after redirects. Also:
   - settle the Carmel Christian duplicate (`9999968988` vs `9999924878`);
   - note per school whether SchoolDigger shows any reviews;
   - open the Hickory Grove GreatSchools page and record which slug spelling it settles on,
     and spot-check that the GreatSchools `reviews/` pages load.
   A URL that cannot be confirmed is left out, and that school simply has no box for the site.

4. **Write the 13 per-school source files** (paths under *Source material*) from the
   verified results, then run the `ingest-source-material` skill. Expect `schools.json` to
   gain the `read-reviews` topic with `doc_count` 1 for each school. If the manifest diff
   reorders unrelated entries, restore HEAD order (known trap). Update the staging record
   with the verification date and any corrections.

5. **Register the topic.**
   - `src/lib/metrics.ts`: append `'read-reviews'` to `TOPIC_ORDER` (last, with a comment
     citing this plan), and add `RULES['read-reviews'] = [{ match: /.*/, key: 'review-sites', label: 'Review Sites' }]`
     with the same "folds onto one key" comment the Learning Support entry carries.
   - `src/lib/manifest.ts`: add `'read-reviews'` to `COMPARE_DEFERRED_TOPICS`, and update
     the comment (it says Learning Support is the only entry).
   - `src/components/TopicGlyph.tsx`: add `'read-reviews'` to `PATHS` with the Lucide
     "message-square" path used in the design:
     `M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z`.
   - `scripts/coverage_floor.mjs`: exclude `read-reviews` from the **area** count and the
     area total (line ~100 and the `topics.length` uses). `FLOOR_EXCLUDED_TOPICS` today
     filters Compare rows only, so add a small `FLOOR_EXCLUDED_AREAS` set and filter
     `topics` through it. Run `npm run coverage:floor` on `main` first and after: the
     thinnest-school line and every `areas` figure must be **identical**.
   - `scripts/design_capture.mjs`: add `'read-reviews': 'Read Reviews Section.dc.html'` to
     `AREA_FILES`.
   - `scripts/audit_scope.mjs`: map `src/data/reviewSites.ts` to `read-reviews` beside the
     other data files (~line 118), and confirm an area with zero cards is visited by its
     area link rather than skipped.

6. **Data: create `src/data/reviewSites.ts`.**
   ```ts
   export type ReviewSiteKey = 'greatschools' | 'niche' | 'schooldigger'
   export type ReviewSite = { key: ReviewSiteKey; name: string; host: string; logo?: string }
   export const REVIEW_SITES: ReviewSite[] = [
     { key: 'greatschools', name: 'GreatSchools', host: 'www.greatschools.org' },
     { key: 'niche', name: 'Niche', host: 'www.niche.com' },
     { key: 'schooldigger', name: 'SchoolDigger', host: 'www.schooldigger.com' },
   ]
   export const REVIEW_LINKS: Record<string, Partial<Record<ReviewSiteKey, string>>> = { /* 13 schools */ }
   export function reviewLinks(slug: string): { site: ReviewSite; url: string }[]
   ```
   `reviewLinks()` returns boxes in `REVIEW_SITES` order, skipping a site with no URL. A
   header comment says: hand-maintained, verified in a browser on the date in the source
   files, and a new school needs an entry. `logo` is a path under `public/review-sites/`
   and is set only under rule 3 of the logo decision; otherwise the text plate renders.
   A site with `logo` must also carry `logoBasis` (add both fields to the type together):
   the URL of the published terms that allow the use, or the path of the committed record
   of written permission. Record the same, with the date read and the exact conditions, in
   the staging record under `source-material/branding/_shared/`. All three sites ship with
   no `logo`; the fields exist so a later written permission is a data edit.

6b. **Map data.** In the same browser session as step 3, for each of the 13 schools: open
   Google Maps, search the school by name and street address (addresses are in
   `source-material/branding/_shared/All Schools - Branding - Campus City and Address.md`),
   confirm the pin is the right campus, set the view to the zoom standard in *Decisions*
   (school centered, about zoom 15, default road-map layer, never satellite), choose
   Share → "Embed a map", and copy the iframe's `src`. On the first school, load the copied
   `src` in a tab and confirm it opens at the zoom that was on screen; if the embed ignores
   the view, stop and tell the user before collecting the other twelve. Also copy the listing's share link for "Open in Google Maps". Record both per
   school in that school's `source-material/read-reviews/` file and add to
   `src/data/reviewSites.ts`:
   `export const SCHOOL_MAPS: Record<string, { embed: string; link: string; apple: string }>`.
   Build `apple` from the school's name and the verified street address in the branding
   file, in the form given in *Decisions*, then open each of the 13 in the browser and
   confirm the pin lands on the right campus (on a Mac it may hand off to the Maps app).
   If the extension cannot reach the Embed dialog, stop and ask the user to paste the 13
   embed codes; do not build an embed URL by hand.

7. **Component: create `src/components/ReadReviews.tsx`.** Props `{ slug, schoolName }`.
   Renders, to the design's markup and class names: `p.reviews-lead`; `div.review-sites`
   with one `a.review-site` per `reviewLinks(slug)` entry (`target="_blank"
   rel="noopener noreferrer"`, as `LatestNews.tsx` does), each holding
   `.review-site-logo` (the site name in a `.review-site-plate` span; or, only when `logo`
   is set, an `<img>` with `alt={t('reviews.logoAlt', { site })}` followed by a
   `.review-site-name` line), `.review-site-blurb`,
   and `.review-site-go` with the external arrow (`M7 17 17 7M9 7h8v8`, the icon already in
   `LatestNews.tsx` / `PodcastDeepDive.tsx`); then `p.reviews-note`; then, when `SCHOOL_MAPS[slug]` exists, `div.reviews-map` holding
   `.reviews-map-frame` and `.reviews-map-foot` (the `reviews.mapCaption` text, then a
   `.reviews-map-links` column with "Open in Google Maps" to `link` and, below it, "Open in
   Apple Maps" to `apple`, both new tab). The frame is empty until an
   `IntersectionObserver` (rootMargin about 400px) sees it; then it mounts
   `<iframe src={embed} title={t('reviews.mapTitle', { school })} loading="lazy"
   referrerPolicy="no-referrer-when-downgrade" allowFullScreen>` at 100% width and height.
   Give the frame the `no-print` class. Returns `null` when
   there are no links. All text through `useTranslation()`.

8. **Wire it into `src/pages/SchoolDetail.tsx`.**
   - Beside the Learning Support block (~1142): `const reviews = t.slug === 'read-reviews' ? reviewLinks(slug) : []`
     and `const hasReviews = reviews.length > 0`.
   - Add `(t.slug === 'read-reviews' && hasReviews)` to the `proseGroups` condition (~1173)
     so the ingested link list never renders as a prose card.
   - Render `{ready && t.slug === 'read-reviews' && hasReviews && <ReadReviews … />}` after
     the Learning Support lead block (~1428).
   - Hide the dev-only `.topic-count` for this slug (~1333).
   - No Compare button appears: `COMPARE_DEFERRED_TOPICS` already gates it.

9. **CSS: `src/index.css`.** Port the rules under "NEW in this design" from the design
   file (`.reviews-lead`, `.review-sites`, `.review-site*`, `.reviews-note`). Replace the
   mock's `.is-narrow` variant with a media query at the breakpoint `.note-cards` already
   uses to drop to one column; in it the grid is `minmax(0, 1fr)` and each box is a row with
   the logo plate on the left. Do not port the `.ds-*` mock classes. No `ad-` class names.

10. **English strings: `src/locales/en.json`.**
    - `topics.read-reviews`: "Read Reviews"
    - `reviews.lead`: "See what other families say about {{school}}. Each box opens the school's page on an independent review site, in a new tab."
    - `reviews.go`: "Read reviews on {{site}}"
    - `reviews.note`: "Other organizations run these sites. The reviews and ratings are theirs, not ours and not the school's."
    - `reviews.logoAlt`: "{{site}} logo"
    - `reviews.sites.greatschools.blurb`: "Reviews from parents, plus school details."
    - `reviews.sites.niche.blurb`: "Reviews from parents and students, plus Niche's grades."
    - `reviews.sites.schooldigger.blurb`: "School data, with a few reviews." — reword to
      what step 3 found. If SchoolDigger shows no reviews for most schools, also give it its
      own `go` string ("See the school on SchoolDigger") rather than promising reviews.
    - `reviews.mapCaption`: "Where {{school}} is"
    - `reviews.mapTitle`: "Map showing {{school}}"
    - `reviews.mapOpen`: "Open in Google Maps"
    - `reviews.mapOpenApple`: "Open in Apple Maps"
    - If `check:metrics` or `check:cardlink` asks for a `metrics.read-reviews.review-sites`
      label key, add "Review Sites".
    The plain-language hook runs on this file; keep sentences short.

11. **Checker: create `scripts/check_reviewlinks.mjs`, script `check:reviewlinks`, chained
    into `npm run build`** next to `check:schoolurls`, which it mirrors (no network call).
    It fails when: a URL is not `https` or its host is not that site's `host`; one URL is
    used by two schools; a school in the `read-reviews` manifest topic has no
    `REVIEW_LINKS` entry, or the reverse; or a URL in `REVIEW_LINKS` does not appear in that
    school's `source-material/read-reviews/` file. It fails when a `SCHOOL_MAPS` `embed` does not start with
    `https://www.google.com/maps/embed?pb=`, when a `link` is not an `https` Google Maps
    URL, when an `apple` link is not `https://maps.apple.com/?` with both `address` and `q`,
    or when one embed is used by two schools.
    It also fails when a site has `logo` without `logoBasis`, when `logo` is a remote URL
    rather than a file under `public/review-sites/`, or when that file does not exist.
    Prove it with one negative test per rule
    (corrupt `reviewSites.ts`, read which message printed, restore).

12. **Schema doc and the add-school path.**
    - `scripts/gen_data_schema.mjs`: document the review-links layer (file, shape, the three
      sites, the "links only, no ratings" rule, off Compare, out of the floor) and fix the
      two sentences that call Learning Support the only `COMPARE_DEFERRED_TOPICS` entry
      (~lines 236, 1138, 1156). Add to §6's new-school list: a new school needs verified
      review links and its `read-reviews` source file. Then `npm run schema`.
    - `.claude/skills/add-school/SKILL.md`: one short step saying a new school's plan
      includes its three review links, verified in a browser. Update the add-school entry
      in `.claude/SKILLS.md` in the same PR.
    - `CLAUDE.md`: a short "Read Reviews" note under the planning section: links only, three
      sites, no ratings or review text in the repo, off Compare and the floor,
      `check:reviewlinks`.

13. **Run Phase 1 verification** (below), commit, push, and verify the push landed
    (`git rev-parse HEAD` vs `git ls-remote origin feat/readreviews`).

**→ STOP. `/implement` ends its turn here and waits for the user's review** of the English
section on the dev server (the adversarial review runs first, as for every plan).

### Phase 2 — Every other locale

UI chrome only. There is no research prose, so the overlay layer (`PROSE_TRANSLATED`) is
not touched.

1. **Translate the `topics.read-reviews` and `reviews.*` keys** into the nine other
   catalogs named by `TRANSLATED` in `src/lib/i18n.ts`: `es`, `bn`, `ht`, `te`, `fr`, `fa`,
   `it`, `hi`, `ar` (re-read the list; do not trust this count). Keep `{{school}}` and
   `{{site}}` intact; site names stay "GreatSchools", "Niche", "SchoolDigger". Follow each
   locale's register notes in `.claude/docs/prose-translation-*.md`.
2. **RTL check (`fa`, `ar`).** The Latin site name inside an RTL sentence is strong-L and
   needs no isolate, but confirm in a browser that the arrow and the logo plate sit on the
   correct sides, and mirror the row layout with logical properties if they do not.
3. **Design re-capture.** `npm run build && npx vite preview`, then per
   `.claude/docs/design-sync.md`: `npm run design:capture -- --page /school/providence-day/ --area read-reviews --name "Read Reviews Section" --refs "Providence Day" --sha <build commit> --out <dir>`,
   write it over `Read Reviews Section.dc.html` with `write_files` (pass the file's current
   etag as `if_match`), then `npm run design:verify`. Re-capture `Providence Day School.dc.html`
   and `School Page (K-8).dc.html` too, since both pages gain a section and a nav entry.
   Add the new file and its capture command to `design-sync.md` and to the project's
   `As Built - Index.md`.
4. **PR.** Body via `--body-file`. Merge with `gh pr merge --squash --delete-branch`, check
   out `main`, pull. Flip the INDEX row. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/read-reviews/<13 schools>/*.md` | new — verified links per school |
| `source-material/branding/_shared/All Schools - Read Reviews - Review Site Links.md` | new (written at planning) — updated with verification results |
| `src/data/schools.json`, `.claude/docs/**`, `src/content/**` | regenerated by the ingest |
| `src/data/reviewSites.ts` | new — site registry and per-school URLs |
| `src/components/ReadReviews.tsx` | new — the section body |
| `src/pages/SchoolDetail.tsx` | edit — substitute the prose, render the component |
| `src/index.css` | edit — the `.review-*` rules |
| `src/lib/metrics.ts` | edit — `TOPIC_ORDER`, `RULES` |
| `src/lib/manifest.ts` | edit — `COMPARE_DEFERRED_TOPICS` |
| `src/components/TopicGlyph.tsx` | edit — glyph |
| `src/locales/*.json` (10) | edit — `en` in Phase 1, the rest in Phase 2 |
| `scripts/check_reviewlinks.mjs`, `package.json` | new checker, chained into build |
| `scripts/coverage_floor.mjs` | edit — area exclusion |
| `scripts/design_capture.mjs`, `scripts/audit_scope.mjs` | edit — register the area |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | edit + regenerate |
| `scripts/card_link_names.json` | regenerate if `check:cardlink` asks (`-- --update`) |
| `.claude/skills/add-school/SKILL.md`, `.claude/SKILLS.md`, `CLAUDE.md` | edit — the new-school step and the standing note |
| `.claude/docs/design-sync.md` | edit — the new design file |
| `public/review-sites/*` | new **only** for a site with a recorded `logoBasis` (expected: none, or Niche) |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean
- [ ] `npm run check:reviewlinks` — passes; each negative test fails with its own message
- [ ] `npm run check:metrics` — no unmatched subtopic for `read-reviews`
- [ ] `npm run check:cardlink` — passes (run `-- --update` if it reports the new area name)
- [ ] `npm run coverage:floor` — areas figures identical to `main`
- [ ] `npm run schema && npm run check:schema`
- [ ] `npm run build` — whole chain green, including `check:seo` (every school's meta
      description still ≤160 characters now that its area count rose by one)
- [ ] Browser, dev server, Providence Day, Trinity Episcopal (K-8) and one more: the area is
      last in the side nav and on the page; three boxes; no prose card, no "No readable
      notes" line, no Compare button; `/school/providence-day/#read-reviews` lands on it;
      clicking the nav entry shows `#read-reviews` in the address bar
- [ ] Click **every box on all 13 schools** (39 links): each opens the right school
- [ ] Logo rule: every plate is plain text in the app's own type, or its site has a
      `logoBasis` whose conditions the rendered box meets; no image loads from a review
      site's servers (check the Network tab)
- [ ] Map zoom, each of the 13 schools, at both the 320px desktop frame and the 240px
      phone frame: the school is centered and at least two named cross streets or main
      roads are readable; all 13 sit at the same zoom level
- [ ] Map: appears under the boxes on all 13 schools, road-map view, pinned on the right
      campus; "Open in Google Maps" opens that listing and "Open in Apple Maps", below it, opens
      the same campus; `curl` of the built
      `dist/school/providence-day/index.html` contains no `google.com/maps` iframe; no
      layout shift when it loads; `npm run prerender` finishes in its usual time
- [ ] Light and dark themes; 320/360/390px with no sideways scroll
      (`npm run audit:mobile` after `npm run build && npx vite preview`)
- [ ] Compare page: no "Read Reviews" pill; Home "What you can compare": no cell
- [ ] `npm run audit:cardlink` (headed; warn the user first) — the new area link passes

### Phase 2 — Locales

- [ ] `npm run check:chrome` — no key missing from any catalog
- [ ] `npm run build` — green
- [ ] Browser: the section in `es`, `fa` (RTL) and `hi`; site names in Latin; the address
      link `?lang=es#read-reviews` lands on the section
- [ ] `npm run design:verify` — byte-for-byte match for each re-captured file

## Risks

| Risk | Mitigation |
|---|---|
| A box links to a same-name school elsewhere (Trinity Episcopal, Charlotte Prep, Carmel) | Step 3 confirms name **and city** in a browser; the 39-click check in verification |
| Logo use breaches a site's terms | The logo rule in *Decisions*: text plates unless published terms or written permission allow a logo; `check:reviewlinks` refuses a `logo` with no `logoBasis` |
| Another session runs the ingest while `source-material/read-reviews/` exists but the code does not | The staging record lives under `branding/`; the 13 files are written on the feature branch only |
| The area inflates the `/add-school` floor | Excluded in `coverage_floor.mjs`; before/after output compared |
| A site changes its URLs later | `check:reviewlinks` cannot see this (no network call, by design). The source files carry the date checked |
| The Claude Design MCP is retired before the re-capture (notice: by 2026-12-14) | Step 2 stops and asks the user; never substitute another canvas |

| The map iframe slows the page or hangs the pre-render | Mounted client-side only, on scroll into view, with reserved height |
| Google sets its own cookies inside the map iframe | Accepted by the user as part of using Google's embed; it loads only if a reader scrolls to the last section |
| The design-capture script meets an iframe | It already replaces iframes with a labelled box of the same size |

## Open questions

- **Should Read Reviews count in "N research areas"** (school header, Home stats, meta
  description)? Owner: user. **Default:** yes, counted everywhere the page counts areas.
- **Keep SchoolDigger where it shows no reviews for a school?** Owner: user. **Default:**
  keep the box on every school with a verified page, with a blurb and link label that
  promise school data rather than reviews.
