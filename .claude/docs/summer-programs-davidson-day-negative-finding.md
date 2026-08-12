# Davidson Day School — no published summer program (2026)

**Why this file is here and not in `source-material/`.** The ingest pipeline is
discovery-based: any file under `source-material/summer-programs/davidson-day/` would
give the school a `doc_count > 0` and therefore a Summer Programs section on its page.
The finding below is precisely that there is nothing to put in such a section, so the
folder is deliberately absent and this note lives in the docs layer instead. It is
recorded so the negative is not re-researched from scratch, and so a future pass knows
how thoroughly it was checked.

Compiled: August 11, 2026, during the Summer Programs research-area build.

## Finding

**Davidson Day School does not publish any summer camp catalog, schedule, rate sheet, or
registration information for the 2026 season.** Camp names, prices, weeks, hours, care
add-ons, registration dates and refund policy are all NOT PUBLISHED.

This is not a failed search. The school has a live page at
`https://www.davidsonday.org/summer-program` that returns HTTP 200, renders a
`<h1>Summer Program</h1>` heading, and then contains a **completely empty content
block** — verified in the raw HTML, where the `<main id="fsPageContent">` region is 454
bytes total and its `<div class="fsElementContent">` is empty:

```html
<main id="fsPageContent" class="fsPageContent">
  <h1 class="fsPageTitle">Summer Program</h1>
  ...
  <div class="fsElement fsContent" id="fsEl_2143" ...>
    <div class="fsElementContent" >
  </div>
```

The school built the page and published nothing into it. There are no JS-loaded content
modules and no `/api/` references in the page at all.

## How thoroughly this was verified — five independent checks, all negative

1. **Official site-map** (`/site-map`, HTTP 200, 69 links): contains no summer or camp
   entry whatsoever. Nearest matches are `/about/our-campus` and
   `/academics/learning-enrichment-center`.
2. **URL probing** — all 404: `/summer`, `/summer-camp`, `/student-life/summer-program`,
   `/student-life/auxiliary-programs`, `/auxiliary-programs`, `/extended-care`,
   `/student-life/extended-care`.
3. **The URL still ranking in search results**
   (`/Student-Life/Auxiliary-Programs/Summer-Camp`) is a **dead link — HTTP 404**.
   Search engines are serving stale index entries for a page the school removed.
4. **Wayback CDX index** of the whole domain (~6,000 URLs): the 2025–26 crawl of the
   current site is extensive (strategic plan, diploma distinctions, news, podcast, arts,
   admission) and contains no summer camp page. Every summer URL in the archive is from
   the 2011, 2016, or 2019 site generations.
5. **News and blog pages** (`/about/news-media/news`, `/about/news-media/blog`): no
   summer or camp mention in content.

## Two traps checked and disproved

**The CampBrain subdomain is not evidence.** `https://davidsonday.campbrainregistration.com`
returns HTTP 200, which looks like an active camp-registration portal. It is not: a
control test showed `thisdefinitelydoesnotexist12345.campbrainregistration.com` returns
the byte-identical 1,064-byte shell. CampBrain wildcards every subdomain.

**A search-result contaminant.** The `$400 per camper per week` / `$375` sibling rate
that surfaces in searches is **Davidson College's "Day Camp at the Lake"** — a different
institution entirely. It is not a Davidson Day School figure and must not be attributed
to them.

## Stale aggregator claims — do not backfill from these

Camp names appearing ONLY in non-official aggregators, none confirmed for 2026: Camp
Patriots, Jr. Patriots, Charlotte Sports Exploration Camp, N.C. History Exploration
Camp, N.C. State Park Exploration Camp, Athena's Path, Hero's Pursuit. Source:
kidvoyage.com, which itself states "Specific session dates aren't available right now"
and publishes no prices and no dates.

That list is demonstrably stale: **Athena's Path and Hero's Pursuit are third-party
camps run by Michelle Icard, not Davidson Day programs.** Her official 2026 camp-dates
page lists Providence Day School (June 22-26, Rising Grades 5-6; July 13-17, Rising
Grades 7-8) and Levine JCC (August 10-14, Rising Grades 6-8) — **Davidson Day is not a
2026 host site.**

## Historical context only — NOT current, do not surface

From the archived 2011 site (`Camp DDS 2011`), roughly 15 years old and for a program
that appears discontinued: theme camp $225 per single session (1st child), $200 (2nd),
$175 (3rd); Four Session Discount $800/$750/$700; Full Summer Discount
$1500/$1350/$1250; Half-Day Camp $175 per single session, $150 for 3+; Mix & Match
"Add $30 to the Theme Camp rate"; $50 deposit per camper. 2011 hours: full-day
9 a.m.-3 p.m.; half-day morning 9 a.m.-noon, afternoon 12:30-3:30 p.m.; early drop-off
7:45 a.m.; Extended Care 3-6 p.m. at an unpublished additional charge. Theme camp ages
3-12.

From the 2019 archive: "In 2019, we will offer seven full weeks of summer camp beginning
on June 3, 2019 and a special session we call 'Week A' for archaeology, a four-day camp
taught by Davidson Day faculty member Mat Saunders. We do not offer any camps during the
week of July 1–5, 2019." Camps were "typically half-day camps, with morning sessions
that run 9 am–12 pm and afternoon sessions that run 1–4 pm." External providers named:
Bricks 4 Kidz, Mad Science, Techsplorers, and Michelle in the Middle. The three linked
PDFs (brochure, at-a-glance schedule, Q&A) return 404 in Wayback, so the historical
refund policy is unrecoverable.

## Interpretation

The evidence points to Davidson Day having discontinued its summer camp program. The
trajectory is clear: a large multi-page camp site in 2011, a seven-week program with
external providers in 2019, and by the current site generation an empty placeholder page
plus a removed (404) camp URL, no site-map entry, and no 2026 host relationship with the
third-party camp that used to run there. Whether the empty page signals an intent to
relaunch is unknowable from published sources.

**The honest value for any Davidson Day summer figure is "no published summer program",
not a backfill from the 2011 rates or the aggregator's camp names.** A phone call to
(704) 237-5200 is the only way to resolve whether 2026 camps exist unlisted.

## Sources

Official Davidson Day School:
- https://www.davidsonday.org/summer-program — live, HTTP 200, **empty content block** (the key evidence)
- https://www.davidsonday.org/site-map — no summer/camp entry
- https://www.davidsonday.org/Student-Life/Auxiliary-Programs/Summer-Camp — **HTTP 404** (stale search-engine entry)
- https://www.davidsonday.org/about/news-media/news and /blog — no camp mention
- Probed and 404: `/summer`, `/summer-camp`, `/student-life/summer-program`, `/student-life/auxiliary-programs`, `/auxiliary-programs`, `/extended-care`, `/student-life/extended-care`
- Campus address (current, official): 750 Jetton Street, Davidson, NC 28036, (704) 237-5200

Official but historical (Wayback):
- https://web.archive.org/web/20190722134843/https://www.davidsonday.org/community/auxiliary-programs/summer-camp — 2019 camp page
- https://web.archive.org/web/20111006124610/http://davidsonday.org/institute/summercamp.html — 2011 philosophy/hours
- https://web.archive.org/web/20110814091804/http://davidsonday.org/institute/summercamp/registration.html — 2011 fee table
- Wayback CDX domain index: https://web.archive.org/cdx/search/cdx?url=davidsonday.org&matchType=domain

Third-party / non-official (flagged as such):
- https://kidvoyage.com/camps/usa/davidson-day-school — camp names only; no prices, no dates
- https://charlotte.kidsoutandabout.com/content/davidson-day-school — no camp detail at all; 2018 copyright
- https://michelleicard.com/summer-camps/camp-dates/ — official operator page; 2026 hosts are Providence Day and Levine JCC, **not** Davidson Day
- https://davidsonday.campbrainregistration.com — **wildcard subdomain, disproved as evidence**
