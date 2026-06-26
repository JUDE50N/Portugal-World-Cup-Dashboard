/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Trophy, Clock, ListOrdered, Award } from 'lucide-react';
import { upcomingMatches } from '../data/matches';
import { Match } from '../types';
import { audioEngine } from '../utils/audio';

interface MatchCountdownProps {
  isDarkMode: boolean;
}

const groupTable = [
  { pos: 1, team: 'PORTUGAL', flag: '🇵🇹', mp: 3, w: 3, d: 0, l: 0, gf: 12, ga: 3, gd: 9, pts: 9, status: 'Qualified (Round of 16)' },
  { pos: 2, team: 'SPAIN', flag: '🇪🇸', mp: 3, w: 2, d: 0, l: 1, gf: 6, ga: 4, gd: 2, pts: 6, status: 'Qualified' },
  { pos: 3, team: 'TURKEY', flag: '🇹🇷', mp: 3, w: 1, d: 0, l: 2, gf: 4, ga: 7, gd: -3, pts: 3, status: 'Eliminated' },
  { pos: 4, team: 'GEORGIA', flag: '🇬🇪', mp: 3, w: 0, d: 0, l: 3, gf: 2, ga: 10, gd: -8, pts: 0, status: 'Eliminated' },
];

const playerWCAchievements = [
  { name: 'Cristiano Ronaldo', position: 'FW', goals: 4, assists: 1, motm: 2, rating: '9.2', note: 'Campaign Top Scorer, Penalty specialist' },
  { name: 'Bruno Fernandes', position: 'MF', goals: 2, assists: 3, motm: 1, rating: '8.8', note: 'Primary playmaker, Orchestrated 5 goals' },
  { name: 'Diogo Costa', position: 'GK', goals: 0, assists: 0, motm: 1, rating: '8.7', note: '3 Clean Sheets, 1 Penalty Save vs Spain' },
  { name: 'Diogo Jota', position: 'FW', goals: 2, assists: 1, motm: 0, rating: '8.4', note: 'Lethal match-winner vs Turkey' },
  { name: 'Rafael Leão', position: 'FW', goals: 1, assists: 2, motm: 0, rating: '8.5', note: 'Most dribbles completed (14)' },
  { name: 'Vitinha', position: 'MF', goals: 1, assists: 2, motm: 0, rating: '8.3', note: '94% Pass Accuracy in final third' },
  { name: 'Rúben Dias', position: 'DF', goals: 0, assists: 0, motm: 0, rating: '8.6', note: '12 tackles, 8 crucial blocks' },
];

export default function MatchCountdown({ isDarkMode }: MatchCountdownProps) {
  const [activeSubTab, setActiveSubTab] = useState<'countdown' | 'group' | 'achievements'>('countdown');
  const [selectedMatch, setSelectedMatch] = useState<Match>(upcomingMatches[0]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(selectedMatch.countdownTarget) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [selectedMatch]);

  const handleSelectMatch = (match: Match) => {
    if (match.id === selectedMatch.id) return;
    audioEngine.playClick();
    audioEngine.playWhoosh();
    setSelectedMatch(match);
  };

  const handleTabChange = (tab: 'countdown' | 'group' | 'achievements') => {
    audioEngine.playClick();
    setActiveSubTab(tab);
  };

  return (
    <div
      id="match-countdown-widget"
      className={`p-6 rounded-xl border transition-all duration-300 flex flex-col h-full ${
        isDarkMode
          ? 'bg-[#111111] border-white/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-white border-gray-200 text-gray-900 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-5 border-dashed border-white/10 gap-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="font-sans font-bold uppercase tracking-wider text-sm">
            Tournament HQ Dashboard
          </h2>
        </div>
        
        {/* Navigation Tab Toggles */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/30 border border-white/5 self-start sm:self-auto">
          <button
            onClick={() => handleTabChange('countdown')}
            className={`px-3 py-1 rounded-md text-[10px] font-mono tracking-wider transition-all duration-300 uppercase ${
              activeSubTab === 'countdown'
                ? 'bg-[#8B0D1E] text-white shadow-md'
                : 'text-white/50 hover:text-white'
            }`}
          >
            Matches
          </button>
          <button
            onClick={() => handleTabChange('group')}
            className={`px-3 py-1 rounded-md text-[10px] font-mono tracking-wider transition-all duration-300 uppercase flex items-center gap-1 ${
              activeSubTab === 'group'
                ? 'bg-[#8B0D1E] text-white shadow-md'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <ListOrdered className="w-3 h-3" />
            Standings
          </button>
          <button
            onClick={() => handleTabChange('achievements')}
            className={`px-3 py-1 rounded-md text-[10px] font-mono tracking-wider transition-all duration-300 uppercase flex items-center gap-1 ${
              activeSubTab === 'achievements'
                ? 'bg-[#8B0D1E] text-white shadow-md'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Award className="w-3 h-3" />
            Achievers
          </button>
        </div>
      </div>

      {/* Tab 1: Match Schedule & Countdown */}
      {activeSubTab === 'countdown' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* Match Selector List (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-1">
              SELECT ENCOUNTER MATRIX
            </p>
            {upcomingMatches.map((match) => {
              const isSelected = match.id === selectedMatch.id;
              return (
                <button
                  key={match.id}
                  id={`btn-match-select-${match.id}`}
                  onClick={() => handleSelectMatch(match)}
                  className={`w-full text-left p-3.5 rounded-lg border font-mono text-xs transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-[#8B0D1E]/10 border-[#D4AF37]/50 text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                        : 'bg-red-50 border-[#8B0D1E] text-red-900 font-semibold'
                      : isDarkMode
                        ? 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/25'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl leading-none">{match.opponentFlag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm tracking-tight">PORTUGAL</span>
                        <span className="text-white/30">vs</span>
                        <span className="font-bold text-sm tracking-tight uppercase">{match.opponentShort}</span>
                      </div>
                      <span className="text-[10px] text-white/40 block mt-0.5">{match.stage}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col gap-0.5">
                    <span className="font-semibold text-[10px]">{match.date}</span>
                    <span className="text-[9px] text-white/40">{match.time}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Countdown Active Panel (Right) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Selected Match Details Card */}
            <div
              className={`p-4 rounded-lg border flex flex-col gap-3 relative overflow-hidden ${
                isDarkMode ? 'bg-[#080808] border-white/5' : 'bg-gray-50 border-gray-200'
              }`}
            >
              {/* Background design lines */}
              <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-[#D4AF37]/10 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-[#D4AF37]/10 rounded-bl-lg pointer-events-none" />

              {/* Teams Faceoff Banner */}
              <div className="flex items-center justify-around py-2">
                {/* Portugal */}
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#8B0D1E] border border-[#D4AF37]/30 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                    🇵🇹
                  </div>
                  <span className="font-sans font-extrabold text-sm tracking-wide">PORTUGAL</span>
                </div>

                {/* VERSUS HUD INDICATOR */}
                <div className="flex flex-col items-center">
                  <div className="font-mono text-xs text-[#D4AF37] font-bold bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
                    VS
                  </div>
                  <span className="font-mono text-[9px] text-white/30 mt-1 uppercase tracking-wider">
                    UPLINK ACTIVE
                  </span>
                </div>

                {/* Opponent */}
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                    {selectedMatch.opponentFlag}
                  </div>
                  <span className="font-sans font-extrabold text-sm tracking-wide uppercase">
                    {selectedMatch.opponent}
                  </span>
                </div>
              </div>

              {/* Stadium & Schedule Meta details */}
              <div className="grid grid-cols-2 gap-3 mt-1 font-mono text-[10px] text-white/40">
                <div className="flex items-center gap-2 border-r border-white/10 pr-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="truncate">{selectedMatch.venue}</span>
                </div>
                <div className="flex items-center gap-2 pl-2">
                  <Calendar className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="truncate">{selectedMatch.date} • {selectedMatch.time}</span>
                </div>
              </div>
            </div>

            {/* Massive Cyber-grid Countdown Timer Numbers */}
            <div className="mt-5 grid grid-cols-4 gap-1.5 xs:gap-2">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINS', val: timeLeft.minutes },
                { label: 'SECS', val: timeLeft.seconds }
              ].map((unit) => (
                <div
                  key={unit.label}
                  className={`p-1.5 xs:p-2.5 sm:p-3 rounded-lg border flex flex-col items-center justify-center relative overflow-hidden ${
                    isDarkMode
                      ? 'bg-black/30 border-white/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]'
                      : 'bg-gray-100 border-gray-200'
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent opacity-40" />
                  
                  <span className="font-mono font-extrabold text-lg xs:text-xl sm:text-2xl md:text-3xl tabular-nums tracking-wide text-[#D4AF37]">
                    {timeLeft.isOver ? '00' : String(unit.val).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[7px] xs:text-[8px] sm:text-[9px] tracking-wide text-white/40 mt-1 uppercase">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            {timeLeft.isOver && (
              <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center text-amber-400 font-mono text-xs animate-pulse">
                ⚠️ TARGET COMMENCEMENT INITIATED: ENCOUNTER IS UNDERWAY
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Group F Standings Table */}
      {activeSubTab === 'group' && (
        <div className="flex-1 flex flex-col gap-4 animate-fade-in">
          <div>
            <h3 className="font-mono text-xs uppercase text-[#D4AF37] tracking-wider mb-1">Group Stage Standings • Group F</h3>
            <p className="text-[11px] text-white/50 font-mono">Real-time table position matrix based on completed fixtures</p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-white/5">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white/40 text-[10px]">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">TEAM</th>
                  <th className="py-2.5 px-2 text-center">MP</th>
                  <th className="py-2.5 px-2 text-center">W</th>
                  <th className="py-2.5 px-2 text-center">D</th>
                  <th className="py-2.5 px-2 text-center">L</th>
                  <th className="py-2.5 px-2 text-center">GF:GA</th>
                  <th className="py-2.5 px-2 text-center">GD</th>
                  <th className="py-2.5 px-3 text-right">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {groupTable.map((row) => {
                  const isPortugal = row.team === 'PORTUGAL';
                  return (
                    <tr
                      key={row.team}
                      className={`transition-colors hover:bg-white/5 ${
                        isPortugal ? 'bg-[#8B0D1E]/15 text-white font-bold' : 'text-white/80'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <span className={`inline-flex w-5 h-5 items-center justify-center rounded text-[10px] font-bold ${
                          row.pos <= 2 ? 'bg-[#004822] text-white' : 'bg-white/5 text-white/40'
                        }`}>
                          {row.pos}
                        </span>
                      </td>
                      <td className="py-3 px-3 flex items-center gap-2">
                        <span className="text-lg leading-none">{row.flag}</span>
                        <div>
                          <span>{row.team}</span>
                          {isPortugal && (
                            <span className="ml-1.5 px-1 py-0.5 rounded-[4px] bg-[#D4AF37] text-black font-extrabold text-[8px] tracking-wide uppercase">
                              QUALIFIED
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">{row.mp}</td>
                      <td className="py-3 px-2 text-center">{row.w}</td>
                      <td className="py-3 px-2 text-center">{row.d}</td>
                      <td className="py-3 px-2 text-center">{row.l}</td>
                      <td className="py-3 px-2 text-center text-white/50">{row.gf}:{row.ga}</td>
                      <td className="py-3 px-2 text-center text-[#D4AF37]">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                      <td className="py-3 px-3 text-right text-[#D4AF37] font-bold">{row.pts}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex gap-2.5 items-start mt-auto">
            <span className="text-sm leading-none mt-0.5">🏆</span>
            <div className="font-mono text-[10px] text-white/50 leading-relaxed">
              <span className="text-white font-bold block uppercase mb-0.5">PORTUGUESE DOMINANCE</span>
              Portugal secures the <span className="text-[#D4AF37] font-semibold">#1 position</span> in the group stages with a perfect 3-game clean sweep, qualifying with absolute tactical superiority for the knockout stages.
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'achievements' && (
        <div className="flex-1 flex flex-col gap-3 animate-fade-in overflow-hidden">
          <div>
            <h3 className="font-mono text-xs uppercase text-[#D4AF37] tracking-wider mb-1">Squad Tournament Achievers</h3>
            <p className="text-[11px] text-white/50 font-mono">Current World Cup 2026 stats & accolades of key squad players</p>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[290px] pr-1.5 flex flex-col gap-2.5 scrollbar-thin">
            {playerWCAchievements.map((player) => (
              <div
                key={player.name}
                className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start justify-between hover:bg-white/10 transition-all duration-300 gap-4"
              >
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs truncate">{player.name}</span>
                    <span className="px-1.5 py-0.5 rounded-[4px] bg-[#8B0D1E]/45 border border-white/10 text-[8px] font-mono font-bold text-[#D4AF37] uppercase">
                      {player.position}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-white/40 leading-snug">{player.note}</p>
                </div>

                <div className="flex items-center gap-4 text-right flex-shrink-0">
                  <div className="flex items-center gap-2.5">
                    {player.goals > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="font-mono font-extrabold text-sm text-[#D4AF37]">{player.goals}</span>
                        <span className="text-[8px] text-white/40 font-mono">G</span>
                      </div>
                    )}
                    {player.assists > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="font-mono font-bold text-sm text-white/80">{player.assists}</span>
                        <span className="text-[8px] text-white/40 font-mono">A</span>
                      </div>
                    )}
                    {player.motm > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="font-mono font-bold text-sm text-[#D4AF37]">{player.motm}★</span>
                        <span className="text-[8px] text-white/40 font-mono">MOTM</span>
                      </div>
                    )}
                  </div>
                  <div className="border-l border-white/10 pl-3 flex flex-col items-center justify-center">
                    <span className="font-mono font-extrabold text-[#00FF00] text-sm">{player.rating}</span>
                    <span className="text-[8px] text-white/40 font-mono">RATING</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
