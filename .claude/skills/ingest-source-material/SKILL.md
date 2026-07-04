---
name: ingest-source-material
description: >
  Ingest new research files into the Charlotte private-school project. Use whenever
  reference files (PDFs, .md, .txt) are added, changed, or removed under
  source-material/<topic>/<school>/, or when a new topic or school folder is created.
  Regenerates the distilled notes in .claude/docs/ and the app manifest
  src/data/schools.json so they stay in sync with source-material. Triggers include
  "ingest", "I dropped new files in source-material", "rebuild the docs/notes",
  "update schools.json", "add a new school/topic".
---

# Ingest Source Material

Keeps the project's derived layers in sync with the raw research in `source-material/`.

## Data flow

```
source-material/<topic>/<school>/<files>   (raw, gitignored — PDFs, .md, .txt)
        │  build_docs.py
        ▼
.claude/docs/<topic>/<school>.md           (one consolidated note per school × topic)
src/data/schools.json                      (machine-readable manifest for the React app)
.claude/docs/INDEX.md                      (regenerated index)
```

The build is **discovery-based**: it reads whatever topic and school folders exist under
`source-material/`, so new topics/schools are picked up automatically with no code edits.
Slugs are lowercase-hyphenated (`charlotte-country-day`); display names come from lookup
tables in `build_docs.py` (`TOPIC_NAMES`, `SCHOOL_NAMES`) and fall back to Title Case for
unknown slugs.

## How to run

Ensure the dependency is present, then run the bundled script from the project root:

```bash
pip install pdfplumber --break-system-packages   # once, if not already installed
python .claude/skills/ingest-source-material/build_docs.py           # rebuild everything
python .claude/skills/ingest-source-material/build_docs.py the-arts  # rebuild just one topic
```

Rebuilding a single topic preserves the other topics already in `schools.json` (it merges,
not overwrites).

## Steps for the agent

1. Confirm what changed in `source-material/` (new files? new school folder? new topic folder?).
   - New school → create `source-material/<topic>/<new-school-slug>/` and, ideally, add the
     slug→name pair to `SCHOOL_NAMES` in `build_docs.py`.
   - New topic → create `source-material/<new-topic-slug>/<school>/` and add it to `TOPIC_NAMES`.
2. Run `build_docs.py` (whole project, or pass the one topic slug that changed).
3. Verify: `python -c "import json;m=json.load(open('src/data/schools.json'));print(len(m['documents']),'docs')"`
   and spot-check the regenerated note(s) under `.claude/docs/<topic>/`.
4. Commit the regenerated `.claude/docs/` and `src/data/schools.json` (raw files in
   `source-material/` stay gitignored and are not committed).

## Notes & limitations

- Output is a faithful, lightly-cleaned **extraction** of the source text, not a re-summary.
  If a true condensed abstract is wanted, do that as a separate pass on the generated notes.
- Per-document text is capped at ~45k characters to keep notes readable.
- Subtopic titles are derived from filenames (everything after the last " - "; underscores in
  legacy names are normalized). Keep the `<School> - <Topic> - <Subtopic>` naming for clean titles.
- `build_docs.py` is safe to re-run; it fully regenerates the derived files each time.
