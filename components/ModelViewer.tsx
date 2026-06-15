'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { GLTFLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'

interface ModelViewerProps {
  modelPath: string
  className?: string
  autoRotate?: boolean
  environment?: string
  scale?: number
}

function Model({ modelPath, scale = 1 }: { modelPath: string; scale?: number }) {
  const gltf = useLoader(GLTFLoader, modelPath)
  return <primitive object={gltf.scene} scale={scale} />
}

function Loader() {
  return (
    <Html center>
      <div className="text-white/60 text-sm tracking-widest">LOADING 3D MODEL...</div>
    </Html>
  )
}

export default function ModelViewer({
  modelPath,
  className = '',
  autoRotate = true,
  environment = 'warehouse',
  scale = 1,
}: ModelViewerProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<Loader />}>
          <Model modelPath={modelPath} scale={scale} />
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            autoRotate={autoRotate}
            autoRotateSpeed={0.3}
          />
          <Environment preset={environment as any} />
        </Suspense>
      </Canvas>
    </div>
  )
}
