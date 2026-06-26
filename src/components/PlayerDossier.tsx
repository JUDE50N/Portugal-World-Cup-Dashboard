/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Shield, Award, Sparkles, Trophy, Activity, Dumbbell, Zap, 
  Target, Crosshair, Footprints, History, Calendar, Star, TrendingUp
} from 'lucide-react';
import { Player } from '../types';
import { audioEngine } from '../utils/audio';
import RadarChart from './RadarChart';

interface PlayerDossierProps {
  player: Player;
  isDarkMode: boolean;
  onClose: () => void;
}

type TabType = 'overview' | 'physical_tech' | 'trophy_cabinet' | 'career_stats';

export default function PlayerDossier({ player, isDarkMode, onClose }: PlayerDossierProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [typedBio, setTypedBio] = useState('');
  const [typedRole, setTypedRole] = useState('');
  const [showStats, setShowStats] = useState(false);
  
  const bioIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const roleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll modal overlay and window to top on player or tab changes (crucial for mobile/tablet)
    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [player, activeTab]);

  useEffect(() => {
    // Esc key listener to close dossier
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Play entry whoosh
    audioEngine.playWhoosh();
    
    // Start typing role first, then bio
    let currentRoleText = '';
    let roleIndex = 0;
    let roleStep = 0;
    const targetRoleText = player.tacticalRole;

    // Reset typing states on player change
    setTypedRole('');
    setTypedBio('');
    setShowStats(false);

    roleIntervalRef.current = setInterval(() => {
      if (roleIndex < targetRoleText.length) {
        roleStep++;
        const nextIndex = Math.min(Math.floor(roleStep * 1.5), targetRoleText.length);
        currentRoleText += targetRoleText.slice(roleIndex, nextIndex);
        setTypedRole(currentRoleText);
        if (roleStep % 2 === 0) {
          audioEngine.playType();
        }
        roleIndex = nextIndex;
      } else {
        if (roleIntervalRef.current) clearInterval(roleIntervalRef.current);
        
        // Start typing bio after role finishes
        let currentBioText = '';
        let bioIndex = 0;
        const targetBioText = player.bio;
        let bioStep = 0;

        bioIntervalRef.current = setInterval(() => {
          if (bioIndex < targetBioText.length) {
            bioStep++;
            const nextIndex = Math.min(Math.floor(bioStep * 1.5), targetBioText.length);
            currentBioText += targetBioText.slice(bioIndex, nextIndex);
            setTypedBio(currentBioText);
            if (bioStep % 2 === 0) {
              audioEngine.playType();
            }
            bioIndex = nextIndex;
          } else {
            if (bioIntervalRef.current) clearInterval(bioIntervalRef.current);
            setShowStats(true);
            audioEngine.playChime();
          }
        }, 12); // 12ms tick rate, highly efficient under load
      }
    }, 12);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (bioIntervalRef.current) clearInterval(bioIntervalRef.current);
      if (roleIntervalRef.current) clearInterval(roleIntervalRef.current);
    };
  }, [player]);

  const handleClose = () => {
    audioEngine.playClick();
    audioEngine.playWhoosh();
    onClose();
  };

  const handleTabChange = (tab: TabType) => {
    audioEngine.playClick();
    setActiveTab(tab);
  };

  // Render visual rating bar
  const renderProficiencyBar = (value: number, max = 100, color = 'bg-[#D4AF37]') => {
    const percentage = (value / max) * 100;
    return (
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className={`${color} h-full transition-all duration-1000 ease-out`}
          style={{ width: `${showStats ? percentage : 0}%` }}
        />
      </div>
    );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        id="player-dossier-modal"
        className={`w-full max-w-6xl rounded-2xl border relative overflow-hidden transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.85)] ${
          isDarkMode
            ? 'bg-[#111111] border-white/10 text-white'
            : 'bg-[#fafdfa] border-gray-300 text-gray-900'
        }`}
      >
        {/* Holographic Glowing Lines & Scanning Bar */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Neon Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />
          
          {/* Infinite Vertical Scanline Bar */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-25 animate-scan-line" />
        </div>

        {/* Modal Close Button */}
        <button
          id="btn-close-dossier"
          onClick={handleClose}
          className={`absolute top-4 right-4 z-20 p-2.5 rounded-full border transition-all duration-300 ${
            isDarkMode
              ? 'bg-white/5 border-white/10 text-[#D4AF37] hover:bg-white/10 hover:text-white'
              : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
          }`}
          title="Close Dossier (ESC)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 relative z-10">
          
          {/* LEFT COLUMN: Holographic Portrait Card & Tactical Profile (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className={`relative aspect-3/4 rounded-xl overflow-hidden border ${
              isDarkMode ? 'border-white/10 bg-black/40' : 'border-gray-300 bg-gray-100'
            }`}>
              {/* Image Frame HUD corner decorations */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37] z-10" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37] z-10" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37] z-10" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37] z-10" />

              {/* Real Player Image with futuristic sci-fi filter */}
              <img
                src={player.image}
                alt={player.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity hover:scale-105 hover:opacity-100 transition-all duration-500"
              />

              {/* Holographic Glowing Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Dual Rating Badges (FIFA Rating & Overall System Score) */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <div className="bg-[#D4AF37] text-black px-2.5 py-1 rounded font-mono font-black text-base shadow-lg flex flex-col items-center">
                  <span className="text-[9px] leading-none font-bold">RATING</span>
                  <span>{player.rating}</span>
                </div>
                <div className="bg-[#8B0D1E] text-white px-2.5 py-1 rounded font-mono font-black text-base shadow-lg flex flex-col items-center border border-[#D4AF37]/30">
                  <span className="text-[9px] leading-none font-bold">OVERALL</span>
                  <span>{player.overallScore105}<span className="text-[10px] opacity-75">/105</span></span>
                </div>
              </div>

              {/* Big Glowing Squad Number */}
              <div className="absolute bottom-4 right-4 text-7xl font-sans font-black tracking-tighter text-[#D4AF37]/20 select-none">
                #{player.number}
              </div>

              {/* Positional Label */}
              <div className="absolute bottom-4 left-4 bg-[#8B0D1E] border border-[#D4AF37]/30 text-white px-2.5 py-1 rounded font-mono font-bold text-xs uppercase tracking-widest">
                {player.position}
              </div>
            </div>

            {/* Core Registry HUD Details */}
            <div className={`p-4 rounded-xl border font-mono text-xs flex flex-col gap-2.5 ${
              isDarkMode ? 'bg-black/20 border-white/5 text-white/90' : 'bg-gray-100 border-gray-200 text-gray-800'
            }`}>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/40 font-semibold uppercase">Registry Name</span>
                <span className="font-extrabold text-right">{player.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/40 font-semibold uppercase">Current Guild</span>
                <span className="font-extrabold">{player.club}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/40 font-semibold uppercase">Biological Age</span>
                <span className="font-extrabold text-[#D4AF37]">{player.age} SOLAR YEARS</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/40 font-semibold uppercase">Physique Stature</span>
                <span className="font-extrabold">{player.height}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/40 font-semibold uppercase">Dominant Limb</span>
                <span className="font-extrabold text-emerald-400">{player.strongFoot} Foot</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 font-semibold uppercase">Internationals</span>
                <span className="font-extrabold text-[#D4AF37]">{player.caps} CAPS / {player.goals} GOALS</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Holographic Typewriter Bio & Video Game Stats (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              {/* Heading Title */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-white/5">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                    TACTICAL EVALUATION FILE • PORTUGAL COMBAT REGISTER
                  </span>
                  <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-white flex items-center gap-3">
                    {player.name}
                    {player.overallScore105 >= 95 && (
                      <Star className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37] animate-pulse" />
                    )}
                  </h2>
                </div>
                
                {/* Advanced Stats Tab Button Group */}
                <div className="flex overflow-x-auto gap-1 bg-black/40 p-1 rounded-lg border border-white/5 scrollbar-thin">
                  {[
                    { id: 'overview', label: 'OVERVIEW', icon: Sparkles },
                    { id: 'physical_tech', label: 'PHYSICAL / TECH', icon: Dumbbell },
                    { id: 'trophy_cabinet', label: 'TROPHIES', icon: Trophy },
                    { id: 'career_stats', label: 'CAREER', icon: History }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id as TabType)}
                        className={`px-3 py-1.5 rounded-md font-mono text-[10px] font-extrabold tracking-wider transition-all duration-300 flex items-center gap-1.5 flex-shrink-0 ${
                          activeTab === tab.id
                            ? 'bg-[#8B0D1E] text-white border border-[#D4AF37]/40 shadow-inner'
                            : 'text-white/50 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Typewritten Tactical Role Box */}
              {typedRole && (
                <div className="p-2.5 bg-[#8B0D1E]/10 border border-[#D4AF37]/30 rounded font-mono text-xs text-[#D4AF37] font-extrabold tracking-wide uppercase flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#8B0D1E] animate-pulse" />
                  {typedRole}
                </div>
              )}

              {/* Typewritten Bio Story */}
              <div className={`p-4 rounded-xl border font-mono text-xs leading-relaxed min-h-[90px] relative ${
                isDarkMode ? 'bg-[#080808] border-white/5 text-white/90' : 'bg-gray-950 border-gray-900 text-emerald-300'
              }`}>
                {/* Visual anchor brackets */}
                <span className="absolute top-2 left-2 text-[#D4AF37]/30 font-bold">[</span>
                <span className="absolute bottom-2 right-2 text-[#D4AF37]/30 font-bold">]</span>
                
                <p className="whitespace-pre-wrap">{typedBio || 'DECRYPTING TACTICAL INTEL...'}</p>
                {typedBio.length < player.bio.length && (
                  <span className="w-1.5 h-3.5 bg-[#D4AF37] inline-block ml-1 animate-ping" />
                )}
              </div>
            </div>

            {/* TAB CONTENT OVERLAYS */}
            <div className="flex-grow">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fade-in">
                  {/* Left: Tactical Radar Vector */}
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-black/10">
                    <span className="font-mono text-[10px] font-extrabold tracking-wider text-white/40 mb-2 uppercase">
                      Tactical Vector Mapping
                    </span>
                    <RadarChart stats={player.stats} isDarkMode={isDarkMode} />
                  </div>

                  {/* Right: Core 6 Hexagon Stats */}
                  <div className={`p-4 rounded-xl border flex flex-col gap-3.5 ${
                    isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                      <Award className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                        HEX-SECTOR DISPOSITION
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3 font-mono text-xs">
                      {[
                        { label: 'PACE', val: player.stats.pace, color: 'bg-[#8B0D1E]' },
                        { label: 'SHOOTING', val: player.stats.shooting, color: 'bg-[#D4AF37]' },
                        { label: 'PASSING', val: player.stats.passing, color: 'bg-[#004822]' },
                        { label: 'DRIBBLING', val: player.stats.dribbling, color: 'bg-amber-500' },
                        { label: 'DEFENDING', val: player.stats.defending, color: 'bg-purple-500' },
                        { label: 'PHYSICAL', val: player.stats.physical, color: 'bg-teal-500' }
                      ].map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold tracking-wider text-white/50">{stat.label}</span>
                            <span className="font-black text-[#D4AF37]">{stat.val}</span>
                          </div>
                          {renderProficiencyBar(stat.val, 100, stat.color)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PHYSICAL & TECHNICAL EXCELLENCE */}
              {activeTab === 'physical_tech' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  
                  {/* Left Column: Physics & Biometrics */}
                  <div className={`p-4 rounded-xl border flex flex-col gap-3.5 ${
                    isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                      <Zap className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                        BIOMETRIC KINETICS
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 font-mono text-xs">
                      <div className="p-3 bg-black/40 rounded border border-white/5">
                        <span className="text-white/40 block mb-1">ACCELERATION</span>
                        <span className="text-lg font-black text-white">{player.acceleration} <span className="text-[10px] text-white/40">/ 100</span></span>
                        {renderProficiencyBar(player.acceleration, 100, 'bg-amber-500')}
                      </div>
                      <div className="p-3 bg-black/40 rounded border border-white/5">
                        <span className="text-white/40 block mb-1">TOP VELOCITY</span>
                        <span className="text-lg font-black text-white">{player.speed} <span className="text-[10px] text-white/40">km/h</span></span>
                        {renderProficiencyBar(player.speed, 40, 'bg-red-500')}
                      </div>
                      <div className="p-3 bg-black/40 rounded border border-white/5">
                        <span className="text-white/40 block mb-1">MAX MUSCLE LIFT</span>
                        <span className="text-base font-black text-[#D4AF37] flex items-center gap-1">
                          <Dumbbell className="w-3.5 h-3.5 text-white/40" />
                          {player.maxLift}
                        </span>
                      </div>
                      <div className="p-3 bg-black/40 rounded border border-white/5">
                        <span className="text-white/40 block mb-1">WEAK FOOT RATE</span>
                        <span className="text-base font-black text-emerald-400">{player.weakFootUsage}</span>
                      </div>
                    </div>

                    {/* Goalkeeper special module if applicable */}
                    {player.position === 'Goalkeeper' && player.goalkeepingProficiency && (
                      <div className="mt-2 p-3 bg-blue-950/20 border border-blue-500/20 rounded">
                        <span className="text-blue-300 font-extrabold text-[10px] tracking-widest block mb-2">
                          GOALKEEPER FIREWALL DIAGNOSTICS
                        </span>
                        <div className="grid grid-cols-5 gap-2 font-mono text-[10px] text-center">
                          <div>
                            <span className="text-white/40 block">DIV</span>
                            <span className="font-black text-white text-sm">{player.goalkeepingProficiency.diving}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">REF</span>
                            <span className="font-black text-white text-sm">{player.goalkeepingProficiency.reflexes}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">HAN</span>
                            <span className="font-black text-white text-sm">{player.goalkeepingProficiency.handling}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">KIC</span>
                            <span className="font-black text-white text-sm">{player.goalkeepingProficiency.kicking}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">POS</span>
                            <span className="font-black text-white text-sm">{player.goalkeepingProficiency.positioning}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Ballistic Tech Diagnostics */}
                  <div className={`p-4 rounded-xl border flex flex-col gap-3.5 ${
                    isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                      <Target className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                        BALLISTIC BALL CONTROL
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3 font-mono text-xs">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white/50">SHOT DYNAMIC POWER</span>
                          <span className="font-black text-white">{player.shotPower}</span>
                        </div>
                        {renderProficiencyBar(player.shotPower, 100, 'bg-red-600')}
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white/50">CLINICAL FINISHING</span>
                          <span className="font-black text-white">{player.finishing}</span>
                        </div>
                        {renderProficiencyBar(player.finishing, 100, 'bg-amber-600')}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-1">
                        <div className="p-2.5 bg-black/40 rounded border border-white/5">
                          <span className="text-white/40 text-[10px] block mb-0.5">SHOT PRECISION</span>
                          <span className="text-base font-black text-white flex items-center gap-1.5">
                            <Crosshair className="w-3.5 h-3.5 text-red-500" />
                            {player.shotAccuracy}%
                          </span>
                        </div>
                        <div className="p-2.5 bg-black/40 rounded border border-white/5">
                          <span className="text-white/40 text-[10px] block mb-0.5">PASS PRECISION</span>
                          <span className="text-base font-black text-white flex items-center gap-1.5">
                            <Footprints className="w-3.5 h-3.5 text-emerald-500" />
                            {player.passingAccuracy}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TROPHY CABINET */}
              {activeTab === 'trophy_cabinet' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  
                  {/* Total Trophies Banner */}
                  <div className="md:col-span-3 p-4 bg-gradient-to-r from-[#8B0D1E]/20 to-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-between font-mono">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-8 h-8 text-[#D4AF37] animate-bounce" />
                      <div>
                        <span className="text-[10px] text-white/40 block tracking-widest uppercase">CONSOLIDATED HARDWARE ARCHIVE</span>
                        <span className="text-lg font-black text-white">TOTAL CAREER TROPHIES EARNED</span>
                      </div>
                    </div>
                    <div className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg text-2xl font-black shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      {player.totalTrophies}
                    </div>
                  </div>

                  {/* Club Trophies Cabinet */}
                  <div className="p-4 rounded-xl border border-white/5 bg-black/20 font-mono text-xs">
                    <span className="text-[#D4AF37] font-extrabold text-[10px] tracking-widest block mb-2 uppercase border-b border-white/5 pb-1">
                      CLUB HARDWARE
                    </span>
                    <ul className="flex flex-col gap-1.5 text-white/80">
                      {player.trophiesList.club.length > 0 ? (
                        player.trophiesList.club.map((trophy, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#8B0D1E] font-black">•</span>
                            <span>{trophy}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-white/30 italic">No club hardware archives found.</li>
                      )}
                    </ul>
                  </div>

                  {/* National Trophies Cabinet */}
                  <div className="p-4 rounded-xl border border-white/5 bg-black/20 font-mono text-xs">
                    <span className="text-emerald-400 font-extrabold text-[10px] tracking-widest block mb-2 uppercase border-b border-white/5 pb-1">
                      NATIONAL SHIELDS
                    </span>
                    <ul className="flex flex-col gap-1.5 text-white/80">
                      {player.trophiesList.national.length > 0 ? (
                        player.trophiesList.national.map((trophy, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-black">•</span>
                            <span>{trophy}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-white/30 italic">No national shields archived.</li>
                      )}
                    </ul>
                  </div>

                  {/* Individual Honors */}
                  <div className="p-4 rounded-xl border border-white/5 bg-black/20 font-mono text-xs">
                    <span className="text-amber-400 font-extrabold text-[10px] tracking-widest block mb-2 uppercase border-b border-white/5 pb-1">
                      INDIVIDUAL COMMENDATIONS
                    </span>
                    <ul className="flex flex-col gap-1.5 text-white/80">
                      {player.trophiesList.individual.length > 0 ? (
                        player.trophiesList.individual.map((trophy, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 font-black">•</span>
                            <span>{trophy}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-white/30 italic">No individual honors on ledger.</li>
                      )}
                    </ul>
                  </div>

                </div>
              )}

              {/* TAB 4: CAREER TIMELINE & SCORES */}
              {activeTab === 'career_stats' && (
                <div className="flex flex-col gap-5 animate-fade-in font-mono text-xs">
                  
                  {/* Career Scoreboard */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                      <span className="text-white/40 block mb-1">TOTAL WORLD CUP RECON (CAPS)</span>
                      <span className="text-2xl font-black text-[#D4AF37]">{player.caps}</span>
                    </div>
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                      <span className="text-white/40 block mb-1">CAREER COMBAT GOALS</span>
                      <span className="text-2xl font-black text-emerald-400">{player.careerGoals}</span>
                    </div>
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                      <span className="text-white/40 block mb-1">CAREER COMBAT ASSISTS</span>
                      <span className="text-2xl font-black text-blue-400">{player.careerAssists}</span>
                    </div>
                  </div>

                  {/* Career Timeline of Guilds */}
                  <div className="p-4 rounded-xl border border-white/5 bg-black/20">
                    <span className="text-white/40 uppercase font-extrabold text-[10px] tracking-wider block mb-3.5">
                      Guild Affiliation History & Timeline
                    </span>
                    <div className="flex items-center justify-start flex-wrap gap-2.5">
                      {player.clubsPlayedFor.map((clubName, index) => (
                        <React.Fragment key={clubName}>
                          <div className="px-3 py-1.5 bg-[#8B0D1E]/10 border border-[#8B0D1E]/30 text-white rounded font-bold">
                            {clubName}
                          </div>
                          {index < player.clubsPlayedFor.length - 1 && (
                            <span className="text-[#D4AF37] font-black animate-pulse font-mono">➔</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Special Skills Badge Row */}
            <div className="flex flex-col gap-2 font-mono text-xs">
              <span className="text-white/40 uppercase font-bold text-[9px] tracking-wider block">
                SPECIAL PLAYER ABILITIES & VECTOR CLIPS
              </span>
              <div className="flex flex-wrap gap-2">
                {player.specialSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#004822]/10 border border-[#004822]/40 text-emerald-400 font-bold flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Dossier Bottom Section */}
            <div className="flex flex-col gap-2 font-mono text-xs">
              <span className="text-white/40 uppercase font-bold text-[9px] tracking-wider block">
                COMBAT CREDENTIALS & NOTABLE MILESTONES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {player.achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded border flex items-center gap-2.5 ${
                      isDarkMode ? 'bg-black/10 border-white/5' : 'bg-gray-100 border-gray-200'
                    }`}
                  >
                    <Trophy className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span className="text-[10.5px] leading-normal truncate text-white/90">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Elegant Bottom Exit Button for Mobile and Tablet Accessibility */}
            <div className="mt-6 pt-6 border-t border-white/5 flex justify-end">
              <button
                id="btn-close-dossier-bottom"
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 bg-[#8B0D1E] hover:bg-[#a01025] active:bg-[#700a18] text-white font-mono text-xs font-bold tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(139,13,30,0.3)] hover:shadow-[0_4px_20px_rgba(139,13,30,0.5)] border border-[#D4AF37]/30"
              >
                <X className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#D4AF37]">EXIT STATS DISPLAY</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
