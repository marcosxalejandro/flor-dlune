'use client';

import React, { useEffect, useState } from 'react';

export default function MusicPlayerSimple() {
  const [isPlaying, setIsPlaying] = useState(false);

  const SANTANA_FLOR_DLUNA = 'wbCM0VSdxdA';

  const playMusic = () => {
    const iframe = document.getElementById('yt-music-frame') as HTMLIFrameElement;
    if (!iframe) return;

    iframe.src = `https://www.youtube.com/embed/${SANTANA_FLOR_DLUNA}?autoplay=1&controls=0&modestbranding=1&rel=0`;
    setIsPlaying(true);
  };

  const stopMusic = () => {
    const iframe = document.getElementById('yt-music-frame') as HTMLIFrameElement;
    if (!iframe) return;

    iframe.src = '';
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      playMusic();
    } else {
      stopMusic();
    }
  };

  // Auto-play on site load
  useEffect(() => {
    // Small delay to allow page to settle
    const timer = setTimeout(() => {
      playMusic();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hidden YouTube iframe */}
      <iframe
        id="yt-music-frame"
        className="hidden"
        width="0"
        height="0"
        allow="autoplay"
      />

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-[90] px-5 py-2 rounded-full bg-black/60 border border-white/20 text-xs tracking-[2.5px] hover:bg-white/10 transition"
      >
        {isPlaying ? '♫ SOUND ON' : '♫ SOUND OFF'}
      </button>
    </>
  );
}
