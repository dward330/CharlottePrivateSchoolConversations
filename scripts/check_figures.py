#!/usr/bin/env python3
"""Figure-integrity sweep for a translation work file.

Every $ figure, percentage and four-digit year in the English `text` must
reappear, byte-identical, in the translated `t`. Coverage checkers cannot see
this class of defect: a string can be 100% translated and still have had
`$30.5M` silently rewritten as "3.05 কোটি ডলার".

Usage:
    python3 scripts/check_figures.py --topic <topic> --lang bn
    python3 scripts/check_figures.py --lang bn            # every work file
"""
import argparse
import glob
import json
import os
import re
import sys
from collections import Counter

# A thousands separator must be followed by more digits, so a figure ending a
# clause ("$470, তা-ও") does not absorb the comma and read as a different figure.
#
# The year pattern is bounded by DIGIT lookarounds, not by \b. Python's \b is
# Unicode-aware, so it requires a non-word character after the digits — and in
# an agglutinative language the case suffix attaches straight to the numeral.
# Telugu writes "in 2005" as "2005లో", where `ల` is a word character, so \b
# failed to match and the sweep reported 18 phantom missing years whose figures
# were in fact present and correct. Guarding on digits keeps the real check
# (12005 must not read as 2005) while letting any script's suffix follow.
FIG = re.compile(r'\$\d{1,3}(?:,\d{3})*(?:\.\d+)?[KM]?|\$\d+(?:\.\d+)?[KM]?'
                 r'|\d+(?:\.\d+)?%|(?<!\d)(?:19|20)\d{2}(?!\d)')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def sweep(path):
    """Return (checked, [(unit, missing_counter)]) for one work file."""
    with open(path, encoding='utf-8') as fh:
        doc = json.load(fh)

    # Prose topics key their units under `strings`; the content-hash extractor
    # (financial-aid-tuition) uses `sections`. Same unit shape either way.
    units = doc.get('strings') or doc.get('sections') or []

    checked = 0
    failures = []
    for unit in units:
        src, tgt = unit['text'], unit.get('t', '')
        if not tgt:
            continue
        checked += 1
        want, got = Counter(FIG.findall(src)), Counter(FIG.findall(tgt))
        missing = want - got
        if missing:
            failures.append((unit, missing))
    return checked, failures


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--topic')
    ap.add_argument('--lang', required=True)
    args = ap.parse_args()

    work = os.path.join(ROOT, 'src', 'data', 'overlays', 'work')
    if args.topic:
        paths = [os.path.join(work, f'{args.topic}.{args.lang}.json')]
        # The content-overlay extractor names its file `<topic>.content.<lang>.json`,
        # so the plain `--topic financial-aid-tuition` spelling that every rollout
        # doc quotes resolves to a path that does not exist. That printed a loud
        # "no such work file" and exited non-zero, so it never shipped a silent
        # pass — but it did send several rollouts hunting a phantom problem.
        # Fall back to the .content spelling rather than making each doc special-case it.
        if not os.path.exists(paths[0]):
            alt = os.path.join(work, f'{args.topic}.content.{args.lang}.json')
            if os.path.exists(alt):
                paths = [alt]
    else:
        paths = sorted(glob.glob(os.path.join(work, f'*.{args.lang}.json')))

    bad = 0
    for path in paths:
        if not os.path.exists(path):
            print(f'✗ no such work file: {path}')
            bad += 1
            continue
        name = os.path.basename(path)
        checked, failures = sweep(path)
        if not failures:
            print(f'  ✓ {name:<40} {checked} translated strings · figures intact')
            continue
        bad += 1
        print(f'  ✗ {name:<40} {checked} checked · {len(failures)} with dropped figures')
        for unit, missing in failures:
            drop = ', '.join(f'{k}×{v}' if v > 1 else k for k, v in missing.items())
            print(f'      at {unit["at"][0]}')
            print(f'      missing: {drop}')
            print(f'      en: {unit["text"][:150]}')
            print(f'      {args.lang}: {unit["t"][:150]}')
            print()

    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
