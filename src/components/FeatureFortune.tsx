import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, RefreshCw, Eye, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CrystalBallIllustration } from './CrystalBallIllustration';
import { sound } from '../utils/soundEffects';

export const FeatureFortune: React.FC = () => {
  const { setActiveScreen, config } = useApp();
  const [isConsulting, setIsConsulting] = useState(false);
  const [currentFortune, setCurrentFortune] = useState<string>(config.fortunes[0]);
  const [consultCount, setConsultCount] = useState(1);
  const [lastIndex, setLastIndex] = useState(0);

  const handleConsult = () => {
    if (isConsulting) return;

    setIsConsulting(true);
    sound.playMystic();

    setTimeout(() => {
      // Pick random non-repeating fortune
      let newIdx = Math.floor(Math.random() * config.fortunes.length);
      if (newIdx === lastIndex && config.fortunes.length > 1) {
        newIdx = (newIdx + 1) % config.fortunes.length;
      }

      setLastIndex(newIdx);
      setCurrentFortune(config.fortunes[newIdx]);
      setIsConsulting(false);
      setConsultCount(prev => prev + 1);
      sound.playSparkle();
    }, 1200);
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

        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Fortunes Cast: {consultCount}
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-100/90 px-3 py-1 rounded-full">
          🔮 100% ACCURATELY INACCURATE PROPHECIES
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 pt-1">
          The Useless Fortune Teller
        </h2>
        <p className="text-xs sm:text-sm text-indigo-800">
          Tap the celestial crystal ball to unveil your destiny with {config.boyfriendNickname}.
        </p>
      </div>

      {/* Crystal Ball Card */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 shadow-md flex flex-col items-center text-center space-y-6 relative overflow-hidden">
        {/* Crystal Ball with Interactive Tap */}
        <CrystalBallIllustration isConsulting={isConsulting} onClick={handleConsult} />

        <p className="text-xs text-indigo-600 font-medium">
          {isConsulting ? '✨ Peering into the romantic cosmos...' : 'Tap the crystal ball or click below!'}
        </p>

        {/* Fortune Output Box */}
        <div className="w-full max-w-lg min-h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isConsulting ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                <span>Aligning stars with {config.boyfriendNickname}'s heart frequency...</span>
              </motion.div>
            ) : (
              <motion.div
                key={currentFortune}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border-2 border-indigo-200/90 text-indigo-950 shadow-xs space-y-2 relative"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-widest">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>The Crystal Ball Has Spoken</span>
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </div>

                <p className="text-base sm:text-lg font-extrabold text-indigo-950 leading-relaxed">
                  “{currentFortune}”
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Consult Button */}
        <button
          disabled={isConsulting}
          onClick={handleConsult}
          className="w-full max-w-sm h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isConsulting ? 'animate-spin' : ''}`} />
          <span>{isConsulting ? 'READING COSMOS...' : 'CONSULT THE CRYSTAL BALL AGAIN 🔮'}</span>
        </button>
      </div>
    </div>
  );
};
