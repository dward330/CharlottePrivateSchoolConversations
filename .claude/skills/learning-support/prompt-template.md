# Learning Support — deep-research prompt template

The prompt `/learning-support` hands the user to paste into **Claude deep research**. Fill
every `{{PLACEHOLDER}}`, then print the result inside **one** fenced block (four
backticks, so nothing inside can close it early), with nothing else inside the fence.

| Placeholder | Example | Where it comes from |
|---|---|---|
| `{{SCHOOL}}` | `Hickory Grove Christian School` | `src/data/schools.json` `name` |
| `{{SHORT}}` | `HGCS` | the school's own short name; ask if unsure |
| `{{CITY_STATE}}` | `Charlotte, North Carolina` | the user (step A1) |
| `{{CITY_ST}}` | `Charlotte, NC` | same, abbreviated |
| `{{DOMAIN}}` | `hgchristian.org` | the official site, confirmed by fetching it |
| `{{GRADES}}` | `TK–12` | the school's own site |
| `{{DISAMBIGUATION}}` | `Another "Hickory Grove" school exists outside Charlotte; discard any source not about this one.` | one sentence naming a likely collision; omit if none |

**Editing the template.** v1 (2026-10-20) was written from Hickory Grove Christian's
build (plan `learningsupport`). Its sections map 1:1 onto the six cards and the
Services-at-a-Glance rows, so **keep section numbers and the §2 service list stable**:
`/learning-support` mode B maps PDF sections to cards by number. Section 2's list is the
row set of `services.groups` in `src/data/learningSupport/hickory-grove-christian.ts`. If
that set grows, grow this list in the same PR.

---

````
Research {{SCHOOL}} ({{CITY_STATE}}; official site {{DOMAIN}}; independent
{{GRADES}} school) and produce a research dossier on its LEARNING SUPPORT and
STUDENT SERVICES for students with learning differences, attention or
executive-function needs, therapy needs, and social-emotional needs, plus any
gifted support, as of today. Make sure every source is about THIS school.
{{DISAMBIGUATION}}

Title it: "{{SCHOOL}} ({{CITY_ST}}): Learning Support & Student Services —
Research Dossier (as of <month year>)"

SOURCING RULES (these matter more than coverage)
1. Use ONLY the school's own official sources: pages on {{DOMAIN}}, PDFs the
   school hosts or links (fee schedules, handbooks, admissions checklists,
   school profiles, course catalogs), the school's own job postings, and
   archived copies of those pages (web.archive.org). Do NOT use third-party
   directories, review sites, therapy-provider listings, news articles or
   district pages as evidence of what the school offers. If you see one, you may
   mention it in a short "seen but not used" list at the end, with its URL.
2. Every fact gets its FULL source URL inline, next to the fact. For a PDF, give
   the PDF URL and the page number.
3. Quote the school's exact wording for program names, eligibility language,
   exclusions ("we do not provide…"), service descriptions, fees and staff
   titles. Never round or reformat a number. Copy every fee exactly as printed,
   with its unit (/year, /semester), grade band and the schedule's year.
4. When something cannot be found, write "NOT STATED" and list where you looked.
   Never infer that a service is offered or not offered. "Not stated" and "not
   offered" are different findings: only write "NOT OFFERED" when the school
   itself says so, and quote it.
5. If a page fails to load, retry it and say so. Do not conclude that its
   content does not exist. Check the site's navigation for renamed programs: a
   learning-support program is often renamed, and the old URL may 404 while the
   new one is live.
6. Do NOT name any student. Staff may be named exactly as the school names them.
7. SKIP these entirely, even where the school's page links them: state
   scholarship or education-savings-account programs (e.g. ESA+, Opportunity
   Scholarship), and the public-school-district evaluation route (district
   Exceptional Children offices, IDEA child-find requests). They are out of scope.
8. This dossier is about THIS school only. Do not compare it with other schools.

SECTIONS

TL;DR: 3–5 bullets covering what the program is called, who it serves, what it
does not do, what it costs, and the biggest gaps.

1. Program & eligibility: the program's official name (and any former name),
   which grades it serves, who is eligible (quote it), what documentation the
   school asks for and when (admissions checklists count), how a student with
   an existing 504, IEP or prior accommodations plan is handled, and anything
   the school says is OUTSIDE its scope (quote it).

2. Services matrix: for EACH service below, give one line: Status (in-house /
   in-house for a fee / referral only / required of the family / NOT STATED /
   NOT OFFERED per the school) | the school's own wording | fee if published |
   URL.
   Learning & academic: specialized learning-support teachers; reading
   intervention (name any method, e.g. Orton-Gillingham, Wilson, structured
   literacy); math intervention; 1:1 or small-group instruction; tutoring or
   study-hall-style support periods; executive-function / academic coaching;
   a learning-support class during the school day; accommodations and case
   management; specially designed instruction or curriculum modification; a
   self-contained or separate program; gifted or advanced support; eligibility
   documentation.
   Therapy & related services: speech-language therapy; occupational therapy;
   physical therapy.
   Assessment: screening; entrance or placement testing; psychoeducational
   evaluation (in-house or referral); testing accommodations.
   Wellness & health: counseling / social-emotional support (who provides it,
   and in what framework); emotional or behavioral intervention; crisis
   resources; school psychologist; school nurse.
   Language: ESL / English-language support.

3. Fees: transcribe every published learning-support fee schedule in full, as
   a table, with its school year, revision date and URL. Note anything on the
   schedule that looks inconsistent rather than correcting it.

4. Therapy & related services: anything the school says about speech, OT, PT
   or counseling during the school day, on-campus outside providers, or
   referral. Name any therapist or pathologist the school lists, with their
   exact title and their email if the school publishes one. If nothing, say
   NOT STATED for each.

5. Testing & evaluation, meaning how a learning need is identified (not
   admission testing): any screening or early identification; who carries out
   psychoeducational evaluations (in-house or referral) and any named
   providers; what evaluation, IEP or 504 documentation the school asks
   families to bring; how a family requests support and who decides what the
   child gets; and testing accommodations (school exams, College Board, ACT).
   Report entrance or placement tests (ISEE, readiness visits) separately, as
   admission facts only.

6. People: every named learning-support / student-services staff member with
   the exact title the school gives and their email where the school's own
   directory publishes one, in the school's order; the program's
   leader; counseling staff; any open learning-support job postings (title,
   start date, reporting line, required credentials, frameworks such as MTSS).

7. Questions to ask on the tour: a numbered list, one per gap or
   inconsistency found above, worded as a parent would ask it.

8. Data-availability scorecard (official sources only): score each of
   sections 1–6 from 1 to 10 with a one-line rationale, plus an overall score.
````
