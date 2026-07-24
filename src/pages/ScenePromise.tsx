import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, ArrowRight, ChevronLeft } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

const promises = [
  {
    id: 1,
    image: './assets/promises/promise1.jpg',
  },
  {
    id: 2,
    image: './assets/promises/promise2.jpg',
  },
  {
    id: 3,
    image: './assets/promises/promise3.png',
  },
];

export const ScenePromise: React.FC = () => {
  const { goToScene } = useApp();
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

  const handleNext = () => {
    playPop(650);
    if (index < promises.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      goToScene('MEMORIES_GALLERY');
    }
  };

  const handlePrev = () => {
    playPop(500);
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const item = promises[index];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated Title: Big Fullscreen Center for 3 seconds */}
        <motion.div
          animate={
            isTitleCentered
              ? { scale: [1.8, 2.2, 1.8], y: 160, opacity: 1 }
              : { scale: 1, y: 0, opacity: 1 }
          }
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-extrabold text-xl sm:text-2xl tracking-wide border-4 border-white shadow-2xl z-50 cursor-pointer"
          onClick={() => setIsTitleCentered(false)}
        >
          <Sparkles className="w-6 h-6 text-amber-300 fill-amber-300 animate-spin" />
          <span>I PROMISE ! 💖</span>
          <Heart className="w-6 h-6 fill-white animate-pulse" />
        </motion.div>

        {/* Promise Image Card - Clean Without Text Below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isTitleCentered ? 0.4 : 1, y: 0 }}
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
              className="bg-white/90 backdrop-blur-xl border-2 border-pink-200 p-3 sm:p-4 rounded-3xl shadow-2xl overflow-hidden relative"
            >
              {/* Clean Image Frame */}
              <div className="w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden relative shadow-inner bg-slate-900 flex items-center justify-center">
                <img
                  src={item.image}
                  alt="Promise"
                  className="w-full h-full object-contain rounded-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          animate={{ opacity: isTitleCentered ? 0.3 : 1 }}
          className="flex items-center justify-between w-full gap-3"
        >
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className="p-3.5 rounded-full bg-white/80 backdrop-blur-md border border-white text-gray-700 font-bold shadow-md hover:bg-white transition-all disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Previous Promise"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleNext}
            className="flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-base shadow-xl hover:shadow-pink-300 transition-all flex items-center justify-center gap-2 border border-white/50 animate-pulse"
          >
            <span>{index < promises.length - 1 ? 'Next Promise →' : 'THIS COULD BE US !! ✨'}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
