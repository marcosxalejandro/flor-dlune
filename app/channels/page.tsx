'use client';

import React, { useState, useEffect } from 'react';

const OWNER_UNLOCK_KEY = 'flor-dlune-channels-owner-unlock';
const isPubliclyRevealed = process.env.NEXT_PUBLIC_CHANNELS_PUBLIC === 'true';

const mainBrandChannel = {
  number: "00",
  name: "Flor D'Lune",
  type: "Core Brand – Official Main Channel",
  focus: "Clothing collections, cinematic brand films & commercials in 4K",
  style: "High-end cinematic 4K. Pink full moon, subtle UFOs, Amsterdamse Alps dreamscapes mixed with cultural elements from the city and the world",
  pr: "No",
  priority: "The heart of the brand. Primary visual voice and fashion storytelling"
};

const channels = [
  {
    number: "01",
    name: "Flor D'Lune Sports (Clean)",
    type: "Core",
    focus: "World Cup 2026 highlights, daily recaps, stats",
    style: "Pure faceless + full Flor D'Lune branding",
    pr: "No",
    priority: "Highest volume driver in Fase 1"
  },
  {
    number: "02",
    name: "Flor D'Lune Sports (Power Rangers)",
    type: "Core – FLAGSHIP",
    focus: "Match analysis & post-match talk in Game Story Mode",
    style: "Hyper-glossy realistic Power Rangers (helmets on, strong body language)",
    pr: "Yes (regular only)",
    priority: "Highest quality + brand differentiator"
  },
  {
    number: "03",
    name: "Flor D'Lune Unveiled",
    type: "Core",
    focus: "Emerald Tablets of Thoth + esoteric wisdom",
    style: "Ninjetti Power Rangers in astral / anime-achtige settings",
    pr: "Ninjetti allowed",
    priority: "Secondary in Fase 1"
  },
  {
    number: "04",
    name: "Flor D'Lune History",
    type: "Core",
    focus: "Historical events + psychological & spiritual analysis",
    style: "Cinematographic, serious observer mode",
    pr: "Flexible (Ninjetti or regular)",
    priority: "Secondary in Fase 1"
  },
  {
    number: "05",
    name: "Ruach Trismegistus",
    type: "Portfolio – Cashflow",
    focus: "Faceless content for quick revenue",
    style: "100% faceless. Only subtle branding in the last 3 seconds.",
    pr: "No",
    priority: "Dedicated cashflow channel"
  }
];

export default function ChannelsPage() {
  const [ownerUnlocked, setOwnerUnlocked] = useState(false);

  useEffect(() => {
    setOwnerUnlocked(localStorage.getItem(OWNER_UNLOCK_KEY) === 'true');
  }, []);

  const toggleOwnerView = () => {
    const next = !ownerUnlocked;
    localStorage.setItem(OWNER_UNLOCK_KEY, String(next));
    setOwnerUnlocked(next);
  };

  const showTacticalChannels = isPubliclyRevealed || ownerUnlocked;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F8F8F5]">
      {/* Visual header using the new Hourglass Temple image */}
      <section 
        className="relative h-[55dvh] md:h-[60dvh] flex items-center justify-center"
        style={{ backgroundImage: `url('/images/landing/flor-dlune-hourglass-temple.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div className="text-xs tracking-[4px] text-[#E8A0BF] mb-3">OFFICIAL YOUTUBE PRESENCE</div>
          <h1 className="font-display text-white text-6xl md:text-7xl tracking-[-2.5px]">Flor D'Lune Channels</h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-xl mx-auto">
            The official main brand channel + the 5 tactical channels from the <strong>Flor D’Lune Hybride Infrastructuur Plan – Fase 1</strong>
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-8 pt-12 pb-20">
        <div className="mt-10 mb-12">
          <button
            type="button"
            onClick={toggleOwnerView}
            className="text-xs tracking-[3px] text-[var(--flor-blossom)] mb-2 hover:text-white transition cursor-pointer"
            aria-label="Toggle private channel details"
          >
            THE ARCHIVE CONTINUES
          </button>
        </div>

        {/* Official Main Brand Channel - Prominent */}
        <div className="mb-10">
          <div className="text-xs tracking-[3px] text-[var(--flor-gold)] mb-3">CORE BRAND — THE HEART</div>
          <div className="border border-[var(--flor-blossom)] rounded-2xl p-9 bg-white/[0.015] hover:border-white/30 transition">
            <div className="flex items-center gap-4 mb-5">
              <div className="text-5xl font-display tracking-tighter text-[var(--flor-blossom)]">{mainBrandChannel.number}</div>
              <div>
                <div className="text-3xl font-medium">{mainBrandChannel.name}</div>
                <div className="text-sm text-[var(--flor-blossom)]">{mainBrandChannel.type}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 text-sm">
              <div>
                <div className="text-[#A1A1AA] text-xs tracking-widest mb-1.5">FOCUS</div>
                <div className="text-white/90">{mainBrandChannel.focus}</div>
              </div>
              <div>
                <div className="text-[#A1A1AA] text-xs tracking-widest mb-1.5">STYLE & AESTHETIC</div>
                <div className="text-white/90">{mainBrandChannel.style}</div>
              </div>
              <div>
                <div className="text-[#A1A1AA] text-xs tracking-widest mb-1.5">POWER RANGERS / NINJETTI</div>
                <div>{mainBrandChannel.pr}</div>
              </div>
              <div>
                <div className="text-[#A1A1AA] text-xs tracking-widest mb-1.5">ROLE</div>
                <div>{mainBrandChannel.priority}</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-sm text-white/70">
              4K cinematic clothing films, Amsterdamse Alps dreamscapes with pink full moon, subtle UFOs, cultural rituals from the city and the world, fashion campaigns and brand commercials.
            </div>
          </div>
        </div>

        {/* Fase 1 Tactical Channels — blurred for visitors until owner unlocks or public reveal */}
        <div className="relative">
          <div className="text-xs tracking-[3px] text-[var(--flor-blossom)] mb-4">FASE 1 TACTICAL CHANNELS</div>
          <div
            className={`space-y-6 transition-all duration-500 ${showTacticalChannels ? '' : 'blur-md select-none pointer-events-none'}`}
            aria-hidden={!showTacticalChannels}
          >
            {channels.map((ch, index) => (
              <div key={index} className="border border-white/10 rounded-2xl p-8 hover:border-[var(--flor-blossom)] transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-display tracking-tighter text-[var(--flor-blossom)]">{ch.number}</div>
                  <div>
                    <div className="text-2xl font-medium">{ch.name}</div>
                    <div className="text-sm text-[#A1A1AA]">{ch.type}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                  <div>
                    <div className="text-[#A1A1AA] text-xs tracking-widest mb-1">FOCUS</div>
                    <div>{ch.focus}</div>
                  </div>
                  <div>
                    <div className="text-[#A1A1AA] text-xs tracking-widest mb-1">STYLE</div>
                    <div>{ch.style}</div>
                  </div>
                  <div>
                    <div className="text-[#A1A1AA] text-xs tracking-widest mb-1">POWER RANGERS / NINJETTI</div>
                    <div>{ch.pr}</div>
                  </div>
                  <div>
                    <div className="text-[#A1A1AA] text-xs tracking-widest mb-1">PRIORITY IN FASE 1</div>
                    <div>{ch.priority}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!showTacticalChannels && (
            <div className="absolute inset-0 flex items-center justify-center pt-8">
              <p className="text-xs tracking-[3px] text-white/40 uppercase">Classified</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-xs text-[#666]">
          The Official Main Channel + all Fase 1 channels run through the Central Content Factory (Content Director + Visual Director).<br />
          Every clip requires human approval.
        </div>
      </div>
    </div>
  );
}