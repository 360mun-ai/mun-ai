'use client'
import { useState } from 'react'
import { BookOpen, Search, Upload, FileText, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { researchDeliberationAction } from '@/lib/ai'

export default function ResearchLab() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setFileName(file.name)
    const text = await file.text() // Simple text extraction for now
    setFileContent(text)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    setIsLoading(true)
    
    try {
      const result = await researchDeliberationAction(query, fileContent || undefined)
      setResults(result)
    } catch (error) {
      setResults("Research failed. Please verify your AI configuration.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <BookOpen className="text-indigo-500" />
          Policy Research Lab
        </h1>
        <p className="text-slate-400">Analyze UN documents and generate strategic policy briefs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Knowledge Base */}
        <div className="lg:col-span-1 space-y-6">
          <label className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 border-dashed flex flex-col items-center justify-center text-center group hover:border-indigo-500/50 transition-colors cursor-pointer relative overflow-hidden">
            <input type="file" className="hidden" accept=".txt,.pdf" onChange={handleFileUpload} />
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-semibold mb-1">Upload Document</h3>
            <p className="text-xs text-slate-500">TXT or PDF (Text-only)</p>
            {fileName && (
              <div className="mt-4 flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase">
                <CheckCircle2 className="w-3 h-3" />
                {fileName} Loaded
              </div>
            )}
          </label>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-500">Active Sources</h3>
            <div className="space-y-3">
              {[
                "UN Charter.pdf",
                "Rule of Procedure.pdf",
                "Sustainable Development Goals.txt"
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/30 text-sm text-slate-300">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  {doc}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main: Deliberation Engine */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a research question or draft a clause..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <button 
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            </button>
          </form>

          {results && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-slate-900 border border-slate-800 leading-relaxed text-slate-300 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-4 text-indigo-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                AI STRATEGIC BRIEF
              </div>
              {results}
              <div className="mt-8 pt-6 border-t border-slate-800 flex gap-4">
                <button className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">Copy to Clipboard</button>
                <button className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">Add to Speech</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
