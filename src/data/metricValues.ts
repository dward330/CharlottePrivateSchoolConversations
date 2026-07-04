// Quantitative "value" metrics for the Compare view — hand-maintained, NOT produced
// by the ingest pipeline. Coverage metrics (from metrics.ts) answer "did we research
// this?" with ✓ / N/A; value metrics answer "what is the number?" with an actual value
// per school (or null = N/A when unknown / not applicable).
//
// Keep values as short display strings. `null` renders as N/A. `note` shows as small
// print under the row label (definition, time window, source caveat).

export type ValueMetric = {
  topic: string // topic slug
  key: string
  label: string
  note?: string
  values: Record<string, string | null> // school slug -> display value | null (N/A)
}

export const VALUE_METRICS: ValueMetric[] = [
  {
    topic: 'after-school',
    key: 'latest-pickup',
    label: 'Latest pickup time',
    note: 'End of the Lower-School extended-care/aftercare day. Verify current hours with the school.',
    values: {
      // Sourced from each school’s after-school research note:
      'charlotte-country-day': '6:00 PM', // "Structured Care to 6 pm"
      'charlotte-latin': '6:00 PM', // Hawks’ Club, 1:30–6:00 p.m.
      'davidson-day': '6:00 PM', // Extended Care, 2:45–6:00 p.m.
      // These schools publish hours only in an enrollment packet / flag pickup as
      // "confirm with school" — no public latest-pickup time located:
      cannon: null,
      'charlotte-christian': null,
      'providence-day': null,
    },
  },

  // --- Sports college commitments, cumulative over the Classes of 2024, 2025 & 2026.
  // Counts of DISTINCT athletes who committed to play college sports at each level;
  // NESTED (Power 4 ⊆ Division I). Power 4 = SEC / Big Ten / ACC / Big 12 only
  // (Big East, AAC, A-10, Ivy, etc. are "other D1"; Cal/Berkeley counts P4 as an ACC
  // member; Notre Dame's non-football sports count P4 via the ACC).
  //
  // Compiled by hand from each school's published commitment rosters + Charlotte-area
  // signing-day coverage (see git history for per-athlete sourcing in this file's
  // review). These are DOCUMENTED MINIMUMS — coverage is uneven: Providence Day &
  // Country Day publish full by-class rosters; Charlotte Christian's public list runs
  // through 2025 (its 2026 class isn't compiled yet); Charlotte Latin's academic-
  // heavy classes send many to D3 and its November signing lists are partial; Cannon's
  // best-known athletes (Richardson '21, Bradley '22, Nix '27) fall outside this window.
  {
    topic: 'sports',
    key: 'p4-commits-2426',
    label: 'Power 4 commits',
    note: 'Distinct athletes committed to an SEC / Big Ten / ACC / Big 12 program, Classes of 2024–2026. Documented minimum.',
    values: {
      cannon: '1', // Notre Dame (swim, ’25)
      'charlotte-christian': '8', // ’24: Henley, Wilfong, Woody, Zinger · ’25: E.Boykin, Hinde, Nicholson, Vance (’26 not yet compiled)
      'charlotte-country-day': '9', // ’24: Klein, Lewis, Stajos, McDonald · ’25: Scott, Pifer · ’26: T.Klein, Alzate-Celin, Mallard
      'charlotte-latin': '3', // ’24 Salvage (South Carolina) · ’25 Clontz (Cal) · ’26 Lee (NC State)
      'davidson-day': '3', // ’25 Denis (UNC), Gordon (Georgia) · ’26 Stevens (Clemson)
      'providence-day': '17', // school "Alumni at the Next Level" roster, 2024–26 (17 P4 tally)
    },
  },
  {
    topic: 'sports',
    key: 'd1-commits-2426',
    label: 'Division I commits',
    note: 'Distinct athletes committed to any NCAA Division I program, Classes of 2024–2026 (includes the Power 4 count above). Documented minimum.',
    values: {
      cannon: '3', // ’25: Notre Dame, ETSU, Butler
      'charlotte-christian': '26', // ’24: 11 · ’25: 15 (’26 class not yet compiled)
      'charlotte-country-day': '25', // ’24: 10 · ’25: 12 · ’26: 3
      'charlotte-latin': '14', // ’24: Coppage, Floyd, Salvage (3) · ’25: Booker, Clontz, Connor, Milligan, Morgan (5) · ’26: Short, K.Smith, Lee, Holland, Gorelick, Cheatwood (6)
      'davidson-day': '9', // ’24: M.Smith · ’25: Denis, Doty, Glass, Gordon, Seifert, K.Smith · ’26: Stevens, Peck (2024 & 2026 under-documented — floor)
      'providence-day': '39', // school roster D1 tally, 2024–26
    },
  },
]

export function valueMetricsForTopic(topicSlug: string): ValueMetric[] {
  return VALUE_METRICS.filter((m) => m.topic === topicSlug)
}
