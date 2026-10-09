'use client';

import { useEffect, useRef, useState } from 'react';
import { startAstronaut } from '../lib/astronaut';

function prefersCalm() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowEnd =
    (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  return reducedMotion || lowEnd;
}

/** A small astronaut that drifts around the viewport and does random things. Decorative only. */
// Needs a side gutter beside the 768px content column (+ room for the rocket and astronaut).
const WIDE_QUERY = '(min-width: 1080px)';

const Astronaut = () => {
  const [wide, setWide] = useState(false);
  const rootRef = useRef(null);
  const rocketRef = useRef(null);
  const puffsRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const rocket = rocketRef.current;
    const puffs = puffsRef.current;
    if (!wide || !root || !rocket || !puffs || prefersCalm()) return;

    const stop = startAstronaut({
      root,
      rocket,
      puffs,
      bounds: () => ({ w: document.documentElement.clientWidth, h: window.innerHeight }),
    });
    return () => {
      stop();
      // hide + reset everything so nothing lingers when the window gets narrow
      [root, rocket].forEach((el) => { el.style.opacity = '0'; });
    };
  }, [wide]);

  return (
    <>
      {/* launch / landing dust */}
      <div ref={puffsRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[38]">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            data-r="puff"
            className="absolute left-0 top-0 h-5 w-5 rounded-full bg-white/40 opacity-0 blur-[3px]"
          />
        ))}
      </div>

      {/* rocket */}
      <div
        ref={rocketRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[39] h-16 w-[39px] opacity-0 md:h-[88px] md:w-[53px]"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(143, 139, 255, 0.35))' }}
      >
        <svg viewBox="0 0 40 66" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="rocket-window" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a7a4ff" />
              <stop offset="1" stopColor="#4b46c8" />
            </linearGradient>
          </defs>
          <g data-r="flame">
            <path d="M14 64 Q20 98 26 64 Z" fill="#8f8bff" opacity="0.9" />
            <path d="M17 64 Q20 84 23 64 Z" fill="#ffffff" />
          </g>
          <path d="M10 44 L1 66 L12 60 Z" fill="#8f8bff" />
          <path d="M30 44 L39 66 L28 60 Z" fill="#8f8bff" />
          <path d="M20 1 C30 11 32 30 30 62 L10 62 C8 30 10 11 20 1 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
          <path d="M20 1 C24 5 27 9 28.6 15 L11.4 15 C13 9 16 5 20 1 Z" fill="#8f8bff" />
          <rect x="10" y="47" width="20" height="4" fill="#8f8bff" opacity="0.85" />
          <circle cx="20" cy="30" r="6" fill="url(#rocket-window)" stroke="#ca8a04" strokeWidth="1.5" />
          <ellipse cx="22" cy="28" rx="1.8" ry="1" fill="#fff" opacity="0.55" transform="rotate(-30 22 28)" />
          <rect x="14" y="61" width="12" height="4" rx="1.5" fill="#ca8a04" />
        </svg>
      </div>

      <div
        ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 -ml-5 -mt-[22px] h-11 w-10 opacity-0 md:-ml-7 md:-mt-8 md:h-16 md:w-14"
      style={{ filter: 'drop-shadow(0 4px 10px rgba(143, 139, 255, 0.35))' }}
    >
      <span
        data-a="zzz"
        className="absolute -top-2 left-7 font-mono text-[10px] font-semibold tracking-tight text-accent-soft opacity-0 md:left-10 md:text-xs"
      >
        z<span className="text-[8px] md:text-[10px]">z</span>
        <span className="text-[6px] md:text-[8px]">z</span>
      </span>

      <div data-a="figure" className="h-full w-full">
        <svg viewBox="0 0 64 72" className="astro-bob h-full w-full overflow-visible">
          <defs>
            <linearGradient id="astro-visor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a7a4ff" />
              <stop offset="1" stopColor="#4b46c8" />
            </linearGradient>
          </defs>

          {/* jetpack flame (outer group is scaled for boosts, inner flickers via CSS) */}
          <g data-a="boost">
            <g className="astro-flame">
              <path d="M14 49 L20 49 L17 66 Z" fill="#8f8bff" opacity="0.85" />
              <path d="M15.5 49 L18.5 49 L17 59 Z" fill="#ffffff" />
            </g>
          </g>

          {/* backpack */}
          <rect x="10" y="26" width="15" height="24" rx="5" fill="#ca8a04" />
          <rect x="13" y="30" width="9" height="3" rx="1.5" fill="#8f8bff" />

          {/* back arm + leg (darker, behind the torso) */}
          <g data-a="legB">
            <rect x="22" y="47" width="9" height="17" rx="4.5" fill="#eab308" transform="rotate(-14 26 48)" />
          </g>
          <g data-a="armB">
            <rect x="20" y="28" width="16" height="8" rx="4" fill="#eab308" transform="rotate(30 24 32)" />
          </g>

          {/* torso */}
          <rect x="20" y="26" width="23" height="25" rx="9" fill="#fde047" />
          <rect x="27" y="33" width="10" height="7" rx="2.5" fill="#8f8bff" />
          <circle cx="30" cy="36.5" r="1" fill="#fde047" />
          <circle cx="34" cy="36.5" r="1" fill="#fde047" />

          {/* front leg + boot */}
          <g data-a="legF">
            <rect x="32" y="47" width="9" height="17" rx="4.5" fill="#fde047" transform="rotate(16 36 48)" />
            <rect x="37" y="60" width="10" height="6" rx="3" fill="#8f8bff" transform="rotate(16 42 63)" />
          </g>

          {/* front arm + glove */}
          <g data-a="armF">
            <rect x="37" y="27" width="17" height="8" rx="4" fill="#fde047" transform="rotate(-28 39 31)" />
            <circle cx="53" cy="21" r="4.2" fill="#8f8bff" />
          </g>

          {/* helmet */}
          <g data-a="head">
            <circle cx="32" cy="18" r="15" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
            <ellipse cx="37" cy="18.5" rx="9.5" ry="8" fill="url(#astro-visor)" />
            <ellipse cx="40.5" cy="15.5" rx="3" ry="1.8" fill="#ffffff" opacity="0.55" transform="rotate(-25 40.5 15.5)" />
          </g>
        </svg>
      </div>
    </div>
    </>
  );
};

export default Astronaut;
