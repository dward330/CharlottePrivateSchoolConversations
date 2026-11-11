---
name: plainsports
title: Plain-language rewrite of the Sports area's English prose across src/data/sportsPrograms/ (12 of 13 schools; 101 worklist units, 79 hook-flagged + 22 at grade 10–12, ~5,990 before-words) plus 6 off-worklist research-bookkeeping units, with every sport, team, league, association, division, record, score, ranking, title, season, coach, college, commitment and athlete name unchanged, the Wells Fargo Cup and Compare commit figures left agreeing, three false cross-school claims fixed in their own commits, and a new `--sports-markers` guard set (incl. a no-name-added-or-removed guard) in plain_review.mjs; English in five reviewed school batches, then all nine prose locales
status: in-progress
phases: 2
batches: 5                     # Phase 1 is built in five batches, each with its own review stop
created: 2026-11-11
branch: feat/plainsports
prs: []
---

# Plain-language rewrite of the Sports area

## Goal

Rewrite the Sports research area's existing English prose to the plain-language standard in
`CLAUDE.md`. The reader is an average parent of an athlete; the target is grade 8–10; no
sentence runs past 30 words.

- **Scope:** `src/data/sportsPrograms/` only (13 files; Charlotte Prep has no worklist unit,
  so 12 change). **101 worklist units** today (79 hook-flagged, 22 at grade 10–12 only), plus
  **6 off-worklist units** that carry research bookkeeping or a shared template (Decisions).
- **Precedent.** This is the seventh per-area follow-up, after plaincollege (#467),
  plainadmissions (#469), plainaid (#471), plainarts (#476), plainclubs (#479) and plainsmall
  (#481). **plainsmall is the model**, with plainclubs and plainarts behind it: the same bar,
  the same review file and guards (`scripts/plain_review.mjs`), the same independent subagent
  review per batch, and the same two-phase English-then-translation process. Every earlier
  plan's Style rulings carry over as precedent.

It worked when:

- **Hook loop:**
  `for f in src/data/sportsPrograms/*.ts; do node scripts/check_plain_language.mjs --file $f; done`
  reports **0 issues** (today: **125 issues** across 12 files).
- **Grade bar.** Every rendered ≥30-word Sports unit that this plan changes is at grade ≤10,
  or appears in "Residual units above grade 10" with its reason.
- **`npm run check:plain`:** sports **Flagged 0** (today 79); every other area unchanged.
- **Nothing a parent compares has changed** (the list in "Content that must survive"): no
  name added or removed, no figure, score, record, ranking, season, date or count re-typed, no
  title/runner-up/semifinal/loss, commit/signed/verbal/offer/enrolled/transferred,
  walk-on/scholarship, published/not-published/not-found or school-claim/third-party marker
  lost or gained. The guards prove the mechanical part (Step 1 adds a name guard); the
  independent reviewer and the user check the rest.
- **The Cup and Compare still agree.** `npm run check:cup` and `check:sportsmatrix` pass, and
  every title year, Cup season and commit count in the rewritten prose matches the ledger
  (`src/data/wellsFargoCup.ts`), the Cup `pointSources`, the pipeline `funnel` and the Compare
  commit rows, exactly as today ("Ledger and Compare agreement").
- **Bookkeeping.** The sports `BOOKKEEPING_RE` sweep (Context) finds no rendered unit.
- **Fact fixes.** The three false cross-school claims ("Cross-school claims") are fixed in
  their own commits and read true against every Sports file.
- **Approvals.** The user has approved the English of all five batches, and an independent
  subagent has checked every before/after pair.
- **Translations.** All nine prose locales carry fresh translations of every rewritten unit,
  and every overlay check is green.

**Two-phase.** Sports prose renders to parents, so Phase 1 is English only and stops for
review, and Phase 2 translates. Phase 1 is split into **five school batches with a review
stop after each**, sized for a ~20-minute review ("Batch plan").

## Context

### The worklist (measured 2026-11-11 at `19f63d0e`)

Generated with
`node scripts/plain_review.mjs --dir src/data/sportsPrograms --worklist <scratch>`: the
hook-flagged units, plus the ≥30-word units at grade 10–12. Sports has no `flags` arrays, so
the plainsmall hidden-flag skip removes nothing here, and no `kind: 'verify'` object exists in
the area.

| School | Units | Hook-flagged | Grade 10–12 only | Long (>30-word sentence) | Grade >12 | Before-words | Max grade | Hook issues |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| providence-day | 10 | 6 | 4 | 5 | 4 | 580 | 16.8 | 10 |
| charlotte-latin | 11 | 9 | 2 | 8 | 6 | 654 | 17.8 | 15 |
| charlotte-christian | 10 | 8 | 2 | 7 | 3 | 556 | 17.8 | 12 |
| charlotte-catholic | 9 | 8 | 1 | 7 | 5 | 553 | 16.4 | 13 |
| charlotte-country-day | 9 | 6 | 3 | 4 | 5 | 533 | 16.0 | 10 |
| cannon | 8 | 7 | 1 | 6 | 4 | 542 | 14.9 | 12 |
| davidson-day | 10 | 8 | 2 | 8 | 3 | 652 | 13.3 | 13 |
| covenant-day | 12 | 10 | 2 | 9 | 7 | 642 | 18.3 | 16 |
| carmel-christian | 9 | 6 | 3 | 5 | 3 | 487 | 20.2 | 8 |
| gaston-day | 7 | 5 | 2 | 5 | 1 | 407 | 14.8 | 8 |
| hickory-grove-christian | 4 | 4 | 0 | 4 | 2 | 214 | 23.7 | 6 |
| trinity-episcopal | 2 | 2 | 0 | 2 | 0 | 168 | 11.8 | 2 |
| charlotte-prep | 0 | — | — | — | — | — | — | 0 |
| **Total** | **101** | **79** | **22** | **70** | **46** | **5,988** | 23.7 | **125** |

(Two units sit at exactly grade 12.0, Latin `offered.footnote` and Christian
`facilities.broadcast`. `check:plain` counts them as Flagged and the hook reports them, so they
are in the hook-flagged column. "Grade >12" counts units strictly above 12.)

`npm run check:plain` today, sports row: prose units **1,307**, Flagged **79**, Jargon **0**,
British **0**, >30-word sentence **70**, Grade >10 **85**, Grade >12 **46**. No Sports unit
uses a jargon-list term, so this plan is about sentence length and grade.

**Worklist sites by path** (`path`: count):

- `coaching.featured[].detail` 12; `pipeline.funnelNote` 11; `pipeline.realityCheck` 11;
  `coaching.worthKnowing` 10; `offered.footnote` 10;
- `pipeline.rankedRecruits` 8; `pipeline.rosterNote` 8; `record.seasonDetail[].text` 8;
  `facilities.careNote` 5; `honors.honors[].text` 4;
- `pipeline.subhead` 3; `record.didNotWin` 3; `national.nil[].text` 2;
  `national.scheduleNote` 2; `facilities.broadcast` 2; `honors.pros[].detail` 1;
  `facilities.care[].text` 1.

No worklist unit is a `headline` (the collapsed-card teaser), a `Cup` field, a roster field, a
stat tile or a source label.

### How each field renders (what a rewrite may contain)

Confirmed in `src/components/SportsProgram.tsx` and `src/pages/SchoolDetail.tsx`.

- **No Sports field renders markdown.** There is no `RichText` in the Sports component. A
  `**` or `*` ships as a literal asterisk. **No worklist unit holds a `*` today.** So every
  batch runs with `--no-md --md-paths '^$'` (guards (o) and (l)).
- **Rendered through `localizeMoneyText`** (money is re-formatted per locale): `Lead`'s
  `subhead`, `offered.footnote`, `pipeline.funnelNote`, `pipeline.rosterNote`,
  `record.didNotWin`, `coaching.worthKnowing`, `facilities.broadcast`, `facilities.careNote`,
  `national.scheduleNote`.
- **Rendered raw** (no money formatting): `pipeline.realityCheck`, `pipeline.rankedRecruits`,
  `record.seasonDetail[].text`, `honors.pros[].detail`, `honors.honors[].text`,
  `coaching.featured[].detail`, `facilities.care[].text`, `national.nil[].text`.
  **Never move a `$` amount into a raw field.** Only one worklist unit holds `$`
  (CCD `facilities.careNote`, `$30.5M` and `$10M`, a `localizeMoneyText` field).
- **Text that follows a chrome label.** Several fields render after a bold `en.json` label,
  so their first words continue it:
  - `record.didNotWin` after "What they didn't win:" (`sports.didntWin`). **Gaston Day's unit
    opens "every other program."**, which completes that label on purpose. Keep it, in
    lowercase.
  - `coaching.worthKnowing` after "Worth knowing:" (`sports.worthKnowing`). Cannon,
    Christian, Covenant, Davidson Day and Providence Day open in lowercase on purpose
    ("the football staff includes…"); Carmel, Catholic, CCD, Latin and Hickory Grove open
    with a capital. **Keep each unit's opening case.**
  - `facilities.broadcast` after "Broadcast & game day:" (`cardLabels.broadcastGameDay`).
  - `record.seasonDetail[].text` after `<strong>{program}:</strong>`, where `program` is a
    non-prose label (a sport, or a season for Davidson Day `[0]` "2023–24" and `[2]`
    "2025–26"). A text may open without a subject ("Made the program's first…") because the
    label is the subject. Never move words into or out of `program` (guard (f); CLAUDE.md
    records why `program` stays a bare label).
- **Panels with chrome headings:** `realityCheck` under "The reality check",
  `rankedRecruits` under "Ranked recruits, current cycle", `seasonDetail` under
  "Season-by-season detail". The headings are chrome and out of scope.
- **Teasers.** The collapsed card shows `localizeMoneyText(headline)` (`SchoolDetail.tsx`
  ~line 1349). No headline is on the worklist.
- **Search.** The pipeline roster search reads only `name`, `sport`, `college` and `conf`
  (non-prose). No prose field is searched.
- **RTL figures.** Ranges and scores ("48–53", "2025–26") are isolated at render for `fa`/`ar`
  (PR #367). Nothing is typed into the English for this.

### What the rewritten text must survive (checks and readers of this prose)

- **The hook** runs after every Edit/Write on `src/data/sportsPrograms/*.ts`. It blocks at
  grade 12, sentences over 30 words, jargon and British spelling.
- **`check:spelling`** (in the build). One worklist unit holds a British form the map lacks:
  Christian `honors.pros[0].detail` "gold **medallist**". The Batch 2 rewrite makes it
  "medalist", and Batch 2's Step 4 then adds `medallist`/`medallists` to the spelling map. It is the only
  occurrence in `src/data` and `en.json` today.
- **`check:cup`** (in the build) reads the ledger, the lib, each school's `cup.pointSources`
  (non-prose) and the typed `cup-*` Compare rows in `metricValues.ts`. It reads no prose, so it
  cannot see a rewrite that contradicts the ledger. "Ledger and Compare agreement" below is
  that check, by hand.
- **`check:sportsmatrix`** (in the build) reads `offered.seasons[].sports[].name` (non-prose).
  Guard (f) protects it.
- **`check:moneytext`** (in the build): keep `$30.5M` and `$10M` exactly, with the punctuation
  after them.
- **`check:dates`** reads extracted strings, in Phase 2 only, but the English date forms must
  survive Phase 1 (guard (g)): `January 2026` (Cannon), `September 2024 through April 2026`
  (Covenant), `Feb. 8` / `Feb. 8, 2024` (Trinity, inside and outside quotes), and `2025–26`
  vs `2026-27` forms.
- **`check:schema`** reads card keys, not prose. No drift is expected.
- **`check:live`** fails during Phase 1, by design (below).
- **`/cup-episode` (`scripts/gen_cup_episode.mjs`)** puts `record.didNotWin`,
  `coaching.featured[].detail` and `coaching.worthKnowing` into an episode PDF, after a name
  gate that fails closed on any roster or pro name. Because no rewrite adds a name, the gate's
  result cannot change. Its override files are path-keyed scratch files, never committed, so
  nothing to update.

### Ledger and Compare agreement (what each rewrite must keep)

Verified 2026-11-11 against `src/data/wellsFargoCup.ts`, each school's `cup.pointSources`
(title years are calendar years of the final) and each `pipeline.funnel`. Every item below
**agrees today**; the rewrite keeps every year, score, count word and the claim's scope, so it
stays agreeing. The guards (b), (g), (m), (n) cover the digits; the reviewer checks the rest.

| Unit | What it states | Agrees with |
|---|---|---|
| DD `record.seasonDetail[0].text` (label "2023–24") | "Seven state titles in one year — boys and girls soccer, volleyball, boys and girls cross country, boys basketball and boys tennis … plus the Wells Fargo Cup for all-sports excellence" | Ledger: DD NCISAA 2A 2023–24, place 1. `pointSources`: volleyball/boys soccer/boys XC/girls XC 2023, boys basketball/girls soccer/boys tennis 2024 = seven. "for all-sports excellence" matches `sports.cup.what1`. Keep "the Wells Fargo Cup" in this unit, tied to that season |
| Gaston `record.didNotWin` | "The 14 titles since 2021 sit in six sports — girls tennis, volleyball, boys soccer, boys golf, boys track and girls swimming" | `pointSources` titles ≥2021 = 14 across exactly those six (boys tennis has runner-ups only) |
| Gaston `record.seasonDetail[0].text` (Girls Tennis) | champions 2021, 2023, 2024, 2025 | girls tennis `titleYears` |
| Gaston `record.seasonDetail[2].text` (Boys Soccer) | titles 2021, 2022, 2024; lost the 2025 final 1–4 | boys soccer T[2021,2022,2024] R[2025]; off-worklist `record.rows[2].note` says the same |
| Covenant `record.seasonDetail[0].text` (Softball) | first state title, 2025–26 | softball T[2026] |
| Covenant `record.seasonDetail[1].text` (Boys Soccer) | finals 2024–25 and 2025–26 | boys soccer R[2024,2025] |
| Carmel `record.didNotWin` | boys basketball finals lost 2021, 2023, 2025; boys soccer 4A finals lost 2021, 2022 | R[2021,2023,2025]; R[2021,2022] |
| Pipeline counts (every `funnelNote`, `realityCheck`, `subhead`) | e.g. Cannon "eight of the twenty-three … five of the twelve Division I"; DD "thirteen of twenty-one"; Carmel "Four of the six"; HG "six of the seven", "Three of the four"; Gaston "Both Division I commits"; Catholic "13 of 54"; Latin "Thirty-four of the 63"; Christian "At 73%" | Each school's `funnel` (Cannon 23/12/4, DD 21/13/5, Carmel 20/6/1, HG 7/4/0, Gaston 3/2/1, Catholic 54/39/15, Latin 63/22/8, Christian 48/35/9, CCD 48/28/9, Covenant 35/10/1, PD 86/39/16), which also feed the Compare commit rows in `metricValues.ts` (out of scope, unchanged) |

**The Class of 2027 rule** ("not counted in the funnel, the sport bars or the Power 4 and
Division I rows until those athletes sign") describes how the Compare rows and the funnel are
built. It stays word-for-word in meaning at all six sites ("Near-repeats", T1).

### Content that must survive every rewrite

This is the list Step 3 applies and the reviewer checks against.

1. **Names exactly as printed.** That covers:
   - **sports, teams and levels** as each school writes them ("Cross Country (B & G)",
     "Girls Golf", "boys basketball", "8th Grade boys' basketball team", V / JV / MS, "Green
     and White squads", "Blue" and "Red");
   - **associations, conferences and divisions:** NCISAA, NCHSAA, CISAA, Queen City
     Conference, "Big South", SAC, MEAC, SEC, Big Ten, ACC, Big 12, Big East, Sun Belt,
     Southern Conference, NESCAC, UAA, ODAC, NCAC, USCAA, NJCAA, NAIA, 1A/2A/3A/4A, NCHSAA 3A,
     Division I/II/III, D1/D2/D3, P4, "Power 4", and Catholic's own "Power Four" (keep each
     school's form);
   - **every athlete, coach, staff member, parent and inductee** (e.g. Hayes Galloway,
     JaKaila Gaskin, Brooke Busby, Jaden Bradley, Reigan Richardson, Haruki Nakamura, Jamaal
     Birch, Barry Giller, Stephen Curry, Reid Fronk, Greg Simmons, C.C. Davis, Calvin Davis
     Jr., Brad Touma, Alvin Pearman, Spear Gorelick, Jack Gilson, Griffin Cheatwood, Aston
     Lee, Davis Jones, Liam McConaughy, Banks Cutter, Hoover, Jerry Faulkner, Caitlin Peters,
     Giavonni Mack, Avery Houseton, David Houseton, Emily Eaton, Michael Marcus Jr, Grant
     Gardner, Chris Rivens, Freace, Aja Teich, Michael Laney, Chad Smith, C.J. Huntley, Gary
     Ellington, Catherine Glass, Brad Laatsch, James Long, Nick Arnold, Cade Tyson, Jaeden
     Mustaf, Jerrod Mustaf, Cody Peck, Gabe Avram, Kam Taylor, Bryce Slay, Tamar and Celeste
     Slay, Megan Brown, Anne Bradley Bing, Braylen Todd, Bree Smith, Elizabeth Hamilton,
     Keith White, Todd Staples, Sam Cox, Carmen Costner, Jim and Crystal Rhodes, Shane and
     Zeke Battier, Brian Field, Robert Geathers III, David Sanders, Jadyn Davis, Zach
     Makemson, Martin, and the rest). **Never add or remove a name** (guard (p), Step 1). Only
     student athletes may be named (memory `student-names-athletes-only`, plan
     `thespianname`); every student named in a worklist unit today is an athlete, and Trinity
     (K–8) names no student. If the drafter finds a non-athlete student named, stop and report
     it at the batch review rather than removing it here;
   - **colleges, pro teams, events and sources:** every college, "Washington Redskins",
     McDonald's All-American, National Prep Championships, NBA G League Draft Combine,
     Portsmouth, 247Sports (Composite), On3, Rivals, ESPN, MaxPreps, Prep Girls Hoops, Max
     Field Hockey, NC Football News, Private School Review, Wikipedia, NFHS Network, Hudl TV,
     HomeTown Fan, GoFan, Bahakel Sports, OrthoCarolina, Novant, Atrium Health, SwimMAC
     Carolina, WME Sports, College HUNKS, "Next Steps", "Knights in College", "Alumni at the
     Next Level", Lions News, Lions Beyond CDS, Athletics Recap, School Profile, every venue
     and campus (Cannon and Bissell are CCD campuses, not Cannon School).

   Case, punctuation, abbreviations (`’24`, `'27`, `Jr`, `Jr.`, `C.J.`, `St.`) and list order
   stay as they are.
2. **Figures in the form written.** Win–loss records (`29–2`, `13–0`, `147–26`,
   `12–14 (5–5 in conference)`), scores (`48–53`, `86–79`, `1–0`, `2–1`), rankings and seeds
   (`No. 30`, `#1 overall seed`, `128th`, `top-100`, `top-10-ranked`), counts (`22 straight`,
   `500th win`, `65-game`, `1,000-dig`, `53-man`, `Sweet 16`), multipliers (`4×`, `2×`,
   `12×`), plus-figures (`175+`, `1000+`, `200+`, `20+`, `10+`), percents (`73%`,
   `roughly 54%`), money (`$30.5M`, `$10M`), units (`150 lbs`, `138 lbs`, `77,737 sq ft`)
   and heights (`6'3"`, `6'10"`, `6′9″`). Digits stay digits and words stay words
   ("twenty-three", "eleven", "Seven", "nine of the prior ten", "a two-decade"). The `~`,
   "roughly", "about", "some", "more than", "at least", "since at least", "nearly",
   "overwhelmingly" and "or so" qualifiers stay attached. A count keeps its noun.
3. **Seasons and dates in the form written** (guard (g)): `2025–26` (en dash) vs `2026-27`
   (hyphen, where written), `'23–24` style labels, "Class of 2024", `’24`, "Fall 2023",
   "WINTER 2024", `Feb. 8`, `January 2026`. A season keeps its year, and a year keeps its
   event.
4. **Results keep their tier.** state champion / title / three-peat vs runner-up vs final vs
   semifinal vs "did not place" vs loss. "won", "beat", "shut … out", "lost", "fell",
   "falling" keep their direction. "first-ever", "first … since 2017", "first … in school
   history", "historic", "three straight", "back-to-back", "consecutive" stay. A conference
   title never becomes a state title.
5. **Recruiting status keeps its tier.** offer ≠ commitment ≠ signing ≠ enrollment ≠
   transfer. "verbal commitments" (Class of 2027) stay verbal; "signed with … and enrolled
   at …" (Covenant Gardner, PD Makemson) keeps both verbs; "has since transferred / moved"
   stays; "preferred walk-on", "walk-on spot", "early enrollee", "no athletic scholarships",
   "no major-conference scholarship offer" stay. Division and conference labels stay attached
   to the right college.
6. **Floors stay floors.** "Treat every figure on this card as a floor", "documented
   minimum(s)", "documented floors, not a census", "may still be understated", "at least",
   "+". A floor never becomes a total, and "not counted", "excluded from every count" and
   "not listed" stay.
7. **School-published vs third-party vs our derivation.** "the school’s own figure", "the
   school’s own all-time count", "the school states", "the school’s cumulative claim",
   "per the 2026–27 School Profile", "the school’s term" vs "MaxPreps lists", "Wikipedia
   says", "per Max Field Hockey", "On3 named", "described in coverage as", "local coverage
   headlined" vs "confirmed on the colleges’ own rosters". A third-party figure never becomes
   the school's, a school claim never becomes a verified fact, and a quoted hedge ("By his
   count, some 250") stays a hedge.
8. **Published vs not published vs not found** (plainsmall item 5). "publishes no …", "does
   not publish", "not published", "unpublished", "list no …", "No dollar figure was
   disclosed" are one class; "No nationally top-100-ranked recruit is documented", "have not
   appeared on those colleges’ rosters", "No … appears in a … top-100" are another (nothing
   found); "has no middle school", "fields no wrestling" are a third (does not exist). Keep
   each in its class. A not-published claim never becomes "there is no …".
9. **Hedges, inferences and samples.** "appears", "consistent with", "often linked",
   "indicative", "unusually", "perennial", "among them", "including", "such as", "e.g.",
   "examples", "Selected results, not a record". An inference ("That also explains the absence
   of NIL activity…", "the algorithm weights strength of schedule…") stays an inference; a
   sample stays a sample; a superlative keeps its scope ("One of the most recognizable",
   "the most of any 2A school in the NCISAA", "more than any other school in the division").
10. **Quoted spans stay byte-identical** (guard (d)): e.g. `"alumni at the next level"`,
    `"Next Steps"`, `"Knights in College"`, `"72 teams / 26 sports"`, `"17 sports / 66
    teams"`, `"Big South"`, `"Blue"`, `"Red"`, `"Additional Levels"`, `"ranked first in the
    nation"`, `"Déjà vu"`, `"no title found for that year"`, `"30 teams participating in 12
    different sports"`, and Trinity's long quotes. Rewrite around them. A quote's inner
    punctuation is part of the quote (plainsmall ruling). **A straight `"` inch mark**
    (Cannon `6'3"`, Carmel `6'10"`) pairs with any new straight `"` in the same unit and
    creates a phantom quote: never add a straight double quote to those units.
11. **This school only, except where a unit already compares.** No rewrite adds a comparison
    with another school. A cross-school claim that is already there is kept only if it is true
    ("Cross-school claims").
12. **No student, trip or NIL money is added.** No dollar figure is added to an NIL entry
    ("No dollar figure was disclosed" stays).

### Near-repeats (text shared across units)

Measured with a 7-word shingle scan over every rendered Sports prose unit (scratch script, not
committed). Templates repeated **across schools** are the brief's "rewritten once, identically
at every site": every site of a template is rewritten to the same wording, **including
off-worklist sites**, which are added through `worklist-extra.json` (Step 2b). The first batch
to reach a template sets its wording (the defaults below, measured against the guards first),
records it in "Template wordings (as built)", and every later batch copies it exactly.

| Id | Template (today) | Sites | Batches | Default rewrite (measure before use) |
|---|---|---|---|---|
| **T1** | "The Class of 2027 rows are public verbal commitments, listed because they are already announced and not counted in the funnel, the sport bars or the Power 4 and Division I rows until those athletes sign." (36 words, one sentence) | `pipeline.rosterNote` at PD, Latin (B1), Christian, Catholic (B2) — identical; Cannon (B3) variant "…not counted in the funnel, the sport bars or on the Compare page until those athletes sign"; Gaston (B5) singular variant "The Class of 2027 row is a public commitment…" | 1, 2, 3, 5 | "The Class of 2027 rows are public verbal commitments, listed because they are already announced. These rows are not counted in the funnel, the sport bars or the Power 4 and Division I rows until those athletes sign." (15 + 22 words; the second sentence names its noun, not a bare "They"). Cannon and Gaston keep their own tails and singular/“commitment” wording, split the same way |
| **T2** | "Level labels and conferences were added by the researcher from each college’s NCAA status" (+ "they are not on the school’s list / published roster") | `pipeline.rosterNote`: PD (B1), Christian (B2), CCD + (B3), DD + (B4), Carmel (B5, "level labels (P4 / D1 / D2 / D3 / NAIA) and conferences … from each college’s status"), Covenant (B4, "Levels and conferences were verified per college by the researcher"); `pipeline.subhead`: PD + (B1), Carmel (B5, "division and conference labels were added by the researcher from each college’s NCAA or NAIA status") | 1–5 | Bookkeeping (Decisions). "This site added the level labels and conferences from each college’s NCAA status." Keep each site's own extras: "they are not on the school’s list" / "published roster"; Carmel's "(P4 / D1 / D2 / D3 / NAIA)" and "or NAIA"; Covenant keeps VERIFIED: "This site confirmed each college’s level and conference." |
| **T3** | "<X>’s junior college is listed at the D3 tier for want of an NJCAA level in this table’s scale." | `pipeline.rosterNote`: Cannon (B3, Evan Ingram), Covenant (B4, "the three junior-college signees are listed at the D3 tier…"), Gaston (B5, USCAA, "Braylen Todd is listed at the D3 tier for want of a USCAA level…"), HG + (B5, Colby Vanhook) | 3, 4, 5 | "<X>’s junior college is listed at the D3 level, because this table has no NJCAA level." Gaston: "…because this table has no USCAA level." |
| **T4** | "Three athletes have since moved — A from X to Y, B …, and C … — and the roster shows the college each committed to out of <School>." | `pipeline.rosterNote`: PD (B1), Cannon (B3) | 1, 3 | "Three athletes have since moved: A from X to Y, B from … and C from …. The roster shows the college each one committed to out of <School>." Three items, so commas, not a `·` run. Never add "first" (FIRST) |
| **T5** | "P4 = SEC · Big Ten · ACC · Big 12." | `pipeline.rosterNote` at Carmel, Latin, Gaston, PD (W) and CCD, HG (+) | — | **Unchanged, byte-identical at every site** |
| **T6** | "Collegiate athlete is the standard here / the school’s term, not scholarship athlete: <name> joined <college> as a preferred walk-on, and Division III programs … award no athletic scholarships." | `pipeline.funnelNote`: Cannon (B3), DD (B4) | 3, 4 | "This card counts college athletes, not only scholarship athletes." (DD keeps "Collegiate athlete is the school’s term"). The walk-on sentence keeps its gloss (Style rulings) and both names |
| **T7** | "…so the count is a documented minimum." | `pipeline.realityCheck`: Gaston, HG (B5) | 5 | "…so the count is a documented minimum." Keep this clause byte-identical; rewrite around it |
| **T8** | "Seating capacities are not published for any <School> venue." | `facilities.careNote`: Cannon (B3), Christian (B2), PD + (unchanged) | — | **Unchanged, byte-identical** |
| **T9** | Care-model comparison: Cannon → Novant, Christian → Atrium (hybrid), CCD → OrthoCarolina, PD → fully in-house | `facilities.careNote`: Latin (B1), Christian (B2), Cannon, CCD (B3); off-worklist PD careNote | 1–3 | Not one template; each unit keeps its own list. Shared clause "and Providence Day keeps care fully in-house" (Cannon, CCD) stays byte-identical. Each partner stays with its school |

**Within one school** (rewrite the shared part identically; an off-worklist site's clause
stays byte-identical in the worklist unit):

| Shared part | Sites | Batch |
|---|---|---|
| "holds 7 of the 22 NCISAA Division I state swimming records — more than any other school in the division — and … 13 USA Swimming All-American nominations from eight swimmers in a single state meet" | CCD `honors.honors[1].text`, `pipeline.rankedRecruits` (both W) | 3 |
| "confirmed on the colleges’ own rosters and in the school’s announcements" | Christian `pipeline.funnelNote`, `pipeline.rosterNote` (both W) | 2 |
| "signees to college dance and cheer teams" | Latin `pipeline.funnelNote`, `pipeline.rosterNote` (both W) | 1 |
| Cade Tyson's path "Belmont → UNC → Minnesota; a 2026 NBA G League Draft Combine … Portsmouth invitee" | Carmel `honors.honors[0].text`, `pipeline.rankedRecruits` (both W; the two differ today in "/" vs "and") | 5 |
| "led the 2022–23 team to 28–4 and the state final" | Carmel `pipeline.rankedRecruits` (W), `honors.honors[1].text` (+) | 5 |
| "is president of the NCISAA Board of Directors" | Christian `offered.footnote` (W), `coaching.subhead` (off) | 2 |
| "Athletic Director Jim Rhodes; Assistant AD Crystal Rhodes." | HG `offered.footnote` (W), `coaching.subhead` (off) | 5 — keep the sentence unchanged |
| "head coach on the school's Coaches & Teams page" | HG `offered.footnote` (W), `offered.subhead` (off) | 5 |
| "first-ever softball CISAA Conference and NCISAA State Championship"; "Conference Player of the Year and All-State" | Covenant `record.seasonDetail[0].text` (W), `record.rows[0].note`, `honors.honors[0].text` (off) | 4 |
| "ranked first in the nation during an 8-game unbeaten streak" | Covenant `record.seasonDetail[1].text` (W), `record.subhead` (off) | 4 |
| "lost the 2025 final 1–4 to Caldwell Academy" | Gaston `record.seasonDetail[2].text` (W), `record.rows[2].note` (off) | 5 |
| "Every row is from the school’s own "Next Steps" …" / "Built from the school’s own "Next Steps" list" | Carmel `pipeline.rosterNote`, `pipeline.subhead` (both W) | 5 |

Guard (j) checks within-file repeats only. Cross-school templates are checked by hand in Step 4
(one grep per template).

### Research bookkeeping (the census, measured 2026-11-11 at `19f63d0e`)

CLAUDE.md "Research bookkeeping is dev-only" (user, 2026-11-05) applies to every rendered unit
this plan rewrites. **Sports has no `flags` array and no prose `toVerify` field**, so the
plainsmall "move to a verify flag" treatment does not exist here without a structural change
(out of scope). Every hit is therefore **rewritten in place**: the parent-facing point stays,
the research verb goes, and the marker class stays.

**The sweep.** `/implement` reruns it over every rendered Sports prose unit at each batch's
Step 2a (plainsmall's pattern plus the Sports additions after `un-researched`):

```
BOOKKEEPING_RE = /\bresearcher\b|\bthis project\b|\bour (?:research|search|check)\b|\bwhen checked\b|\bwe (?:found|could|checked|searched)\b|\bcapture[ds]?\b|\brecoverable\b|\brecovered\b|\bsnapshots?\b|\bWayback\b|\bcard is (?:built|omitted)\b|\bis omitted rather than\b|\bshould be confirmed\b|\bused here as\b|\bshown here\b|\bfor comparability\b|\bplanning assumption\b|\bverbatim\b|\bnot independently\b|\bcould not (?:be )?(?:confirm|verify|find|locate)\w*|\bunconfirmed\b|\bto verify\b|\bthe research\b|\bprovenance\b|\bscraped\b|\bshould not be assumed\b|\brather than guessed\b|\bre-?verified\b|\bcurrently shows nothing\b|\bthis research\b|\bun-researched\b|\bfetch(?:ed)?\b|\bdeeper pass\b|\bclasses reviewed\b|\bdouble-counted\b|\bshould be carried\b|\breproduced as published\b|\btreated as authoritative\b|\bwould be needed\b|\bnot reachable\b/i
```

Known false positive: Covenant `record.seasonDetail[0].text` "**captured** the first-ever
softball…" is a sports verb ("won"), not research. "shown here" in Latin `funnelNote` ("the
NCAA divisions shown here") is site mechanics, not research. "in this app", "this
comparison" and "on this roster" are site mechanics too: inside a worklist unit they become
"on this site" / "among the schools on this site" (plainsmall ruling), and they are not
otherwise hunted.

**W** = on the worklist (fixed inside its wording pass). **+** = off the worklist (added to the
batch through `worklist-extra.json`).

| Batch | Unit | W/+ | Today (the bookkeeping part) | Treatment |
|---|---|:-:|---|---|
| 1 | PD `pipeline.rosterNote` | W | "Level labels … were added by the researcher from each college’s NCAA status — they are not on the school’s list." | T2 |
| 1 | PD `pipeline.subhead` | + | "division and conference labels were added by the researcher from each college’s NCAA status" | T2 (subhead form). Keep "Built from the school’s official "Alumni at the Next Level" list" byte-identical |
| 1 | PD `record.seasonDetail[2].text` | + | "The 2024–25 season record is still unconfirmed." | "No published source confirms the 2024–25 season record." (VERIFIED kept; never "is not published") |
| 1 | Latin `offered.footnote` | W | "both figures are the school’s own and are reproduced as published" | Drop "and are reproduced as published"; keep "both figures are the school’s own" (CLAIM) |
| 2 | Christian `pipeline.rosterNote` | W | "Level labels and conferences were added by the researcher from each college’s NCAA status." | T2 |
| 2 | Catholic `pipeline.rosterNote` | W | "he is attributed here by graduating school and must not be double-counted" | "He is counted once, under CCHS, the school he graduated from." (no ONLY added). Keep "(also in this app)" → "(also on this site)" |
| 3 | CCD `pipeline.rankedRecruits` | W | "in the classes reviewed" | "in the classes on this card". **Never "three classes"**: guard (n) |
| 3 | CCD `coaching.worthKnowing` | W | "the girls basketball seat vacant as of this research" | A since-research timestamp becomes what the school lists (plainsmall ruling): "and the school has not yet named a girls basketball coach" |
| 3 | CCD `pipeline.rosterNote` | + | T2 sentence | T2. Keep T5 |
| 4 | DD `offered.footnote` | W | "and the school’s page is treated as authoritative" | "…but the school’s own teams page does not, so this page follows the school." |
| 4 | DD `pipeline.rosterNote` | + | T2 sentence | T2. Keep the Flagler conference sentence and every date |
| 4 | Covenant `pipeline.rosterNote` | W | "Levels and conferences were verified per college by the researcher" | T2, Covenant form (VERIFIED kept) |
| 5 | Carmel `pipeline.subhead` | W | "division and conference labels were added by the researcher from each college’s NCAA or NAIA status" | T2 (subhead form, "or NAIA") |
| 5 | Carmel `pipeline.rosterNote` | W | "level labels (P4 / D1 / D2 / D3 / NAIA) and conferences were added by the researcher from each college’s status" | T2 (Carmel form) |
| 5 | Carmel `coaching.worthKnowing` | W | "Those details are unpublished on the pages fetched — a deeper pass (school directory, press) would be needed to populate a coaching ledger." | "The school does not publish them." (UNPUBLISHED kept). The research step has no parent use and no verify field to go to, so it leaves the page. Recorded in the review file |
| 5 | Carmel `honors.honors[1].text` | + | "whether he graduated from Carmel is unconfirmed" | "Carmel has not confirmed whether he graduated there." (VERIFIED kept, plainsmall ruling) |
| 5 | Gaston `offered.footnote` | W | "because the athletics site that would list its ladder is JavaScript-rendered and exposes nothing to a fetch" | Keep the parent point (other sports' levels are not shown, which is not a claim that they lack JV teams): "every other sport shows V alone, because the school’s athletics site does not list its other levels in a form this page can show." Site mechanics, not research |
| 5 | Trinity `coaching.featured[0].detail` | W | "— the school's own hedge, and it should be carried rather than presented as a counted figure" | Delete the clause. "By his count, some 250 students…" already carries the hedge (CLAIM/ESTIMATE kept) |

**That is 18 units: 13 on the worklist and 5 off it** (PD `pipeline.subhead`, PD
`record.seasonDetail[2].text`, CCD and DD `pipeline.rosterNote`, Carmel
`honors.honors[1].text`). With HG `pipeline.rosterNote` (a T3 template site, Near-repeats),
that makes the **6 extra units**. Gaston's off-worklist `facilities.careNote` ("is not
reachable") is a **cross-school claim candidate** (below), not part of this plan.

### Cross-school claims (checked 2026-11-11 against every Sports file)

plainsmall precedent: a cross-school claim is checked before it is kept; a false one becomes a
concrete, checkable statement in its own fixes commit. Commit shares below use each school's
`funnel` counts, the figures the Compare rows show.

**False — fixed in a fixes commit (Step 2a):**

| Batch | Unit | Today | Why it is false | Fix (default) |
|---|---|---|---|---|
| 2 | Catholic `national.scheduleNote` | "every other school in this app plays NCISAA, the independent-school association" | Trinity Episcopal and Charlotte Prep are K–8 schools in the Queen City Conference (their own `offered` cards). | "every other high school on this site plays in the NCISAA, the independent-school association" |
| 2 | Catholic `offered.footnote` | "so no team carries an MS level, unlike every PK/K–12 school on this roster" | Gaston Day's card carries no MS chip either (its footnote: "no MS chips are claimed"), though Gaston fields middle school teams. | "…so no team carries an MS level. Every PK/K–12 school on this site fields middle school teams." (true: every PK/K–12 file shows MS chips except Gaston, whose footnote names its MS teams) |
| 4 | DD `pipeline.realityCheck` | "thirteen of twenty-one documented commitments are Division I, where larger peer schools convert closer to a third" | Division I shares: Christian 73%, Catholic 72%, Gaston 67%, **DD 62%**, CCD 58%, HG 57%, Cannon 52%, PD 45%, Latin 35%, Carmel 30%, Covenant 29%. Only Latin is near a third; Christian and Catholic are both higher than DD. | "thirteen of twenty-one documented commitments are Division I, a higher share than at Cannon, Charlotte Country Day, Charlotte Latin or Providence Day." (drops "a third", so guard (n) fires; that is why it is a fixes-commit edit) |

**True — kept (the reviewer re-checks; `/implement` re-measures on the day):**

- Christian `pipeline.funnelNote` "At 73%, the Division I share … is the highest of any school
  in this comparison": 35/48 = 72.9%, next Catholic 39/54 = 72.2%. True, narrowly. Becomes
  "…of any school on this site". **If Catholic's share passes Christian's on the day, stop and
  report.**
- CCD `pipeline.funnelNote` "Five commitments went to Ivy League programs, a share matched by
  no other school in this comparison": CCD 5/48 (Princeton, Yale, Brown, Dartmouth ×2);
  next Catholic 4/54, PD 4/86, Christian 2/48. True in count and share.
- Cannon `pipeline.funnelNote` "Unlike its CISAA peers, Cannon publishes no "alumni at the next
  level" roster": PD ("Alumni at the Next Level"), Christian ("Knights in College"), Latin
  (publishes every name), CCD (a published roster), Covenant (Lions Beyond CDS) all publish one.
- The care-model lists (T9): Cannon trainers via Novant; Christian 2 + an Atrium-embedded
  trainer; CCD team physician from OrthoCarolina; PD in-house; Latin names none; Catholic
  Atrium-provided. Each unit's list matches.
- CCD `facilities.careNote` "The OrthoCarolina partnership is the differentiator among
  Charlotte private schools": no other file names OrthoCarolina. Keep its scope as written.
- PD `offered.footnote` Big South members (PD, Latin, Christian, CCD) match Latin's footnote.
- External superlatives that no file can contradict stay with their attribution: DD "the most
  of any 2A school in the NCISAA", CCD "more than any other school in the division", Carmel
  "among the first Charlotte high-school graduates" (a "described as" hedge).

**Off-worklist candidates, not acted on** (Implementation notes, "Candidates"): Gaston
`facilities.careNote` "Every peer school on this roster publishes a venue list" (Carmel, DD,
HG, Prep and Trinity have no Facilities card); CCD `facilities.subhead` "more than any other
school in this comparison"; DD `offered.subhead` "earlier than any other school in this
comparison".

### Phase 1 builds fail at `check:live`, by design

Every rewritten unit gets a new FNV-1a stamp. The nine shipped `sports` overlays hold the old
stamps, so `npm run build` stops at `check:live`. The steps below run `tsc -b && vite build`
and the build's later checks by hand. Phase 2 makes the full build green.

### Phase 2 machinery (existing, unchanged)

- **Prose overlays.** One topic, `sports`: work files
  `src/data/overlays/work/sports.<lang>.json`, built overlays
  `src/data/overlays/sports.<lang>.json` (both exist for all nine locales). Then:
  - `node scripts/i18n_splice_work.mjs --lang <code> --topic sports` reports *kept / added /
    dropped*;
  - `node scripts/i18n_build_overlay.mjs --topic sports --lang <code>`;
  - `python3 scripts/check_figures.py --topic sports --lang <code>`.
- **Locales.** `PROSE_TRANSLATED` in `src/lib/i18n.ts` = es, bn, ht, te, fr, fa, it, hi, ar.
  The mechanism is `.claude/docs/prose-translation-architecture.md`; the worked precedent is the
  plainsmall Phase 2 implementation note. Sports terminology precedent is
  `src/data/overlays/NOTES.md` "Stage 3 — Sports" and "Sport names stay English".
- **No chrome.** This plan changes no `src/locales/*.json` key.

## Decisions

- **plainsmall's Decisions carry over unless this section overrides them**, and through it
  plainclubs', plainarts', plainaid's, plainadmissions' and plaincollege's: keep-and-explain
  over `plain-ok`; quoted spans untouchable; splitting as the main tool; one string per path,
  with no structural change; no fixing other standards in passing (the named exceptions here
  are the bookkeeping units, the three fact fixes and "medallist"); words outside the jargon
  list fixed only inside the units this plan changes; American spelling; a fresh
  `general-purpose` reviewer per batch; a list of 4+ parallel items after a short lead ending
  in a colon may become a ` · ` run inside the same string; the gloss rules (a general term may
  be glossed from general knowledge; a school's own acronym only from the same file; a gloss
  adds no marker word).
- **Five batches, by school, each with a review stop** ("Batch plan"). Sizing uses
  before-words: earlier reviews ran 1,200–1,500 before-words in 20 minutes. The batches are
  ~1,280, ~1,110, ~1,110, ~1,390 and ~1,370.
- **One branch, one PR, opened only after Phase 2.** Each batch is its own commit (plus a
  fixes commit in Batches 2 and 4) on `feat/plainsports`.
- **`plain_review.mjs` gains `--sports-markers` and guard (p)** (Step 1). Sports prose turns on
  distinctions no existing class covers: commit vs signed vs verbal vs offer, walk-on vs
  scholarship, title vs runner-up vs final vs semifinal vs loss, transfers, floors. And the
  user's hard rule here is "never add or remove a name", which today is only a row note
  ("caps gone"). Guard (p) makes it a failure under `--sports-markers`. It is opt-in and
  calibrated, as each earlier plan's marker set was.
- **Research bookkeeping is fixed in this plan**, per the CLAUDE.md standing rule, because
  every worklist unit is rewritten anyway and would otherwise re-ship it. All 18 census units
  are **rewritten in place** (Sports has no verify field to move a step into, and adding one
  is a structural change). Where a research step has no parent use at all (Carmel's "deeper
  pass", Trinity's "should be carried"), it leaves the page, and the review file records the
  removed words. The 6 off-worklist units are included: 5 carry bookkeeping (3 of them are
  also T2 template sites) and HG's is a T3 template site. The user's brief asks for repeated
  text to read the same everywhere (Approvals: overrulable at the Batch 1 review).
- **Templates repeated across schools are rewritten at every site, off-worklist sites
  included** (T1–T4, T6), through `worklist-extra.json`. This is the brief's "rewritten once,
  identically at every site". It goes one step past plainsmall, which kept off-worklist
  shared clauses byte-identical; here that rule applies only to **within-school** repeats
  and to templates already plain (T5, T7, T8). The only off-worklist template site is HG
  `pipeline.rosterNote` (T3).
- **Fact problems are fixed in this plan, in their own commit** (Step 2a), as plainsmall did.
  The three known ones are in "Cross-school claims". A **new** fact problem found while
  drafting or reviewing is fixed the same way, with evidence from the data files recorded in
  that batch's fixes review file. When the right fix is unclear, report it at the batch
  review instead of guessing. Fetched data, if any, is persisted per the data-provenance
  standard first.
- **Spelling:** add `"medallist": "medalist"` and `"medallists": "medalists"` to
  `spelling.map` in `scripts/plain_language.json` (Batch 2, Step 4, right after the Christian
  rewrite fixes the one occurrence). This is the only edit to `plain_language.json`.
- **Sports vocabulary register** (keep, explain or replace). Sports parents meet the recruiting
  vocabulary on every recruiting site and in the card's own chips and filter tabs, so the
  card's own terms stay. Less common words are explained once per unit or replaced.

  | Term | Treatment |
  |---|---|
  | Division I/II/III, D1/D2/D3, NAIA, NJCAA, USCAA, Power 4 / P4 (Catholic: Power Four), SEC/ACC/Big Ten/Big 12, signee, commit/commitment, verbal commitment, varsity, JV, all-state, All-American, four-star / five-star, 247Sports Composite, Mr. Basketball / Mr. Football, NIL | **Keep** (the card's own vocabulary; NIL is explained by the card's own NIL panel) |
  | preferred walk-on | **Keep and explain** at its first worklist occurrence per card, in render order (subhead → funnelNote → realityCheck → rankedRecruits → rosterNote): "a preferred walk-on (promised a roster spot, without an athletic scholarship)". "walk-on spot" (Christian Curry) stays as is |
  | mid-major | **Keep and explain:** "mid-major (Division I programs outside the biggest conferences)" |
  | early enrollee | "enrolled a semester early" |
  | three-peat / three-peated | "three straight titles" / "won three straight". **Never "third"**: it changes the count word (guard (n)) |
  | JUCO | "junior college" |
  | revenue sports | "football and basketball" (CCD names them in the sentence before) |
  | Olympic and racquet sports | "Olympic sports like swimming and track, and racquet sports like tennis" (a sample, so "like") |
  | blue-chips | "top-rated recruits" |
  | pre-seeded | "seeded … before the event" |
  | biennially | "every two years" |
  | helmed | "led" |
  | nav / navigation boilerplate | "only menu links" |
  | differentiator, provision, volume engine, Power 4 engine, converts | plain verbs and nouns ("the main difference", "Atrium Health provides …", "the biggest source of …", "turns athletes into college commits") |
  | alma mater | "the college his father attended" |
  | for want of | "because … has no" (T3) |
  | inaugural | **Stays** (plainsmall ruling: "first" would enter FIRST) |
  | Collegiate athlete | T6 |

- **"this app", "in this comparison", "on this roster"** become "on this site" / "among the
  schools on this site" inside the units this plan changes.
- **Each unit's opening case after a chrome label stays** ("How each field renders").

## Batch plan (Phase 1)

| Batch | Schools | Units (W + extra) | Before-words | Why this grouping |
|---|---|--:|--:|---|
| **1 — calibration** | **Step 1 tooling** (`--sports-markers`, guard (p), spelling map) + **Providence Day** (10 + 2) + **Charlotte Latin** (11) | **23** | ~1,280 | The two richest Sports files, the ones CLAUDE.md names as the structure to mirror. They hold the first sites of T1, T2 and T4, so the template wordings are set on the fullest data and every later batch copies them. Calibrating the new classes on the densest pipeline prose first is the point. |
| **2** | **fixes commit** (Catholic ×2) + **Charlotte Christian** (10) + **Charlotte Catholic** (9) | **19** | ~1,110 | The two schools with the highest Division I shares and the two NCHSAA/CISAA framing units; the only NCHSAA school's "different association" lines are reviewed beside the 73% claim. Both reuse T1/T2. "medallist" lands here. |
| **3** | **Charlotte Country Day** (9 + 1) + **Cannon** (8) | **18** | ~1,110 | The care-model comparison group (T9: Cannon, CCD careNotes after Latin in B1 and Christian in B2), the swimming-records repeat, T1 (Cannon variant), T3 and T4's second site, and T6's first site. |
| **4** | **fixes commit** (DD) + **Davidson Day** (10 + 1) + **Covenant Day** (12) | **23** | ~1,390 | The two mid-size CISAA/NCISAA schools with the longest rosterNotes and the most named coaches; T3 and T6's second sites; the Cup-agreement unit (DD 2023–24). |
| **5** | **Carmel Christian** (9 + 1) + **Gaston Day** (7) + **Hickory Grove** (4 + 1) + **Trinity Episcopal** (2) | **24** | ~1,370 | The four smallest files. Gaston's ledger-agreement units, T1's singular variant, T3's last two sites, T7, and the two highest-grade units in the area (HG `worthKnowing` 23.7, Carmel `didNotWin` 20.2). Trinity is K–8: no student is named. |

**107 units change in Phase 1**: 101 worklist + 6 extra (PD ×2, CCD, DD, Carmel, HG). Phase 2
runs **once**, after Batch 5 is approved.

**Batch arguments** (Steps 2 and 4). Every call adds
`--dir src/data/sportsPrograms --no-md --md-paths '^$' --sports-markers`, plus:

- Batch 1: `--slugs providence-day,charlotte-latin`
- Batch 2: `--slugs charlotte-christian,charlotte-catholic`
- Batch 3: `--slugs charlotte-country-day,cannon`
- Batch 4: `--slugs davidson-day,covenant-day`
- Batch 5: `--slugs carmel-christian,gaston-day,hickory-grove-christian,trinity-episcopal`

**Progress tracking across windows.** Each batch is built in its own window. After each batch,
`/implement` fills that batch's row in "Batch progress". The front matter stays
`status: in-progress` through Batches 1–4. It becomes `english-done` (INDEX: *English shipped*)
only after Batch 5.

### Batch progress

| Batch | Commit | Review file(s) | Reviewer findings (fixed) | User verdict |
|---|---|---|---|---|
| 1 (tooling) | in the Batch 1 commit | — | — | — |
| 1 | `82639cc3` | [review-batch1.md](plainsports-data/review-batch1.md) | 3 (all fixed) | ruling: no comparisons with other schools (applied) |
| 1 (ruling) | `plainsports: batch 1 ruling` (SHA filled on resume) | [review-batch1-ruling.md](plainsports-data/review-batch1-ruling.md) | — | awaiting review |
| 2 (fixes) | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 (fixes) | | | | |
| 4 | | | | |
| 5 | | | | |

### Template wordings (as built)

*Filled in by `/implement` the first time each template is rewritten. Later batches copy the
text here exactly.*

| Id | Final wording | Set in batch |
|---|---|---|
| T1 | The Class of 2027 rows are public verbal commitments, listed because they are already announced. These rows are not counted in the funnel, the sport bars or the Power 4 and Division I rows until those athletes sign. | 1 (PD, Latin) |
| T2 | rosterNote form: "This site added the level labels (P4 / D1 / D2 / D3) and conferences from each college’s NCAA status. These labels are not on the school’s list." (PD's parenthesis and second sentence are PD's own extras; the core is "This site added the level labels and conferences from each college’s NCAA status.") · subhead form: "This site added the division and conference labels from each college’s NCAA status." | 1 (PD) |
| T3 | | |
| T4 | Three athletes have since moved: Jadyn Davis from Michigan to East Tennessee State, Trajan Thompson from Denver to West Florida and Chase Jackson from Gardner-Webb to Claflin. The roster shows the college each one committed to out of Providence Day. (Pattern: "Three athletes have since moved: A from X to Y, B from … and C from …. The roster shows the college each one committed to out of <School>.") | 1 (PD) |
| T6 | | |

### Unit notes (things the drafter must not get wrong)

Only the traps; every unit also follows "Content that must survive" and the Style rulings.

**Batch 1 — Providence Day**
- `offered.footnote`: keep `"Blue"`, `"Red"`, `"Big South"`, "~39 of 66", "As of 2025–26",
  "PD went 3–0 and finished first" (FIRST).
- `pipeline.funnelNote` (16.8): "Treat the D1 tally as a floor, not a ceiling" (BOUND);
  the school's graphic "claims" (CLAIM) vs "the 2026–27 profile puts" (school figure); "one
  elite recruit can hold 7–8 Power 4 offers but makes a single commitment" (OFFER vs COMMIT);
  "the Big 12 is not represented in this window".
- `pipeline.realityCheck`: "overwhelmingly"; the seven colleges "recur heavily" (a `·` run is
  allowed); "That pattern matches PD’s academically selective identity" stays an inference;
  "for many families" keeps its scope.
- `pipeline.rankedRecruits`: "53-man consensus list for the class of 2027 (blending 247Sports,
  Rivals and ESPN)"; "Recent blue-chips" → "Recent top-rated recruits"; "the No. 1 offensive
  tackle and No. 4 recruit nationally".
- `pipeline.rosterNote` (127 words): T2, T5, T1, T4; then the Makemson sentence keeps
  "listed by the school as a Tennessee commit but enrolled at Appalachian State, which is the
  college shown here" (CLAIM + ENROLLED).
- `coaching.featured[1].detail`: "(nine of the prior ten)"; "took over from the founding
  coach".
- `coaching.worthKnowing`: opens lowercase "boys basketball’s staff…"; Zeke Battier is a
  current athlete and stays named.
- `facilities.broadcast` (31 words, one list): may become "Hudl TV live streams · the PD Sports
  Network on YouTube · …" after a short lead; keep the parenthesis "(PD–Charlotte Christian has
  been its Game of the Week)" with Bahakel.
- `national.scheduleNote`: "it also means a harder week-to-week slate" → "schedule"; keep
  "MaxPreps still ranked it #3 in NC" and the "because the algorithm weights…" inference.
- `national.nil[2].text`: "For roughly a full year" (ESTIMATE); "On3 named PD's David Sanders
  as the direct beneficiary" stays attributed to On3.

**Batch 1 — Charlotte Latin**
- `offered.footnote`: the bookkeeping fix; quotes `"17 sports / 66 teams"` and `"Big South"`;
  "confirmed only for the eight sports with distinct team pages" (VERIFIED + ONLY).
- `record.seasonDetail[0].text` (label Volleyball): "ranked 128th in NC, then 18–6 and 35th,
  then 29–2 and 17th"; "won 22 straight before its first loss, under Caitlin Peters".
- `pipeline.funnelNote`: "roughly 54%"; "since at least 2008"; "(NESCAC, UAA, ODAC, NCAC)";
  the dance/cheer clause shared with `rosterNote`.
- `pipeline.rankedRecruits`: `150 lbs`, `138 lbs`, "pre-seeded No. 6 nationally" → "seeded No.
  6 nationally before the 2026 National Prep Championships"; "247Sports/On3/Rivals" stays one
  slash token.
- `honors.honors[1].text`: three names in order; "three consecutive individual NCISAA state
  titles from 2024 to 2026".
- `coaching.featured[0].detail`: "One of the most recognizable…" stays hedged; "rather than a
  figurehead appointment" → "not just a name on the staff list"; keep "Cannon School’s
  program for six years before joining Latin in 2023".
- `coaching.featured[1].detail`: "Jerry Faulkner’s varsity assistant" and "Faulkner’s 515–157
  era".
- `coaching.worthKnowing` (17.8): "(Paige/wrestling, Mack/girls basketball, Peters/volleyball,
  Dayton/football)" may become "Paige (wrestling) · Mack (girls basketball) · Peters
  (volleyball) · Dayton (football)"; "four people deep"; "twelve years professionally".
- `facilities.careNote`: T9 list; "owned and operated by SwimMAC Carolina, a third-party club,
  not the school" (THIRDPARTY).

**Batch 2 — Charlotte Christian**
- `offered.footnote` (10.7): "The school’s published figure of 22 sports counts boys’ and
  girls’ editions separately"; keep "is president of the NCISAA Board of Directors" exactly.
- `pipeline.funnelNote`: `"Knights in College"`; the 73% claim (Cross-school claims).
- `pipeline.realityCheck` (17.8): "sixteen Division I commits"; "two service-academy signees"
  keep (the names follow); "spread unusually wide"; each sport keeps its P4 college.
- `pipeline.rankedRecruits`: "The instructive case is the inverse" → plain ("The opposite case
  is the most useful one"); "31 point guards ranked ahead of him"; "his father’s alma mater";
  "offered only a walk-on spot" (OFFER + WALKON + ONLY).
- `honors.pros[0].detail`: "medallist" → "medalist"; `4×`, `2×`, `12×`; "the first unanimous
  winner" (FIRST).
- `coaching.featured[0].detail`: "the school’s first winning season since 2015" is **Forest
  Hills’**, not Christian's. A split must name it ("Forest Hills’ first winning season since
  2015"); "The most credentialed outside hire in the department’s recent history" keeps its
  scope.
- `coaching.worthKnowing`: opens lowercase; "roughly fifteen"; "the late Greg Simmons — who
  built the 17-title baseball dynasty and died in 2023".
- `facilities.broadcast` (12.0): "charges admission only for varsity football, varsity
  basketball and NCISAA playoff events — every other contest is free" (ONLY + FREE).
- `facilities.careNote`: T9; T8 byte-identical.

**Batch 2 — Charlotte Catholic**
- `offered.footnote` (105 words): fixes-commit edit first (MS claim). "exactly as the school
  lists them on its All Sports page"; "follows the standard NCHSAA calendar; the school itself
  publishes the list flat"; "Level splits are indicative" (HEDGE); "navigation boilerplate" →
  "only menu links".
- `record.didNotWin`: `"no title found for that year"`, "not a verified loss" (VERIFIED);
  "the 79-title total since 2000 is the school’s own figure".
- `pipeline.funnelNote` (14.7): `1000+` (no comma); "sits on a different time base" → "counts
  a different span of years"; "documented minimum".
- `pipeline.realityCheck`: "Power Four" stays Catholic's spelling; "13 of 54".
- `pipeline.rosterNote` (114 words): the bookkeeping fix; "counted P4 at commitment time and
  has since transferred to Belmont Abbey via JUCO" → "junior college"; the three excluded
  athletes "have not appeared on those colleges’ rosters and are excluded from every count";
  T1.
- `coaching.worthKnowing`: "The disclosure gap here is unusually sharp" → plain; "eight
  coaches", "nineteen sports"; "nav boilerplate".
- `facilities.careNote` (14.9): "Atrium Health provision is a genuine structural difference" →
  "Atrium Health provides the trainers, which is a real difference in how care is
  organized"; keep the three not-published items.
- `national.scheduleNote` (16.4): fixes-commit edit first (NCISAA claim); "imprecise in both
  directions".

**Batch 3 — Charlotte Country Day**
- `offered.footnote`: `"72 teams / 26 sports"`; "enumerating the team directory yields roughly
  65" → "a count of the team directory gives roughly 65"; "both figures are the school’s own";
  the campus "Cannon (Upper/Lower School and main athletics)" is CCD's campus.
- `pipeline.funnelNote`: the Ivy claim stays ("on this site"); "consistent with Country Day’s
  academic profile" (HEDGE); the cheer signee "sits outside the NCAA divisions shown here".
- `pipeline.realityCheck`: "unambiguously"; "revenue sports" and "Olympic and racquet sports"
  per the register.
- `pipeline.rankedRecruits` and `honors.honors[1].text`: the swimming-records clause, identical
  at both sites.
- `coaching.featured[0].detail`: "His son C.C. Davis ’99" — `C.C.` mid-sentence only.
- `coaching.featured[1].detail`: `200+`, `20+`; "roughly 150"; "passes the continuity-anchor
  role to Calvin Davis Jr." — move `Jr.` off the sentence end (plainsmall ruling for `Mr.`),
  e.g. "When he retires after the 2026 season, Calvin Davis Jr. takes over the
  continuity-anchor role." Add no date or season the before-text lacks.
- `coaching.worthKnowing`: bookkeeping fix; "four head-coaching jobs in the 2025–26 cycle";
  "unusually high churn" → "unusually high turnover".
- `facilities.careNote`: `$30.5M`, `$10M`, `77,737 sq ft`; T9 clause byte-identical.

**Batch 3 — Cannon**
- `pipeline.subhead` (14.2): "the three-time state champion Class of 2024" (TITLE + count);
  every college in order.
- `pipeline.funnelNote`: `"alumni at the next level"`; "Unlike its CISAA peers" (true); T6;
  "joined North Carolina as an early enrollee and later Clemson as a preferred walk-on".
- `pipeline.realityCheck` (14.9): the count words (eight, twenty-three, five, twelve, four,
  two); "a single three-peat championship class"; "the flagship basketball program"; the last
  sentence stays.
- `pipeline.rankedRecruits`: `6'3"` (no straight `"` added); "No. 30 nationally by Prep Girls
  Hoops and No. 3 in NC"; "a five-star, No. 18 nationally"; "Reigan Richardson ’21".
- `pipeline.rosterNote` (98 words): T1 (Cannon variant), T3, T4.
- `coaching.featured[0].detail`: "His 500th win came in January 2026."
- `coaching.worthKnowing`: opens lowercase.
- `facilities.careNote`: T9 (shared clause byte-identical), T8 byte-identical; "a clinical
  education site for UNC Charlotte’s Master’s in Athletic Training".

**Batch 4 — Davidson Day**
- `offered.footnote`: the bookkeeping fix; "moved up from 1A to 2A to 3A"; "fifteen acres";
  "per the 2026–27 School Profile".
- `record.seasonDetail[0].text` (label "2023–24"): Ledger agreement; "The peak." may stay as a
  fragment; "the most of any 2A school in the NCISAA".
- `record.seasonDetail[1].text` (label Boys Basketball): "C.J. Huntley"; "handing that national
  program its first loss of the season".
- `pipeline.funnelNote` (108 words): "documented floors, not a census"; "may still be
  understated"; T6 (DD form); "more than 100 Davidson Day athletes … at 80 different colleges"
  (CLAIM: "The school states").
- `pipeline.realityCheck`: fixes-commit edit first; then plain.
- `honors.honors[4].text`: "inaugural" stays; "biennially" → "every two years"; the eight
  names in order, "and contributors Chuck and Karen Wolter".
- `coaching.featured[0].detail`: "the only documented strength-training role on campus"
  (ONLY).
- `coaching.featured[1].detail`: "The longest verified head-coaching tenure" (VERIFIED); "the
  season after his departure" is a juxtaposition, never a "because".
- `coaching.worthKnowing`: opens lowercase; "a consequence of its official athletics website
  being offline".

**Batch 4 — Covenant Day**
- `offered.footnote`: `"Additional Levels"`; "every sport but Girls Golf"; "MaxPreps counts 21
  varsity sports and 50 total teams".
- `record.seasonDetail[0].text` (Softball): "captured" = won (not bookkeeping); the shared
  clauses with `record.rows[0].note` and `honors.honors[0].text` stay byte-identical.
- `record.seasonDetail[1].text` (Boys Soccer): `"ranked first in the nation"`; `#1 overall
  seed`; "8-game unbeaten streak"; "falling 2–1 to Christ School".
- `record.seasonDetail[2].text`: "#4", "#8", "12–14 (5–5 in conference)"; "Neither reached the
  semifinal, so they sit outside the title matrix above."
- `pipeline.funnelNote`: "Documented minimums"; "The school’s cumulative claim is 175+
  collegiate athletes since 2006" (CLAIM).
- `pipeline.realityCheck` (16.0): "broad rather than tall" → plain; "mid-major" per the
  register; the NIL sentence stays an inference.
- `pipeline.rankedRecruits`: "No nationally top-100-ranked recruit is documented" (NOTFOUND);
  "per Max Field Hockey"; `6′9″`; "Michael Marcus Jr ’24" (no period).
- `pipeline.rosterNote` (108 words): "(September 2024 through April 2026)"; "signed with
  Davidson and enrolled at Appalachian State"; "signed with Guilford for basketball and joined
  UNC Charlotte’s football roster"; T2 (Covenant form), T3; the two transfers.
- `coaching.featured[0].detail` (18.3): "a two-decade tenure"; "three consecutive NCISAA state
  runner-up finishes"; "a 1,000-dig and a 1,000-assist senior in the same rotation" (no name).
- `coaching.featured[1].detail`: the department list may become a `·` run.
- `coaching.worthKnowing`: opens lowercase; "(Langs for football, Johnson for girls soccer)",
  "Mills’ 22-season milestone"; Avery is a signee (athlete).
- `facilities.care[0].text`: "HS Strength and Conditioning Teacher and Coach" is a title.

**Batch 5 — Carmel Christian**
- `record.didNotWin` (20.2): one semicolon chain → one sentence per final group; every score in
  its parenthesis with its year; "as Christ School three-peated" → "as Christ School won three
  straight"; "shut Carmel out" (LOSS for Carmel).
- `pipeline.subhead`, `pipeline.rosterNote`: T2 (Carmel forms); `"Next Steps"`; "its list for
  that class is not yet published" (UNPUBLISHED).
- `pipeline.funnelNote`: "mid-major"; "Kam Taylor reached the ACC (Florida State) only later,
  through the transfer portal, not as a Carmel commit" (TRANSFER + ONLY).
- `pipeline.realityCheck`: the per-sport college lists; "a dance-team signee, who is not
  counted here as an athletic commitment" (EXCLUDED).
- `pipeline.rankedRecruits` (11.8): Tyson and Mustaf repeats; "son of ex-NBA Jerrod Mustaf";
  "Cody Peck … is not a Carmel commit".
- `honors.honors[0].text`: "(a draft prospect, not yet a pro)" (PRO).
- `coaching.worthKnowing`: bookkeeping fix.
- `national.nil[0].text`: "described as among the first Charlotte high-school graduates"
  (HEDGE); "No dollar figure was disclosed"; the parents' names stay.

**Batch 5 — Gaston Day**
- `offered.footnote` (109 words): the bookkeeping fix; "(grades 6–8, subject to academic
  standing and behavior)"; "no MS chips are claimed"; "Cheering and track & field come from
  Private School Review rather than the MaxPreps season grid" (THIRDPARTY).
- `record.didNotWin`: opens "every other program." in lowercase (completes the label); Ledger
  agreement; the six sports in order.
- `record.seasonDetail[0].text`: Ledger agreement; "described in coverage as".
- `record.seasonDetail[2].text`: `"Déjà vu"`; the Caldwell clause byte-identical.
- `pipeline.funnelNote`: "Gaston Day’s one Power 4 commitment in this window".
- `pipeline.realityCheck`: T7; "Bree Smith (’27) … has committed to swim at Stanford".
- `pipeline.rosterNote`: T3 (USCAA), T5, T1 (singular).

**Batch 5 — Hickory Grove Christian**
- `offered.footnote`: `"30 teams participating in 12 different sports"`, "(Wikipedia says 14
  sports / 28 teams)"; the last sentence (Rhodes) unchanged.
- `pipeline.funnelNote`: names, colleges and conferences in order; "There are no Power 4 commits
  in this window."
- `pipeline.realityCheck` (21.4): T7; "Division II at Wingate and Mars Hill and junior college at
  Gaston College as well as Division I".
- `coaching.worthKnowing` (23.7): the parenthetical list keeps "among them" (a sample); "so no
  pedigree or continuity claim can be made from public sources" → "so this page makes no claim
  about their experience or how long they have coached" (the card's own subject).
- `pipeline.rosterNote` (+): T3 only; the rest stays.

**Batch 5 — Trinity Episcopal**
- `offered.footnote` (82 words): mostly quotes, byte-identical (incl. `Feb. 8`); keep "WINTER
  2024:" / "FALL 2023:" caps labels; "exactly two seasons"; split the 47-word "Alongside it…"
  sentence (three results → three short sentences, "3 runners in the top 15 and 1 named
  all-conference" as digits). K–8: no student is named.
- `coaching.featured[0].detail`: the bookkeeping fix; "has helmed" → "has led"; both quotes
  byte-identical; "which is what a K–8 athletics department of this size looks like from the
  inside" stays.

### Style rulings

**Carried over from all six earlier per-area plans.** The full text is in
[`plainsmall.md`](plainsmall.md) "Style rulings" (which summarizes plainclubs and plainarts,
whose own "Style rulings" sections hold the rest). The drafter reads plainsmall's and
plainclubs' before Batch 1, and the reviewer gets both. In short:

- **Explaining terms:** keep-and-explain with a parenthesis right after the term, or one
  wrapping it; a published maximum is never glossed as typical.
- **Splitting:** "First: … Then: …" or a `·` run, every item kept in order; `a.m.`/`p.m.`/
  `Mr.`/`Jr.`/`etc.` move off a sentence end; a referent after a split names its noun, never a
  bare "it"/"this"/"he" when two people are in play.
- **Claims and markers:** a school's own term is never paraphrased; a detached school
  description is re-attributed ("The school says …"); a requirement word is never softened, an
  overclaim verb never upgraded, "only" still covers everything; a marker word never leaves
  its class; a not-published claim keeps a not-published verb; a not-found list leads "None of
  these appears in any source:"; a cross-school claim is checked.
- **Quotes and counts:** a quote that ends a sentence goes last in the unit; a quote's inner
  punctuation is part of the quote; no count word is added that the before-text lacked ("The
  roles are …", never "The nine roles …"); a sentence never ends on a month name.
- **Scope:** a split keeps a claim's scope ("That year, …"); an individual award stays
  individual; a sample keeps its narrowing word; "has had seven partners since 1989", never
  "has seven" (a since-year count is not a current count).
- **Bookkeeping:** "unconfirmed" keeps VERIFIED ("has not confirmed"); a since-research
  timestamp becomes what the school lists; "our count" becomes "counted from the school's
  list"; a derived total reads "added up on this page".
- **Glosses:** stay inside the term's meaning and add no marker word; a full list stays a full
  list; a Unit note's keep is kept; a plan's own suggested wording is measured against the
  guards before use.
- **The reviewer's recurring findings across all six plans are the checklist:** strengthened
  claims; wrong referents after a split; dropped narrowing words; a gloss that changed a
  term's meaning; not-published turned into does-not-exist; a school statement turned into our
  own claim; a full list turned into a sample; a false cross-school claim; a bare pronoun
  after a split.

**From this plan** (set at planning; overrulable at the Batch 1 review):
- The Sports vocabulary register (Decisions).
- The template defaults T1–T7 (Near-repeats).
- Each unit's opening case after a chrome label stays.
- "three-peat" becomes "three straight", never "third".

**USER RULING at the Batch 1 review (2026-11-11) — no comparisons with other schools.**
"School pages should be focused on the school and not trying to mention what others don't do."
A unit says what **this** school publishes, does or has won. It does not say what other
schools do, don't do or publish. This **overrides** the plan's "keep a true cross-school claim"
and "fix a false one" defaults (Decisions, "Cross-school claims", item 11 of "Content that
must survive"): a comparison with another school is **removed**, not corrected. Applied in
Batch 1 to Latin `facilities.care[4].text` ("unlike its CISAA peers who publish theirs") and
Latin `facilities.careNote` (the "By contrast, Charlotte Country Day names OrthoCarolina, …"
sentence), in its own commit with `review-batch1-ruling.md`. Guard (p) fails there by design
(only other schools' names leave).

For the later batches, the default under this ruling (each removal in that batch's fixes
commit, recorded in `review-batch<N>-fixes.md`, so the wording-pass guards run on the
trimmed text):
- **Removed:** Catholic `national.scheduleNote` "every other school in this app plays NCISAA"
  and `offered.footnote` "unlike every PK/K–12 school on this roster" (B2, replacing their
  planned fixes); Christian `funnelNote` "the highest of any school in this comparison" (B2;
  keep "At 73%, the Division I share …"); Christian, Cannon and CCD `careNote` care-model
  lists of other schools, incl. the shared "and Providence Day keeps care fully in-house"
  (T9 is dropped); CCD `funnelNote` "a share matched by no other school in this comparison"
  and `careNote` "the differentiator among Charlotte private schools" (B3); Cannon `funnelNote`
  "Unlike its CISAA peers" (B3); DD `realityCheck` "where larger peer schools convert closer to
  a third" (B4, replacing its planned fix). Guard (n) or (p) may fire on these by design.
- **Kept (user, 2026-11-11):** a ranking of the school's **own** result, with its
  attribution — DD "the most of any 2A school in the NCISAA", CCD "more than any other school
  in the division" (swimming records), Carmel "described as among the first Charlotte
  high-school graduates" (NIL). These describe what the school achieved, not what others lack.
- **Kept (user, 2026-11-11): implicit comparisons** that name no other school and do not
  point at this site's set ("unusually deep for a high school", "few schools publish …").
  Removed: a comparison that names another school, or says "on this site" / "in this app" /
  "in this comparison" / "on this roster" / "peers here", or names a peer group ("its CISAA
  peers", as in Latin `care[4]` and Cannon `funnelNote`).
- Conference membership that names other schools (PD and Latin "Big South" footnotes) is a
  fact about the school's own league and stays.

**Batch 1 choices (PD + Latin)** — awaiting the user's review; precedent once approved:
- "sign" as a noun is SIGNED: "is a sign of" → "shows". "only one" enters ONLY: "a single
  commitment" → "one commitment". "appears" enters HEDGE: "is not represented" → "has none".
- "unconfirmed" (no VERIFIED match) → "No public source confirms … yet"; never "No published
  source" (UNPUBLISHED) and never bare "No source" (overclaims; reviewer finding).
- A count moved by a split names its tier: "Football produced two Division I commits", never
  a bare "two" after a Power 4 figure (reviewer finding).
- A span keeps its anchor: "ran JV for a decade before taking over …", never a decade
  re-anchored to the return year (reviewer finding).
- A 4+ item college list after a short lead becomes "These colleges recur …: A · B · C".
- "both basketballs" → "boys and girls basketball"; "blue-chips" → "top-rated recruits";
  "pre-seeded … for" → "seeded … before"; "Scheduling up (playing stronger opponents)".
- Physician / partnership may become doctor / partner to reach grade 10; "concussion
  protocol" stays.

*Rulings from later batches are added here by `/implement`.* If a resume command arrives with
the `<, with these rulings: …>` placeholder unfilled, read it as "approved, no rulings", as
every earlier plan did, and record that batch's choices here as precedent.

### plain-ok register

*Every `// plain-ok` marker or `plain_language.json` `allow` entry added, with path, term and
reason. Target: empty.*

## Approvals needed

**None up front.** No card, section, Compare row, metric key, topic, ordering, layout or chrome
change; no field is added or split.

The gates are the user's wording reviews: one per batch, then Phase 1 → 2. Three planning
choices can be overruled at review, and each has a default that `/implement` applies if no
answer comes:

- **The 6 off-worklist units** (5 bookkeeping units, 3 of them T2 sites, plus HG's T3 site)
  are included, so the bookkeeping leaves every page and each template reads the same
  everywhere. Shown at the Batch 1 review (PD's two) and in each
  later batch.
- **The three fact fixes** (Catholic ×2, DD ×1) land in their own fixes commits before
  Batches 2 and 4, shown in `review-batch<N>-fixes.md`.
- **The research steps that leave the page** (Carmel's "deeper pass" and Trinity's "should be
  carried") are deleted, not moved, because Sports has no verify field. Shown at the Batch 5
  review with the removed words.

## Source material

None. This is a wording pass with named fixes, and every fix uses only the data files. If a new
fact fix needs fetched data, it is persisted first (Decisions). Otherwise no `source-material/`
file is written or ingested.

## Out of scope

- **Other areas** and their prose; `src/content/**`.
- **`src/data/metricValues.ts`**, including every Sports Compare row and tip.
- **The Wells Fargo Cup ledger** (`src/data/wellsFargoCup.ts`), `src/lib/wellsFargoCup.ts`, every
  `cup.pointSources` entry and every computed Cup figure; the Cup card's text is `en.json`
  chrome (`sports.cup.*`) and is not edited.
- **`src/locales/*.json`** (no chrome key changes) and `src/lib/metrics.ts`.
- **`scripts/plain_language.json`** beyond the two `medallist` spelling-map entries.
- **Units not changed by this plan:** every off-worklist unit except the 6 named extras; every
  non-prose field (`program`, `name`, `college`, `conf`, `sport`, `count`, `value`, `since`,
  `tag`, `kicker`, `record`, `role`, source labels); every off-worklist near-repeat site of a
  within-school repeat. The worklists plus `worklist-extra.json` are the contract.
- **Structural changes:** no new fields, no split arrays, no `level`/`result` value changed, no
  `toVerify` flipped, no card or layout change.
- **Freshness:** re-verifying records, commits, coaches or rosters against live pages. Every
  check in this plan uses the data files.
- **The off-worklist cross-school candidates** (Context), and bookkeeping outside rendered
  prose (comments, `source-material/`).
- **Deploying.** Merging is pre-authorized; `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

**Batch 1 runs Steps 1–8. Batches 2–5 each run Steps 2–8 for their own schools.** Before
starting Batch 2 or later, run `git checkout feat/plainsports`, then
`git fetch && git rebase origin/main`. Do not stash (memory `never-git-stash-in-shared-tree`).
If a rebase conflicts in a batch file, re-run Step 2 after resolving it.

1. **Review tooling and spelling** (Batch 1 only; part of the Batch 1 English commit).

   **(a) `--sports-markers` in `scripts/plain_review.mjs`.** Keep every existing option and
   guard, and keep default behavior byte-for-byte. Update the header comment and the usage
   line. It enables:
   - the shared ESTIMATE and BOUND, with these counted into BOUND (like
     `CLUBS_BOUND_EXTRA`): `\bfloors?\b|\bminimums?\b|\bnot a census\b|\bunderstated\b`;
   - borrowed: THIRDPARTY, DERIVED (aid); WIN, CLAIM, VERIFIED, NOTFOUND (arts); ONLY, FIRST
     (clubs); STALE, ENROLLED, EXCLUDED, FREE (small);
   - these new classes, case-insensitive, presence/absence per unit as today:
     - COMMIT: `\bcommit(?:s|ted|ment|ments)?\b`
     - SIGNED: `\bsign(?:s|ed|ing|ee|ees)?\b`
     - VERBAL: `\bverbal(?:ly)?\b`
     - OFFER: `\boffers?\b|\boffered\b`
     - WALKON: `\bwalk-?ons?\b`
     - SCHOLARSHIP: `\bscholarships?\b`
     - TRANSFER: `\btransfer\w*|\bhave since moved\b|\bmoved (?:from|to)\b`
     - TITLE: `\bchampion(?:s|ship|ships)?\b|\btitles?\b|\bthree-peat\w*`
     - RUNNERUP: `\brunner-?ups?\b`
     - FINAL: `\bfinals?\b(?! (?:season|year)\b)`
     - SEMIFINAL: `\bsemi-?finals?\b`
     - LOSS: `\blos(?:e|es|ing|t|s|ses)\b|\bfell\b|\bfalling\b|\bdefeated by\b|\bshut \w+ out\b`
     - RANKED: `\branked\b|\brank(?:s|ing|ings)?\b|\btop-?\d+\b|\bseed(?:s|ed)?\b`
     - PRO: `\bprofessional(?:ly)?\b|\bpros?\b|\bdraft\w*|\bprospects?\b`
     - HEDGE: `\bappear(?:s|ed)?\b|\bdescribed (?:as|in)\b|\bconsistent with\b|\bby (?:his|her|their|its) count\b|\boften linked\b|\bindicative\b|\breported(?:ly)?\b`

   A synonym inside one class is free. Leaving a class, or entering one, fails. Guard (n)
   (count words and `N+`) runs under `--sports-markers` too.

   **(b) Guard (p), names, under `--sports-markers` only.** Per unit, take the capitalized
   tokens of the before- and after-text (`/\b[A-Z][\w’'.&-]*/g`, with a trailing `.` or `’s`
   stripped), minus a stoplist of words that start sentences (The, A, An, It, Its, He, His, She,
   Her, They, Their, This, That, These, Those, There, Then, First, Also, And, But, So, Both,
   Each, Every, No, Not, Only, Most, Many, Some, All, In, On, At, As, By, For, From, Of, To,
   With, While, When, Where, After, Before, Since, Earlier, Today, Here, What, Which, Who, One,
   Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Treat, Ask, Note, Selected, Recent,
   Among, Even, Because, If, Until, Unlike, Like, Neither, Including, Plus). It **fails** when a
   before-token is absent from the after-text in both its own case and lowercase ("name gone"),
   or an after-token is absent from the before-text in both cases ("name new"). It names the
   token and the `slug:path`. Recasing a sport at a sentence start ("Basketball" ↔
   "basketball") passes; dropping or adding a person, college or source fails.

   **(c) Negative tests**, one per new class plus (p) and (n), each isolated (memory
   `negative-test-must-isolate-the-assertion`):
   - copy the target file byte-for-byte to the scratchpad;
   - plant exactly one fault and run `--check` with the Batch 1 arguments, plus
     `--slugs <that school>`;
   - confirm it exits 1 with **that class name and that `slug:path`**, reading which message
     printed;
   - restore from the copy and confirm `cmp` is clean.

   The faults (all on Batch 1–5 files; each school's file is restored before the next):
   - **SIGNED:** Covenant `pipeline.rosterNote` "Grant Gardner signed with Davidson" →
     "Grant Gardner chose Davidson" (ENROLLED stays present).
   - **VERBAL:** PD `pipeline.rosterNote` "public verbal commitments" → "public commitments".
   - **WALKON:** Cannon `pipeline.funnelNote` "as a preferred walk-on" → "as a recruit".
   - **SCHOLARSHIP:** DD `pipeline.funnelNote` "award no athletic scholarships" → "award no
     athletic aid".
   - **TRANSFER:** Covenant `pipeline.rosterNote` "has transferred from Louisville" → "has gone
     from Louisville".
   - **RUNNERUP:** Covenant `coaching.featured[0].detail` "state runner-up finishes" → "state
     finishes".
   - **SEMIFINAL / FINAL:** DD `record.seasonDetail[1].text` "the state semifinal" → "the state
     final" (SEMIFINAL lost, FINAL added).
   - **LOSS:** Gaston `record.seasonDetail[2].text` "and lost the 2025 final" → "and reached the
     2025 final".
   - **RANKED:** Latin `record.seasonDetail[0].text` "ranked 128th" → "128th".
   - **PRO:** Carmel `honors.honors[0].text` delete "(a draft prospect, not yet a pro)".
   - **HEDGE:** Carmel `national.nil[0].text` "described as among the first" → "among the
     first".
   - **BOUND (floor):** Cannon `pipeline.funnelNote` "as a floor" → "as exact".
   - **(p) gone:** Latin `honors.honors[1].text` delete "Liam McConaughy and " (count word
     "three" stays, so (n) passes).
   - **(p) new:** PD `coaching.worthKnowing` "as an assistant coach" → "as an assistant to
     Coach Field".
   - **(n):** Cannon `pipeline.realityCheck` "eight of the twenty-three" → "most of the
     twenty-three".
   - **(o):** any PD unit, append `*`.

   **(d) Calibrate on approved work, and record the result** in Implementation notes. Run
   each row without and with `--sports-markers`, inside a worktree at that merge; copy the new
   `scripts/plain_review.mjs` into each worktree's `scripts/` first (`ROOT` comes from the
   script's location), then `git worktree remove` it.

   | Area | Worktree at (merge) | Command (inside it) | Known result without `--sports-markers` |
   |---|---|---|---|
   | The Arts | `7c2f73df` (#476) | `--dir src/data/artsPrograms --base da0805fa --arts-markers --no-md --md-paths '^$' --check` | 0 |
   | Student Clubs | `2035e4e4` (#479) | `--dir src/data/clubsPrograms --layers --base d9de16de --clubs-markers --no-md --md-paths '^$' --check` | as recorded in plainsmall's Implementation notes |
   | After School | `19f63d0e` (#481) | `--dir src/data/afterSchoolPrograms --base 9d19c942 --md-paths '^$' --small-markers --check` | read it; record it (it includes the approved fixes-commit units) |
   | Sports, no change | working tree, Step 1 only | `--dir src/data/sportsPrograms --base HEAD --no-md --md-paths '^$' --sports-markers --check` | **0 rows, exit 0** |

   - The without-run must match the known result. Read every new hit from the with-run. A real
     past slip goes under Candidates. A class that is too tight is loosened only with a
     recorded reason, in the script's comments. Guard (p) is expected to fire on a few
     approved rows;
     read and record them, and loosen nothing for them. The Clubs row will show one: plainclubs
     Batch 1 removed Covenant Day's courtroom artist's name, an approved change (memory
     `student-names-athletes-only`).
   - **Default mode is unchanged.** Run the old and new script on the Arts row and `diff` the
     two `--out` files; they must be identical apart from the date line.

   (The `medallist` spelling-map entry is **not** part of Step 1: it would fail
   `check:spelling` until Christian is rewritten, so it runs in Batch 2's Step 4.)

2. **(a) Sweep, re-measure, and the fixes commit.** The sweep and the re-measure run in every
   batch; the fixes commit exists only in Batches 2 and 4. It lands **before** the worklist is
   generated, so the wording-pass guards compare against the fixed text.
   - **Rerun the bookkeeping sweep** (`BOOKKEEPING_RE`, Context) over every rendered Sports
     unit. Every hit must be in the "Research bookkeeping" table or its known false
     positives. A new hit is judged by the Decisions rule and added to the table before going
     on.
   - **Re-measure the cross-school claims** for this batch's schools ("Cross-school claims";
     the commit shares from each `funnel`). If a "false" one has become true, or a "true" one
     false, stop and report.
   - **Apply this batch's fact fixes, with Edit** (the hook sees each edit). Edit only the
     false clause; the rest of the unit is rewritten in the wording pass.
     - **Batch 2:** Catholic `national.scheduleNote` and `offered.footnote`.
     - **Batch 4:** DD `pipeline.realityCheck`.
   - **Check:** `git diff` shows only those clauses.
   - **Hand review.** Write `.claude/plans/plainsports-data/review-batch<N>-fixes.md`: a table
     of path, before, after and evidence (the other schools' data). Generate rows with
     `node scripts/plain_review.mjs --dir src/data/sportsPrograms --slugs <batch> --out <that file>`
     **without** `--check`; guards (n) and (h) may fire here by design, and the file records
     which.
   - **Commit** as "plainsports: batch <N> fixes — <what>". Record its SHA in "Batch
     progress"; Steps 4–5 of this batch run with `--base <that SHA>`.

   **(b) Generate this batch's worklist.**
   `node scripts/plain_review.mjs --dir src/data/sportsPrograms --slugs <batch> --worklist .claude/plans/plainsports-data/worklist-batch<N>.json`.
   Compare the per-school counts with the Context table (fixes-commit units stay on it). If
   they differ, `main` moved: use the regenerated list, and note it in Implementation notes.
   **Write `.claude/plans/plainsports-data/worklist-extra-batch<N>.json` by hand**, in the
   generator's format, listing this batch's extra units (the **+** rows of "Research
   bookkeeping", and HG `pipeline.rosterNote` in Batch 5). Batch 2 has no extra unit, so it
   has no extra file; Batches 1, 3, 4 and 5 each have one.

3. **Draft, measure, then apply** (plainsmall's method).
   - **Draft** to a scratch JSON keyed by `at`. Draft each template from the "Template
     wordings (as built)" table when it is filled, or from the Near-repeats default when this
     batch sets it.
   - **Measure** with a scratch script that runs the real `analyze` plus the Step 1 guard
     functions against the original.
   - **Check:** every capitalized word the before-text had is in the after-text (guard (p));
     grep the drafts for `*` (none may appear) and for a new straight `"` in a unit holding an
     inch mark.
   - **Apply** with an exact-match script that refuses an old literal it cannot find or finds
     twice. Build each template and each within-school repeat from one shared string in the
     draft file.
   - **Re-run the hook by hand.** A scripted write bypasses the hook. Run the Step 4 hook loop
     and fix any remaining batch unit with Edit, so the hook sees it.
   - **Rules for every unit:** the Decisions, the Style rulings, the Unit notes and every item
     of "Content that must survive" and "Ledger and Compare agreement". Same meaning, same
     hedges and conditions, same direction of every comparison and result. Sentences ≤30
     words, aiming for 15–20; units of 30+ words at grade ≤10.
   - **Quote delimiters.** Keep each string valid TS. These files mix single-quoted strings
     (curly `’` for apostrophes) and double-quoted ones (those holding a straight `"` or `'`).
     A straight `'` inside a single-quoted string must be escaped.
   - **Fill "Template wordings (as built)"** for every template this batch set.

4. **Measure.**
   - **Hook loop:** `for f in src/data/sportsPrograms/*.ts; do node scripts/check_plain_language.mjs --file $f; done`.
     After each batch, every remaining issue is in a later batch's school. After Batch 5,
     **0** remain.
   - **Review file and guards:**
     `node scripts/plain_review.mjs --dir src/data/sportsPrograms --slugs <batch> --base <this batch's fixes SHA, or the previous batch's English commit, or main for Batch 1> --allow .claude/plans/plainsports-data/worklist-batch<N>.json[,worklist-extra-batch<N>.json] --no-md --md-paths '^$' --sports-markers --out .claude/plans/plainsports-data/review-batch<N>.md --check`.
     It must exit 0, with every row reading `hook: pass`.
   - **Bookkeeping:** rerun the sweep. It returns no hit in this batch's schools other than the
     known false positives, and each census unit reads as its Treatment says.
   - **Batch 2 only, spelling:** after the Christian rewrite, add
     `"medallist": "medalist", "medallists": "medalists"` to `spelling.map` in
     `scripts/plain_language.json`. `npm run check:spelling` passes. For the negative test, put
     "medallist" back into Christian `honors.pros[0].detail`, confirm `check:spelling` exits 1
     naming that path, then restore the file and confirm `cmp` against a scratch copy is
     clean.
   - **Templates and repeats:** grep one shared phrase per template (T1–T8) and per
     within-school repeat touched so far. Every site set so far reads identically; T5, T7, T8
     are byte-identical to `main`.
   - **Ledger agreement:** for each "Ledger and Compare agreement" unit in this batch, the
     years, counts and Cup season are unchanged (diff the digit and count tokens by hand).
   - **Stray edits:** `git diff --name-only main -- src/ scripts/` lists only this and earlier
     batches' sports files, `scripts/plain_review.mjs` (from Batch 1) and
     `scripts/plain_language.json` (from Batch 2).
   - **Residuals:** put every row with an after-grade above 10 into "Residual units above grade
     10", with a one-line reason.

5. **Independent review.** Spawn one `general-purpose` subagent with the Agent tool. It never
   sees the drafting conversation.
   - **Give it:** the path(s) to this batch's review file(s); this plan's "Content that must
     survive", "How each field renders", "Ledger and Compare agreement", "Near-repeats",
     "Research bookkeeping", "Cross-school claims", "Unit notes", Decisions and Style rulings,
     plus `plainsmall.md` and `plainclubs.md` "Style rulings"; for Batches 2 and 4,
     `review-batch<N>-fixes.md` (is each fixed claim now true against every Sports file?); the
     batch's data files, every other Sports file (for cross-school checks),
     `src/components/SportsProgram.tsx`, `src/data/wellsFargoCup.ts`; for Batches 2–5, the
     earlier review files that set each template.
   - **Tell it to check every row for:**
     - meaning drift, or a strengthened or weakened claim;
     - a dropped hedge, condition, floor or narrowing word;
     - a result tier changed (title / runner-up / final / semifinal / loss), or a win turned
       into a loss's direction;
     - a recruiting status changed (offer / commit / signed / verbal / enrolled / transferred,
       walk-on / scholarship);
     - a published / not-published / not-found / does-not-exist swap;
     - a school claim, third-party figure or our derivation blurred into a published fact;
     - a name added or removed, a non-athlete student named, or a name attached to the wrong
       college, team or year;
     - a figure, score, record, ranking, season, date or count re-typed, or a count word turned
       into digits;
     - a statement that no longer agrees with the Cup ledger, `pointSources` or the funnel;
     - a referent made ambiguous by a split (two coaches, two athletes, two schools);
     - a cross-school claim the other files contradict, or a new comparison added;
     - a quote altered, a lowercase opener after a chrome label capitalized, or a `*` added;
     - a template that differs from its other sites;
     - a sentence that is now plainer but wrong.
   - **Its output:** it fixes each finding in the source file (the hook still applies), then
     re-runs Step 4. It returns a findings list: path, problem, fix.
   - **After it returns:** regenerate the review file, then append the findings under
     `## Independent review`. Record the count in "Batch progress".

6. **Checks.**
   - **Build:** `npx tsc -b`, then `npx vite build`.
   - **The build's later checks, by hand:**
     `npm run check:schema && npm run check:spelling && npm run check:flags && npm run check:cup && npm run check:sportsmatrix && npm run check:matrices && npm run check:schoolurls && npm run check:chrome && npm run check:runtime && npm run check:moneytext && npm run check:dates && npm run check:spans && npm run check:photos`,
     plus `npm run test:plain`. (Batch 1: `check:spelling` passes because the `medallist` entry
     waits for Batch 2.)
   - **`check:live` stale stamps are expected** only in `sports`, equal to the units rewritten
     so far. Record the counts (Phase 2's input) and confirm no other topic appears.
   - **Schema drift:** if `check:schema` drifts, run `npm run schema` and commit the doc. No
     drift is expected.

7. **Browser check.**
   - **Setup:** `npx vite preview` after the build. Headed Chrome via Playwright (memory
     `headed-chrome-via-playwright`). Do not wait on `networkidle` (memory
     `browser-check-networkidle-hangs`). Probe with `textContent` (memory
     `innertext-case-false-pass`), scoped to `#topic-sports`.
   - **For each batch school**, open `/school/<slug>/?topic=sports&lang=en`, open every Sports
     card, and confirm:
     - every rewritten unit renders (match the live module's text), including the pipeline's
       "The reality check" and "Ranked recruits" panels, "Season-by-season detail", and the
       "Worth knowing:", "What they didn't win:" and "Broadcast & game day:" lines, each reading
       on from its label;
     - no literal `*` appears anywhere in the Sports section;
     - the collapsed-card teasers are unchanged (no headline was edited);
     - the Wells Fargo Cup card is identical to `main` (headline, tiles, table).
   - **Phone width:** one look at 390px per batch on one school with every card open: no page
     overflow (or `npm run audit:mobile`).

8. **Commit and stop.**
   - **Stage explicit paths only.** Run `git status --short` first, and never `git add -A`.
     Stage the batch's data files; `.claude/plans/plainsports-data/worklist-*.json` and
     `review-batch*.md`; this plan, with "Batch progress" and "Template wordings" filled in;
     **Batch 1:** `scripts/plain_review.mjs`; **Batch 2:** `scripts/plain_language.json`.
     **Fixes commits (Step 2a):** only that batch's fixed data files and
     `review-batch<N>-fixes.md`.
   - **Commit and push.** Commit with `plainsports: batch <N> English — <schools>`. Push, then
     check that `git rev-parse HEAD` equals `git ls-remote origin feat/plainsports` (memory
     `git-push-silently-noop`). Do **not** open the PR.
   - **Report to the user:** the review file paths; the before/after counts; the residual
     units; the reviewer's findings and any fact flag; the template wordings this batch set;
     for Batch 1, the calibration result; the URLs from Step 7.
   - **Give the paste-in command for the next window:**
     - after Batches 1–4:
       `/implement plainsports — Batch <N+1>. Batch <N> English is approved<, with these rulings: …>.`
     - after Batch 5: set `status: english-done` and the INDEX row to *English shipped*. Then
       give
       `/implement plainsports — Phase 2. All five English batches are approved. Run only Phase 2.`

   **→ STOP after each batch.** On resume, put the user's rulings into "Style rulings" and their
   verdict into "Batch progress" *before* the next batch's Step 2. If the user asked for changes
   to a batch already built, make them, re-run Steps 4–6 for that batch, and amend its review
   file.

**→ STOP. After Batch 5, `/implement` ends its turn and waits.** Nothing below runs until the
user confirms all five batches.

### Phase 2 — Every other locale

**Scope:** the `sports` prose overlay in the nine `PROSE_TRANSLATED` locales (es, bn, ht, te,
fr, fa, it, hi, ar). No chrome catalog, no content overlay, no `metric-values`.

For the mechanism, see `.claude/docs/prose-translation-architecture.md`; the precedent is the
plainsmall Phase 2 implementation note. The locale traps in those docs apply unchanged: figures
copied char-for-char, `%` unspaced; lakh/crore regrouping and RTL isolates are render-layer,
never typed into `t`; searchable identifiers stay Latin; `fr` identifiers are guarded by
`check:fr`.

Five traps are specific to Sports:

- **Names and sport labels follow the reviewed predecessor.** Every person, college, team,
  conference and association stays in Latin script, as the predecessor has it. Sport names
  stay as the predecessor rendered them (NOTES.md "Sport names stay English"; `fr` keeps them
  English because "football" means soccer). Recruiting terms follow NOTES.md "Stage 3 —
  Sports" (es: "compromiso", "División I", Power 4 kept, NCISAA/NCHSAA/CISAA kept, varsity/JV
  kept, "promoción de ’19").
- **Units are never converted** (unitrevert, 2026-08-24): `150 lbs`, `138 lbs`, `77,737 sq
  ft`, `6'3"`, `6'10"`, `6′9″` stay char-for-char.
- **Scores, records, seeds and class marks carry over exactly:** `48–53`, `29–2`,
  `12–14 (5–5 in conference)`, `#1`, `No. 30`, `128th`, `’24`, `'27`, `4×`, `1000+`.
- **Result and recruiting tiers carry over.** A translation that turns a runner-up into a
  champion, a semifinal into a final, a verbal commitment into a signing, or a floor into a
  total fails review even when every figure matches.
- **Openers continue their chrome label.** "Worth knowing:" / "What they didn't win:" units
  read on from the label in each locale, as their predecessors do (Gaston's "every other
  program." included).

Steps:

1. **Snapshot the base work files** before splicing: for each locale,
   `git show main:src/data/overlays/work/sports.<lang>.json` into the session scratchpad.
2. **Splice.** For each locale, `node scripts/i18n_splice_work.mjs --lang <code> --topic sports`.
   Expect *added* = *dropped* = the final `check:live` stale count (**107**, unless a batch
   changed more). No verify flag is added, so there is no unpaired unit. If the counts are
   lopsided, stop and investigate.
3. **Translate each *added* unit as a revision of its reviewed predecessor.**
   - **Pairing.** Pair each added unit with the dropped unit at the same `at` path. Give the
     translator the old English, the old `t` and the new English.
   - **The instruction.** Revise the reviewed translation to say what the new English says.
     Keep terminology, register, name forms and reviewed choices wherever the meaning is
     unchanged. Split where the English now splits. Each template is translated once per
     locale and reused at every site.
   - **The key.** The final `t` is keyed to the **new stamp**, never to an index.
   - **Subagents.** Three `general-purpose` subagents of three locales each (es/fr/it,
     bn/hi/te, ht/fa/ar), each in its own scratch subdirectory, reading only its task file and
     writing only its own output (memory `parallel-locale-agents-collide`).
   - **The gate.** A scratch apply script gates every output before writing it (the plainsmall
     gate): the numeric-token multiset against the new English; the money/percent/year/`N+`
     multiset; no `*`; the ` · ` and `→` counts; no bidi controls and no non-Western digits;
     `t` ≠ English and a 0.4–2.5 length ratio; no English month or weekday outside a quote the
     English also quotes; a wrong-script scan (the Bangla danda is the known false positive; fa
     rejects Arabic ي/ك, ar rejects Persian-only letters); and every capitalized Latin name
     token of the English present in `t`.
4. **Rebuild** with `node scripts/i18n_build_overlay.mjs --topic sports --lang <code>`.
5. **Verify by stamp.** Run `check_work_integrity`, which reports false "violations" after a
   splice (memory `comparerows-shipped`). Then prove against the snapshot: every kept stamp has
   `text` and `t` byte-identical, and every new stamp is non-blank.
6. **Run the Phase 2 checks** (Verification below). Then: fill in Implementation notes; set
   `status: implemented` and `prs: [<n>]`, and the INDEX row to *Implemented* with the PR link;
   open the PR with `--body-file` (per-batch counts, links to the review files, reviewer
   findings, the three fact fixes, the template wordings, the guard calibration); squash-merge
   (pre-authorized), then `git checkout main && git pull`.

   **Do not deploy.** Report "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/sportsPrograms/*.ts` (12 of 13; not `charlotte-prep.ts`) | edit: 101 worklist units + 6 extra units; 3 fact-fix clauses in their own commits |
| `scripts/plain_review.mjs` | edit (Batch 1): `--sports-markers` (new classes in (h), BOUND extras, (n)), guard (p); header comment and usage |
| `scripts/plain_language.json` | edit (Batch 2): `medallist` / `medallists` in `spelling.map` only |
| `src/data/overlays/work/sports.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2): spliced and translated |
| `src/data/overlays/sports.{same 9}.json` | edit (Phase 2): rebuilt |
| `.claude/plans/plainsports-data/worklist-batch{1..5}.json`, `worklist-extra-batch{1,3,4,5}.json`, `review-batch{1..5}.md`, `review-batch{2,4}-fixes.md` | new |
| `.claude/plans/plainsports.md`, `.claude/plans/INDEX.md` | edit: progress, template wordings, rulings, notes, status |
| `.claude/docs/DATA-SCHEMA.md` | only if `check:schema` drifts (not expected) |

No skill or slash command changes, so `.claude/SKILLS.md` is not touched. No `CLAUDE.md` change.

## Verification

### Phase 1 — English (per batch)

- [ ] **Hook loop:** `for f in src/data/sportsPrograms/*.ts; do node scripts/check_plain_language.mjs --file $f; done`.
  Every remaining issue is in a later batch's school. After Batch 5, 0 remain.
- [ ] **Guards:** the Step 4 `plain_review.mjs … --sports-markers --check` exits 0; every row is
  `hook: pass`.
- [ ] **Batch 1 tooling:** each negative test failed on its planted fault with the right class
  (or guard) and `slug:path`, and the file was restored `cmp`-clean; the calibration runs are
  recorded and the without-flag results match; the Sports no-change run is 0 rows; the
  default-mode diff is empty; the worktrees are removed.
- [ ] **Spelling (Batch 2):** `check:spelling` passes with `medallist` in the map, and its
  negative test failed as expected.
- [ ] **Fixes (Batches 2 and 4):** the fixes commit holds only its named clauses;
  `review-batch<N>-fixes.md` records before, after and evidence.
- [ ] **Bookkeeping:** the sweep returns no hit in the batch's schools beyond the known false
  positives; every census unit matches its Treatment.
- [ ] **Templates and repeats:** every template reads identically at every site set so far, and
  matches "Template wordings (as built)"; T5, T7, T8 are byte-identical to `main`.
- [ ] **Ledger agreement:** the batch's "Ledger and Compare agreement" units keep every year,
  count and Cup season.
- [ ] **No asterisks:** no `*` in any changed unit (guard (o)).
- [ ] **Stray edits:** `git diff --name-only main -- src/ scripts/` lists only the expected files.
- [ ] **Residuals:** every after-grade >10 row is listed in "Residual units above grade 10".
- [ ] **Independent review:** done, and its findings fixed and recorded.
- [ ] **Build and checks:** `npx tsc -b` clean, `npx vite build` succeeds, the Step 6 list is
  green (incl. `check:cup` and `check:sportsmatrix`), and the `check:live` stale count covers
  only `sports`.
- [ ] **Browser:** the Step 7 items for this batch.
- [ ] **After Batch 5:** `npm run check:plain` shows sports **Flagged 0** (baseline 79), sports
  Grade >10 equal to the residuals plus the off-worklist units under 30 words above grade 10,
  and every other area unchanged from the Context baseline.

### Phase 2 — Locales

- [ ] **Resolution.** `npm run check:live && npm run check:runtime`: clean.
- [ ] **Digits.** `npm run check:digits`: no finding on a rewritten unit.
- [ ] **Figures and separators, per locale.** `npm run check:sepdrift -- --lang <code>` and
  `python3 scripts/check_figures.py --topic sports --lang <code>`.
- [ ] **Locale checks.** `npm run check:dates`, `check:moneytext`, `check:currency`, `check:fr`,
  `check:hi`, `check:fa`, `check:bidi`, `check:chrome`. Then
  `node scripts/check_work_integrity.mjs`, followed by the by-stamp proof (Phase 2 Step 5).
- [ ] **Leaks.** `npm run i18n:leaks -- --lang <code>`: no flag on a rewritten path (it prints
  `at` paths; match them against the worklist paths; memory `plainadmissions-shipped`).
- [ ] **Build.** `npm run build`: green end to end.
- [ ] **Render audit.** `npm run build && npx vite preview`, then
  `npm run audit:daterender -- --lang es --lang fa --lang hi` (9+ minutes) and
  `npm run audit:moneyrender`: no new finding in the Sports section compared with `main`.
- [ ] **Browser.** Providence Day, Charlotte Catholic, Covenant Day and Carmel Christian, in
  `es`, `fa` and `hi`, `?topic=sports`, every card open: every rewritten unit is in the locale;
  names, scores, records and units are intact; no stray `*`; ranges and scores read correctly in
  RTL (strip bidi isolates before probing; memory `ccdprofile-shipped`); the Cup card is
  unchanged.

## Risks

| Risk | Mitigation |
|---|---|
| A rewrite adds or drops a name | Guard (p) fails it; reviewer item; Phase 2 gate checks Latin name tokens |
| A result or recruiting tier drifts (runner-up → champion; verbal → signed; offer → commit) | TITLE / RUNNERUP / FINAL / SEMIFINAL / LOSS / COMMIT / SIGNED / VERBAL / OFFER / TRANSFER classes; item 4–5; reviewer |
| A floor reads as a total | BOUND with the floor extras; item 6 |
| Prose stops agreeing with the Cup ledger or the funnel | Guards (b), (g), (m), (n); the "Ledger and Compare agreement" table checked in Step 4 and by the reviewer |
| A template diverges between schools across batches | "Template wordings (as built)" table; Step 4 grep per template; reviewer gets earlier review files |
| A lowercase opener after a chrome label gets capitalized, or Gaston's "every other program." is dropped | Unit notes; reviewer item; browser check reads each line from its label |
| An inch mark pairs with a new straight quote | Item 10; Step 3 grep |
| New classes or guard (p) false-positive and block good rewrites | Calibrated on approved areas and a no-change run; loosen only with a recorded reason; stoplist for sentence-start words |
| A cross-school claim changes between planning and building | Step 2a re-measures; stop and report if a verdict flips |

## Open questions

- **Off-worklist extras and template rewrites.** **Default:** include the 6 extra units and
  rewrite templates at every site (Decisions). If the user prefers plainsmall's narrower rule,
  drop `worklist-extra-batch*.json`, keep off-worklist template sites byte-identical, and
  leave their bookkeeping for a later pass.
- **Deleted research steps** (Carmel "deeper pass", Trinity "should be carried"). **Default:**
  delete. The alternative is adding a dev-only field to Sports, which is a structural change
  and a separate plan.
- **Christian's 73% "highest" claim** is true by 0.7 points over Catholic. **Default:** keep
  (re-measured at Batch 2). If the user would rather not keep a margin that thin, the concrete
  form is "the highest share among the schools on this site, just ahead of Charlotte
  Catholic's 72%", which adds a figure and so lands in the Batch 2 fixes commit.
- **Words outside the jargon list** (mid-major, preferred walk-on, three-peat, blue-chip,
  differentiator, boilerplate, biennially, helmed). **Default:** handle them per the
  vocabulary register inside the changed units, and list them in Implementation notes as
  candidates for `plain_language.json`. Do not edit that file beyond `medallist`.

## Residual units above grade 10

*Filled in by `/implement`: path, after-grade, reason.*

| Path | After-grade | Reason |
|---|--:|---|
| *(Batch 1: none — every rewritten PD and Latin unit is at grade ≤10)* | | |

## Implementation notes

*Filled in by `/implement`, one section per batch, then Phase 2. Batch 1 opens with the
calibration results.*

### Batch 1 — tooling, calibration, Providence Day + Charlotte Latin

**Step 1 as built.** `scripts/plain_review.mjs` gains `--sports-markers`: the 15 new classes
exactly as listed in Step 1(a), `SPORTS_BOUND_EXTRA` (floors / minimums / "not a census" /
"understated" counted as BOUND), the borrowed `SPORTS_BORROWS` set, guard (n), and guard (p)
(`NAME_RE` / `NAME_STOP` / `holdsWord`). `classOn` gains the sports branch; the new classes
return `false` without the flag, so default behavior is unchanged. No class was loosened.

**Negative tests** (19, each on a scratch copy, run with the Batch 1 arguments plus
`--slugs <school>`, restored `cmp`-clean; every one exited 1 with its own class and
`slug:path`, and nothing else unless planted). Four of the plan's faults were too weak to
isolate their class and were replaced, recorded here as deviations:

| Class | Plan's fault | Why it could not fire | Fault used |
|---|---|---|---|
| SIGNED | Covenant `rosterNote` "signed with Davidson" → "chose" | the unit keeps "signed" ×1, "signing", "signees" | Covenant `record.seasonDetail[0].text` "before signing with UNC Charlotte" → "before choosing UNC Charlotte" (its only SIGNED token) |
| WALKON | Cannon `funnelNote` "as a preferred walk-on" | the literal is also in a source label (2 hits) | same unit, "Clemson as a preferred walk-on, and Division III" → "Clemson as a recruit, and Division III" |
| SCHOLARSHIP | DD `funnelNote` "scholarships" → "aid" | the unit also says "not scholarship athlete" | Cannon `coaching.worthKnowing` "to Division I scholarships" → "to Division I programs" |
| PRO | Carmel `honors.honors[0].text` delete "(a draft prospect, not yet a pro)" | "Draft Combine" stays, which is PRO | Christian `coaching.featured[0].detail` "played professionally for" → "played for" |

Two more were adjusted: TRANSFER's "has gone from Louisville" also entered STALE ("gone
from"), so the fault became "has left Louisville" (TRANSFER alone); and (p) new's "Coach
Field" passes by design, because "coach" and "Field" are already in the unit, so the fault
became "as an assistant coach to Roy Williams" ("Roy", "Williams" new). COMMIT, OFFER and
TITLE had no fault in the plan's list; one each was added (Cannon `rankedRecruits` "has
committed to" → "is headed to"; PD `realityCheck` "a D3 offer from" → "a D3 spot at"; Latin
`honors.honors[1].text` "state titles" → "state finishes"). SEMIFINAL → FINAL fails with
exactly its two planted lines.

**Calibration** (worktrees at each merge with the new script copied in; the two older ones
also needed `src/lib/flagVisibility.ts`, which #481 added; all removed afterwards):

| Area | Without `--sports-markers` | With | New (h) | New (p) |
|---|--:|--:|--:|--:|
| The Arts (`7c2f73df`) | 0 (matches) | 41 | 11 | 30 |
| Student Clubs (`2035e4e4`) | 295 (matches) | 626 | 11 | 320 |
| After School (`19f63d0e`) | 4 (the approved fixes-commit units: Cannon `verdict.strengths[4]` (n), CCD `dayInside.flags[4]` ×2 (f), CCD `dayInside.flags[0].text` (l)) | 12 | 4 | 4 |
| Sports, no change (`HEAD`) | — | **0 rows, exit 0** | — | — |

- **Every new hit was read; none is a past slip.**
  - (h), each read as a before/after pair: approved rewrites in other areas whose words
    happen to sit in a Sports class. Arts: a stage "floor" (BOUND), "appears" / "reported"
    in and out (HEDGE ×5), "professional" (PRO), "only", "outside source" (THIRDPARTY),
    "sign" (SIGNED), "Absent" (EXCLUDED). Clubs: the #479 rebuild of the Hickory Grove,
    Davidson Day and Covenant Day catalogs (SCHOLARSHIP ×4, COMMIT ×2, HEDGE ×2,
    EXCLUDED), plus Latin `clusters.rows[2].note` (HEDGE) and PD `affinity.leadership`
    (PRO). After School: "offered" (Prep), "appears" ×3 (DD watchouts), "loses" (Gaston
    `cost.aside`).
  - (p) fires on two approved kinds of change. Real name changes that were approved: the
    #479 rebuild of the Hickory Grove, Davidson Day and Covenant Day club lists (299 of the
    320), Cannon's removed third-party "Black affinity groups cited in reviews", Carmel's
    added "Timothy Project" sentence, plainarts' removal of a middle schooler's name
    (Latin `music.ladder[2].text`), and "North Star" (a metaphor rewritten as "guide").
    And capitalized words that start a new sentence but are not in `NAME_STOP` ("Hands-on",
    "None", "Results", "Instead", "Outside", hyphenated compounds such as "Blumey-based").
    As the plan says, nothing was loosened for (p); the drafter keeps such words lowercase
    or reuses one the before-text holds.
- **Default mode is unchanged:** the old and new script on the Arts row write identical
  `--out` files (`diff` empty).

**Step 2a.** The bookkeeping sweep returned 22 hits, all accounted for: the 18 census units;
Covenant `record.seasonDetail[0].text` "captured" (sports verb); "shown here" in Latin
`funnelNote`, CCD `funnelNote` and PD `rosterNote` (site mechanics; the PD one sits in the
Makemson sentence the Unit notes keep); Gaston `facilities.careNote` "not reachable"
(candidate, below). Batch 1 has no fixes commit; its cross-school claims (PD's Big South
list, Latin's care-model list) re-read true.

**Step 2b.** The regenerated worklist matches the Context table (PD 10, Latin 11).

**Adapted wording.** PD `record.seasonDetail[2].text`: the plan's "No published source
confirms…" enters UNPUBLISHED, which is the class the Treatment says to avoid, so it became
"No source confirms the 2024–25 season record yet." VERIFIED does not move (the regex never
matched "unconfirmed"). PD `national.scheduleNote`: "a sign of" enters SIGNED, so it became
"shows a program is chasing…".

### Candidates noticed, not acted on

- **Off-worklist cross-school claims:** Gaston `facilities.careNote` "Every peer school on this
  roster publishes a venue list" (Carmel, DD, HG, Prep and Trinity have no Facilities card);
  CCD `facilities.subhead` "more than any other school in this comparison"; DD
  `offered.subhead` "earlier than any other school in this comparison".
- **Gaston `facilities.careNote`** also holds "is not reachable" (research bookkeeping) and
  "This card is deliberately short" (site mechanics).
