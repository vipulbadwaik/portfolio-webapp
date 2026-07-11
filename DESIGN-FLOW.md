# Design Flow

Visual language, layout structure, and interaction patterns for this portfolio. Read this before touching styles/markup so new work matches the existing look. See [ARCHITECTURE.md](ARCHITECTURE.md) for code structure.

## Visual language

- **Theme**: dark-only. Background `#0a0a0a` (near-black), text white with gray-scale accents. No light-mode variant exists — don't add `dark:` toggling logic.
- **Layout container**: everything sits inside a centered `max-w-3xl` column with a vertical border on both sides (`border-x border-white/10`), so the page reads as one continuous framed strip edge-to-edge on wide screens. Reuse this wrapper for any new top-level section.
- **Section rhythm**: full-bleed sections separated by `border-b border-white/10`, with a `.screen-line` diagonal-hatch divider (`<div className="screen-line h-3" />`) between major blocks (Experience→Education, Education→Contact). Keep this pattern for any new section inserted between existing ones.
- **Typography**: `Inter` for body (`font-sans`), `Outfit` for display/headings (`font-display`), loaded via `next/font/google` in [layout.js](src/app/layout.js). Hero name uses `.text-shimmer` (animated gradient text clip) — reserve that effect for the single most prominent heading, don't spread it around.
- **Color accents**: everything is grayscale/white-on-black except: green pulse dot for "Available for work", and functional states (green success / red error) in the contact form. Don't introduce new brand colors — accent through opacity/border only (`white/5`, `white/10`, `white/25`, etc.).
- **Corners/borders**: `rounded-lg` on cards, buttons, inputs; hairline borders (`border-white/10`) rather than shadows for separation. Shadows are only used subtly on hover (`hover-lift`).

## Reusable CSS effects ([globals.css](src/app/globals.css))

| Class | Purpose | Use for |
|---|---|---|
| `.grid-pattern` | faint graph-paper grid background | hero-style full-width banners |
| `.screen-line` | diagonal hatch divider strip | between major page sections |
| `.hover-lift` | translateY + soft shadow on hover | clickable cards |
| `.hover-scale` | scale(1.08) on hover | icon buttons |
| `.hover-underline` | animated underline on hover | inline text links |
| `.pulse-dot` | expanding ring pulse | status/availability indicators |
| `.text-shimmer` | animated gradient text | the one hero heading only |
| `.section-icon` (+ `.group`) | icon spins 360° when parent hovered | section title icons |
| `.avatar-ring` | rotating conic gradient ring | avatar/profile image frame |
| `.timeline-glow` | pulsing glow on a vertical line | experience timeline rail |

Prefer these existing classes over inventing new keyframe animations; add a new one only if none of the above fits.

## Animation conventions

- **Framer Motion** (`FadeIn.jsx`, `StaggerChildren.jsx`) is the default for entrance/scroll animations — every section on the page is wrapped in `<FadeIn>` and lists of repeated items use `<StaggerContainer>` / `<StaggerItem>`. New sections/content lists should follow this same wrapping pattern for consistency.
  - `FadeIn` default direction is a slight upward slide; `direction="none"` is used for the hero text (no slide, just opacity) — mirror this choice for above-the-fold content vs. below-the-fold content.
  - Typical stagger: `delay={0.1}`–`{0.15}` increments between sibling `<FadeIn>` blocks.
- **GSAP** is reserved for continuous/imperative animation that Framer Motion doesn't fit well: infinite floating/pulsing (Chatbot bubble), timeline/scroll-driven effects (`ScrollRevealGSAP.jsx`, `SmoothScroll.jsx`), one-shot per-character/element reveals (`HeroName.jsx` — splits text into `.hero-char` spans and staggers them in with `gsap.fromTo`), and anything needing manual `useRef` + `gsap.to()`/`gsap.fromTo()` control with cleanup on unmount.
- Keep animation durations short and easing subtle (`sine.inOut`, `power2.out`, `power3.out`, `0.6s` fade durations) — the site's feel is calm/minimal, not flashy.
- **Reduced-motion / low-end gating**: any GSAP animation (continuous or one-shot reveal) should skip itself when `prefers-reduced-motion: reduce` is set, or when `navigator.deviceMemory`/`navigator.hardwareConcurrency` indicate a low-end device — see the `prefersCalm()` check in `HeroName.jsx`. In the skip case, render the final state immediately (`gsap.set(..., { opacity: 1 })`) rather than dropping the element.
- **Per-character text reveal pattern**: split text into `.hero-char` inline-block spans wrapped in an `aria-hidden` span, with the outer heading carrying `aria-label={fullText}` for screen readers — see `HeroName.jsx`. Reuse this for any future letter-stagger heading rather than hand-rolling a new split.

## Section anatomy

Every content section in [page.js](src/app/page.js) follows this shape:

```jsx
<FadeIn delay={0.1}>
  <Section id="sectionName" title="Section Title" icon={<IconComponent className="w-4 h-4" />}>
    {/* content */}
  </Section>
</FadeIn>
```

`Section.jsx` renders the icon + title heading consistently — always use it for new sections rather than hand-rolling headings, so anchor nav (`Header.jsx` section links) and spacing stay uniform.

## Chatbot UI pattern

`Chatbot.jsx` is a self-contained floating widget: a bubble (bottom-right, GSAP float + pulse ring) that expands into a message panel. It's visually separate from the main content flow (rendered once at the root in `page.js`, outside `<main>`). Any new floating/overlay UI (e.g. a "scroll to top" button) should follow the same self-contained-component-mounted-at-root pattern rather than being threaded through page sections.

## When making UI changes

1. Reuse `Section`, `FadeIn`, `StaggerContainer` before writing new markup/animation wrappers.
2. Match spacing scale already in use: section padding `py-10`, hero `py-20 md:py-28`, gaps `gap-4`/`gap-6`/`gap-8`.
3. Stay within the grayscale/white palette; only status colors (green/red) break this rule, and only for functional feedback.
4. New dividers between sections = `.screen-line`, not a plain `border-t`.
5. Any animated element needs a cleanup path (GSAP `.kill()` in `useEffect` return, as done in `Chatbot.jsx`).
