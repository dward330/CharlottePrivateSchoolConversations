// The "Summer Programs" research area — the expanded bodies of the two cards on
// the school detail page (see data/summerPrograms.ts for the data and the card
// contract).
//
// Recreates the design's Summer Programs section using the app's own tokens
// (src/index.css). Each exported *Body component is the inside of one card;
// SchoolDetail owns the <details> shell, so these render only content.
//
// Both cards are interactive, which is the point of the section:
//
//  - The Camp Catalog is a slate you *narrow*. A published summer catalog runs
//    to dozens of camps across every category and grade; filtering it by
//    category, day and grade band — and searching name + description with the
//    matched characters highlighted in place — is how a parent gets from "60
//    camps" to "the four my rising 3rd grader can do in July".
//  - The Cost Planner answers the question the rate sheet never does. "$450 a
//    week" is not a summer; eight weeks of it plus after care is, and the panel
//    does that arithmetic.
//
// The visual vocabulary is deliberately the After School area's `as-*` classes
// rather than a parallel set: these are the same blueprint frames, filter chips,
// estimate panel and source row, and duplicating the CSS would let the two
// sections drift apart visually for no gain. Only the genuinely new pieces (the
// photo band, the add-on toggles) carry `su-*` classes of their own.
//
// Every card ends in a SOURCE row built by <SourceRow>, which linkifies any
// citation carrying a URL — the project's citation standard.

import { useMemo, useState } from 'react'
import { money, localizeMoneyText } from '../lib/format.ts'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { sourceLabel } from '../lib/labels.ts'
import type {
  Camp,
  CampCatalog,
  CostPlanner,
  SuFlag,
  SuFlagKind,
  SuSource,
  SummerCardKey,
  SummerPhoto,
  SummerProgram,
} from '../data/summerPrograms.ts'

/* ------------------------------------------------------------ primitives -- */

/** The SOURCE row every card ends with. Citations with a URL become links. */
function SourceRow({ sources }: { sources: SuSource[] }) {
  const { t } = useTranslation()
  if (sources.length === 0) return null
  return (
    <div className="as-src srcrow">
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

/**
 * Weekday code -> localized label.
 *
 * `day` is CHROME: a closed five-value vocabulary (Mon…Fri) identical for every
 * school, which is why the prose extractor skips it. Reuses the `afterSchool.*`
 * keys rather than duplicating five identical strings under a second namespace —
 * the words are the same words. Anything outside the set, notably the '—' used
 * when a school publishes no day, falls through unchanged.
 */
function dayLabel(t: TFunction, day: string): string {
  return t(`afterSchool.day_${day}`, { defaultValue: day })
}

/**
 * Locale key for the default chip wording per flag kind; `label` overrides it
 * per flag. Shares the After School keys for the same reason as `dayLabel`: one
 * fixed word per kind, identical across both areas.
 */
const FLAG_LABEL_KEY: Record<SuFlagKind, string> = {
  verify: 'afterSchool.flag_verify',
  estimate: 'afterSchool.flag_estimate',
  gap: 'afterSchool.flag_gap',
  stale: 'afterSchool.flag_stale',
}

/**
 * Evidence qualifiers: TO VERIFY / EST. / PUBLICATION GAP / STALE.
 *
 * All of these render. In this area the qualifier IS parent-facing content:
 * "this school does not publish its camp rates" is decision-relevant on its own,
 * and summer pricing is published far less consistently than tuition.
 */
function Flags({ flags }: { flags: SuFlag[] }) {
  const { t } = useTranslation()
  if (flags.length === 0) return null
  return (
    <>
      {flags.map((f) => (
        <p key={f.text} className="as-flag text-muted">
          <span className="as-flag-tag tag-neutral">
            {f.label ?? t(FLAG_LABEL_KEY[f.kind])}
          </span>
          <span>
            <RichText text={f.text} />
          </span>
        </p>
      ))}
    </>
  )
}

function Lead({ headline, subhead }: { headline: string; subhead?: string }) {
  return (
    <p className="as-lead">
      <strong>{headline}</strong>
      {subhead && <span className="text-muted"> {subhead}</span>}
    </p>
  )
}

/**
 * Render `**bold**` spans inside otherwise plain data strings, localizing money
 * in every segment.
 *
 * Same contract as After School and College Support: prose here carries baked
 * figures ("$450 a week") exactly as the sibling `price` fields do, and those
 * already localize. Without localizeMoneyText on both segments the same figure
 * renders two ways on one page.
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

/**
 * Highlight every occurrence of `q` inside `text`.
 *
 * The design highlights matched characters in place rather than just filtering
 * the list, so a parent searching "robot" can see *why* a row matched when the
 * hit is in the description rather than the camp name. Returns nodes, not HTML.
 */
function highlight(text: string, q: string): React.ReactNode {
  if (!q) return text
  const lower = text.toLowerCase()
  const ql = q.toLowerCase()
  const parts: React.ReactNode[] = []
  let i = 0
  let idx = lower.indexOf(ql, i)
  while (idx !== -1) {
    if (idx > i) parts.push(text.slice(i, idx))
    parts.push(
      <mark key={idx} className="as-mark">
        {text.slice(idx, idx + q.length)}
      </mark>,
    )
    i = idx + q.length
    idx = lower.indexOf(ql, i)
  }
  if (parts.length === 0) return text
  if (i < text.length) parts.push(text.slice(i))
  return parts
}

/* ------------------------------------------------------- the photo band -- */

/**
 * The section's duotone photo band, rendered above the cards by SchoolDetail.
 *
 * Renders NOTHING when a school has no sourced photographs. That is deliberate
 * and load-bearing: a placeholder frame would imply the research saw a facility
 * it never saw. `loading="lazy"` because the band sits below the fold on every
 * page it appears on.
 */
export function SummerPhotoBand({ photos }: { photos: SummerPhoto[] }) {
  if (photos.length === 0) return null
  return (
    <div className="su-photos">
      {photos.map((p) => (
        <figure key={p.src} className="su-photo">
          <img src={p.src} alt={p.alt} loading="lazy" />
          <figcaption className="text-muted">{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

/* -------------------------------------------------------- the camp catalog -- */

/**
 * The filterable, searchable camp catalog.
 *
 * Three filter axes rather than After School's two, because a summer slate is
 * genuinely three-dimensional: a parent knows the child's grade, usually knows
 * the category they want, and sometimes has a day constraint. Each axis is
 * hidden entirely when the school publishes nothing to filter on — a school that
 * never says which days its camps meet gets no day chips rather than a row of
 * chips that match everything.
 */
export function CampCatalogBody({ data }: { data: CampCatalog }) {
  const { t } = useTranslation()
  const [category, setCategory] = useState('All')
  const [day, setDay] = useState('All')
  const [grade, setGrade] = useState('All')
  const [query, setQuery] = useState('')

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.camps.filter((c: Camp) => {
      const catOk = category === 'All' || c.category === category
      const dayOk = day === 'All' || c.days.includes(day)
      const gradeOk = grade === 'All' || c.grades.includes(grade)
      const qOk =
        q === '' ||
        c.name.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q)
      return catOk && dayOk && gradeOk && qOk
    })
  }, [data.camps, category, day, grade, query])

  const q = query.trim()

  return (
    <div className="as-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {/* Where the catalog is a sample rather than the whole slate, this is the
          sentence that says so. A truncated list must never read as complete. */}
      {data.intro && (
        <p className="as-note text-muted">
          <RichText text={data.intro} />
        </p>
      )}

      {data.categoryFilters.length > 0 && (
        <div className="as-filters">
          {data.categoryFilters.map((c) => (
            <button
              key={c.token}
              type="button"
              className={`as-filter${category === c.token ? ' is-active' : ''}`}
              onClick={() => setCategory(c.token)}
              aria-pressed={category === c.token}
            >
              {/* 'All' is the filter's sentinel value, not a category name —
                  only the LABEL is translated, so comparisons keep working. */}
              {c.token === 'All' ? t('summerPrograms.categoryFilterAll') : c.label}
            </button>
          ))}
        </div>
      )}

      {data.gradeFilters.length > 0 && (
        <div className="as-filters">
          <span className="as-filters-label text-muted">{t('tables.grade')}</span>
          {data.gradeFilters.map((g) => (
            <button
              key={g.token}
              type="button"
              className={`as-filter${grade === g.token ? ' is-active' : ''}`}
              onClick={() => setGrade(g.token)}
              aria-pressed={grade === g.token}
            >
              {g.token === 'All' ? t('summerPrograms.gradeFilterAll') : g.label}
            </button>
          ))}
        </div>
      )}

      {data.dayFilters.length > 0 && (
        <div className="as-filters">
          <span className="as-filters-label text-muted">{t('cardLabels.day')}</span>
          {data.dayFilters.map((d) => (
            <button
              key={d}
              type="button"
              className={`as-filter${day === d ? ' is-active' : ''}`}
              onClick={() => setDay(d)}
              aria-pressed={day === d}
            >
              {d === 'All' ? t('summerPrograms.dayFilterAll') : dayLabel(t, d)}
            </button>
          ))}
        </div>
      )}

      <input
        type="text"
        className="as-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('summerPrograms.searchPlaceholder')}
        aria-label={t('summerPrograms.searchAria')}
      />

      <div className="as-count text-muted">
        {t('summerPrograms.campCount', { shown: shown.length, total: data.camps.length })}
      </div>

      <div className="as-scroll">
        <table className="as-table as-catalog su-catalog">
          <thead>
            <tr>
              <th scope="col" className="as-th">{t('summerPrograms.colCamp')}</th>
              <th scope="col" className="as-th">{t('summerPrograms.colWhen')}</th>
              <th scope="col" className="as-th">{t('tables.grades')}</th>
              <th scope="col" className="as-th as-th-fee">{t('summerPrograms.colPrice')}</th>
            </tr>
          </thead>
          <tbody>
            {/* Keyed by name + price + hours, NOT by name alone: a school can
                list the same camp twice with different terms (Providence Day's
                "Camp Spirit" runs at $450 in a four-day session and $550 in a
                five-day one). A bare name key made those collide, and React
                silently rendered one row's content under the other's identity —
                so a filtered list showed the wrong camps. Found in the browser;
                no source-level check could see it. */}
            {shown.map((c) => (
              <tr key={`${c.name}|${c.price}|${c.hours}`}>
                <td className="as-td">
                  <strong className="as-class-name">{highlight(c.name, q)}</strong>
                  <span className="su-cat-tag tag-neutral">{c.categoryLabel}</span>
                  <br />
                  <span className="text-muted as-class-desc">
                    {highlight(c.desc, q)}
                  </span>
                </td>
                {/* Days, hours and weeks are one column: they are read together
                    ("Mon–Fri, 9 a.m.–3 p.m., Weeks 1–4") and splitting them into
                    three columns crushed the camp name on a phone. */}
                <td className="as-td su-td-when">
                  <span>{c.dayLabel}</span>
                  <br />
                  <span className="text-muted">{c.hours}</span>
                  {c.weeks && (
                    <>
                      <br />
                      <span className="text-muted">{c.weeks}</span>
                    </>
                  )}
                </td>
                <td className="as-td">{c.gradeLabel}</td>
                <td className="as-td as-td-fee">
                  {localizeMoneyText(c.price)}
                  {c.estimated && (
                    <span className="as-inline-tag tag-neutral">{t('cardLabels.est')}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {shown.length === 0 && (
          <div className="as-empty text-muted">{t('summerPrograms.noCamps')}</div>
        )}
      </div>

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* --------------------------------------------------- the summer cost planner -- */

/**
 * The interactive whole-summer estimate.
 *
 * A summer rate sheet publishes a per-week number, and a parent's actual
 * question is what the season costs — which depends on how many weeks they buy,
 * whether they need care outside camp hours, and what one-time fees ride along.
 * Selecting a tier, a week count and the add-ons and totalling that is the card.
 *
 * Every line in the panel is derived from a published figure; nothing is
 * interpolated. A school billing by multi-week session sets `sessionBased` and
 * every "week" label becomes "session" — the arithmetic is unchanged, because
 * the unit is whatever the school sells.
 */
export function CostPlannerBody({ data }: { data: CostPlanner }) {
  const { t } = useTranslation()
  const [tierId, setTierId] = useState(data.defaultTier)
  const [weeks, setWeeks] = useState(data.defaultWeeks)
  const [addonsOn, setAddonsOn] = useState<Set<string>>(
    () => new Set(data.addons.filter((a) => a.defaultOn).map((a) => a.id)),
  )

  const tier = data.tiers.find((r) => r.id === tierId) ?? data.tiers[0]
  const unit = data.sessionBased ? 'session' : 'week'

  const toggleAddon = (id: string) =>
    setAddonsOn((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  /* Add-ons are priced per week alongside the camp, so they scale with the week
     count exactly as the camp rate does. One-time fees deliberately do not. */
  const addonPerWeek = data.addons
    .filter((a) => addonsOn.has(a.id))
    .reduce((sum, a) => sum + a.price, 0)
  const perWeek = tier.price + addonPerWeek
  const campTotal = tier.price * weeks
  const addonTotal = addonPerWeek * weeks
  const oneTime = data.fees.reduce((sum, f) => sum + (f.note ? 0 : (f.amount ?? 0)), 0)
  const summerTotal = campTotal + addonTotal + oneTime

  /* A camp day is the atomic unit a parent compares against a sitter, so the
     panel closes on it. Five days a week is the published camp week for every
     school here; a school selling anything else would need its own divisor. */
  const perCampDay = Math.round(summerTotal / (weeks * 5))

  /* Any figure in the estimate that came from a modeled rate makes the whole
     total modeled — a total is only as published as its least published input. */
  const estimated =
    tier.estimated || data.addons.some((a) => addonsOn.has(a.id) && a.estimated)

  /* A school publishing one or two tiers can't fill the estimate rail's height,
     so the fee ledger drops under the table instead and the two columns even out
     rather than leaving a tall blank gap. Same rule as the After School matrix. */
  const isShort = data.tiers.length <= 3
  const feeLedger = data.fees.length > 0 && (
    <div className="as-fees">
      <div className="as-fees-kicker text-muted">{t('cardLabels.feesFinePrint')}</div>
      <div className="as-fees-list">
        {data.fees.map((f) =>
          f.note ? (
            <p key={f.label} className="as-fee-note text-muted">
              <RichText text={f.label} />
            </p>
          ) : (
            <div key={f.label} className="as-fee">
              <span>{f.label}</span>
              <strong>{f.value && localizeMoneyText(f.value)}</strong>
            </div>
          ),
        )}
      </div>
    </div>
  )

  return (
    <div className="as-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <div className={`as-cost${isShort ? ' is-short' : ''}`}>
        <div className="as-cost-matrix">
          <div className="as-daysel">
            <span className="as-daysel-label text-muted">
              {t(data.sessionBased ? 'summerPrograms.sessionsLabel' : 'summerPrograms.weeksLabel')}
            </span>
            <div className="as-filters">
              {Array.from({ length: data.maxWeeks }, (_, i) => i + 1).map((w) => (
                <button
                  key={w}
                  type="button"
                  className={`as-filter${weeks === w ? ' is-active' : ''}`}
                  onClick={() => setWeeks(w)}
                  aria-pressed={weeks === w}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="as-table-wrap">
            <table className="as-table">
              <thead>
                <tr>
                  <th scope="col" className="as-th as-th-row">
                    {t('summerPrograms.colTier')}
                  </th>
                  <th scope="col" className="as-th as-th-fee">
                    {t(
                      data.sessionBased
                        ? 'summerPrograms.colPerSession'
                        : 'summerPrograms.colPerWeek',
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.tiers.map((r) => (
                  <tr
                    key={r.id}
                    className={r.id === tierId ? 'is-selected' : undefined}
                    onClick={() => setTierId(r.id)}
                  >
                    <th scope="row" className="as-td as-td-row">
                      <button
                        type="button"
                        className="as-rowbtn"
                        aria-pressed={r.id === tierId}
                      >
                        {r.label}
                      </button>
                      {r.detail && (
                        <>
                          <br />
                          <span className="text-muted as-class-desc">{r.detail}</span>
                        </>
                      )}
                    </th>
                    <td className="as-td as-td-fee">
                      {money(r.price)}
                      {r.estimated && (
                        <span className="as-inline-tag tag-neutral">{t('cardLabels.est')}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* A school with no published extras gets no toggles at all, rather
              than an empty row implying it offers none. */}
          {data.addons.length > 0 && (
            <div className="su-addons">
              <div className="as-filters-label text-muted">{t('summerPrograms.addOns')}</div>
              <div className="as-filters">
                {data.addons.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className={`as-filter${addonsOn.has(a.id) ? ' is-active' : ''}`}
                    onClick={() => toggleAddon(a.id)}
                    aria-pressed={addonsOn.has(a.id)}
                  >
                    {a.label} · {money(a.price)}
                    {a.estimated && ' *'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isShort && feeLedger}
        </div>

        <div className="as-cost-side">
          <div className="as-estimate">
            <div className="as-estimate-kicker text-muted">{t('tables.yourEstimate')}</div>
            <div className="as-estimate-row">{tier.panelLabel}</div>
            <div className="as-estimate-days text-muted">
              {t(
                data.sessionBased
                  ? 'summerPrograms.sessionsSelected'
                  : 'summerPrograms.weeksSelected',
                { count: weeks },
              )}
            </div>

            <div className="as-estimate-big">
              <span className="as-estimate-val">{money(summerTotal)}</span>
              <span className="text-muted">{t('summerPrograms.unitSummer')}</span>
            </div>

            <div className="as-estimate-lines">
              <div>
                <span className="text-muted">
                  {t(unit === 'session' ? 'summerPrograms.campPerSession' : 'summerPrograms.campPerWeek')}
                </span>
                <strong>{money(tier.price)}</strong>
              </div>
              {addonPerWeek > 0 && (
                <div>
                  <span className="text-muted">
                    {t(
                      unit === 'session'
                        ? 'summerPrograms.addOnsPerSession'
                        : 'summerPrograms.addOnsPerWeek',
                    )}
                  </span>
                  <strong>{money(addonPerWeek)}</strong>
                </div>
              )}
              <div>
                <span className="text-muted">
                  {t(
                    unit === 'session'
                      ? 'summerPrograms.totalPerSession'
                      : 'summerPrograms.totalPerWeek',
                  )}
                </span>
                <strong>{money(perWeek)}</strong>
              </div>
              {oneTime > 0 && (
                <div>
                  <span className="text-muted">{t('summerPrograms.oneTimeFees')}</span>
                  <strong>{money(oneTime)}</strong>
                </div>
              )}
              <div>
                <span className="text-muted">{t('summerPrograms.perCampDay')}</span>
                <strong>{money(perCampDay)}</strong>
              </div>
            </div>

            {estimated && (
              <p className="as-estimate-est">
                <span className="tag-neutral">{t('cardLabels.estModeled')}</span>
              </p>
            )}
          </div>

          {data.aside && (
            <div className="as-aside">
              <strong>{data.aside.title}</strong> <RichText text={data.aside.text} />
            </div>
          )}

          {!isShort && feeLedger}
        </div>
      </div>

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------------------------------- dispatcher -- */

/**
 * Maps a Summer Programs card key to its body renderer — the same explicit
 * dispatch the other redesigned areas use, for the same reason: each card is a
 * purpose-built layout rather than a shared prose body.
 */
export function SummerProgramsCardBody({
  program,
  cardKey,
}: {
  program: SummerProgram
  cardKey: SummerCardKey
}) {
  switch (cardKey) {
    case 'catalog':
      return <CampCatalogBody data={program.catalog!} />
    case 'costPlanner':
      return <CostPlannerBody data={program.costPlanner!} />
  }
}
