# GT Financeiro - Sistema de Gestão Financeira

Sistema web moderno de gestão financeira integrado ao Sienge, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (ícones)

## 🎨 Tema e Design

- **Tema Claro** (padrão): Branco e Roxo (#7c3aed)
- **Dark Mode**: Disponível com toggle no header
- Layout moderno e responsivo
- Transições suaves entre temas

## 📋 Funcionalidades

### Autenticação
- Tela de login moderna (recriada do HTML original)
- Login fake para demonstração

### Dashboard
- Cards de métricas principais:
  - Total a pagar
  - Total a receber
  - Total pago
  - Total recebido
  - Saldo projetado
- Gráfico mockado de fluxo de caixa
- Últimos lançamentos

### Gestão Financeira

#### **Contas a Pagar** ⭐ NOVO
- **Visualização expandível por fornecedor**
- Clique no fornecedor para ver todas suas contas
- Estatísticas por fornecedor:
  - Contas pendentes e valores
  - Contas pagas e valores
- Detalhes de cada conta dentro do fornecedor
- Filtros por fornecedor
- Status visual de cada conta

#### Outras Funcionalidades
- **Contas a Receber**: Lista com filtros por cliente
- **Pagos**: Histórico de contas pagas
- **Recebidos**: Histórico de contas recebidas
- **Fornecedores**: Visão consolidada
- **Clientes**: Visão consolidada

### 🌓 Toggle Dark/Light Mode
- Botão no header para alternar entre temas
- Preferência salva no localStorage
- Cores otimizadas para ambos os modos

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar em produção
npm start
```

## 🔐 Credenciais de Login

Para acessar o sistema, use:

- **E-mail**: `financeiro@gtcompany.com`
- **Senha**: `gt2026*`

## 📁 Estrutura do Projeto

```
/app
  /(dashboard)          # Grupo de rotas autenticadas
    /dashboard          # Página principal
    /contas-pagar       # Contas a pagar
    /contas-receber     # Contas a receber
    /pagos              # Contas pagas
    /recebidos          # Contas recebidas
    /fornecedores       # Lista de fornecedores
    /clientes           # Lista de clientes
    layout.tsx          # Layout com sidebar
  /login                # Página de login
  layout.tsx            # Layout raiz
  globals.css           # Estilos globais

/components
  DataTable.tsx         # Tabela genérica reutilizável
  Header.tsx            # Cabeçalho das páginas
  MetricCard.tsx        # Card de métricas
  Sidebar.tsx           # Menu lateral
  StatusBadge.tsx       # Badge de status

/lib
  mock-data.ts          # Dados simulados
  types.ts              # Tipos TypeScript
  utils.ts              # Funções utilitárias
```

## 🎯 Dados Mockados

O sistema utiliza dados mockados para demonstração:
- 10 contas a pagar
- 10 contas a receber
- 4 fornecedores
- 4 clientes
- Métricas calculadas automaticamente

## ⚠️ Importante

- Sistema apenas frontend (sem API/backend)
- Dados simulados (não persistem)
- Autenticação fake (apenas visual)
- Preparado para futura integração com API real

## 🔮 Próximos Passos (Integração Futura)

- Conectar API do Sienge
- Implementar autenticação real (JWT)
### Tema Claro (Padrão)
```css
/* Cores Principais */
--primary: #7c3aed        /* Roxo principal */
--primary-dark: #6d28d9   /* Roxo escuro */
--primary-light: #8b5cf6  /* Roxo claro */

/* Background */
--bg: #ffffff             /* Fundo branco */
--card-bg: #ffffff        /* Cards brancos */
--border: #e5e7eb         /* Bordas cinza claro */
```

### Dark Mode
```css
/* Cores do Tema Escuro */
--dark-bg: #0f172a        /* Fundo principal */
--dark-card: #1e293b      /* Fundo dos cards */
--dark-border: #334155    /* Bordas */
```

### Cores do Login (Roxo)
```css

## 🎨 Temas e Cores

```css
/* Cores Principais */
--primary: #00C853        /* Verde principal */
--primary-dark: #00A044   /* Verde escuro */
--primary-light: #00E676  /* Verde claro */

/* Cores do Tema Escuro */
--dark-bg: #0f172a        /* Fundo principal */
--dark-card: #1e293b      /* Fundo dos cards */
--dark-border: #334155    /* Bordas */

/* Cores do Login (Roxo) */
--purple: #6d28d9
--purple-dark: #5b21b6
--purple-light: #7c3aed
```

## 📄 Licença

Projeto desenvolvido para GT Company - Todos os direitos reservados.

---

Desenvolvido com ❤️ usando Next.js e TypeScript
