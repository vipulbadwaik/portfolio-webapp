# Design Flow

Visual language, layout structure, and interaction patterns for this portfolio. Read this before touching styles/markup so new work matches the existing look. See [ARCHITECTURE.md](ARCHITECTURE.md) for code structure.

## Visual language

- **Theme**: dark-only. Background `#0a0a0a` (near-black), text white with gray-scale accents. No light-mode variant exists — don't add `dark:` toggling logic.
- **Layout container**: everything sits inside a centered `max-w-3xl` column with a vertical border on both sides (`border-x border-white/10`), so the page reads as one continuous framed strip edge-to-edge on wide screens. Reuse this wrapper for any new top-level section.
- **Section rhythm**: full-bleed sections separated by `border-b border-white/10`, with a `.screen-line` diagonal-hatch divider (`<div className="screen-line h-3" />`) between major blocks (Experience→Education, Education→Contact). Keep this pattern for any new section inserted between existing ones.
- **Typography**: `Plus Jakarta Sans` body (`font-sans`), `Bricolage Grotesque` display/headings (`font-display`), `JetBrains Mono` for labels, dates, tags and the hero tagline (`font-mono`). Loaded via `next/font/google` in [layout.js](src/app/layout.js) as `--font-jakarta/--font-bricolage/--font-jetbrains` and mapped to Tailwind's `font-*` utilities in a `@theme inline` block in [globals.css](src/app/globals.css) (the variable names must differ from the `--font-*` theme tokens to avoid a circular reference). Hero name (`HeroName.jsx`) does a one-shot per-letter blur+rise reveal (Framer Motion, skipped under reduced-motion), resting as white "Vipul" + accent "Badwaik". Small text floor: 11–12px for mono labels, body `text-sm`+ and `text-gray-300/400` (never darker than gray-400 for readable copy). Form inputs are `text-base` on mobile to prevent iOS zoom.
- **Color accents**: grayscale/white-on-black plus ONE accent, soft violet `--color-accent` `#8f8bff` (`accent-soft` `#c4c2ff`) — use as `text-accent`, `bg-accent/10`, `border-accent/30`. Used for section numbers/icons, the scroll-progress bar, timeline, "Current" badge, hover borders, focus rings, chatbot, key numbers (`.text-accent-gradient`). Green stays for the availability dot and success state, red for errors. Don't add further hues.
- **Corners/borders**: `rounded-lg` on cards, buttons, inputs; hairline borders (`border-white/10`) rather than shadows for separation. Shadows are only used subtly on hover (`hover-lift`, accent-tinted). No emojis in UI — use Lucide icons.

## Reusable CSS effects ([globals.css](src/app/globals.css))

| Class | Purpose | Use for |
|---|---|---|
| `.grid-pattern` | faint graph-paper grid, radially masked so it fades out | hero-style full-width banners (own absolutely-positioned layer) |
| `.screen-line` | diagonal hatch divider strip | between major page sections |
| `.hover-lift` | translateY + soft shadow on hover | clickable cards |
| `.hover-scale` | scale(1.08) on hover | icon buttons |
| `.hover-underline` | animated underline on hover | inline text links |
| `.pulse-dot` | expanding ring pulse | status/availability indicators |
| `.avatar-ring` | rotating accent conic gradient (put inside an `overflow-hidden` wrapper with `p-[2px]`) | avatar border |
| `.card` | gradient surface + hairline border, accent border on hover | all cards (skills, stats, experience, education, copy-email) |
| `.hero-glow` | radial accent glow | hero backdrop |
| `.text-accent-gradient` | white→accent gradient text | big stat numbers, one phrase in contact heading |

Icon hover micro-interaction: scoped named groups (`group/title`, `group/skill`) with `group-hover/<name>:scale-125` (+ `-translate-y-0.5` for titles) — never an unscoped `.group` rule, which animates every icon in the section at once.

Avoid decorative pulsing/"live" badges: the current role in Experience gets a small static mono "CURRENT" tag next to the title plus a static haloed timeline dot — no pulse or glow. `.pulse-dot` stays for the hero availability indicator only.

Prefer these existing classes over inventing new keyframe animations; add a new one only if none of the above fits.

## Animation conventions

- **Framer Motion** (`FadeIn.jsx`, `StaggerChildren.jsx`) is the default for entrance/scroll animations — every section on the page is wrapped in `<FadeIn>` and lists of repeated items use `<StaggerContainer>` / `<StaggerItem>`. New sections/content lists should follow this same wrapping pattern for consistency.
  - `FadeIn` default direction is a slight upward slide; `direction="none"` is used for the hero text (no slide, just opacity) — mirror this choice for above-the-fold content vs. below-the-fold content.
  - Typical stagger: `delay={0.1}`–`{0.15}` increments between sibling `<FadeIn>` blocks.
  - **Scroll-linked progress**: for a rail/line that should visually track scroll position (e.g. the Experience timeline rail in `ExperienceTimeline.jsx`), use `useScroll({ target: ref, offset: [...] })` + `useSpring(scrollYProgress, ...)` driving a `scaleY`/`transformOrigin: top` fill over a static `bg-white/10` track — reuse this pattern rather than a static/always-on gradient, which reads as a stuck progress bar.
- **GSAP** is reserved for continuous/imperative animation that Framer Motion doesn't fit well: infinite floating/pulsing (Chatbot bubble), timeline/scroll-driven effects (`ScrollRevealGSAP.jsx`, `SmoothScroll.jsx`), one-shot per-character/element reveals (`HeroName.jsx` — splits text into `.hero-char` spans and staggers them in with `gsap.fromTo`), a looping typewriter cycle (`HeroTagline.jsx` — types/deletes through a list of role phrases via a repeating `gsap.timeline()`, with the cursor blink as a separate `yoyo` opacity tween), and anything needing manual `useRef` + `gsap.to()`/`gsap.fromTo()` control with cleanup on unmount.
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

`Section.jsx` renders a mono section number (`number="01"`), accent icon and white display-font title consistently — always use it for new sections rather than hand-rolling headings, so anchor nav (`Header.jsx` section links) and spacing stay uniform.

## Floating astronaut

`Astronaut.jsx` renders a decorative astronaut and a small rocket (fixed, `pointer-events-none`, `aria-hidden`; rocket `z-[39]`, astronaut `z-40`). They are the one deliberate exception to the single-accent rule: a yellow suit/body (`#fde047`, shade `#eab308`, dark `#ca8a04`) with violet accents (visor, chest panel, gloves, boots, fins, flame) so they pop against the dark page while still tying back to the violet theme. `lib/astronaut.js` runs a looping mission: the astronaut waves on the ground, boards the rocket (shrinks into it), the rocket shakes and launches (flame + dust puffs) to a random spot in the sky, he steps out and floats around it with random actions (wave, flip, look around, nap with floating "zZ", dance, jetpack dash), boards again, and the rocket lands back on the ground before the cycle repeats. Limbs are separate SVG groups rotated with GSAP `svgOrigin` pivots and paddle continuously (large amplitude — subtle ±5° reads as frozen); keep wave arcs clear of the helmet. The mission is confined to one side gutter beside the `max-w-3xl` content column (picked at load; ground spots also avoid the chat bubble) and is only mounted at ≥1080px wide, so it never overlaps page content — keep `CONTENT_W` in `lib/astronaut.js` in sync with the layout container. Mounted once at the root next to `Chatbot`; with the walker these are the only decorative moving elements, both gated by `prefersCalm()`.

## Bottom-of-screen walker

`Walker.jsx` mounts a small person pinned to the bottom of the **viewport** (`fixed bottom-0`, `z-40`, `pointer-events-none`, `aria-hidden`) with a red shirt (`#ef4444`, darker `#b91c1c` for the back arm), dark trousers and white shoes; the bicycle stays violet. Behaviour lives in `lib/walker.js` (walk, cycle on a bicycle, idle, wave, jump, stretch, dance, sit-with-phone, weighted random). Constrained to stay left of the chat bubble. Together with the astronaut these are the only decorative moving elements; both obey `prefersCalm()`.

## Chatbot UI pattern

Replies stream in token-by-token (typing dots only until the first token); bot messages render mini-markdown via `ChatMarkdown.jsx`; user bubbles and the launcher use the accent tint. Header has a clear-conversation (↺) button next to close.

`Chatbot.jsx` is a self-contained floating widget: a bubble (bottom-right, GSAP float + pulse ring) that expands into a message panel. It's visually separate from the main content flow (rendered once at the root in `page.js`, outside `<main>`). Any new floating/overlay UI (e.g. a "scroll to top" button) should follow the same self-contained-component-mounted-at-root pattern rather than being threaded through page sections.

## When making UI changes

1. Reuse `Section`, `FadeIn`, `StaggerContainer` before writing new markup/animation wrappers.
2. Mobile-first: side padding `px-5 sm:px-6`, stack CTAs full-width on mobile, tap targets ≥44px (nav links `py-3`, icon buttons `p-3`). Match spacing scale: section padding `py-10`, hero `py-20 md:py-28`, gaps `gap-4`/`gap-6`/`gap-8`.
3. Stay within the grayscale/white palette; only status colors (green/red) break this rule, and only for functional feedback.
4. New dividers between sections = `.screen-line`, not a plain `border-t`.
5. Any animated element needs a cleanup path (GSAP `.kill()` in `useEffect` return, as done in `Chatbot.jsx`).
