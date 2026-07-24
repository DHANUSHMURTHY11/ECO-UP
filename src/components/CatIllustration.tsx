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
  showPair?: boolean;
}

export const CatIllustration: React.FC<CatIllustrationProps> = ({
  mood = 'happy',
  className = '',
  size = 220,
  onClick,
  interactive = true,
  showPair = false,
}) => {
  const { state, dispatch } = useApp();
  const { playPurr, playPop } = useAudioEngine();
  const [isBlinking, setIsBlinking] = useState(false);
  const currentMood = state.catMood || mood;

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3200 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    if (!interactive) return;
    playPop(650);
    playPurr();
    dispatch({ type: 'TAP_CAT' });
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 select-none ${className}`}
      style={{ width: showPair ? size * 1.4 : size, height: size }}
    >
      <svg viewBox="0 0 240 200" className="w-full h-full drop-shadow-xl">
        {/* Soft Oval Ground Shadow */}
        <ellipse cx="120" cy="180" rx="90" ry="14" fill="rgba(220, 198, 255, 0.45)" />

        {/* MAIN CHIBI CAT (Gray Peach&Goma Style) */}
        <g className={currentMood === 'celebrating' || currentMood === 'excited' ? 'animate-bounce' : ''}>
          {/* Tail */}
          <path
            d="M 60 145 Q 30 130 40 100 Q 45 90 55 105"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="14"
            strokeLinecap="round"
            className="animate-wiggle origin-bottom"
          />

          {/* Body */}
          <ellipse cx="95" cy="140" rx="46" ry="40" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3.5" />

          {/* Ears */}
          <path d="M 58 75 L 42 38 L 78 58 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3" />
          <path d="M 60 70 L 48 44 L 74 58 Z" fill="#FFC0CB" />

          <path d="M 132 75 L 148 38 L 112 58 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3" />
          <path d="M 130 70 L 142 44 L 116 58 Z" fill="#FFC0CB" />

          {/* Head */}
          <ellipse cx="95" cy="95" rx="55" ry="46" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3.5" />

          {/* Cheeks / Blush */}
          <ellipse cx="60" cy="108" rx="11" ry="6" fill="#FF85A1" opacity={currentMood === 'shy' || currentMood === 'embarrassed' || currentMood === 'in_love' ? '0.9' : '0.6'} />
          <ellipse cx="130" cy="108" rx="11" ry="6" fill="#FF85A1" opacity={currentMood === 'shy' || currentMood === 'embarrassed' || currentMood === 'in_love' ? '0.9' : '0.6'} />

          {/* Eyes depending on Mood */}
          {isBlinking || currentMood === 'sleeping' ? (
            <g stroke="#334155" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M 65 92 Q 75 100 85 92" />
              <path d="M 105 92 Q 115 100 125 92" />
            </g>
          ) : currentMood === 'crying' ? (
            <g>
              <path d="M 65 94 Q 75 86 85 94" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 105 94 Q 115 86 125 94" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {/* Tear drops */}
              <path d="M 60 100 Q 55 115 58 120 Q 62 120 65 110 Z" fill="#60A5FA" />
              <path d="M 130 100 Q 125 115 128 120 Q 132 120 135 110 Z" fill="#60A5FA" />
            </g>
          ) : currentMood === 'nervous' ? (
            <g>
              <circle cx="75" cy="92" r="7" fill="#334155" />
              <circle cx="115" cy="92" r="7" fill="#334155" />
              <path d="M 65 82 Q 75 86 85 82" stroke="#334155" strokeWidth="2.5" fill="none" />
              <path d="M 105 82 Q 115 86 125 82" stroke="#334155" strokeWidth="2.5" fill="none" />
              <path d="M 130 75 Q 135 70 138 78" stroke="#60A5FA" strokeWidth="3" fill="none" />
            </g>
          ) : currentMood === 'in_love' || currentMood === 'kisses' ? (
            <g>
              <path d="M 75 88 Q 75 84 71 84 Q 67 84 67 88 Q 67 93 75 97 Q 83 93 83 88 Q 83 84 79 84 Q 75 84 75 88" fill="#FF85A1" />
              <path d="M 115 88 Q 115 84 111 84 Q 107 84 107 88 Q 107 93 115 97 Q 123 93 123 88 Q 123 84 119 84 Q 115 84 115 88" fill="#FF85A1" />
            </g>
          ) : (
            <g>
              <circle cx="75" cy="92" r="8" fill="#334155" />
              <circle cx="72" cy="89" r="3" fill="#FFFFFF" />
              <circle cx="115" cy="92" r="8" fill="#334155" />
              <circle cx="112" cy="89" r="3" fill="#FFFFFF" />
            </g>
          )}

          {/* Nose & Mouth */}
          <polygon points="92,102 98,102 95,106" fill="#FF85A1" />
          <path d="M 88 108 Q 95 116 95 108 Q 95 116 102 108" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Paws */}
          {currentMood === 'waving' ? (
            <g>
              <ellipse cx="70" cy="155" rx="12" ry="9" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3" />
              <g className="animate-bounce origin-bottom">
                <ellipse cx="130" cy="120" rx="12" ry="10" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3" />
                <circle cx="130" cy="120" r="3" fill="#FF85A1" />
              </g>
            </g>
          ) : (
            <g>
              <ellipse cx="70" cy="155" rx="12" ry="9" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3" />
              <ellipse cx="120" cy="155" rx="12" ry="9" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3" />
            </g>
          )}
        </g>

        {/* SECOND CHIBI CAT (White Partner Cat for Pair Scenes) */}
        {showPair && (
          <g transform="translate(65, 5)">
            {/* Body */}
            <ellipse cx="115" cy="140" rx="44" ry="38" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="3.5" />

            {/* Ears */}
            <path d="M 82 75 L 68 38 L 100 58 Z" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="3" />
            <path d="M 84 70 L 74 44 L 96 58 Z" fill="#FFD6E8" />
            <path d="M 152 75 L 168 38 L 132 58 Z" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="3" />
            <path d="M 150 70 L 162 44 L 136 58 Z" fill="#FFD6E8" />

            {/* Head */}
            <ellipse cx="115" cy="95" rx="52" ry="44" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="3.5" />
            <ellipse cx="85" cy="108" rx="10" ry="5" fill="#FFAEC9" opacity="0.8" />
            <ellipse cx="145" cy="108" rx="10" ry="5" fill="#FFAEC9" opacity="0.8" />

            {/* Happy Eyes */}
            <path d="M 90 92 Q 100 84 108 92" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 125 92 Q 135 84 143 92" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" fill="none" />

            {/* Nose & Mouth */}
            <polygon points="112,102 118,102 115,106" fill="#FF85A1" />
            <path d="M 108 108 Q 115 116 115 108 Q 115 116 122 108" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Kiss Heart */}
            <path d="M 68 90 Q 68 86 64 86 Q 60 86 60 90 Q 60 95 68 99 Q 76 95 76 90 Q 76 86 72 86 Q 68 86 68 90" fill="#FF85A1" className="animate-pulse" />
          </g>
        )}
      </svg>
    </div>
  );
};
