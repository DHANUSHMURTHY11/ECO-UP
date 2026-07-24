import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Moon, Star, Heart, RefreshCw } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import confetti from 'canvas-confetti';

const typedLines = [
  "Thank you...",
  "For giving me a chance.",
  "I genuinely can't wait to meet you.",
  "See you soon ❤️",
];

export const SceneFinalGrand: React.FC = () => {
  const { dispatch, goToScene } = useApp();
  const { playCelebration, playPop } = useAudioEngine();
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    dispatch({ type: 'SET_NIGHT_MODE', payload: true });
    playCelebration();

    const interval = setInterval(() => {
      setLineIndex((prev) => {
        if (prev >= typedLines.length - 1) {
          clearInterval(interval);
          return typedLines.length - 1;
        }
        return prev + 1;
      });
    }, 2800);

    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 25,
        spread: 70,
        origin: { y: 0.3 },
        colors: ['#FDE047', '#C084FC', '#F472B6'],
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(confettiInterval);
    };
  }, [dispatch, playCelebration]);

  const handleRestart = () => {
    playPop(500);
    dispatch({ type: 'SET_NIGHT_MODE', payload: false });
    dispatch({ type: 'RESET_APP' });
    goToScene('CAT_INTRO');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none text-white">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Starry Moon Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 text-yellow-300 font-bold text-xs shadow-lg mb-6"
        >
          <Moon className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span>A Magical Night</span>
          <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-spin" />
        </motion.div>

        {/* Cats Sitting Together Watching Fireflies */}
        <div className="relative mb-6">
          <CatIllustration size={230} mood="purring" showPair />
          <div className="absolute -top-3 -right-2 text-2xl animate-pulse">
            ✨🌙✨
          </div>
        </div>

        {/* Typed Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 p-8 rounded-3xl shadow-2xl w-full mb-8 text-center min-h-[160px] flex flex-col items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl font-extrabold text-pink-300 font-heading leading-relaxed"
            >
              {typedLines[lineIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Replay Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="py-3.5 px-8 rounded-full bg-white/90 text-slate-900 font-extrabold text-sm shadow-xl hover:bg-white transition-all flex items-center gap-2 border border-white"
        >
          <RefreshCw className="w-4 h-4 text-pink-500" />
          <span>Replay Story</span>
        </motion.button>
      </div>
    </div>
  );
};
