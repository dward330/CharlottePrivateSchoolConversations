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

## Stage 1 — Student Clubs (203 strings, 4,471 words)

Landed 2026-07-27. Full coverage: 240/240 field sites.

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
