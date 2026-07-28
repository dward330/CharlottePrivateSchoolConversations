// The "Course Offerings" research area — three per-division cards (Lower /
// Middle / Upper School Courses) on the school detail page, replacing the
// generic prose renderer (see components/CourseOfferings.tsx).
//
// Recreates the design's `#courses` section using the app's own tokens
// (src/index.css): per-card department tabs driving a scrollable course list,
// AP/Post-AP tags in tag-accent and everything else in tag-outline, and a
// SOURCE row per division that respects the hide-sources toggle.
//
// Every course title is transcribed verbatim from that school's OWN published
// curriculum guide or division page, and every description is condensed from
// that school's own catalog prose — see the committed research files under
// source-material/course-offerings/<school>/ for the full hard data, source
// URLs, and per-school gap notes. Nothing here is inferred, averaged, or
// carried across schools.
//
// Divisions differ by school and are labeled with each school's OWN grade
// bands (PDS/Latin lead with TK, Country Day and Cannon with JK/JrK, Charlotte
// Christian puts Grade 5 in Middle School, Davidson Day starts Lower at K).
// A school that does not publish named courses for a division gets subject
// areas instead — that is the correct grain of published data, not a gap to
// paper over. `notPublished` records that honestly on the card.

/** One course row: title + optional short tag + one-sentence description. */
import {
  localized,
  indexOverlay,
  setOverlayIndex,
  overlayIndex,
  hasOverlay,
  type OverlayFile,
} from '../lib/localizeData.ts'

export type Course = {
  /** Course title, verbatim as the school publishes it. */
  title: string
  /**
   * Short qualifier shown beside the title. "AP" / "Post-AP" (and IB, which
   * Country Day genuinely offers) render in tag-accent; everything else —
   * grade bands, Honors, Semester, Year — renders in tag-outline.
   */
  tag?: string
  /** One sentence, condensed from the school's own catalog language. */
  description: string
}

/** One department tab within a division, and the courses behind it. */
export type Department = {
  /** Department name as published, used as the tab label. */
  name: string
  courses: Course[]
}

/** One division card: Lower, Middle, or Upper School. */
export type Division = {
  /** Card title, e.g. "Upper School Courses". */
  title: string
  /** Uppercase kicker showing this school's own grade band, e.g. "GRADES 9 – 12". */
  grades: string
  /** Collapsed-card teaser. Counts must match the data below. */
  teaser: string
  /** Citation for this division, shown in the SOURCE row. */
  source: string
  /** Deep-link URL for the citation, rendered as a clickable link. */
  sourceUrl?: string
  /**
   * Set when the school publishes subject areas rather than named courses for
   * this division. Rendered as an honest note above the list so a parent knows
   * the granularity is the school's choice, not missing research.
   */
  notPublished?: string
  departments: Department[]
}

export type CourseOfferings = {
  /** Collapsed teaser for the section, and the muted count in the header. */
  divisions: Division[]
  /** Curriculum-guide vintage, e.g. "2025-26". Shown in the section header. */
  guideYear: string
}

/* ── Providence Day School ──────────────────────────────────────────────────
   2025-26 Upper and Middle School Course of Study PDFs (149 Upper School
   entries, 28 AP courses). Lower School publishes four core curriculum areas
   plus Special Area Classes, not named courses. PDS does NOT offer IB — its
   second diploma is the school-designed Global Studies Diploma. */
const PROVIDENCE_DAY: CourseOfferings = {
  guideYear: '2025-26',
  divisions: [
    {
      title: 'Lower School Courses',
      grades: 'TK – Grade 5',
      teaser:
        'Four core curriculum areas plus 11 Special Area Classes — Singapore Math and structured literacy from TK.',
      source: "PDS Lower School curriculum & Global Education pages",
      sourceUrl: 'https://www.providenceday.org/lower-school',
      notPublished:
        'Providence Day publishes four core curriculum areas and a Special Area Class list for TK–5, not named courses. There is no Lower School course-of-study guide.',
      departments: [
        {
          name: 'Core Curriculum',
          courses: [
            {
              title: 'Math',
              tag: 'TK–Gr 5',
              description:
                'Uses the concepts of Singapore Math, teaching the why and how behind concepts with bar modeling emphasized in Grades 2–5.',
            },
            {
              title: 'Language Arts',
              tag: 'TK–Gr 5',
              description:
                'A structured-literacy program beginning in TK, systematically fostering phonological awareness, phonics, fluency, vocabulary, and comprehension.',
            },
            {
              title: 'Science',
              tag: 'TK–Gr 5',
              description:
                'Uses inquiry-based methodology with open-ended challenges, empowering students to rely on their own reasoning rather than seeking teacher answers.',
            },
            {
              title: 'Social Studies',
              tag: 'TK–Gr 5',
              description:
                'Students explore identity and community from the TK Goes Global unit outward to Charlotte and the world, with each grade level having its own focus.',
            },
          ],
        },
        {
          name: 'World Language',
          courses: [
            {
              title: 'French, Spanish & Mandarin Exposure',
              tag: 'TK–Gr 1',
              description:
                'Students are exposed to French, Spanish, and Mandarin Chinese during their earliest years at Providence Day.',
            },
            {
              title: 'Selected Language of Study',
              tag: 'Gr 2–5',
              description:
                'By second grade one language is selected for the remaining four years of Lower School — the start of an 11-year journey toward proficiency.',
            },
          ],
        },
        {
          name: 'Special Area Classes',
          courses: [
            { title: 'Art', tag: 'TK–Gr 5', description: 'A Lower School special area class in visual art.' },
            { title: 'Music', tag: 'TK–Gr 5', description: 'A Lower School special area class in music.' },
            {
              title: 'Band, Orchestra & Chorus',
              tag: 'TK–Gr 5',
              description: 'Performing ensembles offered as Lower School special area classes.',
            },
            { title: 'Theatre', tag: 'TK–Gr 5', description: 'A Lower School special area class in theatre.' },
            {
              title: 'Physical Education',
              tag: 'TK–Gr 5',
              description: 'A Lower School special area class in physical education.',
            },
            {
              title: 'Science Lab',
              tag: 'TK–Gr 5',
              description: 'A dedicated Lower School science lab special area class.',
            },
            {
              title: 'Tech Tank',
              tag: 'TK–Gr 5',
              description: "Providence Day's Lower School technology special area class.",
            },
            {
              title: 'IDEAS',
              tag: 'TK–Gr 5',
              description: 'The Lower School strand of IDEAS@PDS, the school’s TK–12 innovation initiative.',
            },
            {
              title: 'Learning Loft',
              tag: 'TK–Gr 5',
              description: 'A Lower School special area class supporting individualized learning.',
            },
            {
              title: 'Library',
              tag: 'TK–Gr 5',
              description: 'A Lower School library special area class.',
            },
          ],
        },
      ],
    },
    {
      title: 'Middle School Courses',
      grades: 'Grades 6 – 8',
      teaser:
        '~75 courses across 7 departments — where math placement paths and the five-language world-language sequence begin.',
      source: "PDS Middle School Course of Study '25–26",
      sourceUrl:
        'https://resources.finalsite.net/images/v1759322022/provday/z3tij4sfwwhthez2vijd/2025-2026MiddleSchoolCourseofStudy.pdf',
      departments: [
        {
          name: 'English',
          courses: [
            {
              title: 'English 6',
              tag: 'Gr 6',
              description:
                'Lays a foundation for effective communication through novels, poetry, short stories, and nonfiction, with paragraph structure and vocabulary in context.',
            },
            {
              title: 'English 7',
              tag: 'Gr 7',
              description:
                'Emphasizes written and verbal expression through literature, composition, and mechanics, introducing thesis statements and the formal research paper.',
            },
            {
              title: 'English 8',
              tag: 'Gr 8',
              description:
                'Students synthesize skills from English 6 and 7, writing analytical essays across genres and analyzing texts independently.',
            },
            {
              title: 'Creative Writing 6',
              tag: 'Semester',
              description:
                'Students write a personal narrative, short story, and poems as a community of writers.',
            },
            {
              title: 'World Myths and Legends',
              tag: 'Gr 6–7',
              description:
                'Myths and legends from six continents featuring King Arthur, Loki, Mulan, Beowulf, and Anansi.',
            },
            {
              title: 'Lights, Camera, Action: Literature through Movies',
              tag: 'Gr 7–8',
              description:
                'A writing-focused course using film to understand tone, imagery, and symbolism.',
            },
          ],
        },
        {
          name: 'Mathematics',
          courses: [
            {
              title: 'Mathematics 6',
              tag: 'Gr 6',
              description:
                'Built on seven foundational elements — number skills, measurement, geometry, patterns and functions, statistics and probability, logic, and algebra.',
            },
            {
              title: 'Math 7',
              tag: 'Gr 7',
              description:
                'Recurring practice on whole numbers, fractions, decimals, percent, ratios, proportions, powers and roots, equations, integers, and rational numbers.',
            },
            {
              title: 'Pre-Algebra 7 – Accelerated',
              tag: 'Accelerated',
              description:
                'Reinforces basic concepts as an introduction to algebra covering the number system, percents, and linear equations and inequalities.',
            },
            {
              title: 'Advanced Pre-Algebra',
              tag: 'Advanced',
              description:
                'Extends Pre-Algebra with rational number computation, equations and inequalities, linear functions, polynomials, and factoring.',
            },
            {
              title: 'Pre-Algebra 8',
              tag: 'Gr 8',
              description:
                'The traditional eighth-grade Pre-Algebra course covering the number system, percents, and linear equations and inequalities.',
            },
            {
              title: 'Algebra I-8 Accelerated',
              tag: 'Accelerated',
              description:
                'Foundation for the Upper School math sequence covering algebraic expressions, linear and quadratic equations, systems, factoring, and radicals.',
            },
            {
              title: 'Advanced Algebra I',
              tag: 'Advanced',
              description:
                'Similar to Algebra I Accelerated with more emphasis on proofs, applications, and mathematical reasoning, plus strong word-problem focus.',
            },
          ],
        },
        {
          name: 'Science',
          courses: [
            {
              title: 'Science 6',
              tag: 'Gr 6',
              description:
                'The first part of an integrated, inquiry-based sequence, with major units on properties of matter and organisms.',
            },
            {
              title: 'Science 7',
              tag: 'Gr 7',
              description:
                'The second part of the integrated sequence, with major units on catastrophic events — weather, earthquakes, volcanoes — and light and optics.',
            },
            {
              title: 'Science 8',
              tag: 'Gr 8',
              description:
                'The final part of the integrated sequence, with units on human body systems and electricity, energy, and alternative resources.',
            },
            {
              title: 'The Amazing Human Body',
              tag: 'Gr 6–7',
              description:
                'The main human body systems with lab specimens, models, microscopes, first aid, and CPR.',
            },
          ],
        },
        {
          name: 'History',
          courses: [
            {
              title: 'History 6',
              tag: 'Gr 6',
              description:
                'Focuses on selected cultures of the ancient and medieval world, stressing note taking, research, map reading, and cooperative learning.',
            },
            {
              title: 'U.S. History 7',
              tag: 'Gr 7',
              description:
                'An in-depth study of the formation and development of the United States from the Constitution to civil rights, relating past to present via current events.',
            },
            {
              title: 'Global Perspectives 8',
              tag: 'Gr 8',
              description:
                'Examines countries, landforms, resources, climates, peoples, cultures, religions, and governmental systems to build global awareness.',
            },
            {
              title: 'History in Action: Collaborative Research',
              tag: 'Gr 7–8',
              description:
                'In-depth historical inquiry on a student-chosen topic presented as a website, documentary, exhibit, performance, or paper.',
            },
            {
              title: 'Contemporary Global Issues',
              tag: 'Gr 7–8',
              description:
                'In-depth investigation of selected current events and their historical context.',
            },
          ],
        },
        {
          name: 'IDEAS@PDS',
          courses: [
            {
              title: 'Computer Applications',
              tag: 'Semester',
              description:
                'Digital and media literacy using the SIFT framework, keyboarding, and Google Sites portfolios.',
            },
            {
              title: 'Computer Programming',
              tag: 'Semester',
              description:
                "Interactive programming in MIT's Scratch to build animations, narratives, and games.",
            },
            {
              title: 'Robotics',
              tag: 'Semester',
              description:
                'Robot development and design using Lego Spike Prime and block-based programming.',
            },
            {
              title: 'Web Design',
              tag: 'Semester',
              description: 'HTML projects using a variety of publishing tools; requires Computer Applications.',
            },
            {
              title: 'Introduction to Engineering 6',
              tag: 'Gr 6',
              description: 'A hands-on STEM introduction for the budding scientist.',
            },
            {
              title: 'SPARK: Environmental Problem Solving by Design',
              tag: 'Gr 6–8',
              description:
                'Design thinking applied to environmental issues via the UN Sustainable Development Goals.',
            },
            {
              title: 'Broadcast Media',
              tag: 'Gr 7–8',
              description:
                'Television production across pre-production, production, and post-production.',
            },
            {
              title: 'Social Entrepreneurship: Incubation & Acceleration',
              tag: 'Gr 7–8',
              description: 'Interdisciplinary innovation work through entrepreneurial sprints.',
            },
            {
              title: 'Engineering the Future',
              tag: 'Gr 7–8',
              description:
                'Labs and hands-on STEM activities benefiting the local and global community.',
            },
            {
              title: 'Introduction to Personal Finance',
              tag: 'Gr 8',
              description: 'Taxes, accounts, credit, investing, insurance, and budgeting.',
            },
          ],
        },
        {
          name: 'World Language',
          courses: [
            {
              title: 'Exploring Latin through Mythology',
              tag: 'Gr 6–8',
              description: 'A semester introduction to Latin through the myths of the classical world.',
            },
            { title: 'Latin 1', tag: 'Gr 7–12', description: 'The Upper School Latin I course, open from Grade 7.' },
            { title: 'Latin 2', tag: 'Gr 8–12', description: 'The Upper School Latin II course, open from Grade 8.' },
            {
              title: 'Spanish 1–4',
              tag: 'Gr 6–8',
              description: 'A four-level Middle School Spanish sequence; levels 2+ require prerequisite approval.',
            },
            {
              title: 'French 1–4',
              tag: 'Gr 6–8',
              description: 'A four-level Middle School French sequence; levels 2+ require prerequisite approval.',
            },
            {
              title: 'Mandarin Chinese 1–4',
              tag: 'Gr 6–8',
              description: 'A four-level Middle School Mandarin sequence; levels 2+ require prerequisite approval.',
            },
            {
              title: 'German 1–3',
              tag: 'Gr 6–8',
              description: 'A three-level Middle School German sequence.',
            },
          ],
        },
        {
          name: 'Fine Arts & PE',
          courses: [
            {
              title: 'Band 6 / Band 7–8',
              tag: 'Year',
              description: 'The Middle School band ensembles, split by grade band.',
            },
            {
              title: 'Chorus 6 / Chorus 7–8',
              tag: 'Year',
              description: 'The Middle School choral ensembles, split by grade band.',
            },
            {
              title: 'Orchestra 6 / Orchestra 7–8',
              tag: 'Year',
              description: 'The Middle School string ensembles, split by grade band.',
            },
            {
              title: 'Art 6 & Art Foundations',
              tag: 'Semester',
              description: 'Introductory Middle School visual art courses.',
            },
            {
              title: 'Introduction to Art and Design',
              tag: 'Semester',
              description: 'An introduction to the elements and principles of art and design.',
            },
            {
              title: 'Introduction to Painting',
              tag: 'Semester',
              description: 'An introductory Middle School painting course.',
            },
            {
              title: 'Introduction to Printmaking',
              tag: 'Semester',
              description: 'An introductory Middle School printmaking course.',
            },
            {
              title: 'Introduction to 3D Design',
              tag: 'Semester',
              description: 'An introductory Middle School three-dimensional design course.',
            },
            {
              title: 'Theatre Arts 6',
              tag: 'Gr 6',
              description: 'The sixth-grade introduction to theatre arts.',
            },
            {
              title: 'Acting 1, 2 & 3',
              tag: 'Semester',
              description: 'A three-level Middle School acting sequence.',
            },
            {
              title: 'Middle School Stagecraft',
              tag: 'Semester',
              description: 'Technical theatre and stagecraft for Middle School students.',
            },
            {
              title: 'Communication Arts',
              tag: 'Gr 6–8',
              description: 'A Middle School course in communication and presentation.',
            },
            {
              title: 'Physical Education/Health 6, 7 & 8',
              tag: 'Required',
              description:
                'Weekly fitness-based exercise and sport skills plus health units on nutrition, substances, media influence, and human development.',
            },
            {
              title: 'Movement & Yoga',
              tag: 'Gr 8',
              description:
                'Dance, yoga, and mindfulness; does not replace the Grade 8 PE requirement.',
            },
          ],
        },
      ],
    },
    {
      title: 'Upper School Courses',
      grades: 'Grades 9 – 12',
      teaser:
        '149 catalogued courses across 11 departments — foundations through 28 AP courses and post-AP mathematics.',
      source: "PDS Upper School Course of Study '25–26",
      sourceUrl:
        'https://resources.finalsite.net/images/v1759758182/provday/wekh9bxtsqah5givkjk2/2025-2026UpperSchoolCourseofStudy.pdf',
      departments: [
        {
          name: 'English',
          courses: [
            {
              title: 'English I',
              tag: 'Gr 9',
              description:
                'Ninth-graders read novels, short stories, and plays including Macbeth and The House on Mango Street, building analytical skills through essays, journals, and a research-based podcast project.',
            },
            {
              title: 'English II',
              tag: 'Gr 10',
              description:
                'Sophomore English focuses writing skills on American literature such as The Great Gatsby and Their Eyes Were Watching God.',
            },
            {
              title: 'Writing Seminar',
              tag: 'Semester',
              description:
                'A junior course in which student writing constitutes the text, emphasizing style, voice, and rhetorical organization.',
            },
            {
              title: 'Creative Writing',
              tag: 'Semester',
              description:
                'Students write original prose fiction and poetry in a workshop setting, inventing characters and plots while critiquing classmates’ work.',
            },
            {
              title: 'New Media Storytelling',
              tag: 'Semester',
              description:
                'Students examine storytelling strategies from news articles to Instagram reels and apply narrative methods across communication formats.',
            },
            {
              title: 'English Studies in Film: Philosophy in Film',
              tag: 'Semester',
              description:
                'Students pair film with classical philosophical texts to investigate good and evil, self, existence, and reality.',
            },
            {
              title: 'Detective and Crime Fiction',
              tag: 'Semester',
              description:
                'Students explore the detective and crime fiction genre from the 1800s to the present across short stories, drama, novels, film, and TV.',
            },
            {
              title: 'Global Literature Topics',
              tag: 'Semester',
              description:
                'Students engage genres spanning Asia, the Caribbean, Africa, and Latin America around a rotating common topic such as gender or justice.',
            },
            {
              title: 'Graphic Novels',
              tag: 'Semester',
              description:
                'Students scrutinize long-form comics as global literature and design a multimedia work of literary analysis culminating in a student-organized comic-con.',
            },
            {
              title: 'Modern Dramatic Literature',
              tag: 'Semester',
              description:
                'A survey of modern drama from Ibsen to Ionesco exploring individualism, empathy, and meaningful communication through reader’s theater.',
            },
            {
              title: 'Shakespeare',
              tag: 'Semester',
              description:
                'Students study The Merchant of Venice, Othello, The Tempest, Measure for Measure, and Richard III, reading plays aloud and analyzing film versions.',
            },
            {
              title: 'War Literature',
              tag: 'Semester',
              description:
                'Students read poetry, songs, plays, novels, and non-fiction spanning the Thirty Years’ War through Afghanistan and Iraq.',
            },
            {
              title: 'Latino American Literature',
              tag: 'Semester',
              description:
                'An introduction to Latino American literature and cultures in the U.S. from 1960 to the present, analyzing diaspora and border identities.',
            },
            {
              title: 'AP African American Studies',
              tag: 'AP',
              description:
                'An interdisciplinary AP course reaching into literature, arts, political science, geography, and science to explore African American experience.',
            },
            {
              title: 'AP English Language and Composition',
              tag: 'AP',
              description:
                'College-level expository, analytical, and argumentative writing drawn from non-fiction genres, with focus on rhetorical technique and logic.',
            },
            {
              title: 'AP English Literature and Composition',
              tag: 'AP',
              description:
                'Refines literary analysis via Moby-Dick, Invisible Man, and Mrs. Dalloway, plus Dickinson, Frost, and Shakespeare, with an outside-reading list.',
            },
          ],
        },
        {
          name: 'History',
          courses: [
            {
              title: 'Global Civics: Government Structures and Economic Systems',
              tag: 'Gr 9',
              description:
                'Focuses on the roles and responsibilities of citizens from local to global perspectives, comparing American government and economic systems to others worldwide.',
            },
            {
              title: 'World History',
              tag: 'Year',
              description:
                'Fosters appreciation for cultural diversity through the geographical and thematic development of events from 1000 CE to the Age of Globalization.',
            },
            {
              title: 'AP World History: Modern',
              tag: 'AP',
              description:
                'Surveys Afro-Eurasian and American societies from 1200 CE to the present around governance, innovation, culture, and human-environment interaction.',
            },
            {
              title: 'United States History',
              tag: 'Year',
              description:
                'A general survey from the European encounter of the Americas to the present, using role-playing simulations and primary-source analysis.',
            },
            {
              title: 'AP United States History',
              tag: 'AP',
              description:
                'A college-level course stressing historical thinking skills — causation, comparison, continuity and change — through critical national trends.',
            },
            {
              title: 'AP European History',
              tag: 'AP',
              description:
                'Investigates major events and ideas from the Renaissance to the present, developing history as an interpretive discipline through original sources.',
            },
            {
              title: 'AP U.S. Government and Politics',
              tag: 'AP',
              description:
                'Gives a critical perspective on American government via constitutional underpinnings, parties, institutions, and civil liberties, plus civic-engagement projects.',
            },
            {
              title: 'AP Human Geography',
              tag: 'AP',
              description:
                'Promotes global literacy through geographic study of population, political organization of space, land use, economic development, and urbanization.',
            },
            {
              title: 'AP Microeconomics',
              tag: 'AP',
              description:
                'Students gain thorough understanding of principles relating to consumers and producers, including supply/demand models and factor markets.',
            },
            {
              title: 'AP Macroeconomics',
              tag: 'AP',
              description:
                'Covers economic principles for the system as a whole — GDP, unemployment, inflation, aggregate demand and supply, and fiscal and monetary policy.',
            },
            {
              title: 'AP Psychology',
              tag: 'AP',
              description:
                'Covers research methods, neuroscience, development, sensation and perception, learning, memory, cognition, personality, and mental health.',
            },
            {
              title: 'Introduction to Psychology',
              tag: 'Semester',
              description:
                'A broad overview of psychology emphasizing everyday application, covering perspectives, research methods, identity, and positive psychology.',
            },
            {
              title: 'Comparative Government and Politics',
              tag: 'Semester',
              description:
                'Students study the governmental systems of the United Kingdom, Nigeria, China, Russia, Iran, and Mexico as case studies in diverse political structures.',
            },
            {
              title: 'Herstory: Women in Global History',
              tag: 'Semester',
              description:
                'Introduces the progression of gender roles and the history of women and gender worldwide over the last 1500 years using primary documents.',
            },
            {
              title: 'Legal Issues',
              tag: 'Semester',
              description:
                'Students explore what it means to think like a lawyer, applying legal case studies to real court cases and arguing as both lawyer and judge.',
            },
            {
              title: 'Economics of Development',
              tag: 'Semester',
              description:
                'Explores international trade, foreign exchange, foreign direct investment, and growth with focus on economic dependencies in Latin America.',
            },
            {
              title: 'Global Studies: Genocide',
              tag: 'Semester',
              description:
                'Introduces the Universal Declaration of Human Rights and investigates past and current genocides and human rights violations through case studies.',
            },
            {
              title: 'Global Studies: Europe and Latin America',
              tag: 'Semester',
              description:
                'A multi-disciplinary examination of regional trends and cultures, generating research-driven policy recommendations.',
            },
            {
              title: 'Global Studies: Comparative Religions',
              tag: 'Semester',
              description:
                'Enhances understanding of Christianity, Judaism, Islam, Hinduism, and Buddhism through primary and secondary readings and philosophical discussion.',
            },
            {
              title: 'Global Studies: Africa',
              tag: 'Semester',
              description:
                'A multi-disciplinary exploration of Sub-Saharan Africa with in-depth study of South Africa, the DRC, Rwanda, and Nigeria.',
            },
            {
              title: 'Global Studies: Asia',
              tag: 'Semester',
              description:
                'A multi-disciplinary exploration of Asia with in-depth examinations of China and the Koreas.',
            },
            {
              title: 'Global Studies: Middle East and North Africa',
              tag: 'Semester',
              description:
                'A multi-disciplinary examination of regional trends and cultures in the Middle East and North Africa through a historical lens.',
            },
            {
              title: 'Global Leadership',
              tag: 'Advanced',
              description:
                'Seniors in the Global Studies Diploma become effective global collaborators and leaders, completing a research project and exit interview process.',
            },
          ],
        },
        {
          name: 'Mathematics',
          courses: [
            {
              title: 'Algebra I',
              tag: 'Year',
              description:
                'A first-year algebra course integrating algebra and physics concepts through data collection, symbolic rule-building, and real-world applications.',
            },
            {
              title: 'Geometry',
              tag: 'Year',
              description:
                'Students study points, lines, planes, triangles, polygons, circles, and solids, exploring congruence and similarity with ACT/SAT geometry content covered.',
            },
            {
              title: 'Geometry (Accelerated)',
              tag: 'Accelerated',
              description:
                'Teaches how mathematics develops from a postulate system using deductive reasoning, with mathematical proof, constructions, and coordinate geometry.',
            },
            {
              title: 'Geometry (Advanced)',
              tag: 'Advanced',
              description:
                'Offers rigorous treatment and in-depth development of direct and indirect proofs across congruence, similarity, circles, and triangle trigonometry.',
            },
            {
              title: 'Algebra II',
              tag: 'Year',
              description:
                'Reviews Algebra I then covers polynomials, linear and quadratic equations, real and complex numbers, logarithms, graphing, inequalities, and functions.',
            },
            {
              title: 'Algebra II/Trigonometry (Accelerated)',
              tag: 'Accelerated',
              description:
                'Students study functions, graphing, rational exponents, polynomials, systems, sequences, series, logarithms, conic sections, and trigonometry.',
            },
            {
              title: 'Algebra II/Trigonometry (Advanced)',
              tag: 'Advanced',
              description:
                'Studies linear through trigonometric functions plus logic, set theory, and proof, seeking algebraic, graphical, numerical, and verbal treatments.',
            },
            {
              title: 'Precalculus',
              tag: 'Year',
              description:
                'Satisfies the four-year requirement via trigonometry and advanced algebraic topics viewed through personal finance, culminating in a personal budget.',
            },
            {
              title: 'Precalculus (Advanced)',
              tag: 'Advanced',
              description:
                'Covers trigonometry, logarithmic and exponential functions, induction, conics, complex numbers, polar coordinates, and limits to prepare for college calculus.',
            },
            {
              title: 'Analysis (Advanced)',
              tag: 'Advanced',
              description:
                'A thorough analysis of polynomial, rational, exponential, and logarithmic functions plus vectors and an introduction to limits and first derivatives.',
            },
            {
              title: 'Statistics',
              tag: 'Year',
              description:
                'An introductory course covering data collection, experimental design, descriptive and inferential statistics, and probability using applets and Excel.',
            },
            {
              title: 'Calculus (Advanced)',
              tag: 'Advanced',
              description:
                'Introduces differential calculus concepts and applications, teaching students to evaluate limits and differentiate and integrate elementary functions.',
            },
            {
              title: 'AP Calculus AB',
              tag: 'AP',
              description:
                'Students learn to evaluate limits, differentiate, and integrate elementary functions, using a graphing calculator as an integral part of the course.',
            },
            {
              title: 'AP Calculus BC',
              tag: 'AP',
              description:
                'Covers AB content plus vector, polar, and parametric equations and the calculus of infinite series.',
            },
            {
              title: 'AP Statistics',
              tag: 'AP',
              description:
                'Students simulate probability distributions and analyze relationships between variables via correlation and regression using calculators and software.',
            },
            {
              title: 'Calculus III (Advanced)',
              tag: 'Post-AP',
              description:
                'Follows BC Calculus with multivariable and vector-valued functions, curvature, double and triple integrals, and vector analysis.',
            },
            {
              title: 'Linear Algebra (Advanced)',
              tag: 'Post-AP',
              description:
                'Moves into three- and n-dimensional space covering matrices, determinants, simultaneous linear equations, vector spaces, rank, inverses, and inner products.',
            },
            {
              title: 'Differential Equations (Advanced)',
              tag: 'Post-AP',
              description:
                'Students examine differential equations and their solutions, Laplace Transforms, linear and nonlinear systems, series methods, and Fourier Series.',
            },
          ],
        },
        {
          name: 'Science',
          courses: [
            {
              title: 'Physics I',
              tag: 'Required',
              description:
                'A modeling-based course in which students develop models for motion, forces, energy, and electrostatics using algebra to express quantitative relationships.',
            },
            {
              title: 'Physics I Accelerated',
              tag: 'Accelerated',
              description:
                'Moves faster and is more mathematically rigorous than Physics I, adding circular motion and waves.',
            },
            {
              title: 'Chemistry I',
              tag: 'Required',
              description:
                'Students build a foundation in matter, composition, periodicity, energy, and reactions, developing models to explain the structure of matter.',
            },
            {
              title: 'Chemistry I Accelerated',
              tag: 'Accelerated',
              description:
                'Covers Chemistry I topics at greater depth and pace, highly recommended for students considering AP sciences.',
            },
            {
              title: 'Biology I',
              tag: 'Required',
              description:
                'A college-preparatory course covering basic ecology, human anatomy and physiology, cell biology, and evolution with mammalian dissection.',
            },
            {
              title: 'Biology I Accelerated',
              tag: 'Accelerated',
              description:
                'Differs significantly in range, depth, pace, and longer-term guided-independent laboratory work, with dissection central.',
            },
            {
              title: 'Anatomy and Physiology',
              tag: 'Semester',
              description:
                'Students learn human anatomy and physiology while working in pairs on a semester-long cat dissection documented in portfolios.',
            },
            {
              title: 'Applied Sports Anatomy',
              tag: 'Semester',
              description:
                'Students learn musculoskeletal anatomy and injury management, completing 15 hours as student athletic trainers for PDS teams.',
            },
            {
              title: 'Astronomy',
              tag: 'Semester',
              description:
                'Students study stars, galaxies, the solar system, and the composition, structure, and origins of the universe using astrolabs and sun spots.',
            },
            {
              title: 'Bioethics/Biotechnology',
              tag: 'Semester',
              description:
                'A lab and case-study course using micropipettes, PCR, DNA isolation, and gel electrophoresis while debating GMOs, transgenics, and cloning.',
            },
            {
              title: 'Environmental Sustainability',
              tag: 'Semester',
              description:
                'A multidisciplinary exploration of sustainable development in urban planning, energy, water, and agriculture with hands-on work in Charger Gardens.',
            },
            {
              title: 'Forensic Science',
              tag: 'Gr 10–12',
              description:
                'Students apply fingerprint analysis, DNA profiling, and bloodstain pattern interpretation through labs, simulations, and case studies.',
            },
            {
              title: 'Microbiology',
              tag: 'Gr 10–12',
              description:
                'A hands-on introduction to bacteria and viruses, identifying environmental bacteria and discussing global topics such as antibiotic resistance.',
            },
            {
              title: 'Neuroscience',
              tag: 'Semester',
              description:
                'An introduction to the cellular and molecular functioning of the nervous system, recording electrical activity from nerves, muscles, and plants.',
            },
            {
              title: 'STEM Research and Design',
              tag: 'Semester',
              description:
                'Students pursue original scientific research, choosing a topic, designing and conducting experiments, and presenting results.',
            },
            {
              title: 'AP Biology',
              tag: 'AP',
              description:
                'Follows the College Board syllabus around evolution, energetics, information storage, and systems interactions with double periods for college-level labs.',
            },
            {
              title: 'AP Chemistry',
              tag: 'AP',
              description:
                'In-depth study of atomic theory, chemical kinetics, thermodynamics, and equilibrium with double class periods for labs.',
            },
            {
              title: 'AP Environmental Science',
              tag: 'AP',
              description:
                'Provides principles to analyze natural and human-made environmental problems, synthesizing physics, chemistry, biology, geology, and economics.',
            },
            {
              title: 'AP Physics 1',
              tag: 'AP',
              description:
                'Students use algebra to study introductory college physics, analyzing data and developing models for systems, fields, forces, conservation, and waves.',
            },
            {
              title: 'AP Physics C',
              tag: 'AP',
              description:
                'Develops classical mechanics and electricity and magnetism concepts, meeting two periods daily for frequent laboratory activities.',
            },
          ],
        },
        {
          name: 'Computing & Innovation',
          courses: [
            {
              title: 'Computer-Aided Design with 3D Printing',
              tag: 'Semester',
              description:
                'An introduction to traditional mechanical drawing using CAD software plus 3D printing, isometric drawings, and full 3D modeling techniques.',
            },
            {
              title: 'Computer Programming with Python',
              tag: 'Semester',
              description:
                'Introduces programming in Python covering variables, data types, iteration, flow of control, functions, GUIs, and event-driven programming.',
            },
            {
              title: 'Advanced Data Structures in Java',
              tag: 'Post-AP',
              description:
                'For students who completed AP CS A, covering data abstraction and encapsulation including stacks, queues, linked lists, binary trees, and hash maps.',
            },
            {
              title: 'Game Development with Unity and C#',
              tag: 'Semester',
              description:
                'Students learn to develop video games from scratch using the C# language and Unity engine via the "Create with Code" curriculum.',
            },
            {
              title: 'iOS Programming with Swift',
              tag: 'Semester',
              description:
                'Students use Xcode and the iOS SDK to learn Swift and the Cocoa Touch frameworks, testing apps on their own mobile devices.',
            },
            {
              title: 'Physical Computing',
              tag: 'Semester',
              description:
                'Students engineer interactive systems with Arduinos and Raspberry Pis using buttons, sensors, displays, LEDs, motors, and wireless modules.',
            },
            {
              title: 'Robotics & Engineering',
              tag: 'Semester',
              description:
                'Explores robotics and engineering foundations and global issues in the field through hands-on problem solving and debate over ethical implications.',
            },
            {
              title: 'AP Computer Science A',
              tag: 'AP',
              description:
                'Follows the College Board syllabus in Java, emphasizing syntax, class structure, object-oriented methodologies, algorithms, and data structures.',
            },
            {
              title: 'AP Computer Science Principles',
              tag: 'AP',
              description:
                'Engages students in creative aspects of computer science using computational tools to analyze large data sets and draw conclusions from trends.',
            },
          ],
        },
        {
          name: 'Design & Entrepreneurship',
          courses: [
            {
              title: 'Broadcast Journalism',
              tag: 'Semester',
              description:
                'Students create and edit compelling stories in Adobe Premiere Pro, producing feature stories, interviews, sports, podcasts, and film challenges.',
            },
            {
              title: 'Introduction to Financial Analytics',
              tag: 'Gr 10–12',
              description:
                'Covers daily personal finance skills through advanced topics such as the difference between fundamental and technical analysis.',
            },
            {
              title: 'Architecture Design',
              tag: 'Semester',
              description:
                'Focuses on architectural design principles and Building Information Modeling using 3D CAD tools such as REVIT for floor plans, sections, and elevations.',
            },
            {
              title: 'Social Entrepreneurship',
              tag: 'Gr 10–12',
              description:
                'An experiential course guiding students to launch businesses creating social value, rapidly testing ideas against customer and marketplace feedback.',
            },
            {
              title: 'STEM Research and Design',
              tag: 'Semester',
              description:
                'Students pursue original scientific research, designing and conducting experiments and presenting results; also carries Science credit.',
            },
            {
              title: 'Design & Entrepreneurship',
              tag: 'Semester',
              description:
                'Students cultivate design-thinking skills as a studio of designers and enterprise of entrepreneurs to address pressing issues facing students.',
            },
          ],
        },
        {
          name: 'World Language',
          courses: [
            {
              title: 'French / German / Spanish I–V',
              tag: 'Year',
              description:
                'Sequenced ACTFL-aligned courses progressing from Novice High through Intermediate Mid 2 proficiency across themes from family to health and storytelling.',
            },
            {
              title: 'French / German / Spanish 6',
              tag: 'Advanced',
              description:
                'Advanced courses promoting fluency and accuracy toward Intermediate High proficiency, exploring culture in contemporary and historical contexts.',
            },
            {
              title: 'Spanish 7 Advanced: Conversation and Culture',
              tag: 'Advanced',
              description:
                'Develops strong conversational skills and deeper appreciation of Hispanic culture through formal and colloquial language and contact with native speakers.',
            },
            {
              title: 'French 7 Advanced: Francophone Culture through Literature',
              tag: 'Advanced',
              description:
                'Improves proficiency and cultural awareness through francophone novels and graphic novels such as Oscar et la Dame Rose and Aya de Yopoungon.',
            },
            {
              title: 'French 7 Advanced: Francophone Culture through Movies',
              tag: 'Advanced',
              description:
                'Improves proficiency and cultural awareness through francophone films such as Bienvenue Chez les Ch’tis and Mariam.',
            },
            {
              title: 'AP French Language',
              tag: 'AP',
              description:
                'Prepares seniors for the AP French Language and Culture exam through persuasive essays and timed guided conversations using authentic sources.',
            },
            {
              title: 'AP Spanish Language',
              tag: 'AP',
              description:
                'Prepares seniors for the AP Spanish Language Exam with a holistic proficiency approach and Spanish-only classroom conversation.',
            },
            {
              title: 'Latin 1',
              tag: 'Year',
              description:
                'Familiarizes students with classical language acquisition through language, historical context, and Rome’s impact, covering daily life, gods, and heroes.',
            },
            {
              title: 'Latin 2',
              tag: 'Year',
              description:
                'Students read Latin stories set in ancient Rome, studying grammar concepts through themes of feasting, bathing, piracy, gladiators, and political unrest.',
            },
            {
              title: 'Latin 3',
              tag: 'Year',
              description:
                'Reviews grammar and introduces clauses, progressing to unadapted Latin through the prose of Livy and Pliny and the poetry of Catullus.',
            },
            {
              title: 'Latin 4',
              tag: 'Year',
              description:
                'A literature course exploring the poetry of Catullus, Ovid, and Vergil, reading Latin aloud to hear meter and evaluate literary devices.',
            },
            {
              title: 'Latin 5 (Advanced)',
              tag: 'Advanced',
              description:
                'A prose and poetry literature course with a project-based comparative-texts component spanning Vergil, Pliny, Catullus, Ovid, Vespucci, and Boccaccio.',
            },
            {
              title: 'AP Latin',
              tag: 'AP',
              description:
                'Presents the material and skills for the AP Latin Exam, analyzing text, recognizing literary devices, and citing underlying themes.',
            },
            {
              title: 'Mandarin Chinese 1–5',
              tag: 'Year',
              description:
                'Sequenced courses from Novice Mid to Intermediate Mid 1 proficiency across themes such as Greetings, Dining, Travel, and In the Restaurant.',
            },
            {
              title: 'Mandarin Chinese 6 (Advanced)',
              tag: 'Advanced',
              description:
                'Consolidates Intermediate Mid 2 abilities while exploring contemporary Chinese culture in educational, social, and technological contexts.',
            },
            {
              title: 'Mandarin Chinese 7 (Advanced)',
              tag: 'Advanced',
              description:
                'Continues Intermediate Mid 2 consolidation, exploring culture through Education, Festivals, Environmental Challenges, and Healthy Living.',
            },
            {
              title: 'AP Chinese Language and Culture',
              tag: 'AP',
              description:
                'Covers aural and oral skills, reading comprehension, grammar, and composition across the five goal areas, developing awareness of China’s global role.',
            },
          ],
        },
        {
          name: 'Visual Arts',
          courses: [
            {
              title: 'Foundations of Art and Design',
              tag: 'Prerequisite',
              description:
                'Students learn to communicate visually through elements and principles of aesthetic design, exploring drawing, painting, and 3D design.',
            },
            {
              title: 'Drawing',
              tag: 'Semester',
              description:
                'An introduction to drawing as visual investigation involving perspective, proportion, rendering, and expression across various techniques and media.',
            },
            {
              title: 'Painting',
              tag: 'Semester',
              description:
                'Provides a foundation of painting concepts and techniques with water-based and mixed media, brush technique, and basic color theory.',
            },
            {
              title: '3D Design',
              tag: 'Semester',
              description:
                'Focuses on three-dimensional elements and principles through figurative and non-figurative sculpture, assemblage, ceramics, and installation.',
            },
            {
              title: 'Photography',
              tag: 'Semester',
              description:
                'Students learn traditional black-and-white darkroom processes from film negatives plus digital color correction and manipulation in Adobe Photoshop.',
            },
            {
              title: 'Digital Media',
              tag: 'Semester',
              description:
                'Introduces Adobe Photoshop, InDesign, Illustrator, and Premiere Pro for print, video, and web projects including logo design and photo compositing.',
            },
            {
              title: 'Studio Art',
              tag: 'Semester',
              description:
                'For highly motivated students ready to work independently, practicing various media, art criticism, and an individual exploratory approach.',
            },
            {
              title: 'Understanding Art: A Global View',
              tag: 'Semester',
              description:
                'Examines fine art across cultures with focus on Postmodern and Global Contemporary periods, emphasizing visual literacy.',
            },
            {
              title: 'Yearbook',
              tag: 'Year',
              description:
                'A collaborative course using Photoshop and InDesign to design and produce the school’s yearbook, developing graphic design and interview skills.',
            },
            {
              title: 'AP Art History',
              tag: 'AP',
              description:
                'From Paleolithic cave paintings to contemporary works, makes the serious art student aware of historical styles, movements, and individual artists.',
            },
            {
              title: 'AP Art and Design',
              tag: 'AP',
              description:
                'A year-long program of three portfolio courses — AP 2-D Art and Design, AP 3-D Art and Design, and AP Drawing — developing sustained investigation.',
            },
          ],
        },
        {
          name: 'Performing Arts',
          courses: [
            {
              title: 'Band',
              tag: 'Year',
              description:
                'Students explore, rehearse, and perform wind band repertoire in an ensemble setting, also performing at athletic events as pep band.',
            },
            {
              title: 'Chorus',
              tag: 'Year',
              description:
                'Students sing music representing a variety of genres in an ensemble, working for unified tone quality and intonation across contests and concerts.',
            },
            {
              title: 'Jazz Ensemble',
              tag: 'Audition',
              description:
                'Provides instruction in performing various jazz styles with practical preparation in improvisation, harmony, and chord/scale relationships.',
            },
            {
              title: 'Orchestra',
              tag: 'Year',
              description:
                'Offers instruction and performance on orchestral stringed instruments, mastering tone, intonation, technique, and interpretation.',
            },
            {
              title: 'Theatre I: Introduction to Performance',
              tag: 'Semester',
              description:
                'Introduces theatrical performance from the actor’s perspective through pantomime, improvisation, scene work, and contentless scenes.',
            },
            {
              title: 'Theatre II: Advanced Acting',
              tag: 'Semester',
              description:
                'Explores advanced techniques including Meisner and Stanislavski, musical theatre, text and character analysis, and audition technique.',
            },
            {
              title: 'Theatrical Performing Arts Lab',
              tag: 'Semester',
              description:
                'Students select, cast, design, rehearse, and produce a one-act play, with tech-focused students serving as designers.',
            },
            {
              title: 'Theatre Around the World',
              tag: 'Semester',
              description:
                'Examines global theatrical traditions including Japanese Noh, Indian Kathakali, UK Pantomime, Italian Opera, and Brazilian Theatre of the Oppressed.',
            },
            {
              title: 'Theatrical Production and Design',
              tag: 'Semester',
              description:
                'Students explore costumes, stage makeup, props, and stage management, learning sewing, special-effect makeup, and prop building.',
            },
            {
              title: 'RE(ACT): Theatre and Social Change',
              tag: 'Semester',
              description:
                'Establishes dramatic performance as social change, studying Augusto Boal’s Theatre of the Oppressed and modern plays on world events.',
            },
            {
              title: 'Technical Theatre',
              tag: 'Semester',
              description:
                'A hands-on course in which students design and build scenery, paint backdrops, focus lighting, and create sound and special effects.',
            },
            {
              title: 'Honors Band',
              tag: 'Honors',
              description:
                'For seniors who completed three years of Upper School Band, meeting audition requirements and additional instructor-set requirements.',
            },
            {
              title: 'Honors Chorus',
              tag: 'Honors',
              description:
                'For seniors who completed three years of Upper School Chorus, meeting audition and additional course requirements.',
            },
            {
              title: 'Honors Jazz Ensemble',
              tag: 'Honors',
              description:
                'For seniors who completed three years of Upper School Band or Jazz Ensemble, meeting audition and additional requirements.',
            },
            {
              title: 'Honors Orchestra',
              tag: 'Honors',
              description:
                'For seniors who completed three years of Upper School Orchestra, meeting audition and additional requirements.',
            },
            {
              title: 'AP Music Theory',
              tag: 'AP',
              description:
                'Students study melody, harmony, texture, rhythm, form, and some history and style, entering with basic theory and notation skills.',
            },
          ],
        },
        {
          name: 'PE & Health',
          courses: [
            {
              title: 'Ninth Grade Health',
              tag: 'Required',
              description:
                'Empowers students to research, analyze, and set goals across six aspects of health: spiritual, mental, physical, intellectual, environmental, and social.',
            },
            {
              title: 'P.E. — Lifetime Wellness',
              tag: 'Gateway',
              description:
                'Students study fitness, health, and wellness concepts using heart rate monitors and fitness lab testing, culminating in a personal fitness program.',
            },
            {
              title: 'P.E. — Athletic Development',
              tag: 'Semester',
              description:
                'Emphasizes personal strength and movement enhancement through Olympic lifts, metabolic conditioning, plyometrics, agility, and core stability.',
            },
            {
              title: 'P.E. — Dancercise',
              tag: 'Semester',
              description:
                'Students learn techniques from jazz to hip hop while improving fitness; may be taken only once for a half unit of credit.',
            },
            {
              title: 'P.E. — Dancercise II',
              tag: 'Semester',
              description:
                'Advanced instruction in dance and hatha yoga with advanced jazz and ballet movements plus mindfulness exercises.',
            },
            {
              title: 'P.E. — Yoga and Mindfulness',
              tag: 'Semester',
              description:
                'Students gain understanding of yoga’s history and philosophy alongside daily practice of poses and vinyasas for mental and physical benefit.',
            },
            {
              title: 'P.E. — International Games',
              tag: 'Semester',
              description:
                'Combines core fitness components with the history and play of games from around the world such as Sepak Takraw, Floorball, and Gaelic Football.',
            },
          ],
        },
        {
          name: 'Teaching',
          courses: [
            {
              title: 'The Art and Science of Teaching',
              tag: 'Gr 11–12',
              description:
                'Students explore the teaching profession through child development, psychology of learning, instructional practices, and classroom management.',
            },
          ],
        },
      ],
    },
  ],
}

/* ── Charlotte Latin School ─────────────────────────────────────────────────
   Live Upper School course-offerings page (129 courses, 13 departments, 22 AP
   subjects per the school's own profile). Middle School is the one division
   where Latin publishes real per-course prose; Upper School publishes titles
   only, so Upper descriptions are department-level framing (see the research
   file's gap note). Lower School publishes subject areas. */
const CHARLOTTE_LATIN: CourseOfferings = {
  guideYear: 'current listing',
  divisions: [
    {
      title: 'Lower School Courses',
      grades: 'TK – Grade 5',
      teaser:
        '11 subject areas across 3 groupings — structured literacy on six components, Spanish from TK, instrument choice in Grade 5.',
      source: 'Charlotte Latin Lower School curriculum page',
      sourceUrl: 'https://www.charlottelatin.org/academics/lower-school',
      notPublished:
        'Charlotte Latin publishes Lower School subject areas, not named courses. The /academics/lower-school/curriculum path is an unpublished placeholder.',
      departments: [
        {
          name: 'Core Academics',
          courses: [
            {
              title: 'Structured Literacy',
              tag: 'TK–Gr 5',
              description:
                'Built on six components: phonology, sound-symbol association, syllable, morphology, syntax, and semantics.',
            },
            {
              title: 'Mathematics',
              tag: 'TK–Gr 5',
              description: 'Taught through a concrete-pictorial-abstract progression.',
            },
            {
              title: 'Science',
              tag: 'TK–Gr 5',
              description: 'Inquiry-based investigations across the Lower School years.',
            },
            {
              title: 'History / Social Studies',
              tag: 'TK–Gr 5',
              description:
                'Students discover the story of our country and world from varied perspectives.',
            },
            {
              title: 'STEAM',
              tag: 'TK–Gr 2',
              description: 'Integrated STEAM instruction in the earliest grades.',
            },
          ],
        },
        {
          name: 'World Language',
          courses: [
            {
              title: 'Spanish',
              tag: 'TK–Gr 5',
              description:
                'Interpretive, interpersonal, and presentational modes developed via stories, songs, games, and movement.',
            },
          ],
        },
        {
          name: 'Arts, PE & Library',
          courses: [
            { title: 'Music', tag: 'TK–Gr 5', description: 'Music instruction from TK onward.' },
            { title: 'Art', tag: 'TK–Gr 5', description: 'Art instruction from TK onward.' },
            {
              title: 'Band / Strings / Choir',
              tag: 'Gr 5',
              description:
                'In Grade 5 students choose an instrument for Band or Strings, with Choir also available.',
            },
            {
              title: 'Physical Education',
              tag: 'TK–Gr 5',
              description:
                'Lifelong wellness through team and individual sports and health education.',
            },
            {
              title: 'Library',
              tag: 'TK–Gr 5',
              description: 'Library instruction anchored by a 16,000-volume print collection.',
            },
          ],
        },
      ],
    },
    {
      title: 'Middle School Courses',
      grades: 'Grades 6 – 8',
      teaser:
        '22 courses with published descriptions across 5 departments — plus Fab Lab STEAM and the Speech & Debate on-ramp.',
      source: 'Charlotte Latin Middle School page',
      sourceUrl: 'https://www.charlottelatin.org/academics/middle-school',
      departments: [
        {
          name: 'English',
          courses: [
            {
              title: 'English 6',
              tag: 'Gr 6',
              description:
                'Students practice skills that help them develop as public speakers and confident readers and writers.',
            },
            {
              title: 'English 7',
              tag: 'Gr 7',
              description:
                'Designed to inspire a love of reading and help students develop into lifelong learners.',
            },
            {
              title: 'English 8',
              tag: 'Gr 8',
              description: 'Students develop as mature readers and confident writers.',
            },
          ],
        },
        {
          name: 'History',
          courses: [
            {
              title: 'History 6: Ancient World History & Culture',
              tag: 'Gr 6',
              description:
                'Examines ancient civilizations found in the Middle East, Africa, China, India, and Europe, and makes connections to current events.',
            },
            {
              title: 'History 7: A More Perfect Union',
              tag: 'Gr 7',
              description:
                'Covers English migrations and the transatlantic slave trade through Reconstruction.',
            },
            {
              title: 'History 8',
              tag: 'Gr 8',
              description:
                'Post-Civil War to modern day through the lens of five core ideals: equality, rights, liberty, opportunity, and democracy.',
            },
          ],
        },
        {
          name: 'Mathematics',
          courses: [
            {
              title: 'Math 6',
              tag: 'Gr 6',
              description:
                'Enhances students’ core math skills while strengthening their ability to think critically.',
            },
            {
              title: 'Pre-Algebra',
              tag: 'Gr 6–7',
              description: 'Builds a strong foundation for success in algebra.',
            },
            {
              title: 'Advanced Pre-Algebra',
              tag: 'Advanced',
              description: 'A bridge between concrete and abstract mathematical thinking.',
            },
            {
              title: 'Algebra IA',
              tag: 'Gr 8',
              description: 'The first year of a two-year sequence.',
            },
            {
              title: 'Algebra I',
              tag: 'Gr 8',
              description:
                'A full-year course covering foundational skills and deep conceptual understanding.',
            },
            {
              title: 'Advanced Algebra',
              tag: 'Advanced',
              description:
                'For students seeking an advanced and challenging mathematical experience.',
            },
          ],
        },
        {
          name: 'Science',
          courses: [
            {
              title: 'Science 6',
              tag: 'Gr 6',
              description:
                'Explores how the world is organized, across the living and non-living world.',
            },
            {
              title: 'Science 7',
              tag: 'Gr 7',
              description:
                'An integrated approach focusing on lab skills, introductory chemistry, and human biology.',
            },
            {
              title: 'Science 8',
              tag: 'Gr 8',
              description:
                'Uses the geologic timeline to explore space, geology, natural selection and evolution, and environmental science.',
            },
          ],
        },
        {
          name: 'World Languages',
          courses: [
            {
              title: 'Latin 7',
              tag: 'Gr 7',
              description:
                '"Are you ready to travel back in time?" — the Middle School introduction to Latin.',
            },
            {
              title: 'Latin I',
              tag: 'Gr 8',
              description: 'The Upper School Latin I credit taken in Middle School.',
            },
            { title: 'French 6', tag: 'Gr 6', description: 'The sixth-grade French course.' },
            { title: 'French 7', tag: 'Gr 7', description: 'The seventh-grade French course.' },
            {
              title: 'French I (MS)',
              tag: 'Gr 8',
              description: 'The Upper School French I credit taken in Middle School.',
            },
            { title: 'Spanish 6', tag: 'Gr 6', description: 'The sixth-grade Spanish course.' },
            { title: 'Spanish 7', tag: 'Gr 7', description: 'The seventh-grade Spanish course.' },
            {
              title: 'Spanish I (MS)',
              tag: 'Gr 8',
              description: 'The Upper School Spanish I credit taken in Middle School.',
            },
          ],
        },
        {
          name: 'Electives',
          courses: [
            {
              title: 'Art / Band / Concert Choir / Strings',
              tag: 'Gr 6',
              description: 'The Grade 6 elective slate; titles are published without descriptions.',
            },
            {
              title: 'Engineering',
              tag: 'Gr 6',
              description: 'A Grade 6 elective anchored by the school’s Fab Lab.',
            },
            {
              title: 'Computer Programming',
              tag: 'Gr 7–8',
              description: 'Added to the elective slate in Grades 7 and 8.',
            },
            {
              title: 'Drama',
              tag: 'Gr 7–8',
              description: 'Added to the elective slate in Grades 7 and 8.',
            },
            {
              title: 'Leadership Lab',
              tag: 'Gr 7–8',
              description: 'Added to the elective slate in Grades 7 and 8.',
            },
            {
              title: 'Speech and Debate',
              tag: 'Gr 7–8',
              description:
                'The Middle School on-ramp to Charlotte Latin’s nationally ranked Speech and Debate program.',
            },
          ],
        },
      ],
    },
    {
      title: 'Upper School Courses',
      grades: 'Grades 9 – 12',
      teaser:
        '129 courses across 13 departments — 22 AP subjects, Greek as a second language, and an MIT-network Fab Lab.',
      source: 'Charlotte Latin Upper School course offerings',
      sourceUrl: 'https://www.charlottelatin.org/academics/upper-school/course-offerings',
      notPublished:
        'Charlotte Latin publishes Upper School course titles without per-course descriptions. Titles here are verbatim; descriptions are drawn from the school’s department-level framing.',
      departments: [
        {
          name: 'English',
          courses: [
            {
              title: 'World Literature',
              tag: 'Gr 9',
              description:
                'The ninth-grade entry point to the Upper School English sequence, surveying world literature.',
            },
            {
              title: 'Composition',
              tag: 'Gr 10',
              description:
                'Sophomore-year focus on composition and the mechanics of academic writing.',
            },
            {
              title: 'American Literature',
              tag: 'Gr 11',
              description: 'The junior-year survey of American literature.',
            },
            {
              title: 'American Literature (Honors)',
              tag: 'Honors',
              description: 'The American Literature sequence at honors pace and depth.',
            },
            {
              title: 'English 12 AP: Literature and Composition',
              tag: 'AP',
              description: 'College-level literary analysis and composition for seniors.',
            },
            {
              title: 'Literature of War — Stories, Secrets, and Survival',
              tag: 'Semester',
              description: 'A senior semester elective on the literature of war.',
            },
            {
              title: 'Horror & The Other in Western Literature',
              tag: 'Semester',
              description: 'A senior semester elective on horror and otherness in the Western canon.',
            },
            {
              title: 'From Book To Box Office',
              tag: 'Semester',
              description:
                'A senior semester elective comparing literary works with their film adaptations.',
            },
            {
              title: 'Shakespeare and the Human Condition',
              tag: 'Semester',
              description:
                'A senior semester elective on Shakespeare’s treatment of the human condition.',
            },
            {
              title: 'Exploring Imaginary Worlds in Fantasy Literature',
              tag: 'Semester',
              description: 'A senior semester elective on world-building in fantasy literature.',
            },
            {
              title: 'Early British Literature — Heroes, Myths, & Monsters',
              tag: 'Semester',
              description: 'A senior semester elective on early British literature.',
            },
            {
              title: 'Visions of the Future',
              tag: 'Semester',
              description: 'A senior semester elective on speculative and futurist literature.',
            },
          ],
        },
        {
          name: 'History',
          courses: [
            { title: 'World History I', tag: 'Gr 9', description: 'The ninth-grade world history survey.' },
            {
              title: 'World History II',
              tag: 'Gr 10',
              description: 'The sophomore continuation of the world history sequence.',
            },
            {
              title: 'United States History',
              tag: 'Gr 11',
              description: 'The junior-year United States history survey.',
            },
            {
              title: 'United States History (AP)',
              tag: 'AP',
              description: 'College-level U.S. history.',
            },
            { title: 'European History (AP)', tag: 'AP', description: 'College-level European history.' },
            {
              title: 'United States Government and Politics (AP)',
              tag: 'AP',
              description: 'College-level American government and politics.',
            },
            {
              title: 'Comparative Government and Politics (AP)',
              tag: 'AP',
              description: 'College-level comparative government and politics.',
            },
            {
              title: 'Honors American Studies',
              tag: 'Honors',
              description:
                'An honors course the school’s profile describes as equivalent in rigor to AP U.S. History.',
            },
            {
              title: 'History of Music Seminar',
              tag: 'Honors',
              description: 'An honors seminar on the history of music.',
            },
            {
              title: 'Strangers in a Common Land: Global Immigration and Migration',
              tag: 'Honors',
              description: 'An honors course on global immigration and migration.',
            },
          ],
        },
        {
          name: 'Humanities & Social Sciences',
          courses: [
            {
              title: 'Economics (AP)',
              tag: 'AP',
              description:
                'College-level economics covering both macroeconomics and microeconomics.',
            },
            { title: 'Psychology (AP)', tag: 'AP', description: 'College-level psychology.' },
            {
              title: 'Philosophy: The Love of Wisdom',
              tag: 'Honors',
              description: 'An honors introduction to philosophical inquiry.',
            },
            {
              title: 'Defining Moments: The Civil Rights Movement',
              tag: 'Semester',
              description: 'A semester elective on the Civil Rights Movement.',
            },
          ],
        },
        {
          name: 'Mathematics',
          courses: [
            { title: 'Algebra I', tag: 'Year', description: 'The first-year algebra course.' },
            { title: 'Algebra IB', tag: 'Year', description: 'A second entry point in the algebra sequence.' },
            { title: 'Geometry', tag: 'Year', description: 'The standard geometry course.' },
            { title: 'Geometry (Honors)', tag: 'Honors', description: 'Geometry at honors pace and depth.' },
            {
              title: 'Algebra II/Trigonometry',
              tag: 'Year',
              description: 'Second-year algebra combined with trigonometry.',
            },
            {
              title: 'Algebra II/Trigonometry (Honors)',
              tag: 'Honors',
              description: 'The Algebra II/Trigonometry sequence at honors level.',
            },
            {
              title: 'Advanced Functions and Trigonometry',
              tag: 'Year',
              description: 'Advanced work in functions and trigonometry.',
            },
            { title: 'Pre-Calculus', tag: 'Year', description: 'The standard pre-calculus course.' },
            {
              title: 'Pre-Calculus (Honors)',
              tag: 'Honors',
              description: 'Pre-calculus at honors pace and depth.',
            },
            { title: 'Calculus', tag: 'Year', description: 'A non-AP calculus course.' },
            {
              title: 'Mathematics of Social Choice and Management Science',
              tag: 'Honors',
              description:
                'An honors course applying mathematics to social choice and management science.',
            },
            {
              title: 'Introduction to Probability and Statistics',
              tag: 'Honors',
              description: 'An honors introduction to probability and statistics.',
            },
            {
              title: 'Data Analytics: How Do They Know?',
              tag: 'Honors',
              description: 'An honors course in data analytics.',
            },
            { title: 'Statistics (AP)', tag: 'AP', description: 'College-level statistics.' },
            {
              title: 'Calculus (AP-AB)',
              tag: 'AP',
              description: 'College-level differential and integral calculus, AB syllabus.',
            },
            { title: 'Calculus (AP-BC)', tag: 'AP', description: 'College-level calculus, BC syllabus.' },
          ],
        },
        {
          name: 'Science',
          courses: [
            {
              title: 'Conceptual Physics',
              tag: 'Gr 9',
              description: 'The ninth-grade physics-first entry to the science sequence.',
            },
            {
              title: 'Advanced Conceptual Physics',
              tag: 'Advanced',
              description: 'Conceptual Physics at accelerated pace and depth.',
            },
            { title: 'Chemistry', tag: 'Gr 10', description: 'The sophomore-year chemistry course.' },
            {
              title: 'Chemistry (Honors)',
              tag: 'Honors',
              description: 'Chemistry at honors pace and depth.',
            },
            {
              title: 'Chemistry II (AP)',
              tag: 'AP',
              description: 'College-level second-year chemistry.',
            },
            { title: 'Biology', tag: 'Gr 11', description: 'The junior-year biology course.' },
            { title: 'Biology (Honors)', tag: 'Honors', description: 'Biology at honors pace and depth.' },
            { title: 'Biology (AP)', tag: 'AP', description: 'College-level biology.' },
            {
              title: 'Environmental Science (AP)',
              tag: 'AP',
              description: 'College-level environmental science.',
            },
            {
              title: 'Physics (Honors)',
              tag: 'Honors',
              description: 'Honors-level physics beyond the ninth-grade course.',
            },
            {
              title: 'Physics C (Mechanics) (AP)',
              tag: 'AP',
              description: 'Calculus-based college physics in mechanics.',
            },
            {
              title: 'Physics C (Mechanics and E&M) (AP)',
              tag: 'AP',
              description:
                'Calculus-based college physics in mechanics and electricity and magnetism.',
            },
            { title: 'Astronomy', tag: 'Elective', description: 'An elective course in astronomy.' },
            { title: 'Genetics', tag: 'Elective', description: 'An elective course in genetics.' },
            {
              title: 'Human Anatomy and Physiology',
              tag: 'Elective',
              description: 'An elective course in human anatomy and physiology.',
            },
            {
              title: 'Science of Medicine',
              tag: 'Elective',
              description: 'An elective course on the science underpinning medicine.',
            },
          ],
        },
        {
          name: 'World Languages',
          courses: [
            { title: 'French I–V', tag: 'Year', description: 'A five-level French sequence.' },
            {
              title: 'French III/IV Honors',
              tag: 'Honors',
              description: 'Honors-level French at the third and fourth years.',
            },
            {
              title: 'French Language & Culture (AP)',
              tag: 'AP',
              description: 'College-level French language and culture.',
            },
            {
              title: 'Spanish I, 1B, II, III, IV, V',
              tag: 'Year',
              description:
                'The Spanish sequence, with V split into Contemporary Issues of the Hispanic World and Composition and Conversation.',
            },
            {
              title: 'Spanish III/IV Honors',
              tag: 'Honors',
              description: 'Honors-level Spanish at the third and fourth years.',
            },
            {
              title: 'Spanish Language and Culture (AP)',
              tag: 'AP',
              description: 'College-level Spanish language and culture.',
            },
            {
              title: 'Spanish Literature and Culture (AP)',
              tag: 'AP',
              description: 'College-level Spanish literature and culture.',
            },
            { title: 'Latin I–V', tag: 'Year', description: 'A five-level Latin sequence.' },
            {
              title: 'Latin III Honors / Latin IV (Honors)',
              tag: 'Honors',
              description: 'Honors-level Latin.',
            },
            { title: 'Latin V (AP)', tag: 'AP', description: 'College-level Latin.' },
            {
              title: 'Greek III (Honors)',
              tag: 'Honors',
              description:
                'Honors Greek; per the school’s profile Greek may only be taken as a second world language.',
            },
            {
              title: 'Greek IV (Honors)',
              tag: 'Honors',
              description: 'The fourth-year honors Greek course.',
            },
          ],
        },
        {
          name: 'Innovation & Design',
          courses: [
            { title: 'Engineering I', tag: 'Year', description: 'The introductory engineering course.' },
            { title: 'Engineering II', tag: 'Year', description: 'The second-year engineering course.' },
            {
              title: 'Introduction to Civil Engineering',
              tag: 'Elective',
              description: 'An introduction to civil engineering.',
            },
            {
              title: 'Engineering in Motion: How to Make Things Move',
              tag: 'Elective',
              description: 'An engineering elective on mechanisms and motion.',
            },
            {
              title: 'Advanced Topics in Engineering',
              tag: 'Advanced',
              description: 'Advanced engineering topics.',
            },
            {
              title: 'Entrepreneurship and Global Marketplace Leadership',
              tag: 'Elective',
              description: 'Entrepreneurship and leadership in the global marketplace.',
            },
            {
              title: 'Digital Design and Web Development',
              tag: 'Elective',
              description: 'Digital design and web development.',
            },
            {
              title: 'Cybersecurity 1: Networking Fundamentals (AP)',
              tag: 'AP',
              description: 'Networking fundamentals and cybersecurity.',
            },
            {
              title: 'Computer Science Principles (AP)',
              tag: 'AP',
              description: 'College-level foundational computer science.',
            },
            {
              title: 'Computer Science A (AP)',
              tag: 'AP',
              description: 'College-level object-oriented programming.',
            },
            {
              title: 'App Design/Game Design',
              tag: 'Elective',
              description: 'Application and game design.',
            },
            {
              title: 'Java Data Structures',
              tag: 'Honors',
              description: 'Honors-level data structures in Java, taught using Git and GitHub.',
            },
          ],
        },
        {
          name: 'Communications & Global Leadership',
          courses: [
            {
              title: 'Introduction to Speech and Debate',
              tag: 'Elective',
              description:
                'The entry course into Charlotte Latin’s speech and debate program.',
            },
            { title: 'Advanced Debate', tag: 'Advanced', description: 'Advanced competitive debate.' },
            { title: 'Advanced Speech', tag: 'Advanced', description: 'Advanced competitive speech.' },
            {
              title: 'Communications and Twenty-First Century Journalism',
              tag: 'Elective',
              description: 'Communications and contemporary journalism.',
            },
            {
              title: 'Leadership and Social Responsibility',
              tag: 'Elective',
              description: 'Leadership paired with social responsibility.',
            },
            {
              title: 'Leadership for the Twenty-First Century',
              tag: 'Elective',
              description: 'Contemporary leadership studies.',
            },
            { title: 'Yearbook', tag: 'Year', description: 'Production of the school yearbook.' },
            {
              title: 'Student Internship Program',
              tag: 'Elective',
              description: 'A credit-bearing student internship placement.',
            },
          ],
        },
        {
          name: 'Performing Arts',
          courses: [
            { title: 'Acting', tag: 'Elective', description: 'The foundational acting course.' },
            { title: 'Film Acting', tag: 'Elective', description: 'Acting technique for the camera.' },
            {
              title: 'Stagecraft I',
              tag: 'Elective',
              description: 'The introductory technical theatre course.',
            },
            {
              title: 'Stagecraft II',
              tag: 'Elective',
              description: 'The second-level technical theatre course.',
            },
            { title: 'Advanced Design', tag: 'Advanced', description: 'Advanced theatrical design.' },
            {
              title: 'After-School Theater and Stagecraft',
              tag: 'Elective',
              description: 'After-school theatre production and stagecraft.',
            },
            { title: 'Band', tag: 'Year', description: 'The Upper School band ensemble.' },
            { title: 'Concert Choir', tag: 'Year', description: 'The Upper School choral ensemble.' },
            { title: 'Orchestra', tag: 'Year', description: 'The Upper School orchestral ensemble.' },
            {
              title: 'Music Theory I',
              tag: 'Elective',
              description: 'The introductory music theory course.',
            },
            { title: 'Music Theory AP', tag: 'AP', description: 'College-level music theory.' },
          ],
        },
        {
          name: 'Visual Arts',
          courses: [
            {
              title: 'Art Studio I–IV',
              tag: 'Elective',
              description: 'A four-level studio art sequence.',
            },
            { title: 'Photography', tag: 'Elective', description: 'The photography course.' },
          ],
        },
        {
          name: 'Physical Education',
          courses: [
            {
              title: 'Physical Education/Health',
              tag: 'Required',
              description:
                'The Upper School physical education and health requirement; half is waivable via athletics.',
            },
            {
              title: 'Introduction to Sports Medicine',
              tag: 'Elective',
              description: 'An introduction to sports medicine.',
            },
          ],
        },
      ],
    },
  ],
}

/* ── Charlotte Country Day School ───────────────────────────────────────────
   2025-26 Upper School Academic Policies and Course Guide (119 index lines, 23
   AP titles, 18 IB courses). The only school here that offers BOTH AP and IB —
   the first independent school in North Carolina with the IB Diploma
   Programme, so IB tags are real, not carried over. Middle School publishes
   named courses only for mathematics; Lower School publishes ten subject areas. */
const CHARLOTTE_COUNTRY_DAY: CourseOfferings = {
  guideYear: '2025-26',
  divisions: [
    {
      title: 'Lower School Courses',
      grades: 'JK – Grade 4',
      teaser:
        '10 subject areas — both French and Spanish from JK, a Design Lab, and a Grade 4 Exhibition research capstone.',
      source: 'Country Day Lower School curriculum pages',
      sourceUrl: 'https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum',
      notPublished:
        'Charlotte Country Day publishes ten Lower School subject areas, described narratively per grade, rather than named courses. There is no Lower School course catalogue.',
      departments: [
        {
          name: 'Core Academics',
          courses: [
            {
              title: 'Units of Inquiry',
              tag: 'JK',
              description:
                'Intentionally weave together literacy, math, science, and social studies instruction.',
            },
            {
              title: 'Language Arts / Literacy',
              tag: 'JK–Gr 4',
              description:
                'Focuses on the Five Pillars of Reading — phonics, phonological awareness, fluency, vocabulary, and comprehension — embedded throughout the day.',
            },
            {
              title: 'Mathematics',
              tag: 'JK–Gr 4',
              description:
                'Develops number sense, spatial awareness, and math language through active exploration and hands-on games toward rigorous problem solving.',
            },
            {
              title: 'Science',
              tag: 'JK–Gr 4',
              description:
                'Hands-on investigation via the scientific method across physical, life, and earth sciences — from seasonal change in JK to the solar system by Grade 4.',
            },
            {
              title: 'Social Studies',
              tag: 'JK–Gr 4',
              description:
                'Examines people in relation to their past, present, and future, their environment, and their society.',
            },
          ],
        },
        {
          name: 'Modern Languages',
          courses: [
            {
              title: 'French & Spanish',
              tag: 'JK–Gr 4',
              description:
                'All students are exposed to both French and Spanish, progressing from the sound of each language to the four language skills plus basic writing by Grade 4.',
            },
          ],
        },
        {
          name: 'Arts, PE & Design',
          courses: [
            {
              title: 'Fine Arts (Art, Music, Drama)',
              tag: 'Weekly',
              description:
                'Weekly immersion in art, music, and drama to instill a love of the arts and build design-thinking skills.',
            },
            {
              title: 'Physical Education',
              tag: 'Daily',
              description:
                'A daily opportunity to move, play, and learn, developing gross motor, body control, and spatial awareness skills.',
            },
            {
              title: 'Design Lab',
              tag: 'JK–Gr 4',
              description:
                'Engineering, coding, robotics, 3D printing, and multi-media design used to solve design problems collaboratively.',
            },
            {
              title: 'Library / Information Literacy',
              tag: 'JK–Gr 4',
              description:
                'Supports a growing love of reading and builds toward the full research cycle, applied in the Grade 4 Exhibition project.',
            },
          ],
        },
      ],
    },
    {
      title: 'Middle School Courses',
      grades: 'Grades 5 – 8',
      teaser:
        'Nine named math tracks plus grade-level subjects across 6 areas — Geometry for high-school credit as early as Grade 8.',
      source: 'Country Day Middle School curriculum pages',
      sourceUrl: 'https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum',
      notPublished:
        'Country Day publishes named Middle School courses only for mathematics; other disciplines are published as grade-level subjects. There is no Middle School course catalogue.',
      departments: [
        {
          name: 'Mathematics',
          courses: [
            {
              title: 'Fifth Grade Math',
              tag: 'Gr 5',
              description:
                'Addition, subtraction, multiplication, and division of whole numbers, decimals, and fractions, concluding with basic geometry.',
            },
            {
              title: 'Sixth Grade Math',
              tag: 'Gr 6',
              description:
                'The number line, values, operations with decimals and fractions, ratio and percent, and algebraic expressions and equations.',
            },
            {
              title: 'Sixth Grade Pre-Algebra',
              tag: 'Accelerated',
              description:
                'Number sense, fractions, factors, exponents, simplifying expressions, and solving and graphing linear equations.',
            },
            {
              title: 'Pre-Algebra',
              tag: 'Gr 7',
              description:
                'Number sense, fractions, factors, exponents, linear equations, ratios, proportions, percent, probability, and statistics.',
            },
            {
              title: 'Honors Pre-Algebra',
              tag: 'Honors',
              description: 'The same topics as Pre-Algebra covered in greater depth and at a faster pace.',
            },
            {
              title: 'Honors Algebra 1',
              tag: 'Honors',
              description:
                'Algebra foundations, linear functions and systems, exponents, polynomials, quadratics, radicals, and an introduction to geometry.',
            },
            {
              title: 'Algebra 8A',
              tag: 'Gr 8',
              description:
                'Foundational expressions, equations, and linear functions for students needing additional preparation.',
            },
            {
              title: 'Algebra 1',
              tag: 'Gr 8',
              description:
                'Full high-school Algebra I covering linear functions and systems, exponents, polynomials, quadratics, and radicals.',
            },
            {
              title: 'Geometry',
              tag: 'HS credit',
              description:
                'Placement for students who completed Honors Algebra I, studying deductive reasoning, proofs, trigonometry, and coordinate geometry.',
            },
          ],
        },
        {
          name: 'English & Social Studies',
          courses: [
            {
              title: 'Language Arts & Social Studies (integrated)',
              tag: 'Gr 5',
              description:
                'An integrated program featuring cross-curricular reading to enhance understanding of the world and writing to communicate key ideas and opinions.',
            },
            {
              title: 'Language Arts & Social Studies (integrated)',
              tag: 'Gr 6',
              description:
                'Students journey through the past learning about the creation and development of communities in global civilizations.',
            },
            {
              title: 'English',
              tag: 'Gr 7',
              description:
                'Further develops basic communication skills through the study of literature, reading strategies, and process writing.',
            },
            {
              title: 'Social Studies',
              tag: 'Gr 7',
              description:
                'Builds understanding of global geography and cultures while investigating the major turning points shaping the world through inquiry-based learning.',
            },
            {
              title: 'English',
              tag: 'Gr 8',
              description:
                'Uses both classic and contemporary literature to help foster a love of reading and writing.',
            },
            {
              title: 'Social Studies',
              tag: 'Gr 8',
              description:
                'Examines U.S. history from the late nineteenth century through the twentieth, from Reconstruction through Watergate.',
            },
          ],
        },
        {
          name: 'Science & Engineering',
          courses: [
            {
              title: 'Science',
              tag: 'Gr 5',
              description:
                'Students become working scientists, making authentic connections to the world and constructing solutions using the engineering design process.',
            },
            {
              title: 'Science: Forces of Change',
              tag: 'Gr 6',
              description:
                'Examines topics through the lens of Forces of Change while using the scientific method and the engineering design process.',
            },
            {
              title: 'Science',
              tag: 'Gr 7',
              description:
                'Inquiry-based study of the human body covering energy, body systems, cells, genetics, natural selection, and energy transformations.',
            },
            {
              title: 'Science',
              tag: 'Gr 8',
              description:
                'An introduction to the multidisciplinary field of environmental science, using case studies to evaluate environmental issues.',
            },
            {
              title: 'Engineering',
              tag: 'Gr 5–8',
              description: 'Scaffolded across the Middle School with design-thinking and prototyping work.',
            },
          ],
        },
        {
          name: 'Modern & Classical Languages',
          courses: [
            {
              title: 'Spanish',
              tag: 'Gr 5–8',
              description:
                'A proficiency-oriented course practicing reading, writing, listening, and speaking in interpretive, interpersonal, and presentational modes.',
            },
            {
              title: 'French',
              tag: 'Gr 5–8',
              description:
                'Develops language competency and cultural awareness through thematic units using authentic websites, videos, print, and maps.',
            },
            {
              title: 'Latin',
              tag: 'Gr 5–8',
              description:
                'Offered as one of the Middle School language options alongside French and Spanish.',
            },
          ],
        },
        {
          name: 'Fine Arts',
          courses: [
            {
              title: 'Visual Art',
              tag: 'Gr 5–8',
              description:
                'Foundational visual-arts instruction expanding individual skill sets across the Middle School years.',
            },
            {
              title: 'Band',
              tag: 'Gr 5–8',
              description: 'An instrumental ensemble in wind and percussion performance.',
            },
            {
              title: 'Choir',
              tag: 'Gr 5–8',
              description: 'A vocal ensemble developing singing skills and musical understanding.',
            },
            {
              title: 'Orchestra',
              tag: 'Gr 5–8',
              description: 'Instrumental ensemble training for string players.',
            },
            {
              title: 'Drama',
              tag: 'Gr 5–8',
              description: 'Performing-arts instruction developing creative thinking and self-expression.',
            },
            {
              title: 'General Music',
              tag: 'Gr 5',
              description: 'Musical fundamentals and concepts for all fifth-grade students.',
            },
          ],
        },
        {
          name: 'PE, Health & Advisory',
          courses: [
            {
              title: 'Physical Education',
              tag: 'Daily',
              description:
                'A daily class focused on individual fitness improvement, cardiovascular endurance, physical strength, and exposure to various sports.',
            },
            {
              title: 'Health',
              tag: 'Gr 5',
              description:
                'Instruction on human growth and development including reproductive systems and childbirth.',
            },
            {
              title: 'Health',
              tag: 'Gr 6',
              description: 'Focuses on nutrition, emphasizing "Food is Fuel" and how bodies use energy.',
            },
            {
              title: 'Health',
              tag: 'Gr 7',
              description:
                'Identity, stress management, coping skills, mental well-being, and decision making, including social-media impacts.',
            },
            {
              title: 'Health',
              tag: 'Gr 8',
              description: 'Human growth and development, decision making, and reproductive systems.',
            },
            {
              title: 'Counseling',
              tag: 'Gr 5',
              description:
                'Life-skills development addressing values, friendships, cooperation, decision-making, and social skills.',
            },
            {
              title: 'Counseling: Too Good For Drugs',
              tag: 'Gr 6',
              description: 'A curriculum addressing decision-making and communication skills.',
            },
            {
              title: 'Information Literacy',
              tag: 'Gr 5–8',
              description: 'Library-based research and digital-citizenship skills.',
            },
            {
              title: 'Advisory',
              tag: 'Gr 5–8',
              description:
                'Each student is assigned a faculty advisor providing academic and personal guidance and serving as a school-family communication link.',
            },
          ],
        },
      ],
    },
    {
      title: 'Upper School Courses',
      grades: 'Grades 9 – 12',
      teaser:
        '119 catalogued course lines across 9 departments — 23 AP courses AND 18 IB courses plus the full IB Diploma core.',
      source: "Country Day Upper School Course Guide '25–26",
      sourceUrl:
        'https://www.charlottecountryday.org/fs/resource-manager/view/bc87ead7-8dee-4694-ab5b-b04ebf5710de',
      departments: [
        {
          name: 'English',
          courses: [
            {
              title: 'English 9: Foundations in English',
              tag: 'Gr 9',
              description:
                'First of a two-year foundations sequence, introducing advanced literary study through argument-building and examination of poetry, short stories, and longer texts.',
            },
            {
              title: 'English 10: Foundations in English II: The Individual in Society',
              tag: 'Gr 10',
              description:
                'Studies classic and modern texts through how literature reflects the desire to understand oneself in relation to the world.',
            },
            {
              title: 'English 11: American Literature',
              tag: 'Gr 11',
              description:
                'A selected survey covering the Enlightenment, Romanticism, and Modernism, culminating in an autobiographical portfolio.',
            },
            {
              title: 'AP English 11: Language & Composition',
              tag: 'AP',
              description:
                'College-level study of rhetoric and composition, with students expected to sit the AP exam.',
            },
            {
              title: 'AP English 12: Literature & Composition',
              tag: 'AP',
              description:
                'College-level literary analysis across genres and periods, with students expected to sit the AP exam.',
            },
            {
              title: 'IB English 11 (HL)',
              tag: 'IB HL',
              description:
                'Required first year for IB juniors, expanding experience with a broad range of genres, periods, and styles.',
            },
            {
              title: 'IB English 12 (HL)',
              tag: 'IB HL',
              description: 'Second year of the two-year IB Language & Literature commitment.',
            },
            {
              title: 'English 12',
              tag: 'Gr 12',
              description:
                'Senior English for students continuing from English 11 outside the AP and IB tracks.',
            },
            {
              title: 'Creative Writing',
              tag: 'Semester',
              description: 'A semester elective in original composition.',
            },
            {
              title: 'Intermediate & Advanced ESL',
              tag: 'Year',
              description:
                'English-language-support courses, alongside ESL American History and ESL World History, which may substitute for English or History credit.',
            },
          ],
        },
        {
          name: 'Mathematics',
          courses: [
            { title: 'Algebra I', tag: 'Year', description: 'The foundational algebra course.' },
            { title: 'Geometry', tag: 'Year', description: 'Standard-level geometry.' },
            {
              title: 'Honors Geometry',
              tag: 'Honors',
              description: 'Accelerated geometry; requires 90 in Algebra I plus teacher recommendation.',
            },
            { title: 'Algebra II', tag: 'Year', description: 'The second-year algebra course.' },
            {
              title: 'Honors Algebra II',
              tag: 'Honors',
              description: 'Accelerated Algebra II; requires 90 in Geometry or 83 in Honors Geometry.',
            },
            {
              title: 'Honors Algebra II/Precalculus',
              tag: 'Gr 10 only',
              description:
                'A compressed two-subject course open only to sophomores who completed Honors Geometry in ninth grade.',
            },
            {
              title: 'Algebra III/Trigonometry',
              tag: 'Year',
              description: 'A bridge course extending algebra into trigonometry.',
            },
            { title: 'Dynamic Math', tag: 'Year', description: 'An alternative mathematics pathway.' },
            { title: 'Pre-calculus', tag: 'Year', description: 'Standard precalculus.' },
            {
              title: 'Honors Pre-calculus',
              tag: 'Honors',
              description: 'Accelerated precalculus; requires 90 in Algebra II or 83 in Honors Algebra II.',
            },
            {
              title: 'Introduction to Calculus & Statistics',
              tag: 'Year',
              description: 'A survey of both calculus and statistics concepts.',
            },
            {
              title: 'AP Statistics',
              tag: 'AP',
              description:
                'College-level statistics; qualifying students should choose either AP Calculus AB or AP Statistics, not both.',
            },
            {
              title: 'Advanced AP Statistics with R and R Studio',
              tag: 'Post-AP',
              description:
                'Post-BC-Calculus statistics using the R language; requires 83 in BC Calculus or concurrent enrollment.',
            },
            { title: 'AP Calculus AB', tag: 'AP', description: 'First-semester college calculus.' },
            {
              title: 'AP Calculus BC',
              tag: 'AP',
              description:
                'The full-year college calculus sequence; requires 87 in Honors Precalculus or Honors Algebra II/Precalculus.',
            },
            {
              title: 'IB Applications SL',
              tag: 'IB SL',
              description: 'IB Mathematics: Applications and Interpretation at standard level.',
            },
            {
              title: 'IB Analysis SL',
              tag: 'IB SL',
              description:
                'IB Mathematics: Analysis and Approaches at standard level; requires 83 in Honors Precalculus.',
            },
            {
              title: 'Calculus III/IB Analysis HL',
              tag: 'Post-AP',
              description:
                'Multivariable calculus doubling as IB Analysis Higher Level; requires 83 in BC Calculus.',
            },
          ],
        },
        {
          name: 'Sciences',
          courses: [
            {
              title: 'Inquiries in Biological and Physical Science',
              tag: 'Year',
              description: 'An introductory integrated science course.',
            },
            {
              title: 'Biology I',
              tag: 'Required',
              description:
                'Required of all students in ninth or tenth grade; the core high-school biology requirement.',
            },
            {
              title: 'AP Biology',
              tag: 'AP',
              description: 'College-level biology; prerequisites Biology I and Chemistry I.',
            },
            { title: 'IB Biology SL', tag: 'IB SL', description: 'IB biology at standard level.' },
            { title: 'IB Biology HL', tag: 'IB HL', description: 'IB biology at higher level.' },
            {
              title: 'AP Environmental Science',
              tag: 'AP',
              description:
                'College-level environmental science covering eutrophication, acid rain, ozone depletion, and climate change, with mandatory field trips.',
            },
            {
              title: 'Environmental Issues',
              tag: 'Semester',
              description:
                'A survey of contemporary environmental issues drawing on the humanities, social sciences, and natural sciences, culminating in team debates.',
            },
            {
              title: 'Marine Biology',
              tag: 'Semester',
              description:
                'Marine biology concepts including trophic dynamics and marine ecosystems, with an expected overnight Charleston data-collection trip.',
            },
            {
              title: 'Human Anatomy: External Structural Systems',
              tag: 'Semester',
              description:
                'The body’s major organ systems with in-depth study of the skeletal and muscular systems; dissection is mandatory.',
            },
            {
              title: 'Human Anatomy: Internal Structural Systems',
              tag: 'Semester',
              description:
                'Deeper study of the nervous, blood, cardiovascular, respiratory, and digestive systems; dissection is mandatory.',
            },
            {
              title: 'Chemistry I',
              tag: 'Year',
              description:
                'Develops conceptual understanding of chemistry; requires Biology I and concurrent Algebra II or higher.',
            },
            {
              title: 'Honors Chemistry I',
              tag: 'Honors',
              description: 'Accelerated chemistry; requires 87 in Biology and 87 in a math course.',
            },
            {
              title: 'AP Chemistry',
              tag: 'AP',
              description: 'College-level chemistry; requires previous or concurrent Precalculus.',
            },
            { title: 'IB Chemistry SL', tag: 'IB SL', description: 'IB chemistry at standard level.' },
            { title: 'IB Chemistry HL', tag: 'IB HL', description: 'IB chemistry at higher level.' },
            { title: 'Physics I', tag: 'Year', description: 'Introductory physics.' },
            {
              title: 'Honors Physics I',
              tag: 'Honors',
              description: 'Accelerated physics; requires previous or concurrent Precalculus.',
            },
            {
              title: 'AP Physics C: Mechanics, E&M',
              tag: 'AP',
              description:
                'Calculus-based college physics in mechanics and electricity and magnetism; requires previous or concurrent AP or IB Calculus.',
            },
            {
              title: 'Astronomy: Solar Systems',
              tag: 'Gr 11–12',
              description:
                'Constellations, celestial navigation, telescope design, electromagnetic radiation, and solar-system bodies, assessed by a major project.',
            },
            {
              title: 'Forensic Science: Biochemical Applications',
              tag: 'Semester',
              description:
                'Biological and biochemical methods of criminal investigation including forensic pathology, entomology, anthropology, and DNA profiling.',
            },
            {
              title: 'Forensic Science: Physical Applications',
              tag: 'Semester',
              description:
                'Physical-science forensics including glass and matter analysis, toxicology, bloodstain pattern analysis, fire investigation, and firearms identification.',
            },
            {
              title: 'Organic Chemistry',
              tag: 'Post-AP',
              description:
                'Replicates a semester of undergraduate organic chemistry with a full synthetic lab component; requires AP or IB Chemistry.',
            },
            {
              title: 'Honors Principles of Engineering',
              tag: 'Honors',
              description:
                'Structural mechanics, material science, and digital electronics through projects from digital keyboards to a wirelessly controlled robotic hand.',
            },
            {
              title: 'Physical Computational Biochemistry',
              tag: 'Research',
              description:
                'Primary research on protein folding and 3D-printed dynamic models, working with professors nationally with potential to publish.',
            },
          ],
        },
        {
          name: 'History & Social Studies',
          courses: [
            {
              title: '9th Grade History',
              tag: 'Required',
              description: 'Introduces basic historical thinking through in-depth study of several crucial themes.',
            },
            {
              title: 'Modern World History',
              tag: 'Required',
              description: 'The second required history course, typically taken in tenth grade.',
            },
            {
              title: 'Honors Modern World History',
              tag: 'Honors',
              description: 'Accelerated Modern World History; requires 87 in 9th Grade History.',
            },
            { title: 'IB World History SL', tag: 'IB SL', description: 'IB history at standard level.' },
            {
              title: 'United States History',
              tag: 'Required',
              description: 'Required of all graduates, usually completed junior year.',
            },
            {
              title: 'AP United States History',
              tag: 'AP',
              description:
                'College-level US History satisfying the graduation requirement; requires 87 in Modern World History.',
            },
            {
              title: 'IB History of the Americas HL',
              tag: 'IB HL',
              description:
                'IB higher-level history through which IB students typically fulfill the US History requirement senior year.',
            },
            {
              title: 'AP Psychology',
              tag: 'AP',
              description: 'College-level psychology, with preference given to seniors.',
            },
            { title: 'IB Psychology SL', tag: 'IB SL', description: 'IB psychology at standard level.' },
            { title: 'AP Human Geography', tag: 'AP', description: 'College-level human geography.' },
            {
              title: 'AP European History',
              tag: 'AP',
              description: 'College-level European history, with preference given to seniors.',
            },
            {
              title: 'AP US Government and Politics',
              tag: 'AP',
              description:
                'College-level American government and politics, with preference given to seniors.',
            },
            {
              title: 'Ancient Empires',
              tag: 'Gr 11–12',
              description:
                'The origins, evolution, and varieties of ancient civilizations from c. 3000 BCE to c. 1000 CE using primary sources and archaeological findings.',
            },
            {
              title: 'Adolescent Psychology and Behavior',
              tag: 'Gr 11–12',
              description:
                'Adolescent psychosocial development and the mental-health challenges adolescents face, including protective factors and intervention strategies.',
            },
            {
              title: 'African American History: From Slavery to Civil Rights',
              tag: 'Gr 11–12',
              description:
                'Major themes from slavery in Africa and the Americas through abolition, the Harlem Renaissance, and the Civil Rights Movement.',
            },
            {
              title: 'Education for Social Justice',
              tag: 'Gr 11–12',
              description:
                'Critical analysis of several forms of social oppression and alternative ways of understanding social relations.',
            },
            {
              title: 'IB Digital Society',
              tag: 'IB',
              description:
                'Open to IB and non-IB students; requires previous or concurrent Precalculus.',
            },
          ],
        },
        {
          name: 'Modern & Classical Languages',
          courses: [
            {
              title: 'Honors Chinese I–V',
              tag: 'Honors',
              description:
                'A five-level Honors-only Mandarin sequence; entry requires 87 in a current French, Spanish, or Latin class.',
            },
            { title: 'Chinese II', tag: 'Year', description: 'Non-honors second-level Mandarin.' },
            { title: 'IB Chinese', tag: 'IB', description: 'The IB Mandarin course.' },
            {
              title: 'French I–V',
              tag: 'Year',
              description: 'A five-level French sequence building proficiency across all four skills.',
            },
            {
              title: 'Honors French II, III, IV',
              tag: 'Honors',
              description:
                'Accelerated French; requires 93 in the current language class or 85 in current Honors.',
            },
            {
              title: 'AP French Language & Culture',
              tag: 'AP',
              description: 'College-level French language and culture; requires 87 in Level 4 Honors.',
            },
            { title: 'IB French HL', tag: 'IB HL', description: 'IB French at higher level.' },
            { title: 'Spanish I–V', tag: 'Year', description: 'A five-level Spanish sequence.' },
            { title: 'Honors Spanish II, III, IV', tag: 'Honors', description: 'Accelerated Spanish.' },
            {
              title: 'AP Spanish Language & Culture',
              tag: 'AP',
              description: 'College-level Spanish language and culture.',
            },
            { title: 'IB Spanish HL', tag: 'IB HL', description: 'IB Spanish at higher level.' },
            { title: 'Latin I–V', tag: 'Year', description: 'A five-level Latin sequence.' },
            { title: 'Honors Latin II, III, IV', tag: 'Honors', description: 'Accelerated Latin.' },
            { title: 'AP Latin', tag: 'AP', description: 'College-level Latin.' },
            { title: 'IB Latin', tag: 'IB', description: 'The IB Latin course.' },
          ],
        },
        {
          name: 'Fine Arts',
          courses: [
            { title: 'Concert Choir', tag: 'Year', description: 'A non-audition choral ensemble.' },
            { title: 'Honors Concert Choir', tag: 'Honors', description: 'Honors-level concert choir.' },
            {
              title: 'Honors Chamber Choir',
              tag: 'Audition',
              description: 'A select choral ensemble admitted by audition, open to Grades 10–12.',
            },
            { title: 'Symphonic Band', tag: 'Year', description: 'The concert wind band.' },
            {
              title: 'Honors Symphonic Band',
              tag: 'Audition',
              description: 'Honors wind band admitted by audition.',
            },
            { title: 'Orchestra', tag: 'Year', description: 'The string and full orchestra ensemble.' },
            {
              title: 'Honors Orchestra',
              tag: 'Audition',
              description: 'Honors orchestra admitted by audition.',
            },
            {
              title: 'Introduction to Piano',
              tag: 'Semester',
              description: 'Beginning keyboard instruction.',
            },
            {
              title: 'Supersonic: Percussion Ensemble',
              tag: 'Semester',
              description: 'A percussion performance ensemble.',
            },
            {
              title: 'AP Music Theory',
              tag: 'AP',
              description:
                'Develops the ability to recognize and describe melody, harmony, texture, rhythm, form, history, and style; requires an entrance proficiency exam.',
            },
            {
              title: 'Acting/Directing I',
              tag: 'Semester',
              description:
                'Introduces the tools of acting through disciplined work on voice, speech, movement, and the actor’s use of self.',
            },
            {
              title: 'Acting/Directing II',
              tag: 'Gr 10–12',
              description:
                'Advanced acting and directing across Stanislavsky, Strasberg, Adler, and Meisner approaches in workshop format.',
            },
            {
              title: 'Theater Workshop',
              tag: 'Gr 10–12',
              description: 'A capstone project course for advanced students in acting, directing, or improv.',
            },
            {
              title: 'Improvisation I',
              tag: 'Semester',
              description: 'In-depth study of short- and long-form improvisation plus sketch writing.',
            },
            {
              title: 'Improvisation II',
              tag: 'Semester',
              description: 'Advanced improvisation building on Improvisation I.',
            },
            {
              title: 'IB Theatre Arts (SL, HL)',
              tag: 'IB',
              description: 'IB theatre at standard or higher level.',
            },
            {
              title: '2-D Art I–IV',
              tag: 'Semester',
              description: 'A four-level sequence in two-dimensional art and drawing.',
            },
            {
              title: 'Design/Photography I–IV',
              tag: 'Semester',
              description: 'A four-level sequence in digital design and photography.',
            },
            {
              title: 'Sculpture I–IV',
              tag: 'Semester',
              description: 'A four-level sequence in three-dimensional and sculptural work.',
            },
            {
              title: 'Architectural Design Studio',
              tag: 'Semester',
              description: 'A studio course in architectural design.',
            },
            {
              title: 'Special Projects in Visual Arts',
              tag: 'Semester',
              description:
                'Portfolio-based independent studio work following Level IV; requires portfolio evaluation.',
            },
            {
              title: 'AP Studio: 2D Art',
              tag: 'AP',
              description:
                'A portfolio course emphasizing art-making as informed and critical decision-making.',
            },
            {
              title: 'AP Studio: Design/Photography',
              tag: 'AP',
              description: 'An AP portfolio course in digital and photographic arts.',
            },
            {
              title: 'AP Studio: Sculpture',
              tag: 'AP',
              description: 'An AP portfolio course addressing sculptural issues and purposeful decision-making.',
            },
            {
              title: 'AP Art History',
              tag: 'AP',
              description:
                'Significant works of art and architecture in European and non-European traditions from cave paintings to the twenty-first century.',
            },
            {
              title: 'IB Art I & II (SL, HL)',
              tag: 'IB',
              description:
                'A two-year IB visual arts course; portfolios due February of sophomore year for admittance.',
            },
            {
              title: 'Yearbook',
              tag: 'Year',
              description:
                'Students produce The Postscript, learning page layout, photo and copy editing, and writing.',
            },
            {
              title: 'Yearbook Editor, Honors',
              tag: 'Honors',
              description:
                'A leadership option for returning yearbook staff serving as team leaders and editors.',
            },
          ],
        },
        {
          name: 'Technology & Computer Science',
          courses: [
            {
              title: 'Exploring Computer Science',
              tag: 'Semester',
              description:
                'The breadth of computer science including Python programming, web page design, data analysis, phone apps, and ethical issues in computing.',
            },
            {
              title: 'AP Computer Science A',
              tag: 'AP',
              description:
                'Follows the College Board syllabus in Java, emphasizing problem-solving, object-oriented methodologies, algorithms, and container classes.',
            },
            {
              title: 'Advanced Topics in Computer Science',
              tag: 'Honors',
              description:
                'Data structures in Java, then student-designed projects presented before the academic council; requires AP Computer Science.',
            },
          ],
        },
        {
          name: 'Non-Departmental',
          courses: [
            {
              title: '9th Grade Seminar',
              tag: 'Required',
              description:
                'A required transition course covering goal setting, time management, decision-making, media literacy, leadership, wellness, and identity development.',
            },
            {
              title: 'IB Theory of Knowledge',
              tag: 'IB core',
              description:
                'A junior-year IB core course analyzing personal and shared knowledge using the knowledge framework.',
            },
            {
              title: 'Public Speaking and Professional Communication',
              tag: 'Semester',
              description:
                'Builds confidence before an audience and proficiency organizing content for varied speech categories, interviews, and active listening.',
            },
            {
              title: 'IB Extended Essay & CAS',
              tag: 'IB core',
              description:
                'The IB core also requires the Extended Essay, a major research paper completed junior year, and Creativity, Activity & Service.',
            },
          ],
        },
        {
          name: 'Physical Education',
          courses: [
            {
              title: 'Strength Training',
              tag: 'Semester',
              description:
                'Weightlifting technique, functional movement, nutrition, injury prevention, and goal setting; satisfies one of two annual co-curricular credits.',
            },
            {
              title: 'Ultimate Frisbee',
              tag: 'After-school',
              description:
                'Practices three days a week with winter-term scrimmages; credit based on attendance.',
            },
          ],
        },
      ],
    },
  ],
}

/* ── Cannon School ──────────────────────────────────────────────────────────
   2026-27 Upper School Course Catalog (104 courses, 8 departments, 14 AP + 13
   faculty-designed Advanced Topics courses). Cannon is the only school here
   with the AT designation, which carries the same +1.0 weight as an AP and
   culminates in a Signature Learning Experience — so AT is tagged as a
   first-class advanced track, not folded into "Honors". Cannon has no
   standalone CS department; CS lives in Innovation & Enterprise. */
const CANNON: CourseOfferings = {
  guideYear: '2026-27',
  divisions: [
    {
      title: 'Lower School Courses',
      grades: 'JrK – Grade 4',
      teaser:
        '13 named curriculum areas — Reveal Math, TAB art, the Orff Approach, Scratch 3.0 coding, and the CHAMP fitness test.',
      source: 'Cannon Lower School per-grade curriculum pages',
      sourceUrl: 'https://www.cannonschool.org/academics/lower-school',
      notPublished:
        'Cannon publishes 12 named curriculum areas per grade for JrK–4 rather than a course catalog. The /academics/lower-school/curriculum path returns a 404.',
      departments: [
        {
          name: 'Core Academics',
          courses: [
            {
              title: 'Language Arts',
              tag: 'Gr 1–4',
              description:
                'A literacy block integrating whole-class and small-group differentiated instruction across phonics, fluency, vocabulary, and comprehension.',
            },
            {
              title: 'Mathematics',
              tag: 'Gr 1–4',
              description:
                'Uses Reveal Math to develop number sense and problem solving; Grade 4 works with multi-digit numbers, fractions, and decimals.',
            },
            {
              title: 'Science',
              tag: 'Gr 1–4',
              description:
                'Inquiry-driven; by Grade 3 students generate their own scientific questions to test through experimentation.',
            },
            {
              title: 'Social Studies',
              tag: 'Gr 1–4',
              description:
                'Uses the Social Studies Alive! curriculum — Regions of Our Country in Grade 3, America’s Past in Grade 4.',
            },
            {
              title: 'Early Childhood Program',
              tag: 'JrK–K',
              description:
                'Curriculum builds a strong academic foundation in reading, writing, and math through hands-on, collaborative, experiential, and multi-sensory learning.',
            },
          ],
        },
        {
          name: 'World Language',
          courses: [
            {
              title: 'Spanish',
              tag: 'Gr 1–4',
              description:
                'Combines the Communicative Language Approach with the Foreign Language in the Elementary School (FLES) approach.',
            },
          ],
        },
        {
          name: 'Arts & PE',
          courses: [
            {
              title: 'Art',
              tag: 'Gr 1–4',
              description:
                'Grade 3 onward uses the TAB (Teaching for Artistic Behavior) model so students work and think as artists.',
            },
            {
              title: 'Music',
              tag: 'Gr 1–4',
              description:
                'Uses the Orff Approach; Grade 3 introduces the recorder including Recorder Karate.',
            },
            {
              title: 'Physical Education',
              tag: 'Gr 1–4',
              description:
                'Motor-skill development including the Cannon Health and Performance (CHAMP) Test.',
            },
          ],
        },
        {
          name: 'Technology & Makers',
          courses: [
            {
              title: 'Technology',
              tag: 'Gr 1–4',
              description:
                'Robotics and coding with Scratch 3.0 and block-based scripting, using Root Robotics and Edison robots.',
            },
            {
              title: 'Makers',
              tag: 'Gr 1–4',
              description: 'Problem solving through an engineering design thinking approach.',
            },
            {
              title: 'Library',
              tag: 'Gr 1–4',
              description: 'Research skills including use of the digital library catalog to locate materials.',
            },
            {
              title: 'School Counseling',
              tag: 'Gr 1–4',
              description:
                'Addresses typical challenges and characteristics of children by age and developmental stage.',
            },
          ],
        },
      ],
    },
    {
      title: 'Middle School Courses',
      grades: 'Grades 5 – 8',
      teaser:
        'Six core subjects plus four math tracks — a Grade 5 rotation through all three world languages, and the ThinkTank makerspace.',
      source: 'Cannon Middle School per-grade curriculum pages',
      sourceUrl: 'https://www.cannonschool.org/academics/middle-school',
      notPublished:
        'Cannon publishes Middle School curriculum as per-grade subject descriptions, not a named-course catalog. There is no Middle School equivalent of the 44-page Upper School catalog.',
      departments: [
        {
          name: 'Core Academics',
          courses: [
            {
              title: 'English',
              tag: 'Gr 5–8',
              description:
                'Grade 5 explores genres and writing critically; Grade 6 reinforces grammar with narrative writing; Grade 7 integrates literature, writing, and grammar; Grade 8 builds all four skills.',
            },
            {
              title: 'Science',
              tag: 'Gr 5–8',
              description:
                'Grade 5 studies ecology; Grade 6 classification, cells, rocks, plate tectonics, and motion; Grade 7 chemistry, the electromagnetic spectrum, astronomy, and anatomy; Grade 8 the Sun’s impact on Earth.',
            },
            {
              title: 'Social Studies',
              tag: 'Gr 5–8',
              description:
                'Grades 5–6 study ancient and Medieval civilizations thematically; Grade 7 covers the origins of the United States; Grade 8 emphasizes modern U.S. history as it becomes a world power.',
            },
            {
              title: 'Physical Education',
              tag: 'Gr 5–8',
              description:
                'Soccer, flag football, volleyball, tennis, aerobics, cardiovascular fitness and conditioning, basketball, softball, baseball, and lacrosse.',
            },
            {
              title: 'Health Education',
              tag: 'Gr 5–8',
              description:
                'Human growth and development, evaluating health information, decision-making, family living, nutrition, safety and first aid, and environmental health.',
            },
          ],
        },
        {
          name: 'Mathematics',
          courses: [
            {
              title: 'Mathematics',
              tag: 'Gr 5–6',
              description:
                'Covers operations, equations and inequalities, ratio, proportion and percent, area and volume, statistics, and graphing linear equations.',
            },
            {
              title: 'Pre-Algebra',
              tag: 'Gr 6–7',
              description:
                'Builds on prior knowledge to dive deeper into expressions, equations, inequalities, integers, linear functions, geometry, probability, and statistics.',
            },
            {
              title: 'Seventh-Grade Algebra I',
              tag: 'Accelerated',
              description: 'An accelerated option allowing seventh graders to take Algebra I.',
            },
            {
              title: 'Algebra I',
              tag: 'Gr 8',
              description:
                'Linear equations, inequalities, polynomials, factoring, graphing, radicals, quadratics, and an introduction to trigonometry.',
            },
            {
              title: 'Accelerated Geometry',
              tag: 'Accelerated',
              description:
                'Parallel and perpendicular lines, congruent triangles, similar polygons, trigonometry, quadrilaterals and circles, area and volume.',
            },
          ],
        },
        {
          name: 'World Languages',
          courses: [
            {
              title: 'World Language Rotation',
              tag: 'Gr 5',
              description:
                'Students rotate through all three world languages offered at Cannon — Spanish, French, and Mandarin — before choosing one to pursue.',
            },
            {
              title: 'World Language (daily)',
              tag: 'Gr 6',
              description:
                'Daily classes learning basic grammar and vocabulary to describe themselves and the world in the target language.',
            },
            {
              title: 'Spanish I / French I / Mandarin I',
              tag: 'Gr 7–8',
              description:
                'Students complete one of Spanish I, French I, or Mandarin I, conducted primarily in the target language.',
            },
          ],
        },
        {
          name: 'Arts & Technology',
          courses: [
            {
              title: 'Major Art: Strings, Band, or Chorus',
              tag: 'Gr 5–6',
              description: 'Students select one major performing art class.',
            },
            {
              title: 'Arts Rotation',
              tag: 'Gr 5–6',
              description:
                'A rotation through Visual Art, Theater, General Music, and Small Group Lessons in the major art.',
            },
            {
              title: 'Arts Electives (choose two)',
              tag: 'Gr 7–8',
              description:
                'Band, Chorus, Strings, Visual Art, Theater, Photography/Tech Art Fusion, Creative Explorations, and Art Magazine.',
            },
            {
              title: 'Academic Technology',
              tag: 'Gr 5–8',
              description:
                'Blends 3D printing, virtual reality, drones, robotics, CAD design, and computer programming in the ThinkTank makerspace.',
            },
          ],
        },
      ],
    },
    {
      title: 'Upper School Courses',
      grades: 'Grades 9 – 12',
      teaser:
        '104 courses across 8 departments — 14 AP plus 13 faculty-designed Advanced Topics courses, each capped by a Signature Learning Experience.',
      source: "Cannon Upper School Course Catalog '26–27",
      sourceUrl:
        'https://resources.finalsite.net/images/v1769529893/cannonschoolorg/ihl0lzuqgs9loqntga7z/CannonAcademicCourseCatalog2026-2027.pdf',
      departments: [
        {
          name: 'English',
          courses: [
            {
              title: 'Honors English I',
              tag: 'Gr 9',
              description:
                'A foundational course cultivating critical thinking, analytical skills, and creative expression across memoirs, plays, novels, poetry, and short stories.',
            },
            {
              title: 'Honors English II: Reading and Discourse',
              tag: 'Gr 10',
              description:
                'A sophomore seminar-style class reading and discussing influential literary and philosophical works from a variety of historical periods and cultures.',
            },
            {
              title: 'Honors English II: Reading and Composition',
              tag: 'Gr 10',
              description:
                'A process-driven sophomore course in which students read, write, and think in service of developing writing and analytical skills.',
            },
            {
              title: 'Honors English III',
              tag: 'Gr 11',
              description:
                'The study of rhetoric guided by Aristotle’s appeals of ethos, pathos, and logos, culminating in a writing-portfolio presentation.',
            },
            {
              title: 'Advanced Topics: English Language and Composition',
              tag: 'AT',
              description:
                'College-level nonfiction writing with major emphasis on revision, culminating in the Portfolio Defense signature learning experience.',
            },
            {
              title: 'Advanced Topics: English Seminar and Inquiry',
              tag: 'AT',
              description:
                'College-level reading and writing emphasizing inquiry, independent research, and multi-disciplinary analysis; optional AP Seminar exam.',
            },
            {
              title: 'Honors English IV',
              tag: 'Gr 12',
              description:
                'A senior course preparing college-bound students through diverse contemporary and canonical texts plus an Independent Reading program.',
            },
            {
              title: 'Advanced Topics: English Literature and Composition',
              tag: 'AT',
              description:
                'College-level literary conversation about fiction and poetry, culminating in the Lit Defense signature learning experience.',
            },
            {
              title: 'Honors Creative Writing: Fiction, Poetry and Screenwriting',
              tag: 'Elective',
              description:
                'Students develop individual literary voices through poetry, fiction, and screenwriting, completing a polished peer-critiqued screenplay.',
            },
            {
              title: 'Honors History of Film',
              tag: 'Elective',
              description:
                'A fast-paced survey tracing cinema from its 1895 origins through the digital revolution across genres and movements.',
            },
          ],
        },
        {
          name: 'Mathematics',
          courses: [
            {
              title: 'Honors Algebra I',
              tag: 'Honors',
              description: 'Introduces basic functions, their graphs, and the rules of solving equations.',
            },
            {
              title: 'Honors Principles of Geometry and Algebra',
              tag: 'Honors',
              description:
                'Strengthens and applies arithmetic, algebra, and reasoning to measure the world through traditional geometry concepts.',
            },
            {
              title: 'Honors Accelerated Geometry',
              tag: 'Accelerated',
              description:
                'Euclidean geometry with heavy emphasis on notation, justification, and proof at greater rigor and depth than Honors Geometry.',
            },
            {
              title: 'Honors Algebra II',
              tag: 'Honors',
              description:
                'Uses functions to reinforce and extend Algebra I skills, focusing on elementary functions and their properties.',
            },
            {
              title: 'Honors Accelerated Algebra II',
              tag: 'Accelerated',
              description:
                'An in-depth exploration of algebraic concepts, preparing students for Accelerated Precalculus and subsequently AP Calculus and AP Statistics.',
            },
            {
              title: 'Honors Precalculus',
              tag: 'Honors',
              description:
                'Further development of advanced algebraic concepts and trigonometry with heavy emphasis on functions and their properties.',
            },
            {
              title: 'Honors Accelerated Precalculus',
              tag: 'Accelerated',
              description:
                'Prepares students for college-level mathematics and serves as the prerequisite for AP Calculus.',
            },
            {
              title: 'Advanced Placement Precalculus',
              tag: 'AP',
              description:
                'A research-based exploration of function types modeling real-world phenomena, best suited to students on track for AP Calculus BC.',
            },
            {
              title: 'Honors Calculus',
              tag: 'Honors',
              description:
                'Introduces the topics of a semester of college calculus at a less intense pace and depth than the AP courses.',
            },
            {
              title: 'Honors Statistics',
              tag: 'Honors',
              description:
                'Exposes juniors and seniors to statistics through graphing data, normal probabilities, linear regression, and experimental design; no AP exam.',
            },
            {
              title: 'Advanced Placement Statistics',
              tag: 'AP',
              description:
                'Major concepts and tools for collecting, analyzing, and drawing conclusions from data, preparing students for the AP exam.',
            },
            {
              title: 'Honors Discrete Mathematics and Personal Finance',
              tag: 'Gr 12',
              description:
                'Explores mathematics as it relates to the social sciences plus the mathematics behind money in everyday life.',
            },
            {
              title: 'Advanced Placement Calculus AB',
              tag: 'AP',
              description:
                'A rigorous course covering a semester of college calculus through limits, differential calculus, and integral calculus.',
            },
            {
              title: 'Advanced Placement Calculus BC',
              tag: 'AP',
              description:
                'An intense course covering two semesters of first-year college calculus including parametric equations, infinite series, vectors, and polar functions.',
            },
            {
              title: 'Advanced Topics in Mathematics and Calculus',
              tag: 'Post-AP',
              description:
                'A student-centered seminar for students who have completed AP Calculus BC, using Phillips Exeter Academy’s Mathematics 4C and 5 curricula.',
            },
          ],
        },
        {
          name: 'Science',
          courses: [
            {
              title: 'Honors Principles of Chemistry and Physics',
              tag: 'Gr 9',
              description:
                'A hands-on, inquiry-based introduction to physical science covering matter, energy transformations, motion, forces, and waves.',
            },
            {
              title: 'Honors Accelerated Principles of Chemistry and Physics',
              tag: 'Accelerated',
              description:
                'A challenging ninth-grade physical science course covering a broader range of chemistry and physics topics at an accelerated pace.',
            },
            {
              title: 'Honors Principles of Life Science',
              tag: 'Honors',
              description:
                'A comprehensive foundation in biological and environmental principles including cell biology, genetics, evolution, and ecology.',
            },
            {
              title: 'Honors Accelerated Principles of Life Science',
              tag: 'Accelerated',
              description:
                'In-depth life science emphasizing application-based learning and analytical reasoning from molecules to ecosystems.',
            },
            {
              title: 'Honors Chemistry',
              tag: 'Honors',
              description:
                'A guided-inquiry course developing the properties, composition, and structure of matter plus energy’s role in changing matter.',
            },
            {
              title: 'Honors Accelerated Chemistry',
              tag: 'Accelerated',
              description:
                'Covers Honors Chemistry at a faster pace plus molecular geometry, periodicity, and acid-base chemistry.',
            },
            {
              title: 'Honors Chemistry and Physics II',
              tag: 'Honors',
              description:
                'An experimentation-driven course covering chemistry and physics concepts not included in the Honors and Accelerated courses.',
            },
            {
              title: 'Honors Biology',
              tag: 'Honors',
              description:
                'Introductory biology connecting key concepts through lab work and guided research, culminating in a third-trimester research project.',
            },
            {
              title: 'Honors Accelerated Biology',
              tag: 'Accelerated',
              description:
                'Major principles of biology at deeper level and faster pace, with additional lab experiences and a third-trimester research project.',
            },
            {
              title: 'Advanced Topics: Environmental Science',
              tag: 'AT',
              description:
                'The scientific principles behind the interrelationships of the natural world, culminating in an independent research project.',
            },
            {
              title: 'Advanced Placement Chemistry',
              tag: 'AP',
              description:
                'A year-long general chemistry equivalent covering nine major topics from atomic structure to thermodynamics.',
            },
            {
              title: 'Advanced Placement Biology',
              tag: 'AP',
              description:
                'The equivalent of a college introductory course for biology majors, built around student-directed, inquiry-based labs.',
            },
            {
              title: 'Advanced Placement Physics 1',
              tag: 'AP',
              description:
                'Algebra-based introductory college-level physics covering kinematics, dynamics, energy, momentum, torque, and rotational motion.',
            },
            {
              title: 'Advanced Placement Physics C',
              tag: 'AP',
              description:
                'A calculus-based mechanics course equivalent to introductory college physics for engineering or physical science majors.',
            },
            {
              title: 'Honors Marine Science',
              tag: 'Elective',
              description:
                'Studies the animals inhabiting the world’s oceans, including setup and maintenance of saltwater aquariums.',
            },
            {
              title: 'Honors Anatomy and Physiology',
              tag: 'Elective',
              description:
                'An introductory study of the anatomical structures and physiological processes of key human body systems.',
            },
            {
              title: 'Honors Seminar: Contemporary Issues in Science',
              tag: 'Online',
              description:
                'An asynchronous fully online course building appreciation for scientific phenomena relevant to scientifically literate adults.',
            },
          ],
        },
        {
          name: 'Social Studies',
          courses: [
            {
              title: 'Honors World History',
              tag: 'Gr 9',
              description:
                'Surveys prehistory through the twentieth century while equipping ninth graders with core humanities skills.',
            },
            {
              title: 'Honors Accelerated World History I',
              tag: 'Accelerated',
              description:
                'The ancient world through circa 1450 CE using the skills, practices, and methods employed by historians.',
            },
            {
              title: 'Honors Civics: Foundations of Democracy and Citizenship',
              tag: 'Gr 10',
              description:
                'Introduces the fundamental principles of democracy, citizenship, and economics in historical and modern contexts.',
            },
            {
              title: 'Advanced Topics: World History II',
              tag: 'AT',
              description:
                'Investigates world history from circa 1450 CE to the present, culminating in the Colloquium research project and policy proposal.',
            },
            {
              title: 'Honors United States History',
              tag: 'Honors',
              description:
                'Examines the development of equality, liberty, democracy, rights, and opportunity in American society.',
            },
            {
              title: 'Advanced Topics: United States History',
              tag: 'AT',
              description:
                'Hones analytical skills across themes in U.S. History, culminating in the Symposium signature learning experience.',
            },
            {
              title: 'Honors Practicum: Civil Discourse and the Social Sciences',
              tag: 'Elective',
              description:
                'Uses current events to explore economics, psychology, sociology, political science, and history; students teach mini-lessons in Lower and Middle School.',
            },
            {
              title: 'Honors Psychology',
              tag: 'Elective',
              description:
                'Introduces psychological science while diving into topics especially relevant to high school life.',
            },
            {
              title: 'Advanced Placement Psychology',
              tag: 'AP',
              description:
                'The scientific study of human behavior and mental processes mirroring an introductory college psychology course.',
            },
            {
              title: 'Advanced Topics: United States Government and Politics',
              tag: 'AT',
              description:
                'An analytical perspective on U.S. government and politics, culminating in an Oral Arguments Supreme Court simulation.',
            },
            {
              title: 'Advanced Topics: European History',
              tag: 'AT',
              description:
                'A hybrid senior course investigating European history from approximately 1450 to the present across seven themes.',
            },
          ],
        },
        {
          name: 'World Languages',
          courses: [
            {
              title: 'Honors Spanish I: Novice',
              tag: 'Level I',
              description:
                'Foundational communication, comprehension, and presentation skills on highly familiar topics.',
            },
            {
              title: 'Honors Spanish II: Intermediate Foundations',
              tag: 'Level II',
              description:
                'Progresses to Novice-High and Intermediate-Low proficiency across a broader range of familiar topics.',
            },
            {
              title: 'Honors Spanish III: Intermediate Mid A',
              tag: 'Level III',
              description:
                'Students participate in exchanges and present on a variety of topics using familiar vocabulary and learned grammar.',
            },
            {
              title: 'Honors Spanish IV: Intermediate Mid B',
              tag: 'Level IV',
              description: 'Refines skills and broadens exposure to diverse accents from Spanish-speaking countries.',
            },
            {
              title: 'Honors Spanish V: Language with a Purpose',
              tag: 'Level V',
              description:
                'Uses Spanish for communication and leadership through institution visits and conversations with native-speaking professionals.',
            },
            {
              title: 'AP Spanish Language and Culture: Advanced',
              tag: 'AP',
              description:
                'A rigorous interdisciplinary course taught exclusively in Spanish, building proficiency toward advanced-low.',
            },
            {
              title: 'Honors French I: Novice',
              tag: 'Level I',
              description:
                'Acquires vocabulary and skills to start communicating in French across simple communicative tasks.',
            },
            {
              title: 'Honors French II: Intermediate Foundations',
              tag: 'Level II',
              description:
                'Builds on French I with daily routines, past events, and future plans plus francophone cultures and current events.',
            },
            {
              title: 'Honors French III: Intermediate Mid A',
              tag: 'Level III',
              description:
                'Immersive oral and written exchanges within the context of culture, connections, and comparisons.',
            },
            {
              title: 'Honors French IV: Intermediate Mid B',
              tag: 'Level IV',
              description:
                'Deepens advanced grammar and vocabulary with exposure to accents from various French-speaking countries.',
            },
            {
              title: 'Honors French V: Intermediate High',
              tag: 'Level V',
              description:
                'An intensive class equivalent to a fourth-semester college course developing all four language skills.',
            },
            {
              title: 'Advanced Placement French Language: Advanced',
              tag: 'AP',
              description:
                'An intensive class preparing students for the AP French language examination in the spring.',
            },
            {
              title: 'Honors Chinese I: Novice',
              tag: 'Level I',
              description:
                'Introductory Mandarin covering functional communication plus Pinyin and Chinese characters.',
            },
            {
              title: 'Honors Chinese II: Novice Mid A',
              tag: 'Level II',
              description:
                'Students discern language patterns and forms to create complete sentences and short spontaneous conversations.',
            },
            {
              title: 'Honors Chinese III: Novice Mid B',
              tag: 'Level III',
              description:
                'Expands characters and compound usages with emphasis on verbal usage and circumlocution.',
            },
            {
              title: 'Honors Chinese IV: Intermediate Foundations',
              tag: 'Level IV',
              description:
                'More complex structures and current events, designed to prepare students for the AP language class.',
            },
            {
              title: 'Honors Chinese V: Intermediate Mid A',
              tag: 'Level V',
              description:
                'Emphasizes natural colloquial usage, idiomatic phrases, Hanzi writing, and essay writing.',
            },
            {
              title: 'Advanced Placement Chinese Language and Culture',
              tag: 'AP',
              description:
                'Comparable to fourth-semester college Mandarin, deepening immersion in the Chinese-speaking world.',
            },
          ],
        },
        {
          name: 'Arts',
          courses: [
            {
              title: 'Honors Visual Foundations',
              tag: 'Prerequisite',
              description:
                'A one-year introductory course and the prerequisite for all Studio Art and Media Arts courses.',
            },
            {
              title: 'Honors Studio-2D',
              tag: 'Honors',
              description:
                'Examines how art across two-dimensional media communicates ideas through a choice-based classroom model.',
            },
            {
              title: 'Honors Studio-3D',
              tag: 'Honors',
              description:
                'Hands-on exploration of clay, wire, wood, plaster, and found objects to create sculptures, installations, and functional designs.',
            },
            {
              title: 'Honors Studio Arts II',
              tag: 'Honors',
              description:
                'An introduction to deep studio practice, creating a series of work based on the student’s own artistic voice.',
            },
            {
              title: 'Honors Studio Arts III',
              tag: 'Honors',
              description:
                'A continuation of Studio Arts II with more independent research and out-of-class project work.',
            },
            {
              title: 'Advanced Placement Studio Art',
              tag: 'AP',
              description:
                'An intensive portfolio course for students seriously interested in the practical experience of art; portfolios replace a written exam.',
            },
            {
              title: 'Advanced Topics: Art History',
              tag: 'AT',
              description:
                'A journey across continents and centuries pairing art analysis with hands-on studio projects; prepares for the AP Art History exam.',
            },
            {
              title: 'Honors Theater I',
              tag: 'Honors',
              description:
                'Explores fundamental skills of realistic acting plus basic principles of directing and designing for the stage.',
            },
            {
              title: 'Honors Theater II',
              tag: 'Honors',
              description:
                'Further develops acting, directing, and design through more challenging projects and greater artistic ownership.',
            },
            {
              title: 'Honors Theater in Performance',
              tag: 'Repeatable',
              description:
                'For experienced students committing to public acting, directing, or production design including Fall One-Acts and Arts Jam.',
            },
            {
              title: 'Honors Concert Chorus',
              tag: 'Repeatable',
              description:
                'Students sing a wide variety of literature composed for mixed choirs while learning healthful vocal production.',
            },
            {
              title: 'Honors String Ensemble I–IV',
              tag: 'Levels I–IV',
              description:
                'Accommodates experienced instrumentalists performing traditional orchestra and chamber repertoire with rising technical mastery and leadership each year.',
            },
            {
              title: 'Honors Upper School Band',
              tag: 'Repeatable',
              description:
                'Builds on middle school band across Concert Band, Big Band, and small classical Chamber Ensembles.',
            },
            {
              title: 'Honors Cannon School Jazz Combo',
              tag: 'Audition',
              description:
                'Explores modern jazz in the small combo format with daily focus on jazz theory and improvisation.',
            },
            {
              title: 'Honors Modern Ensemble',
              tag: 'Repeatable',
              description:
                'Performs American Pop, Rock, R&B, and Rap with heavy use of multi-track recording via Soundtrap.',
            },
            {
              title: 'Honors Music Technology I',
              tag: 'Honors',
              description:
                'Learns the language and mechanics of music through composition using the latest music technology; designed for the music novice.',
            },
            {
              title: 'Honors Music Technology II',
              tag: 'Honors',
              description: 'Deepens compositional skills through Ableton Live and the Ableton Push MIDI controller.',
            },
            {
              title: 'Honors Music Technology III: Music Production',
              tag: 'Honors',
              description:
                'Advanced self-driven projects using industry-standard DAWs such as Ableton Live and Logic Pro.',
            },
            {
              title: 'Honors Creative Design and Engineering I',
              tag: 'Honors',
              description:
                'Project-based exploration of the Iterative Design Engineering process across woodworking, sewing, electronics, and CAD.',
            },
            {
              title: 'Honors Creative Design and Engineering II',
              tag: 'Honors',
              description:
                'Further develops idea curation, project planning, design, and fabrication through increasingly challenging design prompts.',
            },
            {
              title: 'Honors Creative Design and Engineering Studio',
              tag: 'Permission',
              description:
                'An open-block studio for independent maker projects, evaluated through portfolio development and project check-ins.',
            },
          ],
        },
        {
          name: 'Innovation & Enterprise',
          courses: [
            {
              title: 'Advanced Topics: Principles of Computer Science and Coding',
              tag: 'AT',
              description:
                'Introduces the breadth of computer science, covering algorithms, programs, the internet, and AI and their consequences.',
            },
            {
              title: 'Advanced Placement Computer Science A',
              tag: 'AP',
              description:
                'Fundamentals of computer science through object-oriented design in Java, including data structures and algorithms.',
            },
            {
              title: 'Advanced Topics: Microeconomics: Politics and Policy',
              tag: 'AT',
              description:
                'College-level microeconomics examining supply and demand, market structures, and market failure alongside public policy.',
            },
            {
              title: 'Advanced Topics: Business and Entrepreneurship with Personal Finance',
              tag: 'AT',
              description:
                'A year-long project-based course where students develop and launch a business model, culminating in a Shark Tank-style pitch to investors.',
            },
            {
              title: 'Honors Business of Esports',
              tag: 'Honors',
              description:
                'A hands-on exploration of the esports industry and entrepreneurship; students intern for the Collective Esports Company.',
            },
            {
              title: 'Honors Glocal Perspectives',
              tag: 'Gr 12',
              description:
                'An immersive service-learning exploration of global and local perspectives; required for the Global Education Certificate.',
            },
            {
              title: 'Senior Colloquium: Leadership',
              tag: 'Gr 12',
              description:
                'Leadership training in which students read leadership literature and collaborate to chart the curriculum.',
            },
            {
              title: 'Honors Yearbook',
              tag: 'Repeatable',
              description:
                'Produces Cannon’s yearbook, The Flashback, covering graphic design, copywriting, photography, and publication business.',
            },
          ],
        },
        {
          name: 'Physical Education',
          courses: [
            {
              title: 'Wellness and Long-term Athletic Development',
              tag: 'Gr 11–12',
              description:
                'A holistic wellness and athletic development course informed by kinesiology, exercise physiology, and biomechanics.',
            },
          ],
        },
      ],
    },
  ],
}

/* ── Charlotte Christian School ─────────────────────────────────────────────
   2026-27 Upper School Course Curriculum Guide (~135 unique titles, 21 AP
   course lines, 26 units to graduate). Note the school's OWN division bands:
   Lower School is JK–4 and Grade 5 sits in MIDDLE School, so the cards are
   labeled accordingly. Biblical Studies is a required department — 4 units,
   one Bible class every year enrolled — which no other school here has. */
const CHARLOTTE_CHRISTIAN: CourseOfferings = {
  guideYear: '2026-27',
  divisions: [
    {
      title: 'Lower School Courses',
      grades: 'JK – Grade 4',
      teaser:
        '11 subject strands — Bible from JK through a Grade 4 Case for Christ apologetics capstone, plus six enrichment classes.',
      source: 'Charlotte Christian Lower School Curriculum brochure',
      sourceUrl:
        'https://www.charlottechristian.com/fs/resource-manager/view/94f7a8dc-97a5-4798-aeeb-bb83410b4312',
      notPublished:
        'Charlotte Christian publishes Lower School subject strands with grade-band content tables, not named courses. There is no Lower School course catalog.',
      departments: [
        {
          name: 'Bible',
          courses: [
            {
              title: 'Bible',
              tag: 'JK–Gr 3',
              description:
                'JK covers Heroes of the Faith, God’s Love for All, and the Truth of God’s Word; K a Survey of the Bible; Gr 1 Creation through the Promised Land; Gr 2 The Gospels; Gr 3 Israel.',
            },
            {
              title: 'Acts and the Early Church + Case for Christ',
              tag: 'Gr 4',
              description:
                'Grade 4 studies Acts and the Early Church plus a Case for Christ study, an introductory apologetics course that caps lower school biblical learning.',
            },
          ],
        },
        {
          name: 'Core Academics',
          courses: [
            {
              title: 'Literacy',
              tag: 'JK–Gr 4',
              description:
                'Reading uses a structured literacy approach with phonemic awareness and phonics in early grades, shifting to morphology and active comprehension later.',
            },
            {
              title: 'Writing',
              tag: 'JK–Gr 4',
              description:
                'Progresses from small moments and seed stories to narrative, informative, and persuasive styles via a workshop model with one-on-one conferencing.',
            },
            {
              title: 'Math',
              tag: 'JK–Gr 4',
              description:
                'Emphasizes the "why" over rote memorization, moving from concrete manipulatives to pictorial representation to algorithmic understanding.',
            },
            {
              title: 'Science',
              tag: 'JK–Gr 4',
              description:
                'JK covers My Five Senses, Animals, Weather and Sky, and Plants, progressing to Grade 4 Soils Rocks and Landforms, Environments, and Energy in the STEM Lab.',
            },
            {
              title: 'Social Studies',
              tag: 'JK–Gr 4',
              description:
                'JK covers friends and family, beginning maps, great Americans, and community helpers, progressing to Grade 4 North Carolina geography, history, economics, and government.',
            },
          ],
        },
        {
          name: 'Enrichment',
          courses: [
            { title: 'Art', tag: 'JK–Gr 4', description: 'A Lower School enrichment class in visual art.' },
            { title: 'Music', tag: 'JK–Gr 4', description: 'A Lower School enrichment class in music.' },
            {
              title: 'Media Center',
              tag: 'JK–Gr 4',
              description: 'A Lower School enrichment class in the media center.',
            },
            {
              title: 'Physical Education',
              tag: 'JK–Gr 4',
              description: 'A Lower School enrichment class in physical education.',
            },
            { title: 'Spanish', tag: 'JK–Gr 4', description: 'A Lower School enrichment class in Spanish.' },
            {
              title: 'Technology',
              tag: 'JK–Gr 4',
              description: 'Cross-curricular projects plus keyboarding taught from K through Grade 4.',
            },
          ],
        },
      ],
    },
    {
      title: 'Middle School Courses',
      grades: 'Grades 5 – 8',
      teaser:
        'Grade-by-grade sequences across 6 areas plus three elective tracks — Grade 5 begins Middle School here, not Lower.',
      source: 'Charlotte Christian Middle School Curriculum brochure',
      sourceUrl:
        'https://resources.finalsite.net/images/v1740582395/charlotte/avxqip1tnakoukzjqeew/MiddleSchoolCourseCurriculumoverview.pdf',
      notPublished:
        'Charlotte Christian publishes grade-by-grade Middle School subject sequences; elective names are published without descriptions.',
      departments: [
        {
          name: 'Bible',
          courses: [
            {
              title: 'The Prophecy of Christ (Genesis)',
              tag: 'Gr 5',
              description: 'The fifth-grade Bible sequence, studying the prophecy of Christ in Genesis.',
            },
            {
              title: 'The Preparation for Christ (Exodus–Malachi)',
              tag: 'Gr 6',
              description: 'The sixth-grade Bible sequence, covering Exodus through Malachi.',
            },
            {
              title: 'The Plan of Christ (New Testament)',
              tag: 'Gr 7',
              description: 'The seventh-grade Bible sequence, covering the New Testament.',
            },
            {
              title: 'The Person of Christ (The Gospel of John)',
              tag: 'Gr 8',
              description: 'The eighth-grade Bible sequence, studying the Gospel of John.',
            },
          ],
        },
        {
          name: 'Mathematics',
          courses: [
            { title: 'Math 5', tag: 'Gr 5', description: 'The fifth-grade mathematics course.' },
            {
              title: 'Math 6 / Advanced Math 6',
              tag: 'Gr 6',
              description: 'Standard and advanced sixth-grade mathematics tracks.',
            },
            {
              title: 'Math 7 / Pre-Algebra / Algebra 1',
              tag: 'Gr 7',
              description: 'Three seventh-grade placement tracks, up to full high-school Algebra 1.',
            },
            {
              title: 'Pre-Algebra / Algebra 1 / Geometry',
              tag: 'Gr 8',
              description: 'Three eighth-grade placement tracks, up to Geometry.',
            },
          ],
        },
        {
          name: 'Science',
          courses: [
            { title: 'Exploratory Science', tag: 'Gr 5', description: 'The fifth-grade science course.' },
            { title: 'Physical Science', tag: 'Gr 6', description: 'The sixth-grade science course.' },
            { title: 'Life Science', tag: 'Gr 7', description: 'The seventh-grade science course.' },
            { title: 'Earth Science', tag: 'Gr 8', description: 'The eighth-grade science course.' },
          ],
        },
        {
          name: 'Social Studies',
          courses: [
            {
              title: 'Early Explorers to Westward Expansion in U.S. History',
              tag: 'Gr 5',
              description: 'The fifth-grade social studies course.',
            },
            { title: 'Ancient Civilizations', tag: 'Gr 6', description: 'The sixth-grade social studies course.' },
            {
              title: 'Modern World Civilizations',
              tag: 'Gr 7',
              description: 'The seventh-grade social studies course.',
            },
            { title: 'American Civilizations', tag: 'Gr 8', description: 'The eighth-grade social studies course.' },
          ],
        },
        {
          name: 'World Languages',
          courses: [
            {
              title: 'Exploratory Wheel',
              tag: 'Gr 5',
              description: 'A rotation through the school’s three language options.',
            },
            {
              title: 'Introduction (French, Latin, or Spanish)',
              tag: 'Gr 6',
              description: 'Students choose one of French, Latin, or Spanish to introduce.',
            },
            { title: 'Level 1A', tag: 'Gr 7', description: 'The first half of Level 1 in the chosen language.' },
            { title: 'Level 1B', tag: 'Gr 8', description: 'The second half of Level 1 in the chosen language.' },
          ],
        },
        {
          name: 'Electives',
          courses: [
            {
              title: 'Fine Arts electives',
              tag: 'Gr 5–8',
              description:
                'Grade 5 Music and Visual Art; Grades 7–8 add ACT 2, Creative Media, Digital Music, Exploratory Art, Guitar, MidKnight Knews, Stagecraft, and Ukulele.',
            },
            {
              title: 'Innovation electives',
              tag: 'Gr 5–8',
              description:
                'Grade 5 Knights Skills; Grade 6 Coding, Creative Media, Design Lab, RoboKnights; Grades 7–8 add 3D Solid Modeling and Innovation.',
            },
            {
              title: 'Personal Skills electives',
              tag: 'Gr 5–8',
              description:
                'Grade 5 Global Knights; Grade 6 Leadership and Study Skills; Grades 7–8 add Public Speaking, Game Changers, Kingdom Council, Multicultural Studies, and Speech & Debate.',
            },
            {
              title: 'Language Arts & Life Fitness',
              tag: 'Gr 5–8',
              description:
                'Both run as described strands across all four grades, without per-grade course titles published.',
            },
          ],
        },
      ],
    },
    {
      title: 'Upper School Courses',
      grades: 'Grades 9 – 12',
      teaser:
        '~135 courses across 11 departments — 21 AP course lines, 35+ honors, and 4 required units of Biblical Studies.',
      source: "Charlotte Christian US Course Curriculum Guide '26–27",
      sourceUrl:
        'https://www.charlottechristian.com/fs/resource-manager/view/e07cd151-2d20-44e0-a7db-f0b6d50ba314',
      departments: [
        {
          name: 'Biblical Studies',
          courses: [
            {
              title: 'Old Testament Survey',
              tag: 'Gr 9',
              description:
                'Covers the historical flow of the Old Testament, acquainting students with the background, content, and message of each book.',
            },
            {
              title: 'New Testament Survey',
              tag: 'Gr 10',
              description:
                'An overview of the New Testament books covering the validity of Scripture, geography of Bible lands, and the life of Messiah Jesus.',
            },
            {
              title: 'Christian Theology',
              tag: 'Gr 11',
              description:
                'Surveys the essential doctrines of the Christian faith using both systematic and historical theology to answer "What is a Christian?"',
            },
            {
              title: 'World Religions',
              tag: 'Gr 11',
              description:
                'Trains students to analyze and evaluate the truth claims of other faith systems, examining ancient, Eastern, Judaic, and Islamic religions plus cults.',
            },
            {
              title: 'Apologetics and Cultural Engagement',
              tag: 'Gr 12',
              description:
                'Equips students to articulate and live out their Christian faith, with first semester on apologetics and second on cultural engagement.',
            },
          ],
        },
        {
          name: 'English',
          courses: [
            {
              title: 'English 9',
              tag: 'Gr 9',
              description:
                'Introduces high-school-level critical thinking, reading comprehension, research, and writing through a Survey of Genres.',
            },
            {
              title: 'English 9 Honors',
              tag: 'Honors',
              description:
                'Differs from English 9 in intensity, pace, and depth, with more reading, independent work, and complex writing assignments.',
            },
            {
              title: 'English 10',
              tag: 'Gr 10',
              description:
                'A Survey of American Literature built on the questions "what does it mean to be an American" and "what does freedom mean," from a biblical perspective.',
            },
            {
              title: 'English 10 Honors',
              tag: 'Honors',
              description:
                'Differs from English 10 in intensity, pace, and depth, demanding mastery of abstract concepts.',
            },
            {
              title: 'English 11',
              tag: 'Gr 11',
              description:
                'A Survey of World Literature asking "What does it mean to be an engaged global citizen?" through literature of Latin America, Africa, and Asia.',
            },
            {
              title: 'English 11 Honors',
              tag: 'Honors',
              description:
                'Differs from English 11 in pace and depth with focused intensity on fine-tuning already strong writing skills.',
            },
            {
              title: 'English 12',
              tag: 'Gr 12',
              description:
                'A Survey of European Literature and Legacy examining adulthood, choices, and consequences from Greek and Roman classics through modern Europe.',
            },
            {
              title: 'English 12 Honors',
              tag: 'Honors',
              description:
                'Differs from English 12 in pace and depth with focused intensity on refining strong writing skills.',
            },
            {
              title: 'Advanced Placement English Language and Composition',
              tag: 'AP',
              description:
                'An intensive course teaching students to read purposefully for complexity and nuance and write persuasively for varied audiences.',
            },
            {
              title: 'Advanced Placement English Literature and Composition',
              tag: 'AP',
              description:
                'Focuses on reading, analyzing, and writing about imaginative literature — fiction, poetry, and drama — from various periods.',
            },
            {
              title: 'Introduction to Public Speaking',
              tag: 'Semester',
              description:
                'Equips students with practical techniques to control the fear of public speaking, fulfilling the speech graduation requirement.',
            },
            {
              title: "Children's Literature and Film Study",
              tag: 'Semester',
              description:
                'A general survey of children’s literature from early childhood books to young adult novels, pairing texts with their film versions.',
            },
            {
              title: 'Creative Writing',
              tag: 'Semester',
              description:
                'A workshop course spanning poetry, short story, humor and satire, personal essay, memoir, and creative nonfiction.',
            },
            {
              title: 'Sci-Fi and Fantasy: Literature and Film through a Biblical Lens',
              tag: 'Gr 10–12',
              description:
                'Explores classic science fiction and fantasy — Lewis, Tolkien, Rowling — examining themes, symbolism, and allegory from a Christian worldview.',
            },
            {
              title: 'Dystopian Literature and Film through a Biblical Lens',
              tag: 'Gr 10–12',
              description:
                'Examines Orwell, Huxley, and Collins through a Christian lens to analyze what happens when societies reject God to build a "perfect" world.',
            },
            {
              title: 'Poetry Workshop, Honors',
              tag: 'Honors',
              description:
                'A rigorous course in both the creation and critical analysis of poetry, covering rhythm, imagery, metaphor, and structure.',
            },
          ],
        },
        {
          name: 'Mathematics',
          courses: [
            {
              title: 'Algebra I',
              tag: 'Year',
              description:
                'Reviews pre-algebra skills and introduces integers, functions and graphs, equations and inequalities, linear and quadratic functions, and polynomials.',
            },
            {
              title: 'Geometry',
              tag: 'Year',
              description:
                'A thorough introduction to classical Euclidean geometry emphasizing deductive reasoning via lines, angles, triangles, circles, polygons, and solids.',
            },
            {
              title: 'Geometry Honors',
              tag: 'Honors',
              description:
                'Covers Euclidean geometry in a more formal, proof-centered approach at a more rigorous and faster pace.',
            },
            {
              title: 'Algebra II',
              tag: 'Year',
              description:
                'Study of the real number system emphasizing functions and their properties, including matrices, polynomial, exponential, and rational functions.',
            },
            {
              title: 'Algebra II & Trigonometry',
              tag: 'Year',
              description:
                'Covers the Algebra II function content plus probability and a deeper understanding of trigonometric concepts.',
            },
            {
              title: 'Algebra II & Trigonometry Honors',
              tag: 'Honors',
              description:
                'A fast-paced course taking a deep look at the real number system, functions, probability, and trigonometry in detail.',
            },
            {
              title: 'Pre-Calculus',
              tag: 'Year',
              description:
                'Further development of modeling and applying linear, polynomial, exponential, trigonometric, power, and logarithmic functions plus sequences and series.',
            },
            {
              title: 'Pre-Calculus Honors',
              tag: 'Honors',
              description:
                'For students who enjoy mathematics without the depth or stress of an AP course, adding analytic trigonometry, vectors, and an introduction to limits.',
            },
            {
              title: 'Advanced Placement Pre-Calculus',
              tag: 'AP',
              description:
                'Covers the topics of a freshman college algebra course with in-depth study of functions, analytic trigonometry, vectors, and discrete mathematics.',
            },
            {
              title: 'Advanced Placement Calculus AB',
              tag: 'AP',
              description:
                'A college-level course following a first-semester college calculus curriculum covering limits, derivatives, and integrals; single-blocked.',
            },
            {
              title: 'Advanced Placement Calculus BC',
              tag: 'AP',
              description:
                'Follows first- and second-semester college calculus, adding sequences, infinite series, and parametric, vector, and polar functions; double-blocked.',
            },
            {
              title: 'Probability, Statistics and Finite Mathematics',
              tag: 'Year',
              description:
                'Develops statistics — collecting, organizing, analyzing, and interpreting data — plus an elementary introduction to probability.',
            },
            {
              title: 'Probability, Statistics and Finite Mathematics Honors',
              tag: 'Honors',
              description:
                'A fast-paced treatment of statistics and probability including distributions, statistical estimation and testing, and linear regression.',
            },
            {
              title: 'Advanced Placement Statistics',
              tag: 'AP',
              description:
                'Examines and simulates probability distributions to predict and estimate future events, analyzing relationships via correlation and regression.',
            },
            {
              title: 'Calculus III',
              tag: 'Post-AP',
              description:
                'Follows AP Calculus with multivariable functions, vector-valued functions, curvature, double and triple integrals, and differential equations.',
            },
          ],
        },
        {
          name: 'Science',
          courses: [
            {
              title: 'Biology',
              tag: 'Year',
              description:
                'Integrates class work with laboratory experience covering molecular life, cell structure and function, metabolism, genetics, and classification.',
            },
            {
              title: 'Biology Honors',
              tag: 'Honors',
              description:
                'For students with exceptional math and science skills, covering Biology topics with increased breadth and depth.',
            },
            {
              title: 'Chemistry',
              tag: 'Year',
              description:
                'Explores the composition, structure, properties, and transformation of matter through atomic theory, stoichiometry, bonding, and equilibrium.',
            },
            {
              title: 'Chemistry Honors',
              tag: 'Honors',
              description:
                'For students with exceptional aptitude in math and science, covering topics with increased breadth, depth, and lab time.',
            },
            {
              title: 'Physics',
              tag: 'Year',
              description:
                'A general overview of Newtonian mechanics plus electricity, magnetism, light, and sound, with heavy emphasis on hands-on laboratory work.',
            },
            {
              title: 'Physics Honors',
              tag: 'Honors',
              description:
                'Investigates matter from subatomic particles to galaxies, training students to solve problems scientifically through classical mechanics and E&M.',
            },
            {
              title: 'Advanced Placement Physics I',
              tag: 'AP',
              description:
                'Covers mechanics and fluids using an algebra-based approach, equivalent to the first semester of introductory college physics.',
            },
            {
              title: 'Advanced Placement Biology',
              tag: 'AP',
              description:
                'Focuses on college-level biological principles and methodology, investigating cell structure and function, genetics, and ecology in depth.',
            },
            {
              title: 'Advanced Placement Chemistry',
              tag: 'AP',
              description:
                'The equivalent of a general college chemistry course, investigating topics in depth and at a brisk pace.',
            },
            {
              title: 'Advanced Placement Environmental Science',
              tag: 'AP',
              description:
                'An interdisciplinary college-level course on ecosystems, human population dynamics, resource use, pollution, and climate change.',
            },
            {
              title: 'Environmental Science Honors',
              tag: 'Honors',
              description:
                'A hands-on interdisciplinary elective on the interrelationships of the natural world, identifying environmental problems and evaluating solutions.',
            },
            {
              title: 'Astronomy',
              tag: 'Gr 11–12',
              description:
                'Explores the cosmos including constellations, the solar system, radiation and matter, black holes, galaxies, and dark matter.',
            },
            {
              title: 'Anatomy/Physiology',
              tag: 'Year',
              description:
                'A survey of the structure, function, and interactive dynamics of the human body, with case studies and required dissections.',
            },
            {
              title: 'Forensic Science I',
              tag: 'Gr 11–12',
              description:
                'Applies basic biological, chemical, and physical science principles to crime scene investigation, from the crime scene to the courtroom.',
            },
            {
              title: 'Forensic Science II Honors',
              tag: 'Honors',
              description:
                'Applies advanced science principles to crime scenes, focusing on laws and evaluation of evidence through extensive lab work.',
            },
          ],
        },
        {
          name: 'Social Studies',
          courses: [
            {
              title: 'World History I: Ancient Civilizations',
              tag: 'Gr 9',
              description:
                'Studies geography, world religions, and major developments from early civilizations through the mid 1300–1400s.',
            },
            {
              title: 'World History I Honors: Ancient Civilizations',
              tag: 'Honors',
              description:
                'Differs in intensity and depth, with primary-source analysis, document-based questions, and more writing to prepare for AP World History.',
            },
            {
              title: 'World History II: The World and the West',
              tag: 'Year',
              description:
                'Surveys c. 1200 onward, exploring the political, religious, social, and ideological forces that shaped the modern world.',
            },
            {
              title: 'World History II Honors: The World and the West',
              tag: 'Honors',
              description:
                'Adds select honors-level topics, depth, and writing skills preparing students for future AP social studies courses.',
            },
            {
              title: 'Advanced Placement World History: Modern',
              tag: 'AP',
              description:
                'A college-level survey of major civilizations, events, religions, and ideologies from c. 1200 through the end of the twentieth century.',
            },
            {
              title: 'United States History',
              tag: 'Year',
              description:
                'Surveys American history from Native American settlements to the end of the twentieth century against the backdrop of world and current events.',
            },
            {
              title: 'United States History Honors',
              tag: 'Honors',
              description:
                'Differs in intensity and depth, emphasizing examination of primary sources and writing assignments.',
            },
            {
              title: 'Advanced Placement United States History',
              tag: 'AP',
              description:
                'Studies cultural, economic, political, and social developments shaping the U.S. from c. 1491 to the present.',
            },
            {
              title: 'American Government',
              tag: 'Semester',
              description:
                'Gives a broad-based understanding of the institutions and purposes of American government, the political process, and civil liberties.',
            },
            {
              title: 'American Government Honors',
              tag: 'Honors',
              description:
                'Covers American government in greater depth and requires a semester research paper on the inner workings of government.',
            },
            {
              title: 'Economics',
              tag: 'Semester',
              description:
                'Gives a broad-based understanding of the free-market economic system including macroeconomic and microeconomic elements.',
            },
            {
              title: 'Economics Honors',
              tag: 'Honors',
              description:
                'Covers economics in greater depth and requires a semester research paper demonstrating deeper analysis of economic theory.',
            },
            {
              title: 'Advanced Placement United States Government & Politics',
              tag: 'AP',
              description:
                'Gives a critical perspective on economics, politics, and government through general concepts and case studies of American political reality.',
            },
            {
              title: 'Psychology',
              tag: 'Semester',
              description:
                'An appreciation of the science of psychology across self, body, mind, environment, and mental health, integrating a Christian perspective.',
            },
            {
              title: 'Advanced Placement Psychology',
              tag: 'AP',
              description:
                'Studies the historical development and contemporary discipline of psychology across biology, cognition, and social functioning.',
            },
            {
              title: 'Sociology',
              tag: 'Semester',
              description:
                'Familiarizes students with various cultures and the problems resulting from people living in groups, covering deviance, family, and poverty.',
            },
            {
              title: 'Sports Psychology',
              tag: 'Semester',
              description:
                'An overview of psychological theories and research relating to sport and exercise participation at both individual and group levels.',
            },
          ],
        },
        {
          name: 'World Languages',
          courses: [
            {
              title: 'French I – IV Honors',
              tag: 'Year',
              description:
                'The French sequence emphasizing the five National World Language Standards from a biblical perspective; levels III+ add the AAPPL proficiency test.',
            },
            {
              title: 'Advanced Placement French Language and Culture',
              tag: 'AP',
              description: 'College-level French language and culture.',
            },
            {
              title: 'Latin I',
              tag: 'Year',
              description:
                'Introduces the language of the ancient Romans through texts on daily life, family, mythology, and travel.',
            },
            {
              title: 'Latin II – III Honors',
              tag: 'Year',
              description: 'The intermediate Latin sequence at standard and honors levels.',
            },
            {
              title: 'Latin IV Honors',
              tag: 'Honors',
              description: 'Reads Vulgate, Martial, Eutropius, Catullus, Ovid, and Caesar.',
            },
            {
              title: 'Advanced Placement Latin',
              tag: 'AP',
              description: 'Reads Vergil’s Aeneid and Pliny the Younger’s Letters.',
            },
            {
              title: 'Spanish I – IV Honors',
              tag: 'Year',
              description: 'The Spanish sequence building all four language skills across standard and honors levels.',
            },
            {
              title: 'Advanced Placement Spanish Language and Culture',
              tag: 'AP',
              description: 'Explores the six AP curriculum themes.',
            },
            {
              title: 'Advanced Placement Spanish Literature',
              tag: 'AP',
              description:
                'A survey of Peninsular and Latin American literature, taught as an independent study course.',
            },
          ],
        },
        {
          name: 'Technology & Innovation',
          courses: [
            {
              title: 'Computer Science I',
              tag: 'Semester',
              description:
                'Introduces foundational computer science concepts, digital representations of data, and programming and app design using Swift.',
            },
            {
              title: 'Computer Science II Honors',
              tag: 'Honors',
              description:
                'Teaches students to be app developers using iOS development tools, industry best practices, and design, prototype, and test of an original app.',
            },
            {
              title: 'Advanced Placement Computer Science',
              tag: 'AP',
              description:
                'Introduces computer science through programming, emphasizing object-oriented programming and design using Java, data structures, and algorithms.',
            },
            {
              title: 'Architectural Design',
              tag: 'Semester',
              description:
                'Introduces the fundamentals of Google SketchUp and AutoCAD with a focus on residential architecture.',
            },
            {
              title: 'Data Analysis',
              tag: 'Semester',
              description:
                'Uses Google Sheets, Excel, and Numbers to solve real-world problems while learning statistics, combinatorics, binary logic, and graph theory.',
            },
            {
              title: 'Digital Design & Animation I',
              tag: 'Semester',
              description:
                'A project-based dive into Adobe Photoshop and Animate for basic to intermediate graphic media and animation principles.',
            },
            {
              title: 'Digital Design & Animation II Honors',
              tag: 'Honors',
              description:
                'Builds on Digital Design I to write, illustrate, and animate a children’s book, and applies web design and augmented reality.',
            },
            {
              title: 'Engineering I',
              tag: 'Semester',
              description:
                'A hands-on, project-based course applying the engineering design process using 3D modeling software and 3D printers.',
            },
            {
              title: 'Engineering II Honors',
              tag: 'Honors',
              description:
                'Delves deeply into the engineering design process covering mechanisms, strength of materials and structures, automation, and kinematics.',
            },
            {
              title: 'iKNIGHTS',
              tag: 'Semester',
              description:
                'A student-run help desk support program in which students lead technology support, troubleshooting, and tech integration.',
            },
            {
              title: 'Robotics',
              tag: 'Semester',
              description:
                'Develops fundamentals of circuit and signal design, microcontroller programming, sensors, and autonomous operation using Boe-Bot and VEX v5.',
            },
          ],
        },
        {
          name: 'Fine Arts',
          courses: [
            {
              title: 'Art I',
              tag: 'Semester',
              description:
                'An introduction to visual art concepts across drawing, painting, graphic design, and ceramics.',
            },
            {
              title: 'Art II',
              tag: 'Year',
              description:
                'Creative development of artistic skills with 2D and 3D creations plus contextual art history.',
            },
            {
              title: 'Art III Honors',
              tag: 'Honors',
              description:
                'An advanced studio precursor to AP, building a portfolio across drawing, painting, collage, 3D, printmaking, and digital.',
            },
            {
              title: 'Advanced Placement Art and Design',
              tag: 'AP',
              description:
                'A portfolio in 2D art, 3D art, or drawing per College Board guidelines, with work beginning in summer.',
            },
            {
              title: 'Advanced Placement Art History',
              tag: 'AP',
              description: 'Art across the globe from prehistory to the present; open enrollment.',
            },
            {
              title: '3D Art and Design',
              tag: 'Semester',
              description:
                'Three-dimensional forms in clay, plaster, wire, metal, wood, textiles, architectural models, and found objects.',
            },
            {
              title: 'Oil Painting',
              tag: 'Gr 10–12',
              description: 'Apprentice-model production of large works for real-life patrons.',
            },
            {
              title: 'Advanced Placement Music Theory',
              tag: 'AP',
              description:
                'Listed on the guide’s AP roster; the school publishes no course description for it.',
            },
            {
              title: 'Orchestra Honors',
              tag: 'Honors',
              description: 'A performance-based ensemble for concerts, chapels, and community events.',
            },
            {
              title: 'Wind Ensemble Honors',
              tag: 'Honors',
              description: 'The Upper School wind ensemble.',
            },
            {
              title: 'Chamber Ensemble Honors',
              tag: 'Zero Hour',
              description:
                'Chamber repertoire for strings, woodwinds, and brass, meeting at 7 a.m. twice weekly.',
            },
            {
              title: 'Jazz Band Honors',
              tag: 'Audition',
              description: 'Swing, Latin, rock, and funk with focus on improvisation.',
            },
            {
              title: 'Choir Honors',
              tag: 'Audition',
              description: 'The Zero Hour choral ensemble for experienced singers.',
            },
            {
              title: 'Choir',
              tag: 'Semester',
              description: 'An open-enrollment course developing music literacy and ensemble singing.',
            },
            {
              title: 'Introduction to Guitar',
              tag: 'Semester',
              description:
                'Chords, strumming, finger-style technique, and notation across classical, contemporary Christian, popular, and folk styles.',
            },
            {
              title: 'Vocal Workshop',
              tag: 'Semester',
              description:
                'Explores pop, jazz, folk, musical theatre, and art song with healthy vocal technique; satisfies fine arts or speech.',
            },
            {
              title: 'UKnight Worship Honors',
              tag: 'Audition',
              description: 'Leads worship in chapels with musician and production tracks.',
            },
            {
              title: 'Acting Studio (ACT I) Honors',
              tag: 'Audition',
              description:
                'An honors-level acting team with acting and production tracks competing in one-act competition.',
            },
            {
              title: 'Technical Theatre',
              tag: 'Semester',
              description:
                'Scenic design, set construction, properties, lighting, audio engineering, costume and make-up, stage management, and dramaturgy.',
            },
            {
              title: 'Dance',
              tag: 'Pass/fail',
              description:
                'A variety of dance genres from around the world, counting toward either PE or fine arts.',
            },
            {
              title: 'Digital Sound Design',
              tag: 'Semester',
              description: 'Recording and editing audio and video with Logic Pro X and Premiere Pro.',
            },
            {
              title: 'Digital Music I',
              tag: 'Semester',
              description: 'Creating beats and music in GarageBand using loops, MIDI, and music theory.',
            },
            {
              title: 'Digital Music II Honors',
              tag: 'Honors',
              description: 'Song recording, mixing, arranging, and composition in Logic Pro X.',
            },
            {
              title: 'Digital Photography',
              tag: 'Semester',
              description:
                'Camera operation, exposure, and visual composition; students supply their own DSLR.',
            },
            {
              title: 'Introduction to Film Production',
              tag: 'Semester',
              description: 'Writing, planning, shooting, and editing video using Celtx and Adobe Premiere.',
            },
            {
              title: 'Film Studies',
              tag: 'Semester',
              description: 'The making, history, and language of film and how films communicate worldview.',
            },
            {
              title: 'Broadcasting Honors (Knights Knews)',
              tag: 'Honors',
              description:
                'Produces a weekly news magazine airing to all upper school students and posted on YouTube.',
            },
          ],
        },
        {
          name: 'Personal Development',
          courses: [
            {
              title: 'Business I',
              tag: 'Semester',
              description:
                'Finance, marketing, entrepreneurship, management, economics, leadership, and human resources.',
            },
            {
              title: 'Business II',
              tag: 'Gr 11–12',
              description: 'Deeper business fundamentals plus personal finance.',
            },
            {
              title: 'Cross Cultural Communication',
              tag: 'Semester',
              description:
                'The communication process and a working knowledge of culture for meaningful global engagement.',
            },
            {
              title: 'Sports Sponsorship and NIL',
              tag: 'Gr 10–12',
              description:
                'Sponsorship in sport including the rules and laws surrounding name, image, and likeness.',
            },
            {
              title: 'Junior Seminar',
              tag: 'Required',
              description:
                'College fit, money and time management, relationships, and the basics of college admission including an application essay and activities résumé.',
            },
            {
              title: 'Logic and Debate',
              tag: 'Gr 10–12',
              description:
                'Truth, logic, and argumentation, formal and informal fallacies, and sound syllogisms; fulfills the speech requirement.',
            },
            {
              title: 'Personal Finance and Biblical Stewardship',
              tag: 'Semester',
              description:
                'Biblical principles of stewardship applied to spending, saving, credit, and debt.',
            },
            {
              title: 'Winterim',
              tag: 'Required',
              description:
                'One week in second semester of nontraditional enrichment courses, mission and service trips, and career shadowing.',
            },
          ],
        },
        {
          name: 'PE & Life Skills',
          courses: [
            {
              title: 'Lifetime Fitness',
              tag: 'Required',
              description:
                'Aerobic exercise, movement training, nutrition, mental health, and strength training, required in Grade 9.',
            },
            {
              title: 'Athletic Conditioning',
              tag: 'Repeatable',
              description: 'Athletic strength and conditioning, pass/fail and repeatable to 1 credit.',
            },
            {
              title: 'Refereeing: Basketball I — Male',
              tag: 'Fall',
              description:
                'NFHS rules, game management, and 2-person crew mechanics preparing students for certification.',
            },
            {
              title: 'Refereeing: Basketball I — Female',
              tag: 'Fall',
              description:
                'NFHS rules, game management, and 2-person crew mechanics preparing students for certification.',
            },
            {
              title: 'Refereeing: Basketball II',
              tag: 'Spring',
              description: 'Advances to 3-person crew mechanics; runs on an alternate-year rotation.',
            },
          ],
        },
        {
          name: 'Journalism & Media',
          courses: [
            {
              title: 'Yearbook / Yearbook Honors',
              tag: 'Gr 10–12',
              description:
                'Produces the JK-12 yearbook, with honors credit available to juniors and seniors in their second or third year.',
            },
          ],
        },
      ],
    },
  ],
}

/* ── Davidson Day School ────────────────────────────────────────────────────
   2026-2027 Upper School Course Catalog (~75 courses, 9 departments, 26 AP
   courses; 66 on the 2026-27 offerings grid). Davidson Day is NOT an IB World
   School — verified across all 71 catalog pages and the school profile — so no
   IB tags appear here. It is also the only school in this project that
   publishes no Lower School curriculum at all, which the cards state plainly. */
const DAVIDSON_DAY: CourseOfferings = {
  guideYear: '2026-27',
  divisions: [
    {
      title: 'Lower School Courses',
      grades: 'Age 2 – Grade 4',
      teaser:
        'No published course or subject list — Davidson Day describes Early Childhood and Lower School in prose only.',
      source: 'Davidson Day Lower School & Early Childhood pages',
      sourceUrl: 'https://www.davidsonday.org/academics/lower-school',
      notPublished:
        'Davidson Day publishes no course lists, subject lists, or named curriculum programs for Early Childhood or Lower School. Verified against the live pages, their October 2025 Wayback captures, and the school’s full Issuu publication index.',
      departments: [
        {
          name: 'What is published',
          courses: [
            {
              title: 'Early Childhood Program',
              tag: 'Age 2 – JK',
              description:
                'Early Preschool (2s/3s), Preschool (3s/4s), and Junior Kindergarten (4s/5s) target cognitive skills, language development, motor skills, executive functioning, and social-emotional wellness.',
            },
            {
              title: 'Specials',
              tag: 'K–Gr 4',
              description:
                'Art, world language, library, physical education, and music, plus Lower School science and technology labs for hands-on experimentation.',
            },
            {
              title: 'Student-to-faculty ratio',
              tag: 'K–Gr 4',
              description: 'The Lower School runs an 8:1 student-to-faculty ratio.',
            },
          ],
        },
      ],
    },
    {
      title: 'Middle School Courses',
      grades: 'Grades 5 – 8',
      teaser:
        '10 named math courses plus Study Skills — the only Middle School courses Davidson Day publishes, via the Upper School catalog’s progression chart.',
      source: "Davidson Day Upper School Course Catalog '26–27, math progression (p.28)",
      sourceUrl: 'https://issuu.com/davidsondayschool/docs/2026-2027_upper_school_course_catalog',
      notPublished:
        'No Middle School course catalog or curriculum guide exists. The math courses below come from the Upper School catalog’s progression chart; everything else on the Middle School page is marketing prose.',
      departments: [
        {
          name: 'Mathematics',
          courses: [
            {
              title: '5th Grade Math',
              tag: 'Gr 5',
              description: 'The entry point of the standard middle-school math sequence.',
            },
            {
              title: 'Accelerated Math 1',
              tag: 'Gr 5–6',
              description: 'The accelerated entry track, taken in Grade 5 or 6.',
            },
            { title: 'Math 1', tag: 'Gr 6', description: 'The standard sixth-grade course following 5th Grade Math.' },
            {
              title: 'Accelerated Math 2',
              tag: 'Gr 6–7',
              description: 'The accelerated course following Accelerated Math 1.',
            },
            {
              title: 'Accelerated Math 2/3',
              tag: 'Gr 6',
              description: 'A compressed combined course on the fastest track.',
            },
            { title: 'Math 2', tag: 'Gr 7', description: 'The standard seventh-grade course following Math 1.' },
            {
              title: 'Accelerated Math 3',
              tag: 'Gr 7–8',
              description: 'The accelerated course preceding Honors Algebra 1.',
            },
            { title: 'Math 3', tag: 'Gr 8', description: 'The standard eighth-grade course leading to Algebra 1.' },
            {
              title: 'Honors Algebra 1',
              tag: 'Honors',
              description: 'Upper-School-credit algebra taken as early as Grade 7 on the fastest track.',
            },
            {
              title: 'Honors Geometry',
              tag: 'Honors',
              description: 'Upper-School-credit geometry available in Grade 8.',
            },
          ],
        },
        {
          name: 'Other published detail',
          courses: [
            {
              title: 'Study Skills',
              tag: 'Gr 5–8',
              description:
                'Every Middle School student takes a study-skills course each year — "four years of building the tools for success."',
            },
            {
              title: 'Upper School course access',
              tag: 'Gr 7–8',
              description:
                'Middle School students may take Upper School world language and mathematics courses; those credits count toward graduation but are excluded from Upper School GPA.',
            },
            {
              title: 'AFAR International Research',
              tag: 'Gr 7+',
              description:
                'Accredited archaeological fieldwork opens in Grade 7, at Maya, medieval Spanish, and Roman Portuguese sites.',
            },
          ],
        },
      ],
    },
    {
      title: 'Upper School Courses',
      grades: 'Grades 9 – 12',
      teaser:
        '~75 catalogued courses across 9 departments — 26 AP courses, post-AP Calculus III, and three Diploma Distinction tracks.',
      source: "Davidson Day Upper School Course Catalog '26–27",
      sourceUrl: 'https://issuu.com/davidsondayschool/docs/2026-2027_upper_school_course_catalog',
      departments: [
        {
          name: 'English',
          courses: [
            {
              title: 'English I',
              tag: 'Gr 9',
              description:
                'A survey of literary genres built on The Crucible, Romeo and Juliet, and Of Mice and Men, with sustained academic-writing practice.',
            },
            {
              title: 'English I Honors',
              tag: 'Honors',
              description:
                'The English I sequence at an accelerated, more intensive pace, entered by recommendation of eighth-grade teachers.',
            },
            {
              title: 'English II',
              tag: 'Gr 10',
              description:
                'Study of Beowulf, Othello, and Animal Farm alongside short-story and poetry units, emphasizing deeper meaning and implication in texts.',
            },
            {
              title: 'English II Honors',
              tag: 'Honors',
              description:
                'Reads A Long Way Gone, Much Ado About Nothing, and Predictably Irrational, extending English II skills through scaffolded responses.',
            },
            {
              title: 'English III Honors',
              tag: 'Honors',
              description:
                'A literature-based course on 1984, The Stranger, The Great Gatsby, and Frankenstein, building literary analysis and argument construction.',
            },
            {
              title: 'English IV Honors',
              tag: 'Honors',
              description:
                'First semester explores the literary voice of the American South; second semester is a seminar on Shakespeare’s comedies.',
            },
            {
              title: 'AP English Language and Composition',
              tag: 'AP',
              description:
                'A writing- and reading-intensive study of rhetoric in which students learn to analyze and construct effective arguments.',
            },
            {
              title: 'AP English Literature and Composition',
              tag: 'AP',
              description:
                'Composition and literary analysis across genres, examining representative British and American novels and plays from the sixteenth century on.',
            },
            {
              title: 'Creative Writing Honors',
              tag: 'Honors',
              description:
                'An honors elective workshop in poetry, life writing, and fiction, culminating in portfolios and a self-designed final project.',
            },
            {
              title: 'Introduction to Yearbook',
              tag: 'Elective',
              description:
                'Students produce the Revolution yearbook while learning journalistic writing, photography, interviewing, and ad sales.',
            },
            {
              title: 'Yearbook Honors',
              tag: 'Honors',
              description:
                'Advanced yearbook students take leadership roles in theme, layout, staff training, and business campaigns.',
            },
          ],
        },
        {
          name: 'Mathematics',
          courses: [
            {
              title: 'Algebra I',
              tag: 'Gr 9–12',
              description:
                'Introduces the fundamental concepts of algebra and their multiple representations, including linear and quadratic equations and polynomials.',
            },
            {
              title: 'Algebra I Honors',
              tag: 'Honors',
              description:
                'The Algebra I curriculum at an accelerated pace, entered from Accelerated Math 3 or Honors Prealgebra.',
            },
            {
              title: 'Geometry',
              tag: 'Gr 9–12',
              description:
                'Classical Euclidean geometry — congruence, similarity, solid and analytic geometry, and right-triangle trigonometry — with emphasis on proof.',
            },
            {
              title: 'Geometry Honors',
              tag: 'Honors',
              description:
                'Geometry covered at a faster pace and greater depth, requiring Honors Algebra I and departmental approval.',
            },
            {
              title: 'Algebra II',
              tag: 'Gr 10–12',
              description:
                'Polynomial functions in depth plus rational, square-root, logarithmic, and exponential models, with graphing-calculator work integral.',
            },
            {
              title: 'Algebra II/Trigonometry Honors',
              tag: 'Honors',
              description:
                'The Algebra II curriculum with trigonometric functions added, requiring Geometry Honors and summer work.',
            },
            {
              title: 'Precalculus',
              tag: 'Gr 11–12',
              description:
                'Combines trigonometry, geometry, and algebra concepts needed for calculus, strengthening understanding of algebraic and transcendental functions.',
            },
            {
              title: 'AP Precalculus',
              tag: 'AP',
              description:
                'College Board–aligned study of polynomial, rational, exponential, logarithmic, and trigonometric functions emphasizing modeling.',
            },
            {
              title: 'Honors Calculus',
              tag: 'Honors',
              description:
                'An advanced course covering limits, continuity, derivatives, the Fundamental Theorems, and integration techniques.',
            },
            {
              title: 'AP Calculus AB',
              tag: 'AP',
              description:
                'A college-level introduction to differential and integral calculus applied to change, motion, and accumulation.',
            },
            {
              title: 'AP Calculus BC',
              tag: 'AP',
              description: 'Extends Calculus AB with parametric, polar, and vector functions plus sequences and series.',
            },
            {
              title: 'Calculus III Honors: Multivariable Calculus and Linear Algebra',
              tag: 'Post-AP',
              description:
                'Semester courses extending calculus into higher dimensions plus linear algebra topics; weighted 1.0 like an AP.',
            },
            {
              title: 'AP Statistics',
              tag: 'AP',
              description:
                'Major concepts and tools for collecting, analyzing, and drawing conclusions from data, spanning sampling, probability, and inference.',
            },
          ],
        },
        {
          name: 'History & Social Sciences',
          courses: [
            {
              title: 'Civics and Deliberative Democracy',
              tag: 'Gr 9',
              description:
                'A foundational humanities course rooted in constitutional principles, using research, position papers, and structured debate.',
            },
            {
              title: 'Civics Honors',
              tag: 'Honors',
              description:
                'The Civics course with added analytical rigor, primary-source interpretation, and AP-style writing prompts.',
            },
            {
              title: 'World History Honors',
              tag: 'Gr 10',
              description: 'The required sophomore world-history survey.',
            },
            {
              title: 'AP World History (Modern)',
              tag: 'AP',
              description:
                'A college-level survey from roughly 1200 CE forward, covering global integration, industrialization, colonialism, and ideological conflict.',
            },
            {
              title: 'U.S. History Honors',
              tag: 'Honors',
              description:
                'Surveys United States history from the peopling of North America to the present through diverse viewpoints and primary-source argumentation.',
            },
            {
              title: 'AP U.S. History',
              tag: 'AP',
              description:
                'A college-level survey with substantially greater reading — primary documents, cartoons, maps, data sets — pushing students to work like historians.',
            },
            {
              title: 'AP European History',
              tag: 'AP',
              description:
                'Investigates significant European events and processes from about 1450 to the present.',
            },
            {
              title: 'AP Microeconomics',
              tag: 'AP',
              description:
                'Principles of economics applied to individual producers and consumers; offered 2026-2027 on an alternate-year rotation.',
            },
            {
              title: 'AP Macroeconomics',
              tag: 'AP',
              description:
                'Principles of economics applied to the economic system as a whole; offered 2027-2028 on an alternate-year rotation.',
            },
            {
              title: 'AP Psychology',
              tag: 'AP',
              description:
                'The systematic, scientific study of human behavior and thought — learning, motivation, memory, neuroanatomy — with experimental design work.',
            },
            {
              title: 'AP U.S. Government and Politics',
              tag: 'AP',
              description:
                'Cultivates understanding of U.S. government through data and text analysis of constitutionalism, liberty and order, and civic participation.',
            },
            {
              title: 'Anthropology Honors',
              tag: 'Honors',
              description:
                'A systematic overview of anthropology’s four subfields — cultural, physical, archaeology, and linguistics.',
            },
          ],
        },
        {
          name: 'Science',
          courses: [
            {
              title: 'Conceptual Physics',
              tag: 'Gr 9',
              description:
                'Waves, sound, and light, then mechanics and electric circuits, with mathematical models limited to Algebra I concepts.',
            },
            {
              title: 'Physics Honors',
              tag: 'Honors',
              description: 'The same physics sequence adding Geometry-level mathematical modeling.',
            },
            {
              title: 'AP Physics 1',
              tag: 'AP',
              description:
                'Algebra-based introductory college physics covering kinematics, dynamics, energy, momentum, torque, gravitation, and fluids.',
            },
            {
              title: 'AP Physics 2',
              tag: 'AP',
              description:
                'Algebra-based second-semester college physics covering fluids, thermodynamics, electricity and magnetism, optics, and modern physics.',
            },
            {
              title: 'Chemistry',
              tag: 'Gr 10',
              description:
                'Fundamental principles of chemistry — matter, atomic structure, reactions, stoichiometry, bonding, kinetics and equilibrium — with quantitative labs.',
            },
            {
              title: 'Chemistry Honors',
              tag: 'Honors',
              description:
                'Chemistry with strong emphasis on critical thinking, independent lab investigation, and writing.',
            },
            {
              title: 'AP Chemistry',
              tag: 'AP',
              description:
                'A college-level chemistry foundation covering atomic structure, intermolecular forces, kinetics, thermodynamics, and equilibrium.',
            },
            {
              title: 'Biology',
              tag: 'Gr 11',
              description:
                'Major principles of modern biology — organization of life, cell structure and division, DNA, genetics, evolution, and ecology.',
            },
            {
              title: 'Biology Honors',
              tag: 'Honors',
              description:
                'Biology with greater depth and rigor, adding inquiry learning with current research data and independent experiment design.',
            },
            {
              title: 'AP Biology',
              tag: 'AP',
              description:
                'College-level biology organized around molecules and cells, individual organisms, and populations, with significant independent work.',
            },
            {
              title: 'AP Environmental Science',
              tag: 'AP',
              description:
                'Inquiry-based study of the natural world organized around energy transfer, earth-system interactions, species interactions, and sustainability.',
            },
            {
              title: 'Human Anatomy and Physiology Honors',
              tag: 'Honors',
              description:
                'A comprehensive study of human body structure and function via medical case studies, microscopy, and dissection.',
            },
          ],
        },
        {
          name: 'World Languages',
          courses: [
            {
              title: 'French I',
              tag: 'Gr 9–12',
              description:
                'Beginning French developing the four skill areas in culturally appropriate contexts, with emphasis on interpretive skills before production.',
            },
            {
              title: 'French II',
              tag: 'Year',
              description:
                'Builds French vocabulary around family, education, food, travel, and daily routines using authentic resources.',
            },
            {
              title: 'French III Honors',
              tag: 'Honors',
              description:
                'Applies interpersonal, presentational, and interpretive skills through authentic texts, songs, and videos.',
            },
            {
              title: 'French IV Honors',
              tag: 'Honors',
              description:
                'Works almost exclusively from authentic resources toward full communication in French, extending into the African Francophone world.',
            },
            {
              title: 'French V Honors',
              tag: 'Honors',
              description:
                'Typically taken as preparation for AP French Language and Culture, taught on a two-year rotation with the AP course.',
            },
            {
              title: 'AP French Language and Culture',
              tag: 'AP',
              description:
                'The culminating French course organized around six themes and taught almost exclusively in French.',
            },
            {
              title: 'Spanish I',
              tag: 'Gr 9–12',
              description:
                'Introductory Spanish covering thematic and grammatical units, moving toward novice-level production with authentic songs and video.',
            },
            {
              title: 'Spanish II',
              tag: 'Year',
              description:
                'Expands vocabulary through units on education, family, daily life, travel, and traditions across twelve Spanish-speaking countries.',
            },
            {
              title: 'Spanish III Honors',
              tag: 'Honors',
              description:
                'Sharpens all four skills through units on travel, relationships, beauty, and health while adding advanced grammar.',
            },
            {
              title: 'Spanish IV Honors',
              tag: 'Honors',
              description:
                'In-depth cultural study using authentic resources and academic vocabulary, emphasizing conversation and complex written expression.',
            },
            {
              title: 'Spanish V Honors: Cultural Topics',
              tag: 'Honors',
              description:
                'Explores in-depth cultural themes through authentic fiction, film, and documentaries, taught almost exclusively in Spanish.',
            },
            {
              title: 'AP Spanish Language and Culture',
              tag: 'AP',
              description:
                'Explores culture in contemporary and historical contexts, developing awareness of cultural products, practices, and perspectives.',
            },
            {
              title: 'AP Spanish Literature and Culture',
              tag: 'AP',
              description:
                'Listed in the catalog contents and AP roster; the school publishes no course description for it.',
            },
          ],
        },
        {
          name: 'Participation in the Arts',
          courses: [
            {
              title: 'Photography I',
              tag: 'Year',
              description:
                'Fundamentals of photography and the camera — composition, light, the exposure triangle, and Adobe Lightroom — culminating in a portfolio.',
            },
            {
              title: 'Photography II',
              tag: 'Year',
              description:
                'Continues photographic technique and post-production while developing individual point of view.',
            },
            {
              title: 'Photography III',
              tag: 'Year',
              description:
                'For serious student photographers mastering the digital SLR, advanced editing, and personal style, producing their own websites.',
            },
            {
              title: 'Studio I',
              tag: 'Year',
              description:
                'Introduces foundational concepts and skills across two- and three-dimensional artmaking, including observational drawing and ceramics.',
            },
            {
              title: 'Studio II Honors',
              tag: 'Honors',
              description:
                'Builds on Studio I with longer-term projects, regular critique, and written artist reflections as preparation for AP Studio Art.',
            },
            {
              title: 'Portfolio',
              tag: 'Gr 11–12',
              description:
                'Upperclassmen develop an individualized year-long project plan with the instructor in a medium or subject of their choice.',
            },
            {
              title: 'AP Studio Art',
              tag: 'AP',
              description:
                'Students develop a portfolio of works representing a sustained investigation into a common visual theme for College Board judges.',
            },
            {
              title: 'Performance Ensemble',
              tag: 'Audition',
              description:
                'A select company of actors researching, rehearsing, and performing challenging theatre, also appearing in school productions.',
            },
            {
              title: 'Contemporary Ensemble',
              tag: 'No audition',
              description:
                'Davidson Day’s "School of Rock" — students learn and perform contemporary pop and rock music with parts adjusted to each player’s level.',
            },
            {
              title: 'Modern Music',
              tag: 'Year',
              description:
                'A blend of history, musicology, and popular culture covering the last hundred years, with original composition in GarageBand.',
            },
            {
              title: 'Film Studies & Production',
              tag: 'Year',
              description:
                'Teaches film appreciation — history, genre, elements, cultural impact — alongside entry-level digital video editing and production.',
            },
          ],
        },
        {
          name: 'Technology & Computer Science',
          courses: [
            {
              title: 'Introduction to Computer Coding',
              tag: 'Independent',
              description:
                'Foundational Python programming covering variables, conditionals, loops, functions, and basic data structures with a faculty mentor.',
            },
            {
              title: 'AP Computer Science Principles',
              tag: 'AP',
              description:
                'Foundational computer-science ideas — computational thinking, algorithms, data, the internet, and the ethics of technology.',
            },
            {
              title: 'AP Computer Science A',
              tag: 'AP',
              description:
                'College-level object-oriented programming in Java covering classes, control structures, methods, arrays, and recursion.',
            },
          ],
        },
        {
          name: 'Physical Education',
          courses: [
            {
              title: 'Weight Training',
              tag: 'Year',
              description:
                'Supervised muscular, cardiovascular, agility, and endurance training with emphasis on safe technique and lifelong fitness habits.',
            },
            {
              title: 'Intro to Sports Medicine',
              tag: 'Semester',
              description:
                'Fundamentals of sports medicine and its careers, covering anatomy, injuries, evaluation, and taping across two semesters.',
            },
          ],
        },
        {
          name: 'Electives & Distinctions',
          courses: [
            {
              title: 'Financial Literacy Honors',
              tag: 'Honors',
              description:
                'Introduces how businesses operate and compete, financial and equities markets, and practical personal finance, with a Wharton competition.',
            },
            {
              title: 'AP Business w/ Personal Finance',
              tag: 'AP',
              description:
                'A comprehensive introduction to business principles and personal finance through case studies, research projects, and applied simulations.',
            },
            {
              title: 'Honors Social Entrepreneurship',
              tag: 'Honors',
              description:
                'Applies business principles to social, environmental, and community challenges through project-based learning with local organizations.',
            },
            {
              title: 'AP with WE Service',
              tag: 'AP',
              description:
                'Combines college-level academic study with sustained field-based service learning alongside local nonprofit partners.',
            },
            {
              title: "Middle School TA",
              tag: 'Gr 10–12',
              description:
                'Upper School students serve as instructional partners in middle-school classrooms and lead mini-lessons, with monthly pedagogy seminars.',
            },
            {
              title: 'Research Methods Honors',
              tag: 'Gr 11',
              description:
                'A foundational Diploma Distinctions course teaching scholarly research through biweekly seminars, culminating in a formal Capstone abstract.',
            },
            {
              title: 'Capstone Research Honors',
              tag: 'Gr 12',
              description:
                'The senior-year component of the Diploma Distinctions program supporting the Senior Capstone Research Project.',
            },
            {
              title: 'Forensics & Zoology Honors',
              tag: 'Honors',
              description:
                'Listed as a STEMM Distinction core option and in the school profile course grid; no course description is published.',
            },
            {
              title: 'Independent Study',
              tag: 'Pass/Fail',
              description:
                'A student-designed course of study with a faculty supervisor, requiring an approved abstract and syllabus; excluded from GPA.',
            },
          ],
        },
      ],
    },
  ],
}

const OFFERINGS: Record<string, CourseOfferings> = {
  'providence-day': PROVIDENCE_DAY,
  'charlotte-latin': CHARLOTTE_LATIN,
  'charlotte-country-day': CHARLOTTE_COUNTRY_DAY,
  cannon: CANNON,
  'charlotte-christian': CHARLOTTE_CHRISTIAN,
  'davidson-day': DAVIDSON_DAY,
}

/* ---------------------------------------------------------- translations -- */

/**
 * Locale overlays for this topic's prose, loaded on demand.
 *
 * MUST stand alone — `import.meta.glob` is a compile-time transform, and a
 * runtime guard around it survives into the output where `import.meta.glob` is
 * undefined, silently resolving every overlay to nothing. See clubsProgram.ts.
 */
/*
 * DEFERRED behind a function, unlike the other topics. `import.meta.glob` is a
 * Vite-only form that plain Node cannot even PARSE at module scope, and the
 * build-time checkers import this module directly (it is one file behind an
 * accessor rather than per-school files). At module scope it made
 * check_translations.mjs report `0/0 field sites` for a fully-translated topic.
 *
 * Inside a function the statement is still transformed at build time — the glob
 * is NOT evaluated at runtime — so overlay loading is unchanged, while Node can
 * import the module as long as it never calls this.
 */
function overlayFiles() {
  return import.meta.glob<OverlayFile>('./overlays/course-offerings.*.json', {
    import: 'default',
  })
}

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadCourseOfferingsOverlay(lang: string): Promise<void> {
  if (hasOverlay('course-offerings', lang)) return
  const load = overlayFiles()?.[`./overlays/course-offerings.${lang}.json`]
  if (!load) {
    setOverlayIndex('course-offerings', lang, undefined)
    return
  }
  try {
    setOverlayIndex('course-offerings', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('course-offerings', lang, undefined)
  }
}

/**
 * The structured course offerings for a school, or undefined to fall back to prose.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function courseOfferings(
  schoolSlug: string,
  lang = 'en',
): CourseOfferings | undefined {
  const en = OFFERINGS[schoolSlug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('course-offerings', lang), schoolSlug)
}
