// The "Faith & Spiritual Life" research area — the section lead, its stat
// strip, and the expanded bodies of the ten cards (see data/faithLife.ts for
// the data and the card contract).
//
// Built to the Claude Design file "Faith & Spiritual Life Section" (plan
// `faithlife`, Charlotte Christian first). It REUSES the Learning Support
// classes (`ls-*`) so the two areas keep one look; the only classes of its own
// are `fl-articles` (the statement-of-faith list) and `fl-h` (the small
// in-card heading). Never use an `ad-` prefix, which EasyList hides.
//
// Three display rules are load-bearing:
//  - A NOT STATED chip is ALWAYS rendered for a requirement the school's
//    public pages do not state. A blank would read as "not required".
//  - The published / not stated tally is COMPUTED from the rows, never typed.
//  - `verify` notes are research bookkeeping: dev server only.

import { useTranslation } from 'react-i18next'
import { localizeMoneyText } from '../lib/format.ts'
import { schoolInquiryMailto } from '../lib/contact.ts'
import { SHOW_TO_VERIFY } from '../lib/toVerify.ts'
import { SourceRow } from './SourceRow.tsx'
import type {
  BeliefsCard,
  ClassesCard,
  EntriesCard,
  FaithAskCard,
  FaithChip,
  FaithLead,
  FaithLifeCardKey,
  FaithLifeProgram,
  FaithNote,
  FaithStaffCard,
  FaithStat,
  FamiliesCard,
  RetreatsCard,
} from '../data/faithLife.ts'

/* ------------------------------------------------------------ primitives -- */

/** Bold lead sentence + muted follow-on, as one paragraph. */
function Lead({ lead, className }: { lead: FaithLead; className: string }) {
  return (
    <p className={className}>
      <strong>{localizeMoneyText(lead.strong)}</strong>
      {lead.muted && (
        <>
          {' '}
          <span className="text-muted">{localizeMoneyText(lead.muted)}</span>
        </>
      )}
    </p>
  )
}

/** A note paragraph: optional bold opener, plain text, muted follow-on. */
function Note({ note, strong, className = 'ls-note' }: { note: FaithNote; strong?: string; className?: string }) {
  const opener = strong ?? note.strong
  return (
    <p className={className}>
      {opener && <strong>{localizeMoneyText(opener)}</strong>}
      {opener && note.text && ' '}
      {note.text && localizeMoneyText(note.text)}
      {note.muted && (
        <>
          {(opener || note.text) && ' '}
          <span className="text-muted">{localizeMoneyText(note.muted)}</span>
        </>
      )}
    </p>
  )
}

/** A grade band as authored (isolated LTR for fa/ar), or a word chip from chrome. */
function Chip({ chip }: { chip: FaithChip }) {
  const { t } = useTranslation()
  if ('band' in chip) {
    return (
      <span className="ls-code" data-tone="on">
        <bdi dir="ltr">{chip.band}</bdi>
      </span>
    )
  }
  return (
    <span className="ls-code" data-tone={chip.word === 'all' ? 'fee' : 'on'}>
      {t(`faith.code.${chip.word}`)}
    </span>
  )
}

/** PUBLISHED / NOT STATED. */
function StatusChip({ status }: { status: 'published' | 'notStated' }) {
  const { t } = useTranslation()
  return (
    <span className="ls-code" data-tone={status === 'notStated' ? 'ns' : 'on'}>
      {t(`faith.code.${status}`)}
    </span>
  )
}

/** Research bookkeeping, shown on the dev server only (see lib/toVerify.ts). */
function VerifyNotes({ notes }: { notes?: string[] }) {
  const { t } = useTranslation()
  if (!SHOW_TO_VERIFY || !notes || notes.length === 0) return null
  return (
    <div className="ls-note text-muted">
      <span className="tag-neutral">{t('cardLabels.toVerify')}</span>
      <ul>
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  )
}

function StatStrip({ stats }: { stats: FaithStat[] }) {
  if (stats.length === 0) return null
  return (
    <div className="stat-strip ls-stats">
      {stats.map((s) => (
        <div key={s.label} className="stat-tile">
          <div className="stat-tile-val"><bdi dir="ltr">{localizeMoneyText(s.value)}</bdi></div>
          <div className="ls-stat-label">{localizeMoneyText(s.label)}</div>
          {s.note && <div className="ls-stat-note text-muted">{localizeMoneyText(s.note)}</div>}
        </div>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------- cards -- */

/** Chapel, Small Groups, Service and Parents: chip + title + text rows. */
function EntriesBody({ data }: { data: EntriesCard }) {
  return (
    <div className="ls-body">
      <div className="ls-entries">
        {data.entries.map((e) => (
          <div key={e.title} className="ls-entry">
            <Chip chip={e.chip} />
            <div className="ls-entry-main">
              <div className="ls-entry-title">{e.title}</div>
              <div className="ls-entry-text">
                {localizeMoneyText(e.text)}
                {e.muted && (
                  <>
                    {' '}
                    <span className="text-muted">{localizeMoneyText(e.muted)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {data.note && <Note note={data.note} />}
      <VerifyNotes notes={data.verify} />
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

function ClassesBody({ data }: { data: ClassesCard }) {
  const { t } = useTranslation()
  return (
    <div className="ls-body">
      {data.intro && <Note note={data.intro} className="ls-note ls-note-top" />}
      <div className="ls-groups">
        {data.groups.map((g) => (
          <div key={g.name} className="ls-group">
            <div className="ls-group-head">
              <span className="ls-group-name">{g.name}</span>
              {g.tally && <span className="text-muted ls-group-tally">{g.tally}</span>}
            </div>
            {g.rows.map((r) => (
              <div key={r.label} className="ls-row" data-match="true">
                <div className="ls-row-service">{r.label}</div>
                <div className="ls-row-code">
                  <span className="ls-code" data-tone="on">
                    {r.credit ? (
                      t('faith.code.credit', { grade: r.band, credit: r.credit })
                    ) : (
                      <bdi dir="ltr">{r.band}</bdi>
                    )}
                  </span>
                </div>
                <div className="ls-row-detail">{localizeMoneyText(r.detail)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {data.note && <Note note={data.note} />}
      <VerifyNotes notes={data.verify} />
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

function RetreatsBody({ data }: { data: RetreatsCard }) {
  return (
    <div className="ls-body">
      <div className="ls-grid ls-grid-eligibility">
        {data.cells.map((c) => (
          <div key={c.title} className="ls-cell">
            <div className="ls-cell-head">
              <span className="ls-cell-title">{c.title}</span>
            </div>
            <p className="ls-cell-text">{localizeMoneyText(c.text)}</p>
          </div>
        ))}
      </div>
      {data.note && <Note note={data.note} />}
      <VerifyNotes notes={data.verify} />
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

function BeliefsBody({ data }: { data: BeliefsCard }) {
  const { t } = useTranslation()
  return (
    <div className="ls-body">
      {data.mission && (
        <Note note={{ text: data.mission }} strong={t('faith.mission')} className="ls-note ls-note-top" />
      )}
      {data.values && data.values.length > 0 && (
        <>
          <div className="fl-h">{t('faith.coreValues')}</div>
          <div className="ls-grid ls-grid-therapy">
            {data.values.map((v) => (
              <div key={v.name} className="ls-cell ls-therapy-cell">
                <span className="ls-therapy-name">{v.name}</span>
                <span className="ls-cell-text"><bdi dir="ltr">{v.verse}</bdi></span>
              </div>
            ))}
          </div>
        </>
      )}
      {data.tenets && data.tenets.length > 0 && (
        <>
          <div className="fl-h">{t('faith.tenets')}</div>
          <ul className="fl-tenets">
            {data.tenets.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </>
      )}
      {data.outcomes && data.outcomes.length > 0 && (
        <>
          <div className="fl-h">{t('faith.outcomes')}</div>
          <div className="ls-grid ls-grid-therapy">
            {data.outcomes.map((o) => (
              <div key={o.name} className="ls-cell ls-therapy-cell">
                <span className="ls-therapy-name">{o.name}</span>
                <span className="ls-cell-text fl-outcome-text">{o.text}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {data.note && <Note note={data.note} />}
      {data.articles && data.articles.length > 0 && (
        <>
          <div className="fl-h">{t('faith.statementOfFaith')}</div>
          <ol className="fl-articles">
            {data.articles.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ol>
        </>
      )}
      <VerifyNotes notes={data.verify} />
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

function FamiliesBody({ data }: { data: FamiliesCard }) {
  const { t } = useTranslation()
  const groups = data.groups.filter((g) => g.rows.length > 0)
  return (
    <div className="ls-body">
      <div className="ls-legend">
        {(['published', 'notStated'] as const).map((s) => (
          <span key={s} className="ls-legend-item">
            <StatusChip status={s} />
            {t(`faith.legend.${s}`)}
          </span>
        ))}
      </div>
      <div className="ls-groups">
        {groups.map((g) => {
          const notStated = g.rows.filter((r) => r.status === 'notStated').length
          return (
            <div key={g.name} className="ls-group">
              <div className="ls-group-head">
                <span className="ls-group-name">{g.name}</span>
                <span className="text-muted ls-group-tally">
                  {t('faith.tally', { published: g.rows.length - notStated, notStated })}
                </span>
              </div>
              {g.rows.map((r) => (
                <div key={r.label} className="ls-row" data-match="true">
                  <div className="ls-row-service">{r.label}</div>
                  <div className="ls-row-code"><StatusChip status={r.status} /></div>
                  <div className="ls-row-detail">{localizeMoneyText(r.detail)}</div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
      {data.note && <Note note={data.note} />}
      <VerifyNotes notes={data.verify} />
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

function StaffBody({ data, schoolName }: { data: FaithStaffCard; schoolName: string }) {
  return (
    <div className="ls-body">
      <div className="ls-staff" data-email={data.people.some((p) => p.email) || undefined}>
        {data.people.map((p) => (
          <div key={p.name} className="ls-person">
            <span className="ls-person-name">{p.name}</span>
            <span className="text-muted ls-person-role">{p.role}</span>
            {p.email && (
              <a className="ls-person-email" href={schoolInquiryMailto(p.email, schoolName)}>
                <bdi dir="ltr">{p.email}</bdi>
              </a>
            )}
          </div>
        ))}
      </div>
      {data.note && <Lead lead={data.note} className="ls-note ls-note-staff" />}
      <VerifyNotes notes={data.verify} />
      <SourceRow sources={data.sources} className="ls-src" />
    </div>
  )
}

function AskBody({ data }: { data: FaithAskCard }) {
  const { t } = useTranslation()
  return (
    <div className="ls-body">
      <ol className="ls-questions">
        {data.questions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>
      <p className="text-muted ls-asof">{t('faith.asOf', { date: data.asOf })}</p>
      <VerifyNotes notes={data.verify} />
    </div>
  )
}

/* -------------------------------------------------- section-level pieces -- */

/** The section's lead line, rendered under the topic head by SchoolDetail. */
export function FaithLifeLead({ program }: { program: FaithLifeProgram }) {
  return <Lead lead={program.lead} className="ls-section-lead" />
}

/** The stat band, from the topic's OWN data (never VALUE_METRICS → Compare). */
export function FaithLifeStatBand({ program }: { program: FaithLifeProgram }) {
  return <StatStrip stats={program.stats} />
}

/* ------------------------------------------------------------- dispatcher -- */

/** Maps a card key to its body renderer — explicit dispatch, as elsewhere. */
export function FaithLifeCardBody({
  program,
  cardKey,
  schoolName,
}: {
  program: FaithLifeProgram
  cardKey: FaithLifeCardKey
  /** For the staff card's mailto subject, "<School name> Inquiry". */
  schoolName: string
}) {
  switch (cardKey) {
    case 'chapel':
      return <EntriesBody data={program.chapel!} />
    case 'classes':
      return <ClassesBody data={program.classes!} />
    case 'retreats':
      return <RetreatsBody data={program.retreats!} />
    case 'groups':
      return <EntriesBody data={program.groups!} />
    case 'beliefs':
      return <BeliefsBody data={program.beliefs!} />
    case 'families':
      return <FamiliesBody data={program.families!} />
    case 'service':
      return <EntriesBody data={program.service!} />
    case 'staff':
      return <StaffBody data={program.staff!} schoolName={schoolName} />
    case 'parents':
      return <EntriesBody data={program.parents!} />
    case 'ask':
      return <AskBody data={program.ask!} />
  }
}
