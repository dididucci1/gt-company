# Documentação Técnica - GT Financeiro

## Arquitetura do Sistema

### Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React
- **Padrão**: Clean Architecture & Component-Based

---

## Estrutura de Pastas

### `/app` - Aplicação Next.js

```
/app
├── (dashboard)/          # Route Group (com sidebar)
│   ├── layout.tsx       # Layout compartilhado
│   ├── dashboard/       # Página inicial
│   ├── contas-pagar/    # Gestão de contas a pagar
│   ├── contas-receber/  # Gestão de contas a receber
│   ├── pagos/           # Histórico de pagamentos
│   ├── recebidos/       # Histórico de recebimentos
│   ├── fornecedores/    # Cadastro de fornecedores
│   └── clientes/        # Cadastro de clientes
├── /login               # Tela de autenticação
├── layout.tsx           # Layout raiz
├── page.tsx             # Redireciona para /login
└── globals.css          # Estilos globais
```

### `/components` - Componentes Reutilizáveis

```
/components
├── DataTable.tsx        # Tabela genérica com tipagem
├── Header.tsx           # Cabeçalho das páginas
├── MetricCard.tsx       # Card de métricas do dashboard
├── Sidebar.tsx          # Menu lateral de navegação
└── StatusBadge.tsx      # Badge de status (pago/pendente/etc)
```

### `/lib` - Biblioteca de Utilitários

```
/lib
├── mock-data.ts         # Dados simulados
├── types.ts             # Definições de tipos TypeScript
└── utils.ts             # Funções auxiliares
```

---

## Tipos TypeScript

### Principais Tipos

```typescript
// Status de pagamento
type StatusPagamento = 'pendente' | 'pago' | 'atrasado' | 'recebido'

// Conta a pagar
interface ContaPagar {
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

// Conta a receber
interface ContaReceber {
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

// Fornecedor
interface Fornecedor {
  id: string
  nome: string
  cnpj: string
  totalAPagar: number
  quantidadeContas: number
  email?: string
  telefone?: string
}

// Cliente
interface Cliente {
  id: string
  nome: string
  cnpj: string
  totalAReceber: number
  quantidadeContas: number
  email?: string
  telefone?: string
}

// Métricas financeiras
interface MetricasFinanceiras {
  totalAPagar: number
  totalAReceber: number
  totalPago: number
  totalRecebido: number
  saldoProjetado: number
}
```

---

## Componentes Reutilizáveis

### DataTable

Componente genérico de tabela com suporte a renderização customizada.

```typescript
interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
}

<DataTable
  columns={columns}
  data={data}
  emptyMessage="Nenhum registro"
/>
```

### MetricCard

Card para exibição de métricas.

```typescript
<MetricCard
  title="Total a Pagar"
  value="R$ 150.000,00"
  icon={<TrendingDown />}
  trend={{ value: "+12%", isPositive: false }}
/>
```

### StatusBadge

Badge colorido baseado no status.

```typescript
<StatusBadge status="pago" />
// Renderiza badge verde com texto "Pago"
```

---

## Funções Utilitárias

### Formatação

```typescript
// Formatar valor monetário
formatCurrency(150000) // "R$ 150.000,00"

// Formatar data
formatDate("2026-03-27") // "27/03/2026"

// Obter cor do status
getStatusColor("pago") // "bg-green-500/10 text-green-400..."

// Obter label do status
getStatusLabel("pago") // "Pago"

// Combinar classes CSS
cn("class1", condition && "class2") // "class1 class2"
```

---

## Dados Mockados

### Estrutura

- **4 Fornecedores** com totais calculados
- **4 Clientes** com totais calculados
- **10 Contas a Pagar** (mix de pendentes/pagas/atrasadas)
- **10 Contas a Receber** (mix de pendentes/recebidas/atrasadas)
- **Métricas Calculadas** automaticamente
- **5 Lançamentos Recentes** para o dashboard

### Relacionamentos

```
Fornecedor 1:N Contas a Pagar
Cliente 1:N Contas a Receber
```

---

## Rotas e Navegação

### Rotas Públicas

- `/login` - Tela de autenticação

### Rotas Protegidas (Dashboard)

- `/dashboard` - Visão geral
- `/contas-pagar` - Lista de contas a pagar
- `/contas-receber` - Lista de contas a receber
- `/pagos` - Histórico de pagamentos
- `/recebidos` - Histórico de recebimentos
- `/fornecedores` - Lista de fornecedores
- `/clientes` - Lista de clientes

### Redirecionamento

- `/` → `/login`

---

## Estilos e Temas

### Cores Principais

```css
/* Verde (Sistema) */
--primary: #00C853
--primary-dark: #00A044
--primary-light: #00E676

/* Roxo (Login) */
--purple: #6d28d9
--purple-dark: #5b21b6
--purple-light: #7c3aed

/* Tema Escuro */
--dark-bg: #0f172a        /* Fundo principal */
--dark-card: #1e293b      /* Cards */
--dark-border: #334155    /* Bordas */
```

### Classes Tailwind Customizadas

```javascript
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: '#00C853',
    dark: '#00A044',
    light: '#00E676',
  },
  dark: {
    bg: '#0f172a',
    card: '#1e293b',
    border: '#334155',
  }
}
```

---

## Padrões de Código

### Nomenclatura

- **Componentes**: PascalCase (`MetricCard.tsx`)
- **Funções**: camelCase (`formatCurrency`)
- **Tipos**: PascalCase (`ContaPagar`)
- **Constantes**: camelCase (`contasAPagar`)

### Estrutura de Componente

```typescript
// 1. Imports
import { useState } from 'react'
import { Component } from '@/components/Component'

// 2. Types/Interfaces
interface Props {
  title: string
}

// 3. Component
export default function MyComponent({ title }: Props) {
  // 4. State
  const [data, setData] = useState([])

  // 5. Functions
  const handleClick = () => {}

  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Client vs Server Components

```typescript
// Client Component (com interatividade)
'use client'
import { useState } from 'react'

// Server Component (padrão, sem 'use client')
import { getData } from '@/lib/data'
```

---

## Futuras Integrações

### API REST

```typescript
// services/api.ts (futuro)
export async function getContasPagar() {
  const response = await fetch('/api/contas-pagar')
  return response.json()
}
```

### Autenticação

```typescript
// usando NextAuth.js (futuro)
import { signIn, signOut, useSession } from 'next-auth/react'
```

### Estado Global

```typescript
// usando Zustand (sugestão futura)
import { create } from 'zustand'

const useFinanceStore = create((set) => ({
  contas: [],
  setContas: (contas) => set({ contas }),
}))
```

---

## Performance

### Otimizações Implementadas

- ✅ Next.js App Router (Server Components)
- ✅ TypeScript para type safety
- ✅ Componentes reutilizáveis
- ✅ CSS otimizado com Tailwind
- ✅ Tree shaking automático

### Otimizações Futuras

- [ ] React Query para cache de dados
- [ ] Image optimization com next/image
- [ ] Lazy loading de componentes pesados
- [ ] Service Worker para PWA
- [ ] Suspense boundaries

---

## Segurança

### Implementações Atuais

- Validação de formulários
- TypeScript para type safety
- Escape automático de JSX

### Implementações Futuras

- Autenticação JWT
- CSRF protection
- Rate limiting
- Sanitização de inputs
- HTTPS obrigatório

---

## Testes (Futuro)

### Estrutura Sugerida

```
/__tests__
├── components/
│   ├── DataTable.test.tsx
│   └── MetricCard.test.tsx
├── lib/
│   └── utils.test.ts
└── pages/
    └── dashboard.test.tsx
```

### Stack Sugerida

- Jest
- React Testing Library
- Playwright (E2E)

---

## Deployment

### Vercel (Recomendado)

1. Push para GitHub
2. Conectar no Vercel
3. Deploy automático

### Build Manual

```bash
npm run build
npm start
```

### Variáveis de Ambiente

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.exemplo.com
```

---

## Troubleshooting

### Erro: "Module not found"

```bash
rm -rf node_modules .next
npm install
```

### Erro: "Port 3000 already in use"

```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Erro: Tailwind não atualiza

```bash
rm -rf .next
npm run dev
```

---

## Contribuição

### Branches

- `main` - Produção
- `develop` - Desenvolvimento
- `feature/*` - Novas features

### Commits

```
feat: adiciona filtro de data
fix: corrige cálculo de métricas
refactor: reorganiza componentes
docs: atualiza README
```

---

## Contato e Suporte

Para dúvidas técnicas ou sugestões:
- Documentação: `/README.md`
- Scripts: `/SCRIPTS.md`
- Este documento: `/DOCS.md`

---

**Última atualização**: Março 2026
