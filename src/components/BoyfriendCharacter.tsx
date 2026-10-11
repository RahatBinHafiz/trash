import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type BoyfriendAction = 'idle' | 'pillow' | 'eating' | 'dancing' | 'hugging' | 'booped' | 'loving';

interface BoyfriendCharacterProps {
  action: BoyfriendAction;
  girlfriendName: string;
}

export const BoyfriendCharacter: React.FC<BoyfriendCharacterProps> = ({ action, girlfriendName }) => {
  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center select-none">
      {/* Dynamic Floating Action Props */}
      <AnimatePresence>
        {action === 'pillow' && (
          <motion.div
            initial={{ x: -120, y: -40, rotate: -45, scale: 0.5, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: 15, scale: 1.2, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute top-12 left-10 z-30 pointer-events-none text-5xl drop-shadow-lg"
          >
            🛏️
            {/* Feathers */}
            <motion.span
              animate={{ y: [-10, 30], x: [0, 25], opacity: [1, 0] }}
              transition={{ duration: 0.7 }}
              className="absolute text-2xl -top-2 -right-2"
            >
              🪶
            </motion.span>
            <motion.span
              animate={{ y: [-5, 40], x: [0, -20], opacity: [1, 0] }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="absolute text-xl top-4 -left-4"
            >
              🪶
            </motion.span>
          </motion.div>
        )}

        {action === 'eating' && (
          <motion.div
            initial={{ scale: 0, y: 30 }}
            animate={{ scale: [1, 1.2, 0.9, 1], y: 0, rotate: [-10, 10, 0] }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-28 right-8 z-30 pointer-events-none text-5xl drop-shadow-md"
          >
            🍕
          </motion.div>
        )}

        {action === 'dancing' && (
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [-15, 15, -15] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute -top-4 right-6 z-30 pointer-events-none text-3xl"
          >
            🎵✨🎶
          </motion.div>
        )}

        {action === 'hugging' && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1.1], opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-6 inset-x-0 flex justify-center z-30 pointer-events-none text-4xl"
          >
            💖💕💓
          </motion.div>
        )}

        {action === 'booped' && (
          <motion.div
            initial={{ scale: 0, x: -20 }}
            animate={{ scale: 1.3, x: 0 }}
            exit={{ scale: 0 }}
            className="absolute top-24 left-16 z-30 pointer-events-none text-4xl font-extrabold text-pink-500 drop-shadow"
          >
            👉💥
          </motion.div>
        )}

        {action === 'loving' && (
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -bottom-2 z-30 bg-rose-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1"
          >
            <span>❤️</span>
            <span>SALAK LOVES YOU, {girlfriendName.toUpperCase()}!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Character Body Container with Motion */}
      <motion.div
        animate={
          action === 'pillow'
            ? { rotate: [0, -25, 20, -10, 0], y: [0, 20, -10, 5, 0], scale: [1, 0.9, 1.05, 1] }
            : action === 'dancing'
            ? { y: [-6, 6, -6], rotate: [-8, 8, -8], scale: [1, 1.03, 1] }
            : action === 'eating'
            ? { scale: [1, 1.06, 0.98, 1], y: [0, -4, 0] }
            : action === 'hugging'
            ? { scale: [1, 1.1, 1.05], y: -4 }
            : action === 'booped'
            ? { scaleX: [1, 1.25, 0.95, 1], scaleY: [1, 0.85, 1.05, 1], y: [0, 8, 0] }
            : action === 'loving'
            ? { y: [-4, 0, -4], scale: [1, 1.04, 1] }
            : { y: [-2, 2, -2] }
        }
        transition={
          action === 'dancing'
            ? { repeat: Infinity, duration: 0.6, ease: 'easeInOut' }
            : action === 'idle'
            ? { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            : { duration: 0.5 }
        }
        className="w-52 h-52 relative flex items-center justify-center"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg" fill="none">
          <defs>
            <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#291102" />
            </linearGradient>
          </defs>

          {/* Torso / Hoodie */}
          <path
            d="M 50 160 C 50 135 70 120 100 120 C 130 120 150 135 150 160 C 150 185 140 195 100 195 C 60 195 50 185 50 160 Z"
            fill="url(#hoodieGrad)"
            stroke="#2563eb"
            strokeWidth="3"
          />

          {/* Hoodie strings & pouch */}
          <path d="M 94 135 L 94 155 M 106 135 L 106 155" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="94" cy="157" rx="2" ry="2" fill="#ffffff" />
          <ellipse cx="106" cy="157" rx="2" ry="2" fill="#ffffff" />
          <path d="M 75 165 Q 100 175 125 165" stroke="#1d4ed8" strokeWidth="2" fill="none" />

          {/* Arms (Adjust based on action) */}
          {action === 'dancing' ? (
            <>
              {/* Dancing wave arms */}
              <path d="M 52 140 Q 30 115 45 90" stroke="#60a5fa" strokeWidth="12" strokeLinecap="round" />
              <path d="M 148 140 Q 170 160 180 130" stroke="#60a5fa" strokeWidth="12" strokeLinecap="round" />
            </>
          ) : action === 'hugging' ? (
            <>
              {/* Arms wide hugging */}
              <path d="M 55 145 C 30 140 25 170 55 175" stroke="#60a5fa" strokeWidth="12" strokeLinecap="round" fill="none" />
              <path d="M 145 145 C 170 140 175 170 145 175" stroke="#60a5fa" strokeWidth="12" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Normal resting / idle hands */}
              <path d="M 54 145 Q 40 165 60 175" stroke="#60a5fa" strokeWidth="11" strokeLinecap="round" fill="none" />
              <path d="M 146 145 Q 160 165 140 175" stroke="#60a5fa" strokeWidth="11" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Neck */}
          <rect x="91" y="110" width="18" height="15" fill="url(#skinGrad)" rx="4" />

          {/* Ears */}
          <ellipse cx="58" cy="85" rx="7" ry="10" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
          <ellipse cx="142" cy="85" rx="7" ry="10" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />

          {/* Head Base */}
          <circle cx="100" cy="85" r="42" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="2.5" />

          {/* Tousled Messy Hair */}
          <path
            d="M 58 75 C 55 45 80 40 100 40 C 120 40 145 45 142 75 C 135 60 120 52 100 52 C 80 52 65 60 58 75 Z"
            fill="url(#hairGrad)"
          />
          {/* Hair locks / spikes */}
          <path d="M 72 50 Q 82 35 94 48" fill="url(#hairGrad)" />
          <path d="M 90 44 Q 106 32 118 46" fill="url(#hairGrad)" />
          <path d="M 115 48 Q 132 38 136 55" fill="url(#hairGrad)" />
          <path d="M 60 68 Q 66 58 75 62" fill="url(#hairGrad)" />

          {/* Eyebrows */}
          {action === 'pillow' || action === 'booped' ? (
            <>
              {/* Worried / shocked brows */}
              <path d="M 74 68 Q 84 74 92 70" stroke="#291102" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 108 70 Q 116 74 126 68" stroke="#291102" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : action === 'hugging' || action === 'loving' ? (
            <>
              {/* Soft affectionate brows */}
              <path d="M 75 68 Q 84 64 92 68" stroke="#291102" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 108 68 Q 116 64 125 68" stroke="#291102" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Friendly brows */}
              <path d="M 75 69 Q 84 66 92 70" stroke="#291102" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 108 70 Q 116 66 125 69" stroke="#291102" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}

          {/* Eyes */}
          {action === 'pillow' ? (
            // Dizzy spiral eyes
            <>
              <text x="75" y="86" fontSize="16" fill="#78350f" fontWeight="bold">@</text>
              <text x="111" y="86" fontSize="16" fill="#78350f" fontWeight="bold">@</text>
            </>
          ) : action === 'booped' ? (
            // Squeezed shut eyes > <
            <>
              <path d="M 76 77 L 88 83 L 76 89" stroke="#78350f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 124 77 L 112 83 L 124 89" stroke="#78350f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : action === 'hugging' || action === 'loving' ? (
            // Heart eyes or happy arcs
            <>
              <text x="74" y="87" fontSize="16" fill="#e11d48">❤️</text>
              <text x="110" y="87" fontSize="16" fill="#e11d48">❤️</text>
            </>
          ) : action === 'eating' ? (
            // Nomming happy squint eyes
            <>
              <path d="M 76 83 Q 83 76 90 83" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 110 83 Q 117 76 124 83" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            // Standard warm anime pupils
            <>
              <circle cx="83" cy="82" r="5" fill="#451a03" />
              <circle cx="85" cy="80.5" r="1.8" fill="#ffffff" />
              <circle cx="117" cy="82" r="5" fill="#451a03" />
              <circle cx="119" cy="80.5" r="1.8" fill="#ffffff" />
            </>
          )}

          {/* Cheeks (Blushing) */}
          <ellipse
            cx="72"
            cy="92"
            rx={action === 'hugging' || action === 'loving' ? '9' : '6'}
            ry={action === 'hugging' || action === 'loving' ? '6' : '4'}
            fill="#f43f5e"
            opacity={action === 'hugging' || action === 'loving' ? '0.7' : '0.4'}
          />
          <ellipse
            cx="128"
            cy="92"
            rx={action === 'hugging' || action === 'loving' ? '9' : '6'}
            ry={action === 'hugging' || action === 'loving' ? '6' : '4'}
            fill="#f43f5e"
            opacity={action === 'hugging' || action === 'loving' ? '0.7' : '0.4'}
          />

          {/* Nose */}
          {action === 'booped' ? (
            // Flattened glowing red nose
            <ellipse cx="100" cy="89" rx="8" ry="5" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
          ) : (
            // Cute small nose
            <circle cx="100" cy="88" r="2.5" fill="#f97316" />
          )}

          {/* Mouth */}
          {action === 'eating' ? (
            // Chewing "O" / puff mouth
            <ellipse cx="100" cy="100" rx="9" ry="8" fill="#991b1b" stroke="#78350f" strokeWidth="2" />
          ) : action === 'pillow' ? (
            // Open "wah" mouth
            <path d="M 92 98 Q 100 110 108 98 Z" fill="#991b1b" stroke="#78350f" strokeWidth="2" />
          ) : action === 'booped' ? (
            // Squiggly mouth
            <path d="M 92 101 Q 96 98 100 101 Q 104 104 108 101" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          ) : (
            // Big goofy grin
            <path d="M 91 97 Q 100 106 109 97" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}
        </svg>
      </motion.div>
    </div>
  );
};
