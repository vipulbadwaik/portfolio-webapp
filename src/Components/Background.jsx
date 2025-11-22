import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Background = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shapes = gsap.utils.toArray('.floating-shape');
      
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          rotation: "random(-180, 180)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
        
        gsap.to(shape, {
          scale: "random(0.8, 1.2)",
          duration: "random(5, 10)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="floating-shape absolute top-[10%] left-[10%] w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]" />
      <div className="floating-shape absolute top-[40%] right-[20%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="floating-shape absolute bottom-[10%] left-[30%] w-72 h-72 bg-pink-600/20 rounded-full blur-[90px]" />
      <div className="floating-shape absolute top-[20%] right-[10%] w-48 h-48 bg-cyan-600/20 rounded-full blur-[60px]" />
    </div>
  );
};

export default Background;
