import React from 'react';
import { Volume2, VolumeX, Settings, RotateCcw, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    activeScreen,
    setActiveScreen,
    soundMuted,
    toggleSound,
    setSettingsOpen,
    setResetModalOpen,
    unlockedRewards,
    config
  } = useApp();

  const totalRewardsCount = config.gachaRewards.length;
  const unlockedCount = Object.keys(unlockedRewards).length;

  return (
    <header className="sticky top-0 z-40 bg-pink-50/85 backdrop-blur-md border-b border-pink-200/60 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveScreen(activeScreen === 'welcome' ? 'welcome' : 'dashboard')}
          className="flex items-center gap-2 group text-left cursor-pointer transition-transform active:scale-95 shrink-0"
        >
          <span className="text-2xl drop-shadow-sm group-hover:rotate-12 transition-transform">💗</span>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-pink-900 group-hover:text-pink-600 transition-colors whitespace-nowrap">
              Pookie Land
            </span>
            <span className="text-[10px] font-medium text-pink-500 hidden sm:inline whitespace-nowrap -mt-1">
              For {config.girlfriendName} · By {config.boyfriendNickname}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (unboxed, clean typography) */}
        {activeScreen !== 'welcome' && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-pink-800">
            <button
              onClick={() => setActiveScreen('dashboard')}
              className={`hover:text-pink-950 transition-colors whitespace-nowrap cursor-pointer ${
                activeScreen === 'dashboard' ? 'font-bold text-pink-950 underline decoration-pink-400 decoration-2 underline-offset-4' : ''
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveScreen('gacha')}
              className={`hover:text-pink-950 transition-colors whitespace-nowrap cursor-pointer ${
                activeScreen === 'gacha' ? 'font-bold text-pink-950 underline decoration-pink-400 decoration-2 underline-offset-4' : ''
              }`}
            >
              Gacha Machine
            </button>
            <button
              onClick={() => setActiveScreen('snackcatcher')}
              className={`hover:text-pink-950 transition-colors whitespace-nowrap cursor-pointer ${
                activeScreen === 'snackcatcher' ? 'font-bold text-pink-950 underline decoration-pink-400 decoration-2 underline-offset-4' : ''
              }`}
            >
              Snack Catcher 🧋
            </button>
            <button
              onClick={() => setActiveScreen('punch')}
              className={`hover:text-pink-950 transition-colors whitespace-nowrap cursor-pointer ${
                activeScreen === 'punch' ? 'font-bold text-pink-950 underline decoration-pink-400 decoration-2 underline-offset-4' : ''
              }`}
            >
              Punch Arcade
            </button>
            <button
              onClick={() => setActiveScreen('wheel')}
              className={`hover:text-pink-950 transition-colors whitespace-nowrap cursor-pointer ${
                activeScreen === 'wheel' ? 'font-bold text-pink-950 underline decoration-pink-400 decoration-2 underline-offset-4' : ''
              }`}
            >
              Penalty Wheel 🎡
            </button>
            <button
              onClick={() => setActiveScreen('liedetector')}
              className={`hover:text-pink-950 transition-colors whitespace-nowrap cursor-pointer ${
                activeScreen === 'liedetector' ? 'font-bold text-pink-950 underline decoration-pink-400 decoration-2 underline-offset-4' : ''
              }`}
            >
              Lie Detector 🚨
            </button>
            <button
              onClick={() => setActiveScreen('court')}
              className={`hover:text-pink-950 transition-colors whitespace-nowrap cursor-pointer ${
                activeScreen === 'court' ? 'font-bold text-pink-950 underline decoration-pink-400 decoration-2 underline-offset-4' : ''
              }`}
            >
              Pookie Court
            </button>
            <button
              onClick={() => setActiveScreen('suffer')}
              className={`hover:text-pink-950 transition-colors whitespace-nowrap cursor-pointer ${
                activeScreen === 'suffer' ? 'font-bold text-pink-950 underline decoration-pink-400 decoration-2 underline-offset-4' : ''
              }`}
            >
              Suffer Mini-Game
            </button>
            <button
              onClick={() => setActiveScreen('fortune')}
              className={`hover:text-pink-950 transition-colors whitespace-nowrap cursor-pointer ${
                activeScreen === 'fortune' ? 'font-bold text-pink-950 underline decoration-pink-400 decoration-2 underline-offset-4' : ''
              }`}
            >
              Fortune Teller
            </button>
            <button
              onClick={() => setActiveScreen('letter')}
              className={`hover:text-pink-950 transition-colors whitespace-nowrap cursor-pointer ${
                activeScreen === 'letter' ? 'font-bold text-pink-950 underline decoration-pink-400 decoration-2 underline-offset-4' : ''
              }`}
            >
              Secret Letter
            </button>
          </nav>
        )}

        {/* Zone 3: Primary Actions (Touch targets >= 44px) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Rewards Unboxed Indicator */}
          {activeScreen !== 'welcome' && (
            <button
              onClick={() => setActiveScreen('gacha')}
              title="Unlocked Gacha Rewards"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-pink-700 bg-pink-100/80 hover:bg-pink-200/80 px-2.5 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer mr-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>{unlockedCount}/{totalRewardsCount} Unlocked</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={soundMuted ? 'Sound Muted' : 'Sound On'}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-pink-700 hover:text-pink-900 hover:bg-pink-100 active:scale-95 transition-all cursor-pointer"
          >
            {soundMuted ? (
              <VolumeX className="w-5 h-5 text-pink-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-pink-600" />
            )}
          </button>

          {/* Settings / Personalization */}
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="Customize Personalization"
            title="Personalization Settings"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-pink-700 hover:text-pink-900 hover:bg-pink-100 active:scale-95 transition-all cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Reset Progress */}
          <button
            onClick={() => setResetModalOpen(true)}
            aria-label="Reset Progress"
            title="Reset Game Progress"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-pink-600 hover:text-pink-900 hover:bg-pink-100 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
