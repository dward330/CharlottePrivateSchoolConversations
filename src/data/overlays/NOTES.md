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
