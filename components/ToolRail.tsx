'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crop, Maximize2, Pen, Type, Square, Star, Frame, Palette } from 'lucide-react';

interface ToolRailProps {
  onToolClick: (tool: string) => void;
  activeTool?: string;
}

export function ToolRail({ onToolClick, activeTool }: ToolRailProps) {
  const tools = [
    { id: 'crop', label: 'CROP', icon: Crop },
    { id: 'resize', label: 'RESIZE', icon: Maximize2 },
    { id: 'draw', label: 'DRAW', icon: Pen },
    { id: 'text', label: 'TEXT', icon: Type },
    { id: 'shape', label: 'SHAPE', icon: Square },
    { id: 'sticker', label: 'STICKER', icon: Star },
    { id: 'frame', label: 'FRAME', icon: Frame },
    { id: 'filter', label: 'FILTER', icon: Palette },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="hud-border flex flex-col gap-2 p-3"
      style={{ borderRight: '2px solid var(--vice-pink)', width: '80px' }}
    >
      {tools.map((tool, i) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;
        return (
          <motion.button
            key={tool.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.04, duration: 0.35 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onToolClick(tool.id)}
            className="hud-button relative flex flex-col items-center justify-center gap-1 w-full aspect-square overflow-hidden"
            title={tool.label}
          >
            {isActive && (
              <motion.span
                layoutId="tool-rail-active"
                className="absolute inset-0 bg-pink-500/20 shadow-[0_0_16px_rgba(255,47,143,0.6)] pointer-events-none"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <Icon size={20} className="relative z-10" />
            <span className="relative z-10 text-xs">{tool.label.slice(0, 3)}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
