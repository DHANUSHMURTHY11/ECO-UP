import React, { useState, useEffect } from 'react';
import { CatMood } from '../types/app';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { useApp } from '../context/AppContext';

interface CatIllustrationProps {
  mood?: CatMood;
  className?: string;
  size?: number;
  onClick?: () => void;
  interactive?: boolean;
}

export const CatIllustration: React.FC<CatIllustrationProps> = ({
  mood = 'happy',
  className = '',
  size = 200,
  onClick,
  interactive = true,
}) => {
  const { state, dispatch } = useApp();
  const { playPurr, playPop } = useAudioEngine();
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWigglingEar, setIsWigglingEar] = useState(false);
  const currentMood = state.catMood || mood;

  // Random eye blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3500 + Math.random() * 2000);

    const earInterval = setInterval(() => {
      setIsWigglingEar(true);
      setTimeout(() => setIsWigglingEar(false), 400);
    }, 5000 + Math.random() * 3000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(earInterval);
    };
  }, []);

  const handleClick = () => {
    if (!interactive) return;
    playPop(600);
    playPurr();
    dispatch({ type: 'TAP_CAT' });
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-lg"
      >
        {/* Soft Shadow underneath */}
        <ellipse cx="100" cy="180" rx="65" ry="12" fill="rgba(220, 198, 255, 0.4)" />

        {/* Tail wagging */}
        <path
          d="M 155 140 Q 185 110 170 80 Q 160 70 150 85"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="16"
          strokeLinecap="round"
          className="animate-wiggle origin-bottom"
        />

        {/* Cat Main Body (Cream/White fluffy body) */}
        <ellipse cx="100" cy="135" rx="55" ry="45" fill="#FFFFFF" stroke="#FCE7F3" strokeWidth="4" />

        {/* Cat Ears */}
        {/* Left Ear */}
        <g className={isWigglingEar ? 'animate-bounce' : ''}>
          <path d="M 60 70 L 40 30 L 78 52 Z" fill="#FFFFFF" stroke="#FCE7F3" strokeWidth="3" />
          <path d="M 62 65 L 48 38 L 74 52 Z" fill="#FFD6E8" />
        </g>
        {/* Right Ear */}
        <g className={isWigglingEar ? 'animate-bounce' : ''}>
          <path d="M 140 70 L 160 30 L 122 52 Z" fill="#FFFFFF" stroke="#FCE7F3" strokeWidth="3" />
          <path d="M 138 65 L 152 38 L 126 52 Z" fill="#FFD6E8" />
        </g>

        {/* Cat Head */}
        <ellipse cx="100" cy="95" rx="60" ry="50" fill="#FFFFFF" stroke="#FCE7F3" strokeWidth="4" />

        {/* Blush Cheeks */}
        <ellipse cx="62" cy="108" rx="12" ry="7" fill={currentMood === 'blushing' ? '#FF85A1' : '#FFAEC9'} opacity={currentMood === 'blushing' ? '0.85' : '0.6'} />
        <ellipse cx="138" cy="108" rx="12" ry="7" fill={currentMood === 'blushing' ? '#FF85A1' : '#FFAEC9'} opacity={currentMood === 'blushing' ? '0.85' : '0.6'} />

        {/* Eyes */}
        {isBlinking || currentMood === 'sleeping' ? (
          // Closed smiling eyes
          <g stroke="#4A5568" strokeWidth="3.5" strokeLinecap="round" fill="none">
            <path d="M 65 92 Q 75 100 85 92" />
            <path d="M 115 92 Q 125 100 135 92" />
          </g>
        ) : currentMood === 'purring' || currentMood === 'excited' ? (
          // Happy arc eyes with hearts
          <g>
            <path d="M 65 94 Q 75 84 85 94" stroke="#4A5568" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 115 94 Q 125 84 135 94" stroke="#4A5568" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Floating heart pupil */}
            <path d="M 75 82 Q 75 78 72 78 Q 69 78 69 82 Q 69 86 75 90 Q 81 86 81 82 Q 81 78 78 78 Q 75 78 75 82" fill="#FF85A1" />
            <path d="M 125 82 Q 125 78 122 78 Q 119 78 119 82 Q 119 86 125 90 Q 131 86 131 82 Q 131 78 128 78 Q 125 78 125 82" fill="#FF85A1" />
          </g>
        ) : (
          // Normal cute big dark eyes with white sparkles
          <g>
            <circle cx="75" cy="92" r="9" fill="#2D3748" />
            <circle cx="72" cy="89" r="3.5" fill="#FFFFFF" />
            <circle cx="125" cy="92" r="9" fill="#2D3748" />
            <circle cx="122" cy="89" r="3.5" fill="#FFFFFF" />
          </g>
        )}

        {/* Nose & Cute Mouth */}
        <polygon points="96,104 104,104 100,108" fill="#FF85A1" />
        <path
          d="M 92 110 Q 100 118 100 110 Q 100 118 108 110"
          stroke="#4A5568"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Whiskers */}
        <g stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round">
          <line x1="30" y1="92" x2="52" y2="95" />
          <line x1="28" y1="102" x2="50" y2="102" />
          <line x1="170" y1="92" x2="148" y2="95" />
          <line x1="172" y1="102" x2="150" y2="102" />
        </g>

        {/* Front Paws */}
        {currentMood === 'waving' ? (
          <g>
            {/* Left paw on ground */}
            <ellipse cx="75" cy="155" rx="14" ry="10" fill="#FFFFFF" stroke="#FCE7F3" strokeWidth="3" />
            {/* Right paw waving */}
            <g className="animate-bounce origin-bottom">
              <ellipse cx="140" cy="120" rx="14" ry="12" fill="#FFFFFF" stroke="#FCE7F3" strokeWidth="3" />
              {/* Pink paw pad */}
              <circle cx="140" cy="120" r="4" fill="#FF85A1" />
            </g>
          </g>
        ) : (
          <g>
            <ellipse cx="75" cy="155" rx="14" ry="10" fill="#FFFFFF" stroke="#FCE7F3" strokeWidth="3" />
            <ellipse cx="125" cy="155" rx="14" ry="10" fill="#FFFFFF" stroke="#FCE7F3" strokeWidth="3" />
          </g>
        )}
      </svg>

      {/* Sleeping Zzz Effect */}
      {currentMood === 'sleeping' && (
        <div className="absolute top-0 right-4 font-bold text-pink-400 text-xl animate-bounce">
          z<span className="text-sm">Z</span><span className="text-xs">z</span>
        </div>
      )}

      {/* Blushing Sparkles */}
      {currentMood === 'blushing' && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl animate-pulse">
          ✨💖✨
        </div>
      )}
    </div>
  );
};
