'use client';

import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, ExternalLink } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  spotifyUrl?: string;
}

// Placeholder playlist - will be replaced with real tracks from user references
const defaultPlaylist: Track[] = [
  { id: 1, title: "Moonlit Petals", artist: "Flor D'Lune", duration: "3:42", spotifyUrl: "https://open.spotify.com" },
  { id: 2, title: "Crater Lullaby", artist: "Flor D'Lune", duration: "4:15", spotifyUrl: "https://open.spotify.com" },
  { id: 3, title: "Amsterdam After Dark", artist: "Flor D'Lune", duration: "5:01", spotifyUrl: "https://open.spotify.com" },
  { id: 4, title: "Ritual Bloom", artist: "Flor D'Lune", duration: "3:58", spotifyUrl: "https://open.spotify.com" },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playlist] = useState(defaultPlaylist);

  const current = playlist[currentTrack];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // TODO: Connect real audio element or Spotify Web Playback SDK
  };

  const nextTrack = () => {
    setCurrentTrack((currentTrack + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((currentTrack - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="bg-[#111113] border border-[var(--flor-border)] rounded-2xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs tracking-[3px] text-[var(--flor-blossom)] mb-1">NOW PLAYING IN THE GARDEN</div>
          <div className="font-medium text-lg">{current.title}</div>
          <div className="text-sm text-[#A1A1AA]">{current.artist}</div>
        </div>
        <div className="text-right text-xs text-[#A1A1AA] font-mono">{current.duration}</div>
      </div>

      {/* Progress bar (visual only for demo) */}
      <div className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
        <div 
          className="h-1 bg-[var(--flor-blossom)] rounded-full transition-all" 
          style={{ width: isPlaying ? '65%' : '0%' }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button onClick={prevTrack} className="text-[#A1A1AA] hover:text-white transition">
          <SkipBack size={18} />
        </button>
        
        <button 
          onClick={togglePlay} 
          className="w-12 h-12 rounded-full bg-[var(--flor-blossom)] text-[#0A0A0F] flex items-center justify-center hover:bg-white transition"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>

        <button onClick={nextTrack} className="text-[#A1A1AA] hover:text-white transition">
          <SkipForward size={18} />
        </button>
      </div>

      {/* Spotify Integration */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
        <div className="text-[#A1A1AA]">Full experience on Spotify</div>
        <a 
          href={current.spotifyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[var(--flor-blossom)] hover:underline"
        >
          Open in Spotify <ExternalLink size={12} />
        </a>
      </div>

      <div className="mt-3 text-[10px] text-center text-[#666]">
        Background music continues while you browse the shop and explore
      </div>
    </div>
  );
}
