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

const SkillIcon = ({ name }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[name];

  if (!Icon) {
    return (
      <span className="px-3 py-1.5 text-sm text-gray-300 border border-white/10 rounded-lg">
        {name}
      </span>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-11 h-11 flex items-center justify-center border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 hover-scale transition-colors cursor-default">
        <Icon size={20} className="w-5 h-5" />
      </div>

      {/* Tooltip */}
      {hovered && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-white/10 backdrop-blur-sm border border-white/10 rounded-md whitespace-nowrap pointer-events-none"
        >
          {name}
        </motion.span>
      )}
    </div>
  );
};

export default SkillIcon;
