'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroAvatar = () => {
  return (
    <motion.div
      className="relative shrink-0"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 0.2 }}
    >
      {/* Soft accent glow */}
      <motion.div
        className="absolute -inset-6 rounded-[2rem] bg-accent/20 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Rotating gradient border (clipped so the spinner never pokes out) */}
        <div className="group relative p-[2px] rounded-2xl overflow-hidden">
          <div className="absolute -inset-[60%] avatar-ring" aria-hidden="true" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-[14px] overflow-hidden bg-[#0a0a0a]">
            <Image
              src="/vipul-optimized.jpg"
              alt="Vipul Badwaik"
              width={192}
              height={192}
              priority
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 px-2 py-2 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-[11px] leading-tight text-white text-center font-medium">
                Enjoying my Goa trip, 2025
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroAvatar;
