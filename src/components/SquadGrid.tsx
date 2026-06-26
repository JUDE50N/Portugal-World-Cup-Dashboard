/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, SlidersHorizontal, Users, Sparkles, Trophy } from 'lucide-react';
import { Player } from '../types';
import { squadData } from '../data/squad';
import { audioEngine } from '../utils/audio';
import PlayerDossier from './PlayerDossier';

interface SquadGridProps {
  isDarkMode: boolean;
}

export default function SquadGrid({ isDarkMode }: SquadGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'>('All');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filters = [
    { label: 'ALL UNITS', value: 'All' },
    { label: 'GOALKEEPERS (GK)', value: 'Goalkeeper' },
    { label: 'DEFENDERS (DF)', value: 'Defender' },
    { label: 'MIDFIELDERS (MF)', value: 'Midfielder' },
    { label: 'FORWARDS (FW)', value: 'Forward' }
  ] as const;

  // Filter and search logic
  const filteredSquad = squadData.filter((player) => {
    const matchesFilter = activeFilter === 'All' || player.position === activeFilter;
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.number.toString().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const handleCardHover = () => {
    audioEngine.playHover();
  };

  const handleSelectPlayer = (player: Player) => {
    audioEngine.playClick();
    setSelectedPlayer(player);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filter HUD */}
      <div
        className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center justify-between transition-all duration-300 ${
          isDarkMode ? 'bg-[#111111] border-white/10' : 'bg-white border-gray-200 shadow-sm'
        }`}
      >
        {/* Left Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
          <input
            id="squad-search-input"
            type="text"
            placeholder="Search tactical unit name, number, club..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 rounded-lg border font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
              isDarkMode
                ? 'bg-black/40 border-white/10 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-[#8B0D1E] focus:ring-[#8B0D1E]'
            }`}
          />
        </div>

        {/* Filter buttons group */}
        <div className="flex flex-wrap gap-1.5 justify-center md:justify-end w-full md:w-auto">
          {filters.map((f) => (
            <button
              key={f.value}
              id={`btn-filter-${f.value}`}
              onClick={() => {
                audioEngine.playClick();
                setActiveFilter(f.value);
              }}
              className={`px-3 py-1.5 rounded-md font-mono text-[10px] font-bold tracking-widest transition-all uppercase ${
                activeFilter === f.value
                  ? isDarkMode
                    ? 'bg-[#8B0D1E] text-white border border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                    : 'bg-[#8B0D1E] text-white'
                  : isDarkMode
                    ? 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10 hover:text-white'
                    : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Player Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSquad.map((player) => (
          <div
            key={player.id}
            id={`player-card-${player.id}`}
            onMouseEnter={handleCardHover}
            onClick={() => handleSelectPlayer(player)}
            className={`group cursor-pointer rounded-xl border overflow-hidden relative transition-all duration-300 flex flex-col justify-between ${
              isDarkMode
                ? 'bg-[#111111] border-white/10 hover:border-[#D4AF37]/40 hover:shadow-[0_4px_25px_rgba(212,175,55,0.08)]'
                : 'bg-white border-gray-200 hover:border-[#8B0D1E]/50 hover:shadow-md'
            } transform hover:-translate-y-1`}
          >
            {/* Red & Green glow design lines representing Portugal */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#004822] via-[#D4AF37] to-[#8B0D1E] opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="p-4 flex flex-col gap-3">
              {/* Photo Frame Container */}
              <div className={`aspect-3/4 rounded-lg overflow-hidden border relative ${
                isDarkMode ? 'border-white/5 bg-black/40' : 'border-gray-100 bg-gray-50'
              }`}>
                {/* Number Overlay */}
                <span className="absolute top-2 right-2 bg-black/80 backdrop-blur-xs text-[#D4AF37] font-mono font-bold text-xs px-1.5 py-0.5 rounded-sm z-10 border border-white/10">
                  #{player.number}
                </span>

                {/* Rating Overlay */}
                <span className="absolute bottom-2 left-2 bg-[#D4AF37] text-black font-mono font-bold text-[10px] px-1 rounded-xs z-10">
                  OVR {player.rating}
                </span>

                <img
                  src={player.image}
                  alt={player.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                />
              </div>

              {/* Player description metadata */}
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#D4AF37] font-extrabold">
                  {player.position}
                </span>
                <h3 className="font-sans font-black text-sm tracking-tight text-white uppercase mt-0.5 group-hover:text-[#D4AF37] transition-colors">
                  {player.name}
                </h3>
                <span className={`font-mono text-[10px] block mt-0.5 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  {player.club}
                </span>
              </div>
            </div>

            {/* Minor Stats Bar HUD (Bottom of Card) */}
            <div className={`border-t px-4 py-2 font-mono text-[9px] flex justify-between tracking-tighter ${
              isDarkMode ? 'border-white/5 bg-black/20 text-white/50' : 'border-gray-100 bg-gray-50 text-gray-500'
            }`}>
              <span>PAC <b className="text-[#D4AF37]">{player.stats.pace}</b></span>
              <span>SHO <b className="text-[#D4AF37]">{player.stats.shooting}</b></span>
              <span>PAS <b className="text-[#D4AF37]">{player.stats.passing}</b></span>
              <span>DRI <b className="text-[#D4AF37]">{player.stats.dribbling}</b></span>
              <span>DEF <b className="text-[#D4AF37]">{player.stats.defending}</b></span>
              <span>PHY <b className="text-[#D4AF37]">{player.stats.physical}</b></span>
            </div>
          </div>
        ))}

        {filteredSquad.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <Users className="w-12 h-12 text-gray-600 mx-auto opacity-30 mb-2 animate-bounce" />
            <p className="font-mono text-xs text-gray-500">
              NO MATCHING TACTICAL UNITS REGISTERED ON THIS FREQUENCY.
            </p>
          </div>
        )}
      </div>

      {/* Full-Screen Detailed dossier overlay when selected */}
      {selectedPlayer && (
        <PlayerDossier
          player={selectedPlayer}
          isDarkMode={isDarkMode}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}
