'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Radio, ArrowRight, ChevronDown, Fingerprint, FileSearch, Wand2, ScanEye, Target } from 'lucide-react';
import { VicePalm } from '@/components/VicePalm';

const caseFiles = [
  { number: '027', title: 'NIGHT SHIFT', location: 'EAST LOS SANTOS' },
  { number: '028', title: 'SIGNAL LOST', location: 'VESPUCCI BLVD' },
  { number: '029', title: 'BLACKOUT', location: 'CYPRESS FLATS' },
];

const steps = [
  {
    icon: Fingerprint,
    title: 'JACK IN',
    body: "Pick an open case file and establish a secure neural uplink to the Vice City archive.",
  },
  {
    icon: FileSearch,
    title: 'LOAD THE MEMORY',
    body: 'The raw evidence frame loads into the restoration bay — a full photo editor running live inside the archive, powered by React Image Editor.',
  },
  {
    icon: Wand2,
    title: 'RESTORE & RECONSTRUCT',
    body: 'Crop, draw, retouch, filter and reframe the corrupted frame with a full tool rail to reveal what the memory is hiding.',
  },
  {
    icon: ScanEye,
    title: 'SCAN FOR CLUES',
    body: 'Scan discovered clues, add them to the case file, then export the restored memory as evidence.',
  },
];

export function LandingPage({ onEnter }: { onEnter: (caseIndex: number) => void }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onEnter(selected);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onEnter, selected]);

  return (
    <div className="relative z-[100] bg-black text-cyan-100">
      {/* ============ HERO ============ */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/city_skyline.jpg)' }}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 26, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/city_skyline.jpg)' }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />

        {/* scanning sweep */}
        <motion.div
          initial={{ top: '-10%' }}
          animate={{ top: '110%' }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
          className="pointer-events-none absolute left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,47,143,0.08), transparent)' }}
        />

        <VicePalm className="vice-palm left-4 bottom-0 text-pink-500/30 hidden md:block" />
        <VicePalm className="vice-palm right-4 bottom-0 text-cyan-400/25 hidden md:block scale-x-[-1]" />

        {/* top bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 flex items-center justify-between px-5 md:px-10 pt-5 text-[11px] tracking-[0.3em]"
        >
          <span className="flex items-center gap-2 text-cyan-300/80">
            <Cpu size={14} /> VICE CITY P.D. // NEURAL ARCHIVE DIVISION
          </span>
          <span className="hidden sm:flex items-center gap-2 text-pink-300/80">
            <Radio size={12} className="text-pink-400 animate-pulse" /> LIVE UPLINK <span className="text-pink-400">SECURE</span>
          </span>
        </motion.div>

        {/* main content */}
        <div className="relative z-10 flex flex-col justify-center h-[calc(100%-160px)] px-5 md:px-10 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-pink-400 text-xs md:text-sm tracking-[0.4em] mb-3"
          >
            A NEURAL ARCHIVE INVESTIGATION
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            data-text="VICE CITY"
            className="glitch-effect font-display text-vice-gradient text-7xl sm:text-8xl md:text-[9rem] leading-[0.85] tracking-wide"
          >
            VICE CITY
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="font-display text-2xl md:text-4xl tracking-[0.3em] text-white/90 mt-1"
          >
            MEMORY DEALER
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="font-serif italic text-lg md:text-xl text-cyan-100/70 mt-5 max-w-xl"
          >
            "Every photograph hides a memory worth dealing." Jack into the archive, restore the evidence, and find out what the city doesn't want you to remember.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <motion.button
              onClick={() => onEnter(selected)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="pulse-pink group flex items-center gap-3 px-7 py-4 border-2 text-base font-display tracking-[0.25em] uppercase text-black"
              style={{ borderColor: 'var(--vice-pink)', background: 'linear-gradient(90deg, var(--vice-pink), var(--vice-orange))' }}
            >
              Enter The City
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <span className="hud-text-cyan text-[11px] tracking-[0.3em] opacity-70">
              or press ENTER
            </span>
          </motion.div>
        </div>

        {/* case file strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="relative z-10 flex flex-col gap-2 px-5 md:px-10"
        >
          <span className="hud-text-cyan text-[10px] tracking-[0.3em] opacity-70">SELECT OPEN CASE FILE</span>
          <div className="flex gap-3 flex-wrap">
            {caseFiles.map((c, i) => (
              <button
                key={c.number}
                onClick={() => setSelected(i)}
                onDoubleClick={() => onEnter(i)}
                className={`hud-button text-left px-4 py-2 transition-all ${selected === i ? 'bg-pink-500/20 shadow-[0_0_16px_rgba(255,47,143,0.5)]' : 'opacity-70'}`}
              >
                <div className="text-[10px] tracking-[0.2em] opacity-80">#{c.number}</div>
                <div className="text-sm">{c.title}</div>
                <div className="text-[9px] tracking-widest opacity-60">{c.location}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.a
          href="#how-it-works"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-cyan-300/60 hover:text-pink-300 transition-colors"
        >
          <span className="text-[10px] tracking-[0.3em]">FIELD MANUAL</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ChevronDown size={18} />
          </motion.span>
        </motion.a>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="hud-background relative py-20 md:py-28 px-5 md:px-10">
        <div className="vice-sunset max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="hud-text-cyan text-xs tracking-[0.35em] mb-2"
          >
            FIELD MANUAL // NEURAL ARCHIVE PROTOCOL
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-vice-gradient text-5xl md:text-7xl tracking-wide"
          >
            HOW IT WORKS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-cyan-300/60 text-sm md:text-base mt-3 max-w-xl"
          >
            Four steps between you and the truth buried in the evidence.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 mt-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: 0.15 * i, duration: 0.55, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  className="hud-border hud-panel relative flex flex-col gap-3 p-5"
                >
                  <span className="font-display text-vice-gradient text-4xl leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2 text-pink-400">
                    <Icon size={20} />
                    <h3 className="hud-text-pink text-sm">{step.title}</h3>
                  </div>
                  <p className="text-cyan-100/70 text-xs leading-relaxed">{step.body}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight size={16} className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-pink-400/50 z-10" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* ============ HOW TO ACE THIS ============ */}
          <div className="mt-32 pt-28 border-t border-pink-400/20">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="font-display text-vice-gradient text-5xl md:text-7xl tracking-wide mb-6">HOW TO ACE THIS</h2>
              <p className="text-cyan-300/60 text-base md:text-lg max-w-2xl mx-auto">
                The EXPORT button is locked. You must prove your detective skills to unlock the cinematic memory.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className="hud-panel hud-border flex flex-col h-full overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-48 overflow-hidden border-b border-cyan-400/30">
                  <img src="/c27_scene2.jpg" alt="Scanning Clues" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-cyan-900/40 mix-blend-overlay" />
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="hud-text-pink text-sm md:text-base mb-3 font-bold tracking-widest flex items-center gap-2">
                    <ScanEye size={18} /> 1. SCAN ALL CLUES
                  </h3>
                  <p className="text-cyan-100/70 text-xs md:text-sm leading-relaxed">
                    Read and click every single clue in the right-hand investigation panel to mark it as SCANNED before you can proceed.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hud-panel hud-border flex flex-col h-full overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-48 overflow-hidden border-b border-cyan-400/30">
                  <img src="/evidence_028.jpg" alt="Editing Evidence" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-cyan-900/40 mix-blend-overlay" />
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="hud-text-pink text-sm md:text-base mb-3 font-bold tracking-widest flex items-center gap-2">
                    <Target size={18} /> 2. TARGET & EXTRACT
                  </h3>
                  <p className="text-cyan-100/70 text-xs md:text-sm leading-relaxed">
                    Select the new EXTRACT tool (Target icon) and click the hidden piece of evidence within the image to secure it.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hud-panel hud-border bg-pink-900/10 border-pink-500/50 shadow-[0_0_20px_rgba(255,47,143,0.15)] flex flex-col h-full overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-48 overflow-hidden border-b border-pink-500/50">
                  <img src="/c30_scene4.jpg" alt="Cinematic Export" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-pink-900/30 mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="hud-button bg-green-500/20 border-green-500 text-green-400 text-[10px] tracking-widest font-bold px-3 py-1 animate-pulse">
                      UNLOCKED
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-pink-400 text-sm md:text-base mb-3 font-bold tracking-widest">
                    3. EDIT & EXPORT
                  </h3>
                  <p className="text-cyan-100/70 text-xs md:text-sm leading-relaxed">
                    Make a forensic edit using any other tool. Once you scan, extract, and edit, the EXPORT button will glow green!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-16 hud-border hud-panel px-6 py-6"
          >
            <div>
              <div className="hud-text-cyan text-xs tracking-[0.3em] mb-1">READY WHEN YOU ARE</div>
              <p className="text-cyan-100/70 text-sm">Case #027 is open. The clock reads 02:17 AM. Somebody doesn't want you to remember.</p>
            </div>
            <motion.button
              onClick={() => onEnter(selected)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 flex items-center gap-3 px-6 py-3 border-2 text-sm font-display tracking-[0.25em] uppercase text-black"
              style={{ borderColor: 'var(--vice-pink)', background: 'linear-gradient(90deg, var(--vice-pink), var(--vice-orange))' }}
            >
              Enter The City
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-2 px-5 md:px-10 py-6 border-t border-pink-400/20 text-[10px] tracking-widest text-cyan-300/50">
        <span>MEMORY DEALER OS v2.7.4 // VICE CITY NODE</span>
        <span>RATED M — NEON, GLITCH &amp; MEMORY LOSS</span>
      </footer>
    </div>
  );
}
