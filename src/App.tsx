import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DashboardView } from './components/DashboardView';
import { FeatureGacha } from './components/FeatureGacha';
import { FeatureCourt } from './components/FeatureCourt';
import { FeatureDiagnostic } from './components/FeatureDiagnostic';
import { FeatureBoyfriendSuffer } from './components/FeatureBoyfriendSuffer';
import { FeaturePunch } from './components/FeaturePunch';
import { FeatureFortune } from './components/FeatureFortune';
import { FeatureLoveLetter } from './components/FeatureLoveLetter';
import { EmergencyHappinessButton } from './components/EmergencyHappinessButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PersonalizationModal } from './components/PersonalizationModal';
import { ResetModal } from './components/ResetModal';

const MainContent: React.FC = () => {
  const { activeScreen, config } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50/40 to-purple-50/50 text-pink-950 flex flex-col font-sans selection:bg-pink-300 selection:text-pink-950">
      <Header />

      <main className="flex-1 w-full relative">
        {activeScreen === 'welcome' && <WelcomeScreen />}
        {activeScreen === 'dashboard' && <DashboardView />}
        {activeScreen === 'gacha' && <FeatureGacha />}
        {activeScreen === 'punch' && <FeaturePunch />}
        {activeScreen === 'court' && <FeatureCourt />}
        {activeScreen === 'diagnostic' && <FeatureDiagnostic />}
        {activeScreen === 'suffer' && <FeatureBoyfriendSuffer />}
        {activeScreen === 'fortune' && <FeatureFortune />}
        {activeScreen === 'letter' && <FeatureLoveLetter />}
      </main>

      {/* Floating Emergency Happiness Button (always available) */}
      <EmergencyHappinessButton />

      {/* Mobile-first bottom tab bar */}
      <MobileBottomNav />

      {/* Modals */}
      <PersonalizationModal />
      <ResetModal />

      {/* Subtle Unboxed Editorial Footer */}
      <footer className="w-full border-t border-pink-200/50 py-6 mb-14 md:mb-0 text-center text-xs text-pink-700/80">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-medium">
            Handcrafted with infinite love for {config.girlfriendName} 💗
          </p>
          <div className="flex items-center gap-2 text-pink-500 text-[11px]">
            <span>100% Free Virtual Love</span>
            <span aria-hidden="true">·</span>
            <span>Zero Boredom Guaranteed</span>
            <span aria-hidden="true">·</span>
            <span>Always Thinking of You</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
