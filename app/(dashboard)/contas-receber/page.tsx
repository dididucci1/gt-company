'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { StatusBadge } from '@/components/StatusBadge'
import { contasAReceber } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Filter } from 'lucide-react'

export default function ContasReceberPage() {
  const [filtroCliente, setFiltroCliente] = useState('')

  const contasFiltradas = contasAReceber.filter((conta) =>
    filtroCliente ? conta.cliente.toLowerCase().includes(filtroCliente.toLowerCase()) : true
  )

  const totalPendente = contasFiltradas
    .filter((c) => c.status === 'pendente' || c.status === 'atrasado')
    .reduce((acc, c) => acc + c.valor, 0)

  return (
    <>
      <Header
        title="Contas a Receber"
        subtitle={`${contasFiltradas.length} contas • Total pendente: ${formatCurrency(totalPendente)}`}
      />

      <div className="flex-1 p-8 space-y-6">
        {/* Filtros */}
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium">Filtros</span>
            </div>
            <input
              type="text"
              placeholder="Buscar por cliente..."
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
              className="flex-1 max-w-md px-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-900 dark:text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm">
          <DataTable
            columns={[
              {
                key: 'cliente',
                header: 'Cliente',
                render: (row) => (
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{row.cliente}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{row.descricao}</p>
                  </div>
                ),
              },
              {
                key: 'categoria',
                header: 'Categoria',
              },
              {
                key: 'valor',
                header: 'Valor',
                render: (row) => (
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(row.valor)}</span>
                ),
              },
              {
                key: 'vencimento',
                header: 'Vencimento',
                render: (row) => (
                  <div>
                    <p className="text-gray-900 dark:text-gray-200">{formatDate(row.vencimento)}</p>
                    {row.dataRecebimento && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                        Recebido em {formatDate(row.dataRecebimento)}
                      </p>
                    )}
                  </div>
                ),
              },
              {
                key: 'status',
                header: 'Status',
                render: (row) => <StatusBadge status={row.status} />,
              },
            ]}
            data={contasFiltradas}
          />
        </div>
      </div>
    </>
  )
}
