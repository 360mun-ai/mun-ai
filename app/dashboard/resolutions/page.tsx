'use client'
import { useState } from 'react'
import { FileText, Sparkles, Send, Copy, Book, ChevronRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const PREAMBLES = ["Affirming", "Alarmed by", "Aware of", "Believing that", "Cognizant of", "Deeply concerned", "Guided by", "Reaffirming"]
const OPERATIVES = ["Adopts", "Authorizes", "Calls upon", "Condemns", "Decides", "Designates", "Emphasizes", "Strongly urges"]

export default function ResolutionLab() {
  const [topic, setTopic] = useState('')
  const [clauseType, setClauseType] = useState('operative')
  const [startingPhrase, setStartingPhrase] = useState('Calls upon')
  const [draft, setDraft] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateClause = async () => {
    if (!topic) return
    setIsGenerating(true)
    
    // Simulate AI Draft Generation
    setTimeout(() => {
      setDraft(`${startingPhrase} all member states to prioritize the allocation of humanitarian aid specifically targeted at infrastructure restoration in the Sahel region, emphasizing the need for transparent oversight and community-led distribution...`)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto h-[calc(100vh-64px)] flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 tracking-tighter">
            <FileText className="text-indigo-500 w-10 h-10" />
            RESOLUTION LAB
          </h1>
          <p className="text-slate-400">Craft perfect UN clauses with AI-assisted diplomatic drafting.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all text-slate-400">LOAD TEMPLATE</button>
           <button className="px-4 py-2 bg-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-500 transition-all text-white shadow-lg shadow-indigo-600/20">EXPORT PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Target Topic</label>
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Cybersecurity in developing nations..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-32"
              />
            </div>

            <div className="flex gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800">
               <button 
                onClick={() => {setClauseType('preambulatory'); setStartingPhrase(PREAMBLES[0])}}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${clauseType === 'preambulatory' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Preambulatory
               </button>
               <button 
                onClick={() => {setClauseType('operative'); setStartingPhrase(OPERATIVES[0])}}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${clauseType === 'operative' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Operative
               </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-3">UN Phrase</label>
              <select 
                value={startingPhrase}
                onChange={(e) => setStartingPhrase(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {(clauseType === 'preambulatory' ? PREAMBLES : OPERATIVES).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={generateClause}
              disabled={isGenerating}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:opacity-50"
            >
              {isGenerating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : <Sparkles className="w-5 h-5" />}
              Generate Draft
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col h-full bg-slate-900/30 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Book className="w-4 h-4" />
                DRAFT CANVAS
             </div>
             {draft && <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><Copy className="w-4 h-4" /></button>}
          </div>
          <div className="flex-1 p-8 font-serif leading-relaxed text-slate-300 whitespace-pre-wrap">
             {draft ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <span className="italic font-bold text-white underline underline-offset-4 decoration-indigo-500 mr-2">{startingPhrase}</span>
                 {draft.split(startingPhrase)[1]}
                 <div className="mt-12 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 border-dashed">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase mb-3">
                      <ChevronRight className="w-4 h-4" />
                      Deliberation Insight
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      "This clause follows standard UN formatting by starting with an italicized and underlined operative phrase. Ensure this clause has sub-clauses for maximum impact during voting."
                    </p>
                 </div>
               </motion.div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                 <FileText className="w-16 h-16 mb-4" />
                 <p className="max-w-xs">Configure your topic and phrases to begin drafting your formal resolution clause.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}
