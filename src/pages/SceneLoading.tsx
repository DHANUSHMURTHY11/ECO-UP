import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { CatIllustration } from '../components/CatIllustration';

export const SceneLoading: React.FC = () => {
  const { dispatch, goToScene } = useApp();
  const { playPop } = useAudioEngine();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    playPop(520);
    dispatch({ type: 'START_AUDIO' });
    goToScene('CAT_INTRO');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center text-center max-w-md w-full"
      >
        {/* Cat Illustration */}
        <div className="relative mb-6">
          <CatIllustration size={180} mood="happy" interactive={false} />
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-2 -right-2 bg-pink-100 p-2.5 rounded-full shadow-md text-pink-500 border border-pink-200"
          >
            <Heart className="w-6 h-6 fill-pink-400" />
          </motion.div>
        </div>

        {/* Loading Text */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <span>Preparing something special</span>
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
        </h1>

        <p className="text-gray-600 text-sm mb-8">
          Crafted with cute vibes & lots of warmth ❤️
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/70 backdrop-blur-md rounded-full h-4 p-1 mb-8 shadow-inner border border-white/80">
          <motion.div
            className="bg-gradient-to-r from-pink-400 via-purple-300 to-pink-500 h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Start / Open Button */}
        {progress >= 100 && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-lg shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-3 border border-white/40"
          >
            <span>Tap to Open 💖</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};
