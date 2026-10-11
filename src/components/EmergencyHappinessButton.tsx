import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Siren } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmergencyHappinessButton: React.FC = () => {
  const {
    emergencyOpen,
    setEmergencyOpen,
    currentEmergency,
    triggerEmergency,
  } = useApp();

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerEmergency}
          aria-label="Emergency Happiness Button"
          className="h-12 sm:h-13 px-4 sm:px-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-black text-xs sm:text-sm rounded-full shadow-lg shadow-pink-500/35 border-2 border-white/60 flex items-center gap-2 cursor-pointer transition-shadow hover:shadow-xl active:scale-95"
        >
          <Siren className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
          <span className="whitespace-nowrap">EMERGENCY HAPPINESS 🚨</span>
        </motion.button>
      </div>

      {/* Happiness Pop-up Modal */}
      <AnimatePresence>
        {emergencyOpen && currentEmergency && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border-2 border-pink-300 shadow-2xl text-center space-y-4 relative"
            >
              <button
                onClick={() => setEmergencyOpen(false)}
                className="absolute top-4 right-4 p-2 text-pink-400 hover:text-pink-700 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-5xl py-1 animate-bounce">
                {currentEmergency.emoji}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-600 bg-pink-100 px-2.5 py-0.5 rounded-full">
                  {currentEmergency.type} delivered
                </span>
                <h3 className="text-xl font-extrabold text-pink-950 pt-1">
                  {currentEmergency.title}
                </h3>
              </div>

              <p className="text-sm text-pink-800 font-medium leading-relaxed bg-pink-50/70 p-4 rounded-2xl border border-pink-100">
                “{currentEmergency.text}”
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={triggerEmergency}
                  className="w-full h-12 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Give Me Another One! 💖</span>
                </button>
                <button
                  onClick={() => setEmergencyOpen(false)}
                  className="w-full h-11 bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-pink-600 text-pink-600" />
                  <span>I Feel Better Now!</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
