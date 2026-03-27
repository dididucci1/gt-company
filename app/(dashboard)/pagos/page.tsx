import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { contasAPagar } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function PagosPage() {
  const contasPagas = contasAPagar.filter((conta) => conta.status === 'pago')

  const totalPago = contasPagas.reduce((acc, c) => acc + c.valor, 0)

  return (
    <>
      <Header
        title="Contas Pagas"
        subtitle={`${contasPagas.length} contas • Total pago: ${formatCurrency(totalPago)}`}
      />

      <div className="flex-1 p-8">
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm">
          <DataTable
            columns={[
              {
                key: 'fornecedor',
                header: 'Fornecedor',
                render: (row) => (
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{row.fornecedor}</p>
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
                header: 'Valor Pago',
                render: (row) => (
                  <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(row.valor)}</span>
                ),
              },
              {
                key: 'vencimento',
                header: 'Vencimento',
                render: (row) => formatDate(row.vencimento),
              },
              {
                key: 'dataPagamento',
                header: 'Data de Pagamento',
                render: (row) => (
                  <span className="text-green-600 dark:text-green-400">
                    {row.dataPagamento ? formatDate(row.dataPagamento) : '-'}
                  </span>
                ),
              },
            ]}
            data={contasPagas}
            emptyMessage="Nenhuma conta paga encontrada"
          />
        </div>
      </div>
    </>
  )
}
