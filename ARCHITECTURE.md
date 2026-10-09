# Architecture

Single-page portfolio site for Vipul Badwaik. Next.js (App Router) on Vercel; pages are statically pre-rendered, one serverless API route handles the contact form.

## Stack

- **Framework**: Next.js 16 (App Router), no `output: 'export'` (removed so API routes work) — pages are still pre-rendered static HTML; only `/api/contact` runs as a serverless function.
- **UI**: React 19, Tailwind CSS 4 (via `@tailwindcss/postcss`), `clsx` + `tailwind-merge` (see [src/lib/utils.js](src/lib/utils.js) `cn()` helper).
- **Animation**: Framer Motion (fades, stagger) and GSAP (chatbot bubble float/pulse, timeline glow).
- **Icons**: `lucide-react`, `@icons-pack/react-simple-icons`.
- **Lint**: ESLint 9 flat config ([eslint.config.js](eslint.config.js)).

## Directory layout

```
src/
  app/
    sitemap.js / robots.js   Generated /sitemap.xml and /robots.txt (blocks only /api/)
    layout.js        Root layout: fonts, metadata/SEO, GA + Clarity scripts, JSON-LD person schema
    page.js           The entire single-page site (hero, about, skills, experience, education, contact)
    globals.css       Tailwind entry + custom CSS (grid pattern, glow, etc.)
    api/
      contact/        route.js — POST handler that validates and emails via Resend
  components/         Presentational + interactive React components (see below)
  data/
    portfolioData.js  Single source of truth for skills, experience, projects, education, socials
  lib/
    astronaut.js       Mission loop + actions for the Astronaut and Rocket
    walker.js          Rig + random-activity engine for the bottom-of-screen Walker
    site.js            SITE_URL / title / description — single source for SEO values
    chatEngine.js      Local rule-based intent matcher — offline fallback when the AI route is unavailable
    knowledge.js       Builds the chatbot system prompt from portfolioData.js + extra resume facts
    utils.js           `cn()` class-merging helper
  assets/              Static SVGs bundled through the build
public/                Static files served as-is (favicons, og-image, avatar, manifest, logos)
scripts/
  generate-assets.mjs  Image/asset generation script (sharp), run manually/offline
```

## Component map ([src/components/](src/components/))

- **Header.jsx** — sticky top nav, section-scroll links, mobile menu.
- **Astronaut.jsx** + `lib/astronaut.js` — decorative fixed-position astronaut + rocket (inline SVG, separate arm/leg/head groups). A GSAP `async` mission loop: wave on the ground → board the rocket → launch to a random sky spot → step out and float around it doing random actions (wave, flip, look around, nap/zZ, dance, jetpack dash) → board again → rocket lands on the ground (dust puffs) → step out → repeat. Legs/arms paddle ambiently. The whole mission stays inside ONE side gutter (left or right of the 768px content column, picked randomly at load) so it never covers page content; only mounted when the viewport is ≥1080px wide (`matchMedia`), and skipped under reduced-motion/low-end devices.
- **Walker.jsx** + `lib/walker.js` — decorative fixed-to-viewport-bottom person (inline SVG, jointed rig drawn from joint angles each frame) who strolls and randomly waves, jumps, stretches, dances, idles, sits on the ground with a phone, or rides a bicycle (two-bone IK keeps his legs on the pedals and hands on the handlebars). Plain `requestAnimationFrame` engine; poses are blended toward per-action target poses. Skipped under reduced-motion/low-end devices; keeps clear of the chat bubble.
- **HeroName.jsx** — hero heading with per-letter reveal (Framer Motion, reduced-motion aware).
- **HeroAvatar.jsx** — hero avatar: single clipped rotating conic-gradient border (`.avatar-ring`), soft accent glow, gentle float.
- **HeroTagline.jsx** — GSAP-driven typewriter that types/deletes through a looping list of role phrases with a blinking cursor; skips to static text under `prefers-reduced-motion`/low-end devices.
- **Section.jsx** — generic titled section wrapper (icon + heading + content) used by every page section.
- **FadeIn.jsx** — Framer Motion wrapper for scroll/entry fade animations.
- **StaggerChildren.jsx** — `StaggerContainer`/`StaggerItem` pair for staggered list/child animations.
- **TimelineDot.jsx** — dot marker for the experience timeline.
- **ExperienceTimeline.jsx** — wraps the Experience list; renders a static track + a Framer Motion `scaleY` fill line driven by `useScroll`/`useSpring`, so the rail visually fills as the section scrolls into view (replaces the old always-on gradient line).
- **ExperienceCard.jsx** — per-role card (Lucide company icon badge, tech tags from `portfolioData.js` `tags`, collapsible bullets (first 3 + "Show more"), "Current" pill, staggered bullet list) with a Framer Motion hover lift.
- **SkillCloud.jsx** — renders `skillGroups` from `portfolioData.js` (Languages, Frontend, Backend, Databases & Caching, Tools & Testing) as staggered icon+label chips; add an icon for a new skill in its `iconMap`.
- **CopyEmail.jsx** — click-to-copy email button used in the Contact section.
- **ContactForm.jsx** — client form (with hidden honeypot field); POSTs JSON to `/api/contact` and shows the server's error message on failure.
- **Chatbot.jsx** — floating chat widget (GSAP-animated bubble + panel). Streams replies from `POST /api/chat`; on any failure (offline, quota, no key) falls back to local `getResponse()` from `chatEngine.js`. Conversation persists in `sessionStorage`, has a clear button, and shows topic-based follow-up chips.
- **ChatMarkdown.jsx** — safe mini-markdown renderer for bot replies (bold, links, bullets; React elements only).
- **ScrollRevealGSAP.jsx**, **SmoothScroll.jsx** — GSAP-based scroll utilities (in progress / newly added).

## Data flow

1. **Content**: `src/data/portfolioData.js` exports `skillGroups` (+ derived flat `skills`), `concepts`, `experience`, `projects`, `education` (incl. `achievement`), `socials`. `page.js` imports this directly and maps over it to render sections. Editing content = editing this file only; no CMS.
2. **Chatbot**: `Chatbot.jsx` sends the last ≤10 messages to `src/app/api/chat/route.js` → builds the system prompt via `knowledge.js` (experience/skills/education from `portfolioData.js` + resume-only facts in `extraFacts`) → streams from Groq's OpenAI-compatible API (`GROQ_MODEL` default `openai/gpt-oss-120b`, falls back to `GROQ_FALLBACK_MODEL` `openai/gpt-oss-20b`) → plain-text stream back to the widget. Route guards: 600-char/message cap, 25 msgs per 10 min per IP (best-effort, in-memory). Prompt rules: answer only from supplied facts, stay on topic, resist prompt injection, never share phone. Env: `GROQ_API_KEY` (server-only).
3. **Contact form**: form fields → JSON → `POST /api/contact` ([route.js](src/app/api/contact/route.js)) → honeypot check, validation (required/length/email), best-effort in-memory rate limit (5 per 10 min per IP) → Resend REST API (`reply_to` = sender) → inbox at `CONTACT_TO_EMAIL`. Env vars (server-only, set in Vercel + `.env.local`, see `.env.example`): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optional `CONTACT_FROM_EMAIL` (needs a Resend-verified domain; defaults to `onboarding@resend.dev`, which can only deliver to the Resend account owner's email).
4. **SEO/meta**: defined once in `layout.js` from `lib/site.js` (title template, description, canonical, Open Graph `profile`, Twitter card, theme-color viewport, JSON-LD `@graph` of `WebSite` + `ProfilePage` + `Person` with `sameAs`/`knowsAbout`/`address`). `app/sitemap.js` and `app/robots.js` generate `/sitemap.xml` and `/robots.txt`. Share image `public/og-image.png` is generated by `node scripts/generate-assets.mjs og`. Optional env `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` adds the Search Console meta tag.

## Build & deploy

- `npm run dev` — Next dev server.
- `npm run build` / `npm start` — standard Next.js build; deployed on Vercel (set the env vars above in project settings).
- `dist/` — leftover artifact from an earlier Vite-based setup; not part of the current Next.js build pipeline.

## Conventions for making changes

- Content edits (bio, skills, jobs, projects, education, socials) → only touch [src/data/portfolioData.js](src/data/portfolioData.js).
- New page sections → add a `<Section>` block in [src/app/page.js](src/app/page.js), wrapped in `<FadeIn>`/`<StaggerContainer>` per existing pattern.
- New animated component → prefer Framer Motion for enter/scroll transitions (already used throughout) and GSAP only for continuous/timeline-driven effects (as in `Chatbot.jsx`, `HeroName`/`HeroTagline`).
- Chatbot knowledge/answers → edit `portfolioData.js` (auto-flows into the prompt) or `extraFacts`/`RULES` in [src/lib/knowledge.js](src/lib/knowledge.js). `chatEngine.js` intents only matter for the offline fallback.
- Styling → Tailwind utility classes; shared one-off effects (grid pattern, glow, pulse-dot) live in `src/app/globals.css`.
