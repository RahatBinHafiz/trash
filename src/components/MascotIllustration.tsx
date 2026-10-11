import React from 'react';
import { motion } from 'motion/react';

interface MascotProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MascotIllustration: React.FC<MascotProps> = ({ size = 'md', className = '' }) => {
  const dim = size === 'sm' ? 120 : size === 'lg' ? 240 : 180;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: dim, height: dim }}>
      {/* Soft ambient glow behind */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/40 via-purple-300/30 to-pink-200/50 rounded-full blur-2xl -z-10 animate-pulse" />

      {/* Floating Sparkles & Hearts */}
      <motion.div
        animate={{ y: [-4, 4, -4], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute -top-1 -right-1 text-pink-400 text-lg"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [4, -4, 4], opacity: [0.6, 0.9, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-2 -left-1 text-purple-400 text-sm"
      >
        🌸
      </motion.div>

      {/* SVG Mascot (Teddy Bear & Chibi Kitten holding a glowing heart together) */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bearBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <linearGradient id="catBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f5d0fe" />
          </linearGradient>
          <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- LEFT: TEDDY BEAR --- */}
        {/* Bear Left Ear */}
        <circle cx="50" cy="70" r="18" fill="url(#bearBody)" stroke="#db2777" strokeWidth="2.5" />
        <circle cx="50" cy="70" r="9" fill="#fce7f3" />
        {/* Bear Right Ear */}
        <circle cx="95" cy="65" r="16" fill="url(#bearBody)" stroke="#db2777" strokeWidth="2.5" />
        <circle cx="95" cy="65" r="8" fill="#fce7f3" />

        {/* Bear Head */}
        <circle cx="70" cy="95" r="36" fill="url(#bearBody)" stroke="#db2777" strokeWidth="3" />
        {/* Bear Muzzle */}
        <ellipse cx="70" cy="104" rx="14" ry="10" fill="#fdf2f8" />
        {/* Bear Nose */}
        <ellipse cx="70" cy="99" rx="4.5" ry="3.5" fill="#831843" />
        <path d="M 70 102.5 L 70 107 M 67 106 Q 70 108.5 73 106" stroke="#831843" strokeWidth="2" strokeLinecap="round" />
        {/* Bear Eyes (Happy blinks) */}
        <path d="M 57 91 Q 61 87 65 91" stroke="#831843" strokeWidth="3" strokeLinecap="round" />
        <path d="M 75 91 Q 79 87 83 91" stroke="#831843" strokeWidth="3" strokeLinecap="round" />
        {/* Bear Cheeks (blush) */}
        <ellipse cx="56" cy="99" rx="5" ry="3" fill="#fb7185" opacity="0.6" />
        <ellipse cx="84" cy="99" rx="5" ry="3" fill="#fb7185" opacity="0.6" />

        {/* Bear Body */}
        <path d="M 46 125 C 46 125 40 170 70 170 C 85 170 95 155 95 135" fill="url(#bearBody)" stroke="#db2777" strokeWidth="3" />
        {/* Bear Arm hugging */}
        <path d="M 50 125 Q 75 140 92 135" stroke="#db2777" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M 50 125 Q 75 140 92 135" stroke="url(#bearBody)" strokeWidth="6" strokeLinecap="round" fill="none" />

        {/* --- RIGHT: CHIBI WHITE KITTEN --- */}
        {/* Cat Left Ear */}
        <path d="M 112 68 L 126 44 L 138 65 Z" fill="url(#catBody)" stroke="#c084fc" strokeWidth="2.5" />
        <path d="M 118 64 L 127 50 L 134 62 Z" fill="#fbcfe8" />
        {/* Cat Right Ear */}
        <path d="M 148 65 L 165 48 L 168 72 Z" fill="url(#catBody)" stroke="#c084fc" strokeWidth="2.5" />
        <path d="M 153 64 L 163 53 L 164 68 Z" fill="#fbcfe8" />

        {/* Cat Head */}
        <circle cx="138" cy="95" r="34" fill="url(#catBody)" stroke="#c084fc" strokeWidth="3" />
        {/* Cat Eyes (Adorable wide sparkles) */}
        <circle cx="126" cy="92" r="4.5" fill="#581c87" />
        <circle cx="127.5" cy="90.5" r="1.5" fill="#ffffff" />
        <circle cx="150" cy="92" r="4.5" fill="#581c87" />
        <circle cx="151.5" cy="90.5" r="1.5" fill="#ffffff" />
        {/* Cat Nose & Mouth */}
        <polygon points="138,97 135.5,95 140.5,95" fill="#f43f5e" />
        <path d="M 134 99 Q 138 102 142 99" stroke="#7e22ce" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Cat Whiskers */}
        <line x1="114" y1="95" x2="106" y2="93" stroke="#d8b4fe" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="114" y1="99" x2="105" y2="101" stroke="#d8b4fe" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="162" y1="95" x2="170" y2="93" stroke="#d8b4fe" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="162" y1="99" x2="171" y2="101" stroke="#d8b4fe" strokeWidth="1.8" strokeLinecap="round" />
        {/* Cat Cheeks */}
        <ellipse cx="120" cy="99" rx="5" ry="3" fill="#f472b6" opacity="0.6" />
        <ellipse cx="156" cy="99" rx="5" ry="3" fill="#f472b6" opacity="0.6" />

        {/* Cat Body */}
        <path d="M 115 125 C 115 145 125 170 145 170 C 165 170 162 140 162 125" fill="url(#catBody)" stroke="#c084fc" strokeWidth="3" />
        {/* Cat Tail curled behind */}
        <path d="M 160 160 Q 185 162 182 140 Q 180 128 172 134" stroke="#c084fc" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* --- CENTER: GLOWING HEART HELD TOGETHER --- */}
        {/* Heart Glow halo */}
        <circle cx="102" cy="138" r="28" fill="url(#heartGlow)" />
        {/* The Heart */}
        <g className="animate-bounce" style={{ transformOrigin: '102px 138px', animationDuration: '1.8s' }}>
          <path
            d="M 102 153 C 102 153 78 138 78 122 C 78 111 87 104 97 108 C 100 110 102 113 102 113 C 102 113 104 110 107 108 C 117 104 126 111 126 122 C 126 138 102 153 102 153 Z"
            fill="url(#heartGrad)"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          {/* Heart highlight */}
          <path
            d="M 84 116 Q 89 110 94 112"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      </svg>
    </div>
  );
};
