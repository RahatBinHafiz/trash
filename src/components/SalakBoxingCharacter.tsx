import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type PunchAction = 'idle' | 'jab' | 'uppercut' | 'flurry' | 'slap' | 'ko' | 'kiss';

interface SalakBoxingProps {
  action: PunchAction;
  girlfriendName: string;
  onCharacterClick?: () => void;
}

export const SalakBoxingCharacter: React.FC<SalakBoxingProps> = ({ action, girlfriendName, onCharacterClick }) => {
  return (
    <div
      onClick={onCharacterClick}
      className="relative w-64 h-72 mx-auto flex items-center justify-center select-none cursor-pointer group"
      title="Click Salak to punch him!"
    >
      {/* Cartoon Impact Popups */}
      <AnimatePresence>
        {action === 'jab' && (
          <motion.div
            initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
            animate={{ scale: 1.4, rotate: 5, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute top-10 left-6 z-30 pointer-events-none font-black text-2xl text-rose-500 drop-shadow-md bg-white/90 px-3 py-1 rounded-full border-2 border-rose-400 rotate-12"
          >
            POW! 💥
          </motion.div>
        )}

        {action === 'uppercut' && (
          <motion.div
            initial={{ y: 50, scale: 0.4, opacity: 0 }}
            animate={{ y: -30, scale: 1.6, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-6 inset-x-0 flex flex-col items-center z-30 pointer-events-none font-black text-rose-600 drop-shadow-lg"
          >
            <span className="text-3xl">CRITICAL HIT! 🚀</span>
            <span className="text-sm bg-yellow-300 text-yellow-950 px-2 py-0.5 rounded-full font-bold">
              TO THE MOON!
            </span>
          </motion.div>
        )}

        {action === 'flurry' && (
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: [1, 1.3, 1], rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
            className="absolute top-12 right-2 z-30 pointer-events-none font-black text-xl text-purple-600 bg-white/90 px-2.5 py-0.5 rounded-full border-2 border-purple-400"
          >
            ORA ORA! 🌪️
          </motion.div>
        )}

        {action === 'slap' && (
          <motion.div
            initial={{ scale: 0.5, x: -30 }}
            animate={{ scale: 1.4, x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-20 right-6 z-30 pointer-events-none font-black text-xl text-amber-600 bg-white/90 px-3 py-1 rounded-full border-2 border-amber-400"
          >
            SMACK! 👋
          </motion.div>
        )}

        {action === 'ko' && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute -top-4 z-30 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1"
          >
            <span>👑 K.O. BY {girlfriendName.toUpperCase()}!</span>
          </motion.div>
        )}

        {action === 'kiss' && (
          <motion.div
            initial={{ scale: 0.3 }}
            animate={{ scale: [1, 1.4, 1.2] }}
            exit={{ opacity: 0 }}
            className="absolute top-16 z-30 text-5xl pointer-events-none drop-shadow-md"
          >
            💋💕💖
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orbiting Cartoon Dizzy Stars when KO'd or Uppercut */}
      {(action === 'uppercut' || action === 'ko' || action === 'jab') && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="absolute top-2 w-36 h-36 pointer-events-none z-20"
        >
          <span className="absolute top-0 left-2 text-xl">💫</span>
          <span className="absolute bottom-2 right-4 text-lg">⭐</span>
          <span className="absolute top-1/2 right-0 text-base">✨</span>
        </motion.div>
      )}

      {/* Boxing Ropes in Background */}
      <div className="absolute inset-x-0 bottom-10 flex flex-col gap-5 pointer-events-none -z-10 opacity-30">
        <div className="w-full h-1 bg-red-400 rounded-full" />
        <div className="w-full h-1 bg-blue-400 rounded-full" />
        <div className="w-full h-1 bg-yellow-400 rounded-full" />
      </div>

      {/* Animated Cartoon Boxer Body */}
      <motion.div
        animate={
          action === 'jab'
            ? { x: [0, 15, -8, 0], y: [0, -4, 2, 0], rotate: [0, 8, -4, 0] }
            : action === 'uppercut'
            ? { y: [0, -50, 10, 0], rotate: [0, -15, 10, 0], scale: [1, 0.9, 1.05, 1] }
            : action === 'flurry'
            ? { x: [-10, 10, -10, 10, 0], rotate: [-6, 6, -6, 6, 0] }
            : action === 'slap'
            ? { rotate: [0, -25, 10, 0], x: [0, -15, 5, 0] }
            : action === 'ko'
            ? { y: [0, 45], rotate: [0, 35], scale: [1, 0.85] }
            : action === 'kiss'
            ? { y: [-6, 0, -6], scale: [1, 1.08, 1] }
            : { y: [-3, 3, -3], rotate: [-2, 2, -2] }
        }
        transition={
          action === 'flurry'
            ? { repeat: Infinity, duration: 0.18 }
            : action === 'idle'
            ? { repeat: Infinity, duration: 2, ease: 'easeInOut' }
            : { duration: 0.45 }
        }
        className="w-56 h-56 relative flex items-center justify-center"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none">
          <defs>
            <linearGradient id="gloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
            <linearGradient id="headgearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
            <linearGradient id="boxerSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
            <linearGradient id="shortsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Boxing Shorts & Torso */}
          <path
            d="M 60 145 C 60 130 75 125 100 125 C 125 125 140 130 140 145 L 140 185 L 60 185 Z"
            fill="url(#shortsGrad)"
            stroke="#0369a1"
            strokeWidth="3"
          />
          {/* Gold Belt */}
          <rect x="58" y="142" width="84" height="12" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <circle cx="100" cy="148" r="5" fill="#f43f5e" />
          <text x="100" y="150" textAnchor="middle" fontSize="6" fill="#ffffff" fontWeight="bold">★</text>

          {/* Torso Tank Top */}
          <path d="M 65 115 L 135 115 L 138 142 L 62 142 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <text x="100" y="132" textAnchor="middle" fontSize="9" fill="#e11d48" fontWeight="bold">SALAK</text>

          {/* Head & Neck */}
          <rect x="92" y="102" width="16" height="15" fill="url(#boxerSkin)" rx="3" />
          <circle cx="100" cy="80" r="38" fill="url(#boxerSkin)" stroke="#ea580c" strokeWidth="2" />

          {/* Protective Boxing Headgear */}
          <path
            d="M 64 74 C 64 45 80 42 100 42 C 120 42 136 45 136 74 C 136 84 134 94 130 94 C 124 94 122 84 122 75 C 122 65 115 60 100 60 C 85 60 78 65 78 75 C 78 84 76 94 70 94 C 66 94 64 84 64 74 Z"
            fill="url(#headgearGrad)"
            stroke="#9f1239"
            strokeWidth="2.5"
          />
          {/* Headgear Chin Strap */}
          <path d="M 72 95 Q 100 112 128 95" stroke="url(#headgearGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Messy Hair peeking out */}
          <path d="M 85 58 Q 92 48 100 58 Q 108 48 115 58" stroke="#451a03" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Eyebrows */}
          {action === 'ko' ? (
            <>
              <path d="M 80 70 L 92 74" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              <path d="M 108 74 L 120 70" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : action === 'uppercut' || action === 'jab' ? (
            <>
              <path d="M 80 66 Q 90 72 94 68" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 106 68 Q 110 72 120 66" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M 80 68 Q 90 64 94 68" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 106 68 Q 110 64 120 68" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}

          {/* Eyes */}
          {action === 'ko' ? (
            // Swirly KO spiral eyes
            <>
              <text x="78" y="84" fontSize="16" fill="#be123c" fontWeight="bold">@</text>
              <text x="110" y="84" fontSize="16" fill="#be123c" fontWeight="bold">@</text>
            </>
          ) : action === 'kiss' ? (
            // Heart eyes
            <>
              <text x="76" y="84" fontSize="16" fill="#e11d48">❤️</text>
              <text x="108" y="84" fontSize="16" fill="#e11d48">❤️</text>
            </>
          ) : action === 'jab' || action === 'slap' ? (
            // Squished > < eyes
            <>
              <path d="M 80 75 L 90 81 L 80 87" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 120 75 L 110 81 L 120 87" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            // Confident boxer eyes
            <>
              <circle cx="87" cy="80" r="4.5" fill="#451a03" />
              <circle cx="88.5" cy="78.5" r="1.5" fill="#ffffff" />
              <circle cx="113" cy="80" r="4.5" fill="#451a03" />
              <circle cx="114.5" cy="78.5" r="1.5" fill="#ffffff" />
            </>
          )}

          {/* Bruise or Blush on Cheeks */}
          <ellipse cx="78" cy="88" rx="6" ry="4" fill="#f43f5e" opacity="0.6" />
          <ellipse cx="122" cy="88" rx="6" ry="4" fill="#f43f5e" opacity="0.6" />
          {action === 'slap' && (
            <text x="120" y="94" fontSize="10" fill="#dc2626" fontWeight="bold">✋</text>
          )}

          {/* Nose */}
          <circle cx="100" cy="85" r="3" fill="#ea580c" />

          {/* Mouth */}
          {action === 'ko' ? (
            <path d="M 92 98 Q 100 92 108 98" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          ) : action === 'uppercut' ? (
            <circle cx="100" cy="95" r="6" fill="#991b1b" stroke="#78350f" strokeWidth="1.5" />
          ) : (
            <path d="M 92 94 Q 100 102 108 94" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}

          {/* Boxing Gloves (Huge plush gloves raised) */}
          {action === 'ko' ? (
            // Gloves dropped to sides
            <>
              <circle cx="48" cy="150" r="18" fill="url(#gloveGrad)" stroke="#9f1239" strokeWidth="3" />
              <circle cx="152" cy="150" r="18" fill="url(#gloveGrad)" stroke="#9f1239" strokeWidth="3" />
            </>
          ) : (
            // Guard raised up!
            <>
              <circle cx="68" cy="115" r="19" fill="url(#gloveGrad)" stroke="#9f1239" strokeWidth="3" />
              <circle cx="132" cy="115" r="19" fill="url(#gloveGrad)" stroke="#9f1239" strokeWidth="3" />
              {/* Laces */}
              <line x1="62" y1="115" x2="74" y2="115" stroke="#ffffff" strokeWidth="2" />
              <line x1="126" y1="115" x2="138" y2="115" stroke="#ffffff" strokeWidth="2" />
            </>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
