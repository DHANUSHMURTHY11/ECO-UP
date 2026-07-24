import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, Puzzle, CheckCircle2, RotateCcw } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import confetti from 'canvas-confetti';

const poemLines = [
  "Roses are red 🌹",
  "The sky is blue 💙",
  "I wasn't expecting",
  "To meet someone like you.",
  "Maybe it's too early, maybe it's a little bold,",
  "But sometimes the nicest stories",
  "Begin unexpectedly. ✨",
];

const solvedOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const initialScrambled = [0, 2, 1, 3, 4, 5, 6, 8, 7];

export const ScenePoemOne: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop, playCelebration } = useAudioEngine();
  const [tiles, setTiles] = useState<number[]>(initialScrambled);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const match = tiles.every((val, idx) => val === solvedOrder[idx]);
    if (match && !isSolved) {
      setIsSolved(true);
      playCelebration();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FF85A1', '#FFD166', '#DCC6FF'],
      });
    }
  }, [tiles, isSolved, playCelebration]);

  const handleTileClick = (index: number) => {
    if (isSolved) return;
    playPop(550);

    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else {
      const newTiles = [...tiles];
      const temp = newTiles[selectedIdx];
      newTiles[selectedIdx] = newTiles[index];
      newTiles[index] = temp;
      setTiles(newTiles);
      setSelectedIdx(null);
    }
  };

  const handleResetPuzzle = () => {
    playPop(400);
    setTiles(initialScrambled);
    setSelectedIdx(null);
    setIsSolved(false);
  };

  const handleNextToPromise = () => {
    playPop(650);
    goToScene('PROMISE_SECTION');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center">
        {!isSolved ? (
          /* 3x3 Grid Puzzle Section */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-white/90 backdrop-blur-xl border-2 border-pink-200 p-6 rounded-3xl shadow-2xl text-center relative flex flex-col items-center"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 font-extrabold text-xs uppercase tracking-wider mb-3 border border-pink-200">
              <Puzzle className="w-4 h-4 text-pink-500" />
              <span>Easy 3x3 Puzzle</span>
            </div>

            <h3 className="text-xl font-extrabold text-gray-800 mb-1 font-heading">
              Solve the Puzzle to Know More! 🧩
            </h3>
            <p className="text-xs text-gray-500 mb-4 font-medium">
              Tap 2 tiles to swap them into place!
            </p>

            {/* 3x3 Grid Container */}
            <div className="w-64 h-64 sm:w-72 sm:h-72 grid grid-cols-3 grid-rows-3 gap-1 bg-pink-200 p-1.5 rounded-2xl shadow-inner mb-4 relative overflow-hidden">
              {tiles.map((tileId, gridIdx) => {
                const origRow = Math.floor(tileId / 3);
                const origCol = tileId % 3;
                const isSelected = selectedIdx === gridIdx;

                return (
                  <motion.div
                    key={gridIdx}
                    onClick={() => handleTileClick(gridIdx)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative cursor-pointer rounded-xl overflow-hidden shadow-sm transition-all ${
                      isSelected ? 'ring-4 ring-pink-500 scale-105 z-10' : ''
                    }`}
                    style={{
                      backgroundImage: `url('./assets/story/zootopia_puzzle.jpg')`,
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${origCol * 50}% ${origRow * 50}%`,
                    }}
                  />
                );
              })}
            </div>

            <button
              onClick={handleResetPuzzle}
              className="text-xs text-gray-500 hover:text-pink-500 font-semibold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tiles</span>
            </button>
          </motion.div>
        ) : (
          /* Unlocked Poem Glass Card with Shining Line-by-Line Reveal */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full bg-white/90 backdrop-blur-lg border-2 border-pink-200 p-8 rounded-3xl shadow-2xl text-center mb-8 relative overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2 text-emerald-600 font-extrabold text-sm mb-4 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 w-max mx-auto">
                <CheckCircle2 className="w-4 h-4" />
                <span>Puzzle Solved! 🧩✨</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2 font-heading">
                <span>A Little Poem</span>
                <Sparkles className="w-5 h-5 text-pink-400 animate-spin" />
              </h2>

              {/* Shining Sequential Line Reveal */}
              <div className="space-y-4 mb-6">
                {poemLines.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.7 }}
                    className={`text-lg sm:text-xl font-bold leading-relaxed ${
                      idx === 2 || idx === 3 || idx === 6
                        ? 'bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm'
                        : 'text-gray-700'
                    }`}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: poemLines.length * 0.7 + 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextToPromise}
                className="py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-extrabold text-base shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40 animate-pulse"
              >
                <span>Read My Promises 💖 →</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
