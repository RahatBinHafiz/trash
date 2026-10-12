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
      className="relative w-72 h-80 mx-auto flex items-center justify-center select-none cursor-pointer group"
      title="Click Salak to punch him!"
    >
      {/* Cartoon Impact Popups */}
      <AnimatePresence>
        {action === 'jab' && (
          <motion.div
            initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
            animate={{ scale: 1.4, rotate: 8, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="absolute top-8 left-4 z-40 pointer-events-none font-black text-2xl text-rose-500 drop-shadow-md bg-white/95 px-3 py-1 rounded-full border-2 border-rose-400 rotate-12 shadow-lg"
          >
            POW! 💥
          </motion.div>
        )}

        {action === 'uppercut' && (
          <motion.div
            initial={{ y: 60, scale: 0.4, opacity: 0 }}
            animate={{ y: -35, scale: 1.6, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-8 inset-x-0 flex flex-col items-center z-40 pointer-events-none font-black text-rose-600 drop-shadow-xl"
          >
            <span className="text-3xl filter drop-shadow">CRITICAL HIT! 🚀</span>
            <span className="text-xs bg-yellow-300 text-yellow-950 px-2.5 py-0.5 rounded-full font-black border border-yellow-500 shadow-sm">
              TO THE MOON!
            </span>
          </motion.div>
        )}

        {action === 'flurry' && (
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: [1, 1.3, 1], rotate: [-12, 12, -12] }}
            transition={{ repeat: Infinity, duration: 0.18 }}
            className="absolute top-10 right-2 z-40 pointer-events-none font-black text-xl text-purple-600 bg-white/95 px-3 py-1 rounded-full border-2 border-purple-400 shadow-lg"
          >
            ORA ORA! 🌪️
          </motion.div>
        )}

        {action === 'slap' && (
          <motion.div
            initial={{ scale: 0.4, x: -40 }}
            animate={{ scale: 1.5, x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-16 right-4 z-40 pointer-events-none font-black text-2xl text-amber-600 bg-white/95 px-3 py-1 rounded-full border-2 border-amber-400 shadow-lg"
          >
            SMACK! 👋
          </motion.div>
        )}

        {action === 'ko' && (
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1.1 }}
            className="absolute -top-6 z-40 bg-gradient-to-r from-rose-600 to-red-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-xl border-2 border-white flex items-center gap-1.5"
          >
            <span>👑 K.O. BY {girlfriendName.toUpperCase()}!</span>
          </motion.div>
        )}

        {action === 'kiss' && (
          <motion.div
            initial={{ scale: 0.3 }}
            animate={{ scale: [1, 1.4, 1.2] }}
            exit={{ opacity: 0 }}
            className="absolute top-12 z-40 text-5xl pointer-events-none drop-shadow-lg"
          >
            💋💕💖
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orbiting Cartoon Dizzy Stars / Tweeting Birds when KO'd or Uppercut */}
      {(action === 'uppercut' || action === 'ko') && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="absolute top-0 w-44 h-44 pointer-events-none z-30"
        >
          <span className="absolute top-0 left-2 text-2xl">💫</span>
          <span className="absolute bottom-2 right-4 text-xl">⭐</span>
          <span className="absolute top-1/2 right-0 text-xl">🐤</span>
          <span className="absolute bottom-4 left-4 text-lg">✨</span>
        </motion.div>
      )}

      {/* Boxing Ropes in Background */}
      <div className="absolute inset-x-0 bottom-12 flex flex-col gap-6 pointer-events-none -z-10 opacity-35">
        <div className="w-full h-1.5 bg-rose-400 rounded-full shadow-xs" />
        <div className="w-full h-1.5 bg-blue-400 rounded-full shadow-xs" />
        <div className="w-full h-1.5 bg-amber-400 rounded-full shadow-xs" />
      </div>

      {/* Hit Spurt Sparkles on Impact */}
      {(action === 'jab' || action === 'slap') && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0.8, 1.8], opacity: [1, 0] }}
          transition={{ duration: 0.35 }}
          className="absolute top-20 left-12 z-30 pointer-events-none text-3xl"
        >
          💥
        </motion.div>
      )}

      {/* Flying Sweat / Tear Drops on Impact */}
      {(action === 'uppercut' || action === 'jab' || action === 'slap' || action === 'flurry') && (
        <>
          <motion.div
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: -35, y: -25, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-24 left-16 z-30 pointer-events-none text-xl"
          >
            💧
          </motion.div>
          <motion.div
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: 35, y: -20, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="absolute top-24 right-16 z-30 pointer-events-none text-xl"
          >
            💦
          </motion.div>
        </>
      )}

      {/* Animated Cartoon Boxer Salak Body */}
      <motion.div
        animate={
          action === 'jab'
            ? { x: [0, 24, -12, 0], y: [0, -6, 4, 0], rotate: [0, 14, -6, 0] }
            : action === 'uppercut'
            ? { y: [0, -65, 14, 0], rotate: [0, -20, 12, 0], scale: [1, 0.88, 1.06, 1] }
            : action === 'flurry'
            ? { x: [-14, 14, -14, 14, -10, 10, 0], rotate: [-8, 8, -8, 8, -4, 4, 0] }
            : action === 'slap'
            ? { rotate: [0, -32, 12, -4, 0], x: [0, -22, 8, 0] }
            : action === 'ko'
            ? { y: [0, 52], rotate: [0, 42], scale: [1, 0.82] }
            : action === 'kiss'
            ? { y: [-8, 0, -8], scale: [1, 1.12, 1] }
            : { y: [-3, 3, -3], rotate: [-1.5, 1.5, -1.5] }
        }
        transition={
          action === 'flurry'
            ? { repeat: Infinity, duration: 0.16 }
            : action === 'idle'
            ? { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
            : { duration: 0.5, ease: 'easeOut' }
        }
        className="w-64 h-64 relative flex items-center justify-center"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl" fill="none">
          <defs>
            {/* Handsome Skin tone gradient matching photo */}
            <linearGradient id="maleSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="60%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>

            {/* Stylized dark swept hair gradient matching photo */}
            <linearGradient id="maleHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="50%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
            <linearGradient id="maleHairHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>

            {/* Athletic Sporty Tee / Boxer Outfit */}
            <linearGradient id="maleTeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="50%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>

            {/* Red Boxing Gloves */}
            <linearGradient id="punchGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
          </defs>

          {/* Torso & Light Blue Athletic Fitted Shirt */}
          <path
            d="M 50 142 C 50 122 70 115 100 115 C 130 115 150 122 150 142 L 154 195 L 46 195 Z"
            fill="url(#maleTeeGrad)"
            stroke="#60a5fa"
            strokeWidth="2.5"
          />

          {/* Shirt Graphics: "SALAK" Name with Heart */}
          <rect x="74" y="132" width="52" height="18" rx="6" fill="#ffffff" opacity="0.9" stroke="#93c5fd" strokeWidth="1.2" />
          <text x="100" y="145" textAnchor="middle" fontSize="10" fill="#e11d48" fontWeight="900" letterSpacing="0.5">
            SALAK 💗
          </text>

          {/* Neck with subtle shadow */}
          <rect x="91" y="103" width="18" height="16" fill="url(#maleSkin)" rx="4" />
          <path d="M 94 114 Q 100 118 106 114" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* Shirt V-Collar */}
          <path d="M 86 115 L 100 128 L 114 115 Z" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1.8" />

          {/* Ears */}
          <ellipse cx="58" cy="84" rx="7.5" ry="10.5" fill="url(#maleSkin)" stroke="#ea580c" strokeWidth="1.5" />
          <path d="M 58 80 Q 61 84 58 88" stroke="#ea580c" strokeWidth="1.2" fill="none" opacity="0.6" />
          <ellipse cx="142" cy="84" rx="7.5" ry="10.5" fill="url(#maleSkin)" stroke="#ea580c" strokeWidth="1.5" />
          <path d="M 142 80 Q 139 84 142 88" stroke="#ea580c" strokeWidth="1.2" fill="none" opacity="0.6" />

          {/* Head Base (Handsome male face) */}
          <circle cx="100" cy="82" r="41" fill="url(#maleSkin)" stroke="#ea580c" strokeWidth="2.2" />

          {/* Signature Jawline & Stubble Shadow (from real male photo!) */}
          <path
            d="M 64 82 C 65 106 80 121 100 121 C 120 121 135 106 136 82"
            stroke="#78350f"
            strokeWidth="3.5"
            strokeDasharray="2 2"
            opacity="0.32"
            fill="none"
          />
          {/* Chin stubble shadow */}
          <ellipse cx="100" cy="113" rx="14" ry="6" fill="#78350f" opacity="0.12" />
          {/* Subtle mustache stubble shadow */}
          <path d="M 90 95 Q 100 93 110 95" stroke="#78350f" strokeWidth="2" strokeDasharray="1.5 1.5" opacity="0.3" fill="none" />

          {/* Signature Voluminous Dark Swept-Back Hair (FULLY VISIBLE - NO HELMET!) */}
          {/* Hair base */}
          <path
            d="M 57 72 C 53 34 82 26 106 26 C 134 26 147 38 145 72 C 139 55 122 46 102 46 C 79 46 63 55 57 72 Z"
            fill="url(#maleHair)"
          />
          {/* Hair volume & highlights */}
          <path
            d="M 61 65 C 57 36 78 24 104 23 C 132 22 149 36 147 62 C 143 40 126 32 105 32 C 82 32 67 44 61 65 Z"
            fill="url(#maleHairHighlight)"
          />
          {/* Swept locks curving to the right */}
          <path d="M 72 36 Q 90 18 114 24" stroke="#27272a" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 94 26 Q 120 16 138 33" stroke="#27272a" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 112 30 Q 138 26 145 48" stroke="#18181b" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Sideburns */}
          <path d="M 60 70 L 64 85 L 68 76 Z" fill="#18181b" />
          <path d="M 140 70 L 136 85 L 132 76 Z" fill="#18181b" />

          {/* Flying Hair Lock when taking heavy hits */}
          {(action === 'jab' || action === 'slap' || action === 'uppercut') && (
            <motion.path
              d="M 132 32 Q 155 20 160 40"
              stroke="#18181b"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              animate={{ rotate: [0, 20, 0] }}
            />
          )}

          {/* Eyebrows (Dynamic comic expressions when suffering/taking hits) */}
          {action === 'ko' ? (
            <>
              {/* Slanted downward sad brows */}
              <path d="M 74 72 L 88 66" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
              <path d="M 112 66 L 126 72" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : action === 'uppercut' ? (
            <>
              {/* High shocked brows */}
              <path d="M 74 62 Q 84 56 93 63" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M 107 63 Q 116 56 126 62" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round" />
            </>
          ) : action === 'jab' || action === 'slap' ? (
            <>
              {/* Pain wincing brow */}
              <path d="M 74 65 Q 85 71 93 67" stroke="#18181b" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 107 68 Q 115 72 126 65" stroke="#18181b" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : action === 'kiss' ? (
            <>
              {/* Loving arched brows */}
              <path d="M 74 66 Q 84 62 92 66" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
              <path d="M 108 66 Q 116 62 126 66" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Confident handsome brows */}
              <path d="M 74 67 Q 84 63 93 68" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M 107 68 Q 116 63 126 67" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round" />
            </>
          )}

          {/* Eyes (Hilarious hit suffering reactions) */}
          {action === 'ko' ? (
            // Swirly cartoon spiral KO eyes
            <>
              <text x="74" y="85" fontSize="19" fill="#be123c" fontWeight="900">@</text>
              <text x="110" y="85" fontSize="19" fill="#be123c" fontWeight="900">@</text>
            </>
          ) : action === 'kiss' ? (
            // Beating heart eyes
            <>
              <text x="73" y="86" fontSize="18" fill="#e11d48">❤️</text>
              <text x="109" y="86" fontSize="18" fill="#e11d48">❤️</text>
            </>
          ) : action === 'jab' || action === 'slap' ? (
            // Squished > < pain eyes
            <>
              <path d="M 74 76 L 86 82 L 74 88" stroke="#451a03" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 126 76 L 114 82 L 126 88" stroke="#451a03" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : action === 'uppercut' ? (
            // Rolling up eyes
            <>
              <ellipse cx="83.5" cy="80" rx="6" ry="6.5" fill="#3f2213" />
              <circle cx="83.5" cy="76" r="3.5" fill="#18181b" />
              <circle cx="85.5" cy="75" r="1.5" fill="#ffffff" />
              <ellipse cx="116.5" cy="80" rx="6" ry="6.5" fill="#3f2213" />
              <circle cx="116.5" cy="76" r="3.5" fill="#18181b" />
              <circle cx="118.5" cy="75" r="1.5" fill="#ffffff" />
            </>
          ) : action === 'flurry' ? (
            // Wobbly X_X eyes
            <>
              <text x="76" y="85" fontSize="16" fill="#be123c" fontWeight="900">X</text>
              <text x="112" y="85" fontSize="16" fill="#be123c" fontWeight="900">X</text>
            </>
          ) : (
            // Handsome brown eyes matching photo
            <>
              <path d="M 75 76 Q 84 72 92 77" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M 108 77 Q 116 72 125 76" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
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

          {/* Cheeks: Bruises, Red Handprint Slap Mark or Blushes */}
          {action === 'slap' ? (
            <>
              {/* Huge cartoon red handprint on cheek! */}
              <ellipse cx="123" cy="89" rx="10" ry="7" fill="#ef4444" opacity="0.75" />
              <text x="117" y="93" fontSize="11" fill="#991b1b" fontWeight="black">✋</text>
              <ellipse cx="73" cy="90" rx="7" ry="5" fill="#f43f5e" opacity="0.4" />
            </>
          ) : action === 'jab' || action === 'uppercut' ? (
            <>
              {/* Cute swollen bruised cheek with bandaid */}
              <ellipse cx="73" cy="90" rx="9" ry="6" fill="#f43f5e" opacity="0.7" />
              <rect x="67" y="87" width="13" height="5" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" transform="rotate(-15 73 90)" />
              <ellipse cx="127" cy="90" rx="7" ry="5" fill="#f43f5e" opacity="0.5" />
            </>
          ) : action === 'ko' ? (
            <>
              {/* Cross Band-Aid on cheek */}
              <ellipse cx="73" cy="90" rx="8" ry="5" fill="#f43f5e" opacity="0.6" />
              <rect x="68" y="88" width="12" height="4" rx="1.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" transform="rotate(35 74 90)" />
              <rect x="68" y="88" width="12" height="4" rx="1.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" transform="rotate(-35 74 90)" />
              <ellipse cx="127" cy="90" rx="8" ry="5" fill="#f43f5e" opacity="0.6" />
            </>
          ) : action === 'kiss' ? (
            <>
              {/* Massive blush and red kiss lipstick mark */}
              <ellipse cx="71" cy="90" rx="11" ry="7" fill="#f43f5e" opacity="0.8" />
              <ellipse cx="129" cy="90" rx="11" ry="7" fill="#f43f5e" opacity="0.8" />
              <text x="122" y="95" fontSize="12" fill="#be123c">💋</text>
            </>
          ) : (
            <>
              {/* Soft handsome blush */}
              <ellipse cx="71" cy="90" rx="7" ry="4.5" fill="#f43f5e" opacity="0.4" />
              <ellipse cx="129" cy="90" rx="7" ry="4.5" fill="#f43f5e" opacity="0.4" />
            </>
          )}

          {/* Nose with Band-Aid when KO */}
          {action === 'ko' ? (
            <>
              <circle cx="100" cy="86" r="3.5" fill="#ea580c" />
              <rect x="92" y="84" width="16" height="4" rx="1.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            </>
          ) : (
            <>
              <path d="M 99 82 L 98 88 L 102 88" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <ellipse cx="101" cy="88" rx="1.5" ry="1" fill="#f97316" />
            </>
          )}

          {/* Mouth: Taking Hit suffering reactions */}
          {action === 'ko' ? (
            // Wavy KO mouth with little tongue out
            <>
              <path d="M 91 99 Q 96 95 101 99 Q 106 103 111 99" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <ellipse cx="101" cy="103" rx="4" ry="3.5" fill="#fb7185" />
            </>
          ) : action === 'uppercut' ? (
            // Open dramatic O mouth gasping upwards!
            <ellipse cx="100" cy="98" rx="8" ry="7" fill="#991b1b" stroke="#78350f" strokeWidth="2" />
          ) : action === 'jab' || action === 'slap' ? (
            // Clenched grimacing teeth
            <>
              <rect x="93" y="96" width="15" height="6" rx="2" fill="#ffffff" stroke="#78350f" strokeWidth="2" />
              <line x1="98" y1="96" x2="98" y2="102" stroke="#78350f" strokeWidth="1.2" />
              <line x1="103" y1="96" x2="103" y2="102" stroke="#78350f" strokeWidth="1.2" />
            </>
          ) : action === 'kiss' ? (
            // Pouting kiss lips
            <ellipse cx="100" cy="98" rx="5" ry="4" fill="#e11d48" stroke="#be123c" strokeWidth="1.5" />
          ) : (
            // Handsome playful smirk
            <>
              <path d="M 91 97 Q 100 105 109 97" stroke="#78350f" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M 109 96 Q 112 95 111 98" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Boxing Gloves Raised & Taking Hits */}
          {action === 'ko' ? (
            // Gloves completely dropped to the sides in defeat
            <>
              <circle cx="44" cy="155" r="18" fill="url(#punchGloveGrad)" stroke="#9f1239" strokeWidth="3" />
              <circle cx="156" cy="155" r="18" fill="url(#punchGloveGrad)" stroke="#9f1239" strokeWidth="3" />
            </>
          ) : action === 'uppercut' ? (
            // Gloves flying up in recoil
            <>
              <circle cx="56" cy="125" r="19" fill="url(#punchGloveGrad)" stroke="#9f1239" strokeWidth="3" />
              <circle cx="144" cy="125" r="19" fill="url(#punchGloveGrad)" stroke="#9f1239" strokeWidth="3" />
            </>
          ) : action === 'jab' || action === 'slap' ? (
            // Guard knocked loose
            <>
              <circle cx="58" cy="128" r="19" fill="url(#punchGloveGrad)" stroke="#9f1239" strokeWidth="3" />
              <circle cx="138" cy="115" r="19" fill="url(#punchGloveGrad)" stroke="#9f1239" strokeWidth="3" />
            </>
          ) : (
            // Classic Boxer Guard raised high
            <>
              <circle cx="68" cy="115" r="20" fill="url(#punchGloveGrad)" stroke="#9f1239" strokeWidth="3" />
              <circle cx="132" cy="115" r="20" fill="url(#punchGloveGrad)" stroke="#9f1239" strokeWidth="3" />
              {/* Glove Laces */}
              <line x1="62" y1="115" x2="74" y2="115" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="126" y1="115" x2="138" y2="115" stroke="#ffffff" strokeWidth="2.5" />
            </>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
