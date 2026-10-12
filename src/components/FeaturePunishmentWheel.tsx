import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink,
  Flame,
  Award,
  Clock,
  History,
  CheckCircle2,
  Trash2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/soundEffects';

export interface PunishmentItem {
  id: string;
  codePrefix: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  textColor: string;
  difficulty: 'Cute' | 'Funny' | 'Dramatic' | 'Extreme';
}

const DEFAULT_PUNISHMENTS: PunishmentItem[] = [
  {
    id: 'squat',
    codePrefix: 'PUNISH-SQUAT30',
    title: '30 Ear-Holding Squats',
    subtitle: '30 Full Squats Holding Ears (Non-Stop On Video)',
    description: 'Salak must hold both ears with crossed arms and do 30 full squats on video without stopping!',
    icon: '🦵',
    color: '#FF6B8B', // Soft Rose
    textColor: '#FFFFFF',
    difficulty: 'Dramatic'
  },
  {
    id: 'bollywood',
    codePrefix: 'PUNISH-DANCE',
    title: 'Cringe Bollywood Dance',
    subtitle: '20-Second Dramatic Cringe Dance Video',
    description: 'Salak must record a 20-second video dancing with full dramatic Bollywood expressions to the song Sweetheart picks!',
    icon: '💃',
    color: '#845EC2', // Royal Purple
    textColor: '#FFFFFF',
    difficulty: 'Funny'
  },
  {
    id: 'slap',
    codePrefix: 'PUNISH-SLAP10',
    title: '10 Dramatic Self-Cheek Slaps',
    subtitle: '10 Gentle Cheek Pats (Chanting Sweetheart Is Always Right)',
    description: 'Salak must record himself gently tapping his cheeks 10 times chanting "Sweetheart is always right!"',
    icon: '🤦‍♂️',
    color: '#FF9671', // Coral Orange
    textColor: '#FFFFFF',
    difficulty: 'Funny'
  },
  {
    id: 'chicken',
    codePrefix: 'PUNISH-CHICKEN',
    title: 'The Ultimate Chicken Dance',
    subtitle: 'Flap Wings & Cluck Like a Chicken on Camera',
    description: 'Salak must flap his wings, cluck like a chicken, and perform the full hilarious Chicken Dance routine on video!',
    icon: '🐔',
    color: '#FFC75F', // Golden Warm
    textColor: '#573000',
    difficulty: 'Extreme'
  },
  {
    id: 'poem',
    codePrefix: 'PUNISH-POEM10',
    title: '10-Line Praise Poem',
    subtitle: '10-Line Romantic Poem Praising Sweetheart',
    description: 'Salak must write or recite a 10-line heartfelt romantic poem celebrating Sweetheart as the prettiest girl in the world!',
    icon: '📜',
    color: '#2C73D2', // Ocean Blue
    textColor: '#FFFFFF',
    difficulty: 'Cute'
  },
  {
    id: 'babyvoice',
    codePrefix: 'PUNISH-BABYVOICE',
    title: 'Baby-Voice Apology Audio',
    subtitle: 'High-Pitched Baby Voice Note (No Laughing Allowed)',
    description: 'Salak must record a super high-pitched cute baby voice saying: "Pookie shona please forgive this foolish boy, I love you so much!" (No laughing allowed!)',
    icon: '👶',
    color: '#00C9A7', // Mint Teal
    textColor: '#FFFFFF',
    difficulty: 'Cute'
  },
  {
    id: 'boss',
    codePrefix: 'PUNISH-BOSSAUDIO',
    title: 'Audio: 5 Reasons She Is The Boss',
    subtitle: '5 Undisputed Reasons Why Sweetheart Runs Things',
    description: 'Salak must send a voice confession listing 5 indisputable reasons why Sweetheart is the undisputed queen & supreme boss!',
    icon: '👑',
    color: '#D65DB1', // Magenta
    textColor: '#FFFFFF',
    difficulty: 'Dramatic'
  },
  {
    id: 'hairtug',
    codePrefix: 'PUNISH-HAIRTUG',
    title: 'Hair-Tug Apology Selfie',
    subtitle: 'Apologetic Puppy-Dog Face Selfie Pulling Hair',
    description: 'Salak must take a selfie gently pulling his own hair with the most apologetic puppy-dog pleading face!',
    icon: '🙇‍♂️',
    color: '#4B4453', // Deep Slate
    textColor: '#FFFFFF',
    difficulty: 'Funny'
  }
];

export interface WonPunishmentRecord {
  ticketCode: string;
  punishmentTitle: string;
  subtitle: string;
  bengaliTitle?: string;
  description: string;
  icon: string;
  timestamp: string;
  fullShareMessage: string;
  completed: boolean;
}

export const FeaturePunishmentWheel: React.FC = () => {
  const { config, setActiveScreen } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Wheel state
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0); // in degrees
  const [selectedPunishment, setSelectedPunishment] = useState<PunishmentItem | null>(null);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<WonPunishmentRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Saved punishment vouchers in localStorage
  const [history, setHistory] = useState<WonPunishmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('pookie_punishment_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Daily spin limit logic (Max 3 spins a day)
  const MAX_DAILY_SPINS = 3;
  const getTodayKey = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const [dailySpins, setDailySpins] = useState<{ date: string; count: number }>(() => {
    try {
      const saved = localStorage.getItem('pookie_wheel_daily_spins');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date === getTodayKey()) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return { date: getTodayKey(), count: 0 };
  });

  const [limitNoticeToast, setLimitNoticeToast] = useState(false);

  const spinsLeft = Math.max(0, MAX_DAILY_SPINS - dailySpins.count);

  const recordDailySpin = () => {
    const today = getTodayKey();
    const newCount = dailySpins.date === today ? dailySpins.count + 1 : 1;
    const updated = { date: today, count: newCount };
    setDailySpins(updated);
    try {
      localStorage.setItem('pookie_wheel_daily_spins', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const saveHistory = (newHistory: WonPunishmentRecord[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem('pookie_punishment_history', JSON.stringify(newHistory));
    } catch {
      // ignore
    }
  };

  // Wheel drawing setup
  const items = DEFAULT_PUNISHMENTS;
  const numSlices = items.length;
  const sliceAngle = 360 / numSlices;

  // Draw wheel on canvas
  const drawWheel = useCallback((rotationDeg: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 16;

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(centerX, centerY);
    // Convert rotation to radians
    ctx.rotate((rotationDeg * Math.PI) / 180);

    // Draw slices
    items.forEach((item, index) => {
      const startAngle = (index * sliceAngle * Math.PI) / 180;
      const endAngle = ((index + 1) * sliceAngle * Math.PI) / 180;

      // Slice sector
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      // Outer gold rim border
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Text & Icon
      ctx.save();
      const midAngle = startAngle + (sliceAngle * Math.PI) / 360;
      ctx.rotate(midAngle);
      ctx.textAlign = 'right';
      ctx.fillStyle = item.textColor;
      ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

      // Draw Icon and short label
      const textRadius = radius - 26;
      ctx.fillText(`${item.icon} ${item.title.slice(0, 16)}`, textRadius, 5);

      ctx.restore();
    });

    // Outer decorative rim
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#FEE2E2'; // pink-100
    ctx.stroke();

    ctx.restore();

    // Center Hub (Pin)
    ctx.save();
    ctx.translate(centerX, centerY);

    // Outer center ring
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 10;
    ctx.fill();

    // Inner pink badge
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#ec4899'; // pink-500
    ctx.fill();

    // Heart icon in center
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', 0, 1);

    ctx.restore();
  }, [items, numSlices, sliceAngle]);

  useEffect(() => {
    drawWheel(currentRotation);
  }, [currentRotation, drawWheel]);

  // Handle Resize for Retina Crispness
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = 360;
    canvas.width = size * 2;
    canvas.height = size * 2;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(2, 2);
    }
    drawWheel(currentRotation);
  }, [currentRotation, drawWheel]);

  // Spin the wheel
  const spinWheel = () => {
    if (isSpinning) return;

    // Check if daily spins reached maximum
    if (spinsLeft <= 0) {
      sound.playBuzzer();
      setLimitNoticeToast(true);
      return;
    }

    sound.playPop();
    setIsSpinning(true);
    setSelectedPunishment(null);

    // Pick random target slice
    const randomIndex = Math.floor(Math.random() * numSlices);
    const targetItem = items[randomIndex];

    // Compute target angle so that target slice lands at the TOP pointer (270 degrees in canvas coords)
    // Canvas pointer is at the TOP (angle = 270 deg or -90 deg).
    // Slice `i` occupies [i * sliceAngle, (i + 1) * sliceAngle].
    // Center of slice `i` is (i + 0.5) * sliceAngle.
    // When wheel is rotated by R, position of slice center is (R + (i + 0.5) * sliceAngle) % 360.
    // We want (R + (i + 0.5) * sliceAngle) % 360 == 270 (pointing straight up).
    // So R % 360 = (270 - (i + 0.5) * sliceAngle + 360) % 360.
    const targetSliceCenter = (randomIndex + 0.5) * sliceAngle;
    const targetModulo = (270 - targetSliceCenter + 3600) % 360;

    // We do at least 5 to 8 full spins (1800 to 2880 degrees)
    const extraSpins = (5 + Math.floor(Math.random() * 4)) * 360;
    const currentModulo = currentRotation % 360;
    const diff = (targetModulo - currentModulo + 360) % 360;
    const finalRotation = currentRotation + extraSpins + diff;

    const duration = 4800; // ms
    const startTime = performance.now();
    const startRot = currentRotation;
    let lastTickAngle = startRot;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const rot = startRot + (finalRotation - startRot) * easedProgress;
      setCurrentRotation(rot);
      drawWheel(rot);

      // Play tick sound when passing each sector threshold
      if (Math.abs(rot - lastTickAngle) >= sliceAngle) {
        sound.playWheelTick();
        lastTickAngle = rot;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Finished spinning!
        setIsSpinning(false);
        recordDailySpin();
        setSelectedPunishment(targetItem);
        sound.playVictory();

        // Confetti burst
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Generate punishment voucher ticket
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const ticketCode = `${targetItem.codePrefix}-${randomNum}`;
        const timestamp = new Date().toLocaleString([], { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        });

        const shareMessage = 
`👑 OFFICIAL POOKIE PUNISHMENT VOUCHER 👑
🎟️ Ticket Code: ${ticketCode}
⚡ Punishment: ${targetItem.title}
📜 Details: ${targetItem.subtitle}
🎯 Mandatory Order: ${targetItem.description}
🙇‍♂️ Offender / Bound Boyfriend: ${config.boyfriendNickname}
👑 Sovereign Ruler: ${config.girlfriendName}
⏰ Issued At: ${timestamp}

⚠️ RULE: Sweetheart spun the Punishment Wheel and this is your binding sentence! Submit video/audio proof immediately or punishment doubles! 💅`;

        const newRecord: WonPunishmentRecord = {
          ticketCode,
          punishmentTitle: targetItem.title,
          subtitle: targetItem.subtitle,
          description: targetItem.description,
          icon: targetItem.icon,
          timestamp,
          fullShareMessage: shareMessage,
          completed: false
        };

        setActiveTicket(newRecord);
        saveHistory([newRecord, ...history]);
        setTicketModalOpen(true);
      }
    };

    requestAnimationFrame(animate);
  };

  // Copy voucher to clipboard
  const copyTicket = (ticket: WonPunishmentRecord) => {
    navigator.clipboard.writeText(ticket.fullShareMessage);
    sound.playCoin();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // WhatsApp quick send
  const openWhatsApp = (ticket: WonPunishmentRecord) => {
    const encoded = encodeURIComponent(ticket.fullShareMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  // Toggle completed status
  const toggleComplete = (code: string) => {
    sound.playPop();
    const updated = history.map(item => 
      item.ticketCode === code ? { ...item, completed: !item.completed } : item
    );
    saveHistory(updated);
  };

  // Delete history item
  const deleteTicket = (code: string) => {
    sound.playPop();
    const updated = history.filter(item => item.ticketCode !== code);
    saveHistory(updated);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-pink-700 hover:text-pink-900 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-pink-200 shadow-xs transition-all hover:bg-pink-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Land</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistoryOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-800 bg-pink-100 hover:bg-pink-200 px-3 py-1.5 rounded-full transition-all border border-pink-300"
          >
            <History className="w-3.5 h-3.5" />
            <span>Warrant History ({history.length})</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold mb-2">
          <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          <span>Boyfriend Punishment Wheel</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-950 tracking-tight">
          The Sovereign Penalty Wheel 🎡
        </h1>
        <p className="text-sm md:text-base text-pink-800/80 max-w-xl mx-auto mt-1">
          Did {config.boyfriendNickname} giggle at a text, act stubborn, or deserve a cute penalty? Spin the wheel to claim his official punishment code!
        </p>

        {/* PROMINENT DAILY NOTICE: MAX 3 SPINS A DAY */}
        <div className="mt-4 max-w-lg mx-auto bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 border-2 border-rose-300 rounded-2xl p-3 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-left">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-rose-950 tracking-wide uppercase flex items-center gap-1.5">
                  <span>NOTICE: ONLY 3 SPINS A DAY</span>
                  <span className="bg-rose-200 text-rose-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    Official Rule
                  </span>
                </p>
                <p className="text-[11px] text-rose-800 font-medium">
                  To protect {config.boyfriendNickname} from exhaustion, {config.girlfriendName} has a daily quota of 3 penalties.
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right bg-white/90 border border-rose-200 px-3 py-1.5 rounded-xl shadow-xs">
              <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Remaining</div>
              <div className="text-lg font-black text-rose-900 leading-none">
                {spinsLeft} / {MAX_DAILY_SPINS}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Wheel Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Wheel Presentation */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative p-3 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-pink-200/80 shadow-xl">
            {/* Top Pointer Indicator */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-rose-600 drop-shadow-md" />
              <div className="w-3 h-3 rounded-full bg-white border-2 border-rose-600 -mt-1 shadow-xs" />
            </div>

            {/* Canvas Wheel */}
            <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%' }}
                className="rounded-full shadow-inner"
              />
            </div>
          </div>

          {/* Spin CTA Button */}
          <div className="mt-6 flex flex-col items-center gap-2 w-full max-w-sm">
            <button
              onClick={spinWheel}
              disabled={isSpinning || spinsLeft <= 0}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-base sm:text-lg tracking-wide text-white shadow-lg transition-all transform flex items-center justify-center gap-3 ${
                isSpinning
                  ? 'bg-pink-300 cursor-not-allowed scale-95 opacity-80'
                  : spinsLeft <= 0
                  ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed opacity-90 shadow-none'
                  : 'bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:from-rose-600 hover:to-purple-700 active:scale-95 shadow-pink-500/30 hover:shadow-xl'
              }`}
            >
              <Sparkles className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>
                {isSpinning 
                  ? 'SPINNING THE FATE...' 
                  : spinsLeft <= 0 
                  ? 'DAILY LIMIT REACHED (0/3 SPINS)' 
                  : `SPIN THE WHEEL 🎯 (${spinsLeft} LEFT TODAY)`}
              </span>
            </button>

            {/* Sub-notice */}
            {spinsLeft <= 0 ? (
              <div className="w-full text-center p-2 rounded-xl bg-rose-100/80 border border-rose-300 text-rose-900 text-xs font-semibold">
                🛑 Notice: You have used all 3 spins for today! Resets tomorrow at midnight.
              </div>
            ) : (
              <span className="text-xs text-pink-700/80 font-medium">
                Notice: Max 3 spins a day · {spinsLeft} punishment{spinsLeft > 1 ? 's' : ''} remaining today
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Punishment Roster & Rules */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-pink-200 p-5 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-pink-950 flex items-center gap-2">
                <span>📋 Punishment Roster (8 Sectors)</span>
              </h2>
              <span className="text-xs bg-pink-100 text-pink-800 font-semibold px-2 py-0.5 rounded-full">
                Official Penalties
              </span>
            </div>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {DEFAULT_PUNISHMENTS.map((item, idx) => (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                    selectedPunishment?.id === item.id
                      ? 'bg-pink-100/80 border-pink-400 shadow-xs'
                      : 'bg-pink-50/50 border-pink-100 hover:bg-pink-100/50'
                  }`}
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-bold text-pink-950 truncate">{idx + 1}. {item.title}</p>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/80 text-pink-700 border border-pink-200">
                        {item.difficulty}
                      </span>
                    </div>
                    <p className="text-[11px] text-pink-700 font-medium truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-pink-100 text-[11px] text-pink-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-pink-500 shrink-0" />
              <span>After spinning, {config.girlfriendName} gets an official Code to send {config.boyfriendNickname}!</span>
            </div>
          </div>
        </div>
      </div>

      {/* WINNER VOUCHER MODAL */}
      <AnimatePresence>
        {ticketModalOpen && activeTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-4 border-rose-300 relative"
            >
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white p-5 text-center relative">
                <span className="text-3xl mb-1 block animate-bounce">{activeTicket.icon}</span>
                <span className="text-xs uppercase font-extrabold tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block mb-1">
                  OFFICIAL PUNISHMENT ORDER
                </span>
                <h3 className="text-xl font-black">{activeTicket.punishmentTitle}</h3>
                <p className="text-xs text-pink-100 mt-0.5 font-medium">{activeTicket.subtitle}</p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Official Ticket Code Box */}
                <div className="bg-rose-50 border-2 border-dashed border-rose-300 rounded-2xl p-4 text-center">
                  <span className="text-[11px] uppercase font-bold text-rose-700 tracking-wider block">
                    OFFICIAL CLAIM CODE
                  </span>
                  <div className="text-2xl font-mono font-black text-rose-900 tracking-wider my-1">
                    {activeTicket.ticketCode}
                  </div>
                  <span className="text-[11px] text-rose-600 font-medium">
                    Issued to: <strong className="font-bold">{config.boyfriendNickname}</strong> by <strong className="font-bold">{config.girlfriendName} 👑</strong>
                  </span>
                </div>

                {/* Punishment Task Description */}
                <div className="bg-pink-50/70 rounded-xl p-3 border border-pink-200">
                  <p className="text-xs text-pink-900 leading-relaxed font-medium">
                    🎯 <strong>Mandatory Order:</strong> {activeTicket.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => copyTicket(activeTicket)}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-200" />
                        <span>COPIED CODE & VOUCHER! 📋</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY PUNISHMENT CODE & TEXT</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => openWhatsApp(activeTicket)}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Send directly to Salak on WhatsApp 💬</span>
                  </button>
                </div>

                {/* Close Button */}
                <div className="text-center pt-1">
                  <button
                    onClick={() => setTicketModalOpen(false)}
                    className="text-xs font-semibold text-pink-700 hover:text-pink-950 underline cursor-pointer"
                  >
                    Done (Saved to History)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WARRANT HISTORY MODAL */}
      <AnimatePresence>
        {historyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-2 border-pink-300"
            >
              {/* Header */}
              <div className="p-4 bg-pink-100 border-b border-pink-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-pink-700" />
                  <h3 className="font-bold text-pink-950 text-base">
                    Punishment Voucher History ({history.length})
                  </h3>
                </div>
                <button
                  onClick={() => setHistoryOpen(false)}
                  className="text-pink-700 hover:text-pink-950 font-bold text-sm px-2 py-1 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* List */}
              <div className="p-4 overflow-y-auto space-y-3 flex-1">
                {history.length === 0 ? (
                  <div className="text-center py-8 text-pink-600">
                    <p className="text-sm font-medium">No punishments issued yet!</p>
                    <p className="text-xs mt-1">Spin the wheel to catch {config.boyfriendNickname} red-handed!</p>
                  </div>
                ) : (
                  history.map((record) => (
                    <div
                      key={record.ticketCode}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        record.completed
                          ? 'bg-emerald-50/70 border-emerald-200'
                          : 'bg-pink-50/60 border-pink-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{record.icon}</span>
                          <div>
                            <span className="font-mono text-xs font-black text-rose-700 block">
                              {record.ticketCode}
                            </span>
                            <h4 className="font-bold text-xs text-pink-950">
                              {record.punishmentTitle}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleComplete(record.ticketCode)}
                            title={record.completed ? 'Mark pending' : 'Mark fulfilled by Salak'}
                            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                              record.completed
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => copyTicket(record)}
                            title="Copy voucher message"
                            className="p-1.5 rounded-lg bg-white text-pink-700 border border-pink-200 hover:bg-pink-100"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTicket(record.ticketCode)}
                            title="Delete"
                            className="p-1.5 rounded-lg bg-white text-red-600 border border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 text-[11px] text-pink-800/90 font-medium">
                        {record.subtitle || record.bengaliTitle}
                      </div>

                      <div className="mt-2 pt-2 border-t border-pink-200/50 flex items-center justify-between text-[10px] text-pink-600">
                        <span>Issued: {record.timestamp}</span>
                        <span className={`font-bold ${record.completed ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {record.completed ? '✅ Delivered by Salak' : '⏳ Pending Delivery'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-pink-50 border-t border-pink-200 text-center">
                <button
                  onClick={() => setHistoryOpen(false)}
                  className="px-5 py-1.5 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Close History
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DAILY LIMIT NOTICE MODAL / POPUP */}
      <AnimatePresence>
        {limitNoticeToast && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border-4 border-rose-300 relative text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center mx-auto mb-4 text-3xl">
                ⏳
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                Notice: Maximum Limit Reached
              </div>

              <h3 className="text-xl font-black text-rose-950 mb-2">
                Only 3 Spins A Day! 🛑
              </h3>

              <p className="text-xs text-rose-800 leading-relaxed mb-4">
                You have reached your daily quota of <span className="font-bold underline">3 spins</span> for today! {config.boyfriendNickname} is already sweating from today's punishments. The wheel will recharge with 3 fresh spins tomorrow.
              </p>

              <div className="bg-rose-50 rounded-2xl p-3 border border-rose-200 mb-5 text-left text-xs text-rose-900 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Today's Spins:</span>
                  <span className="text-rose-700">3 / 3 Used</span>
                </div>
                <div className="flex justify-between font-medium text-[11px] text-rose-600">
                  <span>Quota Status:</span>
                  <span>Locked until midnight 🌙</span>
                </div>
              </div>

              <button
                onClick={() => setLimitNoticeToast(false)}
                className="w-full py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-md transition-all active:scale-95"
              >
                Understood, I Will Mercy Him! 💕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
