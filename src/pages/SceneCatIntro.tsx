import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { ArrowRight } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

const storySteps = [
  { text: "Hiii!! 👋", mood: 'waving' as const },
  { text: "I'm really happy you're here.", mood: 'happy' as const },
  { text: "Can I steal just two minutes of your time?", mood: 'shy' as const },
  { text: "I promise it'll be worth it. 🥹", mood: 'nervous' as const },
];

export const SceneCatIntro: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop } = useAudioEngine();
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    playPop(600);
    if (index < storySteps.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      goToScene('FLOWER_GIFT');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated Speech Bubble with Cute Hand-written Styling */}
        <div className="w-full mb-6 relative min-h-[110px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="bg-white/90 backdrop-blur-md border-2 border-pink-200 p-6 rounded-3xl shadow-xl text-center relative w-full"
            >
              <p className="text-gray-800 text-xl sm:text-2xl font-bold font-heading leading-relaxed">
                {storySteps[index].text}
              </p>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-white" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Story Cat Image Frame */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 w-64 h-64"
        >
          <CatIllustration
            size={250}
            imageSrc="./assets/story/story_intro.png"
            mood={storySteps[index].mood}
          />
        </motion.div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleNext}
          className="py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-extrabold text-lg shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40"
        >
          <span>{index < storySteps.length - 1 ? 'Next →' : 'Sure! ✨'}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
