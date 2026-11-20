# Page-text dump used by plan `consistency`: python3 -I dump_pages.py dist/school <out-dir>
import sys, os, re
from html.parser import HTMLParser
BLOCK={'p','div','li','tr','h1','h2','h3','h4','h5','h6','section','article','summary','details','br','table','ul','ol','dt','dd','header','footer','td','th'}
class P(HTMLParser):
    def __init__(s): super().__init__(); s.out=[]; s.skip=0
    def handle_starttag(s,t,a):
        if t in('script','style'): s.skip+=1
        if t in BLOCK: s.out.append('\n')
        if t in('td','th'): s.out.append(' | ')
    def handle_endtag(s,t):
        if t in('script','style'): s.skip-=1
        if t in BLOCK: s.out.append('\n')
    def handle_data(s,d):
        if not s.skip: s.out.append(d)
src, dst = sys.argv[1], sys.argv[2]
for slug in os.listdir(src):
    f=os.path.join(src,slug,'index.html')
    if not os.path.exists(f): continue
    p=P(); p.feed(open(f).read())
    txt=''.join(p.out)
    txt=re.sub(r'[ \t]+',' ',txt); txt=re.sub(r'\n\s*\n+','\n',txt)
    open(os.path.join(dst,slug+'.txt'),'w').write(txt)
    print(slug, len(txt))
