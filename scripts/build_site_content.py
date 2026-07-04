#!/usr/bin/env python3
"""Build per-school-topic content JSON for the React app from the distilled notes.

Reads the consolidated notes in `.claude/docs/<topic>/<school>.md` (produced by the
ingest-source-material skill) and emits lightly-cleaned, structured JSON to
`src/content/<topic>/<school>.json`. The app lazy-loads these via import.meta.glob so
the raw research text never bloats the main bundle.

Run after each ingest:

    python scripts/build_site_content.py

This is a derived layer, safe to re-run; it fully regenerates src/content/ each time.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / ".claude" / "docs"
OUT = ROOT / "src" / "content"

# PDF text extraction leaves these artifacts; scrub them for readable output.
CID_BULLET = re.compile(r"\(cid:127\)\s*")
CID_ANY = re.compile(r"\(cid:\d+\)")
MULTI_BLANK = re.compile(r"\n{3,}")
SOURCE_LINE = re.compile(r"^\*Source file:.*$", re.MULTILINE)
PREVIEW_MAX = 320


def clean(text: str) -> str:
    text = CID_BULLET.sub("• ", text)
    text = CID_ANY.sub("", text)
    text = "\n".join(line.rstrip() for line in text.splitlines())
    text = MULTI_BLANK.sub("\n\n", text)
    return text.strip()


def make_preview(body: str) -> str:
    """First meaningful prose from a section, for a collapsed teaser."""
    stripped = SOURCE_LINE.sub("", body)
    words = " ".join(stripped.split())
    if len(words) <= PREVIEW_MAX:
        return words
    cut = words[:PREVIEW_MAX]
    # avoid slicing mid-word
    if " " in cut:
        cut = cut[: cut.rfind(" ")]
    return cut + "…"


def parse_note(md: str):
    """Split a note into (header_meta, [sections])."""
    # Sections start at "## " headings. Everything before the first is the header.
    parts = re.split(r"(?m)^## ", md)
    header = parts[0]
    sections = []
    for chunk in parts[1:]:
        lines = chunk.splitlines()
        subtopic = lines[0].strip()
        rest = "\n".join(lines[1:]).strip()
        src_match = re.search(r"\*Source file:\s*`([^`]+)`\*", rest)
        source_file = src_match.group(1) if src_match else None
        body = SOURCE_LINE.sub("", rest).strip()
        body = clean(body)
        if not body:
            continue
        sections.append(
            {
                "subtopic": subtopic,
                "source_file": source_file,
                "preview": make_preview(body),
                "text": body,
            }
        )
    return header, sections


def main() -> None:
    if not DOCS.exists():
        raise SystemExit(f"docs dir not found: {DOCS}")
    if OUT.exists():
        for p in OUT.rglob("*.json"):
            p.unlink()
    count = 0
    for note in sorted(DOCS.glob("*/*.md")):
        topic_slug = note.parent.name
        school_slug = note.stem
        header, sections = parse_note(note.read_text(encoding="utf-8"))
        if not sections:
            continue
        payload = {
            "school_slug": school_slug,
            "topic_slug": topic_slug,
            "section_count": len(sections),
            "sections": sections,
        }
        dest = OUT / topic_slug / f"{school_slug}.json"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
        count += 1
    print(f"wrote {count} content files under {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
