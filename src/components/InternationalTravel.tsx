// The "International Travel" research area — the section lead, its stat strip,
// and the expanded bodies of the seven cards (see data/internationalTravel.ts
// for the data and the card contract).
//
// Recreates the Claude Design handoff ("International Travel Section
// Redesign", Providence Day reference build) on the app's own tokens. Each
// exported *Body is the inside of one card; SchoolDetail owns the <details>
// shell. Every new class is prefixed `it-` — never `ad-`, which EasyList hides.
//
// Every card ends in a SOURCE row built by <SourceRow>, listing the specific
// pages behind that card's facts — the project's citation standard.

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { localizeMoneyText } from '../lib/format.ts'
import { assetUrl } from '../lib/asset.ts'
import { SourceRow } from './SourceRow.tsx'
import { PhotoViewer, PhotoZoomButton } from './PhotoViewer.tsx'
import { usePhotoViewer } from './usePhotoViewer.ts'
import type {
  CredentialCard,
  ExchangesCard,
  InternationalTravelCardKey,
  InternationalTravelProgram,
  NetworkCard,
  SignupCard,
  StartCard,
  TravelDivision,
  TravelLead,
  TravelPhoto,
  TravelStat,
  TripsCard,
  VerdictCard,
} from '../data/internationalTravel.ts'

/* ------------------------------------------------------------ primitives -- */

/**
 * `**bold**` → <strong>, with every segment passed through localizeMoneyText —
 * the same parser College Support and After School carry, for the same reason.
 */
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/gs)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <strong key={i}>{localizeMoneyText(part)}</strong>
          : localizeMoneyText(part),
      )}
    </>
  )
}

/** Bold lead sentence + muted follow-on, as one paragraph. */
function Lead({ lead, className = 'it-lead' }: { lead: TravelLead; className?: string }) {
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

/** A small uppercase sub-head inside a card body. */
function Heading({ children }: { children: React.ReactNode }) {
  return <div className="it-h">{children}</div>
}

/** The shared stat-tile strip, with the design's small note line. */
function StatStrip({ stats, className }: { stats: TravelStat[]; className?: string }) {
  if (stats.length === 0) return null
  return (
    <div className={`stat-strip it-stats${className ? ` ${className}` : ''}`}>
      {stats.map((s) => (
        <div key={s.label} className="stat-tile">
          {/* Isolated LTR: a figure with a leading/trailing neutral (`~19`, `B−`)
              would otherwise reorder to `19~` / `−B` inside an fa/ar tile. */}
          <div className="stat-tile-val"><bdi dir="ltr">{localizeMoneyText(s.value)}</bdi></div>
          <div className="it-stat-label">{localizeMoneyText(s.label)}</div>
          {s.note && <div className="it-stat-note text-muted"><RichText text={s.note} /></div>}
        </div>
      ))}
    </div>
  )
}

/**
 * A card photo figure. Returns null when no photo was sourced, which is what
 * lets the adjacent column take the full width — never a placeholder frame.
 */
function Photo({ photo }: { photo?: TravelPhoto }) {
  // The hook runs before the early return (rules of hooks).
  const viewer = usePhotoViewer()
  if (!photo) return null
  const src = assetUrl(photo.src)
  return (
    <figure className="it-photo">
      <PhotoZoomButton label={photo.alt} onOpen={(el) => { viewer.open(0, el) }}>
        <img src={src} alt={photo.alt} loading="lazy" />
      </PhotoZoomButton>
      <PhotoViewer
        photos={[{
          src,
          alt: photo.alt,
          title: photo.caption?.title,
          caption: photo.caption?.text,
          credit: photo.credit,
        }]}
        index={viewer.index}
        onIndexChange={viewer.setIndex}
        onClose={viewer.close}
      />
      {photo.caption && (
        <figcaption>
          <strong>{photo.caption.title}</strong>
          <div className="text-muted">{photo.caption.text}</div>
          {photo.credit && <div className="text-muted it-credit">{photo.credit}</div>}
        </figcaption>
      )}
    </figure>
  )
}

/** A label/text row — conference ledger, homestays, "Also a member of". */
function Row({ label, text, wide }: { label: string; text: string; wide?: boolean }) {
  return (
    <div className={`it-row${wide ? ' it-row-wide' : ''}`}>
      <strong className="it-row-label">{label}</strong>
      <span className="it-row-text"><RichText text={text} /></span>
    </div>
  )
}

/* ----------------------------------------------------- 1 · where they go -- */

/**
 * Marks a vertically scrolling frame with `data-fade-top` / `data-fade-bottom`
 * while rows are hidden above / below, so index.css can draw a mask fade there —
 * the vertical counterpart of useScrollEdges (which is sideways-only). Below the
 * desktop breakpoint the frame has no height cap, never overflows, and so never
 * gets either attribute. `resetKey` returns the frame to the top when the
 * division filter changes what it holds.
 */
function useVerticalFade(resetKey: string) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = 0
    const update = () => {
      const max = el.scrollHeight - el.clientHeight
      el.toggleAttribute('data-fade-top', max > 1 && el.scrollTop > 1)
      el.toggleAttribute('data-fade-bottom', max > 1 && el.scrollTop < max - 1)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [resetKey])
  return ref
}

type DivFilter = 'all' | TravelDivision

function TripsBody({ data }: { data: TripsCard }) {
  const { t } = useTranslation()
  const [div, setDiv] = useState<DivFilter>('all')

  // Tabs only when the trips span two or more divisions — for one division a
  // filter would filter nothing.
  const divs = new Set(data.years.flatMap((y) => y.trips.map((tr) => tr.div)))
  const tabs: { id: DivFilter; label: string }[] = [
    { id: 'all', label: t('travel.allDivisions') },
    ...(['LS', 'MS', 'US'] as const)
      .filter((d) => divs.has(d))
      .map((d) => ({ id: d, label: divLabel(t, d) })),
  ]
  const groups = data.years
    .map((y) => ({ ...y, trips: y.trips.filter((tr) => div === 'all' || tr.div === div) }))
    .filter((y) => y.trips.length > 0)
  const total = groups.reduce((n, y) => n + y.trips.length, 0)
  const frame = useVerticalFade(div)

  return (
    <div className="it-body">
      <Lead lead={data.intro} />
      <div className="it-split">
        <div className="it-main">
          {divs.size >= 2 && (
            <div className="it-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className="depttab"
                  data-active={div === tab.id}
                  aria-pressed={div === tab.id}
                  onClick={() => setDiv(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
              <span className="text-muted it-count">{t('travel.tripsShown', { count: total })}</span>
            </div>
          )}
          {/* On desktop the ledger scrolls inside a capped frame so the card
              stays level with the side column; the tabs and the count above
              stay put. On phones (and in print) the cap is removed and it is a
              plain list — a nested scroll box traps a thumb on a page that
              scrolls too. Focusable so keyboard users can scroll it. */}
          <div
            ref={frame}
            className="it-ledger-frame"
            tabIndex={0}
            role="region"
            aria-label={t('travel.ledgerLabel')}
          >
          <div className="it-ledger">
            {groups.map((y) => (
              <div key={y.year} className="it-year">
                <div className="it-year-head">
                  <span className="it-year-label">{y.year}</span>
                  {y.note && <span className="text-muted it-year-note">{y.note}</span>}
                  <span className="text-muted it-year-count">
                    {t('travel.tripCount', { count: y.trips.length })}
                  </span>
                </div>
                {y.trips.map((tr) => (
                  <div key={`${tr.dest}|${tr.place ?? ''}`} className="it-trip">
                    <div className="it-trip-where">
                      <div className="it-trip-dest">{tr.dest}</div>
                      {tr.place && <div className="text-muted it-trip-place">{tr.place}</div>}
                    </div>
                    <div className="it-trip-what">
                      <span className="it-trip-theme">{tr.theme}</span>
                      <div className="it-tags">
                        <span className="tag tag-neutral">
                          {divLabel(t, tr.div)}
                          {tr.group ? ` · ${tr.group}` : ''}
                        </span>
                        {tr.timing && <span className="tag tag-outline">{tr.timing}</span>}
                        {tr.homestay && (
                          <span className="tag tag-accent">
                            {t('travel.homestay', { place: tr.homestay })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          </div>
        </div>
        <div className="it-side">
          <Photo photo={data.photo} />
          {data.alsoOnRecord.length > 0 && (
            <div>
              <Heading>{t('travel.alsoOnRecord')}</Heading>
              <div className="it-list">
                {data.alsoOnRecord.map((r) => (
                  <div key={r.lead} className="it-list-item">
                    <strong>{r.lead}</strong> <RichText text={r.text} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <SourceRow sources={data.sources} className="it-src" />
    </div>
  )
}

function divLabel(t: (k: string) => string, d: TravelDivision): string {
  return d === 'LS'
    ? t('travel.lowerSchool')
    : d === 'MS'
      ? t('travel.middleSchool')
      : t('travel.upperSchool')
}

/* ------------------------------------------ 2 · when your child can start -- */

function StartBody({ data }: { data: StartCard }) {
  return (
    <div className="it-body">
      <Lead lead={data.intro} />
      {data.framework && data.framework.length > 0 && (
        <div className="it-grid it-framework">
          {data.framework.map((f) => (
            <div key={f.name} className="it-cell">
              <div className="it-framework-name">{f.name}</div>
              <div className="text-muted it-small"><RichText text={f.text} /></div>
            </div>
          ))}
        </div>
      )}
      <div className="it-grid it-ladder">
        {data.divisions.map((d) => (
          <div key={d.name} className="it-cell">
            <div className="it-ladder-head">
              {d.name} <span className="text-muted it-ladder-grades">· {d.grades}</span>
            </div>
            {d.theme && <div className="it-ladder-theme">{d.theme}</div>}
            <div className="it-ladder-items">
              {d.items.map((item) => (
                <span key={item}><RichText text={item} /></span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {data.languages && (
        <>
          <Heading>{data.languages.title}</Heading>
          <div className="it-grid it-languages">
            {data.languages.steps.map((s) => (
              <div key={s.when} className="it-cell">
                <div className="text-muted it-eyebrow">{s.when}</div>
                <div className="it-small"><RichText text={s.text} /></div>
              </div>
            ))}
          </div>
        </>
      )}
      <SourceRow sources={data.sources} className="it-src" />
    </div>
  )
}

/* ------------------------------------------------ 3 · exchanges & homestays -- */

function ExchangesBody({ data }: { data: ExchangesCard }) {
  const { t } = useTranslation()
  return (
    <div className="it-body">
      <Lead lead={data.intro} />
      <div className="it-grid it-partners">
        {data.partners.map((p) => (
          <div key={p.school} className="it-cell">
            <div className="text-muted it-eyebrow">{p.country} · {p.years}</div>
            <div className="it-partner-school">{p.school}</div>
            <div className="it-small">
              {p.out && (
                <div><strong>{t('travel.out')}</strong> {p.out}</div>
              )}
              {p.in && (
                <div><strong>{t('travel.in')}</strong> {p.in}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="it-split">
        {data.photo && (
          <div className="it-side it-side-photo">
            <Photo photo={data.photo} />
          </div>
        )}
        {(data.homestays.length > 0 || (data.visitors?.length ?? 0) > 0) && (
          <div className="it-main">
            {data.homestays.length > 0 && (
              <>
                <Heading>{t('travel.livingWithFamily')}</Heading>
                <div className="it-rows it-block">
                  {data.homestays.map((h) => (
                    <Row key={h.place} label={h.place} text={h.text} wide />
                  ))}
                </div>
              </>
            )}
            {data.visitors && data.visitors.length > 0 && (
              <>
                <Heading>{t('travel.visitorsOnCampus')}</Heading>
                <div className="it-list">
                  {data.visitors.map((v) => (
                    <p key={v} className="it-list-item it-para"><RichText text={v} /></p>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <SourceRow sources={data.sources} className="it-src" />
    </div>
  )
}

/* ------------------------------------------------------- 4 · credential -- */

function CredentialBody({ data }: { data: CredentialCard }) {
  const { t } = useTranslation()
  return (
    <div className="it-body">
      <Lead lead={data.intro} />
      <StatStrip stats={data.stats} className="it-stats-sm" />
      <div className="it-split">
        <div className="it-col">
          <Heading>{t('travel.requiredCoursework')}</Heading>
          <div className="it-list">
            {data.required.map((r) => (
              <span key={r} className="it-list-item"><RichText text={r} /></span>
            ))}
          </div>
        </div>
        <div className="it-col">
          <Heading>{t('travel.beyondClassroom')}</Heading>
          <div className="it-list">
            {data.beyond.map((b) => (
              <span key={b} className="it-list-item"><RichText text={b} /></span>
            ))}
          </div>
        </div>
      </div>
      {data.quote && (
        <blockquote className="it-quote">
          <p>{data.quote.text}</p>
          <footer className="text-muted">{data.quote.attribution}</footer>
        </blockquote>
      )}
      {data.award && <Row label={data.award.name} text={data.award.text} />}
      <SourceRow sources={data.sources} className="it-src" />
    </div>
  )
}

/* ---------------------------------------------------------- 5 · network -- */

function NetworkBody({ data }: { data: NetworkCard }) {
  return (
    <div className="it-body">
      <Lead lead={data.intro} />
      {data.conferences.length > 0 && (
        <>
          {data.ledgerTitle && <Heading>{data.ledgerTitle}</Heading>}
          <div className="it-rows it-block">
            {data.conferences.map((c) => (
              <Row key={c.year} label={c.year} text={c.text} />
            ))}
          </div>
        </>
      )}
      {data.cells.length > 0 && (
        <div className="it-grid it-cells">
          {data.cells.map((c) => (
            <div key={c.name} className="it-cell">
              <div className="it-cell-name">{c.name}</div>
              <div className="it-small"><RichText text={c.text} /></div>
            </div>
          ))}
        </div>
      )}
      <div className="it-rows">
        {data.rows.map((r) => (
          <Row key={r.label} label={r.label} text={r.text} wide />
        ))}
      </div>
      <SourceRow sources={data.sources} className="it-src" />
    </div>
  )
}

/* ------------------------------------------------------- 6 · signing up -- */

function SignupBody({ data }: { data: SignupCard }) {
  const { t } = useTranslation()
  return (
    <div className="it-body">
      <Lead lead={data.intro} />
      <div className="it-split">
        {data.groups.map((g) => (
          <div key={g.title} className="it-col">
            <div className="it-year-head">
              <span className="it-year-label">{g.title}</span>
              {g.note && <span className="text-muted it-year-note">{g.note}</span>}
            </div>
            {g.events.map((e) => (
              <div key={e.name} className="it-agenda-row">
                <span className="text-muted it-agenda-when">{e.when}</span>
                <div className="it-agenda-what">
                  <div className="it-agenda-name">{e.name}</div>
                  {e.detail && <div className="text-muted it-small">{e.detail}</div>}
                  {e.audience && (
                    <div className="it-tags it-agenda-tags">
                      <span className="tag tag-neutral">{e.audience}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {data.footnote && <p className="text-muted it-footnote">{t('travel.confirmCalendar')}</p>}
      <SourceRow sources={data.sources} className="it-src" />
    </div>
  )
}

/* --------------------------------------------- 7 · verdict & ask the school -- */

function VerdictBody({ data }: { data: VerdictCard }) {
  const { t } = useTranslation()
  return (
    <div className="it-body">
      <div className="it-split it-split-loose">
        <div className="it-col">
          <Heading>{t('travel.standsOut')}</Heading>
          <p className="it-verdict-summary"><RichText text={data.standsOut.summary} /></p>
          <div className="it-list">
            {data.standsOut.points.map((p) => (
              <div key={p} className="it-check">
                <span className="it-check-mark" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <span><RichText text={p} /></span>
              </div>
            ))}
          </div>
        </div>
        <div className="it-col">
          <Heading>
            {t('travel.askOnTour')}{' '}
            <span className="text-muted it-h-note">· {t('travel.askOnTourNote')}</span>
          </Heading>
          <div className="it-list">
            {/* Uncontrolled and unpersisted, like the College Support and Arts
                checklists — a scratch list for the tour, not saved state. */}
            {data.ask.map((q) => (
              <label key={q.topic} className="it-ask">
                <input type="checkbox" />
                <span>
                  <strong>{q.topic}</strong> <RichText text={q.question} />
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <SourceRow sources={data.sources} className="it-src" />
    </div>
  )
}

/* -------------------------------------------------- section-level pieces -- */

/** The section's lead line, rendered under the topic head by SchoolDetail. */
export function InternationalTravelLead({ program }: { program: InternationalTravelProgram }) {
  return <Lead lead={program.lead} className="it-section-lead" />
}

/**
 * The 4-tile band, from the topic's OWN data rather than VALUE_METRICS — the
 * same arrangement as AdmissionsStatBand, and for the same reason: VALUE_METRICS
 * rows would feed the Compare Key Stats the user deferred for this area.
 */
export function InternationalTravelStatBand({ program }: { program: InternationalTravelProgram }) {
  return <StatStrip stats={program.stats} />
}

/* ------------------------------------------------------------- dispatcher -- */

/** Maps a card key to its body renderer — explicit dispatch, as elsewhere. */
export function InternationalTravelCardBody({
  program,
  cardKey,
}: {
  program: InternationalTravelProgram
  cardKey: InternationalTravelCardKey
}) {
  switch (cardKey) {
    case 'trips':
      return <TripsBody data={program.trips!} />
    case 'start':
      return <StartBody data={program.start!} />
    case 'exchanges':
      return <ExchangesBody data={program.exchanges!} />
    case 'credential':
      return <CredentialBody data={program.credential!} />
    case 'network':
      return <NetworkBody data={program.network!} />
    case 'signup':
      return <SignupBody data={program.signup!} />
    case 'verdict':
      return <VerdictBody data={program.verdict!} />
  }
}
