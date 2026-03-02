import { cn } from '../lib/utils';

const Section = ({ id, title, icon, children, className }) => {
  return (
    <section
      id={id}
      className={cn(
        'border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-white/20 group',
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
          {icon && (
            <span className="text-gray-400 section-icon">{icon}</span>
          )}
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            {title}
          </h2>
        </div>
      )}
      <div className="px-6 py-5">
        {children}
      </div>
    </section>
  );
};

export default Section;
