import Hero from '../components/Hero'
import Features from '../components/Features'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Globe } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
       <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
            MUN AI
          </h1>
          <p className="text-xl text-slate-400 mb-8 font-mono">
            DEPLOYMENT SUCCESSFUL // V1.0
          </p>
          <div className="flex gap-4 justify-center">
             <Link href="/dashboard" className="px-8 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all">
               Open Dashboard
             </Link>
          </div>
       </div>
    </main>
  )
}
