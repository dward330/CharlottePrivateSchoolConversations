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
