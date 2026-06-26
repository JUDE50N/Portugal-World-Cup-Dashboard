/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlayerStats } from '../types';

interface RadarChartProps {
  stats: PlayerStats;
  isDarkMode: boolean;
}

export default function RadarChart({ stats, isDarkMode }: RadarChartProps) {
  // Ordered keys for the 6 vertices of the hexagon
  const keys: (keyof PlayerStats)[] = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
  const labels = ['PACE', 'SHOOTING', 'PASSING', 'DRIBBLING', 'DEFENDING', 'PHYSICAL'];

  const size = 200;
  const center = size / 2;
  const r = 70; // Max radius

  // Map 6 points of hexagon
  const points = keys.map((key, i) => {
    const val = stats[key]; // 0 to 100
    const valueRatio = val / 100;
    const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2; // Hexagon vertices
    const x = center + r * valueRatio * Math.cos(angle);
    const y = center + r * valueRatio * Math.sin(angle);
    return { x, y, angle };
  });

  const polygonPointsStr = points.map(p => `${p.x},${p.y}`).join(' ');

  // Draw background hexagon concentric rings (e.g. at 25%, 50%, 75%, 100%)
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center justify-center relative p-2 select-none">
      <svg width={size} height={size} className="overflow-visible drop-shadow-[0_0_12px_rgba(212,175,55,0.25)]">
        {/* Background grids */}
        {rings.map((ratio, idx) => {
          const ringPoints = keys.map((_, i) => {
            const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
            const x = center + r * ratio * Math.cos(angle);
            const y = center + r * ratio * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={idx}
              points={ringPoints}
              fill="none"
              stroke={isDarkMode ? 'rgba(212, 175, 55, 0.15)' : 'rgba(139, 13, 30, 0.15)'}
              strokeWidth="1"
              strokeDasharray={idx < 3 ? '2,2' : 'none'}
            />
          );
        })}

        {/* Web Axis Lines */}
        {keys.map((_, i) => {
          const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={isDarkMode ? 'rgba(212, 175, 55, 0.12)' : 'rgba(139, 13, 30, 0.12)'}
              strokeWidth="1.5"
            />
          );
        })}

        {/* Player Stats Polygon (Filled & Glowing) */}
        <polygon
          points={polygonPointsStr}
          fill={isDarkMode ? 'rgba(212, 175, 55, 0.3)' : 'rgba(139, 13, 30, 0.25)'}
          stroke={isDarkMode ? '#D4AF37' : '#8B0D1E'}
          strokeWidth="2"
          className="transition-all duration-700 ease-out"
        />

        {/* Outer points indicators */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill={isDarkMode ? '#D4AF37' : '#8B0D1E'}
            stroke="#FFFFFF"
            strokeWidth="1"
          />
        ))}

        {/* Hexagon Text Labels */}
        {keys.map((_, i) => {
          const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
          // Offset text slightly further than max radius
          const labelDist = r + 18;
          const x = center + labelDist * Math.cos(angle);
          const y = center + labelDist * Math.sin(angle);
          
          let textAnchor = 'middle';
          if (Math.cos(angle) > 0.1) textAnchor = 'start';
          if (Math.cos(angle) < -0.1) textAnchor = 'end';

          return (
            <text
              key={i}
              x={x}
              y={y + 4}
              textAnchor={textAnchor}
              className="font-mono text-[9px] font-bold tracking-widest fill-gray-500"
            >
              {labels[i]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
