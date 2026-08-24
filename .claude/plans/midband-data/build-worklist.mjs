import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { TRIAGE } from './triage.mjs'
const WORK='src/data/overlays/work'
const LANGS=['es','bn','ht','te','fr','fa','it','hi','ar']
const load=(f)=>{const p=join(WORK,f); if(!existsSync(p))return null; const r=JSON.parse(readFileSync(p,'utf8')); return r.strings??r.sections??[]}
const topicsFor=(L)=>[...new Set(readdirSync(WORK).filter(f=>f.endsWith(`.${L}.json`)).map(f=>f.replace(new RegExp(`\\.${L}\\.json$`),'')))]

// Convention classes decided in Phase 1 (see NOTES.md). A string in one of these
// is a LEAK wherever a translatable WORD remains; pure digits/clock/date tokens
// with no word are a KEEP by construction.
const MONTHS=/\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\b/
const WORDS=/\b(am|pm|a\.m\.|p\.m\.|Gr|Grade|Grades|Kindergarten|Rising|Week|Weeks|Session|Sessions|Before|After|Early|Lunch|Afternoon|Care|day|days|week|min|mo|yr|hour|lesson|Mon|Tue|Wed|Thu|Fri|and|or|to)\b/i
// A grade word followed by a SUBJECT noun is a course title, not a grade tag —
// verified: no locale translates any of the ten such strings (nine-locale
// consensus KEEP). Excluding them is what keeps the convention rule honest.
const COURSE_TITLE=/\b(Grade|Kindergarten)\b.*\b(History|Math|Mathematics|Bible|Seminar|Science|English|Literature|Studies|Health|Art|Music|Reading|Writing|Spanish|French|Latin|Algebra|Geometry|Physics|Chemistry|Biology|Pre-Algebra)\b/i
const conventionLeak = (en) => !COURSE_TITLE.test(en) && (MONTHS.test(en) || WORDS.test(en))

const out=[]   // {lang, topic, idx, en, verdict, why}
const stats={LEAK:0,KEEP:0}
const seenKey=new Set()
for(const L of LANGS){
  for(const topic of topicsFor(L)){
    const mine=load(`${topic}.${L}.json`); if(!mine)continue
    mine.forEach((s,idx)=>{
      const en=s.text??'', t=s.t??''
      if(!en||!t||t!==en) return
      let verdict=null, why=null, src=null
      if(en in TRIAGE){
        const r=TRIAGE[en]
        if(r.langs && !r.langs.includes(L)) return
        verdict=r.v; why=r.why; src='sibling-triage'
      } else return
      const key=`${L}|${topic}|${idx}`
      if(seenKey.has(key))return; seenKey.add(key)
      out.push({lang:L,topic,idx,en,verdict,why,src})
      stats[verdict]++
    })
  }
}
// Convention-class worklist from the mid-band (grade/time, money/unit, dates)
const conv=[]
for(const L of LANGS){
  for(const topic of topicsFor(L)){
    const mine=load(`${topic}.${L}.json`); if(!mine)continue
    mine.forEach((s,idx)=>{
      const en=s.text??'', t=s.t??''
      if(!en||!t||t!==en) return
      if(en in TRIAGE) return
      if(en.length<8) return
      if(!/[a-z]/.test(en)) return
      const isGT=/(^|[\s·|(])(TK|Gr|Grades?|PK|JK|JrK|Kindergarten|Rising|Week|Session)\b/i.test(en)||/[0-9]{1,2}:[0-9]{2}/.test(en)
      const isMU=/\$/.test(en)
      const isDate=MONTHS.test(en)
      if(!isGT&&!isMU&&!isDate) return
      if(!conventionLeak(en)) return
      conv.push({lang:L,topic,idx,en,verdict:'LEAK',why:'Convention class — a translatable word remains (grade word, am/pm, month, or unit); digits and clock/date tokens stay char-for-char.',src:'convention'})
    })
  }
}
const all=[...out,...conv]
const leaks=all.filter(r=>r.verdict==='LEAK')
console.log('sibling-triage rows:',out.length,JSON.stringify(stats))
console.log('convention rows:',conv.length)
console.log('TOTAL LEAK edits:',leaks.length)
const byLang={}; for(const r of leaks) byLang[r.lang]=(byLang[r.lang]||0)+1
console.log('per-locale edits:',JSON.stringify(byLang))
console.log('distinct leak strings:',new Set(leaks.map(r=>r.en)).size)
writeFileSync('.claude/plans/midband-data/worklist.json',JSON.stringify({
  generated:'2026-08-23',
  note:'Phase 2 worklist. Each row is a (lang, topic, index) edit in src/data/overlays/work/<topic>.<lang>.json. verdict LEAK = translate; KEEP rows are the ledger.',
  keeps: all.filter(r=>r.verdict==='KEEP'),
  leaks,
},null,1))
console.log('written')
