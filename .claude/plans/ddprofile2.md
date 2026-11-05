---
name: ddprofile2
title: Use the rest of Davidson Day's 2026–27 School Profile — Sports figures (16 all-state, 8 Class of 2026 collegiate athletes, 200+ athletes, the SouthLake football/baseball partnership, 565 enrollment, NCISAA-verified 200 m title and runners-up), CEEB and two memberships on College Support, the GSD language rule, a confirmed "service not required" on Clubs, the international-research share on Global Exposure, and the short-play showcase on Arts
status: english-done
phases: 2
created: 2026-11-04
branch: feat/dd-profile-rest
prs: []
---

# Use the rest of Davidson Day's 2026–27 School Profile

## Goal

`ddprofile` (PR #421) moved Davidson Day's College Support cards and Compare cells to the
2026–27 School Profile. This plan uses the rest of that PDF: every fact on it that has a
home in a card the app **already has**. Most of it is the page-3 sports sidebar, plus small
additions to College Support, Clubs, Global Exposure and Arts.

The user asked for "the latest testing data and GPA percentiles". **The PDF has neither,
and this plan does not invent a substitute.** Page 1 says *"Due to the popularity of
test-optional policies, we will not be providing the testing profiles for the Class of
2027"*. The GPA distribution is three points only (4.67 / 3.93 / 2.58), and those shipped
in #421. The user was told this on 2026-11-04 and chose "all that fit with … cards we have
for the data".

It is done when each fact below shows on the Davidson Day page in English, each one
traceable to a committed source file, and `npm run build` is green after Phase 2 in all ten
locales.

## Context

### The source

- PDF: `https://resources.finalsite.net/images/v1790855129/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf`
  (4 pp., created 2026-09-29, SHA-1 `9057ebb865e7593f5357e1ecf0929bcea145658e`,
  re-downloaded and re-checked 2026-11-04). It has a text layer, so `pdftotext -layout`
  works. The app already cites it as `PROFILE` in
  `src/data/collegeSupportPrograms/davidson-day.ts`.
- **Full transcription (committed in #421):**
  `source-material/college-support/davidson-day/Davidson Day - College Support - School Profile 2026-2027.md`.
  Its "Page 3" section holds every non-sports fact this plan uses, verbatim.
- **Sports excerpt (written during planning, uncommitted):**
  `source-material/sports/davidson-day/Davidson Day - Sports - School Profile 2026-2027.md`.
  It holds the sidebar figures, the varsity list and a claim-by-claim comparison against
  `sportsPrograms/davidson-day.ts`. **Read it before step 3.**

### Where each fact lands (all existing cards; confirmed by reading the files)

| Fact (profile page) | File · field | Today |
|---|---|---|
| Total enrollment **565** (p.2) | `sportsPrograms/davidson-day.ts`: header comment (line ~9), `pipeline.headline`, `honors.subhead` | "~550-student", "a 550-student school", "about 550 students" |
| **16** NCISAA all-state selections, 2025–26 (p.3) | `sportsPrograms/davidson-day.ts` · `honors.honors[]` "All-state selections" `.text` | "More than 150 … all-time. Seven Patriots earned spring 2026 all-state honors…" |
| **8** collegiate athletes, Class of 2026 (p.3) | `sportsPrograms/davidson-day.ts` · `pipeline.funnelNote` and `pipeline.rosterNote` | both say the school published no 2026 list; roster names 2 for '26 |
| **200+** student athletes, MS & US (p.3) | `sportsPrograms/davidson-day.ts` · `offered.subhead` | "~90% of grades 5–12" tile; no headcount |
| Football and baseball **in partnership with SouthLake Christian Academy** (p.3) | `sportsPrograms/davidson-day.ts` · `offered.footnote` | not mentioned anywhere in `src/data` |
| Individual NCISAA **200 m** title, 2025–26 (p.3) | `sportsPrograms/davidson-day.ts` · `honors.honors[]` "Individual state champions" `.text` | "37 individual state championships", no years. **Verify first** |
| **5** NCISAA state runners-up, 2025–26 (p.3) | `sportsPrograms/davidson-day.ts` · `honors.honors[]` "Team state championships" `.text` | the Cup ledger has 2 team runner-ups for 2025–26. **Verify first** |
| CEEB **340-971** (p.3) | `collegeSupportPrograms/davidson-day.ts` · `counseling.reach[]`, the line `'Scoir · a current, publicly linked 4-page School Profile · NCAA eligibility resources'` (line ~593) | no CEEB. Cannon (`cannon.ts:635`) and Charlotte Christian (`charlotte-christian.ts:566`) carry theirs on this same line |
| Memberships add **SACS** and **ERB** (p.1) | `collegeSupportPrograms/davidson-day.ts` · `edge.levers[…].items[]` "**Integrity signalling**" (line ~688) | "NACAC, SACAC and ACCIS, alongside NAIS, SAIS, NCAIS, NCISAA and College Board" |
| GSD requires **the same world language in all four Upper School years** (p.3) | `collegeSupportPrograms/davidson-day.ts` · `edge` "**Global Studies Diploma**" item (line ~676) | "a language requirement" |
| "**Service is encouraged, but not required.**" (p.3) | `clubsPrograms/davidson-day.ts` · `service` flag at line ~94 | "no school-wide service-hours requirement is published anywhere" |
| "**Over a quarter** of Davidson Day School students participate in international research." (p.3) | `internationalTravel/davidson-day.ts` · `lead.muted` | no participation share |
| **Student Written and Directed Short Play Showcase** (p.3) | `artsPrograms/davidson-day.ts` · `enrichment[]` "Improv & Musical Review" `.text` | Improv Comedy show and Musical Review only |
| "Recent Blumey nominations for **Best Show** and Best Featured Performers" (p.3) | `artsPrograms/davidson-day.ts` · `ledger[]` | Best Featured Performer is there (2023, 2026). **No Best Show** in any row. **Verify first** |

### Profile facts with NO existing home (not built; reported to the user)

- **Fast facts:** 6:1 student–faculty ratio (was 7:1), average Upper School class size 12
  (was 13), 30 Upper School teaching faculty. No card or Compare row holds a student–faculty
  ratio or class size for any school. A grep of `src/data` for `7:1` finds only the
  After School before-care staffing ratio, which is a different fact and stays.
- **Graduation requirements:** 21 credits (was 22.5), English 4, World Language 2, plus the
  note that Class of 2027 transcripts may show work under the old rules. Nothing in
  `src/data` prints Davidson Day's requirements (no `22.5` anywhere), and no card type has
  a requirements field.
- **3 Davidson Day records broken:** the profile does not say which records.

Each of the first two would be a new stat tile or card, which needs UX approval. They stay
in source-material.

### Why two phases

Every edit is English research prose reached by the overlay layer (`sports`,
`college-support`, `student-clubs`, `international-travel`, `the-arts` topics in
`scripts/i18n_topics.mjs`). No `src/locales/*.json` chrome changes. No Compare cell
changes, so `metric-values` is untouched.

## Decisions

- **No testing or percentile work.** The profile withholds both by the school's choice.
  The existing `wholeClass` card already reports that, quoting the Class of 2027 sentence
  (shipped in #421). Nothing to change.
- **Only facts with an existing card.** The user's scope (2026-11-04). Fast facts and
  graduation requirements are reported as suggestions, not built.
- **Verify-or-omit for the three title-type claims**: the 200 m title, the 5 runners-up and
  the Best Show nomination. The school's own title list has over-claimed before (memory
  `school-title-lists-can-overclaim`), and the association (NCISAA, Blumenthal Arts) is the
  authority for its own results. Each claim ships only when the association's published
  record confirms it. When it doesn't, the claim is recorded in source-material as
  unconfirmed and left off the page. **Never ship the school's count as a bare figure that
  the ledger contradicts.**
- **The 200 m champion is not named on the page.** "An individual 200 m title" says what
  the honor card needs. The pipeline names athletes because their commitments are
  published news; this card does not need the name. No gender is inferred from the name
  either: write "the 200 meters", unless the NCISAA result states the division.
- **The 8 Class of 2026 collegiate athletes is a school-stated count, not a roster.** It
  goes into the funnel and roster notes as the school's figure. The funnel tiles
  (10 / 9 / 3) and the Compare commits rows stay documented-and-named floors. Two of the
  eight are named today (Stevens, Peck). "Collegiate" is not "Division I", so it moves no
  D1 or P4 figure.
- **565 is total enrollment, age 2 through grade 12.** It replaces "550" wherever that
  figure describes the whole school. Write "about 565" in the honors subhead and "a
  565-student school" in the pipeline headline.
- **AFAR start-year discrepancy: no change.** The profile dates Belize to 2009, and College
  Support's edge item already says "Belize (since 2009)". Global Exposure dates AFAR at
  Cahal Pech to 2006 ("20 seasons"), from the school's AFAR pages. Both are school
  statements of different things (the program vs this school's involvement are not
  separable from the sources). Global Exposure has its own sourcing record, so it is left
  alone. Record the discrepancy in the implementation notes, not on the page.
- **Non-sports facts trace to the existing College Support transcription.** That committed
  file already holds them verbatim, with the URL. A second copy per topic folder would
  duplicate it and add three ingest subtopics for no gain. Only Sports gets its own file,
  because it carries a claim-by-claim comparison and verification results that belong
  with the Sports research.
- **Varsity roster differences are not edited.** The profile lists Crew (B,G) and no
  Indoor Track; the app lists Rowing (Co-ed) and Indoor Track & Field from the school's
  Patriot Teams page. That page is the authority for the season board, which is a
  different list from a profile summary.

## Approvals needed

**None.** Every edit changes text or a ledger row inside existing cards. No card, tile,
section, Compare row, metric key or component changes. That is data enrichment under the
UX-design standard. The two facts that *would* need approval (fast facts, graduation
requirements) are deliberately out of scope.

## Source material

- **Written during planning (uncommitted):**
  `source-material/sports/davidson-day/Davidson Day - Sports - School Profile 2026-2027.md`.
- **Already committed (#421):** the College Support transcription named above.
- **To append during `/implement` (step 2):** the verification results for the 200 m title,
  the runners-up and the Best Show nomination. Append them as a "## Verification
  (2026-MM-DD)" section to the Sports file. Put the Blumey result in a new short file,
  `source-material/the-arts/davidson-day/Davidson Day - The Arts - Blumey Verification 2026.md`,
  with source URLs, only if step 2 fetches Blumenthal pages.
- `/implement` runs **`ingest-source-material`** for `sports/davidson-day` (and
  `the-arts/davidson-day` if that file was written). Sports and Arts render from typed
  data files, not ingested prose. Each new file's headings must still fold onto an existing
  key, with no new ⚠️ from `npm run check:metrics`. If they slugify into orphan keys, add
  `school profile|blumey verification` to the leading `redesign-research` rule's regex in
  the relevant `src/lib/metrics.ts` block (sports block at line ~265). **Do not add a
  card.** If `hgprofile` has merged first, its sports rule may already cover
  `school profile`, so check before editing.

## Out of scope

- Testing data and GPA percentiles: not in the PDF (see Goal).
- Fast facts (6:1, class size 12, 30 faculty) and graduation requirements: no home.
  Suggested to the user as a possible UX addition.
- The Wells Fargo Cup ledger and card. A verified runner-up that would change Cup points is
  reported, not edited. The ledger's `check:cup` gate and its own skill own that.
- The Compare page: no cell changes.
- The `wholeClass`, `transcript`, `outcomes` and `counseling` headline figures: shipped in #421.
- Global Exposure trips, milestones and the AFAR year discrepancy.
- Deploying. This plan never runs `npm run deploy`.

## Steps

### Phase 1 — English

1. **Branch and stage.** From an up-to-date `main`: `git checkout -b feat/dd-profile-rest`.
   Commit the Sports source file with an explicit path (never `git add -A`; the tree is
   shared and holds other sessions' untracked files).

2. **Verify the three title-type claims** before writing any of them. Use the NCISAA
   archive (memory `ncisaa-results-archive`) and Blumenthal Arts' own pages.
   - **200 m title:** `https://archives.ncisaa.org/index.php?sport=22&years=2025-2026`.
     The page links out to result files (PDFs on `admin.ncisaa.org` or a timing site).
     Find the 2026 state meet 200 m final and confirm a Davidson Day winner, noting the
     division. Confirmed → step 3 uses it. Not confirmable → omit it.
   - **5 runners-up:** the Cup ledger in `src/data/wellsFargoCup.ts` and the Davidson Day
     `cup.pointSources` show 2 team runner-ups for 2025–26 (volleyball 2025, girls
     lacrosse 2026). Check the 2025–26 brackets and result files for the other three
     (individual events, a relay, swimming or golf). Ship the figure only if five
     reconcile. Otherwise omit it, and record what was found.
   - **Best Show Blumey:** search Blumenthal Arts' nominee pages and lists for 2024 and
     2025 ("Best Musical" / "Best Show" category). The app has no 2024 ledger row, and its
     2025 row says the all-nominees PDF could not be text-extracted. If confirmed: amend or
     add the ledger row (`year`, `show`, `result`) and its source. Not confirmed: no
     page change.
   - Append the results, with URLs, to the source-material files (Source material above).

3. **Sports — `src/data/sportsPrograms/davidson-day.ts`.**
   - File header comment (line ~9): "~550-student" → "~565-student (2026–27 School
     Profile)".
   - `pipeline.headline`: "…for a 550-student school." → "…for a 565-student school."
   - `pipeline.funnelNote`: replace "no equivalent for 2024 or 2026" with: the school
     published no named list for 2024 or 2026, though its 2026–27 School Profile counts 8
     collegiate athletes in the Class of 2026, two of whom are documented here. Keep the
     rest of the note.
   - `pipeline.rosterNote`: append "The school's 2026–27 profile counts 8 collegiate
     athletes in the Class of 2026 without naming them."
   - `pipeline.sources`: add `{ label: 'School Profile 2026–27 (Class of 2026 collegiate
     athletes)', url: PROFILE }`. Declare `const PROFILE =` with the PDF URL beside the
     other URL constants at the top (lines ~33–40).
   - `honors.subhead`: "about 550 students" → "about 565 students".
   - `honors.honors` "All-state selections" `.text`: append "The school's 2026–27 profile
     counts 16 NCISAA all-state selections across 2025–26."
   - `honors.honors` "Individual state champions": **only if step 2 confirmed it**, append
     "In 2025–26 the school added an individual state title in the 200 meters." Leave the
     37 alone unless the source behind it shows whether 2026 is included. Say which in the
     implementation notes.
   - `honors.honors` "Team state championships": **only if step 2 reconciled five**, append
     the runner-up sentence, naming the sports.
   - `honors.sources`: add `{ label: 'School Profile 2026–27 (2025–26 Patriots Review)', url:
     PROFILE }`, plus any NCISAA result URL step 2 used.
   - `offered.subhead`: append "— the school counts more than 200 Middle and Upper School
     athletes." Keep the sentence grammatical; re-read it whole.
   - `offered.footnote`: append "Football and baseball are fielded in partnership with
     SouthLake Christian Academy, per the 2026–27 School Profile."
   - `offered.sources`: add the `PROFILE` source.

4. **College Support — `src/data/collegeSupportPrograms/davidson-day.ts`.**
   - `counseling.reach[]` line ~593 →
     `'Scoir · a current, publicly linked 4-page School Profile · NCAA eligibility resources · CEEB 340-971'`.
     The CEEB is printed with its hyphen, as on the profile.
   - `edge` "**Integrity signalling**" item → "…NACAC, SACAC and ACCIS, alongside SACS,
     SAIS, NAIS, NCAIS, NCISAA, the Educational Records Bureau (ERB) and College Board."
   - `edge` "**Global Studies Diploma**" item: "a language requirement" → "the same world
     language in all four Upper School years". Keep the rest.
   - The existing `edge.sources` entry `'School Profile 2026–27 (AFAR, Honor Code,
     memberships)'` already covers both. Add "GSD" to its label.

5. **Clubs — `src/data/clubsPrograms/davidson-day.ts`.** In the `service` flag at line ~94,
   replace "and no school-wide service-hours requirement is published anywhere" with "and
   the school's 2026–27 profile states plainly that “Service is encouraged, but not
   required.”" Add the `PROFILE` URL to the card's `sources`, declaring the constant if the
   file has none.

6. **Global Exposure — `src/data/internationalTravel/davidson-day.ts`.** Append to
   `lead.muted`: "The school's 2026–27 profile says over a quarter of its students take part
   in international research." Add `{ label: 'davidsonday.org — School Profile 2026–27',
   url: <PDF> }` to the sources of the card that renders `lead`. Find it by reading the
   type in `src/data/internationalTravel.ts`; if `lead` has no sources slot, use the first
   card's.

7. **Arts — `src/data/artsPrograms/davidson-day.ts`.** `enrichment` "Improv & Musical Review"
   `.text`: "…an Improv Comedy show, a Musical Review, a Student Written and Directed Short
   Play Showcase, and collaborations…". Add the profile to that card's sources. Apply the
   step-2 Blumey result if one was confirmed.

8. **Ingest and checks.** Run `ingest-source-material` (Source material above), then
   `npm run check:metrics` (no new ⚠️) and `npm run schema`. Expect no schema change; if
   one appears, explain it before keeping it.

9. **Schema-doc check.** No new rule is expected. Say so explicitly in the report.

**→ STOP. `/implement` commits Phase 1, sets `status: english-done` and the index row to
*English shipped*, and ends its turn for the user's review.** Nothing below runs until the
user confirms the English.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on the
overlay topics this plan touched: `sports`, `college-support`, `student-clubs`,
`international-travel`, `the-arts`. **No chrome catalogs.** The mechanism is in
`.claude/docs/prose-translation-architecture.md`. The proven recipe is `ddprofile`'s Phase 2
(see its implementation notes and memory `ddprofile-shipped`):

1. **Splice by stamp:** `node scripts/i18n_splice_work.mjs --lang <code> --topic <topic>`
   for each locale × topic. Dry-run one locale first and explain the added/dropped counts
   before writing.
2. **Carry figure-only edits mechanically, translate the rest.**
   - Pair each new stamp with the dropped stamp at the same `at` path. Where only figure
     tokens differ (550 → 565), substitute into each locale's existing `t` and assert the
     replacement count.
   - Translate the reworded units by hand, reusing each locale's existing terms.
   - Figures are copied char-for-char (`565`, `16`, `8`, `200`, `340-971`).
   - Keep these in Latin script: SouthLake Christian Academy, SACS, ERB, NCISAA, AFAR, CEEB.
   - Verbatim quotes ("Service is encouraged, but not required.") follow each locale's
     habit: es/fr/it/hi keep English; bn/ht/te/fa/ar translate.
2a. **Correct the 2026 Blumey finalists (added 2026-11-05 at the user's request; do
   this in English FIRST, before step 1's splice, so it is spliced and translated with
   the rest).** The Phase 1 review found, and a real-Chrome read confirmed, that
   Blumenthal's 2026 page lists **five** Davidson Day *Big Fish* finalists. The app says
   three. Record: `source-material/the-arts/davidson-day/Davidson Day - The Arts - Blumey
   Verification 2026.md`, the "2026 finalists" section. The four rendered strings in
   `src/data/artsPrograms/davidson-day.ts`:
   - `theatre.headline` (line ~119): "…nominations in 2023, three finalists in 2026." →
     "…nominations in 2023, five finalists in 2026."
   - photo caption (line ~128): "…which produced three finalist placements." →
     "…which produced five finalist placements."
   - `ledger[]` 2026 `result` (line ~147) →
     `'Five finalists: Best Actor (Lukas Paeper as Edward Bloom), Best Actress (Malena Lessa as Sandra Bloom), Best Supporting Actor (Noah Larsen as Will Bloom), Best Supporting Actress (Katelyn Ray as Witch), Best Featured Performer (Elizabeth Robinson as Giant, also a nominee). No win recorded.'`
   - the item at line ~307: "…2026 Big Fish produced three finalists across Best Actor,
     Best Supporting Actress and Best Featured Performer." → "…2026 Big Fish produced five
     finalists across Best Actor, Best Actress, Best Supporting Actor, Best Supporting
     Actress and Best Featured Performer."
   - Also the header comment (lines ~17–18, "three finalists" → "five finalists"). It is not
     rendered.
   Names and roles are copied char-for-char from the Blumenthal page, and the category
   names follow the existing row's style. Do not write "nominee" for Paeper or Lessa: their
   categories' nominees were announced separately and are not established. This is a
   factual correction from the source, so it needs no separate wording review. It adds
   4 the-arts units per locale, giving **20 units per locale** in total (the-arts 5). Re-run
   `ingest-source-material` for `the-arts` (the Blumey file changed), restore the
   manifest order and the stamp-only notes, and browser-check the four strings in English
   before translating.
3. **Rebuild:** `npm run i18n:build -- --topic <topic> --lang <code>` for every pair.
4. Run the Phase 2 checks. Commit with explicit paths, push and verify the remote SHA, then
   open the PR with `--body-file`. Squash-merge, then `git checkout main && git pull`.
   Flip the plan and INDEX row to *Implemented*. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/sports/davidson-day/Davidson Day - Sports - School Profile 2026-2027.md` | new (written during planning); step 2 appends verification |
| `source-material/the-arts/davidson-day/Davidson Day - The Arts - Blumey Verification 2026.md` | new, only if step 2 fetches Blumenthal pages |
| `src/data/sportsPrograms/davidson-day.ts` | enrollment, all-state, Class of 2026 count, 200+, SouthLake, verified titles, sources |
| `src/data/collegeSupportPrograms/davidson-day.ts` | CEEB, memberships, GSD language rule |
| `src/data/clubsPrograms/davidson-day.ts` | "service not required" |
| `src/data/internationalTravel/davidson-day.ts` | international-research share |
| `src/data/artsPrograms/davidson-day.ts` | short-play showcase; Blumey row if verified |
| `src/lib/metrics.ts` | only if ingest produces an orphan key |
| `.claude/docs/*`, `src/data/schools.json` | regenerated by ingest (Davidson Day sports/arts only) |
| `src/data/overlays/work/{sports,college-support,student-clubs,international-travel,the-arts}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/ddprofile2.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory `trust-tsc-b-not-tsc-noemit`).
- [ ] `npm run check:metrics`: no new ⚠️. `npm run check:schema`: clean.
- [ ] `npm run check:cup`: clean (no Cup edits, so this confirms nothing moved).
- [ ] `npm run build`: green apart from `check:live` reporting the changed English units
      as awaiting translation, which is expected in Phase 1. Name the count per topic.
- [ ] `grep -n "550" src/data/sportsPrograms/davidson-day.ts`: no enrollment use left.
- [ ] Browser check (`npm run build && npx vite preview`, `/school/davidson-day`, every
      `<details>` open). Read each edited sentence rendered:
  - Sports: the Offered subhead and footnote, Pipeline notes, and the Honors list items.
  - College Support: the CEEB line and both edge items.
  - Clubs: the service flag.
  - Global Exposure: the lead.
  - Arts: the enrichment item.
  - Every new source link opens the 2026–27 PDF.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: all 9 locales resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted.
      `python3 scripts/check_figures.py --lang <code> --topic <topic>` for each touched topic.
- [ ] `npm run check:dates`, `check:moneytext`, `check:bidi`, `check:fa`, `check:hi`,
      `check:fr`: clean. (`check:money`'s two `SportsProgram.tsx` findings predate this.)
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, filtered to the touched `at` paths: 0.
- [ ] `npm run build`: exit 0.
- [ ] Browser: `/school/davidson-day?lang=es` and `?lang=fa`, every card open. The
      edited sentences render translated, and `565`, `16`, `8`, `340-971` are intact and
      in the right direction in `fa`.

## Risks

| Risk | Mitigation |
|---|---|
| A school-stated title or count contradicts the NCISAA record | Step 2 verify-or-omit. The page never shows an unreconciled count |
| "8 collegiate athletes" is read as 8 Division I commits | Phrase it as the school's count of collegiate athletes, beside the named-floor funnel. No D1/P4 figure moves |
| The new Sports source file slugifies into an orphan prose key | `check:metrics` gates it; fold it onto `redesign-research` in `metrics.ts` |
| Another session's untracked files get swept into the commit | Stage explicit paths and check `git status --short` before each commit |

## Open questions

- **Should the 200 m title name the athlete?** Owner: user, at the Phase 1 review.
  **Default:** no name (Decisions).
- **Do you want the fast facts or graduation requirements added as a new tile or card?**
  Owner: user. **Default:** not in this plan. It would be a UX change, needing approval and
  its own plan.

## Implementation notes

### Phase 1 (2026-11-05)

- **Step 2 verification.** All three title-type claims were checked against the
  associations' own records (full record in the Sports source file's "Verification
  (2026-11-05)" section and the new Arts Blumey file):
  - **200 m title: confirmed.** It was the **girls'** 200 meters, Division 2 final, 25.55
    (Mitchell Timing / MeetPro official results; the NCISAA track archive page links no
    results file). The page says "the girls’ 200 meters"; no athlete is named.
  - **5 runners-up: reconciled**, as 2 team (volleyball fall 2025, girls lacrosse 2026)
    plus 3 individual D2 track 2nd places (girls 100 m, boys shot put, boys discus). This
    went into the "Team state championships" item and names all five. Individual swim and
    tennis results could not be checked; the fit is exact but not proven complete.
  - **Best Show Blumey: not confirmed.** Davidson Day is in no Best Musical tier in 2024, 2025
    or 2026. No Arts ledger change.
  - **The 37 individual championships stay as they are.** The history page gives no years, so
    whether 2026 is in it is unknown. The 2025–26 title is a separate sentence.
- **Deviation: the Clubs service quote.** Clubs `gap` flags are deliberately never
  rendered (`ClubsProgram.tsx` `Flags` shows only `not-a-club`), so step 5's edit alone
  would never reach a reader. The flag edit is kept so the data stays accurate. The same
  quote was also added to the visible Diploma Distinctions Practicum tile `detail`:
  "Outside the distinctions, the school’s 2026–27 profile states that “Service is
  encouraged, but not required.”" That makes **2** student-clubs units, not 1.
- **`metrics.ts`.** The Arts block has no `redesign-research` rule, so the new
  "Blumey Verification 2026" subtopic is folded onto `in-depth-report`, beside
  `^provenance$`. That key is already held by Davidson Day. Sports' "School Profile" was
  already covered by line 273. The schema doc's only changes are document counts and one
  more phrasing on `in-depth-report`.
- **Wording.** The `offered.subhead` addition is its own sentence ("The school counts more
  than 200 Middle and Upper School athletes."), not a dash clause.
- **Manifest.** The two single-topic ingests reordered `schools.json`. It was restored to
  `HEAD` order with the two new documents inserted, and the stamp-only `.claude/docs` notes
  were reverted.
- **AFAR year discrepancy** (profile: Belize since 2009; Global Exposure: Cahal Pech
  since 2006). Left alone, per the plan's decision.
- **A lead not acted on:** Blumenthal's 2026 page appears to list **five** Davidson Day
  *Big Fish* finalists (adding Best Actress, Malena Lessa, and Best Supporting Actor, Noah
  Larsen), where the Arts ledger says three. Confirm in a browser before correcting.
- **Phase 2 workload:** 16 units per locale. sports 9, college-support 3, student-clubs 2,
  international-travel 1, the-arts 1.
