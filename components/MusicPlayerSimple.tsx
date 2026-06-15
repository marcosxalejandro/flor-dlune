'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  FLOR_DLUNE_PLAY_EVENT,
  FLOR_DLUNE_UNLOCK_EVENT,
  isMobileBrowser,
  offscreenMediaStyle,
  pauseTrackNow,
  playTrackNow,
  stopTrackNow,
} from '@/lib/youtube-audio';

/** Santana — Flor d'Luna (Moonflower) */
export const SANTANA_FLOR_DLUNA = 'ed7ErQwsBtM';

export { FLOR_DLUNE_PLAY_EVENT };

export function playFlorDluneMusic(): boolean {
  return playTrackNow(SANTANA_FLOR_DLUNA);
}

export default function MusicPlayerSimple() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileBrowser());
  }, []);

  const playMusic = useCallback(() => {
    if (playFlorDluneMusic()) {
      setIsPlaying(true);
      setAudioUnlocked(true);
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (isMobileBrowser()) {
      stopTrackNow();
    } else {
      const iframe = document.getElementById('yt-music-frame') as HTMLIFrameElement | null;
      if (iframe) iframe.src = '';
    }
    setIsPlaying(false);
  }, []);

  const toggleMusic = () => {
    if (!isPlaying) {
      playMusic();
    } else if (isMobileBrowser()) {
      pauseTrackNow();
      setIsPlaying(false);
    } else {
      stopMusic();
    }
  };

  useEffect(() => {
    const onPlay = () => playMusic();
    const onUnlock = () => setAudioUnlocked(true);
    window.addEventListener(FLOR_DLUNE_PLAY_EVENT, onPlay);
    window.addEventListener(FLOR_DLUNE_UNLOCK_EVENT, onUnlock);
    return () => {
      window.removeEventListener(FLOR_DLUNE_PLAY_EVENT, onPlay);
      window.removeEventListener(FLOR_DLUNE_UNLOCK_EVENT, onUnlock);
    };
  }, [playMusic]);

  return (
    <>
      {!isMobile && (
        <iframe
          id="yt-music-frame"
          title="Flor d'Luna background music"
          style={offscreenMediaStyle}
          allow="autoplay; encrypted-media; fullscreen"
        />
      )}

      <button
        type="button"
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-[90] min-h-[44px] touch-manipulation rounded-full border border-white/20 bg-black/60 px-5 py-2 text-xs tracking-[2.5px] transition hover:bg-white/10 active:bg-white/15"
        aria-pressed={isPlaying}
      >
        {isPlaying ? '♫ SOUND ON' : '♫ SOUND OFF'}
      </button>

      {isMobile && !isPlaying && !audioUnlocked && (
        <p className="pointer-events-none fixed top-[4.25rem] right-6 z-[90] max-w-[120px] text-right text-[9px] tracking-[1.5px] text-white/45">
          TAP FOR SOUND
        </p>
      )}
    </>
  );
}