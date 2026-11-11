# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `bdd0e8c0` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| davidson-day | 3 |
| **Total** | **3** |

Guards: **2 FAILED**.

- (p) davidson-day:divisions[2].departments[2].courses[1].description: name new "World"
- (p) davidson-day:divisions[2].departments[2].courses[1].description: name new "History"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | davidson-day | `divisions[0].departments[0].courses[0].description` | Early Preschool (2s/3s), Preschool (3s/4s), and Junior Kindergarten (4s/5s) target cognitive skills, language development, motor skills, executive functioning, and social-emotional wellness. | Early Preschool (2s/3s), Preschool (3s/4s), and Junior Kindergarten (4s/5s) target cognitive skills, language development, fine and gross motor skills, executive functioning, and social-emotional wellness. | 21→24 | —→— | jargon "executive function" (executive functioning) → planning, organizing and focus skills — or explain it in parentheses; jargon "social-emotional learning" (social-emotional) → lessons on feelings, friendships and self-control — or explain it in parentheses |  |
| 2 | davidson-day | `divisions[2].departments[0].courses[3].description` | Reads A Long Way Gone, Much Ado About Nothing, and Predictably Irrational, extending English II skills through scaffolded responses. | Reads fiction and nonfiction such as A Long Way Gone, Much Ado About Nothing, and Predictably Irrational, extending English II skills through scaffolded responses and added writing. | 19→27 | —→— | jargon "scaffolding" (scaffolded) → step-by-step support — or explain it in parentheses |  |
| 3 | davidson-day | `divisions[2].departments[2].courses[1].description` | The Civics course with added analytical rigor, primary-source interpretation, and AP-style writing prompts. | The Civics course with added analytical rigor, primary-source interpretation, and AP-style writing prompts to prepare for AP World History. | 13→19 | —→— | jargon "rigor" (rigor) → demanding / hard (or say what makes it hard) — or explain it in parentheses | LEVEL 1→2 |

## Evidence and guard hits (second fixes commit)

Found by the Batch 1 independent reviewer: three Davidson Day descriptions had drifted from the
school's own catalog when they were first condensed. Fixed against the original text, before the
wording pass, so the wording-pass guards compare against corrected text. Source:
`source-material/course-offerings/davidson-day/Davidson Day - Course Offerings - Curriculum Guide.md`.

| Path | Problem | Fix | Evidence (record line) |
|---|---|---|---|
| `davidson-day:divisions[2].departments[0].courses[3].description` (English II Honors) | The three books are the catalog's **examples**; the description presented them as the full reading list (plan "Content that must survive", item 5), and dropped "and added writing" | "Reads fiction and nonfiction such as …" and "… and added writing" restored | line 79: "Reads fiction and nonfiction such as *A Long Way Gone*, *Much Ado About Nothing*, and *Predictably Irrational*, extending English II skills through scaffolded responses and added writing." |
| `davidson-day:divisions[2].departments[2].courses[1].description` (Civics Honors) | Dropped what the course prepares students for | "… to prepare for AP World History" restored | line 107: "… and AP-style writing prompts to prepare for AP World History." |
| `davidson-day:divisions[0].departments[0].courses[0].description` (Early Childhood) | "motor skills" narrowed the school's "fine and gross motor skills" | "fine and gross motor skills" restored | line 235: "… language development, fine and gross motor skills, executive functioning, and social-emotional wellness (S7)." |

**Guard hits by design** (fixes run, no `--check` in the plan): only (p) name new "World" and
"History" on Civics Honors, the restored "AP World History". Every other guard passes. The hook
still flags the three texts (rigor, scaffolding, executive function, social-emotional): that
jargon is the wording pass's job, on top of this commit.
