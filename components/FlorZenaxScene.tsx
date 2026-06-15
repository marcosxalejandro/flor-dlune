'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

// Pink dusk color palette matching Flor D'Lune + Zenax cinematic feel
const COLORS = {
  sky: '#1a1320',
  fog: '#2a1f2e',
  ground: '#120d14',
  pink: '#E8A0BF',
  deepPink: '#C75B8A',
  cosmic: '#6B4C8A',
  moon: '#ffccdd',
  ninja: '#2a252f',
  wood: '#3a2a22',
  blossom: '#f8c4d8',
}

// Stylized low-poly Japanese Torii / Shrine structure
function JapaneseShrine() {
  return (
    <group position={[0, 0, -8]}>
      {/* Base platform - more realistic PBR */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[14, 0.6, 6]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Vertical pillars */}
      <mesh position={[-5.5, 4, 0]} castShadow>
        <boxGeometry args={[1.2, 8, 1.2]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.8} metalness={0.15} />
      </mesh>
      <mesh position={[5.5, 4, 0]} castShadow>
        <boxGeometry args={[1.2, 8, 1.2]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.8} metalness={0.15} />
      </mesh>

      {/* Top cross beam */}
      <mesh position={[0, 8.5, 0]} castShadow>
        <boxGeometry args={[15, 1.5, 2]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.75} metalness={0.2} />
      </mesh>

      {/* Second smaller beam */}
      <mesh position={[0, 7.2, 0]} castShadow>
        <boxGeometry args={[12, 0.8, 1.8]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.75} metalness={0.2} />
      </mesh>

      {/* Pink accent with strong emissive for bloom */}
      <mesh position={[0, 9.3, 0]}>
        <boxGeometry args={[10, 0.4, 1.5]} />
        <meshStandardMaterial 
          color={COLORS.deepPink} 
          emissive={COLORS.deepPink} 
          emissiveIntensity={0.6}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
    </group>
  )
}

// Cherry blossom tree with falling petals
function CherryTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const petalsRef = useRef<THREE.Points>(null!)

  // Simple trunk + layered foliage
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.55, 5, 8]} />
        <meshLambertMaterial color={COLORS.wood} />
      </mesh>

      {/* Foliage layers - pinkish */}
      {[0, 1.8, 3.5].map((y, i) => (
        <mesh key={i} position={[0, y + 3, 0]} castShadow>
          <sphereGeometry args={[2.2 - i * 0.3]} />
          <meshLambertMaterial color={COLORS.blossom} />
        </mesh>
      ))}

      {/* Petal particles */}
      <points ref={petalsRef} position={[0, 6, 0]}>
        <pointsMaterial
          size={0.12}
          color={COLORS.pink}
          transparent
          opacity={0.85}
          sizeAttenuation
        />
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 120 * 3 }, () => (Math.random() - 0.5) * 7)
              ),
              3
            ]}
          />
        </bufferGeometry>
      </points>
    </group>
  )
}

// More detailed ninja - closer to high-fidelity game character style
function Ninja({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Legs with more definition */}
      <mesh position={[-0.45, 1.1, 0]} castShadow>
        <boxGeometry args={[0.55, 1.3, 0.7]} />
        <meshStandardMaterial color="#1f1a22" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0.45, 1.1, 0]} castShadow>
        <boxGeometry args={[0.55, 1.3, 0.7]} />
        <meshStandardMaterial color="#1f1a22" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Detailed torso with armor feel */}
      <mesh position={[0, 2.6, 0]} castShadow>
        <boxGeometry args={[1.7, 1.6, 1.1]} />
        <meshStandardMaterial color={COLORS.ninja} roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Belt / sash detail */}
      <mesh position={[0, 2.0, 0]} castShadow>
        <boxGeometry args={[2.0, 0.35, 1.3]} />
        <meshStandardMaterial color="#2c2520" roughness={0.8} />
      </mesh>

      {/* Head with mask */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <sphereGeometry args={[0.9]} />
        <meshStandardMaterial color="#18151c" roughness={0.5} />
      </mesh>

      {/* Ninja hood / helmet - more structured */}
      <mesh position={[0, 5.0, 0]} castShadow>
        <coneGeometry args={[1.15, 1.4, 5]} />
        <meshStandardMaterial color={COLORS.ninja} roughness={0.65} metalness={0.15} />
      </mesh>

      {/* Arms with better shape */}
      <mesh position={[-1.55, 3.0, 0]} rotation={[0, 0, -1.0]} castShadow>
        <boxGeometry args={[0.5, 1.5, 0.55]} />
        <meshStandardMaterial color={COLORS.ninja} roughness={0.6} />
      </mesh>
      <mesh position={[1.55, 3.0, 0]} rotation={[0, 0, 1.0]} castShadow>
        <boxGeometry args={[0.5, 1.5, 0.55]} />
        <meshStandardMaterial color={COLORS.ninja} roughness={0.6} />
      </mesh>

      {/* Katana - more detailed */}
      <group position={[2.4, 3.6, 0.4]} rotation={[0.5, 0.4, 1.3]}>
        <mesh>
          <boxGeometry args={[0.1, 3.6, 0.1]} />
          <meshStandardMaterial color="#d0d0d0" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Guard */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.6, 0.15, 0.25]} />
          <meshStandardMaterial color="#3a2a22" metalness={0.4} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, -1.6, 0]}>
          <boxGeometry args={[0.18, 0.9, 0.18]} />
          <meshStandardMaterial color="#2c2520" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

// Flying saucer UFO with pink cosmic lights
function UFO({ position, phase = 0, radius = 6 }: { position?: [number, number, number]; phase?: number; radius?: number }) {
  const groupRef = useRef<THREE.Group>(null!)

  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta
    if (groupRef.current) {
      const t = timeRef.current * 0.35 + phase
      // Slow circular flight + gentle bob
      groupRef.current.position.x = Math.sin(t) * radius
      groupRef.current.position.z = Math.cos(t * 0.8) * (radius * 0.7) - 4
      groupRef.current.position.y = 9 + Math.sin(t * 2.2) * 0.8

      // Subtle rotation
      groupRef.current.rotation.y = t * 0.6
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main saucer body */}
      <mesh castShadow>
        <cylinderGeometry args={[2.4, 1.6, 0.6, 48]} />
        <meshPhongMaterial 
          color="#555" 
          emissive="#2a2a2a" 
          shininess={80} 
        />
      </mesh>

      {/* Upper dome */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[1.15, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshPhongMaterial 
          color="#888" 
          emissive="#3a3a3a" 
          shininess={100} 
        />
      </mesh>

      {/* Pink rim light / energy ring - strong for Bloom */}
      <mesh position={[0, 0.15, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <torusGeometry args={[2.55, 0.18, 12, 48]} />
        <meshStandardMaterial 
          color={COLORS.pink} 
          emissive={COLORS.pink} 
          emissiveIntensity={0.8}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Strong under glow for realistic bloom */}
      <pointLight color={COLORS.pink} intensity={1.2} distance={22} />
    </group>
  )
}

// Large glowing pink full moon - video game cinematic style with strong bloom
function PinkFullMoon() {
  return (
    <group position={[-22, 16, -38]}>
      {/* Moon core */}
      <mesh>
        <sphereGeometry args={[5.5]} />
        <meshStandardMaterial 
          color={COLORS.moon} 
          emissive={COLORS.moon} 
          emissiveIntensity={0.9}
          roughness={0.4}
        />
      </mesh>
      {/* Strong outer bloom layers */}
      <mesh>
        <sphereGeometry args={[6.8]} />
        <meshStandardMaterial 
          color={COLORS.deepPink} 
          emissive={COLORS.deepPink} 
          emissiveIntensity={0.6}
          transparent 
          opacity={0.35}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[8.5]} />
        <meshStandardMaterial 
          color={COLORS.pink} 
          emissive={COLORS.pink} 
          emissiveIntensity={0.3}
          transparent 
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Dramatic video-game cinematic lighting */}
      <ambientLight intensity={0.25} color="#c8a0b0" />
      <directionalLight 
        position={[-15, 32, -8]} 
        intensity={1.1} 
        color="#ffccaa" 
        castShadow 
      />
      <directionalLight 
        position={[12, 25, -15]} 
        intensity={0.6} 
        color="#ff99bb" 
      />
      <pointLight position={[18, 12, -5]} intensity={0.8} color={COLORS.pink} />
      <pointLight position={[-25, 18, -20]} intensity={0.5} color="#ffddcc" />

      <fog attach="fog" args={[COLORS.fog, 28, 85]} />

      {/* Ground - PBR for more realistic game look */}
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[160, 160]} />
        <meshStandardMaterial 
          color={COLORS.ground} 
          roughness={0.95} 
          metalness={0.05} 
        />
      </mesh>

      {/* Distant hills / soft backdrop for depth */}
      <mesh position={[0, 3, -42]} rotation={[-0.4, 0, 0]}>
        <planeGeometry args={[120, 40]} />
        <meshStandardMaterial 
          color="#1f1626" 
          roughness={1} 
          transparent 
          opacity={0.9} 
        />
      </mesh>

      {/* Japanese shrine / torii */}
      <JapaneseShrine />

      {/* Cherry blossom trees */}
      <CherryTree position={[-11, 0, -3]} scale={1.1} />
      <CherryTree position={[13, 0, -6]} scale={0.95} />
      <CherryTree position={[-8, 0, 9]} scale={0.85} />
      <CherryTree position={[9, 0, 7]} scale={1.0} />

      {/* Stylized ninja */}
      <Ninja position={[0, 0, 2]} />

      {/* 3 UFOs in formation - different phases for natural movement */}
      <UFO phase={0} radius={7.5} />
      <UFO phase={2.1} radius={9.5} />
      <UFO phase={4.3} radius={6.2} />

      {/* Pink full moon */}
      <PinkFullMoon />

      {/* Subtle cosmic stars / particles in the sky */}
      <Stars 
        radius={120} 
        depth={40} 
        count={280} 
        factor={2.5} 
        saturation={0} 
        fade 
        speed={0.3} 
      />
    </>
  )
}

export default function FlorZenaxScene() {
  return (
    <div className="relative w-full h-[620px] md:h-[720px] rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0F]">
      <Canvas
        camera={{ position: [0, 11, 26], fov: 42 }}
        style={{ background: COLORS.sky }}
        gl={{ 
          alpha: true, 
          antialias: true, 
          preserveDrawingBuffer: true 
        }}
      >
        <Scene />

        {/* Cinematic post-processing for video-game realistic high-end look */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.15} 
            luminanceSmoothing={0.85} 
            height={400} 
            intensity={1.3}
            blendFunction={BlendFunction.ADD}
          />
          <DepthOfField 
            focusDistance={0.02} 
            focalLength={0.05} 
            bokehScale={2.5} 
          />
        </EffectComposer>

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={9} 
          maxDistance={42}
          target={[0, 6, 0]}
          autoRotate
          autoRotateSpeed={0.06}
        />
      </Canvas>

      {/* Elegant overlay UI */}
      <div className="absolute bottom-6 left-6 text-xs tracking-[2px] text-white/50 pointer-events-none">
        DRAG TO ORBIT • SCROLL TO ZOOM
      </div>
      <div className="absolute top-6 right-6 text-right">
        <div className="text-[10px] tracking-[3px] text-[var(--flor-blossom)]">FLOR D&apos;LUNE</div>
        <div className="text-[11px] text-white/60 tracking-widest">ZENAX 3D — DUSK EDITION</div>
      </div>
    </div>
  )
}
