---
name: recruitranks
title: 247Sports Composite national + state rank columns on the College Pipeline roster
status: implemented
phases: 2
created: 2026-10-26
branch: feat/recruitranks
prs: [373]
---

# 247Sports Composite rank columns on the College Pipeline roster

## Goal

Add two columns to the **Full commitment roster** table inside every school's *The College
Pipeline* card (Sports): **247 Nat'l** and **247 State**. Each shows the athlete's
**247Sports Composite** rank for their recruiting class, taken from 247Sports' public North
Carolina lists. Each value links to the athlete's 247 profile. A dash means 247 published no
rank. This gives a parent a third-party measure of how highly each recruit was rated, beside
the school's own commitment list. It works when the 20 matched athletes show their ranks,
every other row shows "—", and schools with no ranked athlete show no extra columns at all.

## Context

**The card.** `CollegePipelineBody` in `src/components/SportsProgram.tsx` (≈line 323) renders
the roster as a CSS grid (`.sports-roster`, `src/index.css` ≈line 3161:
`grid-template-columns: 46px 1fr 120px 180px 100px 58px`). It has six header cells (Class, Athlete, Sport,
College, Conference, Level) followed by one `RosterRow` per row (≈line 300). On phones it sits
in `.sports-scroll { overflow-x: auto }`, with `.sports-roster { min-width: 620px }` at
≈line 3538, so a wider table scrolls inside its own box and never widens the page.

**The data.** `Commit` in `src/data/sportsProgram.ts` (≈line 160) is
`{ cls, name, sport, college, conf, level }`. Rosters live in
`src/data/sportsPrograms/<slug>.ts` under `pipeline.roster`. There are 312 rows across 10
schools. Charlotte Prep, Gaston Day and Trinity Episcopal have no roster. Charlotte Catholic
writes `cls` as `'2024'` and every other school writes `"'24"`, so normalise with the last two
digits.

**Header chrome keys** are under `"sports"` in `src/locales/en.json` (`classLabel`,
`athlete`, `sport`, `college`, `conference`, `level`, ≈lines 206–225). The catalogs are
`TRANSLATED` in `src/lib/i18n.ts`, so read the list there rather than assuming a count.

**Feasibility, measured during planning (2026-10-26):**
- 247Sports serves its list pages to a plain `GET` with a browser User-Agent. No login, no
  JavaScript and no Cloudflare challenge. The URL is
  `https://247sports.com/season/<year>-<sport>/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC&Page=<n>`.
  Each page holds 50 rows; `Page=2` returns rows 51+, and an empty page ends the list.
  `<sport>` is `football`, `basketball` or `womens-basketball`.
- Each row (`<li class="rankings-page__list-item">`) carries the name and profile link
  (`a.rankings-page__name-link`), the listed high school (`span.meta`), position, stars
  (count of `icon-starsolid yellow`), composite score (`span.score`), national rank
  (`a.natrank`), position rank (`a.posrank`), state rank (`a.sttrank`) and the commitment
  (`a.img-link img[alt]`). A national rank of `NA` means 247 shows a state rank but no
  national rank.
- 247 ranks **only football and basketball**. Women's basketball barely exists there: 0–2 NC
  players per class. Of the 312 roster rows, 89 are football or basketball.
- **21 matched by name and class. 20 pass the school check and are shown; 1 is held back**
  (see Decisions). The 20 are Providence Day 12, Charlotte Christian 3, Davidson Day 3,
  Charlotte Catholic 1 and Charlotte Country Day 1. **14 of the 20 have a national rank.**
  Spot checks of unmatched Power 4 names (Ryan Henley, Neil Salvage, a 2024 walk-on) confirm
  they are unrated rather than missed.
- Classes 2024–2026 have all signed and enrolled, so **these ranks are final** and will not
  change. Only a future 2027+ roster row would need a fresh fetch.

**Nearest pattern.** The row-tag/filter work in the same component, and the NC admissions
ledger as the precedent for a third-party figure that carries its own citation. Optional
data omits its UI, the same way `data.realityCheck &&` does in this component.

## Decisions

- **247Sports Composite, not the 247 in-house rating.** User decision, 2026-10-26. The
  Composite is 247's headline industry average and the default on its list pages. The
  in-house figures are recorded in the source files for audit only and never rendered.
- **Two columns, "247 Nat'l" and "247 State".** User decision and UX approval, 2026-10-26.
  The user chose this over a combined column and a name badge, knowing the National column
  is blank on most rows.
- **Columns are hidden when no roster row has a rank.** Cannon, Carmel Christian, Charlotte
  Latin, Covenant Day and Hickory Grove would otherwise show two all-dash columns.
  Visibility comes from the data (`roster.some(r => r.rank247)`), not from a per-school flag.
- **A match needs name + class + 247's listed high school to agree.** Name and class alone
  produced one conflict: **Bryce Slay** (Carmel '25 → Marshall). 247 lists him at *United
  Faith Christian Academy* (Composite NC #16, national 328), while Carmel's own site claims
  him as an alumnus. **He is withheld** and recorded in the Carmel source file. Do not add
  his rank unless the user decides otherwise.
- **Cells show bare numbers (`6`, `1`), not `#6` or `No. 6`.** A bare integer reads
  correctly in every locale and needs no translation, and the header says what it is.
- **Each rank cell links to the athlete's 247 profile.** This follows the citation-URL rule.
  The URL is stored on the row, so nothing has to be looked up at render.
- **"State" means NC.** Every rostered school is in NC today. The header says "State", not
  "NC", so a future SC school needs no chrome change. A non-NC school must use its own
  state's list (`State=SC`).
- **Bare numbers, never strings, in the data.** `rank247.national` / `rank247.state` are
  `number`s, so the prose extractor has nothing to extract. The `url` leaf is already in
  `SKIP_KEYS` (`scripts/i18n_fields.mjs` ≈line 190).
- **The fetch method is kept as a script, `scripts/fetch_247_ranks.mjs`**, so a new school
  or a 2027 roster row can be refreshed without re-deriving the method. It is not part of
  `npm run build` because it needs the network.

## Approvals needed

**UX approval: GRANTED 2026-10-26** for two new roster columns (247 Nat'l, 247 State), the
note under the table, and hiding the columns on schools with no ranked athlete. Nothing else
needs approval. Deploying stays the user's separate call.

## Source material

Written during planning, **uncommitted, not yet ingested**. One file per school with at
least one football or basketball roster row:

- `source-material/sports/<slug>/<School> - Sports - 247Sports Recruiting Rankings.md` for
  `cannon`, `carmel-christian`, `charlotte-catholic`, `charlotte-christian`,
  `charlotte-country-day`, `charlotte-latin`, `covenant-day`, `davidson-day` and
  `providence-day`. Hickory Grove has no football or basketball roster row, so it has no
  file.

Each file holds a provenance header and a table of matched athletes with Composite score,
stars, national, state and position rank, the 247 in-house national and state rank, 247's
listed school and the profile URL. It also lists the held-back match (Carmel only), the
unmatched football and basketball athletes, a reverse sweep of athletes 247 ranks at the
school who are **not** on our roster, and the list URLs.

**Every `##` heading contains "Recruiting"**, and the filename does too. Both therefore fold
onto the existing `sports :: recruiting` key (the `/top 100|recruiting/i` rule in
`src/lib/metrics.ts`) and cannot slugify into a new card. `/implement` must confirm this with
`node scripts/check_metrics.mjs`.

## Out of scope

- **Adding the reverse-sweep athletes to rosters.** Austin Swartz (Cannon '24, 4★, national
  50, Miami), Sean Birmingham (Cannon '24), Jamal Rule (Charlotte Christian '26, Nebraska),
  and Jack Larsen, Nick Segarra and Charlie Smith (Charlotte Catholic) are leads only. The
  source files record them. A roster backfill would move funnel counts and the by-sport bars,
  and it needs the school's own signing coverage.
- **Correcting `rankedRecruits` prose.** Two known issues:
  1. Providence Day's text calls Sanders "the No. 1 offensive tackle and No. 4 recruit
     nationally". Those are **ESPN** figures, unattributed in the prose. The new column will
     show Composite national **6** and position 2 beside them.
  2. Charlotte Christian's text says L.J. Porter is "among 247Sports' 2026 North Carolina
     football recruits, though his numeric rank is not published". 247 actually lists him at
     **Hough** (Cornelius), Composite NC #64.

  Both are prose edits that ripple into nine locales, so they are a separate follow-up.
  Raise them with the user at the end.
- Other sports' ranking services (Perfect Game, Inside Lacrosse, TopDrawerSoccer and so on).
- Sorting or filtering the roster by rank, and making ranks searchable.
- Any Compare row. This is roster detail only.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout main && git pull && git checkout -b feat/recruitranks`.

2. **Ingest the source files.** Run the `ingest-source-material` skill for the nine new
   files. Then run `node scripts/check_metrics.mjs` and confirm section [1/4] reports no
   unmatched sports subtopic. Every new heading must land on `recruiting`. If one does not,
   rename the heading in the `.md` (keep "Recruiting" in it) rather than adding a RULE.

3. **Fetch script: `scripts/fetch_247_ranks.mjs`.** Node ESM with no dependencies, using
   global `fetch` and the header comment style of the neighbouring scripts.
   - Args: `--slug <slug>` (required), `--state NC` (default), `--years 2023-2027`
     (default).
   - For each `kind` in `compositerecruitrankings` / `recruitrankings` × each sport in
     `football` / `basketball` / `womens-basketball` × each year: page through `&Page=1..n`
     until a page returns no rows. Sleep 1.5 s between requests and send a desktop Chrome
     User-Agent.
   - Parse rows by splitting on `<li class="rankings-page__list-item">`, using the selectors
     listed in Context. Decode HTML entities.
   - Read the slug's roster rows from `src/data/sportsPrograms/<slug>.ts`. Parse with a
     regex that accepts both `'…'` and `"…"` quoting; the files mix them, and a
     single-quote-only regex silently finds 35 of 312 rows. Do not import, because the
     module graph uses `import.meta.glob`.
   - Match on normalised name (lowercase; drop `jr|sr|ii|iii|iv`; strip non-letters) + class
     (`'20' + cls.slice(-2)`). Accept only when 247's `span.meta` contains the school's 247
     name. Keep that map in the script: `Providence Day School`, `Charlotte Christian`,
     `Charlotte Catholic`, `Charlotte Country Day`, `Davidson Day`, `Carmel Christian`,
     `Cannon School`, `Charlotte Latin`, `Covenant Day`.
   - Print a table of `name | cls | composite national | composite state | profile URL`,
     plus the held-back and reverse-sweep lists. Profile URL = `https://247sports.com` + the
     name link's `href` with its trailing `high-school-<id>/` removed. It never writes
     `src/`.
   - Add `"fetch:247": "node scripts/fetch_247_ranks.mjs"` to `package.json` scripts. Do
     **not** chain it into `build`.

4. **Cross-check the script against the source files.** Run `npm run fetch:247 -- --slug
   <slug>` for the six schools that have matches or held-back rows (Providence Day,
   Charlotte Christian, Davidson Day, Charlotte Catholic, Charlotte Country Day, Carmel
   Christian). Every Composite national and state figure must equal the source `.md`. If
   247 has changed a figure since 2026-10-26, stop and tell the user. Do not silently take
   the new value.

5. **Type.** In `src/data/sportsProgram.ts`, add to `Commit`:
   ```ts
   /** 247Sports Composite rank in the athlete's recruiting class (football and
    *  basketball only). Omit when 247 published none — never a placeholder. */
   rank247?: {
     /** National rank; omit when 247 shows "NA". */
     national?: number
     /** State rank (the state's list the school sits in — NC today). */
     state: number
     /** The athlete's 247Sports profile — the citation for both numbers. */
     url: string
   }
   ```

6. **Data: add `rank247` to exactly these 20 rows.** Values and URLs are copied from the
   source files' Composite columns. `—` means omit `national`.

   | School file | Athlete | national | state | url |
   |---|---|---|---|---|
   | providence-day | Gordon Sellars | 177 | 10 | https://247sports.com/player/gordon-sellars-iii-46142814/ |
   | providence-day | Zaid Lott | — | 49 | https://247sports.com/player/zaid-lott-46142511/ |
   | providence-day | Leo Delaney | 332 | 16 | https://247sports.com/player/leo-delaney-46140628/ |
   | providence-day | Jacob Baggett | — | 89 | https://247sports.com/player/jacob-baggett-46165091/ |
   | providence-day | David Sanders Jr. | 6 | 1 | https://247sports.com/player/david-sanders-jr-46118364/ |
   | providence-day | Cairo Skanes | — | 54 | https://247sports.com/player/cairo-skanes-46130820/ |
   | providence-day | Braxton Winston | — | 35 | https://247sports.com/player/braxton-winston-iii-46129251/ |
   | providence-day | Julian Johnson | 459 | 28 | https://247sports.com/player/julian-johnson-46151587/ |
   | providence-day | Brody Barnhardt | 854 | 28 | https://247sports.com/player/brody-barnhardt-46111879/ |
   | providence-day | Jordan Shipp | 118 | 5 | https://247sports.com/player/jordan-shipp-46117435/ |
   | providence-day | Channing Goodwin | 581 | 18 | https://247sports.com/player/channing-goodwin-46111872/ |
   | providence-day | Jadyn Davis | 112 | 4 | https://247sports.com/player/jadyn-davis-46085247/ |
   | charlotte-christian | Bryce Young | 73 | 2 | https://247sports.com/player/bryce-young-46130942/ |
   | charlotte-christian | Micah Gilbert | 245 | 8 | https://247sports.com/player/micah-gilbert-46128048/ |
   | charlotte-christian | Tripp Woody | — | 67 | https://247sports.com/player/tripp-woody-46146089/ |
   | davidson-day | Isaiah Denis | 79 | 4 | https://247sports.com/player/isaiah-denis-46142390/ |
   | davidson-day | Cody Peck | 120 | 2 | https://247sports.com/player/cody-peck-46150042/ |
   | davidson-day | Will Stevens | 186 | 4 | https://247sports.com/player/will-stevens-46149054/ |
   | charlotte-catholic | Dominic Basrawala | — | 82 | https://247sports.com/player/dominic-basrawala-46150298/ |
   | charlotte-country-day | Khalel Wright | — | 56 | https://247sports.com/player/khalel-wright-46139520/ |

   Charlotte Christian's Bryce Young is a 2024 DL from Charlotte Christian, not the
   Alabama/NFL quarterback, and the school check confirms it. Take every URL from the
   source file, never by guessing a slug.

   Also add one entry to `pipeline.sources` for each of these **five** schools, linking the
   NC Composite list for the class year of that school's top-ranked athlete. Example:
   `{ label: '247Sports Composite — 2025 North Carolina football rankings', url: 'https://247sports.com/season/2025-football/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC' }`.
   Source labels render with `localizeLabels={false}`. Confirm in step 10 that the label is
   not extracted as prose.

7. **Component (`src/components/SportsProgram.tsx`).**
   - In `CollegePipelineBody`, compute `const hasRanks = data.roster.some((r) => r.rank247)`.
   - When `hasRanks`, insert two header cells **between Conference and Level**:
     `<div className="sports-th sports-th-c" title={t('sports.rank247Title')}>{t('sports.rankNational')}</div>`
     and the same with `sports.rankState`.
   - Pass `hasRanks` into `RosterRow`. When it is true, render two cells in the same position.
     A present value renders as `<a href={row.rank247.url} target="_blank" rel="noopener noreferrer">{n}</a>`;
     a missing one renders as `—` in `text-muted`. Use class `sports-td sports-th-c`.
   - Toggle the grid template with a modifier class on the container:
     `className={hasRanks ? 'sports-roster has-ranks' : 'sports-roster'}`.
   - When `hasRanks`, render `<p className="sports-note text-muted">{t('sports.rank247Note')}</p>`
     directly under `.sports-scroll`, before `rosterNote`.
   - Leave the search filter alone. Ranks are not searchable.

8. **CSS (`src/index.css`).** Next to `.sports-roster`, add
   `.sports-roster.has-ranks { grid-template-columns: 46px 1fr 120px 180px 100px 64px 64px 58px; }`.
   In the phone media block next to `.sports-roster { min-width: 620px; }`, add
   `.sports-roster.has-ranks { min-width: 760px; }`. Style the rank links to inherit colour
   with an underline on hover, matching existing in-table links if there are any (grep
   `sports-td a`).

9. **Chrome keys, English only.** Add to the `"sports"` object in `src/locales/en.json`:
   - `"rankNational": "247 Nat'l"`
   - `"rankState": "247 State"`
   - `"rank247Title": "247Sports Composite rank in the athlete's recruiting class"`
   - `"rank247Note": "247 Nat'l and 247 State are each athlete's 247Sports Composite rank in their recruiting class. 247Sports ranks only football and basketball, so a dash means no published rank, not an unranked athlete in a ranked sport. Each number links to the athlete's 247Sports profile."`

   Show the user the rendered wording before Phase 2. Reword the note if they prefer, for
   example by dropping the "not an unranked athlete" clause.

10. **Schema doc rule.** In `scripts/gen_data_schema.mjs`, add an `if (s.topic === 'sports')`
    block next to the existing per-topic blocks (≈lines 429, 643, 672). It should write a short
    rule paragraph covering:
    - `pipeline.roster[].rank247` is the **247Sports Composite** only.
    - A rank is set only when name + class + 247's listed school all match; otherwise it is
      held back and recorded in the source file.
    - Football and basketball only.
    - Omit the field when there is no rank, never a placeholder.
    - Fetch it with `npm run fetch:247 -- --slug <slug>`.
    - Persist it to `… - Sports - 247Sports Recruiting Rankings.md` with every `##` heading
      containing "Recruiting".

    Run `npm run schema`, then `npm run check:schema`. `/add-school` reads that document, so
    this rule is how a new school picks the method up.

11. **Checks.** Run `npx tsc -b`, `npm run check:chrome`, `npm run check:live`,
    `npm run check:runtime` and `node scripts/check_metrics.mjs`, then `npm run build`.
    `check:chrome` should report the four new keys as *awaiting translation* (exit 0).

12. **Browser check, English.** Run `npm run build && npx vite preview`, then open these pages
    and expand the College Pipeline card:
    - **Providence Day:** 12 ranked rows; Sanders shows `6` / `1`; clicking a number opens
      the right 247 profile.
    - **Davidson Day:** 3 ranked rows.
    - **Charlotte Latin:** no rank columns and no note.
    - **Carmel Christian:** no rank columns. Slay is withheld, so Carmel has no ranks.

    Then run `npm run audit:mobile` (it opens every card at 320/360/390px) and confirm there
    is no page overflow.

13. **Commit Phase 1 and STOP.** Stage explicit paths only:
    - `src/data/sportsProgram.ts`
    - the five school data files
    - `src/components/SportsProgram.tsx`
    - `src/index.css`
    - `src/locales/en.json`
    - `scripts/fetch_247_ranks.mjs`
    - `scripts/gen_data_schema.mjs`
    - `package.json`
    - `.claude/docs/DATA-SCHEMA.md`
    - the nine source `.md` files
    - the ingest outputs (`.claude/docs/…`, `src/data/schools.json`, content JSON)
    - this plan

    Run `git status --short` first. Push, open the PR (`--body-file`), set this plan's status
    to `english-done`, and **ask the user to review the rendered English** (headers, note
    wording, column order) before Phase 2.

### Phase 2 — Other locales (after the user confirms the English)

14. Translate the four keys into every non-English catalog listed in `TRANSLATED`
    (`src/lib/i18n.ts`). Today that is `es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi` and
    `ar`. These are **chrome only**; no overlay or `PROSE_TRANSLATED` work is involved.
    Rules:
    - Keep "247" and "247Sports" literal in every locale; it is a brand.
    - Keep "Nat'l"-style abbreviations short enough for a 64px column. If a translation will
      not fit, abbreviate it, or widen the two columns in `.has-ranks` for that locale.
    - Never add a `#` or `No.` to the cell numbers.
    - In `fa` and `ar`, check that the header stays on one line and that a number cell
      renders left-to-right inside its link.

15. Run `npm run check:chrome` (now 0 awaiting), `npm run build`, and
    `npm run audit:mobile -- --lang <code>` for at least `es`, `te`, `hi` and `ar` at 320px.
    Then do a browser check of Providence Day in `ar` and `hi` with the card expanded.
    Commit, push, squash-merge (`gh pr merge --squash --delete-branch`), then check out
    `main` and pull. Flip the INDEX row to **Implemented** with the PR link. **Do not
    deploy.** Say "merged — ready to deploy whenever you want it".

## Verification

**Phase 1:**
- `npm run fetch:247 -- --slug providence-day` reproduces the 12 rows in step 6.
- `node scripts/check_metrics.mjs` reports every sports subtopic matched, with the new files
  on `recruiting`.
- `npx tsc -b`, `npm run check:schema`, `npm run check:live`, `npm run check:runtime` and
  `npm run build` are all green.
- `npm run check:chrome` lists exactly the four `sports.rank*` keys as awaiting translation.
- Browser: the step-12 checks pass, and `npm run audit:mobile` passes.

**Phase 2:**
- `npm run check:chrome` reports 0 awaiting translation.
- `npm run audit:mobile -- --lang ar` (and `es`, `te`, `hi`) passes at 320px.
- In real Chrome, Providence Day in `ar` shows translated headers, LTR numbers that are
  clickable, and the translated note.

## Implementation notes

Phase 1 (English) built 2026-10-26 on `feat/recruitranks`.

- **Step 4 (live cross-check) could not run.** Node's `fetch` gets **HTTP 406** from
  247Sports on every list URL, even with the desktop Chrome User-Agent, while `curl` with
  the same User-Agent got 200 during planning and in this session. Changing headers until
  247 accepted the request was blocked as bot-check circumvention, and it was not pursued.
  What was verified instead: the parser was run offline on a page saved with `curl`
  (2025 NC football Composite, page 1), and it reproduced the source file exactly for both
  Providence Day rows on that page (Sanders 6/1, Winston NA/35, same profile URLs). All 20
  `rank247` values were then applied from the source files by script, not retyped, and
  they match this plan's step-6 table. **`npm run fetch:247` as written does not work
  until the 406 is resolved.** That is a user decision.
- **Step 4 was then done by hand in real Chrome (2026-10-26), at the user's request.**
  Playwright drove the installed Google Chrome in a visible window through eight NC
  Composite list pages: 2024, 2025 and 2026 football (pages 1–2 each) and 2025 and 2026
  basketball (page 1 each). Every page returned HTTP 200. **All 20 shipped ranks match
  exactly**, national and state, and so do all 20 profile URLs once the
  `high-school-<id>/` suffix is removed. Bryce Slay is still listed at United Faith
  Christian Academy (national 328, NC 16), so he stays held back. The reverse-sweep leads
  in the source files are also still listed (Jamal Rule, Jack Larsen, Nick Segarra, Charlie
  Smith). Nothing on 247 has changed since planning.
- **The full sweep was then re-run by hand in the same real-Chrome setup.** It loaded
  every NC Composite list for 2023–2027 × football, basketball and women's basketball
  (15 lists, 435 rows, every page HTTP 200; women's basketball has 0–2 rows per class).
  Each row was matched by normalised **name + class** against **all 312 roster rows at
  every school**, whatever school 247 lists the athlete at. Result: **exactly 21
  matches**, the 20 shipped (all values identical) plus Bryce Slay at United Faith (held
  back). No other roster athlete has a 247 Composite rank, so the dashes on the page are
  confirmed as well as the numbers.
- **`check:chrome` does not list new keys as "awaiting translation".** It audits
  skip-field promises, not catalog parity for new keys. It passed, but it never reported
  the four `sports.rank*` keys. Phase 2 needs a different completeness check, such as
  diffing the `sports` object keys across the ten catalogs.
- **PR not opened in Phase 1.** Step 13 says to open it, but `/implement` keeps the PR for
  after Phase 2. The branch is pushed instead.
- **Pipeline source entry appended at the end** of each school's `pipeline.sources`, so the
  school's own source stays first.
- **Third prose inconsistency found (add to the follow-up):** Davidson Day's
  `rankedRecruits` says Cody Peck is "ranked No. 82 nationally by 247Sports". 82 is the
  247 **in-house** rank. The new column shows Composite **120**.
- Ingest was run narrowly (`build_docs.py sports`). It added nine documents, all on
  `sports :: recruiting`, which went from 7 to 9 schools. Sports has a structured program,
  so its prose groups do not render and no card appeared.
- **Phase 2 (2026-10-26).** The four keys were inserted as text after `"level"` in each of the
  nine catalogs, not by re-serialising the JSON, so key order and the `ar` plural forms are
  untouched. Parity was confirmed with a script, since `check:chrome` cannot see new keys.
  Headers: es `247 Nac.`/`247 Estatal`, fr `247 Nat.`/`247 État`, it `247 Naz.`/`247 Stato`,
  ht `247 Nas.`/`247 Eta`, bn `247 জাতীয়`/`247 রাজ্য`, te `247 జాతీయ`/`247 రాష్ట్ర`,
  hi `247 राष्ट्रीय`/`247 राज्य`, fa `247 ملی`/`247 ایالتی`, ar `247 وطني`/`247 الولاية`.
  All fit the 64px columns on one line in real Chrome (`ar`, `hi`, `fa` checked), so no
  per-locale column widening was needed. `audit:mobile` at 320px in es/te/hi/ar showed no
  page overflow.
- **Phase 2 commit pushed through the GitHub API.** `git push` hit the git-only "Could not
  resolve host" failure, while `gh` worked. The locale, plan and index changes reached the
  PR branch as a commit created with `gh api`.

