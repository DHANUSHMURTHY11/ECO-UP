import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Sparkles, ArrowRight, Puzzle, CheckCircle2, RotateCcw, Eye } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import confetti from 'canvas-confetti';

const poemLines = [
  "🌹",
  "Roses are red,",
  "The sky is blue...",
  "I wasn't expecting",
  "To meet someone like you.",
  "Maybe it's a little early,",
  "Maybe it's a little bold...",
  "But the nicest stories",
  "Usually begin",
  "When nobody expects them to.",
  "✨"
];

const solvedOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const initialScrambled = [0, 2, 1, 3, 4, 5, 6, 8, 7];

export const ScenePoemOne: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop, playCelebration } = useAudioEngine();
  const [tiles, setTiles] = useState<number[]>(initialScrambled);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showRef, setShowRef] = useState(false);

  // Typewriter state
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [typedChars, setTypedChars] = useState("");
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isPoemFinished, setIsPoemFinished] = useState(false);

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

  // Typewriter Effect Logic
  useEffect(() => {
    if (!isSolved || isPoemFinished) return;

    const fullLine = poemLines[currentLineIdx];

    if (typedChars.length < fullLine.length) {
      const charTimer = setTimeout(() => {
        setTypedChars(fullLine.slice(0, typedChars.length + 1));
        playPop(700 + typedChars.length * 20);
      }, 40);
      return () => clearTimeout(charTimer);
    } else {
      // Line finished typing -> pause, then advance to next line
      const lineTimer = setTimeout(() => {
        setCompletedLines((prev) => [...prev, fullLine]);
        setTypedChars("");
        if (currentLineIdx < poemLines.length - 1) {
          setCurrentLineIdx((prev) => prev + 1);
        } else {
          setIsPoemFinished(true);
          playCelebration();
        }
      }, 550);
      return () => clearTimeout(lineTimer);
    }
  }, [isSolved, currentLineIdx, typedChars, isPoemFinished, playPop, playCelebration]);

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
      <div className="max-w-xl w-full flex flex-col items-center">
        {!isSolved ? (
          /* 3x3 Grid Puzzle Section with Top Corner Reference Image */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-white/90 backdrop-blur-xl border-2 border-pink-200 p-6 rounded-3xl shadow-2xl text-center relative flex flex-col items-center"
          >
            {/* Top Corner Reference Image Thumbnail */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end">
              <button
                onClick={() => setShowRef(!showRef)}
                className="px-2.5 py-1 rounded-full bg-pink-100 text-pink-600 font-extrabold text-[11px] flex items-center gap-1 border border-pink-200 shadow-sm hover:bg-pink-200 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showRef ? 'Hide Ref' : 'Ref Image'}</span>
              </button>

              {showRef && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-2 w-24 h-24 rounded-xl border-2 border-white shadow-lg overflow-hidden"
                >
                  <img
                    src="./assets/story/zootopia_puzzle.jpg"
                    alt="Reference"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 font-extrabold text-xs uppercase tracking-wider mb-2 border border-pink-200">
              <Puzzle className="w-4 h-4 text-pink-500" />
              <span>Interactive Puzzle</span>
            </div>

            {/* Header: Solve the Puzzle to Know ! */}
            <h3 className="text-2xl font-extrabold text-gray-800 mb-1 font-heading">
              Solve the Puzzle to Know ! 🧩
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
          /* Dreamy Cardless Handwritten Letter with Typewriter Animation */
          <div className="w-full flex flex-col items-center relative text-center">
            {/* Sitting Cat Watching the Typewriter Poem */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-4"
            >
              <CatIllustration
                size={210}
                mood={isPoemFinished ? 'in_love' : 'happy'}
              />
            </motion.div>

            {/* Cardless Handwritten Poem Body */}
            <div className="w-full px-4 py-6 max-w-lg mx-auto flex flex-col items-center">
              {/* Completed Lines */}
              {completedLines.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-2xl sm:text-3xl font-handwriting font-bold leading-relaxed mb-2 text-pink-700 tracking-wide drop-shadow-sm ${
                    idx === poemLines.length - 1 ? 'text-3xl sm:text-4xl text-rose-600 animate-pulse font-extrabold' : ''
                  }`}
                >
                  {line}
                </motion.p>
              ))}

              {/* Currently Typing Line */}
              {!isPoemFinished && (
                <p className="text-2xl sm:text-3xl font-handwriting font-bold leading-relaxed text-pink-700 tracking-wide drop-shadow-sm flex items-center justify-center">
                  <span>{typedChars}</span>
                  <span className="w-0.5 h-7 bg-pink-500 inline-block ml-1 animate-ping" />
                </p>
              )}
            </div>

            {/* Floating Magical Continue Button (Appears ONLY after poem finishes typing) */}
            {isPoemFinished && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: [1, 1.05, 1], y: 0 }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextToPromise}
                className="mt-6 py-4 px-9 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-extrabold text-lg shadow-2xl hover:shadow-pink-300 transition-all flex items-center justify-center gap-2 border-2 border-white/80"
              >
                <span>✨ This Could Be Us ❤️ →</span>
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
