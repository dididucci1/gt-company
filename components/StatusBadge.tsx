import { cn, getStatusColor, getStatusLabel } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
        getStatusColor(status),
        className
      )}
    >
      {getStatusLabel(status)}
    </span>
  )
}
