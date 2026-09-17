# All Schools — Branding — Campus City and Address

**Provenance:** Fetched by Claude on 2026-08-23 while planning `bugFixSchoolLocation`.
Every address below was read from **the school's own website** (footer or header block)
on that date, and independently cross-checked against the street address already recorded
in this repo's committed `source-material/**/*.md` research files. All eleven agreed.

**Why this exists:** the school-page dossier kicker rendered the fixed string
`School dossier · Charlotte, NC` for every school. Five of the eleven schools are not in
Charlotte, so the app was stating the wrong municipality on those five pages. This file is
the hard-data record behind the per-school city added to `src/data/brands.ts`.

**Scope note:** the *city* recorded here is the municipality in the school's own published
mailing address. It is deliberately **not** a claim about county, township, or the
Charlotte metropolitan area — all eleven schools are in the Charlotte metro, which is what
the site-wide "Charlotte-area" phrasing refers to, and that phrasing is correct and
unchanged.

## The table

| Slug | School | Street | City | State | ZIP | Charlotte today? | Correct? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `cannon` | Cannon School | 5801 Poplar Tent Road | **Concord** | NC | 28027 | Charlotte | ✗ wrong |
| `carmel-christian` | Carmel Christian School | 1145 Pineville Matthews Road | **Matthews** | NC | 28105 | Charlotte | ✗ wrong |
| `charlotte-catholic` | Charlotte Catholic High School | 7702 Pineville Matthews Rd | Charlotte | NC | 28226 | Charlotte | ✓ correct |
| `charlotte-christian` | Charlotte Christian School | 7301 Sardis Road | Charlotte | NC | 28270 | Charlotte | ✓ correct |
| `charlotte-country-day` | Charlotte Country Day School | 1440 Carmel Road | Charlotte | NC | 28226 | Charlotte | ✓ correct |
| `charlotte-latin` | Charlotte Latin School | 9502 Providence Road | Charlotte | NC | 28277 | Charlotte | ✓ correct |
| `covenant-day` | Covenant Day School | 800 Fullwood Lane | **Matthews** | NC | 28105 | Charlotte | ✗ wrong |
| `davidson-day` | Davidson Day School | 750 Jetton Street | **Davidson** | NC | 28036 | Charlotte | ✗ wrong |
| `gaston-day` | Gaston Day School | 2001 Gaston Day School Rd | **Gastonia** | NC | 28056 | Charlotte | ✗ wrong |
| `hickory-grove-christian` | Hickory Grove Christian School | 7200 E. WT Harris Blvd. | Charlotte | NC | 28215 | Charlotte | ✓ correct |
| `providence-day` | Providence Day School | 5800 Sardis Road | Charlotte | NC | 28270 | Charlotte | ✓ correct |
| `trinity-episcopal` | Trinity Episcopal School | 750 E. 9th Street | Charlotte | NC | 28202 | *(added 2026-09-16)* | ✓ correct |

**Five wrong, six correct.** The five to fix are `cannon` (Concord),
`carmel-christian` (Matthews), `covenant-day` (Matthews), `davidson-day` (Davidson) and
`gaston-day` (Gastonia).

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://www.cannonschool.org/ | Cannon School footer — "5801 Poplar Tent Road Concord, NC 28027" |
| S2 | https://www.carmelchristian.org/ | Carmel Christian footer — "1145 Pineville Matthews Road, Matthews, NC 28105" |
| S3 | https://www.charlottecatholic.org/ | Charlotte Catholic footer — "7702 Pineville Matthews Rd, Charlotte, NC 28226" |
| S4 | https://www.charlottechristian.com/ | Charlotte Christian footer — "7301 Sardis Road, Charlotte, NC 28270" |
| S5 | https://www.charlottecountryday.org/ | Country Day footer — "1440 Carmel Road, Charlotte, North Carolina 28226" |
| S6 | https://www.charlottelatin.org/ | Charlotte Latin footer — "9502 Providence Road, Charlotte, NC 28277" |
| S7 | https://www.covenantday.org/ | Covenant Day footer — "800 Fullwood Lane, Matthews, North Carolina 28105" |
| S8 | https://www.davidsonday.org/ | Davidson Day footer — "750 Jetton Street, Davidson, NC 28036" |
| S9 | https://www.gastonday.org/ | Gaston Day header + footer — "2001 Gaston Day School Rd, Gastonia, NC 28056" |
| S10 | https://www.hgchristian.org/ | Hickory Grove Christian footer — "7200 E. WT Harris Blvd., Charlotte, NC 28215" |
| S11 | https://www.providenceday.org/ | Providence Day footer — "5800 Sardis Road, Charlotte, NC 28270" |

## Cross-check against existing committed research

Each street address above already appears in this repo's committed research files, which
is how the wrong five were found without trusting a single fetch. The ZIP-bearing address
lines occur in `source-material/<topic>/<slug>/*.md` — for example Gaston Day's financial
aid file opens `2001 Gaston Day School Road, Gastonia, NC 28056`, and Cannon, Carmel,
Covenant Day and Davidson Day each carry their own city + ZIP in the same way. No figure
here was re-typed from memory.

## Traps worth recording

- **Two schools share ZIP 28105 (Matthews):** Carmel Christian and Covenant Day. Both were
  rendering "Charlotte"; both are Matthews. Fixing one and not the other is the easy miss.
- **Charlotte Catholic's street is "Pineville Matthews Rd" but its city is Charlotte.** The
  street name contains two other municipalities' names. Do not infer a city from a street.
- **Charlotte Country Day has two campuses** (Cannon Campus and Bissell Campus) but
  publishes one mailing address; both are in Charlotte, so the single city is accurate.
- **A mailing address is not always the municipality.** For these eleven the school's own
  published city is what the app should state, and that is the rule applied here — the app
  is reporting what the school says about itself, not adjudicating annexation boundaries.

## Homepage verification 2026-09-17

**Why:** the dossier header's school name and mascot crest became outbound links to each
school's own homepage (`.claude/plans/schoolwebsitelink.md`, `homepageUrl` in
`src/data/brands.ts`). Every URL below was re-checked live on the date shown before it was
written into the app, so no link shipped on a URL that was merely believed to work.

**Method:** `curl -sS -o /dev/null -w '%{http_code} %{url_effective}' -L --max-time 20 <url>`,
following redirects, run 2026-09-17. `url_effective` is reported so a silent redirect to a
different host would be visible rather than hidden behind the 200.

| Slug | Homepage | Status | Final URL | Checked |
| --- | --- | --- | --- | --- |
| `cannon` | https://www.cannonschool.org/ | 200 | same | 2026-09-17 |
| `carmel-christian` | https://www.carmelchristian.org/ | 200 † | same | 2026-09-17 |
| `charlotte-catholic` | https://www.charlottecatholic.org/ | 200 | same | 2026-09-17 |
| `charlotte-christian` | https://www.charlottechristian.com/ | 200 | same | 2026-09-17 |
| `charlotte-country-day` | https://www.charlottecountryday.org/ | 200 | same | 2026-09-17 |
| `charlotte-latin` | https://www.charlottelatin.org/ | 200 | same | 2026-09-17 |
| `covenant-day` | https://www.covenantday.org/ | 200 | same | 2026-09-17 |
| `davidson-day` | https://www.davidsonday.org/ | 200 | same | 2026-09-17 |
| `gaston-day` | https://www.gastonday.org/ | 200 | same | 2026-09-17 |
| `hickory-grove-christian` | https://www.hgchristian.org/ | 200 | same | 2026-09-17 |
| `providence-day` | https://www.providenceday.org/ | 200 | same | 2026-09-17 |
| `trinity-episcopal` | https://www.tescharlotte.org/ | 200 | same | 2026-09-17 |

**Twelve of twelve resolve, and none redirects off its own host.** No school was left
without a `homepageUrl`.

### † Carmel Christian answers 503 to a bare `curl`, and it is NOT down

`https://www.carmelchristian.org/` returns **503 Service Unavailable with a zero-length
body** to curl's default user agent, while returning **200** to a browser user agent. The
response carries `Vary: User-Agent` and `Server: Apache`, which is the signature of
user-agent-based bot filtering, not an outage — the apex (`carmelchristian.org`, no `www`)
behaves identically. The site is up and the URL is correct.

Worth recording because it is a trap in both directions: a future re-verification pass that
runs bare `curl` will read this school as broken and may "fix" a URL that was never wrong,
and a checker that fetched URLs would fail the build on a live site. That is one of the
reasons `scripts/check_schoolurls.mjs` deliberately validates **shape and uniqueness only**
and makes no network call — liveness is recorded here, with a date, rather than asserted in
a build gate.

### Trap: Charlotte Christian is `.com`, not `.org`

`charlottechristian.com` is the only one of the twelve on a `.com`. Every other school
is `.org`. `charlottechristian.org` is **not** the school and typing it is a silent error —
the link would simply go somewhere else, with no failing check, since URL shape is valid
either way. Verified against the school's own site on both 2026-08-23 and 2026-09-17.
