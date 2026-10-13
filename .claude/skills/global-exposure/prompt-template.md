# Global Exposure — deep-research prompt template

The prompt `/global-exposure` hands the user to paste into **Claude deep research**. Fill
every `{{PLACEHOLDER}}`, then print the result inside **one** fenced block (four backticks,
so nothing inside can close it early), with nothing else inside the fence. The user asked
for exactly that: one window to copy.

Placeholders:

| Placeholder | Example | Where it comes from |
|---|---|---|
| `{{SCHOOL}}` | `Charlotte Country Day School` | `src/data/schools.json` `name`, or the user |
| `{{SHORT}}` | `CCD` | the school's common short name; ask if unsure |
| `{{CITY_STATE}}` | `Charlotte, North Carolina` | the user (step 1) |
| `{{CITY_ST}}` | `Charlotte, NC` | same, abbreviated |
| `{{DOMAIN}}` | `charlottecountryday.org` | the school's official site, confirmed by fetching it |
| `{{GRADES}}` | `JK–12` | the school's own site |
| `{{DISAMBIGUATION}}` | `Several other schools are called "Country Day", so discard any source that is not about Charlotte Country Day.` | one sentence naming the likely collision; omit if none |
| `{{PEERS}}` | `Providence Day, Charlotte Latin` | 2–3 Charlotte schools for section 10; prefer ones already in Global Exposure |

**Editing the template.** History: v1 was written for Charlotte Country Day (2026-10-12)
from the Providence Day dossier's shape, adding the URL rule (Providence Day's PDF cited
with chips and gave no URLs), the conflicting-figures rule, the no-student-names rule and
sections 13–20. Keep the section numbers stable. `/global-exposure`'s mode B maps PDF
sections to cards by number.

---

````
Research {{SCHOOL}} ({{CITY_STATE}}; official site {{DOMAIN}}; independent
{{GRADES}} school) and produce a research dossier on its GLOBAL EDUCATION and
INTERNATIONAL TRAVEL programs for students, as of today. Make sure every source
is about THIS school. {{DISAMBIGUATION}}

Title it: "{{SCHOOL}} ({{CITY_ST}}): Global Travel & Global Education Programs —
Research Dossier (as of <month year>)"

SOURCING RULES (these matter more than coverage)
1. The school's own website is the authority. Work through {{DOMAIN}} first.
   That includes its news and stories, divisional pages (Lower, Middle, Upper),
   any Global Education / global programs / travel pages, the academic calendar,
   admissions pages, course catalogs or program-of-studies PDFs, annual reports,
   giving/endowment pages, and any Google Sites or PDFs the school publishes.
   Also check archived versions (web.archive.org) when a current page is thin.
   If a page fails to load, retry it and say so explicitly. Do not conclude that
   its content does not exist.
2. Tag every fact [Official] (the school's own pages, PDFs or sites) or
   [Secondary] (anything else: Round Square, partner schools, local press,
   Wikipedia, directories). Use Secondary only to corroborate Official facts or to
   fill gaps, and label it clearly when you do.
3. Every fact gets its FULL source URL inline, next to the fact (not a site name
   and not a footnote number). If a fact comes from a PDF, give the PDF's URL and
   the page number.
4. Quote the school's exact wording for program names, mission lines,
   requirements and figures. Never round or reformat a number.
5. When two official pages disagree (e.g. a founding year, a graduate count, a
   membership date), report both quotes with both URLs, and flag the conflict.
   Do not pick one.
6. When something cannot be found, say "NOT PUBLISHED" and list what you
   searched. Never infer or estimate. If you compute a figure yourself (e.g.
   counting countries from a trip list), label it "our tally" and show the list
   it came from.
7. Do NOT name any student. Describe the trip or the achievement, not the child.
   Faculty and staff may be named when the school names them.
8. Record trip costs, deposits and exact travel dates wherever the school
   publishes them. They are wanted in this research file.

SECTIONS

TL;DR: 3–5 bullets covering what exists, what's missing, and the money (aid,
endowments).

Fact card: a table with columns Item | Finding | Source type | URL. Cover at
least: starting grade for international travel; divisions with travel;
countries reached; program names; network memberships (Round Square or
similar); any global diploma/certificate/distinction; aid for trips;
travel-specific endowments or funds.

1. Program overview & structure: the official program name(s), framework or
   branding, mission language, how it's organized across divisions, who runs it
   (office/director title), and when it started.

2. Grade-level eligibility: for Lower, Middle and Upper School separately, what
   global learning exists and whether students travel. State the earliest grade
   that is eligible for international travel, or NOT PUBLISHED. Include on-campus
   and virtual global learning (classroom exchanges, video calls, world-region
   units) and the world-language sequence by grade.

3. Master trip table: every documented student trip, domestic and international.
   Columns: School year | Destination (city, country) | Division/grades |
   Theme/purpose | Timing (spring break / summer / dates if published) | Group
   size if stated | Homestay? | Selection method if stated | Cost if stated | URL.
   Cover as many school years as are documented (aim for the last five school
   years through the current one, and include announced upcoming trips). Add a
   short "also on record" list for older or one-off trips.

4. Exchanges & partnerships: partner schools by country, years active,
   direction ({{SHORT}} students going out / visitors coming in), duration,
   homestays (where, with whom), reciprocity expectations, and visiting
   international students who joined {{SHORT}} classes.

5. Credential: any global diploma, certificate, endorsement or distinction
   (e.g. a "Global Scholars" or similar program). Give its name, the year it
   started, the grades it covers, its requirements (coursework, travel,
   service, language, capstone), what goes beyond the requirements, graduate
   counts, and any associated award. If none exists, say so plainly.

6. Network: memberships in Round Square, global school networks, Model UN, or
   similar, with the year they joined. Also conferences attended (year, host
   school, location), service-learning or "build" partnerships, and any sister
   schools.

7. Signing up & logistics: the calendar entries (registration opens, info
   sessions, application or payment deadlines, with dates), the application or
   selection process, the travel vendor(s), chaperones, and safety, insurance and
   passport guidance.

8. Cost & financial aid: published trip prices and what they include, any
   financial assistance for trips, endowments or named funds tied to travel or
   global education (quote the fund description), and whether need-based aid
   covers trips.

9. Outcomes & stories: school news stories about trips and exchanges (title,
   date, URL, one-line summary), student reflections the school published
   (without names), awards or recognition the program received, and accreditation
   comments.

10. Comparison context (brief): how {{SHORT}}'s program compares with other
    Charlotte independent schools ({{PEERS}}), only where a source supports it.

11. Gaps & questions to ask the school: a numbered list of specific questions a
    parent should ask on a tour, one per gap found above. Cover starting grade,
    current trip list, cost, aid, selection, safety, exchanges, credential, and
    scale (how many students travel each year).

12. Data-availability scorecard (official website only): a table scoring each
    sub-area 1–10 with its rationale. Sub-areas: Eligibility, Destinations,
    Costs, Aid, Exchanges, Credential/Diploma, Logistics, Overall.

BEYOND THE CORE SECTIONS
Don't limit the research to the sections above. Capture anything the school
publishes that shows how globally engaged its students are, even if it fits
none of the sections. Look especially for:

13. Global curriculum: courses with a global, international or cultural
    focus (course names and descriptions from the program of studies, with
    URLs), AP/honors/IB world-language and world-history offerings, language
    immersion or language-competition results (e.g. National Spanish/French
    Exam), and interdisciplinary global units in Lower and Middle School.

14. Global community on campus: international student enrollment (count,
    countries), ESL/ELL programs, multilingual families, parent groups for
    international families, cultural celebrations and heritage events, global
    or cultural clubs, visiting speakers or diplomats, international faculty or
    faculty exchanges.

15. Competitions & recognition: Model UN (conferences, awards), Academic
    WorldQuest, global essay or debate competitions, global-issue service
    projects, and any outside award or accreditation comment about the global
    program.

16. Faculty development: global training for teachers, faculty travel grants,
    teacher exchanges, global certificates for faculty.

17. Summer & independent opportunities: school-run or school-endorsed summer
    programs abroad, semester or year-away programs (e.g. School Year Abroad),
    travel grants or fellowships for individual students, gap-year guidance,
    and partnerships with universities or outside programs.

18. Scale & participation: any figure the school gives for how many students
    travel, earn the credential, join exchanges, or attend conferences each
    year, with the exact wording and URL. Year-over-year figures are
    especially valuable.

19. Media: official photo galleries, videos (YouTube/Vimeo) and maps of
    trips or global programs, with URLs and captions. Do not use any that
    name students.

20. Content worth its own section: end with a short list of anything you
    found that is substantial but fits none of sections 1–19. For each item,
    say what it is, how much published data supports it, and why it matters
    to a parent choosing a school.

Timeline of program milestones: Year | Milestone | Source type | URL. Include
the school's own "firsts" and history-timeline entries that touch global
education.

Caveats: date ranges covered, pages you could not load or verify, and items that
are historical and may not reflect current practice.

APPENDIX — Source URL list: every URL cited, grouped by section, with page title
and the date the page was published or last updated if shown. Also list any
official photo pages of trips (URL plus the school's caption) that could be
used with credit.

Deliver the result as a PDF.
````
