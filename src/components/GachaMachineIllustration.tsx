import React from 'react';
import { motion } from 'motion/react';

interface GachaMachineProps {
  isSpinning: boolean;
}

export const GachaMachineIllustration: React.FC<GachaMachineProps> = ({ isSpinning }) => {
  return (
    <div className="relative w-64 h-80 mx-auto select-none flex flex-col items-center justify-center">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-3xl -z-10" />

      {/* Machine Main Assembly */}
      <motion.div
        animate={
          isSpinning
            ? {
                rotate: [-2, 2, -3, 3, -1, 1, 0],
                y: [-3, 3, -4, 2, 0],
                scale: [1, 1.02, 0.99, 1.01, 1]
              }
            : { y: [0, -3, 0] }
        }
        transition={
          isSpinning
            ? { repeat: Infinity, duration: 0.28, ease: 'easeInOut' }
            : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
        }
        className="w-full h-full relative flex flex-col items-center"
      >
        <svg viewBox="0 0 240 300" className="w-full h-full drop-shadow-xl" fill="none">
          <defs>
            {/* Gradients */}
            <linearGradient id="domeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#fdf4ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f0abfc" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#9d174d" />
            </linearGradient>
          </defs>

          {/* Top Marquee Ribbon & Crown */}
          <path d="M 80 25 Q 120 12 160 25 L 155 38 Q 120 28 85 38 Z" fill="url(#goldGrad)" stroke="#a16207" strokeWidth="1.5" />
          <circle cx="120" cy="18" r="8" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
          <text x="120" y="22" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">★</text>

          {/* Glass Dome */}
          <ellipse cx="120" cy="98" rx="68" ry="68" fill="url(#domeGrad)" stroke="#f472b6" strokeWidth="4" />
          <ellipse cx="120" cy="98" rx="64" ry="64" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

          {/* Glass Reflection Highlight */}
          <path
            d="M 75 60 C 90 45 140 45 160 62 C 145 52 100 52 75 60 Z"
            fill="#ffffff"
            opacity="0.8"
          />

          {/* Capsules inside Dome */}
          {/* Capsule 1: Pink & Lavender */}
          <g transform={`translate(${isSpinning ? '105 85' : '100 90'}) rotate(${isSpinning ? '45' : '15'})`}>
            <circle cx="0" cy="0" r="14" fill="#f472b6" />
            <path d="M -14 0 A 14 14 0 0 1 14 0 Z" fill="#e879f9" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#ffffff" strokeWidth="2" />
            <circle cx="-4" cy="-4" r="3" fill="#ffffff" opacity="0.7" />
          </g>

          {/* Capsule 2: Gold & Rose */}
          <g transform={`translate(${isSpinning ? '135 110' : '140 105'}) rotate(${isSpinning ? '-30' : '-20'})`}>
            <circle cx="0" cy="0" r="13" fill="#fbbf24" />
            <path d="M -13 0 A 13 13 0 0 1 13 0 Z" fill="#fb7185" />
            <line x1="-13" y1="0" x2="13" y2="0" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Capsule 3: Cyan & Violet */}
          <g transform={`translate(${isSpinning ? '80 115' : '82 110'}) rotate(${isSpinning ? '70' : '35'})`}>
            <circle cx="0" cy="0" r="13" fill="#38bdf8" />
            <path d="M -13 0 A 13 13 0 0 1 13 0 Z" fill="#c084fc" />
            <line x1="-13" y1="0" x2="13" y2="0" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Capsule 4: Center Mint & Coral */}
          <g transform={`translate(${isSpinning ? '120 70' : '122 75'}) rotate(${isSpinning ? '-60' : '5'})`}>
            <circle cx="0" cy="0" r="12" fill="#34d399" />
            <path d="M -12 0 A 12 12 0 0 1 12 0 Z" fill="#f43f5e" />
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Capsule 5: Love Heart Capsule */}
          <g transform={`translate(${isSpinning ? '118 125' : '115 120'})`}>
            <circle cx="0" cy="0" r="14" fill="#fda4af" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fontSize="12" fill="#e11d48">❤️</text>
          </g>

          {/* Machine Mid Section / Chute Deck */}
          <path
            d="M 52 165 L 188 165 L 180 230 L 60 230 Z"
            fill="url(#bodyGrad)"
            stroke="#9d174d"
            strokeWidth="3.5"
          />

          {/* Decorative Trim */}
          <rect x="50" y="160" width="140" height="10" rx="5" fill="url(#goldGrad)" stroke="#a16207" strokeWidth="1.5" />

          {/* Heart Emblem on Front Deck */}
          <circle cx="120" cy="195" r="22" fill="#ffffff" stroke="#f472b6" strokeWidth="2" />

          {/* Turning Crank Handle */}
          <g
            style={{
              transformOrigin: '120px 195px',
              transform: isSpinning ? 'rotate(720deg)' : 'rotate(0deg)',
              transition: isSpinning ? 'transform 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
            }}
          >
            {/* Crank Disc */}
            <circle cx="120" cy="195" r="14" fill="url(#goldGrad)" stroke="#a16207" strokeWidth="1.5" />
            {/* Turning Wings */}
            <rect x="100" y="191" width="40" height="8" rx="4" fill="url(#goldGrad)" stroke="#a16207" strokeWidth="1.5" />
            <circle cx="120" cy="195" r="5" fill="#f43f5e" />
          </g>

          {/* Machine Bottom Base & Prize Dispenser Chute */}
          <path
            d="M 58 230 L 182 230 L 195 285 C 195 292 185 296 175 296 L 65 296 C 55 296 45 292 45 285 Z"
            fill="url(#baseGrad)"
            stroke="#831843"
            strokeWidth="3.5"
          />

          {/* Dispenser Chute Hatch */}
          <rect x="90" y="245" width="60" height="38" rx="10" fill="#4c0519" stroke="url(#goldGrad)" strokeWidth="2.5" />
          <path d="M 94 250 Q 120 262 146 250" stroke="#f472b6" strokeWidth="2" fill="none" opacity="0.6" />

          {/* Capsule ready to drop inside hatch */}
          <circle cx="120" cy="265" r="11" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
          <path d="M 109 265 A 11 11 0 0 1 131 265 Z" fill="#fbbf24" />
          <line x1="109" y1="265" x2="131" y2="265" stroke="#ffffff" strokeWidth="1.5" />

          {/* Little feet */}
          <rect x="62" y="294" width="24" height="6" rx="3" fill="#831843" />
          <rect x="154" y="294" width="24" height="6" rx="3" fill="#831843" />
        </svg>

        {/* Dropping Capsule FX when spinning finishes */}
        {isSpinning && (
          <motion.div
            initial={{ y: 0, scale: 0.5, opacity: 0 }}
            animate={{ y: [0, 80], scale: [0.5, 1.2], opacity: [0, 1] }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-4 z-20 text-3xl pointer-events-none"
          >
            🎁
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
