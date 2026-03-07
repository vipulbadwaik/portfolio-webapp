'use client';

import { motion } from 'framer-motion';

const HeroAvatar = () => {
  return (
    <motion.div
      className="relative shrink-0"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.2 }}
    >
      {/* Animated orbiting ring 1 */}
      <motion.div
        className="absolute -inset-3 rounded-2xl border border-white/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ borderRadius: '1rem' }}
      />

      {/* Animated orbiting ring 2 — opposite direction */}
      <motion.div
        className="absolute -inset-5 rounded-3xl border border-white/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Pulsing glow */}
      <motion.div
        className="absolute -inset-6 rounded-3xl bg-white/5 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Corner sparkle dots */}
      {[
        { x: -8, y: -8, delay: 0 },
        { x: '100%', y: -8, delay: 0.5 },
        { x: -8, y: '100%', delay: 1 },
        { x: '100%', y: '100%', delay: 1.5 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
          style={{ left: pos.x, top: pos.y }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: pos.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating + tilt image */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotateY: [-3, 3, -3],
          rotateX: [2, -2, 2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden border-2 border-white/15"
          whileHover={{
            scale: 1.08,
            rotateY: 10,
            boxShadow: '0 0 40px rgba(255,255,255,0.15)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ perspective: 800 }}
        >
          <img
            src="/avatar.png"
            alt="Vipul Badwaik"
            className="w-full h-full object-cover object-top"
          />

          {/* Shine overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%', opacity: 0 }}
            whileHover={{ x: '100%', opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroAvatar;
