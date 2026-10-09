'use client';

import { useEffect, useRef } from 'react';
import { startWalker } from '../lib/walker';

function prefersCalm() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowEnd =
    (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  return reducedMotion || lowEnd;
}

// Keeps clear of the chat bubble (bottom-right).
const BUBBLE_CLEARANCE = 92;

/** A tiny person who strolls along the bottom of the viewport and does random things. Decorative only. */
const Walker = () => {
  const rootRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    if (!root || !svg || prefersCalm()) return;

    const stop = startWalker({
      root,
      svg,
      bounds: () => ({ min: 8, max: window.innerWidth - root.offsetWidth - BUBBLE_CLEARANCE }),
    });
    root.style.opacity = '1';
    return stop;
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 z-40 h-[76px] w-[61px] opacity-0 transition-opacity duration-1000 md:h-[100px] md:w-20"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 2px)' }}
    >
      <svg ref={svgRef} viewBox="0 0 80 100" className="h-full w-full overflow-visible">
        <ellipse data-p="shadow" cx="40" cy="92.5" rx="14" ry="2.4" fill="#000" />

        {/* bicycle (shown only while riding) */}
        <g data-p="bike" style={{ opacity: 0 }}>
          <g data-p="wheelR">
            <circle cx="28" cy="79.5" r="12.5" fill="none" stroke="#8f8bff" strokeWidth="2" />
            <path d="M28 67 V92 M15.5 79.5 H40.5 M19.2 70.7 L36.8 88.3 M19.2 88.3 L36.8 70.7" stroke="#8f8bff" strokeWidth="0.7" opacity="0.7" />
          </g>
          <g data-p="wheelF">
            <circle cx="66" cy="79.5" r="12.5" fill="none" stroke="#8f8bff" strokeWidth="2" />
            <path d="M66 67 V92 M53.5 79.5 H78.5 M57.2 70.7 L74.8 88.3 M57.2 88.3 L74.8 70.7" stroke="#8f8bff" strokeWidth="0.7" opacity="0.7" />
          </g>
          <polyline points="28,79.5 39,62 58,62 46,78 28,79.5" fill="none" stroke="#c4c2ff" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
          <polyline points="58,62 66,79.5" fill="none" stroke="#c4c2ff" strokeWidth="2.2" strokeLinecap="round" />
          <polyline points="39,62 38.5,57.5" fill="none" stroke="#c4c2ff" strokeWidth="2" strokeLinecap="round" />
          <line x1="34.5" y1="57" x2="42.5" y2="57" stroke="#f4f4fa" strokeWidth="3" strokeLinecap="round" />
          <polyline points="58,62 60,56 64,56" fill="none" stroke="#c4c2ff" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
          <polyline data-p="crankB" fill="none" stroke="#8f8bff" strokeWidth="2.4" strokeLinecap="round" />
          <polyline data-p="crankA" fill="none" stroke="#8f8bff" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* back limbs */}
        <polyline data-p="legB" fill="none" stroke="#26263a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline data-p="footB" fill="none" stroke="#cfcfe0" strokeWidth="4.5" strokeLinecap="round" />
        <polyline data-p="armB" fill="none" stroke="#b91c1c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle data-p="handB" r="2.6" fill="#d2a985" />

        {/* torso */}
        <polyline data-p="torso" fill="none" stroke="#ef4444" strokeWidth="11" strokeLinecap="round" />

        {/* front limbs */}
        <polyline data-p="legF" fill="none" stroke="#34344a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline data-p="footF" fill="none" stroke="#f4f4fa" strokeWidth="4.5" strokeLinecap="round" />

        {/* head */}
        <g data-p="head">
          <circle r="8" fill="#e9c3a0" />
          <path d="M-8.2 -0.5 A8.2 8.2 0 0 1 8.2 -0.5 C 4 -4.5 -3 -4.5 -8.2 -0.5 Z" fill="#15151f" />
          <rect x="0.8" y="-1.6" width="7" height="3.4" rx="1.5" fill="#111118" />
        </g>

        <polyline data-p="armF" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle data-p="handF" r="2.6" fill="#e9c3a0" />
        <rect data-p="phone" x="-2.4" y="-4" width="4.8" height="8" rx="1.2" fill="#111118" stroke="#c4c2ff" strokeWidth="0.8" style={{ opacity: 0 }} />
      </svg>
    </div>
  );
};

export default Walker;
