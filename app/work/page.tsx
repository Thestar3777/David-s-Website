'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { extractYouTubeId, getThumbnailUrls } from '../../lib/youtube';
import Footer from '../components/Footer';

type VideoCategory = 'all' | 'training' | 'travel' | 'creative' | 'sketches';

interface Video {
  id: string;
  title: string;
  category: VideoCategory;
  thumbnail: string;
  videoId: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Advanced Boxing Combinations',
    category: 'training',
    thumbnail: '/thumbnails/video1.jpg',
    videoId: 'v3eW59lQLyk',
  },
  {
    id: '2',
    title: 'Tokyo Training Montage',
    category: 'travel',
    thumbnail: '/thumbnails/video2.jpg',
    videoId: 'r-OMM1CxzEM',
  },
  {
    id: '3',
    title: 'Fight Choreography Breakdown',
    category: 'creative',
    thumbnail: '/thumbnails/video3.jpg',
    videoId: 'bdi4Ry7xHVQ',
  },
  {
    id: '4',
    title: 'Behind the Scenes Comedy',
    category: 'sketches',
    thumbnail: '/thumbnails/video4.jpg',
    videoId: '0JQtlx618jw',
  },
  {
    id: '5',
    title: 'Kickboxing Fundamentals',
    category: 'training',
    thumbnail: '/thumbnails/video5.jpg',
    videoId: 'ib9wPEdIDTA',
  },
  {
    id: '6',
    title: 'Thailand Muay Thai Journey',
    category: 'travel',
    thumbnail: '/thumbnails/video6.jpg',
    videoId: 'bEDx6p1aXV4',
  },
  {
    id: '7',
    title: 'Cinematic Action Sequence',
    category: 'creative',
    thumbnail: '/thumbnails/video7.jpg',
    videoId: '-lFUsIQd-F4',
  },
  {
    id: '8',
    title: 'Training Day Parody',
    category: 'sketches',
    thumbnail: '/thumbnails/video8.jpg',
    videoId: 'jH--0tJJTBE',
  },
  {
    id: '9',
    title: 'Advanced Boxing Combinations',
    category: 'training',
    thumbnail: '/thumbnails/video1.jpg',
    videoId: 'b5cb9345RYU',
  },
  {
    id: '10',
    title: 'Tokyo Training Montage',
    category: 'travel',
    thumbnail: '/thumbnails/video2.jpg',
    videoId: 'kQoQQivj2e0',
  },
  {
    id: '11',
    title: 'Fight Choreography Breakdown',
    category: 'creative',
    thumbnail: '/thumbnails/video3.jpg',
    videoId: 'boQLRFVvjWY',
  },
  {
    id: '12',
    title: 'Behind the Scenes Comedy',
    category: 'sketches',
    thumbnail: '/thumbnails/video4.jpg',
    videoId: 'UgAjDg6MYxE',
  },
  {
    id: '13',
    title: 'Kickboxing Fundamentals',
    category: 'training',
    thumbnail: '/thumbnails/video5.jpg',
    videoId: 'nAlibKzXkUY',
  },
  {
    id: '14',
    title: 'Thailand Muay Thai Journey',
    category: 'travel',
    thumbnail: '/thumbnails/video6.jpg',
    videoId: 'zrs2AGI6CZ8',
  },
  {
    id: '15',
    title: 'Cinematic Action Sequence',
    category: 'creative',
    thumbnail: '/thumbnails/video7.jpg',
    videoId: '_cE9RB6SLr8',
  },
  {
    id: '16',
    title: 'Training Day Parody',
    category: 'sketches',
    thumbnail: '/thumbnails/video8.jpg',
    videoId: 'd0pyeIfv2SQ',
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoTitles, setVideoTitles] = useState<Record<string, string>>({});

  const categories: { value: VideoCategory; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'training', label: 'Training & Combat' },
    { value: 'travel', label: 'Travel / Documentary' },
    { value: 'creative', label: 'Creative / Commercial' },
    { value: 'sketches', label: 'Sketches & Entertainment' },
  ];

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(video => video.category === activeCategory);

  // Fetch YouTube titles for all videos
  useEffect(() => {
    videos.forEach(video => {
      const youtubeId = extractYouTubeId(video.videoId);
      if (!videoTitles[youtubeId]) {
        fetch(`/api/videoTitle?id=${youtubeId}`)
          .then(res => res.json())
          .then(data => {
            if (data?.title) {
              setVideoTitles(prev => ({ ...prev, [youtubeId]: data.title }));
            }
          })
          .catch(() => {
            // Silently fail - will use fallback title
          });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to get display title
  const getVideoTitle = (video: Video) => {
    const youtubeId = extractYouTubeId(video.videoId);
    return videoTitles[youtubeId] || video.title;
  };

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden overflow-y-hidden pt-20 md:pt-0">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="px-6 md:px-8 py-24 md:py-32 lg:py-40 pt-36 md:pt-32 lg:pt-40"
      >
        <div className="mx-auto max-w-7xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-16 md:mb-20 text-4xl sm:text-5xl font-black uppercase tracking-tighter md:text-6xl lg:text-7xl leading-tight"
          >
            My Work
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 md:mb-20 flex flex-wrap gap-4"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-lg border-2 px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === category.value
                    ? 'border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'border-gray-800 bg-transparent text-gray-400 hover:border-red-600 hover:text-red-600'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-10 md:gap-12 lg:gap-14 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-charcoal mb-5 rounded-lg shadow-xl">
                    <img
                      src={getThumbnailUrls(video.videoId).max}
                      alt={getVideoTitle(video)}
                      onError={(e) => { e.currentTarget.src = getThumbnailUrls(video.videoId).hq; }}
                      className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="h-20 w-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl backdrop-blur-sm"
                      >
                        <svg
                          className="ml-1 h-8 w-8 text-black"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">
                      {video.category === 'training' && 'Training & Combat'}
                      {video.category === 'travel' && 'Travel / Documentary'}
                      {video.category === 'creative' && 'Creative / Commercial'}
                      {video.category === 'sketches' && 'Sketches & Entertainment'}
                    </p>
                    <h3 className="text-base md:text-lg font-semibold leading-snug text-gray-200 line-clamp-2 group-hover:text-white transition-colors duration-300">
                      {getVideoTitle(video)}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-6"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-6 md:right-8 top-6 md:top-8 text-4xl md:text-5xl font-bold text-white transition-all hover:text-red-600 z-10"
              onClick={() => setSelectedVideo(null)}
            >
              ×
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full rounded-lg overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="mt-8 px-2">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter text-white">
                  {getVideoTitle(selectedVideo)}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
