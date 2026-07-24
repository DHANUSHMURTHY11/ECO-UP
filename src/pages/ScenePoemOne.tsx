import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, Mail } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

const poemLines = [
  "Roses are red 🌹",
  "The sky is blue 💙",
  "I wasn't expecting",
  "To meet someone like you.",
  "Maybe it's too early, maybe it's a little bold,",
  "But sometimes the nicest stories",
  "Begin unexpectedly. ✨",
];

export const ScenePoemOne: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop, playStamp } = useAudioEngine();
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const handleOpenEnvelope = () => {
    playStamp();
    setEnvelopeOpen(true);
  };

  const handleNext = () => {
    playPop(650);
    goToScene('MEMORIES_GALLERY');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center">
        {!envelopeOpen ? (
          /* Wax Seal Envelope */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-gradient-to-tr from-pink-100 to-amber-50 border-2 border-pink-200 p-8 rounded-3xl shadow-2xl text-center relative flex flex-col items-center justify-center min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xl mb-4 border-2 border-white animate-pulse">
              <Mail className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              A Special Note for You ✉️
            </h3>
            <p className="text-xs text-gray-500 mb-6 font-medium">
              Tap the wax seal to unseal...
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleOpenEnvelope}
              className="py-3 px-8 rounded-full bg-rose-500 text-white font-extrabold text-sm shadow-lg hover:shadow-rose-300 transition-all border border-white"
            >
              Break Wax Seal 💌
            </motion.button>
          </motion.div>
        ) : (
          /* Poem Glass Card */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full bg-white/80 backdrop-blur-lg border border-white/80 p-8 rounded-3xl shadow-2xl text-center mb-8 relative overflow-hidden"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
                <span>A Little Poem</span>
                <Sparkles className="w-4 h-4 text-pink-400" />
              </h2>

              <div className="space-y-3.5 mb-6">
                {poemLines.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.2 }}
                    className={`text-base sm:text-lg ${
                      idx === 2 || idx === 3 || idx === 6
                        ? 'font-bold text-pink-600'
                        : 'text-gray-700 font-medium'
                    }`}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-base shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 border border-white/40"
              >
                <span>View Memories ✨ →</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
