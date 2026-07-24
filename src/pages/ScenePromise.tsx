import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, ArrowRight, ChevronLeft } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

const promises = [
  {
    id: 1,
    image: './assets/promises/promise1.jpg',
    caption: 'In a room full of people...',
    text: "I'd look for you so we can leave. ❤️",
  },
  {
    id: 2,
    image: './assets/promises/promise2.jpg',
    caption: 'Because you are the party...',
    text: "Everything else is just noise I tolerate until we're alone. ✨",
  },
  {
    id: 3,
    image: './assets/promises/promise3.png',
    caption: 'And then one look from you...',
    text: 'Across the room that says everything. 🥹💖',
  },
];

export const ScenePromise: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop } = useAudioEngine();
  const [index, setIndex] = useState(0);

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
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mb-4 flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-lg sm:text-xl tracking-wide border-2 border-white shadow-xl animate-pulse"
        >
          <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
          <span>I PROMISE ! 💖</span>
          <Heart className="w-5 h-5 fill-white" />
        </motion.div>

        {/* Promise Image Card */}
        <div className="w-full relative mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white/90 backdrop-blur-xl border-2 border-pink-200 p-4 sm:p-5 rounded-3xl shadow-2xl overflow-hidden relative"
            >
              {/* Image Frame */}
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden relative shadow-inner bg-slate-900 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-contain rounded-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Caption */}
              <div className="pt-4 pb-2 px-2 text-center">
                <p className="text-xs text-pink-500 font-extrabold uppercase tracking-wider mb-1">
                  {item.caption}
                </p>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 leading-snug font-heading">
                  {item.text}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between w-full gap-3">
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
        </div>
      </div>
    </div>
  );
};
