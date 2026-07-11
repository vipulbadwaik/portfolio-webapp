'use client';

import Image from 'next/image';
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
          className="group relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden border-2 border-white/15"
          whileHover={{
            scale: 1.08,
            rotateY: 10,
            boxShadow: '0 0 40px rgba(255,255,255,0.15)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ perspective: 800 }}
        >
          <Image
            src="/vipul.JPG"
            alt="Vipul Badwaik"
            width={192}
            height={192}
            priority
            className="w-full h-full object-cover object-top"
          />

          {/* Shine overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%', opacity: 0 }}
            whileHover={{ x: '100%', opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Caption shown on hover */}
          <div className="absolute inset-x-0 bottom-0 px-2 py-2 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-[11px] leading-tight text-white text-center font-medium">
              Yep, that&apos;s me enjoying my Goa trip 🏖️ 2025
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroAvatar;
