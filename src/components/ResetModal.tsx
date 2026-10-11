import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ResetModal: React.FC = () => {
  const { resetModalOpen, setResetModalOpen, resetAllProgress } = useApp();

  if (!resetModalOpen) return null;

  const handleConfirm = () => {
    resetAllProgress();
    setResetModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full border border-pink-200 shadow-2xl text-center space-y-4 relative"
        >
          <button
            onClick={() => setResetModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-pink-400 hover:text-pink-700 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="font-extrabold text-pink-950 text-lg">
              Reset All Progress?
            </h3>
            <p className="text-xs text-pink-700 leading-relaxed">
              This will clear your unlocked Gacha prizes and reset game counters. Your personalization settings will stay safe.
            </p>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              onClick={() => setResetModalOpen(false)}
              className="flex-1 h-11 bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 h-11 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Yes, Reset</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
