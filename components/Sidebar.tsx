'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  CircleDollarSign,
  Users,
  Building2,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/contas-pagar', label: 'Contas a Pagar', icon: TrendingDown },
  { href: '/contas-receber', label: 'Contas a Receber', icon: TrendingUp },
  { href: '/pagos', label: 'Pagos', icon: CheckCircle },
  { href: '/recebidos', label: 'Recebidos', icon: CircleDollarSign },
  { href: '/fornecedores', label: 'Fornecedores', icon: Building2 },
  { href: '/clientes', label: 'Clientes', icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border flex flex-col shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-dark-border">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          GT Financeiro
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gestão Integrada Sienge</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-purple-50 dark:bg-primary/10 text-purple-700 dark:text-primary'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-border/50 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-dark-border space-y-2">
        {/* Toggle Dark Mode */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-border/50 hover:text-gray-900 dark:hover:text-gray-200"
          title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
        >
          {theme === 'light' ? (
            <>
              <Moon className="w-5 h-5" />
              <span>Modo Escuro</span>
            </>
          ) : (
            <>
              <Sun className="w-5 h-5" />
              <span>Modo Claro</span>
            </>
          )}
        </button>

        {/* Sair */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
          title="Sair do sistema"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-2.5 mt-1">
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-primary/20 flex items-center justify-center text-purple-700 dark:text-primary font-semibold text-sm flex-shrink-0">
            GT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">GT Company</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Administrativo</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
