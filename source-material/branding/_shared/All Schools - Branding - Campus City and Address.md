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
