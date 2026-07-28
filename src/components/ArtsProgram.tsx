// The "The Arts" research area — the expanded bodies of the five consolidated
// Arts cards on the school detail page (see data/artsProgram.ts for the data
// and the card contract).
//
// Recreates the design's "Arts Section Redesign" using the app's own tokens
// (src/index.css). Each exported *Body component is the inside of one card;
// SchoolDetail owns the <details> shell, so these render only content.
//
// Every card ends in a SOURCE row built by <SourceRow>, which linkifies any
// citation carrying a URL — the project's citation standard. Figures the
// research could not confirm wear a TO VERIFY tag rather than being dropped or
// silently guessed at.
//
// Photo slots (1a facility, 1b theatre, 1d studio) render only when a genuine
// photograph of THAT school was sourced. When `photo` is absent the figure is
// dropped and the adjacent column takes the full width, per the design handoff
// — an empty placeholder frame is never shipped.

import { useTranslation } from 'react-i18next'
import { localizeMoneyText } from '../lib/format.ts'
import { sourceLabel } from '../lib/labels.ts'
import type {
  ArtsLadder,
  ArtsPhoto,
  ArtsSource,
  ArtsStat,
  Music,
  Theatre,
  Verdict,
  VisualArts,
} from '../data/artsProgram.ts'

/* ------------------------------------------------------------ primitives -- */

/** The SOURCE row every card ends with. Citations with a URL become links. */
function SourceRow({ sources }: { sources: ArtsSource[] }) {
  const { t } = useTranslation()
  if (sources.length === 0) return null
  return (
    <div className="arts-src srcrow">
      <span className="tag-outline">{t('cardLabels.source')}</span>
      {sources.map((s) =>
        s.url ? (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer noopener">
            {s.label} ↗
          </a>
        ) : (
          <span key={s.label} className="text-muted">
            {sourceLabel(t, s.label)}
          </span>
        ),
      )}
    </div>
  )
}

/** The lead paragraph: bold headline plus muted continuation. */
function Lead({ headline, subhead }: { headline: string; subhead?: string }) {
  return (
    <p className="arts-lead">
      <strong>{headline}</strong>
      {subhead && <span className="text-muted"> {subhead}</span>}
    </p>
  )
}

/** The four-up stat strip used by 1a. */
function StatStrip({ stats }: { stats: ArtsStat[] }) {
  return (
    <div className="arts-stats hairline-grid">
      {stats.map((s) => (
        <div key={s.label} className="arts-stat">
          <div className="arts-stat-val">{localizeMoneyText(s.value)}</div>
          <div className="arts-stat-label text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

/** A section heading inside a card body. */
function Heading({ children }: { children: React.ReactNode }) {
  return <div className="arts-h">{children}</div>
}

/**
 * A card photo figure. Returns null when no photo was sourced, which is what
 * collapses the layout to a single full-width column.
 */
function Photo({ photo }: { photo?: ArtsPhoto }) {
  if (!photo) return null
  return (
    <figure className="arts-photo">
      <img src={photo.src} alt={photo.name} loading="lazy" />
      <figcaption>
        <strong>{photo.name}</strong>
        {photo.caption && <div className="text-muted">{photo.caption}</div>}
        {photo.credit && <div className="text-muted arts-credit">{photo.credit}</div>}
      </figcaption>
    </figure>
  )
}

/* ----------------------------------------------------- 1a · arts ladder -- */

export function ArtsLadderBody({ data }: { data: ArtsLadder }) {
  const { t } = useTranslation()
  return (
    <div className="arts-body">
      <Lead headline={data.headline} subhead={data.subhead} />
      <StatStrip stats={data.stats} />

      {/* The ladder — one column per division, in TK→12 order. */}
      <div
        className="arts-divisions"
        style={{ gridTemplateColumns: `repeat(${data.divisions.length}, 1fr)` }}
      >
        {data.divisions.map((d) => (
          <div key={d.name} className="arts-division">
            <div className="arts-division-head">
              {d.name}
              {d.grades && <span className="text-muted"> · {d.grades}</span>}
            </div>
            <div className="arts-division-list">
              {d.items.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Facility photo beside the enrichment layer; without a photo the
          enrichment rows take the full width. */}
      <div className={data.photo ? 'arts-figsplit' : undefined}>
        <Photo photo={data.photo} />
        <div>
          <Heading>{data.enrichmentTitle ?? t('cardLabels.enrichmentLayer')}</Heading>
          <div className="arts-enrich">
            {data.enrichment.map((e) => (
              <div key={e.label} className="arts-enrich-row">
                <strong className="arts-enrich-label">{e.label}</strong>
                <span>{e.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SourceRow sources={data.sources} />
    </div>
  )
}

/* --------------------------------------------------------- 1b · theatre -- */

export function TheatreBody({ data }: { data: Theatre }) {
  const { t } = useTranslation()
  return (
    <div className="arts-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {/* Season board beside the theatre photo; without a photo the board and
          its prose take the full width. */}
      <div className={data.photo ? 'arts-figsplit is-reverse' : undefined}>
        <div>
          <Heading>{data.seasonTitle ?? t('cardLabels.seasonRhythm')}</Heading>
          <div
            className="arts-season"
            style={{ gridTemplateColumns: `repeat(${data.season.length}, 1fr)` }}
          >
            {data.season.map((slot) => (
              <div key={slot.season} className="arts-season-slot">
                <div className="arts-season-kicker text-muted">{slot.season}</div>
                <div className="arts-season-kind">{slot.kind}</div>
                <div className="arts-season-detail">{slot.detail}</div>
              </div>
            ))}
          </div>
          {data.whoRunsIt && (
            <p className="arts-p">
              <strong className="arts-note-strong">{t('cardLabels.whoRunsIt')}</strong> {data.whoRunsIt}
            </p>
          )}
          {data.venueNote && <p className="arts-note text-muted">{data.venueNote}</p>}
        </div>
        <Photo photo={data.photo} />
      </div>

      {/* The awards ledger. Omitted entirely for a school with no awards
          history — the card still stands on its season data. */}
      {data.ledger && data.ledger.length > 0 && (
        <>
          <Heading>{data.ledgerTitle ?? t('cardLabels.awardsLedger')}</Heading>
          <div className="arts-scroll">
            <div className="arts-ledger">
              <div className="arts-th">{t('cardLabels.year')}</div>
              <div className="arts-th">{t('cardLabels.show')}</div>
              <div className="arts-th">{t('tables.result')}</div>
              {data.ledger.map((row) => (
                <LedgerRow key={`${row.year}-${row.show}`} row={row} />
              ))}
            </div>
          </div>
        </>
      )}

      {data.honestContext && (
        <p className="arts-note text-muted">
          <strong className="arts-note-strong">{t('cardLabels.honestContext')}</strong> {data.honestContext}
        </p>
      )}

      <SourceRow sources={data.sources} />
    </div>
  )
}

/** One ledger row, rendered as bare grid children so the columns line up. */
function LedgerRow({ row }: { row: Theatre['ledger'] extends (infer R)[] | undefined ? R : never }) {
  const { t } = useTranslation()
  return (
    <>
      <div className="arts-ledger-year">{row.year}</div>
      <div className="arts-ledger-show">{row.show}</div>
      <div className="arts-ledger-result">
        {row.win && <span className="arts-win">{t('cardLabels.win')}</span>}
        {row.result}
      </div>
    </>
  )
}

/* ----------------------------------------------------------- 1c · music -- */

export function MusicBody({ data }: { data: Music }) {
  const { t } = useTranslation()
  return (
    <div className="arts-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <div className="arts-split">
        <div>
          <Heading>{data.boardTitle ?? t('sections.ensembleBoard')}</Heading>
          <div className="arts-board">
            {data.tracks.map((t) => (
              <div key={t.label}>
                <div className="arts-board-label text-muted">{t.label}</div>
                <div
                  className="arts-board-row"
                  style={{
                    gridTemplateColumns:
                      t.ensembles.length === 1 ? '1fr' : 'repeat(2, 1fr)',
                  }}
                >
                  {t.ensembles.map((e) => (
                    <div key={e} className="arts-ensemble">
                      {e}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {data.boardNote && <p className="arts-note text-muted">{data.boardNote}</p>}
        </div>

        <div className="arts-panel">
          <Heading>{data.ladderTitle ?? t('cardLabels.honorsLadder')}</Heading>
          <div className="arts-rungs">
            {data.ladder.map((rung, i) => (
              <div key={rung.label} className="arts-rung">
                <span className="arts-rung-num">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <strong>{rung.label}</strong> — {rung.text}
                </span>
              </div>
            ))}
          </div>
          {data.ladderNote && <p className="arts-note text-muted">{data.ladderNote}</p>}
        </div>
      </div>

      <SourceRow sources={data.sources} />
    </div>
  )
}

/* --------------------------------------------------- 1d · studio to gallery -- */

export function VisualArtsBody({ data }: { data: VisualArts }) {
  const { t } = useTranslation()
  return (
    <div className="arts-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {/* Studio photo beside the media grid and course path; without a photo
          those take the full width. */}
      <div className={data.photo ? 'arts-figsplit' : undefined}>
        <Photo photo={data.photo} />
        <div>
          <Heading>{data.mediaTitle ?? t('cardLabels.studioMedia')}</Heading>
          <div className="arts-media">
            {data.media.map((m) => (
              <div key={m.name} className="arts-medium">
                <strong>{m.name}</strong>
                {m.detail && <div className="text-muted">{m.detail}</div>}
              </div>
            ))}
          </div>

          <Heading>{data.pathTitle ?? t('sections.coursePath')}</Heading>
          <div className="arts-path">
            {data.path.map((step, i) => (
              <span key={step.name} className="arts-path-item">
                {i > 0 && <span className="text-muted arts-path-arrow">→</span>}
                <span className={step.terminal ? 'arts-step is-terminal' : 'arts-step'}>
                  {step.name}
                </span>
              </span>
            ))}
            {data.pathNote && (
              <span className="text-muted arts-path-note">· {data.pathNote}</span>
            )}
          </div>
        </div>
      </div>

      <Heading>{data.exhibitsTitle ?? t('sections.whereWorkGoesPublic')}</Heading>
      <div
        className="arts-exhibits"
        style={{
          gridTemplateColumns: `repeat(${Math.min(data.exhibits.length, 4)}, 1fr)`,
        }}
      >
        {data.exhibits.map((x) => (
          <div key={x.name} className="arts-exhibit">
            <div className="arts-exhibit-when text-muted">{x.when}</div>
            <div className="arts-exhibit-name">{x.name}</div>
            {x.detail && <div className="arts-exhibit-detail text-muted">{x.detail}</div>}
          </div>
        ))}
      </div>

      {data.footnote && <p className="arts-note text-muted">{data.footnote}</p>}

      <SourceRow sources={data.sources} />
    </div>
  )
}

/* --------------------------------------------------------- 1e · verdict -- */

export function VerdictBody({ data }: { data: Verdict }) {
  const { t } = useTranslation()
  return (
    <div className="arts-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <div className="arts-split">
        <div>
          <Heading>{data.holdsUpTitle ?? t('sections.whyItHoldsUp')}</Heading>
          <div className="arts-checks">
            {data.holdsUp.map((h) => (
              <div key={h.label} className="arts-check">
                <span className="arts-tick" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong>{h.label}</strong> — {h.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="arts-panel">
          <Heading>
            {t('sections.askOnTour')}{' '}
            <span className="arts-h-hint text-muted">{t('sections.hintTickAsYouGo')}</span>
          </Heading>
          <div className="arts-asks">
            {data.ask.map((q) => (
              <label key={q} className="arts-ask">
                <input type="checkbox" />
                <span>{q}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <SourceRow sources={data.sources} />
    </div>
  )
}
