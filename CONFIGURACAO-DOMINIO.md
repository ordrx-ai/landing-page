# 🌐 Configuração de Domínio GoDaddy com GitHub Pages

Este guia mostra como configurar seu domínio GoDaddy para apontar para o GitHub Pages.

## 📋 Pré-requisitos

- ✅ Domínio registrado na GoDaddy
- ✅ Repositório no GitHub com os arquivos da landing page
- ✅ Acesso ao painel DNS da GoDaddy

---

## 🚀 Passo 1: Configurar o GitHub Pages

### 1.1. Faça o commit e push dos arquivos

```bash
cd /Users/pabloungaro/dev/prj/landing-page
git add .
git commit -m "Add landing page with CNAME file"
git push origin main
```

### 1.2. Ative o GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
5. Clique em **Save**

⏱️ Aguarde alguns minutos para o site ser publicado.

---

## 🌐 Passo 2: Configurar DNS na GoDaddy

### 2.1. Acesse o Painel DNS

1. Faça login em [godaddy.com](https://www.godaddy.com)
2. Clique em **Meus Produtos**
3. Ao lado do domínio que deseja usar, clique em **DNS**

### 2.2. Adicione os Registros DNS

Você tem **duas opções**:

---

### **OPÇÃO A: Domínio Raiz (ordrx.ai)** ⭐ Recomendado

**Registros A (Apex Domain):**

Delete todos os registros A existentes e adicione estes 4:

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| A | @ | `185.199.108.153` | 600 |
| A | @ | `185.199.109.153` | 600 |
| A | @ | `185.199.110.153` | 600 |
| A | @ | `185.199.111.153` | 600 |

**Registro CNAME (www):**

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| CNAME | www | `seu-usuario.github.io` | 1 hora |

> ⚠️ Substitua `seu-usuario` pelo seu nome de usuário do GitHub

---

### **OPÇÃO B: Subdomínio (www.ordrx.ai ou outro)**

**Apenas 1 registro CNAME:**

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| CNAME | www | `seu-usuario.github.io` | 1 hora |

> ⚠️ Substitua `seu-usuario` pelo seu nome de usuário do GitHub

---

### 2.3. Como Adicionar Registros na GoDaddy

1. Na página DNS, clique em **Adicionar**
2. Selecione o **Tipo** (A ou CNAME)
3. Preencha **Nome** e **Valor**
4. Defina o **TTL** (Time to Live)
5. Clique em **Salvar**

---

## 📝 Passo 3: Atualizar o Arquivo CNAME

Edite o arquivo `CNAME` na raiz do projeto:

**Domínio configurado (ordrx.ai):**
```
ordrx.ai
```

**Se preferir usar com www:**
```
www.ordrx.ai
```

Depois, faça commit e push:

```bash
git add CNAME
git commit -m "Update CNAME with custom domain"
git push origin main
```

---

## ✅ Passo 4: Configurar Domínio Customizado no GitHub

1. Volte em **Settings → Pages** no GitHub
2. Em **Custom domain**, digite: `ordrx.ai`
3. Clique em **Save**
4. Aguarde a verificação DNS (pode levar até 24 horas, geralmente 10-30 minutos)
5. Quando disponível, marque a opção **"Enforce HTTPS"** ✅

---

## ⏱️ Tempo de Propagação

- **GoDaddy**: 10-30 minutos (geralmente)
- **DNS Global**: Até 48 horas (raramente)
- **GitHub Pages**: 10-20 minutos

**Teste a propagação:**
```bash
# No terminal
dig ordrx.ai +short
# Deve retornar os IPs do GitHub Pages
```

Ou use: [https://www.whatsmydns.net/](https://www.whatsmydns.net/)

---

## 🔒 Certificado SSL (HTTPS)

O GitHub Pages fornece **certificado SSL gratuito** via Let's Encrypt.

**Como ativar:**
1. Aguarde a verificação DNS concluir
2. Vá em **Settings → Pages**
3. Marque **"Enforce HTTPS"**
4. Aguarde alguns minutos para o certificado ser emitido

✅ Seu site estará acessível via `https://ordrx.ai`

---

## 🛠️ Resolução de Problemas

### ❌ Erro: "Domain is not properly configured"

**Solução:**
- Verifique se os registros A/CNAME estão corretos
- Aguarde mais tempo (propagação DNS)
- Use `dig ordrx.ai` para verificar

### ❌ Site não carrega CSS/JS

**Solução:**
- Verifique se os caminhos dos arquivos estão corretos
- Use caminhos relativos (ex: `./styles.css`)
- Limpe o cache do navegador (Ctrl + Shift + R)

### ❌ "Enforce HTTPS" desabilitado

**Solução:**
- Aguarde a verificação DNS concluir (24h)
- Remova o domínio customizado, aguarde 1 min e adicione novamente
- Verifique se o registro CNAME no repositório está correto

---

## 📚 Referências

- [GitHub Pages - Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GoDaddy - Gerenciar DNS](https://br.godaddy.com/help/gerenciar-dns-680)
- [GitHub Pages IPs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)

---

## ✅ Checklist Final

- [ ] Arquivos commitados e pushed para o GitHub
- [ ] GitHub Pages ativado (Settings → Pages)
- [ ] Registros A/CNAME configurados na GoDaddy
- [x] Arquivo CNAME atualizado com ordrx.ai
- [ ] Domínio customizado adicionado no GitHub Pages
- [ ] Aguardado propagação DNS (10-30 min)
- [ ] HTTPS ativado (Enforce HTTPS)
- [ ] Site acessível via `https://ordrx.ai` ✅

---

## 🎉 Pronto!

Seu site ORDRX agora está online no seu domínio customizado!

**Seu site ORDRX:**
- `https://ordrx.ai` ✅
- `https://www.ordrx.ai` (redirecionado automaticamente)

---

**Precisa de ajuda?** Abra uma issue no repositório ou entre em contato!

**Desenvolvido por:** ORDRX Team  
**Data:** Outubro 2025

