import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string
  icon: ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function MetricCard({ title, value, icon, trend, className }: MetricCardProps) {
  return (
    <div className={cn('bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-5 shadow-sm', className)}>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-50 dark:bg-primary/10 rounded-lg text-purple-600 dark:text-primary">{icon}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{title}</p>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      {trend && (
        <p className={cn('text-xs mt-1.5', trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
          {trend.value}
        </p>
      )}
    </div>
  )
}
