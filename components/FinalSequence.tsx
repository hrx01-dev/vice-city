'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FinalSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 0: 0-5s -> Black screen, fade in city image
    // Phase 1: 5-10s -> City image + "ALL MEMORIES RECOVERED"
    // Phase 2: 10-15s -> Brain image + "NEURAL LINK SEVERED"
    // Phase 3: 15-20s -> Black screen + "END TRANSMISSION"
    
    const t1 = setTimeout(() => setPhase(1), 5000);
    const t2 = setTimeout(() => setPhase(2), 11000);
    const t3 = setTimeout(() => setPhase(3), 17000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden font-sans flex items-center justify-center">
      <AnimatePresence mode="wait">
        
        {phase === 0 && (
          <motion.div
            key="phase-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/finale_scene1.jpg)` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="phase-1"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(/finale_scene1.jpg)` }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-4xl md:text-6xl font-black italic text-white uppercase drop-shadow-2xl z-10 text-center"
              style={{ WebkitTextStroke: '1px black', textShadow: '4px 4px 0 #000' }}
            >
              ALL MEMORIES RECOVERED
            </motion.h2>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="phase-2"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(/finale_scene2.jpg)` }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-3xl md:text-5xl font-black italic text-cyan-400 uppercase drop-shadow-2xl z-10 text-center"
              style={{ textShadow: '4px 4px 0 #000, 0 0 20px rgba(34,211,238,0.5)' }}
            >
              NEURAL LINK SEVERED
            </motion.h2>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            key="phase-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              className="text-2xl md:text-4xl font-mono text-cyan-500/50 uppercase tracking-[0.5em]"
            >
              END TRANSMISSION
            </motion.h1>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 1 }}
              onClick={onComplete}
              className="mt-12 px-6 py-2 border border-cyan-500/30 text-cyan-300 font-mono text-sm tracking-widest hover:bg-cyan-900/30 transition-colors"
            >
              REBOOT SYSTEM
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
