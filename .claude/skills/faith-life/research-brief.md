# /faith-life — research brief

<!--
  Used by /faith-life Steps 2 and 3. Part A is the broad first pass, Part B the targeted
  second pass. Fill {{SCHOOL}}, {{SLUG}}, {{CITY_STATE}} and {{DOMAIN}}. If a pass is given
  to an agent, paste "Rules for both passes" into its prompt: the agent has no other
  context.
-->

**School:** {{SCHOOL}}, {{CITY_STATE}} · **Site:** {{DOMAIN}} · **Folder:**
`source-material/faith-spiritual-life/{{SLUG}}/`

## Rules for both passes

- **Official sources only.** The school's own site, documents it hosts or links as its
  own, and its calendar. No third-party page. A public email archive, an unlinked page or
  a document reached only from one is a **LEAD** (user, 2026-11-27): record it, use it to
  find the menu page that states the fact, and mark anything found only there `LEAD`,
  since a card never cites it. No church, parish,
  diocese or denomination site unless the school's site links that exact document as its
  own. A search result is a way to find a school page, never a source.
- **Confirm the school** by name and street address on its own pages, and record the line.
- **Quotes are char-for-char**, with the page each came from. Keep the school's own
  punctuation and capitals. Mark where you cut a sentence short.
- **Never write a student's name**, in the file or in your reply. Record which sources
  carry student names ("names a student: withheld") and give the role instead ("an Upper
  School student leader").
- **Never record a personal staff detail**: a personal email address, a place of worship,
  a staff member's children or their grades. A directory pop-up often prints all three.
- **No trip prices and no exact travel dates.** Season and year only.
- **The site is rated E for everyone** (user, 2026-11-27). Never record, quote or
  summarize a school's statement on human sexuality, even inside a statement of faith you
  are otherwise copying whole. Record only that further text exists and is not recorded,
  by this rule.
- **Label what you did not read as fact.** `INFERENCE:` for a pattern you worked out (a
  weekday counted from calendar entries). `LEAD:` for anything dated, superseded, found
  only by search, or read by eye from an image.
- **A 404 is a reason to look for the page's new address** in the site's own navigation,
  never a "not published" finding.
- **Edit no repo file other than the research file. Run no git command.**

## How to fetch

- `curl -sL -A "<a current desktop browser user agent>"` into one scratch folder, then
  strip the HTML to text. Use a web-fetch tool only if curl is blocked.
- PDFs: `pdftotext -layout`. If a table garbles, also render it (`pdftoppm -png`) and look.
- **Finalsite sites** (many of these schools) have predictable endpoints. Find the
  element ids in the page source:
  - directory list: `/fs/elements/<id>?const_page=1…N`
  - directory profile pop-up, which holds the published email:
    `/fs/elements/<id>?const_id=<person id>&show_profile=true`. The email is in
    `FS.util.insertEmail(el, "<domain reversed>", "<local part reversed>")`. Reversing it
    is reading the published address. Never build an address from a name pattern.
  - calendar by month: `/fs/elements/<id>?cal_date=YYYY-MM-01`
  - news board pages: `/fs/elements/<id>?start_row=N`
  - a public email archive, if the school has one (`/email-archive`), and its messages at
    `/fs/comms-manager/view/<id>`, **as leads only**: they point to facts, but a card never
    cites them (user, 2026-11-27). Charlotte Christian's weekly chapel recaps were here.
  - linked documents: `/fs/resource-manager/view/<id>`
- **Other platforms**: start from the site's own navigation and footer, then its search
  box, then a site-restricted web search to find pages the navigation hides.
- **Issuu or other viewers**: the text endpoints usually refuse. Page images often load.
  Anything read from an image is a LEAD until a text source confirms it.
- **Behind a login** (family handbook, enrollment contract, online application): record it
  under "Could not read" with the page that points to it. Do not try to get past a login.

## Part A — first pass: the broad sweep

Read every page that could bear on faith life. At least: the spiritual-life or campus
ministry page; beliefs, mission, history and About; every admissions page, the
application steps, checklists and any applicant questionnaire; the curriculum page and
every curriculum guide and course catalog; each division's page; the school profile;
counseling; parents' pages and parent groups; leadership and the board; employment;
the staff directory; the calendar for the whole school year; the news board; fine arts
(worship music); service pages; giving pages.

### Record format

1. **Header**: provenance (who, when, how), the address line that confirms the school,
   the names paragraph, what is kept out on purpose, the base URL.
2. **`## Source URLs`**: a table of pages read (URL, title, what it holds); a table of
   linked documents (link, document, the date on it); **Could not read** with the reason
   for each; **LEADS only**.
3. **`## Findings`**, in these ten sections. Each ends with a **"Not found in this
   research"** list:
   1. Chapel and worship (by division: day, time, place, who leads; all-school services;
      worship teams; sacraments or liturgy, if the school has them)
   2. Bible, theology or religion classes (by grade or course; credits; the rule for a
      student who joins late; translation or texts; faith electives; distinctions)
   3. Retreats and small groups (by division; where; whether all students go; whether it
      is in tuition; advisory, houses, discipleship groups, student faith leaders)
   4. Spiritual life staff (name, published title, published email, source)
   5. What the school believes (mission; values; the belief statement, verbatim and
      numbered in page order; denomination or sponsoring body; memberships)
   6. What it asks of families and students (application questions, references, signed
      statements, attendance rules, conduct codes; for staff and trustees as contrast)
   7. Service and missions (purposes, named partners, hour rules, trips, dated figures)
   8. Parent spiritual life (studies, prayer groups, emails home, parent association)
   9. History of the faith identity
   10. Anything else
4. **`## Conflicts between the school's own pages`**, numbered. Every place two official
   pages say different things, with both quotes. These become dev-only notes or questions
   on the Ask the School card. Never pick a winner silently.
5. **`## Method: card-by-card assessment`**: per card, about how many distinct checkable
   facts, and whether it stands on its own.

Before you finish, **re-check at least twelve key quotes against the raw downloads** and
say which ones.

## Part B — second pass: the gaps

Take each item under "Not found", "Could not read" and each `INFERENCE:` in the first
file, and try to close it from public official pages. Rank the gaps by what a parent
would most want answered: whether a parent must share the faith usually comes first.

Places the first pass tends to miss: a public email or communications archive (a lead
only, never a card source); the
weekly announcements page; retreat and trip packets linked from announcements; directory
profile pop-ups; the whole news board, not only the posts linked from a hub page; the
school's publications shelf; job postings; class-of celebration documents.

### Record format

1. **Header**: provenance, the names paragraph, what is kept out, the LEADs rule.
2. **`## Source URLs (new in this pass), and what failed`**: pages, documents, LEADS,
   and **Tried and failed** (every endpoint or search that returned nothing, with the
   status code).
3. **`## Findings (new in this pass)`**, one block per gap.
4. **`## Method: gap verdicts`**: each gap **CLOSED**, **PARTLY** or **STILL NOT FOUND ON
   PUBLIC PAGES**, in one or two sentences.
5. **`## Corrections to the first-pass file`**: each as the first file's wording, an
   arrow, and what is now known. Include confirmed inferences, new conflicts, and any
   name the school spells two ways.

Before you finish, re-check at least twelve quotes against the raw downloads.
