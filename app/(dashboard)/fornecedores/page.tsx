import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { fornecedores } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Building2 } from 'lucide-react'

export default function FornecedoresPage() {
  const totalAPagar = fornecedores.reduce((acc, f) => acc + f.totalAPagar, 0)

  return (
    <>
      <Header
        title="Fornecedores"
        subtitle={`${fornecedores.length} fornecedores • Total a pagar: ${formatCurrency(totalAPagar)}`}
      />

      <div className="flex-1 p-8">
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm">
          <DataTable
            columns={[
              {
                key: 'nome',
                header: 'Fornecedor',
                render: (row) => (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-primary/10 rounded-lg">
                      <Building2 className="w-5 h-5 text-purple-600 dark:text-primary" />
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
                key: 'totalAPagar',
                header: 'Total a Pagar',
                render: (row) => (
                  <span className="font-semibold text-red-600 dark:text-red-400">{formatCurrency(row.totalAPagar)}</span>
                ),
              },
            ]}
            data={fornecedores}
          />
        </div>
      </div>
    </>
  )
}
