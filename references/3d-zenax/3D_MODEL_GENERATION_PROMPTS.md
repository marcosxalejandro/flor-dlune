# Flor D'Lune — 3D Model Generation Prompts
**Goal:** Turn your 10 reference images into high-quality, realistically identical 3D models for the website.

> **PARKED:** Image-to-3D generation (Meshy etc.) saved for later per your request — you have 3D poppen/doll models to sell. These prompts + workflow stay ready.

Recommended tools (in order):
1. **Meshy.ai** (best quality right now for image-to-3D)
2. **Luma AI Dream Machine / Genie**
3. **Tripo3D**
4. **Spline** (import image as reference and model manually for maximum control)

---

## Image 1 & 6 — Main Hero Cosmic Scene (Cherry Blossoms + 3 UFOs + Pink Moon)

**Best used as:** Full cinematic hero scene (not single model)

**Prompt for Meshy/Luma (for individual elements):**

```
Create a highly detailed 3D model of a delicate cherry blossom branch with soft pink petals, realistic lighting, subtle subsurface scattering on petals. Cinematic style, high resolution, suitable for product visualization.
```

Do the same for the UFOs and Moon separately, then compose the full scene in Spline or Three.js.

---

## Image 2 — Hand Holding Moon-Rose

**Prompt:**

```
Photorealistic 3D model of a human hand gently holding a pink full moon shaped like a blooming rose. Extremely detailed skin texture, realistic fingernails, soft pink moon with crater details that look like rose petals. Soft cinematic lighting, high detail, 8k texture quality. The moon should feel magical and luminous but still have real material properties.
```

---

## Image 3 — Blue Ceramic Vase

**Prompt:**

```
Highly detailed 3D model of a matte blue ceramic vase, Japanese-inspired minimalist design, subtle texture variations in the glaze, realistic material with slight imperfections, studio lighting, high resolution PBR textures, suitable for e-commerce product visualization.
```

---

## Image 4 — Pink Full Moon Close-up

**Prompt:**

```
Ultra detailed 3D model of a pink full moon with realistic craters and surface texture. Soft pink and magenta color grading, subtle self-illumination, high resolution displacement map, cinematic quality.
```

---

## Image 5 — Minimal Logo (Bonsai + Moon + 2 UFOs)

**Best approach:** Model this in Spline or Blender manually for perfect clean lines (AI image-to-3D struggles with logos).

---

## Image 7 & 8 — Orange/Red Concept Car in Architecture

**Prompt (car only):**

```
Highly detailed 3D model of a futuristic 1970s concept car in bright orange-red color, sharp angular design, chrome details, realistic car paint with reflections, high quality automotive rendering style.
```

**For the environment:** Better to model the brutalist concrete + orange ceiling space separately in Spline/Blender.

---

## Image 9 & 10 — Historical Fresco Moon Man

**Prompt:**

```
3D model of an ancient fresco painting style figure of a man sitting inside a crescent moon, surrounded by stars. Stylized like old European astronomical illustrations or alchemical art. Should feel like a living bas-relief with subtle depth, aged texture, warm lighting.
```

---

## Recommended Workflow for Best Results

1. Generate each major element separately with AI (Meshy/Luma).
2. Import the best ones into **Spline**.
3. Compose the full cinematic scenes there (this is how motionspace.studio achieves the Zenax quality).
4. Export and embed into the Next.js site using the SplineReact component we already set up.

Would you like me to:
A) Start building the actual Spline scene structure in code + give you the exact scene setup instructions for the Hero (Images 1+6)?
B) Create individual product 3D viewers ready for when the models are generated?
C) Something else?

Just say the word and I'll execute.