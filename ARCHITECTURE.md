# Architecture

Single-page portfolio site for Vipul Badwaik. Next.js (App Router) exported as a static site.

## Stack

- **Framework**: Next.js 16 (App Router), static export (`output: 'export'` in [next.config.mjs](next.config.mjs)) — no server runtime at deploy time, all pages are pre-rendered HTML.
- **UI**: React 19, Tailwind CSS 4 (via `@tailwindcss/postcss`), `clsx` + `tailwind-merge` (see [src/lib/utils.js](src/lib/utils.js) `cn()` helper).
- **Animation**: Framer Motion (fades, stagger) and GSAP (chatbot bubble float/pulse, timeline glow).
- **Icons**: `lucide-react`, `@icons-pack/react-simple-icons`.
- **Lint**: ESLint 9 flat config ([eslint.config.js](eslint.config.js)).

## Directory layout

```
src/
  app/
    layout.js        Root layout: fonts, metadata/SEO, GA + Clarity scripts, JSON-LD person schema
    page.js           The entire single-page site (hero, about, skills, experience, education, contact)
    globals.css       Tailwind entry + custom CSS (grid pattern, shimmer, glow, etc.)
    api/
      contact/        Reserved for a future contact API route (currently empty; form posts directly to Web3Forms)
  components/         Presentational + interactive React components (see below)
  data/
    portfolioData.js  Single source of truth for skills, experience, projects, education, socials
  lib/
    chatEngine.js      Client-side rule-based chatbot intent matcher (no external LLM/API call)
    utils.js           `cn()` class-merging helper
  assets/              Static SVGs bundled through the build
public/                Static files served as-is (favicons, og-image, avatar, manifest, robots.txt, sitemap.xml)
scripts/
  generate-assets.mjs  Image/asset generation script (sharp), run manually/offline
```

## Component map ([src/components/](src/components/))

- **Header.jsx** — sticky top nav, section-scroll links, mobile menu.
- **HeroAvatar.jsx** — animated avatar in the hero section.
- **HeroTagline.jsx** — GSAP-driven typewriter that types/deletes through a looping list of role phrases with a blinking cursor; skips to static text under `prefers-reduced-motion`/low-end devices.
- **Section.jsx** — generic titled section wrapper (icon + heading + content) used by every page section.
- **FadeIn.jsx** — Framer Motion wrapper for scroll/entry fade animations.
- **StaggerChildren.jsx** — `StaggerContainer`/`StaggerItem` pair for staggered list/child animations.
- **TimelineDot.jsx** — dot marker for the experience timeline.
- **ExperienceTimeline.jsx** — wraps the Experience list; renders a static track + a Framer Motion `scaleY` fill line driven by `useScroll`/`useSpring`, so the rail visually fills as the section scrolls into view (replaces the old always-on gradient line).
- **ExperienceCard.jsx** — per-role card (company emoji badge, tech tags, "Current" pill, staggered bullet list) with a Framer Motion hover lift.
- **SkillCloud.jsx** — renders `skills` from `portfolioData.js` grouped into categories (Languages, Frontend, Backend, Tools & Cloud) as staggered icon+label chips.
- **ContactForm.jsx** — client form; POSTs directly to Web3Forms (`https://api.web3forms.com/submit`) using `NEXT_PUBLIC_WEB3FORMS_KEY`. No backend involved.
- **Chatbot.jsx** — floating chat widget (GSAP-animated bubble + panel). Calls `getResponse()` from `chatEngine.js` for replies; entirely client-side, no network call.
- **ScrollRevealGSAP.jsx**, **SmoothScroll.jsx** — GSAP-based scroll utilities (in progress / newly added).

## Data flow

1. **Content**: `src/data/portfolioData.js` exports `skills`, `experience`, `projects`, `education`, `socials`. `page.js` imports this directly and maps over it to render sections. Editing content = editing this file only; no CMS.
2. **Chatbot**: `Chatbot.jsx` (client component) holds message state → calls `chatEngine.getResponse(input)` → `chatEngine.js` derives its knowledge strings from the same `portfolioData.js` at import time (`skillsList`, `currentRole`, `projectNames`, etc.), matches user input against `intents[]` (keyword/pattern/fuzzy match), and returns a templated string + follow-up suggestions. Nothing leaves the browser.
3. **Contact form**: form fields → `FormData` → direct fetch to Web3Forms' public API with an access key embedded via env var. No custom backend endpoint is used today, even though `src/app/api/contact/` exists as a placeholder directory for a future server-side route.
4. **SEO/meta**: all static, defined once in `layout.js` (Open Graph, Twitter card, JSON-LD `Person` schema, sitemap/robots in `public/`).

## Build & deploy

- `npm run dev` — Next dev server.
- `npm run build` — static export to `out/` (see `out/` in repo — build artifact, not hand-edited).
- `dist/` — leftover artifact from an earlier Vite-based setup; not part of the current Next.js build pipeline.
- No API routes are actually invoked at runtime since `output: 'export'` disables the Next.js server; `src/app/api/` is inert under static export unless the export config changes.

## Conventions for making changes

- Content edits (bio, skills, jobs, projects, education, socials) → only touch [src/data/portfolioData.js](src/data/portfolioData.js).
- New page sections → add a `<Section>` block in [src/app/page.js](src/app/page.js), wrapped in `<FadeIn>`/`<StaggerContainer>` per existing pattern.
- New animated component → prefer Framer Motion for enter/scroll transitions (already used throughout) and GSAP only for continuous/timeline-driven effects (as in `Chatbot.jsx`, `HeroAvatar.jsx`).
- Chatbot knowledge/answers → edit `intents` in [src/lib/chatEngine.js](src/lib/chatEngine.js); it auto-picks up data changes from `portfolioData.js` since it imports from there.
- Styling → Tailwind utility classes; shared one-off effects (grid pattern, shimmer, glow, pulse-dot) live in `src/app/globals.css`.
