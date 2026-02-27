'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, TrendingUp, Globe as GlobeIcon } from 'lucide-react'

function Globe() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Sphere args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          emissive="#2e1065"
          emissiveIntensity={0.5}
        />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function WorldMonitor() {
  const signals = [
    { id: 1, type: 'Security', location: 'South China Sea', msg: 'Increased naval activity detected.', level: 'Medium' },
    { id: 2, type: 'Trade', location: 'Suez Canal', msg: 'New regulations on shipping containers.', level: 'Low' },
    { id: 3, type: 'Crisis', location: 'Central Sahel', msg: 'Humanitarian corridor negotiations stall.', level: 'High' },
  ]

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      {/* Left: 3D Visualization */}
      <div className="flex-1 relative bg-black">
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-4xl font-bold tracking-tighter flex items-center gap-3">
            <GlobeIcon className="text-indigo-500 w-8 h-8" />
            WORLD MONITOR
          </h1>
          <p className="text-slate-500 font-mono text-sm mt-2">REAL-TIME GEOPOLITICAL SIGNAL TRACKING // V1.0</p>
        </div>

        <Canvas camera={{ position: [0, 0, 10] }}>
          <Globe />
        </Canvas>

        {/* Floating UI Elements */}
        <div className="absolute bottom-8 left-8 flex gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Global Tension Index</div>
            <div className="text-2xl font-bold text-amber-500">6.4 <TrendingUp className="inline w-4 h-4" /></div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Active Conflicts</div>
            <div className="text-2xl font-bold text-rose-500">12</div>
          </div>
        </div>
      </div>

      {/* Right: Signal Feed */}
      <div className="w-96 border-l border-slate-800 bg-slate-950/50 backdrop-blur-xl p-6 overflow-y-auto">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Live Signal Feed
        </h2>

        <div className="space-y-4">
          {signals.map((signal) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  signal.level === 'High' ? 'bg-rose-500/10 text-rose-400' :
                  signal.level === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {signal.type}
                </span>
                <span className="text-[10px] text-slate-600 font-mono">2m ago</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{signal.location}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{signal.msg}</p>
            </motion.div>
          ))}
        </div>

        <button className="w-full mt-6 py-3 border border-slate-800 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-900 transition-all">
          VIEW HISTORICAL DATA
        </button>
      </div>
    </div>
  )
}
