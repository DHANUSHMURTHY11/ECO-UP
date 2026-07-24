import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

export const SceneFlowerGift: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop } = useAudioEngine();

  const handleNext = () => {
    playPop(650);
    goToScene('HEART_CONNECTION');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-md border-2 border-pink-200 p-6 rounded-3xl shadow-xl w-full relative mb-6 text-center"
        >
          <p className="text-gray-800 text-xl sm:text-2xl font-bold font-heading">
            These are for you 🌸✨
          </p>
          <p className="text-xs text-pink-500 font-semibold mt-1">
            (Handpicked with lots of warmth!)
          </p>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-white" />
        </motion.div>

        {/* Story Bouquet Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mb-6 w-64 h-64"
        >
          <CatIllustration
            size={250}
            imageSrc="./assets/story/story_bouquet.png"
            mood="in_love"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleNext}
          className="py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-extrabold text-lg shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40 animate-pulse"
        >
          <span>Thank you 🌸 →</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
