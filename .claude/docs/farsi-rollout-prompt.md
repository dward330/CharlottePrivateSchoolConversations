Start the Farsi (fa) research-prose rollout — the seventh language after
English, Spanish, Bangla, Haitian Creole, Telugu and French.

Standing permissions for this whole rollout, so you don't stop to ask:
- Run any bash command you need.
- Edit any .md file — including CLAUDE.md, the rollout docs and
  src/data/overlays/NOTES.md.
- Use PRs, not direct pushes to main: branch, `gh pr create`, then squash-merge
  and delete the branch yourself. Check out main and pull after merging.

Read the docs first and don't re-derive the method:
- .claude/docs/prose-translation-bn.md — closest precedent on SCRIPT. Non-Latin,
  declared font, and it front-loads a typography spike. It opens with a START
  HERE block.
- .claude/docs/prose-translation-fr.md — most recent, and §4 is the one to read
  even though French is Latin-script: it records four print-out defects, three
  of which were NOT French-specific.
- prose-translation-architecture.md — the language-independent mechanism. §4
  flags RTL as "the one real unknown" and says it deserves its own
  investigation. That investigation is this rollout.

Phase 0 is partly done — confirm these, don't re-derive them:
- fa is already in SUPPORTED and declares font 'Noto Naskh Arabic', shared with
  Arabic. Direction is rtl (Intl.Locale('fa').getTextInfo().direction).
- The ffi ligature guard in src/index.css is Latin-only and irrelevant here, but
  DO NOT remove it — Arabic script is obligatorily cursive and Naskh has its own
  shaping behaviour, which is a separate question from font-variant-ligatures.

**fa is the first RTL locale to reach PROSE_TRANSLATED, and that is the whole
point of this rollout.** Adding fa to that list silently retires this rule in
src/index.css:

    :root[dir='rtl'][data-prose='en'] main { direction: ltr; unicode-bidi: isolate; }

It is keyed off data-prose, so it stops applying on its own the moment fa lands
in PROSE_TRANSLATED — no cleanup task, by design. **Nobody has ever seen the
state on the other side of it.** Every RTL page to date has rendered LTR-pinned
English prose. Treat "what the page looks like once that pin lifts" as the
central risk of this rollout, not an afterthought, and plan a spike for it
BEFORE translating a single topic.

Two figure decisions are genuinely new and I need to make them, so raise both
before translating and wait for my call. Don't copy any existing locale's line
reflexively — bn and te were deliberately opposite, and fr was a third answer.

  1. DIGITS. Intl formats fa with Eastern Arabic numerals: 3,683,971 renders
     ۳٬۶۸۳٬۹۷۱. This is the exact defect the Bangla print-out caught (৩৬,৩২৫)
     and it is why bn is the sole FIGURE_SAFE_NUMBERS entry. Note fa-u-nu-latn
     exists and gives Western digits.
  2. SEPARATOR. fa groups 3-3-3 — boundaries do NOT move, unlike bn/te lakh —
     but the separator is U+066C ARABIC THOUSANDS SEPARATOR, not a comma. So fa
     is bn on digits and French on grouping. Whether that combination warrants
     the list is a real question, not a lookup.

Also flag anything the RTL direction forces on figures that the LTR locales
never exercised — a $ figure inside RTL prose is a bidi question, not just a
formatting one.

Then tell me the register question and wait on that too (I expect formal/written
Persian for a parent-facing school corpus, but confirm the reasoning and flag
anything it forces). Note that Farsi's register axis is NOT French's: the
relevant tension is formal written Persian vs colloquial Tehrani, and whether
Arabic-derived formal vocabulary reads as educated or as stilted.

Standing constraints: currency stays USD and amounts are never re-typed —
formatting only, never conversion. No rial, no toman, no exchange rate, no dual
display. Institution names, AP/Honors and platform names stay Latin.

Farsi-specific trap to watch for, analogous to French's: the corpus contains no
Persian-language course names, so fa does NOT inherit the French identifier
problem. Its analogue is DIRECTIONAL — a Latin-script identifier (Upper School,
AP Calculus BC, Charlotte Latin) embedded in an RTL sentence is a bidi
boundary, and those are where reordering artefacts show up. Check the rendered
page for identifiers that survived the string check but display scrambled.

Run the per-topic loop with the figure sweep after each topic.

Print-outs are load-bearing, not ceremony. Every defect in the last four
rollouts was render-layer and invisible to every checker, and three of French's
four were not even French-specific. Do them in a real browser, on at least two
schools (Charlotte Latin and Providence Day), with all panels expanded, and
check an unabbreviated 7-digit figure. Grep the RENDERED page for English
sentences in table cells, chips and source lines.

Two checks exist now that did not during earlier rollouts — run them, and expect
`npm run check:money` and `npm run check:currency` to have opinions about a
locale whose digits are non-Western. Also `npm run check:runtime`, which catches
overlays that silently render English at 100% coverage.
