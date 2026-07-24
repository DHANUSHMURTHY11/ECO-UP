import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { Moon, Star, Heart, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import confetti from 'canvas-confetti';

const typedLines = [
  "Thank you...",
  "For giving me a chance.",
  "I genuinely can't wait to meet you.",
];

export const SceneFinalGrand: React.FC = () => {
  const { dispatch, goToScene } = useApp();
  const { playCelebration, playPop } = useAudioEngine();
  const [lineIndex, setLineIndex] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    dispatch({ type: 'SET_NIGHT_MODE', payload: true });
    playCelebration();

    const interval = setInterval(() => {
      setLineIndex((prev) => {
        if (prev >= typedLines.length - 1) {
          clearInterval(interval);
          return typedLines.length - 1;
        }
        return prev + 1;
      });
    }, 2800);

    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 25,
        spread: 70,
        origin: { y: 0.3 },
        colors: ['#FDE047', '#C084FC', '#F472B6'],
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(confettiInterval);
    };
  }, [dispatch, playCelebration]);

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

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

        {/* Cats Sitting Together */}
        <div className="relative mb-4">
          <CatIllustration size={200} mood="purring" showPair />
        </div>

        {/* Typed Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 p-6 rounded-3xl shadow-2xl w-full mb-6 text-center min-h-[120px] flex flex-col items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl font-extrabold text-pink-300 font-heading leading-relaxed"
            >
              {typedLines[lineIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Video Song Frame replacing See You Soon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full h-72 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-slate-950 mb-6 relative group"
        >
          <video
            ref={videoRef}
            src="./assets/video/video_song.mp4"
            autoPlay
            muted={isVideoMuted}
            playsInline
            loop
            preload="auto"
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Sound Toggle Overlay */}
          <button
            onClick={toggleVideoMute}
            className="absolute bottom-3 right-3 p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md text-pink-400 border border-slate-700 shadow-md hover:scale-110 transition-transform"
            title={isVideoMuted ? 'Unmute Song' : 'Mute Song'}
          >
            {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-pink-400 animate-pulse" />}
          </button>
        </motion.div>

        {/* Replay Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="py-3.5 px-8 rounded-full bg-white/90 text-slate-900 font-extrabold text-sm shadow-xl hover:bg-white transition-all flex items-center gap-2 border border-white"
        >
          <RefreshCw className="w-4 h-4 text-pink-500" />
          <span>Replay Story</span>
        </motion.button>
      </div>
    </div>
  );
};
