# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Goal

Personal portfolio for a web development student. Rebuilding the structure,
layout, and animation feel of this Framer template as custom code:
https://syyedabrar.framer.website/
Aim: a close visual clone of the reference in structure and style, but with
my own content — not the template's example content.

## Project status

This is a personal portfolio site, currently just the default Vite React+TypeScript template scaffolding (`App.tsx` renders only "Hello world"). Despite the parent folder name (`MERN_STACK_CIT`), there is no backend/Express/MongoDB code in this repo yet — it is a frontend-only Vite project. Not a git repository yet.

## Sections (adapted from the reference)

- Hero
- About me
- Featured work / projects — no real projects yet. Use simple, generic
  dummy content so the layout looks finished while we build (e.g. "Project
  One", "A short description of what this project does and what it's built
  with"). Keep it plainly generic — no invented client names, fake metrics,
  or specific achievements dressed up as real. Mark each with a code comment
  like `// TODO: replace with real project` so they're easy to find later.
- Stacks & experience / timeline — adapt to education + learning journey,
  not a job/client history
- Services — reframe around web-dev skills, not a freelance offer
- Contact — replace the reference's pricing/"hire me" retainer section AND
  client testimonials entirely with a simple contact CTA. No fake
  testimonials anywhere on the site.

## Working style

- Build section by section: propose one section's component, show the code,
  wait for my feedback before starting the next
- Generic dummy filler (see above) is fine for layout purposes, but never
  invent content that reads as a real fact about me or a real client (bios,
  testimonials, job history, specific project outcomes)
- One section = one component, keep files small
- Briefly explain non-obvious technical choices as you make them — I'm
  learning React/Tailwind/Motion as I go
- Default to a single-page layout for now (no separate routed pages for
  individual case studies) unless I ask for that later

## Commands

- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — type-check via `tsc -b` (project references across `tsconfig.app.json` / `tsconfig.node.json`), then build with Vite.
- `npm run lint` — run ESLint over the project.
- `npm run preview` — preview the production build locally.

There is no test setup/runner configured in this repo yet.

## Architecture

- Build tool: Vite (`vite.config.ts`), plugins are `@vitejs/plugin-react` and `@tailwindcss/vite`.
- Styling: Tailwind CSS v4, imported via a single `@import "tailwindcss";` in `src/index.css` (no `tailwind.config.js` — v4 uses the Vite plugin instead of a JS config file). Tailwind utility classes are used directly in JSX (e.g. `className='text-red-700'`).
- Animation: the `motion` package (Framer Motion's successor) is a dependency for future animation work.
- TypeScript: split config — `tsconfig.json` is a references-only root, `tsconfig.app.json` covers `src/` (bundler module resolution, `noEmit`, strict unused-locals/params checks, `erasableSyntaxOnly`), `tsconfig.node.json` covers Vite config tooling.
- ESLint: flat config (`eslint.config.js`) using `typescript-eslint` recommended rules plus `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` (Vite-specific). Type-aware linting is not enabled by default.
- Entry point: `index.html` → `src/main.tsx` mounts `<App />` from `src/App.tsx` into `#root` inside `StrictMode`.
- Static assets served as-is live in `public/` (e.g. `favicon.svg`, `icons.svg`); imported/bundled assets live in `src/assets/`.

## Design system conventions

These are established patterns from building the Hero section. Reuse
them for every subsequent section — don't reinvent or re-decide these
per-section.

### Borders & dividers

- The whole page sits inside a thin bordered frame — a border on both
  the left and right edges of the entire site.
- Each section is followed by a thin horizontal divider.
- Both come from the shared layout wrapper / Divider component built
  for Hero. Use that component for every new section's divider rather
  than writing one-off border styles.

### Responsive text sizing

- All text sizes use rem units with clamp() (not fixed px), anchored
  to the reference site's desktop size as the clamp's maximum.
- Do NOT estimate or guess font sizes from a screenshot. Before sizing
  any text element in a new section, use Playwright MCP to open
  https://syyedabrar.framer.website/ and read the actual computed
  font-size (in px) for the equivalent element in the reference, then
  convert that to the clamp()/rem pattern already used in Hero.
- If a new section introduces a text style with no clear equivalent in
  Hero (e.g. a new heading level), still pull the real computed value
  from the reference rather than approximating.
