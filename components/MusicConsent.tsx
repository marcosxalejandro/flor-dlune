'use client';

import React, { useState, useEffect } from 'react';
import { FLOR_DLUNE_PLAY_EVENT } from '@/components/MusicPlayerSimple';

interface MusicConsentProps {
  onConsent: () => void;
}

export default function MusicConsent({ onConsent }: MusicConsentProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('flor_dlune_music_consent');
    if (hasConsented) {
      onConsent();
      window.dispatchEvent(new CustomEvent(FLOR_DLUNE_PLAY_EVENT));
      return;
    }

    const timer = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(timer);
  }, [onConsent]);

  const handleAccept = () => {
    localStorage.setItem('flor_dlune_music_consent', 'true');
    setShow(false);
    onConsent();
    window.dispatchEvent(new CustomEvent(FLOR_DLUNE_PLAY_EVENT));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md">
      <div className="bg-[#111113] border border-white/10 rounded-2xl p-9 max-w-md mx-4 text-center">
        <div className="text-[#E8A0BF] text-xs tracking-[4px] mb-4">XAVIER&apos;S SCHOOL</div>
        
        <h3 className="font-display text-[26px] tracking-[-0.8px] leading-tight mb-6">
          Congrats! You are chosen as a <span className="text-[#E8A0BF]">Psychic Ninjetti</span><br />by Xavier&apos;s School for Gifted Youngsters.
        </h3>
        
        <p className="text-white/70 text-sm tracking-[1px] mb-9">Choose your attire.</p>

        <button
          onClick={handleAccept}
          className="px-12 py-4 rounded-full bg-white text-[#0A0A0F] text-sm tracking-[3.5px] hover:bg-[#E8A0BF] active:scale-[0.985] transition font-medium"
        >
          OK
        </button>

        <p className="mt-8 text-[10px] text-white/50 tracking-[2px]">
          Background music will play • Toggle anytime
        </p>
      </div>
    </div>
  );
}
