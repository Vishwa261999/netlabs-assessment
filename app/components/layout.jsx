import Link from 'next/link'
import { BarChart3, Box, FileText, Home, Settings, Users } from 'lucide-react'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 bg-indigo-600 lg:block">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center gap-2 px-6">
              <Box className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Inventory</span>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-2">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-indigo-700"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/aging-report"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-indigo-700"
              >
                <BarChart3 className="h-5 w-5" />
                Aging Report
              </Link>
              <Link
                href="/backorder"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-indigo-700"
              >
                <FileText className="h-5 w-5" />
                Backorder Report
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-indigo-700"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

