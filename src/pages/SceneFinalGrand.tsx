import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Award, Sparkles, Heart, RefreshCw, Moon, Star, Camera } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import confetti from 'canvas-confetti';

export const SceneFinalGrand: React.FC = () => {
  const { dispatch, goToScene } = useApp();
  const { playCelebration, playPop } = useAudioEngine();

  useEffect(() => {
    dispatch({ type: 'SET_NIGHT_MODE', payload: true });
    playCelebration();

    const timer = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.3 },
        colors: ['#FDE047', '#C084FC', '#F472B6'],
      });
    }, 2500);

    return () => clearInterval(timer);
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

        {/* Achievement Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-extrabold px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-2 mb-6 border-2 border-white/80"
        >
          <Award className="w-6 h-6 text-slate-900" />
          <span className="text-base sm:text-lg">First Date Unlocked 🏆</span>
        </motion.div>

        {/* Cats Watching Stars */}
        <div className="relative mb-6">
          <CatIllustration size={220} mood="purring" />
          <div className="absolute -top-3 -right-2 text-2xl animate-pulse">
            ✨🌙✨
          </div>
        </div>

        {/* Cinematic Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 p-8 rounded-3xl shadow-2xl w-full mb-8 text-center"
        >
          <p className="text-slate-300 font-serif italic text-base sm:text-lg mb-4">
            "Every great story begins with a single 'Yes.'" ✨
          </p>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-300 mb-2 font-heading">
            Congratulations! 🎉
          </h3>

          <p className="text-slate-200 text-sm leading-relaxed mb-6 font-medium">
            May it be filled with warm laughter, great conversations, and wonderful moments.
          </p>

          {/* Photo Frame Placeholder */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-dashed border-slate-600 flex flex-col items-center justify-center text-slate-400 gap-2 mb-4">
            <Camera className="w-6 h-6 text-pink-400" />
            <span className="text-xs font-semibold">First Date Photo Memory Frame 📸</span>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-2 text-pink-400 font-bold text-lg">
            <span>See you soon</span>
            <Heart className="w-5 h-5 fill-pink-400" />
          </div>
        </motion.div>

        {/* Replay Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="py-3.5 px-8 rounded-full bg-white/90 text-slate-900 font-extrabold text-sm shadow-xl hover:bg-white transition-all flex items-center gap-2 border border-white"
        >
          <RefreshCw className="w-4 h-4 text-pink-500" />
          <span>Replay Experience</span>
        </motion.button>
      </div>
    </div>
  );
};
