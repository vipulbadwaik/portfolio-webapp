'use client';

import { motion } from 'framer-motion';

const TimelineDot = () => (
  <motion.div
    className="w-2 h-2 rounded-full bg-white/40"
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.15 }}
  />
);

export default TimelineDot;
