'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, ExternalLink } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  spotifyUrl?: string;
  // Per-track artistic background + accent (key to matching curvesbyseanbrown.com/playlist feel)
  backgroundColor: string;
  accentColor: string;
  // Optional subtle secondary for depth/gradient
  secondaryColor?: string;
}

/**
 * Flor D'Lune — The Garden Playlist
 *
 * Immersive floating titles + rich color experience inspired by:
 * https://curvesbyseanbrown.com/playlist
 *
 * Real playlist: https://open.spotify.com/playlist/1jEH89wpHJAlu8aDj5uYKX
 *
 * Key behaviors:
 * - Titles elegantly float and drift across the screen
 * - Background is almost pure color (clean artsy early-2000s computer wallpaper / music visualizer aesthetic)
 * - Colors shift CONSISTENTLY over time (auto-cycles tracks every ~16s when idle) — not only on click
 * - Clicking any floating title instantly changes the color field with a smooth premium crossfade
 * - Very minimal texture/grain — focus is on beautiful shifting color fields
 *
 * This creates a living, screensaver-like artistic playlist experience.
 */

const FULL_PLAYLIST_URL =
  "https://open.spotify.com/playlist/1jEH89wpHJAlu8aDj5uYKX";

// Full artistic selection from the real "Flor D'Lune" playlist (user requested ALL songs)
// Each track has a carefully chosen mood color for the floating titles + background experience
// inspired by https://curvesbyseanbrown.com/playlist (titles drifting while bg colors shift)
const playlistTracks: Track[] = [
  { id: 1, title: "Flor d'Luna (Moonflower)", artist: "Santana", duration: "4:18", backgroundColor: "#1F2A48", accentColor: "#E8A0BF", secondaryColor: "#2A3658" },
  { id: 2, title: "I'm the Moon", artist: "Spooky Mansion", duration: "3:51", backgroundColor: "#1A2235", accentColor: "#A8B4C8", secondaryColor: "#252F48" },
  { id: 3, title: "Got Caught in Amsterdam", artist: "Arc De Soleil", duration: "3:42", backgroundColor: "#1E2F45", accentColor: "#D17A8F", secondaryColor: "#2A3D58" },
  { id: 4, title: "Agitations tropicales", artist: "L'Impératrice", duration: "4:05", backgroundColor: "#2C2218", accentColor: "#D4A84B", secondaryColor: "#3A2E22" },
  { id: 5, title: "Jarabi", artist: "Sona Jobarteh", duration: "5:28", backgroundColor: "#1C2A24", accentColor: "#7A9A8A", secondaryColor: "#273B34" },
  { id: 6, title: "Nightrider", artist: "Tom Misch, Yussef Dayes, Freddie Gibbs", duration: "4:33", backgroundColor: "#251B30", accentColor: "#E87BA3", secondaryColor: "#332743" },
  { id: 7, title: "Belong in the Sun", artist: "¿Téo?, Lido", duration: "3:29", backgroundColor: "#2C251A", accentColor: "#C9A25A", secondaryColor: "#3B3224" },
  { id: 8, title: "Club Bizarre", artist: "lene 3000", duration: "3:55", backgroundColor: "#2A1F35", accentColor: "#B48CD9", secondaryColor: "#392C4A" },
  { id: 9, title: "Pelota (Cut a Rug Mix)", artist: "Khruangbin, Quantic", duration: "3:18", backgroundColor: "#252E20", accentColor: "#9DB57A", secondaryColor: "#333E2B" },
  { id: 10, title: "Darling", artist: "Esbe", duration: "4:41", backgroundColor: "#2B2536", accentColor: "#C9A0C0", secondaryColor: "#3A3248" },
  { id: 11, title: "Soso", artist: "Kabusa Oriental Choir", duration: "3:08", backgroundColor: "#30281C", accentColor: "#E2C18A", secondaryColor: "#413626" },
  { id: 12, title: "Kongo (Hanî's remix)", artist: "Kolinga, HANÎ", duration: "4:12", backgroundColor: "#1F2A25", accentColor: "#6FA88A", secondaryColor: "#2B3A34" },
  { id: 13, title: "Assata's Reprise", artist: "Talib Kweli, Madlib, Jaimie Branch", duration: "3:47", backgroundColor: "#262032", accentColor: "#A38FCE", secondaryColor: "#332C44" },
  { id: 14, title: "Multi-Love", artist: "Unknown Mortal Orchestra", duration: "4:09", backgroundColor: "#2A252C", accentColor: "#D8A6B0", secondaryColor: "#38323C" },
  { id: 15, title: "Baby", artist: "Donnie & Joe Emerson", duration: "4:25", backgroundColor: "#2C2920", accentColor: "#C8B38A", secondaryColor: "#3B372B" },
  { id: 16, title: "Feel Your Weight (Poolside Remix)", artist: "Rhye, Poolside", duration: "4:51", backgroundColor: "#1E2935", accentColor: "#8FB8C8", secondaryColor: "#2A3748" },
  { id: 17, title: "Cerca De Ti", artist: "Hermanos Gutiérrez", duration: "3:39", backgroundColor: "#252B24", accentColor: "#A3B88A", secondaryColor: "#323A30" },
  { id: 18, title: "Villain (feat. Xodiak)", artist: "Johnny Rain, Xodiak", duration: "4:02", backgroundColor: "#292034", accentColor: "#B88CD4", secondaryColor: "#382D47" },
];

interface PlaylistSectionProps {
  immersive?: boolean; // When true: edge-to-edge canvas mode for homepage dominance
}

export default function PlaylistSection({ immersive = false }: PlaylistSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const currentTrack = playlistTracks[currentTrackIndex];
  const bgColor = currentTrack.backgroundColor;
  const accent = currentTrack.accentColor;
  const secondary = currentTrack.secondaryColor || '#111113';

  // === AUTO COLOR / TRACK CYCLING ===
  // The playlist colors shift consistently over time (like an old 2000s music visualizer / computer wallpaper),
  // not only when the user manually clicks.
  // After a period of inactivity, it gently auto-advances to the next track → new color field.
  const AUTO_ADVANCE_INTERVAL = 16000; // ~16 seconds feels calm and artsy
  const INTERACTION_COOLDOWN = 22000;   // after user interacts, wait longer before auto-advance resumes

  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteraction;

      if (timeSinceInteraction > INTERACTION_COOLDOWN) {
        // Auto advance using functional update — this prevents multiple intervals from stacking
        setCurrentTrackIndex(prev => (prev + 1) % playlistTracks.length);
        // Only changes the visual + background color, no audio
      }
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(interval);
  }, [lastInteraction]);  // Only re-setup interval when user interacts (resets the timer)

  // Helper to register any user interaction (clicks, buttons)
  const registerInteraction = () => {
    setLastInteraction(Date.now());
  };

  const togglePlay = () => {
    registerInteraction();
    setIsPlaying(!isPlaying);
    // TODO: Replace with real audio element or Spotify Web Playback SDK
  };

  const goToTrack = (index: number) => {
    if (index === currentTrackIndex) return;
    registerInteraction();
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const goPrev = () => {
    registerInteraction();
    const prev = (currentTrackIndex - 1 + playlistTracks.length) % playlistTracks.length;
    goToTrack(prev);
  };

  const goNext = () => {
    registerInteraction();
    const next = (currentTrackIndex + 1) % playlistTracks.length;
    goToTrack(next);
  };

  // Floating titles configuration
  // Each track gets a floating title with unique slow drifting animation.
  // Current track is large & prominent. Others are poetic, low-opacity layers.
  // Clicking any title changes the track → background color smoothly shifts.
  const floatingTitles = playlistTracks.map((track, index) => {
    const isCurrent = index === currentTrackIndex;

    // Deterministic but varied placement for organic scattered look
    const left = ((index * 37) % 78) + 8;   // 8% - 86%
    const top = ((index * 29) % 62) + 12;    // 12% - 74%

    // Different speeds and directions for beautiful drifting
    const duration = 22 + (index % 7) * 4;   // 22s to ~46s
    const xDrift = isCurrent ? [0, 18, -12, 0] : [0, 28 + (index % 3) * -8, -18, 0];
    const yDrift = isCurrent ? [0, -22, 14, 0] : [0, -32 + (index % 4) * 6, 24, 0];

    return {
      track,
      index,
      isCurrent,
      left: `${left}%`,
      top: `${top}%`,
      duration,
      xDrift,
      yDrift,
    };
  });

  const containerClasses = immersive 
    ? "relative w-full overflow-hidden bg-[#0A0A0F]" 
    : "relative w-full overflow-hidden rounded-3xl bg-[#0A0A0F]";

  const minHeight = immersive ? '720px' : '680px';

  return (
    <div className={containerClasses} style={{ minHeight }}>
      {/* 
        IMMERSIVE FLOATING TITLES EXPERIENCE
        Inspired by https://curvesbyseanbrown.com/playlist

        - All tracks from your real Flor D'Lune Spotify playlist
        - Titles elegantly drift/float across the screen
        - Background colors smoothly crossfade when you select any title
        - Click any floating title = that song becomes active + color changes
      */}

      {/* 
        PURE COLOR BACKGROUND — Artsy early 2000s computer wallpaper / music playlist aesthetic
        Clean rich color fields that continuously fade into each other.
      */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTrackIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1.0, 0.36, 1] }}
          style={{ backgroundColor: bgColor }}
        />
      </AnimatePresence>

      {/* Soft secondary color depth layer */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: secondary }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity: 0.38 }}
      />

      {/* 
        CONTINUOUS COLOR FADING 
        - Holds current color dominant for ~5 seconds (constant)
        - Then VERY SLOW, deliberate morph toward the next song's color (longer than before)
        - Repeats calmly. 
        Restarts cleanly on manual track change or auto-advance.
      */}
      {(() => {
        const nextIndex = (currentTrackIndex + 1) % playlistTracks.length;
        const nextColor = playlistTracks[nextIndex].backgroundColor;

        return (
          <motion.div
            key={currentTrackIndex}
            className="absolute inset-0"
            animate={{
              // ~5s hold at very low, then long slow rise, peak, long slow return
              opacity: [0.04, 0.04, 0.58, 0.58, 0.14, 0.04],
            }}
            transition={{
              duration: 58,                    // significantly slower cycle
              times: [0, 0.09, 0.32, 0.68, 0.82, 1],  // 5s hold → very slow morph in (over ~20s) → peak → slow fade back
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ backgroundColor: nextColor }}
          />
        );
      })()}

      {/* Very soft, large digital wallpaper-style gradients (retro computer feel) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.045)_0%,transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_78%,rgba(255,255,255,0.032)_0%,transparent_55%)]" />

      {/* Light edge vignette for better floating text contrast on brighter colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-transparent to-black/38" />

      {/* 
        SUBTLE FLOR D'LUNE DECORATIVE LAYER 
        - Cherry blossom tree from bottom-left (brand style)
        - Pink full moon top-right
        - 3 very faint UFOs
        All low opacity so they blend with the shifting color fields.
      */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {/* Cherry Blossom Tree - bottom left */}
        <svg 
          className="absolute bottom-0 left-[-8%] w-[42%] h-[55%] opacity-[0.18]"
          viewBox="0 0 400 320" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Trunk */}
          <path d="M95 310 Q88 240 102 175" stroke="#3A2A22" strokeWidth="11" strokeLinecap="round"/>
          {/* Main branches */}
          <path d="M102 175 Q70 130 45 95" stroke="#3A2A22" strokeWidth="7" strokeLinecap="round"/>
          <path d="M102 175 Q130 125 165 88" stroke="#3A2A22" strokeWidth="6" strokeLinecap="round"/>
          <path d="M102 175 Q115 145 95 110" stroke="#3A2A22" strokeWidth="5" strokeLinecap="round"/>
          {/* Blossoms - soft pink, brand aligned */}
          <circle cx="52" cy="98" r="6.5" fill="#E8A0BF" opacity="0.85"/>
          <circle cx="68" cy="82" r="5" fill="#E8A0BF" opacity="0.75"/>
          <circle cx="82" cy="105" r="7" fill="#E8A0BF" opacity="0.8"/>
          <circle cx="95" cy="72" r="4.5" fill="#E8A0BF" opacity="0.7"/>
          <circle cx="118" cy="92" r="6" fill="#E8A0BF" opacity="0.85"/>
          <circle cx="135" cy="78" r="5.5" fill="#E8A0BF" opacity="0.75"/>
          <circle cx="155" cy="95" r="4" fill="#E8A0BF" opacity="0.65"/>
          <circle cx="78" cy="125" r="5" fill="#E8A0BF" opacity="0.7"/>
          <circle cx="105" cy="138" r="6.5" fill="#E8A0BF" opacity="0.8"/>
          <circle cx="125" cy="115" r="4.5" fill="#E8A0BF" opacity="0.75"/>
          <circle cx="58" cy="145" r="3.5" fill="#E8A0BF" opacity="0.6"/>
          <circle cx="140" cy="135" r="5" fill="#E8A0BF" opacity="0.7"/>
        </svg>

        {/* Pink Full Moon - top right, very subtle */}
        <svg 
          className="absolute top-[8%] right-[6%] w-[18%] h-[18%] opacity-[0.22]"
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="moonGlow" cx="40%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#F8D6E8"/>
              <stop offset="55%" stopColor="#E8A0BF"/>
              <stop offset="100%" stopColor="#C75B8A" stopOpacity="0.3"/>
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="72" fill="url(#moonGlow)"/>
          {/* Very subtle surface details */}
          <circle cx="75" cy="85" r="14" fill="#C75B8A" opacity="0.15"/>
          <circle cx="115" cy="115" r="9" fill="#C75B8A" opacity="0.12"/>
        </svg>

        {/* 3 Subtle UFOs - upper right area */}
        <svg className="absolute top-[12%] right-[22%] w-8 h-5 opacity-[0.13]" viewBox="0 0 40 22" fill="none">
          <ellipse cx="20" cy="14" rx="18" ry="6" fill="#E8A0BF" opacity="0.6"/>
          <ellipse cx="20" cy="10" rx="7" ry="4" fill="#F8D6E8"/>
          <circle cx="12" cy="15" r="1.2" fill="#fff" opacity="0.7"/>
          <circle cx="20" cy="15" r="1.2" fill="#fff" opacity="0.7"/>
          <circle cx="28" cy="15" r="1.2" fill="#fff" opacity="0.7"/>
        </svg>

        <svg className="absolute top-[22%] right-[14%] w-7 h-4 opacity-[0.11]" viewBox="0 0 40 22" fill="none">
          <ellipse cx="20" cy="14" rx="16" ry="5" fill="#E8A0BF" opacity="0.55"/>
          <ellipse cx="20" cy="10" rx="6" ry="3.5" fill="#F8D6E8"/>
          <circle cx="13" cy="15" r="1" fill="#fff" opacity="0.6"/>
          <circle cx="20" cy="15" r="1" fill="#fff" opacity="0.6"/>
          <circle cx="27" cy="15" r="1" fill="#fff" opacity="0.6"/>
        </svg>

        <svg className="absolute top-[9%] right-[29%] w-6 h-3.5 opacity-[0.09]" viewBox="0 0 40 22" fill="none">
          <ellipse cx="20" cy="14" rx="14" ry="4.5" fill="#E8A0BF" opacity="0.5"/>
          <ellipse cx="20" cy="10.5" rx="5" ry="3" fill="#F8D6E8"/>
        </svg>
      </div>

      {/* === FLOATING TITLES LAYER === */}
      <div className="absolute inset-0 z-10">
        {floatingTitles.map((item) => {
          const { track, index, isCurrent, left, top, duration, xDrift, yDrift } = item;

          return (
            <motion.button
              key={track.id}
              onClick={() => goToTrack(index)}
              className="absolute select-none cursor-pointer focus:outline-none"
              style={{
                left,
                top,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: isCurrent ? 0.95 : 0.18 }}
              animate={{
                x: xDrift,
                y: yDrift,
                opacity: isCurrent ? [0.92, 1, 0.88, 0.95] : [0.12, 0.22, 0.15, 0.18],
                scale: isCurrent ? [1, 1.015, 0.995, 1] : 1,
              }}
              transition={{
                duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              whileHover={{ 
                opacity: isCurrent ? 1 : 0.55, 
                scale: isCurrent ? 1.03 : 1.08,
                transition: { duration: 0.2 } 
              }}
            >
              <div
                className={`font-display tracking-[-1.5px] leading-none transition-all duration-300 ${
                  isCurrent 
                    ? 'text-[42px] md:text-[58px] font-medium' 
                    : 'text-[17px] md:text-[21px]'
                }`}
                style={{
                  color: isCurrent ? '#F8F8F5' : accent,
                  textShadow: isCurrent 
                    ? '0 2px 20px rgba(0,0,0,0.6)' 
                    : '0 1px 12px rgba(0,0,0,0.7)',
                  opacity: isCurrent ? 1 : 0.75,
                }}
              >
                {track.title}
              </div>
              {isCurrent && (
                <div 
                  className="mt-1 text-sm tracking-[2px] uppercase"
                  style={{ color: accent, opacity: 0.8 }}
                >
                  {track.artist}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom control bar - hidden in immersive mode for full background experience */}
      {!immersive && (
        <div className="absolute bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/55 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            
            {/* Current info + controls */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition active:scale-[0.96]"
                style={{ backgroundColor: accent, color: '#0A0A0F' }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
              </button>

              <button onClick={goPrev} className="p-2 text-white/60 hover:text-white transition" aria-label="Previous">
                <SkipBack size={17} />
              </button>
              <button onClick={goNext} className="p-2 text-white/60 hover:text-white transition" aria-label="Next">
                <SkipForward size={17} />
              </button>

              <div className="ml-2 min-w-0">
                <div className="text-white text-[15px] font-medium tracking-[-0.2px] truncate">
                  {currentTrack.title}
                </div>
                <div className="text-white/50 text-xs truncate">{currentTrack.artist}</div>
              </div>
            </div>

            {/* Progress (visual) */}
            <div className="hidden md:block w-px h-6 bg-white/10 mx-2" />

            <div className="flex-1 max-w-md w-full">
              <div className="h-[1px] bg-white/10 rounded overflow-hidden">
                <motion.div
                  className="h-[1px] rounded"
                  animate={{ width: isPlaying ? '58%' : '0%' }}
                  transition={{ duration: 0.5 }}
                  style={{ backgroundColor: accent }}
                />
              </div>
            </div>

            <div className="font-mono text-[10px] text-white/40 tracking-widest tabular-nums w-12 text-right hidden md:block">
              {currentTrack.duration}
            </div>

            {/* Spotify */}
            <a
              href={FULL_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-[2px] text-white/70 hover:text-white border border-white/15 hover:border-white/40 px-4 py-2 rounded-full transition ml-auto md:ml-4"
            >
              FULL PLAYLIST <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}

      {/* Subtle Full Playlist link + minimal controls when in immersive mode */}
      {immersive && (
        <>
          {/* Minimal floating playback controls (bottom center, very subtle) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-5 pointer-events-auto">
            <button
              onClick={goPrev}
              className="p-2 text-white/40 hover:text-white/90 transition"
              aria-label="Previous"
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full flex items-center justify-center transition active:scale-[0.96]"
              style={{ backgroundColor: accent, color: '#0A0A0F' }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </button>

            <button
              onClick={goNext}
              className="p-2 text-white/40 hover:text-white/90 transition"
              aria-label="Next"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Subtle Full Playlist link (bottom right) */}
          <a
            href={FULL_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-8 right-8 z-50 text-xs tracking-[2.5px] text-white/25 hover:text-white/60 transition pointer-events-auto"
          >
            FULL PLAYLIST
          </a>
        </>
      )}

      {/* Subtle hint */}
      <div className="absolute top-6 right-6 z-40 text-[10px] tracking-[2.5px] text-white/30 pointer-events-none hidden lg:block">
        CLICK THE FLOATING TITLES
      </div>
    </div>
  );
}
