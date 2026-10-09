'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, ChevronDown } from 'lucide-react';
import TimelineDot from './TimelineDot';

const VISIBLE_POINTS = 3;

// Render **bold** segments from the data file.
const renderRich = (text) =>
  text.split('**').map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-white">
        {part}
      </strong>
    ) : (
      part
    ),
  );

const ExperienceCard = ({ job, index }) => {
  const [expanded, setExpanded] = useState(false);
  const isFirst = index === 0;
  const tags = job.tags || [];
  const points = Array.isArray(job.description) ? job.description : [job.description];
  const collapsible = points.length > VISIBLE_POINTS;

  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="pt-2 shrink-0 relative z-10">
        <TimelineDot isFirst={isFirst} />
      </div>

      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="card flex-1 min-w-0 p-4 sm:p-5 rounded-xl"
      >
        <div className="flex items-start gap-3">
          {job.logo ? (
            <Image
              src={job.logo}
              alt={`${job.company} logo`}
              width={128}
              height={128}
              className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 object-contain"
            />
          ) : (
            <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-lg border border-accent/25 bg-accent/10 flex items-center justify-center text-accent">
              <Briefcase className="w-5 h-5" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="font-display text-base sm:text-lg font-semibold text-white leading-tight">
                {job.title}
              </h3>
              {isFirst && (
                <span className="rounded border border-accent/30 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent-soft">
                  Current
                </span>
              )}
            </div>
            <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-3">
              <p className="text-sm font-medium text-gray-300">
                {job.company}
                {job.location && <span className="font-normal text-gray-400"> · {job.location}</span>}
              </p>
              <p className="font-mono text-xs text-gray-400">{job.period}</p>
            </div>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono text-[11px] text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <ul className="text-sm text-gray-300 leading-relaxed space-y-2.5 mt-4">
          {/* All bullets stay in the DOM (crawlers/AI read them); extras are just visually hidden until expanded. */}
          {points.map((point, j) => (
            <li key={j} className={`flex gap-3 ${collapsible && !expanded && j >= VISIBLE_POINTS ? 'hidden' : ''}`}>
              <span className="mt-[0.6rem] w-1 h-1 rounded-full bg-accent shrink-0" />
              <span>{renderRich(point)}</span>
            </li>
          ))}
        </ul>

        {collapsible && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-soft transition-colors py-1"
          >
            {expanded ? 'Show less' : `Show ${points.length - VISIBLE_POINTS} more`}
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default ExperienceCard;
