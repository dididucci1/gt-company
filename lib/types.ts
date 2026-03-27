export type StatusPagamento = 'pendente' | 'pago' | 'atrasado' | 'recebido'

export interface ContaPagar {
  id: string
  fornecedorId: string
  fornecedor: string
  descricao: string
  valor: number
  vencimento: string
  status: StatusPagamento
  dataPagamento?: string
  categoria: string
}

export interface ContaReceber {
  id: string
  clienteId: string
  cliente: string
  descricao: string
  valor: number
  vencimento: string
  status: StatusPagamento
  dataRecebimento?: string
  categoria: string
}

export interface Fornecedor {
  id: string
  nome: string
  cnpj: string
  totalAPagar: number
  quantidadeContas: number
  email?: string
  telefone?: string
}

export interface Cliente {
  id: string
  nome: string
  cnpj: string
  totalAReceber: number
  quantidadeContas: number
  email?: string
  telefone?: string
}

export interface MetricasFinanceiras {
  totalAPagar: number
  totalAReceber: number
  totalPago: number
  totalRecebido: number
  saldoProjetado: number
}

export interface LancamentoRecente {
  id: string
  tipo: 'pagar' | 'receber'
  descricao: string
  valor: number
  data: string
  status: StatusPagamento
}
