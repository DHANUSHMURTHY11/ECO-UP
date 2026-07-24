import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CatIllustration } from '../components/CatIllustration';
import { DeliveryCarSVG } from '../components/DeliveryCarSVG';
import { SignaturePad } from '../components/SignaturePad';
import { Sparkles, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import confetti from 'canvas-confetti';

const terms = [
  "Go on one fun date.",
  "Laugh at bad jokes.",
  "Eat something tasty.",
  "Respect each other.",
  "Take things one step at a time.",
  "Enjoy the moment.",
];

export const SceneYesCelebration: React.FC = () => {
  const { state, dispatch, goToScene } = useApp();
  const { playCelebration, playCarHonk, playStamp, playPop } = useAudioEngine();
  const [stage, setStage] = useState<'celebration' | 'truck' | 'contract' | 'post_signature'>('celebration');
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    playCelebration();
    const interval = setInterval(() => {
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.4 },
        colors: ['#FF85A1', '#FFD166', '#DCC6FF', '#60A5FA'],
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [playCelebration]);

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
        {/* Stage 1: Initial Celebration */}
        {stage === 'celebration' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center"
          >
            {/* Rainbow Header */}
            <div className="mb-4 text-4xl animate-bounce">
              🌈✨🎉
            </div>

            <motion.div
              animate={{ rotate: [-4, 4, -4], y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="mb-6"
            >
              <CatIllustration size={230} mood="celebrating" showPair />
            </motion.div>

            <div className="bg-white/85 backdrop-blur-lg border border-white p-8 rounded-3xl shadow-2xl w-full mb-8">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                YES! YAYYY! 🎉
              </h2>
              <p className="text-gray-600 text-base font-semibold">
                You just made my day! 💕
              </p>
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

        {/* Stage 4: Post Signature Cute Reaction */}
        {stage === 'post_signature' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center"
          >
            <div className="bg-white/85 backdrop-blur-lg border border-white p-6 rounded-3xl shadow-2xl w-full mb-6">
              <h3 className="text-2xl font-extrabold text-gray-800 mb-2">
                It's official! 😭💖
              </h3>
              <p className="text-gray-600 text-sm font-semibold">
                *Cat reads signature, eyes get huge, runs around celebrating with all cat friends!* 🐾🎉
              </p>
            </div>

            <CatIllustration size={230} mood="kisses" showPair />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFinishStory}
              className="mt-6 py-4 px-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-base shadow-xl transition-all flex items-center gap-2 border border-white/50 animate-pulse"
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
