// The printable admissions checklist — one US-letter sheet a parent takes with
// them, for one school and one entry band.
//
// Every string on this page is DERIVED from the same
// `admissionsPrograms/<slug>.ts` entry the school page's guide renders, so the
// two can never drift: no copy is duplicated here. The sheet's own ordered rows
// are the band's `checklistRows` rather than its `steps`, because paper splits
// actions the on-screen stepper merges (Providence Day's "inquire" and "create
// your portal account" are one step on screen, two ticks on paper).
//
// Export is `window.print()` plus @media print, deliberately NOT a PDF library:
// the browser's own "Save as PDF" produces selectable text at printer DPI,
// where a canvas-based library would rasterize the hairlines and checkbox
// squares this design is built on and add bundle weight to a repo that already
// reverted a route split over CLS.
//
// The checkboxes are INERT empty squares. They are checked by hand on paper —
// there is no state and no <input>.

import { useTranslation } from 'react-i18next'
import { admissionsProgram } from '../data/admissionsPrograms.ts'
import { schoolBySlug, brandOf } from '../lib/manifest.ts'
import { toSchool, toAdmissionsChecklist } from '../lib/router.ts'
import { localizeMoneyText } from '../lib/format.ts'

export function AdmissionsChecklist({ slug, band }: { slug: string; band: string | null }) {
  const { t, i18n } = useTranslation()
  const school = schoolBySlug(slug)
  const program = admissionsProgram(slug, i18n.language)
  const guide = program?.guide

  if (!school || !guide || guide.bands.length === 0) {
    return (
      <div className="page">
        <p className="empty">
          {t('school.unknown')} <a href={toSchool(slug)}>{t('admissions.backToSection')}</a>.
        </p>
      </div>
    )
  }

  /* An unknown or missing ?band= falls back to the FIRST band rather than
     404ing — the reference design does exactly this, and a shared link with a
     stale band should still print something useful. */
  const active = guide.bands.find((b) => b.key === band) ?? guide.bands[0]

  /* The school's brand color, exactly as the dossier page sets it — the sheet
     is a per-school document and --ink resolves from it (src/index.css). */
  const brand = brandOf(slug)

  return (
    <div className="page adx-page" style={{ ['--brand' as string]: brand.color }}>
      {/* Screen-only chrome. @media print hides all of it, so the sheet exports
          as the checklist alone. */}
      <div className="adx-chrome">
        <a className="adx-back" href={`${toSchool(slug)}#topic-admissions`}>
          ← {t('admissions.backToSection')}
        </a>
        <div className="adx-chrome-right">
          {guide.bands.length > 1 && (
            <div className="adx-tabs" role="group" aria-label={t('admissions.applyingFor')}>
              {guide.bands.map((b) => (
                <a
                  key={b.key}
                  className={`btn small adx-tab${b.key === active.key ? ' is-on' : ''}`}
                  href={toAdmissionsChecklist(slug, b.key)}
                  aria-current={b.key === active.key ? 'page' : undefined}
                >
                  {b.label}
                </a>
              ))}
            </div>
          )}
          <button type="button" className="btn primary small" onClick={() => window.print()}>
            {t('admissions.printSave')}
          </button>
        </div>
      </div>

      <article className="adx-sheet">
        <header className="adx-head">
          <div className="adx-head-main">
            <div className="adx-kicker">{t('admissions.checklistKicker')}</div>
            <h1 className="adx-title">
              {school.name} — {active.title}
            </h1>
          </div>
          <div className="adx-head-rail">
            <div>{guide.cycle}</div>
            <div className="adx-portal">{guide.checklist.portalNote}</div>
          </div>
        </header>

        <div className="adx-callout">
          <strong>{active.checklistCallout.lead}</strong> {active.checklistCallout.text}
        </div>

        <ol className="adx-rows">
          {active.checklistRows.map((r) => (
            <li key={r.action} className="adx-row">
              {/* Inert by design — ticked with a pen, never in the browser. */}
              <span className="adx-box" aria-hidden="true" />
              <div className="adx-row-body">
                <div className="adx-row-action">{r.action}</div>
                <div className="adx-row-detail">{localizeMoneyText(r.detail)}</div>
              </div>
              <div className="adx-row-due">{localizeMoneyText(r.due)}</div>
            </li>
          ))}
        </ol>

        <div className="adx-panels">
          <section className="adx-panel">
            <div className="adx-panel-kicker">{guide.checklist.aidPanel.kicker}</div>
            <ul className="adx-panel-list">
              {guide.checklist.aidPanel.items.map((it) => (
                <li key={it}>{localizeMoneyText(it)}</li>
              ))}
            </ul>
          </section>
          <section className="adx-panel">
            <div className="adx-panel-kicker">{guide.checklist.contactPanel.kicker}</div>
            <ul className="adx-panel-list">
              {guide.checklist.contactPanel.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        </div>

        <p className="adx-disclaimer">{guide.checklist.disclaimer}</p>
      </article>
    </div>
  )
}
