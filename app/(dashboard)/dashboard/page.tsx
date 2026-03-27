'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { MetricCard } from '@/components/MetricCard'
import { DataTable } from '@/components/DataTable'
import { StatusBadge } from '@/components/StatusBadge'
import { LineChart } from '@/components/LineChart'
import { metricas, lancamentosRecentes } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  TrendingDown,
  TrendingUp,
  CheckCircle,
  CircleDollarSign,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from 'lucide-react'

// Gerar dados para últimos 30 dias
function generateChartData(days: number) {
  const data = []
  const today = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Valores simulados com variação
    const entradas = Math.floor(Math.random() * 50000) + 20000
    const saidas = Math.floor(Math.random() * 40000) + 15000
    
    data.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      fullDate: date,
      entradas,
      saidas,
    })
  }
  
  return data
}

export default function DashboardPage() {
  const [period, setPeriod] = useState(30)
  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Visão geral das suas finanças"
      />

      <div className="flex-1 p-8 space-y-8">
        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard
            title="Total a Pagar"
            value={formatCurrency(metricas.totalAPagar)}
            icon={<TrendingDown className="w-4 h-4" />}
          />
          <MetricCard
            title="Total a Receber"
            value={formatCurrency(metricas.totalAReceber)}
            icon={<TrendingUp className="w-4 h-4" />}
          />
          <MetricCard
            title="Total Pago"
            value={formatCurrency(metricas.totalPago)}
            icon={<CheckCircle className="w-4 h-4" />}
          />
          <MetricCard
            title="Total Recebido"
            value={formatCurrency(metricas.totalRecebido)}
            icon={<CircleDollarSign className="w-4 h-4" />}
          />
          <MetricCard
            title="Saldo Projetado"
            value={formatCurrency(metricas.saldoProjetado)}
            icon={<Wallet className="w-4 h-4" />}
            className={metricas.saldoProjetado >= 0 ? 'border-primary/50' : 'border-red-500/50'}
          />
        </div>

        {/* Gráfico de Fluxo de Caixa */}
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Fluxo de Caixa</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Entradas vs Saídas por dia</p>
            </div>
            
            {/* Filtros de período */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <select
                value={period}
                onChange={(e) => setPeriod(Number(e.target.value))}
                className="px-3 py-2 text-sm bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-primary"
              >
                <option value={7}>Últimos 7 dias</option>
                <option value={15}>Últimos 15 dias</option>
                <option value={30}>Últimos 30 dias</option>
                <option value={60}>Últimos 60 dias</option>
                <option value={90}>Últimos 90 dias</option>
              </select>
            </div>
          </div>
         
          {/* Legenda */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Entradas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Saídas</span>
            </div>
          </div>

          {/* Gráfico de Linhas */}
          <LineChart data={generateChartData(period)} />
        </div>

        {/* Últimos Lançamentos */}
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Últimos Lançamentos</h3>
            <button className="text-sm text-purple-600 dark:text-primary hover:text-purple-700 dark:hover:text-primary-light transition-colors font-medium">
              Ver todos
            </button>
          </div>

          <DataTable
            columns={[
              {
                key: 'tipo',
                header: 'Tipo',
                render: (row) => (
                  <div className="flex items-center gap-2">
                    {row.tipo === 'receber' ? (
                      <div className="p-1.5 bg-green-50 dark:bg-green-500/10 rounded-lg">
                        <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <div className="p-1.5 bg-red-50 dark:bg-red-500/10 rounded-lg">
                        <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                    )}
                    <span className="capitalize">{row.tipo === 'receber' ? 'Entrada' : 'Saída'}</span>
                  </div>
                ),
              },
              {
                key: 'descricao',
                header: 'Descrição',
              },
              {
                key: 'valor',
                header: 'Valor',
                render: (row) => (
                  <span className="font-semibold">{formatCurrency(row.valor)}</span>
                ),
              },
              {
                key: 'data',
                header: 'Data',
                render: (row) => formatDate(row.data),
              },
              {
                key: 'status',
                header: 'Status',
                render: (row) => <StatusBadge status={row.status} />,
              },
            ]}
            data={lancamentosRecentes}
          />
        </div>
      </div>
    </>
  )
}
