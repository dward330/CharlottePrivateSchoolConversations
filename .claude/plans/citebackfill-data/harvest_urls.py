#!/usr/bin/env python3
"""Harvest the labelled URLs already present in .claude/docs/<topic>/*.md.

WHY THIS EXISTS: the citebackfill plan originally assumed every URL had to be
re-found on the web. It does not. The same PDFs that emit `[Source: <name>]`
also emit a per-section "Source List" block holding the URLs, a few lines below.
This script pulls those out so a sidecar can be built from the repo first, and
the web is only needed for the remainder.

TWO EXTRACTION TRAPS, both of which produced dead URLs on the first attempt:

  1. pdfplumber WRAPS a long URL across lines. The continuation line must be
     rejoined or you get a truncated 404.
  2. A naive `[^\\s\\)\\]]+` URL regex drops the trailing ')' of a Wikipedia
     disambiguation slug. `..._(basketball` 404s; `..._(basketball)` is 200.

Usage:  python3 .claude/plans/citebackfill-data/harvest_urls.py [topic ...]
Prints:  <topic>/<school> <TAB> <url> <TAB> <label found to the left of the url>
"""
import re, glob, os, sys

DEFAULT_TOPICS = ['sports', 'student-clubs']
URL = re.compile(r'https?://[^\s\]<>"]+')
CONT = re.compile(r"^[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]+$")


def unwrap(text):
    """Rejoin URLs that pdfplumber split across a line break."""
    lines = text.split('\n')
    out, i = [], 0
    while i < len(lines):
        cur = lines[i]
        while re.search(r'https?://\S+$', cur) and i + 1 < len(lines):
            nxt = lines[i + 1].strip()
            if (nxt and ' ' not in nxt and CONT.match(nxt)
                    and not nxt.startswith(('(cid:', '#', '|', '*', '-', '['))):
                cur += nxt
                i += 1
            else:
                break
        out.append(cur)
        i += 1
    return '\n'.join(out)


def clean(url):
    url = url.rstrip('.,;·')
    # keep a balanced ')' (Wikipedia slugs) but drop an unbalanced one
    while url.endswith(')') and url.count('(') < url.count(')'):
        url = url[:-1]
    return url.rstrip('.,;')


def harvest(path):
    """Return {url: label} for every URL in the file."""
    found = {}
    for line in unwrap(open(path, encoding='utf-8').read()).split('\n'):
        m = URL.search(line)
        if not m:
            continue
        url = clean(m.group(0))
        label = re.sub(r'^\(cid:\d+\)\s*', '', line[:m.start()]).strip(' —-:|*').strip()
        found.setdefault(url, label)
    return found


def main(argv):
    topics = argv[1:] or DEFAULT_TOPICS
    total = 0
    for topic in topics:
        for f in sorted(glob.glob(f'.claude/docs/{topic}/*.md')):
            school = os.path.basename(f)[:-3]
            for url, label in sorted(harvest(f).items()):
                print(f'{topic}/{school}\t{url}\t{label}')
                total += 1
    print(f'# {total} URLs harvested', file=sys.stderr)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
