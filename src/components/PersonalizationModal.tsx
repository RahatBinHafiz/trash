import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, RotateCcw, User, HeartHandshake, FileText, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/soundEffects';

export const PersonalizationModal: React.FC = () => {
  const { settingsOpen, setSettingsOpen, config, updateConfig, resetConfig } = useApp();

  const [gfName, setGfName] = useState(config.girlfriendName);
  const [bfNick, setBfNick] = useState(config.boyfriendNickname);
  const [letterText, setLetterText] = useState(config.loveLetter);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state if modal reopens
  React.useEffect(() => {
    if (settingsOpen) {
      setGfName(config.girlfriendName);
      setBfNick(config.boyfriendNickname);
      setLetterText(config.loveLetter);
      setSavedSuccess(false);
    }
  }, [settingsOpen, config]);

  if (!settingsOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      girlfriendName: gfName.trim() || 'Suhana',
      boyfriendNickname: bfNick.trim() || 'Her favorite idiot',
      loveLetter: letterText.trim(),
    });

    sound.playSparkle();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setSettingsOpen(false);
    }, 900);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all customization settings back to original defaults?')) {
      resetConfig();
      sound.playPop();
      setSettingsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-pink-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-pink-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚙️</span>
              <div>
                <h3 className="font-extrabold text-pink-950 text-lg">
                  Personalization Center
                </h3>
                <p className="text-xs text-pink-600">
                  Tailor Pookie Land to fit your inside jokes and nicknames.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSettingsOpen(false)}
              className="p-1.5 text-pink-400 hover:text-pink-700 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-left">
            {/* Girlfriend's Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-pink-900 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-pink-500" />
                <span>Girlfriend's Name:</span>
              </label>
              <input
                type="text"
                value={gfName}
                onChange={e => setGfName(e.target.value)}
                placeholder="e.g. Sweetheart"
                className="w-full h-11 px-3.5 bg-pink-50/50 border border-pink-200 rounded-xl text-sm font-semibold text-pink-950 focus:outline-pink-500 focus:bg-white transition-all"
              />
            </div>

            {/* Boyfriend's Nickname */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-pink-900 flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-pink-500" />
                <span>Boyfriend's Nickname:</span>
              </label>
              <input
                type="text"
                value={bfNick}
                onChange={e => setBfNick(e.target.value)}
                placeholder="e.g. Salak"
                className="w-full h-11 px-3.5 bg-pink-50/50 border border-pink-200 rounded-xl text-sm font-semibold text-pink-950 focus:outline-pink-500 focus:bg-white transition-all"
              />
            </div>

            {/* Secret Love Letter Body */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-pink-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-pink-500" />
                <span>Secret Love Letter Content:</span>
              </label>
              <textarea
                rows={6}
                value={letterText}
                onChange={e => setLetterText(e.target.value)}
                placeholder="Write your custom letter here..."
                className="w-full p-3 bg-pink-50/50 border border-pink-200 rounded-xl text-xs sm:text-sm font-mono text-pink-950 focus:outline-pink-500 focus:bg-white transition-all resize-y"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-pink-100">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="text-xs font-bold text-pink-600 hover:text-pink-900 flex items-center gap-1 cursor-pointer order-2 sm:order-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Defaults</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto h-11 px-6 bg-pink-600 hover:bg-pink-700 active:scale-95 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer order-1 sm:order-2"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{savedSuccess ? 'Saved!' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
