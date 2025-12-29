'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/train', label: 'Train' },
    { href: '/work', label: 'Work' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-slate-950/98 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl'
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8 py-4 md:py-5">
          <motion.a 
            href="/" 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-11 h-11 md:w-13 md:h-13 rounded-full overflow-hidden ring-2 ring-white/20 hover:ring-white/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Image
                src="/images/storyteller.png"
                alt="David Hervas Pardo Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.a>

          <div className="hidden gap-10 md:flex">
            {links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col gap-1.5 md:hidden cursor-pointer p-2"
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            <motion.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-0.5 w-6 bg-white rounded-full"
            />
            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1
              }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-6 bg-white rounded-full"
            />
            <motion.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-0.5 w-6 bg-white rounded-full"
            />
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-lg md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex h-full flex-col items-center justify-center gap-10">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.1, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-4xl font-black uppercase tracking-tight transition-colors ${
                    pathname === link.href
                      ? 'text-white'
                      : 'text-gray-500 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
