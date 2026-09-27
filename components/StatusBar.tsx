'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatusBarProps {
  caseNumber: string;
  memoryState: 'READY' | 'CORRUPTED' | 'RESTORING' | 'UNAVAILABLE';
  stabilityScore: number;
  editCount: number;
}

export function StatusBar({ caseNumber, memoryState, stabilityScore, editCount }: StatusBarProps) {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (memoryState) {
      case 'READY':
        return 'text-pink-400';
      case 'CORRUPTED':
        return 'text-red-400';
      case 'RESTORING':
        return 'text-cyan-400';
      case 'UNAVAILABLE':
        return 'text-orange-400';
      default:
        return 'text-pink-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="hud-border"
      style={{ borderBottom: '2px solid var(--vice-pink)', padding: '0.75rem 1rem' }}
    >
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)] shrink-0">
              <img src="/detective.jpg" alt="MC Detective" className="w-full h-full object-cover" />
            </div>
            <div className="hud-text-pink text-sm">
              CASE #{caseNumber}
            </div>
          </div>
          <div className={`hud-text-pink text-sm flex items-center gap-2 ${getStatusColor()}`}>
            <span className="inline-block w-2 h-2 bg-current rounded-full animate-pulse"></span>
            {memoryState}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hud-text-cyan text-sm">
            STABILITY: <span className="hud-text-pink">{stabilityScore}%</span>
          </div>
          <div className="hud-text-cyan text-sm">
            EDITS: <span className="hud-text-pink">{editCount}</span>
          </div>
          <div className="hud-text-cyan text-sm tabular-nums">
            {clock}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
