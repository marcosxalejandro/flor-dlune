/** Shared helpers for mobile-safe YouTube background audio */

import type { CSSProperties } from 'react';

export const FLOR_DLUNE_PLAY_EVENT = 'flor-dlune-play-music';
export const FLOR_DLUNE_UNLOCK_EVENT = 'flor-dlune-unlock-audio';
export const FLOR_DLUNE_DOCK_SHOW = 'flor-dlune-dock-show';
export const FLOR_DLUNE_DOCK_HIDE = 'flor-dlune-dock-hide';

export const MOBILE_YT_MOUNT_ID = 'flor-mobile-yt-mount';

type YTPlayerLike = {
  loadVideoById: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  getPlayerState?: () => number;
};

let mobileYtPlayer: YTPlayerLike | null = null;
let pendingMobileVideoId: string | null = null;

export function isMobileBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && window.innerWidth < 1024)
  );
}

/** Desktop: keep iframe technically in DOM but not display:none (iOS rejects that). */
export const offscreenMediaStyle: CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '2px',
  height: '2px',
  opacity: 0.01,
  pointerEvents: 'none',
  zIndex: -1,
  border: 'none',
  overflow: 'hidden',
};

export function buildYoutubeEmbedUrl(videoId: string, autoplay = true): string {
  const origin =
    typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: '0',
    controls: '0',
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    enablejsapi: '1',
    fs: '0',
    iv_load_policy: '3',
  });
  if (origin) params.set('origin', origin);
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function registerMobileYtPlayer(player: YTPlayerLike | null): void {
  mobileYtPlayer = player;
  if (player && pendingMobileVideoId) {
    const videoId = pendingMobileVideoId;
    pendingMobileVideoId = null;
    player.loadVideoById(videoId);
    player.playVideo();
    window.dispatchEvent(
      new CustomEvent(FLOR_DLUNE_DOCK_SHOW, { detail: { videoId } })
    );
  }
}

/** Call synchronously inside a tap/click handler on mobile. */
export function playTrackNow(videoId: string): boolean {
  if (!videoId) return false;

  if (!isMobileBrowser()) {
    const iframe = document.getElementById('yt-music-frame') as HTMLIFrameElement | null;
    if (!iframe) return false;
    iframe.src = buildYoutubeEmbedUrl(videoId, true);
    return true;
  }

  if (!mobileYtPlayer) {
    pendingMobileVideoId = videoId;
    window.dispatchEvent(
      new CustomEvent(FLOR_DLUNE_DOCK_SHOW, { detail: { videoId } })
    );
    return true;
  }

  try {
    mobileYtPlayer.loadVideoById(videoId);
    mobileYtPlayer.playVideo();
    window.dispatchEvent(
      new CustomEvent(FLOR_DLUNE_DOCK_SHOW, { detail: { videoId } })
    );
    return true;
  } catch {
    return false;
  }
}

export function pauseTrackNow(): void {
  if (!isMobileBrowser()) return;
  try {
    mobileYtPlayer?.pauseVideo();
  } catch {
    /* ignore */
  }
}

export function stopTrackNow(): void {
  if (!isMobileBrowser()) return;
  try {
    mobileYtPlayer?.stopVideo();
    window.dispatchEvent(new CustomEvent(FLOR_DLUNE_DOCK_HIDE));
  } catch {
    /* ignore */
  }
}

export function loadYoutubeIframe(iframe: HTMLIFrameElement | null, videoId: string): boolean {
  if (!iframe || !videoId) return false;
  iframe.src = buildYoutubeEmbedUrl(videoId, true);
  return true;
}

export function stopYoutubeIframe(iframe: HTMLIFrameElement | null): void {
  if (!iframe) return;
  iframe.src = '';
}