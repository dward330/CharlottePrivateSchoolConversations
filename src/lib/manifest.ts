// Typed access + derived views over the generated research manifest.
// Everything here is data-driven: new topics/schools that appear in schools.json
// (and new metrics via metrics.ts) flow through with no code changes.

import raw from '../data/schools.json'
import { BRANDS, brandFor, type Brand } from '../data/brands.ts'
import { normalizeMetric, orderTopicSlugs, type Metric } from './metrics.ts'
import type { Manifest, School, Topic } from './types.ts'

const manifest = raw as Manifest

export const schools: School[] = manifest.schools

/**
 * Whether a school teaches grades 9-12. Everything defaults to true: only a
 * PreK-8 school carries `hasHighSchool: false` in BRANDS (data/brands.ts, which
 * explains why the flag lives there and not in the generated manifest).
 */
export function hasHighSchool(slug: string): boolean {
  return BRANDS[slug]?.hasHighSchool !== false
}

/**
 * The schools the Compare page is allowed to show — every school that teaches
 * grades 9-12.
 *
 * A PreK-8 school is excluded from Compare ENTIRELY (user decision,
 * 2026-09-15), because 14 of the 30 Compare rows structurally require a high
 * school to exist: the Upper School course and department counts, AP courses,
 * Upper School organizations, the two recruiting-commit rows, and all eight
 * College Support rows. Those are not gaps a research pass could fill — an 8th
 * grader applies to high school, not college.
 *
 * `0 / 8` on the Ivy League row is the sharpest illustration: it reads as "zero
 * Ivies from this school's graduates", when the truth is that no class from
 * this school has ever applied to a college. A null is unhelpful; a zero is
 * actively false.
 *
 * DERIVE FROM THIS, never from `schools`, anywhere Compare is the subject.
 * Compare.tsx reads it once as `allSchools` and feeds all six of its uses —
 * the slug allowlist, the toggle, the columns, the picker pills AND the two
 * visible "N schools" counts — so the columns and the counts cannot drift out
 * of step with each other later.
 *
 * Deliberately NOT used by the "More schools" navigation row on a school page
 * (SchoolDetail.tsx): that row is how a reader reaches a dossier, not a Compare
 * surface, and a PreK-8 school belongs in it.
 */
export const comparableSchools: School[] = schools.filter((s) => hasHighSchool(s.slug))

// Topic section headers render in the explicit TOPIC_ORDER (metrics.ts), so the
// top-level order is config-driven rather than tied to manifest/folder order.
export const topics: Topic[] = orderBySlug(manifest.topics)
export const generated = manifest.generated

function orderBySlug(list: Topic[]): Topic[] {
  const bySlug = new Map(list.map((t) => [t.slug, t]))
  return orderTopicSlugs(list.map((t) => t.slug)).map((s) => bySlug.get(s)!)
}

export function schoolBySlug(slug: string): School | undefined {
  return schools.find((s) => s.slug === slug)
}

export function topicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug)
}

export function brandOf(slug: string): Brand {
  return brandFor(slug, schoolBySlug(slug)?.name ?? slug)
}

/** Total distilled documents backing a school × topic (0 if none). */
export function docCount(topicSlug: string, schoolSlug: string): number {
  return (
    manifest.matrix.find(
      (m) => m.topic_slug === topicSlug && m.school_slug === schoolSlug,
    )?.doc_count ?? 0
  )
}

/** Topics that actually have research for a given school, in manifest order. */
export function topicsForSchool(schoolSlug: string): Topic[] {
  return topics.filter((t) => docCount(t.slug, schoolSlug) > 0)
}

export type MetricCoverage = {
  metric: Metric
  /** Schools (slugs) with at least one document for this metric. */
  schools: Set<string>
  /** Total schools covering — used for ordering. */
  coverage: number
}

/**
 * The canonical metric axis for a topic: every distinct metric any school has
 * research on, ordered by how many schools cover it (broadest first) then label.
 */
export function metricsForTopic(topicSlug: string): MetricCoverage[] {
  const byKey = new Map<string, MetricCoverage>()
  for (const doc of manifest.documents) {
    if (doc.topic_slug !== topicSlug) continue
    const metric = normalizeMetric(topicSlug, doc.subtopic)
    if (!metric) continue
    let entry = byKey.get(metric.key)
    if (!entry) {
      entry = { metric, schools: new Set(), coverage: 0 }
      byKey.set(metric.key, entry)
    }
    entry.schools.add(doc.school_slug)
  }
  const list = [...byKey.values()]
  for (const e of list) e.coverage = e.schools.size
  list.sort(
    (a, b) => b.coverage - a.coverage || a.metric.label.localeCompare(b.metric.label),
  )
  return list
}

/** Does this school have research on this metric within the topic? */
export function schoolHasMetric(
  topicSlug: string,
  schoolSlug: string,
  metricKey: string,
): boolean {
  return manifest.documents.some(
    (d) =>
      d.topic_slug === topicSlug &&
      d.school_slug === schoolSlug &&
      normalizeMetric(topicSlug, d.subtopic)?.key === metricKey,
  )
}

/** Parent-facing metric labels a school covers within a topic (for detail chips). */
export function schoolMetricsInTopic(topicSlug: string, schoolSlug: string): Metric[] {
  const seen = new Set<string>()
  const out: Metric[] = []
  for (const doc of manifest.documents) {
    if (doc.topic_slug !== topicSlug || doc.school_slug !== schoolSlug) continue
    const metric = normalizeMetric(topicSlug, doc.subtopic)
    if (!metric || seen.has(metric.key)) continue
    seen.add(metric.key)
    out.push(metric)
  }
  return out
}

export type ProjectStats = {
  schools: number
  topics: number
  documents: number
}

export function projectStats(): ProjectStats {
  return {
    schools: schools.length,
    topics: topics.length,
    documents: manifest.documents.length,
  }
}
