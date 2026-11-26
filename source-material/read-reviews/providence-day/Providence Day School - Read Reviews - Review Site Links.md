# Providence Day School - Read Reviews - Review Site Links

Providence Day School's own pages on three independent review sites. The app links to them from the
Read Reviews section. It copies no rating, grade, review text or reviewer name from any of
them.

- GreatSchools: https://www.greatschools.org/north-carolina/charlotte/2144-Providence-Day-School/reviews/
- Niche: https://www.niche.com/k12/providence-day-school-charlotte-nc/reviews/
- SchoolDigger: https://www.schooldigger.com/go/NC/schools/9999925170/school.aspx

Map links (the decorative map under the boxes):

- Open in Google Maps: https://www.google.com/maps/search/?api=1&query=Providence%20Day%20School%2C%205800%20Sardis%20Road%2C%20Charlotte%2C%20NC%2028270
- Open in Apple Maps: https://maps.apple.com/?address=5800%20Sardis%20Road%2C%20Charlotte%2C%20NC%2028270&q=Providence%20Day%20School
- Google embed (iframe src): https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8450102924726!2d-80.78237091151611!3d35.16048593110129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885420f1c569ee31%3A0x82f5260b53f2af69!2sProvidence%20Day%20School!5e0!3m2!1sen!2sus!4v1795657271900!5m2!1sen!2sus

## Method

**Provenance.** Written 2026-11-25 by `/implement readreviews` (plan
`.claude/plans/readreviews.md`), from the staging record
`source-material/branding/_shared/All Schools - Read Reviews - Review Site Links.md`.
School address from the school's own site: 5800 Sardis Road, Charlotte, NC 28270.

| Site | URL | How it was checked (2026-11-25) |
|---|---|---|
| GreatSchools | https://www.greatschools.org/north-carolina/charlotte/2144-Providence-Day-School/reviews/ | Fetched: HTTP 200, page title "Providence Day School Reviews \| GreatSchools". The profile page (same URL without `reviews/`) was fetched at planning and showed the school's street address. |
| Niche | https://www.niche.com/k12/providence-day-school-charlotte-nc/reviews/ | Opened in Chrome: page title "Providence Day School Reviews - Niche", city Charlotte, NC on the page, no redirect. |
| SchoolDigger | https://www.schooldigger.com/go/NC/schools/9999925170/school.aspx | Opened in Chrome: page title "Providence Day School in Charlotte NC - SchoolDigger", address line "5800 Sardis Rd", no redirect. SchoolDigger has no separate reviews page. On this date the page showed 3 ratings, 2 written reviews. |

**Map links, checked 2026-11-25 in Chrome.** The Google link uses Google's documented
Maps URLs search form (`/maps/search/?api=1&query=`). It opened a single listing titled
"Providence Day School - Google Maps", address Providence Day School, 5800 Sardis Rd, Charlotte, NC 28270. The Apple link uses Apple's documented Map Links form
(`?address=…&q=…`). It opened the street address with Providence Day School at it. The Google embed code was copied
by the user from Google Maps' Share → "Embed a map" on 2026-11-25, after zooming out two
steps from the listing's default view (17 → 15). Its `!1d3261.8` span (about 3.3 km for a
1024×768 view) confirms zoom 15, and its place id `0x885420f1c569ee31:0x82f5260b53f2af69`
is this school's listing.


### Reviewer roles, checked 2026-11-25 (the box subheadings)

Who wrote the reviews, counted from each site's own reviewer label only (no review
text, rating or name copied). Rules (user, 2026-11-25): "parents and students" when a
box holds at least one of each; an alum counts as a student; teachers, staff, "Works
Here", "community member", "Other", "Niche User" and unlabelled reviews do not change the
label.

| Site | What was counted | Subheading |
|---|---|---|
| GreatSchools | All 42 reviews on the reviews pages (the page states 42), fetched with `?page=N`, by `user_type`: parent 30, community member 4, unknown 7, student 1 | `greatschools: parents-students` |
| Niche | The first 20 of 84 reviews, read in Chrome, by author label: Parent 7, Junior 4, Senior 3, Sophomore 2, Alum 2, Other 2 | `niche: parents-students` |
| SchoolDigger | Opened in Chrome: 3 ratings, 2 written reviews, by role: parent 1, student 1 | `schooldigger: parents-students` |
