'use client';

import { useEffect, useRef, useState } from 'react';
import { SANTANA_FLOR_DLUNA } from '@/components/MusicPlayerSimple';
import {
  FLOR_DLUNE_DOCK_HIDE,
  FLOR_DLUNE_DOCK_SHOW,
  MOBILE_YT_MOUNT_ID,
  isMobileBrowser,
  registerMobileYtPlayer,
} from '@/lib/youtube-audio';

type YTPlayer = {
  loadVideoById: (videoId: string) => void;
  cueVideoById?: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          height?: string;
          width?: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function MobileAudioDock() {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('Now playing');
  const playerRef = useRef<YTPlayer | null>(null);
  const initStartedRef = useRef(false);

  useEffect(() => {
    setIsMobile(isMobileBrowser());
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const onShow = (event: Event) => {
      const videoId = (event as CustomEvent<{ videoId?: string }>).detail?.videoId;
      setVisible(true);
      if (videoId) setLabel('Now playing');
    };
    const onHide = () => setVisible(false);

    window.addEventListener(FLOR_DLUNE_DOCK_SHOW, onShow);
    window.addEventListener(FLOR_DLUNE_DOCK_HIDE, onHide);
    return () => {
      window.removeEventListener(FLOR_DLUNE_DOCK_SHOW, onShow);
      window.removeEventListener(FLOR_DLUNE_DOCK_HIDE, onHide);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || initStartedRef.current) return;
    initStartedRef.current = true;

    const initPlayer = () => {
      if (!window.YT?.Player || playerRef.current) return;

      playerRef.current = new window.YT.Player(MOBILE_YT_MOUNT_ID, {
        height: '64',
        width: String(Math.max(320, window.innerWidth)),
        playerVars: {
          autoplay: 0,
          controls: 1,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => {
            event.target.cueVideoById?.(SANTANA_FLOR_DLUNA);
            registerMobileYtPlayer(event.target);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
      return;
    }

    window.onYouTubeIframeAPIReady = initPlayer;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    return () => {
      registerMobileYtPlayer(null);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[96] overflow-hidden bg-black/95 transition-[max-height] duration-300 ${
        visible ? 'max-h-24 border-t border-white/15' : 'max-h-0 border-t-0 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <p className="px-3 pt-1.5 text-[9px] tracking-[2px] text-white/50 uppercase">{label}</p>
      {/* Player stays in the viewport (clipped) so iOS allows playback after tap */}
      <div id={MOBILE_YT_MOUNT_ID} className="h-16 w-full" />
    </div>
  );
}