# ⚡ Início Rápido - GitHub Pages + GoDaddy

## 🎯 Objetivo
Colocar seu site online com domínio customizado em **30 minutos**.

---

## 📝 Passo a Passo

### 1️⃣ Edite o arquivo CNAME (30 segundos)

O arquivo `CNAME` já está configurado com:

```
ordrx.ai
```

✅ **Pronto para usar!** Não precisa alterar.

---

### 2️⃣ Faça Deploy (2 minutos)

**Opção A: Usando o script automático**
```bash
./deploy.sh
```

**Opção B: Manual**
```bash
git add .
git commit -m "Deploy landing page"
git push origin main
```

---

### 3️⃣ Ative o GitHub Pages (1 minuto)

1. Vá em: `https://github.com/SEU-USUARIO/SEU-REPO/settings/pages`
2. Em **Source**: selecione `main` e `/ (root)`
3. Clique em **Save**

---

### 4️⃣ Configure DNS na GoDaddy (5 minutos)

#### Para domínio raiz (`ordrx.ai`):

**Adicione 4 registros A:**

```
Tipo: A    Nome: @    Valor: 185.199.108.153    TTL: 600
Tipo: A    Nome: @    Valor: 185.199.109.153    TTL: 600
Tipo: A    Nome: @    Valor: 185.199.110.153    TTL: 600
Tipo: A    Nome: @    Valor: 185.199.111.153    TTL: 600
```

**Adicione 1 registro CNAME:**

```
Tipo: CNAME    Nome: www    Valor: SEU-USUARIO.github.io    TTL: 1 hora
```

#### Para subdomínio (ex: `www.ordrx.ai`):

**Adicione apenas 1 registro CNAME:**

```
Tipo: CNAME    Nome: www    Valor: SEU-USUARIO.github.io    TTL: 1 hora
```

---

### 5️⃣ Adicione Domínio no GitHub (1 minuto)

1. Volte em: `Settings → Pages`
2. Em **Custom domain**, digite: `ordrx.ai`
3. Clique em **Save**
4. Aguarde verificação (mostrar um ✅ verde)

---

### 6️⃣ Aguarde Propagação (10-30 minutos)

☕ Relaxe e aguarde o DNS propagar.

**Teste a propagação:**
```bash
dig ordrx.ai +short
```

Ou use: https://www.whatsmydns.net/

---

### 7️⃣ Ative HTTPS (1 minuto)

1. Após a verificação DNS aparecer ✅
2. Em `Settings → Pages`, marque: **"Enforce HTTPS"**
3. Aguarde 2-5 minutos para o certificado ser emitido

---

## ✅ Pronto!

Seu site está online em:
- ✅ `https://ordrx.ai`
- ✅ `https://www.ordrx.ai` (redirecionado)

---

## 🔧 Atualizações Futuras

Para atualizar o site, basta:

```bash
# Edite os arquivos
# Depois execute:
./deploy.sh
```

Ou manualmente:
```bash
git add .
git commit -m "Update content"
git push origin main
```

O GitHub Pages atualiza automaticamente em **1-2 minutos**! 🚀

---

## 📚 Precisa de Mais Detalhes?

Leia o guia completo: [CONFIGURACAO-DOMINIO.md](./CONFIGURACAO-DOMINIO.md)

---

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Site não carrega | Aguarde propagação DNS (até 24h) |
| CSS não aplica | Limpe cache: Ctrl + Shift + R |
| "Enforce HTTPS" desabilitado | Aguarde verificação DNS completar |
| Erro 404 | Verifique se o GitHub Pages está ativo |

---

**Desenvolvido por:** ORDRX Team  
**Data:** Outubro 2025

