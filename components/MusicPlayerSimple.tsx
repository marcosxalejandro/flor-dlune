'use client';

import { useCallback, useEffect, useState } from 'react';

/** Santana — Flor d'Luna (Moonflower) */
const SANTANA_FLOR_DLUNA = 'ed7ErQwsBtM';

export const FLOR_DLUNE_PLAY_EVENT = 'flor-dlune-play-music';

export function playFlorDluneMusic() {
  const iframe = document.getElementById('yt-music-frame') as HTMLIFrameElement | null;
  if (!iframe) return false;

  iframe.src = `https://www.youtube.com/embed/${SANTANA_FLOR_DLUNA}?autoplay=1&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;
  return true;
}

export default function MusicPlayerSimple() {
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = useCallback(() => {
    if (playFlorDluneMusic()) {
      setIsPlaying(true);
    }
  }, []);

  const stopMusic = useCallback(() => {
    const iframe = document.getElementById('yt-music-frame') as HTMLIFrameElement | null;
    if (!iframe) return;

    iframe.src = '';
    setIsPlaying(false);
  }, []);

  const toggleMusic = () => {
    if (!isPlaying) {
      playMusic();
    } else {
      stopMusic();
    }
  };

  useEffect(() => {
    const onPlay = () => playMusic();
    window.addEventListener(FLOR_DLUNE_PLAY_EVENT, onPlay);
    return () => window.removeEventListener(FLOR_DLUNE_PLAY_EVENT, onPlay);
  }, [playMusic]);

  return (
    <>
      <iframe
        id="yt-music-frame"
        title="Flor d'Luna background music"
        className="hidden"
        width="0"
        height="0"
        allow="autoplay; encrypted-media"
      />

      <button
        type="button"
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-[90] px-5 py-2 rounded-full bg-black/60 border border-white/20 text-xs tracking-[2.5px] hover:bg-white/10 transition"
      >
        {isPlaying ? '♫ SOUND ON' : '♫ SOUND OFF'}
      </button>
    </>
  );
}