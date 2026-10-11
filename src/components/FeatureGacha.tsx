import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Trophy, RotateCcw, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GachaMachineIllustration } from './GachaMachineIllustration';
import { GachaReward, Rarity } from '../types';
import { sound } from '../utils/soundEffects';
import { fireCelebrationConfetti, fireLegendaryConfetti } from '../utils/confetti';

export const FeatureGacha: React.FC = () => {
  const { setActiveScreen, config, unlockedRewards, addUnlockedReward, totalSpins } = useApp();
  const [isSpinning, setIsSpinning] = useState(false);
  const [statusText, setStatusText] = useState<string>('');
  const [revealedReward, setRevealedReward] = useState<GachaReward | null>(null);
  const [filterRarity, setFilterRarity] = useState<'all' | Rarity>('all');
  const [detailReward, setDetailReward] = useState<GachaReward | null>(null);

  // Weighted Random Logic
  const getRandomReward = (): GachaReward => {
    // Generate random number 0 to 100
    const roll = Math.random() * 100;
    let targetRarity: Rarity;

    if (roll < 60) {
      targetRarity = 'common'; // 60% probability
    } else if (roll < 90) {
      targetRarity = 'rare'; // 30% probability
    } else {
      targetRarity = 'legendary'; // 10% probability
    }

    // Filter available rewards by rarity
    const candidatePool = config.gachaRewards.filter(r => r.rarity === targetRarity);
    const selected = candidatePool[Math.floor(Math.random() * candidatePool.length)];
    return selected || config.gachaRewards[0];
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setRevealedReward(null);
    sound.playClick();

    // Fun progression of status messages
    setStatusText(`Contacting ${config.boyfriendNickname}'s heart server...`);

    setTimeout(() => {
      setStatusText('Encrypting virtual kisses for sweetheart...');
      sound.playClick();
    }, 600);

    setTimeout(() => {
      setStatusText('Dispensing love capsule...');
      sound.playClick();
    }, 1200);

    setTimeout(() => {
      const reward = getRandomReward();
      setIsSpinning(false);
      setRevealedReward(reward);
      addUnlockedReward(reward);

      if (reward.rarity === 'legendary') {
        sound.playFanfare();
        fireLegendaryConfetti();
      } else {
        sound.playSparkle();
        fireCelebrationConfetti();
      }
    }, 1900);
  };

  const unlockedList = Object.values(unlockedRewards);
  const filteredUnlocked = unlockedList.filter(item => {
    if (filterRarity === 'all') return true;
    return item.reward.rarity === filterRarity;
  });

  const getRarityBadgeStyle = (rarity: Rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs';
      case 'rare':
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 'common':
      default:
        return 'bg-pink-100 text-pink-700 border border-pink-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28 space-y-8">
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

        <div className="flex items-center gap-2 text-xs font-semibold text-pink-700">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Total Spins: {totalSpins}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-950 flex items-center justify-center gap-2">
          <span>🎰</span>
          <span>{config.boyfriendNickname}'s Gacha Machine</span>
          <span>💋</span>
        </h2>
        <p className="text-xs sm:text-sm text-pink-800 max-w-md mx-auto">
          Drop a virtual coin and spin for endless kisses, coupons, and devotion from {config.boyfriendNickname}.
        </p>
      </div>

      {/* Machine & Spin Section */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-md flex flex-col items-center text-center space-y-6 relative overflow-hidden">
        {/* Machine Illustration */}
        <GachaMachineIllustration isSpinning={isSpinning} />

        {/* Spin Status Feedback */}
        <div className="h-6 flex items-center justify-center">
          {isSpinning ? (
            <motion.p
              key="spinning"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm font-bold text-purple-600 animate-pulse"
            >
              ⚡ {statusText}
            </motion.p>
          ) : (
            <p className="text-xs text-pink-600/80 font-medium">
              Capsules loaded: 60% Common · 30% Rare · 10% Legendary
            </p>
          )}
        </div>

        {/* Giant Spin Button */}
        <button
          disabled={isSpinning}
          onClick={handleSpin}
          className={`w-full max-w-sm h-14 sm:h-16 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            isSpinning
              ? 'bg-pink-300 text-white cursor-not-allowed scale-98'
              : 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 active:scale-95 shadow-pink-500/30'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'SPINNING HEART SERVER...' : `SPIN FOR ${config.boyfriendNickname.toUpperCase()} REWARDS 🎁`}</span>
        </button>
      </div>

      {/* Modal / Reveal Announcement when a reward is spun */}
      <AnimatePresence>
        {revealedReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border-2 border-pink-300 shadow-2xl text-center space-y-4 relative">
              <button
                onClick={() => setRevealedReward(null)}
                className="absolute top-4 right-4 p-2 text-pink-400 hover:text-pink-700 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pt-2">
                <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full ${getRarityBadgeStyle(revealedReward.rarity)}`}>
                  {revealedReward.rarity} REWARD
                </span>
              </div>

              <div className="text-6xl py-1 filter drop-shadow">
                {revealedReward.icon}
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-pink-950">
                  {revealedReward.title}
                </h3>
                <p className="text-sm text-pink-800 mt-2 leading-relaxed">
                  {revealedReward.description}
                </p>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    setRevealedReward(null);
                    handleSpin();
                  }}
                  className="flex-1 h-12 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Spin Again!</span>
                </button>
                <button
                  onClick={() => setRevealedReward(null)}
                  className="flex-1 h-12 bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Claim & Keep</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rewards Collection Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border border-pink-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-100 pb-3">
          <div>
            <h3 className="font-extrabold text-pink-950 text-lg flex items-center gap-2">
              <span>🏆</span>
              <span>Your Unlocked Rewards Collection</span>
            </h3>
            <p className="text-xs text-pink-700">
              Unlocked: {unlockedList.length} / {config.gachaRewards.length} prizes collected
            </p>
          </div>

          {/* Interactive filter tabs (functional buttons) */}
          <div className="flex items-center gap-1 p-1 bg-pink-100/80 rounded-xl self-start sm:self-auto">
            {(['all', 'common', 'rare', 'legendary'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterRarity(tab)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                  filterRarity === tab
                    ? 'bg-white text-pink-950 shadow-xs'
                    : 'text-pink-700 hover:text-pink-950'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Unlocked Items Grid */}
        {filteredUnlocked.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <span className="text-4xl">🎁</span>
            <p className="text-sm font-bold text-pink-900">
              {filterRarity === 'all'
                ? 'No prizes unlocked yet!'
                : `No ${filterRarity} rewards in your collection yet.`}
            </p>
            <p className="text-xs text-pink-600">
              Click the big button above to spin your first prize capsule!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredUnlocked.map(({ reward, count, unlockedAt }) => (
              <div
                key={reward.id}
                onClick={() => setDetailReward(reward)}
                className="bg-white/95 rounded-2xl p-4 border border-pink-200 hover:border-pink-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl">{reward.icon}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${getRarityBadgeStyle(reward.rarity)}`}>
                      {reward.rarity}
                    </span>
                    {count > 1 && (
                      <span className="text-[10px] font-bold text-pink-600 bg-pink-100 px-1.5 py-0.5 rounded-md">
                        ×{count}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-pink-950 text-sm line-clamp-1">
                    {reward.title}
                  </h4>
                  <p className="text-xs text-pink-700/80 line-clamp-2 mt-1">
                    {reward.description}
                  </p>
                </div>

                <div className="text-[10px] text-pink-400 pt-1 border-t border-pink-50 flex items-center justify-between">
                  <span>First collected: {unlockedAt}</span>
                  <span className="text-pink-600 font-semibold">Tap to view</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inspect Item Modal */}
      <AnimatePresence>
        {detailReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs"
          >
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-pink-300 shadow-xl text-center space-y-4 relative">
              <button
                onClick={() => setDetailReward(null)}
                className="absolute top-4 right-4 p-2 text-pink-400 hover:text-pink-700 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full ${getRarityBadgeStyle(detailReward.rarity)}`}>
                {detailReward.rarity} REWARD
              </span>

              <div className="text-5xl py-1">{detailReward.icon}</div>

              <div>
                <h3 className="text-lg font-black text-pink-950">{detailReward.title}</h3>
                <p className="text-sm text-pink-800 mt-2 leading-relaxed">{detailReward.description}</p>
              </div>

              <button
                onClick={() => setDetailReward(null)}
                className="w-full h-11 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
