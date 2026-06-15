# Flor D'Lune — Full Site 3D Distribution Plan
**Based on the 10 reference images + Zenax video you sent (June 2026)**

> **STATUS (per your request):** 3D image-to-3D generation (Meshy.ai €20 Pro subscription etc.) **PARKED FOR LATER**.  
> Reason: You already have 3D models of poppen/dolls that you want to sell anyway.  
> The entire plan, detailed prompts, and ModelViewer component remain 100% ready.  
> We can drop your existing .glb doll models directly into the shop / ritual objects / dedicated 3D sections whenever you want.  
> When you say "we gaan verder met 3D", we pick this up exactly where we left off.

Goal: Custom-designed, artsy, high-fidelity 3D landing experience across the entire site (except the Playlist section).

## Core Philosophy
- Every major section/page gets its own cinematic 3D moment (not just a small viewer).
- Use Spline for production-quality 3D (matches the Zenax reference level).
- Three.js only for lightweight interactions or fallbacks.
- Strong Flor D'Lune identity: Cosmic, Ritual, Lunar, Japanese-influenced, Pink/Blossom palette, 3 UFOs as signature motif.

## The 10 Reference Images — Thematic Mapping & Proposed Use

### Group A: Hero / Cosmic Identity (Images 1, 5, 6)
- Pink gradient hero with cherry blossoms, 3 UFOs, large pink full moon, "FLOR D'LUNE" typography.
- Minimal logo version (bonsai + moon + 2 UFOs).
**Usage:**
- Homepage Hero (top of the page, right after or replacing the current pink header).
- Make this the signature 3D scene of the whole brand.
- In Spline: Camera slowly orbits or has subtle parallax. Petals gently falling. UFOs slowly drifting. Moon has soft pulsing glow.

### Group B: Poetic / Ritual Details (Images 2, 4)
- Hand holding a rose that is actually the pink full moon.
- Extreme close-up of the pink full moon.
**Usage:**
- Shop page — as a poetic hero or between product sections ("The Moon as Offering").
- Dedicated "Ritual Objects" or "Lunar Relics" section.
- 3D version: The hand + moon-rose as a floating, inspectable object with delicate lighting.

### Group C: Objects & Materiality (Image 3)
- Matte blue ceramic vase/pottery.
**Usage:**
- Shop page — turn this into a 3D product viewer (or inspiration for a future ceramics drop).
- Or as a standalone "Objects" micro-site / section showing material studies in 3D.

### Group D: Historical / Mythological (Images 9, 10)
- Old fresco-style illustration of a man in a crescent moon with stars.
**Usage:**
- "Unveiled" or History / Lore page.
- Channels page (as background or interactive panel for the "ancient" side of the story).
- 3D treatment: Turn the illustration into a living 3D bas-relief or animated fresco that you can orbit around.

### Group E: Bold / Cinematic / Automotive (Images 7, 8)
- Orange/red futuristic 1970s-style concept car in a brutalist/modern concrete building with orange ceiling.
**Usage:**
- This is the wildcard. It has strong cinematic, high-fashion energy.
- Possible homes:
  - New section: "Movement" or "The Drive" (Flor D'Lune as journey / escape / power).
  - Or use the architectural brutalism + car as inspiration for a very bold "Power Rangers / Sports" cinematic moment on the Channels page.
  - Could become the hero for a future "Flor D'Lune Alps" or travel capsule.

## Proposed Site Structure with 3D per Section

### 1. Homepage
- **Hero 3D** (Images 1 + 6): Full cinematic 3D version of the pink cosmic cherry blossom + 3 UFOs + pink moon scene. This becomes the new top signature moment.
- Keep the pink header with 2 grey UFOs on top of it (as you liked).
- Below: Shop teaser with subtle 3D interactions on products.
- Experience section: The current Zenax-inspired scene (ninja + Japanese elements + 3 UFOs + pink moon) — evolve it further using the new references.

### 2. /shop
- Hero or first section: The hand holding the moon-rose (Image 2) as large 3D poetic moment.
- Product grid: Some products get 3D viewers (start with the blue vase as prototype).
- Between categories: The extreme moon close-up (Image 4) as atmospheric divider.

### 3. /channels (or new "Unveiled" section)
- Use the historical moon fresco (Images 9+10) as a 3D interactive panel or background.
- Bold car scene (Images 7+8) could power a "Power & Movement" cinematic block if it fits the Power Rangers / Sports narrative.

### 4. New or Expanded Sections
- **Ritual Objects** (could live under Shop or as its own page): Blue vase + moon-rose as main 3D stars.
- **Lore / History**: The fresco moon as the centerpiece.
- **Movement / Drive** (future): The orange concept car in architecture as the hero 3D experience.

## Technical Recommendations

- **Primary Tool**: Spline (for 90% of the high-quality 3D scenes). Export as React component or iframe.
- **Lightweight interactions**: Three.js (keep the current FlorZenaxScene as a prototype or for specific interactive details).
- **Performance**: Load heavy Spline scenes with lazy loading + good placeholders.
- **Consistency**: Always keep the 3 UFOs as a recurring motif across scenes.

## Current Implementation Status (June 2026)

**Already executed:**
- Professional reusable ModelViewer component created (ready for real high-quality GLB models).
- New CosmicHero3D on homepage (procedural interpretation of Images 1 & 6).
- Detailed AI image-to-3D generation prompts created for all 10 photos (see 3D_MODEL_GENERATION_PROMPTS.md).
- Spline embed infrastructure ready for production quality.
- Full distribution plan created.

**Next immediate actions (realistic path to "identical" models):**
The only way to get models that look realistically identical to your photos is to generate proper 3D assets using AI tools (Meshy.ai, Luma, etc.) with the prompts I created.

Once you have the GLB files, we can instantly replace the procedural elements with real models using the ModelViewer component.

---

Tell me how you want to proceed:
- A) Start by redesigning the homepage hero as a full 3D experience based on Images 1 & 6.
- B) First create the detailed Spline build guide for all sections.
- C) Focus on turning one specific image into a high-quality 3D model first (which one?).
- D) Something else.

I'm ready to execute whichever direction you choose.