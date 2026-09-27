'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scenarioData: Record<string, { image: string, duration: number, text: string, speech?: string }[]> = {
  '027': [
    { image: '/c27_scene1.jpg', duration: 15, text: "TIME & LOCATION CONFIRMED", speech: "Synchronizing data. The camera timestamp of 02:17 AM contradicts the suspect's alibi. The neon reflection confirms they were at the Memory lounge." },
    { image: '/c27_scene2.jpg', duration: 15, text: "TARGET IDENTIFIED", speech: "Cross-referencing face profile. Identity confirmed. The unknown person captured in the shadows is our prime suspect." },
    { image: '/c27_scene3.jpg', duration: 15, text: "WEAPON CONFIRMED", speech: "Analyzing the suspect's hands. A drawn firearm is clearly visible, proving premeditated intent to use lethal force." },
    { image: '/c27_scene4.jpg', duration: 15, text: "CASE CLOSED", speech: "By linking the timestamp, the drawn weapon, and the facial profile, the sequence of events is undeniable. Dispatching L S P D units to make the arrest." },
  ],
  '028': [
    { image: '/c28_scene1.jpg', duration: 15, text: "TIMELINE ESTABLISHED", speech: "Reconstruction active. The camera timestamp of 02:34 AM proves the incident occurred long after the trains stopped running." },
    { image: '/c28_scene2.jpg', duration: 15, text: "LOCATION VERIFIED", speech: "Analyzing the station signage. Uptown 42nd Street. This contradicts the initial report of them being at Vespucci." },
    { image: '/c28_scene3.jpg', duration: 15, text: "COMMUNICATION SEVERED", speech: "The dropped smartphone confirms a struggle. The screen is still active, severing the last transmission just as the power grid failed." },
    { image: '/c28_scene4.jpg', duration: 15, text: "CASE CLOSED", speech: "The timestamp, the station sign, and the abandoned phone trace a clear path of abduction. Sending coordinates to SWAT." },
  ],
  '029': [
    { image: '/c29_scene1.jpg', duration: 15, text: "BREACH POINT", speech: "Analyzing the shattered window. Glass patterns confirm the impact originated from the inside. This wasn't a break-in. It was a breakout." },
    { image: '/c29_scene2.jpg', duration: 15, text: "THE ALTERCATION", speech: "The overturned chair indicates a sudden physical struggle. The suspect was surprised while accessing the main terminal." },
    { image: '/c29_scene1.jpg', duration: 15, text: "BIOLOGICAL TRACE", speech: "Evidence marker 3 highlights a significant blood pool. The thief was severely injured before escaping through the window." },
  ],
  '030': [
    { image: '/evidence_030.jpg', duration: 15, text: "THE RENDEZVOUS", speech: "The neon reflection confirms the meeting took place outside the Blue Room cocktail lounge, exactly as the informant claimed." },
    { image: '/c30_scene4.jpg', duration: 15, text: "THE EXCHANGE GOES WRONG", speech: "The aluminum briefcase containing unregistered bearer bonds was dropped in a panic during an ambush." },
    { image: '/evidence_030.jpg', duration: 15, text: "CRIME SCENE SECURED", speech: "Evidence marker 4 indicates police arrived on the scene before the suspects could retrieve the briefcase." }
  ]
};

export function ScenarioSequence({ caseId, onComplete }: { caseId: string, onComplete: () => void }) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const scenes = scenarioData[caseId] || [];

  useEffect(() => {
    if (scenes.length === 0) {
      onComplete();
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    
    if (currentSceneIndex < scenes.length) {
      timeout = setTimeout(() => {
        setCurrentSceneIndex(prev => prev + 1);
      }, scenes[currentSceneIndex].duration * 1000);
    } else {
      onComplete();
    }

    return () => {
      clearTimeout(timeout);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentSceneIndex, scenes, onComplete]);

  useEffect(() => {
    if (currentSceneIndex >= scenes.length) return;
    const currentScene = scenes[currentSceneIndex];

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentScene.speech || currentScene.text);
      utterance.rate = 0.85;
      utterance.pitch = 0.4;
      
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB'));
      if (englishVoice) utterance.voice = englishVoice;

      window.speechSynthesis.speak(utterance);
    }
  }, [currentSceneIndex, scenes]);

  if (currentSceneIndex >= scenes.length) return null;

  const currentScene = scenes[currentSceneIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSceneIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentScene.image})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-12 right-12 z-10 text-right"
          >
            <div className="hud-text-pink text-xs mb-1 tracking-[0.3em]">
              SCENE {String(currentSceneIndex + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
            </div>
            <h2
              className="font-display text-5xl md:text-7xl text-white uppercase tracking-wide drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
              style={{
                WebkitTextStroke: '1.5px black',
                textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              {currentScene.text}
            </h2>
          </motion.div>

          {/* Transcript Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[80%] max-w-4xl text-center"
          >
            <p 
              className="font-mono text-lg md:text-2xl text-cyan-50 bg-black/60 px-6 py-3 border-l-4 border-r-4 border-pink-500/80 mx-auto inline-block drop-shadow-xl backdrop-blur-sm"
              style={{ textShadow: '1px 1px 3px black' }}
            >
              {currentScene.speech}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Camera-viewfinder frame — case footage aesthetic */}
      <div className="pointer-events-none absolute inset-6 z-10">
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-pink-400/70" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-pink-400/70" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-pink-400/70" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-pink-400/70" />
      </div>

      <div className="absolute top-6 left-6 z-[110] hud-text-cyan text-xs tracking-[0.3em] flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" /> REC // CASE {caseId}
      </div>

      <button
        onClick={onComplete}
        className="hud-button absolute top-6 right-6 z-[110]"
      >
        Skip Sequence
      </button>
    </div>
  );
}
