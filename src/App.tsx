import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

type Filter = {
  key: string
  label: string
}

type Discipline = {
  key: string
  label: string
  highlighted?: boolean
}

type Project = {
  title: string
  category?: string
  tone: string
}

const filters: Filter[] = [
  { key: 'all', label: 'all work' },
  { key: 'engineering', label: 'engineering' },
  { key: 'ai', label: 'ai' },
  { key: 'product', label: 'product' },
  { key: 'graphic', label: 'graphic' },
  { key: 'motion', label: 'motion' },
]

const disciplines: Discipline[] = [
  { key: 'design-engineering', label: 'design engineering', highlighted: true },
  { key: 'product-design', label: 'product design' },
  { key: 'ux-ui-design', label: 'ux/ui design' },
  { key: 'motion-design', label: 'motion design' },
  { key: 'graphic-design', label: 'graphic design' },
  { key: 'ai-design', label: 'ai design' },
]

const projects: Project[] = [
  {
    title: '15mins',
    category: 'design engineering',
    tone: 'from-[#efefed] to-[#f6f5f2]',
  },
  {
    title: 'Plum Wallet',
    tone: 'from-[#f3f1ee] to-[#eceae6]',
  },
  {
    title: 'Cardneto',
    tone: 'from-[#eeefeb] to-[#e7ebe5]',
  },
  {
    title: 'Toolbar',
    tone: 'from-[#eeefec] to-[#eceae5]',
  },
  {
    title: 'plateus',
    tone: 'from-[#f0f1ec] to-[#ecebe7]',
  },
  {
    title: 'La Mama Catita',
    tone: 'from-[#efefed] to-[#ece9e4]',
  },
  {
    title: 'joan holloway',
    tone: 'from-[#f0f0ec] to-[#ecece8]',
  },
]

const sections = [
  {
    id: 'about',
    eyebrow: 'about',
    title: 'I design quiet interfaces, practical systems, and products that feel immediate.',
    body:
      'Based in Chisinau, I work across product thinking, interaction design, and light engineering to turn messy ideas into clean digital experiences.',
  },
  {
    id: 'contact',
    eyebrow: 'contact',
    title: 'Open for freelance, collaborations, and carefully scoped product work.',
    body:
      "If you have a product that needs a clear visual voice or a prototype that needs to feel real, let's talk.",
  },
]

const disciplineDetails: Record<string, { title: string; body: string }> = {
  'product-design': {
    title: 'product design',
    body: 'Selected product design. This can become a dedicated case-study area while About and Contact remain unchanged below.',
  },
  'ux-ui-design': {
    title: 'ux/ui design',
    body: 'Selected ux/ui design. This area is ready for focused interface work, flows, or curated previews.',
  },
  'motion-design': {
    title: 'motion design',
    body: 'Selected motion design. You can later replace this state with reels, motion stills, or animation breakdowns.',
  },
  'graphic-design': {
    title: 'graphic design',
    body: 'Selected graphic design. This placeholder can become a poster wall, branding archive, or visual gallery.',
  },
  'ai-design': {
    title: 'ai design',
    body: 'Selected ai design. This keeps the page interactive now and leaves a slot for AI-focused work later.',
  },
}

const filterToDiscipline: Record<string, string> = {
  all: 'design-engineering',
  engineering: 'design-engineering',
  ai: 'ai-design',
  product: 'product-design',
  graphic: 'graphic-design',
  motion: 'motion-design',
}

const disciplineToFilter: Record<string, string> = {
  'design-engineering': 'engineering',
  'product-design': 'product',
  'ux-ui-design': 'product',
  'motion-design': 'motion',
  'graphic-design': 'graphic',
  'ai-design': 'ai',
}

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
}

function SoundIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M4 14V10H7.5L12 6.5V17.5L7.5 14H4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M15 9.25C15.9 9.95 16.5 11.03 16.5 12.25C16.5 13.47 15.9 14.55 15 15.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17.75 6.75C19.3 8.05 20.25 10.02 20.25 12.25C20.25 14.48 19.3 16.45 17.75 17.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-3.5 w-3.5 text-[#7f8b96] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M4 6.5L8 10L12 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AvatarTile() {
  const [imageMissing, setImageMissing] = useState(false)

  return (
    <div className="relative h-[72px] w-[72px] overflow-hidden rounded-[18px] border border-[#d9dee2] bg-[#f2f4ef] shadow-[0_1px_2px_rgba(15,23,32,0.08)]">
      {!imageMissing ? (
        <img
          src="/images/profile-avatar.png"
          alt="Portrait of Maxim Zvarici"
          className="h-full w-full object-cover"
          onError={() => setImageMissing(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[18px] tracking-[-0.03em] text-[#7f8b96]">
          mz
        </div>
      )}
    </div>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedDiscipline, setSelectedDiscipline] = useState('design-engineering')

  const selectedDetail = disciplineDetails[selectedDiscipline]

  return (
    <main className="px-5 pb-16 pt-5 sm:px-6 lg:px-5 xl:px-6">
      <div className="mx-auto max-w-layout">
        <section className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-[72px] xl:grid-cols-[286px_minmax(0,1fr)]">
          <motion.aside {...reveal} className="lg:sticky lg:top-5 lg:self-start">
            <div className="space-y-5">
              <AvatarTile />

              <div className="space-y-4">
                <div className="flex items-center gap-2.5 whitespace-nowrap">
                  <h1 className="whitespace-nowrap text-[28px] tracking-[-0.028em] text-ink sm:text-[38px] lg:text-[32px] xl:text-[38px]">
                    maxim zvarici
                  </h1>
                  <span
                    aria-label="Sound on"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-ink"
                  >
                    <SoundIcon />
                  </span>
                </div>

                <div className="flex items-center gap-x-[7px] gap-y-0 whitespace-nowrap text-[20px] tracking-[-0.025em] text-ink lg:text-[18px] xl:text-[20px]">
                  <span>20 yo</span>
                  <button
                    type="button"
                    aria-expanded={isMenuOpen}
                    aria-controls="discipline-menu"
                    onClick={() => setIsMenuOpen((current) => !current)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-[14px] border border-[#d6dbdf] bg-white px-[12px] py-[6px] text-left leading-none shadow-[0_1px_2px_rgba(15,23,32,0.05)] transition-colors duration-200 hover:border-[#bcc5cc]"
                  >
                    designer
                    <ChevronIcon open={isMenuOpen} />
                  </button>
                  <span className="whitespace-nowrap">based in chisinau</span>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    id="discipline-menu"
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-[312px] overflow-hidden rounded-[19px] border border-[#d9dee2] bg-white p-[8px] shadow-[0_1px_2px_rgba(15,23,32,0.05),0_12px_30px_rgba(15,23,32,0.04)] lg:max-w-[240px] xl:max-w-[312px]"
                  >
                    <ul className="space-y-[4px]">
                      {disciplines.map((item) => (
                        <li key={item.label}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDiscipline(item.key)
                              setActiveFilter(disciplineToFilter[item.key] ?? 'all')
                            }}
                            className={`flex w-full items-center justify-between rounded-[14px] px-[12px] py-[11px] text-left text-[19px] tracking-[-0.025em] transition-colors duration-200 lg:text-[17px] xl:text-[19px] ${
                              selectedDiscipline === item.key ? 'bg-[#eef1ed] text-ink' : 'text-ink'
                            }`}
                          >
                            <span className="max-w-[210px]">{item.label}</span>
                            {item.highlighted ? (
                              <span className="rounded-full bg-badge px-[9px] py-[5px] text-[12px] text-white">
                                new
                              </span>
                            ) : null}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.aside>

          <div className="space-y-16 lg:space-y-20">
            <motion.section {...reveal} id="work" className="space-y-5">
              <nav
                aria-label="Project categories"
                className="flex flex-wrap gap-x-5 gap-y-3 pl-[2px] text-[19px] tracking-[-0.02em] text-muted lg:text-[17px] xl:text-[19px]"
              >
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => {
                      setActiveFilter(filter.key)
                      setSelectedDiscipline(filterToDiscipline[filter.key] ?? 'design-engineering')
                    }}
                    className={`transition-colors duration-300 ${
                      activeFilter === filter.key ? 'text-ink' : 'hover:text-ink'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </nav>

              {activeFilter === 'all' || activeFilter === 'engineering' ? (
                <div className="grid gap-[8px] sm:grid-cols-2">
                  {projects.map((project, index) => (
                    <motion.article
                      key={project.title}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.03,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`group flex min-h-[210px] flex-col justify-end overflow-hidden rounded-[17px] border border-[#d8dcdf] bg-gradient-to-br ${project.tone} p-[14px] shadow-[0_1px_2px_rgba(15,23,32,0.04)] transition-transform duration-300 hover:-translate-y-0.5 sm:min-h-[198px] lg:min-h-[198px]`}
                    >
                      <div className="mb-auto h-full rounded-[15px] border border-white/35 bg-white/10" />
                      <div className="space-y-1 pt-4 text-ink">
                        <h2 className="text-[18px] tracking-[-0.025em] lg:text-[17px] xl:text-[18px]">
                          {project.title}
                        </h2>
                        {project.category ? (
                          <p className="text-[14px] text-ink/85">{project.category}</p>
                        ) : null}
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <motion.div
                  key={selectedDiscipline}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[17px] border border-[#d8dcdf] bg-white px-5 py-6 text-ink shadow-[0_1px_2px_rgba(15,23,32,0.04)]"
                >
                  <h2 className="text-[20px] tracking-[-0.025em]">{selectedDetail?.title}</h2>
                  <p className="mt-3 max-w-2xl text-[15px] leading-[1.3] text-ink/75">
                    {selectedDetail?.body}
                  </p>
                </motion.div>
              )}
            </motion.section>

            {sections.map((section) => (
              <motion.section
                key={section.id}
                {...reveal}
                id={section.id}
                className="grid gap-6 rounded-[24px] border border-line bg-white/80 p-6 shadow-[0_1px_2px_rgba(15,23,32,0.04)] backdrop-blur-sm sm:p-8 lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-10"
              >
                <p className="text-sm uppercase tracking-[0.08em] text-muted">
                  {section.eyebrow}
                </p>
                <div className="space-y-6">
                  <h3 className="max-w-3xl text-[28px] leading-[0.98] tracking-[-0.035em] text-ink sm:text-[38px] lg:text-[48px]">
                    {section.title}
                  </h3>
                  <p className="max-w-2xl text-[17px] leading-[1.25] tracking-[-0.02em] text-muted sm:text-[18px]">
                    {section.body}
                  </p>

                  {section.id === 'contact' ? (
                    <div className="flex flex-wrap gap-3 pt-2 text-[17px] text-ink">
                      <a
                        className="rounded-full border border-line bg-canvas px-4 py-3 transition-colors duration-300 hover:border-ink/20"
                        href="mailto:maxim@example.com"
                      >
                        maxim@example.com
                      </a>
                      <a
                        className="rounded-full border border-line bg-canvas px-4 py-3 transition-colors duration-300 hover:border-ink/20"
                        href="https://dribbble.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        dribbble
                      </a>
                      <a
                        className="rounded-full border border-line bg-canvas px-4 py-3 transition-colors duration-300 hover:border-ink/20"
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        linkedin
                      </a>
                    </div>
                  ) : null}
                </div>
              </motion.section>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
