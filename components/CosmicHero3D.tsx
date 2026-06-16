'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Zenax 3D scene with pink gradient background (from your saved backup)
// • Pink full moon with glow layers
// • Grey plantenbak / planter box
// • Rich cherry blossom tree with many many blossoms + branches
// • Interactive tilt (mouse + device) + extra falling petals
// • Pink gradient sky matching your backup exactly
// Kept the interactive elements from the original template request.

function SimpleCherryTree({ tilt }: { tilt: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(Date.now() * 0.0003) * 0.04 + tilt.y * 0.15
      // gentle parallax on the tree (mid-ground)
      group.current.position.x = -1.8 + tilt.y * 1.2
      group.current.position.y = -0.8 + tilt.x * -0.8
    }
  })

  return (
    <group ref={group} position={[-1.8, -0.4, 0]}>
      {/* Main thick trunk (tapered, from your saved backup style) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, -0.55]}>
        <cylinderGeometry args={[0.13, 0.07, 9.2, 7]} />
        <meshBasicMaterial color="#2a1f18" />
      </mesh>

      {/* === Rich multi-branch structure with WAY more blossoms === */}

      {/* Branch 1 - lower left */}
      <group position={[-0.8, -2.8, 0]} rotation={[0.3, 0, -1.35]}>
        <mesh>
          <cylinderGeometry args={[0.045, 0.065, 3.4, 5]} />
          <meshBasicMaterial color="#2f241c" />
        </mesh>
        <group position={[0, 1.4, 0]} rotation={[0.8, 0.6, 0.9]}>
          <mesh>
            <cylinderGeometry args={[0.022, 0.03, 1.8, 4]} />
            <meshBasicMaterial color="#2f241c" />
          </mesh>
        </group>
        {/* dense blossom cluster at tip */}
        <group position={[0, 2.1, 0]}>
          {[0, 1, 2, 3, 4, 5, 6].map((j) => (
            <mesh key={j} position={[
              Math.cos((j / 7) * Math.PI * 2) * 0.9,
              Math.sin((j / 7) * Math.PI * 2) * 0.6,
              Math.sin(j) * 0.4
            ]}>
              <sphereGeometry args={[0.38 + (j % 2) * 0.09]} />
              <meshBasicMaterial color="#f8c4d8" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Branch 2 - mid right */}
      <group position={[0.6, -0.9, 0]} rotation={[-0.25, 0, 1.25]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.06, 3.1, 5]} />
          <meshBasicMaterial color="#2f241c" />
        </mesh>
        <group position={[0, 1.6, 0]} rotation={[-0.6, -0.7, 1.1]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.028, 1.6, 4]} />
            <meshBasicMaterial color="#2f241c" />
          </mesh>
        </group>
        <group position={[0, 2.0, 0]}>
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <mesh key={j} position={[
              Math.cos((j / 6) * Math.PI * 2) * 0.8,
              Math.sin((j / 6) * Math.PI * 2) * 0.55,
              Math.sin(j + 1) * 0.32
            ]}>
              <sphereGeometry args={[0.37 + (j % 2) * 0.07]} />
              <meshStandardMaterial color="#e89ab8" emissive="#ff99bb" emissiveIntensity={0.27} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Branch 3 - upper left (big dense cluster) */}
      <group position={[-1.1, 1.6, 0]} rotation={[0.15, 0, -1.65]}>
        <mesh>
          <cylinderGeometry args={[0.038, 0.055, 3.8, 5]} />
          <meshBasicMaterial color="#2f241c" />
        </mesh>
        <group position={[0, 2.0, 0]} rotation={[1.1, 0.4, 0.7]}>
          <mesh>
            <cylinderGeometry args={[0.018, 0.025, 1.5, 4]} />
            <meshBasicMaterial color="#2f241c" />
          </mesh>
        </group>
        <group position={[0, 2.5, 0]}>
          {[0,1,2,3,4,5,6,7].map((j) => (
            <mesh key={j} position={[
              Math.cos((j / 8) * Math.PI * 2) * 1.0,
              Math.sin((j / 8) * Math.PI * 2) * 0.65,
              Math.sin(j) * 0.38
            ]}>
              <sphereGeometry args={[0.39 + (j % 3) * 0.06]} />
              <meshStandardMaterial color="#f8c4d8" emissive="#ff99bb" emissiveIntensity={0.29} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Branch 4 - upper right */}
      <group position={[0.9, 2.4, 0]} rotation={[-0.4, 0, 1.1]}>
        <mesh>
          <cylinderGeometry args={[0.035, 0.05, 2.9, 5]} />
          <meshBasicMaterial color="#2f241c" />
        </mesh>
        <group position={[0, 1.55, 0]} rotation={[-0.9, 0.5, -0.6]}>
          <mesh>
            <cylinderGeometry args={[0.019, 0.025, 1.4, 4]} />
            <meshBasicMaterial color="#2f241c" />
          </mesh>
        </group>
        <group position={[0, 1.9, 0]}>
          {[0,1,2,3,4,5].map((j) => (
            <mesh key={j} position={[
              Math.cos((j / 6) * Math.PI * 2) * 0.85,
              Math.sin((j / 6) * Math.PI * 2) * 0.58,
              Math.sin(j) * 0.32
            ]}>
              <sphereGeometry args={[0.36 + (j % 2) * 0.08]} />
              <meshStandardMaterial color="#f8c4d8" emissive="#ff99bb" emissiveIntensity={0.27} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Branch 5 - top center (extra full cluster for "way more blossoms") */}
      <group position={[-0.3, 3.8, 0]} rotation={[0.2, 0, -0.35]}>
        <mesh>
          <cylinderGeometry args={[0.028, 0.04, 2.4, 5]} />
          <meshBasicMaterial color="#2f241c" />
        </mesh>
        <group position={[0, 1.3, 0]}>
          {[0,1,2,3,4,5,6].map((j) => (
            <mesh key={j} position={[
              Math.cos((j / 7) * Math.PI * 2) * 0.7,
              Math.sin((j / 7) * Math.PI * 2) * 0.52,
              Math.sin(j) * 0.28
            ]}>
              <sphereGeometry args={[0.34 + (j % 2) * 0.07]} />
              <meshBasicMaterial color="#f8c4d8" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Extra black branch (tak) on main trunk — now with blossoms too */}
      <group position={[0.5, 2.8, 0]} rotation={[0.1, 0.3, 0.8]}>
        <mesh>
          <cylinderGeometry args={[0.025, 0.035, 2.2, 5]} />
          <meshBasicMaterial color="#2f241c" />
        </mesh>
        <group position={[0, 1.8, 0]}>
          {[0,1,2,3,4].map((j) => (
            <mesh key={j} position={[
              Math.cos((j / 5) * Math.PI * 2) * 0.65,
              Math.sin((j / 5) * Math.PI * 2) * 0.5,
              Math.sin(j) * 0.25
            ]}>
              <sphereGeometry args={[0.33 + (j % 2) * 0.06]} />
              <meshStandardMaterial color="#f8c4d8" emissive="#ff99bb" emissiveIntensity={0.27} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Extra central foliage layer for even more density */}
      <group position={[0, 4.8, 0]}>
        {[0,1,2,3,4].map((i) => (
          <mesh key={i} position={[
            Math.cos(i) * 0.6,
            0.4 + (i % 3) * 0.3,
            Math.sin(i * 1.3) * 0.4
          ]}>
            <sphereGeometry args={[0.42]} />
            <meshStandardMaterial color="#f8c4d8" emissive="#ff99bb" emissiveIntensity={0.32} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function UFO({ position, speed = 1, parallax = 1.6, tilt }: { position: [number, number, number]; speed?: number; parallax?: number; tilt: { x: number; y: number } }) {
  const ref = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed

    // autonomous bob + spin
    const autoY = Math.sin(t * 1.1) * 0.7
    const autoX = Math.sin(t * 0.5) * 0.9

    // strong parallax so they feel like they are flying in the sky over the gradient
    const parX = tilt.y * 6.5 * parallax
    const parY = tilt.x * -4.8 * parallax

    ref.current.position.x = position[0] + autoX + parX
    ref.current.position.y = position[1] + autoY + parY
    ref.current.rotation.y = t * 0.45 + tilt.y * 0.8
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <cylinderGeometry args={[1.9, 1.1, 0.42, 32]} />
        <meshBasicMaterial color="#444" />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.95]} />
        <meshBasicMaterial color="#999" />
      </mesh>
      <mesh position={[0, 0.06, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <torusGeometry args={[2.1, 0.12, 8, 28]} />
        <meshBasicMaterial color="#E8A0BF" />
      </mesh>
      <pointLight color="#E8A0BF" intensity={1.0} distance={18} />
    </group>
  )
}

// Pink full moon with soft glow layers (from your saved Zenax backup)
function PinkFullMoon({ tilt }: { tilt?: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (group.current && tilt) {
      // subtle parallax on the moon (far background layer)
      group.current.position.x = 5 + tilt.y * 1.8
      group.current.position.y = 4.5 + tilt.x * -1.2
    }
  })

  return (
    <group ref={group} position={[5, 4.5, -8]}>
      {/* Core moon */}
      <mesh>
        <sphereGeometry args={[5.2]} />
        <meshBasicMaterial color="#f8c4d8" />
      </mesh>
      {/* Soft outer glow */}
      <mesh>
        <sphereGeometry args={[5.9]} />
        <meshBasicMaterial color="#E8A0BF" transparent opacity={0.28} />
      </mesh>
      {/* Extra wide bloom layer */}
      <mesh>
        <sphereGeometry args={[7.2]} />
        <meshBasicMaterial color="#b07090" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

// Grey "plantenbak" / planter box — the cherry tree grows out of this (from your saved backup)
function PlanterBox({ tilt }: { tilt?: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (group.current && tilt) {
      // very subtle parallax, almost grounded
      group.current.position.x = -1.85 + tilt.y * 0.6
    }
  })

  return (
    <group ref={group} position={[-1.85, -4.35, 0]}>
      {/* Main planter body — grey (not black) */}
      <mesh>
        <boxGeometry args={[6.8, 2.1, 3.6]} />
        <meshBasicMaterial color="#4a4a50" />
      </mesh>
      {/* Top rim / lip of the planter */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[7.3, 0.35, 3.95]} />
        <meshBasicMaterial color="#5a5a60" />
      </mesh>
      {/* Subtle inner soil / darker top surface */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[6.2, 0.15, 3.2]} />
        <meshBasicMaterial color="#3a3835" />
      </mesh>
    </group>
  )
}

function Scene({ tilt }: { tilt: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.7} color="#f0e0e8" />
      <pointLight position={[0, 10, 5]} intensity={0.8} color="#E8A0BF" />

      {/* No fog: objects keep their exact flat colors at any distance/zoom level */}

      {/* Grey plantenbak at the base */}
      <PlanterBox tilt={tilt} />

      {/* Rich cherry blossom tree growing out of the bak (many more blossoms) */}
      <SimpleCherryTree tilt={tilt} />

      {/* 2 UFOs in front of the moon, 1 UFO behind the moon (exactly as in your saved backup) */}
      <UFO position={[0, 6.5, -1.8]} speed={0.7} parallax={1.6} tilt={tilt} />
      <UFO position={[5.5, 8.5, -2.2]} speed={1.1} parallax={1.4} tilt={tilt} />
      {/* behind the moon (more negative z) */}
      <UFO position={[7.5, 4.2, -15.5]} speed={0.5} parallax={2.2} tilt={tilt} />

      {/* Extra interactive falling sakura petals (dense in the blossom area) */}
      {Array.from({ length: 26 }).map((_, i) => (
        <SakuraPetal key={i} tilt={tilt} seed={i} />
      ))}

      {/* Pink full moon (far layer, subtle tilt) */}
      <PinkFullMoon tilt={tilt} />

      {/* Rich star field for the Zenax gradient sky */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(Array.from({ length: 380 * 3 }, () => (Math.random() - 0.5) * 92)), 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.065} color="#f4f0ff" transparent opacity={0.5} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(Array.from({ length: 120 * 3 }, () => (Math.random() - 0.5) * 78)), 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.16} color="#ffffff" transparent opacity={0.85} />
      </points>
    </>
  )
}

function SakuraPetal({ tilt, seed }: { tilt: { x: number; y: number }; seed: number }) {
  const ref = useRef<THREE.Group>(null!)
  const speed = 0.8 + (seed % 5) * 0.15

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + seed
    const parX = tilt.y * 5.5 * (0.6 + (seed % 3) * 0.2)
    const parY = tilt.x * -4.2 * (0.6 + (seed % 4) * 0.15)

    ref.current.position.x = Math.sin(t * 0.6 + seed) * 6 + parX
    ref.current.position.y = 3 + ((t * 1.3) % 11) - 5 + parY
    ref.current.position.z = -2 + Math.cos(t * 0.4) * 2

    ref.current.rotation.z = t * 2.2 + tilt.y * 1.5
    ref.current.rotation.x = Math.sin(t) * 0.8
  })

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[0.18, 0.32]} />
        <meshBasicMaterial
          color={seed % 2 === 0 ? '#f8c4d8' : '#E8A0BF'}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function TransparentBackground() {
  const { gl } = useThree()
  useEffect(() => {
    // Clear with 0 alpha so the CSS background photo shows through in the sky areas of the photo
    gl.setClearColor(0x000000, 0)
    gl.domElement.style.background = 'transparent'
  }, [gl])
  return null
}

export default function CosmicHero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const targetTilt = useRef({ x: 0, y: 0 })
  const [motionActive, setMotionActive] = useState(false)

  // Mouse parallax
  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    targetTilt.current = { x: Math.max(-1, Math.min(1, ny * 0.7)), y: Math.max(-1, Math.min(1, nx * 0.85)) }
  }

  // Device tilt (like the martian-parallax template)
  const requestDeviceTilt = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const res = await (DeviceOrientationEvent as any).requestPermission()
        if (res === 'granted') setMotionActive(true)
      } catch {}
    } else {
      setMotionActive(true)
    }
  }

  // Smooth tilt lerp + device listener
  useEffect(() => {
    let raf = 0
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      setTilt((prev) => ({
        x: lerp(prev.x, targetTilt.current.x, 0.08),
        y: lerp(prev.y, targetTilt.current.y, 0.08),
      }))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!motionActive) return
    const onOrientation = (ev: DeviceOrientationEvent) => {
      const beta = ev.beta ?? 0
      const gamma = ev.gamma ?? 0
      targetTilt.current = {
        x: Math.max(-1, Math.min(1, beta / 40)),
        y: Math.max(-1, Math.min(1, gamma / 35)),
      }
    }
    window.addEventListener('deviceorientation', onOrientation, { passive: true })
    return () => window.removeEventListener('deviceorientation', onOrientation)
  }, [motionActive])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[720px] bg-[#0A0A0F] overflow-hidden cosmic-bg"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { targetTilt.current = { x: 0, y: 0 } }}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 52 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          preserveDrawingBuffer: true 
        }}
        style={{ background: 'linear-gradient(180deg, #2a1f3a 0%, #b07090 50%, #5a2a40 100%)' }}
      >
        {/* Transparent clear so the pink gradient background shows through */}
        <TransparentBackground />
        <Scene tilt={tilt} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2}
          maxDistance={32}
          target={[0, 1, -2]}
          autoRotate
          autoRotateSpeed={0.015}
        />
      </Canvas>

      {/* Top label */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none max-w-2xl px-6">
        <p className="text-white/80 text-sm md:text-base italic leading-relaxed drop-shadow">
          Music is liquid architecture; architecture is frozen Music
        </p>
        <p className="text-white/50 text-[10px] md:text-xs tracking-[2px] mt-2 drop-shadow">
          — Johann Wolfgang von Goethe
        </p>
      </div>

      {/* Motion unlock (like the v0 template) */}
      {!motionActive && (
        <button
          onClick={requestDeviceTilt}
          className="absolute top-6 right-6 z-20 px-4 py-1.5 text-xs tracking-[2px] rounded-full border border-white/40 text-white/80 hover:bg-white/10 hover:text-white transition"
        >
          UNLOCK DEVICE TILT
        </button>
      )}
      {motionActive && (
        <div className="absolute top-6 right-6 z-20 px-3 py-1 text-[10px] tracking-[2px] text-[#E8A0BF]/80 border border-white/20 rounded">TILT ACTIVE</div>
      )}

      {/* Center branding overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center">
          <div className="font-display text-white text-[68px] md:text-[96px] tracking-[14px] md:tracking-[18px] drop-shadow-2xl">
            FLOR D&apos;LUNE
          </div>
          <div className="text-white/70 text-[10px] md:text-xs tracking-[3.5px] mt-2">
            AMSTERDAM BASED • GLOBALLY YOURS • OUTTA THIS WORLD
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[2.5px] text-white/60 text-center z-10 drop-shadow">
        MOVE MOUSE OR TILT DEVICE • ROZE MAAN • GREY PLANTENBAK • VOLLE BLOSSOM TREE
      </div>
    </div>
  )
}
