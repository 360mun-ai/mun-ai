'use client'
import { motion } from 'framer-motion'
import { BookOpen, Mic2, ShieldAlert, Globe2, FileText, Zap } from 'lucide-react'

const features = [
  {
    title: "Policy Research Lab",
    description: "Analyze thousands of UN resolutions and treaties instantly. Find the evidence you need to win.",
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Speech Drafter",
    description: "Generate powerful opening statements and moderated caucus speeches in your specific delegate voice.",
    icon: Mic2,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10"
  },
  {
    title: "Position Paper Lab",
    description: "From research to final draft. We help you write award-winning position papers in minutes.",
    icon: FileText,
    color: "text-violet-400",
    bg: "bg-violet-400/10"
  },
  {
    title: "Strategy Simulator",
    description: "Simulate debates against other nations. Anticipate counter-arguments before they happen.",
    icon: ShieldAlert,
    color: "text-rose-400",
    bg: "bg-rose-400/10"
  },
  {
    title: "World Monitor",
    description: "Real-time geopolitical signal tracking. Stay ahead of every global shift as it happens.",
    icon: Globe2,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    title: "Instant Caching",
    description: "Lightning fast responses powered by our advanced global reasoning network.",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-slate-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Master Every Committee</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to go from a first-time delegate to a Best Delegate gavel winner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all group backdrop-blur-sm"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
