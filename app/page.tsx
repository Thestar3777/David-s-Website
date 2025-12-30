'use client';

import { SpeedInsights } from "@vercel/speed-insights/next"
import { motion, useScroll, useTransform } from 'framer-motion';
 import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
 import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => null,
});
 
 
const StickyCard = ({
  children,
  className,
  isMobile
}: {
  children: React.ReactNode;
  className?: string;
  isMobile: boolean;
}) => {
  const ref = useRef(null);
  // Disable expensive scroll animations on mobile
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100px", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 0.9 : 1]);

  return (
    <motion.div
      ref={ref}
      initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={isMobile ? {} : { scale }}
      className={className}
    >
      {children}

    </motion.div>
  );
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <section className="relative min-h-[70vh] h-screen lg:h-screen w-full flex items-center">
        {/* Video Background with Rule of Thirds Positioning */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            key={isMobile ? 'mobile' : 'desktop'}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            // ADD !h-full here to force it to stretch to the bottom
            className="absolute inset-0 w-full !h-full object-cover object-center lg:object-[60%_center]"
            style={{
              filter: 'contrast(1.15) saturate(0.85)',
            }}
          >
            <source
              src={isMobile ? '/videos/herovideokickboxing.mp4' : '/videos/herovideo.mp4'}
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-blue-950/10 md:bg-blue-950/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
          <div className="relative z-20 flex w-full px-6 md:px-16 lg:px-24"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 flex w-full px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl w-full md:max-w-md lg:max-w-lg">
            {/* Primary Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                // Disable animation on mobile for performance
                ...(typeof window !== 'undefined' && window.innerWidth < 768 ? { duration: 0 } : {})
              }}
              className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-4xl lg:text-6xl font-black uppercase tracking-tight md:leading-tight lg:leading-tight mb-6 md:mb-5 lg:mb-7 text-white text-center md:text-left"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.7)' }}
            >
              <span className="block">David Hervas</span>
              <span className="block">Pardo</span>
            </motion.h1>

            {/* Subheadline with Dot Separators */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
                ...(typeof window !== 'undefined' && window.innerWidth < 768 ? { duration: 0, delay: 0 } : {})
              }}
              className="text-sm sm:text-base md:text-xs lg:text-sm font-medium tracking-[0.12em] md:tracking-[0.13em] lg:tracking-[0.15em] text-slate-100 mb-8 md:mb-7 lg:mb-9 uppercase text-center md:text-left"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              Martial Artist <span className="text-blue-400">·</span> Content Creator <span className="text-blue-400">·</span> Filmmaker
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
                ...(typeof window !== 'undefined' && window.innerWidth < 768 ? { duration: 0, delay: 0 } : {})
              }}
              className="flex flex-col sm:flex-row gap-4 md:gap-4 lg:gap-6 w-full md:w-auto justify-center md:justify-start"
            >
              <a
                href="/train"
                className="group inline-block bg-red-600 md:bg-blue-900 hover:bg-red-700 md:hover:bg-blue-800 active:bg-red-800 md:active:bg-blue-950 text-white px-10 md:px-9 lg:px-11 py-4 md:py-4 lg:py-5 text-sm font-bold uppercase tracking-wider transition-all duration-300 md:shadow-lg md:hover:shadow-xl text-center min-h-[48px] flex items-center justify-center relative overflow-hidden"
              >
                <span className="relative z-10">Training Programs</span>
                <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              </a>
              <a
                href="/work"
                className="group inline-block border-2 border-white bg-transparent hover:bg-white active:bg-white/90 text-white hover:text-slate-950 px-10 md:px-9 lg:px-11 py-4 md:py-4 lg:py-5 text-sm font-bold uppercase tracking-wider transition-all duration-300 text-center min-h-[48px] flex items-center justify-center"
              >
                View Portfolio
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-5xl px-6 md:px-8 py-12 md:py-20"
      >
        <h2 className="mb-16 md:mb-20 pb-10 text-4xl font-black uppercase tracking-tighter md:text-5xl lg:text-6xl text-center">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto text-gray-300 space-y-8 text-lg md:text-xl leading-relaxed md:leading-loose">
          {/* Paragraph 1: The Core Mission */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I help individuals develop strength, confidence, and presence through
            boxing, kickboxing, bodybuilding, and practical self-defense, guided by
            disciplined coaching and creative insight.
          </motion.p>

          {/* Paragraph 2: The Methodology */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            By combining physical mastery, mindset, acting, and visual storytelling, I
            help amplify skills and knowledge to their highest level.
          </motion.p>

          {/* Paragraph 3: The Call to Action */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ready to train with intention and elevate how you perform and show up? <br />
            <br />
            <a href="/contact" className="text-white font-semibold ml-1 hover:text-gray-300 hover:underline hover:decoration-white transition-colors">
              Let&apos;s work together - &gt;
            </a>
          </motion.p>
        </div>
      </motion.section>

      {/* Three Cards Section */}
      <section className="border-t border-gray-900 px-6 md:px-8 py-24 md:py-32 lg:py-40">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 pb-10 text-4xl font-black uppercase tracking-tighter md:text-4xl lg:text-6xl text-center"
        >
          My Disciplines
        </motion.h2>
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
          {/* Card 1: Athlete */}
          <StickyCard
            isMobile={isMobile}
            className="sticky top-24 md:static flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16 bg-black"
          >
            {/* Image - Left Side */}
            <div className="relative h-[600px] md:h-[450px] lg:h-[650px] md:w-1/2 rounded-lg shadow-2xl overflow-hidden mb-6 md:mb-0 flex-shrink-0">
              <Image
                src="/images/athleteBoxing.png"
                alt="David in combat training"
                fill
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text - Right Side */}
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white">
                Athlete
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                Elite combat training in boxing, kickboxing, and self-defense. Technical precision meets proven results.
              </p>
            </div>
          </StickyCard>

          {/* Card 2: Creator */}
          <StickyCard
            isMobile={isMobile}
            className="sticky top-24 md:static flex flex-col md:flex-row-reverse md:items-center md:gap-12 lg:gap-16 bg-black"
          >
            {/* Image - Right Side on desktop */}
            <div className="relative h-[600px] md:h-[450px] lg:h-[650px] md:w-1/2 rounded-lg shadow-2xl overflow-hidden mb-6 md:mb-0 flex-shrink-0">
              <Image
                src="/images/contentCreator.png"
                alt="David behind the camera"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text - Left Side on desktop */}
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white">
                Creator
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                Cinematic storytelling through video content that captures action, culture, and adventure.
              </p>
            </div>
          </StickyCard>

          {/* Card 3: Storyteller */}
          <StickyCard
            isMobile={isMobile}
            className="sticky top-24 md:static flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16 bg-black"
          >
            {/* Image - Left Side */}
            <div className="relative h-[600px] md:h-[450px] lg:h-[650px] md:w-1/2 rounded-lg shadow-2xl overflow-hidden mb-6 md:mb-0 flex-shrink-0">
              <Image
                src="/images/storyteller.png"
                alt="David in documentary setting"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text - Right Side */}
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white">
                Storyteller
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                Documentary-style narratives blending martial arts, travel, and entertainment.
              </p>
            </div>
          </StickyCard>
        </div>
      </section>

      {/* Follow Me Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="border-t border-gray-900 px-6 md:px-8 py-24 md:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 text-4xl font-black uppercase tracking-tighter md:text-5xl"
          >
            Follow Me
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-16"
          >
            Stay connected and follow my journey across social media
          </motion.p>

          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {/* Instagram */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              href="https://instagram.com/night.lxver"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-5 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-pink-500/60">
                <svg className="h-10 w-10 md:h-12 md:w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-gray-400 transition-colors duration-300 group-hover:text-white">
                Instagram
              </span>
            </motion.a>

            {/* TikTok */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              href="https://www.tiktok.com/@davidhervas77?"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-5 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-black via-gray-900 to-black border-2 border-gray-700 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-500/60 group-hover:border-cyan-500">
                <svg className="h-10 w-10 md:h-12 md:w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-gray-400 transition-colors duration-300 group-hover:text-white">
                TikTok
              </span>
            </motion.a>

            {/* YouTube */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              href="https://www.youtube.com/@davikobox"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-5 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-red-600 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-red-600/60">
                <svg className="h-10 w-10 md:h-12 md:w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-gray-400 transition-colors duration-300 group-hover:text-white">
                YouTube
              </span>
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
      <SpeedInsights />
    </div>
  );
}
