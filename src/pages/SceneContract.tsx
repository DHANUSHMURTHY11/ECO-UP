import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { SignaturePad } from '../components/SignaturePad';
import { CheckCircle2, Sparkles, Heart } from 'lucide-react';
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

export const SceneContract: React.FC = () => {
  const { state, dispatch, goToScene } = useApp();
  const { playStamp, playCelebration } = useAudioEngine();
  const [isSigned, setIsSigned] = useState(false);

  const handleSigned = (dataUrl: string) => {
    dispatch({ type: 'SET_SIGNATURE', payload: dataUrl });
    setIsSigned(true);
    playStamp();
    playCelebration();

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FF85A1', '#FFD166', '#DCC6FF'],
    });

    setTimeout(() => {
      dispatch({ type: 'SET_NIGHT_MODE', payload: true });
      goToScene('GRAND_FINALE');
    }, 2800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 select-none">
      <div className="max-w-lg w-full">
        {/* Scroll Parchment Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="bg-[#FFFDF9]/90 backdrop-blur-xl border-2 border-amber-200/70 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden text-gray-800"
        >
          {/* Scroll Header Decorative Seals */}
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-4 mb-6">
            <div className="flex items-center gap-2 text-amber-600 font-extrabold text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Official Scroll</span>
            </div>
            <span className="text-xs text-amber-500 font-semibold">Memory Edition ✨</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-2 font-heading">
            ✨ Official Adventure Agreement ✨
          </h2>

          <p className="text-center text-xs text-gray-600 mb-6 font-medium">
            Today we have mutually agreed to celebrate agreeing to a fun first date!
          </p>

          {/* Terms Checklist */}
          <div className="space-y-2.5 mb-6 bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Terms & Promises:</h3>
            {terms.map((term, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{term}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-600 italic text-center mb-6">
            * This agreement is purely for fun, non-binding, and exists as a sweet memory.
          </p>

          {/* Signature Area */}
          {!isSigned && !state.signatureData ? (
            <SignaturePad onSign={handleSigned} />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 bg-pink-50/70 rounded-2xl border border-pink-200">
              <span className="text-xs text-gray-500 font-semibold mb-2">Your Signature:</span>
              <img
                src={state.signatureData || ''}
                alt="Signature"
                className="max-h-20 object-contain"
              />
            </div>
          )}

          {/* APPROVED STAMP overlay */}
          <AnimatePresence>
            {isSigned && (
              <motion.div
                initial={{ scale: 3, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-rose-500 text-rose-500 font-black text-3xl sm:text-4xl py-3 px-8 rounded-2xl uppercase tracking-widest shadow-2xl bg-white/90 backdrop-blur-md flex items-center gap-2 pointer-events-none"
              >
                <span>APPROVED</span>
                <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
