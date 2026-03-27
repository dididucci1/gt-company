# 🚀 Deploy GT Financeiro na Vercel

## Passo a Passo Completo

### 1. Acesse a Vercel
- Vá para: https://vercel.com
- Faça login com sua conta GitHub

### 2. Import Git Repository
- Clique em **"Add New..."** → **"Project"**
- Selecione **"Import Git Repository"**
- Cole o URL: `https://github.com/dididucci1/gt-company`
- Clique em **"Import"**

### 3. Configure o Projeto
A Vercel detectará automaticamente:
- ✅ Framework: **Next.js**
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

**Não precisa alterar nada!**

### 4. Deploy
- Clique no botão **"Deploy"**
- Aguarde 1-2 minutos
- Seu site estará online! 🎉

### 5. URL do Projeto
Após o deploy, você receberá uma URL como:
```
https://gt-company-xxxxx.vercel.app
```

### 6. Domínio Customizado (Opcional)
- Vá em **Settings** → **Domains**
- Adicione seu domínio personalizado
- Configure o DNS conforme instruções da Vercel

---

## 📝 Credenciais de Login

Para acessar o sistema após deploy:

```
Email: financeiro@gtcompany.com
Senha: gt2026*
```

---

## ✅ Checklist Pré-Deploy

- [x] Build executado com sucesso
- [x] Código versionado no GitHub
- [x] README atualizado
- [x] vercel.json configurado
- [x] Imagens no diretório /public
- [x] Sem variáveis de ambiente sensíveis

---

## 🔄 Atualizações Futuras

Cada push na branch `main` do GitHub:
1. Dispara automaticamente um novo deploy na Vercel
2. Preview gerado em ~1 minuto
3. Deploy em produção após validação

---

## 🛠️ Troubleshooting

### Build Failed
```bash
# Teste localmente antes:
npm run build
```

### Imagens não aparecem
- Verifique se estão em `/public`
- Use paths absolutos: `/logo.png`

### Dark mode não funciona
- Certifique-se que o localStorage está acessível
- Verifique se há erros no console

---

## 📞 Suporte

Repositório: https://github.com/dididucci1/gt-company
Documentação Next.js: https://nextjs.org/docs
Documentação Vercel: https://vercel.com/docs
