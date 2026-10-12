---
name: pdtrips2027
title: Add Providence Day's three 2027 Upper School global trips (Japan, Iceland, France) to Global Exposure
status: english-done
phases: 2
created: 2026-10-12
branch: feat/pdtrips2027
prs: []
---

# Providence Day — the 2027 global trips

## Goal

Providence Day has published three Upper School trips for June 2027 (Japan, Iceland,
France), each with dates, cost, leaders, grade band, group size and a full registration
timeline. This plan adds them to Providence Day's existing **Global Exposure** section:
- a new **2026–27** year group in the Where They Go ledger;
- the registration-cycle deadlines and the per-trip costs in Signing Up;
- an "Ask on the tour" list trimmed to what is still unanswered.

It works when the ledger shows 18 trips (Upper School 15, Middle School 3), every new fact
cites one of the three trip pages, and no new card, field or tag type appears.

## Context

**The area.** Global Exposure (slug `international-travel`) shipped in PR #338
(`.claude/plans/intltravel.md`). Providence Day is its only school. Its data lives in
`src/data/internationalTravel/providence-day.ts` and its types in
`src/data/internationalTravel.ts`. The renderer is `src/components/InternationalTravel.tsx`.
The data rules are in `src/data/internationalTravel/README.md`; read that before editing.
Two of them matter most here:
- every fact has a live-page URL in the card's `sources`;
- gaps go only to `verdict.ask`.

**The three pages** (verified live 2026-10-12, all marked "Registration Coming Soon"):
- https://www.providenceday.org/japan-2026-us
- https://www.providenceday.org/iceland-2026-us
- https://www.providenceday.org/france-2026-us

The slugs say 2026, but the trips run in May–June 2027 (school year 2026–27). No school
page links to them, and the `-ms` variants 404. So these three are the whole published
2026–27 trip record. The verbatim transcript is the source file listed below.

**What the ledger holds today** (`trips.years`, providence-day.ts:85-209):
- 15 dated trips: 2025–26 (1), 2024–25 (6), 2023–24 (5), 2022–23 (3);
- Upper School 12, Middle School 3.

Japan and Iceland already appear as Upper School rows under 2023–24, and a reciprocal
Montpellier exchange appears under 2022–23. The 2027 trips are **new runs**: they are added
as new rows, and the old ones are left untouched.

**The `Trip` type** (internationalTravel.ts) is
`{ dest, place?, div: 'LS'|'MS'|'US', group?, theme, timing?, homestay? }`. In the UI:
- `group` renders after the division in the `tag-neutral` tag ("Upper School · 6 students");
- `timing` renders as `tag-outline`;
- `homestay` renders as the `tag-accent` "Homestay · {{place}}".

**There is no cost field anywhere in the area, and the plan does not add one.** A new
field or tag would be a UX change that needs approval.

**Where money may go.** Dollar figures must pass through `localizeMoneyText`, or `es`/`fr`
show a raw `$` (`audit:moneyrender`).
- **Localizes money:** `Lead` (every card's `intro.strong` / `intro.muted`), `alsoOnRecord`
  text, and `verdict.ask[].question`. All of these go through `RichText`.
- **Plain text, no localization:** Signing Up's event `name`, `detail`, `when` and
  `audience` (InternationalTravel.tsx:491-503), and the trip tags.

So **every dollar figure goes in `signup.intro`**, never in an event row or a trip tag.

**Signing Up layout.** `.it-split` is a wrapping flex row (index.css:5686), with one
column per `groups[]` entry. Today:
- **Global Trips:** 2 events;
- **Global Studies Diploma:** 2 events.

## Decisions

- **One new year group, `2026–27`, at the top of `trips.years`**, with three Upper School
  rows. Its `note` is `planned for summer 2027`. This is the existing ledger shape: the
  school-year label matches the other groups, and the trips run in the summer that ends
  the 2026–27 year.
- **The group tag carries the grade band, not a head count.** `group: 'grades 9–11'`.
  Other rows' `group` is how many went; for a trip not yet run, that number does not exist.
  The page's "Current 9-11 grade students" means the grade when registering in fall 2026.
  Group size (10–16, or 8–14 for France) goes in the Signing Up intro instead.
- **`timing` carries the exact dates**, US-style with an en dash: `June 4–13, 2027`,
  `June 1–8, 2027` and `May 29 – June 9, 2027`. The school writes hyphens (`June 4-13`).
  The en dash matches every other range in the file, and `check:dates` / the overlays
  translate the month words.
- **France gets `homestay: 'Montpellier'`.** The page says students live with a French host
  family from the sister school for the exchange week. Japan and Iceland are hotels, so they
  get no homestay.
- **The school name keeps the existing spelling.** The France `place` uses "Lycée Notre Dame
  de la Merci" as the 2022–23 row does, not the page's "La Merci". One school must read
  identically in both rows and in the exchanges card.
- **Trip names are quoted.** They are titles, so the README's quote rule applies:
  "Continuity and Change", "A Living Lab for the Planet's Future" and "Layers of History &
  Culture". Use the page's exact wording; Iceland's apostrophe is a curly `’` on the page,
  so write `’` there.
- **Every dollar figure is authored with a thousands comma** (`$5,650`, not the page's
  `$5650`). This is the house money style the formatter is built around; `localizeMoneyText`
  re-renders it per locale. The amounts are unchanged. This is recorded in the Source URLs
  file.
- **The stat tiles do not change.** `~19 countries & territories` is scoped "2021–25" in its
  note, and Japan, Iceland and France are already counted. `8 exchange partners` is
  unaffected.
- **"Ask on the tour" shrinks from 10 questions to 9**, and five questions change:
  - **Cost** is removed. The pages answer it in full: the price, what is included and
    excluded, the deposit, and that PD is not responsible for refunds.
  - **Current trip list** narrows to the Middle School list, since all three published
    trips are Upper School.
  - **Aid**, **Selection** and **Safety** are reworded to ask only what the pages leave
    open. Their questions may state the published fact they build on; the verdict's
    `sources` then cite the trip pages.
- **No photo changes.** The trip pages carry destination photos (stock-style landscapes,
  alt text only). They are not PD student photos, and the existing Seville photo stays.
- **No new chrome keys.** All new text is research prose in `providence-day.ts`. The filter
  counts are computed (`travel.tripsShown_*`), so 18 / 15 / 3 need no catalog change.

## Approvals needed

**None.** This is data enrichment of an existing card set:
- new rows in an existing ledger;
- new events in an existing agenda;
- revised prose.

There is no new card, section, stat tile, field, tag type, Compare row or component change,
so CLAUDE.md's UX gate does not apply.

`npm run deploy` is **not** part of this plan.

## Source material

- `source-material/international-travel/providence-day/Providence Day - International Travel - 2027 Global Trips.md`
  — written while planning (2026-10-12), **uncommitted**.
  - It has a summary table: dates, cost as written, leaders, eligibility and group size.
  - It records the shared terms, the verbatim deadline table and the contact.
  - It has notes for the implementer.
  - It includes the verbatim body text of all three pages.

  This is the record every new fact traces to. `/implement` commits and ingests it in step 1.

## Out of scope

- Middle School 2026–27 trips. None are published, so a parent's question about them stays
  in `verdict.ask`.
- A cost field, cost tag or any new UI to show price per ledger row.
- The trips' destination photos.
- The day-by-day itineraries beyond what fits in `place` / `theme`. The full text stays in
  the source file and in `.claude/docs` after ingest.
- Re-dating or editing the 2023–24 Japan/Iceland rows or the 2022–23 France row.
- The stat strip, Compare, other schools, and `npm run deploy`.

## Steps

### Phase 1 — English

1. **Branch, commit and ingest the source file.**
   - Branch: `git checkout main && git pull && git checkout -b feat/pdtrips2027`.
   - Commit the source file above by explicit path.
   - Run the `ingest-source-material` skill for `international-travel`:
     - `python .claude/skills/ingest-source-material/build_docs.py international-travel`
     - `python scripts/build_site_content.py`
     - `node scripts/check_metrics.mjs`
   - The catch-all `RULES['international-travel']` already maps any subtopic, so
     check_metrics must stay clean.
   - **Commit only what the ingest changed for this topic.** Check `git status --short`,
     because a full rebuild can sweep other topics (see the memory note on full-ingest
     sweeps).

2. **Append the citations to the Source URLs map.**
   - In `source-material/international-travel/providence-day/Providence Day - International Travel - Source URLs.md`,
     add a "2027 Global Trips (fetched 2026-10-12)" section.
   - It maps each new fact to its page URL, marked fetched.
   - Record the `$5650` → `$5,650` house-style note there.

3. **Ledger — `trips` in `src/data/internationalTravel/providence-day.ts`.**
   - Add a URL constant beside the others at the top of the file:
     ```ts
     const TRIP_JAPAN_27 = 'https://www.providenceday.org/japan-2026-us'
     const TRIP_ICELAND_27 = 'https://www.providenceday.org/iceland-2026-us'
     const TRIP_FRANCE_27 = 'https://www.providenceday.org/france-2026-us'
     ```
   - Insert this year group as the **first** entry of `trips.years`:
     ```ts
     {
       year: '2026–27',
       note: 'planned for summer 2027',
       trips: [
         {
           dest: 'Japan',
           place: 'Tokyo, Hiroshima + Miyajima — "Continuity and Change"',
           div: 'US',
           group: 'grades 9–11',
           theme: 'Tradition and reinvention · remembrance and the work of peace',
           timing: 'June 4–13, 2027',
         },
         {
           dest: 'Iceland',
           place: 'Reykjavík, the Golden Circle + the south coast — "A Living Lab for the Planet’s Future"',
           div: 'US',
           group: 'grades 9–11',
           theme: 'Glaciers and a warming world · geothermal energy · the UN SDGs',
           timing: 'June 1–8, 2027',
         },
         {
           dest: 'France',
           place: 'Montpellier (Lycée Notre Dame de la Merci) + Paris — "Layers of History & Culture"',
           div: 'US',
           group: 'grades 9–11',
           theme: 'Exchange week with host families, then Paris · no French required',
           timing: 'May 29 – June 9, 2027',
           homestay: 'Montpellier',
         },
       ],
     },
     ```
   - Edit `trips.headline` to:
     `'Eighteen trips abroad across the 2022–23 to 2026–27 school years — including three Upper School trips planned for June 2027 — from Round Square conferences and service projects to language-immersion trips with host-family stays and science expeditions. Filter by division.'`
   - Edit `trips.intro.strong` to:
     `'Trips run from one-week conferences to summer immersions, with groups of 2 to 16 students.'`
     (16 is the published maximum for Japan and Iceland.) Leave `intro.muted` unchanged.
   - Add to `trips.sources`, after the Upper School entry:
     ```ts
     { label: 'providenceday.org — Japan trip, June 2027', url: TRIP_JAPAN_27 },
     { label: 'providenceday.org — Iceland trip, June 2027', url: TRIP_ICELAND_27 },
     { label: 'providenceday.org — France trip, May–June 2027', url: TRIP_FRANCE_27 },
     ```

4. **Signing Up — `signup` in the same file.**
   - `headline` →
     `'Registration for the June 2027 trips opens October 16 and closes November 2, with a virtual information session in between, aid decisions in mid-November and required orientations for new GSD students.'`
   - `intro.strong` →
     `'Registration for global trips opens October 16, 2026, and closes November 2, when the nonrefundable deposit and any financial aid application are also due.'`
   - `intro.muted` → keep the existing two sentences, then append exactly:
     `' The three published 2027 trips are Upper School only, for students in grades 9–11 when they register: Japan costs $5,650, Iceland $5,450 and France $3,850, each plus a group flight (estimated at $2,700, $1,600 and $1,560). A $1,000 nonrefundable deposit is due at registration, and the balance can be paid in full or in two installments. Japan and Iceland take 10 to 16 students and France 8 to 14, with a waitlist after that. Limited financial aid is available toward one global trip during a student\'s time at Providence Day.'`
     The airfares follow trip order (Japan, Iceland, France). Check them against the
     source file's table, because Iceland ($1,600) and France ($1,560) are close.
   - In `groups[0]` (`title: 'Global Trips'`):
     - Change `note` from `'Fall 2026'` to `'2026–27'`.
     - Keep the two existing events.
     - Append these seven, in this order, each with `audience: 'Upper School · grades 9–11'`
       and **no `detail`**:

       | `when` | `name` |
       |---|---|
       | `November 2, 2026` | `Registration, nonrefundable deposit and financial aid application due` |
       | `November 13, 2026` | `Financial aid award letters sent` |
       | `November 16, 2026` | `Financial aid award decisions due` |
       | `November 19, 2026` | `Trip status letters sent to families` |
       | `December 1, 2026` | `First payment due` |
       | `January 25, 2027` | `PDS travel forms due` |
       | `February 1, 2027` | `Second payment due` |

       Event `name` is the React key in `SignupBody`, and all seven are unique.
   - Leave `groups[1]` (GSD) and `footnote: true` unchanged.
   - Add the three trip constants to `signup.sources`, after the calendar entry.

5. **Verdict — `verdict` in the same file.**
   - `headline` →
     `"Where the program stands out, and nine questions the school's website doesn't answer yet — starting grade, Middle School trips, aid and safety."`
   - In `ask`:
     - **Delete** the `Cost.` entry.
     - Replace `Current trip list.` → topic `'Middle School trips.'`, question:
       `'Which Middle School trips are offered for 2026–27 and summer 2027? The published 2027 trip pages are all Upper School, grades 9–11.'`
     - Replace `Aid.` question:
       `'Trip aid is limited and covers one global trip per student. How much does a typical award cover, and do the endowed funds listed under "Financial Assistance Beyond Tuition" (Murdock, Latchwood, Bhandari Mehta) contribute?'`
     - Replace `Selection.` question:
       `'Registrations go to a Global Education Travel Committee for review. When a trip is oversubscribed, how are places decided? How are Round Square delegates chosen?'`
     - Replace `Safety.` question:
       `'Each 2027 trip has two PD study tour leaders, travel partner Envoys and emergency medical and evacuation insurance. What are the emergency protocols, and who manages medical needs on the trip?'`
     - Leave Starting grade, Jordan, Exchanges, GSD and Scale unchanged. That leaves 9
       entries.
   - Add the three trip constants to `verdict.sources`.

6. **Rules and README.** Run
   `grep -in "not stated\|not published" src/data/internationalTravel/providence-day.ts`.
   Hits are allowed only inside `verdict`. No README change is needed: every rule it states
   still holds.

7. **Regenerate and check.**
   - Run `npm run schema && npm run check:schema`; the ingest may move a doc count.
   - Run `npx tsc -b`.
   - Run `npm run build`.

8. **Commit Phase 1** on `feat/pdtrips2027`.
   - Stage explicit paths only: `providence-day.ts`, the two source-material files, and
     the ingest outputs for this topic.
   - Push, then verify the push with `git rev-parse HEAD` vs
     `git ls-remote origin feat/pdtrips2027`.
   - Set this plan to `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review. No PR is opened
in Phase 1** — the user tests first (their instruction, 2026-10-12). Tell them how to run it
(`npm run dev`, `/school/providence-day/`). Show the user
Providence Day's Where They Go (filter to Upper School: 15 trips, with the 2026–27 group on
top), Signing Up, and Verdict, at desktop and 390px with every card open. Nothing below runs
until they confirm the wording.

### Phase 2 — Every other locale

Research prose only, with **no chrome keys** (Decisions). The scope is the overlay layer for
every locale in `PROSE_TRANSLATED` (`src/lib/i18n.ts`, currently
`es bn ht te fr fa it hi ar`). Re-read the list first; it can grow.

1. **Splice, never re-extract.** For each locale run
   `node scripts/i18n_splice_work.mjs --lang <code> --topic international-travel`. This:
   - keeps every existing translation by stamp;
   - adds the new and changed English as `t: ''`;
   - reports the dropped stamps (the old headlines, intros and ask questions).

   Check that the dropped count matches the strings Phase 1 changed, roughly 10. A larger
   drop means a misconfigured extract.
2. **Translate the added entries per locale.**
   - Key every translation by `of` stamp or by English text, never by index.
   - Run parallel agents with one scratch directory each; parallel locale agents have
     collided before.
   - Reuse each locale's existing renderings for the recurring terms: "Upper School",
     "homestay", the trip-agenda verbs, and Lycée Notre Dame de la Merci. The existing
     `international-travel.<lang>.json` work file is the glossary.
   - **The standing rules:**
     - figures are copied char-for-char: `$5,650`, `$1,000`, `2026–27`, `10 to 16`;
     - dates translate and their digits do not: `November 2, 2026`, `May 29 – June 9, 2027`;
     - quoted trip titles follow the area's precedent (`src/data/overlays/NOTES.md`, Global
       Exposure section): titles in quotes stay verbatim English;
     - `fa`/`ar` store no bidi isolates;
     - `hi`/`te` never pre-group.
3. **Build the overlays.** Run
   `node scripts/i18n_build_overlay.mjs --topic international-travel --lang <code>` for each
   locale.
4. **Notes.** Add any new soft spot to the Global Exposure section of
   `src/data/overlays/NOTES.md`; say "none" if there is none.
5. **STOP for the user's test — no PR yet.** The user asked on 2026-10-12 to test before any
   PR is created.
   - Commit and push the Phase 2 work to `feat/pdtrips2027`.
   - Report the Phase 2 check results.
   - Tell the user how to test: `npm run build && npx vite preview`, then
     `/school/providence-day/?lang=es` (and `fa`, `ar`).
   - **End the turn.** Do not open the PR until the user says their testing passed.
6. **Ship, only after the user confirms.**
   - Open the PR with `--body-file`.
   - Flip this plan to `implemented` with the PR, and the INDEX row to Implemented.
   - Run `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.
   - **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Verification

### Phase 1 — English

- [ ] `node scripts/check_metrics.mjs` — no unmatched `international-travel` subtopic.
- [ ] `npx tsc -b` — clean. Use `-b`, not `--noEmit`.
- [ ] `npm run schema && npm run check:schema`.
- [ ] `npm run build` — succeeds. It chains `check:runtime` and `check:live`. Changed
      English strings simply fall back to English in other locales until Phase 2, and that
      is expected.
- [ ] `grep -n '\$' src/data/internationalTravel/providence-day.ts`. Every `$` hit must be
      inside `signup.intro` or a `verdict.ask` question, never a `when`/`name`/`detail`/
      `audience`/`timing`/`group`.
- [ ] `grep -in "not stated\|not published" src/data/internationalTravel/providence-day.ts`
      — hits only in `verdict`.
- [ ] Every figure in the new copy matches the source file:
  - dates;
  - `$5,650` / `$5,450` / `$3,850`;
  - airfare `$2,700` (Japan) / `$1,600` (Iceland) / `$1,560` (France);
  - `$1,000`;
  - group sizes 10–16 / 8–14.

  **Check the airfare order explicitly.** Iceland is `$1,600` and France `$1,560`.
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright,
      every `<details>` open; use `domcontentloaded`, not `networkidle`):
  - Where They Go reads "18 trips shown". The Upper School tab shows 15 and the Middle
    School tab still shows 3.
  - The 2026–27 group is first, with the "planned for summer 2027" note and three rows.
  - The France row alone carries "Homestay · Montpellier". Each row shows its date tag
    and "Upper School · grades 9–11".
  - Signing Up's Global Trips column lists 9 events in date order. The GSD column sits
    beside it, or wraps cleanly below at 390px.
  - The Verdict shows 9 questions, and the checkboxes toggle.
  - The SOURCE rows of Where They Go, Signing Up and Verdict each link the three trip
    pages.
- [ ] `npm run audit:mobile -- --only providence-day` at 320/360/390 shows no new finding
      in Global Exposure.

### Phase 2 — Locales

- [ ] `npm run check:runtime` and `npm run check:live` — all 9 locales resolve.
- [ ] For each locale, `python3 scripts/check_figures.py --topic international-travel --lang <code>`
      and `npm run check:sepdrift -- --lang <code>` pass.
- [ ] `npm run check:dates`, `npm run check:fr`, `npm run check:bidi`,
      `npm run check:fa`, `npm run check:hi` pass.
- [ ] For each locale, `npm run i18n:leaks -- --lang <code>`. Triage the
      `international-travel` section against the keeps already ledgered in NOTES.md.
- [ ] Wrong-language scan of the 9 work files, done directly.
      `check_work_integrity.mjs` compares against a base ref, so it only sees entries
      present there. Scan each file for foreign-script characters, check the `fa`/`ar`
      Persian-letter split, and spot-read the Latin-script locales.
- [ ] `npm run audit:moneyrender`. **Required here**, because new dollar figures were
      added: no raw `$` in `es`/`fr` Signing Up.
- [ ] `npm run audit:daterender`: no English-form dates in the new agenda rows or trip tags.
      **Note:** `when` and `timing` are extracted, but confirm it on the rendered page.
- [ ] Browser check of Providence Day in `es`, `fa` and `ar`, every card open:
  - the 2026–27 rows and the Signing Up rows are translated;
  - figures read correctly in RTL;
  - `ar` pluralises "18 trips shown" correctly (18 is `many` → `رحلةً`).

## Risks

| Risk | Mitigation |
|---|---|
| A dollar figure placed in an event row ships raw `$` to `es`/`fr` | Decision + Phase 1 `$` grep + Phase 2 `audit:moneyrender` |
| Airfares transposed (Iceland $1,600 vs France $1,560 are close) | Explicit check in Verification against the source file's table |
| The full ingest rebuild sweeps another topic into the commit | Stage explicit paths; review `git status --short` before committing |
| Splice drops more than the ~10 edited strings | Phase 2 step 1 count check; a large drop means a bad extract — stop and investigate |
| The long Global Trips column (9 rows) looks lopsided beside the GSD column (2) | Browser check at desktop and 390px; acceptable as data, report it to the user if it reads badly rather than restyling (a layout change needs approval) |

## Open questions

- **Should the Upper School tab count (15) include trips not yet run?** **Default:** yes.
  The ledger is "trips on the record", and the year note says "planned for summer 2027".
  If the user wants planned trips visually distinct beyond that note, that is a new tag
  variant and needs UX approval.

## Implementation notes

- **Phase 1 review (2026-10-12):** at the user's request, the two financial-aid rows were
  removed from Signing Up's Global Trips column — `November 13, 2026` "Financial aid award
  letters sent" and `November 16, 2026` "Financial aid award decisions due". The column has
  **7 events**, not 9. The November 2 row, which also names the aid application, stays.
- `npm run build` exits 1 at `check:live` throughout Phase 1: the 13 edited English strings
  per locale no longer match their shipped translations. Vite build and prerender complete
  before it; Phase 2's splice clears it.
- **Phase 1 review (2026-10-12):** at the user's request, **all trip costs were removed from
  the page** ("that may be private information") — the per-trip prices, the estimated
  airfares and the `$1,000` deposit amount. `signup.intro.muted` now reads "…grades 9–11
  when they register. A nonrefundable deposit is due at registration, and the balance…".
  No `$` figure remains in `providence-day.ts`, so Phase 2's `audit:moneyrender` step has
  no new figures to check.
