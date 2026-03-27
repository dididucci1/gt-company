import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { clientes } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Users } from 'lucide-react'

export default function ClientesPage() {
  const totalAReceber = clientes.reduce((acc, c) => acc + c.totalAReceber, 0)

  return (
    <>
      <Header
        title="Clientes"
        subtitle={`${clientes.length} clientes • Total a receber: ${formatCurrency(totalAReceber)}`}
      />

      <div className="flex-1 p-8">
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm">
          <DataTable
            columns={[
              {
                key: 'nome',
                header: 'Cliente',
                render: (row) => (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-primary/10 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600 dark:text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{row.nome}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{row.cnpj}</p>
                    </div>
                  </div>
                ),
              },
              {
                key: 'email',
                header: 'Contato',
                render: (row) => (
                  <div>
                    <p className="text-gray-900 dark:text-gray-200">{row.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{row.telefone}</p>
                  </div>
                ),
              },
              {
                key: 'quantidadeContas',
                header: 'Quantidade de Contas',
                render: (row) => (
                  <span className="text-gray-900 dark:text-gray-200">{row.quantidadeContas} conta(s)</span>
                ),
              },
              {
                key: 'totalAReceber',
                header: 'Total a Receber',
                render: (row) => (
                  <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(row.totalAReceber)}</span>
                ),
              },
            ]}
            data={clientes}
          />
        </div>
      </div>
    </>
  )
}
