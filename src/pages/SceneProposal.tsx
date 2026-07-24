import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Heart, Sparkles, Frown } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import confetti from 'canvas-confetti';

const noButtonPrompts = [
  "No 🙈",
  "Are you sure? 🥺",
  "The cat will be sad 😿",
  "Maybe think once more? ❤️",
  "No 🙈",
];

export const SceneProposal: React.FC = () => {
  const { state, dispatch, goToScene } = useApp();
  const { playPop, playCelebration } = useAudioEngine();
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleDodgeNo = () => {
    playPop(350);
    if (dodgeCount < 3) {
      // Calculate playful offset
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 100;
      setNoPosition({ x: randomX, y: randomY });
      setDodgeCount((prev) => prev + 1);
      dispatch({ type: 'INCREMENT_NO_DODGE' });
    }
  };

  const handleNoClick = () => {
    playPop(300);
    dispatch({ type: 'SET_PROPOSAL_RESULT', payload: 'declined' });
    goToScene('NO_GRACEFUL');
  };

  const handleYesClick = () => {
    playCelebration();
    dispatch({ type: 'SET_PROPOSAL_RESULT', payload: 'accepted' });

    // Trigger Confetti Storm
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF85A1', '#FFD6E8', '#DCC6FF', '#FFD166'],
    });

    goToScene('YES_CELEBRATION');
  };

  const noLabel = noButtonPrompts[Math.min(dodgeCount, noButtonPrompts.length - 1)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated Big Heart Badge */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center shadow-xl mb-6 border-2 border-white"
        >
          <Heart className="w-10 h-10 text-white fill-white" />
        </motion.div>

        {/* Cat */}
        <div className="mb-6">
          <CatIllustration
            size={200}
            mood={dodgeCount > 0 && dodgeCount < 4 ? 'shy' : 'happy'}
          />
        </div>

        {/* Proposal Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg border border-white p-6 rounded-3xl shadow-xl w-full mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-snug">
            Would you like to go on a date with me? ❤️
          </h2>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            Coffee, tea, dessert, or a walk — your pick! ✨
          </p>
        </motion.div>

        {/* Buttons Container */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative w-full min-h-[70px]">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
            className="py-4 px-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-lg shadow-xl hover:shadow-pink-300 transition-all border border-white/50 animate-pulse flex items-center gap-2"
          >
            <span>YES ❤️</span>
          </motion.button>

          {/* Playful Evasion NO Button */}
          {dodgeCount < 3 ? (
            <motion.button
              onMouseEnter={handleDodgeNo}
              onClick={handleDodgeNo}
              animate={{ x: noPosition.x, y: noPosition.y, scale: Math.max(0.7, 1 - dodgeCount * 0.1) }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="py-3.5 px-6 rounded-full bg-gray-100 text-gray-700 font-semibold text-base shadow-md border border-gray-200 hover:bg-gray-200 transition-colors"
            >
              {noLabel}
            </motion.button>
          ) : (
            // Transformed Normal Clickable NO Button
            <motion.button
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNoClick}
              className="py-3.5 px-6 rounded-full bg-gray-200 text-gray-700 font-medium text-sm shadow-sm hover:bg-gray-300 transition-all flex items-center gap-1.5"
            >
              <Frown className="w-4 h-4 text-gray-500" />
              <span>No 🙈</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
