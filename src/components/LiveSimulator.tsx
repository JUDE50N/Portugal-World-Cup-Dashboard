/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { liveMatchCommentary } from '../data/matches';
import { MatchStats, Commentary } from '../types';
import { audioEngine } from '../utils/audio';

interface LiveSimulatorProps {
  isDarkMode: boolean;
}

// Fixed tactical coordinates of 11 players on a half/full pitch (from 0 to 100)
// Designed for defensive/offensive configurations
const portugalBaseTacticalPositions = [
  { name: 'Costa (GK)', x: 10, y: 50, role: 'GK' },
  { name: 'Dias (CB)', x: 28, y: 35, role: 'DF' },
  { name: 'Inácio (CB)', x: 28, y: 65, role: 'DF' },
  { name: 'Cancelo (RB)', x: 35, y: 15, role: 'DF' },
  { name: 'Mendes (LB)', x: 35, y: 85, role: 'DF' },
  { name: 'Palhinha (DM)', x: 48, y: 50, role: 'MF' },
  { name: 'Vitinha (CM)', x: 58, y: 32, role: 'MF' },
  { name: 'Fernandes (AM)', x: 68, y: 50, role: 'MF' },
  { name: 'Silva (RW)', x: 75, y: 20, role: 'FW' },
  { name: 'Leão (LW)', x: 75, y: 80, role: 'FW' },
  { name: 'Ronaldo (ST)', x: 86, y: 50, role: 'FW' }
];

const opponentBaseTacticalPositions = [
  { name: 'Keeper', x: 90, y: 50 },
  { name: 'Def 1', x: 72, y: 30 },
  { name: 'Def 2', x: 72, y: 70 },
  { name: 'Full RB', x: 65, y: 12 },
  { name: 'Full LB', x: 65, y: 88 },
  { name: 'Mid 1', x: 52, y: 40 },
  { name: 'Mid 2', x: 52, y: 60 },
  { name: 'Winger R', x: 42, y: 18 },
  { name: 'Winger L', x: 42, y: 82 },
  { name: 'Striker 1', x: 30, y: 42 },
  { name: 'Striker 2', x: 30, y: 58 }
];

export default function LiveSimulator({ isDarkMode }: LiveSimulatorProps) {
  // Sim Engine States
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 5 | 10>(5);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [commentaryFeed, setCommentaryFeed] = useState<Commentary[]>([liveMatchCommentary[0]]);
  
  // Tactical Dots Jitter State
  const [portugalPositions, setPortugalPositions] = useState(portugalBaseTacticalPositions);
  const [opponentPositions, setOpponentPositions] = useState(opponentBaseTacticalPositions);
  
  // Real-time match stats state
  const [stats, setStats] = useState<MatchStats>({
    possession: [50, 50],
    shots: [0, 0],
    shotsOnTarget: [0, 0],
    passes: [0, 0],
    passAccuracy: [85, 82],
    corners: [0, 0],
    fouls: [0, 0],
    xg: [0.0, 0.0]
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  // Handle simulation state updates, commentary additions and highlight events (goals/completion)
  useEffect(() => {
    if (currentMinute > 0 && isPlaying) {
      if (currentMinute >= 94) {
        setIsPlaying(false);
        audioEngine.playChime();
        return;
      }

      const matchedComm = liveMatchCommentary.find(c => c.minute === currentMinute);
      if (matchedComm) {
        setCommentaryFeed((prev) => [...prev, matchedComm]);

        // Highlights sound event
        if (matchedComm.type === 'goal') {
          audioEngine.playChime();
        }

        setStats((prevStats) => {
          const updated = { ...prevStats };
          if (matchedComm.type === 'goal') {
            updated.shots = [updated.shots[0] + 1, updated.shots[1]];
            updated.shotsOnTarget = [updated.shotsOnTarget[0] + 1, updated.shotsOnTarget[1]];
            updated.xg = [Number((updated.xg[0] + 0.75).toFixed(2)), updated.xg[1]];
          } else if (matchedComm.type === 'shot') {
            if (matchedComm.text.includes('Ronaldo') || matchedComm.text.includes('Bruno') || matchedComm.text.includes('Jota')) {
              updated.shots = [updated.shots[0] + 1, updated.shots[1]];
              const onTarget = Math.random() > 0.4;
              if (onTarget) updated.shotsOnTarget = [updated.shotsOnTarget[0] + 1, updated.shotsOnTarget[1]];
              updated.xg = [Number((updated.xg[0] + 0.15).toFixed(2)), updated.xg[1]];
            } else {
              updated.shots = [updated.shots[0], updated.shots[1] + 1];
              const onTarget = Math.random() > 0.5;
              if (onTarget) updated.shotsOnTarget = [updated.shotsOnTarget[0], updated.shotsOnTarget[1] + 1];
              updated.xg = [updated.xg[0], Number((updated.xg[1] + 0.12).toFixed(2))];
            }
          } else if (matchedComm.type === 'save') {
            if (matchedComm.text.includes('Costa')) {
              updated.shots = [updated.shots[0], updated.shots[1] + 1];
              updated.shotsOnTarget = [updated.shotsOnTarget[0], updated.shotsOnTarget[1] + 1];
            }
          } else if (matchedComm.type === 'card') {
            updated.fouls = [updated.fouls[0] + 1, updated.fouls[1]];
          } else if (matchedComm.type === 'foul') {
            if (matchedComm.text.includes('Nuno') || matchedComm.text.includes('Palhinha')) {
              updated.fouls = [updated.fouls[0], updated.fouls[1] + 1];
            } else {
              updated.fouls = [updated.fouls[0] + 1, updated.fouls[1]];
            }
          }
          return updated;
        });
      }
    }
  }, [currentMinute, isPlaying]);

  // Main tick simulator loop
  useEffect(() => {
    if (isPlaying) {
      // Speeds: 1x = 4000ms, 5x = 850ms, 10x = 350ms per match minute
      const intervalMs = speedMultiplier === 1 ? 4000 : speedMultiplier === 5 ? 850 : 350;

      timerRef.current = setInterval(() => {
        setCurrentMinute((prevMin) => {
          if (prevMin >= 94) {
            return 94;
          }
          const nextMin = prevMin + 1;

          // Randomize minor stats fluctuation per minute to feel alive
          setStats((prevStats) => {
            const possessionPort = Math.max(45, Math.min(68, prevStats.possession[0] + (Math.random() * 4 - 2)));
            const cornersPort = prevStats.corners[0] + (Math.random() > 0.93 ? 1 : 0);
            const cornersOpp = prevStats.corners[1] + (Math.random() > 0.96 ? 1 : 0);
            const passesPort = prevStats.passes[0] + Math.floor(Math.random() * 8 + 4);
            const passesOpp = prevStats.passes[1] + Math.floor(Math.random() * 6 + 3);

            return {
              ...prevStats,
              possession: [Number(possessionPort.toFixed(0)), Number((100 - possessionPort).toFixed(0))],
              corners: [cornersPort, cornersOpp],
              passes: [passesPort, passesOpp]
            };
          });

          // Add elegant dynamic 2D tactical dots movement
          setPortugalPositions((prev) =>
            prev.map((pos) => {
              const dx = (Math.random() * 3 - 1.5);
              const dy = (Math.random() * 3 - 1.5);
              return {
                ...pos,
                x: Math.max(5, Math.min(95, pos.x + dx)),
                y: Math.max(5, Math.min(95, pos.y + dy))
              };
            })
          );
          setOpponentPositions((prev) =>
            prev.map((pos) => {
              const dx = (Math.random() * 3 - 1.5);
              const dy = (Math.random() * 3 - 1.5);
              return {
                ...pos,
                x: Math.max(5, Math.min(95, pos.x + dx)),
                y: Math.max(5, Math.min(95, pos.y + dy))
              };
            })
          );

          return nextMin;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMultiplier]);

  const handleStartPause = () => {
    audioEngine.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (mult: 1 | 5 | 10) => {
    audioEngine.playClick();
    setSpeedMultiplier(mult);
  };

  const handleReset = () => {
    audioEngine.playClick();
    audioEngine.playWhoosh();
    setIsPlaying(false);
    setCurrentMinute(0);
    setCommentaryFeed([liveMatchCommentary[0]]);
    setStats({
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      passes: [0, 0],
      passAccuracy: [85, 82],
      corners: [0, 0],
      fouls: [0, 0],
      xg: [0.0, 0.0]
    });
    setPortugalPositions(portugalBaseTacticalPositions);
    setOpponentPositions(opponentBaseTacticalPositions);
  };

  return (
    <div
      id="live-stats-simulator"
      className={`p-6 rounded-xl border transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#111111] border-white/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-white border-gray-200 text-gray-900 shadow-sm'
      }`}
    >
      {/* HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-6 border-dashed border-white/10 gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          <h2 className="font-sans font-bold uppercase tracking-wider text-sm">
            Live Tactical Match Center & Radar
          </h2>
        </div>
        
        {/* Sim State Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-md font-mono text-xs text-[#D4AF37]">
            <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>MINUTE: {String(currentMinute).padStart(2, '0')}&apos;</span>
          </div>

          <div className="flex items-center gap-1 bg-[#8B0D1E]/10 border border-[#8B0D1E]/30 px-3 py-1 rounded-md font-mono text-xs text-[#D4AF37] font-bold">
            <span>SCORE: PT 2 - 0 OPP</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* 1. Tactical 2D Radar Field (Left / Main) */}
        <div className="xl:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                2D TACTICAL RADAR PITCH
              </span>
              <span className="font-mono text-[9px] text-[#00FF00] bg-[#00FF00]/10 px-1.5 py-0.5 rounded-sm">
                RADAR: STABLE
              </span>
            </div>

            {/* Simulated Canvas Field Container */}
            <div
              className={`aspect-video w-full rounded-xl border relative overflow-hidden flex items-center justify-center ${
                isDarkMode ? 'bg-[#080808] border-white/10' : 'bg-[#e2f1e8] border-gray-200'
              }`}
            >
              {/* Pitch Marking Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Grass subtle grid background for dark mode */}
                {isDarkMode && (
                  <defs>
                    <pattern id="pitchGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(212, 175, 55, 0.05)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                )}
                {isDarkMode && <rect width="100" height="100" fill="url(#pitchGrid)" />}

                {/* Boundary Box */}
                <rect x="2" y="2" width="96" height="96" fill="none" stroke={isDarkMode ? 'rgba(212, 175, 55, 0.15)' : 'rgba(4, 102, 47, 0.2)'} strokeWidth="1" />
                {/* Center Line */}
                <line x1="50" y1="2" x2="50" y2="98" stroke={isDarkMode ? 'rgba(212, 175, 55, 0.15)' : 'rgba(4, 102, 47, 0.2)'} strokeWidth="1" />
                {/* Center Circle */}
                <circle cx="50" cy="50" r="15" fill="none" stroke={isDarkMode ? 'rgba(212, 175, 55, 0.15)' : 'rgba(4, 102, 47, 0.2)'} strokeWidth="1" />
                {/* Penalty Areas */}
                <rect x="2" y="25" width="16" height="50" fill="none" stroke={isDarkMode ? 'rgba(212, 175, 55, 0.15)' : 'rgba(4, 102, 47, 0.2)'} strokeWidth="1" />
                <rect x="82" y="25" width="16" height="50" fill="none" stroke={isDarkMode ? 'rgba(212, 175, 55, 0.15)' : 'rgba(4, 102, 47, 0.2)'} strokeWidth="1" />
              </svg>

              {/* Portugal Players Dots (Crimson with gold glow) */}
              {portugalPositions.map((player, idx) => (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                  style={{ left: `${player.x}%`, top: `${player.y}%` }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-[#8B0D1E] rounded-full blur-[2px] opacity-60 group-hover:opacity-100 animate-pulse" />
                    <div className="w-3.5 h-3.5 bg-[#8B0D1E] border border-[#D4AF37] rounded-full flex items-center justify-center text-[7px] font-bold text-white relative z-10 cursor-pointer">
                      {player.role}
                    </div>
                    {/* Hover detail tooltip */}
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-5 bg-black/95 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[8px] px-1 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                      {player.name}
                    </span>
                  </div>
                </div>
              ))}

              {/* Opponent Players Dots (White with blue border) */}
              {opponentPositions.map((opp, idx) => (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                  style={{ left: `${opp.x}%`, top: `${opp.y}%` }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-blue-500 rounded-full blur-[1px] opacity-40" />
                    <div className="w-2.5 h-2.5 bg-[#111] border border-white/40 rounded-full relative z-10 cursor-pointer" />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-black/90 text-white font-mono text-[7px] px-0.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                      {opp.name}
                    </span>
                  </div>
                </div>
              ))}

              {/* Soccer Ball Dot */}
              <div
                className="absolute w-2 h-2 bg-[#D4AF37] border border-black rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-bounce relative z-10"
                style={{
                  left: `${currentMinute % 2 === 0 ? 68 + (currentMinute % 5) : 38 + (currentMinute % 10)}%`,
                  top: `${42 + (currentMinute % 7) * 3}%`,
                  animationDuration: '1s'
                }}
              />
            </div>
          </div>

          {/* Interactive Simulation Controls panel */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 p-3 bg-white/5 rounded-lg border border-dashed border-white/10">
            <div className="flex gap-2">
              <button
                id="btn-sim-play-pause"
                onClick={handleStartPause}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-md font-mono text-xs font-bold transition-all duration-300 ${
                  isPlaying
                    ? 'bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'bg-[#8B0D1E] hover:bg-[#8B0D1E]/90 text-white border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'PAUSE TACTICAL SIM' : 'EXECUTE LIVE SIM'}
              </button>

              <button
                id="btn-sim-reset"
                onClick={handleReset}
                className={`p-2 rounded-md border font-mono text-xs hover:bg-white/5 transition-all duration-300 ${
                  isDarkMode ? 'border-white/10 text-white/50' : 'border-gray-200 text-gray-600'
                }`}
                title="Reset Simulation Match State"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Speed selection hud */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-white/5">
              <span className="font-mono text-[9px] text-white/30 px-2 uppercase">SPEED</span>
              {([1, 5, 10] as const).map((mult) => (
                <button
                  key={mult}
                  id={`btn-sim-speed-${mult}`}
                  onClick={() => handleSpeedChange(mult)}
                  className={`px-2.5 py-1 rounded font-mono text-[10px] font-bold transition-all ${
                    speedMultiplier === mult
                      ? 'bg-[#D4AF37] text-black shadow-sm'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {mult}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Real-Time Stat Progress Bars (Center / 3 Columns) */}
        <div className="xl:col-span-3 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-3">
              LIVE MATRIX STATISTICS
            </span>

            <div className="flex flex-col gap-4">
              {/* Possession */}
              <div className="flex flex-col gap-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8B0D1E] font-bold">PORTUGAL {stats.possession[0]}%</span>
                  <span className="text-white/30">POSSESSION</span>
                  <span className="text-white/70">{stats.possession[1]}% OPP</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                  <div className="bg-[#8B0D1E] h-full transition-all duration-500" style={{ width: `${stats.possession[0]}%` }} />
                  <div className="bg-white/20 h-full transition-all duration-500 flex-1" />
                </div>
              </div>

              {/* xG Expected Goals */}
              <div className="flex flex-col gap-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#D4AF37] font-bold">{stats.xg[0]}</span>
                  <span className="text-white/30">EXPECTED GOALS (xG)</span>
                  <span className="text-white/70">{stats.xg[1]}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                  <div className="bg-[#D4AF37] h-full transition-all duration-500" style={{ width: `${Math.min(100, stats.xg[0] * 30)}%` }} />
                  <div className="w-1 bg-white/10" />
                  <div className="bg-white/40 h-full transition-all duration-500 flex-1" style={{ width: `${Math.min(100, stats.xg[1] * 30)}%` }} />
                </div>
              </div>

              {/* Shots / On Target */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs mt-1">
                <div className="p-2.5 rounded border border-white/5 bg-black/20">
                  <span className="text-white/30 text-[10px] block">TOTAL SHOTS (ON)</span>
                  <span className="text-lg font-bold text-[#8B0D1E]">{stats.shots[0]} <span className="text-xs font-normal text-white/30">({stats.shotsOnTarget[0]})</span></span>
                </div>
                <div className="p-2.5 rounded border border-white/5 bg-black/20 text-right">
                  <span className="text-white/30 text-[10px] block">OPP SHOTS (ON)</span>
                  <span className="text-lg font-bold text-white/50">{stats.shots[1]} <span className="text-xs font-normal text-white/30">({stats.shotsOnTarget[1]})</span></span>
                </div>
              </div>

              {/* Pinpoint Pass statistics */}
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <span className="text-white/30 text-[10px] uppercase">PASS ACCURACY & COUNT</span>
                <div className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span className="text-[#D4AF37] font-bold">{stats.passAccuracy[0]}% ({stats.passes[0]})</span>
                  <span className="text-white/30 text-[10px]">PT ACC / COUNT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 font-medium">{stats.passAccuracy[1]}% ({stats.passes[1]})</span>
                  <span className="text-white/30 text-[10px]">OPP ACC / COUNT</span>
                </div>
              </div>

              {/* Corners and Fouls Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-2 border border-white/5 rounded bg-black/10">
                  <span className="text-white/30 text-[10px] block uppercase">CORNERS</span>
                  <span className="font-semibold text-sm">PT {stats.corners[0]} - {stats.corners[1]} OPP</span>
                </div>
                <div className="p-2 border border-white/5 rounded bg-black/10">
                  <span className="text-white/30 text-[10px] block uppercase">FOULS CARDS</span>
                  <span className="font-semibold text-sm text-[#D4AF37]">PT {stats.fouls[0]} - {stats.fouls[1]} OPP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#8B0D1E]/10 rounded border border-[#8B0D1E]/30 flex gap-2.5 items-center mt-4">
            <ShieldAlert className="w-4 h-4 text-[#D4AF37] flex-shrink-0 animate-pulse" />
            <p className="font-mono text-[9px] text-white/60 leading-tight">
              TACTICAL ADVISORY: TACTICAL OVERRIDE DETECTED. DEFENSIVE LINES OPERATING UNDER EXTREME VIGILANCE.
            </p>
          </div>
        </div>

        {/* 3. Terminal Live Commentary scrolling feed (Right / 3 Columns) */}
        <div className="xl:col-span-3 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
              STADIUM TERMINAL COMMENTARY
            </span>
            <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-ping" />
          </div>

          {/* Scrolling shell body */}
          <div
            ref={terminalRef}
            className={`flex-1 h-[270px] xl:h-[310px] rounded-xl border p-4 font-mono text-[11px] overflow-y-auto flex flex-col-reverse gap-3 relative ${
              isDarkMode ? 'bg-black border-white/10 text-[#00FF00]' : 'bg-gray-900 border-gray-950 text-emerald-300'
            }`}
          >
            {commentaryFeed.slice().reverse().map((comm, idx) => {
              let tagColor = 'bg-white/5 text-white/40';
              if (comm.type === 'goal') tagColor = 'bg-[#D4AF37] text-black font-extrabold animate-bounce';
              else if (comm.type === 'card') tagColor = 'bg-[#8B0D1E] text-white font-bold';
              else if (comm.type === 'save') tagColor = 'bg-[#004822] text-[#D4AF37] border border-[#D4AF37]/30';
              else if (comm.type === 'shot') tagColor = 'bg-white/10 text-[#D4AF37]';

              return (
                <div
                  key={idx}
                  className="flex gap-2.5 border-b border-white/5 pb-2.5 last:border-0 leading-relaxed"
                >
                  <span className="text-[#D4AF37] font-bold flex-shrink-0">{comm.minute}&apos;</span>
                  <div className="flex flex-col gap-1">
                    <span className={`px-1.5 py-0.5 rounded-xs text-[8px] font-bold uppercase w-max tracking-wider ${tagColor}`}>
                      {comm.type}
                    </span>
                    <p className="text-white/80 font-medium">{comm.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
