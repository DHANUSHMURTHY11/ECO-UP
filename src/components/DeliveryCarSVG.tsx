import React from 'react';

export const DeliveryCarSVG: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none ${className}`}>
      <svg viewBox="0 0 300 160" className="w-full h-full drop-shadow-xl">
        {/* Soft Ground Shadow */}
        <ellipse cx="150" cy="148" rx="120" ry="10" fill="rgba(220, 198, 255, 0.4)" />

        {/* Scroll on Top */}
        <g className="animate-bounce">
          {/* Scroll ribbon tie */}
          <rect x="110" y="22" width="80" height="24" rx="12" fill="#FFF8EE" stroke="#FFD6E8" strokeWidth="3" />
          <rect x="142" y="22" width="16" height="24" fill="#FF85A1" />
          {/* Scroll rolled ends */}
          <ellipse cx="110" cy="34" rx="6" ry="12" fill="#FFE4E6" stroke="#FF85A1" strokeWidth="2" />
          <ellipse cx="190" cy="34" rx="6" ry="12" fill="#FFE4E6" stroke="#FF85A1" strokeWidth="2" />
        </g>

        {/* Main Car Body (Pastel Pink) */}
        <path
          d="M 50 110 L 40 85 Q 55 60 90 55 L 210 55 Q 245 60 260 85 L 265 110 Q 270 125 250 125 L 65 125 Q 45 125 50 110 Z"
          fill="#FFD6E8"
          stroke="#FCE7F3"
          strokeWidth="4"
        />

        {/* Cabin Roof */}
        <path
          d="M 85 55 L 110 32 Q 150 28 190 32 L 215 55 Z"
          fill="#FFF0F5"
          stroke="#FCE7F3"
          strokeWidth="3"
        />

        {/* Windows */}
        <path d="M 112 36 L 145 36 L 145 52 L 95 52 Z" fill="#CDEEFF" opacity="0.85" />
        <path d="M 152 36 L 188 36 L 205 52 L 152 52 Z" fill="#CDEEFF" opacity="0.85" />

        {/* Headlight */}
        <circle cx="260" cy="92" r="10" fill="#FFD166" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M 270 92 L 295 85 L 295 99 Z" fill="#FFD166" opacity="0.3" />

        {/* Bumper */}
        <rect x="35" y="112" width="15" height="10" rx="5" fill="#E2E8F0" />
        <rect x="255" y="112" width="15" height="10" rx="5" fill="#E2E8F0" />

        {/* Heart Exhaust Puff */}
        <g className="animate-ping origin-left" opacity="0.6">
          <path d="M 25 105 Q 25 100 20 100 Q 15 100 15 105 Q 15 110 25 116 Q 35 110 35 105 Q 35 100 30 100 Q 25 100 25 105" fill="#FF85A1" />
        </g>

        {/* Wheels with Spinning Animation */}
        <g className="animate-spin origin-[90px_125px]" style={{ animationDuration: '3s' }}>
          <circle cx="90" cy="125" r="22" fill="#2D3748" stroke="#FFFFFF" strokeWidth="4" />
          <circle cx="90" cy="125" r="10" fill="#E2E8F0" />
          <line x1="90" y1="103" x2="90" y2="147" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="68" y1="125" x2="112" y2="125" stroke="#CBD5E1" strokeWidth="2" />
        </g>

        <g className="animate-spin origin-[210px_125px]" style={{ animationDuration: '3s' }}>
          <circle cx="210" cy="125" r="22" fill="#2D3748" stroke="#FFFFFF" strokeWidth="4" />
          <circle cx="210" cy="125" r="10" fill="#E2E8F0" />
          <line x1="210" y1="103" x2="210" y2="147" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="188" y1="125" x2="232" y2="125" stroke="#CBD5E1" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};
