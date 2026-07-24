import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { DeliveryCarSVG } from '../components/DeliveryCarSVG';
import { CatIllustration } from '../components/CatIllustration';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

export const SceneDeliveryCar: React.FC = () => {
  const { goToScene } = useApp();
  const { playCarHonk, playPop } = useAudioEngine();
  const [carStopped, setCarStopped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      playCarHonk();
      setCarStopped(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [playCarHonk]);

  const handleOpenContract = () => {
    playPop(700);
    goToScene('CONTRACT');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none overflow-hidden">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 font-bold text-xs uppercase tracking-wider border border-pink-200 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Special Delivery
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2">
            Express Delivery! 🚚
          </h2>
        </motion.div>

        {/* Driving Car Animation */}
        <div className="relative w-full h-[180px] my-4 flex items-center justify-center">
          <motion.div
            initial={{ x: '-120%' }}
            animate={{ x: carStopped ? '0%' : '120%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="w-full max-w-[280px]"
          >
            <DeliveryCarSVG />
          </motion.div>
        </div>

        {/* Cat & Speech Bubble once car stops */}
        {carStopped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center mt-2"
          >
            <div className="bg-white/85 backdrop-blur-md border border-white p-4 rounded-2xl shadow-lg mb-4">
              <p className="text-gray-800 font-semibold text-base">
                "Beep beep! Here is the Official Agreement scroll!" 📜✨
              </p>
            </div>

            <CatIllustration size={160} mood="waving" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenContract}
              className="mt-6 py-4 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-extrabold text-base shadow-xl hover:shadow-pink-200 transition-all flex items-center gap-2 border border-white/40 animate-bounce"
            >
              <span>Unroll Agreement ✍️</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
