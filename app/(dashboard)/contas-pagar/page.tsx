'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { StatusBadge } from '@/components/StatusBadge'
import { contasAPagar, fornecedores } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Filter, ChevronDown, ChevronRight, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

export default function ContasPagarPage() {
  const [filtroFornecedor, setFiltroFornecedor] = useState('')
  const [expandedFornecedores, setExpandedFornecedores] = useState<Set<string>>(new Set())

  const contasFiltradas = contasAPagar.filter((conta) =>
    filtroFornecedor ? conta.fornecedor.toLowerCase().includes(filtroFornecedor.toLowerCase()) : true
  )

  const totalPendente = contasFiltradas
    .filter((c) => c.status === 'pendente' || c.status === 'atrasado')
    .reduce((acc, c) => acc + c.valor, 0)

  // Agrupar contas por fornecedor
  const contasPorFornecedor = fornecedores.map((fornecedor) => {
    const contas = contasFiltradas.filter((c) => c.fornecedorId === fornecedor.id)
    const pendentes = contas.filter((c) => c.status === 'pendente' || c.status === 'atrasado')
    const pagas = contas.filter((c) => c.status === 'pago')
    
    return {
      fornecedor,
      contas,
      pendentes,
      pagas,
      totalPendente: pendentes.reduce((acc, c) => acc + c.valor, 0),
      totalPago: pagas.reduce((acc, c) => acc + c.valor, 0),
    }
  }).filter(f => f.contas.length > 0)

  const toggleFornecedor = (fornecedorId: string) => {
    const newExpanded = new Set(expandedFornecedores)
    if (newExpanded.has(fornecedorId)) {
      newExpanded.delete(fornecedorId)
    } else {
      newExpanded.add(fornecedorId)
    }
    setExpandedFornecedores(newExpanded)
  }

  return (
    <>
      <Header
        title="Contas a Pagar"
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
              placeholder="Buscar por fornecedor..."
              value={filtroFornecedor}
              onChange={(e) => setFiltroFornecedor(e.target.value)}
              className="flex-1 max-w-md px-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-900 dark:text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
        </div>

        {/* Lista de Fornecedores com Expansão */}
        <div className="space-y-4">
          {contasPorFornecedor.map(({ fornecedor, contas, pendentes, pagas, totalPendente, totalPago }) => {
            const isExpanded = expandedFornecedores.has(fornecedor.id)

            return (
              <div
                key={fornecedor.id}
                className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm"
              >
                {/* Header do Fornecedor */}
                <button
                  onClick={() => toggleFornecedor(fornecedor.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-border/30 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    
                    <div className="text-left flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {fornecedor.nome}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {fornecedor.cnpj} • {contas.length} conta(s)
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Pendentes */}
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{pendentes.length} pendente(s)</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrency(totalPendente)}
                        </p>
                      </div>

                      {/* Pagas */}
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{pagas.length} paga(s)</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrency(totalPago)}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Contas Expandidas */}
                {isExpanded && (
                  <div className="border-t border-gray-200 dark:border-dark-border">
                    <div className="p-6 bg-gray-50 dark:bg-dark-bg/50">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Contas do Fornecedor
                      </h4>
                      
                      <div className="space-y-3">
                        {contas.map((conta) => (
                          <div
                            key={conta.id}
                            className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                  {conta.descricao}
                                </h5>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {conta.categoria}
                                </p>
                              </div>
                              <StatusBadge status={conta.status} />
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-dark-border">
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Valor</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                  {formatCurrency(conta.valor)}
                                </p>
                              </div>
                              
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Vencimento</p>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                  {formatDate(conta.vencimento)}
                                </p>
                              </div>

                              {conta.dataPagamento && (
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Data Pagamento</p>
                                  <p className="text-sm text-green-600 dark:text-green-400">
                                    {formatDate(conta.dataPagamento)}
                                  </p>
                                </div>
                              )}

                              {conta.status === 'atrasado' && (
                                <div className="col-span-3 flex items-center gap-2 text-red-600 dark:text-red-400">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span className="text-xs font-medium">Conta em atraso!</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
