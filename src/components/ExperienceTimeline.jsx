'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ExperienceTimeline = ({ children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.35'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Track */}
      <div className="absolute left-[4px] top-3 bottom-3 w-px bg-white/10" />
      {/* Scroll-linked fill */}
      <motion.div
        className="absolute left-[4px] top-3 bottom-3 w-px bg-white/60 origin-top"
        style={{ scaleY }}
      />
      {children}
    </div>
  );
};

export default ExperienceTimeline;
