import { motion } from 'motion/react'

// Ordered so the groups the list came in (frontend, then backend, then
// tooling) still read as clusters even without visible group labels.
const SKILLS: string[] = [
  'React',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Redux',
  'Zustand',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'Prisma',
  'Git',
  'GitHub',
  'Vite',
  'Vercel',
]

const BIO_PARAGRAPHS: string[] = [
  "I'm based in Dhaka, studying full-stack web development at Creative IT Institute, working mostly across the MERN stack.",
  "What keeps me interested is building things people can actually use. Right now I'm drawn to bigger ideas: eCommerce platforms, marketplaces, and a science-learning platform.",
  "Outside of code I'm into science, physics especially, which is a big part of why that learning-platform idea keeps coming back. I also lean on AI-assisted workflows to pick up unfamiliar tools quickly.",
]

// Shared entrance: fade up once as the section scrolls into view. Matches the
// 'easeOut' easing Hero already uses so the two sections feel related.
const FADE_UP = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
}

export default function About() {
  return (
    <section
      id="about"
      className="w-full px-6 py-10.5 md:px-10.5 md:py-30"
    >
      <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
        {/* self-start is required for sticky to work inside a grid item */}
        <motion.div
          {...FADE_UP}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="self-start md:sticky md:top-24"
        >
          <p className="text-[clamp(1rem,0.85rem+0.6vw,1.375rem)] leading-[1.2] font-medium text-[#ff5c00]">
            // About me
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.2] font-bold text-[#3d3d3d]">
            Still learning, already building
          </h2>
        </motion.div>

        <motion.div
          {...FADE_UP}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="space-y-5">
            {BIO_PARAGRAPHS.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[clamp(0.9375rem,0.875rem+0.3vw,1rem)] leading-normal text-[#3d3d3d]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-[0.75rem] text-[#7a7a7a]">What I work with</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SKILLS.map((skill, i) => (
                <motion.li
                  key={skill}
                  {...FADE_UP}
                  transition={{
                    duration: 0.4,
                    ease: 'easeOut',
                    // Capped so a longer list never crawls in.
                    delay: Math.min(i * 0.03, 0.3),
                  }}
                  className="rounded-full border border-[#d6d0c8] px-3 py-1 text-sm text-[#3d3d3d]"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
