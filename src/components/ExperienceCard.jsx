'use client';

import { motion } from 'framer-motion';
import TimelineDot from './TimelineDot';
import { StaggerContainer, StaggerItem } from './StaggerChildren';

const companyEmoji = {
  'Fundly.ai': '🚀',
  Capgemini: '🏢',
};

const techTags = {
  'Fundly.ai': ['React', 'TypeScript', 'Redux Toolkit', 'MUI', 'Fintech'],
  Capgemini: ['React.js', 'TypeScript', 'Redux', 'REST APIs', 'Agile'],
};

const ExperienceCard = ({ job, index }) => {
  const isFirst = index === 0;
  const emoji = companyEmoji[job.company] || '💼';
  const tags = techTags[job.company] || [];

  return (
    <div className="flex gap-4">
      <div className="pt-1.5 shrink-0 relative z-10">
        <TimelineDot isFirst={isFirst} />
      </div>

      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="flex-1 -mx-2 px-4 py-4 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 shrink-0 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-lg">
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-white font-medium">{job.title}</h3>
              {isFirst && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/15 text-[10px] font-medium text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 pulse-dot" />
                  Current
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              {job.company} &middot; {job.period}
            </p>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md border border-white/10 text-[11px] text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {Array.isArray(job.description) ? (
          <StaggerContainer className="text-sm text-gray-400 space-y-2 mt-3">
            {job.description.map((point, j) => (
              <StaggerItem key={j} className="flex gap-2">
                <span className="mt-1 text-white/30 shrink-0">✦</span>
                <span>{point}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <p className="text-sm text-gray-400 mt-3">{job.description}</p>
        )}
      </motion.div>
    </div>
  );
};

export default ExperienceCard;
