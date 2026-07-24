import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Heart, Sparkles } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

const suspenseSteps = [
  { text: "I've been carrying a tiny secret... 🤫", mood: 'shy' as const },
  { text: "I'm a little nervous to ask... 💓", mood: 'blushing' as const },
  { text: "Here goes nothing...", mood: 'excited' as const },
];

export const SceneSuspenseProposal: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop } = useAudioEngine();
  const [index, setIndex] = useState(0);

  const handleAdvance = () => {
    playPop(700);
    if (index < suspenseSteps.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      goToScene('PROPOSAL_QUESTION');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated Speech Bubble */}
        <div className="w-full mb-8 min-h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -15 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="bg-white/85 backdrop-blur-md border border-white p-6 rounded-3xl shadow-xl w-full relative"
            >
              <p className="text-gray-800 text-lg sm:text-xl font-bold">
                {suspenseSteps[index].text}
              </p>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-white" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Beating Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.3, 1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center shadow-md mb-6 border border-pink-200"
        >
          <Heart className="w-8 h-8 text-pink-500 fill-pink-400" />
        </motion.div>

        {/* Cat */}
        <CatIllustration size={210} mood={suspenseSteps[index].mood} />

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdvance}
          className="mt-8 py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-base shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40"
        >
          <span>{index < suspenseSteps.length - 1 ? 'Listen...' : 'Show Question ✨'}</span>
        </motion.button>
      </div>
    </div>
  );
};
