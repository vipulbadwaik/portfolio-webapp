'use client';

import { motion } from 'framer-motion';

const TimelineDot = ({ isFirst }) => (
  <div className="relative">
    {/* Pulsing ring for current role */}
    {isFirst && (
      <motion.div
        className="absolute -inset-1 rounded-full bg-white/20"
        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    )}
    <motion.div
      className={`w-2.5 h-2.5 rounded-full ${isFirst ? 'bg-white/70' : 'bg-white/30'}`}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.15 }}
    />
  </div>
);

export default TimelineDot;
