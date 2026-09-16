'use client';

import React, { useState } from 'react';
import { Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface ActionControlsProps {
  onExport: () => void;
  onReset: () => void;
  onPrevCase: () => void;
  onNextCase: () => void;
  caseNumber: string;
  totalCases: number;
  hasChanges: boolean;
}

export function ActionControls({
  onExport,
  onReset,
  onPrevCase,
  onNextCase,
  caseNumber,
  totalCases,
  hasChanges,
}: ActionControlsProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    if (hasChanges) {
      setShowResetConfirm(true);
    } else {
      onReset();
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={onExport}
        className="hud-button flex items-center gap-2 hover:shadow-lime-400/50"
      >
        <Download size={16} />
        EXPORT
      </button>

      <button
        onClick={handleReset}
        className={`hud-button flex items-center gap-2 ${
          hasChanges ? 'hover:shadow-orange-400/50' : 'opacity-50'
        }`}
        disabled={!hasChanges}
      >
        <RotateCcw size={16} />
        RESET
      </button>

      <div className="flex-1"></div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrevCase}
          className="hud-button px-2 hover:shadow-cyan-400/50"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="hud-text-cyan text-sm px-3 py-2 border border-cyan-400/50">
          #{caseNumber}/{totalCases}
        </span>
        <button
          onClick={onNextCase}
          className="hud-button px-2 hover:shadow-cyan-400/50"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="hud-border bg-slate-900/95 p-6 max-w-sm">
            <div className="hud-text-lime mb-4">RESET MEMORY?</div>
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
          </div>
        </div>
      )}
    </div>
  );
}
