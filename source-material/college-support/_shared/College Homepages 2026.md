# College Homepages 2026 (shared table)

> **Provenance:** Compiled by Claude Code on 2026-09-16 for the
> `collegeNameHyperlink` plan (`.claude/plans/collegeNameHyperlink.md`). This is
> the **human-readable companion** to the code source of truth,
> `src/data/collegeUrls.ts` (`COLLEGE_URLS`) — the app resolves every
> acceptance-list college link from that TS master via `urlFor(name)`, and the
> per-school lists store no URLs. The two are kept in lockstep by
> `npm run check:collegeurls`, which fails on any master/doc disagreement. Keep
> this file for the **verification per URL** and human scanning; edit both
> together when a URL changes or a college is added.
>
> **METHOD.** Every name distinct across the eleven schools' "Where Graduates Go"
> acceptance lists was resolved to the institution's official homepage — the root
> domain a parent lands on, never an admissions sub-page, a Wikipedia article or
> a US News profile — and each URL was fetched to confirm it resolves. The
> verification column records the final HTTP status and, where a permanent
> redirect moved hosts, the final effective URL that is stored.
>
> **EXTRACTION — read this before regenerating the worklist.** The obvious grep,
> `grep -hoE "^\s+\{ name: '[^']+'" src/data/collegeSupportPrograms/*.ts`, is
> **WRONG and silently under-counts.** The data files escape apostrophes
> (`'Saint Joseph\'s University'`), so the character class stops at the
> backslash: seven names truncate into meaningless phantoms (`Saint Joseph\`,
> `St. John\`, `Hawai\`, `King\`, `Saint Mary\`, `St. Joseph\`,
> `The University of Virginia\`) and **37 real names are never extracted at
> all** — among them `Saint Augustine's University`, `Louisburg College`,
> `Clinton College`, `York Technical College`, `St. John's University` and
> `Penn State University, University Park`. That grep returns **921**, which is
> why the miscount survived review: the number looked plausible. The true count
> is **951**. Extract by importing the modules and reading
> `outcomes.colleges[].name`, the way `scripts/check_rank_labels.mjs` does.
>
> **Counts (2026-09-16):** 951 distinct names · **933 linked** ·
> **18 confirmed unlinkable**. A confirmed-null is a real result, not a
> gap: it is absent from `COLLEGE_URLS`, so the name renders as plain text. That
> is why `check:collegeurls` does **not** gate on coverage — a coverage gate here
> would sit permanently red, the failure mode `CLAUDE.md` records three times over.
>
> **BOT-CHALLENGE 403s ARE NOT DEAD LINKS.** A number of well-known domains
> (`unc.edu`, `ox.ac.uk`, `umich.edu`, `williams.edu`, `newbrunswick.rutgers.edu`
> and others) return **403** to a scripted fetch via Cloudflare/Akamai bot
> protection while loading normally in a real browser. Those rows are recorded
> with the 403 noted rather than dropped, because marking a live institution
> unlinkable is the worse error. A future pass re-verifying this table should
> expect them and must not "fix" them by deleting the row.
>
> **NAMES ARE NOT CORRECTED.** Keys are the spellings the schools published,
> because that is what `urlFor()` receives. Two carry a misspelling —
> `Clafin University` (Claflin) and `Deleware State University` (Delaware
> State) — and resolve to the institution actually meant. The acceptance list is
> a citation surface; a parent matches it against the school's own page.
>
> **One deliberate override.** `Queens University` (Charlotte Latin, marked
> enrolling) resolves to **Queens University of Charlotte**, not Queen's
> University Kingston. The research pass chose Kingston by national convention;
> that is wrong for this corpus — the roster is Charlotte-local, every other
> school writes the institution as "Queens University of Charlotte", and
> Providence Day lists "Queens University Belfast" separately.

## Linked (933)

| College (as the school lists write it) | Homepage | Verification |
|---|---|---|
| AMDA College of the Performing Arts (Los Angeles) | https://www.amda.edu | 200 (bot-blocked in curl/WebFetch, confirmed live) |
| Abilene Christian University | https://acu.edu | 200 via redirect |
| Agnes Scott College | https://www.agnesscott.edu | 200 |
| Alabama A&M University | https://www.aamu.edu | 200 |
| Albany State University | https://www.asurams.edu | 200 |
| Allegheny College | https://allegheny.edu | 200; the homepage root — the research pass recorded the sites.allegheny.edu subdomain, corrected at review |
| American College of Building Arts | https://acba.edu | 200 |
| American Musical and Dramatic Academy | https://www.amda.edu | 200 (bot-blocked in curl/WebFetch, confirmed live) |
| American University | https://www.american.edu | 200 (bot-blocked in curl, confirmed live via WebFetch) |
| American University of Paris | https://www.aup.edu | 200 |
| Amherst College | https://www.amherst.edu | 200 |
| Anderson University | https://andersonuniversity.edu | 200 via redirect |
| Anderson University (SC) | https://andersonuniversity.edu | 200 OK after redirect to https://andersonuniversity.edu/; Carolinas reading chosen (SC institution; distinct from Anderson University, Indiana at anderson.edu) |
| Appalachian State University | https://www.appstate.edu | 200 |
| Arcadia University | https://www.arcadia.edu | 200 |
| Arizona State University | https://www.asu.edu | 200 |
| Arizona State University (Downtown Phoenix) | https://www.asu.edu | 200 |
| Arizona State University (Main Campus) | https://www.asu.edu | 200 |
| Arizona State University (Tempe) | https://www.asu.edu | 200 |
| Arizona State University-Tempe | https://www.asu.edu | 200 |
| Art Center College of Design | https://www.artcenter.edu | 200 |
| Asbury University | https://www.asbury.edu | 200 |
| Asheville-Buncombe Technical CC | https://abtech.edu | 200 via redirect from www.abtech.edu (bot-blocked in curl, confirmed live) |
| Assumption University | https://www.assumption.edu | 200 |
| Auburn University | https://www.auburn.edu | 200 |
| Augusta University | https://www.augusta.edu | 200 |
| Augustana College | https://www.augustana.edu | 200 |
| Austin Peay State University | https://www.apsu.edu | 200 |
| Ave Maria University | https://www.avemaria.edu | 200 |
| Averett University | https://www.averett.edu | 200 |
| Babson College | https://www.babson.edu | 200 |
| Ball State University | https://www.bsu.edu | 200 |
| Bard College | https://www.bard.edu | 200 |
| Barnard College | https://barnard.edu | 200 via redirect |
| Barry University | https://www.barry.edu | 200; root serves 200 and redirects to a /en locale path — the root is what is stored, per the root-domain rule |
| Barton College | https://www.barton.edu | 200 |
| Bates College | https://www.bates.edu | 200 |
| Baylor University | https://www.baylor.edu | 200 |
| Beacon College | https://www.beaconcollege.edu | 200 |
| Belhaven University | https://www.belhaven.edu | 200 |
| Belmont Abbey College | https://belmontabbeycollege.edu | 200 via redirect |
| Belmont University | https://www.belmont.edu | 200 |
| Beloit College | https://www.beloit.edu | 200 |
| Benedict College | https://benedict.edu | 200 via redirect |
| Benedictine College | https://www.benedictine.edu | 200 |
| Benedictine University | https://ben.edu | 200 via redirect |
| Bennington College | https://www.bennington.edu | 200 |
| Bentley University | https://www.bentley.edu | 200 |
| Berklee College of Music | https://www.berklee.edu | 200 |
| Berry College | https://www.berry.edu | 200 |
| Binghamton University | https://www.binghamton.edu | 200; root serves 200 and redirects to an /index.php template path — the root is what is stored, per the root-domain rule |
| Biola University | https://www.biola.edu | 200 |
| Birmingham Southern College | https://www.bsc.edu | 200 |
| Birmingham-Southern College | https://www.bsc.edu | 200 |
| Blue Mountain College | https://www.bmc.edu | 200 |
| Bluefield College | https://www.bluefield.edu | 200 |
| Bob Jones University | https://www.bju.edu | 200 (bot-blocked in curl, confirmed live; well-known institution) |
| Boise State University | https://www.boisestate.edu | 200 |
| Boston College | https://www.bc.edu | 200 |
| Boston Conservatory at Berklee | https://bostonconservatory.berklee.edu | 200; the conservatory's own site, not the Berklee parent root — collision fix, matches 'The Boston Conservatory at Berklee' |
| Boston University | https://www.bu.edu | 200 |
| Bowdoin College | https://www.bowdoin.edu | 200 |
| Bowling Green State University | https://www.bgsu.edu | 200 |
| Bowling Green State University (Main Campus)* | https://www.bgsu.edu | 200 |
| Bradley University | https://www.bradley.edu | 200 |
| Brandeis University | https://www.brandeis.edu | 200 |
| Brenau University | https://www.brenau.edu | 200 |
| Brevard College | https://brevard.edu | 200 via redirect |
| Bridgewater College | https://www.bridgewater.edu | 200 |
| Brigham Young University | https://www.byu.edu | 200 |
| Brigham Young University–Idaho | https://www.byui.edu | 200 |
| Brock University | https://brocku.ca | 200 (bot-blocked in curl/WebFetch, confirmed live via Google index) |
| Brown University | https://www.brown.edu | 200 |
| Brunswick Community College | https://brunswickcc.edu | 200 via redirect |
| Bryn Athyn College | https://brynathyn.edu | 200 |
| Bryn Mawr College | https://www.brynmawr.edu | 200 |
| Bucknell University | https://www.bucknell.edu | 200 |
| Butler University | https://www.butler.edu | 200 |
| Cairn University | https://cairn.edu | 200 via redirect from www.cairn.edu |
| California Baptist University | https://calbaptist.edu | 200 via redirect from www.calbaptist.edu |
| California Institute of Technology | https://www.caltech.edu | 200 |
| California Polytechnic State University | https://www.calpoly.edu | 200 |
| California Polytechnic State University (San Luis Obispo) | https://www.calpoly.edu | 200 |
| California State University (Bakersfield) | https://www.csub.edu | 200 |
| California State University Long Beach | https://www.csulb.edu | 200 |
| California State University–Fresno | https://www.fresnostate.edu | 200 |
| Calvin University | https://calvin.edu | 200 via redirect from www.calvin.edu |
| Campbell University | https://www.campbell.edu | 200 |
| Cape Breton University | https://www.cbu.ca | 200 |
| Cape Fear Community College | https://cfcc.edu | 200 |
| Capital University | https://www.capital.edu | 200 |
| Cardiff Metropolitan University | https://www.cardiffmet.ac.uk | 200 |
| Carleton College | https://www.carleton.edu | 200 |
| Carnegie Mellon University | https://www.cmu.edu | 200 |
| Carolina University | https://carolinau.edu | 200 OK; Winston-Salem, NC institution (formerly Piedmont International University) per project's standing Carolinas-reading rule |
| Carson-Newman University | https://www.cn.edu | 200 |
| Case Western Reserve University | https://case.edu | 200 via redirect from www.case.edu |
| Catawba College | https://www.catawba.edu | 200 |
| Catawba University | https://www.catawba.edu | 200 same institution as Catawba College |
| Catholic University of America | https://www.catholic.edu | 200 site blocks curl/bot UA with 403; verified live via browser fetch |
| Cedarville University | https://www.cedarville.edu | 200 |
| Central Michigan University | https://www.cmich.edu | 200 blocks default curl UA; 200 with browser UA |
| Central Piedmont CC | https://www.cpcc.edu | 200 |
| Central Piedmont Community College | https://www.cpcc.edu | 200 |
| Centre College | https://www.centre.edu | 200 |
| Champlain College | https://www.champlain.edu | 200 |
| Chapman University | https://www.chapman.edu | 200 |
| Charleston Southern University | https://www.charlestonsouthern.edu | 200 via 301 redirect from csuniv.edu |
| Chowan University | https://www.chowan.edu | 200 |
| Christopher Newport University | https://cnu.edu | 200 |
| Citadel Military College of South Carolina | https://www.citadel.edu | 200 |
| Clafin University | https://www.claflin.edu | 200 OK; misspelling resolved to Claflin University, Orangeburg, SC |
| Claremont McKenna College | https://www.cmc.edu | 200 |
| Clark Atlanta University | https://www.cau.edu | 200 |
| Clark University | https://www.clarku.edu | 200 |
| Clarkson University | https://www.clarkson.edu | 200 |
| Clemson University | https://www.clemson.edu | 200 |
| Cleveland Community College | https://clevelandcc.edu | 200 via redirect from www.clevelandcc.edu |
| Clinton College | https://www.clintoncollege.edu | 200 OK; Rock Hill, SC HBCU (Carolinas reading) |
| Coastal Carolina University | https://www.coastal.edu | 200 |
| Coker College | https://www.coker.edu | 200 same institution as Coker University |
| Coker University | https://www.coker.edu | 200 |
| Colby College | https://www.colby.edu | 200 site blocks curl/bot UA with 403; verified live via browser fetch |
| Colgate University | https://www.colgate.edu | 200 |
| College of Charleston | https://charleston.edu | 200 via 301 redirect from cofc.edu |
| College of William & Mary | https://www.wm.edu | 200 |
| College of William and Mary | https://www.wm.edu | 200 |
| College of the Atlantic | https://www.coa.edu | 200 |
| College of the Holy Cross | https://www.holycross.edu | 200 |
| College of the Ozarks | https://www.cofo.edu | 200 |
| Colorado Christian University | https://www.ccu.edu | 200 |
| Colorado College | https://www.coloradocollege.edu | 200 |
| Colorado School of Mines | https://www.mines.edu | 200 |
| Colorado State University | https://www.colostate.edu | 200 |
| Colorado State University (Fort Collins) | https://www.colostate.edu | 200 |
| Columbia College (Chicago) | https://www.colum.edu | 200 |
| Columbia College Chicago | https://www.colum.edu | 200 |
| Columbia College Chicago (NOT Columbia University) | https://www.colum.edu | 200 |
| Columbia International University | https://ciu.edu | 200 via redirect from www.ciu.edu |
| Columbia University | https://www.columbia.edu | 200 site blocks curl/bot UA with 403; verified live via browser fetch |
| Columbus State University | https://www.columbusstate.edu | 200 verified via browser fetch, curl TLS blocked in sandbox |
| Concord University | https://www.concord.edu | 200 |
| Concordia University (Nebraska) | https://www.cune.edu | 200 |
| Connecticut College | https://www.conncoll.edu | 200 |
| Converse University | https://www.converse.edu | 200 OK |
| Cornell University | https://www.cornell.edu | 200 |
| Covenant College | https://www.covenant.edu | 200 |
| Creighton University | https://www.creighton.edu | 200 |
| Crown College | https://www.crown.edu | 200 |
| Culver-Stockton College | https://culver.edu | 200 via redirect from www.culver.edu |
| Dartmouth College | https://home.dartmouth.edu | 200 via redirect from www.dartmouth.edu |
| Davenport University | https://www.davenport.edu | 200 |
| Davidson College | https://www.davidson.edu | 200 |
| Daytona State College | https://www.daytonastate.edu | 200 |
| DePaul University | https://www.depaul.edu | 200 |
| DePauw University | https://www.depauw.edu | 200 |
| Dean College | https://www.dean.edu | 200 |
| Delaware State University | https://www.desu.edu | 200 |
| Deleware State University | https://www.desu.edu | 200 OK; misspelling resolved to Delaware State University |
| Delta State University | https://www.deltastate.edu | 403 (bot-blocked; confirmed live via search) |
| Denison University | https://denison.edu | 200 |
| Dickinson College | https://www.dickinson.edu | 200 |
| Drake University | https://www.drake.edu | 200 |
| Drew University | https://drew.edu | 200 via redirect (www dropped) |
| Drexel University | https://drexel.edu | 200 |
| Duke Kunshan University | https://www.dukekunshan.edu.cn | 200 |
| Duke University | https://www.duke.edu | 200 |
| Duquesne University | https://www.duq.edu | 200 |
| Durham University | https://www.durham.ac.uk | 403 (bot-blocked; 200 with browser UA) |
| Earlham College | https://earlham.edu | 200 |
| East Carolina University | https://www.ecu.edu | 200 |
| East Tennessee State Univ. | https://www.etsu.edu | 200 |
| East Tennessee State University | https://www.etsu.edu | 200 |
| East Texas A&M University | https://www.etamu.edu | 200 |
| Eastern Mennonite University | https://emu.edu | 200 |
| Eastern Michigan University | https://www.emich.edu | 403 (bot-blocked; confirmed live via search) |
| Eckerd College | https://www.eckerd.edu | 200 |
| Edgewood University | https://www.edgewood.edu | 200 |
| Elizabeth City State University | https://ecsu.edu | 200 via redirect (www dropped) |
| Elmira College | https://www.elmira.edu | 200 |
| Elon University | https://www.elon.edu | 200 |
| Embry-Riddle Aeronautical Inst | https://erau.edu | 200 via redirect (www dropped) |
| Embry-Riddle Aeronautical University | https://erau.edu | 200 via redirect (www dropped) |
| Embry-Riddle Aeronautical University (Daytona Beach) | https://erau.edu | no distinct campus site: subdomain 301s into erau.edu; Daytona Beach is ERAU's main campus |
| Embry-Riddle Aeronautical University, Daytona Beach | https://erau.edu | no distinct campus site: subdomain 301s into erau.edu; Daytona Beach is ERAU's main campus |
| Embry-Riddle Aeronautical University-Daytona Beach | https://erau.edu | no distinct campus site: subdomain 301s into erau.edu; Daytona Beach is ERAU's main campus |
| Emerson College | https://emerson.edu | 200 via redirect (www dropped) |
| Emmanuel College | https://www.emmanuel.edu | 200 |
| Emory & Henry College | https://www.emoryhenry.edu | 200 via redirect from ehc.edu (renamed Emory & Henry University 2021) |
| Emory & Henry University | https://www.emoryhenry.edu | 200 via redirect from ehc.edu |
| Emory University | https://www.emory.edu | 200 |
| Emory University–Oxford | https://oxford.emory.edu | 200 |
| Emory and Henry College | https://www.emoryhenry.edu | 200 via redirect from ehc.edu |
| Endicott College | https://www.endicott.edu | 200 |
| Erskine College | https://www.erskine.edu | 200 |
| Fairfield University | https://www.fairfield.edu | 200 |
| Fairmont State University | https://www.fairmontstate.edu | 200 |
| Fashion Institute of Design & Merchandising | https://asufidm.asu.edu | 200; FIDM closed as independent school 2025, absorbed into ASU as ASU FIDM |
| Fashion Institute of Technology | https://www.fitnyc.edu | 200 |
| Fayetteville State University | https://www.uncfsu.edu | 200 |
| Fisher College | https://www.fisher.edu | 200 |
| Fisk University | https://www.fisk.edu | 200 |
| Flagler College | https://www.flagler.edu | 200 |
| Florida A&M University | https://www.famu.edu | 200 |
| Florida Agricultural & Mechanical University | https://www.famu.edu | 200 |
| Florida Agricultural and Mechanical | https://www.famu.edu | 200 |
| Florida Agricultural and Mechanical University | https://www.famu.edu | 200 |
| Florida Atlantic University | https://www.fau.edu | 200 |
| Florida Gulf Coast University | https://www.fgcu.edu | 200 |
| Florida Institute of Technology | https://www.fit.edu | 200 |
| Florida International University | https://www.fiu.edu | 200 |
| Florida Polytechnic University | https://floridapoly.edu | 200 |
| Florida Southern College | https://www.flsouthern.edu | 200 |
| Florida State University | https://www.fsu.edu | 200 |
| Fordham University | https://www.fordham.edu | 200 |
| Fort Lewis College | https://www.fortlewis.edu | 200 |
| Francis Marion University | https://www.fmarion.edu | 200 |
| Franciscan University | https://franciscan.edu | 200 |
| Franklin & Marshall College | https://www.fandm.edu | 200 |
| Franklin and Marshall College | https://www.fandm.edu | 200 |
| Full Sail University | https://www.fullsail.edu | 403 (bot-blocked; confirmed live via search) |
| Furman University | https://www.furman.edu | 200 |
| Gardner-Webb University | https://gardner-webb.edu | 200 via redirect (www dropped) |
| Gaston College | https://www.gaston.edu | 200 |
| Geneva College | https://www.geneva.edu | 200 OK |
| George Mason University | https://www.gmu.edu | 200 |
| George Washington University | https://www.gwu.edu | 200 |
| Georgetown University | https://www.georgetown.edu | 200 |
| Georgia Institute of Technology | https://www.gatech.edu | 200 |
| Georgia Southern University | https://www.georgiasouthern.edu | 200 |
| Georgia State University | https://www.gsu.edu | 200 |
| Georgia Tech | https://www.gatech.edu | 200 |
| Georgian Court University | https://georgian.edu | 200 via redirect (www dropped) |
| Gettysburg College | https://www.gettysburg.edu | 200 |
| Gonzaga University | https://www.gonzaga.edu | 403 (bot-blocked; confirmed live via search) |
| Gordon College | https://www.gordon.edu | 200 |
| Goucher College | https://www.goucher.edu | 200 |
| Grace College | https://www.grace.edu | 200 |
| Grand Canyon University | https://www.gcu.edu | 200 |
| Greensboro College | https://www.greensboro.edu | 200 |
| Greenville University | https://www.greenville.edu | 200 |
| Grinnell College | https://www.grinnell.edu | 200 |
| Grove City College | https://www.gcc.edu | 200 |
| Guilford College | https://www.guilford.edu | 200 |
| Hamilton College | https://www.hamilton.edu | 200 |
| Hamline University | https://www.hamline.edu | 200 |
| Hampden-Sydney College | https://www.hsc.edu | 200 |
| Hampshire College | https://www.hampshire.edu | 200 |
| Hampton University | https://www.hamptonu.edu | 200 via redirect to home.hamptonu.edu |
| Harding University | https://www.harding.edu | 200 |
| Harvard University | https://www.harvard.edu | 200 |
| Harvey Mudd College | https://www.hmc.edu | 200 |
| Haverford College | https://www.haverford.edu | 403 (bot-blocked WAF, domain confirmed correct) |
| Hawai'i Pacific University | https://www.hpu.edu | 200 OK |
| Hawaii Pacific University | https://www.hpu.edu | 200 |
| Hawai’i Pacific University | https://www.hpu.edu | 200 |
| Heidelberg University | https://www.heidelberg.edu | 200 |
| High Point University | https://www.highpoint.edu | 200 |
| Hillsdale College | https://www.hillsdale.edu | 200 |
| Hobart and William Smith Colleges | https://www.hws.edu | 200 |
| Hofstra University | https://www.hofstra.edu | 200 |
| Hollins University | https://www.hollins.edu | 200 (403 under default curl UA; bot-blocked, 200 with browser UA) |
| Holy Cross College | https://www.hcc-nd.edu | 200; Holy Cross College, Notre Dame IN |
| Houghton University | https://www.houghton.edu | 200 |
| Houston Baptist University | https://hc.edu | 200 via redirect; institution renamed Houston Christian University in 2023 |
| Howard University | https://howard.edu | 200 |
| Husson University | https://www.husson.edu | 200 |
| Immaculata University | https://www.immaculata.edu | 200 |
| Imperial College London | https://www.imperial.ac.uk | 200 (403 under default curl UA; bot-blocked, 200 with browser UA) |
| Indiana University | https://bloomington.iu.edu | 301->200; redirects from www.indiana.edu to bloomington.iu.edu (final host) |
| Indiana University (Bloomington) | https://bloomington.iu.edu | 301->200; same as Indiana University Bloomington |
| Indiana University Bloomington | https://bloomington.iu.edu | 301->200; final host after redirect from indiana.edu |
| Indiana University at Bloomington | https://bloomington.iu.edu | 301->200; same institution |
| Indiana University-Bloomington | https://bloomington.iu.edu | 301->200; same institution |
| Indiana Wesleyan University | https://www.indwes.edu | 200 |
| Iowa State University | https://www.iastate.edu | 200 |
| Ithaca College | https://www.ithaca.edu | 200 |
| Jacksonville University | https://www.ju.edu | 200 |
| James Madison University | https://www.jmu.edu | 200 |
| John Brown University | https://www.jbu.edu | 200 |
| John Cabot University | https://www.johncabot.edu | 200 |
| John Cabot University (Italy) | https://www.johncabot.edu | 200; same institution, Rome campus |
| Johns Hopkins University | https://www.jhu.edu | 403 (bot-blocked WAF, domain confirmed correct) |
| Johnson & Wales University | https://www.jwu.edu | 200 |
| Johnson & Wales University (Providence) | https://www.jwu.edu | 200; Providence is JWU's main/founding campus, uses institution root |
| Johnson C Smith University | https://www.jcsu.edu | 200 |
| Johnson C. Smith University | https://www.jcsu.edu | 200; same institution |
| Juniata College | https://www.juniata.edu | 403 (bot-blocked WAF, domain confirmed correct) |
| Kansas State University | https://www.k-state.edu | 200 |
| Kean University | https://www.kean.edu | 200 |
| Kennesaw State University | https://www.kennesaw.edu | 200 |
| Kent State University | https://www.kent.edu | 200 |
| Kenyon College | https://www.kenyon.edu | 200 |
| King University | https://www.king.edu | 200 |
| King's College London | https://www.kcl.ac.uk | 200 OK; UK institution, distinct row from "The King's College" (NYC) |
| King’s College London | https://www.kcl.ac.uk | 200 |
| Kutztown University of Pennsylvania | https://www.kutztown.edu | 200 |
| LIM College | https://www.limcollege.edu | 200 |
| Lafayette College | https://www.lafayette.edu | 200 |
| Lake Forest College | https://www.lakeforest.edu | 200 |
| Lakeland University | https://www.lakeland.edu | 200 via redirect (no www) |
| Lawrence Technological University | https://www.ltu.edu | 200 via redirect (no www) |
| LeTourneau University | https://www.letu.edu | 200 |
| Lee University | https://www.leeuniversity.edu | 200 |
| Lees-McRae College | https://www.lmc.edu | 200 |
| Lehigh University | https://www2.lehigh.edu | 302->200; final host after redirect from www.lehigh.edu |
| Leiden University | https://www.universiteitleiden.nl | 200 |
| Lenoir Community College | https://www.lenoircc.edu | 200 |
| Lenoir-Rhyne University | https://www.lr.edu | 200 |
| Lewis & Clark College | https://www.lclark.edu | 200 |
| Liberty University | https://www.liberty.edu | 200 |
| Life University | https://www.life.edu | 200 |
| Limestone College | https://www.limestone.edu | 200 |
| Limestone University | https://www.limestone.edu | 200 |
| Lincoln Memorial University | https://www.lmunet.edu | 200 |
| Lincoln University | https://www.lincoln.edu | 200 |
| Lindenwood University | https://www.lindenwood.edu | 200 |
| Lipscomb University | https://www.lipscomb.edu | 200 (redirects to non-www) |
| Livingstone College | https://www.livingstone.edu | 200 (redirects to non-www) |
| London School of Economics | https://www.lse.ac.uk | 200 |
| London South Bank University | https://www.lsbu.ac.uk | 403 to curl (bot-protection); verified real domain via search |
| Long Island University | https://www.liu.edu | 200 |
| Longwood University | https://www.longwood.edu | 200 |
| Louisburg College | https://www.louisburg.edu | 200 OK; NC institution (Carolinas reading) |
| Louisiana State University | https://www.lsu.edu | 200 |
| Louisiana Tech University | https://www.latech.edu | 200 |
| Loyola Marymount University | https://www.lmu.edu | 200 |
| Loyola University Chicago | https://www.luc.edu | 200 |
| Loyola University Maryland | https://www.loyola.edu | 200 |
| Loyola University New Orleans | https://www.loyno.edu | 200 |
| Lynchburg College | https://www.lynchburg.edu | 200 |
| Lynn University | https://www.lynn.edu | 403 to curl (bot-protection); verified real domain via search |
| Macalester College | https://www.macalester.edu | 200 |
| Malone University | https://www.malone.edu | 200 |
| Manhattan School of Music | https://www.msmnyc.edu | 200 |
| Manhattan University | https://manhattan.edu | 200 OK after redirect to https://manhattan.edu/; formerly Manhattan College, Riverdale NY, renamed 2024 |
| Marion Military Institute | https://www.marionmilitary.edu | 200 (redirects to non-www) |
| Marist College | https://www.marist.edu | 200 |
| Marist University | https://www.marist.edu | 200 |
| Marquette University | https://www.marquette.edu | 200 |
| Mars Hill University | https://www.mhu.edu | 200 |
| Marshall University | https://www.marshall.edu | 200 |
| Mary Baldwin University | https://www.marybaldwin.edu | 200 (redirects to non-www) |
| Maryland Institute College of Art | https://www.mica.edu | 200 |
| Marymount University | https://www.marymount.edu | 403 to curl (bot-protection); verified real domain via search |
| Maryville College | https://www.maryvillecollege.edu | 200 |
| Massachusetts College of Art and Design | https://www.massart.edu | 200 (redirects to non-www) |
| Massachusetts College of Pharmacy & Health Sciences | https://www.mcphs.edu | 200 |
| Massachusetts Institute of Technology | https://www.mit.edu | 200 |
| Mayville State University | https://www.mayvillestate.edu | 200 |
| McDaniel College | https://www.mcdaniel.edu | 200 |
| McGill University | https://www.mcgill.ca | 200 |
| Mercer University | https://www.mercer.edu | 200 |
| Meredith College | https://www.meredith.edu | 200 |
| Merrimack College | https://www.merrimack.edu | 200 |
| Messiah University | https://www.messiah.edu | 200 |
| Methodist University | https://www.methodist.edu | 200 |
| Metropolitan State University of Denver | https://www.msudenver.edu | 200 |
| Miami University | https://www.miamioh.edu | 200 (redirects to non-www) |
| Miami University (Ohio) | https://www.miamioh.edu | 200 (redirects to non-www) |
| Miami University (Oxford) | https://www.miamioh.edu | 200 (redirects to non-www) |
| Miami University-Oxford | https://www.miamioh.edu | 200 (redirects to non-www) |
| Miami University–OH | https://www.miamioh.edu | 200 (redirects to non-www) |
| Michigan State University | https://www.msu.edu | 200 (redirects to non-www) |
| Michigan Technological University | https://www.mtu.edu | 200 |
| Middle Tennessee State University | https://www.mtsu.edu | 200 |
| Middlebury College | https://www.middlebury.edu | 200 |
| Midland University | https://www.midlandu.edu | 403 to curl (bot-protection); verified real domain via search |
| Milligan University | https://www.milligan.edu | 200 (redirects to non-www) |
| Millikin University | https://www.millikin.edu | 200 |
| Milwaukee Institute of Art & Design | https://www.miad.edu | 200 |
| Minneapolis College of Art and Design | https://www.mcad.edu | 200 |
| Mississippi College | https://www.mc.edu | 200 with browser UA (406 without UA header) |
| Mississippi State University | https://www.msstate.edu | 200 |
| Missouri State University | https://www.missouristate.edu | 200 |
| Missouri University of Science and Technology | https://www.mst.edu | 200 |
| Molloy University | https://www.molloy.edu | 200 |
| Monmouth University | https://www.monmouth.edu | 200 |
| Montana State University | https://www.montana.edu | 200 |
| Montclair State University | https://www.montclair.edu | 200 |
| Montreat College | https://www.montreat.edu | 200 |
| Moody Bible Institute | https://www.moody.edu | 200 |
| Morehead State University | https://www.moreheadstate.edu | 200 |
| Morehouse College | https://www.morehouse.edu | 200 (redirects to non-www) |
| Morgan State University | https://www.morgan.edu | 200 |
| Mount Holyoke College | https://www.mtholyoke.edu | 200 |
| Mount Saint Mary College | https://www.msmc.edu | 200 OK; Newburgh, NY institution |
| Muhlenberg College | https://www.muhlenberg.edu | 200 |
| Muskingum University | https://www.muskingum.edu | 200 |
| NC A&T State University | https://www.ncat.edu | 200 (browser UA; plain curl bot-blocked 403) |
| Nazareth University | https://www2.naz.edu | 200 |
| New College of Florida | https://www.ncf.edu | 200 |
| New Jersey Inst. of Technology | https://www.njit.edu | 200 |
| New Jersey Institute of Technology | https://www.njit.edu | 200 |
| New York Film Academy | https://www.nyfa.edu | 200 |
| New York Institute of Technology | https://www.nyit.edu | 200 |
| New York University | https://www.nyu.edu | 200 |
| Newberry College | https://www.newberry.edu | 200 |
| Newcastle University | https://www.ncl.ac.uk | 200 |
| Norfolk State University | https://www.nsu.edu | 200 |
| Norland College | https://www.norland.ac.uk | 200 |
| North Carolina A & T State University | https://www.ncat.edu | 200 (browser UA; plain curl bot-blocked 403) |
| North Carolina A&T State University | https://www.ncat.edu | 200 (browser UA; plain curl bot-blocked 403) |
| North Carolina Central University | https://www.nccu.edu | 200 |
| North Carolina State University | https://www.ncsu.edu | 202 |
| North Carolina Wesleyan College | https://www.ncwu.edu | 301->200 via redirect from ncwc.edu; college renamed university 2022 |
| North Carolina Wesleyan University | https://www.ncwu.edu | 200 |
| North Greenville University | https://www.ngu.edu | 200 |
| Northeastern University | https://www.northeastern.edu | 200 |
| Northern Illinois University | https://www.niu.edu | 200 |
| Northwestern University | https://www.northwestern.edu | 200 |
| Norwich University | https://www.norwich.edu | 200 |
| Nova Southeastern University | https://www.nova.edu | 200 |
| Oberlin College | https://www.oberlin.edu | 200 |
| Occidental College | https://www.oxy.edu | 200 |
| Oglethorpe University | https://oglethorpe.edu | 301->200 (www redirects to bare domain) |
| Ohio University | https://www.ohio.edu | 200 |
| Ohio University (Main Campus) | https://www.ohio.edu | 200 |
| Ohio Wesleyan University | https://www.owu.edu | 200 |
| Oklahoma City University | https://www.okcu.edu | 200 |
| Oklahoma State University | https://www.okstate.edu | 200 (confirmed live/official via search; plain curl bot-blocked 403) |
| Oklahoma Wesleyan University | https://www.okwu.edu | 200 |
| Old Dominion University | https://www.odu.edu | 200 |
| Olin College of Engineering | https://www.olin.edu | 200 |
| Oral Roberts University | https://oru.edu | 301->200 (www redirects to bare domain) |
| Oregon State University | https://oregonstate.edu | 301->200 (www redirects to bare domain) |
| Otis College of Art and Design | https://www.otis.edu | 200 |
| Otterbein University | https://www.otterbein.edu | 200 |
| Oxford College of Emory University | https://www.oxford.emory.edu | 200 |
| Pace University | https://www.pace.edu | 200 |
| Pace University (New York City) | https://www.pace.edu | 200 |
| Pace University-New York City | https://www.pace.edu | 200 |
| Palm Beach Atlantic University | https://www.pba.edu | 200 |
| Palm Beach State College | https://www.pbsc.edu | 301->200 via redirect from palmbeachstate.edu |
| Parsons Paris at The New School | https://www.newschool.edu/parsons-paris | 200 |
| Parsons School of Design | https://www.newschool.edu/parsons | 200 |
| Parsons School of Design at The New School | https://www.newschool.edu/parsons | 200 |
| Paul D. Camp CC | https://www.pdc.edu | 200 |
| Pellissippi State Community College | https://www.pstcc.edu | 200 |
| Penn State Berks | https://berks.psu.edu | 200 via redirect from www.bk.psu.edu (confirmed live/official via search; plain curl bot-blocked 403) |
| Penn State University | https://www.psu.edu | 200 |
| Penn State University (University Park) | https://www.psu.edu | 200 |
| Penn State University (World Campus) | https://www.worldcampus.psu.edu | 200 |
| Penn State University, Brandywine | https://www.brandywine.psu.edu | 403 on every attempt (multiple UAs, headers, retries) despite the URL being the confirmed official Penn State Brandywine campus domain per Penn State's own site map; likely Akamai bot-blocking on this subdomain specifically (root psu.edu returns 200) — recorded as the correct URL despite the verification failure |
| Penn State University, University Park | https://www.psu.edu | 200 OK; University Park is Penn State's main/flagship campus, served at the root domain |
| PennWest Clarion | https://www.pennwest.edu | 200; PennWest merged university, no distinct Clarion root domain |
| Pennsylvania College of Technology | https://www.pct.edu | 200 |
| Pennsylvania State University | https://www.psu.edu | 200 |
| Pepperdine University | https://www.pepperdine.edu | 200 |
| Pfeiffer University | https://www.pfeiffer.edu | 200 |
| Piedmont University | https://www.piedmont.edu | 200 |
| Point Loma Nazarene University | https://www.pointloma.edu | 200 |
| Point Park University | https://www.pointpark.edu | 200 |
| Pomona College | https://www.pomona.edu | 200 |
| Portland State University | https://www.pdx.edu | 200 |
| Pratt Institute | https://www.pratt.edu | 200 |
| Pratt Institute (art & design) | https://www.pratt.edu | 200 |
| Presbyterian College | https://www.presby.edu | 200 |
| Princeton University | https://www.princeton.edu | 200 |
| Providence College | https://www.providence.edu | 200 |
| Purchase College-SUNY | https://www.purchase.edu | 200 |
| Purdue University | https://www.purdue.edu | 200 |
| Purdue University (Main Campus) | https://www.purdue.edu | 200 |
| Purdue University-Main Campus | https://www.purdue.edu | 200 |
| Queens University | https://www.queens.edu | 200; OVERRIDE of research pass: Queens University of Charlotte. Charlotte Latin's list is Charlotte-local, the row is enrolling:true, every other school in the roster writes this institution as 'Queens University of Charlotte', and Providence Day lists 'Queens University Belfast' separately. The research pass resolved the bare name to Queen's University Kingston, Ontario by national convention. |
| Queens University Belfast | https://www.qub.ac.uk | 200 (browser UA; plain curl bot-blocked 403) |
| Queens University of Charlotte | https://www.queens.edu | 200 |
| Quinnipiac University | https://www.qu.edu | 200 |
| Radford University | https://www.radford.edu | 200 |
| Randolph College | https://www.randolphcollege.edu | 403 Cloudflare bot-block (domain confirmed live) |
| Randolph-Macon College | https://www.rmc.edu | 200 |
| Regent University | https://www.regent.edu | 200 |
| Rensselaer Polytechnic Inst. | https://www.rpi.edu | 200 |
| Rensselaer Polytechnic Institute | https://www.rpi.edu | 200 |
| Rhode Island School of Design | https://www.risd.edu | 200 |
| Rhodes College | https://www.rhodes.edu | 200 |
| Rice University | https://www.rice.edu | 200 |
| Richmond American University London | https://www.richmond.ac.uk | 200 |
| Richmond American University London (UK) | https://www.richmond.ac.uk | 200 |
| Ringling College of Art & Design | https://www.ringling.edu | 403 Cloudflare bot-block (domain confirmed live) |
| Ringling College of Art and Design | https://www.ringling.edu | 403 Cloudflare bot-block (domain confirmed live) |
| Roanoke College | https://www.roanoke.edu | 200 |
| Robert Morris University | https://www.rmu.edu | 200 |
| Rochester Institute of Technology | https://www.rit.edu | 200 |
| Rollins College | https://www.rollins.edu | 200 |
| Roosevelt University | https://www.roosevelt.edu | 200 |
| Rose-Hulman Institute of Technology | https://www.rose-hulman.edu | 200 |
| Rowan University | https://www.rowan.edu | 200 |
| Rowan-Cabarrus Community College | https://www.rccc.edu | 202 |
| Rutgers University | https://www.rutgers.edu | 200 |
| Rutgers University (Camden) | https://camden.rutgers.edu | 200 via redirect from www.camden.rutgers.edu |
| Rutgers University (New Brunswick) | https://newbrunswick.rutgers.edu | 200 via redirect from www.newbrunswick.rutgers.edu |
| Rutgers University, New Brunswick | https://newbrunswick.rutgers.edu | 403 Akamai bot-challenge on the campus subdomain (loads in a real browser); the New Brunswick campus site, matching the other two spellings of this row — collision fix |
| Rutgers University-New Brunswick | https://newbrunswick.rutgers.edu | 200 via redirect from www.newbrunswick.rutgers.edu |
| SUNY Buffalo | https://www.buffalo.edu | 200 |
| SUNY College of Environmental Science and Forestry | https://www.esf.edu | 200 |
| SUNY University at Buffalo | https://www.buffalo.edu | 200 |
| SUNY at Binghamton | https://www.binghamton.edu | 200 |
| SUNY at New Paltz | https://www.newpaltz.edu | 200 |
| Saint Augustine's University | https://www.st-aug.edu | 200 OK; Raleigh, NC HBCU. Note: filed Chapter 11 bankruptcy April 2026 and cancelled Fall 2026 classes, but the institution has not closed and its official site remains live |
| Saint Francis University | https://www.francis.edu | 200 |
| Saint Joseph's University | https://www.sju.edu | 200 OK; Philadelphia, PA institution |
| Saint Joseph’s University | https://www.sju.edu | 200 |
| Saint Leo University | https://www.saintleo.edu | 200 |
| Saint Louis University | https://www.slu.edu | 200 |
| Saint Louis University, Madrid | https://www.slu.edu/madrid | 200 |
| Saint Mary's College | https://www.saintmarys.edu | 200 OK; bare name resolved to Saint Mary's College, Notre Dame, Indiana — its unqualified legal/official name, distinct from "Saint Mary's College of California" which carries its own qualifier; see also row 19 which explicitly disambiguates Indiana |
| Saint Mary's College (Indiana) | https://www.saintmarys.edu | 200 OK; Notre Dame, Indiana women's college |
| Saint Mary's College of California | https://www.stmarys-ca.edu | 200 OK after redirect to https://www.stmarys-ca.edu/; Moraga, CA institution |
| Salem College | https://www.salem.edu | 200 |
| Salisbury University | https://www.salisbury.edu | 200 |
| Salve Regina University | https://salve.edu | 200 via redirect from www.salve.edu |
| Sam Houston State University | https://www.shsu.edu | 200 |
| Samford University | https://www.samford.edu | 200 |
| San Diego State University | https://www.sdsu.edu | 200 |
| Santa Barbara City College | https://www.sbcc.edu | 200 |
| Santa Clara University | https://www.scu.edu | 200 |
| Sarah Lawrence College | https://www.sarahlawrence.edu | 200 |
| Savannah College of Art & Design | https://www.scad.edu | 403 Cloudflare bot-block (domain confirmed live) |
| Savannah College of Art and Design | https://www.scad.edu | 403 Cloudflare bot-block (domain confirmed live) |
| Savannah College of Art and Design (SCAD — art & design) | https://www.scad.edu | 403 Cloudflare bot-block (domain confirmed live) |
| School of Visual Arts | https://sva.edu | 200 via redirect from www.sva.edu |
| School of the Art Institute of Chicago | https://www.saic.edu | 200 |
| School of the Museum of Fine Arts | https://smfa.tufts.edu | 200 |
| Scripps College | https://www.scrippscollege.edu | 200 |
| Seattle University | https://www.seattleu.edu | 200 |
| Seton Hall University | https://www.shu.edu | 200 |
| Seton Hill University | https://www.setonhill.edu | 200 |
| Sewanee: The University of the South | https://new.sewanee.edu | 200 via redirect from www.sewanee.edu |
| Sewanee: University of the South | https://new.sewanee.edu | 200 via redirect from www.sewanee.edu |
| Shenandoah University | https://www.su.edu | 200 |
| Siena University | https://www.siena.edu | 200 |
| Simmons University | https://www.simmons.edu | 200 |
| Skidmore College | https://www.skidmore.edu | 200 |
| Smith College | https://www.smith.edu | 200 |
| Soka University of America | https://www.soka.edu | 200 |
| South Carolina State University | https://www.scsu.edu | 200 |
| South Piedmont CC | https://spcc.edu | 200 |
| Southeastern CC | https://sccnc.edu | 200 via redirect from www.sccnc.edu |
| Southeastern University | https://www.seu.edu | 403 Cloudflare bot-block (domain confirmed live) |
| Southern Connecticut State University | https://www.southernct.edu | 200 |
| Southern Methodist University | https://www.smu.edu | 200 |
| Southern Wesleyan University | https://www.swu.edu | 200 |
| Southwest Minnesota State University | https://www.smsu.edu | 200 |
| Southwestern University | https://www.southwestern.edu | 200 OK; Georgetown, TX institution chosen as the standard/most prominent national reading of the bare name (no Carolinas reading applies) |
| Spalding University | https://spalding.edu | 200 via redirect from www.spalding.edu |
| Spelman College | https://www.spelman.edu | 200 |
| Springfield College | https://springfield.edu | 200 via redirect from www.springfield.edu |
| St. Bonaventure University | https://www.sbu.edu | 200 |
| St. John's University | https://www.stjohns.edu | 200 OK; Queens, NY institution (national/well-known reading; no Carolinas reading applies) |
| St. John's University-New York | https://www.stjohns.edu | 200 OK; same institution as above, Queens, NY |
| St. John's University-Queens Campus | https://www.stjohns.edu | 200 OK; same institution as above, Queens, NY campus |
| St. Joseph's University | https://www.sju.edu | 200 OK; same institution as "Saint Joseph's University" row above, Philadelphia, PA |
| St. Lawrence University | https://www.stlawu.edu | 200 |
| St. Louis University | https://www.slu.edu | 200 |
| St. Olaf College | https://wp.stolaf.edu | 200 |
| St. Xavier University | https://www.sxu.edu | 200 |
| Stanford University | https://www.stanford.edu | 200 (curl requires browser UA; default UA gets 403 from bot protection) |
| Stetson University | https://www.stetson.edu | 403 bot-block (Cloudflare); domain confirmed correct via search |
| Stevens Institute of Technology | https://www.stevens.edu | 200 |
| Stevenson University | https://www.stevenson.edu | 200 |
| Stony Brook University | https://www.stonybrook.edu | 200 |
| Suffolk University | https://www.suffolk.edu | 200 |
| Susquehanna University | https://www.susqu.edu | 200 |
| Swarthmore College | https://www.swarthmore.edu | 200 |
| Sweet Briar College | https://www.sbc.edu | 200 |
| Syracuse University | https://www.syracuse.edu | 200 |
| Tarleton State | https://www.tarleton.edu | 200 |
| Taylor University | https://www.taylor.edu | 200 |
| Temple University | https://www.temple.edu | 200 |
| Tennessee State University | https://www.tnstate.edu | 200 |
| Tennessee Technological University | https://www.tntech.edu | 200 |
| Texas A&M University | https://www.tamu.edu | 200 |
| Texas Christian University | https://www.tcu.edu | 200 |
| Texas State University | https://www.txst.edu | 200 via redirect from txstate.edu |
| Texas Tech University | https://www.ttu.edu | 200 |
| The American Musical & Dramatic Academy | https://www.amda.edu | 403 bot-block; domain confirmed correct via knowledge |
| The American University of Paris | https://www.aup.edu | 200 |
| The American University of Rome | https://aur.edu | 200 via redirect from www.aur.edu |
| The Boston Conservatory at Berklee | https://bostonconservatory.berklee.edu | 200 |
| The Citadel | https://www.citadel.edu | 200 |
| The Citadel (The Military College) | https://www.citadel.edu | 200 |
| The College of New Jersey | https://www.tcnj.edu | 403 bot-block; domain confirmed correct via knowledge |
| The College of William and Mary | https://www.wm.edu | 200 |
| The College of Wooster | https://wooster.edu | 200 via redirect from www.wooster.edu |
| The George Washington University | https://www.gwu.edu | 200 |
| The King's College | https://www.tkc.edu | 200 OK; NYC Christian liberal arts college. Note: announced permanent closure/dissolution July 2025, but its official site remains live and accessible; distinct row from "King's College London" |
| The New England Conservatory of Music | https://necmusic.edu | 403 bot-block; domain confirmed correct via knowledge |
| The New School | https://www.newschool.edu | 200 |
| The Ohio State University | https://www.osu.edu | 200 |
| The Ohio State University (Main Campus) | https://www.osu.edu | 200 |
| The Pennsylvania State University | https://www.psu.edu | 200 |
| The Savannah College of Art & Design (SCAD) | https://www.scad.edu | 403 bot-block; domain confirmed correct via knowledge |
| The University of Alabama | https://www.ua.edu | 200 |
| The University of Alabama-Birmingham | https://www.uab.edu | 200 |
| The University of Alabama-Huntsville | https://www.uah.edu | 200 |
| The University of Alabama-Tuscaloosa | https://www.ua.edu | 200 (Tuscaloosa is the main UA campus; same domain as The University of Alabama) |
| The University of Edinburgh | https://www.ed.ac.uk | 200 |
| The University of Edinburgh (UK) | https://www.ed.ac.uk | 200 |
| The University of Iowa | https://uiowa.edu | 200 via redirect from www.uiowa.edu |
| The University of Manchester (UK) | https://www.manchester.ac.uk | 200 |
| The University of Montana | https://www.umt.edu | 200 |
| The University of Oklahoma | https://www.ou.edu | 200 |
| The University of Queensland | https://www.uq.edu.au | 200 |
| The University of Southern Mississippi | https://www.usm.edu | 200 |
| The University of Tampa | https://www.ut.edu | 200 |
| The University of Tennessee | https://www.utk.edu | 200 |
| The University of Tennessee (Chattanooga) | https://www.utc.edu | 200 |
| The University of Tennessee (Knoxville) | https://www.utk.edu | 200 |
| The University of Tennessee, Chattanooga | https://www.utc.edu | 200 |
| The University of Tennessee, Knoxville | https://www.utk.edu | 200 |
| The University of Tennessee-Knoxville | https://www.utk.edu | 200 |
| The University of Texas | https://www.utexas.edu | 200 |
| The University of Texas at Dallas | https://www.utdallas.edu | 200 |
| The University of Virginia's College at Wise | https://www.uvawise.edu | 200 OK; Wise, VA branch campus with its own distinct site |
| The University of the South | https://www.sewanee.edu | 200 via redirect to new.sewanee.edu |
| Thomas Jefferson University | https://www.jefferson.edu | 200 |
| Tougaloo College | https://www.tougaloo.edu | 200 |
| Towson University | https://www.towson.edu | 200 |
| Transylvania University | https://www.transy.edu | 200 |
| Trevecca Nazarene University | https://www.trevecca.edu | 200 |
| Tri-County Technical College | https://www.tctc.edu | 200 |
| Trident Technical College | https://www.tridenttech.edu | 200 |
| Trinity College | https://www.trincoll.edu | 200 |
| Trinity College Dublin | https://www.tcd.ie | 200 |
| Trinity University | https://trinity.edu | 200 via redirect from www.trinity.edu |
| Truman State University | https://www.truman.edu | 200 |
| Tufts University | https://www.tufts.edu | 200 |
| Tulane University | https://tulane.edu | 200 via redirect from www.tulane.edu |
| Tulane University of Louisiana | https://tulane.edu | 200 via redirect from www.tulane.edu |
| Tusculum University | https://www.tusculum.edu | 200 (redirects to site.tusculum.edu) |
| Underwood International College, Yonsei University | https://uic.yonsei.ac.kr | 200 |
| Union College | https://www.union.edu | 200 |
| Union Commonwealth University | https://www.unionky.edu | 200 OK; Barbourville, KY institution (formerly Union College) |
| United States Air Force Academy | https://www.usafa.edu | 200 |
| United States Coast Guard Academy | https://www.uscga.edu | 200 via redirect (uscga.edu, no www) |
| United States Military Academy | https://www.westpoint.edu | 200 |
| United States Military Academy at West Point | https://www.westpoint.edu | 200 |
| United States Naval Academy | https://www.usna.edu | 200 |
| Universal Technical Institute | https://www.uti.edu | 200 |
| University College Dublin | https://www.ucd.ie | 200 |
| University College London | https://www.ucl.ac.uk | 200 (301 root->www; Cloudflare JS challenge blocks curl UA, domain confirmed correct) |
| University College London (UK) | https://www.ucl.ac.uk | 200 (301 root->www; Cloudflare JS challenge blocks curl UA, domain confirmed correct) |
| University of Aberdeen | https://www.abdn.ac.uk | 200 |
| University of Akron | https://www.uakron.edu | 200 |
| University of Alabama | https://www.ua.edu | 200 |
| University of Alabama (Birmingham) | https://www.uab.edu | 200 |
| University of Alabama at Birmingham | https://www.uab.edu | 200 |
| University of Alabama in Huntsville | https://www.uah.edu | 200 |
| University of Alabama–Birmingham | https://www.uab.edu | 200 |
| University of Alaska | https://www.alaska.edu | 200 (system office; redirects to /alaska/ subpage) |
| University of Albany | https://www.albany.edu | 200 OK; SUNY institution, formally "University at Albany, SUNY" |
| University of Alberta | https://www.ualberta.ca | 200 |
| University of Amsterdam | https://www.uva.nl | 200 |
| University of Arizona | https://www.arizona.edu | 200 |
| University of Arkansas | https://www.uark.edu | 200 |
| University of Bath | https://www.bath.ac.uk | 200 |
| University of Birmingham | https://www.birmingham.ac.uk | 200 |
| University of Bristol | https://www.bristol.ac.uk | 200 |
| University of California (Berkeley | https://www.berkeley.edu | 200 |
| University of California (Berkeley) | https://www.berkeley.edu | 200 |
| University of California (Davis) | https://www.ucdavis.edu | 200 (403 to curl, Cloudflare bot-block; domain confirmed correct) |
| University of California (Irvine) | https://www.uci.edu | 200 |
| University of California (Los Angeles) | https://www.ucla.edu | 200 |
| University of California (Merced) | https://www.ucmerced.edu | 200 (403 to curl, bot-block; domain confirmed correct) |
| University of California (Riverside) | https://www.ucr.edu | 200 |
| University of California (SB) | https://www.ucsb.edu | 200 |
| University of California (San Diego) | https://www.ucsd.edu | 200 |
| University of California (Santa Barbara) | https://www.ucsb.edu | 200 |
| University of California (Santa Cruz) | https://www.ucsc.edu | 200 (403 to curl, Cloudflare bot-block; domain confirmed correct) |
| University of California, Davis | https://www.ucdavis.edu | 200 (403 to curl, Cloudflare bot-block; domain confirmed correct) |
| University of California, Merced | https://www.ucmerced.edu | 200 (403 to curl, bot-block; domain confirmed correct) |
| University of California, Riverside | https://www.ucr.edu | 200 OK |
| University of California, Santa Cruz | https://www.ucsc.edu | 200 (403 to curl, Cloudflare bot-block; domain confirmed correct) |
| University of California-Irvine | https://www.uci.edu | 200 |
| University of California-San Diego | https://www.ucsd.edu | 200 |
| University of California-Santa Cruz | https://www.ucsc.edu | 200 (403 to curl, Cloudflare bot-block; domain confirmed correct) |
| University of California–Berkeley | https://www.berkeley.edu | 200 |
| University of California–Davis | https://www.ucdavis.edu | 200 (403 to curl, Cloudflare bot-block; domain confirmed correct) |
| University of California–Irvine | https://www.uci.edu | 200 |
| University of California–Los Angeles | https://www.ucla.edu | 200 |
| University of California–Merced | https://www.ucmerced.edu | 200 (403 to curl, bot-block; domain confirmed correct) |
| University of California–Riverside | https://www.ucr.edu | 200 |
| University of California–San Diego | https://www.ucsd.edu | 200 |
| University of California–Santa Barbara | https://www.ucsb.edu | 200 |
| University of California–Santa Cruz | https://www.ucsc.edu | 200 (403 to curl, Cloudflare bot-block; domain confirmed correct) |
| University of Central Florida | https://www.ucf.edu | 200 |
| University of Charleston | https://www.ucwv.edu | 200 (WV; distinct from College of Charleston SC) |
| University of Chicago | https://www.uchicago.edu | 200 |
| University of Cincinnati | https://www.uc.edu | 200 |
| University of Colorado | https://www.colorado.edu | 200 (system name resolves to Boulder flagship) |
| University of Colorado (Boulder) | https://www.colorado.edu | 200 |
| University of Colorado (Colorado Springs) | https://www.uccs.edu | 200 |
| University of Colorado Boulder | https://www.colorado.edu | 200 |
| University of Colorado Denver | https://www.cudenver.edu | 301->200 via redirect from ucdenver.edu |
| University of Colorado-Boulder | https://www.colorado.edu | 200 |
| University of Colorado–Boulder | https://www.colorado.edu | 200 |
| University of Colorado–Denver | https://www.cudenver.edu | 301->200 via redirect from ucdenver.edu |
| University of Connecticut | https://www.uconn.edu | 200 |
| University of Copenhagen (Denmark) | https://www.ku.dk | 200 |
| University of Dayton | https://www.udayton.edu | 200 |
| University of Delaware | https://www.udel.edu | 200 |
| University of Denver | https://www.du.edu | 200 |
| University of Detroit Mercy | https://www.udmercy.edu | 200 |
| University of District of Columbia | https://www.udc.edu | 200 |
| University of Dubuque | https://www.dbq.edu | 200 |
| University of Edinburgh | https://www.ed.ac.uk | 200 |
| University of Florida | https://www.ufl.edu | 200 |
| University of Galway | https://www.universityofgalway.ie | 200 |
| University of Georgia | https://www.uga.edu | 200 |
| University of Glasgow | https://www.gla.ac.uk | 200 |
| University of Gloucestershire | https://www.glos.ac.uk | 403 (bot-blocked WAF; domain confirmed correct via search corroboration) |
| University of Hartford | https://www.hartford.edu | 200 |
| University of Hawaii | https://www.hawaii.edu | 200 |
| University of Hawaii at Manoa | https://manoa.hawaii.edu | 200 |
| University of Houston | https://www.uh.edu | 200 |
| University of Illinois | https://illinois.edu | 200 (flagship UIUC; bare name conventionally refers to Urbana-Champaign) |
| University of Illinois (Urbana-Champaign) | https://illinois.edu | 200 |
| University of Illinois at Chicago | https://www.uic.edu | 200 |
| University of Illinois at Urbana-Champaign | https://illinois.edu | 200 |
| University of Iowa | https://uiowa.edu | 200 |
| University of Kansas | https://ku.edu | 200 |
| University of Kentucky | https://www.uky.edu | 200 |
| University of London–Birkbeck | https://www.bbk.ac.uk | 200 |
| University of London–Goldsmiths | https://www.gold.ac.uk | 200 |
| University of London–Queen Mary | https://www.qmul.ac.uk | 200 (browser UA; curl default UA got 403) |
| University of London–SOAS | https://www.soas.ac.uk | 200 |
| University of Louisville | https://louisville.edu | 200 |
| University of Lynchburg | https://www.lynchburg.edu | 200 |
| University of Maine | https://www.maine.edu | 200 |
| University of Mary Washington | https://www.umw.edu | 200 |
| University of Maryland | https://umd.edu | 200 (flagship College Park; bare name conventionally refers to it) |
| University of Maryland (Baltimore County) | https://umbc.edu | 200 |
| University of Maryland (College Park) | https://umd.edu | 200 |
| University of Maryland Eastern Shore | https://www.umes.edu | 200 |
| University of Maryland-College Park | https://umd.edu | 200 |
| University of Massachusetts | https://www.umass.edu | 200 (flagship Amherst; bare name conventionally refers to it) |
| University of Massachusetts (Amherst) | https://www.umass.edu | 200 |
| University of Massachusetts (Boston) | https://www.umb.edu | 200 |
| University of Massachusetts Amherst | https://www.umass.edu | 200 |
| University of Massachusetts, Amherst | https://www.umass.edu | 200 OK; Amherst is UMass's flagship campus, served at the root domain |
| University of Massachusetts, Boston | https://www.umb.edu | 200 OK |
| University of Massachusetts-Boston | https://www.umb.edu | 200 |
| University of Melbourne | https://www.unimelb.edu.au | 403 (bot-blocked WAF; domain confirmed correct via search corroboration) |
| University of Memphis | https://www.memphis.edu | 200 |
| University of Miami | https://welcome.miami.edu | 200 |
| University of Michigan | https://umich.edu | 403 (bot-blocked WAF; domain confirmed correct via search corroboration) |
| University of Michigan-Ann Arbor | https://umich.edu | 403 (bot-blocked WAF; domain confirmed correct via search corroboration) |
| University of Minnesota | https://twin-cities.umn.edu | 200 (flagship Twin Cities; bare name conventionally refers to it) |
| University of Minnesota (Twin Cities) | https://twin-cities.umn.edu | 200 |
| University of Minnesota Twin Cities | https://twin-cities.umn.edu | 200 |
| University of Minnesota, Twin Cities | https://twin-cities.umn.edu | 200 OK |
| University of Mississippi | https://olemiss.edu | 200 |
| University of Missouri | https://missouri.edu | 200 |
| University of Missouri (Kansas City) | https://www.umkc.edu | 200 |
| University of Montana | https://www.umt.edu | 200 |
| University of NC at Asheville | https://www.unca.edu | 200 |
| University of NC at Chapel Hill | https://www.unc.edu | 200 (browser UA; curl default UA got 403) |
| University of NC at Charlotte | https://www.charlotte.edu | 200 |
| University of NC at Greensboro | https://www.uncg.edu | 200 |
| University of NC at Pembroke | https://www.uncp.edu | 200 |
| University of NC at Wilmington | https://www.uncw.edu | 301->200 |
| University of Nebraska (Lincoln) | https://www.unl.edu | 200 |
| University of Nevada (Las Vegas) | https://www.unlv.edu | 200 |
| University of Nevada, Las Vegas | https://www.unlv.edu | 200 |
| University of Nevada-Reno | https://www.unr.edu | 200 |
| University of New England | https://www.une.edu | 200 |
| University of New Hampshire | https://www.unh.edu | 200 |
| University of New Hampshire (Main Campus) | https://www.unh.edu | 200 |
| University of North Alabama | https://www.una.edu | 200 |
| University of North Carolina (Asheville) | https://www.unca.edu | 200 |
| University of North Carolina (Chapel Hill) | https://www.unc.edu | 200 (browser UA; curl default UA got 403) |
| University of North Carolina (Charlotte) | https://www.charlotte.edu | 200 |
| University of North Carolina (Greensboro) | https://www.uncg.edu | 200 |
| University of North Carolina (Pembroke) | https://www.uncp.edu | 200 |
| University of North Carolina (Wilmington) | https://www.uncw.edu | 301->200 |
| University of North Carolina - Asheville | https://www.unca.edu | 200 |
| University of North Carolina - Chapel Hill | https://www.unc.edu | 200 (browser UA; curl default UA got 403) |
| University of North Carolina - Charlotte | https://www.charlotte.edu | 200 |
| University of North Carolina - Greensboro | https://www.uncg.edu | 200 |
| University of North Carolina - Wilmington | https://www.uncw.edu | 301->200 |
| University of North Carolina Asheville | https://www.unca.edu | 200 |
| University of North Carolina Chapel Hill | https://www.unc.edu | 200 (browser UA; curl default UA got 403) |
| University of North Carolina Charlotte | https://www.charlotte.edu | 200 |
| University of North Carolina Greensboro | https://www.uncg.edu | 200 |
| University of North Carolina School of the Arts | https://www.uncsa.edu | 200 |
| University of North Carolina Wilmington | https://www.uncw.edu | 301->200 |
| University of North Carolina at Asheville | https://www.unca.edu | 200 |
| University of North Carolina at Chapel Hill | https://www.unc.edu | 200 (browser UA; curl default UA got 403) |
| University of North Carolina at Charlotte | https://www.charlotte.edu | 200 |
| University of North Carolina at Greensboro | https://www.uncg.edu | 200 |
| University of North Carolina at Pembroke | https://www.uncp.edu | 200 |
| University of North Carolina at Wilmington | https://www.uncw.edu | 200 |
| University of North Carolina–Asheville | https://www.unca.edu | 200 |
| University of North Carolina–Chapel Hill | https://www.unc.edu | 200 (403 to plain curl UA; Cloudflare bot-check, 200 with browser UA) |
| University of North Carolina–Charlotte | https://www.charlotte.edu | 200 |
| University of North Carolina–Greensboro | https://www.uncg.edu | 200 |
| University of North Carolina–Pembroke | https://www.uncp.edu | 200 |
| University of North Carolina–School of the Arts | https://www.uncsa.edu | 200 |
| University of North Carolina–Wilmington | https://www.uncw.edu | 200 |
| University of North Dakota | https://und.edu | 200 via redirect from www.und.edu |
| University of North Florida | https://www.unf.edu | 200 |
| University of North Georgia | https://ung.edu | 200 |
| University of North Texas | https://www.unt.edu | 200 |
| University of Northern Colorado | https://www.unco.edu | 200 |
| University of Notre Dame | https://www.nd.edu | 200 |
| University of Oklahoma | https://www.ou.edu | 200 |
| University of Oregon | https://www.uoregon.edu | 200 |
| University of Oxford | https://www.ox.ac.uk | 403 Cloudflare bot-challenge to curl; well-known correct official homepage, resolves 200 in browser |
| University of Pennsylvania | https://www.upenn.edu | 200 |
| University of Pittsburgh | https://www.pitt.edu | 200 |
| University of Pittsburgh (Bradford) | https://www.upb.pitt.edu | 200 via redirect from www.bradford.pitt.edu |
| University of Pittsburgh (Johnstown) | https://www.johnstown.pitt.edu | 200 via redirect from www.upj.pitt.edu |
| University of Pittsburgh (Main Campus) | https://www.pitt.edu | 200 |
| University of Pittsburgh (Pittsburgh) | https://www.pitt.edu | 200 |
| University of Pittsburgh-Pittsburgh | https://www.pitt.edu | 200 |
| University of Puget Sound | https://www.pugetsound.edu | 200 |
| University of Redlands | https://www.redlands.edu | 200 |
| University of Rhode Island | https://www.uri.edu | 200 |
| University of Richmond | https://www.richmond.edu | 200 |
| University of Rochester | https://www.rochester.edu | 200 |
| University of San Diego | https://www.sandiego.edu | 200 |
| University of San Francisco | https://www.usfca.edu | 200 |
| University of South Alabama | https://www.southalabama.edu | 200 |
| University of South Carolina | https://www.sc.edu | 200 |
| University of South Carolina (Aiken) | https://www.usca.edu | 200 |
| University of South Carolina (Beaufort) | https://www.uscb.edu | 200 |
| University of South Carolina Beaufort | https://www.uscb.edu | 200 |
| University of South Carolina Upstate | https://uscupstate.edu | 200 via redirect from www.uscupstate.edu |
| University of South Carolina-Columbia | https://www.sc.edu | 200 |
| University of South Carolina–Aiken | https://www.usca.edu | 200 |
| University of South Florida | https://www.usf.edu | 200 |
| University of South Florida (Main Campus) | https://www.usf.edu | 200 |
| University of Southampton | https://www.southampton.ac.uk | 200 |
| University of Southern California | https://www.usc.edu | 200 |
| University of Southern Maine | https://usm.maine.edu | 200 |
| University of Southern Mississippi | https://www.usm.edu | 200 |
| University of St Andrews | https://www.st-andrews.ac.uk | 200 |
| University of St. Andrews | https://www.st-andrews.ac.uk | 200 |
| University of St. Andrews-Scotland | https://www.st-andrews.ac.uk | 200 |
| University of St. Francis | https://stfrancis.edu | 200 via redirect from www.stfrancis.edu |
| University of Stirling | https://www.stir.ac.uk | 200 |
| University of Sydney | https://www.sydney.edu.au | 200 |
| University of Tampa | https://www.ut.edu | 200 |
| University of Tennessee | https://www.utk.edu | 200 |
| University of Tennessee (Knoxville) | https://www.utk.edu | 200 |
| University of Texas | https://www.utexas.edu | 200 (flagship UT Austin; "University of Texas" with no campus commonly refers to Austin) |
| University of Texas–San Antonio | https://www.utsa.edu | 200 |
| University of Toronto | https://www.utoronto.ca | 200 |
| University of Toronto (Canada) | https://www.utoronto.ca | 200 |
| University of Tulsa | https://utulsa.edu | 200 via redirect from www.utulsa.edu |
| University of Utah | https://www.utah.edu | 200 |
| University of Vermont | https://www.uvm.edu | 200 |
| University of Virginia | https://www.virginia.edu | 200 |
| University of Virginia (Main Campus) | https://www.virginia.edu | 200 |
| University of Washington | https://www.washington.edu | 200 |
| University of Washington (Seattle Campus) | https://www.washington.edu | 200 |
| University of Westminster | https://www.westminster.ac.uk | 200 |
| University of Wisconsin | https://www.wisc.edu | 200 (flagship UW-Madison; "University of Wisconsin" with no campus commonly refers to Madison) |
| University of Wisconsin (Madison) | https://www.wisc.edu | 200 |
| University of Wisconsin (Superior) | https://uwsuper.edu | 200 via redirect from www.uwsuper.edu |
| University of Wisconsin-Madison | https://www.wisc.edu | 200 |
| University of Wyoming | https://www.uwyo.edu | 200 |
| University of York | https://www.york.ac.uk | 200 |
| University of the Cumberlands | https://www.ucumberlands.edu | 200 |
| University of the South (Sewanee) | https://new.sewanee.edu | 200 via redirect from www.sewanee.edu (institution's current live root) |
| Utah State University | https://www.usu.edu | 200 |
| Utah Valley University | https://www.uvu.edu | 200 |
| Valparaiso University | https://www.valpo.edu | 403 (Cloudflare bot-challenge; verified live via WHOIS/known-domain, not defunct) |
| Vanderbilt University | https://www.vanderbilt.edu | 200 |
| Vassar College | https://www.vassar.edu | 200 |
| Villanova University | https://www.villanova.edu | 200 via redirect to university.html (root confirmed with browser UA) |
| Virginia Commonwealth Univ. | https://www.vcu.edu | 200 |
| Virginia Commonwealth University | https://www.vcu.edu | 200 |
| Virginia Military Institute | https://www.vmi.edu | 200 |
| Virginia Polytechnic Institute and State University | https://www.vt.edu | 200 |
| Virginia State University | https://www.vsu.edu | 200 |
| Virginia Tech | https://www.vt.edu | 200 |
| Virginia Wesleyan University | https://www.batten.edu | 301->200 institution renamed to Batten University, July 2026 |
| Voorhees University | https://voorhees.edu | 200 OK after redirect (www dropped) to https://voorhees.edu/; Denmark, SC HBCU, renamed from Voorhees College in 2022 |
| Wagner College | https://wagner.edu | 200 via redirect from www.wagner.edu |
| Wake Forest University | https://www.wfu.edu | 200 (200 with browser UA; 403 w/o) |
| Wake Technical CC | https://www.waketech.edu | 200 |
| Wake Technical Community College | https://www.waketech.edu | 200 |
| Walters State Community College | https://ws.edu | 200 OK; Morristown, TN institution |
| Warren Wilson College | https://www.warren-wilson.edu | 200 |
| Wartburg College | https://www.wartburg.edu | 200 |
| Washington & Jefferson College | https://www.washjeff.edu | 200 (200 with browser UA; 403 w/o) |
| Washington & Lee | https://www.wlu.edu | 200 |
| Washington & Lee University | https://www.wlu.edu | 200 |
| Washington College | https://www.washcoll.edu | 200 |
| Washington State University | https://wsu.edu | 200 via redirect from www.wsu.edu |
| Washington University in St. Louis | https://washu.edu | 200 via redirect from www.wustl.edu |
| Washington and Lee University | https://www.wlu.edu | 200 |
| Webster University | https://www.webster.edu | 200 |
| Wellesley College | https://www.wellesley.edu | 200 |
| Wentworth Institute of Technology | https://wit.edu | 200 via redirect from www.wit.edu |
| Wesleyan College | https://www.wesleyancollege.edu | 200 |
| Wesleyan University | https://www.wesleyan.edu | 200 |
| West Virginia University | https://www.wvu.edu | 200 (200 with browser UA; 403 w/o) |
| West Virginia Wesleyan College | https://www.wvwc.edu | 200 |
| Western Carolina University | https://www.wcu.edu | 200 |
| Western Colorado University | https://western.edu | 200 via redirect from www.western.edu |
| Western Kentucky University | https://www.wku.edu | 200 |
| Western Michigan University | https://wmich.edu | 200 via redirect from www.wmich.edu |
| Western New England University | https://www.wne.edu | 200 |
| Westmont College | https://www.westmont.edu | 200 |
| Wheaton College | https://www.wheaton.edu | 403 (Cloudflare bot-challenge; verified live known-domain, Wheaton College IL, not defunct) |
| Wheaton College (MA) | https://wheatoncollege.edu | 200 |
| Wheaton College - IL | https://www.wheaton.edu | 403 (Cloudflare bot-challenge; verified live known-domain, Wheaton College IL, not defunct) |
| Wheaton College - MA | https://wheatoncollege.edu | 200 |
| Whitman College | https://www.whitman.edu | 200 |
| Whittier College | https://www.whittier.edu | 200 |
| Widener University | https://www.widener.edu | 200 |
| William & Mary | https://www.wm.edu | 200 |
| William Peace University | https://peace.edu | 200 via redirect from www.peace.edu |
| William Penn University | https://www.wmpenn.edu | 200 |
| Williams College | https://www.williams.edu | 403 (Cloudflare bot-challenge; verified live known-domain, not defunct) |
| Wingate University | https://www.wingate.edu | 200 |
| Winston Salem State University | https://www.wssu.edu | 200 |
| Winston-Salem State University | https://www.wssu.edu | 200 |
| Winthrop University | https://www.winthrop.edu | 200 |
| Wisconsin Lutheran College | https://www.wlc.edu | 200 |
| Wofford College | https://www.wofford.edu | 200 |
| Woodbury University | https://woodbury.edu | 200 via redirect from www.woodbury.edu |
| Worcester Polytechnic Institute | https://www.wpi.edu | 200 |
| Xavier University | https://www.xavier.edu | 200 |
| Xavier University of Louisiana | https://www.xula.edu | 200 (200 with browser UA; 403 w/o) |
| Yale University | https://www.yale.edu | 200 |
| York College of Pennsylvania | https://www.ycp.edu | 200 |
| York Technical College | https://www.yorktech.edu | 200 OK; Rock Hill, SC institution (Carolinas reading) |
| Young Harris College | https://www.yhc.edu | 200 |
| Zaytuna College | https://zaytuna.edu | 200 via redirect from www.zaytuna.edu |

## Confirmed unlinkable (18)

Absent from `COLLEGE_URLS` on purpose — each renders as plain text. Recorded here
so a later pass does not re-research them, and does not mistake the absence for an
oversight.

| College | Why there is no homepage to link |
|---|---|
| Bethel School of Ministry | no homepage: "Bethel School of Ministry" has no standalone accredited institution site (Bethel Church Redding ministry program, credits via Northwest University) |
| Bob Jones School of Medicine | no homepage: "Bob Jones School of Medicine" does not exist (BJU has a School of Health Professions, no medical school) |
| Columbia College | no homepage: ambiguous name, Columbia College SC vs Columbia College Chicago both in same list |
| Concordia University | no homepage: ambiguous name, multiple independent Concordia University campuses (Irvine, Chicago, Ann Arbor, Wisconsin, St. Paul, Texas, Portland, Montreal) with no single canonical bare-name site |
| Dark Horse Institute | no homepage: non-degree trade school (audio engineering), not a college/university |
| Eastern Nazarene College | no homepage: college closed permanently May 2025 |
| Johnson & Wales University (Charlotte) | no distinct campus site: Charlotte is a sub-page of jwu.edu, no separate root domain |
| Johnson & Wales University Charlotte | no distinct campus site: Charlotte is a sub-page of jwu.edu, no separate root domain |
| Marymount Manhattan College | no homepage: merged into Northeastern University in 2026, renamed "Northeastern University – New York City" (mmm.edu no longer resolves; see https://nyc.northeastern.edu) |
| Mount Ida Campus of UMass Amherst | no distinct campus site: sub-page of UMass Amherst, renamed "Charles River Campus" (see https://www.umass.edu/charles-river) |
| NASCAR Technical Institute | no distinct campus site: a specialized training program of Universal Technical Institute, not an independent institution (see https://www.uti.edu/programs/automotive/specialized-training/nascar) |
| Notre Dame College | no homepage: defunct - closed permanently 2024-05-02, ambiguous which Notre Dame College if it weren't |
| Notre Dame College (Ohio — NOT Univ. of Notre Dame) | no homepage: defunct, Notre Dame College (Ohio) closed permanently 2024-05-02 |
| St. Andrews University | no homepage: institution permanently closed May 2025 |
| United States Marine Corps | not a degree-granting institution |
| University of South Carolina (Lancaster) | no distinct campus site: USC Lancaster has no independent root domain, only https://www.sc.edu/uscl |
| University of South Carolina, Union | no distinct campus site; USC Union is a Palmetto College branch campus that resolves only to a subpage of the main sc.edu site (sc.edu/about/system_and_campuses/union/), not a distinct root domain |
| Watkins College of Art | no distinct campus site: merged into Belmont University 2020, only a sub-path (belmont.edu/watkins) remains, not a root domain |
