import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'motion/react'
import headshot from '../assets/Abrar_headshot.jpg'

type Greeting = {
  lang: string
  word: string
  rtl?: boolean
}

const GREETINGS: Greeting[] = [
  { lang: 'English', word: 'Hello' },
  { lang: 'Mandarin', word: '你好' },
  { lang: 'Hindi', word: 'नमस्ते' },
  { lang: 'Urdu', word: 'سلام', rtl: true },
  { lang: 'Bengali', word: 'হ্যালো' },
  { lang: 'Arabic', word: 'مرحبا', rtl: true },
  { lang: 'Spanish', word: 'Hola' },
  // { lang: 'French', word: 'Bonjour' },
]

const GREETING_INTERVAL_MS = 2000

function CyclingGreeting() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % GREETINGS.length)
    }, GREETING_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="inline-grid align-baseline">
      {GREETINGS.map((greeting, i) => (
        <motion.span
          key={greeting.lang}
          dir={greeting.rtl ? 'rtl' : undefined}
          aria-hidden={i !== index}
          className="col-start-1 row-start-1"
          animate={{
            opacity: i === index ? 1 : 0,
            y: i === index ? 0 : 8,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {greeting.word}
        </motion.span>
      ))}
    </span>
  )
}

function HangingPhotoCard() {
  const x = useMotionValue(0)
  const rotateY = useTransform(x, [-100, 100], [-20, 20])

  return (
    <motion.div
      className="relative flex flex-col items-center"
      style={{ perspective: 800 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* cable + clip */}
      <div className="h-16 w-0.5 bg-neutral-300" />
      <div className="-mt-1 mb-2 h-3 w-3 rounded-full border-2 border-neutral-400 bg-neutral-100" />

      {/* draggable tilting card */}
      <motion.div
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.6}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
        style={{ x, rotateY, transformOrigin: 'top center' }}
        className="w-56 cursor-grab overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl active:cursor-grabbing"
      >
        <div className="h-2 w-full bg-orange-500" />
        <div className="aspect-3/4 w-full overflow-hidden bg-neutral-100">
          <img
            src={headshot}
            alt="Abrar"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="h-full w-full object-cover [-webkit-user-drag:none] select-none"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex w-full flex-col items-center justify-center gap-16 px-6 py-24 md:min-h-[70vh] md:flex-row md:items-center md:justify-between md:gap-8 md:px-10.5"
    >
      <div className="max-w-xl text-center md:text-left">
        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-600">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Available for work
        </span>

        <h1 className="mt-6 text-[clamp(2rem,1.25rem+3vw,4rem)] font-bold tracking-tight text-neutral-900">
          <CyclingGreeting /> I&apos;m Abrar <span aria-hidden>👋</span>
        </h1>
        <h2 className="mt-2 text-[clamp(1.25rem,1rem+1vw,1.875rem)] text-neutral-500">
          Software Developer
        </h2>

        <p className="mt-6 text-[clamp(0.9375rem,0.875rem+0.3vw,1rem)] text-neutral-600">
          Software developer based in Dhaka. Web or app, my focus stays the
          same — turn an idea into something people can actually use.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
          {/* TODO: add CV link */}
          <a
            href="#"
            className="rounded-full border border-[#d6d0c8] px-4 py-2.5 text-[clamp(0.9375rem,0.875rem+0.3vw,1rem)] font-medium text-[#3d3d3d] transition-colors hover:text-[#ff5c00]"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-[#d6d0c8] bg-white p-2 pr-4 text-[clamp(0.9375rem,0.875rem+0.3vw,1rem)] font-medium text-[#3d3d3d] shadow-[0_0.5px_4px_rgba(0,0,0,0.15)] transition-colors hover:text-[#ff5c00]"
          >
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-[#ff5c00]">
              <span className="absolute h-2 w-2 rounded-full bg-[#ff5c00] transition-opacity duration-200 group-hover:opacity-0" />
              <svg
                className="absolute h-4 w-4 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
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
            Contact
          </a>
        </div>
      </div>

      <div className="hidden md:flex">
        <HangingPhotoCard />
      </div>
    </section>
  )
}
