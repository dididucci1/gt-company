export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR')
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pago':
    case 'recebido':
      return 'bg-green-500/10 text-green-400 border-green-500/20'
    case 'pendente':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    case 'atrasado':
      return 'bg-red-500/10 text-red-400 border-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  }
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pago: 'Pago',
    recebido: 'Recebido',
    pendente: 'Pendente',
    atrasado: 'Atrasado',
  }
  return labels[status] || status
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
