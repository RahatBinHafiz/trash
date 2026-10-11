import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Bell, Zap, Trophy, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SalakBoxingCharacter, PunchAction } from './SalakBoxingCharacter';
import { sound } from '../utils/soundEffects';
import { fireCelebrationConfetti, fireHeartBurst } from '../utils/confetti';

export const FeaturePunch: React.FC = () => {
  const { setActiveScreen, config } = useApp();
  const [currentAction, setCurrentAction] = useState<PunchAction>('idle');
  const [powerLevel, setPowerLevel] = useState<number>(350);
  const [comboCount, setComboCount] = useState<number>(0);
  const [totalHits, setTotalHits] = useState<number>(0);
  const [coachSpeech, setCoachSpeech] = useState<string>(
    `"Salak is in the ring! Sweetheart, please show me your best punch!" 🥊`
  );
  const [lastPunchType, setLastPunchType] = useState<string>('');

  const quotes = [
    `"OOF! That punch was loaded with 100% cuteness!"`,
    `"My jaw! But your smile made the pain disappear instantly!"`,
    `"Coach told me to dodge, but I can't look away from your pretty face!"`,
    `"Is that all, champion? Wait no, please be gentle!"`,
    `"10/10 technique! Pure championship level affection!"`,
    `"Down goes Salak! Defeated by the undisputed love of his life!"`,
    `"Your punches feel like warm marshmallow kisses!"`
  ];

  const handlePunch = (type: PunchAction) => {
    setCurrentAction(type);
    setTotalHits(prev => prev + 1);
    setComboCount(prev => prev + 1);

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    switch (type) {
      case 'jab':
        sound.playPunch();
        setPowerLevel(prev => prev + 120);
        setLastPunchType('Love Jab (+120 PSI)');
        setCoachSpeech(`"POW! Fast and squeaky! ${randomQuote}"`);
        break;

      case 'uppercut':
        sound.playPunch();
        sound.playSparkle();
        setPowerLevel(prev => prev + 450);
        setLastPunchType('Mega Uppercut (+450 PSI)');
        setCoachSpeech(`"TO THE MOON! Salak's brain is orbiting outer space! 🚀"`);
        break;

      case 'flurry':
        sound.playWhack();
        setTimeout(() => sound.playPunch(), 120);
        setTimeout(() => sound.playWhack(), 240);
        setPowerLevel(prev => prev + 800);
        setLastPunchType('Flurry Barrage (+800 PSI)');
        setCoachSpeech(`"ORA ORA ORA! 🌪️ Too many punches at once, your majesty!"`);
        break;

      case 'slap':
        sound.playWhack();
        setPowerLevel(prev => prev + 250);
        setLastPunchType('Cheek Slap (+250 PSI)');
        setCoachSpeech(`"SMACK! My cheek is rosy red! Valid hit! 👋😂"`);
        break;

      case 'kiss':
        sound.playLoveChime();
        sound.playBoxingBell();
        fireCelebrationConfetti();
        fireHeartBurst();
        setPowerLevel(prev => prev + 1500);
        setLastPunchType('K.O. Kiss Attack (+1500 PSI)');
        setCoachSpeech(`"CRITICAL KNOCKOUT! 💋 Salak has fainted from extreme happiness!"`);
        break;

      case 'ko':
        sound.playBoxingBell();
        fireCelebrationConfetti();
        setPowerLevel(prev => prev + 1000);
        setLastPunchType('K.O. Finish (+1000 PSI)');
        setCoachSpeech(`"DING DING DING! ${config.girlfriendName} wins by unanimous decision! 👑"`);
        break;
    }

    // Reset to idle after animation
    if (type !== 'ko') {
      setTimeout(() => {
        setCurrentAction('idle');
      }, type === 'flurry' ? 1200 : 700);
    }
  };

  const handleRingBell = () => {
    sound.playBoxingBell();
    setCoachSpeech(`"DING DING DING! Round ${Math.floor(totalHits / 5) + 1} begins! Fight with love!"`);
  };

  const handleRevive = () => {
    sound.playSparkle();
    setCurrentAction('idle');
    setComboCount(0);
    setCoachSpeech(`"Salak has taken a sip of water and is ready for more love punches! 🥤"`);
  };

  // Determine Boxing Rank
  const getRank = () => {
    if (totalHits >= 50) return { title: 'Undisputed World Champion 👑', color: 'text-amber-500' };
    if (totalHits >= 25) return { title: 'Heavyweight Sweetheart 🥇', color: 'text-rose-500' };
    if (totalHits >= 10) return { title: 'Golden Featherweight 🥈', color: 'text-purple-500' };
    return { title: 'Cute Rookie Boxer 🥉', color: 'text-pink-600' };
  };

  const rank = getRank();

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

        <div className="flex items-center gap-2">
          <button
            onClick={handleRingBell}
            title="Ring Boxing Bell"
            className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full transition-all cursor-pointer active:scale-95"
          >
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            <span>Ring Bell! 🔔</span>
          </button>

          <button
            onClick={handleRevive}
            title="Revive Salak"
            className="flex items-center gap-1 text-xs font-bold text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-full transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
            <span>Revive Salak</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-100/90 px-3 py-1 rounded-full">
          🥊 CARTOON BOXING ARCADE · CHAMPIONSHIP BOUT
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-rose-950 pt-1">
          Punch {config.boyfriendNickname}! 🥊💥
        </h2>
        <p className="text-xs sm:text-sm text-rose-800 font-medium">
          {config.girlfriendName} is the undefeated champion. Tap Salak or choose a punch attack below!
        </p>
      </div>

      {/* Main Boxing Ring Arena Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-rose-300 shadow-md space-y-6 flex flex-col items-center relative overflow-hidden">
        {/* Championship HUD Scoreboard */}
        <div className="w-full grid grid-cols-3 gap-2 bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 p-3 rounded-2xl border border-rose-200 text-center">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase text-rose-600 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Punch Power</span>
            </span>
            <span className="font-black text-sm sm:text-base text-rose-950 font-mono">
              {powerLevel >= 9999 ? '9999+ (OVER 9000!)' : `${powerLevel} PSI`}
            </span>
          </div>

          <div className="space-y-0.5 border-x border-rose-200">
            <span className="text-[10px] font-bold uppercase text-purple-600 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-500" />
              <span>Combo Streak</span>
            </span>
            <span className="font-black text-sm sm:text-base text-purple-900 font-mono">
              {comboCount}× HITS!
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase text-amber-600 flex items-center justify-center gap-1">
              <Trophy className="w-3 h-3 text-amber-500" />
              <span>Rank Belt</span>
            </span>
            <span className={`font-black text-xs sm:text-sm truncate block ${rank.color}`}>
              {rank.title}
            </span>
          </div>
        </div>

        {/* Coach / Salak Speech Bubble */}
        <div className="relative max-w-sm w-full">
          <motion.div
            key={coachSpeech}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white border-2 border-rose-300 rounded-2xl p-3 shadow-sm text-center relative z-20"
          >
            <p className="text-xs sm:text-sm font-extrabold text-rose-950">
              {coachSpeech}
            </p>
            {lastPunchType && (
              <span className="text-[10px] text-rose-500 font-mono font-bold block mt-1">
                Last Hit: {lastPunchType}
              </span>
            )}
            <div className="w-3 h-3 bg-white border-r-2 border-b-2 border-rose-300 transform rotate-45 absolute -bottom-2 left-1/2 -ml-1.5" />
          </motion.div>
        </div>

        {/* Interactive Boxing Character (Tap on character to Jab!) */}
        <div className="py-2">
          <SalakBoxingCharacter
            action={currentAction}
            girlfriendName={config.girlfriendName}
            onCharacterClick={() => handlePunch('jab')}
          />
        </div>

        {/* Interactive Punch Moves Controls */}
        <div className="w-full space-y-2.5">
          <p className="text-center text-xs font-black uppercase tracking-wider text-rose-800">
            Select Your Punch Combo:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => handlePunch('jab')}
              className="h-13 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm shadow-rose-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>LOVE JAB 🥊</span>
            </button>

            <button
              onClick={() => handlePunch('uppercut')}
              className="h-13 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm shadow-amber-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>UPPERCUT 💥</span>
            </button>

            <button
              onClick={() => handlePunch('flurry')}
              className="h-13 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm shadow-purple-600/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>FLURRY 🌪️</span>
            </button>

            <button
              onClick={() => handlePunch('slap')}
              className="h-13 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm shadow-orange-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>CHEEK SLAP 👋</span>
            </button>

            <button
              onClick={() => handlePunch('kiss')}
              className="h-13 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm shadow-pink-500/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>K.O. KISS 💋</span>
            </button>

            <button
              onClick={() => handlePunch('ko')}
              className="h-13 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm shadow-slate-900/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>FINAL K.O. 🏆</span>
            </button>
          </div>
        </div>

        {/* Total Punches Record */}
        <div className="text-[11px] text-rose-700 font-bold">
          Total Punches Delivered: {totalHits} · Damage to Salak's Heart: 100% Fallen in Love
        </div>
      </div>
    </div>
  );
};
