'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PHRASES = [
  'Full Stack Developer & UI/UX Enthusiast',
  'AI-Powered Product Builder',
  'React · TypeScript · Node.js',
];

function prefersCalm() {
  if (typeof window === 'undefined') return false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowEnd =
    (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  return reducedMotion || lowEnd;
}

const HeroTagline = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const textEl = textRef.current;
    const cursorEl = cursorRef.current;
    if (!textEl || !cursorEl) return;

    if (prefersCalm()) {
      textEl.textContent = PHRASES[0];
      gsap.set(cursorEl, { opacity: 1 });
      return;
    }

    const cursorTween = gsap.to(cursorEl, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    const tl = gsap.timeline({ repeat: -1 });

    PHRASES.forEach((phrase) => {
      for (let i = 1; i <= phrase.length; i++) {
        tl.call(() => {
          textEl.textContent = phrase.slice(0, i);
        }, null, i === 1 ? '+=0' : '+=0.045');
      }
      tl.to({}, { duration: 1.4 });
      for (let i = phrase.length - 1; i >= 0; i--) {
        tl.call(() => {
          textEl.textContent = phrase.slice(0, i);
        }, null, '+=0.025');
      }
      tl.to({}, { duration: 0.35 });
    });

    return () => {
      tl.kill();
      cursorTween.kill();
    };
  }, []);

  return (
    <p className="text-lg text-gray-400 mb-4 font-mono min-h-[1.75rem]">
      <span ref={textRef} />
      <span ref={cursorRef} className="inline-block text-white/70 ml-0.5">
        |
      </span>
    </p>
  );
};

export default HeroTagline;
