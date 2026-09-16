'use client';

import React, { useState } from 'react';
import { Eye, Download, Zap } from 'lucide-react';

interface Clue {
  id: string;
  name: string;
  description: string;
  scanned: boolean;
}

interface CluePanelProps {
  clues: Clue[];
  onInvestigate: (clueId: string) => void;
  onAddToCase: (clueId: string) => void;
}

export function CluePanel({ clues, onInvestigate, onAddToCase }: CluePanelProps) {
  const [hoveredClue, setHoveredClue] = useState<string | null>(null);

  return (
    <div className="hud-border hud-panel flex flex-col gap-3 p-4 overflow-hidden">
      <div className="hud-text-lime text-sm border-b border-lime-400/30 pb-2">
        DISCOVERED CLUES
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 text-xs">
        {clues.length === 0 ? (
          <div className="hud-text-cyan opacity-60">
            SCANNING FOR CLUES...
          </div>
        ) : (
          clues.map((clue) => (
            <div
              key={clue.id}
              onMouseEnter={() => setHoveredClue(clue.id)}
              onMouseLeave={() => setHoveredClue(null)}
              className={`p-2 border transition-all ${
                hoveredClue === clue.id
                  ? 'border-cyan-400 bg-cyan-900/20'
                  : 'border-lime-400/30 bg-lime-900/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                  clue.scanned ? 'bg-lime-400' : 'bg-orange-400'
                }`}></span>
                <span className={clue.scanned ? 'hud-text-lime' : 'hud-text-cyan'}>
                  {clue.name}
                </span>
              </div>
              <p className="text-cyan-300 opacity-80 mb-2">
                {clue.description}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => onInvestigate(clue.id)}
                  className="hud-button text-xs px-2 py-1 flex items-center gap-1 hover:shadow-lime-400/50"
                >
                  <Eye size={12} />
                  SCAN
                </button>
                <button
                  onClick={() => onAddToCase(clue.id)}
                  className="hud-button text-xs px-2 py-1 flex items-center gap-1 hover:shadow-cyan-400/50"
                >
                  <Download size={12} />
                  ADD
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border-t border-lime-400/30 pt-2">
        <button className="hud-button w-full text-xs flex items-center justify-center gap-1">
          <Zap size={14} />
          SAVE MEMORY
        </button>
      </div>
    </div>
  );
}
