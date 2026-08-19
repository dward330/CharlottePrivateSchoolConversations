# Charlotte Catholic High School — Branding (Colors and Badge)

**Provenance**

- **Compiled by:** Claude Code deep research pass (`/implement add-charlotte-catholic`).
- **Date compiled:** 2026-08-18
- **Method:** School colors confirmed from the Wikipedia infobox and cross-checked against
  the school's own theme stylesheet, which was downloaded and parsed for its hex values.
  No color was eyeballed from a screenshot.

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://en.wikipedia.org/wiki/Charlotte_Catholic_High_School | Infobox — **"Light blue, white, and red"**, mascot Cougars, NCHSAA / Southern Carolina 6A/7A |
| S2 | https://www.charlottecatholic.org/uploaded/themes/mod-danbury/main.css | The school site's own theme stylesheet — the source of the sampled hex values below |
| S3 | https://www.maxpreps.com/nc/charlotte/charlotte-catholic-cougars/ | MaxPreps program page (lists a Colors field but leaves it **empty**) |

## ⚠️ The planning note said "green and gold". That is WRONG.

The `/add-school` assessment recorded CCHS as "green and gold" and warned that its green
would need to be kept distinct from Charlotte Country Day's `#107a43`. **Neither the
school's own stylesheet nor its Wikipedia infobox contains any green at all.** The
published colors are **light blue, white and red**, which also dissolves the collision
worry entirely — the shipped accent is nowhere near Country Day's green.

## Colors sampled from the school's own stylesheet (S2)

| Hex | Occurrences | Where it is used |
| --- | --- | --- |
| `#d7102a` | 116 | Red — navigation links, current-page states, callout blocks |
| `#75b2dd` | 20 | **Light blue** — nav hover, button blocks, mobile sub-nav header |
| `#636363`, `#cfcfcf`, `#e5e5e5`, `#242424` | 83 / 47 / 41 / 35 | Greys — template chrome, not brand colors |

The site runs a stock Finalsite "mod-danbury" theme, so its greys are template defaults;
the two colors that carry brand meaning are the red and the light blue.

## What shipped, and why

**`color: '#3a759e'`** — the school's own light blue, deepened along the same hue.

- The raw `#75b2dd` measures **2.29:1 against white**. The app's `.badge` fills with
  `--brand` behind `#fff` text, and `--brand` is also used as a text color on light
  surfaces, so the raw value would be illegible in both places.
- `#3a759e` keeps the identical hue (**204.8°**) with saturation and value adjusted to
  reach **4.98:1 white-on-badge — WCAG AA**.
- It is the only light-to-mid blue in the roster: **62 RGB units** from its nearest
  neighbour (Davidson Day's `#1e5fd1`) and far from every navy
  (Covenant Day `#002855`, Gaston Day `#00263f`, Latin `#12294f`, Hickory Grove `#14396e`,
  Carmel `#13294b`).

**The red was deliberately not used.** `#d7102a` is the more prominent color on the school
site, but it is a near-twin of Providence Day's `#be123c`; taking the blue keeps the two
schools distinguishable in the Compare view and on the home grid.

**`initials: 'CH'`** — `CC` (Charlotte Christian), `CA` (Cannon), `CM` (Carmel Christian),
`CD` (Charlotte Country Day), `CL` (Charlotte Latin) and `CV` (Covenant Day) are all
taken; **7 of the 11 badges now start with C**. `CH` is free and reads as the school's own
CCHS abbreviation reduced to its distinctive pair.

**`welcomeVideoUrl`** — `https://www.youtube.com/embed/mk06OtSv9ps`
("Charlotte Catholic High School – Grounded in Tradition"), user-supplied and confirmed
during planning.

**No `logo`.** No official athletics mark was sourced in this pass, so the school ships
the monogram badge rather than a substituted or mocked-up crest.
