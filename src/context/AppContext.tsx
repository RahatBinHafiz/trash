import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ActiveScreen, AppConfig, GachaReward, EmergencyDelight } from '../types';
import { DEFAULT_CONFIG } from '../config/defaultConfig';
import { sound } from '../utils/soundEffects';
import { fireHeartBurst } from '../utils/confetti';

interface UnlockedRecord {
  reward: GachaReward;
  unlockedAt: string;
  count: number;
}

interface AppContextType {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  config: AppConfig;
  updateConfig: (newConfig: Partial<AppConfig>) => void;
  resetConfig: () => void;
  unlockedRewards: Record<string, UnlockedRecord>;
  addUnlockedReward: (reward: GachaReward) => void;
  resetAllProgress: () => void;
  soundMuted: boolean;
  toggleSound: () => void;
  emergencyOpen: boolean;
  setEmergencyOpen: (open: boolean) => void;
  currentEmergency: EmergencyDelight | null;
  triggerEmergency: () => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  resetModalOpen: boolean;
  setResetModalOpen: (open: boolean) => void;
  boyfriendBrainCells: number;
  setBoyfriendBrainCells: React.Dispatch<React.SetStateAction<number>>;
  totalSpins: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'pookie_config_v3',
  REWARDS: 'pookie_unlocked_rewards_v1',
  TOTAL_SPINS: 'pookie_total_spins_v1',
  BRAIN_CELLS: 'pookie_brain_cells_v1',
  ACTIVE_SCREEN: 'pookie_active_screen_v1',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreenState] = useState<ActiveScreen>('welcome');
  const [soundMuted, setSoundMuted] = useState<boolean>(() => sound.isMuted());
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [currentEmergency, setCurrentEmergency] = useState<EmergencyDelight | null>(null);
  const [lastEmergencyId, setLastEmergencyId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [totalSpins, setTotalSpins] = useState<number>(0);
  const [boyfriendBrainCells, setBoyfriendBrainCells] = useState<number>(3);

  // Load config from localStorage
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const savedV2 = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (savedV2) {
        const parsed = JSON.parse(savedV2);
        return { ...DEFAULT_CONFIG, ...parsed };
      }
      // Migrate from v1 if present
      const savedV1 = localStorage.getItem('pookie_config_v1');
      if (savedV1) {
        localStorage.removeItem('pookie_config_v1');
      }
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG;
  });

  // Load unlocked rewards from localStorage
  const [unlockedRewards, setUnlockedRewards] = useState<Record<string, UnlockedRecord>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REWARDS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {};
  });

  // Initial load of stats
  useEffect(() => {
    try {
      const savedSpins = localStorage.getItem(STORAGE_KEYS.TOTAL_SPINS);
      if (savedSpins) setTotalSpins(parseInt(savedSpins, 10) || 0);

      const savedCells = localStorage.getItem(STORAGE_KEYS.BRAIN_CELLS);
      if (savedCells !== null) setBoyfriendBrainCells(parseInt(savedCells, 10) ?? 3);
    } catch {
      // ignore
    }
  }, []);

  // Sync config to localStorage
  const updateConfig = (newVals: Partial<AppConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newVals };
      try {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEYS.CONFIG);
    } catch {
      // ignore
    }
  };

  const addUnlockedReward = (reward: GachaReward) => {
    setUnlockedRewards(prev => {
      const existing = prev[reward.id];
      const count = existing ? existing.count + 1 : 1;
      const updated: Record<string, UnlockedRecord> = {
        ...prev,
        [reward.id]: {
          reward,
          unlockedAt: existing ? existing.unlockedAt : new Date().toLocaleDateString(),
          count
        }
      };
      try {
        localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    setTotalSpins(prev => {
      const next = prev + 1;
      try {
        localStorage.setItem(STORAGE_KEYS.TOTAL_SPINS, next.toString());
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetAllProgress = () => {
    setUnlockedRewards({});
    setTotalSpins(0);
    setBoyfriendBrainCells(3);
    try {
      localStorage.removeItem(STORAGE_KEYS.REWARDS);
      localStorage.removeItem(STORAGE_KEYS.TOTAL_SPINS);
      localStorage.removeItem(STORAGE_KEYS.BRAIN_CELLS);
    } catch {
      // ignore
    }
    sound.playPop();
  };

  const toggleSound = () => {
    const isNowMuted = sound.toggleMuted();
    setSoundMuted(isNowMuted);
    if (!isNowMuted) {
      sound.playSparkle();
    }
  };

  const setActiveScreen = (screen: ActiveScreen) => {
    setActiveScreenState(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerEmergency = () => {
    sound.playSparkle();
    fireHeartBurst();

    // Pick random non-repeating delight
    const pool = config.emergencyDelights.filter(d => d.id !== lastEmergencyId);
    const selected = pool[Math.floor(Math.random() * pool.length)] || config.emergencyDelights[0];

    setLastEmergencyId(selected.id);
    setCurrentEmergency(selected);
    setEmergencyOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        config,
        updateConfig,
        resetConfig,
        unlockedRewards,
        addUnlockedReward,
        resetAllProgress,
        soundMuted,
        toggleSound,
        emergencyOpen,
        setEmergencyOpen,
        currentEmergency,
        triggerEmergency,
        settingsOpen,
        setSettingsOpen,
        resetModalOpen,
        setResetModalOpen,
        boyfriendBrainCells,
        setBoyfriendBrainCells,
        totalSpins,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
};
