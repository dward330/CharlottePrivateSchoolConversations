// Shapes for the generated research manifest (src/data/schools.json).

export type School = { slug: string; name: string }
export type Topic = { slug: string; name: string }

export type MatrixCell = {
  topic_slug: string
  school_slug: string
  doc_count: number
}

export type ResearchDoc = {
  school_slug: string
  school: string
  topic_slug: string
  topic: string
  subtopic: string
  source_file: string
  note_file: string
  type: string
}

export type Manifest = {
  generated: string
  description: string
  schools: School[]
  topics: Topic[]
  matrix: MatrixCell[]
  documents: ResearchDoc[]
}

// Shape of the lazy-loaded content files (src/content/<topic>/<school>.json).
export type ContentSection = {
  subtopic: string
  source_file: string | null
  preview: string
  text: string
}

export type SchoolTopicContent = {
  school_slug: string
  topic_slug: string
  section_count: number
  sections: ContentSection[]
}
