'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, Zap } from 'lucide-react';

interface Clue {
  id: string;
  name: string;
  description: string;
  scanned: boolean;
  added?: boolean;
  discovered: boolean;
}

interface CluePanelProps {
  clues: Clue[];
  onInvestigate: (clueId: string) => void;
  onAddToCase: (clueId: string) => void;
}

export function CluePanel({ clues, onInvestigate, onAddToCase }: CluePanelProps) {
  const [hoveredClue, setHoveredClue] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="hud-border hud-panel flex flex-col gap-3 p-4 overflow-hidden"
    >
      <div className="hud-text-pink text-sm border-b border-pink-400/30 pb-2">
        DISCOVERED CLUES
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 text-xs">
        {clues.filter(c => c.discovered).length === 0 ? (
          <div className="hud-text-cyan opacity-60">
            USE 'EXTRACT' TOOL ON IMAGE TO FIND CLUES...
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {clues.filter(c => c.discovered).map((clue, i) => (
              <motion.div
                key={clue.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.35 }}
                onMouseEnter={() => setHoveredClue(clue.id)}
                onMouseLeave={() => setHoveredClue(null)}
                className={`p-2 border transition-colors ${
                  hoveredClue === clue.id
                    ? 'border-cyan-400 bg-cyan-900/20'
                    : 'border-pink-400/30 bg-pink-900/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <motion.span
                    animate={clue.scanned ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      clue.scanned ? 'bg-pink-400' : 'bg-orange-400'
                    }`}
                  />
                  <span className={clue.scanned ? 'hud-text-pink' : 'hud-text-cyan'}>
                    {clue.name}
                  </span>
                </div>
                <p className="text-cyan-300 opacity-80 mb-2">
                  {clue.description}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => onInvestigate(clue.id)}
                    className={`hud-button text-xs px-2 py-1 flex items-center gap-1 ${clue.scanned ? 'opacity-50' : 'hover:shadow-pink-400/50'}`}
                    disabled={clue.scanned}
                  >
                    <Eye size={12} />
                    {clue.scanned ? 'SCANNED' : 'SCAN'}
                  </button>
                  <button
                    onClick={() => onAddToCase(clue.id)}
                    className={`hud-button text-xs px-2 py-1 flex items-center gap-1 ${clue.added ? 'opacity-50 text-green-400 border-green-500' : 'hover:shadow-cyan-400/50'}`}
                    disabled={clue.added}
                  >
                    <Download size={12} />
                    {clue.added ? 'ADDED' : 'ADD'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      <div className="border-t border-pink-400/30 pt-2">
        <button className="hud-button w-full text-xs flex items-center justify-center gap-1">
          <Zap size={14} />
          SAVE MEMORY
        </button>
      </div>
    </motion.div>
  );
}
