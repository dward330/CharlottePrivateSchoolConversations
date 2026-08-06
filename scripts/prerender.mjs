#!/usr/bin/env node
/**
 * Pre-render every indexable route into a real HTML file in dist/.
 *
 * WHY THIS EXISTS. The app is a client-rendered SPA: dist/index.html is a ~2 KB
 * shell with an empty <div id="root">, so a crawler that does not run
 * JavaScript sees no schools, no prose, no titles — ~165k words of original,
 * cited research ranking for nothing. GitHub Pages has no rewrite rules, and
 * the usual `404.html` SPA fallback serves a real HTTP 404 status first, which
 * Google declines to index. Emitting an actual dist/school/cannon/index.html
 * sidesteps both: Pages serves it as a plain static file, with a 200, because
 * it is one.
 *
 * HOW. Serve the freshly-built dist/ locally, drive a headless Chromium to each
 * route, let the app mount and src/lib/head.ts write its per-page metadata,
 * then snapshot document.documentElement.outerHTML to disk. The result still
 * boots the SPA when JavaScript is available — React hydrates over the markup
 * and every subsequent navigation is instant — so this costs the reader
 * nothing and buys the crawler everything.
 *
 * Usage: node scripts/prerender.mjs [--quiet]
 * Exit codes: 0 = all routes written, 1 = a route failed a guard, 2 = setup error.
 */
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'
import { ROUTES, REPO_ROOT } from './seo_routes.mjs'

const QUIET = process.argv.includes('--quiet')
const DIST = resolve(REPO_ROOT, 'dist')

/**
 * Minimum bytes a pre-rendered page must contain to count as real content.
 *
 * This guard is the point of the exercise, not a formality. The research prose
 * lives inside collapsed <details> panels; if the snapshot were taken before
 * the app mounted, every page would ship as a well-formed empty shell that
 * *looks* fine in a directory listing and contains nothing. The unbuilt shell
 * is ~2 KB and a real school page is >100 KB, so anything in between means the
 * capture raced the render.
 */
const MIN_BYTES = 20_000

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

/**
 * Static file server over dist/, with an index.html fallback for unknown paths.
 *
 * The fallback is what makes the first pass possible: on the very first run
 * /school/cannon/ has no file yet (that is what we are generating), so the
 * request must serve the SPA shell and let the client router read the pathname.
 * Later runs overwrite the previous output, which is fine — the shell and the
 * pre-rendered file mount the same app.
 */
function serveDist(port) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost')
      let filePath = join(DIST, decodeURIComponent(url.pathname))
      if (url.pathname.endsWith('/')) filePath = join(filePath, 'index.html')
      if (!filePath.startsWith(DIST)) {
        res.writeHead(403).end('forbidden')
        return
      }
      let body
      try {
        body = await readFile(filePath)
      } catch {
        // Unknown path: serve the SPA shell so the client router can handle it.
        body = await readFile(join(DIST, 'index.html'))
        filePath = 'index.html'
      }
      res.writeHead(200, { 'content-type': MIME[extname(filePath)] ?? 'application/octet-stream' })
      res.end(body)
    } catch (err) {
      res.writeHead(500).end(String(err))
    }
  })
  return new Promise((ok, fail) => {
    server.once('error', fail)
    server.listen(port, () => ok(server))
  })
}

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('prerender: dist/index.html not found — run `vite build` first.')
    process.exit(2)
  }

  let chromium
  try {
    ;({ chromium } = await import('playwright'))
  } catch {
    console.error('prerender: playwright not installed (devDependency).')
    process.exit(2)
  }

  const port = 4183 + (process.pid % 200) // avoid clashing with a running preview
  const server = await serveDist(port)
  const origin = `http://localhost:${port}`
  const browser = await chromium.launch()
  const problems = []

  try {
    const page = await browser.newPage()
    for (const route of ROUTES) {
      // `query` (compare only) loads the page with its school selection, since
      // without it the table has no columns. The file still lands at `path` on
      // disk — a directory index — while the canonical URL written into it
      // carries the query. See the note in scripts/seo_routes.mjs.
      const url = origin + route.path + (route.query ?? '')
      await page.goto(url, { waitUntil: 'networkidle' })
      // Wait for the app to have actually rendered something, not merely for
      // the document to exist. <details> content IS in the DOM while collapsed,
      // so no expansion is needed — but the mount must have happened.
      await page.waitForFunction(
        () => (document.getElementById('root')?.innerHTML.length ?? 0) > 1000,
        null,
        { timeout: 30_000 },
      )
      // And for src/lib/head.ts to have run: its effect is what makes the page
      // metadata page-specific. A bare shell title means we snapshotted early.
      await page.waitForFunction(
        () => !!document.querySelector('link[rel="canonical"]') && document.title.length > 0,
        null,
        { timeout: 30_000 },
      )

      const html = '<!doctype html>\n' + (await page.content()).replace(/^<!DOCTYPE html>\s*/i, '')
      const bytes = Buffer.byteLength(html, 'utf8')
      const outDir = join(DIST, route.path)
      await mkdir(outDir, { recursive: true })
      await writeFile(join(outDir, 'index.html'), html, 'utf8')

      const title = await page.title()
      if (bytes < MIN_BYTES) {
        problems.push(`${route.path} — only ${bytes} bytes (expected > ${MIN_BYTES}); render raced?`)
      }
      if (!QUIET) {
        console.log(`  ${route.path.padEnd(34)} ${String(bytes).padStart(8)} B  ${title}`)
      }
    }
  } finally {
    await browser.close()
    server.close()
  }

  if (problems.length) {
    console.error('\nprerender: problems found:')
    for (const p of problems) console.error('  ✗ ' + p)
    process.exit(1)
  }
  if (!QUIET) console.log(`prerender: wrote ${ROUTES.length} pages into dist/`)
}

main().catch((err) => {
  console.error('prerender: ' + (err?.stack ?? err))
  process.exit(2)
})
