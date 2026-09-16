'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scenarioData: Record<string, { image: string, duration: number, text: string }[]> = {
  '027': [
    { image: '/c27_scene1.jpg', duration: 15, text: "EAST LOS SANTOS - 03:00 AM" },
    { image: '/c27_scene2.jpg', duration: 15, text: "TARGET ON THE MOVE" },
    { image: '/c27_scene3.jpg', duration: 15, text: "WEAPON DISCARDED" },
    { image: '/c27_scene4.jpg', duration: 15, text: "LSPD IN PURSUIT" },
  ],
  '028': [
    { image: '/c28_scene1.jpg', duration: 15, text: "VESPUCCI BLVD SUBWAY" },
    { image: '/c28_scene2.jpg', duration: 15, text: "POWER FLUCTUATIONS DETECTED" },
    { image: '/c28_scene3.jpg', duration: 15, text: "SIGNAL LOST" },
    { image: '/c28_scene4.jpg', duration: 15, text: "NO ESCAPE" },
  ],
  '029': [
    { image: '/c29_scene1.jpg', duration: 30, text: "CYPRESS FLATS - SECURECORP HQ" },
    { image: '/c29_scene2.jpg', duration: 30, text: "CRITICAL BREACH IN SECTOR 7" },
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

    return () => clearTimeout(timeout);
  }, [currentSceneIndex, scenes, onComplete]);

  if (currentSceneIndex >= scenes.length) return null;

  const currentScene = scenes[currentSceneIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden font-sans">
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
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-12 right-12 z-10"
          >
            <h2 
              className="text-4xl md:text-6xl font-black italic text-white uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
              style={{
                WebkitTextStroke: '2px black',
                textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              {currentScene.text}
            </h2>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      <button 
        onClick={onComplete}
        className="absolute top-6 right-6 z-[110] px-4 py-2 bg-black/50 border border-white/20 text-white hover:bg-white/10 transition-colors uppercase text-sm font-bold tracking-widest"
      >
        Skip Sequence
      </button>
    </div>
  );
}
