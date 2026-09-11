import { motion } from 'motion/react'
import Divider from './layout/Divider'

type Project = {
  title: string
  duration: string
  year: string
  description: string
  // The reference template put a client name here. These are personal builds,
  // so this is the project's own name instead.
  project: string
  role: string
  // Full Tailwind class for the placeholder visual. Written out in full rather
  // than composed from pieces, because Tailwind only sees class names that
  // appear literally in the source.
  gradient: string
}

const PROJECTS: Project[] = [
  // TODO: replace with real project
  {
    title: 'An eCommerce storefront built end to end',
    duration: '6 Weeks',
    year: '2026',
    description:
      'A storefront with a product catalog, a persistent cart and a checkout flow, wired to a Node and MongoDB backend.',
    project: 'Storefront',
    role: 'Full-stack Developer',
    gradient: 'bg-[linear-gradient(135deg,#ffe9d6_0%,#ffc89a_100%)]',
  },
  // TODO: replace with real project
  {
    title: 'A marketplace platform for buyers and sellers',
    duration: '8 Weeks',
    year: '2026',
    description:
      'Listings, accounts and direct messaging between users, with the API, auth and data model as the main focus.',
    project: 'Marketplace',
    role: 'Backend Developer',
    gradient: 'bg-[linear-gradient(135deg,#efe7dc_0%,#d5c3aa_100%)]',
  },
  // TODO: replace with real project
  {
    title: 'A science-learning platform built around physics',
    duration: '5 Weeks',
    year: '2026',
    description:
      'Lessons you work through rather than read, with the interface doing the explaining alongside the text.',
    project: 'Physics Lab',
    role: 'Frontend Developer',
    gradient: 'bg-[linear-gradient(135deg,#e6e9f5_0%,#bfc9e6_100%)]',
  },
  // TODO: replace with real project
  {
    title: 'An interactive playground for physics simulations',
    duration: '3 Weeks',
    year: '2026',
    description:
      'Canvas-based simulations you can tweak live to see how changing the variables changes the result.',
    project: 'Sandbox',
    role: 'Frontend Developer',
    gradient: 'bg-[linear-gradient(135deg,#f3e6ef_0%,#dcc0d6_100%)]',
  },
]

// Same entrance as About, so the sections feel like one system.
const FADE_UP = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
}

// 'wide' cards put the visual beside the text on desktop; 'tall' cards keep it
// stacked at every width. All three collapse to one column on mobile.
type CardLayout = 'wide-text-left' | 'wide-text-right' | 'tall'

// TODO: replace with a real screenshot once these projects exist. Deliberately
// abstract for now, since a realistic-looking screenshot of a product that
// doesn't exist yet would read as real work.
function PlaceholderVisual({
  gradient,
  wide,
}: {
  gradient: string
  wide: boolean
}) {
  return (
    <div
      aria-hidden
      className={[
        gradient,
        // On desktop a wide card's visual stretches to whatever height the text
        // needs, so the fixed aspect ratio is dropped there.
        wide
          ? 'aspect-4/3 w-full md:aspect-auto md:w-1/2 md:self-stretch'
          : 'aspect-16/10 w-full',
      ].join(' ')}
    />
  )
}

// Decorative only. The cards are not links yet, so this must not be a button or
// an anchor yet either, or it promises a click target that does not exist.
function ArrowBadge() {
  return (
    <span
      aria-hidden
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d6d0c8] bg-white"
    >
      <span className="flex h-9.75 w-9.75 items-center justify-center rounded-full bg-[#ff5c00]">
        <svg
          className="h-4.5 w-4.5 text-white"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M9 3.333 13.667 8 9 12.667M2.333 8h11"
            stroke="currentColor"
            strokeWidth="1.33"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  )
}

function ProjectCard({
  project,
  layout,
  index,
}: {
  project: Project
  layout: CardLayout
  index: number
}) {
  const wide = layout !== 'tall'

  return (
    <motion.article
      {...FADE_UP}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: Math.min(index * 0.08, 0.24),
      }}
      // The lift has to come from Motion, not a Tailwind hover: class. Motion
      // writes an inline transform on this element, and an inline style always
      // beats a class, so hover:-translate-y-1 would silently do nothing. The
      // shadow is not a transform, so that one stays in Tailwind.
      whileHover={{ y: -4 }}
      className={[
        'flex h-full flex-col gap-6 overflow-hidden rounded-3xl bg-white shadow-[0_2px_6px_rgba(0,0,0,0.15)]',
        'transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]',
        // The visual is always first in the DOM so the mobile stack puts it on
        // top with no ordering utilities. Reversing the row is what moves the
        // text to the left on desktop.
        layout === 'wide-text-left' ? 'md:flex-row-reverse' : '',
        layout === 'wide-text-right' ? 'md:flex-row' : '',
      ].join(' ')}
    >
      <PlaceholderVisual gradient={project.gradient} wide={wide} />

      <div
        className={[
          'flex flex-1 flex-col gap-3 px-6 pb-6',
          // No padding on the edge facing the visual: the card's own gap-6
          // already separates them.
          wide ? 'md:justify-center md:py-8' : '',
          layout === 'wide-text-left' ? 'md:pr-0 md:pl-6' : '',
          layout === 'wide-text-right' ? 'md:pr-6 md:pl-0' : '',
        ].join(' ')}
      >
        {/* Solved against the reference's two measured sizes: 18px at 390px
            wide and 26px from about 1400px up. */}
        <h3 className="text-[clamp(1.125rem,0.93rem+0.79vw,1.625rem)] leading-[1.2] font-medium text-[#1a1a1a]">
          {project.title}
        </h3>

        <ul className="flex flex-wrap gap-2.5">
          {[project.duration, project.year].map((meta) => (
            <li
              key={meta}
              className="rounded-full bg-[#f0ede8] px-2 py-1 text-[0.75rem] leading-[1.2] text-[#3d3d3d]"
            >
              {meta}
            </li>
          ))}
        </ul>

        <p className="text-[clamp(0.9375rem,0.875rem+0.3vw,1rem)] leading-normal text-[#7a7a7a]">
          {project.description}
        </p>

        {/* mt-auto pushes the rule and footer to the bottom, so the two
            side-by-side tall cards line their footers up even when their
            descriptions run to different lengths. */}
        <div className="mt-auto pt-1">
          <Divider />
        </div>

        <div className="flex items-center gap-3">
          {/* TODO: replace with the real project logo */}
          <span
            aria-hidden
            className="h-11.5 w-11.5 shrink-0 rounded-lg bg-[#faf9f7] p-0.5"
          >
            <span
              className={`block h-full w-full rounded-md ${project.gradient}`}
            />
          </span>

          <div className="flex-1">
            <p className="text-[clamp(0.9375rem,0.875rem+0.3vw,1rem)] leading-normal font-medium text-[#3d3d3d]">
              {project.project}
            </p>
            <p className="text-[clamp(0.9375rem,0.875rem+0.3vw,1rem)] leading-normal text-[#7a7a7a]">
              {project.role}
            </p>
          </div>

          <ArrowBadge />
        </div>
      </div>
    </motion.article>
  )
}

export default function FeaturedWork() {
  const [first, second, third, fourth] = PROJECTS

  return (
    <section id="work" className="w-full px-6 py-10.5 md:px-10.5 md:py-30">
      <motion.div {...FADE_UP} transition={{ duration: 0.4, ease: 'easeOut' }}>
        <p className="text-[clamp(1rem,0.85rem+0.6vw,1.375rem)] leading-[1.2] font-medium text-[#ff5c00]">
          // Featured works
        </p>
        <h2 className="mt-1 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.2] font-bold text-[#3d3d3d]">
          The things I&apos;m building to learn with
        </h2>
      </motion.div>

      {/* Three rows: one wide card, a pair of tall cards, then a wide card
          mirrored the other way. */}
      <div className="mt-8 flex flex-col gap-8 md:mt-16">
        <ProjectCard project={first} layout="wide-text-left" index={0} />

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1">
            <ProjectCard project={second} layout="tall" index={1} />
          </div>
          <div className="flex-1">
            <ProjectCard project={third} layout="tall" index={2} />
          </div>
        </div>

        <ProjectCard project={fourth} layout="wide-text-right" index={3} />
      </div>
    </section>
  )
}
