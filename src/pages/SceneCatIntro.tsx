import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

const dialogues = [
  "Hi there! 😊",
  "My human has been smiling at their phone a lot lately...",
  "I think you might be the reason. 🐾",
];

export const SceneCatIntro: React.FC = () => {
  const { state, goToScene } = useApp();
  const { playPop } = useAudioEngine();
  const [stepIndex, setStepIndex] = useState(0);

  const handleNextDialogue = () => {
    playPop(600);
    if (stepIndex < dialogues.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      goToScene('POEM_ONE');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Animated Speech Bubble */}
        <div className="w-full mb-8 relative min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex + (state.catTapCount > 9 ? '-secret' : '')}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              className="bg-white/80 backdrop-blur-md border border-white p-6 rounded-3xl shadow-xl text-center relative w-full"
            >
              <p className="text-gray-800 text-lg sm:text-xl font-medium leading-relaxed">
                {state.catTapCount >= 10
                  ? "I think my human REALLY likes you! 💕"
                  : dialogues[stepIndex]}
              </p>

              {/* Speech bubble arrow pointer */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-white" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cat Graphic */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-8"
        >
          <CatIllustration
            size={220}
            mood={state.catTapCount >= 10 ? 'blushing' : 'waving'}
          />
          <p className="text-xs text-center text-gray-500 mt-2 font-medium">
            💡 Tap the cat for a cute reaction!
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextDialogue}
          className="py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-base shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40"
        >
          <span>{stepIndex < dialogues.length - 1 ? 'Next →' : 'Continue ❤️'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};
