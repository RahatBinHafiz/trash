import React from 'react';
import { motion } from 'motion/react';

interface CrystalBallProps {
  isConsulting: boolean;
  onClick?: () => void;
}

export const CrystalBallIllustration: React.FC<CrystalBallProps> = ({ isConsulting, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative w-56 h-64 mx-auto select-none cursor-pointer flex items-center justify-center group"
    >
      {/* Outer ambient magical glow */}
      <motion.div
        animate={{
          scale: isConsulting ? [1, 1.3, 1.1] : [1, 1.08, 1],
          opacity: isConsulting ? [0.6, 0.9, 0.7] : [0.4, 0.6, 0.4]
        }}
        transition={{ repeat: Infinity, duration: isConsulting ? 1 : 3 }}
        className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-pink-400/30 to-indigo-400/30 rounded-full blur-3xl -z-10"
      />

      {/* Orbiting Sparkles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
        className="absolute inset-2 pointer-events-none"
      >
        <span className="absolute top-2 left-6 text-xl text-yellow-300 drop-shadow">✨</span>
        <span className="absolute bottom-12 right-4 text-sm text-pink-300 drop-shadow">⭐</span>
        <span className="absolute top-1/2 -left-2 text-base text-purple-300 drop-shadow">✦</span>
      </motion.div>

      {/* Crystal Ball SVG */}
      <motion.div
        animate={isConsulting ? { scale: [1, 1.05, 0.98, 1.02, 1], rotate: [-2, 2, -2, 2, 0] } : { y: [-3, 3, -3] }}
        transition={isConsulting ? { duration: 0.8, repeat: Infinity } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full flex items-center justify-center"
      >
        <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl" fill="none">
          <defs>
            <radialGradient id="orbCore" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#f5d0fe" stopOpacity="0.8" />
              <stop offset="55%" stopColor="#d946ef" stopOpacity="0.6" />
              <stop offset="85%" stopColor="#7c3aed" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.95" />
            </radialGradient>
            <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Ornate Base / Stand Feet */}
          <path d="M 50 215 C 60 195 85 185 100 185 C 115 185 140 195 150 215 Z" fill="url(#standGrad)" stroke="#78350f" strokeWidth="2" />
          <ellipse cx="100" cy="216" rx="55" ry="10" fill="url(#standGrad)" stroke="#78350f" strokeWidth="2.5" />
          {/* Stand Gem */}
          <polygon points="100,192 105,198 100,204 95,198" fill="#ec4899" stroke="#ffffff" strokeWidth="1" />
          {/* Base Claws holding the sphere */}
          <path d="M 68 175 Q 60 155 70 142" stroke="url(#standGrad)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 132 175 Q 140 155 130 142" stroke="url(#standGrad)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 100 180 L 100 160" stroke="url(#standGrad)" strokeWidth="8" strokeLinecap="round" />

          {/* The Glass Orb Sphere */}
          <circle cx="100" cy="105" r="68" fill="url(#orbCore)" stroke="#e879f9" strokeWidth="3" />

          {/* Swirling Nebula Clouds Inside */}
          <g className="animate-spin" style={{ transformOrigin: '100px 105px', animationDuration: isConsulting ? '3s' : '12s' }}>
            <ellipse cx="100" cy="105" rx="45" ry="25" fill="url(#cloudGrad)" transform="rotate(30 100 105)" />
            <ellipse cx="100" cy="105" rx="35" ry="18" fill="url(#cloudGrad)" transform="rotate(-45 100 105)" />
            <circle cx="115" cy="95" r="8" fill="#ffffff" opacity="0.4" />
            <circle cx="85" cy="115" r="6" fill="#fbcfe8" opacity="0.6" />
          </g>

          {/* Spherical Specular Highlight (Reflection of light) */}
          <ellipse cx="78" cy="72" rx="22" ry="12" fill="#ffffff" opacity="0.75" transform="rotate(-30 78 72)" />
          <circle cx="62" cy="85" r="4" fill="#ffffff" opacity="0.6" />
          <circle cx="125" cy="145" r="14" fill="#ffffff" opacity="0.15" />

          {/* Inner Mystical Icon / Eye of Love */}
          <g transform="translate(100, 105)">
            <text x="0" y="8" textAnchor="middle" fontSize="24" className="select-none pointer-events-none drop-shadow">
              🔮
            </text>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
