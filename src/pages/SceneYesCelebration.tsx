import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import confetti from 'canvas-confetti';

export const SceneYesCelebration: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop, playCelebration } = useAudioEngine();

  useEffect(() => {
    playCelebration();
    const interval = setInterval(() => {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: ['#FF85A1', '#FFD6E8', '#DCC6FF', '#FFD166'],
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [playCelebration]);

  const handleNext = () => {
    playPop(750);
    goToScene('DELIVERY_CAR');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Celebration Banner */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mb-6 flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-pink-500 text-white font-extrabold text-sm shadow-lg border border-pink-300 animate-bounce"
        >
          <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
          <span>YES! YAYYY! 🎉</span>
        </motion.div>

        {/* Dancing Cat */}
        <motion.div
          animate={{ rotate: [-4, 4, -4], y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="mb-6"
        >
          <CatIllustration size={230} mood="excited" />
        </motion.div>

        {/* Text Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/85 backdrop-blur-lg border border-white p-8 rounded-3xl shadow-2xl w-full mb-8 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4 border border-pink-200">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-400 animate-pulse" />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            You just made someone's day! 💕
          </h2>
          <p className="text-gray-600 text-base font-medium">
            Wait! There's an express delivery arriving for you... 🚚📜
          </p>
        </motion.div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="py-4 px-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold text-lg shadow-xl hover:shadow-purple-200 transition-all flex items-center gap-3 border border-white/50 animate-pulse"
        >
          <span>Open Express Delivery 📜</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
