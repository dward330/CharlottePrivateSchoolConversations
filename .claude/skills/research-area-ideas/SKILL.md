---
name: research-area-ideas
description: >
  Suggest a ranked list of NEW research areas the web app could add for its schools, based
  on what the schools publish on their own official websites. Reads what the app already
  holds (every area, card and Compare row) so nothing is suggested twice, researches what
  parents ask about schools on Reddit, local forums and local press, sweeps every roster
  school's own site for sections the app does not cover, groups what it finds into
  candidate areas, keeps only the ones at least two schools can support, then scores and
  ranks them with the evidence URLs per school. Use when the user types
  /research-area-ideas, or asks "what research areas should we add", "suggest new research
  areas", "what else do the schools publish that we don't cover", "what should the school
  pages cover next", "what do parents want to know that we don't cover". This skill SUGGESTS ONLY: it never adds an area, never edits app code
  or research data, never writes source-material, and never starts a plan.
---

# /research-area-ideas: what should the school pages cover next?

Four inputs, one ranked list:

1. **What the app holds.** An area, card or Compare row the app already has is not an idea.
2. **What parents want to know.** Reddit, forums and local press show the questions parents
   ask. Demand tells the sweep where to look and moves an idea up the list. It never adds a
   fact, and it never counts as support.
3. **What the schools publish.** Only a school's own official pages count as evidence.
4. **How many schools can support it.** An area needs **at least two** schools. More is
   better, and the count is always shown.

The user may narrow the run ("K–8 schools only", "five ideas", "anything about faith life",
"just Cannon and Davidson Day"). With no scope, sweep every roster school and return up to
**10** ranked ideas. Do not stop to ask for a scope. If fewer than 10 clear the bar, return
fewer and say so. Never pad the list.

**Standing rules:** the Student-name standard, the UX-design standard and the Plain-language
standard in `CLAUDE.md` apply to everything this skill writes, proposed area and card names
included.

## Step 1: what the app already holds (read, never recalled)

Read [`DATA-SCHEMA.md`](../../docs/DATA-SCHEMA.md). It is generated from the live modules,
so it is the truth about what ships.

- **§1** for the roster and the research areas, and which school holds which area.
- **§2 and §3** for every prose card key and structured card inside each area.
- **§4** for every Compare row.
- **§5** for the standalone layers (course catalog, club catalog, Cup ledger, review links).
- **§7** for the K–8 shape. A K–8 school has no College Support and is off Compare.

Never list schools, areas or cards from memory. The area list has grown many times.

Write down, for your own use, a **covered list** at card level, not only area names. "Bus
routes" is covered if an After School card already holds them, even though no area is
called Transportation. Then apply this test to every candidate:

| Candidate | Verdict |
|---|---|
| Already an area | Duplicate. Drop it. |
| Already a card or a Compare row in some area | Duplicate. Drop it. |
| New material that fits inside an existing area | **Not an area.** Move it to the "Better as a card in an existing area" list and name the area. |
| Stands apart from every existing area, with enough for several cards | A candidate area. Carry on. |
| Planned, tried or turned down before | Check `.claude/plans/INDEX.md` (open, implemented and `abandoned` rows) and the earlier reports in Step 2. Say what happened and when. Suggest it again only if what the schools publish has changed, and say what changed. |

Also read the school's Latest News and Welcome Video sections as covered. News is fetched
live and is not a research area.

## Step 2: earlier runs

Read every file in `reports/research-area-ideas/` (gitignored, so it may be empty on a new
checkout). For each idea suggested before:

- Now shipped as an area → it is covered. Drop it.
- Not yet acted on → keep it in the running, and mark it "suggested `<date>`, not yet built".
  Re-check its evidence in Step 4 like any other idea. Never carry an old count forward.
- The user turned it down → leave it out, and list it under "Left out on purpose".

## Step 3: what parents want to know (web research)

Do this **before** the sweep, so the sweep knows what to look for. Run the searches
together. Use `WebSearch`; load it with `ToolSearch` first if needed.

Where to look:

- **Reddit:** r/Charlotte first, then other local subs the search turns up, and the wider
  parent subs (r/Parenting, r/privateschool, r/ApplyingToCollege) for questions that are
  not local.
- **Local forums:** City-Data's Charlotte forum, and local parent groups that are publicly
  readable.
- **Local press:** The Charlotte Observer, Axios Charlotte, The Charlotte Ledger, WFAE,
  Charlotte Magazine, Charlotte Parent, for what is in the news about private schools.
- **Search itself:** the "People also ask" questions on searches such as "Charlotte private
  school", "<school> vs <school>", "what to ask on a private school tour".

Suggested first queries (add the roster school names from Step 1):

```
reddit Charlotte private school which one
reddit Charlotte private school what to know before
reddit private school tour questions to ask
reddit "Providence Day" OR "Charlotte Latin" OR "Country Day"
city-data Charlotte private schools
questions to ask private school admissions parents
```

Reddit often blocks a scripted fetch. Use the search result text first. If a thread must be
read in full, tell the user to turn on the Claude in Chrome extension and read it there.

**Rules for what comes back. These are HARD:**

- **It is a demand signal, never a source.** A post is evidence that parents ask a
  question. It is never evidence of anything about a school. No claim from a post enters
  the report as a fact, nothing found here is written to `source-material/`, and **no post
  counts toward the two-school bar**. Only a school's own pages do that (Step 4).
- **Record the question, not the post.** Write the theme in your own words, with the thread
  URL and its month and year. No usernames. No quoted posts. No ratings or review text. No
  student or family is named, even when the post names one.
- **Prefer the last two years.** An older thread still counts when the question is
  evergreen (class size, commute, culture); say how old it is.
- **Count what you found.** "5 threads since 2025 asking about bus routes and commute" is a
  signal. "Parents care about transportation" is not.
- **Found nothing is a result.** If the searches fail or turn up nothing usable, say so and
  rank on the other axes. Never invent demand.
- **Search queries stay generic.** School names and public topics only. Nothing about the
  user or this project goes into a query.

Sort the questions against the covered list from Step 1:

| The question is | What happens |
|---|---|
| Already answered by an area or card | Not an idea. Note it in one line: the app covers it. |
| Not covered | A **demand theme**. Add it to the sweep's theme list in Step 4, with its count. |
| About opinions, reputation or how a school "feels" | Not something an official page can answer. It goes in the "Parents ask, schools do not publish" list. |

## Step 4: sweep each school's own website

Get the roster from `src/data/schools.json` and each school's homepage from `homepageUrl`
in `src/data/brands.ts`. Never type a school URL from memory.

**For each school:**

1. **Map the site.** Read the main navigation, the footer and `/sitemap.xml` (and a
   "Quick links" or site-map page if there is one). List every section of the site.
2. **Mark each section** as covered (name the area or card from Step 1) or **uncovered**.
3. **Open every uncovered section** and record what it actually publishes: the URL, the
   kind of facts (figures, named programs, schedules, lists, named staff, policies), and
   roughly how much.
4. **Follow the school's own links off-site.** Schools keep real data in Google Docs,
   handbook and profile PDFs, flipbooks and video pages. A document the school's own site
   links to is an official source. Record both the school page and the document URL.

**Themes to look for.** Start with the demand themes from Step 3, then this list. It is a
prompt, not a limit. Most of the value is in a section nobody thought to list, and a theme
with no demand behind it can still rank on what the schools publish:

- faculty and staff (size, degrees, tenure, student-to-teacher figures)
- campus and facilities
- transportation (bus routes, carpool, shuttle)
- dining and lunch
- faith and spiritual life (chapel, retreats, religion requirements)
- community service and service learning
- diversity, equity and belonging
- technology (devices, one-to-one programs, AI or phone policies)
- health, safety and counseling outside Learning Support
- the school day and calendar (hours, schedule, year length)
- lower and middle school program (curriculum, class sizes, specials)
- leadership, character or house systems
- signature programs (entrepreneurship, global studies diplomas, capstones, outdoor education)
- parent community and volunteering
- uniform and dress code
- accreditation, governance and school history
- giving, endowment and annual reports
- alumni (see the name limit below)

**Fan out.** With no scope there are more than ten school sites to read, so run the sweep
as parallel `general-purpose` agents, one per group of three or four schools, all sent in
one message. Give every agent the same brief:

- the covered list from Step 1, so it does not report what the app has;
- the demand themes from Step 3 and the theme list above, and the instruction to report
  **any** uncovered section, listed or not;
- the evidence rules below, word for word;
- the return shape: per school, per uncovered theme, a support level, the URLs, three to
  six example facts, and what was looked for and not found.

Agents are read-only. They write no files in the repo and run no git command.

**Tools.** Fetch pages with the web-fetch tools first. Some school sites answer a scripted
fetch with a thin shell, a block or a page whose content sits in pop-up tiles and
accordions. When a page looks thin, read it in a browser (Claude in Chrome; load its tools
in one `ToolSearch` call) before recording "nothing". If the extension is off, tell the
user which schools need it. Do not record those schools as empty.

### Evidence rules. These are HARD

- **Official school sources only.** The school's own domain, or a document or page the
  school's own site links to as its own. A school run by a larger body (a diocese, a
  church) may count that body's page **when the school's site links to it**; say so in the
  report. Niche, GreatSchools, Wikipedia, press, directories, Reddit and forums are never
  evidence, and never count toward the two-school bar.
- **Live pages only.** A page from the Wayback Machine or an old handbook is a lead. It
  supports nothing until a live page confirms it.
- **A page is not data.** A paragraph of marketing copy with no checkable facts does not
  support an area. Grade what the school publishes:

  | Level | Meaning | Counts toward the bar? |
  |---|---|---|
  | **Strong** | Enough specific facts for three or more cards: named programs, figures, lists, schedules | Yes |
  | **Supports** | Enough for two cards that would not be empty shells | Yes |
  | **Mentions** | The theme has a page, but it holds little a parent could check | No |
  | **Not found** | This sweep found nothing | No |

- **"Not found" is not "not published".** This sweep is shallow by design. Report it as
  "not found in this sweep", never as a fact about the school.
- **A 404 is a reason to look again.** Sections get renamed. Go back to the site's own
  navigation before recording anything.
- **Confirm the school.** Check the name **and** the city on the page. Several roster
  schools share a name with a school in another state, and a parked domain returns HTTP 200.
- **No student is named.** Not in a brief, an agent's return, the report or a file. If a
  page names students, record the kind of content ("lists award winners by name") and move
  on. Staff and other adults in adult roles may be named, but the report rarely needs to.
- **Copy figures char-for-char,** with the URL. Never round or total one for the report.
- **Search queries stay generic.** School names and public topics only. Nothing about the
  user or this project goes into a query.
- **Nothing is written to `source-material/`.** A sweep sized for a ranking produces
  indicative findings, not the vetted record. Only the **URLs** carry forward, the same
  boundary `/add-school` keeps. The real research happens when an area is planned.

## Step 5: group, check and apply the two-school bar

1. **Group** the uncovered themes across schools into candidate areas. Merge near
   duplicates ("Chapel", "Spiritual Life", "Faith Formation" are one candidate). Split a
   candidate that is really two things.
2. **Check the agents.** An agent's mistake reads as confidently as its finding. For every
   candidate that will be ranked, open at least one evidence URL **per supporting school**
   yourself and confirm the page says what the agent reported. Downgrade or drop what does
   not hold. Say in the report how many URLs were checked.
3. **Apply the bar.** Count the schools at **Strong** or **Supports**.
   - Two or more → a candidate area. Carry on.
   - Exactly one → not an area. List it under "One school only" with the school and the URL.
   - "Mentions" never counts, however many schools mention it.
   - A demand theme that fewer than two schools support is not an area, however often
     parents ask. It goes in the "Parents ask, schools do not publish" list.
4. **Apply the Step 1 test again** now that the candidate has a shape. Material that would
   sit naturally in an existing area goes to the "Better as a card" list.

**Hard limits that remove a candidate however many schools support it:**

| Limit | Why |
|---|---|
| The area would depend on naming students | Student-name standard. Alumni named for what they did at the school are still students. An alumni or awards area that is mostly names is out; say so and let the user decide on any adult-only version. |
| Ratings, rankings by a third party, or review text | Read Reviews holds links only, and no rating enters the repo. |
| Trip prices or exact travel dates | Global Exposure privacy rule. |
| Material that is news, not a standing fact | The Latest News section already shows it live. |
| Only stale or archived pages back it | No section is built from non-current data. |
| It can only be filled from third-party sources | The school's own site is the authority. |

## Step 6: sketch each surviving area

A name alone cannot be judged. For each candidate, work out:

- **A proposed name** in plain words a parent would use, and a one-sentence description.
- **Three to six proposed cards.** For each card, which schools could fill it today. A card
  that fewer than two schools could fill is left out of the sketch.
- **Possible Compare rows:** figures that several schools publish in a comparable form (a
  count, a ratio, a yes or no). None is a fine answer; some areas are "this school only".
- **K–8 or K–12.** Whether the area applies to the K–8 schools, the high schools or both.
- **Upkeep.** How often the facts change (each school year, each season, rarely), since
  every area is a standing cost to keep current.
- **What would be missing.** The schools at "Mentions" or "Not found", by name.

These are sketches to help the user choose. They are not a design, and nothing here
approves a card.

## Step 7: score and rank

Score every surviving candidate. Show the numbers; a rank with no reasons cannot be argued
with.

| Axis | Points | What earns them |
|---|---|---|
| **Breadth** | 0–5 | The share of in-scope schools at Strong or Supports. 1 = two schools only. 3 = about half. 5 = nearly all. Always print the count beside it ("7 of 13"). |
| **Depth** | 0–5 | How much the supporting schools publish. 5 = most are Strong, with figures and lists. 2 or below is thin: say so. |
| **Parent demand** | 0–5 | From Step 3. 0 = no signal found. 3 = several recent threads or a current news story. 5 = a question that keeps coming back across sources. Print the count of threads beside it. |
| **Stands apart** | 0–3 | 3 = nothing in the app is near it. 1 = it overlaps an existing area and the split would need care. |
| **Comparable** | 0–2 | 2 = it yields at least two Compare rows that most supporting schools can fill. |
| **Low upkeep** | 0–2 | 2 = the facts change rarely. 0 = they change every season. |

Total out of 22. Break ties by breadth, then by depth. A candidate with **Depth ≤ 1** is
not ranked: move it to "Not enough published yet". Demand never rescues a thin area: the
two-school bar and the depth floor are checked before the score is.

Breadth is scored against the schools **in scope for that area**. An area that only makes
sense for a high school is scored against the high schools, and the report says so.

## Step 8: the report

Give the user the ranked list in the reply, and save the same text to
`reports/research-area-ideas/<YYYY-MM-DD>.md` (`reports/` is gitignored, so nothing is
committed).

Open with four lines: how many areas the app holds today, how the demand research went
(how many threads and stories, or that it found nothing), how many school sites were swept
(and which, if any, could not be read and why), and how many candidates cleared the
two-school bar out of how many were found.

Then a summary table, best first:

| # | Proposed area | Schools that support it | K–8 / K–12 | Score |
|---|---|---|---|---|

Then one block per idea:

- **Proposed name** and the one-sentence description.
- **Why parents care:** the demand found, with counts and URLs. Or "no demand signal
  found", with one sentence of your own judgment, labeled as a judgment.
- **Support by school:** a table of every in-scope school with its level (Strong, Supports,
  Mentions, Not found) and its evidence URLs. Every roster school in scope appears, so the
  gaps are as visible as the support.
- **What the schools publish:** three to six example facts, each copied from a school's
  page with its URL.
- **Proposed cards,** each with the count of schools that could fill it.
- **Possible Compare rows,** or "none".
- **Nearest thing in the app,** by area and card, and how this differs. Or "none".
- **Score:** the six numbers and the total.
- **Upkeep:** how often it would need a refresh.
- **Watch for:** any hard limit or standing rule the area would brush against.

Close with five short lists:

- **Better as a card in an existing area:** the material, the area it fits, the schools and
  URLs.
- **One school only:** the theme, the school and the URL. A second school may publish it later.
- **Parents ask, schools do not publish:** each question with its demand evidence, and what
  the sweep found on the schools' sites (nothing, or one school only). These are honest
  gaps. Never fill one from a forum.
- **Not enough published yet:** candidates dropped for thin depth, with the count of schools
  at "Mentions".
- **Left out on purpose:** candidates dropped as duplicates, by a hard limit or because the
  user turned them down before, one line each with the reason.

Then say what happens if the user picks one, and **stop**:

- A new research area is a UX change. Choosing it from this list is the user's approval to
  pursue it, and the area is then designed in the Claude Design project before it is built
  (the UX-design standard in `CLAUDE.md`).
- The next step is `/plan`, with this report's block and URLs as the brief. Areas that
  needed deep research (Global Exposure, Learning Support) each got their own skill and
  deep-research prompt; say whether this one looks like that kind.
- The first school should be the one at **Strong** with the most published. Build to the
  richest school and gate on the thinnest.

Start none of it. The user picks.

## What this skill never does

- Add an area, a card, a Compare row or a topic, or edit any app code.
- Write to `source-material/`, run the ingest, or put a swept figure into the app.
- Start `/plan`, a design or a deep-research prompt.
- Count a third-party page, an archived page or a marketing paragraph as support.
- Treat a forum post as a fact about a school, count it toward the two-school bar, or copy
  a post, a username, a rating or a name into anything it writes.
- Suggest an area only one school can support, or one the app already has.
- Record a student's name anywhere.
- Commit anything. Its only output is the reply and the gitignored report file.
