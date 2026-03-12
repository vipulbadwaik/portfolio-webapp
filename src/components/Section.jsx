import { cn } from '../lib/utils';

const Section = ({ id, title, icon, children, className }) => {
  return (
    <section
      id={id}
      className={cn('group', className)}
    >
      {title && (
        <>
          <div className="relative left-1/2 -translate-x-1/2 w-screen border-t border-white/10" />
          <div className="flex items-center gap-3 py-4">
            {icon && (
              <span className="text-gray-400 section-icon">{icon}</span>
            )}
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {title}
            </h2>
          </div>
          <div className="relative left-1/2 -translate-x-1/2 w-screen border-b border-white/10" />
        </>
      )}
      <div className="py-5">
        {children}
      </div>
    </section>
  );
};

export default Section;
