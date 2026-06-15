# Zenax 3D Video Reference - Flor D'Lune Adaptation

**Source Video:** ScreenRecording_06-01-2026 00-53-35_1.mov (sent by user on 2026-06-01)

**Important clarification from user:** The 6 screenshots previously sent (Image #1 through #6) are extracted directly from this exact video. They are not separate references.

> **PARKED:** 3D build (Spline/Meshy) saved for later — you have 3D poppen/doll models to sell. All references + plan stay ready.

**Goal:** Create a high-quality 3D experience for the Flor D'Lune website that matches the cinematic, video-game realistic quality and aesthetic of this Zenax 3D scene by motionspace.studio, while incorporating Flor D'Lune identity.

## Key Observations from the Video (to be filled with detailed analysis)

### Overall Style & Quality
- [ ] Level of model detail (high-poly vs stylized)
- [ ] Material quality (PBR, subsurface, reflections)
- [ ] Lighting approach (HDRI, 3-point, volumetric, rim lights)
- [ ] Color grading and atmosphere (especially the pink/dusk tones)
- [ ] Post-processing (bloom, depth of field, color correction, film grain)

### Environment Elements (from previous screenshots + this video)
- Japanese architecture / buildings
- Cherry blossom trees (style, density, lighting on petals)
- Ground / terrain treatment
- Atmospheric effects (fog, haze, light rays)

### Character (Ninja)
- Level of detail on clothing and anatomy
- Pose and silhouette
- How it integrates with the environment
- Lighting on the character

### Camera & Composition
- Typical camera distances and angles used
- How the camera moves (if animated)
- Focal length feel / depth of field usage

### Flor D'Lune Adaptation Requirements
- Replace or add: **3 UFOs** (subtle but clearly visible, matching the pink/cosmic palette)
- Add: **Pink full moon** as a strong atmospheric element
- Maintain: Dusky pink / cosmic romantic atmosphere
- Character: Keep or adapt the ninja (or make it more Flor-coded if needed)
- Overall mood: Cinematic, premium, slightly mystical / ritualistic

## Recommended Production Path

**Strongly Recommended Tool:** **Spline** (same level used by motionspace.studio for Zenax-level quality)

Reasons:
- Achieves the exact visual fidelity shown in this video much faster than raw Three.js
- Excellent export options for web (React component or iframe)
- Built-in collaboration and easy iteration
- Post-processing, lighting, and materials are production-ready out of the box

**Alternative (if we must stay in Three.js):**
- Use the current `FlorZenaxScene.tsx` as a low-fidelity prototype only
- For production quality we would need:
  - High-quality 3D assets (exported from Blender/C4D)
  - Advanced post-processing pipeline
  - Much more development time

## Next Steps

1. User extracts key frames from this video (important moments: wide shots, character close-ups, best lighting on trees/buildings, any camera moves).
2. Detailed visual analysis of those frames.
3. Creation of a precise Spline build guide (what to model, lighting setup, camera, how to integrate the 3 UFOs + pink moon without breaking the Zenax aesthetic).
4. Implementation of the Spline scene embed in the Next.js site (already prepared in `components/SplineZenaxScene.tsx`).

---

**Status:** Awaiting key frames from the video for detailed analysis.

**Related Code:**
- Current prototype: `components/FlorZenaxScene.tsx` (Three.js)
- Production path: `components/SplineZenaxScene.tsx`
- Homepage integration: `app/page.tsx` (experience section)