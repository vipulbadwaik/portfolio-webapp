'use client';

import {
  SiJavascript,
  SiTypescript,
  SiOpenjdk,
  SiCplusplus,
  SiReact,
  SiRedux,
  SiReactrouter,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiGit,
  SiGithub,
  SiWebpack,
  SiBabel,
  SiJest,
  SiPostman,
  SiDocker,
  SiGithubactions,
} from '@icons-pack/react-simple-icons';
import { Braces, MonitorSmartphone, Server, Database, Wrench, Webhook, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './StaggerChildren';

const iconMap = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Java: SiOpenjdk,
  'C++': SiCplusplus,
  'React.js': SiReact,
  Redux: SiRedux,
  'React Router': SiReactrouter,
  HTML5: SiHtml5,
  CSS3: SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Material-UI': SiMui,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'REST APIs': Webhook,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Git: SiGit,
  GitHub: SiGithub,
  Webpack: SiWebpack,
  Babel: SiBabel,
  Jest: SiJest,
  Enzyme: FlaskConical,
  Postman: SiPostman,
  Docker: SiDocker,
  'GitHub Actions': SiGithubactions,
};

const categoryIcons = {
  Languages: Braces,
  Frontend: MonitorSmartphone,
  Backend: Server,
  'Databases & Caching': Database,
  'Tools & Testing': Wrench,
};

const SkillCloud = ({ groups }) => {
  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {groups.map((group) => {
        const CategoryIcon = categoryIcons[group.category] || Wrench;
        return (
          <StaggerItem key={group.category} className="last:odd:sm:col-span-2">
            <div className="card h-full p-4 rounded-xl hover-lift">
              <div className="flex items-center gap-2 mb-3">
                <CategoryIcon className="w-4 h-4 text-accent" />
                <p className="font-mono text-xs font-medium uppercase tracking-wider text-gray-400">
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
                      className="group/skill flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 text-gray-200 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-colors duration-200"
                    >
                      {Icon && (
                        <Icon
                          size={15}
                          className="text-gray-400 transition-all duration-200 group-hover/skill:text-accent group-hover/skill:scale-125"
                        />
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
