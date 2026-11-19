---
name: designsync
title: Catch the Claude Design project up with every page type, research area and shared component the app has today, captured from the built app
status: implemented
phases: 1
created: 2026-11-20
branch: feat/designsync
prs: [503, 504]
---

# Catch the Claude Design project up with the built app

## Goal

The Claude Design project **"Charlotte School Compare Website Design"**
(`5da24575-40bf-4787-8934-0fadfc56059f`) was the source of the app's look in July.
Since then the app has moved on: new research areas, new cards, a K–8 school page and
new shared components, while most design files stopped changing between August and
October. This plan makes the design project match the app as built on `main`. Each
**page type**, **research area** and **shared component** gets one current-state design
file (not one file per school). Outdated files are archived before being replaced,
missing ones are added, and files that hold unbuilt designs are left alone.

It worked when (a) every page type, area and shared component in the inventory has a
current file in the design project, (b) each file renders in Claude Design's preview to
match the real app page in light and dark, at desktop and phone width, (c) every replaced
file has an archived copy, and (d) no file outside the approved list changed its etag.

## Context

### The user's request (2026-11-20, this planning conversation)

> "catch the claude design project up with all the experiences/pages we have today. I
> dont mean add each school page … but i do mean every category of page … up to date
> with the latest version we have built … update the legacy pages in the design project
> and add the net new."

They chose the approach in this plan, **and explicitly opted into parallel helpers (the
Workflow tool) "as long as it won't make more mistakes"**. That opt-in authorizes
`/implement` to call `Workflow`. The accuracy condition decides *where* parallelism is
used (see Decisions).

### The app side: what has to be represented

Routes (`src/App.tsx:109-113`, `src/lib/router.ts`, `scripts/seo_routes.mjs`):

| Page type | Component | Notes |
|---|---|---|
| Home | `src/pages/Home.tsx` | |
| School page, K–12 | `src/pages/SchoolDetail.tsx` | 11 high schools |
| School page, K–8 | same component, `hasHighSchool: false` | Charlotte Prep, Trinity Episcopal. No College Support, adds High School Placement, never on Compare (`DATA-SCHEMA.md` §7) |
| Compare | `src/pages/Compare.tsx` | takes a `topic` and a `schools` param; row components `src/components/Compare*Rows.tsx`, `CellQual.tsx` |
| Admissions Checklist | `src/pages/AdmissionsChecklist.tsx` | takes a `band` param |

There are 12 research areas, in page order per `TOPIC_ORDER` in `src/lib/metrics.ts`
and listed in `.claude/docs/DATA-SCHEMA.md` §1: Admissions, Course Offerings, Global
Exposure (`international-travel`), Learning Support & Student Services, Student Clubs,
The Arts, Sports, College Support, High School Placement, After School, Summer Programs,
and Financial Aid & Tuition. Each area component lives in `src/components/`
(`AdmissionsProgram.tsx`, `CourseOfferings.tsx`, `InternationalTravel.tsx`,
`LearningSupport.tsx`, `ClubsProgram.tsx` + `ClubCatalog.tsx` + `ClubClusters.tsx`,
`ArtsProgram.tsx`, `SportsProgram.tsx` + `DepthChip.tsx`, `CollegeSupport.tsx`,
`HighSchoolPlacement.tsx`, `AfterSchool.tsx`, `SummerPrograms.tsx`,
`FinancialAidReport.tsx`).

**Cards differ by school within an area.** Wells Fargo Cup and the College Pipeline
appear only for some schools, and Learning Support's six cards only where they ship.
So no single school shows every card kind. The grid of which school has which area is
`DATA-SCHEMA.md` §1, and the card lists are §2–§3.

Shared components: the header (logo, `LanguagePicker`, `ThemeToggle`, the Contact us
button, the More Schools row), `StickySchoolTitle`, the table-of-contents chips and the
side rail, `WelcomeVideo`, `LatestNews`, `PodcastDeepDive`, `SourceRow`, `TopLayerTip`,
`PhotoViewer`, `BackToTop`, `SchoolBadge`, `TopicGlyph`, and the footer in `App.tsx`.

Styling is one stylesheet, `src/index.css` (283 KB source). The built
`dist/assets/index-*.css` is **150 KB minified**. The theme is `data-theme` on `:root`
plus `prefers-color-scheme` (`src/index.css:110-125`, `src/lib/theme.ts`). Fonts are
Barlow and Barlow Condensed from Google Fonts (`index.html:39-43`).

### The design project side (listed 2026-11-20)

Each file's etag is its last-write time in Unix microseconds (`etag / 1e6` → date),
which is how these dates were derived. An app component's last commit date does **not**
prove a visual change: many components were touched together on 2026-11-07 and
2026-11-11 by sitewide text passes. **Staleness is therefore decided by a visual
comparison (step 4), never by dates.**

| File at project root | Last write | Probable class (confirmed in step 4) |
|---|---|---|
| `Home.dc.html` | 2026-08-27 | out of date |
| `Compare Schools.dc.html` | 2026-08-07 | out of date |
| `Providence Day School.dc.html` (606 KB, full page mock) | 2026-10-11 | out of date |
| `Admissions Checklist.dc.html` | 2026-08-30 | out of date |
| `Sports Section Redesign.dc.html` | 2026-10-31 | out of date? (the Cup card shipped 10-31) |
| `College Support Section Redesign.dc.html` | 2026-08-27 | out of date |
| `Arts Section Redesign.dc.html` | 2026-08-27 | out of date |
| `After School Section Redesign.dc.html` | 2026-08-27 | out of date |
| `Clubs Section Redesign.dc.html` | 2026-08-27 | out of date |
| `International Travel Section Redesign.dc.html` | 2026-10-11 | out of date |
| `Learning Support Section Redesign.dc.html` | 2026-10-21 | out of date |
| `High School Placement Section Redesign.dc.html` | 2026-09-16 | out of date |
| `Financial Aid & Tuition.dc.html` | 2026-08-27 | out of date |
| `Charlotte Prep Course Offerings.dc.html` | 2026-10-20 | decide in step 4 |
| `High School Placement Class Video.dc.html` | 2026-10-19 | decide in step 4 |
| `More Schools Row.dc.html` | 2026-09-03 | decide in step 4 |
| `Depth Chips Redesign.dc.html` | 2026-11-07 | **decision record** (options 0/2a–2d) |
| `Sports Compare Matrix.dc.html` | 2026-11-06 | decision record or ahead of the app |
| `Academic Clubs Expand Options.dc.html`, `Club Catalog Expand Options.dc.html`, `Podcast Deep Dive Options.dc.html` | 2026-08-27 | decision records |
| `Canvas.dc.html` (206 B, empty) | 2026-09-16 | leave alone |

Also present and **never touched by this plan**: `_ds/industry-…/` (design system
tokens), `archive/`, every `design_handoff_*/` folder, every `*-handoff-instructions.md`,
`uploads/`, `public/`, `support.js`, `doc-page.js`, `image-slot.js`, `site-i18n.js`,
`more-schools-row.js`, `github.md` and `.thumbnail`.

**There is no current file for:** the Admissions section, the Summer Programs section
(only a handoff `.md`), the K–8 school page, Course Offerings for K–12, Latest News,
Welcome Video or the language picker (handoff `.md` files only), or the shared shell as
a whole.

### Write mechanics (verified while planning)

- `mcp__claude-design__get_claude_design_prompt` **must be called before any
  `write_files`** (stated in the tool's own contract).
- `write_files` accepts **inline `data` only**. `local_path` returns "not implemented".
  The memory note `claude-design-write-path.md` records a 77 KB inline payload being too
  big to send, while a 16 KB file worked. So the content of every write passes through
  the model's own output, which brings two risks: size, and **transcription errors**.
  Step 9's byte-exact check exists because of the second.
- `finalize_plan` with `scope: "project"` gives a ~4-hour token for writes and copies
  but **never deletes**. This plan deletes nothing.
- `copy_files` is server-side and has **no size cap**. It is the archive mechanism: a
  606 KB legacy file is copied into `archive/` without passing through the model.
- `render_preview` returns a `serve_url` for Playwright. **Never show it to the user or
  write it to a file.** `open_url` is the only link to give the user.
- Pass `if_match` on every write: the etag from the step-4 listing for a replacement,
  or `"0"` for a new file. A conflict means the user edited the file in Claude Design
  meanwhile, so stop and ask; never force.
- **The `DesignSync` tool is not usable here.** It works only on design-system projects
  through the user-started `/design-sync` skill, and this is `PROJECT_TYPE_PROJECT`.
- **Standalone Claude Design closes by 2026-12-14** (it now lives inside Claude),
  according to the `DesignSync` tool description. Call `get_project` at the start of
  every session. If it returns a `notice` about a move or closure, give the user the
  notice as written and stop.

### The approach this replaces

`.claude/docs/design-sync-urls.md` (PR #113, 2026-08-06) synced the other way round. It
gave the user messages to paste into Claude Design, asking Claude Design's own agent to
read the public GitHub source and redraw the mocks. This plan replaces that approach
because redrawing from source drifts from the real page, and nothing verifies the
result. Here we **capture the rendered page** and **verify** it.

### Reusable code

- `scripts/audit_mobile_layout.mjs:209-255` launches Playwright, opens every
  `<details>` (`openAll`) and avoids `networkidle`. Lesson: school pages never go idle
  (memory `browser-check-networkidle-hangs.md`), so wait on selectors.
- `scripts/audit_card_links.mjs`: `--list` prints every card deep link on every school.
  This is the input to the card-coverage inventory.
- `scripts/audit_scope.mjs` maps cards to `/school/<slug>/#<area>/<card>` links.
- Use real Chrome: `chromium.launch({ channel: 'chrome', headless: false })` (memory
  `headed-chrome-via-playwright.md`), with the script inside the project tree.
- Every one of these needs `npm run build && npx vite preview` serving
  `http://localhost:4173`.

## Decisions

- **The built app on `main` is the truth, captured, not redrawn.** Each design file is
  a snapshot of the page as rendered by `vite preview` from a known commit SHA: the
  real DOM with every card open. The page is styled by the app's own compiled CSS.
  Redrawing by hand is what let the design go out of date in the first place.
- **Capture from the build on `main`, not from the live site.** `main` may be ahead of
  the last deploy, and the user asked for "the latest version we have built". Record
  the SHA in every file and in the index.
- **One file per page type, per area and for the shared components, never per
  school.** This is the user's instruction.
- **Per area, the reference school is the smallest set of schools that covers every
  card kind**, worked out in step 3 from `audit:cardlink --list`. Prefer the richest
  schools (Providence Day, Charlotte Latin, Cannon, Charlotte Country Day) when they
  tie, per CLAUDE.md "mirror the richest school". Learning Support uses Charlotte
  Country Day, its depth reference. Providence Day has no Learning Support area.
  Global Exposure uses Charlotte Country Day, its standard. The K–8 page uses
  Charlotte Prep. A card that no reference school has is captured from the school
  that has it, as an extra block in the same file, labelled with that school.
- **The school-page shell shows cards closed; the area files show them open.** The
  shell is the page as a parent first sees it: header, sticky title, table of
  contents, Welcome Video, Latest News, and each area's header with its card summaries.
  The cards' contents live in the area files. This also keeps the shell small enough
  to send.
- **Shared CSS is written once, as ordered chunks.** The built 150 KB stylesheet is
  split at rule boundaries into `app-css/app-1.css` … `app-css/app-N.css`, each ≤ 38
  KB, and every captured file links them in order. Per-file trimmed CSS was rejected:
  it repeats the same rules in about 18 files and stops matching the app the first time
  a rule changes.
- **Size cap: ≤ 40 KB per written file, excluding the shared CSS.** The capture
  script enforces it with these trimming rules, in order:
  1. Strip `<script>`, comments, React ids and `aria-*`/`data-*` attributes (keep
     `data-card`, `data-theme` and `class`), and collapse whitespace.
  2. In any run of more than 8 repeated sibling elements (`li`, `tr`, chips, grid
     cards), keep the first 6 and add one `.ds-trim` element reading "+N more in the
     app".
  3. If the file is still too big, split the area into ordered parts, for example
     `Sports Section (1 of 2).dc.html`, at card boundaries.

  The step-8 pilot measures the real limit, and the cap may only go **down**.
- **Images point at the live site with absolute URLs**
  (`https://charlotteschoolinsights.com/...`). Uploading binaries inline is
  impractical. If the pilot shows the preview blocks external images, fall back to a
  labelled grey placeholder box with the same dimensions.
- **Every captured file gets the same small header and a light/dark switch.** The
  header gives the title, the reference school(s), the app commit SHA, the capture
  date, and the trimmed counts. The switch is a tiny inline script that toggles
  `document.documentElement.dataset.theme`. This chrome belongs to the design tool;
  none of it is app text.
- **English only.** These are design references, not locale proofs.
  `site-i18n.js` and the existing locale handling in the design project stay untouched.
- **Replace outdated files in place, at the same path, after archiving a copy.** The
  user knows these files by name. The archive copy goes to
  `archive/2026-11 pre-designsync/<same filename>` via `copy_files`. New files are
  named `<Area> Section.dc.html`, plus `School Page (K-8).dc.html`,
  `Shared Components.dc.html` and `Compare Schools — <Area>.dc.html` if Compare has to
  be split.
- **Decision records and files that are ahead of the app are never written.** Options
  files (Depth Chips, the Expand Options files, Podcast Deep Dive Options and probably
  Sports Compare Matrix) record a choice the user made. A file that shows an unbuilt
  design is the user's future work. Both stay exactly as they are and get listed in
  the index.
- **Where parallel helpers are used, and where not.** Parallel work is limited to
  independent tasks with no shared state, and each such task is checked by a script.
  Everything else stays in the main thread:

  | Parallel (Workflow) | Main thread only |
  |---|---|
  | Step 4: comparing each design file with the app, read-only, fixed rubric | Merging and classifying the inventory (one consistent judgment) |
  | Step 9: capture → write → byte-verify → render-check, with each helper owning a disjoint list of files | Shared CSS (every file depends on it), the archive copies, the step-8 pilot, the index file, the final etag cross-check |

  Accuracy guards on the parallel steps:
  1. Each helper gets an **explicit list of paths it owns** and may write nothing else.
  2. Every write passes `if_match`.
  3. `design:verify` checks each written file **byte for byte** against the local
     capture, which catches transcription errors.
  4. Each helper saves side-by-side screenshots, and the **main thread looks at every
     pair itself** rather than trusting a helper's summary.
  5. The main thread starts one preview server, and helpers never start or stop it.

  Respect the medium workflow size (under 10 agents): **4 inventory helpers and 5
  writer helpers.**
- **Single-phase: this adds no user-facing text to the app.** The only repo changes
  are two scripts, one npm script pair, a doc, and plan bookkeeping. Nothing under
  `src/` changes, and nothing is deployed.

## Approvals needed

- **Inventory review (inside `/implement`, at step 5).** Before anything is written to
  the design project, the user confirms the classification of every file, above all
  which files are **ahead of the app** or **decision records**, and the exact list of
  files to write. That list is the write boundary for steps 6–11. This is a stop
  point, not a formality, because an outdated-looking file may hold design work that
  was never built.
- **Claude Design write grant.** The first `finalize_plan` / `write_files` call prompts
  the user once for consent.
- No UX-design gate: nothing in the app changes. No deploy.

## Out of scope

- Any change to the app (`src/**`), its CSS or its locales, and any deploy.
- A design file per school, or per locale.
- Editing or deleting decision records, `design_handoff_*/` folders, handoff `.md`
  files, `uploads/`, `_ds/` or the existing `archive/` contents.
- Interactive behaviour in the design files: filters, tabs, tooltips and the photo
  viewer are captured as a static open state. The file header notes which elements are
  interactive in the app.
- Turning this into a reusable `/design-sync` skill (see Open questions).
- Exporting anything back from Claude Design into code.

## Steps

Single-phase: this adds no user-facing text.

### A. Setup and inventory (read-only for the design project)

1. **Preflight.** Run `mcp__claude-design__get_project` on
   `5da24575-40bf-4787-8934-0fadfc56059f`. If it returns a `notice`, give it to the
   user as written and stop. Then create the branch: `git checkout -b feat/designsync`.
   Run `npm run build` and start `npx vite preview` in the background on `:4173`.
   Record `git rev-parse --short HEAD` as **CAPTURE_SHA**. Take a full listing with
   `list_files` (`depth: -1`) and save the path → etag map to
   `<scratchpad>/designsync/etags-before.json`. Step 12 compares against it.

2. **Write `scripts/design_capture.mjs`** (new, Node ESM, imports `playwright`, real
   Chrome headed by default, `--base` defaulting to `http://localhost:4173`). Modes:
   - `--css`: read `dist/assets/index-*.css` and split it at top-level rule
     boundaries (never inside an `@media` block) into `app-1.css … app-N.css`, each
     ≤ 38 KB. Write them to `--out` and print each size and the sha256.
   - `--page <route> [--area <slug>] [--cards closed|open] [--extra <slug>:<card-id>,…]`:
     load the route and wait for `.topic-section` / main content selectors (never
     `networkidle`). Open every `<details>` within scope (reuse the `openAll` logic in
     `audit_mobile_layout.mjs:238-242`) and wait for Latest News to settle or time out
     at 8 s. Take the scoped DOM subtree: one `#topic-<slug>` section for `--area`, or
     the whole `<main>` plus header and footer for a page. Apply the trimming rules
     from Decisions, rewrite relative `src`/`href` to absolute live-site URLs, and keep
     each school's inline `--brand` style. Wrap the result in the standard file
     skeleton: doctype, charset, viewport, Google Fonts `<link>` copied from
     `index.html:41-43`, `<link rel="stylesheet" href="app-css/app-K.css">` × N, the
     header block, the theme switch and the captured markup. Write `<name>.dc.html` to
     `--out`, then print the size and sha256, plus a warning and exit 1 if it is over
     40 KB.
   - `--screens <route-or-file-url> --name <n>`: screenshot at 1280 px light, 1280 px
     dark and 390 px light, with the same `openAll`, into `--out`.

   Add `"design:capture": "node scripts/design_capture.mjs"` to `package.json`.

3. **Build the card-coverage inventory.** Run `npm run audit:cardlink -- --list` and
   group the card names by area and school. For each area, choose the reference
   school(s) with a greedy set cover over card names, with ties going to Providence
   Day, Charlotte Latin, Cannon, then Charlotte Country Day. Apply the fixed choices
   from Decisions: Learning Support and Global Exposure → Charlotte Country Day, K–8 →
   Charlotte Prep, High School Placement → Charlotte Prep, plus Trinity for any card
   kind Charlotte Prep lacks. Write the result to `.claude/docs/design-sync.md` under
   `## Card coverage`, as one table per area listing every card, the school it is
   captured from, and its deep link.

4. **Compare the design files with the app (Workflow, 4 read-only helpers).** Load the
   `workflow-authoring` skill, then run one workflow. Each helper owns a fixed slice
   of the root `.dc.html` files from the Context table (about 5 each), with the
   matching app pages already captured as screenshots by the main thread using
   `design:capture --screens`. For each file, the helper reads it with `read_file`
   (use `offset`/`limit` for files over 256 KB), screenshots it via
   `render_preview` + Playwright, and returns a structured verdict:
   `{ path, etag, class: current|stale|missing|ahead|decision-record|leave,
   evidence: [specific differences, each naming a card or element], app_target }`.
   Mark a file `ahead` only when it shows something the app does not render. Mark it
   `stale` when the app renders something the file lacks or shows differently. Include
   both lists when both are true. Helpers write nothing and return verdicts only.

5. **Merge and STOP for the user's review.** In the main thread, merge the verdicts
   into `.claude/docs/design-sync.md` under `## Inventory`, with a row per design file
   giving its class and evidence. Add the `missing` rows from the gap list in Context,
   and add the **write list**: every target path, whether it is a replacement or new,
   its reference school(s) and its expected size. Show the user the table and the
   write list, and ask them to confirm or correct each `ahead` and `decision-record`
   call and the write list. **End the turn here. Nothing is written to the design
   project until they confirm.** The confirmed write list is the only set of paths
   steps 6–11 may touch.

### B. Write (only after the step-5 confirmation)

6. **Authorize.** Call `mcp__claude-design__get_claude_design_prompt` with the
   `project_id`, which is required before any write. Then call `finalize_plan` with
   `scope: "project"`, which prompts the user for a one-time consent. Note the
   `expires_at` (about 4 hours) and call `finalize_plan` again if it lapses.

7. **Shared CSS (main thread).** Run `npm run design:capture -- --css --out
   <scratchpad>/designsync/css`. Write each chunk to `app-css/app-K.css` with
   `if_match: "0"` in separate `write_files` calls. Then write
   **`scripts/design_verify.mjs`** (new): it takes a project path and a local file,
   gets a fresh `serve_url` passed in via `--url` (the caller obtains it from
   `render_preview`), fetches the raw bytes, and compares their sha256 with the local
   file. It exits 0 on a match and prints the first differing offset otherwise. Add
   `"design:verify": "node scripts/design_verify.mjs"` to `package.json`. Run it on
   every CSS chunk. All must match.

8. **Pilot one file end to end (main thread).** Use `Summer Programs Section.dc.html`:
   it is new, so no archive is needed and nothing is at risk. Capture it from its
   reference school, write it, run `design:verify` and run `--screens` on both the app
   route and the `serve_url`. Look at the three pairs yourself. This settles, before
   any fan-out:
   - whether 40 KB sends; if not, lower the cap and re-run;
   - whether the preview loads the Google Fonts and the absolute-URL images; if not,
     apply the placeholder fallback in the capture script;
   - whether the relative `app-css/` links resolve.

   Fix the capture script until all three pairs match the app. Every later file is
   built by this exact script version.

9. **Archive, then fan out the writes.**
   - **Archive (main thread, serial).** For every `stale` path on the confirmed list,
     run `copy_files` with `src: <path>` and
     `dest: "archive/2026-11 pre-designsync/<path>"`, using `if_match: "0"`. Confirm
     each copy with `list_files` before its original may be overwritten.
   - **Write (Workflow, 5 writer helpers).** Split the remaining write list into 5
     disjoint path sets, balanced by expected size. Give each helper: its path set
     (the only paths it may write), each path's `if_match` (the step-1 etag, or `"0"`),
     the exact `design:capture` command line per file, the base URL of the running
     preview, and the project-scoped token. For each file the helper must:
     1. run the capture;
     2. read the local output and `write_files` it inline with `if_match`;
     3. `render_preview` → run `design:verify` (must exit 0; on a mismatch rewrite
        once, then report failure rather than looping);
     4. run `--screens` for the app route and the `serve_url` into
        `<scratchpad>/designsync/screens/<file>/`.

     A helper never touches the CSS, the archive, or another helper's paths. It
     returns `{ path, bytes, sha256, verify: pass|fail, screens_dir, notes }`.

10. **Main-thread visual review of every file.** Open every screenshot pair from step 9
    yourself (desktop light, desktop dark and phone light) and compare against the app.
    For any file whose layout, a card, or a colour visibly differs, fix the capture
    and re-run that one file in the main thread. Record the outcome per file in
    `.claude/docs/design-sync.md` under `## Results`.

11. **Write the index file into the design project.** Write `As Built — Index.md` at
    the project root (`if_match: "0"`). It lists, for every file:
    - its status (replaced, new, left as a decision record, left as ahead of the app,
      or untouched);
    - its reference school(s), CAPTURE_SHA and capture date;
    - for replacements, the archive path.

    It also says how to refresh: "rerun `npm run design:capture` from the repo". Keep
    the same table in `.claude/docs/design-sync.md`.

12. **Final cross-check.** Take a fresh `list_files` (`depth: -1`) and diff it against
    `etags-before.json`. Every path whose etag changed, and every new path, must be on
    the confirmed write list, under `app-css/`, under `archive/2026-11 pre-designsync/`,
    or be `As Built — Index.md`. **Any other change is a failure: report it and do not
    proceed.** Then stop the preview server.

13. **Retire the old approach.** Add a banner at the top of
    `.claude/docs/design-sync-urls.md`: "Superseded 2026-11 by the `designsync` capture
    workflow (`npm run design:capture`); see `.claude/docs/design-sync.md`." Leave the
    body as a historical record.

14. **PR.** Run `git status --short`. Then stage only these explicit paths:
    `scripts/design_capture.mjs`, `scripts/design_verify.mjs`, `package.json`,
    `.claude/docs/design-sync.md`, `.claude/docs/design-sync-urls.md`,
    `.claude/plans/designsync.md` and `.claude/plans/INDEX.md`. Commit, push (check
    `git rev-parse HEAD` against `git ls-remote`), open the PR with `--body-file`, then
    squash-merge and pull `main`. **No `npm run deploy`.** The app is unchanged, and
    deploying is the user's call regardless. Give the user `open_url` links, never a
    `serve_url`.

## Files touched

| File | Change |
|---|---|
| `scripts/design_capture.mjs` | new: CSS chunker, page/area capture with trimming, screenshots |
| `scripts/design_verify.mjs` | new: byte-exact check of a written design file against its local capture |
| `package.json` | add `design:capture`, `design:verify` |
| `.claude/docs/design-sync.md` | new: card coverage, inventory, write list, results, index |
| `.claude/docs/design-sync-urls.md` | superseded banner |
| `.claude/plans/designsync.md`, `.claude/plans/INDEX.md` | plan bookkeeping |
| **Claude Design project** | `app-css/*.css`; replaced root `.dc.html` files (archived first); new `<Area> Section.dc.html`, `School Page (K-8).dc.html`, `Shared Components.dc.html`; `As Built — Index.md` |

## Verification

- [ ] `get_project` returns no move/closure notice (step 1).
- [ ] `npm run build`: succeeds, and the CAPTURE_SHA is recorded.
- [ ] `node --check scripts/design_capture.mjs scripts/design_verify.mjs`: clean.
- [ ] `npm run design:verify` exits 0 for **every** written file: CSS chunks, every
      `.dc.html` and the index.
- [ ] Every written `.dc.html` is ≤ the cap the pilot settled on.
- [ ] Main-thread visual review: for every file, the 1280 light, 1280 dark and 390
      light pairs match the app. No card that the card-coverage table lists is missing
      from its area file.
- [ ] Every replaced file has its copy under `archive/2026-11 pre-designsync/`.
- [ ] Step-12 etag diff: no change outside the approved set.
- [ ] Decision-record and `ahead` files have unchanged etags.
- [ ] `git status --short` before committing shows only the paths in step 14.

## Risks

| Risk | Mitigation |
|---|---|
| A file that looks outdated holds unbuilt design work and gets replaced | It is classified `ahead` in step 4, the user confirms in step 5, and an archive copy is taken before any overwrite |
| A transcription error when copying a 40 KB file through the model's output | `design:verify` byte-exact check; one rewrite, then report failure |
| A parallel helper writes outside its slice | Disjoint path lists, `if_match`, and the step-12 etag diff fails the run |
| Inline write too large | The pilot measures it; the cap only goes down; areas split into parts |
| The preview blocks external fonts or images | Found in the pilot; the placeholder fallback is applied |
| The user edits a file in Claude Design mid-run | The `if_match` conflict stops that write, and the user is asked |
| Claude Design standalone closes on 2026-12-14 | `get_project` notice check every session; finish well before |
| Latest News shows whatever headlines are live at capture time | Expected: the shared-components file notes the content is live and untranslated by design |
| A token or `serve_url` leaks into a file or reply | Never persisted; only `open_url` is given to the user |

## Open questions

- **Make this a reusable `/design-sync` skill** so a future catch-up is one command?
  **Default:** no. Mention it in the closing report. If the user wants it, it is a
  follow-up plan that must also update `.claude/SKILLS.md`.
- **Naming of replaced files**: keep `… Section Redesign.dc.html` names, or rename to
  `… Section.dc.html` to match the new files? **Default:** keep the existing paths, as
  the user knows them by name, and ask at the step-5 review.
- **Compare as one file or one file per area.** **Default:** one file if it fits the
  cap, otherwise `Compare Schools — <Area>.dc.html` files plus a small overview file.

## Implementation notes

Built and written 2026-11-20 from `main` at `ff5ab214`. Results, the confirmed inventory
and the as-written file list are in [`.claude/docs/design-sync.md`](../docs/design-sync.md).

**Decisions at the step-5 review (user).** The app is primary: a file that was both out of
date and ahead of the app is replaced, so `Providence Day School.dc.html` (606 KB, with
unbuilt photo-card ideas) was archived and replaced. High School Placement and Learning
Support were replaced after archiving. Existing names were kept (part 1 of a split page
keeps the name), Compare is its default College Support view only (not one file per
topic), and the decision and spec records were left alone.

**Deviations from the plan, and why.**

- **More files than planned, in parts.** The K–12 school page is 3 parts and Compare,
  Sports, College Support and Global Exposure are 2 each, measured on the assembled part.
  Compare splits at its table's row groups and a school page at section boundaries.
- **Trimming only when needed.** The plan trimmed every run over 8; the review showed that
  hid content in small pages (Home 6 of 13 schools, the checklist 6 of 9 steps). A file
  is now trimmed only if it is over 40 KB untrimmed, and navigation, picker, staff,
  checklist and news lists are never trimmed. 11 of 24 files ship whole.
- **More cleaning rules.** `data-*` / `aria-*` attributes the built CSS selects on are
  kept (the plan stripped them all), closed native popovers and `loading="lazy"` are
  dropped, and an area capture keeps an empty side rail so it sits in its real column.
- **Line breaks in every written file.** The write path copies every byte through a
  model, and a reader cuts lines at 2,000 characters; newlines go only where a browser
  treats them as whitespace. The CSS chunks therefore reassemble to the built stylesheet
  with those newlines removed rather than byte for byte.
- **`design:verify` strips the preview server's injection.** Served HTML carries one
  `<style>`/`<script data-omelette-injected>` run after `<head>`; exactly that run is
  removed before comparing, and the check refuses a local file that contains the marker.
  The token in a `serve_url` is project-wide, which is how the main thread re-verified
  every file from one preview link.
- **Latest News** needed a scroll into view (it is lazy) and a wait for its second-pass
  previews; the plan's 8 s wait captured a loading skeleton.
- **Extra script options:** `--sha` (HEAD had moved to the branch commit), `--drop` (the
  Shared Components file), `--variants` (one-variant screenshots for the inventory) and
  `--cards closed` on `--screens`.
- **Two write rounds.** Round 1 wrote 24 files; the main-thread review found the defects
  above, and round 2 re-wrote the 13 files they changed. Each round used 5 helpers with
  disjoint paths, and every write was re-verified from the main thread.
- **Index name.** The server stored `As Built — Index.md` as `As Built - Index.md`.

**Follow-up the same day: editable files (PR #504).** The user asked to keep editing in
Claude Design, and plain HTML is read-only in its editor. `design_capture.mjs` now writes
Claude Design's component format by default (`--format dc`: `<x-dc>`, `./support.js`, a
`DCLogic` script with a Light/Dark Tweaks prop; `--format plain` keeps the old output).
The user confirmed a test file was editable, then all 24 page files were rewritten in
place (round 3) and byte-verified, after a local render check showed identical element
counts, text and height against the plain versions (the one loss, Compare's hidden
pinned-header `<colgroup>`, is invisible). A fourth round added one chrome rule
(`.app{background:var(--bg);color:var(--text)}`) after the user saw the editor's dark
canvas through the page: Claude Design injects `html,body{background:transparent}`.
The plan should have checked editability
before the first write; it assumed a preview-correct file was enough.

**Not done, by design or out of scope.** Standalone Claude Design closes by 2026-12-14; the files' future after the move
into Claude is outside this plan. Not made into a `/design-sync` skill (default: no).
