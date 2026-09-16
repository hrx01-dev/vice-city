'use client';

import React from 'react';
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
    <div
      className="hud-border flex flex-col gap-2 p-3"
      style={{ borderRight: '2px solid #ccff00', width: '80px' }}
    >
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;
        return (
          <button
            key={tool.id}
            onClick={() => onToolClick(tool.id)}
            className={`hud-button flex flex-col items-center justify-center gap-1 w-full aspect-square transition-all ${
              isActive
                ? 'bg-lime-900 shadow-lg shadow-lime-400/50'
                : ''
            }`}
            title={tool.label}
          >
            <Icon size={20} />
            <span className="text-xs">{tool.label.slice(0, 3)}</span>
          </button>
        );
      })}
    </div>
  );
}
