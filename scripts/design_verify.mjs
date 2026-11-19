#!/usr/bin/env node
/**
 * Byte-exact check of a file written to the Claude Design project against the
 * local capture it was written from (plan `designsync`).
 *
 * Every design-file write passes its whole content through a model's output,
 * because the write API takes inline data only. A dropped character there
 * renders fine and is invisible to a screenshot, so each write is fetched back
 * and hashed.
 *
 *   npm run design:verify -- --url '<serve_url>' --file <local file> [--path <project path>]
 *
 * --url is the short-lived serve_url from render_preview for that project
 * path. It carries a token: pass it on the command line only, never write it
 * to a file or a log. This script prints only the project path, never the URL.
 *
 * HTML pages: the preview server injects a <style>/<script data-omelette-injected>
 * run after <head>; exactly that run is removed before comparing.
 *
 * Exit 0 the bytes match · 1 they differ (prints the first differing offset
 * with a little context) · 2 bad usage or the fetch failed.
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'

const args = process.argv.slice(2)
const val = (f) => { const i = args.indexOf(f); return i === -1 ? null : args[i + 1] }
const url = val('--url')
const file = val('--file')
const label = val('--path') || (file ? basename(file) : '')
if (!url || !file) {
  console.error('usage: design_verify.mjs --url <serve_url> --file <local file> [--path <project path>]')
  process.exit(2)
}

const local = readFileSync(file)
let remote
// The preview host drops the odd connection; three tries before giving up.
for (let attempt = 1; ; attempt++) {
  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    remote = Buffer.from(await r.arrayBuffer())
    break
  } catch (e) {
    if (attempt >= 3) {
      console.error(`✗ ${label}: fetch failed after ${attempt} tries (${e.message})`)
      process.exit(2)
    }
    await new Promise((res) => setTimeout(res, 1500 * attempt))
  }
}

// The preview server injects its own <style>/<script data-omelette-injected>
// blocks (plus the blank lines after them) into every HTML page it serves; a
// CSS or text file comes back untouched. Strip exactly those blocks, and only
// when the local file cannot contain the marker, so every byte we wrote is
// still compared.
const MARK = 'data-omelette-injected'
let stripped = 0
if (/\.html?$/i.test(label) || /\.html?$/i.test(file)) {
  if (local.includes(MARK)) {
    console.error(`✗ ${label}: the local file contains "${MARK}", so the server's injection cannot be told apart from it`)
    process.exit(2)
  }
  const text = remote.toString('utf8').replace(/(?:<(style|script) data-omelette-injected[^>]*>[\s\S]*?<\/\1>)+\n*/g, () => { stripped++; return '' })
  if (text.includes(MARK)) {
    console.error(`✗ ${label}: an injected block was left after stripping; the server's format changed`)
    process.exit(2)
  }
  remote = Buffer.from(text, 'utf8')
}

const sha = (b) => createHash('sha256').update(b).digest('hex')
if (local.equals(remote)) {
  console.log(`✓ ${label}: ${local.length} bytes match · sha256 ${sha(local)}${stripped ? ` (after removing ${stripped} server-injected run)` : ''}`)
  process.exit(0)
}
let at = 0
while (at < local.length && at < remote.length && local[at] === remote[at]) at++
const show = (b) => JSON.stringify(b.subarray(Math.max(0, at - 40), at + 40).toString('utf8'))
console.error(`✗ ${label}: bytes differ — local ${local.length} B (sha256 ${sha(local)}), remote ${remote.length} B (sha256 ${sha(remote)})`)
console.error(`  first difference at byte ${at}`)
console.error(`  local : ${show(local)}`)
console.error(`  remote: ${show(remote)}`)
process.exit(1)
