import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Heart, RefreshCw } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

export const SceneNoGraceful: React.FC = () => {
  const { goToScene } = useApp();
  const { playPop } = useAudioEngine();

  const handleRestart = () => {
    playPop(500);
    goToScene('CAT_INTRO');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Cat */}
        <div className="mb-6">
          <CatIllustration size={200} mood="happy" />
        </div>

        {/* Message Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg border border-white p-8 rounded-3xl shadow-xl w-full text-center mb-8"
        >
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4 border border-pink-200">
            <Heart className="w-6 h-6 text-pink-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            No worries ❤️
          </h2>

          <p className="text-gray-700 text-base leading-relaxed mb-4 font-medium">
            Thank you so much for taking the time to visit this little surprise.
          </p>

          <p className="text-pink-600 font-semibold text-sm">
            I'm really glad we got to meet. Wishing you lots of happiness & wonderful days ahead! ✨
          </p>
        </motion.div>

        {/* Restart / Replay Option */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="py-3 px-6 rounded-full bg-white/80 text-gray-700 font-semibold text-sm shadow-md hover:bg-white transition-all flex items-center gap-2 border border-white/80"
        >
          <RefreshCw className="w-4 h-4 text-pink-500" />
          <span>Replay Story</span>
        </motion.button>
      </div>
    </div>
  );
};
