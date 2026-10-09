import { cn } from '../lib/utils';

const Section = ({ id, title, icon, number, children, className }) => {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20', className)}
    >
      {title && (
        <>
          <div className="relative left-1/2 -translate-x-1/2 w-screen border-t border-white/10" />
          <div className="group/title flex items-center gap-3 py-4">
            {number && (
              <span className="font-mono text-xs text-accent/80 tabular-nums">{number}</span>
            )}
            {icon && (
              <span className="text-accent transition-transform duration-300 group-hover/title:-translate-y-0.5 group-hover/title:scale-125">{icon}</span>
            )}
            <h2 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-white">
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
