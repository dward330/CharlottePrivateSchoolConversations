// The layered "Academic & Competitive Clubs" read — a verdict line plus
// scannable club-cluster rows, each with an evidence tag and per-row disclosure
// of the full note and its source. Replaces the generic prose body for this one
// metric on schools that have a structured entry (see data/clubClusters.ts).
//
// Recreates the "2a — Finalized" design in "Academic Clubs Expand Options.dc.html"
// using the app's own tokens (src/index.css), the same way the Financial Aid
// deep-dive recreated its reference.

import type { ClubClusters, ClubEvidence } from '../data/clubClusters.ts'

const EVIDENCE_LABEL: Record<ClubEvidence, string> = {
  'verified-event': 'Verified — event',
  'official-list': 'Official list',
}

/** Small plus mark; rotates 45° to an ✕ when its row opens (CSS-driven). */
function RowPlus() {
  return (
    <span className="clubrow-plus" aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        focusable="false"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
  )
}

export function ClubClustersBody({ clusters }: { clusters: ClubClusters }) {
  return (
    <div className="club-clusters">
      {/* The verdict repeats inside the open body — the summary teaser that
          carries it collapsed is hidden once the card expands. */}
      <p className="club-verdict">
        <strong>{clusters.verdict}</strong>{' '}
        <span className="text-muted">{clusters.verdictHint}</span>
      </p>

      {clusters.rows.map((row, i) => (
        <details key={row.name} className="clubrow" open={i === 0}>
          <summary>
            <span className="clubrow-name">{row.name}</span>
            <span className="clubrow-oneliner">{row.oneLiner}</span>
            <span
              className={
                row.evidence === 'verified-event' ? 'tag-accent' : 'tag-outline'
              }
            >
              {EVIDENCE_LABEL[row.evidence]}
            </span>
            <RowPlus />
          </summary>
          <div className="clubrow-detail">
            <p>{row.note}</p>
            <div className="clubrow-src srcrow">
              <span className="tag-outline">SOURCE</span>
              <span className="clubrow-src-text">{row.source}</span>
            </div>
          </div>
        </details>
      ))}
    </div>
  )
}
