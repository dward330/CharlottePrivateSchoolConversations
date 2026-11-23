# Design sync — the Claude Design project, captured from the built app

The Claude Design project **"Charlotte School Compare Website Design"**
(`5da24575-40bf-4787-8934-0fadfc56059f`) holds one current-state design file per page
type, per research area and for the shared components. Each file is a **capture of the
built app**, not a redrawing: the real DOM from `npx vite preview`, styled by the app's
own compiled CSS. Plan: [`designsync`](../plans/designsync.md). This replaces the
paste-a-prompt approach in [`design-sync-urls.md`](design-sync-urls.md).

- **Captured from:** `main` at `ff5ab214`, 2026-11-20.
- **English only.** These are design references, not locale proofs.

## How to refresh

```
npm run build && npx vite preview              # serves http://localhost:4173
npm run design:capture -- --css --out <dir>    # app-css/app-1.css … app-N.css
npm run design:capture -- --page /school/providence-day/ --area sports \
  --name "Sports Section Redesign" --refs "Providence Day" --sha <build commit> --out <dir>
npm run design:capture -- --screens <url> [--cards closed] --name <n> --out <dir>
npm run design:verify -- --url '<serve_url>' --file <local file> --path '<project path>'
```

Every file's exact command is under **Capture commands** below. Writing goes through the
Claude Design MCP (`write_files`, inline data only), then `design:verify` fetches the
file back and compares it byte for byte. The `serve_url` it needs carries a token: pass
it on the command line, never into a file.

What a capture does (`scripts/design_capture.mjs` has the full rules):

- **Scope.** `--area <slug>` takes one `#topic-<slug>` section with every card open,
  inside shallow copies of its ancestors so the app's descendant selectors still match,
  plus an **empty side rail** so the section sits in its real column at its real width.
  Without `--area` it takes the whole app shell. `--cards closed` closes every card and
  removes its body, because a closed card still carries its body in the DOM.
- **Loading.** Never `networkidle`. The page is scrolled end to end so every section
  renders, then **Latest News is scrolled into view** (it fetches only when visible) and
  the capture waits for its headlines and then for its preview lines, which arrive in a
  second pass, one fetch per article.
- **Cleaning,** always: scripts, comments, React ids and `aria-*` / `data-*` attributes
  go, **except the ones the built CSS selects on** (scroll fades, chip tones, active tabs,
  phone table labels; the list is read from the stylesheet). Whitespace collapses, iframes
  become a labelled box of the same size, `loading="lazy"` goes so off-screen images load
  in a static file, and closed native popovers (hover tips, `display: none` in every
  state) go.
- **Trimming, only when a file would be over 40 KB untrimmed.** In a run of more than 8
  like siblings, or of more than 8 repeated rows of up to 12 flat grid cells, the first 6
  stay and one dashed `+N more in the app` line replaces the rest. Never trimmed: cards,
  sections, table cells, SVG, and the lists a reader navigates or counts (topic chips, the
  side rail, stat strips, card grids, the Home school and topic grids, Compare's pickers,
  the admissions staff grid, checklist rows, news rows).
- **One file per page.** A `--format dc` page is always written as one file, however
  large (user, 2026-11-20: "make it just one page, like what a user would see"). Two
  things settled this the same day:
  - **Pieces don't work.** A page that pulls its later sections in from other files with
    Claude Design's `<dc-import>` renders as one page, but the editor cannot edit anything
    imported: the user could not edit from the first imported section down.
  - **Big writes do.** The whole Providence Day page, 80,941 bytes, wrote and verified in
    one call, against the 40 KB that was the largest proven before.

  The capture warns, and exits 1, above 83,159 bytes, the largest write proven so far
  (Providence Day with card links). The
  40 KB figure is now only the trimming threshold. `--format plain` still splits over the
  cap into standalone `<name> (k of N).dc.html` files.
- **Card links.** A school page captured with its cards closed (Providence Day, the K-8
  page) gets a click handler on every card header (`--card-links`, on by default there,
  `--card-links off` to drop it). It opens that area's section file in the Claude Design
  project, where the area's cards are shown open (user, 2026-11-20). It opens the file,
  not the card, because a Claude Design file link carries no position inside the file.
  The area-to-file map is `AREA_FILES` in the script. A new research area needs an entry
  there, or the capture stops and names the missing area.
- **Line breaks** go only where a browser treats them as whitespace (after a CSS `}`,
  after a selector-list comma on a very long line, and inside a start tag after its name),
  so no line is too long to read and copy reliably.
- **Shared CSS.** The built stylesheet is split at top-level rule boundaries into
  `app-css/app-K.css` chunks of at most 38 KB before line breaks, written once and linked
  by every file. With the added newlines removed they reassemble byte for byte to
  `dist/assets/index-*.css`.
- **Links and images** become absolute `https://charlotteschoolinsights.com/…` URLs.
- **Format: editable by default.** `--format dc` (the default) writes Claude Design's
  component format, the shape its own files use: the page inside `<x-dc>`, the fonts,
  stylesheets and chrome styles in its `<helmet>`, the project's `./support.js` in the
  head, and a `DCLogic` script whose `defaultTheme` prop is the Tweaks-panel Light/Dark
  switch. Empty boolean attributes are spelled out (`open="open"`), because the runtime
  is React-based and reads `open=""` as false. `--format plain` writes ordinary HTML,
  which the preview renders but the editor treats as read-only; the first write round
  used it by mistake.
- **Chrome.** Each file opens with a small grey band: title, reference school(s), commit,
  capture date, trimmed count, what is interactive in the app, and a light/dark switch.

**Verifying.** The preview server injects one `<style>`/`<script data-omelette-injected>`
run after `<head>` into every HTML page it serves. `design:verify` removes exactly that run,
and refuses to run if the local file contains the marker, so every byte that was written
is still compared. CSS files come back untouched.

**Screenshots.** `--screens` opens every `<details>` unless given `--cards closed`; a
closed-card capture (the school pages, Shared Components) must be shot with it, or its
empty cards render as open.

## Card coverage

One file per area, captured from the fewest schools that between them hold every **card
kind**. Many card names are one school's title for a shared kind (the arts "ladder", a
Global Exposure credential, a `TITLE_OVERRIDE` in Clubs); those rows say "covered by kind".
A kind the reference school lacks is captured from a school that has it and appended to
the same file, labelled with that school. Generated from `npm run audit:cardlink -- --list`
on 2026-11-20.

### Admissions

Captured from **Providence Day**.

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `grade-by-grade-application-guide-jk-k-1-2-4-5-12` | grade-by-grade guide (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-christian/#admissions/grade-by-grade-application-guide-jk-k-1-2-4-5-12 |
| `grade-by-grade-application-guide-jk-k-1-4-5-12` | grade-by-grade guide (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-country-day/#admissions/grade-by-grade-application-guide-jk-k-1-4-5-12 |
| `grade-by-grade-application-guide-tk-k-1-5-6-12` | grade-by-grade guide (title variant) | 2 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#admissions/grade-by-grade-application-guide-tk-k-1-5-6-12 |
| `grade-by-grade-application-guide-early-school-and-k-1-8` | grade-by-grade guide (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-prep/#admissions/grade-by-grade-application-guide-early-school-and-k-1-8 |
| `grade-by-grade-application-guide-jk-k-1-5-6-11` | grade-by-grade guide (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/covenant-day/#admissions/grade-by-grade-application-guide-jk-k-1-5-6-11 |
| `grade-by-grade-application-guide-tk-k5-1-5-6-8-9-12-international` | grade-by-grade guide (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/hickory-grove-christian/#admissions/grade-by-grade-application-guide-tk-k5-1-5-6-8-9-12-international |
| `grade-by-grade-application-guide-k-1-8` | grade-by-grade guide (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/trinity-episcopal/#admissions/grade-by-grade-application-guide-k-1-8 |

### Course Offerings

Captured from **Providence Day**.

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `lower-school-courses` | lower-school-courses | 10 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#course-offerings/lower-school-courses |
| `middle-school-courses` | middle-school-courses | 12 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#course-offerings/middle-school-courses |
| `upper-school-courses` | upper-school-courses | 9 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#course-offerings/upper-school-courses |
| `high-school-courses` | upper-school-courses (title variant) | 2 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/carmel-christian/#course-offerings/high-school-courses |
| `montessori-early-school` | division courses (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-prep/#course-offerings/montessori-early-school |

### Global Exposure

Captured from **Charlotte Country Day**, plus extra cards from Providence Day (the-global-studies-diploma).

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `where-they-go` | where-they-go | 6 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#global-exposure/where-they-go |
| `global-learning-at-each-school-level` | global-learning-at-each-school-level | 6 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#global-exposure/global-learning-at-each-school-level |
| `the-global-studies-certificate` | credential (school-specific title) | 1 | covered by kind (Charlotte Country Day) | https://charlotteschoolinsights.com/school/cannon/#global-exposure/the-global-studies-certificate |
| `the-world-affairs-council-model-un-and-the-global-education-badge` | network (school-specific title) | 1 | covered by kind (Charlotte Country Day) | https://charlotteschoolinsights.com/school/cannon/#global-exposure/the-world-affairs-council-model-un-and-the-global-education-badge |
| `verdict-and-ask-the-school` | verdict-and-ask-the-school | 6 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#global-exposure/verdict-and-ask-the-school |
| `signing-up-for-travel` | signing-up-for-travel | 3 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#global-exposure/signing-up-for-travel |
| `global-community-on-campus` | global-community-on-campus | 4 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#global-exposure/global-community-on-campus |
| `score-international-and-the-winterim-mission-partners` | network (school-specific title) | 1 | covered by kind (Charlotte Country Day) | https://charlotteschoolinsights.com/school/charlotte-christian/#global-exposure/score-international-and-the-winterim-mission-partners |
| `firsts-and-milestones` | firsts-and-milestones | 5 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#global-exposure/firsts-and-milestones |
| `exchanges-and-homestays` | exchanges-and-homestays | 3 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#global-exposure/exchanges-and-homestays |
| `model-un-worldquest-and-charlottes-global-partners` | network (school-specific title) | 1 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#global-exposure/model-un-worldquest-and-charlottes-global-partners |
| `school-year-abroad-and-the-wider-network` | network (school-specific title) | 1 | covered by kind (Charlotte Country Day) | https://charlotteschoolinsights.com/school/charlotte-latin/#global-exposure/school-year-abroad-and-the-wider-network |
| `the-global-studies-diploma-distinction` | credential (school-specific title) | 1 | covered by kind (Charlotte Country Day) | https://charlotteschoolinsights.com/school/davidson-day/#global-exposure/the-global-studies-diploma-distinction |
| `afar-and-the-archaeology-conferences` | network (school-specific title) | 1 | covered by kind (Charlotte Country Day) | https://charlotteschoolinsights.com/school/davidson-day/#global-exposure/afar-and-the-archaeology-conferences |
| `signing-up-for-travel-and-gsd` | signup (title variant) | 1 | covered by kind (Charlotte Country Day) | https://charlotteschoolinsights.com/school/providence-day/#global-exposure/signing-up-for-travel-and-gsd |
| `the-global-studies-diploma` | credential | 1 | Providence Day (extra) | https://charlotteschoolinsights.com/school/providence-day/#global-exposure/the-global-studies-diploma |
| `round-square-and-the-wider-network` | network | 1 | covered by kind (Charlotte Country Day) | https://charlotteschoolinsights.com/school/providence-day/#global-exposure/round-square-and-the-wider-network |

### Learning Support & Student Services

Captured from **Charlotte Country Day**.

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `can-they-serve-my-child` | can-they-serve-my-child | 5 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#learning-support-and-student-services/can-they-serve-my-child |
| `testing-and-evaluation` | testing-and-evaluation | 5 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#learning-support-and-student-services/testing-and-evaluation |
| `services-at-a-glance` | services-at-a-glance | 5 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#learning-support-and-student-services/services-at-a-glance |
| `therapy-and-related-services` | therapy-and-related-services | 5 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#learning-support-and-student-services/therapy-and-related-services |
| `who-youll-work-with` | who-youll-work-with | 5 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#learning-support-and-student-services/who-youll-work-with |
| `ask-the-school` | ask-the-school | 5 | Charlotte Country Day | https://charlotteschoolinsights.com/school/charlotte-country-day/#learning-support-and-student-services/ask-the-school |

### Student Clubs

Captured from **Providence Day**.

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `club-catalog-and-overview` | club-catalog-and-overview | 13 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#student-clubs/club-catalog-and-overview |
| `affinity-and-identity-groups` | affinity-and-identity-groups | 6 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#student-clubs/affinity-and-identity-groups |
| `service-and-civic-engagement` | service-and-civic-engagement | 13 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#student-clubs/service-and-civic-engagement |
| `honor-societies` | honor-societies | 10 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#student-clubs/honor-societies |
| `academic-and-competitive-clubs` | academic-and-competitive-clubs | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#student-clubs/academic-and-competitive-clubs |
| `global-and-cultural-groups` | affinity (TITLE_OVERRIDE) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-christian/#student-clubs/global-and-cultural-groups |
| `competitions-and-student-leadership` | honors (TITLE_OVERRIDE) | 2 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-prep/#student-clubs/competitions-and-student-leadership |

### The Arts

Captured from **Providence Day**.

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `the-jrk-12-arts-ladder` | arts ladder (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/cannon/#the-arts/the-jrk-12-arts-ladder |
| `theatre-and-the-blumeys` | theatre-and-the-blumeys | 9 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#the-arts/theatre-and-the-blumeys |
| `music-and-the-honors-pipeline` | music-and-the-honors-pipeline | 13 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#the-arts/music-and-the-honors-pipeline |
| `studio-to-gallery` | studio-to-gallery | 13 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#the-arts/studio-to-gallery |
| `verdict-and-visit-checklist` | verdict-and-visit-checklist | 12 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#the-arts/verdict-and-visit-checklist |
| `the-tk-12-arts-ladder` | the-tk-12-arts-ladder | 6 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#the-arts/the-tk-12-arts-ladder |
| `the-9-12-arts-ladder` | arts ladder (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-catholic/#the-arts/the-9-12-arts-ladder |
| `the-jk-12-arts-ladder` | arts ladder (title variant) | 2 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-christian/#the-arts/the-jk-12-arts-ladder |
| `theatre-the-blumeys-and-cita` | theatre (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-christian/#the-arts/theatre-the-blumeys-and-cita |
| `the-prek-8-arts-ladder` | arts ladder (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-prep/#the-arts/the-prek-8-arts-ladder |
| `theatre-and-grade-level-productions` | theatre (title variant) | 2 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/charlotte-prep/#the-arts/theatre-and-grade-level-productions |
| `the-early-childhood-12-arts-ladder` | arts ladder (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/davidson-day/#the-arts/the-early-childhood-12-arts-ladder |
| `theatre-and-external-recognition` | theatre (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/davidson-day/#the-arts/theatre-and-external-recognition |
| `the-k-8-arts-ladder` | arts ladder (title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/trinity-episcopal/#the-arts/the-k-8-arts-ladder |
| `visit-checklist` | verdict (K-8 title variant) | 1 | covered by kind (Providence Day) | https://charlotteschoolinsights.com/school/trinity-episcopal/#the-arts/visit-checklist |

### Sports

Captured from **Providence Day**.

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `sports-offered` | sports-offered | 13 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#sports/sports-offered |
| `wells-fargo-cup` | wells-fargo-cup | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#sports/wells-fargo-cup |
| `winning-record` | winning-record | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#sports/winning-record |
| `the-college-pipeline` | the-college-pipeline | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#sports/the-college-pipeline |
| `honors-and-pro-alumni` | honors-and-pro-alumni | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#sports/honors-and-pro-alumni |
| `coaching-pedigree-and-continuity` | coaching-pedigree-and-continuity | 12 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#sports/coaching-pedigree-and-continuity |
| `facilities-and-athlete-care` | facilities-and-athlete-care | 8 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#sports/facilities-and-athlete-care |
| `national-stage-and-nil` | national-stage-and-nil | 3 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#sports/national-stage-and-nil |

### College Support

Captured from **Providence Day**.

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `where-graduates-go` | where-graduates-go | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#college-support/where-graduates-go |
| `admission-rates-at-the-top-nc-public-universities` | admission-rates-at-the-top-nc-public-universities | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#college-support/admission-rates-at-the-top-nc-public-universities |
| `whole-class-analytics` | whole-class-analytics | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#college-support/whole-class-analytics |
| `the-transcript-colleges-see` | the-transcript-colleges-see | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#college-support/the-transcript-colleges-see |
| `the-counseling-engine` | the-counseling-engine | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#college-support/the-counseling-engine |
| `the-applicants-edge` | the-applicants-edge | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#college-support/the-applicants-edge |
| `verdict-and-visit-checklist` | verdict-and-visit-checklist | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#college-support/verdict-and-visit-checklist |

### High School Placement

Captured from **Charlotte Prep**, plus extra cards from Trinity Episcopal (where-they-land).

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `where-graduates-go` | outcomes | 1 | Charlotte Prep | https://charlotteschoolinsights.com/school/charlotte-prep/#high-school-placement/where-graduates-go |
| `the-placement-program` | placement | 2 | Charlotte Prep | https://charlotteschoolinsights.com/school/charlotte-prep/#high-school-placement/the-placement-program |
| `visit-checklist` | verdict | 2 | Charlotte Prep | https://charlotteschoolinsights.com/school/charlotte-prep/#high-school-placement/visit-checklist |
| `where-they-land` | destinations | 1 | Trinity Episcopal (extra) | https://charlotteschoolinsights.com/school/trinity-episcopal/#high-school-placement/where-they-land |

### After School

Captured from **Providence Day**.

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `the-coverage-map` | the-coverage-map | 12 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#after-school/the-coverage-map |
| `the-cost-planner` | the-cost-planner | 9 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#after-school/the-cost-planner |
| `a-day-inside-enrichment` | a-day-inside-enrichment | 11 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#after-school/a-day-inside-enrichment |
| `verdict-and-visit-checklist` | verdict-and-visit-checklist | 12 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#after-school/verdict-and-visit-checklist |

### Summer Programs

Captured from **Providence Day**.

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `the-camp-catalog` | the-camp-catalog | 12 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#summer-programs/the-camp-catalog |
| `the-summer-cost-planner` | the-summer-cost-planner | 10 | Providence Day | https://charlotteschoolinsights.com/school/providence-day/#summer-programs/the-summer-cost-planner |

### Financial Aid & Tuition

Captured from **Cannon**, plus extra cards from Gaston Day (bus-services), Gaston Day (named-scholarships), Charlotte Catholic (fees).

| Card (link name) | Kind | Held by | Captured from | Deep link |
|---|---|--:|---|---|
| `in-depth-report` | in-depth-report | 13 | Cannon | https://charlotteschoolinsights.com/school/cannon/#financial-aid-and-tuition/in-depth-report |
| `tuition-history-and-sources` | tuition-history-and-sources | 5 | Cannon | https://charlotteschoolinsights.com/school/cannon/#financial-aid-and-tuition/tuition-history-and-sources |
| `fees` | fees | 1 | Charlotte Catholic (extra) | https://charlotteschoolinsights.com/school/charlotte-catholic/#financial-aid-and-tuition/fees |
| `bus-services` | bus-services | 1 | Gaston Day (extra) | https://charlotteschoolinsights.com/school/gaston-day/#financial-aid-and-tuition/bus-services |
| `named-scholarships` | named-scholarships | 1 | Gaston Day (extra) | https://charlotteschoolinsights.com/school/gaston-day/#financial-aid-and-tuition/named-scholarships |


## Inventory

The user confirmed this inventory on 2026-11-20: the app is primary wherever a file is
both out of date and ahead of it, and every other recommendation (keep the existing
names, Compare as its default view only, decision and spec records untouched) stands.

Every root `.dc.html` in the design project, compared on 2026-11-20 with the built app
(1280 px, light, every card open) by four read-only helpers, then classified in one pass
here. Etags are from the step-1 listing; each helper's `read_file` saw the same etag.

**Class key.** *stale*: the app renders something the file lacks or draws differently.
*ahead*: the file shows a design the app does not render. *decision record*: the file lays
out labelled options for a choice the user made. *spec record*: a handoff spec for one
component that shipped; the current state now lives in a captured file. "Retired" below
means the file shows something the app dropped on purpose (a rule or a user decision), so
it is not unbuilt work.

| Design file | Class | Evidence (abridged) | Proposed action |
|---|---|---|---|
| `Home.dc.html` | stale | Schools grid now comes before the topic grid; 13 compact school cards; "What you can compare" with 10 areas; one hero CTA. Retired: nav Compare link, per-topic chips on cards | replace |
| `Compare Schools.dc.html` | stale | 11 columns with a frozen first column; side-by-side pickers; multi-figure SAT/ACT cells; year and denominator lines; 10 topics starting with College Support. Retired: blueprint corner marks, nav Compare link | replace (2 parts) |
| `Admissions Checklist.dc.html` | stale | Site header and footer around it; inline toolbar; flat bordered sheet; two-line steps; bullet lists in the aid box | replace |
| `Providence Day School.dc.html` (606 KB) | **stale + ahead** | Stale: International Travel name, no Wells Fargo Cup, old College Support and Clubs card sets, no Global Community / Firsts / Global Learning cards, inline sources. **Ahead (unbuilt):** "The Summer Campus" photo card, and photo slots in the Arts ladder, Theatre, Studio to Gallery, Where They Go, Exchanges & Homestays and A Day Inside. Retired: tenure bars, roster link-out, TO VERIFY markers | replace (3 parts) — user, 2026-11-20: "what the app shows is the primary, it overrides what the design has". The unbuilt photo-card ideas stay in the archive copy |
| `Sports Section Redesign.dc.html` | stale | No stat strip or podcast bar; old depth chips (app ships 2c); Cup table now "every NCISAA 4A school" with dossier markers and links; 247 columns in the roster; Girls Basketball row. Retired: tenure bars (user, 2026-10-19), duotone photos, visible TO VERIFY | replace (2 parts) |
| `College Support Section Redesign.dc.html` | stale | Nine-tile stat strip; new card order with Where Graduates Go first; renamed NC admissions card; counselor emails. Retired: parent-question subtitles, visible TO VERIFY / DISCREPANCY chips | replace (2 parts) · re-captured 2026-11-22 from `229961c8` (plan `consistency3`) |
| `Arts Section Redesign.dc.html` | stale | Four-tile stat strip and podcast bar; Show sources toggles; card close control. Retired: student names in the Blumey ledger (no-minor-names rule) | replace |
| `Clubs Section Redesign.dc.html` | stale | Club Catalog now first, Academic & Competitive last; stat strip; podcast bar; Faculty & Alumni strip in Affinity | replace |
| `International Travel Section Redesign.dc.html` | stale | Renamed Global Exposure; adds Global Community on Campus and Firsts & Milestones; new card order; dated sign-up list. Retired: numbered kickers (no-kicker rule) | replace (2 parts) |
| `Learning Support Section Redesign.dc.html` | stale | Testing & Evaluation moved second; RF/REQUIRED chip legend; email column. Retired: Compare button (area is off Compare), kickers. Possibly ahead: a "THIRD-PARTY · NOT CODED" chip and letter prefixes on service headers | replace |
| `High School Placement Section Redesign.dc.html` | stale (some ahead?) | Where They Land merged into Where Graduates Go at Charlotte Prep; per-class rate tiles; class selector and school search; Visit Checklist; class video. Shown in the file but not rendered: the Class by Class table (component supports it, Charlotte Prep's data has none), "Why it holds up" / "Where it is thin" in the verdict | replace (user accepted the recommendation, 2026-11-20) |
| `After School Section Redesign.dc.html` | stale | Stat strip; podcast bar; "See Summer Programs →" link; Show sources toggles. Retired: visible TO VERIFY flags | replace · re-captured 2026-11-22 from `229961c8` (plan `consistency3`) |
| `Financial Aid & Tuition.dc.html` | stale | The report now has 7 sections (new 04 "The Aid Numbers"); it lives inside the school page as an In-Depth Report card; 4 stat tiles; deposit sub-block. Retired: "CS" mock logo | replace · re-captured 2026-11-22 from `6b1b21ee` (plan `consistency3`, linked sources) |
| `Charlotte Prep Course Offerings.dc.html` | spec record | Matches the app's three division cards; small differences (Show sources, per-card notes, course-count line). Current state is in `School Page (K-8)` and `Course Offerings Section` | leave |
| `High School Placement Class Video.dc.html` | spec record | The video card shipped as specified; the surrounding cards in the file are out of date | leave |
| `More Schools Row.dc.html` | spec record | Matches the app apart from a "KEEP LOOKING" eyebrow; the row is in both school-page captures | leave |
| `Sports Compare Matrix.dc.html` | decision record | Options 1a / 1b / 1c; app shipped 1a | leave |
| `Depth Chips Redesign.dc.html` | decision record | Now / 2a / 2b / 2c / 2d; app shipped 2c | leave |
| `Academic Clubs Expand Options.dc.html` | decision record | 1a / 1b / 1c; app shipped 1c | leave |
| `Club Catalog Expand Options.dc.html` | decision record | 1a / 1b / 1c; app shipped 1b | leave |
| `Podcast Deep Dive Options.dc.html` | decision record | 1a–1d; app shipped 1b with 1d's multi-episode wording | leave |
| `Canvas.dc.html` | leave | 206-byte empty canvas | leave |

**Missing (no current file):** the Admissions section, Course Offerings (K–12), Summer
Programs, the K–8 school page, Latest News, Welcome Video and the language picker (handoff
`.md` files only), and the shared shell as a whole.

## Write list (as written, 2026-11-20)

Every path below was written over its expected etag (`"0"` for a new path) and then
fetched back and compared byte for byte by `design:verify` from the main thread: **29 of
29 match** (24 page files, 4 CSS chunks, the index). Each replaced file's previous
version is at `archive/2026-11 pre-designsync/<same name>`. Part 1 of a split page keeps
the existing name.

| Path(s) in the design project | Kind | Captured from | Size | Verified |
|---|---|---|--:|:-:|
| `app-css/app-1.css` … `app-4.css` | new (shared CSS) | `dist/assets/index-CdL5IWL7.css` | 38.4 / 38.5 / 38.4 / 33.1 KB | ✓ |
| `Home.dc.html` | replaced | Home page | 17.6 KB | ✓ |
| `Compare Schools.dc.html` + `Compare Schools (2 of 2).dc.html` | replaced | every high school, College Support (the default Compare topic) | 36.2 KB + 31.0 KB | ✓ |
| `Admissions Checklist.dc.html` | replaced | Providence Day | 9.9 KB | ✓ |
| `Providence Day School.dc.html` + `Providence Day School (2 of 3).dc.html` + `Providence Day School (3 of 3).dc.html` | replaced | Providence Day (K-12 school page as first seen, every card closed) | 37.0 KB + 38.5 KB + 20.3 KB | ✓ |
| `School Page (K-8).dc.html` | new | Charlotte Prep (K-8 school page as first seen, every card closed) | 35.4 KB | ✓ |
| `Shared Components.dc.html` | new | Providence Day: header, school title, topic chips, side rail, Welcome Video, Latest News (live headlines, never translated), a section head with its podcast strip and stat tiles, More Schools, footer, back to top | 28.1 KB | ✓ |
| `Admissions Section.dc.html` | new | Providence Day | 18.4 KB | ✓ |
| `Course Offerings Section.dc.html` | new | Providence Day | 18.1 KB | ✓ |
| `International Travel Section Redesign.dc.html` + `International Travel Section Redesign (2 of 2).dc.html` | replaced | Charlotte Country Day (Global Exposure standard) + Providence Day's credential card | 38.2 KB + 14.1 KB | ✓ |
| `Learning Support Section Redesign.dc.html` | replaced | Charlotte Country Day (Learning Support depth reference) | 31.1 KB | ✓ |
| `Clubs Section Redesign.dc.html` | replaced | Providence Day | 25.3 KB | ✓ |
| `Arts Section Redesign.dc.html` | replaced | Providence Day | 30.8 KB | ✓ |
| `Sports Section Redesign.dc.html` + `Sports Section Redesign (2 of 2).dc.html` | replaced | Providence Day | 33.1 KB + 36.4 KB | ✓ |
| `College Support Section Redesign.dc.html` + `College Support Section Redesign (2 of 2).dc.html` | replaced | Providence Day | 36.5 KB + 24.4 KB | ✓ |
| `High School Placement Section Redesign.dc.html` | replaced | Charlotte Prep + Trinity Episcopal's Where They Land card | 38.3 KB | ✓ |
| `After School Section Redesign.dc.html` | replaced | Providence Day | 35.9 KB | ✓ |
| `Summer Programs Section.dc.html` | new | Providence Day | 17.4 KB | ✓ |
| `Financial Aid & Tuition.dc.html` | replaced | Cannon + Gaston Day's Bus Services and Named Scholarships cards + Charlotte Catholic's Fees card | 36.6 KB | ✓ · re-captured 2026-11-22 from `6b1b21ee` (plan `consistency3`, linked sources) |
| `As Built - Index.md` | new | this doc's index | 5.2 KB | ✓ |

The server stores the index as `As Built - Index.md` (it normalized the em dash in the
name that was sent). Never touched: the decision records, the spec records,
`Canvas.dc.html`, `_ds/`, the rest of `archive/`, every `design_handoff_*/` folder, every
`*-handoff-instructions.md`, `uploads/`, `public/`, `support.js`, `doc-page.js`,
`image-slot.js`, `site-i18n.js`, `more-schools-row.js`, `github.md` and `.thumbnail`.

## Capture commands

Run from the repo root with the preview on `:4173`. `<out>` is any local folder. `--sha`
names the commit the served build came from.

```
# Home
npm run design:capture -- '--page' '/' '--name' 'Home' '--out' <out> '--refs' 'Home page' '--sha' 'ff5ab214' '--interactive' 'the school cards and the language menu'

# Compare Schools
npm run design:capture -- '--page' '/compare/?topic=college-support&schools=cannon%2Ccarmel-christian%2Ccharlotte-catholic%2Ccharlotte-christian%2Ccharlotte-country-day%2Ccharlotte-latin%2Ccovenant-day%2Cdavidson-day%2Cgaston-day%2Chickory-grove-christian%2Cprovidence-day' '--name' 'Compare Schools' '--out' <out> '--refs' 'every high school, College Support (the default Compare topic)' '--sha' 'ff5ab214' '--interactive' 'the topic and school pickers, row tips and the leader tint'

# Compare Schools - Sports (plan allcommits: the four commit rows, AT LEAST tips)
npm run design:capture -- '--page' '/compare/?topic=sports&schools=cannon%2Ccarmel-christian%2Ccharlotte-catholic%2Ccharlotte-christian%2Ccharlotte-country-day%2Ccharlotte-latin%2Ccovenant-day%2Cdavidson-day%2Cgaston-day%2Chickory-grove-christian%2Cprovidence-day' '--name' 'Compare Schools - Sports' '--out' <out> '--refs' 'every high school, Sports' '--sha' '<build commit>' '--card-links' 'off' '--interactive' 'row tips and the leader tint'
# --card-links off: a page with no cards otherwise stops with "found no card headers".
# The project stores the name with a plain hyphen, so the capture uses one too.

# Admissions Checklist
npm run design:capture -- '--page' '/school/providence-day/admissions-checklist/' '--name' 'Admissions Checklist' '--out' <out> '--refs' 'Providence Day' '--sha' 'ff5ab214' '--interactive' 'the band switch and Print'

# Providence Day School
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Providence Day School' '--out' <out> '--refs' 'Providence Day (K-12 school page as first seen, every card closed)' '--sha' 'ff5ab214' '--cards' 'closed' '--interactive' 'every card opens; chips, side rail, Latest News, video and podcast players'

# School Page (K-8)
npm run design:capture -- '--page' '/school/charlotte-prep/' '--name' 'School Page (K-8)' '--out' <out> '--refs' 'Charlotte Prep (K-8 school page as first seen, every card closed)' '--sha' 'ff5ab214' '--cards' 'closed' '--interactive' 'every card opens; chips, side rail, Latest News, video and podcast players'

# Shared Components
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Shared Components' '--out' <out> '--refs' 'Providence Day: header, school title, topic chips, side rail, Welcome Video, Latest News (live headlines, never translated), a section head with its podcast strip and stat tiles, More Schools, footer, back to top' '--sha' 'ff5ab214' '--cards' 'closed' '--drop' '.topic-section:not(#topic-admissions), #topic-admissions .note-cards' '--interactive' 'the language menu, theme toggle, Contact us, the video and podcast players'

# Admissions Section
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Admissions Section' '--out' <out> '--refs' 'Providence Day' '--sha' 'ff5ab214' '--area' 'admissions'

# Course Offerings Section
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Course Offerings Section' '--out' <out> '--refs' 'Providence Day' '--sha' 'ff5ab214' '--area' 'course-offerings'

# International Travel Section Redesign
npm run design:capture -- '--page' '/school/charlotte-country-day/' '--name' 'International Travel Section Redesign' '--out' <out> '--refs' 'Charlotte Country Day (Global Exposure standard) + Providence Day'\''s credential card' '--sha' 'ff5ab214' '--area' 'international-travel' '--extra' 'providence-day:global-exposure/the-global-studies-diploma'

# Learning Support Section Redesign
npm run design:capture -- '--page' '/school/charlotte-country-day/' '--name' 'Learning Support Section Redesign' '--out' <out> '--refs' 'Charlotte Country Day (Learning Support depth reference)' '--sha' 'ff5ab214' '--area' 'learning-support'

# Clubs Section Redesign
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Clubs Section Redesign' '--out' <out> '--refs' 'Providence Day' '--sha' 'ff5ab214' '--area' 'student-clubs'

# Arts Section Redesign
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Arts Section Redesign' '--out' <out> '--refs' 'Providence Day + Gaston Day'\''s Theatre card (its Blumey ledger)' '--sha' 'ac5ac3bf' '--area' 'the-arts' '--extra' 'gaston-day:the-arts/theatre-and-the-blumeys'
# then relabel the extra with what it shows (plan consistency5)

# Sports Section Redesign
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Sports Section Redesign' '--out' <out> '--refs' 'Providence Day + Carmel Christian'\''s and Hickory Grove'\''s Winning Record cards (their per-school matrix headings)' '--sha' '7511268d' '--area' 'sports' '--extra' 'carmel-christian:sports/winning-record,hickory-grove-christian:sports/winning-record'
# then relabel each extra with what it shows (plan consistency4)
# then append one JUCO, one NAIA and one Other roster row (Hickory Grove, Covenant Day,
# Charlotte Latin) from the built pipeline cards as a labelled block, 247 rank cells dropped
# (plan allcommits). An --extra of a whole pipeline card does not work: the capture trims a
# roster to its first 6 rows (now the Class of 2027), and two extra cards put the file at
# 96 KB, over the largest proven write.

# College Support Section Redesign
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'College Support Section Redesign' '--out' <out> '--refs' 'Providence Day + Gaston Day'\''s and Covenant Day'\''s Transcript cards (their merit-table column headers)' '--sha' '69ff78d3' '--area' 'college-support' '--extra' 'gaston-day:college-support/the-transcript-colleges-see,covenant-day:college-support/the-transcript-colleges-see'
# then relabel each extra with what it shows (plan consistency4)

# High School Placement Section Redesign
npm run design:capture -- '--page' '/school/charlotte-prep/' '--name' 'High School Placement Section Redesign' '--out' <out> '--refs' 'Charlotte Prep + Trinity Episcopal'\''s Where They Land card' '--sha' 'ff5ab214' '--area' 'high-school-placement' '--extra' 'trinity-episcopal:high-school-placement/where-they-land'

# After School Section Redesign
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'After School Section Redesign' '--out' <out> '--refs' 'Providence Day + Charlotte Latin'\''s stat strip (tile basis line)' '--sha' '229961c8' '--area' 'after-school'
# then append Charlotte Latin's built `.stat-strip` (from dist/school/charlotte-latin/index.html,
# #topic-after-school) as a labelled `ds-extra` section: --extra takes cards by id, and a stat strip has none

# Summer Programs Section
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Summer Programs Section' '--out' <out> '--refs' 'Providence Day + Carmel Christian'\''s Cost Planner (its short-week day divisor) + Charlotte Latin'\''s Camp Catalog (its Ages labels)' '--sha' 'ac5ac3bf' '--area' 'summer-programs' '--extra' 'carmel-christian:summer-programs/the-summer-cost-planner,charlotte-latin:summer-programs/the-camp-catalog'
# then relabel each extra with what it shows (plans consistency4, consistency5)

# Financial Aid & Tuition
npm run design:capture -- '--page' '/school/cannon/' '--name' 'Financial Aid & Tuition' '--out' <out> '--refs' 'Cannon + Gaston Day'\''s Bus Services and Named Scholarships cards + Charlotte Catholic'\''s Fees card' '--sha' '6b1b21ee' '--area' 'financial-aid-tuition' '--extra' 'gaston-day:financial-aid-and-tuition/bus-services,gaston-day:financial-aid-and-tuition/named-scholarships,charlotte-catholic:financial-aid-and-tuition/fees'
# then append two of Cannon's source lines, opened, as a labelled `ds-extra` block in the
# component's markup (captures keep source rows closed): plan consistency3, linked sources
```

The CSS chunks: `npm run design:capture -- --css --out <out>`.

## Results

**Verified.** 29 of 29 written files match their local capture byte for byte, re-checked
from the main thread after both write rounds (the helpers' own checks were not taken on
trust). The final listing against the step-1 snapshot: 116 files before, 145 after; 13
changed and 29 new, every one on the write list, under `app-css/` or under
`archive/2026-11 pre-designsync/`; nothing outside that set changed and nothing was
removed. All five decision records, the three spec records and `Canvas.dc.html` keep
their original etags.

**Visual review.** Every file was compared with the app at 1280 px light, with dark and
390 px phone width checked on the school page, Compare and Summer Programs. The review
found six defects, all in the capture rather than the app, and each was fixed in
`design_capture.mjs` before a second write round re-wrote the 13 affected files:

| Found in review | Cause | Fix |
|---|---|---|
| The pilot's section rendered in a 190 px column | an area capture kept the page grid but not its side rail, so the section fell into the rail's track | keep an empty copy of the rail |
| Scroll fades, chip tones, active tabs and phone table labels missing | `data-*` attributes the app CSS selects on were stripped | keep every `data-*` / `aria-*` attribute the built CSS names |
| Home showed 6 of 13 schools and 6 of 10 topics; Compare's pickers 6 pills; the checklist 6 of 9 steps; the admissions staff grid had a hole | the trim rule ran on files that never needed it, and on fixed-size lists | trim only a file that is over 40 KB untrimmed; never trim navigation, picker, staff, checklist or news lists (11 of 24 files now ship whole) |
| Latest News was a loading skeleton, then headlines without previews | the section fetches only when scrolled into view, and previews arrive in a second pass | scroll it into view, then wait for the preview count to settle |
| Facility and news photos grey | `loading="lazy"` never fires in a static file shot full-page | drop `loading` from captured images |
| Closed-card school pages rendered as open, empty cards | the screenshot step opens every `<details>` | shoot closed-card captures with `--cards closed` (a review-tool fix; the files were right) |

**Seen in the app, not the capture** (left as found, worth a look separately):
Gaston Day's *Named scholarships* table draws very tall rows beside a short note, on the
live page as well as in the capture.

**Editable in Claude Design (follow-up, same day).** The first two write rounds produced
plain HTML, which the editor treats as read-only. The user asked for editable files; a
test conversion of Summer Programs was confirmed editable by the user, and all 24 page
files were then rewritten in the component format (round 3) and byte-verified. Before
writing, every converted file was rendered locally beside its plain version once fonts
had loaded: identical element counts, text and height, with one exception. Compare's
pinned header copy loses its `<colgroup>` (13 elements) in the runtime, and that copy is
`visibility: hidden` until the table is scrolled, so nothing visible changes.
The user then spotted dark bands in the editor: Claude Design injects
`html,body{background:transparent}` into every page it shows, so the app's `body`
background vanished and the editor's dark canvas showed through behind headings and
plain text (cards with their own background stayed light). Screenshots never showed it,
because a browser's own canvas is white. The chrome CSS now gives `.app` the page
colours, and all 24 files were rewritten with that one line (round 4); checked against a
simulated dark canvas in light and dark before writing.

The test file, `Summer Programs Section (editable test).dc.html`, was then moved to
`archive/2026-11 pre-designsync/` at the user's request (copied, then deleted from the
root under a one-path delete approval).

**One file per page (round 5, same day).** The user asked for each split page to be one
page, like the app. The first attempt composed each page from a main file plus "piece"
files mounted with `<dc-import>`. It rendered identically to a one-file reference, but
the user could not edit from the first imported section (Global Exposure) down. Editing
stops at an import. The second attempt wrote Providence Day as one file. It verified
byte for byte, and the user confirmed that the whole page edits.

The other four pages were then rewritten the same way and verified, along with the
index note:

| Page | Size |
|---|--:|
| Providence Day School | 80,941 bytes |
| Sports | 66,777 bytes |
| College Support | 56,813 bytes (64,190 since plan `consistency3`, with Gaston Day's Transcript card) |
| Compare | 52,801 bytes |
| Global Exposure | 47,659 bytes |

Before writing, and again as Claude Design served them, each one rendered identically to
a one-file reference. The same element boxes, text and height showed in light and dark,
and the only element left out of the comparison was Compare's hidden pinned header copy.
Then eight files were deleted under a delete approval: the six `(2 of N)` files and the
two trial pieces. Each delete was checked against the file's etag, and the files had
matched their captures byte for byte just before. The final listing shows one file per
page and nothing else changed.

Trimming is unchanged: it still applies to a page over 40 KB, so no page's content moved.
Latest News headlines in Providence Day are the ones live when that page was captured.

**Plan `consistency3` (2026-11-22): two approved UX tweaks, designed here first.** The
design came first (step 0b). Both files were captured from the pre-change build. The
proposed element was patched in with a dashed outline and a "PROPOSED" label, then written
and `design:verify`'d before the app was built:

- *College Support*: Gaston Day's Transcript card was added as an extra, with its merit
  column header reading "College merit awards" (GD-S2).
- *After School*: Charlotte Latin's stat strip was added as a labelled block, with the
  ≈$930/mo tile's basis line ("TK/K · 5 days to 6:00 p.m. · $4,650 a semester") in the
  `stat-tile-sub` face, between value and label (LAT-13).

After the build (step 5b), both files were re-captured from commit `229961c8`, so they show
what shipped, and verified byte for byte. College Support is 64,190 bytes; After School is
38,285 bytes, including Latin's strip copied from the built DOM.

**Plan `consistency3`, linked sources (2026-11-22).** At the user's request, each page a
Financial Aid source line names became a link. It was designed first: Cannon's source rows,
opened, with the page names linked and outlined, were added to `Financial Aid & Tuition.dc.html`
and verified. It was then built and the file re-captured from `6b1b21ee` (39,865 bytes, byte for
byte). A capture keeps source rows closed, so the opened lines are a labelled block generated in
the component's own markup, checked against the live DOM.

**Plan `consistency4` (2026-11-22): three approved UX fixes, designed here first.** Mocks patched
into pre-change captures were written and verified, then built, then the three files were
re-captured from commit `69ff78d3` and verified byte for byte:

- *Summer Programs* (23,736 bytes): Carmel's planner, whose "per camp day" divides by the days in
  the selected week.
- *Sports* (78,272 bytes): Carmel's and Hickory Grove's matrix headings name their seasons.
- *College Support* (69,117 bytes): Covenant's merit column reads "AP results", beside Gaston
  Day's "College merit awards".

**Plan `consistency5` (2026-11-22): three approved UX changes, designed here first.** Mocks were
written and verified before the build, then the three files were re-captured from commit
`ac5ac3bf` (after the adversarial review) and verified byte for byte:

- *Summer Programs* (30,577 bytes): Charlotte Latin's catalog reads "Age" and "Ages".
- *Sports* (78,625 bytes): the heading reads "Ranked recruits", at every school.
- *Arts* (37,334 bytes): Gaston Day's theatre card shows its Blumey ledger.

The MCP behind this loop says it stops working no later than **2026-12-14**.

**Not represented, by design:** filters, tabs, hover tips, the photo viewer and the
podcast and video players are static (players are labelled boxes); Latest News shows
the headlines that were live at capture time.

## Index

The same table is in the design project as `As Built - Index.md`.

| File | Status |
|---|---|
| Home, Compare Schools, Admissions Checklist, Providence Day School | captured, replaced (archive copies in `archive/2026-11 pre-designsync/`) |
| International Travel, Learning Support, Clubs, Arts, Sports, College Support, High School Placement, After School, Financial Aid & Tuition | captured, replaced (archive copies in `archive/2026-11 pre-designsync/`) |
| School Page (K-8), Shared Components, Admissions Section, Course Offerings Section, Summer Programs Section | captured, new |
| Sports Compare Matrix, Depth Chips Redesign, Academic Clubs Expand Options, Club Catalog Expand Options, Podcast Deep Dive Options | decision records, untouched |
| Charlotte Prep Course Offerings, High School Placement Class Video, More Schools Row | spec records, untouched |
| Canvas | empty, untouched |

All captured files: `main` at `ff5ab214`, captured 2026-11-20.

**Plan `allcommits` (2026-11-23): two approved UX changes, designed here first.** A new file,
*Compare Schools - Sports*, mocked the College commits (all levels) row and the AT LEAST tip
heading, and *Sports Section Redesign* mocked JUCO and Other roster rows and, after the user
asked for it mid-build, the newest-class-first roster order. Both files were then
re-captured from commit `7511268d` (after the adversarial review) and verified byte for
byte: Compare Schools - Sports (72,010 bytes) and Sports Section Redesign (79,839 bytes).
