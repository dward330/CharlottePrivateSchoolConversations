#!/usr/bin/env node
/**
 * Render one 1200×630 social card per indexable route into dist/og/.
 *
 * WHY: the pages declare `twitter:card = summary_large_image`, which expects a
 * ~1200×630 landscape image. Every page used to point at the 256×256 site logo,
 * so every Facebook, iMessage and Slack share rendered the same cropped square
 * — and Facebook is this site's #2 referrer. A per-school card puts the school's
 * name in the preview.
 *
 * NOT composed from school crests. BRANDS carries a `logo:` for only 6 of the
 * 11 schools, so a crest-based template would leave 5 with a broken card. The
 * template uses the SITE wordmark + the school name + the school's brand color,
 * which every school has.
 *
 * The ground is CREAM, not the brand color. The supplied wordmark sits on an
 * opaque cream field (#f7f7ef — verified: alpha is 255 across the whole 2048²
 * canvas), so compositing it over a colored ground would show as a cream
 * rectangle floating on color. The brand color is used for an accent bar and
 * the school name instead — truer to the asset, and still 11 distinct cards.
 *
 * Driven by the Playwright Chromium that prerender.mjs already depends on, so
 * this adds no image library. Chained into `npm run build` BEFORE prerender, so
 * the files exist by the time the pages reference them.
 *
 * Usage: node scripts/gen_og_images.mjs [--quiet]
 * Exit codes: 0 = wrote every card, 2 = setup error (missing logo, no browser).
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { chromium } from 'playwright'
import { ROUTES, REPO_ROOT } from './seo_routes.mjs'
import { BRANDS } from '../src/data/brands.ts'

const QUIET = process.argv.includes('--quiet')
const OUT_DIR = resolve(REPO_ROOT, 'dist/og')

const W = 1200
const H = 630

/**
 * The site wordmark, ALREADY TRIMMED to its artwork and downscaled.
 *
 * Derived from the 2048×2048 master the user supplied, which lives (gitignored,
 * like every non-.md file there) at
 *   source-material/branding/_shared/Charlotte Private School Conversations Cover Art - Logo.png
 *
 * It is committed HERE rather than read from source-material because the build
 * depends on it: source-material/** is gitignored except for *.md, so a build
 * reading the master would work on this machine and fail on a fresh clone or in
 * CI — the worst kind of break, since nothing local reproduces it.
 *
 * Two transforms were applied once, at commit time, rather than on every build:
 *   - TRIMMED to the artwork's ink box (142,320)-(1906,1730), measured by
 *     scanning for pixels differing from the #f7f7ef corner by >18/channel. The
 *     master is a HORIZONTAL wordmark on a SQUARE canvas, so it carries ~142px
 *     of left/right and ~320px of top/bottom padding; dropping it untrimmed
 *     into a 1200×630 frame renders the mark visibly smaller than intended.
 *   - Downscaled to 701×560 and quantized to 64 colors (2.2 MB → 191 KB). The
 *     card draws it 250px tall, so this is still 2x for retina.
 */
const LOGO_SRC = resolve(REPO_ROOT, 'assets/brand/wordmark.png')

const CREAM = '#f7f7ef'
const INK_DARK = '#33322e'
const MUTED = '#6f6d64'

const SITE_NAME = 'Charlotte School Insights'

function card({ title, kicker, color }, logo) {
  // Scale the trimmed artwork to a fixed height and let width follow, so every
  // card's wordmark is optically the same size regardless of rounding.
  const drawH = 250
  const drawW = Math.round((logo.width / logo.height) * drawH)

  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600&family=Barlow:wght@400;600&display=swap">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${W}px; height: ${H}px; }
  body {
    background: ${CREAM};
    font-family: Barlow, system-ui, sans-serif;
    color: ${INK_DARK};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 74px 88px;
    position: relative;
  }
  /* The one place the school's brand color carries the card. */
  .bar { position: absolute; left: 0; top: 0; bottom: 0; width: 18px; background: ${color}; }
  .logo { width: ${drawW}px; height: ${drawH}px; object-fit: contain; object-position: left center; display: block; }
  .kicker {
    margin-top: 40px;
    font-family: 'Barlow Condensed', Barlow, sans-serif;
    font-weight: 600; font-size: 26px; letter-spacing: 0.14em;
    text-transform: uppercase; color: ${color};
  }
  h1 {
    margin-top: 10px;
    font-family: 'Barlow Condensed', Barlow, sans-serif;
    font-weight: 600; font-size: 68px; line-height: 1.04; letter-spacing: 0.005em;
    max-width: 940px;
  }
  .foot { margin-top: 26px; font-size: 25px; color: ${MUTED}; }
</style></head>
<body>
  <span class="bar"></span>
  <img class="logo" src="${logo.uri}" alt="">
  <p class="kicker">${esc(kicker)}</p>
  <h1>${esc(title)}</h1>
  <p class="foot">${esc(SITE_NAME)}</p>
</body></html>`
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

if (!existsSync(LOGO_SRC)) {
  console.error(`gen:og: brand wordmark not found at\n  ${LOGO_SRC}`)
  console.error('gen:og: refusing to upscale public/logo.png (256×256) into a 1200×630 frame.')
  process.exit(2)
}

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: W, height: H } })

  // Inlined as a data: URI so the card HTML has no external dependency —
  // page.setContent() has no base URL, so a file path would silently not load
  // and every card would ship with a missing-image box.
  const uri = 'data:image/png;base64,' + readFileSync(LOGO_SRC).toString('base64')
  // Intrinsic size read from the decoded image rather than hardcoded, so
  // replacing the asset cannot silently stretch the mark.
  const { width, height } = await page.evaluate(async (u) => {
    const img = new Image()
    img.src = u
    await img.decode()
    return { width: img.naturalWidth, height: img.naturalHeight }
  }, uri)
  const logo = { uri, width, height }

  mkdirSync(OUT_DIR, { recursive: true })

  const cards = []
  for (const route of ROUTES) {
    if (route.school) {
      const brand = BRANDS[route.school.slug]
      if (!brand) {
        // A school in the manifest but absent from BRANDS has no color to use.
        // Fail loudly: a silently-grey card is a defect nobody would notice.
        console.error(`gen:og: no BRANDS entry for "${route.school.slug}"`)
        process.exit(2)
      }
      cards.push({
        name: route.school.slug,
        title: route.school.name,
        kicker: `${brand.city}, NC`,
        color: brand.color,
      })
    } else if (route.path === '/compare/') {
      cards.push({
        name: 'compare',
        title: 'Compare Charlotte private schools',
        kicker: 'Side by side',
        color: '#12294f',
      })
    } else {
      cards.push({
        name: 'home',
        title: 'Charlotte-area private school research',
        kicker: 'Independent · cited',
        color: '#12294f',
      })
    }
  }

  for (const c of cards) {
    await page.setContent(card(c, logo), { waitUntil: 'load' })
    // The webfonts must be in before the shot, or the card renders in a
    // fallback face — invisible in a headless log, obvious in a Facebook share.
    await page.evaluate(() => document.fonts.ready)
    const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: W, height: H } })
    writeFileSync(join(OUT_DIR, `${c.name}.png`), buf)
    if (!QUIET) console.log(`  og/${c.name}.png`)
  }

  if (!QUIET) console.log(`gen:og: wrote ${cards.length} cards at ${W}×${H} to dist/og/`)
} finally {
  await browser.close()
}
