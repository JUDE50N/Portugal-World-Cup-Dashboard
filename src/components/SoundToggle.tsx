/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export default function SoundToggle() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Sync state with audio engine
    setMuted(audioEngine.getIsMuted());
  }, []);

  const handleToggle = () => {
    const isMutedNow = audioEngine.toggleMute();
    setMuted(isMutedNow);
    if (!isMutedNow) {
      audioEngine.playClick();
    }
  };

  return (
    <button
      id="btn-sound-toggle"
      onClick={handleToggle}
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-md border font-mono text-xs transition-all duration-300 ${
        muted
          ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
      }`}
      title={muted ? 'Unmute tactical audio' : 'Mute tactical audio'}
    >
      <div className="relative flex items-center justify-center">
        {muted ? (
          <VolumeX className="w-4 h-4 animate-pulse" />
        ) : (
          <Volume2 className="w-4 h-4 animate-bounce" style={{ animationDuration: '2s' }} />
        )}
      </div>
      
      <span>
        {muted ? 'AUDIO: OFF' : 'AUDIO: ON'}
      </span>

      {!muted && (
        <span className="flex gap-0.5 items-end h-3">
          <span className="w-0.5 bg-emerald-400 animate-pulse h-1" />
          <span className="w-0.5 bg-emerald-400 animate-pulse h-2" style={{ animationDelay: '0.1s' }} />
          <span className="w-0.5 bg-emerald-400 animate-pulse h-3" style={{ animationDelay: '0.2s' }} />
        </span>
      )}
    </button>
  );
}
