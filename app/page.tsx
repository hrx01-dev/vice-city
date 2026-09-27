'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageEditor, { type ImageEditorRef } from '@unlayer/react-image-editor';
import { Activity, AlertTriangle, Cpu, FileSearch, Radio, Save, Target } from 'lucide-react';
import { StatusBar } from '@/components/StatusBar';
import { ToolRail } from '@/components/ToolRail';
import { CluePanel } from '@/components/CluePanel';
import { ActionControls } from '@/components/ActionControls';
import { IntroSequence } from '@/components/IntroSequence';
import { ScenarioSequence } from '@/components/ScenarioSequence';
import { FinalSequence } from '@/components/FinalSequence';
import { LandingPage } from '@/components/LandingPage';
import { VicePalm } from '@/components/VicePalm';

import { casesData } from '@/lib/casesData';

export default function Page() {
  const editorRef = useRef<ImageEditorRef>(null);
  const [caseIndex, setCaseIndex] = useState(0);

  useEffect(() => {
    document.title = `Memory Dealer // Case #${casesData[caseIndex].number}`;
  }, [caseIndex]);
  const [activeTool, setActiveTool] = useState('');
  const [showLanding, setShowLanding] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showBriefing, setShowBriefing] = useState(false);
  const [showBossMessage, setShowBossMessage] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [solvedCases, setSolvedCases] = useState<Set<string>>(new Set());
  const [showFinalSequence, setShowFinalSequence] = useState(false);
  const [memoryState, setMemoryState] = useState<'READY' | 'CORRUPTED' | 'RESTORING' | 'UNAVAILABLE'>('READY');
  const [stabilityScore, setStabilityScore] = useState(91);
  const [editCount, setEditCount] = useState(0);
  const [savedMemoryUrl, setSavedMemoryUrl] = useState<string | null>(null);
  const [clues, setClues] = useState(casesData[0].clues);
  const [extractedTargets, setExtractedTargets] = useState<string[]>([]);
  const [notice, setNotice] = useState('MEMORY LINK ESTABLISHED');
  const currentCase = casesData[caseIndex];
  const hasChanges = editCount > 0;
  const allTargetsExtracted = currentCase.targetAreas.every(t => extractedTargets.includes(t.id));
  const canExport = !!savedMemoryUrl && clues.every(c => c.added) && allTargetsExtracted;

  const editorOptions = useMemo(() => ({
    theme: 'dark' as const,
    offline: true,
    aiAssistantOpenState: 'closed' as const,
    features: { ai: false },
  }), []);

  const changeCase = (next: number) => {
    setMemoryState('RESTORING');
    setNotice('RESTORING MEMORY BLOCK...');
    const nextIndex = (next + casesData.length) % casesData.length;
    setCaseIndex(nextIndex);
    setEditCount(0);
    setStabilityScore(91);
    setClues(casesData[nextIndex].clues);
    setExtractedTargets([]);
    setActiveTool('');
    window.setTimeout(() => {
      setMemoryState('READY');
      setNotice('MEMORY LINK ESTABLISHED');
      setShowBriefing(true);
    }, 550);
  };

  const investigate = (id: string) => {
    setClues((current) => current.map((clue) => clue.id === id ? { ...clue, scanned: true } : clue));
    setStabilityScore((score) => Math.max(62, score - 1));
    setNotice(`CLUE SCAN COMPLETE // ${id.toUpperCase()}`);
  };

  const addToCase = (id: string) => {
    setClues((current) => current.map((clue) => clue.id === id ? { ...clue, added: true } : clue));
    setNotice(`CLUE ${id.toUpperCase()} SECURED IN CASE FILE`);
  };

  const markEdit = (tool: string) => {
    setActiveTool(tool);
    if (tool !== 'extract') {
      setEditCount((count) => count + 1);
      setStabilityScore((score) => Math.max(62, score - 2));
    }
    setNotice(`${tool.toUpperCase()} MODULE ARMED${tool === 'extract' ? ' // CLICK TARGET AREA' : ''}`);
  };

  const reset = () => {
    editorRef.current?.editor?.reset(currentCase.original);
    setEditCount(0);
    setStabilityScore(91);
    setActiveTool('');
    setNotice('MEMORY RESTORED TO ORIGINAL');
  };

  const exportImage = () => {
    setNotice('TRANSMITTING TO HQ...');
    setShowBossMessage(true);
  };

  if (showLanding) {
    return (
      <LandingPage
        onEnter={(selectedCase) => {
          setCaseIndex(selectedCase);
          setShowLanding(false);
          setShowIntro(true);
        }}
      />
    );
  }

  if (showIntro) {
    return <IntroSequence onComplete={() => {
      setShowIntro(false);
      setShowBriefing(true);
    }} />;
  }

  if (showBriefing) {
    return (
      <div className="fixed inset-0 z-[300] bg-black text-cyan-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full border border-pink-500/50 bg-[#050505] p-8 md:p-10 shadow-[0_0_50px_rgba(34,211,238,0.15)] relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-cyan-500/30 pb-4">
              <div>
                <div className="text-pink-400 tracking-[0.3em] text-xs mb-2">CASE FILE #{currentCase.number}</div>
                <h2 className="text-3xl md:text-5xl font-display tracking-widest text-cyan-400">{currentCase.title}</h2>
              </div>
              <FileSearch className="text-cyan-400/50 hidden md:block" size={48} />
            </div>
            
            <div className="bg-black/50 border border-pink-500/20 p-6 space-y-4 font-mono text-sm md:text-base leading-relaxed text-cyan-100/80">
              <div className="flex flex-col md:flex-row md:gap-4 border-b border-pink-500/20 pb-4">
                <span className="text-pink-400 md:w-40 tracking-widest text-xs uppercase mb-1 md:mb-0">Prime Suspect:</span>
                <span className="flex-1 text-white font-bold">{currentCase.suspectName}</span>
              </div>
              <div className="pt-2">
                <p className="text-cyan-300 mb-2 tracking-widest text-xs uppercase">Initial Report / Alibi:</p>
                <p>{currentCase.briefing}</p>
              </div>
              <div className="pt-2 border-t border-pink-500/20 mt-4">
                <p className="text-pink-400 mb-2 tracking-widest text-xs uppercase">Required Actions:</p>
                <ul className="list-disc pl-5 space-y-2 text-cyan-100/70">
                  <li>Use the <span className="text-white font-bold">Filter</span> tools to enhance the dark/blurry raw memory.</li>
                  <li>Use the <span className="text-white font-bold">Crop</span> or <span className="text-white font-bold">Draw</span> tools to highlight the suspect.</li>
                  <li>Click <span className="text-white font-bold">Save</span> in the editor to lock in your enhancements.</li>
                  <li>Arm the <span className="text-white font-bold">EXTRACT MODULE</span> to target and scan all hidden clues.</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setShowBriefing(false)}
              className="hud-button w-full py-4 mt-4 text-center tracking-[0.2em] font-bold text-xs"
            >
              PROCEED TO NEURAL RECONSTRUCTION
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showSavedMessage) {
    return (
      <div className="fixed inset-0 z-[300] bg-black text-cyan-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full border border-pink-500/50 bg-[#050505] p-8 shadow-[0_0_50px_rgba(255,47,143,0.15)] relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 shrink-0 border border-cyan-500/50 p-1 relative bg-cyan-900/20">
              <div className="w-full h-full bg-cyan-950 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-cyan-500/50" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 border-b border-pink-500/30 pb-3 mb-4">
                <Radio size={16} className="text-pink-400 animate-pulse" />
                <h2 className="text-md font-display tracking-widest text-pink-400">CHIEF MCCLANE</h2>
              </div>
              
              <div className="space-y-3 mb-6 font-mono text-sm text-cyan-100/90 leading-relaxed border-l-2 border-cyan-500/30 pl-4 relative">
                <p>"Good work enhancing that raw memory, detective."</p>
                <p>"The image is much clearer now. Make sure you use the <span className="text-pink-400">EXTRACT MODULE</span> to target all anomalies and add them to the file."</p>
                <p className="text-green-400 font-bold">"When you have the full picture, hit SEND EVIDENCE."</p>
              </div>

              <button 
                onClick={() => setShowSavedMessage(false)}
                className="hud-button w-full py-3 text-center tracking-[0.2em] font-bold text-xs"
              >
                RETURN TO EDITOR
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showBossMessage) {
    return (
      <div className="fixed inset-0 z-[300] bg-black text-cyan-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full border border-pink-500/50 bg-[#050505] p-8 shadow-[0_0_50px_rgba(255,47,143,0.15)] relative overflow-hidden"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
            
            {/* Chief Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 border border-cyan-500/50 p-1 relative bg-cyan-900/20">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none" />
              <div className="w-full h-full bg-cyan-950 flex items-center justify-center overflow-hidden relative">
                <svg viewBox="0 0 24 24" className="w-16 h-16 text-cyan-500/50" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                {/* Scanner bar animation over avatar */}
                <motion.div 
                  className="absolute inset-0 border-t-2 border-cyan-400 bg-cyan-400/20"
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-center justify-between border-b border-pink-500/30 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <Radio size={20} className="text-pink-400 animate-pulse" />
                  <h2 className="text-lg md:text-xl font-display tracking-widest text-pink-400">CHIEF MCCLANE</h2>
                </div>
                <div className="text-[10px] text-pink-400/50 font-mono tracking-widest animate-pulse hidden md:block">
                  SECURE CONNECTION ESTABLISHED
                </div>
              </div>
              
              <div className="space-y-4 mb-8 font-mono text-sm md:text-base text-cyan-100/90 leading-relaxed border-l-2 border-cyan-500/30 pl-4 relative">
                {currentCase.chiefMessage.map((msg, idx) => (
                  <motion.p 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 1.2, duration: 0.5 }}
                    className={idx === currentCase.chiefMessage.length - 1 ? "text-green-400 font-bold" : ""}
                  >
                    "{msg}"
                  </motion.p>
                ))}
              </div>

              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: currentCase.chiefMessage.length * 1.2 + 0.5 }}
                onClick={() => {
                  setShowBossMessage(false);
                  setActiveScenario(currentCase.number);
                  setSolvedCases(prev => new Set(prev).add(currentCase.number));
                  setEditCount((count) => count + 1);
                }}
                className="hud-button w-full py-4 text-center tracking-[0.2em] font-bold text-xs hover:bg-pink-500/20"
              >
                INITIALIZE RECONSTRUCTION SEQUENCE
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (activeScenario) {
    return <ScenarioSequence caseId={activeScenario} onComplete={() => {
      setActiveScenario(null);
      // If we just solved the last case, trigger the finale
      // We check size against cases.length, noting that solvedCases state updates async, 
      // but the set itself we check here might already be updated since this render happened after exportImage set it.
      // Wait, actually, the state passed here is the updated state from the render!
      if (solvedCases.size === casesData.length) {
        setShowFinalSequence(true);
      }
    }} />;
  }

  if (showFinalSequence) {
    return <FinalSequence onComplete={() => {
      setShowFinalSequence(false);
      setSolvedCases(new Set());
      setCaseIndex(0);
    }} />;
  }

  return (
    <main className="hud-background min-h-screen text-cyan-100 p-3 md:p-5 relative overflow-hidden">
      <VicePalm className="vice-palm left-2 bottom-2 text-pink-500/25 hidden xl:block" />
      <VicePalm className="vice-palm right-2 bottom-2 text-cyan-400/20 hidden xl:block scale-x-[-1]" />

      <div className="max-w-[1600px] mx-auto space-y-3 relative">
        <StatusBar caseNumber={currentCase.number} memoryState={memoryState} stabilityScore={stabilityScore} editCount={editCount} />

        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="vice-sunset flex flex-col md:flex-row md:items-end justify-between gap-3 px-1 pt-2"
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-[11px] tracking-[0.35em]">
              <Cpu size={14} /> VICE CITY P.D. // NEURAL ARCHIVE DIVISION
            </div>
            <h1
              className="glitch-effect font-display text-vice-gradient text-5xl md:text-7xl tracking-wide leading-none"
              data-text="MEMORY DEALER"
            >
              MEMORY DEALER
            </h1>
            <p className="text-cyan-300/60 text-xs tracking-widest mt-1">{currentCase.title}</p>
          </div>
          <div className="flex gap-2 items-center text-xs tracking-widest text-cyan-300/80">
            <Radio size={14} className="text-pink-400 animate-pulse" /> LIVE UPLINK <span className="text-pink-400">SECURE</span>
          </div>
        </motion.header>

        <section className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-3 items-stretch">
          <CluePanel clues={clues} onInvestigate={investigate} onAddToCase={addToCase} />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="hud-panel hud-border min-w-0 p-3 flex flex-col gap-3"
          >
            <div className="flex justify-between items-center text-xs text-cyan-300/70">
              <span className="flex items-center gap-2"><FileSearch size={14} /> EVIDENCE FRAME // RAW MEMORY</span>
              <div className="flex items-center gap-4">
                <span className="text-pink-400 hidden md:inline-block max-w-[200px] truncate" title={notice}>{notice}</span>
                <button
                  onClick={() => markEdit(activeTool === 'extract' ? '' : 'extract')}
                  className={`hud-button flex items-center gap-2 py-1 px-4 tracking-widest transition-all ${activeTool === 'extract' ? 'bg-pink-500/20 shadow-[0_0_15px_rgba(255,47,143,0.5)] border-pink-400 text-pink-400' : 'hover:border-pink-500 hover:text-pink-400'}`}
                >
                  <Target size={14} className={activeTool === 'extract' ? 'animate-pulse' : ''} />
                  {activeTool === 'extract' ? 'TARGETING ACTIVE' : 'ARM EXTRACTOR'}
                </button>
              </div>
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
                onSave={(result) => { 
                  setEditCount((count) => count + 1); 
                  setNotice('MEMORY SAVED TO CASE FILE');
                  setSavedMemoryUrl(result.dataUrl); 
                  setShowSavedMessage(true);
                }}
              />
              <div className="pointer-events-none absolute inset-0 border border-pink-400/30" />
              {activeTool === 'extract' && (
                <div 
                  className="absolute inset-0 z-50 cursor-crosshair bg-red-900/10"
                  onClick={(e) => {
                    if (allTargetsExtracted) return;
                    
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    
                    const hit = currentCase.targetAreas.find(t => {
                      if (extractedTargets.includes(t.id)) return false;
                      const dist = Math.sqrt(Math.pow(x - t.x, 2) + Math.pow(y - t.y, 2));
                      return dist <= t.radius;
                    });
                    
                    if (hit) {
                      const newExtracted = [...extractedTargets, hit.id];
                      setExtractedTargets(newExtracted);
                      
                      // Discover the clue
                      setClues((current) => current.map((clue) => clue.id === hit.id ? { ...clue, discovered: true } : clue));
                      
                      if (newExtracted.length === currentCase.targetAreas.length) {
                        setNotice('ALL TARGETS EXTRACTED // CLUES DISCOVERED');
                        setTimeout(() => setActiveTool(''), 1000);
                      } else {
                        setNotice(`TARGET EXTRACTED // ${currentCase.targetAreas.length - newExtracted.length} REMAINING`);
                      }
                    } else {
                      // Find the closest unextracted target for a hint
                      const unextracted = currentCase.targetAreas.filter(t => !extractedTargets.includes(t.id));
                      const closest = unextracted.sort((a, b) => {
                        const distA = Math.sqrt(Math.pow(x - a.x, 2) + Math.pow(y - a.y, 2));
                        const distB = Math.sqrt(Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2));
                        return distA - distB;
                      })[0];
                      if (closest) {
                        setNotice(`MISSED [X:${Math.round(x)}, Y:${Math.round(y)}] // HINT: ${closest.hint}`);
                      }
                    }
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none border-[3px] border-red-500/50" />
                  <div className="absolute top-4 right-4 bg-red-900/80 text-red-400 border border-red-500 px-3 py-2 text-xs tracking-[0.2em] shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                    TARGETING: {extractedTargets.length} / {currentCase.targetAreas.length} SECURED
                  </div>
                  {allTargetsExtracted && (
                    <div className="absolute inset-0 bg-green-500/20 pointer-events-none flex items-center justify-center">
                       <span className="text-green-400 font-display text-4xl shadow-black drop-shadow-md">ALL TARGETS SECURED</span>
                    </div>
                  )}
                </div>
              )}
              {memoryState === 'RESTORING' && <div className="absolute inset-0 bg-[#12081f]/80 flex items-center justify-center hud-text-cyan text-sm"><Activity className="mr-2 animate-spin" size={16} /> RESTORING...</div>}
            </div>
            <ActionControls
              onExport={exportImage}
              onReset={reset}
              onPlayback={() => setActiveScenario(currentCase.number)}
              onPrevCase={() => changeCase(caseIndex - 1)}
              onNextCase={() => changeCase(caseIndex + 1)}
              caseNumber={currentCase.number}
              totalCases={casesData.length}
              hasChanges={hasChanges}
              canExport={canExport}
              savedMemoryUrl={savedMemoryUrl}
            />
          </motion.div>
        </section>

        <footer className="flex flex-col md:flex-row justify-between gap-2 border-t border-pink-400/30 pt-3 text-[10px] tracking-widest text-cyan-300/50">
          <span>MEMORY DEALER OS v2.7.4 // VICE CITY NODE</span>
          <span className="flex items-center gap-2"><Save size={12} /> AUTOSAVE ACTIVE <AlertTriangle size={12} className="text-orange-400" /> HANDLE WITH CARE</span>
        </footer>
      </div>

      {/* Saved Memory Modal */}
      {savedMemoryUrl && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hud-panel hud-border max-w-5xl w-full max-h-full overflow-hidden bg-[#050505] p-6 flex flex-col md:flex-row gap-6 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
          >
            <div className="flex-1 flex flex-col gap-4 min-h-0">
              <div className="flex items-center justify-between border-b border-cyan-400/30 pb-3">
                <h2 className="hud-text-cyan text-lg md:text-xl tracking-widest font-display">CASE #{currentCase.number} // SAVED RECORD</h2>
                <div className="text-[10px] tracking-widest text-green-400 animate-pulse bg-green-500/10 px-2 py-1 border border-green-500/50">SECURE STORAGE</div>
              </div>
              <div className="flex-1 overflow-hidden flex items-center justify-center bg-black/50 border border-pink-500/20 relative">
                <img src={savedMemoryUrl} alt="Edited Memory" className="max-w-full max-h-full object-contain" />
                <div className="absolute inset-0 pointer-events-none border border-cyan-400/10" />
              </div>
            </div>
            
            <div className="w-full md:w-80 flex flex-col gap-4 min-h-0">
              <h3 className="hud-text-pink tracking-widest text-sm border-b border-pink-500/30 pb-3 font-display">LOGGED EVIDENCE</h3>
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
                {clues.filter(c => c.added).length === 0 ? (
                  <p className="text-cyan-100/50 text-xs italic tracking-widest text-center mt-10">NO EVIDENCE LOGGED YET</p>
                ) : (
                  clues.filter(c => c.added).map(c => (
                    <div key={c.id} className="bg-cyan-900/10 border border-cyan-400/30 p-3 hover:bg-cyan-900/20 transition-colors">
                      <div className="text-cyan-400 text-xs font-bold mb-1 tracking-widest flex justify-between">
                        {c.name}
                        <FileSearch size={14} className="text-cyan-400/50" />
                      </div>
                      <div className="text-cyan-100/70 text-[10px] leading-relaxed">{c.description}</div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button 
                  onClick={() => {
                    setSavedMemoryUrl(null);
                    exportImage();
                  }} 
                  disabled={!canExport}
                  className={`hud-button w-full py-3 text-center text-xs transition-all flex items-center justify-center gap-2 ${
                    canExport 
                      ? 'bg-green-500/20 hover:bg-green-500/40 border-green-500 text-green-400 font-bold shadow-[0_0_15px_rgba(74,222,128,0.3)]' 
                      : 'opacity-50 cursor-not-allowed bg-black text-cyan-100/50 border-cyan-900/50'
                  }`}
                >
                  <Save size={14} />
                  {canExport ? 'SEND EVIDENCE TO CHIEF' : 'REQUIREMENTS NOT MET'}
                </button>
                <button 
                  onClick={() => setSavedMemoryUrl(null)} 
                  className="hud-button w-full py-3 text-center text-xs bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/50 transition-all"
                >
                  CLOSE & RESUME UPLINK
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
