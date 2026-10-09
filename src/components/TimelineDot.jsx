'use client';

import { motion } from 'framer-motion';

// Static marker: the current role is a filled accent dot with a soft halo; past roles are muted.
const TimelineDot = ({ isFirst }) => (
  <motion.div
    className={`w-2.5 h-2.5 rounded-full ${
      isFirst ? 'bg-accent ring-4 ring-accent/20' : 'bg-white/30'
    }`}
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.15 }}
  />
);

export default TimelineDot;
