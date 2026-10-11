import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Terminal, AlertTriangle, RefreshCw, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/soundEffects';
import { fireHeartBurst } from '../utils/confetti';

export const FeatureDiagnostic: React.FC = () => {
  const { setActiveScreen, config } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [repairIndex, setRepairIndex] = useState(0);
  const [hasRepaired, setHasRepaired] = useState(false);
  const [repairCount, setRepairCount] = useState(0);

  const scanSteps = [
    'Scanning boredom levels... [CRITICALLY ELEVATED 💀]',
    'Detecting excessive cuteness... [STACK OVERFLOW 🌸]',
    'Searching for missing dopamine... [404 NOT FOUND 🔍]',
    `Connecting to ${config.boyfriendNickname}'s server... [PING: 0ms (ALWAYS ON MIND) ❤️]`,
    'Deploying emergency entertainment protocol... [100% READY 🚀]'
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setScanStep(0);
    sound.playClick();

    const interval = setInterval(() => {
      setScanStep(prev => {
        if (prev < scanSteps.length - 1) {
          sound.playClick();
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsScanning(false);
          sound.playSparkle();
          return prev;
        }
      });
    }, 450);
  };

  const handleRepairBrain = () => {
    sound.playPop();
    fireHeartBurst();
    setHasRepaired(true);
    setRepairCount(prev => prev + 1);
    setRepairIndex(prev => (prev + 1) % config.systemRepairs.length);
  };

  const currentRepair = config.systemRepairs[repairIndex];

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

        <button
          onClick={handleStartScan}
          disabled={isScanning}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 px-3 py-1.5 rounded-full transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning...' : 'Re-run Diagnostics'}</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-100/90 px-3 py-1 rounded-full">
          💀 COMEDY DIAGNOSTIC CONSOLE v2.0
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-rose-950 pt-1">
          {config.girlfriendName}.exe Has Stopped Working
        </h2>
        <p className="text-xs sm:text-sm text-rose-800">
          A 100% harmless, completely affectionate fake system health report.
        </p>
      </div>

      {/* Retro Pastel Terminal Diagnostic Card */}
      <div className="bg-slate-900 text-pink-100 rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-pink-400/40 space-y-5 font-mono">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-pink-300 ml-2">
              terminal — {config.girlfriendName.toLowerCase()}_kernel_v3.sh
            </span>
          </div>
          <span className="text-[10px] text-pink-400 font-bold bg-pink-950/60 px-2 py-0.5 rounded">
            MEM_USAGE: 99% LOVING YOU
          </span>
        </div>

        {/* Live Scan Log Stream */}
        <div className="bg-slate-950/90 rounded-2xl p-4 border border-pink-500/20 text-xs sm:text-sm space-y-2">
          <div className="text-pink-400 font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4 text-pink-400" />
            <span>DIAGNOSTIC TRACE LOGS:</span>
          </div>
          <div className="space-y-1.5 text-pink-200">
            {scanSteps.slice(0, scanStep + 1).map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-emerald-400 font-bold">&gt;</span>
                <span>{step}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Crash Report Readout */}
        <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-4 sm:p-5 space-y-3 font-sans">
          <div className="flex items-center gap-2 text-rose-300 font-extrabold text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>WARNING: {config.girlfriendName}.exe is experiencing severe boredom.</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-pink-100">
            <div className="flex items-center justify-between border-b border-pink-500/10 py-1">
              <span className="text-pink-300">Brain cells:</span>
              <span className="font-bold text-amber-300">Currently on vacation 🏖️</span>
            </div>
            <div className="flex items-center justify-between border-b border-pink-500/10 py-1">
              <span className="text-pink-300">Cuteness:</span>
              <span className="font-bold text-pink-300">Exceeds system limits 🌸</span>
            </div>
            <div className="flex items-center justify-between border-b border-pink-500/10 py-1">
              <span className="text-pink-300">{config.boyfriendNickname} dependency:</span>
              <span className="font-bold text-rose-300">Extremely suspicious 😂</span>
            </div>
            <div className="pt-1 text-xs text-pink-200 leading-relaxed">
              <strong className="text-pink-300">Recommended treatment:</strong> Laugh at this stupid app and accept one virtual hug immediately.
            </div>
          </div>
        </div>

        {/* Active Repair Result if clicked */}
        <AnimatePresence>
          {hasRepaired && (
            <motion.div
              key={currentRepair.id + repairCount}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-emerald-950/50 border border-emerald-500/50 rounded-2xl p-4 sm:p-5 space-y-2 font-sans"
            >
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{currentRepair.patchVersion}</span>
                </span>
                <span className="bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded text-[10px]">
                  REPAIR #{repairCount}
                </span>
              </div>

              <h4 className="font-extrabold text-white text-base">
                {currentRepair.headline}
              </h4>

              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {currentRepair.message}
              </p>

              <div className="text-[11px] font-mono font-bold text-emerald-300 pt-1">
                {currentRepair.status}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Big Repair Button */}
        <div className="pt-2 font-sans">
          <button
            onClick={handleRepairBrain}
            className="w-full h-14 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 active:scale-98 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>REPAIR MY BRAIN 🧠</span>
          </button>
          <p className="text-center text-[11px] text-pink-400 mt-2 font-mono">
            Every click applies a fresh comedic patch to restore smiles!
          </p>
        </div>
      </div>
    </div>
  );
};
