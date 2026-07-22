import { parseProse, type ProseBlock, type HeadingTone } from '../lib/prose.ts'

// Renders one distilled research note as structured content: a lede, section headings,
// bulleted lists, "at a glance" quick-fact panels, tinted callouts for strengths /
// caveats, and clickable source chips — instead of one undifferentiated block of text.

type Section = { heading?: { text: string; tone: HeadingTone }; blocks: ProseBlock[] }

function group(blocks: ProseBlock[]): { lede: ProseBlock[]; sections: Section[] } {
  const lede: ProseBlock[] = []
  const sections: Section[] = []
  let current: Section | null = null
  for (const b of blocks) {
    if (b.kind === 'heading') {
      current = { heading: { text: b.text, tone: b.tone }, blocks: [] }
      sections.push(current)
    } else if (current) {
      current.blocks.push(b)
    } else {
      lede.push(b)
    }
  }
  return { lede, sections }
}

function Cites({ cites }: { cites: string[] }) {
  if (!cites.length) return null
  return (
    <p className="cite">
      <span className="cite-label">Source</span> {cites.join(' · ')}
    </p>
  )
}

function Blocks({ blocks }: { blocks: ProseBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'scope':
            return <p key={i} className="scope">{b.text}</p>
          case 'para':
            return (
              <div key={i}>
                {b.text && <p className="para">{b.text}</p>}
                <Cites cites={b.cites} />
              </div>
            )
          case 'list':
            return (
              <div key={i}>
                <ul className="prose-list">
                  {b.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
                <Cites cites={b.cites} />
              </div>
            )
          case 'facts':
            return <div key={i} className="facts">{b.lines.join('\n')}</div>
          case 'sources':
            return (
              <div key={i} className="source-chips">
                {b.items.map((s, j) => (
                  <a key={j} className="source-chip" href={s.url} target="_blank" rel="noreferrer">
                    <span className="source-chip-label">{s.label}</span>
                    <span className="source-chip-host">{hostOf(s.url)} ↗</span>
                  </a>
                ))}
              </div>
            )
          default:
            return null
        }
      })}
    </>
  )
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'link'
  }
}

export function ProseContent({ text, title }: { text: string; title?: string }) {
  const { lede, sections } = group(parseProse(text, title))
  return (
    <div className="prose-doc">
      {lede.length > 0 && <div className="prose-lede"><Blocks blocks={lede} /></div>}
      {sections.map((s, i) => {
        const tone = s.heading?.tone ?? 'default'
        if (tone === 'glance') {
          return (
            <section key={i} className="callout glance">
              <h4 className="callout-title">At a glance</h4>
              <Blocks blocks={s.blocks} />
            </section>
          )
        }
        if (tone === 'good' || tone === 'caution') {
          return (
            <section key={i} className={`callout ${tone}`}>
              {s.heading && <h4 className="callout-title">{s.heading.text}</h4>}
              <Blocks blocks={s.blocks} />
            </section>
          )
        }
        return (
          <section key={i} className="prose-section">
            {s.heading && <h4 className="section-h">{s.heading.text}</h4>}
            <Blocks blocks={s.blocks} />
          </section>
        )
      })}
    </div>
  )
}
