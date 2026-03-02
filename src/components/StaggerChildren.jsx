'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const StaggerContainer = ({ children, className }) => (
  <motion.div
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-40px' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }) => (
  <motion.div variants={item} className={className}>
    {children}
  </motion.div>
);
