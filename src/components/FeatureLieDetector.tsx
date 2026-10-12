import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Fingerprint, Activity, Siren, CheckCircle2, AlertTriangle, Sparkles, Send, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/soundEffects';
import { fireCelebrationConfetti, fireHeartBurst } from '../utils/confetti';

interface LieQuestion {
  id: string;
  question: string;
  verdictType: 'truth' | 'lie' | 'overload';
  verdictTitle: string;
  explanation: string;
  salakReaction: string;
  heartRate: number;
  sweatLevel: number;
}

export const FeatureLieDetector: React.FC = () => {
  const { setActiveScreen, config } = useApp();

  const questions: LieQuestion[] = [
    {
      id: 'q1',
      question: `Who is the most undeniably gorgeous girl in the entire universe?`,
      verdictType: 'truth',
      verdictTitle: '10,000% ABSOLUTE TRUTH 👑',
      explanation: `Polygraph detected ZERO resistance. Salak's brainwaves synchronized into pure worship of ${config.girlfriendName}. Scientific consensus: Undisputed queen!`,
      salakReaction: `"Not even a debate! You don't need a machine to know that, Sweetheart! 😭💗"`,
      heartRate: 110,
      sweatLevel: 10,
    },
    {
      id: 'q2',
      question: `Did you actually listen to my 8-minute voice note, or did you space out?`,
      verdictType: 'lie',
      verdictTitle: 'CAUGHT IN 4K! 🚨🤥',
      explanation: `Biometric scan reveals: Salak listened to the first 45 seconds, got completely mesmerized by your pretty voice, and forgot English for the rest!`,
      salakReaction: `"WAIT YOUR HONOR! I listened to your tone and loved every second of your cute voice! Forgive me! 🥺"`,
      heartRate: 195,
      sweatLevel: 88,
    },
    {
      id: 'q3',
      question: `Are you secretly playing games on Discord with the boys right now?`,
      verdictType: 'lie',
      verdictTitle: 'PANTS ON FIRE! 🔥🎮',
      explanation: `Sweat sensors detected rapid keyboard clicking. Salak was about to lose a ranked match while texting 'just thinking about you babe'.`,
      salakReaction: `"I paused the game I swear! Sweetheart is higher priority than any game! Please don't be mad! 😂"`,
      heartRate: 205,
      sweatLevel: 94,
    },
    {
      id: 'q4',
      question: `Do you love Sweetheart more today than you did yesterday?`,
      verdictType: 'overload',
      verdictTitle: 'SENSOR OVERLOAD: CRITICAL LOVE ❤️💥',
      explanation: `Polygraph needle broke! Devotion index exceeded maximum chart limit. System concluded: Salak’s love expands exponentially every single sunrise.`,
      salakReaction: `"I told you! Every day I love you more and more, Sweetheart. No machine can measure it! 🥹"`,
      heartRate: 220,
      sweatLevel: 25,
    },
    {
      id: 'q5',
      question: `When you texted "I'm on my way", were you still in bed?`,
      verdictType: 'lie',
      verdictTitle: '100% IN BED UNDER BLANKET! 🛌💀',
      explanation: `Thermal imaging confirmed: Salak was burrito-wrapped in bed scrolling memes. Actual departure delay: approximately 25 boyfriend minutes.`,
      salakReaction: `"My blanket held me hostage! It was a life-threatening hostage situation, Sweetheart!" 😭`,
      heartRate: 180,
      sweatLevel: 75,
    },
    {
      id: 'q6',
      question: `Did you steal a fry from my plate after claiming you weren't hungry?`,
      verdictType: 'lie',
      verdictTitle: 'GUILTY AS CHARGED! 🍟🚨',
      explanation: `Grease residue detected on Salak’s fingers. Food stolen: 3 french fries and 1 sip of boba tea.`,
      salakReaction: `"Your fries taste 1000% better than mine! It’s a scientific law of the universe!" 🍟`,
      heartRate: 165,
      sweatLevel: 62,
    },
    {
      id: 'q7',
      question: `When looking in the mirror, do you think about Sweetheart?`,
      verdictType: 'truth',
      verdictTitle: 'PURE HEARTFELT TRUTH 🪞💗',
      explanation: `Confirmed: Salak checks his reflection specifically to make sure he looks handsome enough for Sweetheart. Reflection includes invisible aura of devotion.`,
      salakReaction: `"I check if my hair looks nice because I want you to look at me and smile! 🥰"`,
      heartRate: 105,
      sweatLevel: 15,
    },
  ];

  const [selectedQuestion, setSelectedQuestion] = useState<LieQuestion>(questions[0]);
  const [customInput, setCustomInput] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<LieQuestion | null>(null);
  const [liveBpm, setLiveBpm] = useState<number>(75);
  const [liveSweat, setLiveSweat] = useState<number>(12);

  const startScan = (targetQ: LieQuestion) => {
    setIsScanning(true);
    setScanResult(null);

    // Play scanning audio sequence
    sound.playScanBeep();
    sound.playHeartbeat();

    // Ramp up live BPM and sweat
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setLiveBpm(prev => Math.min(230, prev + Math.floor(Math.random() * 20) + 10));
      setLiveSweat(prev => Math.min(100, prev + Math.floor(Math.random() * 15)));
      sound.playScanBeep();

      if (step >= 6) {
        clearInterval(interval);
        setIsScanning(false);
        setScanResult(targetQ);

        if (targetQ.verdictType === 'truth') {
          sound.playPowerup();
          fireCelebrationConfetti();
        } else if (targetQ.verdictType === 'overload') {
          sound.playLoveChime();
          fireHeartBurst();
        } else {
          sound.playBuzzer();
        }
      }
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    // Create dynamic custom lie detector response
    const isSweet = /love|pretty|beautiful|cute|sweetheart|forever|kiss/i.test(customInput);
    const customQ: LieQuestion = {
      id: `custom_${Date.now()}`,
      question: customInput.trim(),
      verdictType: isSweet ? 'truth' : 'lie',
      verdictTitle: isSweet ? '100% PURE DEVOTION ❤️' : 'NERVOUS BOYFRIEND ALERT! 🚨',
      explanation: isSweet
        ? `Biometric scan confirms: Salak loves ${config.girlfriendName} unconditionally. No doubt exists in the universe!`
        : `Polygraph detected severe stuttering and suspicious eye-darting! Salak confesses: 'Sweetheart is completely right!'`,
      salakReaction: isSweet
        ? `"See?! I told you! My love for you is 100% certified by science!" 🥰`
        : `"How do you always read my mind?! You're a wizard, Sweetheart! 😭"`,
      heartRate: isSweet ? 115 : 208,
      sweatLevel: isSweet ? 15 : 92,
    };

    setSelectedQuestion(customQ);
    startScan(customQ);
    setCustomInput('');
  };

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

        <span className="text-xs font-black bg-purple-100 text-purple-900 px-3 py-1.5 rounded-full border border-purple-300 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
          <span>BPM Monitor: {isScanning ? liveBpm : 78}</span>
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-black uppercase tracking-widest text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
          🚨 THE POOKIE POLYGRAPH 3000
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-purple-950 pt-1">
          The Boyfriend Lie Detector 🚨🤥
        </h2>
        <p className="text-xs sm:text-sm text-purple-800 font-medium">
          Interrogate Salak! Scan his biometrics to see if he's telling the truth or sweating bullets!
        </p>
      </div>

      {/* Main Polygraph Machine Arena */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-2 border-purple-300 shadow-xl space-y-6 flex flex-col items-center relative overflow-hidden">
        {/* Biometrics Status Dashboard */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 p-3.5 rounded-2xl border border-purple-200 text-center">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase text-purple-700 flex items-center justify-center gap-1">
              <Activity className="w-3 h-3 text-rose-500" />
              <span>Heart Rate</span>
            </span>
            <span className="font-mono font-black text-base sm:text-lg text-purple-950">
              {isScanning ? `${liveBpm} BPM` : scanResult ? `${scanResult.heartRate} BPM` : '78 BPM'}
            </span>
          </div>

          <div className="space-y-0.5 border-l border-purple-200">
            <span className="text-[10px] font-bold uppercase text-purple-700 flex items-center justify-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-500" />
              <span>Nervous Sweat</span>
            </span>
            <span className="font-mono font-black text-base sm:text-lg text-amber-700">
              {isScanning ? `${liveSweat}%` : scanResult ? `${scanResult.sweatLevel}%` : '12%'}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 space-y-0.5 border-t sm:border-t-0 sm:border-l border-purple-200 pt-2 sm:pt-0">
            <span className="text-[10px] font-bold uppercase text-purple-700 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-500" />
              <span>Love Level</span>
            </span>
            <span className="font-black text-sm text-rose-600">
              MAXIMUM (100%)
            </span>
          </div>
        </div>

        {/* The Interrogation Target Question */}
        <div className="w-full bg-purple-50/90 rounded-2xl p-4 border border-purple-200 text-center space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 block">
            Current Question Under Investigation:
          </span>
          <p className="text-base sm:text-lg font-black text-purple-950">
            "{selectedQuestion.question}"
          </p>
        </div>

        {/* Interactive Fingerprint Scanner Pad */}
        <div className="flex flex-col items-center space-y-3 py-2">
          <div className="relative">
            {/* Glowing Scan Rings */}
            <motion.button
              disabled={isScanning}
              onClick={() => startScan(selectedQuestion)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer relative shadow-xl ${
                isScanning
                  ? 'bg-purple-600 shadow-purple-500/50 text-white animate-pulse'
                  : 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
              }`}
            >
              <Fingerprint className={`w-14 h-14 sm:w-16 sm:h-16 ${isScanning ? 'animate-bounce' : ''}`} />
              <span className="text-[11px] font-black uppercase tracking-wider mt-1">
                {isScanning ? 'ANALYZING...' : 'SCAN SALAK'}
              </span>

              {/* Pulsing rings when scanning */}
              {isScanning && (
                <div className="absolute inset-0 rounded-full border-4 border-purple-400 animate-ping pointer-events-none" />
              )}
            </motion.button>
          </div>
          <span className="text-xs font-bold text-purple-700">
            {isScanning ? 'Scanning finger pulse and sweat glands...' : '👈 Tap scanner to test Salak’s honesty!'}
          </span>
        </div>

        {/* Scan Result Card */}
        <AnimatePresence>
          {scanResult && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-full rounded-2xl p-5 border-2 space-y-3 shadow-md ${
                scanResult.verdictType === 'truth'
                  ? 'bg-emerald-50/95 border-emerald-300'
                  : scanResult.verdictType === 'overload'
                  ? 'bg-rose-50/95 border-rose-300'
                  : 'bg-amber-50/95 border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs sm:text-sm font-black px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                    scanResult.verdictType === 'truth'
                      ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                      : scanResult.verdictType === 'overload'
                      ? 'bg-rose-100 text-rose-950 border-rose-300'
                      : 'bg-amber-100 text-amber-950 border-amber-300'
                  }`}
                >
                  {scanResult.verdictType === 'truth' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : scanResult.verdictType === 'overload' ? (
                    <Sparkles className="w-4 h-4 text-rose-600" />
                  ) : (
                    <Siren className="w-4 h-4 text-amber-600" />
                  )}
                  <span>{scanResult.verdictTitle}</span>
                </span>

                <span className="font-mono text-xs font-bold text-gray-500">
                  {scanResult.heartRate} BPM
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                {scanResult.explanation}
              </p>

              <div className="bg-white/80 rounded-xl p-3 border border-purple-200">
                <span className="text-[10px] font-black uppercase text-purple-600 block">
                  Salak's Live Reaction:
                </span>
                <p className="text-xs sm:text-sm font-black text-purple-950 italic mt-0.5">
                  {scanResult.salakReaction}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7 Preset Interrogation Questions */}
        <div className="w-full space-y-2.5 pt-2">
          <span className="text-xs font-black uppercase tracking-wider text-purple-900 block text-center">
            Pick a Preset Interrogation Question:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {questions.map(q => (
              <button
                key={q.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedQuestion(q);
                  setScanResult(null);
                }}
                className={`p-3 rounded-2xl text-left text-xs font-extrabold transition-all cursor-pointer border ${
                  selectedQuestion.id === q.id
                    ? 'bg-purple-600 text-white border-purple-700 shadow-md'
                    : 'bg-purple-50/70 hover:bg-purple-100 text-purple-950 border-purple-200'
                }`}
              >
                <span>{q.question}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Question Interrogation Form */}
        <div className="w-full bg-purple-50/70 rounded-2xl p-4 border border-purple-200 space-y-2">
          <span className="text-xs font-black text-purple-950 flex items-center gap-1.5">
            <span>✍️</span>
            <span>Ask Salak ANY Custom Question:</span>
          </span>

          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={e => setCustomInput(e.target.value)}
              placeholder="e.g. Do you really like my new hairstyle?..."
              className="flex-1 bg-white border border-purple-300 rounded-xl px-3 py-2 text-xs font-bold text-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              disabled={!customInput.trim() || isScanning}
              className="bg-purple-600 hover:bg-purple-700 active:scale-95 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>TEST HIM!</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
