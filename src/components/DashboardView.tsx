import React from 'react';
import { motion } from 'motion/react';
import { Gift, Scale, Terminal, Flame, Eye, Mail, Sparkles, ArrowRight, Heart, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/soundEffects';

export const DashboardView: React.FC = () => {
  const { setActiveScreen, config, unlockedRewards, boyfriendBrainCells } = useApp();

  const totalRewards = config.gachaRewards.length;
  const unlockedCount = Object.keys(unlockedRewards).length;

  const activities = [
    {
      id: 'gacha',
      title: 'Boyfriend Gacha Machine',
      emoji: '🎰',
      tagline: 'Spin for virtual kisses, coupons & legendary love',
      badge: `${unlockedCount}/${totalRewards} Unlocked`,
      badgeColor: 'bg-pink-100 text-pink-700',
      gradient: 'from-pink-500/10 via-rose-500/10 to-purple-500/10',
      borderHover: 'hover:border-pink-400',
      icon: Gift,
      accent: 'text-pink-600',
      featured: true,
    },
    {
      id: 'punch',
      title: `Punch ${config.boyfriendNickname}!`,
      emoji: '🥊',
      tagline: 'Cartoon boxing ring! Deliver love jabs, flurry combos & K.O. kisses',
      badge: 'Boxing Arcade 💥',
      badgeColor: 'bg-red-100 text-red-700',
      gradient: 'from-red-500/10 via-rose-500/10 to-orange-500/10',
      borderHover: 'hover:border-red-400',
      icon: Zap,
      accent: 'text-red-600',
      featured: true,
    },
    {
      id: 'court',
      title: 'The Supreme Court of Pookie',
      emoji: '⚖️',
      tagline: `You are the judge. ${config.boyfriendNickname} is on trial for being cute`,
      badge: '8 Charges Ready',
      badgeColor: 'bg-purple-100 text-purple-700',
      gradient: 'from-purple-500/10 via-indigo-500/10 to-pink-500/10',
      borderHover: 'hover:border-purple-400',
      icon: Scale,
      accent: 'text-purple-600',
      featured: false,
    },
    {
      id: 'diagnostic',
      title: `${config.girlfriendName}.exe Stopped Working`,
      emoji: '💀',
      tagline: 'Harmless fake diagnostic scan & hilarious brain repairs',
      badge: 'Crash Imminent',
      badgeColor: 'bg-rose-100 text-rose-700',
      gradient: 'from-rose-500/10 via-amber-500/10 to-pink-500/10',
      borderHover: 'hover:border-rose-400',
      icon: Terminal,
      accent: 'text-rose-600',
      featured: false,
    },
    {
      id: 'suffer',
      title: `Make ${config.boyfriendNickname} Suffer`,
      emoji: '😂',
      tagline: 'Throw pillows, feed pizza, boop nose & watch him dance',
      badge: `${boyfriendBrainCells} Brain Cells Left`,
      badgeColor: 'bg-amber-100 text-amber-800',
      gradient: 'from-amber-500/10 via-orange-500/10 to-pink-500/10',
      borderHover: 'hover:border-amber-400',
      icon: Flame,
      accent: 'text-amber-600',
      featured: false,
    },
    {
      id: 'fortune',
      title: 'The Useless Fortune Teller',
      emoji: '🔮',
      tagline: 'Tap the magical pastel crystal ball for funny predictions',
      badge: '100% Inaccurate',
      badgeColor: 'bg-indigo-100 text-indigo-700',
      gradient: 'from-indigo-500/10 via-purple-500/10 to-pink-500/10',
      borderHover: 'hover:border-indigo-400',
      icon: Eye,
      accent: 'text-indigo-600',
      featured: false,
    },
    {
      id: 'letter',
      title: 'Secret Love Letter',
      emoji: '💌',
      tagline: 'A heartfelt personal message with an envelope animation',
      badge: 'Strictly Confidential',
      badgeColor: 'bg-pink-100 text-pink-700',
      gradient: 'from-rose-500/10 via-pink-500/10 to-red-500/10',
      borderHover: 'hover:border-rose-400',
      icon: Mail,
      accent: 'text-rose-600',
      featured: true,
    },
  ];

  const handleCardClick = (id: string) => {
    sound.playPop();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setActiveScreen(id as any);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      {/* Hero Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-100 bg-white/15 px-3 py-1 rounded-full backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pookie HQ · Active Session</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome to Your Universe, {config.girlfriendName}! 💗
          </h2>

          <p className="text-pink-100 text-sm sm:text-base max-w-xl leading-relaxed">
            Pick any activity below. Every single button works, every animation was crafted to make you smile, and all complaints can be filed in court! ⚖️
          </p>

          {/* Quick stats inline */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-pink-100 font-medium">
            <span className="flex items-center gap-1 bg-black/15 px-2.5 py-1 rounded-lg">
              <Gift className="w-3.5 h-3.5 text-pink-200" />
              <span>Gacha: {unlockedCount}/{totalRewards}</span>
            </span>
            <span className="flex items-center gap-1 bg-black/15 px-2.5 py-1 rounded-lg">
              <Heart className="w-3.5 h-3.5 text-rose-300" />
              <span>{config.boyfriendNickname}'s Devotion: 100%</span>
            </span>
            <span className="flex items-center gap-1 bg-black/15 px-2.5 py-1 rounded-lg">
              <span>🧠 {config.boyfriendNickname}'s Brain Cells: {boyfriendBrainCells}</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Grid of 6 Interactive Activities */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base sm:text-lg font-bold text-pink-950 flex items-center gap-2">
            <span>✨</span>
            <span>Choose Your Entertainment</span>
          </h3>
          <span className="text-xs text-pink-600 font-medium">7 Interactive Rooms</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((act, index) => {
            const Icon = act.icon;
            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(act.id)}
                className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-pink-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${act.borderHover}`}
              >
                {/* Background soft tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${act.gradient} rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                <div className="relative z-10 space-y-3">
                  {/* Top Bar with Emoji and Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {act.emoji}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${act.badgeColor}`}>
                      {act.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h4 className="font-extrabold text-pink-950 text-base sm:text-lg group-hover:text-pink-600 transition-colors flex items-center gap-1.5">
                      <span>{act.title}</span>
                    </h4>
                    <p className="text-xs text-pink-800/80 font-medium mt-1 leading-relaxed">
                      {act.tagline}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Affordance */}
                <div className="relative z-10 pt-4 mt-2 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-pink-700 group-hover:text-pink-950">
                  <span className="flex items-center gap-1">
                    <Icon className={`w-3.5 h-3.5 ${act.accent}`} />
                    <span>Open Room</span>
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
