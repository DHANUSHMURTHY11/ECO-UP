import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

const poemLines = [
  "Roses are red 🌹",
  "The sky is blue 💙",
  "We recently met,",
  "But I'd love to know you.",
  "Maybe a coffee, maybe a walk,",
  "Maybe a lovely evening,",
  "Filled with laughter and talk. ✨",
];

export const ScenePoemOne: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop } = useAudioEngine();

  const handleNext = () => {
    playPop(650);
    goToScene('PET_GAME');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Glass Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full bg-white/75 backdrop-blur-lg border border-white/80 p-8 rounded-3xl shadow-2xl text-center mb-8 relative overflow-hidden"
        >
          {/* Subtle Corner Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/50 rounded-full blur-2xl -z-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/50 rounded-full blur-2xl -z-10" />

          {/* Icon Header */}
          <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-pink-300 to-purple-300 flex items-center justify-center shadow-md border border-white">
            <Heart className="w-7 h-7 text-white fill-white" />
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
            <span>A Little Rhyme</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </h2>

          {/* Staggered Animated Lines */}
          <div className="space-y-3 mb-4">
            {poemLines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.25 }}
                className={`text-base sm:text-lg ${
                  idx === 2 || idx === 3 || idx === 6
                    ? 'font-bold text-pink-600'
                    : 'text-gray-700 font-medium'
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-base shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40"
        >
          <span>Next Surprise →</span>
        </motion.button>
      </div>
    </div>
  );
};
