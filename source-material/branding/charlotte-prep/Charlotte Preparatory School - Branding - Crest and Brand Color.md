# Charlotte Preparatory School — Branding — Crest and Brand Color

### The mark: a CP monogram, not a heraldic crest

Charlotte Preparatory School (212 Boyce Road, Charlotte, NC 28211; https://charlotteprep.org/) does not use a shield or seal on its website. Its identity is a two-color **"CP" monogram**: an open, half-round navy "C" beside a taller, light-blue "P" whose stem drops below the C. On the full logo the monogram sits to the left of the wordmark "Charlotte Preparatory School", set in navy on three lines. The same monogram, on its own, is the site's favicon and app icon.

The school's teams are the **Tigers** (2013 Fast Facts, "School mascot: Tigers", https://web.archive.org/web/20130130002213/http://www.charlotteprep.org:80/fastfacts; the current athletics page speaks of "Tiger Pride"). No tiger mark appears on the website.

### Brand colors, as the school's own files declare them

| Role | Hex | Where it appears |
|---|---|---|
| **Primary — navy** | #1d2e5e | The wordmark and the "C" of the monogram (https://charlotteprep.org/images/template/logo-large.svg, seven fills); the site's Safari pinned-tab color (mask-icon color="#1d2e5e" on the homepage). The site stylesheet and the small header logo use #1d2d5e, one unit away — the same color. It is the most frequent color in the stylesheet (31 uses). |
| **Secondary — light blue** | #42a7c6 | The "P" of the monogram (one fill in every logo file). The stylesheet uses #42a6c7, one unit away. |
| Accent | #c2d500 | A lime green used 15 times in the stylesheet for interface details; not part of the logo. |

**The logo itself confirms the primary.** Rendering the full logo (logo-large.svg) and counting every fully opaque pixel gives navy #1d2e5e at 1,138,001 pixels and light blue #42a7c6 at 734,526: navy is the dominant color of the school's mark. On the monogram alone the light-blue P is larger (734,526 pixels to 374,715), but the wordmark, the header band and the site chrome are navy.

### Contrast and distinctness

Against white text, the navy #1d2e5e gives a contrast ratio of 13.09:1. The light blue #42a7c6 gives only 2.77:1, below the 4.5:1 needed for readable white text.

The school's navy sits close to several navies already used for other Charlotte schools: 19.3 RGB units from #12294f, 21.4 from #14396e and 22.0 from #13294b — near enough to read as the same color. Two adjustments were tested along the school's own hues:

| Candidate | How derived | White-text contrast | Nearest other school color |
|---|---|---|---|
| #1d2e5e | the school's literal navy | 13.09:1 | 19.3 units (#12294f) |
| #2b458c | the school's navy hue (224°) and saturation, lightened | 9.00:1 | 37.7 units (#1e40af) |
| #2d7c95 | the school's light-blue hue (194°), deepened for contrast | 4.74:1 | 17.3 units (#3a759e) |

Deepening the light blue lands on an existing school's color, so it does not help. Lightening the navy along its own hue to #2b458c keeps the school's hue, stays far above contrast requirements, and clears every existing color by at least 37 units.

### Badge initials

**CP**, from the monogram itself and from the school's own short name, "Charlotte Prep". No existing badge uses CP (the badges in use are CA, CM, CH, CC, CD, CL, CV, DD, GD, HG, PD and TE).

### The logo file

The badge image was cut from the school's own vector logo (https://charlotteprep.org/images/template/logo-large.svg, viewBox 360.256 × 120). The SVG was rendered at 4800 pixels wide with a transparent background in headless Chrome. The monogram was separated from the wordmark at the fully transparent vertical gap between them (pixel columns 1533–1784 at that size; a separate small gap inside the monogram, between the C and the P, columns 589–665, was kept). The monogram was trimmed to its visible edges (1533 × 1575 pixels), scaled to 720 pixels tall — 90% of the canvas height — and centered on a 1200 × 800 transparent RGBA canvas, matching the other school badges. Final visible area: x 249–950, y 40–760.

## Method

Retrieved 2026-10-19 by direct download (curl) of the school's homepage HTML, its stylesheet, its logo SVGs and its favicon set. Colors were read from the SVG fill attributes and stylesheet text, and corroborated by counting the pixels of the rendered logo with Python (Pillow). Contrast ratios use the WCAG relative-luminance formula; distances are straight-line distances in RGB.

**Identity check.** Every file came from charlotteprep.org, the site of the school at 212 Boyce Road. No third-party logo source was used.

**Source URLs**
- Homepage — https://charlotteprep.org/
- Header logo (small, with navy background band) — https://charlotteprep.org/images/template/logo-small-with-bg.svg (fills #1d2d5e, #42a7c6, white)
- Full logo — https://charlotteprep.org/images/template/logo-large.svg (fills #1d2e5e ×7, #42a7c6 ×1) — the source of the badge
- Reversed logo for dark backgrounds — https://charlotteprep.org/images/template/logo-dark-bckgrnd.svg (white ×7, #42a7c6 ×1)
- Monogram only — https://charlotteprep.org/images/template/logo-mini.svg (#42a7c6 and white)
- Favicon set — https://charlotteprep.org/favicon/apple-touch-icon.png (180 × 180), https://charlotteprep.org/favicon/android-chrome-512x512.png (512 × 512, the CP monogram), https://charlotteprep.org/favicon/safari-pinned-tab.svg
- Web manifest — https://charlotteprep.org/favicon/site.webmanifest (theme_color #ffffff; no brand color declared there)
- Stylesheet — https://charlotteprep.org/css/styles.css (no CSS custom properties for colors; colors are literal hex values)
- og:image — https://charlotteprep.org/uploads/images/Icons/referral.svg (a generic icon, not the logo)

**Corrections to the indicative sweep.** None; the sweep did not record a color. Note that the school's "crest" is a monogram, not a shield.

**Not published.** A brand standards guide or official color names/Pantone values were not found on the site.
