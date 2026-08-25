# citebackfill — measurement data

Committed 2026-08-24 so the `citebackfill` plan's numbers are reproducible rather
than trusted, and so a fresh window does not re-derive them (or "correct" them
back to the plan's original, wrong figures).

| File | What it is |
|---|---|
| `count_cites.py` | Wrap-aware count of name-only `[Source(s): …]` cites. Prints 279 `sports` / 101 `student-clubs`. **A single-line `grep` reports 179/53** by missing every cite that wraps across a line — that is where the original plan's numbers came from. |
| `harvest_urls.py` | Pulls the labelled URLs already present in the docs' per-section `Source List` blocks — 384 in `sports`, 495 across both topics. Handles the two pdfplumber extraction traps (wrapped URLs; the dropped trailing `)` on Wikipedia slugs). |
| `probe-2026-08-24.txt` | Live HTTP probe of the 122 URLs matched to a cite, on 2026-08-24: 101×200, 7×403, 12×404, 1×410, 1×406. The 403/406 are **bot-blocks on live pages**, not dead links. |

Both scripts are standalone — run from the repo root, no arguments needed:

```bash
python3 .claude/plans/citebackfill-data/count_cites.py
python3 .claude/plans/citebackfill-data/harvest_urls.py sports
```
