/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Shield, Radio, ShieldAlert } from 'lucide-react';
import { audioEngine } from '../utils/audio';
import SoundToggle from './SoundToggle';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatLisbonTime = (date: Date) => {
    // Lisbon is UTC+1 during summer (WEST), which is active in June
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const lisbonOffset = 1; // WEST (UTC+1)
    const lisbonDate = new Date(utc + 3600000 * lisbonOffset);
    return lisbonDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const handleDarkToggle = () => {
    audioEngine.playClick();
    onToggleDarkMode();
  };

  return (
    <header
      id="app-header"
      className={`border-b transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#080808]/95 border-white/10 text-white'
          : 'bg-white border-gray-200 text-gray-900 shadow-sm'
      } sticky top-0 z-40 backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand / Logo Section */}
        <div className="flex items-center gap-3">
          {/* FPF Emblem SVG styled with exact Bento Palette */}
          <div className="relative group cursor-pointer" onClick={() => audioEngine.playChime()}>
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-md rounded-full group-hover:bg-[#D4AF37]/30 transition-all duration-300" />
            <svg
              className="w-10 h-12 relative drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
              viewBox="0 0 100 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer shield structure */}
              <path
                d="M50 5 L90 25 C90 75, 50 115, 50 115 C50 115, 10 75, 10 25 Z"
                fill={isDarkMode ? '#111111' : '#8B0D1E'}
                stroke="#D4AF37"
                strokeWidth="4"
              />
              {/* Inner cross */}
              <path
                d="M50 10 V110 M20 50 H80"
                stroke="#004822"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Central Shield (Quinas) */}
              <rect x="38" y="38" width="24" height="34" rx="4" fill="#8B0D1E" stroke="#D4AF37" strokeWidth="2" />
              {/* Five dots inside (simplified quinas) */}
              <circle cx="50" cy="45" r="2" fill="#FFFFFF" />
              <circle cx="45" cy="55" r="2" fill="#FFFFFF" />
              <circle cx="55" cy="55" r="2" fill="#FFFFFF" />
              <circle cx="50" cy="65" r="2" fill="#FFFFFF" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-sans font-black tracking-tighter text-xl uppercase bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-[#D4AF37] via-white to-[#8B0D1E]' 
                  : 'from-[#8B0D1E] via-gray-800 to-[#004822]'
              } bg-clip-text text-transparent`}>
                Federação Portuguesa de Futebol
              </h1>
              <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-widest animate-pulse">
                Official Interface v2.026
              </span>
            </div>
            <p className={`text-xs font-mono tracking-wide ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
              PORTUGAL NATIONAL TEAM • WORLD CUP HUD
            </p>
          </div>
        </div>

        {/* Tactical HUD Metrics */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          {/* Lisbon & UTC Clocks */}
          <div className={`flex gap-4 border-l border-r border-dashed ${
            isDarkMode ? 'border-white/10' : 'border-gray-200'
          } px-4 py-1 font-mono text-xs`}>
            <div className="flex flex-col">
              <span className={isDarkMode ? 'text-[#D4AF37]' : 'text-[#8B0D1E] font-bold'}>LISBON (WEST)</span>
              <span className="font-semibold tabular-nums text-sm tracking-widest">
                {formatLisbonTime(currentTime)}
              </span>
            </div>
            <div className={`flex flex-col border-l ${
              isDarkMode ? 'border-white/10' : 'border-gray-200'
            } pl-4`}>
              <span className={isDarkMode ? 'text-white/40' : 'text-gray-400'}>UTC TIME</span>
              <span className={`font-medium tabular-nums text-sm ${
                isDarkMode ? 'text-white/40' : 'text-gray-500'
              }`}>
                {currentTime.toUTCString().slice(17, 25)}
              </span>
            </div>
          </div>

          {/* Connection status */}
          <div className={`hidden sm:flex items-center gap-2 font-mono text-[10px] ${
            isDarkMode ? 'text-[#00FF00]/80' : 'text-emerald-700'
          }`}>
            <Radio className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#00FF00]' : 'text-emerald-600'} animate-pulse`} />
            <span className="tracking-widest">SYNC_TARGET: FIFA_TMS_MAIN</span>
          </div>

          {/* Sound, Theme Toggle & Controls */}
          <div className="flex items-center gap-3 ml-auto md:ml-0">
            <SoundToggle />

            {/* Dark Mode Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={handleDarkToggle}
              className={`p-2 rounded-md border transition-all duration-300 ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-[#D4AF37] hover:bg-white/10'
                  : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
