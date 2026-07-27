// Cannon School — The Arts.
//
// Transcribed from source-material/the-arts/cannon/
// "Cannon - The Arts - Arts Redesign Deep Research.md", which carries a source
// URL and a VERIFIED / SCHOOL-CLAIM / NOT FOUND marker on every fact. The
// 44-page Upper School course catalog was text-extracted, which overturned much
// of the earlier baseline.
//
// The headline correction: Cannon DOES compete in the Blumeys. Being in Concord
// (Cabarrus County) does not exclude it — the footprint is regional, the
// school's own Backstage page says the winter show competes, and Blumenthal's
// primary PDFs confirm ten finalist placements across 2023 and 2025 plus 2026
// participation. So this card keeps the Blumey title and carries a real ledger.
// Every located line sits under a "Finalists for…" heading, so the ledger says
// nominations/finalists and never "wins."
//
// The inverse finding, equally decision-relevant: there is NO documented music
// honors pipeline. No All-State or All-District selections, no NCAIS honors
// ensembles, no adjudicated ratings, no Tri-M, and no named jazz festival
// appearances could be confirmed. Rather than fill the honors ladder with
// unsourced claims, card 1c's ladder states the asymmetry outright — strong
// theatre recognition, undocumented music recognition — and leads instead on
// music's real strength, a three-level Ableton/Logic production track and the
// new Texas Grace Audio Lab.
//
// Catalog corrections absorbed here, each of which contradicts the earlier note:
//   - All 22 Upper School arts courses are Honors / AP / Advanced Topics. There
//     is no regular-track arts course, behind a two-year arts requirement.
//   - No "Acting 1-2", no "Stagecraft 1-2", no "Studio Arts I" — the real names
//     are Honors Theater I/II/In Performance and Honors Studio-2D / 3D.
//   - String Ensemble runs I–IV (not II); Music Tech I–III; CDE is I, II, Studio.
//   - "Varsity" Band/Chorus/Orchestra are 7:30 a.m. co-curriculars, not courses.
//   - The TAB pilot was 2011 in the Lower School by Krista Johns, not 2015-16.
//   - The makerspace is "The Mill." "ThinkTank" appears nowhere and is dropped.
//   - Media Arts has NO catalog entry despite being promoted on the website and
//     cited as an AP prerequisite — flagged as a tour question, not asserted.

import type { ArtsProgram } from '../artsProgram.ts'

const CS_ARTS = 'https://www.cannonschool.org/arts'
const CS_VISUAL = 'https://www.cannonschool.org/arts/visual-arts'
const CS_MUSIC = 'https://www.cannonschool.org/arts/music'
const CS_FACILITIES = 'https://www.cannonschool.org/arts/facilities'
const CS_BACKSTAGE =
  'https://www.cannonschool.org/arts/theater/cannon-theater-company-backstage'
const CS_PRODUCTIONS = 'https://www.cannonschool.org/arts/theater/theater-productions'
const CS_VISIONARIES = 'https://www.cannonschool.org/artistic-visionaries'

export const cannon: ArtsProgram = {
  ladder: {
    headline:
      'Every one of the 22 Upper School arts courses is Honors, AP or Advanced Topics — there is no regular-track arts course, behind a two-year arts graduation requirement.',
    subhead:
      'Choice-based (TAB) visual art in every division since 2016-17, piloted in the Lower School back in 2011. A purpose-built 2014 performing arts center whose lobby is the student gallery.',
    stats: [
      { value: 'JrK–12', label: 'choice-based art in every division' },
      { value: '22', label: 'US arts courses — all honors or above' },
      { value: '2 years', label: 'arts required to graduate' },
      { value: '11,486 sq ft', label: 'Cindric center · 450 moveable seats' },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'JrK–4',
        items: [
          'Choice-based (TAB) visual art — drawing, painting, collage, paper sculpture, clay, fibre art',
          'Students work "like practising artists," with autonomy over creative direction',
          'Music built on the Orff approach, expanding into advanced ensembles later',
          'TAB was piloted here in 2011 by Krista Johns, then adopted upward — teacher-originated, roughly 15 years deep',
        ],
      },
      {
        name: 'Middle School',
        grades: '5–8',
        items: [
          'Choice-based art continues: drawing, painting, printmaking, ceramics, sculpture',
          '5th–6th grade arts rotate quarterly; 7th–8th grade are year-long electives',
          'Year-long options include Photography & Tech Art Fusion, Creative Explorations, and Arts Magazine',
          'A separate Lower/Middle School musical for grades 3–6 — an on-ramp years before the Upper School company',
          'Varsity Band spans grades 6–12; Varsity Orchestra is competitive, with seats to win and hold',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'Three visual pathways: Studio Arts, Media Arts & Productions, and Creative Design & Engineering',
          'Visual: Honors Visual Foundations → Studio-2D / 3D → Studio Arts II → III → AP Studio Art; plus Advanced Topics: Art History',
          'Music: Honors Concert Chorus, String Ensemble I–IV, Upper School Band, Jazz Combo, Modern Ensemble, Music Technology I–III',
          'Theater: Honors Theater I, II, and Theater in Performance',
          'Design: Honors CDE I, II and CDE Studio',
        ],
      },
    ],
    enrichmentTitle: 'The enrichment layer — beyond the classroom',
    enrichment: [
      {
        label: 'The 7:30 a.m. Varsity ensembles',
        text: 'Varsity Chorus, Band and Orchestra meet before school for students who want arts beyond their class schedule — which is why they appear nowhere in the course catalog. Varsity Chorus was founded by Rob Burlington, is auditioned, and runs 40 students; its popularity led to the Orchestra and Band. This is the access story: a student whose day is full of AP courses can still sing in an auditioned 40-person chorus, and a 6th grader can play alongside 12th graders. It costs a 7:30 a.m. commitment.',
      },
      {
        label: 'The gallery is the lobby',
        text: 'The light-filled Campbell Gallery greets you as you enter the Cindric Performing Arts Center, so every concert and play audience walks through the student art exhibition. Visual and performing arts share one front door. The gallery also doubles as theatre overflow — any event can be broadcast from the house to the foyer.',
      },
      {
        label: 'The Mill & the Texas Grace Audio Lab',
        text: 'The makerspace is called The Mill, where 3D printers run students’ designs. A recently opened Texas Grace Audio Lab supports sound engineering and music production — the facility behind the three-level music technology track.',
      },
      {
        label: 'A documented arts mission process',
        text: 'Assigned by the Head of School in spring 2022, the three arts directors plus Dr. Regina Nixon spent a year rebuilding Cannon’s artistic mission and vision, surveying students, faculty and parents through an "I like, I wish, I wonder" exercise. The result is meant as a North Star for curriculum and extracurricular decisions. Most schools’ arts pages are marketing; this is a dated process with named owners — and a good tour topic: what actually changed as a result?',
      },
    ],
    photo: {
      src: '/arts/cannon-cpac.jpg',
      name: 'Cindric Performing Arts Center',
      caption:
        'The Leck Family thrust stage, raised 42 inches, under the curved acoustic "clouds" — 450 moveable seats on a flat floor so the room can host dances, dinners and exhibits too.',
      credit: 'cannonschool.org — Arts Facilities',
    },
    sources: [
      { label: 'cannonschool.org — Arts', url: CS_ARTS },
      { label: 'Visual Arts', url: CS_VISUAL },
      { label: 'Arts Facilities', url: CS_FACILITIES },
      { label: 'Artistic Visionaries (leadership, TAB history)', url: CS_VISIONARIES },
    ],
  },

  theatre: {
    headline:
      'Ten Blumey finalist placements across 2023 and 2025, from a four-part season that runs NCTC festival play → Blumey musical → Arts Jam → Cabaret.',
    subhead:
      'Concord’s location does not exclude Cannon — the Blumey footprint is regional, and the school competes every winter.',
    seasonTitle: 'The season rhythm — a four-part year',
    season: [
      {
        season: 'Fall',
        kind: 'One-Acts (NCTC)',
        detail:
          'The Cannon Theater Company performs a fall play at the North Carolina Theatre Conference festival. 2025: "Say It To My Face: Five Short Plays," one of which — "Parker and the City in the Sea" by Ian Shephard — was the NCTC entry.',
      },
      {
        season: 'Winter',
        kind: 'Musical (Blumey)',
        detail:
          '2025-26: Mean Girls: High School Version, Feb 11–14, directed by Andy Macdonald. Recent: Mamma Mia! (2025), Freaky Friday (2023).',
      },
      {
        season: 'Spring & May',
        kind: 'Arts Jam · Cabaret',
        detail:
          'A spring Arts Jam, then an annual end-of-season Cabaret in May — an evening of short scenes, songs and award presentations.',
      },
    ],
    whoRunsIt:
      'Andy Macdonald, Director of Theater Arts since 2012, teaches all three Upper School theater levels and directs both the fall one-acts and the winter musical. Rob Burlington, Director of Music Arts, is music director for the winter musical — so the Blumey-competing show is co-led by the theater and music directors. No technical director is named publicly. The tech story is instead structural: the catwalk above the stage lets students assist on rigging lighting, and the AV control room at the rear of the house was, in the school’s words, "specifically designed for students to assist in the technical side of productions." Note the catalog has no course titled "Acting" or "Stagecraft" despite the website naming them — the real sequence is Honors Theater I, II and Theater in Performance, which can also be entered by doing three company productions instead of the prerequisite.',
    venueNote:
      'All of it happens in the Cindric Performing Arts Center on the Leck Family thrust stage, which extends into the audience on three sides. The hardwood deck is painted black and lets crews securely anchor multiple sets; a structural grid overhead handles set changes and curtain reconfiguration.',
    ledgerTitle: 'The Blumey ledger — finalist placements by year',
    ledger: [
      {
        year: '2026',
        show: 'Mean Girls School Edition',
        result:
          'Participating school, performing Feb 11–14. Nominees and winners for the 2026 cycle were not published at time of research.',
      },
      {
        year: '2025',
        show: 'Mamma Mia!',
        result:
          'Five finalist placements, one in every performance category: Best Actor (Griffen Evans as Harry Bright), Best Actress (Avery Fawcett as Rosie), Best Supporting Actor (Lucas Guilfoyle as Sam Carmichael), Best Supporting Actress (Shah Aashvi as Tanya), Best Featured Performer (Malcolm Musinguzi as Pepper).',
      },
      {
        year: '2024',
        show: 'Not in the nominee list',
        result:
          'Cannon does not appear in either 2024 all-nominees document. It may have participated without earning finalist placements — this is a verified absence from the nominee list, not evidence it sat the year out.',
      },
      {
        year: '2023',
        show: 'Freaky Friday',
        result:
          'Five finalist placements, again one in every performance category: Best Actor (Jonah Feeley as Adam), Best Actress (Annalise Randall-Bauer as Ellie Blake), Best Supporting Actor (Michael Wang as Mike), Best Supporting Actress (Abby Guilfoyle as Torrey), Best Featured Performer (Avery Fawcett).',
      },
    ],
    honestContext:
      'Two things a parent should hold together. The record is real and consistent — a full sweep of all five performance categories in both 2023 and 2025 — but every located line sits under a "Finalists for…" heading, and no Cannon winner line was found in any year checked. Treat this as ten finalist placements, not ten awards. On NCTC, participation is structural and every-year, but no year-by-year regional placement, state advancement or named award could be found, so no ledger is shown for it — the festival draws 3,500+ students from 100+ schools across 130+ productions, with select plays advancing from regionals to state. The director’s own framing is notably not trophy-focused: he says the judges’ feedback and seeing other schools’ work is what makes the festival special. Blumey involvement appears to reach back to at least 2019, but that page is no longer readable.',
    photo: {
      src: '/arts/cannon-ctc-production.png',
      name: 'Cannon Theater Company',
      caption:
        'A company production on the Leck stage — built scenery, stage lighting rigged in part by students from the catwalk above.',
      credit: 'cannonschool.org — Theater',
    },
    sources: [
      { label: 'cannonschool.org — Theater productions', url: CS_PRODUCTIONS },
      { label: 'Cannon Theater Company Backstage', url: CS_BACKSTAGE },
      {
        label: 'Blumenthal Arts — 2025 all nominees & finalists (PDF)',
        url: 'https://www.blumenthalarts.org/assets/doc/2025-Blumey-All-Nominees-and-Finalists-9b848e893a.pdf',
      },
      {
        label: 'Blumenthal Arts — 2023 nominees & finalists (PDF)',
        url: 'https://www.blumenthalarts.org/assets/doc/2023-Blumey-Nominees-and-Finalists-dc56d4a6fb.pdf',
      },
      {
        label: 'Blumenthal Arts — participating schools (PDF)',
        url: 'https://www.blumenthalarts.org/assets/doc/Blumey-Awards-Schools-Web-bf39748e25.pdf',
      },
      { label: 'NCTC — High School Play Festival', url: 'https://nctc.org/programs/high-school-play-festival/' },
    ],
  },

  music: {
    headline:
      'A four-year strings ladder, a Hip-Hop-inclusive Modern Ensemble, and a novice-to-portfolio production track on Ableton and Logic Pro — but no documented external honors pipeline.',
    subhead:
      'All nine Upper School music courses carry an Honors designation and most are repeatable, with the academic record reflecting rising rigour under a consistent course name.',
    tracks: [
      {
        label: 'Auditioned / permission-gated',
        ensembles: ['Honors Jazz Combo', 'Honors String Ensemble I'],
      },
      {
        label: 'Prior experience — or audition if inexperienced',
        ensembles: ['Honors Upper School Band', 'Honors Modern Ensemble'],
      },
      {
        label: 'Open enrolment — no prerequisite',
        ensembles: ['Honors Concert Chorus'],
      },
      {
        label: 'Vertical progression — a four-year ladder',
        ensembles: [
          'Honors String Ensemble I',
          'String Ensemble II',
          'String Ensemble III',
          'String Ensemble IV',
        ],
      },
      {
        label: 'Production track — novice to portfolio',
        ensembles: [
          'Honors Music Technology I',
          'Music Technology II — Ableton Live & Push',
          'Music Technology III — Ableton & Logic Pro',
        ],
      },
    ],
    boardNote:
      'Rob Burlington directs Music Arts (since 2012) and teaches Middle and Upper School chorus; no band, strings, jazz or music-technology instructor is named publicly, and the catalog names no instructors. Two offerings are unusually contemporary for a K–12 department: Modern Ensemble takes "any combination of rhythm section, winds, strings, vocalists, or Hip-Hop MCs" across rock, R&B and rap, working heavily in multi-track recording via Soundtrap — a named Hip-Hop MC role in a for-credit honors ensemble is genuinely rare. The Jazz Combo is audition-only and requires a year of "Jazz 1," a course that does not appear in the Upper School catalog.',
    ladderTitle: 'The honors ladder — and where it goes undocumented',
    ladder: [
      {
        label: 'Join an ensemble',
        text: 'Concert Chorus takes anyone with no prerequisite; Band and Modern Ensemble want prior experience or a director’s audition. Performance is required and forms a large part of the grade.',
      },
      {
        label: 'Audition up, or climb',
        text: 'the Jazz Combo is audition-only, and String Ensemble runs a genuine four-year ladder to "increasingly sophisticated repertoire, higher levels of technical mastery and leadership." Outside the timetable, Varsity Chorus and Varsity Orchestra are auditioned at 7:30 a.m.',
      },
      {
        label: 'Build a portfolio instead',
        text: 'this is where music’s real depth sits. Music Technology I is "designed for the music novice"; II moves to Ableton Live and the Push controller and ends in "a well stocked audio portfolio"; III adds Logic Pro and self-directed projects. Backed by the new Texas Grace Audio Lab. For a student who wants to produce rather than perform, that is a real four-year path.',
      },
      {
        label: 'External honors — not documented',
        text: 'no All-State or All-District selections, no NCAIS honors ensembles, no adjudicated festival ratings, no Tri-M chapter, and no named jazz festival appearances could be confirmed in any source.',
      },
    ],
    ladderNote:
      'That last rung is the honest finding rather than a research failure, and it is worth stating plainly: Cannon’s public arts presence documents participation and facilities in music, not an external-honors pipeline. Theatre carries the school’s entire verified external-recognition load. If your child’s goal is All-State selection, ask directly whether students audition and how they fare.',
    sources: [
      { label: 'cannonschool.org — Music', url: CS_MUSIC },
      { label: 'Arts', url: CS_ARTS },
      { label: 'Artistic Visionaries', url: CS_VISIONARIES },
    ],
  },

  visual: {
    headline:
      'Three visual pathways behind one mandatory gateway course — studio art, media arts, and a design-engineering track running CNC, laser cutting and electronics.',
    subhead:
      'Choice-based practice is written into the catalog itself, not just the marketing: both Studio-2D and Studio-3D are described as choice-based classrooms where students pursue themes they develop independently.',
    mediaTitle: 'Studio media',
    media: [
      { name: '2-D studio', detail: 'drawing, painting, printmaking, digital production' },
      { name: '3-D studio', detail: 'clay, wire, wood, plaster, found objects' },
      { name: 'Digital painting', detail: 'and illustration, within Studio Arts' },
      { name: 'Media Arts', detail: 'graphic design, commercial illustration, photo manipulation, video' },
      { name: 'CDE fabrication', detail: 'CAD, woodworking, metalworking, textiles, 3D printing, laser, CNC' },
      { name: 'Electronics & coding', detail: 'inside an arts track — unusual at K–12' },
    ],
    path: [
      { name: 'Visual Foundations' },
      { name: 'Studio-2D / 3D' },
      { name: 'Studio Arts II · III' },
      { name: 'AP Studio Art', terminal: true },
    ],
    pathNote:
      'Honors Visual Foundations is the single mandatory gateway into every visual pathway. AP offers 2-D Design, 3-D Design and Drawing portfolios and may be repeated for a second portfolio; Advanced Topics: Art History is a second AP-level option for the arts student who is not a maker',
    exhibits: [
      {
        when: 'Rotating',
        name: 'Campbell Gallery',
        detail: 'the lobby of the performing arts centre — every audience walks through it',
      },
      {
        when: 'Year-long',
        name: 'Media Arts Senior Seminar',
        detail: 'a real-world nonprofit client project ending in a presentation of learning',
      },
      {
        when: 'Annual',
        name: 'Arts Magazine',
        detail: 'the student cross-media publication, produced as a Middle School elective',
      },
      {
        when: 'Required',
        name: 'Museum & gallery trips',
        detail: 'named in the catalog as required extensions of the AP Studio Art course',
      },
    ],
    footnote:
      'Krista Johns directs Visual Art — she joined in 2007, piloted TAB in the Lower School in 2011 and became director in 2022. Her framing of why choice-based works: "when you\'re creating work that\'s based on your own experiences and interests, and you\'re not comparing yourself to anyone next to you, you\'re more willing to try new things." No CDE or Media Arts instructor is named. Two caveats worth carrying to a tour: Media Arts is promoted on the website and cited as an AP prerequisite but has NO course entry in the 2025-26 catalog, and AP Studio Art\'s stated prerequisites name "Studio Arts I" and "Media Arts I," neither of which exists as a catalog course — so ask which courses actually satisfy AP entry. No external visual-arts recognition (Scholastic Art & Writing or otherwise) could be found for any year.',
    photo: {
      src: '/arts/cannon-campbell-gallery.jpg',
      name: 'Campbell Gallery',
      caption:
        'Hung with student work from across the divisions. It is the foyer of the Cindric Performing Arts Center, so the art exhibition is the way into every concert and play.',
      credit: 'cannonschool.org — Arts Facilities',
    },
    sources: [
      { label: 'cannonschool.org — Visual Arts', url: CS_VISUAL },
      { label: 'Arts Facilities', url: CS_FACILITIES },
      { label: 'Artistic Visionaries', url: CS_VISIONARIES },
    ],
  },

  verdict: {
    headline:
      'An arts department that weights the arts like academics — 22 courses all at honors or above, a two-year requirement, and a documented strategic mission.',
    subhead:
      'The asymmetry is the thing to understand: theatre carries hard third-party validation, while music’s external recognition is undocumented and its strength lies in production instead.',
    holdsUp: [
      {
        label: 'The arts are weighted like academics',
        text: 'all 22 Upper School arts courses are Honors, AP or Advanced Topics — there is no regular-track arts course — sitting behind a two-year arts graduation requirement. That is a checkable signal about GPA and transcript treatment, not a slogan.',
      },
      {
        label: 'Theatre has hard third-party validation',
        text: 'ten Blumey finalist placements across 2023 and 2025 — a full sweep of all five performance categories in both years — plus an every-year NCTC festival commitment.',
      },
      {
        label: 'Choice-based art is teacher-originated and 15 years deep',
        text: 'TAB was piloted in the Lower School in 2011 by the teacher who now directs visual art, then adopted upward once it worked. The catalog itself, not just the marketing, describes Studio-2D and 3D as choice-based classrooms.',
      },
      {
        label: 'A design-engineering track inside the arts',
        text: 'CDE runs CAD, woodworking, metalworking, electronics, coding, textiles, 3D printing, laser cutting and CNC milling across three levels — unusual for a K–12 arts department, and the strongest single differentiator here.',
      },
      {
        label: 'A real production path for the non-performer',
        text: 'Music Technology I–III takes a novice to a portfolio on Ableton Live and Logic Pro, supported by the new Texas Grace Audio Lab — and it does not depend on the missing honors pipeline.',
      },
      {
        label: 'Access without a timetable conflict',
        text: 'the 7:30 a.m. Varsity ensembles let a student with a full AP schedule still sing in an auditioned 40-person chorus, and put 6th graders alongside 12th graders.',
      },
    ],
    ask: [
      'Media Arts is promoted on your website and named as an AP Studio Art prerequisite, but it has no entry in the course catalog. Is it currently offered, and which courses actually satisfy AP entry?',
      'Ten Blumey finalist placements in 2023 and 2025 but no win I could find — how many Blumey wins has the program had, and in which years?',
      'What are your NCTC results year by year? Participation is clearly annual, but no regional placement, state advancement or named award is published anywhere.',
      'Do music students audition for All-State, All-District or NCAIS honors ensembles, and how do they do? No selections, adjudicated ratings or Tri-M chapter could be found — is that a gap in publishing or in the programme?',
      'Who is the technical director for theatre? And how much of the lighting and control-room work do students genuinely run themselves?',
      'The 2022 arts mission and vision process — what actually changed as a result, in curriculum or extracurricular terms?',
      'Is the parent arts organisation now "Parents at Cannon Create" or still CAFTA? Both names appear on your site.',
      'What does the 7:30 a.m. Varsity commitment really look like across a week, and does it collide with athletics?',
    ],
    sources: [
      { label: 'cannonschool.org — Arts', url: CS_ARTS },
      { label: 'Artistic Visionaries', url: CS_VISIONARIES },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d',
      },
    ],
  },
}
