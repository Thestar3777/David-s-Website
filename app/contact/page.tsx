'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

interface PlatformStats {
  youtube: {
    subscribers: number;
    totalViews: number;
  };
}

export default function ContactPage() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiry: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    fetch('/api/platformStats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  useEffect(() => {
    if (submitStatus.type === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `${formData.inquiry ? `Inquiry Type: ${formData.inquiry}\n` : ''}${formData.company ? `Company: ${formData.company}\n\n` : ''}${formData.message}`
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.',
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          inquiry: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
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
            Contact / Inquiries
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl leading-relaxed md:leading-loose text-gray-300"
          >
            Business inquiries, brand partnerships, and collaboration opportunities.
          </motion.p>
        </div>
      </motion.section>

      {/*

      <section className="border-t border-gray-800/50 px-6 md:px-8 py-24 md:py-32 lg:py-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-10 md:mb-12 text-4xl font-black uppercase tracking-tighter md:text-5xl lg:text-6xl">
              Get In Touch
            </h2>
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-lg mb-6 ${
                  submitStatus.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/50 text-green-400'
                    : 'bg-red-500/10 border border-red-500/50 text-red-400'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-10" suppressHydrationWarning>
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
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full border-b-2 border-gray-700 bg-transparent px-0 py-5 text-lg md:text-xl text-white placeholder-gray-600 focus:border-white focus:outline-none transition-all duration-300"
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
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full border-b-2 border-gray-700 bg-transparent px-0 py-5 text-lg md:text-xl text-white placeholder-gray-600 focus:border-white focus:outline-none transition-all duration-300"
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
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company / Organization"
                  className="w-full border-b-2 border-gray-700 bg-transparent px-0 py-5 text-lg md:text-xl text-white placeholder-gray-600 focus:border-white focus:outline-none transition-all duration-300"
                  suppressHydrationWarning
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <select
                  id="inquiry"
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleInputChange}
                  className={`w-full border-b-2 border-gray-700 bg-transparent px-0 py-5 text-lg md:text-xl focus:border-white focus:outline-none transition-all duration-300 ${
                    formData.inquiry ? 'text-white' : 'text-gray-600'
                  }`}
                  required
                  suppressHydrationWarning
                >
                  <option value="" className="bg-black text-gray-400">Inquiry Type</option>
                  <option value="Brand Partnership" className="bg-black text-white">Brand Partnership</option>
                  <option value="Sponsorship" className="bg-black text-white">Sponsorship</option>
                  <option value="Content Collaboration" className="bg-black text-white">Content Collaboration</option>
                  <option value="Press / Media" className="bg-black text-white">Press / Media</option>
                  <option value="Other" className="bg-black text-white">Other</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Message"
                  className="w-full border-b-2 border-gray-700 bg-transparent px-0 py-5 text-lg md:text-xl text-white placeholder-gray-600 focus:border-white focus:outline-none transition-all duration-300"
                  required
                  suppressHydrationWarning
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`rounded-lg border-2 border-white px-12 py-5 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isSubmitting
                    ? 'bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-transparent hover:text-white'
                }`}
                suppressHydrationWarning
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-14 lg:space-y-16"
          >
            <div>
              <h2 className="mb-10 md:mb-12 text-4xl font-black uppercase tracking-tighter md:text-5xl lg:text-6xl">
                Press Kit
              </h2>

              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="mb-6 text-2xl font-black uppercase tracking-tighter text-gray-400">
                    Platform Stats
                  </h3>
                  <div className="space-y-6">
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="border-l-4 border-white pl-6 transition-all duration-300"
                    >
                      <p className="text-base md:text-lg text-gray-500 mb-2">YouTube Subscribers</p>
                      <p className="text-3xl md:text-4xl font-bold">
                        {stats ? formatNumber(stats.youtube.subscribers) : <span className="text-gray-600">Loading...</span>}
                      </p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="border-l-4 border-white pl-6 transition-all duration-300"
                    >
                      <p className="text-base md:text-lg text-gray-500 mb-2">Total Views</p>
                      <p className="text-3xl md:text-4xl font-bold">
                        {stats ? formatNumber(stats.youtube.totalViews) : <span className="text-gray-600">Loading...</span>}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="mb-6 text-2xl font-black uppercase tracking-tighter text-gray-400">
                    Connect :
                  </h3>
                  <div className="space-y-5">
                    <motion.a
                      href="https://www.youtube.com/@davikobox"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 text-lg md:text-xl text-gray-400 transition-colors hover:text-white group"
                    >
                      <span className="font-bold uppercase tracking-widest">YouTube</span>
                      <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="https://instagram.com/night.lxver"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 text-lg md:text-xl text-gray-400 transition-colors hover:text-white group"
                    >
                      <span className="font-bold uppercase tracking-widest">Instagram</span>
                      <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="https://www.tiktok.com/@davidhervas77"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 text-lg md:text-xl text-gray-400 transition-colors hover:text-white group"
                    >
                      <span className="font-bold uppercase tracking-widest">Tiktok</span>
                      <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
