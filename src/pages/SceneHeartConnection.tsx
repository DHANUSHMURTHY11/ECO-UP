import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { ArrowRight, Heart } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

const steps = [
  {
    text: "I've been thinking...",
    image: "./assets/story/story_thinking.png",
    mood: 'shy' as const,
    subtext: "Quietly reminiscing..."
  },
  {
    text: "Since the day we started talking...",
    image: "./assets/story/story_chatting.png",
    mood: 'embarrassed' as const,
    subtext: "Sipping coffee, smiling at my screen ☕"
  },
  {
    text: "When I think about my feelings...",
    image: "./assets/story/story_dream.png",
    mood: 'in_love' as const,
    subtext: "I imagine this adorable future of us together 💭❤️"
  },
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

  const step = steps[index];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated Speech Bubble */}
        <div className="w-full mb-6 min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="bg-white/90 backdrop-blur-md border-2 border-pink-200 p-6 rounded-3xl shadow-xl w-full relative"
            >
              <p className="text-gray-800 text-xl sm:text-2xl font-bold font-heading leading-relaxed">
                {step.text}
              </p>
              <p className="text-xs text-pink-500 font-semibold italic mt-1">
                {step.subtext}
              </p>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-white" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Story Image Frame */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="mb-6 w-64 h-64"
          >
            <CatIllustration
              size={250}
              imageSrc={step.image}
              mood={step.mood}
            />
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleNext}
          className="py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-extrabold text-lg shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40"
        >
          <span>{index < steps.length - 1 ? 'Next →' : 'Read Poem ✉️'}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
