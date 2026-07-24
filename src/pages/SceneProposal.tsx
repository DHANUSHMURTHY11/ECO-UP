import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Heart, Frown } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import confetti from 'canvas-confetti';

const noButtonPrompts = [
  "No 🙈",
  "Are you sure? 🥺",
  "The cat will cry 😿",
  "Think once more! ❤️",
  "Catch me if you can! 🐾",
  "Wait, don't press no! 🙈",
  "Pretty please? 🥺",
  "Are you really super sure? 🥺",
  "Okay, if you really mean it... ❤️",
  "No 🙈",
];

export const SceneProposal: React.FC = () => {
  const { dispatch, goToScene } = useApp();
  const { playPop, playCelebration } = useAudioEngine();
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleDodgeNo = () => {
    playPop(350);
    if (dodgeCount < 8) {
      const maxDistX = Math.min(280, window.innerWidth * 0.35);
      const maxDistY = Math.min(180, window.innerHeight * 0.25);
      const randomX = (Math.random() - 0.5) * (maxDistX * 2);
      const randomY = (Math.random() - 0.5) * (maxDistY * 2);
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

    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FF85A1', '#FFD166', '#DCC6FF', '#F472B6'],
    });

    goToScene('YES_CELEBRATION');
  };

  const noLabel = noButtonPrompts[Math.min(dodgeCount, noButtonPrompts.length - 1)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Golden Hour Beating Heart */}
        <motion.div
          animate={{ scale: [1, 1.25, 1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-2xl mb-6 border-2 border-white"
        >
          <Heart className="w-10 h-10 text-white fill-white" />
        </motion.div>

        {/* 4th Image Frame (Dog with Flower Crown) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6 w-64 h-64"
        >
          <CatIllustration
            size={250}
            imageSrc="./assets/story/proposal_dog.jpg"
            mood={dodgeCount > 0 && dodgeCount < 8 ? 'nervous' : 'in_love'}
          />
        </motion.div>

        {/* Proposal Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-lg border-2 border-amber-200 p-6 sm:p-8 rounded-3xl shadow-2xl w-full mb-8"
        >
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2 font-heading">
            There's just one tiny question...
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-snug font-heading">
            Would you like to go on a date with me? ❤️
          </h2>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            Coffee, dessert, or a walk — your pick! ✨
          </p>
        </motion.div>

        {/* Buttons Container */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative w-full min-h-[70px]">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
            className="py-4 px-10 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-extrabold text-lg shadow-xl hover:shadow-rose-300 transition-all border border-white/50 animate-pulse flex items-center gap-2 z-20"
          >
            <span>YES ❤️</span>
          </motion.button>

          {/* Extended Evasion NO Button */}
          {dodgeCount < 8 ? (
            <motion.button
              onMouseEnter={handleDodgeNo}
              onClick={handleDodgeNo}
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              className="py-3.5 px-6 rounded-full bg-gray-100/90 text-gray-700 font-bold text-base shadow-lg border-2 border-gray-200 hover:bg-gray-200 transition-colors z-20"
            >
              {noLabel}
            </motion.button>
          ) : (
            <motion.button
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNoClick}
              className="py-3.5 px-6 rounded-full bg-gray-200 text-gray-700 font-medium text-sm shadow-sm hover:bg-gray-300 transition-all flex items-center gap-1.5 z-20"
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
