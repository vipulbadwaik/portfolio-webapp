'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  // { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const clickCooldown = useRef(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // On nav click, set active immediately and pause scroll tracking
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    clickCooldown.current = true;
    setTimeout(() => { clickCooldown.current = false; }, 1000);
  };

  // Scroll-based tracking for manual scrolling
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));

    const handleScroll = () => {
      if (clickCooldown.current) return;

      const scrollPos = window.scrollY + 120;
      let active = '';

      // Walk top-to-bottom: last section whose top has been scrolled past wins
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const sectionTop = el.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= scrollPos) {
          active = id;
        }
      }

      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm">
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-white/30 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-3xl mx-auto border-x border-white/10 px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-sm font-semibold text-white tracking-wide">
          Vipul Badwaik
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href.slice(1))}
              className={`relative text-sm transition-colors ${
                activeSection === link.href.slice(1)
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1.5 text-gray-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav with slide animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden max-w-3xl mx-auto border-x border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-3 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => { setMenuOpen(false); handleNavClick(link.href.slice(1)); }}
                  className="text-sm text-gray-400 hover:text-white transition-colors py-1.5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
