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

# Dropped-ligature / smart-quote artifacts from PDF extraction. Each replacement is
# unambiguous (there is no real word "o!ce" — it is always "office").
GLYPH_FIXES = [("O!ce", "Office"), ("o!ce", "office"), ("„", '"'), ("‟", '"')]

# Internal NotebookLM audio-episode prompts are not parent-facing content.
PROMPT_RE = re.compile(r"notebooklm|episode prompt", re.I)
AGG_RE = re.compile(r"sources? referenced", re.I)

# PDF text extraction hard-wraps long URLs across lines, e.g.
#   …/back-on-top-providence-day-reclai
#   ms-division-i-state-title-…/22257301/
# which leaves the URL split by a newline, so the app links only the first
# fragment (a dead link). Rejoin ONLY unambiguous wraps: a line whose trailing
# token is a URL that was cut MID-PATH (its last char is a path char and is NOT
# a completing char like "/" or a file extension), immediately followed by a
# line that CONTINUES the path (starts with a path char, no leading space, and
# is not a bullet/heading/new sentence). Complete URLs followed by a new line of
# text are deliberately left alone.
_URL_WRAP = re.compile(
    r"""(?P<url>https?://[^\s]*[A-Za-z0-9%=&?#_-])   # URL ending mid-path token…
        (?<!\.html)(?<!\.htm)(?<!\.pdf)(?<!\.aspx)   # …not a completed file URL
        \n
        (?P<cont>[a-z0-9/][A-Za-z0-9%=&?#/._-]*)     # continuation must START lowercase/
                                                     # digit/slash: real path slugs are
                                                     # lowercase, so a Capitalized next
                                                     # line (a new label/sentence) is left
    """,
    re.VERBOSE,
)


def _rejoin_wrapped_urls(text: str) -> str:
    # Apply repeatedly: a URL may wrap across more than two lines.
    prev = None
    while prev != text:
        prev = text
        text = _URL_WRAP.sub(lambda m: m.group("url") + m.group("cont"), text)
    return text


# A line that is nothing but "- <bare URL>" (no descriptive text). Real citations
# always carry prose ("- HighSchoolOT — 2025 title — https://…"); a long RUN of
# these bare-URL items is the machine-generated "Sources referenced across these
# documents" dump appended to each note. Those dumps are redundant with the inline
# citations and — because PDF extraction truncated many of them mid-URL — render as
# dead links. Strip any run of >=3 consecutive bare-URL items.
_BARE_URL_ITEM = re.compile(r"^[-*] +https?://\S+$")
_BARE_RUN_MIN = 3


def _strip_bare_url_dumps(text: str) -> str:
    lines = text.split("\n")
    out: list[str] = []
    i = 0
    n = len(lines)
    while i < n:
        if _BARE_URL_ITEM.match(lines[i]):
            j = i
            while j < n and _BARE_URL_ITEM.match(lines[j]):
                j += 1
            if j - i >= _BARE_RUN_MIN:
                i = j  # drop the whole run
                continue
        out.append(lines[i])
        i += 1
    return "\n".join(out)


# Internal research provenance must NEVER reach a public school page. Research
# files open with a provenance block naming who compiled the note, when and how
# ("Compiled by Claude Code deep research pass…", "- **Retrieved by:** Claude").
# That is maintainer metadata for the committed record, not something a parent
# reading about a school should see — and it leaked: Covenant Day's
# tuition-history card rendered "> Provenance: Compiled by Claude Code on
# 2026-08-15" as body text, with 65 content files carrying the same strings
# waiting to surface.
#
# Stripped HERE, in the generator, rather than filtered at render: src/content is
# regenerated from source-material on every ingest, so a render-side filter would
# have to be re-derived by every consumer (page, print-out, pre-rendered HTML,
# search index, translation overlays). Removing it at the source means it cannot
# come back. The source-material files KEEP their provenance headers — that is
# the point of the committed record; only the RENDERED layer drops them.
#
# Label forms seen across the corpus: "**Compiled by:**", "- **Retrieved by:**",
# "**Date compiled:**", "**Method:**", "> **Provenance:**". Anchoring at the
# start of a (possibly quoted, possibly bulleted) line catches them without
# touching prose that merely uses the word.
PROVENANCE_LINE = re.compile(
    r"^\s*(?:>\s*)?(?:[-*+]\s*)?(?:\*\*)?"
    r"(?:Provenance|Compiled by|Compiled research note|Retrieved by|Retrieval date"
    r"|Date compiled|Method|Prepared by|Author)\b.*$",
    re.IGNORECASE | re.MULTILINE,
)
# A blockquote provenance block runs until a blank or non-quoted line, so its
# continuation rows go too.
PROVENANCE_QUOTE_TAIL = re.compile(r"^>\s*(?![*#-]).*$", re.MULTILINE)
# Stray attribution surviving outside the block form.
ATTRIBUTION = re.compile(
    r"(?:Compiled by[^.\n]*\.?|Claude Code[^.\n]*\.?|deep research pass\s*\([^)]*\)\.?)",
    re.IGNORECASE,
)
# Section headings that are purely internal record-keeping — never a card.
PROVENANCE_HEADING = re.compile(
    r"^\s*(?:Provenance|Sources? referenced.*|Method(?:ology)?|Source snapshots?)\s*$",
    re.IGNORECASE,
)


def _strip_provenance(text: str) -> str:
    """Remove internal provenance/attribution from text bound for the app."""
    out, in_quote_block = [], False
    for line in text.splitlines():
        if PROVENANCE_LINE.match(line):
            # A quoted provenance line opens a block; swallow its continuation.
            in_quote_block = line.lstrip().startswith(">")
            continue
        if in_quote_block:
            if PROVENANCE_QUOTE_TAIL.match(line):
                continue
            in_quote_block = False
        out.append(line)
    return ATTRIBUTION.sub("", "\n".join(out))


def clean(text: str) -> str:
    text = CID_BULLET.sub("• ", text)
    text = CID_ANY.sub("", text)
    for bad, good in GLYPH_FIXES:
        text = text.replace(bad, good)
    text = "\n".join(line.rstrip() for line in text.splitlines())
    text = _rejoin_wrapped_urls(text)
    text = _strip_bare_url_dumps(text)
    text = _strip_provenance(text)
    text = MULTI_BLANK.sub("\n\n", text)
    return text.strip()


def make_preview(body: str) -> str:
    """First meaningful prose from a section, for a collapsed teaser."""
    stripped = SOURCE_LINE.sub("", body)
    # Teasers render as plain text (SchoolDetail's .topic-teaser span), so any
    # markdown emphasis carried over from the source note would show as literal
    # asterisks — "the school's **highest honor**". Strip the markers and keep
    # the words. Bold inside the card BODY still renders, via ProseContent.
    stripped = re.sub(r"\*\*([^*]+)\*\*", r"\1", stripped)
    stripped = re.sub(r"(?<![\w*])\*([^*\n]+)\*(?![\w*])", r"\1", stripped)
    # Any marker left over (an unbalanced pair, or one spanning a table row) would
    # still surface as a literal asterisk in the teaser, so drop the rest.
    stripped = stripped.replace("**", "")
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
    # A NotebookLM prompt note carries its own "## " sub-headings; once we hit the prompt
    # section, skip it and any following source-less orphan headings that belong to it.
    skip_orphans = False
    for chunk in parts[1:]:
        lines = chunk.splitlines()
        subtopic = lines[0].strip()
        rest = "\n".join(lines[1:]).strip()
        src_match = re.search(r"\*Source file:\s*`([^`]+)`\*", rest)
        source_file = src_match.group(1) if src_match else None

        is_prompt = bool(PROMPT_RE.search(subtopic)) or bool(source_file and PROMPT_RE.search(source_file))
        if is_prompt:
            skip_orphans = True
            continue
        if source_file is None and skip_orphans and not AGG_RE.search(subtopic):
            continue  # inner heading of the skipped prompt file
        if source_file is not None:
            skip_orphans = False

        body = SOURCE_LINE.sub("", rest).strip()
        body = clean(body)
        if not body:
            continue
        # A section that was ENTIRELY internal provenance collapses to orphaned
        # scraps once its attribution lines are stripped ("- Live pa", a stray
        # bullet), which would render as a card titled "Provenance" with nonsense
        # under it. Drop the section outright. The research file keeps it; only
        # the rendered layer loses it.
        if PROVENANCE_HEADING.match(subtopic) or len(" ".join(body.split())) < 40:
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
