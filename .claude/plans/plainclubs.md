---
name: plainclubs
title: Plain-language rewrite of the Student Clubs area's English prose (13 clubsPrograms files + the shared clubClusters.ts and clubCatalog.ts; 101 rendered sites, the 25 never-rendered GAP/COUNT flags excluded by user decision), plus removal of one missed non-athlete student name at 3 rendered sites; English in three reviewed batches, then all nine prose locales
status: in-progress
phases: 2
batches: 3                     # Phase 1 is built in three batches, each with its own review stop
created: 2026-11-10
branch: feat/plainclubs
prs: []
---

# Plain-language rewrite — Student Clubs

## Goal

Rewrite the existing English prose in the Student Clubs research area so it meets the
plain-language standard in `CLAUDE.md`. The reader is an average parent, the target is
grade 8–10, and no sentence runs past 30 words. This is the fifth per-area follow-up,
after College Support ([`plaincollege.md`](plaincollege.md), #467), Admissions
([`plainadmissions.md`](plainadmissions.md), #469), Financial Aid
([`plainaid.md`](plainaid.md), #471) and The Arts ([`plainarts.md`](plainarts.md), #476).

**plainarts is the model**, with plainaid, plainadmissions and plaincollege behind it.
This plan keeps their bar, their review file and guards (`scripts/plain_review.mjs`),
their independent subagent review per batch and their two-phase process. It restates
what a fresh window needs, and adds what is specific to Student Clubs.

Student Clubs differs from the earlier areas in five ways:

- **Its prose lives in three layers, two of them shared files.** Three cards (Affinity,
  Service, Honors) come from `src/data/clubsPrograms/<slug>.ts`. Academic & Competitive
  Clubs comes from `src/data/clubClusters.ts`, and Club Catalog & Overview from
  `src/data/clubCatalog.ts`. Each shared file holds every school behind an accessor
  function (`clubClusters(slug)`, `clubCatalog(slug)`). `plain_review.mjs` cannot read
  those two files today, so Batch 1 extends it (Step 1).
- **Most of its flags never render.** `ClubsProgram.tsx` `Flags()` shows only
  `kind: 'not-a-club'` flags. GAP and COUNT flags stay in the data and render nowhere,
  not even on the dev server. 25 of them are on the raw worklist. **The user ruled
  (2026-11-10) to leave them out**, so they stay byte-identical.
- **The central distinction is club vs not-a-club.** Many units explain that a program,
  requirement, course, event or parent group is *not* a club. A plainer sentence that
  blurs that line is worse than the long one.
- **Selection rules are the facts parents compare.** Application, interview, teacher
  recommendation, GPA floors, election by peers, induction timing, hour minimums, "not
  required", and the program a club feeds.
- **No clubs field renders markdown.** Every field is raw `{text}` or
  `localizeMoneyText(text)`, so `**` or `*` would ship as literal asterisks, as in The
  Arts.

It worked when:

- `for f in src/data/clubsPrograms/*.ts src/data/clubClusters.ts src/data/clubCatalog.ts; do node scripts/check_plain_language.mjs --file $f; done`
  reports **only the 24 issues on the 19 excluded hidden-flag units** (156 issues today).
  The hidden-flag list is under "The worklist".
- Every rendered ≥30-word unit in scope is at grade ≤10, or appears in "Residual units
  above grade 10" with its reason.
- None of these changed: a club, organization, competition, award, program, partner or
  venue name; an advisor, coach or staff name; a division or grade eligibility; a meeting
  day, time or room; a fee; a count (clubs, members, hours, awards, partners, students);
  a date; a figure; a quote; a URL. No club-vs-not-a-club line, selection rule,
  requirement-vs-optional marker, verified-vs-school-reported-vs-third-party marker,
  result tier (won / runner-up / placed / advanced / finalist), or not-found vs
  not-published marker was lost or added. The extended review generator (Step 1) proves
  the mechanical part; the independent reviewer and the user check the rest.
- **No non-athlete student is named on any rendered page.** The one missed name (below)
  is gone from all three of its rendered sites, and no rewrite adds a name.
- `check:matrices` stays green.
- The user has approved the English of all three batches, and an independent subagent has
  checked every before/after pair.
- All nine prose locales carry fresh translations of the rewritten units, and every
  overlay check is green.

**Two-phase.** It changes research prose a parent reads, so Phase 1 is English only and
stops for review. Phase 2 translates. Phase 1 is further split into **three batches with
a review stop after each**, sized for a ~20-minute review (see "Batch plan").

## Context

### The worklist (measured 2026-11-10 at `d9de16de`)

Measured with a scratch script that calls the real `proseUnits`, `analyze` and
`filterAllowed` from `scripts/check_plain_language.mjs`, over all three layers, with
`classifyField` given the extractor's own prefixed path (`clusters.rows[].note`). Its
`clubsPrograms` count (85 raw) matches
`node scripts/plain_review.mjs --dir src/data/clubsPrograms --worklist <scratch>`, and its
hook-flagged count matches `npm run check:plain` (student-clubs **Flagged 100**: 81
rendered + 19 hidden). **Worklist** = hook-flagged units plus the ≥30-word units at
grade 10–12 that the hook does not flag yet (the generator's definition), **minus the 25
hidden GAP/COUNT flags** (user decision).

| School | clubsPrograms | clusters | catalog | Hook-flagged | Grade 10–12 only | **Worklist** | Before-words |
|---|--:|--:|--:|--:|--:|--:|--:|
| providence-day | 6 | 0 | 0 | 6 | 0 | **6** | 236 |
| charlotte-latin | 5 | 2 | 0 | 3 | 4 | **7** | 285 |
| charlotte-christian | 4 | 1 | 2 | 5 | 2 | **7** | 274 |
| charlotte-country-day | 4 | 1 | 0 | 3 | 2 | **5** | 250 |
| covenant-day | 2 | 2 | 0 | 3 | 1 | **4** | 162 |
| charlotte-prep (K–8) | 3 | 0 | 0 | 3 | 0 | **3** | 147 |
| charlotte-catholic | 9 | 3 | 7 | 16 | 3 | **19** | 746 |
| cannon | 6 | 0 | 3 | 6 | 3 | **9** | 348 |
| davidson-day | 4 | 2 | 1 | 7 | 0 | **7** | 341 |
| carmel-christian | 5 | 2 | 3 | 8 | 2 | **10** | 457 |
| hickory-grove-christian | 2 | 2 | 2 | 6 | 0 | **6** | 304 |
| gaston-day | 5 | 2 | 0 | 7 | 0 | **7** | 327 |
| trinity-episcopal (K–8) | 5 | 4 | 2 | 8 | 3 | **11** | 478 |
| **Total** | **60** | **21** | **20** | **81** | **20** | **101** | **4,355** |

The hook reports **156 issues** across the 15 files. 132 sit on the 81 rendered units and
24 on the 19 hidden ones. On the rendered units: 55 long sentences, 73 grade, and **4
jargon**:
- `experiential learning`, three times: charlotte-christian `service.programs[0].detail`,
  cannon `service.subhead` and cannon `service.programs[2].detail`. All three are "a
  week-long experiential program";
- `cohort`, once: charlotte-catholic `honors.adjacent[3].text`.

**Worklist sites by field** (101): `clusters.rows[].note` 21,
`service.programs[].detail` 20, `catalog.divisions[].text` 12, `service.footnote` 10,
`service.flags[].text` (not-a-club) 8, `catalog.clubs[].note` 8, `affinity.leadership` 5,
`affinity.strips[].text` 5, `honors.adjacent[].text` 3, `service.subhead` 3,
`honors.societies[].recognizes` 2, `honors.flags[].text` (not-a-club) 1,
`affinity.headline` 1, `affinity.umbrella.detail` 1, `honors.subhead` 1.

**101 paths are 101 distinct texts.** No worklist text appears at a second path. Near-repeats
are listed in the next section.

**The 25 excluded hidden flags.** These are GAP flags unless marked COUNT; "hook" marks
the 19 the hook flags. They are never edited, and guard (k) fails if one changes.
- providence-day: `honors.flags[0]` (hook), `[1]` (hook)
- charlotte-latin: `affinity.flags[0]`, `honors.flags[0]` (hook)
- charlotte-christian: `affinity.flags[0]` (COUNT, hook), `affinity.flags[1]` (hook),
  `service.flags[1]`, `honors.flags[0]` (hook), `honors.flags[1]` (hook)
- charlotte-catholic: `honors.flags[0]`
- charlotte-country-day: `service.flags[1]` (hook), `honors.flags[0]` (hook)
- cannon: `affinity.flags[0]`, `honors.flags[0]` (hook), `honors.flags[1]`
- covenant-day: `service.flags[0]` (hook), `honors.flags[0]` (hook)
- davidson-day: `service.flags[1]` (hook)
- carmel-christian: `honors.flags[0]` (hook)
- hickory-grove-christian: `service.flags[0]` (hook), `honors.flags[0]` (hook)
- gaston-day: `honors.flags[0]`
- trinity-episcopal: `service.flags[0]` (hook), `honors.flags[0]` (hook), `honors.flags[1]`
  (hook)

Each path ends `.text`. Four Trinity hidden flags hold `**`: `affinity.flags[0]` (COUNT,
not on the raw worklist), `service.flags[0]`, `honors.flags[0]` and `honors.flags[1]`.
That is harmless while they stay hidden (Candidates).

### A missed non-athlete student name (standing rule)

The standing rule (memory `student-names-athletes-only`, plan
[`thespianname.md`](thespianname.md)) is that only student **athletes** are named. The
thespianname census missed one student: **Cornelia Knight**, Covenant Day's Mock Trial
courtroom artist. She is named at **three rendered sites**:

| Site | On the worklist? | Text today |
|---|---|---|
| `src/data/clubClusters.ts` covenant-day `clusters.rows[0].note` | yes (Batch 1) | "…and Cornelia Knight of that team won the courtroom-artist regional in Hickory and finished 2025 State Champion Courtroom Artist runner-up." |
| `src/data/clubsPrograms/covenant-day.ts` `honors.adjacent[1].text` (label "Mock Trial") | **no** (21 words, grade —) | "Courtroom artist Cornelia Knight (Covenant Day Blue) won her regional and finished 2025 state runner-up — the best-documented statewide result in this area." |
| `src/data/metricValues.ts`, the `flagship-result` metric, `quals['covenant-day'].text` (a Compare cell tip; overlay `at` `providence-day:[34].quals.covenant-day.text`) | out of this plan's scope | "Cornelia Knight of the Covenant Day Blue Mock Trial team won the NC Mock Trial courtroom-artist regional (Hickory) and was the 2025 State Champion Courtroom Artist runner-up — the program’s best-documented statewide result." |

`src/content/student-clubs/covenant-day.json` and `src/content/college-support/covenant-day.json`
also hold the name. The user ruled (thespianname) that `src/content` may keep names as
long as none renders. Those files are not edited, and the browser checks confirm the name
does not render.

### How each field renders (what a rewrite may contain)

Confirmed in `src/components/ClubsProgram.tsx`, `ClubClusters.tsx` and `ClubCatalog.tsx`,
and in `src/pages/SchoolDetail.tsx`. **No clubs field renders markdown.** So:

- **Never add `**` or `*` to any clubs unit.** Run every batch with `--no-md` and
  `--md-paths '^$'` (guards (o) and (l)). No rendered worklist unit holds an asterisk
  today.
- **Caps emphasis is the only emphasis.** It appears as "ENGLISH COURSES" (Catholic
  `honors.flags[1]`) and "PARENT" (Trinity `catalog.clubs[4]`). Keep each capitalized
  word capitalized, on the same word.

| Field | Renders as | Notes for a rewrite |
|---|---|---|
| `affinity.headline`, `service.headline`, `honors.headline` | **the collapsed card teaser** (`localizeMoneyText`) and the bold lead when open | Keep it short. `affinity.headline` (PD) is the one on the worklist. |
| `*.subhead` | muted text after the bold headline, in one paragraph | Reads on from the headline. |
| `clusters.verdict`, `catalog.verdict` | the collapsed teaser of those two cards | None is on the worklist. |
| `affinity.leadership` | `<strong>Leadership arm</strong>` (chrome) then the text | Starts capitalized. |
| `honors.adjacent[].text` | `<strong>{label}</strong>` then the text | Starts capitalized. |
| `honors.societies[].recognizes` | a table cell beside `name`, `division`, `feedsFrom` | Short is better. |
| `service.programs[].detail` | a column under `value` (figure) and `name` | `value` repeats a figure the detail may state ("~10,000", "40 hrs"); both must agree. |
| `affinity.strips[].text` | a strip under its `title` (+ `hint`, e.g. "15 clubs") | Same: the hint's count must agree. |
| `clusters.rows[].note` | the paragraph revealed when a row opens, above its `source` line | The `oneLiner` and `evidenceLabel` ("Verified — event", "School-reported", "Third-party roster") sit beside it and are not edited; the note must still agree with them. |
| `catalog.clubs[].note` | a muted line under the club name | One line in a list of up to 77. |
| `catalog.divisions[].text` | between the division `label` and an outline `tag` ("Named minimum", "Structural", "School-reported") | Must still agree with its tag. |
| `service.flags[].text`, `honors.flags[].text` (not-a-club) | an "INDIVIDUAL — NOT A CLUB" chip, then muted text | The chip is chrome. Every one of these explains what is *not* a club. |
| `localizeMoneyText` fields | headlines/teasers, `service.footnote`, `honors.societies[].*`, `honors.adjacent[].text`, `catalog.divisions[].text`, `service.programs[].value` | Safe for money. |
| raw fields | `clusters.rows[].note`/`oneLiner`, `catalog.clubs[].note`, `affinity.strips[].text`, `affinity.leadership`, `affinity.umbrella.detail`, `service.programs[].detail`, flag text | **Never move a `$` amount into one of these.** No worklist unit holds one. |

The cards sit inside `#topic-student-clubs` on `/school/<slug>/`. The three clubsPrograms
cards are `details.note-card-clubs`. Academic & Competitive Clubs and Club Catalog are
`details.note-card.note-card-report` cards rendered by `ClubClusters` (`.clubrow` rows,
each a `<details>`, the first open) and `ClubCatalog` (`.catalog-club`,
`.catalog-division`).

### What the rewritten text must survive (checks and readers of this prose)

- **The hook** runs after every Edit/Write on `src/data/clubsPrograms/*.ts`,
  `src/data/clubClusters.ts` and `src/data/clubCatalog.ts`. The shared files are in scope
  through `EXTRA_LAYERS`, labeled `slug:clusters.<path>` / `slug:catalog.<path>`. It
  blocks only at grade 12 and enforces American spelling.
- **`check:matrices`** (in the build) reads `clubCatalog.ts`:
  - every `categories[].full` label must be a key of `CLUB_CATEGORY_ALIASES`
    (`src/lib/clubsMatrix.ts`);
  - every `CLUB_OVERRIDES` club name must be a `clubs[].name` in that school's catalog;
  - `CLUB_OVERRIDES` quotes must be substrings of their `source-material/student-clubs/`
    file, so `src/data` prose does not affect them.

  `full` and `short` are classified **prose**, so they reach the extractor. None is on the
  worklist, and guard (k) fails if one changes. `clubs[].name` is non-prose and guard (f)
  protects it.
- **Nothing off the worklist is edited.** That covers two kinds of field:
  - **Non-prose fields** (`classifyField` returns skip): club and program `name`, `cat`,
    `key`, `evidence`, `kind`, `honors.societies[].division`, `clusters.rows[].source`,
    `catalog.source`, `sources`, URLs. Guard (f) protects these.
  - **Prose fields that are short and not on the worklist**: `oneLiner`,
    `evidenceLabel`, `verdict`, `verdictHint`, `short`, `full`, `feedsFrom`,
    `divisions[].label` / `tag`, `strips[].hint`, `adjacent[].label`. Guard (k)
    protects these.

  Many of them repeat a name or figure the prose states. So **every name and figure in a rewritten unit must
  survive char-for-char**, which guards (b), (f), (k), (m) and (n) enforce.
- **`check:spelling`** (in the build) fails on any British form. None sits in a worklist
  unit today. `theatre` / `theater` stay exactly as written (usspelling decision): "Drama",
  "International Thespian" and "theater" appear in a few units.
- **`check:schema`** reads card keys, not prose. No drift is expected.
- **`check:dates`** and **`check:digits`** matter in Phase 2 only.

### Clubs content that must survive every rewrite

This is the list Step 3 applies and the reviewer checks against.

1. **Names exactly as printed**, including spelling, case, punctuation and order inside a
   list. They are:
   - **clubs and organizations**: DECA, Model United Nations / Model UN / Model U.N.,
     Speech & Debate, Mock Trial, World Quest, Quiz Bowl, Brainy Yaks Robotics, Battle
     of the Books, Odyssey of the Mind, Blutopia, Timothy Project, Big Brothers Big
     Sisters, Best Buddies, Mel’s Diner, Soccer Souls, Letters to Little Buddies, CLT
     Foundation, BUDEE, POCIS, SDLC, ACT, Mosaic;
   - **honor societies and awards**: National Honor Society, National Junior Honor
     Society, National Beta Club, Rho Kappa, Quill and Scroll, Mu Alpha Theta, the
     Service Society, the Victor Hugo / Homer / Petrarch / Cervantes awards, Bausch +
     Lomb, Rensselaer Medal, the President’s / Presidential Volunteer Service Award,
     Spartan Strong;
   - **competitions and bodies**: NSDA, the 200 Club, MUNCH, NC Mock Trial, the North
     Carolina Bar Foundation, TSA, VEX, FIRST, FLL, iGEM, NCSMA, Scholastic Art and
     Writing, NAIS, the People of Color Conference, the Student Diversity Leadership
     Conference, CDF Freedom School, Freedom School Partners, IDEALS / Round Square;
   - **partners and places**: every named partner, church, park, reservation, courthouse
     and room ("Room 517", "AD Office", "St. Matthew's Parish Center", "Inner Peaks");
   - **programs**: Winterim, Winterm, J-Term, Diploma Distinction, Ethics Labs, Senior
     Capstone, McKnight Oratory, Social Issues Seminar, Greet the Week, Kingdom Impact
     Day, Charger Impact Challenge, Restore525;
   - **people**: Director Bilal Butt, Jennifer Bader, Ayeola Elias, Stephanie Griffin,
     Rep. Jeff Jackson, Mr. Tucker, Mrs. Taylor, Mrs. Finnegan, Mrs. Kosanovich,
     Mr. Christmas, Mr. Kalbaugh, Mrs. Yarussi. **All of them are adults, and they stay
     named.**
2. **Student names: none.** Only athletes may be named, and no clubs unit names one. The
   one missed student name is removed (Decisions). A rewrite never adds a name.
3. **Club vs not-a-club, exactly.** "not a club", "rather than clubs", "none is a club",
   "a program rather than a society", "curricular … rather than clubs", "a PARENT group,
   not a student club", "individual … not a membership", "excluded as non-clubs",
   "standing activities rather than open-enrollment clubs". Keep each item on the side
   of the line it is on. Never turn "not a club" into "unlike a club" or drop the item it
   applies to.
4. **Selection and membership rules.** "entered by application, teacher recommendation,
   a September interview and October training", "requires a B average in English and a
   teacher recommendation; Yearbook additionally requires an application and an
   interview", "application; weighted GPA 3.85", "GPA 3.50 with service hours", "GPA
   3.8+, October inductions", "elected by their grade level peers", "selected Middle and
   Upper Schoolers", "students apply at the end of sophomore year", "may accept or deny
   it", "Selected juniors and seniors", "prorated for transfers", "inducted at the end of
   senior year". A list of conditions keeps every condition and its "and" / "or".
5. **Requirement vs expectation vs optional.** "graduation requirement", "must complete
   a minimum of 25 hours", "no less than 40 hours", "a hard March 1 cutoff", "Service is
   encouraged, but not required", "not a graduation requirement", "The school has no
   community service requirement", "a recognition society, not a requirement", "a
   published graduation-adjacent expectation", "mandatory". "must" stays "must" and
   "requires" stays "requires". An expectation never becomes a requirement, and a
   requirement never becomes an expectation.
6. **Counts, in the form written.** Digits stay digits and words stay words: "Nine Upper
   School affinity groups", "three parent groups", `18 Charlotte sites`, "over 30",
   `150 hours`, `5,485 hours`, "five class members", "seven students", "nine-member",
   "seventeen students … six earned awards, including four", "two faculty … six Upper
   School students", "more than eight organizations", "Thirteen Upper Schoolers",
   "Eight community partners", "13 students", "over 100 community members", "Five honor
   societies", `27` / `18` / `9`, "four countries", "Three consecutive", "five other",
   "six pledges", "four PARENT groups", "a 15-student team", `~1,171`, `76`, `23`,
   `70 hours`, `~10,000`, `~15,000`, `19+`, `50+`, `100 or more`, "seven times … five …
   seven", `35` (`23 + 4 + 8`). The `+`, `~`, "over", "more than", "nearly", "almost",
   "at least", "no less than" and "minimum" qualifiers stay attached. A count keeps its
   noun (members vs students vs teams; hours vs credits).
7. **Results, exactly, with their tier and year.** "won", "first place", "3rd place",
   "5th-place pair", "25th-place pair", "33rd-place finish", "runner-up", "state
   championships", "advanced", "qualified for … Nationals in 2023", "finalists", "top 20
   nationally", "top 100", "Outstanding Delegate", "Best Delegate", "Academic
   All-American", "a second NSDA Diamond". Never upgrade one ("advanced" → "won";
   "runner-up" → "champion"), and keep "the first year of joining", "first held in 2012",
   "the first independent school in the country", "the first high school ever".
8. **Dates, years and times, in the form written.** `2025-26` (hyphen) and `2025–26` /
   `’25–26` / `'26` / `26-27` each keep their own form. So do "since 1984", "every year
   since 1984", "since 1998", "established 2017", "established here in 1999", "first held
   in 2012", "in 2002", "adopted in 2012", "March 2025", "October 2024", "February 12,
   2026", "Class of 2018", "2016-17", "March 1", "every Wednesday", "each Monday morning",
   "one Saturday per month", "the second semester of junior year". A result keeps its
   year, and a year keeps its result.
9. **Verified vs school-reported vs third-party.** Keep "with external evidence", "NC Mock
   Trial Program records show", "documented", "confirmed", "corroborated" (→ "confirmed"
   is allowed; both are VERIFIED), "the school notes / reports / frames / states it
   plainly", "school-reported", "Aggregator-listed", "PrivateSchoolReview lists", "comes
   entirely from PrivateSchoolReview", "single-source", "despite third-party pages
   claiming both". A third-party listing is never turned into the school's own claim, and
   a school claim never becomes a verified fact.
10. **Not found vs not published vs does not exist.** "is not published", "publishes no …",
    "not disclosed", "no … is published for it" is a different claim from "Could not
    confirm", "not independently confirmed", "no … appears anywhere on the site" (our
    search came up empty), and both differ from "there is no National Junior Honor
    Society" (it does not exist, as Trinity's own documents show). Keep each in its class.
11. **Hedges and inferences.** "the suffix implies more than one", "likely", "appears",
    "consistent with a K–8 school", "representative", "explicitly partial", "named
    minimum", "among them", "including", "and more", "such as", "etc.". A rewrite never
    turns an inference into a fact, or a sample into a complete list.
12. **Quoted spans stay byte-identical.** Some are marked with straight or curly quotes
    (`"encourages all students to participate in school-sponsored clubs"`,
    `"Service is encouraged, but not required."`, the long Gaston robotics quote, the
    Trinity Bader and Griffin quotes, `"numerous"`, `"for an additional fee"`). Others
    are unmarked verbatim directory text: the six Charlotte Catholic `catalog.clubs[].note`
    purpose statements (Decisions). Rewrite around them.
13. **Direction of every comparison and every "only".** "the only one hosting a program
    every summer", "The only member school in North Carolina", "the one standing
    high-school service … organization", "Only the Timothy Project", "the one named
    service club", "Model UN is the only conventionally competitive entry", "the school’s
    only confirmed honor or leadership body", "the largest of the six club categories", "a
    thin roster relative to the 23 service clubs", "the deepest slate". A cross-school
    claim is checked against the other schools' files before it is kept (plainaid Batch
    3 precedent).

### Near-repeats (text shared across cards, layers or schools)

Measured with a 7-word shingle scan over all 1,279 clubs prose units in the three layers
(scratch script, not committed). The rules are plainarts':

- **Both sites on the worklist:** rewrite the shared part the same way at every site, and
  change only what differs.
- **One site off the worklist** (or a hidden flag): where the shared part is a whole
  sentence or clause, keep it **byte-identical** in the worklist unit and rewrite only
  the rest.

**Both on the worklist** (rewrite identically):

| Shared part | Sites | Batch |
|---|---|---|
| "The catalog card lists only confirmed organizations." (closing sentence) | providence-day `service.flags[0].text`, charlotte-country-day `service.flags[0].text` | 1 |
| The Cornelia Knight removal wording (Decisions) | covenant-day `clusters.rows[0].note`, `honors.adjacent[1].text`; `metricValues` covenant qual | 1 |
| "a week-long experiential program" → the same plain replacement | charlotte-christian `service.programs[0].detail` (Batch 1) → cannon `service.subhead`, `service.programs[2].detail` (Batch 2) | 1 → 2 |
| The newspaper / literary magazine / yearbook / podcast running as English courses Journalism 234 and Yearbook 235, "which is why none appears in" the directory, with "a B average (in English) and a teacher recommendation" | charlotte-catholic `honors.flags[1].text`, `catalog.divisions[0].text`, `clusters.rows[4].note` (each keeps its own "234" / "(234)" form) | 2 |
| "See You at the Pole … led by the MS SGA and HS Student Council"; J-Term as "a graduation requirement … can include mission trips"; "international missions trips" | carmel-christian `service.programs[2].detail`, `catalog.divisions[2].text` | 3 |
| "These are the school’s academic distinctions in this area." | carmel-christian `clusters.rows[0].note`, hickory-grove-christian `clusters.rows[0].note` | 3 |
| Mock Trial: "Three consecutive state championships in the North Carolina Bar Foundation’s Middle School (Mock Trial) competition … coached by Jennifer Bader … The second title was won at the Mecklenburg County Courthouse against five other middle school teams." | trinity-episcopal `honors.societies[0].recognizes`, `clusters.rows[0].note` | 3 |
| "The Honor Code was created by students in 2002" | trinity-episcopal `honors.adjacent[0].text`, `clusters.rows[2].note` | 3 |

**One site off the worklist** (keep the shared clause byte-identical in the worklist unit):

| Shared text | Worklist site | Off-worklist site(s) |
|---|---|---|
| "the first independent school in the country to host a CDF Freedom School" | providence-day `service.programs[0].detail` | `service.headline` |
| "The directory publishes advisors and rooms but …" | charlotte-catholic `affinity.leadership` | `catalog.divisions[2].text` |
| "promote STEAM in Charlotte Catholic and allow members to get hands-on experience" (a quote) | charlotte-catholic `clusters.rows[2].note` | `catalog.clubs[10].note` |
| "student-led and faculty-supported, meeting during and after school" | cannon `catalog.divisions[0].text` | `affinity.strips[0].text` |
| "The required Senior Capstone Project and the McKnight Oratory" | covenant-day `clusters.rows[3].note` | `honors.adjacent[0].text` |
| "mission trips to the Dominican Republic, Ecuador, Haiti and Kenya"; "the Hickory Grove Baptist Church food pantry" | hickory-grove-christian `catalog.divisions[1].text` | `service.programs[0].detail`, `[1].detail` |
| "Upper School students who have served 100 or more hours" | gaston-day `service.footnote` | `honors.adjacent[1].text` |
| "has taken numerous Scholastic Art and Writing Awards" | gaston-day `clusters.rows[2].note` | `honors.adjacent[3].text` (and the Arts file's `visual.exhibits[1].detail`, not edited) |
| "has served as Forensics Committee Chair and a board member of the North Carolina Association for Scholastic Activities" | trinity-episcopal `clusters.rows[1].note` | `honors.adjacent[2].text` |
| The quotes "The speech and debate and mock trial teams both won…" / "elected by their grade level peers in Middle School" / "I think one thing that sets our team apart…" | trinity-episcopal `clusters.rows[1].note`, `[2].note`, `[0].note` | `honors.societies[1].recognizes`, `[2].recognizes`, `honors.adjacent[2].text` |
| "hold fellow students to the Honor Pledge adopted in 2012" | trinity-episcopal `clusters.rows[2].note` | `catalog.clubs[10].note` |

Near-repeats with a **hidden flag** follow the same off-worklist rule. They are
charlotte-catholic `honors.flags[0]` with `clusters.rows[1].note`, davidson-day
`service.flags[1]` with `service.programs[0].detail` (the quote), hickory-grove
`honors.flags[0]` with `catalog.divisions[0].text`, and trinity `honors.flags[0]` with
`clusters.rows[2].note` ("there is no National Junior Honor Society").

### Phase 1 builds fail at `check:live`, by design

Every rewritten unit gets a new FNV-1a stamp. The nine shipped `student-clubs` overlays
(and, for the one name removal, `metric-values`) still hold the old stamps, so
`npm run build` stops at `check:live`. The steps below run `tsc -b && vite build` and the
build's later checks by hand. Phase 2 makes the full build green.

### Phase 2 machinery (existing, unchanged)

- Work files: `src/data/overlays/work/student-clubs.<lang>.json` (es has 1,054 strings,
  covering all three layers with `at` `slug:path`, `slug:clusters.…`, `slug:catalog.…`)
  and `src/data/overlays/work/metric-values.<lang>.json`.
- `node scripts/i18n_splice_work.mjs --lang <code> --topic student-clubs` (and
  `--topic metric-values`) join a fresh extract to the work file by stamp and report
  *kept / added / dropped*.
- `node scripts/i18n_build_overlay.mjs --topic <topic> --lang <code>`.
- `python3 scripts/check_figures.py --topic <topic> --lang <code>`.
- Locales: `PROSE_TRANSLATED` in `src/lib/i18n.ts` = es, bn, ht, te, fr, fa, it, hi, ar.
  For the mechanism, see `.claude/docs/prose-translation-architecture.md`. The worked
  precedents are the plainarts and thespianname Phase 2 implementation notes. thespianname
  spliced these same two topics on the same day.

## Decisions

- **Scope:**
  - **In scope:** the 101 rendered worklist sites in `src/data/clubsPrograms/*.ts`,
    `src/data/clubClusters.ts` and `src/data/clubCatalog.ts`.
  - **Name removals:** one off-worklist site (covenant-day `honors.adjacent[1].text`) and
    one `metricValues.ts` qual, for the name removal only.
  - **Not edited:** `src/content`, `source-material/`, `src/lib/clubsMatrix.ts`,
    `clubsProgram.ts` card titles, en.json chrome.
- **The 25 hidden GAP/COUNT flags are excluded** (user, 2026-11-10: "Leave them out").
  They never render. They stay byte-identical, the 24 hook issues on them are the
  accepted remainder, and Step 1's `--skip-flag-kinds gap,count` keeps them off the
  worklist. A later plan that makes them render again must rewrite them first.
- **The missed student name is removed at all three rendered sites in Batch 1.** This
  follows the standing HARD rule (memory `student-names-athletes-only`). It is a
  deliberate exception to the "metricValues.ts out of scope" line, limited to that one
  qual's name. The recognition stays and only the person goes, with the same wording at
  every site:
  - **covenant-day `honors.adjacent[1].text`:** "A courtroom artist on the Covenant Day
    Blue team won her regional and finished 2025 state runner-up — the best-documented
    statewide result in this area." The only change is the name; "her", the tier, the
    year and the claim stay.
  - **clubClusters covenant-day `rows[0].note`:** rewritten for plainness in Batch 1,
    with "…and a courtroom artist on that team won the courtroom-artist regional in
    Hickory and finished as 2025 State Champion Courtroom Artist runner-up" (or the
    split equivalent). There is no name, and every other fact is kept.
  - **`metricValues.ts` `flagship-result` → `quals['covenant-day'].text`:** "A courtroom
    artist on the Covenant Day Blue Mock Trial team won the NC Mock Trial courtroom-artist
    regional (Hickory) and was the 2025 State Champion Courtroom Artist runner-up — the
    program’s best-documented statewide result." Edit only the name, using Edit (the hook
    covers `metricValues.ts`).

  It is listed in Open questions so the user can overrule it at the Batch 1 review.
- **Three batches, each with a review stop** (see "Batch plan"). Sizing uses before-words:
  the earlier per-area reviews ran at 1,200–1,500 before-words in 20 minutes. The batches
  are 1,354, 1,435 and 1,566 words. Batch 1 is the calibration batch and also lands the
  tooling.
- **One branch, one PR, opened only after Phase 2.** Each batch is its own commit on
  `feat/plainclubs`.
- **plainarts' Decisions carry over unless this section overrides them.** That covers:
  - keep-and-explain over `plain-ok`;
  - quoted spans untouchable;
  - splitting as the main tool;
  - one string per path, with no structural change;
  - no fixing other standards in passing (the named exceptions here are the student name
    and the vocabulary below);
  - words outside the jargon list fixed only inside worklist units;
  - American spelling, with `theatre`/`theater` as written;
  - a fresh `general-purpose` reviewer per batch;
  - research bookkeeping rewritten for plainness, never moved (clubs has no `verify`
    field, and moving text between fields is structural).
- **A long list of names becomes a `·` run inside the same string.** This is the
  plainarts precedent, for 4+ parallel items after a short lead ending in a colon. It is
  the main tool for the partner, trip, club and category lists (Christian
  `service.footnote`, Catholic `service.programs[3].detail` and `affinity.strips[2].text`,
  Cannon `service.footnote`, DD `service.footnote` and `catalog.divisions[0].text`, Carmel
  `catalog.divisions[2].text`, Covenant `service.footnote`). Every item stays, in order,
  with its parentheses. The `sentences()` splitter reads ` · ` as a break. Prefer plain
  sentences for three items or fewer. Charlotte Country Day `affinity.strips[2].text`
  already uses ` · `; keep its count.
- **Jargon (4 units):**
  - **"experiential" → "hands-on"**, identically at all three sites: "a week-long
    hands-on program". This follows plainarts' Gaston "Hands-on learning". Christian's
    Winterim and Cannon's Winterm keep their names. Before applying, check that
    "experiential" is not inside a quote or a program name at any site (it is not today).
  - **Catholic `honors.adjacent[3].text` "cohort"** → "begun with its first group of 9th
    graders in 2025-26". Keep "selective" and "the school’s most selective academic
    designation", and keep `2025-26` with its hyphen.
- **Charlotte Catholic's catalog purposes are verbatim directory text.** The six
  `catalog.clubs[20|29|31|53|57|64].note` units are the CCHS directory's own purpose
  sentences (some truncated with "…"), then "— advisor <name>, <room>". The source is
  `source-material/student-clubs/charlotte-catholic/… Club Catalog and Overview.md`. So:
  - keep each purpose text **byte-identical**, and change only the tail, to
    "<purpose>. Advisor: <name>, <room>.";
  - measured at planning time, this form passes the hook for CLT Foundation, Mel’s Diner
    and Lacrosse;
  - where the purpose ends in "…" (FCA, Letters to Little Buddies), the checker does not
    split there, so lead with the advisor instead: "Advisor: Mr. Christmas, AD Office.
    The purpose of … through…".

  The other 70 Catholic notes keep the "— advisor" form. The six differ only because
  they cross 30 words. Show this to the user at the Batch 2 review.
- **Gloss rules** (plainarts):
  - **General terms** may be glossed from general knowledge, such as capstone, practicum,
    prefect, faith formation, service-learning, discipleship, apologetics and
    deliberation.
  - **A school's or program's own acronym or term** is glossed only from the source,
    never invented. These stay as written unless the same file spells them out: IDEALS
    (PD spells it out), SDLC, ACT, POCIS (CCD spells it out), DBE, AE, MACS, TSA, NCSMA,
    AFAR, BUDEE, J-Term, Winterim, Winterm and Diploma Distinction.
  - **A gloss never adds a marker word** of a class the unit does not already hold.
- **Vocabulary for this area**, applied only inside worklist units:
  - "slate" → "list" (outside quotes and names); "in scope" → "counted here";
  - "curricular" → "part of the class schedule" or "a class"; "timetabled rather than
    extracurricular" → "scheduled as a class, not as an after-school activity";
  - "liaison" → "link"; "prorated" → "reduced in proportion" (keep "for transfers");
  - "corroborated" → "confirmed" (VERIFIED class); "enumerates" → "lists";
  - "immersive practicum" → keep "practicum" (Davidson Day's term) and explain it
    ("practicum (a hands-on placement)");
  - "graduation-adjacent expectation" → say what it is: "an expectation tied to
    graduation". Keep it an expectation, not a requirement;
  - "a confirmed null", "a deep pass through …", "reproduced rather than quantified",
    "reported at the program level rather than with a medal count", "nothing competitive
    is claimed here", "flagged single-source" → the plain point with the same meaning.
    Say what is or is not published, or where a list comes from, and drop the research
    process. Keep the marker class (UNPUBLISHED, NOTFOUND, THIRDPARTY) the before-text
    had;
  - "aggregator" → may stay, or become "a third-party listing site" (both THIRDPARTY);
    "PrivateSchoolReview" always stays named where it is named;
  - "in the set" / "in this set" → "among the schools on this site" (plaincollege
    precedent), only where the comparison is checked;
  - "philanthropic cause" → "charitable cause"; "immerse in" → "work deeply on".
- **The review generator gains layer support, a hidden-flag filter and clubs marker
  classes, all opt-in and generic** (Step 1), calibrated on the four approved areas.

## Batch plan (Phase 1)

| Batch | Schools | Paths | Before-words | Why this grouping |
|---|---|--:|--:|---|
| **1 — calibration** | providence-day (6), charlotte-latin (7), charlotte-christian (7), charlotte-country-day (5), covenant-day (4), charlotte-prep (3) | **32** (+1 off-worklist name site, +1 metricValues qual) | 1,354 | PD is the model school, with the "only one" Freedom School claim and the shared "catalog card" sentence CCD copies. Latin has the Service Society rule (150 hours, prorated, inducted senior year) and the debate results ladder. Christian sets the "experiential" replacement and has the 21-grade partner list. CCD has the 89-word leadership unit and the MUNCH counts. Covenant has the student-name removal at all three sites. Prep adds a K–8 school, the BUDEE quotes and the science-fair counts. Batch 1 also lands the tooling. |
| **2** | charlotte-catholic (19), cannon (9), davidson-day (7) | **35** | 1,435 | Catholic is the largest school, with the six verbatim directory purposes, the three-site journalism near-repeat, the 22-grade umbrella unit, `cohort`, "ENGLISH COURSES" and the 70-hour service load. Cannon copies the "experiential" wording, and has its not-a-club flag and the ~15,000 figure (Open questions). DD has the longest rendered unit (`service.flags[0]`, a not-a-club flag, 92 words), the Diploma Distinction rules, and the quote "Service is encouraged, but not required." |
| **3** | carmel-christian (10), hickory-grove-christian (6), gaston-day (7), trinity-episcopal (11) | **34** | 1,566 | Carmel and HG share the "academic distinctions" sentence and both rest partly on third-party rosters, with Carmel's 23.4-grade unit and HG's single-source caveats. Gaston has the hour ladder (25 / 40 / 50+ / 100), the 0.25-credit capstone and the long school quotes. Trinity (K–8) has the three-site Mock Trial and Honor Code near-repeats, "PARENT", and three quoted adults. |

32 + 35 + 34 = **101** paths. Phase 2 runs **once**, after Batch 3 is approved.

**Batch arguments** (Steps 2 and 4). Each is combined with
`--dir src/data/clubsPrograms --layers --skip-flag-kinds gap,count`:
- Batch 1: `--slugs providence-day,charlotte-latin,charlotte-christian,charlotte-country-day,covenant-day,charlotte-prep`
- Batch 2: `--slugs charlotte-catholic,cannon,davidson-day`
- Batch 3: `--slugs carmel-christian,hickory-grove-christian,gaston-day,trinity-episcopal`

No `--paths` split is needed: every school sits wholly inside one batch.

**Progress tracking across windows.** Each batch is built in its own window. After each
batch, `/implement` fills that batch's row in "Batch progress". The front matter stays
`status: in-progress` through Batches 1–2 and becomes `english-done` (INDEX: *English
shipped*) only after Batch 3.

### Batch progress

| Batch | Commit | Review file | Reviewer findings (fixed) | User verdict |
|---|---|---|---|---|
| 1 | "plainclubs: batch 1 English" | [review-batch1.md](plainclubs-data/review-batch1.md) | 3 (all fixed: 1 narrowed scope after a split ("all … under a staffed DEI office"), 1 "one student" for an individual award, 1 "each mentored by a faculty member" for "faculty-mentored"), plus 2 reviewer notes acted on ("Academics pause" restored; Prep's concert back inside October 2024) | approved 2026-11-10, no rulings |
| 2 | "plainclubs: batch 2 English" | [review-batch2.md](plainclubs-data/review-batch2.md) | 3 (all fixed: "largest groups" → the unit note's "largest blocks", an over-claiming practicum gloss, "includes" turning a full list into a sample) | |
| 3 | | | | |

### Unit notes (things the drafter must not get wrong)

**Batch 1**
- PD `affinity.headline` is the Affinity card's **teaser**. Keep "Nine", "three parent
  groups", "a documented founding year apiece" and "a staffed DEI office".
- PD `affinity.leadership`: faculty attend the People of Color Conference; **no student
  attendance at the Student Diversity Leadership Conference is published**. That is
  UNPUBLISHED, not "students do not attend".
- PD `service.programs[0].detail`: "the first independent school in the country to host a
  CDF Freedom School" (byte-identical with the headline), "remains the only one hosting a
  program every summer", "all 18 Charlotte sites".
- PD `service.programs[2].detail` begins "The only member school in North Carolina." That
  is a fragment continuing the column's `name`. Keep the IDEALS list in order, and the
  quoted `("Big Builds")`.
- PD `service.footnote`: "over 30 student-run service clubs" is what the school
  **advertises** (CLAIM-like; keep "advertises"). Keep the four grade partnerships in
  order, and keep "The school has no community service requirement" (a does-not-exist
  claim, not unpublished).
- Latin `service.programs[0].detail`: keep the quote byte-identical, "not a requirement",
  "Four-year students need 150 hours, prorated for transfers", and "inducted at the end of
  senior year".
- Latin `service.footnote`: "An earlier profile recorded" (older data, stays visibly
  older), `5,485`, "Class of 2018", "by the end of junior year", "five class members",
  "seven students", `2016-17`.
- Latin `honors.adjacent[0].text`: keep all six award names, each with its subject in
  parentheses, and "as prizes, not chapters".
- Latin `clusters.rows[0].note`: "Director Bilal Butt" (an adult), the four Nationals
  results with their ordinals, "top 20 nationally", "2025 membership in the 200 Club".
- Christian `service.footnote` (grade 21.1): the trip → partner pairs become a `·` run.
  Each item keeps its partner(s) attached to its place (SCORE International → the
  Dominican Republic, and so on).
- Christian `service.flags[0].text` (not-a-club): five items, each on the not-a-club side,
  ending "None is a club."
- Christian `catalog.divisions[1].text` starts "Named minimum:" and sits beside a tag that
  says the same. Keep "(representative)" and "explicitly partial".
- Christian `catalog.divisions[2].text`: `35` = `23 Upper + 4 Middle + 8 Lower`; "no
  single published directory"; "Excluded as non-clubs:" with its four items; "Could not
  confirm:" with its two (NOTFOUND).
- CCD `affinity.leadership` (89 words, grade 14): "selected", "created and hosts the …
  (ACT) Conference … first held in 2012", "Since 1998 … two faculty from each division and
  six Upper School students … every year".
- CCD `service.programs[1].detail` (grade 18): "Academics pause:", "every year since
  1984", "nearly four generations".
- CCD `clusters.rows[0].note`: "seventeen students competed and six earned awards,
  including four Outstanding Delegate honors"; "a Virginia conference produced a Best
  Delegate award".
- Covenant `service.programs[2].detail`: keep the quote byte-identical, "more than 30
  teens", and Restore525 "(and a credit-bearing course)".
- Covenant `clusters.rows[0].note`: name removal (Decisions); keep "the suffix implies more
  than one", "NC Mock Trial Program records show", "runner-up".
- Covenant `clusters.rows[3].note`: "curricular milestones rather than clubs" is the
  not-a-club line.
- Prep `service.programs[1].detail` (grade 7.3, long only): split the long sentence
  only. Keep both quotes and "Eighth graders also tutor their 4th-grade BUDEEs".
- Prep `service.programs[2].detail`: "In October 2024", "the seventh annual one was
  February 12, 2026". "Each February" stays.
- Prep `honors.societies[0].recognizes`: "seven times in 2024, five in 2025 and seven in
  2026 (four Elementary, three Junior)", "first place in Junior Physics in each of those
  three years", and "The school reports a 3rd place …", which is school-reported.

**Batch 2**
- Catholic `affinity.umbrella.detail` (grade 22): "sits under Campus Ministry rather than
  student activities", "the largest blocks", and the three ministry roles.
- Catholic `affinity.strips[1].text`: `~1,171`, "four identity-and-culture groups", "23
  service clubs", "worth asking about on a visit". The judgment is the site's own; keep
  it as a judgment.
- Catholic `affinity.strips[3].text`: "Almost every one of the 76 entries". Never write
  "every".
- Catholic `affinity.leadership`: keep the quote; "no application process, no membership
  caps and no meeting schedule"; "how selective any given club is — if at all — is not
  disclosed" (UNPUBLISHED).
- Catholic `service.programs[3].detail`: the 13-club list stays in order ("… among
  them", a sample); "Several meet off campus".
- Catholic `service.footnote`: "every graduate completes 70 hours", "20 hours a year from
  sophomore year, with a hard March 1 cutoff", "a seven-class timetable". The college
  point is the site's analysis; keep it framed as such.
- Catholic `honors.flags[1]` (not-a-club), `catalog.divisions[0]` and `clusters.rows[4]`
  share the journalism facts (Near-repeats). Keep "ENGLISH COURSES" in caps where it is;
  "Yearbook additionally requires an application and an interview".
- Catholic `clusters.rows[2].note`: keep the quote, "under Mr. Tucker in Room 517", "no
  competition circuit, team number or result is published"; Medical Pathways and Finance
  are "career-exploration clubs … rather than competitive teams".
- Catholic `clusters.rows[3].note`: "Model UN is the only conventionally competitive
  entry"; "publishes no conference attendance or awards".
- Catholic `catalog.clubs[20|29|31|53|57|64].note`: verbatim purposes (Decisions).
- Cannon `affinity.strips[1].text`: "No affinity groups appear in either division"
  (NOTFOUND-like; keep "appear"); the five teams in order, "plus Student Council".
- Cannon `service.subhead`: "The school frames this" (CLAIM-like attribution stays).
- Cannon `service.programs[1].detail`: "every senior" and "Listed among the school's
  Signature Learning Experiences".
- Cannon `service.footnote`: "more than eight organizations including …" (a sample).
- Cannon `service.flags[0].text` (not-a-club): "~10,000 hours", "Because service is not
  required", "The Habitat Club is the exception: it is the one named service club".
- Cannon `catalog.divisions[1].text` (grade 18.6): "a structural difference, not a gap",
  and keep "“passion class”" quoted.
- Cannon `catalog.divisions[2].text`: `~15,000` stays as written (Open questions). "(not
  a graduation requirement)".
- DD `service.programs[0].detail`: "Every Diploma Distinction requires an immersive
  practicum of at least 100 hours", the five options, "quarterly Ethics Labs", "Students
  apply at the end of sophomore year", and the quote.
- DD `service.programs[1].detail`: "the first high school ever to collaborate with the
  program", "Thirteen Upper Schoolers", "two deliberation modules", "two-hour".
- DD `service.footnote`: "Eight community partners are named" lists **seven** names. Keep
  the count word and the list exactly (Candidates), and do not "fix" either.
- DD `service.flags[0].text` (not-a-club, 92 words): the three not-a-club items, "over 100
  community members", "13 students", "the first high schoolers to work with the North
  Carolina State Historic Preservation Office", and "is never defined as a club on the
  school’s own page".
- DD `clusters.rows[1].note`: "(28 members, Class of 2025)" and "Chapter specifics are not
  published".

**Batch 3**
- Carmel `service.subhead`: "a minimum of 20 service hours per grade level in high
  school", "met partly through J-Term and Beta Club rather than a single logged total",
  and an expectation (see Vocabulary). It must still agree with `service.flags[0]`'s "The
  20-hour service requirement". Both stay as their own words; do not reconcile them.
- Carmel `service.programs[0].detail`: "entered by application, teacher recommendation, a
  September interview and October training"; "the one standing high-school service and
  discipleship organization"; "a fixed weekly schedule rather than … an opt-in sign-up".
- Carmel `clusters.rows[0].note`: the GPA rules exactly ("application; weighted GPA
  3.85", "grades 10–12; GPA 3.50 with service hours", "for 8th grade").
- Carmel `clusters.rows[1].note`: the research process goes (Vocabulary); keep "confirmed
  none of the usual academic-competition clubs run as standing Upper School
  organizations", "third-party", "Clubs are student-initiated by application", "chess
  appears only as an Extended-Day enrichment class".
- Carmel `catalog.divisions[0].text`: "may accept or deny it"; "is not published".
- Carmel `catalog.divisions[1].text` (grade 18.5): "nine students" = President/VP/Secretary
  + two per grade. Keep "GPA 3.8+, October inductions".
- Carmel `catalog.divisions[2].text` (grade 23.4): a `·` run of the five traditions,
  with "Chapel and tradition rather than clubs" as the lead.
- HG `service.footnote`: "PrivateSchoolReview lists 27 … 18 "Clubs and Organizations" and
  9 "Arts and Music"" (quotes kept); "flagged single-source" becomes the plain point (the
  Club Catalog list comes from that one site).
- HG `clusters.rows[0].note`: "Five honor societies"; "the school publishes no GPA
  thresholds, induction windows or advisor names".
- HG `clusters.rows[1].note`: "no titled or placement result for any of them is published
  in any source"; "the school's own site has no clubs page". Turn "the flagship-result
  figure is a confirmed null" into the plain point.
- HG `catalog.divisions[0].text` (grade 17.4): "comes entirely from PrivateSchoolReview",
  "no second source enumerates", the confirmed subset "(Discipleship, Choir, Drama, Jazz
  Band)", and "not independently confirmed". Fix the "the rest rest" stutter in the
  rewrite.
- Gaston `service.programs[0].detail`: "no less than 40 hours", the two foci, "the second
  semester of junior year … the first semester of senior year", "0.25 credit".
- Gaston `service.programs[1].detail`: "Selected juniors and seniors", "several days each
  fall", "throughout the school year".
- Gaston `service.programs[2].detail`: "must complete a minimum of 25 hours … each year,
  rising to 40 hours for National Honor Society members"; "Juniors additionally".
- Gaston `service.footnote`: the ladder "25 required, 50 recognized in the Middle School,
  100 recognized in the Upper School", plus the 40-hour NHS threshold; "50+"; "100 or
  more".
- Gaston `service.flags[0].text` (not-a-club): "graduation requirements rather than
  clubs", "every graduate has one".
- Gaston `clusters.rows[1].note`: the long quote is byte-identical (the hook skips it).
  Rewrite only the closing sentence ("Robotics (H) and Engineering (H) …").
- Gaston `clusters.rows[2].note`: keep "numerous" quoted, "entirely student-developed,
  created and published", "consistently recognized", "The school does not publish award
  counts or years".
- Trinity `affinity.leadership`: "Ayeola Elias is Director of Diversity, Equity, and
  Belonging"; "No student diversity leadership council is published, and no attendance …
  appears anywhere on the site". Keep both classes. "consistent with a K–8 school" is an
  inference.
- Trinity `service.programs[2].detail`: "Rep. Jeff Jackson" (the abbreviation is
  mid-sentence; keep it off a sentence end), the five issues in order, and the Griffin
  quote.
- Trinity `honors.subhead` (grade 17.4): "there is no honor-society chapter here" (does
  not exist), "a courtroom, a debate circuit, and an Honor Council its own students
  elect".
- Trinity `honors.adjacent[0].text`: "created by students in 2002", "six pledges" in
  order, "each Monday morning".
- Trinity `clusters.rows[3].note`: "no Trinity participation or result is published";
  "The 2025-26 profile additionally listed MathCats and Book Club; both are gone from the
  26-27 edition" (both year forms as written).
- Trinity `catalog.clubs[4].note`: "PARENT" in caps, "one of four PARENT groups".
- Trinity `catalog.clubs[15].note`: "corroborated on the site only as a paid … enrichment
  offered "for an additional fee"" (keep the quote and "only").

### Style rulings

**Carried over from plaincollege, plainadmissions, plainaid and plainarts.** These are
precedent: the user approved every batch of all four plans with no rulings beyond these.

- Keep-and-explain with a parenthetical for a named term a parent must recognize. No
  `plain-ok` was needed in 259 + 131 + 85 + 132 units, and the target here is the same.
  The checker's `explained()` accepts only a parenthesis **directly after** the term, or
  one wrapping it ("Hands-on music classes (Experiential music)").
- "rather than modelled" → "rather than estimated"; "in this set" / "this series" →
  "among the schools on this site"; "legible" → "clear"; "granular" → "detailed";
  "interpolated" → "estimated"; "spike" → "standout strength"; "Interdisciplinary" →
  "Across subjects".
- **A published maximum or limit is never glossed as a typical figure**, and a published
  rule is never turned into a guess.
- **Splitting:**
  - A long chain or list is split at a boundary as "First: … Then: …" or a `·` run,
    keeping every item in order. A `·` item holding two facts may be split into two
    items in place.
  - A time or abbreviation ending in a period (`a.m.`, `p.m.`, `Jr.`, `Rep.`, `Mr.`,
    `Mrs.`, `Dr.`, `incl.`, `etc.`, initials) is moved off the sentence end, because the
    checker does not split there.
- **A school's own words:**
  - A school's document, program, course or assessment term is never paraphrased.
  - A school's own description that a split detaches is re-attributed ("The school says
    …"), never left as our claim.
- **Claims and markers:**
  - A requirement word is never softened ("must" stays "must", "requires" never becomes
    "includes").
  - A not-published claim keeps a not-published verb ("No director is published"), never
    "there is no …"; "It publishes no …" for a not-published list. A gloss sits where it
    cannot break the not-published phrase.
  - An overclaim verb is never upgraded, and "only" covers everything the source says, so
    a split never adds "also".
  - A marker word the before-text had is never swapped for one outside its class.
  - A cross-school claim is checked against every school's file before it is kept, and a
    false "every" becomes the true quantifier.
  - Terms "as published then" stay in the present tense inside that frame, so they never
    sound lapsed.
- **Referents:** a referent after a split names its noun ("the club", "that program",
  "the team"), never a bare "it" / "this" / "That".
- **From plainarts' batches:**
  - **Quotes:** a quoted span that ends a sentence goes at the end of the unit or is
    followed by a short sentence, because the checker merges it with what follows. A
    unit whose quote would merge is reordered to end on the quote.
  - **Counts:** no count word is added that the before-text lacked (guard (n)). A quoted
    figure is never softened.
  - **Lowercase cites:** a lowercase cite stays lowercase, with a lead word added before
    it.
  - **Shared noun phrases:** a shared noun phrase carries over, but each school keeps its
    own verb class ("turned up" / "could be found" / "is published").
  - **Gloss accuracy:** a gloss describes the right thing.
  - **Causal and trend claims:** "led to" / "keeps producing" are causal or trend claims;
    keep the before-text's verb.
  - **Narrowing:** a rule that applies to one item is never widened to a whole list by a
    split. The before-text's verb of authority stays ("assigned", not "asked"). A sample
    keeps its narrowing word ("including", "such as", "among them").
  - **Guard span gaps:** when a guard's long-span pattern matched across a sentence break
    in the before-text, the rewrite carries a true marker of the same class instead
    ("None of these is published: …").
  - **"Outside":** next to a place name or "exhibitions", "outside" becomes
    "off-campus", never "outside Charlotte" or "outdoor".
  - **Appositives:** an appositive after a split attaches to the person, not the award.
  - **Not-found lists:** a not-found list leads with "None of these appears in any
    source:", never "No source names…" (which reads as not-published).
- **The reviewer's recurring findings in all four plans are the checklist here:**
  - strengthened claims;
  - wrong referents after a split;
  - dropped narrowing words;
  - a gloss that changed a term's meaning;
  - not-published turned into does-not-exist;
  - a school statement turned into our own claim;
  - a false cross-school claim.

*Rulings from this plan's Batch 1 onward are added here by `/implement`.* If a resume
command arrives with the `<, with these rulings: …>` placeholder unfilled, read it as
"approved, no rulings", as all four earlier plans did, and record that batch's choices
here as precedent.

- **Batch 1 (approved 2026-11-10): no rulings.** The resume command arrived with the
  `<, with these rulings: …>` placeholder unfilled, read as "approved, no rulings". So the
  defaults stand:
  - the student name is removed at all three sites, including the `metricValues.ts` tip,
    which is now split into two sentences;
  - Charlotte Christian's prefect roles stay a `·` list.

  Batch 1's choices stand as precedent:
  - **No count word added.** A split that lists named items says "The roles are …", never
    "The nine roles …" (guard (n)).
  - **A split keeps a claim's scope.** "all under a staffed DEI office" becomes its own
    sentence naming what it covers ("All of them sit under …"), and an "In October 2024"
    frame keeps every event it covered.
  - **An individual award stays individual.** It is "an award for a student’s own logged
    hours", never "one student".
  - **A mentoring claim keeps its form.** "faculty-mentored" becomes "mentored by faculty",
    not "each mentored by a faculty member".
  - **A not-published verb keeps its exact class.** "aren’t published consistently" stays
    "aren’t published"; "does not publish" would add UNPUBLISHED.
  - **Name removals use the role.** A removed student becomes "a courtroom artist on that
    team".

### plain-ok register

*Every `// plain-ok` marker added, with path, term and reason. Target: empty.*

## Approvals needed

**None up front.** No card, section, Compare row, metric key, topic or layout changes.
This is a data-text rewrite under the standard the user set. The gates are the user's
wording reviews: one per batch, then Phase 1 → 2.

The user ruled on the one scope question while planning: the hidden GAP/COUNT flags are
left out. One default can be overruled at the Batch 1 review: the student-name removal at
all three sites, including the `metricValues.ts` qual. Two before-text fact flags (Cannon
~15,000, Davidson Day's "Eight" partners) wait for the Batch 2 review. See Open
questions.

## Out of scope

- **Other files:**
  - other research areas;
  - `src/locales/en.json`, including the clubs chrome (`clubs.flag_*`,
    `sections.leadershipArm`, card titles);
  - `src/data/clubsProgram.ts`, `src/lib/clubsMatrix.ts` and every chrome catalog;
  - `src/data/metricValues.ts`, except the one name removal.
- **Research and content files:** `src/content/student-clubs/**`,
  `source-material/student-clubs/**`, and any content overlay.
- **Units not on the worklist:**
  - the 25 hidden GAP/COUNT flags;
  - every off-worklist field and unit, including every non-prose field and every
    off-worklist near-repeat site, except covenant-day `honors.adjacent[1].text` (name
    only). The worklist is the contract.
- **Structural changes:** no new fields, no split arrays, no unit moved between fields,
  no `kind` or `evidence` value changed, no card or component change.
- **Checker changes:** editing `scripts/plain_language.json`, lowering `maxGrade`, or
  changing `scripts/check_plain_language.mjs`.
- **Freshness:** re-verifying clubs, results, advisors or rosters against live pages, and
  reconciling the figure or source questions under Candidates. This is a wording pass,
  plus the one standing-rule name fix.
- **Deploying.** Merging is pre-authorized; `npm run deploy` is the user's call, every
  time.

## Steps

### Phase 1 — English

**Batch 1 runs Steps 1–8. Batches 2–3 each run Steps 2–8 for their own scope.** Before
starting Batch 2 or later, run `git checkout feat/plainclubs`, then
`git fetch && git rebase origin/main`. Do not stash (memory
`never-git-stash-in-shared-tree`). If a rebase conflicts in a clubs file, re-run Step 2
after resolving it, since `main` may have changed a worklist unit.

Every `plain_review.mjs` call in this plan passes
`--dir src/data/clubsPrograms --layers --skip-flag-kinds gap,count`.

1. **Extend `scripts/plain_review.mjs`** (Batch 1 only). Keep every existing option and
   guard, and keep the default behavior byte-for-byte when the new flags are absent.
   Update the header comment (Options, GUARDS).

   **(a) `--layers`: the topic's `EXTRA_LAYERS`, in `--dir` mode.**
   - **Topic lookup.** Find the topic whose `TOPICS` entry equals the `--dir` basename
     (`clubsPrograms` → `student-clubs`). If that topic has no `EXTRA_LAYERS` entry, exit
     2 with a message.
   - **Units per school.** For each slug, the units are the `<dir>/<slug>.ts` entry (bare
     paths, as today) plus, for each `[prefix, mod, fn]` in
     `EXTRA_LAYERS['student-clubs']`, the entry `mod[fn](slug)`. A null entry at both
     base and working tree is skipped; a null at only one is an (a) failure.
   - **Layer units:**
     - They are collected with `proseUnits(entry, prefix, classifyField)`, so
       classification sees the extractor's own path. This matters: `clusters.rows[].name`
       is a `PATH_OVERRIDES` entry.
     - Their paths carry the prefix (`clusters.rows[0].note`).
     - Their `at` is `slug:prefix.path`, the same form as the work files' `at`.
     - Their hook label is also `slug:prefix.path`, the form `check_plain_language.mjs`
       uses for accessor units.
   - **Leaves and guards.** `allLeaves` takes the same prefix, so guards (f) and (k) see
     prefixed paths.
   - **Which file each guard reads:**
     - Guards (a), (f) and (k) run per (school, layer), each against that layer's file.
     - Guard (j) runs within the school's own `<dir>/<slug>.ts`, as today. It also runs
       across all schools within each shared layer module, as accessor mode does. So the
       11-school `verdictHint` repeat is a group, and a change at one school fails (j).
     - The review rows, the per-unit guards, `hookIssues` and the worklist use the
       layer's own source file for `locateLine` and `filterAllowed`.
   - **`--slugs`.** It limits rows, per-unit guards and the worklist to those schools.
     Guards (a), (f), (j) and (k) still visit every school, as in accessor mode, because
     a shared file can be edited for any school.
   - **The review file.** Its per-school table counts every layer. Its title names the
     dir and "+ layers".

   **(b) `--skip-flag-kinds <k1,k2>`: hidden flags off the worklist.** Worklist only: a
   unit whose path matches `^(.*\.flags\[\d+\])\.text$` is skipped when the object at the
   captured path has a `kind` in the list. Review rows and every guard are unaffected, so
   an edit to a hidden flag is still a row and still fails (k).

   **(c) `--clubs-markers`: clubs marker classes for guard (h)**, and guard (n). It
   enables:
   - the arts classes: WIN, NOMINEE, FINALIST, OPEN, AUDITION, CLAIM, VERIFIED, NOTFOUND,
     THEATRE, THEATER;
   - from the aid set: THIRDPARTY;
   - the shared ESTIMATE and BOUND;
   - and these new classes, case-insensitive, presence/absence per unit as today:
     - NOTACLUB: `\bnot (?:a|an) (?:student |standing )?(?:club|organization|membership|society|chapter)\b|\bnone is a club\b|\bnon-?clubs?\b|\brather than (?:as )?(?:a |standing |listed )?(?:clubs?|societ(?:y|ies)|chapters?|competitive teams?)\b|\bnot as clubs\b|\bneither is a club\b`;
     - ELECTED: `\belect(?:ed|ion|ions|s)?\b|\binduct\w*`;
     - APPLICATION: `\bappl(?:y|ies|ied|ying|ication|ications)\b|\binterview\w*|\brecommendation\b`;
     - RESULT: `\brunner-?up\b|\bchampion(?:s|ship|ships)?\b|\btitles?\b|\b(?:\d+(?:st|nd|rd|th)|first|second|third)[- ]place\b|\bplac(?:ed|ement|ements)\b`;
     - ADVANCED: `\badvanc(?:ed|es|ing)\b|\bqualif(?:ied|ies|ying|ication)\b`;
     - ONLY: `\bonly\b|\bsole(?:ly)?\b|\bthe one\b|\bexclusive(?:ly)?\b`;
     - FLOOR: `\bminimums?\b|\bno less than\b|\bfloor\b`;
     - FIRST: `\bfirst\b(?!\s*[,:])` (a lead "First," or "First:" is free; plainarts'
       splits add it).

   A synonym inside one class is free. Leaving a class, or entering one, fails. Shared
   classes run when any of `--aid-markers`, `--arts-markers` or `--clubs-markers` is set.
   THIRDPARTY runs under `--aid-markers` or `--clubs-markers`. The new classes run only
   under `--clubs-markers`. Guard (n) runs under `--arts-markers` or `--clubs-markers`.

   **(d) Negative tests**, one per new behavior, each isolated (memory
   `negative-test-must-isolate-the-assertion`):
   - copy the target file byte-for-byte to the scratchpad;
   - plant exactly one fault and run `--check` with the Batch 1 arguments, plus
     `--clubs-markers --no-md --md-paths '^$'`;
   - confirm it exits 1 with **that guard's letter and that `slug:path`** (and nothing
     else where possible), reading which message printed;
   - restore from the copy and confirm `cmp` is clean.

   The faults:
   - **layer (b):** clubClusters Latin `rows[0].note` "a 5th-place pair" → "a 6th-place
     pair". Expect `(b) charlotte-latin:clusters.rows[0].note`.
   - **layer (f):** clubCatalog Latin `clubs[17].name` "Chess Club" → "Chess Society".
     Expect `(f) charlotte-latin:catalog.clubs[17].name`. (Run `check:matrices` only after
     restoring.)
   - **layer (j):** clubClusters PD `verdictHint` "Open any row…" → "Open a row…". Expect
     `(j)` naming the cross-school group, plus `(k)` for that path.
   - **(k) on a hidden flag:** PD `honors.flags[0].text`, change one word. Expect
     `(k) providence-day:honors.flags[0].text`. Also confirm the worklist (Step 2) never
     lists any of the 25 hidden flags.
   - **NOTACLUB:** Christian `service.flags[0].text` delete "None is a club." Expect
     NOTACLUB lost.
   - **RESULT:** clubClusters Covenant `rows[0].note` "runner-up" → "finalist". Expect
     RESULT lost and FINALIST added.
   - **ELECTED:** clubCatalog Carmel `divisions[1].text` "October inductions" → "October
     meetings". Run with `--slugs carmel-christian`. Expect ELECTED lost.
   - **ONLY:** Cannon `service.flags[0].text` "it is the one named service club" → "it is
     a named service club". Run with `--slugs cannon`. Expect ONLY lost.
   - **(n):** CCD clusters `rows[0].note` "seventeen students" → "sixteen students".
     Expect (n).

   **(e) Calibrate on approved work, and record the result** in Implementation notes.
   Expect some hits from the new classes on non-clubs text. Read every hit: a real past
   slip goes under Candidates; a class that is too tight is loosened only with a recorded
   reason, in the script's comments.

   **A worktree holds the old script.** `ROOT` comes from the script's own location, so
   copy the new `scripts/plain_review.mjs` into each worktree's `scripts/` before running
   it there, then `git worktree remove` it.

   | Area | Worktree at (merge) | Command (inside it) | Known result without `--clubs-markers` |
   |---|---|---|---|
   | College Support | `df1915aa` (#467) | `--dir src/data/collegeSupportPrograms --base c761a159 --check` | 3 (h) hits (plainarts notes) |
   | Admissions | `b181a8d8` (#469) | `--dir src/data/admissionsPrograms --base 9c0e0720 --check` | 16 (the approved cycle relabel) |
   | Financial Aid | `8a4fdbec` (#471) | `--topic financial-aid-report --base 792fbd6a --aid-markers --check` | 2 (the approved 62% removal) |
   | The Arts | `7c2f73df` (#476) | `--dir src/data/artsPrograms --base da0805fa --arts-markers --no-md --md-paths '^$' --check` | expect 0; record what it is |

   Run each row twice, without and with `--clubs-markers`. The without-run must match the
   known result. Also run the old and new script on the Arts row and `diff` the two
   `--out` files, which must be identical apart from the date line. That proves default
   mode is unchanged. Finally, run `--layers` with no other new flag on the current tree
   (`--slugs providence-day --out <scratch>.md --check`): exit 0, 0 rows.
2. **Generate this batch's worklist.**
   `node scripts/plain_review.mjs --dir src/data/clubsPrograms --layers --skip-flag-kinds gap,count --slugs <batch slugs> --worklist .claude/plans/plainclubs-data/worklist-batch<N>.json`.
   Compare its counts with the Batch plan table. If they differ, `main` moved: use the
   regenerated list and note the difference in Implementation notes.

   **Batch 1 also writes `.claude/plans/plainclubs-data/worklist-names.json`** by hand, in
   the generator's format:
   `{ "generated": …, "dir": "src/data/clubsPrograms", "slugs": ["covenant-day"], "total": 1, "counts": {"covenant-day": 1}, "units": [{ "at": "covenant-day:honors.adjacent[1].text", "slug": "covenant-day", "path": "honors.adjacent[1].text", "words": 21, "grade": null, "rules": ["student-name"], "text": "<before text>" }] }`.
   Every later `--allow` includes it.
3. **Draft, measure, then apply** (plainarts' method):
   - **Draft:** write the drafts to a scratch JSON keyed by `at`.
   - **Measure:** run a scratch script over every draft. It calls the real `analyze`,
     plus the Step 1 guard functions, against the original.
   - **Check names:**
     - The draft must contain no student name: grep the drafts for "Cornelia" and
       "Knight", which must both be absent from Covenant's units.
     - Every capitalized word the before-text had must be in the after-text, except the
       removed name. Guard (h) reports this as "caps gone".
   - **Apply:** use an exact-match script that refuses any old literal it cannot find,
     or finds more than once. Build each near-repeat from one shared string in the draft
     file. The two shared files hold every school, so an old literal must be unique in
     the **whole file**, not just in the school's block.
   - **Re-run the hook by hand:** a scripted write bypasses the hook. Afterwards run
     `for f in src/data/clubsPrograms/*.ts src/data/clubClusters.ts src/data/clubCatalog.ts; do node scripts/check_plain_language.mjs --file $f; done`,
     and fix any remaining **batch** unit with Edit, so the hook sees it.
   - **Batch 1 only:** make the `metricValues.ts` name removal with Edit (Decisions). Then
     check that `git diff src/data/metricValues.ts` is that one line, and that its digit
     tokens (`2025`) are unchanged.

   Apply the Decisions, the Style rulings, the Unit notes and **every item of "Clubs
   content that must survive"**. For every unit:
   - Same meaning, same hedges and conditions, same direction of every comparison, same
     side of the club / not-a-club line.
   - Sentences ≤30 words, aiming for 15–20. Units of 30+ words at grade ≤10.
   - Keep each string's quote delimiter valid TS. The clubs files mix single-quoted
     strings (curly `’` for apostrophes) and double-quoted ones (straight `'` inside, as
     in `"Advanced … in '26"`). A straight `'` inside a single-quoted string must be
     escaped (`\'`). Check the delimiter of every string you edit.
4. **Measure.**
   - **Hook loop:** run the `check_plain_language --file` loop. After Batch 1–2, confirm
     that every remaining issue is on a later batch's school or on one of the 25 hidden
     flags. After Batch 3: **exactly the 24 hidden-flag issues** remain.
   - **Review file and guards:** run
     `node scripts/plain_review.mjs --dir src/data/clubsPrograms --layers --skip-flag-kinds gap,count --slugs <batch slugs> --allow .claude/plans/plainclubs-data/worklist-names.json,<worklists 1..N> --md-paths '^$' --no-md --clubs-markers --out .claude/plans/plainclubs-data/review-batch<N>.md --check`.
     It must exit 0, with every row reading `hook: pass`.
   - **Stray edits:** `git diff --name-only main -- src/data/` lists only:
     - `clubsPrograms/<this and earlier batches' slugs>.ts`;
     - `clubClusters.ts` and `clubCatalog.ts`;
     - `metricValues.ts` (from Batch 1).

     Inside the two shared files, guard (k) catches an edit to another school's entry.
   - **Residuals:** put every row with an after-grade above 10 into "Residual units above
     grade 10", with a one-line reason. Expected candidates are the long name lists that
     cannot become `·` runs, and units built around a long official name.
   - **Near-repeats:** confirm that every one in this batch reads identically at all its
     sites, and matches the earlier batch's wording where one set it. Grep one shared
     phrase per group.
5. **Independent review.** Spawn one `general-purpose` subagent with the Agent tool.
   - **Give it:**
     - the path to `review-batch<N>.md`;
     - this plan's sections "Clubs content that must survive", "How each field renders",
       "Near-repeats", "Unit notes", "A missed non-athlete student name", Decisions and
       Style rulings;
     - the batch's `src/data/clubsPrograms/<slug>.ts` files, `src/data/clubClusters.ts`
       and `src/data/clubCatalog.ts`, and `src/lib/clubsMatrix.ts`;
     - for Batches 2–3, the earlier review file that set each shared wording.

     It never sees the drafting conversation.
   - **Tell it to check every row for:**
     - meaning drift, or a strengthened or weakened claim;
     - a dropped hedge, condition or narrowing word ("among them", "including",
       "nearly", "almost", "at least", "representative", "named minimum");
     - an item moved across the club / not-a-club line, or a not-a-club item dropped;
     - a selection, membership, requirement or eligibility rule changed (application,
       interview, recommendation, GPA, election, induction, hours, grade, division,
       credit);
     - a result tier changed or upgraded (won / runner-up / placed / advanced /
       qualified / finalist), or a result's year changed;
     - the school's claim vs a verified or third-party fact blurred;
     - not-found vs not-published vs does-not-exist swapped;
     - a name, count, date, time, room or figure changed, or a word count turned into
       digits;
     - **any student named** (only athletes may be, and none is in this area);
     - a referent made ambiguous by a split;
     - a cross-school claim that the other clubs files contradict;
     - a sentence that is now plainer but wrong.
   - **Its output:** it fixes each finding in the source file (the hook still applies),
     then re-runs Step 4's commands. It returns a findings list: path, problem, fix.
   - **After it returns:** regenerate the table, then append the findings under
     `## Independent review` at the end of `review-batch<N>.md` (the generator keeps that
     tail). Record the count in "Batch progress".
6. **Checks.**
   - **Build:** run `npx tsc -b`, then `npx vite build`.
   - **The build's later checks, by hand:**
     `npm run check:schema && npm run check:spelling && npm run check:matrices && npm run check:schoolurls && npm run check:chrome && npm run check:runtime && npm run check:moneytext && npm run check:dates && npm run check:spans && npm run check:photos`.
   - **`check:live` stale stamps are expected:**
     - in `student-clubs`, for exactly the rewritten texts so far (plus Batch 1's
       Covenant name site);
     - in `metric-values`, 1 (Batch 1).

     Record the counts, which are Phase 2's input. Confirm that no other topic appears.
   - **Schema drift:** if `check:schema` drifts, run `npm run schema` and commit the doc.
     No drift is expected.
7. **Browser check.**
   - **Setup:** run `npx vite preview` after the build. Use headed Chrome via Playwright
     (memory `headed-chrome-via-playwright`). Do not wait on `networkidle` (memory
     `browser-check-networkidle-hangs`). Probe with `textContent`, not `innerText` (memory
     `innertext-case-false-pass`).
   - **For each batch school**, open `/school/<slug>/?topic=student-clubs&lang=en`. Inside
     `#topic-student-clubs`, open every card (`details.note-card-clubs` and the two
     `note-card-report` cards) and every `.clubrow` `<details>`. Scope every probe to
     that section, because a school page renders every topic. Then confirm:
     - every rewritten unit renders (match the live module's text) and **no `*`** appears
       in any rewritten unit;
     - each not-a-club flag still shows its chip;
     - the PD Affinity teaser (collapsed card) shows the new `affinity.headline`.
   - **Batch 1 only, for the removed name:**
     - On `/school/covenant-day/`, the whole page's `textContent` (every card open, every
       topic) contains no "Cornelia".
     - On `/compare/?schools=covenant-day,providence-day&topic=student-clubs`, the
       `flagship-result` cell tip contains no "Cornelia" (tips are hidden divs; read
       `textContent`; memory `ddathletes-shipped`).
   - **Compare page:** open `/compare/?schools=<batch slugs>&topic=student-clubs` and
     confirm the club-category rows still show what they did (`check:matrices` proves
     the data; this proves the page).
   - **Phone width:** take one look at 390px on one batch school with every clubs card
     open, and check for no page overflow.
8. **Commit and stop.**
   - **Stage explicit paths only.** Run `git status --short` first, and never
     `git add -A`. Stage:
     - the batch's `src/data/clubsPrograms/<slug>.ts` files, `src/data/clubClusters.ts`
       and `src/data/clubCatalog.ts`;
     - `.claude/plans/plainclubs-data/worklist-batch<N>.json` and `review-batch<N>.md`;
     - **Batch 1 only:** `scripts/plain_review.mjs`, `worklist-names.json` and
       `src/data/metricValues.ts`;
     - this plan, with "Batch progress" filled in.
   - **Commit and push.** Commit with the message
     `plainclubs: batch <N> English — <schools>`. Push, then check that
     `git rev-parse HEAD` equals `git ls-remote origin feat/plainclubs` (memory
     `git-push-silently-noop`). Do **not** open the PR.
   - **Report to the user:**
     - the review file path;
     - the before/after counts;
     - the residual units;
     - the reviewer's findings, and any flagged factual correction;
     - the URLs from Step 7.
   - **Give the paste-in command for the next window:**
     - after Batches 1–2:
       `/implement plainclubs — Batch <N+1>. Batch <N> English is approved<, with these rulings: …>.`
     - after Batch 3: set `status: english-done` and the INDEX row to *English shipped*.
       Then give
       `/implement plainclubs — Phase 2. All three English batches are approved. Run only Phase 2.`

   **→ STOP after each batch.** On resume, put the user's rulings into "Style rulings" and
   their verdict into "Batch progress" *before* the next batch's Step 2. If the user asked
   for changes to a batch already built, make them, re-run Steps 4–6 for that batch, and
   amend its review file.

**→ STOP. After Batch 3, `/implement` ends its turn and waits.** Nothing below runs until
the user confirms all three batches.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on two
overlay topics:
- **`student-clubs`**, all three layers;
- **`metric-values`**, the one name-removal unit only.

No chrome catalogs and no content overlay. For the mechanism, see
`.claude/docs/prose-translation-architecture.md`. The precedents are the plainarts and
thespianname Phase 2 notes, which this repeats.

The locale traps in those docs apply unchanged:
- figures are copied char-for-char, with `%` unspaced;
- lakh/crore regrouping and RTL isolates are render-layer, never typed into `t`;
- searchable identifiers stay Latin;
- `fr` identifiers are guarded by `check:fr`.

Four traps are specific to this area:

- **Names follow the reviewed predecessor.** Where it kept a club, society, competition,
  program or partner name in English (`Model UN`, `National Honor Society`, `Winterim`,
  `Big Brothers Big Sisters`), keep it. Where it translated a descriptive name, keep that
  translation. Adult names and titles (`Mrs. Taylor`, `Rep. Jeff Jackson`) are never
  translated or re-spelled.
- **The student name must not come back.** The reviewed `t` of the three Covenant units
  contains "Cornelia Knight". The revision removes it exactly as the English did.
  Afterwards, grep every work file and overlay for "Cornelia": 0 hits outside
  `src/content`-derived content overlays.
- **The not-a-club line, selection rules and result tiers carry over.** A translation that
  merges "not a club" into "unlike a club", or "runner-up" into "finalist", fails
  review even when every figure matches.
- **No markdown, in any locale.** A `t` with `*` or `**` ships literal asterisks. The gate
  fails it.

Steps:

1. **Snapshot the base work files** before splicing. For both topics and each locale, run
   `git show main:src/data/overlays/work/<topic>.<lang>.json` into the session
   scratchpad. They hold the native-reviewed translations of the *old* English.
2. **Splice.** For each locale, run
   `node scripts/i18n_splice_work.mjs --lang <code> --topic student-clubs` and
   `… --topic metric-values`. Expect, for `student-clubs`, *added* ≈ *dropped* ≈ the
   final `check:live` stale count (≈102). Expect `metric-values` to be +1/−1. A rewrite
   that happens to equal an existing string merges into it and lowers *added*. If the
   counts are lopsided, stop and investigate.
3. **Translate each *added* unit as a revision of its reviewed predecessor.**
   - **Pairing.** Pair each added unit with the dropped unit at the same `at` path. Give
     the translator the old English, the old `t` and the new English.
   - **The instruction.** **Revise the reviewed translation to say what the new English
     says.** Keep its terminology, register, date forms and reviewed choices wherever the
     meaning is unchanged. Split sentences where the English now splits, and turn a list
     into a `·` run where the English now does. The final `t` is keyed to the **new
     stamp**, never to an index.
   - **Subagents.** Run parallel `general-purpose` subagents, three locales each as
     thespianname did, or one per locale. Each gets its own scratch subdirectory, reads
     only its task file and writes only its own output file (memory
     `parallel-locale-agents-collide`).
   - **The gate.** A scratch apply script gates every output before it writes it to the
     work file. Reuse the plainarts/thespianname gate (rebuild it from this list):
     - the numeric-token multiset against the new English;
     - the money/percent/year/`N+` token multiset;
     - the `**` count (0) and no single `*`;
     - the ` · ` count;
     - no bidi controls and no non-Western digits;
     - `t` ≠ English (except figure-only values and units whose reviewed predecessor
       kept English), and the 0.4–2.5 length ratio;
     - no English month or weekday name outside a quote the English also quotes,
       exempting a month word followed by the same capitalized word as in the English;
     - **no "Cornelia" or "Knight" in any Covenant unit**;
     - a wrong-script scan (Cyrillic or Greek inside a Latin-script locale; the Bangla
       danda U+0964 is the known false positive).
4. **Rebuild** each overlay with `node scripts/i18n_build_overlay.mjs --topic <topic> --lang <code>`
   for both topics.
5. **Verify by stamp, not by `check_work_integrity`**, which reports false "violations"
   after a splice (memory `comparerows-shipped`). Run it anyway. Then prove integrity
   against the snapshot: every kept stamp has `text` and `t` byte-identical, every new
   stamp is non-blank, and every locale passes, for both topics.
6. **Run the Phase 2 checks** (Verification below). Then:
   - fill in Implementation notes;
   - set the plan's `status: implemented` and `prs: [<n>]`, and the INDEX row to
     *Implemented* with the PR link;
   - open the PR with `--body-file`. The body has the per-school counts, links to the
     three review files, a summary of the reviewer findings, the guard calibration result,
     and the student-name removal;
   - squash-merge (pre-authorized), then `git checkout main && git pull`.

   **Do not deploy.** Report "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/clubsPrograms/*.ts` (13 files) | edit: rewrite the 60 worklist sites in this layer, plus covenant-day `honors.adjacent[1].text` (name only); no key, path, name, figure, date, `kind` or non-prose change; the 25 hidden flags untouched |
| `src/data/clubClusters.ts` | edit: rewrite 21 `rows[].note` sites |
| `src/data/clubCatalog.ts` | edit: rewrite 20 sites (12 `divisions[].text`, 8 `clubs[].note`) |
| `src/data/metricValues.ts` | edit: one name removal in `flagship-result` → `quals['covenant-day'].text` |
| `scripts/plain_review.mjs` | edit: `--layers`, `--skip-flag-kinds`, `--clubs-markers` (new classes in (h), guard (n)); header comment |
| `.claude/plans/plainclubs-data/worklist-batch{1..3}.json`, `worklist-names.json` | new: per-batch worklists, plus the one off-worklist name site |
| `.claude/plans/plainclubs-data/review-batch{1..3}.md` | new: before/after review tables + independent-review findings |
| `src/data/overlays/work/student-clubs.{es,bn,ht,te,fr,fa,it,hi,ar}.json`, `src/data/overlays/work/metric-values.{…}.json` | edit (Phase 2): spliced and translated |
| `src/data/overlays/student-clubs.{…}.json`, `src/data/overlays/metric-values.{…}.json` | edit (Phase 2): rebuilt |
| `.claude/plans/plainclubs.md`, `.claude/plans/INDEX.md` | edit: progress, rulings, notes, status |
| `.claude/docs/DATA-SCHEMA.md` | only if `check:schema` drifts (not expected) |

`package.json` needs no edit, because `plain:review` already exists. No skill or slash
command changes, so `.claude/SKILLS.md` is not touched.

## Verification

### Phase 1 — English (per batch)

- [ ] **Hook loop.** `for f in src/data/clubsPrograms/*.ts src/data/clubClusters.ts src/data/clubCatalog.ts; do node scripts/check_plain_language.mjs --file $f; done`:
      every remaining issue is on a later batch's school or a hidden flag. After Batch 3,
      exactly the 24 hidden-flag issues remain.
- [ ] **Guards.** `node scripts/plain_review.mjs --dir src/data/clubsPrograms --layers --skip-flag-kinds gap,count --slugs … --allow … --md-paths '^$' --no-md --clubs-markers --check`:
      exit 0. Every row is `hook: pass`.
- [ ] **Stray edits.** `git diff --name-only main -- src/data/` lists only the batch
      schools' clubs files, the two shared files and (from Batch 1) `metricValues.ts`.
- [ ] **Batch 1 tooling:**
  - each negative test failed on its planted fault with the right letter and `slug:path`,
    and the file was restored to `cmp`-clean;
  - the four calibration runs are recorded, and the without-flag results match the known
    counts;
  - the default-mode output diff is empty;
  - the worktrees are removed.
- [ ] **Batch 1 name removal:** no "Cornelia" in `src/data/clubsPrograms`,
      `clubClusters.ts`, `clubCatalog.ts` or `metricValues.ts`, and none on the rendered
      Covenant page or the Compare tip.
- [ ] **List runs.** Every new `·` run holds every item of the list it replaced, in
      order.
- [ ] **Matrices.** `check:matrices` is green: category labels and club names unchanged.
- [ ] **Residuals.** Every after-grade >10 row is listed in "Residual units above grade
      10".
- [ ] **Near-repeats.** They read identically at every site, across batches and layers;
      the off-worklist and hidden-flag shared clauses are byte-identical.
- [ ] **Independent review.** It is done, and its findings are fixed and recorded.
- [ ] **Build and checks.** `npx tsc -b` is clean. `npx vite build` succeeds. The Step 6
      list is green. The `check:live` stale counts are recorded and cover only
      `student-clubs` (and `metric-values` 1).
- [ ] **Browser.**
  - every clubs card and cluster row is open on each batch school;
  - every rewritten unit renders with no `*`;
  - the not-a-club chips still show;
  - the Compare club rows are unchanged;
  - one 390px look.
- [ ] **After Batch 3:** `npm run check:plain` shows **student-clubs Flagged 19**
      (baseline 100), all of them hidden flags. Grade >10 equals the residual count, plus
      the hidden flags above grade 10, plus the off-worklist units at grade >10 under 30
      words (baseline 118). Every other area is unchanged.

### Phase 2 — Locales

- [ ] **Resolution.** `npm run check:live && npm run check:runtime`: clean.
- [ ] **Digits.** `npm run check:digits`: no finding on a rewritten unit.
- [ ] **Figures and separators, per locale.** `npm run check:sepdrift -- --lang <code>`,
      `python3 scripts/check_figures.py --topic student-clubs --lang <code>` and
      `--topic metric-values`.
- [ ] **Locale checks.** `npm run check:dates`, `check:moneytext`, `check:currency`,
      `check:fr`, `check:hi`, `check:fa`, `check:bidi`; then
      `node scripts/check_work_integrity.mjs`, followed by the by-stamp proof (Phase 2
      Step 5).
- [ ] **Leaks.** `npm run i18n:leaks -- --lang <code>`: no flag on a rewritten path. It
      prints `at` paths, not stamps, so match its flags against the worklist paths
      (memory `plainadmissions-shipped`).
- [ ] **Name.** `grep -l Cornelia src/data/overlays/*.json src/data/overlays/work/*.json`
      lists only `content.*` files, or none.
- [ ] **Build.** `npm run build`: green end to end.
- [ ] **Render audit.** `npm run build && npx vite preview`, then
      `npm run audit:daterender -- --lang es --lang fa --lang hi`. There is no new finding
      on a school page's clubs section compared with `main`. It takes 9+ minutes.
- [ ] **Browser.**
  - **Pages:** one Batch 1 school (providence-day) and one Batch 2 school
    (charlotte-catholic) in `es`, `fa` and `hi` (`?lang=`), with every clubs card and
    cluster row open.
  - **Checks on those pages:** every rewritten unit is in the locale, names and figures
    are intact, no `*` renders, and ranges read correctly in RTL. Strip bidi isolates
    before probing text (memory `ccdprofile-shipped`).
  - **The removed name:** `covenant-day` in `es` and `fa` shows no "Cornelia", on the
    school page or the Compare tip.

## Risks

| Risk | Mitigation |
|---|---|
| A split moves an item across the club / not-a-club line, or drops it | NOTACLUB class; "must survive" item 3; the reviewer's checklist |
| A selection rule loses a condition (interview, recommendation, GPA) | APPLICATION / ELECTED classes; (b) for GPA digits; item 4; reviewer |
| A result is upgraded ("advanced" → "won", "runner-up" → "champion") | RESULT / ADVANCED / WIN / FINALIST classes; item 7 |
| "only" / "first" claims lost or added | ONLY / FIRST classes; item 13 |
| A count word changes ("seventeen" → "sixteen") or a `+` drops | Guard (n); (b) and (m) for digits |
| An edit lands in another school's entry in a shared file | Guard (k) over every school in `--layers` mode; whole-file unique-literal apply |
| A hidden flag gets edited | `--skip-flag-kinds` keeps it off the worklist, so (k) fails on any change |
| The removed student name returns in a translation | the Phase 2 gate's name scan; post-build grep; browser scan |
| `**` or `*` added to a field that renders no markdown | Guards (l) with `--md-paths '^$'` and (o); browser check |
| New classes false-positive and block legitimate rewrites | Calibrated on the four approved areas in Step 1; loosen only with a recorded reason |

## Open questions

- **The student name at all three rendered sites,** including the `metricValues.ts`
  qual. **Default:** remove it in Batch 1 (Decisions), per the standing HARD rule. The
  user may overrule this at the Batch 1 review, for example to leave `metricValues.ts`
  to a separate plan.
- **Cannon `catalog.divisions[2].text` "~15,000 school-wide hours a year".** Cannon's
  own data file (comment at the top of `clubsPrograms/cannon.ts`) and `metricValues.ts`
  both record that ~15,000 is a stale figure, replaced by "almost 10,000" Upper School
  hours. `service.flags[0]` on the same page says "~10,000". **Default:** this wording
  pass keeps `~15,000` char-for-char and flags it at the Batch 2 review. A fact fix is a
  separate change (the artsfacts precedent).
- **Davidson Day `service.footnote` "Eight community partners are named"** lists seven.
  **Default:** keep both as written and flag it at the Batch 2 review.
- **Words outside the jargon list** ("slate", "curricular", "liaison", "prorated",
  "corroborated", "enumerates", "practicum"). **Default:** fix them only inside worklist
  units, and list them in Implementation notes as candidates for `plain_language.json`.
  Do not edit that file.

## Residual units above grade 10

*Filled in by `/implement`: path, after-grade, reason.*

| Path | After-grade | Reason |
|---|--:|---|
| — | — | **None after Batch 2.** All 68 changed units are at grade ≤10. |

## Implementation notes

*Filled in by `/implement`, one section per batch, then Phase 2.*

### Batch 1 (2026-11-10)

**Run in the planning window.** The user ran `/implement plainclubs` in the same window
that wrote the plan. `main` had not moved (`d9de16de`).

**Defaults applied** (Open questions, no user ruling yet):
- the student name is removed at all three sites;
- Cannon's `~15,000` and Davidson Day's "Eight" are kept as written and flagged at Batch 2;
- off-list words are fixed only inside worklist units.

**Step 1 — `scripts/plain_review.mjs`.** `--layers`, `--skip-flag-kinds` and
`--clubs-markers` were added as planned.
- **Worklist:** the generator gives **101** units for the whole roster, identical by `at`
  to the planning scratch script, and **32** for Batch 1.
- **Default mode is unchanged.** In all four calibration worktrees, the main-branch script
  and the new one produced identical `--out` files apart from the date line, with the
  known failure counts.

**Six refinements to the new classes**, each answering a calibration hit and recorded in
the script's comments:
- APPLICATION no longer matches "applied", which caught fee waivers, logos and course
  weights.
- RESULT matches "placed" only before a rank (art "placed across campus", students
  "placed" in colleges).
- ADVANCED also matches "advance", and matches "qualif…" only before "for"/"to" ("a family
  qualifies" is eligibility).
- ONLY gains "no other" and "that one", and ignores "the one before/after".
- FIRST skips an enumeration's "The first is …".
- FLOOR is folded into BOUND as `CLUBS_BOUND_EXTRA`, so "a minimum two weeks" → "at least
  two weeks" is one claim. "floor" counts only after an hour figure ("the 25-hour floor"),
  not a stage floor.

**Calibration result (recorded).** Every remaining hit was read; none is a past slip.

| Run | Without `--clubs-markers` | With it |
|---|--:|--:|
| College Support, worktree `df1915aa`, `--base c761a159` | 3 (known) | 34 |
| Admissions, worktree `b181a8d8`, `--base 9c0e0720` | 16 (known) | 32 |
| Financial Aid, worktree `8a4fdbec`, `--topic financial-aid-report --base 792fbd6a --aid-markers` | 2 (known) | 14 |
| The Arts, worktree `7c2f73df`, `--base da0805fa --arts-markers --no-md --md-paths '^$'` | 0 | 2 |

The extra hits fall into four groups:
- **The arts classes** on non-arts text. These are the ones plainarts recorded ("selective"
  for colleges, "confirmed" scholarships, added count words).
- **Domain mismatches.** "placement" for a grade or a deposit, "applies to everyone",
  "outside the group", "no more than three years".
- **Deliberate strictness on "only" and "first".** In Admissions and Aid, approved splits
  added "only" ("describes TK only in general terms", "only an inference") or "first"
  ("when a student first enrolls"). In clubs, "only" and "first" are claims, so the classes
  stay strict; a drafter keeps the before-text's.
- **(n) count words** added by approved splits ("two", "three", "second"). As in The Arts,
  (n) stays strict.

All four worktrees were removed.

**Negative tests.** For each test, the file was copied, one fault planted, `--check` run,
and the file restored; `cmp` was clean every time.

| Guard | Fault planted | Result |
|---|---|---|
| layer (b) | clusters Latin `rows[0].note` "5th-place" → "6th-place" | exit 1: `(b) charlotte-latin:clusters.rows[0].note` |
| layer (f) | catalog Latin `clubs[17].name` "Chess Club" → "Chess Society" | exit 1: `(f) charlotte-latin:catalog.clubs[17].name` (+ (k)) |
| layer (j) | clusters PD `verdictHint` "Open any row" → "Open a row" | exit 1: `(j)` on the 11-school `verdictHint` group (+ (k)) |
| (k) hidden flag | PD `honors.flags[0].text`, one word | exit 1: `(k) providence-day:honors.flags[0].text` only |
| NOTACLUB | Christian `service.flags[0]` delete "None is a club." | exit 1: NOTACLUB lost |
| RESULT | DD clusters `rows[0].note` "taking first place" → "doing well" (`--slugs davidson-day`) | exit 1: RESULT lost, FIRST lost |
| ELECTED | catalog Carmel `divisions[1]` "October inductions" → "October meetings" | exit 1: ELECTED lost |
| ONLY | Cannon `service.flags[0]` "the one named" → "a named" | exit 1: ONLY lost |
| (n) | CCD clusters `rows[0].note` "seventeen" → "sixteen" | exit 1: (n) |

The first RESULT plant (Covenant "runner-up" → "finalist") gave a count note, not a loss,
because "State Champion" keeps RESULT present. That is correct behavior, the same as
plainarts' `3,500+` test, so the plant was moved to an isolated unit.

**Build.**
- **Worklist:** it matched the plan: 32 units, plus `worklist-names.json` (one unit).
- **Drafts:** all 33 were measured with the real `analyze` before applying. Three needed
  a second pass to reach grade ≤10: PD `affinity.leadership` 12.0, PD
  `service.programs[2]` 10.3, and Latin `service.programs[2]` 10.3.
- **Apply:** the exact-match apply refused nothing.
- **Guards:** every guard passed on the first `--check`.

**Deviation: the `metricValues.ts` name removal is not name-only.** Changing the unit made
the hook judge it, and its one 32-word sentence (grade 16.4) failed. It is now two
sentences: "…won the NC Mock Trial courtroom-artist regional (Hickory). The same student
was the 2025 State Champion Courtroom Artist runner-up, the program’s best-documented
statewide result." The tier, year and claim are unchanged.

**Independent review: 3 findings, all fixed** (see the review file). Two reviewer notes
were also acted on:
- "Academics pause" is restored, per the unit note.
- Prep's concert is back inside "October 2024".

**Step 6 checks.** All green:
- `npx tsc -b` and `npx vite build`;
- `check:schema`, `check:spelling`, `check:matrices`, `check:schoolurls`, `check:chrome`,
  `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`, `check:photos`.

`check:live` reports **34 stale stamps per locale: 33 `student-clubs` + 1
`metric-values`**, exactly the 34 changed texts. Its display is capped and repeated;
`check_live_resolution.mjs --lang es --verbose` gives the exact split. Running total for
Phase 2: **33 + 1**.

**Remaining hook issues.**
- **In the six Batch 1 files**, only hidden-flag issues remain.
- **Across all 15 files**, 77 units still carry issues, and every one is a hidden flag or a
  later batch's school.
- **The name:** `grep Cornelia` finds 0 in `clubsPrograms/`, `clubClusters.ts`,
  `clubCatalog.ts` and `metricValues.ts`.

**Step 7 browser check** (headed Chrome via Playwright, `vite preview`, `?lang=en`, every
details open inside `#topic-student-clubs`):
- **Rendering:** **33/33** changed units render, and no rewritten unit contains `*`.
  Covenant's section shows 4 asterisks: the known orphaned `division` markers (Candidates).
- **Chips:** the not-a-club chips still show (PD, Latin, Christian, CCD, 1 each).
- **Teaser:** PD's Affinity teaser shows the new headline.
- **The removed name:** "Cornelia" appears nowhere on `/school/covenant-day/` with every
  card of every topic open, and nowhere on
  `/compare/?schools=covenant-day,providence-day&topic=student-clubs`. The new tip text is
  present.
- **Phone width:** at 390px, PD with every clubs card open has `scrollWidth` 390.

**Words outside the jargon list fixed inside worklist units** (candidates for
`plain_language.json`, not added): apiece, liaison, prorated, curricular, initiative,
operation (for a program), brokered.

### Batch 2 (2026-11-10)

**Resume.** Batch 1 was approved with no rulings (placeholder unfilled; recorded under
"Style rulings"). `main` had not moved, so the rebase was a no-op.

**Worklist** matched the plan: 35 units (charlotte-catholic 19, cannon 9, davidson-day 7).

**Build.**
- **Drafts:** all 35 were measured with the real `analyze` before applying. Ten needed a
  second pass to reach grade ≤10: Catholic `affinity.leadership`, `service.footnote`,
  `honors.adjacent[3]` and `clusters.rows[4]`; Cannon `service.programs[2]`,
  `service.footnote` and `catalog.divisions[1]`; DD `service.programs[0]` and `[1]`, and
  `clusters.rows[1]`.
- **Apply:** two `clubClusters.ts` strings write the apostrophe as the escape `\u2019`,
  so the exact-match apply refused them at first. The scratch apply script now also
  matches that form and keeps it in the replacement.
- **Deviation from the plan's "cohort" wording.** "begun with its first group of 9th
  graders" would add a FIRST marker. Shipped: "begun in 2025-26 with a group of 9th
  graders".
- **A guard catch before the review.** The DD practicum gloss "(a hands-on placement)",
  planned in Vocabulary, adds a RESULT word ("placement"). The plan's own gloss rule
  forbids that. The reviewer settled it as "(a hands-on learning experience)".
- **Catholic's six verbatim purposes** shipped as planned ("<purpose>. Advisor: <name>,
  <room>." and, for the two truncated with "…", the advisor first). Mel's Diner and
  Lacrosse now use double-quote delimiters, because their straight apostrophes are part of
  the school's text.

**Independent review: 3 findings, all fixed** (see the review file). It also raised four
before-text issues, added to Candidates.

**Step 6 checks.** All green:
- `npx tsc -b` and `npx vite build`;
- `check:schema`, `check:spelling`, `check:matrices`, `check:schoolurls`, `check:chrome`,
  `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`, `check:photos`.

`check:live` (`--lang es --verbose`) reports **68 `student-clubs` + 1 `metric-values`**
stale stamps per locale (33 + 35, plus the Batch 1 tip). That is Phase 2's running input.

**Remaining hook issues.** Across all 15 files, 48 units still carry issues. Every one is
a hidden flag or a Batch 3 school. Charlotte Catholic's file is clean.

**Step 7 browser check** (headed Chrome, `vite preview`, `?lang=en`, every clubs card and
cluster row open):
- **Rendering:** **35/35** render; 0 asterisks in any of the three sections; each school's
  not-a-club chip still shows.
- **The removed name:** still absent from Covenant's page and the Compare tip.
- **Phone width:** at 390px, Charlotte Catholic with every card open has `scrollWidth` 390.

### Candidates noticed, not acted on

*Seeded at planning time. `/implement` adds to this list.*

- **Covenant Day's honors table shows orphaned asterisks.** `honors.societies[].division`
  reads "Upper School*" / "Unstated*" on four rows. The note that explains the asterisk
  ("Entries marked * rest on a third-party roster…") is a GAP flag, which never renders,
  so a parent sees a `*` with no legend. `division` is a non-prose field, so this plan
  does not touch it. The fix is either to drop the four asterisks or to move the legend
  into a rendered field.
- **Third-party club rosters at four schools.** Hickory Grove's whole catalog (27
  organizations, PrivateSchoolReview), Covenant Day's honor societies and two cluster
  rows, and parts of Davidson Day's and Carmel's catalogs rest on third-party listings.
  The user ruled that Gaston Day's clubs come only from school sources (thespianname).
  Whether that rule extends to these schools is the user's call. This plan keeps the
  third-party framing exactly.
- **Cannon's stale ~15,000 hours** (Open questions).
- **Davidson Day's "Eight … partners" lists seven** (Open questions).
- **Four Trinity hidden flags hold `**` markdown** (`affinity.flags[0]` COUNT;
  `service.flags[0]`, `honors.flags[0]` and `honors.flags[1]` GAP). They are harmless
  while hidden, but would ship literal asterisks if the flag filter were relaxed.
- **Gaston Day's Compare `us-organizations` value `≥10` has no tooltip.** The
  `metricValues.ts` hook's `check:quals` reports it as a coded cell with no `quals`
  entry. It was left by #478 (thespianname), predates this plan, and is outside its
  scope. (Batch 1)
- **Charlotte Catholic's "largest blocks" claim.** The directory's own category strip
  (Education 16 · Service 23 · Community 9 · Culture 4 · Sports 15 · General Interest 9)
  has no faith-formation category. So "faith-formation and service clubs are the largest
  blocks" (`affinity.umbrella.detail`) is not backed by those counts. (Batch 2 reviewer)
- **Cannon's Winterm track count.** `service.programs[2].value` is '4' (tracks), but the
  detail and the research file name only three. (Batch 2 reviewer)
- **A misspelled club name.** The Charlotte Catholic catalog's `clubs[].name` reads
  'Fellowship of Christian Atheletes' (non-prose). (Batch 2 reviewer)
- **The thespianname census missed a student name.** It reported 63 strings, but missed
  Cornelia Knight at 3 rendered sites. A non-athlete name scan of the other non-sports
  areas' `src/data` and Compare quals may be worth one more pass (not in this plan).
