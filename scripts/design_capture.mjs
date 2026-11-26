#!/usr/bin/env node
/**
 * Capture the BUILT app as static design files for the Claude Design project
 * (plan `designsync`). A design file made this way is a snapshot of the real
 * DOM, styled by the app's own compiled CSS, so it cannot drift from the page
 * the way a hand-redrawn mock did.
 *
 * Needs a built site being served:
 *   npm run build && npx vite preview          # serves http://localhost:4173
 *
 * Modes
 *   --css --out <dir>
 *       Split dist/assets/index-*.css at top-level rule boundaries (never
 *       inside an @media/@supports block) into app-1.css … app-N.css, each
 *       ≤ 38 KB before line breaks. Prints each chunk's size and sha256.
 *       Every written file gets newlines only where they are whitespace to
 *       the browser (after a CSS `}`, after a selector-list comma on a very
 *       long line, inside a start tag after its name), so no line is too long
 *       to read and copy reliably.
 *
 *   --page <route> --name <file name> --out <dir>
 *          [--area <slug>] [--cards closed|open] [--extra <slug>:<card-id>,…]
 *          [--refs "<reference school(s)>"] [--parts auto|1] [--drop "<css selectors>"]
 *          [--sha <commit the build came from>] [--format dc|plain]
 *       --format dc (the default) writes Claude Design's editable component
 *       format (<x-dc> + ./support.js + a DCLogic script); plain HTML renders
 *       in the preview but is read-only in the Claude Design editor.
 *       Load <route>, open every <details> in scope (or close them all with
 *       --cards closed), take the scoped DOM — one #topic-<slug> section for
 *       --area, otherwise the whole app shell — trim it (see TRIMMING), and
 *       wrap it in the standard design-file skeleton. --extra appends cards
 *       captured from other schools, each labelled with its school. Writes
 *       "<name>.dc.html" and prints size + sha256. A --format dc page is always
 *       ONE file, however large: Claude Design's editor cannot edit markup
 *       pulled in from another file, so a split page is read-only below the
 *       split. Over 83,159 bytes (the largest write proven) it warns and exits 1.
 *       With --format plain, over the cap, a capture splits at card / section /
 *       row-group boundaries into "<name> (k of N).dc.html". --drop removes matching elements from the
 *       capture first (the Shared Components file drops the research sections).
 *
 *   --screens <url> --name <n> --out <dir> [--area <slug>] [--cards closed|open]
 *       Screenshots at 1280 light, 1280 dark and 390 light (--variants
 *       1280-light,… picks some), tiled into
 *       ≤ 2000px-tall PNGs (<n>-<variant>-NN.png). With --area on an app URL
 *       only that section is shot; a design-file URL is shot whole.
 *
 * TRIMMING (repeated runs are trimmed only when the untrimmed file would be
 * over the cap), in order: strip <script>/<noscript>/<template>, comments, React
 * ids and aria-* / data-* attributes (data-card, data-theme and every one the
 * built CSS selects on are kept);
 * collapse whitespace; replace iframes with a labelled box of the same size;
 * in any run of more than 8 like siblings keep the first 6 and add one
 * ".ds-trim" element reading "+N more in the app" (a run may be one repeated
 * element or a repeated row of up to 12 flat grid cells). Cards, sections,
 * table cells, SVG content and <option>s are never trimmed, and neither are
 * the children of navigation lists, stat strips and card grids. Closed native
 * popovers (hover tips) are dropped: they are display:none in every state.
 *
 * Images and links become absolute live-site URLs (https://charlotteschoolinsights.com).
 * English only. Real Chrome, headed by default (--headless to override).
 * domcontentloaded plus selector waits, never networkidle — school pages
 * never go idle.
 *
 * Exit 0 ok · 1 over the size cap or a capture failed · 2 bad usage or the
 * server is unreachable.
 */
import { chromium } from 'playwright'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const has = (f) => args.includes(f)

const BASE = val('--base', 'http://localhost:4173').replace(/\/$/, '')
const LIVE = 'https://charlotteschoolinsights.com'
const OUT = val('--out', null)
const HEADLESS = has('--headless')
const CSS_CHUNK_MAX = 38 * 1024
const FILE_CAP = Number(val('--cap', String(40 * 1024)))
// The largest single file proven to write to Claude Design (Providence Day
// with card links, 83,159 bytes, 2026-11-20). A component file is never split: the editor cannot edit markup
// pulled in from another file (<dc-import>), so a page split across files is
// read-only below the split. Past this size the capture still writes, and warns.
const ONE_FILE_PROVEN = 83159
const FONTS = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=Barlow:wght@400;500;600;700&display=swap'

const sha = (s) => createHash('sha256').update(s).digest('hex')
const kb = (n) => `${(n / 1024).toFixed(1)} KB`
function die(msg, code = 2) { console.error(`✗ ${msg}`); process.exit(code) }
if (!OUT) die('--out <dir> is required')
mkdirSync(OUT, { recursive: true })

/* ------------------------------------------------------------------ --css */

/** Split minified CSS at depth-0 rule ends, honouring strings and comments. */
function topLevelRules(css) {
  const rules = []
  let depth = 0, start = 0, i = 0
  while (i < css.length) {
    const c = css[i]
    if (c === '/' && css[i + 1] === '*') { const e = css.indexOf('*/', i + 2); i = e === -1 ? css.length : e + 2; continue }
    if (c === '"' || c === "'") {
      let j = i + 1
      while (j < css.length && css[j] !== c) j += css[j] === '\\' ? 2 : 1
      i = j + 1; continue
    }
    if (c === '{') depth++
    else if (c === '}') { depth--; if (depth === 0) { rules.push(css.slice(start, i + 1)); start = i + 1 } }
    else if (c === ';' && depth === 0) { rules.push(css.slice(start, i + 1)); start = i + 1 }
    i++
  }
  if (start < css.length) rules.push(css.slice(start))
  if (depth !== 0) die(`unbalanced braces in the stylesheet (depth ${depth})`, 1)
  return rules
}

/**
 * Line breaks that cannot change rendering, so a file has no line too long to
 * read and copy reliably (the inline write path passes every byte through a
 * model). CSS: a newline after each `}` outside strings and comments.
 */
function breakCss(css) {
  let out = '', i = 0, depth = 0, line = 0
  while (i < css.length) {
    const c = css[i]
    if (c === '/' && css[i + 1] === '*') { const e = css.indexOf('*/', i + 2); const j = e === -1 ? css.length : e + 2; out += css.slice(i, j); i = j; continue }
    if (c === '"' || c === "'") {
      let j = i + 1
      while (j < css.length && css[j] !== c) j += css[j] === '\\' ? 2 : 1
      out += css.slice(i, j + 1); i = j + 1; continue
    }
    out += c
    if (c === '(' || c === '[') depth++
    else if (c === ')' || c === ']') depth--
    if (c === '}' && css[i + 1] !== '\n') { out += '\n'; line = 0 }
    // A selector list too long to read in one line: break after a depth-0 comma.
    else if (c === ',' && depth === 0 && line > 1000) { out += '\n'; line = 0 }
    else line++
    i++
  }
  return out
}

/**
 * HTML: the first whitespace after a start tag's name becomes a newline. That
 * whitespace separates attributes, so it never reaches the rendered page. Text
 * `<` is always escaped by the serializer; quotes are tracked inside tags.
 */
function breakTags(html) {
  let out = '', i = 0, raw = null
  while (i < html.length) {
    if (raw) {
      const e = html.toLowerCase().indexOf(`</${raw}`, i)
      const j = e === -1 ? html.length : e
      out += html.slice(i, j); i = j; raw = null; continue
    }
    const c = html[i]
    if (c === '<' && /[a-zA-Z]/.test(html[i + 1] || '')) {
      let j = i + 1
      while (j < html.length && /[\w-]/.test(html[j])) j++
      const name = html.slice(i + 1, j).toLowerCase()
      out += html.slice(i, j)
      if (/\s/.test(html[j] || '')) { out += '\n'; j++ }
      // Rest of the tag, honouring quoted attribute values.
      let q = null
      while (j < html.length) {
        const d = html[j]
        out += d; j++
        if (q) { if (d === q) q = null } else if (d === '"' || d === "'") q = d
        else if (d === '>') break
      }
      if (name === 'script' || name === 'style') raw = name
      i = j; continue
    }
    out += c; i++
  }
  return out
}

if (has('--css')) {
  const dir = join(ROOT, 'dist/assets')
  const file = readdirSync(dir).find((f) => /^index-.*\.css$/.test(f))
  if (!file) die('no dist/assets/index-*.css — run npm run build first')
  const css = readFileSync(join(dir, file), 'utf8')
  const rules = topLevelRules(css)
  if (rules.join('') !== css) die('rule split does not reassemble to the original stylesheet', 1)
  const chunks = []
  let cur = ''
  for (const r of rules) {
    if (Buffer.byteLength(r) > CSS_CHUNK_MAX) die(`one top-level rule is ${kb(Buffer.byteLength(r))}, over the chunk size`, 1)
    if (cur && Buffer.byteLength(cur + r) > CSS_CHUNK_MAX) { chunks.push(cur); cur = '' }
    cur += r
  }
  if (cur) chunks.push(cur)
  if (chunks.join('') !== css) die('chunks do not reassemble to the original stylesheet', 1)
  console.log(`source ${file} ${kb(Buffer.byteLength(css))} · ${rules.length} top-level rules · ${chunks.length} chunks`)
  chunks.forEach((raw, k) => {
    const name = `app-${k + 1}.css`
    const c = breakCss(raw)
    if (c.replace(/([},])\n/g, '$1') !== raw.replace(/([},])\n/g, '$1')) die(`${name}: line breaking changed more than whitespace after } or ,`, 1)
    chunks[k] = c
    writeFileSync(join(OUT, name), c)
    console.log(`  ${name}  ${Buffer.byteLength(c)} bytes  sha256 ${sha(c)}`)
  })
  writeFileSync(join(OUT, 'manifest.json'), JSON.stringify({ source: file, chunks: chunks.map((c, k) => ({ name: `app-${k + 1}.css`, bytes: Buffer.byteLength(c), sha256: sha(c) })) }, null, 1))
  process.exit(0)
}

/* ------------------------------------------------------------ browser bits */

async function reachable(url) {
  try { const r = await fetch(url); return r.ok } catch { return false }
}

async function openBrowser() {
  return chromium.launch({ channel: 'chrome', headless: HEADLESS })
}

async function newPage(browser, { width = 1280, theme = 'light' } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
  // Never log page-views from a capture.
  await ctx.route(/cloudflareinsights\.com/, (r) => r.abort())
  await ctx.addInitScript((t) => { try { localStorage.setItem('cs-theme', t) } catch {} }, theme)
  return { ctx, page: await ctx.newPage() }
}

/** Load a route and let the lazily-rendered research and Latest News settle. */
async function load(page, url, { isApp = true } = {}) {
  // The preview server stalls the odd request; one retry with a longer timeout.
  try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 }) }
  catch { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 }) }
  if (isApp) {
    await page.waitForSelector('main > *', { timeout: 30_000 })
    await page.waitForTimeout(2000)
    for (let y = 0; y < 40; y++) { await page.evaluate(() => window.scrollBy(0, 2500)); await page.waitForTimeout(60) }
    await page.waitForFunction(() => !document.querySelector('.topic-section .loading, .topic-section-pending'), null, { timeout: 30_000 }).catch(() => {})
    // Latest News fetches only once it scrolls into view (IntersectionObserver),
    // and the fast pass above skips past it: bring it into view, then wait.
    await page.evaluate(() => { const n = document.querySelector('#news'); if (n) window.scrollTo(0, n.getBoundingClientRect().top + window.scrollY - 100) })
    await page.waitForFunction(() => !document.querySelector('.news-loading'), null, { timeout: 20_000 }).catch(() => {})
    // Previews arrive in a second pass, one fetch per article: wait until the
    // count of preview lines stops changing (2 s steady, 15 s at most).
    if (await page.$('#news')) {
      let last = -1, steady = 0
      for (let t = 0; t < 30 && steady < 4; t++) {
        const n = await page.evaluate(() => document.querySelectorAll('#news .news-row-preview, #news .news-featured-preview').length)
        steady = n === last ? steady + 1 : 0
        last = n
        await page.waitForTimeout(500)
      }
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(600)
  } else {
    await page.waitForTimeout(2500)
  }
}

async function setCards(page, scopeSel, mode) {
  await page.evaluate(([sel, mode]) => {
    for (const r of document.querySelectorAll(sel)) {
      const all = [r, ...r.querySelectorAll('details')].filter((d) => d.tagName === 'DETAILS')
      for (const d of all) d.open = mode === 'open'
    }
  }, [scopeSel, mode])
  await page.waitForTimeout(500)
}

/* ------------------------------------------------------------- --screens */

if (has('--screens')) {
  const url = val('--screens')
  const name = val('--name')
  if (!url || !name) die('--screens <url> --name <n> --out <dir>')
  const isApp = url.startsWith(BASE)
  if (isApp && !(await reachable(`${BASE}/`))) die(`${BASE} is unreachable — run npm run build && npx vite preview first`)
  const area = val('--area', null)
  const cards = val('--cards', 'open')
  const TILE = 2000
  const browser = await openBrowser()
  const VARIANTS = [{ w: 1280, t: 'light' }, { w: 1280, t: 'dark' }, { w: 390, t: 'light' }]
  const want = val('--variants', '').split(',').filter(Boolean)
  for (const v of VARIANTS.filter((x) => !want.length || want.includes(`${x.w}-${x.t}`))) {
    const { ctx, page } = await newPage(browser, { width: v.w, theme: v.t })
    await load(page, url, { isApp })
    await page.evaluate((t) => { document.documentElement.dataset.theme = t }, v.t)
    await setCards(page, isApp && area ? `#topic-${area}` : 'body', cards)
    await page.waitForTimeout(400)
    const box = await page.evaluate((sel) => {
      const el = sel ? document.querySelector(sel) : document.documentElement
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: 0, y: r.top + window.scrollY, w: document.documentElement.scrollWidth, h: sel ? r.height : document.documentElement.scrollHeight }
    }, isApp && area ? `#topic-${area}` : null)
    if (!box) { console.error(`✗ ${url}: #topic-${area} not found`); await ctx.close(); continue }
    let n = 0
    for (let y = box.y; y < box.y + box.h; y += TILE) {
      // The page can change height after it was measured (late fonts, a
      // preview script), so clamp every tile to the height it has now.
      const pageH = await page.evaluate(() => document.documentElement.scrollHeight)
      const h = Math.min(TILE, box.y + box.h - y, pageH - y)
      if (h < 1) break
      n++
      const file = join(OUT, `${name}-${v.w}-${v.t}-${String(n).padStart(2, '0')}.png`)
      await page.screenshot({ path: file, fullPage: true, clip: { x: 0, y, width: box.w, height: h } })
    }
    console.log(`  ${name} ${v.w} ${v.t}: ${n} tile(s), ${Math.round(box.h)}px tall`)
    await ctx.close()
  }
  await browser.close()
  process.exit(0)
}

/* ---------------------------------------------------------------- --page */

const route = val('--page', null)
if (!route) die('one of --css, --page or --screens is required')
const NAME = val('--name', null)
if (!NAME) die('--name <file name> is required')
const AREA = val('--area', null)
const CARDS = val('--cards', AREA ? 'open' : 'closed')
const EXTRAS = (val('--extra', '') || '').split(',').filter(Boolean).map((s) => {
  const i = s.indexOf(':')
  return { slug: s.slice(0, i), id: s.slice(i + 1) }
})
const REFS = val('--refs', '')
const DROP = val('--drop', '')
const PARTS = val('--parts', 'auto')
if (!(await reachable(`${BASE}/`))) die(`${BASE} is unreachable — run npm run build && npx vite preview first`)
// The commit the served build came from. Pass --sha when HEAD has moved since
// `npm run build` (a branch commit that touched no src/ still names the wrong build).
const SHA = val('--sha', '') || execSync('git rev-parse --short HEAD', { cwd: ROOT }).toString().trim()
const DATE = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` })()

/**
 * Runs in the page. Clones the scope with its ancestor chain (so descendant
 * selectors in the app CSS still match), applies the trimming rules, and
 * returns { html, cards: [html…] | null, trimmed, embeds, brand }.
 * `cards` is set for an area capture so the caller can split at card edges.
 */
function pageCapture({ areaSel, cards, live, cardSel, drop, keepAttrs, trimRuns }) {
  const KEEP_DATA = new Set(['data-card', 'data-theme', ...keepAttrs])
  const NO_TRIM_TAGS = new Set(['TD', 'TH', 'OPTION', 'COL', 'DETAILS', 'SECTION', 'SUMMARY'])
  const INLINE = new Set(['SPAN', 'A', 'BUTTON', 'ABBR', 'EM', 'STRONG', 'CODE', 'IMG', 'B', 'I', 'SMALL', 'LABEL'])
  const absol = (u) => {
    if (!u || /^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(u)) return u
    try { return new URL(u, live + '/').href } catch { return u }
  }

  // Measure iframes on the live DOM, where they have a size.
  const frames = new Map()
  document.querySelectorAll('iframe').forEach((f, i) => {
    const r = f.getBoundingClientRect()
    f.setAttribute('data-ds-frame', String(i))
    frames.set(String(i), { w: Math.round(r.width), h: Math.round(r.height), src: f.getAttribute('src') || '' })
  })

  let scope
  let rootClone
  const root = document.getElementById('root')
  if (cardSel) {
    scope = document.getElementById(cardSel)
    if (!scope) return { error: `card #${cardSel} not found` }
    rootClone = scope.cloneNode(true)
  } else if (areaSel) {
    scope = document.querySelector(areaSel)
    if (!scope) return { error: `${areaSel} not found` }
    // Shallow clones of every ancestor up to #root, then the section in full.
    const chain = []
    for (let a = scope.parentElement; a && a !== document.body; a = a.parentElement) chain.unshift(a)
    let parent = null
    for (const a of chain) {
      const c = a.cloneNode(false)
      if (parent) parent.appendChild(c); else rootClone = c
      // The school page is a two-track grid (side rail | content). Keep an
      // EMPTY rail so the section lands in its real column at its real width;
      // the app hides the rail at phone widths, and so does this copy.
      if (a.classList.contains('dossier-layout')) {
        const rail = a.querySelector(':scope > .dossier-nav')
        if (rail) c.appendChild(rail.cloneNode(false))
      }
      parent = c
    }
    parent.appendChild(scope.cloneNode(true))
  } else {
    rootClone = root.cloneNode(true)
  }
  document.querySelectorAll('[data-ds-frame]').forEach((f) => f.removeAttribute('data-ds-frame'))

  const brandEl = scope ? scope.closest('.school-page') : document.querySelector('.school-page')
  const brand = brandEl ? brandEl.getAttribute('style') || '' : ''

  if (drop) rootClone.querySelectorAll(drop).forEach((n) => n.remove())

  // Card state.
  rootClone.querySelectorAll('details').forEach((d) => {
    if (cards === 'open') d.setAttribute('open', '')
    else {
      d.removeAttribute('open')
      // A closed card still carries its body in the DOM; a parent never sees it.
      if (d.classList.contains('note-card')) d.querySelectorAll(':scope > .note-card-body').forEach((b) => b.remove())
    }
  })
  if (cardSel && cards === 'open') rootClone.setAttribute('open', '')

  // Form state into attributes (outerHTML serializes attributes only).
  rootClone.querySelectorAll('input').forEach((i) => { if (i.checked) i.setAttribute('checked', ''); else i.removeAttribute('checked') })

  // Strip non-markup. A closed native popover (the Compare and Cup hover
  // tips) is display:none at every width and in both themes, so dropping it
  // loses nothing a screenshot can show.
  rootClone.querySelectorAll('script, noscript, template, [popover]').forEach((n) => n.remove())
  const walker = document.createTreeWalker(rootClone, NodeFilter.SHOW_COMMENT)
  const comments = []
  while (walker.nextNode()) comments.push(walker.currentNode)
  comments.forEach((c) => c.remove())

  // Iframes → labelled box of the same size.
  let embeds = 0
  rootClone.querySelectorAll('iframe').forEach((f) => {
    const m = frames.get(f.getAttribute('data-ds-frame')) || { w: 560, h: 315, src: '' }
    const host = (() => { try { return new URL(m.src, live).hostname } catch { return 'embed' } })()
    const box = document.createElement('div')
    box.className = 'ds-embed'
    box.setAttribute('style', `width:100%;max-width:${m.w || 560}px;aspect-ratio:${m.w || 16} / ${m.h || 9}`)
    box.textContent = `Embedded player (${host}) — plays in the app`
    f.replaceWith(box)
    embeds++
  })

  // Attributes.
  const all = [rootClone, ...rootClone.querySelectorAll('*')]
  for (const el of all) {
    for (const a of [...el.attributes]) {
      const n = a.name
      if ((n.startsWith('aria-') || n.startsWith('data-')) && !KEEP_DATA.has(n)) el.removeAttribute(n)
      else if (n === 'id' && /^(:|«|radix-|headlessui-)/.test(a.value)) el.removeAttribute(n)
      else if (n === 'srcset' || n === 'sizes' || n === 'tabindex' || n === 'role' || n === 'focusable' || n === 'loading') el.removeAttribute(n)
      else if (n === 'src' || n === 'href' || n === 'poster') el.setAttribute(n, absol(a.value))
    }
  }

  // Repeated sibling runs.
  let trimmed = 0
  const sig = (e) => `${e.tagName}|${e.getAttribute('class') || ''}`
  // Navigation lists and stat strips are shown whole: a topic-chip row or
  // side rail cut to six reads as a page with six areas.
  const WHOLE = 'nav, .dossier-nav, .school-header-topics, .stat-strip, .note-cards, .more-schools-grid, .school-grid, .topic-grid, .pill-row, .adm-people, .adx-rows, .news-rows'
  const trim = (el) => {
    if (el.namespaceURI === 'http://www.w3.org/2000/svg') return
    if (el.matches(WHOLE)) { [...el.children].forEach(trim); return }
    const kids = [...el.children]
    const sigs = kids.map(sig)
    // How many whole periods of length p repeat from i.
    const periods = (i, p) => {
      let n = 1
      while (i + (n + 1) * p <= kids.length) {
        let same = true
        for (let q = 0; q < p; q++) if (sigs[i + n * p + q] !== sigs[i + q]) { same = false; break }
        if (!same) break
        n++
      }
      return n
    }
    let i = 0
    while (i < kids.length) {
      // A run is one repeated sibling (p = 1) or a repeated row of up to 12
      // flat grid cells (p > 1): the College Pipeline table has no row elements.
      let best = null
      for (let p = 1; p <= 12 && i + p <= kids.length; p++) {
        const n = periods(i, p)
        if (n > 8 && (!best || n * p > best.n * best.p)) best = { p, n }
      }
      const tag = kids[i].tagName
      const trimmable = best && !NO_TRIM_TAGS.has(tag) &&
        !kids.slice(i, i + best.p).some((k) => k.classList.contains('note-card') || NO_TRIM_TAGS.has(k.tagName))
      if (trimmable) {
        const { p, n } = best
        const keep = kids.slice(i, i + 6 * p)
        const drop = kids.slice(i + 6 * p, i + n * p)
        const rows = n - 6
        let marker
        if (tag === 'TR') {
          marker = document.createElement('tr')
          const td = document.createElement('td')
          td.setAttribute('colspan', String(Math.max(1, kids[i].children.length)))
          marker.appendChild(td)
          td.textContent = `+${rows} more in the app`
        } else {
          marker = document.createElement(tag === 'LI' && p === 1 ? 'li' : INLINE.has(tag) && p === 1 ? 'span' : 'div')
          marker.textContent = `+${rows} more in the app`
          if (p > 1) marker.setAttribute('style', 'grid-column:1/-1')
        }
        marker.className = 'ds-trim'
        keep[keep.length - 1].after(marker)
        drop.forEach((d) => d.remove())
        trimmed += rows
        keep.forEach(trim)
        i += n * p
      } else {
        trim(kids[i])
        i++
      }
    }
  }
  if (trimRuns) trim(rootClone)

  // Whitespace.
  const tw = document.createTreeWalker(rootClone, NodeFilter.SHOW_TEXT)
  while (tw.nextNode()) {
    const t = tw.currentNode
    if (t.parentElement && t.parentElement.closest('pre, textarea')) continue
    t.nodeValue = t.nodeValue.replace(/\s+/g, ' ')
  }

  // Split units, each left as a token so the caller can re-pack them into
  // parts: an area's cards, or a page's research sections. A page also tokens
  // what comes before its first section (Welcome Video, Latest News) and its
  // tail (More Schools, footer), which go only in the first and last part.
  const tok = (el, t) => { const h = el.outerHTML; el.replaceWith(document.createTextNode(`@@DS${t}@@`)); return h }
  let units = null, pre = [], post = []
  if (areaSel && !cardSel) {
    const sec = rootClone.querySelector(areaSel)
    units = [...sec.querySelectorAll(':scope > .note-cards > details.note-card')].map((c, k) => tok(c, `U${k}`))
  } else if (!cardSel) {
    const secs = [...rootClone.querySelectorAll('section.topic-section')]
    if (secs.length) {
      const before = []
      for (let x = secs[0].previousElementSibling; x; x = x.previousElementSibling) before.unshift(x)
      const after = [...rootClone.querySelectorAll('.more-schools, footer.footer')]
      units = secs.map((c, k) => tok(c, `U${k}`))
      pre = before.map((c, k) => tok(c, `P${k}`))
      post = after.map((c, k) => tok(c, `Q${k}`))
    } else {
      // Compare: the matrix's row groups (the pinned header table is thead-only
      // and stays in every part).
      const groups = [...rootClone.querySelectorAll('table.compare:not(.compare-pin-table) > tbody')]
      if (groups.length > 1) units = groups.map((c, k) => tok(c, `U${k}`))
    }
  }
  return { html: rootClone.outerHTML, units, pre, post, trimmed, embeds, brand }
}

// aria-* / data-* attributes the app's CSS selects on (scroll fades, chip
// tones, active tabs, phone table labels…) are styling, not noise: keep them.
const KEEP_ATTRS = (() => {
  const css = readFileSync(join(ROOT, 'dist/assets', readdirSync(join(ROOT, 'dist/assets')).find((f) => /^index-.*\.css$/.test(f))), 'utf8')
  return [...new Set([...css.matchAll(/\[((?:data|aria)-[a-z-]+)|attr\(((?:data|aria)-[a-z-]+)/g)].map((m) => m[1] || m[2]))]
})()

const browser = await openBrowser()
const { ctx, page } = await newPage(browser, { width: 1280, theme: 'light' })
const routeUrl = `${BASE}${route.startsWith('/') ? '' : '/'}${route}`
await load(page, routeUrl)
const scopeSel = AREA ? `#topic-${AREA}` : 'body'
await setCards(page, scopeSel, CARDS)
const capArgs = { areaSel: AREA ? `#topic-${AREA}` : null, cards: CARDS, live: LIVE, cardSel: null, drop: DROP, keepAttrs: KEEP_ATTRS }
const mainFull = await page.evaluate(pageCapture, { ...capArgs, trimRuns: false })
const mainTrim = await page.evaluate(pageCapture, { ...capArgs, trimRuns: true })
if (mainFull.error) die(`${routeUrl}: ${mainFull.error}`, 1)
let main = mainFull

let extras = []
const extrasTrim = []
for (const ex of EXTRAS) {
  await load(page, `${BASE}/school/${ex.slug}/`)
  await page.evaluate((id) => { const d = document.getElementById(id); if (d) d.open = true; d?.querySelectorAll('details').forEach((x) => { x.open = true }) }, ex.id)
  await page.waitForTimeout(500)
  const school = await page.evaluate(() => document.querySelector('#school-title')?.textContent?.trim() || '')
  const exArgs = { areaSel: null, cards: 'open', live: LIVE, cardSel: ex.id, drop: '', keepAttrs: KEEP_ATTRS }
  const r = await page.evaluate(pageCapture, { ...exArgs, trimRuns: false })
  if (r.error) die(`/school/${ex.slug}/: ${r.error}`, 1)
  extras.push({ ...ex, school, ...r })
  extrasTrim.push({ ...ex, school, ...(await page.evaluate(pageCapture, { ...exArgs, trimRuns: true })) })
}
await ctx.close()
await browser.close()

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const CHROME_CSS = `.ds-capture-head{position:relative;z-index:9999;display:flex;flex-wrap:wrap;gap:6px 18px;align-items:center;padding:8px 16px;font:12px/1.45 system-ui,-apple-system,sans-serif;color:#334155;background:#f1f5f9;border-bottom:1px solid #cbd5e1}
.ds-capture-head b{color:#0f172a}
.ds-capture-head button{margin-left:auto;font:inherit;padding:3px 10px;border:1px solid #94a3b8;border-radius:4px;background:#fff;color:#0f172a;cursor:pointer}
:root[data-theme=dark] .ds-capture-head{color:#cbd5e1;background:#0f172a;border-bottom-color:#334155}
:root[data-theme=dark] .ds-capture-head b{color:#f8fafc}
:root[data-theme=dark] .ds-capture-head button{background:#1e293b;color:#f8fafc;border-color:#475569}
.ds-trim{display:block;padding:6px 10px;border:1px dashed currentColor;opacity:.6;font-style:italic;font-size:12px;list-style:none}
tr.ds-trim{display:table-row}tr.ds-trim td{padding:6px 10px;font-style:italic;opacity:.6}
span.ds-trim{display:inline-block}
.ds-embed{display:flex;align-items:center;justify-content:center;background:#e2e8f0;color:#475569;font:13px system-ui,sans-serif;border:1px dashed #94a3b8}
:root[data-theme=dark] .ds-embed{background:#1e293b;color:#94a3b8}
.ds-extra-label{margin:28px 0 8px;font:600 12px/1.4 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.04em;opacity:.7}
.app{background:var(--bg);color:var(--text)}`
// The last rule: Claude Design injects html,body{background:transparent} into
// every page it shows, which drops the app's body background and lets its dark
// editor canvas show through. The app wrapper carries the page colours instead.

const THEME_JS = `(function(){var b=document.getElementById('ds-theme');function s(){b.textContent=document.documentElement.dataset.theme==='dark'?'Light':'Dark'}b.addEventListener('click',function(){var r=document.documentElement;r.dataset.theme=r.dataset.theme==='dark'?'light':'dark';s()});s()})()`

const cssLinks = (() => {
  const n = Number(val('--css-chunks', '0'))
  if (!n) {
    // Same split as --css, counted from the build.
    const css = readFileSync(join(ROOT, 'dist/assets', readdirSync(join(ROOT, 'dist/assets')).find((f) => /^index-.*\.css$/.test(f))), 'utf8')
    let chunks = 0, cur = 0
    for (const r of topLevelRules(css)) { const b = Buffer.byteLength(r); if (cur && cur + b > CSS_CHUNK_MAX) { chunks++; cur = 0 } cur += b }
    if (cur) chunks++
    return Array.from({ length: chunks }, (_, k) => `<link rel="stylesheet" href="app-css/app-${k + 1}.css">`).join('\n')
  }
  return Array.from({ length: n }, (_, k) => `<link rel="stylesheet" href="app-css/app-${k + 1}.css">`).join('\n')
})()

// Output format. "dc" (the default) is Claude Design's editable component
// format: the page inside <x-dc>, loaded through the project's ./support.js,
// with a DCLogic script. "plain" is ordinary HTML, which the preview renders
// but the Claude Design editor treats as read-only.
const FORMAT = val('--format', 'dc')
if (!['dc', 'plain'].includes(FORMAT)) die(`--format must be dc or plain, not ${FORMAT}`)

// The Claude Design project these files live in, and the file that shows each
// research area's cards open. A school page is captured with its cards closed,
// as a parent first sees it; in the component format a click on a card header
// opens that area's file instead (--card-links, on by default for a closed-card
// school page). Names are as Claude Design stores them.
const DESIGN_PROJECT = '5da24575-40bf-4787-8934-0fadfc56059f'
const AREA_FILES = {
  'admissions': 'Admissions Section.dc.html',
  'course-offerings': 'Course Offerings Section.dc.html',
  'international-travel': 'International Travel Section Redesign.dc.html',
  'learning-support': 'Learning Support Section Redesign.dc.html',
  'read-reviews': 'Read Reviews Section.dc.html',
  'student-clubs': 'Clubs Section Redesign.dc.html',
  'the-arts': 'Arts Section Redesign.dc.html',
  'sports': 'Sports Section Redesign.dc.html',
  'college-support': 'College Support Section Redesign.dc.html',
  'high-school-placement': 'High School Placement Section Redesign.dc.html',
  'after-school': 'After School Section Redesign.dc.html',
  'summer-programs': 'Summer Programs Section.dc.html',
  'financial-aid-tuition': 'Financial Aid & Tuition.dc.html',
}
const CARD_LINKS = FORMAT === 'dc' && !AREA && CARDS === 'closed' && val('--card-links', 'on') !== 'off'

/** Wrap a plain capture in the component format, keeping its markup. */
function toComponent(src) {
  if (src.includes('{{')) die('the capture contains "{{", which the component template would treat as a hole', 1)
  const head = src.slice(src.indexOf('<head>') + 6, src.indexOf('</head>'))
  const title = (head.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || ''
  // Everything in <head> except charset, viewport and title moves into <helmet>.
  const helmet = head
    .replace(/<meta\s+charset="utf-8">\n?/, '')
    .replace(/<meta\s+name="viewport"[^>]*>\n?/, '')
    .replace(/<title>[\s\S]*?<\/title>\n?/, '')
    .trim()
  let body = src.slice(src.indexOf('<body>') + 6, src.lastIndexOf('</body>'))
  // The component runtime is React-based, and React reads an empty boolean
  // attribute (open="") as false: spell each one out so cards stay open.
  body = body.replace(/\b(open|checked|selected|disabled|hidden|multiple|readonly)=""/g, '$1="$1"')
  // The plain theme script becomes component logic; the switch becomes a handler.
  body = body.replace(/<script>\(function\(\)\{var b=document\.getElementById\('ds-theme'\)[\s\S]*?<\/script>\n?/, '')
  body = body.replace(/<button\s+id="ds-theme" type="button">Dark<\/button>/, '<button type="button" onClick="{{ toggleTheme }}">{{ themeLabel }}</button>')
  if (body.includes('ds-theme')) die('theme switch not converted', 1)
  if (CARD_LINKS) {
    // Every research card header opens its area's file, where the cards are open.
    const n = (body.match(/(<details\s[^>]*class="note-card[^"]*"[^>]*>)<summary>/g) || []).length
    body = body.replace(/(<details\s[^>]*class="note-card[^"]*"[^>]*>)<summary>/g, '$1<summary onClick="{{ openCard }}">')
    const areas = new Set([...body.matchAll(/<section\s+id="topic-([a-z-]+)"/g)].map((m) => m[1]))
    const missing = [...areas].filter((a) => !AREA_FILES[a])
    if (missing.length) die(`no section file named for area(s): ${missing.join(', ')}`, 1)
    if (!n) die('--card-links found no card headers', 1)
    const line = `  card links: ${n} card headers open their area's file (${areas.size} areas)`
    if (line !== toComponent.logged) console.log((toComponent.logged = line))
  }
  const props = { defaultTheme: { editor: 'enum', options: ['light', 'dark'], default: 'light', tsType: "'light' | 'dark'", section: 'Appearance' } }
  const logic = `class Component extends DCLogic {
  constructor(props) { super(props); this.state = { theme: null } }
  theme() { return this.state.theme || this.props.defaultTheme || 'light' }
  apply() { document.documentElement.setAttribute('data-theme', this.theme()); document.documentElement.setAttribute('lang', 'en') }
  componentDidMount() { this.apply() }
  componentDidUpdate() { this.apply() }
  renderVals() {
    const t = this.theme()
    return {
      themeLabel: t === 'dark' ? 'Light' : 'Dark',
      toggleTheme: () => this.setState({ theme: t === 'dark' ? 'light' : 'dark' }),${CARD_LINKS ? `
      openCard: (e) => {
        const sec = e.currentTarget.closest('section[id^="topic-"]')
        const file = sec && AREA_FILES[sec.id.slice(6)]
        if (!file) return
        e.preventDefault()
        const url = 'https://claude.ai/design/p/${DESIGN_PROJECT}?file=' + encodeURIComponent(file).replace(/%20/g, '+')
        try { window.top.location.href = url } catch (_) { window.open(url, '_blank', 'noopener') }
      },` : ''}
    }
  }
}${CARD_LINKS ? `
const AREA_FILES = ${JSON.stringify(AREA_FILES)}` : ''}`
  const attr = (x) => x.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  return `<!DOCTYPE html>
<html lang="en" dir="ltr" data-theme="light" data-prose="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
${helmet}
</helmet>
${body.trim()}
</x-dc>
<script type="text/x-dc" data-dc-script data-props="${attr(JSON.stringify(props))}">
${logic}
</script>
</body>
</html>
`
}

const INTERACTIVE = val('--interactive', 'filters, tabs, tooltips, the photo viewer and the podcast player')

function skeleton(title, body, { part = null, trimmed, embeds, extrasNote }) {
  const head = [
    `<b>${esc(title)}${part ? ` (${part})` : ''}</b>`,
    REFS ? `<span>Reference: ${esc(REFS)}</span>` : '',
    `<span>App commit ${esc(SHA)} · captured ${DATE} from ${esc(route)}</span>`,
    `<span>Trimmed: ${trimmed} repeated item(s)${embeds ? ` · ${embeds} embed(s) shown as boxes` : ''}</span>`,
    extrasNote ? `<span>${esc(extrasNote)}</span>` : '',
    CARD_LINKS ? `<span>Cards are shown closed, as a parent first sees the page. Click a card to open its section file, where every card is open.</span>` : '',
    `<span>Static capture: ${esc(INTERACTIVE)} are interactive in the app.</span>`,
    `<button id="ds-theme" type="button">Dark</button>`,
  ].filter(Boolean).join('')
  const plain = breakTags(`<!doctype html>
<html lang="en" dir="ltr" data-theme="light" data-prose="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}${part ? ` (${part})` : ''}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
${cssLinks}
<style>${CHROME_CSS}</style>
</head>
<body>
<div class="ds-capture-head">${head}</div>
${body}
<script>${THEME_JS}</script>
</body>
</html>
`)
  return FORMAT === 'dc' ? toComponent(plain) : plain
}

function extrasBlock(list) {
  if (!list.length) return ''
  return list.map((e) => `<section class="topic-section ds-extra" style="${esc(e.brand)}"><p class="ds-extra-label">Extra card from ${esc(e.school)} — no reference school has it</p><div class="note-cards">${e.html}</div></section>`).join('')
}

const outputs = []
// Ship a page whole when it fits in one file; trim repeated runs only in a
// file that would not (a 9 KB checklist cut to six steps hides content for no
// reason, and a cut fixed-size grid leaves holes).
{
  const untrimmed = skeleton(NAME, assemble((main.units || []).map((_, k) => k)), { part: null, trimmed: 0, embeds: 0, extrasNote: '' })
  if (Buffer.byteLength(untrimmed) > FILE_CAP) { main = mainTrim; extras = extrasTrim }
}
const trimmedTotal = main.trimmed + extras.reduce((s, e) => s + e.trimmed, 0)
const embedsTotal = main.embeds + extras.reduce((s, e) => s + e.embeds, 0)
const extrasNote = extras.length ? `Extra cards: ${extras.map((e) => `${e.id} (${e.school})`).join(', ')}` : ''

const unitWord = AREA ? 'card' : route.startsWith('/compare') ? 'row group' : 'section'

/** Rebuild the capture from the units in `idx`; chrome and extras per part. */
function assemble(idx, { first = true, last = true } = {}) {
  let html = main.html
    .replace(/@@DSU(\d+)@@/g, (_, k) => (idx.includes(Number(k)) ? main.units[Number(k)] : ''))
    .replace(/@@DSP(\d+)@@/g, (_, k) => (first ? main.pre[Number(k)] : ''))
    .replace(/@@DSQ(\d+)@@/g, (_, k) => (last ? main.post[Number(k)] : ''))
  if (last && extras.length) {
    // After the captured section, inside the same dossier-main chain.
    const i = html.lastIndexOf('</section>') + '</section>'.length
    html = html.slice(0, i) + extrasBlock(extras) + html.slice(i)
  }
  return html
}
const opts = (part) => ({ part, trimmed: trimmedTotal, embeds: embedsTotal, extrasNote })

const all = (main.units || []).map((_, k) => k)
const whole = skeleton(NAME, assemble(all), opts(null))
if (Buffer.byteLength(whole) <= FILE_CAP || PARTS === '1' || !main.units || FORMAT === 'dc') {
  outputs.push({ name: `${NAME}.dc.html`, file: whole })
} else {
  // Greedy pack at card (area) or section (page) boundaries, in page order.
  // Bytes are measured on each assembled part, never estimated.
  const groups = [[]]
  for (const k of all) {
    const g = groups[groups.length - 1]
    const trial = skeleton(NAME, assemble([...g, k], { first: groups.length === 1, last: false }), opts('9 of 9'))
    if (g.length && Buffer.byteLength(trial) > FILE_CAP) groups.push([k])
    else g.push(k)
  }
  // The last part also carries the tail and the extras; give them their own part if they do not fit.
  const lastG = groups[groups.length - 1]
  const lastTrial = skeleton(NAME, assemble(lastG, { first: groups.length === 1, last: true }), opts('9 of 9'))
  if (Buffer.byteLength(lastTrial) > FILE_CAP && lastG.length > 1) groups.push([lastG.pop()])
  groups.forEach((g, gi) => {
    const part = `${gi + 1} of ${groups.length}`
    const file = skeleton(NAME, assemble(g, { first: gi === 0, last: gi === groups.length - 1 }), opts(part))
    outputs.push({ name: `${NAME} (${part}).dc.html`, file })
  })
  console.log(`  split into ${groups.length} parts at ${unitWord} boundaries: ${groups.map((g) => g.length).join(' + ')} ${unitWord}s`)
}

let over = false
for (const o of outputs) {
  writeFileSync(join(OUT, o.name), o.file)
  const b = Buffer.byteLength(o.file)
  const limit = FORMAT === 'dc' ? ONE_FILE_PROVEN : FILE_CAP
  const flag = b > limit ? `  ⚠ over the ${kb(limit)} ${FORMAT === 'dc' ? 'largest proven write' : 'cap'}` : ''
  if (b > limit) over = true
  console.log(`  ${o.name}  ${b} bytes (${kb(b)})  sha256 ${sha(o.file)}${flag}`)
}
console.log(`  ${unitWord}s: ${main.units ? main.units.length : 'n/a'} · extras: ${extras.length} · trimmed: ${trimmedTotal} · embeds: ${embedsTotal} · commit ${SHA}`)
process.exit(over ? 1 : 0)
