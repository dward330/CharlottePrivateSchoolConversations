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

**Figures are never re-typed.** Numbers keep their value; only Spanish decimal and
thousands conventions apply where the number is written out in prose
(`20,642` → `20.642`, `3.6 GPA` → `3,6`). Currency continues to be handled at
render time by `localizeMoneyText()`, never here.

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

> **Status 2026-07-29: closed without a native-speaker review.** The list below
> was written for a Kreyòl speaker who never reviewed it. Everything here is
> therefore *unverified* — it records the calls that were made and why, not
> calls that a speaker confirmed. Treat it as the agenda for a review that is
> still owed, not as a record of one that happened.

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
