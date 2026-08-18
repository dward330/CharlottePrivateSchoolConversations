import type { ReactNode } from 'react'
import { parseProse, headingEchoesTitle, type ProseBlock, type HeadingTone } from '../lib/prose.ts'
import { useTranslation } from 'react-i18next'

// Bare URLs in the distilled notes are stored as plain text (no markdown link
// syntax). Turn them into real anchors while leaving the surrounding prose intact.
// Trailing sentence punctuation and a single closing bracket/paren/backtick are
// kept out of the href so "…111500448.html." or "(https://…)" link cleanly.
const URL_RE = /(https?:\/\/[^\s]+)/g
const TRAILING = /[.,;:!?)\]}>"'`]+$/

// The research notes are distilled from markdown source material, so they carry
// **bold** spans inline — including inside table cells, which is where they are
// most visible. Without this the asterisks render as literal text ("**100% of
// tuition**"). Applied to every text-bearing slot via linkify(), so paragraphs,
// list items, headings and table cells all agree.
const BOLD_RE = /\*\*([^*]+)\*\*/g

/** Render `**bold**` spans inside an already-plain string segment. */
function emphasize(text: string, keyBase: string): ReactNode {
  if (!text.includes('**')) return text
  const parts = text.split(BOLD_RE)
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    // split() with one capture group alternates: plain, captured, plain, …
    i % 2 === 1 ? <strong key={`${keyBase}-b${i}`}>{part}</strong> : part,
  )
}

function linkify(text: string): ReactNode {
  const parts = text.split(URL_RE)
  if (parts.length === 1) return emphasize(text, 'e')
  return parts.map((part, i) => {
    if (i % 2 === 0) return emphasize(part, `e${i}`) // plain-text segment
    const trailer = part.match(TRAILING)?.[0] ?? ''
    const href = trailer ? part.slice(0, -trailer.length) : part
    return (
      <span key={i}>
        <a className="prose-link" href={href} target="_blank" rel="noreferrer noopener">
          {href}
        </a>
        {trailer}
      </span>
    )
  })
}

// Renders one distilled research note as structured content: a lede, section headings,
// bulleted lists, "at a glance" quick-fact panels, tinted callouts for strengths /
// caveats, and clickable source chips — instead of one undifferentiated block of text.

type Section = { heading?: { text: string; tone: HeadingTone }; blocks: ProseBlock[] }

function group(blocks: ProseBlock[], title?: string): { lede: ProseBlock[]; sections: Section[] } {
  const lede: ProseBlock[] = []
  const sections: Section[] = []
  let current: Section | null = null
  for (const b of blocks) {
    if (b.kind === 'heading') {
      // A leading heading that just repeats the card's title (e.g. "Executive
      // Summary" inside the Executive Summary card) is dropped, so its content
      // reads directly under the card header.
      if (sections.length === 0 && headingEchoesTitle(b.text, title)) {
        current = null
        continue
      }
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
  const { t } = useTranslation()
  if (!cites.length) return null
  return (
    <p className="cite">
      <span className="cite-label">{t('tables.source')}</span>{' '}
      {cites.map((c, i) => (
        <span key={i}>
          {i > 0 && ' · '}
          {linkify(c)}
        </span>
      ))}
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
                {b.text && <p className="para">{linkify(b.text)}</p>}
                <Cites cites={b.cites} />
              </div>
            )
          case 'list':
            return (
              <div key={i}>
                <ul className="prose-list">
                  {b.items.map((it, j) => <li key={j}>{linkify(it)}</li>)}
                </ul>
                <Cites cites={b.cites} />
              </div>
            )
          case 'facts':
            return <div key={i} className="facts">{b.lines.join('\n')}</div>
          case 'table':
            return (
              <div key={i} className="prose-table-wrap">
                <table className="prose-table">
                  <thead>
                    {/* scope= is what lets a screen reader announce "Tuition,
                        $28,500" instead of reading a bare number: col headers
                        label their column, and the first cell of each row (below)
                        labels its row. */}
                    <tr>{b.header.map((h, j) => <th key={j} scope="col">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (k === 0 ? <th key={k} scope="row">{linkify(cell)}</th> : <td key={k}>{linkify(cell)}</td>))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
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

export function ProseContent({
  text,
  title,
  topic,
}: {
  text: string
  title?: string
  /** Topic slug — lets the parser scope its research-gap filtering (see prose.ts). */
  topic?: string
}) {
  const { t } = useTranslation()
  const { lede, sections } = group(parseProse(text, title, topic), title)
  return (
    <div className="prose-doc">
      {lede.length > 0 && <div className="prose-lede"><Blocks blocks={lede} /></div>}
      {sections.map((s, i) => {
        const tone = s.heading?.tone ?? 'default'
        if (tone === 'glance') {
          return (
            <section key={i} className="callout glance">
              <h4 className="callout-title">{t('tables.atAGlance')}</h4>
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
