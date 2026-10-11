export type Rarity = 'common' | 'rare' | 'legendary';

export interface GachaReward {
  id: string;
  title: string;
  description: string;
  rarity: Rarity;
  icon: string;
  probabilityWeight: number; // e.g. common: 60, rare: 30, legendary: 10
  unlockedAt?: string;
  count?: number;
}

export interface CourtCharge {
  id: number;
  title: string;
  description: string;
  evidence: string[];
  verdictGuiltyText: string;
  verdictNotGuiltyText: string;
}

export interface EmergencyDelight {
  id: string;
  type: 'compliment' | 'confession' | 'hug' | 'joke' | 'surprise';
  emoji: string;
  title: string;
  text: string;
}

export interface SystemRepair {
  id: string;
  patchVersion: string;
  headline: string;
  message: string;
  status: string;
}

export interface AppConfig {
  girlfriendName: string;
  boyfriendNickname: string;
  subtitle: string;
  welcomeSubtext: string;
  loveLetter: string;
  courtCharges: CourtCharge[];
  gachaRewards: GachaReward[];
  fortunes: string[];
  emergencyDelights: EmergencyDelight[];
  systemRepairs: SystemRepair[];
}

export type ActiveScreen = 
  | 'welcome' 
  | 'dashboard' 
  | 'gacha' 
  | 'court' 
  | 'diagnostic' 
  | 'suffer' 
  | 'punch'
  | 'fortune' 
  | 'letter';
