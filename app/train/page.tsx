'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import Footer from '../components/Footer';

export default function TrainPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden overflow-y-hidden pt-20 md:pt-0">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="px-6 md:px-8 py-24 md:py-32 lg:py-40 pt-36 md:pt-32 lg:pt-40"
      >
        <div className="mx-auto max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 md:mb-10 text-4xl sm:text-5xl font-black uppercase tracking-tighter md:text-6xl lg:text-7xl leading-tight"
          >
            Train With David
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 md:mb-14 text-xl md:text-2xl leading-relaxed md:leading-loose text-gray-300"
          >
            Elevate your combat skills with personalized training in boxing, kickboxing, and self-defense.
          </motion.p>

          <motion.a 
            href='#bookSession'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block rounded-lg border-2 border-white bg-transparent px-12 py-5 text-center text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black shadow-lg hover:shadow-xl"
          >
            Book a session
          </motion.a>
        </div>
      </motion.section>

      <section className="border-t border-gray-800/50 px-6 md:px-8 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl space-y-24 md:space-y-32 lg:space-y-40">
          <div className="grid grid-cols-1 gap-6 md:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] overflow-hidden bg-charcoal rounded-lg shadow-2xl group"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-bottom scale-138 origin-bottom "
              >
                <source src="/videos/boxing.mp4" type="video/mp4" />
              </video>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 lg:pl-4"
            >
              <h2 className="text-4xl font-black uppercase tracking-tighter text-red-600 md:text-5xl lg:text-6xl">
                Boxing
              </h2>
              <p className="text-lg md:text-xl leading-relaxed md:leading-loose text-gray-300">
                Master the sweet science with technical precision. From fundamental footwork to advanced combination work, develop the skills that build champions.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1 space-y-6 lg:pr-4"
            >
              <h2 className="text-4xl font-black uppercase tracking-tighter text-red-600 md:text-5xl lg:text-6xl">
                Kickboxing
              </h2>
              <p className="text-lg md:text-xl leading-relaxed md:leading-loose text-gray-300">
                Unleash devastating power through the integration of striking techniques. Build explosive strength and fluid movement patterns.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] overflow-hidden bg-charcoal order-1 lg:order-2 rounded-lg shadow-2xl group"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-bottom scale-150 origin-bottom "
              >
                <source src="/videos/herovideokickboxing.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] overflow-hidden bg-charcoal rounded-lg shadow-2xl group"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-bottom scale-138 origin-bottom"
              >
                <source src="/videos/selftrain.mp4" type="video/mp4" />
              </video>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 lg:pl-4"
            >
              <h2 className="text-4xl font-black uppercase tracking-tighter text-red-600 md:text-5xl lg:text-6xl">
                Self-Defense
              </h2>
              <p className="text-lg md:text-xl leading-relaxed md:leading-loose text-gray-300">
                Real-world application designed for practical situations. Learn to protect yourself and those around you with confidence and control.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book Session Section */}
      <motion.section 
        id='bookSession'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="border-t border-gray-800/50 px-6 md:px-8 py-24 md:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 md:mb-16 text-4xl font-black uppercase tracking-tighter md:text-5xl lg:text-6xl">
            Book A Session
          </h2>
          <form className="space-y-10" onSubmit={handleSubmit} suppressHydrationWarning>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="w-full border-b-2 border-gray-700 bg-transparent px-0 py-5 text-lg md:text-xl text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-all duration-300"
                required
                suppressHydrationWarning
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full border-b-2 border-gray-700 bg-transparent px-0 py-5 text-lg md:text-xl text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-all duration-300"
                required
                suppressHydrationWarning
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Message"
                className="w-full border-b-2 border-gray-700 bg-transparent px-0 py-5 text-lg md:text-xl text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-all duration-300"
                required
                suppressHydrationWarning
              />
            </motion.div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border-2 border-green-600 bg-green-600/10 px-6 py-4 text-green-500"
              >
                <p className="font-semibold">Message sent successfully! I&apos;ll get back to you soon.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border-2 border-red-600 bg-red-600/10 px-6 py-4 text-red-500"
              >
                <p className="font-semibold">{errorMessage}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              className={`rounded-lg border-2 border-red-600 px-12 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 shadow-lg hover:shadow-xl ${
                isSubmitting
                  ? 'bg-gray-600 border-gray-600 cursor-not-allowed opacity-70'
                  : 'bg-red-600 hover:bg-transparent hover:text-red-600'
              }`}
              suppressHydrationWarning
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
}
