import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { DeliveryCarSVG } from '../components/DeliveryCarSVG';
import { SignaturePad } from '../components/SignaturePad';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import confetti from 'canvas-confetti';
import officialCoupleImg from '../assets/official_couple.png';

const terms = [
  "Go on one fun date.",
  "Laugh at bad jokes.",
  "Eat something tasty.",
  "Respect each other.",
  "Take things one step at a time.",
  "Enjoy the moment.",
];

export const SceneYesCelebration: React.FC = () => {
  const { dispatch, goToScene } = useApp();
  const { playCelebration, playCarHonk, playStamp, playPop } = useAudioEngine();
  const [stage, setStage] = useState<'celebration' | 'truck' | 'contract' | 'post_signature'>('celebration');
  const [isSigned, setIsSigned] = useState(false);

  const celebVideoRef = useRef<HTMLVideoElement | null>(null);
  const officialVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    playCelebration();
    const interval = setInterval(() => {
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 85,
        origin: { x: 0, y: 0.6 },
        colors: ['#FF85A1', '#FFD166', '#DCC6FF', '#60A5FA', '#F472B6'],
      });
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 85,
        origin: { x: 1, y: 0.6 },
        colors: ['#FF85A1', '#FFD166', '#DCC6FF', '#60A5FA', '#F472B6'],
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [playCelebration]);

  useEffect(() => {
    if (stage === 'celebration' && celebVideoRef.current) {
      celebVideoRef.current.play().catch(() => {});
    } else if (stage === 'post_signature' && officialVideoRef.current) {
      officialVideoRef.current.play().catch(() => {});
    }
  }, [stage]);

  const handleTruckArrival = () => {
    playCarHonk();
    setStage('truck');
  };

  const handleOpenEnvelope = () => {
    playPop(700);
    setStage('contract');
  };

  const handleSigned = (dataUrl: string) => {
    dispatch({ type: 'SET_SIGNATURE', payload: dataUrl });
    setIsSigned(true);
    playStamp();
    playCelebration();

    setTimeout(() => {
      setStage('post_signature');
    }, 2500);
  };

  const handleFinishStory = () => {
    dispatch({ type: 'SET_NIGHT_MODE', payload: true });
    goToScene('GRAND_FINALE');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Stage 1: Celebration with celebration.mp4 Video */}
        {stage === 'celebration' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center"
          >
            {/* Celebration Video Frame */}
            <motion.div
              initial={{ scale: 0.85, rotate: -1 }}
              animate={{ scale: 1, rotate: 0 }}
              className="w-full h-72 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-6 relative bg-slate-950 flex items-center justify-center p-1"
            >
              <video
                ref={celebVideoRef}
                src="./assets/video/celebration.mp4"
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center p-3 pointer-events-none">
                <span className="text-white font-extrabold text-2xl drop-shadow-lg font-heading">
                  YES! YAYYY! 🚀🎆🎉
                </span>
              </div>
            </motion.div>

            {/* Clean Text Box: Only You Just Made My Day! */}
            <div className="bg-white/90 backdrop-blur-lg border-2 border-pink-200 p-6 rounded-3xl shadow-xl w-full mb-6 text-center">
              <h2 className="text-2xl font-extrabold text-gray-800 font-heading">
                You just made my day! 💕
              </h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTruckArrival}
              className="py-4 px-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold text-lg shadow-xl hover:shadow-purple-200 transition-all flex items-center gap-3 border border-white/50 animate-pulse"
            >
              <span>Special Delivery 📬 →</span>
            </motion.button>
          </motion.div>
        )}

        {/* Stage 2: Express Delivery Truck */}
        {stage === 'truck' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center"
          >
            <span className="px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 font-bold text-xs uppercase tracking-wider mb-4 border border-pink-200">
              Special Delivery Arrived! 🚚
            </span>

            <DeliveryCarSVG className="w-full max-w-[280px] my-4" />

            <div className="bg-white/85 backdrop-blur-md border border-white p-5 rounded-2xl shadow-lg mb-6">
              <p className="text-gray-800 font-bold text-base">
                "Special delivery envelope just for you!" 📬✨
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenEnvelope}
              className="py-4 px-8 rounded-full bg-gradient-to-r from-rose-500 to-purple-500 text-white font-extrabold text-base shadow-xl transition-all border border-white/40 animate-bounce"
            >
              <span>Open Envelope ✉️</span>
            </motion.button>
          </motion.div>
        )}

        {/* Stage 3: Official Agreement Scroll & Signature */}
        {stage === 'contract' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-[#FFFDF9]/90 backdrop-blur-xl border-2 border-amber-200 p-6 rounded-3xl shadow-2xl relative text-gray-800"
          >
            <h2 className="text-2xl font-extrabold text-center mb-2 font-heading">
              ✨ Official Adventure Agreement ✨
            </h2>
            <p className="text-xs text-gray-600 mb-4 font-medium">
              Mutually agreed to celebrate our first date!
            </p>

            <div className="space-y-2 mb-4 text-left bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
              {terms.map((term, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{term}</span>
                </div>
              ))}
            </div>

            {!isSigned ? (
              <SignaturePad onSign={handleSigned} />
            ) : (
              <div className="p-4 bg-pink-50 rounded-2xl border border-pink-200 text-center font-bold text-pink-600">
                APPROVED ❤️
              </div>
            )}

            {isSigned && (
              <motion.div
                initial={{ scale: 3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: -10 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-rose-500 text-rose-500 font-black text-3xl py-2 px-6 rounded-2xl uppercase shadow-2xl bg-white/90"
              >
                APPROVED ❤️
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Stage 4: Post Signature Section (Top Image with Header + Half-size Video Below) */}
        {stage === 'post_signature' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center"
          >
            {/* Top Image (Rooftop Couple) with Header Badge Over It */}
            <motion.div
              initial={{ scale: 0.9, rotate: -1 }}
              animate={{ scale: 1, rotate: 0 }}
              className="w-full h-72 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-3 relative bg-slate-900"
            >
              <img
                src={officialCoupleImg || './assets/story/official_couple.png'}
                alt="It's Official!"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 via-black/30 to-transparent p-4 flex items-center justify-center">
                <span className="text-white font-extrabold text-2xl sm:text-3xl drop-shadow-xl font-heading tracking-wide flex items-center gap-2">
                  <span>It's Official! 😭💖</span>
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" />
                </span>
              </div>
            </motion.div>

            {/* Half-size Video Frame (official.mp4) Positioned Below Top Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden shadow-xl border-2 border-white mb-6 bg-slate-950 relative flex items-center justify-center p-1"
            >
              <video
                ref={officialVideoRef}
                src="./assets/video/official.mp4"
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFinishStory}
              className="py-4 px-9 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-base shadow-xl transition-all flex items-center gap-2 border border-white/50 animate-pulse"
            >
              <span>Watch Starry Finale 🌙</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
