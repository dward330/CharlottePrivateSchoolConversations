# Plain-language review — src/data/learningSupport

Base `b11f2a86` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 0 |
| charlotte-catholic | 2 |
| charlotte-country-day | 5 |
| davidson-day | 2 |
| hickory-grove-christian | 1 |
| **Total** | **10** |

Guards: all pass (paths, digits, URLs/emails, quotes, year spans, non-prose leaves, dates/times, money/percent/year tokens, markers, repeats, worklist-only edits, markdown fields).

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-catholic | `services.verdicts.attn.head` | A one-semester Academic Skills course in executive function, then Guided Academic Support. | A one-semester Academic Skills course in executive function (planning, organizing and focus skills), then Guided Academic Support. | 12→17 | —→— | pass |  |
| 2 | charlotte-catholic | `staff.note.muted` | Counselors are assigned by last name (A–De, Di–Ho, Hu–Mi, Mo–She, Shi–Z) and stay the same for all four years; the Director of Counseling counsels students new to the school in grades 10–12. | Counselors are assigned by last name (A–De, Di–Ho, Hu–Mi, Mo–She, Shi–Z) and stay the same for all four years. The Director of Counseling counsels students new to the school in grades 10–12. | 31→31 | 11.7→5.7 | pass |  |
| 3 | charlotte-country-day | `lead.strong` | Country Day’s Educational Resource Program “assists students in grades junior kindergarten through grade 12,” with one-on-one learning support in the Lower and Middle Schools, academic coaching in the Upper School, and accommodations for students with a documented disability. | Country Day’s Educational Resource Program “assists students in grades junior kindergarten through grade 12,” the school says. The program gives one-on-one learning support in the Lower and Middle Schools and academic coaching in the Upper School. Students with a documented disability can get accommodations. | 30→36 | 18.1→9.7 | pass |  |
| 4 | charlotte-country-day | `eligibility.eligible` | Accommodations are for “students with documented disabilities,” which a licensed service provider must document “through a full psychoeducational evaluation.” Learning-support sessions are different: the Lower School says a psychoeducational evaluation “is not required for services,” and Middle School support is open to students “both with and without formal testing.” | Accommodations are for “students with documented disabilities,” which a licensed service provider must document “through a full psychoeducational evaluation.” Learning-support sessions are different. A psychoeducational evaluation (testing of how a child learns) “is not required for services,” the Lower School says. Middle School support is open to students “both with and without formal testing.” | 33→38 | 18.7→9.8 | pass |  |
| 5 | charlotte-country-day | `services.groups[0].rows[10].detail` | Formal accommodations need a full psychoeducational evaluation, reviewed every three years in Lower and Middle School and every four in Upper School, and submitted through the ERP’s secure online form. Learning-support sessions need none. | Formal accommodations need a full psychoeducational evaluation (testing of how a child learns). The evaluation is submitted through the ERP’s secure online form. It is reviewed every three years in Lower and Middle School and every four in Upper School. Learning-support sessions need none. | 34→44 | 12.6→9.1 | pass | DOCUMENTATION 2→3 |
| 6 | charlotte-country-day | `testing.headline` | Lower School students are screened three times a year, and the Educational Resource Program tiers support from the results. Formal accommodations need a full psychoeducational evaluation from an outside provider. | Lower School students are screened three times a year. The Educational Resource Program uses the results to decide how much support each student gets. Formal accommodations need a full psychoeducational evaluation from an outside provider. | 30→35 | 11.1→9.2 | pass |  |
| 7 | charlotte-country-day | `testing.entries[3].muted` | The accommodations page says evaluations are reviewed every three years in Lower and Middle School and every four in Upper School; the linked policy says three years through grade 5 and four from grade 6. | The accommodations page says evaluations are reviewed every three years in Lower and Middle School and every four in Upper School. But the linked policy says three years through grade 5 and four from grade 6. | 33→34 | 15.2→8.7 | pass |  |
| 8 | davidson-day | `eligibility.eligible` | Each LEC service is “available to students at all grade levels,” and the center supports “students ages two through grade 12.” Families “submit our request form,” and the Director of Learning Services “will then call you to discuss the kind of academic support your child needs.” The 2026-2027 request form asks for no diagnosis, evaluation or other documentation. | Each LEC service is “available to students at all grade levels,” and the center supports “students ages two through grade 12.” Families “submit our request form,” and the Director of Learning Services “will then call you to discuss the kind of academic support your child needs.” The 2026-2027 request form asks for no diagnosis. The form also asks for no evaluation or other documentation. | 30→36 | 15.0→9.5 | pass |  |
| 9 | davidson-day | `services.verdicts.attn.head` | One-on-one academic coaching for executive function, at every grade. | One-on-one academic coaching for executive function (planning, organizing and focus skills), at every grade. | 9→14 | —→— | pass |  |
| 10 | hickory-grove-christian | `eligibility.headline` | ESS serves students with identified learning differences, including any student who arrives with a 504, an IEP or a prior school’s accommodations plan. Emotional and behavioral intervention is outside its scope. | ESS serves students with identified learning differences. That includes any student who arrives with a 504, an IEP or a prior school’s accommodations plan. Emotional and behavioral intervention is outside its scope. | 30→31 | 11.9→9.4 | pass |  |

## Chrome labels

Hand-edited in `src/locales/en.json` (`git diff` shows exactly these five values). Record:
[worklist-chrome.json](worklist-chrome.json).

| Key | Before | After | Where it renders | Reason |
|---|---|---|---|---|
| `metrics.institutional-leverage` | Institutional Leverage | College Connections | Compare → College Support, research-coverage row (still row 27/30, after "Fit & Rank") | "Leverage" is jargon; the docs behind the row are a school's ties to colleges (NACAC/NACCAP, dual-enrollment partners, a director's standing). `metrics.ts` label untouched, so the sort is unchanged |
| `metrics.matriculation` | D1 / Top-College Matriculation | D1 / Top-College Enrollment | Compare → Sports, research-coverage row (still 32/47) | The jargon map's own replacement; same meaning. **Open question:** "Commitments" fits 25 of the 28 docs better but changes the meaning |
| `highSchoolPlacement.acceptanceNotMatriculation` | ACCEPTANCE ≠ MATRICULATION | ACCEPTED ≠ ENROLLED | HSP Outcomes card caveat. **Renders for no shipped school today** (Trinity has no Outcomes card; Prep's class lists suppress it), as on `main` | Same meaning and chip style; matches the sentence after it |
| `learning.need.attn` | Attention & executive function | Attention & planning (executive function) | LS need-filter tab, all 5 LS schools (fits at 320px) | Keep-and-explain: the term parents meet on the evaluation, 504 or IEP |
| `learning.need.social` | Social-emotional | Social & emotional | LS need-filter tab | Replace: plain words, same meaning |

## Independent review

A fresh `general-purpose` reviewer read every Batch 3 row (Summer, Learning Support, HSP),
both fixes-commit units and the five chrome labels. **Learning Support: 2 findings, fixed**,
both bare pronouns after a split: Country Day `lead.strong` "It gives…" → "The program
gives…"; Davidson Day `eligibility.eligible` "It also asks…" → "The form also asks…".
Country Day `services.groups[0].rows[10].detail` "It is submitted…" → "The evaluation is
submitted…" (grade 10.6 → 9.1). Checked and kept: the two glosses ("planning, organizing and
focus skills"; "testing of how a child learns"), the accommodations-vs-sessions line, the
two-statement review-cycle contradiction, no added comparison, no `[[…]]` change. The chrome
labels were all kept. Findings for Summer and HSP are in their own review files.
