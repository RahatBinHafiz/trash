import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type BoyfriendAction = 'idle' | 'pillow' | 'eating' | 'dancing' | 'hugging' | 'booped' | 'loving';

interface BoyfriendCharacterProps {
  action: BoyfriendAction;
  girlfriendName: string;
  onCharacterClick?: () => void;
}

export const BoyfriendCharacter: React.FC<BoyfriendCharacterProps> = ({ action, girlfriendName, onCharacterClick }) => {
  return (
    <div
      onClick={onCharacterClick}
      className={`relative w-64 h-64 mx-auto flex items-center justify-center select-none ${onCharacterClick ? 'cursor-pointer' : ''}`}
      title={onCharacterClick ? 'Tap Salak to interact!' : undefined}
    >
      {/* Dizzy stars on pillow hit */}
      {action === 'pillow' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="absolute -top-4 w-40 h-40 pointer-events-none z-30"
        >
          <span className="absolute top-0 left-4 text-xl">💫</span>
          <span className="absolute top-2 right-4 text-lg">⭐</span>
          <span className="absolute bottom-2 left-6 text-base">✨</span>
        </motion.div>
      )}
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
            className="absolute -bottom-2 z-30 bg-rose-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5 whitespace-nowrap"
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
        className="w-56 h-56 relative flex items-center justify-center"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none">
          <defs>
            {/* Light blue shirt gradient matching the photo */}
            <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="40%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
            <linearGradient id="collarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eff6ff" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>
            {/* Skin tone matching the warm handsome complexion */}
            <linearGradient id="salakSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="60%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>
            {/* Stylized dark swept hair matching the photo */}
            <linearGradient id="salakHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="50%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
            <linearGradient id="salakHairHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>
          </defs>

          {/* Torso: Light Blue Button-Down Shirt (as in the photo) */}
          <path
            d="M 52 145 C 52 125 72 118 100 118 C 128 118 148 125 148 145 L 152 195 L 48 195 Z"
            fill="url(#shirtGrad)"
            stroke="#60a5fa"
            strokeWidth="2.5"
          />

          {/* Shirt Placket (Center Button Strip) */}
          <path d="M 95 132 L 95 195 L 105 195 L 105 132 Z" fill="#bfdbfe" opacity="0.6" />
          <line x1="100" y1="130" x2="100" y2="195" stroke="#93c5fd" strokeWidth="1.5" />
          {/* Shirt Buttons */}
          <circle cx="100" cy="144" r="2" fill="#ffffff" stroke="#93c5fd" strokeWidth="1" />
          <circle cx="100" cy="160" r="2" fill="#ffffff" stroke="#93c5fd" strokeWidth="1" />
          <circle cx="100" cy="176" r="2" fill="#ffffff" stroke="#93c5fd" strokeWidth="1" />

          {/* Arms (Adjust based on action) */}
          {action === 'dancing' ? (
            <>
              {/* Dancing wave arms in light blue shirt sleeves */}
              <path d="M 52 140 Q 28 115 45 88" stroke="#93c5fd" strokeWidth="12" strokeLinecap="round" />
              <path d="M 148 140 Q 172 160 182 128" stroke="#93c5fd" strokeWidth="12" strokeLinecap="round" />
            </>
          ) : action === 'hugging' ? (
            <>
              {/* Arms wide hugging */}
              <path d="M 55 142 C 28 135 22 170 55 175" stroke="#93c5fd" strokeWidth="12" strokeLinecap="round" fill="none" />
              <path d="M 145 142 C 172 135 178 170 145 175" stroke="#93c5fd" strokeWidth="12" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Natural relaxed arms */}
              <path d="M 54 142 Q 38 165 58 178" stroke="#93c5fd" strokeWidth="11" strokeLinecap="round" fill="none" />
              <path d="M 146 142 Q 162 165 142 178" stroke="#93c5fd" strokeWidth="11" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Neck & Open Collar V */}
          <rect x="91" y="104" width="18" height="18" fill="url(#salakSkin)" rx="4" />
          {/* Subtle clavicle shadow */}
          <path d="M 94 116 Q 100 120 106 116" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />

          {/* Crisp Pointed Shirt Collar (Open Collar matching photo) */}
          {/* Left Collar Flap */}
          <path d="M 88 115 L 75 132 L 95 128 Z" fill="url(#collarGrad)" stroke="#60a5fa" strokeWidth="1.8" />
          {/* Right Collar Flap */}
          <path d="M 112 115 L 125 132 L 105 128 Z" fill="url(#collarGrad)" stroke="#60a5fa" strokeWidth="1.8" />

          {/* Ears */}
          <ellipse cx="58" cy="84" rx="7.5" ry="10.5" fill="url(#salakSkin)" stroke="#f97316" strokeWidth="1.5" />
          <path d="M 58 80 Q 61 84 58 88" stroke="#ea580c" strokeWidth="1.2" fill="none" opacity="0.6" />
          <ellipse cx="142" cy="84" rx="7.5" ry="10.5" fill="url(#salakSkin)" stroke="#f97316" strokeWidth="1.5" />
          <path d="M 142 80 Q 139 84 142 88" stroke="#ea580c" strokeWidth="1.2" fill="none" opacity="0.6" />

          {/* Head Base */}
          <circle cx="100" cy="82" r="41" fill="url(#salakSkin)" stroke="#ea580c" strokeWidth="2.2" />

          {/* Forehead Band-Aid on pillow hit */}
          {action === 'pillow' && (
            <g transform="rotate(-15 85 62)">
              <rect x="76" y="59" width="18" height="6" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              <circle cx="85" cy="62" r="1.5" fill="#ca8a04" />
            </g>
          )}

          {/* Jaw Contour & Stubble Beard Shadow (signature feature from photo!) */}
          <path
            d="M 64 82 C 65 106 80 121 100 121 C 120 121 135 106 136 82"
            stroke="#78350f"
            strokeWidth="3.5"
            strokeDasharray="2 2"
            opacity="0.32"
            fill="none"
          />
          {/* Light Chin Stubble Shadow */}
          <ellipse cx="100" cy="113" rx="14" ry="6" fill="#78350f" opacity="0.12" />
          {/* Subtle Mustache Shadow */}
          <path d="M 90 95 Q 100 93 110 95" stroke="#78350f" strokeWidth="2" strokeDasharray="1.5 1.5" opacity="0.3" fill="none" />

          {/* Stylized Voluminous Swept-Back Hair (exactly matching the photo) */}
          {/* Hair Base */}
          <path
            d="M 58 72 C 54 36 82 28 106 28 C 132 28 146 40 144 72 C 138 56 122 48 102 48 C 80 48 64 56 58 72 Z"
            fill="url(#salakHair)"
          />
          {/* Hair Top Swept Volume & Locks (curving to the right as in photo) */}
          <path
            d="M 62 66 C 58 38 78 26 104 25 C 132 24 148 38 146 62 C 142 42 126 34 105 34 C 82 34 68 45 62 66 Z"
            fill="url(#salakHairHighlight)"
          />
          {/* Front swept locks swooping to the right */}
          <path d="M 72 38 Q 90 20 114 26" stroke="#27272a" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 94 28 Q 120 18 138 35" stroke="#27272a" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 112 32 Q 138 28 144 50" stroke="#18181b" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Sideburns */}
          <path d="M 60 70 L 64 85 L 68 76 Z" fill="#18181b" />
          <path d="M 140 70 L 136 85 L 132 76 Z" fill="#18181b" />

          {/* Eyebrows: Groomed and expressive dark eyebrows */}
          {action === 'pillow' || action === 'booped' ? (
            <>
              {/* Worried / shocked brows */}
              <path d="M 73 66 Q 84 72 92 68" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
              <path d="M 108 68 Q 116 72 127 66" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : action === 'hugging' || action === 'loving' ? (
            <>
              {/* Soft affectionate brows */}
              <path d="M 74 66 Q 84 62 92 66" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
              <path d="M 108 66 Q 116 62 126 66" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Handsome gentle arched brows */}
              <path d="M 74 67 Q 84 63 93 68" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M 107 68 Q 116 63 126 67" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round" />
            </>
          )}

          {/* Eyes: Warm Dark-Brown Eyes with gentle eyelid crease */}
          {action === 'pillow' ? (
            // Dizzy spiral eyes
            <>
              <text x="75" y="85" fontSize="17" fill="#78350f" fontWeight="bold">@</text>
              <text x="111" y="85" fontSize="17" fill="#78350f" fontWeight="bold">@</text>
            </>
          ) : action === 'booped' ? (
            // Squeezed shut eyes > <
            <>
              <path d="M 75 76 L 87 82 L 75 88" stroke="#451a03" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 125 76 L 113 82 L 125 88" stroke="#451a03" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : action === 'hugging' || action === 'loving' ? (
            // Heart eyes
            <>
              <text x="73" y="86" fontSize="17" fill="#e11d48">❤️</text>
              <text x="109" y="86" fontSize="17" fill="#e11d48">❤️</text>
            </>
          ) : action === 'eating' ? (
            // Nomming happy squint eyes
            <>
              <path d="M 75 82 Q 83 74 91 82" stroke="#451a03" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 109 82 Q 117 74 125 82" stroke="#451a03" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            // Big warm brown eyes matching the photo
            <>
              {/* Upper lash / eyelid line */}
              <path d="M 75 76 Q 84 72 92 77" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M 108 77 Q 116 72 125 76" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Brown iris */}
              <ellipse cx="83.5" cy="81" rx="6" ry="6.5" fill="#3f2213" />
              <circle cx="83.5" cy="81" r="3.5" fill="#18181b" />
              <circle cx="85.5" cy="79" r="1.8" fill="#ffffff" />
              <circle cx="82" cy="83.5" r="1" fill="#fed7aa" opacity="0.6" />

              <ellipse cx="116.5" cy="81" rx="6" ry="6.5" fill="#3f2213" />
              <circle cx="116.5" cy="81" r="3.5" fill="#18181b" />
              <circle cx="118.5" cy="79" r="1.8" fill="#ffffff" />
              <circle cx="115" cy="83.5" r="1" fill="#fed7aa" opacity="0.6" />
            </>
          )}

          {/* Cheeks (Blushing) */}
          <ellipse
            cx="71"
            cy="90"
            rx={action === 'hugging' || action === 'loving' ? '9' : '6.5'}
            ry={action === 'hugging' || action === 'loving' ? '6' : '4.5'}
            fill="#f43f5e"
            opacity={action === 'hugging' || action === 'loving' ? '0.7' : '0.45'}
          />
          <ellipse
            cx="129"
            cy="90"
            rx={action === 'hugging' || action === 'loving' ? '9' : '6.5'}
            ry={action === 'hugging' || action === 'loving' ? '6' : '4.5'}
            fill="#f43f5e"
            opacity={action === 'hugging' || action === 'loving' ? '0.7' : '0.45'}
          />

          {/* Clean Nose with soft shadow */}
          {action === 'booped' ? (
            // Flattened glowing red booped nose
            <ellipse cx="100" cy="88" rx="8" ry="5.5" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
          ) : (
            // Gentle anime nose matching photo
            <>
              <path d="M 99 82 L 98 88 L 102 88" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <ellipse cx="101" cy="88" rx="1.5" ry="1" fill="#f97316" />
            </>
          )}

          {/* Mouth: The charming smirk / smile from the photo */}
          {action === 'eating' ? (
            // Chewing "O" / puff mouth with crumbs
            <>
              <ellipse cx="100" cy="100" rx="9" ry="8" fill="#991b1b" stroke="#78350f" strokeWidth="2" />
              <circle cx="112" cy="102" r="1.5" fill="#f59e0b" />
            </>
          ) : action === 'pillow' ? (
            // Open dramatic mouth
            <path d="M 92 98 Q 100 110 108 98 Z" fill="#991b1b" stroke="#78350f" strokeWidth="2" />
          ) : action === 'booped' ? (
            // Squeaking mouth
            <path d="M 92 101 Q 96 97 100 101 Q 104 105 108 101" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          ) : (
            // Sweet gentle smile with slight cheek lift
            <>
              <path d="M 91 97 Q 100 105 109 97" stroke="#78350f" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              {/* Smile corner dimple */}
              <path d="M 109 96 Q 112 95 111 98" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
