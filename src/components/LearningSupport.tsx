// The "Learning Support & Student Services" research area — the section lead,
// its stat strip, and the expanded bodies of the six cards (see
// data/learningSupport.ts for the data and the card contract).
//
// Recreates the Claude Design handoff ("Learning Support Section Redesign",
// Hickory Grove Christian reference build) on the app's own tokens. Each *Body
// is the inside of one card; SchoolDetail owns the <details> shell. Every new
// class is prefixed `ls-` — never `ad-`, which EasyList hides.
//
// Two display rules are load-bearing:
//  - A NOT STATED chip is ALWAYS rendered for an unpublished service. A blank
//    reads as "not offered", which the research does not support.
//  - EXCLUDED rows never render in the matrix; the exclusion is shown once, in
//    the eligibility card's "Outside scope" cell.

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { localizeMoneyText } from '../lib/format.ts'
import { SourceRow } from './SourceRow.tsx'
import {
  LEARNING_NEEDS,
  type AskCard,
  type EligibilityCard,
  type LearningCode,
  type LearningLead,
  type LearningNeed,
  type LearningStat,
  type LearningSupportCardKey,
  type LearningSupportProgram,
  type ServicesCard,
  type StaffCard,
  type TestingCard,
  type TherapyCard,
} from '../data/learningSupport.ts'

/* ------------------------------------------------------------ primitives -- */

const GLOSSARY = new Set(['504', 'iep', 'idea'])

/**
 * `**bold**` → <strong>, and `[[504|Section 504 Plan]]` → an <abbr> carrying
 * the plain-language definition from `learning.glossary.<term>`. Every text
 * segment passes through localizeMoneyText, as in the other structured areas.
 */
function RichText({ text }: { text: string }) {
  const { t } = useTranslation()
  const parts = text.split(/(\*\*.+?\*\*|\[\[[a-z0-9]+\|.+?\]\])/gs)
  return (
    <>
      {parts.map((part, i) => {
        const bold = /^\*\*(.+)\*\*$/s.exec(part)
        if (bold) return <strong key={i}>{localizeMoneyText(bold[1])}</strong>
        const term = /^\[\[([a-z0-9]+)\|(.+)\]\]$/s.exec(part)
        if (term && GLOSSARY.has(term[1])) {
          return (
            <abbr key={i} className="ls-abbr" title={t(`learning.glossary.${term[1]}`)}>
              {term[2]}
            </abbr>
          )
        }
        return localizeMoneyText(term ? term[2] : part)
      })}
    </>
  )
}

/** Bold lead sentence + muted follow-on, as one paragraph. */
function Lead({ lead, className = 'ls-lead' }: { lead: LearningLead; className?: string }) {
  return (
    <p className={className}>
      <strong><RichText text={lead.strong} /></strong>
      {lead.muted && (
        <>
          {' '}
          <span className="text-muted"><RichText text={lead.muted} /></span>
        </>
      )}
    </p>
  )
}

/** The chip a delivery code renders as. Tone drives the CSS. */
function CodeChip({ code }: { code: LearningCode }) {
  const { t } = useTranslation()
  const tone =
    code === 'NS' ? 'ns' : code === 'IH_FEE' ? 'fee' : code === 'RF' || code === 'EXCLUDED' ? 'ref' : 'on'
  return (
    <span className="ls-code" data-tone={tone}>
      {t(`learning.code.${code}`)}
    </span>
  )
}

function StatStrip({ stats }: { stats: LearningStat[] }) {
  if (stats.length === 0) return null
  return (
    <div className="stat-strip ls-stats">
      {stats.map((s) => (
        <div key={s.label} className="stat-tile">
          {/* Isolated LTR, as in International Travel: `$300+` / `K5–12` would
              otherwise reorder inside an fa/ar tile. */}
          <div className="stat-tile-val"><bdi dir="ltr">{localizeMoneyText(s.value)}</bdi></div>
          <div className="ls-stat-label">{localizeMoneyText(s.label)}</div>
          {s.note && <div className="ls-stat-note text-muted"><RichText text={s.note} /></div>}
        </div>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------- icons -- */

const svg = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}
const CheckIcon = () => <svg {...svg}><path d="M20 6 9 17l-5-5" /></svg>
const FileIcon = () => (
  <svg {...svg}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
)
const BanIcon = () => (
  <svg {...svg}>
    <circle cx="12" cy="12" r="10" />
    <path d="m4.9 4.9 14.2 14.2" />
  </svg>
)

/* ----------------------------------------------------------------- cards -- */

function EligibilityBody({ data }: { data: EligibilityCard }) {
  const { t } = useTranslation()
  const cells = [
    { key: 'eligible', icon: <CheckIcon />, text: data.eligible },
    { key: 'plan', icon: <FileIcon />, text: data.plan },
    { key: 'scope', icon: <BanIcon />, text: data.scope },
  ] as const
  return (
    <div className="ls-body">
      {data.intro && <Lead lead={data.intro} />}
      <div className="ls-grid ls-grid-eligibility">
        {cells.map((c) => (
          <div key={c.key} className="ls-cell">
            <div className="ls-cell-head">
              <span className="ls-icon">{c.icon}</span>
              <span className="ls-cell-title">{t(`learning.${c.key}`)}</span>
            </div>
            <p className="ls-cell-text"><RichText text={c.text} /></p>
          </div>
        ))}
      </div>
      {data.note && <p className="text-muted ls-note"><RichText text={data.note} /></p>}
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

type NeedFilter = 'all' | LearningNeed

function ServicesBody({ data }: { data: ServicesCard }) {
  const { t } = useTranslation()
  const [need, setNeed] = useState<NeedFilter>('all')
  const verdict = need === 'all' ? undefined : data.verdicts[need]

  // EXCLUDED rows are never shown — the exclusion lives in the eligibility
  // card. A group left with no rows is dropped (the zero-items rule).
  const groups = data.groups
    .map((g) => ({ ...g, rows: g.rows.filter((r) => r.code !== 'EXCLUDED') }))
    .filter((g) => g.rows.length > 0)

  const legend: LearningCode[] = ['IH', 'IH_FEE', 'RF', 'NS']

  return (
    <div className="ls-body">
      <div className="ls-h">{t('learning.needPrompt')}</div>
      <div className="ls-tabs" role="group" aria-label={t('learning.needFilterLabel')}>
        {(['all', ...LEARNING_NEEDS] as NeedFilter[]).map((id) => (
          <button
            key={id}
            type="button"
            className="depttab"
            data-active={need === id}
            aria-pressed={need === id}
            onClick={() => setNeed(id)}
          >
            {t(`learning.need.${id}`)}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {verdict && (
          <div className="ls-verdict">
            <div className="ls-verdict-head"><RichText text={verdict.head} /></div>
            <div className="ls-verdict-body"><RichText text={verdict.body} /></div>
          </div>
        )}
      </div>
      <div className="ls-legend">
        {legend.map((c) => (
          <span key={c} className="ls-legend-item">
            <CodeChip code={c} />
            {t(`learning.legend.${c}`)}
          </span>
        ))}
      </div>
      <div className="ls-groups">
        {groups.map((g) => {
          const notStated = g.rows.filter((r) => r.code === 'NS').length
          return (
            <div key={g.name} className="ls-group">
              <div className="ls-group-head">
                <span className="ls-group-name">{g.name}</span>
                <span className="text-muted ls-group-tally">
                  {t('learning.tally', { published: g.rows.length - notStated, notStated })}
                </span>
              </div>
              {g.rows.map((r) => {
                const match = need === 'all' || r.needs.includes(need)
                return (
                  <div key={r.service} className="ls-row" data-match={match}>
                    <div className="ls-row-service">{r.service}</div>
                    <div className="ls-row-code"><CodeChip code={r.code} /></div>
                    <div className="ls-row-detail"><RichText text={r.detail} /></div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

function TherapyBody({ data }: { data: TherapyCard }) {
  const { t } = useTranslation()
  return (
    <div className="ls-body">
      <p className="text-muted ls-note ls-note-top">
        <RichText text={t('learning.relatedServicesNote')} />
      </p>
      <div className="ls-grid ls-grid-therapy">
        {data.items.map((it) => (
          <div key={it.name} className="ls-cell ls-therapy-cell">
            <span className="ls-therapy-name">{it.name}</span>
            <span><CodeChip code={it.code} /></span>
            {it.detail && <span className="ls-cell-text"><RichText text={it.detail} /></span>}
          </div>
        ))}
      </div>
      {data.note && <p className="ls-note"><RichText text={data.note} /></p>}
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

function TestingBody({ data }: { data: TestingCard }) {
  return (
    <div className="ls-body">
      <div className="ls-entries">
        {data.entries.map((e) => (
          <div key={e.title} className="ls-entry">
            <CodeChip code={e.code} />
            <div className="ls-entry-main">
              <div className="ls-entry-title">{e.title}</div>
              <div className="ls-entry-text">
                <RichText text={e.text} />
                {e.muted && (
                  <>
                    {' '}
                    <span className="text-muted"><RichText text={e.muted} /></span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

function StaffBody({ data }: { data: StaffCard }) {
  return (
    <div className="ls-body">
      <div className="ls-staff">
        {data.people.map((p) => (
          <div key={p.name} className="ls-person">
            <span className="ls-person-name">{p.name}</span>
            <span className="text-muted ls-person-role">{p.role}</span>
          </div>
        ))}
      </div>
      {data.note && <Lead lead={data.note} className="ls-note ls-note-staff" />}
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

function AskBody({ data }: { data: AskCard }) {
  const { t } = useTranslation()
  return (
    <div className="ls-body">
      <ol className="ls-questions">
        {data.questions.map((q) => (
          <li key={q}><RichText text={q} /></li>
        ))}
      </ol>
      <p className="text-muted ls-asof">{t('learning.asOf', { date: data.asOf })}</p>
    </div>
  )
}

/* -------------------------------------------------- section-level pieces -- */

/** The section's lead line, rendered under the topic head by SchoolDetail. */
export function LearningSupportLead({ program }: { program: LearningSupportProgram }) {
  return <Lead lead={program.lead} className="ls-section-lead" />
}

/** The stat band, from the topic's OWN data (never VALUE_METRICS → Compare). */
export function LearningSupportStatBand({ program }: { program: LearningSupportProgram }) {
  return <StatStrip stats={program.stats} />
}

/* ------------------------------------------------------------- dispatcher -- */

/** Maps a card key to its body renderer — explicit dispatch, as elsewhere. */
export function LearningSupportCardBody({
  program,
  cardKey,
}: {
  program: LearningSupportProgram
  cardKey: LearningSupportCardKey
}) {
  switch (cardKey) {
    case 'eligibility':
      return <EligibilityBody data={program.eligibility!} />
    case 'services':
      return <ServicesBody data={program.services!} />
    case 'therapy':
      return <TherapyBody data={program.therapy!} />
    case 'testing':
      return <TestingBody data={program.testing!} />
    case 'staff':
      return <StaffBody data={program.staff!} />
    case 'ask':
      return <AskBody data={program.ask!} />
  }
}
