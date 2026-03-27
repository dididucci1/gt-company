import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { contasAReceber } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function RecebidosPage() {
  const contasRecebidas = contasAReceber.filter((conta) => conta.status === 'recebido')

  const totalRecebido = contasRecebidas.reduce((acc, c) => acc + c.valor, 0)

  return (
    <>
      <Header
        title="Contas Recebidas"
        subtitle={`${contasRecebidas.length} contas • Total recebido: ${formatCurrency(totalRecebido)}`}
      />

      <div className="flex-1 p-8">
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
                header: 'Valor Recebido',
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
                key: 'dataRecebimento',
                header: 'Data de Recebimento',
                render: (row) => (
                  <span className="text-green-600 dark:text-green-400">
                    {row.dataRecebimento ? formatDate(row.dataRecebimento) : '-'}
                  </span>
                ),
              },
            ]}
            data={contasRecebidas}
            emptyMessage="Nenhuma conta recebida encontrada"
          />
        </div>
      </div>
    </>
  )
}
