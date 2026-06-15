'use client'

import Spline from '@splinetool/react-spline'

interface SplineZenaxSceneProps {
  sceneUrl?: string
}

export default function SplineZenaxScene({ sceneUrl }: SplineZenaxSceneProps) {
  // Default placeholder - user will replace this with their published Spline scene URL
  const defaultScene = "https://prod.spline.design/YourSceneID/scene.splinecode"

  const urlToUse = sceneUrl || defaultScene

  if (!sceneUrl) {
    return (
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center px-8">
          <div className="text-[var(--flor-blossom)] text-sm tracking-[3px] mb-3">CONCEPT / PLACEHOLDER — 3D PARKED FOR NOW</div>
          <div className="font-display text-3xl tracking-[-1px] mb-4">
            Based on your Zenax 3D video + 10 reference photos
          </div>
          <p className="max-w-md text-[#A1A1AA] text-sm mb-6">
            Professional 3D generation (Meshy.ai €20 Pro etc.) saved for later per your request.<br/><br/>
            <strong>Why:</strong> You already have 3D models of poppen/dolls that you want to sell anyway — we can drop those GLBs directly into ModelViewer instead.<br/><br/>
            Target look (when resumed): Cinematic, video-game realistic 3D with Japanese architecture, cherry blossoms, <strong>3 UFOs</strong>, <strong>pink full moon</strong>, matching the exact quality of your Zenax video.
          </p>
          <div className="text-xs text-white/50 space-y-1">
            <div>References + full prompts ready in: references/3d-zenax/</div>
            <div>ModelViewer component already prepared for real .glb files (yours or generated)</div>
          </div>
          <div className="mt-4 text-[10px] text-white/40">
            See: references/3d-zenax/FULL_SITE_3D_DISTRIBUTION_PLAN.md
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0F]">
      <Spline 
        scene={urlToUse}
        className="w-full h-full"
      />
      
      {/* Subtle overlay for branding */}
      <div className="absolute bottom-4 right-4 text-[10px] tracking-[2px] text-white/40 pointer-events-none">
        FLOR D&apos;LUNE × ZENAX 3D
      </div>
    </div>
  )
}
