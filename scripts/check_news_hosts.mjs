/**
 * Assert that every domain a school DECLARES it publishes on is also a host the
 * CORS Worker is willing to fetch.
 *
 * WHY THIS EXISTS. `alsoAllowedHosts` in `src/lib/news/sources.ts` keeps a row
 * whose link is on one of the school's other domains (Charlotte Latin's
 * athletics site, `clshawks.com`). But the preview/date pass then fetches that
 * article THROUGH the Worker, which allow-lists hosts independently. Declare the
 * host in one file and forget the other and the row still renders — with no
 * preview, no date, and no error anywhere. It reads as a parser bug on one row,
 * which is the single most expensive thing to chase in this feature.
 *
 * Both directions are checked, and they are NOT the same finding:
 *
 *  - A declared host missing from ALLOWED_HOSTS is a BUILD FAILURE (exit 1). It
 *    ships a visibly broken row.
 *  - A Worker host that no school declares is only REPORTED (exit 0). Every
 *    school's own board host is legitimately there without appearing in
 *    `alsoAllowedHosts`, so this direction is informational — it exists to catch
 *    a host left behind after a school is removed.
 *
 * Deliberately parses both files as TEXT rather than importing them: sources.ts
 * pulls in every parser (and `import.meta.glob` transitively), and worker.js is
 * a Cloudflare module that does not run under plain Node.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCES = path.join(ROOT, 'src/lib/news/sources.ts')
const WORKER = path.join(ROOT, 'workers/news-proxy/worker.js')

const strip = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1')

function fail(msg) {
  console.error(`✘ check:news — ${msg}`)
  process.exit(1)
}

const srcText = fs.readFileSync(SOURCES, 'utf8')
const workerText = fs.readFileSync(WORKER, 'utf8')

/* ---- 1. hosts the Worker will fetch ---- */
const workerBody = strip(workerText)
const allowedBlock = workerBody.match(/const\s+ALLOWED_HOSTS\s*=\s*\[([\s\S]*?)\]/)
if (!allowedBlock) fail('could not find ALLOWED_HOSTS in worker.js')
const allowed = new Set(
  [...allowedBlock[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1].toLowerCase()),
)
if (!allowed.size) fail('ALLOWED_HOSTS parsed as empty — the format changed')

/* ---- 2. what each school declares ---- */
const srcBody = strip(srcText)

// Board/index hosts are implicitly allowed and must be listed too.
const boardHosts = new Set()
for (const m of srcBody.matchAll(/(?:boardUrl|indexUrl)\s*:\s*['"]([^'"]+)['"]/g)) {
  try {
    boardHosts.add(new URL(m[1]).hostname.toLowerCase())
  } catch {
    fail(`unparseable board/index URL: ${m[1]}`)
  }
}
for (const m of srcBody.matchAll(/extraBoardUrls\s*:\s*\[([\s\S]*?)\]/g)) {
  for (const u of m[1].matchAll(/['"]([^'"]+)['"]/g)) {
    try {
      boardHosts.add(new URL(u[1]).hostname.toLowerCase())
    } catch {
      fail(`unparseable extraBoardUrls entry: ${u[1]}`)
    }
  }
}

// Declared extra publishing domains, attributed to their school for the message.
const declared = new Map()
for (const m of srcBody.matchAll(
  /['"]?([a-z0-9-]+)['"]?\s*:\s*\{([\s\S]*?)\n\s{2}\},/g,
)) {
  const [, slug, body] = m
  const also = body.match(/alsoAllowedHosts\s*:\s*\[([\s\S]*?)\]/)
  if (!also) continue
  for (const h of also[1].matchAll(/['"]([^'"]+)['"]/g)) {
    declared.set(h[1].toLowerCase(), slug)
  }
}

/* ---- 3. the gate ---- */
const missing = []
for (const [host, slug] of declared) {
  // A declared host is reachable if it, or its www/apex twin, is allow-listed.
  const twin = host.startsWith('www.') ? host.slice(4) : `www.${host}`
  if (!allowed.has(host) && !allowed.has(twin)) missing.push({ host, slug })
}
for (const host of boardHosts) {
  if (!allowed.has(host)) missing.push({ host, slug: '(board URL)' })
}

if (missing.length) {
  console.error('✘ check:news — hosts used by the app but NOT fetchable by the Worker:\n')
  for (const { host, slug } of missing) {
    console.error(`    ${host}  — declared by ${slug}`)
  }
  console.error(
    '\n  Those rows would render with no preview and no date, and nothing would\n' +
      '  report an error. Add each host to ALLOWED_HOSTS in\n' +
      '  workers/news-proxy/worker.js, then REDEPLOY the Worker:\n\n' +
      '    cd workers/news-proxy && CLOUDFLARE_API_TOKEN=… npx wrangler deploy\n',
  )
  process.exit(1)
}

/* ---- 4. informational: allow-listed but unused ---- */
const used = new Set([...declared.keys(), ...boardHosts])
const orphans = [...allowed].filter((h) => {
  const twin = h.startsWith('www.') ? h.slice(4) : `www.${h}`
  return !used.has(h) && !used.has(twin)
})

console.log(
  `✓ check:news — ${declared.size} declared host(s) + ${boardHosts.size} board host(s) all fetchable`,
)
for (const [host, slug] of declared) console.log(`    ${slug} also publishes on ${host}`)
if (orphans.length) {
  console.log(`\n  note: ${orphans.length} allow-listed host(s) no school currently uses:`)
  for (const h of orphans) console.log(`    ${h}`)
  console.log('  (harmless, but worth removing if a school was dropped)')
}
