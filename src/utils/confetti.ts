import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  // Pastel pink, lavender, rose, and gold colors
  const colors = ['#f472b6', '#ec4899', '#c084fc', '#a855f7', '#fbbf24', '#fbcfe8', '#e9d5ff'];

  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      disableForReducedMotion: true,
    });
  } catch {
    // ignore
  }
}

export function fireLegendaryConfetti() {
  const colors = ['#f43f5e', '#ec4899', '#d946ef', '#8b5cf6', '#fbbf24', '#fef08a'];

  try {
    const end = Date.now() + 1500;
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() * 0.4 + 0.1 },
        colors,
        particleCount: 40,
        disableForReducedMotion: true,
      });
    }, 250);
  } catch {
    // ignore
  }
}

export function fireHeartBurst() {
  const colors = ['#fda4af', '#f43f5e', '#ec4899', '#f472b6'];
  try {
    confetti({
      particleCount: 50,
      angle: 90,
      spread: 90,
      origin: { y: 0.8 },
      colors,
      shapes: ['circle'],
      scalar: 1.2,
      disableForReducedMotion: true,
    });
  } catch {
    // ignore
  }
}
