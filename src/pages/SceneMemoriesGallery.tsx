import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, ArrowRight, ChevronLeft } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

const slides = [
  {
    id: 1,
    image: './assets/memories/slide1.png',
    caption: 'This could be us someday... ❤️',
    subcaption: '"I meow you"',
  },
  {
    id: 2,
    image: './assets/memories/hug_videoframe.png',
    caption: "I'd happily steal a hug like this someday. 🥹",
    subcaption: 'Warm cozy cuddles',
  },
  {
    id: 3,
    image: './assets/memories/slide3.jpg',
    caption: 'Maybe one day... just maybe... ❤️',
    subcaption: 'Sweet forehead kisses',
  },
  {
    id: 4,
    image: './assets/memories/slide4.png',
    caption: "I'll protect you like this little guy. 😂",
    subcaption: 'Big tight bear hugs!',
  },
  {
    id: 5,
    image: './assets/memories/titanic_cats.png',
    caption: 'One day this could be us ✨',
    subcaption: 'An epic love story...',
  },
];

export const SceneMemoriesGallery: React.FC = () => {
  const { dispatch, goToScene } = useApp();
  const { playPop } = useAudioEngine();
  const [index, setIndex] = useState(0);
  const [isTitleCentered, setIsTitleCentered] = useState(true);

  // Stay centered & big for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTitleCentered(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNextSlide = () => {
    playPop(650);
    if (index < slides.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      dispatch({ type: 'SET_GOLDEN_HOUR', payload: true });
      goToScene('PROPOSAL_QUESTION');
    }
  };

  const handlePrevSlide = () => {
    playPop(500);
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const slide = slides[index];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated Title: Big Center for 3 Seconds */}
        <motion.div
          animate={
            isTitleCentered
              ? { scale: [1.8, 2.2, 1.8], y: 160, opacity: 1 }
              : { scale: 1, y: 0, opacity: 1 }
          }
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-pink-500 text-white font-extrabold text-lg sm:text-xl tracking-wide border-4 border-white shadow-2xl z-50 cursor-pointer"
          onClick={() => setIsTitleCentered(false)}
        >
          <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-spin" />
          <span>THIS COULD BE US !! ✨</span>
          <Heart className="w-5 h-5 fill-white animate-pulse" />
        </motion.div>

        {/* Slide Image Card */}
        <motion.div
          animate={{ opacity: isTitleCentered ? 0.35 : 1 }}
          transition={{ duration: 0.6 }}
          className="w-full relative mb-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white/90 backdrop-blur-xl border-2 border-white p-4 sm:p-5 rounded-3xl shadow-2xl overflow-hidden relative"
            >
              {/* Image Frame */}
              <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden relative shadow-inner bg-slate-100 flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.caption}
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md text-pink-500">
                  <Heart className="w-5 h-5 fill-pink-400 animate-pulse" />
                </div>
              </div>

              {/* Caption */}
              <div className="pt-4 pb-2 px-2 text-center">
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1 leading-snug font-heading">
                  {slide.caption}
                </h3>
                <p className="text-xs text-pink-500 font-bold italic">
                  {slide.subcaption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Slide Navigation Controls */}
        <motion.div
          animate={{ opacity: isTitleCentered ? 0.3 : 1 }}
          className="flex items-center justify-between w-full gap-3"
        >
          <button
            onClick={handlePrevSlide}
            disabled={index === 0}
            className="p-3.5 rounded-full bg-white/80 backdrop-blur-md border border-white text-gray-700 font-bold shadow-md hover:bg-white transition-all disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleNextSlide}
            className="flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-base shadow-xl hover:shadow-pink-300 transition-all flex items-center justify-center gap-2 border border-white/50 animate-pulse"
          >
            <span>{index < slides.length - 1 ? 'Next Memory →' : 'One Tiny Question ✨'}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
