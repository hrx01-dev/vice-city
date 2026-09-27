'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RotateCcw, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';

interface ActionControlsProps {
  onExport: () => void;
  onReset: () => void;
  onPlayback: () => void;
  onPrevCase: () => void;
  onNextCase: () => void;
  caseNumber: string;
  totalCases: number;
  hasChanges: boolean;
  canExport: boolean;
  savedMemoryUrl: string | null;
}

export function ActionControls({
  onExport,
  onReset,
  onPlayback,
  onPrevCase,
  onNextCase,
  caseNumber,
  totalCases,
  hasChanges,
  canExport,
  savedMemoryUrl,
}: ActionControlsProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    if (hasChanges) {
      setShowResetConfirm(true);
    } else {
      onReset();
    }
  };

  const handleShare = () => {
    if (!savedMemoryUrl) return;

    const text = `I just uncovered the truth in Vice City Police Department's Neural Archive! Case #${caseNumber} Solved. #MemoryDealer #ViceCity`;

    try {
      // 1. Force the image download
      const a = document.createElement('a');
      a.href = savedMemoryUrl;
      a.download = `evidence_${caseNumber}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // 2. Open Twitter intent synchronously to avoid popup blockers
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Share action failed:', err);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <motion.button
        whileHover={canExport ? { scale: 1.03 } : {}}
        whileTap={canExport ? { scale: 0.97 } : {}}
        onClick={onExport}
        disabled={!canExport}
        title={!canExport ? "Must make edits and scan all clues to export" : ""}
        className={`hud-button flex items-center gap-2 ${
          canExport ? 'hover:shadow-pink-400/50' : 'opacity-50 cursor-not-allowed'
        }`}
      >
        <Download size={16} />
        SEND EVIDENCE
      </motion.button>

      {savedMemoryUrl && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleShare}
          className="hud-button flex items-center gap-2 border-cyan-400 text-cyan-400 hover:shadow-cyan-400/50 hover:bg-cyan-900/20"
        >
          <Share2 size={16} />
          SHARE EVIDENCE
        </motion.button>
      )}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onPlayback}
        className="hud-button flex items-center gap-2 border-pink-400 text-pink-400 hover:shadow-pink-400/50"
      >
        <RotateCcw size={16} className="rotate-180" />
        PLAYBACK MEMORY
      </motion.button>

      <motion.button
        whileHover={hasChanges ? { scale: 1.03 } : {}}
        whileTap={hasChanges ? { scale: 0.97 } : {}}
        onClick={handleReset}
        className={`hud-button flex items-center gap-2 ${
          hasChanges ? 'hover:shadow-orange-400/50' : 'opacity-50'
        }`}
        disabled={!hasChanges}
      >
        <RotateCcw size={16} />
        RESET
      </motion.button>

      <div className="flex-1"></div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevCase}
          className="hud-button px-2 hover:shadow-cyan-400/50"
        >
          <ChevronLeft size={16} />
        </motion.button>
        <span className="hud-text-cyan text-sm px-3 py-2 border border-cyan-400/50">
          #{caseNumber}/{totalCases}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextCase}
          className="hud-button px-2 hover:shadow-cyan-400/50"
        >
          <ChevronRight size={16} />
        </motion.button>
      </div>

      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="hud-border vice-sunset bg-slate-900/95 p-6 max-w-sm"
            >
              <div className="hud-text-pink mb-4">RESET MEMORY?</div>
              <p className="text-cyan-300 mb-6">All edits will be lost. Continue?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowResetConfirm(false);
                    onReset();
                  }}
                  className="hud-button flex-1 bg-red-900/20 border-red-400 text-red-400 hover:shadow-red-400/50"
                >
                  CONFIRM
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="hud-button flex-1"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
