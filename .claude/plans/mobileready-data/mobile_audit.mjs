import { chromium } from '/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/node_modules/playwright/index.mjs'
import { readFileSync, writeFileSync } from 'node:fs'

const ROOT = '/Users/Derrick/Desktop/CharlottePrivateSchoolConversations'
const BASE = process.env.BASE || 'http://localhost:4319'
const LANG = process.env.LANG_CODE || 'en'
const WIDTHS = (process.env.WIDTHS || '320,360,390').split(',').map(Number)
const schools = JSON.parse(readFileSync(`${ROOT}/src/data/schools.json`, 'utf8')).schools
const only = process.env.ONLY ? process.env.ONLY.split(',') : null

const browser = await chromium.launch({ headless: true })
const findings = []

const scan = (page, vw) => page.evaluate((vw) => {
  const out = []
  const visible = (el) => {
    const s = getComputedStyle(el)
    if (s.display === 'none' || s.visibility === 'hidden') return false
    const r = el.getBoundingClientRect()
    return r.width > 1 && r.height > 1
  }
  const chain = (el) => {
    const c = []
    for (let e = el; e && c.length < 4 && !e.classList?.contains('topic-section'); e = e.parentElement) {
      if (typeof e.className === 'string' && e.className) c.push(`${e.tagName.toLowerCase()}.${e.className.split(' ')[0]}`)
      else c.push(e.tagName.toLowerCase())
    }
    return c.join(' < ')
  }
  const cardOf = (el) => {
    const nc = el.closest('.note-card')
    if (nc) {
      const t = nc.querySelector(':scope > summary .topic-title') || nc.querySelector('.topic-title')
      // nested note-card? climb to the outermost one within the section
      let outer = nc
      while (outer.parentElement?.closest('.note-card')) outer = outer.parentElement.closest('.note-card')
      const ot = outer.querySelector(':scope > summary .topic-title') || t
      return (ot?.textContent || '(untitled card)').trim()
    }
    for (const [sel, name] of [['.stat-strip', '[section stat strip]'], ['.adm-stat-band', '[admissions stat band]'], ['.podcast', '[podcast strip]'], ['.news', '[Latest News]'], ['.welcome', '[welcome video]'], ['.topic-section-head', '[section header]']]) {
      if (el.closest(sel)) return name
    }
    for (let e = el; e && !e.classList.contains('topic-section'); e = e.parentElement) {
      if (e.parentElement?.classList.contains('topic-section')) return `[${e.className.split(' ')[0] || e.tagName.toLowerCase()}]`
    }
    return '[section]'
  }
  const clipAnc = (el) => {
    for (let a = el.parentElement; a; a = a.parentElement) {
      const s = getComputedStyle(a)
      if (s.overflowX !== 'visible') return { a, mode: s.overflowX }
      if (a === document.documentElement) break
    }
    return null
  }
  for (const sec of document.querySelectorAll('.topic-section')) {
    const area = sec.querySelector('h2')?.textContent.trim() || sec.id
    const seenScroll = new Set()
    for (const el of sec.querySelectorAll('*')) {
      if (!visible(el)) continue
      const s = getComputedStyle(el)
      // (1) inner horizontal scroll containers / clipped boxes
      if (s.overflowX === 'auto' || s.overflowX === 'scroll') {
        if (el.scrollWidth > el.clientWidth + 2 && !seenScroll.has(el)) {
          seenScroll.add(el)
          out.push({ area, card: cardOf(el), kind: 'inner-scroll', px: el.scrollWidth - el.clientWidth, where: chain(el), w: el.clientWidth, sw: el.scrollWidth })
        }
      } else if ((s.overflowX === 'hidden' || s.overflowX === 'clip') && el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 4 && (el.textContent || '').trim()) {
        out.push({ area, card: cardOf(el), kind: 'clipped', px: el.scrollWidth - el.clientWidth, where: chain(el), text: el.textContent.trim().slice(0, 60) })
      }
      // (2) elements extending beyond the viewport with no clipping ancestor short of the page
      const r = el.getBoundingClientRect()
      if (r.right > vw + 1 || r.left < -1) {
        const ca = clipAnc(el)
        const pageLevel = !ca || ca.a === document.documentElement || ca.a === document.body
        if (pageLevel) {
          // only report the outermost offender
          const p = el.parentElement.getBoundingClientRect()
          if (p.right <= vw + 1 && p.left >= -1) {
            out.push({ area, card: cardOf(el), kind: 'page-overflow', px: Math.round(Math.max(r.right - vw, -r.left)), where: chain(el), text: (el.textContent || '').trim().slice(0, 60) })
          }
        }
      }
    }
    // (3) text nodes overrunning their own block (long unbreakable tokens)
    const w = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT)
    for (let n; (n = w.nextNode());) {
      if (!n.nodeValue.trim() || !n.parentElement || !visible(n.parentElement)) continue
      const range = document.createRange(); range.selectNodeContents(n)
      const r = range.getBoundingClientRect()
      if (r.right > vw + 1) {
        const ca = clipAnc(n.parentElement)
        if (ca && (ca.mode === 'auto' || ca.mode === 'scroll') && ca.a !== document.documentElement && ca.a !== document.body) continue // already counted as inner-scroll
        out.push({ area, card: cardOf(n.parentElement), kind: ca && ca.a !== document.documentElement && ca.a !== document.body ? 'clipped-text' : 'text-overflow', px: Math.round(r.right - vw), where: chain(n.parentElement), text: n.nodeValue.trim().slice(0, 60) })
      }
    }
  }
  return { out, docOverflow: document.documentElement.scrollWidth - vw }
}, vw)

for (const vw of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  for (const s of schools) {
    if (only && !only.includes(s.slug)) continue
    await page.goto(`${BASE}/school/${s.slug}/?lang=${LANG}`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(2500)
    if (process.env.GRIDFIX) await page.addStyleTag({ content: '@media (max-width: 900px){.note-cards{grid-template-columns:minmax(0,1fr)!important}} .note-card{min-width:0}' })
    for (let y = 0; y < 40; y++) { await page.evaluate(() => window.scrollBy(0, 2500)); await page.waitForTimeout(60) }
    await page.waitForTimeout(800)
    const openAll = () => page.evaluate(() => document.querySelectorAll('details').forEach((d) => { d.open = true }))
    await openAll(); await page.waitForTimeout(400)
    const collect = async (tag) => {
      const { out, docOverflow } = await scan(page, vw)
      for (const f of out) findings.push({ vw, school: s.name, slug: s.slug, tab: tag, ...f })
      if (docOverflow > 0) findings.push({ vw, school: s.name, slug: s.slug, tab: tag, area: '(page)', card: '(document)', kind: 'doc-overflow', px: docOverflow })
    }
    await collect('')
    const n = await page.locator('.adm-band').count()
    for (let i = 1; i < n; i++) {
      await page.locator('.adm-band').nth(i).click().catch(() => {})
      await page.waitForTimeout(250); await openAll()
      await collect(`band${i}`)
    }
    console.error(`${vw} ${s.slug} done (${findings.length})`)
  }
  await ctx.close()
}
await browser.close()
writeFileSync(process.env.OUT || 'mobile_findings.json', JSON.stringify(findings, null, 1))
console.log(findings.length)
