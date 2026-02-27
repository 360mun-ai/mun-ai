'use client'
import { useState } from 'react'
import { Mic2, Sparkles, Copy, RefreshCw, Send, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { generateSpeechAction } from '@/lib/ai'

export default function SpeechDrafter() {
  const [country, setCountry] = useState('')
  const [topic, setTopic] = useState('')
  const [vibe, setVibe] = useState('diplomatic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [speech, setSpeech] = useState<string | null>(null)

  const generateSpeech = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!country || !topic) return
    setIsGenerating(true)
    
    try {
      const result = await generateSpeechAction(country, topic, vibe)
      setSpeech(result)
    } catch (error) {
      setSpeech("An error occurred. Please ensure your GOOGLE_GENERATIVE_AI_API_KEY is set correctly.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
          <Mic2 className="text-indigo-500 w-10 h-10" />
          Speech Drafter
        </h1>
        <p className="text-slate-400">Craft award-winning opening statements and caucus speeches.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Representing Country</label>
            <input 
              type="text" 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. France, Japan, Brazil..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Committee Topic</label>
            <textarea 
              value={topic}
              onChange={(topic) => setTopic(topic.target.value)}
              placeholder="e.g. Climate change mitigation in the Sahel..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Speech Vibe</label>
            <div className="grid grid-cols-3 gap-2">
              {['diplomatic', 'assertive', 'persuasive'].map((v) => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`py-2 text-xs font-bold uppercase rounded-lg border transition-all ${
                    vibe === v ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={generateSpeech}
            disabled={isGenerating}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:opacity-50"
          >
            {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate Speech
          </button>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-600/5 rounded-2xl -z-10 group-hover:bg-indigo-600/10 transition-all" />
          <div className="h-full border border-slate-800 rounded-2xl p-6 bg-slate-950/50 backdrop-blur-sm relative overflow-hidden">
            {speech ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-2 py-1 bg-indigo-500/10 rounded">Draft Ready</span>
                  <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 text-slate-300 leading-relaxed font-serif whitespace-pre-wrap">
                  {speech}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Fact-Checked against UN Charter</span>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <Send className="w-12 h-12 mb-4" />
                <p className="text-sm">Configure your delegate profile and <br /> click generate to see the magic.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
