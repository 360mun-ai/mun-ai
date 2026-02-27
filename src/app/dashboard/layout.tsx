import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
          <div className="text-sm font-medium text-slate-500">
            MUN AI / <span className="text-slate-200 capitalize">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              LIVE SIGNALS ACTIVE
            </div>
          </div>
        </header>
        <div className="p-0">
          {children}
        </div>
      </main>
    </div>
  )
}
