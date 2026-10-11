import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lock, Unlock, Mail, Copy, Check, RotateCcw, Heart, Edit3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/soundEffects';
import { fireCelebrationConfetti, fireHeartBurst } from '../utils/confetti';

export const FeatureLoveLetter: React.FC = () => {
  const { setActiveScreen, config, setSettingsOpen } = useApp();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleUnlock = () => {
    setIsOpening(true);
    sound.playLoveChime();

    setTimeout(() => {
      setIsUnlocked(true);
      setIsOpening(false);
      fireCelebrationConfetti();
      fireHeartBurst();
    }, 1100);
  };

  const handleReplay = () => {
    sound.playPop();
    setIsUnlocked(false);
    setIsOpening(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(config.loveLetter);
    setCopied(true);
    sound.playSparkle();
    setTimeout(() => setCopied(false), 2500);
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
          onClick={() => setSettingsOpen(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-pink-700 hover:text-pink-900 bg-pink-100/80 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Letter Text</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-100/90 px-3 py-1 rounded-full">
          💌 FOR YOUR EYES ONLY
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-rose-950 pt-1">
          Secret Love Letter
        </h2>
        <p className="text-xs sm:text-sm text-rose-800">
          The true heart of Pookie Land. Written with love for {config.girlfriendName}.
        </p>
      </div>

      {/* Envelope Card Container */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-md flex flex-col items-center text-center space-y-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* Locked Envelope Stage */
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center py-8 space-y-6"
            >
              {/* Interactive Envelope Graphic with Wax Seal */}
              <div className="relative w-64 h-44 select-none">
                {/* Envelope Body */}
                <div className="w-full h-full bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 rounded-2xl border-2 border-rose-300 shadow-md relative overflow-hidden flex items-center justify-center">
                  {/* Flap folds */}
                  <svg viewBox="0 0 256 176" className="w-full h-full absolute inset-0" fill="none">
                    <path d="M 0 0 L 128 90 L 256 0" stroke="#f43f5e" strokeWidth="2.5" fill="#fce7f3" />
                    <path d="M 0 176 L 95 85" stroke="#fda4af" strokeWidth="2" />
                    <path d="M 256 176 L 161 85" stroke="#fda4af" strokeWidth="2" />
                  </svg>

                  {/* Wax Seal with Heart */}
                  <motion.div
                    animate={isOpening ? { scale: [1, 1.3, 0], rotate: 45 } : { scale: [1, 1.05, 1] }}
                    transition={isOpening ? { duration: 0.6 } : { repeat: Infinity, duration: 2.5 }}
                    className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 via-red-600 to-rose-500 shadow-lg border-2 border-rose-300 flex items-center justify-center text-white"
                  >
                    <Heart className="w-8 h-8 fill-white" />
                  </motion.div>
                </div>
              </div>

              <div className="space-y-2 max-w-sm">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-rose-600">
                  <Lock className="w-3.5 h-3.5" />
                  <span>PROTECTED PROTOCOL</span>
                </div>
                <p className="text-sm text-rose-900 font-semibold">
                  This letter was written by {config.boyfriendNickname} specifically for your boring days.
                </p>
              </div>

              {/* Unlock Button */}
              <button
                disabled={isOpening}
                onClick={handleUnlock}
                className="w-full max-w-sm h-14 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-rose-600 hover:to-red-600 active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isOpening ? (
                  <>
                    <Unlock className="w-5 h-5 animate-bounce" />
                    <span>OPENING ENVELOPE... 💌</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>UNLOCK A SECRET MESSAGE FROM {config.boyfriendNickname.toUpperCase()} 💗</span>
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            /* Unlocked Letter Stage */
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full space-y-6"
            >
              {/* Formatted Parchment Letter */}
              <div className="bg-gradient-to-b from-amber-50/50 via-white to-pink-50/40 rounded-2xl p-6 sm:p-10 border border-pink-200/90 shadow-sm text-left space-y-6 relative">
                {/* Decorative Stamp */}
                <div className="absolute top-6 right-6 flex flex-col items-center">
                  <span className="text-3xl">💌</span>
                  <span className="text-[10px] font-mono text-pink-400 font-bold uppercase mt-1">Air Mail · Priority</span>
                </div>

                {/* Letter Content with whitespace formatting */}
                <div className="text-pink-950 font-serif sm:text-lg leading-relaxed space-y-4 max-w-xl">
                  {config.loveLetter.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-4 border-t border-pink-100 flex items-center justify-between text-xs text-pink-600 font-sans">
                  <span>Forever and always, {config.girlfriendName}'s {config.boyfriendNickname}</span>
                  <span>❤️ Sealed with love</span>
                </div>
              </div>

              {/* Action Buttons: Copy Letter & Replay Animation */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleCopy}
                  className="w-full sm:w-auto h-12 px-6 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Letter Copied to Clipboard!' : 'Copy Letter Text 📋'}</span>
                </button>

                <button
                  onClick={handleReplay}
                  className="w-full sm:w-auto h-12 px-6 bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Envelope Animation 💌</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
