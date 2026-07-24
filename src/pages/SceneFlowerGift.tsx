import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

export const SceneFlowerGift: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop, playCelebration } = useAudioEngine();
  const [returnedWithFlowers, setReturnedWithFlowers] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReturnedWithFlowers(true);
      playCelebration();
    }, 1200);

    return () => clearTimeout(timer);
  }, [playCelebration]);

  const handleNext = () => {
    playPop(650);
    goToScene('HEART_CONNECTION');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated Speech Bubble */}
        <div className="w-full mb-8 min-h-[110px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {returnedWithFlowers ? (
              <motion.div
                key="flowers"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/85 backdrop-blur-md border border-white p-6 rounded-3xl shadow-xl w-full relative"
              >
                <p className="text-gray-800 text-lg sm:text-xl font-bold">
                  These are for you 🌸✨
                </p>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-white" />
              </motion.div>
            ) : (
              <motion.div
                key="wait"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/85 backdrop-blur-md border border-white p-6 rounded-3xl shadow-xl w-full relative"
              >
                <p className="text-gray-800 text-lg font-semibold flex items-center justify-center gap-2">
                  <span>Wait right here!</span>
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cat returning with Flowers */}
        <div className="mb-8 relative">
          <AnimatePresence mode="wait">
            {returnedWithFlowers ? (
              <motion.div
                key="with-flowers"
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative"
              >
                <CatIllustration size={230} mood="in_love" />
                {/* Bouquet overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl animate-bounce">
                  💐
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="away"
                exit={{ opacity: 0, scale: 0.5 }}
                className="w-[230px] h-[230px]"
              />
            )}
          </AnimatePresence>
        </div>

        {returnedWithFlowers && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-base shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40 animate-pulse"
          >
            <span>Thank you 🌸 →</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
