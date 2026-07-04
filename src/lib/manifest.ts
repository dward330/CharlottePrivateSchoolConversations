// Typed access + derived views over the generated research manifest.
// Everything here is data-driven: new topics/schools that appear in schools.json
// (and new metrics via metrics.ts) flow through with no code changes.

import raw from '../data/schools.json'
import { brandFor, type Brand } from '../data/brands.ts'
import { normalizeMetric, type Metric } from './metrics.ts'
import type { Manifest, School, Topic } from './types.ts'

const manifest = raw as Manifest

export const schools: School[] = manifest.schools
export const topics: Topic[] = manifest.topics
export const generated = manifest.generated

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
