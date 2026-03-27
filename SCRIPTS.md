# Scripts Úteis

Este documento contém comandos úteis para o desenvolvimento.

## Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar em produção
npm start

# Linting
npm run lint
```

## Verificar Estrutura

```bash
# Ver estrutura de pastas
tree -I 'node_modules|.next'

# Contar linhas de código
find . -name '*.tsx' -o -name '*.ts' | xargs wc -l
```

## Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build Local

```bash
npm run build
npm start
```

## Adicionar Novas Dependências

```bash
# Adicionar biblioteca
npm install nome-da-biblioteca

# Adicionar dev dependency
npm install --save-dev nome-da-biblioteca
```

## Limpar Cache

```bash
# Limpar .next
rm -rf .next

# Limpar node_modules
rm -rf node_modules
npm install
```

## Formato de Código

```bash
# Se você tiver Prettier instalado
npx prettier --write .
```

## Análise de Bundle

```bash
# Adicionar analyzer
npm install --save-dev @next/bundle-analyzer

# Analisar
ANALYZE=true npm run build
```

## Testes (Futuro)

```bash
# Jest (quando implementado)
npm test

# Coverage
npm run test:coverage
```

## Docker (Opcional)

```dockerfile
# Dockerfile exemplo
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build
docker build -t gt-financeiro .

# Run
docker run -p 3000:3000 gt-financeiro
```

## Variáveis de Ambiente

```bash
# Copiar exemplo
cp .env.example .env.local

# Editar variáveis
nano .env.local
```

## Visualizar em Rede Local

```bash
# Pegar IP local
ipconfig getifaddr en0  # macOS
hostname -I              # Linux
ipconfig                 # Windows

# Acessar de outros dispositivos
# http://SEU_IP:3000
```

## Observações

- Sempre rode `npm install` após clonar o projeto
- Use `npm run dev` durante desenvolvimento
- Teste o build antes de fazer deploy: `npm run build`
- Mantenha as dependências atualizadas: `npm outdated`
