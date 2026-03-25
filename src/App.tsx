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
  { title: '15mins', category: 'design engineering' },
  { title: 'Plum Wallet' },
  { title: 'Cardneto' },
  { title: 'my explorations' },
  { title: 'plateus' },
  { title: 'Toolbar' },
  { title: 'joan holloway' },
  { title: 'La Mama Catita' },
]

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
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
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
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
    <div className="relative h-[64px] w-[64px] overflow-hidden rounded-[14px] border border-[#d6d7d8] bg-[#d8e0d7]">
      {!imageMissing ? (
        <img
          src="/images/profile-avatar.png"
          alt="Portrait of Maxim Zvarici"
          className="h-full w-full object-cover"
          onError={() => setImageMissing(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[18px] text-[#2d513f]">mz</div>
      )}
    </div>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedDiscipline, setSelectedDiscipline] = useState('design-engineering')

  return (
    <main className="px-4 pb-10 pt-12 sm:px-8 lg:px-10">
      <div className="mx-auto w-full lg:max-w-[60vw]">
        <section className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:pt-2">
            <AvatarTile />

            <div className="mt-5">
              <div className="flex items-center gap-2">
                <h1 className="text-[44px] leading-none tracking-[-0.03em] text-ink lg:text-[46px]">
                  maxim zvarici
                </h1>
                <SoundIcon />
              </div>

              <div className="mt-4 flex items-center gap-2 text-[36px] tracking-[-0.03em] text-ink lg:text-[38px]">
                <span>20 yo</span>
                <button
                  type="button"
                  aria-expanded={isMenuOpen}
                  aria-controls="discipline-menu"
                  onClick={() => setIsMenuOpen((current) => !current)}
                  className="inline-flex items-center gap-1 rounded-[12px] border border-[#cfd3d6] bg-[#f7f8f8] px-3 py-1 text-[33px] leading-none lg:text-[35px]"
                >
                  designer
                  <ChevronIcon open={isMenuOpen} />
                </button>
                <span>based in chisinau</span>
              </div>
            </div>

            {isMenuOpen ? (
              <div
                id="discipline-menu"
                className="mt-3 max-w-[272px] rounded-[16px] border border-[#d3d6d8] bg-[#f0f0f1] p-[8px]"
              >
                <ul className="space-y-[2px]">
                  {disciplines.map((item) => (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => setSelectedDiscipline(item.key)}
                        className={`flex w-full items-center justify-between rounded-[10px] px-2 py-1 text-left text-[39px] tracking-[-0.03em] ${
                          selectedDiscipline === item.key ? 'bg-[#dfe1e2] text-ink' : 'text-ink'
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.highlighted ? (
                          <span className="rounded-full bg-[#2c9964] px-2 py-[3px] text-[18px] text-white">
                            new
                          </span>
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <a
              href="mailto:maxim@example.com"
              className="mt-56 inline-flex items-center gap-28 text-[38px] tracking-[-0.02em] text-ink"
            >
              <span>email me</span>
              <span>›</span>
            </a>
          </aside>

          <section className="space-y-4 pt-16 lg:pt-[84px]">
            <nav aria-label="Project categories" className="flex flex-wrap gap-x-6 text-[39px] text-[#6f8090]">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={activeFilter === filter.key ? 'text-ink' : 'hover:text-ink'}
                >
                  {filter.label}
                </button>
              ))}
            </nav>

            <div className="grid gap-3 sm:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="flex min-h-[255px] flex-col justify-end rounded-[18px] border border-[#d5d7d8] bg-[#e8e8e9] p-4"
                >
                  <h2 className="text-[16px] text-ink">{project.title}</h2>
                  {project.category ? <p className="text-[16px] text-ink">{project.category}</p> : null}
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}

export default App
