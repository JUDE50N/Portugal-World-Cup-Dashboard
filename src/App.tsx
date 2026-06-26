/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trophy, Shield, Flame, Target, Star, Users } from 'lucide-react';
import Header from './components/Header';
import MatchCountdown from './components/MatchCountdown';
import LiveSimulator from './components/LiveSimulator';
import SquadGrid from './components/SquadGrid';
import { audioEngine } from './utils/audio';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleStatHover = () => {
    audioEngine.playHover();
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex flex-col ${
        isDarkMode ? 'bg-[#080808] text-white font-sans' : 'bg-[#fcfdfc] text-gray-900'
      }`}
    >
      {/* 1. Global Navigation Header */}
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-[1920px] w-full mx-auto px-4 py-8 sm:px-6 lg:px-10 xl:px-14 flex flex-col gap-6">
        
        {/* Campaign Stats Overview Banner */}
        <div
          id="campaign-status-banner"
          className={`p-6 rounded-xl border relative overflow-hidden transition-all duration-300 ${
            isDarkMode
              ? 'bg-[#111111] border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
              : 'bg-white border-gray-200 shadow-sm'
          }`}
        >
          {/* Subtle background graphics */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-[#D4AF37]">
              <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
            </svg>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-extrabold">
                  CAMPAIGN REPORT MATRIX
                </span>
              </div>
              <h2 className="font-sans font-black text-2xl uppercase tracking-tight">
                PORTUGAL WORLD CUP ROADMAP
              </h2>
              <p className={`font-mono text-xs mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                STATUS: QUALIFIED FIRST IN GROUP • STANDING: DECLARED CO-FAVORITES
              </p>
            </div>

            {/* Simulated Live stats widgets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
              {[
                { label: 'WINS', val: '4 - 0', sub: 'UNBEATEN', icon: Flame, color: 'text-[#8B0D1E]' },
                { label: 'GOALS', val: '12', sub: '3.0 / MATCH', icon: Target, color: 'text-[#D4AF37]' },
                { label: 'CLEAN SHEETS', val: '3', sub: 'SOLID BACK', icon: Shield, color: 'text-[#004822]' },
                { label: 'OVR RANK', val: '#03', sub: 'FIFA WORLD', icon: Trophy, color: 'text-[#D4AF37]' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  onMouseEnter={handleStatHover}
                  className={`p-3.5 rounded-lg border font-mono transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-black/40 border-white/5 hover:border-[#D4AF37]/30'
                      : 'bg-gray-50 border-gray-200 hover:border-emerald-600/30'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-white/40">
                    <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                    <span className="text-[9px] uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <span className="text-xl font-black tracking-tight block leading-none">
                    {stat.val}
                  </span>
                  <span className="text-[8px] text-white/40 tracking-widest block mt-0.5">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Real-Time Simulators & Calendars Section (Two Column / Responsive Row) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Countdown Schedule (Left 5 Cols) */}
          <div className="lg:col-span-5">
            <MatchCountdown isDarkMode={isDarkMode} />
          </div>

          {/* Dynamic Tactical Sim Engine (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <LiveSimulator isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* 4. Complete Squad Hub Section */}
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-dashed border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="font-sans font-black text-2xl uppercase tracking-tight">
                  Squad Registry & Dossiers
                </h2>
              </div>
              <p className={`font-mono text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                SELECT UNITS TO LOAD FULL-SCALE TACTICAL DOSSIERS WITH INTEGRATED RADAR ANALYSIS
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-gray-500 bg-[#D4AF37]/5 border border-[#D4AF37]/10 px-3 py-1 rounded-md">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping" />
              <span>SQUAD SIZE: 26 CORE DOSSIER FILES</span>
            </div>
          </div>

          {/* Interactive Searchable Squad grid */}
          <SquadGrid isDarkMode={isDarkMode} />
        </div>

      </main>

      {/* 5. Noble FPF Inspired Footer */}
      <footer
        id="app-footer"
        className={`border-t py-8 mt-12 transition-colors duration-300 ${
          isDarkMode ? 'bg-[#080808] border-white/10 text-white/30' : 'bg-gray-100 border-gray-200 text-gray-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37]">●</span>
            <span>PORTUGAL WORLD CUP HUB • OFFICIAL WC DATA INTERFACE V2.026</span>
          </div>

          <p className="text-center md:text-right text-[11px] text-white/40">
            CRISTIANO RONALDO • BRUNO FERNANDES • BERNARDO SILVA • RÚBEN DIAS
            <br />
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]/60 font-bold">
              Federação Portuguesa de Futebol • Força Portugal
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
