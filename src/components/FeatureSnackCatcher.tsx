import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Trophy, RotateCcw, Heart, Sparkles, Volume2, VolumeX, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/soundEffects';
import { fireCelebrationConfetti } from '../utils/confetti';

interface FallingItem {
  id: number;
  x: number; // percentage 5 - 90
  y: number; // percentage 0 - 100
  speed: number;
  type: 'boba' | 'pizza' | 'chocolate' | 'strawberry' | 'kiss' | 'crown' | 'overthink' | 'alarm';
  emoji: string;
  points: number;
  isHazard: boolean;
}

export const FeatureSnackCatcher: React.FC = () => {
  const { setActiveScreen, config } = useApp();

  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [isFever, setIsFever] = useState(false);
  const [basketX, setBasketX] = useState(50); // percentage 5 - 90
  const [salakSpeech, setSalakSpeech] = useState<string>(
    `"Ready, Sweetheart? I've packed all your favorite snacks!" 🧋`
  );
  const [recentPickup, setRecentPickup] = useState<{ text: string; id: number } | null>(null);

  const arenaRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<FallingItem[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const feverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pookie_snack_highscore');
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {
      // ignore
    }
  }, []);

  const saveHighScore = (newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      try {
        localStorage.setItem('pookie_snack_highscore', newScore.toString());
      } catch {
        // ignore
      }
    }
  };

  const quotes = [
    `"Snack delivery for my queen! Catch them all!" 🍕`,
    `"Careful of the overthinking cloud! Salak is here!" 🌧️`,
    `"Boba incoming! 100% sweetness, just like you!" 🧋`,
    `"Look at that basket precision! Pro gamer sweetheart!" ✨`,
    `"Don't worry about calories, virtual snacks have zero!" 🍫`,
    `"I'd catch a million snacks for you every day!" ❤️`,
    `"You're making this look easy, my pretty champion!" 👑`
  ];

  // Start new game
  const startGame = () => {
    sound.playPowerup();
    setScore(0);
    setLives(3);
    setCombo(0);
    setIsFever(false);
    setBasketX(50);
    itemsRef.current = [];
    setGameState('playing');
    setSalakSpeech(`"Catch everything, Sweetheart! Salak is dropping love treats!" 🚀`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setBasketX(prev => Math.max(10, prev - 8));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setBasketX(prev => Math.min(90, prev + 8));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Touch / Mouse movement on game arena
  const handleArenaPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(10, Math.min(90, relativeX));
    setBasketX(clamped);
  };

  // Move buttons for mobile touch
  const nudgeLeft = () => {
    setBasketX(prev => Math.max(10, prev - 12));
  };
  const nudgeRight = () => {
    setBasketX(prev => Math.min(90, prev + 12));
  };

  // Game Loop
  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;

    const now = Date.now();
    const spawnInterval = isFever ? 450 : 800;

    // Spawn new falling items
    if (now - lastSpawnRef.current > spawnInterval) {
      lastSpawnRef.current = now;

      // Pool of items
      const isBadItem = !isFever && Math.random() < 0.22;
      let newItem: FallingItem;

      if (isBadItem) {
        const isAlarm = Math.random() > 0.5;
        newItem = {
          id: Math.random(),
          x: Math.floor(Math.random() * 80) + 10,
          y: 0,
          speed: 1.1 + Math.random() * 0.4,
          type: isAlarm ? 'alarm' : 'overthink',
          emoji: isAlarm ? '⏰' : '🌧️',
          points: 0,
          isHazard: true,
        };
      } else {
        const roll = Math.random();
        if (roll < 0.25) {
          newItem = {
            id: Math.random(),
            x: Math.floor(Math.random() * 80) + 10,
            y: 0,
            speed: 1.0 + Math.random() * 0.5,
            type: 'boba',
            emoji: '🧋',
            points: 100,
            isHazard: false,
          };
        } else if (roll < 0.45) {
          newItem = {
            id: Math.random(),
            x: Math.floor(Math.random() * 80) + 10,
            y: 0,
            speed: 1.1 + Math.random() * 0.4,
            type: 'pizza',
            emoji: '🍕',
            points: 80,
            isHazard: false,
          };
        } else if (roll < 0.65) {
          newItem = {
            id: Math.random(),
            x: Math.floor(Math.random() * 80) + 10,
            y: 0,
            speed: 1.2 + Math.random() * 0.4,
            type: 'chocolate',
            emoji: '🍫',
            points: 60,
            isHazard: false,
          };
        } else if (roll < 0.8) {
          newItem = {
            id: Math.random(),
            x: Math.floor(Math.random() * 80) + 10,
            y: 0,
            speed: 1.1 + Math.random() * 0.3,
            type: 'strawberry',
            emoji: '🍓',
            points: 70,
            isHazard: false,
          };
        } else if (roll < 0.93) {
          newItem = {
            id: Math.random(),
            x: Math.floor(Math.random() * 80) + 10,
            y: 0,
            speed: 1.3 + Math.random() * 0.5,
            type: 'kiss',
            emoji: '💋',
            points: 150,
            isHazard: false,
          };
        } else {
          newItem = {
            id: Math.random(),
            x: Math.floor(Math.random() * 80) + 10,
            y: 0,
            speed: 1.4 + Math.random() * 0.4,
            type: 'crown',
            emoji: '👑',
            points: 250,
            isHazard: false,
          };
        }
      }

      itemsRef.current.push(newItem);
    }

    // Move items down and check basket collisions
    const remainingItems: FallingItem[] = [];
    const basketCatchY = 82; // catch zone near bottom

    for (const item of itemsRef.current) {
      item.y += item.speed;

      // Check collision with basket (width tolerance ~14%)
      const isCatchZone = item.y >= basketCatchY - 4 && item.y <= basketCatchY + 8;
      const isAlignedX = Math.abs(item.x - basketX) < 11;

      if (isCatchZone && isAlignedX) {
        if (item.isHazard) {
          // Hit hazard!
          sound.playBuzzer();
          setCombo(0);
          setLives(prev => {
            const nextLives = prev - 1;
            if (nextLives <= 0) {
              setGameState('gameover');
              saveHighScore(score);
              setSalakSpeech(`"Nooo! But you did amazing, Sweetheart! 😭💗"`);
            } else {
              setSalakSpeech(`"Ouch! Don't let Monday clouds get you! Salak has your back!" 🛡️`);
            }
            return nextLives;
          });
          setRecentPickup({ text: item.emoji === '⏰' ? 'ALARM HIT! -1 ❤️' : 'OVERTHINKING! -1 ❤️', id: Date.now() });
        } else {
          // Caught a yummy treat!
          sound.playCoin();
          const multiplier = isFever ? 2 : combo >= 6 ? 1.5 : 1;
          const awarded = Math.round(item.points * multiplier);

          setScore(prev => {
            const newScore = prev + awarded;
            saveHighScore(newScore);
            return newScore;
          });

          setCombo(prev => {
            const nextCombo = prev + 1;
            // Activate Fever Mode on 6 combo!
            if (nextCombo === 6 && !isFever) {
              sound.playPowerup();
              fireCelebrationConfetti();
              setIsFever(true);
              setSalakSpeech(`"🔥 FEVER MODE ACTIVATED! DOUBLE POINTS & RAINING SNACKS!" 🔥`);

              if (feverTimerRef.current) clearTimeout(feverTimerRef.current);
              feverTimerRef.current = setTimeout(() => {
                setIsFever(false);
              }, 8000);
            }
            return nextCombo;
          });

          // Random encouraging Salak quotes occasionally
          if (Math.random() < 0.2) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setSalakSpeech(randomQuote);
          }

          setRecentPickup({ text: `+${awarded} ${item.emoji}`, id: Date.now() });
        }
        continue; // Caught, don't keep in arena
      }

      // Check if dropped past bottom
      if (item.y > 105) {
        if (!item.isHazard) {
          // Missed a snack resets combo
          setCombo(0);
        }
        continue;
      }

      remainingItems.push(item);
    }

    itemsRef.current = remainingItems;

    animationFrameRef.current = requestAnimationFrame(updateGame);
  }, [gameState, basketX, combo, isFever, score]);

  useEffect(() => {
    if (gameState === 'playing') {
      animationFrameRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameState, updateGame]);

  // Clean up fever timer on unmount
  useEffect(() => {
    return () => {
      if (feverTimerRef.current) clearTimeout(feverTimerRef.current);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28 space-y-5">
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

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-yellow-100 text-yellow-950 font-black text-xs px-3 py-1.5 rounded-full border border-yellow-300">
            <Trophy className="w-3.5 h-3.5 text-yellow-600" />
            <span>High: {highScore}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-black uppercase tracking-widest text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
          🎮 SWEETHEART'S ARCADE · SNACK CATCHER
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-pink-950 pt-1">
          Catch Salak's Snacks & Kisses! 🧺🧋
        </h2>
        <p className="text-xs sm:text-sm text-pink-800 font-medium">
          Slide the basket to catch yummy treats from Salak. Avoid overthinking clouds! 🌧️
        </p>
      </div>

      {/* Main Interactive Arcade Screen */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 border-2 border-pink-300 shadow-xl space-y-4 flex flex-col items-center relative overflow-hidden">
        {/* Game HUD Bar */}
        <div className="w-full flex items-center justify-between bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 p-3 rounded-2xl border border-pink-200">
          {/* Lives */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-pink-900 mr-1 hidden sm:inline">Lives:</span>
            {[1, 2, 3].map(i => (
              <Heart
                key={i}
                className={`w-5 h-5 transition-transform ${
                  i <= lives
                    ? 'text-rose-500 fill-rose-500 scale-100 animate-pulse'
                    : 'text-gray-300 fill-gray-200 scale-90'
                }`}
              />
            ))}
          </div>

          {/* Fever / Combo Badge */}
          {isFever ? (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              className="bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-[11px] sm:text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1"
            >
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>FEVER 2× ACTIVE!</span>
            </motion.div>
          ) : combo > 1 ? (
            <div className="bg-purple-100 text-purple-900 font-black text-xs px-2.5 py-0.5 rounded-full border border-purple-300">
              {combo}× STREAK!
            </div>
          ) : null}

          {/* Current Score */}
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-pink-600 block">Score</span>
            <span className="text-xl sm:text-2xl font-black text-pink-950 font-mono tracking-tight">
              {score}
            </span>
          </div>
        </div>

        {/* Salak's Live Pilot Speech Bubble */}
        <div className="w-full max-w-md">
          <motion.div
            key={salakSpeech}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-pink-50/90 border border-pink-200 rounded-2xl p-2.5 text-center text-xs sm:text-sm font-extrabold text-pink-950 flex items-center justify-center gap-2"
          >
            <span>{salakSpeech}</span>
          </motion.div>
        </div>

        {/* The Game Arena Canvas */}
        <div
          ref={arenaRef}
          onPointerMove={handleArenaPointerMove}
          className={`relative w-full h-[360px] sm:h-[420px] rounded-2xl border-2 transition-colors overflow-hidden select-none touch-none cursor-ew-resize ${
            isFever
              ? 'bg-gradient-to-b from-amber-50 via-rose-50 to-pink-100 border-amber-400'
              : 'bg-gradient-to-b from-sky-50 via-pink-50/50 to-purple-50 border-pink-200'
          }`}
        >
          {/* Cute Flying Salak Balloon at top */}
          <motion.div
            animate={{
              x: isFever ? [-40, 40, -40] : [-25, 25, -25],
              y: [-2, 2, -2]
            }}
            transition={{ repeat: Infinity, duration: isFever ? 2 : 4, ease: 'easeInOut' }}
            className="absolute top-2 left-1/2 -ml-16 w-32 flex flex-col items-center pointer-events-none z-10"
          >
            <div className="bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-black text-pink-600 border border-pink-300 shadow-xs flex items-center gap-1">
              <span>Salak Delivery</span>
              <span>✈️</span>
            </div>
            <div className="text-2xl">
              {isFever ? '😍' : '🥰'}
            </div>
          </motion.div>

          {/* Falling Items in Arena */}
          {gameState === 'playing' &&
            itemsRef.current.map(item => (
              <div
                key={item.id}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute text-3xl sm:text-4xl pointer-events-none select-none transition-transform filter drop-shadow ${
                  item.isHazard ? 'animate-bounce' : ''
                }`}
              >
                {item.emoji}
              </div>
            ))}

          {/* Sweetheart's Cute Basket at Bottom */}
          <div
            style={{
              left: `${basketX}%`,
              transform: 'translateX(-50%)',
            }}
            className="absolute bottom-4 pointer-events-none z-20 flex flex-col items-center transition-all duration-75"
          >
            {/* Recent Score Popup */}
            <AnimatePresence>
              {recentPickup && (
                <motion.div
                  key={recentPickup.id}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -30, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-black text-xs sm:text-sm text-pink-600 bg-white/90 px-2 py-0.5 rounded-full shadow-md whitespace-nowrap mb-1"
                >
                  {recentPickup.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Basket Illustration */}
            <div className="relative">
              <span className="text-4xl sm:text-5xl drop-shadow-md">🧺</span>
              <span className="absolute -top-2 -right-1 text-sm bg-pink-500 text-white rounded-full p-0.5 shadow-sm font-bold">
                👑
              </span>
            </div>
            <span className="text-[10px] font-black text-pink-900 bg-white/90 px-2 py-0.5 rounded-full shadow-xs border border-pink-200 mt-0.5">
              {config.girlfriendName}
            </span>
          </div>

          {/* Start Screen Overlay */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-30 space-y-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl shadow-inner animate-bounce">
                🧋
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-pink-950">
                  Ready to Catch Snacks, Sweetheart?
                </h3>
                <p className="text-xs sm:text-sm text-pink-800 max-w-sm">
                  Catch Boba, Pizza, Chocolates & Golden Kisses! Avoid overthinking clouds 🌧️ and alarms ⏰!
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-pink-700 bg-pink-50 p-2.5 rounded-2xl border border-pink-200">
                <span>🧋 +100</span>
                <span>·</span>
                <span>🍕 +80</span>
                <span>·</span>
                <span>🍫 +60</span>
                <span>·</span>
                <span>💋 +150</span>
                <span>·</span>
                <span>👑 +250</span>
              </div>

              <button
                onClick={startGame}
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-sm px-8 py-3 rounded-full shadow-lg shadow-pink-500/30 active:scale-95 transition-all cursor-pointer"
              >
                START CATCHING! 🚀
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === 'gameover' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30 space-y-4"
            >
              <div className="text-4xl">👑💖</div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-pink-950">
                  Amazing Job, {config.girlfriendName}!
                </h3>
                <p className="text-xs text-pink-700 font-semibold">
                  You conquered boredom with championship skills!
                </p>
              </div>

              {/* Final Score Card */}
              <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200 w-full max-w-xs space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-pink-900">
                  <span>Final Score:</span>
                  <span className="font-mono text-xl text-pink-600 font-black">{score}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium text-pink-700 border-t border-pink-200 pt-2">
                  <span>All-Time Best:</span>
                  <span className="font-mono font-bold">{highScore}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-pink-200 text-xs font-bold text-pink-950 mt-1">
                  🎁 PRIZE UNLOCKED: Salak owes Sweetheart 1 real-life treat of her choice!
                </div>
              </div>

              <button
                onClick={startGame}
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-sm px-8 py-3 rounded-full shadow-lg shadow-pink-500/30 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>PLAY AGAIN!</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Mobile Left / Right Tap Controls */}
        <div className="w-full flex items-center justify-between gap-3 pt-1">
          <button
            onClick={nudgeLeft}
            className="flex-1 py-3 bg-pink-100 hover:bg-pink-200 active:bg-pink-300 text-pink-950 font-black text-sm rounded-2xl border border-pink-300 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <span>⬅️ MOVE LEFT</span>
          </button>

          <button
            onClick={nudgeRight}
            className="flex-1 py-3 bg-pink-100 hover:bg-pink-200 active:bg-pink-300 text-pink-950 font-black text-sm rounded-2xl border border-pink-300 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <span>MOVE RIGHT ➡️</span>
          </button>
        </div>

        <p className="text-[11px] text-pink-600 font-medium text-center">
          💡 Tip: You can also drag the basket anywhere or use the keyboard Left/Right arrows!
        </p>
      </div>
    </div>
  );
};
