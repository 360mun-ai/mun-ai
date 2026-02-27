'use client'
import { Settings, User, Bell, Shield, Moon } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 tracking-tighter">
          <Settings className="text-indigo-500 w-10 h-10" />
          SETTINGS
        </h1>
        <p className="text-slate-400">Manage your delegate profile and application preferences.</p>
      </div>

      <div className="space-y-6">
        {[
          { icon: User, label: "Profile Settings", desc: "Update your name, email, and delegate photo." },
          { icon: Bell, label: "Notifications", desc: "Manage alerts for committee updates and AI signals." },
          { icon: Shield, label: "Privacy & Security", desc: "Change your password and manage session tokens." },
          { icon: Moon, label: "Appearance", desc: "Customize the theme and glassmorphism levels." }
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all cursor-pointer group flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">{item.label}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
