# Portfolio UI Revamp — Complete Implementation Guide

Use this as a prompt to recreate this exact portfolio design from scratch on any Next.js project.

---

## Overview

A minimalist, dark-themed developer portfolio inspired by [chanhdai.com](https://chanhdai.com/). Single-page layout with vertical stacking, bordered content columns, full-width horizontal dividers, and polished micro animations.

### Tech Stack
- **Next.js 16** (App Router, static export)
- **React 19**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **Framer Motion 12** (minimal — scroll reveals + micro interactions)
- **Lucide React** (icons)
- **clsx + tailwind-merge** (utility for conditional classes)

### Design Principles
- Dark background (#0a0a0a)
- Monochrome palette with white/gray text on dark
- Bordered content column (max-w-3xl) with vertical border lines
- Full-width horizontal screen-line dividers between sections
- Diagonal crosshatch grid pattern on hero
- Minimal, tasteful animations — nothing flashy

---

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout with fonts + SEO metadata
│   ├── page.js            # Home page (server component)
│   └── globals.css        # Tailwind + custom CSS animations
├── components/
│   ├── Header.jsx         # Sticky nav (client) — progress bar, active tracking, mobile menu
│   ├── Section.jsx        # Reusable bordered panel (server)
│   ├── FadeIn.jsx         # Scroll-triggered fade animation (client)
│   ├── StaggerChildren.jsx # Staggered reveal for lists (client)
│   └── TimelineDot.jsx    # Animated timeline dot (client)
├── data/
│   └── portfolioData.js   # All portfolio content as plain data
└── lib/
    └── utils.js           # cn() helper

Config files:
├── next.config.mjs        # Static export
├── postcss.config.mjs     # Tailwind PostCSS plugin
├── eslint.config.js       # ESLint config
└── package.json
```

---

## Dependencies

```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.2.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.34.3",
    "lucide-react": "^0.554.0",
    "next": "^16.1.6",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwind-merge": "^3.4.0",
    "tailwindcss": "^4.1.7"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "globals": "^16.0.0"
  }
}
```

---

## Config Files

### `next.config.mjs`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

export default nextConfig;
```

### `postcss.config.mjs`
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### `eslint.config.js`
```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  { ignores: ['dist', '.next', 'out'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]
```

---

## File-by-File Implementation

### 1. `src/lib/utils.js`

```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

---

### 2. `src/data/portfolioData.js`

Plain data objects — no JSX. Replace with your own content.

```js
export const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Node.js', 'Python', 'Tailwind CSS', 'PostgreSQL',
  'MongoDB', 'Docker', 'AWS', 'Figma',
];

export const experience = [
  {
    title: 'Senior Developer',
    company: 'Tech Corp',
    period: '2023 — Present',
    description: 'Leading the frontend team and architecting scalable solutions.',
  },
  {
    title: 'Web Developer',
    company: 'Startup Inc',
    period: '2021 — 2023',
    description: 'Built and maintained multiple client-facing web applications.',
  },
];

export const projects = [
  {
    title: 'Project One',
    description: 'A cutting-edge application built with the latest tech stack.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    url: '#',
  },
  {
    title: 'Project Two',
    description: 'An open-source tool that simplifies developer workflows.',
    tags: ['Next.js', 'Tailwind', 'MongoDB'],
    url: '#',
  },
  {
    title: 'Project Three',
    description: 'A real-time collaboration platform for remote teams.',
    tags: ['TypeScript', 'WebSockets', 'AWS'],
    url: '#',
  },
];

export const education = {
  degree: 'Bachelor of Technology',
  field: 'Computer Science & Engineering',
  school: 'University',
  period: '2018 — 2022',
  description: 'Graduated with Honors. Focused on Algorithms and Web Technologies.',
};

export const socials = [
  { name: 'GitHub', url: 'https://github.com/' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/' },
  { name: 'Twitter', url: 'https://twitter.com/' },
];
```

---

### 3. `src/app/globals.css`

Contains Tailwind import, CSS variables, visual patterns, hover effects, and keyframe animations.

```css
@import "tailwindcss";

:root {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --border: 240 3.7% 15.9%;
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--background));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted));
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground));
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Diagonal grid pattern — used on hero background */
.grid-pattern {
  background-image:
    linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(-45deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 16px 16px;
}

/* Horizontal screen-line divider — full-width diagonal stripe pattern */
.screen-line {
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 4px,
    rgba(255,255,255,0.06) 4px,
    rgba(255,255,255,0.06) 5px
  );
}

/* Hover lift effect for cards — subtle upward shift + shadow */
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.03);
}

/* Subtle scale for icon buttons and badges */
.hover-scale {
  transition: transform 0.15s ease;
}

.hover-scale:hover {
  transform: scale(1.08);
}

/* Underline slide-in for links */
.hover-underline {
  position: relative;
}

.hover-underline::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.25s ease;
}

.hover-underline:hover::after {
  width: 100%;
}

/* Pulsing availability dot — green ring expands outward */
@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.pulse-dot {
  position: relative;
}

.pulse-dot::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: inherit;
  animation: pulse-ring 2s ease-out infinite;
}

/* Hero name shimmer — single light sweep across text */
@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

.text-shimmer {
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #ffffff 40%,
    rgba(255, 255, 255, 0.5) 50%,
    #ffffff 60%,
    #ffffff 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out 0.8s forwards;
}

/* Section icon spin on hover */
.section-icon {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .section-icon {
  transform: rotate(360deg);
}
```

---

### 4. `src/app/layout.js`

Root layout with Google Fonts (Inter + Outfit) and SEO metadata.

```jsx
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
});

export const metadata = {
  title: 'Vipul Badwaik — Full Stack Developer',
  description:
    'Portfolio of Vipul Badwaik — Full Stack Developer & UI/UX Enthusiast specializing in React, Next.js, and modern web technologies.',
  openGraph: {
    title: 'Vipul Badwaik — Full Stack Developer',
    description:
      'Full Stack Developer & UI/UX Enthusiast specializing in React, Next.js, and modern web technologies.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-[#0a0a0a] text-white antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
```

---

### 5. `src/components/Section.jsx` (Server Component)

Reusable bordered panel with icon header. Has `group` class for section icon spin on hover.

```jsx
import { cn } from '../lib/utils';

const Section = ({ id, title, icon, children, className }) => {
  return (
    <section
      id={id}
      className={cn(
        'border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-white/20 group',
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
          {icon && (
            <span className="text-gray-400 section-icon">{icon}</span>
          )}
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            {title}
          </h2>
        </div>
      )}
      <div className="px-6 py-5">
        {children}
      </div>
    </section>
  );
};

export default Section;
```

---

### 6. `src/components/FadeIn.jsx` (Client Component)

Scroll-triggered fade animation with configurable direction and delay.

```jsx
'use client';

import { motion } from 'framer-motion';

const FadeIn = ({
  children,
  className,
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  duration = 0.5,
}) => {
  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
```

---

### 7. `src/components/StaggerChildren.jsx` (Client Component)

Staggered reveal for lists — children appear one by one with 80ms delay.

```jsx
'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const StaggerContainer = ({ children, className }) => (
  <motion.div
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-40px' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }) => (
  <motion.div variants={item} className={className}>
    {children}
  </motion.div>
);
```

---

### 8. `src/components/TimelineDot.jsx` (Client Component)

Animated dot for the experience timeline — springs into view.

```jsx
'use client';

import { motion } from 'framer-motion';

const TimelineDot = () => (
  <motion.div
    className="w-2 h-2 rounded-full bg-white/40"
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.15 }}
  />
);

export default TimelineDot;
```

---

### 9. `src/components/Header.jsx` (Client Component)

Sticky header with three micro animations:
- **Scroll progress bar** — 2px bar at the top that fills as you scroll
- **Active nav link indicator** — sliding underline tracks the visible section
- **Mobile menu slide** — smooth height/opacity animation on open/close

```jsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm">
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-white/30 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-3xl mx-auto border-x border-white/10 px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-sm font-semibold text-white tracking-wide">
          Vipul Badwaik
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-colors ${
                activeSection === link.href.slice(1)
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1.5 text-gray-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav with slide animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden max-w-3xl mx-auto border-x border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-3 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-400 hover:text-white transition-colors py-1.5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
```

---

### 10. `src/app/page.js` (Server Component)

The main page. Layout structure:
1. Header (sticky)
2. Hero (grid-pattern background, bordered column)
3. About + Skills (bordered column)
4. Full-width screen-line divider
5. Experience + Projects (bordered column)
6. Full-width screen-line divider
7. Education + Contact (bordered column)
8. Footer

```jsx
import {
  User, Code, Briefcase, GraduationCap, Mail,
  Github, Linkedin, Twitter, ExternalLink, MapPin,
} from 'lucide-react';
import Header from '../components/Header';
import Section from '../components/Section';
import FadeIn from '../components/FadeIn';
import { StaggerContainer, StaggerItem } from '../components/StaggerChildren';
import TimelineDot from '../components/TimelineDot';
import { skills, experience, projects, education, socials } from '../data/portfolioData';

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero cover with grid pattern — full width */}
      <div className="grid-pattern border-b border-white/10">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-20 md:py-28">
          <FadeIn direction="none" duration={0.6}>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-shimmer">
              Vipul Badwaik
            </h1>
          </FadeIn>
          <FadeIn direction="none" delay={0.15} duration={0.6}>
            <p className="text-lg text-gray-400 mb-4">
              Full Stack Developer & UI/UX Enthusiast
            </p>
          </FadeIn>
          <FadeIn direction="none" delay={0.3} duration={0.6}>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                India
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
                Available for work
              </span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* About + Skills section */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-10 space-y-6">
          <FadeIn>
            <Section id="about" title="About" icon={<User className="w-4 h-4" />}>
              <p className="text-gray-300 leading-relaxed">
                I specialize in building high-quality web applications with modern technologies.
                My journey involves deep diving into React, Next.js, Node.js, and creative coding.
                I love experimenting with new libraries and frameworks to push the boundaries of
                what&apos;s possible on the web.
              </p>
            </Section>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Section id="skills" title="Tech Stack" icon={<Code className="w-4 h-4" />}>
              <StaggerContainer className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <span className="inline-block px-3 py-1.5 text-sm text-gray-300 border border-white/10 rounded-lg hover:border-white/20 hover:text-white hover-scale transition-colors">
                      {skill}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Section>
          </FadeIn>
        </div>
      </div>

      {/* Full-width screen-line divider */}
      <div className="screen-line h-3" />

      {/* Experience + Projects section */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-10 space-y-6">
          <FadeIn>
            <Section id="experience" title="Experience" icon={<Briefcase className="w-4 h-4" />}>
              <StaggerContainer className="space-y-6">
                {experience.map((job, i) => (
                  <StaggerItem key={i}>
                    <div className="flex gap-4">
                      <div className="pt-1.5 flex flex-col items-center">
                        <TimelineDot />
                        {i < experience.length - 1 && (
                          <div className="w-px flex-1 bg-white/10 mt-1" />
                        )}
                      </div>
                      <div className="pb-1">
                        <h3 className="text-white font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">
                          {job.company} &middot; {job.period}
                        </p>
                        <p className="text-sm text-gray-400">{job.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Section>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Section id="projects" title="Projects" icon={<Code className="w-4 h-4" />}>
              <StaggerContainer className="space-y-4">
                {projects.map((project, i) => (
                  <StaggerItem key={i}>
                    <a
                      href={project.url}
                      className="block p-4 -mx-2 rounded-xl hover:bg-white/5 hover-lift transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-0.5" />
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                      <div className="flex gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs text-gray-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Section>
          </FadeIn>
        </div>
      </div>

      {/* Full-width screen-line divider */}
      <div className="screen-line h-3" />

      {/* Education + Contact section */}
      <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-10 space-y-6">
        <FadeIn>
          <Section id="education" title="Education" icon={<GraduationCap className="w-4 h-4" />}>
            <div>
              <h3 className="text-white font-medium">{education.degree}</h3>
              <p className="text-sm text-gray-500 mb-1">
                {education.field} &middot; {education.period}
              </p>
              <p className="text-sm text-gray-400">{education.description}</p>
            </div>
          </Section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Section id="contact" title="Contact" icon={<Mail className="w-4 h-4" />}>
            <div className="space-y-4">
              <p className="text-gray-300">
                Feel free to reach out — I&apos;m always open to new opportunities and collaborations.
              </p>
              <a
                href="mailto:vipul@example.com"
                className="inline-block text-sm text-blue-400 hover:text-blue-300 hover-underline transition-colors"
              >
                vipul@example.com
              </a>
              <StaggerContainer className="flex gap-3 pt-2">
                {socials.map((social) => {
                  const Icon = social.name === 'GitHub' ? Github
                    : social.name === 'LinkedIn' ? Linkedin
                    : Twitter;
                  return (
                    <StaggerItem key={social.name}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/20 hover-scale transition-colors inline-block"
                        aria-label={social.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </Section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <footer className="pt-8 pb-6 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Vipul Badwaik
          </footer>
        </FadeIn>
      </div>
    </>
  );
}
```

---

## Animation Summary

### Scroll Animations (Framer Motion)
| Animation | Component | Trigger | Behavior |
|-----------|-----------|---------|----------|
| FadeIn | `FadeIn.jsx` | `whileInView` | Fades in with directional offset (up/down/left/right/none) |
| Stagger | `StaggerChildren.jsx` | `whileInView` | Children appear sequentially, 80ms apart |
| Timeline dot | `TimelineDot.jsx` | `whileInView` | Spring scale from 0 to 1 |
| Scroll progress | `Header.jsx` | `useScroll` | 2px bar fills across top of header |
| Active nav | `Header.jsx` | `IntersectionObserver` | Sliding underline tracks visible section |
| Mobile menu | `Header.jsx` | `AnimatePresence` | Height + opacity slide on open/close |

### CSS Hover Micro-Interactions
| Animation | Class | Effect |
|-----------|-------|--------|
| Card lift | `.hover-lift` | translateY(-2px) + subtle shadow |
| Badge/icon scale | `.hover-scale` | scale(1.08) |
| Link underline | `.hover-underline` | Underline slides in from left |
| Section icon spin | `.section-icon` | 360deg rotation on section hover |
| External link shift | Tailwind classes | Arrow icon moves up-right on hover |

### CSS Keyframe Animations
| Animation | Class | Effect |
|-----------|-------|--------|
| Pulsing dot | `.pulse-dot` | Green ring expands outward infinitely |
| Name shimmer | `.text-shimmer` | Single light sweep across hero name |

---

## Layout Pattern

The key visual pattern is a **bordered content column** with **full-width horizontal dividers**:

```
[Header — full width, sticky]
[Hero — full width grid-pattern bg, content in bordered column]
─────────────────── border-b ───────────────────
[About + Skills — bordered column]
─────────────────── border-b ───────────────────
////// screen-line divider (full viewport width) //////
[Experience + Projects — bordered column]
─────────────────── border-b ───────────────────
////// screen-line divider (full viewport width) //////
[Education + Contact — bordered column]
[Footer]
```

The bordered column uses `max-w-3xl mx-auto border-x border-white/10` to create thin vertical lines on each side of the content. Screen-line dividers sit **outside** the bordered column at full viewport width.

---

## How to Use This Guide

1. Create a fresh Next.js project: `npx create-next-app@latest`
2. Install dependencies from the package.json above
3. Create the file structure as shown
4. Copy each file's code exactly as provided
5. Replace portfolio data in `portfolioData.js` with your own content
6. Update metadata in `layout.js` with your name and info
7. Run `npm run build` to verify — should compile with zero errors
