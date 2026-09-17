# Trinity Episcopal School — Branding — Crest and Brand Color

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** Direct fetch of the school's own homepage, its own stylesheets, and its
  own logo PNG. Both the brand color and the crest were read out of first-party
  assets — nothing here is sampled from a screenshot, a third-party directory, or a
  guess.
- **School:** Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202
  (the **Charlotte K–8 school**, `tescharlotte.org`).

### ⚠️ Disambiguation

There are several unrelated schools of the same name. This file describes **only**
the Charlotte NC K–8 school at 750 E. 9th Street. Not to be confused with:

- **Trinity Episcopal School, Richmond VA** (`trinityes.org`) — a grades **8–12 high school**
- **Trinity Episcopal School, Austin TX** (`austintrinity.org`)
- **Trinity Episcopal School, New Orleans LA** (`trinitynola.org`)

## Source URLs

- Homepage — https://www.tescharlotte.org/
- Palette stylesheet — https://www.tescharlotte.org/implementation_colors.css
- Theme stylesheet — https://www.tescharlotte.org/css.css
- Primary logo (wordmark + crest) — https://www.tescharlotte.org/editoruploads/images/Logos/logo.png
- Footer logo — https://www.tescharlotte.org/editoruploads/images/Logos/footer_logo.png

## Brand colors, as the school itself declares them

The school's CMS exposes a stylesheet whose own comments name the palette roles.

| Role | Hex | Evidence |
|---|---|---|
| **Primary** | `#002d56` | 32 occurrences in `implementation_colors.css`; 38 in `css.css`. Used for form borders, required-field text, button text/borders, calendar links, social icon fills. |
| **Secondary** | `#006f51` | Labelled verbatim in `css.css` under a comment reading `Secondary Color:` followed by `006f51`. Used for button fills and search-control hovers. |
| Body text | `#262626` | 15 occurrences |

**The logo corroborates the primary.** Sampling every opaque non-white pixel of
`logo.png` (2328 × 753 RGBA) returns `#002d56` at **465,595 px** — two orders of
magnitude ahead of any other color, and an exact match for the declared primary.
The wordmark and the crest are both drawn in it. **There is no green anywhere in
the mark**; `#006f51` is a UI accent for buttons, not part of the school's identity.

## The crest

The right-hand element of the primary logo is a **shield crest**: a navy shield with
a white outline, carrying a white cross whose arms are drawn with flared serifs, and
a central roundel containing the interlocked monogram **"eTS"**.

`public/logos/trinity-episcopal.png` was cut from `logo.png` at the fully transparent
41-pixel gutter spanning x = 1692–1732, which cleanly separates the wordmark from the
crest (a naive percentage crop catches the descender of the "Y" in TRINITY). The
result was alpha-trimmed, scaled to 90% of the canvas and centred on the project's
standard 1200 × 800 transparent RGBA canvas.

## The app's accent color — a deliberate, documented departure

The app ships **`#004a8e`**, not the school's literal `#002d56`.

`#002d56` sits **5.1 RGB units** from Covenant Day's `#002855` — visually the same
color. The dossier UI keys per-school accents to keep schools distinguishable, and the
navy band is the most crowded part of the palette: Covenant Day `#002855`, Gaston Day
`#00263f`, Carmel `#13294b`, Charlotte Latin `#12294f` and Hickory Grove `#14396e` are
all already in it.

`#004a8e` is the school's **exact hue (208.6°) at full saturation**, lightened until it
clears every neighbour:

| Against | Distance |
|---|--:|
| Hickory Grove `#14396e` | 41.4 |
| Charlotte Christian `#1e40af` | 43.4 |
| Covenant Day `#002855` | 60.6 |

White-on-badge contrast is **8.86:1** (WCAG AAA). This follows the precedent already
recorded in `src/data/brands.ts` for Charlotte Catholic, whose raw site color was
likewise adjusted along its own hue for distinctness and contrast.

## Badge initials

**`TES`** → the badge uses **`TE`**. The school's own abbreviation throughout its
materials (and in its crest monogram) is TES. No existing badge starts with `T`, so
there is no collision; seven of the eleven prior schools start with `C`.
