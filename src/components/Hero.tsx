'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Globe, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Background Neon Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>The Future of Model UN is here</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
        >
          Become the <span className="text-indigo-500">Best Delegate</span> <br /> 
          Powered by Intelligence.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The all-in-one AI suite for Model UN. From deep geopolitical research to 
          perfecting your speech, dominate the committee room with precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#features"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            Explore Features
          </Link>
        </motion.div>

        {/* Stats / Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-slate-800/50 pt-12"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1 tracking-wider">300+</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">UN Documents Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1 tracking-wider">INSTANT</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Speech Drafting</div>
          </div>
          <div className="text-center hidden md:block">
            <div className="text-2xl font-bold text-white mb-1 tracking-wider">24/7</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Geopolitical Strategy</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
