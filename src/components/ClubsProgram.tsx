// The "Student Clubs" research area — the expanded bodies of the three
// redesigned cards on the school detail page (see data/clubsProgram.ts for the
// data and the card contract).
//
// Recreates the design's "Clubs Section Redesign" using the app's own tokens
// (src/index.css). Each exported *Body component is the inside of one card;
// SchoolDetail owns the <details> shell, so these render only content.
//
// Every card ends in a SOURCE row built by <SourceRow>, which linkifies any
// citation carrying a URL — the project's citation standard. The 1b programs
// additionally carry their OWN per-column source, because the design cites each
// signature program separately rather than pooling them in the footer.
//
// The honesty flags (COUNT FLAG / GAP / INDIVIDUAL — NOT A CLUB) render only
// where a school's research actually surfaced them; a school whose sources agree
// simply has no flag in its data, and nothing is drawn. See the FlagKind docs.

import { useTranslation } from 'react-i18next'
import { localizeMoneyText } from '../lib/format.ts'
import type {
  Affinity,
  ClubsFlag,
  ClubsSource,
  FlagKind,
  Honors,
  Service,
} from '../data/clubsProgram.ts'

/* ------------------------------------------------------------ primitives -- */

/** The SOURCE row every card ends with. Citations with a URL become links. */
function SourceRow({ sources }: { sources: ClubsSource[] }) {
  if (sources.length === 0) return null
  return (
    <div className="clubs-src srcrow">
      <span className="tag-outline">SOURCE</span>
      {sources.map((s) =>
        s.url ? (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer noopener">
            {s.label} ↗
          </a>
        ) : (
          <span key={s.label} className="text-muted">
            {s.label}
          </span>
        ),
      )}
    </div>
  )
}

/** Default chip wording per flag kind; `label` overrides it per flag. */
const FLAG_LABEL: Record<FlagKind, string> = {
  count: 'COUNT FLAG',
  gap: 'GAP',
  'not-a-club': 'INDIVIDUAL — NOT A CLUB',
}

/**
 * An honesty flag: a tag chip plus its explanation. Rendered only from data a
 * school actually has — never synthesized to fill the slot.
 *
 * GAP and COUNT flags are deliberately NOT rendered. Both describe the state of
 * the evidence — what a school fails to publish, or where its own pages
 * disagree on a number — which reads as research bookkeeping rather than
 * something a parent can act on. They stay in the data: every one is sourced in
 * the per-school files and in source-material/, so the research is preserved and
 * can be surfaced again by relaxing this filter. Only INDIVIDUAL — NOT A CLUB
 * still renders, because it corrects how a reader would otherwise MISCOUNT what
 * is on the card — a program or an individual activity read as a club.
 */
function Flags({ flags }: { flags: ClubsFlag[] }) {
  const shown = flags.filter((f) => f.kind === 'not-a-club')
  if (shown.length === 0) return null
  return (
    <>
      {shown.map((f, i) => (
        <div key={i} className="clubs-flag">
          <span className="tag-neutral clubs-flag-tag">
            {f.label ?? FLAG_LABEL[f.kind]}
          </span>
          <span className="text-muted">{f.text}</span>
        </div>
      ))}
    </>
  )
}

/** The lead paragraph: bold headline plus muted continuation. */
function Lead({ headline, subhead }: { headline: string; subhead?: string }) {
  return (
    <p className="clubs-lead">
      <strong>{headline}</strong>
      {subhead && <span className="text-muted"> {subhead}</span>}
    </p>
  )
}

/** A section heading inside a card body. */
function Heading({ children }: { children: React.ReactNode }) {
  return <div className="clubs-h">{children}</div>
}

/* ------------------------------------------- 1a · affinity & identity ----- */

export function AffinityBody({ data }: { data: Affinity }) {
  const { t } = useTranslation()
  return (
    <div className="clubs-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {/* The umbrella band — the org that coordinates everything beneath it. */}
      {data.umbrella && (
        <div className="clubs-umbrella">
          <span className="clubs-umbrella-name">{data.umbrella.name}</span>
          {data.umbrella.detail && (
            <span className="clubs-umbrella-detail">{data.umbrella.detail}</span>
          )}
        </div>
      )}

      {/* The enumerated roster as grid cells. A school that confirms groups
          exist but never names them has an empty roster — the card then leans on
          its strips and gap flag instead of drawing an empty grid. */}
      {data.groups.length > 0 && (
        <div
          className={`clubs-roster${data.umbrella ? ' is-under-umbrella' : ''}`}
        >
          {data.groups.map((g) => (
            <div key={g.name} className="clubs-group">
              <strong className="clubs-group-name">{g.name}</strong>
              {g.detail && <div className="text-muted clubs-group-detail">{g.detail}</div>}
            </div>
          ))}
        </div>
      )}

      <Flags flags={data.flags} />

      {/* Division and parent-group strips beneath the roster. */}
      {data.strips.length > 0 && (
        <div
          className="clubs-strips"
          style={{
            gridTemplateColumns: `repeat(${Math.min(data.strips.length, 3)}, 1fr)`,
          }}
        >
          {data.strips.map((s) => (
            <div key={s.title} className="clubs-strip">
              <div className="clubs-strip-head">
                {s.title}
                {s.hint && <span className="text-muted"> {s.hint}</span>}
              </div>
              <div className="clubs-strip-text">{s.text}</div>
            </div>
          ))}
        </div>
      )}

      {/* The leadership arm — a label/text row, per the design. */}
      {data.leadership && (
        <div className="clubs-leadership">
          <strong className="clubs-leadership-label">
            {data.leadershipTitle ?? t('sections.leadershipArm')}
          </strong>
          <span>{data.leadership}</span>
        </div>
      )}

      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------------- 1b · service & civic --------- */

export function ServiceBody({ data }: { data: Service }) {
  const { t } = useTranslation()
  return (
    <div className="clubs-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {/* Signature programs as scale-led columns: the figure leads, because
          scale and longevity are what separate a real commitment from a
          sign-up sheet. Each column carries its own source. */}
      <div
        className="clubs-programs"
        style={{ gridTemplateColumns: `repeat(${data.programs.length}, 1fr)` }}
      >
        {data.programs.map((p) => (
          <div key={p.name} className="clubs-program">
            <div className="clubs-program-val">{localizeMoneyText(p.value)}</div>
            <div className="clubs-program-vallabel text-muted">{p.valueLabel}</div>
            <div className="clubs-program-name">{p.name}</div>
            <p className="clubs-program-detail">{p.detail}</p>
            {p.source && (
              <div className="clubs-program-src text-muted">
                <span className="tag-outline clubs-src-tag">SOURCE</span>{' '}
                {p.source.url ? (
                  <a href={p.source.url} target="_blank" rel="noreferrer noopener">
                    {p.source.label} ↗
                  </a>
                ) : (
                  p.source.label
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {data.footnote && (
        <div className="clubs-footnote">
          <Heading>{data.footnoteTitle ?? t('sections.beyondBigThree')}</Heading>
          <p className="clubs-p">{data.footnote}</p>
        </div>
      )}

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------------- 1c · honor societies --------- */

export function HonorsBody({ data }: { data: Honors }) {
  const { t } = useTranslation()
  return (
    <div className="clubs-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {/* The recognition ledger. Wrapped in a scroller so the columns keep
          their widths on narrow screens rather than crushing. */}
      <div className="clubs-ledger-wrap">
        <table className="clubs-ledger">
          <thead>
            <tr>
              <th className="clubs-th clubs-th-society">Society</th>
              <th className="clubs-th clubs-th-div">Division</th>
              <th className="clubs-th">What it recognizes</th>
              <th className="clubs-th clubs-th-feeds">Feeds from</th>
            </tr>
          </thead>
          <tbody>
            {data.societies.map((s) => (
              <tr key={s.name}>
                <td className="clubs-td clubs-td-name">{s.name}</td>
                <td className="clubs-td text-muted">{s.division}</td>
                <td className="clubs-td">{s.recognizes}</td>
                <td className="clubs-td text-muted">{s.feedsFrom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recognition that is NOT a society — named prizes, graduation
          distinctions, GPA lists. Kept visibly separate so the ledger above
          stays honest about what is and isn't a chapter. */}
      {data.adjacent && data.adjacent.length > 0 && (
        <div className="clubs-adjacent">
          <Heading>{data.adjacentTitle ?? t('sections.notASociety')}</Heading>
          {data.adjacent.map((a) => (
            <div key={a.label} className="clubs-adjacent-row">
              <strong className="clubs-adjacent-label">{a.label}</strong>
              <span>{a.text}</span>
            </div>
          ))}
        </div>
      )}

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}
