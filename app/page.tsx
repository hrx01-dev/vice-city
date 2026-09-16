'use client';

import React, { useMemo, useRef, useState } from 'react';
import ImageEditor, { type ImageEditorRef } from '@unlayer/react-image-editor';
import { Activity, AlertTriangle, Cpu, FileSearch, Radio, Save } from 'lucide-react';
import { StatusBar } from '@/components/StatusBar';
import { ToolRail } from '@/components/ToolRail';
import { CluePanel } from '@/components/CluePanel';
import { ActionControls } from '@/components/ActionControls';
import { IntroSequence } from '@/components/IntroSequence';

const cases = [
  {
    number: '027',
    image: '/case-evidence.png',
    original: '/case-evidence.png',
    title: 'NIGHT SHIFT // EAST LOS SANTOS',
  },
  {
    number: '028',
    image: '/case-evidence.png',
    original: '/case-evidence.png',
    title: 'SIGNAL LOST // VESPUCCI BLVD',
  },
  {
    number: '029',
    image: '/case-evidence.png',
    original: '/case-evidence.png',
    title: 'BLACKOUT // CYPRESS FLATS',
  },
];

const initialClues = [
  { id: 'person', name: 'UNKNOWN PERSON', description: 'Face profile detected. Identity match pending.', scanned: false },
  { id: 'vehicle', name: 'BLUE VEHICLE', description: 'Plate fragment: 4?X-019. Model signature archived.', scanned: false },
  { id: 'time', name: 'TIMESTAMP', description: '02:17:44 AM. Camera clock drift: +00:03.', scanned: false },
  { id: 'sign', name: 'NEON SIGN', description: 'Partial glyph sequence: M E M O R Y.', scanned: false },
];

export default function Page() {
  const editorRef = useRef<ImageEditorRef>(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const [activeTool, setActiveTool] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [memoryState, setMemoryState] = useState<'READY' | 'CORRUPTED' | 'RESTORING' | 'UNAVAILABLE'>('READY');
  const [stabilityScore, setStabilityScore] = useState(91);
  const [editCount, setEditCount] = useState(0);
  const [clues, setClues] = useState(initialClues);
  const [notice, setNotice] = useState('MEMORY LINK ESTABLISHED');
  const currentCase = cases[caseIndex];
  const hasChanges = editCount > 0;

  const editorOptions = useMemo(() => ({
    theme: 'dark' as const,
    offline: true,
    aiAssistantOpenState: 'closed' as const,
    features: { ai: false },
  }), []);

  const changeCase = (next: number) => {
    setMemoryState('RESTORING');
    setNotice('RESTORING MEMORY BLOCK...');
    setCaseIndex((next + cases.length) % cases.length);
    setEditCount(0);
    setStabilityScore(91);
    setClues(initialClues);
    window.setTimeout(() => {
      setMemoryState('READY');
      setNotice('MEMORY LINK ESTABLISHED');
    }, 550);
  };

  const investigate = (id: string) => {
    setClues((current) => current.map((clue) => clue.id === id ? { ...clue, scanned: true } : clue));
    setStabilityScore((score) => Math.max(62, score - 1));
    setNotice(`CLUE SCAN COMPLETE // ${id.toUpperCase()}`);
  };

  const markEdit = (tool: string) => {
    setActiveTool(tool);
    setEditCount((count) => count + 1);
    setStabilityScore((score) => Math.max(62, score - 2));
    setNotice(`${tool.toUpperCase()} MODULE ARMED`);
  };

  const reset = () => {
    editorRef.current?.editor?.reset(currentCase.original);
    setEditCount(0);
    setStabilityScore(91);
    setActiveTool('');
    setNotice('MEMORY RESTORED TO ORIGINAL');
  };

  const exportImage = () => {
    setNotice('EXPORT QUEUED // CASE FILE UPDATED');
    setEditCount((count) => count + 1);
  };

  if (showIntro) {
    return <IntroSequence onComplete={() => setShowIntro(false)} />;
  }

  return (
    <main className="min-h-screen text-cyan-100 p-3 md:p-5" style={{ backgroundColor: '#0a0e27' }}>
      <div className="max-w-[1600px] mx-auto space-y-3">
        <StatusBar caseNumber={currentCase.number} memoryState={memoryState} stabilityScore={stabilityScore} editCount={editCount} />

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-1">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-[0.25em]">
              <Cpu size={14} /> NEURAL ARCHIVE / FORENSIC INTERFACE
            </div>
            <h1 className="glitch-effect hud-text-lime text-3xl md:text-5xl font-black tracking-tight" data-text="MEMORY DEALER">MEMORY DEALER</h1>
            <p className="text-cyan-300/60 font-mono text-xs tracking-widest">{currentCase.title}</p>
          </div>
          <div className="flex gap-2 items-center text-xs font-mono text-cyan-300/80">
            <Radio size={14} className="text-lime-400 animate-pulse" /> LIVE UPLINK <span className="text-lime-400">SECURE</span>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-[80px_minmax(0,1fr)_300px] gap-3 items-stretch">
          <ToolRail onToolClick={markEdit} activeTool={activeTool} />

          <div className="hud-panel hud-border min-w-0 p-3 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-mono text-cyan-300/70">
              <span className="flex items-center gap-2"><FileSearch size={14} /> EVIDENCE FRAME // RAW MEMORY</span>
              <span className="text-lime-400">{notice}</span>
            </div>
            <div className="relative min-h-[390px] flex-1 bg-black/50 overflow-hidden border border-cyan-400/30">
              <ImageEditor
                ref={editorRef}
                image={currentCase.image}
                options={editorOptions}
                minHeight="390px"
                style={{ width: '100%', height: '100%' }}
                onLoad={() => setNotice('EDITOR READY // AWAITING INPUT')}
                onError={() => setMemoryState('CORRUPTED')}
                onLoadError={() => setMemoryState('UNAVAILABLE')}
                onSave={() => { setEditCount((count) => count + 1); setNotice('MEMORY SAVED TO CASE FILE'); }}
              />
              <div className="pointer-events-none absolute inset-0 border border-lime-400/30" />
              {memoryState === 'RESTORING' && <div className="absolute inset-0 bg-[#0a0e27]/80 flex items-center justify-center hud-text-cyan text-sm"><Activity className="mr-2 animate-spin" size={16} /> RESTORING...</div>}
            </div>
            <ActionControls onExport={exportImage} onReset={reset} onPrevCase={() => changeCase(caseIndex - 1)} onNextCase={() => changeCase(caseIndex + 1)} caseNumber={currentCase.number} totalCases={cases.length} hasChanges={hasChanges} />
          </div>

          <CluePanel clues={clues} onInvestigate={investigate} onAddToCase={(id) => setNotice(`CLUE ${id.toUpperCase()} ADDED TO CASE FILE`)} />
        </section>

        <footer className="flex flex-col md:flex-row justify-between gap-2 border-t border-lime-400/30 pt-3 text-[10px] font-mono tracking-widest text-cyan-300/50">
          <span>MEMORY DEALER OS v2.7.4 // LOS SANTOS NODE</span>
          <span className="flex items-center gap-2"><Save size={12} /> AUTOSAVE ACTIVE <AlertTriangle size={12} className="text-orange-400" /> HANDLE WITH CARE</span>
        </footer>
      </div>
    </main>
  );
}
