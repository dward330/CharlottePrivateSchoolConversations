# Translation notes

Written as each stage goes, for the end-of-rollout review (see
`.claude/docs/prose-translation-es.md`). The point is to hand a reviewer a list of
known soft spots rather than an undifferentiated wall of text — **these are the
places to look first.**

Conventions that apply to every stage, then per-stage notes.

---

## Standing conventions (Spanish)

**Proper nouns stay English.** School names, division names (`Upper School`,
`Middle School`, `Lower School`), program names (`Winterim`, `Knights Serve`,
`Freedom School`), society names (`Cum Laude Society`, `Tri-M`), organisation
names (`Habitat for Humanity`, `Special Olympics`) and job titles as published
(`Assistant Head of School for EIB`). These are what a parent will see on the
school's own site and hear on a tour; translating them would make the research
harder to act on, not easier.

**Direct quotations stay in English, inside their original quotation marks.** The
research quotes school marketing copy deliberately — often to show exactly what a
school does and does not claim. Translating a quotation would misrepresent it as
something the school said in Spanish. Surrounding prose is translated; the quoted
span is not.

**Figures are never re-typed — including their separators.** A figure is copied
**char-for-char** from its English source: `20,642` stays `20,642`, `3.6 GPA`
stays `3.6`. Currency is handled at render time by `localizeMoneyText()`, never
here.

> **Corrected 2026-08-18.** This paragraph previously instructed the opposite —
> that Spanish decimal and thousands conventions applied to numbers written out
> in prose (`20,642` → `20.642`, `3.6` → `3,6`). That is now a defect:
> `scripts/check_sep_drift.mjs` (`npm run check:sepdrift`) requires every
> separator-bearing numeric token in a `t` field to appear verbatim in its
> English `text`, because a parent matches these figures against the school's
> own page. The rule postdates this note, and the ~178 drifted `es` tokens the
> checker still reports on `main` were written under the old guidance — they are
> a known open defect, not a licence to add more. Do not re-localize a separator
> inside a data string; the render layer owns presentation.

**Hedges are preserved literally.** This is the highest-risk part of the
translation and the reason the whole corpus wants review. Where the English says
*"encouraged, not required"*, *"school-reported"*, *"no methodology published"*,
*"we show the current published figure"* — the Spanish must carry the same
qualification with the same force. A hedge softened in translation turns a caveat
into a claim.

---

## Stage 1 — Student Clubs (493 strings, 7,044 words)

Landed 2026-07-27. Full coverage: 577/577 field sites across FIVE cards.

Student Clubs renders five cards from three modules: `clubsPrograms/<slug>.ts`
(affinity, service, honor societies) plus `clubClusters.ts` and
`clubCatalog.ts`. The first extraction pass only walked `clubsPrograms`, so two
cards shipped English. Their prose is now extracted under the `clusters.` and
`catalog.` path prefixes of the same overlay file.

### Terminology choices worth a second opinion

| English | Spanish used | Note |
|---|---|---|
| affinity group | grupo de afinidad | Standard in US-Hispanic school contexts; a Spain-Spanish reader may find it opaque. |
| honor society | sociedad de honor | Kept literal. No true equivalent institution exists in Spanish-speaking systems. |
| service hours | horas de servicio | Literal. "Horas de voluntariado" would be more natural but changes the meaning — these are school-tracked hours, not volunteering per se. |
| juniors / seniors | penúltimo curso / último curso | Avoided "júnior/sénior", which do not map. Verbose but unambiguous. |
| Upper / Middle / Lower School | left in English | Division names, per the standing convention. |
| GPA | promedio | `3.6 cumulative GPA` → `3,6 de promedio acumulado`. |
| practicum | practicum | Left as-is; used in Spanish academic contexts. |
| club | club | Standard loanword in Spanish. |
| esports | deportes electrónicos | Spelled out; "esports" also circulates. |
| flagship | emblemático / co-emblema | Avoided "buque insignia", too nautical for a school. |
| Named minimum | Mínimo con nombre propio | A hedge: the list is a floor, not a total. Verify the force carries. |
| externship | externship | No clean equivalent; the surrounding sentence explains it. |
| prefect | prefecto | Literal; the list of nine prefect roles stays English as published titles. |

### Specific soft spots

1. **`charlotte-latin:service.headline`** — "Service is deliberately *not*
   required" carries emphasis that Spanish word order handles differently. Used
   *"El servicio deliberadamente no es obligatorio"*. Check the emphasis lands.

2. **`charlotte-christian:service.programs[1].detail`** — the English ends *"Note
   the verb is encouraged, not required."* This is a hedge about a specific English
   word inside a quotation that stays English. Rendered as *"Nótese que el verbo es
   se anima, no se exige."* The referent is a bit awkward across languages; worth
   a look.

3. **`cannon:service.programs[0].detail`** and **`cannon:honors.flags[0].text`** —
   long block quotations left entirely in English per convention. A reader may
   expect *something* in Spanish here. This is deliberate, not an omission.

4. **`providence-day:service.programs[2].detail`** — the IDEALS acronym is
   expanded in English (International, Democracy, Environmental stewardship,
   Adventure, Leadership, Service). Translated the expansion but kept the English
   words in parentheses where the acronym letter depends on them. Clunky; a
   reviewer may prefer leaving the whole expansion English.

5. **`charlotte-country-day:affinity.flags[0].text`** — a count-discrepancy flag
   with four different numbers from three pages. Dense in English and denser in
   Spanish. Accuracy of each number should be checked against the English.

6. **"first in the country"** claims (`providence-day:service.headline`,
   `charlotte-latin:service.programs[1].detail`,
   `davidson-day:service.headline`) — rendered as *"el primer colegio independiente
   del país"* / *"el primer instituto de secundaria"*. "Del país" means the US;
   confirm that reads unambiguously to a reader outside it.

7. **`MOSAIC` acronym expansion** (`charlotte-country-day:affinity.strips[0].text`)
   — left English, since the letters only work in English.

8. **Six strings are intentionally identical to the English** — `Middle School`,
   `Lower School`, `Academic Conservatory Program`, `Seal of Biliteracy`,
   `Promoting Respect, Inclusion and Safety for Sexual Minorities`,
   `· Upper School`. These are proper nouns, not untranslated leftovers.

---

## Stage 2 — The Arts (553 strings, 12,843 words)

Landed 2026-07-27. Full coverage: 587/587 field sites. Nearly 3× Stage 1.

### Terminology choices worth a second opinion

| English | Spanish used | Note |
|---|---|---|
| Blumey Awards | left English | Proper noun — a named regional award. Category names ARE translated (*Mejor Actriz*), since those describe what was won. |
| finalist placement | puesto de finalista | A hedge the research leans on hard: PD claims "26 Blumey Awards" but only one is a win. The distinction must survive. |
| one-act (NCTC) | pieza breve | Standard theatrical term in Spanish. |
| stagecraft / tech theatre | tramoya / teatro técnico | "Tramoya" is the trade term; "teatro técnico" mirrors the course names. |
| wet darkroom | cuarto oscuro húmedo | Literal. "Húmedo" is the term of art for chemical processing. |
| thrust stage | escenario de proscenio invertido | Verbose but standard; no short Spanish equivalent. |
| choice-based (TAB) | por elección | TAB left as the acronym, expanded once. |
| honors ladder | escalera de honores | Consistent with Stage 1's "sociedad de honor". |
| Upper/Middle/Lower School | left English | Division names, per the standing convention. |
| square footage | converted to m² | **The only figures converted anywhere.** 45,730 sq ft → 4.248 m². Reconsider: this breaks the "never re-type a figure" rule. |

### Specific soft spots

1. **Square-footage conversion.** `45,730 sq ft` → `4.248 m²` and `20,500–20,800 sq ft`
   → `1.900–1.930 m²`. Every other figure in this corpus is left as authored. A
   reviewer should decide whether to convert or keep imperial — I converted because a
   Spanish reader cannot picture square feet, but it is inconsistent with the standing
   rule and the number is now *derived* rather than transcribed.

2. **Award category names.** *Best Actress* → *Mejor Actriz*, *Best Featured
   Performer* → *Mejor Intérprete Destacado/a*. Gendered in Spanish where English is
   neutral, so the translation picks a gender per named recipient. Check the
   agreements against each name.

3. **`providence-day:theatre.honestContext`** — the load-bearing hedge of the whole
   card: the school claims 26 awards, exactly one is verifiable. Rendered as *"suma
   nominaciones y puestos de finalista junto con los premios"*. This must not soften.

4. **"FINALIST — not nominee"** (`charlotte-christian:theatre.ledger`) — the English
   uses caps for emphasis on a distinction that carries the whole claim. Kept as
   *"FINALISTA — no nominada"*.

5. **`charlotte-latin:visual.honestContext`** — a methodology caveat about reading
   award levels out of image filenames. Long, technical, and the kind of hedge that
   degrades easily. Worth a careful read.

6. **Recorder Karate** (`charlotte-country-day:ladder`) — a program name left English
   inside a translated sentence; reads oddly but it is what a parent will see.

7. **Play and musical titles stay English** throughout (*The Crucible*, *Into the
   Woods*, *Enrique V* is the exception — Shakespeare has established Spanish titles,
   so *Henry V* → *Enrique V* and *Julius Caesar* → *Julio César*). That inconsistency
   is deliberate but arguable.

---

## Stage 3 — Sports (636 strings, 9,749 words)

Landed 2026-07-27. Full coverage: 888/888 field sites — the most of any topic.

**Print-outs caught six misclassified fields across two passes.** `since` was
skipped as a "numeral / short date" and `tag` as a "short badge code"; both are
actually phrases — `since 2002`, `long-tenured`, `15+ years`, `2 OF 3 YRS`,
`meet-scored`, `Statewide, 1 per sport`. A second print then caught `meta` ("built 2012–13", "53,000 sq ft, 2001",
"renamed 2025"), `date` ("May 2023", "July 1, 2025") and season names — all
phrases with figures embedded rather than bare codes.

`value` needed splitting by path rather than a blanket rule: the stat strips carry
bare figures ("27", "66") that must never be re-typed, while the coaching and
national cards use short phrases ("24 yrs", "HOF", "5 straight"). Season names are
likewise resolved at `offered.seasons[].name` only, so the sport names beneath them
stay English.

719 -> 888 field sites across the two corrections. Figures inside every translated
phrase are preserved; only the surrounding words move.

### Terminology choices worth a second opinion

| English | Spanish used | Note |
|---|---|---|
| varsity / JV | varsity / JV | Left English. No Spanish equivalent, and a parent hears these words on a tour. |
| commit / commitment | compromiso | Consistent throughout; "el estudiante se compromete". |
| Division I, Power 4 | División I, Power 4 | Division translated, Power 4 left — it is a named conference grouping. |
| NCISAA / NCHSAA / CISAA | left English | Association acronyms, expanded once each. |
| state title | título estatal | Literal. NCISAA is a private-school association, which the prose says explicitly. |
| athletic trainer | fisioterapeuta deportivo | Closest functional equivalent; the US "athletic trainer" role has no exact Spanish analogue. |
| strength & conditioning | fuerza y acondicionamiento | Standard in Spanish sports contexts. |
| Class of '19 | promoción de ’19 | Consistent with Stage 1's "penúltimo curso" handling. |
| sack, touchdown, quarterback | left English | American-football terms with no Spanish currency. |
| NIL | NIL | Left as the acronym; explained by surrounding prose. |
| pounds (wrestling weights) | converted to kg | 150 lbs → 68 kg. See soft spot 1. |
| square feet | converted to m² | Same as Stage 2. See soft spot 1. |

### Specific soft spots

1. **Unit conversions are now in two stages and want a single ruling.** Stage 2
   converted square footage; Stage 3 converts both square footage *and* wrestling
   weight classes (150 lbs → 68 kg, 175 lbs → 79 kg) and heights (6'3" → 1,90 m).
   These are **derived numbers, not transcribed ones** — the standing rule says never
   re-type a figure. A reviewer should decide once, for the whole corpus: convert
   imperial units, or keep them as published. I converted because a Spanish reader
   cannot picture feet or pounds, but I am not confident it is right.

2. **`providence-day:pipeline.funnelNote`** — the "floor, not a ceiling" hedge, plus
   the distinction between an *offer* and a *commitment* (one recruit can hold eight
   offers and make one commitment). Both carry the card. Rendered as *"un suelo, no un
   techo"*.

3. **`cannon:pipeline.rosterNote`** — *"This is the most honest number available, not
   a census"*, explaining that the school's site renders client-side with no indexable
   text. A methodology caveat about **why** the number is incomplete; easy to flatten
   into a plain disclaimer.

4. **`davidson-day:record.headline`** — *"This is a program in visible decline."* A
   blunt editorial judgment about a real school. Rendered as *"Es un programa en
   declive visible."* Same force, no hedging added.

5. **Win–loss records and scores are never re-typed** — `12–1`, `42–39`, `69–59`,
   `23–7` all stay exactly as authored. Only surrounding prose is translated.

6. **`charlotte-christian:pipeline.rankedRecruits`** — the Stephen Curry counter-example
   (no major-conference offer, 31 point guards ranked ahead of him). The *inverse*
   framing is the point; check it survives.

---

## Stage 4 — After School (657 strings, 9,550 words)

Landed 2026-07-27. Full coverage: 779/779 field sites.

**First stage where the skip audit ran BEFORE translating** rather than after a
print-out caught something. It paid for itself immediately, flagging two
misclassifications that would otherwise have shipped English inside Spanish cards:

- `dayInside.rhythm[].name` — classified as a proper noun, actually phrases:
  *"Collected at the door"*, *"Walked over"*, *"Independent"*,
  *"Snack → class → dismissal"*.
- `cost.fees[].value` — classified as a numeric figure, actually mixed:
  *"$80 / student"*, *"not published"*, *"none published"*, *"waived"*,
  *"25% off lowest rate"*, *"23 Sep & 20 Jan"*.

Both resolved with path overrides in `scripts/i18n_fields.mjs` rather than blanket
rules, so the bare figures elsewhere (`$50`, `$80`, `$19 / hr`) still skip. This is
the same shape as Stage 3's `value` split: the leaf name is right in one location
and wrong in another, and only the path can tell them apart.

### Terminology choices worth a second opinion

| English | Spanish used | Note |
|---|---|---|
| drop-in | acceso libre | Used throughout for the no-contract model. "Sin cita previa" was rejected as clinical; "drop-in" recurs constantly here and wants one stable rendering. |
| Extended Day / Hawks' Club / Clubhouse / Bridge Care / Beyond the Bell / ASP | left English | Program proper nouns, per the standing convention. |
| after-school care | cuidado extraescolar | Standard. "Programa extraescolar" used where the sense is the program rather than the supervision. |
| enrichment (class/catalog) | enriquecimiento | Literal. A calque, but it is the term US-Hispanic school communications use. |
| carpool | carpool | Left English — it names a specific, signposted physical procedure at these schools. |
| snack | merienda | Consistent throughout. |
| late pickup fee | cuota / penalización por recogida tardía | "Penalización" where the English frames it as punitive ("steep", "punitive"), "cuota" where neutral. |
| staff-to-child ratio | proporción de personal por niño | Verbose but unambiguous; "ratio" alone reads as jargon. |
| teacher workday | día de trabajo docente | Literal — no Spanish-system equivalent exists. |
| homework block | bloque de tareas | "Deberes" is Spain-Spanish; "tareas" is the US-Hispanic default. |
| tier (pricing) | tramo | Consistent across all six schools' rate cards. |
| JK / TK / JrK / TT | left English | Grade-level codes as published, like `LS` / `MS` / `US`. |
| cohort-differentiated | diferenciado por cohortes | Literal; the quotation that supports it stays English. |

### Specific soft spots

1. **Time-of-day formatting was left US-style throughout** — `3:00 p.m.`,
   `2:55`, `1:30–4:30`. Spanish convention would be 24-hour (`15:00`), but these
   are figures a parent matches against the school's own published bell schedule
   and rate card, so re-typing them risks exactly the drift the standing figures
   rule exists to prevent. Consistent with treating tuition the same way. **Worth
   a ruling alongside the unit-conversion question from Stage 3** — both are the
   same underlying question about derived vs transcribed numbers.

2. **No unit conversions were needed in this stage**, so the Stage 3 imperial-units
   question is still open and still unanswered. Nothing here forces it.

3. **`charlotte-latin:cost.cliffNote` and the `providence-day` gap flag** — both
   turn on a specific number of minutes (85 minutes, ten minutes) being paid for
   or unexplained. The arithmetic carries the point; check the minutes survived.

4. **`charlotte-latin:cost.anomalyNote`** (string 184) — the densest paragraph in
   the stage: four dollar figures, a linear-pricing argument, and a hedge that
   ends *"which favours 'real'"*. It concludes the published number is probably
   correct rather than a typo — a genuinely load-bearing qualification that is
   easy to flatten into "this is an error".

5. **`charlotte-christian` rate-increase percentages** (strings 315, 353) — five
   percentages in one sentence (+32/52/48/37/35%). Per the whole-number-percent
   convention these stay as authored; verify none drifted in translation.

6. **`davidson-day` is almost entirely hedges.** Nearly every string qualifies an
   archived 2020 source against a live 2026 site — *"unconfirmed for 2026-27"*,
   *"from the 2020 capture"*, *"six years old"*, *"none of it is confirmed"*.
   This school's card is the highest-risk in the stage: soften one hedge and
   six-year-old data reads as current. The `15:1` ratio quotation is the sharpest
   case — the school's own self-criticism, left English inside Spanish prose.

7. **`cannon:cost.staleFlag`** (strings 520–521) — the flag label is the single
   word *"stale"*, rendered *"desactualizado"*. A one-word flag carrying a
   year-out-of-date warning; check it reads as strongly in Spanish.

8. **Long block quotations left entirely English** — strings 208, 340, 453, 534,
   631. Each is a school's own marketing copy quoted deliberately, sometimes to
   show precisely what the school does and does not claim. Per convention these
   are not translated; a reader may expect Spanish here. Deliberate, not an
   omission.

9. **Enrichment class *descriptions* are translated; class *names* are not** —
   the names live in a skipped field as published (`Chess`, `Mad Science`,
   `Beyond the Bell` classes with named providers). Provider names inside the
   translated descriptions also stay English (`BrickEd`, `Carolina Soccer
   Factory`, `Le Petit Ballet Co.`). Intentional, and worth confirming it reads
   as deliberate rather than half-finished.

---

## Stage 5 — College Support (902 strings, 17,492 words)

Landed 2026-07-27. Full coverage: 1089/1089 field sites. **The largest and
highest-stakes stage** — admissions outcomes, acceptance lists, counselor
ratios, and a very high density of hedges about conflicting figures.

The skip audit ran first and caught the same shape Stage 3 hit: `value` is a
bare figure in `outcomes.stats` but a phrase in the counseling and transcript
strips — `"No rank"`, `"Not published"`, `"Quintiles"`, `"9th grade"`,
`"0.5 credit"`, `"18+ yrs"`, `"25 AP + IB"`. Split by path, so the phrases
translate and the numerals round-trip untouched.

### Terminology choices worth a second opinion

| English | Spanish used | Note |
|---|---|---|
| School Profile / Academic Profile | left English (`el profile`) | A specific named document every admissions office reads. Translating it would break the link to what a family actually requests by name. |
| acceptance list vs matriculation list | lista de admisiones / lista de matriculaciones | **The single most load-bearing distinction in this stage.** Nearly every school's caveat turns on it. Kept rigidly consistent. |
| enrolled / matriculated | matriculado | One verb for both, since Spanish does not carry the distinction and the English uses them interchangeably here. |
| Class of 2025 | promoción de 2025 | Consistent throughout. |
| seniors / juniors | alumnos de último curso / de tercer curso | Verbose but unambiguous, per Stage 1. |
| 9th grade | noveno grado | Numerals spelled out where English did, e.g. `9th grade` → `noveno grado`. |
| quintile table | tabla de quintiles | Literal; the mechanism is explained in surrounding prose. |
| weighted / unweighted GPA | promedio ponderado / sin ponderar | Standard. |
| quality point | punto de calidad | Literal calque; no Spanish equivalent exists. |
| most rigorous | left English in quotes | It is the Common App's term of art, quoted as such. |
| test-optional | test-optional | Left English — a named US admissions policy with no Spanish equivalent. |
| merit scholarship / merit aid | beca por méritos / ayuda por méritos | Distinguished from need-based aid, which the Financial Aid stage will cover. |
| Commended / Semifinalist / Finalist | con mención / semifinalista / finalista | National Merit tiers; the program name stays English. |
| learning specialist | especialista en aprendizaje | Literal. |
| 504 plan, IEP | left English | Named US legal instruments. |
| HBCU | HBCU | Acronym kept; surrounding prose explains it. |
| rep visits | visitas de representantes | "Representantes universitarios" on first use per card. |
| spike (admissions) | perfil destacado | No Spanish equivalent for this admissions-jargon sense. Verify it reads naturally. |

### Specific soft spots

1. **Currency was normalised late.** Four strings originally rendered `$23
   million` as `23 millones de dólares`. Corrected to `$23 millones` so
   `localizeMoneyText()` still owns presentation and the figure round-trips like
   every other. Worth confirming none was missed.

2. **`charlotte-latin:transcript.flags[2].text`** — the unremoved internal
   editorial note in Latin's live PDF (*"We'll need to somehow check to make
   sure all these students are still here, yes?"*). Quotation left English per
   convention; the surrounding judgment ("a proofreading lapse in the one
   document every admissions office reads") is translated. The English quote
   inside Spanish prose is deliberate.

3. **Every school's `outcomes.caveat`** is the highest-risk string in its card —
   each explains that an acceptance list is *not* a matriculation list, in
   different words, with different asterisk semantics. Softening any of them
   turns a caveat into a claim about where students actually go. Read all six
   together and check they carry equal force.

4. **`cannon:outcomes.scholarshipsNote`** — draws a hard line between college
   merit money and the school's own inbound tuition assistance ("the two must
   not be conflated"). The distinction is the whole point of the note.

5. **`charlotte-country-day:outcomes.tierNote`** — states that no Class of 2026
   student enrolled at an Ivy, then immediately says the prior class enrolled at
   five, and calls it "a real year-over-year swing rather than a data artefact".
   Both halves must survive.

6. **`cannon:transcript.flags[0].text`** — AP exams are OPTIONAL at Cannon, so
   its 92% is "not directly comparable" with schools that mandate them. That
   single comparability hedge is what stops a reader ranking six schools on one
   number. Also `charlotte-christian` and `charlotte-latin` state the opposite
   (mandatory) — the contrast must stay legible across cards.

7. **Ratio strings** (`~36:1`, `~1:99`, `~1:28`) — several are explicitly
   *derived by the researcher*, not published, and several note that the honest
   measure is the all-grades figure rather than the senior-only one. Latin,
   Christian, Country Day, Cannon and Davidson Day each carry a version of this.
   The word "derivado" must not drop.

8. **`davidson-day:transcript.flags[1].text`** — *"Unpublished is not the same
   as zero"* about National Merit. A precise epistemic distinction rendered as
   *"No publicado no equivale a cero"*. Check the force.

9. **Decimal separators** — GPA figures are Spanish-style (`4,467`, `3,891`) per
   the standing convention, while SAT/ACT scores stay bare (`1445`, `31`). Both
   appear in the same sentence in several quintile notes, which looks
   inconsistent but is correct: one is a decimal, the other is not.

### Stage 5 — post-print-out corrections

A print-out of Providence Day / College Support caught four leaks the checks
missed. Recorded because each is a distinct shape:

1. **`sourceLabel()` matched only the American spelling.** The Arts and After
   School say "Verdict synthesized"; College Support says **"synthesised"**.
   The Stage 4 fix therefore covered two topics and silently skipped the third.
   Now matched with `/synthesi[sz]ed/`. A one-character difference between data
   files defeated a helper written specifically to catch that string.

2. **`PERCENTILE_COLS`** — the SAT/ACT table headers (`10th 25th 50th 75th 90th
   Mean`) were a module constant, the same shape as After School's `FLAG_LABEL`.
   Now `tables.pct*` / `tables.mean`.

3. **`{shown.length} shown`** on the acceptance-list filter — interpolated JSX,
   the shape that hid After School's class count.

4. **`outcomes.stats[].value` was misclassified.** It was left as a skip on the
   reading that it held only bare figures — but it also holds **`8 of 8`,
   `5 of 8`, `3 of 8`, `63 of 64`**, where "of" is a real English word. The skip
   audit passed it because those values are mostly digits. Reclassified as
   prose; the currency and percentage values beside them round-trip unchanged.
   Coverage 1089 -> 1113 field sites.

5. **`outcomes.buckets[].tier` was misclassified**, found in the same print-out
   round. Skipped as "proper noun", and three of its five values are —
   `Ivy League`, `Power Four`, `“Ivy Plus”`. But two are descriptive phrases:
   **`Top-75 National Universities`** and **`Top-75 Liberal Arts`**. Now prose;
   the proper nouns round-trip identical. Coverage 1113 -> 1143.

   This is the third field in this topic with the same shape — a classification
   right for most of its values and wrong for a few. `value`, `tier`, and
   `outcomes.stats[].value` all needed splitting. **A leaf name describes a
   field's typical value, not all of them**, and the audit's heuristics judge
   the typical case.

The pattern across stages 4 and 5 is now unambiguous: **the checks catch data
problems, and the print-outs catch component problems.** Three of these four
were English living in a component or constant the overlay layer cannot reach.

---

## Stage 6 — Course Offerings (1,848 strings, 16,054 words)

Landed 2026-07-27. Full coverage: 2956/2956 field sites — by far the most field
sites of any stage, because course titles and tags repeat across six schools.

**Both Stage 5 lessons were applied BEFORE translating**, and both paid off:

1. **Read the component first.** `CourseOfferings.tsx` had four hardcoded
   strings, two of them **aria-labels** — screen-reader text that no print-out
   can ever reveal. That check found something the review process structurally
   cannot.

2. **Enumerate a field's values; don't read its leaf name.** `tag` has 70
   distinct values: 32 grade codes (`Gr 9–12`, `TK–Gr 5`) and **38 real words** —
   `Required`, `Elective`, `Semester`, `Fall`, `Audition`, `Pass/Fail`, `Weekly`,
   `Zero Hour`. Classifying by the codes would have shipped all 38 in English.

The residual detector then caught the biggest gap: `description`, `teaser` and
`notPublished` were unclassified, so the first extraction silently dropped 948
strings and 13k words. **Classifying them also raised The Arts from 641 to 659
field sites** — `teaser` had been missing there too, unnoticed since Stage 2.

### Course-title policy (project owner's decision)

Translate plain descriptive titles; keep anything a family must match against
the school's own published catalog. 378 titles kept as published:

- **AP / IB course names** — formally registered with the College Board and IBO
- **Level-numbered sequences** — `English 6`, `Algebra I`, `Latin III`
- **Branded names** — `Tech Tank`, `IDEAS@PDS`, `Learning Loft`, `ThinkTank`

Descriptive titles translate: `Music` → `Música`, `The Amazing Human Body` →
`El asombroso cuerpo humano`, `Contemporary Global Issues` → `Cuestiones
globales contemporáneas`.

### Terminology choices worth a second opinion

| English | Spanish used | Note |
|---|---|---|
| Honors (as a tag/suffix) | Honors | Left English. It is a formal course-level designation that appears on the transcript, like AP. |
| Semester / Year (tag) | Semestral / Anual | Adjectival, matching how the tag reads beside a title. |
| Pass/Fail | Apto/no apto | Standard Spanish academic phrasing. |
| Zero Hour | Hora cero | Literal; the surrounding description explains the 7 a.m. slot. |
| Language Arts | Lengua y literatura | The US subject name has no direct equivalent. |
| Social Studies | Ciencias sociales | Standard. |
| Advanced Topics (Cannon) | left English | A school-designed course tier, like AP — `AT` is its transcript tag. |
| Signature Learning Experience | left English | Cannon's own named capstone mechanism. |
| Winterim / Senior Externship | left English | Named programs. |
| Bible / Biblical Studies | left English | Charlotte Christian's department name as published. |
| study skills | técnicas de estudio | Literal. |
| makerspace | makerspace | The loanword is standard in Spanish ed-tech contexts. |

### Specific soft spots

1. **Departments named after school brands** — `IDEAS@PDS`, `iKNIGHTS`,
   `Knights Knews`, `MidKnight Knews`, `UKnight Worship` — kept English. Several
   are puns on the school mascot that do not survive translation at all.

2. **`charlotte-latin` Upper School descriptions are researcher-written**, not
   school copy: Latin publishes titles without descriptions, so every one reads
   "The junior-year survey of American literature." They are uniform by
   construction, and the Spanish is uniform to match. Check that reads as
   deliberate.

3. **Prerequisite grade thresholds** (`requires 90 in Algebra I`, `87 in Honors
   Precalculus`) — these are US percentage grades, not Spanish 1–10 marks.
   Left as figures per the standing rule, but a Spanish reader may misread `90`
   as a scale they know. Worth a reviewer's judgment.

4. **`Age 2 – Grade 4`** → `2 años – Grado 4`. The only `grades` value where the
   English word is an age rather than a grade band.

5. **Reading-list titles stay English** (`The Great Gatsby`, `Of Mice and Men`,
   `Beowulf`) — a student reads them in English here. But four canonical works
   were given their standard Spanish titles where the Spanish name is the one a
   Hispanophone reader knows: `1984`, `El extranjero`, `El gran Gatsby`,
   `Frankenstein`. That inconsistency is deliberate but debatable.

### Stage 6 — post-print-out corrections

The print-out caught two leaks in the very component I had read first, plus one
infrastructure bug the print-out could not have shown:

1. **`All` on the department tabs** — the word sits alone on its own JSX line,
   so the grep that found the other four strings (which matched `>text<` on one
   line) walked straight past it.

2. **`16 courses — scroll for full list`** — built from **template literals**
   (`` `${total} ${total === 1 ? 'course' : 'courses'}` ``), not a quoted
   phrase, so no string-literal search could see it. Now uses i18next `count`.

   Both are a lesson about the *method*, not the field: reading a component is
   only as good as the pattern used to read it. A literal-string grep misses
   bare identifiers and composed strings.

3. **`import.meta.glob` at module scope broke the build-time checkers.**
   Course Offerings is one module behind an accessor, so `check_translations.mjs`
   imports it directly — and plain Node cannot parse `import.meta.glob`. The
   checker reported **`0/0 field sites` for a fully-translated topic**, which is
   the Stage 1 failure exactly: a silent `catch` turning a real error into an
   apparently-empty topic.

   Fixed twice over: the glob is now deferred inside a function (still a
   build-time transform, so runtime behaviour is identical), and **both**
   `check_translations.mjs` and `i18n_extract.mjs` now log and set `exitCode = 2`
   when an ACCESSOR topic fails to import instead of silently returning
   `undefined`.

---

## Stage 7 — Financial Aid deep-dive report (571 strings, 9,630 words)

Landed 2026-07-28. Full coverage: 716/719 field sites (the 3 shortfall is one
empty source string occurring at three paths — it correctly stays empty).

**The most money-dense and most hedge-dense corpus in the rollout.** Nearly
every figure carries a caveat about its year, its units, or its accounting
basis. A figure-integrity pass over all 571 strings found exactly one flag,
which was a false positive (`2–4.5%` → `entre un 2% y un 4,5%`, same values,
more explicit phrasing).

Reading the component on the RENDER PATH rather than grepping it found six
hardcoded strings a literal search could not see:

- the chart legend `prior year` / `current` as **bare JSX text**
- `SOURCE` as a **default parameter value**
- `SECTION nn` and `Qn` built from **template literals**
- the meters caption as a **wrapped multi-line paragraph**

Enumerating values before classifying caught three mixed fields — `when`
(`15 Jan` but also `Every year`, `Not published`), `gift` (`$220K` but also
`Early Ed`, `Lower`, `Acclaim`), `figure` (`10×` but also `2 wk` and `—`).
The residual detector then found 13 unclassified paths including the **49
parent-facing questions** that are the entire point of the last section.

### Terminology choices worth a second opinion

| English | Spanish used | Note |
|---|---|---|
| need-based aid | ayuda por necesidad | Consistent throughout; the distinction from merit money carries the whole report. |
| merit scholarship | beca por méritos | Kept distinct from `ayuda`, since several schools state they offer one and not the other. |
| need-blind / need-aware | left English | Named US admissions terms. One school uses `need-blind` in a direct quote; the report explicitly declines to apply either label elsewhere, and that refusal must survive. |
| award / grant | ayuda | One word for both. Spanish has no clean pair, and the English uses them interchangeably. |
| average vs median | media vs mediana | **Load-bearing.** Several schools publish only an average; the report repeatedly warns it must not be read as typical. |
| enrolment deposit | depósito de matriculación | Literal. |
| tuition remission | exención de matrícula | Standard. |
| Tuition Refund Plan / Tuition Protection Program | left English | Named products a family signs up for. |
| Clarity / SSS by NAIS | left English | Platform names. |
| Opportunity Scholarship | left English | A named NC state programme. |
| all-in estimate | estimación total | The report's own term for the assembled figure. |
| ceiling (on awards) | techo | Literal and unambiguous. |
| unpriced | sin precio | Consistent; it is a status in the component grid. |

### Specific soft spots

1. **The three framing cards repeat across all six schools** — `Unpublished ≠
   deficient.` / `Published ≠ current.` / `K–12 aid only.` These set the
   epistemic frame for the whole report. Rendered as `No publicado ≠
   deficiente.` etc. Check the `≠` reads as intended in Spanish.

2. **`charlotte-latin:...withdrawal obligation`** — flagged in the English as
   *"the single most consequential unpublished item in this report"*. That
   ranking claim must not soften.

3. **Every "not retrieved" vs "not published" distinction.** The report is
   scrupulous that a document its tooling could not open is NOT a school
   failing — `no recuperado` vs `no publicado`. Several strings turn entirely
   on this, e.g. Latin's document library and Providence Day's missing rate
   archive. Collapsing the two would libel the schools.

4. **`cannon:...$3,000 vs $26,000`** — the report states two school figures do
   not reconcile and declines to pick one. Same for Providence Day's
   `$13,026` discrepancy across one document.

5. **The unit-change warning** (`students` vs `families`) at Providence Day —
   the report refuses to read 16% → 21% as growth. `Este informe renuncia a
   conciliarlas.`

6. **`—` as a payment-plan figure** at Davidson Day renders as an em-dash with
   the label `El menú completo no está publicado`. Deliberate.

7. **Clock and date formats** follow the standing conventions: dates are
   Spanish-style (`1 nov 2025`, `15 feb 2026`), currency keeps `$` and US digit
   grouping so `localizeMoneyText()` owns presentation.

---

## Stage 8 — ingested `src/content` prose (27 blocks, 1,061 words)

Landed 2026-07-28. **The final stage; `PROSE_TRANSLATED` now includes `'es'`.**

### The surface was measured three times and shrank twice

| Claim | Words | Why it was wrong |
|---|---|---|
| Rollout doc, original | ~39k | Right topic, but counted prose the report card replaces |
| My first measurement | 312,534 | Counted files on disk, not the render path |
| After dead-topic filter | 46,992 | Still counted card-replaced sections |
| **Actual** | **998** | Deep Dive prose is replaced for all six schools |

Two findings drove the collapse:

1. **The Deep Dive Report prose is dead.** All six schools have an entry in
   `financialAidReports.ts`, so `FinancialAidReportCard` renders instead —
   36,419 words Stage 7 already translated in structured form.

2. **Student Clubs has nothing left.** I had reported Cannon as a gap with no
   `clubClusters`/`clubCatalog` entry. Wrong — it is keyed `cannon: CANNON` in
   both maps, and my check grepped for `'cannon'` while object keys are written
   bare. The same bug let Cannon's 7,164-word Deep Dive body through as
   translatable. Fixed by parsing slugs from the map literal.

### What remains, and what deliberately stays English

The 998 words are the **Tuition History** card: snapshot notes, the
5.0%-increase explanation, the discontinued early-childhood options.

**26 quoted source citations round-trip byte-identical** — verified by pairing
quote marks in order rather than regex-matching, which had produced three false
positives by pairing one citation's closing quote with the next one's opening.
Rate tables and Wayback quote blocks are never extracted, so they miss by
construction and stay English. A family must be able to match them against the
school's own archived page.

One deliberate exception to the decimal-comma convention: block 10 quotes the
school's published **"5.0%"** claim. Our own prose says `5,0%`; the quotation
keeps the school's own punctuation, because misquoting a source is worse than a
locale inconsistency.

### Mechanism

Keyed by **content hash**, not field path — ingest regenerates this layer and
positional keys renumber when a sub-section is inserted. Sections are split into
blank-line blocks (one section body ran 7,164 words, not a reviewable unit).
A block the pipeline reorders still resolves; a block it *edits* misses and
renders English, the same safe failure the `src/data` overlays have.

Verified by a **runtime resolution test**: 18/18 blocks resolve through the
real code path, and a live section from disk localizes end-to-end.

### Two leaks the print-out caught (2026-07-28)

The card body rendered Spanish on the first pass, but two English strings
framed it — neither reachable by translating section bodies alone:

1. **Sub-section headings.** `SchoolDetail.tsx` renders `<h3>{s.subtopic}`
   directly, so `SOURCE SNAPSHOTS`, `TUITION BY BAND AND SCHOOL YEAR` and
   `NOTE ON THE PUBLISHED 5.0% INCREASE` sat in English above Spanish
   paragraphs. These are research content, not chrome — they vary per school
   and per note — so they are now extracted on the same content-hash
   mechanism, with `kind: 'heading'` and looked up whole rather than through
   the block splitter.

2. **The Deep Dive teaser.** The report replaces the prose BODY but the
   collapsed teaser still derived from the prose, so a Spanish card summarised
   itself in English. It now reads `report.title · report.meta`, both already
   translated in Stage 7.

The lesson is the Stage 7 one again, one layer out: **a card can be fully
translated and still be framed by English.** Checking the body is not the same
as checking what a parent sees around it.

---

# Bangla (Bangladesh / Dhaka standard) — complete

Landed 2026-07-28; print-out clean 2026-07-29. All eight prose topics plus the content-hash topic and the
UI chrome, in one pass. Coverage 100% on every topic, no drift, all 5,904
overlay entries hash-matched against live English.

The mechanism needed no work — field classification, `PATH_OVERRIDES` and the
checkers all key off the English source, so they were already correct. What
follows is Bangla-specific.

## Standing conventions (Bangla)

Same shape as the Spanish conventions above, with these differences:

- **Variety is binding: বাংলাদেশের প্রমিত বাংলা**, the Dhaka standard — not
  Kolkata. পানি not জল. A Dhaka reader notices the difference immediately.
- **Western digits, everywhere.** Bangla has its own (০১২৩), and this corpus is
  dense with citations a family matches against a school's English page —
  tuition tables, Wayback stamps, SAT scores, `2026–27`. Mixing numeral systems
  on one line reads as a typo. `check_bn_numerals.mjs` enforces it.
  Worth flagging to the reviewer: Bangladeshi Bangla does use both in practice,
  and `৩ মৌসুম` is not wrong in isolation. This is a consistency decision for a
  citation-heavy corpus, not a claim about the language.
- **Latin kept** for school/college/program names, platform names (SCOIR,
  Scoir, Naviance), course codes and catalog-matchable course titles, award and
  society names, and division names (Upper School, Lower School).
- **Translated:** generic descriptors, analysis, and every hedge.

## Terminology choices worth a second opinion

| English | Bangla used | Note |
|---|---|---|
| acceptance list vs matriculation list | ভর্তির-সুযোগের তালিকা / প্রকৃত ভর্তির তালিকা | The load-bearing distinction of College Support, as in Spanish. Kept rigidly consistent. |
| Class of 2025 | Class of 2025 | Left Latin — it is how the school labels the cohort in every document a family will see. |
| quintile | quintile | Kept Latin; the mechanism is explained in surrounding prose. |
| weighted / unweighted GPA | ওয়েটেড / আনওয়েটেড GPA | Transliterated rather than calqued; the Bangla equivalents read as statistics jargon. |
| quality point | quality point | No Bangla equivalent; appears beside the formula that defines it. |
| test-optional | test-optional | A named US admissions policy. |
| honor society | Honor Society | Institution name, kept Latin, matching the Latin-for-proper-nouns rule. |
| most rigorous | “Most rigorous” | Common App term of art, quoted as such. |
| seniors / juniors | senior / junior | Kept Latin. The Bangla ordinals (একাদশ/দ্বাদশ) do not map onto the US cohort labels a parent reads on the school's page. |
| spike (admissions) | বিশেষত্ব | Admissions jargon with no Bangla equivalent; verify it reads naturally. |
| Signature Learning Experience | signature learning experience | Cannon's own program name, left Latin. |

## Specific soft spots

1. **`school.dossierKicker` and the caps labels.** Bangla has no capital forms,
   so `text-transform: uppercase` is inert. The Phase 0 spike zeroed the
   letterspacing for `bn` (it was breaking conjuncts under the মাত্রা), but a
   reviewer should confirm the caps-styled labels still read as labels.
2. **Long hedges in College Support.** The conflicting-figure caveats are the
   densest prose in the corpus and degrade most easily. `charlotte-latin`'s
   unremoved internal editorial note, and the Providence Day $23M/$20M
   discrepancy, are worth a careful read.
3. **`courses.scrollHint`** keeps its leading space (` — scroll for full list`);
   it is concatenated onto a count in the component.

## The render layer is a separate surface — the Bangla lesson

Every Bangla defect found after the data was 100% clean lived in
`src/lib/format.ts`, not in the overlays. Both were invisible to all five
checkers because the checkers read the WORK FILES, and the work files were
right the whole time.

| Print-out | Rendered | Cause |
|---|---|---|
| 1 | `৩৬,৩২৫ US$` | `Intl.NumberFormat('bn')` defaults to Bangla digits |
| 2 | `36,83,971` | `bn` groups lakh/crore (2-2-3), not 3-3-3 |

The second is the instructive one. Fixing the digits looked complete because
5-digit figures — every tuition tile — group identically in both systems. Only
`$3,683,971` and `$472,595` exposed it, and a regrouped figure no longer matches
the Report on Philanthropy it cites, which is the same rule the digits break.

The rule now lives in `src/lib/figureLocale.ts`, deliberately dependency-free so
`check_bn_numerals.mjs` can import the SHIPPED logic instead of restating it —
an earlier guard grepped for the `-u-nu-latn` subtag and kept passing when the
subtag was present but no longer sufficient. It now formats a 7-digit sample
through the real `numberLocale()`.

**For the next language:** before the first print-out, run the target locale
through `Intl.NumberFormat` at 5, 7 and 9 digits and compare against `en-US`.
Anything that differs beyond the decimal/group SEPARATOR — different digits,
different grouping widths — needs the locale added to `FIGURE_SAFE_NUMBERS`.
Currency PLACEMENT is left alone: trailing `US$` is genuine CLDR convention for
both `es` and `bn`, and `money()` preserves each locale's own placement while
substituting a source-shaped number.

---

## Haitian Creole (ht) — 2026-07-29

Nine topics, 5,904 strings, one pass. Chrome catalog 327 keys.

> **Status: REVIEWED AND ACCEPTED 2026-08-23.** Originally closed 2026-07-29
> without a review; a Kreyòl speaker has since read the rendered pages and
> accepted the prose, working from this list. The calls below are therefore
> *confirmed*, not merely recorded — including the French-drift register
> decision in the next section, which was the thing most at risk.

### The register decision, and why it is the thing to review first

Bangla's binding call was Dhaka vs Kolkata. Kreyòl's analogue is **French
drift**, and it is more dangerous than Bangla's because it looks *more* correct
to a non-speaker rather than less. Kreyòl and French share enormous lexical
stock, so reaching for a "more formal" register slides into French almost
invisibly — `Upper School` → *l'École Supérieure*, `financial aid` →
*l'aide financière*. It is also the politically loaded axis in Haitian language
use: French is the language of institutional gatekeeping, Kreyòl the language
Haitians actually speak.

**Rule applied: write Kreyòl in standard IPN orthography.** Everyday Kreyòl
words where Kreyòl has them — *lekòl*, *elèv*, *pwofesè*, *kou*, *ane*, *lajan*,
*timoun*. Never a French cognate reached for as "formal", never French spelling
of a Kreyòl word (*lekòl*, not *l'école*).

**A reviewer should scan for French drift first.** That is the failure mode
this corpus is exposed to, and it is the one a non-speaker cannot catch.

### Terminology choices worth a second opinion

| English | Kreyòl used | Note |
|---|---|---|
| financial aid | èd finansye | Standard; *asistans* used for "assistance" to keep the school's own two-term distinction. |
| tuition | frè eskolè | Literal ("school fees"). Kreyòl has no single word for US-style tuition. |
| endowment | dotasyon | Technical; a lay reader may not know it. No better option found. |
| honor society | sosyete onè | Literal, as in Spanish. No equivalent institution exists. |
| documented minimum | minimòm dokimante | The corpus's key hedge — kept literal everywhere. |
| absence of evidence rather than a stated policy | absans prèv olye ke yon politik ki deklare | Long but the hedge must not be smoothed. |
| publication gap | mank nan piblikasyon | Flag chip; also used in prose. |
| acceptance vs matriculation | aksepte vs enskripsyon | The distinction the college-support cards rest on; kept sharp throughout. |
| juniors / seniors | elèv twazyèm ane / dènye ane | Avoided borrowing "junior/senior", which do not map. Verbose but unambiguous. |
| Upper / Middle / Lower School | left in English | Division names — searchable identifiers, per the standing convention. |

### Kept Latin (searchable identifiers)

School and institution names, `AP` / `IB` / `Honors` / `Advanced Topics`, course
titles, platform names (Clarity, Scoir, SCOIR, Veracross, UltraCamp), award and
festival names (Blumey, NCTC, NSDA, Morehead-Cain), athlete and staff names,
conference names, and **all verbatim quoted source strings** inside their
original quotation marks.

### Numbers

No numeral question at all — Kreyòl uses Western digits and 3-3-3 grouping, and
`Intl.NumberFormat('ht')` is byte-identical to `en-US` at 5, 7 and 9 digits.
`ht` is deliberately NOT in `FIGURE_SAFE_NUMBERS`, and must not be added.

### Provenance document — the extra check

`financial-aid-tuition` is the Wayback-citation document. Beyond the figure
sweep, all **27 verbatim quoted spans and all 38 Wayback timestamps** were
verified byte-identical between `text` and `t`. That is the check the figure
sweep is structurally blind to, and the one that caught the Spanish corruption
where a blanket `' and ' → ' y '` rewrote text *inside* a quoted citation while
every dollar figure stayed intact.

---

## Telugu (te) — 2026-07-29

**Status: IN PROGRESS.** Phase 0 (typography spike) complete; translation not
started. This section is being written as the rollout goes, so a reviewer gets
the agenda rather than 84k words. Full rollout doc:
`.claude/docs/prose-translation-te.md`.

### The register decision, and why it is the thing to review first

Bangla's binding call was Dhaka vs Kolkata; Kreyòl's was French drift. Telugu's
is **diglossia** — the genuine split between **grānthika** (classical/literary)
and **vyāvahārika** (spoken/modern).

**Rule applied: vyāvahārika at an educated written register** — the Telugu of
newspapers, school circulars and government notices. Not grānthika, which is
archaic for informational prose and would make a page about tuition read as
ceremonial; not colloquial, which varies more by region and reads as informal
for a document families use to compare figures.

**A reviewer should scan for grānthika drift first.** It is the Telugu analogue
of Kreyòl's French drift and fails the same way: reaching for a "more formal"
register looks *more* correct to a non-speaker, not less.

### Variety: bound to Andhra Pradesh

Owner's decision, 2026-07-29. Prefer coastal **Andhra** lexical choices; avoid
Telangana-marked vocabulary and Urdu-influenced Hyderabadi forms. The written
standards are much closer than the two Banglas — the divergence is mostly spoken
— but the call is binding, so it is a translation instruction and not a
footnote. **Second thing for a reviewer to check**, after register.

Locale code stays `te`; the picker names the region in both scripts
(`తెలుగు (ఆంధ్రప్రదేశ్)` / "Telugu (Andhra Pradesh)").

### Kept Latin — wider than the other locales

The standing list (school/institution names, `AP`/`IB`/`Honors`, course titles,
platform names, award and festival names, athlete and staff names, and all
verbatim quoted spans) **plus education terms of art**, which Telugu prose
commonly keeps in English anyway:

`Upper School` · `Middle School` · `Lower School` · `Honor Society` ·
`Extended Day` · `varsity` · `GPA` · `transcript` · `counselor`

Owner's decision: a parent must be able to search for and say these as published.
**Do not transliterate them** — స్కూల్ reads fluently but breaks searchability,
which is the whole reason for the rule.

### Numbers — te DIVERGES from bn, deliberately

Western digits (so the *first* Bangla defect cannot recur), but **native
lakh/crore grouping is KEPT**: `$3,250,000` renders `$32,50,000`.

`te` is deliberately **NOT** in `FIGURE_SAFE_NUMBERS` and **must not be added** —
this is the exact opposite of the `bn` line, which borrows `en-US` grouping. The
same rendering that was a defect in Bangla is the wanted behaviour here. Owner's
decision, 2026-07-29.

Currency stays USD; **formatting only, never conversion**. No INR, no exchange
rate, no dual display. The `$` leads in Telugu, derived from `Intl` via
`currencyLeads()` — never from a language check.

Grouping is applied at **render** time. Figures in the work files should
round-trip byte-identically; a regrouped figure appearing in a work file is a
defect, not a localization.

### Known gap, deliberately left: methodology prose inside `sources`

Seven sentences across the six financial-aid reports render **English on every
non-English page**. They are the aggregator-rejection notes at the end of each
report's `sources` string — e.g. "Commercial tuition aggregators were reviewed
only to identify discrepancies against the school's own page (Section 7) and are
the source of no figure here."

Not fixed, and the reason is the fix's shape rather than its size:

- `sources` is one long string per school: citations, then methodology, then the
  uniform disclaimer. The disclaimer is uniform so it became a chrome key
  (`cardLabels.notCommissioned`, see `reportSources()`). The methodology
  sentences vary per school, so no key can hold them.
- The prose overlay is not an option either: `walk()` in `localizeData.ts`
  translates a string by whole-path match, so putting `sources` in the overlay
  would translate the citations too — breaking the rule that a citation must
  match the document it names.
- A real fix means restructuring `sources` into `{citations[], methodology}`
  across six schools, re-extracting `financial-aid-report` in four locales, and
  re-verifying. That is a data-model change to move one footer paragraph.

Weighed against: it sits at ~99% of the page depth, inside the sources block,
and every trust-bearing statement a family acts on — the disclaimer, the
caveats, the hedges, the flag chips — is translated. Revisit this if `sources`
is ever restructured for another reason; do not restructure it *for* this.

**Consequence to expect on the page: a tile and the prose beside it will show
the same figure two different ways.** Found in the Providence Day print-out,
2026-07-29:

```
tile   (localizeMoneyText → numberLocale('te'))   $36,83,971
prose  (rendered verbatim, never re-typed)        $3,683,971
```

Both are correct, and each follows a standing rule: structured numeric fields
are regrouped at render, while figures inside research prose are never re-typed
so tuition data cannot drift between languages. It is only their *interaction*
that is new. Telugu is the first locale to surface it — `es` and `ht` do not
regroup digits at all, and `bn` opts out through `FIGURE_SAFE_NUMBERS` — which
was confirmed by re-rendering the same page under `en`/`bn`/`es`, where the two
forms agree.

No checker can see this: both figures are individually correct, so the sweep,
the coverage read and the hash parity check all pass. It is visible only in a
browser, on a page carrying an **unabbreviated 7-digit** figure. `$3.25M`-style
tiles prove nothing — the abbreviated forms have no grouping to disagree about.
The financial-aid sections are collapsed by default, so the panels must be
expanded before the figures are on screen at all.

**A reviewer should decide whether this is acceptable**, since it is a
presentation question rather than a translation one. It was left as-is rather
than resolved unilaterally: the alternatives (adding `te` to
`FIGURE_SAFE_NUMBERS`, or regrouping figures inside prose) each contradict a
decision the owner has already made explicitly.

### Typography — two defects found and fixed in Phase 0

Both in `src/index.css`, scoped to `[lang='te']`, verified in a real browser.

1. **Letterspacing** — same fix as Bangla (tracking → 0 across 43 rules), but a
   *different* mechanism. Telugu stacks subscripts vertically, so its conjuncts
   survive tracking intact (`రాష్ట్ర`, `విద్యార్థి` held together at 0.14em); what
   breaks is the spacing *between* syllable clusters, scattering the line so word
   boundaries stop being legible.
2. **Line-height** — worse than Bangla. Telugu stacks marks above *and* below the
   baseline with no headstroke anchoring them, so a two-line heading had line 1's
   subscripts meeting line 2's vowel signs. 1.6 on headings, 1.7 on body.
   `.stat-tile-val` excluded — it holds Latin figures.

Stat tiles were fine, as in Bangla. Font (`Noto Sans Telugu`) loaded first time,
no tofu.

### A PDF artifact that is NOT a bug in this app (2026-07-29)

An 81-page owner print-out of Charlotte Latin rendered perfectly on screen and on
paper, but the PDF's **text layer** extracted as mojibake — `పాఠశాల` came out
`!ఠ#ల`, `విద్యార్థులు` came out `;KLరుG లు`. It looks alarming and it is easy to
mistake for a font or encoding bug in the app. It is neither.

What was checked before concluding that:

- `document.body.innerText` on the live page is correct Telugu; zero occurrences
  of the corrupt forms in a 152k-char expanded DOM dump.
- A headless-Chrome PDF of the *same* route extracts **cleanly** — 14 and 18
  correct instances of `పాఠశాల`, zero corrupt.
- `pdffonts` on the clean PDF shows `uni: yes` — a ToUnicode map is embedded, so
  ligated conjunct glyphs reverse-map to characters.

The owner's PDF came from a generator that subset the font *without* a usable
ToUnicode map for the shaped conjunct glyphs, so extraction falls back to raw
glyph IDs, which land on ASCII punctuation. That is a property of how the print
path handles complex-script shaping, and **it would affect Bangla the same way**
through the same path. Nothing in `src/` causes it and nothing in `src/` fixes it.

**The consequence is still real and worth telling a family about:** a printed or
saved PDF of a Telugu or Bangla page may be unsearchable and unreadable to a
screen reader even though it looks perfect. Copy-paste out of it produces
garbage.

**Diagnostic order for the next language** — do this before filing a bug:
`innerText` first, then a headless PDF of the same route, then `pdffonts` for the
`uni` column. Comparing against a control PDF is what separates a real
encoding bug from a generator artifact; skipping the control makes an app bug out
of something the app did not do.

---

## French (fr) — rollout notes, 2026-07-30

Sixth language. Latin script, no declared font, **no typography spike** — the
first rollout that needed none at all. Cost shape follows Kreyòl, not Bangla.

### The figure decision, and why it is not the `bn` line

`fr` gets **no `FIGURE_SAFE_NUMBERS` entry**, even though it is unlike every
predecessor: narrow no-break space grouping (U+202F), comma decimal separator,
trailing symbol — `3 683 971 $US`.

The reason is that **French grouping is still 3-3-3**. The group boundaries do
not move, so a figure stays recognisable against its English source. That list
exists for *regrouping* — `bn`/`te` lakh-crore turning `3,683,971` into
`36,83,971` — not for separator swaps. The precedent is **Spanish**, which also
diverges on separators (`3.683.971`) and is likewise excluded, not Bangla.

Consequence worth knowing: `check_bn_numerals.mjs` asserts the 3-3-3 shape only
for locales *inside* the list, so it correctly stays silent about `fr`. The
per-topic `check_figures.py` sweep is the real guard.

### Percent signs stay UNSPACED — found by the sweep on topic 1

French orthography wants `80 %`, and `Intl` agrees. **The corpus does not.**
Verified across `es`/`ht`/`te` over six topics: zero spaced percents, even
though Spanish has the identical convention. These percentages are citations a
parent matches against the school's own page, and the sweep reads the space as
a dropped figure. The `%` travels with the digits.

### Six decimals had been re-typed with a French comma

`0.5 credit` → `0,5`, `4.4 each` → `4,4`. Restored to source form. A credit
value is as citable as a GPA. **Note the shipped `es` overlay does this**
(`5.0%` → `5,0%`); `fr` deliberately does not follow it.

### The French-specific trap: an identifier wearing a sentence's clothes

This is the **inverse** of the Telugu leak shape and it needs its own checker.

Telugu leaked via *a sentence wearing an identifier's clothes* — a hedge in a
proper-noun field, which `i18n_audit_skips.mjs` can catch. French leaks the
other way: `French III Honors` and `AP French Language and Culture` are
searchable course codes that, **in French only**, read as ordinary translatable
prose. They sit in the same work file as `A five-level French sequence.`, which
genuinely must move. Both are correctly classified as prose, so neither the skip
audit nor the figure sweep can see the difference.

977 strings in the corpus contain the word "French". `scripts/check_fr_identifiers.mjs`
guards them. Three things it had to learn, each from a false positive:

1. **Presence, not occurrence count.** French drops repetitions English keeps
   (`…en Middle School ; le modèle de clubs y est…`), so demanding ×2 → ×2
   flags correct prose.
2. **Some terms are context-sensitive.** `Honors` is a course code in
   `French III Honors` but an ordinary word in the card heading
   `Honors & distinctions →`. `Francophone` is frozen in
   `French 7 Advanced: Francophone Culture through Literature` but is prose in
   `the African Francophone world` → `monde francophone africain`.
3. **Whole-token matching.** A substring test fired `AP` on the word **TRAP**,
   reporting the heading `A COMPARISON TRAP IN THE EARLY YEARS` as a lost code.

### Sport names stay English — the prior precedent was split

The shipped `es` overlay translates 6 sport names and leaves 19 in English;
`ht` is inconsistent the same way. `fr` needed one rule and keeps them English:
they are the team's name on the school's own athletics page, and **French
"football" means soccer**, so translating the label on an American football
program would be actively wrong rather than merely awkward.

### `check_runtime_resolution.mjs` — the check the repo was missing

Coverage reporting 100% does not mean the page renders French. A shipped entry
resolves only if its FNV-1a stamp still equals the hash of the live English at
that field path; if it does not, the runtime falls back to English **silently**
— no error, no coverage change. That is the Spanish failure mode, and until now
nothing verified it outside a browser. The new script recomputes all 5,924
stamps from live `src/data/**`, and passes for `es`/`bn`/`ht`/`te` too.

### Native-speaker review — PASSED, 2026-07-30

French speakers read the rendered pages and accepted the prose. French ships
**REVIEWED**, in Spanish/Bangla/Telugu's position rather than Kreyòl's. The
list below is kept as a record of what the review covered, not as work owed:

- **Register.** Formal `vous` throughout was the owner's call. The corpus is
  mostly third-person declarative, so `vous` surfaces mainly in the "Ask on the
  tour" questions — check those read as a parent would actually speak.
- **Hedge strength.** The whole corpus depends on these. `semble être` vs `est`,
  `n'a pas pu être confirmé` vs `n'existe pas`, `minimum documenté` vs
  `minimum`. A softened hedge turns a caveat into a claim.
- **The frozen identifiers** (§1a of the rollout doc). A French reader is the
  only person who can say whether leaving `French III Honors` untranslated reads
  as deliberate or as an oversight.
- **Division names.** `Upper School` / `Middle School` / `Lower School` stay
  English as searchable identifiers. This is the choice most likely to feel
  wrong to a native reader, and it is deliberate.

### The print-outs — four defects, three of them cross-locale

Two rounds, both in a real browser with every panel expanded. **Every automated
check had passed on all four.**

| Round | School | Found |
|---|---|---|
| 1 | Charlotte Latin, 65pp | `18 h 00` clock tile · prose money unlocalized · hardcoded `US$` |
| 2 | Providence Day, 80pp | topic-header stat tiles rendering raw |

Only the first was French-specific. Two affect Spanish identically; one affects
`te`/`ht`/`en` too.

**The through-line: three separate render paths were bypassing
`localizeMoneyText()`** — `RichText` in three card components, the stat tiles in
`SchoolDetail`, and (found by the new checker rather than by eye) the
financial-aid figure captions. Every instance is invisible to an English reader
by construction, since `localizeMoneyText` is a no-op on `en`. That is why four
rollouts' worth of checkers never saw them.

Two checks now close it, both verified in *both* directions:

- `npm run check:currency` — every money form in a locale carries the same
  symbol on the same side; English never moves.
- `npm run check:money` — greps JSX for figure-shaped expressions rendered
  without localizing, with a `REVIEWED` list for fields hand-verified never to
  hold one. It immediately found 8 sites nobody had thought to check.

**Why the second school mattered.** Latin's tiles read `$36,500` / `$3.25M` —
wrong, but only once you know. Providence Day puts `$3.68M` and `3 683 971 $US`
on the *same document*. Two schools is not belt-and-braces; it is what makes a
defect legible.

---

# Hindi (हिन्दी) — 2026-08-02

**Status: COMPLETE and REVIEWED (2026-08-23).** Full rollout doc:
`.claude/docs/prose-translation-hi.md`. This section is the reviewer's agenda —
what to look at first, and why — rather than a summary of 84k words.

**NATIVE-SPEAKER REVIEW: ACCEPTED 2026-08-23.** It was run ON THE LIVE SITE — a
Hindi speaker read the deployed pages at charlotteschoolinsights.com
(`?lang=hi`), not a local build (commissioned 2026-08-02, accepted 2026-08-23).
`hi` ships **reviewed**, alongside every other locale.

Reviewing production is a stronger test than a local render — it is what a
family actually sees. The trade it carried (unreviewed prose publicly visible
while the review was open) is now spent: the review returned and accepted.

**This section is kept as the record of what was judged**, not as a pending
agenda — the register axis in the next section is what the reviewer assessed. Everything mechanical — figures, digits, grouping,
glyphs, stranded English — has already been verified twice over, once by
automated checks and once by a 131-page browser print-out of two schools that
came back clean. What no check can reach is whether the Hindi *reads naturally
to a parent*.

## The register decision, and why it is the thing to review first

Every prior non-Latin rollout pinned one register axis: Bangla's was Dhaka vs
Kolkata, Telugu's was grānthika vs vyāvahārika, Kreyòl's was French drift.

**Hindi's axis is how Sanskritized.** The rule applied is **मानक हिन्दी** — the
educated modern written standard of a school circular or a newspaper education
page — and specifically **not over-Sanskritized शुद्ध हिन्दी**:

| Preferred | Avoided |
|---|---|
| कोर्स / पाठ्यक्रम | अध्ययनक्रम |
| रिपोर्ट | प्रतिवेदन |
| स्कूल / विद्यालय | शिक्षणसंस्थान |
| फ़ीस / ट्यूशन / शुल्क | शुल्क-राशि |
| प्रतिशत | शतांश |

**A reviewer should scan for Sanskritization drift first.** It fails exactly the
way Kreyòl's French drift and Telugu's grānthika drift fail: reaching for the
"more proper" register looks *more* correct to a non-speaker, not less — so it
is invisible to everyone who cannot read the language, and to every automated
check in this repo. The Telugu and Farsi native-speaker reviews each caught this
class and nothing else.

The corpus is parent-facing. A family comparing tuition should not feel they are
reading a government gazette.

Equally worth checking: the prose should not have drifted the *other* way into
Hinglish or a chatty register. It is descriptive third-person throughout, with
no आप-forms.

## Loanwords — two rules, deliberately different

- **Domain loanwords Hindi genuinely uses are written in Devanagari:** स्कूल,
  कॉलेज, कोर्स, रिपोर्ट, ट्यूशन, कैंपस, क्लब, टीम, कोच, स्कोर. Calquing these into
  Sanskrit equivalents is the drift above.
- **Searchable identifiers stay in LATIN script:** `Upper School`,
  `Middle School`, `Lower School`, `Extended Day`, `Honor Society`, `varsity`,
  `GPA`, `transcript`, `counselor`, `AP`, `IB`, `Honors`, `NCISAA`, plus every
  institution, college, platform, award and person name.

So `स्कूल` for the generic noun but `Upper School` for the division a school
names on its own site. Same call Bangla made in its §4.4 and Telugu in its §1b.
**Do not transliterate the identifiers** however fluently they read — it breaks
the searchability that is the whole reason for the rule.

## Numbers — hi follows te, NOT bn

Western digits (Devanagari `०१२३` never appear in a figure — guarded by
`scripts/check_hi_numerals.mjs`), but **native lakh/crore grouping is KEPT**:
`$3,250,000` renders `$32,50,000`, `$3,683,971` renders `$36,83,971`.

`hi` is deliberately **NOT** in `FIGURE_SAFE_NUMBERS` and **must not be added**.
This is the `te` line, the opposite of the `bn` line. Owner's decision,
2026-08-02, on the reasoning that Hindi readers in India read lakh/crore
natively and Telugu already proved the render layer handles it —
**re-confirmed by the owner after the rollout shipped**, with the tile-vs-prose
split below on screen. It is a settled call, not a default anyone fell into.

Note the two lakh/crore locales differ in *why* they sit where they do, which is
worth keeping straight before citing either as precedent:

- `bn` is on the list for **digits AND grouping** — Intl emits `৩৬,৮৩,৯৭১`, not
  one glyph of which matches the school's published figure.
- `hi` faces **grouping only** — its digits are already Western, so Bangla's
  first defect cannot arise here at all.

### The interaction this creates — inherited from Telugu, on purpose

A stat tile and the prose sentence beside it can show the same figure two ways:

```
stat tile   (rendered from a raw number, regrouped by Intl)   $36,83,971
prose       (baked in the data, never re-typed)               $3,683,971
```

**Both are individually correct** and every automated check passes with both on
screen. Tiles regroup at render; prose figures are never re-typed, because a
figure in prose is a citation a family matches against the school's own page.

This is the single most likely thing for a reviewer to report as a bug. It is
not one. It is the documented consequence of keeping native grouping, and it is
identical to what Telugu ships.

Currency stays USD — **formatting only, never conversion.** No INR, no exchange
rate, no dual display. The `$` leads in Hindi, derived from `Intl` via
`currencyLeads()`, never from a language check.

## Typography — Devanagari is the Bangla case, not the Telugu one

Recorded because the three non-Latin scripts break differently and the
distinction keeps getting re-derived:

- **Bangla** joins under a মাত্রা headstroke → tracking forces gaps *inside* a
  character.
- **Telugu** stacks subscripts vertically → conjuncts survive tracking; the
  spacing *between* clusters is what scatters.
- **Devanagari** joins under a शिरोरेखा headstroke → tracking **cuts the
  stroke**, like Bangla.

Measured, not eyeballed: rasterising `पाठशाला` at 64px and counting contiguous
ink runs along the stroke row gives 3 runs at tracking 0 (Noto's own hairline
joins) but **5 runs at 0.06em and above**, with gaps widening from 3px to 12px.

Line-height: Devanagari ink rows genuinely **overlap** at 1.05 (−5.1px), 1.15
(−3.2px) and 1.30 (−0.3px), first clearing at 1.45. Shipped at 1.45 on headings
and 1.6 at body size — between Bangla's 1.65 and Telugu's 1.7.

All overrides are scoped `:root[lang='hi']`, verified in a browser across all
nine locales rather than by reading the built CSS: every Latin locale is
byte-identical to English on every probed property.

## Deliberate departures a reviewer might question

**Two financial-aid content blocks diverge from Italian.** In
`financial-aid-tuition.content`, entries `a540e708` and `45fe4467` were left
entirely English in the Italian overlay. They are **not** pure citation — each
wraps our own analysis around quoted spans. Hindi translates the analytic frame
and leaves every span inside quotation marks byte-identical English. That is the
standing rule applied correctly; Italian is the outlier. Worth a second opinion.

**No `UNIT_SUFFIX.hi` entry.** `format.ts` localizes `/yr`, `/mo` etc. for
`es`/`fr`/`it` but not for Hindi, so `$1,725/yr` keeps its English suffix. The
reasoning: that suffix sits immediately after a `$` figure, inside what is
functionally one Latin-script citation run, and splicing `/वर्ष` into the middle
mixes scripts inside a single token for no comprehension gain — the surrounding
Hindi prose already says "per year". The Latin-script locales have no such
problem, which is why they have entries. ~64 sites; a one-line change if a
reviewer disagrees.

**The 7-string known open defect is carried forward**, as in every prior locale
— see CLAUDE.md. Hindi inherits the same English strings in `program`/`value`/
`year` fields.

---

# Arabic (`ar`) — soft-spots for a native-speaker review

**REVIEWED AND ACCEPTED 2026-08-03** (fix shipped as PR #97). An Arabic speaker
read the deployed pages and accepted the prose, flagging one issue: *Charlotte*
was rendered تشارلوت with a leading ت; the correct spelling is شارلوت, which
Farsi already used. This block is kept as the record of what was judged — it was
written as the reviewer's agenda and served that purpose.

(This section said "ships unreviewed" until 2026-08-23, months after the review
actually passed. When a rollout doc and `CLAUDE.md` disagree on review status,
trust `CLAUDE.md`.)

## The one thing most likely to be reported as a bug — and is not

`ar` is deliberately **absent** from `FIGURE_SAFE_NUMBERS`, unlike the other
RTL locale (`fa`). This is measured, not inherited:

```
Intl.NumberFormat('ar').format(3683971)  →  "3,683,971"   (Western digits, 3-3-3)
Intl.NumberFormat('fa').format(3683971)  →  "۳٬۶۸۳٬۹۷۱"   (Eastern-Arabic digits)
```

Modern Standard Arabic as CLDR renders it uses **Western (ASCII) digits with
3-3-3 grouping** — byte-identical to the school's own English figure. `fa` is on
the safe-list because its Eastern-Arabic digits are unmatchable against the
English source; that reason does **not** apply to `ar`. Arabic is therefore the
`es`/`fr`/`it` case (symbol placement and direction differ, but the digits and
group boundaries never move), and it is the **first RTL locale NOT on the
safe-list**. A reviewer who assumes "RTL ⇒ follows Farsi" will call this a bug.
It is not — see `src/lib/figureLocale.ts`.

## Currency trails, and the symbol is `US$` with an RLM

`currencyLeads()` returns **false** for `ar`: `Intl` places the symbol after the
amount (`3,250,000 US$`) with a leading U+200F RLM. This is the first locale to
**both** trail the symbol **and** be RTL. Placement is derived from
`Intl.formatToParts` positions, never a language check. Verified on the
print-out: money reads left-to-right inside the RTL paragraph (LRI…PDI isolate),
the `US$` sits correctly, and the amount is never re-typed. Currency stays USD —
formatting only, no conversion, no dual display.

## Register — Modern Standard Arabic, school-circular level

Target is **فُصْحى المدارس / newspaper-education register** — the Arabic of a
school circular or an education page, *not* Classical/Qur'anic فصحى and *not* any
spoken dialect (Egyptian, Levantine, Gulf, Maghrebi). Concretely:

- Domain loanwords are written in Arabic script where a parent would expect them
  (المدرسة, الرسوم, المنحة), while searchable Latin identifiers stay Latin
  (`Upper School`, `GPA`, `AP`, course titles, department names, award names).
- Hedges must stay hedges. `~`, "approximately", "documented minimum",
  "for reference only" survive as وهي مُعلَّمة كذلك / تقريبًا / حدّ أدنى موثَّق —
  never hardened into a bare claim. This is the highest-value thing to check.
- No over-classicised diction (avoid archaic connectives / rhymed سجع). A
  reviewer should flag anything that reads as literary rather than
  administrative.

## Identifiers kept English — consistent with the reviewed locales

The cross-locale leak diff (`npm run i18n:leaks -- --lang ar`) reports 133
strings `ar` kept English that ≥2 other locales translated. **Every one is an
identifier or proper noun** — course titles, department names, grade-band tags
(`Gr 5–8`), named awards (`McDonald's All-American`), group names
(`Super Women's Affinity Group`), quoted terms (`"Ivy Plus"`). `ar` follows the
**reviewed** locales (es/it/te/fr), which keep these English; the diff only fires
where the *unreviewed* bn/fa/ht chose to translate an identifier. Zero genuine
prose leaked — verified by confirming no `.summary`/`.note`/`.detail`/`.text`
field is among the flagged items. If a reviewer wants any specific award or
program name in Arabic, that is a per-string editorial call, not a systematic gap.

## Archive-source tuition blocks stay English inside their quotes

In `financial-aid-tuition.content`, the verbatim snapshot tables
(`"Tuition: JrK $18,330 …"`, Wayback codes like `` `20220127142845` ``) are
citations a parent matches against the archived page — kept **byte-identical
English**. Only the framing prose around them is translated (`Wayback`, `under`,
`Verbatim:`, the validation sentences). Same rule Italian and Hindi applied.

## The 7-string known open defect is carried forward

As in every prior locale — see CLAUDE.md. Arabic inherits the same English
strings in `program`/`value`/`year` fields. Not ar-specific; not fixed here.

---

## Hickory Grove Christian backfill (9th school) — 2026-08-17

Not a locale rollout: one school's prose added to nine already-complete locales.
517 strings each (479 Hickory Grove, 38 Carmel Christian metric-values entries
that shipped untranslated in PR #140 and nothing had surfaced until Hickory Grove
landed on the same Compare rows).

**Method — hash-keyed backfill, not re-translation.** The extractor blanks every
`t`, which is right for a fresh rollout and wrong here. Existing translations were
restored by content hash (`of`) before any model saw the file, leaving only the new
strings blank. Merging is by hash and never by index: an index-keyed merge ships
fluent prose attached to the wrong original at 100% coverage. The result is
additive — no shipped wording changed in any locale.

**Three Phase-1 data defects were fixed rather than translated around**, each of
which would have shipped English inside otherwise-translated cards in all nine:

- `counseling.rosterTitle`, `outcomes.bucketsTitle` — lifted chrome. Hickory Grove
  was the only school setting either, and both have translated `sections.*`
  fallbacks. Deleted from the data. Third occurrence of this shape after Covenant
  Day and Carmel; the extractor's "unclassified field" warning is what catches it.
- Three `music.tracks[].ensembles` values were descriptive prose in a field
  correctly classified as an ensemble proper noun for every other value — the
  "right about 12 values, wrong about the 13th" shape. Normalised to the
  convention; the detail moved into `boardNote`, which is prose and translates.

**A defect class no check in this repo looks for: Cyrillic homoglyphs.**
Composing Kreyòl emitted six `е` (U+0435) inside otherwise-correct words. Invisible
in review, invisible to grep unless you search the codepoint, and it breaks search
silently. Caught during self-verification; all nine locales then swept clean. Worth
adding to the standard sweep — it costs one regex over the work files.

Arabic hit the mirror-image version: composing RTL prose around Latin identifiers
emitted 44 stray U+200F RLM marks. The render layer owns bidi isolates, so
hand-injected controls are a defect. Same fix, same invisibility.

**Cross-locale leak triage by consensus, not by eye.** Inverting `i18n:leaks` gives,
per field path, the set of locales that kept it English. Kept by 1–3 of 9 → almost
always a real miss; kept by 6+ → a deliberate identifier retention. That separated
27 genuine leaks (`Math`, `Reading & Fluency`, `Elementary`, `Aggregator`,
`Guidance lunches`, `CEEB code`, `head coach`, `College Prep`, the `Rising N`
grade-band terms) from 3 correct keeps (`AP Capstone Diplomas`, the two
`AP Scholars` tiers). All 27 fixed to the consensus rendering.

## `source` citation lines carry editorial prose — pre-existing, NOT fixed

The browser sweep flagged, in every locale, the `clubCatalog.ts` `source` line:

    privateschoolreview.com — HGCS profile (the only source naming all 27
    non-sports orgs) · hgchristian.org — Academics & Arts pages (corroborating …)

`source` is classified `'citation label'` and skipped, which is right for the URL
list and wrong for the parenthetical judgement inside it. **This is not Hickory
Grove's doing** — every school on `main` has one (`named orgs only; no public
chartered directory`, `roster assembled from several pages`, `third-party roster`).
Left alone deliberately: fixing it means widening the `source` path rules and
re-extracting a topic complete in nine languages, which is the same cost that keeps
the 7-string defect open. Recorded so the next rollout finds it as a known item
rather than rediscovering it as a bug.

---

## RESOLVED 2026-08-19 — descriptive phrases in music track labels (was: `ensembles`)

`ensembles` is classified *"proper noun — ensemble name"* in
`scripts/i18n_fields.mjs` and is therefore SKIPPED from extraction. That is right
for `Concert Choir` and `Honors Wind Ensemble`, and wrong for the handful of
values that are descriptive phrases. Those ship as English to all nine prose
locales, and no automated check can see them — coverage reads 100% because the
field was never extracted at all.

Found by a browser print-out of the Gaston Day page, which is the only step that
catches this class. Gaston Day's own instance was fixed at the DATA layer rather
than by reclassifying the field: `Private lessons with contracted professional
musicians` became `Private lessons`, and the detail moved into `boardNote`, which
is already prose. Four remain across other schools:

| Value | File |
|---|---|
| `Prior experience — or audition if inexperienced` | `artsPrograms/cannon.ts` |
| `Vertical progression — a four-year ladder` | `artsPrograms/cannon.ts` |
| `Middle School — non-auditioned, in the daily curriculum` | `artsPrograms/charlotte-country-day.ts` |
| `Auditioned — new students must audition` | `artsPrograms/davidson-day.ts` |

**UPDATE 2026-08-19 — this entry named the WRONG FIELD, and the defect was almost
entirely already fixed.** The four values above do not live in `ensembles`; they live in
the sibling **`music.tracks[].label`**, which *is* an extracted prose field. Measured
across all nine locales, all four were already translated in eight of them. The single
genuine remainder was `Prior experience — or audition if inexperienced` in **`fa` only**,
now translated (`تجربهٔ پیشین — یا آزمون در صورت نداشتن تجربه`).

`ensembles` itself remains correctly skipped — it holds the proper-noun ensemble names
(`Honors Jazz Combo`, `Honors Concert Chorus`) beside each label, and the reasoning below
for not flipping it still stands.

**The lesson is about the doc, not the data:** this entry was written from the field name
in a grep hit rather than from the resolved overlay path, and then read as authoritative
by two later sessions. When recording a leak, record the **`at` path from the overlay
work file** (`cannon:music.tracks[1].label`), not the key you found in `src/data`.

**Why the field was not simply flipped to prose.** `music.tracks[].ensembles`
holds 95 values across the ten schools and 91 are genuine proper nouns. The
extractor matches `PATH_OVERRIDES` by path suffix, so flipping it would newly
extract all 95 — re-opening a topic already complete in nine languages, to
translate ensemble names that must stay English anyway. The same-shaped fix used
here (move the prose to a neighbouring prose field) is cheaper and safer per
occurrence.

This is the fourth instance of the recorded shape: a field correctly classified
for most of its values and wrong for a few — after `value`, `tier` and `kind`.

---

## Shared-hash role labels — one entry, three school pages (2026-08-19)

Overlay entries are keyed by **content hash, not by school**, so a single entry
serves every school whose English text matches at that field path. Two athletics
labels in `sports.<lang>.json` are shared this way:

| String | Paths | Schools |
|---|---|---|
| `Athletic Director` | 4 | `charlotte-catholic`, `covenant-day`, `gaston-day` |
| `Strength & conditioning` | 2 | `charlotte-catholic`, `covenant-day` |

This is why the Charlotte Catholic Phase 2 triage (PR #150) **refused** both: the
agents were scoped to `charlotte-catholic:` paths and correctly declined to rewrite
other schools' pages from a single-school brief. Fixing them is a deliberate
cross-school decision, taken here.

**`Strength & conditioning` was a real leak — translated for `bn`, `te`, `it`, `hi`.**
The evidence is `facilities.care[].label`, a homogeneous class of 21 sibling labels:
every locale already translates 18–21 of them, including the immediately adjacent
`S&C staff` and `Strength as curriculum`. The lowercase `conditioning` marks it as a
descriptive label rather than a job title.

**`Athletic Director` is a deliberate KEEP for `bn`, `te`, `fr`, `hi` — not a leak.**
Those four locales keep **6 of 6** bare `Director` job titles in Latin, with no
exceptions: `Director of Athletics`, `Director of Sports Performance`, `Director of
Athletic Performance`, `Associate Athletic Director`, `Football Program Director` and
`Athletic Director` itself. The only `Director` strings they touch are compound ones
where a *sport-name prefix* is translated while the title stays Latin (`কুস্তি ·
Director of S&C`). Translating this one would make it the sole translated director
title in each locale, contradicting their own established convention. `es`, `ht`, `fa`,
`ar` and `it` do translate it, and keep it translated — the test applied is each
locale's own consistency, not a cross-locale majority.

Four sibling strings flagged by `i18n:leaks` in the same pass were measured and
rejected as convention, not leaks: `Basketball` and `Soccer` (every locale keeps
75–97% of sport labels Latin), `Health` (95–99% of `courses[].title` Latin — course
titles are searchable identifiers), and `Choral`. Recorded so a later pass does not
re-litigate them.

---

# The cross-locale leak KEEPS ledger — 2026-08-23

`scripts/find_english_leaks.mjs` (`npm run i18n:leaks`) says in its own docstring that it
is **a review queue, not a defect list**, and that the KEEP decisions must be "recorded
somewhere durable so the decision is documented rather than merely implied by absence."
Until this section existed there was no such record, so every rollout re-triaged the same
strings from scratch.

**This is the record. It is documentation, not a gate** — nothing fails a build because a
string is or is not listed here. This repo has twice parked a checker at a permanent
non-zero and watched it stop being read; a ledger avoids that by not pretending to be
enforcement.

## What was triaged, and what was not

The tool reports **2,625 review items across the nine prose locales**, which dedupes to
**740 distinct English strings**. Banding each string by *how many of the nine locales kept
it in English* is what makes the pile tractable:

| Kept by | Distinct strings | Reading |
|---|---|---|
| 1 locale | 218 | strongest leak signal — 8 locales translated it |
| 2 locales | 68 | strong leak signal |
| 3–6 locales | 377 | ambiguous middle — **not triaged**, see below |
| 7+ locales | 77 | consensus keep — **not triaged** |

**The triaged scope is `kept ≤2 locales AND ≥15 characters` — 147 distinct strings.** The
length floor matters: below it the ≤2 band is dominated by grade/time labels
(`Gr 1–5 · 3:00–4:30`) whose treatment is a separate convention question.

Outcome: **133 LEAK, 13 KEEP, 1 English-side defect.** The ratio is worth stating plainly
— in the ≤2 band the cross-locale diff is right about nine times out of ten, which is what
justifies spending a pass on it at all.

## The test used, and the one that overrides it

Default test: **if 7–8 locales rendered a string as running prose, it is prose.** A KEEP has
to be a course code or catalog title a family matches against the school's published page,
a proper noun, a named award, a unit, or a figure label.

**That test is overridden by a locale's own internal consistency.** This is the same rule
already applied to `Athletic Director` (2026-08-19, below): the question is not whether a
cross-locale majority translated a string, but whether translating it would make it the
*sole* exception inside the locale that kept it. A locale that consistently keeps a whole
class of identifier in Latin is following a convention, not leaking.

That override changed exactly one call here — and it was the call the implementation plan
had cited as a **verified example of an unambiguous leak**. See `Director of Counseling
Services` below. Recorded because it is the failure mode this ledger exists to prevent: a
string that looks like a leak from the cross-locale view and is a convention from inside
the locale.

## The KEEPS

| English | Kept by | Why it is a keep |
|---|---|---|
| `Director of Counseling Services` | `bn` | **`bn` keeps all six bare `Director` job titles in Latin** — `Director`, `Assoc. Director`, `Sr. Assoc. Director`, `Co-Director`, `Director of Counseling` and this one. Translating it would make it the only translated Director title in the locale. The per-locale-consistency override, not the cross-locale majority. |
| `The Educational Resource Program` | `fr` | Named in-house program at Charlotte Country Day; a family matches the name against the school's page. The other locales only strip or keep the leading article. |
| `"Due to the small class size and the college-bound nature of Covenant Day's population… Therefore, we do not rank."` | `bn`, `te` | A **verbatim quotation** from the school's published profile. Quoting convention legitimately differs per locale; `fr` keeps it as a quote too. |
| `~30,000 sq ft, 2022` · `~47,000 sq ft, 2022` · `50,000 sq ft, 2001` · `53,000 sq ft, 2001` | `it` | Figure + unit. **Whether converted units belong in this data at all is an open question** recorded in CLAUDE.md — only `es` converts today. Not this pass's call to settle. |
| `Concert Choir, Chamber/Honors Choir, Symphonic Band, Honors Symphonic Band, Orchestra, Honors Orchestra, Percussion Ensemble, Piano class` | `fa`, `hi` | Ensemble proper names as printed in the arts catalog. `bn` and `ht` keep them verbatim too — only the trailing `Piano class` varies. |
| `Music & Performing Arts: Performance Ensemble (theatre), Contemporary Ensemble, Modern Music, Film Studies & Production` | `fa` | Course/ensemble catalog names; only the parenthetical gloss varies, and `bn`/`ht` keep the names as well. |
| `Music: Honors Concert Chorus, String Ensemble I–IV, Upper School Band, Jazz Combo, Modern Ensemble, Music Technology I–III` | `fa` | Course catalog names; the leading category word is the only prose. |
| `Visual: Honors Visual Foundations → Studio-2D / 3D → Studio Arts II → III → AP Studio Art; plus Advanced Topics: Art History` | `fa` | Course catalog names in sequence; the leading category word is the only prose. |
| `Improv & Musical Review` | `fr`, `it` | Named enrichment offering in Davidson Day's arts ladder. |
| `National Honor Society (28 in '25), Global Studies Diploma, Acclaim Scholars` | `bn` | Three named programs and awards; only the `in` is prose, and `es`/`ht`/`te` keep the names verbatim. |

## The English-side defect this pass exposed

`clubCatalog.ts`, Charlotte Catholic, `St. Augustine Club` carried the note
**`'The St — advisor Mr. Kennelly, 309'`** — the ingest truncated the source sentence at
the period in *St. Augustine*, leaving a two-word fragment that nine locales then
faithfully translated or kept. Repaired from `source-material/student-clubs/charlotte-catholic/`
using the sibling notes' `…` convention.

It is the **"sentence wearing an identifier's clothes"** class this repo keeps hitting,
with a twist: here the English itself was broken, and the leak report is what surfaced it.
A cross-locale diff finds English-side data defects as a side effect, because a fragment
that makes no sense is one that locales disagree about how to handle.

## Deliberately NOT triaged, and why

- **The 3–6 band (377 strings).** Dominated by grade/time labels (`TK · 1:00–3:00 pm`,
  `Gr 1–5 · 2:55–4:30`, `$1.00 / min`). These need **one convention decided once and
  applied to all nine locales**, not string-by-string triage — four locales translate them,
  five do not, and either answer is defensible as long as it is uniform.
- **The 7+ consensus band (77 strings).** Course titles and proper nouns
  (`World Myths and Legends`, `NC A&T`, `Science Lab`). Sampled and confirmed correct; no
  work warranted.
- **Strings under 15 characters in the ≤2 band.** Same convention question as the 3–6 band.

## Phase 2 — what the translations reclassified (2026-08-23)

Phase 2 translated the 1,172 `(string, locale)` edits the triage confirmed. **182 of them
were reclassified as KEEPs while being translated** — 44 distinct strings, listed below.

The reason is the rule Phase 1 wrote down and Phase 2 then had to apply string by string:
**adjudicate on the locale's own siblings.** Phase 1 classified the grade/time rows as a
*convention class* — "a translatable word remains, so translate it" — but that verdict was
reached from the shape of the English, not from what each locale actually does with it.
Applied against the siblings, a large share of those rows had **nothing left to translate**:

```
es   "Junior Kindergarten · to 2:00 pm"  ->  "Junior Kindergarten · hasta las 2:00 pm"
```

`es` translates only `to` — it keeps `Junior Kindergarten`, and it keeps the clock. So bare
`Junior Kindergarten`, and bare `TK · 1:00–3:00 pm`, are correct KEEPs in `es`: the
convention was already satisfied. The same held for `fr`'s `Session N` (identical word in
French) and for the AP/National Merit award-tier rows with no trailing prose.

This is the *third* time this repo has recorded the same lesson — PR #190 corrected its
triage 74 times, Phase 1 corrected the ledger's `te` National Merit claim, and Phase 2
corrected 182 rows of Phase 1's own convention class. **A verdict reached from the English
shape is a hypothesis; only the locale's siblings settle it.**

Rows are keyed `(string, locale)`: several of these strings are genuine LEAKs in the
locales *not* listed, and were translated there in the same pass.

| String | Kept in | Why |
|---|---|---|
| `After School / After YCC · 3:00–6:00` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Junior Kindergarten` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Division name — every locale keeps it in the translated siblings (es `Junior Kindergarten · hasta las 2:00 pm`). |
| `Kindergarten` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Same: kept verbatim inside already-translated sibling labels in all nine. |
| `Learning Academy` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named in-house support programme. |
| `SAT EBRW — 2025` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | `EBRW` is a College Board code and the year is a figure — nothing translatable remains. |
| `Band / Strings / Choir` | `ar`, `bn`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Three ensemble names as printed in the course slot; the locales keep ensemble identifiers. |
| `Before School · 7:30–8:00` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `te` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Options Program / Pathways Program` | `ar`, `bn`, `es`, `fr`, `hi`, `ht`, `it`, `te` | Two named support tracks, slash-joined. |
| `Spanish Immersion` | `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named programme — es keeps it inside its own translated sentence (`Pasan a 1–3 (Spanish Immersion)`). |
| `Transitional Kindergarten` | `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Same division-name class as Kindergarten / Junior Kindergarten. |
| `Gr 10–12` | `ar`, `es`, `fa`, `ht`, `it`, `te` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Gr 11–12` | `ar`, `es`, `fa`, `ht`, `it`, `te` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `After School / After YCC · 3:00–6:00 pm` | `es`, `fr`, `hi`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Young Cougars Club (K) · 1:15–3:00 pm` | `es`, `fr`, `hi`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `$1.00 / min` | `es`, `fr`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `$10 / 10 min` | `es`, `fr`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `96% — 38 AP Scholars with Distinction, 27 with Honor, 33 Scholars` | `fr`, `hi`, `it`, `te` | AP award-tier names; te/fr/it/hi keep the tier tokens (the te National Merit convention, generalised). |
| `Kindergarten · 2:00–3:00 pm` | `es`, `fr`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Kindergarten · 2:00–4:30 pm` | `es`, `fr`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Kindergarten · 2:00–6:00 pm` | `es`, `fr`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `TK · 1:00–3:00 pm` | `es`, `fr`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `TK · 1:00–4:30 pm` | `es`, `fr`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `TK · 1:00–6:00 pm` | `es`, `fr`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `**7** Semifinalists · **7** Finalists · **2** Commended · 1 Scholar, 1 College-Sponsored Scholar` | `fa`, `fr`, `te` | All-award-tier row with no trailing non-award prose — the te National Merit rule exactly. |
| `After Care 4:00–5:30 pm (TK–8)` | `es`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Before Care 7:30–8:45 am (TK–8)` | `es`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Football · Asst. AD Facilities` | `fr`, `it`, `te` | Sport name plus an abbreviated AD role title — both kept classes. |
| `Gr 1–5 · 2:55–4:30` | `es`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Gr 1–5 · 2:55–6:00` | `es`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Gr 1–5 · 3:00–4:30` | `es`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Gr 1–5 · 3:00–6:00` | `es`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `JrK–Gr 8 · 3:00–6:00` | `es`, `ht`, `it` | Clock/label row where the locale keeps the grade token, the programme name and the am/pm marker — after the convention is applied nothing translatable remains. |
| `Asst AD · Boys Basketball` | `it` | Same: abbreviated AD title plus a team identifier. |
| `Governance / leadership` | `it` | it renders both words identically to English. |
| `Musical (Blumey)` | `es` | `Musical` is the same word in Spanish; `Blumey` is the award’s proper noun. |
| `SAT Math — 2025` | `fr` | fr renders `Math` identically; nothing to translate (es/bn/te/hi/it DO translate it and are in the worklist). |
| `Session 1` | `fr` | `Session` is the same word in French; the sibling `Session 2 of the flagship day camp.` translates only the trailing prose. |
| `Session 2` | `fr` | As above. |
| `Session 3` | `fr` | As above. |
| `Session 4` | `fr` | As above. |
| `Session 5` | `fr` | As above. |
| `Session 6` | `fr` | As above. |
| `Session 7` | `fr` | As above. |
| `Softball · MS Girls Basketball` | `ar` | Same: two team identifiers, middot-joined. |

### One English-side defect fixed in the same pass

`it` rendered the *rising-grade* vocabulary three different broken ways, none of which
either detector reports — the value differs from English, so both consider it translated:

```
"Rising K"          ->  "K in salita"              # literal 'uphill' — a mistranslation
"Rising 9th–12th"   ->  "In ingresso Rising 9th–12th"   # English word never removed
"Rising 1st–5th"    ->  "In ingresso 1st–5th"      # English ordinals inside Italian
```

All three were normalised to `in ingresso` with Italian ordinals across **73 entries**,
including ~30 full prose sentences in the Carmel card that also said `in salita` — fixing
only the labels would have left the card internally inconsistent. Verified in-browser:
0 occurrences of either defect remain on Carmel, Cannon or Gaston Day.

**Neither detector can see this class.** A wrong-but-not-English translation is invisible
to a tool that asks only *"is this still English?"* — the same gap `check:live` gate 3
closed for the content overlay.

## Reproducing this

```
node scripts/find_english_leaks.mjs --lang <code>     # per-locale review queue
```

Note the tool's default `--refs` is a **seven-locale list that excludes `hi` and `ar`** as
reference locales. Per-locale totals are unaffected, but any banding computed from it is
scored against seven peers, not eight — worth knowing before comparing a future count
against the numbers above.

---

# Phase 2 — what translating actually found (2026-08-23)

Phase 1 triaged **133 of the 147 as LEAK** and handed Phase 2 a worklist of
**174 (string, locale) edits**. Translating them changed that verdict substantially:
**100 were translated; 74 were reclassified as KEEPs.**

Every one of the 74 was reclassified for the **same reason the ledger already names as the
override** — per-locale internal consistency. Phase 1 scored each string on the
cross-locale test (*7–8 locales rendered this as prose, so it is prose*) without opening
the locale's own siblings. Phase 2 opened them, and in 74 cases the locale that "kept" the
string was following a convention it applies to the whole class.

**The lesson is about the method, not the strings.** The cross-locale diff is a good
*detector* and a poor *adjudicator*. It cannot see the one piece of evidence that decides
the call: how the same locale treats the string's siblings in the same card. Triage that
skips that lookup will over-report leaks at roughly the rate seen here — a 43% correction.

## Reclassified by locale, with the sibling evidence

| Locale | Kept | The convention that decided it |
|---|---|---|
| `te` | 35 | Keeps **all 12** bare National Merit award-tier strings (`**9** Semifinalists`, `34 Semifinalists · 33 Commended · …`), translating only when extra prose is attached (`— 17 in the 97th percentile or above`). Also keeps division/course titles (`Lower School Courses`, `Fine Arts electives`), bare sport names (`Swimming`, `Wrestling`, `Cross country / track`) and `drop-in` as a loanword. |
| `fa` | 14 | Keeps course-catalog titles and `visual.media[].detail` technique lists verbatim (`hand-building, wheel throwing, glazing, firing`), translating only running sentences. Same for arrow-sequence ladders (`Drawing & Painting beginner → intermediate → honors → AP`). |
| `fr` | 7 | Keeps **all 20+** `Sessions N, M` camp labels — `Session` is French. `FBLA, Euro Challenge, PD Economics Challenge — plus DECA` is four org names and `plus`, also French. |
| `it` | 5 | Keeps `Top-75 …` tier labels (all three), `grades N–M` as an identifier token (`per le grades 6–8`), and uses `Leadership` / `Governance` / `media` as Italian loanwords — so `Leadership / media` is already Italian. |
| `hi` | 5 | Keeps `Full Day …` category labels (all three), `Musical` as a loanword (translating only `Play` → `नाटक`), and `varsity` + `baseball` as loanwords. |
| `ar` | 3 | Keeps **11 of 12** Charlotte Catholic department names in Latin — only `World Languages` is translated. Translating these three would have made them the odd ones out in a single rendered card. |
| `bn` | 3 | Keeps `drop-in` as a loanword, so `Lower School · drop-in` has nothing left to translate. |
| `es` | 1 | `NCISAA, individual` — `individual` is spelled identically in Spanish. The correct translation is byte-identical to the English. |
| `ht` | 1 | Keeps `Top-75 National Universities` and `Top-75 Liberal Arts` as tier labels; `Top-75 Liberal Arts Colleges` is the same class. |

## The same string is a leak in one locale and a keep in another

`Cross country / track` is the clearest case: a **KEEP** in `te`, which keeps bare sport
names as roster identifiers, and a genuine **LEAK** in `hi`, which renders it
`क्रॉस कंट्री / ट्रैक`. Both are correct. A ledger keyed only by English text would have to
record this string twice with opposite verdicts — which is why every row above is keyed by
**(string, locale)**, never by string alone.

`Top-75 Liberal Arts Colleges` behaves the same way (KEEP in `it` and `ht`, translated by
`es`/`bn`/`te`/`fr`), as does `FBLA, … — plus DECA` (KEEP in `bn` and `fr`).

## Phase 1's one English-side defect is now translated

The repaired `St. Augustine Club` note shipped English in all nine locales at the end of
Phase 1 (its stamp was re-cut, blanking every translation). All nine are translated here,
and `check:runtime` moves 11,407 → **11,408 entries per locale** as a result.

## A build trap found in Phase 2 — the wrong overlay builder silently empties a file

`financial-aid-tuition.content` is the odd overlay: it stores a `blocks` **object** keyed by
hash, and its work file keys units under **`sections`**, not `strings`. Running the ordinary
`i18n_build_overlay.mjs` against it **exits 0 and writes `{"strings": []}`** — a
syntactically valid overlay holding nothing, which the runtime then falls back through to
English for all 70 blocks. Use `i18n_build_content_overlay.mjs` for this topic, and note it
takes `--topic financial-aid-tuition` **without** the `.content` suffix.

`check:live` catches the damage (gate 2), which is how it was found — but only after the
file was already overwritten.

## Three content blocks were translated in the SHIPPED file and English in the WORK file

Rebuilding `financial-aid-tuition.content` for `fr`/`it`/`hi` regressed three blocks per
locale (`92553f5e`, `78e448bd`, `df673496` — the Wayback tuition quotes) from good
translations to English, because the work file had never received them. The shipped overlay
was ahead of its own source.

This is the mirror image of the documented `check:runtime` blind spot: that check validates
the work file, so it reported green on both the stale-work-file state and the regression.
**`check:live` is the only check that saw it.** The work files now carry the translations,
so a future rebuild is safe — but the general lesson is that **a rebuild is not a no-op**:
diff the shipped overlay against `HEAD` after rebuilding, and treat any block you did not
intend to touch as a regression to investigate.

---

# The within-locale sibling ledger — 2026-08-23

`scripts/find_sibling_leaks.mjs` (`npm run i18n:siblings`) is the second detector in the
i18n kit, built by the `midband` plan. Where `find_english_leaks.mjs` compares **one string
across locales**, this one compares **one locale's string against its own siblings** in the
same rendered card. It exists because PR #190's retrospective concluded, after correcting
its own triage 74 times, that the cross-locale diff is **a good detector and a poor
adjudicator**: it cannot see the evidence that actually decides the call.

**It is documentation and a review queue, not a gate.** The script exits 0 always and is
deliberately **not** chained into `npm run build` — this repo has twice parked a checker at
a permanent non-zero and watched it stop being read.

## Why a second detector was needed — the 7+ blind spot, measured

`find_english_leaks.mjs` defaults to `--min 2`: it reports a string only if **≥2 reference
locales translated it**. A string that 7 or more of 9 locales keep almost never clears that
bar, so it **never enters that queue at all**. That is not a tuning choice; it is structural.

The sibling detector's first run surfaced **151 distinct strings** across 749 candidates.
Banding them by how many of the nine locales keep them:

| Cross-locale band | Distinct strings | Reachable by `i18n:leaks`? |
|---|---|---|
| 1–2 | 22 | yes — closed by PR #190 |
| 3–6 | 45 | yes |
| **7+** | **84** | **no — structurally invisible** |

**84 of 151 sit in the band PR #190 declared "no work warranted".** They are strings almost
every locale keeps, yet inside a single card each is a lone English cell among translated
siblings. The two detectors are **orthogonal on purpose**; their union is the coverage.

## The step-3 pin, and the one expectation that was wrong

The plan required the detector be pinned against PR #190's known answers in both
directions. Result: **three of four as predicted, and the fourth was the plan's error, not
the detector's.**

- ✅ Flags `Relax/Choice Time` in `es` (11 of 13 siblings translated).
- ✅ Does **not** flag `ar`'s Charlotte Catholic department names.
- ✅ Does **not** flag `fr`'s `Sessions N, M` labels.
- ❌ **Does** flag two `te` National Merit tier strings, which the plan said would indicate
  mis-grouping.

The detector is right and the ledger's earlier claim was over-broad. PR #190 recorded that
`te` "keeps **all 12** bare National Merit award-tier strings, translating only when extra
prose is attached." Re-measured, `te` keeps only **2** of the six rows in
`providence-day:transcript.merit`, and it **translated** a bare-looking sibling:

```
TRANS  "**7** Semifinalists · **16** Commended · 13 College Board National Recognition awards"
    -> "**7** Semifinalists · **16** Commended · 13 College Board National Recognition పురస్కారాలు"
KEPT   "**7** Finalists · **16** Commended · 8 College Board Achievement Scholars"
KEPT   "**9** Semifinalists"
```

The real convention is narrower and more precise: **`te` keeps the award-tier tokens
(`Semifinalists`, `Commended`, `Finalists`) and translates only trailing non-award prose**
(`awards` → `పురస్కారాలు`). The two kept rows have no trailing prose, so nothing remained
to translate. They are genuine KEEPs — reached by triage, not by the detector staying
silent. **A detector that stays silent proves nothing; one that flags and is then
adjudicated leaves a record.** That is the argument for this script.

## The standing conventions, decided once and applied to all nine

Settled here from what the already-translated instances actually do, rather than by
preference — the majority behaviour was checked before being adopted as the rule.

**1. Grade / time labels — translate the word, keep the clock and grade tokens
char-for-char.**

```
"Kindergarten · 2:00–6:00 pm"  ->  ar  "رياض الأطفال · 2:00–6:00 مساءً"
                                   te  "Kindergarten · మధ్యాహ్నం 2:00–సాయంత్రం 6:00"
"Gr 1–5 · 2:55–4:30"           ->  fr  "Niv. 1–5 · 2:55–4:30"
                                   hi  "कक्षा 1–5 · 2:55–4:30"
```

The grade word (`Gr`, `Grades`, `Kindergarten`) and the am/pm marker are prose and move.
The digits, the en-dash span and the `·` separator never do.

**2. Money and unit labels — the same rule.** The unit word translates; the figure is
copied char-for-char, and the currency stays USD.

```
"$95/week"     ->  es "$95/semana"   fr "$95/semaine"   ht "$95/semèn"
"$1.00 / min"  ->  hi "$1.00 / मिनट"  te "నిమిషానికి $1.00"
```

This does **not** reopen the converted-units question `CLAUDE.md` records (only `es`
converts `sq ft` today). That stays open and is out of scope here.

**3. Dates and session labels — the month name and the counter word translate; the numbers
do not.**

```
"Week 1 (Jun 8–11)"  ->  es "Semana 1 (8–11 jun)"   it "Settimana 1 (8–11 giu)"
"August 12, 2025"    ->  fr "12 août 2025"          ar "12 أغسطس 2025"
```

**4. The one exception that keeps rule 1 honest — a grade word followed by a SUBJECT noun
is a course title, not a grade tag.** `9th Grade History`, `Sixth Grade Bible`,
`5th Grade Math` and seven siblings are **KEEPs**: verified across all nine locales, **not
one translates any of them**. Without this carve-out the convention would have translated
ten catalog-matchable course titles.

## What the triage found

| | Count |
|---|---|
| Sibling candidates (749 rows) | **151 distinct strings** |
| Mid-band 3–6 substantive strings (≥15 chars, non-convention) | **151** |
| Verdict LEAK → Phase 2 worklist | **1,172 (string, locale) edits · 237 distinct** |
| Verdict KEEP → this ledger | **612 rows · 102 distinct** |

The dominant genuine-leak shape is a **department or subject-category name** sitting in a
list whose every sibling is translated — `Health & Fitness` beside a translated `Science`,
`English`, `Mathematics`; `Biblical Studies` beside eight translated departments;
`Library / Information Literacy` beside a translated `Physical Education`. The dominant
KEEP is a **proper noun or named award**.

One score-table case is worth naming because it is the cleanest defect the detector found:
in `gaston-day:wholeClass.scoreTables[0].rows`, five `SAT total — YYYY` rows are translated
and the two subscore rows — `SAT Math — 2025`, `SAT EBRW — 2025` — are not. Nothing about
those two is an identifier; they were simply skipped.

## An English-side bug this pass surfaced

`it` renders `Rising 9th–12th` as **`In ingresso Rising 9th–12th`** — the translation was
prepended without removing the English word. Left as-is for Phase 2 to fix with the rest of
the convention class; recorded here because it is a *translation* defect that neither
detector reports (the string is not identical to English, so both consider it done).

## The KEEPS — keyed by (string, locale)

PR #190 established that the same string is legitimately a **leak in one locale and a keep
in another** (`Cross country / track`: KEEP in `te`, real LEAK in `hi`). Every row is
therefore keyed by string **and** locale.

| English | Kept by | Why it is a keep |
|---|---|---|
| `— Class of 2022 · TO VERIFY` | `bn`, `fa`, `hi`, `ht`, `it`, `te` | Editorial provenance marker; the sibling that IS translated is the longer sentence form of it. |
| `"Although service is not a graduation requirement at Cannon, students' deep sense of com…` | `bn`, `hi`, `it`, `te` | Verbatim quotation from the school profile (ledger class, PR #190). |
| `"Due to the small class size and the college-bound nature of Covenant Day’s population, …` | `bn`, `te` | Verbatim quotation (already a bn/te ledger KEEP, PR #190). |
| `"multiple Scholastic Art Award winners"` | `bn`, `es`, `ht`, `te` | Verbatim quotation naming an award; quoting convention differs per locale (ledger, PR #190). |
| `(SEC · Big Ten · ACC · Big 12)` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Four named athletic conferences. |
| `**7** Finalists · **16** Commended · 8 College Board Achievement Scholars` | `te` | te keeps the award-tier tokens (Finalists/Commended/Scholars) and translates only trailing prose — this row has none. |
| `**9** Semifinalists` | `te` | Bare award tier with no trailing prose; nothing left to translate under the te convention. |
| `**College Application Bootcamp**` | `ar`, `bn`, `es`, `fr`, `hi`, `ht`, `it`, `te` | Named counselling-timeline milestone. |
| `**College Kick-Off**` | `hi` | Named counselling-timeline milestone, same class as College Application Bootcamp. |
| `~30,000 sq ft, 2022` | `it` | Figure plus unit — the open converted-units question, not this pass to settle (ledger, PR #190). |
| `~47,000 sq ft, 2022` | `it` | Figure plus unit. |
| `11 National Merit Commended Students (2025)` | `te` | Award-tier tokens under the te convention; the translated siblings carry non-award prose. |
| `2 National Merit Finalists (2025)` | `te` | Same as above. |
| `2026 Blumey — Best Actress` | `bn`, `hi`, `te` | Named award category with its year. |
| `50,000 sq ft, 2001` | `it` | Figure plus unit. |
| `53,000 sq ft, 2001` | `it` | Figure plus unit. |
| `A Princess Castle Dollhouse Adventure` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named camp offering as printed in the catalog. |
| `ACC · Big Ten · Big 12 · SEC` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Four named athletic conferences. |
| `Acts and the Early Church + Case for Christ` | `ar`, `bn`, `fa`, `fr`, `hi`, `it`, `te` | Named curriculum units; the sibling prose keeps them verbatim inside a translated sentence ("পড়ানো হয় Acts and the Early Church"). |
| `Advanced Topics` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named course category (the "AT" in school-designed AT courses); catalog-matchable. |
| `AFAR International Research` | `ar`, `bn`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named programme (AFAR); catalog identifier. |
| `After School Program · 3:00–6:00 · $3,784/yr` | `fa`, `hi`, `it` | Programme name, clock span and a figure — the grade/time convention leaves nothing. |
| `Apple Distinguished School` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named Apple certification. |
| `Art Studio I–IV` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Course code with roman-numeral range; catalog-matchable. |
| `Arts Jam · Cabaret` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named season events. |
| `Assoc. Director` | `te` | Bare Director job title; te keeps the class (ledger, PR #190). |
| `Athletic Director` | `bn`, `fr`, `hi`, `te` | Standing ledger KEEP (2026-08-19) — the per-locale-consistency override. |
| `Battle of the Books` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named competition. |
| `Blumey Best Show` | `bn`, `fr`, `hi`, `ht`, `it`, `te` | Named award category. |
| `Camp Victor · 8:30am - 3:30pm` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named camp plus a clock span. |
| `Charger Chill Day Camp · 8am–5pm` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named camp plus a clock span. |
| `Christians in Theatre Arts (CITA)` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named organisation with its acronym. |
| `College Counselor` | `te` | Bare job title beside a kept Director; same class. |
| `College Essay Bootcamp` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named camp offering. |
| `Cross Country / Track` | `fa`, `hi`, `te` | Bare sport names as roster identifiers (ledger precedent, PR #190). |
| `DECA, Debate, Model UN, Latin Club` | `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Four organisation names in a list. |
| `Digital Art and Graphic Design` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Course-catalog title in a media list. |
| `Digital Art, Graphics, and Anime` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Course-catalog title in a media list. |
| `Director of Athletics` | `bn`, `fr`, `hi`, `it`, `te` | Same class as Athletic Director; bn/te keep bare Director titles in Latin (ledger, PR #190). |
| `Edinburgh Fringe` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named festival. |
| `Family Individualized Tuition (FIT)` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named diocesan tuition programme with its acronym. |
| `February One Scholarship (NC A&T)` | `bn`, `fr`, `hi`, `ht`, `it`, `te` | Named scholarship. |
| `Friends of the Arts` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named parent volunteer organisation. |
| `Gatorade Player of the Year` | `ar`, `bn`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named national award. |
| `Gatorade Players of the Year` | `ar`, `bn`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named national award, plural. |
| `Girls Basketball` | `fa`, `fr`, `hi`, `it` | Bare sport name as a roster identifier. |
| `Governor’s School` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named NC state programme. |
| `Gr 1–4 · Bridge 2:40–3:35` | `es`, `ht`, `it` | Same shape as above. |
| `hand-building, wheel throwing, glazing, firing` | `fa` | Technique list in visual.media[].detail — fa keeps these verbatim by convention (ledger, PR #190). |
| `Health Occupations Students of America` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Official national organisation name (HOSA); the club catalog keeps org names verbatim. |
| `History 7: A More Perfect Union` | `bn` | Course title; the sibling History 6 keeps its "History 6:" prefix in Latin too, translating only the descriptive tail — same shape, and bn did translate that tail elsewhere. Catalog-matchable title. |
| `Hoffman Riley Court` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named venue. |
| `Improv & Musical Review` | `fr`, `it` | Named enrichment offering (already a fr/it ledger KEEP, PR #190). |
| `JK–K · Bridge 2:20–3:15` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Grade tokens plus a clock span, and Bridge is a named programme; per the grade/time convention nothing translatable remains. |
| `Johnson Scholarship, Washington & Lee (2026)` | `bn`, `es`, `fr`, `hi`, `ht`, `it`, `te` | Named scholarship at a named university. |
| `Junior Classical League chapter` | `te` | Named national organisation; "chapter" alone is not enough to make the string prose. |
| `Latin Arts Association` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named parent/faculty organisation. |
| `Leadership / media` | `it` | Both words are Italian loanwords already; the correct rendering is byte-identical (ledger precedent, PR #190). |
| `Lower School · PS–4th` | `bn`, `fr`, `hi`, `it`, `te` | Division identifier plus a grade token; the translated siblings all carry an extra prose word (weekly enrolment, drop-in). |
| `Lower School (JK–4)` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Division identifier with its grade span. |
| `Lower School (JrK–4)` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Division identifier with its grade span. |
| `Lower School (TK–5)` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Division identifier with its grade span; kept in Latin by every locale. |
| `McDonald's All-Americans` | `ar`, `fa`, `fr`, `hi`, `it`, `te` | Named national honour. |
| `Metrolina Athletic Conference` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named athletic conference. |
| `Middle School · 5th–8th` | `bn`, `fr`, `hi`, `it`, `te` | Same shape as above. |
| `Middle School (5–8)` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Division identifier with its grade span. |
| `Middle School (6–8)` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Division identifier with its grade span. |
| `Mike Hazel, NSCA CSCS.` | `es`, `fr`, `ht`, `it`, `te` | Person name plus certification acronyms. |
| `Mock Trial art 2nd NC` | `te` | Named competition plus a rank token; the sibling ranks (Chess 2nd place) that te translated carry a full word it could translate. |
| `Musical (Upper School)` | `bn`, `es`, `hi`, `it`, `te` | "Musical" is a loanword in these locales (hi ledger precedent, PR #190) and Upper School is a kept identifier. |
| `NASCAR Cup Series` | `ar`, `bn`, `fr`, `hi`, `ht`, `it`, `te` | Named racing series. |
| `National Honor Society (28 in ’25), Global Studies Diploma, Acclaim Scholars` | `bn` | Three named programmes/awards (already a bn ledger KEEP, PR #190). |
| `NC Mr. Basketball` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named state award. |
| `NC Mr. Football + All-Americans` | `ar`, `fr`, `hi`, `ht`, `it`, `te` | Named state award plus a named national honour. |
| `P.E. — Dancercise II` | `es` | Course code with a roman numeral and a coined brand word (Dancercise); catalog-matchable. |
| `Patriot Athletic Hall of Fame` | `ar`, `bn`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named school hall of fame. |
| `Promoting Respect, Inclusion and Safety for Sexual Minorities` | `bn`, `es`, `fr`, `hi`, `ht`, `it`, `te` | Official club name (PRISM) spelled out as printed. |
| `QuestBridge Scholar → Stanford` | `bn`, `fr`, `hi`, `ht`, `it`, `te` | Named programme plus a university name; the arrow is punctuation. |
| `Restoration & Sustainability` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named Covenant Day high-school department with its own director — the sibling prose calls it "a named department". |
| `Scholastic Art Awards` | `ar`, `bn`, `es`, `fr`, `hi`, `ht`, `it`, `te` | Named national award programme. |
| `Science Olympiad, Envirothon, Battle of the Books, Model UN` | `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Four named competitions. |
| `SMU Hunt Leadership Scholars Program` | `ar`, `bn`, `es`, `fr`, `hi`, `ht`, `it`, `te` | Named scholarship programme. |
| `Spanish I / French I / Mandarin I` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Course codes with roman numerals — a family matches these against the published catalog. |
| `Speech and Debate` | `ar` | Club name; ar keeps club identifiers in Latin, translating only the descriptive columns beside them. |
| `Spotlight on the Arts` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named recurring event. |
| `St. Augustine Scholars Program` | `ar`, `bn`, `es`, `fr`, `hi`, `ht`, `it`, `te` | Named school programme. |
| `Strength & Conditioning` | `bn`, `hi`, `it`, `te` | Role label already triaged and settled 2026-08-19 (PR #151) — bn/it keep it. |
| `Strength of America Award` | `ar`, `bn`, `fr`, `hi`, `ht`, `it`, `te` | Named award. |
| `Students Advocating for Gender Equality` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Official club name as printed in the catalog. |
| `Studio Art · Art History · Music Theory` | `ar`, `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Three AP course-catalog titles separated by middots. |
| `Studio Art (2-D & 3-D) · Art History` | `fa`, `hi`, `it` | Course-catalog titles with their dimension qualifiers. |
| `Super Women's Affinity Group` | `ar`, `bn`, `fr`, `hi`, `it`, `te` | Official affinity-group name as printed. |
| `The Educational Resource Program` | `fr` | Named in-house programme (already a ledger KEEP for fr, PR #190). |
| `Tuition Protection Program · $250/yr` | `it` | Named programme plus a figure; the translated siblings are common-noun fee names (Enrollment fee, New family fee). |
| `Ultimate Frisbee` | `ar`, `bn`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Sport name — the roster convention keeps bare sport names as identifiers (ledger precedent: te sport names, PR #190). |
| `Upper School Musical` | `hi` | Same as above — hi keeps Musical as a loanword and Upper School as an identifier. |
| `USA Lacrosse All-Americans` | `ar`, `fr`, `hi`, `ht`, `it`, `te` | Named national honour. |
| `varsity baseball` | `hi` | hi keeps varsity and baseball as loanwords (ledger, PR #190). |
| `Volleyball · Guidance Director` | `fr` | Sport name plus a bare Director title — both kept classes. |
| `Wachovia / Wells Fargo Cups` | `es`, `fr`, `ht`, `te` | Named state trophy under both sponsor names. |
| `Wells Fargo Cup` | `bn`, `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named state trophy. |
| `Wells Fargo Cups` | `es`, `fa`, `fr`, `hi`, `ht`, `it`, `te` | Named state trophy, plural. |

## Reproducing this

```
npm run i18n:siblings -- --lang <code>          # the within-locale review queue
npm run i18n:leaks    -- --lang <code>          # the cross-locale review queue
```

Run **both**. Neither is a superset of the other, and the 84 strings above are the proof.
The full triage record and the Phase 2 worklist are in `.claude/plans/midband-data/`.
