'use client';

import { useEffect, useState } from 'react';
import { playFlorDluneMusic } from '@/components/MusicPlayerSimple';
import { FLOR_DLUNE_UNLOCK_EVENT } from '@/lib/youtube-audio';

const CONSENT_KEY = 'flor_dlune_music_consent';

interface MusicConsentProps {
  onConsent: () => void;
}

export default function MusicConsent({ onConsent }: MusicConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem(CONSENT_KEY);
    if (consented === 'true') {
      onConsent();
      return;
    }
    if (!consented) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [onConsent]);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setVisible(false);
    onConsent();
    window.dispatchEvent(new CustomEvent(FLOR_DLUNE_UNLOCK_EVENT));
    playFlorDluneMusic();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-md rounded-lg border border-white/20 bg-black/90 p-4 shadow-xl backdrop-blur-sm md:left-auto md:right-6">
      <p className="mb-3 text-sm text-white/80">
        This site plays ambient music. Tap OK to enable sound.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAccept}
          className="flex-1 touch-manipulation rounded border border-white/30 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/20 active:scale-95"
        >
          OK
        </button>
        <button
          type="button"
          onClick={handleDecline}
          className="flex-1 touch-manipulation rounded border border-white/10 px-4 py-3 text-sm text-white/60 transition hover:text-white/80 active:scale-95"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}