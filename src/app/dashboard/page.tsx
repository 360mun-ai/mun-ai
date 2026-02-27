'use client'
import { motion } from 'framer-motion'
import { BookOpen, Mic2, Globe, FileText, ArrowRight, Zap, Sparkles } from 'lucide-react'
import Link from 'next/link'

const tools = [
  {
    name: 'World Monitor',
    description: 'Track real-time geopolitical shifts and tension indices.',
    href: '/dashboard/monitor',
    icon: Globe,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    name: 'Policy Research Lab',
    description: 'AI-powered deliberation on UN documents and treaties.',
    href: '/dashboard/research',
    icon: BookOpen,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10'
  },
  {
    name: 'Speech Drafter',
    description: 'Generate tailored opening statements in seconds.',
    href: '/dashboard/speeches',
    icon: Mic2,
    color: 'text-violet-400',
    bg: 'bg-violet-400/10'
  }
]

export default function DashboardOverview() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-indigo-400 font-bold text-sm uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-4 h-4" />
          Welcome, Delegate
        </motion.div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Command Center</h1>
        <p className="text-slate-400">Select a specialized AI module to begin your deliberation.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              href={tool.href}
              className="block p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <tool.icon className="w-24 h-24" />
              </div>
              
              <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center mb-6`}>
                <tool.icon className={`w-6 h-6 ${tool.color}`} />
              </div>
              
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                {tool.name}
                <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {tool.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase mb-2">
            <Zap className="w-4 h-4 fill-current" />
            Intelligence Update
          </div>
          <h2 className="text-xl font-bold mb-1">New Resolution Data Loaded</h2>
          <p className="text-slate-400 text-sm">The Resolution Lab is now optimized for the latest Security Council updates.</p>
        </div>
        <Link href="/dashboard/resolutions" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 whitespace-nowrap">
          Explore Resolutions
        </Link>
      </div>
    </div>
  )
}
