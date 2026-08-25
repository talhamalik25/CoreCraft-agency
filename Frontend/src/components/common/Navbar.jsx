import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 bg-black/75 backdrop-blur-xl ${
        isScrolled ? 'py-3.5 sm:py-4' : 'py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img 
            src="/logo.png" 
            alt="CoreCraft Logo" 
            className="h-9 sm:h-10 md:h-12 w-auto object-contain brightness-110 group-hover:scale-105 transition-all duration-500" 
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-dm text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? 'text-teal' : 'text-gray hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 w-full h-px bg-teal"
                  />
                )}
                {!isActive && (
                  <div className="absolute -bottom-1 left-0 w-0 h-px bg-teal transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <Link
          to="/contact"
          className="hidden md:block px-6 py-2.5 rounded-full border border-teal text-teal font-dm text-xs uppercase tracking-widest hover:bg-teal hover:text-black transition-all duration-300"
        >
          Start a Project
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white focus:outline-none p-2 cursor-pointer rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-0 left-0 w-full h-[100dvh] bg-black/95 backdrop-blur-2xl z-50 overflow-hidden flex flex-col items-center justify-center gap-7 px-6 border-t border-white/5"
          >
            {/* Close Icon inside Overlay */}
            <button
              className="absolute top-5 right-5 text-white p-2.5 cursor-pointer rounded-full bg-white/5 hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={26} />
            </button>

            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className={`font-syne text-3xl font-bold uppercase tracking-tight transition-colors ${
                      isActive ? 'text-teal' : 'text-white hover:text-teal'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              className="mt-4"
            >
              <Link
                to="/contact"
                className="px-9 py-3.5 rounded-full bg-teal text-black font-dm text-xs font-semibold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,168,150,0.3)]"
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
