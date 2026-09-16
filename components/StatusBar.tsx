'use client';

import React from 'react';

interface StatusBarProps {
  caseNumber: string;
  memoryState: 'READY' | 'CORRUPTED' | 'RESTORING' | 'UNAVAILABLE';
  stabilityScore: number;
  editCount: number;
}

export function StatusBar({ caseNumber, memoryState, stabilityScore, editCount }: StatusBarProps) {
  const getStatusColor = () => {
    switch (memoryState) {
      case 'READY':
        return 'text-lime-400';
      case 'CORRUPTED':
        return 'text-red-400';
      case 'RESTORING':
        return 'text-cyan-400';
      case 'UNAVAILABLE':
        return 'text-orange-400';
      default:
        return 'text-lime-400';
    }
  };

  return (
    <div className="hud-border" style={{ borderBottom: '2px solid #ccff00', padding: '0.75rem 1rem' }}>
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-8">
          <div className="hud-text-lime text-sm">
            CASE #{caseNumber}
          </div>
          <div className={`hud-text-lime text-sm flex items-center gap-2 ${getStatusColor()}`}>
            <span className="inline-block w-2 h-2 bg-current rounded-full animate-pulse"></span>
            {memoryState}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hud-text-cyan text-sm">
            STABILITY: <span className="hud-text-lime">{stabilityScore}%</span>
          </div>
          <div className="hud-text-cyan text-sm">
            EDITS: <span className="hud-text-lime">{editCount}</span>
          </div>
          <div className="hud-text-cyan text-sm">
            {new Date().toLocaleTimeString('en-US', { hour12: false })}
          </div>
        </div>
      </div>
    </div>
  );
}
