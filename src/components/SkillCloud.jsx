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
import { Cloud, Braces, MonitorSmartphone, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './StaggerChildren';

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

const categoryMap = {
  JavaScript: 'Languages',
  TypeScript: 'Languages',
  Python: 'Languages',
  React: 'Frontend',
  'Next.js': 'Frontend',
  'Tailwind CSS': 'Frontend',
  'Node.js': 'Backend',
  PostgreSQL: 'Backend',
  MongoDB: 'Backend',
  Docker: 'Tools & Cloud',
  AWS: 'Tools & Cloud',
  Figma: 'Tools & Cloud',
};

const categoryIcons = {
  Languages: Braces,
  Frontend: MonitorSmartphone,
  Backend: Server,
  'Tools & Cloud': Cloud,
};

const categoryOrder = ['Languages', 'Frontend', 'Backend', 'Tools & Cloud'];

const SkillCloud = ({ skills }) => {
  const grouped = categoryOrder
    .map((category) => ({
      category,
      items: skills.filter((skill) => (categoryMap[skill] || 'Tools & Cloud') === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {grouped.map((group) => {
        const CategoryIcon = categoryIcons[group.category] || Cloud;
        return (
          <StaggerItem key={group.category}>
            <div className="h-full p-4 rounded-lg border border-white/10 hover-lift transition-colors">
              <div className="group flex items-center gap-2 mb-3">
                <CategoryIcon className="w-4 h-4 text-gray-500 section-icon" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {group.category}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => {
                  const Icon = iconMap[skill];
                  return (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/25 hover:bg-white/5 transition-colors duration-200"
                    >
                      {Icon && (
                        <Icon size={15} className="text-gray-500 group-hover:text-white section-icon" />
                      )}
                      <span className="text-sm">{skill}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
};

export default SkillCloud;
