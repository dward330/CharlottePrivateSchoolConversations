#!/usr/bin/env python3
"""Wrap-aware count of name-only [Source(s): ...] cites in .claude/docs/<topic>/.

WHY THIS EXISTS: the obvious one-liner

    grep -roh "\\[Sources\\?:[^]]*\\]" .claude/docs/$t/*.md | grep -vc http

undercounts badly. pdfplumber wraps a cite across lines, and a single-line grep
cannot match a bracket spanning a newline. That grep reports 179/53; the true
figures are 279/101. Count per PARAGRAPH, not per line.

Usage:  python3 .claude/plans/citebackfill-data/count_cites.py
"""
import re, glob, os, sys, collections

TOPICS = ['sports', 'student-clubs']
CITE = re.compile(r'\[Sources?:[^\]]{0,400}?\]')


def cites_in(path):
    """Yield every cite in a file, joining wrapped lines within each paragraph."""
    text = open(path, encoding='utf-8').read()
    for para in re.split(r'\n\s*\n', text):
        joined = re.sub(r'\s*\n\s*', ' ', para)
        yield from CITE.findall(joined)


def split_sources(cite):
    """A cite may name several sources separated by ';'. Split and clean them."""
    body = re.sub(r'^\[Sources?:\s*', '', cite).rstrip(']')
    out = []
    for part in body.split(';'):
        p = re.sub(r'^Sources?:\s*', '', part.strip()).strip(' .')
        # drop a trailing methodology note: "Awards page (histories). Note: ..."
        p = re.split(r'(?<=[a-z\)])\.\s+(?=[A-Z])', p)[0].strip(' .')
        if p:
            out.append(p)
    return out


def main():
    grand_named = 0
    distinct_all = set()
    for topic in TOPICS:
        n_named = n_url = 0
        per_file = []
        for f in sorted(glob.glob(f'.claude/docs/{topic}/*.md')):
            named = []
            for c in cites_in(f):
                if 'http' in c:
                    n_url += 1
                else:
                    named.append(c)
            n_named += len(named)
            distinct = set()
            for c in named:
                for s in split_sources(c):
                    distinct.add(s)
                    distinct_all.add((topic, s))
            if named:
                per_file.append((os.path.basename(f)[:-3], len(named), len(distinct)))
        print(f'{topic}: name-only={n_named}  with-url={n_url}')
        for name, n, d in per_file:
            print(f'    {name:28s} cites={n:4d}  distinct={d}')
        grand_named += n_named
    print(f'\nTOTAL name-only cites: {grand_named}')
    print(f'TOTAL distinct (topic, source) pairs: {len(distinct_all)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
