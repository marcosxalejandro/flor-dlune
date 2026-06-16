'use client';

import React, { useState } from 'react';
import MusicConsent from '@/components/MusicConsent';
import MobileAudioDock from '@/components/MobileAudioDock';
import MusicPlayerSimple from '@/components/MusicPlayerSimple';
import CosmicHero3D from '@/components/CosmicHero3D';
import PlaylistSection from '@/components/PlaylistSection';

export default function FlorDLuneLanding() {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const handleConsent = () => setMusicEnabled(true);
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F8F8F5] overflow-x-hidden">
      <MusicPlayerSimple />
      <MobileAudioDock />
      <MusicConsent onConsent={handleConsent} />
      {/* NEW MAIN ENTRY POINT — Choice between two worlds */}
      <section 
        id="home"
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
        style={{
          backgroundImage: `url('/images/landing/flor-dlune-story-channels.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/62" />

        <div className="relative z-10 max-w-[820px]">
          <div className="font-display text-white text-[82px] md:text-[108px] tracking-[16px] md:tracking-[22px] leading-[0.9] mb-2">
            FLOR D&apos;LUNE
          </div>
          <div className="text-white/55 text-sm tracking-[5px] mb-12">-AMSTERDAM-</div>

          <p className="font-handwritten text-white text-4xl md:text-[52px] leading-[1.25] max-w-[520px] mx-auto mb-14 font-medium">
            Amsterdam Based<br />
            Outta This World<br />
            Globally Yours
          </p>

          {/* The two paths */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#abstract" 
              className="px-10 py-4 rounded-full border border-white/75 hover:bg-white hover:text-[#111] transition text-sm tracking-[2.5px]"
            >
              ENTER
            </a>
            <a 
              href="#garden-3d" 
              className="px-10 py-4 rounded-full bg-white text-[#0A0A0F] hover:bg-[#E8A0BF] transition text-sm tracking-[2.5px] font-medium"
            >
              ENTER 3D
            </a>
          </div>

          <div className="mt-14 text-white/40 text-xs tracking-[4px]">SCROLL TO BEGIN</div>
        </div>
      </section>

      {/* ABSTRACT AMBIANCE — Cinematic vertical experience */}
      <div id="abstract">

        {/* The Garden Remembers */}
        <section 
          className="relative h-[100dvh] flex items-center justify-center"
          style={{ backgroundImage: `url('/images/landing/07-park.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center px-6">
            <div className="text-[#E8A0BF] text-xs tracking-[5px] mb-2">CAPSULE:01</div>
            <h2 className="font-display text-white text-6xl md:text-7xl tracking-[-2.5px] leading-none max-w-lg mx-auto">
              Art is how we decorate Space,<br />Music is how we decorate Time
            </h2>
          </div>

          {/* SHOP & OUR VISION links */}
          <div className="absolute bottom-4 left-0 right-0 px-8 flex justify-between text-sm tracking-[3px] z-10 max-w-7xl mx-auto">
            <a href="/shop" className="text-[#E8A0BF] hover:text-white transition">SHOP</a>
            <a href="#vision" className="text-[#E8A0BF] hover:text-white transition">OUR VISION</a>
          </div>
        </section>

        {/* The Story — Surreal moonlit canals (signature visual) */}
        <section 
          id="story"
          className="relative h-[100dvh] flex items-center justify-center"
          style={{ backgroundImage: `url('/images/landing/flor-dlune-canal-hero-clean.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/42" />
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <div className="text-[#E8A0BF] text-xs tracking-[5px] mb-2">THE DREAM</div>

            <div className="max-w-2xl mx-auto text-white/90 text-[15px] md:text-lg leading-relaxed tracking-[-0.1px]">
              <p className="mb-5">
                Like a flower blooming on the moon, Flor D’Lune stands apart-rare, delicate, and impossible to ignore. Our name is a tribute to this uniqueness, a symbol of something beautiful flourishing where it’s least expected. This essence of rarity and artistry is what defines us. We aim to be more than just a brand; we create experiences that blend fashion with art, turning the everyday into something extraordinary.
              </p>
              <p className="mb-5">
                As we continue to evolve, so too will our approach to design. We are committed to pushing the boundaries of creativity, slowly transitioning towards producing garments made from exclusive, handpicked materials that speak to our vision of haute couture. With each step forward, we draw closer to crafting the bespoke fashion that will define us.
              </p>
              <p>
                Thank you for embarking on this journey with us. The future holds limitless possibilities, and we can’t wait to share each chapter of it with you.
              </p>
            </div>

            {/* OUR VISION link button under the text */}
            <div className="mt-9">
              <a
                href="#vision"
                className="inline-block border border-white/70 px-9 py-3.5 text-sm tracking-[2.5px] hover:bg-white hover:text-black transition"
              >
                OUR VISION
              </a>
            </div>
          </div>
          {/* Bottom links - THE DREAM */}
          <div className="absolute bottom-6 left-0 right-0 px-8 flex justify-between text-sm tracking-[3px] z-10 max-w-7xl mx-auto">
            <a href="/shop" className="text-[#E8A0BF] hover:text-white transition">SHOP</a>
            <a href="#vision" className="text-[#E8A0BF] hover:text-white transition">OUR VISION</a>
          </div>
        </section>

        {/* The Threshold — purely the Playlist (no old park frame underneath) */}
        <section 
          id="playlist"
          className="relative h-[100dvh] flex items-center justify-center bg-[#0A0A0F]"
        >
          <PlaylistSection immersive />
        </section>

        {/* The Vision */}
        <section 
          id="vision"
          className="relative h-[100dvh] flex items-center justify-center"
          style={{ backgroundImage: `url('/images/landing/05-square.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <div className="text-[#E8A0BF] text-xs tracking-[5px] mb-2">THE VISION</div>
            
            <h3 className="font-display text-white text-5xl md:text-6xl tracking-[-2px] mb-6">
            </h3>

            <p className="text-white/90 text-lg leading-relaxed max-w-xl mx-auto">
              Welcome to Flor D’Lune, an Amsterdam-based brand that dares to dream beyond the ordinary. Born from a vision to evolve into a haute couture label, we invite you to join us on an extraordinary journey of artistry, craftsmanship, and transformation—where fashion meets the future.
              <br /><br />
              Each item in our collection is a carefully curated reflection of our love for design, from the clothing we offer to the home décor pieces that add a touch of elegance to your living spaces.
              <br /><br />
              Every product is thoughtfully selected, blending aesthetic beauty with functionality. We see this as the beginning—a foundation from which we will grow towards creating our own custom fabrics, unique designs, and signature styles.
            </p>
          </div>
          {/* Bottom links - THE VISION */}
          <div className="absolute bottom-6 left-0 right-0 px-8 flex justify-between text-sm tracking-[3px] z-10 max-w-7xl mx-auto">
            <a href="/shop" className="text-[#E8A0BF] hover:text-white transition">SHOP</a>
            <a href="#playlist" className="text-[#E8A0BF] hover:text-white transition">PLAYLIST</a>
          </div>
        </section>

        {/* Limited Rare Pieces */}
        <section 
          id="rare-pieces"
          className="relative min-h-[60dvh] py-6 flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url('/images/landing/09-dramatic-cloud-room.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0A0A0F'
          }}
        >
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 max-w-6xl px-6 w-full">
            <div className="text-center mb-6">
              <div className="text-xs tracking-[3px] text-[#E8A0BF] mb-2">LIMITED RARE PIECES</div>
              <h2 className="font-display text-white text-5xl tracking-[-2.5px]">epiphanies from a regulated nervous-system</h2>
              <p className="mt-2 text-white/70 max-w-md mx-auto text-sm">
                Rare limited edition pieces (coming soon).
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { name: "*concepts materializing from the aether*", price: "€78", color: "White" },
                { name: "*concepts materializing from the aether*", price: "€78", color: "Forest Green" },
                { name: "*concepts materializing from the aether*", price: "€78", color: "Black" },
                { name: "*concepts materializing from the aether*", price: "€78", color: "Cobalt Blue" },
              ].map((item, i) => (
                <a 
                  key={i}
                  href="/shop" 
                  className="group block rounded-2xl overflow-hidden border border-white/10 bg-black/20 hover:border-white/30 transition"
                >
                  <div className="aspect-[4/3] bg-black/30 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white/80 text-xs tracking-widest bg-black/40">
                      {item.color.toUpperCase()}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-white text-[15px] leading-tight group-hover:text-[#E8A0BF] transition">{item.name}</div>
                    <div className="text-white/60 text-sm mt-1">{item.price}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-10">
              <a 
                href="/shop" 
                className="inline-block border border-white/70 px-10 py-3.5 text-sm tracking-[2.5px] hover:bg-white hover:text-black transition"
              >
                EXPLORE THE FULL COLLECTION
              </a>
            </div>
          </div>
        </section>

        {/* The Sound Garden */}
        <section 
          id="music"
          className="relative h-[100dvh] flex items-center justify-center"
          style={{ backgroundImage: `url('/images/landing/flor-dlune-sound-garden.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/58" />
          <div className="relative z-10 text-center px-6">
            <div className="text-white/60 text-xs tracking-[4px] mb-2">THE SOUND GARDEN</div>
            <h3 className="font-display text-white text-7xl tracking-[-3px] mb-8">Playlist</h3>
            <a href="#playlist" className="inline-block border border-white/70 px-10 py-3.5 text-sm tracking-[2.5px] hover:bg-white hover:text-black transition">ENTER THE SOUND</a>
          </div>
        </section>

        {/* St. Xanthias School for Gifted Children */}
        <section 
          id="xanthias"
          className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
          style={{ backgroundImage: `url('/images/landing/story-channels-bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 text-center px-6">
            <h3 className="font-display text-white text-5xl md:text-6xl tracking-[-2px] mb-8 leading-tight">St. Xanthias School for gifted Children</h3>
            <div className="flex gap-4 justify-center">
              <a href="#story" className="border border-white/70 px-8 py-3 text-sm tracking-[2px] hover:bg-white hover:text-black transition">PEAK A LIL SNEAK</a>
              <a href="#channels" className="border border-white/70 px-8 py-3 text-sm tracking-[2px] hover:bg-white hover:text-black transition">CHANNELS</a>
            </div>
          </div>
        </section>

        {/* The Hyperbolic Time Chamber — new visual chapter under Story & Channels */}
        <section 
          id="eternal"
          className="relative h-[100dvh] flex items-center justify-center"
          style={{ backgroundImage: `url('/images/landing/flor-dlune-hourglass-temple.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <div className="text-[#E8A0BF] text-xs tracking-[5px] mb-3">THE ETERNAL</div>
            <h2 className="font-display text-white text-6xl md:text-7xl tracking-[-2.5px] leading-none mb-4">
              The Hyperbolic Time Chamber
            </h2>
            <p className="text-white/85 text-lg md:text-xl max-w-lg mx-auto tracking-[-0.2px]">
              where next drops are being divinely inspired as we speak right now...
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#story" 
                className="border border-white/70 px-8 py-3.5 text-sm tracking-[2.5px] hover:bg-white hover:text-black transition"
              >
                PEAK A LIL SNEAK
              </a>
              <a 
                href="/channels" 
                className="border border-white/70 px-8 py-3.5 text-sm tracking-[2.5px] hover:bg-white hover:text-black transition"
              >
                THE CHANNELS
              </a>
            </div>
          </div>
        </section>

        {/* The Gallery — contemporary art installation (black bust with gold teeth + abstract paintings) */}
        <section 
          id="gallery"
          className="relative h-[100dvh] flex items-center justify-center"
          style={{ backgroundImage: `url('/images/landing/flor-dlune-gallery-bust.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/48" />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <div className="text-[#E8A0BF] text-xs tracking-[5px] mb-3">THE ARCHIVE</div>
            <h2 className="font-display text-white text-6xl md:text-7xl tracking-[-2.5px] leading-none mb-4">
              Art&apos;s&amp;History
            </h2>
            <p className="text-white/85 text-lg md:text-xl max-w-lg mx-auto tracking-[-0.2px]">
              This whole brand is a temporal pincer
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#story" 
                className="border border-white/70 px-8 py-3.5 text-sm tracking-[2.5px] hover:bg-white hover:text-black transition"
              >
                PEAK A LIL SNEAK
              </a>
              <a 
                href="/channels" 
                className="border border-white/70 px-8 py-3.5 text-sm tracking-[2.5px] hover:bg-white hover:text-black transition"
              >
                THE CHANNELS
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* 3D AMBIANCE — your photo + interactive 3D elements */}
      <section id="garden-3d" className="relative border-t border-white/10">
        <CosmicHero3D />
      </section>

    </div>
  );
}
