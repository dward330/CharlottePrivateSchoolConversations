# All Schools - Read Reviews - Review Site Links

**Provenance.** Collected 2026-11-25 while planning `readreviews` (`.claude/plans/readreviews.md`),
by web search and page fetch. This is the staging record for the Read Reviews research area.
It sits under `branding/` because the ingest skips that folder (`INTERNAL_TOPICS` in
`build_docs.py`), so staging it here cannot switch the area on early. `/implement` verifies
the rows below in a real browser, then writes one file per school under
`source-material/read-reviews/<school>/`.

**How to read "verified".**

- **fetched** = the page was opened and showed the school's name, street address and city.
- **search** = the URL is a literal search-result URL whose title named the school and city.
  The page itself returned HTTP 403 to a scripted fetch. Niche and SchoolDigger block every
  scripted fetch, so all of their rows are "search" at best.
- **NOT SEEN** = no search result returned this exact URL. The value shown is the site's URL
  pattern applied to the school. It is a lead, not a verified link. Open it in a browser
  before use.

No review text and no reviewer names were recorded. None are needed: the app only links out.

## GreatSchools (greatschools.org)

All 13 fetched. Each has a "Community Reviews" page at the profile URL plus `reviews/`.
**Re-checked 2026-11-25 (`/implement`):** all 13 `reviews/` URLs answered HTTP 200 with the
page title "<School name> Reviews | GreatSchools". (The Chrome extension still refuses
`greatschools.org`, so this was a plain fetch, as at planning.)
GreatSchools gives none of the 13 its own 1–10 rating (not enough academic data for private
schools).

| School | Profile URL | Verified |
|---|---|---|
| providence-day | https://www.greatschools.org/north-carolina/charlotte/2144-Providence-Day-School/ | fetched: 5800 Sardis Road, Charlotte |
| charlotte-latin | https://www.greatschools.org/north-carolina/charlotte/2146-Charlotte-Latin-School/ | fetched: 9502 Providence Road, Charlotte |
| charlotte-christian | https://www.greatschools.org/north-carolina/charlotte/2170-Charlotte-Christian-School/ | fetched: 7301 Sardis Road, Charlotte |
| charlotte-catholic | https://www.greatschools.org/north-carolina/charlotte/2133-Charlotte-Catholic-High-School/ | fetched: 7702 Pineville-Matthews Road, Charlotte |
| charlotte-country-day | https://www.greatschools.org/north-carolina/charlotte/2175-Charlotte-Country-Day-School/ | fetched: 1440 Carmel Road, Charlotte |
| cannon | https://www.greatschools.org/north-carolina/concord/2219-Cannon-School/ | fetched: 5801 Poplar Tent Road, Concord |
| covenant-day | https://www.greatschools.org/north-carolina/matthews/2336-Covenant-Day-School/ | fetched: 800 Fullwood Lane, Matthews |
| davidson-day | https://www.greatschools.org/north-carolina/davidson/2984-Davidson-Day-School/ | fetched: 750 Jetton Street, Davidson |
| carmel-christian | https://www.greatschools.org/north-carolina/matthews/2557-Carmel-Christian-School/ | fetched: 1145 Pineville-Matthews Road, Matthews |
| hickory-grove-christian | https://www.greatschools.org/north-carolina/charlotte/2506-Hickory-Grove-Baptist-Chr.-School/ | fetched: 7200 East W.T. Harris Boulevard, Charlotte. **Settled 2026-11-25:** `-Hickory-Grove-Christian-School/` answers HTTP 301 to this `-Baptist-Chr.-School/` slug, and the canonical link names it. |
| gaston-day | https://www.greatschools.org/north-carolina/gastonia/2142-Gaston-Day-School-/ | fetched: 2001 Gaston Day School Road, Gastonia. The trailing hyphen in the slug is real. |
| trinity-episcopal | https://www.greatschools.org/north-carolina/charlotte/3221-Trinity-Episcopal-School/ | fetched: 750 East 9th Street, Charlotte, K–8. Same-name schools exist in Richmond VA and in Texas; never use those. |
| charlotte-prep | https://www.greatschools.org/north-carolina/charlotte/2536-Charlotte-Preparatory-School/ | fetched: 212 Boyce Road, Charlotte |

## Niche (niche.com)

**All 13 reviews pages were opened in Chrome on 2026-11-25** (Claude in Chrome; a scripted
fetch gets 403). Each loaded at the URL below with no redirect, with the school's name in the
page title and its city on the page. The profile page is the same URL without `reviews/`.
Niche carries star-rated parent, student and alumni reviews for private schools.

| School | Reviews URL (the link the app uses) | Verified |
|---|---|---|
| providence-day | https://www.niche.com/k12/providence-day-school-charlotte-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Charlotte, NC |
| charlotte-latin | https://www.niche.com/k12/charlotte-latin-school-charlotte-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Charlotte, NC |
| charlotte-christian | https://www.niche.com/k12/charlotte-christian-school-charlotte-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Charlotte, NC |
| charlotte-catholic | https://www.niche.com/k12/charlotte-catholic-high-school-charlotte-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Charlotte, NC |
| charlotte-country-day | https://www.niche.com/k12/charlotte-country-day-school-charlotte-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Charlotte, NC |
| cannon | https://www.niche.com/k12/cannon-school-concord-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Concord, NC |
| covenant-day | https://www.niche.com/k12/covenant-day-school-matthews-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Matthews, NC |
| davidson-day | https://www.niche.com/k12/davidson-day-school-davidson-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Davidson, NC |
| carmel-christian | https://www.niche.com/k12/carmel-christian-school-matthews-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Matthews, NC |
| hickory-grove-christian | https://www.niche.com/k12/hickory-grove-christian-school-charlotte-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Charlotte, NC |
| gaston-day | https://www.niche.com/k12/gaston-day-school-gastonia-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Gastonia, NC |
| trinity-episcopal | https://www.niche.com/k12/trinity-episcopal-school-charlotte-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Charlotte, NC; page says K-8 |
| charlotte-prep | https://www.niche.com/k12/charlotte-preparatory-school-charlotte-nc/reviews/ | browser 2026-11-25: title "<School name> Reviews - Niche", page shows Charlotte, NC |

## SchoolDigger (schooldigger.com)

**All 13 opened in Chrome on 2026-11-25** (`/implement readreviews`; a scripted fetch gets
403). Each loaded at the URL below with no redirect. The page title read "<School name> in
<City> NC - SchoolDigger" and the page showed the street address noted. Private schools use
`/go/NC/schools/<id>/school.aspx`. There is no separate reviews URL: reviews sit on the
profile page.

**SchoolDigger is mostly a data site for private schools.** On 2026-11-25 only 3 of the 13
showed any reviews: Providence Day (3 ratings, 2 written), Davidson Day (3 ratings, 3
written) and Gaston Day (1 rating, 1 written). The other 10 said "No ratings yet". So the
app's SchoolDigger box promises school data, not reviews (the plan's default).

| School | Profile URL | Verified |
|---|---|---|
| providence-day | https://www.schooldigger.com/go/NC/schools/9999925170/school.aspx | browser 2026-11-25: 5800 Sardis Rd, Charlotte; 3 ratings, 2 written reviews |
| charlotte-latin | https://www.schooldigger.com/go/NC/schools/9999924899/school.aspx | browser 2026-11-25: 9502 Providence Rd, Charlotte; no ratings yet |
| charlotte-christian | https://www.schooldigger.com/go/NC/schools/9999924895/school.aspx | browser 2026-11-25: 7301 Sardis Rd, Charlotte; no ratings yet |
| charlotte-catholic | https://www.schooldigger.com/go/NC/schools/9999924894/school.aspx | browser 2026-11-25: 7702 Pineville Matthews Rd, Charlotte; no ratings yet |
| charlotte-country-day | https://www.schooldigger.com/go/NC/schools/9999942994/school.aspx | browser 2026-11-25: 1440 Carmel Rd, Charlotte; no ratings yet |
| cannon | https://www.schooldigger.com/go/NC/schools/9999924871/school.aspx | browser 2026-11-25: 5801 Poplar Tent Rd, Concord; no ratings yet |
| covenant-day | https://www.schooldigger.com/go/NC/schools/9999950670/school.aspx | browser 2026-11-25: 800 Fullwood Rd, Matthews (the school writes Fullwood Lane); no ratings yet |
| davidson-day | https://www.schooldigger.com/go/NC/schools/9999924942/school.aspx | browser 2026-11-25: 750 Jetton St, Davidson; 3 ratings, 3 written reviews |
| carmel-christian | https://www.schooldigger.com/go/NC/schools/9999968988/school.aspx | browser 2026-11-25: 1145 Pineville Matthews Rd, Matthews; no ratings yet. **Duplicate settled:** the other id, `9999924878`, now returns SchoolDigger's 404 page. |
| hickory-grove-christian | https://www.schooldigger.com/go/NC/schools/9999925040/school.aspx | browser 2026-11-25: 7200 E W T Harris Blvd, Charlotte; no ratings yet |
| gaston-day | https://www.schooldigger.com/go/NC/schools/9999933863/school.aspx | browser 2026-11-25: 2001 Gaston Day School Rd, Gastonia; 1 rating, 1 written review |
| trinity-episcopal | https://www.schooldigger.com/go/NC/schools/9999925307/school.aspx | browser 2026-11-25: 750 E 9th St, Charlotte, grades K-8; no ratings yet |
| charlotte-prep | https://www.schooldigger.com/go/NC/schools/9999950665/school.aspx | browser 2026-11-25: 212 Boyce Rd, Charlotte, grades PK-8; no ratings yet. Confirmed: not the Port Charlotte FL school. |

## Site names, logos and brand terms

| Site | Name as written | Logo and brand terms found |
|---|---|---|
| GreatSchools | "GreatSchools" (one word, capital G and S) | Terms of use, https://www.greatschools.org/gk/terms/ : "You may not use GreatSchools Trademarks without our prior written permission." No public brand kit found. Permissions contact named in the terms: legal@greatschools.org. An SVG logo is embedded on https://solutions.greatschools.org/marketing-for-schools but is not offered for download and carries no reuse terms. |
| Niche | "Niche" | Brand guidelines read in Chrome 2026-11-25: https://www.niche.com/about/niche-brand-and-attribution-guidelines/ . They cover sites that **display Niche content** (licensed ratings, reviews, grades): such a display "must be approved by Niche prior to launch", must carry the full unmodified logo, and must use the words "Powered by" with the logo. They give no permission to use the logo on a plain link. This app shows no Niche content, so the logo is **not used**; a logo here would also read as "Powered by Niche", which would be untrue. |
| SchoolDigger | "SchoolDigger" (one word, capital S and D) | No brand or linking page found. Widget docs (opened): https://widgets.schooldigger.com/docs . Logo files cited there: `https://widgets.schooldigger.com/images/SchoolDigger-logo-white.svg` (white, for dark backgrounds) and `/images/SchoolDigger-logo.png`. No stated terms for logo use outside the widgets. Contact: https://www.schooldigger.com/contact.aspx . |

## Open items for the build — resolved 2026-11-25

1. Niche: done at planning. SchoolDigger: all 13 opened in Chrome, name, city and street
   confirmed, Charlotte Prep included.
2. Carmel Christian SchoolDigger duplicate: `9999968988` is live, `9999924878` is a 404.
   Hickory Grove GreatSchools slug: `2506-Hickory-Grove-Baptist-Chr.-School`.
3. SchoolDigger reviews: 3 of 13 schools show any (see the SchoolDigger section).
4. Logo outcome unchanged: **no logo file for any of the three.** Each box shows the site's
   name as plain text.

The per-school records are `source-material/read-reviews/<school>/<School Name> - Read Reviews - Review Site Links.md`.
