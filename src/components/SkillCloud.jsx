'use client';

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiFigma,
} from '@icons-pack/react-simple-icons';
import { Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const iconMap = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  Python: SiPython,
  'Tailwind CSS': SiTailwindcss,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  AWS: Cloud,
  Figma: SiFigma,
};

// Pre-defined scattered positions (percentage-based) so they look organic
// Each has: x%, y%, size multiplier, float delay, float duration
const positions = [
  { x: 5, y: 8, scale: 1.1, delay: 0, dur: 4.5 },
  { x: 28, y: 2, scale: 0.9, delay: 0.8, dur: 5.2 },
  { x: 52, y: 12, scale: 1.2, delay: 0.3, dur: 4.8 },
  { x: 78, y: 4, scale: 1, delay: 1.2, dur: 5 },
  { x: 15, y: 38, scale: 1, delay: 0.5, dur: 4.3 },
  { x: 42, y: 42, scale: 1.15, delay: 1, dur: 5.5 },
  { x: 68, y: 35, scale: 0.95, delay: 0.2, dur: 4.6 },
  { x: 88, y: 40, scale: 1.05, delay: 0.7, dur: 5.1 },
  { x: 8, y: 70, scale: 0.95, delay: 1.1, dur: 4.9 },
  { x: 35, y: 75, scale: 1.1, delay: 0.4, dur: 5.3 },
  { x: 60, y: 68, scale: 1, delay: 0.9, dur: 4.4 },
  { x: 82, y: 72, scale: 0.9, delay: 0.6, dur: 5 },
];

const FloatingIcon = ({ name, pos, index }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[name];
  if (!Icon) return null;

  const iconSize = Math.round(22 * pos.scale);

  return (
    <motion.div
      className="absolute"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {/* Floating animation */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{
          duration: pos.dur,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: pos.delay,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative"
      >
        <div
          className="flex items-center justify-center border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200 cursor-default"
          style={{
            width: `${Math.round(44 * pos.scale)}px`,
            height: `${Math.round(44 * pos.scale)}px`,
          }}
        >
          <Icon size={iconSize} className={`w-[${iconSize}px] h-[${iconSize}px]`} />
        </div>

        {/* Tooltip */}
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs text-white bg-white/10 backdrop-blur-sm border border-white/10 rounded-md whitespace-nowrap pointer-events-none z-10"
          >
            {name}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

const SkillCloud = ({ skills }) => {
  return (
    <div className="relative w-full h-56 md:h-64">
      {skills.map((skill, i) => (
        <FloatingIcon
          key={skill}
          name={skill}
          pos={positions[i % positions.length]}
          index={i}
        />
      ))}
    </div>
  );
};

export default SkillCloud;
