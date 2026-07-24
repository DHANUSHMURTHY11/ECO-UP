import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

export const SceneMiniGame: React.FC = () => {
  const { state, dispatch, goToScene } = useApp();
  const { playPurr, playCelebration } = useAudioEngine();

  const handlePet = () => {
    playPurr();
    dispatch({ type: 'PET_CAT', payload: 15 });

    if (state.petProgress + 15 >= 100 && state.petProgress < 100) {
      playCelebration();
    }
  };

  const handleNext = () => {
    goToScene('SUSPENSE_PROPOSAL');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 font-bold text-xs uppercase tracking-wider border border-pink-200 inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Mini-Game
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Pet the Kitten! 🐾
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Tap or pet the cat to fill its happiness meter ❤️
          </p>
        </motion.div>

        {/* Happiness Meter */}
        <div className="w-full bg-white/70 backdrop-blur-md rounded-full h-5 p-1 mb-6 shadow-inner border border-white/80 relative">
          <motion.div
            className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-300"
            style={{ width: `${state.petProgress}%` }}
          >
            {state.petProgress > 15 && (
              <Heart className="w-3.5 h-3.5 text-white fill-white animate-ping" />
            )}
          </motion.div>

          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
            {state.petProgress}% Happy
          </span>
        </div>

        {/* Petting Zone with Cat */}
        <div
          onClick={handlePet}
          onTouchStart={handlePet}
          className="relative my-4 cursor-pointer group"
        >
          <motion.div
            animate={
              state.petProgress >= 100
                ? { scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }
                : { scale: 1 }
            }
            transition={{ repeat: state.petProgress >= 100 ? Infinity : 0, duration: 1.5 }}
          >
            <CatIllustration
              size={230}
              mood={
                state.petProgress >= 100
                  ? 'excited'
                  : state.petProgress > 40
                  ? 'purring'
                  : 'happy'
              }
              interactive={false}
            />
          </motion.div>

          {/* Floating Heart indicator on hover/pet */}
          <div className="absolute -top-4 right-2 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-pink-200 group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6 text-pink-500 fill-pink-400 animate-bounce" />
          </div>
        </div>

        {/* Continue Button (unlocked at 100%) */}
        {state.petProgress >= 100 ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="mt-6 py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-base shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40 animate-bounce"
          >
            <span>Super Happy! Next →</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        ) : (
          <p className="text-xs text-pink-500 font-semibold mt-4">
            Keep tapping to reach 100%! 💕
          </p>
        )}
      </div>
    </div>
  );
};
