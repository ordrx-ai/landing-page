# 🚀 Resumo: Deploy ORDRX.AI

## 📋 Configuração Atual

✅ **Domínio:** `ordrx.ai`  
✅ **Arquivo CNAME:** Configurado  
✅ **Arquivos:** Prontos para deploy

---

## 🎯 Próximos 3 Passos

### 1️⃣ Configure DNS na GoDaddy (5 min)

Acesse: [godaddy.com/dcc](https://dcc.godaddy.com/control/portfolio/ordrx.ai/settings)

**Adicione estes registros:**

```
┌────────┬────────┬───────────────────┬─────┐
│ TIPO   │ NOME   │ VALOR             │ TTL │
├────────┼────────┼───────────────────┼─────┤
│ A      │ @      │ 185.199.108.153   │ 600 │
│ A      │ @      │ 185.199.109.153   │ 600 │
│ A      │ @      │ 185.199.110.153   │ 600 │
│ A      │ @      │ 185.199.111.153   │ 600 │
│ CNAME  │ www    │ pabloungaro.github.io │ 1h  │
└────────┴────────┴───────────────────┴─────┘
```

> ⚠️ **Importante:** Substitua `pabloungaro` pelo seu username do GitHub!

---

### 2️⃣ Faça o Deploy (2 min)

No terminal, execute:

```bash
cd /Users/pabloungaro/dev/prj/landing-page
./deploy.sh
```

Ou manualmente:

```bash
git add .
git commit -m "Deploy ORDRX landing page"
git push origin main
```

---

### 3️⃣ Configure GitHub Pages (2 min)

1. Acesse: https://github.com/SEU-USUARIO/SEU-REPO/settings/pages
2. **Source:** `main` branch, `/ (root)`
3. **Custom domain:** `ordrx.ai`
4. Clique em **Save**
5. Aguarde verificação DNS (✅ verde)
6. Marque **"Enforce HTTPS"**

---

## ⏱️ Timeline

| Etapa | Tempo |
|-------|-------|
| Configurar DNS GoDaddy | 5 min |
| Deploy para GitHub | 2 min |
| Configurar GitHub Pages | 2 min |
| ⏳ **Propagação DNS** | 10-30 min |
| ⏳ Certificado SSL | 5-10 min |
| **✅ SITE NO AR** | ~30 min total |

---

## 🔍 Como Testar

### Durante a propagação (10-30 min):

```bash
# Teste 1: Verificar DNS
dig ordrx.ai +short

# Deve retornar:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

### Teste online:
https://www.whatsmydns.net/#A/ordrx.ai

---

## 🌐 URLs Finais

Após a propagação, seu site estará em:

- ✅ **https://ordrx.ai** (principal)
- ✅ **https://www.ordrx.ai** (redirecionado automaticamente)
- 🔒 **HTTPS habilitado** (certificado gratuito)

---

## 📱 Checklist Rápido

Marque conforme completa:

- [ ] DNS configurado na GoDaddy (4 registros A + 1 CNAME)
- [ ] `git push` executado com sucesso
- [ ] GitHub Pages ativado (Settings → Pages)
- [ ] Domínio `ordrx.ai` adicionado no GitHub
- [ ] Aguardado propagação DNS (10-30 min)
- [ ] Verificação DNS apareceu ✅ verde
- [ ] HTTPS ativado (Enforce HTTPS)
- [ ] Site acessível em https://ordrx.ai ✅

---

## 🆘 Problemas?

### DNS não propaga
```bash
# Limpe o cache DNS local (Mac)
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

### Site não carrega
- Aguarde mais 10-20 minutos
- Verifique se os IPs do DNS estão corretos
- Tente em modo anônimo (cache do navegador)

### HTTPS não ativa
- DNS precisa estar propagado primeiro (✅ verde)
- Aguarde até 24h para o certificado ser emitido
- Remova e adicione o domínio novamente no GitHub

---

## 📞 Suporte

- **Guia completo:** `CONFIGURACAO-DOMINIO.md`
- **Início rápido:** `INICIO-RAPIDO.md`
- **IPs de referência:** `.github-pages-ips.txt`

---

## 🎉 Resultado Esperado

```
https://ordrx.ai
├── ✅ Carrega em < 2 segundos
├── ✅ CSS/JS funcionando
├── ✅ Formulário enviando e-mails
├── ✅ Responsivo (mobile/desktop)
├── ✅ HTTPS ativo (cadeado verde)
└── ✅ WWW redireciona para raiz
```

---

**🚀 Boa sorte com o deploy!**

Desenvolvido por ORDRX Team | Outubro 2025

