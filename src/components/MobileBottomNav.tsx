import React from 'react';
import { Home, Gift, Scale, Flame, Mail, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveScreen } from '../types';
import { sound } from '../utils/soundEffects';

export const MobileBottomNav: React.FC = () => {
  const { activeScreen, setActiveScreen } = useApp();

  if (activeScreen === 'welcome') return null;

  const tabs: { id: ActiveScreen; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Hub', icon: Home },
    { id: 'gacha', label: 'Gacha', icon: Gift },
    { id: 'punch', label: 'Punch', icon: Zap },
    { id: 'court', label: 'Court', icon: Scale },
    { id: 'suffer', label: 'Suffer', icon: Flame },
    { id: 'letter', label: 'Letter', icon: Mail },
  ];

  const handleSelect = (id: ActiveScreen) => {
    sound.playPop();
    setActiveScreen(id);
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-pink-50/95 backdrop-blur-md border-t border-pink-200/70 md:hidden shadow-lg">
      <div className="grid grid-cols-6 items-center h-14 max-w-md mx-auto px-0.5">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 cursor-pointer transition-all ${
                isActive ? 'text-pink-600 font-bold' : 'text-pink-400 hover:text-pink-700 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] mt-0.5 whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
