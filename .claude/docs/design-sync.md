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
  --name "Sports Section Redesign" --refs "Providence Day" --out <dir>
npm run design:capture -- --screens <url> --name <n> --out <dir>   # 1280 light/dark, 390 light
```

What a capture does (`scripts/design_capture.mjs` has the full rules):

- **Scope.** `--area <slug>` takes one `#topic-<slug>` section with every card open,
  inside shallow copies of its ancestors so the app's descendant selectors still match.
  Without `--area` it takes the whole app shell. `--cards closed` closes every card and
  removes its body, because a closed card still carries its body in the DOM.
- **Trimming,** so each file fits the inline write limit: scripts, comments, React ids,
  `aria-*` and most `data-*` go; whitespace collapses; iframes become a labelled box of the
  same size; closed native popovers (hover tips, `display: none` in every state) go. In a
  run of more than 8 like siblings, or of more than 8 repeated rows of up to 12 flat grid
  cells, the first 6 stay and one dashed `+N more in the app` line replaces the rest.
  Cards, sections, table cells, SVG, navigation lists, stat strips and card grids are never
  trimmed.
- **Parts.** Over 40 KB, an area splits at card boundaries, a school page at section
  boundaries and Compare at its row groups: `<name> (k of N).dc.html`. Every byte count is
  measured on the assembled part.
- **Shared CSS.** The built stylesheet is split at top-level rule boundaries into
  `app-css/app-K.css` chunks of at most 38 KB, written once and linked by every file. The
  chunks reassemble byte for byte to `dist/assets/index-*.css`.
- **Links and images** become absolute `https://charlotteschoolinsights.com/…` URLs.
- **Chrome.** Each file opens with a small grey band: title, reference school(s), commit,
  capture date, trimmed count, what is interactive in the app, and a light/dark switch.

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
| `Providence Day School.dc.html` (606 KB) | **stale + ahead** | Stale: International Travel name, no Wells Fargo Cup, old College Support and Clubs card sets, no Global Community / Firsts / Global Learning cards, inline sources. **Ahead (unbuilt):** "The Summer Campus" photo card, and photo slots in the Arts ladder, Theatre, Studio to Gallery, Where They Go, Exchanges & Homestays and A Day Inside. Retired: tenure bars, roster link-out, TO VERIFY markers | **your call** (see question 1) |
| `Sports Section Redesign.dc.html` | stale | No stat strip or podcast bar; old depth chips (app ships 2c); Cup table now "every NCISAA 4A school" with dossier markers and links; 247 columns in the roster; Girls Basketball row. Retired: tenure bars (user, 2026-10-19), duotone photos, visible TO VERIFY | replace (2 parts) |
| `College Support Section Redesign.dc.html` | stale | Nine-tile stat strip; new card order with Where Graduates Go first; renamed NC admissions card; counselor emails. Retired: parent-question subtitles, visible TO VERIFY / DISCREPANCY chips | replace (2 parts) |
| `Arts Section Redesign.dc.html` | stale | Four-tile stat strip and podcast bar; Show sources toggles; card close control. Retired: student names in the Blumey ledger (no-minor-names rule) | replace |
| `Clubs Section Redesign.dc.html` | stale | Club Catalog now first, Academic & Competitive last; stat strip; podcast bar; Faculty & Alumni strip in Affinity | replace |
| `International Travel Section Redesign.dc.html` | stale | Renamed Global Exposure; adds Global Community on Campus and Firsts & Milestones; new card order; dated sign-up list. Retired: numbered kickers (no-kicker rule) | replace (2 parts) |
| `Learning Support Section Redesign.dc.html` | stale | Testing & Evaluation moved second; RF/REQUIRED chip legend; email column. Retired: Compare button (area is off Compare), kickers. Possibly ahead: a "THIRD-PARTY · NOT CODED" chip and letter prefixes on service headers | replace |
| `High School Placement Section Redesign.dc.html` | stale (some ahead?) | Where They Land merged into Where Graduates Go at Charlotte Prep; per-class rate tiles; class selector and school search; Visit Checklist; class video. Shown in the file but not rendered: the Class by Class table (component supports it, Charlotte Prep's data has none), "Why it holds up" / "Where it is thin" in the verdict | replace (see question 2) |
| `After School Section Redesign.dc.html` | stale | Stat strip; podcast bar; "See Summer Programs →" link; Show sources toggles. Retired: visible TO VERIFY flags | replace |
| `Financial Aid & Tuition.dc.html` | stale | The report now has 7 sections (new 04 "The Aid Numbers"); it lives inside the school page as an In-Depth Report card; 4 stat tiles; deposit sub-block. Retired: "CS" mock logo | replace |
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

## Write list (proposed, awaiting confirmation)

Sizes are measured from a full local capture of `ff5ab214`; cap 40 KB per file. A
replacement is copied to `archive/2026-11 pre-designsync/<same name>` before it is
overwritten. An area that needs two parts keeps its existing name for part 1 and gains a
`(2 of 2)` sibling.

| Path in the design project | Kind | Captured from | Size |
|---|---|---|--:|
| `app-css/app-1.css` … `app-4.css` | new (shared CSS) | `dist/assets/index-CdL5IWL7.css` | 37.9 / 38.0 / 37.9 / 32.8 KB |
| `Home.dc.html` | replace | `/` | 12.3 KB |
| `Compare Schools.dc.html` + `Compare Schools (2 of 2).dc.html` | replace + new | Compare, College Support, all 11 high schools | 35.4 + 30.3 KB |
| `Admissions Checklist.dc.html` | replace | Providence Day | 9.1 KB |
| School page, K–12 (2 parts) | see question 1 | Providence Day, cards closed | 38.9 + 39.1 KB |
| `School Page (K-8).dc.html` | new | Charlotte Prep, cards closed | 35.3 KB |
| `Shared Components.dc.html` | new | Providence Day page chrome | 19.5 KB |
| `Admissions Section.dc.html` | new | Providence Day | 17.9 KB |
| `Course Offerings Section.dc.html` | new | Providence Day | 17.7 KB |
| `International Travel Section Redesign.dc.html` + `(2 of 2)` | replace + new | Charlotte Country Day + Providence Day's credential card | 38.1 + 14.0 KB |
| `Learning Support Section Redesign.dc.html` | replace | Charlotte Country Day | 30.1 KB |
| `Clubs Section Redesign.dc.html` | replace | Providence Day | 25.2 KB |
| `Arts Section Redesign.dc.html` | replace | Providence Day | 29.7 KB |
| `Sports Section Redesign.dc.html` + `(2 of 2)` | replace + new | Providence Day | 33.0 + 36.3 KB |
| `College Support Section Redesign.dc.html` + `(2 of 2)` | replace + new | Providence Day | 35.7 + 24.3 KB |
| `High School Placement Section Redesign.dc.html` | replace | Charlotte Prep + Trinity Episcopal's Where They Land | 38.3 KB |
| `After School Section Redesign.dc.html` | replace | Providence Day | 32.0 KB |
| `Summer Programs Section.dc.html` | new (the pilot) | Providence Day | 17.3 KB |
| `Financial Aid & Tuition.dc.html` | replace | Cannon + Gaston Day's Bus Services and Named Scholarships + Charlotte Catholic's Fees | 36.5 KB |
| `As Built — Index.md` | new | this doc | — |

Not on the list, and never touched: the decision records, the spec records,
`Canvas.dc.html`, `_ds/`, `archive/` (other than the new subfolder), every
`design_handoff_*/` folder, every `*-handoff-instructions.md`, `uploads/`, `public/`,
`support.js`, `doc-page.js`, `image-slot.js`, `site-i18n.js`, `more-schools-row.js`,
`github.md` and `.thumbnail`.

## Capture commands

Run from the repo root with the preview on `:4173`. `<out>` is any local folder.

```
# Home
npm run design:capture -- '--page' '/' '--name' 'Home' '--out' <out> '--refs' 'Home page' '--interactive' 'the school cards and the language menu'

# Compare Schools
npm run design:capture -- '--page' '/compare/?topic=college-support&schools=cannon%2Ccarmel-christian%2Ccharlotte-catholic%2Ccharlotte-christian%2Ccharlotte-country-day%2Ccharlotte-latin%2Ccovenant-day%2Cdavidson-day%2Cgaston-day%2Chickory-grove-christian%2Cprovidence-day' '--name' 'Compare Schools' '--out' <out> '--refs' 'every high school, College Support (the default Compare topic)' '--interactive' 'the topic and school pickers, row tips and the leader tint'

# Admissions Checklist
npm run design:capture -- '--page' '/school/providence-day/admissions-checklist/' '--name' 'Admissions Checklist' '--out' <out> '--refs' 'Providence Day' '--interactive' 'the band switch and Print'

# Providence Day School
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Providence Day School' '--out' <out> '--refs' 'Providence Day (K-12 school page as first seen, every card closed)' '--cards' 'closed' '--interactive' 'every card opens; chips, side rail, Latest News, video and podcast players'

# School Page (K-8)
npm run design:capture -- '--page' '/school/charlotte-prep/' '--name' 'School Page (K-8)' '--out' <out> '--refs' 'Charlotte Prep (K-8 school page as first seen, every card closed)' '--cards' 'closed' '--interactive' 'every card opens; chips, side rail, Latest News, video and podcast players'

# Shared Components
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Shared Components' '--out' <out> '--refs' 'Providence Day: header, school title, topic chips, side rail, Welcome Video, Latest News (live headlines, never translated), a section head with its podcast strip and stat tiles, More Schools, footer, back to top' '--cards' 'closed' '--drop' '.topic-section:not(#topic-admissions), #topic-admissions .note-cards' '--interactive' 'the language menu, theme toggle, Contact us, the video and podcast players'

# Admissions Section
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Admissions Section' '--out' <out> '--refs' 'Providence Day' '--area' 'admissions'

# Course Offerings Section
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Course Offerings Section' '--out' <out> '--refs' 'Providence Day' '--area' 'course-offerings'

# International Travel Section Redesign
npm run design:capture -- '--page' '/school/charlotte-country-day/' '--name' 'International Travel Section Redesign' '--out' <out> '--refs' 'Charlotte Country Day (Global Exposure standard) + Providence Day'\''s credential card' '--area' 'international-travel' '--extra' 'providence-day:global-exposure/the-global-studies-diploma'

# Learning Support Section Redesign
npm run design:capture -- '--page' '/school/charlotte-country-day/' '--name' 'Learning Support Section Redesign' '--out' <out> '--refs' 'Charlotte Country Day (Learning Support depth reference)' '--area' 'learning-support'

# Clubs Section Redesign
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Clubs Section Redesign' '--out' <out> '--refs' 'Providence Day' '--area' 'student-clubs'

# Arts Section Redesign
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Arts Section Redesign' '--out' <out> '--refs' 'Providence Day' '--area' 'the-arts'

# Sports Section Redesign
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Sports Section Redesign' '--out' <out> '--refs' 'Providence Day' '--area' 'sports'

# College Support Section Redesign
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'College Support Section Redesign' '--out' <out> '--refs' 'Providence Day' '--area' 'college-support'

# High School Placement Section Redesign
npm run design:capture -- '--page' '/school/charlotte-prep/' '--name' 'High School Placement Section Redesign' '--out' <out> '--refs' 'Charlotte Prep + Trinity Episcopal'\''s Where They Land card' '--area' 'high-school-placement' '--extra' 'trinity-episcopal:high-school-placement/where-they-land'

# After School Section Redesign
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'After School Section Redesign' '--out' <out> '--refs' 'Providence Day' '--area' 'after-school'

# Summer Programs Section
npm run design:capture -- '--page' '/school/providence-day/' '--name' 'Summer Programs Section' '--out' <out> '--refs' 'Providence Day' '--area' 'summer-programs'

# Financial Aid & Tuition
npm run design:capture -- '--page' '/school/cannon/' '--name' 'Financial Aid & Tuition' '--out' <out> '--refs' 'Cannon + Gaston Day'\''s Bus Services and Named Scholarships cards + Charlotte Catholic'\''s Fees card' '--area' 'financial-aid-tuition' '--extra' 'gaston-day:financial-aid-and-tuition/bus-services,gaston-day:financial-aid-and-tuition/named-scholarships,charlotte-catholic:financial-aid-and-tuition/fees'
```

## Results

_Filled in after the writes (steps 7–12)._
