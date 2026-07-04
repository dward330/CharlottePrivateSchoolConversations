# Source Material — Charlotte Private School Research

Raw reference files (PDFs, plus some NotebookLM prompt `.md`/`.txt` files) on six Charlotte-area
private schools, organized by topic then school:

```
source-material/<topic>/<school-slug>/<files>
```

> Gitignored raw material. Distill/summarize into `.claude/docs/` (tracked) as needed.

## Topics

| Topic slug | Files | Notes |
|------------|-------|-------|
| `the-arts` | 37 | Arts programs (built from research; each has a Deep Research report) |
| `sports` | 78 | Athletics research (13 docs/school) |
| `college-support` | 51 | College counseling & outcomes |
| `student-clubs` | 48 | Clubs & activities |
| `after-school` | 21 | Extended day / aftercare / enrichment (each has a Deep Research report) |

Grand total: 235 documents across 30 school folders (+ index files).

## Schools (slug → full name)

| Slug | School |
|------|--------|
| `cannon` | Cannon School (JrK–12, Concord) |
| `charlotte-christian` | Charlotte Christian School (JK–12, Christian) |
| `charlotte-country-day` | Charlotte Country Day School (JK–12) |
| `charlotte-latin` | Charlotte Latin School (TK–12) |
| `davidson-day` | Davidson Day School (age 2–12, Lake Norman) |
| `providence-day` | Providence Day School (TK–12) |

Every topic contains all six school folders. See each topic folder for its documents; the
`the-arts/INDEX.md` file lists the per-document breakdown for that topic.

## Conventions

- Slugs are lowercase, hyphenated; use them for referencing schools/topics in code and prompts.
- File names keep their original descriptive titles (`<School> - <Topic> - <Subtopic>`).
- School prefixes inside file names vary by original source (e.g. `CCD` = Charlotte Country Day).
- Source folder of record for raw research: `~/Downloads/Research`.
- Compiled July 2026.
