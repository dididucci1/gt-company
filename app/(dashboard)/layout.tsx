'use client'

import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Sidebar />
      <main className="flex-1 flex flex-col ml-64">
        {children}
      </main>
    </div>
  )
}
