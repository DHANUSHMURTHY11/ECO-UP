import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
    image: './assets/memories/slide2.png',
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
    image: './assets/memories/slide5.png',
    caption: 'One day... This could be us too. ✨',
    subcaption: 'A cozy little world',
  },
];

export const SceneMemoriesGallery: React.FC = () => {
  const { dispatch, goToScene } = useApp();
  const { playPop } = useAudioEngine();
  const [index, setIndex] = useState(0);

  const handleNextSlide = () => {
    playPop(650);
    if (index < slides.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      // Transition to Golden Hour Proposal Scene!
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
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-600 font-extrabold text-xs uppercase tracking-wider border border-pink-200 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Love Memories ({index + 1} / {slides.length})</span>
        </motion.div>

        {/* Slide Image Card with Bokeh & Floating Glow */}
        <div className="w-full relative mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white/85 backdrop-blur-xl border-2 border-white p-4 sm:p-5 rounded-3xl shadow-2xl overflow-hidden relative"
            >
              {/* Image Frame */}
              <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden relative shadow-inner bg-slate-100 flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.caption}
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Heart Overlay */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md text-pink-500">
                  <Heart className="w-5 h-5 fill-pink-400 animate-pulse" />
                </div>
              </div>

              {/* Caption */}
              <div className="pt-4 pb-2 px-2 text-center">
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1 leading-snug">
                  {slide.caption}
                </h3>
                <p className="text-xs text-pink-500 font-semibold italic">
                  {slide.subcaption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Navigation Controls */}
        <div className="flex items-center justify-between w-full gap-3">
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

          {index < slides.length - 1 && (
            <div className="w-10 h-10 flex items-center justify-center text-xs font-bold text-pink-500 bg-white/70 rounded-full border border-white">
              {index + 1}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
