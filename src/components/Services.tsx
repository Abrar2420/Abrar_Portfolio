import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'motion/react'
import Divider from './layout/Divider'

type Service = {
  title: string
  description: string
  stack: string[]
  // Full Tailwind class for the placeholder preview, written out literally —
  // Tailwind only sees class names that appear verbatim in the source.
  gradient: string
}

const SERVICES: Service[] = [
  // TODO: replace each preview with a real screenshot of that kind of work
  {
    title: 'Frontend Development (React & TypeScript)',
    description:
      'Building responsive, accessible interfaces with clean, reusable components.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    gradient: 'bg-[linear-gradient(140deg,#ffe9d6_0%,#ffc89a_100%)]',
  },
  {
    title: 'Full-Stack Web Applications',
    description:
      'Connecting frontend and backend into complete, working products.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    gradient: 'bg-[linear-gradient(140deg,#efe7dc_0%,#d5c3aa_100%)]',
  },
  {
    title: 'REST API & Backend Development',
    description:
      'Designing reliable APIs and server logic that scale with your data.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    gradient: 'bg-[linear-gradient(140deg,#e6e9f5_0%,#bfc9e6_100%)]',
  },
  {
    title: 'Database Design & Integration',
    description:
      'Structuring data models that keep your app fast and consistent.',
    stack: ['PostgreSQL', 'MongoDB', 'Prisma'],
    gradient: 'bg-[linear-gradient(140deg,#e3efe8_0%,#b6d4c3_100%)]',
  },
  {
    title: 'UI Animation & Interaction',
    description:
      'Adding motion and micro-interactions that make interfaces feel alive.',
    stack: ['Framer Motion', 'Tailwind CSS', 'React'],
    gradient: 'bg-[linear-gradient(140deg,#f3e6ef_0%,#dcc0d6_100%)]',
  },
]

// Same entrance as About and FeaturedWork.
const FADE_UP = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
}

// Matches the reference's floating preview: 200x250, a 4:5 portrait card.
const PREVIEW_W = 200
const PREVIEW_H = 250

// TODO: replace with a real screenshot. Deliberately abstract — a realistic
// looking screenshot of work that doesn't exist yet would read as real.
function PlaceholderPreview({ gradient }: { gradient: string }) {
  return (
    <div className={`flex h-full w-full flex-col gap-2 p-4 ${gradient}`}>
      {/* Bare wireframe bars, so it stays obvious this is a stand-in. */}
      <div className="h-3 w-1/2 rounded-full bg-white/85" />
      <div className="h-2 w-3/4 rounded-full bg-white/65" />
      <div className="mt-1 flex-1 rounded-md border border-white/80 bg-white/35" />
      <div className="h-2 w-2/3 rounded-full bg-white/65" />
    </div>
  )
}

/**
 * The floating preview. One fixed-position card serves the whole list: it sits
 * parked at the viewport's top-left corner and is moved with a transform,
 * which is exactly what the reference does.
 *
 * Two details worth knowing:
 *
 * - clientX/clientY (not pageX/pageY) because the card is position:fixed, so
 *   its coordinate space is the viewport, not the document.
 * - The follow is split across two elements. The outer one carries the spring
 *   chasing the cursor; the inner one carries the -50% centering offset plus
 *   the fade and tilt. They can't share one element: Motion composes x, y,
 *   scale and rotate into a single transform, so the entrance animation would
 *   fight the position being rewritten every frame.
 */
function CursorPreview({
  service,
  x,
  y,
}: {
  service: Service | null
  x: MotionValue<number>
  y: MotionValue<number>
}) {
  return (
    <motion.div
      aria-hidden
      // Hidden below md: there is no cursor to follow on a touch screen.
      className="pointer-events-none fixed top-0 left-0 z-40 hidden md:block"
      style={{ x, y }}
    >
      <AnimatePresence>
        {service && (
          // Keyed by title so moving between rows crossfades the two previews
          // instead of swapping the image instantly.
          <motion.div
            key={service.title}
            style={{ x: '-50%', y: '-50%', width: PREVIEW_W, height: PREVIEW_H }}
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute overflow-hidden rounded-lg border-[1.5px] border-white bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          >
            <PlaceholderPreview gradient={service.gradient} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * The plus that morphs into a minus. Two 12x1 bars crossed in a 24px circle:
 * the horizontal one never moves, and the vertical one rotates a quarter turn
 * on open so it lies flat on top of the other, leaving a minus. The whole icon
 * also turns 180deg, which is the spin the reference does as it morphs.
 */
function ToggleIcon({ open, hovered }: { open: boolean; hovered: boolean }) {
  return (
    <motion.span
      aria-hidden
      // The reference nudges the icon 4px left while the text moves 4px right,
      // so the row looks like it opens up from the middle.
      animate={{ x: hovered ? -4 : 0, rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white"
    >
      <span className="absolute h-px w-3 bg-[#ff5c00]" />
      <motion.span
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="absolute h-3 w-px bg-[#ff5c00]"
      />
    </motion.span>
  )
}

// The reference separates stack items with a four-pointed star (U+2726) in the
// accent orange. aria-hidden so it isn't announced between each item.
function StackList({ stack }: { stack: string[] }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {stack.map((tech, i) => (
        <span key={tech} className="contents">
          {i > 0 && (
            <span aria-hidden className="text-sm text-[#ff5c00]">
              ✦
            </span>
          )}
          {/* 14px in the reference at desktop. Left fixed rather than clamped:
              it matches the skill pills in About, which are the same kind of
              list, and the reference's mobile accordion wouldn't open for
              measurement. */}
          <span className="text-sm font-medium text-[#3d3d3d]">{tech}</span>
        </span>
      ))}
    </p>
  )
}

function ServiceRow({
  service,
  index,
  open,
  hovered,
  onToggle,
  onHoverChange,
}: {
  service: Service
  index: number
  open: boolean
  hovered: boolean
  onToggle: () => void
  onHoverChange: (hovered: boolean) => void
}) {
  const panelId = `service-panel-${index}`

  return (
    <motion.li
      {...FADE_UP}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: Math.min(index * 0.06, 0.24),
      }}
      // Visibility of the floating preview is per row, not per section: leaving
      // a row upward from the first or downward from the last has to hide it
      // just as promptly as moving between two rows does.
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {/* The heading wraps the button rather than the other way round — the
          standard accordion pattern, so the row is still a heading in the
          document outline while the whole row stays clickable. */}
      <h3 className="text-[clamp(1.125rem,0.94rem+0.76vw,1.625rem)] leading-[1.2] font-medium text-[#1a1a1a]">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-4.5 text-left"
        >
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {index + 1}. {service.title}
          </motion.span>

          <ToggleIcon open={open} hovered={hovered} />
        </button>
      </h3>

      {/* Opening is a CSS grid-row transition rather than a Motion one. You
          can't transition height to 'auto' in CSS, but you can transition a
          grid row between 0fr and 1fr, and 1fr resolves to the content's real
          height — so nothing has to be measured. The panel also stays in the
          DOM this way, which is what aria-controls needs to point at, and it
          is hidden from assistive tech with aria-hidden while collapsed.
          The inner overflow-hidden div does the clipping; the grid parent
          can't clip the row itself. */}
      <div
        id={panelId}
        aria-hidden={!open}
        // Both properties are named explicitly rather than using
        // transition-all, so the grid row is definitely transitioned and
        // nothing else on the panel picks up an unintended 300ms delay.
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {/* 44px right inset in the reference, so the text never runs under
              the toggle icon. */}
          <div className="flex flex-col gap-1 pr-11 pb-4.5">
            <StackList stack={service.stack} />
            <p className="text-[clamp(0.9375rem,0.875rem+0.3vw,1rem)] leading-normal text-[#7a7a7a]">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      <Divider />
    </motion.li>
  )
}

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null)
  // One row open at a time, the usual accordion behaviour. Swap for a Set if
  // several should be able to stay open at once.
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  // The spring is what makes the card trail the cursor rather than snap to it.
  const springConfig = { stiffness: 350, damping: 30, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  return (
    <section
      id="services"
      className="w-full px-6 py-10.5 md:px-10.5 md:py-30"
      // Tracking stays on the section so the card is already in the right place
      // the moment the cursor crosses into a row. Whether it is *visible* is
      // decided per row, in ServiceRow.
      onMouseMove={(e) => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      }}
    >
      <motion.div {...FADE_UP} transition={{ duration: 0.4, ease: 'easeOut' }}>
        <p className="text-[clamp(1rem,0.85rem+0.6vw,1.375rem)] leading-[1.2] font-medium text-[#ff5c00]">
          // Services I provide
        </p>
        <h2 className="mt-1 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.2] font-bold text-[#3d3d3d]">
          What I can build for you
        </h2>
      </motion.div>

      <ul className="mt-8 md:mt-16">
        {SERVICES.map((service, i) => (
          <ServiceRow
            key={service.title}
            service={service}
            index={i}
            open={openIndex === i}
            hovered={hovered === i}
            onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
            onHoverChange={(isHovered) =>
              // The guard matters when moving between two adjacent rows: the
              // leaving row's handler runs after the entering row's, and
              // without it that stale 'false' would wipe the new hover.
              setHovered((prev) => (isHovered ? i : prev === i ? null : prev))
            }
          />
        ))}
      </ul>

      <CursorPreview
        service={hovered === null ? null : SERVICES[hovered]}
        x={x}
        y={y}
      />
    </section>
  )
}
