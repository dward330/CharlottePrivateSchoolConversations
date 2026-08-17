# Covenant Day School — Sports — Team Levels (Varsity / JV / Middle School)

> **Provenance:** Compiled by Claude Code on 2026-08-17 during `/plan CovenantDaySports`,
> by opening every team page linked from the athletics Teams index and reading the
> **"Additional Levels"** box in each page's right-hand sidebar. That box is the school's
> own per-sport statement of which sub-varsity ladders exist (Middle School and/or JV);
> when a sport fields no sub-varsity team, the box either lists no level links or is
> absent. This resolves the per-sport V/JV/MS breakdown that the earlier "Sports Offered"
> research could only state in aggregate ("varsity, JV, and middle school levels").

### Method (how to re-verify)

1. Start at the Teams index: https://www.covenantday.org/athletics/teams
2. Click a sport tile → the **Learn More** button that appears → the sport's team page.
3. On the team page, read the **Additional Levels** box in the right sidebar. Any
   "Middle School <Sport>" link means an MS team exists; any "JV <Sport>" link means a JV
   team exists. Generic sidebar links (Schedule, Tickets, Facilities) are NOT levels and
   are ignored. No level links / no box ⇒ Varsity only.

### Sources — Teams index and every team page

- Teams index: https://www.covenantday.org/athletics/teams
- Varsity Boys Soccer (worked example, shows MS + JV): https://www.covenantday.org/athletics/teams/fall-sports/varsityboyssoccer
- Per-team pages carry internal Finalsite ids (`/fs/pages/NNNN`); the id read for each
  sport is recorded in the table below.

### Per-sport levels (as read from each team page's Additional Levels box)

| Season | Sport (school's title) | Page id | Additional Levels box | Levels |
|---|---|---|---|---|
| Fall | Cross Country | /fs/pages/2124 | Middle School Cross Country | **V, MS** |
| Fall | Boys Soccer | /fs/pages/2129 | Middle School Boys Soccer; JV Boys Soccer | **V, JV, MS** |
| Fall | Cheerleading | /fs/pages/2141 | Middle School Cheerleading | **V, MS** |
| Fall | Football | /fs/pages/2126 | Middle School Football; JV Football | **V, JV, MS** |
| Fall | Field Hockey | /fs/pages/2138 | Middle School Field Hockey; JV Field Hockey | **V, JV, MS** |
| Fall | Girls Golf | /fs/pages/2143 | *(no box / no level links)* | **V** |
| Fall | Girls Tennis | /fs/pages/2132 | Middle School Girls Tennis; JV Girls Tennis | **V, JV, MS** |
| Fall | Volleyball | /fs/pages/2135 | Middle School Volleyball; JV Volleyball | **V, JV, MS** |
| Winter | Boys Basketball | /fs/pages/2145 | Middle School Boys Basketball; JV Boys Basketball | **V, JV, MS** |
| Winter | Girls Basketball | /fs/pages/2148 | Middle School Girls Basketball | **V, MS** |
| Winter | Cheerleading | /fs/pages/2150 | Middle School Cheerleading | **V, MS** |
| Winter | Swimming | /fs/pages/2152 | Middle School Swimming | **V, MS** |
| Spring | Baseball | /fs/pages/2157 | Middle School Baseball; JV Baseball | **V, JV, MS** |
| Spring | Boys Golf | /fs/pages/2160 | Middle School Boys Golf | **V, MS** |
| Spring | Boys Tennis | /fs/pages/2163 | Middle School Boys Tennis | **V, MS** |
| Spring | Girls Soccer | /fs/pages/2165 | Middle School Girls Soccer; JV Girls Soccer | **V, JV, MS** |
| Spring | Softball | /fs/pages/2168 | Middle School Softball | **V, MS** |
| Spring | Track & Field | /fs/pages/2170 | Middle School Track & Field | **V, MS** |

### Summary counts

- **JV teams (8 sports):** Boys Soccer, Football, Field Hockey, Girls Tennis, Volleyball,
  Boys Basketball, Baseball, Girls Soccer.
- **Middle School teams (17 of 18 sports):** every sport EXCEPT Girls Golf.
- **Varsity only (1 sport):** Girls Golf.

This corroborates the school's aggregate claim that its 18 teams run "at the varsity, JV,
and middle school levels" — now resolved to the per-sport level exactly as the school
publishes it.

### Mapping to the app's `offered` card entries

The app's `offered.seasons[].sports[]` entries are named slightly differently from the
school's team titles (e.g. the app uses `Cross Country (B & G)`, `Cheerleading`,
`Volleyball (Girls)`). The mapping is 1:1 by sport; each app entry takes the `levels`
array from the matching row above. Cheerleading appears in both Fall and Winter and is
`V, MS` in each.
