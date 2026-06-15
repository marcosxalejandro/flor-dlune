# Flor D'Lune Official Website (Demo)

This is the current working version of the official Flor D'Lune public website.

## How to run it locally

1. Open this folder in your terminal:
   ```bash
   cd ~/Desktop/websites/flor-dlune-official-website
   ```

2. Install dependencies (first time only):
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open in your browser:
   http://localhost:3000

## Current Pages

- `/` → Main demo page (includes background music player + shop teaser + channels teaser)
- `/channels` → Overview of the 5 official Phase 1 YouTube channels according to the Infrastructure Plan

## What's inside

- `app/page.tsx` → Main artistic landing page with music + shopping experience
- `app/channels/page.tsx` → The 5 channels from the official plan
- `components/MusicPlayer.tsx` → The background music player component
- `lib/brand.ts` → Official Flor D'Lune brand tokens (colors, fonts, etc.)

## Notes

- This is still in active development.
- The background music is currently a demo playlist (real tracks + Spotify integration will come when you send assets).
- You can edit files directly here — changes will show live when the dev server is running.

## Related

The full monorepo (with agents, studio, etc.) is still at:
`/Users/xantana/flor-dlune-system/`

This `flor-dlune-official-website` folder is a clean, easy-to-access copy for you to view and work on the public site.
