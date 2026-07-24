import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { ArrowRight, Heart } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

const steps = [
  { text: "I've been thinking...", mood: 'shy' as const },
  { text: "Since the day we started talking...", mood: 'embarrassed' as const },
  { text: "You've made me smile more than you know. 💖", mood: 'in_love' as const },
];

export const SceneHeartConnection: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop } = useAudioEngine();
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    playPop(620);
    if (index < steps.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      goToScene('POEM_ONE');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated Speech Bubble */}
        <div className="w-full mb-8 min-h-[110px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="bg-white/85 backdrop-blur-md border border-white p-6 rounded-3xl shadow-xl w-full relative"
            >
              <p className="text-gray-800 text-lg sm:text-xl font-bold leading-relaxed">
                {steps[index].text}
              </p>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-white" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center shadow-md mb-4 border border-pink-200"
        >
          <Heart className="w-6 h-6 text-pink-500 fill-pink-400" />
        </motion.div>

        {/* Chibi Cat */}
        <CatIllustration size={220} mood={steps[index].mood} />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="mt-8 py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-base shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40"
        >
          <span>{index < steps.length - 1 ? 'Next →' : 'Continue ❤️'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};
