import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Zap, Wifi, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MascotIllustration } from './MascotIllustration';
import { sound } from '../utils/soundEffects';
import { fireCelebrationConfetti, fireHeartBurst } from '../utils/confetti';

export const WelcomeScreen: React.FC = () => {
  const { setActiveScreen, config } = useApp();

  const handleFixBoredom = () => {
    sound.playSparkle();
    fireCelebrationConfetti();
    fireHeartBurst();

    setTimeout(() => {
      setActiveScreen('dashboard');
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Dreamy Pastel Background Glows */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-md w-full mx-auto flex flex-col items-center text-center space-y-6">
        {/* Crown & Royal Salutation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1.5"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-pink-600 uppercase bg-pink-100/90 border border-pink-200/80 px-4 py-1.5 rounded-full shadow-xs">
            <span>👑</span>
            <span>WELCOME, YOUR HIGHNESS</span>
            <span>👑</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-950 tracking-tight pt-2">
            Hello, {config.girlfriendName}! 😭💗
          </h1>

          <p className="text-sm sm:text-base text-pink-800 font-medium max-w-xs mx-auto leading-relaxed">
            Your boredom has been officially reported to {config.boyfriendNickname}'s Heart Department.
          </p>
        </motion.div>

        {/* Mascot Centerpiece */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="py-2"
        >
          <MascotIllustration size="lg" />
        </motion.div>

        {/* Status Report Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-pink-200/80 shadow-sm text-left space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-pink-900 border-b border-pink-100 pb-2">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-pink-500" />
              <span>Official Diagnostics</span>
            </span>
            <span className="text-pink-500 font-mono text-[11px]">PRIORITY: URGENT</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-pink-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Boredom Level:</span>
              </span>
              <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                CRITICALLY HIGH 💀
              </span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <span className="text-pink-700 flex items-center gap-1.5 shrink-0 pt-0.5">
                <Wifi className="w-3.5 h-3.5 text-indigo-500" />
                <span>{config.boyfriendNickname}'s Availability:</span>
              </span>
              <span className="font-medium text-indigo-900 text-right text-xs">
                Emotionally Available, Physically Depends on Wi-Fi 😂
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-pink-700 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Love Level:</span>
              </span>
              <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                ERROR — VALUE TOO LARGE ❤️
              </span>
            </div>
          </div>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full pt-1"
        >
          <button
            onClick={handleFixBoredom}
            className="w-full h-14 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer group"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>FIX MY BOREDOM IMMEDIATELY 😤</span>
          </button>
          <p className="text-[11px] text-pink-600/80 font-medium mt-2">
            ⚠️ Warning: Clicking may induce involuntary smiling and blushing.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
