# Guia de Desenvolvimento - Adicionar Novas Features

Este guia mostra como adicionar novas funcionalidades ao sistema de forma organizada e escalável.

---

## 📋 Checklist para Nova Feature

- [ ] Definir tipos TypeScript
- [ ] Criar dados mockados (se necessário)
- [ ] Criar componente reutilizável (se necessário)
- [ ] Criar página/rota
- [ ] Adicionar no menu (Sidebar)
- [ ] Testar responsividade
- [ ] Documentar mudanças

---

## 🎯 Exemplo 1: Adicionar Nova Página

### Cenário: Criar página de "Relatórios"

#### 1. Criar a Rota

```bash
# Criar arquivo da página
touch app/(dashboard)/relatorios/page.tsx
```

#### 2. Implementar a Página

```typescript
// app/(dashboard)/relatorios/page.tsx
import { Header } from '@/components/Header'

export default function RelatoriosPage() {
  return (
    <>
      <Header
        title="Relatórios"
        subtitle="Visualize e exporte seus relatórios financeiros"
      />

      <div className="flex-1 p-8">
        {/* Conteúdo da página */}
      </div>
    </>
  )
}
```

#### 3. Adicionar no Menu

```typescript
// components/Sidebar.tsx
import { FileText } from 'lucide-react' // Adicionar ícone

const menuItems = [
  // ... itens existentes
  { href: '/relatorios', label: 'Relatórios', icon: FileText }, // Adicionar aqui
]
```

---

## 🧩 Exemplo 2: Criar Novo Componente

### Cenário: Criar componente "FilterBar"

#### 1. Criar o Arquivo

```bash
touch components/FilterBar.tsx
```

#### 2. Implementar o Componente

```typescript
// components/FilterBar.tsx
import { Filter, X } from 'lucide-react'

interface FilterBarProps {
  onFilter: (filters: Record<string, string>) => void
  filters: Array<{
    name: string
    placeholder: string
    type?: 'text' | 'date' | 'select'
    options?: Array<{ value: string; label: string }>
  }>
}

export function FilterBar({ onFilter, filters }: FilterBarProps) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-300" />
        <span className="text-sm font-medium text-gray-300">Filtros</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filters.map((filter) => (
          <input
            key={filter.name}
            type={filter.type || 'text'}
            placeholder={filter.placeholder}
            className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-primary"
          />
        ))}
      </div>
    </div>
  )
}
```

#### 3. Usar o Componente

```typescript
// Em qualquer página
import { FilterBar } from '@/components/FilterBar'

<FilterBar
  filters={[
    { name: 'fornecedor', placeholder: 'Buscar por fornecedor...' },
    { name: 'data', placeholder: 'Data...', type: 'date' },
  ]}
  onFilter={(filters) => console.log(filters)}
/>
```

---

## 📊 Exemplo 3: Adicionar Novos Dados Mockados

### Cenário: Adicionar "Categorias de Despesas"

#### 1. Definir Tipo

```typescript
// lib/types.ts
export interface Categoria {
  id: string
  nome: string
  cor: string
  icone: string
  totalGastos: number
}
```

#### 2. Criar Dados Mockados

```typescript
// lib/mock-data.ts
export const categorias: Categoria[] = [
  {
    id: 'cat1',
    nome: 'Materiais',
    cor: '#FF6B6B',
    icone: 'Package',
    totalGastos: 125000,
  },
  {
    id: 'cat2',
    nome: 'Mão de Obra',
    cor: '#4ECDC4',
    icone: 'Users',
    totalGastos: 89000,
  },
  // ... mais categorias
]
```

#### 3. Usar os Dados

```typescript
// Em qualquer página
import { categorias } from '@/lib/mock-data'

export default function CategoriasPage() {
  return (
    <div>
      {categorias.map((cat) => (
        <div key={cat.id}>{cat.nome}</div>
      ))}
    </div>
  )
}
```

---

## 🎨 Exemplo 4: Adicionar Nova Métrica no Dashboard

### Cenário: Adicionar "Taxa de Inadimplência"

#### 1. Calcular Métrica

```typescript
// lib/mock-data.ts
export const taxaInadimplencia = {
  valor: 5.2, // 5.2%
  total: contasAReceber.filter(c => c.status === 'atrasado').length,
  historico: [4.1, 4.5, 5.0, 5.2], // últimos 4 meses
}
```

#### 2. Adicionar Card no Dashboard

```typescript
// app/(dashboard)/dashboard/page.tsx
import { AlertTriangle } from 'lucide-react'

<MetricCard
  title="Taxa de Inadimplência"
  value={`${taxaInadimplencia.valor}%`}
  icon={<AlertTriangle className="w-6 h-6" />}
  trend={{ value: "+0.2%", isPositive: false }}
  className="border-yellow-500/50"
/>
```

---

## 🔧 Exemplo 5: Adicionar Funcionalidade de Filtro

### Cenário: Filtro avançado em Contas a Pagar

#### 1. Criar Estado

```typescript
'use client'
import { useState } from 'react'

export default function ContasPagarPage() {
  const [filtros, setFiltros] = useState({
    fornecedor: '',
    dataInicio: '',
    dataFim: '',
    status: '',
  })

  // ... resto do código
}
```

#### 2. Implementar Lógica de Filtro

```typescript
const contasFiltradas = contasAPagar.filter((conta) => {
  // Filtro por fornecedor
  if (filtros.fornecedor && !conta.fornecedor.toLowerCase().includes(filtros.fornecedor.toLowerCase())) {
    return false
  }

  // Filtro por data
  if (filtros.dataInicio && conta.vencimento < filtros.dataInicio) {
    return false
  }

  if (filtros.dataFim && conta.vencimento > filtros.dataFim) {
    return false
  }

  // Filtro por status
  if (filtros.status && conta.status !== filtros.status) {
    return false
  }

  return true
})
```

#### 3. Criar UI de Filtro

```typescript
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <input
    type="text"
    placeholder="Fornecedor..."
    value={filtros.fornecedor}
    onChange={(e) => setFiltros({ ...filtros, fornecedor: e.target.value })}
    className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg"
  />

  <input
    type="date"
    value={filtros.dataInicio}
    onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
    className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg"
  />

  <input
    type="date"
    value={filtros.dataFim}
    onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
    className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg"
  />

  <select
    value={filtros.status}
    onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
    className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg"
  >
    <option value="">Todos os status</option>
    <option value="pendente">Pendente</option>
    <option value="pago">Pago</option>
    <option value="atrasado">Atrasado</option>
  </select>
</div>
```

---

## 📱 Exemplo 6: Tornar Componente Responsivo

### Cenário: Ajustar DataTable para mobile

#### Antes (Desktop Only)

```typescript
<DataTable columns={columns} data={data} />
```

#### Depois (Responsivo)

```typescript
// Criar versão mobile
<div className="block md:hidden">
  {/* Cards para mobile */}
  {data.map((item) => (
    <div key={item.id} className="bg-dark-card p-4 rounded-lg mb-4">
      <h3 className="font-semibold">{item.nome}</h3>
      <p className="text-sm text-gray-400">{item.descricao}</p>
    </div>
  ))}
</div>

{/* Tabela para desktop */}
<div className="hidden md:block">
  <DataTable columns={columns} data={data} />
</div>
```

---

## 🎯 Exemplo 7: Adicionar Validação de Formulário

### Cenário: Validar formulário de nova conta

#### 1. Criar Estado de Validação

```typescript
const [erros, setErros] = useState<Record<string, string>>({})

const validarFormulario = (dados: any) => {
  const novosErros: Record<string, string> = {}

  if (!dados.fornecedor) {
    novosErros.fornecedor = 'Fornecedor é obrigatório'
  }

  if (!dados.valor || dados.valor <= 0) {
    novosErros.valor = 'Valor deve ser maior que zero'
  }

  if (!dados.vencimento) {
    novosErros.vencimento = 'Data de vencimento é obrigatória'
  }

  setErros(novosErros)
  return Object.keys(novosErros).length === 0
}
```

#### 2. Usar na Submissão

```typescript
const handleSubmit = (e: FormEvent) => {
  e.preventDefault()

  if (!validarFormulario(formData)) {
    return // Não submete se houver erros
  }

  // Processar dados...
}
```

#### 3. Exibir Erros

```typescript
<input
  type="text"
  className={erros.fornecedor ? 'border-red-500' : 'border-dark-border'}
/>
{erros.fornecedor && (
  <p className="text-xs text-red-400 mt-1">{erros.fornecedor}</p>
)}
```

---

## 🚀 Exemplo 8: Preparar para Integração com API

### Estrutura Sugerida

#### 1. Criar Service

```bash
mkdir services
touch services/api.ts
```

#### 2. Implementar Service

```typescript
// services/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function getContasPagar() {
  const response = await fetch(`${API_URL}/contas-pagar`)
  if (!response.ok) throw new Error('Erro ao buscar contas')
  return response.json()
}

export async function criarContaPagar(dados: ContaPagar) {
  const response = await fetch(`${API_URL}/contas-pagar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  if (!response.ok) throw new Error('Erro ao criar conta')
  return response.json()
}
```

#### 3. Usar na Página

```typescript
'use client'
import { useEffect, useState } from 'react'
import { getContasPagar } from '@/services/api'

export default function ContasPagarPage() {
  const [contas, setContas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContasPagar()
      .then(setContas)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Carregando...</div>

  return <DataTable data={contas} {...props} />
}
```

---

## ✅ Boas Práticas

### 1. Nomenclatura Consistente

```typescript
// ✅ Bom
const contasAPagar = []
function getContasPagar() {}
interface ContaPagar {}

// ❌ Evitar
const contas_a_pagar = []
function Get_Contas_Pagar() {}
interface conta_pagar {}
```

### 2. Componentização

```typescript
// ✅ Bom - Componente reutilizável
<MetricCard title="Total" value={formatCurrency(total)} />

// ❌ Evitar - Duplicação de código
<div className="bg-dark-card p-6">
  <p>{formatCurrency(total)}</p>
</div>
```

### 3. TypeScript Types

```typescript
// ✅ Bom - Tipos explícitos
interface Props {
  data: ContaPagar[]
  onFilter: (value: string) => void
}

// ❌ Evitar - any
interface Props {
  data: any
  onFilter: any
}
```

### 4. Tratamento de Erros

```typescript
// ✅ Bom
try {
  const data = await fetchData()
  setData(data)
} catch (error) {
  console.error('Erro ao buscar dados:', error)
  setError('Falha ao carregar dados')
}

// ❌ Evitar
const data = await fetchData() // Sem tratamento
```

---

## 📚 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)

---

## 💡 Dicas

1. **Sempre teste em diferentes resoluções** (desktop, tablet, mobile)
2. **Use TypeScript** para evitar bugs
3. **Componentes pequenos** são mais fáceis de manter
4. **Documente** mudanças significativas
5. **Commit frequente** com mensagens claras

---

**Última atualização**: Março 2026
