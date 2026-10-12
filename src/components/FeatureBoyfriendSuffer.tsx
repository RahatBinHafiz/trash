import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RotateCcw, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BoyfriendCharacter, BoyfriendAction } from './BoyfriendCharacter';
import { sound } from '../utils/soundEffects';
import { fireHeartBurst } from '../utils/confetti';

export const FeatureBoyfriendSuffer: React.FC = () => {
  const { setActiveScreen, config, boyfriendBrainCells, setBoyfriendBrainCells } = useApp();
  const [currentAction, setCurrentAction] = useState<BoyfriendAction>('idle');
  const [speechBubble, setSpeechBubble] = useState<string>(`Hi ${config.girlfriendName}! ${config.boyfriendNickname} is ready for duty, please be gentle... 🥺`);
  const [actionHistoryCount, setActionHistoryCount] = useState(0);

  const handleAction = (action: BoyfriendAction) => {
    setCurrentAction(action);
    setActionHistoryCount(prev => prev + 1);

    // Dynamic responses & brain cell changes
    switch (action) {
      case 'pillow':
        sound.playPillow();
        setSpeechBubble("OOF! Right on the forehead! 10/10 aim, your majesty! 🪶😂");
        setBoyfriendBrainCells(prev => Math.max(0, prev - 1));
        break;
      case 'eating':
        sound.playNom();
        setSpeechBubble(`Mmm pizza! Can ${config.boyfriendNickname} have another slice, my queen? Nom nom nom! 🍕😋`);
        setBoyfriendBrainCells(prev => prev + 1);
        break;
      case 'dancing':
        sound.playDance();
        setSpeechBubble("Look at my sick moves! Pure rhythm! (Please don't record this) 🕺🎶");
        break;
      case 'hugging':
        sound.playLoveChime();
        fireHeartBurst();
        setSpeechBubble("Awww... I will never let go. Squeeeeze! You smell so nice! 🫂💗");
        setBoyfriendBrainCells(prev => prev + 2);
        break;
      case 'booped':
        sound.playBoop();
        setSpeechBubble("KIIII! 🥺 My nose! You have officially booped my single remaining neuron!");
        setBoyfriendBrainCells(prev => Math.max(1, prev));
        break;
      case 'loving':
        sound.playSparkle();
        fireHeartBurst();
        setSpeechBubble(`I LOVE YOU ${config.girlfriendName.toUpperCase()}! ${config.boyfriendNickname} loves you more than gaming, sleep, and pizza combined! ❤️`);
        setBoyfriendBrainCells(999);
        break;
    }

    // Reset to idle after 2.5s for non-looping actions
    if (action !== 'dancing') {
      setTimeout(() => {
        setCurrentAction('idle');
      }, 2500);
    }
  };

  const handleResetBrainCells = () => {
    sound.playPop();
    setBoyfriendBrainCells(3);
    setCurrentAction('idle');
    setSpeechBubble(`${config.boyfriendNickname}'s brain cells restored to factory default: 3. Ready for affection!`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28 space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playPop();
            setActiveScreen('dashboard');
          }}
          className="flex items-center gap-1.5 text-sm font-bold text-pink-800 hover:text-pink-950 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Hub</span>
        </button>

        <button
          onClick={handleResetBrainCells}
          className="flex items-center gap-1 text-xs font-semibold text-pink-700 bg-pink-100 hover:bg-pink-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Recharge Brain Cells</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100/90 px-3 py-1 rounded-full">
          🎮 INTERACTIVE BOYFRIEND PET SIMULATOR
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950 pt-1">
          Make {config.boyfriendNickname} Suffer 😂
        </h2>
        <p className="text-xs sm:text-sm text-amber-800">
          Bullying privileges are exclusively reserved for {config.girlfriendName}. Choose your action!
        </p>
      </div>

      {/* Main Play Area */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-6 flex flex-col items-center relative overflow-hidden">
        {/* Brain Cells Score Header */}
        <div className="w-full flex items-center justify-between bg-amber-50 rounded-2xl p-3 border border-amber-200 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧠</span>
            <span className="font-bold text-amber-950">{config.boyfriendNickname}'s Remaining Brain Cells:</span>
          </div>
          <span className="font-black text-base sm:text-lg text-rose-600 font-mono">
            {boyfriendBrainCells > 100 ? '∞ (OVERFLOW WITH LOVE)' : boyfriendBrainCells}
          </span>
        </div>

        {/* Speech Bubble from Boyfriend */}
        <div className="relative max-w-sm w-full">
          <motion.div
            key={speechBubble}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white border-2 border-pink-300 rounded-2xl p-3.5 shadow-sm text-center relative z-20"
          >
            <p className="text-xs sm:text-sm font-bold text-pink-950 flex items-center justify-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-pink-500 shrink-0" />
              <span>{speechBubble}</span>
            </p>
            {/* Bubble Tail pointing down */}
            <div className="w-3 h-3 bg-white border-r-2 border-b-2 border-pink-300 transform rotate-45 absolute -bottom-2 left-1/2 -ml-1.5" />
          </motion.div>
        </div>

        {/* Cartoon Character Centerpiece (Click to throw pillow) */}
        <div className="py-2">
          <BoyfriendCharacter
            action={currentAction}
            girlfriendName={config.girlfriendName}
            onCharacterClick={() => handleAction('pillow')}
          />
        </div>

        {/* 6 Action Buttons */}
        <div className="w-full space-y-2">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-amber-800">
            Interactive Controls
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => handleAction('pillow')}
              className="h-13 bg-rose-100 hover:bg-rose-200 active:scale-95 text-rose-950 font-bold text-xs sm:text-sm rounded-2xl border border-rose-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>THROW A PILLOW 🛏️</span>
            </button>

            <button
              onClick={() => handleAction('eating')}
              className="h-13 bg-orange-100 hover:bg-orange-200 active:scale-95 text-orange-950 font-bold text-xs sm:text-sm rounded-2xl border border-orange-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>FEED HIM 🍕</span>
            </button>

            <button
              onClick={() => handleAction('dancing')}
              className="h-13 bg-purple-100 hover:bg-purple-200 active:scale-95 text-purple-950 font-bold text-xs sm:text-sm rounded-2xl border border-purple-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>MAKE HIM DANCE 🕺</span>
            </button>

            <button
              onClick={() => handleAction('hugging')}
              className="h-13 bg-pink-100 hover:bg-pink-200 active:scale-95 text-pink-950 font-bold text-xs sm:text-sm rounded-2xl border border-pink-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>GIVE HIM A HUG 🫂</span>
            </button>

            <button
              onClick={() => handleAction('booped')}
              className="h-13 bg-indigo-100 hover:bg-indigo-200 active:scale-95 text-indigo-950 font-bold text-xs sm:text-sm rounded-2xl border border-indigo-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>BOOP HIS NOSE 👉</span>
            </button>

            <button
              onClick={() => handleAction('loving')}
              className="h-13 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm shadow-red-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>SAY “I LOVE YOU” ❤️</span>
            </button>
          </div>
        </div>

        {/* Action Ticker */}
        <div className="text-[11px] text-amber-700/80 font-medium">
          Total Interactions: {actionHistoryCount} · {config.boyfriendNickname}'s obedience level: 100%
        </div>
      </div>
    </div>
  );
};
