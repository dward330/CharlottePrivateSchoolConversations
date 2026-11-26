# Cannon School - Read Reviews - Review Site Links

Cannon School's own pages on three independent review sites. The app links to them from the
Read Reviews section. It copies no rating, grade, review text or reviewer name from any of
them.

- GreatSchools: https://www.greatschools.org/north-carolina/concord/2219-Cannon-School/reviews/
- Niche: https://www.niche.com/k12/cannon-school-concord-nc/reviews/
- SchoolDigger: https://www.schooldigger.com/go/NC/schools/9999924871/school.aspx

Map links (the decorative map under the boxes):

- Open in Google Maps: https://www.google.com/maps/search/?api=1&query=Cannon%20School%2C%205801%20Poplar%20Tent%20Road%2C%20Concord%2C%20NC%2028027
- Open in Apple Maps: https://maps.apple.com/?address=5801%20Poplar%20Tent%20Road%2C%20Concord%2C%20NC%2028027&q=Cannon%20School
- Google embed (iframe src): https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3252.005927742211!2d-80.67408082056338!3d35.40510361318815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854051c46f6ad1f%3A0xed2e20befed37c69!2sCannon%20School!5e0!3m2!1sen!2sus!4v1795657377945!5m2!1sen!2sus

## Method

**Provenance.** Written 2026-11-25 by `/implement readreviews` (plan
`.claude/plans/readreviews.md`), from the staging record
`source-material/branding/_shared/All Schools - Read Reviews - Review Site Links.md`.
School address from the school's own site: 5801 Poplar Tent Road, Concord, NC 28027.

| Site | URL | How it was checked (2026-11-25) |
|---|---|---|
| GreatSchools | https://www.greatschools.org/north-carolina/concord/2219-Cannon-School/reviews/ | Fetched: HTTP 200, page title "Cannon School Reviews \| GreatSchools". The profile page (same URL without `reviews/`) was fetched at planning and showed the school's street address. |
| Niche | https://www.niche.com/k12/cannon-school-concord-nc/reviews/ | Opened in Chrome: page title "Cannon School Reviews - Niche", city Concord, NC on the page, no redirect. |
| SchoolDigger | https://www.schooldigger.com/go/NC/schools/9999924871/school.aspx | Opened in Chrome: page title "Cannon School in Concord NC - SchoolDigger", address line "5801 Poplar Tent Rd", no redirect. SchoolDigger has no separate reviews page. On this date the page showed no ratings yet. |

**Map links, checked 2026-11-25 in Chrome.** The Google link uses Google's documented
Maps URLs search form (`/maps/search/?api=1&query=`). It opened a single listing titled
"Cannon School - Google Maps", address Cannon School, 5801 Poplar Tent Rd, Concord, NC 28027. The Apple link uses Apple's documented Map Links form
(`?address=…&q=…`). It opened the street address with Cannon School (listed at this address) at it. The Google embed code was copied
by the user from Google Maps' Share → "Embed a map" on 2026-11-25 and is used exactly as
given. Its `!1d3252.0` span (for a 1024×768 view) is zoom 15, the same as Providence Day. Its place name is
"Cannon School" and its place id is `0x8854051c46f6ad1f:0xed2e20befed37c69`.


### Reviewer roles, checked 2026-11-25 (the box subheadings)

Who wrote the reviews, counted from each site's own reviewer label only (no review
text, rating or name copied). Rules (user, 2026-11-25): "parents and students" when a
box holds at least one of each; an alum counts as a student; teachers, staff, "Works
Here", "community member", "Other", "Niche User" and unlabelled reviews do not change the
label.

| Site | What was counted | Subheading |
|---|---|---|
| GreatSchools | All 31 reviews on the reviews pages (the page states 30), fetched with `?page=N`, by `user_type`: parent 26, community member 1, student 1, unknown 3 | `greatschools: parents-students` |
| Niche | The first 20 of 118 reviews, read in Chrome, by author label: Parent 13, Senior 3, Junior 1, Sophomore 1, Middle school student 1, Alum 1 | `niche: parents-students` |
| SchoolDigger | Opened in Chrome: no ratings or written reviews on the page; the box says "parents" by the user's choice (2026-11-25) | `schooldigger: parents` |
