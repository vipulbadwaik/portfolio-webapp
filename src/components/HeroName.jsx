'use client';

import { motion, useReducedMotion } from 'framer-motion';

const WORDS = [
  { text: 'Vipul', className: 'text-white' },
  { text: 'Badwaik', className: 'text-accent' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

const letter = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroName = ({ className }) => {
  const reduceMotion = useReducedMotion();
  const fullName = WORDS.map((w) => w.text).join(' ');

  return (
    <motion.h1
      className={className}
      aria-label={fullName}
      variants={container}
      initial={reduceMotion ? 'show' : 'hidden'}
      animate="show"
    >
      {/* Plain-text copy for crawlers and screen readers; the animated letters below are decorative. */}
      <span className="sr-only">{fullName}</span>
      {WORDS.map((word, wi) => (
        <span key={word.text} aria-hidden="true">
          <span className={`inline-block whitespace-nowrap ${word.className}`}>
            {[...word.text].map((char, ci) => (
              <motion.span
                key={ci}
                variants={reduceMotion ? undefined : letter}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wi < WORDS.length - 1 && ' '}
        </span>
      ))}
    </motion.h1>
  );
};

export default HeroName;
