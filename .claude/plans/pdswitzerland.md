---
name: pdswitzerland
title: Add Providence Day's summer 2027 Middle School trip to Switzerland to Global Exposure
status: implemented
phases: 2
created: 2026-10-18
branch: feat/pdswitzerland
prs: [353]
---

# Providence Day — the 2027 Switzerland Middle School trip

## Goal

Providence Day has published a fourth trip for summer 2027: **Switzerland, "Explorers of the
Invisible: Physics, Peace, & Swiss Precision"**, for students in grades 6–8. It is the first
published Middle School trip for 2026–27. This plan adds it to Providence Day's existing
**Global Exposure** section:

- a fourth row in the **2026–27** group of the Where They Go ledger;
- a Middle School mention in When Your Child Can Start;
- Signing Up updated so the shared deadlines apply to grades 6–11, not only Upper School, with the two financial-aid award dates restored;
- Ask the School trimmed from 9 questions to 8, because the page answers part of two.

It works when the ledger reads **19 trips** (Upper School 15, Middle School 4) and every new
fact cites the Switzerland page. No price, deposit, airfare, exact travel date or leader name
appears on the page. There is no new card, field or tag type.

## Context

**The area.** Global Exposure (slug `international-travel`). Providence Day's data is in
`src/data/internationalTravel/providence-day.ts`, and the types are in
`src/data/internationalTravel.ts`. The renderer is `src/components/InternationalTravel.tsx`,
and its filter count is computed (`travel.tripsShown`, InternationalTravel.tsx:194 and :219).
Read `src/data/internationalTravel/README.md` before editing.

**The nearest precedent is `.claude/plans/pdtrips2027.md` (PR #341).** It added the three Upper
School 2027 trips (Japan, Iceland, France) and set this plan's conventions. Read its
**Implementation notes**: the user's review there changed the plan in three ways. The first
two bind here; the third is **reversed** by this plan.

1. **No trip costs on the page.** That covers prices, airfares and the deposit amount.
2. **No exact travel dates on the page.** Use "summer 2027", and give the trip rows no
   `timing` tag. Registration and payment deadlines are fine.
3. ~~No financial-aid award rows in Signing Up.~~ The rows dated Nov 13 and Nov 16 were
   removed at that review, which left 7 events in the Global Trips column. **The user
   reversed this on 2026-10-18 while reviewing this plan**: put both rows back (see
   Decisions). They are application-cycle deadlines, like the ones kept, and Charlotte
   Country Day's Signing Up already carries financial-aid deadlines.

**The page** (verified live on 2026-10-18; it reads "Register Now"):
https://www.providenceday.org/switzerland-2026-ms

- The slug says 2026, but the trip runs June 5–11, 2027, in school year 2026–27.
- Open to "Current 6-8 grade students".
- Group size: at least 10, at most 14, with a waitlist after that.
- Cities: Zurich, Geneva, Bern and Winterthur.
- Visits: CERN ("pending availability"), the Swiss Science Center Technorama, the Patek
  Philippe Museum, the Bern Historical Museum (Einstein) and Lindt.
- Lodging is in hotels, so there is no homestay.
- The deadline table matches the Upper School pages entry for entry.
- The terms match too: Envoys, two PD study tour leaders, emergency medical and evacuation
  insurance, and limited aid toward one trip.

The verbatim text is in the source file listed below.

**Current state of the file** (as of `96b72b4e`):

- **`trips.years[0]`** is `2026–27`, noted "planned for summer 2027". It holds Japan, Iceland
  and France, all `div: 'US'` with `group: 'grades 9–11'` and no `timing`.
- The ledger has **18** trips in total: Upper School 15, Middle School 3.
- **`start.divisions[1]`** (Middle School) has a first item, `**First trips abroad:** Greece
  (summer 2024), the Galápagos (2024–25), a Round Square conference in England (2024–25)`.
- **`signup.intro.muted`** says "The three published 2027 trips are Upper School only, for
  students in grades 9–11 when they register." It also says "Japan and Iceland take 10 to 16
  students and France 8 to 14".
- Five Global Trips events take their dates from the trip pages: Nov 2, Nov 19, Dec 1,
  Jan 25 and Feb 1. Each has `audience: 'Upper School · grades 9–11'`.
- **`verdict.ask`** has 9 entries. "Starting grade." asks whether Middle School trips are open
  to 6th graders. "Middle School trips." asks which Middle School trips run in 2026–27,
  "The published 2027 trip pages are all Upper School". The Switzerland page answers both.
- The `TRIP_*_27` URL constants sit at the top of the file, and each 2027 trip is cited in
  `trips.sources`, `signup.sources` and `verdict.sources`.

## Decisions

- **Append Switzerland as the fourth row of the `2026–27` group**, after France. The existing
  rows are not in date order, so appending changes no convention.
- **The row**, written into step 3 verbatim:
  - `dest: 'Switzerland'`;
  - `place` is the cities plus the quoted title, like the Japan, Iceland and France rows;
  - `div: 'MS'`;
  - `group: 'grades 6–8'`, the grade band, as the other 2027 rows use;
  - `theme` gives the science focus;
  - no `timing` and no `homestay`.
- **Keep the title's own punctuation:** `"Explorers of the Invisible: Physics, Peace, & Swiss
  Precision"`. It is a title, so the README's quote rule applies. The page uses a straight
  apostrophe nowhere in the title, so no curly-quote question arises.
- **CERN is described in the theme, not promised.** The page says the visit is "pending
  availability", so the theme says "a planned CERN visit", not "a CERN visit".
- **The Geneva visit is not described as a visit to the UN or Red Cross.** The page says
  students explore "the outside of" those buildings. The row leaves them out rather than
  carry that qualifier.
- **Signing Up's five trip-page events change audience to `'Middle & Upper School · grades
  6–11'`.** The Switzerland page lists the same five dates, so they now apply to both
  divisions.
  - The two calendar events keep `grades 6–12` as they are.
  - **Two events are added back: the financial-aid award rows** (user decision,
    2026-10-18, reversing the pdtrips2027 review). The Switzerland page and all three Upper
    School pages publish them, so they carry the same widened audience. The column goes from
    7 events to 9.
- **Ask the School goes from 9 to 8.**
  - **Delete "Starting grade."** Its question was whether Middle School trips are open to 6th
    graders, and the page says grades 6–8. There is no Lower School travel, so the earliest
    grade is no longer an open question.
  - **Reword "Middle School trips."** It now asks whether Switzerland is the only Middle School
    trip, and about the Middle School Round Square conference.
  - The headline's topic list becomes "Middle School trips, aid, selection and safety".
  - "Safety." still holds. Each 2027 page names two PD study tour leaders, Envoys and the
    insurance, so it is unchanged.
- **The stat tiles do not change.** `~19 countries & territories` is scoped to 2021–25, so
  Switzerland does not belong in it. It is a planned trip, not a past one.
- **No photo change.** The page's images are destination stock photos.
- **No new chrome keys.** All new text is research prose. The filter counts are computed, so
  19, 15 and 4 need no catalog change.
- **Keep a 2026–27 cross-check in the source file.** Every other `-ms` slug tried on
  2026-10-18 returned 404. If more Middle School trip pages appear, adding them is a
  follow-up, not part of this plan.

## Approvals needed

**None.** This is data enrichment of cards that already exist: one new ledger row and
revised prose. There is no new card, section, stat tile, field, tag type, Compare row or
component change. `npm run deploy` is **not** part of this plan.

## Source material

- `source-material/international-travel/providence-day/Providence Day - International Travel - 2027 Switzerland Middle School Trip.md`
  - Written while planning, on 2026-10-18, and **uncommitted**.
  - It contains a summary table (dates, cost as written, leaders, eligibility, group size).
  - It contains notes for the implementer.
  - It contains the verbatim page text.
  - The cost, dates and leaders are kept there and nowhere on the page.

## Out of scope

- Any other Middle School 2026–27 trip. None is published.
- Cost, exact dates or leader names on the page.
- Re-ordering the 2026–27 rows.
- The stat strip, Compare, other schools, and `npm run deploy`.

## Steps

### Phase 1 — English

1. **Branch, commit and ingest the source file.**
   - Branch: `git checkout main && git pull && git checkout -b feat/pdswitzerland`.
   - Commit the source file above, staging it by its explicit path.
   - Run the `ingest-source-material` skill for `international-travel`, the same way
     pdtrips2027 step 1 did:
     - `python .claude/skills/ingest-source-material/build_docs.py international-travel`
     - `python scripts/build_site_content.py`
     - `node scripts/check_metrics.mjs`
   - `check_metrics` must stay clean. The catch-all `international-travel` rule maps any
     subtopic.
   - Commit **only** the ingest output for this topic. Check `git status --short` first,
     because a full rebuild can sweep in other topics.

2. **Add the citations to the Source URLs file.**
   - The file is `source-material/international-travel/providence-day/Providence Day - International Travel - Source URLs.md`.
   - Add a section headed "2027 Switzerland Middle School trip (fetched 2026-10-18)", after
     the "2027 Global Trips" section.
   - Map each new fact to the page URL, and to the card it lands in.
   - Note that the deadline table matches the three Upper School pages.

3. **Edit the ledger, in `src/data/internationalTravel/providence-day.ts`.**
   - Next to `TRIP_FRANCE_27`, add:
     ```ts
     const TRIP_SWITZERLAND_27 = 'https://www.providenceday.org/switzerland-2026-ms'
     ```
     Change the comment above the constants to: `// The four summer 2027 trips (three Upper
     School, one Middle School). The slugs say 2026, but the trips run in summer 2027
     (school year 2026–27).`
   - Append this row to `trips.years[0].trips`, after France:
     ```ts
     {
       dest: 'Switzerland',
       place: 'Zurich, Geneva, Bern + Winterthur — "Explorers of the Invisible: Physics, Peace, & Swiss Precision"',
       div: 'MS',
       group: 'grades 6–8',
       theme: 'Physics, engineering and design thinking · a planned CERN visit, Technorama · Einstein',
     },
     ```
   - Change `trips.headline` to:
     `'Nineteen trips abroad across the 2022–23 to 2026–27 school years — including four trips planned for summer 2027, three in Upper School and one in Middle School — from Round Square conferences and service projects to language-immersion trips with host-family stays and science expeditions. Filter by division.'`
   - Leave `trips.intro` unchanged. The range "2 to 16 students" still holds, and the muted
     line already mentions summer Middle School trips.
   - Add to `trips.sources`, after the France entry:
     `{ label: 'providenceday.org — Switzerland trip, 2027', url: TRIP_SWITZERLAND_27 },`

4. **Edit When Your Child Can Start, `start` in the same file.**
   - In `divisions[1].items[0]`, append the Switzerland trip:
     `'**First trips abroad:** Greece (summer 2024), the Galápagos (2024–25), a Round Square conference in England (2024–25), and Switzerland, planned for summer 2027'`
   - Add `{ label: 'providenceday.org — Switzerland trip, 2027', url: TRIP_SWITZERLAND_27 },`
     to `start.sources`, after the Middle School Global Education entry.

5. **Edit Signing Up, `signup` in the same file.**
   - Leave `headline` unchanged.
   - In `intro.muted`, replace only these two sentences, using the exact text given:
     - `The three published 2027 trips are Upper School only, for students in grades 9–11 when they register.`
       →
       `Of the four published 2027 trips, Japan, Iceland and France are for students in grades 9–11 when they register, and Switzerland is for grades 6–8.`
     - `Japan and Iceland take 10 to 16 students and France 8 to 14, with a waitlist after that.`
       →
       `Japan and Iceland take 10 to 16 students, Switzerland 10 to 14 and France 8 to 14, with a waitlist after that.`
   - In `groups[0].events`, set `audience` to `'Middle & Upper School · grades 6–11'` on the
     five trip-page events: Nov 2, Nov 19, Dec 1, Jan 25 and Feb 1. Leave the two calendar
     events as they are.
   - Insert two events directly after the `November 2, 2026` event, before
     `November 19, 2026`, in this order. Give each the same audience and **no `detail`**.
     The names are the ones pdtrips2027 originally shipped:
     ```ts
     {
       when: 'November 13, 2026',
       name: 'Financial aid award letters sent',
       audience: 'Middle & Upper School · grades 6–11',
     },
     {
       when: 'November 16, 2026',
       name: 'Financial aid award decisions due',
       audience: 'Middle & Upper School · grades 6–11',
     },
     ```
     Event `name` is the React key in `SignupBody`, and both names are unique in the column.
     The column now has **9 events**, in date order.
   - Leave `signup.headline` unchanged. It already says "registration … opens October 16
     and closes November 2". Do not add "aid decisions in mid-November" back to it.
   - Add the `TRIP_SWITZERLAND_27` entry to `signup.sources`, after France.

6. **Edit the Verdict, `verdict` in the same file.**
   - Change `headline` to:
     `"Where the program stands out, and eight questions the school's website doesn't answer yet — Middle School trips, aid, selection and safety."`
   - In `ask`:
     - **Delete** the `Starting grade.` entry.
     - Change the `Middle School trips.` question to:
       `'Switzerland is the only Middle School trip published for summer 2027. Are other Middle School trips or a Middle School Round Square conference planned for 2026–27?'`
     - Leave the other seven entries unchanged, for 8 in all.
   - Add the `TRIP_SWITZERLAND_27` entry to `verdict.sources`, after France.

7. **Check for leaks.** Each grep has an allowed result:
   - `grep -n '\$' src/data/internationalTravel/providence-day.ts` should find no new hits.
   - `grep -n 'June\|Santo\|Field' src/data/internationalTravel/providence-day.ts` should find
     no trip date or leader name.
   - `grep -in "not stated\|not published" src/data/internationalTravel/providence-day.ts`
     should hit only inside `verdict`.

8. **Regenerate and check.**
   - Run `npm run schema && npm run check:schema`.
   - Run `npx tsc -b`.
   - Run `npm run build`. `check:live` fails until Phase 2, as it did for pdtrips2027,
     because the edited English no longer matches its shipped translations. The Vite build
     and the prerender must still complete.

9. **Commit Phase 1** on `feat/pdswitzerland`.
   - Stage explicit paths only. Push, then compare `git rev-parse HEAD` with
     `git ls-remote origin feat/pdswitzerland`.
   - Set this plan's status to `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review. No PR is opened in
Phase 1**, the same as pdtrips2027. Tell the user how to look at it: `npm run dev`, then
`/school/providence-day/`. Point them to:

- Where They Go, filtered to Middle School: 4 trips, with Switzerland in the 2026–27 group.
- When Your Child Can Start.
- Signing Up.
- The Verdict.

Ask them to check at desktop width and at 390px, with every card open. Phase 2 waits until
they confirm the wording.

### Phase 2 — Every other locale

This phase covers research prose only. There are no chrome keys. The locales are those in
`PROSE_TRANSLATED` in `src/lib/i18n.ts`: currently `es bn ht te fr fa it hi ar`. Re-read the
list first, because it can grow.

1. **Splice the work files; never re-extract them.** For each locale, run
   `node scripts/i18n_splice_work.mjs --lang <code> --topic international-travel`.
   - Expect roughly 7 dropped stamps per locale:
     - the trips headline;
     - the Middle School item;
     - the signup intro muted;
     - the audience string (one stamp if it is deduplicated);
     - the verdict headline;
     - the two ask entries.
   - A much larger drop means the extract is misconfigured.
   - The two restored aid rows are **added** entries, not dropped ones. Look for their old
     translations from PR #341 in git history first:
     `git log -p -S 'Financial aid award letters sent' -- src/data/overlays/`
     If their `when`/`name` English is unchanged, reuse those translations and do not
     translate them again. Their `audience` is the new widened string either way.

2. **Translate the added entries for each locale.**
   - Key every translation by `of` stamp or by English text, never by index.
   - Give each agent its own scratch directory.
   - Reuse each locale's existing renderings from its `international-travel.<lang>.json`
     work file: the Japan, Iceland and France rows, "Middle & Upper School · grades 6–12",
     and "planned for summer 2027".
   - Follow the standing rules:
     - Copy figures character for character: `2026–27`, `10 to 14`, `6–11`.
     - Leave quoted trip titles in verbatim English, per the Global Exposure section of
       `src/data/overlays/NOTES.md`.
     - Store no bidi isolates in `fa` or `ar`.
     - Never pre-group numbers for `hi` or `te`.
     - Keep "CERN", "Technorama" and "Einstein" as written.

3. **Build the overlays.** For each locale, run
   `node scripts/i18n_build_overlay.mjs --topic international-travel --lang <code>`.

4. **Update the notes.** Add any new soft spot to the Global Exposure section of
   `src/data/overlays/NOTES.md`. If there is none, say so.

5. **STOP for the user's test, with no PR yet.**
   - Commit and push.
   - Report the check results.
   - Tell the user to run `npm run build && npx vite preview`, then open
     `/school/providence-day/?lang=es` (and `fa`, `ar`).
   - End the turn.

6. **Ship, only after the user confirms.**
   - Open the PR with `--body-file`.
   - Set this plan to `implemented` with the PR number. Set the INDEX row to Implemented.
   - Run `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.
   - **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Verification

### Phase 1 — English

- [ ] `node scripts/check_metrics.mjs` is clean.
- [ ] `npx tsc -b` is clean.
- [ ] `npm run schema && npm run check:schema` pass.
- [ ] `npm run build`: the Vite build and the prerender complete. A `check:live` failure is
      expected until Phase 2.
- [ ] Step 7's greps: no new `$`, no `June` or leader name, and "not published" only in
      `verdict`.
- [ ] **Browser check.** Run `npm run build && npx vite preview` in real Chrome via
      Playwright. Open every `<details>`, and use `domcontentloaded`, not `networkidle`.
  - Where They Go shows "19 trips shown". The Upper School tab shows 15, and the Middle
    School tab shows 4.
  - Switzerland is the fourth 2026–27 row. It is tagged "Middle School · grades 6–8" and has
    no date tag and no homestay tag.
  - The Middle School column of When Your Child Can Start names Switzerland.
  - Signing Up's Global Trips column lists **9 events** in date order, including
    Nov 13 "Financial aid award letters sent" and Nov 16 "Financial aid award decisions
    due". All seven trip-page events read "Middle & Upper School · grades 6–11". The GSD
    column sits beside it at desktop width and wraps cleanly below it at 390px.
  - The Verdict shows 8 questions.
  - The SOURCE rows of the four edited cards each link the Switzerland page.
- [ ] `npm run audit:mobile -- --only providence-day` finds nothing new in Global Exposure.

### Phase 2 — Locales

- [ ] `npm run check:runtime` and `npm run check:live` pass for all 9 locales.
- [ ] For each locale, `python3 scripts/check_figures.py --topic international-travel --lang <code>`
      and `npm run check:sepdrift -- --lang <code>` pass.
- [ ] `npm run check:dates`, `npm run check:fr`, `npm run check:bidi`, `npm run check:fa` and
      `npm run check:hi` pass.
- [ ] For each locale, run `npm run i18n:leaks -- --lang <code>`, then triage the
      `international-travel` section.
- [ ] Scan the 9 work files directly for wrong-language prose, because `check_work_integrity`
      sees only entries already on its base ref.
- [ ] Browser check in `es`, `fa` and `ar`: the Switzerland row, the Signing Up audience and
      the 8 questions all render translated.

## Implementation notes

- **Phase 2:** the work files were updated by stamp with 7 dropped and 13 added per locale, as
  predicted. The two restored financial-aid rows had **no earlier translation to reuse**:
  `git log -S` shows they were dropped at the pdtrips2027 review before that plan's Phase 2
  ran. They were translated fresh.
- **`verdict.headline` is not rendered on the page** in any locale, English included. It was
  translated anyway so the overlay stays complete.
- **`check_work_integrity` reports one "violation" per locale.** It is the entry count moving
  from 1061 to 1067, which that script cannot validate on a splice. No translation was lost
  or overwritten.
- The judgment calls are recorded in the Global Exposure section of
  `src/data/overlays/NOTES.md`.
