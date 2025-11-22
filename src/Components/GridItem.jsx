import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import gsap from 'gsap';

const GridItem = ({ title, children, className, id, onClick }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = item.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.1; // Magnetic strength
      const y = (e.clientY - top - height / 2) * 0.1;

      gsap.to(item, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(item, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    item.addEventListener('mousemove', handleMouseMove);
    item.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      item.removeEventListener('mousemove', handleMouseMove);
      item.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClick = () => {
    // Reset GSAP transforms instantly so Framer Motion can calculate the correct layout
    if (itemRef.current) {
      gsap.set(itemRef.current, { x: 0, y: 0 });
    }
    onClick();
  };

  return (
    <motion.div
      ref={itemRef}
      layoutId={id}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:bg-white/10 cursor-pointer group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 h-full flex flex-col">
        {title && (
          <h3 className="text-xl font-display font-bold text-white mb-2 tracking-wide">
            {title}
          </h3>
        )}
        <div className="flex-1 text-gray-300">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default GridItem;
