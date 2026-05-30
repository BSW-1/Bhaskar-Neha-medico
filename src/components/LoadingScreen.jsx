'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100
    const steps = [
      { val: 25, delay: 400 },
      { val: 55, delay: 800 },
      { val: 78, delay: 1200 },
      { val: 100, delay: 1800 },
    ];
    const timers = steps.map(s => setTimeout(() => setProgress(s.val), s.delay));
    const done = setTimeout(() => setLoading(false), 2600);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div className={styles.overlay} initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          {/* Unique Medical Cross + Heartbeat Animation */}
          <div className={styles.logoAnim}>
            {/* Animated medical cross drawing itself */}
            <svg viewBox="0 0 80 80" className={styles.crossSvg}>
              {/* Outer ring pulse */}
              <motion.circle cx="40" cy="40" r="36" fill="none" stroke="url(#loadGrad)" strokeWidth="1.2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.4 }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
              {/* Inner ring */}
              <motion.circle cx="40" cy="40" r="28" fill="none" stroke="url(#loadGrad)" strokeWidth="0.8" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.2 }} transition={{ duration: 1, delay: 0.3 }} />
              {/* Medical Cross  -  vertical stroke */}
              <motion.line x1="40" y1="22" x2="40" y2="58" stroke="url(#loadGrad)" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} />
              {/* Medical Cross  -  horizontal stroke */}
              <motion.line x1="22" y1="40" x2="58" y2="40" stroke="url(#loadGrad)" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} />
              {/* Heartbeat line */}
              <motion.polyline points="10,55 20,55 26,45 32,65 38,50 42,55 70,55" fill="none" stroke="url(#loadGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.7 }} transition={{ duration: 0.8, delay: 1.1 }} />
              <defs>
                <linearGradient id="loadGrad" x1="0" y1="0" x2="80" y2="80">
                  <stop stopColor="hsl(158,34%,50%)" />
                  <stop offset="1" stopColor="hsl(174,40%,38%)" />
                </linearGradient>
              </defs>
            </svg>
            {/* Glow pulse behind */}
            <motion.div className={styles.glowPulse} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.3, 0.15] }} transition={{ duration: 1.5, delay: 0.3 }} />
          </div>

          {/* Brand Name */}
          <motion.div className={styles.brand} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
            <span className={styles.brandMain}>Bhaskar & Neha</span>
            <span className={styles.brandSub}>Medico</span>
          </motion.div>

          {/* Progress Bar */}
          <motion.div className={styles.progressWrap} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <div className={styles.progressTrack}>
              <motion.div className={styles.progressFill} style={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />
            </div>
            <span className={styles.progressNum}>{progress}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
