import { readFileSync, readdirSync } from 'node:fs'
const R = '/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/'
// Use the REAL resolver, aliases included — this is what the card renders.
const { rankLabelFor } = await import(R+'src/data/collegeRankings.ts')
const files = readdirSync(R+'src/data/collegeSupportPrograms')
  .filter(f=>f.endsWith('.ts') && !/\.(es|bn|ht|te|fr|fa|it|hi|ar)\.ts$/.test(f))
const rows=[]
for (const f of files) {
  const src = readFileSync(R+'src/data/collegeSupportPrograms/'+f,'utf8')
  for (const m of src.matchAll(/\{\s*name:\s*'((?:[^'\\]|\\.)*)'\s*,\s*cats:\s*\[([^\]]*)\]/g)) {
    const name=m[1].replace(/\\'/g,"'")
    rows.push({f:f.replace('.ts',''),name,cats:[...m[2].matchAll(/'([^']+)'/g)].map(x=>x[1]),lab:rankLabelFor(name)})
  }
}
const num=l=>{const m=l&&l.match(/#(\d+)/);return m?+m[1]:null}
const kind=l=>!l?null:l.startsWith('National')?'nu':l.startsWith('Liberal')?'lac':null
const q=(r,b)=>{const k=kind(r.lab),n=num(r.lab);if(!k||!n)return false;
  return b==='nu75'?(k==='nu'&&n<=75):(k==='lac'&&n<=75)}
let over=0,under=0,unres=0
const O=new Map(),U=new Map(),X=new Map()
for(const r of rows){
  if(!r.lab && (r.cats.includes('nu75')||r.cats.includes('lac75'))){
    unres++; X.set(r.name,(X.get(r.name)||0)+1)
  }
  for(const b of ['nu75','lac75']){
    const has=r.cats.includes(b), ok=q(r,b)
    if(has&&!ok&&r.lab){over++;const k=`${b} | ${r.name} | ${r.lab}`;O.set(k,(O.get(k)||0)+1)}
    if(!has&&ok){under++;const k=`${b} | ${r.name} | ${r.lab}`;U.set(k,(U.get(k)||0)+1)}
  }
}
console.log(`entries=${rows.length} schools=${files.length}`)
console.log(`\nOVER-INCLUSION (tagged, resolves, but does NOT qualify): ${over} tags / ${O.size} college-bucket pairs`)
;[...O].sort((a,b)=>b[1]-a[1]).forEach(([k,c])=>console.log(`  ${String(c).padStart(2)}x  ${k}`))
console.log(`\nUNRESOLVED NAME while tagged (check:ranks should already catch): ${unres} tags / ${X.size} names`)
;[...X].sort((a,b)=>b[1]-a[1]).forEach(([k,c])=>console.log(`  ${String(c).padStart(2)}x  ${k}`))
console.log(`\nUNDER-INCLUSION (qualifies by rank, NOT tagged): ${under} tags / ${U.size} pairs`)
;[...U].sort((a,b)=>b[1]-a[1]).slice(0,12).forEach(([k,c])=>console.log(`  ${String(c).padStart(2)}x  ${k}`))
console.log(`  … ${Math.max(0,U.size-12)} more pairs`)
