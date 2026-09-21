'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(-1);

  useEffect(() => {
    setPhase(0);

    const t1 = setTimeout(() => setPhase(1), 3500); // City skyline
    const t2 = setTimeout(() => setPhase(2), 8500); // Nightclub
    const t3 = setTimeout(() => setPhase(3), 13500); // Photo
    const t4 = setTimeout(() => setPhase(4), 17500); // Flash + Title
    const t5 = setTimeout(() => onComplete(), 21500); // End

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-cyan-100 flex items-center justify-center overflow-hidden font-mono">
      <button
        onClick={onComplete}
        className="hud-button absolute top-6 right-6 z-[110]"
      >
        Skip Intro
      </button>

      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            key="phase-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <p className="text-xs text-pink-500/50 mb-12 italic tracking-widest font-serif">[ distant ocean + city ambience ]</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase font-light">02:17 AM</h2>
            <h3 className="text-lg md:text-xl tracking-[0.4em] mt-4 text-vice-gradient font-display">VESPER COAST</h3>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="phase-1"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1, y: '5%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/city_skyline.jpg)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            <p className="absolute bottom-16 w-full text-center text-xs tracking-[0.3em] text-cyan-200/60 uppercase drop-shadow-md">
              CAMERA DESCENDS OVER CITY...
            </p>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="phase-2"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/nightclub_exterior.jpg)' }}
          >
            <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black to-transparent" />
            <p className="absolute bottom-16 w-full text-center text-xs tracking-[0.3em] text-cyan-200/60 uppercase drop-shadow-md">
              A MYSTERIOUS CHARACTER STEPS OUT...
            </p>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            key="phase-3"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: 'easeIn' }}
            className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: 'url(/old_photograph.jpg)' }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="z-10 text-center"
            >
              <p className="text-2xl md:text-4xl font-serif text-amber-100/90 italic tracking-wider drop-shadow-2xl px-6 py-4 bg-black/40 border border-amber-900/30 rounded-sm">
                "You want to remember?"
              </p>
            </motion.div>
          </motion.div>
        )}

        {phase === 4 && (
          <motion.div
            key="phase-4"
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* White flash */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="absolute inset-0 bg-white z-20 pointer-events-none"
            />
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 2 }}
               className="absolute inset-0 vice-sunset"
               style={{ backgroundColor: 'var(--hud-dark)' }}
            />
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ delay: 0.3, duration: 2.5 }}
              className="font-display text-6xl md:text-9xl tracking-[0.1em] text-white z-10 glitch-effect"
              data-text="MEMORY DEALER"
              style={{ textShadow: '0 0 30px rgba(255, 47, 143, 0.6)' }}
            >
              MEMORY DEALER
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
