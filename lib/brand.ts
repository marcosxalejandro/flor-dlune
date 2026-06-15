/**
 * Flor D'Lune Official Brand Tokens
 * For the public website (immersive brand experience)
 * Adapted from Studio + official visual collection
 * Updated: Brown (#8B5E3C) replacing Gold in many contexts per latest vision
 */

export const colors = {
  // Core dark elegant palette (primary for public site)
  dark: {
    bg: '#0A0A0F',
    bgElevated: '#111113',
    text: '#F8F8F5',
    textMuted: '#A1A1AA',
    border: 'rgba(232, 160, 191, 0.15)',
    blossom: '#E8A0BF',
    neonRose: '#FF4D94',
    rose: '#C75B8A',
    cosmic: '#6B4C8A',
    aura: '#9B8EC4',
    // Brown replacing gold per Infrastructure Plan updates
    brown: '#8B5E3C',
    trunk: '#D4C5A9',
  },

  // Official light kit (for reference / exports)
  official: {
    cloud: '#F8F8F5',
    void: '#1C1C1C',
    blossom: '#E8A0BF',
    rose: '#C75B8A',
    cosmic: '#6B4C8A',
    aura: '#9B8EC4',
    gold: '#D4A84B',      // legacy
    brown: '#8B5E3C',     // new preferred
    trunk: '#D4C5A9',
    sand: '#D2B48C',
    leaf: '#1A5C2A',
    dusk: '#0038FF',
    divine: '#A8A8A8',
  }
} as const;

export const fonts = {
  display: 'var(--font-italiana, "Italiana", "Playfair Display", serif)',
  poetic: 'var(--font-cormorant, "Cormorant Garamond", "Playfair Display", serif)',
  sans: 'var(--font-geist-sans, "Raleway", system-ui, sans-serif)',
  mono: 'var(--font-geist-mono, ui-monospace, monospace)',
} as const;

export const spacing = {
  section: '6rem',
  card: '2.5rem',
} as const;

export type FlorColor = keyof typeof colors.dark;
