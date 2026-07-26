#!/usr/bin/env python3
"""
Rebuild distilled research notes (.claude/docs/) and the app manifest
(src/data/schools.json) from raw files in source-material/.

Discovery-based: any topic folder and any school folder under
source-material/<topic>/<school>/ is picked up automatically, so new
drops need no code changes. Re-run this whenever source-material changes.

Usage:
    python .claude/skills/ingest-source-material/build_docs.py            # rebuild everything
    python .claude/skills/ingest-source-material/build_docs.py the-arts   # rebuild one topic

Requires: pdfplumber  (pip install pdfplumber --break-system-packages)
"""
import os, re, sys, json, datetime
try:
    import pdfplumber
except ImportError:
    sys.exit("Missing dependency: pip install pdfplumber --break-system-packages")

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SM   = os.path.join(ROOT, "source-material")
DOCS = os.path.join(ROOT, ".claude", "docs")
DATADIR = os.path.join(ROOT, "src", "data")

# Pretty names for known slugs; anything unknown falls back to Title Case.
TOPIC_NAMES = {
    "the-arts": "The Arts", "sports": "Sports",
    "college-support": "College Support", "student-clubs": "Student Clubs",
    "after-school": "After School", "financial-aid-tuition": "Financial Aid & Tuition",
    "course-offerings": "Course Offerings",
}
SCHOOL_NAMES = {
    "cannon": "Cannon School",
    "charlotte-christian": "Charlotte Christian School",
    "charlotte-country-day": "Charlotte Country Day School",
    "charlotte-latin": "Charlotte Latin School",
    "davidson-day": "Davidson Day School",
    "providence-day": "Providence Day School",
}
pretty = lambda slug, table: table.get(slug, slug.replace("-", " ").title())

# A table header cell that wraps inside its own column comes out of pdfplumber as a
# split word: the header row on one line, then the tail of the wrapped word alone on
# the next ("Sectio Subject Confidence" / "n"). Text order alone can't say which word
# the tail belongs to, so the repairs are listed explicitly. `warn_fragments` flags any
# new occurrence so an unlisted one shows up at build time instead of on the page.
HEADER_SPLITS = [
    ("Sectio Subject Confidence\nn", "Section Subject Confidence"),
    ("Name Clas College Level\ns", "Name Class College Level"),
    ("Secti Topic Answered The limiting factor\non",
     "Section Topic Answered The limiting factor"),
]
FRAGMENT_LINE = re.compile(r"^(.+)\n([a-z]{1,2})$", re.MULTILINE)

def clean(t):
    if not t: return ""
    t = t.replace("\x00", " ")
    t = re.sub(r"[ \t]+\n", "\n", t)
    t = re.sub(r"\n{3,}", "\n\n", t)
    t = re.sub(r"[ \t]{2,}", " ", t)
    for broken, fixed in HEADER_SPLITS:
        t = t.replace(broken, fixed)
    return t.strip()

def warn_fragments(text, path):
    """Report split-word leftovers that HEADER_SPLITS doesn't cover yet."""
    for m in FRAGMENT_LINE.finditer(text):
        print(f"  ! split-word fragment {m.group(2)!r} after {m.group(1)[:60]!r} "
              f"in {os.path.basename(path)}")

def extract(path):
    ext = os.path.splitext(path)[1].lower()
    if ext in (".md", ".txt"):
        try:
            return clean(open(path, encoding="utf-8", errors="ignore").read())
        except Exception as e:
            return f"[could not read: {e}]"
    if ext == ".pdf":
        out = []
        try:
            with pdfplumber.open(path) as pdf:
                for pg in pdf.pages:
                    out.append(pg.extract_text() or "")
        except Exception as e:
            return f"[extraction error: {e}]"
        return clean("\n".join(out))
    return ""

def subtopic(fn):
    base = os.path.splitext(fn)[0].replace("__", " - ").replace("_", " ")
    return base.split(" - ")[-1].strip()

def find_urls(text):
    seen, out = set(), []
    for u in re.findall(r"https?://[^\s\)\]]+", text):
        u = u.rstrip(".,);]")
        if u not in seen:
            seen.add(u); out.append(u)
    return out

def list_dirs(p):
    return sorted(d for d in os.listdir(p)
                  if os.path.isdir(os.path.join(p, d)) and not d.startswith("."))

def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    if not os.path.isdir(SM):
        sys.exit(f"No source-material dir at {SM}")

    os.makedirs(DATADIR, exist_ok=True)
    manifest_docs, counts = [], {}
    topics = [t for t in list_dirs(SM) if not only or t == only]

    for tslug in topics:
        tname = pretty(tslug, TOPIC_NAMES)
        for sslug in list_dirs(os.path.join(SM, tslug)):
            sname = pretty(sslug, SCHOOL_NAMES)
            sdir = os.path.join(SM, tslug, sslug)
            files = sorted(f for f in os.listdir(sdir) if not f.startswith("."))
            if not files:
                continue
            outdir = os.path.join(DOCS, tslug); os.makedirs(outdir, exist_ok=True)
            parts = [f"# {sname} — {tname}\n",
                     f"> Distilled from {len(files)} source document(s) in "
                     f"`source-material/{tslug}/{sslug}/`. Auto-extracted full text, "
                     f"lightly cleaned. Rebuilt {datetime.date.today().isoformat()}.\n",
                     "**Documents:** " + ", ".join(subtopic(f) for f in files) + "\n"]
            urls = set()
            for f in files:
                st = subtopic(f)
                text = extract(os.path.join(sdir, f))
                warn_fragments(text, f)
                if len(text) > 45000:
                    text = text[:45000] + "\n\n…[truncated]"
                urls.update(find_urls(text))
                parts.append(f"\n\n---\n\n## {st}\n\n*Source file: `{f}`*\n\n{text}\n")
                manifest_docs.append({
                    "school_slug": sslug, "school": sname,
                    "topic_slug": tslug, "topic": tname, "subtopic": st,
                    "source_file": f"source-material/{tslug}/{sslug}/{f}",
                    "note_file": f".claude/docs/{tslug}/{sslug}.md",
                    "type": os.path.splitext(f)[1].lstrip("."),
                })
            if urls:
                parts.append("\n\n---\n\n## Sources referenced across these documents\n\n")
                parts.append("\n".join(f"- {u}" for u in sorted(urls)) + "\n")
            open(os.path.join(outdir, f"{sslug}.md"), "w", encoding="utf-8").write("".join(parts))
            counts[(tslug, sslug)] = len(files)

    # Merge into manifest (preserve other topics when rebuilding just one)
    mpath = os.path.join(DATADIR, "schools.json")
    if only and os.path.exists(mpath):
        old = json.load(open(mpath, encoding="utf-8"))
        kept = [d for d in old.get("documents", []) if d["topic_slug"] != only]
        manifest_docs = kept + manifest_docs
        for d in old.get("matrix", []):
            if d["topic_slug"] != only:
                counts.setdefault((d["topic_slug"], d["school_slug"]), d["doc_count"])

    all_topics = sorted({d["topic_slug"] for d in manifest_docs})
    all_schools = sorted({d["school_slug"] for d in manifest_docs})
    manifest = {
        "generated": datetime.date.today().isoformat(),
        "description": "Charlotte private-school research manifest. Topics x schools x documents.",
        "schools": [{"slug": s, "name": pretty(s, SCHOOL_NAMES)} for s in all_schools],
        "topics": [{"slug": t, "name": pretty(t, TOPIC_NAMES)} for t in all_topics],
        "matrix": [{"topic_slug": t, "school_slug": s, "doc_count": c}
                   for (t, s), c in sorted(counts.items())],
        "documents": manifest_docs,
    }
    json.dump(manifest, open(mpath, "w", encoding="utf-8"), indent=2, ensure_ascii=False)

    # Rebuild docs index
    idx = ["# .claude/docs — Distilled Research Notes\n",
           "Consolidated, cheap-to-read markdown distilled from the raw PDFs in "
           "`source-material/`. One note per **school × topic**. Machine-readable "
           "manifest: `src/data/schools.json`.\n", "## Notes by topic\n"]
    for t in all_topics:
        idx.append(f"\n### {pretty(t, TOPIC_NAMES)} (`{t}/`)\n")
        for s in all_schools:
            if (t, s) in counts:
                idx.append(f"- [{pretty(s, SCHOOL_NAMES)}]({t}/{s}.md) — {counts[(t, s)]} docs")
    idx.append(f"\n\n## Data layer\n- `src/data/schools.json` — {len(manifest_docs)} documents "
               f"across {len(all_topics)} topics and {len(all_schools)} schools.\n")
    open(os.path.join(DOCS, "INDEX.md"), "w", encoding="utf-8").write("\n".join(idx))

    print(f"Rebuilt {len(counts)} school×topic notes, {len(manifest_docs)} documents "
          f"({'topic: '+only if only else 'all topics'}).")

if __name__ == "__main__":
    main()
