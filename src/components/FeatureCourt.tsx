import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Gavel, Search, Check, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/soundEffects';
import { fireCelebrationConfetti } from '../utils/confetti';

export const FeatureCourt: React.FC = () => {
  const { setActiveScreen, config } = useApp();
  const [currentChargeIndex, setCurrentChargeIndex] = useState(0);
  const [verdict, setVerdict] = useState<'GUILTY' | 'NOT_GUILTY' | 'EVIDENCE' | null>(null);
  const [investigating, setInvestigating] = useState(false);
  const [investigationStep, setInvestigationStep] = useState(0);
  const [gavelBanging, setGavelBanging] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const currentCharge = config.courtCharges[currentChargeIndex];

  const bangGavel = () => {
    setGavelBanging(true);
    sound.playGavel();
    setTimeout(() => setGavelBanging(false), 500);
  };

  const handleVerdict = (choice: 'GUILTY' | 'NOT_GUILTY' | 'EVIDENCE') => {
    bangGavel();

    if (choice === 'EVIDENCE') {
      setInvestigating(true);
      setInvestigationStep(0);
      setVerdict(null);

      // Investigation animation steps
      setTimeout(() => setInvestigationStep(1), 700);
      setTimeout(() => setInvestigationStep(2), 1400);
      setTimeout(() => {
        setInvestigating(false);
        setVerdict('EVIDENCE');
        sound.playSparkle();
      }, 2100);
    } else {
      setVerdict(choice);
      if (choice === 'GUILTY') {
        fireCelebrationConfetti();
        sound.playSparkle();
      }
    }
  };

  const handleNextCharge = () => {
    sound.playPop();
    setVerdict(null);
    setCurrentChargeIndex(prev => (prev + 1) % config.courtCharges.length);
  };

  const handlePrevCharge = () => {
    sound.playPop();
    setVerdict(null);
    setCurrentChargeIndex(prev => (prev - 1 + config.courtCharges.length) % config.courtCharges.length);
  };

  const handleCopyVerdict = () => {
    const textToCopy = `🏛️ THE SUPREME COURT OF POOKIE 🏛️\nJudge: ${config.girlfriendName}\nDefendant: ${config.boyfriendNickname}\nCharge: ${currentCharge.title}\nVerdict: ${verdict || 'GUILTY'}\nOfficial Decree: ${currentCharge.verdictGuiltyText}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedToast(true);
    sound.playSparkle();
    setTimeout(() => setCopiedToast(false), 2500);
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

        {/* Interactive Gavel Button */}
        <button
          onClick={bangGavel}
          title="Bang the Judge's Gavel"
          className="flex items-center gap-1.5 text-xs font-bold text-purple-900 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-full transition-all cursor-pointer active:scale-95"
        >
          <Gavel className={`w-4 h-4 text-purple-700 ${gavelBanging ? 'rotate-45' : ''} transition-transform`} />
          <span>Bang Gavel!</span>
        </button>
      </div>

      {/* Court Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100/90 px-3 py-1 rounded-full">
          ⚖️ CASE FILE #{currentCharge.id} OF {config.courtCharges.length}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-purple-950 pt-1">
          THE SUPREME COURT OF POOKIE
        </h2>
        <p className="text-xs sm:text-sm text-purple-800 font-medium">
          {config.girlfriendName} is the judge. Her boyfriend {config.boyfriendNickname} is the criminal.
        </p>
      </div>

      {/* Charge Card (Parchment Docket style) */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-md space-y-6 relative overflow-hidden">
        {/* Background Watermark Stamp */}
        <div className="absolute right-4 bottom-4 text-purple-100 pointer-events-none select-none font-black text-7xl opacity-40 rotate-12">
          POOKIE
        </div>

        {/* Charge Index Navigation */}
        <div className="flex items-center justify-between border-b border-purple-100 pb-3">
          <span className="text-xs font-bold text-purple-700">
            CHARGE {currentChargeIndex + 1} / {config.courtCharges.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevCharge}
              aria-label="Previous Charge"
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-purple-100 text-purple-700 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextCharge}
              aria-label="Next Charge"
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-purple-100 text-purple-700 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title of the Charge */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-purple-950">
            {currentCharge.title}
          </h3>
          <p className="text-sm text-purple-900 leading-relaxed font-medium">
            {currentCharge.description}
          </p>
        </div>

        {/* Exhibits & Evidence List */}
        <div className="bg-purple-50/70 rounded-2xl p-4 border border-purple-100 space-y-2">
          <span className="text-xs font-black tracking-wide uppercase text-purple-900 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-purple-600" />
            <span>Prosecution Exhibit Notes:</span>
          </span>
          <ul className="space-y-1.5 text-xs sm:text-sm text-purple-800">
            {currentCharge.evidence.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Investigation State */}
        {investigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200 text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-2 text-indigo-900 font-bold text-sm">
              <Search className="w-4 h-4 animate-spin text-indigo-600" />
              <span>DRAMATIC INVESTIGATION IN PROGRESS...</span>
            </div>
            <p className="text-xs text-indigo-700">
              {investigationStep === 0 && `Subpoenaing ${config.boyfriendNickname}'s single remaining brain cell...`}
              {investigationStep === 1 && 'Analyzing WhatsApp chats: 99.8% heart emoji saturation confirmed!'}
              {investigationStep >= 2 && 'Examining photographic exhibit of his goofy smile when thinking of you...'}
            </p>
          </motion.div>
        )}

        {/* Verdict Results Area */}
        <AnimatePresence>
          {verdict && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`p-5 rounded-2xl border-2 space-y-3 relative ${
                verdict === 'GUILTY'
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : verdict === 'NOT_GUILTY'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-indigo-50 border-indigo-300 text-indigo-950'
              }`}
            >
              {/* Official Stamp */}
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span className="font-mono font-black text-xs uppercase tracking-wider">
                  {verdict === 'GUILTY' && '🔴 VERDICT: GUILTY AS CHARGED'}
                  {verdict === 'NOT_GUILTY' && '🟡 COUNTER-MOTION: OVERRULED'}
                  {verdict === 'EVIDENCE' && '🔍 EVIDENCE REPORT: OVERWHELMING PROOF'}
                </span>
                <span className="text-xs font-bold">Judge {config.girlfriendName} Presiding</span>
              </div>

              <p className="font-extrabold text-sm sm:text-base leading-relaxed">
                {verdict === 'GUILTY' && currentCharge.verdictGuiltyText}
                {verdict === 'NOT_GUILTY' && currentCharge.verdictNotGuiltyText}
                {verdict === 'EVIDENCE' && (
                  <span>
                    THE INVESTIGATION HAS CONCLUDED: The defendant has zero defense against your cuteness.
                    {` ${currentCharge.verdictGuiltyText}`}
                  </span>
                )}
              </p>

              {/* Action Buttons inside verdict */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyVerdict}
                  className="h-10 px-4 bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedToast ? 'Verdict Copied!' : 'Copy Verdict Card'}</span>
                </button>
                <button
                  onClick={handleNextCharge}
                  className="h-10 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Hear Next Charge</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3 Verdict Choice Buttons */}
        <div className="space-y-2 pt-2">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-purple-700">
            How does Your Honor rule?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => handleVerdict('GUILTY')}
              className="h-13 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-black text-sm rounded-2xl shadow-sm shadow-rose-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>GUILTY 😈</span>
            </button>

            <button
              onClick={() => handleVerdict('NOT_GUILTY')}
              className="h-13 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-sm rounded-2xl shadow-sm shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>NOT GUILTY 😇</span>
            </button>

            <button
              onClick={() => handleVerdict('EVIDENCE')}
              className="h-13 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-black text-sm rounded-2xl shadow-sm shadow-purple-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>I NEED MORE EVIDENCE 👀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
